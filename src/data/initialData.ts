import {
  VocabItem,
  KanjiItem,
  SlangItem,
  ContextItem,
  AudioLensItem,
  PastPaperItem,
  AiExamQuestion,
  JapanTruthItem,
  DeepReadingItem,
  NewsItem,
  PracticalDocItem,
  TranslationItem,
  PitchItem,
  FieldAudioItem,
  DictationItem,
  RoleplayScenario,
  DebateTopic,
  SenpaiQuestion,
  KeigoEmailItem,
  HorensoScenario,
  CorporateCrisisItem,
  LogisticsCrisisItem,
  SdgsCsrItem,
  KushonNegotiationItem,
  VirtualWorkspaceItem,
  OfficeEtiquetteItem,
  HonneTatemaeItem,
  NemawashiItem,
  KamizaNomikaiItem,
  Kaizen5sA3Item,
  GiftOmotenashiItem,
} from '../types';

// ==========================================
// 1. GÓC TỪ VỰNG THỰC CHIẾN (N5 - N1)
// ==========================================
export const initialVocabList: VocabItem[] = [
  {
    id: 'v_n1_01',
    word: '余儀なくされる',
    reading: 'よぎなくされる',
    meaning: 'Buộc phải / Không còn cách nào khác ngoài việc...',
    level: 'N1',
    kanjiBreakdown: '余 (dư/khác) + 儀 (phương kế, sự việc) + 無く (không có)',
    exampleSentence: '台風の直撃を受け、飛行機の欠航を余儀なくされた。',
    exampleReading: 'たいふうのちょくげきをうけ、ひこうきのけっこうをよぎなくされた。',
    exampleMeaning: 'Do bão đổ bộ trực tiếp, chúng tôi buộc phải hủy chuyến bay.',
    mnemonicStory: '余 (thừa) + 儀 (kế sách) -> "Không còn kế sách nào thừa thãi nữa", tình thế ép buộc không còn lựa chọn nào khác!',
    mnemonicImageHint: 'Hình ảnh hành khách đứng bần thần nhìn bảng thông báo hủy chuyến bay lúc bão lớn.',
    srsStage: 'learning',
    quiz: {
      id: 'qv_01',
      question: 'Chọn câu có cách dùng từ「余儀なくされる」chính xác nhất:',
      options: [
        { id: 'a', text: '怪我のため、彼は大会への出場辞退を余儀なくされた。', isCorrect: true },
        { id: 'b', text: '天気が良かったので、公園で散歩を余儀なくされた。', isCorrect: false },
        { id: 'c', text: '美味しかったので、ラーメンをおかわり余儀なくされた。', isCorrect: false },
        { id: 'd', text: '親切な店員のおかげで、買い物を余儀なくされた。', isCorrect: false },
      ],
      correctExplanation: '「〜を余儀なくされる」mang sắc thái tiêu cực hoặc bất khả kháng, chủ thể bị hoàn cảnh ngoài ý muốn ép buộc phải làm một việc mà bản thân không hề mong đợi.',
      trapAnalysis: 'Bẫy JEES: Hay gài với các hành động vui vẻ hoặc tự nguyện như đi dạo, ăn thêm kem. Chỉ dùng khi có biến cố ngoại cảnh!',
      mnemonicTip: 'Nhớ câu thần chú: "Dư Nghi" = Hết nước đi -> Bị ép làm điều chẳng đặng đừng.',
    },
  },
  {
    id: 'v_n2_01',
    word: '把握する',
    reading: 'はあくする',
    meaning: 'Nắm vững, thấu hiểu tường tận tình hình',
    level: 'N2',
    kanjiBreakdown: '把 (Cầm, nắm trong tay) + 握 (Nắm chặt)',
    exampleSentence: 'プロジェクトの進捗状況を正確に把握してください。',
    exampleReading: 'プロジェクトのしんちょくじょうきょうをせいかくにはあくしてください。',
    exampleMeaning: 'Xin hãy nắm bắt chính xác tiến độ của dự án.',
    mnemonicStory: 'Cả 2 chữ đều có bộ Thủ (扌- cái tay): Dùng tay tóm lấy rồi siết chặt, tức là nắm thóp vấn đề trong lòng bàn tay.',
    srsStage: 'review',
    quiz: {
      id: 'qv_02',
      question: 'Từ đồng nghĩa sát nghĩa nhất với「把握する」trong công việc là gì?',
      options: [
        { id: 'a', text: 'しっかり理解・掌握する', isCorrect: true },
        { id: 'b', text: '曖昧にしておく', isCorrect: false },
        { id: 'c', text: '他人に任せる', isCorrect: false },
        { id: 'd', text: '忘れてしまう', isCorrect: false },
      ],
      correctExplanation: '把握 (Ba ác) nghĩa là nắm chặt thông tin trong tay, tức là hiểu rõ ngọn ngành mọi diễn biến.',
      trapAnalysis: 'Tránh nhầm với 理解する (chỉ hiểu về mặt lý thuyết). 把握 mang tính bao quát toàn bộ bức tranh số liệu/tiến độ.',
      mnemonicTip: 'Tay tóm chặt lấy chìa khóa thành công!',
    },
  },
  {
    id: 'v_n3_01',
    word: 'きっかけ',
    reading: 'きっかけ',
    meaning: 'Cơ duyên, động lực ban đầu, ngòi nổ khơi mào',
    level: 'N3',
    kanjiBreakdown: '切っ掛け (Vết cắt mở đầu)',
    exampleSentence: '日本のアニメを見たのが、日本語を勉強するきっかけでした。',
    exampleReading: 'にほんのアニメをみたのが、にほんごをべんきょうするきっかけでした。',
    exampleMeaning: 'Việc xem anime Nhật chính là cơ duyên khiến tôi bắt đầu học tiếng Nhật.',
    mnemonicStory: 'Kitte (cắt) + Kake (mắc vào) -> Một nhát cắt mở màn cho chuỗi hành trình dài kỳ thú!',
    srsStage: 'mastered',
    quiz: {
      id: 'qv_03',
      question: 'Điền từ thích hợp:「日本へ留学する（　）となったのは、先生の一言だった。」',
      options: [
        { id: 'a', text: 'きっかけ', isCorrect: true },
        { id: 'b', text: 'おわり', isCorrect: false },
        { id: 'c', text: 'ついで', isCorrect: false },
        { id: 'd', text: 'せいで', isCorrect: false },
      ],
      correctExplanation: '「〜がきっかけで / きっかけとなる」là mẫu diễn đạt kinh điển nói về động lực, biến cố đầu tiên khơi dậy một bước ngoặt.',
      trapAnalysis: 'Bẫy phân biệt với ついでに (tiện thể) hoặc せいで (do lỗi tiêu cực).',
      mnemonicTip: 'Cú hích "Kích hoạt" sự khởi đầu.',
    },
  },
  {
    id: 'v_n4_01',
    word: '遠慮する',
    reading: 'えんりょする',
    meaning: 'Khách khí, ngại ngần, kiềm chế',
    level: 'N4',
    kanjiBreakdown: '遠 (Xa) + 慮 (Lo nghĩ)',
    exampleSentence: 'どうぞ遠慮しないで、たくさん召し上がってください。',
    exampleReading: 'どうぞえんりょしないで、たくさんめしあがってください。',
    exampleMeaning: 'Xin đừng khách sáo, hãy dùng thật nhiều vào nhé.',
    mnemonicStory: 'Lo nghĩ quá xa (Viễn lự) cho cảm xúc người khác nên bản thân đành khép nép ngại ngùng.',
    srsStage: 'review',
    quiz: {
      id: 'qv_04',
      question: 'Câu nào thể hiện lời nhắc nhở lịch sự cấm hút thuốc bằng chữ「遠慮」?',
      options: [
        { id: 'a', text: 'こちらでの喫煙はご遠慮ください。', isCorrect: true },
        { id: 'b', text: 'こちらでタバコを遠慮して吸ってください。', isCorrect: false },
        { id: 'c', text: 'タバコを遠慮しません。', isCorrect: false },
        { id: 'd', text: '遠慮なタバコです。', isCorrect: false },
      ],
      correctExplanation: '「ご遠慮ください」là cách diễn đạt từ chối/cấm đoán cực kỳ tinh tế của người Nhật, thay vì dùng từ cấm thô lỗ「禁止」.',
      trapAnalysis: 'Người học sơ cấp tưởng "ngại ngần" thì không mang nghĩa cấm, nhưng trong biển báo Nhật đây là cách bảo "Vui lòng đừng làm".',
      mnemonicTip: 'Người Nhật lịch sự bảo bạn "hãy ngại ngùng đi" chính là bảo "đừng làm thế nữa"!',
    },
  },
  {
    id: 'v_n5_01',
    word: '約束',
    reading: 'やくそく',
    meaning: 'Lời hứa, cuộc hẹn',
    level: 'N5',
    kanjiBreakdown: '約 (Gút thắt, tóm tắt) + 束 (Bó lại)',
    exampleSentence: '明日の午後３時に友達と会う約束があります。',
    exampleReading: 'あしたのごごさんじにともだちとあうやくそくがあります。',
    exampleMeaning: 'Tôi có cuộc hẹn gặp bạn vào 3 giờ chiều mai.',
    mnemonicStory: 'Buộc hai sợi dây kết lại thành bó -> tượng trưng cho lời ước hẹn không thể phá bỏ.',
    srsStage: 'mastered',
    quiz: {
      id: 'qv_05',
      question: 'Cụm từ "Thất hứa / Không giữ lời hẹn" trong tiếng Nhật là gì?',
      options: [
        { id: 'a', text: '約束を破る (やくそくをやぶる)', isCorrect: true },
        { id: 'b', text: '約束を切る (やくそくをきる)', isCorrect: false },
        { id: 'c', text: '約束を落とす (やくそくをおとす)', isCorrect: false },
        { id: 'd', text: '約束を捨てる (やくそくをすてる)', isCorrect: false },
      ],
      correctExplanation: '「約束を守る」(giữ lời hứa) đối nghĩa với「約束を破る」(phá vỡ/xé toạc lời hứa).',
      trapAnalysis: 'Tiếng Việt nói "bỏ lời hứa" nên hay bị nhầm sang 捨てる. Tiếng Nhật dùng động từ 破る (làm rách, phá vỡ).',
      mnemonicTip: 'Phá vỡ (破る) cam kết đã bó (束) chặt!',
    },
  },
];

// ==========================================
// 2. BẢNG CANVAS KANJI & CHẤM ĐIỂM AI
// ==========================================
export const initialKanjiList: KanjiItem[] = [
  {
    id: 'k_01',
    character: '道',
    onyomi: ['ドウ', 'トウ'],
    kunyomi: ['みち', 'いう'],
    meaning: 'Đạo, con đường, đạo lý',
    level: 'N4',
    strokeCount: 12,
    radicals: ['辶 (Sước - bước đi)', '首 (Thủ - cái đầu)'],
    radicalMeaning: 'Bộ Sước (bước đi) chở cái đầu (Thủ) đi đúng hướng trên con đường chân chính.',
    mnemonicStory: 'Vác cái đầu (首) vững vàng bước đi (辶) trên đường đời đó chính là "ĐẠO" (道).',
    strokeOrderGuide: [
      '1. Phẩy trên đầu chữ 首',
      '2. Nét ngang',
      '3. Nét sổ trái',
      '4. Nét gập phải',
      '5-8. Các nét ngang bên trong và đáy',
      '9-12. Vẽ bộ Sước (辶) bao bọc từ trái qua phải xuống dưới cùng',
    ],
    commonWords: [
      { word: '道路', reading: 'どうろ', meaning: 'Đường sá' },
      { word: '茶道', reading: 'さどう', meaning: 'Trà đạo' },
      { word: '柔道', reading: 'じゅうどう', meaning: 'Judo (Nhu đạo)' },
    ],
    calligraphyQuiz: {
      id: 'qk_01',
      question: 'Trong nghệ thuật Thư pháp Shodo, lỗi sai trí mạng nhất khi viết bộ Sước (辶) trong chữ「道」là gì?',
      options: [
        { id: 'a', text: 'Viết bộ Sước trước rồi mới viết chữ 首 bên trong.', isCorrect: true },
        { id: 'b', text: 'Nét Harai cuối cùng của bộ Sước vuốt dài về bên phải.', isCorrect: false },
        { id: 'c', text: 'Chữ 首 viết hơi lệch lên trên một chút để nhường chỗ cho đế thuyền.', isCorrect: false },
        { id: 'd', text: 'Dừng bút (Tome) dứt khoát ở nét ngang chữ 首.', isCorrect: false },
      ],
      correctExplanation: 'Quy tắc thứ tự nét Kanji chuẩn: Với bộ Sước (辶), BẮT BUỘC phải viết phần lõi bên trong trước (chữ 首), sau đó mới viết bộ Sước bọc ngoài để nâng đỡ toàn bộ chữ!',
      trapAnalysis: 'Nhiều người quen tay vẽ cái khung bên ngoài trước như bộ Vi (囗), nhưng bộ Sước luôn được viết CUỐI CÙNG.',
      mnemonicTip: 'Thuyền (辶) đón người (首) vào trong khoang rồi mới xuất bến lướt đi.',
    },
  },
  {
    id: 'k_02',
    character: '誠',
    onyomi: ['セイ'],
    kunyomi: ['まこと'],
    meaning: 'Thành (Thành thực, chân thành)',
    level: 'N2',
    strokeCount: 13,
    radicals: ['言 (Ngôn - lời nói)', '成 (Thành - hoàn thành)'],
    radicalMeaning: 'Lời nói (言) mà biến thành hiện thực (成) thì đó là người Thành thực (誠).',
    mnemonicStory: 'Lời nói ra (言) mà ắt thành công (成), không gian dối, chính là lá cờ "Thành" của Shinsengumi!',
    strokeOrderGuide: [
      '1-7. Viết bộ Ngôn bên trái trước',
      '8-13. Viết chữ Thành (成) bên phải với nét hất (Hane) dứt khoát',
    ],
    commonWords: [
      { word: '誠実', reading: 'せいじつ', meaning: 'Thành thực' },
      { word: '誠意', reading: 'せいい', meaning: 'Thiện chí' },
    ],
    calligraphyQuiz: {
      id: 'qk_02',
      question: 'Phần bên phải của chữ「誠」là chữ「成」. Nét móc nghiêng (Sora-hane) cần xử lý như thế nào?',
      options: [
        { id: 'a', text: 'Dồn lực rồi hất ngược lên góc 45 độ dứt khoát, không run tay.', isCorrect: true },
        { id: 'b', text: 'Kéo tuột thẳng đuột không có điểm dừng.', isCorrect: false },
        { id: 'c', text: 'Viết nét chấm trước khi viết nét móc.', isCorrect: false },
        { id: 'd', text: 'Uốn cong tròn như chữ U.', isCorrect: false },
      ],
      correctExplanation: 'Nét Hane (跳ね) trong chữ Thành đòi hỏi bút lực đè xuống tạo độ đậm, rồi phóng bút hất lên thanh thoát.',
      trapAnalysis: 'Người mới viết hay làm nét hất quá yếu hoặc nét móc bị quẹo vào trong làm chữ mất thế uy phong.',
      mnemonicTip: 'Hất mũi kiếm sắc lẹm của võ sĩ đạo.',
    },
  },
  {
    id: 'k_03',
    character: '愛',
    onyomi: ['アイ'],
    kunyomi: ['いと.しい', 'まな'],
    meaning: 'Ái, tình yêu thương',
    level: 'N3',
    strokeCount: 13,
    radicals: ['爪 (Trảo - bàn tay chụp xuống)', '冖 (Mịch - dải lụa)', '心 (Tâm - trái tim)', '夊 (Tuy - bước đi chậm)'],
    radicalMeaning: 'Dùng bàn tay chở che, lấy dải lụa bao bọc, đặt Trái tim (心) ở giữa và bước đi chậm rãi bên nhau.',
    mnemonicStory: 'Tình yêu chân chính là khi chữ TÂM (心) nằm ngay ở trung tâm chữ Ái!',
    strokeOrderGuide: [
      '1-3. Bộ Trảo trên cùng',
      '4-5. Bộ Mịch',
      '6-9. Trái tim (心) ở trung tâm',
      '10-13. Bộ Tuy ở phía dưới',
    ],
    commonWords: [
      { word: '愛情', reading: 'あいじょう', meaning: 'Tình ái, tình cảm thương yêu' },
      { word: '恋愛', reading: 'れんあい', meaning: 'Tình yêu đôi lứa' },
    ],
    calligraphyQuiz: {
      id: 'qk_03',
      question: 'Điểm khác biệt quan trọng giữa chữ Ái phồn thể (truyền thống) của Nhật và giản thể Trung Quốc là gì?',
      options: [
        { id: 'a', text: 'Tiếng Nhật vẫn giữ nguyên chữ Tâm (心) ở giữa, không bị lược bỏ.', isCorrect: true },
        { id: 'b', text: 'Tiếng Nhật bỏ chữ Tâm thay bằng chữ Hữu (友).', isCorrect: false },
        { id: 'c', text: 'Tiếng Nhật viết bộ Nhật thay cho bộ Mịch.', isCorrect: false },
        { id: 'd', text: 'Tiếng Nhật không dùng chữ Ái.', isCorrect: false },
      ],
      correctExplanation: 'Người Nhật luôn tự hào rằng chữ Ái (愛) trong chữ Hán Nhật vẫn chứa trọn con tim (心). "Tình yêu không có trái tim sao gọi là tình yêu!".',
      trapAnalysis: 'Nhiều người học theo chữ giản thể Trung Quốc (爱) sẽ bị thiếu mất bộ Tâm ở giữa!',
      mnemonicTip: 'Trái tim nằm trọn trong lồng ngực chữ Ái.',
    },
  },
];

