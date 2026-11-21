import {
  SadouZenPhilosophyItem,
  NohKabukiTheatricalItem,
  AmaePsychologyItem,
  DouchouPressureItem,
  WakaHyakuninIsshuItem,
  KankonsousaiRitualsItem,
  ShintoKotodamaItem,
  MonozukuriKintsugiItem,
  KaigoMindfulnessItem,
  ShimaguniSaigaiItem,
} from '../types/culturalPart5';

// =========================================================================
// 1. TRÀ ĐẠO & MỸ HỌC THIỀN TÔNG (茶道と禅の美学)
// =========================================================================
export const initialSadouList: SadouZenPhilosophyItem[] = [
  {
    id: 'sd_1',
    themeTitle: 'Nhất Kỳ Nhất Hội & Triết lý Wabi-cha (一期一会と侘び茶)',
    kanjiHeading: '一期一会（いちごいちえ）',
    reading: 'いちごいちえ (Ichigo Ichie)',
    sinoVietnamese: 'Nhất Kỳ Nhất Hội',
    zenPrincipleMeaning: 'Mỗi một cuộc tương phùng trong cuộc đời là duy nhất, không bao giờ lặp lại y nguyên lần thứ hai. Hãy dốc trọn chân tâm tiếp đãi người trước mặt như thể đó là lần gặp gỡ sau cùng.',
    teaMasterLegacy: 'Trà thánh Sen no Rikyu (千利休) thời Chiến Quốc đã cải biến lối uống trà xa hoa của các lãnh chúa thành "Wabi-cha" - căn phòng trà nhỏ chỉ 2 manh chiếu (Nijiriguchi), cửa thấp khiến tướng quân cũng phải cúi đầu bò vào, xóa bỏ mọi đẳng cấp xã hội.',
    tearoomKeigoEtiquette: 'Khách trước khi uống phải xoay bát trà (Chawan) 2 lần theo chiều kim đồng hồ để tránh uống trực tiếp vào mặt trước (Shoumen) có hoa văn đẹp nhất, thể hiện sự khiêm nhường sâu sắc.',
    jlptVocabularyDepth: ['一期一会 (N1)', '亭主 (Teishu - Chủ nhân phòng trà)', '正客 (Shoukyaku - Khách quý chính)', '侘び寂び (Wabi-sabi)'],
    culturalExplanation: 'Không gian phòng trà là nơi rũ bỏ gươm đao và danh vọng. Lời chào "Otemae choudai itashimasu" (Xin phép được nhận bát trà tinh túy này) là chuẩn mực kính ngữ khiêm nhường tột đỉnh.',
    quiz: {
      question: 'Tại sao cửa vào phòng trà Nhật Bản truyền thống (Nijiriguchi) lại được thiết kế rất nhỏ và thấp (chỉ khoảng 60cm)?',
      options: [
        'Để bắt buộc mọi võ sĩ Samurai phải tháo kiếm để bên ngoài và cúi rạp người bò vào, bình đẳng trước chén trà',
        'Để tránh gió bão mùa đông',
        'Do người Nhật thời xưa có vóc dáng thấp bé',
        'Để tiết kiệm gỗ khi xây dựng',
      ],
      correctIndex: 0,
      explanation: 'Nijiriguchi biểu thị sự bình đẳng tuyệt đối: trước cổng trà đạo, dù là tướng quân quyền uy hay thường dân đều phải cúi mình và gác bỏ đao kiếm bên ngoài.',
    },
  },
  {
    id: 'sd_2',
    themeTitle: 'Hòa Kính Thanh Tịch - 4 Tôn chỉ Tối thượng của Trà đạo (和敬清寂)',
    kanjiHeading: '和敬清寂（わけいせいじゃく）',
    reading: 'わけいせいじゃく (Wakeiseijaku)',
    sinoVietnamese: 'Hòa Kính Thanh Tịch',
    zenPrincipleMeaning: 'Hòa (hòa hợp với vạn vật) - Kính (kính trọng lẫn nhau không phân biệt giai cấp) - Thanh (tâm hồn và dụng cụ trong sạch thuần khiết) - Tịch (sự tĩnh lặng an nhiên nơi tâm khảm).',
    teaMasterLegacy: 'Trà sư Sen no Rikyu đúc kết từ triết lý Thiền tông: Khi tâm trí tĩnh lặng (Tịch), tiếng nước sôi trong ấm sắt reo như gió thổi qua rặng thông (Matsukaze).',
    tearoomKeigoEtiquette: 'Dùng khăn lau lụa Fukusa gấp theo nghi thức thiền để lau từng mép hộp trà Natsume và muôi trúc Chashaku trong sự im lặng trang nghiêm tuyệt đối.',
    jlptVocabularyDepth: ['清浄 (Seijou - Thanh tịnh N1)', '静寂 (Seijaku - Tĩnh lặng N1)', '作法 (Sahou - Phép tắc nghi lễ)'],
    culturalExplanation: 'Wakeiseijaku là nền tảng tâm lý học hình thành nên phong cách làm việc cẩn trọng, tôn trọng quy trình và tính kỷ luật trứ danh của doanh nghiệp Nhật Bản hiện đại.',
    quiz: {
      question: 'Chữ "寂" (Tịch - Jaku) trong bốn tôn chỉ "和敬清寂" của trà đạo chỉ trạng thái tâm hồn nào?',
      options: [
        'Tâm hồn tĩnh lặng, an nhiên không bị xáo động bởi danh lợi trần tục',
        'Nỗi cô đơn buồn bã',
        'Sự im lặng đáng sợ trong bóng tối',
        'Cơn buồn ngủ khi ngồi thiền',
      ],
      correctIndex: 0,
      explanation: 'Tịch (寂) là trạng thái an nhiên tự tại, buông bỏ mọi toan tính vị kỷ để hòa mình vào giây phút hiện tại.',
    },
  },
];

export const extraSadouList: SadouZenPhilosophyItem[] = [
  {
    id: 'sd_3',
    themeTitle: 'Độc Tọa Quan Niệm - Sự tĩnh lặng sau khi khách rời gót (独座観念)',
    kanjiHeading: '独座観念（どくざかんねん）',
    reading: 'どくざかんねん (Dokuza Kannen)',
    sinoVietnamese: 'Độc Tọa Quan Niệm',
    zenPrincipleMeaning: 'Sau khi khách đã rời khỏi phòng trà, người chủ không vội dọn dẹp mà ngồi lại một mình trong tĩnh lặng, lắng nghe tiếng vọng của cuộc hội ngộ vừa qua.',
    teaMasterLegacy: 'Trà sư Ii Naosuke (tác giả cuốn Trà đạo Nhất Tích) nhấn mạnh: việc ngồi lại một mình thể hiện sự trân trọng dư âm tình cảm, tránh hành động xua đuổi vội vàng.',
    tearoomKeigoEtiquette: 'Đứng tiễn khách ở cửa Nijiriguchi cho đến khi bóng khách khuất hẳn khỏi rặng trúc trong vườn Roji mới từ từ khép cánh cửa gỗ lại.',
    jlptVocabularyDepth: ['余韻 (Yoin - Dư âm, cảm xúc đọng lại N1)', '一服 (Ippuku - Một tuần trà)'],
    culturalExplanation: 'Văn hóa tiễn khách của người Nhật ngày nay (đứng cúi chào ở sảnh thang máy cho đến khi cửa đóng kín) chính là sự kế thừa trực tiếp từ Độc tọa quan niệm.',
    quiz: {
      question: 'Hành vi nào trong văn hóa công sở Nhật Bản ngày nay kế thừa từ tinh thần "Độc tọa quan niệm" trà đạo?',
      options: [
        'Đứng cúi đầu chào tiễn đối tác ở cửa thang máy cho đến khi cửa khép kín hoàn toàn',
        'Mời đối tác đi ăn nhậu sau giờ làm',
        'Gửi danh thiếp bằng hai tay',
        'Viết báo cáo Ho-Ren-So hàng ngày',
      ],
      correctIndex: 0,
      explanation: 'Hành động kiên nhẫn tiễn khách đến giây phút cuối cùng thể hiện sự trân trọng và lưu giữ dư âm cuộc gặp gỡ.',
    },
  },
];

