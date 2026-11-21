import { JLPTLevel } from './index';

// 1. KANJI N1 BẪY KHÓ NHỚ & DỊ THỂ TỰ (異体字 & 難読漢字)
export interface RareKanjiVariantItem {
  id: string;
  kanjiWord: string;
  reading: string;
  sinoVietnamese: string;
  meaning: string;
  difficultyCategory: 'Dị thể tự (異体字)' | 'Nan độc tự (難読漢字)' | 'Âm On/Kun hiếm gặp' | 'Tên người & Địa danh bẫy';
  etymologyAndComponent: string;
  commonTrapNotice: string;
  jlptRelevance: string;
  exampleSentence: {
    japanese: string;
    reading: string;
    translation: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 2. NGỮ PHÁP CỔ BUNGO & ĐẢO NGỮ TRANG TRỌNG N1 (文語文法 & 擬古文)
export interface ClassicalBungoGrammarItem {
  id: string;
  pattern: string; // VD: 〜ずにはおかない, 〜んがため, 〜まじき, 〜たるもの
  formation: string;
  sinoVietnameseConcept: string;
  meaning: string;
  archaicOrigin: string; // Cội nguồn văn ngữ thời cổ Heian / Kamakura
  nuanceVsModern: string; // So sánh với cách nói hiện đại
  toneRegister: 'Văn thư nghị viện & Luật pháp' | 'Tuyên ngôn & Diễn thuyết' | 'Văn phong triết học cổ điển';
  exampleSentence: {
    japanese: string;
    reading: string;
    translation: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 3. BÁCH KHOA TRỢ TỪ & PHÂN TẮC TINH TẾ (助詞の深層)
export interface NuanceParticleMatrixItem {
  id: string;
  particlePair: string; // VD: 「は」 vs 「が」 trong mệnh đề phụ, 「に」 vs 「で」 thời gian/địa điểm
  coreDistinction: string;
  linguisticExplanation: string; // Bản chất ngữ pháp chuyên sâu
  contrastingPairs: {
    sentenceA: string;
    readingA: string;
    meaningA: string;
    nuanceA: string;
    sentenceB: string;
    readingB: string;
    meaningB: string;
    nuanceB: string;
  };
  jlptTrapAdvice: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 4. SỬA LỖI DIỄN ĐẠT TỰ NHIÊN & COLLOCATION (自然なコロケーション)
export interface NaturalCollocationRefactorItem {
  id: string;
  unnaturalVietnameseThinking: string; // Cách nói gượng gạo do dịch word-by-word
  unnaturalJapanese: string;
  naturalNativeCollocation: string; // Cách nói chuẩn tự nhiên của người Nhật
  reading: string;
  explanationWhy: string; // Tại sao người Nhật không nói như vậy
  collocationCluster: string[]; // Các cụm đi kèm tự nhiên
  sampleDialogue: {
    context: string;
    japanese: string;
    reading: string;
    translation: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 5. BÓC TÁCH BẪY NGHE HIỂU N2-N1 SOKKAI & POINT (聴解ひっかけトラップ)
export interface ListeningTrapDeconstructItem {
  id: string;
  scenarioTitle: string; // Tên kịch bản bẫy
  trapType: 'Đổi ý phút chót (後出し条件)' | 'Phủ định kép gián tiếp (二重否定)' | 'Ngữ điệu thở dài / Bối rối' | 'Thông tin mồi nhử (ダミー選択肢)';
  audioTranscript: {
    speakerA: string;
    speakerB: string;
    speakerATurn2?: string;
  };
  readingTranscript: string;
  translation: string;
  theHiddenTrap: string; // Điểm giăng bẫy mà thí sinh hay sập
  solutionStrategy: string; // Chiến thuật nhận diện trong 3 giây
  questionPrompt: string; // Câu hỏi JLPT chuẩn mẫu
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}
