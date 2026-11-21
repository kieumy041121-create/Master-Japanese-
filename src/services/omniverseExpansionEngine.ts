/**
 * Omniverse Sanctuaries Seed Catalogs & Zero-Duplication `[+3]` AI Expansion Engine
 * Powers all 5 Japanese cultural immersion sanctuaries via server-side Gemini proxy (`callGemini`).
 */

import { callGemini, safeExtractJson } from './geminiService';
import {
  BunkoLevel,
  BunkoMetaphorNote,
  BunkoWork,
  ConservatoryExhibit,
  KissatenMessage,
  KissatenPersona,
  KissatenReceipt,
  LetterPrismResult,
  LyricDecompileRow,
  omniverseStorageService,
  VinylTrack,
} from './omniverseStorageService';
import { MicroSeasonInfo, SolarTermInfo } from './japaneseCalendarEngine';
import {
  FALLBACK_AIZUCHI_HINTS,
  normalizeKissatenPersona,
  normalizeRubyTokens,
  sanitizeAndParseKissatenReply,
} from '../utils/kissatenResilience';
import type { RubyToken } from './omniverseStorageService';

// ============================================================================
// 1. YORU NO KISSATEN (夜の喫茶店) — INITIAL PERSONAS & AI ENGINES
// ============================================================================

export const INITIAL_KISSATEN_PERSONAS: KissatenPersona[] = [
  {
    id: 'persona_master_kenji',
    name: 'Master Kenji · Chủ Quán Trầm Tính',
    japaneseName: '健二マスター',
    role: 'Chủ quán cà phê pha phin vải (Nel-drip)',
    region: 'Jimbocho, Tokyo',
    speechRegister: 'Teineigo trầm ấm',
    favoriteDrink: 'Mandheling rang đậm pha phin vải',
    avatarKanji: '珈',
    accentColor: '#b47c48',
    bio: 'Gần 30 năm đứng sau quầy gỗ sồi cũ ở khu phố sách Jimbocho. Ông ít nói, nhưng mỗi câu trả lời đều chậm rãi, sâu sắc và ấm như hơi cà phê đêm mưa.',
    openingGreeting: 'こんばんは。雨の中、よくいらっしゃいましたね。今夜は少し深煎りの珈琲でも淹れましょうか。',
    openingTokens: [
      { text: 'こんばんは。' },
      { text: '雨', reading: 'あめ' },
      { text: 'の' },
      { text: '中', reading: 'なか' },
      { text: '、よくいらっしゃいましたね。' },
      { text: '今夜', reading: 'こんや' },
      { text: 'は' },
      { text: '少', reading: 'すこ' },
      { text: 'し' },
      { text: '深煎', reading: 'ふかい' },
      { text: 'りの' },
      { text: '珈琲', reading: 'コーヒー' },
      { text: 'でも' },
      { text: '淹', reading: 'い' },
      { text: 'れましょうか。' },
    ],
    openingReading: 'こんばんは。あめのなか、よくいらっしゃいましたね。こんやはすこしふかいりのコーヒーでもいれましょうか。',
    openingVietnamese: 'Chào buổi tối. Trời mưa thế này mà bạn vẫn ghé qua. Đêm nay để tôi pha một tách cà phê rang hơi đậm một chút nhé?',
    systemPersonaPrompt:
      'Bạn là Master Kenji (健二マスター), chủ quán cà phê Showa trầm ấm ở Jimbocho Tokyo, nói tiếng Nhật Teineigo điềm đạm, lịch thiệp, ấm áp và giàu lòng Omoiyari. Không bao giờ chấm điểm hay sửa lỗi khô khan như giáo viên.',
    createdAt: 1700000001000,
  },
  {
    id: 'persona_hana_tokyo',
    name: 'Hana · Sinh Viên Văn Học Tokyo',
    japaneseName: '花（文学部）',
    role: 'Sinh viên năm 3 chuyên ngành Văn học Nhật cận đại',
    region: 'Shimokitazawa, Tokyo',
    speechRegister: 'Đời thường Tokyo',
    favoriteDrink: 'Trà sữa quế nóng (Chai)',
    avatarKanji: '栞',
    accentColor: '#c97b84',
    bio: 'Thường ngồi góc cửa sổ với cuốn sách bỏ túi Bunkobon đầy ghi chú bút chì. Hay trò chuyện tự nhiên bằng khẩu ngữ trẻ trung Tokyo pha chút lãng mạn văn chương.',
    openingGreeting: 'あ、お疲れさまです！ちょうどさっきまで漱石の小説を読んでたところなんです。今日はどんな一日でした？',
    openingTokens: [
      { text: 'あ、お' },
      { text: '疲', reading: 'つか' },
      { text: 'れさまです！ちょうどさっきまで' },
      { text: '漱石', reading: 'そうせき' },
      { text: 'の' },
      { text: '小説', reading: 'しょうせつ' },
      { text: 'を' },
      { text: '読', reading: 'よ' },
      { text: 'んでたところなんです。' },
      { text: '今日', reading: 'きょう' },
      { text: 'はどんな' },
      { text: '一日', reading: 'いちにち' },
      { text: 'でした？' },
    ],
    openingReading: 'あ、おつかれさまです！ちょうどさっきまでそうせきのしょうせつをよんでたところなんです。きょうはどんないちにちでした？',
    openingVietnamese: 'À, hôm nay bạn vất vả rồi! Mình cũng vừa đọc tiểu thuyết của Sōseki xong thôi. Hôm nay một ngày của bạn thế nào?',
    systemPersonaPrompt:
      'Bạn là Hana (花), nữ sinh viên văn học thân thiện ở Shimokitazawa Tokyo. Dùng tiếng Nhật đời thường lịch sự nhẹ nhàng (Desu/Masu pha khẩu ngữ tự nhiên Tokyo), thích trò chuyện về sách, âm nhạc, cảm xúc thường nhật.',
    createdAt: 1700000002000,
  },
  {
    id: 'persona_tetsuo_kyoto',
    name: 'Bác Tetsuo · Nghệ Nhân Gốm Kyoto',
    japaneseName: '哲夫（陶芸家）',
    role: 'Nghệ nhân làm gốm thủ công Kiyomizu-yaki',
    region: 'Higashiyama, Kyoto',
    speechRegister: 'Kansai-ben nhẹ',
    favoriteDrink: 'Trà rang Hōjicha ấm',
    avatarKanji: '陶',
    accentColor: '#5f7f67',
    bio: 'Bàn tay luôn vương chút đất sét mịn, thích ghé quán mỗi tối thứ Sáu để nghỉ ngơi. Nói giọng Kyoto (Kansai-ben) chậm rãi, dí dỏm và rất tinh tế về Uchi/Soto.',
    openingGreeting: 'おおきに、ええ夜どすなあ。土をこねとったら、つい時計を見るん忘れてしもて。あんたも一息つきはりませんか。',
    openingTokens: [
      { text: 'おおきに、ええ' },
      { text: '夜', reading: 'よる' },
      { text: 'どすなあ。' },
      { text: '土', reading: 'つち' },
      { text: 'をこねとったら、つい' },
      { text: '時計', reading: 'とけい' },
      { text: 'を' },
      { text: '見', reading: 'み' },
      { text: 'るん' },
      { text: '忘', reading: 'わす' },
      { text: 'れてしもて。あんたも' },
      { text: '一息', reading: 'ひといき' },
      { text: 'つきはりませんか。' },
    ],
    openingReading: 'おおきに、ええよるどすなあ。つちをこねとったら、ついとけいをみるんわすれてしもて。あんたもひといきつきはりませんか。',
    openingVietnamese: 'Cảm ơn nhiều, đêm nay dễ chịu quá ha. Mải nhào đất sét mà tôi quên khuấy cả xem đồng hồ. Bạn cũng ngồi xuống thở phào một chút đi.',
    systemPersonaPrompt:
      'Bạn là bác Tetsuo (哲夫), nghệ nhân gốm Kyoto nói giọng Kyoto/Kansai nhẹ nhàng dễ hiểu, ấm áp, hay chia sẻ triết lý Wabi-sabi và nghề thủ công.',
    createdAt: 1700000003000,
  },
];

export interface AizuchiSuggestion {
  japanese: string;
  reading: string;
  vietnamese: string;
  registerNote: string;
}

export const INITIAL_AIZUCHI_SUGGESTIONS: AizuchiSuggestion[] = [
  {
    japanese: 'なるほど、そういう見方もありますね。',
    reading: 'なるほど、そういうみかたもありますね。',
    vietnamese: 'Ra là vậy, cũng có góc nhìn như thế nữa nhỉ.',
    registerNote: 'Aizuchi đồng cảm sâu (Teineigo)',
  },
  {
    japanese: 'わかります、なんだかほっとしますね。',
    reading: 'わかります、なんだかほっとしますね。',
    vietnamese: 'Mình hiểu cảm giác đó, nghe thấy nhẹ lòng hẳn ra.',
    registerNote: 'Đệm lời chữa lành (Gần gũi)',
  },
  {
    japanese: 'それは素敵ですね。もう少し聞かせていただけますか？',
    reading: 'それはすてきですね。もうすこしきかせていただけますか？',
    vietnamese: 'Điều đó tuyệt quá. Bạn kể thêm một chút được không?',
    registerNote: 'Mở chuyện tinh tế (Lịch thiệp)',
  },
  {
    japanese: 'へえ、そうなんですか！初めて知りました。',
    reading: 'へえ、そうなんですか！はじめてしりました。',
    vietnamese: 'Ồ, vậy sao ạ! Lần đầu mình mới biết luôn đấy.',
    registerNote: 'Phản ứng ngạc nhiên tự nhiên',
  },
];

const KISSATEN_RETRY_DELAYS_MS = [800, 1600];

function sleepMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

