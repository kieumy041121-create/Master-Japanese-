// ============================================================================
// JAPANESE GENZ & CULTURE ARCADE: 10 FUN & USEFUL FEATURES DATABASE
// Kho Dữ Liệu 10 Tính Năng Tự Đề Xuất Hữu Ích, Vui Vẻ, Độc Đáo Bản Xứ Nhật Bản
// ============================================================================

// -------------------------------------------------------------
// 1. QUẺ BÓI THẦN ĐẠO & VẬN MỆNH HÔM NAY (OMIKUJI - おみくじ)
// -------------------------------------------------------------
export interface OmikujiFortune {
  id: string;
  rank: 'Đại Cát (大吉)' | 'Trung Cát (中吉)' | 'Tiểu Cát (小吉)' | 'Cát (吉)' | 'Mạt Cát (末吉)' | 'Hung (凶)';
  rankJp: string;
  shrineOrigin: string;
  poemWaka: string;
  poemTranslation: string;
  overview: string;
  luckAspects: {
    love: string;
    studyWork: string;
    health: string;
    travel: string;
  };
  luckyElements: {
    color: string;
    item: string;
    food: string;
    direction: string;
  };
  deepExplanation: string;
}

export const INITIAL_OMIKUJI_FORTUNES: OmikujiFortune[] = [
  {
    id: 'omikuji_1',
    rank: 'Đại Cát (大吉)',
    rankJp: '大吉 (Daikichi)',
    shrineOrigin: 'Đền Meiji Jingu (Tokyo)',
    poemWaka: 'あさみどり 澄みわたりたる 大空の 広きをおのが 心ともがな',
    poemTranslation: 'Trời biếc trong veo rợp ánh hồng, mong sao lòng dạ cũng thênh thang bao la.',
    overview: 'Vận khí như mặt trời ban mai tỏa rạng muôn nơi. Mọi ước nguyện đều có quý nhân tương trợ, chỉ cần giữ tâm thiện lành và kiên trì.',
    luckAspects: {
      love: 'Nhân duyên như ý, người trong mộng sẽ chủ động nhắn tin hoặc bật đèn xanh.',
      studyWork: 'Thi cử đỗ đạt cao, dự án hanh thông, cấp trên đánh giá vượt trội.',
      health: 'Năng lượng tràn đầy, khí sắc hồng hào, duy trì tập luyện nhẹ nhàng.',
      travel: 'Xuất hành phương Nam hoặc Đông gặp nhiều niềm vui bất ngờ.',
    },
    luckyElements: {
      color: 'Hồng phấn hoa anh đào (Sakura-iro)',
      item: 'Bút máy hoặc sổ tay bìa lụa',
      food: 'Matcha latte bọt sữa & bánh Mochi đậu đỏ',
      direction: 'Đông Nam (Tài lộc & Nhân duyên)',
    },
    deepExplanation: 'Quẻ Đại Cát là cấp độ may mắn cao nhất tại đền Thần đạo Nhật Bản. Người Nhật tin rằng khi bốc được quẻ này, bạn nên cất giữ cẩn thận trong ví tiền (Omamori) để giữ gìn phước lành suốt cả năm.',
  },
  {
    id: 'omikuji_2',
    rank: 'Trung Cát (中吉)',
    rankJp: '中吉 (Chuukichi)',
    shrineOrigin: 'Đền Fushimi Inari-Taisha (Kyoto)',
    poemWaka: '静けき波の 寄する浜辺に 千鳥鳴く 声聞く心地 すがすがしきかな',
    poemTranslation: 'Sóng êm vỗ nhẹ bờ cát trắng, tiếng chim hải âu ngân nga dịu dàng thanh thản.',
    overview: 'Cuộc sống an yên vững chãi. Tài lộc và may mắn đang tích tụ từng ngày như phù sa bồi đắp.',
    luckAspects: {
      love: 'Tình cảm êm đềm, sự thấu hiểu từ những cử chỉ nhỏ nhặt tạo nên gắn kết bền lâu.',
      studyWork: 'Tiến độ ổn định, cẩn trọng kiểm tra chi tiết sẽ giúp bạn ghi điểm tuyệt đối.',
      health: 'Cần chú ý ngủ đủ giấc, tránh thức khuya lướt điện thoại quá 12h đêm.',
      travel: 'Thích hợp đi dạo công viên cây xanh hoặc thưởng trà ven sông.',
    },
    luckyElements: {
      color: 'Xanh ngọc bích (Asagi-iro)',
      item: 'Khăn mùi xoa lụa tơ tằm',
      food: 'Cơm cuộn cá hồi sốt bơ trứng',
      direction: 'Tây Bắc (Bình an & Quý nhân)',
    },
    deepExplanation: 'Trung Cát tượng trưng cho sự thịnh vượng đang trên đà phát triển. Khác với Đại Cát đã đạt đỉnh, Trung Cát mang lại cảm giác bền vững và ít áp lực suy thoái hơn.',
  },
  {
    id: 'omikuji_3',
    rank: 'Tiểu Cát (小吉)',
    rankJp: '小吉 (Shoukichi)',
    shrineOrigin: 'Chùa Asakusa Sensoji (Tokyo)',
    poemWaka: '春風に 誘われて咲く 花なれど 散るを惜しみて 枝にとどまる',
    poemTranslation: 'Gió xuân gọi cánh hoa đua nở, hoa vẫn luyến lưu cành chẳng nỡ lìa xa.',
    overview: 'Niềm vui nhỏ bé gõ cửa mỗi ngày. Hãy biết trân trọng những điều bình dị quanh mình.',
    luckAspects: {
      love: 'Có người thầm thương trộm nhớ, đừng quá khép kín cánh cửa trái tim.',
      studyWork: 'Học tập tiến bộ rõ rệt, nên tập trung ôn chắc ngữ pháp và từ vựng cốt lõi.',
      health: 'Uống nhiều nước ấm và giữ ấm vùng cổ họng khi chuyển mùa.',
      travel: 'Một chuyến đi ngắn trong ngày cùng bạn thân sẽ nạp đầy năng lượng.',
    },
    luckyElements: {
      color: 'Vàng mật ong ấm áp (Yamabuki-iro)',
      item: 'Móc chìa khóa hình mèo may mắn Maneki-neko',
      food: 'Súp Miso đậu phụ non nóng hổi',
      direction: 'Đông Bắc (Tri thức & Học vấn)',
    },
    deepExplanation: 'Tiểu Cát nhắc nhở triết lý Ichigo Ichie (一期一会): Mỗi cuộc gặp gỡ, mỗi khoảnh khắc trong đời đều là duy nhất và đáng trân trọng.',
  },
  {
    id: 'omikuji_4',
    rank: 'Cát (吉)',
    rankJp: '吉 (Kichi)',
    shrineOrigin: 'Đền Kitano Tenmangu (Vị thần Học vấn Sugawara no Michizane)',
    poemWaka: '雲晴れて 月の光の さやけきに 遠き里をも 見渡すばかり',
    poemTranslation: 'Mây tan trăng rọi ngời ánh sáng, xóm làng xa tít cũng hiện rõ mồn một.',
    overview: 'Mọi khúc mắc, bối rối trong lòng sắp được giải tỏa. Tầm nhìn sáng tỏ, tương lai rạng ngời.',
    luckAspects: {
      love: 'Rõ ràng trong cảm xúc, giải quyết dứt điểm những hiểu lầm không đáng có.',
      studyWork: 'Thi cử đạt kỳ vọng nếu giữ vững phong độ luyện đề hàng ngày.',
      health: 'Tập thể dục nhẹ nhàng 20 phút mỗi ngày giúp tinh thần minh mẫn.',
      travel: 'Ghé thăm bảo tàng hoặc thư viện cổ kính sẽ khơi nguồn cảm hứng mới.',
    },
    luckyElements: {
      color: 'Tím hoa cà (Fuji-iro)',
      item: 'Dây đeo điện thoại đính ngọc trai nhân tạo',
      food: 'Mì Udon nước dùng dashi thanh ngọt',
      direction: 'Chính Nam (Trí tuệ & Danh vọng)',
    },
    deepExplanation: 'Tại đền Kitano Tenmangu ở Kyoto, các sĩ tử khắp nước Nhật đổ về xin quẻ Cát trước kỳ thi tuyển sinh đại học để cầu xin trí tuệ khai sáng.',
  },
  {
    id: 'omikuji_5',
    rank: 'Mạt Cát (末吉)',
    rankJp: '末吉 (Suekichi)',
    shrineOrigin: 'Đền Itsukushima Torii trên biển (Miyajima, Hiroshima)',
    poemWaka: '冬ごもり 春待つ枝の つぼみかも やがて花咲く 時ぞ来たらん',
    poemTranslation: 'Cành cây ngủ đông chờ hơi ấm mùa xuân, nụ biếc rồi đây sẽ bung nở rạng ngời.',
    overview: 'Đang trong giai đoạn tích lũy nội lực. Khó khăn ban đầu chỉ là bài test để bạn trở nên bản lĩnh hơn.',
    luckAspects: {
      love: 'Chớ nóng vội, tình cảm chân thành cần thời gian để đơm hoa kết trái.',
      studyWork: 'Cần kiên nhẫn tích lũy từng chút một, không nên đốt cháy giai đoạn.',
      health: 'Chú ý bảo vệ đôi mắt khi làm việc máy tính nhiều giờ liên tục.',
      travel: 'Hạn chế đi xa vào những ngày mưa gió bất thường.',
    },
    luckyElements: {
      color: 'Trắng tinh khôi (Shirono-iro)',
      item: 'Bình giữ nhiệt kim loại nhỏ gọn',
      food: 'Cháo gạo cẩm thảo mộc dưỡng nhan',
      direction: 'Chính Bắc (Tĩnh tâm & Phục hồi)',
    },
    deepExplanation: 'Mạt Cát mang ý nghĩa "may mắn nở muộn ở phần kết". Giống như bông hoa anh đào phải trải qua mùa đông buốt giá mới rực rỡ nhất khi xuân về.',
  },
];

export const EXTRA_OMIKUJI_FORTUNES: OmikujiFortune[] = [
  {
    id: 'omikuji_extra_1',
    rank: 'Đại Cát (大吉)',
    rankJp: '大吉 (Daikichi - Hoàng Kim Vận)',
    shrineOrigin: 'Đền Atsuta Jingu (Nagoya - Nơi lưu giữ thần kiếm Kusanagi)',
    poemWaka: '剣の光 闇を切り裂き 旭日の ごとく輝く 天下無双',
    poemTranslation: 'Bảo kiếm vung lên xua tan đêm tối, tựa ánh dương rạng rỡ khắp đất trời.',
    overview: 'Vận may cực thịnh, đột phá ngoạn mục trong sự nghiệp và tình yêu. Mọi trở ngại đều tự tan biến.',
    luckAspects: {
      love: 'Gặp được chân ái định mệnh, người ấy vô cùng trân trọng bạn.',
      studyWork: 'Dẫn đầu thành tích, có cơ hội thăng tiến hoặc nhận học bổng du học.',
      health: 'Cơ thể dẻo dai khỏe mạnh, tinh thần sảng khoái phi phàm.',
      travel: 'Du lịch Nhật Bản hoặc những vùng đất mới đem lại vận may tài chính lớn.',
    },
    luckyElements: {
      color: 'Đỏ son truyền thống (Aka-beni)',
      item: 'Vòng tay đá thạch anh hồng',
      food: 'Thịt bò Wagyu áp chảo sốt ponzu',
      direction: 'Đông Bắc (Sinh khí dồi dào)',
    },
    deepExplanation: 'Đền Atsuta là một trong ba ngôi đền linh thiêng nhất Nhật Bản. Quẻ Đại Cát tại đây là điềm báo chiến thắng mọi đối thủ cạnh tranh.',
  },
  {
    id: 'omikuji_extra_2',
    rank: 'Trung Cát (中吉)',
    rankJp: '中吉 (Chuukichi - Duyên Khởi)',
    shrineOrigin: 'Đền Izumo Taisha (Shimane - Cội nguồn tình duyên Enmusubi)',
    poemWaka: '八雲立つ 出雲八重垣 妻ごみに 八重垣つくる その八重垣を',
    poemTranslation: 'Mây tám tầng bay giăng rào đón bạn hiền, kết mối tơ hồng muôn đời thắm tươi.',
    overview: 'Tơ duyên kết nối, nhân hòa địa lợi. Mối quan hệ tốt đẹp sẽ mở ra những cánh cửa cơ hội mới.',
    luckAspects: {
      love: 'Tình duyên thăng hoa tột bậc, dễ có lời tỏ tình hoặc tiến tới cam kết dài lâu.',
      studyWork: 'Làm việc nhóm xuất sắc, nhận được sự hỗ trợ nhiệt tình từ đồng nghiệp.',
      health: 'Tâm trạng thư thái, làn da sáng mịn rạng rỡ.',
      travel: 'Chuyến đi biển hoặc đền chùa cổ kính giúp thanh lọc tâm hồn.',
    },
    luckyElements: {
      color: 'Xanh lam đại dương (Ruri-iro)',
      item: 'Dây thừng đỏ may mắn (Musubi)',
      food: 'Bánh trôi nước dango nướng thơm lừng',
      direction: 'Chính Tây (Duyên phận & Bình an)',
    },
    deepExplanation: 'Đền Izumo Taisha là nơi các vị thần khắp nước Nhật tụ họp vào tháng 10 âm lịch (Kamiarizuki) để se duyên cho con người.',
  },
  {
    id: 'omikuji_extra_3',
    rank: 'Tiểu Cát (小吉)',
    rankJp: '小吉 (Shoukichi - Mầm Xanh)',
    shrineOrigin: 'Đền Kamigamo (Kyoto - Di sản thế giới UNESCO)',
    poemWaka: '鴨川の 清き流れに 身を清め 願ひぞかなふ 神のみたまに',
    poemTranslation: 'Dòng Kamo trong vắt gột rửa bụi trần, tâm thành gửi tới đấng linh thiêng.',
    overview: 'Mọi sự khởi đầu êm ả. Hãy giữ sự khiêm nhường và lắng nghe lời khuyên của tiền bối.',
    luckAspects: {
      love: 'Nụ cười duyên dáng của bạn sẽ là thỏi nam châm thu hút người khác phái.',
      studyWork: 'Hoàn thành tốt các mục tiêu nhỏ trong ngày, tích lũy kiến thức vững chắc.',
      health: 'Bổ sung thêm rau xanh và uống trà thảo mộc thải độc cơ thể.',
      travel: 'Dạo phố mua sắm hoặc ngồi quán cà phê đọc sách.',
    },
    luckyElements: {
      color: 'Xanh búp măng (Wakaba-iro)',
      item: 'Ví đựng thẻ xinh xắn bằng da',
      food: 'Salad rong biển tươi sốt mè rang',
      direction: 'Đông (Sinh sôi & Khởi đầu)',
    },
    deepExplanation: 'Tại đền Kamigamo, quẻ Tiểu Cát khuyên con người hành động giống như dòng sông Kamo: mềm mại, không ngừng chảy và len lỏi qua mọi rào cản.',
  },
  {
    id: 'omikuji_extra_4',
    rank: 'Cát (吉)',
    rankJp: '吉 (Kichi - Đắc Lợi)',
    shrineOrigin: 'Đền Kanda Myojin (Akihabara, Tokyo - Thần hộ mệnh IT & Kinh doanh)',
    poemWaka: '誠あれば 神の守りの 頼もしき まことの道に 迷ふことなし',
    poemTranslation: 'Lòng chân thành ắt thần linh che chở, bước trên đường ngay chẳng sợ lạc lối.',
    overview: 'Ý tưởng sáng tạo tuôn trào. Những dự án công nghệ, nghệ thuật hoặc học tiếng Nhật đạt kết quả vượt bậc.',
    luckAspects: {
      love: 'Cùng chung sở thích anime, manga hoặc âm nhạc giúp hai bạn ngày càng thấu hiểu.',
      studyWork: 'Giải quyết được vấn đề nan giải trong công việc/bài tập, được khen ngợi.',
      health: 'Thể lực ổn định, nên duy trì uống vitamin C mỗi ngày.',
      travel: 'Ghé thăm các trung tâm văn hóa sôi động như Akihabara, Shibuya.',
    },
    luckyElements: {
      color: 'Vàng kim loại (Kin-iro)',
      item: 'Bùa hộ mệnh Omamori hộ vệ công nghệ IT',
      food: 'Cơm cà ri Nhật Bản thơm nồng cay nhẹ',
      direction: 'Đông Nam (Tài vận & Công nghệ)',
    },
    deepExplanation: 'Đền Kanda Myojin nổi tiếng toàn cầu vì phát hành bùa Omamori hình vi mạch điện tử để bảo vệ dữ liệu số và tránh lỗi bug phần mềm.',
  },
  {
    id: 'omikuji_extra_5',
    rank: 'Mạt Cát (末吉)',
    rankJp: '末吉 (Suekichi - Chờ Đợi Thời Cơ)',
    shrineOrigin: 'Đền Kasuga Taisha (Nara - Rừng thiêng ngàn đèn lồng)',
    poemWaka: '春日野の 若草摘みて 袖ぬれぬ わが衣手は 露にほろほろ',
    poemTranslation: 'Hái lá cỏ non trên đồng Kasuga, sương mai ướt áo mong chờ ngày mai.',
    overview: 'Cần sự nhẫn nại. Tránh bốc đồng mua sắm hay vội vàng đưa ra quyết định hệ trọng khi tâm trạng chưa ổn định.',
    luckAspects: {
      love: 'Dành không gian riêng cho đối phương, không nên ghen tuông vô cớ.',
      studyWork: 'Tập trung rà soát lại kiến thức căn bản thay vì nhảy vào tài liệu quá khó.',
      health: 'Ngâm chân nước ấm trước khi ngủ giúp máu huyết lưu thông và ngủ sâu.',
      travel: 'Đi dạo ngắm thiên nhiên ở những nơi yên tĩnh không ồn ào.',
    },
    luckyElements: {
      color: 'Nâu hạt dẻ ấm áp (Kuri-iro)',
      item: 'Khăn len choàng cổ êm ái',
      food: 'Hạt dẻ nướng thơm lừng',
      direction: 'Chính Bắc (Bảo toàn nội lực)',
    },
    deepExplanation: 'Phong tục buộc quẻ: Nếu bốc phải quẻ chưa như ý, người Nhật sẽ buộc quẻ giấy bằng tay không thuận lên giàn dây thông (*Musubi-sho*) tại đền để lại xui xẻo và chỉ mang phúc lành về nhà.',
  },
];

