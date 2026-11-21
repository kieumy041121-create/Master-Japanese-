import { ThematicWord } from '../data/thematicVocab/types';
import { callGemini, safeExtractJson } from './geminiService';
import { refineVietnameseMeaning } from '../utils/vietnameseMeaningSanitizer';

export interface ThematicNuanceAnalysis {
  wordId: string;
  word: string;
  reading: string;
  level: string;
  nuance: string;
  collocations: string[];
  confusingPairs: string;
  cultureTip: string;
  isAiEnhanced?: boolean;
}

// In-memory cache for ultra-fast instant recall
const nuanceCache: Map<string, ThematicNuanceAnalysis> = new Map();

// Load cache from localStorage on startup
try {
  const saved = localStorage.getItem('kotoba_thematic_ai_cache_v2');
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.keys(parsed).forEach(k => nuanceCache.set(k, parsed[k]));
  }
} catch {
  // Ignore localStorage errors
}

function saveCacheToStorage() {
  try {
    const obj: Record<string, ThematicNuanceAnalysis> = {};
    nuanceCache.forEach((v, k) => {
      obj[k] = v;
    });
    localStorage.setItem('kotoba_thematic_ai_cache_v2', JSON.stringify(obj));
  } catch {
    // Ignore storage quota
  }
}

/**
 * Generates an instant high-fidelity linguistic nuance profile (< 1ms, zero lag)
 * tailored specifically to the given word, meaning, level, and semantic category.
 */
export function generateInstantThematicNuance(
  word: ThematicWord,
  topicTitle: string,
  groupTitle: string = 'Đời sống & Công sở'
): ThematicNuanceAnalysis {
  // If already in cache, return immediately
  if (nuanceCache.has(word.id)) {
    return nuanceCache.get(word.id)!;
  }

  const cleanMeaning = refineVietnameseMeaning(word.meaningVn);
  const isAdvanced = word.level === 'N1' || word.level === 'N2';
  const isVerbal = word.word.endsWith('する') || word.word.endsWith('る') || word.word.endsWith('う') || word.word.endsWith('つ') || word.word.endsWith('く');
  const isAdjectival = word.word.endsWith('い') || word.word.endsWith('な') || word.word.endsWith('的');

  // Nuance description tailored to word characteristics
  let nuanceText = '';
  if (isAdvanced) {
    nuanceText = `Từ "${word.word}" (${word.reading}) thuộc cấp độ ${word.level}, mang sắc thái trang trọng và tính chuẩn mực học thuật cao. Thường xuất hiện trong văn bản báo chí, kinh doanh B2B, hợp đồng thương mại hoặc đề thi đọc hiểu JLPT. Khi sử dụng từ này, người nói thể hiện sự chín chắn, hiểu biết sâu sắc và tính mạch lạc trong tư duy diễn đạt tiếng Nhật hiện đại.`;
  } else if (word.level === 'N3') {
    nuanceText = `Từ "${word.word}" (${word.reading}) là từ vựng nòng cốt cấp độ N3, đóng vai trò bản lề nối liền giữa giao tiếp sinh hoạt và văn phong công sở. Từ biểu đạt chuẩn xác ý nghĩa "${cleanMeaning}", thường được người bản xứ dùng trong trao đổi công việc hàng ngày, tin tức thời sự và các mối quan hệ xã hội một cách tự nhiên và lịch thiệp.`;
  } else {
    nuanceText = `Từ "${word.word}" (${word.reading}) là từ vựng nền tảng cấp độ ${word.level}, mang tính ứng dụng thực chiến rất cao trong đời sống thường ngày tại Nhật Bản. Thường xuất hiện trong các tình huống sinh hoạt, đi lại, mua sắm và hội thoại căn bản, giúp người học truyền đạt trọn vẹn thông điệp "${cleanMeaning}" một cách gần gũi, rõ ràng.`;
  }

  // Dynamic Collocations tailored to semantic category
  const collocations: string[] = [];
  if (isVerbal) {
    collocations.push(`${word.word} (Thực hiện hành động: ${cleanMeaning})`);
    collocations.push(`${word.word}必要がある (Cần phải thực hiện việc ${cleanMeaning})`);
    collocations.push(`適切に${word.word} (Tiến hành ${cleanMeaning} một cách phù hợp và đúng mực)`);
  } else if (isAdjectival) {
    collocations.push(`極めて${word.word} (Cực kỳ ${cleanMeaning}, mức độ rõ rệt)`);
    collocations.push(`${word.word}傾向がある (Có xu hướng ${cleanMeaning})`);
    collocations.push(`${word.word}と感じられる (Cảm thấy rất ${cleanMeaning} theo nhận định)`);
  } else {
    collocations.push(`${word.word}に関する取り決め (Quy định chi tiết liên quan đến ${cleanMeaning})`);
    collocations.push(`${word.word}の重要性を把握する (Nắm bắt tầm quan trọng của ${cleanMeaning})`);
    collocations.push(`${word.word}を効果的に活用する (Vận dụng hiệu quả ${cleanMeaning} trong thực tế)`);
  }

  // Domain-specific adjustments
  if (topicTitle.includes('Kỹ thuật') || topicTitle.includes('IT')) {
    collocations[0] = `${word.word}の仕様を正確に設計する (Thiết kế chính xác đặc tả liên quan đến ${cleanMeaning})`;
    collocations[1] = `${word.word}のトラブルシューティングを迅速に行う (Khắc phục sự cố ${cleanMeaning} kịp thời)`;
  } else if (topicTitle.includes('Thương mại') || topicTitle.includes('Văn phòng')) {
    collocations[0] = `${word.word}について上司や関係部署に相談する (Thảo luận với cấp trên và các bộ phận liên quan về ${cleanMeaning})`;
    collocations[1] = `${word.word}に関する合意を形成する (Đạt được sự thống nhất chung về ${cleanMeaning})`;
  }

  // Confusing pairs / JLPT exam warning
  const confusingText = `Trong đề thi JLPT và đời sống, cần chú ý phân biệt chữ Hán của "${word.word}" (${word.reading}) với các từ đồng âm dị nghĩa (Dojikun / Doonigi). Đồng thời lưu ý ngữ cảnh: tránh dùng từ ngữ có sắc thái quá trang trọng trong trò chuyện thân mật với bạn bè bè bạn (Tameguchi), và ngược lại không dùng từ khẩu ngữ suồng sã khi trình bày văn bản chính thức.`;

  // Japanese cultural mindset
  const cultureTipText = `Trong văn hóa giao tiếp Nhật Bản (đặc biệt trong bối cảnh ${groupTitle}), nguyên tắc "Meiwaku wo kakenai" (không làm phiền người khác) và nhận thức Uchi-Soto (trong - ngoài) luôn được đặt lên hàng đầu. Khi diễn đạt khái niệm liên quan đến "${cleanMeaning}", người Nhật thường lựa chọn cách nói nhã nhặn, kết hợp đệm từ (Kushon Kotoba) để tạo sự hòa nhã và tôn trọng tối đa đối phương.`;

  const analysis: ThematicNuanceAnalysis = {
    wordId: word.id,
    word: word.word,
    reading: word.reading,
    level: word.level,
    nuance: refineVietnameseMeaning(nuanceText),
    collocations: collocations.map(c => refineVietnameseMeaning(c)),
    confusingPairs: refineVietnameseMeaning(confusingText),
    cultureTip: refineVietnameseMeaning(cultureTipText),
    isAiEnhanced: false
  };

  nuanceCache.set(word.id, analysis);
  saveCacheToStorage();
  return analysis;
}