export async function sendKissatenReply(
  persona: KissatenPersona,
  history: KissatenMessage[],
  userText: string
): Promise<{
  japanese: string;
  tokens: RubyToken[];
  reading: string;
  vietnamese: string;
  uchiSotoNote: string;
  aizuchiHints: AizuchiSuggestion[];
}> {
  const safePersona = normalizeKissatenPersona(persona);
  const cleanUserText = String(userText ?? '').trim();

  if (!cleanUserText) {
    throw new Error('Lời nhắn đang trống.');
  }

  // Filter out failed turns and keep a clean compact history payload
  const cleanHistory = (Array.isArray(history) ? history : [])
    .filter((m) => m && m.status !== 'failed' && typeof m.japanese === 'string' && m.japanese.trim().length > 0)
    .slice(-18)
    .map((m) => ({
      id: m.id,
      sender: m.sender,
      japanese: m.japanese,
      status: m.status,
    }));

  let lastError: Error = new Error('Mất kết nối tạm thời tới Quán Cà Phê Đêm.');

  // Initial attempt + up to 2 silent automatic retries (800ms -> 1600ms)
  for (let attempt = 0; attempt <= KISSATEN_RETRY_DELAYS_MS.length; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 48000);

    try {
      const response = await fetch('/api/kissaten/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          persona: {
            persona_id: safePersona.persona_id,
            id: safePersona.id,
            name: safePersona.name,
            japaneseName: safePersona.japaneseName,
            role: safePersona.role,
            region: safePersona.region,
            speech_style: safePersona.speech_style,
            speechRegister: safePersona.speechRegister,
            favoriteDrink: safePersona.favoriteDrink,
            openingGreeting: safePersona.openingGreeting,
            system_prompt: safePersona.system_prompt,
            systemPersonaPrompt: safePersona.systemPersonaPrompt,
          },
          history: cleanHistory,
          userMessage: cleanUserText,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errPayload = await response.json().catch(() => ({} as any));
        const serverReason =
          typeof errPayload?.error === 'string' && errPayload.error.trim()
            ? errPayload.error.trim()
            : response.status === 429
            ? 'Hết hạn mức gọi AI tạm thời (429). Vui lòng thử gửi lại sau giây lát.'
            : response.status === 403
            ? 'Khóa API chưa hợp lệ hoặc thiếu quyền (403).'
            : response.status === 504
            ? 'Máy chủ AI phản hồi quá chậm (Timeout).'
            : `Máy chủ AI đang bận (${response.status}).`;

        lastError = new Error(serverReason);

        if (isRetryableStatus(response.status) && attempt < KISSATEN_RETRY_DELAYS_MS.length) {
          await sleepMs(KISSATEN_RETRY_DELAYS_MS[attempt]);
          continue;
        }
        throw lastError;
      }

      const payload = await response.json().catch(() => null);
      const replyObj = payload?.reply;

      if (replyObj && typeof replyObj.japanese === 'string' && replyObj.japanese.trim()) {
        const jp = replyObj.japanese.trim();
        const reading =
          typeof replyObj.reading === 'string' && replyObj.reading.trim() ? replyObj.reading.trim() : jp;
        const vietnamese =
          typeof replyObj.vietnamese === 'string' && replyObj.vietnamese.trim()
            ? replyObj.vietnamese.trim()
            : 'Lời đáp ấm áp từ vị khách trong quán cà phê đêm.';
        const uchiSotoNote =
          typeof replyObj.uchiSotoNote === 'string' ? replyObj.uchiSotoNote.trim() : '';
        const tokens = normalizeRubyTokens(replyObj.tokens, jp, reading);
        const aizuchiHints: AizuchiSuggestion[] =
          Array.isArray(replyObj.aizuchiHints) && replyObj.aizuchiHints.length > 0
            ? replyObj.aizuchiHints
            : [...FALLBACK_AIZUCHI_HINTS];

        return {
          japanese: jp,
          tokens,
          reading,
          vietnamese,
          uchiSotoNote,
          aizuchiHints,
        };
      }

      // Secondary client-side rescue if server returned raw text
      if (typeof payload?.text === 'string') {
        const rescued = sanitizeAndParseKissatenReply(payload.text, safePersona);
        if (rescued) {
          return {
            japanese: rescued.japanese,
            tokens: rescued.tokens,
            reading: rescued.reading,
            vietnamese: rescued.vietnamese,
            uchiSotoNote: rescued.uchiSotoNote,
            aizuchiHints: rescued.aizuchiHints,
          };
        }
      }

      lastError = new Error('Phản hồi từ quán cà phê chưa hoàn chỉnh.');
      if (attempt < KISSATEN_RETRY_DELAYS_MS.length) {
        await sleepMs(KISSATEN_RETRY_DELAYS_MS[attempt]);
        continue;
      }
      throw lastError;
    } catch (err: any) {
      clearTimeout(timeoutId);
      const isAbort = err?.name === 'AbortError';
      const isNetwork = err instanceof TypeError || /network|failed to fetch/i.test(err?.message || '');

      if (isAbort) {
        lastError = new Error('Quá thời gian chờ phản hồi từ quán (Timeout).');
      } else if (isNetwork) {
        lastError = new Error('Mất kết nối mạng tạm thời. Kiểm tra mạng rồi bấm Gửi lại.');
      } else if (err instanceof Error) {
        lastError = err;
      }

      // Do not retry non-retryable auth/validation errors
      const nonRetryable = /403|400|API_KEY|trống/i.test(lastError.message);
      if (!nonRetryable && attempt < KISSATEN_RETRY_DELAYS_MS.length) {
        await sleepMs(KISSATEN_RETRY_DELAYS_MS[attempt]);
        continue;
      }
      throw lastError;
    }
  }

  throw lastError;
}

export async function expandThreeKissatenPersonas(existingNames: string[]): Promise<KissatenPersona[]> {
  const prompt = `Hãy triệu hồi ĐÚNG 3 vị khách hoàn toàn mới, độc bản, có chiều sâu văn hóa Nhật Bản cho quán cà phê đêm khuya Showa (Yoru no Kissaten).
KHÔNG ĐƯỢC TRÙNG LẶP nghề nghiệp, tên gọi hay tính cách với danh sách đã gặp sau: ${existingNames.join(', ')}.
Mỗi vị khách thuộc một vùng miền, nghề nghiệp và tầng ngôn ngữ khác nhau (ví dụ: người chỉnh dây đàn piano ở Sapporo, cô thủ thư sách cổ ở Kanazawa, bác lái tàu đêm ở Nagano, họa sĩ vẽ biển hiệu phim Showa ở Osaka...).`;

  const schema = {
    type: 'OBJECT',
    properties: {
      personas: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            name: { type: 'STRING' },
            japaneseName: { type: 'STRING' },
            role: { type: 'STRING' },
            region: { type: 'STRING' },
            speechRegister: { type: 'STRING' },
            favoriteDrink: { type: 'STRING' },
            avatarKanji: { type: 'STRING' },
            accentColor: { type: 'STRING' },
            bio: { type: 'STRING' },
            openingGreeting: { type: 'STRING' },
            openingReading: { type: 'STRING' },
            openingVietnamese: { type: 'STRING' },
            systemPersonaPrompt: { type: 'STRING' },
          },
          required: [
            'name',
            'japaneseName',
            'role',
            'region',
            'speechRegister',
            'favoriteDrink',
            'avatarKanji',
            'accentColor',
            'bio',
            'openingGreeting',
            'openingReading',
            'openingVietnamese',
            'systemPersonaPrompt',
          ],
        },
      },
    },
    required: ['personas'],
  };

  const raw = await callGemini(
    prompt,
    'Bạn là nhà biên kịch văn học Nhật Bản tạo nhân vật quán cà phê đêm giàu chiều sâu, chân thực, tiếng Nhật chuẩn bản xứ.',
    undefined,
    false,
    schema,
    true
  );
  const parsed = safeExtractJson<{ personas: Array<Omit<KissatenPersona, 'id' | 'createdAt'>> }>(raw, { personas: [] });
  if (!parsed.personas || parsed.personas.length === 0) {
    throw new Error('Không thể triệu hồi thêm vị khách mới lúc này.');
  }

  const now = Date.now();
  const candidates: KissatenPersona[] = parsed.personas.slice(0, 3).map((p, idx) => {
    const normalized = normalizeKissatenPersona({
      ...p,
      id: `persona_ai_${now}_${idx}`,
      createdAt: now + idx,
    });
    return {
      id: normalized.id,
      name: normalized.name,
      japaneseName: normalized.japaneseName,
      role: normalized.role,
      region: normalized.region,
      speechRegister: normalized.speechRegister,
      favoriteDrink: normalized.favoriteDrink,
      avatarKanji: normalized.avatarKanji,
      accentColor: normalized.accentColor,
      bio: normalized.bio,
      openingGreeting: normalized.openingGreeting,
      openingReading: normalized.openingReading,
      openingVietnamese: normalized.openingVietnamese,
      systemPersonaPrompt: normalized.systemPersonaPrompt,
      createdAt: normalized.createdAt,
    };
  });

  try {
    return await omniverseStorageService.filterAndRegisterUnique(
      'kissaten_persona',
      candidates,
      (c) => `${c.japaneseName}_${c.role}`
    );
  } catch {
    return candidates;
  }
}

export async function expandThreeAizuchiPrompts(
  persona: KissatenPersona,
  lastMessage: string,
  seenPrompts: string[]
): Promise<AizuchiSuggestion[]> {
  const prompt = `Trong quán cà phê đêm khuya cùng ${persona.name} (${persona.speechRegister}), câu nói gần nhất là: "${lastMessage}".
Hãy tạo ĐÚNG 3 câu đệm lời Aizuchi (相槌) hoặc câu mở chuyện tinh tế, HOÀN TOÀN MỚI, không trùng với: ${seenPrompts.slice(-12).join(' | ')}.`;

  const schema = {
    type: 'OBJECT',
    properties: {
      suggestions: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            japanese: { type: 'STRING' },
            reading: { type: 'STRING' },
            vietnamese: { type: 'STRING' },
            registerNote: { type: 'STRING' },
          },
          required: ['japanese', 'reading', 'vietnamese', 'registerNote'],
        },
      },
    },
    required: ['suggestions'],
  };

  const raw = await callGemini(prompt, 'Chuyên gia ngữ dụng học hội thoại tiếng Nhật tự nhiên.', undefined, false, schema, true);
  const parsed = safeExtractJson<{ suggestions: AizuchiSuggestion[] }>(raw, { suggestions: [] });
  if (!parsed.suggestions.length) {
    throw new Error('Chưa thể sinh thêm gợi ý đệm lời mới.');
  }

  return omniverseStorageService.filterAndRegisterUnique(
    'kissaten_aizuchi',
    parsed.suggestions.slice(0, 3),
    (s) => s.japanese
  );
}

export async function generatePragmaticReceipt(
  persona: KissatenPersona,
  messages: KissatenMessage[]
): Promise<KissatenReceipt> {
  const userLines = messages.filter((m) => m.sender === 'user').map((m) => m.japanese);
  const transcript = messages
    .slice(-12)
    .map((m) => `${m.sender === 'user' ? 'Người học' : persona.japaneseName}: ${m.japanese}`)
    .join('\n');

  const prompt = `Hãy lập một "Hóa Đơn Ngữ Dụng Học" (Showa Pragmatic Receipt) ấm áp, tinh tế cho buổi trò chuyện sau với ${persona.name}:
${transcript}

Quy tắc: Tuyệt đối KHÔNG chấm điểm số, KHÔNG dùng ngôn từ chê bai hay dấu X đỏ. Hãy phân tích 2–3 cụm câu của người học (hoặc đề xuất nâng cấp tự nhiên nhất cho bối cảnh trò chuyện vừa rồi), chỉ ra chỗ nào hơi xa cách sách vở và gợi ý cách diễn đạt mềm mại, đậm chất Omoiyari của người bản xứ.`;

  const schema = {
    type: 'OBJECT',
    properties: {
      atmosphereSummary: { type: 'STRING' },
      warmthScoreLabel: { type: 'STRING' },
      items: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            userPhrase: { type: 'STRING' },
            pragmaticNote: { type: 'STRING' },
            nativeUpgrade: { type: 'STRING' },
            nativeReading: { type: 'STRING' },
            omoiyariMeaning: { type: 'STRING' },
          },
          required: ['userPhrase', 'pragmaticNote', 'nativeUpgrade', 'nativeReading', 'omoiyariMeaning'],
        },
      },
    },
    required: ['atmosphereSummary', 'warmthScoreLabel', 'items'],
  };

  const raw = await callGemini(
    prompt,
    'Bạn là chuyên gia ngữ dụng học Nhật Bản viết hóa đơn tinh tế của một quán cà phê Showa ấm áp.',
    undefined,
    false,
    schema,
    true
  );
  const parsed = safeExtractJson<Omit<KissatenReceipt, 'id' | 'personaName' | 'dateIso'> | null>(raw, null);
  if (!parsed || !parsed.items || parsed.items.length === 0) {
    throw new Error(
      userLines.length === 0
        ? 'Hãy trò chuyện ít nhất một vài câu trước khi in Hóa Đơn Ngữ Dụng Học.'
        : 'Không thể tạo Hóa Đơn Ngữ Dụng Học lúc này.'
    );
  }

  return {
    id: `receipt_${Date.now()}`,
    personaName: persona.name,
    dateIso: new Date().toISOString(),
    ...parsed,
  };
}

// ============================================================================
// 2. BUNKO TEAHOUSE (文庫茶室) — LITERARY WORKS, SYNTAX X-RAY & +3 EXPANSION
// ============================================================================