// -------------------------------------------------------------
// 2. MÁY PHỐI NHẠC & KHÔNG GIAN ÂM THANH TOKYO LO-FI BGM
// -------------------------------------------------------------
export interface TokyoSoundscape {
  id: string;
  name: string;
  jpName: string;
  vibe: string;
  location: string;
  audioNotes: string;
  synthChords: number[];
  deepExplanation: string;
}

export const INITIAL_TOKYO_SOUNDSCAPES: TokyoSoundscape[] = [
  {
    id: 'sound_kyoto_rain',
    name: 'Mưa Chiều Phố Cổ Kyoto Machiya (雨の京都町屋)',
    jpName: '雨音と風鈴の古民家',
    vibe: 'Tiếng mưa rơi tí tách trên mái ngói sẫm màu, tiếng chuông gió Fuurin ngân nga thanh thoát',
    location: 'Quận Gion & Đền Kiyomizudera, Kyoto',
    audioNotes: 'Hợp âm ngũ cung Nhật Bản thanh bình (In-sen scale), tiếng giọt nước thánh thót',
    synthChords: [261.63, 293.66, 311.13, 392.0, 415.3],
    deepExplanation: 'Khái niệm "Kankyo Ongaku" (Âm nhạc môi trường) được khởi xướng bởi nhạc sĩ huyền thoại Hiroshi Yoshimura tại Nhật thập niên 1980, giúp tâm trí người nghe hòa vào nhịp điệu của đất trời.',
  },
  {
    id: 'sound_lawson_night',
    name: 'Konbini Lawson Lúc 2 Giờ Sáng (深夜のコンビニ)',
    jpName: '深夜2時のローソンと冷気',
    vibe: 'Tiếng chuông cửa Konbini leng keng đặc trưng, tiếng máy làm lạnh êm ru và sự tĩnh lặng của Tokyo về đêm',
    location: 'Ngã tư Roppongi, Minato, Tokyo',
    audioNotes: 'Tiếng ding-dong chào khách hai âm sắc (G4 - E4) quen thuộc trong ký ức của bất kỳ ai từng đến Nhật',
    synthChords: [392.0, 329.63, 523.25, 659.25],
    deepExplanation: 'Cửa hàng tiện lợi 24/7 (Konbini) được coi là "ốc đảo ánh sáng" của cư dân đô thị Nhật Bản, nơi xua tan nỗi cô đơn của những người tăng ca đêm muộn.',
  },
  {
    id: 'sound_yamanote_dusk',
    name: 'Hoàng Hôn Trên Tuyến Tàu Yamanote (夕暮れの山手線)',
    jpName: '夕暮れ山手線・発車メロディ',
    vibe: 'Giai điệu chuông tàu khởi hành êm ái (Hassha Melody), tiếng bánh sắt lăn đều qua cầu cạn ngắm hoàng hôn màu cam',
    location: 'Ga Shibuya sang Ga Ebisu, Tokyo',
    audioNotes: 'Giai điệu Hassha Melody của ga Ebisu (Nhạc phim The Third Man) êm đềm giải tỏa stress giờ tan tầm',
    synthChords: [349.23, 440.0, 523.25, 698.46],
    deepExplanation: 'Mỗi nhà ga trên tuyến Yamanote đều có một đoạn nhạc chuông khởi hành riêng dài 7 giây được nghiên cứu âm học âm tính để hành khách không bị giật mình hay xô đẩy.',
  },
  {
    id: 'sound_akiba_cafe',
    name: 'Quán Cà Phê Otaku Akihabara (秋葉原メイドカフェの喧騒)',
    jpName: '秋葉原・レトロゲームと萌え',
    vibe: 'Nhịp điệu Chiptune 8-bit lách cách vui tươi, tiếng trò chuyện rôm rả của các fan Anime và Idol',
    location: 'Phố điện tử Soto-Kanda, Akihabara, Tokyo',
    audioNotes: 'Sóng âm vuông kiểu máy chơi game Famicom cổ điển, nhịp 120 bpm kích thích dopamine sáng tạo',
    synthChords: [261.63, 329.63, 392.0, 523.25],
    deepExplanation: 'Âm hưởng 8-bit Chiptune sinh ra từ hạn chế phần cứng của Nintendo Famicom năm 1983, nay đã trở thành di sản nghệ thuật đại chúng trường tồn của văn hóa Otaku toàn cầu.',
  },
  {
    id: 'sound_onsen_mist',
    name: 'Suối Nước Nóng Núi Phú Sĩ Trong Sương (富士山麓の秘湯露天風呂)',
    jpName: '富士の湯けむりと竹林の雫',
    vibe: 'Tiếng nước nóng róc rách chảy qua máng tre Hinoki, tiếng gió lùa qua rặng tre xanh mát lành',
    location: 'Hồ Kawaguchiko, Yamanashi',
    audioNotes: 'Âm thanh trắng của dòng nước khoáng nóng (White noise) hạ cortisol căng thẳng thần kinh ngay lập tức',
    synthChords: [220.0, 277.18, 329.63, 440.0],
    deepExplanation: 'Nghi thức tắm Onsen ngoài trời (Rotenburo) là đỉnh cao của liệu pháp Toji (chữa lành bằng suối khoáng) được người Nhật duy trì hơn 1300 năm qua.',
  },
];

export const EXTRA_TOKYO_SOUNDSCAPES: TokyoSoundscape[] = [
  {
    id: 'sound_shinjuku_jazz',
    name: 'Quán Bar Jazz Hẻm Nhỏ Shinjuku (新宿ゴールデン街ジャズ)',
    jpName: 'ゴールデン街のレコードと雨',
    vibe: 'Tiếng đĩa than rè ấm cúng, tiếng đá viên chạm vào ly rượu whisky và tiếng kèn saxophone da diết',
    location: 'Hẻm Golden Gai, Shinjuku, Tokyo',
    audioNotes: 'Hợp âm Jazz Minor 7th trầm ấm, không gian hoài niệm thời kỳ Showa lãng mạn',
    synthChords: [293.66, 349.23, 440.0, 523.25],
    deepExplanation: 'Golden Gai là mê cung của hơn 200 quán bar tí hon chỉ vỏn vẹn 4-6 chỗ ngồi, nơi lưu giữ tinh hoa đời sống văn nghệ sĩ Tokyo từ thập niên 1960.',
  },
  {
    id: 'sound_hanabi_festival',
    name: 'Đêm Lễ Hội Pháo Hoa Ven Sông Sumida (隅田川花火大会の夜)',
    jpName: '隅田川の太鼓と屋台の賑わい',
    vibe: 'Tiếng trống Taiko rộn rã, tiếng pháo hoa nổ vang trời và tiếng reo hò "Tamaya! Kagiya!" của thiếu nữ mặc Yukata',
    location: 'Bờ sông Sumida gần Asakusa, Tokyo',
    audioNotes: 'Tiếng trầm hùng tráng của trống Taiko kết hợp tiếng reo hò lễ hội Matsuri',
    synthChords: [196.0, 261.63, 392.0, 523.25],
    deepExplanation: 'Lễ hội pháo hoa Sumida khởi nguồn từ năm 1733 dưới thời Tướng quân Tokugawa Yoshimune để cầu nguyện giải trừ dịch bệnh và tưởng nhớ người đã khuất.',
  },
  {
    id: 'sound_kamakura_waves',
    name: 'Bờ Biển Gió Lộng Kamakura (鎌倉・江ノ電と波の音)',
    jpName: '江ノ電踏切と湘南の潮風',
    vibe: 'Tiếng chuông chắn tàu điện Enoden leng keng ở ngã tư Slam Dunk, tiếng sóng biển Shonan rì rào',
    location: 'Ga Kamakurakoko-mae, Kanagawa',
    audioNotes: 'Âm thanh chuông báo tàu chạy hoài niệm thanh xuân tuổi trẻ học đường Nhật Bản',
    synthChords: [329.63, 392.0, 493.88, 587.33],
    deepExplanation: 'Tuyến tàu điện bánh xích Enoden cổ kính chạy dọc bờ biển Shonan đã đi vào hàng trăm bộ anime bất hủ như Slam Dunk, Ping Pong, Elfen Lied.',
  },
  {
    id: 'sound_meiji_forest',
    name: 'Rừng Cây Cổ Thụ Đền Meiji Jingu (明治神宮・朝霧の杜)',
    jpName: '明治神宮・朝の玉砂利と鳥の声',
    vibe: 'Tiếng bước chân giẫm trên sỏi trắng Tamajyari thanh sạch, tiếng chim hót véo von trong rừng nguyên sinh 100 năm tuổi',
    location: 'Khu rừng nhân tạo 70 hecta, Harajuku, Tokyo',
    audioNotes: 'Âm thanh của đá sỏi cọ xát (Crushed gravel) thanh lọc tạp niệm trong tâm trí',
    synthChords: [261.63, 329.63, 392.0, 440.0],
    deepExplanation: 'Tiếng bước đi trên đá sỏi Tamajyari trong Thần đạo có tác dụng thanh tẩy tà khí (*Misogi*) trước khi người hành hương bước vào chánh điện.',
  },
  {
    id: 'sound_ueno_sakura',
    name: 'Mưa Cánh Hoa Anh Đào Công Viên Ueno (上野恩賜公園・桜吹雪)',
    jpName: '上野恩賜公園・舞い散る桜と春風',
    vibe: 'Tiếng gió xuân thoảng qua lay động muôn ngàn cánh hoa Sakura rơi rụng như mưa tuyết hồng (Sakurafubuki)',
    location: 'Công viên Ueno, Taito, Tokyo',
    audioNotes: 'Âm hưởng thanh tao trong vắt như tiếng đàn Koto 13 dây truyền thống',
    synthChords: [293.66, 369.99, 440.0, 554.37],
    deepExplanation: 'Khái niệm "Mono no Aware" (物の哀れ) - sự xao xuyến trước vẻ đẹp phù du chóng tàn của hoa anh đào là linh hồn cốt lõi của mỹ học Nhật Bản.',
  },
];

// -------------------------------------------------------------
// 3. MÁY ĐO TỈ LỆ TƯƠNG THÍCH NHÓM MÁU BẢN XỨ (KETSUEKIGATA - 血液型)
// -------------------------------------------------------------
export interface BloodTypeMatch {
  id: string;
  myType: 'A' | 'B' | 'O' | 'AB';
  partnerType: 'A' | 'B' | 'O' | 'AB';
  compatibilityRate: number; // 0 - 100%
  chemistryTitle: string;
  jpTitle: string;
  strengths: string;
  potentialConflicts: string;
  datingSecretTip: string;
  deepExplanation: string;
}

