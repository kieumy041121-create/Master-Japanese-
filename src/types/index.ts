export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type DivisionId =
  | 'vocab_kanji'
  | 'jlpt_reading'
  | 'listening_speaking'
  | 'biz_culture'
  | 'learner_boost'
  | 'cultural_learning'
  | 'edutainment_fun'
  | 'japan_encyclopedia';

export * from './cultural';
export * from './edutainment';
export * from './encyclopedia';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subText?: string;
  options: QuizOption[];
  correctExplanation: string;
  trapAnalysis?: string; // Bẫy logic JEES hoặc lỗi thường gặp
  mnemonicTip: string; // Mẹo nhớ nhanh
}

// 1. Vocab
export interface VocabItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  level: JLPTLevel;
  kanjiBreakdown?: string;
  exampleSentence: string;
  exampleReading: string;
  exampleMeaning: string;
  mnemonicStory: string;
  mnemonicImageHint?: string;
  srsStage?: 'new' | 'learning' | 'review' | 'mastered';
  jeesTrapDecode?: {
    trapType: 'Bẫy đồng nghĩa' | 'Bẫy âm On/Kun' | 'Bẫy ngữ cảnh phó từ' | 'Bẫy đối tượng tác động' | 'Bẫy tâm lý JEES';
    trapDescription: string;
    confusingPair?: string;
    howToNeutralize: string;
  };
  quiz: QuizQuestion;
}

// 2. Kanji
export interface KanjiItem {
  id: string;
  character: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  level: JLPTLevel;
  strokeCount: number;
  radicals: string[]; // Bộ thủ cấu tạo
  radicalMeaning: string;
  mnemonicStory: string;
  strokeOrderGuide?: string[]; // Các bước vẽ
  commonWords: { word: string; reading: string; meaning: string }[];
  calligraphyQuiz: QuizQuestion; // Đôi mắt thư pháp: bắt lỗi nét sai
}

// 3. Slang
export interface SlangItem {
  id: string;
  slang: string;
  reading: string;
  origin: 'X' | '2ch' | 'TikTok' | 'Công sở' | 'Gen Z' | string;
  meaning: string;
  contextUsage: string;
  sampleDialogue: { speaker: string; text: string; translation: string }[];
  quiz: QuizQuestion;
}

// 4. Context Generator
export interface ContextItem {
  id: string;
  targetWord: string;
  reading: string;
  meaning: string;
  nuances: {
    keigo: { sentence: string; translation: string; note: string };
    casual: { sentence: string; translation: string; note: string };
    editorial: { sentence: string; translation: string; note: string };
  };
  quiz: QuizQuestion;
}

// 5. Audio Lens
export interface AudioLensItem {
  id: string;
  keyword: string;
  durationSec: number;
  sourceType: 'Podcast' | 'Phim tài liệu' | 'Bản tin' | 'Hội thoại đường phố';
  title: string;
  japaneseTranscript: string;
  vietnameseTranscript: string;
  keyTimestamp: string;
  keywordExplanation: string;
  listeningTip: string;
  quiz: QuizQuestion;
}

// 6. Past Papers
export interface PastPaperItem {
  id: string;
  year: string;
  session: 'Tháng 7' | 'Tháng 12';
  level: JLPTLevel;
  section: 'Từ vựng - Chữ Hán' | 'Ngữ pháp' | 'Đọc hiểu';
  passage?: string;
  quiz: QuizQuestion;
  jeesTrapNotes: string;
}

// 7. AI Exam
export interface AiExamQuestion {
  id: string;
  level: JLPTLevel;
  section: string;
  instruction: string;
  content: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  grammarMnemonic: string;
}

// 8. Japan Truth
export interface JapanTruthItem {
  id: string;
  title: string;
  japaneseTheme: string;
  category: 'Văn hóa xã hội' | 'Lịch sử ngôn ngữ' | 'Tâm lý người Nhật' | 'Quy chuẩn ngầm';
  linkedGrammarOrKanji: string;
  content: string;
  funFact: string;
  recheckQuiz: QuizQuestion;
}

// 9. Deep Reading
export interface DeepReadingItem {
  id: string;
  title: string;
  level: JLPTLevel;
  textWithFurigana: { text: string; ruby?: string }[];
  plainText: string;
  translation: string;
  sentenceBreakdown: {
    sentence: string;
    subject: string;
    predicate: string;
    modifiers: string;
    particlesExplanation: string;
    detailedTranslation: string;
  }[];
  quiz: QuizQuestion;
}

// 10. News Browser
export interface NewsFuriganaToken {
  text: string;
  ruby?: string;
  level?: JLPTLevel;
  meaning?: string;
}