export const INITIAL_BUNKO_WORKS: BunkoWork[] = [
  {
    id: 'bunko_soseki_kusamakura',
    titleJp: '草枕',
    titleReading: 'くさまくら',
    titleVi: 'Gối Cỏ (Khúc Khai Đề)',
    authorJp: '夏目漱石',
    authorVi: 'Natsume Sōseki',
    eraTag: 'Meiji 39 (1906)',
    genre: 'Kinh điển cận đại',
    moodDescription: 'Một triết lý tĩnh tại về cái đẹp và nghệ thuật đứng lùi một bước để ngắm thế gian không vướng bận.',
    levels: {
      N4: [
        {
          id: 'kusa_n4_1',
          japanese: '山道を歩きながら、静かに考えました。',
          tokens: [
            { text: '山道', reading: 'やまみち' },
            { text: 'を' },
            { text: '歩', reading: 'ある' },
            { text: 'きながら、' },
            { text: '静', reading: 'しず' },
            { text: 'かに' },
            { text: '考', reading: 'かんが' },
            { text: 'えました。' },
          ],
          vietnamese: 'Vừa bước đi trên con đường núi, tôi vừa lặng lẽ suy nghĩ.',
          syntaxSegments: [
            { text: '山道を歩きながら', reading: 'やまみちをあるきながら', role: 'modifier', labelVi: 'Mệnh đề đồng thời', explanationVi: 'Hành động nền diễn ra song song (〜ながら).' },
            { text: '静かに', reading: 'しずかに', role: 'modifier', labelVi: 'Trạng ngữ cách thức', explanationVi: 'Bổ nghĩa sắc thái tĩnh lặng cho động từ suy nghĩ.' },
            { text: '考えました', reading: 'かんがえました', role: 'predicate', labelVi: 'Vị ngữ chính', explanationVi: 'Động từ trung tâm khép lại câu (chủ ngữ "tôi" được ẩn theo tự nhiên tiếng Nhật).' },
          ],
          structureSummaryVi: 'Cấu trúc đồng thời [Hành động nền ながら] + [Trạng thái] + [Vị ngữ chính].',
        },
        {
          id: 'kusa_n4_2',
          japanese: '頭だけで考えると、心が固くなります。気持ちだけで動くと、流されてしまいます。',
          tokens: [
            { text: '頭', reading: 'あたま' },
            { text: 'だけで' },
            { text: '考', reading: 'かんが' },
            { text: 'えると、' },
            { text: '心', reading: 'こころ' },
            { text: 'が' },
            { text: '固', reading: 'かた' },
            { text: 'くなります。' },
            { text: '気持', reading: 'きもち' },
            { text: 'ちだけで' },
            { text: '動', reading: 'うご' },
            { text: 'くと、' },
            { text: '流', reading: 'なが' },
            { text: 'されてしまいます。' },
          ],
          vietnamese: 'Chỉ dùng lý trí để nghĩ thì lòng trở nên cứng nhắc. Chỉ thuận theo cảm xúc thì dễ bị cuốn trôi.',
          syntaxSegments: [
            { text: '頭だけで考えると', reading: 'あたまだけでかんがえると', role: 'modifier', labelVi: 'Điều kiện tự nhiên', explanationVi: 'Mệnh đề điều kiện với trợ từ と chỉ hệ quả tất yếu.' },
            { text: '心が', reading: 'こころが', role: 'subject', labelVi: 'Chủ ngữ', explanationVi: 'Chủ thể chịu biến đổi trạng thái.' },
            { text: '固くなります', reading: 'かたくなります', role: 'predicate', labelVi: 'Vị ngữ biến đổi', explanationVi: 'Tính từ 固い + なる diễn tả sự chuyển hóa.' },
          ],
          structureSummaryVi: 'Hai vế đối xứng song hành [Điều kiện と] → [Hệ quả tất yếu].',
        },
      ],
      N3: [
        {
          id: 'kusa_n3_1',
          japanese: '山道を登りながら、ふとこんなことを考えた。',
          tokens: [
            { text: '山道', reading: 'やまみち' },
            { text: 'を' },
            { text: '登', reading: 'のぼ' },
            { text: 'りながら、ふとこんなことを' },
            { text: '考', reading: 'かんが' },
            { text: 'えた。' },
          ],
          vietnamese: 'Đang men bước lên con đường núi, tôi chợt nghĩ đến điều này.',
          syntaxSegments: [
            { text: '山道を登りながら', reading: 'やまみちをのぼりながら', role: 'modifier', labelVi: 'Bối cảnh song hành', explanationVi: 'Thiết lập không gian bước đi trên núi.' },
            { text: 'ふと', reading: 'ふと', role: 'modifier', labelVi: 'Phó từ cảm nhận', explanationVi: 'Diễn tả ý nghĩ thoáng đến bất chợt, không cố gượng ép.' },
            { text: 'こんなことを', reading: 'こんなことを', role: 'object', labelVi: 'Tân ngữ trực tiếp', explanationVi: 'Chỉ xuất điều triết lý sắp mở ra ở câu sau.' },
            { text: '考えた', reading: 'かんがえた', role: 'predicate', labelVi: 'Vị ngữ chính', explanationVi: 'Thể thông thường văn viết (Da/De aru).' },
          ],
          structureSummaryVi: 'Bối cảnh bước đi + Phó từ bất chợt (ふと) + Tân ngữ + Vị ngữ văn học.',
        },
        {
          id: 'kusa_n3_2',
          japanese: '理性ばかりで進めば角が立ち、感情に任せれば流されてしまう。',
          tokens: [
            { text: '理性', reading: 'りせい' },
            { text: 'ばかりで' },
            { text: '進', reading: 'すす' },
            { text: 'めば' },
            { text: '角', reading: 'かど' },
            { text: 'が' },
            { text: '立', reading: 'た' },
            { text: 'ち、' },
            { text: '感情', reading: 'かんじょう' },
            { text: 'に' },
            { text: '任', reading: 'まか' },
            { text: 'せれば' },
            { text: '流', reading: 'なが' },
            { text: 'されてしまう。' },
          ],
          vietnamese: 'Cứ đi theo lý trí thuần túy thì sinh góc cạnh va chạm, mà phó mặc cho tình cảm thì lại bị cuốn trôi.',
          syntaxSegments: [
            { text: '理性ばかりで進めば', reading: 'りせいばかりですすめば', role: 'modifier', labelVi: 'Mệnh đề giả định ば', explanationVi: 'ば tạo sắc thái chân lý phổ quát.' },
            { text: '角が立ち', reading: 'かどがたち', role: 'predicate', labelVi: 'Vị ngữ liên kết', explanationVi: 'Quán dụng ngữ "角が立つ": sinh ra bất hòa, gai góc.' },
            { text: '感情に任せれば', reading: 'かんじょうにまかせれば', role: 'modifier', labelVi: 'Mệnh đề đối lập', explanationVi: 'Đối ứng hoàn chỉnh với vế lý trí phía trước.' },
            { text: '流されてしまう', reading: 'ながされてしまう', role: 'predicate', labelVi: 'Vị ngữ chính', explanationVi: 'Bị động + てしまう thể hiện sự bất lực trước dòng đời.' },
          ],
          structureSummaryVi: 'Cấu trúc đối xứng cổ điển [A ば B]、[C ば D] sử dụng liên dụng hình 立ち nối vế.',
        },
      ],
      N2: [
        {
          id: 'kusa_n2_1',
          japanese: '山路を登りながら、こう考えた。智に働けば角が立つ。情に棹させば流される。',
          tokens: [
            { text: '山路', reading: 'やまみち' },
            { text: 'を' },
            { text: '登', reading: 'のぼ' },
            { text: 'りながら、こう' },
            { text: '考', reading: 'かんが' },
            { text: 'えた。' },
            { text: '智', reading: 'ち' },
            { text: 'に' },
            { text: '働', reading: 'はたら' },
            { text: 'けば' },
            { text: '角', reading: 'かど' },
            { text: 'が' },
            { text: '立', reading: 'た' },
            { text: 'つ。' },
            { text: '情', reading: 'じょう' },
            { text: 'に' },
            { text: '棹', reading: 'さお' },
            { text: 'させば' },
            { text: '流', reading: 'なが' },
            { text: 'される。' },
          ],
          vietnamese: 'Men theo đường núi đi lên, tôi nghĩ thế này. Sống bằng trí thì dễ va chạm góc cạnh. Thả sào theo tình thì dễ bị cuốn trôi.',
          syntaxSegments: [
            { text: '智に働けば', reading: 'ちにはたらけば', role: 'modifier', labelVi: 'Vế điều kiện Trí', explanationVi: 'Lấy lý trí làm trục hành động.' },
            { text: '角が立つ', reading: 'かどがたつ', role: 'predicate', labelVi: 'Hệ quả quán dụng', explanationVi: 'Đụng chạm sắc cạnh với người đời.' },
            { text: '情に棹させば', reading: 'じょうにさおさせば', role: 'modifier', labelVi: 'Ẩn dụ chèo thuyền', explanationVi: '棹さす (chống sào xuôi dòng) — thuận theo cảm xúc.' },
            { text: '流される', reading: 'ながされる', role: 'predicate', labelVi: 'Vị ngữ bị động', explanationVi: 'Đánh mất chủ thể giữa dòng chảy tình cảm.' },
          ],
          structureSummaryVi: 'Văn phong cô đọng nhịp 3 câu ngắn, mỗi câu là một mảnh triết lý sắc như khắc gỗ.',
        },
        {
          id: 'kusa_n2_2',
          japanese: '意地を通せば窮屈だ。とかくに人の世は住みにくい。',
          tokens: [
            { text: '意地', reading: 'いじ' },
            { text: 'を' },
            { text: '通', reading: 'とお' },
            { text: 'せば' },
            { text: '窮屈', reading: 'きゅうくつ' },
            { text: 'だ。とかくに' },
            { text: '人', reading: 'ひと' },
            { text: 'の' },
            { text: '世', reading: 'よ' },
            { text: 'は' },
            { text: '住', reading: 'す' },
            { text: 'みにくい。' },
          ],
          vietnamese: 'Khăng khăng giữ cái tôi thì ngột ngạt. Xét cho cùng, cõi nhân gian này thật khó sống làm sao.',
          syntaxSegments: [
            { text: '意地を通せば', reading: 'いじをとおせば', role: 'modifier', labelVi: 'Vế điều kiện Ý chí', explanationVi: 'Giữ khư khư lòng tự ái và cố chấp.' },
            { text: '窮屈だ', reading: 'きゅうくつだ', role: 'predicate', labelVi: 'Vị ngữ tính từ', explanationVi: 'Chật hẹp, bức bối tâm hồn.' },
            { text: '人の世は', reading: 'ひとのよは', role: 'subject', labelVi: 'Chủ đề đại cục', explanationVi: 'Trợ từ は nâng câu lên thành tổng kết nhân sinh.' },
            { text: '住みにくい', reading: 'すみにくい', role: 'predicate', labelVi: 'Vị ngữ kết luận', explanationVi: 'Động từ 住む + にくい (khó sống).' },
          ],
          structureSummaryVi: 'Khép lại bộ ba Trí – Tình – Ý bằng một tiếng thở dài điềm đạm: 人の世は住みにくい.',
        },
      ],
      N1: [
        {
          id: 'kusa_n1_1',
          japanese: '山路を登りながら、こう考えた。智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。とかくに人の世は住みにくい。',
          tokens: [
            { text: '山路', reading: 'やまみち' },
            { text: 'を' },
            { text: '登', reading: 'のぼ' },
            { text: 'りながら、こう' },
            { text: '考', reading: 'かんが' },
            { text: 'えた。' },
            { text: '智', reading: 'ち' },
            { text: 'に' },
            { text: '働', reading: 'はたら' },
            { text: 'けば' },
            { text: '角', reading: 'かど' },
            { text: 'が' },
            { text: '立', reading: 'た' },
            { text: 'つ。' },
            { text: '情', reading: 'じょう' },
            { text: 'に' },
            { text: '棹', reading: 'さお' },
            { text: 'させば' },
            { text: '流', reading: 'なが' },
            { text: 'される。' },
            { text: '意地', reading: 'いじ' },
            { text: 'を' },
            { text: '通', reading: 'とお' },
            { text: 'せば' },
            { text: '窮屈', reading: 'きゅうくつ' },
            { text: 'だ。とかくに' },
            { text: '人', reading: 'ひと' },
            { text: 'の' },
            { text: '世', reading: 'よ' },
            { text: 'は' },
            { text: '住', reading: 'す' },
            { text: 'みにくい。' },
          ],
          vietnamese: 'Vừa leo con đường núi, tôi nghĩ như thế này. Dựa vào trí thì va chạm góc cạnh. Nương sào theo tình thì bị cuốn trôi. Cố chấp giữ ý mình thì bức bối chật chội. Chung quy lại, cõi người thật khó mà sống cho thanh thản.',
          syntaxSegments: [
            { text: '山路を登りながら', reading: 'やまみちをのぼりながら', role: 'modifier', labelVi: 'Khởi hành không gian', explanationVi: 'Cụm cổ văn 山路 đọc là やまみち thay vì さんろ để giữ nhịp thơ.' },
            { text: '智に働けば角が立つ', reading: 'ちにはたらけばかどがたつ', role: 'conjunction', labelVi: 'Mệnh đề đối xứng 1 (Trí)', explanationVi: 'Chữ 智 (Trí) mang sắc thái triết học cổ điển.' },
            { text: '情に棹させば流される', reading: 'じょうにさおさせばながされる', role: 'conjunction', labelVi: 'Mệnh đề đối xứng 2 (Tình)', explanationVi: 'Ẩn dụ dòng sông cảm xúc.' },
            { text: 'とかくに人の世は', reading: 'とかくにひとのよは', role: 'subject', labelVi: 'Chủ đề tổng kết', explanationVi: 'Phó từ とかくに (dẫu sao đi nữa) dẫn vào chủ đề nhân sinh.' },
            { text: '住みにくい', reading: 'すみにくい', role: 'predicate', labelVi: 'Vị ngữ kiệt tác', explanationVi: 'Một trong những câu mở đầu bất hủ nhất văn học hiện đại Nhật Bản.' },
          ],
          structureSummaryVi: 'Nguyên bản văn chương Sōseki: tiết tấu ngắn – cân đối – giàu nhạc tính Hán-Hòa kết hợp.',
        },
        {
          id: 'kusa_n1_2',
          japanese: '住みにくさが高じると、安い所へ引き越したくなる。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。',
          tokens: [
            { text: '住', reading: 'す' },
            { text: 'みにくさが' },
            { text: '高', reading: 'こう' },
            { text: 'じると、' },
            { text: '安', reading: 'やす' },
            { text: 'い' },
            { text: '所', reading: 'ところ' },
            { text: 'へ' },
            { text: '引', reading: 'ひ' },
            { text: 'き' },
            { text: '越', reading: 'こ' },
            { text: 'したくなる。どこへ' },
            { text: '越', reading: 'こ' },
            { text: 'しても' },
            { text: '住', reading: 'す' },
            { text: 'みにくいと' },
            { text: '悟', reading: 'さと' },
            { text: 'った' },
            { text: '時', reading: 'とき' },
            { text: '、' },
            { text: '詩', reading: 'し' },
            { text: 'が' },
            { text: '生', reading: 'う' },
            { text: 'れて、' },
            { text: '画', reading: 'え' },
            { text: 'が' },
            { text: '出来', reading: 'でき' },
            { text: 'る。' },
          ],
          vietnamese: 'Khi nỗi khó sống dâng lên đỉnh điểm, ta muốn dọn đến nơi yên ả hơn. Nhưng đến lúc giác ngộ rằng đi đâu cũng vẫn khó sống, ấy là khoảnh khắc thi ca ra đời và hội họa thành hình.',
          syntaxSegments: [
            { text: '住みにくさが高じると', reading: 'すみにくさがこうじると', role: 'modifier', labelVi: 'Mệnh đề nhân quả N1', explanationVi: '高じる (dâng cao quá độ) dùng cho cảm xúc hoặc trạng thái tinh thần.' },
            { text: 'どこへ越しても住みにくいと悟った時', reading: 'どこへこしてもすみにくいとさとったとき', role: 'modifier', labelVi: 'Mệnh đề định ngữ dài (修飾節)', explanationVi: 'Cả cụm dài bổ nghĩa trực tiếp cho danh từ 時 (khoảnh khắc giác ngộ).' },
            { text: '詩が生れて、画が出来る', reading: 'しがうまれて、えができる', role: 'predicate', labelVi: 'Song vị ngữ nghệ thuật', explanationVi: 'Nghệ thuật sinh ra từ khoảng lặng siêu thoát khỏi nỗi nhọc nhằn.' },
          ],
          structureSummaryVi: 'Kỹ thuật móc nối từ cuối câu trước (住みにくい → 住みにくさ) dẫn tới cao trào nghệ thuật: Thi và Họa.',
        },
      ],
    },
    metaphors: [
      {
        term: '非人情',
        reading: 'ひにんじょう',
        category: 'Mỹ học Nhật Bản',
        aestheticTag: 'Hininjō · Thiền mỹ học',
        explanationVi: 'Không phải "vô tình", mà là tâm thế tĩnh tại đứng ngoài hỉ nộ ái ố của thế tục để chiêm ngưỡng thế giới như một bức tranh thanh khiết.',
        exampleInText: '詩が生れて、画が出来る',
      },
      {
        term: '情に棹さす',
        reading: 'じょうにさおさす',
        category: 'Ẩn dụ văn học',
        aestheticTag: 'Ẩn dụ dòng chảy',
        explanationVi: 'Nghĩa gốc là chống sào đẩy thuyền xuôi dòng. Sōseki mượn hình ảnh con thuyền để ví tâm trí khi để cảm xúc dẫn lối.',
        exampleInText: '情に棹させば流される',
      },
    ],
    createdAt: 1700000101000,
  },
  {
    id: 'bunko_sei_makura',
    titleJp: '枕草子・春はあけぼの',
    titleReading: 'まくらのそうし・はるはあけぼの',
    titleVi: 'Gối Thảo — Mùa Xuân Là Lúc Bình Minh',
    authorJp: '清少納言',
    authorVi: 'Sei Shōnagon',
    eraTag: 'Heian (~1000)',
    genre: 'Zuihitsu (Tùy bút)',
    moodDescription: 'Áng tùy bút ngàn năm ca ngợi khoảnh khắc giao mùa tinh tế nhất trong bốn mùa Nhật Bản.',
    levels: {
      N4: [
        {
          id: 'makura_n4_1',
          japanese: '春は朝がきれいです。山の上が少しずつ白くなります。',
          tokens: [
            { text: '春', reading: 'はる' },
            { text: 'は' },
            { text: '朝', reading: 'あさ' },
            { text: 'がきれいです。' },
            { text: '山', reading: 'やま' },
            { text: 'の' },
            { text: '上', reading: 'うえ' },
            { text: 'が' },
            { text: '少', reading: 'すこ' },
            { text: 'しずつ' },
            { text: '白', reading: 'しろ' },
            { text: 'くなります。' },
          ],
          vietnamese: 'Mùa xuân đẹp nhất vào buổi sớm. Phía trên đỉnh núi dần dần ửng sáng trắng.',
          syntaxSegments: [
            { text: '春は', reading: 'はるは', role: 'subject', labelVi: 'Chủ đề mùa', explanationVi: 'Xác lập bối cảnh mùa xuân.' },
            { text: '朝がきれいです', reading: 'あさがきれいです', role: 'predicate', labelVi: 'Vị ngữ cảm nhận', explanationVi: 'Diễn tả thời khắc đẹp nhất.' },
            { text: '少しずつ白くなります', reading: 'すこしずつしろくなります', role: 'predicate', labelVi: 'Biến đổi ánh sáng', explanationVi: 'Ánh sáng rạng đông lan dần trên nền trời.' },
          ],
          structureSummaryVi: 'Câu trần thuật nhẹ nhàng mở ra bức tranh rạng đông mùa xuân.',
        },
      ],
      N3: [
        {
          id: 'makura_n3_1',
          japanese: '春は夜明けがいちばん美しい。山の稜線がだんだん白み、紫色の雲が細くたなびいている。',
          tokens: [
            { text: '春', reading: 'はる' },
            { text: 'は' },
            { text: '夜明', reading: 'よあ' },
            { text: 'けがいちばん' },
            { text: '美', reading: 'うつく' },
            { text: 'しい。' },
            { text: '山', reading: 'やま' },
            { text: 'の' },
            { text: '稜線', reading: 'りょうせん' },
            { text: 'がだんだん' },
            { text: '白', reading: 'しろ' },
            { text: 'み、' },
            { text: '紫色', reading: 'むらさきいろ' },
            { text: 'の' },
            { text: '雲', reading: 'くも' },
            { text: 'が' },
            { text: '細', reading: 'ほそ' },
            { text: 'くたなびいている。' },
          ],
          vietnamese: 'Mùa xuân đẹp nhất là lúc hửng sáng. Đường sống núi dần trắng sáng ra, và những dải mây tím mỏng manh vắt ngang bầu trời.',
          syntaxSegments: [
            { text: '山の稜線がだんだん白み', reading: 'やまのりょうせんがだんだんしろみ', role: 'modifier', labelVi: 'Vế chuyển sắc trời', explanationVi: 'Động từ 白む (ửng trắng) ở thể liên dụng hình nối mạch cảnh.' },
            { text: '紫色の雲が', reading: 'むらさきいろのくもが', role: 'subject', labelVi: 'Chủ ngữ thị giác', explanationVi: 'Màu tím lam tinh tế của bình minh Heian.' },
            { text: '細くたなびいている', reading: 'ほそくたなびいている', role: 'predicate', labelVi: 'Vị ngữ trạng thái', explanationVi: 'たなびく (giăng ngang mềm mại) chuyên dùng cho mây và sương.' },
          ],
          structureSummaryVi: 'Bức họa chuyển màu từ trắng ửng sang tím mảnh, đậm sắc thái thị giác tinh tế.',
        },
      ],
      N2: [
        {
          id: 'makura_n2_1',
          japanese: '春はあけぼの。やうやう白くなりゆく山ぎは、少しあかりて、紫だちたる雲の細くたなびきたる。',
          tokens: [
            { text: '春', reading: 'はる' },
            { text: 'はあけぼの。やうやう' },
            { text: '白', reading: 'しろ' },
            { text: 'くなりゆく' },
            { text: '山', reading: 'やま' },
            { text: 'ぎは、' },
            { text: '少', reading: 'すこ' },
            { text: 'しあかりて、' },
            { text: '紫', reading: 'むらさき' },
            { text: 'だちたる' },
            { text: '雲', reading: 'くも' },
            { text: 'の' },
            { text: '細', reading: 'ほそ' },
            { text: 'くたなびきたる。' },
          ],
          vietnamese: 'Mùa xuân đẹp nhất là rạng đông. Chân trời sát đỉnh núi dần ửng trắng, ánh sáng khẽ lan ra, và những dải mây ánh tím mảnh mai lững lờ vắt ngang.',
          syntaxSegments: [
            { text: '春はあけぼの', reading: 'はるはあけぼの', role: 'subject', labelVi: 'Thể ngôn chỉ (体言止め)', explanationVi: 'Kết câu ngay bằng danh từ あけぼの tạo dư âm bất tận.' },
            { text: 'やうやう白くなりゆく山ぎは', reading: 'ようようしろくなりゆくやまぎわ', role: 'subject', labelVi: 'Định ngữ cổ văn', explanationVi: 'やうやう (dần dần) + なりゆく (đang chuyển mình) bổ nghĩa cho 山ぎは (chân trời tiếp giáp núi).' },
            { text: '紫だちたる雲の細くたなびきたる', reading: 'むらさきだちたるくものほそくたなびきたる', role: 'predicate', labelVi: 'Cụm cảm thán liên thể', explanationVi: 'Kết thúc bằng liên thể hình たる để ngỏ cảm xúc (dư vận Yoin).' },
          ],
          structureSummaryVi: 'Cổ văn Heian nguyên sơ: lược bỏ vị ngữ "đẹp", dùng thể danh từ để người đọc tự ngân vang dư âm.',
        },
      ],
      N1: [
        {
          id: 'makura_n1_1',
          japanese: '春はあけぼの。やうやう白くなりゆく山ぎは、少しあかりて、紫だちたる雲の細くたなびきたる。夏は夜。月のころはさらなり。',
          tokens: [
            { text: '春', reading: 'はる' },
            { text: 'はあけぼの。やうやう' },
            { text: '白', reading: 'しろ' },
            { text: 'くなりゆく' },
            { text: '山', reading: 'やま' },
            { text: 'ぎは、' },
            { text: '少', reading: 'すこ' },
            { text: 'しあかりて、' },
            { text: '紫', reading: 'むらさき' },
            { text: 'だちたる' },
            { text: '雲', reading: 'くも' },
            { text: 'の' },
            { text: '細', reading: 'ほそ' },
            { text: 'くたなびきたる。' },
            { text: '夏', reading: 'なつ' },
            { text: 'は' },
            { text: '夜', reading: 'よる' },
            { text: '。' },
            { text: '月', reading: 'つき' },
            { text: 'のころはさらなり。' },
          ],
          vietnamese: 'Mùa xuân là lúc rạng đông. Khoảng trời sát triền núi dần ửng sáng, khẽ bừng lên đôi chút, có làn mây pha sắc tím mảnh dẻ vắt ngang. Mùa hạ là ban đêm. Những đêm có trăng thì khỏi phải nói nữa rồi.',
          syntaxSegments: [
            { text: '春はあけぼの', reading: 'はるはあけぼの', role: 'subject', labelVi: 'Khởi đề thể ngôn', explanationVi: 'Tiết tấu 7 âm tiết hoàn hảo như một câu thơ Waka.' },
            { text: '紫だちたる雲の細くたなびきたる', reading: 'むらさきだちたるくものほそくたなびきたる', role: 'modifier', labelVi: 'Khung cảnh thị giác', explanationVi: 'Trợ từ の ở đây đóng vai trò đánh dấu chủ ngữ trong mệnh đề cổ văn.' },
            { text: '月のころはさらなり', reading: 'つきのころはさらなり', role: 'predicate', labelVi: 'Kết cấu nhấn mạnh cổ', explanationVi: 'さらなり = 言うまでもない (đẹp khỏi cần bàn cãi).' },
          ],
          structureSummaryVi: 'Tinh hoa mỹ học もののあはれ (Mono no aware) & 幽玄 (Yūgen) qua nhịp điệu bốn mùa.',
        },
      ],
    },
    metaphors: [
      {
        term: 'たなびく',
        reading: 'たなびく',
        category: 'Mỹ học Nhật Bản',
        aestheticTag: 'Yūgen · U huyền',
        explanationVi: 'Động từ thi ca chỉ làn mây, sương khói trải dài thành dải mỏng nằm ngang trời — biểu tượng của vẻ đẹp thoáng qua không thể nắm giữ.',
        exampleInText: '紫だちたる雲の細くたなびきたる',
      },
      {
        term: 'やうやう',
        reading: 'ようよう',
        category: 'Từ tượng thanh / tượng hình',
        aestheticTag: 'Nhịp chuyển thời gian',
        explanationVi: 'Cách viết lịch sử (rekishiteki kanazukai) của ようやく/だんだん, gợi cảm giác ánh sáng rạng đông trôi chậm rãi từng khoảnh khắc.',
        exampleInText: 'やうやう白くなりゆく山ぎは',
      },
    ],
    createdAt: 1700000102000,
  },
];

