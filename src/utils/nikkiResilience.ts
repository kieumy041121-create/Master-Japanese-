/**
 * Daily Nikki (日記) — Fidelity & Zero-Crash Resilience Utilities
 * Shared isomorphic module used by both server.ts and dailyNikkiEngine.ts:
 * 1) Strict First-Person Faithfulness Prompting (prevents AI from replying instead of translating
 *    and ensures every concrete detail & user request in a Vietnamese confession is preserved)
 * 2) Single-Pass Streaming Delimiter Splitter (1 API call instead of 2; halves latency & quota usage)
 * 3) Multi-Format Inline Furigana Normalizer ({Kanji|kana}, Kanji[kana], Kanji(kana), <ruby>)
 * 4) Bulletproof Metadata JSON Repair & Field Rescue Parser
 * 5) Clean Vietnamese Error Classifier (never leaks raw Google JSON dumps to the UI)
 */

import { repairRawJsonString } from './kissatenResilience';

export const NIKKI_META_DELIMITER = '===NIKKI_META_JSON===';

export type NikkiStyleId = 'monologue' | 'futsukei' | 'poetic';

export interface ClassifiedApiError {
  httpStatus: number;
  code: 'QUOTA_EXCEEDED' | 'AUTH_ERROR' | 'TIMEOUT' | 'BAD_REQUEST' | 'UPSTREAM_UNAVAILABLE';
  messageVi: string;
  retryable: boolean;
}

const JAPANESE_CHAR_REGEX = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/;
const KANJI_CLUSTER_REGEX = /[\u4e00-\u9faf\u3400-\u4dbf々]+/;

export function buildNikkiStyleGuidance(styleMode: NikkiStyleId): string {
  if (styleMode === 'monologue') {
    return 'Độc thoại nội tâm (独り言 / Nhật ký tự sự): chân thật, sâu lắng, dùng thể ngắn (常体・普通形) pha cảm thán tự nhiên như ～なぁ, ～てしまう, ～よう, ～かもしれない (trừ khi người viết tự yêu cầu giọng trang trọng/lịch sự trong nội dung).';
  }
  if (styleMode === 'poetic') {
    return 'Tản văn Nhật ký (エッセイ風): mềm mại, giàu hình ảnh nhưng PHẢI trung thành 100% với sự việc và cảm xúc người viết nêu ra, KHÔNG tự bịa thêm bối cảnh không có thật.';
  }
  return 'Thể ngắn Chuẩn Nhật ký (普通形・日記体): súc tích, rõ ý, chân thật đúng phong cách người Nhật viết sổ tay hằng ngày.';
}

/**
 * Classifies Gemini SDK / HTTP errors into clean HTTP codes and clear Vietnamese messages.
 */
export function classifyGeminiApiError(err: unknown): ClassifiedApiError {
  const anyErr = err as any;
  const rawMsg =
    typeof anyErr?.message === 'string'
      ? anyErr.message
      : typeof err === 'string'
      ? err
      : '';
  const status = Number(anyErr?.status || anyErr?.code || 0);

  if (
    status === 429 ||
    rawMsg.includes('429') ||
    rawMsg.includes('RESOURCE_EXHAUSTED') ||
    rawMsg.toLowerCase().includes('quota exceeded')
  ) {
    return {
      httpStatus: 429,
      code: 'QUOTA_EXCEEDED',
      messageVi:
        'Hạn mức gọi Gemini AI miễn phí trong ngày đã tạm hết (429). Bạn có thể chờ hạn mức tự làm mới hoặc chuyển sang API key trả phí trong mục Settings > Secrets.',
      retryable: false,
    };
  }

  if (
    status === 403 ||
    rawMsg.includes('PERMISSION_DENIED') ||
    rawMsg.includes('API_KEY_INVALID') ||
    rawMsg.includes('API key not valid')
  ) {
    return {
      httpStatus: 403,
      code: 'AUTH_ERROR',
      messageVi:
        'Khóa Gemini API chưa hợp lệ hoặc thiếu quyền truy cập. Vui lòng kiểm tra lại API key trong mục Settings > Secrets.',
      retryable: false,
    };
  }

  if (
    status === 504 ||
    rawMsg.toLowerCase().includes('timeout') ||
    rawMsg.toLowerCase().includes('timed out') ||
    rawMsg.toLowerCase().includes('aborted')
  ) {
    return {
      httpStatus: 504,
      code: 'TIMEOUT',
      messageVi:
        'Kết nối tới máy chủ AI quá thời gian chờ. Nội dung tâm sự của bạn vẫn được giữ nguyên — hãy bấm Thử lại nhé.',
      retryable: true,
    };
  }

  if (status === 400) {
    return {
      httpStatus: 400,
      code: 'BAD_REQUEST',
      messageVi:
        'Yêu cầu gửi tới AI gặp lỗi định dạng. Vui lòng thử rút gọn hoặc bấm Thử lại.',
      retryable: false,
    };
  }

  return {
    httpStatus: 503,
    code: 'UPSTREAM_UNAVAILABLE',
    messageVi:
      'Máy chủ AI đang bận tạm thời (503). Tâm sự của bạn vẫn còn nguyên trong khung viết — hãy bấm Thử lại sau vài giây nhé.',
    retryable: true,
  };
}