export const INITIAL_BLOOD_MATCHES: BloodTypeMatch[] = [
  {
    id: 'blood_a_o',
    myType: 'A',
    partnerType: 'O',
    compatibilityRate: 95,
    chemistryTitle: 'Cặp Đôi Trời Sinh: Tỉ Mỉ Chu Đáo & Bao Dung Hào Sảng',
    jpTitle: 'A型×O型：最強のベストカップル',
    strengths: 'Người nhóm máu A cẩn thận, biết lo toan được che chở bởi sự rộng lượng, quyết đoán và tràn đầy năng lượng của người nhóm máu O.',
    potentialConflicts: 'Nhóm A có thể thấy nhóm O đôi khi hơi vô tâm xuề xòa; trong khi nhóm O có thể cảm thấy nhóm A suy nghĩ quá nhiều chuyện vặt.',
    datingSecretTip: 'Nhóm A hãy thẳng thắn chia sẻ thay vì giận dỗi im lặng; nhóm O hãy chú ý lắng nghe và khen ngợi sự chu đáo của nhóm A.',
    deepExplanation: 'Tại Nhật Bản, thống kê cho thấy cặp A-O có tỉ lệ kết hôn cao nhất và bền vững nhất vì bù trừ hoàn hảo cho nhau về mặt khí chất và tâm lý.',
  },
  {
    id: 'blood_a_a',
    myType: 'A',
    partnerType: 'A',
    compatibilityRate: 80,
    chemistryTitle: 'Đôi Bạn Tri Kỷ: Thấu Hiểu Kín Đáo & Tôn Trọng Tuyệt Đối',
    jpTitle: 'A型×A型：以心伝心の安定ペア',
    strengths: 'Cả hai đều lịch sự, biết nghĩ cho đối phương (Omoiyari), không bao giờ làm phiền (Meiwaku) và rất trân trọng sự bình yên.',
    potentialConflicts: 'Vì cả hai đều ngại xung đột nên thường giấu cảm xúc thật (Honne), dẫn đến tích tụ căng thẳng ngầm kéo dài.',
    datingSecretTip: 'Hãy đặt ra quy tắc "nói thẳng cảm xúc một cách nhẹ nhàng" vào mỗi tối chủ nhật để giải tỏa mọi ức chế.',
    deepExplanation: 'Chiếm gần 40% dân số Nhật, nhóm máu A là hình mẫu chuẩn mực của sự kỷ luật, đúng giờ và trách nhiệm xã hội cao.',
  },
  {
    id: 'blood_b_o',
    myType: 'B',
    partnerType: 'O',
    compatibilityRate: 90,
    chemistryTitle: 'Cuộc Phiêu Lưu Bất Tận: Tự Do Sáng Tạo & Ủng Hộ Hết Mình',
    jpTitle: 'B型×O型：自由と包容力の相愛関係',
    strengths: 'Nhóm B đầy ắp ý tưởng đột phá và sống theo cảm xúc cá nhân (*My-pace*), được nhóm O vững chãi làm bệ phóng và chỗ dựa an toàn.',
    potentialConflicts: 'Nhóm B đôi khi thay đổi kế hoạch phút chót khiến nhóm O cảm thấy không được tôn trọng công sức chuẩn bị.',
    datingSecretTip: 'Nhóm O hãy để cho nhóm B không gian tự do làm điều họ thích; nhóm B hãy nhớ cảm ơn sự kiên nhẫn của nhóm O.',
    deepExplanation: 'Nhóm B tại Nhật thường bị coi là "ngựa bất kham" tự do, nhưng khi gặp nhóm O đại lượng thì tài năng và sự đáng yêu của họ phát huy tối đa.',
  },
  {
    id: 'blood_ab_a',
    myType: 'AB',
    partnerType: 'A',
    compatibilityRate: 75,
    chemistryTitle: 'Sự Thu Hút Bí Ẩn: Trí Tuệ Sắc Sảo & Nền Tảng Vững Chắc',
    jpTitle: 'AB型×A型：知的な憧れと信頼',
    strengths: 'Nhóm A ngưỡng mộ tư duy logic và nét bí ẩn khác biệt của nhóm AB; nhóm AB tôn trọng sự chân thành và đáng tin cậy của nhóm A.',
    potentialConflicts: 'Nhóm AB có tính cách hai mặt (lúc nồng nhiệt lúc lạnh lùng) khiến nhóm A hay bất an và hoang mang lo lắng.',
    datingSecretTip: 'Nhóm AB hãy báo trước khi cần "thời gian ở một mình để nạp pin", nhóm A sẽ rất vui vẻ tôn trọng khoảng lặng đó.',
    deepExplanation: 'Nhóm AB chỉ chiếm khoảng 10% dân số Nhật Bản, được xem là nhóm máu của các thiên tài nghệ thuật hoặc những nhà chiến lược tư duy khác biệt.',
  },
  {
    id: 'blood_b_b',
    myType: 'B',
    partnerType: 'B',
    compatibilityRate: 65,
    chemistryTitle: 'Hai Ngọn Lửa Bùng Cháy: Hết Mình Cuồng Nhiệt & Dễ Va Chạm',
    jpTitle: 'B型×B型：趣味一致の刺激的ペア',
    strengths: 'Khi có cùng sở thích (Otaku, âm nhạc, du lịch bụi), cả hai có thể thức trắng đêm nói chuyện không biết chán.',
    potentialConflicts: 'Cả hai đều cứng đầu và coi trọng cái tôi cá nhân, khi cãi nhau khó ai chịu xuống nước trước.',
    datingSecretTip: 'Hãy biến các cuộc tranh cãi thành trò chơi cá cược vui vẻ thay vì phân định thắng thua gay gắt.',
    deepExplanation: 'Văn hóa Nhật gọi nhóm B là "My Pace" (マイペース - sống theo nhịp riêng), do đó hai người nhóm B cần phải học cách nhường nhau cầm lái.',
  },
];

export const EXTRA_BLOOD_MATCHES: BloodTypeMatch[] = [
  {
    id: 'blood_o_o',
    myType: 'O',
    partnerType: 'O',
    compatibilityRate: 85,
    chemistryTitle: 'Đôi Bạn Đồng Hành: Lạc Quan Quyết Liệt & Chung Chí Hướng',
    jpTitle: 'O型×O型：情熱と野心のタッグ',
    strengths: 'Cả hai đều cởi mở, thẳng thắn, hào phóng và có máu lãnh đạo. Khi cùng chung mục tiêu xây dựng tương lai sẽ tiến rất nhanh.',
    potentialConflicts: 'Cạnh tranh ngầm ai là người nắm quyền quyết định trong gia đình hoặc các cuộc hẹn.',
    datingSecretTip: 'Phân chia rõ ràng: Một người quyết định ẩm thực và giải trí, người kia quyết định tài chính và lộ trình di chuyển.',
    deepExplanation: 'Nhóm O được ví như các chiến binh Samurai hào sảng thời xưa, luôn bảo vệ người thân và bạn bè đến cùng.',
  },
  {
    id: 'blood_ab_b',
    myType: 'AB',
    partnerType: 'B',
    compatibilityRate: 88,
    chemistryTitle: 'Cặp Đôi Lập Dị Đáng Yêu: Không Ràng Buộc & Hòa Hợp Bất Ngờ',
    jpTitle: 'AB型×B型：息の合うユニークコンビ',
    strengths: 'Cả hai đều không câu nệ định kiến xã hội, tôn trọng sự độc lập của nhau và có khiếu hài hước tinh tế.',
    potentialConflicts: 'Ít khi bộc lộ sự lãng mạn sến súa, người ngoài nhìn vào có thể tưởng là bạn bè hơn người yêu.',
    datingSecretTip: 'Thường xuyên tạo ra những bất ngờ nho nhỏ hoặc cùng nhau thử một hoạt động mới lạ chưa từng làm.',
    deepExplanation: 'Trong các cuộc khảo sát tại Nhật, cặp B và AB thường là những cặp đôi nghệ sĩ hoặc sáng tạo nội dung có cuộc sống hôn nhân vô cùng thoải mái.',
  },
  {
    id: 'blood_ab_o',
    myType: 'AB',
    partnerType: 'O',
    compatibilityRate: 70,
    chemistryTitle: 'Lực Hút Trái Dấu: Hiện Thực Quyết Đoán & Mộng Mơ Triết Lý',
    jpTitle: 'AB型×O型：正反対だからこそ惹かれ合う',
    strengths: 'Nhóm O thực tế và mạnh mẽ kéo nhóm AB trở về mặt đất; nhóm AB mang đến góc nhìn sâu sắc mới lạ cho nhóm O.',
    potentialConflicts: 'Nhóm O nghĩ gì nói nấy quá bộc trực có thể vô tình làm tổn thương tâm hồn nhạy cảm của nhóm AB.',
    datingSecretTip: 'Nhóm O hãy dùng lời nói nhẹ nhàng mềm mỏng hơn; nhóm AB hãy trân trọng sự bảo bọc chân thành của nhóm O.',
    deepExplanation: 'Đây là mối quan hệ đối lập điển hình trong nhân tướng học Nhật Bản: Lửa và Nước, nhưng nếu vượt qua giai đoạn đầu sẽ rất bền chặt.',
  },
  {
    id: 'blood_a_b',
    myType: 'A',
    partnerType: 'B',
    compatibilityRate: 55,
    chemistryTitle: 'Thử Thách Kiên Nhẫn: Quy Tắc Chuẩn Mực & Phá Cách Tự Do',
    jpTitle: 'A型×B型：すれ違いを乗り越える愛',
    strengths: 'Nhóm B mang lại luồng gió mới thú vị cho cuộc sống vốn quá khuôn mẫu của nhóm A; nhóm A giúp nhóm B tránh được nhiều rủi ro.',
    potentialConflicts: 'Nhóm A hay lo xa và cần đúng giờ; nhóm B tùy hứng và ghét bị kiểm soát gò bó.',
    datingSecretTip: 'Nhóm A hãy thả lỏng và học cách tận hưởng bất ngờ; nhóm B hãy cố gắng đúng hẹn để nhóm A yên tâm.',
    deepExplanation: 'Đây là đề tài muôn thuở của các bộ phim tình cảm học đường Nhật Bản (Shoujo Manga): Cô nàng học sinh gương mẫu (A) và chàng trai cá tính nổi loạn (B).',
  },
  {
    id: 'blood_ab_ab',
    myType: 'AB',
    partnerType: 'AB',
    compatibilityRate: 78,
    chemistryTitle: 'Thế Giới Song Song: Thần Giao Cách Cảm & Độc Lập Cao Độ',
    jpTitle: 'AB型×AB型：超感覚のミステリアスな絆',
    strengths: 'Chỉ cần một ánh mắt là hiểu đối phương nghĩ gì, không bao giờ can thiệp thô bạo vào đời tư của nhau.',
    potentialConflicts: 'Khoảng cách quá xa khiến tình cảm dễ rơi vào trạng thái nguội lạnh nếu không chủ động hâm nóng.',
    datingSecretTip: 'Duy trì những chuyến đi du lịch xa hàng năm để cùng nhau làm mới cảm xúc.',
    deepExplanation: 'Chiếm chưa tới 1% tổng số cặp đôi tại Nhật, cặp AB-AB được xem là hiện tượng hiếm hoi của sự tương đồng về chỉ số IQ và tư duy nghệ thuật.',
  },
];

// -------------------------------------------------------------
// 4. MÁY TẠO NGHỆ DANH / BIỆT DANH TIẾNG NHẬT GENZ SIÊU CUTE
// -------------------------------------------------------------
export interface JapaneseNickname {
  id: string;
  category: 'Shoujo Búp Bê' | 'Idol J-Pop' | 'Gyaru Cá Tính' | 'Anime Tiên Tử' | 'Tokyo Minimalist';
  kanjiName: string;
  furigana: string;
  romaji: string;
  cuteSuffixes: string[];
  meaning: string;
  bestFitAesthetic: string;
  deepExplanation: string;
}

export const INITIAL_NICKNAMES: JapaneseNickname[] = [
  {
    id: 'nick_1',
    category: 'Shoujo Búp Bê',
    kanjiName: '白雪 心愛',
    furigana: 'しらゆき ここあ',
    romaji: 'Shirayuki Kokoa',
    cuteSuffixes: ['Kokoa-chan', 'Ko-pyon', 'Koko-rin'],
    meaning: 'Bông tuyết trắng ngần mang trái tim ấm áp ngọt ngào như ly cacao mùa đông.',
    bestFitAesthetic: 'Váy babydoll cổ sen, nơ ruy băng lụa, layout bọng mắt ngọc trai.',
    deepExplanation: 'Tên "Kokoa" (心愛 - Tâm Ái) là tên nữ sinh luôn nằm trong Top 3 bảng xếp hạng tên đẹp nhất thế kỷ 21 do các bậc phụ huynh Nhật bình chọn.',
  },
  {
    id: 'nick_2',
    category: 'Idol J-Pop',
    kanjiName: '星野 夢花',
    furigana: 'ほしの ゆめか',
    romaji: 'Hoshino Yumeka',
    cuteSuffixes: ['Yumeka-rin', 'Yume-chi', 'Yume-tan'],
    meaning: 'Cánh hoa mộng ước tỏa sáng lung linh giữa bầu trời ngàn sao.',
    bestFitAesthetic: 'Phong cách Oshi-katsu, kẹp tóc nơ đôi, má hồng baby pink rực rỡ.',
    deepExplanation: 'Họ "Hoshino" (Cánh đồng sao) gắn liền với hình tượng thần tượng hoàn hảo trong siêu phẩm Oshi no Ko (Hoshino Ai).',
  },
  {
    id: 'nick_3',
    category: 'Gyaru Cá Tính',
    kanjiName: '美羽 玲奈',
    furigana: 'みう れいな',
    romaji: 'Miu Reina',
    cuteSuffixes: ['Miu-chi', 'Reina-sama', 'Miutan'],
    meaning: 'Đôi cánh thiên thần kiêu kỳ và tiếng chuông pha lê trong vắt ngân vang.',
    bestFitAesthetic: 'Áo khoác bóng chày oversized, mi cụm Taba-kan, giày boots đế cao cổ điển.',
    deepExplanation: 'Chữ "Rei" (玲) biểu thị tiếng va chạm thanh thoát của ngọc quý, thể hiện khí chất tự tin bản lĩnh của các cô gái Shibuya.',
  },
  {
    id: 'nick_4',
    category: 'Anime Tiên Tử',
    kanjiName: '月詠 瑠璃',
    furigana: 'つくよみ るり',
    romaji: 'Tsukuyomi Ruri',
    cuteSuffixes: ['Ruri-chan', 'Tsuku-pyon', 'Rurin'],
    meaning: 'Khúc ngâm dưới ánh trăng huyền ảo và viên ngọc lưu ly xanh biếc sâu thẳm.',
    bestFitAesthetic: 'Tenshi Kaiwai (Thiên sứ màu lam), áo hoodie trắng tuyết đính cánh thiên thần.',
    deepExplanation: 'Tsukuyomi là vị thần cai quản Mặt trăng và màn đêm trong thần thoại Shinto, mang vẻ đẹp ma mị và thoát tục.',
  },
  {
    id: 'nick_5',
    category: 'Tokyo Minimalist',
    kanjiName: '葵 紬',
    furigana: 'あおい つむぎ',
    romaji: 'Aoi Tsumugi',
    cuteSuffixes: ['Tsumu-chan', 'Aoi-san', 'Tsumugi-rin'],
    meaning: 'Cành hoa cẩm quỳ hướng dương dệt nên dải lụa tơ tằm thanh tao mộc mạc.',
    bestFitAesthetic: 'Áo len dệt kim mỏng, tóc uốn đuôi nhẹ tự nhiên, lớp nền da mộc Suhada-kan.',
    deepExplanation: '"Tsumugi" là kỹ thuật dệt lụa thủ công truyền thống quý giá của Nhật Bản, tượng trưng cho tính cách tinh tế và nội tâm sâu sắc.',
  },
];

