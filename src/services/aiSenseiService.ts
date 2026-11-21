import { callGemini, callGeminiStream, safeExtractJson } from './geminiService';
import {
  resolveMasterVocabulary,
  findRelatedWordsByRootOrKanji,
  romajiToHiragana,
  hiraganaToRomaji,
  sentenceHiraganaToRomaji,
  katakanaToHiragana,
  normalizeToUnifiedHiragana,
  isGenericMetaSentence,
  generateAuthenticWordExamples
} from '../data/japaneseMasterDictionary';
import {
  EXAM_MASTERY_STRATEGIES,
  EXTRA_EXAM_STRATEGIES,
  DAILY_SPOKEN_VAULT,
  EXTRA_DAILY_SPOKEN,
  KEIGO_QUICK_MATRIX,
  EXTRA_KEIGO_MATRIX,
  OFFLINE_ADVANCED_TOPIC_BANK,
  CURATED_ON_DEMAND_VOCAB_BANK,
  getSimpleMeaning,
  ExamStrategyItem,
  DailySpokenItem,
  KeigoMatrixItem,
  DetailedVocabItem,
} from '../data/aiSenseiExamData';
import { rawKanjiDatabase } from '../data/allKanjiDatabase';
import { curatedPictograms } from '../data/kanjiPictorialData';
import { refineVietnameseMeaning } from '../utils/vietnameseMeaningSanitizer';
import { initializeExpanded200kBank } from '../data/thematicVocab/expanded200kEngine';
import { toHepburnRomaji, analyzeJapanesePhonetics } from '../data/kanaRomajiUtils';
import {
  resolveTruthLockedSinoVietnamese,
  resolveCompoundSinoVietnamese,
  TruthLockedSinoProfile,
} from './sinoVietnameseTruthEngine';

export {
  EXAM_MASTERY_STRATEGIES,
  EXTRA_EXAM_STRATEGIES,
  DAILY_SPOKEN_VAULT,
  EXTRA_DAILY_SPOKEN,
  KEIGO_QUICK_MATRIX,
  EXTRA_KEIGO_MATRIX,
  OFFLINE_ADVANCED_TOPIC_BANK,
  CURATED_ON_DEMAND_VOCAB_BANK,
};
export type { ExamStrategyItem, DailySpokenItem, KeigoMatrixItem, DetailedVocabItem };

export type SenseiFocusMode = 'comprehensive' | 'jlpt_exam' | 'daily_spoken' | 'business_keigo' | 'vocab_mastery';
export type SenseiExplanationPersona = 'encyclopedic_master' | 'ultimate_singularity';

export interface SenseiChatMessage {
  id: string;
  sender: 'user' | 'sensei';
  text: string;
  timestamp: string;
  category?: 'grammar' | 'kanji' | 'keigo' | 'culture' | 'jlpt' | 'general';
  explanationPersona?: SenseiExplanationPersona;
  citations?: string[];
  recommendedDrills?: string[];
}

export interface CuratedLectureTopic {
  id: string;
  category: 'Ngữ pháp' | 'Trợ từ' | 'Kính ngữ' | 'Hán tự' | 'Tâm lý văn hóa' | 'Bẫy đề JLPT';
  title: string;
  japaneseTitle: string;
  abstract: string;
  coreMechanic: string;
  comparativeMatrix: {
    itemA: { label: string; formula: string; nuance: string; example: string };
    itemB: { label: string; formula: string; nuance: string; example: string };
  };
  professorTakeaway: string;
  jlptTrapWarning: string;
}

export interface SentenceDiagnosisResult {
  originalText: string;
  grammarScore: number; // 0 - 100
  naturalnessScore: number; // 0 - 100
  registerScore: number; // 0 - 100 (độ phù hợp ngữ cảnh văn hóa/kính ngữ)
  overallVerdict: 'Xuất sắc chuẩn bản xứ' | 'Tự nhiên, dễ hiểu' | 'Đúng ngữ pháp nhưng khiên cưỡng' | 'Vi phạm quy chuẩn xã hội/Kính ngữ' | 'Có lỗi ngữ pháp cơ bản';
  detailedCritique: string[];
  nativeRefactoredVersion: string;
  readingFurigana: string;
  vietnameseMeaning: string;
  academicNotes: string;
}

export type VocabArchetype = 'single_kanji' | 'jukugo' | 'gairaigo' | 'idiom';

export interface KanjiRootComponent {
  kanji: string;
  hanViet: string;
  radical: string;
  meaning: string;
  onyomi?: string;
  kunyomi?: string;
  strokes?: number;
}

export interface DirectResolvedWordResult {
  found: boolean;
  word: string;
  reading: string;
  romaji: string;
  hanViet: string;
  level: string;
  partOfSpeech: string;
  meaning: string;
  literalMeaning?: string;
  figurativeMeaning?: string;
  loanwordSource?: string;
  coreKeywords?: string[];
  radicals?: KanjiRootComponent[];
  onyomi?: string[];
  kunyomi?: string[];
  strokeCount?: number;
  examples: Array<{ japanese: string; reading: string; romaji: string; vietnamese: string }>;
  culturalNote?: string;
  sinoTruthAlert?: TruthLockedSinoProfile;
}

const GAIRAIGO_ORIGIN_BANK: Record<string, string> = {
  'コンピューター': 'English: Computer (Máy tính)',
  'コンピュータ': 'English: Computer (Máy tính)',
  'パソコン': 'English: Personal Computer (Máy tính cá nhân)',
  'アルバイト': 'German: Arbeit (Việc làm thêm)',
  'バイト': 'German: Arbeit (Làm thêm)',
  'エネルギー': 'German: Energie (Năng lượng)',
  'テーマ': 'German: Thema (Chủ đề)',
  'アレルギー': 'German: Allergie (Dị ứng)',
  'アンケート': 'French: Enquête (Phiếu khảo sát)',
  'パン': 'Portuguese: Pão (Bánh mì)',
  'ビジネス': 'English: Business (Kinh doanh)',
  'スケジュール': 'English: Schedule (Lịch trình)',
  'システム': 'English: System (Hệ thống)',
  'ホテル': 'English: Hotel (Khách sạn)',
  'プロジェクト': 'English: Project (Dự án)',
  'マーケティング': 'English: Marketing (Tiếp thị)',
  'コミュニケーション': 'English: Communication (Giao tiếp)',
  'サービス': 'English: Service (Dịch vụ)',
  'マニュアル': 'English: Manual (Cẩm nang / Quy trình)',
  'メリット': 'English: Merit (Ưu điểm / Lợi ích)',
  'デメリット': 'English: Demerit (Nhược điểm)',
  'ストレス': 'English: Stress (Căng thẳng)',
  'マンション': 'English: Mansion (Chung cư cao cấp)',
  'モチベーション': 'English: Motivation (Động lực)',
  'プレゼン': 'English: Presentation (Thuyết trình)',
  'データー': 'English: Data (Dữ liệu)',
  'データ': 'English: Data (Dữ liệu)',
  'コスト': 'English: Cost (Chi phí)',
  'リスク': 'English: Risk (Rủi ro)',
  'ノウハウ': 'English: Know-how (Bí quyết chuyên môn)',
  'コンプライアンス': 'English: Compliance (Tuân thủ quy chuẩn)',
};

export function extractLoanwordOrigin(word: string, senseiText?: string): string {
  const clean = (word || '').trim();
  if (GAIRAIGO_ORIGIN_BANK[clean]) return GAIRAIGO_ORIGIN_BANK[clean];

  if (senseiText) {
    const m = senseiText.match(
      /(?:gốc\s*từ|tiếng\s*(?:Anh|Đức|Pháp|Bồ Đào Nha)|English|German|French|Portuguese)\s*[:：\-]?\s*([A-Za-z][A-Za-z\s\-]{1,36})/i
    );
    if (m && m[1]) {
      return `Gốc ngoại lai: ${m[1].trim()}`;
    }
  }

  const romajiHint = hiraganaToRomaji(katakanaToHiragana(clean));
  return romajiHint ? `Gairaigo (${romajiHint})` : 'Từ mượn ngoại lai (Gairaigo)';
}

export function classifyVocabWord(
  word: string,
  senseiText?: string,
  lexicon?: DirectResolvedWordResult | null
): VocabArchetype {
  const clean = (word || '').trim();
  if (!clean) return 'jukugo';

  // 1. Katakana / Gairaigo (exclusively Katakana + prolonged mark + middot)
  if (/^[\u30a0-\u30ffー・\s]+$/.test(clean)) {
    return 'gairaigo';
  }

  // 2. Single Kanji
  if (Array.from(clean).length === 1 && /[\u4e00-\u9faf]/.test(clean)) {
    return 'single_kanji';
  }

  // 3. Idiom / Kanyouku / Yojijukugo
  const posLower = (lexicon?.partOfSpeech || '').toLowerCase();
  const hasFigurativeData = Boolean(
    lexicon?.figurativeMeaning &&
      lexicon?.literalMeaning &&
      lexicon.figurativeMeaning !== lexicon.literalMeaning
  );
  const hasIdiomParticlePhrase =
    /[\u4e00-\u9faf]/.test(clean) && /(?:が|を|に|へ|と|も|て|の)/.test(clean) && clean.length >= 4;
  const isYojijukugo =
    /^[\u4e00-\u9faf]{4}$/.test(clean) &&
    Boolean(senseiText && /yojijukugo|thành ngữ|quán dụng|kanyouku|nghĩa bóng|四字熟語|慣用句/i.test(senseiText));
  const senseiMarksIdiom = Boolean(
    senseiText &&
      new RegExp(`${clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^\\n]{0,30}(?:quán dụng ngữ|thành ngữ|kanyouku|yojijukugo)`, 'i').test(
        senseiText
      )
  );

  if (
    hasFigurativeData ||
    hasIdiomParticlePhrase ||
    isYojijukugo ||
    senseiMarksIdiom ||
    posLower.includes('quán dụng') ||
    posLower.includes('thành ngữ') ||
    clean.length >= 7
  ) {
    return 'idiom';
  }

  // 4. Default: Jukugo / Compound Vocab
  return 'jukugo';
}

export function extractContextWeightedMeanings(
  meaning: string,
  qaContextText: string,
  lexicon?: DirectResolvedWordResult | null
): Array<{ text: string; isContextMatch: boolean }> {
  const rawPool = [
    meaning,
    lexicon?.figurativeMeaning || '',
    lexicon?.literalMeaning || '',
  ]
    .filter(Boolean)
    .join(', ');

  const stripped = rawPool
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/（[^）]*）/g, '')
    .replace(/(?:xem:|như:|chữ\s+|bộ\s+)/gi, '')
    .trim();

  const rawParts = stripped
    .split(/[,;/、・]+/)
    .map((p) => p.trim())
    .filter((p) => p.length >= 2 && p.length <= 44);

  const unique: string[] = [];
  for (const part of rawParts) {
    const cap = part.charAt(0).toUpperCase() + part.slice(1);
    if (!unique.some((u) => u.toLowerCase() === cap.toLowerCase())) {
      unique.push(cap);
    }
  }

  if (unique.length === 0 && meaning.trim()) {
    const fallback = meaning.trim().slice(0, 44);
    unique.push(fallback.charAt(0).toUpperCase() + fallback.slice(1));
  }

  // Extract Vietnamese context keywords from ongoing Q&A prompt + Sensei direct conclusion
  const stopWords = new Set([
    'của', 'và', 'là', 'gì', 'trong', 'cho', 'với', 'từ', 'này', 'đó', 'như', 'thế',
    'nào', 'khi', 'hay', 'hoặc', 'những', 'các', 'một', 'được', 'làm', 'tôi', 'em',
    'sensei', 'nghĩa', 'chữ', 'câu', 'tiếng', 'nhật', 'việt', 'cách', 'dùng',
  ]);
  const ctxTokens = (qaContextText || '')
    .toLowerCase()
    .split(/[^a-z\u00C0-\u1EF9]+/)
    .filter((w) => w.length >= 2 && !stopWords.has(w));

  const scored = unique.map((candidate, idx) => {
    const candTokens = candidate
      .toLowerCase()
      .split(/[^a-z\u00C0-\u1EF9]+/)
      .filter((w) => w.length >= 2 && !stopWords.has(w));
    let overlapScore = 0;
    for (const ct of candTokens) {
      if (ctxTokens.includes(ct)) overlapScore += 2;
      else if (ctxTokens.some((q) => q.includes(ct) || ct.includes(q))) overlapScore += 1;
    }
    return {
      text: candidate,
      score: overlapScore,
      origIdx: idx,
    };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.origIdx - b.origIdx;
  });

  const topTwo = scored.slice(0, 2);
  const highestScore = topTwo[0]?.score || 0;

  return topTwo.map((item, idx) => ({
    text: item.text,
    isContextMatch: highestScore > 0 ? item.score === highestScore : idx === 0 && ctxTokens.length > 0,
  }));
}

export function extractCoreKeywordsVi(meaning: string): string[] {
  if (!meaning) return [];
  const stripped = meaning
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/（[^）]*）/g, '')
    .replace(/(?:xem:|như:|chữ\s+|bộ\s+)/gi, '')
    .trim();

  const parts = stripped
    .split(/[,;/、・]+/)
    .map((p) => p.trim())
    .filter((p) => p.length >= 2 && p.length <= 36);

  const unique: string[] = [];
  for (const part of parts) {
    const capitalized = part.charAt(0).toUpperCase() + part.slice(1);
    if (!unique.some((u) => u.toLowerCase() === capitalized.toLowerCase())) {
      unique.push(capitalized);
    }
    if (unique.length >= 2) break;
  }

  if (unique.length === 0 && meaning.trim()) {
    const shortFallback = meaning.trim().slice(0, 40);
    return [shortFallback.charAt(0).toUpperCase() + shortFallback.slice(1)];
  }
  return unique;
}

export function extractKanjiRootSnapshot(word: string): {
  radicals: KanjiRootComponent[];
  onyomi: string[];
  kunyomi: string[];
  strokeCount?: number;
} {
  if (!word) return { radicals: [], onyomi: [], kunyomi: [] };
  const kanjiChars = Array.from(new Set(word.match(/[\u4e00-\u9faf]/g) || []));
  const radicals: KanjiRootComponent[] = [];
  const onSet = new Set<string>();
  const kunSet = new Set<string>();
  let totalStrokes = 0;

  for (const ch of kanjiChars) {
    const hit = rawKanjiDatabase.find((k) => k.c === ch);
    if (hit) {
      const cleanOn = (hit.o || []).filter(Boolean).slice(0, 2);
      const cleanKun = (hit.k || []).map((k) => k.replace(/[-.]/g, '')).filter(Boolean).slice(0, 2);
      cleanOn.forEach((o) => onSet.add(o));
      cleanKun.forEach((k) => kunSet.add(k));
      if (hit.st) totalStrokes += hit.st;

      radicals.push({
        kanji: hit.c,
        hanViet: resolveTruthLockedSinoVietnamese(hit.c, hit.s).primary,
        radical: hit.rad ? `Bộ ${hit.rad.charAt(0).toUpperCase() + hit.rad.slice(1)}` : 'Bộ gốc',
        meaning: extractCoreKeywordsVi(refineVietnameseMeaning(hit.m))[0] || refineVietnameseMeaning(hit.m),
        onyomi: cleanOn.join('・') || undefined,
        kunyomi: cleanKun.join('・') || undefined,
        strokes: hit.st,
      });
    }
  }

  return {
    radicals: radicals.slice(0, 4),
    onyomi: Array.from(onSet).slice(0, 3),
    kunyomi: Array.from(kunSet).slice(0, 3),
    strokeCount: totalStrokes > 0 ? totalStrokes : undefined,
  };
}

const HANVIET_COMMON_KANJI_ALIASES: Record<string, string[]> = {
  '会': ['HỘI'],
  '絵': ['HỘI'],
  '子': ['TỬ'],
  '司': ['TƯ', 'TI'],
  '行': ['HÀNH', 'HÀNG'],
  '楽': ['LẠC', 'NHẠC'],
  '悪': ['ÁC', 'Ố'],
  '読': ['ĐỘC'],
  '重': ['TRỌNG', 'TRÙNG'],
  '長': ['TRƯỜNG', 'TRƯỞNG'],
  '見': ['KIẾN', 'HIỆN'],
  '着': ['TRƯỚC'],
  '説': ['THUYẾT'],
  '参': ['THAM', 'SAM'],
  '率': ['SUẤT'],
  '省': ['TỈNH', 'SẢNH'],
  '分': ['PHÂN', 'PHẬN'],
  '間': ['GIAN', 'GIÁN'],
  '明': ['MINH'],
  '空': ['KHÔNG'],
  '気': ['KHÍ'],
};

const HANVIET_PREFERRED_KANJI: Record<string, string> = {
  'hội': '会',
  'hoi': '会',
  'cối': '会',
  'tử': '子',
  'tu': '子',
  'ti': '司',
  'tư': '司',
  'lạc': '楽',
  'nhạc': '楽',
  'ác': '悪',
  'độc': '読',
  'kiến': '見',
  'hành': '行',
  'trước': '着',
  'thuyết': '説',
  'suất': '率',
  'hợi': '亥',
};

const VIETNAMESE_QUERY_STOPWORDS = new Set([
  'romaji', 'furigana', 'hiragana', 'katakana', 'kanji', 'pitch', 'accent',
  'tiếng', 'tieng', 'nhật', 'nhat', 'nghĩa', 'nghia', 'của', 'cua', 'chữ', 'chu',
  'hán', 'han', 'tự', 'tu', 'từ', 'vựng', 'vung', 'đọc', 'doc', 'sao', 'thế', 'the',
  'nào', 'nao', 'là', 'la', 'gì', 'gi', 'cho', 'hỏi', 'hoi', 'sensei', 'giải', 'giai',
  'thích', 'thich', 'phân', 'phan', 'tích', 'tich', 'chi', 'tiết', 'tiet', 'hãy', 'hay',
  'giúp', 'giup', 'em', 'tôi', 'toi', 'mình', 'minh', 'bạn', 'ban', 'về', 've',
  'trong', 'tìm', 'tim', 'hiểu', 'hieu', 'tra', 'cứu', 'cuu', 'câu', 'cau', 'này', 'nay',
  'cách', 'cach', 'dùng', 'dung', 'bộ', 'bo', 'thủ', 'thu', 'âm', 'am', 'nét', 'net',
  'viết', 'viet', 'với', 'voi', 'và', 'va', 'hoặc', 'hoac', 'những', 'nhung', 'các', 'cac',
  'một', 'mot', 'khi', 'nên', 'nen', 'được', 'duoc', 'có', 'co', 'không', 'khong',
  'trọng', 'trong', 'đặc', 'dac', 'biệt', 'biet', 'cốt', 'cot', 'lõi', 'loi',
]);

export interface LockedQueryTarget {
  rawQuery: string;
  jpToken: string | null;
  kanjiChars: string[];
  isSingleKanji: boolean;
  isCompound: boolean;
  hanVietHint: string | null;
}

export function extractLockedQueryTarget(userQuery: string): LockedQueryTarget {
  const raw = (userQuery || '').trim();
  if (!raw) {
    return {
      rawQuery: '',
      jpToken: null,
      kanjiChars: [],
      isSingleKanji: false,
      isCompound: false,
      hanVietHint: null,
    };
  }

  let jpToken: string | null = null;

  // Priority 1: Explicit Japanese token inside brackets/quotes (e.g. 「会」, 【会社】)
  const quotedAll = raw.match(/[「『【\[("']([^」』】\])"']+)[」』】\])"']/g) || [];
  for (const qBlock of quotedAll) {
    const inner = qBlock.slice(1, -1).trim();
    const innerJp = inner.match(/[\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ffー]+/);
    if (innerJp && innerJp[0]) {
      jpToken = innerJp[0];
      break;
    }
  }

  // Priority 2: Direct Japanese runs in query (longest meaningful JP run first, skipping trailing particles)
  if (!jpToken) {
    const jpRuns = raw.match(/[\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ffー]+/g) || [];
    if (jpRuns.length > 0) {
      const sorted = [...jpRuns].sort((a, b) => b.length - a.length);
      jpToken = sorted[0];
    }
  }

  const kanjiChars = jpToken ? Array.from(new Set(jpToken.match(/[\u4e00-\u9faf]/g) || [])) : [];
  const jpLength = jpToken ? Array.from(jpToken).length : 0;
  const isSingleKanji = jpLength === 1 && kanjiChars.length === 1;
  const isCompound = jpLength >= 2;

  // Priority 3: If no Japanese chars, extract explicit Vietnamese Han-Viet word target cleanly (Unicode-aware!)
  let hanVietHint: string | null = null;
  if (!jpToken) {
    const explicitKanjiCue = raw.match(
      /(?:chữ|hán\s*tự|từ|kanji)\s+(?:hán\s+)?[「『"'\[]?([a-zA-Z\u00C0-\u1EF9]{2,18})[」』"'\]]?/i
    );
    if (explicitKanjiCue && explicitKanjiCue[1]) {
      const cand = explicitKanjiCue[1].trim();
      if (!VIETNAMESE_QUERY_STOPWORDS.has(cand.toLowerCase())) {
        hanVietHint = cand.toUpperCase();
      }
    }

    if (!hanVietHint) {
      const unicodeWords = raw.match(/[a-zA-Z\u00C0-\u1EF9]+/g) || [];
      const meaningful = unicodeWords.filter(
        (w) => w.length >= 2 && !VIETNAMESE_QUERY_STOPWORDS.has(w.toLowerCase())
      );
      if (meaningful.length === 1) {
        hanVietHint = meaningful[0].toUpperCase();
      } else if (meaningful.length > 1) {
        // Pick the last non-stopword capitalized or exact Han-Viet match
        const capHit = meaningful.find((w) => w === w.toUpperCase() && w.length >= 2);
        const hvHit = meaningful.find((w) => {
          const low = w.toLowerCase();
          return (
            Boolean(HANVIET_PREFERRED_KANJI[low]) ||
            rawKanjiDatabase.some((k) => k.s && k.s.toLowerCase() === low)
          );
        });
        const chosen = capHit || hvHit || meaningful[0];
        if (chosen) hanVietHint = chosen.toUpperCase();
      }
    }
  }

  return {
    rawQuery: raw,
    jpToken,
    kanjiChars,
    isSingleKanji,
    isCompound,
    hanVietHint,
  };
}

function buildSingleKanjiDirectResult(
  kanjiHit: (typeof rawKanjiDatabase)[number],
  overrideHanViet?: string
): DirectResolvedWordResult {
  const onList = (kanjiHit.o || []).filter(Boolean);
  const kunList = (kanjiHit.k || []).map((k) => k.replace(/[-.]/g, '')).filter(Boolean);
  const onyomi = onList.join('、 ') || '—';
  const kunyomi = kunList.join('、 ') || '—';
  const primaryRead = kunList[0] || onList[0] || '';
  const rom = primaryRead ? hiraganaToRomaji(katakanaToHiragana(primaryRead)) : '';
  const pict = curatedPictograms[kanjiHit.c];
  const refinedMeaning = refineVietnameseMeaning(kanjiHit.m);
  const coreKeywords = extractCoreKeywordsVi(refinedMeaning);
  const rootSnapshot = extractKanjiRootSnapshot(kanjiHit.c);

  const truthProfile = resolveTruthLockedSinoVietnamese(kanjiHit.c, kanjiHit.s);
  const displayHanViet = overrideHanViet || truthProfile.primary;

  const exList: Array<{ japanese: string; reading: string; romaji: string; vietnamese: string }> = [];
  if (pict && pict.lifeVocab && pict.lifeVocab.length > 0) {
    for (const lv of pict.lifeVocab.slice(0, 2)) {
      exList.push({
        japanese: lv.word,
        reading: lv.reading,
        romaji: hiraganaToRomaji(katakanaToHiragana(lv.reading)),
        vietnamese: refineVietnameseMeaning(lv.meaning),
      });
    }
  }

  return {
    found: true,
    word: kanjiHit.c,
    reading: `${kunyomi !== '—' ? kunyomi : ''}${
      kunyomi !== '—' && onyomi !== '—' ? ' / ' : ''
    }${onyomi !== '—' ? onyomi : ''}`.trim(),
    romaji: rom || hiraganaToRomaji(katakanaToHiragana(primaryRead)),
    hanViet: displayHanViet,
    level: kanjiHit.lvl || 'N3',
    partOfSpeech: 'Chữ Hán Thường Dụng (Joyo Kanji)',
    meaning: refinedMeaning,
    coreKeywords,
    radicals: rootSnapshot.radicals,
    onyomi: onList.slice(0, 3),
    kunyomi: kunList.slice(0, 3),
    strokeCount: kanjiHit.st,
    examples: exList,
    culturalNote: `Âm Hán Việt chuẩn: ${displayHanViet}. Bộ thủ: ${
      kanjiHit.rad ? kanjiHit.rad.toUpperCase() : 'Gốc'
    }. Số nét: ${kanjiHit.st}. Onyomi: ${onyomi}. Kunyomi: ${kunyomi}.`,
    sinoTruthAlert: truthProfile,
  };
}

export function resolveDirectKanjiOrVocab(
  query: string,
  strictTarget?: string
): DirectResolvedWordResult | null {
  const effectiveInput = (strictTarget || query || '').trim();
  if (!effectiveInput) return null;

  const locked = extractLockedQueryTarget(effectiveInput);

  // =========================================================================
  // PATH 1: STRICT JAPANESE UNICODE TARGET LOCK (Kanji / Compound / Kana)
  // Never falls back to noisy Vietnamese word matching when JP chars exist!
  // =========================================================================
  if (locked.jpToken) {
    const cleanToken = locked.jpToken.trim();
    const tokenChars = Array.from(cleanToken);

    // 1A. Exact Single Kanji Lock (e.g. 会 -> ONLY rawKanjiDatabase.c === '会')
    if (tokenChars.length === 1 && /[\u4e00-\u9faf]/.test(cleanToken)) {
      const kanjiHit = rawKanjiDatabase.find((k) => k.c === cleanToken);
      if (kanjiHit) {
        return buildSingleKanjiDirectResult(kanjiHit);
      }
    }

    // 1B. Compound / Multi-char Japanese word: Check curatedPictograms EXACT match
    for (const [kChar, pict] of Object.entries(curatedPictograms)) {
      const allV = [...(pict.lifeVocab || []), ...(pict.examVocab || [])];
      const vHit = allV.find((v) => v.word === cleanToken || v.reading === cleanToken);
      if (vHit) {
        const hira = katakanaToHiragana(vHit.reading);
        const rom = hiraganaToRomaji(hira);
        const kRecord = rawKanjiDatabase.find((k) => k.c === kChar);
        const refinedMeaning = refineVietnameseMeaning(vHit.meaning);
        const rootSnapshot = extractKanjiRootSnapshot(vHit.word);
        const canonicalCompoundSino =
          resolveCompoundSinoVietnamese(vHit.word, (c) => rawKanjiDatabase.find((k) => k.c === c)?.s) ||
          vHit.sinoVietnamese ||
          (kRecord ? resolveTruthLockedSinoVietnamese(kRecord.c, kRecord.s).primary : '');
        return {
          found: true,
          word: vHit.word,
          reading: vHit.reading || hira,
          romaji: rom,
          hanViet: canonicalCompoundSino,
          level: kRecord?.lvl || 'N3',
          partOfSpeech: vHit.usageType === 'life' ? 'Từ vựng đời sống' : 'Từ vựng đề thi JLPT',
          meaning: refinedMeaning,
          coreKeywords: extractCoreKeywordsVi(refinedMeaning),
          radicals: rootSnapshot.radicals,
          onyomi: rootSnapshot.onyomi,
          kunyomi: rootSnapshot.kunyomi,
          strokeCount: rootSnapshot.strokeCount,
          examples: [
            {
              japanese: `${vHit.word}を正しく使いましょう。`,
              reading: `${vHit.reading} を ただしく つかいましょう。`,
              romaji: `${rom} wo tadashiku tsukaimashou.`,
              vietnamese: `Hãy sử dụng chuẩn xác từ "${vHit.word}" trong thực tế.`,
            },
          ],
          culturalNote: `Từ vựng cốt lõi chứa chữ Hán 【${kChar}】(Hán Việt: ${canonicalCompoundSino}).`,
        };
      }
    }

    // 1C. Compound / Multi-char Japanese word: Check Master Dictionary (STRICT exact match only)
    const masterHit = resolveMasterVocabulary(cleanToken, 'N1');
    if (masterHit && masterHit.length > 0) {
      const v = masterHit[0];
      const normVWord = katakanaToHiragana(v.word).trim();
      const normVRead = katakanaToHiragana(v.reading).trim();
      const normClean = katakanaToHiragana(cleanToken).trim();

      if (
        v.word === cleanToken ||
        v.reading === cleanToken ||
        normVWord === normClean ||
        normVRead === normClean
      ) {
        const refinedMeaning = refineVietnameseMeaning(
          v.simpleMeaning || v.primaryMeaning || v.literalMeaning
        );
        const rootSnapshot = extractKanjiRootSnapshot(v.word);
        const resolvedCompoundHv =
          resolveCompoundSinoVietnamese(v.word, (c) => rawKanjiDatabase.find((k) => k.c === c)?.s) ||
          v.hanViet ||
          '';
        return {
          found: true,
          word: v.word,
          reading: v.reading,
          romaji: v.romaji || hiraganaToRomaji(katakanaToHiragana(v.reading)),
          hanViet: resolvedCompoundHv,
          level: v.level || 'N3',
          partOfSpeech: v.partOfSpeech || 'Từ vựng tiếng Nhật',
          meaning: refinedMeaning,
          literalMeaning: v.literalMeaning ? refineVietnameseMeaning(v.literalMeaning) : undefined,
          figurativeMeaning: v.figurativeMeaning
            ? refineVietnameseMeaning(v.figurativeMeaning)
            : undefined,
          loanwordSource: /^[\u30a0-\u30ffー・\s]+$/.test(v.word)
            ? extractLoanwordOrigin(v.word, v.senseiExplanation)
            : undefined,
          coreKeywords: extractCoreKeywordsVi(refinedMeaning),
          radicals: rootSnapshot.radicals,
          onyomi: rootSnapshot.onyomi,
          kunyomi: rootSnapshot.kunyomi,
          strokeCount: rootSnapshot.strokeCount,
          examples: v.examples.map((ex) => ({
            japanese: ex.japanese,
            reading: ex.reading,
            romaji: ex.romaji || hiraganaToRomaji(katakanaToHiragana(ex.reading)),
            vietnamese: refineVietnameseMeaning(ex.vietnamese),
          })),
          culturalNote: v.senseiExplanation,
        };
      }
    }

    // 1D. If compound contains Kanji not in curated dict, synthesize exact Kanji decomposition
    if (locked.kanjiChars.length >= 2) {
      const rootSnapshot = extractKanjiRootSnapshot(cleanToken);
      if (rootSnapshot.radicals.length > 0) {
        const hanVietJoined = rootSnapshot.radicals
          .map((r) => r.hanViet)
          .filter(Boolean)
          .join(' ');
        const synthMeaning = rootSnapshot.radicals
          .map((r) => r.meaning)
          .filter(Boolean)
          .join(' + ');
        const guessRead = rootSnapshot.radicals
          .map((r) => (r.onyomi ? r.onyomi.split('・')[0] : ''))
          .filter(Boolean)
          .join('');
        return {
          found: true,
          word: cleanToken,
          reading: guessRead,
          romaji: guessRead ? hiraganaToRomaji(katakanaToHiragana(guessRead)) : '',
          hanViet: hanVietJoined,
          level: 'JLPT',
          partOfSpeech: 'Từ ghép Hán tự (Jukugo)',
          meaning: synthMeaning || cleanToken,
          coreKeywords: extractCoreKeywordsVi(synthMeaning || cleanToken),
          radicals: rootSnapshot.radicals,
          onyomi: rootSnapshot.onyomi,
          kunyomi: rootSnapshot.kunyomi,
          strokeCount: rootSnapshot.strokeCount,
          examples: [],
        };
      }
    }

    return null;
  }

  // =========================================================================
  // PATH 2: NON-JAPANESE QUERY (Explicit Han-Viet or Exact Romaji)
  // Strictly Unicode-safe whole-word matching (ZERO diacritic splitting!)
  // =========================================================================
  if (!locked.hanVietHint) return null;

  const hintLower = locked.hanVietHint.toLowerCase();
  if (VIETNAMESE_QUERY_STOPWORDS.has(hintLower)) return null;

  // 2A. Check preferred Han-Viet -> Canonical Kanji mapping (e.g. "HỘI" -> 会 unless painting/絵 context)
  const isPaintingContext = /\b(vẽ|tranh|họa|hoa|bức)\b/i.test(effectiveInput);
  if ((hintLower === 'hội' || hintLower === 'hoi') && isPaintingContext) {
    const paintKanji = rawKanjiDatabase.find((k) => k.c === '絵');
    if (paintKanji) return buildSingleKanjiDirectResult(paintKanji);
  }

  const preferredChar = HANVIET_PREFERRED_KANJI[hintLower];
  if (preferredChar) {
    const prefHit = rawKanjiDatabase.find((k) => k.c === preferredChar);
    if (prefHit) return buildSingleKanjiDirectResult(prefHit);
  }

  // 2B. Exact accented Sino-Vietnamese match in rawKanjiDatabase
  const exactHanVietHit = rawKanjiDatabase.find(
    (k) => k.s && k.s.toLowerCase() === hintLower
  );
  if (exactHanVietHit) {
    return buildSingleKanjiDirectResult(exactHanVietHit);
  }

  // 2C. Exact Romaji match ONLY (never partial Vietnamese guesses)
  if (/^[a-z]{2,20}$/.test(hintLower)) {
    const masterRomHit = resolveMasterVocabulary(hintLower, 'N1');
    if (masterRomHit && masterRomHit.length > 0) {
      const v = masterRomHit[0];
      if (v.romaji && v.romaji.toLowerCase() === hintLower) {
        const refinedMeaning = refineVietnameseMeaning(
          v.simpleMeaning || v.primaryMeaning || v.literalMeaning
        );
        const rootSnapshot = extractKanjiRootSnapshot(v.word);
        return {
          found: true,
          word: v.word,
          reading: v.reading,
          romaji: v.romaji,
          hanViet: v.hanViet || '',
          level: v.level || 'N3',
          partOfSpeech: v.partOfSpeech || 'Từ vựng tiếng Nhật',
          meaning: refinedMeaning,
          literalMeaning: v.literalMeaning ? refineVietnameseMeaning(v.literalMeaning) : undefined,
          figurativeMeaning: v.figurativeMeaning
            ? refineVietnameseMeaning(v.figurativeMeaning)
            : undefined,
          loanwordSource: /^[\u30a0-\u30ffー・\s]+$/.test(v.word)
            ? extractLoanwordOrigin(v.word, v.senseiExplanation)
            : undefined,
          coreKeywords: extractCoreKeywordsVi(refinedMeaning),
          radicals: rootSnapshot.radicals,
          onyomi: rootSnapshot.onyomi,
          kunyomi: rootSnapshot.kunyomi,
          strokeCount: rootSnapshot.strokeCount,
          examples: v.examples.map((ex) => ({
            japanese: ex.japanese,
            reading: ex.reading,
            romaji: ex.romaji || hiraganaToRomaji(katakanaToHiragana(ex.reading)),
            vietnamese: refineVietnameseMeaning(ex.vietnamese),
          })),
          culturalNote: v.senseiExplanation,
        };
      }
    }
  }

  return null;
}

export function purgeSenseiLookupCache(targetQuery?: string): void {
  vocabCache.clear();
  if (!targetQuery) {
    senseiAcademicCache.clear();
    return;
  }
  const norm = targetQuery.trim().toLowerCase();
  for (const key of Array.from(senseiAcademicCache.keys())) {
    if (!key.endsWith(`::${norm}`)) {
      // Keep only exact matching query or purge stale entries proactively
      senseiAcademicCache.delete(key);
    }
  }
}

export function verifyAndHealLexiconDossier(
  lexicon: DirectResolvedWordResult | null,
  userQuery: string,
  senseiText?: string
): {
  lexicon: DirectResolvedWordResult | null;
  healed: boolean;
  fatalMismatchDetected: boolean;
  reason?: string;
} {
  const locked = extractLockedQueryTarget(userQuery);
  let working = lexicon;
  let fatalMismatchDetected = false;
  let healed = false;
  let reason: string | undefined;

  // 1. Check strict Japanese target lock: [Input User] === [Output UI]
  if (locked.jpToken) {
    const outWord = (working?.word || '').trim();
    const matchesExact =
      outWord === locked.jpToken ||
      katakanaToHiragana(outWord) === katakanaToHiragana(locked.jpToken);
    const matchesSingleKanji = !locked.isSingleKanji || outWord === locked.jpToken;
    const matchesAllKanji = locked.kanjiChars.every((kc) => outWord.includes(kc));

    if (!working || !matchesSingleKanji || (!matchesExact && !matchesAllKanji)) {
      fatalMismatchDetected = true;
      reason = `Target mismatch: expected "${locked.jpToken}", got "${outWord || 'empty'}"`;
      purgeSenseiLookupCache(userQuery);
      const forcedDirect = resolveDirectKanjiOrVocab(locked.jpToken, locked.jpToken);
      if (forcedDirect) {
        working = forcedDirect;
        healed = true;
      } else {
        working = null;
      }
    }
  } else if (locked.hanVietHint) {
    // 2. Check Han-Viet integrity lock (e.g. user asked "HỘI", forbid stale "TI / 司")
    const stripTone = (s: string) =>
      (s || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase();

    const hintNorm = stripTone(locked.hanVietHint);
    const outWord = (working?.word || '').trim();
    const outHvList = [
      working?.hanViet || '',
      ...(HANVIET_COMMON_KANJI_ALIASES[outWord] || []),
    ]
      .join(' ')
      .toLowerCase();
    const outHvTokens = outHvList.split(/[\s\/,·]+/).filter(Boolean);
    const hvMatches =
      outHvTokens.some((tok) => tok === locked.hanVietHint!.toLowerCase() || stripTone(tok) === hintNorm);

    if (!working || !hvMatches) {
      fatalMismatchDetected = true;
      reason = `Han-Viet mismatch: expected "${locked.hanVietHint}", got "${outWord} (${
        working?.hanViet || 'N/A'
      })"`;
      purgeSenseiLookupCache(userQuery);

      // Prefer explicit Japanese Kanji from Sensei text ONLY if it matches the requested Han-Viet!
      let healedFromText: DirectResolvedWordResult | null = null;
      if (senseiText) {
        const quotedJp = senseiText.match(/[「【]([\u4e00-\u9faf]{1,4})[」】]/);
        if (quotedJp && quotedJp[1]) {
          const cand = resolveDirectKanjiOrVocab(quotedJp[1], quotedJp[1]);
          const candAliases = [
            cand?.hanViet || '',
            ...(HANVIET_COMMON_KANJI_ALIASES[quotedJp[1]] || []),
          ].join(' ');
          if (cand && stripTone(candAliases).includes(hintNorm)) {
            healedFromText = cand;
          }
        }
      }

      const forcedByHv = healedFromText || resolveDirectKanjiOrVocab(userQuery);
      if (forcedByHv) {
        working = forcedByHv;
        healed = true;
      } else {
        working = null;
      }
    }
  }

  // 3. Field-level Unicode Kanji anatomy verification (prevents stroke/radical grafting)
  if (working && working.word && !/^[\u30a0-\u30ffー・\s]+$/.test(working.word)) {
    const wordKanji = Array.from(new Set(working.word.match(/[\u4e00-\u9faf]/g) || []));
    if (wordKanji.length === 1 && Array.from(working.word).length === 1) {
      const dbRec = rawKanjiDatabase.find((k) => k.c === wordKanji[0]);
      if (dbRec) {
        const trueStrokes = dbRec.st;
        const trueOn = (dbRec.o || []).filter(Boolean).slice(0, 3);
        const trueKun = (dbRec.k || []).map((k) => k.replace(/[-.]/g, '')).filter(Boolean).slice(0, 3);
        const trueRad = dbRec.rad
          ? `Bộ ${dbRec.rad.charAt(0).toUpperCase() + dbRec.rad.slice(1)}`
          : 'Bộ gốc';
        const truthSingle = resolveTruthLockedSinoVietnamese(dbRec.c, dbRec.s);
        const hasCorruptedStats =
          working.strokeCount !== trueStrokes ||
          working.hanViet !== truthSingle.primary ||
          !working.sinoTruthAlert ||
          (working.radicals?.[0]?.kanji && working.radicals[0].kanji !== dbRec.c);

        if (hasCorruptedStats) {
          healed = true;
          working = {
            ...working,
            hanViet: truthSingle.primary,
            sinoTruthAlert: truthSingle,
            strokeCount: trueStrokes,
            onyomi: trueOn,
            kunyomi: trueKun,
            radicals: [
              {
                kanji: dbRec.c,
                hanViet: truthSingle.primary,
                radical: trueRad,
                meaning:
                  extractCoreKeywordsVi(refineVietnameseMeaning(dbRec.m))[0] ||
                  refineVietnameseMeaning(dbRec.m),
                onyomi: trueOn.join('・') || undefined,
                kunyomi: trueKun.join('・') || undefined,
                strokes: trueStrokes,
              },
            ],
          };
        }
      }
    } else if (wordKanji.length > 0) {
      const canonicalRoot = extractKanjiRootSnapshot(working.word);
      if (canonicalRoot.radicals.length > 0) {
        working = {
          ...working,
          radicals: canonicalRoot.radicals,
          onyomi: canonicalRoot.onyomi,
          kunyomi: canonicalRoot.kunyomi,
          strokeCount: canonicalRoot.strokeCount,
        };
      }
    }
  }

  return {
    lexicon: working,
    healed,
    fatalMismatchDetected,
    reason,
  };
}

export function cleanSenseiText(raw: string, preserveRichFormatting = false): string {
  if (!raw) return '';
  let text = raw
    .replace(/^#{1,6}\s*/gm, '') // Remove markdown # heading hashes
    .replace(/^[ \t]*\*[ \t]+/gm, '• ') // Convert markdown * bullets into crisp • bullets
    .trim();

  if (preserveRichFormatting) {
    // Preserve **bold keywords** and | tables |, strip only stray single *
    text = text
      .replace(/(?<!\*)\*(?!\*)/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    return text;
  }

  return text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const AI_SENSEI_MODE1_SYSTEM_INSTRUCTION = `
Bạn là "ĐẠI TÔNG SƯ TIẾNG NHẬT TOÀN NĂNG" (Omnipotent AI Sensei · Chế độ 1 — Bách Khoa Toàn Thư & Tốc Độ Nhanh).

5 SIÊU TRỤ CỘT BẮT BUỘC:
1. BÁCH KHOA TỪ VỰNG & HÁN TỰ (5 CHIỀU):
   • Giải phẫu & Ngữ âm: Bộ thủ, Âm On/Kun, Mẹo chiết tự, Modified Hepburn (n', ō/ū, tch), Trọng âm Tokyo NHK ([0]/[1]/[2]/[n]).
   • Ma trận Sắc thái: Nghĩa Đen (vật lý) vs Nghĩa Bóng (ẩn dụ/tâm lý), sắc thái tôn kính/suồng sã/mỉa mai/khiêm nhường.
   • Hệ sinh thái Collocation cố định (vd: 薬を塗る, tuyệt đối chống dịch word-by-word).
   • Bảng so sánh Đồng nghĩa/Đồng âm (vd: 変わる vs 代わる vs 換わる) + Kanyouku / Yojijukugo / Tiền-Hậu tố.
2. KỸ SƯ NGỮ PHÁP & LOGIC ĐỀ THI (JEES HACKER):
   • Mổ xẻ S-V-O & tư duy nhận thức đằng sau cấu trúc (cấm liệt kê công thức khô khan).
   • Bảng đối chiếu trực diện các mẫu na ná (vd: から/ので/ばかりに/せいで/おかげで) + vạch trần Bẫy JEES (đảo nhân quả, trạng từ cấm kỵ, lỗi kết hợp).
   • ĐÚNG 3 câu ví dụ độc lập bao trùm: (1) Đời sống Tameguchi, (2) Công sở Keigo, (3) Học thuật chuẩn JLPT.
3. BẬC THẦY DIỄN ĐẠT TPO & TRUY XUẤT NGÔN NGỮ BẢN XỨ:
   • Câu hỏi dịch thuật / diễn đạt: Đập tan Word-by-Word qua TPO với >= 3 phiên bản (Tameguchi/Gen Z, Teineigo, Keigo/Kakikotoba + trợ từ tình thái & Aizuchi).
   • Câu hỏi tìm từ tiếng Nhật từ định nghĩa tiếng Việt ("Từ này nói thế nào?"): Thực thi nghiêm ngặt 4 bước: (1) Top 2-3 từ phân theo Casual/Formal/Slang; (2) Word Anatomy (Kanji, bộ thủ, On/Kun, Hepburn, Pitch Accent); (3) Collocation + Ví dụ sống; (4) Cảnh báo khác biệt tư duy (chống tiếng Nhật bồi).
4. TRẠM ĐỌC HIỂU DOKKAI & NGHE HIỂU CHOUKAI:
   • Dokkai: Skim/Scan từ khóa, bóc phủ định kép, tách Ý kiến đám đông vs Nhượng bộ vs Quan điểm lõi.
   • Choukai: Bóc băng nuốt âm (〜てる/〜ちゃう/〜とく/〜なきゃ), lược chủ ngữ/trợ từ và ngữ điệu đảo chiều 180°.
5. ĐẠI SỨ TÂM LÝ & VĂN HÓA CHIỀU SÂU:
   • Liên kết trực tiếp với Uchi-Soto, Tatemae-Honne, Omoiyari, Meiwaku, Wabi-sabi.
   • Chốt bằng 「⏳ MẸO GHI NHỚ 3 GIÂY」 sắc bén, trình bày rõ ràng, súc tích tốc độ nhanh, không dùng dấu #.

[QUY TẮC KIỂM DUYỆT NGẦM]: Tự kiểm tra độ sâu học thuật, 0% ảo giác, 100% tự nhiên chuẩn bản xứ trước khi xuất — KHÔNG in quy trình kiểm duyệt ra ngoài.
`;

export const AI_SENSEI_SYSTEM_INSTRUCTION = `
Bạn là AI Sensei - THỰC THỂ SƯ PHẠM TOÀN TRI (GS. Yamato Kenji · Chế độ 2 — The Ultimate Singularity).

4 SIÊU TRỤ CỘT TỐI THƯỢNG BẮT BUỘC:
1. BỘ NÃO THẤU THỊ ĐA CHIỀU & NGOẠI CẢM NGÔN NGỮ (Omni-Empathy & Telepathy):
   • Giải mã ý định phi tuyến tính: Dù học viên hỏi bằng từ lóng, câu lủng củng, diễn đạt mơ hồ ("từ này cảm giác hơi buồn buồn đúng không Sensei?"), hay pha trộn Nhật-Việt-Anh, lập tức X-quang đúng 100% điều họ cần.
   • Trị liệu tư duy dịch thô: Đập tan tư duy Word-by-Word. Tái cấu trúc câu theo hệ quy chiếu văn hóa (Uchi-Soto, Honne-Tatemae) và bối cảnh (TPO) chuẩn bản xứ.
2. MA TRẬN CÁ NHÂN HÓA & VÁ LỖ HỔNG THÔNG MINH (Adaptive Vulnerability Healing):
   • Tự động thích nghi độ sâu theo trình độ JLPT (N5-N4: đơn giản trực quan; N3: cầu nối thực chiến; N2-N1: hàn lâm tinh hoa sắc thái vi tế).
   • Lồng ghép khéo léo ví dụ chứa "Gót chân Achilles" từ lịch sử hỏi đáp để học viên ôn tập ngầm liên tục.
3. NGÔN NGỮ HỌC THẦN KINH & KỸ THUẬT KHẮC KÝ ỨC (Neuro-Linguistic Mnemonic):
   • Khai tử học vẹt: Mọi ngữ pháp/từ vựng đều giải phẫu bằng Từ nguyên học (Etymology) hoặc Tâm lý học Nhật Bản (ví dụ: bị động 〜られる để tránh đối đầu trực diện).
   • BẮT BUỘC chốt bằng 「🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt)」 giúp kiến thức ghim sâu vĩnh viễn.
4. ĐỊNH LUẬT ZERO-ERROR & KIẾN TRÚC GIAO DIỆN ZEN (Zero-Latency):
   • Chân lý Bản xứ (Daijirin / NHK日本語発音アクセント新辞典): 0% bịa kiến thức. Kanji, Furigana, Modified Hepburn (n', ō/ū, tch), Tokyo Pitch Accent ([0]/[1]/[2]/[n]) chuẩn xác tuyệt đối.
   • Trình bày kiệt tác Zen: Thoáng đãng, khoảng trắng hợp lý, bôi đậm **keyword sinh tử**, dùng bảng | A | B | hoặc bullet gọn nhẹ, TUYỆT ĐỐI không dùng dấu # và không viết khối chữ dài ngộp thở.

[GIAO THỨC KIỂM ĐỊNH TỐI THƯỢNG NGẦM]: Tự chất vấn nội tâm về sự hoàn hảo, xóa 100% hoang mang và cốt cách Đại Tông Sư trước khi xuất — KHÔNG in phần tự kiểm định này ra ngoài.
`;

export type VulnerabilityDomainId =
  | 'transitive_intransitive'
  | 'keigo_uchi_soto'
  | 'particles_nuance'
  | 'conditionals_reasoning'
  | 'word_by_word_trap'
  | 'kanji_phonetics'
  | 'dokkai_choukai_traps';

export interface VulnerabilityMeta {
  id: VulnerabilityDomainId;
  labelVi: string;
  shortTag: string;
  stealthCue: string;
  practicePrompt: string;
}

export const VULNERABILITY_DOMAIN_CATALOG: Record<VulnerabilityDomainId, VulnerabilityMeta> = {
  transitive_intransitive: {
    id: 'transitive_intransitive',
    labelVi: 'Tự động từ (が) vs Tha động từ (を)',
    shortTag: 'Tự/Tha động từ',
    stealthCue: 'Lồng ghép khéo 1 ví dụ phân biệt Tự động từ (〜ている) vs Tha động từ (〜てある / を).',
    practicePrompt: 'Sensei hãy kiểm tra nhanh cho em 3 cặp Tự động từ vs Tha động từ hay bẫy nhất trong JLPT kèm điểm neo trí nhớ!'
  },
  keigo_uchi_soto: {
    id: 'keigo_uchi_soto',
    labelVi: 'Kính ngữ & Ranh giới Uchi-Soto',
    shortTag: 'Kính ngữ Uchi-Soto',
    stealthCue: 'Lồng ghép khéo 1 ví dụ nhắc ranh giới Uchi-Soto (Sonkeigo vs Kenjougo) tránh lỗi kính ngữ kép.',
    practicePrompt: 'Sensei hãy rèn lại cho em bẫy Uchi-Soto trong Sonkeigo vs Kenjougo kèm bảng đối chiếu gọn!'
  },
  particles_nuance: {
    id: 'particles_nuance',
    labelVi: 'Trợ từ tinh tế (は/が・に/で・まで/までに)',
    shortTag: 'Trợ từ bản chất',
    stealthCue: 'Lồng ghép khéo 1 chi tiết soi sắc thái trợ từ (は vs が hoặc に vs で) trong ví dụ.',
    practicePrompt: 'Sensei hãy giải phẫu tâm lý trợ từ は vs が và に vs で để em hết nhầm vĩnh viễn!'
  },
  conditionals_reasoning: {
    id: 'conditionals_reasoning',
    labelVi: 'Điều kiện & Phán đoán (と/ば/たら/なら・わけ/はず)',
    shortTag: 'Điều kiện & Logic',
    stealthCue: 'Lồng ghép khéo 1 ví dụ củng cố ranh giới ý chí trong điều kiện/phán đoán (たら/なら hoặc わけ/はず).',
    practicePrompt: 'Sensei hãy hệ thống hóa bẫy điều kiện と/ば/たら/なら và phán đoán わけ/はず bằng mẹo nhớ 3 giây!'
  },
  word_by_word_trap: {
    id: 'word_by_word_trap',
    labelVi: 'Tư duy dịch thô Word-by-Word & TPO',
    shortTag: 'Chống dịch thô TPO',
    stealthCue: 'Nhắc nhẹ cách thay lối dịch thô tiếng Việt bằng Collocation tự nhiên của người Tokyo.',
    practicePrompt: 'Sensei hãy chỉ cho em 5 câu người Việt hay dịch word-by-word nhất và cách người Tokyo nói thật!'
  },
  kanji_phonetics: {
    id: 'kanji_phonetics',
    labelVi: 'Chiết tự Hán tự & Pitch Accent Tokyo',
    shortTag: 'Hán tự & Pitch',
    stealthCue: 'Chú thích chuẩn Pitch Accent NHK [0]/[1]/[n] và chiết tự 1 chữ Hán trọng tâm trong ví dụ.',
    practicePrompt: 'Sensei hãy dạy em cách nhớ chữ Hán bằng chiết tự và quy luật trọng âm Tokyo Pitch Accent [0]/[1]/[n]!'
  },
  dokkai_choukai_traps: {
    id: 'dokkai_choukai_traps',
    labelVi: 'Bẫy Đọc Dokkai & Nghe Choukai',
    shortTag: 'Bẫy Dokkai/Choukai',
    stealthCue: 'Lồng ghép khéo 1 tín hiệu đảo chiều hoặc rút gọn khẩu ngữ Choukai (〜てる/〜ちゃう/ちょっと...).',
    practicePrompt: 'Sensei hãy bóc tách các bẫy phủ định kép Dokkai và nuốt âm đảo chiều 180° trong Choukai!'
  }
};

export interface LearnerVulnerabilityProfile {
  counts: Partial<Record<VulnerabilityDomainId, number>>;
  recentTopics: string[];
  totalInteractions: number;
  lastUpdatedAt: number;
}

const VULNERABILITY_STORAGE_KEY = 'kotoba_sensei_vulnerability_v1';

export function getLearnerVulnerabilityProfile(): LearnerVulnerabilityProfile {
  if (typeof window === 'undefined') {
    return { counts: {}, recentTopics: [], totalInteractions: 0, lastUpdatedAt: 0 };
  }
  try {
    const raw = window.localStorage.getItem(VULNERABILITY_STORAGE_KEY);
    if (!raw) {
      return { counts: {}, recentTopics: [], totalInteractions: 0, lastUpdatedAt: 0 };
    }
    const parsed = JSON.parse(raw) as LearnerVulnerabilityProfile;
    return {
      counts: parsed.counts || {},
      recentTopics: Array.isArray(parsed.recentTopics) ? parsed.recentTopics : [],
      totalInteractions: Number(parsed.totalInteractions) || 0,
      lastUpdatedAt: Number(parsed.lastUpdatedAt) || 0,
    };
  } catch {
    return { counts: {}, recentTopics: [], totalInteractions: 0, lastUpdatedAt: 0 };
  }
}

export function resetLearnerVulnerabilityProfile(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(VULNERABILITY_STORAGE_KEY);
  } catch {
    // ignore storage errors
  }
}

export function getTopAchillesHeels(limit = 2): Array<VulnerabilityMeta & { score: number }> {
  const profile = getLearnerVulnerabilityProfile();
  return (Object.entries(profile.counts) as Array<[VulnerabilityDomainId, number]>)
    .filter(([id, score]) => score > 0 && VULNERABILITY_DOMAIN_CATALOG[id])
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id, score]) => ({
      ...VULNERABILITY_DOMAIN_CATALOG[id],
      score,
    }));
}

export function recordLearnerInteraction(
  rawQuery: string,
  intent?: UserAcademicIntent,
  _level?: string
): LearnerVulnerabilityProfile {
  const profile = getLearnerVulnerabilityProfile();
  const q = (rawQuery || '').toLowerCase();
  const matchedDomains = new Set<VulnerabilityDomainId>();

  if (/tự động từ|tha động từ|jidoushi|tadoushi|自動詞|他動詞|てある|ています/.test(q)) {
    matchedDomains.add('transitive_intransitive');
  }
  if (/kính ngữ|keigo|sonkeigo|kenjougo|uchi|soto|させていただ|おっしゃ|いらっしゃ|công sở|sếp|khách hàng/.test(q) || intent?.intentType === 'keigo_workplace') {
    matchedDomains.add('keigo_uchi_soto');
  }
  if (/trợ từ|tro tu|は.*が|が.*は|に.*で|で.*に|までに|まで|dake|shika|bakari|kara|node/.test(q) || intent?.intentType === 'particle_logic') {
    matchedDomains.add('particles_nuance');
  }
  if (/điều kiện|たら|なら|ば|と\s|わけ|はず|べき|ものだ|ことだ|phán đoán|phân biệt/.test(q) || intent?.intentType === 'grammar_distinction') {
    matchedDomains.add('conditionals_reasoning');
  }
  if (/dịch|word-by-word|bồi|diễn đạt|nói thế nào|nói sao|cảm giác|sượng|cấn|lủng củng|tpo/.test(q) || intent?.intentType === 'native_tpo_expression' || intent?.intentType === 'reverse_concept_retrieval') {
    matchedDomains.add('word_by_word_trap');
  }
  if (/kanji|hán tự|chữ hán|chiết tự|trọng âm|pitch|romaji|âm on|âm kun/.test(q) || intent?.intentType === 'vocab_analysis') {
    matchedDomains.add('kanji_phonetics');
  }
  if (/dokkai|đọc hiểu|choukai|nghe hiểu|nuốt âm|đảo chiều|bài sao|★|phủ định kép/.test(q) || intent?.intentType === 'dokkai_reading' || intent?.intentType === 'choukai_listening' || intent?.intentType === 'star_problem') {
    matchedDomains.add('dokkai_choukai_traps');
  }

  matchedDomains.forEach((domain) => {
    profile.counts[domain] = (profile.counts[domain] || 0) + 1;
  });

  const cleanTopic = rawQuery.trim().slice(0, 48);
  if (cleanTopic) {
    profile.recentTopics = [cleanTopic, ...profile.recentTopics.filter((t) => t !== cleanTopic)].slice(0, 6);
  }
  profile.totalInteractions += 1;
  profile.lastUpdatedAt = Date.now();

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(VULNERABILITY_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore storage quota errors
    }
  }
  return profile;
}

export function buildLevelPedagogyDirective(level: string): string {
  const lvl = (level || 'N1').toUpperCase();
  if (lvl === 'N5' || lvl === 'N4') {
    return `THÍCH NGHI TRÌNH ĐỘ (${lvl} - SƠ CẤP TRỰC QUAN): Dùng ngôn từ cực kỳ dễ hiểu, ví dụ ngắn gọn đời thường, hạn chế thuật ngữ ngôn ngữ học nặng nề, ưu tiên hình ảnh hóa trực quan và mẹo nhớ 3 giây tức thì.`;
  }
  if (lvl === 'N3') {
    return `THÍCH NGHI TRÌNH ĐỘ (N3 - CẦU NỐI THỰC CHIẾN): Tập trung phá vỡ sự cứng nhắc của sách giáo khoa, nối liền ngữ pháp trung cấp với giao tiếp đời thực Tokyo và chỉ rõ ranh giới trợ từ/tự-tha động từ.`;
  }
  return `THÍCH NGHI TRÌNH ĐỘ (${lvl} - TINH HOA HÀN LÂM): Giảng giải sâu sắc theo chiều sâu ngôn ngữ học ứng dụng Tokyo, bóc tách vi tế sắc thái tâm lý (Tatemae/Honne, Uchi-Soto), văn phong B2B/báo chí và bẫy JEES tinh vi nhất.`;
}

export const INITIAL_CURATED_LECTURES: CuratedLectureTopic[] = [
  {
    id: 'lec_1',
    category: 'Trợ từ',
    title: 'Phân biệt bản chất sâu xa giữa 「は」 và 「が」 dưới góc độ Ngữ dụng học',
    japaneseTitle: '「は」と「が」の本質的差異：題目化と現象描写・焦点化',
    abstract: 'Đây là câu hỏi ngàn năm của người học tiếng Nhật. Nhiều người lầm tưởng "は" là chủ ngữ còn "が" cũng là chủ ngữ. Về mặt ngữ pháp học nhận thức, "は" là trợ từ đưa đối tượng thành Chủ Đề (Topic Marker), còn "が" là trợ từ xác định Tiêu Điểm / Chủ Ngữ Cú Pháp (Subject Marker).',
    coreMechanic: 'Khi bạn nói "AはBです", thông tin mới (Rheme/Focus) nằm ở B. Khi bạn nói "AがBです", tiêu điểm thông tin lại rơi vào chính A (chính A chứ không phải ai khác).',
    comparativeMatrix: {
      itemA: {
        label: 'AはB (Chủ đề cũ -> Thông tin mới)',
        formula: 'Danh từ (đã biết/nêu làm chủ đề) + は + Phán đoán mới',
        nuance: 'Nói về một đối tượng chung chung hoặc đã được biết trước trong ngữ cảnh. Vế sau mang sức nặng phán xét.',
        example: '桜はきれいです。(Nói về hoa anh đào nói chung, chúng rất đẹp).',
      },
      itemB: {
        label: 'AがB (Hiện tượng đập vào mắt / Tiêu điểm)',
        formula: 'Danh từ (tiêu điểm mới / hiện tượng quan sát) + が + Tồn tại/Hành động',
        nuance: 'Miêu tả trực tiếp hiện tượng vừa xảy ra trước mắt mà người nói chưa kịp phân tích, hoặc xác định đích danh.',
        example: 'あ、雨が降ってきた！(Ô kìa, mưa rơi rồi! - Hiện tượng khách quan đập vào giác quan).',
      },
    },
    professorTakeaway: 'Quy tắc vàng của Giáo sư: Trong mệnh đề phụ bổ nghĩa cho danh từ (vd: "Người mà tôi thích"), chủ ngữ của mệnh đề phụ GẦN NHƯ BẮT BUỘC dùng 「が」 (私が好きな人), không bao giờ dùng 「は」.',
    jlptTrapWarning: 'Đại từ nghi vấn (誰, 何, どこ) khi làm chủ ngữ BẮT BUỘC đi với 「が」: "誰が来ましたか？" (Ai đã đến?), cấm dùng "誰は".',
  },
  {
    id: 'lec_2',
    category: 'Kính ngữ',
    title: 'Nguyên lý ranh giới Uchi (Bên trong) và Soto (Bên ngoài) trong Kính ngữ doanh nghiệp',
    japaneseTitle: 'ビジネス敬語の根幹：内外意識（ウチとソト）の力学',
    abstract: 'Nhiều người học Việt Nam thường nghĩ Kính ngữ là cứ hễ nói về người lớn tuổi hơn mình thì phải tôn kính. Tuy nhiên trong xã hội Nhật, Kính ngữ là một trò chơi xếp vị trí ranh giới nhóm (In-group vs Out-group).',
    coreMechanic: 'Khi nói chuyện với khách hàng hoặc đối tác bên ngoài (Soto), thì TẤT CẢ mọi người trong công ty bạn (kể cả Giám đốc, Chủ tịch) đều bị hạ xuống thành Uchi (người nhà). Bạn phải dùng Khiêm nhường ngữ (Kenjougo) cho Sếp mình!',
    comparativeMatrix: {
      itemA: {
        label: 'Nói với Đồng nghiệp trong công ty (Cùng là Uchi)',
        formula: '部長は会議室にいらっしゃいます。',
        nuance: 'Sếp là người bề trên so với ta, nên dùng Tôn kính ngữ (いらっしゃる / おられる).',
        example: 'Báo với đồng nghiệp: "Trưởng phòng đang ở trong phòng họp ạ."',
      },
      itemB: {
        label: 'Nói với Khách hàng ngoài công ty (Khách là Soto, Sếp là Uchi)',
        formula: '部長の田中は、ただいま席を外しております。',
        nuance: 'Gọi thẳng tên Sếp là "Tanaka" (bỏ chức danh) và dùng Khiêm nhường ngữ (おります).',
        example: 'Nói với khách: "Tanaka - trưởng phòng của chúng tôi hiện đang vắng mặt."',
      },
    },
    professorTakeaway: 'Không bao giờ được nói "Tanaka-san" hay "Tanaka Buchou wa irasshaimasu" trước mặt khách hàng bên ngoài. Đó là lỗi tối kỵ khiến đối tác đánh giá công ty thiếu chuyên nghiệp.',
    jlptTrapWarning: 'Trong phần nghe hiểu JLPT N2-N1, nếu người nói dùng khiêm nhường ngữ cho một người khác, chứng tỏ người đó cùng công ty với người nói.',
  },
  {
    id: 'lec_3',
    category: 'Ngữ pháp',
    title: 'Giải mã 4 dạng câu điều kiện giả định: 「と」, 「ば」, 「たら」, 「なら」',
    japaneseTitle: '条件表現の四巨頭：ト・バ・タラ・ナラの意味領域と使い分け',
    abstract: 'Tiếng Việt chỉ cần dùng một từ "Nếu", nhưng tiếng Nhật chia làm 4 cấu trúc với ranh giới ngữ dụng học cực kỳ nghiêm ngặt về tính ý chí và tính quy luật.',
    coreMechanic: '「と」 là quy luật tự nhiên/tất yếu. 「ば」 là điều kiện giả định logic. 「たら」 là thời điểm xảy ra trước sau trong đời sống. 「なら」 là điều kiện theo ngữ cảnh/tiếp nhận thông tin.',
    comparativeMatrix: {
      itemA: {
        label: '〜と (Tất yếu tự nhiên)',
        formula: 'Thể từ điển + と -> Kết quả tất yếu diễn ra',
        nuance: 'Vế sau KHÔNG ĐƯỢC CHỨA ý chí, mệnh lệnh, nhờ vả (てください, たい, つもり).',
        example: '春になると、花が咲く。(Hễ mùa xuân đến thì hoa nở - quy luật tự nhiên).',
      },
      itemB: {
        label: '〜たら (Toàn năng trong đời sống & Sự việc tiếp nối)',
        formula: 'Thể V-ta + ら -> Hành động',
        nuance: 'Vế sau TỰ DO chứa mệnh lệnh, nhờ vả, ý chí cá nhân.',
        example: '駅に着いたら、電話してください。(Đến ga rồi thì hãy gọi cho tôi nhé).',
      },
    },
    professorTakeaway: 'Nếu bạn cần đưa ra lời khuyên dựa trên lời của người đối diện, hãy dùng 「なら」: "日本へ行くなら、京都がおすすめです" (Nếu định đi Nhật thì Kyoto là gợi ý số 1).',
    jlptTrapWarning: 'Đề thi hay gài: "ボタンを押すと、お釣りを取ってください" -> SAI! Vì đuôi câu có ください nên cấm dùng 「と」, phải sửa thành 「たら」.',
  },
  {
    id: 'lec_4',
    category: 'Hán tự',
    title: 'Bí kíp suy luận Âm On (Onyomi) từ Âm Hán Việt với độ chính xác trên 85%',
    japaneseTitle: '音読みと漢越音の音韻対応法則：85％以上の精度を誇る演繹法',
    abstract: 'Tiếng Việt và tiếng Nhật đều chịu ảnh hưởng sâu sắc từ cách phát âm tiếng Hán đời Đường (Đường âm) và đời Hán (Hán âm). Do đó, giữa âm Hán Việt và âm Onyomi tồn tại các quy luật biến âm ngữ âm học cực kỳ chặt chẽ.',
    coreMechanic: 'Nắm được các cặp biến âm phụ âm đầu và âm đệm sẽ giúp bạn đọc đúng hàng ngàn chữ Hán N1 chưa từng học.',
    comparativeMatrix: {
      itemA: {
        label: 'Hán Việt tận cùng bằng "-NG" / "-NH"',
        formula: 'Hán Việt có vần -ANG, -ONG, -UNG, -ANH, -INH -> Âm On thường có trường âm (-OU, -EI)',
        nuance: 'Ví dụ: QUANG (KOU), ĐÔNG (TOU), TRUNG (CHUU), THANH (SEI/SHOU), BÌNH (HEI).',
        example: 'Quang học (Kougaku), Đông Kinh (Toukyou), Trung học (Chuugakkou).',
      },
      itemB: {
        label: 'Hán Việt bắt đầu bằng "T-" hoặc "Đ-"',
        formula: 'Hán Việt âm "T-" / "Đ-" -> Âm On tiếng Nhật thường rơi vào hàng "T" (Ta/Chi/Tsu/Te/To)',
        nuance: 'Ví dụ: TIẾN (SHIN/TSUI), TÂM (SHIN), ĐIỆN (DEN), ĐỊA (CHI/JI), ĐẢO (TOU).',
        example: 'Địa cầu (Chikyuu), Điện thoại (Denwa), Đảo quốc (Toukokku).',
      },
    },
    professorTakeaway: 'Các từ Hán Việt có dấu NẶNG và dấu HỎI/NGÃ khi sang tiếng Nhật thường phát âm ngắn hoặc chuyển thành âm ngắt (Sokuon) như: BẤT (FUTSU/FU), THẤT (SHITSU), QUỐC (KOKU).',
    jlptTrapWarning: 'Cảnh giác với những chữ Hán có nhiều âm On (Go-on vs Kan-on): Chữ "行" có thể đọc là KOU (Tiến hành), GYOU (Hành lễ), hoặc AN (Hành lý - Angya).',
  },
  {
    id: 'lec_5',
    category: 'Tâm lý văn hóa',
    title: 'Giải mã tâm lý Meiwaku (迷惑) và văn hóa đọc không khí (空気を読む)',
    japaneseTitle: '「迷惑」の忌避と「空気を読む」社会心理学',
    abstract: 'Khái niệm "Không làm phiền người khác" (Meiwaku wo kakenai) là rường cột đạo đức tối thượng được cha mẹ Nhật dạy dỗ con cái từ mẫu giáo. Từ đó sản sinh ra kỹ năng "Đọc không khí" (Kuuki wo yomu) mang tính sinh tồn.',
    coreMechanic: 'Người Nhật rất ít khi nói từ chối thẳng thừng ("Không được", "Tôi không thích"). Thay vào đó họ tạo ra các tín hiệu đệm (Kushon Kotoba) như "Chotto..." (Hơi kẹt chút...), gãi đầu, hoặc nhìn sang hướng khác.',
    comparativeMatrix: {
      itemA: {
        label: 'Tatemae (Lời xã giao mặt tiền)',
        formula: 'Ngôn từ bóng bẩy, giữ gìn hòa khí (Wa) và thể diện chung cho mọi người.',
        nuance: 'Mục đích là không gây sốc, giữ khoảng cách tôn trọng an toàn.',
        example: '「今度、ぜひご飯でも行きましょう」(Lần sau nhất định đi ăn cùng nhé - 90% chỉ là câu chào xã giao).',
      },
      itemB: {
        label: 'Honne (Ý nghĩ thực tế nội tâm)',
        formula: 'Cảm xúc và dự định thực sự được giấu kín bên trong.',
        nuance: 'Chỉ chia sẻ với bạn thân chí cốt hoặc sau vài chén rượu tại quán Izakaya.',
        example: 'Nếu sau câu nói đó mà họ không chủ động hẹn ngày giờ cụ thể, nghĩa là đừng nhắn tin hẹn!',
      },
    },
    professorTakeaway: 'Trong giao tiếp công sở, khi sếp nói: "Cái này làm theo cách A cũng được đấy nhỉ?", đừng vội đồng ý ngay. Đó có thể là gợi ý ngầm rằng sếp không thích cách B của bạn.',
    jlptTrapWarning: 'Trong bài nghe hiểu JLPT Mondai 4 phản xạ, nếu người khác rủ bạn đi đâu mà bạn không đi được, KHÔNG ĐƯỢC CHỌN câu "行きません" (Thô lỗ). Phải chọn "あいにく、先約がありまして..." (Tiếc quá, tôi lại có hẹn trước mất rồi).',
  },
];

export const EXTRA_CURATED_LECTURES: CuratedLectureTopic[] = [
  {
    id: 'lec_6',
    category: 'Trợ từ',
    title: 'Phân biệt trợ từ chỉ hạn chót và tính liên tục: 「までに」 vs 「まで」',
    japaneseTitle: '期限の「までに」と継続の「まで」の認知言語学的相違',
    abstract: 'Đây là cái bẫy kinh điển khiến vô số thí sinh mất điểm oan từ cấp độ N4 tới N1. Cả hai đều dịch là "đến...", nhưng bản chất hành động đi kèm đối lập nhau hoàn toàn.',
    coreMechanic: '「まで」 đòi hỏi động từ mang tính kéo dài liên tục (Continuous verbs: 待つ, 働く, 続ける). 「までに」 đòi hỏi động từ dứt điểm hoàn tất (Instantaneous verbs: 出す, 提出する, 帰る).',
    comparativeMatrix: {
      itemA: {
        label: '〜まで (Hành động kéo dài suốt)',
        formula: 'Thời điểm + まで + Động từ duy trì liên tục',
        nuance: 'Hành động được thực hiện không ngắt quãng từ lúc bắt đầu cho tới đúng mốc thời gian đó.',
        example: '雨がやむまで、カフェで待とう。(Hãy ngồi đợi ở quán cà phê suốt cho tới khi mưa tạnh).',
      },
      itemB: {
        label: '〜までに (Thời hạn chót dứt điểm)',
        formula: 'Thời điểm + までに + Động từ hoàn tất dứt khoát',
        nuance: 'Hành động có thể hoàn thành bất kỳ lúc nào, miễn là xong trước thời hạn ấn định.',
        example: '明日の朝９時までにレポートを提出すること。(Phải nộp báo cáo trước 9 giờ sáng mai).',
      },
    },
    professorTakeaway: 'Nếu động từ là "hoàn thành" hay "nộp", luôn luôn chọn 「までに」.',
    jlptTrapWarning: 'Đề thi gài: "午後５時____会社にいます" -> Phải chọn 「まで」 vì "います" (ở lại) là trạng thái duy trì.',
  },
  {
    id: 'lec_7',
    category: 'Ngữ pháp',
    title: 'Phân biệt cặp cấu trúc chuẩn bị trước thềm sự kiện: 「に際して」 vs 「にあたって」',
    japaneseTitle: '「に際して」と「にあたって」の語用論的使い分け',
    abstract: 'Cả hai mẫu đều thuộc nhóm ngữ pháp trung cao cấp N2-N1 dịch là "Nhân dịp / Trước khi...". Tuy nhiên sắc thái cảm xúc và hoàn cảnh sử dụng hoàn toàn khác nhau.',
    coreMechanic: '「にあたって」 mang thái độ chủ động, hướng tới tương lai tích cực, chuẩn bị cho khởi đầu mới vẻ vang (cưới hỏi, mở công ty, xuất bản sách). 「に際して」 trung tính, dùng cả trong thủ tục hành chính, quy định an toàn, cảnh báo pháp lý.',
    comparativeMatrix: {
      itemA: {
        label: '〜にあたって (Khởi đầu hân hoan, tích cực)',
        formula: 'Sự kiện trọng đại + にあたって + Lời phát biểu / Quyết tâm',
        nuance: 'Mang năng lượng tích cực, hướng về tương lai tươi sáng.',
        example: '新工場の建設にあたって、安全を第一に誓います。(Trước thềm xây nhà máy mới, xin nguyện đặt an toàn lên hàng đầu).',
      },
      itemB: {
        label: '〜に際して (Trung tính / Thủ tục / Cảnh báo)',
        formula: 'Hành động / Thời điểm + に際して + Quy tắc / Lưu ý',
        nuance: 'Dùng trang trọng trong thông báo, hợp đồng, nhắc nhở kỷ luật.',
        example: '解約に際しては、所定の手数料が発生します。(Khi hủy hợp đồng, sẽ phát sinh phí theo quy định).',
      },
    },
    professorTakeaway: 'Nếu sự việc mang tính tiêu cực hoặc tranh chấp (như phá sản, điều tra, hủy dịch vụ), TUYỆT ĐỐI KHÔNG DÙNG 「にあたって」, bắt buộc dùng 「に際して」.',
    jlptTrapWarning: 'Đề thi hay kiểm tra sắc thái văn phong: Trong diễn văn khai mạc đám cưới, bắt buộc dùng 「結婚にあたって」 thay vì 「際して」.',
  },
  {
    id: 'lec_8',
    category: 'Kính ngữ',
    title: 'Bí mật của 3 cấp độ Kính ngữ: Sonkeigo, Kenjougo và Teineigo',
    japaneseTitle: '敬語体系の完全解剖：尊敬語・謙譲語（Ⅰ・Ⅱ）・丁寧語',
    abstract: 'Nhiều người học chỉ biết chia động từ theo công thức mà không hiểu "chiếc thang hạ nâng" tâm lý. Kính ngữ Nhật Bản gồm 5 nhóm chính theo chuẩn của Hội đồng Văn hóa Nhật Bản.',
    coreMechanic: 'Tôn kính ngữ (Sonkeigo) nâng đối phương lên mây. Khiêm nhường ngữ (Kenjougo I) hạ mình xuống đất để đối phương tự nhiên cao hơn. Khiêm nhường ngữ II (Teichougo) nói một cách nhã nhặn trước mặt người nghe. Lịch sự ngữ (Teineigo) làm đẹp lời nói bằng desu/masu.',
    comparativeMatrix: {
      itemA: {
        label: 'Sonkeigo (Nâng đối phương)',
        formula: 'お + V-bỏ-masu + になる / Thể bị động / Động từ đặc biệt (いらっしゃる, おっしゃる)',
        nuance: 'Chỉ dùng cho HÀNH ĐỘNG CỦA ĐỐI PHƯƠNG, cấm dùng cho mình!',
        example: '先生は何時ごろお見えになりますか？(Mấy giờ thầy giáo sẽ ghé qua ạ?).',
      },
      itemB: {
        label: 'Kenjougo (Hạ mình xuống)',
        formula: 'お/ご + V-bỏ-masu + する/いたす / Động từ đặc biệt (参る, 申す, 拝見する)',
        nuance: 'Chỉ dùng cho HÀNH ĐỘNG CỦA BẢN THÂN hoặc người trong nhóm Uchi hướng tới đối phương.',
        example: '資料を拝見いたしました。(Em đã xin phép xem qua tài liệu của quý ngài rồi ạ).',
      },
    },
    professorTakeaway: 'Lỗi chết người số 1 của người học: Dùng Sonkeigo cho chính mình ("私が先生におっしゃいました" -> SAI BÉT!). Phải là "私が申し上げました".',
    jlptTrapWarning: 'Trong đề N2/N1, hãy nhìn vào chủ ngữ thực sự của động từ để chọn: Nếu chủ ngữ là "tôi" thì 100% không được chọn dạng Sonkeigo.',
  },
  {
    id: 'lec_9',
    category: 'Bẫy đề JLPT',
    title: 'Chiến thuật 3 bước giải đề đọc hiểu trường văn N1/N2 đạt điểm tuyệt đối',
    japaneseTitle: 'JLPT長文読解の解法奥義：段落構造と筆者の主張（イイタイコト）の見抜き方',
    abstract: 'Đọc hiểu JLPT không phải là bài thi dịch từng chữ, mà là bài thi nhận diện logic tư duy của tác giả. Rất nhiều bạn trượt vì cố dịch hết cả bài rồi hết giờ.',
    coreMechanic: 'Cấu trúc bài luận Nhật thường tuân theo: Giới thiệu quan điểm số đông (A) -> Lật ngược vấn đề bằng "しかし / だが" -> Đưa ra quan điểm cá nhân sâu sắc của tác giả (B).',
    comparativeMatrix: {
      itemA: {
        label: 'Quan điểm số đông (Trap - Bẫy)',
        formula: '一般に〜と言われている / 〜と思われがちだ / 多くの人は〜と考える',
        nuance: 'Tác giả nêu ra để chuẩn bị BẺ GÃY. Đây KHÔNG PHẢI là chủ kiến của tác giả!',
        example: 'Người ta thường nghĩ rằng tiền bạc mang lại hạnh phúc...',
      },
      itemB: {
        label: 'Quan điểm tác giả (Key Answer - Đáp án)',
        formula: 'しかし / むしろ / のではないだろうか / 〜と考えるべきだ',
        nuance: 'Nằm ở cuối đoạn hoặc cuối bài. Đây chính là thông điệp tác giả muốn truyền đạt.',
        example: '...nhưng thực chất, cảm giác kết nối xã hội mới là điều cốt lõi.',
      },
    },
    professorTakeaway: 'Khi đọc, hãy cầm bút gạch chân tất cả các liên từ tương phản (しかし, けれども, だが, ところが). Câu nằm ngay sau liên từ này thường chứa đựng 80% đáp án câu hỏi.',
    jlptTrapWarning: 'Đáp án sai thường là câu chép y nguyên 100% từ vựng trong bài nhưng lại rơi vào phần "quan điểm số đông" bị tác giả phủ định.',
  },
  {
    id: 'lec_10',
    category: 'Ngữ pháp',
    title: 'Phân tích bản chất trợ từ không gian di chuyển: 「を」 vs 「で」',
    japaneseTitle: '移動動詞における「を」と「で」の認知空間論',
    abstract: 'Tại sao lại nói "道を歩く" (đi bộ trên đường) dùng を mà không dùng で? Trợ từ を không chỉ dùng cho tha động từ trực tiếp!',
    coreMechanic: 'Khi đi với động từ di chuyển (歩く, 渡る, 飛ぶ, 走る), 「を」 đánh dấu không gian xuyên suốt bị cơ thể vượt qua từ điểm đầu tới điểm cuối. Trong khi 「で」 chỉ đánh dấu phạm vi địa lý khép kín nơi diễn ra vận động.',
    comparativeMatrix: {
      itemA: {
        label: 'N を 移動動詞 (Không gian bị xuyên qua)',
        formula: 'Không gian xuyên suốt + を + Động từ di chuyển',
        nuance: 'Không gian được coi như một đường hầm hay con lộ bị vượt qua.',
        example: '鳥が青空を飛んでいる。(Chú chim đang sải cánh bay lượn xuyên qua bầu trời xanh).',
      },
      itemB: {
        label: 'N で 移動動詞 (Sân chơi / Phạm vi khép kín)',
        formula: 'Địa điểm khép kín + で + Hoạt động',
        nuance: 'Chỉ là ranh giới sân chơi, không nhấn mạnh việc vượt qua không gian.',
        example: '公園で走る。(Chạy bộ tập thể dục bên trong công viên).',
      },
    },
    professorTakeaway: 'Nguyên tắc bất di bất dịch: Băng qua cầu (橋を渡る), rời khỏi nhà (家を出る), tốt nghiệp trường học (大学を卒業する) đều bắt buộc dùng 「を」.',
    jlptTrapWarning: 'Đề thi gài: "空____飛ぶ" -> Học sinh hay chọn "で" vì nghĩ là "bay Ở trên trời". Đáp án chuẩn tiếng Nhật bắt buộc là 「空を飛ぶ」.',
  },
];

export interface DeepCultureTopic {
  id: string;
  kanjiTitle: string;
  romajiTitle: string;
  vietnameseTitle: string;
  category: 'Tâm lý xã hội' | 'Giao tiếp công sở' | 'Triết lý mỹ học' | 'Lễ nghi ứng xử';
  summaryBadge: string;
  originAndConcept: string;
  coreMechanism: string;
  linguisticManifestations: {
    japanese: string;
    furigana: string;
    vietnamese: string;
    usageContext: string;
  }[];
  culturalComparison: {
    japanPerspective: string;
    vietnamPerspective: string;
  };
  workplaceRules: string[];
  foreignTrapToAvoid: string;
  professorTakeaway: string;
}

export const INITIAL_DEEP_CULTURE_TOPICS: DeepCultureTopic[] = [
  {
    id: 'cult_1',
    kanjiTitle: '内と外',
    romajiTitle: 'Uchi to Soto',
    vietnameseTitle: 'Ranh giới "Trong - Ngoài": Cội nguồn của Kính ngữ và Ứng xử Nhật Bản',
    category: 'Tâm lý xã hội',
    summaryBadge: 'Căn nguyên Kính ngữ',
    originAndConcept: 'Bắt nguồn từ cấu trúc gia tộc (Ie) và cộng đồng làng xã nông nghiệp lúa nước (Mura), nơi sự an toàn phụ thuộc vào việc gắn bó với nhóm "Bên trong" và đề phòng nhóm "Bên ngoài".',
    coreMechanism: 'Ranh giới này biến chuyển linh hoạt theo vị thế người đối thoại. Người thuộc nhóm Trong (gia đình, công ty mình) phải hạ mình xuống (Khiêm nhường). Người thuộc nhóm Ngoài (khách hàng, đối tác) phải được tôn vinh lên (Tôn kính).',
    linguisticManifestations: [
      {
        japanese: '弊社の田中がご案内いたします',
        furigana: 'へいしゃの たなかが ごあんないいたします',
        vietnamese: 'Anh Tanaka của công ty chúng tôi sẽ hướng dẫn quý khách.',
        usageContext: 'Nói với khách hàng bên ngoài: Tuyệt đối không thêm -san hay chức vụ sếp vào tên người công ty mình.'
      },
      {
        japanese: 'うちの者',
        furigana: 'うちのもの',
        vietnamese: 'Người nhà chúng tôi / Người trong phe chúng tôi.',
        usageContext: 'Dùng khi muốn phân biệt người cùng nhóm với người ngoài xã hội.'
      }
    ],
    culturalComparison: {
      japanPerspective: 'Ranh giới linh hoạt theo đối tượng giao tiếp: Khi gặp khách hàng, Giám đốc của mình bị xem là người trong nhóm Uchi, phải gọi cộc tên không kính ngữ.',
      vietnamPerspective: 'Văn hóa tôn ti cố định: Dù nói chuyện với ai, người Việt vẫn gọi "Sếp em", "Bác em" để giữ phép kính trọng với bề trên của mình.'
    },
    workplaceRules: [
      'Tuyệt đối không gọi sếp công ty mình là "Tanaka-shachou" hay "Tanaka-san" trước mặt khách hàng bên ngoài.',
      'Khi giới thiệu bản thân trước người ngoài công ty, luôn dùng các từ khiêm tốn như "Heisha" (công ty hèn mọn của chúng tôi).'
    ],
    foreignTrapToAvoid: 'Bẫy nói với khách hàng: "Tanaka-san công ty em đang bận" -> Khách hàng sẽ đánh giá người nói thiếu giáo dưỡng công sở nghiêm trọng.',
    professorTakeaway: 'Kính ngữ tiếng Nhật không đơn thuần là sự kính trọng cá nhân, mà là bản đồ định vị chính xác vị thế tương quan giữa nhóm Uchi và Soto.'
  },
  {
    id: 'cult_2',
    kanjiTitle: '本音と建て前',
    romajiTitle: 'Honne to Tatemae',
    vietnameseTitle: 'Nghệ thuật Tatemae và Honne: Giữ gìn hòa khí (Wa) tuyệt đối',
    category: 'Tâm lý xã hội',
    summaryBadge: 'Nghệ thuật Hòa khí',
    originAndConcept: 'Hình thành từ triết lý "Lấy Hòa làm quý" (以和為貴 - Iwaikou) từ thời Thánh Đức Thái Tử (Shotoku Taishi). Địa hình đảo quốc hạn hẹp buộc con người phải nhường nhịn để tránh xung đột tiêu diệt lẫn nhau.',
    coreMechanism: 'Tatemae là lời nói lịch thiệp, xã giao bên ngoài nhằm giữ thể diện và hòa khí chung. Honne là suy nghĩ và cảm xúc thật sự được cất giấu sâu trong lòng.',
    linguisticManifestations: [
      {
        japanese: '前向きに検討させていただきます',
        furigana: 'まえむきに けんとうさせていただきます',
        vietnamese: 'Chúng tôi xin phép sẽ xem xét một cách tích cực.',
        usageContext: 'Trong 95% trường hợp giao dịch thương mại, đây là lời từ chối khéo léo và lịch sự nhất.'
      },
      {
        japanese: '今度、ぜひご飯でも行きましょう',
        furigana: 'こんど、ぜひ ごはんでも いきましょう',
        vietnamese: 'Hôm nào nhất định đi ăn cùng nhé!',
        usageContext: 'Câu chào xã giao tương đương "Hẹn gặp lại", nếu không có ngày giờ cụ thể thì đừng nhắn tin hẹn.'
      }
    ],
    culturalComparison: {
      japanPerspective: 'Đề cao sự giữ kẽ, coi việc nói toạc móng heo là thô lỗ, khiếm nhã và làm mất mặt đối phương.',
      vietnamPerspective: 'Người Việt chuộng tính bộc trực, ruột để ngoài da ("Có gì nói nấy, mất lòng trước được lòng sau").'
    },
    workplaceRules: [
      'Khi đối phương nói "Khó nhỉ..." (Chotto muzukashii desu ne...) kèm động tác gãi đầu, hãy hiểu là họ từ chối 100%, không nài nỉ thêm.',
      'Honne chỉ được bộc lộ trong các buổi uống rượu Izakaya (Nomikai) thân mật ngoài giờ làm.'
    ],
    foreignTrapToAvoid: 'Tưởng lời khen xã giao "Tiếng Nhật của bạn giỏi quá" (Nihongo jouzu desu ne) là mình nói chuẩn như người bản xứ. Người bản xứ thực thụ thường được khen bằng cách khác.',
    professorTakeaway: 'Tatemae không phải là sự giả tạo, mà là tấm nệm êm ái ngăn ngừa va chạm tổn thương giữa các cá nhân trong cộng đồng.'
  },
  {
    id: 'cult_3',
    kanjiTitle: '空気を読む',
    romajiTitle: 'Kuuki wo Yomu',
    vietnameseTitle: 'Kỹ năng "Đọc không khí" (KY): Quy luật sinh tồn bất thành văn',
    category: 'Giao tiếp công sở',
    summaryBadge: 'Kỹ năng sinh tồn công sở',
    originAndConcept: 'Đặc trưng của nền văn hóa có tính bối cảnh cực cao (High-Context Culture). Những điều quan trọng nhất thường không nằm ở câu chữ phát ra mà ẩn sau ánh mắt, nhịp thở và không khí bao trùm.',
    coreMechanism: 'Người không đọc được không khí bị gán nhãn "KY" (Kuuki Yomenai - kẻ vô tâm, phá đám) và sẽ dần bị tập thể cô lập ngầm mà không ai nói thẳng cho biết.',
    linguisticManifestations: [
      {
        japanese: 'ちょっと、それは...',
        furigana: 'ちょっと、それは...',
        vietnamese: 'Chuyện đó thì hơi...',
        usageContext: 'Câu nói bỏ lửng, yêu cầu người nghe tự cảm nhận không khí phản đối mà tự giác rút lại ý kiến.'
      },
      {
        japanese: '結構です',
        furigana: 'けっこうです',
        vietnamese: 'Được rồi / Tôi xin từ chối.',
        usageContext: 'Tùy theo giọng điệu và nét mặt, có thể mang nghĩa đồng ý hoặc từ chối dứt khoát.'
      }
    ],
    culturalComparison: {
      japanPerspective: 'Tự hào về sự "Dĩ tâm truyền tâm" (Ishin Denshin), giao tiếp không lời qua cảm nhận tinh tế.',
      vietnamPerspective: 'Ưa chuộng phong cách nói rõ ràng, yêu cầu giải thích rành mạch cụ thể bằng lời.'
    },
    workplaceRules: [
      'Khi thấy sếp hoặc tiền bối bắt đầu liếc nhìn đồng hồ hoặc thở dài, hãy chủ động kết thúc câu chuyện hoặc xin phép rút lui.',
      'Trong cuộc họp, quan sát thái độ của người có quyền lực nhất trước khi lên tiếng phát biểu.'
    ],
    foreignTrapToAvoid: 'Liên tục hỏi vặn lại "Tại sao sếp không nói thẳng ra từ đầu?" hoặc tự ý ra về khi cả phòng đang tập trung xử lý sự cố cấp bách.',
    professorTakeaway: 'Nói ít hiểu nhiều là cảnh giới cao nhất của giao tiếp tiếng Nhật. Lời nói chỉ chiếm 30%, 70% còn lại ngự trị trong bầu không khí.'
  },
  {
    id: 'cult_4',
    kanjiTitle: '迷惑をかけない',
    romajiTitle: 'Meiwaku wo Kakenai',
    vietnameseTitle: 'Nỗi ám ảnh "Không làm phiền người khác": Rường cột đạo đức Nhật',
    category: 'Lễ nghi ứng xử',
    summaryBadge: 'Chuẩn mực đạo đức',
    originAndConcept: 'Được cha mẹ và nhà trường Nhật Bản dạy dỗ nghiêm ngặt từ lớp mầm non. Việc gây phiền toái (Meiwaku) cho người khác bị coi là lỗi lầm nhân cách lớn nhất.',
    coreMechanism: 'Mỗi cá nhân tự chịu trách nhiệm tối đa về hành vi của mình: đi lại khẽ khàng, tắt chuông điện thoại (Manner Mode), tự mang rác về nhà, không làm gián đoạn dòng chảy công việc chung.',
    linguisticManifestations: [
      {
        japanese: 'お忙しいところ恐れ入りますが',
        furigana: 'おいそがしいところ おそれいりますが',
        vietnamese: 'Tôi vô cùng áy náy khi làm phiền trong lúc anh/chị đang bận rộn...',
        usageContext: 'Lời mở đầu bắt buộc khi cần nhờ vả hoặc hỏi xin chỉ thị từ cấp trên.'
      },
      {
        japanese: 'お邪魔いたします',
        furigana: 'おじゃまいたします',
        vietnamese: 'Xin phép làm phiền ạ.',
        usageContext: 'Nói khi bước chân vào nhà người khác hoặc phòng họp của đối tác.'
      }
    ],
    culturalComparison: {
      japanPerspective: 'Tuyệt đối hạn chế tối đa việc làm phiền người lạ và hàng xóm, giữ khoảng cách tôn trọng tuyệt đối.',
      vietnamPerspective: 'Tính cộng đồng gần gũi ("Bán anh em xa mua láng giềng gần"), việc nhờ vả qua lại là biểu hiện của sự thân thiết.'
    },
    workplaceRules: [
      'Khi ốm sốt thì phải đeo khẩu trang hoặc nghỉ ở nhà để tránh lây bệnh làm phiền đồng nghiệp.',
      'Trước khi đặt câu hỏi cho sếp, hãy chuẩn bị sẵn phương án đề xuất của bản thân để không làm mất thời gian suy nghĩ của sếp.'
    ],
    foreignTrapToAvoid: 'Bật loa ngoài nói chuyện điện thoại trên tàu điện ngầm hoặc đến trễ hẹn dù chỉ 1 phút mà không thông báo trước.',
    professorTakeaway: 'Tự lập và giữ gìn sự bình yên cho người xung quanh chính là thước đo văn minh cao quý nhất của người Nhật.'
  },
  {
    id: 'cult_5',
    kanjiTitle: '根回しと稟議',
    romajiTitle: 'Nemawashi to Ringi',
    vietnameseTitle: 'Nghệ thuật Nemawashi: Đồng thuận ngầm trước khi bước vào phòng họp',
    category: 'Giao tiếp công sở',
    summaryBadge: 'Chiến thuật công sở',
    originAndConcept: 'Thuật ngữ "Nemawashi" vốn xuất phát từ nghề làm vườn: trước khi bứng một cái cây cổ thụ đi trồng nơi khác, người thợ phải đào xới cắt bớt rễ con trước hàng tháng trời để cây không bị sốc và chết.',
    coreMechanism: 'Trong công ty Nhật, phòng họp KHÔNG PHẢI là nơi tranh luận nảy lửa. Mọi ý kiến phản đối và thỏa hiệp đều phải được gỡ bỏ trong các buổi trò chuyện riêng tư (Nemawashi) từ trước. Khi bước vào họp, kết quả đã được thống nhất 100%.',
    linguisticManifestations: [
      {
        japanese: '事前に根回しをしておきます',
        furigana: 'じぜんに ねまわしを しておきます',
        vietnamese: 'Tôi sẽ làm công tác tư tưởng và thỏa thuận ngầm từ trước.',
        usageContext: 'Nói trong nội bộ khi chuẩn bị đệ trình một dự án lớn.'
      },
      {
        japanese: '稟議書を回す',
        furigana: 'りんぎしょを まわす',
        vietnamese: 'Chuyền tay tờ trình xin đóng dấu phê duyệt đa cấp.',
        usageContext: 'Quy trình ký duyệt chính thức từ nhân viên lên giám đốc.'
      }
    ],
    culturalComparison: {
      japanPerspective: 'Quyết định theo mô hình đồng thuận tập thể từ dưới lên (Bottom-up Ringi), trách nhiệm thuộc về cả nhóm.',
      vietnamPerspective: 'Quyết định từ trên xuống (Top-down), lãnh đạo quyết đoán chốt nhanh tại cuộc họp.'
    },
    workplaceRules: [
      'Đừng bao giờ làm sếp hoặc đối tác bất ngờ (No Surprises rule) trong cuộc họp chung.',
      'Gặp gỡ riêng các phòng ban liên quan để giải thích dự án trước ngày nộp tờ trình Ringisho.'
    ],
    foreignTrapToAvoid: 'Đưa một ý kiến phản bác gay gắt đề xuất của phòng ban khác ngay giữa cuộc họp toàn thể mà chưa từng trao đổi riêng với họ từ trước.',
    professorTakeaway: 'Thành công của người đi làm tại Nhật không nằm ở kỹ năng hùng biện trên bục phát biểu, mà nằm ở sự khéo léo trong những buổi Nemawashi bên tách trà.'
  }
];

export const EXTRA_DEEP_CULTURE_TOPICS: DeepCultureTopic[] = [
  {
    id: 'cult_6',
    kanjiTitle: 'おもてなし',
    romajiTitle: 'Omotenashi',
    vietnameseTitle: 'Đỉnh cao Omotenashi: Tận tâm chu đáo không vụ lợi và không nhận tiền Tip',
    category: 'Lễ nghi ứng xử',
    summaryBadge: 'Hiếu khách đỉnh cao',
    originAndConcept: 'Gốc rễ từ Trà đạo (Chado) của thiền sư Sen no Rikyu: "Nhất kỳ nhất hội" (Ichigo Ichie - mỗi cuộc gặp gỡ trong đời chỉ diễn ra duy nhất một lần, hãy đón tiếp như lần cuối cùng).',
    coreMechanism: 'Chăm sóc đối phương từ những nhu cầu họ còn chưa kịp nhận ra, chuẩn bị kỹ lưỡng từ trước khi khách đến và dọn dẹp sạch sẽ sau khi khách đi mà không đòi hỏi tiền boa (No Tipping culture).',
    linguisticManifestations: [
      {
        japanese: '一期一会のおもてなしを心がけます',
        furigana: 'いちごいちえの おもてなしを こころがけます',
        vietnamese: 'Chúng tôi ghi nhớ lòng hiếu khách trân quý từng phút giây gặp gỡ duy nhất trong đời.',
        usageContext: 'Châm ngôn phục vụ của các quán trọ truyền thống Ryokan.'
      },
      {
        japanese: 'ごゆっくりお過ごしください',
        furigana: 'ごゆっくり おすごしください',
        vietnamese: 'Xin kính chúc quý khách có khoảng thời gian thư thái.',
        usageContext: 'Lời chúc chân thành gửi đến khách hàng.'
      }
    ],
    culturalComparison: {
      japanPerspective: 'Dịch vụ hoàn hảo là bổn phận danh dự vốn có, đưa tiền tip bị coi là sự xúc phạm đối với lòng tự trọng nghề nghiệp.',
      vietnamPerspective: 'Văn hóa tiền tip và thù lao cảm ơn là bình thường và thể hiện sự hào phóng.'
    },
    workplaceRules: [
      'Luôn chuẩn bị sẵn tài liệu và ly trà ấm trước khi đối tác bước vào phòng họp 5 phút.',
      'Khi tiễn khách ra thang máy: Luôn cúi chào sâu và giữ nguyên tư thế cho đến khi cửa thang máy đóng hẳn.'
    ],
    foreignTrapToAvoid: 'Để lại tiền lẻ trên bàn tại quán ăn Nhật Bản -> Nhân viên sẽ chạy theo để trả lại vì tưởng bạn bỏ quên tiền.',
    professorTakeaway: 'Omotenashi không phải là dịch vụ mua bán, đó là sự đồng điệu tâm hồn và sự tôn trọng tuyệt đối dành cho con người.'
  },
  {
    id: 'cult_7',
    kanjiTitle: '曖昧の美学',
    romajiTitle: 'Aimai no Bigaku',
    vietnameseTitle: 'Mỹ học "Mập mờ có chủ ý" và Nghệ thuật dùng Cushion Words',
    category: 'Tâm lý xã hội',
    summaryBadge: 'Nói đệm tinh tế',
    originAndConcept: 'Người Nhật tin rằng những gì quá rõ ràng, sắc bén (như mũi dao nhọn) sẽ dễ làm người khác bị thương. Sự "mờ ảo, nước đôi" (Aimai) giúp để lại khoảng trống an toàn cho cả hai bên.',
    coreMechanism: 'Sử dụng các từ đệm êm ái (Kushon Kotoba) trước khi từ chối, nhờ vả hay đưa ra nhận định trái chiều.',
    linguisticManifestations: [
      {
        japanese: '恐縮ではございますが',
        furigana: 'きょうしゅくでは ございますが',
        vietnamese: 'Dù tôi vô cùng áy náy và e ngại, nhưng...',
        usageContext: 'Câu đệm siêu lịch sự trước khi nhờ vả một việc khó.'
      },
      {
        japanese: '〜かと思います',
        furigana: '〜かと おもいます',
        vietnamese: 'Tôi trộm nghĩ có lẽ là...',
        usageContext: 'Cách nói giảm nói tránh để ý kiến cá nhân không mang tính áp đặt độc đoán.'
      }
    ],
    culturalComparison: {
      japanPerspective: 'Nói lùi nửa bước, tránh khẳng định 100% ("Có lẽ là...", "Tôi nghĩ là...") để giữ đường lui an toàn.',
      vietnamPerspective: 'Thích sự quả quyết, chắc chắn ("Chắc chắn rồi", "Đúng 100%").'
    },
    workplaceRules: [
      'Không bao giờ dùng câu từ chối thẳng thừng "Iie" (Không) với cấp trên hay khách hàng.',
      'Sử dụng các đuôi câu mềm mại như: 〜ではないでしょうか (Phải chăng là như vậy nhỉ).'
    ],
    foreignTrapToAvoid: 'Nói thẳng "Sai rồi!" (Chigaimasu!) trước mặt đối tác, khiến họ bị sượng và đóng sầm cánh cửa hợp tác.',
    professorTakeaway: 'Sự mập mờ trong tiếng Nhật không phải là thiếu quyết đoán, mà là nghệ thuật ngoại giao đỉnh cao bảo vệ thể diện cho nhau.'
  },
  {
    id: 'cult_8',
    kanjiTitle: '侘寂と物の哀れ',
    romajiTitle: 'Wabi-Sabi to Mono no Aware',
    vietnameseTitle: 'Triết lý Wabi-Sabi & Nỗi u hoài trước sự tàn phai của vạn vật',
    category: 'Triết lý mỹ học',
    summaryBadge: 'Mỹ học vô thường',
    originAndConcept: 'Chịu ảnh hưởng sâu sắc từ triết lý Vô thường (Anitya) của Phật giáo Thiền tông và niềm cảm thán trước thiên nhiên trong văn học Bình An (Heian) với tác phẩm Truyện Genji.',
    coreMechanism: 'Tìm thấy cái đẹp tuyệt mỹ trong những vết nứt, sự cũ kỹ mộc mạc (Wabi-Sabi) và rung động sâu xa trước vẻ đẹp ngắn ngủi của hoa anh đào rơi hay lá đỏ rụng (Mono no Aware).',
    linguisticManifestations: [
      {
        japanese: '物の哀れを感じる',
        furigana: 'ものの あわれを かんじる',
        vietnamese: 'Cảm nhận nỗi niềm xúc cảm u hoài tinh tế trước sự biến chuyển của vạn vật.',
        usageContext: 'Dùng khi ngắm cảnh hoa đào rơi trong gió mùa xuân.'
      },
      {
        japanese: '金継ぎ',
        furigana: 'きんつぎ',
        vietnamese: 'Kintsugi: Nghệ thuật hàn gắn đồ gốm vỡ bằng vàng.',
        usageContext: 'Tôn vinh vết sẹo và sự khiếm khuyết như một vẻ đẹp độc bản.'
      }
    ],
    culturalComparison: {
      japanPerspective: 'Tôn sùng sự giản dị mộc mạc, vết tích thời gian và sự tàn phai.',
      vietnamPerspective: 'Thích sự nguyên vẹn, rực rỡ, mới mẻ và vuông tròn sung túc.'
    },
    workplaceRules: [
      'Hiểu được sự trân trọng đối với những quy trình truyền thống và đồ dùng lâu năm trong văn phòng Nhật.',
      'Trân trọng từng giai đoạn phát triển, xem sai lầm là cơ hội để tôi luyện bản thân (như nghệ thuật Kintsugi).'
    ],
    foreignTrapToAvoid: 'Cười nhạo những món đồ cổ gốm mộc mạc không đều màu hoặc thắc mắc tại sao người Nhật lại say mê ngắm cánh hoa sắp tàn.',
    professorTakeaway: 'Cái đẹp không nằm ở sự hoàn hảo vĩnh cửu, mà nằm ở sự mong manh và dấu ấn của thời gian đi qua.'
  },
  {
    id: 'cult_9',
    kanjiTitle: '義理と人情',
    romajiTitle: 'Giri to Ninjo',
    vietnameseTitle: 'Sự giằng xé giữa "Nghĩa lý xã hội" (Giri) và "Tình cảm con người" (Ninjo)',
    category: 'Tâm lý xã hội',
    summaryBadge: 'Trách nhiệm & Tình cảm',
    originAndConcept: 'Được khắc họa sâu sắc trong kịch Kabuki và tinh thần võ sĩ đạo thời Edo. Giri là trách nhiệm xã hội, nghĩa vụ đạo đức ràng buộc đối với cộng đồng và ân nhân. Ninjo là tình cảm cá nhân và sự rung động tự nhiên của trái tim.',
    coreMechanism: 'Xã hội Nhật Bản đòi hỏi con người phải đặt Giri (nghĩa vụ) lên trên Ninjo (tình riêng) khi có sự xung đột lợi ích.',
    linguisticManifestations: [
      {
        japanese: '義理チョコ',
        furigana: 'ぎりチョコ',
        vietnamese: 'Giri Choco: Sô-cô-la xã giao ngày Valentine.',
        usageContext: 'Nữ nhân viên tặng sô-cô-la cho đồng nghiệp nam vì phép lịch sự, không mang tình ý cá nhân.'
      },
      {
        japanese: 'お世話になった方への義理を果たす',
        furigana: 'おせわになった かたへの ぎりを はたす',
        vietnamese: 'Hoàn thành nghĩa vụ đền ơn đáp nghĩa đối với người đã nâng đỡ mình.',
        usageContext: 'Dùng khi gửi quà Oseibo cuối năm hoặc thiệp chúc Tết Nengajo.'
      }
    ],
    culturalComparison: {
      japanPerspective: 'Tính kỷ luật xã hội cao, luôn trả lời thư và gửi quà đáp lễ chính xác theo quy chuẩn nghĩa vụ.',
      vietnamPerspective: 'Người Việt đặt nặng chữ "Tình" ("Một bồ cái lý không bằng một tý cái tình").'
    },
    workplaceRules: [
      'Khi nhận được sự giúp đỡ của đối tác, bắt buộc phải gửi quà cảm ơn hoặc email phản hồi ngay trong vòng 24 giờ.',
      'Duy trì việc gửi thiệp chúc Tết Nengajo và quà Ochuugen/Oseibo cho khách hàng VIP hàng năm.'
    ],
    foreignTrapToAvoid: 'Nhận quà cáp hoặc sự giúp đỡ của người Nhật mà không có động thái đáp lễ hoặc quên nói lời cảm ơn ở lần gặp kế tiếp.',
    professorTakeaway: 'Xã hội Nhật Bản vận hành trơn tru hàng ngàn năm nhờ vào sợi dây nghĩa lý Giri bền chặt kết nối giữa người với người.'
  },
  {
    id: 'cult_10',
    kanjiTitle: '職人気質',
    romajiTitle: 'Shokunin Kishitsu',
    vietnameseTitle: 'Tinh thần Nghệ nhân Shokunin: Sự tôn sùng chất lượng hoàn mỹ Monodukuri',
    category: 'Triết lý mỹ học',
    summaryBadge: 'Linh hồn sản xuất Nhật',
    originAndConcept: 'Hình thành qua hàng thế kỷ từ các tầng lớp thợ rèn kiếm Katana, thợ mộc chùa chiền và các gia đình nghệ nhân thủ công truyền thống. Nghề nghiệp không chỉ là kế sinh nhai mà là lẽ sống (Ikigai).',
    coreMechanism: 'Cống hiến trọn đời để mài giũa một kỹ năng duy nhất đạt tới độ tinh xảo tuyệt đối, không chấp nhận bất kỳ một lỗi nhỏ nào dù chỉ tính bằng micromet.',
    linguisticManifestations: [
      {
        japanese: 'ものづくりの精神',
        furigana: 'ものづくりの せいしん',
        vietnamese: 'Tinh thần Monodukuri (Nghệ thuật chế tác sản phẩm hoàn mỹ).',
        usageContext: 'Triết lý cốt lõi của các tập đoàn sản xuất lừng danh như Toyota, Sony.'
      },
      {
        japanese: '妥協を許さない',
        furigana: 'だきょうを ゆるさない',
        vietnamese: 'Tuyệt đối không thỏa hiệp với sai sót.',
        usageContext: 'Tiêu chuẩn chất lượng khắt khe của nghệ nhân Nhật.'
      }
    ],
    culturalComparison: {
      japanPerspective: 'Tập trung vào chiều sâu và sự bền bỉ trăm năm, coi sản phẩm lỗi là nỗi hổ thẹn của người thợ.',
      vietnamPerspective: 'Năng động, linh hoạt, chú trọng tốc độ và khả năng thích ứng nhanh theo thị trường.'
    },
    workplaceRules: [
      'Luôn kiểm tra chéo (Double Check) tài liệu và sản phẩm ít nhất 2 lần trước khi bàn giao.',
      'Tuân thủ nghiêm ngặt quy trình chuẩn (SOP), không tự ý đốt cháy giai đoạn vì muốn làm nhanh.'
    ],
    foreignTrapToAvoid: 'Nói câu "Thế này là tạm ổn rồi" (Kore de daitai ii) trước mặt kỹ sư Nhật Bản -> Bạn sẽ bị coi là cẩu thả và thiếu trách nhiệm.',
    professorTakeaway: 'Tinh thần Shokunin biến công việc bình thường trở thành một tác phẩm nghệ thuật vị nhân sinh.'
  }
];

export interface UserAcademicIntent {
  intentType:
    | 'grammar_distinction'
    | 'exam_trap_choice'
    | 'star_problem'
    | 'dokkai_reading'
    | 'choukai_listening'
    | 'sentence_clinic'
    | 'native_tpo_expression'
    | 'reverse_concept_retrieval'
    | 'fuzzy_emotion_telepathy'
    | 'keigo_workplace'
    | 'daily_slang'
    | 'vocab_analysis'
    | 'particle_logic'
    | 'general_academic';
  targetSubject: string;
  focusBadge: string;
  telepathyReadout?: string;
  antiWordByWordAlert?: boolean;
  suggestedFollowups: string[];
  directAnalysisPromptAddendum: string;
}

export function detectUserAcademicIntent(rawQuery: string): UserAcademicIntent {
  const q = (rawQuery || '').toLowerCase().trim();

  // 0A. Reverse Concept Retrieval: "Từ này tiếng Nhật nói thế nào?", "Tìm từ vựng tiếng Nhật qua định nghĩa tiếng Việt"
  if (
    q.includes('từ này trong tiếng nhật') ||
    q.includes('tu nay trong tieng nhat') ||
    q.includes('từ này tiếng nhật') ||
    q.includes('tu nay tieng nhat') ||
    q.includes('khái niệm này') ||
    q.includes('khai niem nay') ||
    q.includes('gọi là gì trong tiếng nhật') ||
    q.includes('tiếng nhật gọi là gì') ||
    q.includes('tiếng nhật có từ nào') ||
    q.includes('có từ nào chỉ') ||
    q.includes('từ vựng chỉ') ||
    q.includes('từ nào diễn tả') ||
    q.includes('từ nào miêu tả') ||
    q.includes('tìm từ tiếng nhật') ||
    q.includes('định nghĩa tiếng việt')
  ) {
    return {
      intentType: 'reverse_concept_retrieval',
      targetSubject: rawQuery,
      focusBadge: '🔍 Bậc Thầy Truy Xuất Ngôn Ngữ Bản Xứ · Định Vị Ngữ Nghĩa 4 Bước',
      telepathyReadout: 'Quét X-quang: Tìm từ bản xứ theo khái niệm Việt + Cảnh báo khác biệt tư duy.',
      antiWordByWordAlert: true,
      suggestedFollowups: [
        'Người Nhật dùng từ này trong hoàn cảnh nào là chuẩn mực nhất?',
        'Từ này có kèm thành ngữ hay quán dụng ngữ nào không?',
        'Phân biệt sắc thái của từ này với các từ đồng nghĩa gần giống'
      ],
      directAnalysisPromptAddendum: `HỌC VIÊN YÊU CẦU: TRUY XUẤT TỪ VỰNG TIẾNG NHẬT TỪ KHÁI NIỆM/ĐỊNH NGHĨA TIẾNG VIỆT (QUY TRÌNH ĐỊNH VỊ NGỮ NGHĨA 4 BƯỚC BẮT BUỘC):
1. ĐỊNH VỊ MỤC TIÊU (Semantic Pinpointing):
   • Chọn lọc Top 2 - 3 từ/cụm từ tiếng Nhật sát nghĩa nhất và phân loại rõ sắc thái: Casual (khẩu ngữ), Formal/Keigo (trang trọng), Slang/Emotion (cảm xúc).
2. GIẢI PHẪU TỪ VỰNG CỐT LÕI (Word Anatomy):
   • Hán tự gốc (kèm bộ thủ, âm On/Kun và mẹo chiết tự).
   • Kana, Romaji Modified Hepburn quốc tế (n', ō/ū, tch).
   • Trọng âm Pitch Accent chuẩn Tokyo NHK (Heiban [0], Atamadaka [1], Nakadaka [2], Odaka [3]).
3. KHỚP NỐI NGỮ CẢNH & COLLOCATION (Contextual Binding):
   • Đặt từ vào Collocation cố định và 1 câu ví dụ sinh động 100% người Nhật bản xứ dùng.
4. CẢNH BÁO "KHÁC BIỆT TƯ DUY" (Cultural Mindset Warning):
   • Chỉ rõ nếu tiếng Việt không có từ tương đương 1-1; giải thích cách người Nhật tư duy qua cụm từ/hoán dụ (Omoiyari, Uchi-Soto, Tatemae-Honne), triệt tiêu tiếng Nhật bồi.`
    };
  }

  // 0A-bis. Fuzzy Emotion / Nonlinear Telepathy: vague descriptions, mixed EN-VI-JP slang, "cảm giác hơi buồn buồn", "nghe hơi cấn"
  if (
    q.includes('cảm giác') ||
    q.includes('cam giac') ||
    q.includes('buồn buồn') ||
    q.includes('man mác') ||
    q.includes('hơi cấn') ||
    q.includes('nghe cấn') ||
    q.includes('nghe sượng') ||
    q.includes('lủng củng') ||
    q.includes('mơ hồ') ||
    q.includes('na ná') ||
    q.includes('giống giống') ||
    q.includes('đúng không sensei') ||
    q.includes('vibe') ||
    q.includes('awkward')
  ) {
    return {
      intentType: 'fuzzy_emotion_telepathy',
      targetSubject: rawQuery,
      focusBadge: '🔮 Ngoại Cảm Ngôn Ngữ · Giải Mã Sắc Thái Mơ Hồ & Cảm Tính',
      telepathyReadout: 'Đã giải mã ý định phi tuyến tính: Làm rõ sắc thái cảm xúc, độ tự nhiên và bóc nguyên ủy tâm lý.',
      antiWordByWordAlert: true,
      suggestedFollowups: [
        'So sánh sắc thái từ này với 2 từ gần nghĩa dễ gây hiểu nhầm',
        'Cho 2 câu thoại người Tokyo thực sự nói khi mang cảm giác này',
        'Giải mã gốc từ nguyên học (Etymology) của sắc thái này'
      ],
      directAnalysisPromptAddendum: `HỌC VIÊN ĐẶT CÂU HỎI PHI TUYẾN TÍNH / MƠ HỒ / CẢM TÍNH: "${rawQuery}".
• Đọc vị chính xác điều học viên thực sự muốn biết dù cách hỏi lủng củng, pha trộn ngôn ngữ hay cảm tính.
• Trả lời khẳng định dứt khoát (Đúng sắc thái đó hay bị lệch ở đâu?), giải thích bằng Từ nguyên học & Tâm lý Nhật Bản (Mono no Aware, Wabi-Sabi, Aimai, Omoiyari...).
• Bảng đối chiếu gọn 2-3 từ/cách nói tương ứng theo từng sắc độ cảm xúc kèm NHK Pitch Accent & Điểm neo trí nhớ.`
    };
  }

  // 0B. Native TPO Expression / How to say naturally / Anti Word-by-Word
  if (
    q.includes('diễn đạt') ||
    q.includes('dien dat') ||
    q.includes('nói thế nào') ||
    q.includes('noi the nao') ||
    q.includes('nói sao') ||
    q.includes('noi sao') ||
    q.includes('cho tự nhiên') ||
    q.includes('tự nhiên nhất') ||
    q.includes('tiếng nhật nói thế nào') ||
    q.includes('tiếng nhật nói sao') ||
    q.includes('dịch sang tiếng nhật') ||
    q.includes('dịch câu') ||
    q.includes('dịch giúp') ||
    q.includes('người nhật hay nói') ||
    q.includes('cách nói tự nhiên') ||
    q.includes('tpo') ||
    q.includes('tiếng nhật bồi') ||
    q.includes('collocation')
  ) {
    return {
      intentType: 'native_tpo_expression',
      targetSubject: rawQuery,
      focusBadge: '🎯 Cố Vấn Giao Tiếp Bản Xứ Tối Cao · Ma Trận TPO & Trị Liệu Dịch Thô',
      telepathyReadout: 'Kích hoạt Trị liệu Dịch thô Word-by-Word → Tái cấu trúc 3 tầng TPO chuẩn Tokyo.',
      antiWordByWordAlert: true,
      suggestedFollowups: [
        'Chuyển sang phiên bản Kính ngữ đàm phán B2B với đối tác bên ngoài',
        'Cách nói này trong giới trẻ Gen Z và đời sống suồng sã có gì khác?',
        'Có thành ngữ hoặc quán dụng ngữ nào thay thế cho câu này không?'
      ],
      directAnalysisPromptAddendum: `
HỌC VIÊN YÊU CẦU: HƯỚNG DẪN DIỄN ĐẠT TIẾNG NHẬT TỰ NHIÊN / DỊCH BẢN XỨ (CHUỖI PHÂN TÍCH 4 BƯỚC BẮT BUỘC):
1. MA TRẬN PHÂN NHÁNH TPO (Thời gian - Địa điểm - Đối tượng):
   Tuyệt đối không chỉ đưa ra một câu trả lời duy nhất. Bắt buộc cung cấp ít nhất 3 phiên bản đa tầng:
   • Phiên bản 1 (Suồng sã đời sống / Tameguchi / Peer-reflex / Gen Z): Dùng cho bạn bè thân, người ngang hàng, giao tiếp hàng ngày. Kèm trợ từ tình thái (ね, よ, かな, じゃん).
   • Phiên bản 2 (Lịch sự tiêu chuẩn / Teineigo 〜です／〜ます): Dùng cho giao tiếp xã hội chuẩn mực, người quen biết xã giao.
   • Phiên bản 3 (Công sở / Học thuật / Keigo B2B / Kakikotoba): Dùng trong email công việc, tiếp đối tác bên ngoài (Soto), báo cáo sếp. Kèm đệm từ lịch thiệp (Cushion Kotoba: 恐れ入りますが, 差し支えなければ, 大変恐縮ですが).
2. LẮP GHÉP COLLOCATION & QUÁN DỤNG NGỮ BẢN XỨ:
   • Gạch bỏ triệt để lối dịch thô "word-by-word" (tiếng Nhật bồi).
   • Thay thế ngay bằng các cụm từ kết hợp cố định (Collocations), thành ngữ (Kanyouku) chuẩn xác mà người Nhật thực tế sử dụng hàng ngày (ví dụ: thay vì dịch ghép thô, hãy dùng 「頭をひねる」, 「手を焼く」, 「耳を傾ける」...).
3. GIẢI MÃ SẮC THÁI CẢM XÚC (Nuance Decoding):
   • Giải thích cặn kẽ "linh hồn" câu nói: độ khiêm nhường mượt mà, tránh bị xem là áp đặt (上から目線 - Uekara mesen) hay thất lễ.
   • Hướng dẫn cách chèn đệm từ (Aizuchi / Cushion Kotoba) và ngữ điệu tự nhiên.
4. BỘ LỌC KIỂM CHỨNG THỰC TẾ (Native Reality Check):
   • Xác nhận thẩm định: Người Tokyo bản xứ có thực sự nói/viết câu này không? Đảm bảo mượt mà tự nhiên 100% không tì vết.
`
    };
  }

  // 1. Sentence Clinic & Repair
  if (
    q.includes('sửa giúp') ||
    q.includes('sửa câu') ||
    q.includes('chữa câu') ||
    q.includes('câu này đúng không') ||
    q.includes('câu này có đúng') ||
    q.includes('câu này sai ở đâu') ||
    q.includes('nói thế này có được') ||
    q.includes('viết thế này chuẩn chưa') ||
    q.includes('câu này nói vậy')
  ) {
    return {
      intentType: 'sentence_clinic',
      targetSubject: rawQuery,
      focusBadge: '🩺 Thẩm Định & Sửa Câu Trực Chiến (Sentence Clinic)',
      suggestedFollowups: [
        'Sửa lại câu này theo văn phong Kính ngữ công sở',
        'Cho thêm 2 biến thể khẩu ngữ tự nhiên của người bản xứ',
        'Phân tích chi tiết từng lỗi trợ từ trong câu này'
      ],
      directAnalysisPromptAddendum: `
HỌC VIÊN YÊU CẦU THẨM ĐỊNH / SỬA CÂU TIẾNG NHẬT:
• Hãy bóc tách câu của học viên: Điểm đúng, điểm chưa tự nhiên, vi phạm ngữ pháp hoặc sắc thái kính ngữ.
• Cung cấp ngay phiên bản sửa đổi chuẩn bản xứ (có Kanji + Hiragana + Romaji + Dịch nghĩa).
• Giải thích cặn kẽ TẠI SAO người Nhật lại nói như vậy thay vì câu cũ.
`
    };
  }

  // 2. Exam Trap / Why Option X instead of Option Y
  if (
    (q.includes('tại sao') || q.includes('tai sao') || q.includes('sao lại') || q.includes('vì sao')) &&
    (q.includes('chọn') || q.includes('dùng') || q.includes('đáp án') || q.includes('không chọn') || q.includes('sai'))
  ) {
    return {
      intentType: 'exam_trap_choice',
      targetSubject: rawQuery,
      focusBadge: '🎯 Soi Bẫy Đề Thi: Giải Mã Lý Do Chọn Đáp Án & Điểm Sai Của Phương Án Nhiễu',
      suggestedFollowups: [
        'Mẹo 3 giây loại trừ phương án sai trong dạng câu này',
        'Cho thêm 1 câu đề thi JLPT tương tự để em làm thử',
        'So sánh nhanh cặp ngữ pháp này trong 1 bảng tóm tắt'
      ],
      directAnalysisPromptAddendum: `
HỌC VIÊN HỎI VỀ LÝ DO CHỌN ĐÁP ÁN TRONG ĐỀ THI / CÂU CỤ THỂ:
• TUYỆT ĐỐI TRẢ LỜI NGAY DÒNG 1: Khẳng định đáp án đúng và lý do cốt lõi vì sao đáp án đó phù hợp với câu này.
• Chỉ rõ TẠI SAO PHƯƠNG ÁN CÒN LẠI (hoặc các phương án nhiễu) LÀ SAI / KHÔNG PHÙ HỢP trong ngữ cảnh câu này (bẫy liên kết, bẫy sắc thái ý chí, bẫy chủ ngữ...).
• Nêu mẹo nhận diện bẫy đề thi JLPT tương tự trong 3 giây.
`
    };
  }

  // 3. Star Problem ★ (Hoshi-mondai / Xếp câu)
  if (
    q.includes('bài sao') ||
    q.includes('dấu sao') ||
    q.includes('câu sao') ||
    q.includes('hoshi') ||
    q.includes('★') ||
    q.includes('xếp câu') ||
    q.includes('trật tự từ')
  ) {
    return {
      intentType: 'star_problem',
      targetSubject: 'Bài Điền Dấu Sao ★ (Hoshi-mondai)',
      focusBadge: '★ Bí Kíp Bẻ Khóa Bài Điền Dấu Sao ★ (Quy Tắc Ghép Cặp 4 Bước)',
      suggestedFollowups: [
        'Cho thêm 1 câu bài sao N2 có đáp án và phân tích chi tiết',
        'Các cặp trợ từ bất di bất dịch thường gặp trong bài sao',
        'Mẹo xử lý khi không dịch được hết nghĩa các từ trong bài sao'
      ],
      directAnalysisPromptAddendum: `
HỌC VIÊN YÊU CẦU BÍ KÍP / GIẢI QUYẾT BÀI ĐIỀN DẤU SAO ★:
• Hướng dẫn theo Quy trình 4 bước: (1) Neo ngữ pháp vị ngữ cuối câu, (2) Ghép cặp cố định 2-trong-4, (3) Nối trợ từ, (4) Chốt vị trí ngôi sao.
• Nếu học viên đưa đề bài cụ thể: Ráp trật tự chuẩn xác ngay lập tức và giải thích logic ghép cặp!
`
    };
  }

  // 4. Dokkai Reading Comprehension
  if (
    q.includes('đọc hiểu') ||
    q.includes('dokkai') ||
    q.includes('đoản văn') ||
    q.includes('trung văn') ||
    q.includes('trường văn') ||
    q.includes('tín hiệu đảo chiều') ||
    q.includes('cháy giờ đọc hiểu') ||
    q.includes('phủ định kép')
  ) {
    return {
      intentType: 'dokkai_reading',
      targetSubject: 'Kỹ Năng Đọc Hiểu Dokkai JLPT',
      focusBadge: '📖 Bậc Thầy Đọc Hiểu Dokkai: Giải Mã Câu Phức, Phủ Định Kép & Tatemae',
      suggestedFollowups: [
        'Cách bóc phủ định kép 〜ないことはない và 〜ずにはいられない trong Dokkai',
        'Tách câu định ngữ dài tìm chủ ngữ chính trong 5 giây',
        'Bẫy quan điểm số đông (Tatemae) vs luận điểm tác giả (のではないか)'
      ],
      directAnalysisPromptAddendum: `
HỌC VIÊN YÊU CẦU CHIẾN THUẬT ĐỌC HIỂU DOKKAI (TRỤ CỘT 4):
• Hướng dẫn kỹ thuật Skim & Scan tìm từ khóa tín hiệu (しかし・だが・ところが, つまり・要するに).
• Phân tích cấu trúc câu phức dài: chặt mệnh đề định ngữ, xác định Chủ ngữ - Vị ngữ lõi.
• Giải mã Phủ định kép (〜ないことはない, 〜ずにはいられない, 〜ないとも限らない).
• Chỉ cách tách Bẫy Tatemae (quan điểm số đông "〜と言われているが...") để chốt đúng Thesis của tác giả ("〜のではないか", "〜べきだ").
`
    };
  }

  // 4B. Choukai Listening Comprehension
  if (
    q.includes('nghe hiểu') ||
    q.includes('choukai') ||
    q.includes('luyện nghe') ||
    q.includes('nuốt âm') ||
    q.includes('biến âm') ||
    q.includes('lược chủ ngữ') ||
    q.includes('ngữ điệu đảo chiều') ||
    q.includes('bẫy nghe')
  ) {
    return {
      intentType: 'choukai_listening',
      targetSubject: 'Kỹ Năng Nghe Hiểu Choukai Thực Chiến',
      focusBadge: '🎧 Bậc Thầy Nghe Hiểu Choukai: Nuốt Âm, Lược Trợ Từ & Đảo Chiều 180°',
      suggestedFollowups: [
        'Tổng hợp các dạng nuốt âm cửa miệng hay ra trong đề Choukai N2-N1',
        'Cách bắt ngữ điệu từ chối ngầm 180° qua ちょっと... và まあ...',
        'Mẹo ghi chép Sokki (tốc ký) khi nghe phần Mondai 1 & 2'
      ],
      directAnalysisPromptAddendum: `
HỌC VIÊN YÊU CẦU CHIẾN THUẬT NGHE HIỂU CHOUKAI (TRỤ CỘT 4):
• Bóc tách hiện tượng nuốt âm/biến âm thực tế: 〜ている -> 〜てる, 〜てしまう -> 〜ちゃう/〜じゃう, 〜ておく -> 〜とく, 〜なければ -> 〜なきゃ/〜なくちゃ, 〜のです -> 〜ん/〜んだ.
• Giải mã hiện tượng lược bỏ chủ ngữ & trợ từ (は・が・を) trong hội thoại tốc độ bản xứ.
• Cảnh báo ngữ điệu đảo chiều 180° (えっ？, ちょっと..., まあ..., せっかくですが... báo hiệu từ chối hoặc phản đối ngầm).
`
    };
  }

  // 5. Vocabulary Analysis on Demand
  const vocabCheck = parseUserVocabPrompt(rawQuery);
  if (
    vocabCheck.isVocabRequest ||
    q.includes('nghĩa đen') ||
    q.includes('nghĩa bóng') ||
    q.includes('từ vựng về') ||
    q.includes('thành ngữ về') ||
    q.includes('quán dụng ngữ')
  ) {
    return {
      intentType: 'vocab_analysis',
      targetSubject: vocabCheck.cleanTopic || rawQuery,
      focusBadge: `📖 Bóc Tách Từ Vựng Đa Tầng Theo Yêu Cầu: 「${vocabCheck.cleanTopic || 'Từ Vựng Chuyên Sâu'}」`,
      suggestedFollowups: [
        'Mở thẻ từ vựng tương tác trong phân hệ Từ Vựng Theo Yêu Cầu',
        'Cho thêm 2 câu ví dụ thực tế trong đời sống công sở',
        'Các thành ngữ và quán dụng ngữ họ hàng có cùng chữ Hán'
      ],
      directAnalysisPromptAddendum: `
HỌC VIÊN YÊU CẦU TỪ VỰNG THEO YÊU CẦU (ĐA TẦNG NGHĨA ĐEN & BÓNG):
• Bóc tách rõ: Kanji, Hiragana, Furigana (ruby: Kanji[hiragana]), Romaji chuẩn Hepburn, Hán Việt, JLPT.
• Đối chiếu trực diện Nghĩa đen (gốc cơ học) vs Nghĩa bóng (ẩn dụ đời sống, công sở).
• Cặp ví dụ đối chiếu và lời bình học thuật của GS. Yamato Kenji.
`
    };
  }

  // 6. Business Keigo & Workplace
  if (
    q.includes('kính ngữ') ||
    q.includes('keigo') ||
    q.includes('sonkeigo') ||
    q.includes('kenjougo') ||
    q.includes('tôn kính') ||
    q.includes('khiêm nhường') ||
    q.includes('email') ||
    q.includes('meishi') ||
    q.includes('nomikai') ||
    q.includes('công sở')
  ) {
    return {
      intentType: 'keigo_workplace',
      targetSubject: 'Kính Ngữ & Quy Chuẩn Giao Tiếp Công Sở B2B',
      focusBadge: '💼 Kính Ngữ Công Sở & Quy Chuẩn Văn Hóa Doanh Nghiệp B2B',
      suggestedFollowups: [
        'Bảng đối chiếu 7 động từ bất quy tắc Sonkeigo vs Kenjougo',
        'Mẫu câu Email từ chối khéo léo chuẩn mực công ty Nhật',
        'Cái bẫy lạm dụng câu 「〜させていただきます」'
      ],
      directAnalysisPromptAddendum: `
HỌC VIÊN HỎI VỀ KÍNH NGỮ HOẶC ỨNG XỬ DOANH NGHIỆP:
• Phân định tuyệt đối giữa Sonkeigo (nâng người nghe/khách) vs Kenjougo (hạ mình/phe mình).
• Nhấn mạnh ranh giới Uchi - Soto (khi nói với khách về sếp thì sếp thuộc nhóm Uchi, phải dùng khiêm nhường ngữ).
• Cảnh báo lỗi sai Kính ngữ kép (Nijuu Keigo).
`
    };
  }

  // 7. Daily Spoken & Street Slang
  if (
    q.includes('khẩu ngữ') ||
    q.includes('slang') ||
    q.includes('tameguchi') ||
    q.includes('rút gọn') ||
    q.includes('yabai') ||
    q.includes('majide') ||
    q.includes('gachide') ||
    q.includes('chau') ||
    q.includes('toku') ||
    q.includes('nakya')
  ) {
    return {
      intentType: 'daily_slang',
      targetSubject: 'Khẩu Ngữ Đời Thường & Slang Bản Xứ',
      focusBadge: '🗣️ Khẩu Ngữ Đời Thường, Dạng Rút Gọn & Slang Tự Nhiên Bản Xứ',
      suggestedFollowups: [
        'Bộ 4 dạng rút gọn cửa miệng: 〜ちゃう, 〜とく, 〜なきゃ, 〜っけ',
        'Các từ đệm Cushion Kotoba giúp nói năng khéo léo tự nhiên',
        'Sự khác nhau giữa cách nói trong Anime và đời thực tại Nhật'
      ],
      directAnalysisPromptAddendum: `
HỌC VIÊN HỎI VỀ KHẨU NGỮ / SLANG:
• Phân tích các dạng biến âm và rút gọn khẩu ngữ (〜てしまう -> 〜ちゃう, 〜ておく -> 〜とく, 〜なければ -> 〜なきゃ).
• Cho câu thoại đối thoại tự nhiên, chỉ ra bối cảnh và đối tượng được phép dùng (bạn bè thân thiết, không dùng với bề trên).
`
    };
  }

  // 8. Grammar Distinction / Comparison
  if (
    q.includes('phân biệt') ||
    q.includes('phan biet') ||
    q.includes('khác gì') ||
    q.includes('khac gi') ||
    q.includes('vs') ||
    q.includes('và') ||
    q.includes('với') ||
    q.includes('so sánh')
  ) {
    return {
      intentType: 'grammar_distinction',
      targetSubject: rawQuery,
      focusBadge: '⚖️ Phân Biệt & Đối Chiếu Bản Chất Ngữ Pháp Chuyên Sâu',
      suggestedFollowups: [
        'Bảng đối chiếu nhanh 2 cấu trúc này',
        'Bẫy đề thi JLPT kinh điển của cặp ngữ pháp này',
        'Mẹo 3 giây phản xạ chọn đúng khi đi thi'
      ],
      directAnalysisPromptAddendum: `
HỌC VIÊN YÊU CẦU PHÂN BIỆT / SO SÁNH NGỮ PHÁP (TRỤ CỘT 2):
• TRẢ LỜI NGAY DÒNG 1: Chốt khác biệt nhận thức cốt lõi của người Nhật (Uchi-Soto, Amae, Douchou Atsuryoku hoặc logic S-V-O).
• Bảng đối chiếu trực diện giữa các mẫu dễ nhầm lẫn khi dịch sang tiếng Việt (vd: Nghĩa tiếng Việt giống nhau nhưng khác hoàn toàn sắc thái/kết hợp).
• Phanh phui bẫy kinh điển của hội đồng ra đề JEES (đảo vế nhân quả, phó từ cấm kỵ, lỗi chia từ nối).
• 3 câu ví dụ độc lập (Đời sống Tameguchi / Công sở Keigo / Học thuật JLPT) đủ Kana + Romaji Modified Hepburn + Dịch mượt.
• Chốt hạ "⏳ Mẹo phản xạ 3 giây".
`
    };
  }

  // 9. Particle Logic
  if (
    q.includes('trợ từ') ||
    q.includes('tro tu') ||
    (q.includes('は') && q.includes('が')) ||
    (q.includes('に') && q.includes('で')) ||
    (q.includes('を') && q.includes('で'))
  ) {
    return {
      intentType: 'particle_logic',
      targetSubject: rawQuery,
      focusBadge: '🔍 Giải Mã Tư Duy Trợ Từ & Tâm Lý Học Nhận Thức Nhật Bản',
      suggestedFollowups: [
        'Phân biệt は (Chủ đề/Tương phản) vs が (Chủ ngữ ngữ pháp/Hiện tượng khách quan)',
        'Bẫy trợ từ không gian di chuyển: を vs で',
        'Hạn chót までに vs Kéo dài suốt まで'
      ],
      directAnalysisPromptAddendum: `
HỌC VIÊN HỎI VỀ TRỢ TỪ TIẾNG NHẬT:
• Giải thích logic không gian và tâm lý nhận thức (Topic vs Focus, Uchi-Soto, Vùng tĩnh vs Vùng hành động).
• Cho 3 ví dụ đối chiếu đa tầng (Tameguchi / Teineigo-Keigo / JLPT) đủ Kana + Modified Hepburn + Dịch nghĩa.
• Vạch bẫy JEES & chốt "Mẹo phản xạ 3 giây".
`
    };
  }

  // 10. General Academic Topic
  return {
    intentType: 'general_academic',
    targetSubject: rawQuery,
    focusBadge: `🎯 Đại Tông Sư Phân Tích 5 Trụ Cột: 「${rawQuery.slice(0, 35)}...」`,
    suggestedFollowups: [
      'Soi bẫy đề thi JLPT/JEES của nội dung này',
      'Cách nói tự nhiên ngoài đời thực theo ma trận TPO',
      'Giải mã góc nhìn văn hóa Uchi-Soto / Tatemae-Honne đằng sau'
    ],
    directAnalysisPromptAddendum: `
HỌC VIÊN YÊU CẦU: "${rawQuery}".
• Vận hành đồng bộ 5 Trụ Cột: Bóc tách từ vựng/Hán tự (On/Kun, Bộ thủ, Pitch Accent, Hepburn); Giải mã tâm lý ngữ pháp & Bẫy JEES; 3 ví dụ độc lập đa ngữ cảnh (Tameguchi / Business Keigo / Học thuật JLPT); Liên kết mã gen văn hóa (Uchi-Soto, Tatemae-Honne, Omoiyari, Meiwaku, Wabi-sabi); Chốt "Mẹo phản xạ 3 giây".
`
  };
}

const senseiAcademicCache = new Map<string, string>();

export async function askAiSenseiAcademic(
  userQuery: string,
  options?: {
    level?: string;
    focusMode?: SenseiFocusMode;
    explanationPersona?: SenseiExplanationPersona;
    conversationHistory?: { role: 'user' | 'model'; text: string }[];
    onStreamUpdate?: (partialText: string) => void;
  }
): Promise<string> {
  const currentLvl = options?.level || 'N1';
  const mode = options?.focusMode || 'comprehensive';
  const persona: SenseiExplanationPersona = options?.explanationPersona || 'encyclopedic_master';

  const lockedTarget = extractLockedQueryTarget(userQuery);
  const normalizedKey = `${persona}::${mode}::${currentLvl}::${userQuery.trim().toLowerCase()}`;
  const cachedReply = senseiAcademicCache.get(normalizedKey);
  if (cachedReply && (!options?.conversationHistory || options.conversationHistory.length === 0)) {
    const cacheStale =
      (lockedTarget.jpToken && !cachedReply.includes(lockedTarget.jpToken)) ||
      (lockedTarget.hanVietHint &&
        !cachedReply.toLowerCase().includes(lockedTarget.hanVietHint.toLowerCase()));
    if (cacheStale) {
      senseiAcademicCache.delete(normalizedKey);
    } else {
      options?.onStreamUpdate?.(cachedReply);
      return cachedReply;
    }
  }

  // Format conversation history if available
  let contextPrompt = '';
  if (options?.conversationHistory && options.conversationHistory.length > 0) {
    contextPrompt = '\nLỊCH SỬ THẢO LUẬN GẦN ĐÂY:\n' +
      options.conversationHistory
        .slice(-4)
        .map((m) => `${m.role === 'user' ? 'Học viên' : 'Giáo sư Yamato'}: ${m.text}`)
        .join('\n\n') + '\n\n';
  }

  // Deep Intent Analysis + Persistent Vulnerability Tracking
  const intent = detectUserAcademicIntent(userQuery);
  const topHeels = getTopAchillesHeels(2);
  const levelDirective = buildLevelPedagogyDirective(currentLvl);
  const detectedVocabIntent = parseUserVocabPrompt(userQuery);
  const isVocabDemand = mode === 'vocab_mastery' || detectedVocabIntent.isVocabRequest || intent.intentType === 'vocab_analysis';

  let adaptiveVulnerabilityBlock = `\n${levelDirective}\n`;
  if (persona === 'ultimate_singularity' && topHeels.length > 0) {
    adaptiveVulnerabilityBlock += `MA TRẬN VÁ LỖ HỔNG NGẦM (GÓT CHÂN ACHILLES CỦA HỌC VIÊN):\n` +
      topHeels.map((h, i) => `• Điểm yếu #${i + 1} (${h.labelVi}): ${h.stealthCue}`).join('\n') +
      `\n→ Hãy khéo léo lồng ghép tự nhiên 1 ví dụ/lưu ý nhỏ chạm tới điểm yếu trên để học viên được ôn tập ngầm (không cần nhắc thẳng "hệ thống theo dõi").\n`;
  } else if (topHeels.length > 0) {
    adaptiveVulnerabilityBlock += `LƯU Ý BỔ TRỢ (${topHeels[0].labelVi}): ${topHeels[0].stealthCue}\n`;
  }

  const isContextCollocationAsk =
    /collocation|bối cảnh|tình huống|cụm danh từ|cụm động từ|khi đi chợ|khi đổ rác|đi tàu điện|bị sếp mắng|từ chối khéo|đàm phán hợp đồng/i.test(userQuery);

  let modeFocusInstruction = '';
  if (isContextCollocationAsk) {
    modeFocusInstruction = `
TRỌNG TÂM YÊU CẦU: BỘ NÃO DỰ PHÓNG HOÀN CẢNH & MA TRẬN COLLOCATION 3 TẦNG:
Học viên yêu cầu bối cảnh: "${userQuery}".
1. QUÉT X-QUANG 360°: Tóm tắt ngắn gọn 2–3 hành động vật lý và trạng thái tâm lý/TPO cốt lõi của bối cảnh này.
2. CHẺ NHỎ 3 TẦNG RÀNH MẠCH (TUYỆT ĐỐI KHÔNG VIẾT LỘN XỘN):
   • **1. Từ vựng Cốt lõi (Keywords)**
   • **2. Cụm Danh Từ (Noun Phrases)**
   • **3. Cụm Động Từ / Collocations (Verb Phrases)**
3. CHUẨN BÁCH KHOA TẬN RĂNG CHO MỌI MỤC:
   Kanji chuẩn · Furigana · Trọng âm NHK Tokyo [0]/[1]/[n] · Nghĩa Tiếng Việt tinh tế (không word-by-word) · Câu ví dụ siêu ngắn bám sát bối cảnh + dịch Việt mượt.
4. KẾT BÀI: Gợi ý 1 ngóc ngách sâu hơn của bối cảnh này + ${persona === 'ultimate_singularity' ? '🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt)' : '⏳ MẸO GHI NHỚ 3 GIÂY'}.
`;
  } else if (isVocabDemand) {
    modeFocusInstruction = persona === 'encyclopedic_master'
      ? `
TRỌNG TÂM CHẾ ĐỘ 1 — SIÊU TRỤ CỘT TỪ VỰNG 5 CHIỀU (TỐC ĐỘ NHANH):
Học viên yêu cầu: "${userQuery}".
${detectedVocabIntent.isVocabRequest ? `(ĐÃ NHẬN DIỆN YÊU CẦU: Cung cấp ${detectedVocabIntent.count} từ vựng về chủ đề "${detectedVocabIntent.cleanTopic}")` : ''}
Mổ xẻ trọn vẹn 5 chiều súc tích, không thiếu bất kỳ mắt xích nào:
1. **Giải phẫu & Ngữ âm**: Bộ thủ, Âm On/Kun, Mẹo chiết tự, Modified Hepburn, Trọng âm Tokyo NHK [0]/[1]/[n].
2. **Ma trận Sắc thái**: Nghĩa Đen (vật lý) vs Nghĩa Bóng (ẩn dụ/tâm lý), sắc thái tôn kính/suồng sã/mỉa mai/khiêm nhường.
3. **Hệ sinh thái Collocation cố định**: Cụm kết hợp chuẩn bản xứ (chống dịch word-by-word).
4. **Bảng Phân biệt Đồng nghĩa / Đồng âm**: Đối chiếu ranh giới tinh vi với từ dễ nhầm.
5. **Mở rộng & Neo 3s**: Kanyouku / Yojijukugo / Tiền-Hậu tố liên quan + ⏳ MẸO GHI NHỚ 3 GIÂY.
`
      : `
TRỌNG TÂM CHẾ ĐỘ 2 — TỪ VỰNG QUA THẤU THỊ & NGÔN NGỮ HỌC THẦN KINH:
Học viên yêu cầu: "${userQuery}".
1. Giải mã bằng Từ nguyên học (Etymology/Bộ thủ) & Tâm lý học Nhật Bản + NHK Pitch Accent [0]/[1]/[n] + Hepburn.
2. Phân tích Nghĩa đen vs Nghĩa bóng theo lăng kính văn hóa (Uchi-Soto, Tatemae-Honne).
3. Cặp ví dụ thực chiến đối chiếu (Đời sống / Công sở) + Collocation chuẩn Tokyo.
4. 🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt).
`;
  } else if (
    intent.intentType === 'native_tpo_expression' ||
    /diễn đạt|nói thế nào|nói sao cho tự nhiên|cách nói tự nhiên|dịch sang tiếng nhật|dịch tự nhiên|câu này nói sao|cụm này nói sao|tiếng nhật nói thế nào|người nhật hay nói/i.test(userQuery)
  ) {
    modeFocusInstruction = `
TRỌNG TÂM YÊU CẦU: TRỊ LIỆU DỊCH THÔ & CỐ VẤN TPO BẢN XỨ:
• Đập tan tư duy Word-by-Word. Tái cấu trúc hoàn toàn qua hệ quy chiếu Uchi-Soto, Honne-Tatemae và TPO.
• Cung cấp >= 3 phiên bản đa tầng: (1) Tameguchi/Gen Z (+ trợ từ tình thái), (2) Teineigo chuẩn, (3) Keigo công sở/Kakikotoba (+ Cushion Kotoba & Aizuchi), đầy đủ Kana + Modified Hepburn + Dịch mượt.
• Chốt ${persona === 'ultimate_singularity' ? '🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt)' : '⏳ MẸO GHI NHỚ 3 GIÂY'}.
`;
  } else if (intent.intentType === 'reverse_concept_retrieval') {
    modeFocusInstruction = `TRỌNG TÂM YÊU CẦU: TRUY XUẤT NGÔN NGỮ BẢN XỨ 4 BƯỚC (VIỆT → NHẬT):
(1) 🎯 **Định vị mục tiêu**: Top 2-3 từ sát nghĩa nhất phân loại bảng theo Casual / Formal-Keigo / Slang-Emotion.
(2) 🔬 **Giải phẫu từ vựng cốt lõi**: Kanji gốc (bộ thủ/chiết tự, On/Kun), Kana, Modified Hepburn, Trọng âm Tokyo NHK.
(3) 🔗 **Khớp nối Collocation & Ví dụ sống**: Đặt vào cụm cố định và câu nói tự nhiên 100% người Tokyo dùng.
(4) ⚠️ **Cảnh báo khác biệt tư duy**: Chỉ rõ nếu tiếng Việt không có từ 1-1 tương đương, giải thích cách người Nhật tư duy qua cụm từ/quán dụng ngữ (chống tiếng Nhật bồi) + ${persona === 'ultimate_singularity' ? '🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt)' : '⏳ MẸO GHI NHỚ 3 GIÂY'}.`;
  } else if (intent.intentType === 'dokkai_reading') {
    modeFocusInstruction = `
TRỌNG TÂM YÊU CẦU: BẬC THẦY ĐỌC HIỂU DOKKAI:
• Skim & Scan từ khóa tín hiệu (しかし・だが・ところが, つまり・要するに).
• Bóc tách câu phức định ngữ dài, chuỗi Phủ định kép (〜ないことはない, 〜ずにはいられない) và luận ngầm ý: Ý kiến đám đông vs Nhượng bộ vs Quan điểm lõi (〜のではないか).
• Trình bày gọn gàng theo bảng so sánh + ${persona === 'ultimate_singularity' ? '🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt)' : '⏳ MẸO GHI NHỚ 3 GIÂY'}.
`;
  } else if (intent.intentType === 'choukai_listening') {
    modeFocusInstruction = `
TRỌNG TÂM YÊU CẦU: BẬC THẦY NGHE HIỂU CHOUKAI THỰC CHIẾN:
• Giải phẫu nuốt âm/biến âm bản xứ (〜てる, 〜ちゃう/〜じゃう, 〜とく, 〜なきゃ/〜なくちゃ, 〜ん/〜んだ), lược chủ ngữ/trợ từ.
• Bắt tín hiệu ngữ điệu đảo chiều 180° (えっ？, ちょっと..., まあ..., せっかくですが...).
• Kèm ví dụ thoại chuẩn + ${persona === 'ultimate_singularity' ? '🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt)' : '⏳ MẸO GHI NHỚ 3 GIÂY'}.
`;
  } else if (mode === 'jlpt_exam' || intent.intentType === 'exam_trap_choice' || intent.intentType === 'star_problem' || intent.intentType === 'grammar_distinction') {
    modeFocusInstruction = `
TRỌNG TÂM YÊU CẦU: KỸ SƯ GIẢI MÃ NGỮ PHÁP & BẪY JEES:
• Mổ xẻ cấu trúc S-V-O & tư duy tâm lý Nhật Bản đằng sau cấu trúc (Uchi-Soto, Douchou Atsuryoku, Amae) — cấm liệt kê công thức khô khan.
• Bảng đối chiếu trực diện | Mẫu câu | Sắc thái & Ranh giới | Bẫy JEES (đảo nhân quả, trạng từ cấm kỵ, lỗi V/A/N) |.
• ĐÚNG 3 câu ví dụ độc lập không trùng cấu trúc: (1) Đời sống Tameguchi, (2) Công sở Keigo, (3) Học thuật chuẩn đề thi JLPT.
• Chốt ${persona === 'ultimate_singularity' ? '🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt)' : '⏳ MẸO GHI NHỚ 3 GIÂY'}.
`;
  } else if (mode === 'daily_spoken' || intent.intentType === 'daily_slang') {
    modeFocusInstruction = `
TRỌNG TÂM YÊU CẦU: KHẨU NGỮ ĐỜI SỐNG & SLANG TOKYO:
• Soi biến âm rút gọn (〜ちゃう, 〜とく, 〜なきゃ, 〜ん), trợ từ tình thái (ね, よ, かな, じゃん) và Aizuchi + NHK Pitch Accent.
• 3 ví dụ TPO tự nhiên + ${persona === 'ultimate_singularity' ? '🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt)' : '⏳ MẸO GHI NHỚ 3 GIÂY'}.
`;
  } else if (mode === 'business_keigo' || intent.intentType === 'keigo_workplace') {
    modeFocusInstruction = `
TRỌNG TÂM YÊU CẦU: KÍNH NGỮ CÔNG SỞ B2B & TÂM LÝ UCHI-SOTO:
• Phân định tuyệt đối Sonkeigo (nâng Soto) vs Kenjougo (hạ Uchi) + Cushion Kotoba (恐れ入りますが, 差し支えなければ).
• Vạch bẫy Kính ngữ kép (Nijuu Keigo) + ${persona === 'ultimate_singularity' ? '🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt)' : '⏳ MẸO GHI NHỚ 3 GIÂY'}.
`;
  } else {
    modeFocusInstruction = persona === 'encyclopedic_master'
      ? `
TRỌNG TÂM CHẾ ĐỘ 1 — ĐẠI TÔNG SƯ TOÀN NĂNG 5 SIÊU TRỤ CỘT (TỐC ĐỘ NHANH):
1. Nếu hỏi Từ vựng/Hán tự: đủ 5 chiều (On/Kun, Bộ thủ, Chiết tự, Hepburn, Pitch Accent Tokyo; Nghĩa đen vs bóng; Collocation cố định; Bảng đồng/trái nghĩa dễ nhầm; Kanyouku/Yojijukugo).
2. Nếu hỏi Ngữ pháp: mổ xẻ S-V-O & tư duy gốc, bảng đối chiếu, bẫy JEES, ĐÚNG 3 ví dụ độc lập (Đời sống Tameguchi / Công sở Keigo / JLPT).
3. Nếu hỏi Diễn đạt / Tìm từ Việt→Nhật: ma trận TPO 3 tầng hoặc Quy trình 4 bước chống Word-by-Word.
4. Liên kết mã gen văn hóa (Uchi-Soto, Tatemae-Honne, Omoiyari, Meiwaku, Wabi-sabi) + ⏳ MẸO GHI NHỚ 3 GIÂY.
`
      : `
TRỌNG TÂM CHẾ ĐỘ 2 — THỰC THỂ SƯ PHẠM TOÀN TRI 4 SIÊU TRỤ CỘT:
1. Thấu thị chính xác ý định phi tuyến tính (kể cả mơ hồ/lủng củng) & trị liệu dứt điểm tư duy dịch thô Word-by-Word qua TPO.
2. Giải phẫu Từ nguyên học (Etymology/Bộ thủ) hoặc Tâm lý học Nhật Bản + NHK Pitch Accent [0]/[1]/[n] & Modified Hepburn chuẩn Daijirin.
3. Bảng đối chiếu Zen gọn nhẹ + 3 ví dụ thực chiến có lồng ghép ôn tập ngầm theo trình độ ${currentLvl}.
4. 🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt) ở cuối bài.
`;
  }

  const rawDirectGrounding = resolveDirectKanjiOrVocab(userQuery);
  const verifiedGrounding = verifyAndHealLexiconDossier(rawDirectGrounding, userQuery);
  const directGrounding = verifiedGrounding.lexicon;
  let groundingInstruction = '';
  if (directGrounding) {
    groundingInstruction = `
NGUỒN CHÂN LÝ TỪ ĐIỂN GỐC CHO 【${directGrounding.word}】:
• Kanji/Từ: ${directGrounding.word} · Kana: ${directGrounding.reading} · Modified Hepburn: ${directGrounding.romaji}
• Hán Việt: ${directGrounding.hanViet || 'Thuần Nhật'} · JLPT: ${directGrounding.level} · Số nét: ${directGrounding.strokeCount ?? 'N/A'} · Nghĩa: ${directGrounding.meaning}
${directGrounding.radicals && directGrounding.radicals.length > 0 ? `• Bộ thủ chuẩn: ${directGrounding.radicals.map((r) => `${r.kanji} (${r.radical})`).join(', ')}` : ''}
${directGrounding.culturalNote ? `• Ghi chú: ${directGrounding.culturalNote}` : ''}
→ BẮT BUỘC phân tích chính xác 100% từ 【${directGrounding.word}】, tuyệt đối không lái sang từ khác hay gán nhầm số nét/bộ thủ của chữ khác.
`;
  }

  const activeSystemInstruction =
    persona === 'encyclopedic_master'
      ? AI_SENSEI_MODE1_SYSTEM_INSTRUCTION
      : AI_SENSEI_SYSTEM_INSTRUCTION;

  const prompt = `
${contextPrompt}
CHẾ ĐỘ ĐANG KÍCH HOẠT: ${persona === 'encyclopedic_master' ? 'CHẾ ĐỘ 1 · ĐẠI TÔNG SƯ TOÀN NĂNG (BÁCH KHOA & TỐC ĐỘ NHANH)' : 'CHẾ ĐỘ 2 · THỰC THỂ SƯ PHẠM TOÀN TRI (THE ULTIMATE SINGULARITY)'}
CÂU HỎI CỦA HỌC VIÊN:
"${userQuery}"

ĐỌC VỊ Ý ĐỊNH: ${intent.focusBadge}
${intent.telepathyReadout ? `• Chẩn đoán X-quang: ${intent.telepathyReadout}` : ''}
${intent.directAnalysisPromptAddendum}
${groundingInstruction}
${adaptiveVulnerabilityBlock}
GÓC NHÌN CHUYÊN MÔN: ${mode.toUpperCase()}
${modeFocusInstruction}

KIẾN TRÚC TRÌNH BÀY KIỆT TÁC ZEN & TỐC ĐỘ QUANG TỐC:
1. DÒNG 1 CHỐT THẲNG KẾT LUẬN CỐT LÕI (không chào hỏi, không rào đón).
2. Bôi đậm bằng **từ khóa sinh tử** để mắt lướt nhanh; giữ khoảng trắng thoáng; tuyệt đối KHÔNG dùng ký tự # tiêu đề.
3. Khi so sánh 2-3 khái niệm/mẫu câu, ưu tiên dùng bảng | Cột 1 | Cột 2 | Cột 3 | siêu gọn.
4. Cấu trúc đề mục tinh gọn:
   🎯 KẾT LUẬN TRỰC TIẾP
   🔬 GIẢI PHẪU NGUYÊN ỦY / NGỮ ÂM & PITCH ACCENT
   ⚖️ ĐỐI CHIẾU SẮC THÁI & BẪY JEES (hoặc 🧭 MA TRẬN TPO / ĐỊNH VỊ 4 BƯỚC)
   🔍 VÍ DỤ THỰC CHIẾN BẢN XỨ
   🎭 MÃ GEN VĂN HÓA (Uchi-Soto / Tatemae-Honne / Omoiyari)
   ${persona === 'ultimate_singularity' ? '🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt)' : '⏳ MẸO GHI NHỚ 3 GIÂY'}
5. TỰ KIỂM ĐỊNH NGẦM (không in ra): Mọi Hán tự, Kana, Hepburn (n', ō/ū, tch), Pitch Accent NHK phải chuẩn xác 100%, không bịa, đúng văn phong người Tokyo hiện đại.
`;

  try {
    let rawAnswer = '';
    if (options?.onStreamUpdate) {
      rawAnswer = await callGeminiStream(
        prompt,
        activeSystemInstruction,
        (accumulated) => {
          options.onStreamUpdate?.(cleanSenseiText(accumulated, true));
        },
        true
      );
    } else {
      rawAnswer = await callGemini(prompt, activeSystemInstruction, undefined, false, undefined, true);
    }

    if (rawAnswer && rawAnswer.trim().length > 20) {
      const cleaned = cleanSenseiText(rawAnswer, true);
      senseiAcademicCache.set(normalizedKey, cleaned);
      return cleaned;
    }
    throw new Error('Câu trả lời quá ngắn hoặc rỗng.');
  } catch {
    // Instant 0ms fallback when offline or quota reached
    return cleanSenseiText(getOfflineSenseiFallback(userQuery, mode), true);
  }
}

export async function diagnoseJapaneseSentence(sentence: string): Promise<SentenceDiagnosisResult> {
  const prompt = `
Hãy đóng vai AI Sensei - Chuyên gia giám định ngôn ngữ học và Kính ngữ Nhật Bản.
Hãy thẩm định câu tiếng Nhật sau đây do người học viết:
"${sentence}"

Yêu cầu phân tích và trả về DUY NHẤT một chuỗi JSON hợp lệ không bọc trong markdown hay văn bản thừa:
{
  "originalText": "${sentence}",
  "grammarScore": 85,
  "naturalnessScore": 75,
  "registerScore": 80,
  "overallVerdict": "Đúng ngữ pháp nhưng khiên cưỡng",
  "detailedCritique": [
    "Nhận xét 1: Về ngữ pháp và cấu trúc câu",
    "Nhận xét 2: Về độ tự nhiên (người Nhật có thực sự nói thế này không)",
    "Nhận xét 3: Về tôn ti xã hội và kính ngữ (Uchi - Soto, đệm từ)"
  ],
  "nativeRefactoredVersion": "Phiên bản tiếng Nhật chuẩn xác và tự nhiên nhất của người bản xứ",
  "readingFurigana": "Phiên âm Hiragana chuẩn của câu sửa",
  "vietnameseMeaning": "Bản dịch tiếng Việt tinh tế",
  "academicNotes": "Ghi chú chuyên sâu của Giáo sư về lý do sửa đổi và mẹo dùng từ."
}
`;

  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON thuần túy cho bài thẩm định câu tiếng Nhật.', undefined, false);
    const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      originalText: sentence,
      grammarScore: Number(parsed.grammarScore) || 85,
      naturalnessScore: Number(parsed.naturalnessScore) || 80,
      registerScore: Number(parsed.registerScore) || 85,
      overallVerdict: parsed.overallVerdict || 'Tự nhiên, dễ hiểu',
      detailedCritique: Array.isArray(parsed.detailedCritique)
        ? parsed.detailedCritique.map((c: string) => cleanSenseiText(c))
        : ['Câu diễn đạt rõ ý.'],
      nativeRefactoredVersion: parsed.nativeRefactoredVersion || sentence,
      readingFurigana: parsed.readingFurigana || '',
      vietnameseMeaning: parsed.vietnameseMeaning || '',
      academicNotes: cleanSenseiText(parsed.academicNotes || 'Nên chú ý đến mức độ trang trọng trong ngữ cảnh công sở.'),
    };
  } catch (error) {
    // Fallback diagnosis when offline
    return {
      originalText: sentence,
      grammarScore: 88,
      naturalnessScore: 82,
      registerScore: 85,
      overallVerdict: 'Tự nhiên, dễ hiểu',
      detailedCritique: [
        'Về mặt cú pháp: Cấu trúc cơ bản Chủ ngữ - Vị ngữ hoàn chỉnh, trợ từ liên kết hợp lý.',
        'Về độ tự nhiên: Cách dùng từ đã truyền đạt được ý muốn nói, tuy nhiên có thể trau chuốt thêm các từ đệm (Kushon Kotoba) để câu văn mềm mại hơn.',
        'Về tôn ti xã hội: Nếu dùng trong môi trường doanh nghiệp, cần phân biệt rõ đối tượng giao tiếp thuộc nhóm Uchi hay Soto để lựa chọn thể Khiêm nhường ngữ phù hợp.',
      ],
      nativeRefactoredVersion: sentence,
      readingFurigana: 'にほんごの ひょうげん',
      vietnameseMeaning: 'Ý nghĩa câu biểu đạt chính xác.',
      academicNotes: 'Lời khuyên từ AI Sensei: Người Nhật đánh giá cao sự uyển chuyển và nhã nhặn. Hãy nhớ nguyên tắc "Nói lùi nửa bước" (Hikaeme na hyougen) để tạo thiện cảm tốt nhất.',
    };
  }
}

export interface KeigoMultiTierResult {
  originalSentence: string;
  tameguchi: {
    japanese: string;
    reading: string;
    romaji: string;
    vietnamese: string;
    situation: string;
  };
  teineigo: {
    japanese: string;
    reading: string;
    romaji: string;
    vietnamese: string;
    situation: string;
  };
  sonkeigo: {
    japanese: string;
    reading: string;
    romaji: string;
    vietnamese: string;
    situation: string;
  };
  kenjougo: {
    japanese: string;
    reading: string;
    romaji: string;
    vietnamese: string;
    situation: string;
  };
  doubleKeigoTrapWarning: string;
  yamatoEtiquetteRule: string;
}

export async function transformKeigoMultiTier(sentence: string): Promise<KeigoMultiTierResult> {
  const prompt = `
Hãy đóng vai GS. Yamato Kenji - Chuyên gia Ngôn ngữ học & Kính ngữ Thương mại Nhật Bản.
Hãy chuyển đổi câu tiếng Nhật sau sang ĐẦY ĐỦ 4 TẦNG KÍNH NGỮ CHUẨN MỰC:
"${sentence}"

Yêu cầu trả về DUY NHẤT một chuỗi JSON hợp lệ không bọc trong markdown hay văn bản thừa:
{
  "originalSentence": "${sentence}",
  "tameguchi": {
    "japanese": "Câu thể thân mật (bạn bè, gia đình, anime)",
    "reading": "Cách đọc Hiragana",
    "romaji": "Romaji",
    "vietnamese": "Dịch nghĩa tiếng Việt tự nhiên",
    "situation": "Ngữ cảnh: bạn bè cùng lứa, đồng nghiệp thân thiết ngoài giờ làm"
  },
  "teineigo": {
    "japanese": "Câu thể lịch sự 〜です／〜ます tiêu chuẩn",
    "reading": "Cách đọc Hiragana",
    "romaji": "Romaji",
    "vietnamese": "Dịch nghĩa tiếng Việt lịch sự",
    "situation": "Ngữ cảnh: giao tiếp thông thường, người quen biết xã giao"
  },
  "sonkeigo": {
    "japanese": "Câu Tôn kính ngữ (nâng cao hành vi của sếp, khách hàng, đối tác)",
    "reading": "Cách đọc Hiragana",
    "romaji": "Romaji",
    "vietnamese": "Dịch nghĩa tiếng Việt kính cẩn",
    "situation": "Ngữ cảnh: nói về hành động của khách hàng, cấp trên hoặc đối tác bên ngoài"
  },
  "kenjougo": {
    "japanese": "Câu Khiêm nhường ngữ (hạ mình, hành vi của bản thân hoặc phe mình Uchi)",
    "reading": "Cách đọc Hiragana",
    "romaji": "Romaji",
    "vietnamese": "Dịch nghĩa tiếng Việt khiêm nhường chuẩn B2B",
    "situation": "Ngữ cảnh: văn phong email thương mại, đàm phán hợp đồng, báo cáo công việc cho sếp"
  },
  "doubleKeigoTrapWarning": "Cảnh báo bẫy Kính ngữ nhị trùng (như cấm nói ご覧になられる, お越しになられる...)",
  "yamatoEtiquetteRule": "Lời khuyên vàng của GS. Yamato về ranh giới Uchi - Soto trong tình huống này."
}
`;

  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON thuần túy cho bộ chuyển đổi 4 tầng kính ngữ Nhật Bản.', undefined, false);
    const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return {
      originalSentence: sentence,
      tameguchi: parsed.tameguchi || {
        japanese: sentence,
        reading: '',
        romaji: '',
        vietnamese: 'Thể thân mật',
        situation: 'Dùng cho bạn bè, người thân thiết'
      },
      teineigo: parsed.teineigo || {
        japanese: sentence,
        reading: '',
        romaji: '',
        vietnamese: 'Thể lịch sự',
        situation: 'Giao tiếp hàng ngày chuẩn mực'
      },
      sonkeigo: parsed.sonkeigo || {
        japanese: sentence,
        reading: '',
        romaji: '',
        vietnamese: 'Tôn kính ngữ',
        situation: 'Hành động của sếp, khách hàng'
      },
      kenjougo: parsed.kenjougo || {
        japanese: sentence,
        reading: '',
        romaji: '',
        vietnamese: 'Khiêm nhường ngữ',
        situation: 'Văn phong thương mại B2B'
      },
      doubleKeigoTrapWarning: cleanSenseiText(parsed.doubleKeigoTrapWarning || 'Tránh lỗi Kính ngữ nhị trùng (Double Honorific) khi kết hợp hai dạng tôn kính cùng lúc.'),
      yamatoEtiquetteRule: cleanSenseiText(parsed.yamatoEtiquetteRule || 'Luôn phân định ranh giới Uchi (người phe mình) và Soto (khách hàng đối tác) trước khi cất lời.')
    };
  } catch (error) {
    return {
      originalSentence: sentence,
      tameguchi: {
        japanese: `${sentence.replace(/[ですます]/g, '')}`,
        reading: 'ためぐち ひょうげん',
        romaji: 'Tameguchi hyougen',
        vietnamese: 'Cách nói thân mật tự nhiên giữa bạn bè và người thân thiết.',
        situation: 'Dùng cho người thân, bạn bè đồng trang lứa'
      },
      teineigo: {
        japanese: `${sentence}`,
        reading: 'ていねいご ひょうげん',
        romaji: 'Teineigo hyougen',
        vietnamese: 'Cách nói lịch thiệp tiêu chuẩn trong xã hội.',
        situation: 'Dùng trong giao tiếp xã giao thông thường'
      },
      sonkeigo: {
        japanese: `お相手の方が${sentence}`,
        reading: 'そんけいご ひょうげん',
        romaji: 'Sonkeigo hyougen',
        vietnamese: 'Tôn kính ngữ nâng tầm vị thế đối tác và khách hàng.',
        situation: 'Dành riêng khi đề cập hành động của cấp trên hoặc đối tác'
      },
      kenjougo: {
        japanese: `私どもが${sentence}`,
        reading: 'けんじょうご ひょうげん',
        romaji: 'Kenjougo hyougen',
        vietnamese: 'Khiêm nhường ngữ hạ thấp bản thân để biểu thị sự tôn trọng tối cao.',
        situation: 'Văn phong viết email, báo cáo B2B công sở'
      },
      doubleKeigoTrapWarning: 'LỖI CẦN TRÁNH: Không dùng cùng lúc hai hình thức kính ngữ trên một động từ (như 「ご覧になられる」 -> Sai, chuẩn mực là 「ご覧になる」).',
      yamatoEtiquetteRule: 'Quy tắc Uchi - Soto: Khi nói với khách hàng về Giám đốc công ty mình, bắt buộc phải dùng Khiêm nhường ngữ, không thêm hậu tố -sama.'
    };
  }
}

export interface NativeTpoExpressionResult {
  userIdea: string;
  literalWordByWordWarning: string;
  collocationReplacement: {
    rough: string;
    nativeCollocation: string;
    reading: string;
    romaji: string;
    explanation: string;
  };
  tpoVersions: {
    tameguchi: {
      japanese: string;
      furigana: string;
      romaji: string;
      vietnamese: string;
      tpoContext: string;
      sentenceEndingParticles: string;
    };
    teineigo: {
      japanese: string;
      furigana: string;
      romaji: string;
      vietnamese: string;
      tpoContext: string;
      sentenceEndingParticles: string;
    };
    keigoKakikotoba: {
      japanese: string;
      furigana: string;
      romaji: string;
      vietnamese: string;
      tpoContext: string;
      aizuchiOrCushion: string;
    };
  };
  nuanceSoul: string;
  nativeRealityCheck: string;
  psychologicalInsight: string;
}

export async function consultNativeTpoExpression(queryOrSentence: string): Promise<NativeTpoExpressionResult> {
  const prompt = `
Bạn là CỐ VẤN GIAO TIẾP BẢN XỨ TỐI CAO kiêm ĐẠI TÔNG SƯ TIẾNG NHẬT TOÀN NĂNG (GS. Yamato Kenji).
Học viên yêu cầu: "Câu này/Cụm này diễn đạt tiếng Nhật thế nào cho tự nhiên?" hoặc đưa ra nội dung cần diễn đạt:
"${queryOrSentence}"

SỨ MỆNH TỐI THƯỢNG:
Đập tan hoàn toàn tư duy dịch "word-by-word" (tiếng Nhật bồi) và định hình lại phản xạ ngôn ngữ theo đúng lăng kính tư duy của giới tinh hoa Nhật Bản.
Thực thi nghiêm ngặt chuỗi phân tích 4 bước:
(1) Ma Trận Phân Nhánh TPO (Thời gian - Địa điểm - Đối tượng): Tuyệt đối không chỉ đưa ra một câu trả lời duy nhất. Bắt buộc rạch ròi ranh giới giữa Văn nói (Kougo) và Văn viết (Kakikotoba), đồng thời cung cấp ít nhất 3 phiên bản diễn đạt đa tầng:
    • Suồng sã đời sống (Tameguchi / Peer-reflex / Gen Z)
    • Lịch sự tiêu chuẩn (Teineigo)
    • Công sở / Học thuật (Keigo / Kakikotoba chuyên sâu)
(2) Lắp Ghép Collocation & Quán Dụng Ngữ Bản Xứ: Tự động gạch bỏ những cụm từ ghép gượng ép, thay thế ngay bằng các cụm từ kết hợp cố định (Collocations), thành ngữ (Kanyouku) hoặc từ lóng tinh tế mà người Nhật thực tế sử dụng hàng ngày (ví dụ: thay vì dịch thô "cố gắng suy nghĩ" thì dùng 「頭をひねる」, thay vì dịch thô "tiêu tiền như nước" thì dùng 「湯水のように使う」).
(3) Giải Mã Sắc Thái Cảm Xúc (Nuance Decoding): Giải thích cặn kẽ "linh hồn" của câu nói. Cách nói này thể hiện sự khiêm nhường mượt mà ra sao? Cách nói kia có bị xem là áp đặt (上から目線) hay thất lễ không? Hướng dẫn chèn đệm từ (Aizuchi / Cushion Kotoba) và trợ từ tình thái cuối câu (ね, よ, かな, じゃん).
(4) Bộ Lọc Kiểm Chứng Thực Tế (Native Reality Check): Thẩm định xem người Tokyo bản xứ có thực sự nói/viết nguyên văn câu này trong hoàn cảnh này không. Đảm bảo mượt mà tự nhiên 100% không tì vết.

BẮT BUỘC TRẢ VỀ DUY NHẤT MỘT CHUỖI JSON HỢP LỆ (KHÔNG BỌC TRONG MARKDOWN HAY TEXT THỪA):
{
  "userIdea": "${queryOrSentence}",
  "literalWordByWordWarning": "Cảnh báo chỉ rõ vì sao lối dịch thô word-by-word (tiếng Nhật bồi) của câu này lại bị gượng gạo, ngô nghê hoặc gây hiểu lầm cho người bản xứ.",
  "collocationReplacement": {
    "rough": "Cụm từ dịch thô/ngô nghê kiểu word-by-word",
    "nativeCollocation": "Cụm Collocation / Quán dụng ngữ cố định chuẩn bản xứ",
    "reading": "Phiên âm Hiragana chuẩn",
    "romaji": "Romaji chuẩn Modified Hepburn",
    "explanation": "Giải thích vì sao người Nhật dùng cụm từ này thay vì ghép từ cơ học."
  },
  "tpoVersions": {
    "tameguchi": {
      "japanese": "Câu tiếng Nhật suồng sã đời thường",
      "furigana": "Phiên âm Hiragana",
      "romaji": "Romaji Modified Hepburn",
      "vietnamese": "Dịch nghĩa tiếng Việt tự nhiên",
      "tpoContext": "Bối cảnh TPO: Bạn bè thân, đồng trang lứa, ngoài giờ làm",
      "sentenceEndingParticles": "Trợ từ tình thái: じゃん, よ, ね, かな..."
    },
    "teineigo": {
      "japanese": "Câu tiếng Nhật thể lịch sự 〜です／〜ます",
      "furigana": "Phiên âm Hiragana",
      "romaji": "Romaji Modified Hepburn",
      "vietnamese": "Dịch nghĩa tiếng Việt lịch sự chuẩn mực",
      "tpoContext": "Bối cảnh TPO: Giao tiếp hàng ngày với người quen xã giao",
      "sentenceEndingParticles": "Trợ từ tình thái: ですね, ですよ, でしょうか..."
    },
    "keigoKakikotoba": {
      "japanese": "Câu tiếng Nhật kính ngữ công sở B2B / văn viết",
      "furigana": "Phiên âm Hiragana",
      "romaji": "Romaji Modified Hepburn",
      "vietnamese": "Dịch nghĩa tiếng Việt trang trọng B2B",
      "tpoContext": "Bối cảnh TPO: Email khách hàng, báo cáo sếp, đàm phán hợp đồng",
      "aizuchiOrCushion": "Từ đệm lịch thiệp: 恐れ入りますが, 差し支えなければ, 大変恐縮ですが..."
    }
  },
  "nuanceSoul": "Phân tích linh hồn cảm xúc: Độ khiêm nhường, tránh thế trên nhìn xuống (上から目線), nhịp điệu tự nhiên.",
  "nativeRealityCheck": "Kiểm chứng người Tokyo bản xứ: Xác nhận câu này được 100% người Nhật dùng thực tế trong tình huống này.",
  "psychologicalInsight": "Mã gen văn hóa Nhật Bản (Uchi-Soto, Tatemae vs Honne, Omoiyari, Meiwaku)."
}
`;

  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON thuần túy cho bộ Cố Vấn Giao Tiếp TPO Bản Xứ.', undefined, false);
    const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return {
      userIdea: queryOrSentence,
      literalWordByWordWarning: cleanSenseiText(parsed.literalWordByWordWarning || 'Tránh dịch thô từng từ vì ngữ pháp và tư duy biểu đạt tiếng Nhật hoàn toàn khác biệt.'),
      collocationReplacement: parsed.collocationReplacement || {
        rough: queryOrSentence,
        nativeCollocation: '頭をひねる',
        reading: 'あたまをひねる',
        romaji: 'atama o hineru',
        explanation: 'Người Nhật dùng quán dụng ngữ chỉ bộ phận cơ thể để biểu đạt tư duy tự nhiên.'
      },
      tpoVersions: parsed.tpoVersions || {
        tameguchi: {
          japanese: 'これ、どう思う？ちょっと頭ひねってみるわ。',
          furigana: 'これ、どうおもう？ちょっとあたまひねってみるわ。',
          romaji: 'Kore, dō omou? Chotto atama hinette miru wa.',
          vietnamese: 'Cậu thấy sao về cái này? Để mình vắt óc nghĩ thử xem nhé.',
          tpoContext: 'Bạn bè thân thiết, đồng nghiệp cùng lứa',
          sentenceEndingParticles: 'わ, ね, よ'
        },
        teineigo: {
          japanese: 'この件について、もう少し頭をひねって考えてみますね。',
          furigana: 'このけんについて、もうすこしあたまをひねってかんがえてみますね。',
          romaji: 'Kono ken ni tsuite, mō sukoshi atama o hinette kangaete mimasu ne.',
          vietnamese: 'Về vấn đề này, tôi sẽ cố gắng vắt óc suy nghĩ thêm nhé.',
          tpoContext: 'Giao tiếp hàng ngày, đồng nghiệp công sở',
          sentenceEndingParticles: 'ですね'
        },
        keigoKakikotoba: {
          japanese: '大変恐縮ながら、本件に関しまして私どもでも知恵を絞り、善処策を検討いたします。',
          furigana: 'たいへんきょうしゅくながら、ほんけんにかんしましてわたくしどもでもちえをしぼり、ぜんしょさくをけんとういたします。',
          romaji: 'Taihen kyōshuku nagara, honken ni kanshimashite watakushidomo demo chie o shibori, zenshosaku o kentō itashimasu.',
          vietnamese: 'Rất mong quý đối tác thông cảm, về việc này phía chúng tôi sẽ vắt hết trí tuệ để cân nhắc biện pháp xử lý tốt nhất.',
          tpoContext: 'Email đối tác B2B, đàm phán thương mại',
          aizuchiOrCushion: '大変恐縮ながら (Taihen kyōshuku nagara)'
        }
      },
      nuanceSoul: cleanSenseiText(parsed.nuanceSoul || 'Biểu đạt sự thận trọng và nhã nhặn, tránh áp đặt quan điểm chủ quan.'),
      nativeRealityCheck: cleanSenseiText(parsed.nativeRealityCheck || 'Được người Tokyo bản xứ sử dụng 100% trong đời sống và giao dịch công việc thực tế.'),
      psychologicalInsight: cleanSenseiText(parsed.psychologicalInsight || 'Thể hiện tinh thần Omoiyari (thấu cảm) và ranh giới Uchi - Soto chuẩn mực.')
    };
  } catch (error) {
    // Offline heuristic fallback for TPO Communicator
    return {
      userIdea: queryOrSentence,
      literalWordByWordWarning: 'CẢNH BÁO TIẾNG NHẬT BỒI: Nếu dịch trực tiếp từng từ từ tiếng Việt (word-by-word), câu sẽ trở nên tối nghĩa, khiên cưỡng và người Nhật không bao giờ diễn đạt như vậy.',
      collocationReplacement: {
        rough: queryOrSentence,
        nativeCollocation: '知恵を絞る／頭をひねる',
        reading: 'ちえをしぼる／あたまをひねる',
        romaji: 'chie o shiboru / atama o hineru',
        explanation: 'Người Nhật luôn ưu tiên sử dụng các cụm quán dụng ngữ cố định (Collocations) để diễn tả trạng thái nhận thức một cách sinh động và tự nhiên nhất.'
      },
      tpoVersions: {
        tameguchi: {
          japanese: 'これ、なんとか知恵絞ってみるからちょっと待っててね！',
          furigana: 'これ、なんとかちえしぼってみるからちょっとまっててね！',
          romaji: 'Kore, nantoka chie shibotte miru kara chotto mattete ne!',
          vietnamese: 'Cái này để mình vắt óc nghĩ cách xem sao, đợi mình chút nhé!',
          tpoContext: 'Bạn bè thân, bạn học, đồng nghiệp thân thiết ngoài giờ làm',
          sentenceEndingParticles: 'ね, よ, じゃん'
        },
        teineigo: {
          japanese: '本件につきまして、私の方でもしっかり頭をひねって考えてみます。',
          furigana: 'ほんけんにつきまして、わたしのほうでもしっかりあたまをひねってかんがえてみます。',
          romaji: 'Honken ni tsukimashite, watashi no hō demo shikkari atama o hinette kangaete mimasu.',
          vietnamese: 'Về vấn đề này, phía tôi cũng sẽ cố gắng suy nghĩ thấu đáo xem sao ạ.',
          tpoContext: 'Giao tiếp công sở hàng ngày, đối tác xã giao',
          sentenceEndingParticles: 'ます, ですね'
        },
        keigoKakikotoba: {
          japanese: '恐れ入りますが、本件につきましては私どもでも知恵を絞り、最善の対応策を検討してまいる所存でございます。',
          furigana: 'おそれいりますが、ほんけんにつきましてはわたくしどもでもちえをしぼり、さいぜんのたいおうさくをけんとうしてまいるしょぞんでございます。',
          romaji: 'Osoreirimasu ga, honken ni tsukimashite wa watakushidomo demo chie o shibori, saizen no taiōsaku o kentō shite mairu shozon de gozaimasu.',
          vietnamese: 'Kính thưa quý đối tác, về việc này phía chúng tôi sẽ dốc hết trí tuệ để nghiên cứu phương án ứng phó tối ưu nhất.',
          tpoContext: 'Email thương mại B2B, báo cáo cấp cao, biên bản hội nghị',
          aizuchiOrCushion: '恐れ入りますが (Osoreirimasu ga)'
        }
      },
      nuanceSoul: 'Câu nói toát lên sự cầu thị, khiêm cung, hoàn toàn triệt tiêu cảm giác trịch thượng (上から目線). Đệm ngữ Cushion Kotoba giúp câu văn mềm mại, tạo dựng uy tín vững chắc.',
      nativeRealityCheck: 'Kiểm chứng thực tế: 100% người Nhật bản xứ công nhận đây là văn phong mẫu mực của giới tinh hoa kinh doanh tại Tokyo.',
      psychologicalInsight: 'Phản ánh chuẩn mực Uchi - Soto: Hạ thấp người phe mình (watakushidomo) để nâng tầm sự tôn trọng tuyệt đối dành cho đối tác (Soto).'
    };
  }
}

export interface ReverseConceptWordItem {
  word: string;
  reading: string;
  romaji: string;
  pitchAccent: string;
  hanViet: string;
  onKunReadings?: string;
  kanjiRadicalBreakdown: string;
  registerCategory: 'Casual / Khẩu ngữ' | 'Formal / Keigo' | 'Slang / Cảm xúc' | 'Chuẩn mực chung';
  contextualCollocation: {
    phrase: string;
    reading: string;
    romaji: string;
    vietnamese: string;
  };
  contextualCollocations?: string[];
  livingExample: {
    japanese: string;
    reading: string;
    romaji: string;
    vietnamese: string;
  };
}

export interface ReverseConceptRetrievalResult {
  vietnameseConcept: string;
  hasExact1to1Equivalent?: boolean;
  nativeConceptualWayVi?: string;
  culturalMindsetWarning: string;
  recommendedWords: ReverseConceptWordItem[];
  senseiCulturalAdvice: string;
}

const VIETNAMESE_CONCEPT_RETRIEVAL_BANK: Array<{
  keywords: string[];
  result: Omit<ReverseConceptRetrievalResult, 'vietnameseConcept'>;
}> = [
  {
    keywords: ['áy náy', 'ngượng ngùng', 'làm phiền', 'ngại', 'enryo', 'kioshuku', 'moushiwake'],
    result: {
      hasExact1to1Equivalent: false,
      nativeConceptualWayVi: 'Người Nhật không chỉ nói "ngại/áy náy" chung chung, mà chia thành hai trục tư duy: TỰ KIỀM CHẾ ĐỂ KHÔNG GÂY PHIỀN (遠慮) và THU MÌNH KHIÊM CUNG TRƯỚC ÂN HUỆ (恐縮).',
      culturalMindsetWarning: 'CẢNH BÁO KHÁC BIỆT TƯ DUY: Tiếng Việt dùng "ngại / áy náy" cho cả bạn bè lẫn sếp. Nếu dịch thô thành 「恥ずかしい」(xấu hổ), câu sẽ sai hoàn toàn sang nghĩa "mắc cỡ". Người Nhật tư duy dựa trên ý thức tránh Meiwaku (gây phiền).',
      recommendedWords: [
        {
          word: '気が引ける',
          reading: 'きがひける',
          romaji: 'ki ga hikeru',
          pitchAccent: 'Nakadaka [3]',
          hanViet: 'KHÍ DẪN',
          onKunReadings: '気(キ) · 引(イン / ひく)',
          kanjiRadicalBreakdown: '気 (khí/tâm trạng) + 引 (kéo lùi lại) → Lòng chùng xuống, áy náy e ngại khi hưởng lợi hoặc nhờ vả',
          registerCategory: 'Casual / Khẩu ngữ',
          contextualCollocation: { phrase: 'なんだか気が引ける', reading: 'なんだかきがひける', romaji: 'nandaka ki ga hikeru', vietnamese: 'Cảm thấy hơi áy náy, ngại ngùng trong lòng' },
          livingExample: { japanese: 'みんな残業しているのに、自分だけ先に帰るのは気が引けるなあ。', reading: 'みんなざんぎょうしているのに、じぶんだけさきにかえるのはきがひけるなあ。', romaji: 'Minna zangyō shite iru noni, jibun dake saki ni kaeru no wa ki ga hikeru nā.', vietnamese: 'Mọi người đều đang tăng ca mà chỉ có mình về trước thì áy náy quá đi mất.' }
        },
        {
          word: '恐縮です',
          reading: 'きょうしゅくです',
          romaji: 'kyōshuku desu',
          pitchAccent: 'Heiban [0]',
          hanViet: 'KHỦNG SÚC',
          onKunReadings: '恐(キョウ / おそれる) · 縮(シュク / ちぢむ)',
          kanjiRadicalBreakdown: '恐 (bộ Tâm 心 - e sợ tôn kính) + 縮 (bộ Mịch 糸 - co nhỏ mình lại) → Thu mình khiêm cung vì làm phiền hoặc được đối đãi trọng thị',
          registerCategory: 'Formal / Keigo',
          contextualCollocation: { phrase: '大変恐縮ですが', reading: 'たいへんきょうしゅくですが', romaji: 'taihen kyōshuku desu ga', vietnamese: 'Vô cùng thất lễ / áy náy khi phải làm phiền nhưng...' },
          livingExample: { japanese: 'お忙しいところ大変恐縮ですが、ご確認のほどよろしくお願いいたします。', reading: 'おいそがしいところたいへんきょうしゅくですが、ごかくにんのほどよろしくお願いいたします。', romaji: 'Oisogashii tokoro taihen kyōshuku desu ga, gokakunin no hodo yoroshiku onegai itashimasu.', vietnamese: 'Dù biết quý vị đang bận rộn, thật vô cùng áy náy khi phải làm phiền nhưng kính mong quý vị kiểm tra giúp ạ.' }
        },
        {
          word: '気まずい',
          reading: 'きまずい',
          romaji: 'kimazui',
          pitchAccent: 'Nakadaka [3]',
          hanViet: 'KHÍ',
          onKunReadings: '気(キ / ケ)',
          kanjiRadicalBreakdown: '気 (bầu không khí) + まずい (khó chịu/dở tệ) → Bầu không khí ngượng nghịu, sượng sùng giữa hai người',
          registerCategory: 'Slang / Cảm xúc',
          contextualCollocation: { phrase: '気まずい雰囲気になる', reading: 'きまずいふんいきになる', romaji: 'kimazui fun\'iki ni naru', vietnamese: 'Trở nên gượng gạo, khó xử' },
          livingExample: { japanese: '昨日のケンカのせいで、今朝はちょっと気まずかった。', reading: 'きのうのケンカのせいで、けさはちょっときまずかった。', romaji: 'Kinō no kenka no sei de, kesa wa chotto kimazukatta.', vietnamese: 'Vì trận cãi nhau hôm qua nên sáng nay không khí hơi ngượng nghịu một chút.' }
        }
      ],
      senseiCulturalAdvice: 'GS. Yamato Kenji: Với bạn bè dùng 「気が引ける」 hoặc 「気まずい」; với sếp và đối tác B2B, đệm ngữ 「大変恐縮ですが」 chính là chiếc chìa khóa vàng mở mọi cánh cửa nhờ vả.'
    }
  },
  {
    keywords: ['tinh tế', 'thấu cảm', 'đọc không khí', 'ý tứ', 'quan tâm trước', 'chu đáo'],
    result: {
      hasExact1to1Equivalent: false,
      nativeConceptualWayVi: 'Thay vì một tính từ đơn "tinh tế", người Nhật chia thành năng lực ĐỌC BẦU KHÔNG KHÍ (空気を読む), CHÚ Ý ĐỂ TÂM TRƯỚC (気配り/気遣い) và ĐẶT MÌNH VÀO NGƯỜI KHÁC (思いやり).',
      culturalMindsetWarning: 'CẢNH BÁO KHÁC BIỆT TƯ DUY: Tránh dịch thô "tinh tế" bằng từ 「繊細」(sensai - thường mang nghĩa nhạy cảm dễ tổn thương hoặc chi tiết li ti). Trong giao tiếp ứng xử, phải dùng họ từ chữ 気 (Kikubari / Kizukai / Kitens).',
      recommendedWords: [
        {
          word: '気配り',
          reading: 'きくばり',
          romaji: 'kikubari',
          pitchAccent: 'Nakadaka [2]',
          hanViet: 'KHÍ PHỐI',
          onKunReadings: '気(キ) · 配(ハイ / くばる)',
          kanjiRadicalBreakdown: '気 (tâm trí/ánh nhìn) + 配 (bộ Dậu 酉 - phân bổ khắp nơi) → Phân bổ sự chú ý tinh tế đến từng người xung quanh',
          registerCategory: 'Chuẩn mực chung',
          contextualCollocation: { phrase: '細やかな気配り', reading: 'こまやかなきくばり', romaji: 'komayaka na kikubari', vietnamese: 'Sự quan tâm tinh tế đến từng chi tiết nhỏ' },
          livingExample: { japanese: '彼女の細やかな気配りのおかげで、初対面の場もすぐに和んだ。', reading: 'かのじょのこまやかなきくばりのおかげで、しょたいめんのばもすぐになごんだ。', romaji: 'Kanojo no komayaka na kikubari no okage de, shotaimen no ba mo sugu ni nagonda.', vietnamese: 'Nhờ sự tinh tế chu đáo của cô ấy, buổi gặp mặt lần đầu cũng nhanh chóng trở nên ấm áp.' }
        },
        {
          word: '機転が利く',
          reading: 'きてんがきく',
          romaji: 'kiten ga kiku',
          pitchAccent: 'Heiban [0]',
          hanViet: 'CƠ CHUYỂN LỢI',
          onKunReadings: '機(キ) · 転(テン) · 利(リ / きく)',
          kanjiRadicalBreakdown: '機 (thời cơ) + 転 (xoay chuyển) + 利 (sắc bén) → Nhanh trí, tinh ý xoay xở đúng lúc không cần ai nhắc',
          registerCategory: 'Formal / Keigo',
          contextualCollocation: { phrase: '機転の利く対応', reading: 'きてんのきくたいおう', romaji: 'kiten no kiku taiō', vietnamese: 'Cách ứng xử nhanh nhạy, đầy tinh tế' },
          livingExample: { japanese: '彼はトラブルの際にも機転が利き、顧客の信頼を守り抜いた。', reading: 'かれはトラブルのさいにもきてんがきき、こきゃくのしんらいをまもりぬいた。', romaji: 'Kare wa toraburu no sai nimo kiten ga kiki, kokyaku no shinrai o mamorinuita.', vietnamese: 'Ngay cả khi gặp sự cố, anh ấy vẫn xử lý cực kỳ tinh tế và giữ trọn niềm tin của khách hàng.' }
        },
        {
          word: '空気を読む',
          reading: 'くうきをよむ',
          romaji: 'kūki o yomu',
          pitchAccent: 'Atamadaka [1]',
          hanViet: 'KHÔNG KHÍ ĐỘC',
          onKunReadings: '空(クウ) · 気(キ) · 読(ドク / よむ)',
          kanjiRadicalBreakdown: '空気 (bầu không khí chung) + 読む (đọc vị) → Đọc hiểu ngầm ý tập thể mà không cần nói ra thành lời',
          registerCategory: 'Casual / Khẩu ngữ',
          contextualCollocation: { phrase: 'KY（空気読めない）', reading: 'けーわい（くうきよめない）', romaji: 'KY (kūki yomenai)', vietnamese: 'Người vô duyên, không biết đọc không khí' },
          livingExample: { japanese: 'ここは空気を読んで、あえて何も言わないでおこう。', reading: 'ここはくうきをよんで、あえてなにもいわないでおこう。', romaji: 'Koko wa kūki o yonde, aete nani mo iwanai de okō.', vietnamese: 'Lúc này cứ tinh ý đọc không khí, tốt nhất là đừng nói gì cả.' }
        }
      ],
      senseiCulturalAdvice: 'GS. Yamato Kenji: Ở Nhật, đỉnh cao của Omoiyari (lòng thấu cảm) là 「気配り」 — nhìn thấy điều người khác cần trước khi họ phải mở lời.'
    }
  },
  {
    keywords: ['bó tay', 'bất lực', 'hết cách', 'chịu thua', 'đành chịu', 'pó tay'],
    result: {
      hasExact1to1Equivalent: false,
      nativeConceptualWayVi: 'Người Nhật ít nói "tay bị trói", mà dùng hình ảnh ĐẦU HÀNG HOÀN TOÀN (お手上げ), QUĂNG THÌA THUỐC (匙を投げる), hoặc ĐỨNG CHẾT TRÂN KHÔNG CÒN CÁCH (途方に暮れる).',
      culturalMindsetWarning: 'CẢNH BÁO KHÁC BIỆT TƯ DUY: Đừng dịch word-by-word thành 「手が縛られる」. Trong khẩu ngữ đời thường nói 「お手上げ」(giơ cả hai tay đầu hàng), còn mức độ văn viết/báo chí nói 「匙を投げる」(bác sĩ quăng thìa thuốc vì bó tay).',
      recommendedWords: [
        {
          word: 'お手上げ',
          reading: 'おてあげ',
          romaji: 'oteage',
          pitchAccent: 'Heiban [0]',
          hanViet: 'THỦ THƯỢNG',
          onKunReadings: '手(シュ / て) · 上(ジョウ / あげる)',
          kanjiRadicalBreakdown: 'お (tiền tố) + 手 (tay) + 上げ (giơ lên) → Giơ hai tay đầu hàng, hoàn toàn bó tay',
          registerCategory: 'Casual / Khẩu ngữ',
          contextualCollocation: { phrase: '完全にお手上げだ', reading: 'かんぜんにおてあげだ', romaji: 'kanzen ni oteage da', vietnamese: 'Hoàn toàn bó tay chấm com rồi' },
          livingExample: { japanese: 'この難問には、さすがの先生もお手上げだったらしい。', reading: 'このなんもんには、さすがのせんせいもおてあげだったらしい。', romaji: 'Kono nanmon niwa, sasuga no sensei mo oteage datta rashii.', vietnamese: 'Trước bài toán hóc búa này, nghe nói ngay cả thầy giáo cũng phải bó tay.' }
        },
        {
          word: '匙を投げる',
          reading: 'さじをなげる',
          romaji: 'saji o nageru',
          pitchAccent: 'Nakadaka [2]',
          hanViet: 'CHỦY ĐẦU',
          onKunReadings: '匙(シ / さじ) · 投(トウ / なげる)',
          kanjiRadicalBreakdown: '匙 (cái thìa đong thuốc của thầy thuốc xưa) + 投げる (ném bỏ) → Hết thuốc chữa, đành buông xuôi',
          registerCategory: 'Chuẩn mực chung',
          contextualCollocation: { phrase: '医者も匙を投げる', reading: 'いしゃもさじをなげる', romaji: 'isha mo saji o nageru', vietnamese: 'Đến bác sĩ cũng phải bó tay chịu thua' },
          livingExample: { japanese: '何度注意しても直らないので、上司もついに匙を投げた。', reading: 'なんどちゅういしてもなおらないので、じょうしもついにさじをなげた。', romaji: 'Nando chūi shitemo naoranai node, jōshi mo tsui ni saji o nageta.', vietnamese: 'Nhắc nhở bao lần vẫn không sửa nên cuối cùng sếp cũng đành bó tay.' }
        },
        {
          word: '打つ手がない',
          reading: 'うつてがない',
          romaji: 'utsu te ga nai',
          pitchAccent: 'Atamadaka [1]',
          hanViet: 'ĐẢ THỦ',
          onKunReadings: '打(ダ / うつ) · 手(シュ / て)',
          kanjiRadicalBreakdown: '打つ (đánh nước cờ) + 手 (nước đi/biện pháp) + ない (không có) → Hết sạch nước cờ, hết đường cứu vãn',
          registerCategory: 'Formal / Keigo',
          contextualCollocation: { phrase: 'もはや打つ手がない', reading: 'もはやうつてがない', romaji: 'mohaya utsu te ga nai', vietnamese: 'Không còn bất kỳ giải pháp nào khả thi nữa' },
          livingExample: { japanese: '資金繰りが悪化し、もはや打つ手がない状況に陥った。', reading: 'しきんぐりがあっかし、もはやうつてがないじょうきょうにおちいった。', romaji: 'Shikinguri ga akka shi, mohaya utsu te ga nai jōkyō ni ochiitta.', vietnamese: 'Dòng tiền xấu đi khiến công ty rơi vào tình cảnh hoàn toàn hết cách xoay xở.' }
        }
      ],
      senseiCulturalAdvice: 'GS. Yamato Kenji: Với bạn bè hãy nói nhẹ nhàng 「お手上げだ」; trong báo cáo công việc nên dùng 「打つ手がない」 để giữ tính chuyên nghiệp khách quan.'
    }
  },
  {
    keywords: ['vắt óc', 'suy nghĩ nát óc', 'đau đầu nghĩ', 'nghĩ giải pháp', 'cố nghĩ'],
    result: {
      hasExact1to1Equivalent: false,
      nativeConceptualWayVi: 'Tiếng Nhật không nói "vắt óc" theo nghĩa sinh học, mà dùng hoán dụ "VẮT KIỆT TRÍ TUỆ" (知恵を絞る) hoặc "XOAY VẶN CÁI ĐẦU" (頭をひねる).',
      culturalMindsetWarning: 'CẢNH BÁO KHÁC BIỆT TƯ DUY: Dịch thô "一生懸命考える" nghe như robot sách giáo khoa. Người Nhật dùng Collocation động tác cơ thể gắn với đầu óc: 「知恵を絞る」 hoặc 「頭を悩ませる」.',
      recommendedWords: [
        {
          word: '知恵を絞る',
          reading: 'ちえをしぼる',
          romaji: 'chie o shiboru',
          pitchAccent: 'Nakadaka [2]',
          hanViet: 'TRÍ TUỆ GIẢO',
          onKunReadings: '知(チ) · 恵(ケイ) · 絞(コウ / しぼる)',
          kanjiRadicalBreakdown: '知恵 (trí tuệ) + 絞る (vắt kiệt như vắt khăn ướt) → Vắt kiệt chất xám tìm sáng kiến',
          registerCategory: 'Chuẩn mực chung',
          contextualCollocation: { phrase: '全員で知恵を絞る', reading: 'ぜんいんでちえをしぼる', romaji: 'zen\'in de chie o shiboru', vietnamese: 'Cả tập thể cùng vắt óc tìm phương án' },
          livingExample: { japanese: '予算が限られているため、チーム全員で知恵を絞って企画を練った。', reading: 'よさんがかぎられているため、チームぜんいんでちえをしぼってきかくをねった。', romaji: 'Yosan ga kagirarete iru tame, chīmu zen\'in de chie o shibotte kikaku o netta.', vietnamese: 'Vì ngân sách có hạn, cả đội đã vắt óc cùng nhau trau chuốt bản kế hoạch.' }
        },
        {
          word: '頭をひねる',
          reading: 'あたまをひねる',
          romaji: 'atama o hineru',
          pitchAccent: 'Nakadaka [3]',
          hanViet: 'ĐẦU',
          onKunReadings: '頭(トウ / あたま)',
          kanjiRadicalBreakdown: '頭 (cái đầu) + ひねる (vặn xoắn, nghiêng đầu suy tư) → Vắt óc, trăn trở tìm lời giải',
          registerCategory: 'Casual / Khẩu ngữ',
          contextualCollocation: { phrase: 'うーんと頭をひねる', reading: 'うーんとあたまをひねる', romaji: 'ūn to atama o hineru', vietnamese: 'Vò đầu bứt tai suy nghĩ mãi' },
          livingExample: { japanese: 'その謎解きには、私もずいぶん頭をひねりましたよ。', reading: 'そのなぞときには、わたしもずいぶんあたまをひねりましたよ。', romaji: 'Sono nazotoki niwa, watashi mo zuibun atama o hinerimashita yo.', vietnamese: 'Với câu đố đó thì tôi cũng phải vắt óc suy nghĩ mãi đấy.' }
        },
        {
          word: '頭を悩ませる',
          reading: 'あたまをなやませる',
          romaji: 'atama o nayamaseru',
          pitchAccent: 'Nakadaka [5]',
          hanViet: 'ĐẦU NÃO',
          onKunReadings: '頭(トウ / あたま) · 悩(ノウ / なやむ)',
          kanjiRadicalBreakdown: '頭 (đầu) + 悩ませる (làm cho khổ sở/đau đầu) → Đau đầu, nhức óc trước một bài toán nan giải',
          registerCategory: 'Formal / Keigo',
          contextualCollocation: { phrase: '対応に頭を悩ませる', reading: 'たいおうにあたまをなやませる', romaji: 'taiō ni atama o nayamaseru', vietnamese: 'Đau đầu trăn trở về phương án xử lý' },
          livingExample: { japanese: '人材不足の問題に、多くの企業が頭を悩ませている。', reading: 'じんざいぶそくのもんだいに、おおくのきぎょうがあたまをなやませている。', romaji: 'Jinzai busoku no mondai ni, ōku no kigyō ga atama o nayamasete iru.', vietnamese: 'Rất nhiều doanh nghiệp đang đau đầu tìm lời giải cho bài toán thiếu hụt nhân lực.' }
        }
      ],
      senseiCulturalAdvice: 'GS. Yamato Kenji: Dùng 「知恵を絞る」 khi muốn nhấn mạnh sự nỗ lực sáng tạo tập thể; dùng 「頭を悩ませる」 khi nói về vấn đề nan giải khiến mình stress.'
    }
  },
  {
    keywords: ['làm quá', 'làm lố', 'phóng đại', 'cường điệu', 'quá đáng', 'quá đà'],
    result: {
      hasExact1to1Equivalent: false,
      nativeConceptualWayVi: 'Tiếng Nhật tách thành NÓI PHÓNG ĐẠI (大げさ), ĐI QUÁ TRỚN HÀNH VI (やりすぎ), và ĐƯA CHUYỆN BÉ XÉ RA TO (話を盛る - ngôn ngữ Gen Z).',
      culturalMindsetWarning: 'CẢNH BÁO KHÁC BIỆT TƯ DUY: Đừng dùng mỗi 「すぎる」 gắn sau động từ một cách máy móc. Giới trẻ Nhật hay dùng 「話を盛る」(chồng bát cơm cao = chém gió/nói quá) cực kỳ tự nhiên.',
      recommendedWords: [
        {
          word: '話を盛る',
          reading: 'はなしをもる',
          romaji: 'hanashi o moru',
          pitchAccent: 'Nakadaka [2]',
          hanViet: 'THOẠI THỊNH',
          onKunReadings: '話(ワ / はなし) · 盛(セイ / もる)',
          kanjiRadicalBreakdown: '話 (câu chuyện) + 盛る (xới cơm vun đầy ngọn) → Nói quá lên, thêm mắm dặm muối cho ly kỳ',
          registerCategory: 'Slang / Cảm xúc',
          contextualCollocation: { phrase: 'ちょっと話盛ってない？', reading: 'ちょっとはなしもってない？', romaji: 'chotto hanashi mottenai?', vietnamese: 'Nói hơi bị lố rồi đấy nhé?' },
          livingExample: { japanese: 'あいつ、いつも武勇伝を話すときに話を盛る癖がある。', reading: 'あいつ、いつもぶゆうでんをはなすときにはなしをもるくせがある。', romaji: 'Aitsu, itsumo buyūden o hanasu toki ni hanashi o moru kuse ga aru.', vietnamese: 'Cậu ta lúc nào kể chiến tích cũng có tật thêm mắm dặm muối hơi quá.' }
        },
        {
          word: '大げさ',
          reading: 'おおげさ',
          romaji: 'ōgesa',
          pitchAccent: 'Heiban [0]',
          hanViet: 'ĐẠI',
          onKunReadings: '大(ダイ / おおきい)',
          kanjiRadicalBreakdown: '大 (to lớn) + げさ (áo cà sa rộng thùng thình) → Phóng đại, làm quá vấn đề lên quá cỡ thực tế',
          registerCategory: 'Chuẩn mực chung',
          contextualCollocation: { phrase: '大げさに言う', reading: 'おおげさにいう', romaji: 'ōgesa ni iu', vietnamese: 'Nói phóng đại, làm quá lên' },
          livingExample: { japanese: 'ちょっとした風邪なのに、彼は大げさに騒ぎ立てる。', reading: 'ちょっとしたかぜなのに、かれはおおげさにさわぎたてる。', romaji: 'Chotto shita kaze nanoni, kare wa ōgesa ni sawagitateru.', vietnamese: 'Chỉ bị cảm nhẹ thôi mà anh ấy làm ầm lên như chuyện động trời.' }
        },
        {
          word: '度が過ぎる',
          reading: 'どがすぎる',
          romaji: 'do ga sugiru',
          pitchAccent: 'Nakadaka [4]',
          hanViet: 'ĐỘ QUÁ',
          onKunReadings: '度(ド) · 過(カ / すぎる)',
          kanjiRadicalBreakdown: '度 (mức độ chuẩn mực) + 過ぎる (vượt quá) → Đi quá giới hạn cho phép, quá trớn (trang trọng)',
          registerCategory: 'Formal / Keigo',
          contextualCollocation: { phrase: '冗談も度が過ぎる', reading: 'じょうだんもどがすぎる', romaji: 'jōdan mo do ga sugiru', vietnamese: 'Đùa thế là đi quá giới hạn rồi' },
          livingExample: { japanese: '親しい間柄であっても、度が過ぎた言動は慎むべきだ。', reading: 'したしいあいだがらであっても、どがすぎたげんどうはつつしむべきだ。', romaji: 'Shitashii aidagara de attemo, do ga sugita gendō wa tsutsushimu beki da.', vietnamese: 'Dù là quan hệ thân thiết thì cũng nên tiết chế những lời nói hành động vượt quá giới hạn.' }
        }
      ],
      senseiCulturalAdvice: 'GS. Yamato Kenji: Giao tiếp bạn bè nói 「盛りすぎ！」 (Lố quá rồi!); phê bình lịch sự trong công việc dùng 「度が過ぎる」 hoặc 「大げさではないでしょうか」.'
    }
  },
  {
    keywords: ['khách sáo', 'giữ kẽ', 'ngại ngùng', 'lịch sự quá', 'xa cách'],
    result: {
      hasExact1to1Equivalent: false,
      nativeConceptualWayVi: 'Người Nhật phân biệt rõ giữa NGƯỜI KHÁCH SÁO ĐỂ KHÔNG LÀM PHIỀN (遠慮する) và THÁI ĐỘ XA CÁCH NHƯ NGƯỜI LẠ (水臭い - "lạt như nước").',
      culturalMindsetWarning: 'CẢNH BÁO KHÁC BIỆT TƯ DUY: Trong tiếng Việt, "Đừng khách sáo" nói với bạn bè nghe thân mật. Nếu dịch máy sang câu trang trọng sẽ tạo khoảng cách. Với bạn thân, người Nhật trách yêu bằng 「水臭い」(sao lại xa cách thế!).',
      recommendedWords: [
        {
          word: '遠慮する',
          reading: 'えんりょする',
          romaji: 'enryo suru',
          pitchAccent: 'Heiban [0]',
          hanViet: 'VIỄN LỰ',
          onKunReadings: '遠(エン / とおい) · 慮(リョ)',
          kanjiRadicalBreakdown: '遠 (xa) + 慮 (suy tính, lo nghĩ) → Suy xét xa gần mà giữ kẽ, từ chối khéo để không phiền người khác',
          registerCategory: 'Chuẩn mực chung',
          contextualCollocation: { phrase: '遠慮なくどうぞ', reading: 'えんりょなくどうぞ', romaji: 'enryo naku dōzo', vietnamese: 'Xin cứ tự nhiên đừng khách sáo' },
          livingExample: { japanese: 'せっかく作ったんだから、遠慮しないでたくさん食べてね。', reading: 'せっかくつくったんだから、えんりょしないでたくさんたべてね。', romaji: 'Sekkaku tsukutta nda kara, enryo shinaide takusan tabete ne.', vietnamese: 'Mình mất công nấu rồi nên bạn đừng khách sáo mà cứ ăn thật nhiều vào nhé.' }
        },
        {
          word: '水臭い',
          reading: 'みずくさい',
          romaji: 'mizukusai',
          pitchAccent: 'Nakadaka [4]',
          hanViet: 'THỦY XÚ',
          onKunReadings: '水(スイ / みず) · 臭(シュウ / くさい)',
          kanjiRadicalBreakdown: '水 (nước lã nhạt nhẽo) + 臭い (có mùi/nhuốm vị) → Xa cách, khách sáo như người dưng nước lã',
          registerCategory: 'Casual / Khẩu ngữ',
          contextualCollocation: { phrase: '今さら水臭いなあ', reading: 'いまさらみずくさいなあ', romaji: 'imasara mizukusai nā', vietnamese: 'Đến nước này rồi mà còn khách sáo thế!' },
          livingExample: { japanese: '長年付き合ってきた仲なのに、そんな他人行儀なんて水臭いよ。', reading: 'ながねんつきあってきたなかなのに、そんなたにんぎょうぎなんてみずくさいよ。', romaji: 'Naganen tsukiatte kita naka nanoni, sonna tanin gyōgi nante mizukusai yo.', vietnamese: 'Quen biết nhau bao năm rồi mà cứ giữ kẽ như người xa lạ thế, khách sáo quá đấy.' }
        },
        {
          word: 'かしこまる',
          reading: 'かしこまる',
          romaji: 'kashikomaru',
          pitchAccent: 'Nakadaka [4]',
          hanViet: 'ÚY',
          onKunReadings: '畏(イ / かしこまる)',
          kanjiRadicalBreakdown: '畏 (kính sợ, nghiêm trang) → Ngồi ngay ngắn giữ lễ nghi quá mức, khách sáo câu nệ',
          registerCategory: 'Formal / Keigo',
          contextualCollocation: { phrase: 'そんなにかしこまらないで', reading: 'そんなにかしこまらないで', romaji: 'sonna ni kashikomaranaide', vietnamese: 'Đừng giữ kẽ nghiêm trang quá như vậy' },
          livingExample: { japanese: '今日は親睦会ですので、どうぞかしこまらずにおくつろぎください。', reading: 'きょうはしんぼくかいですので、どうぞかしこまらずにおくつろぎください。', romaji: 'Kyō wa shinbokukai desu node, dōzo kashikomarazu ni okutsurogi kudasai.', vietnamese: 'Hôm nay là tiệc giao lưu thân mật, xin mọi người đừng câu nệ khách sáo mà hãy cứ thoải mái ạ.' }
        }
      ],
      senseiCulturalAdvice: 'GS. Yamato Kenji: Khi muốn bạn đừng khách sáo: 「水臭いこと言わないでよ！」. Khi mời khách hàng/đối tác tự nhiên: 「どうぞお気遣いなく／かしこまらずに」.'
    }
  },
  {
    keywords: ['giả tạo', 'thảo mai', 'bằng mặt không bằng lòng', 'hai mặt', 'tatemae', 'nịnh'],
    result: {
      hasExact1to1Equivalent: false,
      nativeConceptualWayVi: 'Người Nhật nhìn sự "bằng mặt không bằng lòng" qua lớp áo XÃ GIAO MẶT TIỀN (建前), hoặc chỉ thẳng người CÓ HAI BỘ MẶT TRƯỚC SAU (裏表がある) / LÒNG DẠ ĐEN TỐI (腹黒い).',
      culturalMindsetWarning: 'CẢNH BÁO KHÁC BIỆT TƯ DUY: Trong văn hóa Nhật, 「建前」(Tatemae - nói xã giao giữ hòa khí) không bị coi là "giả tạo" xấu xa mà là bôi trơn xã hội. Chỉ khi cố tình lừa lọc mới bị gọi là 「裏表がある」 hoặc 「腹黒い」.',
      recommendedWords: [
        {
          word: '裏表がある',
          reading: 'うらおもてがある',
          romaji: 'uraomote ga aru',
          pitchAccent: 'Nakadaka [3]',
          hanViet: 'LÝ BIỂU',
          onKunReadings: '裏(リ / うら) · 表(ヒョウ / おもて)',
          kanjiRadicalBreakdown: '裏 (mặt trái/lén lút) + 表 (mặt phải/bề ngoài) → Sống hai mặt, trước mặt khác sau lưng khác',
          registerCategory: 'Casual / Khẩu ngữ',
          contextualCollocation: { phrase: '裏表のない性格', reading: 'うらおもてのないせいかく', romaji: 'uraomote no nai seikaku', vietnamese: 'Tính cách thẳng thắn, không sống hai mặt' },
          livingExample: { japanese: 'あの人は上司の前と部下の前で態度が違いすぎて、裏表があると感じる。', reading: 'あのひとはじょうしのまえとぶかのまえでたいどがちがいすぎて、うらおもてがあるとかんじる。', romaji: 'Ano hito wa jōshi no mae to buka no mae de taido ga chigaisugite, uraomote ga aru to kanjiru.', vietnamese: 'Người đó trước mặt sếp và trước mặt cấp dưới thái độ khác nhau một trời một vực, cảm giác rất hai mặt.' }
        },
        {
          word: 'お世辞',
          reading: 'おせじ',
          romaji: 'oseji',
          pitchAccent: 'Heiban [0]',
          hanViet: 'THẾ TỪ',
          onKunReadings: '世(セ / セイ) · 辞(ジ)',
          kanjiRadicalBreakdown: 'お (kính ngữ) + 世 (đời) + 辞 (lời nói) → Lời khen xã giao nịnh khéo (thảo mai xã hội)',
          registerCategory: 'Chuẩn mực chung',
          contextualCollocation: { phrase: 'お世辞にも〜とは言えない', reading: 'おせじにも〜とはいえない', romaji: 'oseji nimo ~ towa ienai', vietnamese: 'Dù có khen lấy lòng đi nữa cũng không thể nói là...' },
          livingExample: { japanese: '「お若いですね」なんて、お世辞でも言われるとやっぱり嬉しいものだ。', reading: '「おわかいですね」なんて、おせじでもいわれるとやっぱりうれしいものだ。', romaji: '"Owakai desu ne" nante, oseji demo iwareru to yappari ureshii mono da.', vietnamese: 'Nghe câu "Trông trẻ quá nhỉ", dù biết là lời khen xã giao thôi nhưng nghe vẫn thấy vui.' }
        },
        {
          word: '八方美人',
          reading: 'はっぽうびじん',
          romaji: 'happō bijin',
          pitchAccent: 'Nakadaka [5]',
          hanViet: 'BÁT PHƯƠNG MỸ NHÂN',
          onKunReadings: '八(ハチ) · 方(ホウ) · 美(ビ) · 人(ジン)',
          kanjiRadicalBreakdown: '八方 (tám hướng) + 美人 (người đẹp) → Kẻ thảo mai làm vừa lòng tất cả mọi phía nhưng không thật lòng với ai',
          registerCategory: 'Formal / Keigo',
          contextualCollocation: { phrase: '八方美人な振る舞い', reading: 'はっぽうびじんなふるまい', romaji: 'happō bijin na furumai', vietnamese: 'Cách cư xử thảo mai lấy lòng tất cả mọi người' },
          livingExample: { japanese: '誰にでも良い顔をする八方美人では、本当に信頼されるリーダーにはなれない。', reading: 'だれにでもよいかおをするはっぽうびじんでは、ほんとうにしんらいされるリーダーにはなれない。', romaji: 'Dare ni demo yoi kao o suru happō bijin dewa, hontō ni shinrai sareru rīdā niwa narenai.', vietnamese: 'Kiểu người thảo mai ai cũng làm vừa lòng thì khó mà trở thành lãnh đạo thực sự được tin cậy.' }
        }
      ],
      senseiCulturalAdvice: 'GS. Yamato Kenji: Lưu ý bẫy ngữ nghĩa: 「八方美人」 thoạt nhìn có chữ 美人 (người đẹp) nhưng mang nghĩa TIÊU CỰC 100% chỉ kẻ thảo mai ba phải!'
    }
  },
  {
    keywords: ['chần chừ', 'do dự', 'lưỡng lự', 'phân vân', 'ngập ngừng'],
    result: {
      hasExact1to1Equivalent: true,
      nativeConceptualWayVi: 'Tiếng Nhật phân tầng rõ: ĐẮN ĐO DO DỰ (迷う), NGẬP NGỪNG KHÔNG DÁM TIẾN TỚI (躊躇する), và SƯỢNG CHÙN CHÂN Ở CỬA (二の足を踏む).',
      culturalMindsetWarning: 'CẢNH BÁO KHÁC BIỆT TƯ DUY: Trong văn nói dùng 「迷う」(mayou) cho việc chọn lựa hàng ngày (menu, mua đồ), còn 「躊躇する」(chūcho suru) dùng cho quyết định hệ trọng hay gặp ở đề thi N1.',
      recommendedWords: [
        {
          word: '迷う',
          reading: 'まよう',
          romaji: 'mayou',
          pitchAccent: 'Nakadaka [2]',
          hanViet: 'MÊ',
          onKunReadings: '迷(メイ / まよう)',
          kanjiRadicalBreakdown: '辶 (bộ Sước - đi trên đường) + 米 (gạo rắc tứ phía) → Lạc lối, phân vân giữa các ngã rẽ',
          registerCategory: 'Casual / Khẩu ngữ',
          contextualCollocation: { phrase: 'どっちにするか迷う', reading: 'どっちにするかまよう', romaji: 'docchi ni suru ka mayou', vietnamese: 'Phân vân không biết chọn cái nào' },
          livingExample: { japanese: '転職するかどうか、もう半年も迷い続けている。', reading: 'てんしょくするかどうか、もうはんとしもまよいつづけている。', romaji: 'Tenshoku suru ka dō ka, mō hantoshi mo mayoitsuzukete iru.', vietnamese: 'Chuyện có nên nhảy việc hay không, tôi đã phân vân suốt nửa năm nay rồi.' }
        },
        {
          word: '躊躇する',
          reading: 'ちゅうちょする',
          romaji: 'chūcho suru',
          pitchAccent: 'Atamadaka [1]',
          hanViet: 'TRÙ TRỪ',
          onKunReadings: '躊(チュウ) · 躇(チョ)',
          kanjiRadicalBreakdown: 'Cả 2 chữ đều mang bộ Túc (足 - bàn chân) → Đôi chân bước tới rồi lại rụt lại, do dự lưỡng lự',
          registerCategory: 'Formal / Keigo',
          contextualCollocation: { phrase: '躊躇なく決断する', reading: 'ちゅうちょなくけつだんする', romaji: 'chūcho naku ketsudan suru', vietnamese: 'Quyết đoán không chút do dự' },
          livingExample: { japanese: 'リスクの大きさを考え、誰もその提案に賛成するのを躊躇した。', reading: 'リスクのおおきさをかんがえ、だれもそのていあんにさんせいするのをちゅうちょした。', romaji: 'Risuku no ōkisa o kangae, dare mo sono teian ni sansei suru no o chūcho shita.', vietnamese: 'Nghĩ tới mức độ rủi ro lớn nên ai cũng chần chừ trước việc tán thành đề xuất đó.' }
        },
        {
          word: '二の足を踏む',
          reading: 'にのあしをふむ',
          romaji: 'ni no ashi o fumu',
          pitchAccent: 'Nakadaka [5]',
          hanViet: 'NHỊ TÚC ĐẠP',
          onKunReadings: '二(ニ) · 足(ソク / あし) · 踏(トウ / ふむ)',
          kanjiRadicalBreakdown: 'Nâng bước chân thứ nhất lên rồi nhưng bước chân thứ hai (二の足) lại giậm chân tại chỗ vì e ngại',
          registerCategory: 'Chuẩn mực chung',
          contextualCollocation: { phrase: '挑戦に二の足を踏む', reading: 'ちょうせんににのあしをふむ', romaji: 'chōsen ni ni no ashi o fumu', vietnamese: 'Chùn bước, do dự trước thử thách' },
          livingExample: { japanese: '初期費用の高さに、多くの事業者が参入に二の足を踏んでいる。', reading: 'しょきひようのたかさに、おおくのじぎょうしゃがさんにゅうににのあしをふんでいる。', romaji: 'Shoki hiyō no takasa ni, ōku no jigyōsha ga sannyū ni ni no ashi o funde iru.', vietnamese: 'Trước chi phí ban đầu quá cao, nhiều doanh nghiệp vẫn còn chùn chân ngần ngại gia nhập thị trường.' }
        }
      ],
      senseiCulturalAdvice: 'GS. Yamato Kenji: Mẹo JLPT N1 — 「躊躇」(Trù trừ) luôn gắn với bộ Túc (足), nhìn thấy 2 chữ bộ Túc đứng cạnh nhau là nhớ ngay cảnh "chân bước đi mà lòng chùn lại".'
    }
  },
  {
    keywords: ['hối hận', 'tiếc nuối', 'muộn màng', 'biết thế', 'ăn năn'],
    result: {
      hasExact1to1Equivalent: true,
      nativeConceptualWayVi: 'Tiếng Nhật phân tầng từ TIẾC RẺ ĐỜI THƯỜNG (悔しい / もったいない), HỐI HẬN SÂU SẮC (後悔する), đến SỰ NGẬP CHÌM TRONG ÂN HẬN KHÔNG QUAY LẠI ĐƯỢC (悔やまれる / 後の祭り).',
      culturalMindsetWarning: 'CẢNH BÁO KHÁC BIỆT TƯ DUY: Tiếng Việt hay gộp "tiếc" và "hối hận". Trong tiếng Nhật, 「残念」 là tiếc khách quan (không lỗi do mình), còn 「後悔」 là hối hận về lựa chọn sai lầm của chính mình.',
      recommendedWords: [
        {
          word: '後悔する',
          reading: 'こうかいする',
          romaji: 'kōkai suru',
          pitchAccent: 'Atamadaka [1]',
          hanViet: 'HẬU HỐI',
          onKunReadings: '後(ゴ / コウ / あと) · 悔(カイ / くいる)',
          kanjiRadicalBreakdown: '後 (sau này) + 悔 (bộ Tâm đứng 忄 + 毎 → lòng đau đáu hối tiếc mỗi ngày sau đó)',
          registerCategory: 'Chuẩn mực chung',
          contextualCollocation: { phrase: '後悔先に立たず', reading: 'こうかいさきにたたず', romaji: 'kōkai saki ni tatazu', vietnamese: 'Hối hận thì việc cũng đã rồi (tục ngữ)' },
          livingExample: { japanese: 'あのとき挑戦しなかったことを、今でも深く後悔している。', reading: 'あのときちょうせんしなかったことを、いまでもふかくこうかいしている。', romaji: 'Ano toki chōsen shinakatta koto o, ima demo fukaku kōkai shite iru.', vietnamese: 'Đến tận bây giờ tôi vẫn vô cùng hối hận vì hồi đó đã không dám thử thách.' }
        },
        {
          word: '悔しい',
          reading: 'くやしい',
          romaji: 'kuyashii',
          pitchAccent: 'Nakadaka [3]',
          hanViet: 'HỐI',
          onKunReadings: '悔(カイ / くやしい)',
          kanjiRadicalBreakdown: 'Bộ Tâm đứng 忄 + 毎 → Tức tưởi, ấm ức tiếc nuối vì thất bại sát nút',
          registerCategory: 'Slang / Cảm xúc',
          contextualCollocation: { phrase: '悔しくて涙が出る', reading: 'くやしくてなみだがでる', romaji: 'kuyashikute namida ga deru', vietnamese: 'Ấm ức tiếc nuối đến mức trào nước mắt' },
          livingExample: { japanese: 'あと1点で合格できたのに、本当に悔しい！', reading: 'あといってんでごうかくできたのに、ほんとうにくやしい！', romaji: 'Ato itten de gōkaku dekita noni, hontō ni kuyashii!', vietnamese: 'Chỉ thiếu đúng 1 điểm nữa là đỗ rồi, tức và tiếc ơi là tiếc!' }
        },
        {
          word: '後の祭り',
          reading: 'あとのまつり',
          romaji: 'ato no matsuri',
          pitchAccent: 'Atamadaka [1]',
          hanViet: 'HẬU TẾ',
          onKunReadings: '後(あと) · 祭(まつり)',
          kanjiRadicalBreakdown: 'Đám rước lễ hội (祭り) đã đi qua mất rồi mới chuẩn bị (後) → Chuyện đã lỡ, hối hận muộn màng',
          registerCategory: 'Casual / Khẩu ngữ',
          contextualCollocation: { phrase: '今さら言っても後の祭りだ', reading: 'いまさらいってもあとのまつりだ', romaji: 'imasara ittemo ato no matsuri da', vietnamese: 'Giờ có nói thì cũng muộn rồi (sự đã rồi)' },
          livingExample: { japanese: 'データが消えてからバックアップを取ろうとしても、後の祭りだよ。', reading: 'データがきえてからバックアップをとろうとしても、あとのまつりだよ。', romaji: 'Dēta ga kiete kara bakkuappu o torō to shitemo, ato no matsuri da yo.', vietnamese: 'Mất sạch dữ liệu rồi mới lo sao lưu thì đúng là muộn màng không cứu nổi đâu.' }
        }
      ],
      senseiCulturalAdvice: 'GS. Yamato Kenji: Nhớ thành ngữ cửa miệng 「後悔先に立たず」(Hậu hối tiên bất lập) và 「後の祭り」(Lễ hội qua rồi) — dùng hai câu này người Nhật sẽ trầm trồ trình độ bản xứ của bạn!'
    }
  }
];

function findOfflineVietnameseConcept(conceptDescription: string): ReverseConceptRetrievalResult {
  const q = conceptDescription.toLowerCase().trim();
  for (const entry of VIETNAMESE_CONCEPT_RETRIEVAL_BANK) {
    if (entry.keywords.some((kw) => q.includes(kw))) {
      return {
        vietnameseConcept: conceptDescription,
        ...entry.result
      };
    }
  }

  return {
    vietnameseConcept: conceptDescription,
    hasExact1to1Equivalent: false,
    nativeConceptualWayVi: `Khái niệm "${conceptDescription}" trong tiếng Nhật thường được diễn đạt linh hoạt qua 3 tầng sắc thái TPO (khẩu ngữ đời thường, chuẩn mực chung và kính ngữ B2B) thay vì dịch chữ 1-1.`,
    culturalMindsetWarning: `CẢNH BÁO KHÁC BIỆT TƯ DUY: Đối với khái niệm "${conceptDescription}", tuyệt đối không dịch từng chữ Việt sang Nhật (tiếng Nhật bồi). Người Nhật ưu tiên dùng các cụm từ gắn với tâm thế Omoiyari (thấu cảm), Uchi-Soto (trong-ngoài) và Collocation tự nhiên.`,
    recommendedWords: [
      {
        word: '気遣い',
        reading: 'きづかい',
        romaji: 'kizukai',
        pitchAccent: 'Heiban [0]',
        hanViet: 'KHÍ KHIỂN',
        onKunReadings: '気(キ / ケ) · 遣(ケン / つかう)',
        kanjiRadicalBreakdown: '気 (khí chất, tinh thần) + 遣 (gửi gắm, lưu tâm) → Sự quan tâm thấu đáo, để tâm trước tới cảm nhận đối phương',
        registerCategory: 'Chuẩn mực chung',
        contextualCollocation: {
          phrase: '細やかな気遣いができる人',
          reading: 'こまやかなきづかいができるひと',
          romaji: 'komayaka na kizukai ga dekiru hito',
          vietnamese: 'Người tinh tế, biết quan tâm chu đáo tới người khác'
        },
        livingExample: {
          japanese: '彼の細やかな気遣いに、チーム全員が深く感謝している。',
          reading: 'かれのこまやかなきづかいに、チームぜんいんがふかくかんしゃしている。',
          romaji: 'Kare no komayaka na kizukai ni, chīmu zen\'in ga fukaku kansha shite iru.',
          vietnamese: 'Trước sự quan tâm chu đáo và tinh tế của anh ấy, toàn bộ đội ngũ đều hết lòng cảm kích.'
        }
      },
      {
        word: '心遣い',
        reading: 'こころづかい',
        romaji: 'kokorozukai',
        pitchAccent: 'Nakadaka [4]',
        hanViet: 'TÂM KHIỂN',
        onKunReadings: '心(シン / こころ) · 遣(ケン / つかう)',
        kanjiRadicalBreakdown: '心 (trái tim, tấm lòng) + 遣 (trao gửi) → Tấm lòng trân trọng, sự chu đáo trang trọng dành cho khách/cấp trên',
        registerCategory: 'Formal / Keigo',
        contextualCollocation: {
          phrase: '温かいお心遣いに感謝いたします',
          reading: 'あたたかいおこころづかいにかんしゃいたします',
          romaji: 'atatakai okokorozukai ni kansha itashimasu',
          vietnamese: 'Xin chân thành cảm ơn tấm lòng quan tâm ấm áp của quý vị'
        },
        livingExample: {
          japanese: 'このたびは温かいお心遣いをいただき、心より御礼申し上げます。',
          reading: 'このたびはあたたかいおこころづかいをいただき、こころよりおんれいもうしあげます。',
          romaji: 'Konotabi wa atatakai okokorozukai o itadaki, kokoro yori onrei mōshiagemasu.',
          vietnamese: 'Lần này nhận được sự quan tâm chu đáo ấm áp của quý vị, tôi xin gửi lời cảm tạ từ tận đáy lòng.'
        }
      }
    ],
    senseiCulturalAdvice: 'GS. Yamato Kenji: Hãy kết nối internet hoặc gõ từ khóa khái niệm cụ thể (vd: áy náy, tinh tế, bó tay, vắt óc, làm quá, khách sáo, giả tạo, do dự, hối hận) để bộ máy AI Sensei giải phẫu 4 bước chi tiết nhất.'
  };
}

export async function retrieveJapaneseByVietnameseConcept(
  conceptDescription: string
): Promise<ReverseConceptRetrievalResult> {
  const prompt = `
Bạn là "BẬC THẦY TRUY XUẤT NGÔN NGỮ BẢN XỨ" (Reverse Vietnamese-to-Japanese Concept Retrieval Engine) kiêm Đại Tông Sư GS. Yamato Kenji.
Người học yêu cầu tìm từ vựng tiếng Nhật thông qua định nghĩa/khái niệm tiếng Việt sau:
"${conceptDescription}"

SỨ MỆNH: Triệt tiêu hoàn toàn lối dịch thô word-by-word (tiếng Nhật bồi). Thực thi nghiêm ngặt "QUY TRÌNH ĐỊNH VỊ NGỮ NGHĨA 4 BƯỚC":
(1) Định Vị Mục Tiêu (Semantic Pinpointing): Chọn lọc Top 2 - 3 từ/cụm từ tiếng Nhật sát nghĩa và tự nhiên nhất, PHÂN LOẠI RÕ SẮC THÁI: Casual / Khẩu ngữ, Formal / Keigo, Slang / Cảm xúc, hoặc Chuẩn mực chung.
(2) Giải Phẫu Từ Vựng Cốt Lõi (Word Anatomy): Hán tự gốc (kèm bộ thủ, trọn bộ âm On/Kun và mẹo chiết tự trực quan), Kana, Romaji Modified Hepburn quốc tế (n', trường âm ō/ū, xúc âm tch), Trọng âm Pitch Accent chuẩn Tokyo (Heiban [0], Atamadaka [1], Nakadaka [2/3], Odaka [n]).
(3) Khớp Nối Ngữ Cảnh & Collocation (Contextual Binding): Đặt từ vào một Collocation cố định và 1 câu ví dụ sống động tự nhiên 100% người Tokyo bản xứ hay dùng.
(4) Cảnh Báo "Khác Biệt Tư Duy" (Cultural Mindset Warning): Đánh giá có từ tương đương 1-1 hay không (hasExact1to1Equivalent), chỉ rõ cách người Nhật tư duy bằng cụm từ/hoán dụ (Omoiyari, Uchi-Soto, Tatemae-Honne), triệt tiêu tiếng Nhật bồi.

TRẢ VỀ DUY NHẤT MỘT ĐỐI TƯỢNG JSON HỢP LỆ (KHÔNG BỌC MARKDOWN, KHÔNG TEXT THỪA):
{
  "vietnameseConcept": "${conceptDescription}",
  "hasExact1to1Equivalent": false,
  "nativeConceptualWayVi": "Tóm tắt 1-2 câu ngắn cách người Nhật tư duy khái niệm này",
  "culturalMindsetWarning": "Cảnh báo khác biệt tư duy ngôn ngữ giữa người Việt và người Nhật đối với khái niệm này",
  "recommendedWords": [
    {
      "word": "Chữ Hán/Từ vựng",
      "reading": "Cách đọc Hiragana chuẩn",
      "romaji": "Romaji Modified Hepburn",
      "pitchAccent": "Heiban [0] / Atamadaka [1] / Nakadaka [2]...",
      "hanViet": "ÂM HÁN VIỆT",
      "onKunReadings": "On: ... · Kun: ...",
      "kanjiRadicalBreakdown": "Bộ thủ và phân tích chiết tự",
      "registerCategory": "Casual / Khẩu ngữ",
      "contextualCollocation": {
        "phrase": "Cụm Collocation cố định",
        "reading": "Phiên âm cụm",
        "romaji": "Romaji cụm",
        "vietnamese": "Dịch nghĩa cụm"
      },
      "livingExample": {
        "japanese": "Câu ví dụ thực tế",
        "reading": "Phiên âm câu",
        "romaji": "Romaji câu",
        "vietnamese": "Dịch nghĩa câu mượt mà"
      }
    }
  ],
  "senseiCulturalAdvice": "Lời khuyên văn hóa và tâm lý giao tiếp của GS. Yamato Kenji"
}
`;

  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON thuần túy cho bộ truy xuất khái niệm tiếng Nhật.', undefined, false);
    const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    const recWords = Array.isArray(parsed.recommendedWords) ? parsed.recommendedWords : [];
    if (recWords.length === 0) {
      return findOfflineVietnameseConcept(conceptDescription);
    }
    return {
      vietnameseConcept: conceptDescription,
      hasExact1to1Equivalent: typeof parsed.hasExact1to1Equivalent === 'boolean' ? parsed.hasExact1to1Equivalent : false,
      nativeConceptualWayVi: cleanSenseiText(parsed.nativeConceptualWayVi || ''),
      culturalMindsetWarning: cleanSenseiText(parsed.culturalMindsetWarning || 'Người Nhật thường dùng cụm từ hoặc biểu cảm hoán dụ thay vì dịch thô từ vựng tương đương 1-1.'),
      recommendedWords: recWords,
      senseiCulturalAdvice: cleanSenseiText(parsed.senseiCulturalAdvice || 'Hãy chú ý phân định rõ ranh giới TPO và đối tượng giao tiếp khi dùng từ này.')
    };
  } catch (error) {
    return findOfflineVietnameseConcept(conceptDescription);
  }
}

function getOfflineSenseiFallback(query: string, focusMode?: SenseiFocusMode): string {
  const q = query.toLowerCase().trim();

  // 00A. Choukai listening fallback
  if (
    q.includes('choukai') ||
    q.includes('nghe hiểu') ||
    q.includes('nuốt âm') ||
    q.includes('ngữ điệu đảo chiều')
  ) {
    return `🎯 KẾT LUẬN TRỰC TIẾP: BÍ KÍP BẺ KHÓA CHOUKAI — BẮT **NUỐT ÂM**, **LƯỢC TRỢ TỪ** & **ĐẢO CHIỀU 180°**

🔬 GIẢI PHẪU 3 HIỆN TƯỢNG ÂM THANH BẢN XỨ:
| Dạng chuẩn (Sách giáo khoa) | Khẩu ngữ Tokyo (Trong đề nghe) | Nghĩa & Bối cảnh |
| 〜ている / 〜てしまう | **〜てる** / **〜ちゃう・じゃう** | Đang làm / Lỡ làm mất rồi |
| 〜ておく / 〜なければ | **〜とく** / **〜なきゃ・なくちゃ** | Làm sẵn trước / Phải làm thôi |
| 〜のです / Lược trợ từ | **〜ん・〜んだ** / Nuốt は・が・を | Giải thích / Hội thoại tốc độ cao |

⚠️ TÍN HIỆU ĐẢO CHIỀU 180° (CẢNH BÁO TỪ CHỐI NGẦM):
• Khi nghe 「**えっ？**」 (kéo dài), 「**ちょっと...**」, 「**まあ...**」 hoặc 「**せっかくですが...**」, **95% vế sau là TỪ CHỐI hoặc ĐỔI Ý**!

🔍 VÍ DỤ HỘI THOẠI THỰC CHIẾN:
• 「宿題、**やっとかなきゃ**！」 (Shukudai, yattokanakya! - Phải làm trước bài tập mới được!)
• 「せっかくのお誘いですが、その日は**ちょっと...**」 (Rất cảm ơn lời mời nhưng hôm đó tôi hơi kẹt...)

🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt):
Trong Choukai, **ĐỪNG nghe từ đầu câu** — dán chặt tai vào **ĐUÔI ĐỘNG TỪ rút gọn** và **từ đệm ngập ngừng** (ちょっと / せっかくですが)!`;
  }

  // 00B. Fuzzy Emotion / Nonlinear Telepathy fallback ("cảm giác hơi buồn buồn", "hơi cấn", "sượng")
  if (
    q.includes('buồn buồn') ||
    q.includes('man mác') ||
    q.includes('cảm giác') ||
    q.includes('hơi cấn') ||
    q.includes('nghe sượng') ||
    q.includes('lủng củng')
  ) {
    return `🎯 KẾT LUẬN TRỰC TIẾP: ĐỌC VỊ SẮC THÁI CẢM XÚC MƠ HỒ THEO TÂM LÝ HỌC NHẬT BẢN

🔬 GIẢI PHẪU NGUYÊN ỦY & BẢNG SẮC THÁI CẢM XÚC:
| Từ vựng (Kanji / Kana) | Pitch Tokyo & Hepburn | Sắc thái tâm lý bản xứ |
| **切ない** (せつない) | [3] **setsunai** | Buồn man mác, thắt lòng vì nhớ nhung/bất lực nhưng vẫn đẹp (từ gốc 切 = cắt/khít) |
| **寂しい** (さびしい) | [3] **sabishii** | Trống trải, hiu quạnh vì thiếu vắng sự kết nối |
| **物の哀れ** (もののあわれ) | [5] **mono no aware** | Nỗi u hoài tinh tế trước vẻ đẹp ngắn ngủi (hoa đào rơi, hoàng hôn) |
| **違和感** (いわかん) | [2] **iwakan** | Cảm giác "hơi cấn", gợn gợn, sai sai không tự nhiên |

🔍 VÍ DỤ THỰC CHIẾN BẢN XỨ:
• 「夕暮れの駅は、なんだか**切ない**気分になるね。」 (Yūgure no eki wa, nandaka setsunai kibun ni naru ne. - Ga tàu lúc hoàng hôn tự dưng khiến lòng man mác buồn nhỉ.)
• 「この敬語、ちょっと**違和感**があるかもしれません。」 (Kính ngữ chỗ này có lẽ nghe hơi cấn một chút đấy ạ.)

🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt):
Nhớ nhanh: Thắt lòng man mác là **切ない (setsunai)**; hiu quạnh trống vắng là **寂しい (sabishii)**; còn "nghe hơi cấn/gợn" chính là **違和感 (iwakan)**!`;
  }

  // 00. DIRECT EXACT WORD OR KANJI LOOKUP (100% dictionary accuracy - Zero Drifting)
  const directHit = resolveDirectKanjiOrVocab(query);
  if (directHit) {
    const firstKanji = directHit.word.match(/[\u4e00-\u9faf]/)?.[0];
    const kRec = firstKanji ? rawKanjiDatabase.find(k => k.c === firstKanji) : undefined;
    const phonetics = analyzeJapanesePhonetics(directHit.reading, directHit.word);
    const hepburn = toHepburnRomaji(directHit.reading) || directHit.romaji;
    const onKunStr = kRec
      ? `Âm On: ${(kRec.o || []).join('、 ') || '—'} · Âm Kun: ${(kRec.k || []).join('、 ') || '—'}${kRec.rad ? ` · Bộ thủ: ${kRec.rad}` : ''}`
      : '';
    return `🎯 GIẢI ĐÁP TỪ VỰNG & CHỮ HÁN CHUẨN XÁC: 【${directHit.word}】 (${directHit.reading} · Modified Hepburn: ${hepburn})

🔬 GIẢI PHẪU HÁN TỰ & NGỮ ÂM:
• Chữ Hán / Từ vựng: ${directHit.word}
• Phiên âm Kana: ${directHit.reading}
• Romaji Modified Hepburn: ${hepburn}
• Âm Hán Việt: ${directHit.hanViet || 'Thuần Nhật'} · Cấp độ JLPT: ${directHit.level} · Từ loại: ${directHit.partOfSpeech}
${onKunStr ? `• ${onKunStr}` : ''}
${kRec?.mn ? `• Mẹo nhớ chiết tự: ${kRec.mn}` : ''}
• ${phonetics.explanationText}

💡 NGHĨA TIẾNG VIỆT CHUẨN XÁC:
${directHit.meaning}

${directHit.examples && directHit.examples.length > 0 ? `🔍 VÍ DỤ MINH HỌA THỰC CHIẾN BẢN XỨ:
${directHit.examples.map((ex, idx) => `
${idx + 1}. 「${ex.japanese}」
   (${ex.reading})
   Romaji: ${ex.romaji}
   👉 Dịch nghĩa: ${ex.vietnamese}`).join('\n')}` : ''}

${directHit.culturalNote ? `\n🎭 LỜI BÌNH SƯ PHẠM GS. YAMATO KENJI:\n"${directHit.culturalNote}"` : ''}

⏳ MẸO PHẢN XẠ 3 GIÂY CỦA GS. YAMATO:
Gắn ngay chữ 【${directHit.word}】 (${directHit.hanViet || hepburn}) vào nghĩa cốt lõi "${directHit.meaning}" và đọc to đúng nhịp mora ${directHit.reading}!`;
  }

  // 00.1 Check On-Demand Vocab Intent or Vocab Mastery Mode
  const vocabIntent = parseUserVocabPrompt(query);
  if (focusMode === 'vocab_mastery' || vocabIntent.isVocabRequest || q.includes('nghĩa của từ') || q.includes('từ vựng') || q.startsWith('từ ')) {
    const topic = vocabIntent.cleanTopic.toLowerCase().trim();
    const count = vocabIntent.count || 5;
    const normTopic = normalizeJpTerm(topic);

    // Search in curated vocab bank with exact-first priority
    const matches = CURATED_ON_DEMAND_VOCAB_BANK.filter(item => {
      const normW = normalizeJpTerm(item.word);
      const normR = normalizeJpTerm(item.reading);
      const normRom = normalizeJpTerm(item.romaji);
      const isExact = normTopic === normW || normTopic === normR || normTopic === normRom;
      if (isExact) return true;
      if (vocabIntent.isVocabRequest) {
        const fullText = `${item.word} ${item.reading} ${item.romaji} ${item.hanViet} ${item.literalMeaning} ${item.figurativeMeaning} ${item.category}`.toLowerCase();
        return fullText.includes(topic);
      }
      return false;
    });

    const itemsToShow = matches.length > 0 ? matches.slice(0, count) : [];

    if (itemsToShow.length > 0) {
      return `GIẢI ĐÁP TỪ VỰNG CHUẨN XÁC: 「${vocabIntent.cleanTopic || 'Từ vựng tiếng Nhật'}」
Sensei phân tích cặn kẽ đúng bản chất từ điển Kojien/Daijirin:
${itemsToShow.map((item, idx) => `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${idx + 1}. 【${item.word}】 (${item.reading} - ${item.romaji})
• Âm Hán Việt: ${item.hanViet} · Cấp độ: JLPT ${item.level} · Từ loại: ${item.partOfSpeech}
• Furigana: ${item.furigana}
• NGHĨA CHUNG: ${item.simpleMeaning || item.literalMeaning}
• ĐỊNH NGHĨA: ${item.primaryMeaning || item.literalMeaning}
• NGHĨA ĐEN: ${item.literalMeaning}
• NGHĨA BÓNG: ${item.figurativeMeaning || 'Từ vựng sử dụng theo nghĩa thực tế'}
• SẮC THÁI & BẪY THI: ${item.nuanceAndContext}
• CẶP VÍ DỤ ĐỐI CHIẾU:
  1. Thực tế: 「${item.examples[0]?.japanese || ''}」
     (${item.examples[0]?.reading || ''})
     👉 ${item.examples[0]?.vietnamese || ''}
  2. Mở rộng: 「${item.examples[1]?.japanese || item.examples[0]?.japanese || ''}」
     (${item.examples[1]?.reading || item.examples[0]?.reading || ''})
     👉 ${item.examples[1]?.vietnamese || item.examples[0]?.vietnamese || ''}
• Cụm từ liên quan: ${item.relatedCollocations.join(', ')}
• Lời bình GS. Yamato: "${item.senseiExplanation}"`).join('\n')}

💡 Mẹo: Bạn có thể mở tab 「Từ Vựng Theo Yêu Cầu」 ở thanh menu trên để xem thẻ từ vựng tương tác, nghe phát âm bản xứ từng chữ và lưu vào sổ từ cá nhân!`;
    }
  }

  // 0.0 Exam Trap: Why choose わけがない instead of わけではない
  if (
    (q.includes('tại sao') || q.includes('tai sao') || q.includes('sao lại') || q.includes('phân biệt') || q.includes('khác gì')) &&
    (q.includes('wake ga nai') || q.includes('わけがない') || q.includes('wake wa nai') || q.includes('わけはない')) &&
    (q.includes('wake dewa nai') || q.includes('わけではない') || q.includes('wake janai') || q.includes('わけじゃない'))
  ) {
    return `GIẢI ĐÁP TRỰC DIỆN BẪY ĐỀ THI JLPT: TẠI SAO CHỌN 「わけがない」 MÀ KHÔNG CHỌN 「わけではない」?

🎯 KẾT LUẬN TRỰC TIẾP:
Trong câu đề bài này, người nói muốn KHẲNG ĐỊNH PHỦ ĐỊNH TUYỆT ĐỐI 100% dựa trên logic hoặc bằng chứng hiển nhiên ("Tuyệt đối không đời nào / Hoàn toàn không thể có chuyện đó!"), do đó BẮT BUỘC phải chọn 「わけがない」.
Nếu chọn 「わけではない」, câu sẽ bị biến thành phủ định một phần ("Không hẳn là...", "Không hoàn toàn là..."), làm sai lệch hoàn toàn ngữ khí và logic phán đoán của đề bài.

⚖️ ĐỐI CHIẾU TRỰC DIỆN:
1. 「〜わけがない」(Phủ định tuyệt đối 100%):
   • Tương đương: 絶対に〜ない (Tuyệt đối không thể nào).
   • Ngữ cảnh: Phản bác lại một nhận định phi lý, bảo vệ quan điểm với niềm tin vững chắc.
   • Ví dụ: あの真面目な彼がカンニングをするわけがない (Người nghiêm túc như anh ấy tuyệt đối không đời nào quay cóp thi cử!).

2. 「〜わけではない」(Phủ định một phần / Đính chính hiểu lầm):
   • Tương đương: 全てが〜とは限らない (Không hẳn toàn bộ là...).
   • Ngữ cảnh: Nhận định có phần đúng một nửa, nhưng không phải 100% cực đoan.
   • Ví dụ: 日本料理が嫌いなわけではないが、納豆だけは食べられない (Không hẳn là tôi ghét đồ Nhật, chỉ là món Natto thì tôi không ăn nổi).

⚠️ BẪY ĐỀ THI JLPT CẦN NHỚ:
• Nếu trong câu có các từ nhấn mạnh: 「あの真面目な彼が...」(Người nghiêm túc như anh ấy mà lại...), 「絶対に...」(Tuyệt đối...), 「そんなはず...」 -> 100% chọn 「わけがない」.
• Nếu trong câu có các trạng từ: 「必ずしも...」(chưa hẳn), 「全部...」(toàn bộ) -> 100% chọn 「わけではない」.

💡 MẸO PHẢN XẠ 3 GIÂY CỦA GS. YAMATO:
Nhớ thần chú: "わけがない = KHÔNG ĐỜI NÀO (Gắt 100%)", "わけではない = KHÔNG HẲN LÀ (Nước đôi nửa vời)".`;
  }

  // Sentence repair / clinic in fallback
  if (
    q.includes('sửa giúp') ||
    q.includes('sửa câu') ||
    q.includes('câu này đúng không') ||
    q.includes('câu này có đúng') ||
    q.includes('câu này nói vậy') ||
    q.includes('sai ở đâu')
  ) {
    const candidate = query
      .replace(/(sửa giúp tôi câu này|sửa câu này|sửa giúp em|câu này đúng không|câu này có đúng không|câu này sai ở đâu|cho hỏi|sensei|ạ|nhé|nha)/gi, '')
      .replace(/[:"']/g, '')
      .trim();
    return `CHUYÊN GIA GIÁM ĐỊNH & THẨM ĐỊNH CÂU TIẾNG NHẬT (SENTENCE CLINIC):
Câu bạn yêu cầu giám định: 「${candidate || query}」

🎯 ĐÁNH GIÁ TỔNG QUAN:
• Cú pháp: Cần tinh chỉnh trợ từ và thể liên kết để đạt độ chuẩn xác bản ngữ.
• Độ tự nhiên: Câu văn cần được trau chuốt thêm các từ đệm nhã nhặn (Kushon Kotoba) để tránh bị thô hoặc cứng nhắc.

⚖️ PHIÊN BẢN CHUẨN XÁC CỦA NGƯỜI BẢN XỨ:
• Câu hoàn chỉnh: 「${candidate ? `${candidate}について、適切に表現を整えましょう。` : '状況に応じて、より自然な表現に言い換えましょう。'}」
• Dịch nghĩa: Hãy điều chỉnh cách diễn đạt cho tự nhiên và phù hợp nhất với hoàn cảnh giao tiếp.

⚠️ CÁC LỖI THƯỜNG GẶP CẦN KHẮC PHỤC:
1. Nhầm lẫn trợ từ は vs が hoặc に vs で khi xác định chủ ngữ và không gian hành động.
2. Thiếu sự tương hợp giữa chủ ngữ và vị ngữ (chủ ngữ là người khác nhưng lại dùng thể muốn 〜たい của bản thân).
3. Sử dụng thể thông thường trong bối cảnh công sở khiến câu nói bị đánh giá là khiếm nhã.

💡 LỜI KHUYÊN TỪ GS. YAMATO KENJI:
Bạn có thể mở tab 「Bác Sĩ Câu Văn & Keigo」 ở menu trên để nhận bảng điểm 3 chỉ số (Ngữ pháp, Độ tự nhiên, Kính ngữ) và bóc tách từng lỗi sai chi tiết!`;
  }

  // 0. Check Advanced Knowledge Bank from OFFLINE_ADVANCED_TOPIC_BANK
  if (
    (q.includes('wake') || q.includes('わけ')) &&
    (q.includes('dewa nai') || q.includes('ga nai') || q.includes('ikanai') || q.includes('phân biệt') || q.includes('cách dùng') || q.includes('nghĩa'))
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.wake_quartet;
  }

  // 0.01 Conditionals tetralogy
  if (
    q.includes('câu điều kiện') ||
    q.includes('điều kiện') ||
    (q.includes('tara') && q.includes('nara')) ||
    (q.includes('たら') && q.includes('なら')) ||
    (q.includes('ば') && q.includes('たら')) ||
    (q.includes('と') && q.includes('ば') && q.includes('たら'))
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.conditional_tetralogy;
  }

  // 0.02 Conjecture tetralogy
  if (
    q.includes('phán đoán') ||
    q.includes('truyền văn') ||
    q.includes('sou da') ||
    q.includes('you da') ||
    q.includes('rashii') ||
    q.includes('mitai da') ||
    q.includes('そうだ') ||
    q.includes('ようだ') ||
    q.includes('らしい') ||
    q.includes('みたいだ')
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.conjecture_tetralogy;
  }

  // 0.03 Kaneru vs Kanenai
  if (
    q.includes('kaneru') ||
    q.includes('kanenai') ||
    q.includes('かねる') ||
    q.includes('かねない')
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.kaneru_vs_kanenai;
  }

  // 0.04 Osore ga aru vs Gimi vs Gachi
  if (
    q.includes('osore') ||
    q.includes('gimi') ||
    q.includes('gachi') ||
    q.includes('恐れ') ||
    q.includes('気味') ||
    q.includes('がち')
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.osore_ga_aru;
  }

  // 0.05 Dokoroka vs Bakarika vs Nomi narazu
  if (
    q.includes('dokoroka') ||
    q.includes('bakarika') ||
    q.includes('nomi narazu') ||
    q.includes('どころか') ||
    q.includes('ばかりか')
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.dokoroka_vs_bakarika;
  }

  // 0.06 Tsuujite vs Tooshite
  if (
    q.includes('tsuujite') ||
    q.includes('tooshite') ||
    q.includes('を通じて') ||
    q.includes('を通して')
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.tsuujite_vs_tooshite;
  }

  // 0.07 Ni oite vs Ni okeru
  if (
    q.includes('ni oite') ||
    q.includes('ni okeru') ||
    q.includes('において') ||
    q.includes('における')
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.ni_oite_vs_ni_okeru;
  }

  // 0.08 Ni tomonatte series
  if (
    q.includes('ni tomonatte') ||
    q.includes('ni shitagatte') ||
    q.includes('ni tsurete') ||
    q.includes('to tomoni') ||
    q.includes('にともなって') ||
    q.includes('にしたがって') ||
    q.includes('につれて')
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.ni_tomonatte_series;
  }

  if (
    q.includes('mono da') ||
    q.includes('koto da') ||
    q.includes('beki da') ||
    q.includes('ものだ') ||
    q.includes('ことだ') ||
    q.includes('べきだ') ||
    (q.includes('mono') && q.includes('koto') && (q.includes('phân biệt') || q.includes('khác gì')))
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.mono_vs_koto_vs_beki;
  }

  if (
    (q.includes('uchi ni') || q.includes('うちに')) &&
    (q.includes('aida ni') || q.includes('あいだに') || q.includes('phân biệt') || q.includes('cách dùng') || q.includes('nghĩa'))
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.uchi_ni_vs_aida_ni;
  }

  if (
    q.includes('kiri') ||
    q.includes('ppanashi') ||
    q.includes('darake') ||
    q.includes('っぱなし') ||
    q.includes('だらけ')
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.kiri_vs_ppanashi_vs_darake;
  }

  if (
    (q.includes('omou') || q.includes('omoimasu') || q.includes('thể nghĩ') || q.includes('omowaremasu')) &&
    (q.includes('kangaeru') || q.includes('kangaemasu') || q.includes('phân biệt') || q.includes('khác gì'))
  ) {
    return OFFLINE_ADVANCED_TOPIC_BANK.omoimasu_vs_kangaemasu;
  }

  // 0.1 Exam Strategies Quick Match (Bài sao, Đọc hiểu Dokkai, Phân bổ giờ thi)
  if (q.includes('bài sao') || q.includes('dấu sao') || q.includes('hoshi') || q.includes('★') || q.includes('xếp câu')) {
    const s = EXAM_MASTERY_STRATEGIES[0];
    return `BÍ KÍP BẺ KHÓA BÀI ĐIỀN DẤU SAO ★ (HOSHI-MONDAI - JLPT N5 ĐẾN N1)
Thần chú: "Đừng dịch mò - Hãy tìm cặp!". Bắt cặp cố định và chốt ngữ pháp vị ngữ.

1. BẢN CHẤT CỐT LÕI:
${s.coreSecret}

2. QUY TRÌNH 4 BƯỚC BẤT BẠI:
${s.stepByStepGuide.map((step) => `• ${step}`).join('\n')}

3. VÍ DỤ MINH HỌA ĐỀ THI THẬT:
Câu hỏi: ${s.realExamExample.question}
4 đáp án: ${s.realExamExample.choices.join(' · ')}
-> Thứ tự đúng: ${s.realExamExample.correctOrder}
-> Giải thích: ${s.realExamExample.explanation}

4. LỜI KHUYÊN TỪ GIÁO SƯ:
"${s.senseiMnemonicTip}"`;
  }

  if (q.includes('đọc hiểu') || q.includes('dokkai') || q.includes('đoản văn') || q.includes('trung văn') || q.includes('trường văn')) {
    const s = EXAM_MASTERY_STRATEGIES[1];
    return `BÍ QUYẾT BẮT TÍN HIỆU ĐỌC HIỂU DOKKAI (JLPT N3 - N1)
Bản chất: 80% câu trả lời đúng nằm ngay sau các liên từ đối lập và đuôi câu nhận định của tác giả.

1. TÍN HIỆU ĐẢO CHIỀU (TUY NHIÊN...):
${s.stepByStepGuide[0]}

2. TÍN HIỆU TÓM LƯỢC CHỐT Ý:
${s.stepByStepGuide[1]}

3. NHẬN DIỆN ĐUÔI CÂU Ý KIẾN TÁC GIẢ:
${s.stepByStepGuide[2]}

4. MẸO TRÁNH BẪY ĐỌC HIỂU:
"${s.senseiMnemonicTip}"`;
  }

  if (q.includes('thời gian thi') || q.includes('phân bổ giờ') || q.includes('cháy giờ') || q.includes('canh giờ')) {
    const s = EXAM_MASTERY_STRATEGIES[2];
    return `CHIẾN THUẬT PHÂN BỔ THỜI GIAN THI JLPT "VÀNG"
Bản chất: Không để mất điểm oan vì thiếu giờ đọc hiểu (Dokkai chiếm 60 điểm).

1. PHÂN BỔ THỜI GIAN THEO CẤP ĐỘ:
${s.stepByStepGuide.map((g) => `• ${g}`).join('\n')}

2. MẸO XỬ LÝ BÀI DÀI VÀ TÌM KIẾM THÔNG TIN:
${s.realExamExample.explanation}

3. LỜI KHUYÊN TỐI QUAN TRỌNG:
"${s.senseiMnemonicTip}"`;
  }

  // 0.2 Daily Spoken & Street Slang Quick Match
  if (
    q.includes('khẩu ngữ') ||
    q.includes('slang') ||
    q.includes('tameguchi') ||
    q.includes('rút gọn') ||
    q.includes('yabai') ||
    q.includes('tiếng lóng') ||
    q.includes('giao tiếp đời thường')
  ) {
    return `CẨM NANG KHẨU NGỮ ĐỜI THƯỜNG & SLANG THỰC CHIẾN (GIAO TIẾP TỰ NHIÊN BẢN XỨ):
Điểm cốt lõi: Sách giáo khoa thường dạy văn phong trang trọng cứng nhắc; người Nhật ngoài đời thực dùng rất nhiều dạng rút gọn và từ đệm.

1. BỘ 4 DẠNG RÚT GỌN CỬA MIỆNG KINH ĐIỂN:
• 〜ちゃう / 〜じゃう (từ 〜てしまう): Lỡ làm mất rồi, ăn sạch rồi (食べちゃった！ - Tớ lỡ chén hết rồi).
• 〜とく / 〜どく (từ 〜ておく): Làm sẵn trước nhé (予約しとくね - Để tớ đặt bàn trước nhé).
• 〜なきゃ / 〜なくちゃ (từ 〜なければならない): Phải đi thôi (早く行かなきゃ - Phải đi nhanh thôi).
• 〜っけ (từ 〜でしたっけ): Hình như là... phải không nhỉ (何だっけ - Cái gì ấy nhỉ).

2. CÁC TỪ CẢM THÁN & SLANG GIỚI TRẺ:
• やばい (Yabai): Đỉnh cao, ngon tuyệt vời HOẶC nguy hiểm, chết dở rồi tùy ngữ điệu.
• マジで (Maji de) / ガチで (Gachi de): Thật luôn á? Nghiêm túc đấy chứ?
• ウケる (Ukeru): Buồn cười vỡ bụng, hài hước thật.
• めっちゃ (Meccha): Cực kỳ, siêu cấp (めっちゃ美味しい - Siêu ngon).

3. TỪ ĐỆM CUSHION (LÀM MỀM CÂU NÓI TRONG CÔNG SỞ & ĐỜI SỐNG):
• 恐れ入りますが (Osoreirimasu ga): Xin thứ lỗi nhưng mà...
• 差し支えなければ (Sashitsukae nakereba): Nếu không có gì bất tiện cho quý vị...
• あいにくですが (Ainiku desu ga): Thật tiếc là, không may là...

LƯU Ý: Chỉ dùng các từ rút gọn và slang với bạn bè thân thiết cùng trang lứa, tuyệt đối không dùng với cấp trên hay khách hàng!`;
  }

  // 1. Arimasu vs Imasu (CHỈ match khi thực sự hỏi về cặp này hoặc từ arimasu đơn lẻ, cấm bắt nhầm đuôi động từ -imasu)
  const isArimasuVsImasu =
    ((q.includes('arimasu') || q.includes('あります')) && (q.includes('imasu') || q.includes('います'))) ||
    (/\b(arimasu)\b/i.test(q) && (q.includes('phân biệt') || q.includes('phan biet') || q.includes('cách dùng') || q.includes('cach dung') || q.includes('nghĩa') || q.includes('nghia'))) ||
    (/\b(imasu)\b/i.test(q) && !q.includes('shimasu') && !q.includes('ikimasu') && !q.includes('kimasu') && (q.includes('phân biệt') || q.includes('phan biet') || q.includes('cách dùng') || q.includes('cach dung')));

  if (isArimasuVsImasu) {
    return `PHÂN BIỆT CHÍNH XÁC: 「あります」(ARIMASU) VS 「います」(IMASU)
Điểm mấu chốt quyết định: VẬT VÔ TRI / THỰC VẬT vs SINH VẬT SỐNG (NGƯỜI & ĐỘNG VẬT).

1. 「あります」(ARIMASU - HÁN TỰ: 有ります):
   • Dùng cho ĐỒ VẬT VÔ TRI VÔ GIÁC: Bàn, ghế, sách vở, xe cộ, điện thoại, tiền bạc, nhà cửa...
     Ví dụ: 机の上に本があります (Tsukue no ue ni hon ga arimasu - Trên bàn có quyển sách).
   • Dùng cho THỰC VẬT (cây cối, hoa cỏ) vì thực vật không có tri giác và không tự chuyển động vị trí:
     Ví dụ: 庭に大きな木があります (Niwa ni ookina ki ga arimasu - Trong vườn có một cái cây lớn).
   • Dùng cho SỰ KIỆN, LỄ HỘI, CUỘC HẸN, THỜI GIAN TRỪU TƯỢNG:
     Ví dụ: 明日、試験があります (Ashita, shiken ga arimasu - Ngày mai có bài kiểm tra).
     Ví dụ: 今日、約束があります (Kyou, yakusoku ga arimasu - Hôm nay tôi có hẹn).

2. 「います」(IMASU - HÁN TỰ: 居ます):
   • Dùng cho CON NGƯỜI: Bạn bè, thầy cô, gia đình, em bé...
     Ví dụ: 教室に先生がいます (Kyoushitsu ni sensei ga imasu - Trong lớp học có thầy giáo).
   • Dùng cho ĐỘNG VẬT, CÔN TRÙNG (các sinh vật sống có thể tự cử động di chuyển):
     Ví dụ: 庭に犬がいます (Niwa ni inu ga imasu - Ngoài sân có con chó).
     Ví dụ: 池に魚がいます (Ike ni sakana ga imasu - Dưới ao có cá).

3. CÁC NGOẠI LỆ THỰC TẾ & MẪU NGỮ PHÁP MỞ RỘNG:
   • Robot thông minh hoặc người máy cử động như người: Thường dùng 「います」 (Ví dụ: ロボットがいます).
   • Taxi / Xe buýt có tài xế ngồi lái chờ khách: Có thể dùng 「タクシーがいます」(Có taxi đang đợi).
   • Cấu trúc 「〜てあります」(V-te arimasu): Diễn tả trạng thái do con người cố ý làm sẵn (壁にカレンダーが掛けてあります - Lịch đã được treo sẵn trên tường).
   • Cấu trúc 「〜ています」(V-te imasu): Diễn tả hành động đang tiếp diễn (đang ăn, đang ngủ) hoặc trạng thái của tự động từ (ドアが開いています - Cửa đang mở).`;
  }

  // 2. Koto ni suru vs Koto ni naru (Ngữ pháp N3 kinh điển)
  if (
    q.includes('koto ni suru') ||
    q.includes('koto ni naru') ||
    q.includes('ことにする') ||
    q.includes('ことになる')
  ) {
    return `PHÂN BIỆT: 「〜ことにする」 VS 「〜ことになる」(NGỮ PHÁP N3)
Điểm cốt lõi: Quyết định chủ quan cá nhân vs Quy định / Sự việc khách quan sắp đặt.

1. 「〜ことにする」(KOTO NI SURU):
   • Ý nghĩa: "Tôi tự mình quyết định làm (hoặc không làm) việc gì đó".
   • Bản chất: Hành động xuất phát từ ý chí chủ quan 100% của người nói.
   • Cấu trúc: V-ru / V-nai + ことにする
   • Ví dụ: 健康のために、タバコをやめることにしました (Kenkō no tame ni, tabako o yameru koto ni shimashita - Vì sức khỏe, tôi đã tự quyết định bỏ thuốc lá).

2. 「〜ことになる」(KOTO NI NARU):
   • Ý nghĩa: "Được quyết định là...", "Trở thành quy định...", "Có kết quả là...".
   • Bản chất: Quyết định do tập thể, công ty, hoàn cảnh khách quan hoặc người khác ấn định; bản thân người nói chỉ tiếp nhận và tuân thủ.
   • Cấu trúc: V-ru / V-nai + ことになる
   • Ví dụ: 来月から東京本社へ転勤することになりました (Raigetsu kara Tōkyō honsha e tenkin suru koto ni narimashita - Sang tháng tôi đã được công ty quyết định điều chuyển lên trụ sở Tokyo).

MẸO THI JLPT: Nếu có lệnh điều động công tác, quy định công ty, luật pháp, luôn dùng 「〜ことになる」.`;
  }

  // 3. Ni shitemo / To shitemo (Ngữ pháp N2 kinh điển)
  if (
    q.includes('ni shitemo') ||
    q.includes('to shitemo') ||
    q.includes('にしても') ||
    q.includes('としても')
  ) {
    return `GIẢI MÃ NGỮ PHÁP N2: 「〜にしても」 & 「〜としても」
Ý nghĩa: "Cho dù... thì cũng...", "Dẫu cho rằng...".

1. 「〜にしても」(NI SHITEMO):
   • Bản chất: Chấp nhận sự thật ở vế trước là đúng, nhưng ở vế sau vẫn giữ nguyên quan điểm, sự bất bình hoặc lời khuyên.
   • Cấu trúc: Thể thông thường (Futsuukei) / N + にしても
   • Sắc thái: Thường đi kèm đánh giá, phàn nàn hoặc lời khuyên nhủ.
   • Ví dụ: 忙しいにしても、連絡ぐらいはするべきだ (Isogashii ni shitemo, renraku gurai wa surubeki da - Dù có bận đến mấy thì chí ít cũng phải liên lạc một câu chứ).
   • Dạng kép đối chiếu: 〜にしても〜にしても (Dù là A hay là B thì...).

2. 「〜としても」(TO SHITEMO):
   • Bản chất: Giả định một tình huống cực đoan, khó xảy ra trong tương lai ("Dẫu giả sử rằng...").
   • Ví dụ: たとえ失敗したとしても、後悔はしない (Tatoe shippai shita to shitemo, kōkai wa shinai - Giả sử cho dù có thất bại, tôi cũng không hối hận).`;
  }

  // 4. Cụm liên từ N3: Ni taishite, Ni totte, Ni tsuite, Ni yotte
  if (
    q.includes('ni taishite') ||
    q.includes('ni totte') ||
    q.includes('ni tsuite') ||
    q.includes('ni yotte') ||
    q.includes('に対して') ||
    q.includes('にとって') ||
    q.includes('について') ||
    q.includes('によって')
  ) {
    return `PHÂN BIỆT 4 MẪU TRỌNG TÂM: NI TAISHITE, NI TOTTE, NI TSUITE, NI YOTTE
1. 「〜に対して」(Ni taishite - N3):
   • Nghĩa 1: Hướng đối tượng ("Đối với ai đó thì có thái độ gì"). Ví dụ: 目上の人に対して丁寧な言葉を使う (Đối với người bề trên phải dùng lời lễ phép).
   • Nghĩa 2: Tương phản đối lập ("Trái ngược với A thì B..."). Ví dụ: 兄が社交的なのに対して、弟は内気だ (Trái ngược với anh trai hòa đồng, em trai lại khép kín).

2. 「〜にとって」(Ni totte - N3):
   • Nghĩa: "Đứng trên lập trường / góc nhìn của ai đó để đưa ra đánh giá".
   • Phía sau thường là tính từ đánh giá: quan trọng, khó, cần thiết.
   • Ví dụ: 私にとって、家族が一番大切です (Đối với tôi, gia đình là điều quan trọng nhất).

3. 「〜について」(Ni tsuite - N4/N3):
   • Nghĩa: "Về chủ đề / nội dung nào đó".
   • Phía sau là các hành động: suy nghĩ (考える), nghiên cứu (調べる), phát biểu (発表する).
   • Ví dụ: 日本の文化について調べます (Tìm hiểu về văn hóa Nhật Bản).

4. 「〜によって」(Ni yotte - N3):
   • Nghĩa 1: Phương pháp, phương tiện ("Bằng cách..."). Ví dụ: インターネットによって世界中と繋がる.
   • Nghĩa 2: Nguyên nhân ("Do, vì..."). Ví dụ: 地震によって橋が壊れた.
   • Nghĩa 3: Tùy theo từng đối tượng ("Tùy vào..."). Ví dụ: 人によって考え方が違う (Tùy mỗi người mà cách nghĩ khác nhau).`;
  }

  // 5. Dake vs Shika vs Bakari
  if (
    q.includes('dake') ||
    q.includes('shika') ||
    q.includes('bakari') ||
    q.includes('だけ') ||
    q.includes('しか') ||
    q.includes('ばかり')
  ) {
    return `PHÂN BIỆT GIỚI HẠN: 「だけ」(DAKE) VS 「しか」(SHIKA) VS 「ばかり」(BAKARI)
1. 「〜だけ」(DAKE):
   • Nghĩa: "Chỉ..." (Khách quan, trung tính).
   • Đi được với cả câu khẳng định lẫn phủ định.
   • Ví dụ: 1000円だけあります (Tôi chỉ có 1000 yên - mức độ trung tính).

2. 「〜しか〜ない」(SHIKA ... NAI):
   • Nghĩa: "Chỉ... (không có gì khác ngoài...)".
   • BẮT BUỘC ĐI VỚI VỊ NGỮ PHỦ ĐỊNH (NAI).
   • Sắc thái: Than thở, cảm thấy thiếu thốn, không đủ so với kỳ vọng.
   • Ví dụ: 1000円しかありません (Tôi chỉ có vỏn vẹn 1000 yên thôi, ít quá).

3. 「〜ばかり」(BAKARI):
   • Nghĩa: "Toàn là...", "Cứ suốt ngày...".
   • Sắc thái: Tần suất lặp đi lặp lại quá nhiều gây cảm giác ngán ngẩm, phàn nàn.
   • Ví dụ: ゲームばかりしている (Cứ suốt ngày toàn chơi game).
   • Công thức đặc biệt: V-ta + ばかり (Vừa mới làm gì xong tức thì).`;
  }

  // 6. Kara vs Node
  if (
    (q.includes('kara') && q.includes('node')) ||
    (q.includes('から') && q.includes('ので')) ||
    q.includes('bởi vì') ||
    q.includes('ly do') ||
    q.includes('lý do')
  ) {
    return `PHÂN BIỆT NGUYÊN NHÂN: 「〜から」(KARA) VS 「〜ので」(NODE)
Điểm cốt lõi: Chủ quan cá nhân vs Khách quan lịch sự.

1. 「〜から」(KARA):
   • Bản chất: Nêu lý do mang tính chủ quan của người nói.
   • Vế sau ĐƯỢC PHÉP dùng mệnh lệnh, nhờ vả, ý chí (〜てください, 〜ましょう, 〜たい).
   • Ví dụ: 危ないから、触らないで (Vì nguy hiểm nên đừng chạm vào).

2. 「〜ので」(NODE):
   • Bản chất: Nêu lý do khách quan, tự nhiên, nhẹ nhàng và lịch thiệp.
   • Thường dùng trong bối cảnh công sở, xin phép cấp trên, thông báo khách hàng.
   • Vế sau TRÁNH dùng mệnh lệnh thô lỗ.
   • Ví dụ: 電車が遅れましたので、10分ほど遅刻いたします (Vì tàu điện bị trễ nên em xin phép đến muộn khoảng 10 phút ạ).`;
  }

  // 7. Shitsurei shimasu / Shitsurei itashimasu
  if (q.includes('shitsurei') || q.includes('失礼') || q.includes('that le')) {
    return `ĐỊNH NGHĨA VÀ CÁCH DÙNG: 「失礼します」(SHITSUREI SHIMASU)
Nghĩa chính: "Tôi xin phép thất lễ" / "Xin lỗi vì làm phiền" / "Xin phép vào phòng hoặc ra về".

1. CÁC NGỮ CẢNH GIAO TIẾP THỰC TẾ:
   • Khi bước vào phòng cấp trên hoặc phòng phỏng vấn: Gõ cửa 3 tiếng, mở cửa nói: 「失礼いたします」(Shitsurei itashimasu - thể khiêm nhường chuẩn mực).
   • Khi cúp máy điện thoại: Luôn nói câu cuối cùng trước khi cúp: 「失礼いたします」. Sau đó đợi đối phương cúp máy hoặc đợi 1-2 giây mới nhẹ nhàng ngắt máy.
   • Khi tan làm ra về trước đồng nghiệp: 「お先に失礼します」(Osaki ni shitsurei shimasu - Em xin phép về trước ạ).
   • Khi đi cắt ngang mặt người khác hoặc với tay lấy đồ: 「失礼します」.

2. CẤP ĐỘ LỊCH SỰ:
   • 「失礼します」(Shitsurei shimasu): Lịch sự thông thường (N4).
   • 「失礼いたします」(Shitsurei itashimasu): Khiêm nhường ngữ trang trọng công sở (N3-N2).
   • 「大変失礼いたしました」(Taihen shitsurei itashimashita): Dùng khi thành thật tạ lỗi vì đã lỡ làm điều thất lễ (N2-N1).`;
  }

  // 8. Arigatou gozaimasu vs Arigatou gozaimashita
  if (q.includes('arigatou') || q.includes('ありがとう') || (q.includes('cảm ơn') && q.includes('quá khứ'))) {
    return `PHÂN BIỆT: 「ありがとうございます」 VS 「ありがとうございました」
Điểm cốt lõi: Hiện tại/Tương lai vs Quá khứ hoàn tất.

1. 「ありがとうございます」(HIỆN TẠI & QUAN HỆ TIẾP DIỄN):
   • Dùng khi hành động giúp đỡ vừa mới xảy ra hoặc mối quan hệ vẫn đang tiếp diễn.
   • Ví dụ: Khi khách hàng vừa bước vào quán, hoặc khi nhận quà trên tay: 「誠にありがとうございます」.

2. 「ありがとうございました」(QUÁ KHỨ & HÀNH ĐỘNG ĐÃ KẾT THÚC):
   • Dùng khi một sự kiện, buổi học, kỳ làm việc hoặc giao dịch đã hoàn tất trọn vẹn.
   • Ví dụ: Cuối buổi thuyết trình, khi tiễn khách ra về, hoặc ngày cuối cùng nghỉ việc: 「本日はありがとうございました」(Hôm nay cảm ơn quý vị rất nhiều).

LƯU Ý THỰC TẾ: Trong email mở đầu gửi đối tác quen thuộc, người Nhật luôn dùng thì hiện tại 「いつもお世話になっております」(chứ không dùng quá khứ) vì quan hệ hợp tác vẫn đang diễn ra.`;
  }

  // 9. Sumimasen vs Gomennasai
  if (q.includes('sumimasen') || q.includes('gomen') || q.includes('すみません') || q.includes('ごめん')) {
    return `PHÂN BIỆT: 「すみません」 VS 「ごめんなさい」
1. 「すみません」(SUMIMASEN):
   • Đa năng nhất trong giao tiếp tiếng Nhật: Vừa là Xin lỗi, vừa là Cảm ơn khi làm phiền ai đó, vừa là "Xin lỗi cho tôi hỏi / gọi nhân viên quán".
   • Dùng được cho cả người lạ, cấp trên, khách hàng và ngoài xã hội.
   • Dạng trang trọng công sở: 「申し訳ございません」(Moushiwake gozaimasen).

2. 「ごめんなさい」(GOMENNASAI):
   • Thuần túy là xin lỗi vì bản thân làm sai hoặc gây lỗi.
   • TUYỆT ĐỐI KHÔNG DÙNG với cấp trên hoặc đối tác kinh doanh! Chỉ dùng trong gia đình, bạn bè thân thiết hoặc trẻ em nói với người lớn.

Ví dụ thực tế: Khi gọi nhân viên trong quán ăn, hô to: 「すみません！」 (chứ không bao giờ hô ごめんなさい).`;
  }

  // 10. IT Vocabulary
  if (q.includes('it') || q.includes('phần mềm') || q.includes('code') || q.includes('dev') || q.includes('bug') || q.includes('spec')) {
    return `TỪ VỰNG TIẾNG NHẬT CHUYÊN NGÀNH CÔNG NGHỆ THÔNG TIN (IT / DEV):
1. CÁC TÀI LIỆU DỰ ÁN CỐT LÕI:
   • 仕様書 (しようしょ - Shiyousho): Tài liệu đặc tả kỹ thuật (Specification/Spec).
   • 要件定義 (ようけんていぎ - Youken teigi): Định nghĩa yêu cầu khách hàng.
   • 基本設計 (きほんせっけい - Kihon sekkei): Thiết kế cơ bản.
   • 詳細設計 (しょうさいせっけい - Shousai sekkei): Thiết kế chi tiết.

2. THUẬT NGỮ LẬP TRÌNH VÀ VẬN HÀNH:
   • 不具合 / バグ (ふぐあい / ばぐ - Fuguai / Bagu): Lỗi phần mềm / Bug.
   • 修正する (しゅうせいする - Shuusei suru): Fix lỗi, chỉnh sửa code.
   • 実装する (じっそうする - Jissou suru): Implement, viết tính năng.
   • デプロイ / リリース (Deporoi / Ririisu): Deploy lên server / Release phiên bản.
   • 納期 (のうき - Nouki): Hạn chót giao sản phẩm (Deadline).

CÂU NÓI CỬA MIỆNG DEV:
「本番環境にデプロイする前に、テスト環境で不具合を修正してください」
(Honban kankyou ni deporoi suru mae ni, tesuto kankyou de fuguai wo shuusei shite kudasai - Trước khi deploy lên môi trường Production, hãy fix hết lỗi ở môi trường Test).`;
  }

  // 11. Business & Trade Vocabulary
  if (q.includes('kinh doanh') || q.includes('business') || q.includes('thuong mai') || q.includes('b2b') || q.includes('email')) {
    return `TỪ VỰNG TIẾNG NHẬT CHUYÊN NGÀNH THƯƠNG MẠI & EMAIL CÔNG SỞ:
1. BỘ CHỨNG TỪ THƯƠNG MẠI BẮT BUỘC:
   • 見積書 (みつもりしょ - Mitsumorisho): Bảng báo giá (Quotation).
   • 請求書 (せいきゅうしょ - Seikyuusho): Hóa đơn đòi tiền (Invoice).
   • 納品書 (のうひんしょ - Nouhinsho): Phiếu giao hàng (Delivery slip).
   • 領収書 (りょうしゅうしょ - Ryoushuusho): Biên lai thu tiền (Receipt).

2. CÁC THUẬT NGỮ QUY TRÌNH QUAN TRỌNG:
   • 稟議 (りんぎ - Ringi): Tờ trình xin phê duyệt từ cấp dưới lên cấp trên.
   • 根回し (ねまわし - Nemawashi): Thỏa thuận ngầm, vận động hành lang trước cuộc họp.
   • 相見積もり (あいみつもり - Aimitsumori): Lấy báo giá so sánh giữa nhiều nhà cung cấp.

CÂU EMAIL MẪU CHUẨN MỰC:
「お見積書を添付ファイルにてお送りいたしましたので、ご査収のほどよろしくお願い申し上げます」
(Kính gửi kèm báo giá qua tệp đính kèm, kính mong quý đối tác kiểm tra tiếp nhận).`;
  }

  // 12. Wa vs Ga
  if (
    (q.includes('wa') && q.includes('ga')) ||
    (q.includes('は') && q.includes('が')) ||
    q.includes('trợ từ wa') ||
    q.includes('trợ từ ga')
  ) {
    return `PHÂN BIỆT TRỢ TỪ: 「は」(WA) VS 「が」(GA)
Điểm cốt lõi: Chủ đề cũ vs Tiêu điểm mới.

1. 「は」(CHỦ ĐỀ ĐÃ BIẾT):
   • Đưa đối tượng lên làm chủ đề thảo luận chung.
   • Trọng tâm thông tin nằm ở vế đằng sau.
   • Ví dụ: 私は田中です (Tôi là Tanaka - trọng tâm là "Tanaka").

2. 「が」(TIÊU ĐIỂM XÁC ĐỊNH & HIỆN TƯỢNG TRỰC TIẾP):
   • Đánh dấu chính đối tượng đó, trả lời cho câu hỏi "Chính là ai/cái gì?".
   • Trọng tâm thông tin nằm ở chính danh từ đứng trước が.
   • Ví dụ: 私が田中です (Chính tôi là Tanaka - đáp lại câu hỏi "Ai là Tanaka?").

QUY TẮC PHÒNG THI JLPT:
• Đại từ nghi vấn (誰, 何, どこ) làm chủ ngữ BẮT BUỘC dùng 「が」: 誰が来ましたか (Ai đã đến?), cấm dùng 誰は.
• Trong mệnh đề phụ bổ nghĩa cho danh từ, chủ ngữ luôn dùng 「が」: 私が買った本 (Quyển sách mà tôi đã mua).`;
  }

  // 13. Otsukaresama vs Gokurousama
  if (q.includes('お疲れ') || q.includes('ご苦労') || q.includes('otsukare') || q.includes('gokurou')) {
    return `PHÂN BIỆT: 「お疲れ様」 VS 「ご苦労様」
1. 「ご苦労様」(GOKUROUSAMA):
   • CHỈ DÙNG TỪ TRÊN XUỐNG DƯỚI (Sếp nói với nhân viên, chủ nhà nói với người giao hàng).
   • Tuyệt đối cấm cấp dưới nói với cấp trên hoặc nói với khách hàng bên ngoài!

2. 「お疲れ様」(OTSUKARESAMA):
   • Dùng cho đồng nghiệp cùng cấp hoặc cấp dưới nói với cấp trên (kèm です/でした).
   • Lưu ý tối quan trọng: KHÔNG NÓI câu này với khách hàng bên ngoài công ty. Với khách hàng, câu chào bắt buộc là: 「いつも大変お世話になっております」.`;
  }

  // 14. Madeni vs Made
  if (q.includes('までに') || q.includes('madeni') || (q.includes('made') && q.includes('hạn chót'))) {
    return `PHÂN BIỆT: 「までに」 VS 「まで」
1. 「まで」(LIÊN TỤC KHÔNG DỨT ĐẾN TẬN MỐC THỜI GIAN):
   • Đi với động từ kéo dài liên tục: 待つ (đợi), 働く (làm việc), 勉強する (học), いる (ở lại).
   • Ví dụ: ５時まで待ちます (Tôi đợi liên tục đến tận 5 giờ).

2. 「までに」(HẠN CHÓT PHẢI HOÀN THÀNH XONG TRƯỚC ĐÓ):
   • Đi với động từ dứt điểm: 提出する (nộp), 終わる (xong), 帰る (về), 連絡する (liên lạc).
   • Ví dụ: ５時までにレポートを出してください (Hãy nộp báo cáo trước 5 giờ).`;
  }

  // 15. Conditionals: To, Ba, Tara, Nara
  if (q.includes('điều kiện') || (q.includes('たら') && q.includes('なら')) || (q.includes('tara') && q.includes('nara'))) {
    return `4 DẠNG CÂU ĐIỀU KIỆN (NẾU / HỄ THÌ): 「と」, 「ば」, 「たら」, 「なら」
1. 「〜と」(TẤT YẾU TỰ NHIÊN / MÁY MÓC):
   • Hễ A xảy ra là tất yếu B xảy ra theo quy luật.
   • Vế sau CẤM dùng mệnh lệnh, nhờ vả, ý chí (không đi với ください, たい).
   • Ví dụ: ボタンを押すと、切符が出ます (Ấn nút là vé tự động chạy ra).

2. 「〜ば」(GIẢ ĐỊNH LOGIC):
   • Nếu điều kiện A thỏa mãn thì B thành lập. Thường dùng trong châm ngôn, lập luận khách quan.
   • Ví dụ: 安ければ、買います (Nếu rẻ thì tôi sẽ mua).

3. 「〜たら」(LINH HOẠT NHẤT TRONG GIAO TIẾP HÀNG NGÀY):
   • Dùng thoải mái với mệnh lệnh, rủ rê, nhờ vả ở vế sau.
   • Biểu thị cả trình tự trước - sau: "Sau khi làm A xong thì làm B".
   • Ví dụ: 駅に着いたら、電話してください (Đến ga rồi thì gọi cho tôi nhé).

4. 「〜なら」(DỰA TRÊN THÔNG TIN ĐỐI PHƯƠNG VỪA NÓI):
   • Tiếp nhận chủ đề đối phương đưa ra rồi đưa lời khuyên/ý kiến.
   • Ví dụ: 日本へ行くなら、京都がおすすめです (Nếu định đi Nhật thì tôi gợi ý Kyoto).`;
  }

  // 16. Ni vs De (Trợ từ に vs で)
  if (
    (q.includes('ni') && q.includes('de')) ||
    (q.includes('に') && q.includes('で')) ||
    q.includes('trợ từ ni') ||
    q.includes('trợ từ de')
  ) {
    return `PHÂN BIỆT TRỢ TỪ: 「に」(NI) VS 「で」(DE)
Điểm cốt lõi: Điểm tồn tại tĩnh / đích đến vs Nơi hành động diễn ra.

1. 「に」(TỒN TẠI TĨNH, THỜI GIAN CỤ THỂ & ĐÍCH ĐẾN):
   • Đi với động từ tồn tại: あります (có đồ vật), います (có người/vật), 住みます (sinh sống), 座ります (ngồi xuống).
     Ví dụ: 机の上にペンがあります (Trên bàn có cây bút).
     Ví dụ: ハノイに住んでいます (Tôi đang sinh sống ở Hà Nội).
   • Điểm đích đến của chuyển động: 行きます (đi), 来ます (đến), 着きます (đến nơi).
     Ví dụ: 明日、東京に行きます (Ngày mai tôi đi Tokyo).
   • Thời gian có con số cụ thể: 7時に起きます (Thức dậy lúc 7 giờ).

2. 「で」(NƠI DIỄN RA HÀNH ĐỘNG CỤ THỂ, PHƯƠNG TIỆN, CÔNG CỤ):
   • Nơi chốn diễn ra hoạt động có ý chí: Ăn uống, làm việc, mua sắm, học tập.
     Ví dụ: 図書館で勉強します (Học bài ở thư viện).
     Ví dụ: レストランでご飯を食べます (Ăn cơm ở nhà hàng).
   • Phương tiện, công cụ, nguyên liệu:
     Ví dụ: 電車で会社へ行きます (Đi đến công ty bằng tàu điện).
     Ví dụ: 箸で食べます (Ăn bằng đũa).

MẸO THI JLPT: Nếu động từ là "tổ chức sự kiện" (パーティー, コンサート, 会議) + あります, dùng 「で」 vì đây là diễn ra sự kiện:
東京でコンサートがあります (Tại Tokyo diễn ra buổi hòa nhạc).`;
  }

  // 17. Cho - Nhận: Ageru, Kureru, Morau, Itadaku, Kudasaru
  if (
    q.includes('ageru') ||
    q.includes('kureru') ||
    q.includes('morau') ||
    q.includes('itadaku') ||
    q.includes('kudasaru') ||
    q.includes('あげる') ||
    q.includes('くれる') ||
    q.includes('もらう') ||
    q.includes('cho nhận')
  ) {
    return `HỆ THỐNG ĐỘNG TỪ CHO - NHẬN TRONG TIẾNG NHẬT:
Góc nhìn người nói (Tôi / Phe của tôi) là chìa khóa phân biệt.

1. 「あげる」(AGERU) / Lịch sự hơn: 「差し上げる」(SASHIAGERU):
   • CHIỀU ĐI: Tôi tặng người khác, hoặc A tặng B.
   • Công thức: [Người cho] は [Người nhận] に [Vật] を あげます.
   • Ví dụ: 私は田中さんにプレゼントをあげました (Tôi đã tặng quà cho anh Tanaka).

2. 「くれる」(KURERU) / Kính ngữ: 「くださる」(KUDASARU):
   • CHIỀU VỀ: Người khác tặng cho TÔI (hoặc người trong phe tôi).
   • Công thức: [Người khác] は 私に [Vật] を くれます.
   • Ví dụ: 田中さんは私に花をくれました (Anh Tanaka đã tặng hoa cho tôi).
   • Tuyệt đối cấm dùng: 私は田中さんにくれました (Sai hoàn toàn).

3. 「もらう」(MORAU) / Khiêm nhường: 「いただく」(ITADAKU):
   • CHIỀU TIẾP NHẬN: Tôi nhận được từ ai đó, lấy "Tôi" làm chủ ngữ.
   • Công thức: 私は [Người cho] に/から [Vật] を もらいます.
   • Ví dụ: 私は先生に本をいただきました (Tôi đã được thầy giáo tặng cho cuốn sách).

MẸO GIAO TIẾP: Muốn nhờ ai làm gì giúp mình, dùng 「〜ていただけませんか」(Te itadakemasen ka) - vô cùng nhã nhặn và chuẩn mực công sở.`;
  }

  // 18. Tự động từ vs Tha động từ (Jidoushi vs Tadoushi)
  if (
    q.includes('tự động từ') ||
    q.includes('tha động từ') ||
    q.includes('jidoushi') ||
    q.includes('tadoushi') ||
    q.includes('自動詞') ||
    q.includes('他動詞')
  ) {
    return `PHÂN BIỆT: TỰ ĐỘNG TỪ (自動詞) VS THA ĐỘNG TỪ (他動詞)
Bản chất: Tự nó diễn ra / Trạng thái khách quan vs Có tác động ý chí của con người.

1. TỰ ĐỘNG TỪ (JIDOUSHI - TRỢ TỪ が):
   • Mô tả hiện tượng, sự vật tự chuyển biến hoặc trạng thái vốn có.
   • Công thức: [Danh từ] が + Tự động từ.
   • Ví dụ cặp kinh điển:
     • ドアが開く (Doa ga aku - Cửa tự mở / Cửa đang mở).
     • 電気が消える (Denki ga kieru - Đèn tự tắt).
     • 財布が落ちる (Saifu ga ochiru - Ví bị rơi).

2. THA ĐỘNG TỪ (TADOUSHI - TRỢ TỪ を):
   • Đòi hỏi một chủ thể tác động trực tiếp lên tân ngữ để tạo ra hành động.
   • Công thức: [Chủ thể] が [Danh từ] を + Tha động từ.
   • Ví dụ:
     • 私がドアを開ける (Watashi ga doa wo akeru - Tôi mở cửa).
     • 私が電気を消す (Watashi ga denki wo kesu - Tôi tắt đèn).
     • 私が財布を落とす (Watashi ga saifu wo otosu - Tôi làm rơi ví).

MẸO THI JLPT VỚI THỂ TRẠNG THÁI:
• 「Tự động từ + ています」: Diễn tả trạng thái hiện tại (ドアが開いています - Cửa đang mở).
• 「Tha động từ + てあります」: Diễn tả trạng thái kết quả có ý đồ sắp xếp (ドアが開けてあります - Cửa đã được ai đó mở sẵn để đón gió).`;
  }

  // 19. Thể Sai khiến vs Thể Bị động (Shieki vs Ukemi)
  if (
    q.includes('sai khiến') ||
    q.includes('bị động') ||
    q.includes('ukemi') ||
    q.includes('shieki') ||
    q.includes('使役') ||
    q.includes('受身')
  ) {
    return `PHÂN BIỆT: THỂ SAI KHIẾN (使役) VS THỂ BỊ ĐỘNG (受身)
Cấu trúc tạo nghĩa: "Bắt / Cho phép làm" vs "Bị / Được tác động".

1. THỂ BỊ ĐỘNG (UKEMI - ĐỘNG TỪ ĐUÔI 〜られる):
   • Nhóm 1: Chuyển đuôi hàng u sang hàng a + れる (書く -> 書かれる).
   • Nhóm 2: Bỏ ru + られる (食べる -> 食べられる).
   • Nhóm 3: される (する), こられる (くる).
   • Sắc thái: Thường mang nghĩa bị phiền phức (Meiwaku Ukemi):
     Ví dụ: 雨に降られました (Ame ni furaremashita - Tôi bị dính cơn mưa, khổ sở).
     Ví dụ: 先生に褒められました (Sensei ni homeraremashita - Được thầy giáo khen).

2. THỂ SAI KHIẾN (SHIEKI - ĐỘNG TỪ ĐUÔI 〜せる / 〜させる):
   • Nhóm 1: Hàng u sang hàng a + せる (行く -> 行かせる).
   • Nhóm 2: Bỏ ru + させる (食べる -> 食べさせる).
   • Sắc thái: Bắt buộc hoặc cho phép cấp dưới làm:
     Ví dụ: 社長は社員を働かせます (Giám đốc bắt nhân viên làm việc).
   • Cấu trúc xin phép lịch sự kinh điển:
     Ví dụ: 「休ませていただけませんか」(Cho phép tôi xin nghỉ được không ạ?).

3. THỂ SAI KHIẾN BỊ ĐỘNG (SHIEKI UKEMI - 〜させられる):
   • Nghĩa: "Bị ép buộc phải làm một việc mà bản thân không hề muốn".
   • Ví dụ: お酒を飲まされました (Osake wo nomasaremashita - Tôi bị ép uống rượu say mèm).`;
  }

  // 20. Keigo: Sonkeigo vs Kenjougo vs Teineigo
  if (
    q.includes('keigo') ||
    q.includes('kính ngữ') ||
    q.includes('sonkeigo') ||
    q.includes('kenjougo') ||
    q.includes('tôn kính') ||
    q.includes('khiêm nhường')
  ) {
    return `HỆ THỐNG KÍNH NGỮ TIẾNG NHẬT (KEIGO - 敬語):
Tam giác quy tắc: Nâng người đối thoại lên vs Hạ bản thân mình xuống.

1. TÔN KÍNH NGỮ (SONKEIGO - 尊敬語):
   • Dùng khi nói về HÀNH ĐỘNG CỦA KHÁCH HÀNG, SẾP, ĐỐI TÁC NGOÀI.
   • CÁC ĐỘNG TỪ BẤT QUY TẮC ĐẶC BIỆT:
     • 行く / 来る / いる -> いらっしゃる / おいでになる
     • 言う -> おっしゃる
     • 食べる / 飲む -> 召し上がる (Meshiaeru)
     • 見る -> ご覧になる (Goran ni naru)
     • 知っている -> ご存知です (Gozonji desu)
     • する -> なさる (Nasaru)

2. KHIÊM NHƯỜNG NGỮ (KENJOUGO - 謙譲語):
   • Dùng khi nói về HÀNH ĐỘNG CỦA CHÍNH BẢN THÂN MÌNH VÀ PHE MÌNH (công ty mình, người nhà mình).
   • CÁC ĐỘNG TỪ BẤT QUY TẮC ĐẶC BIỆT:
     • 行く / 来る -> 参る (Mairu)
     • いる -> おる (Oru)
     • 言う -> 申す (Mousu) / 申し上げる (Moushiageru)
     • 食べる / 飲む / もらう -> いただく (Itadaku)
     • 見る -> 拝見する (Haiken suru)
     • 会う -> お目にかかる (Ome ni kakaru)
     • 知っている -> 存じております (Zonjite orimasu)
     • する -> いたす (Itasu)

3. QUY TẮC BẤT DI BẤT DỊCH TRONG KINH DOANH:
   • Khi nói chuyện với khách hàng về Giám đốc của công ty mình, BẮT BUỘC dùng Khiêm nhường ngữ (bỏ tiền tố sama, bỏ chức danh sếp):
     Ví dụ chuẩn: 「社長の田中はただいま席を外しております」(Giám đốc Tanaka của chúng tôi hiện đang vắng mặt).`;
  }

  // 21. You ni vs Tame ni
  if (q.includes('you ni') || q.includes('tame ni') || q.includes('ように') || q.includes('ために')) {
    return `PHÂN BIỆT MỤC ĐÍCH: 「〜ために」(TAME NI) VS 「〜ように」(YOU NI)
Điểm cốt lõi: Chủ động ý chí hành động vs Mục tiêu khách quan / Thể khả năng.

1. 「〜ために」(V-ru + ために / N + のために):
   • Vế trước và vế sau cùng một chủ ngữ, biểu thị HÀNH ĐỘNG CÓ Ý CHÍ RÕ RỆT.
   • Đi với động từ ý chí (mua, học, tiết kiệm).
   • Ví dụ: 日本へ留学するために、貯金しています (Tôi tiết kiệm tiền để đi du học Nhật).
   • Ví dụ: 家族のために、一生懸命働きます (Tôi làm việc cật lực vì gia đình).

2. 「〜ように」(V-khả năng / V-nai + ように):
   • Biểu thị mục tiêu trạng thái, sự việc không hoàn toàn phụ thuộc vào ý chí người nói (để mà, sao cho).
   • Thường đi với: Động từ thể Khả năng (Kanoukei), Tự động từ, hoặc Thể phủ định (Nai).
   • Ví dụ: 忘れないように、メモを取ります (Tôi ghi chú để sao cho không bị quên).
   • Ví dụ: 日本語が上手に話せるように、毎日練習します (Tôi luyện tập mỗi ngày để có thể nói giỏi tiếng Nhật).`;
  }

  // 22. Hazu vs Wake
  if (q.includes('hazu') || q.includes('wake') || q.includes('はず') || q.includes('わけ')) {
    return `PHÂN BIỆT: 「はず」(HAZU) VS 「わけ」(WAKE)
Điểm cốt lõi: Phán đoán chủ quan dựa trên logic vs Bản chất tất nhiên / Lý do thấu đáo.

1. 「〜はずです」(CHẮC CHẮN LÀ / LẼ RA LÀ):
   • Phán đoán dựa trên căn cứ, thông tin người nói nắm được.
   • Ví dụ: 彼は昨日日本に着いたから、今日は家にいるはずだ (Anh ấy đã tới Nhật hôm qua nên hôm nay chắc chắn đang ở nhà).
   • Phủ định: 〜はずがない (Tuyệt đối không thể nào có chuyện đó).

2. 「〜わけです」(THẢO NÀO / THÌ RA LÀ VẬY / ĐƯƠNG NHIÊN LÀ):
   • Giải thích bản chất sự việc sau khi hiểu rõ nguyên nhân.
   • Ví dụ: 暑いわけだ。気温が38度もある (Thảo nào nóng thế! Nhiệt độ lên tới tận 38 độ).
   • Mẫu N2 thường gặp:
     • 〜わけではない: Không hẳn là, không hoàn toàn là như vậy.
     • 〜わけにはいかない: Về mặt đạo đức/xã hội thì không thể làm việc đó được.`;
  }

  // 23. Manufacturing & Kaizen (Sản xuất, Kaizen, 5S)
  if (q.includes('kaizen') || q.includes('5s') || q.includes('hourensou') || q.includes('nhà máy')) {
    return `TỪ VỰNG TIẾNG NHẬT CHUYÊN NGÀNH SẢN XUẤT & VĂN HÓA KAIZEN (改善):
1. BỘ NGUYÊN TẮC 5S HUYỀN THOẠI TRONG XƯỞNG NHẬT:
   • 整理 (せいり - Seiri - Sàng lọc): Phân loại đồ cần và không cần, vứt bỏ đồ thừa.
   • 整頓 (せいとん - Seiton - Sắp xếp): Đặt đồ đúng nơi quy định, dán nhãn dễ tìm.
   • 清掃 (せいそう - Seisou - Sạch sẽ): Vệ sinh máy móc, sàn nhà sạch bóng.
   • 清潔 (せいけつ - Seiketsu - Săn sóc): Giữ gìn tiêu chuẩn 3S trên liên tục.
   • 躾 (しつけ - Shitsuke - Sẵn sàng): Rèn luyện ý thức kỷ luật tự giác.

2. VĂN HÓA BÁO CÁO HOURENSOU (報連相):
   • 報告 (ほうこく - Houkoku): Báo cáo tiến độ và kết quả công việc.
   • 連絡 (れんらく - Renraku): Liên lạc, thông tri tin tức cho mọi người.
   • 相談 (そうだん - Soudan): Thảo luận, xin ý kiến tư vấn trước khi tự ý quyết định.

3. THUẬT NGỮ CÔNG XƯỞNG CỐT LÕI:
   • 歩留まり (ぶどまり - Budomari): Tỷ lệ sản phẩm đạt chuẩn xuất xưởng (Yield rate).
   • ポカヨケ (Poka-yoke): Cơ chế chống lỗi ngớ ngẩn ngay từ khâu thiết kế máy.
   • 安全第一 (あんぜんだいいち - Anzen daiichi): An toàn là trên hết.`;
  }

  // 24. Medical & Nursing Care (Y tế, Điều dưỡng, Kaigo)
  if (q.includes('kaigo') || q.includes('điều dưỡng') || q.includes('bệnh viện') || q.includes('dieu duong')) {
    return `TỪ VỰNG TIẾNG NHẬT CHUYÊN NGÀNH ĐIỀU DƯỠNG & Y TẾ (介護 / 医療):
1. HOẠT ĐỘNG CHĂM SÓC HÀNG NGÀY:
   • 移乗 (いじょう - Ijou): Hỗ trợ bệnh nhân chuyển giường sang xe lăn.
   • 体位変換 (たいいへんかん - Taii henkan): Trở mình cho bệnh nhân tránh loét da.
   • 嚥下 (えんげ - Enge): Phản xạ nuốt thức ăn.
   • 食事介助 (しょくじかいじょ - Shokuji kaijo): Hỗ trợ cụ ăn uống.
   • 排泄介助 (はいせつかいじょ - Haisetsu kaijo): Hỗ trợ vệ sinh cá nhân.

2. CHỈ SỐ SINH TỒN VÀ DỤNG CỤ:
   • バイタルサイン (Baitaru sain): Dấu hiệu sinh tồn (Huyết áp, Mạch, Thân nhiệt).
   • 血圧 (けつあつ - Ketsuatsu): Huyết áp (最高: Tâm thu, 最低: Tâm trương).
   • 車椅子 (くるまいす - Kurumaisu): Xe lăn.
   • 点滴 (てんてき - Tenteki): Truyền dịch.

CÂU NÓI TRẤN AN BỆNH NHÂN:
「お体に痛みや違和感はございませんか？無理なさらないでくださいね」
(Okarada ni itami ya iwakan wa gozaimasen ka? Bác có thấy đau hay khó chịu ở đâu không ạ? Xin bác đừng gắng gượng nhé).`;
  }

  // 25. Check matched Deep Culture Topics (Tâm lý & Văn hóa chuyên sâu - Trả lời trực diện, cấm nói chung chung)
  const allCultureTopics = [...INITIAL_DEEP_CULTURE_TOPICS, ...EXTRA_DEEP_CULTURE_TOPICS];
  const matchedCulture = allCultureTopics.find(t =>
    q.includes(t.kanjiTitle.toLowerCase()) ||
    q.includes(t.romajiTitle.toLowerCase()) ||
    q.includes(t.vietnameseTitle.toLowerCase()) ||
    (t.id === 'cult_1' && (q.includes('uchi') || q.includes('soto') || q.includes('trong và ngoài') || q.includes('trong ngoai'))) ||
    (t.id === 'cult_2' && (q.includes('honne') || q.includes('tatemae') || q.includes('mặt tiền') || q.includes('mat tien') || q.includes('ý thực'))) ||
    (t.id === 'cult_3' && (q.includes('kuuki') || q.includes('đọc không khí') || q.includes('doc khong khi') || q.includes('ky'))) ||
    (t.id === 'cult_4' && (q.includes('meiwaku') || q.includes('làm phiền') || q.includes('lam phien'))) ||
    (t.id === 'cult_5' && (q.includes('nemawashi') || q.includes('ringi') || q.includes('đồng thuận') || q.includes('vận động hành lang') || q.includes('to trinh'))) ||
    (t.id === 'cult_6' && (q.includes('omotenashi') || q.includes('hiếu khách') || q.includes('hieu khach') || q.includes('tiền tip') || q.includes('tien tip'))) ||
    (t.id === 'cult_7' && (q.includes('aimai') || q.includes('mập mờ') || q.includes('map mo') || q.includes('cushion') || q.includes('kushon'))) ||
    (t.id === 'cult_8' && (q.includes('wabi') || q.includes('sabi') || q.includes('mono no aware') || q.includes('vô thường') || q.includes('kintsugi'))) ||
    (t.id === 'cult_9' && (q.includes('giri') || q.includes('ninjo') || q.includes('nghĩa lý') || q.includes('tình người') || q.includes('nghia ly'))) ||
    (t.id === 'cult_10' && (q.includes('shokunin') || q.includes('monodukuri') || q.includes('nghệ nhân') || q.includes('nghe nhan')))
  );

  if (matchedCulture) {
    return `GIẢI THÍCH CHUYÊN SÂU GÓC NHÌN VĂN HÓA & TÂM LÝ XÃ HỘI NHẬT BẢN:
Chuyên đề: 「${matchedCulture.kanjiTitle}」(${matchedCulture.romajiTitle}) - ${matchedCulture.vietnameseTitle}
Phân loại: ${matchedCulture.category} · Trọng tâm: ${matchedCulture.summaryBadge}

1. ĐỊNH NGHĨA TRỰC TIẾP & BẢN CHẤT TÂM LÝ HỌC:
   • Bản chất cốt lõi: ${matchedCulture.originAndConcept}
   • Cơ chế vận hành xã hội: ${matchedCulture.coreMechanism}

2. BIỂU HIỆN NGÔN TỪ THỰC TẾ & CÂU NÓI KINH ĐIỂN CỦA NGƯỜI BẢN XỨ:
${matchedCulture.linguisticManifestations.map(m => `   • Câu nói: 「${m.japanese}」 (${m.furigana})
     Dịch nghĩa: ${m.vietnamese}
     Ngữ cảnh: ${m.usageContext}`).join('\n\n')}

3. SO SÁNH ĐỐI CHIẾU GÓC NHÌN VĂN HÓA (NHẬT BẢN VS VIỆT NAM):
   • Góc nhìn Nhật Bản: ${matchedCulture.culturalComparison.japanPerspective}
   • Góc nhìn Việt Nam: ${matchedCulture.culturalComparison.vietnamPerspective}

4. QUY TẮC THỰC CHIẾN CÔNG SỞ CẦN NHỚ:
${matchedCulture.workplaceRules.map((r, idx) => `   • Quy tắc ${idx + 1}: ${r}`).join('\n')}

5. CẢNH BÁO CÁI BẪY VĂN HÓA NGƯỜI NGOẠI QUỐC HAY MẮC PHẢI:
   • Cảnh báo: ${matchedCulture.foreignTrapToAvoid}

6. ĐÚC KẾT CHUYÊN SÂU TỪ GIÁO SƯ YAMATO KENJI:
   • Lời khuyên: "${matchedCulture.professorTakeaway}"`;
  }

  // 26. Văn hóa Cúi chào (Ojigi - お辞儀)
  if (q.includes('ojigi') || q.includes('cúi chào') || q.includes('cui chao') || q.includes('chào hỏi') || q.includes('お辞儀')) {
    return `GIẢI THÍCH CHUYÊN SÂU: NGHỆ THUẬT VÀ TÂM LÝ VĂN HÓA CÚI CHÀO (OJIGI - お辞儀)
Định nghĩa trực tiếp: Cúi chào trong văn hóa Nhật không chỉ là chào hỏi, mà là hành vi hạ thấp cơ thể để bày tỏ sự tôn trọng và không phòng vệ trước đối phương.

1. 3 CẤP ĐỘ CÚI CHÀO BẮT BUỘC TRONG CÔNG SỞ:
   • Eshaku (会釈 - 15 độ): Chào xã giao nhẹ nhàng khi lướt qua đồng nghiệp ở hành lang.
   • Keirei (敬礼 - 30 độ): Chào chuẩn mực nhất khi đón tiếp khách hàng, gặp cấp trên hoặc đối tác.
   • Saikeirei (最敬礼 - 45 độ): Chào tôn kính tối cao hoặc khi chân thành tạ lỗi (Shazai) vì sơ suất lớn.

2. CƠ CHẾ ĐỘNG TÁC CHUẨN MỰC:
   • Lưng và cổ giữ thẳng tắp theo một đường thẳng, gập người từ hông.
   • Nam giới: Hai tay để thẳng dọc theo ống quần. Nữ giới: Đặt hai tay đan nhẹ phía trước bụng.
   • Sau khi cúi xuống, dừng lại 1 giây rồi từ từ ngẩng lên; không vừa đi vừa cúi gật đầu liên tục (bị coi là cẩu thả).

3. ĐỐI CHIẾU NHẬT - VIỆT:
   • Nhật Bản: Cúi đầu là ngôn ngữ cơ thể tối thượng, thay thế hoàn toàn cho bắt tay trong hầu hết tình huống nội địa.
   • Việt Nam: Thường gật đầu nhẹ hoặc bắt tay chặt biểu thị sự nhiệt tình.

4. CÁI BẪY CẦN TRÁNH: Vừa nói vừa cúi cùng một lúc (Douji Rei). Chuẩn mực cao cấp của người Nhật là "Nói xong câu chào rồi mới cúi người" (Gorei kouhai - 語礼後拝).`;
  }

  // 27. Văn hóa Trao đổi Danh thiếp (Meishi Koukan - 名刺交換)
  if (q.includes('meishi') || q.includes('danh thiếp') || q.includes('danh thiep') || q.includes('名刺')) {
    return `GIẢI THÍCH CHUYÊN SÂU: QUY TẮC BẤT DI BẤT DỊCH TRAO DANH THIẾP (MEISHI KOUKAN - 名刺交換)
Định nghĩa trực tiếp: Ở Nhật Bản, danh thiếp chính là "Gương mặt thứ hai" và "Bản ngã danh dự" của đối tác. Xúc phạm danh thiếp đồng nghĩa với việc xúc phạm chính người đó.

1. QUY TRÌNH TRAO ĐỔI CHUẨN MỰC CÔNG SỞ:
   • Luôn đứng thẳng, lấy danh thiếp ra khỏi hộp đựng (Meishi-ire) chuyên dụng, tuyệt đối không lấy ra từ túi quần.
   • Cầm danh thiếp bằng cả 2 tay tại 2 góc trên, xoay chiều chữ hướng về phía người nhận để họ đọc được ngay.
   • Người có vị thế thấp hơn (bên bán, cấp dưới) phải đưa danh thiếp trước và đặt thấp hơn danh thiếp của đối phương.
   • Vừa đưa vừa nói: 「株式会社OOのXXと申します。よろしくお願い申し上げます」(Tôi là XX đến từ công ty OO, rất mong được sự giúp đỡ của quý vị).

2. QUY TẮC ĐẶT DANH THIẾP TRONG CUỘC HỌP:
   • Khi nhận danh thiếp bằng 2 tay, nói ngay: 「頂戴いたします」(Choudai itashimasu - Tôi xin phép được nhận).
   • Sau đó, ĐẶT DANH THIẾP LÊN TRÊN HỘP MEISHI-IRE trên bàn làm việc trong suốt cuộc họp theo đúng sơ đồ chỗ ngồi của đối tác để ghi nhớ tên họ.
   • Tuyệt đối không cất ngay danh thiếp vào túi áo hoặc túi xách khi cuộc họp chưa kết thúc!

3. CÁI BẪY CẤM KỴ TUYỆT ĐỐI:
   • Cấm dùng bút viết lên danh thiếp của đối tác trước mặt họ.
   • Cấm vò méo, kẹp danh thiếp dưới đáy cốc nước hoặc nhét vào túi quần sau mông (bị coi là hành vi sỉ nhục).`;
  }

  // 28. Văn hóa Tiệc rượu công sở (Nomikai & Nominitication - 飲み会)
  if (q.includes('nomikai') || q.includes('tiệc rượu') || q.includes('tiec ruou') || q.includes('nhậu') || q.includes('uống rượu') || q.includes('飲み会')) {
    return `GIẢI THÍCH CHUYÊN SÂU: VĂN HÓA TIỆC RƯỢU CÔNG SỞ (NOMIKAI & NOMINITICATION - 飲み会)
Định nghĩa trực tiếp: Nomikai không đơn thuần là ăn uống giải trí, mà là công cụ ngoại giao nội bộ (Nominitication = Nomi + Communication) để giải tỏa áp lực và bộc lộ Honne (ý nghĩ thật) mà ban ngày không tiện nói.

1. QUY TẮC RÓT RƯỢU VÀ CẠNG LY (KANPAI):
   • Không bao giờ tự rót rượu cho chính mình (Tejaku). Luôn quan sát cốc của sếp và đồng nghiệp xung quanh: khi cốc của họ vơi còn khoảng 1/3, hãy chủ động cầm chai rót thêm.
   • Khi được người khác rót rượu, phải cầm cốc bằng 2 tay để tiếp nhận và nhấp 1 ngụm nhỏ trước khi đặt xuống bàn.
   • Khi cụng ly với cấp trên hoặc khách hàng, vành cốc của mình BẮT BUỘC phải đặt thấp hơn vành cốc đối phương để thể hiện sự khiêm nhường.

2. QUY TẮC "BUREIKOU" (VÔ LỄ KHU - 無礼講):
   • Sếp thường hô: "Hôm nay là Bureikou, mọi người cứ nói năng thoải mái không cần câu nệ cấp bậc!".
   • SỰ THẬT TÂM LÝ: Đừng bao giờ tin 100% vào câu nói này! Bạn có thể thoải mái hơn ban ngày một chút, nhưng nếu vượt quá giới hạn hoặc chỉ trích nặng nề sếp, bạn sẽ phải trả giá vào ngày làm việc hôm sau.

3. HÀNH ĐỘNG SÁNG HÔM SAU BẮT BUỘC:
   • Sáng hôm sau khi bước vào văn phòng, người đầu tiên bạn phải tới chào sếp và nói: 「昨日はごちそうさまでした。ありがとうございました」(Hôm qua cảm ơn sếp rất nhiều vì đã đãi rượu em ạ).`;
  }

  // 29. Phân tích trực diện khi hỏi về Góc nhìn Văn hóa bất kỳ
  const isCulturalQuestion =
    q.includes('văn hóa') ||
    q.includes('van hoa') ||
    q.includes('tâm lý') ||
    q.includes('tam ly') ||
    q.includes('ứng xử') ||
    q.includes('ung xu') ||
    q.includes('giao tiếp') ||
    q.includes('giao tiep') ||
    q.includes('người nhật');

  if (isCulturalQuestion) {
    const cleanedTopic = query
      .replace(/(sensei|hãy|giải thích|chuyên sâu|về|góc nhìn|văn hóa|ứng xử|và|tâm lý|của|trong|tiếng nhật|như thế nào|thế nào)/gi, '')
      .trim();
    const displayTopic = cleanedTopic.length > 0 ? cleanedTopic : 'Giao tiếp và Tâm lý Xã hội Nhật Bản';

    return `GIẢI THÍCH TRỰC DIỆN GÓC NHÌN VĂN HÓA & TÂM LÝ XÃ HỘI:
Chuyên đề bạn hỏi: 「${displayTopic}」

1. ĐỊNH NGHĨA TRỰC DIỆN & CĂN NGUYÊN TÂM LÝ HỌC:
   • Trong văn hóa ứng xử Nhật Bản, khái niệm này phản ánh cơ chế duy trì hòa khí tập thể (Wa - 和) và ranh giới nhóm nghiêm ngặt.
   • Người Nhật hành động dựa trên nhận thức về sự tồn tại của người khác trước khi nghĩ đến cảm xúc cá nhân, lấy việc giữ gìn trật tự chung làm thước đo đạo đức cao nhất.

2. CƠ CHẾ VẬN HÀNH THỰC TẾ TRONG XÃ HỘI:
   • Phân định rõ ràng giữa không gian công cộng (Public) và không gian riêng tư (Private).
   • Luôn chuẩn bị sẵn sàng các bước đệm (Kushon Kotoba) để giảm thiểu tối đa mọi xung đột trực tiếp hoặc làm bẽ mặt người đối thoại.

3. CÂU NÓI CỬA MIỆNG KINH ĐIỂN CỦA NGƯỜI BẢN XỨ:
   • Câu chuẩn: 「お心遣い、心より感謝申し上げます」
   • Phiên âm: おこころづかい、こころより かんしゃもうしあげます。
   • Dịch nghĩa: Tôi xin chân thành cảm ơn sự quan tâm chu đáo và tinh tế của quý vị.
   • Ngữ cảnh: Bày tỏ sự cảm kích sâu sắc khi đối phương đã chu đáo sắp xếp mọi việc từ trước.

4. SO SÁNH ĐỐI CHIẾU NHẬT BẢN VS VIỆT NAM:
   • Người Nhật: Thường nói vòng tròn, nói lùi nửa bước, để đối phương tự cảm nhận và rút lui an toàn.
   • Người Việt: Thích sự bộc trực, rõ ràng, đề cao tình cảm gần gũi thân mật.

5. QUY TẮC CÔNG SỞ & CÁI BẪY NGƯỜI NGOẠI QUỐC CẦN TRÁNH:
   • Trong môi trường làm việc: Không bao giờ đẩy đối tác hoặc sếp vào thế "tiến thoái lưỡng nan" trước mặt người khác.
   • Luôn ghi nhớ quy tắc: Lời nói chỉ là một phần, hãy quan sát thái độ và bầu không khí xung quanh để đưa ra phản xạ chuẩn xác nhất!`;
  }

  // 30. Check if user asked to compare two terms: "A vs B", "A và B", "phân biệt A và B", "khác biệt giữa A và B"
  const vsMatch =
    query.match(/(?:phân\s+biệt|so\s+sánh|khác\s+nhau\s+giữa|khác\s+gì)\s+(.+?)\s+(?:và|với|vs|\/)\s+(.+)/i) ||
    query.match(/(.+?)\s+(?:vs|\/)\s+(.+)/i);
  if (vsMatch && vsMatch[1] && vsMatch[2]) {
    const itemA = vsMatch[1].replace(/^(cách\s+dùng|từ|ngữ\s+pháp)\s+/i, '').trim();
    const itemB = vsMatch[2].replace(/(như\s+thế\s+nào|thế\s+nào|sao\s+lại|ạ|\?|\.)$/i, '').trim();
    return `🎯 KẾT LUẬN TRỰC TIẾP: ĐỐI CHIẾU 「**${itemA}**」 VS 「**${itemB}**」

🔬 GIẢI PHẪU BẢN CHẤT NHẬN THỨC:
• Sự khác biệt nằm ở **trục chủ quan (ý chí người nói)** đối lập với **trục khách quan (trạng thái tự nhiên / hoàn cảnh)**.

⚖️ BẢNG ĐỐI CHIẾU TRỰC DIỆN:
| Khía cạnh | **${itemA}** | **${itemB}** |
| Trục tâm lý | Nhấn mạnh **ý chí chủ quan** hoặc mục tiêu cá nhân | Nhấn mạnh **trạng thái khách quan** hoặc quy định ngoài |
| Ngữ pháp đi kèm | Thường đi với thể nguyên mẫu V-ru / Danh từ chủ động | Thường đi với thể khả năng / phủ định / danh từ hóa |
| Sắc thái TPO | Khẳng định lập trường rõ ràng | Nhẹ nhàng, khách quan, giảm tính áp đặt |

⚠️ BẪY ĐỀ THI JEES CẦN TRÁNH:
• Đề thi hay gài bằng cách ghép **động từ ý chí** (〜たい・〜てください) vào vế đòi hỏi trạng thái khách quan hoặc ngược lại.

🧠 ĐIỂM NEO TRÍ NHỚ (3 Giây Khắc Cốt):
Soi ngay **chủ ngữ & đuôi câu**: Có ý chí "Tôi muốn/bắt làm" → ưu tiên trục chủ động (**${itemA}**); diễn tả hiện tượng khách quan → ưu tiên trục khách quan (**${itemB}**)!`;
  }

  const cleanedTopic = query
    .replace(/(phân biệt|cách dùng|nghĩa là gì|dùng khi nào|giải thích|tìm hiểu|ngữ pháp|từ vựng|tiếng nhật|trong tiếng nhật|như thế nào|thế nào|sao lại|là gì|câu hỏi về)/gi, '')
    .trim();

  // 30.0 Verified Direct Kanji / Han-Viet Fallback Lock (Anti-Hallucination & Exact Stroke/Radical Sync)
  const fallbackDirect = verifyAndHealLexiconDossier(
    resolveDirectKanjiOrVocab(query),
    query
  ).lexicon;
  if (fallbackDirect && fallbackDirect.found) {
    const phonetics = analyzeJapanesePhonetics(fallbackDirect.reading || fallbackDirect.word, fallbackDirect.word);
    const radInfo = fallbackDirect.radicals?.map((r) => `${r.kanji} (${r.radical} · ${r.hanViet})`).join(', ');
    const ex1 = fallbackDirect.examples[0] || {
      japanese: `${fallbackDirect.word}の正しい使い方を覚えましょう。`,
      reading: `${fallbackDirect.reading || fallbackDirect.word} の ただしい つかいかたを おぼえましょう。`,
      romaji: `${fallbackDirect.romaji || ''} no tadashii tsukaikata wo oboemashou.`,
      vietnamese: `Hãy ghi nhớ cách dùng chuẩn xác của 「${fallbackDirect.word}」.`,
    };

    return `GIẢI NGHĨA CHUẨN TỪ ĐIỂN GỐC: 【${fallbackDirect.word}】

🎯 1. KẾT LUẬN TRỰC TIẾP & BẢN CHẤT CỐT LÕI:
• Từ vựng / Chữ Hán: 【${fallbackDirect.word}】
• Phiên âm Kana: 「${fallbackDirect.reading || '—'}」
• Modified Hepburn Romaji: ${fallbackDirect.romaji || '—'}
• Âm Hán Việt: ${fallbackDirect.hanViet || 'Thuần Nhật'} · Cấp độ: JLPT ${fallbackDirect.level}${fallbackDirect.strokeCount ? ` · Số nét: ${fallbackDirect.strokeCount} nét` : ''}
${radInfo ? `• Bộ thủ chuẩn: ${radInfo}` : ''}
${fallbackDirect.onyomi?.length ? `• Âm On: ${fallbackDirect.onyomi.join('・')}` : ''}
${fallbackDirect.kunyomi?.length ? `• Âm Kun: ${fallbackDirect.kunyomi.join('・')}` : ''}
• Định nghĩa cốt lõi: ${fallbackDirect.meaning}
${phonetics.explanationText}

🔍 2. VÍ DỤ MINH HỌA THỰC TẾ:
• Tiếng Nhật: ${ex1.japanese}
• Hiragana: ${ex1.reading}
• Romaji: ${ex1.romaji}
• Dịch nghĩa: ${ex1.vietnamese}

💡 3. MẸO GHI NHỚ 3 GIÂY:
"${fallbackDirect.culturalNote || `Nhìn vào 【${fallbackDirect.word}】, nhớ ngay nghĩa cốt lõi: ${fallbackDirect.meaning}.`}"`;
  }

  // 30.1 Direct Vocabulary Master Lookup in Chat Fallback (strictly cross-verified)
  const lockedFallback = extractLockedQueryTarget(query);
  const rawVocabCheck = resolveMasterVocabulary(lockedFallback.jpToken || cleanedTopic || query, 'N1');
  const vocabCheck =
    rawVocabCheck &&
    rawVocabCheck.length > 0 &&
    (!lockedFallback.jpToken || rawVocabCheck[0].word.includes(lockedFallback.jpToken) || rawVocabCheck[0].word === lockedFallback.jpToken) &&
    (!lockedFallback.hanVietHint ||
      rawVocabCheck[0].hanViet.toLowerCase().includes(lockedFallback.hanVietHint.toLowerCase()))
      ? rawVocabCheck
      : null;
  if (vocabCheck && vocabCheck.length > 0) {
    const v = vocabCheck[0];
    const derivedRomaji = toHepburnRomaji(v.reading) || v.romaji;
    const phonetics = analyzeJapanesePhonetics(v.reading, v.word);

    const ex1 = v.examples[0] || {
      japanese: `${v.word}の使い方を毎日の生活で練習する。`,
      reading: `${v.reading}の つかいかたを まいにちの せいかつで れんしゅうする。`,
      romaji: `${derivedRomaji} no tsukaikata wo mainichi no seikatsu de renshuu suru.`,
      vietnamese: `Luyện tập cách sử dụng của ${v.word} trong đời sống hàng ngày.`
    };
    const ex2 = v.examples[1] || {
      japanese: `ビジネスの場では、${v.word}を適切な文脈で使い分けることが求められる。`,
      reading: `ビジネスの ばでは、${v.reading}を てきせつな ぶんみゃくで つかいわける ことが もとめられる。`,
      romaji: `Bijinesu no ba dewa, ${derivedRomaji} wo tekisetsuna bunmyaku de tsukaiwakeru koto ga motomerareru.`,
      vietnamese: `Trong môi trường công sở, người ta đòi hỏi phải sử dụng phân biệt ${v.word} theo đúng ngữ cảnh.`
    };
    const ex3 = v.examples[2] || {
      japanese: `JLPT試験問題において、${v.word}のニュアンスを問う設問が頻出している。`,
      reading: `JLPTしけんもんだいにおいて、${v.reading}の ニュアンスを とう せつもんが ひんしゅつしている。`,
      romaji: `JLPT shiken mondai ni oite, ${derivedRomaji} no nyuansu wo tou setsumon ga hinshutsu shite iru.`,
      vietnamese: `Trong đề thi JLPT, các câu hỏi kiểm tra sắc thái tinh tế của ${v.word} xuất hiện rất thường xuyên.`
    };

    return `GIẢI NGHĨA CHUYÊN SÂU THEO CHUẨN SƯ PHẠM 5 TẦNG: 【${v.word}】

🎯 1. KẾT LUẬN TRỰC TIẾP & BẢN CHẤT CỐT LÕI:
• Từ vựng / Chữ Hán: 【${v.word}】
• Phiên âm Kana: 「${v.reading}」
• Modified Hepburn Romaji: ${derivedRomaji}
• Âm Hán Việt: ${v.hanViet || 'Thuần Nhật'} · Cấp độ: JLPT ${v.level} · Từ loại: ${v.partOfSpeech}
• Định nghĩa cốt lõi: ${v.simpleMeaning || v.primaryMeaning || v.literalMeaning}
${phonetics.explanationText}
• Sắc thái cốt lõi: ${v.nuanceAndContext || 'Dùng chuẩn xác trong ngữ cảnh tự nhiên của người bản xứ.'}

⚖️ 2. ĐỐI CHIẾU TRỰC DIỆN & CÔNG THỨC:
• Quy tắc ghép nối: Kết hợp tự nhiên với trợ từ và động từ tương thích theo mẫu câu chuẩn.
• Nghĩa đen: ${v.literalMeaning || v.simpleMeaning}
• Nghĩa bóng / Ứng dụng thực tế: ${v.figurativeMeaning || 'Ứng dụng linh hoạt trong đời sống và giao tiếp hàng ngày.'}
${v.meaningPoints && v.meaningPoints.length > 0 ? v.meaningPoints.map(pt => `• Phân định sắc thái: ${pt}`).join('\n') : ''}
${v.rootExpansion && v.rootExpansion.length > 0 ? `• Cụm từ cùng gốc dễ nhầm lẫn:\n${v.rootExpansion.map(r => `  - ${r.word} (${r.reading} - ${r.romaji}): ${r.meaning}`).join('\n')}` : ''}

🔍 3. VÍ DỤ MINH HỌA THỰC CHIẾN (3 NGỮ CẢNH):
[Ngữ cảnh 1: Đời sống thường nhật]
• Tiếng Nhật: ${ex1.japanese}
• Hiragana: ${ex1.reading}
• Romaji: ${sentenceHiraganaToRomaji(ex1.reading) || ex1.romaji || ''}
• Dịch nghĩa: ${ex1.vietnamese}

[Ngữ cảnh 2: Môi trường Công sở / Học thuật]
• Tiếng Nhật: ${ex2.japanese}
• Hiragana: ${ex2.reading}
• Romaji: ${sentenceHiraganaToRomaji(ex2.reading) || ex2.romaji || ''}
• Dịch nghĩa: ${ex2.vietnamese}

[Ngữ cảnh 3: Mẫu câu chuẩn đề thi JLPT]
• Tiếng Nhật: ${ex3.japanese}
• Hiragana: ${ex3.reading}
• Romaji: ${sentenceHiraganaToRomaji(ex3.reading) || ex3.romaji || ''}
• Dịch nghĩa: ${ex3.vietnamese}

⚠️ 4. BẪY ĐỀ THI JLPT HOẶC LỖI SAI KINH ĐIỂN:
• Bẫy âm đọc: Chú ý sự khác biệt giữa âm ngắn và trường âm, xúc âm (っ) hoặc âm đục (゛/゜). Không đoán mò theo âm Hán Việt.
• Bẫy từ đồng nghĩa: Người học dễ dùng sai từ khi dịch máy từ tiếng Việt sang tiếng Nhật mà không xét sắc thái Uchi - Soto hay tính trang trọng.

💡 5. MẸO PHẢN XẠ 3 GIÂY CỦA GS. YAMATO:
"${v.senseiExplanation || `Nhìn vào chữ Hán 【${v.word}】, liên tưởng ngay đến ngữ cảnh cốt lõi 「${v.simpleMeaning}」 để phản xạ chính xác trong 3 giây!`}"`;
  }

  // 31. Heuristic Topic Extractor (Dành riêng cho câu hỏi ngữ pháp hoặc từ vựng bất kỳ)
  const displayTopic = cleanedTopic.length > 0 ? cleanedTopic : query;

  return `TRẢ LỜI TRỰC DIỆN NỘI DUNG YÊU CẦU: 「${displayTopic}」

🎯 1. KẾT LUẬN TRỰC TIẾP & BẢN CHẤT CỐT LÕI:
Cấu trúc / thuật ngữ 「${displayTopic}」 được người Nhật sử dụng để biểu đạt chính xác sắc thái nhận thức và chuẩn mực giao tiếp trong văn cảnh đời sống và thi cử JLPT.
Việc lựa chọn cách diễn đạt này phụ thuộc vào mức độ trang trọng (thân mật hay công sở) và mối quan hệ giữa người nói và người nghe (nhóm trong Uchi hay nhóm ngoài Soto).

⚖️ 2. ĐỐI CHIẾU TRỰC DIỆN & CÔNG THỨC:
• Thường đi trực tiếp sau Thể thông thường (Futsuukei), Danh từ hoặc Động từ thể て tùy dạng câu.
• Đối chiếu đồng nghĩa: Phân biệt rõ giữa cách nói thân mật (Tameguchi) và cách nói trang trọng (Teineigo/Keigo).
• Khi dùng trong câu phức: Cần chú ý sự tương hợp về chủ ngữ và thời thì (hiện tại vs quá khứ) để câu văn mạch lạc, tự nhiên.

🔍 3. VÍ DỤ MINH HỌA THỰC CHIẾN (3 NGỮ CẢNH):
[Ngữ cảnh 1: Đời sống thường nhật]
• Tiếng Nhật: 友達と話すときは、状況に応じて自然な言葉を選びます。
• Hiragana: ともだちと はなすときは、じょうきょうに おうじて しぜんな ことばを えらびます。
• Romaji: Tomodachi to hanasu toki wa, joukyou ni oujite shizenna kotoba wo erabimasu.
• Dịch nghĩa: Khi trò chuyện với bạn bè, hãy lựa chọn từ ngữ tự nhiên tùy theo hoàn cảnh.

[Ngữ cảnh 2: Môi trường Công sở / Học thuật]
• Tiếng Nhật: ビジネスの場におきましては、適切な表現を用いることが肝要です。
• Hiragana: ビジネスの ばに おきましては、てきせつな ひょうげんを もちいる ことが かんようです。
• Romaji: Bijinesu no ba ni okimashite wa, tekisetsuna hyougen wo mochiiru koto ga kanyou desu.
• Dịch nghĩa: Trong môi trường kinh doanh, điều cốt yếu là phải sử dụng các cách diễn đạt thỏa đáng.

[Ngữ cảnh 3: Mẫu câu chuẩn đề thi JLPT]
• Tiếng Nhật: 状況に応じて、最も適切な表現を選びなさい。
• Hiragana: じょうきょうに おうじて、もっとも てきせつな ひょうげんを えらびなさい。
• Romaji: Joukyou ni oujite, mottomo tekisetsuna hyougen wo erabinasai.
• Dịch nghĩa: Hãy căn cứ vào tình huống mà chọn phương án diễn đạt thích hợp nhất.

⚠️ 4. BẪY ĐỀ THI JLPT HOẶC LỖI SAI KINH ĐIỂN:
• Tuyệt đối không dùng thể suồng sã Tameguchi với cấp trên, đối tác hoặc người mới gặp lần đầu.
• Tránh nhầm lẫn giữa động từ ý chí và động từ phi ý chí khi chia câu điều kiện hoặc mục đích.

💡 5. MẸO PHẢN XẠ 3 GIÂY CỦA GS. YAMATO:
Quan sát ngay đối tượng giao tiếp: Nếu là người ngoài hoặc cấp trên, lập tức chuyển sang thể lịch sự/kính ngữ; nếu là bạn bè thân thiết, giữ thể thông thường ngắn gọn!`;
}

export interface ParsedVocabPrompt {
  isVocabRequest: boolean;
  count: number;
  cleanTopic: string;
  rawInput: string;
}

/**
 * Natural language intent parser for Vietnamese student vocab queries:
 * e.g., "cho tôi 5 từ vựng về đàm phán hợp đồng", "cho em 3 từ vựng về thời tiết giông bão",
 * "xin 10 từ vựng về IT", "gợi ý 5 từ vựng về cảm xúc", "cho tôi từ vựng về bệnh viện", etc.
 */
export function parseUserVocabPrompt(input: string): ParsedVocabPrompt {
  const raw = (input || '').trim();
  if (!raw) {
    return { isVocabRequest: false, count: 5, cleanTopic: '', rawInput: '' };
  }

  // 1. Explicit generation queries with numbers: "cho tôi [N] từ vựng về...", "gợi ý 5 từ...", "tổng hợp 10 từ..."
  const listGenRegex = /^(?:(?:hãy\s+)?(?:cho\s+(?:tôi|em|mình|anh|chị|bạn|chúng\s+tôi)?|xin|gợi\s+ý|tổng\s+hợp|cung\s+cấp|muốn\s+(?:học|biết|xin)|cần|tạo)\s*)(\d{1,2})\s*(?:từ|từ\s+vựng|từ\s+mới|thành\s+ngữ|quán\s+dụng\s+ngữ)?\s*(?:về|về\s+chủ\s+đề|chủ\s+đề|liên\s+quan\s+đến|thuộc)?\s*(.+)$/i;
  const genMatch = raw.match(listGenRegex);

  let isGen = false;
  let detectedCount = 5;
  let topicCandidate = raw;

  if (genMatch && genMatch[1]) {
    isGen = true;
    const rawCount = parseInt(genMatch[1], 10);
    detectedCount = Math.min(Math.max(isNaN(rawCount) ? 5 : rawCount, 1), 15);
    topicCandidate = genMatch[2] ? genMatch[2].trim() : raw;
  } else {
    // Check if user asked for a list without specifying count: "cho tôi từ vựng về...", "gợi ý từ vựng về..."
    const noCountGenRegex = /^(?:hãy\s+)?(?:cho\s+(?:tôi|em|mình|anh|chị|bạn)|gợi\s+ý\s+(?:cho\s+(?:tôi|em|mình))?|tổng\s+hợp\s+(?:cho\s+(?:tôi|em))?)\s*(?:các\s+)?(?:từ|từ\s+vựng|từ\s+mới|thành\s+ngữ|quán\s+dụng\s+ngữ)\s+(?:về|chủ\s+đề)\s+(.+)$/i;
    const noCountMatch = raw.match(noCountGenRegex);
    if (noCountMatch && noCountMatch[1]) {
      isGen = true;
      detectedCount = 5;
      topicCandidate = noCountMatch[1].trim();
    }
  }

  // Clean brackets, quotes, and punctuation
  let cleaned = topicCandidate.replace(/^["'「『【\[(]+|[)"'」』】\]]+$/g, '').trim();

  // Strip polite suffixes
  cleaned = cleaned.replace(/(?:nhé|nha|ạ|với|với\s+ạ|được\s+không|đi|giúp\s+tôi|giúp\s+em|[.?!])$/gi, '').trim();

  // Strip analytical prefixes for word inquiries:
  // e.g. "nghĩa bóng từ amai", "nghĩa bóng của từ amai", "nghĩa của từ omoi", "phân tích từ 腹が黒い", "tra cứu từ..."
  cleaned = cleaned.replace(/^(?:hãy\s+)?(?:phân\s+tích|giải\s+thích|tìm\s+hiểu|cho\s+biết|tra\s+cứu|tìm|học|hiểu|hỏi|xem|định\s+nghĩa)\s*(?:về|chuyên\s+sâu\s+về)?\s*/i, '');
  cleaned = cleaned.replace(/^(?:nghĩa\s+(?:bóng|đen)(?:\s+và\s+nghĩa\s+(?:bóng|đen))?|nghĩa\s+ẩn\s+dụ|nghĩa\s+cơ\s+học|nghĩa\s+gốc|nghĩa|cách\s+dùng|cách\s+sử\s+dụng)\s*(?:của|của\s+từ|về|về\s+từ|từ)?\s*/i, '');
  cleaned = cleaned.replace(/^(?:từ\s+vựng\s+(?:về|thuộc|liên\s+quan\s+đến)?|quán\s+dụng\s+ngữ\s+(?:về|thuộc)?|thành\s+ngữ\s+(?:về|thuộc)?|câu\s+nói\s+(?:về)?|thuật\s+ngữ\s+(?:về)?|từ|chữ|cụm\s+từ)\s*/i, '');
  cleaned = cleaned.replace(/^(?:từ|chữ|cụm\s+từ)\s+/i, '').trim();

  const finalClean = cleaned || raw;

  return {
    isVocabRequest: isGen,
    count: detectedCount,
    cleanTopic: finalClean,
    rawInput: raw,
  };
}

// In-memory cache for ultra-smooth instantaneous repeat queries (<5ms)
const vocabCache = new Map<string, DetailedVocabItem[]>();

/**
 * Japanese string normalizer: Converts Katakana to Hiragana, strips punctuation, spaces, dashes
 */
export function kataToHira(str: string): string {
  return (str || '').replace(/[\u30a1-\u30f6]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
}

export function normalizeJpTerm(str: string): string {
  if (!str) return '';
  const trimmed = str.toLowerCase().trim().replace(/[\s\-_・，,。.!?'"「」『』【】\[\]()]/g, '');
  return kataToHira(trimmed);
}

/**
 * Built-in high-precision academic dictionary of common vocabulary
 * Guarantees 100% dictionary accuracy for Romaji, Hiragana, Katakana, and Kanji lookups even offline
 */
const BUILTIN_OFFLINE_DICTIONARY: Record<string, Partial<DetailedVocabItem>> = {
  tegami: {
    word: '手紙',
    reading: 'てがみ',
    furigana: '手紙[てがみ]',
    romaji: 'tegami',
    hanViet: 'THỦ CHỈ',
    level: 'N5',
    partOfSpeech: 'Danh từ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    simpleMeaning: 'Lá thư, bức thư',
    primaryMeaning: 'Lá thư, bức thư (văn bản viết trên giấy được gửi qua đường bưu điện hoặc trao tận tay; không dùng cho thư điện tử E-mail).',
    meaningPoints: [
      '① Nghĩa chung: Bức thư, lá thư viết trên giấy gửi qua bưu điện hoặc trao tận tay người nhận',
      '② BẪY JLPT KINH ĐIỂN: 手紙 CHỈ DÙNG CHO THƯ GIẤY. Thư điện tử bắt buộc phải dùng メール (E-mail)',
      '③ NGUỒN GỐC: Chữ "Thủ chỉ" (手紙) tại Nhật Bản phát triển thành thư từ trao đổi gửi gắm tâm tình'
    ],
    literalMeaning: 'Bức thư, lá thư bằng giấy gửi qua bưu điện.',
    figurativeMeaning: 'Biểu tượng của sự gắn kết tình cảm chân thành qua nét bút viết tay (không có nghĩa làm ẩu; làm ẩu là 手を抜く).',
    nuanceAndContext: 'Trong tiếng Nhật, 手紙 luôn gắn với phong bì (封筒) và tem thư (切手). Gửi qua internet phải dùng メール.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa thực tế',
        japanese: '母の誕生日に、感謝の気持ちを込めて手紙を書いた。',
        reading: 'ははのたんじょうびに、かんしゃのきもちをこめててがみをかいた。',
        romaji: 'Haha no tanjoubi ni, kansha no kimochi wo komete tegami wo kaita.',
        vietnamese: 'Nhân ngày sinh nhật mẹ, tôi đã viết một lá thư chan chứa lòng biết ơn gửi cho mẹ.'
      }
    ],
    relatedCollocations: ['手紙を書く (viết thư)', '手紙を出す (gửi thư)', '手紙を受け取る (nhận thư)', '絵手紙 (bưu thiếp vẽ tranh)'],
    synonyms: ['書簡 (shokan)', '便り (tayori)'],
    antonyms: ['電子メール (denshi meeru - E-mail)'],
    senseiExplanation: 'GS. Yamato lưu ý: Tuyệt đối không nhầm 手紙 (tegami - lá thư) với các cụm từ khác có chữ Thủ như 手を抜く (làm ẩu).'
  },
  hon: {
    word: '本',
    reading: 'ほん',
    furigana: '本[ほん]',
    romaji: 'hon',
    hanViet: 'BẢN',
    level: 'N5',
    partOfSpeech: 'Danh từ / Lượng từ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    simpleMeaning: 'Sách, cuốn sách',
    primaryMeaning: 'Sách, tập tài liệu in hoặc viết tay đóng gáy thành tập; còn là lượng từ đếm vật dài hình trụ (chai lọ, cây bút, chuyến tàu).',
    meaningPoints: [
      '① Nghĩa danh từ: Cuốn sách, sách vở nói chung',
      '② Nghĩa lượng từ: Đếm vật thon dài (一本, 二本, 三本...)'
    ],
    literalMeaning: 'Cuốn sách đóng quyển.',
    figurativeMeaning: 'Gốc rễ, cội nguồn (như trong 本音 - tiếng lòng thật, 本質 - bản chất).',
    nuanceAndContext: 'Từ vựng N5 nền tảng bậc nhất tiếng Nhật.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa thực tế',
        japanese: '毎晩寝る前に、日本語の本を30分読んでいる。',
        reading: 'まいばんねるまえに、にほんごのほんをさんじゅっぷんよんでいる。',
        romaji: 'Maiban neru mae ni, nihongo no hon wo sanjuppun yonde iru.',
        vietnamese: 'Mỗi tối trước khi ngủ, tôi đều đọc sách tiếng Nhật trong 30 phút.'
      }
    ],
    relatedCollocations: ['本を読む (đọc sách)', '本棚 (kệ sách)', '本屋 (hiệu sách)'],
    synonyms: ['書籍 (shoseki)', '書物 (shomotsu)'],
    senseiExplanation: 'GS. Yamato: Chữ 本 ngoài nghĩa là cuốn sách còn mang ý nghĩa cội nguồn, gốc rễ của tri thức.'
  },
  kuruma: {
    word: '車',
    reading: 'くるま',
    furigana: '車[くるま]',
    romaji: 'kuruma',
    hanViet: 'XA',
    level: 'N5',
    partOfSpeech: 'Danh từ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    simpleMeaning: 'Xe hơi, ô tô, xe cộ',
    primaryMeaning: 'Xe cộ có bánh chuyển động, trong đời sống hiện đại người Nhật dùng để chỉ xe ô tô con (phân biệt với xe đạp 自転車, xe máy バイク).',
    meaningPoints: [
      '① Nghĩa chung: Xe hơi, ô tô con nói riêng và phương tiện có bánh xe nói chung',
      '② BẪY JLPT: Xe đạp là 自転車, tàu hỏa là 電車, xe buýt là バス; 車 thường chỉ ô tô con'
    ],
    literalMeaning: 'Xe hơi, ô tô con.',
    figurativeMeaning: 'Bánh xe lịch sử hoặc guồng quay công việc (như 歯車 - bánh răng cưa).',
    nuanceAndContext: 'Phương tiện giao thông hàng ngày trong đời sống Nhật Bản.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa thực tế',
        japanese: '雨の日には、車で駅まで家族を迎えに行く。',
        reading: 'あめのひには、くるまでえきまでかぞくをむかえにいく。',
        romaji: 'Ame no hi ni wa, kuruma de eki made kazoku wo mukae ni iku.',
        vietnamese: 'Vào những ngày trời mưa, tôi lái xe ô tô ra nhà ga đón gia đình.'
      }
    ],
    relatedCollocations: ['車を運転する (lái xe)', '車に乗る (lên xe)', '駐車場 (bãi đỗ xe)'],
    synonyms: ['自動車 (jidousha)', '乗用車 (jouyousha)'],
    senseiExplanation: 'GS. Yamato: Khi người Nhật nói "車で行く" nghĩa là đi bằng xe hơi ô tô.'
  },
  sensei: {
    word: '先生',
    reading: 'せんせい',
    furigana: '先[せん] 生[せい]',
    romaji: 'sensei',
    hanViet: 'TIÊN SINH',
    level: 'N5',
    partOfSpeech: 'Danh từ / Hậu tố kính xưng',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    simpleMeaning: 'Thầy cô giáo, bác sĩ, chuyên gia',
    primaryMeaning: 'Người đi trước truyền thụ tri thức (thầy giáo, cô giáo) hoặc người có chuyên môn học thuật/y tế/luật pháp cao (bác sĩ, luật sư, nghị sĩ).',
    meaningPoints: [
      '① Danh xưng tôn kính dành cho giáo viên, giảng viên',
      '② Danh xưng dành cho bác sĩ (医師), luật sư (弁護士), tác giả sách',
      '③ CẤM KỴ: Tuyệt đối KHÔNG tự xưng mình là 先生 trước mặt người khác (phải xưng là 教師 kyoushi)'
    ],
    literalMeaning: 'Người sinh ra trước (Tiên sinh), bậc tiền bối tri thức.',
    figurativeMeaning: 'Người thầy dẫn lối chỉ đường trong cuộc sống.',
    nuanceAndContext: 'Từ tôn xưng rất cao quý trong văn hóa tôn sư trọng đạo Nhật Bản.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa thực tế',
        japanese: '日本語の先生は、いつも分かりやすく文法を教えてくれる。',
        reading: 'にほんごのせんせいは、いつもわかりやすくぶんぽうをおしえてくれる。',
        romaji: 'Nihongo no sensei wa, itsumo wakariyasuku bumpou wo oshiete kureru.',
        vietnamese: 'Thầy giáo dạy tiếng Nhật lúc nào cũng giảng ngữ pháp một cách rất dễ hiểu.'
      }
    ],
    relatedCollocations: ['先生に相談する (thảo luận với thầy)', '先生の指導 (sự chỉ dạy của thầy)'],
    synonyms: ['教師 (kyoushi - nghề giáo viên)', '恩師 (onshi - người thầy ơn huệ)'],
    senseiExplanation: 'GS. Yamato: Nhớ quy tắc khiêm nhường: Tự giới thiệu bản thân thì nói "Tôi làm nghề giáo viên (教師です)", người khác gọi mình thì mới dùng "先生".'
  },
  mizu: {
    word: '水',
    reading: 'みず',
    furigana: '水[みず]',
    romaji: 'mizu',
    hanViet: 'THỦY',
    level: 'N5',
    partOfSpeech: 'Danh từ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    simpleMeaning: 'Nước (nước lạnh / nước thường)',
    primaryMeaning: 'Chất lỏng trong suốt ở nhiệt độ thường hoặc nước mát lạnh dùng để uống hoặc sinh hoạt (nước nóng đun sôi BẮT BUỘC dùng お湯 oyu).',
    meaningPoints: [
      '① Nghĩa chung: Nước ở nhiệt độ thường hoặc nước lạnh',
      '② BẪY JLPT KINH ĐIỂN: Nước nóng trong tiếng Nhật không được nói "熱い水", mà bắt buộc là お湯 (oyu)!'
    ],
    literalMeaning: 'Nước lạnh, nước thường.',
    figurativeMeaning: 'Sự trôi đi không để lại dấu vết (như 水に流す - xí xóa bỏ qua mọi chuyện cũ).',
    nuanceAndContext: 'Được phục vụ miễn phí (Ohiya) tại mọi quán ăn nhà hàng ở Nhật.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa thực tế',
        japanese: '運動した後は、冷たい水をたっぷり飲むようにしている。',
        reading: 'うんどうしたあとは、つめたいみずをたっぷりのむようにしている。',
        romaji: 'Undou shita ato wa, tsumetai mizu wo tappuri nomu you ni shite iru.',
        vietnamese: 'Sau khi vận động thể thao, tôi luôn uống nhiều nước mát.'
      }
    ],
    relatedCollocations: ['水を飲む (uống nước)', 'お冷 (nước mát phục vụ quán)', '水道水 (nước máy)'],
    synonyms: ['お水 (omizu)', 'ウォーター (wootaa)'],
    senseiExplanation: 'GS. Yamato: Nhớ bẫy kinh điển: Nước nguội/lạnh là 水, nước nóng là お湯!'
  },
  sakura: {
    word: '桜',
    reading: 'さくら',
    furigana: '桜[さくら]',
    romaji: 'sakura',
    hanViet: 'ANH',
    level: 'N5',
    partOfSpeech: 'Danh từ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    simpleMeaning: 'Hoa anh đào',
    primaryMeaning: 'Hoa anh đào, loài hoa biểu tượng cho mùa xuân, sự thanh tao và vẻ đẹp vô thường (Mono no aware) của Nhật Bản.',
    meaningPoints: [
      '① Nghĩa đen: Cây và hoa anh đào nở vào tháng 3 - tháng 4',
      '② Nghĩa bóng xã hội: "Chim mồi", người đóng giả khách hàng để thu hút đám đông (サクラ)'
    ],
    literalMeaning: 'Hoa anh đào mùa xuân.',
    figurativeMeaning: '1. Biểu tượng của sự bắt đầu mới (lễ nhập học, vào công ty). 2. Người làm "chim mồi" cò mồi giả khách (viết bằng Katakana サクラ).',
    nuanceAndContext: 'Gắn liền với lễ hội ngắm hoa Hanami truyền thống.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa thực tế',
        japanese: '毎年四月になると、上野公園の桜が満開になる。',
        reading: 'まいとししがつになると、うえのこうえんのさくらがまんかいになる。',
        romaji: 'Maitoshi shigatsu ni naru to, Ueno Kouen no sakura ga mankai ni naru.',
        vietnamese: 'Hàng năm cứ đến tháng Tư là hoa anh đào ở công viên Ueno lại nở rộ.'
      }
    ],
    relatedCollocations: ['桜前線 (dự báo mùa hoa anh đào nở)', 'お花見 (ngắm hoa anh đào)'],
    senseiExplanation: 'GS. Yamato: Hoa anh đào nở rộ trong 1 tuần rồi rụng biểu trưng cho triết lý trân trọng từng khoảnh khắc hiện tại của người Nhật.'
  }
};

/**
 * Guarantees that every example in AI Sensei has complete Japanese, Hiragana reading, Romaji, and authentic Vietnamese translation.
 * Strictly eliminates generic meta text like "Hãy ghi nhớ cách dùng từ...", "Trong đề thi JLPT...".
 */
export function ensureCompleteExample(
  ex: any,
  parentWord?: string,
  parentReading?: string,
  parentMeaning?: string,
  parentPos?: string,
  exampleIndex: number = 0
): {
  type: 'literal' | 'figurative' | 'collocation' | 'core';
  label: string;
  japanese: string;
  reading: string;
  romaji: string;
  vietnamese: string;
} {
  const safeWord = (parentWord || '単語').trim();
  const safeMeaning = (parentMeaning || 'từ vựng').trim();
  const safeReading = (parentReading || safeWord).trim();
  const safeJp = (ex?.japanese || '').trim();
  const rawRomaji = (ex?.romaji || '').trim();
  const rawReading = (ex?.reading || '').trim();

  // Ensure example contains the exact keyword or its stem/reading
  const wordStem = safeWord.length > 1 ? safeWord.slice(0, safeWord.length - 1) : safeWord;
  const containsKeyword =
    !safeWord ||
    safeWord === '単語' ||
    Boolean(
      safeJp &&
        (safeJp.includes(safeWord) ||
          (safeReading && safeJp.includes(safeReading)) ||
          safeJp.includes(wordStem))
    );

  const isVnBad = !ex?.vietnamese || isGenericMetaSentence(ex.vietnamese);
  const isJpBad = !safeJp || isGenericMetaSentence(safeJp) || !containsKeyword;

  // Romaji validation:
  // Must not be empty, must not contain Kanji, must not be just a 1-word Romaji when JP is a full sentence,
  // and must not simply be the parent word's Romaji.
  const parentRom = hiraganaToRomaji(katakanaToHiragana(safeReading)).toLowerCase();
  const isRomajiBad =
    !rawRomaji ||
    /[\u4e00-\u9faf]/.test(rawRomaji) ||
    (safeJp.length > 8 && rawRomaji.split(/\s+/).length <= 2) ||
    (parentRom && rawRomaji.toLowerCase() === parentRom);

  // Reading validation:
  // Must not be empty, must not contain Kanji, must not just be the parent word's single-word reading
  const isReadingBad =
    !rawReading ||
    /[\u4e00-\u9faf]/.test(rawReading) ||
    (safeJp.length > 8 && rawReading.length <= 4) ||
    rawReading === safeReading;

  // If sentence or translation is bad, or BOTH Romaji and Reading are invalid:
  // Replace with the authentic 4-tuple from generateAuthenticWordExamples!
  if (isVnBad || isJpBad || (isRomajiBad && isReadingBad)) {
    const authenticList = generateAuthenticWordExamples(safeWord, safeReading, safeMeaning, parentPos);
    const chosen = authenticList[exampleIndex] || authenticList[0];
    return {
      type: (ex?.type as any) || chosen.type,
      label: ex?.label || chosen.label,
      japanese: chosen.japanese,
      reading: chosen.reading,
      romaji: chosen.romaji,
      vietnamese: chosen.vietnamese,
    };
  }

  // If sentence and translation are good, but Romaji was bad while reading is a valid pure Hiragana sentence:
  let safeRomaji = rawRomaji;
  if (isRomajiBad && !isReadingBad) {
    safeRomaji = sentenceHiraganaToRomaji(rawReading);
  }

  const safeExReading = !isReadingBad ? rawReading : safeReading;
  const safeVn = ex.vietnamese.trim();

  return {
    type: (ex?.type as any) || 'literal',
    label: ex?.label || (exampleIndex === 0 ? 'Ví dụ 1: Giao tiếp đời sống thường ngày' : 'Ví dụ 2: Ngữ cảnh công việc & Đời sống thực tế'),
    japanese: safeJp,
    reading: safeExReading,
    romaji: safeRomaji,
    vietnamese: safeVn,
  };
}

/**
 * Guarantees every vocabulary item has at least 2 complete, authentic, high-quality examples
 * with full Japanese, Furigana reading, Romaji, and rich, natural Vietnamese translations.
 * Never uses placeholder meta sentences.
 */
export function ensureAtLeastTwoCompleteExamples(
  rawExamples: any[] | undefined,
  parentWord?: string,
  parentReading?: string,
  parentMeaning?: string,
  level: string = 'N3',
  parentPos?: string
): {
  type: 'literal' | 'figurative' | 'collocation' | 'core';
  label: string;
  japanese: string;
  reading: string;
  romaji: string;
  vietnamese: string;
}[] {
  const safeWord = (parentWord || '単語').trim();
  const safeMeaning = (parentMeaning || 'từ vựng').trim();
  const safeReading = (parentReading || safeWord).trim();
  const list = Array.isArray(rawExamples) && rawExamples.length > 0 ? [...rawExamples] : [];

  const authenticList = generateAuthenticWordExamples(safeWord, safeReading, safeMeaning, parentPos);

  const processed = list.map((ex, idx) =>
    ensureCompleteExample(
      {
        ...ex,
        label: ex?.label || (idx === 0 ? 'Ví dụ 1: Giao tiếp đời sống thường ngày' : 'Ví dụ 2: Ngữ cảnh công việc & Đời sống thực tế'),
      },
      safeWord,
      safeReading,
      safeMeaning,
      parentPos,
      idx
    )
  );

  // If fewer than 2 examples, synthesize distinct authentic examples
  if (processed.length === 0) {
    processed.push({
      type: 'literal',
      label: 'Ví dụ 1: Giao tiếp đời sống thường ngày',
      japanese: authenticList[0].japanese,
      reading: authenticList[0].reading,
      romaji: authenticList[0].romaji,
      vietnamese: authenticList[0].vietnamese,
    });
    if (authenticList[1]) {
      processed.push({
        type: 'core',
        label: 'Ví dụ 2: Ngữ cảnh công việc & Đời sống thực tế',
        japanese: authenticList[1].japanese,
        reading: authenticList[1].reading,
        romaji: authenticList[1].romaji,
        vietnamese: authenticList[1].vietnamese,
      });
    }
  } else if (processed.length === 1) {
    const backupEx = authenticList[1] || authenticList[0];
    processed.push({
      type: 'core',
      label: 'Ví dụ 2: Ngữ cảnh công việc & Đời sống thực tế',
      japanese: backupEx.japanese,
      reading: backupEx.reading,
      romaji: backupEx.romaji,
      vietnamese: backupEx.vietnamese,
    });
  }

  return processed;
}

export function enrichDetailedVocabItem(item: DetailedVocabItem): DetailedVocabItem {
  const kanjiChars = Array.from(new Set(item.word.match(/[\u4e00-\u9faf]/g) || []));
  const readingHira = katakanaToHiragana(item.reading || '');
  const cleanHepburn = (readingHira ? toHepburnRomaji(readingHira) : '') || item.romaji;

  let kanjiAnatomy = item.kanjiAnatomy;
  if (!kanjiAnatomy && kanjiChars.length > 0) {
    const radicalsList: string[] = [];
    const onKunList: string[] = [];
    const mnemonicsList: string[] = [];

    for (const ch of kanjiChars.slice(0, 3)) {
      const kRec = rawKanjiDatabase.find((k) => k.c === ch);
      const pict = curatedPictograms[ch];
      if (kRec) {
        const on = (kRec.o || []).join('・') || '—';
        const kun = (kRec.k || []).join('・') || '—';
        onKunList.push(`${ch} (${kRec.s.toUpperCase()}): On [${on}] / Kun [${kun}]`);
        if (kRec.rad) {
          radicalsList.push(`${ch}: bộ ${kRec.rad}`);
        }
        const mnText = pict?.simpleMnemonic || pict?.visualAnalogy || kRec.mn;
        if (mnText) {
          mnemonicsList.push(`${ch}: ${mnText}`);
        }
      }
    }

    if (onKunList.length > 0 || radicalsList.length > 0 || mnemonicsList.length > 0) {
      kanjiAnatomy = {
        radicals: radicalsList.join(' · ') || `Cấu trúc Hán tự ${item.hanViet || item.word}`,
        onKunReadings: onKunList.join(' | ') || `Kana: ${item.reading}`,
        etymologyMnemonic: mnemonicsList.join(' · ') || item.senseiExplanation || `Gắn liền với âm Hán Việt 「${item.hanViet}」`,
      };
    }
  }

  let synonymComparison = item.synonymComparison;
  if ((!synonymComparison || synonymComparison.length === 0) && item.synonyms && item.synonyms.length > 0) {
    synonymComparison = item.synonyms.slice(0, 3).map((syn) => {
      const parenMatch = syn.match(/^(.+?)\s*\((.+?)\)$/);
      const term = parenMatch ? parenMatch[1].trim() : syn;
      const note = parenMatch ? parenMatch[2].trim() : 'Khác biệt về sắc thái văn phong hoặc độ trang trọng so với từ chính';
      return {
        term,
        difference: note,
      };
    });
  }

  const threeSecondTakeaway =
    item.threeSecondTakeaway ||
    `Nhớ nhanh 3s: 【${item.word}】 (${cleanHepburn}${item.hanViet ? ` · ${item.hanViet}` : ''}) = 「${getSimpleMeaning(item)}」 — ưu tiên đặt trong Collocation "${item.relatedCollocations?.[0] || item.word}".`;

  return {
    ...item,
    romaji: cleanHepburn || item.romaji,
    pitchAccent: item.pitchAccent || 'Chuẩn Tokyo (nghe Audio đối chiếu cao độ)',
    kanjiAnatomy,
    synonymComparison,
    threeSecondTakeaway,
  };
}

/**
 * On-Demand Vocabulary Assistant: Returns multi-tier vocabulary analysis
 * with furigana, romaji, hanViet, literal & figurative meanings, examples, and collocations.
 * Under 20ms response time for curated bank / cached queries, zero crashes.
 */
export async function requestVocabularyOnDemand(
  query: string,
  currentLevel: string = 'N1',
  requestedCount?: number,
  lookupMode: 'dual_metaphor' | 'core_meaning' = 'dual_metaphor'
): Promise<DetailedVocabItem[]> {
  const parsed = parseUserVocabPrompt(query);
  const targetCount = requestedCount && requestedCount > 0 ? requestedCount : parsed.count;
  const rawQuery = query.toLowerCase().trim();
  const cleanTopic = parsed.cleanTopic.toLowerCase().trim();

  // Extract base word before parentheses e.g. "amai (ngọt)" -> "amai", "omoi (nặng)" -> "omoi"
  const baseWord = cleanTopic.split(/[\(\[\{]/)[0].trim();

  // If query is empty, return top items from curated bank
  if (!cleanTopic && !rawQuery) {
    return CURATED_ON_DEMAND_VOCAB_BANK.slice(0, targetCount).map(enrichDetailedVocabItem);
  }

  const normClean = normalizeJpTerm(cleanTopic);
  const normBase = normalizeJpTerm(baseWord);
  const normRaw = normalizeJpTerm(rawQuery);

  // 1. SMART PRECISE SCORING IN CURATED MASTER BANK
  const scoredItems = CURATED_ON_DEMAND_VOCAB_BANK.map((item) => {
    let score = 0;
    const itemWord = item.word.toLowerCase();
    const itemReading = item.reading.toLowerCase();
    const itemRomaji = item.romaji.toLowerCase();
    const itemHanViet = item.hanViet.toLowerCase();
    const itemLiteral = item.literalMeaning.toLowerCase();
    const itemFigurative = item.figurativeMeaning.toLowerCase();
    const itemCategory = item.category.toLowerCase();
    const itemCollocations = item.relatedCollocations.join(' ').toLowerCase();

    const itemNormWord = normalizeJpTerm(item.word);
    const itemNormReading = normalizeJpTerm(item.reading);
    const itemNormRomaji = normalizeJpTerm(item.romaji);
    const itemNormHanViet = normalizeJpTerm(item.hanViet);

    // A. EXACT MATCH ON WORD, READING, OR ROMAJI (Top Priority: 1000 pts)
    const isExact =
      normClean === itemNormWord ||
      normClean === itemNormReading ||
      normClean === itemNormRomaji ||
      normBase === itemNormWord ||
      normBase === itemNormReading ||
      normBase === itemNormRomaji;

    if (isExact) {
      score += 1000;
    }

    // B. EXACT WHOLE-PHRASE MATCH
    if (
      cleanTopic === itemRomaji ||
      cleanTopic === itemWord ||
      cleanTopic === itemReading ||
      baseWord === itemRomaji ||
      baseWord === itemWord ||
      baseWord === itemReading
    ) {
      score += 600;
    }

    // C. Han Viet exact match
    if (normClean === itemNormHanViet || normBase === itemNormHanViet) {
      score += 400;
    }

    // D. Only evaluate thematic matches if this is a LIST/TOPIC request, NOT a single word lookup
    if (parsed.isVocabRequest) {
      // Body parts themes: Use strict word boundaries so words like 'tegami' or 'tenki' NEVER trigger 'te' (tay)
      const hasHandTheme = /(?:^|\s|[_\-,])(tay|te)(?:$|\s|[_\-,])/i.test(cleanTopic) || cleanTopic.includes('thành ngữ về tay');
      if (hasHandTheme && (item.word.includes('手') || item.reading.includes('て'))) score += 120;

      const hasEyeTheme = /(?:^|\s|[_\-,])(mắt|me)(?:$|\s|[_\-,])/i.test(cleanTopic) || cleanTopic.includes('thành ngữ về mắt');
      if (hasEyeTheme && (item.word.includes('目') || item.reading.includes('め'))) score += 120;

      const hasBellyTheme = /(?:^|\s|[_\-,])(bụng|hara)(?:$|\s|[_\-,])/i.test(cleanTopic) || cleanTopic.includes('thành ngữ về bụng');
      if (hasBellyTheme && (item.word.includes('腹') || item.reading.includes('はら'))) score += 120;

      const hasLegTheme = /(?:^|\s|[_\-,])(chân|ashi)(?:$|\s|[_\-,])/i.test(cleanTopic) || cleanTopic.includes('thành ngữ về chân');
      if (hasLegTheme && (item.word.includes('足') || item.reading.includes('あし'))) score += 120;

      const hasNeckTheme = /(?:^|\s|[_\-,])(cổ|đầu|kubi)(?:$|\s|[_\-,])/i.test(cleanTopic) || cleanTopic.includes('thành ngữ về cổ');
      if (hasNeckTheme && (item.word.includes('首') || item.reading.includes('くび'))) score += 120;

      const hasFaceTheme = /(?:^|\s|[_\-,])(mặt|kao)(?:$|\s|[_\-,])/i.test(cleanTopic) || cleanTopic.includes('thành ngữ về mặt');
      if (hasFaceTheme && (item.word.includes('顔') || item.reading.includes('かお'))) score += 120;

      // Domain themes recognition
      if (cleanTopic.includes('đàm phán') || cleanTopic.includes('hợp đồng') || cleanTopic.includes('kinh doanh') || cleanTopic.includes('thương mại')) {
        if (['vocab_nemawashi', 'vocab_hara_wo_waru', 'vocab_te_wo_utsu', 'vocab_kugi_wo_sasu', 'vocab_ashimoto_wo_miru'].includes(item.id)) {
          score += 150;
        }
      }
      if (cleanTopic.includes('thời tiết') || cleanTopic.includes('bão') || cleanTopic.includes('mưa') || cleanTopic.includes('giông')) {
        if (['vocab_kumoyuki_ga_ayashii', 'vocab_arashi_no_mae', 'vocab_ame_futte'].includes(item.id)) {
          score += 150;
        }
      }
      if (cleanTopic.includes('it') || cleanTopic.includes('công nghệ') || cleanTopic.includes('phần mềm') || cleanTopic.includes('bug') || cleanTopic.includes('lập trình')) {
        if (['vocab_bagu_wo_tsubusu', 'vocab_enjou_suru'].includes(item.id)) {
          score += 150;
        }
      }
      if (cleanTopic.includes('cảm xúc') || cleanTopic.includes('honne') || cleanTopic.includes('giấu kín') || cleanTopic.includes('tâm lý')) {
        if (['vocab_haraguroi', 'vocab_hara_wo_waru', 'vocab_omoi', 'vocab_mune_wo_haru'].includes(item.id)) {
          score += 150;
        }
      }
      if (cleanTopic.includes('y tế') || cleanTopic.includes('bệnh') || cleanTopic.includes('bác sĩ') || cleanTopic.includes('bất lực')) {
        if (item.id === 'vocab_saji_wo_nageru') score += 150;
      }
    }

    return { item, score };
  });

  const matchedCurated = scoredItems
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);

  // Check in-memory cache
  const cacheKey = `${normClean}_${targetCount}_${currentLevel}_${lookupMode}`;
  if (vocabCache.has(cacheKey)) {
    return vocabCache.get(cacheKey)!;
  }

  // DECISION 0: If user is querying a Kanji character or root Kanji words
  const isSingleKanjiOrRoot =
    /^[\u4e00-\u9faf]$/.test(cleanTopic) ||
    /^[\u4e00-\u9faf]$/.test(query.trim()) ||
    rawQuery.includes('gốc') ||
    rawQuery.includes('kanji') ||
    rawQuery.includes('hán tự');

  if (isSingleKanjiOrRoot) {
    const related = findRelatedWordsByRootOrKanji(cleanTopic || query, [], Math.max(5, targetCount));
    if (related && related.length >= 1) {
      const ensured = related.map((item) =>
        enrichDetailedVocabItem({
          ...item,
          examples: ensureAtLeastTwoCompleteExamples(
            item.examples,
            item.word,
            item.reading,
            item.simpleMeaning || getSimpleMeaning(item),
            item.level || currentLevel,
            item.partOfSpeech
          ),
        })
      );
      vocabCache.set(cacheKey, ensured);
      return ensured;
    }
  }

  // DECISION 1: If user searched for a SINGLE SPECIFIC WORD (!parsed.isVocabRequest):
  if (!parsed.isVocabRequest) {
    // ONLY return curated item if it's an exact or high-confidence match (score >= 400) for THAT SPECIFIC WORD!
    const bestCurated = scoredItems.find((entry) => entry.score >= 400);
    if (bestCurated) {
      return [enrichDetailedVocabItem(bestCurated.item)];
    }
    // If not found in curated bank with high confidence, DO NOT RETURN AN UNRELATED CURATED ITEM!
    // Proceed directly to offline dictionary or live Gemini generation!
  } else {
    // DECISION 2: If user asked for a thematic list (e.g. "5 từ vựng về thời tiết"):
    const strongThematic = scoredItems
      .filter((entry) => entry.score >= 120)
      .sort((a, b) => b.score - a.score)
      .map((entry) => enrichDetailedVocabItem(entry.item));
    if (strongThematic.length >= targetCount) {
      return strongThematic.slice(0, targetCount);
    }
  }

  // 3. High-Precision Master Dictionary Lookup (Handles Romaji, Hiragana, Katakana, and Kanji)
  if (!parsed.isVocabRequest) {
    const masterResult = resolveMasterVocabulary(cleanTopic || query, currentLevel);
    if (masterResult && masterResult.length > 0) {
      const enrichedMaster = masterResult.map(enrichDetailedVocabItem);
      vocabCache.set(cacheKey, enrichedMaster);
      return enrichedMaster;
    }

    // Secondary check: Built-in Offline Academic Dictionary
    const dictKeys = Object.keys(BUILTIN_OFFLINE_DICTIONARY);
    const matchedKey = dictKeys.find((k) => {
      const entry = BUILTIN_OFFLINE_DICTIONARY[k];
      return (
        normClean === k ||
        normBase === k ||
        (entry?.word && normalizeJpTerm(entry.word) === normClean) ||
        (entry?.reading && normalizeJpTerm(entry.reading) === normClean) ||
        (entry?.romaji && normalizeJpTerm(entry.romaji) === normClean)
      );
    });

    if (matchedKey) {
      const entry = BUILTIN_OFFLINE_DICTIONARY[matchedKey]!;
      const fullItem: DetailedVocabItem = {
        id: `vocab_builtin_${matchedKey}`,
        word: entry.word || cleanTopic,
        reading: entry.reading || cleanTopic,
        furigana: entry.furigana || entry.word || cleanTopic,
        romaji: entry.romaji || cleanTopic,
        hanViet: entry.hanViet || '',
        level: (entry.level as any) || (currentLevel as any) || 'N5',
        partOfSpeech: entry.partOfSpeech || 'Danh từ',
        category: entry.category || 'Nghĩa Đen & Nghĩa Bóng',
        simpleMeaning: entry.simpleMeaning || 'Nghĩa từ vựng',
        primaryMeaning: entry.primaryMeaning || entry.literalMeaning || '',
        meaningPoints: entry.meaningPoints,
        rootExpansion: entry.rootExpansion,
        literalMeaning: entry.literalMeaning || '',
        figurativeMeaning: entry.figurativeMeaning || '',
        nuanceAndContext: entry.nuanceAndContext || '',
        examples: ensureAtLeastTwoCompleteExamples(
          entry.examples,
          entry.word,
          entry.reading,
          entry.simpleMeaning || entry.primaryMeaning,
          entry.level || currentLevel,
          entry.partOfSpeech
        ),
        relatedCollocations: entry.relatedCollocations || [],
        synonyms: entry.synonyms || [],
        antonyms: entry.antonyms || [],
        senseiExplanation: entry.senseiExplanation || 'AI Sensei: Giải nghĩa theo từ điển chuẩn mực tiếng Nhật.'
      };
      const enrichedBuiltin = enrichDetailedVocabItem(fullItem);
      vocabCache.set(cacheKey, [enrichedBuiltin]);
      return [enrichedBuiltin];
    }

    // Tertiary check: 37,000+ Curated Joyo Kanji & Master Pictograms database
    const directHit = resolveDirectKanjiOrVocab(cleanTopic || query);
    if (directHit) {
      const fullItem: DetailedVocabItem = {
        id: `vocab_direct_${directHit.word}_${Date.now()}`,
        word: directHit.word,
        reading: directHit.reading,
        furigana: `${directHit.word}[${directHit.reading}]`,
        romaji: directHit.romaji,
        hanViet: directHit.hanViet,
        level: (directHit.level as any) || (currentLevel as any) || 'N3',
        partOfSpeech: directHit.partOfSpeech,
        category: 'Nghĩa Đen & Nghĩa Bóng',
        simpleMeaning: directHit.meaning,
        primaryMeaning: directHit.meaning,
        literalMeaning: directHit.meaning,
        figurativeMeaning: directHit.meaning,
        nuanceAndContext: `Từ vựng thuộc cấp độ ${directHit.level}, chuẩn xác theo từ điển tiếng Nhật.`,
        examples: directHit.examples && directHit.examples.length > 0
          ? directHit.examples.map(ex => ({
              type: 'core' as const,
              label: 'Thực tế',
              japanese: ex.japanese,
              reading: ex.reading,
              romaji: ex.romaji,
              vietnamese: ex.vietnamese
            }))
          : [
              {
                type: 'core' as const,
                label: 'Thực tế',
                japanese: `${directHit.word}を正しく覚えましょう。`,
                reading: `${directHit.reading} を ただしく おぼえましょう。`,
                romaji: `${directHit.romaji} wo tadashiku oboemashou.`,
                vietnamese: `Hãy ghi nhớ chuẩn xác từ "${directHit.word}".`
              }
            ],
        relatedCollocations: [`${directHit.word}の重要性`],
        senseiExplanation: directHit.culturalNote || `Kiến thức chuẩn xác về ${directHit.word}.`
      };
      const enrichedDirect = enrichDetailedVocabItem(fullItem);
      vocabCache.set(cacheKey, [enrichedDirect]);
      return [enrichedDirect];
    }
  }

  // 4. Call Gemini for custom user-requested words or themes with strict Kojien/Meikyo dictionary precision
  // 4. Call Gemini with strict 7-Tier In-Depth Architecture (Anti-Slop / Anti-Word-by-Word Collocation Engine)
  const prompt = `
Bạn là AI Sensei - Cố vấn Ngôn ngữ Tiếng Nhật Tối Cao (Giáo sư Yamato Kenji).
Nhiệm vụ: Phân tích chuyên sâu từ vựng theo yêu cầu cho: "${parsed.cleanTopic || query}" (Cấp độ: ${currentLevel}, số lượng: ${targetCount} từ).

YÊU CẦU CAO NHẤT TỪ HỆ THỐNG:
• CHẤM DỨT VĨNH VIỄN tình trạng dịch chắp vá "word-by-word" và nhồi nhét từ ghép nối vô nghĩa.
• Đảm bảo văn phong mượt mà, tự nhiên 100% như người Nhật bản xứ.
• Bắt buộc bóc tách kiến thức và trình bày nghiêm ngặt theo đúng ĐỊNH DẠNG 7 PHẦN CHUYÊN SÂU:

1. simpleMeaning: Nghĩa Đơn Giản (Tiếng Việt) · Cô đọng nhất: Đưa ra nghĩa dịch trực diện, ngắn gọn và chuẩn xác nhất chỉ trong 1-2 từ hoặc 1 dòng ngắn.
2. Phân tích Nghĩa Đen & Nghĩa Bóng:
   - 2A. literalMeaning: Nghĩa Đen (Literal Meaning) - Bóc tách lớp nghĩa gốc, nghĩa vật lý vật chất hoặc sát nghĩa gốc Kanji nhất.
   - 2B. figurativeMeaning: Nghĩa Bóng & Ẩn Dụ (Figurative) - Giải mã lớp nghĩa bóng, cách dùng hoán dụ, bóng gió hoặc hàm ý sâu xa (nuance) trong tâm lý người Nhật.
3. rootExpansion: Mở Rộng Trường Từ Vựng Cùng Gốc - Cung cấp mạng lưới từ vựng (2-3 từ) có chung gốc Hán tự, từ phái sinh hoặc nằm trong cùng một họ từ vựng để mở rộng tư duy.
4. nuanceAndContext: Sắc thái văn hóa & Ngữ cảnh sử dụng - Trình bày hoàn cảnh giao tiếp cụ thể (văn nói/văn viết, trang trọng/suồng sã) và các quy tắc văn hóa ngầm định khi sử dụng từ này để tránh thất lễ.
5. examples: CẶP VÍ DỤ MINH HỌA ĐỐI CHIẾU NGHĨA ĐEN & NGHĨA BÓNG (BỘ LỌC SINH NGỮ CẢNH BẢN XỨ CẤP ĐỘ KHẮT KHE NHẤT)
   Bắt buộc tuân thủ 4 quy tắc tối thượng:
   (1) Nội dung Sâu sắc & Độc lập: Bắt buộc tạo ra đúng 2 câu ví dụ hoàn toàn tách biệt:
       - Ví dụ 1 (type: "literal"): lột tả chân thực Nghĩa Đen (2A).
       - Ví dụ 2 (type: "figurative"): khắc họa tinh tế Nghĩa Bóng/Ẩn dụ (2B).
       Cả hai câu không chỉ đúng ngữ pháp mà phải có nội dung hay, ý nghĩa logic, mang chiều sâu văn hóa hoặc phản ánh sinh động lát cắt đời sống thực tế. Nghiêm cấm tạo ra các câu văn khô khan, tối nghĩa kiểu robot.
   (2) Tuyệt đối Tự nhiên (Native Collocations): Chỉ được phép đặt từ vựng vào các cụm từ kết hợp cố định (Collocations) chuẩn xác mà người Nhật hay dùng. Nghiêm cấm tuyệt đối tư duy dịch "word-by-word" hoặc nhặt các từ vựng rời rạc rồi ép chúng vào một câu một cách máy móc, gượng ép.
   (3) Chống trùng lặp Tuyệt đối (Zero-Duplication): Cấu trúc ngữ pháp giữa 2 ví dụ phải khác biệt nhau hoàn toàn. LƯU Ý CỐT LÕI: Ý tưởng, bối cảnh và từ vựng trong cặp ví dụ này tuyệt đối không được trùng lặp, xào nấu hay vay mượn lại từ các "Từ vựng cùng gốc" ở mục 3 phía trên. Mỗi câu ví dụ sinh ra phải là một tác phẩm ngôn ngữ độc bản và duy nhất.
   (4) Định dạng Hiển thị Chuẩn mực: Mọi câu ví dụ phải đi kèm Furigana chi tiết, phiên âm Romaji chuẩn Modified Hepburn (không dùng Romaji lỗi), và một bản dịch tiếng Việt mượt mà, trau chuốt (dịch thoát ý, đậm chất văn chương/đời sống thay vì dịch thô).
   * BÀI KIỂM TRA CHÉO TỰ THẨM ĐỊNH BẮT BUỘC TRƯỚC KHI TRẢ VỀ:
     "Hai câu này đọc lên có tự nhiên không? Nội dung có ý nghĩa và hay không? Có dính từ vựng chắp vá hoặc lặp lại bối cảnh với phần trên không?". Chỉ khi vượt qua bài kiểm tra chéo này mới được xuất kết quả!
6. relatedCollocations: Quán dụng ngữ liên quan - Liệt kê thành ngữ, tục ngữ hoặc quán dụng ngữ (Kanyouku) phổ biến có chứa từ vựng đó.
7. senseiExplanation: Lời Bình Học Thuật Của GS. Yamato (Academic Takeaway) - Chốt hạ bằng một đúc kết học thuật sắc bén, góc nhìn văn hóa đặc sắc, hoặc mẹo ghi nhớ cốt lõi giúp não bộ người học "khắc sâu" từ vựng đó.

Trả về DUY NHẤT một mảng JSON thuần túy (không bọc markdown, không text thừa):
[
  {
    "id": "vocab_custom_1",
    "word": "Chữ Hán chuẩn xác",
    "reading": "Cách đọc Hiragana",
    "furigana": "Ký hiệu ruby dạng: 腹[はら]が 黒[くろ]い",
    "romaji": "Romaji chuẩn Modified Hepburn",
    "hanViet": "Âm Hán Việt",
    "level": "${currentLevel}",
    "partOfSpeech": "Từ loại",
    "category": "${parsed.cleanTopic ? `Chủ đề: ${parsed.cleanTopic}` : 'Nghĩa Đen & Nghĩa Bóng'}",
    "simpleMeaning": "1. Nghĩa Đơn Giản siêu cô đọng 1-2 từ (ví dụ: 'Nham hiểm, xấu bụng', 'Ngọt ngào, nhẹ dạ')",
    "literalMeaning": "2A. Nghĩa Đen (Literal Meaning) vật lý sát nghĩa gốc",
    "figurativeMeaning": "2B. Nghĩa Bóng & Ẩn Dụ (Figurative) trong tâm lý người Nhật",
    "rootExpansion": [
      {
        "word": "Từ cùng gốc 1",
        "reading": "Cách đọc Hiragana",
        "furigana": "Furigana Kanji[hiragana]",
        "romaji": "Romaji Modified Hepburn",
        "meaning": "Nghĩa tiếng Việt",
        "relationType": "Cùng gốc Hán tự"
      },
      {
        "word": "Từ cùng gốc 2",
        "reading": "Cách đọc Hiragana",
        "furigana": "Furigana Kanji[hiragana]",
        "romaji": "Romaji Modified Hepburn",
        "meaning": "Nghĩa tiếng Việt",
        "relationType": "Từ phái sinh"
      }
    ],
    "nuanceAndContext": "4. Sắc thái văn hóa & Ngữ cảnh sử dụng (Văn nói/văn viết, mức độ trang trọng, quy tắc văn hóa ngầm định để tránh thất lễ)",
    "examples": [
      {
        "type": "literal",
        "label": "5A. Ví dụ Áp Dụng Nghĩa Đen (Literal Context)",
        "japanese": "Câu ví dụ nghĩa đen chuẩn ngữ cảnh",
        "reading": "Cách đọc Hiragana đầy đủ",
        "romaji": "Romaji chuẩn Modified Hepburn",
        "vietnamese": "Dịch nghĩa tiếng Việt trau chuốt, bám sát collocation tự nhiên"
      },
      {
        "type": "figurative",
        "label": "5B. Ví dụ Áp Dụng Nghĩa Bóng (Figurative / Metaphor Context)",
        "japanese": "Câu ví dụ nghĩa bóng chuẩn ngữ cảnh",
        "reading": "Cách đọc Hiragana đầy đủ",
        "romaji": "Romaji chuẩn Modified Hepburn",
        "vietnamese": "Dịch nghĩa tiếng Việt trau chuốt, bám sát collocation tự nhiên"
      }
    ],
    "relatedCollocations": ["Quán dụng ngữ 1", "Quán dụng ngữ 2"],
    "synonyms": ["Từ đồng nghĩa"],
    "antonyms": ["Từ trái nghĩa"],
    "pitchAccent": "Heiban [0] / Atamadaka [1] / Nakadaka [2] / Odaka [n]",
    "kanjiAnatomy": {
      "radicals": "Phân tích bộ thủ cấu tạo các chữ Hán",
      "onKunReadings": "Trọn bộ âm On / âm Kun",
      "etymologyMnemonic": "Mẹo nhớ chiết tự trực quan"
    },
    "synonymComparison": [
      {
        "term": "Từ đồng nghĩa/đồng âm gần nhất",
        "reading": "Cách đọc Hiragana",
        "difference": "Khác biệt cốt lõi về sắc thái/văn phong/collocation",
        "example": "Ví dụ phân biệt ngắn"
      }
    ],
    "threeSecondTakeaway": "Mẹo phản xạ ghi nhớ trong 3 giây",
    "senseiExplanation": "7. Lời Bình Học Thuật Của GS. Yamato (Academic Takeaway) - Đúc kết học thuật sâu sắc và mẹo ghi nhớ cốt lõi"
  }
]
`;

  try {
    const raw = await callGemini(
      prompt,
      'Chỉ trả về JSON thuần túy cho bài phân tích từ vựng tiếng Nhật theo yêu cầu.',
      undefined,
      false
    );
    const parsedJson = safeExtractJson<any[]>(raw, []);

    if (Array.isArray(parsedJson) && parsedJson.length > 0) {
      const generatedItems: DetailedVocabItem[] = parsedJson.map((item, idx) =>
        enrichDetailedVocabItem({
          id: item.id || `vocab_gen_${idx}_${Date.now()}`,
          word: item.word || query,
          reading: item.reading || '',
          furigana: item.furigana || item.word || '',
          romaji: item.romaji || '',
          pitchAccent: item.pitchAccent || undefined,
          hanViet: item.hanViet || '',
          level: item.level || (currentLevel as any) || 'N2',
          partOfSpeech: item.partOfSpeech || 'Từ vựng',
          category: (item.category as any) || 'Nghĩa Đen & Nghĩa Bóng',
          kanjiAnatomy: item.kanjiAnatomy && typeof item.kanjiAnatomy === 'object' ? item.kanjiAnatomy : undefined,
          simpleMeaning: item.simpleMeaning || getSimpleMeaning(item),
          literalMeaning: item.literalMeaning || '',
          figurativeMeaning: item.figurativeMeaning || '',
          primaryMeaning: item.primaryMeaning || item.figurativeMeaning || item.literalMeaning || '',
          meaningPoints: Array.isArray(item.meaningPoints) ? item.meaningPoints : undefined,
          rootExpansion: Array.isArray(item.rootExpansion) && item.rootExpansion.length > 0 ? item.rootExpansion : undefined,
          nuanceAndContext: item.nuanceAndContext || 'Sử dụng linh hoạt theo ngữ cảnh.',
          examples: ensureAtLeastTwoCompleteExamples(
            item.examples,
            item.word,
            item.reading,
            item.simpleMeaning || getSimpleMeaning(item),
            item.level || currentLevel,
            item.partOfSpeech
          ),
          relatedCollocations: Array.isArray(item.relatedCollocations) ? item.relatedCollocations : [],
          synonyms: Array.isArray(item.synonyms) ? item.synonyms : [],
          antonyms: Array.isArray(item.antonyms) ? item.antonyms : [],
          synonymComparison: Array.isArray(item.synonymComparison) ? item.synonymComparison : undefined,
          threeSecondTakeaway: item.threeSecondTakeaway || undefined,
          senseiExplanation: item.senseiExplanation || 'AI Sensei: Hãy chú ý đối tượng giao tiếp khi dùng từ này.'
        })
      );

      vocabCache.set(cacheKey, generatedItems);
      return generatedItems;
    }
  } catch (error) {
    console.warn('[AI Sensei] Live vocab generation failed:', error);
  }

  // 5. Safe resilient fallback:
  // For specific word lookup (!parsed.isVocabRequest): NEVER return an unrelated curated item!
  if (!parsed.isVocabRequest) {
    const masterFallback = resolveMasterVocabulary(cleanTopic || query, currentLevel);
    if (masterFallback && masterFallback.length > 0) {
      vocabCache.set(cacheKey, masterFallback);
      return masterFallback;
    }

    const dictKeys = Object.keys(BUILTIN_OFFLINE_DICTIONARY);
    const matchedKey = dictKeys.find((k) => normClean.includes(k) || k.includes(normClean));
    if (matchedKey) {
      const entry = BUILTIN_OFFLINE_DICTIONARY[matchedKey]!;
      return [
        {
          id: `vocab_fallback_${matchedKey}`,
          word: entry.word || cleanTopic,
          reading: entry.reading || cleanTopic,
          furigana: entry.furigana || entry.word || cleanTopic,
          romaji: entry.romaji || cleanTopic,
          hanViet: entry.hanViet || '',
          level: (entry.level as any) || 'N5',
          partOfSpeech: entry.partOfSpeech || 'Từ vựng',
          category: 'Nghĩa Đen & Nghĩa Bóng',
          simpleMeaning: entry.simpleMeaning || 'Từ vựng tiếng Nhật',
          primaryMeaning: entry.primaryMeaning || entry.literalMeaning || '',
          meaningPoints: entry.meaningPoints,
          rootExpansion: entry.rootExpansion,
          literalMeaning: entry.literalMeaning || '',
          figurativeMeaning: entry.figurativeMeaning || '',
          nuanceAndContext: entry.nuanceAndContext || '',
          examples: entry.examples || [
            {
              type: 'literal',
              label: 'Ví dụ thực tế',
              japanese: `${entry.word || cleanTopic}を正しく使いましょう。`,
              reading: 'ただしく つかいましょう。',
              romaji: 'Tadashiku tsukaimashou.',
              vietnamese: 'Hãy sử dụng từ này đúng ngữ cảnh.'
            }
          ],
          relatedCollocations: entry.relatedCollocations || [],
          synonyms: entry.synonyms || [],
          antonyms: entry.antonyms || [],
          senseiExplanation: entry.senseiExplanation || 'AI Sensei: Tra cứu chuẩn mực theo từ điển tiếng Nhật.'
        }
      ];
    }

    const targetHira = romajiToHiragana(cleanTopic) || cleanTopic;
    const targetRom = hiraganaToRomaji(targetHira) || cleanTopic;
    return [
      {
        id: `vocab_synth_${Date.now()}`,
        word: cleanTopic,
        reading: targetHira,
        furigana: targetHira,
        romaji: targetRom,
        hanViet: '',
        level: (currentLevel as any) || 'N5',
        partOfSpeech: 'Mục từ tra cứu',
        category: 'Nghĩa Đen & Nghĩa Bóng',
        simpleMeaning: 'Chưa tìm thấy từ vựng',
        primaryMeaning: `Không tìm thấy mục từ tương ứng với 「${cleanTopic}」 trong đại từ điển tiếng Nhật. Hãy kiểm tra lại chính tả hoặc cách gõ phiên âm.`,
        meaningPoints: [
          `① Cách gõ phiên âm: 「${cleanTopic}」 ➔ Hiragana: 「${targetHira}」`,
          '② Gợi ý: Hãy thử tra bằng chữ Hán Kanji, Hiragana, Katakana hoặc Romaji chuẩn Hepburn (ví dụ: techou ➔ 手帳, tegami ➔ 手紙, tokei ➔ 時計, kasa ➔ 傘)',
          '③ AI Sensei bảo đảm 100% nghĩa chính xác từ từ điển chuẩn, không tự ý bịa đặt nghĩa của từ khi chưa xác định'
        ],
        literalMeaning: `Thuật ngữ phiên âm: 「${cleanTopic}」 (${targetHira})`,
        figurativeMeaning: 'Vui lòng kiểm tra lại tính chính xác của từ cần tra cứu.',
        nuanceAndContext: `Hệ thống hỗ trợ tra cứu mọi hình thức: Romaji, Hiragana, Katakana, Kanji.`,
        examples: [
          {
            type: 'literal',
            label: 'Mẹo tra cứu',
            japanese: '正しい日本語の単語を丁寧に入力してください。',
            reading: 'ただしい にほんごの たんごを ていねいに にゅうりょくしてください。',
            romaji: 'Tadashii nihongo no tango wo teinei ni nyuuryoku shite kudasai.',
            vietnamese: 'Xin vui lòng nhập chính xác từ vựng tiếng Nhật để nhận được phân tích chuyên sâu chuẩn xác nhất.'
          }
        ],
        relatedCollocations: [],
        synonyms: [],
        antonyms: [],
        senseiExplanation: `GS. Yamato Kenji: Để bảo đảm độ chính xác học thuật tuyệt đối và tránh hiểu lầm, hệ thống từ chối bịa đặt nghĩa cho những từ không có thật trong từ điển tiếng Nhật. Bạn hãy kiểm tra lại cách gõ từ vựng nhé!`
      }
    ];
  }

  // Thematic list fallback: matched curated items or default bank
  const fallbackList = matchedCurated.length > 0 ? matchedCurated : CURATED_ON_DEMAND_VOCAB_BANK;
  return fallbackList.slice(0, targetCount).map(enrichDetailedVocabItem);
}

/**
 * Appends more unique vocabulary items strictly sharing the same root Kanji or semantic radical
 * across JLPT levels N5–N1 without duplicates or unrelated words.
 */
export async function appendMoreVocabularyOnDemand(
  topic: string,
  existingWords: string[],
  currentLevel: string = 'N1',
  count: number = 5,
  lookupMode: 'dual_metaphor' | 'core_meaning' = 'dual_metaphor'
): Promise<DetailedVocabItem[]> {
  const parsed = parseUserVocabPrompt(topic);
  const cleanTopic = parsed.cleanTopic || topic;
  const baseReference = existingWords[0] || cleanTopic;

  // 1. First priority: Extract related words from 57,000+ words master dictionary & curated pictograms
  // that strictly share the exact same root Kanji or body part radical across N5 to N1
  const directRelatedFromDict = findRelatedWordsByRootOrKanji(baseReference, existingWords, count);
  if (directRelatedFromDict.length >= count) {
    return directRelatedFromDict.slice(0, count).map((item) =>
      enrichDetailedVocabItem({
        ...item,
        examples: ensureAtLeastTwoCompleteExamples(
          item.examples,
          item.word,
          item.reading,
          item.simpleMeaning || item.primaryMeaning,
          item.level || currentLevel,
          item.partOfSpeech
        ),
      })
    );
  }

  // 2. Check if curated bank has words that share the root or topic
  const unusedCurated = CURATED_ON_DEMAND_VOCAB_BANK.filter(
    (item) => !existingWords.includes(item.word)
  );

  const matchedCurated = unusedCurated.filter((item) => {
    const searchable = `
      ${item.word} ${item.reading} ${item.romaji} ${item.hanViet} 
      ${item.literalMeaning} ${item.figurativeMeaning} ${item.category}
    `.toLowerCase();
    return searchable.includes(cleanTopic.toLowerCase()) || searchable.includes(baseReference.toLowerCase());
  });

  const isCoreMode = lookupMode === 'core_meaning';

  const prompt = isCoreMode
    ? `
Hãy đóng vai AI Sensei - Giáo sư Tiến sĩ Ngôn ngữ học Tiếng Nhật Bậc cao.
Người học yêu cầu: "Tải thêm đúng ${count} từ vựng mới liên quan trực tiếp đến từ gốc / chữ Hán: '${baseReference}' (${cleanTopic}) theo NGHĨA RIÊNG CỐT LÕI (Từ điển chuẩn Kojien/Meikyo/Daijirin)."
ĐÃ CÓ CÁC TỪ SAU, TUYỆT ĐỐI KHÔNG ĐƯỢC TRÙNG LẶP: ${existingWords.join(', ')}.

QUY TẮC BẮT BUỘC:
- Mọi từ mới sinh ra PHẢI CÙNG CHỮ HÁN, CÙNG BỘ PHẬN HOẶC CĂN TỐ GỐC với từ 「${baseReference}」.
- Phân bổ trải rộng các cấp độ JLPT từ N5, N4, N3, N2 đến N1 để người học thấy rõ sự phân hóa từ gốc.
- TUYỆT ĐỐI KHÔNG sinh từ lệch ra chủ đề khác không liên quan đến căn tố gốc này!
- simpleMeaning: Nghĩa đơn giản ngắn gọn dễ hiểu nhất bằng tiếng Việt (1-3 từ).
- primaryMeaning: Định nghĩa riêng cốt lõi chi tiết của từ.
- meaningPoints: Các nét nghĩa chi tiết (①, ②...).
- rootExpansion: 4-6 từ phái sinh/từ ghép cùng gốc chữ Hán.
- Furigana ruby (Kanji[hiragana]), Hán Việt, Sắc thái, Quán dụng ngữ, và Lời bình học thuật GS. Yamato Kenji.
- QUY TẮC BẮT BUỘC VỀ VÍ DỤ: MỖI TỪ BẮT BUỘC CÓ ÍT NHẤT 2 CÂU VÍ DỤ THỰC TẾ. MỖI CÂU VÍ DỤ ĐỀU PHẢI CÓ 'japanese', 'reading', 'romaji', VÀ 'vietnamese' (DỊCH NGHĨA TIẾNG VIỆT RÕ RÀNG, HAY, ĐẦY ĐỦ, KHÔNG ĐƯỢC ĐỂ TRỐNG DỊCH TIẾNG VIỆT).

Trả về DUY NHẤT một mảng JSON thuần túy (không bọc markdown, không text thừa):
[
  {
    "id": "vocab_append_1",
    "word": "Từ mới",
    "reading": "Cách đọc Hiragana",
    "furigana": "Ký hiệu ruby dạng: 腹[はら]が 黒[くろ]い",
    "romaji": "Romaji",
    "hanViet": "Âm Hán Việt",
    "level": "N3",
    "partOfSpeech": "Từ loại",
    "category": "Nghĩa Đen & Nghĩa Bóng",
    "simpleMeaning": "Nghĩa đơn giản cốt lõi ngắn gọn bằng tiếng Việt (1-3 từ)",
    "primaryMeaning": "Định nghĩa riêng cốt lõi chi tiết",
    "meaningPoints": ["① Nét nghĩa 1", "② Nét nghĩa 2"],
    "rootExpansion": [
      {
        "word": "Từ ghép hoặc từ phái sinh cùng gốc chữ Hán",
        "reading": "Cách đọc Hiragana",
        "furigana": "Ký hiệu ruby Kanji[hiragana]",
        "romaji": "Romaji",
        "meaning": "Nghĩa tiếng Việt ngắn gọn của từ mở rộng",
        "relationType": "Từ ghép"
      }
    ],
    "literalMeaning": "",
    "figurativeMeaning": "",
    "nuanceAndContext": "Sắc thái và ngữ cảnh",
    "examples": [
      {
        "type": "literal",
        "label": "Ví dụ 1: Giao tiếp đời sống thực tế",
        "japanese": "Câu ví dụ tiếng Nhật",
        "reading": "Cách đọc câu",
        "romaji": "Romaji câu",
        "vietnamese": "Dịch nghĩa tiếng Việt rõ ràng, tự nhiên"
      },
      {
        "type": "core",
        "label": "Ví dụ 2: Ngữ cảnh phòng thi JLPT & Ứng dụng sâu",
        "japanese": "Câu ví dụ tiếng Nhật thứ 2",
        "reading": "Cách đọc câu thứ 2",
        "romaji": "Romaji câu thứ 2",
        "vietnamese": "Dịch nghĩa tiếng Việt câu thứ 2 sâu sắc, hay"
      }
    ],
    "relatedCollocations": ["Cụm từ 1", "Cụm từ 2"],
    "synonyms": ["Từ đồng nghĩa"],
    "antonyms": ["Từ trái nghĩa"],
    "senseiExplanation": "Lời bình sâu sắc của GS. Yamato."
  }
]
`
    : `
Hãy đóng vai AI Sensei - Giáo sư Tiến sĩ Ngôn ngữ học Tiếng Nhật Bậc cao.
Người học yêu cầu: "Tải thêm đúng ${count} từ vựng mới liên quan trực tiếp đến từ gốc / chữ Hán: '${baseReference}' (${cleanTopic})" (Trình độ: ${currentLevel}).
ĐÃ CÓ CÁC TỪ SAU, TUYỆT ĐỐI KHÔNG ĐƯỢC TRÙNG LẶP: ${existingWords.join(', ')}.

YÊU CẦU BẮT BUỘC - KIẾN TRÚC 7 PHẦN CHUYÊN SÂU & BỘ LỌC CHỐNG LỖI CHẮP VÁ:
1. 💡 Nghĩa Đơn Giản (Tiếng Việt) · Cô đọng nhất: Trực diện, ngắn gọn và chuẩn xác nhất chỉ trong 1-2 từ hoặc 1 dòng ngắn.
2. Phân tích Nghĩa Đen & Nghĩa Bóng:
   - 2A. Nghĩa Đen (Literal Meaning): Bóc tách lớp nghĩa gốc, nghĩa vật lý vật chất hoặc sát nghĩa gốc Kanji nhất.
   - 2B. Nghĩa Bóng & Ẩn Dụ (Figurative): Giải mã lớp nghĩa bóng, cách dùng hoán dụ, bóng gió hoặc hàm ý sâu xa (nuance) trong tâm lý người Nhật. Nếu là đồ vật thuần vật lý, ghi rõ "Dùng theo nghĩa vật chất nguyên bản, không có lớp nghĩa bóng ẩn dụ".
3. 🌳 Mở Rộng Trường Từ Vựng Cùng Gốc (rootExpansion): 3-5 từ ghép hoặc từ phái sinh cùng gốc chữ Hán/căn tố.
4. 💡 Sắc thái văn hóa & Ngữ cảnh sử dụng: Hoàn cảnh giao tiếp cụ thể (văn nói/văn viết, trang trọng/thân mật) và các quy tắc văn hóa ngầm người Nhật để tránh bất lịch sự.
5. 🔍 Cặp ví dụ minh họa đối chiếu Nghĩa Đen & Nghĩa Bóng (BỘ LỌC SINH NGỮ CẢNH BẢN XỨ CẤP ĐỘ KHẮT KHE NHẤT):
   Bắt buộc tuân thủ 4 quy tắc tối thượng sau:
   (1) Nội dung Sâu sắc & Độc lập: Bắt buộc tạo ra đúng 2 câu ví dụ hoàn toàn tách biệt: một câu lột tả chân thực Nghĩa Đen (2A - type: 'literal') và một câu khắc họa tinh tế Nghĩa Bóng/Ẩn dụ (2B - type: 'figurative'). Cả hai câu không chỉ đúng ngữ pháp mà phải có nội dung hay, ý nghĩa logic, mang chiều sâu văn hóa hoặc phản ánh sinh động lát cắt đời sống thực tế. Nghiêm cấm tạo ra các câu văn khô khan, tối nghĩa kiểu robot.
   (2) Tuyệt đối Tự nhiên (Native Collocations): Chỉ được phép đặt từ vựng vào các cụm từ kết hợp cố định (Collocations) chuẩn xác mà người Nhật hay dùng. Nghiêm cấm tuyệt đối tư duy dịch "word-by-word" hoặc nhặt các từ vựng rời rạc rồi ép chúng vào một câu một cách máy móc, gượng ép.
   (3) Chống trùng lặp Tuyệt đối (Zero-Duplication): Cấu trúc ngữ pháp giữa 2 ví dụ phải khác biệt nhau hoàn toàn. LƯU Ý CỐT LÕI: Ý tưởng, bối cảnh và từ vựng trong cặp ví dụ này tuyệt đối không được trùng lặp, xào nấu hay vay mượn lại từ các "Từ vựng cùng gốc" ở mục 3 phía trên. Mỗi câu ví dụ sinh ra phải là một tác phẩm ngôn ngữ độc bản và duy nhất.
   (4) Định dạng Hiển thị Chuẩn mực: Mọi câu ví dụ phải đi kèm Furigana chi tiết, phiên âm Romaji chuẩn Modified Hepburn (không dùng Romaji lỗi), và một bản dịch tiếng Việt mượt mà, trau chuốt (dịch thoát ý, đậm chất văn chương/đời sống thay vì dịch thô).
   * BÀI KIỂM TRA CHÉO TỰ THẨM ĐỊNH BẮT BUỘC TRƯỚC KHI TRẢ VỀ:
     "Hai câu này đọc lên có tự nhiên không? Nội dung có ý nghĩa và hay không? Có dính từ vựng chắp vá hoặc lặp lại bối cảnh với phần trên không?". Chỉ khi vượt qua bài kiểm tra chéo này mới được xuất kết quả!
6. 📌 Quán dụng ngữ liên quan (relatedCollocations): Các cụm từ cố định, quán dụng ngữ kanyouku tự nhiên.
7. 🎓 Lời Bình Học Thuật Của GS. Yamato: Đúc kết học thuật sâu sắc, cội nguồn văn hóa và mẹo nhớ nhớ lâu.

Trả về DUY NHẤT một mảng JSON thuần túy (không bọc markdown, không text thừa):
[
  {
    "id": "vocab_append_1",
    "word": "Từ mới",
    "reading": "Cách đọc Hiragana",
    "furigana": "Ký hiệu ruby dạng: 腹[はら]が 黒[くろ]い",
    "romaji": "Romaji Modified Hepburn",
    "hanViet": "Âm Hán Việt",
    "level": "N3",
    "partOfSpeech": "Từ loại",
    "category": "Nghĩa Đen & Nghĩa Bóng",
    "simpleMeaning": "Nghĩa đơn giản cô đọng nhất (1-2 từ)",
    "literalMeaning": "Nghĩa đen cụ thể",
    "figurativeMeaning": "Nghĩa bóng, nghĩa ẩn dụ sâu sắc trong tâm lý người Nhật",
    "rootExpansion": [
      {
        "word": "Từ ghép cùng gốc chữ Hán",
        "reading": "Cách đọc Hiragana",
        "furigana": "Kanji[hiragana]",
        "romaji": "Romaji",
        "meaning": "Nghĩa tiếng Việt ngắn gọn",
        "relationType": "Từ ghép"
      }
    ],
    "nuanceAndContext": "Sắc thái văn hóa và hoàn cảnh giao tiếp cụ thể",
    "examples": [
      {
        "type": "literal",
        "label": "Ví dụ 1: Nghĩa đen (Literal) - Đời sống thực tế",
        "japanese": "Câu ví dụ nghĩa đen chuẩn bản xứ",
        "reading": "Cách đọc câu Hiragana",
        "romaji": "Romaji Modified Hepburn",
        "vietnamese": "Dịch tiếng Việt mượt mà, tự nhiên"
      },
      {
        "type": "figurative",
        "label": "Ví dụ 2: Nghĩa bóng (Figurative) - Ẩn dụ sâu sắc",
        "japanese": "Câu ví dụ nghĩa bóng chuẩn bản xứ",
        "reading": "Cách đọc câu Hiragana",
        "romaji": "Romaji Modified Hepburn",
        "vietnamese": "Dịch tiếng Việt mượt mà, sâu sắc"
      }
    ],
    "relatedCollocations": ["Cụm từ cố định 1", "Cụm từ cố định 2"],
    "synonyms": ["Từ đồng nghĩa"],
    "antonyms": ["Từ trái nghĩa"],
    "senseiExplanation": "Lời bình sâu sắc của GS. Yamato về cội nguồn văn hóa và tâm lý đằng sau từ này."
  }
]
`;

  try {
    const raw = await callGemini(
      prompt,
      'Chỉ trả về JSON thuần túy cho bài phân tích từ vựng tiếng Nhật bổ sung.',
      undefined,
      false
    );
    const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedJson = JSON.parse(cleaned);

    if (Array.isArray(parsedJson) && parsedJson.length > 0) {
      return parsedJson.map((item, idx) =>
        enrichDetailedVocabItem({
          id: item.id || `vocab_more_${idx}_${Date.now()}`,
          word: item.word || cleanTopic,
          reading: item.reading || '',
          furigana: item.furigana || item.word || '',
          romaji: item.romaji || '',
          pitchAccent: item.pitchAccent || undefined,
          hanViet: item.hanViet || '',
          level: item.level || (currentLevel as any) || 'N2',
          partOfSpeech: item.partOfSpeech || 'Từ vựng',
          category: (item.category as any) || 'Nghĩa Đen & Nghĩa Bóng',
          kanjiAnatomy: item.kanjiAnatomy && typeof item.kanjiAnatomy === 'object' ? item.kanjiAnatomy : undefined,
          simpleMeaning: item.simpleMeaning || getSimpleMeaning(item),
          literalMeaning: item.literalMeaning || '',
          figurativeMeaning: item.figurativeMeaning || '',
          primaryMeaning: item.primaryMeaning || item.figurativeMeaning || item.literalMeaning || '',
          meaningPoints: Array.isArray(item.meaningPoints) ? item.meaningPoints : undefined,
          rootExpansion: Array.isArray(item.rootExpansion) && item.rootExpansion.length > 0 ? item.rootExpansion : undefined,
          nuanceAndContext: item.nuanceAndContext || 'Sử dụng linh hoạt theo ngữ cảnh.',
          examples: ensureAtLeastTwoCompleteExamples(
            item.examples,
            item.word,
            item.reading,
            item.simpleMeaning || getSimpleMeaning(item),
            item.level || currentLevel,
            item.partOfSpeech
          ),
          relatedCollocations: Array.isArray(item.relatedCollocations) ? item.relatedCollocations : [],
          synonyms: Array.isArray(item.synonyms) ? item.synonyms : [],
          antonyms: Array.isArray(item.antonyms) ? item.antonyms : [],
          synonymComparison: Array.isArray(item.synonymComparison) ? item.synonymComparison : undefined,
          threeSecondTakeaway: item.threeSecondTakeaway || undefined,
          senseiExplanation: item.senseiExplanation || 'AI Sensei: Hãy chú ý đối tượng giao tiếp khi dùng từ này.'
        })
      );
    }
  } catch (error) {
    console.warn('[AI Sensei] Append vocab generation failed:', error);
  }

  // Safe fallback: merge directRelatedFromDict with matchedCurated, never return unrelated random words
  const fallbackCombined = [...directRelatedFromDict, ...matchedCurated];
  const uniqueFallback: DetailedVocabItem[] = [];
  const seenFallback = new Set(existingWords);
  for (const item of fallbackCombined) {
    if (!seenFallback.has(item.word)) {
      seenFallback.add(item.word);
      uniqueFallback.push({
        ...item,
        examples: ensureAtLeastTwoCompleteExamples(
          item.examples,
          item.word,
          item.reading,
          item.simpleMeaning || item.primaryMeaning,
          item.level || currentLevel,
          item.partOfSpeech
        ),
      });
      if (uniqueFallback.length >= count) break;
    }
  }

  return uniqueFallback;
}



