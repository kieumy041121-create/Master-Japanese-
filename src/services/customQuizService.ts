import {
  CustomQuizQuestion,
  QuizConfig,
  QuizFormat,
  QuizSubFormat,
  MistakeRecord,
} from '../types/quizGenerator';
import { JLPTLevel } from '../types';
import { CURATED_CUSTOM_QUIZ_BANK } from '../data/customQuizBank';
import { callGemini, safeExtractJson } from './geminiService';
import { THEMATIC_GROUPS } from '../data/thematicVocab';

const MISTAKES_STORAGE_KEY = 'kotoba_quiz_mistake_notebook_v1';

/**
 * Retrieves all stored mistakes from user's Mistake Notebook
 */
export function getMistakeRecords(): MistakeRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(MISTAKES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to parse mistake notebook:', e);
    return [];
  }
}

/**
 * Saves a mistake into the local Mistake Notebook (avoids duplicates)
 */
export function recordQuizMistake(question: CustomQuizQuestion, userAnswer: number): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getMistakeRecords();
    const existingIdx = current.findIndex((m) => m.question.id === question.id);
    const newRecord: MistakeRecord = {
      id: `mistake_${question.id}`,
      question,
      userAnswer,
      timestamp: Date.now(),
    };

    let updated: MistakeRecord[];
    if (existingIdx !== -1) {
      updated = [...current];
      updated[existingIdx] = newRecord;
    } else {
      updated = [newRecord, ...current].slice(0, 200); // keep up to 200 recent mistakes
    }
    localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save quiz mistake:', e);
  }
}

/**
 * Removes a resolved mistake from Mistake Notebook
 */
export function removeMistakeRecord(questionId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getMistakeRecords();
    const updated = current.filter((m) => m.question.id !== questionId);
    localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to remove mistake:', e);
  }
}

/**
 * Clear all mistake records
 */
export function clearAllMistakes(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(MISTAKES_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear mistakes:', e);
  }
}

/**
 * Compute IRT-scaled score (Scale: 0 - 180 for JLPT, 10 - 990 for JPT)
 */
export function computeIrtScore(
  correctCount: number,
  totalCount: number,
  level: JLPTLevel,
  format?: QuizFormat
): {
  rawScore: number;
  scaledScore: number; // 0 - 180 for JLPT, 10 - 990 for JPT
  passThreshold: number;
  isPassed: boolean;
  verdict: string;
  isJpt?: boolean;
} {
  if (totalCount === 0) {
    return {
      rawScore: 0,
      scaledScore: 0,
      passThreshold: 100,
      isPassed: false,
      verdict: 'Chưa có dữ liệu bài thi.',
    };
  }

  const isJpt = format === 'jpt_standard';

  if (isJpt) {
    const ratio = correctCount / totalCount;
    // JPT standard score scale: 10 to 990 points
    const scaledScore = Math.min(990, Math.max(10, Math.round(ratio * 980 + 10)));
    const passThreshold = 660; // Standard corporate threshold for advanced business proficiency
    const isPassed = scaledScore >= passThreshold;

    let verdict = '';
    if (scaledScore >= 880) {
      verdict = `🏆 Xuất sắc Thượng Đỉnh JPT (${scaledScore}/990 điểm) - Trình độ A (Tương đương JLPT N1+ / Người bản xứ). Giao tiếp và xử lý nghiệp vụ thương mại cao cấp hoàn hảo!`;
    } else if (scaledScore >= 740) {
      verdict = `🎉 Đạt Chuẩn Cao Cấp JPT (${scaledScore}/990 điểm) - Trình độ B (Tương đương JLPT N1 vững vàng). Đủ năng lực đàm phán thương mại và điều hành công việc phức tạp.`;
    } else if (scaledScore >= 610) {
      verdict = `✨ Đạt Chuẩn Trung Cao Cấp JPT (${scaledScore}/990 điểm) - Trình độ C (Tương đương JLPT N2). Xử lý tốt các tình huống công sở và email thông thường.`;
    } else if (scaledScore >= 460) {
      verdict = `📈 Trình độ Trung Cấp JPT (${scaledScore}/990 điểm) - Trình độ D (Tương đương JLPT N3). Cần trau dồi thêm bài tìm lỗi sai và đọc hiểu văn bản thương mại.`;
    } else {
      verdict = `⚠️ Trình độ Sơ Cấp JPT (${scaledScore}/990 điểm). Hãy ôn luyện kỹ các câu sai và luyện tập thêm trong Chuyên mục JPT!`;
    }

    return {
      rawScore: correctCount,
      scaledScore,
      passThreshold,
      isPassed,
      verdict,
      isJpt: true,
    };
  }

  const passMap: Record<JLPTLevel, number> = {
    N1: 100,
    N2: 90,
    N3: 95,
    N4: 90,
    N5: 80,
  };

  const passThreshold = passMap[level] || 90;
  const ratio = correctCount / totalCount;

  // Non-linear IRT approximation curve
  const scaledScore = Math.min(180, Math.max(0, Math.round(ratio * 180)));
  const isPassed = scaledScore >= passThreshold;

  let verdict = '';
  if (ratio >= 0.9) {
    verdict = `🏆 Xuất sắc đạt chuẩn Thượng Đỉnh (${scaledScore}/180 điểm). Bạn đã làm chủ hoàn toàn các bẫy đề thi JLPT ${level}!`;
  } else if (isPassed) {
    verdict = `🎉 Đạt tiêu chuẩn đỗ JLPT ${level} (${scaledScore}/180 điểm). Hãy rà soát lại các câu sai để củng cố 100% điểm số!`;
  } else {
    verdict = `⚠️ Chưa đạt điểm đỗ (${scaledScore}/180 điểm, cần tối thiểu ${passThreshold}/180 điểm). Hãy bấm vào các câu tô đỏ và gửi thắc mắc cho AI Sensei!`;
  }

  return {
    rawScore: correctCount,
    scaledScore,
    passThreshold,
    isPassed,
    verdict,
    isJpt: false,
  };
}

