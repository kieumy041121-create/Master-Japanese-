// Types for 8 New Extended Features for PH2 (Reading & JLPT) and PH3 (Listening & Reflex)
import { JLPTLevel } from './index';

// ==========================================
// PH2: ĐỌC HIỂU & LUYỆN ĐỀ JLPT (3 NEW LABS)
// ==========================================

// 1. Reading Trap Matrix (Submodule 86)
export interface ReadingTrapItem {
  id: string;
  trapName: string; // VD: 'Bẫy Phủ Định Kép (Chẳng phải là không thể nói rằng...)', 'Bẫy Ý Kiến Số Đông Giả'
  trapCategory: 'negation' | 'contrast_shift' | 'generalization' | 'synonym_distortion' | 'scope_mismatch';
  jeesFormula: string; // Công thức bẫy của JEES
  sampleText: string;
  readingPointers: string[];
  questionStem: string;
  options: {
    text: string;
    isCorrect: boolean;
    trapReason?: string; // Tại sao là bẫy?
  }[];
  detailedAnalysis: string;
  mnemonicDefense: string; // Khắc chế bẫy
  jlptLevel: JLPTLevel;
}

// 2. Speed Reading Sprint (Submodule 87)
export interface SpeedReadingSprintItem {
  id: string;
  title: string;
  characterCount: number;
  targetSeconds: number; // Thời gian tiêu chuẩn đọc xong
  passageText: string;
  vocabularyKeywords: { word: string; reading: string; meaning: string }[];
  skimmingCoreThesis: string; // Đại ý tác giả trong 1 câu
  quickComprehensionQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  readingTips: string;
  jlptLevel: JLPTLevel;
}

// 3. Multi-Text Comparison (Submodule 88)
export interface MultiTextComparisonItem {
  id: string;
  themeTitle: string; // VD: 'Làm việc từ xa (Telework): Năng suất hay Xói mòn gắn kết?'
  passageA: {
    authorTitle: string;
    text: string;
    standpoint: string; // Lập trường tác giả A
  };
  passageB: {
    authorTitle: string;
    text: string;
    standpoint: string; // Lập trường tác giả B
  };
  commonPoints: string[]; // Điểm chung
  divergentPoints: string[]; // Điểm bất đồng cốt lõi
  integratedQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  comparativeMatrixSummary: string;
  jlptLevel: JLPTLevel;
}

// ==============================================
// PH3: NGHE HIỂU & PHẢN XẠ (5 NEW LABS)
// ==============================================

// 4. Instant Listening Trap (Submodule 89)
export interface InstantListeningTrapItem {
  id: string;
  stimulusAudioText: string; // Câu hỏi ngắn phát thanh
  stimulusReading: string;
  stimulusMeaning: string;
  trapType: 'keigo_direction' | 'rhetorical_question' | 'intonation_twist' | 'idiomatic_response';
  options: {
    text: string;
    reading: string;
    meaning: string;
    isCorrect: boolean;
    analysis: string;
  }[];
  reflexTimeLimitSeconds: number; // 3 giây
  trapExplanation: string;
  defenseKeyphrase: string;
  jlptLevel: JLPTLevel;
}

// 5. Japan Regional Dialects (Submodule 90)
export interface RegionalDialectItem {
  id: string;
  regionName: string; // VD: 'Kansai-ben (Osaka / Kyoto)', 'Hakata-ben (Fukuoka)', 'Tohoku-ben (Sendai/Aomori)'
  regionCode: 'kansai' | 'hakata' | 'tohoku' | 'hiroshima' | 'okinawa';
  characteristicParticles: {
    dialectParticle: string;
    standardJapanese: string;
    vietnameseMeaning: string;
  }[];
  dialogueExchange: {
    speaker: string;
    dialectText: string;
    standardText: string;
    vietnameseMeaning: string;
  }[];
  culturalContext: string;
  humorousTip: string;
  jlptLevel: JLPTLevel;
}

// 6. Business Phone Simulator (Submodule 91)
export interface BusinessPhoneScenarioItem {
  id: string;
  scenarioTitle: string; // VD: 'Khách hàng quan trọng gọi điện tìm Trưởng phòng vắng mặt'
  callerCompany: string;
  callerName: string;
  incomingDialogueSteps: {
    callerUtterance: string;
    callerMeaning: string;
    candidateResponses: {
      text: string;
      isProfessionalKeigo: boolean;
      feedback: string;
    }[];
  }[];
  memoTaskRequirement: {
    whoCalled: string;
    targetPerson: string;
    callActionNeeded: string; // Gọi lại / Nhắn tin / Sẽ gọi lại sau
    urgentDeadline: string;
  };
  proKeigoPhrases: string[];
  crisisHandlingTips: string;
  jlptLevel: JLPTLevel;
}

// 7. Fast News Radio Dictor (Submodule 92)
export interface FastNewsRadioItem {
  id: string;
  headline: string;
  newsCategory: 'economy' | 'technology' | 'society' | 'disaster' | 'international';
  broadcastSpeedWpm: number; // VD: 360 ký tự / phút
  newsScriptLines: {
    japaneseSentence: string;
    furiganaReading: string;
    vietnameseMeaning: string;
  }[];
  essentialJijiTerms: {
    term: string;
    reading: string;
    meaning: string;
  }[];
  gistSummaryQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  newsContextBackground: string;
  jlptLevel: JLPTLevel;
}

// 8. Numeric Audio Matrix (Submodule 93)
export interface NumericAudioItem {
  id: string;
  category: 'currency_price' | 'percentage_ratio' | 'time_date' | 'large_statistics';
  audioPromptText: string; // Câu tiếng Nhật chứa số liệu
  furiganaReading: string;
  vietnameseMeaning: string;
  parsedTargetNumber: string; // Số liệu mấu chốt, VD: '3億5000万円' (350 triệu Yên)
  distractorNumbers: string[]; // Các số liệu bẫy tương tự
  trendDirection?: 'surge' | 'plunge' | 'flat' | 'double'; // Xu hướng (tăng vọt, sụt giảm, đi ngang...)
  audioNumericBreakdown: string; // Phân tích mẹo tách nhóm 4 chữ số (vạn / ức)
  challengeSpeedSeconds: number;
  jlptLevel: JLPTLevel;
}