export async function expandThreeBunkoWorks(
  preferredLevel: BunkoLevel,
  seenTitles: string[]
): Promise<BunkoWork[]> {
  const prompt = `Hãy tuyển chọn và biên soạn ĐÚNG 3 tác phẩm/trích đoạn văn học Nhật Bản siêu tinh tế (Zuihitsu, truyện cực ngắn Short-short, hoặc trích đoạn kinh điển từ Miyazawa Kenji, Dazai Osamu, Akutagawa Ryūnosuke, Kawabata Yasunari, Yoshimoto Banana, Murakami...).
KHÔNG ĐƯỢC TRÙNG với các tác phẩm đã có: ${seenTitles.join(', ')}.
Mỗi tác phẩm có 1–2 câu văn mẫu giàu mỹ học ở ĐẦY ĐỦ 4 cấp độ N4, N3, N2, N1 (cùng linh hồn nghệ thuật nhưng nâng dần cấu trúc cú pháp), kèm tokens Ruby (tách chữ Kanji kèm reading hiragana), phân tích Syntax X-Ray (syntaxSegments) rõ ràng cho mỗi câu, và 2 ghi chú mỹ học/ẩn dụ (metaphors). Đang ưu tiên trọng tâm sâu sắc cho người học ở mức ${preferredLevel}.`;

  const sentenceSchema = {
    type: 'OBJECT',
    properties: {
      id: { type: 'STRING' },
      japanese: { type: 'STRING' },
      tokens: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            text: { type: 'STRING' },
            reading: { type: 'STRING' },
          },
          required: ['text'],
        },
      },
      vietnamese: { type: 'STRING' },
      structureSummaryVi: { type: 'STRING' },
      syntaxSegments: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            text: { type: 'STRING' },
            reading: { type: 'STRING' },
            role: { type: 'STRING' },
            labelVi: { type: 'STRING' },
            explanationVi: { type: 'STRING' },
          },
          required: ['text', 'role', 'labelVi', 'explanationVi'],
        },
      },
    },
    required: ['id', 'japanese', 'tokens', 'vietnamese', 'structureSummaryVi', 'syntaxSegments'],
  };

  const schema = {
    type: 'OBJECT',
    properties: {
      works: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            titleJp: { type: 'STRING' },
            titleReading: { type: 'STRING' },
            titleVi: { type: 'STRING' },
            authorJp: { type: 'STRING' },
            authorVi: { type: 'STRING' },
            eraTag: { type: 'STRING' },
            genre: { type: 'STRING' },
            moodDescription: { type: 'STRING' },
            levels: {
              type: 'OBJECT',
              properties: {
                N4: { type: 'ARRAY', items: sentenceSchema },
                N3: { type: 'ARRAY', items: sentenceSchema },
                N2: { type: 'ARRAY', items: sentenceSchema },
                N1: { type: 'ARRAY', items: sentenceSchema },
              },
              required: ['N4', 'N3', 'N2', 'N1'],
            },
            metaphors: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  term: { type: 'STRING' },
                  reading: { type: 'STRING' },
                  category: { type: 'STRING' },
                  aestheticTag: { type: 'STRING' },
                  explanationVi: { type: 'STRING' },
                  exampleInText: { type: 'STRING' },
                },
                required: ['term', 'reading', 'category', 'aestheticTag', 'explanationVi', 'exampleInText'],
              },
            },
          },
          required: ['titleJp', 'titleReading', 'titleVi', 'authorJp', 'authorVi', 'eraTag', 'genre', 'moodDescription', 'levels', 'metaphors'],
        },
      },
    },
    required: ['works'],
  };

  const raw = await callGemini(
    prompt,
    'Bạn là giáo sư văn học Nhật Bản và ngôn ngữ học cú pháp. Luôn cung cấp Furigana chính xác và phân tích cú pháp rõ ràng bằng tiếng Việt.',
    undefined,
    false,
    schema,
    true
  );
  const parsed = safeExtractJson<{ works: Array<Omit<BunkoWork, 'id' | 'createdAt'>> }>(raw, { works: [] });
  if (!parsed.works.length) {
    throw new Error('Không thể khai mở thêm 3 tuyệt phẩm văn học mới lúc này.');
  }

  const normalized: BunkoWork[] = parsed.works.slice(0, 3).map((w, idx) => ({
    ...w,
    id: `bunko_ai_${Date.now()}_${idx}`,
    genre: (['Zuihitsu (Tùy bút)', 'Short-short (Truyện cực ngắn)', 'Kinh điển cận đại', 'Cổ văn trích đoạn'].includes(w.genre)
      ? w.genre
      : 'Zuihitsu (Tùy bút)') as BunkoWork['genre'],
    createdAt: Date.now() + idx,
  }));

  return omniverseStorageService.filterAndRegisterUnique(
    'bunko_work',
    normalized,
    (w) => `${w.titleJp}_${w.authorJp}`
  );
}

