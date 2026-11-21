// Types for 10 New Deep Cultural Learning Features (Submodules 67-76)

export interface SadouZenPhilosophyItem {
  id: string;
  themeTitle: string; // VD: 一期一会 (Ichigo Ichie), 和敬清寂 (Wakeiseijaku)
  kanjiHeading: string;
  reading: string;
  sinoVietnamese: string;
  zenPrincipleMeaning: string;
  teaMasterLegacy: string; // Sen no Rikyu & Văn hóa Wabi-cha
  tearoomKeigoEtiquette: string; // Kính ngữ và nghi thức phòng trà (Kamiza, Nijiriguchi)
  jlptVocabularyDepth: string[]; // Từ vựng học thuật N1 liên quan
  culturalExplanation: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface NohKabukiTheatricalItem {
  id: string;
  conceptTitle: string; // VD: 幽玄 (Yugen), 序破急 (Jo-Ha-Kyu), 間 (Ma)
  kanjiHeading: string;
  reading: string;
  sinoVietnamese: string;
  theatricalEssence: string;
  stageMaskPsychology: string; // Tâm lý mặt nạ Noh và điệu bộ Mie trong Kabuki
  linguisticArchaism: string; // Ngôn ngữ thoại kịch cổ điển & từ cổ N1
  academicRelevance: string;
  culturalExplanation: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface AmaePsychologyItem {
  id: string;
  socialConcept: string; // VD: 甘え (Amae) - Tâm lý nương tựa / dung dưỡng
  kanjiHeading: string;
  reading: string;
  doiTakeoPsychologyInsight: string; // Luận điểm tâm lý học của bác sĩ tâm thần Doi Takeo
  grammarConnection: string; // Kết nối cấu trúc ~te morau, ~sasete itadaku, ~te kureru
  sociologicalImpact: string; // Ranh giới giữa thân tình và quấy rầy
  conversationalExample: {
    japanese: string;
    reading: string;
    translation: string;
    nuanceNote: string;
  };
  culturalExplanation: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface DouchouPressureItem {
  id: string;
  phenomenonTitle: string; // VD: 同調圧力 (Douchou Atsuryoku), 村八分 (Murahachibu)
  kanjiHeading: string;
  reading: string;
  sinoVietnamese: string;
  sociologicalDefinition: string; // Định nghĩa áp lực bầy đàn và nỗi sợ bị cô lập
  indirectSpeechMechanism: string; // Cơ chế nói gián tiếp, lấp lửng ~kedo để tránh va chạm
  workplaceCaseStudy: string; // Tình huống thực tế trong công ty Nhật
  psychologicalDefenseTip: string;
  culturalExplanation: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface WakaHyakuninIsshuItem {
  id: string;
  poemTitle: string; // VD: Thi phẩm số 1 của Thiên hoàng Tenji, Nữ sĩ Ono no Komachi
  poetName: string;
  poemKanaAndKanji: string; // Thể thơ Tanka 5-7-5-7-7
  reading: string;
  translation: string;
  rhetoricalDevices: {
    makurakotoba: string; // Gối từ 枕詞
    kakekotoba: string; // Từ đa nghĩa 掛詞
    kigo: string; // Từ chỉ mùa 季語 N1
  };
  poeticBackground: string;
  culturalExplanation: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface KankonsousaiRitualsItem {
  id: string;
  ceremonyType: 'Đám cưới (結婚式)' | 'Tang lễ (葬儀・告別式)' | 'Mừng thọ & Lễ hội đời người (長寿・通過儀礼)' | 'Giao tế & Phong bì';
  ritualName: string;
  kanjiHeading: string;
  reading: string;
  envelopeEtiquette: string; // Nghi thức phong bì Noshi-bukuro, Koden-bukuro, Mizuhiki
  tabooWordsImikotoba: string[]; // Từ kiêng kỵ tuyệt đối (VD: 切れる, 重ね重ね, 去る)
  formalSpeechFormulas: string; // Mẫu câu kính ngữ trang trọng nhất định phải dùng
  culturalExplanation: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface ShintoKotodamaItem {
  id: string;
  shintoBeliefConcept: string; // VD: 言霊 (Kotodama), 八百万の神 (Yaoyorozu no Kami), 禊 (Misogi)
  kanjiHeading: string;
  reading: string;
  sinoVietnamese: string;
  philosophicalCore: string; // Quan niệm linh hồn ẩn chứa trong mỗi từ ngữ phát ra
  purificationRitualInsight: string; // Nghi thức tẩy trần Harae và sự sạch sẽ tâm trí
  modernLinguisticEchoes: string; // Dấu vết Kotodama trong giao tiếp hàng ngày của người Nhật
  culturalExplanation: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface MonozukuriKintsugiItem {
  id: string;
  artisanConcept: string; // VD: 金継ぎ (Kintsugi), 職人気質 (Shokunin Kishitsu), 拘り (Kodawari)
  kanjiHeading: string;
  reading: string;
  sinoVietnamese: string;
  aestheticPhilosophy: string; // Tôn vinh vết nứt vàng và vẻ đẹp bất toàn Wabi-sabi
  shokuninMindset: string; // Tinh thần cống hiến trọn đời cho một nghề thủ công
  industrialKaizenLegacy: string; // Di sản chuyển hóa thành năng lực công nghiệp chính xác cao
  culturalExplanation: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface KaigoMindfulnessItem {
  id: string;
  elderlyCareTopic: string; // VD: 生きがい (Ikigai ở tuổi già), 介護敬語 (Kính ngữ chăm sóc y tế)
  kanjiHeading: string;
  reading: string;
  demographicInsight: string; // Xã hội siêu già hóa (Chou-koureika Shakai)
  empathyLanguageEtiquette: string; // Ngôn ngữ duy trì sự tôn nghiêm và giảm lo âu cho người già
  psychologicalWellbeing: string; // Phương pháp tâm lý học tiếp thêm động lực sống
  culturalExplanation: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface ShimaguniSaigaiItem {
  id: string;
  geopoliticalTopic: string; // VD: 島国根性 (Tư duy biển đảo), 絆 (Kizuna - Gắn kết sau thiên tai), 防災意識
  kanjiHeading: string;
  reading: string;
  geographicalDeterminism: string; // Địa lý 4 bề biển cả định hình tính cách cẩn trọng và phòng vệ
  disasterResilienceSpirit: string; // Tinh thần kiên cường tái thiết sau động đất sóng thần
  linguisticExpressionsOfCooperation: string; // Cụm từ đoàn kết và sẻ chia trong hoạn nạn
  culturalExplanation: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}