export interface NewsSentence {
  japanese: string;
  vietnamese: string;
  tokens: NewsFuriganaToken[];
  keyGrammarOrVocab?: string;
}

export type NewsSource =
  | 'X (Twitter)'
  | 'Nikkei'
  | 'Asahi Shimbun'
  | 'Mainichi Shimbun'
  | 'Yomiuri Shimbun'
  | 'TBS News Dig'
  | 'PR TIMES'
  | 'NHK Easy'
  | 'Yahoo Japan'
  | 'Kyodo News'
  | string;

export interface NewsItem {
  id: string;
  title: string;
  titleFurigana?: NewsFuriganaToken[];
  titleVietnamese?: string;
  source: NewsSource;
  publishedAt: string;
  summary: string;
  fullText: string;
  vietnameseTranslation?: string;
  sentences?: NewsSentence[];
  vocabularyTags: { word: string; reading: string; meaning: string; level: JLPTLevel }[];
  grammarNotes: string;
  quiz: QuizQuestion;
  // State-of-the-Art Editorial & Localization:
  editorialSummary?: {
    coreTakeaway: string;
    bulletPoints: string[];
    urgencyLevel?: 'Khẩn cấp' | 'Quan trọng' | 'Đời sống' | 'Xu hướng';
  };
  culturalContextExplanation?: {
    socialBackground: string;
    specializedTerms: { term: string; reading: string; meaning: string; nuance: string }[];
    historicalOrPolicySignificance: string;
  };
}

// 11. Practical Reading
export interface AdministrativeTerm {
  term: string;
  reading: string;
  meaning: string;
  culturalAdministrativeReason: string; // Lý do người Nhật dùng từ này trong bối cảnh hành chính/máy móc
}

export interface SurvivalRiskTrap {
  severity: 'high' | 'medium' | 'critical';
  dangerTitle: string;
  penaltyOrLoss: string;
  howToIdentify: string;
  preventiveAdvice: string;
}

export interface ThreeSecondActionTest {
  scenarioTitle: string;
  situationPrompt: string;
  actionSteps: {
    stepNumber: number;
    instruction: string;
    buttonOrTarget: string;
    criticalRule: string;
  }[];
  expectedResult: string;
}

export interface PracticalDocItem {
  id: string;
  docType: 'Hóa đơn tiền điện/nước' | 'Hợp đồng thuê nhà' | 'Thẻ ngoại kiều' | 'Màn hình ATM' | 'Vé Shinkansen' | string;
  title: string;
  mockVisualData: Record<string, string>;
  importantFields: { label: string; japanese: string; explanation: string; locationTip: string }[];
  quiz: QuizQuestion;
  // State-of-the-Art Practical Survival Extensions:
  visualSimulation?: {
    layoutType: 'atm_screen' | 'zairyu_card' | 'shinkansen_ticket' | 'utility_bill' | 'lease_contract';
    serialNumber?: string;
    stampSealText?: string;
    barcodeOrMagnetic?: string;
    warningNoticeTop?: string;
    visualSections: {
      sectionTitle: string;
      accentColor: string;
      badgeText?: string;
      fields: { label: string; keyJp: string; value: string; isHighlighted?: boolean; warningBadge?: string }[];
    }[];
  };
  administrativeGlossary?: AdministrativeTerm[];
  survivalTraps?: SurvivalRiskTrap[];
  threeSecondReflexTest?: ThreeSecondActionTest;
}

// 12. Translation Challenge
export interface TranslationItem {
  id: string;
  originalJapanese: string;
  context: string;
  sourceGenre: 'Tiểu thuyết' | 'Báo chí' | 'Thương mại' | 'Châm biếm' | 'Văn học';
  options: {
    id: string;
    translation: string;
    rating: 'Chuẩn xác & Tự nhiên' | 'Quá máy móc' | 'Lệch sắc thái';
    analysis: string;
  }[];
  masterTip: string;
}

// 13. Pitch Accent
export interface PitchItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  pitchType: string;
  pitchGraph: number[]; // e.g., [0, 1, 1, 0]
  audioDescription: string;
  quiz: QuizQuestion;
  accentTip: string;
}

// 14. Field Audio
export interface FieldAudioItem {
  id: string;
  title: string;
  environment: 'Ga tàu Shinjuku' | 'Siêu thị Donki' | 'Quán Izakaya' | 'Ngã tư Shibuya';
  ambientNoiseDesc: string;
  transcript: string;
  filteredKeyTokens: string[];
  noiseFilterTip: string;
  quiz: QuizQuestion;
}