// ==========================================
// 3. RADAR TỪ LÓNG & TIẾNG NHẬT XU HƯỚNG
// ==========================================
export const initialSlangList: SlangItem[] = [
  {
    id: 's_01',
    slang: 'カスハラ (Kasu-hara)',
    reading: 'かすはら',
    origin: 'Công sở',
    meaning: 'Customer Harassment - Khách hàng quá quắt, bạo hành tinh thần nhân viên',
    contextUsage: 'Rất phổ biến trong bản tin thời sự và đào tạo combini/ngân hàng tại Nhật, khi khách chửi bới, đòi quỳ gối xin lỗi (Dogeza).',
    sampleDialogue: [
      { speaker: '店員 A', text: 'さっきのお客さん、土下座しろって怒鳴ってたよ。', translation: 'Vị khách lúc nãy quát bắt tao phải quỳ lạy xin lỗi đấy.' },
      { speaker: '店員 B', text: 'それ完全にカスハラじゃん！すぐに店長に報告しよう。', translation: 'Thế thì đúng là Kasu-hara 100% rồi! Mau báo cho quản lý đi.' },
    ],
    quiz: {
      id: 'qs_01',
      question: 'Hành vi nào sau đây được coi là「カスハラ」chính hiệu chốn công sở Nhật?',
      options: [
        { id: 'a', text: 'Khách ép nhân viên quỳ gối (Dogeza) và chửi bới suốt 2 tiếng vô cớ.', isCorrect: true },
        { id: 'b', text: 'Khách khiếu nại lịch sự vì món ăn bị nguội.', isCorrect: false },
        { id: 'c', text: 'Khách hỏi thăm vị trí nhà vệ sinh bằng kính ngữ.', isCorrect: false },
        { id: 'd', text: 'Khách xin thêm hóa đơn đỏ hợp pháp.', isCorrect: false },
      ],
      correctExplanation: 'カスハラ là từ ghép của Customer + Harassment, chỉ hành vi lạm quyền khách hàng để lăng mạ, uy hiếp tinh thần người phục vụ.',
      trapAnalysis: 'Đừng nhầm với クレーム (Claim - khiếu nại thông thường). Khiếu nại chính đáng không phải là Kasuhara.',
      mnemonicTip: 'Kasu (Rác rưởi) + Hara (Quấy rối) -> Vị khách hành xử tồi tệ!',
    },
  },
  {
    id: 's_02',
    slang: '推し活 (Oshi-katsu)',
    reading: 'おしかつ',
    origin: 'TikTok',
    meaning: 'Hết lòng ủng hộ thần tượng (mua goods, đi concert, cosplay)',
    contextUsage: 'Văn hóa giới trẻ và Gen Z Nhật Bản. "Oshi" là idol/nhân vật anime mà bạn thương yêu nhất.',
    sampleDialogue: [
      { speaker: 'ゆき', text: '今週末何するの？', translation: 'Cuối tuần này cậu làm gì thế?' },
      { speaker: 'まい', text: '推しの生誕祭だから、全力で推し活する予定！', translation: 'Sinh nhật bias của tớ nên tớ dốc toàn lực đi Oshi-katsu đây!' },
    ],
    quiz: {
      id: 'qs_02',
      question: 'Thuật ngữ「推し変 (Oshi-hen)」trong giới trẻ Nhật có nghĩa là gì?',
      options: [
        { id: 'a', text: 'Đổi thần tượng yêu thích sang người khác.', isCorrect: true },
        { id: 'b', text: 'Bỏ việc đi làm ca sĩ.', isCorrect: false },
        { id: 'c', text: 'Bán hết poster của idol lấy tiền.', isCorrect: false },
        { id: 'd', text: 'Lập fan club mới.', isCorrect: false },
      ],
      correctExplanation: 'Oshi (Đẩy/Ủng hộ) + Hen (Biến đổi) = Chuyển hướng tình cảm sang thần tượng mới.',
      trapAnalysis: 'Hay nhầm với 推し増し (thích thêm người nữa mà không bỏ người cũ).',
      mnemonicTip: 'Oshi (Bias) + Biến (Đổi gu).',
    },
  },
  {
    id: 's_03',
    slang: 'タイパ (Taipa)',
    reading: 'たいぱ',
    origin: 'Gen Z',
    meaning: 'Time Performance - Hiệu suất sử dụng thời gian (xem phim tua nhanh 2x, nghe tóm tắt sách)',
    contextUsage: 'Xuất phát từ コスパ (Cost Performance - P/P), giới trẻ Nhật hiện nay coi trọng "Taipa" hơn tất cả.',
    sampleDialogue: [
      { speaker: '後輩', text: 'このドラマ、2倍速で見たらタイパ最高ですよ。', translation: 'Phim này xem tua 2x tốc độ đạt Taipa đỉnh lắm anh ơi.' },
      { speaker: '先輩', text: 'えぇ…ちゃんと味わって見ようよ。', translation: 'Hả... xem phim thì phải thưởng thức từ tốn chứ.' },
    ],
    quiz: {
      id: 'qs_03',
      question: 'Hành động nào sau đây là minh chứng rõ nhất cho xu hướng「タイパ重視」của giới trẻ?',
      options: [
        { id: 'a', text: 'Xem video YouTube với tốc độ 1.5x hoặc 2x và đọc phần tóm tắt comment trước.', isCorrect: true },
        { id: 'b', text: 'Ngồi thiền 4 tiếng trong chùa không dùng điện thoại.', isCorrect: false },
        { id: 'c', text: 'Viết thư tay dài 5 trang gửi người yêu.', isCorrect: false },
        { id: 'd', text: 'Đi bộ xuyên Nhật Bản suốt 3 tháng hè.', isCorrect: false },
      ],
      correctExplanation: 'Taipa = Time + Performance. Tiết kiệm từng giây phút để nạp tối đa lượng thông tin.',
      trapAnalysis: 'Tránh nhầm với コスパ (Cos-pa: tiết kiệm tiền bạc). Taipa là tối ưu hóa thời gian.',
      mnemonicTip: 'Tai = Time. Pa = Performance!',
    },
  },
];

// ==========================================
// 4. TRÌNH TẠO NGỮ CẢNH ĐA CHIỀU AI (3 SẮC THÁI)
// ==========================================
export const initialContextList: ContextItem[] = [
  {
    id: 'ctx_01',
    targetWord: '食べる (Ăn)',
    reading: 'たべる',
    meaning: 'Hành động ăn uống, tiêu thụ thực phẩm',
    nuances: {
      keigo: {
        sentence: '部長、こちらの銘菓をどうぞお召し上がりください。',
        translation: 'Thưa Trưởng phòng, xin mời ngài dùng thử món bánh trứ danh này ạ.',
        note: 'Sử dụng Tôn kính ngữ (Sonkeigo)「お召し上がりください」để tôn vinh hành động của bề trên/khách hàng.',
      },
      casual: {
        sentence: 'これめっちゃうまいから、一口食ってみ？',
        translation: 'Cái này ngon vãi chưởng, cắn thử một miếng không mày?',
        note: 'Dùng động từ suồng sã「食う (くう)」kết hợp thể rủ rê「〜てみ？」chỉ dùng giữa bạn bè thân thiết nam giới.',
      },
      editorial: {
        sentence: '現代人は過剰な糖分を日常的に摂取する傾向にある。',
        translation: 'Người hiện đại có xu hướng hấp thụ lượng đường quá mức trong đời sống hàng ngày.',
        note: 'Văn phong báo chí nghị luận dùng từ Hán Việt trang trọng「摂取する (せっしゅする - Tiếp thú/Nạp vào)」thay cho từ thuần Nhật.',
      },
    },
    quiz: {
      id: 'qctx_01',
      question: 'Trong buổi tiệc trang trọng cùng Tổng giám đốc đối tác, bạn nên mời ông ấy nếm rượu bằng câu nào?',
      options: [
        { id: 'a', text: '社長、この日本酒をお召し上がりになりますか。', isCorrect: true },
        { id: 'b', text: '社長、このお酒をいっぱい食いますか。', isCorrect: false },
        { id: 'c', text: '社長、お酒を摂取してください。', isCorrect: false },
        { id: 'd', text: '社長、お酒を食べてね。', isCorrect: false },
      ],
      correctExplanation: 'Với sếp đối tác, bắt buộc dùng Tôn kính ngữ (召し上がる). Từ「食う」vô lễ, còn「摂取する」là văn viết y khoa/báo chí không dùng để mời ăn.',
      trapAnalysis: 'Bẫy sắc thái: Dùng từ đao to búa lớn kiểu 摂取する trong bàn tiệc nghe quái dị như đang tiêm thuốc thí nghiệm!',
      mnemonicTip: 'Mời sếp = "Mời xơi" (召し上がる); Viết báo = "Hấp thụ" (摂取); Bạn bè = "Đớp/Chén" (食う).',
    },
  },
  {
    id: 'ctx_02',
    targetWord: '行く (Đi)',
    reading: 'いく',
    meaning: 'Di chuyển từ nơi này đến nơi khác',
    nuances: {
      keigo: {
        sentence: '明日、弊社の田中が貴社へ伺います。',
        translation: 'Ngày mai, anh Tanaka của công ty chúng tôi sẽ đến bái kiến quý công ty.',
        note: 'Dùng Khiêm nhường ngữ (Kenjougo)「伺う (うかがう)」để hạ mình khi đến nhà/công ty người khác.',
      },
      casual: {
        sentence: '明日渋谷行くんだけど、一緒に行くやついる？',
        translation: 'Mai tao lượn lên Shibuya đây, có đứa nào đi cùng không?',
        note: 'Dùng「やつ」thân mật, lược bỏ trợ từ「に/へ」.',
      },
      editorial: {
        sentence: '首相は経済サミットに出席するため、欧州へと赴いた。',
        translation: 'Thủ tướng đã lên đường sang châu Âu nhằm tham dự hội nghị thượng đỉnh kinh tế.',
        note: 'Văn phong chính luận dùng「赴く (おもむく - Phó)」thể hiện hành trình mang sứ mệnh lớn lao.',
      },
    },
    quiz: {
      id: 'qctx_02',
      question: 'Bản tin đài NHK đưa tin về đoàn cứu trợ vùng bão sẽ dùng cụm từ nào?',
      options: [
        { id: 'a', text: '救援隊が被災地へと赴いた。', isCorrect: true },
        { id: 'b', text: '救援隊が被災地へ伺いました。', isCorrect: false },
        { id: 'c', text: '救援隊が被災地に行っちゃった。', isCorrect: false },
        { id: 'd', text: '救援隊が被災地をいらっしゃる。', isCorrect: false },
      ],
      correctExplanation: 'Bản tin thời sự trung lập, trang nghiêm dùng thể từ vựng Hán hoặc hòa ngữ cổ trang trọng:「赴く (おもむく)」.',
      trapAnalysis: '伺う chỉ dùng trong giao tiếp hội thoại đối diện với người nghe. Bản tin báo chí không dùng Khiêm nhường ngữ để tường thuật ngôi thứ ba.',
      mnemonicTip: 'Sứ mệnh lớn thì "Phó" (赴く); Thưa gửi thì "Khấu" (伺う).',
    },
  },
];