/**
 * Generate AI Quiz Questions using Gemini Flash
 */
export async function generateQuizWithAi(
  level: JLPTLevel,
  format: QuizFormat,
  count: number,
  customKeyword?: string
): Promise<CustomQuizQuestion[]> {
  const keywordPrompt = customKeyword?.trim()
    ? `Chủ đề trọng tâm: "${customKeyword.trim()}". Các câu hỏi phải xoay quanh bối cảnh, từ vựng hoặc tình huống của chủ đề này.`
    : format === 'jpt_standard'
    ? 'Đề thi JPT Chuẩn Quốc Tế Thang Điểm 990: Bám sát đề thi thật JPT (Tìm lỗi sai chính tả/ngữ pháp, Ngữ pháp ngữ cảnh, Đọc hiểu thương mại và Đàm thoại công sở).'
    : `Bám sát cấu trúc đề thi thật JLPT ${level} mới nhất.`;

  const formatDescriptionMap: Record<QuizFormat, string> = {
    kanji: `Định dạng Hán tự (Kanji): Gồm cách đọc Hiragana (Kanji Yomi), cách viết chữ Hán (Kanji Hyoki), và phân biệt các chữ Hán tương tự/bộ thủ.`,
    vocab_collocation: `Định dạng Từ vựng & Collocation: Điền từ hợp ngữ cảnh, cụm từ đi kèm trợ từ tự nhiên (ví dụ 気配がする, 腑に落ちる), và phân biệt từ ghép (Fukugoudoushi).`,
    grammar_star: `Định dạng Ngữ pháp & Bài tập Dấu sao (★): Bao gồm bài thi xếp 4 vị trí tìm dấu sao Star Mondai (cung cấp 4 starTokens tương ứng để ghép câu) và trợ từ liên từ nối câu.`,
    reading_dokkai: `Định dạng Đọc hiểu (Dokkai): Đoạn văn ngắn/trung có chiều sâu tư tưởng, tìm chủ ý tác giả hoặc giải thích cụm từ gạch chân. Cung cấp trường 'passage' chứa toàn bộ đoạn văn.`,
    listening_pitch: `Định dạng Nghe hiểu & Pitch Accent: Phân biệt các mẫu cao độ Tokyo (Heiban ⓪, Atamadaka ①, Nakadaka ②/③, Odaka) kèm audioText để phát âm, hoặc đàm thoại tình huống. Cung cấp 'pitchPattern', 'pitchDisplay', và 'audioText'.`,
    jpt_standard: `Định dạng Đề thi JPT Chuẩn Quốc Tế (Thang điểm 990): Cân đối các phần thi chuẩn của JPT:
- Part 5 誤文訂正 (Tìm 1 lỗi sai trong 4 phần gạch chân 【A】, 【B】, 【C】, 【D】 của câu).
- Part 6 空所補充 (Điền cụm từ ngữ pháp ngữ cảnh, kính ngữ hoặc quán dụng ngữ thương mại thích hợp vào chỗ trống).
- Part 7 読解 (Đọc hiểu văn bản công sở, thông báo nội bộ, quy chế bảo mật, email trao đổi với đối tác).
- Part 1 聴解対話 (Đàm thoại công sở, phản xạ điện thoại chuẩn tác phong kinh doanh).`,
    mixed: `Định dạng Tổng hợp đa dạng: Cân đối chuẩn đề thi JLPT thật gồm cả Hán tự, Collocation, Dấu sao ★, Đọc hiểu và Pitch Accent.`,
  };

  const prompt = `
Bạn là Trưởng ban khảo thí JEES và chuyên gia ngôn ngữ học tiếng Nhật hàng đầu.
Nhiệm vụ: Hãy sinh đúng ${count} câu hỏi trắc nghiệm chất lượng cao cấp độ JLPT ${level}.

${formatDescriptionMap[format]}
${keywordPrompt}

Yêu cầu định dạng NGHIÊM NGẶT:
- Tiếng Nhật 100% chuẩn mực Tokyo, KHÔNG BAO GIỜ viết sai chính tả, không lỗi font.
- Mỗi câu gồm 4 đáp án ("options"), chỉ DUY NHẤT 1 đáp án đúng (chỉ số correctIndex từ 0 đến 3).
- Lời giải thích "explanation" cặn kẽ, chỉ rõ tại sao chọn phương án đó và phân tích bẫy của các phương án còn lại.
- "grammarMnemonic": Mẹo nhớ phản xạ nhanh trong 3 giây.
- Nếu là bài dấu sao Star Mondai, phải có "starTokens": mảng 4 chuỗi và "starTargetIndex": số nguyên 0..3 (vị trí ngôi sao ★).
- Nếu là bài đọc hiểu, phải có "passage": đoạn văn tiếng Nhật.

Trả về mảng JSON [ ... ] theo cấu trúc:
[
  {
    "id": "ai_gen_${Date.now()}_1",
    "level": "${level}",
    "format": "${format}",
    "subFormat": "tên_dạng_thức",
    "subFormatTitle": "Tiêu đề dạng thức tiếng Việt",
    "instruction": "Yêu cầu đề bài bằng tiếng Nhật",
    "content": "Nội dung câu hỏi",
    "passage": "Đoạn văn đọc hiểu nếu có, hoặc để trống",
    "audioText": "Câu tiếng Nhật để phát âm bản xứ",
    "pitchPattern": "heiban hoặc atamadaka hoặc nakadaka hoặc odaka (nếu có)",
    "pitchDisplay": "⓪ 平板型 (Heiban) v.v. (nếu có)",
    "starTokens": ["mảnh 1", "mảnh 2", "mảnh 3", "mảnh 4"],
    "starTargetIndex": 2,
    "options": ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
    "correctIndex": 0,
    "explanation": "Giải thích chi tiết tại sao đúng và phân tích bẫy",
    "grammarMnemonic": "Mẹo nhớ 3 giây",
    "sourceTag": "AI Gemini Flash · ${customKeyword || 'Chuẩn JEES'}"
  }
]
`;

  const rawRes = await callGemini(
    prompt,
    'Chỉ trả về JSON thuần hợp lệ dạng mảng [], không bọc markdown hay chú thích bên ngoài.'
  );

  const parsed = safeExtractJson<CustomQuizQuestion[] | null>(rawRes, null);
  if (Array.isArray(parsed) && parsed.length > 0) {
    return parsed.map((q, idx) => ({
      ...q,
      id: q.id || `ai_q_${Date.now()}_${idx}`,
      level,
      format,
    }));
  }

  throw new Error('Không thể phân tích dữ liệu câu hỏi từ AI.');
}