export const EXTRA_NICKNAMES: JapaneseNickname[] = [
  {
    id: 'nick_extra_1',
    category: 'Shoujo Búp Bê',
    kanjiName: '花音 莉子',
    furigana: 'かのん りこ',
    romaji: 'Kanon Riko',
    cuteSuffixes: ['Kanon-pyon', 'Non-chan', 'Riko-rin'],
    meaning: 'Giai điệu du dương ngân vang từ bông hoa nhài trắng tinh khôi.',
    bestFitAesthetic: 'Váy xòe hoa nhí phong cách Mei Mei TikTok, giày Mary Jane đế thấp.',
    deepExplanation: '"Kanon" (Canon) vừa là thể loại nhạc giao hưởng chuyển tiếp du dương, vừa ghép từ chữ Hoa (花) và Âm (音) tuyệt đẹp.',
  },
  {
    id: 'nick_extra_2',
    category: 'Idol J-Pop',
    kanjiName: '桜井 萌愛',
    furigana: 'さくらい もあ',
    romaji: 'Sakurai Moa',
    cuteSuffixes: ['Moa-chan', 'Moatan', 'Saku-pyon'],
    meaning: 'Dòng suối hoa anh đào ươm mầm tình yêu trong sáng thuần khiết.',
    bestFitAesthetic: 'Váy xếp ly tennis hồng pastel, kính áp tròng to tròn long lanh.',
    deepExplanation: 'Chữ "Moe" (萌) trong văn hóa Otaku là biểu tượng của sự rung động trước những điều quá đỗi đáng yêu.',
  },
  {
    id: 'nick_extra_3',
    category: 'Gyaru Cá Tính',
    kanjiName: '琥珀 乃亜',
    furigana: 'こはく のあ',
    romaji: 'Kohaku Noa',
    cuteSuffixes: ['Noa-chi', 'Kohaku-san', 'Non-non'],
    meaning: 'Viên hổ phách vàng óng ánh ấm áp và cánh buồm bình yên vượt sóng gió.',
    bestFitAesthetic: 'Vòng cổ choker đinh tán, áo croptop đen ôm sát và son nude bóng.',
    deepExplanation: 'Hổ phách (Kohaku) hóa thạch từ nhựa cây ngàn năm, tượng trưng cho vẻ đẹp bất diệt không bao giờ bị phai mờ bởi thời gian.',
  },
  {
    id: 'nick_extra_4',
    category: 'Anime Tiên Tử',
    kanjiName: '夜桜 冥',
    furigana: 'よざくら めい',
    romaji: 'Yozakura Mei',
    cuteSuffixes: ['Mei-chan', 'Yozakura-sama', 'Meirin'],
    meaning: 'Hoa anh đào nở rộ trong đêm trăng tĩnh mịch huyền ảo và sâu lắng.',
    bestFitAesthetic: 'Phong cách Jirai Kei u tối, áo đen viền ren hồng, dây chuyền thánh giá.',
    deepExplanation: 'Yozakura (夜桜) là thú vui ngắm hoa anh đào nở ban đêm dưới ánh đèn lồng, mang vẻ đẹp ma mị khác hẳn ban ngày.',
  },
  {
    id: 'nick_extra_5',
    category: 'Tokyo Minimalist',
    kanjiName: '栞 凛',
    furigana: 'しおり りん',
    romaji: 'Shiori Rin',
    cuteSuffixes: ['Shio-chan', 'Rin-san', 'Shiorin'],
    meaning: 'Chiếc thẻ đánh dấu trang sách tri thức và khí chất thanh cao kiên định.',
    bestFitAesthetic: 'Áo sơ mi lụa trắng trơn, chân váy bút chì xẻ tà, mắt kính gọng kim loại thanh mảnh.',
    deepExplanation: '"Rin" (凛) là từ miêu tả khí chất đoan trang, đĩnh đạc và đáng kính nể của người phụ nữ hiện đại xứ sở mặt trời mọc.',
  },
];

// -------------------------------------------------------------
// 5. TRỢ LÝ GIẢI MÃ THỰC ĐƠN IZAKAYA & PHÁP THỰC BẢN XỨ
// -------------------------------------------------------------
export interface IzakayaMenuItem {
  id: string;
  category: 'Xiên Nướng (Yakitori)' | 'Món Khai Vị Bắt Buộc (Otoshi)' | 'Đồ Uống (Drink)' | 'Món Chắc Bụng (Shime)';
  name: string;
  jpName: string;
  romaji: string;
  orderingPhrase: string;
  tasteProfile: string;
  insiderSecret: string;
  deepExplanation: string;
}

export const INITIAL_IZAKAYA_MENU: IzakayaMenuItem[] = [
  {
    id: 'iza_1',
    category: 'Món Khai Vị Bắt Buộc (Otoshi)',
    name: 'Phí Khai Vị Otoshi / Tsuki-dashi (お通し)',
    jpName: 'お通し（突き出し）',
    romaji: 'Otoshi / Tsukidashi',
    orderingPhrase: 'Được dọn ra tự động ngay khi bạn ngồi vào bàn (Không cần gọi món)',
    tasteProfile: 'Đậu nành luộc Edamame ướp muối biển, salad bắp cải giòn rưới dầu mè hoặc củ cải hầm thịt băm.',
    insiderSecret: 'Đây là nét văn hóa đặc thù tương đương với phí phục vụ/phí giữ bàn (khoảng 300 - 500 Yên/người). Đừng từ chối vì đó là lời chào mừng của chủ quán!',
    deepExplanation: 'Từ thời kỳ Edo, khi khách vừa ngồi xuống, đầu bếp lập tức dọn một đĩa nhỏ để khách nhắm nháp trong lúc chờ các món nướng than hoa mất 15-20 phút chế biến.',
  },
  {
    id: 'iza_2',
    category: 'Xiên Nướng (Yakitori)',
    name: 'Xiên Đùi Gà Hành Ba-rô (Negima - ねぎま)',
    jpName: 'ねぎま（鶏ももと白ネギ）',
    romaji: 'Negima (Tare / Shio)',
    orderingPhrase: 'ねぎまをタレで2本、塩で2本お願いします。(Cho tôi 2 xiên Negima sốt tare và 2 xiên vị muối)',
    tasteProfile: 'Thịt đùi gà mọng nước xen kẽ ngọn hành tây trắng ngọt lịm xém cạnh than hoa Binchotan.',
    insiderSecret: 'Quy tắc vàng: Nếu thích vị thanh ngọt tự nhiên của gà hãy chọn muối (Shio), nếu muốn ăn đậm đà uống bia hãy chọn sốt tương ngọt (Tare).',
    deepExplanation: 'Hành ba-rô Nhật nướng trên than hoa tạo ra vị ngọt Umami tự nhiên nhờ caramel hóa đường thực vật, át đi hoàn toàn vị ngấy của mỡ gà.',
  },
  {
    id: 'iza_3',
    category: 'Đồ Uống (Drink)',
    name: 'Bia Tươi Cực Lạnh Rót Tràn Bọt (Nama-biiru - 生ビール)',
    jpName: '生ビール（とりあえず生！）',
    romaji: 'Nama Biiru (Toriaezu Nama!)',
    orderingPhrase: 'とりあえず生で！ (Toriaezu nama de! - Trước mắt cứ cho một cốc bia tươi đã nhé!)',
    tasteProfile: 'Lớp bọt mịn màng như kem dày chuẩn tỷ lệ vàng 7:3 (7 phần bia, 3 phần bọt tuyết).',
    insiderSecret: '"Toriaezu Nama" là câu cửa miệng bất hủ của 99% người Nhật khi vừa bước vào quán để mọi người cùng cụng ly Kanpai trước khi gọi món ăn.',
    deepExplanation: 'Tại Nhật, ly bia luôn được ướp đông trong tủ đá trước khi rót để giữ nhiệt độ bia ở mức 4°C hoàn hảo suốt bữa nhậu.',
  },
  {
    id: 'iza_4',
    category: 'Đồ Uống (Drink)',
    name: 'Kaku Highball Chanh Tươi (角ハイボール)',
    jpName: 'サントリー角ハイボール',
    romaji: 'Kaku Haibo-ru',
    orderingPhrase: '角ハイボール、氷少なめでお願いします。(Kaku Highball ít đá giùm tôi)',
    tasteProfile: 'Whisky Suntory Kakubin pha cùng soda có ga sủi bọt mạnh và một lát chanh vàng tươi mát.',
    insiderSecret: 'Highball không chứa đường và lượng calo cực thấp, là thức uống giảm ngấy số 1 khi ăn đồ chiên rán Karaage.',
    deepExplanation: 'Chiến dịch phục hưng Highball của tập đoàn Suntory năm 2008 đã biến món đồ uống truyền thống này thành cơn sốt toàn quốc của giới trẻ Nhật.',
  },
  {
    id: 'iza_5',
    category: 'Món Chắc Bụng (Shime)',
    name: 'Cơm Chan Nước Trà Xanh Dashi (Ochazuke - お茶漬け)',
    jpName: '締めのお茶漬け（鮭・梅）',
    romaji: 'Shime no Ochazuke',
    orderingPhrase: '締めに鮭茶漬けを1つください。(Cho tôi 1 tô cơm chan trà cá hồi để chốt bữa)',
    tasteProfile: 'Cơm trắng rắc rong biển nori, vụn cá hồi nướng hoặc mơ ngâm Umeboshi, chan nước dùng dashi nóng hổi.',
    insiderSecret: 'Khái niệm "Shime" (締め) là món ăn ấm bụng cuối cùng sau chầu nhậu để xua tan hơi men trước khi đón chuyến tàu điện cuối (Shuuden).',
    deepExplanation: 'Vị chua của mơ muối và nước trà xanh nóng giúp kích thích gan chuyển hóa cồn nhanh chóng, ngăn ngừa cảm giác nôn nao đau đầu vào sáng hôm sau.',
  },
];

export const EXTRA_IZAKAYA_MENU: IzakayaMenuItem[] = [
  {
    id: 'iza_extra_1',
    category: 'Xiên Nướng (Yakitori)',
    name: 'Xiên Thịt Viên Gà Chấm Lòng Đỏ Trứng (Tsukune - つくね)',
    jpName: '月見つくね（生卵黄添え）',
    romaji: 'Tsukimi Tsukune',
    orderingPhrase: '月見つくねをお願いします。(Cho tôi một đĩa Tsukune kèm lòng đỏ trứng gà)',
    tasteProfile: 'Thịt gà băm sụn giòn sần sật nướng sốt ngọt, chấm ngập trong lòng đỏ trứng gà tươi béo ngậy.',
    insiderSecret: 'Trứng gà tại Nhật đạt tiêu chuẩn ăn sống nghiêm ngặt, vị béo của lòng đỏ hòa cùng sốt nướng tạo nên cảm giác bùng nổ vị giác.',
    deepExplanation: 'Món này được gọi là "Tsukimi" (Ngắm trăng) vì lòng đỏ trứng tròn xoe vàng rực như mặt trăng rằm tháng Tám.',
  },
  {
    id: 'iza_extra_2',
    category: 'Xiên Nướng (Yakitori)',
    name: 'Xiên Da Gà Giòn Tan Rụm (Torikawa - 鶏皮)',
    jpName: '博多風・鶏皮巻き焼き',
    romaji: 'Torikawa Shio',
    orderingPhrase: '皮を塩でカリカリに焼いてください。(Cho tôi xiên da gà nướng muối thật giòn nhé)',
    tasteProfile: 'Lớp mỡ thừa được ép hết trong quá trình nướng, chỉ còn lại lớp da giòn rụm đậm đà gia vị muối tiêu.',
    insiderSecret: 'Đặc sản trứ danh của vùng Hakata (Fukuoka), nơi da gà được cuộn tròn quanh xiên và nướng lặp lại qua 6 ngày để đạt độ giòn vô địch.',
    deepExplanation: 'Rất giàu collagen tự nhiên tốt cho da, là món nhắm được cả phái nữ lẫn nam giới Nhật Bản cực kỳ yêu thích.',
  },
  {
    id: 'iza_extra_3',
    category: 'Đồ Uống (Drink)',
    name: 'Chanh Tươi Ép Tại Bàn (Nama Lemon Sour - 生絞りレモンサワー)',
    jpName: '生搾りレモンサワー',
    romaji: 'Nama Shibori Remon Sawa-',
    orderingPhrase: '生搾りレモンサワーを1つ！ (Cho tôi một ly Lemon Sour ép tay!)',
    tasteProfile: 'Quán sẽ mang ra nửa quả chanh tươi và dụng cụ vắt để bạn tự tay ép nước cốt chanh vào ly rượu Shochu có ga.',
    insiderSecret: 'Vắt chanh úp mặt vỏ xuống dưới để tinh dầu thơm nức từ vỏ chanh hòa quyện trực tiếp vào ly rượu.',
    deepExplanation: 'Lemon Sour là món đồ uống bùng nổ nhất mạng xã hội Nhật Bản những năm gần đây với hàng trăm quán bar chuyên biệt Lemon Sour ra đời tại Tokyo.',
  },
  {
    id: 'iza_extra_4',
    category: 'Món Khai Vị Bắt Buộc (Otoshi)',
    name: 'Mầm Đậu Nành Luộc Ướp Muối Biển (Edamame - 枝豆)',
    jpName: '茹でたて枝豆・伯方の塩',
    romaji: 'Yudetate Edamame',
    orderingPhrase: '枝豆を追加でお願いします。(Cho tôi thêm một đĩa Edamame nữa)',
    tasteProfile: 'Hạt đậu béo bùi, ngọt thanh, vỏ ngoài bám lớp muối biển giòn tan.',
    insiderSecret: 'Edamame chứa methionine và vitamin B1 giúp hỗ trợ gan phân giải chất cồn hiệu quả nhất trong tự nhiên.',
    deepExplanation: 'Người Nhật có thói quen bóp nhẹ vỏ đậu để hạt đậu bắn thẳng vào miệng, tạo nên âm thanh vui tai tại các bàn nhậu rôm rả.',
  },
  {
    id: 'iza_extra_5',
    category: 'Món Chắc Bụng (Shime)',
    name: 'Mì Ramen Xương Heo Đậm Đà (Shime no Tonkotsu Ramen - 締めラーメン)',
    jpName: '飲んだ後の締め豚骨ラーメン',
    romaji: 'Shime no Ra-men',
    orderingPhrase: 'ラーメン屋に寄って帰ろう！ (Tạt qua quán ramen làm tô rồi hẵng về nào!)',
    tasteProfile: 'Nước dùng xương heo hầm béo ngậy, sợi mì mỏng dai sần sật rắc hành lá thơm phức.',
    insiderSecret: 'Sau khi uống rượu, cơ thể mất nước và tụt đường huyết, kích thích não bộ thèm tinh bột và muối mặn tột cùng.',
    deepExplanation: 'Văn hóa "Shime Ramen" tại các khu phố đêm Shinjuku, Roppongi là nét kết thúc kinh điển của mọi buổi giao lưu kết nối doanh nghiệp Nhật.',
  },
];