// 15. Dictation
export interface DictationItem {
  id: string;
  level: JLPTLevel;
  dialect: 'Tokyo Tiêu chuẩn' | 'Kansai-ben' | 'Hakata-ben';
  speedLevels: ('0.75x' | '1.0x' | '1.25x')[];
  fullSentence: string;
  reading: string;
  translation: string;
  maskedSentence: string; // e.g. "週末は______に行きます"
  missingWords: string;
  phoneticPhenomenon: string; // Biến âm, nuốt âm, âm ngắt
  listeningTip: string;
}

// 16. Roleplay
export interface RoleplayScenario {
  id: string;
  title: string;
  setting: 'Phỏng vấn Baito' | 'Nomikai cùng Sếp' | 'Nhà ga trễ tàu' | 'Khiếu nại Combini';
  characterName: string;
  characterRole: string;
  initialMessage: string;
  suddenEvents: string[]; // Các biến cố tải nạp thêm
  currentEvent?: string;
  options: {
    id: string;
    text: string;
    isPoliteAndEffective: boolean;
    culturalFeedback: string;
    senpaiTip: string;
  }[];
}

// 17. Debate Arena
export interface DebateTopic {
  id: string;
  title: string;
  category: 'Lao động' | 'Xã hội' | 'Kinh tế' | 'Giao tiếp';
  perspectives: {
    stance: 'Ủng hộ (Tán thành)' | 'Phản đối (Gay gắt)' | 'Góc nhìn Gen Z' | 'Góc nhìn Doanh nghiệp';
    argument: string;
    keyCounterPoints: string[];
    usefulTransitionWords: { word: string; meaning: string; usageRule: string }[];
  }[];
  quiz: QuizQuestion;
}

// 18. Senpai - Kouhai
export interface SenpaiQuestion {
  id: string;
  kouhaiQuery: string;
  workContext: string;
  senpaiAdvice: string;
  workplaceRule: string;
  quiz: QuizQuestion;
}

// 19. Keigo Email
export interface KeigoEmailItem {
  id: string;
  recipientRole: 'Khách hàng đối tác (Soto)' | 'Sếp trực tiếp (Uchi)' | 'Đồng nghiệp cùng cấp' | string;
  casualOrWrongVersion: string;
  problemAnalysis: string;
  correctSonkeigoOrKenjougo: string;
  transformationFormula: string;
  quiz: QuizQuestion;
}

// 20. Horenso
export interface HorensoScenario {
  id: string;
  title: string;
  violationType: 'Hōkoku (Báo cáo muộn/sai thứ tự)' | 'Renraku (Bỏ sót người liên quan)' | 'Sōdan (Không đưa giải pháp gợi ý)' | string;
  scenarioNarrative: string;
  bossReaction: string;
  properProtocol: string;
  goldenRuleTip: string;
  quiz: QuizQuestion;
}

// 21. Mô phỏng Quản trị Dự án & Khủng hoảng Hậu cần (Logistics)
export interface LogisticsCrisisItem {
  id: string;
  projectName: string;
  role: string;
  crisisType: 'Chậm tiến độ giao hàng' | 'Thiếu hụt nhân sự khẩn' | 'Cắt giảm ngân sách phút chót' | 'Lỗi linh kiện nhập khẩu';
  scenario: string;
  suddenEvents: string[];
  prioritySteps: { step: number; action: string; rationale: string }[];
  japaneseCrisisPhrases: { phrase: string; meaning: string; situation: string }[];
  quiz: QuizQuestion;
}

// 22. Lập kế hoạch SDGs & CSR Doanh nghiệp
export interface SdgsCsrItem {
  id: string;
  businessCase: string;
  targetSdgsGoal: { number: number; name: string; icon: string };
  proposalStructure: { section: string; content: string; keyKango: string }[];
  academicBizVocabulary: { word: string; reading: string; meaning: string }[];
  quiz: QuizQuestion;
}

// 23. Nghệ thuật Đàm phán B2B & Từ đệm (Kushon-kotoba)
export interface KushonNegotiationItem {
  id: string;
  partnerDemand: string;
  conflictType: 'Ép hạ giá 20%' | 'Đòi rút ngắn tiến độ một nửa' | 'Yêu cầu tính năng ngoài hợp đồng';
  kushonKotobaList: { phrase: string; reading: string; meaning: string; nuance: string }[];
  refusalStrategy: string;
  diplomaticResponse: string;
  quiz: QuizQuestion;
}

// 24. Trình giả lập Giao diện "Văn phòng ảo" (Virtual Workspace)
export interface VirtualWorkspaceItem {
  id: string;
  taskType: 'Soạn thảo email Outlook/Gmail' | 'Bảng tính quản lý tiến độ Sheets/Excel';
  title: string;
  mockWorkspaceData: {
    subject?: string;
    sender?: string;
    recipient?: string;
    bodyContent?: string;
    tableColumns?: string[];
    tableRows?: Record<string, string>[];
  };
  japaneseFormattingRules: string[];
  quiz: QuizQuestion;
}