export async function expandThreeBunkoMetaphors(
  work: BunkoWork,
  seenTerms: string[]
): Promise<BunkoMetaphorNote[]> {
  const sampleText = work.levels.N1.map((s) => s.japanese).join(' ');
  const prompt = `Với tác phẩm "${work.titleJp}" (${work.authorVi}): "${sampleText}", hãy khai quật ĐÚNG 3 tầng ẩn dụ văn học, mỹ học Nhật Bản (Mono no aware, Wabi-sabi, Yūgen, Ma...) hoặc từ tượng thanh/tượng hình (Giongo/Gitaigo) sâu sắc mới, KHÔNG trùng với: ${seenTerms.join(', ')}.`;

  const schema = {
    type: 'OBJECT',
    properties: {
      metaphors: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            term: { type: 'STRING' },
            reading: { type: 'STRING' },
            category: { type: 'STRING' },
            aestheticTag: { type: 'STRING' },
            explanationVi: { type: 'STRING' },
            exampleInText: { type: 'STRING' },
          },
          required: ['term', 'reading', 'category', 'aestheticTag', 'explanationVi', 'exampleInText'],
        },
      },
    },
    required: ['metaphors'],
  };

  const raw = await callGemini(prompt, 'Nhà phê bình mỹ học văn học Nhật Bản.', undefined, false, schema, true);
  const parsed = safeExtractJson<{ metaphors: BunkoMetaphorNote[] }>(raw, { metaphors: [] });
  if (!parsed.metaphors.length) {
    throw new Error('Không thể khai quật thêm tầng ẩn dụ mới.');
  }

  return omniverseStorageService.filterAndRegisterUnique(
    'bunko_metaphor',
    parsed.metaphors.slice(0, 3),
    (m) => `${work.id}_${m.term}`
  );
}

// ============================================================================
// 3. VINYL KASHI STUDIO (レコード歌詞室) — TRACKS, DECOMPILER & DUAL PITCH
// ============================================================================

