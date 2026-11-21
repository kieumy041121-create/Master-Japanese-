import { JLPTLevel } from './index';

export type EncyclopediaSectionId =
  | 'geography_admin'
  | 'history_politics'
  | 'tradition_arts'
  | 'washoku_cuisine'
  | 'society_customs'
  | 'pop_culture'
  | 'travel_practical'
  | 'lifelong_learning';

export interface EncyclopediaSectionMeta {
  id: EncyclopediaSectionId;
  code: string;
  title: string;
  shortTitle: string;
  jpTitle: string;
  iconName: string;
  badge: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    activeTab: string;
    pill: string;
  };
  description: string;
}

export interface EncyclopediaTopicItem {
  id: string;
  sectionId: EncyclopediaSectionId;
  title: string;
  jpTitle: string;
  romaji: string;
  hiragana: string;
  level: JLPTLevel;
  badge: string;
  summary: string;
  keyTakeaways: string[];
  detailedExplanation: string; // Mục giải thích văn hóa chi tiết hơn
  culturalPhilosophy: string; // Triết lý tâm hồn & bài học đúc kết
  practicalAdvice: string; // Lời khuyên thực chiến cho người Việt tại Nhật
  vocabularyList: {
    word: string;
    reading: string;
    meaning: string;
    level: JLPTLevel;
  }[];
  quickFact: string;
  interactivePoints?: {
    label: string;
    desc: string;
    tag?: string;
  }[];
  tags: string[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    culturalContext?: string;
  };
}