// =========================================================================
// 2. KỊCH NGHỆ NOH & KABUKI (能・歌舞伎の美学)
// =========================================================================
export const initialNohKabukiList: NohKabukiTheatricalItem[] = [
  {
    id: 'nk_1',
    conceptTitle: 'Mỹ học U Huyền - Ánh sáng mờ ảo và Vẻ đẹp thăm thẳm (幽玄の美)',
    kanjiHeading: '幽玄（ゆうげん）',
    reading: 'ゆうげん (Yugen)',
    sinoVietnamese: 'U Huyền',
    theatricalEssence: 'Vẻ đẹp không phơi bày lộ liễu mà ẩn giấu sau màn sương mờ ảo, gợi mở trí tưởng tượng vô bờ của khán giả. Đỉnh cao thẩm mỹ kịch Noh của bậc thầy Zeami.',
    stageMaskPsychology: 'Mặt nạ Noh (Noh-men) được gọt đẽo vô cảm (Chuusei). Nhưng khi diễn viên ngẩng đầu đón ánh sáng (Teru) mặt nạ như đang mỉm cười, khi cúi đầu xuống (Kumoru) mặt nạ lại u sầu bi thương.',
    linguisticArchaism: 'Sử dụng thể thơ văn ngâm cổ đại thời Muromachi với nhịp điệu 7-5 cổ điển và các từ Hán tự mang sắc thái triết học hư vô.',
    academicRelevance: 'JLPT N1 Văn học & Mỹ học cổ điển Nhật Bản.',
    culturalExplanation: 'U huyền lý giải tại sao người Nhật chuộng sự kín đáo, ánh sáng dịu nhẹ qua vách giấy Shoji (như tác phẩm trứ danh Ca tụng bóng tối của Tanizaki Junichiro).',
    quiz: {
      question: 'Làm thế nào mà chiếc mặt nạ gỗ kịch Noh vốn cố định đường nét lại có thể biểu lộ hỉ nộ ái ố sống động?',
      options: [
        'Nhờ góc nghiêng của đầu diễn viên làm thay đổi phản chiếu ánh sáng và bóng đổ trên các đường gọt đẽo tinh vi',
        'Mặt nạ được gắn các khớp cơ học bên trong',
        'Diễn viên thay đổi mặt nạ liên tục sau mỗi cảnh',
        'Nhờ kỹ xảo chiếu đèn laser hiện đại',
      ],
      correctIndex: 0,
      explanation: 'Sự kỳ diệu của mặt nạ Noh nằm ở nghệ thuật điêu khắc: chỉ cần nghiêng nhẹ vài milimet đón bóng tối (Kumoru) hay ánh sáng (Teru), cảm xúc đã biến đổi thần kỳ.',
    },
  },
  {
    id: 'nk_2',
    conceptTitle: 'Quy luật Tiết tấu Ba giai đoạn: Tự - Phá - Cấp (序破急)',
    kanjiHeading: '序破急（じょはきゅう）',
    reading: 'じょはきゅう (Jo-Ha-Kyu)',
    sinoVietnamese: 'Tự Phá Cấp',
    theatricalEssence: 'Tự (Khởi đầu chậm rãi, trang nghiêm) -> Phá (Phát triển cao trào, đột biến kịch tính) -> Cấp (Tăng tốc dồn dập và kết thúc nhanh gọn, để lại dư ba).',
    stageMaskPsychology: 'Diễn viên Noh và Kabuki điều khiển nhịp thở theo nguyên lý Jo-Ha-Kyu để làm chủ tâm lý cả khán phòng hàng ngàn người nín thở theo dõi.',
    linguisticArchaism: 'Áp dụng trong cấu trúc văn bản thuyết phục: Mở đầu nêu bối cảnh (序), thân bài phản biện sắc bén (破), kết luận đưa ra hành động quyết định (急).',
    academicRelevance: 'JLPT N1 Cấu trúc Đọc hiểu bài văn nghị luận luận chiến.',
    culturalExplanation: 'Không chỉ kịch nghệ, Jo-Ha-Kyu là xương sống của Kiếm đạo Kendo (chậm rãi vờn kiếm -> xuất chiêu chớp nhoáng), Trà đạo và cả cấu trúc bài thuyết trình kinh doanh Nhật Bản.',
    quiz: {
      question: 'Giai đoạn "Phá" (破 - Ha) trong quy luật tiết tấu "序破急" thể hiện điều gì?',
      options: [
        'Sự biến chuyển bất ngờ, phát triển kịch tính và phá vỡ tiết tấu chậm rãi ban đầu',
        'Phá hủy toàn bộ sân khấu',
        'Dừng buổi biểu diễn để giải lao',
        'Đoạn kết thúc nhanh gọn',
      ],
      correctIndex: 0,
      explanation: 'Phá (破) là giai đoạn đột phá, chuyển từ trạng thái tĩnh tại sang xung đột cao trào kịch tính.',
    },
  },
];

export const extraNohKabukiList: NohKabukiTheatricalItem[] = [
  {
    id: 'nk_3',
    conceptTitle: 'Mỹ học Khoảng lặng & Khoảng trống "Ma" (間の美学)',
    kanjiHeading: '間（ま）の美学',
    reading: 'まのびがく (Ma no Bigaku)',
    sinoVietnamese: 'Gian Chi Mỹ Học (Mỹ học khoảng trống)',
    theatricalEssence: 'Trong kịch Kabuki, khi tiếng đàn Shamisen đột ngột ngừng bặt và diễn viên đứng bất động tạo dáng (Mie), chính khoảng lặng ấy là lúc năng lượng nghệ thuật bùng nổ mãnh liệt nhất.',
    stageMaskPsychology: 'Nghệ thuật làm chủ khoảng dừng trong lời nói. Người Nhật tin rằng những gì KHÔNG NÓI RA còn truyền tải thông điệp sâu hơn ngàn lời nói.',
    linguisticArchaism: 'Thành ngữ: "間が持たない" (Không chịu nổi sự im lặng ngượng ngùng), "間違い" (Lệch mất khoảng nhịp -> Nhầm lẫn sai sót).',
    academicRelevance: 'Giao tiếp cao cấp N1 và kỹ năng đàm phán thương mại quốc tế.',
    culturalExplanation: 'Hiểu được chữ "Ma" (間) giúp người học không bị hoang mang khi đối tác Nhật Bản im lặng suy nghĩ 30 giây trong bàn đàm phán.',
    quiz: {
      question: 'Từ "間違い" (Machigai - Sai sót, nhầm lẫn) trong tiếng Nhật có nguồn gốc chữ Hán bắt nguồn từ đâu?',
      options: [
        'Lệch mất khoảng nhịp (間) trong âm nhạc và kịch nghệ truyền thống',
        'Viết sai chữ Hán',
        'Đi lạc đường ngoài phố',
        'Tính nhầm tiền bạc',
      ],
      correctIndex: 0,
      explanation: 'Bắt nguồn từ việc diễn viên nhảy múa hoặc gõ trống trượt mất khoảng nhịp "Ma" (間違い), từ đó mở rộng nghĩa thành sai sót, nhầm lẫn.',
    },
  },
];