// ==========================================
// 5. KÍNH LÚP ÂM THANH THỰC TẾ (PODCAST / VIDEO CLIPS)
// ==========================================
export const initialAudioLensList: AudioLensItem[] = [
  {
    id: 'al_01',
    keyword: '本音と建前 (Honne to Tatemae)',
    durationSec: 8,
    sourceType: 'Podcast',
    title: 'Podcast: Văn hóa lòng dạ người Kyoto',
    japaneseTranscript: '「ぶぶ漬けでもどうどす？」って言われたら、それは「早く帰れ」っていう京都人の建前なんですよ。本音を見抜かなきゃ。',
    vietnameseTranscript: 'Nếu được hỏi "Dùng chén cơm chan trà nhé?", đó chỉ là lời khách sáo (Tatemae) bảo bạn mau về đi của người Kyoto đấy. Phải nhìn thấu lòng dạ thật (Honne).',
    keyTimestamp: '00:03 - 00:07',
    keywordExplanation: 'Honne (ý nghĩ thật trong thâm tâm) đối lập với Tatemae (lời nói lịch sự giữ kẽ bề ngoài để không làm phật lòng nhau).',
    listeningTip: 'Chú ý ngữ điệu dịu dàng nhưng buông lửng cuối câu của phương ngữ Kansai (〜どす), đây là dấu hiệu của lời từ chối khéo.',
    quiz: {
      id: 'qal_01',
      question: 'Khi bạn đến chơi nhà người Kyoto và họ mời「ぶぶ漬け (cháo chan nước trà)」, hành động chuẩn mực nhất là gì?',
      options: [
        { id: 'a', text: 'Hiểu rằng đã đến lúc làm phiền quá lâu, xin phép đứng dậy cáo từ ra về ngay.', isCorrect: true },
        { id: 'b', text: 'Hớn hở ngồi đợi họ bưng cháo ra và xin thêm một bát nữa.', isCorrect: false },
        { id: 'c', text: 'Chê cháo nguội và đòi đổi món khác.', isCorrect: false },
        { id: 'd', text: 'Rủ thêm bạn bè đến cùng ăn cho vui.', isCorrect: false },
      ],
      correctExplanation: 'Câu chuyện "Bubu-zuke" là ví dụ kinh điển về Tatemae của Kyoto: Mời ăn món rẻ tiền nhanh gọn mang ngụ ý "Tôi hết đồ tiếp đãi rồi, bạn nên về thôi". Người tinh ý sẽ lập tức xin phép ra về.',
      trapAnalysis: 'Người nước ngoài dễ nghe theo nghĩa đen và vui vẻ ngồi đợi ăn, khiến gia chủ vô cùng khó xử.',
      mnemonicTip: 'Cháo chan trà Kyoto = Lời tiễn khách thanh lịch!',
    },
  },
  {
    id: 'al_02',
    keyword: '相槌 (Aizuchi - Tiếng đệm gật gù)',
    durationSec: 6,
    sourceType: 'Hội thoại đường phố',
    title: 'Nghệ thuật giao tiếp: Tiếng gật gù tạo thiện cảm',
    japaneseTranscript: 'なるほどですね。そうおっしゃる気持ち、痛いほどよく分かります。ええ、ええ。',
    vietnameseTranscript: 'Thì ra là vậy ạ. Cảm giác mà ngài vừa chia sẻ, tôi vô cùng thấu hiểu. Vâng, vâng ạ.',
    keyTimestamp: '00:01 - 00:05',
    keywordExplanation: '相槌 (あいづち) là các âm đệm như「ええ」「なるほど」「そうですね」được chêm vào nhịp nhàng để báo cho đối phương biết "Tôi vẫn đang chăm chú lắng nghe".',
    listeningTip: 'Tập trung bắt nhịp âm thanh tần số cao rơi vào các khoảng ngắt hơi của người nói.',
    quiz: {
      id: 'qal_02',
      question: 'Tại sao việc im lặng lắng nghe từ đầu đến cuối mà không chêm tiếng「相槌」lại bị người Nhật coi là thất lễ?',
      options: [
        { id: 'a', text: 'Vì họ cảm thấy bất an, tưởng bạn đang mất tập trung hoặc phản đối ngầm.', isCorrect: true },
        { id: 'b', text: 'Vì họ ghét người ít nói.', isCorrect: false },
        { id: 'c', text: 'Vì văn hóa Nhật cấm im lặng quá 3 giây.', isCorrect: false },
        { id: 'd', text: 'Vì điện thoại sẽ tự ngắt kết nối.', isCorrect: false },
      ],
      correctExplanation: 'Người Nhật cần sự xác nhận liên tục (Feedback loop). Không có Aizuchi, họ sẽ hỏi dồn:「聞いてる？」(Có đang nghe không đấy?).',
      trapAnalysis: 'Trong văn hóa phương Tây, ngắt lời bị coi là bất lịch sự. Nhưng ở Nhật, không đệm Aizuchi mới là vô phép!',
      mnemonicTip: 'Aizuchi như nhịp gõ trống giữ lửa cuộc trò chuyện.',
    },
  },
];

// ==========================================
// 6. KHO ĐỀ THI THẬT JLPT (PAST PAPERS)
// ==========================================
export const initialPastPapersList: PastPaperItem[] = [
  {
    id: 'pp_01',
    year: '2023',
    session: 'Tháng 12',
    level: 'N2',
    section: 'Ngữ pháp',
    passage: 'Mondai 7 - Điền sao hoàn chỉnh câu (☆)',
    quiz: {
      id: 'qpp_01',
      question: 'Sắp xếp các từ sau vào vị trí [ 1 ] [ 2 ] [ ☆ ] [ 4 ]:\n「どんなに困難な状況であっても、彼は最後まであきらめる＿＿　＿＿　＿☆＿　＿＿努力を続けた。」\n1: ことなく　2: といった　3: 風貌で　4: まっすぐな',
      options: [
        { id: 'a', text: 'Thứ tự đúng: 1 - 4 - 3 - 2 (Vị trí sao là 3)', isCorrect: false },
        { id: 'b', text: 'Thứ tự đúng: 1 - 2 - 4 - 3 (Vị trí sao là 4: まっすぐな)', isCorrect: true },
        { id: 'c', text: 'Thứ tự đúng: 4 - 3 - 1 - 2', isCorrect: false },
        { id: 'd', text: 'Thứ tự đúng: 2 - 1 - 4 - 3', isCorrect: false },
      ],
      correctExplanation: 'Cụm ngữ pháp:「あきらめることなく」(không hề từ bỏ) đi liền với nhau (1). Tiếp theo bổ nghĩa cho nỗ lực:「あきらめることなく (1) といった (2) まっすぐな (4) 風貌で (3) 努力を続けた」-> Vị trí sao là số 4.',
      trapAnalysis: 'Bẫy logic JEES: Thí sinh thường bị phân vân giữa 風貌で (dáng vẻ) và 努力を続けた. Cần nhớ cấu trúc [V-こと-なく] đứng ngay sau V từ điển.',
      mnemonicTip: 'Luôn tìm cặp bài trùng ngữ pháp cố định trước (ở đây là V-ることなく) để khóa chặt 1 vị trí.',
    },
    jeesTrapNotes: 'JEES chuyên bẫy các phó từ đảo lộn và định ngữ nhiều tầng. Hãy ghép các khối danh từ + tính từ trước rồi mới lồng vào khung câu.',
  },
  {
    id: 'pp_02',
    year: '2022',
    session: 'Tháng 7',
    level: 'N1',
    section: 'Từ vựng - Chữ Hán',
    quiz: {
      id: 'qpp_02',
      question: 'Chọn cách đọc Hiragana đúng nhất của từ gạch chân:\n「彼の主張には明らかに【矛盾】が存在する。」',
      options: [
        { id: 'a', text: 'むじゅん', isCorrect: true },
        { id: 'b', text: 'ぼうじゅん', isCorrect: false },
        { id: 'c', text: 'むとん', isCorrect: false },
        { id: 'd', text: 'むじゅう', isCorrect: false },
      ],
      correctExplanation: '矛盾 (Mâu thuẫn): 矛 (Mâu - ngọn giáo) đọc là む, 盾 (Thuẫn - chiếc khiên) đọc là じゅん. Nghĩa là mâu thuẫn, tiền hậu bất nhất.',
      trapAnalysis: 'Bẫy âm On của chữ 矛: Trong từ điển thông thường dễ bị đoán mò thành ぼう hoặc むう. JEES khai thác triệt để các âm On đặc biệt.',
      mnemonicTip: 'Điển tích kinh điển: Ngọn giáo đâm thủng vạn vật gặp chiếc khiên đỡ được mọi ngọn giáo -> Mâu Thuẫn (Mu-jun).',
    },
    jeesTrapNotes: 'Chữ Hán N1 rất thích kiểm tra các chữ có 2 âm On tương tự nhau hoặc âm ngắt bị lược.',
  },
];

// ==========================================
// 7. MÁY TẠO ĐỀ THI JLPT AI TỰ ĐỘNG
// ==========================================
export const initialAiExamQuestions: AiExamQuestion[] = [
  {
    id: 'aie_01',
    level: 'N2',
    section: 'Mondai 1',
    instruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
    content: 'この製品は【厳重】に管理されています。',
    options: ['げんじゅう', 'げんじょう', 'がんじゅう', 'ごんじゅう'],
    correctIndex: 1, // げんじょう
    explanation: '厳重 (Nghiêm trọng - nghĩa là cẩn mật, nghiêm ngặt). Âm On của 厳 là げん, 重 là じゅう/じょう (ở đây đọc là げんじゅう / một số giáo trình phiên げんじゅう, đáp án chính xác của JEES là げんじゅう - tùy bộ gõ. Ở đây chữ 重 đọc là じゅう).',
    grammarMnemonic: 'Cẩn mật bảo quản nghiêm trọng = げんじゅう!',
  },
  {
    id: 'aie_02',
    level: 'N3',
    section: 'Mondai 3',
    instruction: '（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
    content: 'いくら頼まれても、引き受ける（　）にはいかない。',
    options: ['わけ', 'はず', 'もの', 'こと'],
    correctIndex: 0, // わけ
    explanation: 'Cấu trúc「〜わけにはいかない」: Không thể làm việc đó vì lý do đạo đức, trách nhiệm xã hội hoặc lương tâm cắn rứt.',
    grammarMnemonic: 'Lương tâm không cho phép = わけにはいかない!',
  },
  {
    id: 'aie_03',
    level: 'N1',
    section: 'Mondai 2',
    instruction: '次の文の（　）に入れるのに最もよいものを一つ選びなさい。',
    content: '新製品の開発は、予算の都合上、計画の見直しを（　）。',
    options: ['余儀なくされた', '余儀なくさせた', '余儀なくした', '余儀なくなった'],
    correctIndex: 0,
    explanation: 'Chủ ngữ là việc phát triển sản phẩm chịu tác động bị động bởi ngoại cảnh:「〜を余儀なくされた」.',
    grammarMnemonic: 'Bị ép buộc thì dùng dạng BỊ ĐỘNG された!',
  },
];

// ==========================================
// 8. LỘ TRÌNH JLPT LIÊN KẾT "SỰ THẬT NHẬT BẢN"
// ==========================================
export const initialJapanTruthList: JapanTruthItem[] = [
  {
    id: 'jt_01',
    title: 'Tại sao người Nhật vừa gọi điện thoại vừa cúi đầu gập người?',
    japaneseTheme: 'お辞儀文化 (Văn hóa cúi chào vô thức)',
    category: 'Tâm lý người Nhật',
    linkedGrammarOrKanji: 'お辞儀 (おじぎ) & 敬語 (けいご)',
    content: 'Nếu đi trên phố Tokyo, bạn sẽ không khó để bắt gặp một nhân viên văn phòng mặc vest vừa áp điện thoại vào tai vừa gập người 45 độ lia lịa. Dù đầu dây bên kia không hề nhìn thấy, nhưng trong tâm thức người Nhật, cơ thể và ngôn ngữ kính ngữ (Keigo) là một thể thống nhất. Khi nói lời tạ lỗi「申し訳ございません」, nếu cơ thể không hạ thấp xuống, giọng nói sẽ mất đi độ ấm và sự hối lỗi chân thành.',
    funFact: 'Các hãng viễn thông Nhật từng làm khảo sát: Hơn 82% nhân viên công sở thừa nhận họ vô thức cúi đầu khi nói chuyện với khách hàng qua điện thoại!',
    recheckQuiz: {
      id: 'qjt_01',
      question: 'Khi xin lỗi đối tác qua điện thoại, câu nào thể hiện sự ăn năn sâu sắc nhất?',
      options: [
        { id: 'a', text: '大変申し訳ございませんでした。心よりお詫び申し上げます。', isCorrect: true },
        { id: 'b', text: 'ごめんね、次から気をつけるわ。', isCorrect: false },
        { id: 'c', text: 'すみません、私のせいじゃないです。', isCorrect: false },
        { id: 'd', text: '悪かったですね。', isCorrect: false },
      ],
      correctExplanation: 'Cụm từ「心よりお詫び申し上げます」kết hợp Khiêm nhường ngữ đỉnh cao là tiêu chuẩn vàng xử lý khủng hoảng truyền thông của doanh nghiệp Nhật.',
      trapAnalysis: 'Dùng ごめん hoặc すみません trong thương trường bị coi là coi thường đối tác.',
      mnemonicTip: 'Đầu gập càng sâu, thành ý càng chạm tới trái tim.',
    },
  },
  {
    id: 'jt_02',
    title: 'Bí mật đằng sau tiếng chuông cửa hàng tiện lợi FamilyMart',
    japaneseTheme: 'コンビニの入店音 (Âm thanh đón khách cửa hàng tiện lợi)',
    category: 'Văn hóa xã hội',
    linkedGrammarOrKanji: 'いらっしゃいませ & おもてなし',
    content: 'Giai điệu quen thuộc "Đồ - Sol - Rê - Sol - La - Rê..." khi bước vào FamilyMart thực chất là một tác phẩm được sáng tác riêng bởi nhạc sĩ Inada Yasushi mang tên "Melody Chime No.1 D-major". Âm điệu này sử dụng thang âm ngũ cung tạo cảm giác an tâm vô thức, đồng thời báo hiệu cho nhân viên trong kho biết có khách vào mà không gây giật mình.',
    funFact: 'Ở Nhật có hàng ngàn bản remix nhạc chuông FamilyMart trên YouTube từ phong cách Jazz, Lofi cho đến Heavy Metal!',
    recheckQuiz: {
      id: 'qjt_02',
      question: 'Khi khách bước vào cửa hàng, câu chào bắt buộc 100% nhân viên Nhật phải đồng thanh hô vang là gì?',
      options: [
        { id: 'a', text: 'いらっしゃいませ！ (Chào mừng quý khách!)', isCorrect: true },
        { id: 'b', text: 'こんにちは、何にする？ (Chào, lấy gì nào?)', isCorrect: false },
        { id: 'c', text: '早く買ってください！ (Mau mua hộ cái!)', isCorrect: false },
        { id: 'd', text: 'おかえりなさい！ (Mừng bạn về nhà!)', isCorrect: false },
      ],
      correctExplanation: '「いらっしゃいませ」là câu chào đón bất di bất dịch của ngành bán lẻ Nhật, xuất phát từ động từ tôn kính「いらっしゃる」.',
      trapAnalysis: 'おかえりなさい chỉ dùng cho quán Maid Cafe hoặc chào người nhà về tổ ấm.',
      mnemonicTip: 'Âm thanh chào đón nồng hậu chuẩn tinh thần Omotenashi.',
    },
  },
];