/**
 * Single-pass prompt for Daily Nikki translation + therapeutic metadata.
 * Strict separation of PART 1 (faithful first-person translation) vs PART 2 (Sensei's Omoiyari reply).
 */
export function buildNikkiTranslatePrompts(
  vietnameseText: string,
  styleMode: NikkiStyleId,
  allowedMoodsList: string
): { systemInstruction: string; prompt: string } {
  const safeStyle: NikkiStyleId =
    styleMode === 'poetic' || styleMode === 'futsukei' ? styleMode : 'monologue';

  const systemInstruction = `Bạn là nhà văn Nhật ký bản xứ (Native Japanese Essayist) kiêm chuyên gia tâm lý Omoiyari.
Bạn thực hiện ĐÚNG 2 PHẦN theo thứ tự nghiêm ngặt trong cùng một phản hồi:

[PHẦN 1 — BẢN DỊCH NHẬT KÝ NGÔI THỨ NHẤT (XUẤT TRỰC TIẾP NGAY TỪ KÝ TỰ ĐẦU TIÊN)]
Quy tắc TỐI THƯỢNG bắt buộc tuyệt đối:
1. TRUNG THÀNH 100% VỚI TÂM SỰ & YÊU CẦU CỦA NGƯỜI VIẾT:
   - Dịch ĐẦY ĐỦ từng ý, từng sự kiện, nhân vật, thời gian, cảm xúc, câu hỏi tu từ mà người dùng chia sẻ sang tiếng Nhật tự nhiên, sống động như người Nhật thật viết nhật ký (KHÔNG dịch máy móc word-by-word, nhưng CẤM bỏ sót ý và CẤM bịa đặt chi tiết/thời tiết/cảnh vật người dùng không hề nói).
   - TUYỆT ĐỐI KHÔNG TRẢ LỜI, KHÔNG AN ỦI, KHÔNG KHUYÊN NHỦ NGƯỜI DÙNG TRONG PHẦN 1! Phần 1 phải là lời tự sự của CHÍNH NGƯỜI VIẾT (ngôi thứ nhất). Mọi lời an ủi/đồng cảm của Sensei chỉ được đặt trong trường "therapistReply" ở Phần 2.
   - Nếu trong văn bản có kèm yêu cầu cụ thể về văn phong/xưng hô/độ dài (ví dụ: "dịch lịch sự hơn", "xưng là boku", "ngắn gọn thôi", "nhấn mạnh nỗi nhớ nhà"), hãy tuân thủ chính xác yêu cầu đó cho bản dịch và KHÔNG dịch câu lệnh chỉ dẫn đó thành nội dung nhật ký.
   - Nếu có từ lóng/khẩu ngữ tiếng Việt (ví dụ: "buồn ngang", "tụt mood", "xui quá", "chán đời", "mệt rã rời", "áp lực quá"), chuyển hóa thành thành ngữ/cụm tự nhiên bản xứ tương đương sắc thái (ví dụ: 何となく気分が沈む, ついてない, クタクタになる...).
2. VĂN PHONG ĐÍCH: ${buildNikkiStyleGuidance(safeStyle)}
3. KHẢM FURIGANA CHUẨN 100%:
   - MỌI chữ Kanji hoặc từ ghép Kanji trong Phần 1 BẮT BUỘC bọc theo cú pháp {Kanji|hiragana} (ví dụ: {今日|きょう}は{仕事|しごと}が{大変|たいへん}だった。).
   - KHÔNG đưa đuôi okurigana Hiragana vào trong ngoặc nhọn (đúng: {落|お}としてしまった, sai: {落として|おとして}しまった).
   - Đọc đúng theo ngữ cảnh thực tế (thân mật: {今日|きょう}, trang trọng: {今日|こんにち}).
4. KHÔNG viết tiêu đề, KHÔNG viết "Phần 1:", KHÔNG lời chào, KHÔNG giải thích tiếng Việt, KHÔNG dấu \`\`\` trước Phần 1. Xuất thẳng đoạn văn tiếng Nhật ngay từ ký tự đầu tiên.

[DẤU PHÂN CÁCH BẮT BUỘC]
Ngay sau khi viết xong câu cuối của Phần 1, xuống dòng và in chính xác một dòng duy nhất:
${NIKKI_META_DELIMITER}

[PHẦN 2 — METADATA CHỮA LÀNH & HỌC THUẬT (JSON THUẦN HỢP LỆ, KHÔNG BỌC MARKDOWN)]
Ngay sau dòng phân cách, xuất DUY NHẤT 1 đối tượng JSON hợp lệ khớp hoàn toàn với nội dung người dùng vừa tâm sự:
{
  "emotionalTone": "Mô tả ngắn 1 câu tiếng Việt đúng mạch cảm xúc thật của người viết",
  "moodKanjiChar": "ĐÚNG 1 chữ Hán trong danh sách: ${allowedMoodsList}",
  "japaneseTitle": "Tiêu đề nhật ký ngắn bằng tiếng Nhật (không gắn {|} trong tiêu đề)",
  "haikuLines": ["Dòng 1 (5 âm)", "Dòng 2 (7 âm)", "Dòng 3 (5 âm)"],
  "haikuVietnamese": "Dịch thơ Haiku bằng tiếng Việt giàu cảm xúc, bám sát tâm sự thật",
  "bestQuoteJa": "1 câu đắt giá trích nguyên văn (không có {|}) từ Phần 1",
  "bestQuoteVi": "Dịch tinh tế câu Quote sang tiếng Việt",
  "therapistReply": {
    "japanese": "1-2 câu hồi đáp ấm áp chuẩn Omoiyari của Sensei dành RIÊNG cho tâm sự này (không chung chung)",
    "reading": "Toàn bộ câu therapistReply.japanese viết bằng Hiragana",
    "vietnamese": "Bản dịch tiếng Việt ấm áp cho therapistReply.japanese",
    "cultureNote": "1 câu ngắn giải thích sắc thái văn hóa Omoiyari/từ ngữ trong lời đáp"
  },
  "treasures": [
    {
      "expression": "Cụm từ/Collocation đắt giá xuất hiện trong Phần 1",
      "furigana": "Cách đọc Hiragana",
      "romaji": "Romaji",
      "pitchType": "heiban | atamadaka | nakadaka | odaka",
      "pitchAccentNum": 0,
      "pitchLabel": "Nhãn Pitch Accent ngắn gọn",
      "meaning": "Nghĩa tiếng Việt sát ngữ cảnh tâm sự",
      "whyLearn": "Lý do cụm này diễn đạt cảm xúc tự nhiên hơn cách dịch máy",
      "jlpt": "N5 | N4 | N3 | N2 | N1",
      "contextSentence": "Câu chứa cụm từ đó trong Phần 1 (không có {|})"
    }
  ]
}
(Mảng "treasures" gồm 3 đến 4 cụm từ đắt giá nhất.)`;

  const prompt = `Đây là dòng tâm sự / yêu cầu của người dùng. Hãy dịch trung thành trọn vẹn sang nhật ký tiếng Nhật ở Phần 1 (khảm 100% {Kanji|hiragana}, KHÔNG trả lời người dùng ở Phần 1), sau đó in dòng ${NIKKI_META_DELIMITER} và JSON Phần 2:

"""
${vietnameseText.trim()}
"""`;

  return { systemInstruction, prompt };
}

