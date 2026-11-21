import { JLPTLevel } from './index';

// 1. Tatemae & Honne (Đọc vị lời nói thật)
export interface TatemaeHonneItem {
  id: string;
  situation: string; // Tình huống thực tế (VD: Đến chơi nhà bạn ở Kyoto, Họp công ty, Từ chối lời mời)
  speaker: string; // Vai người nói (Sếp, Đối tác, Mẹ bạn thân, Khách hàng)
  tatemaeSentence: string; // Câu nói bên ngoài (Khách sáo, giữ hòa khí)
  tatemaeReading: string;
  tatemaeMeaning: string; // Dịch nghĩa đen
  honneTruth: string; // Ý tứ thực sự bên trong (Sự thật trần trụi)
  nuanceLevel: 'Nhẹ nhàng xã giao' | 'Từ chối khéo léo' | 'Báo động nguy hiểm (Kyoto style)' | 'Cảnh báo chấn chỉnh';
  level: JLPTLevel;
  culturalBackground: {
    origin: string; // Bối cảnh văn hóa & lịch sử (Tại sao người Nhật lại dùng cách nói này?)
    psychology: string; // Tâm lý học người Nhật (Giữ thể diện, Chủ nghĩa tập thể Wa 和, Tránh xung đột)
    gaijinTrap: string; // Bẫy mà người nước ngoài hay mắc phải do hiểu theo nghĩa đen
    safeResponse: {
      sentence: string; // Mẫu câu đáp lại an toàn & thông minh nhất
      reading: string;
      meaning: string;
    };
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 2. Kisetsukan & Matsuri (Ngôn ngữ 4 mùa, Mỹ học tự nhiên & Lễ hội)
export interface KisetsukanItem {
  id: string;
  season: 'Xuân (春)' | 'Hạ (夏)' | 'Thu (秋)' | 'Đông (冬)' | 'Giao mùa (季節の変わり目)';
  term: string; // Từ vựng / Thành ngữ văn hóa (VD: 木漏れ日, 花吹雪, 初詣, 節分, 旬)
  reading: string;
  sinoVietnamese: string;
  meaning: string;
  aestheticCategory: 'Wabi-Sabi (Mộc mạc vô thường)' | 'Mono no Aware (Cảm khái trước cái đẹp ngắn ngủi)' | 'Yugen (U huyền bí ẩn)' | 'Kacho Fugetsu (Hoa điểu phong nguyệt)';
  festivalOrRitual: string; // Nghi thức / Lễ hội đi kèm
  culturalDeepDive: {
    historicalRoots: string; // Nguồn gốc Thần đạo Shinto, Phật giáo hoặc tập quán cổ xưa
    whyJapaneseCare: string; // Vì sao người Nhật lại coi trọng nét văn hóa này?
    howToExperience: string; // Cách trải nghiệm chuẩn mực nếu bạn đang ở Nhật
    proverbOrIdiom: {
      japanese: string;
      reading: string;
      meaning: string;
    };
  };
  sampleContext: {
    sentence: string;
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

// 3. Washoku & Table Manners (Triết lý ẩm thực & Nghi thức bàn ăn)
export interface WashokuMannerItem {
  id: string;
  dishOrOccasion: string; // Món ăn hoặc dịp ăn uống (VD: Tiệc nhậu Izakaya, Bữa ăn gia đình, Mì Ramen, Sushi, Trà đạo)
  mannerTitle: string; // Tên nghi thức / Quy tắc (VD: Hashi no Taboo, Itadakimasu, Phí Otoshi, Tejaku)
  japaneseTerm: string;
  reading: string;
  meaning: string;
  status: 'Quy tắc vàng bắt buộc' | 'Đại kỵ phạm húy (Cấm kỵ)' | 'Nghệ thuật tinh tế';
  culturalExplanation: {
    spiritualMeaning: string; // Ý nghĩa tâm linh / Triết lý đằng sau quy tắc này
    historicalStory: string; // Câu chuyện lịch sử hình thành
    whatHappensIfBroken: string; // Hậu quả văn hóa nếu bạn vô tình vi phạm
    correctEtiquetteSteps: string[]; // Các bước thực hiện chuẩn chỉ
  };
  usefulPhrases: {
    phrase: string;
    reading: string;
    usageNote: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 4. Meiwaku, Omoiyari & Kuuki (Chuẩn mực ứng xử & Đọc bầu không khí)
export interface MeiwakuOmoiyariItem {
  id: string;
  conceptName: string; // Khái niệm cốt lõi (VD: 迷惑をかけない, 空気を読む, 思いやり, 世間体, 義理と人情)
  reading: string;
  sinoVietnamese: string;
  definition: string;
  realLifeDilemma: string; // Tình huống nan giải trong cuộc sống thực tế
  japaneseMindset: string; // Cách tư duy của người bản xứ trước tình huống này
  culturalExplanation: {
    socialContractOrigin?: string; // Bối cảnh cộng đồng làng xã nông nghiệp lúa nước (Mura-hachibu)
    shameCultureAnalysis?: string; // Phân tích "Văn hóa Xấu hổ" (Haji no Bunka) vs "Văn hóa Tội lỗi" phương Tây
    foreignerSurvivalAdvice: string; // Lời khuyên vàng để người nước ngoài sinh sống tại Nhật không bị cô lập
    spiritualMeaning?: string;
    historicalStory?: string;
  };
  dialogueSimulation: {
    roleA: string;
    lineA: string;
    roleB: string;
    lineB: string;
    interpretation: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 5. Zoutou & Omotenashi Rituals (Nghệ thuật quà tặng & Lễ nghi giao tế)
export interface ZoutouOmotenashiItem {
  id: string;
  event: 'Omiyage du lịch/công tác' | 'Ochugen (Tạ ơn mùa hè)' | 'Oseibo (Tri ân cuối năm)' | 'Goshuugi (Tiền mừng cưới)' | 'Kouden (Tiền tang lễ)' | 'Okaeshi (Đáp lễ)';
  ritualTitle: string; // Tên nghi lễ
  japaneseTerm: string;
  reading: string;
  budgetRange: string; // Mức ngân sách thông dụng (VD: 3,000 - 5,000 yên)
  envelopeOrWrappingRule: string; // Quy tắc phong bì Noshi & nơ Mizuhiki
  culturalDeepDive: {
    reciprocityLaw?: string; // Quy luật có qua có lại (Han-gaeshi 1/2 hoặc 1/3 giá trị)
    tabooItemsOrNumbers: string[]; // Những vật phẩm hoặc con số cấm kỵ (4, 9, dao kéo, khăn tay trắng...)
    whyNeverOpenInFront: string; // Vì sao người Nhật không bao giờ xé quà trước mặt người tặng
    omotenashiPhilosophy: string; // Tinh thần hiếu khách vô điều kiện Omotenashi
    spiritualMeaning?: string;
    historicalStory?: string;
  };
  recommendedGreetings: {
    japanese: string;
    reading: string;
    meaning: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 6. Ranh Giới Uchi - Soto & Kính Ngữ Phân Tầng
export interface UchiSotoItem {
  id: string;
  contextTitle: string; // Tình huống phân định ranh giới (VD: Giới thiệu sếp với khách, Nói về bố mẹ với bạn bè)
  speakerRole: string; // Vai người nói
  targetPerson: string; // Đối tượng được nhắc tới
  relationType: 'Uchi (Người phe mình - gia đình, công ty)' | 'Soto (Người phe ngoài - khách hàng, đối tác)';
  correctKeigoSentence: string; // Câu dùng chuẩn mực
  reading: string;
  meaning: string;
  commonMistakeSentence: string; // Lỗi sai người nước ngoài hay mắc (VD: Dùng -san/shacho cho sếp mình)
  mistakeExplanation: string;
  culturalDeepDive: {
    psychologicalBoundary: string; // Ranh giới tâm lý Trong - Ngoài
    historicalOrigin: string; // Nguồn gốc gia tộc Nhật Bản (Ie 制度)
    keigoRuleSummary: string; // Quy tắc vàng khi dùng Khiêm nhường ngữ
    damageControlTip: string; // Mẹo cứu nguy khi lỡ dùng sai kính ngữ
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 7. Tinh Thần Võ Sĩ Đạo Bushido & Triết Lý Gaman / Kaizen
export interface BushidoGamanItem {
  id: string;
  philosophicalConcept: string; // Khái niệm triết lý (VD: 我慢, 改善, もったいない, 七転び八起き, 切磋琢磨)
  reading: string;
  sinoVietnamese: string;
  definition: string;
  samuraiCodeOrigin: string; // Cội nguồn Võ sĩ đạo Bushido hoặc Thiền tông
  modernApplication: string; // Cách ứng dụng trong công sở và đời sống hiện đại
  culturalDeepDive: {
    historicalContext: string; // Bối cảnh thời Chiến quốc hoặc Edo
    japaneseEndurancePsychology: string; // Tâm lý học nhẫn nại của người Nhật
    mottainaiPhilosophy: string; // Triết lý trân quý không lãng phí
    goldenActionGuide: string; // Lời khuyên hành động chuẩn mực
  };
  samplePhrase: {
    japanese: string;
    reading: string;
    meaning: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 8. Văn Hóa Nhà Tắm Công Cộng Sento & Suối Nước Nóng Onsen
export interface OnsenSentoItem {
  id: string;
  ruleTitle: string; // Tên quy tắc (VD: Tắm sạch trước khi ngâm, Không nhúng khăn, Quy tắc hình xăm)
  japaneseTerm: string;
  reading: string;
  meaning: string;
  severity: 'Quy tắc bắt buộc tối thượng' | 'Nghi thức thanh tẩy' | 'Trải nghiệm phong cách';
  sevenStepFlowNumber: number; // Bước số mấy trong quy trình 7 bước
  culturalDeepDive: {
    hadakaNoTsukiaiMeaning: string; // Ý nghĩa "Giao lưu trần trụi không khoảng cách"
    shintoPurificationRoots: string; // Nguồn gốc nghi thức tẩy trần Misogi trong Thần đạo
    tattooCultureControversy: string; // Nguồn gốc kiêng kỵ hình xăm (Yakuza vs Quốc tế)
    mineralBenefitsGuide: string; // Công dụng khoáng chất và phong cách uống sữa sau tắm
  };
  practicalDialogue: {
    situation: string;
    line: string;
    reading: string;
    meaning: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 9. Văn Hóa Otaku, Oshi-katsu & Ngôn Ngữ Subculture
export interface OtakuSubcultureItem {
  id: string;
  subcultureTerm: string; // Thuật ngữ (VD: 推し活, 聖地巡礼, 尊い, 沼, ガチ恋, 同人)
  reading: string;
  sinoVietnamese?: string;
  meaning?: string;
  definition?: string;
  originCommunity: 'Idol / J-Pop' | 'Anime / Manga' | 'Game / VTuber' | 'Cosplay / Comiket';
  animeVsRealLifeWarning: string; // Cảnh báo: Từ này trong anime ngầu nhưng nói ngoài đời thì cấm kỵ/kỳ quặc!
  culturalDeepDive: {
    ibashoPsychology: string; // Tâm lý tìm kiếm "Chốn dung thân an toàn" (Ibasho) của thanh thiếu niên
    economicImpact: string; // Tác động kinh tế quy mô hàng ngàn tỷ yên
    sacredPilgrimageCustom: string; // Tập quán hành hương về bối cảnh đời thực (Seichi Junrei)
    safeUsageInModernJapan: string; // Cách dùng tự nhiên, thời thượng mà không bị coi là quái dị
  };
  sampleDialogue: {
    speakerA: string;
    lineA: string;
    speakerB: string;
    lineB: string;
    interpretation: string;
    reading?: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 10. Văn Hóa Điềm Lành Engimono, Quái Vật Yokai & Kiêng Kỵ Dân Gian
export interface EngimonoYokaiItem {
  id: string;
  symbolName: string; // Tên vật phẩm / Điềm lành / Yokai (VD: 達磨 Daruma, 招き猫 Maneki-neko, 破魔矢 Hamaya, 厄年 Yakudoshi, 河草 Kappa)
  reading: string;
  sinoVietnamese?: string;
  meaning?: string;
  definition?: string;
  category: 'Vật phẩm cầu may (Engimono)' | 'Kiêng kỵ dân gian (Meishin)' | 'Quái vật truyền thuyết (Yokai)';
  luckAttribute: 'Chiêu tài đỗ đạt' | 'Hút khách buôn may' | 'Trừ tà xua đuổi rủi ro' | 'Cảnh báo giáo dục nhân cách';
  culturalDeepDive: {
    legendaryStory: string; // Điển tích truyền thuyết cổ xưa
    ritualInstructions: string; // Cách thực hiện nghi thức chuẩn (VD: vẽ mắt Daruma)
    superstitionReasoning: string; // Lý do người Nhật kiêng kỵ (VD: cắt móng tay ban đêm)
    whereToFindInJapan: string; // Địa danh đền chùa nổi tiếng gắn liền với biểu tượng
  };
  sampleContext: {
    sentence: string;
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

// 11. ĐỊA LÝ & LỊCH SỬ NHẬT BẢN (Topics 1 & 2)
export interface GeographyHistoryItem {
  id: string;
  title: string; // Tên chủ đề (VD: Vùng Kansai & Cố đô Kyoto, Núi Phú Sĩ & Vành đai lửa, Thời kỳ Sengoku & 3 vị anh hùng)
  topicType: 'Địa lý' | 'Lịch sử';
  japaneseTerm: string;
  reading: string;
  sinoVietnamese?: string;
  summary: string;
  geographicalOrHistoricalContext: string; // Bối cảnh địa lý hoặc niên đại lịch sử
  culturalDeepDive: {
    historicalSignificance: string; // Ý nghĩa lịch sử / địa văn hóa
    keyFiguresOrLocations: string[]; // Nhân vật tiêu biểu hoặc địa danh nổi tiếng
    interestingFacts: string; // Sự thật thú vị ít người biết
    languageConnection: string; // Mối liên hệ với ngôn ngữ / phương ngữ / tục ngữ
  };
  samplePhrase: {
    japanese: string;
    reading: string;
    meaning: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 12. QUAN HỆ NHẬT - VIỆT & VĂN HÓA DOANH NGHIỆP (Topics 6 & 7)
export interface JapanVietnamBusinessItem {
  id: string;
  title: string; // Tên chủ đề (VD: Châu Ấn Thuyền & Phố người Nhật Hội An, Bác sĩ Asaba & Phan Bội Châu, Văn hóa Ho-Ren-So & Ringisho)
  topicType: 'Quan hệ Nhật Bản - Việt Nam' | 'Doanh nghiệp Nhật Bản';
  japaneseTerm: string;
  reading: string;
  summary: string;
  corporateOrDiplomaticRole: string; // Vai trò ngoại giao hoặc nguyên tắc doanh nghiệp
  culturalDeepDive: {
    historicalOrManagementRoots?: string; // Cội nguồn lịch sử bang giao hoặc triết lý quản trị
    historicalSignificance?: string; // Ý nghĩa lịch sử bang giao
    bilateralConnectionOrBusinessRule: string; // Mối liên kết Nhật - Việt hoặc quy tắc ứng xử công sở
    commonPitfalls: string; // Những hiểu lầm người Việt hay gặp phải
    goldenSuccessAdvice: string; // Lời khuyên vàng để thành công trong hợp tác / làm việc
  };
  businessPhrase: {
    japanese: string;
    reading: string;
    meaning: string;
    businessContext: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 13. VĂN HÓA NGHỆ THUẬT & NGÔN NGỮ HỌC (Topics 4 & 5)
export interface ArtsLinguisticsItem {
  id: string;
  title: string; // Tên chủ đề (VD: Thơ Haiku Matsuo Basho, Kiến trúc Lâu đài Tenshukaku, Phương ngữ Kansai-ben vs Kanto, Từ mượn Wasei-Eigo)
  topicType: 'Văn hóa - nghệ thuật' | 'Tiếng Nhật';
  artOrLanguageField: 'Văn học' | 'Kiến trúc' | 'Anime & Manga' | 'Âm nhạc & Nghệ thuật biểu diễn' | 'Phương ngữ & Ngôn ngữ học';
  japaneseTerm: string;
  reading: string;
  summary: string;
  culturalDeepDive: {
    artisticAestheticOrOrigin: string; // Mỹ học nghệ thuật hoặc nguồn gốc ngôn ngữ
    masterpiecesOrFamousExamples: string[]; // Tác phẩm kinh điển hoặc ví dụ điển hình
    modernInfluence: string; // Tầm ảnh hưởng trong văn hóa đại chúng hiện đại
    studyGuideForLearners: string; // Bí quyết để người học tiếp thu và thưởng thức
  };
  sampleArtOrDialectText: {
    originalText: string;
    reading: string;
    standardJapaneseOrMeaning: string;
    vietnameseTranslation: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 14. KINH TẾ CÔNG NGHIỆP & THỂ THAO TINH THẦN (Topics 9 & 10)
export interface EconomySportsItem {
  id: string;
  title: string; // Tên chủ đề (VD: Kỳ tích Tàu Shinkansen & Công nghiệp Đường sắt, Bóng chày Koshien rực lửa mùa hè, Võ đạo Sumo & Nghi thức Thần đạo)
  topicType: 'Kinh tế và Công nghiệp' | 'Thể thao';
  japaneseTerm: string;
  reading: string;
  summary: string;
  industryOrSportDomain: string; // Lĩnh vực công nghiệp hoặc bộ môn thể thao
  culturalDeepDive: {
    developmentStoryOrSpirit: string; // Câu chuyện phát triển hoặc tinh thần thể thao
    economicImpactOrNationalPassion: string; // Tác động kinh tế hoặc niềm đam mê quốc dân
    uniqueJapaneseAspects: string; // Những nét độc đáo chỉ có tại Nhật Bản
    practicalTakeaway: string; // Bài học đúc kết cho người học
  };
  samplePhraseOrChant: {
    japanese: string;
    reading: string;
    meaning: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 15. XÃ HỘI ĐƯƠNG ĐẠI & PHONG TỤC TẬP QUÁN TRUYỀN THỐNG (Topics 3 & 8)
export interface SocietyTraditionsItem {
  id: string;
  title: string; // Tên chủ đề (VD: Dân số già hóa & Xã hội Siêu lão hóa, Lễ trưởng thành Seijin no Hi, Phong tục trà đạo Chado)
  topicType: 'Xã hội' | 'Văn hóa Nhật Bản';
  japaneseTerm: string;
  reading: string;
  summary: string;
  socialChallengeOrRitualStage: string; // Thách thức xã hội hoặc nghi lễ vòng đời
  culturalDeepDive: {
    socialImpactOrSpiritualMeaning: string; // Tác động xã hội học hoặc ý nghĩa tâm linh truyền thống
    historicalContinuity: string; // Sự tiếp nối từ quá khứ đến đời sống đương đại
    contrastWithVietnamOrWest: string; // So sánh với văn hóa Việt Nam hoặc phương Tây
    actionGuideForForeigners: string; // Cẩm nang ứng xử cho người nước ngoài sinh sống tại Nhật
  };
  sampleDialogueOrPhrase: {
    japanese: string;
    reading: string;
    meaning: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 16. NGŨ THỂ THƯ ĐẠO & TRIẾT LÝ NÉT CHỮ HÁN (書道五体 & 漢字の成り立ち)
export interface ShodoKanjiPhilosophyItem {
  id: string;
  title: string; // Tên chữ Hán / Khái niệm thư đạo (VD: "Vĩnh" Cửu Chi Pháp - 8 nét cơ bản, Triện thư sang Khải thư)
  targetKanji: string;
  reading: string;
  sinoVietnamese: string;
  shodoStyle: 'Triện thư (篆書)' | 'Lệ thư (隷書)' | 'Khải thư (楷書)' | 'Hành thư (行書)' | 'Thảo thư (草書)';
  rikukouCategory:
    | 'Tượng hình (象形)'
    | 'Chỉ sự (指事)'
    | 'Hội ý (会意)'
    | 'Hình thanh (形声)'
    | 'Chuyển chú (転注)'
    | 'Giả tá (仮借)'
    | 'Hội ý (会意) kiêm Hình thanh'
    | 'Hình thanh (形声) kiêm Hội ý'
    | string;
  etymologyStory: string; // Nguồn gốc Giáp cốt văn / Kim văn / Hán tự học
  brushPhilosophy: string; // Triết lý nét bút, lực ấn, điểm dừng và khoảng trống Yohaku
  culturalDeepDive: {
    historicalCalligrapher: string; // Danh gia thư pháp (Vương Hy Chi, Hoằng Pháp Đại Sư Kukai, v.v.)
    aestheticSpiritualMeaning: string; // Ý nghĩa tâm linh "Thư như kỳ nhân" (Nét chữ nết người)
    jlptMasteryAdvice: string; // Bí quyết ghi nhớ mặt chữ cho đề thi N2-N1
    modernGraphicDesignConnection: string; // Ứng dụng trong thư pháp hiện đại, logo thương hiệu Nhật
  };
  samplePhrase: {
    japanese: string;
    reading: string;
    meaning: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 17. MA TRẬN KÍNH NGỮ 5 BẬC & TÂM LÝ HỌC THỨ BẬC (敬語マトリックス & 5段階上下関係)
export interface KeigoMatrix5Item {
  id: string;
  verbBase: string; // Động từ gốc (VD: 行く/来る, 言う, 食べる/飲む, 知る, する)
  reading: string;
  sinoVietnamese?: string;
  meaning: string;
  sonkeigo: string; // Tôn kính ngữ (Nâng đối phương lên)
  kenjougo1: string; // Khiêm nhường ngữ 1 (Hạ mình hướng đến đối phương)
  kenjougo2Teichougo: string; // Khiêm nhường ngữ 2 / Đinh trọng ngữ (Hạ mình trước người nghe)
  teineigo: string; // Lịch sự thông thường
  bikago: string; // Mỹ từ (Làm đẹp từ ngữ)
  baitoKeigoTrap: string; // Bẫy kính ngữ lạm dụng kiểu quán ăn/cửa hàng tiện lợi cần tránh
  culturalDeepDive: {
    tateShakaiOrigin: string; // Nguồn gốc "Xã hội dọc" (Tate-shakai - Nakane Chie)
    kushonKotobaPair: string; // Cặp từ đệm làm mềm lời nói (Kushon-kotoba) đi kèm
    crisisAvoidanceTip: string; // Mẹo cứu nguy ngoại giao công sở khi lỡ nói sai
    executiveMeetingExample: string; // Ví dụ trong phòng họp hội đồng quản trị
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 18. BÁCH KHOA THÀNH NGỮ LỊCH SỬ & ĐIỂN TÍCH NGỤ NGÔN (故事成語 & 歴史説話)
export interface KojiSeigoMasteryItem {
  id: string;
  idiom: string; // Thành ngữ 4 chữ / ngụ ngôn (VD: 臥薪嘗胆, 塞翁が馬, 三顧の礼, 矛盾, 呉越同舟)
  reading: string;
  sinoVietnamese: string;
  literalMeaning: string; // Nghĩa đen bề mặt
  philosophicalMeaning: string; // Nghĩa bóng triết lý xử thế
  historicalOriginStory: string; // Câu chuyện điển tích lịch sử thời Chiến Quốc / Hán Sở / Heian
  culturalDeepDive: {
    philosophicalSchool:
      | 'Nho giáo'
      | 'Lão Trang / Đạo giáo'
      | 'Binh pháp Tôn Tử'
      | 'Thiền tông / Phật giáo'
      | 'Pháp gia / Hàn Phi Tử'
      | 'Thiền tông / Mỹ học'
      | string;
    modernBusinessStrategy: string; // Ứng dụng trong chiến lược kinh doanh và thương thuyết hiện đại
    jlptN1Frequency: string; // Tần suất xuất hiện trong đề thi N1 và bài xã luận Asahi Shimbun (Tensei Jingo)
    comparativeIdiom: string; // Thành ngữ tương đương trong tiếng Việt
  };
  sampleUsage: {
    japanese: string;
    reading: string;
    meaning: string;
    context: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 19. NGÔN NGỮ HỌC CẢM XÚC: TỪ NGỮ RUNG ĐỘNG & MỸ CẢM NHẬT BẢN (感性日本語 & 雅びのことば)
export interface KanseiKotobaItem {
  id: string;
  uniqueWord: string; // Từ ngữ độc nhất (VD: 木漏れ日 Komorebi, 懐かしい Natsukashii, 切ない Setsunai, 生きがい Ikigai, 幽玄 Yugen)
  reading: string;
  sinoVietnamese?: string;
  untranslatableEssence: string; // Tinh hoa không thể dịch thoát ý sang tiếng Anh/Việt
  psychologicalResonance: string; // Sự cộng hưởng tâm lý học cảm xúc
  culturalDeepDive: {
    natureHarmonyRoots: string; // Cội nguồn gắn bó giao hòa với thiên nhiên của người Nhật
    literaryQuotations: string; // Trích dẫn thơ ca cổ hoặc văn chương Murakami Haruki
    whenToUseWhenToStaySilent: string; // Thời điểm nên nói ra vs Thời điểm nên giữ im lặng để cảm nhận
    dailyMindfulnessPractice: string; // Cách ứng dụng như một bài thực hành chánh niệm (Mindfulness)
  };
  poeticContext: {
    japaneseSentence: string;
    reading: string;
    translation: string;
    artisticMood: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 20. ĐỐI CHIẾU CẶP TỪ ĐỒNG ÂM DỊ NGHĨA & BẪY CHỮ HÁN DỄ NHẦM (同音異義語 & 漢字トラップ)
export interface DouonIgigoItem {
  id: string;
  soundHiragana: string; // Âm đọc chung (VD: おさめる, つくる, かえる, はかる, とめる)
  romaji: string;
  confusingPairs: {
    kanji: string;
    sinoVietnamese: string;
    coreMeaning: string;
    nuanceDistinction: string; // Sắc thái phân biệt cốt lõi
    typicalCollocations: string[]; // Cụm từ thường đi cùng (VD: 利益を収める vs 税金を納める)
  }[];
  culturalDeepDive: {
    etymologyWhySameSound: string; // Vì sao cùng một âm đọc lại chia ra nhiều chữ Hán khác nhau
    jlptExamPitfallAnalysis: string; // Bóc tách cách ra đề bẫy của Hội đồng thi JLPT
    visualMnemonics: string; // Mẹo nhớ hình ảnh qua bộ thủ
    quickDecisionRule: string; // Nguyên tắc quyết định trong 3 giây khi làm bài thi
  };
  sampleQuizInContext: {
    sentenceWithBlank: string;
    reading: string;
    correctKanji: string;
    translation: string;
    distractors: string[];
    explanation: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}