// -------------------------------------------------------------
// 6. BẢNG XẾP HẠNG & GIẢI MÃ MEME / NET SLANG TIKTOK NHẬT
// -------------------------------------------------------------
export interface GenZBuzzword {
  id: string;
  term: string;
  reading: string;
  romaji: string;
  category: 'TikTok Trend' | 'Tâm Lý Hẹn Hò' | 'Văn Hóa Oshi' | 'Meme Hài Hước';
  literalMeaning: string;
  slangMeaning: string;
  exampleDialogue: {
    lineA: string;
    lineB: string;
    translation: string;
  };
  deepExplanation: string;
}

export const INITIAL_BUZZWORDS: GenZBuzzword[] = [
  {
    id: 'buzz_1',
    term: '蛙化現象',
    reading: 'かえるかげんしょう',
    romaji: 'Kaeru-ka genshou',
    category: 'Tâm Lý Hẹn Hò',
    literalMeaning: 'Hiện tượng hóa thành con ếch (Lấy cảm hứng từ truyện cổ tích Hoàng tử ếch)',
    slangMeaning: 'Cảm giác bỗng dưng "tắt nắng", tụt hứng và thấy ghê sợ đối phương chỉ vì một hành động nhỏ vụng về (quẹt thẻ tàu điện bị kẹt, chạy vội vã, vấp ngã...).',
    exampleDialogue: {
      lineA: '彼が改札で残高不足で引っかかって、一瞬で蛙化した…',
      lineB: 'わかる！あそこでバタバタされると冷めちゃうよね。',
      translation: 'A: Anh ấy quẹt thẻ qua cửa soát vé bị thiếu tiền mắc kẹt lại, tự nhiên tớ bị "hóa ếch" tụt mood luôn… B: Hiểu luôn! Tự nhiên lúng túng chỗ đó nhìn chán thật.',
    },
    deepExplanation: 'Từ khóa số 1 giải thưởng Buzzword Nhật Bản: Phản ánh tâm lý lý tưởng hóa người yêu quá mức trên mạng xã hội của GenZ, khiến họ khó chấp nhận những khuyết điểm đời thực bình thường.',
  },
  {
    id: 'buzz_2',
    term: '蛇化現象',
    reading: 'へびかげんしょう',
    romaji: 'Hebi-ka genshou',
    category: 'Tâm Lý Hẹn Hò',
    literalMeaning: 'Hiện tượng hóa thành con rắn (Đối lập với Hiện tượng hóa ếch)',
    slangMeaning: 'Dù đối phương có làm hành động ngớ ngẩn, vụng về hay quê mùa đến đâu thì trong mắt bạn họ vẫn siêu cấp đáng yêu như chú ếch bị rắn nuốt trọn si mê.',
    exampleDialogue: {
      lineA: '彼氏が転んだんだけど、痛がる姿すら愛おしくて蛇化してる！',
      lineB: 'それもう完全にゾッコンじゃん！幸せそうで羨ましい。',
      translation: 'A: Bạn trai tớ vừa vấp ngã, mà cái vẻ mặt nhăn nhó của anh ấy trông cưng xỉu, tớ bị "hóa rắn" mê mệt luôn! B: Thế là u mê không lối thoát rồi đấy!',
    },
    deepExplanation: 'Trào lưu do TikToker người Nhật khởi xướng để phản bác lại hiện tượng hóa ếch tiêu cực, lan tỏa tình yêu bao dung và sự chấp nhận con người thật của nhau.',
  },
  {
    id: 'buzz_3',
    term: 'ちいかわ構文',
    reading: 'ちいかわこうぶん',
    romaji: 'Chiikawa Koubun',
    category: 'Meme Hài Hước',
    literalMeaning: 'Cú pháp câu nói kiểu nhân vật hoạt hình Chiikawa',
    slangMeaning: 'Cách nói chuyện dùng những từ ngữ cảm thán nũng nịu rưng rưng như: "ワッ… (Waa...)", "なんとかなれーッ！ (Phải bằng cách nào đó qua được thôi!)", "エッ…".',
    exampleDialogue: {
      lineA: '明日のJLPT試験、全然勉強してない…なんとかなれーッ！',
      lineB: 'ちいかわの気合で乗り切る気！？今から単語覚えなさい！',
      translation: 'A: Mai thi JLPT rồi mà chưa học gì cả... Phải bằng cách nào đó qua được thôi (Nanto ka nareee)! B: Định dùng tinh thần Chiikawa để qua môn à!? Học từ vựng ngay đi!',
    },
    deepExplanation: 'Chiikawa là hiện tượng hoạt hình quốc dân Nhật Bản: Những sinh vật nhỏ bé đáng yêu nhưng phải làm việc vất vả và chiến đấu với quái vật để sinh tồn, phản ánh sự đồng cảm sâu sắc với giới trẻ đi làm.',
  },
  {
    id: 'buzz_4',
    term: '好ハオ',
    reading: 'はお',
    romaji: 'Hao (Hǎo)',
    category: 'TikTok Trend',
    literalMeaning: 'Chữ Hảo (好) trong tiếng Trung (Hảo = Thích / Tốt)',
    slangMeaning: 'Cực kỳ thích, siêu cấp u mê, mê chữ ê kéo dài (dùng khi khen ngợi outfit, thần tượng hoặc món ăn ngon).',
    exampleDialogue: {
      lineA: '今日の推しのビジュ、マジで好ハオすぎるんだけど！！',
      lineB: '尊すぎて息できない…完全優勝だね。',
      translation: 'A: Nhan sắc hôm nay của Oshi nhà tớ đúng là "Hao" đỉnh nóc kịch trần luôn á!! B: Quá đỗi tôn quý không thở nổi luôn... thắng thế tuyệt đối!',
    },
    deepExplanation: 'GenZ Nhật Bản rất thích mượn các từ ngữ tiếng Trung và Hàn Quốc biến tấu theo cách đọc dễ thương để tạo ra từ lóng riêng biệt trên TikTok.',
  },
  {
    id: 'buzz_5',
    term: 'かわちい',
    reading: 'かわちい',
    romaji: 'Kawachii',
    category: 'TikTok Trend',
    literalMeaning: 'Cách phát âm nũng nịu của từ "Kawaii" (Đáng yêu)',
    slangMeaning: 'Xinh xắn muốn xỉu, cưng hết nấc (thường đi kèm động tác vỗ hai tay lên má khi quay clip biến hình OOTD).',
    exampleDialogue: {
      lineA: 'この秋服のコーデ、袖のフリルがかわちい！',
      lineB: 'それTikTokでバズってたやつだ！超似合ってる！',
      translation: 'A: Set đồ mùa thu này, phần tay áo bèo nhún trông "Kawachii" xỉu luôn! B: Cái mẫu đang viral trên TikTok đấy! Cậu mặc hợp lắm!',
    },
    deepExplanation: 'Khởi xướng bởi các nhà sáng tạo nội dung thời trang Harajuku, từ này nhanh chóng thay thế từ "Kawaii" truyền thống trong các video khoe đồ phối GenZ.',
  },
];

export const EXTRA_BUZZWORDS: GenZBuzzword[] = [
  {
    id: 'buzz_extra_1',
    term: '優勝',
    reading: 'ゆうしょう',
    romaji: 'Yuushou',
    category: 'Văn Hóa Oshi',
    literalMeaning: 'Giành chức vô địch',
    slangMeaning: 'Đỉnh chóp, xuất sắc không ai bì kịp, tuyệt vời nhất quả đất (dùng khi ăn món ngon hoặc thấy idol tỏa sáng).',
    exampleDialogue: {
      lineA: '深夜のラーメンにチャーシュー追加で完全優勝した。',
      lineB: 'それは優勝間違いなし！背徳感たまらんね。',
      translation: 'A: Nửa đêm ăn ramen gọi thêm thịt xá xíu, đúng là "vô địch" tuyệt đối. B: Thế thì vô địch không bàn cãi! Cảm giác tội lỗi mà phê thật.',
    },
    deepExplanation: 'Người trẻ Nhật dùng từ "Vô địch" (優勝) để tôn vinh những niềm vui giản dị nhưng mang lại cảm giác thỏa mãn tột cùng trong cuộc sống hàng ngày.',
  },
  {
    id: 'buzz_extra_2',
    term: 'ビジュがいい',
    reading: 'びじゅがいい',
    romaji: 'Biju ga ii',
    category: 'TikTok Trend',
    literalMeaning: 'Visual (Ngoại hình / Hình ảnh) rất tốt',
    slangMeaning: 'Visual đỉnh cao, góc nghiêng thần thánh, nhan sắc bừng sáng không tì vết.',
    exampleDialogue: {
      lineA: '今日のメイク、自然光で見るとビジュが神がかってる！',
      lineB: '涙袋のラメがめっちゃ効いてるね！盛れてる！',
      translation: 'A: Lớp makeup hôm nay nhìn dưới ánh sáng tự nhiên visual đúng là thần thánh luôn! B: Nhũ bọng mắt phát huy tác dụng đỉnh ghê! Lên hình ăn ảnh cực!',
    },
    deepExplanation: 'Rút gọn từ "Visual" trong tiếng Anh, từ này phổ biến trong mọi cộng đồng hâm mộ Idol K-pop, J-pop và Anime 2.5D tại Nhật.',
  },
  {
    id: 'buzz_extra_3',
    term: '沼る',
    reading: 'ぬまる',
    romaji: 'Numaru',
    category: 'Văn Hóa Oshi',
    literalMeaning: 'Rơi xuống đầm lầy lún sâu',
    slangMeaning: 'U mê không lối thoát, lọt hố say đắm một ai đó hoặc một bộ phim/sở thích đến mức không thể dứt ra được.',
    exampleDialogue: {
      lineA: 'あのアイドルの笑顔を見た瞬間、完全に沼った。',
      lineB: 'ようこそ底なし沼へ！グッズ買いに行こうぜ。',
      translation: 'A: Khoảnh khắc nhìn thấy nụ cười của idol đó, tớ chính thức "rơi vào đầm lầy" u mê luôn. B: Chào mừng gia nhập hố sâu! Đi mua goods cổ vũ thôi!',
    },
    deepExplanation: 'Từ "Numa" (đầm lầy) được biến thành động từ nhóm 1 (Numaru) thể hiện sự say mê cuồng nhiệt tự nguyện của người hâm mộ.',
  },
  {
    id: 'buzz_extra_4',
    term: 'てぇてぇ',
    reading: 'てぇてぇ',
    romaji: 'Teetee',
    category: 'Văn Hóa Oshi',
    literalMeaning: 'Biến âm của từ "尊い" (Toutoi - Tôn quý / Đáng trân trọng)',
    slangMeaning: 'Cảm giác quắn quéo, cảm động rớt nước mắt khi thấy hai nhân vật hoặc hai idol tương tác thân thiết ngọt ngào với nhau.',
    exampleDialogue: {
      lineA: '推しペアが手を繋いで歌ってるの見て、てぇてぇが限界突破した…',
      lineB: '尊死する…！末永く仲良くしててほしい！',
      translation: 'A: Nhìn hai đứa nắm tay nhau hát, độ "teetee" vượt ngưỡng chịu đựng của con tim rồi… B: Chết vì tôn quý mất…! Mong hai bạn mãi thân thiết thế này!',
    },
    deepExplanation: 'Xuất phát từ cộng đồng người hâm mộ VTuber (Virtual YouTuber) trên YouTube và Nico Nico Douga, lan tỏa thành ngôn ngữ chung của giới Otaku toàn cầu.',
  },
  {
    id: 'buzz_extra_5',
    term: 'それな',
    reading: 'それな',
    romaji: 'Sorena',
    category: 'Meme Hài Hước',
    literalMeaning: 'Đúng chuẩn cái đó rồi đấy!',
    slangMeaning: 'Chuẩn luôn! Đồng ý hai tay hai chân! Quá chính xác không cần chỉnh!',
    exampleDialogue: {
      lineA: '月曜日の朝ってなんでこんなに布団から出られないんだろうね。',
      lineB: 'それな！！一生寝ていたい。',
      translation: 'A: Sao sáng thứ hai khó chui ra khỏi chăn thế không biết. B: Chuẩn cmnr!! Chỉ muốn ngủ cả đời thôi.',
    },
    deepExplanation: 'Từ lóng xuất phát từ vùng phương ngữ Kansai (Osaka), nay đã trở thành câu đồng tình nhanh gọn phổ biến nhất của giới trẻ Nhật trong các đoạn chat LINE.',
  },
];

