// Types for 4 New Advanced Vocab & Kanji Features (Submodules 82-85)
import { JLPTLevel } from './index';

// 1. SINO-VIETNAMESE ONYOMI PHONETIC MATRIX (Âm Hán Việt & Chuyển âm Onyomi)
export interface SinoVietnameseRuleItem {
  id: string;
  initialOrRime: string; // VD: 'Âm đầu B, P -> H, B', 'Vần AN, ANG -> ON, OU'
  category: 'initial_consonant' | 'rime_ending' | 'tone_voicing'; // Âm đầu / Vần / Thanh điệu
  ruleDescription: string;
  ruleFormula: string; // VD: 'B/P (Hán Việt) ➔ H/B (Onyomi)'
  accuracyRate: string; // VD: '95% chuẩn xác'
  vietnameseExamples: string[];
  japaneseKanjiExamples: {
    kanji: string;
    hanViet: string;
    onyomi: string;
    sampleWord: string;
    sampleReading: string;
    sampleMeaning: string;
  }[];
  deepExplanation: string;
  mnemonicTip: string;
  jlptLevel: JLPTLevel;
}

// 2. KANJI FAMILY TREE & DERIVATION (Cây phả hệ chữ Hán phái sinh từ gốc hình thanh)
export interface KanjiFamilyTreeItem {
  id: string;
  rootKanji: string; // Gốc chữ, VD: '青' (Thanh), '寺' (Tự), '包' (Bao), '莫' (Mạc)
  rootOnyomi: string;
  rootMeaning: string;
  phoneticCore: string; // Âm nòng cốt, VD: 'SEI / SHOU'
  familyMembers: {
    kanji: string;
    radical: string;
    radicalMeaning: string;
    hanViet: string;
    onyomi: string;
    kunyomi?: string;
    wordCompound: string;
    wordReading: string;
    wordMeaning: string;
    memoryMnemonic: string;
    jlptLevel: JLPTLevel;
  }[];
  evolutionPhilosophy: string; // Triết lý phát triển hình thanh
  jlptLevel: JLPTLevel;
}

// 3. SYNONYM NUANCE CONTRAST (Phân biệt từ đồng nghĩa & ma trận sắc thái)
export interface SynonymNuanceItem {
  id: string;
  conceptTitle: string; // VD: 'Thay đổi (Kaeru vs Aratameru vs Henkou vs Shuusei)'
  generalMeaning: string;
  wordsInPair: {
    word: string;
    kanji: string;
    reading: string;
    coreNuance: string; // Sắc thái cốt lõi
    appropriateContext: string; // Bối cảnh phù hợp
    tabooOrUnnatural: string; // Bối cảnh cấm kỵ / kỳ quặc
    exampleSentence: string;
    exampleReading: string;
    exampleMeaning: string;
    jlptLevel: JLPTLevel;
  }[];
  comparativeMatrixSummary: string; // Bảng đối chiếu tóm tắt
  quickDistinctionTip: string; // Mẹo nhớ nhanh 3 giây
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  jlptLevel: JLPTLevel;
}

// 4. ANTONYM JUKUGO & COMPLEMENTARY (Cặp từ Hán tự đối nghĩa & tương hỗ)
export interface AntonymJukugoItem {
  id: string;
  pairTitle: string; // VD: '拡大 (Mở rộng) ⇄ 縮小 (Thu nhỏ)'
  wordA: {
    word: string;
    reading: string;
    hanViet: string;
    meaning: string;
    characterDeconstruction: string; // Chiết tự từng Hán tự
    exampleSentence: string;
    exampleReading: string;
    exampleMeaning: string;
  };
  wordB: {
    word: string;
    reading: string;
    hanViet: string;
    meaning: string;
    characterDeconstruction: string;
    exampleSentence: string;
    exampleReading: string;
    exampleMeaning: string;
  };
  conceptualOpposition: string; // Logic đối lập
  jlptContextAndTraps: string; // Bẫy đề thi JLPT
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  jlptLevel: JLPTLevel;
}