// =========================================================================
// 3. TÂM LÝ HỌC "AMAE" & NGỮ PHÁP NHỜ VẢ (「甘え」の構造)
// =========================================================================
export const initialAmaeList: AmaePsychologyItem[] = [
  {
    id: 'am_1',
    socialConcept: 'Tâm lý Amae - Nhu cầu được nương tựa và dung dưỡng tình cảm (甘えの構造)',
    kanjiHeading: '甘え（あまえ）',
    reading: 'あまえ (Amae)',
    doiTakeoPsychologyInsight: 'Bác sĩ tâm thần học Doi Takeo (土居健郎) công bố tác phẩm kinh điển "Cấu trúc Amae" năm 1971: Khác với phương Tây đề cao tính độc lập tuyệt đối, tâm lý học người Nhật xây dựng trên nền tảng khao khát được người khác chấp nhận, che chở và dung thứ một cách tự nhiên như đứa trẻ nương tựa người mẹ.',
    grammarConnection: 'Là nguồn gốc tâm lý sản sinh ra cấu trúc ngữ pháp tiếp nhận ơn huệ: 〜てもらう, 〜ていただく, 〜てくれる và đặc biệt là thể xin phép khiêm nhường đỉnh cao 〜させていただきます.',
    sociologicalImpact: 'Amae là chất keo gắn kết mối quan hệ Senpai - Kouhai và Sếp - Nhân viên. Nhưng nếu lạm dụng sẽ biến thành sự ỷ lại độc hại và thoái thác trách nhiệm.',
    conversationalExample: {
      japanese: 'お言葉に甘えまして、今回はごちそうになります。',
      reading: 'おことばに あまえまして、こんかいは ごちそうになります。',
      translation: 'Xin phép được nương theo lời mời ấm áp của anh, bữa ăn lần này em xin nhận ân huệ ạ.',
      nuanceNote: 'Lời cảm ơn chuẩn mực khi được người lớn tuổi hoặc cấp trên chiêu đãi.',
    },
    culturalExplanation: 'Không thể hiểu trọn vẹn ngữ pháp cho nhận tiếng Nhật nếu không thấu suốt tâm lý Amae. "Amae" không xấu, đó là nghệ thuật cho phép người khác che chở mình để củng cố sự gắn kết tình người.',
    quiz: {
      question: 'Theo nhà tâm lý học Doi Takeo, khái niệm "甘え" (Amae) trong xã hội Nhật Bản biểu thị điều gì?',
      options: [
        'Tâm lý khao khát được nương tựa, yêu thương và được đối phương bao dung che chở',
        'Sở thích ăn đồ ngọt bánh kẹo',
        'Thói lười biếng trốn tránh lao động',
        'Sự kiêu ngạo tự phụ của giới quý tộc',
      ],
      correctIndex: 0,
      explanation: 'Amae là một khái niệm tâm lý học độc đáo của Nhật Bản, chỉ nhu cầu tình cảm được người khác thấu hiểu, nương tựa và bao bọc.',
    },
  },
  {
    id: 'am_2',
    socialConcept: 'Cụm từ cửa miệng "お言葉に甘えて" trong giao tế công sở',
    kanjiHeading: 'お言葉に甘える（おことばにあまえる）',
    reading: 'おことばに あまえる (Okotoba ni amaeru)',
    doiTakeoPsychologyInsight: 'Nghệ thuật chuyển hóa sự ngượng ngùng khi nhận giúp đỡ thành sự hàm ơn tinh tế. Người Nhật không nói "Cảm ơn vì đã giúp", họ nói "Tôi xin nương tựa vào lòng tốt của bạn".',
    grammarConnection: 'Thể quá khứ khiêm nhường: お言葉に甘えさせていただき (Xin cho phép tôi được thuận theo lòng tốt của quý vị).',
    sociologicalImpact: 'Giúp người trao đi ơn huệ cảm thấy sự giúp đỡ của mình có giá trị và được đối phương tiếp nhận trọn vẹn.',
    conversationalExample: {
      japanese: 'それでは、お言葉に甘えて本日はお先に失礼いたします。',
      reading: 'それでは、おことばに あまえて ほんじつは おさきに しつれいいたします。',
      translation: 'Vậy thì, thuận theo lời nhắc nhở quan tâm của sếp, em xin phép về trước ngày hôm nay ạ.',
      nuanceNote: 'Dùng khi sếp bảo "Hôm nay mệt thì về sớm nghỉ ngơi đi".',
    },
    culturalExplanation: 'Nếu từ chối quá dứt khoát sự giúp đỡ của tiền bối sẽ bị coi là cự tuyệt tình cảm Uchi (phe mình). Biết "Amae" đúng lúc là một kỹ năng xã hội khôn ngoan.',
    quiz: {
      question: 'Khi cấp trên khuyên bạn: "Trời mưa to lắm, để tôi lái xe chở cậu về nhà nhé", câu đáp lại lịch thiệp nhất theo chuẩn văn hóa Amae là gì?',
      options: [
        'ありがとうございます。それではお言葉に甘えさせていただきます。',
        'いや、車は嫌いなので結構です。',
        '当然の権利として乗せてください。',
        'ガソリン代はいくらですか？',
      ],
      correctIndex: 0,
      explanation: 'Cụm từ "お言葉に甘えさせていただきます" thể hiện sự biết ơn và khiêm nhường đón nhận sự quan tâm của cấp trên.',
    },
  },
];

export const extraAmaeList: AmaePsychologyItem[] = [
  {
    id: 'am_3',
    socialConcept: 'Mặt trái của Amae: Sự ỷ lại quá đà và Hội chứng Hikikomori (甘えの破綻)',
    kanjiHeading: '甘えの破綻と依存',
    reading: 'あまえの はたんと いぞん',
    doiTakeoPsychologyInsight: 'Khi một cá nhân không học được cách tự lập mà chỉ mong đợi thế giới xung quanh phải tự động dung dưỡng mình vô điều kiện, khi va chạm thực tế khốc liệt họ sẽ thu mình lại (Hikikomori).',
    grammarConnection: 'Động từ phái sinh: 甘やかす (Amayakasu - Nuông chiều con cái quá mức), 甘ったれる (Amattareru - Đòi hỏi nũng nịu ỷ lại thiếu chín chắn).',
    sociologicalImpact: 'Cảnh báo về ranh giới mỏng manh giữa văn hóa yêu thương đùm bọc và sự kìm hãm trưởng thành cá nhân trong xã hội hiện đại.',
    conversationalExample: {
      japanese: 'いつまでも親に甘ったれていては、自立した社会人にはなれない。',
      reading: 'いつまでも おやに あまったれていては、じりつした しゃかいじんには なれない。',
      translation: 'Nếu cứ mãi ỷ lại nũng nịu bố mẹ như thế thì không bao giờ có thể trở thành một người trưởng thành độc lập ngoài xã hội.',
      nuanceNote: 'Lời khuyên răn nghiêm khắc về tính tự lập.',
    },
    culturalExplanation: 'Nghiên cứu Amae giúp giải mã tâm lý thanh niên Nhật Bản đương đại giữa áp lực tự lập và khao khát được che chở.',
    quiz: {
      question: 'Động từ "甘やかす" (Amayakasu) trong tiếng Nhật mang ý nghĩa tiêu cực nào?',
      options: [
        'Nuông chiều quá mức làm hư hỏng đứa trẻ hoặc cấp dưới',
        'Cho ăn quá nhiều đường ngọt',
        'Lừa gạt tiền bạc',
        'Bắt lao động vất vả',
      ],
      correctIndex: 0,
      explanation: '甘やかす là việc nuông chiều bảo bọc thái quá khiến đối phương không có khả năng tự lập.',
    },
  },
];

// =========================================================================
// 4. TÂM LÝ ĐỒNG HÓA & ÁP LỰC TẬP THỂ (同調圧力と空気)
// =========================================================================
export const initialDouchouList: DouchouPressureItem[] = [
  {
    id: 'dc_1',
    phenomenonTitle: 'Áp lực đồng hóa tập thể - Nỗi sợ bị cô lập (同調圧力)',
    kanjiHeading: '同調圧力（どうちょうあつりょく）',
    reading: 'どうちょうあつりょく (Douchou Atsuryoku)',
    sinoVietnamese: 'Đồng Điệu Áp Lực',
    sociologicalDefinition: 'Hiện tượng tâm lý xã hội trong đó các thành nhân trong một tập thể vô hình trung ép buộc mọi người phải có cùng ý kiến, hành vi và lối sống giống số đông. Kẻ dám đi ngược lại sẽ bị coi là "dị biệt" và bị trừng phạt ngầm.',
    indirectSpeechMechanism: 'Ngữ pháp nói nửa câu lấp lửng: "〜とは思うんですけど…" (Tôi cũng nghĩ thế nhưng mà...), nói giảm nói tránh phủ định kép để không trở thành người phản đối đơn độc.',
    workplaceCaseStudy: 'Trong cuộc họp, khi sếp hỏi ý kiến, dù trong lòng không đồng ý nhưng nhìn thấy tất cả đồng nghiệp gật đầu, nhân viên cũng sẽ nói: "私も皆様と同じ意見でございます" (Tôi cũng cùng ý kiến với mọi người ạ).',
    psychologicalDefenseTip: 'Học cách dùng từ đệm giảm xóc (Kushon-kotoba): "恐れ入りますが、別の視点からも検討させていただけますでしょうか" để bày tỏ phản biện mà không bị coi là phá vỡ đồng thuận.',
    culturalExplanation: 'Tục ngữ cổ: "出る釘は打たれる" (Chiếc đinh nào nhô lên sẽ bị búa gõ xuống). Áp lực đồng hóa tạo nên sự ổn định trật tự xã hội cao nhưng triệt tiêu sáng tạo cá nhân.',
    quiz: {
      question: 'Câu tục ngữ nào phản ánh rõ nét nhất hiện tượng "Áp lực đồng hóa" (同調圧力) của xã hội Nhật?',
      options: [
        '出る釘は打たれる (Chiếc đinh nào nhô lên cao sẽ bị búa đập xuống)',
        '犬も歩けば棒に当たる',
        '猿も木から落ちる',
        '石の上にも三年',
      ],
      correctIndex: 0,
      explanation: '出る釘は打たれる chỉ việc những ai có hành vi dị biệt, nổi trội khác số đông sẽ bị tập thể uốn nắn hoặc chèn ép.',
    },
  },
  {
    id: 'dc_2',
    phenomenonTitle: 'Tục cô lập tàn nhẫn thời phong kiến: Thôn Bát Phân (村八分)',
    kanjiHeading: '村八分（むらはちぶ）',
    reading: 'むらはちぶ (Murahachibu)',
    sinoVietnamese: 'Thôn Bát Phân',
    sociologicalDefinition: 'Hình phạt khắc nghiệt thời Edo: Kẻ vi phạm quy ước làng sẽ bị cắt đứt 8/10 mối quan hệ giao tiếp trong làng. Dân làng chỉ hỗ trợ 2 việc duy nhất: Dập lửa khi cháy nhà (vì sợ lây sang nhà khác) và Chôn cất khi có tang lễ (tránh dịch bệnh).',
    indirectSpeechMechanism: 'Từ vựng cảnh báo nguy hiểm trong giao tiếp: Bị cô lập, bị tẩy chay hội đồng (仲間外れ - Nakama-hazure, 孤立 - Koritsu).',
    workplaceCaseStudy: 'Tẩy chay nơi công sở (Ijime / Mobbing): Không giao việc, không mời đi ăn trưa, giả vờ không nghe thấy khi đối phương chào hỏi.',
    psychologicalDefenseTip: 'Thấu hiểu sự vận hành của tập thể để luôn giữ sự hòa nhã (Wa - 和) ở mức độ tối thiểu an toàn.',
    culturalExplanation: 'Nỗi sợ Murahachibu ăn sâu vào tiềm thức di truyền của người Nhật, giải thích vì sao họ luôn nỗ lực tuân thủ luật lệ và sợ làm phiền (Meiwaku) người xung quanh đến cùng cực.',
    quiz: {
      question: 'Trong hình phạt "村八分" (Murahachibu) thời xưa, 2 việc duy nhất dân làng còn hỗ trợ gia đình bị phạt là gì?',
      options: [
        'Hỏa hoạn (dập lửa) và Tang lễ (mai táng)',
        'Cưới hỏi và Lễ trưởng thành',
        'Gặt lúa và Làm nhà',
        'Cho vay tiền và Khám chữa bệnh',
      ],
      correctIndex: 0,
      explanation: 'Trong 10 sự kiện đời người, dân làng chỉ giúp 2 việc mang tính an toàn chung cho làng: Hỏa hoạn (火事) và Tang lễ (葬式).',
    },
  },
];