// -------------------------------------------------------------
// 7. BẢN ĐỒ HÀNH HƯƠNG ANIME ĐỜI THỰC (SEICHI JUNREI - 聖地巡礼)
// -------------------------------------------------------------
export interface AnimePilgrimageSpot {
  id: string;
  animeTitle: string;
  jpAnimeTitle: string;
  spotName: string;
  realLocation: string;
  nearestStation: string;
  iconicScene: string;
  pilgrimEtiquette: string;
  deepExplanation: string;
}

export const INITIAL_PILGRIMAGE_SPOTS: AnimePilgrimageSpot[] = [
  {
    id: 'spot_your_name',
    animeTitle: 'Your Name (Kimi no Na wa)',
    jpAnimeTitle: '君の名は。',
    spotName: 'Cầu thang đỏ đền Suga Jinja (須賀神社の階段)',
    realLocation: 'Yotsuya, Shinjuku, Tokyo',
    nearestStation: 'Ga Yotsuya (Tuyến JR Chuo) hoặc Ga Yotsuya-sanchome (Tokyo Metro)',
    iconicScene: 'Cảnh kết thúc lịch sử khi Taki và Mitsuha lướt qua nhau trên bậc thang đỏ và quay lại hỏi: "Kimi no namae wa?"',
    pilgrimEtiquette: 'Cầu thang nằm trong khu dân cư yên tĩnh, tuyệt đối không đứng chắn lối đi của người dân và không gây ồn ào khi chụp ảnh.',
    deepExplanation: 'Bộ phim của đạo diễn Shinkai Makoto đã tạo nên cơn sốt hành hương toàn cầu, thu hút hàng triệu du khách đến một con hẻm vốn không tên tuổi ở Tokyo.',
  },
  {
    id: 'spot_jujutsu_kaisen',
    animeTitle: 'Jujutsu Kaisen (Chú Thuật Hồi Chiến)',
    jpAnimeTitle: '呪術廻戦（渋谷事変）',
    spotName: 'Giao lộ Shibuya Scramble & Ga Tàu Điện Ngầm (渋谷スクランブル交差点)',
    realLocation: 'Shibuya, Tokyo',
    nearestStation: 'Ga Shibuya (Cửa ra Hachiko)',
    iconicScene: 'Tâm điểm của Arc "Biến cố Shibuya" (Shibuya Incident), nơi các chú thuật sư phong ấn Gojo Satoru.',
    pilgrimEtiquette: 'Giao lộ đông đúc nhất thế giới với 3000 người băng qua mỗi lượt đèn xanh; chú ý an toàn giao thông khi chụp ảnh.',
    deepExplanation: 'Tác giả Akutami Gege đã tái hiện chính xác từng cột đèn, lối cầu thang ngầm và biển hiệu quảng cáo của khu phố Shibuya hiện đại.',
  },
  {
    id: 'spot_slam_dunk',
    animeTitle: 'Slam Dunk (Cao Thủ Bóng Rổ)',
    jpAnimeTitle: 'スラムダンク',
    spotName: 'Giao lộ đường ray tàu biển Kamakurakoko-mae (鎌倉高校前踏切)',
    realLocation: 'Kamakura, Tỉnh Kanagawa',
    nearestStation: 'Ga Kamakurakoko-mae (Tuyến tàu điện Enoden)',
    iconicScene: 'Hanamichi Sakuragi đứng đối diện với Haruko Akagi bên kia rào chắn đường ray ven biển lộng gió trong bài hát mở đầu OP.',
    pilgrimEtiquette: 'Nghiêm cấm bước vào làn đường ray xe lửa hoặc cản trở ô tô lưu thông trên đường ven biển.',
    deepExplanation: 'Đây là địa điểm hành hương bất hủ hơn 30 năm qua của người hâm mộ bóng rổ khắp châu Á, tượng trưng cho ngọn lửa thanh xuân nhiệt huyết.',
  },
  {
    id: 'spot_spirited_away',
    animeTitle: 'Spirited Away (Vùng Đất Linh Hồn)',
    jpAnimeTitle: '千と千尋の神隠し',
    spotName: 'Nhà tắm Dogo Onsen Honkan & Cầu đỏ Sekizenkan',
    realLocation: 'Matsuyama (Tỉnh Ehime) & Shima (Tỉnh Gunma)',
    nearestStation: 'Ga Dogo Onsen (Tỉnh Ehime)',
    iconicScene: 'Nhà tắm hơi bằng gỗ nhiều tầng nguy nga nơi mụ phù thủy Yubaba kinh doanh phục vụ các vị thần linh.',
    pilgrimEtiquette: 'Dogo Onsen là bảo vật văn hóa quốc gia 3000 năm tuổi; hãy tuân thủ quy tắc tắm suối nước nóng lịch sự.',
    deepExplanation: 'Đạo diễn Hayao Miyazaki (Ghibli) đã kết hợp kiến trúc nhà tắm cổ Dogo Onsen với cây cầu đỏ huyền ảo tại ryokan Sekizenkan để tạo nên thế giới linh hồn kỳ vĩ.',
  },
  {
    id: 'spot_bocchi_the_rock',
    animeTitle: 'Bocchi the Rock! (Cô Nàng Ban Nhạc Rock)',
    jpAnimeTitle: 'ぼっち・ざ・ろっく！',
    spotName: 'Nhà hát Live House Shimokitazawa SHELTER (下北沢SHELTER)',
    realLocation: 'Shimokitazawa, Setagaya, Tokyo',
    nearestStation: 'Ga Shimokitazawa (Tuyến Odakyu / Keio Inokashira)',
    iconicScene: 'Quán Live House ngầm "Starry" nơi ban nhạc Kessoku Band biểu diễn những buổi hòa nhạc đầu tiên đầy cảm xúc.',
    pilgrimEtiquette: 'Nếu muốn chụp ảnh bảng hiệu, hãy mua vé vào xem các ban nhạc indie biểu diễn thực tế để ủng hộ văn hóa âm nhạc địa phương.',
    deepExplanation: 'Shimokitazawa là thánh địa của nhạc rock indie, thời trang vintage đồ si và cà phê nghệ thuật của thanh thiếu niên Tokyo.',
  },
];

export const EXTRA_PILGRIMAGE_SPOTS: AnimePilgrimageSpot[] = [
  {
    id: 'spot_extra_demon_slayer',
    animeTitle: 'Demon Slayer (Kimetsu no Yaiba)',
    jpAnimeTitle: '鬼滅の刃',
    spotName: 'Tảng đá chém đôi Itto-seki (一刀石)',
    realLocation: 'Yagyu, Thành phố Nara',
    nearestStation: 'Ga Kintetsu Nara (đi xe buýt đến Yagyu)',
    iconicScene: 'Tảng đá khổng lồ bị Tanjiro dùng kiếm chém đôi hoàn hảo trong kỳ huấn luyện của sư phụ Urokodaki.',
    pilgrimEtiquette: 'Tảng đá nằm giữa rừng trúc cổ, người hâm mộ có thể mang kiếm gỗ Katana chụp ảnh nhưng không xả rác bừa bãi.',
    deepExplanation: 'Theo truyền thuyết dân gian, tảng đá này bị kiếm sĩ huyền thoại Yagyu Munetoshi chém đôi khi giao chiến với một bóng ma tengu thời Chiến quốc.',
  },
  {
    id: 'spot_extra_weathering',
    animeTitle: 'Weathering With You (Đứa Con Của Thời Tiết)',
    jpAnimeTitle: '天気の子',
    spotName: 'Đền Khí Tượng Koenji & Tòa nhà Yoyogi Kaikan (気象神社)',
    realLocation: 'Koenji, Suginami, Tokyo',
    nearestStation: 'Ga Koenji (Tuyến JR Chuo)',
    iconicScene: 'Ngôi đền thờ vị thần thời tiết độc nhất vô nhị ở Nhật Bản nơi mọi người viết lời ước mưa thuận gió hòa lên guốc gỗ Geta.',
    pilgrimEtiquette: 'Mua một chiếc bùa Geta cầu nắng ấm và viết điều ước treo lên giá đền trang trọng.',
    deepExplanation: 'Đền Higaisha Koenji là ngôi đền duy nhất ở Nhật thờ phụng thần thời tiết, được các cặp đôi sắp cưới và học sinh sắp đi dã ngoại đến cầu trời nắng.',
  },
  {
    id: 'spot_extra_oshi_no_ko',
    animeTitle: 'Oshi no Ko (Dưới Ánh Hào Quang)',
    jpAnimeTitle: '【推しの子】',
    spotName: 'Bảo tàng Cung thiên văn Sunshine City & Nhà thi đấu Tokyo Dome (東京ドーム)',
    realLocation: 'Ikebukuro & Suidobashi, Tokyo',
    nearestStation: 'Ga Suidobashi hoặc Ga Korakuen',
    iconicScene: 'Thánh đường mơ ước của mọi Idol Nhật Bản, nơi nhóm nhạc B-Komachi khao khát biểu diễn concert.',
    pilgrimEtiquette: 'Chỉ chụp ảnh lưu niệm ở quảng trường bên ngoài, không chen lấn trong những ngày có sự kiện âm nhạc lớn.',
    deepExplanation: 'Với sức chứa 55.000 khán giả, biểu diễn solo tại Tokyo Dome là đỉnh cao danh vọng vĩ đại nhất của bất kỳ nghệ sĩ nào tại xứ sở mặt trời mọc.',
  },
  {
    id: 'spot_extra_steins_gate',
    animeTitle: 'Steins;Gate (Cổng Thời Gian)',
    jpAnimeTitle: 'シュタインズ・ゲート',
    spotName: 'Tòa nhà Radio Kaikan & Đền Yanagimori (秋葉原ラジオ会館)',
    realLocation: 'Akihabara, Tokyo',
    nearestStation: 'Ga Akihabara (Cửa Electric Town)',
    iconicScene: 'Nơi cỗ máy thời gian đâm vào nóc tòa nhà trong tập 1, mở ra chuỗi du hành thời gian nghẹt thở.',
    pilgrimEtiquette: 'Tòa nhà hiện là trung tâm mua bán figure anime 10 tầng, khách tham quan có thể tự do mua sắm.',
    deepExplanation: 'Radio Kaikan được xây dựng từ năm 1962, là biểu tượng lịch sử chứng kiến sự chuyển mình của Akihabara từ chợ linh kiện điện tử thành thủ phủ văn hóa Otaku.',
  },
  {
    id: 'spot_extra_violet_evergarden',
    animeTitle: 'Violet Evergarden (Búp Bê Ký Ức)',
    jpAnimeTitle: 'ヴァイオレット・エヴァーガーデン',
    spotName: 'Bảo tàng Kiến trúc Ngoài trời Edo-Tokyo (江戸東京たてもの園)',
    realLocation: 'Koganei, Tokyo',
    nearestStation: 'Ga Musashi-Koganei',
    iconicScene: 'Bối cảnh các tòa nhà kiến trúc thời kỳ Meiji châu Âu cổ điển nơi Violet làm người viết thư thuê (Auto Memory Doll).',
    pilgrimEtiquette: 'Bảo tồn công trình kiến trúc gỗ cổ, cởi giày khi bước vào các gian phòng triển lãm bên trong.',
    deepExplanation: 'Hãng phim Kyoto Animation đã nghiên cứu tỉ mỉ các chi tiết cửa kính màu, máy đánh chữ cổ và cột đèn đường thời kỳ phục hưng để vẽ nên bộ phim đạt giải đồ họa xuất sắc nhất lịch sử anime.',
  },
];

// -------------------------------------------------------------
// 8. BỘ SƯU TẬP TƯ THẾ CHỤP ẢNH PURIKURA & TIKTOK NHẬT BẢN
// -------------------------------------------------------------
export interface PurikuraPose {
  id: string;
  name: string;
  jpName: string;
  description: string;
  bestAngle: string;
  instagramCaption: string;
  vibeTag: string;
  deepExplanation: string;
}

export const INITIAL_PURIKURA_POSES: PurikuraPose[] = [
  {
    id: 'pose_gyaru_peace',
    name: 'Tư Thế Gyaru Peace (ギャルピース)',
    jpName: '逆さピース・ギャルピ',
    description: 'Bàn tay chữ V chúc ngược xuống dưới, đưa về phía trước ống kính tạo cảm giác tràn đầy năng lượng và tự tin nổi loạn.',
    bestAngle: 'Góc máy hơi chúc từ trên xuống 30 độ, nghiêng đầu nhẹ sang một bên và nở nụ cười tươi tắn.',
    instagramCaption: 'ギャルピしか勝たん✌️✨ #ShibuyaVibes #GyaruReiwa #きょうのコーデ',
    vibeTag: 'Hot Trend Shibuya · Năng Động Sành Điệu',
    deepExplanation: 'Khởi xướng từ các cô nàng Gyaru thập niên 90 và bất ngờ bùng nổ toàn cầu trở lại nhờ các thần tượng K-pop Gen 4 như Rei (IVE).',
  },
  {
    id: 'pose_cat_paws',
    name: 'Tư Thế Mèo Nya-nya (にゃんにゃんポーズ)',
    jpName: '猫耳＆肉球にゃんにゃん',
    description: 'Nắm hờ hai bàn tay mô phỏng móng vuốt mèo đặt ngay dưới cằm hoặc hai bên má, mắt mở to tròn long lanh.',
    bestAngle: 'Góc máy ngang tầm mắt, biểu cảm ngơ ngác dễ thương (Pouty face).',
    instagramCaption: 'にゃんにゃん🐾 今日も一日がんばった！ #ねこポーズ #かわちい #Purikura',
    vibeTag: 'Kawaii Vô Cực · Búp Bê Anime',
    deepExplanation: 'Trong văn hóa Kawaii, loài mèo là đỉnh cao của sự nũng nịu (Amae); tạo dáng vuốt mèo giúp khuôn mặt trông nhỏ nhắn hơn 20% trên ảnh chụp.',
  },
  {
    id: 'pose_heart_cheek',
    name: 'Má Trái Tim Coquette (ほっぺハート)',
    jpName: '片手ほっぺハート・愛嬌',
    description: 'Dùng một bàn tay uốn cong nửa hình trái tim áp sát vào gò má để gò má trở thành nửa trái tim còn lại.',
    bestAngle: 'Góc nghiêng 45 độ khoe đường nét má hồng Igari ửng sương mai.',
    instagramCaption: 'すきぴに届けっ🫶💕 #ほっぺハート #推し活 #量産型ヲタク',
    vibeTag: 'Tiểu Thư Mộng Mơ · Nàng Thơ Shoujo',
    deepExplanation: 'Tư thế chụp ảnh quốc dân của các thiếu nữ phong cách Ryousangata và Jirai Kei khi đi chụp ảnh sticker tại máy Purikura Shibuya 109.',
  },
  {
    id: 'pose_chin_hand',
    name: 'Thiếu Nữ Tựa Cằm Trầm Ngâm (あごのせ・小顔ポーズ)',
    jpName: 'あご乗せ・虫歯ポーズ',
    description: 'Đặt nhẹ mu bàn tay hoặc các ngón tay tựa vào cằm như đang suy nghĩ mộng mơ (còn được gọi hài hước là Tư thế đau răng).',
    bestAngle: 'Góc chụp từ trên cao xuống 45 độ giúp cằm thon gọn V-line tối đa.',
    instagramCaption: 'きょうはどんな夢見る？💭✨ #あごのせ #透明感 #すっぴん風',
    vibeTag: 'Kogao Mặt Nhỏ · Thanh Lịch Trong Trẻo',
    deepExplanation: 'Tư thế "Mushiba Pose" (đau răng) là bí kíp chụp ảnh tạp chí kinh điển của các người mẫu Non-no và CanCam để che đi xương quai hàm góc cạnh.',
  },
  {
    id: 'pose_wink_finger',
    name: 'Nháy Mắt Bắn Tim Idol (ウインク＆バーン！)',
    jpName: 'アイドルウインク・ハート打ち抜き',
    description: 'Một mắt nháy duyên dáng, tay làm hình khẩu súng ngón trỏ bắn tim về phía khán giả.',
    bestAngle: 'Góc chụp trực diện, ánh mắt tự tin giao tiếp trực tiếp với người xem.',
    instagramCaption: 'ハート撃ち抜いちゃうぞ！💘 #アイドルポーズ #ファンサ #きゅんです',
    vibeTag: 'Sân Khấu Bùng Nổ · Fan Service',
    deepExplanation: 'Mô phỏng động tác "Fan Service" (Fansaa) của các thần tượng J-pop trên sân khấu khi đáp lại tình cảm cuồng nhiệt của người hâm mộ.',
  },
];

