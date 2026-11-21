export interface MatsuriFestivalItem {
  id: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  seasonNameVn: string;
  name: string;
  jpName: string;
  reading: string;
  location: string;
  monthTime: string;
  highlight: string;
  attireAndCustom: string;
  specialFood: string;
  shrineOrTemple: string;
}

export const JAPAN_MATSURI_CALENDAR: MatsuriFestivalItem[] = [
  // 1. MÙA XUÂN (HARU)
  {
    id: 'matsuri_hanami',
    season: 'spring',
    seasonNameVn: 'Mùa Xuân (春 - Haru)',
    name: 'Tập quán Ngắm hoa Anh đào Hanami (花見)',
    jpName: 'お花見文化と桜前線',
    reading: 'おはなみぶんか と さくらぜんせん',
    location: 'Toàn quốc (Công viên Ueno, Sông Meguro, Lâu đài Hirosaki...)',
    monthTime: 'Cuối tháng 3 – Giữa tháng 4',
    highlight: 'Trải bạt xanh ngồi dưới tán hoa anh đào nở rộ, cùng bạn bè thưởng rượu ngắm hoa và suy ngẫm về nét đẹp vô thường Mono no Aware.',
    attireAndCustom: 'Trang phục ấm áp đầu xuân hoặc áo Kimono hoa nhạt; chuẩn bị bạt ngồi và túi gom rác mang về.',
    specialFood: 'Bánh dầy ba màu Hanami Dango (Hồng, Trắng, Xanh), cơm nắm Onigiri bọc lá anh đào, rượu ngắm hoa Hanamizake.',
    shrineOrTemple: 'Đền Yasukuni (Cây hoa chuẩn dự báo Tokyo), Chùa Daigo-ji (Kyoto)'
  },
  {
    id: 'matsuri_takayama_spring',
    season: 'spring',
    seasonNameVn: 'Mùa Xuân (春 - Haru)',
    name: 'Lễ hội Kiệu rước Sanno Matsuri Takayama',
    jpName: '春の高山祭（山王祭）',
    reading: 'はるのたかやままつり',
    location: 'Thành phố Takayama (Tỉnh Gifu)',
    monthTime: 'Ngày 14 – 15 tháng 4 hàng năm',
    highlight: 'Rước 12 cỗ kiệu Yatai sơn son thếp vàng lộng lẫy chạm khắc tinh xảo bậc nhất nước Nhật, màn biểu diễn búp bê cơ học Karakuri Ningyo bí truyền.',
    attireAndCustom: 'Trang phục truyền thống thời Edo của thợ thủ công Hida Takayama; thắp 100 chiếc đèn lồng trên mỗi cỗ kiệu rước đêm.',
    specialFood: 'Thịt bò Hida nướng xiên que, bánh dày nướng sốt tương ngọt Gohei Mochi.',
    shrineOrTemple: 'Đền Hie Jinja (Sanno-sama)'
  },
  {
    id: 'matsuri_kanda',
    season: 'spring',
    seasonNameVn: 'Mùa Xuân (春 - Haru)',
    name: 'Đại lễ hội Kanda Matsuri (Tokyo)',
    jpName: '神田祭（天下祭）',
    reading: 'かんだまつり（てんかまつり）',
    location: 'Kanda, Nihonbashi, Akihabara (Tokyo)',
    monthTime: 'Giữa tháng 5 (Các năm lẻ)',
    highlight: 'Một trong Tam Đại Lễ Hội lớn nhất Nhật Bản (Nihon Sandai Matsuri), hàng trăm cỗ kiệu Thần Mikoshi diễu hành qua các trung tâm tài chính và thánh địa Anime Akihabara.',
    attireAndCustom: 'Áo khoác Happi có huy hiệu gia tộc, khăn buộc đầu Tenugui, tiếng hô kiệu dũng mãnh "Wasshoi! Wasshoi!".',
    specialFood: 'Kẹo bông gòn Watame, bánh cá nướng Taiyaki, xiên gà nướng Yakitori.',
    shrineOrTemple: 'Đền Thần đạo Kanda Myojin (Tokyo)'
  },

  // 2. MÙA HẠ (NATSU)
  {
    id: 'matsuri_gion',
    season: 'summer',
    seasonNameVn: 'Mùa Hạ (夏 - Natsu)',
    name: 'Đại lễ Gion Matsuri cố đô Kyoto 1.100 năm',
    jpName: '祇園祭（ユネスコ無形文化遺産）',
    reading: 'ぎおんまつり',
    location: 'Cố đô Kyoto (Phố Shijo-Dori & Gion)',
    monthTime: 'Kéo dài suốt cả tháng 7 (Đỉnh cao ngày 17 & 24/7)',
    highlight: 'Di sản phi vật thể nhân loại UNESCO: Những cỗ xe rước khổng lồ Hoko cao như tòa nhà 5 tầng nặng 12 tấn được kéo bằng sức người không dùng đinh sắt.',
    attireAndCustom: 'Mặc áo Yukata mùa hè thanh nhã, phe phẩy quạt tròn Uchiwa, nghe điệu nhạc sáo trúc Gion-bayashi lảnh lót.',
    specialFood: 'Bùa trừ tà bện rơm hình bánh Chimaki, dưa leo lạnh ngâm muối cắm que, mì lạnh Somen.',
    shrineOrTemple: 'Đền Yasaka Jinja (Gion, Kyoto)'
  },
  {
    id: 'matsuri_tenjin',
    season: 'summer',
    seasonNameVn: 'Mùa Hạ (夏 - Natsu)',
    name: 'Lễ hội Nước & Pháo hoa Tenjin Matsuri Osaka',
    jpName: '天神祭（浪速の火と水の祭典）',
    reading: 'てんじんまつり',
    location: 'Sông Okawa (Thành phố Osaka)',
    monthTime: 'Ngày 24 – 25 tháng 7 hàng năm',
    highlight: 'Đại lễ hội sông nước lớn nhất Nhật Bản: Đoàn thuyền rước hơn 100 chiếc thắp đuốc rực sáng trên sông cùng màn bắn 5.000 quả pháo hoa hoa lệ.',
    attireAndCustom: 'Áo Yukata rực rỡ, đi guốc mộc Geta vang lách cách, vỗ tay nhịp điệu Osaka Tejime "Uchidoume".',
    specialFood: 'Bánh bạch tuộc Takoyaki giòn rụm, đá bào siro Kakigori mát lạnh, bò xiên nướng.',
    shrineOrTemple: 'Đền Osaka Tenmangu (Thờ thần học vấn Sugawara no Michizane)'
  },
  {
    id: 'matsuri_nebuta',
    season: 'summer',
    seasonNameVn: 'Mùa Hạ (夏 - Natsu)',
    name: 'Lễ hội Lồng đèn Khổng lồ Nebuta Matsuri Aomori',
    jpName: '青森ねぶた祭（跳人の熱狂）',
    reading: 'あおもりねぶたまつり',
    location: 'Thành phố Aomori (Vùng Tohoku)',
    monthTime: 'Ngày 2 – 7 tháng 8 hàng năm',
    highlight: 'Những chiếc lồng đèn giấy Washi khổng lồ phát sáng cao 5 mét hình võ sĩ dũng mãnh, cùng hàng ngàn vũ công Haneto nhảy múa hô vang "Rassera! Rassera!".',
    attireAndCustom: 'Trang phục Haneto gắn chuông kêu leng keng; bất kỳ ai mặc đúng trang phục đều được tham gia nhảy múa tự do!',
    specialFood: 'Nước ép táo Aomori 100%, mực nướng than hoa thơm lừng, ngô ngọt nướng sốt bơ.',
    shrineOrTemple: 'Bảo tàng Nebuta Warasse & Vịnh Aomori'
  },
  {
    id: 'matsuri_awa_odori',
    season: 'summer',
    seasonNameVn: 'Mùa Hạ (夏 - Natsu)',
    name: 'Lễ hội Điệu nhảy Cuồng say Awa Odori Tokushima',
    jpName: '阿波おどり（踊る阿呆に見る阿呆）',
    reading: 'あわおどり',
    location: 'Thành phố Tokushima (Đảo Shikoku)',
    monthTime: 'Ngày 12 – 15 tháng 8 hàng năm',
    highlight: 'Hơn 1,3 triệu du khách đổ về hòa mình vào điệu nhảy dân gian 400 năm: "Kẻ nhảy là ngốc, kẻ ngắm nhìn cũng là ngốc, đã cùng là ngốc thì chẳng tội gì không nhảy!".',
    attireAndCustom: 'Nữ đội nón rơm bện hình bán nguyệt Amigasa, đi guốc mộc nghiêng mũi; nam nhảy vũ điệu phóng khoáng cầm quạt.',
    specialFood: 'Gà chọi Awa Odori nướng giòn, mì Tokushima Ramen, bia lạnh Sudachi.',
    shrineOrTemple: 'Quảng trường Awa Odori Kaikan & Đường phố Tokushima'
  },

  // 3. MÙA THU (AKI)
  {
    id: 'matsuri_obon',
    season: 'autumn',
    seasonNameVn: 'Mùa Thu (秋 - Aki)',
    name: 'Đại lễ Vu Lan & Đốt lửa tiễn Phật Obon (お盆)',
    jpName: 'お盆の迎え火・送り火と盆踊り',
    reading: 'おぼん の むかえび・おくりび と ぼんおどり',
    location: 'Toàn quốc (Kyoto Gozan Okuribi rực sáng trên núi)',
    monthTime: 'Ngày 13 – 16 tháng 8 (hoặc tháng 7 theo dương lịch)',
    highlight: 'Đón rước linh hồn tổ tiên về sum họp gia đình, cắm ngựa dưa chuột (chạy nhanh) và bò cà tím (đi chậm mang theo đồ cúng), đêm ngày 16 đốt 5 ngọn lửa chữ "Đại" (大文字) trên sườn núi Kyoto tiễn Phật.',
    attireAndCustom: 'Gia đình đoàn viên về quê thăm viếng mộ (Ohaka-mairi), nhảy múa điệu Bon Odori quanh tháp Yagura.',
    specialFood: 'Bánh gạo bọc lá sồi Kashiwa Mochi, bánh dầy Ohagi đậu đỏ, dưa hấu ướp lạnh.',
    shrineOrTemple: '5 ngọn núi lửa thiêng quanh thung lũng Kyoto'
  },
  {
    id: 'matsuri_shichigosan',
    season: 'autumn',
    seasonNameVn: 'Mùa Thu (秋 - Aki)',
    name: 'Lễ hội Cầu phúc Thiếu nhi Shichi-Go-San (7-5-3)',
    jpName: '七五三（子供の健やかな成長祈願）',
    reading: 'しちごさん',
    location: 'Tất cả các ngôi đền Thần đạo Shinto trên toàn nước Nhật',
    monthTime: 'Ngày 15 tháng 11 hàng năm',
    highlight: 'Nghi lễ tạ ơn thần linh bảo bọc các bé 3 tuổi, 5 tuổi và 7 tuổi vượt qua bệnh tật hiểm nghèo thời thơ ấu và cầu chúc khỏe mạnh trường thọ.',
    attireAndCustom: 'Các bé gái mặc Kimono lộng lẫy hoặc đầm công chúa; các bé trai mặc áo Hakama võ sĩ oai phong.',
    specialFood: 'Kẹo ngậm nghìn năm Chitose Ame đựng trong túi dài in hình rùa hạc chúc sống lâu trăm tuổi.',
    shrineOrTemple: 'Đền Meiji Jingu (Tokyo), Đền Tsurugaoka Hachimangu (Kamakura)'
  },
  {
    id: 'matsuri_momiji',
    season: 'autumn',
    seasonNameVn: 'Mùa Thu (秋 - Aki)',
    name: 'Phong tục Thưởng lãm Lá đỏ Momijigari (紅葉狩り)',
    jpName: '紅葉狩りと秋の風情',
    reading: 'もみじがり と あきのふぜい',
    location: 'Kyoto (Arashiyama, Tofuku-ji), Núi Takao, Nikko...',
    monthTime: 'Tháng 10 – Cuối tháng 11',
    highlight: 'Chiêm ngưỡng cả cánh rừng nhuộm sắc đỏ thắm của lá phong Momiji và sắc vàng rực của cây rẻ quạt Icho, chiếu sáng ban đêm Light-up lộng lẫy tại các ngôi chùa cổ.',
    attireAndCustom: 'Đi dạo nhẹ nhàng, chụp ảnh kỷ niệm, thưởng trà bên hiên chùa ngắm vườn sỏi cào Karesansui.',
    specialFood: 'Bánh lá phong chiên giòn Momiji Tempura, hạt dẻ nướng Yakikuri, nấm Matsutake nướng đất sét.',
    shrineOrTemple: 'Chùa Tofuku-ji, Chùa Kiyomizu-dera, Chùa Eikan-do (Kyoto)'
  },

  // 4. MÙA ĐÔNG (FUYU)
  {
    id: 'matsuri_hatsumode',
    season: 'winter',
    seasonNameVn: 'Mùa Đông (冬 - Fuyu)',
    name: 'Nghi lễ Viếng đền Đầu năm Hatsumode (初詣)',
    jpName: '新春の初詣と破魔矢・おみくじ',
    reading: 'はつもうで と はまや・おみくじ',
    location: 'Toàn bộ đền Thần đạo & chùa chiền Nhật Bản',
    monthTime: 'Từ giao thừa ngày 1/1 đến mùng 3 Tết',
    highlight: 'Đón giao thừa nghe 108 tiếng chuông chùa Joya no Kane thanh tẩy 108 phiền não, thành kính viếng đền cầu may mắn năm mới, rút quẻ bói Omikuji và mua mũi tên trừ tà Hamaya.',
    attireAndCustom: 'Nghi thức rửa tay thanh tịnh Temizuya: Tay trái, tay phải, súc miệng, rửa cán gáo; cúi 2 lạy, vỗ tay 2 cái, cúi 1 lạy (Nirei Nihakushu Ichirei).',
    specialFood: 'Hộp cơm Tết 3 tầng Osechi Ryori, súp bánh dày Ozoni, rượu ngọt thần linh Amazake.',
    shrineOrTemple: 'Đền Meiji Jingu (Đón hơn 3 triệu khách 3 ngày Tết), Đền Fushimi Inari, Chùa Asakusa'
  },
  {
    id: 'matsuri_setsubun',
    season: 'winter',
    seasonNameVn: 'Mùa Đông (冬 - Fuyu)',
    name: 'Lễ hội Ném đậu Xua quỷ Tiết Xuân Setsubun (節分)',
    jpName: '節分の豆まきと恵方巻',
    reading: 'せつぶん の まめまき と えほうまき',
    location: 'Các gia đình, trường mẫu giáo và chùa lớn khắp nước Nhật',
    monthTime: 'Ngày 3 tháng 2 hàng năm (Ngày giao mùa)',
    highlight: 'Ném những hạt đậu nành rang chín xua đuổi tà quỷ và hô vang: "Oni wa soto! Fuku wa uchi!" (Quỷ dữ cút ra ngoài! Phúc lành hãy vào trong!), ăn thanh cơm cuộn Ehomaki hướng về phương vị may mắn mà không được nói chuyện.',
    attireAndCustom: 'Người lớn đeo mặt nạ quỷ đỏ quỷ xanh Oni để trẻ em ném đậu; ăn số hạt đậu bằng số tuổi của mình cộng thêm 1 hạt để cầu sức khỏe.',
    specialFood: 'Cơm cuộn may mắn Ehomaki nguyên cây, đậu nành rang may mắn Fukumame.',
    shrineOrTemple: 'Chùa Senso-ji, Đền Yasaka Jinja, Chùa Naritasan'
  },
  {
    id: 'matsuri_sapporo_snow',
    season: 'winter',
    seasonNameVn: 'Mùa Đông (冬 - Fuyu)',
    name: 'Lễ hội Băng tuyết Quốc tế Sapporo Yuki Matsuri',
    jpName: 'さっぽろ雪まつり（巨大雪氷像の祭典）',
    reading: 'さっぽろゆきまつり',
    location: 'Công viên Odori & Susukino (Thành phố Sapporo, Hokkaido)',
    monthTime: 'Đầu tháng 2 hàng năm (Kéo dài 7 ngày)',
    highlight: 'Một trong những lễ hội mùa đông lớn nhất hành tinh: Trưng bày hàng trăm công trình kiến trúc kỳ quan thế giới và nhân vật Anime được tạc hoàn toàn từ tuyết trắng cao hàng chục mét.',
    attireAndCustom: 'Áo phao dày, giày chống trượt chuyên dụng đi trên băng tuyết; thưởng thức màn chiếu ánh sáng 3D Mapping huyền ảo trên các tượng tuyết khổng lồ.',
    specialFood: 'Súp cà ri cay nóng Soup Curry Hokkaido, lẩu cừu nướng Jingisukan bốc khói, cua hoàng đế hấp nóng.',
    shrineOrTemple: 'Công viên trung tâm Odori Park & Khu phố đêm Susukino'
  }
];