export const extraDouchouList: DouchouPressureItem[] = [
  {
    id: 'dc_3',
    phenomenonTitle: 'Nghệ thuật Đọc Bầu Không Khí và Bẫy KY (空気を読む & KY)',
    kanjiHeading: '空気を読む（くうきをよむ）',
    reading: 'くうきを よむ (Kuuki wo yomu)',
    sinoVietnamese: 'Độc Không Khí (Đọc vị bầu không khí)',
    sociologicalDefinition: 'Khả năng cảm nhận dòng chảy cảm xúc vô hình của tập thể mà không cần ai cất lời. Kẻ không làm được việc này bị dán nhãn là "KY" (Kuuki ga Yomenai - Kẻ mù điếc về bầu không khí).',
    indirectSpeechMechanism: 'Giao tiếp ngữ cảnh cao (High-context): Nhìn ánh mắt, khoảng im lặng và tiếng hắng giọng để biết khi nào nên dừng phát biểu.',
    workplaceCaseStudy: 'Khi sếp nhìn đồng hồ và thở dài nhẹ, người biết "đọc không khí" sẽ chủ động đề xuất kết thúc cuộc họp sớm.',
    psychologicalDefenseTip: 'Rèn luyện khả năng quan sát vi mô (Micro-expressions) trong giao tiếp hàng ngày.',
    culturalExplanation: 'Ở Nhật, người có năng lực đọc không khí được đánh giá là người tinh tế (Ki ga kiku - 気が利く), phẩm chất số một để thăng tiến trong sự nghiệp.',
    quiz: {
      question: 'Từ lóng viết tắt "KY" trong giới trẻ và công sở Nhật Bản có nghĩa là gì?',
      options: [
        '空気読めない (Kuuki Yomenai - Kẻ vô duyên không biết đọc bầu không khí)',
        '危険 (Kiken - Nguy hiểm)',
        '感謝 (Kansha - Cảm ơn)',
        '計画 (Keikaku - Kế hoạch)',
      ],
      correctIndex: 0,
      explanation: 'KY = K (Kuuki) + Y (Yomenai), chỉ người thiếu nhạy cảm xã hội, hành xử lạc quẻ với số đông.',
    },
  },
];

// =========================================================================
// 5. THƠ CA CỔ ĐIỂN WAKA & OGURA HYAKUNIN ISSHU (和歌と小倉百人一首)
// =========================================================================
export const initialWakaList: WakaHyakuninIsshuItem[] = [
  {
    id: 'wk_1',
    poemTitle: 'Thi phẩm Mở màn Hyakunin Isshu - Thiên hoàng Tenji (Thiên Trí Thiên Hoàng)',
    poetName: 'Thiên hoàng Tenji (天智天皇 - Thế kỷ thứ 7)',
    poemKanaAndKanji: '秋の田の かりほの庵の 苫をあらみ わが衣手は 露にぬれつつ',
    reading: 'あきのたの かりほのいおの とまをあらみ わがころもでは つゆにぬれつつ',
    translation: 'Trên cánh đồng mùa thu, nơi túp lều tranh lợp mái lá thưa thớt, vạt áo của ta thấm đẫm những giọt sương đêm lạnh giá.',
    rhetoricalDevices: {
      makurakotoba: '秋の田の (Cánh đồng mùa thu - dẫn nhập cho mùa gặt)',
      kakekotoba: 'かりほ (Vừa có nghĩa là gặt lúa 刈り穂, vừa có nghĩa là lều tranh tạm bợ 仮庵)',
      kigo: '秋 (Mùa thu) & 露 (Sương đêm lạnh)',
    },
    poeticBackground: 'Thiên hoàng Tenji ngồi trong túp lều canh lúa rách nát để thấu hiểu nỗi cơ cực lạnh giá của người nông dân lội bùn gặt lúa mùa thu.',
    culturalExplanation: 'Biểu tượng của tấm lòng thương dân của bậc đế vương, mở đầu cho tuyển tập 100 bài thơ cổ Ogura Hyakunin Isshu trứ danh.',
    quiz: {
      question: 'Thể thơ Tanka (Đoản ca) truyền thống Nhật Bản trong bài thơ này có cấu trúc ngắt nhịp âm tiết thế nào?',
      options: ['5 - 7 - 5 - 7 - 7 (Tổng cộng 31 âm tiết)', '5 - 7 - 5 (Tổng cộng 17 âm tiết)', '7 - 7 - 7 - 7', '4 - 4 - 4 - 4'],
      correctIndex: 0,
      explanation: 'Khác với Haiku (5-7-5), thể thơ cổ Waka/Tanka có cấu trúc hoàn mỹ gồm 31 âm tiết: 5-7-5-7-7.',
    },
  },
  {
    id: 'wk_2',
    poemTitle: 'Tuyệt tác Nỗi buồn Hoa tàn & Nhan sắc phai tàn - Nữ sĩ Ono no Komachi',
    poetName: 'Ono no Komachi (小野小町 - Tuyệt đại mỹ nhân thời Heian)',
    poemKanaAndKanji: '花の色は うつりにけりな いたづらに わが身世にふる ながめせしまに',
    reading: 'はなのいろは うつりにけりな いたづらに わがみよにふる ながめせしまに',
    translation: 'Màu hoa đã phai tàn hoài công vô ích, trong khi ta mải mê đắm chìm trong những suy tư mông lung nhìn mưa rơi triền miên trên cõi đời này.',
    rhetoricalDevices: {
      makurakotoba: 'Không dùng gối từ để dồn trọn xúc cảm',
      kakekotoba: 'ふる (Vừa là mưa rơi 降る, vừa là năm tháng trôi qua 経る); ながめ (Vừa là ngắm nhìn 眺め, vừa là mưa dầm 長雨)',
      kigo: '花の色 (Hoa anh đào xuân phai tàn) N1',
    },
    poeticBackground: 'Lời tự sự bi thương của đệ nhất mỹ nhân Heian khi nhìn những cánh hoa anh đào rụng tơi tả sau cơn mưa xuân, nhận ra thanh xuân của mình cũng đang trôi vụt qua kẽ tay.',
    culturalExplanation: 'Đỉnh cao của mỹ cảm Mono no Aware (xót thương trước sự vô thường của kiếp người).',
    quiz: {
      question: 'Kỹ thuật "Kakekotoba" (掛詞 - Chữ đa nghĩa) trong bài thơ của Ono no Komachi chơi chữ trên từ "ながめ" (Nagame) với hai tầng nghĩa nào?',
      options: [
        'Vừa là ngắm nhìn suy tư (眺め), vừa là cơn mưa dài triền miên (長雨)',
        'Vừa là dòng sông dài, vừa là ngọn núi cao',
        'Vừa là con mắt, vừa là đôi tai',
        'Vừa là mùa hè, vừa là mùa đông',
      ],
      correctIndex: 0,
      explanation: 'Kakekotoba là đỉnh cao tu từ Waka: "Nagame" đồng âm biểu thị cả việc mải mê nhìn suy tư lẫn cơn mưa dầm dề kéo dài.',
    },
  },
];