// ==========================================
// 9. ĐỌC HIỂU PHÂN CẤP & BÓC TÁCH CẤU TRÚC VÔ HẠN
// ==========================================
export const initialDeepReadingsList: DeepReadingItem[] = [
  {
    id: 'dr_01',
    title: '日本の少子高齢化と労働市場の変革',
    level: 'N1',
    textWithFurigana: [
      { text: '日本', ruby: 'にほん' },
      { text: 'が' },
      { text: '直面', ruby: 'ちょくめん' },
      { text: 'している' },
      { text: '少子', ruby: 'しょうし' },
      { text: '高齢化', ruby: 'こうれいか' },
      { text: 'は、' },
      { text: '単', ruby: 'たん' },
      { text: 'なる' },
      { text: '人口', ruby: 'じんこう' },
      { text: '動態', ruby: 'どうたい' },
      { text: 'の' },
      { text: '変化', ruby: 'へんか' },
      { text: 'に' },
      { text: 'とどまらず、' },
      { text: '社会', ruby: 'しゃかい' },
      { text: '保障', ruby: 'ほしょう' },
      { text: '制度', ruby: 'せいど' },
      { text: 'の' },
      { text: '持続', ruby: 'じぞく' },
      { text: '可能性', ruby: 'かのうせい' },
      { text: 'や' },
      { text: '企業', ruby: 'きぎょう' },
      { text: 'の' },
      { text: '雇用', ruby: 'こよう' },
      { text: '慣行', ruby: 'かんこう' },
      { text: 'に' },
      { text: '対', ruby: 'たい' },
      { text: 'しても' },
      { text: '抜本的', ruby: 'ばっぽんてき' },
      { text: 'な' },
      { text: '見直', ruby: 'みなお' },
      { text: 'しを' },
      { text: '迫', ruby: 'せま' },
      { text: 'っている。' },
    ],
    plainText: '日本が直面している少子高齢化は、単なる人口動態の変化にとどまらず、社会保障制度の持続可能性や企業の雇用慣行に対しても抜本的な見直しを迫っている。',
    translation: 'Hiện tượng già hóa dân số kết hợp tỉ lệ sinh giảm mà Nhật Bản đang đối mặt không chỉ đơn thuần dừng lại ở sự biến động nhân khẩu học, mà còn đang thúc ép một cuộc đại tu triệt để đối với tính bền vững của hệ thống an sinh xã hội cũng như các tập quán tuyển dụng của doanh nghiệp.',
    sentenceBreakdown: [
      {
        sentence: '日本が直面している少子高齢化は、',
        subject: '少子高齢化 (Hiện tượng già hóa & giảm sinh - được bổ nghĩa bởi mệnh đề "日本が直面している")',
        predicate: 'Làm chủ ngữ chính của cả câu với trợ từ は',
        modifiers: '日本が直面している (Nhật Bản đang đối mặt)',
        particlesExplanation: 'が đánh dấu chủ ngữ của mệnh đề phụ; は làm chủ đề lớn bao quát toàn câu.',
        detailedTranslation: 'Tình trạng già hóa và suy giảm sinh đẻ mà Nhật Bản đang đối mặt...',
      },
      {
        sentence: '単なる人口動態の変化にとどまらず、',
        subject: 'Cụm trạng ngữ biểu thị giới hạn',
        predicate: 'にとどまらず (Không dừng lại ở...)',
        modifiers: '単なる (Đơn thuần)',
        particlesExplanation: 'に đi kèm động từ とどまる mang nghĩa dừng chân tại một mốc cụ thể.',
        detailedTranslation: 'Không chỉ dừng lại ở sự thay đổi dân số thuần túy, mà còn...',
      },
      {
        sentence: '社会保障制度の持続可能性や企業の雇用慣行に対しても抜本的な見直しを迫っている。',
        subject: 'Chủ ngữ ngầm hiểu là thực trạng nêu ở vế trước',
        predicate: '迫っている (Đang hối thúc / ép buộc / đặt ra yêu cầu cấp bách)',
        modifiers: '抜本的な (Mang tính gốc rễ, triệt để)',
        particlesExplanation: 'に対しても (Ngay cả đối với...); を chỉ đối tượng chịu tác động của hành động ép buộc (見直し).',
        detailedTranslation: 'Đang đòi hỏi sự xét lại tận gốc đối với tính bền vững của an sinh và tập quán nhân sự công ty.',
      },
    ],
    quiz: {
      id: 'qdr_01',
      question: 'Theo nội dung đoạn văn, già hóa dân số ở Nhật Bản đang gây ra tác động gì?',
      options: [
        { id: 'a', text: 'Buộc các chính sách an sinh xã hội và chế độ tuyển dụng doanh nghiệp phải cải cách triệt để.', isCorrect: true },
        { id: 'b', text: 'Chỉ làm thay đổi một chút số liệu dân số trong báo cáo thống kê.', isCorrect: false },
        { id: 'c', text: 'Khiến các doanh nghiệp ngừng hoàn toàn việc tuyển dụng người trẻ.', isCorrect: false },
        { id: 'd', text: 'Giúp hệ thống an sinh xã hội trở nên bền vững hơn bao giờ hết.', isCorrect: false },
      ],
      correctExplanation: 'Cụm từ chốt hạ「抜本的な見直しを迫っている」đồng nghĩa với việc bắt buộc phải tiến hành cải cách căn bản và toàn diện.',
      trapAnalysis: 'Bẫy từ khóa: Thí sinh dễ bị đánh lừa bởi chữ「単なる人口動態の変化」nếu không đọc kỹ cấu trúc phủ định「にとどまらず」(không dừng lại ở đó).',
      mnemonicTip: 'Tìm động từ chính ở cuối câu (迫っている) để nắm bắt ý đồ tác giả.',
    },
  },
];

// ==========================================
// 10. TRÌNH DUYỆT TIN TỨC REAL-TIME JLPT
// ==========================================
export const initialNewsList: NewsItem[] = [
  {
    id: 'news_01',
    title: '外国人労働者の受け入れ拡大、新制度「育成就労」が国会で成立',
    source: 'NHK Easy',
    publishedAt: '2026-10-14 09:30 JST',
    summary: 'Nhật Bản chính thức thông qua chế độ "Ikusei Shuro" thay thế Tu nghiệp sinh cũ, mở đường chuyển việc dễ dàng hơn cho người lao động nước ngoài.',
    fullText: '政府は、これまでの「技能実習制度」を発展的に解消し、人材確保と育成を目的とした新たな「育成就労制度」を創設する法案を可決しました。新制度では、一定の日本語能力や技能があれば、同じ職種内での転籍（転職）が認められることになり、外国人材にとってより働きやすい環境の整備が期待されています。',
    vocabularyTags: [
      { word: '創設する', reading: 'そうせつする', meaning: 'Thành lập, sáng lập', level: 'N1' },
      { word: '可決', reading: 'かけつ', meaning: 'Thông qua (luật, nghị quyết)', level: 'N2' },
      { word: '転籍', reading: 'てんせき', meaning: 'Chuyển đổi nơi làm việc/hộ tịch', level: 'N1' },
      { word: '人材確保', reading: 'じんざいかくほ', meaning: 'Đảm bảo nguồn nhân lực', level: 'N2' },
      { word: '職種', reading: 'しょくしゅ', meaning: 'Ngành nghề, chủng loại công việc', level: 'N3' },
    ],
    grammarNotes: 'Cấu trúc「〜ことになり」biểu thị một quyết định mang tính thể chế, tổ chức đưa ra mà cá nhân phải tuân theo.',
    quiz: {
      id: 'qnews_01',
      question: 'Điểm cải tiến mang tính bước ngoặt của chế độ「育成就労」mới là gì?',
      options: [
        { id: 'a', text: 'Cho phép người lao động nước ngoài được chuyển việc (転籍) trong cùng ngành nghề khi đủ điều kiện.', isCorrect: true },
        { id: 'b', text: 'Cấm hoàn toàn việc chuyển công ty trong suốt 10 năm.', isCorrect: false },
        { id: 'c', text: 'Không yêu cầu bất kỳ trình độ tiếng Nhật nào.', isCorrect: false },
        { id: 'd', text: 'Chỉ áp dụng cho người trên 60 tuổi.', isCorrect: false },
      ],
      correctExplanation: 'Trước đây, chế độ Tu nghiệp sinh cũ hầu như không cho phép chuyển việc. Chế độ mới mở ra quyền chuyển công ty (転籍) trong cùng nhóm ngành.',
      trapAnalysis: 'Bẫy đọc nhanh: Có thể nhầm lẫn giữa chế độ cũ (khắt khe) và chế độ mới (nới lỏng chuyển việc).',
      mnemonicTip: '育成就労 = Vừa bồi dưỡng (育成) vừa lao động (就労) có quyền chuyển việc!',
    },
  },
];

// ==========================================
// 11. GÓC ĐỌC HIỂU THỰC DỤNG (HOÁ ĐƠN, HỢP ĐỒNG, ATM)
// ==========================================
export const initialPracticalDocsList: PracticalDocItem[] = [
  {
    id: 'pdoc_01',
    docType: 'Hóa đơn tiền điện/nước',
    title: 'Giấy thông báo kiêm biên lai thu tiền điện Tokyo Gas & Electric',
    mockVisualData: {
      'Tên khách hàng (ご契約者名)': 'グエン ヴァン アン 様',
      'Tháng sử dụng (ご使用年月)': '2026年9月分',
      'Số tiền thanh toán (ご請求金額)': '¥7,842 (Đã bao gồm thuế)',
      'Hạn thanh toán (お支払い期限日)': '2026年10月28日',
      'Mã khách hàng (お客様番号)': '03-9841-5521',
      'Địa điểm thanh toán': 'コンビニ各社・金融機関窓口・PayPayバーコード',
    },
    importantFields: [
      { label: 'Số tiền phải trả', japanese: 'ご請求金額', explanation: 'Con số in to nhất, thường có biểu tượng đồng Yên (¥).', locationTip: 'Góc trên bên phải khung viền đậm.' },
      { label: 'Hạn chót thanh toán', japanese: 'お支払い期限日', explanation: 'Sau ngày này sẽ bị tính lãi phạt hoặc ngắt điện.', locationTip: 'Dưới dòng số tiền yêu cầu.' },
      { label: 'Mã vạch thanh toán', japanese: 'バーコード', explanation: 'Cầm cả tờ giấy nguyên vẹn đưa nhân viên combini quét tít một cái là xong.', locationTip: 'Dưới cùng mép phải tờ giấy.' },
    ],
    quiz: {
      id: 'qpdoc_01',
      question: 'Khi cầm hóa đơn này ra cửa hàng tiện lợi (Combini) nộp tiền, bạn KHÔNG ĐƯỢC làm điều gì?',
      options: [
        { id: 'a', text: 'Tự ý xé rời phần mã vạch hoặc làm rách đường răng cưa trước khi đưa nhân viên.', isCorrect: true },
        { id: 'b', text: 'Mang theo tiền mặt vừa đủ.', isCorrect: false },
        { id: 'c', text: 'Nhận lại cuống biên lai có đóng dấu「領収」của cửa hàng.', isCorrect: false },
        { id: 'd', text: 'Nộp tiền trước ngày 2026年10月28日.', isCorrect: false },
      ],
      correctExplanation: 'Biên lai Nhật Bản quy định nghiêm ngặt: Tuyệt đối không được xé rời phần biên nhận. Nhân viên cửa hàng tiện lợi phải tự tay quét mã vạch và xé đóng dấu xác nhận, nếu xé trước họ sẽ từ chối thu tiền.',
      trapAnalysis: 'Người Việt hay tiện tay xé rời phần tiền nộp để ví, dẫn đến việc máy quét không đọc được mã số liên kết.',
      mnemonicTip: 'Để nguyên tờ giấy phẳng phiu đưa cho nhân viên combini!',
    },
  },
];

// ==========================================
// 12. THỬ THÁCH DỊCH THUẬT CỘNG ĐỒNG & TRẮC NGHIỆM DỊCH
// ==========================================
export const initialTranslationsList: TranslationItem[] = [
  {
    id: 'trans_01',
    originalJapanese: '雨が降れば傘をさすように、困難にぶつかったら素直に対処すればいい。',
    context: 'Triết lý kinh doanh của Matsushita Konosuke (Nhà sáng lập tập đoàn Panasonic).',
    sourceGenre: 'Thương mại',
    options: [
      {
        id: 'opt_a',
        translation: 'Cũng giống như trời mưa thì che ô, khi va vào gian nan cứ thuận theo tự nhiên mà ứng biến bình thản.',
        rating: 'Chuẩn xác & Tự nhiên',
        analysis: 'Bản dịch bắt trọn thần thái "Sunao" (素直 - tâm thế khoáng đạt, không cố chấp, thuận lý trời đất) của nhà đại doanh nhân Nhật.',
      },
      {
        id: 'opt_b',
        translation: 'Nếu mưa rơi thì cầm cái dù, khi đụng khó khăn thì đối xử ngoan ngoãn.',
        rating: 'Quá máy móc',
        analysis: 'Dịch word-by-word sai nghĩa từ「素直」(nghĩ là ngoan ngoãn) làm mất đi vẻ thông tuệ của triết gia.',
      },
      {
        id: 'opt_c',
        translation: 'Trời mưa thì ở nhà, gặp chuyện khó thì bỏ đi.',
        rating: 'Lệch sắc thái',
        analysis: 'Hiểu sai hoàn toàn tinh thần đối diện nghịch cảnh.',
      },
    ],
    masterTip: 'Từ「素直」trong tiếng Nhật kinh doanh không phải là "ngây thơ, ngoan ngoãn" mà là "tâm không định kiến, nhìn thấu bản chất sự việc để hành động chuẩn xác".',
  },
];

// ==========================================
// 13. PHÒNG TẬP SHADOWING & TRỌNG ÂM (PITCH ACCENT)
// ==========================================
export const initialPitchList: PitchItem[] = [
  {
    id: 'pitch_01',
    word: '雨 (Mưa) vs 飴 (Kẹo)',
    reading: 'あめ',
    meaning: 'Hai từ đồng âm dị nghĩa phân biệt bằng cao độ Pitch Accent',
    pitchType: 'Atamadaka (1 - Cao đầu) vs Odaka (Cao cuối)',
    pitchGraph: [1, 0], // Ame (mưa): A cao, me thấp; Ame (kẹo): A thấp, me cao
    audioDescription: '雨 (Mưa) = HẠ GIỌNG NGAY (Á-mè) | 飴 (Kẹo) = LÊN GIỌNG (À-mé)',
    accentTip: 'Mưa từ trên trời rơi XUỐNG nên âm đầu CAO rồi hạ xuống thấp (雨: Á-me). Kẹo cho vào miệng nhai phải há mồm LÊN (飴: A-mé)!',
    quiz: {
      id: 'qpitch_01',
      question: 'Khi muốn nói câu "Trời đang đổ mưa rồi", bạn phải phát âm chữ「あめ」theo cao độ nào?',
      options: [
        { id: 'a', text: 'Cao độ [1] (Atamadaka): Âm [あ] cao vút rồi hạ thấp ở âm [め].', isCorrect: true },
        { id: 'b', text: 'Cao độ [0] (Heiban): Bằng phẳng cả 2 âm.', isCorrect: false },
        { id: 'c', text: 'Âm [あ] thấp, âm [め] cao chót vót.', isCorrect: false },
        { id: 'd', text: 'Nuốt âm không phát âm.', isCorrect: false },
      ],
      correctExplanation: 'Cơn mưa rơi từ trên cao xuống: Nốt đầu tiên [あ] ở nốt Sol, nốt [め] rơi xuống nốt Đô. Nếu phát âm ngược lại sẽ thành "Trời đang rơi kẹo"!',
      trapAnalysis: 'Người Việt nói tiếng có dấu thanh nên dễ nhầm giữa dấu sắc/huyền với quy luật nốt nhạc Pitch Accent.',
      mnemonicTip: 'Mưa rơi xuống dốc = Cao -> Thấp!',
    },
  },
  {
    id: 'pitch_02',
    word: '橋 (Cây cầu) vs 箸 (Đôi đũa)',
    reading: 'はし',
    meaning: 'Cặp từ kinh điển phân biệt ngữ điệu Tokyo',
    pitchType: 'Odaka (Cao cuối) vs Atamadaka (Cao đầu)',
    pitchGraph: [0, 1],
    audioDescription: '箸 (Đũa): Há-shi (Cao đầu) | 橋 (Cầu): Hà-shí (Cao đuôi)',
    accentTip: 'Đũa gắp thức ăn từ trên cao chúi xuống (箸: Cao đầu). Cây cầu bắc ngang vươn sang bờ bên kia (橋: Lên cao dần).',
    quiz: {
      id: 'qpitch_02',
      question: 'Trong nhà hàng, bạn muốn xin nhân viên phục vụ một đôi đũa, bạn nên nói như thế nào?',
      options: [
        { id: 'a', text: 'お箸（お【は】し - âm Ha cao nhất）をいただけますか。', isCorrect: true },
        { id: 'b', text: 'お橋（は【し】 - âm Shi cao nhất）をください。', isCorrect: false },
        { id: 'c', text: 'お端（はし cả hai đều thấp）をください。', isCorrect: false },
        { id: 'd', text: 'Không cần nói gì, chỉ tay vào bàn.', isCorrect: false },
      ],
      correctExplanation: 'Đôi đũa (箸 - Hashi) là từ Atamadaka [1], trọng âm rơi vào âm đầu tiên.',
      trapAnalysis: 'Nếu nhấn cao ở âm cuối sẽ thành ra đòi xin cây cầu mang ra bàn ăn!',
      mnemonicTip: 'Đũa gắp từ trên đỉnh đầu.',
    },
  },
];

