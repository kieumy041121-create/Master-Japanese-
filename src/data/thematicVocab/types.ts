import { JLPTLevel } from '../../types';

export interface ThematicWord {
  id: string;
  word: string;
  reading: string;
  romaji: string;
  sinoVietnamese?: string;
  meaningVn: string;
  level: JLPTLevel;
  tags?: string[];
  exampleJp?: string;
  exampleReading?: string;
  exampleVn?: string;
}

export interface ThematicTopic {
  id: string;
  groupId: string;
  groupTitle: string;
  title: string;
  subtitle: string;
  iconName: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    gradient: string;
    badgeBg: string;
  };
  description: string;
  subtopics: string[];
  wordCount?: number;
  words: ThematicWord[];
}

export interface ThematicGroup {
  id: string;
  title: string;
  shortTitle?: string;
  name?: string;
  description?: string;
  desc?: string;
  badge?: string;
  badgeColor?: string;
  iconName: string;
  topicIds: string[];
}
