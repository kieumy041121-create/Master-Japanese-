export interface HistoryEpochItem {
  id: string;
  name: string;
  jpName: string;
  romaji: string;
  periodYears: string;
  capital: string;
  badge: string;
  color: string;
  summary: string;
  keyFigures: string[];
  breakthroughs: string[];
  historicalLesson: string;
  culturalRelic: string;
}

export const JAPAN_14_EPOCHS: HistoryEpochItem[] = [
  {
    id: 'jomon',
    name: 'Thời kỳ Jomon (Dây thừng)',
    jpName: '縄文時代',
    romaji: 'Jōmon Jidai',
    periodYears: '14.000 TCN – 300 TCN (Hơn 10.000 năm)',
    capital: 'Chưa có kinh đô tập trung (Làng mạc du cư/định cư)',
    badge: 'Đồ Gốm Dây Thừng · Săn Bắt & Thu Hoạch',
    color: 'from-amber-700/20 to-orange-700/10 border-amber-600/50 text-amber-300',
    summary: 'Thời kỳ săn bắn, hái lượm lâu dài bậc nhất của loài người, nổi danh toàn cầu với đồ gốm hoa văn bện dây thừng độc nhất vô nhị và tượng thần đất Dogu trừ tà.',
    keyFigures: ['Người tiền sử Jomon-jin', 'Các nữ phù thủy Shaman'],
    breakthroughs: [
      'Kỹ thuật nung gốm lửa thấp tạo hoa văn dây thừng Jomon Dokki',
      'Chế tác tượng đất nung Dogu cầu sinh sản và trừ tà',
      'Định cư ven rừng và bờ biển với nhà hầm đào đất Tateana Jukyo'
    ],
    historicalLesson: 'Hòa hợp tuyệt đối với thiên nhiên, không khai thác cạn kiệt môi trường sống.',
    culturalRelic: 'Tượng đất mắt tròn kính tuyết Shakoki Dogu (Bảo vật quốc gia)'
  },
  {
    id: 'yayoi',
    name: 'Thời kỳ Yayoi (Lúa nước & Kim khí)',
    jpName: '弥生時代',
    romaji: 'Yayoi Jidai',
    periodYears: '300 TCN – 250 Sau CN (Khoảng 600 năm)',
    capital: 'Các tiểu quốc liên minh (Quốc gia Yamatai)',
    badge: 'Nông Nghiệp Lúa Nước · Đồ Đồng & Đồ Sắt',
    color: 'from-emerald-700/20 to-green-700/10 border-emerald-600/50 text-emerald-300',
    summary: 'Thời kỳ chuyển mình mang tính cách mạng khi nghề trồng lúa nước từ đại lục du nhập vào Nhật Bản, xuất hiện đồ đồng tế lễ Dotaku và sự xuất hiện của Nữ vương Himiko.',
    keyFigures: ['Nữ vương Himiko (卑弥呼)', 'Vua nước Na (Hán Oa Nô Quốc Vương)'],
    breakthroughs: [
      'Trồng trọt lúa nước ngập mặn tạo thặng dư lương thực',
      'Kỹ thuật đúc chuông đồng Dotaku và gương đồng Shinju-kyo',
      'Sự phân hóa giai cấp và hình thành nhà nước sơ khai Yamatai'
    ],
    historicalLesson: 'Nông nghiệp lúa nước đặt nền móng cho văn hóa tập thể và tính gắn kết cộng đồng Nhật Bản.',
    culturalRelic: 'Ấn vàng Vua Hán ban tặng "Hán Oa Nô Quốc Vương" (Bảo vật quốc gia)'
  },
  {
    id: 'kofun',
    name: 'Thời kỳ Kofun (Gò mộ cổ)',
    jpName: '古墳時代',
    romaji: 'Kofun Jidai',
    periodYears: '250 – 538 Sau CN (Khoảng 300 năm)',
    capital: 'Vùng Yamato (Nara hiện nay)',
    badge: 'Lăng Mộ Khổng Lồ · Tượng Đất Haniwa',
    color: 'from-cyan-700/20 to-blue-700/10 border-cyan-600/50 text-cyan-300',
    summary: 'Xây dựng hàng ngàn gò lăng mộ khổng lồ hình lỗ khóa tròn trước vuông sau (Zenpokoenfun), tiêu biểu là lăng mộ Thiên hoàng Nintoku lớn hơn cả Kim Tự Tháp Ai Cập.',
    keyFigures: ['Thiên hoàng Nintoku (仁徳天皇)', 'Thiên hoàng Ojin (応神天皇)'],
    breakthroughs: [
      'Kỹ thuật đắp lăng mộ cự thạch khổng lồ Daitoku Kofun',
      'Chế tác tượng đất Haniwa hình võ sĩ giáp trụ, ngựa chiến và vũ nữ',
      'Thống nhất triều đình Yamato kiểm soát phần lớn quần đảo'
    ],
    historicalLesson: 'Sự tập trung quyền lực tối cao của hoàng gia thông qua các công trình thế kỷ.',
    culturalRelic: 'Lăng mộ Daisen Kofun (Di sản thế giới UNESCO tại Sakai, Osaka)'
  },
  {
    id: 'asuka',
    name: 'Thời kỳ Asuka (Phật giáo du nhập)',
    jpName: '飛鳥時代',
    romaji: 'Asuka Jidai',
    periodYears: '538 – 710 Sau CN (Khoảng 170 năm)',
    capital: 'Asuka (Nara)',
    badge: 'Phật Giáo Truyền Vào · Thái Tử Shotoku',
    color: 'from-indigo-700/20 to-purple-700/10 border-indigo-600/50 text-indigo-300',
    summary: 'Phật giáo chính thức du nhập vào Nhật Bản, Thái tử Shotoku ban hành Hiến pháp 17 điều và Cuộc cải cách Taika thiết lập thể chế quân chủ trung ương tập quyền.',
    keyFigures: ['Thái tử Shotoku (聖徳太子)', 'Nakatomi no Kamatari', 'Thiên hoàng Tenmu'],
    breakthroughs: [
      'Ban hành "Hiến pháp 17 điều" (Lấy chữ Hòa 和 làm đầu)',
      'Xây dựng chùa gỗ Horyu-ji cổ kính nhất hành tinh',
      'Cải cách Taika (645) thiết lập chế độ Luật Lệnh (Ritsuryo)'
    ],
    historicalLesson: 'Tiếp thu văn minh thế giới nhưng biết bản địa hóa tinh tế để phục vụ đất nước.',
    culturalRelic: 'Chùa Horyu-ji (Công trình kiến trúc gỗ cổ nhất thế giới còn tồn tại)'
  },
  {
    id: 'nara',
    name: 'Thời kỳ Nara (Đại Phật & Vạn Diệp Tập)',
    jpName: '奈良時代',
    romaji: 'Nara Jidai',
    periodYears: '710 – 794 (Khoảng 84 năm)',
    capital: 'Heijo-kyo (Kinh đô Bình Thành - Nara)',
    badge: 'Đại Phật Todai-ji · Thi Ca Man\'yoshu',
    color: 'from-amber-600/20 to-yellow-600/10 border-amber-500/50 text-amber-300',
    summary: 'Kinh đô Heijo-kyo được quy hoạch bàn cờ tráng lệ, đúc tượng Đại Phật Todai-ji khổng lồ bằng đồng thau và hoàn thành tuyển tập thi ca cổ nhất Vạn Diệp Tập (Man\'yoshu).',
    keyFigures: ['Thiên hoàng Shomu (聖武天皇)', 'Thiền sư Ganjin (Giám Chân)', 'Nhà thơ Yamanoue no Okura'],
    breakthroughs: [
      'Đúc tượng Đại Phật Todai-ji Daibutsu cao 15 mét che chở quốc thái dân an',
      'Biên soạn Cổ Sự Ký (Kojiki) và Nhật Bản Thư Kỷ (Nihon Shoki)',
      'Sưu tập 4.500 bài thơ dân gian và quý tộc trong Vạn Diệp Tập (Man\'yoshu)'
    ],
    historicalLesson: 'Văn hóa và thi ca là linh hồn trường tồn gắn kết các tầng lớp nhân dân.',
    culturalRelic: 'Đại Phật điện Todai-ji và Kho tàng báu vật hoàng gia Shosoin'
  },
  {
    id: 'heian',
    name: 'Thời kỳ Heian (Văn hóa Quý tộc & Chữ Hiragana)',
    jpName: '平安時代',
    romaji: 'Heian Jidai',
    periodYears: '794 – 1185 (Gần 400 năm vàng son)',
    capital: 'Heian-kyo (Kinh đô Bình An - Kyoto)',
    badge: 'Truyện Kể Genji · Chữ Kana · Mỹ Học Miyabi',
    color: 'from-rose-700/20 to-pink-700/10 border-rose-600/50 text-rose-300',
    summary: 'Thời kỳ thái bình thịnh trị kéo dài gần 4 thế kỷ của giới quý tộc Kyoto, chữ viết thuần Nhật Kana (Hiragana & Katakana) ra đời, nữ sĩ Murasaki Shikibu viết kiệt tác tiểu thuyết đầu tiên của nhân loại: Truyện kể Genji.',
    keyFigures: ['Murasaki Shikibu (Tác giả Genji)', 'Sei Shonagon (Tác giả Makura no Soshi)', 'Fujiwara no Michinaga'],
    breakthroughs: [
      'Sáng tạo bảng chữ cái biểu âm Hiragana giải phóng tâm hồn thi ca phụ nữ Nhật',
      'Tiểu thuyết "Truyện kể Genji" (Genji Monogatari) ra đời',
      'Định hình mỹ học Miyabi (tao nhã, kiêu sa) và Mono no Aware (xao xuyến trước vô thường)'
    ],
    historicalLesson: 'Khi ngôn ngữ riêng ra đời, nền văn hóa dân tộc mới thực sự thăng hoa rực rỡ.',
    culturalRelic: 'Điện Phượng Hoàng Byodoin Hoodo (Hình ảnh in trên đồng 10 Yên Nhật)'
  },
  {
    id: 'kamakura',
    name: 'Thời kỳ Kamakura (Mạc phủ đầu tiên & Võ sĩ đạo)',
    jpName: '鎌倉時代',
    romaji: 'Kamakura Jidai',
    periodYears: '1185 – 1333 (Khoảng 150 năm)',
    capital: 'Kamakura (Kanagawa) - Chính quyền quân sự',
    badge: 'Mạc Phủ Đầu Tiên · Võ Sĩ Đạo Bushido · Thiền Tông Zen',
    color: 'from-slate-700/30 to-blue-800/20 border-slate-600/50 text-slate-200',
    summary: 'Minamoto no Yoritomo lập nên Mạc phủ Kamakura, chuyển giao quyền lực thực tế từ quý tộc sang tầng lớp kiếm sĩ Samurai, Phật giáo Thiền tông (Zen) bắt rễ sâu sắc.',
    keyFigures: ['Minamoto no Yoritomo (Tướng quân Shogun đầu tiên)', 'Hojo Tokimune (Đẩy lui Mông Cổ)', 'Thiền sư Dogen'],
    breakthroughs: [
      'Thiết lập thể chế Mạc phủ võ gia chính quyền (Bakufu)',
      'Hai lần kiên cường đánh lui đội quân viễn chinh Mông Cổ nhờ cản giặc và thần phong Kamikaze',
      'Thiền tông Zen nhấn mạnh kỷ luật tự giác, giản dị và trực cảm định hình tính cách Samurai'
    ],
    historicalLesson: 'Kỷ luật, lòng quả cảm và đức tính kiên nhẫn có thể đảo ngược mọi nghịch cảnh.',
    culturalRelic: 'Tượng Phật A Di Đà ngoài trời Kamakura Daibutsu'
  },
  {
    id: 'muromachi',
    name: 'Thời kỳ Muromachi (Chùa Vàng, Kịch Noh & Trà Đạo)',
    jpName: '室町時代',
    romaji: 'Muromachi Jidai',
    periodYears: '1336 – 1573 (Khoảng 240 năm)',
    capital: 'Muromachi (Kyoto)',
    badge: 'Kinkaku-ji · Nghệ Thuật Kịch Noh · Trà Đạo Chanoyu',
    color: 'from-amber-500/20 to-yellow-600/20 border-amber-400/50 text-amber-200',
    summary: 'Giai đoạn giao thoa rực rỡ giữa văn hóa quý tộc và võ sĩ: Tướng quân Ashikaga Yoshimitsu dựng Chùa Vàng Kinkaku-ji, nghệ thuật kịch mặt nạ Noh ra đời và nghệ thuật trà đạo chớm nở.',
    keyFigures: ['Ashikaga Yoshimitsu (Xây Chùa Vàng)', 'Zeami (Bậc thầy kịch Noh)', 'Sesshu (Danh họa tranh thủy mặc)'],
    breakthroughs: [
      'Đỉnh cao kiến trúc dát vàng lá lộng lẫy Kinkaku-ji (Chùa Vàng)',
      'Nghệ thuật kịch múa mặt nạ Noh và kịch hài Kyogen truyền đời',
      'Tranh thủy mặc Suibokuga và nghệ thuật cắm hoa Ikebana'
    ],
    historicalLesson: 'Tìm thấy sự thanh tịnh vô bờ bến ngay trong khoảng lặng của tâm trí.',
    culturalRelic: 'Chùa Vàng Kinkaku-ji soi bóng bên hồ nước Kyoko-chi'
  },
  {
    id: 'sengoku',
    name: 'Thời kỳ Sengoku (Chiến Quốc & Tam đại kiệt xuất)',
    jpName: '戦国時代',
    romaji: 'Sengoku Jidai',
    periodYears: '1467 – 1603 (Khoảng 140 năm loạn lạc khốc liệt)',
    capital: 'Chiến trường phân tán khắp nước Nhật',
    badge: 'Chiến Quốc Khốc Liệt · Nobunaga - Hideyoshi - Ieyasu',
    color: 'from-red-700/30 to-rose-800/20 border-red-500/60 text-red-300',
    summary: 'Thời kỳ khói lửa chiến tranh giành quyền lực tột độ giữa các Đại danh Daimyo. Ba nhà lãnh đạo kiệt xuất liên tiếp đặt nền móng thống nhất nước Nhật: Oda Nobunaga xông xáo, Toyotomi Hideyoshi thu phục lòng người và Tokugawa Ieyasu kiên nhẫn đợi thời cơ.',
    keyFigures: ['Oda Nobunaga (織田信長)', 'Toyotomi Hideyoshi (豊臣秀吉)', 'Tokugawa Ieyasu (徳川家康)'],
    breakthroughs: [
      'Chiến thuật sử dụng súng hỏa mai Teppo xoay vòng thay đổi lịch sử quân sự',
      'Sen no Rikyu hoàn thiện triết lý trà đạo Wabi-cha (mộc mạc, tĩnh lặng)',
      'Xây dựng các lâu đài phòng thủ đồ sộ Azuchi và Osaka Castle'
    ],
    historicalLesson: 'Câu ngạn ngữ chim đỗ quyên: "Nếu chim không hót, Nobunaga giết, Hideyoshi dụ hót, Ieyasu kiên nhẫn đợi chim tự hót".',
    culturalRelic: 'Lâu đài Himeji và kiếm báu của các danh tướng Chiến Quốc'
  },
  {
    id: 'edo',
    name: 'Thời kỳ Edo (Hòa bình 260 năm & Văn hóa Bình dân)',
    jpName: '江戸時代',
    romaji: 'Edo Jidai',
    periodYears: '1603 – 1867 (264 năm hòa bình thịnh trị)',
    capital: 'Edo (Giang Hộ - Tokyo ngày nay)',
    badge: 'Bế Quan Tỏa Cảng Sakoku · Tranh Ukiyo-e · Kịch Kabuki',
    color: 'from-indigo-600/30 to-blue-700/20 border-indigo-500/50 text-indigo-300',
    summary: 'Mạc phủ Tokugawa duy trì nền hòa bình lâu dài nhất thế giới. Thực thi chính sách đóng cửa Sakoku, văn hóa thị dân Chonin nở rộ: kịch Kabuki, tranh khắc gỗ Ukiyo-e của Hokusai, đấu vật Sumo và sushi ra đời.',
    keyFigures: ['Tokugawa Ieyasu', 'Katsushika Hokusai (Họa sĩ Sóng lừng Kanagawa)', 'Matsuo Basho (Thánh thơ Haiku)'],
    breakthroughs: [
      'Chính sách luân chuyển quan lại Sankin-kotai kích thích giao thương đường sá toàn quốc',
      'Tranh khắc gỗ Phù thế họa Ukiyo-e lan tỏa gây chấn động nền mỹ thuật phương Tây',
      'Định hình nền ẩm thực Edo: Nigiri Sushi, mì Soba và lẩu cá ngừ'
    ],
    historicalLesson: 'Hòa bình bền vững là mảnh đất màu mỡ nhất để văn hóa nghệ thuật và ẩm thực thăng hoa.',
    culturalRelic: 'Bức tranh "Sóng lừng ngoài khơi Kanagawa" của Hokusai'
  },
  {
    id: 'meiji',
    name: 'Thời kỳ Meiji (Minh Trị Duy Tân & Mở cửa thế giới)',
    jpName: '明治時代',
    romaji: 'Meiji Jidai',
    periodYears: '1868 – 1912 (44 năm chuyển mình thần kỳ)',
    capital: 'Tokyo (Dời đô từ Kyoto về Edo, đổi tên thành Tokyo)',
    badge: 'Minh Trị Duy Tân · Công Nghiệp Hóa · Văn Minh Khai Hóa',
    color: 'from-teal-600/30 to-emerald-700/20 border-teal-500/50 text-teal-300',
    summary: 'Thiên hoàng Minh Trị giành lại quyền lực, tiến hành cuộc cải cách Duy Tân thần tốc: bãi bỏ chế độ đẳng cấp Samurai, phổ cập giáo dục toàn dân, mở tuyến đường sắt đầu tiên và trở thành cường quốc công nghiệp hiện đại hóa.',
    keyFigures: ['Thiên hoàng Minh Trị (明治天皇)', 'Fukuzawa Yukichi (Khuyến học)', 'Sakamoto Ryoma'],
    breakthroughs: [
      'Khẩu hiệu "Văn minh khai hóa" (Bunmei Kaika) và "Phú quốc cường binh"',
      'Khai trương tuyến đường sắt đầu tiên Tokyo - Yokohama (1872)',
      'Ban hành Hiến pháp Đế quốc Đại Nhật Bản (1889)'
    ],
    historicalLesson: 'Học tập tinh hoa tri thức nhân loại với tinh thần "Hồn Nhật Bản, tài nghệ phương Tây" (Wakon Yosai).',
    culturalRelic: 'Chân dung Fukuzawa Yukichi trên tờ 10.000 Yên và Đền Meiji Jingu'
  },
  {
    id: 'taisho',
    name: 'Thời kỳ Taisho (Nền Dân chủ & Lãng mạn Đông - Tây)',
    jpName: '大正時代',
    romaji: 'Taishō Jidai',
    periodYears: '1912 – 1926 (14 năm ngắn ngủi đầy chất thơ)',
    capital: 'Tokyo',
    badge: 'Taisho Roman · Dân Chủ Nghị Viện · Quán Cafe Hiện Đại',
    color: 'from-pink-600/30 to-rose-700/20 border-pink-500/50 text-pink-300',
    summary: 'Thời kỳ dân chủ Taisho (Taisho Democracy) với sự trỗi dậy của báo chí, văn học tự do, phong cách lãng mạn Taisho Roman giao thoa giữa Kimono truyền thống và veston phương Tây.',
    keyFigures: ['Thiên hoàng Taisho', 'Nhà văn Akutagawa Ryunosuke (Rashomon)', 'Họa sĩ Yumeji Takehisa'],
    breakthroughs: [
      'Phổ cập quyền bầu cử cho nam giới và phong trào công đoàn',
      'Trào lưu sống "Modern Boy" (Mobō) và "Modern Girl" (Moga)',
      'Sự ra đời của các tạp chí văn học tiến bộ và quán cà phê phong cách Âu'
    ],
    historicalLesson: 'Khoảnh khắc giao thoa tự do văn hóa nảy nở những ý tưởng nghệ thuật lãng mạn bất tử.',
    culturalRelic: 'Tòa nhà Ga Tokyo bằng gạch đỏ tráng lệ thời Taisho'
  },
  {
    id: 'showa',
    name: 'Thời kỳ Showa (Chiến tranh & Thần kỳ Kinh tế)',
    jpName: '昭和時代',
    romaji: 'Shōwa Jidai',
    periodYears: '1926 – 1989 (63 năm dài nhất lịch sử hiện đại)',
    capital: 'Tokyo',
    badge: 'Hậu Chiến Vươn Lên · Tàu Shinkansen · Siêu Cường Kinh Tế',
    color: 'from-blue-600/30 to-indigo-700/20 border-blue-500/50 text-blue-300',
    summary: 'Trải qua thảm họa Thế chiến thứ hai, nước Nhật từ đống tro tàn tro bụi đã vươn lên thần kỳ thành nền kinh tế số 2 thế giới, tổ chức Thế vận hội Tokyo 1964 và ra mắt tàu viên đạn Shinkansen.',
    keyFigures: ['Thiên hoàng Showa (Hirohito)', 'Matsushita Konosuke (Sáng lập Panasonic)', 'Soichiro Honda'],
    breakthroughs: [
      'Khai trương tàu cao tốc Shinkansen đầu tiên thế giới nối Tokyo - Osaka (1964)',
      'Phổ cập "3 món bảo bối thần kỳ": Tivi màu, Máy giặt, Tủ lạnh',
      'Định hình văn hóa Manga/Anime hiện đại với tác phẩm Astro Boy của Osamu Tezuka'
    ],
    historicalLesson: 'Ý chí kiên cường không chịu gục ngã (Gaman) và tinh thần cải tiến liên tục (Kaizen) tái sinh đất nước.',
    culturalRelic: 'Tàu viên đạn Shinkansen 0-Series và Tháp Tokyo Tower đỏ trắng'
  },
  {
    id: 'heisei_reiwa',
    name: 'Thời kỳ Heisei & Reiwa (Đương đại & Pop Culture)',
    jpName: '平成・令和時代',
    romaji: 'Heisei & Reiwa Jidai',
    periodYears: '1989 – Nay (Thời đại đương đại hòa bình)',
    capital: 'Tokyo',
    badge: 'Cool Japan · Anime Toàn Cầu · Kỷ Nguyên Lệnh Hòa Reiwa',
    color: 'from-purple-600/30 to-fuchsia-700/20 border-purple-500/50 text-purple-300',
    summary: 'Vượt qua giai đoạn bong bóng kinh tế và thiên tai, nước Nhật lan tỏa sức mạnh mềm văn hóa "Cool Japan": Anime, Game Studio Ghibli, ẩm thực Washoku được UNESCO vinh danh di sản phi vật thể nhân loại.',
    keyFigures: ['Thiên hoàng Akihito (Bình Thành)', 'Thiên hoàng Naruhito (Lệnh Hòa)', 'Đạo diễn Hayao Miyazaki'],
    breakthroughs: [
      'Ẩm thực truyền thống Washoku được UNESCO công nhận Di sản phi vật thể nhân loại',
      'Chiến lược văn hóa toàn cầu Cool Japan (Anime, Manga, Cosplay, J-Pop)',
      'Chuyển giao niên hiệu lịch sử sang Reiwa (Lệnh Hòa - Đẹp đẽ và Hòa hợp)'
    ],
    historicalLesson: 'Tôn trọng di sản cội nguồn đồng thời đổi mới sáng tạo để hòa nhập cùng thế giới.',
    culturalRelic: 'Bảo tàng Ghibli Mitaka và Tháp truyền hình Tokyo Skytree 634m'
  }
];