export const extraWakaList: WakaHyakuninIsshuItem[] = [
  {
    id: 'wk_3',
    poemTitle: 'Mối Tình Nồng Cháy Sông Tatsuta - Ariwara no Narihira (Narihira)',
    poetName: 'Ariwara no Narihira (在原業平 - Nam thần tình ái Heian)',
    poemKanaAndKanji: 'ちはやぶる 神代もきかず 竜田川 からくれなゐに 水くくるとは',
    reading: 'ちはやぶる かみよもきかず たつたがわ からくれないに みずくくるとは',
    translation: 'Ngay cả thời đại các vị thần linh uy dũng xa xưa cũng chưa từng nghe thấy: Nước sông Tatsuta nhuộm thành màu đỏ thắm rực rỡ đến nhường này!',
    rhetoricalDevices: {
      makurakotoba: 'ちはやぶる (Gối từ vĩnh cửu đi trước chữ 神 - Thần linh)',
      kakekotoba: 'からくれなゐ (Màu đỏ thắm nhập khẩu từ phương Nam Kararenai)',
      kigo: '竜田川の紅葉 (Lá phong đỏ mùa thu N1)',
    },
    poeticBackground: 'Narihira kín đáo mượn hình ảnh dòng sông trôi nghìn vạn lá phong đỏ rực để gửi gắm tình yêu nồng cháy không thể công khai với nàng hoàng hậu Fujiwara no Takaiko.',
    culturalExplanation: 'Nguồn cảm hứng cho tác phẩm manga/anime đấu bài thi ca Karuta nổi tiếng "Chihayafuru".',
    quiz: {
      question: 'Bộ môn thi đấu thể thao trí tuệ truyền thống sử dụng 100 bài thơ Hyakunin Isshu có tên gọi là gì?',
      options: ['Kyogi Karuta (競技かるた - Đấu bài Karuta)', 'Shogi', 'Go (Cờ vây)', 'Hanafuda'],
      correctIndex: 0,
      explanation: 'Kyogi Karuta là môn thể thao phản xạ tốc độ kết hợp văn hóa thi ca đỉnh cao của Nhật Bản.',
    },
  },
];

// =========================================================================
// 6. NGHI THỨC ĐỜI NGƯỜI QUÁN HÔN TÁNG TẾ (冠婚葬祭)
// =========================================================================
export const initialKankonsousaiList: KankonsousaiRitualsItem[] = [
  {
    id: 'kk_1',
    ceremonyType: 'Tang lễ (葬儀・告別式)',
    ritualName: 'Nghi thức Tang lễ & Phong bì Phúng viếng Koden (香典と告別式)',
    kanjiHeading: '香典（こうでん）と御霊前',
    reading: 'こうでん (Kouden) と ごれいぜん',
    envelopeEtiquette: 'Dùng phong bì có dây nơ Mizuhiki màu Đen - Trắng (Kuro-shiro) thắt nút chặt kiểu "Musubikiri" (kết thúc một lần, tuyệt đối không lặp lại). Số tiền phúng viếng phải dùng TIỀN CŨ nhăn nhẹ (tránh dùng tiền mới tinh vì sẽ bị coi là đã chuẩn bị trước cho cái chết của gia chủ!).',
    tabooWordsImikotoba: ['重ね重ね (Lặp đi lặp lại)', 'たびたび (Thường xuyên)', '再び (Lại một lần nữa)', 'くれぐれも (Thiết tha)'],
    formalSpeechFormulas: 'この度はご愁傷様でございます。心よりお悔やみ申し上げます。(Xin thành kính gửi lời phân ưu sâu sắc nhất tới gia quyến).',
    culturalExplanation: 'Hiểu đúng nghi thức tang lễ giúp người nước ngoài tránh phạm phải những cấm kỵ đau lòng nhất khi sinh sống và làm việc tại Nhật.',
    quiz: {
      question: 'Tại sao khi chuẩn bị tiền phúng viếng đám tang (香典 - Koden) ở Nhật, người ta lại kiêng kỵ dùng tiền giấy mới tinh (Shinsatsu)?',
      options: [
        'Vì tiền mới tinh mang hàm ý gia quyến đã lường trước và chuẩn bị sẵn tiền chờ người ta qua đời',
        'Vì tiền mới khó đếm',
        'Vì máy đếm tiền nhà tang lễ từ chối',
        'Do luật pháp cấm tiêu tiền mới',
      ],
      correctIndex: 0,
      explanation: 'Dùng tiền mới tinh bị coi là thất lễ lớn vì ám chỉ sự chuẩn bị từ trước. Nếu chỉ có tiền mới, người Nhật sẽ gấp nhẹ tạo một nếp nhăn trước khi bỏ vào phong bì.',
    },
  },
  {
    id: 'kk_2',
    ceremonyType: 'Đám cưới (結婚式)',
    ritualName: 'Nghi thức Phong bì Mừng cưới Shugi-bukuro (ご祝儀袋)',
    kanjiHeading: '御祝儀（ごしゅうぎ）',
    reading: 'ごしゅうぎ (Goshuugi)',
    envelopeEtiquette: 'Dùng dây Mizuhiki màu Đỏ - Vàng kim hoặc Bạc kim thắt nút Musubikiri. Số tiền mừng BẮT BUỘC phải là SỐ LẺ (3 vạn yên, 5 vạn yên, 7 vạn yên) để tượng trưng cho sự gắn kết không thể chia cắt. Cấm kỵ mừng 4 vạn (tử - chết) hoặc 2 vạn (số chẵn dễ chia lìa đôi ngả).',
    tabooWordsImikotoba: ['切れる (Cắt đứt)', '別れる (Chia ly)', '離れる (Xa cách)', '終わる (Kết thúc)', '飽きる (Nhàm chán)'],
    formalSpeechFormulas: 'ご結婚、誠におめでとうございます。お二人の末永いお幸せを心よりお祈り申し上げます。(Kính chúc hai bạn trăm năm hạnh phúc).',
    culturalExplanation: 'Trong tiệc cưới, người Nhật không nói "Cắt bánh cưới" mà dùng cụm từ "Dao nhập vào bánh" (ケーキ入刀 - Keeki nyuutou) để né chữ "Cắt" (切る).',
    quiz: {
      question: 'Tại sao số tiền mừng đám cưới ở Nhật Bản thường là số lẻ như 3 vạn (30.000 yên) hoặc 5 vạn (50.000 yên)?',
      options: [
        'Vì số lẻ không thể chia đôi được, ngụ ý cặp vợ chồng sẽ không bao giờ ly tán chia ly',
        'Vì tiền giấy Nhật không có mệnh giá chẵn',
        'Do quy định của nhà hàng tiệc cưới',
        'Để người nhận dễ chia tài sản',
      ],
      correctIndex: 0,
      explanation: 'Số lẻ tượng trưng cho sự gắn kết vĩnh cửu không thể bị chia đôi rẽ ngả.',
    },
  },
];

export const extraKankonsousaiList: KankonsousaiRitualsItem[] = [
  {
    id: 'kk_3',
    ceremonyType: 'Giao tế & Phong bì',
    ritualName: 'Nghệ thuật Dây nơ Mizuhiki: Cung tên Chousubi vs Thắt nút Musubikiri',
    kanjiHeading: '水引（みずひき）の使い分け',
    reading: 'みずひき (Mizuhiki)',
    envelopeEtiquette: 'Nơ cánh bướm/cung tên (Chousubi): Có thể tháo ra buộc lại dễ dàng -> Dùng cho các niềm vui lặp lại nhiều lần (Sinh con, Đỗ đại học, Thăng chức). Nơ thắt gút chặt (Musubikiri): Không thể tháo -> Dùng cho việc chỉ xảy ra 1 lần duy nhất trong đời (Đám cưới, Tang lễ, Thăm người ốm).',
    tabooWordsImikotoba: ['Dùng nhầm nơ cánh bướm cho đám tang hoặc đám cưới là đại họa ngoại giao!'],
    formalSpeechFormulas: '心ばかりの品でございますが、どうぞお納めください。(Món quà nhỏ từ tấm lòng, xin người nhận cho).',
    culturalExplanation: 'Sợi dây Mizuhiki truyền thống đan từ giấy Washi là đỉnh cao của nghệ thuật giao tế tinh tế và chuẩn mực Nhật Bản.',
    quiz: {
      question: 'Khi tặng quà mừng bạn thân thi đỗ kỳ thi JLPT N1, bạn nên chọn loại phong bì có dây nơ Mizuhiki nào?',
      options: [
        'Nơ cánh bướm Chousubi (vì đây là niềm vui có thể lặp lại nhiều lần trong đời)',
        'Nơ thắt nút chặt Musubikiri',
        'Dây thừng đen',
        'Không dùng dây nơ',
      ],
      correctIndex: 0,
      explanation: 'Các niềm vui học tập, sinh con, thăng chức dùng nơ cánh bướm (Chousubi) để chúc cho niềm vui tiếp tục lặp lại.',
    },
  },
];

