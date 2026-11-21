import { JLPTLevel } from './index';

// Submodule 86: Bóc Tách Bẫy Logic & Luận Cứ Đọc Hiểu N2-N1
export interface ReadingTrapItem {
  id: string;
  level: JLPTLevel;
  title: string;
  trapType: 'causality' | 'generalization' | 'author_vs_cite' | 'double_negative' | 'subtle_restriction';
  trapTypeName: string;
  passageJapanese: string;
  passageVietnamese: string;
  authorThesis: string;
  distractorTrapAnalysis: {
    optionA: { text: string; isCorrect: boolean; explanation: string };
    optionB: { text: string; isCorrect: boolean; explanation: string };
    optionC: { text: string; isCorrect: boolean; explanation: string };
    optionD: { text: string; isCorrect: boolean; explanation: string };
  };
  keyMarkers: string[];
  strategicTip: string;
  detailedAnalysis: string;
}

// Submodule 87: Phòng Luyện Tốc Đọc Skimming & Scanning
export interface SpeedReadingItem {
  id: string;
  level: JLPTLevel;
  title: string;
  theme: string;
  wordCount: number;
  recommendedTimeSec: number;
  contentJapanese: string;
  contentVietnamese: string;
  corePivotSentence: string;
  pivotsAndConnectors: string[];
  skimmingQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  scanningChallenge: {
    targetKeyword: string;
    targetHint: string;
    answerContext: string;
  };
  techniqueExplanation: string;
}

// Submodule 88: Đọc Hiểu Văn Bản Thực Tế & Công Văn Hành Chính Nhật Bản
export interface OfficialDocumentItem {
  id: string;
  level: JLPTLevel;
  documentType: 'city_notice' | 'apartment_rule' | 'tax_insurance' | 'recall_safety' | 'disaster_guide';
  documentTypeName: string;
  title: string;
  organization: string;
  documentHtmlSnippet: {
    heading: string;
    issuedDate: string;
    targetAudience: string;
    mainBody: string;
    bulletPoints: string[];
    exemptionsAndNotes: string[];
    inquiryContact: string;
  };
  glossary: { term: string; reading: string; meaning: string }[];
  practicalQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    clueLocation: string;
    explanation: string;
  }[];
  realLifeGuidance: string;
  culturalAdministrativeContext: string;
}