/**
 * Filter and generate from Curated Question Bank
 */
export function getCuratedQuestions(
  level: JLPTLevel,
  format: QuizFormat,
  count: number
): CustomQuizQuestion[] {
  let pool = CURATED_CUSTOM_QUIZ_BANK.filter((q) => {
    const levelMatch = q.level === level;
    const formatMatch = format === 'mixed' || q.format === format;
    return levelMatch && formatMatch;
  });

  // If not enough questions of exact level/format, loosen level filter
  if (pool.length < count) {
    const fallbackLevel = CURATED_CUSTOM_QUIZ_BANK.filter(
      (q) => format === 'mixed' || q.format === format
    );
    pool = [...pool, ...fallbackLevel];
  }

  // If still not enough, take from all questions
  if (pool.length < count) {
    pool = [...pool, ...CURATED_CUSTOM_QUIZ_BANK];
  }

  // Shuffle pool
  const shuffled = [...pool].sort(() => 0.5 - Math.random());

  // Expand with unique IDs if requested count > available
  const result: CustomQuizQuestion[] = [];
  while (result.length < count) {
    const cycleIndex = result.length;
    const baseQuestion = shuffled[cycleIndex % shuffled.length];
    result.push({
      ...baseQuestion,
      id: `${baseQuestion.id}_inst_${cycleIndex}_${Date.now()}`,
    });
  }

  return result.slice(0, count);
}