export const INITIAL_VINYL_TRACKS: VinylTrack[] = [
  {
    id: 'vinyl_midnight_citypop',
    titleJp: '真夜中の交差点',
    titleVi: 'Ngã Tư Nửa Đêm (City Pop Showa)',
    artistOrPoet: 'Bản phối Showa Night Ensemble',
    kind: 'City Pop',
    mood: 'Đêm mưa Tokyo',
    vinylColor: '#2d3b55',
    bpmLabel: '98 BPM · Analog 33⅓ RPM',
    rows: [
      {
        id: 'row_cp_1',
        originalLyric: '君の笑顔、忘れちゃいけないって分かってるのに',
        reading: 'きみのえがお、わすれちゃいけないってわかってるのに',
        spokenColloquial: '君の笑顔を忘れちゃダメだって分かってるのに',
        textbookGrammar: '君の笑顔を忘れてはいけないと分かっているのに',
        phenomenonTag: '縮約形 (Shukuyakukei) · Lược trợ từ を',
        nuanceVi: 'てはいけない rút gọn thành ちゃいけない, ている rút gọn thành てる, と biến thành って tạo nhịp lướt mượt như lời thì thầm.',
        colloquialApplications: [
          {
            japanese: '終電、逃しちゃいけないよ。',
            reading: 'しゅうでん、のがしちゃいけないよ。',
            vietnamese: 'Đừng để lỡ chuyến tàu cuối đấy nhé.',
            context: 'Nhắc bạn sau buổi gặp mặt tối ở Tokyo',
          },
        ],
      },
      {
        id: 'row_cp_2',
        originalLyric: '雨音に溶けてく、あの日交わした約束',
        reading: 'あまおとにとけてく、あのひかわしたやくそく',
        spokenColloquial: 'あの日交わした約束が雨音に溶けていく',
        textbookGrammar: 'あの日に交わした約束が、雨音の中に溶けていく',
        phenomenonTag: '倒置法 (Đảo ngữ thi ca) · ていく → てく',
        nuanceVi: 'Đưa động từ "tan dần vào tiếng mưa" lên trước chủ ngữ "lời hứa ngày ấy" để dồn cảm xúc nuối tiếc vào cuối câu hát.',
      },
    ],
    pitchWords: [
      {
        word: '雨音',
        reading: 'あまおと',
        meaningVi: 'Tiếng mưa rơi',
        pitchPatternLabel: '中高型 (3) · L-H-H-L',
        morae: [
          { kana: 'あ', type: 'normal' },
          { kana: 'ま', type: 'normal' },
          { kana: 'お', type: 'normal' },
          { kana: 'と', type: 'normal' },
        ],
        sungPitch: [1, 2, 2, 1],
        tokyoPitch: [0, 1, 1, 0],
        contrastNoteVi: 'Khi hát giai điệu kéo nhẹ ở お, còn trong giọng chuẩn Tokyo NHK rơi rõ sau phách thứ 3 (あまお＼と).',
      },
      {
        word: '真夜中',
        reading: 'まよなか',
        meaningVi: 'Nửa đêm khuya khoắt',
        pitchPatternLabel: '中高型 (2) · L-H-L-L',
        morae: [
          { kana: 'ま', type: 'normal' },
          { kana: 'よ', type: 'normal' },
          { kana: 'な', type: 'normal' },
          { kana: 'か', type: 'normal' },
        ],
        sungPitch: [0, 1, 2, 1],
        tokyoPitch: [0, 1, 0, 0],
        contrastNoteVi: 'Giai điệu nâng cao ở な để tạo cao trào, nhưng nói chuyện hàng ngày phải hạ giọng ngay sau よ (まよ＼なか)!',
      },
      {
        word: '約束',
        reading: 'やくそく',
        meaningVi: 'Lời hứa',
        pitchPatternLabel: '平板型 (0) · L-H-H-H',
        morae: [
          { kana: 'や', type: 'normal' },
          { kana: 'く', type: 'normal' },
          { kana: 'そ', type: 'normal' },
          { kana: 'く', type: 'normal' },
        ],
        sungPitch: [1, 2, 1, 0],
        tokyoPitch: [0, 1, 1, 1],
        contrastNoteVi: 'Trong bài hát giọng hạ dần ở cuối câu, còn giọng Tokyo chuẩn là dạng phẳng Heiban giữ đều độ cao từ phách 2 trở đi.',
      },
    ],
    createdAt: 1700000201000,
  },
  {
    id: 'vinyl_tanka_autumn',
    titleJp: '短歌・秋の珈琲',
    titleVi: 'Thơ Tanka (5-7-5-7-7) · Tách Cà Phê Chiều Thu',
    artistOrPoet: 'Tác phẩm Tanka Hiện Đại',
    kind: 'Thơ Tanka (5-7-5-7-7)',
    mood: 'Tĩnh lặng chiều thu',
    vinylColor: '#6d3b2f',
    bpmLabel: '5-7-5-7-7 Mora · Ngâm thơ chậm',
    rows: [
      {
        id: 'row_tk_1',
        originalLyric: '冷めてゆく / 珈琲の底に / 映る雲 / 言えぬままおく / 小さな「ありがとう」',
        reading: 'さめてゆく / こーひーのそこに / うつるくも / いえぬままおく / ちいさな「ありがとう」',
        spokenColloquial: '冷めていくコーヒーの底に映る雲を見て、言えないままにしておく小さな「ありがとう」',
        textbookGrammar: '冷めていく珈琲の底に雲が映っている。言えないまま心にしまっておく小さな感謝の言葉。',
        phenomenonTag: 'Cổ ngữ phủ định ぬ (言えぬ = 言えない) · 31 Mora Tanka',
        nuanceVi: 'Đuôi ぬ mang sắc thái trầm tư hơn ない; động từ おく (đặt để) tạo cảm giác cất giữ một lời cảm ơn dịu dàng.',
      },
    ],
    pitchWords: [
      {
        word: '珈琲',
        reading: 'こーひー',
        meaningVi: 'Cà phê',
        pitchPatternLabel: '中高型 (3) · L-H-H-L',
        morae: [
          { kana: 'こ', type: 'normal' },
          { kana: 'ー', type: 'long' },
          { kana: 'ひ', type: 'normal' },
          { kana: 'ー', type: 'long' },
        ],
        sungPitch: [1, 1, 2, 1],
        tokyoPitch: [0, 1, 1, 0],
        contrastNoteVi: 'Chú ý hai trường âm 「ー」 đều chiếm trọn 1 phách Mora độc lập (tổng 4 Mora, không đọc vội thành 2 âm tiết).',
      },
      {
        word: 'ありがとう',
        reading: 'ありがとう',
        meaningVi: 'Cảm ơn',
        pitchPatternLabel: '中高型 (2) · L-H-L-L-L',
        morae: [
          { kana: 'あ', type: 'normal' },
          { kana: 'り', type: 'normal' },
          { kana: 'が', type: 'normal' },
          { kana: 'と', type: 'normal' },
          { kana: 'う', type: 'long' },
        ],
        sungPitch: [0, 1, 2, 1, 0],
        tokyoPitch: [0, 1, 0, 0, 0],
        contrastNoteVi: 'Trọng âm NHK rơi ở phách 2 (あり＼がとう), âm う cuối nối dài tạo trường âm chuẩn 5 Mora.',
      },
    ],
    createdAt: 1700000202000,
  },
];

export async function decompileCustomLyrics(lyricsText: string): Promise<VinylTrack> {
  const prompt = `Hãy giải mã đoạn ca từ / bài thơ tiếng Nhật sau theo chuẩn học thuật ngôn ngữ Nhật (nhưng trình bày ấm áp, dễ hiểu):
"""
${lyricsText}
"""
Yêu cầu:
1. Tách thành 2–4 dòng chính (rows), mỗi dòng có bảng 3 tầng: [originalLyric] ➔ [spokenColloquial] ➔ [textbookGrammar], kèm phenomenonTag (Shukuyakukei 〜ちゃう/〜なきゃ/〜てる, Tōchihō đảo ngữ, lược trợ từ...) và nuanceVi.
2. Chọn 2–3 từ khóa nổi bật để dựng Dual Pitch Accent & Mora (pitchWords): tách đúng từng Mora (gắn type: 'normal' | 'long' | 'sokuon' | 'nasal' cho ー, っ, ん), dựng sungPitch (mảng số 0..2 cùng độ dài morae) và tokyoPitch (mảng số 0..1 chuẩn NHK cùng độ dài morae).`;

  const schema = {
    type: 'OBJECT',
    properties: {
      titleJp: { type: 'STRING' },
      titleVi: { type: 'STRING' },
      artistOrPoet: { type: 'STRING' },
      kind: { type: 'STRING' },
      mood: { type: 'STRING' },
      rows: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            originalLyric: { type: 'STRING' },
            reading: { type: 'STRING' },
            spokenColloquial: { type: 'STRING' },
            textbookGrammar: { type: 'STRING' },
            phenomenonTag: { type: 'STRING' },
            nuanceVi: { type: 'STRING' },
          },
          required: ['originalLyric', 'reading', 'spokenColloquial', 'textbookGrammar', 'phenomenonTag', 'nuanceVi'],
        },
      },
      pitchWords: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            word: { type: 'STRING' },
            reading: { type: 'STRING' },
            meaningVi: { type: 'STRING' },
            pitchPatternLabel: { type: 'STRING' },
            morae: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  kana: { type: 'STRING' },
                  type: { type: 'STRING' },
                },
                required: ['kana', 'type'],
              },
            },
            sungPitch: { type: 'ARRAY', items: { type: 'INTEGER' } },
            tokyoPitch: { type: 'ARRAY', items: { type: 'INTEGER' } },
            contrastNoteVi: { type: 'STRING' },
          },
          required: ['word', 'reading', 'meaningVi', 'pitchPatternLabel', 'morae', 'sungPitch', 'tokyoPitch', 'contrastNoteVi'],
        },
      },
    },
    required: ['titleJp', 'titleVi', 'artistOrPoet', 'kind', 'mood', 'rows', 'pitchWords'],
  };

  const raw = await callGemini(
    prompt,
    'Bạn là chuyên gia ngữ âm học NHK Tokyo Pitch Accent & phân tích ca từ tiếng Nhật.',
    undefined,
    false,
    schema,
    true
  );
  const parsed = safeExtractJson<Omit<VinylTrack, 'id' | 'vinylColor' | 'bpmLabel' | 'createdAt'> | null>(raw, null);
  if (!parsed || !parsed.rows || parsed.rows.length === 0) {
    throw new Error('Chưa thể giải mã đoạn ca từ này. Hãy đảm bảo đoạn lời có chứa tiếng Nhật.');
  }

  return {
    id: `vinyl_custom_${Date.now()}`,
    titleJp: parsed.titleJp || 'カスタム歌詞',
    titleVi: parsed.titleVi || 'Bản Giải Mã Ca Từ Riêng',
    artistOrPoet: parsed.artistOrPoet || 'Trích đoạn người dùng nhập',
    kind: 'J-Pop Ballad',
    mood: 'Đêm mưa Tokyo',
    vinylColor: '#3a4a5e',
    bpmLabel: 'Custom Vinyl · Shadowing Loop',
    rows: parsed.rows.map((r, i) => ({ ...r, id: `row_c_${Date.now()}_${i}` })),
    pitchWords: parsed.pitchWords,
    createdAt: Date.now(),
  };
}

export async function expandThreeVinylTracks(mood: string, seenTitles: string[]): Promise<VinylTrack[]> {
  const prompt = `Hãy sáng tạo và tuyển biên ĐÚNG 3 đĩa than / bài thơ Tanka (5-7-5-7-7) mang tâm trạng "${mood}" giàu sắc thái ngữ pháp khẩu ngữ Nhật Bản (Shukuyakukei 〜ちゃう/〜なきゃ/〜とく/〜てる, Tōchihō đảo ngữ, lược trợ từ).
KHÔNG ĐƯỢC TRÙNG tiêu đề với: ${seenTitles.join(', ')}.
Mỗi đĩa có 2 dòng giải mã 3 tầng (rows) và 2 từ khóa phân tích Dual Pitch Accent + Mora (pitchWords, gồm morae có type 'normal'|'long'|'sokuon'|'nasal', sungPitch 0..2, tokyoPitch 0..1 cùng độ dài).`;

  const schema = {
    type: 'OBJECT',
    properties: {
      tracks: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            titleJp: { type: 'STRING' },
            titleVi: { type: 'STRING' },
            artistOrPoet: { type: 'STRING' },
            kind: { type: 'STRING' },
            vinylColor: { type: 'STRING' },
            bpmLabel: { type: 'STRING' },
            rows: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  originalLyric: { type: 'STRING' },
                  reading: { type: 'STRING' },
                  spokenColloquial: { type: 'STRING' },
                  textbookGrammar: { type: 'STRING' },
                  phenomenonTag: { type: 'STRING' },
                  nuanceVi: { type: 'STRING' },
                },
                required: ['originalLyric', 'reading', 'spokenColloquial', 'textbookGrammar', 'phenomenonTag', 'nuanceVi'],
              },
            },
            pitchWords: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  word: { type: 'STRING' },
                  reading: { type: 'STRING' },
                  meaningVi: { type: 'STRING' },
                  pitchPatternLabel: { type: 'STRING' },
                  morae: {
                    type: 'ARRAY',
                    items: {
                      type: 'OBJECT',
                      properties: {
                        kana: { type: 'STRING' },
                        type: { type: 'STRING' },
                      },
                      required: ['kana', 'type'],
                    },
                  },
                  sungPitch: { type: 'ARRAY', items: { type: 'INTEGER' } },
                  tokyoPitch: { type: 'ARRAY', items: { type: 'INTEGER' } },
                  contrastNoteVi: { type: 'STRING' },
                },
                required: ['word', 'reading', 'meaningVi', 'pitchPatternLabel', 'morae', 'sungPitch', 'tokyoPitch', 'contrastNoteVi'],
              },
            },
          },
          required: ['titleJp', 'titleVi', 'artistOrPoet', 'kind', 'vinylColor', 'bpmLabel', 'rows', 'pitchWords'],
        },
      },
    },
    required: ['tracks'],
  };

  const raw = await callGemini(
    prompt,
    'Nhà sưu tầm đĩa than Showa & chuyên gia ngữ âm NHK Pitch Accent Nhật Bản.',
    undefined,
    false,
    schema,
    true
  );
  const parsed = safeExtractJson<{ tracks: Array<Omit<VinylTrack, 'id' | 'mood' | 'createdAt'>> }>(raw, { tracks: [] });
  if (!parsed.tracks.length) {
    throw new Error('Chưa thể lấy thêm 3 đĩa than mới từ kệ nhạc.');
  }

  const validKinds: VinylTrack['kind'][] = ['City Pop', 'J-Pop Ballad', 'Anime OST', 'Thơ Tanka (5-7-5-7-7)'];
  const candidates: VinylTrack[] = parsed.tracks.slice(0, 3).map((t, idx) => ({
    ...t,
    id: `vinyl_ai_${Date.now()}_${idx}`,
    kind: validKinds.includes(t.kind as VinylTrack['kind']) ? (t.kind as VinylTrack['kind']) : 'City Pop',
    mood: (['Đêm mưa Tokyo', 'Hoài niệm Showa', 'Tĩnh lặng chiều thu', 'Hy vọng sớm mai'].includes(mood)
      ? mood
      : 'Đêm mưa Tokyo') as VinylTrack['mood'],
    vinylColor: /^#[0-9a-fA-F]{6}$/.test(t.vinylColor) ? t.vinylColor : '#3a4a5e',
    rows: t.rows.map((r, rIdx) => ({ ...r, id: `row_ai_${Date.now()}_${idx}_${rIdx}` })),
    createdAt: Date.now() + idx,
  }));

  return omniverseStorageService.filterAndRegisterUnique('vinyl_track', candidates, (t) => t.titleJp);
}