export const EXTRA_PURIKURA_POSES: PurikuraPose[] = [
  {
    id: 'pose_extra_back_hug',
    name: 'Vòng Tay Ôm Từ Phía Sau (バックハグ・仲良し)',
    jpName: '双子コーデ・仲良し密着',
    description: 'Hai người bạn mặc đồ đôi (Twin code), một người ôm nhẹ người kia từ phía sau vai má kề má.',
    bestAngle: 'Khung hình cận cảnh hai khuôn mặt đồng điệu thể hiện tình bạn khăng khít.',
    instagramCaption: 'ずっと一緒だよ👯‍♀️🤍 #双子コーデ #親友 #プリクラ倶楽部',
    vibeTag: 'Tình Bạn Tri Kỷ · Đồ Đôi Twin Look',
    deepExplanation: 'Phong trào mặc "Futago Code" (đồ sinh đôi) giữa bạn bè thân thiết là biểu tượng gắn kết văn hóa học đường của nữ sinh Nhật Bản.',
  },
  {
    id: 'pose_extra_shoujo_salute',
    name: 'Chào Thủy Thủ Manga (セーラー敬礼ポーズ)',
    jpName: 'セーラー戦士・敬礼ポーズ',
    description: 'Giơ tay chào kiểu thủy thủ Sailor Moon, ngón tay khép thẳng chạm nhẹ đuôi lông mày.',
    bestAngle: 'Góc nghiêng ba phần tư toát lên vẻ tinh nghịch, hoạt bát tràn đầy sức sống.',
    instagramCaption: '月に代わってお仕置きよ🌙✨ #セーラームーン #JKの日常 #放課後',
    vibeTag: 'Nữ Sinh Hoạt Bát · Thủy Thủ Mặt Trăng',
    deepExplanation: 'Bộ đồng phục thủy thủ Sailor Fuku kết hợp động tác chào quân đội cách điệu là biểu tượng văn hóa đại chúng mạnh mẽ nhất từ thập niên 1990.',
  },
  {
    id: 'pose_extra_finger_heart_japan',
    name: 'Bắn Tim Ngón Tay Mini (きゅんですポーズ)',
    jpName: '指ハート・きゅんです',
    description: 'Chéo ngón cái và ngón trỏ tạo thành trái tim mini đặt trước ngực hoặc gần khóe mắt.',
    bestAngle: 'Góc chụp nghiêng nhẹ, nụ cười chúm chím bẽn lẽn.',
    instagramCaption: 'きゅんです🫶💓 #ポケットからきゅんです #放課後プリ #青春',
    vibeTag: 'Cảm Xúc Rung Động · GenZ Viral',
    deepExplanation: 'Gắn liền với giai điệu bài hát triệu view "Pocket kara Kyun desu" của ca sĩ Hirai Dai trên nền tảng TikTok Nhật Bản.',
  },
  {
    id: 'pose_extra_sunglasses_head',
    name: 'Kính Râm Cài Tóc Y2K (サングラスカチューシャ)',
    jpName: 'Y2Kギャル・サングラスヘア',
    description: 'Cài kính râm gọng dày lên đỉnh đầu như bờm tóc, hai tay chống hông kiêu hãnh.',
    bestAngle: 'Góc chụp thẳng từ dưới hất nhẹ lên tạo đôi chân dài và khí chất ngầu lòi.',
    instagramCaption: 'Y2K vibes only😎🔥 #平成レトロ #ギャルしか勝たん #OOTD',
    vibeTag: 'Heisei Retro · Phong Cách Y2K',
    deepExplanation: 'Sự trỗi dậy của xu hướng "Heisei Retro" khiến các phụ kiện thời kỳ năm 2000 như kính gọng nhựa trong và điện thoại nắp gập trở thành trào lưu thời thượng nhất.',
  },
  {
    id: 'pose_extra_sleeping_fairy',
    name: 'Thiên Sứ Ngủ Say Trong Giấc Mộng (おねむ・天使ポーズ)',
    jpName: 'すやすや天使・おやすみポーズ',
    description: 'Hai lòng bàn tay áp vào nhau đặt nghiêng dưới một bên má, hai mắt nhắm nghiền mỉm cười nhẹ.',
    bestAngle: 'Góc chụp cận mặt phông nền sáng, biểu cảm thánh thiện như đang mơ thấy giấc mơ đẹp.',
    instagramCaption: 'いい夢見てね🌙💤 #天使界隈 #おやすみ #ゆめかわいい',
    vibeTag: 'Yume-kawaii · Thiên Thần Trong Suốt',
    deepExplanation: 'Phong cách "Tenshi Kaiwai" (Tiểu văn hóa Thiên sứ) sử dụng tư thế ngủ say để biểu đạt mong muốn thoát ly khỏi áp lực cuộc sống xô bồ ngoài xã hội.',
  },
];

// -------------------------------------------------------------
// 9. BỘ GIẢI MÃ LINH VẬT & THẦN MAY MẮN NHẬT BẢN (ENGIMONO & YURU-CHARA)
// -------------------------------------------------------------
export interface EngimonoMascot {
  id: string;
  name: string;
  jpName: string;
  originEra: string;
  mythologicalPower: string;
  placementRule: string;
  curiousFact: string;
  deepExplanation: string;
}

export const INITIAL_ENGIMONO_MASCOTS: EngimonoMascot[] = [
  {
    id: 'mascot_maneki_neko',
    name: 'Mèo Thần Tài Vẫy Tay (Maneki-neko - 招き猫)',
    jpName: '招き猫（右手を挙げる・左手を挙げる）',
    originEra: 'Thời kỳ Edo (Khởi nguồn từ đền Gotokuji, Setagaya, Tokyo)',
    mythologicalPower: 'Thu hút tài lộc, khách hàng nườm nượp và bình an gia đạo.',
    placementRule: 'Đặt ở quầy thu ngân hoặc huyền quan cửa chính hướng ra ngoài đón khách.',
    curiousFact: 'Mèo vẫy TAY PHẢI là chiêu tài rước tiền bạc; mèo vẫy TAY TRÁI là chiêu khách rước nhân duyên quý nhân!',
    deepExplanation: 'Theo truyền thuyết đền Gotokuji, một vị Lãnh chúa Samurai đã được chú mèo trắng vẫy tay gọi vào đền trú ẩn, ngay sau đó một tia sét đánh trúng vị trí ông vừa đứng, cứu mạng ông trong gang tấc.',
  },
  {
    id: 'mascot_daruma',
    name: 'Búp Bê Cầu Nguyện Daruma (だるま - 達磨)',
    jpName: '高崎だるま・七転び八起き',
    originEra: 'Thế kỷ XVIII (Chùa Shorinzan Daruma-ji, Takasaki, Gunma)',
    mythologicalPower: 'Ý chí kiên định bất khuất: "7 lần ngã, 8 lần đứng dậy" (Nana-korobi Ya-oki).',
    placementRule: 'Đặt ở bàn học hoặc phòng làm việc ở vị trí ngang tầm mắt người ngồi.',
    curiousFact: 'Khi bắt đầu lập mục tiêu: Tô mắt TRÁI của Daruma; khi mục tiêu hoàn thành xuất sắc: Tô tiếp mắt PHẢI để hoàn thiện đôi mắt tròn xoe!',
    deepExplanation: 'Mô phỏng hình tượng Bồ Đề Đạt Ma ngồi thiền 9 năm đối diện vách đá. Đáy búp bê được làm nặng để dù có bị đẩy ngã thế nào cũng tự động bật dậy ngay lập tức.',
  },
  {
    id: 'mascot_inu_hariko',
    name: 'Chó Giấy Bồi Bảo Hộ Trẻ Em (Inu-hariko - 犬張子)',
    jpName: '犬張子（安産と無病息災）',
    originEra: 'Thời kỳ Muromachi sang thời kỳ Edo tại Tokyo',
    mythologicalPower: 'Bảo vệ trẻ nhỏ khỏi ốm đau bệnh tật, mang lại sự mẹ tròn con vuông (Anzan).',
    placementRule: 'Đặt trên đầu giường ngủ của em bé hoặc góc trang trí phòng khách.',
    curiousFact: 'Loài chó sinh con rất dễ dàng và dũng cảm xua đuổi tà ma, người Nhật tin rằng hình tượng chú chó đội giỏ tre trên đầu chữ "Khuyển" (犬) thêm chiếc giỏ (竹) sẽ hóa thành chữ "Tiếu" (笑 - Nụ cười hạnh phúc).',
    deepExplanation: 'Món quà truyền thống không thể thiếu trong lễ Miyamairi (lễ đưa trẻ sơ sinh 1 tháng tuổi đến đền thần tạ ơn).',
  },
  {
    id: 'mascot_tanuki',
    name: 'Chồn May Mắn Gốm Shigaraki (Shigaraki Tanuki - 信楽焼たぬき)',
    jpName: '信楽焼の狸・八相縁起',
    originEra: 'Tỉnh Shiga (Gốm cổ Shigaraki ngàn năm tuổi)',
    mythologicalPower: '8 biểu tượng may mắn toàn diện (Bát Tướng Duyên Khởi - Hasso Engi).',
    placementRule: 'Thường được đặt ngay trước cửa các nhà hàng ẩm thực và quán rượu Izakaya.',
    curiousFact: 'Chú chồn luôn đội nón lá tre (tránh tai ương bất ngờ), tay cầm bình rượu Sake (đức hạnh) và sổ nợ (chữ tín tuyệt đối trong kinh doanh).',
    deepExplanation: 'Văn hóa dân gian Nhật coi chồn Tanuki là bậc thầy biến hình tinh nghịch nhưng vô cùng tốt bụng, luôn đền đáp ơn nghĩa cho con người.',
  },
  {
    id: 'mascot_kumamon',
    name: 'Linh Vật Gấu Đen Má Hồng Kumamon (くまモン)',
    jpName: '熊本県営業部長・くまモン',
    originEra: 'Năm 2010 (Tỉnh Kumamoto, đảo Kyushu)',
    mythologicalPower: 'Mang lại tiếng cười sảng khoái, thúc đẩy kinh tế và tinh thần lạc quan vượt qua thiên tai.',
    placementRule: 'Xuất hiện trên hàng vạn sản phẩm nông sản, quà lưu niệm khắp nước Nhật.',
    curiousFact: 'Kumamon là linh vật duy nhất mang cấp bậc hành chính chính thức: "Giám đốc Kinh doanh kiêm Giám đốc Hạnh phúc của Tỉnh Kumamoto"!',
    deepExplanation: 'Yuru-chara là thuật ngữ chỉ các linh vật địa phương đáng yêu có tính cách ngây ngô. Kumamon đã đem lại doanh thu kinh tế hơn 10 tỷ USD cho tỉnh nhà.',
  },
];

