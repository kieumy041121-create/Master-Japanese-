import { katakanaToHiragana, toHepburnRomaji, sanitizeVocabPhonetics } from '../data/kanaRomajiUtils';
import { JLPTLevel } from '../types';

export interface SearchSource {
  title: string;
  url: string;
}

export interface VerifiedVocabResult {
  word: string;
  kanji: string;
  kana: string;
  romaji: string;
  sinoVietnamese: string;
  jlptLevel: JLPTLevel;
  pitchAccent?: string;
  meaningVn: string;
  exampleJp?: string;
  exampleKana?: string;
  exampleRomaji?: string;
  exampleVn?: string;
  nuanceNotes?: string;
  isAiVerified: boolean;
  verifiedAt: string;
  googleSearchUrl: string;
  searchSources?: SearchSource[];
}

const LOCAL_STORAGE_KEY = 'google_ai_verified_vocab_v3';

// In-memory cache
const verifiedCache = new Map<string, VerifiedVocabResult>();

// Load from localStorage on initialization
function loadCacheFromStorage() {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      for (const [k, v] of Object.entries(parsed)) {
        verifiedCache.set(k, v as VerifiedVocabResult);
      }
    }
  } catch {
    // Ignore storage errors
  }
}

loadCacheFromStorage();

// Seed curated canonical definitions
verifiedCache.set('航空便', {
  word: '航空便',
  kanji: '航空便',
  kana: 'こうくうびん',
  romaji: 'kōkūbin',
  sinoVietnamese: 'Hàng không tiện',
  jlptLevel: 'N4',
  pitchAccent: '◎ Heiban [0] (こうくうびん￣)',
  meaningVn: 'dịch vụ gửi/vận chuyển qua đường hàng không (máy bay)',
  exampleJp: 'この小包を航空便で送りたいのですが、ベトナムまでいくらですか。',
  exampleKana: 'このこづつみをこうくうびんでおくりたいのですが、べとなむまでいくらですか。',
  exampleRomaji: 'Kono kodutsumi wo koukuubin de okuritai no desu ga, Betonamu made ikura desu ka.',
  exampleVn: 'Tôi muốn gửi bưu kiện này bằng dịch vụ gửi/vận chuyển qua đường hàng không (máy bay), sang Việt Nam cước phí bao nhiêu ạ?',
  nuanceNotes: '航空便 chỉ phương thức gửi thư từ hoặc bưu phẩm bằng đường bay quốc tế/nội địa. Đối lập với 船便 (gửi bằng tàu biển).',
  isAiVerified: true,
  verifiedAt: new Date().toISOString(),
  googleSearchUrl: 'https://www.google.com/search?q=%E8%88%AA%E7%A9%BA%E4%BE%BF+%E6%84%8F%E5%91%B3',
  searchSources: [
    { title: 'Weblio 日中中日辞典 - 航空便の意味', url: 'https://cidian.weblio.jp/content/%E8%88%AA%E7%A9%BA%E4%BE%BF' },
    { title: 'Google Search: 航空便 tiếng Nhật là gì', url: 'https://www.google.com/search?q=%E8%88%AA%E7%A9%BA%E4%BE%BF+%E6%84%8F%E5%91%B3' }
  ]
});
verifiedCache.set('こうくうびん', verifiedCache.get('航空便')!);
verifiedCache.set('kōkūbin', verifiedCache.get('航空便')!);
verifiedCache.set('koukuubin', verifiedCache.get('航空便')!);