export async function expandThreeColloquialApplications(
  row: LyricDecompileRow,
  seenExamples: string[]
): Promise<Array<{ japanese: string; reading: string; vietnamese: string; context: string }>> {
  const prompt = `Từ mẫu khẩu ngữ / cấu trúc trong ca từ: "${row.originalLyric}" (${row.phenomenonTag}), hãy sáng tạo ĐÚNG 3 câu ứng dụng giao tiếp đời thực tại Nhật (quán ăn, công sở, bạn bè) sử dụng đúng sắc thái ngữ pháp đó. Không trùng với: ${seenExamples.join(' | ')}.`;

  const schema = {
    type: 'OBJECT',
    properties: {
      examples: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            japanese: { type: 'STRING' },
            reading: { type: 'STRING' },
            vietnamese: { type: 'STRING' },
            context: { type: 'STRING' },
          },
          required: ['japanese', 'reading', 'vietnamese', 'context'],
        },
      },
    },
    required: ['examples'],
  };

  const raw = await callGemini(prompt, 'Chuyên gia khẩu ngữ Nhật Bản tự nhiên.', undefined, false, schema, true);
  const parsed = safeExtractJson<{
    examples: Array<{ japanese: string; reading: string; vietnamese: string; context: string }>;
  }>(raw, { examples: [] });
  if (!parsed.examples.length) {
    throw new Error('Không thể tạo thêm 3 câu ứng dụng khẩu ngữ.');
  }
  return omniverseStorageService.filterAndRegisterUnique(
    'vinyl_colloquial',
    parsed.examples.slice(0, 3),
    (e) => e.japanese
  );
}

// ============================================================================
// 4. TIME-CAPSULE POST OFFICE (時空の郵便局) — 3-TIER PRISM & +3 SCENARIOS
// ============================================================================

export interface LetterScenarioPrompt {
  id: string;
  titleVi: string;
  recipientLabel: string;
  starterDraftJp: string;
  starterNoteVi: string;
}

export const INITIAL_LETTER_SCENARIOS: LetterScenarioPrompt[] = [
  {
    id: 'scen_future_self',
    titleVi: 'Gửi Chính Mình Sau 30 Ngày',
    recipientLabel: 'Một tháng sau · Gửi chính tôi',
    starterDraftJp: '一ヶ月後の私へ。最近少し忙しいけれど、毎日自分のペースで歩き続けているよ。元気でいてね。',
    starterNoteVi: 'Một lời nhắn dịu dàng giữ nhịp bình an cho bản thân trong tương lai gần.',
  },
  {
    id: 'scen_oreijo',
    titleVi: 'Thư Cảm Ơn (Orei-jō · お礼状)',
    recipientLabel: 'Người thầy / Người đã giúp đỡ',
    starterDraftJp: '先日は温かいお時間をありがとうございました。いただいたお言葉を大切にしながら、これからも精進してまいります。',
    starterNoteVi: 'Văn hóa cảm ơn sâu sắc của Nhật Bản sau một buổi gặp mặt hoặc món quà quý.',
  },
  {
    id: 'scen_business_visit',
    titleVi: 'Email Hẹn Gặp Đối Tác Nhật',
    recipientLabel: 'Đối tác kinh doanh (B2B)',
    starterDraftJp: 'いつも大変お世話になっております。来週の打ち合わせの日程について、ご都合を伺いたくご連絡いたしました。',
    starterNoteVi: 'Cấu trúc mở đầu chuẩn Business Keigo không bị khô cứng.',
  },
];

export interface JikoGreetingOption {
  formal: string;
  reading: string;
  casual: string;
  meaningVi: string;
}

export async function transformLetterStylePrism(draftText: string, sekki: SolarTermInfo): Promise<LetterPrismResult> {
  const prompt = `Hãy chuyển hóa bức thư / đoạn văn sau qua "Lăng Kính Văn Phong 3 Tầng" chuẩn tiếng Nhật bản xứ (bối cảnh tiết khí hiện tại: ${sekki.kanji} - ${sekki.vietnamese}):
"""
${draftText}
"""
Yêu cầu:
1. tameguchi: Bản thân mật tự nhiên gửi bạn thân hoặc chính mình.
2. teineigo: Bản lịch sự chuẩn mực (Desu/Masu) gửi đồng nghiệp, người quen.
3. keigo: Bản trang trọng chuẩn Business / Orei-jō (với Sonkeigo & Kenjōgo chuẩn mực).
4. pivots: 3–4 điểm chuyển đổi ngôn ngữ đắt giá nhất giữa 3 tầng, phân loại rõ keigoType ('Sonkeigo (Tôn kính ngữ)' | 'Kenjōgo (Khiêm nhường ngữ)' | 'Teineigo (Lịch sự ngữ)').`;

  const schema = {
    type: 'OBJECT',
    properties: {
      tameguchi: { type: 'STRING' },
      teineigo: { type: 'STRING' },
      keigo: { type: 'STRING' },
      pivots: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            tameguchi: { type: 'STRING' },
            teineigo: { type: 'STRING' },
            keigo: { type: 'STRING' },
            keigoType: { type: 'STRING' },
            explanationVi: { type: 'STRING' },
          },
          required: ['tameguchi', 'teineigo', 'keigo', 'keigoType', 'explanationVi'],
        },
      },
    },
    required: ['tameguchi', 'teineigo', 'keigo', 'pivots'],
  };

  const raw = await callGemini(
    prompt,
    'Bạn là chuyên gia thư tín Nhật Bản (手紙マナー) và Kính ngữ (Keigo) bậc thầy.',
    undefined,
    false,
    schema,
    true
  );
  const parsed = safeExtractJson<LetterPrismResult | null>(raw, null);
  if (!parsed || !parsed.tameguchi || !parsed.keigo) {
    throw new Error('Chưa thể chiếu Lăng Kính 3 Tầng cho lá thư này. Hãy thử lại.');
  }
  return parsed;
}

export async function expandThreeJikoGreetings(
  sekki: SolarTermInfo,
  seenGreetings: string[]
): Promise<JikoGreetingOption[]> {
  const prompt = `Với tiết khí hiện tại là ${sekki.kanji} (${sekki.reading} · ${sekki.vietnamese}, mùa ${sekki.seasonVi}), hãy đề xuất ĐÚNG 3 mẫu Lời Chào Theo Mùa (時候の挨拶 — Jikō no Aisatsu) giàu thi vị mới, không trùng với: ${seenGreetings.join(' | ')}.`;

  const schema = {
    type: 'OBJECT',
    properties: {
      greetings: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            formal: { type: 'STRING' },
            reading: { type: 'STRING' },
            casual: { type: 'STRING' },
            meaningVi: { type: 'STRING' },
          },
          required: ['formal', 'reading', 'casual', 'meaningVi'],
        },
      },
    },
    required: ['greetings'],
  };

  const raw = await callGemini(prompt, 'Chuyên gia thư tín truyền thống Nhật Bản.', undefined, false, schema, true);
  const parsed = safeExtractJson<{ greetings: JikoGreetingOption[] }>(raw, { greetings: [] });
  if (!parsed.greetings.length) {
    throw new Error('Không thể gợi ý thêm lời chào tiết khí mới.');
  }
  return omniverseStorageService.filterAndRegisterUnique(
    'post_jiko',
    parsed.greetings.slice(0, 3),
    (g) => g.formal
  );
}

export async function expandThreeLetterScenarios(seenTitles: string[]): Promise<LetterScenarioPrompt[]> {
  const prompt = `Hãy sáng tạo ĐÚNG 3 kịch bản viết thư tín Nhật Bản giàu cảm xúc và hữu ích (thư gửi bạn cũ, thư cảm ơn hàng xóm, thư từ chối lời mời tinh tế, thư gửi bản thân sau 1 năm...) hoàn toàn mới, không trùng với: ${seenTitles.join(' | ')}.`;

  const schema = {
    type: 'OBJECT',
    properties: {
      scenarios: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            titleVi: { type: 'STRING' },
            recipientLabel: { type: 'STRING' },
            starterDraftJp: { type: 'STRING' },
            starterNoteVi: { type: 'STRING' },
          },
          required: ['titleVi', 'recipientLabel', 'starterDraftJp', 'starterNoteVi'],
        },
      },
    },
    required: ['scenarios'],
  };

  const raw = await callGemini(prompt, 'Biên tập viên văn hóa thư tín Nhật Bản.', undefined, false, schema, true);
  const parsed = safeExtractJson<{ scenarios: Array<Omit<LetterScenarioPrompt, 'id'>> }>(raw, { scenarios: [] });
  if (!parsed.scenarios.length) {
    throw new Error('Không thể mở thêm 3 kịch bản thư tín mới.');
  }
  const candidates = parsed.scenarios.slice(0, 3).map((s, idx) => ({
    ...s,
    id: `scen_ai_${Date.now()}_${idx}`,
  }));
  return omniverseStorageService.filterAndRegisterUnique('post_scenario', candidates, (s) => s.titleVi);
}

// ============================================================================
// 5. KIGO & KOTOWAZA CONSERVATORY (歳時記) — SEASONAL TREASURES & GOSHUIN
// ============================================================================