/**
 * Compact prompt for Self-Write Red Pen (Bút Đỏ) mode using inline Furigana instead of huge tokens[].
 */
export function buildNikkiSelfWritePrompts(
  rawJapaneseText: string,
  styleMode: NikkiStyleId,
  allowedMoodsList: string
): { systemInstruction: string; prompt: string } {
  const safeStyle: NikkiStyleId =
    styleMode === 'poetic' || styleMode === 'futsukei' ? styleMode : 'monologue';

  const systemInstruction = `Bạn là Sensei "Bút Đỏ Chữa Lành" (Red Pen & Ego-Preservation Mentor), thi sĩ Haiku và người bạn tri kỷ bản xứ.
Người học đã tự viết nhật ký bằng tiếng Nhật.
Nhiệm vụ tối cao:
1. Bảo toàn lòng tự trọng ("praiseFirst"): 1 câu khen chân thành điểm làm tốt trong đoạn người học tự viết.
2. Soi Bút Đỏ tinh tế ("redPenCorrections"): 2-4 điểm nâng cấp lên Native Flow ("original" trích chính xác cụm trong bài gốc, "corrected", "category": "particle"|"conjugation"|"nuance"|"style", "gentleReason").
3. Viết bản nâng cấp hoàn thiện giữ trọn 100% ý nghĩa gốc của người học vào "japanesePlain" theo phong cách: ${buildNikkiStyleGuidance(safeStyle)}.
4. Viết "japaneseFurigana": chính xác nội dung "japanesePlain" nhưng bọc MỌI chữ Kanji bằng {Kanji|hiragana} (không gồm okurigana).
5. Dịch chính xác trọn vẹn ý nghĩa đoạn người học viết sang tiếng Việt vào "vietnameseMeaning".
6. Chọn "moodKanjiChar" (1 chữ Hán trong: ${allowedMoodsList}), sáng tác "haikuLines" (3 dòng) + "haikuVietnamese", trích "bestQuoteJa" + "bestQuoteVi".
7. Tạo "therapistReply" (Omoiyari cá nhân hóa đúng tâm sự) và 3-4 "treasures" (Collocation đắt giá).
Chỉ trả về JSON thuần hợp lệ theo schema.`;

  const prompt = `Hãy chấm Bút Đỏ tinh tế, nâng cấp sang văn phong bản xứ, gắn Furigana và hồi đáp Omoiyari cho trang nhật ký sau:

"""
${rawJapaneseText.trim()}
"""`;

  return { systemInstruction, prompt };
}