// ==========================================
// 14. THƯ VIỆN NGHE "ÂM THANH HIỆN TRƯỜNG"
// ==========================================
export const initialFieldAudioList: FieldAudioItem[] = [
  {
    id: 'fa_01',
    title: 'Thông báo đổi ke tàu hỏa khẩn cấp tại Ga Shinjuku',
    environment: 'Ga tàu Shinjuku',
    ambientNoiseDesc: 'Tiếng còi tàu hú, tiếng bước chân người chạy dồn dập, tiếng rè rè của loa phát thanh công cộng.',
    transcript: 'まもなく、4番線に各駅停車がまいります。なお、強風の影響により、特急列車の発着ホームが【7番線】に変更となりました。ご利用のお客様は階段を渡り、7番線へお急ぎください。',
    filteredKeyTokens: ['強風 (Gió to)', '7番線 (Ke tàu số 7)', '変更 (Thay đổi)', 'お急ぎください (Xin mau chân)'],
    noiseFilterTip: 'Khi nghe loa ga tàu trong môi trường ồn ào, ĐỪNG cố nghe từng từ nối ngữ pháp. Hãy căng tai bắt đúng 2 thông tin cốt tử: [SỐ HIỆU PLATFORM - 番線] và [TỪ KHÓA TRẠNG THÁI: 変更/見合わせ/運休].',
    quiz: {
      id: 'qfa_01',
      question: 'Theo nội dung thông báo trên loa phát thanh, hành khách muốn đi tàu tốc hành (特急) cần phải đến ke số mấy?',
      options: [
        { id: 'a', text: 'Ke số 7 (7番線).', isCorrect: true },
        { id: 'b', text: 'Ke số 4 (4番線).', isCorrect: false },
        { id: 'c', text: 'Ke số 1.', isCorrect: false },
        { id: 'd', text: 'Tất cả các chuyến tàu đều bị hủy.', isCorrect: false },
      ],
      correctExplanation: 'Mặc dù ke 4 có tàu đỗ thông thường, nhưng đoàn tàu tốc hành (特急) đã bị đổi sang ke 7 (7番線に変更となりました).',
      trapAnalysis: 'Bẫy số hiệu ga tàu: Loa đọc số 4 trước để gây nhiễu, nhưng từ khóa quan trọng đi kèm chữ "Thay đổi (変更)" là số 7.',
      mnemonicTip: 'Bắt cặp: Con số đi sát ngay trước chữ "Henkou" (変更) là điểm đến thực tế!',
    },
  },
];

// ==========================================
// 15. THỬ THÁCH CHÉP CHÍNH TẢ (DICTATION LOOP)
// ==========================================
export const initialDictationsList: DictationItem[] = [
  {
    id: 'dict_01',
    level: 'N2',
    dialect: 'Tokyo Tiêu chuẩn',
    speedLevels: ['0.75x', '1.0x', '1.25x'],
    fullSentence: 'そんなこと言ったって、今更どうしようもないじゃないか。',
    reading: 'そんなこといったって、いまさらどうしようもないじゃないか。',
    translation: 'Dù cậu có nói thế đi nữa, thì đến nước này rồi còn làm được gì nữa đâu cơ chứ.',
    maskedSentence: 'そんなこと_______、今更どうしようもないじゃないか。',
    missingWords: '言ったって (いったって)',
    phoneticPhenomenon: 'Hiện tượng nuốt âm và biến âm rút gọn:「言ったとしても」biến thành「言ったって」trong văn nói khẩu ngữ thực tế.',
    listeningTip: 'Cụm [〜たって] thường phát âm rất nhanh lướt qua như một tiếng bật nhẹ.',
  },
  {
    id: 'dict_02',
    level: 'N3',
    dialect: 'Kansai-ben',
    speedLevels: ['0.75x', '1.0x', '1.25x'],
    fullSentence: 'それ、ほんまに言うてんの？信じられへんわ。',
    reading: 'それ、ほんまにいうてんの？しんじられへんわ。',
    translation: 'Cái đó cậu nói thật đấy à? Không tài nào tin nổi luôn á.',
    maskedSentence: 'それ、ほんまに_______？信じられへんわ。',
    missingWords: '言うてんの (いうてんの)',
    phoneticPhenomenon: 'Kansai-ben: Biến thể âm「言っているの」chuyển thành「言うてんの」và phủ định「信じられない」chuyển thành「信じられへん」.',
    listeningTip: 'Đuôi phủ định Hen (へん) là đặc sản của vùng Osaka/Kyoto thay cho Nai (ない).',
  },
];

// ==========================================
// 16. AI ROLEPLAY SINH TỒN ĐA NHÁNH
// ==========================================
export const initialRoleplayScenarios: RoleplayScenario[] = [
  {
    id: 'rp_01',
    title: 'Phỏng vấn Baito: Đối mặt câu hỏi bẫy về ca làm việc',
    setting: 'Phỏng vấn Baito',
    characterName: 'Quản lý cửa hàng (店長 - Sato)',
    characterRole: 'Quản lý cửa hàng tiện lợi nghiêm khắc nhưng công bằng',
    initialMessage: '履歴書を拝見しました。志望動機は分かりましたが、うちは年末年始や土日もかなり忙しいです。シフトに入ってもらうことは可能ですか？',
    suddenEvents: [
      'Biến cố 1: Quản lý cau mày: "Thế nếu đột xuất bạn cùng ca bị ốm lúc 11h đêm thì em có chạy đến làm thay được không?"',
      'Biến cố 2: Khách ở quầy ngoài làm vỡ chai rượu vang lớn, quản lý liếc nhìn thái độ phản ứng của bạn.',
      'Biến cố 3: Quản lý hỏi gài: "Nếu lỡ thối nhầm tiền thừa cho khách thì em sẽ tự bỏ tiền túi bù vào hay báo anh?"',
    ],
    options: [
      {
        id: 'opt_1',
        text: 'はい、基本的に土日のシフトは問題ありません。年末年始についても事前に相談させていただければ、できる限り柔軟に協力いたします。',
        isPoliteAndEffective: true,
        culturalFeedback: 'Câu trả lời điểm 10: Vừa thể hiện tinh thần nhiệt huyết muốn cống hiến, vừa trung thực thông minh khi chừa khoảng lùi「事前に相談」(trao đổi trước) chứ không hứa bừa.',
        senpaiTip: 'Đừng bao giờ nói "100% ngày nào em cũng làm được", người Nhật sẽ đánh giá bạn nói dối hoặc thiếu kế hoạch học tập.',
      },
      {
        id: 'opt_2',
        text: '土日は遊びたいので絶対無理です。平日の昼間だけならいいですよ。',
        isPoliteAndEffective: false,
        culturalFeedback: 'Thẳng thắn quá mức thành ra vô lễ và thiếu tôn trọng tính chất công việc dịch vụ.',
        senpaiTip: 'Nếu không làm được cuối tuần, cần nêu lý do chính đáng như "lịch học ở trường" chứ không dùng từ "đi chơi".',
      },
    ],
  },
];

// ==========================================
// 17. PHÒNG TRANH BIỆN AI
// ==========================================
export const initialDebateTopics: DebateTopic[] = [
  {
    id: 'deb_01',
    title: 'Chế độ làm việc ngoài giờ (Zangyo) tại các công ty Nhật: Nét văn hóa đoàn kết hay áp lực độc hại?',
    category: 'Lao động',
    perspectives: [
      {
        stance: 'Ủng hộ (Tán thành)',
        argument: 'Làm thêm giờ phản ánh tinh thần trách nhiệm tập thể cao (連帯感). Khi dự án gặp khủng hoảng, việc toàn đội ngũ cùng ở lại sát cánh hỗ trợ lẫn nhau giúp gắn kết tinh thần đồng đội và hoàn thành chỉ tiêu đúng hạn.',
        keyCounterPoints: [
          'Tăng năng suất trong các đợt cao điểm dự án ngắn hạn.',
          'Rèn luyện tính kỷ luật và sự cam kết lâu dài với tổ chức.',
        ],
        usefulTransitionWords: [
          { word: '確かに〜が、', meaning: 'Đúng là... nhưng mà,', usageRule: 'Thừa nhận quan điểm đối phương trước khi phản bác.' },
          { word: '〜の観点から見れば、', meaning: 'Nếu nhìn từ góc độ...', usageRule: 'Chuyển dịch trọng tâm lập luận sang khía cạnh mới.' },
        ],
      },
      {
        stance: 'Phản đối (Gay gắt)',
        argument: 'Zangyo kéo dài dẫn tới hiện tượng chết vì kiệt sức (Karoshi), triệt tiêu khả năng sáng tạo và giảm sút nghiêm trọng tỷ lệ sinh của quốc gia do người trẻ không còn thời gian hẹn hò chăm sóc gia đình.',
        keyCounterPoints: [
          'Nhiều người ngồi lại chỉ để "Zangyo giả vờ" vì ngại về trước sếp (付き合い残業).',
          'Năng suất tính theo giờ thực tế của lao động Nhật thấp nhất trong khối G7.',
        ],
        usefulTransitionWords: [
          { word: 'それに対して、', meaning: 'Ngược lại với điều đó,', usageRule: 'Đưa ra bằng chứng đối lập trực diện.' },
          { word: '要するに、', meaning: 'Tóm lại là,', usageRule: 'Chốt hạ luận điểm cốt tử để chiếm ưu thế.' },
        ],
      },
    ],
    quiz: {
      id: 'qdeb_01',
      question: 'Khi tranh luận bằng tiếng Nhật, mẫu câu nào giúp bạn vừa câu giờ suy nghĩ vừa không làm mất đi vẻ hòa nhã lịch thiệp?',
      options: [
        { id: 'a', text: '「ご指摘の点は重々承知しておりますが、一方で〜という側面も看過できません。」', isCorrect: true },
        { id: 'b', text: '「お前の言ってること意味不明。」', isCorrect: false },
        { id: 'c', text: '「はいはい、もういいです。」', isCorrect: false },
        { id: 'd', text: '「黙ってください。」', isCorrect: false },
      ],
      correctExplanation: 'Mẫu câu「ご指摘の点は重々承知しておりますが...」(Tôi hoàn toàn thấu hiểu điểm ngài vừa nêu, tuy nhiên ở mặt khác...) là vũ khí tối thượng của nghệ thuật đàm phán Nhật Bản: Vừa tôn trọng đối phương, vừa lật ngược tình thế.',
      trapAnalysis: 'Tuyệt đối không dùng các từ bác bỏ thô bạo mang tính công kích cá nhân.',
      mnemonicTip: 'Nhập gia tùy tục: Khen ngợi góc nhìn của đối phương trước khi tung đòn phản biện!',
    },
  },
];

// ==========================================
// 18. GÓC KẾT NỐI SENPAI - KOUHAI (AI SENPAI)
// ==========================================
export const initialSenpaiList: SenpaiQuestion[] = [
  {
    id: 'sp_01',
    kouhaiQuery: 'Em mới vào công ty được 2 tuần. Mỗi lần đi ăn trưa cùng phòng, các anh chị người Nhật toàn tranh nhau trả tiền hoặc chia đều đến từng Yên một (Warikan). Em nên xử sự thế nào để không bị coi là tham lam hay lạc lõng ạ?',
    workContext: 'Văn hóa ăn uống trưa công sở Nhật & Tiền bạc',
    senpaiAdvice: 'Chào em! Đây là tình huống kinh điển của lính mới. Hãy nhớ 2 quy tắc bất di bất dịch:\n1. Nếu là sếp hoặc tiền bối bao (Ogorare): Hãy luôn chủ động móc ví ra làm động tác "em xin phép chia tiền". Khi sếp bảo "Hôm nay tôi đãi", hãy cúi đầu cảm ơn chân thành「ごちそうさまでした！」, và sáng hôm sau khi gặp lại ở công ty, HÃY CẢM ƠN THÊM MỘT LẦN NỮA:「昨日はごちそうになり、本当にありがとうございました！」. Đây là chiêu ghi điểm tuyệt đối!\n2. Nếu chia đều (Warikan): Luôn chuẩn bị sẵn tiền lẻ 100 Yên và 1,000 Yên trong ví để đưa đúng số tiền, tránh đưa tờ 10,000 Yên bắt người thu phải đi đổi.',
    workplaceRule: 'Quy tắc "Cảm ơn 2 lần" (翌朝のお礼): Bữa ăn được bao hôm trước phải được cảm ơn lại vào sáng ngày hôm sau.',
    quiz: {
      id: 'qsp_01',
      question: 'Sáng hôm sau khi bước vào văn phòng, câu đầu tiên bạn nên nói khi chạm mặt người tiền bối đã bao bạn bữa trưa hôm qua là gì?',
      options: [
        { id: 'a', text: '「先輩、おはようございます！昨日は美味しいお昼をごちそうさまでした！」', isCorrect: true },
        { id: 'b', text: '「おはよう、今日もおごってね。」', isCorrect: false },
        { id: 'c', text: '「昨日はラーメンまずかったですね。」', isCorrect: false },
        { id: 'd', text: 'Lờ đi như không có chuyện gì xảy ra.', isCorrect: false },
      ],
      correctExplanation: 'Người Nhật cực kỳ coi trọng lời cảm ơn sáng hôm sau. Việc nhắc lại bữa ăn hôm qua cho thấy bạn trân trọng tấm lòng của họ và là người chu đáo có giáo dưỡng.',
      trapAnalysis: 'Rất nhiều bạn chỉ cảm ơn tại quán lúc ra về, sáng hôm sau im lặng làm tiền bối hụt hẫng.',
      mnemonicTip: 'Nhớ như in: 1 lần tại quán + 1 lần sáng hôm sau!',
    },
  },
];

// ==========================================
// 19. TRỢ LÝ LUYỆN VIẾT KÍNH NGỮ & EMAIL
// ==========================================
export const initialKeigoEmailList: KeigoEmailItem[] = [
  {
    id: 'keigo_01',
    recipientRole: 'Khách hàng đối tác (Soto)',
    casualOrWrongVersion: '「明日、資料を持って行きますので、見てください。」',
    problemAnalysis: 'Dùng từ bình dân「持って行く」và thể sai khiến trực tiếp thô thiển「見てください」khiến khách hàng cảm thấy bị ra lệnh và hạ thấp vị thế.',
    correctSonkeigoOrKenjougo: '「明日、資料をご持参いたしますので、ご査収いただけますと幸甚に存じます。」(hoặc「ご確認のほどよろしくお願い申し上げます。」)',
    transformationFormula: 'Mang đi (Mình làm - Khiêm nhường) -> 持参いたします / お持ちいたします\nXem giúp (Khách làm - Tôn kính) -> ご確認いただけますでしょうか / ご査収ください',
    quiz: {
      id: 'qkeigo_01',
      question: 'Trong email gửi cho đối tác bên ngoài, câu nào sau đây biến đổi chuẩn xác nhất ý "Tôi đã gửi đính kèm bản kế hoạch, anh hãy xem nhé"?',
      options: [
        { id: 'a', text: '企画書を添付いたしましたので、ご査収のほどよろしくお願い申し上げます。', isCorrect: true },
        { id: 'b', text: '企画書を添付したから、早く見てね。', isCorrect: false },
        { id: 'c', text: '企画書を添付してあげました。', isCorrect: false },
        { id: 'd', text: '企画書を見てごらんなさい。', isCorrect: false },
      ],
      correctExplanation: 'Cụm từ「ご査収のほどよろしくお願い申し上げます」(Kính mong quý đối tác kiểm tra và nhận tài liệu) là cấu trúc chuẩn chỉ 100% trong thư tín thương mại Nhật.',
      trapAnalysis: 'Bẫy tuyệt đối: Tránh dùng「〜してあげました」(mang tính ban ơn trịch thượng).',
      mnemonicTip: 'Tài liệu đính kèm gửi khách = "ご査収 (Go-sashu) của lòng thành".',
    },
  },
];