/**
 * Fetches enhanced nuance from Gemini API with a swift 7-second timeout.
 * If API is busy or offline, gracefully returns the instant profile without throwing errors.
 */
export async function fetchLiveGeminiNuance(
  word: ThematicWord,
  topicTitle: string,
  groupTitle: string = 'Đời sống & Công sở'
): Promise<ThematicNuanceAnalysis> {
  // If we already have an AI-enhanced cache, return instantly
  const existing = nuanceCache.get(word.id);
  if (existing && existing.isAiEnhanced) {
    return existing;
  }

  const prompt = `Bạn là chuyên gia ngôn ngữ học tiếng Nhật và giảng viên đào tạo JLPT N1.
Hãy phân tích ngữ nghĩa và sắc thái chuyên sâu cho từ vựng sau:
- Từ vựng: "${word.word}"
- Cách đọc: "${word.reading}" (${word.romaji})
- Âm Hán Việt: "${word.sinoVietnamese || ''}"
- Nghĩa: "${word.meaningVn}"
- Trình độ: ${word.level}
- Chủ đề: "${topicTitle}"

Yêu cầu phân tích tỉ mỉ, chuẩn xác, không trả lời chung chung, câu dịch tiếng Việt phải trọn vẹn và không bị đứt đoạn giữa chừng.
Trả về DUY NHẤT 1 JSON object hợp lệ:
{
  "nuance": "Phân tích 2-3 câu cụ thể về sắc thái biểu cảm, bối cảnh sử dụng thích hợp nhất của từ này (trang trọng, thân mật hay chuyên môn)",
  "collocations": [
    "Cụm từ đi kèm 1 chuẩn bản xứ (kèm cách đọc & dịch nghĩa)",
    "Cụm từ đi kèm 2 chuẩn bản xứ (kèm cách đọc & dịch nghĩa)",
    "Cụm từ đi kèm 3 chuẩn bản xứ (kèm cách đọc & dịch nghĩa)"
  ],
  "confusingPairs": "2 câu phân tích rõ điểm dễ nhầm lẫn hoặc so sánh sắc thái với các từ đồng nghĩa trong đề thi JLPT",
  "cultureTip": "2 câu về tâm lý văn hóa hoặc thói quen tư duy của người Nhật khi sử dụng từ ngữ này"
}
Lưu ý: Tuyệt đối không thêm các trường hội thoại hoặc đối đáp. Chỉ trả về JSON thuần.`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const callPromise = callGemini(
      prompt,
      'Bạn là từ điển ngôn ngữ học đối chiếu tiếng Nhật cao cấp. Chỉ trả về JSON.'
    );

    const raw = await Promise.race([
      callPromise,
      new Promise<string>((_, reject) => {
        controller.signal.addEventListener('abort', () => reject(new Error('AI fetch timeout')));
      })
    ]);
    clearTimeout(timeoutId);

    const parsed = safeExtractJson<any>(raw, null);
    if (parsed && parsed.nuance && parsed.collocations) {
      const enhanced: ThematicNuanceAnalysis = {
        wordId: word.id,
        word: word.word,
        reading: word.reading,
        level: word.level,
        nuance: refineVietnameseMeaning(parsed.nuance),
        collocations: Array.isArray(parsed.collocations)
          ? parsed.collocations.map((c: string) => refineVietnameseMeaning(c))
          : [],
        confusingPairs: refineVietnameseMeaning(parsed.confusingPairs || ''),
        cultureTip: refineVietnameseMeaning(parsed.cultureTip || ''),
        isAiEnhanced: true
      };

      nuanceCache.set(word.id, enhanced);
      saveCacheToStorage();
      return enhanced;
    }
  } catch (e) {
    console.info('[Thematic AI] Live API timed out or fallback used, delivering instant linguistic nuance');
  }

  // Return the instant profile
  return generateInstantThematicNuance(word, topicTitle, groupTitle);
}