/**
 * Splits streaming response into Part 1 (translation) and Part 2 (metadata JSON),
 * safely hiding any partial trailing `===NIKKI_META_JSON===` prefix during streaming.
 */
export function splitNikkiStreamOutput(rawAccumulated: string): {
  translationRaw: string;
  metaRaw: string;
  hasDelimiter: boolean;
} {
  if (!rawAccumulated) {
    return { translationRaw: '', metaRaw: '', hasDelimiter: false };
  }

  // Exact delimiter match
  const exactIdx = rawAccumulated.indexOf(NIKKI_META_DELIMITER);
  if (exactIdx !== -1) {
    return {
      translationRaw: rawAccumulated.slice(0, exactIdx).trim(),
      metaRaw: rawAccumulated.slice(exactIdx + NIKKI_META_DELIMITER.length).trim(),
      hasDelimiter: true,
    };
  }

  // Tolerant delimiter match (e.g. minor whitespace/equals variance like "== NIKKI_META_JSON ==")
  const fuzzyMatch = rawAccumulated.match(/\r?\n?\s*={2,}\s*NIKKI_META_JSON\s*={2,}\s*/i);
  if (fuzzyMatch && typeof fuzzyMatch.index === 'number') {
    return {
      translationRaw: rawAccumulated.slice(0, fuzzyMatch.index).trim(),
      metaRaw: rawAccumulated.slice(fuzzyMatch.index + fuzzyMatch[0].length).trim(),
      hasDelimiter: true,
    };
  }

  // While streaming, strip any partial suffix matching the beginning of `===NIKKI_META_JSON===`
  // so delimiter tokens never flash on screen.
  let safeTranslation = rawAccumulated;
  const maxPrefixCheck = Math.min(safeTranslation.length, NIKKI_META_DELIMITER.length);
  for (let len = maxPrefixCheck; len >= 2; len--) {
    const tail = safeTranslation.slice(-len);
    if (NIKKI_META_DELIMITER.startsWith(tail)) {
      safeTranslation = safeTranslation.slice(0, -len);
      break;
    }
  }

  return {
    translationRaw: safeTranslation,
    metaRaw: '',
    hasDelimiter: false,
  };
}

/**
 * Converts alternate LLM furigana notations into canonical `{Kanji|hiragana}` syntax:
 * - <ruby>漢字<rt>かんじ</rt></ruby> -> {漢字|かんじ}
 * - 漢字[かんじ] -> {漢字|かんじ}
 * - 漢字(かんじ) or 漢字（かんじ） -> {漢字|かんじ} (only when inside parens is pure kana)
 * Also strips accidental markdown fences or leading labels like "Phần 1:" / "日本語:".
 */
