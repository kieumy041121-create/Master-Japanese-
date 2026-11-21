// Types for Division: Edutainment & Chơi Mà Học (Học Tiếng Nhật & Văn Hóa Qua Giải Trí)

export interface DajareWordplayItem {
  id: string;
  punTitle: string; // Tên câu chơi chữ (VD: パンダのパン, アルミ缶の上にあるみかん)
  japanesePunchline: string;
  reading: string;
  translation: string;
  humorMechanism: string; // Cơ chế gây cười: đồng âm, tách âm hay lặp âm
  samuiLevel: 1 | 2 | 3 | 4 | 5; // Độ "lạnh" của câu đùa (Oyaji Gag / Samui Gyagu)
  linguisticDepth: {
    homophonePair: string; // Cặp từ đồng âm (VD: アルミ缶 [Aluminium can] vs あるみかん [Có quả quýt])
    moraSyllableBreakdown: string; // Phân tích nhịp âm tiết Mora trong ngữ âm học tiếng Nhật
    jlptGrammarOrVocabPoint: string; // Điểm ngữ pháp / từ vựng JLPT liên hệ
  };
  culturalDeepDive: {
    rakugoManzaiOrigin: string; // Cội nguồn tấu hài độc thoại Rakugo hoặc đối đáp Manzai
    howJapaneseReact: string; // Người Nhật sẽ phản ứng thế nào (Cười tủm tỉm, thở dài hay nói "Samui!")
    conversationalUsageAdvice: string; // Lời khuyên khi dùng trong tiệc rượu Nomikai hoặc với bạn bè
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface AnimeLingoDecoderItem {
  id: string;
  tropeName: string; // Tên mô-típ (VD: Tsundere, Chuunibyou, Shonen Protagonist, Senpai, Isekai)
  iconicQuote: string; // Câu thoại kinh điển (VD: 別にアンタのためじゃないんだからね！, 我が右腕の黒炎が疼く...)
  reading: string;
  characterRoleType: string; // Kiểu nhân vật
  translation: string;
  yakuwarigoAnalysis: string; // Ngôn ngữ vai vế Yakuwarigo (Vĩ tố nanoda, de gozaru, wa, ze; đại từ ore, boku, sessha)
  linguisticDepth: {
    grammarQuirk: string; // Ngữ pháp dị biệt so với tiếng Nhật chuẩn (Kyougigo)
    realLifeDangerLevel: 'Tuyệt đối không dùng ngoài đời' | 'Chỉ dùng để đùa với bạn thân' | 'Dùng được tự nhiên';
    realLifeEquivalent: string; // Cách nói tự nhiên lịch sự ngoài đời thực thay thế
  };
  culturalDeepDive: {
    tropeOrigin?: string; // Nguồn gốc mô-típ
    animeHistoryContext?: string; // Lịch sử hình thành mô-típ trong manga/anime từ thời Showa đến nay
    psychologicalArchetype: string; // Tâm lý học đằng sau hình tượng nhân vật
    voiceActorNuance: string; // Sắc thái biểu cảm của Seiyuu (Diễn viên lồng tiếng)
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface NazonazoRiddleItem {
  id: string;
  riddleTitle: string; // Tên câu đố
  riddleQuestion: string; // Câu đố tiếng Nhật
  reading: string;
  riddleHint: string; // Gợi ý tư duy
  answer: string; // Đáp án
  answerReading: string;
  explanationOfWordplay: string; // Giải mã bí mật chiết tự / chơi chữ
  tonchiType: 'Chiết tự chữ Hán (漢字)' | 'Đồng âm khác nghĩa (同音)' | 'Đố mẹo tình huống (とんち)';
  culturalDeepDive: {
    ikkyuSanTonchiHeritage: string; // Cội nguồn văn hóa Tonchi từ thiền sư Ikkyu (Nhất Hưu)
    japaneseQuizShowCulture: string; // Văn hóa Quiz Show truyền hình Nhật (Todaiou, Nep League)
    brainFlexBenefit: string; // Lợi ích rèn luyện phản xạ ngôn ngữ não bộ cho người học
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface GenZSlangItem {
  id: string;
  slangWord: string; // Từ lóng (VD: 草 kusa, それな sorena, ぴえん pien, 蛙化現象, チルい, りょ)
  reading: string;
  romajiOrOrigin: string;
  meaning: string;
  vibeCategory: 'Mạng xã hội & Chat' | 'Cảm xúc & Tâm trạng' | 'Tình cảm & Hẹn hò' | 'Đời sống học đường';
  sampleChat: {
    userA: string;
    userB: string;
    translation: string;
  };
  linguisticDepth: {
    abbreviationRule: string; // Quy luật rút gọn / biến âm của giới trẻ (Gyaru-go, Wasei-eigo)
    dangerOfMisuse: string; // Bẫy nguy hiểm nếu dùng với cấp trên / người lớn tuổi
    jlptCounterpart: string; // Từ vựng / ngữ pháp chuẩn trang trọng tương ứng
  };
  culturalDeepDive: {
    generationEvolution: string; // Sự dịch chuyển từ thời Shibuya Gyaru thập niên 90 sang TikTok Gen Z
    sociologicalInsight: string; // Bối cảnh tâm lý xã hội (nỗi sợ bị phán xét, khao khát đồng cảm nhanh)
    trendLifetimeNotice: string; // Lưu ý về tuổi thọ của từ lóng thời thượng
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface RomComDramaItem {
  id: string;
  situationTitle: string; // Tình huống (VD: Lời tỏ tình gián tiếp Dưới ánh trăng, Tình huống Kabedon, Buổi chia tay ở sân ga)
  dialogueJapanese: string;
  reading: string;
  translation: string;
  munekyunScore: 1 | 2 | 3 | 4 | 5; // Điểm số "rung động tim" (胸キュン度)
  linguisticDepth: {
    indirectExpressionTechnique: string; // Kỹ thuật nói gián tiếp tinh tế (nói lấp lửng ~kedo, ~tari shite)
    toneAndVibeAdvice: string; // Ngữ điệu dịu dàng (Amae) và khoảng lặng cảm xúc
    realLifeSuitability: string; // Mức độ phù hợp ngoài đời thực
  };
  culturalDeepDive: {
    natsumeSosekiLegacy: string; // Điển tích "Mặt trăng đêm nay đẹp quá" (Tsuki ga kirei desu ne) của Natsume Soseki
    kokuhakuCulture: string; // Văn hóa tỏ tình (Kokuhaku) chính thức trước khi hẹn hò của người Nhật
    hazukashisaAndEnryo: string; // Tâm lý e thẹn Hazukashisa và giữ ý Enryo trong tình yêu
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 6. SHIRITORI ĐẤU TRÍ & ĐẢO ÂM TỪ VỰNG (しりとり & 言葉の連鎖バトル)
export interface ShiritoriWordChainItem {
  id: string;
  chainTitle: string; // Tên chuỗi từ (VD: Chuỗi hiểm chữ Ru る, Chuỗi đảo ngược Kaibun, Chuỗi động vật)
  startWord: {
    kanji: string;
    reading: string;
    meaning: string;
    lastMora: string; // Âm đuôi để nối tiếp
  };
  connectedWord: {
    kanji: string;
    reading: string;
    meaning: string;
    firstMora: string;
    lastMora: string;
  };
  killerWordTip: string; // Từ "đòn kết liễu" ép đối phương vào thế bí (VD: chữ る, ぬ, ぢ)
  trapNotice: string; // Cảnh báo bẫy chữ "ん" (N) thua cuộc ngay lập tức
  linguisticDepth: {
    moraPhoneticsRule: string; // Quy luật ngữ âm: trường âm, chữ nhỏ ゃ/ゅ/ょ, âm ngắt っ
    kanjiMnemonic: string; // Mẹo nhớ Hán tự qua cặp từ nối
    jlptLevelRange: string; // Cấp độ từ vựng N3-N1
  };
  culturalDeepDive: {
    heianDynastyOrigin: string; // Nguồn gốc trò chơi từ thời Heian trong cung đình quý tộc
    trainTravelTradition: string; // Văn hóa chơi Shiritori trên tàu điện Shinkansen và dã ngoại gia đình
    proCompetitiveShiritori: string; // Giải đấu Shiritori chuyên nghiệp có đồng hồ bấm giờ tại Tokyo
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 7. J-POP LYRICAL POETRY & ẨN DỤ CA TỪ (J-POPの歌詞の美学 & 隠された比喩)
export interface JPopLyricalPoetryItem {
  id: string;
  songTitle: string; // Tên bài hát & nghệ sĩ (VD: Lemon - Kenshi Yonezu, Idol - YOASOBI, Pretender - Official HIGE DANdism)
  artistName: string;
  iconicLyricExcerpt: string; // Đoạn ca từ bất hủ
  reading: string;
  translation: string;
  metaphorTheme: string; // Chủ đề ẩn dụ (Nỗi mất mát, Sự giả dối của idol, Tình đơn phương tuyệt vọng)
  linguisticDepth: {
    poeticGrammarAnalysis: string; // Phân tích ngữ pháp thi ca, gieo vần Rhyme và đảo ngữ
    rhetoricalDevice: string; // Biện pháp tu từ: Ẩn dụ (Hiyu), Nhân hóa (Ginjin-hou), Điệp âm
    everydayVsPoeticContrast: string; // So sánh cách nói thường nhật vs Lời ca bay bổng
  };
  culturalDeepDive: {
    modernJapaneseMindset: string; // Tâm thức người Nhật đương đại phản chiếu qua ca từ
    seasonalAndNatureMotifs: string; // Hình ảnh bốn mùa và thiên nhiên trong âm nhạc
    billboardJapanImpact: string; // Tác động văn hóa và kỷ lục phát trực tuyến
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 8. KARAOKE ETIQUETTE & TIẾNG NHẬT PHÒNG HÁT (カラオケ文化 & 盛り上げ日本語)
export interface KaraokeCultureItem {
  id: string;
  karaokeScenario: string; // Tình huống (Hò reo cổ vũ Ainomote, Bấm chọn bài, Nhường sếp hát bài tủ, Khen giọng hát)
  keyPhrase: string; // Khẩu lệnh / Câu nói vàng
  reading: string;
  translation: string;
  hypeEnergyLevel: 'Hò reo bùng nổ (100%)' | 'Lịch thiệp công sở' | 'Thả thính ngọt ngào' | 'Cứu nguy không khí';
  linguisticDepth: {
    callAndResponseGrammar: string; // Ngữ pháp đối đáp tung hứng nhanh trong phòng hát
    flatteryComplimentTech: string; // Kỹ thuật khen ngợi tự nhiên không bị coi là nịnh hót
    karaokeLingoGlossary: string; // Thuật ngữ chuyên ngành máy hát (Sabiko, Sabimora, DAM, Joysound)
  };
  culturalDeepDive: {
    kobeOriginStory: string; // Cội nguồn Karaoke phát minh tại Kobe năm 1971 bởi Inoue Daisuke
    unspokenRulesOfNomikai: string; // Quy tắc ngầm sống còn khi đi Karaoke cùng đồng nghiệp và đối tác
    stressReleasePsychology: string; // Tâm lý học giải tỏa căng thẳng (Hassan) của dân công sở Nhật
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 9. GAMING & ESPORTS JAPANESE LINGO (Ngôn Ngữ Game Thủ & Chiến Thuật Esports)
export interface GamingEsportsLingoItem {
  id: string;
  gamerTerm: string; // Thuật ngữ (VD: 凸る Totsuru, 沼る Numaru, 芋る Imoru, 煽り Aori, 神プ Kamipu, キャリー Carry)
  reading: string;
  originAndGrammarType: string; // Loại từ & nguồn gốc (Động từ hóa từ danh từ, từ ngoại lai rút gọn)
  meaningInGame: string; // Nghĩa trong game
  realWorldMetaphor: string; // Cách ứng dụng ẩn dụ vào đời sống thực tế
  gameGenre: 'FPS / Bắn súng' | 'MOBA / Chiến thuật' | 'Gacha / RPG' | 'Đối kháng Fighting';
  sampleGamerDialogue: {
    player1: string;
    player2: string;
    translation: string;
  };
  linguisticDepth: {
    verbificationRule: string; // Quy tắc biến danh từ game thành động từ nhóm 1 đuôi "-ru"
    voiceChatShortcuts: string; // Cách rút gọn mệnh lệnh voice chat khi giao tranh 0.1 giây
    dangerInPoliteContext: string; // Cảnh báo nguy hiểm nếu dùng nhầm trong môi trường lịch sự
  };
  culturalDeepDive: {
    arcadeToEsportsEvolution: string; // Sự tiến hóa từ văn hóa Arcade Akihabara đến kỷ nguyên Esports toàn cầu
    streamerCommunityCulture: string; // Văn hóa cộng đồng streamer Twitch / YouTube Gaming Nhật
    teamworkAndEtiquette: string; // Tinh thần fair-play và quy tắc lịch thiệp trong game online Nhật
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 10. TIẾNG HÉT TUYỆT KỸ SHONEN & CHIẾN LƯỢC BATTLE (必殺技の名前の美学 & バトル日本語)
export interface HissatsuwazaBattleItem {
  id: string;
  moveName: string; // Tên chiêu thức (VD: 螺旋丸 Rasengan, かめはめ波 Kamehameha, 日の呼吸 Hinokami, 月牙天衝 Getsuga Tensho)
  kanjiWithFurigana: string; // Chữ Hán kèm Furigana
  seriesAndUser: string; // Tác phẩm & Nhân vật thi triển
  translation: string; // Bản dịch Hán-Việt & nghĩa uy lực
  linguisticDepth: {
    kanjiCompositionAesthetics: string; // Mỹ học kết hợp 3-4 chữ Hán tạo cảm giác uy lực sấm sét
    atejiTechnique: string; // Kỹ thuật Ateji: Viết chữ Hán cổ nhưng đọc Furigana bằng tiếng Anh/Đức
    battleCryPhonetics: string; // Ngữ âm học của tiếng hét chiến đấu (nguyên âm mở A, O kích phát nội lực)
  };
  culturalDeepDive: {
    samuraiKendoRoots: string; // Cội nguồn từ kiếm đạo Kendo, thuật Ninja và Mật tông Phật giáo
    weeklyJumpNamingRules: string; // Quy tắc đặt tên tuyệt chiêu kinh điển của ban biên tập Shonen Jump
    childhoodPretendPlay: string; // Văn hóa chơi đùa bắt chước tuyệt chiêu (Gokko-asobi) của trẻ em Nhật
  };
  sampleChant: {
    battleChant: string;
    reading: string;
    epicMeaning: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

