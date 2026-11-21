import { EncyclopediaSectionMeta, EncyclopediaTopicItem } from '../types/encyclopedia';

export const ENCYCLOPEDIA_SECTIONS_META: EncyclopediaSectionMeta[] = [
  {
    id: 'geography_admin',
    code: 'GEO',
    title: 'Tổng Quan Địa Lý & Hành Chính',
    shortTitle: 'Địa lý & 47 Tỉnh',
    jpTitle: '地理と行政区分',
    iconName: 'MapPin',
    badge: '8 Vùng · 47 Tỉnh Thành',
    colorScheme: {
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-800/50',
      text: 'text-emerald-400',
      activeTab: 'bg-emerald-600 text-white shadow-emerald-600/30',
      pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    description: 'Bản đồ 8 vùng địa lý, 47 tỉnh thành (Todofuken), các siêu đô thị đầu tàu và các biểu tượng quốc gia thiêng liêng.',
  },
  {
    id: 'history_politics',
    code: 'HIS',
    title: 'Lịch Sử & Hệ Thống Chính Trị',
    shortTitle: 'Lịch sử & Chính trị',
    jpTitle: '歴史と政治体制',
    iconName: 'Shield',
    badge: '14 Thời Kỳ · Samurai · Quốc Hội',
    colorScheme: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-800/50',
      text: 'text-amber-400',
      activeTab: 'bg-amber-600 text-white shadow-amber-600/30',
      pill: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    description: 'Dòng thời gian từ thời đồ đá Jomon đến thời đại Reiwa, tam kiệt thống nhất thiên hạ, Samurai và bộ máy tam quyền phân lập.',
  },
  {
    id: 'tradition_arts',
    code: 'ART',
    title: 'Văn Hóa Truyền Thống & Nghệ Thuật',
    shortTitle: 'Truyền thống & Nghệ thuật',
    jpTitle: '伝統文化と芸能',
    iconName: 'Flower2',
    badge: 'Thần Đạo · Trà Đạo · Wabi-Sabi',
    colorScheme: {
      bg: 'bg-rose-950/40',
      border: 'border-rose-800/50',
      text: 'text-rose-400',
      activeTab: 'bg-rose-600 text-white shadow-rose-600/30',
      pill: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    description: 'Thần đạo Shinto, Phật giáo, Trà đạo, Cắm hoa Ikebana, Kịch Kabuki, Noh, Kimono, nhà cổ Machiya và triết lý Wabi-Sabi.',
  },
  {
    id: 'washoku_cuisine',
    code: 'FOO',
    title: 'Ẩm Thực Washoku (Di Sản UNESCO)',
    shortTitle: 'Ẩm thực Washoku',
    jpTitle: '和食文化とマナー',
    iconName: 'Utensils',
    badge: 'Sushi · Ramen · Sake · Đũa Hashi',
    colorScheme: {
      bg: 'bg-orange-950/40',
      border: 'border-orange-800/50',
      text: 'text-orange-400',
      activeTab: 'bg-orange-600 text-white shadow-orange-600/30',
      pill: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    },
    description: 'Món ăn biểu tượng Sushi, Ramen, Kaiseki, văn hóa dùng đũa Hashi, câu thần chú Itadakimasu, rượu Sake và trà đạo Matcha.',
  },
  {
    id: 'society_customs',
    code: 'SOC',
    title: 'Đời Sống Xã Hội & Phong Tục',
    shortTitle: 'Xã hội & Lễ hội Matsuri',
    jpTitle: '社会生活と年中行事',
    iconName: 'Users',
    badge: 'Cúi Đầu Ojigi · Tàu Điện · Senpai-Kohai',
    colorScheme: {
      bg: 'bg-cyan-950/40',
      border: 'border-cyan-800/50',
      text: 'text-cyan-400',
      activeTab: 'bg-cyan-600 text-white shadow-cyan-600/30',
      pill: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    description: 'Quy tắc cúi đầu Ojigi, văn hóa tàu điện Densha, tháo giày dép Genkan, lễ hội Hanami, Hanabi, Oshogatsu và phong cách làm việc Ho-Ren-So.',
  },
  {
    id: 'pop_culture',
    code: 'POP',
    title: 'Văn Hóa Đại Chúng (Pop Culture)',
    shortTitle: 'Pop Culture & Anime',
    jpTitle: 'ポップカルチャー',
    iconName: 'Sparkles',
    badge: 'Anime · Studio Ghibli · J-Pop · Harajuku',
    colorScheme: {
      bg: 'bg-fuchsia-950/40',
      border: 'border-fuchsia-800/50',
      text: 'text-fuchsia-400',
      activeTab: 'bg-fuchsia-600 text-white shadow-fuchsia-600/30',
      pill: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    },
    description: 'Anime, Manga, Studio Ghibli, MAPPA, City Pop thập niên 80, Vocaloid Hatsune Miku, đế chế Nintendo/PlayStation và thời trang Harajuku.',
  },
  {
    id: 'travel_practical',
    code: 'TRA',
    title: 'Cẩm Nang Du Lịch & Thực Tế',
    shortTitle: 'Du lịch & Sinh tồn',
    jpTitle: '旅行と実用ガイド',
    iconName: 'Compass',
    badge: 'IC Card · Shinkansen · Tiền Mặt · Rác',
    colorScheme: {
      bg: 'bg-indigo-950/40',
      border: 'border-indigo-800/50',
      text: 'text-indigo-400',
      activeTab: 'bg-indigo-600 text-white shadow-indigo-600/30',
      pill: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    description: 'Thẻ Suica/Pasmo, tàu cao tốc Shinkansen, JR Pass, tiền mặt vs thanh toán số PayPay, cách phân loại rác và kết nối mạng eSIM.',
  },
  {
    id: 'lifelong_learning',
    code: 'LRN',
    title: 'Phương Pháp Học Suốt Đời Của Người Nhật',
    shortTitle: 'Học suốt đời & Kaizen',
    jpTitle: '生涯学習と改善哲学',
    iconName: 'GraduationCap',
    badge: 'Kaizen 1% · Ikigai · Monozukuri',
    colorScheme: {
      bg: 'bg-purple-950/40',
      border: 'border-purple-800/50',
      text: 'text-purple-400',
      activeTab: 'bg-purple-600 text-white shadow-purple-600/30',
      pill: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    description: 'Triết lý Shougai Gakushuu, Kaizen cải tiến liên tục 1% mỗi ngày, Hansei tự soi mình, tinh thần Monozukuri và lẽ sống Ikigai.',
  },
];

// Initial 8 comprehensive pillar encyclopedia topics
export const initialEncyclopediaTopics: EncyclopediaTopicItem[] = [
  // 1. Geography & Administrative
  {
    id: 'enc_geo_01',
    sectionId: 'geography_admin',
    title: 'Địa Lý 8 Vùng, 47 Tỉnh Thành (Todōfuken) & Các Biểu Tượng Quốc Gia',
    jpTitle: '日本の八地方・47都道府県と国家の象徴',
    romaji: 'Nihon no Hachichihō, Yonjūnanatodōfuken to Kokka no Shōchō',
    hiragana: 'にほんのはちちほう・よんじゅうななとどうふけん と こっかのしょうちょう',
    level: 'N3',
    badge: '8 Vùng Địa Lý · 47 Tỉnh Thành · Biểu Tượng',
    summary:
      'Quần đảo Nhật Bản trải dài hình cánh cung với 4 đảo chính (Honshu, Hokkaido, Kyushu, Shikoku), chia làm 8 vùng địa lý truyền thống và 47 đơn vị hành chính cấp tỉnh (1 Đô, 1 Đạo, 2 Phủ, 43 Tỉnh) cùng các biểu tượng quốc kỳ Hinomaru, quốc hoa Cúc và hoa Anh đào.',
    keyTakeaways: [
      '8 Vùng địa lý: Hokkaido, Tohoku, Kanto, Chubu, Kinki (Kansai), Chugoku, Shikoku, Kyushu - Okinawa.',
      'Cơ cấu hành chính "Todōfuken" (都道府県): 1 Đô (Tokyo-to), 1 Đạo (Hokkai-do), 2 Phủ (Kyoto-fu, Osaka-fu) và 43 Tỉnh (Ken).',
      'Tam giác kinh tế siêu đô thị: Vùng thủ đô Tokyo (Kanto), Osaka - Kyoto - Kobe (Keihanshin Kansai), và Nagoya (Aichi Chubu).',
      'Quốc kỳ "Hinomaru" (Mặt trời đỏ) xuất phát từ truyền thuyết Nữ thần Mặt trời Amaterasu Omikami.',
      'Quốc hoa: Hoa Cúc 16 cánh (Kikumon - Hoàng gia) đại diện cho nhà nước pháp quyền, Hoa Anh Đào (Sakura) là quốc hoa trong tâm thức nhân dân.',
    ],
    detailedExplanation:
      'Nhật Bản là một đảo quốc nằm ở Đông Á với hơn 6.800 hòn đảo lớn nhỏ, trong đó 4 đảo lớn nhất chiếm 97% diện tích là Honshu, Hokkaido, Kyushu và Shikoku. Về mặt địa lý và văn hóa, đất nước được chia thành 8 vùng: Hokkaido (vùng đất phương Bắc của tuyết trắng, nông nghiệp và người bản địa Ainu); Tohoku (vùng Đông Bắc của rừng phong, suối nước nóng và lễ hội Matsuri rực rỡ); Kanto (vùng đồng bằng rộng lớn bao quanh siêu đô thị Tokyo); Chubu (miền Trung với dãy núi Alps Nhật Bản và thủ phủ công nghiệp chế tạo Nagoya); Kinki/Kansai (trái tim lịch sử ngàn năm văn hiến với cố đô Kyoto, Nara và trung tâm thương mại phóng khoáng Osaka); Chugoku (miền Tây Nam với Hiroshima và đền Itsukushima); Shikoku (hòn đảo tâm linh với cung đường hành hương 88 ngôi chùa Phật giáo); và Kyushu-Okinawa (cái nôi văn minh lúa nước, suối khoáng nóng Beppu/Kurokawa, vùng bán dẫn Kumamoto và văn hóa quần đảo cận nhiệt đới Ryukyu Okinawa). Hệ thống phân cấp hành chính gồm 47 tỉnh thành gọi chung là "Todōfuken", đứng đầu là Thống đốc tỉnh (Chiji) được người dân bầu cử trực tiếp.',
    culturalPhilosophy:
      'Địa hình Nhật Bản có tới 73% là đồi núi dốc, sông ngắn chảy xiết và thường xuyên hứng chịu động đất, núi lửa và bão nhiệt đới. Hoàn cảnh thiên nhiên khắc nghiệt này đã tôi luyện nên tâm thức "Đảo quốc" (Shimaguni-konjō), nơi tính gắn kết cộng đồng, tinh thần tương trợ và sự nhạy cảm sâu sắc với sự biến chuyển của 4 mùa (Kisetsukan) trở thành cốt lõi sống còn của người Nhật.',
    practicalAdvice:
      'Khi làm việc hoặc đi du lịch tại Nhật, việc nắm rõ đặc trưng vùng miền là vũ khí giao tiếp tuyệt vời. Người Kanto thường lịch sự, giữ kẽ, đúng chuẩn mực; trong khi người Kansai (Osaka) lại cực kỳ cởi mở, thích nói đùa, mặc cả giá và đam mê ẩm thực đường phố ("Kuidaore" - ăn tới cháy túi).',
    vocabularyList: [
      { word: '都道府県', reading: 'とどうふけん', meaning: 'Hệ thống 47 tỉnh thành hành chính Nhật Bản', level: 'N2' },
      { word: '日の丸', reading: 'ひのまる', meaning: 'Quốc kỳ mặt trời đỏ của Nhật Bản', level: 'N3' },
      { word: '菊花紋章', reading: 'きっかもんしょう', meaning: 'Hoa cúc 16 cánh - Biểu tượng Hoàng gia Nhật Bản', level: 'N1' },
      { word: '桜', reading: 'さくら', meaning: 'Hoa anh đào - Quốc hoa dân gian của người Nhật', level: 'N5' },
      { word: '列島', reading: 'れっとう', meaning: 'Quần đảo trải dài', level: 'N2' },
      { word: '方言', reading: 'ほうげん', meaning: 'Tiếng địa phương / Phương ngữ (như Kansai-ben, Hakata-ben)', level: 'N2' },
    ],
    quickFact:
      'Tokyo là vùng đô thị đông dân nhất thế giới với hơn 37 triệu dân sinh sống tại vùng Đại Tokyo mở rộng (Greater Tokyo Area).',
    interactivePoints: [
      { label: 'Hokkaido (北海道)', desc: 'Sapporo, Otaru, Asahikawa, Hakodate - Nông nghiệp, hải sản, tuyết bột Niseko', tag: 'Phương Bắc' },
      { label: 'Tohoku (東北)', desc: 'Aomori, Iwate, Miyagi (Sendai), Akita, Yamagata, Fukushima - Táo đỏ, Matsuri Nebuta', tag: 'Đông Bắc' },
      { label: 'Kanto (関東)', desc: 'Tokyo, Kanagawa (Yokohama), Chiba, Saitama, Ibaraki, Tochigi, Gunma - Trung tâm chính trị', tag: 'Thủ Đô' },
      { label: 'Chubu (中部)', desc: 'Aichi (Nagoya), Shizuoka (Núi Phú Sĩ), Nagano, Niigata, Ishikawa, Gifu, Toyama, Yamanashi, Fukui', tag: 'Alps Nhật Bản' },
      { label: 'Kansai / Kinki (関西)', desc: 'Osaka, Kyoto, Hyogo (Kobe), Nara, Shiga, Wakayama, Mie - Cố đô di sản & ẩm thực', tag: 'Văn Hóa Ngàn Năm' },
      { label: 'Chugoku (中国)', desc: 'Hiroshima, Okayama, Yamaguchi, Tottori, Shimane - Di sản hòa bình & Đền nổi Miyajima', tag: 'Tây Nam' },
      { label: 'Shikoku (四国)', desc: 'Kagawa (Udon), Ehime (Onsen Dogo), Tokushima (Awa Odori), Kochi - Hành hương 88 chùa', tag: 'Tâm Linh' },
      { label: 'Kyushu - Okinawa (九州・沖縄)', desc: 'Fukuoka, Kumamoto (TSMC), Nagasaki, Oita, Kagoshima, Miyazaki, Saga, Okinawa', tag: 'Nhiệt Đới & Bán Dẫn' },
    ],
    tags: ['Địa lý', '47 tỉnh thành', 'Hành chính', 'Bản đồ', 'Quốc kỳ Hinomaru'],
    quiz: {
      question: 'Cơ cấu phân cấp hành chính cấp tỉnh "Todōfuken" (都道府県) của Nhật Bản hiện nay gồm bao nhiêu đơn vị?',
      options: [
        'A. 1 Đô, 1 Đạo, 2 Phủ, 43 Tỉnh (Tổng cộng 47 tỉnh thành)',
        'B. 47 Đô và 0 Tỉnh',
        'C. 8 Vùng và 64 Tỉnh',
        'D. 1 Thủ đô và 50 Tiểu bang'
      ],
      correctIndex: 0,
      explanation: 'Hệ thống Todōfuken gồm: 1 Đô (Tokyo-to), 1 Đạo (Hokkai-do), 2 Phủ (Kyoto-fu, Osaka-fu) và 43 Tỉnh (Ken), hợp thành 47 đơn vị hành chính cấp tỉnh.',
      culturalContext: 'Mỗi tỉnh thành đều có cờ tỉnh, hoa biểu tượng và linh vật (Yuru-chara) đại diện riêng đầy tự hào.'
    }
  },

  // 2. History & Politics
  {
    id: 'enc_his_01',
    sectionId: 'history_politics',
    title: 'Biên Niên Sử 14 Thời Kỳ, Tam Kiệt Sengoku & Thể Chế Chính Trị Lưỡng Viện',
    jpTitle: '日本の歴史区分・戦国三英傑と立憲君主制',
    romaji: 'Nihon no Rekishi Kubun, Sengoku San-eiketsu to Rikken Kunshusei',
    hiragana: 'にほんのれきしくぶん・せんごくさんえいけつ と りっけんくんしゅせい',
    level: 'N2',
    badge: '14 Thời Kỳ · Oda Nobunaga · Thiên Hoàng & Quốc Hội',
    summary:
      'Khái quát dòng chảy lịch sử từ thời tiền sử Jomon, thời Nara tiếp nhận Phật giáo, thời Heian văn hóa cung đình, thời Mạc phủ Samurai, thời kỳ Sengoku Chiến Quốc, 260 năm thái bình Edo, cuộc cải cách Minh Trị Duy Tân cho đến thể chế quân chủ lập hiến dân chủ tam quyền phân lập ngày nay.',
    keyTakeaways: [
      '14 Thời kỳ lịch sử cốt lõi: Jomon → Yayoi → Kofun → Asuka → Nara → Heian → Kamakura → Muromachi → Sengoku (Chiến quốc) → Edo → Meiji (Minh Trị) → Taisho (Đại Chính) → Showa (Chiêu Hòa) → Heisei (Bình Thành) → Reiwa (Lệnh Hòa).',
      'Tam kiệt thời Chiến Quốc (Sengoku San-eiketsu): Oda Nobunaga (khởi xướng đập tan trật tự cũ), Toyotomi Hideyoshi (thống nhất giang sơn), Tokugawa Ieyasu (lập Mạc phủ Edo, mở ra 260 năm thái bình).',
      'Tầng lớp Samurai (Võ sĩ) và Ninja (Nhẫn giả): Tinh thần danh dự Bushido (Võ sĩ đạo) coi trọng chữ Nghĩa (Gi) và lòng Trung thành (Chuu).',
      'Cuộc cải cách Minh Trị Duy Tân 1868 (Meiji Ishin): Chấm dứt thời đại phong kiến, mở cửa tiếp thu văn minh phương Tây, biến Nhật Bản thành cường quốc hiện đại đầu tiên tại châu Á.',
      'Chính trị hiện tại: Thể chế Quân chủ lập hiến. Thiên hoàng là biểu tượng không nắm quyền lực nhà nước; Thủ tướng nắm quyền hành pháp; Quốc hội (Kokkai) gồm Chúng Nghị Viện và Tham Nghị Viện nắm quyền lập pháp.',
    ],
    detailedExplanation:
      'Lịch sử Nhật Bản là một bức tranh đan xen độc đáo giữa gìn giữ bản sắc dân tộc và khả năng thích ứng cải cách phi thường. Từ thời Nara (710–794) xây dựng kinh đô phỏng theo Trường An và đúc đại tượng Phật Todaiji, đến thời Heian (794–1185) bùng nổ văn học chữ Kana với kiệt tác "Truyện kể Genji". Cuối thế kỷ 12, quyền lực chuyển dịch từ quý tộc triều đình sang tầng lớp võ sĩ Samurai với sự thành lập Mạc phủ Kamakura của Minamoto no Yoritomo. Thế kỷ 16 chứng kiến giai đoạn hỗn chiến đẫm máu Sengoku Jidai, nơi câu thành ngữ nổi tiếng miêu tả tính cách 3 vị anh hùng: Nobunaga: "Nếu chim không hót, ta sẽ giết nó" (quyết liệt, táo bạo); Hideyoshi: "Nếu chim không hót, ta sẽ làm cho nó hót" (mưu lược, thuyết phục); Ieyasu: "Nếu chim không hót, ta sẽ kiên nhẫn đợi nó hót" (nhẫn nại, nhìn xa trông rộng). Sau trận chiến Sekigahara 1600, Ieyasu lập Mạc phủ Tokugawa tại Edo (Tokyo ngày nay), áp dụng chính sách bế quan tỏa cảng Sakoku duy trì hòa bình nội địa hơn 2 thế kỷ. Đến năm 1868, các võ sĩ trẻ lật đổ Mạc phủ, trao lại quyền cho Thiên hoàng Minh Trị, tiến hành Minh Trị Duy Tân thần tốc. Sau Thế chiến thứ II, Hiến pháp hòa bình năm 1947 ra đời, xác lập chủ quyền thuộc về nhân dân.',
    culturalPhilosophy:
      'Tinh thần lịch sử Nhật Bản thể hiện rõ nhất qua chữ "Hòa" (Wa - 和) và "Nhẫn" (Nin - 忍). Dù trải qua nhiều biến cố thăng trầm hay thảm họa chiến tranh, người Nhật luôn biết gạt bỏ bất đồng nội bộ để tái thiết đất nước từ đống tro tàn với tốc độ thần kỳ.',
    practicalAdvice:
      'Trong giao tiếp và công sở Nhật, các câu chuyện về 3 danh tướng Sengoku rất hay được các sếp Nhật dùng làm ẩn dụ trong quản trị nhân sự và đàm phán kinh doanh. Hiểu được tính cách của Ieyasu (nhẫn nhịn chờ thời) sẽ giúp bạn lấy được sự tôn trọng rất lớn từ đối tác Nhật.',
    vocabularyList: [
      { word: '明治維新', reading: 'めいじいしん', meaning: 'Cuộc cải cách Minh Trị Duy Tân năm 1868', level: 'N2' },
      { word: '幕府', reading: 'ばくふ', meaning: 'Chính quyền Mạc phủ của tướng quân Shogun', level: 'N2' },
      { word: '戦国時代', reading: 'せんごくじだい', meaning: 'Thời kỳ Chiến Quốc loạn lạc tranh hùng', level: 'N2' },
      { word: '武士道', reading: 'ぶしどう', meaning: 'Tinh thần Võ Sĩ Đạo Samurai', level: 'N2' },
      { word: '天下統一', reading: 'てんかとういつ', meaning: 'Thống nhất thiên hạ, quy giang sơn về một mối', level: 'N1' },
      { word: '内閣総理大臣', reading: 'ないかくそうりだいじん', meaning: 'Thủ tướng Chính phủ Nhật Bản', level: 'N1' },
    ],
    quickFact:
      'Hoàng gia Nhật Bản là triều đại quân chủ cha truyền con nối lâu đời nhất thế giới còn tồn tại liên tục, với Thiên hoàng Naruhito hiện tại là vị Thiên hoàng thứ 126 theo truyền thuyết.',
    tags: ['Lịch sử', 'Chính trị', 'Sengoku', 'Samurai', 'Minh Trị Duy Tân', 'Thiên Hoàng'],
    quiz: {
      question: 'Vị danh tướng thời Chiến Quốc nào được gắn với câu nói: "Nếu chim không hót, ta sẽ kiên nhẫn đợi cho đến khi nó hót"?',
      options: [
        'A. Oda Nobunaga',
        'B. Toyotomi Hideyoshi',
        'C. Tokugawa Ieyasu',
        'D. Sakamoto Ryoma'
      ],
      correctIndex: 2,
      explanation: 'Tokugawa Ieyasu nổi tiếng với tính kiên nhẫn nhẫn nại phi thường, biết giấu mình chờ thời cơ chín muồi để lập nên Mạc phủ Tokugawa thịnh trị hơn 260 năm.',
      culturalContext: 'Đây là bài học kinh điển về tính nhẫn nại (Gaman) trong tâm lý học và quản trị doanh nghiệp Nhật Bản.'
    }
  },

  // 3. Traditional Culture & Arts
  {
    id: 'enc_art_01',
    sectionId: 'tradition_arts',
    title: 'Thần Đạo - Phật Giáo, Trà Đạo Chanoyu, Kịch Kabuki & Mỹ Học Wabi-Sabi',
    jpTitle: '神仏習合・茶道・伝統芸能と侘び寂びの美学',
    romaji: 'Shinbutsu Shūgō, Sadō, Dentō Geinō to Wabi-Sabi no Bigaku',
    hiragana: 'しんぶつしゅうごう・さどう・でんとうげいのう と わびさびのびがく',
    level: 'N1',
    badge: 'Shinto · Phật Giáo · Trà Đạo · Wabi-Sabi',
    summary:
      'Hòa quyện tôn giáo "Thần Phật tập hợp" độc nhất vô nhị, nghệ thuật Trà đạo Chanoyu bốn chữ Hòa - Kính - Thanh - Tịch, kịch múa Kabuki và Noh, trang phục Kimono, kiến trúc nhà cổ Machiya cùng quan niệm thẩm mỹ sâu sắc Wabi-Sabi tôn vinh sự bất toàn.',
    keyTakeaways: [
      'Tín ngưỡng "Thần Phật tập hợp" (Shinbutsu-shūgō): Người Nhật sinh ra làm lễ rửa tội tại Đền Thần đạo (Shinto Shrine), cưới tại nhà thờ hoặc đền, và khi qua đời làm tang lễ theo nghi thức Phật giáo (Buddhist Temple).',
      'Phân biệt Đền thờ Thần đạo (Jinja / 神社) có cổng Torii đỏ, nước thanh tẩy Temizuya, vỗ tay 2 cái; còn Chùa Phật giáo (Otera / お寺) có cổng Tam quan Sanmon, tháp chuông, thắp hương và chắp tay khấn nguyện tĩnh lặng không vỗ tay.',
      'Trà đạo (Chanoyu / Sadou): Khởi xướng bởi Thiền sư Sen no Rikyu với 4 nguyên lý vàng: Hòa (hòa hợp) - Kính (tôn trọng) - Thanh (thanh tịnh) - Tịch (yên bình tĩnh tại), đi kèm triết lý "Ichigo Ichie" (Nhất kỳ nhất hội - mỗi lần gặp gỡ là duy nhất trong đời).',
      'Nghệ thuật biểu diễn: Kịch Noh (kịch mặt nạ tao nhã tĩnh lặng thời quý tộc Muromachi) và Kịch Kabuki (kịch nghệ bình dân phục trang sặc sỡ, hóa trang Kumadori phóng đại thời Edo).',
      'Triết lý thẩm mỹ Wabi-Sabi (侘び寂び): Trân trọng vẻ đẹp mộc mạc, bất toàn, rạn nứt qua thời gian; thể hiện qua nghệ thuật hàn gắn gốm sứ bằng vàng (Kintsugi) và nghệ thuật cắm hoa Ikebana.',
      'Trang phục & Kiến trúc: Áo Kimono lộng lẫy và áo Yukata cotton thoáng mát mùa hè; Nhà phố truyền thống Machiya bằng gỗ với vách giấy Shoji, sàn chiếu Tatami và vườn nhỏ Tsuboniwa đón nắng gió.',
    ],
    detailedExplanation:
      'Tâm hồn Nhật Bản được hình thành từ hai dòng chảy tâm linh song hành: Thần đạo (Shinto) - tín ngưỡng bản địa tôn thờ 8 triệu vị thần (Yaoyorozu no Kami) ngự trị trong từng ngọn núi, gốc cây cổ thụ, hòn đá và dòng suối, gắn liền với tình yêu thiên nhiên thuần khiết; và Phật giáo Đại thừa du nhập từ thế kỷ thứ 6, mang theo triết lý Vô thường (Mujo) và luật nhân quả. Hai tôn giáo không triệt tiêu nhau mà hòa hợp tạo nên một thế giới quan bao dung. Đỉnh cao văn hóa thẩm mỹ Nhật Bản chính là quan niệm Wabi-Sabi: "Wabi" là sự giản dị, tĩnh lặng, không phô trương; "Sabi" là dấu vết nhuốm màu thời gian, phong rêu cổ kính. Trong Trà đạo, một chiếc chén gốm méo mó, men không đều lại được đánh giá cao hơn một chiếc đĩa tròn trịa công nghiệp, bởi nó mang linh hồn độc bản của người thợ gốm. Cùng với nghệ thuật Cắm hoa (Ikebana/Kado), Thư pháp (Shodo), Nghệ thuật gấp giấy (Origami) và Kịch Noh/Kabuki, văn hóa truyền thống Nhật là sự tôi luyện kiên trì của người nghệ nhân nhằm biến từng khoảnh khắc đời thường thành nghi lễ nghệ thuật.',
    culturalPhilosophy:
      'Triết lý "Ichigo Ichie" (一期一会 - Nhất kỳ nhất hội) dạy chúng ta rằng: Dù cùng một người bạn uống trà, cùng một căn phòng, nhưng khoảnh khắc này sẽ không bao giờ lặp lại y hệt lần thứ hai trong cuộc đời. Do đó, hãy đối đãi với nhau bằng sự chân thành, kính trọng và toàn tâm toàn ý nhất.',
    practicalAdvice:
      'Khi viếng Đền Thần đạo (Jinja): Đi vòng qua bên hông cổng Torii (tránh chính giữa vì là lối đi của Thần linh). Rửa tay súc miệng tại Temizuya. Đến trước điện thờ: Ném đồng xu 5 Yên (Go-en mang ý nghĩa Duyên may) → Cúi chào 2 lần sâu 90° → Vỗ tay 2 cái dứt khoát → Cầu nguyện trong tâm → Cúi chào lần cuối cùng 1 lần sâu.',
    vocabularyList: [
      { word: '一期一会', reading: 'いちごいちえ', meaning: 'Nhất kỳ nhất hội - Mỗi cuộc hội ngộ là duy nhất trong đời', level: 'N1' },
      { word: '侘び寂び', reading: 'わびさび', meaning: 'Mỹ học Wabi-Sabi: Vẻ đẹp mộc mạc, bất toàn và phong trần', level: 'N1' },
      { word: '鳥居', reading: 'とりい', meaning: 'Cổng Torii phân định cõi thiêng liêng và cõi phàm tục', level: 'N2' },
      { word: '金継ぎ', reading: 'きんつぎ', meaning: 'Nghệ thuật hàn gắn đồ gốm vỡ bằng bột vàng Kintsugi', level: 'N1' },
      { word: '着物', reading: 'きもの', meaning: 'Trang phục truyền thống Kimono Nhật Bản', level: 'N5' },
      { word: '畳', reading: 'たたみ', meaning: 'Chiếu cói Tatami truyền thống', level: 'N3' },
    ],
    quickFact:
      'Kịch Noh của Nhật Bản được UNESCO công nhận là một trong những loại hình nghệ thuật sân khấu biểu diễn lâu đời nhất thế giới vẫn còn duy trì biểu diễn nguyên vẹn từ thế kỷ 14.',
    tags: ['Thần Đạo', 'Trà Đạo', 'Wabi-Sabi', 'Kabuki', 'Kimono', 'Ichigo Ichie'],
    quiz: {
      question: 'Bốn nguyên lý vàng của nghệ thuật Trà đạo Chanoyu được Thiền sư Sen no Rikyu đúc kết là gì?',
      options: [
        'A. Tiền - Tài - Danh - Vọng',
        'B. Hòa (Hài hòa) - Kính (Tôn kính) - Thanh (Thanh tịnh) - Tịch (Tĩnh lặng)',
        'C. Nhanh - Gọn - Lẹ - Chuẩn',
        'D. Đẹp - Sang - Quý - Hiếm'
      ],
      correctIndex: 1,
      explanation: 'Bốn chữ Hòa - Kính - Thanh - Tịch (和・敬・清・寂 / Wa - Kei - Sei - Jaku) là kim chỉ nam của Trà đạo, hướng con người tới sự khiêm nhường, tĩnh lặng và trân trọng từng phút giây hiện tại (Ichigo Ichie).',
      culturalContext: 'Bước vào phòng trà qua cửa Chashitsu hẹp đòi hỏi mọi người phải cúi mình bò vào, cởi bỏ kiếm và địa vị xã hội bên ngoài.'
    }
  },

  // 4. Washoku Cuisine
  {
    id: 'enc_foo_01',
    sectionId: 'washoku_cuisine',
    title: 'Ẩm Thực Washoku Di Sản UNESCO, Tinh Thần Đũa Hashi & Nghệ Thuật Kaiseki',
    jpTitle: 'ユネスコ無形文化遺産「和食」と箸文化・会席料理',
    romaji: 'Yunesuko Mukei Bunka Isan "Washoku" to Hashi Bunka, Kaiseki Ryōri',
    hiragana: 'ゆねすこむけいぶんかいさん「わしょく」と はしぶんか・かいせきりょうり',
    level: 'N2',
    badge: 'Washoku · Sushi · Ramen · Nghi Thức Đũa Hashi',
    summary:
      'Được UNESCO vinh danh là Di sản văn hóa phi vật thể của nhân loại năm 2013, ẩm thực Washoku thể hiện sự tôn kính thiên nhiên bốn mùa qua triết lý "Một canh ba món" (Ichiju Sansai), các món ăn biểu tượng Sushi, Sashimi, Ramen, Kaiseki cùng những quy tắc dùng đũa và lời cảm tạ Itadakimasu.',
    keyTakeaways: [
      'Triết lý "Ichiju Sansai" (一汁三菜 - 1 canh 3 món): Cơ cấu bữa ăn cân bằng dinh dưỡng tuyệt hảo gồm 1 chén cơm trắng (chính), 1 bát súp miso canh tương, và 3 món ăn kèm (món chính giàu đạm, món phụ rau củ muối).',
      'Món ăn quốc hồn quốc túy: Sushi (cơm trộn giấm và hải sản tươi sống Edo-mae), Sashimi, Ramen (văn hóa húp xì xụp "Zuru-zuru" để cảm nhận trọn vẹn hương vị), Tempura chiên bột mỏng giòn tan, Lẩu Nabe gia đình quây quần mùa đông, Udon và Soba.',
      'Đỉnh cao Kaiseki Ryori (会席料理): Yến tiệc ẩm thực truyền thống cao cấp nhất của Nhật Bản, nơi mỗi món ăn được trình bày như một tác phẩm hội họa phản ánh thời tiết, hoa lá của đúng tháng đó.',
      'Câu thần chú bàn ăn: "Itadakimasu" (いただきます - Xin đón nhận sinh mệnh của vạn vật và công sức người nấu) trước bữa ăn, và "Gochisousama-deshita" (ごちそうさまでした - Đã nhận được bữa ăn thịnh soạn đầy vất vả) sau bữa ăn.',
      'Cấm kỵ dùng đũa Hashi: Không cắm đũa thẳng đứng vào bát cơm (Tsukitate-bashi - chỉ làm trong tang lễ), không chuyền thức ăn đũa-sang-đũa (Hashi-watashi - giống nghi thức gắp tro hài cốt), không chọc đũa xuyên qua thức ăn (Sashi-bashi), không gõ đũa vào bát (Tataki-bashi).',
    ],
    detailedExplanation:
      'Năm 2013, "Washoku: Văn hóa ẩm thực truyền thống của người Nhật" chính thức được UNESCO công nhận là Di sản văn hóa phi vật thể của nhân loại. Không chỉ đơn thuần là việc thưởng thức đồ ăn, Washoku là sự hòa hợp kỳ diệu giữa thiên nhiên, sức khỏe và tính thẩm mỹ. Bốn đặc trưng cốt lõi của Washoku gồm: 1. Đề cao sự tươi ngon và hương vị tự nhiên của nguyên liệu bản địa; 2. Cân bằng dinh dưỡng lành mạnh giúp người Nhật có tuổi thọ trung bình hàng đầu thế giới; 3. Thể hiện vẻ đẹp biến chuyển của 4 mùa qua cách bài trí lá phong, hoa anh đào, hoa cúc; 4. Gắn kết chặt chẽ với các lễ nghi phong tục cổ truyền như bánh dày Mochi ngày Tết, đậu nành nướng lễ Setsubun. Nghệ thuật Sushi là đỉnh cao của sự tinh tế: Người đầu bếp (Itamae) kiểm soát nhiệt độ bàn tay và độ chua của giấm cơm Shari tương thích hoàn hảo với từng lát cá Neta. Đi kèm với ẩm thực là thế giới Rượu gạo truyền thống Nihonshu (Sake) được ủ kỳ công từ hạt gạo mài tinh khiết và nguồn nước ngầm tuyết tan, cùng văn hóa Trà xanh Matcha thượng hạng vùng Uji Kyoto.',
    culturalPhilosophy:
      'Trong văn hóa Nhật, việc húp mì Ramen hay mì Soba phát ra tiếng xì xụp lớn ("Zuru-zuru") không hề bị coi là bất lịch sự, mà ngược lại là lời khen ngợi chân thành nhất gửi tới người đầu bếp rằng nước dùng đang rất ngon và sợi mì vừa chín tới, đồng thời giúp không khí mát tràn vào khoang miệng làm bùng nổ hương vị dashi.',
    practicalAdvice:
      'Khi dùng bữa tại nhà hàng Nhật: Đặt đũa nằm ngang trên thanh gác đũa (Hashioki) song song với mép bàn ăn, đầu đũa hướng về bên trái. Ăn Sushi đúng điệu bằng cách chấm phần mặt cá (Neta) vào nước tương, tuyệt đối không chấm ngập phần cơm trắng (Shari) vì sẽ làm cơm rã ra và mặn gắt.',
    vocabularyList: [
      { word: '一汁三菜', reading: 'いちじゅうさんさい', meaning: 'Triết lý bữa ăn Nhật 1 canh 3 món cân bằng dinh dưỡng', level: 'N1' },
      { word: 'いただきます', reading: 'いただきます', meaning: 'Câu nói tạ ơn thiêng liêng trước khi bắt đầu bữa ăn', level: 'N5' },
      { word: 'ごちそうさま', reading: 'ごちそうさま', meaning: 'Lời cảm tạ sau bữa ăn (Cảm ơn vì bữa ăn ngon chu đáo)', level: 'N5' },
      { word: '箸置き', reading: 'はしおき', meaning: 'Thanh gác đũa gốm sứ trên bàn ăn', level: 'N3' },
      { word: '出汁', reading: 'だし', meaning: 'Nước dùng Dashi cốt lõi chiết xuất từ cá bào Katsuobushi và tảo bẹ Kombu', level: 'N2' },
      { word: '旬', reading: 'しゅん', meaning: 'Mùa vụ ngon nhất của một loại nguyên liệu ẩm thực', level: 'N1' },
    ],
    quickFact:
      'Tokyo là thành phố sở hữu nhiều nhà hàng đạt sao Michelin nhất thế giới trong nhiều năm liên tiếp, vượt qua cả Paris và New York nhờ sự cầu toàn tuyệt đối của các đầu bếp Nhật.',
    tags: ['Ẩm thực', 'Washoku', 'Sushi', 'Ramen', 'Kaiseki', 'Quy tắc dùng đũa'],
    quiz: {
      question: 'Hành vi nào sau đây là điều CẤM KỴ TỐI KỴ khi sử dụng đũa Hashi trong văn hóa ẩm thực Nhật Bản vì gợi nhớ đến tang lễ?',
      options: [
        'A. Đặt đũa lên thanh gác đũa Hashioki',
        'B. Cắm đũa thẳng đứng vào giữa bát cơm trắng (Tsukitate-bashi)',
        'C. Dùng hai tay cầm đũa',
        'D. Gắp một miếng cá hồi chấm vào nước tương'
      ],
      correctIndex: 1,
      explanation: 'Cắm đũa thẳng đứng vào bát cơm (Tsukitate-bashi) là nghi thức cúng cơm cho người đã khuất trong tang lễ Phật giáo. Trong bữa ăn thông thường, điều này mang lại điềm gở xui xẻo cực kỳ kiêng kỵ.',
      culturalContext: 'Tương tự, hành vi chuyền thức ăn từ đầu đũa người này sang đầu đũa người khác (Hashi-watashi) cũng bị cấm vì giống nghi thức nhặt tro cốt.'
    }
  },

  // 5. Society & Customs
  {
    id: 'enc_soc_01',
    sectionId: 'society_customs',
    title: 'Nghệ Thuật Cúi Đầu Ojigi, Quy Tắc Tàu Điện Densha & Lễ Hội Matsuri Bốn Mùa',
    jpTitle: 'お辞儀のマナー・電車のルールと四季の祭り（年中行事）',
    romaji: 'Ojigi no Manā, Densha no Rūru to Shiki no Matsuri',
    hiragana: 'おじぎのまなー・でんしゃのるーる と しきのまつり',
    level: 'N2',
    badge: 'Cúi Đầu Ojigi · Densha Manners · Hanami & Oshogatsu',
    summary:
      'Trật tự xã hội chuẩn mực của Nhật Bản vận hành trên nền tảng tôn trọng không gian chung (Meiwaku o kakenai), nghệ thuật cúi đầu Ojigi 3 cấp độ, văn hóa yên lặng tuyệt đối trên tàu điện ngầm, thói quen cởi giày tại Genkan, và không khí tưng bừng của các lễ hội truyền thống bốn mùa Matsuri.',
    keyTakeaways: [
      '3 Cấp độ cúi chào Ojigi chuẩn công sở: Eshaku (会釈 - cúi 15° chào gặp mặt hàng ngày); Keirei (敬礼 - cúi 30° chào đối tác, khách hàng và cấp trên); Saikeirei (最敬礼 - cúi sâu 45° tạ lỗi chân thành hoặc chào đón nhân vật trọng đại).',
      'Văn hóa tàu điện ngầm Densha: Bật chế độ im lặng "Manner Mode", tuyệt đối không nghe gọi điện thoại trên toa tàu, không nói chuyện ồn ào, nhường ghế ưu tiên (Yūsenseki), balô đeo ngược ra trước ngực tránh va chạm người khác.',
      'Văn hóa tháo giày tại Genkan: Phân định ranh giới thiêng liêng sạch sẽ giữa trong nhà và ngoài đường. Khi bước vào nhà người Nhật, cởi giày quay mũi giày hướng ra phía cửa ngoài, đổi sang dép đi trong nhà, và sử dụng dép riêng khi vào nhà vệ sinh.',
      '4 Lễ hội lớn tiêu biểu trong năm: Ngắm hoa anh đào Hanami (tháng 3-4), Lễ hội pháo hoa Hanabi mùa hè cùng mặc áo Yukata (tháng 7-8), Đêm giao thừa Omisoka ăn mì trường thọ Toshikoshi Soba (31/12), và Tết Oshogatsu viếng đền Hatsumode (1-3/1).',
      'Mối quan hệ Senpai - Kohai (Tiền bối - Hậu bối): Tiền bối dẫn dắt hướng dẫn tận tình, hậu bối tôn trọng kính cẩn bằng Kính ngữ Keigo; văn hóa làm việc nhóm qua nguyên tắc Ho-Ren-So (Báo cáo - Liên lạc - Thảo luận).',
    ],
    detailedExplanation:
      'Xã hội Nhật Bản nổi tiếng toàn cầu bởi sự an toàn, ngăn nắp và tính kỷ luật cao độ. Cốt lõi của điều này bắt nguồn từ quan niệm "Meiwaku o kakenai" (迷惑をかけない - Tuyệt đối không làm phiền hoặc gây phiền toái cho người xung quanh). Từ khi còn học mẫu giáo, trẻ em Nhật đã được dạy cách tự dọn dẹp khay cơm, lau sàn lớp học và xếp hàng trật tự. Khi bước vào công sở, người Nhật ứng xử tinh tế thông qua hai lớp tâm lý: "Honne" (bản tâm thực sự) và "Tatemae" (lời nói lịch thiệp vì sự hòa khí chung). Nghi thức cúi đầu chào (Ojigi) là ngôn ngữ không lời thể hiện sự khiêm nhường: Khi cúi chào, mắt nhìn xuống cách chân khoảng 1.5m, lưng thẳng, hai tay thả nhẹ bên hông (nam) hoặc đan nhẹ trước bụng (nữ). Bên cạnh sự kỷ luật, tâm hồn người Nhật lại bùng nổ nhiệt huyết trong các lễ hội Matsuri: Tiếng hò hét "Wasshoi" khi khiêng kiệu thần Mikoshi qua phố, tiếng trống Taiko trầm hùng rung chuyển trời đêm, và những quầy hàng Yatai bán bạch tuộc nướng Takoyaki, kẹo táo Ringo-ame tạo nên nét văn hóa rực rỡ đầy gắn kết.',
    culturalPhilosophy:
      'Văn hóa "Omoiyari" (思いやり - Sự thấu cảm chu đáo): Người Nhật luôn đặt mình vào vị trí của người khác để hành động trước khi người đó phải lên tiếng yêu cầu. Đó là lý do tài xế xe buýt Nhật luôn đợi người già ngồi vững mới lăn bánh, và bưu tá luôn bọc thêm lớp nilon ngoài hộp quà khi trời mưa.',
    practicalAdvice:
      'Khi đi thang cuốn tại Nhật Bản: Ở vùng Kanto (Tokyo), mọi người luôn đứng bên TRÁI, nhường bên PHẢI cho người vội bước đi. Ngược lại ở vùng Kansai (Osaka), mọi người lại đứng bên PHẢI, nhường bên TRÁI. Hãy quan sát dòng người phía trước và hòa theo một cách tự nhiên.',
    vocabularyList: [
      { word: 'お辞儀', reading: 'おじぎ', meaning: 'Hành vi cúi đầu chào hỏi cung kính', level: 'N3' },
      { word: '迷惑', reading: 'めいわく', meaning: 'Sự phiền hà, làm phiền người xung quanh', level: 'N3' },
      { word: '思いやり', reading: 'おもいやり', meaning: 'Sự thấu cảm, chu đáo nghĩ cho người khác', level: 'N2' },
      { word: '初詣', reading: 'はつもうで', meaning: 'Tục lệ đi viếng đền chùa đầu năm mới cầu bình an', level: 'N2' },
      { word: '先輩・後輩', reading: 'せんぱい・こうはい', meaning: 'Mối quan hệ tiền bối và hậu bối trong trường học và công ty', level: 'N3' },
      { word: '報連相', reading: 'ほうれんそう', meaning: 'Nguyên tắc vàng công sở: Báo cáo - Liên lạc - Bàn bạc', level: 'N2' },
    ],
    quickFact:
      'Ví tiền và điện thoại bị bỏ quên trên các chuyến tàu điện ngầm Tokyo có tỷ lệ được tìm thấy và trả lại nguyên vẹn cho chủ nhân lên tới hơn 85% nhờ hệ thống đồn cảnh sát khu phố Koban và ý thức trung thực của người dân.',
    tags: ['Xã hội', 'Phong tục', 'Ojigi cúi đầu', 'Tàu điện Densha', 'Matsuri', 'Ho-Ren-So'],
    quiz: {
      question: 'Khi đi trên các chuyến tàu điện ngầm Densha tại Nhật Bản, hành vi nào sau đây được coi là vi phạm nghiêm trọng phép lịch sự (Meiwaku)?',
      options: [
        'A. Đeo ba lô ngược ra phía trước ngực',
        'B. Bật chế độ điện thoại im lặng (Manner Mode)',
        'C. Nhấc máy gọi điện thoại nói chuyện rôm rả trên toa tàu',
        'D. Đứng xếp hàng hai bên cửa đợi người trên tàu bước xuống hết'
      ],
      correctIndex: 2,
      explanation: 'Nói chuyện điện thoại trên tàu điện làm ô nhiễm tiếng ồn trong không gian kín chung. Người Nhật luôn tắt chuông (Manner Mode) và từ chối cuộc gọi, nhắn tin báo sẽ gọi lại sau.',
      culturalContext: 'Đây là biểu hiện cốt lõi của tinh thần "Meiwaku o kakenai" - không làm phiền người xung quanh.'
    }
  },

  // 6. Pop Culture
  {
    id: 'enc_pop_01',
    sectionId: 'pop_culture',
    title: 'Văn Hóa Đại Chúng Pop Culture: Anime, Manga, Studio Ghibli, J-Pop & Gaming',
    jpTitle: '日本のポップカルチャー：アニメ・マンガ・J-POPとゲーム',
    romaji: 'Nihon no Poppu Karuchā: Anime, Manga, J-Pop to Gēmu',
    hiragana: 'にほんのぽっぷかるちゃー：あにめ・まんが・じぇいぽっぷ と げーむ',
    level: 'N3',
    badge: 'Anime · Studio Ghibli · City Pop · Nintendo',
    summary:
      'Quyền lực mềm (Cool Japan) chinh phục hàng trăm triệu trái tim toàn cầu: Từ các bộ manga kinh điển của Tezuka Osamu đến các siêu phẩm Anime của Studio Ghibli, MAPPA, KyoAni; làn sóng hồi sinh City Pop thập niên 80; ca sĩ ảo Vocaloid và ngành công nghiệp trò chơi điện tử thống trị của Nintendo, Sony PlayStation.',
    keyTakeaways: [
      'Công nghiệp Anime & Manga: Xuất phát từ "Ông tổ Manga" Tezuka Osamu (Astro Boy), phát triển thành nền công nghiệp trị giá hàng chục tỷ USD với các thể loại phong phú từ Shonen (Naruto, One Piece, Dragon Ball), Seinen, đến Shojo.',
      'Các Studio hoạt hình huyền thoại: Studio Ghibli của đạo diễn Hayao Miyazaki (Spirited Away đạt giải Oscar), Studio MAPPA (Attack on Titan, Jujutsu Kaisen), Kyoto Animation (Violet Evergarden), Ufotable (Demon Slayer).',
      'Thánh địa Akihabara & Văn hóa Otaku: Nơi hội tụ các cửa hàng truyện tranh, Figure mô hình đồ chơi tinh xảo, quán cà phê hầu gái Maid Cafe và các sự kiện triển lãm Cosplay khổng lồ như Comiket.',
      'Âm nhạc J-Pop & Làn sóng City Pop: Sự trỗi dậy mạnh mẽ của YOASOBI, Kenshi Yonezu, Ado; cùng sự hồi sinh kỳ diệu trên TikTok toàn cầu của dòng nhạc City Pop hoài niệm thập niên 80 ("Stay With Me" - Miki Matsubara, "Plastic Love" - Mariya Takeuchi).',
      'Đế chế Video Games: Nintendo (Mario, Zelda, Pokemon) và Sony PlayStation định hình tuổi thơ của nhiều thế hệ game thủ toàn cầu; cùng phong cách thời trang đường phố nổi loạn đầy tự do tại Harajuku (Lolita, Decora, Visual Kei).',
    ],
    detailedExplanation:
      'Nhật Bản là một trong số rất ít quốc gia trên thế giới biến các sản phẩm văn hóa đại chúng (Pop Culture) thành "quyền lực mềm" (Soft Power) mang tầm ảnh hưởng toàn cầu sâu rộng thông qua chiến lược quốc gia "Cool Japan". Khác với hoạt hình phương Tây vốn từng bị coi chỉ dành cho thiếu nhi, Anime và Manga Nhật Bản khai thác những tầng sâu triết lý nhân sinh phức tạp, cái chết, chiến tranh, tình đồng đội và sự cô đơn của con người trong xã hội hiện đại. Những tác phẩm như "Spirited Away" (Sen và Chihiro ở thế giới thần bí) hay "Your Name" (Kimi no Na wa) của Makoto Shinkai đã đưa hoạt hình trở thành loại hình nghệ thuật điện ảnh hàn lâm được thế giới kính nể. Âm nhạc Nhật Bản cũng tạo nên những bước đột phá kỳ lạ: Văn hóa ca sĩ ảo Vocaloid với biểu tượng Hatsune Miku - một phần mềm tổng hợp giọng hát có thể tổ chức các concert 3D Hologram cháy vé khắp thế giới; hay các bản nhạc Anisong giai điệu dồn dập đầy cảm xúc. Tại khu phố Harajuku Tokyo, giới trẻ tự do biểu đạt cá tính thông qua thời trang phá cách, biến đường phố thành sàn diễn thời trang không biên giới.',
    culturalPhilosophy:
      'Sức hút ma thuật của Anime và Manga bắt nguồn từ "Kotodama" (Linh hồn của ngôn từ) và sự tôn trọng tuyệt đối trí tưởng tượng. Dù trong hoàn cảnh tuyệt vọng nhất, các nhân vật chính luôn giữ vững tinh thần "Fukutsu" (Bất khuất) và lòng tin tưởng tuyệt đối vào bạn bè ("Nakama").',
    practicalAdvice:
      'Học tiếng Nhật qua Anime là phương pháp tuyệt vời để rèn luyện phản xạ nghe, nhưng hãy lưu ý: Các nhân vật Anime thường sử dụng nhiều đại từ suồng sã (như Omae, Kisama, Ore) hoặc đuôi câu phóng đại. Trong đời sống thực tế và công sở, hãy luôn sử dụng ngôn ngữ chuẩn mực (Desu/Masu) để giữ sự lịch thiệp.',
    vocabularyList: [
      { word: '漫画', reading: 'まんが', meaning: 'Truyện tranh Manga Nhật Bản', level: 'N4' },
      { word: '聖地巡礼', reading: 'せいちじゅんれい', meaning: 'Hành hương đến địa điểm đời thực xuất hiện trong phim Anime', level: 'N1' },
      { word: '声優', reading: 'せいゆう', meaning: 'Diễn viên lồng tiếng cho nhân vật Anime', level: 'N2' },
      { word: '仲間', reading: 'なかま', meaning: 'Đồng đội, chiến hữu tri kỷ cùng chung chí hướng', level: 'N3' },
      { word: '原画', reading: 'げんが', meaning: 'Bản vẽ hoạt hình gốc của họa sĩ', level: 'N2' },
      { word: '主題歌', reading: 'しゅだいか', meaning: 'Bài hát chủ đề / Nhạc phim Anime (Anisong)', level: 'N2' },
    ],
    quickFact:
      'Bộ phim Anime điện ảnh "Demon Slayer: Mugen Train" (Chuyến tàu vô tận) ra mắt năm 2020 đã xô đổ mọi kỷ lục phòng vé lịch sử Nhật Bản với doanh thu vượt qua 40 tỷ Yên, vượt qua cả bom tấn Titanic và Sen & Chihiro.',
    tags: ['Pop Culture', 'Anime', 'Manga', 'Studio Ghibli', 'J-Pop', 'Gaming Nintendo'],
    quiz: {
      question: 'Bộ phim hoạt hình Anime duy nhất nào của Nhật Bản và châu Á từng đoạt giải thưởng Oscar danh giá cho Phim hoạt hình hay nhất (Academy Award for Best Animated Feature)?',
      options: [
        'A. Your Name (Kimi no Na wa)',
        'B. Spirited Away (Sen to Chihiro no Kamikakushi) của Studio Ghibli',
        'C. Demon Slayer: Mugen Train',
        'D. Attack on Titan'
      ],
      correctIndex: 1,
      explanation: 'Kiệt tác "Spirited Away" (2001) của đạo diễn huyền thoại Hayao Miyazaki đã xuất sắc giành giải Oscar năm 2003, đưa tên tuổi của Studio Ghibli lên đỉnh cao điện ảnh thế giới.',
      culturalContext: 'Miyazaki còn tiếp tục đoạt giải Oscar thứ hai năm 2024 với bộ phim "The Boy and the Heron" (Thiếu niên và chim diệc).'
    }
  },

  // 7. Travel & Practical Guide
  {
    id: 'enc_tra_01',
    sectionId: 'travel_practical',
    title: 'Cẩm Nang Di Chuyển IC Card, Shinkansen, Tiền Mặt & Sinh Tồn Thực Tế Tại Nhật',
    jpTitle: '日本滞在実用ガイド：交通系ICカード・新幹線・現金とゴミ分別',
    romaji: 'Nihon Taizai Jitsuyō Gaido: Kōtsūkei IC Kādo, Shinkansen, Genkin to Gomi Bunbetsu',
    hiragana: 'にほんたいざいじつようがいど：こうつうけいあいしーかーど・しんかんせん・げんきん と ごみぶんべつ',
    level: 'N3',
    badge: 'Suica / Pasmo · Shinkansen · Thanh Toán · Phân Loại Rác',
    summary:
      'Cẩm nang toàn diện hỗ trợ du lịch và định cư tại Nhật: Phương tiện giao thông siêu tốc Shinkansen, thẻ giao thông IC Card Suica/Pasmo chạm là mở, cách kết hợp tiền mặt và thanh toán số PayPay, quy tắc phân loại rác chi tiết tại các quận và giải pháp kết nối internet eSIM du lịch.',
    keyTakeaways: [
      'Giao thông công cộng: Thẻ IC Card (Suica, Pasmo tại Tokyo; Icoca tại Kansai) dùng quẹt tàu điện, xe buýt, mua nước tại máy bán hàng tự động Jihanki và thanh toán tại siêu thị tiện lợi Konbini.',
      'Tàu cao tốc Shinkansen: Vận tốc thương mại tới 320 km/h, đúng giờ đến từng giây (độ trễ trung bình hàng năm dưới 1 phút), kết nối Tokyo - Osaka chỉ mất 2 giờ 20 phút bằng chuyến tàu Nozomi.',
      'Thanh toán thực tế: Dù ví điện tử (PayPay, Line Pay) và thẻ tín dụng phát triển, Nhật Bản vẫn là xã hội rất chuộng Tiền mặt (Cash). Luôn thủ sẵn vài nghìn yên tiền mặt và tiền xu để ăn quán ramen mua vé qua máy Shokenki hoặc cúng dường đền chùa.',
      'Quy tắc phân loại rác: Không có thùng rác công cộng trên đường (sau vụ khủng hoảng khí Sarin 1995). Rác gia đình chia làm 3 loại chính: Rác cháy được (Moeru Gomi - vỏ chuối, giấy bẩn), Rác không cháy được (Moenai Gomi - mảnh kim loại, gốm vỡ), và Rác tài nguyên tái chế (Shigen Gomi - chai nhựa PET bóc nhãn xúc sạch, lon nhôm, vỏ hộp sữa).',
      'Kết nối mạng viễn thông: Lựa chọn thuê Pocket Wifi tại sân bay (cho nhóm đông người) hoặc cài đặt eSIM du lịch quét mã QR tiện lợi ngay trên smartphone.',
    ],
    detailedExplanation:
      'Hạ tầng giao thông và dịch vụ đời sống tại Nhật Bản được đánh giá là tiện lợi và an toàn hàng đầu thế giới. Trái tim của hệ thống giao thông đô thị là các thẻ IC Card (Suica, Pasmo). Du khách hiện nay có thể dễ dàng nạp thẻ Suica kỹ thuật số trực tiếp vào Apple Wallet hoặc Google Wallet để chạm điện thoại qua cổng soát vé tự động mà không cần xếp hàng mua vé giấy. Tàu Shinkansen là biểu tượng của công nghệ đường sắt cao tốc, trang bị hệ thống phanh khẩn cấp tự động kích hoạt ngay khi cảm biến địa chấn phát hiện động đất. Về nếp sống sinh hoạt, một trong những cú sốc văn hóa đầu tiên của người nước ngoài là việc đường phố Nhật hầu như không tìm thấy một chiếc thùng rác công cộng nào, nhưng vỉa hè vẫn sạch bong không một cọng rác. Người Nhật có thói quen tự mang rác của mình về nhà để phân loại vứt đúng ngày lịch thu gom của khu phố (Gomi Shūshūbi). Chuỗi cửa hàng tiện lợi Konbini (7-Eleven, Lawson, FamilyMart) mở cửa 24/7 cung cấp đủ mọi dịch vụ: Từ in ấn tài liệu, gửi bưu kiện Yamato Takkyubin, thanh toán tiền điện nước đến rút tiền mặt ATM đa ngôn ngữ.',
    culturalPhilosophy:
      'Quy tắc tự mang rác về nhà phản ánh sâu sắc đạo đức công dân "Jiritsu" (Tự lập - Tự chịu trách nhiệm với những gì mình tạo ra). Người Nhật tin rằng không gian công cộng thuộc về tất cả mọi người, không ai có quyền làm vấy bẩn sự thanh sạch chung của xã hội.',
    practicalAdvice:
      'Khi mua đồ uống đóng chai PET tại máy bán nước tự động (Jidouhanbaiki): Thùng rác bên cạnh máy CHỈ DÀNH RIÊNG cho vỏ chai lon tái chế mua từ máy, tuyệt đối không nhét cốc cà phê giấy hay túi rác cá nhân vào đó. Hãy bóc rời nhãn nilon và nắp nhựa trước khi thả chai vào lỗ thu gom.',
    vocabularyList: [
      { word: '新幹線', reading: 'しんかんせん', meaning: 'Tàu cao tốc siêu tốc Shinkansen Nhật Bản', level: 'N4' },
      { word: '自動販売機', reading: 'じどうはんばいき', meaning: 'Máy bán hàng tự động hiện diện khắp các ngõ phố', level: 'N3' },
      { word: 'ゴミ分別', reading: 'ごみぶんべつ', meaning: 'Phân loại rác thải sinh hoạt theo quy chuẩn', level: 'N2' },
      { word: '燃えるゴミ', reading: 'もえるごみ', meaning: 'Rác cháy được (rác thực phẩm hữu cơ, giấy vụn)', level: 'N3' },
      { word: 'コンビニ', reading: 'コンビニ', meaning: 'Cửa hàng tiện lợi 24/7 (7-Eleven, FamilyMart, Lawson)', level: 'N5' },
      { word: '両替', reading: 'りょうがえ', meaning: 'Đổi tiền lẻ, đổi ngoại tệ', level: 'N3' },
    ],
    quickFact:
      'Nhật Bản có hơn 4 triệu máy bán hàng tự động (Jidōhanbaiki) trên toàn quốc, tương đương cứ khoảng 30 người dân thì có một chiếc máy, phục vụ đồ uống nóng hổi vào mùa đông và mát lạnh vào mùa hè.',
    tags: ['Du lịch', 'Shinkansen', 'Suica', 'IC Card', 'Phân loại rác', 'Konbini'],
    quiz: {
      question: 'Khi vứt một chai nhựa đựng nước ngọt PET tại Nhật Bản, bạn cần thực hiện những bước nào để tuân thủ đúng quy tắc phân loại rác tái chế (Shigen Gomi)?',
      options: [
        'A. Vứt cả chai còn đầy nước vào thùng rác bất kỳ',
        'B. Đốt chai nhựa trong vườn',
        'C. Trút hết nước, xúc sạch, bóc tách nhãn nilon và nắp nhựa riêng, sau đó bỏ thân chai vào ô thu gom chai PET',
        'D. Đập nát chai bằng búa rồi vùi xuống đất'
      ],
      correctIndex: 2,
      explanation: 'Nắp nhựa và nhãn nilon thuộc nhóm rác nhựa (Pura), trong khi thân chai thuộc nhóm chai PET. Việc xúc sạch nước giúp ngăn mùi hôi và hỗ trợ dây chuyền tái chế tự động đạt hiệu suất cao.',
      culturalContext: 'Ý thức phân loại rác tỉ mỉ là niềm tự hào về bảo vệ môi trường của mọi công dân Nhật.'
    }
  },

  // 8. Lifelong Learning & Japanese Philosophy
  {
    id: 'enc_lrn_01',
    sectionId: 'lifelong_learning',
    title: 'Phương Pháp Học Suốt Đời Của Người Nhật: Triết Lý Kaizen 1%, Ikigai & Monozukuri',
    jpTitle: '日本の生涯学習法：カイゼン哲学・生きがい・ものづくり精神',
    romaji: 'Nihon no Shōgai Gakushū-hō: Kaizen Tetsugaku, Ikigai, Monozukuri Seishin',
    hiragana: 'にほんのしょうがいがくしゅうほう：かいぜんてつがく・いきがい・ものづくりせいしん',
    level: 'N1',
    badge: 'Học Suốt Đời · Kaizen 1% · Ikigai · Monozukuri',
    summary:
      'Khám phá bí quyết đưa một đảo quốc nghèo tài nguyên vươn lên thành cường quốc kinh tế và tuổi thọ: Phương pháp học tập suốt đời (Shōgai Gakushū), triết lý Kaizen cải tiến bền bỉ 1% mỗi ngày, văn hóa tự soi chiếu Hansei, tinh thần nghệ nhân Monozukuri và bí quyết tìm kiếm lẽ sống Ikigai.',
    keyTakeaways: [
      'Triết lý Kaizen (改善): Nghĩa đen là "thay đổi để tốt hơn". Không tìm kiếm những bước nhảy vọt hào nhoáng không tưởng, Kaizen tập trung vào việc cải tiến nhỏ 1% mỗi ngày một cách đều đặn, tạo nên bước tiến lũy thừa khổng lồ theo năm tháng.',
      'Văn hóa tự soi chiếu Hansei (反省): Nhìn nhận thẳng thắn lỗi sai và khuyết điểm của bản thân mà không tự ti hay đổ lỗi cho hoàn cảnh, lấy đó làm dữ liệu quý báu để nâng cấp quy trình làm việc.',
      'Tinh thần Monozukuri (ものづくり): Đạo đức nghề nghiệp của người thợ thủ công, cống hiến trọn vẹn tâm trí và lòng tự trọng để tạo ra những sản phẩm có độ bền và sự chuẩn xác tuyệt đối đến từng chi tiết vi mô.',
      'Mô hình Ikigai (生きがい - Lẽ sống hạnh phúc): Điểm giao thoa vàng giữa: 1. Điều bạn đam mê; 2. Điều bạn có năng khiếu làm giỏi; 3. Điều thế giới xã hội đang cần; và 4. Điều có thể giúp bạn kiếm ra thu nhập bền vững.',
      'Hệ thống học tập suốt đời (Shōgai Gakushū / 生涯学習): Tại các trung tâm cộng đồng Kominkan và thư viện khắp Nhật Bản, những cụ già 70-80 tuổi vẫn hăng hái học tiếng Anh, lập trình, hội họa và công nghệ mới.',
    ],
    detailedExplanation:
      'Tại Nhật Bản, việc học tập không bao giờ kết thúc khi nhận tấm bằng tốt nghiệp đại học, mà kéo dài suốt cả cuộc đời thông qua khái niệm quốc gia "Shōgai Gakushū" (Học tập suốt đời). Người Nhật tin rằng một người chỉ thực sự già đi khi họ ngừng tò mò và ngừng học hỏi điều mới. Phương pháp học tập của họ được xây dựng trên triết lý "Shu-Ha-Ri" (守・破・离) trong võ đạo và nghệ thuật: 1. "Shu" (Thủ - Tuân thủ tuyệt đối quy tắc cơ bản của thầy); 2. "Ha" (Phá - Đột phá, sáng tạo thử nghiệm phong cách riêng); 3. "Ri" (Ly - Tách rời, đạt tới cảnh giới tự do sáng tạo nghệ thuật của riêng mình). Trong học ngoại ngữ và luyện thi JLPT, triết lý Kaizen khuyên người học: Thay vì đặt mục tiêu học 5 tiếng một ngày rồi bỏ cuộc sau 3 hôm vì kiệt sức, hãy cam kết học đúng 15 phút mỗi ngày không nghỉ một buổi nào. Sự tích lũy đều đặn không đứt đoạn (Keizoku wa chikara nari - Kiên trì chính là sức mạnh) sẽ đánh bại bất kỳ tài năng thiên bẩm nào. Kết hợp cùng tinh thần Ikigai giúp người học tìm thấy niềm vui đích thực trong từng nét chữ Hán Kanji chứ không coi việc học là gánh nặng tra tấn.',
    culturalPhilosophy:
      'Thành ngữ danh ngôn kinh điển của người Nhật:「継続は力なり」(Keizoku wa chikara nari - Bền bỉ chính là sức mạnh tối thượng). Sức mạnh của nước không nằm ở sự hung hãn, mà nằm ở việc từng giọt nước nhỏ đều đặn có thể xuyên thủng cả tảng đá hoa cương ngàn năm.',
    practicalAdvice:
      'Ứng dụng Kaizen vào việc chinh phục tiếng Nhật: Mỗi sáng thức dậy ôn đúng 5 từ vựng mới, mỗi tối trước khi đi ngủ nghe 1 bản tin NHK Easy hoặc đọc 1 bài đọc ngắn. Khi gặp lỗi sai trong bài thi thử, hãy mở sổ tay Hansei ghi chép lại chính xác bẫy logic mình đã mắc phải để không bao giờ vấp ngã lần thứ hai.',
    vocabularyList: [
      { word: '生涯学習', reading: 'しょうがいがくしゅう', meaning: 'Học tập suốt đời - Phong trào giáo dục toàn dân Nhật Bản', level: 'N1' },
      { word: '改善', reading: 'かいぜん', meaning: 'Kaizen: Cải tiến liên tục không ngừng để ngày một tốt hơn', level: 'N2' },
      { word: '反省', reading: 'はんせい', meaning: 'Hansei: Tự kiểm điểm, tự soi chiếu nội tâm để tiến bộ', level: 'N3' },
      { word: '生きがい', reading: 'いきがい', meaning: 'Ikigai: Lẽ sống, mục đích và niềm hạnh phúc thức dậy mỗi ngày', level: 'N2' },
      { word: '継続は力なり', reading: 'けいぞくはちからなり', meaning: 'Kiên trì bền bỉ chính là sức mạnh tối thượng', level: 'N1' },
      { word: '守破離', reading: 'しゅはり', meaning: '3 giai đoạn tu dưỡng: Tuân thủ → Đột phá → Thăng hoa tự tại', level: 'N1' },
    ],
    quickFact:
      'Tập đoàn sản xuất ô tô Toyota đã biến triết lý "Kaizen" thành hệ thống sản xuất TPS (Toyota Production System) nổi tiếng thế giới, nơi bất kỳ công nhân nào trên dây chuyền cũng có quyền giật dây dừng cả nhà máy nếu phát hiện ra một chi tiết nhỏ có thể cải tiến tốt hơn.',
    tags: ['Học suốt đời', 'Kaizen', 'Ikigai', 'Monozukuri', 'Hansei', 'Shu-Ha-Ri'],
    quiz: {
      question: 'Triết lý cải tiến Kaizen (改善) khuyên chúng ta nên áp dụng nguyên tắc nào để đạt được thành công bền vững trong học tập và rèn luyện JLPT?',
      options: [
        'A. Dồn toàn lực thức trắng đêm học cấp tốc trước kỳ thi',
        'B. Bỏ cuộc ngay khi gặp một cấu trúc ngữ pháp khó',
        'C. Cải tiến nhỏ 1% mỗi ngày một cách đều đặn, kiên trì không gián đoạn (Keizoku wa chikara nari)',
        'D. Chỉ học khi có tâm trạng thật vui vẻ'
      ],
      correctIndex: 2,
      explanation: 'Kaizen tập trung vào những thói quen tích lũy nhỏ nhưng bền bỉ (1.01 mũ 365 = 37.8 lần tiến bộ). Sự kiên trì hàng ngày sẽ tạo ra sức mạnh phi thường đánh bại mọi tài năng thiên bẩm.',
      culturalContext: 'Đây là kim chỉ nam giúp hàng triệu học viên Nhật Bản và thế giới làm chủ những kỹ năng phức tạp nhất.'
    }
  },
];

// Additional Curated Encyclopedia Topics for "+5 Tải Thêm" button
export const extraEncyclopediaTopics: EncyclopediaTopicItem[] = [
  // Extra 1: Lâu đài Nhật Bản
  {
    id: 'enc_extra_shiro_01',
    sectionId: 'history_politics',
    title: 'Kiến Trúc Lâu Đài Nhật Bản (Shiro): Kiệt Tác Phòng Thủ & Tháp Canh Tenshukaku',
    jpTitle: '日本の城郭建築と天守閣の防衛構造',
    romaji: 'Nihon no Jōkaku Kenchiku to Tenshukaku no Bōei Kōzō',
    hiragana: 'にほんのじょうかくけんちく と てんしゅかくのぼうえいこうぞう',
    level: 'N2',
    badge: 'Thành Himeji · Tenshukaku · Tường Đá Ishigaki',
    summary:
      'Hệ thống thành quách Shiro thời phong kiến với biểu tượng Lâu đài Hạc Trắng Himeji (Quốc bảo di sản thế giới), thành Matsumoto, thành Osaka cùng kiến trúc hào nước, tường đá xếp thủ công Ishigaki và tháp canh Tenshukaku bất khả xâm phạm.',
    keyTakeaways: [
      'Cấu trúc lâu đài: Tháp canh chính Tenshukaku, hào nước bên trong (Uchibori) và bên ngoài (Sotobori), tường đá Ishigaki không dùng vữa nhưng trụ vững hàng trăm năm động đất.',
      'Thành Himeji (Lâu đài Diệc Trắng Hạc Trắng): Quốc bảo số 1 của Nhật Bản, chưa từng bị tàn phá bởi hỏa hoạn hay bom đạn chiến tranh.',
      'Cơ chế phòng thủ tinh vi: Lối đi mê cung chữ chi (Masugata) bẫy quân địch vào góc chết, lỗ châu mai Sama để bắn tên và súng hỏa mai.',
    ],
    detailedExplanation:
      'Lâu đài Nhật Bản (Shiro / 城) đạt tới đỉnh cao nghệ thuật kiến trúc vào cuối thời kỳ Chiến Quốc và đầu thời kỳ Edo. Khác với pháo đài đá phương Tây thuần túy, thành quách Nhật Bản là sự kết hợp tài tình giữa nền móng đá tảng khổng lồ xếp ghép mộng tinh xảo (Ishigaki) và kiến trúc gỗ nhiều tầng tráng lệ bên trên. Tháp canh Tenshukaku vừa là đài quan sát chỉ huy tối cao, vừa là biểu tượng phô diễn uy quyền của Lãnh chúa Daimyo. Tường thành được trát vôi trắng chống cháy đặc biệt làm từ bột vỏ sò và thạch cao, tạo nên vẻ đẹp thanh khiết như loài chim hạc dang cánh bay lên bầu trời.',
    culturalPhilosophy:
      'Lâu đài Nhật Bản là minh chứng hùng hồn cho sự kết hợp giữa công năng quân sự khắc nghiệt và tính thẩm mỹ tao nhã. Người Nhật quan niệm: Ngay cả trong chiến trận sinh tử, vẻ đẹp và sự hài hòa với phong thủy cảnh quan tự nhiên vẫn là phẩm cách tối cao.',
    practicalAdvice:
      'Khi tham quan các lâu đài cổ nguyên bản như Himeji hay Matsumoto, bạn sẽ phải cởi giày cầm trên tay và leo những bậc thang gỗ cực kỳ dốc (tới 60-70 độ) - vốn được thiết kế để gây khó khăn cho quân địch khi đột nhập. Hãy đi tất dày và cẩn trọng khi bước.',
    vocabularyList: [
      { word: '天守閣', reading: 'てんしゅかく', meaning: 'Tòa tháp canh trung tâm cao nhất của lâu đài', level: 'N1' },
      { word: '石垣', reading: 'いしがき', meaning: 'Bờ tường đá xếp thủ công kiên cố của thành quách', level: 'N2' },
      { word: '城下町', reading: 'じょうかまち', meaning: 'Khu phố thị buôn bán sầm uất dưới chân lâu đài', level: 'N1' },
      { word: '堀', reading: 'ほり', meaning: 'Hào nước bao quanh bảo vệ lâu đài', level: 'N1' },
    ],
    quickFact:
      'Trên toàn nước Nhật hiện nay chỉ còn sót lại đúng 12 lâu đài có tháp canh Tenshukaku nguyên bản bằng gỗ từ thời phong kiến (Genson Jūnitenshu), nổi tiếng nhất là Himeji, Matsumoto, Inuyama và Hikone.',
    tags: ['Lâu đài', 'Thành Himeji', 'Kiến trúc Shiro', 'Lịch sử', 'Daimyo'],
    quiz: {
      question: 'Lâu đài nào sau đây được mệnh danh là "Lâu đài Diệc Trắng" (Hakuro-jo) và là di sản thế giới UNESCO đầu tiên của Nhật Bản?',
      options: [
        'A. Thành Osaka',
        'B. Thành Matsumoto',
        'C. Thành Himeji (tỉnh Hyogo)',
        'D. Thành Nagoya'
      ],
      correctIndex: 2,
      explanation: 'Thành Himeji (姫路城) tráng lệ với các bức tường trắng muốt làm từ thạch cao chống cháy và tháp canh gỗ Tenshukaku nguyên bản, được ví như cánh chim diệc trắng kiêu hãnh.',
      culturalContext: 'Đây là kiệt tác quân sự đỉnh cao thời phong kiến chưa từng bị tàn phá bởi chiến tranh.'
    }
  },

  // Extra 2: Ninja & Shinobi
  {
    id: 'enc_extra_ninja_02',
    sectionId: 'history_politics',
    title: 'Thế Giới Nhẫn Giả Ninja (Shinobi): Nghệ Thuật Thu Thập Tin Tức & Đạo Nhẫn',
    jpTitle: '忍者の真実と忍術：情報収集・サバイバルと「忍」の精神',
    romaji: 'Ninja no Shinjitsu to Ninjutsu: Jōhō Shūshū, Sabaibaru to "Nin" no Seishin',
    hiragana: 'にんじゃのしんじつ と にんじゅつ：じょうほうしゅうしゅう・さばいばる と 「にん」のせいしん',
    level: 'N2',
    badge: 'Iga & Koka · Nhẫn Thuật · Đạo Nhẫn Kiên Trì',
    summary:
      'Giải mã sự thật lịch sử về thế giới Ninja (Shinobi): Khác xa với phim ảnh giả tưởng, sứ mệnh thiêng liêng nhất của Ninja là tình báo, thu thập thông tin mật và sống sót trở về chứ không phải ám sát bừa bãi, rèn giũa chữ Nhẫn (忍) chịu đựng gian khổ tột cùng.',
    keyTakeaways: [
      'Hai cái nôi danh tiếng nhất: Ninja phái Iga (tỉnh Mie) và Ninja phái Koka (tỉnh Shiga), được che chở bởi địa hình thung lũng hiểm trở.',
      'Sứ mệnh cốt lõi của Nhẫn thuật (Ninjutsu): Không phải để tấn công ám sát, mà là nghệ thuật trốn thoát, ngụy trang, thu thập tin tức tình báo quân sự và sống sót để báo cáo cho chủ nhân.',
      'Vũ khí và trang bị: Phi tiêu Shuriken, kiếm ngắn Ninjato, dây leo Kunai, thuốc nổ khói Enmaku và trang phục cải trang thành nhà sư, thương nhân hay nông dân.',
      'Chữ "Nhẫn" (忍): Ghép từ chữ Đao (刀 - lưỡi gươm) đè lên chữ Tâm (心 - trái tim), tượng trưng cho sự kiên định chịu đựng ngay cả khi mũi dao kề sát trái tim.',
    ],
    detailedExplanation:
      'Trong văn hóa đại chúng, Ninja thường bị đóng khung thành những sát thủ mặc đồ đen nhảy qua mái nhà và biến mất trong làn khói. Tuy nhiên, các tài liệu cổ thư nhẫn thuật như "Bansenshukai" (Vạn Xuyên Tập Hải) chỉ ra rằng: Ninja là những điệp viên tình báo bậc thầy thời phong kiến. Họ được đào tạo chuyên sâu về địa lý, thiên văn, dược thảo, tâm lý học và thuật ngụy trang (Hengen-nana-biki - biến hóa 7 thân phận: nhà sư tu hành, nghệ sĩ mãi võ, thầy bói, nông dân, thương gia...). Phương châm sống còn của Ninja là "Bất sát" (hạn chế tối đa việc giết chóc để tránh lộ dấu vết). Trang phục ban đêm của họ thực tế có màu xanh chàm đậm (Kon\'iro) hoặc nâu đất chứ không phải màu đen tuyền, nhằm hòa lẫn hoàn hảo vào bóng tối tự nhiên.',
    culturalPhilosophy:
      'Triết lý của Ninja là bài học sâu sắc về sự thầm lặng cống hiến: Hoàn thành nhiệm vụ lớn lao nhất mà không cần được người đời biết đến tên tuổi hay vinh danh tán dương.',
    practicalAdvice:
      'Bạn có thể ghé thăm Bảo tàng Ninja phái Iga tại thành phố Iga (tỉnh Mie) để khám phá ngôi nhà Ninja đích thực với các cánh cửa xoay bí mật, sàn nhà giấu kiếm và tham gia trải nghiệm phóng phi tiêu Shuriken thực tế.',
    vocabularyList: [
      { word: '忍者', reading: 'にんじゃ', meaning: 'Nhẫn giả Ninja - Điệp viên tình báo thời phong kiến', level: 'N3' },
      { word: '忍術', reading: 'にんじゅつ', meaning: 'Nhẫn thuật - Kỹ nghệ sinh tồn và thu thập tin mật', level: 'N2' },
      { word: '手裏剣', reading: 'しゅりけん', meaning: 'Phi tiêu sắt cầm tay của Ninja', level: 'N2' },
      { word: '変装', reading: 'へんそう', meaning: 'Cải trang biến hóa thân phận', level: 'N2' },
    ],
    quickFact:
      'Trường Đại học Quốc lập Mie tại Nhật Bản đã thành lập Trung tâm Nghiên cứu Quốc tế về Ninja đầu tiên trên thế giới và cấp bằng Thạc sĩ chính quy về nghiên cứu lịch sử Nhẫn giả.',
    tags: ['Ninja', 'Shinobi', 'Iga', 'Koka', 'Nhẫn thuật', 'Lịch sử'],
    quiz: {
      question: 'Sứ mệnh quan trọng nhất của một Ninja (Shinobi) đích thực trong lịch sử thời phong kiến là gì?',
      options: [
        'A. Khiêu chiến công khai giữa chiến trường',
        'B. Thu thập thông tin tình báo quân sự và sống sót trở về báo cáo cho chủ nhân',
        'C. Biểu diễn võ thuật xiếc đường phố kiếm tiền',
        'D. Lập bang phái cướp bóc thôn làng'
      ],
      correctIndex: 1,
      explanation: 'Theo các cổ thư nhẫn thuật, sống sót để chuyển tin tức tình báo về cho lãnh chúa là thành công lớn nhất của Ninja. Giao chiến sinh tử chỉ là hạ sách khi bị dồn vào đường cùng.',
      culturalContext: 'Tinh thần chịu đựng và bảo mật thông tin tối đa là cội rễ của chữ Nhẫn (忍).'
    }
  },

  // Extra 3: Onsen & Sento Culture
  {
    id: 'enc_extra_onsen_03',
    sectionId: 'society_customs',
    title: 'Văn Hóa Tắm Suối Nước Nóng Onsen & Nhà Tắm Công Cộng Sento',
    jpTitle: '温泉文化と銭湯：心身の湯治と裸の付き合い',
    romaji: 'Onsen Bunka to Sentō: Shinshin no Tōji to Hadaka no Tsukiai',
    hiragana: 'おんせんぶんか と せんとう：しんしんのとうじ と はだかのつきあい',
    level: 'N3',
    badge: 'Onsen · Sento · Hadaka no Tsukiai · Tẩy Trần',
    summary:
      'Văn hóa tắm khoáng nóng thiên nhiên Onsen và nhà tắm công cộng bình dân Sento: Liệu pháp chữa lành thân tâm (Toji), triết lý "Giao tiếp không khoảng cách" (Hadaka no Tsukiai) và các quy tắc tắm rửa nghiêm ngặt giữ gìn sự thanh tịnh nguồn nước.',
    keyTakeaways: [
      'Phân biệt Onsen và Sento: Onsen là suối nước nóng tự nhiên giàu khoáng chất phun trào từ lòng đất núi lửa (tối thiểu 25°C); còn Sento là nhà tắm công cộng sử dụng nước máy đun nóng phục vụ khu dân cư.',
      'Triết lý "Hadaka no Tsukiai" (Giao tiếp khỏa thân): Khi trút bỏ xiêm y bước vào bồn tắm chung, mọi địa vị xã hội, giàu nghèo, giám đốc hay nhân viên đều trở nên bình đẳng tuyệt đối.',
      'Quy tắc vàng khi tắm Onsen: 1. Tắm gội kỳ cọ sạch sẽ cơ thể tại khu vực vòi sen bên ngoài TRƯỚC KHI bước vào bồn ngâm chung; 2. Tuyệt đối không nhúng khăn tắm hay tóc vào bồn nước; 3. Không nhảy, bơi lội hay làm bắn nước; 4. Lau khô người trước khi bước vào phòng thay đồ.',
      'Các thiên đường Onsen nổi tiếng: Kusatsu (Gunma), Hakone (Kanagawa), Beppu (Oita), Kurokawa (Kumamoto), Noboribetsu (Hokkaido).',
    ],
    detailedExplanation:
      'Với hơn 27.000 nguồn suối khoáng nóng trên khắp quần đảo, Onsen từ lâu đã trở thành một phần linh hồn của đời sống Nhật Bản. Người Nhật cổ đại tin rằng suối khoáng nóng là món quà chữa lành của các vị thần (Toji - Liệu pháp tắm suối trị bệnh). Mỗi dòng suối mang một hàm lượng khoáng chất khác nhau: Suối lưu huỳnh (Iō-sen) làm trắng da, suối bicarbonate làm mịn màng (Bihada no Yu), suối sắt đỏ giúp ấm cơ thể. Trong khi đó, nhà tắm công cộng Sento lại là nét sinh hoạt cộng đồng ấm áp thời Edo, nơi mọi người vừa ngâm mình thư giãn ngắm bức tranh vẽ núi Phú Sĩ khổng lồ trên tường, vừa thưởng thức chai sữa bò tươi ướp lạnh mát rượi sau khi tắm.',
    culturalPhilosophy:
      'Tắm Onsen đối với người Nhật không chỉ để làm sạch cơ thể, mà là nghi lễ tẩy trần tâm trí ("Kokoro no Sentaku" - Giặt sạch bụi bặm trong lòng), hòa mình làm một với thiên nhiên đất trời.',
    practicalAdvice:
      'Quy định về hình xăm (Tattoo): Theo truyền thống, nhiều khu Onsen cấm người có hình xăm vào bồn tắm chung do liên hệ quá khứ với giới Yakuza. Nếu bạn có hình xăm nhỏ, hãy dán miếng băng dính màu da (Kaba shiiru) che lại, hoặc thuê phòng tắm gia đình riêng tư (Kashikiri-buro).',
    vocabularyList: [
      { word: '温泉', reading: 'おんせん', meaning: 'Suối nước nóng khoáng thiên nhiên', level: 'N4' },
      { word: '銭湯', reading: 'せんとう', meaning: 'Nhà tắm công cộng bình dân khu phố', level: 'N3' },
      { word: '露天風呂', reading: 'ろてんぶろ', meaning: 'Bồn tắm khoáng nóng ngoài trời hòa vào thiên nhiên', level: 'N2' },
      { word: '湯治', reading: 'とうじ', meaning: 'Liệu pháp lưu trú ngâm suối nước nóng chữa bệnh', level: 'N1' },
    ],
    quickFact:
      'Tại thung lũng Jigokudani (Nagano), có một đàn khỉ tuyết hoang dã Nhật Bản (Nihonzaru) nổi tiếng thế giới vì thói quen kéo nhau xuống bồn suối nước nóng ngâm mình thư giãn sưởi ấm giữa mùa đông tuyết trắng.',
    tags: ['Onsen', 'Sento', 'Suối nước nóng', 'Phong tục', 'Chăm sóc sức khỏe'],
    quiz: {
      question: 'Quy tắc vệ sinh bắt buộc quan trọng nhất bạn PHẢI thực hiện trước khi bước chân vào bồn ngâm suối nước nóng Onsen chung là gì?',
      options: [
        'A. Nhúng khăn tắm vào bồn để kiểm tra độ ấm',
        'B. Tắm gội kỳ cọ cơ thể thật sạch sẽ tại vòi sen bên ngoài',
        'C. Nhảy ùm vào bồn để làm nóng cơ thể nhanh chóng',
        'D. Mặc nguyên đồ bơi nhảy vào bồn'
      ],
      correctIndex: 1,
      explanation: 'Bồn Onsen là nơi để ngâm mình thư giãn chứ không phải nơi để kỳ cọ tắm rửa. Tắm sạch trước khi vào bồn giúp bảo vệ nguồn nước khoáng chung luôn thanh tịnh tuyệt đối.',
      culturalContext: 'Khăn tắm nhỏ (Tenugui) có thể gấp lại đặt lên đầu chứ tuyệt đối không nhúng vào bồn nước.'
    }
  },

  // Extra 4: Bunraku Puppet Theater
  {
    id: 'enc_extra_bunraku_04',
    sectionId: 'tradition_arts',
    title: 'Kịch Rối Bunraku: Tam Vị Nhất Thể & Nghệ Thuật Thổi Hồn Vào Con Rối',
    jpTitle: '人形浄瑠璃「文楽」：三位一体の伝統芸能と人形遣い',
    romaji: 'Ningyō Jōruri "Bunraku": Sanmi Ittai no Dentō Geinō to Ningyōtsukai',
    hiragana: 'にんぎょうじょうるり「ぶんらく」：さんみいったいのでんとうげいのう と にんぎょうつかい',
    level: 'N1',
    badge: 'Di Sản UNESCO · Rối 3 Người Điều Khiển · Shamisen',
    summary:
      'Di sản văn hóa phi vật thể UNESCO Bunraku (Ningyo Joruri): Đỉnh cao kịch rối truyền thống với cấu trúc "Tam vị nhất thể" gồm người ngâm thơ kể chuyện Tayu, nghệ sĩ đàn Shamisen ba dây, và 3 nghệ nhân điều khiển 1 con rối nhịp nhàng đến từng cử động ngón tay và ánh mắt.',
    keyTakeaways: [
      'Cấu trúc "Tam vị nhất thể" (Sanmi Ittai): Sự phối hợp ăn ý tuyệt đối giữa người ngâm xướng (Tayu), người gảy đàn ba dây (Futozao Shamisen), và các nghệ nhân điều khiển con rối (Ningyo-tsukai).',
      'Kỹ thuật 3 người điều khiển 1 con rối: 1. Omozukai (nghệ nhân trưởng điều khiển đầu, mặt và tay phải); 2. Hidarizukai (điều khiển tay trái); 3. Ashizukai (điều khiển hai chân).',
      'Nguyên tắc học nghề khắc nghiệt: "10 năm học chân, 10 năm học tay trái, cả đời học tay phải và biểu cảm mặt".',
    ],
    detailedExplanation:
      'Ra đời từ thế kỷ 17 tại Osaka, Bunraku là loại hình kịch rối tinh xảo và phức tạp bậc nhất trong lịch sử sân khấu nhân loại. Khác với kịch rối dây phương Tây giấu người giật dây sau rèm, trong Bunraku, các nghệ nhân xuất hiện công khai ngay trên sân khấu trong trang phục màu đen (Kurogo). Con rối Bunraku có thể chuyển động chân mày, chớp mắt, cử động từng khớp ngón tay và mở miệng tinh tế đến mức khán giả chỉ sau vài phút sẽ hoàn toàn quên mất sự hiện diện của người điều khiển, chìm đắm vào bi kịch tình yêu đầy nước mắt của các nhân vật được sáng tác bởi đại văn hào Chikamatsu Monzaemon (được ví như Shakespeare của Nhật Bản).',
    culturalPhilosophy:
      'Bunraku thể hiện tinh thần xóa bỏ cái tôi (Muga - 无我): Hai nghệ nhân phụ hoàn toàn che mặt sau tấm vải đen, hòa nhịp thở và nhịp tim của mình vào nghệ nhân chính để thổi sinh khí vào một khúc gỗ vô tri.',
    practicalAdvice:
      'Bạn có thể thưởng thức các vở diễn Bunraku kinh điển kèm tai nghe thuyết minh tiếng Anh tại Nhà hát Kịch Rối Quốc gia (National Bunraku Theatre) tọa lạc tại quận Chuo, thành phố Osaka.',
    vocabularyList: [
      { word: '人形浄瑠璃', reading: 'にんぎょうじょうるり', meaning: 'Kịch múa rối ngâm thơ Joruri truyền thống', level: 'N1' },
      { word: '三位一体', reading: 'さんみいったい', meaning: 'Tam vị nhất thể - 3 yếu tố hòa quyện làm một', level: 'N1' },
      { word: '黒衣', reading: 'くろご', meaning: 'Trang phục màu đen của người trợ diễn sân khấu (người vô hình)', level: 'N1' },
    ],
    quickFact:
      'Con rối Bunraku của nhân vật nữ thường không hề có chân; nghệ nhân Ashizukai dùng ngón tay nâng tà áo Kimono di chuyển tạo ảo giác mềm mại như người con gái đang lướt đi.',
    tags: ['Bunraku', 'Kịch rối', 'Nghệ thuật cổ truyền', 'Di sản UNESCO', 'Osaka'],
    quiz: {
      question: 'Trong nghệ thuật kịch rối Bunraku, có bao nhiêu nghệ nhân cùng phối hợp điều khiển MỘT con rối chính trên sân khấu?',
      options: [
        'A. 1 nghệ nhân giấu mặt sau rèm',
        'B. 2 nghệ nhân',
        'C. 3 nghệ nhân (Trưởng điều khiển đầu/tay phải, phụ điều khiển tay trái và chân)',
        'D. 5 nghệ nhân'
      ],
      correctIndex: 2,
      explanation: 'Bunraku sử dụng kỹ thuật 3 người điều khiển 1 con rối nhịp nhàng đến từng khớp ngón tay và chớp mắt, đòi hỏi hàng chục năm rèn luyện ăn ý tuyệt đối.',
      culturalContext: 'Đây là đỉnh cao của nghệ thuật xóa bỏ cái tôi cá nhân để phục vụ tác phẩm tập thể.'
    }
  },

  // Extra 5: Postwar Miracle Economy to Reiwa Digital Transformation
  {
    id: 'enc_extra_econ_05',
    sectionId: 'geography_admin',
    title: 'Kỳ Tích Kinh Tế Hậu Chiến & Làn Sóng Chuyển Đổi Số Thời Đại Reiwa',
    jpTitle: '戦後復興・高度経済成長の奇跡と令和のDX変革',
    romaji: 'Sengo Fukkō, Kōdo Keizai Seichō no Kiseki to Reiwa no DX Henkaku',
    hiragana: 'せんごふっこう・こうどけいざいせいちょうのきせき と れいわのでぃーえっくすへんかく',
    level: 'N1',
    badge: 'Kỳ Tích Kinh Tế · Shinkansen 1964 · Chuyển Đổi Số DX',
    summary:
      'Hành trình phi thường của Nhật Bản vươn lên từ tro tàn Thế chiến II trở thành nền kinh tế lớn thứ hai thế giới thập niên 1960-1980 (Kỳ tích kinh tế Shinkansen và Olympic Tokyo 1964), vượt qua 3 thập kỷ trì trệ và bước vào làn sóng chuyển đổi số DX thời đại Reiwa.',
    keyTakeaways: [
      'Giai đoạn Tăng trưởng Thần kỳ (Kōdo Keizai Seichō 1955-1973): Tỷ lệ tăng trưởng GDP hàng năm đạt gần 10%, đưa các thương hiệu Sony, Toyota, Honda, Panasonic vang danh toàn cầu.',
      'Olympic Tokyo 1964: Khánh thành tuyến tàu Shinkansen đầu tiên thế giới Tokaido Shinkansen, tuyên bố với thế giới về sự hồi sinh hòa bình rực rỡ của nước Nhật.',
      'Thời kỳ Kinh tế Bong bóng (Baburu Keiki) cuối thập niên 80 và "Ba thập kỷ mất mát" sau khi bong bóng bất động sản và chứng khoán sụp đổ năm 1991.',
      'Thời đại Reiwa (2019 đến nay): Thành lập Cơ quan Kỹ thuật số (Digital Agency), bãi bỏ con dấu gỗ Hanko trong thủ tục hành chính, đẩy mạnh bán dẫn TSMC Kumamoto, AI và năng lượng xanh.',
    ],
    detailedExplanation:
      'Sau khi Thế chiến II kết thúc năm 1945 trong cảnh hoang tàn đổ nát, Nhật Bản đã viết nên trang sử kinh tế kỳ diệu nhất thế kỷ 20. Bằng việc tập trung toàn lực vào giáo dục, cơ khí chính xác và công nghệ điện tử tiêu dùng, các doanh nghiệp Nhật đã chinh phục người tiêu dùng toàn cầu bằng chất lượng bền bỉ không đối thủ. Chế độ tuyển dụng trọn đời (Shūshin Koyō) và thâm niên tiền lương (Nenkō Joretsu) tạo ra sự gắn kết tuyệt đối giữa người lao động và doanh nghiệp. Mặc dù phải đối mặt với thử thách già hóa dân số và giảm phát trong nhiều thập kỷ qua, Nhật Bản dưới niên hiệu Reiwa đang tích cực đổi mới: Tự động hóa nhà máy bằng robot thông minh, chào đón nhân lực quốc tế chất lượng cao và dẫn đầu nghiên cứu công nghệ bán dẫn thế hệ mới.',
    culturalPhilosophy:
      'Bài học phục hưng của kinh tế Nhật là minh chứng cho tinh thần "Nana korobi ya oki" (七転び八起き - Bảy lần ngã, tám lần đứng dậy): Nghịch cảnh càng lớn thì ý chí vươn lên càng phi thường.',
    practicalAdvice:
      'Thị trường việc làm Nhật Bản thời điểm hiện tại đang mở rộng cửa hơn bao giờ hết cho các kỹ sư công nghệ thông tin, kỹ thuật viên bán dẫn và chuyên viên kinh doanh quốc tế đến từ Việt Nam.',
    vocabularyList: [
      { word: '高度経済成長', reading: 'こうどけいざいせいちょう', meaning: 'Thời kỳ tăng trưởng kinh tế thần tốc sau chiến tranh', level: 'N1' },
      { word: '終身雇用', reading: 'しゅうしんこよう', meaning: 'Chế độ tuyển dụng làm việc trọn đời tại doanh nghiệp Nhật', level: 'N1' },
      { word: '七転び八起き', reading: 'ななころびやおき', meaning: 'Thành ngữ: 7 lần vấp ngã, 8 lần đứng dậy kiên cường', level: 'N2' },
      { word: '少子高齢化', reading: 'しょうしこうれいか', meaning: 'Hiện tượng xã hội già hóa và tỷ lệ sinh giảm thấp', level: 'N2' },
    ],
    quickFact:
      'Năm 1964, tuyến Tokaido Shinkansen nối Tokyo và Osaka khánh thành đúng dịp Thế vận hội Olympic đã trở thành tuyến đường sắt cao tốc thương mại đầu tiên trên hành tinh, chạy với vận tốc kỷ lục lúc bấy giờ là 210 km/h.',
    tags: ['Kinh tế', 'Kỳ tích hậu chiến', 'Shinkansen', 'Chuyển đổi số', 'Reiwa'],
    quiz: {
      question: 'Chính sách việc làm nào từng là đặc trưng cốt lõi giúp các tập đoàn Nhật Bản tạo nên Kỳ tích kinh tế hậu chiến?',
      options: [
        'A. Sa thải liên tục để cắt giảm chi phí hàng quý',
        'B. Chế độ tuyển dụng suốt đời (Shūshin Koyō) và thâm niên tiền lương',
        'C. Thuê mướn lao động thời vụ ngắn hạn',
        'D. Chỉ tuyển dụng chuyên gia nước ngoài'
      ],
      correctIndex: 1,
      explanation: 'Chế độ tuyển dụng suốt đời (Shūshin Koyō / 終身雇用) tạo nên lòng trung thành và sự tận tụy tối đa của nhân viên với doanh nghiệp, cùng đào tạo nội bộ vững chắc qua nhiều thập kỷ.',
      culturalContext: 'Dù hiện nay hình thức làm việc đã đa dạng hơn, văn hóa công ty như một đại gia đình vẫn là nền tảng đạo đức kinh doanh Nhật Bản.'
    }
  },

  // Extra 6: Ba Đại Lễ Hội Nhật Bản (Nihon Sandai Matsuri)
  {
    id: 'enc_extra_matsuri_06',
    sectionId: 'society_customs',
    title: 'Tam Đại Lễ Hội Nhật Bản (Nihon Sandai Matsuri) & Nghi Thức Khiêng Kiệu Thần Mikoshi',
    jpTitle: '日本三大祭りと神輿の巡行：祇園祭・天神祭・神田祭',
    romaji: 'Nihon Sandai Matsuri to Mikoshi no Junkō: Gion Matsuri, Tenjin Matsuri, Kanda Matsuri',
    hiragana: 'にほんさんだいまつり と みこしのじゅんこう：ぎおんまつり・てんじんまつり・かんだまつり',
    level: 'N2',
    badge: 'Gion Matsuri · Tenjin Matsuri · Kanda Matsuri · Kiệu Mikoshi',
    summary:
      'Khám phá 3 lễ hội hoành tráng và lâu đời nhất lịch sử Nhật Bản: Gion Matsuri tại cố đô Kyoto kéo dài trọn tháng 7 với những cỗ xe rước Yamahoko khổng lồ; Tenjin Matsuri tại Osaka rực rỡ thuyền hoa trên sông; và Kanda Matsuri tại thủ đô Tokyo với đoàn diễu hành kiệu thần Mikoshi hào sảng.',
    keyTakeaways: [
      'Gion Matsuri (Kyoto - tháng 7): Lịch sử hơn 1.100 năm bắt nguồn từ lễ cầu nguyện trừ dịch bệnh thời Heian. Đỉnh cao là lễ rước xe hoa Yamahoko - bảo tàng nghệ thuật di động được công nhận Di sản UNESCO.',
      'Tenjin Matsuri (Osaka - 24, 25/7): Tôn vinh Thần học vấn Sugawara no Michizane với lễ rước hơn 100 chiếc thuyền hoa bập bùng đuốc trên sông Okawa kết hợp màn bắn pháo hoa Hanabi huyền ảo.',
      'Kanda Matsuri (Tokyo - giữa tháng 5 năm lẻ): Lễ hội khí phách của cư dân Edo với hơn 200 cỗ kiệu Mikoshi diễu hành qua các trung tâm Tokyo sầm uất như Akihabara, Nihonbashi và Otemachi.',
      'Kiệu Thần Mikoshi (神輿): Ngôi đền di động chở linh hồn của thần linh rời khỏi đền thờ để đi kinh lý ban phúc lành, mùa màng bội thu và bình an cho dân cư trong vùng.',
      'Tiếng hô tiếp sức: "Wasshoi, wasshoi!" (ngụ ý: cùng nhau hòa hợp mang theo hòa bình) hoặc "Seiya, seiya!" dõng dạc thể hiện sức mạnh đoàn kết cộng đồng.',
    ],
    detailedExplanation:
      'Lễ hội Matsuri trong tâm thức người Nhật không chỉ là ngày hội vui chơi dân gian, mà là nghi lễ tâm linh tối thượng kết nối giữa con người và thần linh (Kami). Ba lễ hội lớn nhất toàn quốc đại diện cho ba tính cách văn hóa đặc sắc: Kyoto thanh lịch quý phái với Gion Matsuri; Osaka náo nhiệt, phồn vinh thương mại với Tenjin Matsuri; và Tokyo hào sảng, mạnh mẽ của tầng lớp thợ thủ công Edokko với Kanda Matsuri. Khiêng kiệu thần Mikoshi là trải nghiệm văn hóa mãnh liệt: Những người tham gia mặc áo khoác lễ hội Happi, quấn khăn Hachimaki trên trán, đi tất xỏ ngón Tabi, dùng bờ vai trần cùng nâng thanh gỗ kiệu nặng hàng tấn nhún nhảy theo nhịp điệu trống Taiko trầm hùng. Người dân quan niệm rằng kiệu thần càng lắc lư mạnh mẽ, thần linh càng phấn khởi và ban nhiều phúc lộc cho xóm làng.',
    culturalPhilosophy:
      'Matsuri là phương thức giải phóng năng lượng xã hội ("Hare" - ngày phi thường, ngày hội tươi sáng) để cân bằng lại những ngày tháng lao động kỷ luật căng thẳng ("Ke" - ngày thường nhật giản dị). Sự luân chuyển giữa Hare và Ke giúp tinh thần người Nhật luôn dẻo dai kiên cường.',
    practicalAdvice:
      'Nếu bạn có dịp tham gia xem lễ hội Matsuri: Tuyệt đối không đứng từ trên cầu hay ban công cao nhìn thẳng xuống kiệu thần Mikoshi hoặc đi cắt ngang đoàn rước kiệu, vì trong quan niệm Thần đạo đó là hành vi bất kính với thần linh ngự bên trong.',
    vocabularyList: [
      { word: '三大祭り', reading: 'さんだいまつり', meaning: 'Ba đại lễ hội truyền thống lớn nhất toàn quốc', level: 'N2' },
      { word: '神輿', reading: 'みこし', meaning: 'Kiệu rước thần linh trong các lễ hội Matsuri', level: 'N1' },
      { word: '法被', reading: 'はっぴ', meaning: 'Áo khoác truyền thống mặc khi tham gia khiêng kiệu lễ hội', level: 'N2' },
      { word: '山鉾巡行', reading: 'やまほこじゅんこう', meaning: 'Lễ rước những cỗ xe hoa khổng lồ trong hội Gion Kyoto', level: 'N1' },
    ],
    quickFact:
      'Những cỗ xe hoa rước Yamahoko trong lễ hội Gion Matsuri Kyoto cao tới 25 mét và nặng hơn 12 tấn, được lắp ráp hoàn toàn bằng kỹ thuật buộc dây thừng truyền thống mà không hề sử dụng một chiếc đinh sắt nào.',
    tags: ['Lễ hội', 'Matsuri', 'Gion', 'Tenjin', 'Kanda', 'Kiệu Mikoshi'],
    quiz: {
      question: 'Tiếng hô tiếp sức truyền thống hào sảng của đoàn người khiêng kiệu Thần Mikoshi trong các lễ hội Matsuri là gì?',
      options: [
        'A. Kampai!',
        'B. Wasshoi! (hoặc Seiya!)',
        'C. Banzai!',
        'D. Itadakimasu!'
      ],
      correctIndex: 1,
      explanation: 'Tiếng hô "Wasshoi! Wasshoi!" (わっしょい) tượng trưng cho tinh thần đoàn kết, cùng nâng đỡ nhau mang lại bình an cho xóm làng.',
      culturalContext: 'Người tham gia mặc áo Happi truyền thống và chia sẻ gánh nặng kiệu thần bằng sự đồng điệu nhịp thở.'
    }
  },

  // Extra 7: Bánh ngọt truyền thống Wagashi
  {
    id: 'enc_extra_wagashi_07',
    sectionId: 'washoku_cuisine',
    title: 'Nghệ Thuật Bánh Ngọt Wagashi: Thưởng Thức Bốn Mùa Bằng Cả Năm Giác Quan',
    jpTitle: '和菓子（わがし）の芸術と五感で味わう日本の四季',
    romaji: 'Wagashi no Geijutsu to Gokan de Ajiwau Nihon no Shiki',
    hiragana: 'わがしのげいじゅつ と ごかんであじわうにほんのしき',
    level: 'N2',
    badge: 'Nerikiri · Dango · Đậu Đỏ Anko · Năm Giác Quan',
    summary:
      'Bánh ngọt truyền thống Nhật Bản Wagashi là đỉnh cao của sự hòa quyện giữa thi ca, điêu khắc thu nhỏ và nghệ thuật trà đạo: Sử dụng nguyên liệu thuần thực vật như đậu đỏ Azuki, bột gạo Mochi, bột sắn rừng Kuzu để tái hiện sinh động vẻ đẹp biến chuyển của 4 mùa qua cả 5 giác quan.',
    keyTakeaways: [
      'Khái niệm "Nghệ thuật của năm giác quan" (Gokan no Geijutsu): Thị giác (hình dáng hoa lá bốn mùa), Khứu giác (mùi thơm thanh khiết của gạo nếp, lá hoa anh đào), Vị giác (ngọt thanh tinh tế dịu nhẹ), Xúc giác (độ mềm mại mịn màng nơi đầu lưỡi và tay cầm), Thính giác (tên gọi thơ mộng mượn từ các thi phẩm Waka cổ điển).',
      'Đỉnh cao Nerikiri (練り切り): Loại bánh điêu khắc thủ công làm từ đậu trắng nhuyễn mịn và bột gạo nếp, người nghệ nhân dùng que tre khắc họa cánh hoa anh đào mùa xuân, lá phong đỏ mùa thu hay đóa hoa cúc sương sớm.',
      'Các loại Wagashi quen thuộc: Dango (bánh xiên que sốt tương ngọt Mitarashi), Daifuku (bánh nếp bọc nhân đậu đỏ hoặc quả dâu tây Ichigo tươi mọng), Dorayaki (bánh rán nhân đậu đỏ yêu thích của Doraemon), Yokan (thạch đậu đỏ thanh mát).',
      'Vai trò tri kỷ trong Trà đạo: Vị ngọt sâu lắng tự nhiên của Wagashi được dùng ăn trước khi nhấp ngụm trà xanh Matcha đắng chát, tạo nên sự cân bằng hoàn mỹ tuyệt đối trong khoang miệng.',
    ],
    detailedExplanation:
      'Khác với bánh ngọt phương Tây (Yōgashi) thường giàu bơ sữa, kem béo và trứng, bánh ngọt truyền thống Wagashi chủ yếu sử dụng các nguyên liệu hoàn toàn tự nhiên từ thực vật. Trái tim của Wagashi là hạt đậu đỏ Azuki được ninh nhừ và sên đường cẩn thận để tạo ra hai kết cấu kinh điển: "Tsubuan" (nhân đậu đỏ còn nguyên hạt bùi bùi) và "Koshian" (nhân đậu đỏ lọc mịn như nhung). Vào mùa xuân, người Nhật thưởng thức Sakura Mochi bọc trong lá anh đào ngâm muối tạo nên vị ngọt mặn quyến rũ; mùa hè mát lành với Mizu-yokan trong suốt như pha lê; mùa thu ấm áp với bánh Kuri Kinton làm từ hạt dẻ thơm bùi; và mùa đông quây quần bên bát chè đậu đỏ Zenzai nóng hổi với bánh dày nướng.',
    culturalPhilosophy:
      'Wagashi là minh chứng cho triết lý thẩm mỹ "Ichigo Ichie" trong ẩm thực: Mỗi chiếc bánh phản ánh đúng khoảnh khắc thiên nhiên của tuần lễ đó. Một chiếc bánh hoa anh đào sẽ không bao giờ được phục vụ vào mùa thu, nhắc nhở con người luôn trân quý thời khắc hiện tại.',
    practicalAdvice:
      'Trong tiệc Trà đạo Chanoyu: Hãy ăn hết trọn vẹn miếng bánh Wagashi trước khi bưng bát trà Matcha lên uống, tuyệt đối không vừa nhai bánh vừa uống trà cùng lúc vì sẽ làm mất đi sự đối lập tinh tế giữa vị ngọt dịu và vị đắng thanh tao.',
    vocabularyList: [
      { word: '和菓子', reading: 'わがし', meaning: 'Bánh ngọt truyền thống Nhật Bản', level: 'N3' },
      { word: '餡子', reading: 'あんこ', meaning: 'Nhân đậu đỏ nghiền nấu đường truyền thống', level: 'N2' },
      { word: '練り切り', reading: 'ねりきり', meaning: 'Nghệ thuật bánh ngọt tạo hình thủ công tinh xảo Nerikiri', level: 'N1' },
      { word: '五感', reading: 'ごかん', meaning: 'Năm giác quan: Thị giác, khứu giác, vị giác, xúc giác, thính giác', level: 'N1' },
    ],
    quickFact:
      'Tên gọi của những chiếc bánh Wagashi cao cấp (Meika) hầu hết đều được lấy cảm hứng từ những vần thơ tình lãng mạn trong tập thơ cổ "Vạn Diệp Tập" (Man\'yōshū) từ thế kỷ thứ 8.',
    tags: ['Wagashi', 'Bánh ngọt Nhật', 'Trà đạo', 'Nerikiri', 'Ẩm thực bốn mùa'],
    quiz: {
      question: 'Tại sao trong tiệc Trà đạo truyền thống, người ta luôn ăn bánh Wagashi trước khi uống trà xanh Matcha?',
      options: [
        'A. Để làm nguội bớt bát trà Matcha nóng',
        'B. Vì quy định bắt buộc của nhà sản xuất bánh',
        'C. Để vị ngọt thanh của bánh trung hòa và làm tôn bật vị đắng thanh tao của ngụm trà Matcha tiếp theo',
        'D. Để chứng minh mình không bị đói bụng'
      ],
      correctIndex: 2,
      explanation: 'Vị ngọt tự nhiên của nhân đậu đỏ trong Wagashi đọng lại nơi đầu lưỡi sẽ làm nổi bật hương thơm béo ngậy và vị đắng tao nhã của bột trà Matcha nguyên chất.',
      culturalContext: 'Đây là quy tắc ẩm thực tương phản âm dương kinh điển trong văn hóa Trà đạo Chanoyu.'
    }
  },

  // Extra 8: Shinkansen & Ekiben
  {
    id: 'enc_extra_shinkansen_08',
    sectionId: 'travel_practical',
    title: 'Kỹ Thuật Đỉnh Cao Tuyến Shinkansen & Văn Hóa Cơm Hộp Nhà Ga Ekiben',
    jpTitle: '新幹線の超絶技術と旅情あふれる駅弁（えきべん）文化',
    romaji: 'Shinkansen no Chōzetsu Gijutsu to Ryojō Afureru Ekiben Bunka',
    hiragana: 'しんかんせんのちょうぜつぎじゅつ と りょじょうあふれるえきべんぶんか',
    level: 'N2',
    badge: 'Shinkansen 320km/h · Độ Trễ 0 Giây · Cơm Hộp Ekiben',
    summary:
      'Tàu cao tốc Shinkansen - kỳ quan cơ khí chính xác an toàn số 1 hành tinh: Vận tốc thương mại tới 320 km/h, hơn 60 năm vận hành không một tai nạn chết người, hệ thống chống trật bánh động đất UrEDAS, kết hợp cùng thú vui tao nhã thưởng thức cơm hộp nhà ga Ekiben mang đậm phong vị đặc sản địa phương.',
    keyTakeaways: [
      'Kỷ lục an toàn tuyệt đối: Kể từ khi khai trương năm 1964 đến nay, hệ thống Shinkansen đã chuyên chở hơn 10 tỷ lượt hành khách với ZERO tai nạn gây tử vong do trật bánh hay va chạm kỹ thuật.',
      'Độ chuẩn xác thời gian huyền thoại: Độ trễ trung bình của mỗi chuyến tàu Shinkansen (bao gồm cả sự cố thiên tai bão tuyết) chỉ tính bằng đơn vị GIÂY (dưới 50 giây/chuyến trong năm).',
      'Đội dọn vệ sinh 7 phút thần kỳ (7-Minute Miracle): Tại ga Tokyo, đội ngũ vệ sinh TESSEI chỉ mất đúng 7 phút để lau dọn sạch bóng toàn bộ 16 toa tàu, xoay ghế 180 độ và kiểm tra đồ thất lạc.',
      'Văn hóa cơm hộp nhà ga Ekiben (駅弁): Hơn 2.000 loại hộp cơm độc đáo gắn liền với từng nhà ga, sử dụng nguyên liệu trứ danh của vùng như bò Wagyu Yonezawa, cá hồi tuyết Hokkaido, hay lươn Unagi Shizuoka.',
    ],
    detailedExplanation:
      'Shinkansen (Đoàn tàu hình viên đạn) không chỉ là phương tiện di chuyển nhanh chóng mà là biểu tượng tự hào quốc gia của người Nhật về sự kỷ luật và công nghệ hàng đầu thế giới. Mũi tàu Shinkansen thế hệ mới (như dòng E5 Hayabusa hay N700S) được thiết kế thuôn dài khí động học lấy cảm hứng từ chiếc mỏ của loài chim bói cá, giúp triệt tiêu hoàn toàn tiếng nổ sóng âm khi tàu lao vào đường hầm xuyên núi ở vận tốc 320 km/h. Bước lên tàu Shinkansen, một trong những trải nghiệm du lịch kinh điển nhất là mua một hộp cơm Ekiben tại sân ga cùng một chai trà xanh ướp lạnh. Mở nắp hộp cơm gỗ thơm phức, ngắm nhìn khung cảnh núi Phú Sĩ tuyết phủ sừng sững lướt qua ngoài cửa sổ là khoảnh khắc thi vị ghi dấu ấn sâu đậm trong lòng mọi du khách.',
    culturalPhilosophy:
      'Văn hóa Ekiben thể hiện tình yêu quê hương xứ sở ("Chisan Chisho" - Sản vật địa phương tiêu dùng tại địa phương). Mỗi trạm dừng chân trên đường ray đều là cơ hội để tôn vinh bàn tay người nông dân và ngư dân bản địa.',
    practicalAdvice:
      'Tại ga Tokyo, bạn hãy ghé qua cửa hàng "Ekibenya Matsuri" (駅弁屋 祭) nằm trong khu vực soát vé. Cửa hàng này tập hợp hơn 200 loại cơm hộp Ekiben nổi tiếng nhất từ khắp mọi miền nước Nhật, từ Hokkaido tới Kyushu, bán hết veo hàng vạn suất mỗi ngày.',
    vocabularyList: [
      { word: '駅弁', reading: 'えきべん', meaning: 'Cơm hộp đặc sản bán tại nhà ga đường sắt', level: 'N3' },
      { word: '遅延', reading: 'ちえん', meaning: 'Sự chậm trễ, trễ giờ chuyến tàu', level: 'N2' },
      { word: '定時性', reading: 'ていじせい', meaning: 'Tính đúng giờ chuẩn xác tuyệt đối', level: 'N1' },
      { word: '車窓', reading: 'しゃそう', meaning: 'Khung cửa sổ toa tàu ngắm cảnh non nước', level: 'N2' },
    ],
    quickFact:
      'Trong trận siêu động đất sóng thần Tohoku ngày 11/3/2011, có tới 27 chuyến tàu Shinkansen đang chạy ở tốc độ cao trên đường ray, nhưng nhờ hệ thống cảm biến địa chấn khẩn cấp UrEDAS tự ngắt điện, toàn bộ 27 chuyến tàu đã dừng lại an toàn mà không có bất kỳ hành khách nào bị thương tích.',
    tags: ['Shinkansen', 'Ekiben', 'Du lịch đường sắt', 'An toàn', 'Đúng giờ'],
    quiz: {
      question: 'Thiết kế mũi dài khí động học của các dòng tàu Shinkansen hiện đại được các kỹ sư Nhật Bản lấy cảm hứng từ loài sinh vật nào trong tự nhiên?',
      options: [
        'A. Cá heo biển sâu',
        'B. Mỏ chim bói cá (Kingfisher)',
        'C. Chim ưng săn mồi',
        'D. Rắn hổ mang'
      ],
      correctIndex: 1,
      explanation: 'Kỹ sư trưởng Eiji Nakatsu (vốn là người đam mê ngắm chim) nhận thấy chim bói cá lao từ không khí vào mặt nước mà hầu như không tạo ra tia nước bắn nào, từ đó áp dụng cấu trúc mỏ chim vào mũi tàu Shinkansen để triệt tiêu tiếng nổ xung kích khi xuyên hầm.',
      culturalContext: 'Đây là ví dụ kinh điển về công nghệ mô phỏng sinh học (Biomimicry) kết hợp tinh thần quan sát thiên nhiên của người Nhật.'
    }
  },

  // Extra 9: Nghệ thuật hàn gắn vàng Kintsugi
  {
    id: 'enc_extra_kintsugi_09',
    sectionId: 'tradition_arts',
    title: 'Nghệ Thuật Hàn Gắn Vàng Kintsugi: Tôn Vinh Vết Nứt & Sự Tái Sinh Kiên Cường',
    jpTitle: '金継ぎ（きんつぎ）の哲学：傷跡を愛し不完全を美へと昇華する',
    romaji: 'Kintsugi no Tetsugaku: Kizuato o Aishi Fukanzen o Bi e to Shōka suru',
    hiragana: 'きんつぎのてつがく：きずあとをあいし ふかんぜんをびへとしょうかする',
    level: 'N1',
    badge: 'Kintsugi · Bột Vàng · Triết Lý Vết Thương · Tái Sinh',
    summary:
      'Nghệ thuật cổ truyền hàn gắn đồ gốm sứ vỡ bằng sơn ta tự nhiên rắc bột vàng nguyên chất (Kintsugi): Biến những vết rạn nứt tổn thương thành điểm nhấn thẩm mỹ quý giá nhất, gửi gắm thông điệp chữa lành tâm hồn và tinh thần kiên cường chấp nhận sự bất toàn của kiếp nhân sinh.',
    keyTakeaways: [
      'Nguồn gốc lịch sử: Xuất hiện từ thế kỷ 15 thời tướng quân Ashikaga Yoshimasa, khi chiếc bát trà yêu thích bằng gốm quý bị vỡ và các thợ thủ công Nhật đã dùng sơn mài trộn vàng để vá lại thay vì dùng đinh sắt thô kệch phương Tây.',
      'Nguyên lý vật liệu: Sử dụng nhựa cây sơn ta tự nhiên (Urushi) làm chất kết dính siêu bền vững và an toàn tuyệt đối với thực phẩm, phủ lên đường nứt lớp bột vàng nguyên chất (hoặc bạc, bạch kim).',
      'Triết lý chấp nhận khuyết điểm: Không tìm cách che giấu hay xóa bỏ vết nứt như thể nó chưa từng xảy ra, mà tôn vinh vết nứt như một dấu mốc lịch sử độc bản đáng tự hào của món đồ.',
      'Bài học chữa lành tâm lý hiện đại: Con người sau những vấp ngã tổn thương không trở nên vô giá trị, mà trái lại trở nên sâu sắc, kiên cường và bao dung hơn nhờ chính những vết sẹo đã được thời gian hàn gắn.',
    ],
    detailedExplanation:
      'Kintsugi (金継ぎ - Hàn gắn bằng vàng) hay Kintsukuroi là đỉnh cao của triết lý thẩm mỹ Wabi-Sabi và tinh thần "Mottainai" (tiếc nuối không nỡ vứt bỏ đồ vật còn hữu ích). Một chiếc chén trà sau khi được phục chế bằng Kintsugi thường có giá trị nghệ thuật và lịch sử cao hơn gấp nhiều lần so với nguyên bản lúc chưa vỡ, bởi trên thân chén giờ đây xuất hiện những đường vân vàng uốn lượn như tia sét hay dòng sông uốn khúc tự nhiên. Quy trình làm Kintsugi truyền thống đòi hỏi sự nhẫn nại phi thường kéo dài từ 2 đến 3 tháng: Mỗi lớp sơn mài Urushi cần độ ẩm và nhiệt độ nghiêm ngặt để đông cứng từ từ trong tủ ủ ẩm (Muro), sau đó được mài nhẵn bằng than củi trước khi nghệ nhân cẩn trọng rắc từng hạt bụi vàng óng ánh lên vết nứt.',
    culturalPhilosophy:
      'Thành ngữ phương Tây nói "Một khi đã vỡ thì không thể hàn gắn", nhưng người Nhật lại dạy rằng: "Chính nơi vết nứt là nơi ánh sáng vàng rực rỡ lọt vào". Vết thương không phải là điểm kết thúc, mà là sự khởi đầu của một phiên bản kiên cường và tỏa sáng hơn.',
    practicalAdvice:
      'Tại các thành phố như Tokyo và Kyoto hiện có rất nhiều workshop trải nghiệm Kintsugi hiện đại (dùng keo sinh học khô nhanh) kéo dài 2-3 tiếng, cho phép du khách tự tay mang theo một chiếc đĩa gốm bị mẻ của mình đến để học cách hàn gắn bằng bột vàng mang về làm kỷ niệm.',
    vocabularyList: [
      { word: '金継ぎ', reading: 'きんつぎ', meaning: 'Nghệ thuật hàn gắn đồ gốm sứ vỡ bằng bột vàng', level: 'N1' },
      { word: '漆', reading: 'うるし', meaning: 'Nhựa cây sơn mài tự nhiên dùng kết dính', level: 'N1' },
      { word: 'もったいない', reading: 'もったいない', meaning: 'Tiếc nuối lãng phí, trân trọng từng hạt gạo vật dụng', level: 'N3' },
      { word: '再生', reading: 'さいせい', meaning: 'Sự tái sinh, hồi sinh rực rỡ từ đống đổ nát', level: 'N2' },
    ],
    quickFact:
      'Vào thời kỳ phong kiến Edo, nghệ thuật Kintsugi được hâm mộ đến mức một số quý tộc trà sư thậm chí còn cố tình làm nứt những chiếc chén gốm quý để được các nghệ nhân danh tiếng phục chế bằng những đường chỉ vàng tuyệt mỹ.',
    tags: ['Kintsugi', 'Gốm sứ', 'Triết lý chữa lành', 'Wabi-Sabi', 'Nghệ thuật thủ công'],
    quiz: {
      question: 'Thông điệp triết lý nhân sinh sâu sắc nhất mà nghệ thuật Kintsugi muốn gửi gắm tới con người là gì?',
      options: [
        'A. Đồ vật đã vỡ thì nên vứt đi mua cái mới ngay lập tức',
        'B. Luôn che giấu mọi khuyết điểm để người khác không phát hiện ra',
        'C. Chấp nhận sự bất toàn và tôn vinh những vết sẹo tổn thương như minh chứng của sự trưởng thành kiên cường',
        'D. Chỉ có vàng mới là thứ kim loại quý giá nhất trong cuộc đời'
      ],
      correctIndex: 2,
      explanation: 'Kintsugi dạy chúng ta không cần xấu hổ trước những vết rạn nứt hay vấp ngã quá khứ; khi được chữa lành bằng tình yêu thương và sự kiên nhẫn, những vết sẹo sẽ biến thành vẻ đẹp độc bản rực rỡ nhất.',
      culturalContext: 'Đây là liệu pháp tinh thần được các nhà tâm lý học quốc tế ca ngợi trên toàn thế giới.'
    }
  },

  // Extra 10: Ryokan & Omotenashi
  {
    id: 'enc_extra_ryokan_10',
    sectionId: 'travel_practical',
    title: 'Nhà Nghỉ Truyền Thống Ryokan & Nghệ Thuật Hiếu Khách Omotenashi Đỉnh Cao',
    jpTitle: '伝統旅館の宿泊体験とおもてなしの心（極上のおもてなし）',
    romaji: 'Dentō Ryokan no Shukuhaku Taiken to Omotenashi no Kokoro',
    hiragana: 'でんとうりょかんのしゅくはくたいけん と おもてなしのこころ',
    level: 'N2',
    badge: 'Ryokan · Nakai-san · Kaiseki Bữa Tối · Omotenashi',
    summary:
      'Trải nghiệm lưu trú tại nhà nghỉ truyền thống Nhật Bản Ryokan: Không gian chiếu cói Tatami thơm ngát, bồn tắm khoáng nóng lộ thiên Rotenburo, trang phục Yukata dạo phố đêm, yến tiệc Kaiseki phục vụ tận phòng, và tinh thần hiếu khách tận tâm Omotenashi không màng tiền tip.',
    keyTakeaways: [
      'Không gian kiến trúc Ryokan: Sàn trải chiếu cói Tatami, vách ngăn Shoji/Fusuma, góc phòng Tokonoma treo tranh thủy mặc cuộn Kakejiku và bình hoa cắm Ikebana theo mùa.',
      'Nữ quản gia chu đáo Nakai-san: Đón tiếp khách từ cửa, dâng trà bánh chào mừng, giải thích chi tiết thực đơn yến tiệc Kaiseki, và trải đệm Futon êm ái khi khách đang đi tắm suối nước nóng.',
      'Yến tiệc bữa tối Kaiseki Ryori phục vụ tại phòng: 10-12 món ăn tinh hoa được chế biến từ nông sản và hải sản tươi ngon nhất của chính địa phương đó.',
      'Văn hóa không nhận tiền Tip (No Tipping): Sự phục vụ chu đáo xuất phát từ tận đáy lòng tự trọng nghề nghiệp, người Nhật coi việc đưa tiền boa tip là xúc phạm sự hiếu khách thuần khiết.',
    ],
    detailedExplanation:
      'Ryokan là loại hình lữ quán truyền thống có lịch sử từ thời kỳ Nara và hưng thịnh dưới thời kỳ Edo dọc theo cung đường huyết mạch Tokaido nối Tokyo và Kyoto. Đến với Ryokan không đơn thuần là thuê một chỗ ngủ qua đêm, mà là chuyến hành hương làm mới lại mọi giác quan. Khách đến Ryokan sẽ cởi bỏ trang phục hiện đại gò bó, khoác lên mình bộ áo Yukata nhẹ nhàng, đi dép xỏ ngón Geta gõ lách cách dạo quanh thị trấn suối nước nóng bảng lảng khói sương. Trái tim của trải nghiệm Ryokan là triết lý "Omotenashi" (おもてなし) - nghệ thuật chăm sóc khách hàng vô điều kiện: Người phục vụ luôn dự đoán trước mọi nhu cầu của bạn trước khi bạn kịp nhận ra, như chuẩn bị sẵn đôi guốc khô ráo khi trời đổ mưa hay điều chỉnh nhiệt độ phòng tắm vừa vặn nhất.',
    culturalPhilosophy:
      'Từ "Omotenashi" bắt nguồn từ hai nghĩa: "Ura-omote nashi" (Không có mặt trái, mặt ngoài - sự chân thành trước sau như một không hai lòng) và "Mono o motte nashi-togeru" (Dùng tấm lòng chu đáo để hoàn thành việc tiếp đón khách quý).',
    practicalAdvice:
      'Quy tắc phòng chiếu Tatami trong Ryokan: Tuyệt đối không kéo lê vali hành lý có bánh xe bẩn lên mặt chiếu Tatami (hãy xách vali bằng tay). Tránh dẫm chân lên đường viền mép vải (Heri) của tấm chiếu Tatami vì đó là nơi thêu hoa văn gia huy tinh xảo dễ bị sờn rách.',
    vocabularyList: [
      { word: '旅館', reading: 'りょかん', meaning: 'Nhà nghỉ lữ quán truyền thống phong cách Nhật', level: 'N3' },
      { word: 'おもてなし', reading: 'おもてなし', meaning: 'Tinh thần hiếu khách tận tụy đỉnh cao của người Nhật', level: 'N2' },
      { word: '仲居', reading: 'なかい', meaning: 'Nữ nhân viên quản gia phục vụ phòng tại Ryokan', level: 'N1' },
      { word: '布団', reading: 'ふとん', meaning: 'Đệm nằm ngủ truyền thống trải trên chiếu Tatami', level: 'N4' },
    ],
    quickFact:
      'Khách sạn lâu đời nhất thế giới còn hoạt động liên tục là lữ quán Nishiyama Onsen Keiunkan tại tỉnh Yamanashi Nhật Bản, được thành lập từ năm 705 sau Công nguyên, do một dòng họ điều hành liên tục suốt 52 thế hệ qua hơn 1.300 năm.',
    tags: ['Ryokan', 'Omotenashi', 'Nakai-san', 'Tatami', 'Du lịch trải nghiệm'],
    quiz: {
      question: 'Tại sao tại các nhà hàng, quán ăn và lữ quán Ryokan truyền thống ở Nhật Bản, du khách tuyệt đối KHÔNG NÊN để lại tiền tip (tiền boa)?',
      options: [
        'A. Vì tiền boa bị đánh thuế rất nặng',
        'B. Vì sự phục vụ tận tâm chu đáo đã được xem là lòng tự trọng nghề nghiệp (Omotenashi), để tiền tip có thể bị coi là xúc phạm',
        'C. Vì nhân viên không được phép cầm tiền giấy',
        'D. Vì chỉ có khách quen mới được phép boa'
      ],
      correctIndex: 1,
      explanation: 'Trong văn hóa Omotenashi, lòng hiếu khách chân thành là tiêu chuẩn hiển nhiên bắt buộc xuất phát từ lòng tự trọng của người làm dịch vụ, chứ không phải một dịch vụ cộng thêm cần đổi chác bằng tiền boa.',
      culturalContext: 'Nếu bạn vô tình để lại tiền boa trên bàn, nhân viên thường sẽ đuổi theo ra tận cửa để trả lại vì tưởng bạn bỏ quên tiền!'
    }
  },
];