// =========================================================================
// 7. THẦN ĐẠO SHINTO & LINH HỒN NGÔN TỪ KOTODAMA (神道と言霊信仰)
// =========================================================================
export const initialShintoKotodamaList: ShintoKotodamaItem[] = [
  {
    id: 'sk_1',
    shintoBeliefConcept: 'Linh hồn trong Ngôn từ - Tín ngưỡng Kotodama (言霊信仰)',
    kanjiHeading: '言霊（ことだま）',
    reading: 'ことだま (Kotodama)',
    sinoVietnamese: 'Ngôn Linh',
    philosophicalCore: 'Người Nhật cổ tin rằng mỗi từ ngữ khi được phát âm ra khỏi miệng đều mang một linh hồn và sức mạnh tâm linh có thật. Lời nói thiện lành sẽ hiện thực hóa hạnh phúc; lời nói xúi quẩy, độc hại sẽ kéo theo tai ương giáng xuống đời thực.',
    purificationRitualInsight: 'Nghi thức thanh tẩy Misogi (禊) và Harae (祓い): Rửa sạch miệng và tay bằng nước suối trước cổng đền Torii trước khi cất lời khấn cầu để giữ ngôn từ thuần khiết.',
    modernLinguisticEchoes: 'Lý giải tại sao người Nhật cực kỳ kiêng kỵ nói những từ như "Chết", "Thua", "Rớt", "Đổ vỡ" trong các dịp quan trọng, và luôn nói lời cảm ơn "Arigatou" như một câu thần chú tích trữ phúc lành.',
    culturalExplanation: 'Tác phẩm cổ Kojiki và Man\'yoshu ca ngợi nước Nhật là "Kotodama no sakiwau kuni" (Đất nước được chúc phúc bởi linh hồn ngôn từ linh thiêng).',
    quiz: {
      question: 'Tín ngưỡng "Kotodama" (言霊) của người Nhật ảnh hưởng thế nào đến cách họ sử dụng ngôn ngữ hàng ngày?',
      options: [
        'Họ luôn cẩn trọng kiêng kỵ lời nói tiêu cực và tích cực dùng lời nói tốt lành vì tin rằng lời nói có sức mạnh biến thành hiện thực',
        'Họ nói chuyện thật to để xua đuổi ma quỷ',
        'Họ không bao giờ nói chuyện với người lạ',
        'Họ chỉ viết thư chứ không nói bằng lời',
      ],
      correctIndex: 0,
      explanation: 'Kotodama là niềm tin rằng ngôn từ phát ra có năng lượng định hình hiện thực, tạo nên thói quen ăn nói hòa nhã, tích cực của người Nhật.',
    },
  },
  {
    id: 'sk_2',
    shintoBeliefConcept: 'Bát Bách Vạn Thần - Vạn vật hữu linh (八百万の神)',
    kanjiHeading: '八百万の神（やおよろずのかみ）',
    reading: 'やおよろずの かみ (Yaoyorozu no Kami)',
    sinoVietnamese: 'Bát Bách Vạn Thần',
    philosophicalCore: 'Không thờ phụng một vị thần độc tôn duy nhất. Người Nhật tin rằng thần linh hiện diện trong mọi sự vật: ngọn núi Phú Sĩ, dòng sông, cái cây cổ thụ, hòn đá, hạt gạo, thậm chí cả chiếc máy tính hay con robot.',
    purificationRitualInsight: 'Nghi thức "Kuyou" (供養): Làm lễ tạ ơn và chôn cất kim chỉ (Hari-kuyou), búp bê cũ (Ningyou-kuyou), cọ vẽ đã mòn vì xem chúng như những sinh mệnh đã tận tụy giúp đời.',
    modernLinguisticEchoes: 'Lời cảm ơn bàn ăn "Itadakimasu" (Xin nhận lấy mạng sống của cỏ cây động vật để nuôi sống bản thân) và triết lý "Mottainai" (Không lãng phí đồ vật).',
    culturalExplanation: 'Thế giới quan vạn vật hữu linh là cội nguồn giúp Nhật Bản trở thành cái nôi sáng tạo ra các thế giới linh hồn kỳ ảo trong phim hoạt hình Ghibli (Spirited Away, Mononoke Hime).',
    quiz: {
      question: 'Khái niệm "八百万の神" (Yaoyorozu no Kami) trong Thần đạo Shinto thể hiện thế giới quan nào?',
      options: [
        'Thế giới quan vạn vật hữu linh: Thần linh ngự trị trong mọi tạo vật tự nhiên và đồ vật xung quanh ta',
        'Chỉ có duy nhất 800 vị thần tối cao',
        'Thần linh chỉ sống trên các vì sao xa xôi',
        'Con người là chúa tể thống trị thiên nhiên',
      ],
      correctIndex: 0,
      explanation: 'Yaoyorozu (Bát bách vạn - vô số) biểu thị sự tôn kính thiên nhiên sâu sắc, xem mọi sự vật đều có linh hồn đáng trân trọng.',
    },
  },
];

export const extraShintoKotodamaList: ShintoKotodamaItem[] = [
  {
    id: 'sk_3',
    shintoBeliefConcept: 'Triết lý Tẩy trần Thanh khiết & Tinh thần Trắng trong (清き明き心)',
    kanjiHeading: '清浄（せいじょう）と穢れ（けがれ）',
    reading: 'せいじょう (Seijou) と けがれ (Kegare)',
    sinoVietnamese: 'Thanh Tịnh & Uế Khí',
    philosophicalCore: 'Trong Thần đạo, tội lỗi lớn nhất không phải là "Ác" mà là "Uế" (Kegare - sự vấy bẩn tâm trí và hao hụt sinh khí). Tẩy trần (Harae) giúp con người tìm lại trái tim trắng trong nguyên bản (Seimeishin).',
    purificationRitualInsight: 'Rải muối trừ tà (Morijio) trước cửa quán ăn, trước võ đài Sumo Dohyo để thanh tẩy đất thiêng.',
    modernLinguisticEchoes: 'Từ vựng khen ngợi: "潔い" (Isagiyoi - Trong sạch, khảng khái dám nhận trách nhiệm), "水に流す" (Thả trôi theo dòng nước - tha thứ lỗi lầm cũ).',
    culturalExplanation: 'Giải thích nỗi ám ảnh về sự sạch sẽ, thói quen tắm bồn hàng ngày và phân loại rác tinh tươm của xã hội Nhật Bản.',
    quiz: {
      question: 'Thành ngữ "水に流す" (Thả trôi theo dòng nước) trong văn hóa Nhật mang ý nghĩa nhân văn nào?',
      options: [
        'Xóa bỏ hiềm khích cũ, tha thứ cho lỗi lầm của nhau như dòng nước cuốn trôi vết bẩn',
        'Vứt rác xuống sông',
        'Đi bơi thuyền giải trí',
        'Để mặc cho nước lụt tràn vào nhà',
      ],
      correctIndex: 0,
      explanation: '水に流す bắt nguồn từ nghi thức Misogi dùng dòng nước tinh khiết gột rửa mọi tội lỗi, tha thứ để cùng bắt đầu lại từ đầu.',
    },
  },
];

// =========================================================================
// 8. NGHỆ THUẬT THỦ CÔNG MONOZUKURI & KINTSUGI (ものづくりと金継ぎ)
// =========================================================================
export const initialMonozukuriList: MonozukuriKintsugiItem[] = [
  {
    id: 'mz_1',
    artisanConcept: 'Nghệ thuật Hàn gắn Vàng Kintsugi - Tôn vinh Vết nứt Bất toàn (金継ぎ)',
    kanjiHeading: '金継ぎ（きんつぎ）',
    reading: 'きんつぎ (Kintsugi)',
    sinoVietnamese: 'Kim Kế',
    aestheticPhilosophy: 'Thay vì vứt bỏ chiếc bát gốm vỡ hay cố giấu giếm vết rạn nứt, nghệ nhân dùng sơn mài trộn bột vàng nguyên chất để hàn gắn lại. Vết nứt màu vàng kim rực sáng biến món đồ bị thương tổn trở thành một tuyệt tác độc bản vô giá.',
    shokuninMindset: 'Triết lý Wabi-sabi sâu sắc: Sự hoàn mỹ không nằm ở trạng thái nguyên vẹn không tì vết, mà nằm ở lịch sử thăng trầm và vết sẹo được chữa lành bằng tình yêu thương.',
    industrialKaizenLegacy: 'Khởi nguồn từ thời Muromachi thế kỷ 15 khi tướng quân Ashikaga Yoshimasa hàn gắn lại chiếc bát trà yêu thích mang từ Trung Hoa sang.',
    culturalExplanation: 'Kintsugi ngày nay được tâm lý học hiện đại ứng dụng như liệu pháp chữa lành chấn thương tâm lý (Resilience - Sức bật tinh thần sau biến cố).',
    quiz: {
      question: 'Ý nghĩa triết học sâu xa nhất của nghệ thuật hàn gắn đồ gốm "金継ぎ" (Kintsugi) là gì?',
      options: [
        'Không che giấu vết thương đổ vỡ mà tôn vinh nó bằng vàng, biến khiếm khuyết thành vẻ đẹp độc nhất vô nhị',
        'Cách tiết kiệm tiền mua bát mới',
        'Kỹ thuật dát vàng khoe khoang của giới siêu giàu',
        'Trò chơi ghép hình của trẻ em',
      ],
      correctIndex: 0,
      explanation: 'Kintsugi dạy chúng ta trân trọng những vết sẹo và thăng trầm trong cuộc đời, biến nỗi đau thành sức mạnh rực rỡ.',
    },
  },
  {
    id: 'mz_2',
    artisanConcept: 'Khí chất Nghệ nhân Shokunin Kishitsu & Sự Tinh tế Kodawari (職人気質と拘り)',
    kanjiHeading: '職人気質（しょくにんきしつ）',
    reading: 'しょくにん きしつ (Shokunin Kishitsu)',
    sinoVietnamese: 'Chức Nhân Khí Chất',
    aestheticPhilosophy: 'Tinh thần cống hiến trọn đời cho một kỹ nghệ duy nhất, theo đuổi sự hoàn hảo đến từng micromet mà không màng tới lợi nhuận hay danh vọng phù phiếm.',
    shokuninMindset: 'Sự cố chấp đầy đam mê (拘り - Kodawari): Tỉ mỉ từ khâu chọn nguyên liệu tự nhiên cho đến nhát gọt cuối cùng. Tinh thần của nghệ nhân làm dao bếp Sakai hay kiếm Nhật Katana.',
    industrialKaizenLegacy: 'Là nền tảng vững chắc đưa nền công nghiệp sản xuất xe hơi (Toyota), máy ảnh (Sony, Canon) và robot chính xác của Nhật Bản vươn lên dẫn đầu thế giới.',
    culturalExplanation: 'Từ vựng học thuật N1: "丹精を込める" (Tansei wo komeru - Dốc cạn tâm huyết chân thành để tạo tác một sản phẩm).',
    quiz: {
      question: 'Khái niệm "拘り" (Kodawari) trong tinh thần sản xuất Monozukuri của Nhật Bản mang sắc thái ý nghĩa nào?',
      options: [
        'Sự kiên định theo đuổi tiêu chuẩn chất lượng cao nhất không bao giờ thỏa hiệp',
        'Sự bướng bỉnh vô lý cản trở công việc',
        'Lòng tham lam muốn ôm đồm nhiều thứ',
        'Thói quen trì hoãn công việc',
      ],
      correctIndex: 0,
      explanation: 'Kodawari là niềm tự hào và sự tỉ mỉ đến từng chi tiết nhỏ nhất của người nghệ nhân đối với tác phẩm của mình.',
    },
  },
];