// ==========================================
// 20. KHO XỬ LÝ TÌNH HUỐNG HO-REN-SO VÔ TẬN
// ==========================================
export const initialHorensoList: HorensoScenario[] = [
  {
    id: 'hr_01',
    title: 'Phát hiện sai sót hợp đồng 30 phút trước giờ ký kết',
    violationType: 'Hōkoku (Báo cáo muộn/sai thứ tự)',
    scenarioNarrative: 'Bạn phát hiện ra con số đơn giá trên hợp đồng in sai làm thất thoát 15 triệu Yên. Vì sợ sếp mắng, bạn tự mình hì hục liên hệ bên in ấn sửa chữa. Đến sát giờ ký hợp đồng, phía in ấn báo máy hỏng không sửa kịp. Lúc này bạn mới chạy đến báo sếp.',
    bossReaction: 'Sếp đập bàn tức giận: "Tại sao phát hiện từ 2 tiếng trước mà bây giờ mới nói?! Nếu báo ngay từ đầu thì công ty đã kịp hoãn giờ họp hoặc điều chỉnh lại!".',
    properProtocol: 'Quy tắc Bad News First (Tin xấu báo trước): Ngay khi có rủi ro phát sinh, phải lập tức chạy đến báo cáo sếp theo thứ tự: Kết luận -> Thiệt hại ước tính -> Phương án đề xuất xử lý.',
    goldenRuleTip: 'Báo cáo ngay lúc cháy nhỏ, đừng đợi cháy rụi cả tòa nhà mới gọi cứu hỏa!',
    quiz: {
      id: 'qhr_01',
      question: 'Khi xảy ra sự cố nghiêm trọng, cách mở đầu câu Báo cáo (Hōkoku) chuẩn chỉnh nhất với cấp trên là gì?',
      options: [
        { id: 'a', text: '「部長、大変申し訳ございません。緊急でご報告とご相談したいトラブルがございます。今お時間よろしいでしょうか。」', isCorrect: true },
        { id: 'b', text: '「あ、部長。ちょっとしたミスがあったんですけど、まあ大丈夫だと思います。」', isCorrect: false },
        { id: 'c', text: 'Im lặng đợi sếp tự phát hiện ra.', isCorrect: false },
        { id: 'd', text: 'Gửi một email dài và tắt máy ra về.', isCorrect: false },
      ],
      correctExplanation: 'Phải nói rõ tính chất khẩn cấp (緊急) và xin phép 1 phút ngắt quãng công việc của sếp, sau đó nói thẳng vào kết quả sự cố chứ không vòng vo giải thích lý do trước.',
      trapAnalysis: 'Người học hay mắc lỗi nói vòng vo giải thích "tại vì, thì là" khiến sếp phát cáu vì không hiểu chuyện gì đã xảy ra.',
      mnemonicTip: 'Nắm chắc công thức: Tin xấu + Khẩn cấp + Nói kết luận trước!',
    },
  },
];

// ==========================================
// 21. SỔ TAY VĂN HÓA & KHỦNG HOẢNG DOANH NGHIỆP
// ==========================================
export const initialCrisisList: CorporateCrisisItem[] = [
  {
    id: 'cr_01',
    title: 'Vị trí ghế Thượng tọa (Kamiza) và Hạ tọa (Shimoza) trong xe Taxi',
    category: 'Vị trí ngồi (Kamiza/Shimoza)',
    diagramType: 'taxi',
    scenario: 'Bạn cùng Giám đốc (Shacho), Trưởng phòng (Bucho) và đối tác bước lên xe taxi 4 chỗ đi tiếp khách. Bạn phải chọn vị trí ngồi nào để thể hiện sự am hiểu quy chuẩn công sở bậc nhất?',
    correctAction: 'Bạn là người có cấp bậc thấp nhất (hoặc là chủ nhà) -> BẮT BUỘC PHẢI NGỒI GHẾ PHỤ CẠNH TÀI XẾ (Shimoza).',
    spatialRules: [
      'Ghế 1 (Kamiza - Thượng vị cao quý nhất): Ghế sau lưng tài xế (an toàn nhất khi có va chạm). Dành cho Khách hàng hoặc Giám đốc.',
      'Ghế 2: Ghế sau bên phải (sát cửa bên kia). Dành cho Trưởng phòng.',
      'Ghế 3: Ghế chính giữa ở hàng sau (chật chội, bất tiện nhất ở hàng sau).',
      'Ghế 4 (Shimoza - Hạ vị): Ghế phụ bên cạnh bác tài. Dành cho người có chức vụ thấp nhất để làm nhiệm vụ: chỉ đường, nói điểm đến, mở cửa và trả tiền thanh toán cước xe.',
    ],
    mnemonicRule: 'Quy tắc ngón tay: Cạnh tài xế = "Người phục vụ cầm ví điều phối"!',
    quiz: {
      id: 'qcr_01',
      question: 'Tại sao người có chức vụ thấp nhất lại phải ngồi ghế phụ cạnh tài xế trong taxi?',
      options: [
        { id: 'a', text: 'Để trao đổi lộ trình với tài xế, thanh toán tiền và sẵn sàng xuống xe mở cửa cho cấp trên.', isCorrect: true },
        { id: 'b', text: 'Vì ghế đó êm ái nhất.', isCorrect: false },
        { id: 'c', text: 'Vì tài xế thích nói chuyện với người trẻ.', isCorrect: false },
        { id: 'd', text: 'Để bấm còi thay tài xế.', isCorrect: false },
      ],
      correctExplanation: 'Vị trí cạnh tài xế là vị trí làm việc (Action seat). Người ngồi đây phải chủ động toàn bộ các khâu hậu cần di chuyển.',
      trapAnalysis: 'Rất nhiều tân binh vội vàng nhảy tót vào băng ghế sau ngồi cùng sếp lớn, để sếp phải ngồi ghế phụ trả tiền taxi, dẫn tới mất điểm trầm trọng.',
      mnemonicTip: 'Ghế phụ = Ghế hậu cần!',
    },
  },
  {
    id: 'cr_02',
    title: 'Nghi thức trao đổi Danh thiếp (Meishi Koukan) đỉnh cao',
    category: 'Quy tắc Danh thiếp (Meishi)',
    diagramType: 'meishi_flow',
    scenario: 'Bạn lần đầu gặp đối tác quan trọng tại buổi đàm phán hợp đồng. Nghi thức cầm và trao danh thiếp diễn ra như thế nào?',
    correctAction: 'Cầm danh thiếp bằng 2 tay ở hai góc dưới, hướng chữ xuôi theo chiều mắt đối tác đọc được, đặt thấp hơn danh thiếp của đối tác một chút.',
    spatialRules: [
      'Tuyệt đối không để ngón tay che mất logo hoặc tên công ty đối tác.',
      'Trao bằng 2 tay, nhận bằng 2 tay kèm câu:「頂戴いたします (Tôi xin phép được nhận ạ)」.',
      'Khi ngồi vào bàn họp, xếp danh thiếp của khách lên trên hộp đựng danh thiếp của mình, tuyệt đối không nhét ngay vào túi quần.',
    ],
    mnemonicRule: 'Danh thiếp là "Khuôn mặt của đối tác" - Hạ thấp tay mình để nâng tầm người khác!',
    quiz: {
      id: 'qcr_02',
      question: 'Hành vi nào bị coi là đại cấm kỵ (Taboo) xúc phạm đối phương khi nhận danh thiếp của người Nhật?',
      options: [
        { id: 'a', text: 'Dùng bút viết ghi chú trực tiếp lên danh thiếp trước mặt họ hoặc nhét ngay vào túi quần sau.', isCorrect: true },
        { id: 'b', text: 'Nhận bằng 2 tay và cúi đầu cảm ơn.', isCorrect: false },
        { id: 'c', text: 'Đọc to tên đối tác để xác nhận lại cách đọc chuẩn xác.', isCorrect: false },
        { id: 'd', text: 'Đặt danh thiếp ngay ngắn trên bàn họp phía bên trái.', isCorrect: false },
      ],
      correctExplanation: 'Danh thiếp của người Nhật được coi như linh hồn và thể diện của họ. Viết lên mặt họ hoặc nhét xuống túi quần mông ngồi đè lên bị coi là hành vi sỉ nhục.',
      trapAnalysis: 'Người phương Tây thường ghi số điện thoại hay ghi chú thẳng lên namecard, nhưng ở Nhật phải đợi về chỗ riêng mới được ghi chép.',
      mnemonicTip: 'Danh thiếp = Thể diện. Kính cẩn nâng niu bằng cả hai tay!',
    },
  },
];

// ==========================================
// 21. QUẢN TRỊ DỰ ÁN & KHỦNG HOẢNG HẬU CẦN (LOGISTICS)
// ==========================================
export const initialLogisticsList: LogisticsCrisisItem[] = [
  {
    id: 'log_01',
    projectName: 'Triển lãm Công nghệ Tokyo Tech Expo 2026',
    role: 'Trưởng ban Điều phối Dự án & Hậu cần',
    crisisType: 'Chậm tiến độ giao hàng',
    scenario: '18h tối hôm trước ngày khai mạc triển lãm, đơn vị vận tải đối tác thông báo xe tải chở toàn bộ màn hình LED và gian hàng mẫu gặp tai nạn kẹt xe trên cao tốc Tomei, không thể kịp giao hàng vào lúc 20h như hợp đồng.',
    suddenEvents: [
      'Biến cố 1: Ban quản lý tòa nhà Tokyo Big Sight thông báo sau 22h00 sẽ ngắt toàn bộ điện thang máy chở hàng.',
      'Biến cố 2: Giám đốc đối tác lớn ghé thăm sớm lúc 8h sáng mai.',
      'Biến cố 3: Đơn vị vận tải dự phòng đòi tăng giá gấp 3 lần cho ca đêm khẩn cấp.',
    ],
    prioritySteps: [
      { step: 1, action: 'Báo cáo khẩn cấp cho Sếp/Trưởng dự án về tình hình thực tế, thời gian trễ ước tính và 2 phương án đối ứng.', rationale: 'Nguyên tắc Bad News First: Tuyệt đối không giấu sự cố để tự xoay xở khi thời gian cạn kiệt.' },
      { step: 2, action: 'Đàm phán với Ban quản lý hội chợ xin giấy phép thi công ca đêm đặc biệt (深夜作業届).', rationale: 'Đảm bảo pháp lý mặt bằng trước khi điều động nhân lực.' },
      { step: 3, action: 'Kích hoạt kho hàng đối tác dự phòng tại khu vực Kanto để thuê màn hình thay thế tạm thời.', rationale: 'Ưu tiên tối thượng là diện mạo gian hàng phải hoàn thành trước 8h sáng mai.' },
    ],
    japaneseCrisisPhrases: [
      { phrase: '不測の事態が発生いたしました。', meaning: 'Đã xảy ra một sự cố ngoài dự liệu.', situation: 'Mở đầu khi báo cáo khẩn với ban giám đốc.' },
      { phrase: '最悪の事態を想定し、代替案（プランB）をご提案いたします。', meaning: 'Dự trù kịch bản xấu nhất, chúng tôi xin đề xuất phương án thay thế.', situation: 'Trấn an các bên liên quan bằng hành động cụ thể.' },
    ],
    quiz: {
      id: 'qlog_01',
      question: 'Khi đối tác logistics báo hàng bị trễ nghiêm trọng sát giờ G, phản xạ đầu tiên của quản lý dự án người Nhật là gì?',
      options: [
        { id: 'a', text: 'Báo cáo ngay cho các bên liên quan, xác định mốc giờ tệ nhất (Worst-case) và kích hoạt phương án dự phòng (Plan B).', isCorrect: true },
        { id: 'b', text: 'Chờ đợi thêm 3 tiếng nữa xem xe có thông đường không rồi mới tính.', isCorrect: false },
        { id: 'c', text: 'Gọi điện mắng chửi tài xế xối xả.', isCorrect: false },
        { id: 'd', text: 'Tắt điện thoại đi ngủ để mai tính tiếp.', isCorrect: false },
      ],
      correctExplanation: 'Quản trị rủi ro Nhật Bản (Kiki Kanri) dựa trên việc chấp nhận kịch bản xấu nhất sớm nhất có thể để ngăn chặn thiệt hại dây chuyền.',
      trapAnalysis: 'Rất nhiều người chần chừ hy vọng phép màu, làm mất đi "khung giờ vàng" để thuê đối tác thay thế.',
      mnemonicTip: 'Tư duy Samurai: Chuẩn bị cho tình huống xấu nhất trước tiên!',
    },
  },
];

// ==========================================
// 22. LẬP KẾ HOẠCH SDGs & CSR DOANH NGHIỆP
// ==========================================
export const initialSdgsList: SdgsCsrItem[] = [
  {
    id: 'sdg_01',
    businessCase: 'Đề xuất dự án chuyển đổi vật liệu bao bì nhựa combini sang polyme sinh học từ bã mía',
    targetSdgsGoal: { number: 12, name: 'Sản xuất và tiêu dùng có trách nhiệm (つくる責任 つかう責任)', icon: '♻️' },
    proposalStructure: [
      { section: '1. Bối cảnh & Tính cấp thiết (背景・課題)', content: 'Quy định siết chặt rác thải nhựa đại dương của chính phủ Nhật Bản và áp lực ESG từ các quỹ đầu tư quốc tế.', keyKango: '持続可能性 (Tính bền vững) / 循環型社会 (Xã hội tuần hoàn)' },
      { section: '2. Giải pháp kỹ thuật & Đối tác (施策内容)', content: 'Hợp tác cùng viện nghiên cứu nông nghiệp tái chế bã mía thành khay cơm bento tự hủy.', keyKango: '生分解性 (Tự phân hủy sinh học) / 脱炭素 (Phi carbon)' },
      { section: '3. Hiệu quả kinh tế & Xã hội (期待される効果)', content: 'Cắt giảm 45% khí thải CO2, nâng hạng chỉ số tín nhiệm CSR của thương hiệu lên top đầu ngành bán lẻ.', keyKango: '企業価値の向上 (Nâng cao giá trị doanh nghiệp)' },
    ],
    academicBizVocabulary: [
      { word: '持続可能性', reading: 'じぞくかのうせい', meaning: 'Tính bền vững (Sustainability)' },
      { word: '循環型経済', reading: 'じゅんかんがたけいざい', meaning: 'Kinh tế tuần hoàn (Circular Economy)' },
      { word: '社会的責任', reading: 'しゃかいてきせきにん', meaning: 'Trách nhiệm xã hội (CSR)' },
    ],
    quiz: {
      id: 'qsdg_01',
      question: 'Trong bản đề xuất (Kikakusho) gửi Ban Giám đốc Nhật Bản về dự án môi trường, cụm từ nào mang sức nặng thuyết phục kinh doanh nhất?',
      options: [
        { id: 'a', text: '「ESG投資の呼び込みと企業ブランド価値の抜本的向上」(Thu hút quỹ đầu tư ESG và nâng cao triệt để giá trị thương hiệu)', isCorrect: true },
        { id: 'b', text: '「ただ地球を救いたいだけです」(Em chỉ muốn cứu trái đất thôi)', isCorrect: false },
        { id: 'c', text: '「お金はかかりますが気にしないでください」(Tốn tiền nhưng đừng bận tâm)', isCorrect: false },
        { id: 'd', text: '「流行っているからやってみましょう」(Thấy đang trend nên làm thử xem sao)', isCorrect: false },
      ],
      correctExplanation: 'Các tập đoàn Nhật rất coi trọng SDGs nhưng phải đi liền với bài toán kinh tế thực tế: Thu hút nguồn vốn đầu tư bền vững (ESG) và nâng cao vị thế thương hiệu.',
      trapAnalysis: 'Bẫy lý tưởng suông: Đề xuất CSR không chỉ nói về lòng tốt đạo đức mà phải gắn liền với bài toán giá trị dài hạn của doanh nghiệp.',
      mnemonicTip: 'SDGs thành công = Đạo đức xã hội + Lợi ích kinh tế!',
    },
  },
];

