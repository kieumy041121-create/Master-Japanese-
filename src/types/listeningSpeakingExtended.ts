import { JLPTLevel } from './index';

// Submodule 89: Luyện Nghe Nuốt Âm, Biến Âm & Âm Lướt (音変化・リダクション)
export interface PhoneticReductionItem {
  id: string;
  level: JLPTLevel;
  ruleCategory: 'te_contract' | 'nakereba' | 'ranuki' | 'renbin' | 'toite' | 'n_assimilation';
  ruleCategoryName: string;
  standardForm: string;
  reducedForm: string;
  phoneticRuleExplanation: string;
  exampleSentenceStandard: string;
  exampleSentenceSpoken: string;
  meaningVietnamese: string;
  listeningTrap: string;
  drillOptions: {
    promptAudioText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  nativeUsageContext: string;
}

// Submodule 90: Phản Xạ Ứng Khẩu 3 Giây - Aizuchi & Đệm Từ Tự Nhiên
export interface AizuchiReflexItem {
  id: string;
  level: JLPTLevel;
  situationType: 'agreement' | 'surprise' | 'sympathy' | 'business_respect' | 'thinking_filler';
  situationTypeName: string;
  speakerPrompt: string;
  speakerPromptTranslation: string;
  speakerContext: string;
  idealAizuchi: string;
  idealRomaji: string;
  meaningAndEffect: string;
  options: {
    phrase: string;
    isIdeal: boolean;
    nuanceScore: 'perfect' | 'acceptable' | 'rude_or_awkward';
    feedback: string;
  }[];
  socialTabooWarning: string;
  speechSample: string;
}

// Submodule 91: Luyện Nghe Đề JLPT Chuyên Sâu: Trọng Tâm & Dạng Bài Tức Thời (即時応答 & 概要理解)
export interface JlptChokkaiItem {
  id: string;
  level: JLPTLevel;
  questionType: 'mondai4_instant_response' | 'mondai5_integrated_comprehension' | 'point_understanding';
  questionTypeName: string;
  title: string;
  scenarioDescription: string;
  audioDialogueScript: {
    speaker: string;
    text: string;
    rubyText?: string;
    translation: string;
  }[];
  questionAudioText: string;
  questionTranslation: string;
  choices: {
    index: number;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  keyCatchPhrase: string;
  listeningStrategy: string;
}

// Submodule 92: Bậc Thầy Ngữ Điệu Cảm Xúc & Nghĩa Ngầm (イントネーションとニュアンス)
export interface IntonationNuanceItem {
  id: string;
  level: JLPTLevel;
  targetPhrase: string;
  romaji: string;
  literalMeaning: string;
  contrastA: {
    pitchContour: 'rising' | 'falling' | 'flat' | 'prolonged';
    contourLabel: string;
    realMeaning: string;
    toneMood: string;
    exampleContext: string;
    spokenSentence: string;
  };
  contrastB: {
    pitchContour: 'rising' | 'falling' | 'flat' | 'prolonged';
    contourLabel: string;
    realMeaning: string;
    toneMood: string;
    exampleContext: string;
    spokenSentence: string;
  };
  subtleClues: string[];
  testScenario: {
    scenarioAudio: string;
    scenarioTranslation: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  culturalInsight: string;
}

// Submodule 93: Mô Phỏng Giao Tiếp Tình Huống Khẩn Cấp & Đời Sống Nhật Bản
export interface EmergencyDialogueItem {
  id: string;
  level: JLPTLevel;
  category: 'dial_119_ambulance' | 'dial_110_police' | 'jr_lost_found' | 'hospital_triage' | 'earthquake_typhoon';
  categoryName: string;
  emergencyTitle: string;
  situationBrief: string;
  crucialKeywords: { japanese: string; romaji: string; vietnamese: string }[];
  branchingSteps: {
    stepIndex: number;
    officialAudioPrompt: string;
    officialPromptTranslation: string;
    userChoiceOptions: {
      userSpokenText: string;
      isStandardSurvival: boolean;
      consequenceFeedback: string;
      responseFromOfficial: string;
    }[];
  }[];
  survivalChecklist: string[];
  japanLegalSystemNote: string;
}