// 25. Sổ tay Nghi thức & Xử lý Khủng hoảng Văn phòng (Kamiza - Shimoza, Ojigi, Meishi)
export interface CorporateCrisisItem {
  id: string;
  title: string;
  category: string;
  diagramType: 'elevator' | 'car' | 'meeting' | 'bowing' | 'meishi' | 'taxi' | 'meishi_flow';
  scenario: string;
  correctAction: string;
  spatialRules: string[];
  mnemonicRule: string;
  quiz: QuizQuestion;
}

export interface OfficeEtiquetteItem {
  id: string;
  etiquetteType: 'Trao nhận Danh thiếp (Meishi)' | 'Cúi chào (Ojigi 15-30-45)' | 'Tiếp trà (Ocha)' | 'Tiễn khách Thang máy';
  title: string;
  actionGuideline: string;
  visualGraphicDesc: string;
  geometricRules: string[];
  quiz: QuizQuestion;
}

// 26. Radar Giải mã "Honne & Tatemae" (Kuuki wo Yomu)
export interface HonneTatemaeItem {
  id: string;
  speakerRole: 'Sếp người Nhật' | 'Đối tác đàm phán' | 'Khách hàng lâu năm';
  spokenTatemae: string;
  reading: string;
  literalMeaning: string;
  hiddenHonne: string;
  psychologicalAnalysis: string;
  dangerLevel: 'Cực kỳ nguy hiểm (Từ chối khéo)' | 'Cảnh báo chấn chỉnh' | 'Khích lệ thực chất';
  quiz: QuizQuestion;
}

// 27. Trình giả lập "Nemawashi" (Vận động hành lang)
export interface NemawashiStakeholder {
  id: string;
  name: string;
  role: string;
  influenceLevel: 'Cao' | 'Trung bình' | 'Thấp';
  stance: 'Bảo thủ phản đối' | 'Trung lập dè dặt' | 'Ủng hộ ngầm' | 'Nắm quyền quyết định tối hậu';
  strategy: string;
  effectiveGreeting: string;
}

export interface NemawashiItem {
  id: string;
  projectProposal: string;
  stakeholders: NemawashiStakeholder[];
  consensusSteps: string[];
  nemawashiWisdom: string;
  quiz: QuizQuestion;
}

// 28. Đấu trường "Nomikai" & Hệ tư tưởng "Kamiza – Shimoza"
export interface KamizaNomikaiItem {
  id: string;
  spatialSetting: 'Bàn tiệc nhậu Nomikai' | 'Phòng họp hội nghị' | 'Phòng chiếu Tatami' | 'Xe Taxi' | 'Khoang tàu Shinkansen' | 'Thang máy';
  title: string;
  seatingGrid: { seatIndex: number; title: string; rank: 'Kamiza' | 'Shimoza' | 'Trung lập'; explanation: string }[];
  drinkingRules: string[];
  samuraiOriginHistory: string;
  threeSecondRule: string;
  quiz: QuizQuestion;
}

// 29. Triết lý Quản trị Kaizen, 5S & Báo cáo A3
export interface Kaizen5sA3Item {
  id: string;
  factoryOrOfficeIssue: string;
  fiveSFocus: 'Seiri (Sàng lọc)' | 'Seiton (Sắp xếp)' | 'Seiso (Sạch sẽ)' | 'Seiketsu (Săn sóc)' | 'Shitsuke (Sẵn sàng)';
  fiveWhysChain: { whyNumber: number; question: string; answer: string }[];
  a3SummaryBlueprint: {
    background: string;
    currentCondition: string;
    rootCause: string;
    countermeasures: string;
    followUp: string;
  };
  quiz: QuizQuestion;
}

// 30. Nghệ thuật Tặng quà (Omiyage / Ochugen / Oseibo) & Omotenashi
export interface GiftOmotenashiItem {
  id: string;
  occasion: 'Omiyage sau chuyến công tác' | 'Ochugen (Lễ tạ ơn mùa hè)' | 'Oseibo (Tri ân cuối năm)' | 'Đón tiếp đoàn khách VIP';
  recipientContext: string;
  recommendedGift: string;
  budgetGuide: string;
  noshiPaperRule: string;
  tabooGifts: { item: string; tabooReason: string }[];
  omotenashiSpiritStory: string;
  quiz: QuizQuestion;
}
export interface GrammarItem {
  id: string;
  pattern: string;
  level: JLPTLevel;
  meaning: string;
  formation: string;
  explanation: string;
  exampleSentence: string;
  exampleReading: string;
  exampleMeaning: string;
  trapAnalysis: string;
  mnemonicTip: string;
  quiz?: QuizQuestion;
}