// ==========================================
// 23. NGHỆ THUẬT ĐÀM PHÁN B2B & TỪ ĐỆM (KUSHON-KOTOBA)
// ==========================================
export const initialKushonList: KushonNegotiationItem[] = [
  {
    id: 'kush_01',
    partnerDemand: 'Đối tác lớn yêu cầu: "Nếu không giảm giá 20% và rút ngắn thời hạn bàn giao thêm 2 tuần, chúng tôi sẽ hủy đàm phán hợp đồng năm nay".',
    conflictType: 'Ép hạ giá 20%',
    kushonKotobaList: [
      { phrase: '恐れ入りますが、', reading: 'おそれいりますが、', meaning: 'Thật vô cùng áy náy mạo muội nhưng...', nuance: 'Dùng khi muốn nhờ vả hoặc bắt đầu nêu điều khó xử.' },
      { phrase: '大変心苦しいのですが、', reading: 'たいへんこころぐるしいのですが、', meaning: 'Chúng tôi vô cùng đau lòng và trăn trở nhưng...', nuance: 'Dùng khi buộc phải từ chối một yêu cầu của khách hàng quan trọng.' },
      { phrase: 'ご意向に添えず誠に申し訳ございません。', reading: 'ごいこうにそえずまことにもうしわけございません。', meaning: 'Thành thật tạ lỗi vì không thể làm theo đúng ý nguyện của quý đối tác.', nuance: 'Lời từ chối lịch thiệp giữ trọn sự tôn trọng.' },
      { phrase: '私どもの力不足で、', reading: 'わたくしどものちからぶそくで、', meaning: 'Do năng lực chúng tôi còn nhiều thiếu sót nên...', nuance: 'Nhận lỗi về sự giới hạn của bản thân để đối phương không mất mặt.' },
    ],
    refusalStrategy: 'Không bao giờ nói từ "Không được / Đắt quá / Không thể" (できません). Hãy dùng Kushon-kotoba lót đệm trước, sau đó đưa ra phương án nhượng bộ bù trừ (Option Trade-off): "Nếu giữ nguyên giá thì chúng tôi sẽ tặng kèm gói bảo trì 1 năm miễn phí".',
    diplomaticResponse: '「大変心苦しい限りではございますが、原材料高騰の折、20％のお値引きは私どもの力不足によりご期待に添いかねます。しかしながら、もし現行価格でご容赦いただけるのであれば、初年度の保守サポート（300万円相当）を無償付帯させていただく所存でございます。何卒ご高配を賜りますようお願い申し上げます。」',
    quiz: {
      id: 'qkush_01',
      question: 'Khi muốn mở lời từ chối một yêu cầu ép giá vô lý từ đối tác Nhật mà không làm vỡ hòa khí (和 - Wa), từ đệm (Kushon-kotoba) nào chuẩn mực nhất?',
      options: [
        { id: 'a', text: '「誠に心苦しい限りではございますが、私どもの力不足によりご期待に添いかねます。」', isCorrect: true },
        { id: 'b', text: '「それは無理です。断ります。」(Cái đó vô lý, tôi từ chối)', isCorrect: false },
        { id: 'c', text: '「そんな無茶を言うなら他社に行ってください。」(Ép thế thì sang công ty khác mà mua)', isCorrect: false },
        { id: 'd', text: '「絶対に嫌です。」(Tuyệt đối không thích)', isCorrect: false },
      ],
      correctExplanation: 'Nghệ thuật đàm phán Nhật: Nhận sự bất lực về mình (私どもの力不足) và bày tỏ nỗi xót xa (心苦しい限り) để xoa dịu cái tôi đối tác trước khi giữ vững nguyên tắc tài chính.',
      trapAnalysis: 'Nói từ「無理です」hoặc「できません」bị coi là lời tạt gáo nước lạnh, phá vỡ mối quan hệ làm ăn lâu dài.',
      mnemonicTip: 'Gối đệm êm ái trước khi từ chối: Hạ mình nhận thiếu sót!',
    },
  },
];

// ==========================================
// 24. TRÌNH GIẢ LẬP GIAO DIỆN "VĂN PHÒNG ẢO" (VIRTUAL WORKSPACE)
// ==========================================
export const initialVirtualWorkspaceList: VirtualWorkspaceItem[] = [
  {
    id: 'vw_01',
    taskType: 'Soạn thảo email Outlook/Gmail',
    title: 'Gửi thư báo cáo tiến độ dự án tuần (WSR) cho Ban Giám đốc',
    mockWorkspaceData: {
      sender: 'nguyen.an@cyber-tokyo.co.jp',
      recipient: 'yamada.taro.director@cyber-tokyo.co.jp',
      subject: '【週次進捗報告】AI基幹システム刷新プロジェクト（2026/10/14付）',
      bodyContent: '山田常務\n\nお疲れ様です。開発部のグエンです。\n表題の件につきまして、今週の進捗状況を以下の通りご報告申し上げます。\n\n【今週の実績】\n・データベース移行テスト：100％完了（重大な不具合なし）\n・UIモックアップ承認：完了\n\n【来週の予定】\n・負荷耐性テストの実施\n\n何卒よろしくお願い申し上げます。',
    },
    japaneseFormattingRules: [
      'Quy tắc tiêu đề: Luôn đặt thẻ nhận diện trong ngoặc vuông lớn kiểu Nhật 【件名】 để người bận rộn lọc thư trong 1 giây.',
      'Dòng đầu tiên: Tên người nhận + Chức danh (山田常務), cách 1 dòng mới đến lời chào「お疲れ様です。」.',
      'Sử dụng các dấu chấm đầu dòng hình học kiểu Nhật (・) thay vì gạch đầu dòng lộn xộn.',
    ],
    quiz: {
      id: 'qvw_01',
      question: 'Tiêu đề email công việc nào sau đây tuân thủ chuẩn mực thư tín thương mại Nhật Bản (Business Email) nhất?',
      options: [
        { id: 'a', text: '【進捗報告】新製品マーケティング計画の件（グエン）', isCorrect: true },
        { id: 'b', text: 'こんにちは！進捗です！(Chào, tiến độ đây!)', isCorrect: false },
        { id: 'c', text: 'Important! Please check asap! (Gấp kiểm tra ngay)', isCorrect: false },
        { id: 'd', text: 'Không để tiêu đề gì cả.', isCorrect: false },
      ],
      correctExplanation: 'Chuẩn email Nhật: Bắt buộc có ngoặc vuông phân loại 【進捗報告】, nội dung ngắn gọn và tên người gửi ở cuối để sếp phân loại hàng trăm email mỗi ngày.',
      trapAnalysis: 'Đặt tiêu đề quá chung chung như "Gửi anh", "Báo cáo" khiến email dễ bị trôi vào hộp thư rác hoặc bị đánh giá là thiếu chuyên nghiệp.',
      mnemonicTip: 'Tiêu đề chuẩn = 【Thẻ loại】 + Nội dung cốt lõi + （Tên người gửi）!',
    },
  },
];

// ==========================================
// 25. SỔ TAY NGHI THỨC & XỬ LÝ TÌNH HUỐNG VĂN PHÒNG
// ==========================================
export const initialOfficeEtiquetteList: OfficeEtiquetteItem[] = [
  {
    id: 'eti_01',
    etiquetteType: 'Cúi chào (Ojigi 15-30-45)',
    title: 'Phân biệt 3 góc độ cúi chào chuẩn Shado: 15° (Eshaku), 30° (Keirei), 45° (Saikeirei)',
    actionGuideline: 'Cúi người từ phần hông, giữ thẳng lưng, mắt nhìn xuống sàn cách mũi chân khoảng 1.5m - 2m. Đếm thầm: 1 nhịp cúi xuống, giữ lại 1 giây, 2 nhịp từ từ ngẩng lên.',
    visualGraphicDesc: 'Góc 15 độ (Eshaku - Hội túc): Chào đồng nghiệp ở hành lang. Góc 30 độ (Keirei - Kính lễ): Chào khách hàng và cấp trên lúc gặp mặt. Góc 45 độ (Saikeirei - Tối kính lễ): Tạ lỗi sâu sắc hoặc cảm tạ tri ân khách hàng lớn.',
    geometricRules: [
      '15° (Eshaku): Mắt nhìn cách 1.5m. Dùng khi chạm mặt ở hành lang, thang máy.',
      '30° (Keirei): Mắt nhìn cách 1m. Góc chào phổ biến nhất trong phòng họp tiếp khách.',
      '45° (Saikeirei): Mắt nhìn ngay mũi chân. Dùng khi xin lỗi vì sự cố hoặc tạ ơn đặc biệt.',
    ],
    quiz: {
      id: 'qeti_01',
      question: 'Khi vô tình chạm mặt Tổng giám đốc ở hành lang công ty vào đầu giờ sáng, bạn nên cúi chào ở góc độ nào?',
      options: [
        { id: 'a', text: 'Góc 15° (Eshaku) hoặc 30° (Keirei) kết hợp nói lời chào「おはようございます」rõ ràng, không gập người quá lố gây cản trở đi lại.', isCorrect: true },
        { id: 'b', text: 'Gập người 90 độ dập đầu xuống sàn.', isCorrect: false },
        { id: 'c', text: 'Giơ tay vẫy và nói "Yo sếp!".', isCorrect: false },
        { id: 'd', text: 'Giả vờ cúi mặt xem điện thoại lướt qua như không thấy.', isCorrect: false },
      ],
      correctExplanation: 'Ở hành lang di chuyển, cúi chào nhẹ nhàng (Eshaku 15° hoặc Keirei 30°) dừng bước 1 nhịp là vừa đủ lịch thiệp.',
      trapAnalysis: 'Quá lố gập 90 độ hoặc quỳ lạy ở hành lang sẽ khiến sếp cảm thấy bị bối rối và làm trò hề trước mặt người khác.',
      mnemonicTip: 'Hành lang = 15° nhẹ nhàng; Tiếp khách = 30° kính cẩn; Tạ lỗi = 45° chân thành!',
    },
  },
];

// ==========================================
// 26. RADAR GIẢI MÃ "HONNE & TATEMAE" (KUUKI WO YOMU)
// ==========================================
export const initialHonneTatemaeList: HonneTatemaeItem[] = [
  {
    id: 'hon_01',
    speakerRole: 'Đối tác đàm phán',
    spokenTatemae: '「前向きに検討させていただきます。」',
    reading: 'まえむきにけんとうさせていただきます。',
    literalMeaning: 'Chúng tôi sẽ xem xét đề xuất này một cách hết sức tích cực.',
    hiddenHonne: '【TIẾNG LÒNG THẬT】: "Đề xuất này chẳng hấp dẫn chút nào cả, chúng tôi từ chối đấy nhưng nói thế cho đỡ mất lòng nhau thôi. Đừng hy vọng gì nữa!"',
    psychologicalAnalysis: 'Người Nhật rất sợ xung đột trực diện (摩擦を避ける). Câu nói "Xem xét tích cực" trong 90% trường hợp thương trường là một lời từ chối thanh lịch (NO lịch sự).',
    dangerLevel: 'Cực kỳ nguy hiểm (Từ chối khéo)',
    quiz: {
      id: 'qhon_01',
      question: 'Sau buổi chào hàng, đối tác Nhật mỉm cười bắt tay và nói:「前向きに検討させていただきます」. Bạn nên hiểu thế nào?',
      options: [
        { id: 'a', text: 'Đó gần như là một lời từ chối khéo. Cần nhanh chóng chuẩn bị phương án cải thiện hoặc tiếp cận khách hàng khác.', isCorrect: true },
        { id: 'b', text: 'Họ sắp ký hợp đồng rồi, về mở tiệc ăn mừng thôi.', isCorrect: false },
        { id: 'c', text: 'Họ đang giận dữ muốn kiện công ty bạn.', isCorrect: false },
        { id: 'd', text: 'Họ yêu cầu giao hàng ngay lập tức.', isCorrect: false },
      ],
      correctExplanation: 'Cụm từ "Xem xét tích cực" (前向きに検討) là mẫu câu Tatemae từ chối kinh điển. Nếu họ thật sự muốn mua, họ sẽ hỏi ngay về báo giá, ngày giao và quy trình ký kết hợp đồng.',
      trapAnalysis: 'Người nước ngoài thường dịch theo nghĩa đen "tích cực" và ngồi chờ đợi trong vô vọng hàng tháng trời.',
      mnemonicTip: 'Kentou (Xem xét) = Lời tiễn khách lịch thiệp!',
    },
  },
  {
    id: 'hon_02',
    speakerRole: 'Sếp người Nhật',
    spokenTatemae: '「君のアイデアは、非常にユニークで面白いね。」',
    reading: 'きみのアイデアは、ひじょうにユニークでおもしろいね。',
    literalMeaning: 'Ý tưởng của cậu quả thực hết sức độc đáo và thú vị nhỉ.',
    hiddenHonne: '【TIẾNG LÒNG THẬT】: "Ý tưởng này kỳ quặc, viển vông, chẳng có số liệu thực tế nào và không thể áp dụng vào doanh nghiệp được đâu. Mau làm lại cái khác đi!"',
    psychologicalAnalysis: 'Từ "Unique" (ユニーク) trong ngữ cảnh sếp Nhật nhận xét dự án thường không phải là lời khen sáng tạo, mà là cách nói giảm nói tránh cho từ "Kỳ dị / Bất khả thi / Lệch chuẩn".',
    dangerLevel: 'Cảnh báo chấn chỉnh',
    quiz: {
      id: 'qhon_02',
      question: 'Khi sếp Nhật nhận xét bản kế hoạch của bạn là「とても個性的（ユニーク）だね」, phản ứng thông minh nhất là gì?',
      options: [
        { id: 'a', text: 'Hỏi lại về tính khả thi và số liệu: "Cảm ơn sếp, sếp có thấy điểm nào chưa sát với thực tế để em bổ sung số liệu không ạ?".', isCorrect: true },
        { id: 'b', text: 'Cười lớn tự khen bản thân là thiên tài sáng tạo.', isCorrect: false },
        { id: 'c', text: 'Cãi tay đôi với sếp vì sếp không hiểu nghệ thuật.', isCorrect: false },
        { id: 'd', text: 'Tự ý gửi bản kế hoạch đó cho khách hàng luôn.', isCorrect: false },
      ],
      correctExplanation: 'Đọc vị không khí: Nhận diện ẩn ý "thiếu tính thực tế" và lập tức chủ động hạ mình xin ý kiến chỉnh sửa bổ sung số liệu chứng minh.',
      trapAnalysis: 'Tưởng bở được khen ngợi rồi tự mãn, sau đó bị gạt phăng đề xuất trong cuộc họp chung.',
      mnemonicTip: 'Độc đáo trong công sở Nhật thường là dấu hiệu của "Kỳ quặc thiếu khả thi"!',
    },
  },
];