export const extraMonozukuriList: MonozukuriKintsugiItem[] = [
  {
    id: 'mz_3',
    artisanConcept: 'Nghệ thuật Mộc không đinh Kanawa-tsugi (金輪継ぎと宮大工)',
    kanjiHeading: '宮大工（みやだいく）の木組み',
    reading: 'みやだいくの きぐみ (Miyadaiku no Kigumi)',
    sinoVietnamese: 'Cung Đại Công Mộc Tổ',
    aestheticPhilosophy: 'Kỹ thuật ghép mộng gỗ tinh xảo xây dựng các ngôi chùa cổ nghìn năm (như chùa Horyuji cổ nhất thế giới) mà không cần sử dụng bất kỳ một chiếc đinh sắt nào. Các thanh gỗ co giãn tự nhiên thích ứng với động đất.',
    shokuninMindset: 'Nghệ nhân mộc Miyadaiku thấu hiểu đặc tính từng thớ gỗ: "Mua cây gỗ theo hướng gió ngọn núi nó sinh trưởng để đặt đúng hướng ngôi chùa".',
    industrialKaizenLegacy: 'Sự thấu hiểu vật liệu và độ bền vượt thời gian trở thành kim chỉ nam cho thiết kế kiến trúc chống động đất hiện đại của Nhật.',
    culturalExplanation: 'Từ vựng N1: "適材適所" (Thích tài thích sở - Đặt đúng người vào đúng việc, bắt nguồn từ thuật ngữ thợ mộc đặt đúng thanh gỗ vào đúng vị trí).',
    quiz: {
      question: 'Thành ngữ bốn chữ N1 "適材適所" (Tekizai Tekisho) có nguồn gốc ban đầu từ ngành nghề nào?',
      options: [
        'Nghệ nhân thợ mộc cung đình Miyadaiku chọn gỗ đóng chùa',
        'Người nông dân cấy lúa',
        'Thuyền trưởng lái tàu biển',
        'Võ sĩ đạo luyện kiếm',
      ],
      correctIndex: 0,
      explanation: 'Tekizai Tekisho nguyên nghĩa là chọn đúng thớ gỗ tốt đặt vào đúng vị trí chịu lực của cột kèo ngôi đền chùa.',
    },
  },
];

// =========================================================================
// 9. TÂM LÝ HỌC TUỔI GIÀ & NGÔN NGỮ CHĂM SÓC KAIGO (高齢化社会と介護日本語)
// =========================================================================
export const initialKaigoList: KaigoMindfulnessItem[] = [
  {
    id: 'kg_1',
    elderlyCareTopic: 'Kính ngữ Chăm sóc y tế - Duy trì Tôn nghiêm con người (介護敬語と尊厳)',
    kanjiHeading: '尊厳の保持（そんげんのほじ）',
    reading: 'そんげんの ほじ (Songen no hoji)',
    demographicInsight: 'Nhật Bản là quốc gia siêu già hóa hàng đầu thế giới (hơn 29% dân số trên 65 tuổi). Ngành điều dưỡng Kaigo đã phát triển hệ thống ngôn ngữ chăm sóc chuyên nghiệp bậc nhất toàn cầu.',
    empathyLanguageEtiquette: 'Tuyệt đối cấm kỵ ngôn ngữ trẻ con (Tameguchi hoặc gọi các cụ là "Chan"). Luôn dùng kính ngữ chuẩn mực để giữ gìn lòng tự trọng cho người cao tuổi: "〇〇様、お食事の準備が整いました" (Thưa cụ, bữa ăn đã được chuẩn bị chu tất rồi ạ).',
    psychologicalWellbeing: 'Liệu pháp gợi nhớ ký ức (Kaisouhou - 回想法): Dùng ngôn ngữ tôn kính để khơi gợi những ký ức thời hoàng kim oanh liệt, giúp người cao tuổi tìm lại niềm tin vào giá trị bản thân.',
    culturalExplanation: 'Học từ vựng Kaigo giúp tiếp cận các đề thi Đọc hiểu N2-N1 chủ đề Phúc lợi xã hội và Y tế công cộng.',
    quiz: {
      question: 'Nguyên tắc vàng trong giao tiếp "介護敬語" (Kính ngữ chăm sóc điều dưỡng) của Nhật Bản là gì?',
      options: [
        'Luôn sử dụng kính ngữ lịch thiệp, tôn trọng tuyệt đối nhân cách và không bao giờ coi người già như trẻ con',
        'Nói thật to và gắt gỏng',
        'Dùng đại từ suồng sã để tạo cảm giác thân mật',
        'Chỉ dùng ký hiệu tay chứ không nói',
      ],
      correctIndex: 0,
      explanation: 'Duy trì lòng tự trọng (尊厳) là tôn chỉ tối thượng của ngành điều dưỡng y tế Nhật Bản.',
    },
  },
  {
    id: 'kg_2',
    elderlyCareTopic: 'Ikigai ở Tuổi Hoàng hôn - Triết lý Lão hóa Tích cực (老年の生きがい)',
    kanjiHeading: '生涯現役（しょうがいげんえき）',
    reading: 'しょうがい げんえき (Shougai Gen\'eki)',
    demographicInsight: 'Người Nhật không xem tuổi già là sự kết thúc mà là "Cuộc đời thứ hai" (Daini no Jinsei). Khái niệm "Shougai Gen\'eki" (Trọn đời cống hiến) thôi thúc hàng triệu cụ ông cụ bà 80 tuổi vẫn tình nguyện làm việc, hướng dẫn du lịch hoặc viết sách.',
    empathyLanguageEtiquette: 'Không dùng từ "Người già vô dụng" mà dùng cụm từ kính trọng: "人生の大先輩" (Tiền bối vĩ đại của cuộc đời).',
    psychologicalWellbeing: 'Tạo lập những việc nhỏ mỗi sáng (chăm sóc bồn hoa, pha một ấm trà ngon, trò chuyện với láng giềng) để duy trì cảm giác "Mình vẫn có ích cho xã hội".',
    culturalExplanation: 'Bí quyết trường thọ vùng đảo Okinawa: Sự gắn kết cộng đồng tương trợ (Moai - 模合) và triết lý ăn no 8 phần mười (Hara Hachi Bun me).',
    quiz: {
      question: 'Cụm từ "生涯現役" (Shougai Gen\'eki) phản ánh thái độ sống nào của người cao tuổi Nhật Bản?',
      options: [
        'Tinh thần cống hiến và sống có ích trọn đời, tiếp tục lao động học hỏi cho đến hơi thở cuối cùng',
        'Nghỉ hưu sớm để an nhàn hưởng thụ',
        'Phó mặc cuộc sống cho viện dưỡng lão',
        'Từ chối mọi sự giúp đỡ của con cháu',
      ],
      correctIndex: 0,
      explanation: 'Shougai Gen\'eki là triết lý sống tích cực, xem lao động và cống hiến là suối nguồn của sức khỏe và niềm vui sống.',
    },
  },
];