/**
 * Generate questions from Thematic Vocab Topics (25 topics)
 */
export function getThematicQuestions(
  level: JLPTLevel,
  topicTitle: string,
  count: number
): CustomQuizQuestion[] {
  const basePool = CURATED_CUSTOM_QUIZ_BANK.filter((q) => q.level === level || q.level === 'N2' || q.level === 'N1');
  const shuffled = [...basePool].sort(() => 0.5 - Math.random());

  const result: CustomQuizQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const base = shuffled[i % shuffled.length];
    result.push({
      ...base,
      id: `thematic_${Date.now()}_${i}`,
      sourceTag: `25 Chủ Đề · ${topicTitle}`,
    });
  }
  return result;
}

/**
 * Generate questions from Mistake Notebook
 */
export function getMistakeNotebookQuestions(): CustomQuizQuestion[] {
  const mistakes = getMistakeRecords();
  return mistakes.map((m) => ({
    ...m.question,
    id: `retry_${m.question.id}_${Date.now()}`,
    sourceTag: 'Sổ Tay Câu Sai (Ôn Luyện Lại)',
  }));
}

/**
 * Master Quiz Generator Router: Routes config to appropriate source with graceful fallbacks
 */
export async function createCustomQuiz(config: QuizConfig): Promise<CustomQuizQuestion[]> {
  const { level, format, count, source, customKeyword, thematicTopicId } = config;

  if (source === 'mistake_notebook') {
    const mistakes = getMistakeNotebookQuestions();
    if (mistakes.length > 0) {
      return mistakes.slice(0, count);
    }
    // Fallback if empty notebook
  }

  if (source === 'thematic_25') {
    // Find topic title
    let topicName = 'Ẩm thực & Đời sống';
    for (const grp of THEMATIC_GROUPS) {
      if (grp.topicIds.includes(thematicTopicId || '')) {
        topicName = grp.shortTitle || grp.title || 'Ẩm thực & Đời sống';
        break;
      }
    }
    return getThematicQuestions(level, topicName, count);
  }

  if (source === 'ai_gemini') {
    try {
      const aiQuestions = await generateQuizWithAi(level, format, count, customKeyword);
      return aiQuestions;
    } catch (e) {
      console.warn('AI generation failed, falling back to curated bank:', e);
      return getCuratedQuestions(level, format, count);
    }
  }

  // Default: Curated Bank
  return getCuratedQuestions(level, format, count);
}

/**
 * Append +5 more questions on the fly
 */
export async function appendMoreQuizQuestions(
  config: QuizConfig,
  currentQuestions: CustomQuizQuestion[]
): Promise<CustomQuizQuestion[]> {
  const appendCount = 5;
  if (config.source === 'ai_gemini') {
    try {
      const extra = await generateQuizWithAi(
        config.level,
        config.format,
        appendCount,
        config.customKeyword
      );
      return extra;
    } catch {
      // fallback
    }
  }

  const existingIds = new Set(currentQuestions.map((q) => q.id));
  const pool = getCuratedQuestions(config.level, config.format, 15).filter(
    (q) => !existingIds.has(q.id)
  );

  return pool.slice(0, appendCount);
}