export const EXTRA_ENGIMONO_MASCOTS: EngimonoMascot[] = [
  {
    id: 'mascot_extra_fukurou',
    name: 'Cú Mèo May Mắn Xua Tan Gian Khó (Fukurou - 梟)',
    jpName: '福籠・不苦労（ふくろう）',
    originEra: 'Thời cổ đại trên khắp các vùng rừng núi Hokkaido (Thần hộ mệnh của người Ainu)',
    mythologicalPower: 'Trí tuệ thông thái, không gặp gian nan vất vả ("Bất Khổ Lao" - 不苦労).',
    placementRule: 'Đặt ở tủ sách học tập hoặc phòng khách gia đình.',
    curiousFact: 'Cổ chim cú có thể xoay 270 độ và mắt nhìn thấu bóng đêm, tượng trưng cho khả năng nắm bắt mọi cơ hội tài chính và không bị kẻ xấu lừa gạt.',
    deepExplanation: 'Đồng âm chữ Hán: Fuku (福 - May mắn) + Rou (籠 - Đựng đầy chiếc giỏ), biến chim cú thành biểu tượng đón phúc khí hàng đầu Nhật Bản.',
  },
  {
    id: 'mascot_extra_koinobori',
    name: 'Cá Chép Vượt Vũ Môn Hóa Rồng (Koinobori - 鯉のぼり)',
    jpName: '端午の節句・鯉のぼり',
    originEra: 'Thời kỳ Edo (Tầng lớp võ sĩ Samurai)',
    mythologicalPower: 'Sức khỏe dẻo dai, ý chí vươn lên vượt mọi nghịch cảnh để thành công rực rỡ.',
    placementRule: 'Treo cờ cá chép bay phấp phới trước sân nhà vào dịp Tết Đoan Ngọ (ngày 5 tháng 5).',
    curiousFact: 'Cá chép đen tượng trưng cho người cha vững chãi, cá chép đỏ tượng trưng cho người mẹ dịu dàng, cá chép xanh tượng trưng cho con cái.',
    deepExplanation: 'Lấy cảm hứng từ tích cá chép bơi ngược dòng thác dữ hóa thành rồng dũng mãnh, chúc cho con cái trưởng thành khỏe mạnh kiên cường.',
  },
  {
    id: 'mascot_extra_akamabeko',
    name: 'Bò Đỏ Akabeko Xua Tan Dịch Bệnh (赤べこ)',
    jpName: '会津若松の伝説・赤べこ',
    originEra: 'Năm 1611 (Vùng Aizu, Tỉnh Fukushima)',
    mythologicalPower: 'Bảo vệ gia chủ khỏi bệnh dịch, tai ương hiểm họa và mang lại sức mạnh dẻo dai.',
    placementRule: 'Đặt ở bàn làm việc, khi chạm nhẹ vào đầu chú bò sẽ gật gù liên tục siêu đáng yêu.',
    curiousFact: 'Màu đỏ rực rỡ và những đốm tròn đen trên thân bò Akabeko theo quan niệm cổ xưa là tấm khiên xua đuổi tà ma và bệnh đậu mùa.',
    deepExplanation: 'Tương truyền khi xây dựng ngôi chùa Enzoji trên vách đá hiểm trở, một đàn bò đỏ bí ẩn đã xuất hiện giúp dân làng kéo những khúc gỗ nặng nhất lên đỉnh núi.',
  },
  {
    id: 'mascot_extra_teru_teru_bozu',
    name: 'Búp Bê Cầu Nắng Treo Cửa Sổ (Teru Teru Bozu - てるてる坊主)',
    jpName: 'てるてる坊主・晴天祈願',
    originEra: 'Thời kỳ Edo trong đời sống thiếu nhi Nhật Bản',
    mythologicalPower: 'Cầu cho bầu trời ngày mai nắng ráo trong xanh, mưa tạnh gió yên.',
    placementRule: 'Làm bằng vải trắng hoặc khăn giấy, buộc dây chỉ và treo ngược trước mái hiên hoặc cửa sổ sổ.',
    curiousFact: 'Nếu treo chú búp bê CHÚC ĐẦU XUỐNG DƯỚI, nó sẽ biến thành bùa CẦU MƯA (Fure Fure Bozu)!',
    deepExplanation: 'Trẻ em Nhật luôn làm Teru Teru Bozu vào đêm trước ngày diễn ra hội thao trường học (Undokai) hoặc chuyến dã ngoại ngoại khóa.',
  },
  {
    id: 'mascot_extra_chiikawa_mascot',
    name: 'Linh Vật Chiikawa & Hachiware (ちいかわ・ハチワレ)',
    jpName: 'なんか小さくてかわいいやつ',
    originEra: 'Năm 2020 đến nay (Họa sĩ Nagano)',
    mythologicalPower: 'Chữa lành tâm hồn tổn thương, tiếp thêm nghị lực vượt qua thử thách mỗi ngày.',
    placementRule: 'Treo balo, túi xách đi học đi làm như bùa hộ mệnh cảm xúc.',
    curiousFact: 'Dù luôn gặp tình huống hiểm nguy khóc nhè, các nhân vật không bao giờ bỏ cuộc và luôn chia sẻ thức ăn cho bạn bè.',
    deepExplanation: 'Hiện tượng văn hóa đại chúng vĩ đại nhất thập niên 2020 tại Nhật Bản, vượt qua ranh giới tuổi tác chạm đến trái tim của hàng chục triệu người.',
  },
];

// -------------------------------------------------------------
// 10. TRÌNH THỬ TÀI PHẢN XẠ TỪ TƯỢNG THANH TƯỢNG HÌNH (ONOMATOPOEIA FX)
// -------------------------------------------------------------
export interface OnomatopoeiaQuizItem {
  id: string;
  word: string;
  reading: string;
  romaji: string;
  type: 'Từ tượng thanh (Giongo)' | 'Từ tượng hình (Gitaigo)' | 'Từ mô tả cảm xúc (Gijougo)';
  situationQuestion: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  audioVoiceHint: string;
  deepExplanation: string;
}

export const INITIAL_ONOMATOPOEIA_QUIZ: OnomatopoeiaQuizItem[] = [
  {
    id: 'ono_1',
    word: 'ドキドキ',
    reading: 'どきどき',
    romaji: 'Doki-doki',
    type: 'Từ mô tả cảm xúc (Gijougo)',
    situationQuestion: 'Khi bạn chuẩn bị bước lên sân khấu tỏ tình với crush, tim bạn đập rộn ràng như thế nào?',
    options: ['ドキドキ (Doki-doki)', 'ワクワク (Waku-waku)', 'ペコペコ (Peko-peko)', 'ギラギラ (Gira-gira)'],
    correctIndex: 0,
    explanation: 'Doki-doki mô phỏng tiếng tim đập mạnh, hồi hộp lo lắng hoặc rung động trước người mình thầm thương trộm nhớ.',
    audioVoiceHint: 'ドキドキ、胸が高鳴る！',
    deepExplanation: 'Tiếng Nhật có hệ thống từ tượng thanh miêu tả nhịp tim tinh tế nhất thế giới: Doki-doki (hồi hộp), Baki-baki (bùng nổ), Zuki-zuki (đau nhói nhức nhối).',
  },
  {
    id: 'ono_2',
    word: 'キラキラ',
    reading: 'きらきら',
    romaji: 'Kira-kira',
    type: 'Từ tượng hình (Gitaigo)',
    situationQuestion: 'Ánh mắt long lanh bọng mắt nhũ ngọc trai của thiếu nữ Shoujo phản chiếu ánh sáng ra sao?',
    options: ['ボロボロ (Boro-boro)', 'キラキラ (Kira-kira)', 'サラサラ (Sara-sara)', 'フラフラ (Fura-fura)'],
    correctIndex: 1,
    explanation: 'Kira-kira miêu tả ánh sáng lấp lánh, lung linh của ngọc ngà, giọt sương mai hoặc đôi mắt ngời sáng hy vọng.',
    audioVoiceHint: 'キラキラ輝く瞳！',
    deepExplanation: 'Từ này phổ biến đến mức thuật ngữ "Kira-kira Name" được dùng để chỉ những cái tên độc lạ tỏa sáng của giới trẻ thế hệ mới.',
  },
  {
    id: 'ono_3',
    word: 'ワクワク',
    reading: 'わくわく',
    romaji: 'Waku-waku',
    type: 'Từ mô tả cảm xúc (Gijougo)',
    situationQuestion: 'Cảm giác phấn khích, hào hứng mong chờ chuyến đi du lịch Tokyo vào ngày mai được gọi là gì?',
    options: ['イライラ (Ira-ira)', 'モヤモヤ (Moya-moya)', 'ワクワク (Waku-waku)', 'ガタガタ (Gata-gata)'],
    correctIndex: 2,
    explanation: 'Waku-waku diễn tả niềm vui sướng phấn chấn tuôn trào từ bên trong lồng ngực như mạch nước ngầm sủi bọt.',
    audioVoiceHint: '明日が楽しみで、ワクワクが止まらない！',
    deepExplanation: 'Câu thoại kinh điển của cô bé Anya Forger trong bộ anime đình đám Spy x Family: "Anya, waku-waku!" đã gây bão mạng xã hội toàn cầu.',
  },
  {
    id: 'ono_4',
    word: 'ペコペコ',
    reading: 'ぺこぺこ',
    romaji: 'Peko-peko',
    type: 'Từ tượng hình (Gitaigo)',
    situationQuestion: 'Sau 4 tiết học căng thẳng, bụng bạn đói cồn cào rỗng tuếch thì người Nhật dùng từ nào?',
    options: ['お腹がペコペコ (Peko-peko)', 'お腹がパンパン (Pan-pan)', 'お腹がヒエヒエ (Hie-hie)', 'お腹がカチカチ (Kachi-kachi)'],
    correctIndex: 0,
    explanation: 'Onaka ga peko-peko mô tả chiếc bụng đói lõm sâu vào trong kêu réo cần nạp thức ăn ngay lập tức.',
    audioVoiceHint: 'お腹がペコペコだから、早くラーメン食べたい！',
    deepExplanation: 'Từ "Peko-peko" ngoài nghĩa đói bụng còn có nghĩa là cúi đầu liên tục (Peko-peko ojigi) để tạ lỗi hoặc cảm ơn ai đó.',
  },
  {
    id: 'ono_5',
    word: 'サラサラ',
    reading: 'さらさら',
    romaji: 'Sara-sara',
    type: 'Từ tượng hình (Gitaigo)',
    situationQuestion: 'Mái tóc nàng thơ sau khi ủ dầu hoa trà Tsubaki suôn mượt óng ả lướt qua kẽ tay miêu tả bằng từ gì?',
    options: ['ベタベタ (Beta-beta)', 'サラサラ (Sara-sara)', 'ギザギザ (Giza-giza)', 'バサバサ (Basa-basa)'],
    correctIndex: 1,
    explanation: 'Sara-sara miêu tả mái tóc suôn mượt tơ lụa không bết dính, hoặc dòng suối nhỏ chảy róc rách thanh thoát.',
    audioVoiceHint: '椿オイルで、髪がサラサラになったよ！',
    deepExplanation: 'Đây là tính từ số 1 xuất hiện trên tất cả các chai dầu gội và dưỡng tóc J-Beauty cao cấp tại các hiệu thuốc Matsumoto Kiyoshi.',
  },
];

export const EXTRA_ONOMATOPOEIA_QUIZ: OnomatopoeiaQuizItem[] = [
  {
    id: 'ono_extra_1',
    word: 'ふわふわ',
    reading: 'ふわふわ',
    romaji: 'Fuwa-fuwa',
    type: 'Từ tượng hình (Gitaigo)',
    situationQuestion: 'Chiếc bánh bông lan phô mai Nhật Bản hoặc gấu bông bông xốp mềm mại được miêu tả bằng từ gì?',
    options: ['カチカチ (Kachi-kachi)', 'ふわふわ (Fuwa-fuwa)', 'ツルツル (Tsuru-tsuru)', 'ザラザラ (Zara-zara)'],
    correctIndex: 1,
    explanation: 'Fuwa-fuwa miêu tả độ mềm xốp, bồng bềnh nhẹ như mây của bánh ngọt, đệm êm hoặc lọn tóc uốn gợn sóng thiếu nữ.',
    audioVoiceHint: '焼きたてのスフレパンケーキ、ふわふわで美味しい！',
    deepExplanation: 'Từ này là linh hồn của các món tráng miệng kiểu Tokyo: Bánh Soufflé Pancake phồng xốp núng nính tan ngay trong miệng.',
  },
  {
    id: 'ono_extra_2',
    word: 'もちもち',
    reading: 'もちもち',
    romaji: 'Mochi-mochi',
    type: 'Từ tượng hình (Gitaigo)',
    situationQuestion: 'Làn da em bé đàn hồi dẻo dai căng mọng nước (Mochi-hada) dùng từ nào?',
    options: ['パサパサ (Pasa-pasa)', 'もちもち (Mochi-mochi)', 'カラカラ (Kara-kara)', 'ネバネバ (Neba-neba)'],
    correctIndex: 1,
    explanation: 'Mochi-mochi mô phỏng độ dẻo dai mềm mịn nảy nở như chiếc bánh gạo nếp Mochi vừa mới giã xong.',
    audioVoiceHint: '化粧水をたっぷり塗って、お肌がもちもちになった！',
    deepExplanation: 'Khái niệm "Mochi-hada" (Làn da bánh nếp dẻo) là chuẩn mực vẻ đẹp tối thượng của mọi chu trình chăm sóc da J-Beauty.',
  },
  {
    id: 'ono_extra_3',
    word: 'イライラ',
    reading: 'いらいら',
    romaji: 'Ira-ira',
    type: 'Từ mô tả cảm xúc (Gijougo)',
    situationQuestion: 'Tâm trạng bực bội, cáu kỉnh khó chịu khi mạng Wi-Fi bị đứt lúc đang chơi game gọi là gì?',
    options: ['イライラ (Ira-ira)', 'ウキウキ (Uki-uki)', 'ニコニコ (Niko-niko)', 'ホカホカ (Hoka-hoka)'],
    correctIndex: 0,
    explanation: 'Ira-ira mô phỏng những chiếc gai nhọn đâm vào da, diễn tả tâm trạng bức bối mất kiên nhẫn.',
    audioVoiceHint: 'ネットが遅くて、イライラしちゃう！',
    deepExplanation: 'Khi gặp căng thẳng Ira-ira, người Nhật thường tìm đến Onsen hoặc các quán trà yên tĩnh để "Shinrin-yoku" (tắm rừng) giải tỏa áp lực.',
  },
  {
    id: 'ono_extra_4',
    word: 'モヤモヤ',
    reading: 'もやもや',
    romaji: 'Moya-moya',
    type: 'Từ mô tả cảm xúc (Gijougo)',
    situationQuestion: 'Cảm giác lấn cấn băn khoăn trong lòng, có điều vướng bận như có đám mây sương mù bao phủ là gì?',
    options: ['スッキリ (Sukkiri)', 'モヤモヤ (Moya-moya)', 'バリバリ (Bari-bari)', 'ピカピカ (Pika-pika)'],
    correctIndex: 1,
    explanation: 'Moya-moya mô tả màn sương mờ mịt giăng kín, dùng cho tâm trạng rối bời, u uất khó diễn tả thành lời.',
    audioVoiceHint: '友だちの一言が、なんだか心にモヤモヤ残ってる…',
    deepExplanation: 'Từ này diễn tả bản chất tính cách người Nhật: Thường giữ những lấn cấn trong lòng vì sợ làm tổn thương bầu không khí chung (Kuuki wo yomu).',
  },
  {
    id: 'ono_extra_5',
    word: 'にこにこ',
    reading: 'にこにこ',
    romaji: 'Niko-niko',
    type: 'Từ tượng hình (Gitaigo)',
    situationQuestion: 'Nụ cười tươi tắn hiền hậu, mắt cười cong cong mang lại niềm vui cho mọi người xung quanh là gì?',
    options: ['にこにこ (Niko-niko)', 'ゲラゲラ (Gera-gera)', 'クスリ (Kusuri)', 'ニヤニヤ (Niya-niya)'],
    correctIndex: 0,
    explanation: 'Niko-niko là nụ cười mỉm thân thiện, hiền hòa, rạng rỡ và tràn ngập thiện cảm.',
    audioVoiceHint: 'いつもニコニコしていて、すごく素敵な人だね！',
    deepExplanation: 'Nền tảng video nổi tiếng nhất Nhật Bản "Nico Nico Douga" được đặt theo từ này với mong muốn người xem luôn mỉm cười sảng khoái.',
  },
];