export function normalizeAlternativeFuriganaSyntax(raw: string): string {
  if (!raw) return '';
  let text = raw
    .replace(/^\uFEFF/, '')
    .replace(/```[a-z]*\r?\n?/gi, '')
    .replace(/```/g, '')
    .trimStart();

  // Strip accidental header labels if a fallback model adds one
  text = text.replace(
    /^(?:\[?\s*PHẦN\s*1[^\n]*\]?\s*\n+|(?:Bản dịch(?:\s+tiếng\s+Nhật)?|Nhật ký|日本語)\s*[:：]\s*)/i,
    ''
  );

  // <ruby>Kanji<rt>kana</rt></ruby> (with optional <rp>)
  text = text.replace(
    /<ruby>\s*([^<]+?)\s*(?:<rp>[^<]*<\/rp>)?\s*<rt>\s*([^<]+?)\s*<\/rt>\s*(?:<rp>[^<]*<\/rp>)?\s*<\/ruby>/gi,
    (_m, base, reading) => `{${String(base).trim()}|${String(reading).trim()}}`
  );

  // Kanji[kana] -> {Kanji|kana}
  text = text.replace(
    /([\u4e00-\u9faf\u3400-\u4dbf々]+)\[([\u3040-\u30ffー・\s]{1,24})\]/g,
    (_m, base, reading) => `{${base}|${String(reading).trim()}}`
  );

  // Kanji(kana) or Kanji（kana） -> {Kanji|kana} when parenthetical is strictly Hiragana/Katakana
  text = text.replace(
    /([\u4e00-\u9faf\u3400-\u4dbf々]+)[(（]([\u3040-\u30ffー]{1,24})[)）]/g,
    (_m, base, reading) => `{${base}|${reading}}`
  );

  return text;
}

/**
 * Strips inline furigana markers from a string to obtain clean plain Japanese.
 */
export function stripInlineFurigana(annotated: string): string {
  if (!annotated) return '';
  return normalizeAlternativeFuriganaSyntax(annotated)
    .replace(/\{([^{}|\n]+)\|([^{}|\n]+)\}/g, '$1')
    .trim();
}

export function containsJapaneseChars(text: string): boolean {
  return JAPANESE_CHAR_REGEX.test(text || '');
}

export function containsKanjiChars(text: string): boolean {
  return KANJI_CLUSTER_REGEX.test(text || '');
}

/**
 * Tolerant regex field rescue for Nikki metadata JSON if the model's Part 2 JSON is truncated or malformed.
 */
function rescueJsonStringField(src: string, key: string): string {
  const re = new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's');
  const m = src.match(re);
  if (m && m[1]) {
    try {
      return JSON.parse(`"${m[1].replace(/\n/g, '\\n').replace(/\r/g, '')}"`).trim();
    } catch {
      return m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').trim();
    }
  }
  return '';
}

export function parseNikkiMetaJson<T extends Record<string, any>>(metaRaw: string): Partial<T> {
  const safe = (metaRaw || '').trim();
  if (!safe) return {};

  // Tier 1: Repair & parse cleanly
  try {
    const repaired = repairRawJsonString(safe);
    if (repaired.startsWith('{') && repaired.endsWith('}')) {
      const parsed = JSON.parse(repaired);
      if (parsed && typeof parsed === 'object') {
        return parsed as Partial<T>;
      }
    }
  } catch {
    // Fall through to Tier 2
  }

  // Tier 2: Rescue top-level string fields so mood/title/quote/tone are preserved
  const cleaned = safe.replace(/```(?:json)?/gi, '').replace(/```/g, '');
  const rescued: Record<string, any> = {};
  const keys = [
    'emotionalTone',
    'moodKanjiChar',
    'japaneseTitle',
    'haikuVietnamese',
    'bestQuoteJa',
    'bestQuoteVi',
    'praiseFirst',
    'japanesePlain',
    'japaneseFurigana',
    'vietnameseMeaning',
  ];
  for (const k of keys) {
    const val = rescueJsonStringField(cleaned, k);
    if (val) rescued[k] = val;
  }

  // Rescue therapistReply block if present
  const trIdx = cleaned.indexOf('"therapistReply"');
  if (trIdx !== -1) {
    const trSlice = cleaned.slice(trIdx);
    const jp = rescueJsonStringField(trSlice, 'japanese');
    const vi = rescueJsonStringField(trSlice, 'vietnamese');
    if (jp || vi) {
      rescued.therapistReply = {
        japanese: jp,
        reading: rescueJsonStringField(trSlice, 'reading') || jp,
        vietnamese: vi,
        cultureNote: rescueJsonStringField(trSlice, 'cultureNote'),
      };
    }
  }

  return rescued as Partial<T>;
}