export const INITIAL_CONSERVATORY_EXHIBITS: ConservatoryExhibit[] = [
  {
    id: 'exhibit_komorebi',
    wordJp: '木漏れ日',
    reading: 'こもれび',
    romaji: 'komorebi',
    hanViet: 'Mộc Lậu Nhật',
    meaningVi: 'Ánh nắng lọc qua kẽ lá rung rinh trên mặt đất',
    seasonTag: 'Bốn mùa · Quang cảnh',
    pitchLabel: '平板型 (0) · L-H-H-H',
    pitchContour: [0, 1, 1, 1],
    morae: ['こ', 'も', 'れ', 'び'],
    etymologyLayerVi:
      'Kết hợp từ 木 (cây cối, cổ âm こ) + 漏れ (rỉ nhẹ qua khe hở) + 日 (ánh mặt trời, âm biến thành び do Rendaku). Chỉ khoảnh khắc ánh sáng không trọn vẹn nhưng lại đẹp dịu dàng nhất.',
    kanjiStructureNote: '木 (Mộc) · 漏 (Lậu: thấm rỉ) · 日 (Nhật: ánh nắng)',
    collocations: [
      { jp: '木漏れ日が差し込む', reading: 'こもれびがさしこむ', vi: 'Tia nắng qua kẽ lá rọi chiếu vào' },
      { jp: '木漏れ日の下で休む', reading: 'こもれびのしたでやすむ', vi: 'Nghỉ chân dưới bóng nắng xuyên lá' },
      { jp: '柔らかな木漏れ日', reading: 'やわらかなこもれび', vi: 'Ánh nắng kẽ lá dịu mềm' },
    ],
    literaryUsage: {
      jp: '静かな並木道を歩くと、足元に木漏れ日が揺れていた。',
      reading: 'しずかななみきみちをあるくと、あしもとにこもれびがゆれていた。',
      vi: 'Khi bước dọc hàng cây yên ả, ánh nắng xuyên qua kẽ lá khẽ lay động dưới bước chân.',
    },
    conversationUsage: {
      jp: 'この窓際の席、木漏れ日がきれいで落ち着きますね。',
      reading: 'このまどぎわのせき、こもれびがきれいでおちつきますね。',
      vi: 'Chỗ ngồi cạnh cửa sổ này có nắng xuyên qua kẽ lá đẹp mà dễ chịu thật đấy.',
    },
    relatedKotowaza: {
      jp: '花鳥風月',
      reading: 'かちょうふうげつ',
      vi: 'Hoa Điểu Phong Nguyệt — Vẻ đẹp thanh cao của tự nhiên bốn mùa',
      nuance: 'Khuyến khích tâm hồn dừng lại thưởng thức những đổi thay tinh tế của tự nhiên.',
    },
    microExercise: {
      promptVi: 'Để miêu tả ánh nắng qua kẽ lá "khẽ rọi xuống" thật tự nhiên như người Nhật, bạn chọn cụm nào?',
      choices: [
        {
          labelJp: '木漏れ日が差し込む',
          reading: 'こもれびがさしこむ',
          isIdeal: true,
          gentleNoteVi: 'Tuyệt mỹ! Động từ 差し込む (chiếu rọi vào khe hở) là kết hợp kinh điển nhất đi cùng 木漏れ日.',
        },
        {
          labelJp: '木漏れ日が落ちる',
          reading: 'こもれびがおちる',
          isIdeal: false,
          gentleNoteVi: 'Có thể hiểu được theo nghĩa văn chương, nhưng 差し込む (len vào rọi sáng) tự nhiên và giàu sức gợi ánh sáng hơn.',
        },
      ],
    },
    goshuinKanji: '陽',
    goshuinMottoJp: '光陰静寂',
  },
  {
    id: 'exhibit_yoin',
    wordJp: '余韻',
    reading: 'よいん',
    romaji: 'yoin',
    hanViet: 'Dư Vận',
    meaningVi: 'Âm vang còn đọng lại sau khi tiếng chuông đã dứt; dư âm sâu lắng trong lòng',
    seasonTag: 'Thu – Đông · Mỹ học',
    pitchLabel: '平板型 (0) · L-H-H',
    pitchContour: [0, 1, 1],
    morae: ['よ', 'い', 'ん'],
    etymologyLayerVi:
      'Gồm 余 (phần còn lưu lại) và 韻 (vần điệu, âm hưởng). Bắt nguồn từ tiếng chuông chùa vang vọng rồi tan chậm vào sương đêm — cốt lõi của nghệ thuật chừa khoảng trống trong văn hóa Nhật.',
    kanjiStructureNote: '余 (Dư: còn lại) · 韻 (Vận: âm hưởng)',
    collocations: [
      { jp: '余韻に浸る', reading: 'よいんにひたる', vi: 'Đắm mình trong dư âm ngọt ngào' },
      { jp: '深い余韻を残す', reading: 'ふかいよいんをのこす', vi: 'Để lại dư âm sâu lắng' },
      { jp: '物語の余韻', reading: 'ものがたりのよいん', vi: 'Dư âm sau trang cuối câu chuyện' },
    ],
    literaryUsage: {
      jp: '本を閉じたあとも、静かな余韻がいつまでも胸に残った。',
      reading: 'ほんをとじたあとも、しずかなよいんがいつまでもむねにのこった。',
      vi: 'Ngay cả khi đã khép trang sách lại, một dư âm tĩnh lặng vẫn đọng mãi nơi lồng ngực.',
    },
    conversationUsage: {
      jp: 'いい映画でしたね。まだ余韻に浸っています。',
      reading: 'いいえいがでしたね。まだよいんにひたっています。',
      vi: 'Bộ phim hay quá nhỉ. Mình vẫn còn đang đắm trong dư âm của nó đây.',
    },
    relatedKotowaza: {
      jp: '一期一会',
      reading: 'いちごいちえ',
      vi: 'Nhất Kỳ Nhất Hội — Mỗi cuộc gặp gỡ chỉ có một lần trong đời',
      nuance: 'Trân trọng khoảnh khắc hiện tại để dư âm của nó mãi ấm áp về sau.',
    },
    microExercise: {
      promptVi: 'Sau khi nghe xong một bản nhạc tuyệt hay và muốn nói "tôi vẫn đang đắm mình trong dư âm", cụm nào chuẩn bản xứ nhất?',
      choices: [
        {
          labelJp: '余韻に浸っている',
          reading: 'よいんにひたっている',
          isIdeal: true,
          gentleNoteVi: 'Chuẩn xác tuyệt đối! 浸る (ngâm mình, đắm chìm) là collocation vàng đi liền với 余韻.',
        },
        {
          labelJp: '余韻を食べている',
          reading: 'よいんをたべている',
          isIdeal: false,
          gentleNoteVi: 'Với dư âm, tiếng Nhật dùng động từ 浸る (đắm mình) hoặc 味わう (thưởng thức tinh tế).',
        },
      ],
    },
    goshuinKanji: '韻',
    goshuinMottoJp: '余響悠遠',
  },
  {
    id: 'exhibit_tsundoku',
    wordJp: '積ん読',
    reading: 'つんどく',
    romaji: 'tsundoku',
    hanViet: 'Tích Độc',
    meaningVi: 'Thú vui mua sách về xếp chồng trên bàn, chưa đọc ngay nhưng vẫn thấy bình yên khi ngắm nhìn',
    seasonTag: 'Đêm thu đọc sách',
    pitchLabel: '平板型 (0) · L-H-H-H',
    pitchContour: [0, 1, 1, 1],
    morae: ['つ', 'ん', 'ど', 'く'],
    etymologyLayerVi:
      'Chơi chữ thời Meiji từ cụm 積んでおく (xếp chồng để đó) rút gọn thành つんどく rồi ghép chữ 読 (Độc: đọc sách). Một từ duyên dáng biến cảm giác "chưa đọc kịp" thành niềm vui tao nhã.',
    kanjiStructureNote: '積 (Tích: chất chồng) · 読 (Độc: đọc sách)',
    collocations: [
      { jp: '積ん読が増える', reading: 'つんどくがふえる', vi: 'Chồng sách chờ đọc lại cao thêm' },
      { jp: '積ん読を消化する', reading: 'つんどくをしょうかする', vi: 'Dần đọc hết những cuốn sách đã mua' },
      { jp: '愛おしい積ん読', reading: 'いとおしいつんどく', vi: 'Chồng sách chưa đọc đầy yêu thương' },
    ],
    literaryUsage: {
      jp: '机の隅の積ん読は、未来の自分への小さな贈り物のようだ。',
      reading: 'つくえのすみのつんどくは、みらいのじぶんへのちいさなおくりもののようだ。',
      vi: 'Chồng sách xếp nơi góc bàn giống như những món quà nhỏ gửi cho chính mình của tương lai.',
    },
    conversationUsage: {
      jp: 'また本屋で三冊買っちゃって、積ん読が増えちゃいました。',
      reading: 'またほんやでさんさつかっちゃって、つんどくがふえちゃいました。',
      vi: 'Lại lỡ mua thêm 3 cuốn ở hiệu sách, chồng Tsundoku cao thêm mất rồi.',
    },
    relatedKotowaza: {
      jp: '晴耕雨読',
      reading: 'せいこううどく',
      vi: 'Tình Canh Vũ Độc — Trời nắng ra đồng, trời mưa đọc sách',
      nuance: 'Lối sống thong dong tự tại, hòa điệu cùng thời tiết và tri thức.',
    },
    microExercise: {
      promptVi: 'Chữ 積ん読 bắt nguồn từ cách chơi chữ của cụm khẩu ngữ nào?',
      choices: [
        {
          labelJp: '積んでおく (xếp chồng để đó)',
          reading: 'つんでおく',
          isIdeal: true,
          gentleNoteVi: 'Chính xác! 積んでおく rút gọn thành 積んどく, rồi người thời Meiji tinh nghịch viết thành 積ん読.',
        },
        {
          labelJp: '積んで歩く (xếp rồi đi bộ)',
          reading: 'つんであるく',
          isIdeal: false,
          gentleNoteVi: 'Gần rồi — gốc của nó là 積んでおく (xếp lại để dành đó) rút gọn âm thanh thành つんどく.',
        },
      ],
    },
    goshuinKanji: '栞',
    goshuinMottoJp: '晴耕雨読',
  },
];

export async function expandThreeSeasonalExhibits(
  microSeason: MicroSeasonInfo,
  seenWords: string[]
): Promise<ConservatoryExhibit[]> {
  const prompt = `Trong tiết khí 72-Kō hiện tại: "${microSeason.kanji}" (${microSeason.reading} · ${microSeason.vietnamese}, mùa ${microSeason.seasonTag}), hãy khai mở ĐÚNG 3 bảo vật ngôn từ mỹ học Nhật Bản hiếm có & giàu thi vị (Kigo, từ mỹ học như 木枯らし, 侘び寂び, 幽玄, 花吹雪, 蛍火, 露草, 風物詩, 蝉時雨, 夕凪, 朧月...) phù hợp không khí mùa này.
KHÔNG ĐƯỢC TRÙNG với các từ đã trưng bày: ${seenWords.join(', ')}.
Mỗi bảo vật gồm đủ 4 tầng giải phẫu học thuật (từ nguyên & Hán tự, 3 collocations, văn viết + hội thoại, trọng âm Tokyo NHK pitchContour 0/1 khớp số morae), 1 thành ngữ Kotowaza liên quan, 1 bài tập vi mô 15 giây nhẹ nhàng (2 lựa chọn), và 1 chữ Hán dấu triện Goshuin (1 ký tự) + câu chúc 4 chữ Hán.`;

  const schema = {
    type: 'OBJECT',
    properties: {
      exhibits: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            wordJp: { type: 'STRING' },
            reading: { type: 'STRING' },
            romaji: { type: 'STRING' },
            hanViet: { type: 'STRING' },
            meaningVi: { type: 'STRING' },
            seasonTag: { type: 'STRING' },
            pitchLabel: { type: 'STRING' },
            pitchContour: { type: 'ARRAY', items: { type: 'INTEGER' } },
            morae: { type: 'ARRAY', items: { type: 'STRING' } },
            etymologyLayerVi: { type: 'STRING' },
            kanjiStructureNote: { type: 'STRING' },
            collocations: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  jp: { type: 'STRING' },
                  reading: { type: 'STRING' },
                  vi: { type: 'STRING' },
                },
                required: ['jp', 'reading', 'vi'],
              },
            },
            literaryUsage: {
              type: 'OBJECT',
              properties: { jp: { type: 'STRING' }, reading: { type: 'STRING' }, vi: { type: 'STRING' } },
              required: ['jp', 'reading', 'vi'],
            },
            conversationUsage: {
              type: 'OBJECT',
              properties: { jp: { type: 'STRING' }, reading: { type: 'STRING' }, vi: { type: 'STRING' } },
              required: ['jp', 'reading', 'vi'],
            },
            relatedKotowaza: {
              type: 'OBJECT',
              properties: {
                jp: { type: 'STRING' },
                reading: { type: 'STRING' },
                vi: { type: 'STRING' },
                nuance: { type: 'STRING' },
              },
              required: ['jp', 'reading', 'vi', 'nuance'],
            },
            microExercise: {
              type: 'OBJECT',
              properties: {
                promptVi: { type: 'STRING' },
                choices: {
                  type: 'ARRAY',
                  items: {
                    type: 'OBJECT',
                    properties: {
                      labelJp: { type: 'STRING' },
                      reading: { type: 'STRING' },
                      isIdeal: { type: 'BOOLEAN' },
                      gentleNoteVi: { type: 'STRING' },
                    },
                    required: ['labelJp', 'reading', 'isIdeal', 'gentleNoteVi'],
                  },
                },
              },
              required: ['promptVi', 'choices'],
            },
            goshuinKanji: { type: 'STRING' },
            goshuinMottoJp: { type: 'STRING' },
          },
          required: [
            'wordJp',
            'reading',
            'romaji',
            'meaningVi',
            'seasonTag',
            'pitchLabel',
            'pitchContour',
            'morae',
            'etymologyLayerVi',
            'kanjiStructureNote',
            'collocations',
            'literaryUsage',
            'conversationUsage',
            'relatedKotowaza',
            'microExercise',
            'goshuinKanji',
            'goshuinMottoJp',
          ],
        },
      },
    },
    required: ['exhibits'],
  };

  const raw = await callGemini(
    prompt,
    'Bạn là giám tuyển Bảo Tàng Ngôn Từ & Quý Ngữ (Saijiki 歳時記) Nhật Bản, chuyên sâu về từ nguyên, Kotowaza và ngữ âm NHK.',
    undefined,
    false,
    schema,
    true
  );
  const parsed = safeExtractJson<{ exhibits: Array<Omit<ConservatoryExhibit, 'id'>> }>(raw, { exhibits: [] });
  if (!parsed.exhibits.length) {
    throw new Error('Không thể khai mở thêm 3 bảo vật ngôn từ mùa này.');
  }

  const candidates: ConservatoryExhibit[] = parsed.exhibits.slice(0, 3).map((ex, idx) => ({
    ...ex,
    id: `exhibit_ai_${Date.now()}_${idx}`,
    goshuinKanji: (ex.goshuinKanji || '季').slice(0, 1),
  }));

  return omniverseStorageService.filterAndRegisterUnique('conservatory_word', candidates, (e) => e.wordJp);
}