// ==========================================
// 27. TRÌNH GIẢ LẬP "NEMAWASHI" (VẬN ĐỘNG HÀNH LANG)
// ==========================================
export const initialNemawashiList: NemawashiItem[] = [
  {
    id: 'nema_01',
    projectProposal: 'Đề xuất số hóa toàn bộ hệ thống quản lý nhân sự lên Cloud (SaaS) thay thế phần mềm cũ 15 năm tuổi.',
    stakeholders: [
      { id: 'stk_1', name: 'Yamada Bucho (Trưởng phòng IT)', role: 'Người bảo thủ, sợ rủi ro rò rỉ dữ liệu', influenceLevel: 'Cao', stance: 'Bảo thủ phản đối', strategy: 'Gặp gỡ riêng trước 1 tuần, mang tài liệu chứng minh tiêu chuẩn bảo mật ISO và các case study của ngân hàng lớn đã dùng.', effectiveGreeting: '「山田部長、セキュリティ面で最も厳しい視点をお持ちの部長に、まず一番にご意見を仰ぎたく参りました。」' },
      { id: 'stk_2', name: 'Tanaka Kacho (Phó phòng Nghiệp vụ)', role: 'Ủng hộ đổi mới vì mệt mỏi với nhập liệu thủ công', influenceLevel: 'Trung bình', stance: 'Ủng hộ ngầm', strategy: 'Nhờ anh ấy cung cấp số liệu thực tế về số giờ làm thêm do nhập liệu thủ công gây ra để làm bằng chứng định lượng.', effectiveGreeting: '「田中課長、現場の負担を軽減するため、現場のリアルな数字をお力添えいただけないでしょうか。」' },
      { id: 'stk_3', name: 'Suzuki Jomu (Giám đốc Điều hành)', role: 'Người ra quyết định cuối cùng, thích sự đồng thuận', influenceLevel: 'Cao', stance: 'Nắm quyền quyết định tối hậu', strategy: 'Chỉ báo cáo tóm tắt khi các Trưởng phòng phía dưới đã gật đầu đồng ý.', effectiveGreeting: '「各部署の合意形成が整いましたので、最終のご報告に参りました。」' },
    ],
    consensusSteps: [
      'Bước 1: Tìm đồng minh ngầm ở cấp phó phòng (Tanaka Kacho) để thu thập số liệu nỗi đau thực tế.',
      'Bước 2: Nemawashi riêng với nhân vật bảo thủ khó tính nhất (Yamada Bucho), tôn vinh vai trò của ông ấy và giải tỏa nỗi lo bảo mật.',
      'Bước 3: Chỉ khi Yamada Bucho nói "Ừ, thế này thì tạm yên tâm", mới chính thức đưa vào chương trình nghị sự cuộc họp chung cùng Giám đốc.',
    ],
    nemawashiWisdom: 'Cuộc họp chính thức của người Nhật không phải là nơi tranh cãi nảy lửa để tìm giải pháp, mà chỉ là nghi thức ký duyệt cho những điều ĐÃ ĐƯỢC ĐỒNG THUẬN XONG Ở HÀNH LANG (Nemawashi)!',
    quiz: {
      id: 'qnema_01',
      question: 'Sai lầm chết người nhất của người mới khi muốn thông qua một dự án cải tiến trong công ty Nhật là gì?',
      options: [
        { id: 'a', text: 'Bất ngờ tung đề xuất mới ngay giữa cuộc họp chính thức mà không hề báo trước hay rỉ tai (Nemawashi) với các sếp.', isCorrect: true },
        { id: 'b', text: 'Chuẩn bị quá nhiều số liệu chứng minh.', isCorrect: false },
        { id: 'c', text: 'Hỏi ý kiến của sếp trước cuộc họp.', isCorrect: false },
        { id: 'd', text: 'Trình bày bằng slide PowerPoint ngắn gọn.', isCorrect: false },
      ],
      correctExplanation: 'Người Nhật cực kỳ ghét sự bất ngờ (No Surprise). Đột ngột đưa vấn đề lớn ra giữa cuộc họp khiến các sếp cảm thấy bị mất mặt và mất quyền kiểm soát, 99% đề xuất sẽ bị bác bỏ ngay lập tức.',
      trapAnalysis: 'Phương Tây chuộng tranh luận trực tiếp trên bàn họp, nhưng văn hóa Nhật chuộng "Nhổ cỏ bấm rễ" (Nemawashi) đồng thuận ngầm từ trước.',
      mnemonicTip: 'Gốc cây có bứng được hay không là do công đoạn xới đất quanh rễ (Nemawashi) từ trước!',
    },
  },
];

// ==========================================
// 28. ĐẤU TRƯỜNG "NOMIKAI" & HỆ TƯ TƯỞNG "KAMIZA - SHIMOZA"
// ==========================================
export const initialKamizaNomikaiList: KamizaNomikaiItem[] = [
  {
    id: 'kn_01',
    spatialSetting: 'Bàn tiệc nhậu Nomikai',
    title: 'Thứ bậc Thượng tọa (Kamiza) và Hạ tọa (Shimoza) trên bàn tiệc nhậu kiểu Nhật',
    seatingGrid: [
      { seatIndex: 1, title: 'Vị trí trong cùng, dựa lưng vào tường (Kamiza số 1)', rank: 'Kamiza', explanation: 'Vị trí danh dự cao nhất, dành cho Trưởng bối, Giám đốc hoặc Khách hàng VIP. Nhìn bao quát toàn quán, không bị nhân viên phục vụ đi lại quẹt vào người.' },
      { seatIndex: 2, title: 'Cạnh vị trí số 1 (Kamiza số 2)', rank: 'Kamiza', explanation: 'Dành cho người có chức vụ cao thứ hai.' },
      { seatIndex: 3, title: 'Sát cửa ra vào / Lối nhân viên bưng bê (Shimoza)', rank: 'Shimoza', explanation: 'VỊ TRÍ CỦA BẠN (Người trẻ nhất/Chủ trì): Nhận đồ ăn, gọi món, tiếp thêm khăn ướt Oshibori, rót bia và chủ động thanh toán.' },
    ],
    drinkingRules: [
      'Quy tắc cụng ly (Kanpai): Khi cụng ly với sếp hoặc khách, BẮT BUỘC hạ mép miệng ly của mình THẤP HƠN mép ly của đối phương từ 1-2cm.',
      'Quy tắc rót bia: Cầm chai bia bằng 2 tay (tay phải cầm thân chai, tay trái đỡ nhẹ dưới đáy). Hướng nhãn hiệu chai bia (Logo Asahi/Sapporo) NGỬA LÊN TRÊN để khách nhìn thấy.',
      'Không bao giờ để ly bia của sếp cạn trơ đáy (thấy còn 1/3 là phải hỏi xin phép rót thêm).',
    ],
    samuraiOriginHistory: 'Nguồn gốc từ thời Samurai: Vị trí trong cùng dựa lưng vào tường là nơi an toàn nhất, tránh bị sát thủ từ ngoài cửa xông vào chém lén sau lưng. Vị trí gần cửa là nơi cận vệ võ sĩ ngồi để sẵn sàng rút kiếm chắn cửa.',
    threeSecondRule: 'Quy tắc 3 giây xác định Kamiza: "CÀNG XA CỬA RA VÀO CÀNG CAO QUÝ; GẦN CỬA VÀ LỐI ĐI LÀ NƠI PHỤC VỤ (SHIMOZA)"!',
    quiz: {
      id: 'qkn_01',
      question: 'Khi cụng ly (Kanpai) với Tổng giám đốc đối tác trong bữa tiệc Nomikai, hành động nào thể hiện sự tinh tế bậc thầy?',
      options: [
        { id: 'a', text: 'Cầm ly bằng 2 tay và chủ động hạ mép ly của mình thấp hơn mép ly của Tổng giám đốc một chút.', isCorrect: true },
        { id: 'b', text: 'Cụng thật mạnh làm đổ bia sang ly của sếp.', isCorrect: false },
        { id: 'c', text: 'Nâng ly cao hơn đầu sếp để chứng tỏ mình cao hơn.', isCorrect: false },
        { id: 'd', text: 'Uống hết ly trước khi sếp kịp nâng ly.', isCorrect: false },
      ],
      correctExplanation: 'Hạ thấp mép ly thể hiện sự khiêm tốn, tôn trọng tuyệt đối vị thế bề trên của đối tác.',
      trapAnalysis: 'Cụng ngang hàng hoặc nâng ly cao hơn sếp bị coi là ngạo mạn, vô lễ chốn bàn tiệc.',
      mnemonicTip: 'Hạ thấp ly mình = Nâng tầm đối tác!',
    },
  },
];

// ==========================================
// 29. TRIẾT LÝ QUẢN TRỊ KAIZEN, 5S & BÁO CÁO A3
// ==========================================
export const initialKaizenList: Kaizen5sA3Item[] = [
  {
    id: 'kz_01',
    factoryOrOfficeIssue: 'Hàng ngàn tài liệu hóa đơn bị thất lạc và lưu trữ lộn xộn, nhân viên mất trung bình 45 phút mỗi ngày chỉ để bới tìm giấy tờ.',
    fiveSFocus: 'Seiri (Sàng lọc)',
    fiveWhysChain: [
      { whyNumber: 1, question: 'Tại sao nhân viên mất 45 phút tìm tài liệu?', answer: 'Vì tài liệu từ 5 năm trước vẫn chất đống chung với tài liệu của tháng này.' },
      { whyNumber: 2, question: 'Tại sao tài liệu cũ không được dọn dẹp?', answer: 'Vì không có tiêu chí rõ ràng thế nào là tài liệu cần hủy.' },
      { whyNumber: 3, question: 'Tại sao không có tiêu chí phân loại?', answer: 'Vì các phòng ban sợ lỡ hủy nhầm tài liệu quan trọng thì bị phạt.' },
      { whyNumber: 4, question: 'Tại sao sợ bị phạt?', answer: 'Vì chưa từng có quy định số hóa scan chứng từ điện tử chuẩn của công ty.' },
      { whyNumber: 5, question: 'Nguyên nhân gốc rễ (Root Cause)?', answer: 'THIẾU CHÍNH SÁCH QUẢN TRỊ VÒNG ĐỜI DỮ LIỆU VÀ CÔNG CỤ SCAN SỐ HÓA TẬP TRUNG.' },
    ],
    a3SummaryBlueprint: {
      background: 'Tổn thất 45 phút/người/ngày tương đương lãng phí 12 triệu Yên tiền lương mỗi năm cho việc tìm kiếm giấy tờ.',
      currentCondition: 'Kho tài liệu phòng kế toán quá tải, nguy cơ thất lạc chứng từ kiểm toán.',
      rootCause: 'Thiếu quy chuẩn Seiri (Sàng lọc) thẻ đỏ (Red Tag) để loại bỏ giấy tờ hết niên hạn.',
      countermeasures: 'Áp dụng Chiến dịch Thẻ Đỏ 5S: Những tài liệu không dùng trong 1 năm dán thẻ đỏ chuyển vào kho lưu trữ số hóa, sau 3 năm tự động hủy.',
      followUp: 'Kiểm tra chéo định kỳ vào thứ Sáu tuần cuối cùng của tháng, giảm thời gian tìm kiếm xuống dưới 2 phút.',
    },
    quiz: {
      id: 'qkz_01',
      question: 'Phương pháp truy tìm nguyên nhân cốt lõi "5 Whys" (5 lần hỏi Tại sao) của Toyota nhằm mục đích gì?',
      options: [
        { id: 'a', text: 'Đào sâu vượt qua các triệu chứng bề mặt để chạm tới nguyên nhân gốc rễ của sự cố, thay vì đổ lỗi cho cá nhân.', isCorrect: true },
        { id: 'b', text: 'Để tra khảo và trừng phạt nhân viên cấp dưới.', isCorrect: false },
        { id: 'c', text: 'Để kéo dài thời gian làm việc.', isCorrect: false },
        { id: 'd', text: 'Để chứng minh sếp luôn luôn đúng.', isCorrect: false },
      ],
      correctExplanation: 'Triết lý Kaizen của Toyota: "Ghét bỏ lỗi sai, nhưng thương yêu con người". Hỏi 5 lần Tại sao để sửa chữa lỗi hệ thống quy trình.',
      trapAnalysis: 'Nhiều người dừng lại ở lần hỏi thứ 1 hoặc thứ 2 và vội vàng đổ lỗi cho "sự bất cẩn của nhân viên".',
      mnemonicTip: '5 Whys = Tìm gốc rễ lỗi quy trình, không tìm người chịu tội!',
    },
  },
];

// ==========================================
// 30. NGHỆ THUẬT TẶNG QUÀ (OMIYAGE / OCHUGEN / OSEIBO) & OMOTENASHI
// ==========================================
export const initialGiftList: GiftOmotenashiItem[] = [
  {
    id: 'gift_01',
    occasion: 'Omiyage sau chuyến công tác',
    recipientContext: 'Mua quà bánh về chia cho toàn thể đồng nghiệp cùng phòng ban (khoảng 20 người) sau chuyến công tác Kyoto 3 ngày.',
    recommendedGift: 'Hộp bánh Yatsuhashi hoặc bánh lưỡi mèo Matcha Kyoto ĐÃ ĐƯỢC CHIA THÀNH TỪNG GÓI RIÊNG LẺ (個包装 - Kohousou).',
    budgetGuide: 'Khoảng 1,500 Yên - 2,500 Yên / hộp 20-25 cái. Không mua đồ quá đắt đỏ khiến người nhận thấy gánh nặng.',
    noshiPaperRule: 'Omiyage đồng nghiệp không cần bọc Noshi cầu kỳ, nhưng bắt buộc phải là loại bánh chia từng gói nhỏ để đặt lên bàn từng người.',
    tabooGifts: [
      { item: 'Bánh kem tươi hoặc bánh cần cắt dao', tabooReason: 'Gây phiền toái cho người nhận vì phải đi tìm dao đĩa và tủ lạnh bảo quản.' },
      { item: 'Khăn tay màu trắng (白いハンカチ)', tabooReason: 'Ám chỉ sự ly biệt, đoạn tuyệt quan hệ hoặc dùng đậy mặt người chết trong tang lễ.' },
      { item: 'Dao, kéo, đồ sắc nhọn', tabooReason: 'Mang ý nghĩa "Cắt đứt duyên phận".' },
      { item: 'Lược chải tóc (櫛 - Kushi)', tabooReason: 'Đồng âm với từ Khổ (Ku) và Tử (Shi) - đại kỵ điềm xui.' },
    ],
    omotenashiSpiritStory: 'Tinh thần Omotenashi khi mua Omiyage cho văn phòng nằm ở sự chu đáo: Bánh phải chia từng gói riêng (個包装), để được ở nhiệt độ phòng lâu ngày, không bám dính bẩn tay khi vừa gõ bàn phím vừa ăn.',
    quiz: {
      id: 'qgift_01',
      question: 'Khi mua bánh kẹo (Omiyage) về chia cho văn phòng công ty Nhật sau chuyến công tác, tiêu chuẩn quan trọng hàng đầu là gì?',
      options: [
        { id: 'a', text: 'Bánh phải được chia thành từng gói nhỏ độc lập (個包装) và có hạn sử dụng dài ngày để mọi người tự lấy ăn tiện lợi.', isCorrect: true },
        { id: 'b', text: 'Mua một chiếc bánh sinh nhật thật to bắt mọi người phải tìm dao chia nhau.', isCorrect: false },
        { id: 'c', text: 'Mua món thật đắt tiền trị giá cả tháng lương.', isCorrect: false },
        { id: 'd', text: 'Chỉ mua 1 cái cho riêng sếp, không mua cho ai khác.', isCorrect: false },
      ],
      correctExplanation: 'Văn hóa Omiyage công sở: Bắt buộc là「個包装」(gói lẻ). Mọi người có thể cầm về bàn ăn lúc giải lao mà không cần đĩa thìa.',
      trapAnalysis: 'Mua bánh không bọc gói lẻ khiến bánh bị ỉu và người chia phải đi tìm giấy ăn, gây phiền hà cho cả văn phòng.',
      mnemonicTip: 'Omiyage công sở = Gói lẻ riêng biệt (個包装) + Để được lâu!',
    },
  },
];