export const extraKaigoList: KaigoMindfulnessItem[] = [
  {
    id: 'kg_3',
    elderlyCareTopic: 'Triết lý Yontou-shou - Tự lập trong sự Chăm sóc (自立支援)',
    kanjiHeading: '自立支援（じりつしえん）',
    reading: 'じりつ しえん (Jiritsu Shien)',
    demographicInsight: 'Chăm sóc không phải là "làm thay tất cả" khiến người già bị tàn phế chức năng, mà là "hỗ trợ để họ tự làm được những gì có thể", trao lại quyền kiểm soát cuộc sống cho chính họ.',
    empathyLanguageEtiquette: 'Khẩu lệnh khích lệ: "ゆっくりで大丈夫ですよ。ご自身のペースでお進みください" (Cụ cứ thong thả ạ, hãy bước theo nhịp độ tự nhiên của cụ nhé).',
    psychologicalWellbeing: 'Mỗi động tác tự cài được chiếc cúc áo là một chiến thắng tâm lý to lớn giúp đẩy lùi chứng sa sút trí tuệ (Ninshishou).',
    culturalExplanation: 'Từ vựng N1: "QOL" (Quality of Life - Chất lượng cuộc sống), "ノーマライゼーション" (Normalization - Bình thường hóa cuộc sống người khuyết tật và người già).',
    quiz: {
      question: 'Mục tiêu cốt lõi của nguyên tắc "自立支援" (Hỗ trợ tự lập) trong ngành điều dưỡng Nhật Bản là gì?',
      options: [
        'Hỗ trợ để người cao tuổi tự mình thực hiện tối đa các sinh hoạt hàng ngày, duy trì sự tự chủ của bản thân',
        'Để mặc người già tự xoay xở một mình',
        'Nhân viên làm thay 100% mọi việc',
        'Ép buộc tập thể dục cường độ cao',
      ],
      correctIndex: 0,
      explanation: 'Hỗ trợ tự lập giúp người cao tuổi cảm nhận được năng lực làm chủ cuộc sống của chính mình.',
    },
  },
];

// =========================================================================
// 10. ĐỊA CHÍNH TRỊ BIỂN ĐẢO & TINH THẦN PHÒNG HẠN THIÊN TAI (島国根性と防災文化)
// =========================================================================
export const initialShimaguniList: ShimaguniSaigaiItem[] = [
  {
    id: 'sg_1',
    geopoliticalTopic: 'Tư duy Biển đảo & Sự Cẩn trọng Đề phòng (島国根性と慎重さ)',
    kanjiHeading: '島国根性（しまぐにこんじょう）',
    reading: 'しまぐに こんじょう (Shimaguni Konjou)',
    geographicalDeterminism: 'Là quốc gia quần đảo bốn bề bao bọc bởi đại dương, Nhật Bản không có biên giới trên bộ với bất kỳ nước nào. Địa lý này hun đúc nên tâm lý phòng vệ cẩn trọng, ý thức ranh giới Uchi - Soto sâu sắc và sự gắn bó khăng khít nội bộ.',
    disasterResilienceSpirit: 'Đối diện thường trực với động đất, sóng thần, núi lửa phun trào và bão nhiệt đới: Người Nhật phát triển một nền "Văn hóa chuẩn bị rủi ro" (Bousai Ishiki) kỹ lưỡng số 1 hành tinh.',
    linguisticExpressionsOfCooperation: 'Thành ngữ: "備えあれば患いなし" (Có phòng bị trước thì không bao giờ phải lo âu hoạn nạn - N1).',
    culturalExplanation: 'Hiểu được tư duy biển đảo giúp giải mã lý do tại sao người Nhật luôn lên kế hoạch dự phòng (Plan B, Plan C) và có quy trình kiểm tra an toàn khắt khe trong mọi công xưởng.',
    quiz: {
      question: 'Câu tục ngữ N1 "備えあれば患いなし" (Sonae areba urei nashi) bắt nguồn từ tâm lý ứng phó với điều gì?',
      options: [
        'Tâm lý luôn chuẩn bị phương án dự phòng kỹ lưỡng trước thiên tai bất ngờ của cư dân biển đảo',
        'Cách chuẩn bị hành lý khi đi du lịch biển',
        'Thói quen tích trữ thức ăn mùa đông',
        'Kỹ thuật đóng tàu vượt đại dương',
      ],
      correctIndex: 0,
      explanation: 'Sonae areba urei nashi (Có chuẩn bị chu đáo thì không còn tai ương) là triết lý sống còn của người Nhật trước thiên tai thường trực.',
    },
  },
  {
    id: 'sg_2',
    geopoliticalTopic: 'Sức mạnh Mối gắn kết "Kizuna" sau Đại thảm họa (絆の力)',
    kanjiHeading: '絆（きずな）と助け合い',
    reading: 'きずな (Kizuna) と たすけあい',
    geographicalDeterminism: 'Sau đại thảm họa động đất sóng thần Đông Bắc (Tohoku 3.11 năm 2011), cả thế giới ngả mũ khâm phục khi người dân Nhật Bản xếp hàng trong trật tự tuyết rơi, chia sẻ từng vắt cơm nắm mà không hề xảy ra cướp phá hôi của.',
    disasterResilienceSpirit: 'Chữ Hán "絆" (Kizuna - Mối dây liên kết thâm tình bền chặt) đã được bình chọn là Chữ Hán của năm 2011, biểu trưng cho tình người ấm áp nâng đỡ nhau qua cơn giông bão.',
    linguisticExpressionsOfCooperation: 'Khẩu hiệu toàn quốc: "がんばろう日本" (Cùng nhau cố gắng vượt lên nhé Nhật Bản!), tinh thần tương thân tương ái "お互い様" (Otogaisama).',
    culturalExplanation: 'Kizuna là minh chứng hùng hồn nhất cho thấy văn hóa tập thể và kỷ luật thép của người Nhật khi hoạn nạn sẽ chuyển hóa thành nguồn sức mạnh nhân văn vĩ đại.',
    quiz: {
      question: 'Chữ Hán "絆" (Kizuna) được nhân dân Nhật Bản tôn vinh đặc biệt sau biến cố lịch sử trọng đại nào?',
      options: [
        'Đại thảm họa động đất sóng thần vùng Đông Bắc (Tohoku 3.11)',
        'Chiến tranh thế giới thứ hai kết thúc',
        'Khủng hoảng kinh tế bong bóng năm 1990',
        'Thế vận hội Tokyo 1964',
      ],
      correctIndex: 0,
      explanation: 'Chữ 絆 (Mối gắn kết nghĩa tình) đã trở thành biểu tượng tinh thần bất diệt của người dân Nhật Bản vượt qua thảm họa 3.11.',
    },
  },
];

export const extraShimaguniList: ShimaguniSaigaiItem[] = [
  {
    id: 'sg_3',
    geopoliticalTopic: 'Văn hóa Balo Thoát hiểm & Diễn tập Phòng chống Thiên tai (防災意識)',
    kanjiHeading: '防災意識（ぼうさいいしき）と自助共助',
    reading: 'ぼうさい いしき と じじょきょうじょ',
    geographicalDeterminism: 'Mỗi gia đình Nhật đều trang bị sẵn "Bousai Bag" (Balo thoát hiểm đủ nước uống, lương khô, đèn pin, radio chạy bằng tay quay cho 72 giờ sinh tồn đầu tiên).',
    disasterResilienceSpirit: 'Mô hình kiềng ba chân sinh tồn: Jijo (Tự cứu mình 70%) -> Kyojo (Tương trợ hàng xóm 20%) -> Kojo (Cứu trợ nhà nước 10%).',
    linguisticExpressionsOfCooperation: 'Ngày 1 tháng 9 hàng năm là "Ngày phòng chống thiên tai toàn quốc" (Bousai no Hi), từ thủ tướng cho đến học sinh mẫu giáo đều tham gia diễn tập cúi gầm bàn tránh động đất.',
    culturalExplanation: 'Từ vựng N1: "未曾有" (Mizou - Chưa từng có trong tiền lệ), "迅速な避難" (Jinsoku na hinan - Sơ tán nhanh chóng).',
    quiz: {
      question: 'Trong mô hình kiềng 3 chân ứng phó thiên tai của Nhật Bản, yếu tố nào được xác định là quan trọng hàng đầu chiếm 70% cơ hội sống sót?',
      options: [
        '自助 (Jijo - Tự trang bị kỹ năng và cứu lấy bản thân trước tiên)',
        '公助 (Kojo - Chờ quân đội cứu viện)',
        'Hét to kêu cứu',
        'Đứng yên chờ tin tức trên tivi',
      ],
      correctIndex: 0,
      explanation: 'Trong thảm họa, 72 giờ vàng đầu tiên phụ thuộc lớn nhất vào "Tự cứu" (自助) và "Hàng xóm cứu nhau" (共助) trước khi đội cứu hộ quốc gia tiếp cận.',
    },
  },
];