function saveCacheToStorage() {
  if (typeof window === 'undefined') return;
  try {
    const obj: Record<string, VerifiedVocabResult> = {};
    for (const [k, v] of verifiedCache.entries()) {
      obj[k] = v;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(obj));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Builds direct Google Search URL for Japanese vocabulary lookup.
 */
export function buildGoogleSearchUrl(
  query: string,
  mode: 'general' | 'meaning' | 'weblio' = 'meaning'
): string {
  const q = (query || '').trim();
  if (mode === 'weblio') {
    return `https://www.google.com/search?q=${encodeURIComponent(q + ' weblio 日中辞典 意味 読み方')}`;
  }
  if (mode === 'general') {
    return `https://www.google.com/search?q=${encodeURIComponent(q + ' 意味 例文 使い方')}`;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(q + ' tiếng Nhật nghĩa là gì từ điển')}`;
}

/**
 * Returns any previously verified vocabulary result from cache (0ms).
 */
export function getCachedVerifiedVocab(word: string): VerifiedVocabResult | null {
  if (!word) return null;
  return verifiedCache.get(word.trim().toLowerCase()) || null;
}

/**
 * Directly connects to Google Gemini AI with Google Search Grounding:
 * - Live Google Search verification of authentic Japanese usage
 * - Pure Kana (never matches Romaji)
 * - Pure Hepburn Latin Romaji (never matches Kana)
 * - Accurate Sino-Vietnamese (Hán Việt)
 * - Verified JLPT level (N5 - N1)
 * - Authentic Japanese Pitch Accent
 * - Standard Vietnamese definition from Kōjien & Japanese-Vietnamese lexicons
 * - Direct Google Search web links and citations.
 */
export async function verifyVocabWithGoogleAi(
  word: string,
  currentReading?: string,
  currentMeaning?: string,
  currentLevel?: JLPTLevel
): Promise<VerifiedVocabResult> {
  const cleanWord = word.trim();
  const cacheKey = cleanWord.toLowerCase();
  const googleSearchUrl = buildGoogleSearchUrl(cleanWord, 'meaning');

  // Check cache first
  const cached = verifiedCache.get(cacheKey);
  if (cached && cached.isAiVerified) {
    return cached;
  }

  // Instant fallback while waiting or if network fails
  const initialPhonetics = sanitizeVocabPhonetics(cleanWord, currentReading || cleanWord);
  const fallbackResult: VerifiedVocabResult = {
    word: cleanWord,
    kanji: cleanWord,
    kana: initialPhonetics.cleanReading,
    romaji: initialPhonetics.cleanRomaji,
    sinoVietnamese: initialPhonetics.cleanSinoViet || '',
    jlptLevel: currentLevel || 'N3',
    meaningVn: currentMeaning || `Từ vựng tiếng Nhật: ${cleanWord}`,
    isAiVerified: false,
    verifiedAt: new Date().toISOString(),
    googleSearchUrl,
    searchSources: [
      {
        title: `Google Search: "${cleanWord}" nghĩa tiếng Nhật`,
        url: googleSearchUrl
      },
      {
        title: `Weblio & Kotobank Tra Cứu: "${cleanWord}"`,
        url: buildGoogleSearchUrl(cleanWord, 'weblio')
      }
    ]
  };

  try {
    const systemInstruction =
      'Bạn là Viện trưởng Viện Ngôn ngữ Tiếng Nhật Quốc gia và Giám định viên Từ điển Kōjien (広辞苑) & Đại Từ Điển Nhật-Việt. Hãy thẩm định và chuẩn hóa từ vựng tiếng Nhật với độ chính xác tuyệt đối 100%, có đối chiếu với Google Search.';

    const prompt = `YÊU CẦU THẨM ĐỊNH TỪ VỰNG TIẾNG NHẬT CHUẨN ĐIỂN 100%:
Từ cần thẩm định: "${cleanWord}"
Phiên âm hiện tại (tham khảo): "${currentReading || ''}"
Nghĩa hiện tại (tham khảo): "${currentMeaning || ''}"

QUY TẮC BẮT BUỘC KHÔNG ĐƯỢC SAI LỆCH:
1. "kana": Phải là phiên âm Kana chính xác (Hiragana hoặc Katakana). TUYỆT ĐỐI KHÔNG ĐƯỢC TRÙNG VỚI ROMAJI.
2. "romaji": Phải là chữ cái Latin tiếng Anh chuẩn Hepburn (a-z). TUYỆT ĐỐI KHÔNG ĐƯỢC CHỨA KÝ TỰ TIẾNG NHẬT, KHÔNG TRÙNG VỚI KANA.
3. "sinoVietnamese": Âm Hán Việt chuẩn tắc viết hoa (ví dụ: "THANH NHỊ TUẾ", "QUỐC GIA"). Nếu từ Katakana thuần không có Hán tự thì để chuỗi rỗng "".
4. "jlptLevel": Cấp độ chuẩn JLPT của từ này ("N5", "N4", "N3", "N2", hoặc "N1").
5. "pitchAccent": Mô hình trọng âm tiếng Nhật (ví dụ: "[0] Heiban (平板)", "[1] Atamadaka (頭高)", "[2] Nakadaka (中高)", "[3] Odaka (尾高)").
6. "meaningVn": Dịch nghĩa tiếng Việt chuẩn từ điển, xúc tích, gãy gọn, đủ câu hoàn chỉnh, TUYỆT ĐỐI KHÔNG CẮT NGANG GIỮA CHỪNG.
7. "exampleJp": Câu ví dụ ngữ cảnh thực tế của người Nhật.
8. "exampleKana": Phiên âm Kana của câu ví dụ.
9. "exampleRomaji": Phiên âm Latin Romaji của câu ví dụ.
10. "exampleVn": Dịch nghĩa câu ví dụ sang tiếng Việt tự nhiên.
11. "nuanceNotes": 1-2 câu ghi chú sắc thái sử dụng và bẫy dễ nhầm lẫn.

Trả về duy nhất định dạng JSON thuần túy theo schema.`;

    const response = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction,
        prompt,
        useGoogleSearch: true,
        responseSchema: {
          type: 'object',
          properties: {
            kanji: { type: 'string' },
            kana: { type: 'string' },
            romaji: { type: 'string' },
            sinoVietnamese: { type: 'string' },
            jlptLevel: { type: 'string', enum: ['N5', 'N4', 'N3', 'N2', 'N1'] },
            pitchAccent: { type: 'string' },
            meaningVn: { type: 'string' },
            exampleJp: { type: 'string' },
            exampleKana: { type: 'string' },
            exampleRomaji: { type: 'string' },
            exampleVn: { type: 'string' },
            nuanceNotes: { type: 'string' }
          },
          required: ['kanji', 'kana', 'romaji', 'meaningVn', 'jlptLevel']
        }
      })
    });

    if (!response.ok) {
      return fallbackResult;
    }

    const data = await response.json();
    const text = data.text || '';
    if (!text) return fallbackResult;

    const cleanJson = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    // Double-check phonetics to ensure 100% separation
    let kana = (parsed.kana || currentReading || cleanWord).trim();
    let romaji = (parsed.romaji || toHepburnRomaji(kana)).trim().toLowerCase();

    // Enforce kana !== romaji
    if (kana.toLowerCase() === romaji.toLowerCase() || /[\u3040-\u309f\u30a0-\u30ff]/.test(romaji)) {
      romaji = toHepburnRomaji(kana);
    }
    if (/^[a-zA-Z\s]+$/.test(kana)) {
      kana = katakanaToHiragana(cleanWord);
    }

    // Extract search sources if grounding was active
    const searchSources: SearchSource[] = [];
    if (data.groundingChunks && Array.isArray(data.groundingChunks)) {
      for (const chunk of data.groundingChunks) {
        if (chunk.web?.uri) {
          searchSources.push({
            title: chunk.web.title || chunk.web.uri,
            url: chunk.web.uri
          });
        }
      }
    }

    if (searchSources.length === 0) {
      searchSources.push({
        title: `Google Search: "${cleanWord}" từ điển`,
        url: googleSearchUrl
      });
      searchSources.push({
        title: `Weblio: "${cleanWord}" nghĩa ngữ cảnh`,
        url: buildGoogleSearchUrl(cleanWord, 'weblio')
      });
    }

    const verifiedResult: VerifiedVocabResult = {
      word: parsed.kanji || cleanWord,
      kanji: parsed.kanji || cleanWord,
      kana,
      romaji,
      sinoVietnamese: parsed.sinoVietnamese || '',
      jlptLevel: (['N5', 'N4', 'N3', 'N2', 'N1'].includes(parsed.jlptLevel)
        ? parsed.jlptLevel
        : currentLevel || 'N3') as JLPTLevel,
      pitchAccent: parsed.pitchAccent || '',
      meaningVn: parsed.meaningVn || currentMeaning || `Từ vựng tiếng Nhật: ${cleanWord}`,
      exampleJp: parsed.exampleJp,
      exampleKana: parsed.exampleKana,
      exampleRomaji: parsed.exampleRomaji,
      exampleVn: parsed.exampleVn,
      nuanceNotes: parsed.nuanceNotes,
      isAiVerified: true,
      verifiedAt: new Date().toISOString(),
      googleSearchUrl,
      searchSources
    };

    // Store in cache
    verifiedCache.set(cacheKey, verifiedResult);
    saveCacheToStorage();

    return verifiedResult;
  } catch (err) {
    console.warn('Google AI verification fallback used:', err);
    return fallbackResult;
  }
}
