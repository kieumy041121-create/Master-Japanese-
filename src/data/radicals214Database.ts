/**
 * BẢNG 214 BỘ THỦ HÁN TỰ CHUẨN XÁC & TỪ VỰNG JLPT ỨNG DỤNG
 * Trích xuất và tích hợp trọn vẹn từ tài liệu "Bảng Bộ Thủ (Bộ 1 - 214)"
 * Bao gồm:
 * 1. 214 Bộ Thủ phân chia theo số nét (1 nét đến 17 nét)
 * 2. Mẹo nhớ tượng hình / liên tưởng cho từng bộ thủ
 * 3. Mẹo phân biệt nhanh các bộ thủ dễ nhầm lẫn nhất (Thổ vs Sỹ, Nhật vs Viết, Thị vs Y, Phụ vs Ấp, Băng vs Thủy)
 * 4. Hệ thống Từ vựng JLPT (N5 - N1) ứng dụng trực tiếp từ bộ thủ
 */

export interface RadicalVocabApplication {
  kanji: string;
  hiragana: string;
  sinoVietnamese: string;
  meaning: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  breakdown: string;
  mnemonic: string;
}

export interface RadicalItem {
  stt: number;
  strokeCount: number;
  radical: string;
  variants?: string[];
  name: string;
  meaning: string;
  mnemonic: string;
  relatedVocab: RadicalVocabApplication[];
}

export interface ConfusingRadicalPair {
  title: string;
  item1: { radical: string; name: string; meaning: string; strokes: number };
  item2: { radical: string; name: string; meaning: string; strokes: number };
  distinctionRule: string;
  visualTip: string;
}

// Bảng mẹo phân biệt nhanh các bộ thủ dễ nhầm lẫn nhất (Trích xuất từ trang 37 của tài liệu)
export const CONFUSING_RADICAL_PAIRS: ConfusingRadicalPair[] = [
  {
    title: 'Bộ Thổ vs. Bộ Sỹ',
    item1: { radical: '土', name: 'Bộ Thổ', meaning: 'Đất', strokes: 3 },
    item2: { radical: '士', name: 'Bộ Sỹ', meaning: 'Kẻ sĩ', strokes: 3 },
    distinctionRule: 'Đất (Thổ) thì nền móng bên dưới phải rộng hơn (nét ngang dưới dài). Kẻ sĩ (Sỹ) đội mũ quan nên phần trên rộng hơn (nét ngang trên dài).',
    visualTip: 'Thổ: Dưới rộng vững chắc · Sỹ: Trên rộng đội mũ quan'
  },
  {
    title: 'Bộ Nhật vs. Bộ Viết',
    item1: { radical: '日', name: 'Bộ Nhật', meaning: 'Mặt trời, ngày', strokes: 4 },
    item2: { radical: '曰', name: 'Bộ Viết', meaning: 'Nói rằng', strokes: 4 },
    distinctionRule: 'Mặt trời mọc lên cao nên chữ Nhật thon dài theo chiều dọc. Khi nói thì miệng mở rộng sang hai bên nên chữ Viết bè ngang và lùn hơn.',
    visualTip: 'Nhật: Thon dài thẳng đứng · Viết: Bè ngang mở rộng'
  },
  {
    title: 'Bộ Thị vs. Bộ Y',
    item1: { radical: '礻 (示)', name: 'Bộ Thị (Kỳ)', meaning: 'Thần linh, lễ bái', strokes: 4 },
    item2: { radical: '衤 (衣)', name: 'Bộ Y', meaning: 'Quần áo, may mặc', strokes: 5 },
    distinctionRule: 'Khi may áo (Y) cần nhiều đường kim mũi chỉ hơn nên có 2 nét chấm/phẩy ở bên phải. Bàn thờ thần (Thị) trang nghiêm tối giản chỉ có 1 nét chấm bên phải.',
    visualTip: 'Thị (礻): 1 chấm phải (Thần trang nghiêm) · Y (衤): 2 nét phải (Đường kim mũi chỉ)'
  },
  {
    title: 'Bộ Phụ vs. Bộ Ấp (Trái Phụ – Phải Ấp)',
    item1: { radical: '阝 (trái / 阜)', name: 'Bộ Phụ', meaning: 'Đống đất, gò đồi', strokes: 8 },
    item2: { radical: '阝 (phải / 邑)', name: 'Bộ Ấp', meaning: 'Vùng đất, thành thị', strokes: 7 },
    distinctionRule: 'Phụ (Gò đất) luôn đứng bên Trái chữ Hán; Ấp (Vùng đất/Thành phố) luôn đứng bên Phải chữ Hán. Nhớ câu thần chú: "Trái Phụ – Phải Ấp".',
    visualTip: '阝 bên TRÁI = Phụ (Gò đồi leo dốc) · 阝 bên PHẢI = Ấp (Khu dân cư, xóm làng)'
  },
  {
    title: 'Bộ Băng vs. Bộ Thủy',
    item1: { radical: '冫', name: 'Bộ Băng', meaning: 'Nước đá, lạnh giá', strokes: 2 },
    item2: { radical: '氵 (水)', name: 'Bộ Thủy', meaning: 'Nước chảy, chất lỏng', strokes: 3 },
    distinctionRule: 'Nước (Thủy) có 3 giọt chảy linh hoạt; khi trời lạnh đóng thành Nước đá (Băng) thì cô đọng lại chỉ còn 2 giọt.',
    visualTip: '冫: 2 chấm đông cứng thành đá · 氵: 3 chấm tuôn trào linh hoạt'
  }
];

// Danh sách từ vựng JLPT ứng dụng từ bộ thủ Phần 2 trong tài liệu
export const JLPT_RADICAL_APPLICATIONS: RadicalVocabApplication[] = [
  // Nhóm Sơ Cấp (N5 - N4)
  {
    kanji: '休',
    hiragana: 'やすむ (yasumu)',
    sinoVietnamese: 'HƯU',
    meaning: 'Nghỉ ngơi, vắng mặt',
    level: 'N5',
    breakdown: '亻 (Nhân) + 木 (Mộc)',
    mnemonic: 'Người (亻) đứng tựa vào gốc cây (木) để nghỉ ngơi sau buổi lao động vất vả.'
  },
  {
    kanji: '林',
    hiragana: 'はやし (hayashi)',
    sinoVietnamese: 'LÂM',
    meaning: 'Rừng thưa, rặng cây',
    level: 'N4',
    breakdown: '木 (Mộc) + 木 (Mộc)',
    mnemonic: 'Hai cái cây (木) đứng cạnh nhau thành một khu rừng nhỏ râm mát.'
  },
  {
    kanji: '森',
    hiragana: 'もり (mori)',
    sinoVietnamese: 'SÂM',
    meaning: 'Rừng rậm, rừng nguyên sinh',
    level: 'N4',
    breakdown: '木 + 木 + 木 (Tam Mộc)',
    mnemonic: 'Ba cây (木) chụm lại thành khu rừng rậm rạp, bạt ngàn nhiều cây cối.'
  },
  {
    kanji: '語',
    hiragana: 'ご (go)',
    sinoVietnamese: 'NGÔN',
    meaning: 'Ngôn ngữ, tiếng nói',
    level: 'N5',
    breakdown: '言 (Ngôn) + 吾 (Ngũ)',
    mnemonic: 'Dùng lời nói, ngôn từ (言) để diễn đạt suy nghĩ của bản thân mình (吾).'
  },
  {
    kanji: '読む',
    hiragana: 'よむ (yomu)',
    sinoVietnamese: 'ĐỘC',
    meaning: 'Đọc sách, ngâm thơ',
    level: 'N5',
    breakdown: '言 (Ngôn) + 売 (Mại)',
    mnemonic: 'Dùng miệng phát ra lời nói (言) để đọc hiểu những tri thức lưu truyền.'
  },
  {
    kanji: '水',
    hiragana: 'みず (mizu)',
    sinoVietnamese: 'THỦY',
    meaning: 'Nước mát, nước lạnh',
    level: 'N5',
    breakdown: '氵 (Thủy - biến thể)',
    mnemonic: 'Hình ảnh dòng nước chảy uốn lượn tưới mát vạn vật trên mặt đất.'
  },
  {
    kanji: '火',
    hiragana: 'ひ (hi)',
    sinoVietnamese: 'HỎA',
    meaning: 'Ngọn lửa, ánh lửa',
    level: 'N5',
    breakdown: '火 (Hỏa)',
    mnemonic: 'Mô phỏng ngọn lửa đang bùng cháy dữ dội với các tàn lửa văng ra hai bên.'
  },

  // Nhóm Trung Cấp (N3 - N2)
  {
    kanji: '環境',
    hiragana: 'かんきょう (kankyo)',
    sinoVietnamese: 'HOÀN CẢNH',
    meaning: 'Môi trường sống, hoàn cảnh xung quanh',
    level: 'N3',
    breakdown: '土 (Thổ), 糸 (Mịch), 隹 (Truy)',
    mnemonic: 'Môi trường sống bao gồm đất đai (土), tự nhiên và muôn loài gắn kết bền chặt như sợi tơ (糸).'
  },
  {
    kanji: '経済',
    hiragana: 'けいざい (keizai)',
    sinoVietnamese: 'KINH TẾ',
    meaning: 'Kinh tế, tài chính quốc gia',
    level: 'N3',
    breakdown: '糸 (Mịch), 貝 (Bối)',
    mnemonic: 'Liên quan đến quản lý chuỗi cung ứng (糸) và dòng tiền bạc, tài sản (bộ 貝 - tiền cổ vỏ sò).'
  },
  {
    kanji: '複雑',
    hiragana: 'ふくざつ (fukuzatsu)',
    sinoVietnamese: 'PHỨC TẠP',
    meaning: 'Phức tạp, rắc rối, nan giải',
    level: 'N3',
    breakdown: '糸 (Mịch), 虫 (Trùng)',
    mnemonic: 'Sợi tơ (糸) bị rối tung lên chằng chịt như tổ sâu bọ (虫) đan cài vào nhau.'
  },
  {
    kanji: '決定',
    hiragana: 'けってい (kettei)',
    sinoVietnamese: 'QUYẾT ĐỊNH',
    meaning: 'Quyết định, phán quyết dứt khoát',
    level: 'N3',
    breakdown: '冫 (Băng), 凵 (Khảm), 戈 (Qua)',
    mnemonic: 'Dứt khoát dùng vũ khí (戈) chặt đứt mọi phân vân nghi ngại như đóng băng (冫).'
  },
  {
    kanji: '組織',
    hiragana: 'そしき (soshiki)',
    sinoVietnamese: 'TỔ CHỨC',
    meaning: 'Tổ chức, bộ máy điều hành',
    level: 'N2',
    breakdown: '糸 (Mịch), 戈 (Qua)',
    mnemonic: 'Các thành viên và phòng ban được đan cài liên kết bền chặt như những sợi tơ dệt (糸).'
  },
  {
    kanji: '影響',
    hiragana: 'えいきょう (eikyo)',
    sinoVietnamese: 'ẢNH HƯỞNG',
    meaning: 'Tác động, tầm ảnh hưởng sâu rộng',
    level: 'N2',
    breakdown: '彡 (Sam), 聿 (Duật)',
    mnemonic: 'Lời nói và hành động cầm bút (聿) lan tỏa ánh sáng rực rỡ (彡) tạo tác động vang dội.'
  },
  {
    kanji: '矛盾',
    hiragana: 'むじゅん (mujun)',
    sinoVietnamese: 'MÂU THUẪN',
    meaning: 'Mâu thuẫn, trái ngược nhau',
    level: 'N2',
    breakdown: '矛 (Mâu), 盾 (Thuẫn)',
    mnemonic: 'Cây giáo (矛) sắc nhất chọc vào cái khiên (盾) kiên cố nhất xem cái nào thắng.'
  },

  // Nhóm Cao Cấp (N1)
  {
    kanji: '巧妙',
    hiragana: 'こうみょう (kōmyō)',
    sinoVietnamese: 'XẢO DIỆU',
    meaning: 'Khéo léo, tinh vi, tài tình',
    level: 'N1',
    breakdown: '弓 (Cung), 女 (Nữ)',
    mnemonic: 'Kỹ năng uyển chuyển, tinh tế mềm mại như đường cong cây cung (弓) và người phụ nữ (女).'
  },
  {
    kanji: '葛藤',
    hiragana: 'かっとう (kattō)',
    sinoVietnamese: 'CÁT ĐẰNG',
    meaning: 'Xung đột tâm lý, giằng xé nội tâm',
    level: 'N1',
    breakdown: '艹 (Thảo), 骨 (Cốt)',
    mnemonic: 'Dây leo gai góc (艹) quấn chặt vào tận xương cốt (骨), gây đau đớn, dằn vặt nội tâm.'
  },
  {
    kanji: '隠蔽',
    hiragana: 'いんぺい (inpei)',
    sinoVietnamese: 'ẨN BẾ',
    meaning: 'Che giấu, bưng bít sự thật',
    level: 'N1',
    breakdown: '阝 (Phụ/Ấp), 攴 (Phộc)',
    mnemonic: 'Dùng gò đất vách núi (阝) và hành động che đậy (攴) để che khuất đi sự thật.'
  },
  {
    kanji: '窒息',
    hiragana: 'ちっそく (chissoku)',
    sinoVietnamese: 'TRỐC TỨC',
    meaning: 'Ngạt thở, nghẹt thở',
    level: 'N1',
    breakdown: '穴 (Huyệt), 至 (Chí)',
    mnemonic: 'Đi sâu đến tận cùng (至) của hang động (穴) không có dưỡng khí dẫn đến ngạt thở.'
  },
  {
    kanji: '躊躇',
    hiragana: 'ちゅうちょ (chūcho)',
    sinoVietnamese: 'TRÙ TRỪ',
    meaning: 'Do dự, lưỡng lự, chần chừ',
    level: 'N1',
    breakdown: '足 (Túc - Chân)',
    mnemonic: 'Bộ chân (足) muốn bước đi nhưng cứ chần chừ, tiến rồi lại thoái lui.'
  },
  {
    kanji: '摩擦',
    hiragana: 'まさつ (masatsu)',
    sinoVietnamese: 'MA SÁT',
    meaning: 'Ma sát cơ học, va chạm xích mích',
    level: 'N1',
    breakdown: '手 (Thủ - Tay), 麻 (Ma - Cây gai)',
    mnemonic: 'Hai bàn tay (手) chà xát vào cây gai (麻) tạo ra sức nóng ma sát dữ dội.'
  },
  {
    kanji: '踏襲',
    hiragana: 'とうしゅう (tōshū)',
    sinoVietnamese: 'ĐẠP TẬP',
    meaning: 'Đi theo lối cũ, kế thừa tiền lệ',
    level: 'N1',
    breakdown: '足 (Túc), 酉 (Dậu)',
    mnemonic: 'Dùng đôi chân (足) bước tiếp theo đúng lối mòn, khuôn mẫu sẵn có của tiền nhân.'
  }
];

// Danh sách đầy đủ 214 Bộ Thủ Hán Tự (STT 1 -> 214)

// Danh sách đầy đủ 214 Bộ Thủ Hán Tự (STT 1 -> 214) với hệ thống từ vựng ứng dụng phong phú (mỗi bộ 10 từ trở lên)
export const RADICALS_214_DATA: RadicalItem[] = [
  // Nhóm 1 nét (Bộ 1 – 6)
  {
    stt: 1,
    strokeCount: 1,
    radical: '一',
    name: 'Nhất',
    meaning: 'Số một',
    mnemonic: 'Một vạch ngang duy nhất biểu thị cội nguồn sơ khai.',
    relatedVocab: [
      { kanji: '一人', hiragana: 'ひとり (hitori)', sinoVietnamese: 'NHẤT NHÂN', meaning: 'Một người, một mình', level: 'N5', breakdown: '一 (Nhất) + 人 (Nhân)', mnemonic: 'Một người đứng giữa trời đất.' },
      { kanji: '一日', hiragana: 'ついたち / いちにち', sinoVietnamese: 'NHẤT NHẬT', meaning: 'Ngày mùng 1 / một ngày', level: 'N5', breakdown: '一 (Nhất) + 日 (Nhật)', mnemonic: 'Ngày đầu tiên của tháng.' },
      { kanji: '一番', hiragana: 'いちばん (ichiban)', sinoVietnamese: 'NHẤT PHIÊN', meaning: 'Nhất, số một, tuyệt nhất', level: 'N5', breakdown: '一 (Nhất) + 番 (Phiên)', mnemonic: 'Lượt thứ nhất là đứng đầu.' },
      { kanji: '一緒', hiragana: 'いっしょ (issho)', sinoVietnamese: 'NHẤT TỰ', meaning: 'Cùng nhau, chung nhau', level: 'N5', breakdown: '一 (Nhất) + 緒 (Tự)', mnemonic: 'Cùng chung một mối dây liên kết.' },
      { kanji: '一度', hiragana: 'いちど (ichido)', sinoVietnamese: 'NHẤT ĐỘ', meaning: 'Một lần, một dịp', level: 'N5', breakdown: '一 (Nhất) + 度 (Độ)', mnemonic: 'Một lần trải nghiệm trong đời.' },
      { kanji: '一般', hiragana: 'いっぱん (ippan)', sinoVietnamese: 'NHẤT BÀN', meaning: 'Phổ biến, thông thường', level: 'N3', breakdown: '一 (Nhất) + 般 (Bàn)', mnemonic: 'Chung một dạng thức phổ thông.' },
      { kanji: '一生懸命', hiragana: 'いっしょうけんめい (isshōkenmei)', sinoVietnamese: 'NHẤT SINH HUYỀN MỆNH', meaning: 'Hết sức, cố gắng hết mình', level: 'N4', breakdown: '一 + 生 + 懸 + 命', mnemonic: 'Cược cả mạng sống làm trọn một đời.' },
      { kanji: '一致', hiragana: 'いっち (icchi)', sinoVietnamese: 'NHẤT TRÍ', meaning: 'Thống nhất, ăn khớp', level: 'N2', breakdown: '一 (Nhất) + 致 (Trí)', mnemonic: 'Đưa đến một kết quả thống nhất.' },
      { kanji: '一瞬', hiragana: 'いっしゅん (isshun)', sinoVietnamese: 'NHẤT THUẤN', meaning: 'Một khoảnh khắc, chớp mắt', level: 'N3', breakdown: '一 (Nhất) + 瞬 (Thuấn)', mnemonic: 'Chớp mắt một cái thoáng qua.' },
      { kanji: '同一', hiragana: 'どういつ (dōitsu)', sinoVietnamese: 'ĐỒNG NHẤT', meaning: 'Cùng một thứ, giống hệt', level: 'N2', breakdown: '同 (Đồng) + 一 (Nhất)', mnemonic: 'Đồng nhất làm một thể.' },
      { kanji: '統一', hiragana: 'とういつ (tōitsu)', sinoVietnamese: 'THỐNG NHẤT', meaning: 'Thống nhất, quy về một mối', level: 'N2', breakdown: '統 (Thống) + 一 (Nhất)', mnemonic: 'Hợp nhất giang sơn về một mối.' }
    ]
  },
  {
    stt: 2,
    strokeCount: 1,
    radical: '丨',
    name: 'Cổn',
    meaning: 'Nét sổ thẳng',
    mnemonic: 'Cây gậy dựng thẳng đứng từ trên xuống.',
    relatedVocab: [
      { kanji: '中', hiragana: 'なか (naka)', sinoVietnamese: 'TRUNG', meaning: 'Bên trong, ở giữa', level: 'N5', breakdown: '丨 (Cổn) xuyên qua 口 (Khẩu)', mnemonic: 'Nét sổ thẳng đứng đâm xuyên qua hồng tâm.' },
      { kanji: '中心', hiragana: 'ちゅうしん (chūshin)', sinoVietnamese: 'TRUNG TÂM', meaning: 'Trung tâm, trọng tâm', level: 'N3', breakdown: '中 (Trung) + 心 (Tâm)', mnemonic: 'Tâm điểm chính giữa.' },
      { kanji: '中学', hiragana: 'ちゅうがく (chūgaku)', sinoVietnamese: 'TRUNG HỌC', meaning: 'Trường cấp 2', level: 'N5', breakdown: '中 (Trung) + 学 (Học)', mnemonic: 'Bậc học ở giữa tiểu học và đại học.' },
      { kanji: '串', hiragana: 'くし (kushi)', sinoVietnamese: 'XUYẾN', meaning: 'Xiên nướng, que xiên', level: 'N1', breakdown: 'Nét sổ 丨 xuyên 2 chữ 口', mnemonic: 'Cây xiên cắm xuyên qua hai miếng thịt.' },
      { kanji: '旧', hiragana: 'きゅう (kyū)', sinoVietnamese: 'CỰU', meaning: 'Cũ kỹ, ngày xưa', level: 'N3', breakdown: '丨 (Cổn) + 日 (Nhật)', mnemonic: 'Mặt trời cũ của ngày hôm qua.' },
      { kanji: '申す', hiragana: 'もうす (mōsu)', sinoVietnamese: 'THÂN', meaning: 'Nói, thưa (khiêm nhường ngữ)', level: 'N4', breakdown: '丨 (Cổn) xuyên qua Điền', mnemonic: 'Cột sét thẳng đứng truyền đạt ý trời.' },
      { kanji: '由', hiragana: 'よし / ゆう (yū)', sinoVietnamese: 'DO', meaning: 'Bởi vì, nguồn cơn, lý do', level: 'N3', breakdown: '丨 (Cổn) nhô lên từ Điền', mnemonic: 'Mầm cây thẳng đứng mọc từ đất ra.' },
      { kanji: '自由', hiragana: 'じゆう (jiyū)', sinoVietnamese: 'TỰ DO', meaning: 'Tự do, không bị gò bó', level: 'N4', breakdown: '自 (Tự) + 由 (Do)', mnemonic: 'Tự mình định đoạt mọi sự.' },
      { kanji: '甲', hiragana: 'こう (kō)', sinoVietnamese: 'GIÁP', meaning: 'Vỏ giáp, ngôi thứ nhất thiên can', level: 'N1', breakdown: 'Điền có nét sổ 丨 xuống dưới', mnemonic: 'Chiếc áo giáp che thân thẳng đứng.' },
      { kanji: '引く', hiragana: 'ひく (hiku)', sinoVietnamese: 'DẪN', meaning: 'Kéo, tra từ điển', level: 'N5', breakdown: '弓 (Cung) + 丨 (Cổn)', mnemonic: 'Kéo thẳng dây cung để bắn tên.' }
    ]
  },
  {
    stt: 3,
    strokeCount: 1,
    radical: '丶',
    name: 'Chủ',
    meaning: 'Điểm, chấm',
    mnemonic: 'Một dấu chấm nhỏ như giọt nước hay ngọn đèn.',
    relatedVocab: [
      { kanji: '丸', hiragana: 'まる (maru)', sinoVietnamese: 'HOÀN', meaning: 'Hình tròn, viên tròn', level: 'N4', breakdown: '九 (Cửu) thêm nét 丶', mnemonic: 'Một viên tròn hoàn chỉnh có chấm tâm.' },
      { kanji: '丸い', hiragana: 'まるい (marui)', sinoVietnamese: 'HOÀN', meaning: 'Tròn trịa', level: 'N5', breakdown: '丸 (Hoàn) + い', mnemonic: 'Hình cầu tròn xinh xắn.' },
      { kanji: '主', hiragana: 'ぬし / おも (omo)', sinoVietnamese: 'CHỦ', meaning: 'Chủ nhân, chủ yếu', level: 'N4', breakdown: 'Vương có dấu chấm 丶 trên đầu', mnemonic: 'Vua đội ngọn đèn soi sáng dẫn đường.' },
      { kanji: '主人', hiragana: 'しゅじん (shujin)', sinoVietnamese: 'CHỦ NHÂN', meaning: 'Chồng mình, chủ nhân', level: 'N4', breakdown: '主 (Chủ) + 人 (Nhân)', mnemonic: 'Người trụ cột làm chủ gia đình.' },
      { kanji: '主に', hiragana: 'おもに (omoni)', sinoVietnamese: 'CHỦ', meaning: 'Chủ yếu, phần lớn', level: 'N3', breakdown: '主 (Chủ) + に', mnemonic: 'Tập trung vào phần then chốt.' },
      { kanji: '玉', hiragana: 'たま (tama)', sinoVietnamese: 'NGỌC', meaning: 'Viên ngọc, quả bóng', level: 'N4', breakdown: 'Vương thêm chấm 丶', mnemonic: 'Chữ Vương thêm đốm ngọc lấp lánh.' },
      { kanji: '刃', hiragana: 'は / やいば (yaiba)', sinoVietnamese: 'NHẬN', meaning: 'Lưỡi dao, mép sắc', level: 'N2', breakdown: '刀 (Đao) thêm chấm 丶', mnemonic: 'Dấu chấm chỉ đúng mép sắc của thanh gươm.' },
      { kanji: '丹', hiragana: 'たん (tan)', sinoVietnamese: 'ĐAN', meaning: 'Màu đỏ đan sa, lòng chân thành', level: 'N1', breakdown: 'Mỏ quặng có chấm 丶 chu sa', mnemonic: 'Viên chu sa đỏ thắm quý hiếm.' },
      { kanji: '寸', hiragana: 'すん (sun)', sinoVietnamese: 'THỐN', meaning: 'Tấc, đơn vị đo ngắn', level: 'N2', breakdown: 'Thập có chấm 丶 đo mạch cổ tay', mnemonic: 'Đặt một chấm ngón tay bắt mạch tấc.' },
      { kanji: '太い', hiragana: 'ふとい (futoi)', sinoVietnamese: 'THÁI', meaning: 'Mập, béo, dày dặn', level: 'N5', breakdown: '大 (Đại) thêm chấm 丶', mnemonic: 'To lớn lại có thêm phần thịt đẫy đà.' }
    ]
  },
  {
    stt: 4,
    strokeCount: 1,
    radical: '丿',
    name: 'Phiệt',
    meaning: 'Nét sổ xiên qua trái',
    mnemonic: 'Nét phẩy giống nhát chém nghiêng sang trái.',
    relatedVocab: [
      { kanji: '千', hiragana: 'せん (sen)', sinoVietnamese: 'THIÊN', meaning: 'Một nghìn (1.000)', level: 'N5', breakdown: '丿 (Phiệt) + 十 (Thập)', mnemonic: 'Thập (10) có nét phẩy biểu thị số nghìn.' },
      { kanji: '升', hiragana: 'ます (masu)', sinoVietnamese: 'THĂNG', meaning: 'Đấu đong gạo, hộp đong rượu', level: 'N1', breakdown: 'Thập thêm phẩy xiên 丿', mnemonic: 'Gạt xiên miệng đấu đong thóc.' },
      { kanji: '生', hiragana: 'なま / せい (sei)', sinoVietnamese: 'SINH', meaning: 'Sống, tươi sống, sinh ra', level: 'N5', breakdown: 'Mầm cây nảy mầm với nét phẩy 丿', mnemonic: 'Mầm non vươn cành nghiêng đón nắng.' },
      { kanji: '年', hiragana: 'とし / ねん (nen)', sinoVietnamese: 'NIÊN', meaning: 'Năm, tuổi tác', level: 'N5', breakdown: 'Bông lúa trĩu hạt có nét phẩy 丿', mnemonic: 'Năm được mùa lúa trĩu bông đón Tết.' },
      { kanji: '手', hiragana: 'て (te)', sinoVietnamese: 'THỦ', meaning: 'Bàn tay', level: 'N5', breakdown: 'Ngón tay vung phẩy 丿 làm việc', mnemonic: 'Đôi bàn tay cần cù khéo léo.' },
      { kanji: '毛', hiragana: 'け (ke)', sinoVietnamese: 'MAO', meaning: 'Lông, sợi tóc, lông thú', level: 'N4', breakdown: 'Nét phẩy 丿 tạo hình sợi lông tơ', mnemonic: 'Những sợi lông phẩy nhẹ trong gió.' },
      { kanji: '白', hiragana: 'しろ (shiro)', sinoVietnamese: 'BẠCH', meaning: 'Màu trắng, trong sáng', level: 'N5', breakdown: 'Hạt thóc có phẩy mầm trắng 丿', mnemonic: 'Hạt gạo trắng ngần vừa bóc vỏ.' },
      { kanji: '私', hiragana: 'わたし (watashi)', sinoVietnamese: 'TƯ', meaning: 'Tôi, bản thân mình', level: 'N5', breakdown: '禾 (Hòa) + 厶 (Khư) có phẩy 丿', mnemonic: 'Phần lúa riêng tư của chính mình.' },
      { kanji: '重い', hiragana: 'おもい (omoi)', sinoVietnamese: 'TRỌNG', meaning: 'Nặng nề, quan trọng', level: 'N5', breakdown: 'Đoàn xe chở nặng có phẩy 丿', mnemonic: 'Hàng hóa nặng trĩu trên vai.' },
      { kanji: '利く', hiragana: 'きく (kiku)', sinoVietnamese: 'LỢI', meaning: 'Có tác dụng, linh hoạt', level: 'N3', breakdown: 'Hòa (禾) có phẩy + Đao (刂)', mnemonic: 'Cắt tỉa lúa gọn gàng đem lại lợi ích.' }
    ]
  },
  {
    stt: 5,
    strokeCount: 1,
    radical: '乙',
    variants: ['⺄'],
    name: 'Ất',
    meaning: 'Vị trí thứ 2 trong thiên can',
    mnemonic: 'Hình dáng con vịt đang bơi hoặc mầm cây uốn cong vươn lên.',
    relatedVocab: [
      { kanji: '乱', hiragana: 'みだれる (midareru)', sinoVietnamese: 'LOẠN', meaning: 'Hỗn loạn, lộn xộn', level: 'N3', breakdown: '舌 (Thiệt) + 乙 (Ất)', mnemonic: 'Lời nói uốn éo gây nên hỗn loạn.' },
      { kanji: '乱暴', hiragana: 'らんぼう (ranbō)', sinoVietnamese: 'LOẠN BẠO', meaning: 'Hung bạo, thô lỗ', level: 'N3', breakdown: '乱 (Loạn) + 暴 (Bạo)', mnemonic: 'Hành vi cộc cằn phá phách.' },
      { kanji: '混乱', hiragana: 'こんらん (konran)', sinoVietnamese: 'HỖN LOẠN', meaning: 'Hỗn độn, bối rối', level: 'N2', breakdown: '混 (Hỗn) + 乱 (Loạn)', mnemonic: 'Tình hình xáo trộn mất kiểm soát.' },
      { kanji: '九', hiragana: 'きゅう / く (kyū)', sinoVietnamese: 'CỬU', meaning: 'Số 9', level: 'N5', breakdown: 'Nét uốn lượn hình chữ 乙', mnemonic: 'Con số chín uốn khúc linh hoạt.' },
      { kanji: '乞う', hiragana: 'こう (kou)', sinoVietnamese: 'KHẤT', meaning: 'Cầu xin, thỉnh cầu', level: 'N1', breakdown: 'Người cúi mình uốn gập chữ 乙', mnemonic: 'Cúi đầu khẩn thiết xin tha thứ.' },
      { kanji: '乾く', hiragana: 'かわく (kawaku)', sinoVietnamese: 'CAN', meaning: 'Khô ráo, cạn nước', level: 'N4', breakdown: 'Thập nhật + 乙', mnemonic: 'Ánh mặt trời làm khô cong queo.' },
      { kanji: '乳', hiragana: 'ちち / にゅう (nyū)', sinoVietnamese: 'NHŨ', meaning: 'Sữa mẹ, vú', level: 'N3', breakdown: 'Trảo + 乙 bế con bú mớm', mnemonic: 'Bàn tay người mẹ nâng niu cho con bú dòng sữa mát.' },
      { kanji: '孔', hiragana: 'あな / こう (kō)', sinoVietnamese: 'KHỔNG', meaning: 'Cái lỗ, Khổng Tử', level: 'N1', breakdown: 'Tử (子) + 乙 (Ất)', mnemonic: 'Đứa trẻ chui qua lỗ hổng.' },
      { kanji: '札', hiragana: 'ふだ / さつ (satsu)', sinoVietnamese: 'TRÁT', meaning: 'Tờ tiền, thẻ bài, nhãn', level: 'N3', breakdown: 'Mộc (木) + 乙 (Ất)', mnemonic: 'Thẻ gỗ uốn lượn ghi tên hàng.' },
      { kanji: '礼', hiragana: 'れい (rei)', sinoVietnamese: 'LỄ', meaning: 'Lễ phép, cảm ơn, cúi chào', level: 'N4', breakdown: 'Thị (礻) + 乙 (Ất)', mnemonic: 'Lễ nghi trang trọng khi hành lễ.' }
    ]
  },
  {
    stt: 6,
    strokeCount: 1,
    radical: '亅',
    name: 'Quyết',
    meaning: 'Nét sổ có móc',
    mnemonic: 'Hình chiếc lưỡi câu cá có ngạnh móc ở dưới.',
    relatedVocab: [
      { kanji: '了', hiragana: 'りょう (ryō)', sinoVietnamese: 'LIỄU', meaning: 'Xong, kết thúc, hiểu rõ', level: 'N2', breakdown: 'Nét móc 亅 ở đuôi', mnemonic: 'Mọi việc đã kết thúc vẹn toàn.' },
      { kanji: '了解', hiragana: 'りょうかい (ryōkai)', sinoVietnamese: 'LIỄU GIẢI', meaning: 'Đã hiểu rõ, tiếp nhận', level: 'N3', breakdown: '了 (Liễu) + 解 (Giải)', mnemonic: 'Đã nắm bắt và giải tỏa khúc mắc.' },
      { kanji: '終了', hiragana: 'しゅうりょう (shūryō)', sinoVietnamese: 'CHUNG LIỄU', meaning: 'Kết thúc, hoàn tất', level: 'N3', breakdown: '終 (Chung) + 了 (Liễu)', mnemonic: 'Khép lại một chặng đường trọn vẹn.' },
      { kanji: '完了', hiragana: 'かんりょう (kanryō)', sinoVietnamese: 'HOÀN LIỄU', meaning: 'Hoàn thành nhiệm vụ', level: 'N2', breakdown: '完 (Hoàn) + 了 (Liễu)', mnemonic: 'Nhiệm vụ đã hoàn thiện chu toàn.' },
      { kanji: '事', hiragana: 'こと / じ (ji)', sinoVietnamese: 'SỰ', meaning: 'Công việc, sự việc', level: 'N5', breakdown: 'Ghi chép công việc có nét móc 亅', mnemonic: 'Tay cầm thẻ tre giải quyết công việc.' },
      { kanji: '仕事', hiragana: 'しごと (shigoto)', sinoVietnamese: 'SĨ SỰ', meaning: 'Công việc, nghề nghiệp', level: 'N5', breakdown: '仕 (Sĩ) + 事 (Sự)', mnemonic: 'Công việc mưu sinh hàng ngày.' },
      { kanji: '予', hiragana: 'よ (yo)', sinoVietnamese: 'DỰ', meaning: 'Dự định, chuẩn bị trước', level: 'N4', breakdown: 'Móc 亅 chuẩn bị trước', mnemonic: 'Lên kế hoạch dự liệu chu đáo.' },
      { kanji: '予定', hiragana: 'よてい (yotei)', sinoVietnamese: 'DỰ ĐỊNH', meaning: 'Kế hoạch, lịch trình', level: 'N4', breakdown: '予 (Dự) + 定 (Định)', mnemonic: 'Lịch trình đã sắp xếp sẵn.' },
      { kanji: '争う', hiragana: 'あらそう (arasou)', sinoVietnamese: 'TRANH', meaning: 'Tranh đấu, cạnh tranh', level: 'N3', breakdown: 'Hai tay tranh móc 亅 chiếc gậy', mnemonic: 'Tranh giành phần thắng về mình.' },
      { kanji: '矛', hiragana: 'ほこ (hoko)', sinoVietnamese: 'MÂU', meaning: 'Ngọn giáo mâu có móc 亅', level: 'N1', breakdown: 'Cây giáo có lưỡi móc 亅', mnemonic: 'Binh khí mũi nhọn có ngạnh móc.' }
    ]
  },
  // Nhóm 2 nét (Bộ 7 – 29)
  {
    stt: 7,
    strokeCount: 2,
    radical: '二',
    name: 'Nhị',
    meaning: 'Số hai',
    mnemonic: 'Hai gạch ngang song song biểu thị số 2.',
    relatedVocab: [
      { kanji: '二', hiragana: 'に (ni)', sinoVietnamese: 'NHỊ', meaning: 'Số hai (2)', level: 'N5', breakdown: 'Hai vạch ngang song song', mnemonic: 'Hai nét ngang biểu thị đất và trời.' },
      { kanji: '二月', hiragana: 'にがつ (nigatsu)', sinoVietnamese: 'NHỊ NGUYỆT', meaning: 'Tháng 2', level: 'N5', breakdown: '二 (Nhị) + 月 (Nguyệt)', mnemonic: 'Tháng thứ hai trong năm.' },
      { kanji: '二人', hiragana: 'ふたり (futari)', sinoVietnamese: 'NHỊ NHÂN', meaning: 'Hai người, cặp đôi', level: 'N5', breakdown: '二 (Nhị) + 人 (Nhân)', mnemonic: 'Hai người sánh bước cùng nhau.' },
      { kanji: '二十日', hiragana: 'はつか (hatsuka)', sinoVietnamese: 'NHỊ THẬP NHẬT', meaning: 'Ngày 20 / 20 ngày', level: 'N5', breakdown: '二 (Nhị) + 十 (Thập) + 日 (Nhật)', mnemonic: 'Cột mốc ngày 20 trong tháng.' },
      { kanji: '二十歳', hiragana: 'はたち (hatachi)', sinoVietnamese: 'NHỊ THẬP TUẾ', meaning: 'Hai mươi tuổi (Lễ trưởng thành)', level: 'N4', breakdown: '二 (Nhị) + 十 (Thập) + 歳 (Tuế)', mnemonic: 'Tuổi 20 thanh xuân của người Nhật.' },
      { kanji: '二階', hiragana: 'にかい (nikai)', sinoVietnamese: 'NHỊ GIAI', meaning: 'Tầng hai (2F)', level: 'N5', breakdown: '二 (Nhị) + 階 (Giai)', mnemonic: 'Tầng lầu thứ hai trong tòa nhà.' },
      { kanji: '互いに', hiragana: 'たがいに (tagaini)', sinoVietnamese: 'HỖ', meaning: 'Lẫn nhau, qua lại', level: 'N3', breakdown: 'Chữ Hỗ biến thể từ 二', mnemonic: 'Hai bên tương hỗ giúp đỡ nhau.' },
      { kanji: '五', hiragana: 'ご (go)', sinoVietnamese: 'NGŨ', meaning: 'Số 5', level: 'N5', breakdown: 'Giữa hai nét ngang 二 có giao điểm', mnemonic: 'Số 5 trung hòa ngũ hành.' },
      { kanji: '井戸', hiragana: 'いど (ido)', sinoVietnamese: 'TỈNH HỘ', meaning: 'Giếng nước', level: 'N2', breakdown: 'Khung giếng có hai vạch ngang 二', mnemonic: 'Thành giếng đào sâu hút dòng nước mát.' },
      { kanji: '元', hiragana: 'もと / げん (gen)', sinoVietnamese: 'NGUYÊN', meaning: 'Nguồn gốc, nguyên khí', level: 'N4', breakdown: 'Nhị (二) ở trên đầu + Nhi (儿)', mnemonic: 'Khởi đầu nguồn cội của con người.' }
    ]
  },
  {
    stt: 8,
    strokeCount: 2,
    radical: '亠',
    name: 'Đầu',
    meaning: 'Không có nghĩa (nắp đậy)',
    mnemonic: 'Nằm ở trên đầu chữ Hán, trông như chiếc nắp nồi.',
    relatedVocab: [
      { kanji: '京', hiragana: 'きょう (kyō)', sinoVietnamese: 'KINH', meaning: 'Kinh đô, thành phố lớn', level: 'N4', breakdown: '亠 (Đầu) + Khẩu + Tiểu', mnemonic: 'Tòa thành uy nghi nơi kinh đô rực rỡ.' },
      { kanji: '東京', hiragana: 'とうきょう (tōkyō)', sinoVietnamese: 'ĐÔNG KINH', meaning: 'Thủ đô Tokyo', level: 'N5', breakdown: '東 (Đông) + 京 (Kinh)', mnemonic: 'Thủ đô sầm uất phía Đông nước Nhật.' },
      { kanji: '京都', hiragana: 'きょうと (kyōto)', sinoVietnamese: 'KINH ĐÔ', meaning: 'Cố đô Kyoto', level: 'N5', breakdown: '京 (Kinh) + 都 (Đô)', mnemonic: 'Cố đô cổ kính ngàn năm văn hiến.' },
      { kanji: '高い', hiragana: 'たかい (takai)', sinoVietnamese: 'CAO', meaning: 'Cao, đắt tiền', level: 'N5', breakdown: '亠 (Đầu) + Khẩu + Quynh + Khẩu', mnemonic: 'Tòa tháp cao chọc trời.' },
      { kanji: '高校', hiragana: 'こうこう (kōkō)', sinoVietnamese: 'CAO HIỆU', meaning: 'Trường cấp 3 (THPT)', level: 'N5', breakdown: '高 (Cao) + 校 (Hiệu)', mnemonic: 'Ngôi trường đào tạo bậc trung học phổ thông.' },
      { kanji: '市', hiragana: 'し / いち (ichi)', sinoVietnamese: 'THỊ', meaning: 'Thành phố, khu chợ', level: 'N4', breakdown: '亠 (Đầu) + Cân (巾)', mnemonic: 'Mái lều chợ buôn bán đông đúc.' },
      { kanji: '夜', hiragana: 'よる / や (ya)', sinoVietnamese: 'DẠ', meaning: 'Đêm tối, ban đêm', level: 'N4', breakdown: '亠 (Đầu) + Hựu', mnemonic: 'Dưới bóng đêm trùm xuống bầu trời.' },
      { kanji: '夜中', hiragana: 'よなか (yonaka)', sinoVietnamese: 'DẠ TRUNG', meaning: 'Nửa đêm, khuya khoắt', level: 'N4', breakdown: '夜 (Dạ) + 中 (Trung)', mnemonic: 'Khoảnh khắc nửa đêm thanh vắng.' },
      { kanji: '交通', hiragana: 'こうつう (kōtsū)', sinoVietnamese: 'GIAO THÔNG', meaning: 'Giao thông, đi lại', level: 'N4', breakdown: '交 (Giao) có bộ 亠 + 通 (Thông)', mnemonic: 'Xe cộ qua lại thông suốt.' },
      { kanji: '亡くなる', hiragana: 'なくなる (nakunaru)', sinoVietnamese: 'VONG', meaning: 'Qua đời, mất', level: 'N3', breakdown: '亠 (Đầu) + Ẩn', mnemonic: 'Linh hồn bay lên trời cao.' }
    ]
  },
  {
    stt: 9,
    strokeCount: 2,
    radical: '人',
    variants: ['亻'],
    name: 'Nhân',
    meaning: 'Người',
    mnemonic: 'Hình dáng một người đang bước đi với hai chân dang rộng vững chãi.',
    relatedVocab: [
      { kanji: '休む', hiragana: 'やすむ (yasumu)', sinoVietnamese: 'HƯU', meaning: 'Nghỉ ngơi, vắng mặt', level: 'N5', breakdown: '亻 (Nhân) + 木 (Mộc)', mnemonic: 'Người tựa vào cây nghỉ ngơi.' },
      { kanji: '働く', hiragana: 'はたらく (hataraku)', sinoVietnamese: 'ĐỘNG', meaning: 'Làm việc, lao động', level: 'N5', breakdown: '亻 (Nhân) + 動 (Động)', mnemonic: 'Người vận động tạo ra của cải.' },
      { kanji: '人間', hiragana: 'にんげん (ningen)', sinoVietnamese: 'NHÂN GIAN', meaning: 'Con người, nhân loại', level: 'N4', breakdown: '人 (Nhân) + 間 (Gian)', mnemonic: 'Con người trong cõi nhân gian.' },
      { kanji: '体', hiragana: 'からだ (karada)', sinoVietnamese: 'THỂ', meaning: 'Cơ thể, thân thể', level: 'N5', breakdown: '亻 (Nhân) + 本 (Bản)', mnemonic: 'Thân thể là vốn quý của con người.' },
      { kanji: '住む', hiragana: 'すむ (sumu)', sinoVietnamese: 'TRÚ', meaning: 'Sinh sống, cư ngụ', level: 'N5', breakdown: '亻 (Nhân) + 主 (Chủ)', mnemonic: 'Người làm chủ nơi chốn mình sống.' },
      { kanji: '作る', hiragana: 'つくる (tsukuru)', sinoVietnamese: 'TÁC', meaning: 'Làm ra, chế tạo', level: 'N5', breakdown: '亻 (Nhân) + Tạc', mnemonic: 'Bàn tay con người tạo ra sản phẩm.' },
      { kanji: '使う', hiragana: 'つかう (tsukau)', sinoVietnamese: 'SỬ', meaning: 'Sử dụng, dùng', level: 'N5', breakdown: '亻 (Nhân) + Lại', mnemonic: 'Người sai phái dùng công cụ.' },
      { kanji: '信じる', hiragana: 'しんじる (shinjiru)', sinoVietnamese: 'TÍN', meaning: 'Tin tưởng, tin cậy', level: 'N3', breakdown: '亻 (Nhân) + 言 (Ngôn)', mnemonic: 'Lời nói của người đáng tin cậy.' },
      { kanji: '仲間', hiragana: 'なかま (nakama)', sinoVietnamese: 'TRỌNG GIAN', meaning: 'Bạn bè đồng hành, hội bạn', level: 'N3', breakdown: '仲 (Trọng) + 間 (Gian)', mnemonic: 'Tình bạn gắn bó keo sơn.' },
      { kanji: '位置', hiragana: 'いち (ichi)', sinoVietnamese: 'VỊ TRÍ', meaning: 'Vị trí, địa điểm', level: 'N3', breakdown: '位 (Vị) có 亻 + 置 (Trí)', mnemonic: 'Vị thế đứng của một con người.' },
      { kanji: '伝える', hiragana: 'つたえる (tsutaeru)', sinoVietnamese: 'TRUYỀN', meaning: 'Truyền đạt, truyền bá', level: 'N4', breakdown: '亻 (Nhân) + Chuyên', mnemonic: 'Người truyền lời tới người khác.' },
      { kanji: '倒れる', hiragana: 'たおれる (taoreru)', sinoVietnamese: 'ĐẢO', meaning: 'Ngã xuống, đổ bệnh', level: 'N3', breakdown: '亻 (Nhân) + Đáo', mnemonic: 'Người kiệt sức ngã quỵ xuống đất.' },
      { kanji: '優しい', hiragana: 'やさしい (yasashii)', sinoVietnamese: 'ƯU', meaning: 'Hiền từ, dịu dàng', level: 'N4', breakdown: '亻 (Nhân) + Ưu', mnemonic: 'Người có trái tim ấm áp bao dung.' },
      { kanji: '億', hiragana: 'おく (oku)', sinoVietnamese: 'ỨC', meaning: 'Một trăm triệu (100.000.000)', level: 'N4', breakdown: '亻 (Nhân) + Ý (Ý)', mnemonic: 'Ý chí người vươn tới trăm triệu đồng.' },
      { kanji: '大人', hiragana: 'おとな (otona)', sinoVietnamese: 'ĐẠI NHÂN', meaning: 'Người lớn, người trưởng thành', level: 'N5', breakdown: '大 (Đại) + 人 (Nhân)', mnemonic: 'Người đã lớn khôn chín chắn.' },
      { kanji: '伺う', hiragana: 'うかがう (ukagau)', sinoVietnamese: 'TỨ', meaning: 'Hỏi, thăm (khiêm nhường ngữ)', level: 'N4', breakdown: '亻 (Nhân) + Ti', mnemonic: 'Người cẩn trọng thăm hỏi cấp trên.' },
      { kanji: '借りる', hiragana: 'かりる (kariru)', sinoVietnamese: 'TÁ', meaning: 'Mượn, vay', level: 'N5', breakdown: '亻 (Nhân) + Tích', mnemonic: 'Người mượn đồ dùng của người khác.' },
      { kanji: '似る', hiragana: 'にる (niru)', sinoVietnamese: 'TỰ', meaning: 'Giống nhau, tương tự', level: 'N4', breakdown: '亻 (Nhân) + Dĩ', mnemonic: 'Hai người giống nhau như đúc.' },
      { kanji: '仏', hiragana: 'ほとけ / ぶつ (butsu)', sinoVietnamese: 'PHẬT', meaning: 'Đức Phật, từ bi', level: 'N2', breakdown: '亻 (Nhân) + Khư', mnemonic: 'Con người tu thành chính quả.' },
      { kanji: '伴う', hiragana: 'ともなう (tomonau)', sinoVietnamese: 'BẠN', meaning: 'Đi kèm, dẫn theo', level: 'N2', breakdown: '亻 (Nhân) + Bán', mnemonic: 'Người bạn đồng hành song bước.' }
    ]
  },
  {
    stt: 10,
    strokeCount: 2,
    radical: '儿',
    name: 'Nhi',
    meaning: 'Trẻ con',
    mnemonic: 'Hình đôi chân của đứa trẻ đang tập đi chập chững.',
    relatedVocab: [
      { kanji: '兄', hiragana: 'あに / おにいさん (ani)', sinoVietnamese: 'HUYNH', meaning: 'Anh trai', level: 'N5', breakdown: 'Khẩu + 儿 (Nhi)', mnemonic: 'Người anh có tiếng nói khuyên răn các em.' },
      { kanji: '光る', hiragana: 'ひかる (hikaru)', sinoVietnamese: 'QUANG', meaning: 'Tỏa sáng, lấp lánh', level: 'N4', breakdown: 'Ánh sáng chiếu rọi lên đôi chân 儿', mnemonic: 'Tia sáng soi bước chân người đi.' },
      { kanji: '先生', hiragana: 'せんせい (sensei)', sinoVietnamese: 'TIÊN SINH', meaning: 'Thầy cô giáo, bác sĩ', level: 'N5', breakdown: '先 (Tiên) có bộ 儿 + 生 (Sinh)', mnemonic: 'Người đi trước dẫn đường chỉ lối.' },
      { kanji: '先ず', hiragana: 'まず (mazu)', sinoVietnamese: 'TIÊN', meaning: 'Trước hết, đầu tiên', level: 'N4', breakdown: '先 (Tiên) có bộ 儿', mnemonic: 'Bước đi trước nhất.' },
      { kanji: '見学', hiragana: 'けんがく (kengaku)', sinoVietnamese: 'KIẾN HỌC', meaning: 'Tham quan học tập', level: 'N4', breakdown: '見 (Kiến) có bộ 儿 + 学 (Học)', mnemonic: 'Đôi mắt nhìn và đôi chân bước đi trải nghiệm.' },
      { kanji: '免税', hiragana: 'めんぜい (menzei)', sinoVietnamese: 'MIỄN THUẾ', meaning: 'Miễn thuế (Duty Free)', level: 'N2', breakdown: '免 (Miễn) có bộ 儿 + 税 (Thuế)', mnemonic: 'Thoát khỏi gánh nặng thuế má.' },
      { kanji: '党', hiragana: 'とう (tō)', sinoVietnamese: 'ĐẢNG', meaning: 'Đảng phái chính trị', level: 'N2', breakdown: 'Thượng + 儿 (Nhi)', mnemonic: 'Tập hợp những con người cùng chung chí hướng.' },
      { kanji: '児童', hiragana: 'じどう (jidō)', sinoVietnamese: 'NHI ĐỒNG', meaning: 'Trẻ em, nhi đồng', level: 'N2', breakdown: '児 (Nhi) có bộ 儿 + 童 (Đồng)', mnemonic: 'Thế hệ mầm non tương lai.' },
      { kanji: '兆候', hiragana: 'ちょうこう (chōkō)', sinoVietnamese: 'TRIỆU HẬU', meaning: 'Điềm báo, dấu hiệu', level: 'N1', breakdown: '兆 (Triệu) có bộ 儿 + 候 (Hậu)', mnemonic: 'Dấu chân hé lộ điềm báo sắp tới.' },
      { kanji: '克服', hiragana: 'こくふく (kokufuku)', sinoVietnamese: 'KHẮC PHỤC', meaning: 'Khắc phục, vượt qua khó khăn', level: 'N2', breakdown: '克 (Khắc) có bộ 儿 + 服 (Phục)', mnemonic: 'Vững đôi chân vượt qua thử thách.' }
    ]
  },
  {
    stt: 11,
    strokeCount: 2,
    radical: '入',
    name: 'Nhập',
    meaning: 'Đi vào',
    mnemonic: 'Giống mũi tên hoặc bước chân nghiêng đi vào trong rạp.',
    relatedVocab: [
      { kanji: '入る', hiragana: 'はいる (hairu)', sinoVietnamese: 'NHẬP', meaning: 'Đi vào, bước vào', level: 'N5', breakdown: '入 (Nhập)', mnemonic: 'Hai chân bước qua ngạch cửa đi vào trong.' },
      { kanji: '入口', hiragana: 'いりぐち (iriguchi)', sinoVietnamese: 'NHẬP KHẨU', meaning: 'Cổng vào, lối vào', level: 'N5', breakdown: '入 (Nhập) + 口 (Khẩu)', mnemonic: 'Cửa dẫn lối bước vào bên trong.' },
      { kanji: '入学', hiragana: 'にゅうがく (nyūgaku)', sinoVietnamese: 'NHẬP HỌC', meaning: 'Nhập học, vào trường', level: 'N5', breakdown: '入 (Nhập) + 学 (Học)', mnemonic: 'Bước vào ngưỡng cửa trường học.' },
      { kanji: '輸入', hiragana: 'ゆにゅう (yunyū)', sinoVietnamese: 'THÂU NHẬP', meaning: 'Nhập khẩu hàng hóa', level: 'N4', breakdown: '輸 (Thâu) + 入 (Nhập)', mnemonic: 'Chở hàng hóa nhập vào trong nước.' },
      { kanji: '収入', hiragana: 'しゅうにゅう (shūnyū)', sinoVietnamese: 'THU NHẬP', meaning: 'Thu nhập, tiền lương', level: 'N3', breakdown: '収 (Thu) + 入 (Nhập)', mnemonic: 'Tiền bạc thu gom chảy vào túi.' },
      { kanji: '入場', hiragana: 'にゅうじょう (nyūjō)', sinoVietnamese: 'NHẬP TRƯỜNG', meaning: 'Vào hội trường, vào sân', level: 'N3', breakdown: '入 (Nhập) + 場 (Trường)', mnemonic: 'Bước chân vào khu vực sự kiện.' },
      { kanji: '侵入', hiragana: 'しんにゅう (shinnyū)', sinoVietnamese: 'XÂM NHẬP', meaning: 'Xâm nhập, đột nhập', level: 'N2', breakdown: '侵 (Xâm) + 入 (Nhập)', mnemonic: 'Lẻn trái phép vào bên trong.' },
      { kanji: '加入', hiragana: 'かにゅう (kanyū)', sinoVietnamese: 'GIA NHẬP', meaning: 'Gia nhập, tham gia bảo hiểm', level: 'N2', breakdown: '加 (Gia) + 入 (Nhập)', mnemonic: 'Thêm tên mình vào tổ chức.' },
      { kanji: '気に入る', hiragana: 'きにいる (kiniiru)', sinoVietnamese: 'KHÍ NHẬP', meaning: 'Thích, vừa ý, ưng bụng', level: 'N4', breakdown: '気 (Khí) + に + 入 (Nhập)', mnemonic: 'Hợp với tâm ý của bản thân.' },
      { kanji: '手に入れる', hiragana: 'てにいれる (te ni ireru)', sinoVietnamese: 'THỦ NHẬP', meaning: 'Đoạt được, nắm giữ trong tay', level: 'N3', breakdown: '手 (Thủ) + 入 (Nhập)', mnemonic: 'Đưa vật quý vào lòng bàn tay.' }
    ]
  },
  {
    stt: 12,
    strokeCount: 2,
    radical: '八',
    name: 'Bát',
    meaning: 'Số tám',
    mnemonic: 'Hai nét tách ra hai bên như bộ ria mép hoặc cánh cửa mở rộng.',
    relatedVocab: [
      { kanji: '八', hiragana: 'はち (hachi)', sinoVietnamese: 'BÁT', meaning: 'Số 8 (Bát phát tài)', level: 'N5', breakdown: 'Hai nét mở rộng xòe ra', mnemonic: 'Số 8 xòe rộng mang ý nghĩa mở mang phát đạt.' },
      { kanji: '八月', hiragana: 'はちがつ (hachigatsu)', sinoVietnamese: 'BÁT NGUYỆT', meaning: 'Tháng 8', level: 'N5', breakdown: '八 (Bát) + 月 (Nguyệt)', mnemonic: 'Tháng thứ tám trong năm.' },
      { kanji: '八百屋', hiragana: 'やおや (yaoya)', sinoVietnamese: 'BÁT BÁCH ỐC', meaning: 'Cửa hàng bán rau quả', level: 'N5', breakdown: '八 (Bát) + 百 (Bách) + 屋 (Ốc)', mnemonic: 'Cửa tiệm bán tám trăm thứ rau tươi.' },
      { kanji: '六', hiragana: 'ろく (roku)', sinoVietnamese: 'LỤC', meaning: 'Số sáu (6)', level: 'N5', breakdown: 'Đầu + 八 (Bát)', mnemonic: 'Có hai chân số 8 vững vàng.' },
      { kanji: '公園', hiragana: 'こうえん (kōen)', sinoVietnamese: 'CÔNG VIÊN', meaning: 'Công viên', level: 'N5', breakdown: '公 (Công) có bộ 八 + 園 (Viên)', mnemonic: 'Khu vườn công cộng mở rộng cho muôn người.' },
      { kanji: '共', hiragana: 'とも (tomo)', sinoVietnamese: 'CỘNG', meaning: 'Cùng nhau, chung sức', level: 'N4', breakdown: 'Hai tay nâng đồ có chân 八', mnemonic: 'Cùng chung tay gánh vác việc chung.' },
      { kanji: '兵士', hiragana: 'へいし (heishi)', sinoVietnamese: 'BINH SĨ', meaning: 'Binh lính, chiến sĩ', level: 'N3', breakdown: '兵 (Binh) có bộ 八 + 士 (Sĩ)', mnemonic: 'Chiến sĩ hai chân vững vàng nơi tiền tuyến.' },
      { kanji: '具合', hiragana: 'ぐあい (guai)', sinoVietnamese: 'CỤ HỢP', meaning: 'Tình trạng sức khỏe, hoàn cảnh', level: 'N4', breakdown: '具 (Cụ) có bộ 八 + 合 (Hợp)', mnemonic: 'Tình trạng dụng cụ và cơ thể hợp chuẩn.' },
      { kanji: '兼ねる', hiragana: 'かねる (kaneru)', sinoVietnamese: 'KIÊM', meaning: 'Kiêm nhiệm, đồng thời', level: 'N2', breakdown: 'Nắm hai bông lúa có chân 八', mnemonic: 'Một tay gánh vác hai trọng trách.' },
      { kanji: '其の', hiragana: 'その (sono)', sinoVietnamese: 'KỲ', meaning: 'Đó, ấy (chỉ định từ)', level: 'N3', breakdown: 'Khung giỏ có hai chân 八 chống', mnemonic: 'Chỉ vào vật đang đứng ở đó.' }
    ]
  },
  {
    stt: 13,
    strokeCount: 2,
    radical: '冂',
    name: 'Quynh',
    meaning: 'Vùng biên giới xa, hoang địa',
    mnemonic: 'Đường biên giới bao bọc 3 phía vùng đất trống xa xăm.',
    relatedVocab: [
      { kanji: '円', hiragana: 'えん (en)', sinoVietnamese: 'VIÊN', meaning: 'Đồng Yên Nhật, hình tròn', level: 'N5', breakdown: 'Khung 冂 bao quanh', mnemonic: 'Khung viền tròn trịa của đồng tiền.' },
      { kanji: '冊', hiragana: 'さつ (satsu)', sinoVietnamese: 'SÁCH', meaning: 'Quyển sách, cuốn tập', level: 'N5', breakdown: 'Các thanh tre buộc trong khung 冂', mnemonic: 'Các thẻ tre cuộn lại thành cuốn sách quý.' },
      { kanji: '再び', hiragana: 'ふたたび (futatabi)', sinoVietnamese: 'TÁI', meaning: 'Lại một lần nữa, tái diễn', level: 'N3', breakdown: 'Khung 冂 chia đôi', mnemonic: 'Lặp lại thêm một lượt nữa.' },
      { kanji: '同時', hiragana: 'どうじ (dōji)', sinoVietnamese: 'ĐỒNG THỜI', meaning: 'Cùng lúc, đồng thời', level: 'N3', breakdown: '同 (Đồng) có bộ 冂 + 時 (Thời)', mnemonic: 'Trong cùng một khung thời gian diễn ra.' },
      { kanji: '案内', hiragana: 'あんない (annai)', sinoVietnamese: 'ÁN NỘI', meaning: 'Hướng dẫn, dẫn đường', level: 'N4', breakdown: 'Án + 内 (Nội) có bộ 冂', mnemonic: 'Dẫn đường vào sâu bên trong.' },
      { kanji: '肉', hiragana: 'にく (niku)', sinoVietnamese: 'NHỤC', meaning: 'Thịt', level: 'N5', breakdown: 'Khung 冂 có thớ thịt bên trong', mnemonic: 'Miếng thịt tươi ngon trong khuôn cắt.' },
      { kanji: '網', hiragana: 'あみ (ami)', sinoVietnamese: 'VÕNG', meaning: 'Lưới đánh cá, mạng lưới', level: 'N2', breakdown: 'Mịch + 冂 võng lưới', mnemonic: 'Mạng lưới bủa vây bốn bề.' },
      { kanji: '冒険', hiragana: 'ぼうけん (bōken)', sinoVietnamese: 'MẠO HIỂM', meaning: 'Mạo hiểm, phiêu lưu', level: 'N3', breakdown: '冒 (Mạo) có bộ 冂 + 険 (Hiểm)', mnemonic: 'Đội mũ phiêu lưu nơi hiểm trở.' },
      { kanji: '最も', hiragana: 'もっとも (mottomo)', sinoVietnamese: 'TỐI', meaning: 'Nhất, cực kỳ', level: 'N3', breakdown: 'Nhật + 取 trong khung 冂', mnemonic: 'Nắm lấy điều tinh hoa nhất.' },
      { kanji: '冠', hiragana: 'かんむり (kanmuri)', sinoVietnamese: 'QUÁN', meaning: 'Vương miện, mũ miện', level: 'N1', breakdown: 'Khung 冂 đội đầu + Thốn', mnemonic: 'Mũ miện tôn quý của bậc đế vương.' }
    ]
  },
  {
    stt: 14,
    strokeCount: 2,
    radical: '冖',
    name: 'Mịch',
    meaning: 'Trùm chăn lên',
    mnemonic: 'Hình tấm khăn hoặc chiếc chăn phủ ngang che đồ vật.',
    relatedVocab: [
      { kanji: '軍', hiragana: 'ぐん (gun)', sinoVietnamese: 'QUÂN', meaning: 'Quân đội, quân sự', level: 'N3', breakdown: '冖 (Mịch) che xe Xa (車)', mnemonic: 'Khăn bạt phủ kín che đoàn xe quân sự.' },
      { kanji: '写す', hiragana: 'うつす (utsusu)', sinoVietnamese: 'TẢ', meaning: 'Chụp ảnh, sao chép', level: 'N5', breakdown: '冖 (Mịch) + Dữ', mnemonic: 'Phủ màn che hộp chụp lại hình ảnh chân thực.' },
      { kanji: '写真', hiragana: 'しゃしん (shashin)', sinoVietnamese: 'TẢ CHÂN', meaning: 'Bức ảnh, tấm hình', level: 'N5', breakdown: '写 (Tả) + 真 (Chân)', mnemonic: 'Sao chụp lại sự thật nguyên vẹn.' },
      { kanji: '冬', hiragana: 'ふゆ (fuyu)', sinoVietnamese: 'ĐÔNG', meaning: 'Mùa đông giá rét', level: 'N5', breakdown: '冖 (Mịch) + Băng (冫)', mnemonic: 'Băng tuyết phủ kín cả bầu trời mùa đông.' },
      { kanji: '冗談', hiragana: 'じょうだん (jōdan)', sinoVietnamese: 'NHŨNG ĐÀM', meaning: 'Lời nói đùa, chuyện giỡn', level: 'N3', breakdown: '冗 (Nhũng) có bộ 冖 + 談 (Đàm)', mnemonic: 'Lời nói đùa phủ bóng thư giãn.' },
      { kanji: '冥福', hiragana: 'めいふく (meifuku)', sinoVietnamese: 'MINH PHÚC', meaning: 'Yên nghỉ cõi vĩnh hằng', level: 'N1', breakdown: '冥 (Minh) có bộ 冖 + 福 (Phúc)', mnemonic: 'Cầu phúc cho linh hồn nơi cõi vĩnh hằng u tối.' },
      { kanji: '冠', hiragana: 'かん (kan)', sinoVietnamese: 'QUÁN', meaning: 'Quán quân, đứng đầu', level: 'N2', breakdown: '冖 (Mịch) che đầu', mnemonic: 'Đội vương miện của người chiến thắng.' },
      { kanji: '冤罪', hiragana: 'えんざい (enzai)', sinoVietnamese: 'OAN TỘI', meaning: 'Oan sai, tội oan', level: 'N1', breakdown: '冖 (Mịch) che khuất chân tướng', mnemonic: 'Sự thật bị che phủ tạo nên nỗi oan.' },
      { kanji: '富士山', hiragana: 'ふじさん (fujisan)', sinoVietnamese: 'PHÚ SĨ SAN', meaning: 'Núi Phú Sĩ', level: 'N5', breakdown: 'Phú (富) có 冖 che + Sĩ + Sơn', mnemonic: 'Ngọn núi phủ tuyết trắng xóa linh thiêng.' },
      { kanji: '冷たい', hiragana: 'つめたい (tsumetai)', sinoVietnamese: 'LÃNH', meaning: 'Lạnh buốt', level: 'N5', breakdown: '冫 + Lệnh có 冖 che', mnemonic: 'Thời tiết lạnh che khuất ánh nắng.' }
    ]
  },
  {
    stt: 15,
    strokeCount: 2,
    radical: '冫',
    name: 'Băng',
    meaning: 'Nước đá, lạnh giá',
    mnemonic: 'Hai giọt nước đông cứng lại thành băng giá (2 chấm).',
    relatedVocab: [
      { kanji: '氷', hiragana: 'こおり (kōri)', sinoVietnamese: 'BĂNG', meaning: 'Nước đá, tảng băng', level: 'N4', breakdown: 'Thủy (水) thêm nét chấm thành Băng', mnemonic: 'Giọt nước đông cứng thành đá lạnh buốt.' },
      { kanji: '冷たい', hiragana: 'つめたい (tsumetai)', sinoVietnamese: 'LÃNH', meaning: 'Lạnh lẽo, buốt giá', level: 'N5', breakdown: '冫 (Băng) + 令 (Lệnh)', mnemonic: 'Lệnh ban ra băng giá lạnh thấu xương.' },
      { kanji: '冷蔵庫', hiragana: 'れいぞうこ (reizōko)', sinoVietnamese: 'LÃNH TÀNG KHỐ', meaning: 'Tủ lạnh', level: 'N5', breakdown: '冷 (Lãnh) + 蔵 (Tàng) + 庫 (Khố)', mnemonic: 'Khoang tủ giữ băng bảo quản thức ăn tươi ngon.' },
      { kanji: '凍る', hiragana: 'こおる (kōru)', sinoVietnamese: 'ĐỐNG', meaning: 'Đóng băng, đông đá', level: 'N3', breakdown: '冫 (Băng) + 東 (Đông)', mnemonic: 'Gió phương Đông thổi buốt làm dòng nước đóng băng.' },
      { kanji: '冬休み', hiragana: 'ふゆやすみ (fuyuyasumi)', sinoVietnamese: 'ĐÔNG HƯU', meaning: 'Kỳ nghỉ đông', level: 'N5', breakdown: '冬 (Đông) có 冫 + 休 (Hưu)', mnemonic: 'Nghỉ ngơi ấm áp qua mùa băng giá.' },
      { kanji: '次', hiragana: 'つぎ (tsugi)', sinoVietnamese: 'THỨ', meaning: 'Tiếp theo, lần tới', level: 'N5', breakdown: '冫 (Băng) + Khiếm (欠)', mnemonic: 'Người run rẩy trong băng há miệng chờ lượt kế tiếp.' },
      { kanji: '涼しい', hiragana: 'すずしい (suzushii)', sinoVietnamese: 'LƯƠNG', meaning: 'Mát mẻ, dễ chịu', level: 'N5', breakdown: '冫 / 氵 + Kinh', mnemonic: 'Gió mát thổi tan cái nóng oi ả.' },
      { kanji: '准教授', hiragana: 'じゅんきょうじゅ (junkyōju)', sinoVietnamese: 'CHUẨN GIÁO THỤ', meaning: 'Phó giáo sư', level: 'N2', breakdown: '准 (Chuẩn) có 冫 + Giáo + Thụ', mnemonic: 'Vị thế nghiên cứu chuẩn mực.' },
      { kanji: '減る', hiragana: 'へる (heru)', sinoVietnamese: 'GIẢM', meaning: 'Giảm bớt, hao mòn', level: 'N3', breakdown: 'Thủy/Băng hao hụt', mnemonic: 'Băng tan làm nước rút cạn bớt.' },
      { kanji: '冶金', hiragana: 'やきん (yakin)', sinoVietnamese: 'DÃ KIM', meaning: 'Luyện kim, đúc kim loại', level: 'N1', breakdown: '冫 (Băng) + Thai (台) + Kim', mnemonic: 'Làm lạnh tôi rèn thanh kiếm sắc bén.' }
    ]
  },
  {
    stt: 16,
    strokeCount: 2,
    radical: '几',
    name: 'Kỷ',
    meaning: 'Ghế tựa, bàn nhỏ',
    mnemonic: 'Hình dáng chiếc bàn nhỏ hoặc ghế đẩu có hai chân.',
    relatedVocab: [
      { kanji: '机', hiragana: 'つくえ (tsukue)', sinoVietnamese: 'CƠ', meaning: 'Cái bàn học, bàn làm việc', level: 'N5', breakdown: 'Mộc (木) + 几 (Kỷ)', mnemonic: 'Chiếc bàn làm bằng gỗ dùng để học bài.' },
      { kanji: '処置', hiragana: 'しょち (shochi)', sinoVietnamese: 'XỬ TRÍ', meaning: 'Xử trí, cấp cứu, đối phó', level: 'N2', breakdown: '処 (Xử) có bộ 几 + 置 (Trí)', mnemonic: 'Ngồi trước bàn phân xử mọi việc chu toàn.' },
      { kanji: '凡人', hiragana: 'ぼんじん (bonjin)', sinoVietnamese: 'PHÀM NHÂN', meaning: 'Người bình thường, kẻ phàm trần', level: 'N1', breakdown: '几 (Kỷ) có một chấm', mnemonic: 'Kẻ phàm phu tục tử trong thiên hạ.' },
      { kanji: '凱旋', hiragana: 'がいせん (gaisen)', sinoVietnamese: 'KHẢI TOÀN', meaning: 'Khải hoàn, chiến thắng trở về', level: 'N1', breakdown: 'Khải có bộ 几 + Toàn', mnemonic: 'Khúc ca chiến thắng vang dội trở về.' },
      { kanji: '風', hiragana: 'かぜ (kaze)', sinoVietnamese: 'PHONG', meaning: 'Cơn gió mát', level: 'N5', breakdown: 'Khung 几 mở rộng lùa gió Trùng', mnemonic: 'Gió thổi mát rượi qua khung bàn.' },
      { kanji: '凪', hiragana: 'なぎ (nagi)', sinoVietnamese: 'CHỈ', meaning: 'Biển lặng, gió yên', level: 'N1', breakdown: '几 (Kỷ) che Chỉ (止)', mnemonic: 'Gió ngừng thổi biển cả phẳng lặng như gương.' },
      { kanji: '凭れる', hiragana: 'もたれる (motareru)', sinoVietnamese: 'BẰNG', meaning: 'Tựa vào, khó tiêu (dạ dày)', level: 'N1', breakdown: 'Tựa vào chiếc bàn 几', mnemonic: 'Mệt mỏi tựa lưng vào bàn nghỉ ngơi.' },
      { kanji: '鳳凰', hiragana: 'ほうおう (hōō)', sinoVietnamese: 'PHƯỢNG HOÀNG', meaning: 'Chim phượng hoàng thần thoại', level: 'N1', breakdown: 'Chữ Phượng có bộ 几', mnemonic: 'Loài chim quý bay lượn trên trời cao.' },
      { kanji: '処理', hiragana: 'しょり (shori)', sinoVietnamese: 'XỬ LÝ', meaning: 'Xử lý thông tin, giải quyết', level: 'N3', breakdown: '処 (Xử) có 几 + 理 (Lý)', mnemonic: 'Ngồi bên bàn giải quyết thủ tục.' },
      { kanji: '台風', hiragana: 'たいふう (taifū)', sinoVietnamese: 'THAI PHONG', meaning: 'Cơn bão nhiệt đới', level: 'N4', breakdown: 'Đài + Phong (風) có 几', mnemonic: 'Cơn bão gió giật rung chuyển nhà cửa.' }
    ]
  },
  {
    stt: 17,
    strokeCount: 2,
    radical: '凵',
    name: 'Khảm',
    meaning: 'Há miệng, hố sâu',
    mnemonic: 'Hình cái hố sâu hoặc miệng đang há to hướng lên trên.',
    relatedVocab: [
      { kanji: '出る', hiragana: 'でる (deru)', sinoVietnamese: 'XUẤT', meaning: 'Đi ra ngoài, xuất hiện', level: 'N5', breakdown: 'Hai hố 凵 xếp chồng lên nhau', mnemonic: 'Mầm cây vươn ra khỏi hố đất cao vút.' },
      { kanji: '出口', hiragana: 'でぐち (deguchi)', sinoVietnamese: 'XUẤT KHẨU', meaning: 'Lối ra, cửa thoát hiểm', level: 'N5', breakdown: '出 (Xuất) + 口 (Khẩu)', mnemonic: 'Cửa dẫn bước ra ngoài trời.' },
      { kanji: '出発', hiragana: 'しゅっぱつ (shuppatsu)', sinoVietnamese: 'XUẤT PHÁT', meaning: 'Khởi hành, xuất phát', level: 'N4', breakdown: '出 (Xuất) + 発 (Phát)', mnemonic: 'Đoàn tàu bắt đầu lăn bánh rời ga.' },
      { kanji: '凹む', hiragana: 'へこむ (hekomu)', sinoVietnamese: 'AO', meaning: 'Lõm xuống, nản lòng', level: 'N2', breakdown: 'Hình chiếc hố 凵 lõm sâu', mnemonic: 'Bề mặt bị móp lõm xuống dưới.' },
      { kanji: '凸凹', hiragana: 'でこぼこ (dekoboko)', sinoVietnamese: 'ĐỘT AO', meaning: 'Mấp mô, gồ ghề', level: 'N2', breakdown: '凸 (Đột - lồi) + 凹 (Ao - lõm)', mnemonic: 'Đường sá gồ ghề lồi lõm khó đi.' },
      { kanji: '凶作', hiragana: 'きょうさく (kyōsaku)', sinoVietnamese: 'HUNG TÁC', meaning: 'Mất mùa, thất bát', level: 'N1', breakdown: 'Hung (凶) có 凵 + Tác', mnemonic: 'Rơi vào hố sâu thất thu mùa màng.' },
      { kanji: '函館', hiragana: 'はこだて (hakodate)', sinoVietnamese: 'HÀM QUÁN', meaning: 'Thành phố cảng Hakodate', level: 'N2', breakdown: '函 (Hàm) có 凵 + Quán', mnemonic: 'Cảng biển hình chiếc hộp đón tàu bè.' },
      { kanji: '画', hiragana: 'が / かく (ga)', sinoVietnamese: 'HỌA', meaning: 'Bức tranh, nét vẽ', level: 'N4', breakdown: 'Vẽ ranh giới ruộng trong khung 凵', mnemonic: 'Cây cọ vẽ nên bức tranh tuyệt mỹ.' },
      { kanji: '映画', hiragana: 'えいが (eiga)', sinoVietnamese: 'ÁNH HỌA', meaning: 'Phim điện ảnh, chiếu bóng', level: 'N5', breakdown: '映 (Ánh) + 画 (Họa)', mnemonic: 'Ánh sáng chiếu rọi tranh chuyển động.' },
      { kanji: '計画', hiragana: 'けいかく (keikaku)', sinoVietnamese: 'KẾ HỌA', meaning: 'Kế hoạch dự tính', level: 'N4', breakdown: '計 (Kế) + 画 (Họa)', mnemonic: 'Vạch ra kế hoạch rõ ràng từng bước.' }
    ]
  },
  {
    stt: 18,
    strokeCount: 2,
    radical: '刀',
    variants: ['刂'],
    name: 'Đao',
    meaning: 'Con dao, thanh kiếm',
    mnemonic: 'Hình lưỡi dao sắc bén có chuôi cầm chặt chém.',
    relatedVocab: [
      { kanji: '切る', hiragana: 'きる (kiru)', sinoVietnamese: 'THIẾT', meaning: 'Cắt, thái', level: 'N5', breakdown: 'Thất + 刀 (Đao)', mnemonic: 'Dùng dao bén cắt làm 7 khúc.' },
      { kanji: '分ける', hiragana: 'わける (wakeru)', sinoVietnamese: 'PHÂN', meaning: 'Phân chia, tách ra', level: 'N4', breakdown: 'Bát (八) + 刀 (Đao)', mnemonic: 'Dùng dao chia thành tám phần đều đặn.' },
      { kanji: '初めて', hiragana: 'はじめて (hajimete)', sinoVietnamese: 'SƠ', meaning: 'Lần đầu tiên', level: 'N5', breakdown: 'Y (衤) + 刀 (Đao)', mnemonic: 'Lần đầu tiên dùng dao cắt may áo mới.' },
      { kanji: '前', hiragana: 'まえ (mae)', sinoVietnamese: 'TIỀN', meaning: 'Phía trước, ngày xưa', level: 'N5', breakdown: 'Thuyền cắt dòng nước bằng 刂 (Đao)', mnemonic: 'Mũi thuyền tiến thẳng về phía trước.' },
      { kanji: '削る', hiragana: 'けずる (kezuru)', sinoVietnamese: 'TƯỚC', meaning: 'Gọt, bào bớt, cắt giảm', level: 'N2', breakdown: 'Tiêu + 刂 (Đao)', mnemonic: 'Dùng dao gọt thanh bút chì nhọn hoắt.' },
      { kanji: '刻む', hiragana: 'きざむ (kizamu)', sinoVietnamese: 'KHẮC', meaning: 'Thái nhỏ, khắc ghi trong tim', level: 'N2', breakdown: 'Hợi + 刂 (Đao)', mnemonic: 'Khắc sâu ký ức vào tâm can.' },
      { kanji: '判断', hiragana: 'はんだん (handan)', sinoVietnamese: 'PHÁN ĐOÁN', meaning: 'Phán đoán, nhận định', level: 'N3', breakdown: '判 (Phán) có 刂 + 断 (Đoán)', mnemonic: 'Dùng lý lẽ phân minh chặt đứt nghi ngờ.' },
      { kanji: '判子', hiragana: 'はんこ (hanko)', sinoVietnamese: 'PHÁN TỬ', meaning: 'Con dấu cá nhân', level: 'N4', breakdown: '判 (Phán) + 子 (Tử)', mnemonic: 'Con dấu khắc tên định danh pháp lý.' },
      { kanji: '到着', hiragana: 'とうちゃく (tōchaku)', sinoVietnamese: 'ĐÁO TRƯỚC', meaning: 'Đến nơi, cập bến', level: 'N4', breakdown: '到 (Đáo) có 刂 + 着 (Trước)', mnemonic: 'Mũi gươm chạm đích thành công.' },
      { kanji: '刺す', hiragana: 'さす (sasu)', sinoVietnamese: 'THÍCH', meaning: 'Đâm, châm, muỗi đốt', level: 'N3', breakdown: 'Thích có 刂 (Đao)', mnemonic: 'Mũi dao nhọn đâm xuyên qua.' },
      { kanji: '別れる', hiragana: 'わかれる (wakareru)', sinoVietnamese: 'BIỆT', meaning: 'Chia tay, từ biệt', level: 'N4', breakdown: 'Khẩu + 刂 (Đao)', mnemonic: 'Lời nói chia tay cắt đứt mối tơ duyên.' },
      { kanji: '制服', hiragana: 'せいふく (seifuku)', sinoVietnamese: 'CHẾ PHỤC', meaning: 'Đồng phục học sinh/công ty', level: 'N3', breakdown: '制 (Chế) có 刂 + 服 (Phục)', mnemonic: 'Trang phục cắt may theo quy chuẩn.' },
      { kanji: '劇', hiragana: 'げき (geki)', sinoVietnamese: 'KỊCH', meaning: 'Vở kịch, kịch tính', level: 'N3', breakdown: 'Kịch có 刂 (Đao)', mnemonic: 'Vở diễn gay cấn kịch liệt.' },
      { kanji: '利用', hiragana: 'りよう (riyō)', sinoVietnamese: 'LỢI DỤNG', meaning: 'Sử dụng, tận dụng', level: 'N4', breakdown: '利 (Lợi) có 刂 + 用 (Dụng)', mnemonic: 'Lưỡi liềm gặt lúa đem lại lợi ích.' },
      { kanji: '列', hiragana: 'れつ (retsu)', sinoVietnamese: 'LIỆT', meaning: 'Hàng lối, đoàn tàu', level: 'N3', breakdown: 'Đãi + 刂 (Đao)', mnemonic: 'Xếp thành hàng thẳng tắp.' },
      { kanji: '剛', hiragana: 'ごう (gō)', sinoVietnamese: 'CƯƠNG', meaning: 'Cương trực, cứng cỏi', level: 'N1', breakdown: 'Cương có 刂 (Đao)', mnemonic: 'Thanh kiếm cứng rắn không bao giờ uốn cong.' }
    ]
  },
  {
    stt: 19,
    strokeCount: 2,
    radical: '力',
    name: 'Lực',
    meaning: 'Sức mạnh, cơ bắp',
    mnemonic: 'Hình cánh tay đang gồng cơ bắp cuồn cuộn biểu thị sức vóc.',
    relatedVocab: [
      { kanji: '力', hiragana: 'ちから (chikara)', sinoVietnamese: 'LỰC', meaning: 'Sức lực, sức mạnh', level: 'N5', breakdown: 'Hình cánh tay cơ bắp', mnemonic: 'Cánh tay gồng sức nâng vật nặng.' },
      { kanji: '協力', hiragana: 'きょうりょく (kyōryoku)', sinoVietnamese: 'HIỆP LỰC', meaning: 'Hợp tác, chung sức', level: 'N4', breakdown: '協 (Hiệp) có 3 chữ 力 + 力', mnemonic: 'Muôn người chung sức vượt qua thử thách.' },
      { kanji: '努力', hiragana: 'どりょく (doryoku)', sinoVietnamese: 'NỖ LỰC', meaning: 'Cố gắng, nỗ lực', level: 'N3', breakdown: '努 (Nỗ) có 力 + 力 (Lực)', mnemonic: 'Dốc toàn bộ sức lực vươn tới mục tiêu.' },
      { kanji: '能力', hiragana: 'のうりょく (nōryoku)', sinoVietnamese: 'NĂNG LỰC', meaning: 'Khả năng, tài năng', level: 'N3', breakdown: '能 (Năng) + 力 (Lực)', mnemonic: 'Thực lực giải quyết công việc trôi chảy.' },
      { kanji: '運動', hiragana: 'うんどう (undō)', sinoVietnamese: 'VẬN ĐỘNG', meaning: 'Vận động, tập thể thao', level: 'N5', breakdown: '運 (Vận) + 動 (Động) có 力', mnemonic: 'Vận dụng sức mạnh rèn luyện cơ thể.' },
      { kanji: '助ける', hiragana: 'たすける (tasukeru)', sinoVietnamese: 'TRỢ', meaning: 'Giúp đỡ, cứu mạng', level: 'N4', breakdown: 'Thả + 力 (Lực)', mnemonic: 'Ra tay dùng sức lực cứu người.' },
      { kanji: '勉強', hiragana: 'べんきょう (benkyō)', sinoVietnamese: 'MIỄN CƯỜNG', meaning: 'Học tập, giảm giá', level: 'N5', breakdown: '勉 (Miễn) có 力 + 強 (Cường)', mnemonic: 'Gắng hết sức rèn giũa tri thức.' },
      { kanji: '勇気', hiragana: 'ゆうき (yūki)', sinoVietnamese: 'DŨNG KHÍ', meaning: 'Dũng khí, lòng can đảm', level: 'N3', breakdown: '勇 (Dũng) có 力 + 気 (Khí)', mnemonic: 'Nghị lực quả cảm không chùn bước.' },
      { kanji: '勤勉', hiragana: 'きんべん (kinben)', sinoVietnamese: 'CẦN MIỄN', meaning: 'Cần cù, chăm chỉ', level: 'N2', breakdown: '勤 (Cần) có 力 + 勉 (Miễn) có 力', mnemonic: 'Chăm chỉ ngày đêm lao động sản xuất.' },
      { kanji: '効く', hiragana: 'きく (kiku)', sinoVietnamese: 'HIỆU', meaning: 'Có hiệu nghiệm (thuốc)', level: 'N3', breakdown: 'Giao + 力 (Lực)', mnemonic: 'Thuốc uống vào phát huy tác lực trị bệnh.' },
      { kanji: '勝つ', hiragana: 'かつ (katsu)', sinoVietnamese: 'THẮNG', meaning: 'Chiến thắng', level: 'N4', breakdown: 'Trẫm + 力 (Lực)', mnemonic: 'Dùng sức mạnh giành lấy vinh quang.' },
      { kanji: '勢い', hiragana: 'いきおい (ikioi)', sinoVietnamese: 'THẾ', meaning: 'Thế lực, đà xông tới', level: 'N2', breakdown: 'Nghệ + 力 (Lực)', mnemonic: 'Đà tiến dũng mãnh như thác đổ.' },
      { kanji: '労働', hiragana: 'ろうどう (rōdō)', sinoVietnamese: 'LAO ĐỘNG', meaning: 'Lao động, làm việc', level: 'N3', breakdown: '労 (Lao) có 力 + 働 (Động)', mnemonic: 'Mồ hôi đổ xuống tạo ra thành quả.' },
      { kanji: '権力', hiragana: 'けんりょく (kenryoku)', sinoVietnamese: 'QUYỀN LỰC', meaning: 'Quyền lực, thế lực', level: 'N2', breakdown: '権 (Quyền) + 力 (Lực)', mnemonic: 'Quyền hạn thống trị trong tay.' },
      { kanji: '加える', hiragana: 'くわえる (kuwaeru)', sinoVietnamese: 'GIA', meaning: 'Thêm vào, cộng thêm', level: 'N3', breakdown: '力 (Lực) + 口 (Khẩu)', mnemonic: 'Dốc sức thêm vào để hoàn thiện.' },
      { kanji: '効果', hiragana: 'こうか (kōka)', sinoVietnamese: 'HIỆU QUẢ', meaning: 'Hiệu quả, tác dụng', level: 'N3', breakdown: '効 (Hiệu) có 力 + 果 (Quả)', mnemonic: 'Kết quả tốt đẹp phát huy sức mạnh.' }
    ]
  },
  {
    stt: 20,
    strokeCount: 2,
    radical: '勹',
    name: 'Bao',
    meaning: 'Bao bọc, ôm lấy',
    mnemonic: 'Hình cánh tay vòng lại để ôm, gói đồ vật vào lòng.',
    relatedVocab: [
      { kanji: '包む', hiragana: 'つつむ (tsutsumu)', sinoVietnamese: 'BAO', meaning: 'Gói ghém, bọc lại', level: 'N4', breakdown: '勹 (Bao) ôm lấy Tị', mnemonic: 'Bàn tay khéo léo bọc gói món quà.' },
      { kanji: '包丁', hiragana: 'ほうちょう (hōchō)', sinoVietnamese: 'BAO ĐINH', meaning: 'Con dao làm bếp Nhật', level: 'N3', breakdown: '包 (Bao) + 丁 (Đinh)', mnemonic: 'Con dao làm bếp chuyên dụng của đầu bếp.' },
      { kanji: '匂い', hiragana: 'におい (nioi)', sinoVietnamese: 'MÙI', meaning: 'Mùi thơm, hương thơm', level: 'N4', breakdown: '勹 (Bao) ôm lấy Tỷ', mnemonic: 'Hương thơm ngọt ngào lan tỏa bao quanh.' },
      { kanji: '句', hiragana: 'く (ku)', sinoVietnamese: 'CÚ', meaning: 'Câu thơ, câu văn', level: 'N3', breakdown: '勹 (Bao) ôm Khẩu (口)', mnemonic: 'Gói ghém lời hay ý đẹp vào câu văn.' },
      { kanji: '俳句', hiragana: 'はいく (haiku)', sinoVietnamese: 'BÀI CÚ', meaning: 'Thơ Haiku truyền thống Nhật', level: 'N3', breakdown: '俳 (Bài) + 句 (Cú)', mnemonic: 'Thể thơ ngắn 17 âm tiết độc đáo của Nhật.' },
      { kanji: '包装', hiragana: 'ほうそう (hōsō)', sinoVietnamese: 'BAO TRANG', meaning: 'Đóng gói, bao bì hàng hóa', level: 'N2', breakdown: '包 (Bao) + 装 (Trang)', mnemonic: 'Đóng hộp trang trí trang nhã.' },
      { kanji: '勿論', hiragana: 'もちろん (mochiron)', sinoVietnamese: 'VẬT LUẬN', meaning: 'Dĩ nhiên, tất nhiên', level: 'N4', breakdown: '勿 có bộ 勹 + 論 (Luận)', mnemonic: 'Đương nhiên không cần phải bàn cãi.' },
      { kanji: '匆々', hiragana: 'そうそう (sōsō)', sinoVietnamese: 'THÔNG', meaning: 'Vội vã (cuối thư kính bút)', level: 'N1', breakdown: 'Chữ Thông lặp lại có bộ 勹', mnemonic: 'Viết vội mấy dòng thư kính gửi.' },
      { kanji: '包括', hiragana: 'ほうかつ (hōkatsu)', sinoVietnamese: 'BAO QUÁT', meaning: 'Bao hàm toàn diện', level: 'N1', breakdown: '包 (Bao) + 括 (Quát)', mnemonic: 'Bao quát toàn bộ vấn đề.' },
      { kanji: '小包', hiragana: 'こづつみ (kodutsumi)', sinoVietnamese: 'TIỂU BAO', meaning: 'Bưu kiện nhỏ gửi qua bưu điện', level: 'N4', breakdown: '小 (Tiểu) + 包 (Bao)', mnemonic: 'Gói bưu phẩm nhỏ gửi về quê hương.' }
    ]
  },
  {
    stt: 21,
    strokeCount: 2,
    radical: '匕',
    name: 'Chủy',
    meaning: 'Cái thìa, cái muỗng',
    mnemonic: 'Hình chiếc thìa múc canh có cán cong thanh thoát.',
    relatedVocab: [
      { kanji: '匙', hiragana: 'さじ (saji)', sinoVietnamese: 'THÌ', meaning: 'Cái muỗng, thìa múc', level: 'N1', breakdown: '是 (Thị) + 匕 (Chủy)', mnemonic: 'Cái thìa chuẩn mực dùng trong bữa ăn.' },
      { kanji: '北', hiragana: 'きた (kita)', sinoVietnamese: 'BẮC', meaning: 'Hướng bắc, phương bắc', level: 'N5', breakdown: 'Hai người quay lưng 匕 vào nhau', mnemonic: 'Hai người quay lưng tránh gió lạnh phương Bắc.' },
      { kanji: '北方', hiragana: 'ほっぽう (hoppō)', sinoVietnamese: 'BẮC PHƯƠNG', meaning: 'Phía bắc, vùng phương bắc', level: 'N3', breakdown: '北 (Bắc) + 方 (Phương)', mnemonic: 'Phương hướng lạnh giá ở cực Bắc.' },
      { kanji: '敗れる', hiragana: 'やぶれる (yabureru)', sinoVietnamese: 'BẠI', meaning: 'Bị đánh bại, thua cuộc', level: 'N3', breakdown: '貝 (Bối) + 攴 có 匕', mnemonic: 'Thua trận mất sạch tiền của.' },
      { kanji: '旨い', hiragana: 'うまい (umai)', sinoVietnamese: 'CHỈ', meaning: 'Ngon miệng, khéo léo', level: 'N3', breakdown: '匕 (Chủy) + 日 (Nhật)', mnemonic: 'Dùng thìa múc món ngon ăn mỗi ngày.' },
      { kanji: '旨', hiragana: 'むね (mune)', sinoVietnamese: 'CHỈ', meaning: 'Ý chỉ, mục đích, tôn chỉ', level: 'N1', breakdown: '匕 (Chủy) + 日 (Nhật)', mnemonic: 'Tôn chỉ sâu sắc truyền lại.' },
      { kanji: '化ける', hiragana: 'ばける (bakeru)', sinoVietnamese: 'HÓA', meaning: 'Biến hóa, hóa trang', level: 'N2', breakdown: '亻 (Nhân) + 匕 (Chủy)', mnemonic: 'Người cầm thìa phép biến hóa khôn lường.' },
      { kanji: '変化', hiragana: 'へんか (henka)', sinoVietnamese: 'BIẾN HÓA', meaning: 'Biến đổi, sự thay đổi', level: 'N4', breakdown: '変 (Biến) + 化 (Hóa)', mnemonic: 'Sự biến chuyển của vạn vật.' },
      { kanji: '化学', hiragana: 'かがく (kagaku)', sinoVietnamese: 'HÓA HỌC', meaning: 'Môn hóa học', level: 'N4', breakdown: '化 (Hóa) + 学 (Học)', mnemonic: 'Môn học nghiên cứu biến đổi chất.' },
      { kanji: '比べる', hiragana: 'くらべる (kuraberu)', sinoVietnamese: 'TỶ', meaning: 'So sánh, đối chiếu', level: 'N4', breakdown: 'Hai chữ 匕 đứng cạnh nhau', mnemonic: 'Đặt hai chiếc thìa cạnh nhau để so sánh độ dài.' }
    ]
  },
  {
    stt: 22,
    strokeCount: 2,
    radical: '匚',
    name: 'Phương',
    meaning: 'Tủ đựng đồ',
    mnemonic: 'Chiếc hộp vuông mở nắp bên phải để xếp đồ dùng vào.',
    relatedVocab: [
      { kanji: '箱', hiragana: 'はこ (hako)', sinoVietnamese: 'TƯƠNG', meaning: 'Cái hộp, cái thùng', level: 'N5', breakdown: '竹 (Trúc) + 相 có dạng 匚', mnemonic: 'Hộp làm bằng nan trúc chắc chắn.' },
      { kanji: '匠', hiragana: 'たくみ (takumi)', sinoVietnamese: 'TƯỢNG', meaning: 'Nghệ nhân, thợ bậc thầy', level: 'N1', breakdown: '匚 (Phương) + 斤 (Cân - rìu)', mnemonic: 'Người thợ cất rìu trong hộp đồ nghề.' },
      { kanji: '巨', hiragana: 'きょ (kyo)', sinoVietnamese: 'CỰ', meaning: 'Khổng lồ, cực lớn', level: 'N2', breakdown: 'Bộ 匚 bao quanh thước đo', mnemonic: 'Chiếc hộp có kích thước khổng lồ.' },
      { kanji: '巨大', hiragana: 'きょだい (kyodai)', sinoVietnamese: 'CỰ ĐẠI', meaning: 'To lớn khác thường, vĩ đại', level: 'N3', breakdown: '巨 (Cự) + 大 (Đại)', mnemonic: 'Vật thể to lớn đồ sộ.' },
      { kanji: '巨人', hiragana: 'きょじん (kyojin)', sinoVietnamese: 'CỰ NHÂN', meaning: 'Người khổng lồ', level: 'N2', breakdown: '巨 (Cự) + 人 (Nhân)', mnemonic: 'Người có vóc dáng khổng lồ.' },
      { kanji: '巨額', hiragana: 'きょがく (kyogaku)', sinoVietnamese: 'CỰ NGẠCH', meaning: 'Khoản tiền kếch xù', level: 'N1', breakdown: '巨 (Cự) + 額 (Ngạch)', mnemonic: 'Số tiền lớn phi thường.' },
      { kanji: '師匠', hiragana: 'ししょう (shishō)', sinoVietnamese: 'SƯ TƯỢNG', meaning: 'Sư phụ, người thầy dạy nghề', level: 'N1', breakdown: '師 (Sư) + 匠 (Tượng)', mnemonic: 'Bậc thầy truyền thụ tinh hoa thủ công.' },
      { kanji: '筐体', hiragana: 'きょうたい (kyōtai)', sinoVietnamese: 'KHUÔNG THỂ', meaning: 'Khung máy, vỏ hộp thiết bị', level: 'N1', breakdown: '竹 + 匚 (Phương) + 体 (Thể)', mnemonic: 'Vỏ hộp bao bọc bộ vi xử lý.' },
      { kanji: '匡正', hiragana: 'きょうせい (kyōsei)', sinoVietnamese: 'KHUÔNG CHÍNH', meaning: 'Uốn nắn, sửa sai cho thẳng thắn', level: 'N1', breakdown: '匚 (Phương) + 𠁁', mnemonic: 'Đặt vào khuôn để nắn thẳng lại.' },
      { kanji: '意匠', hiragana: 'いしょう (ishō)', sinoVietnamese: 'Ý TƯỢNG', meaning: 'Kiểu dáng công nghiệp, ý tưởng thiết kế', level: 'N1', breakdown: '意 (Ý) + 匠 (Tượng)', mnemonic: 'Ý tưởng tài hoa của nhà thiết kế.' }
    ]
  },
  {
    stt: 23,
    strokeCount: 2,
    radical: '匸',
    name: 'Hệ',
    meaning: 'Che đậy, giấu giếm',
    mnemonic: 'Chiếc hộp có nắp đậy kín bên trên để giấu kín đồ vật quý.',
    relatedVocab: [
      { kanji: '匹', hiragana: 'ひき / ひつ (hiki)', sinoVietnamese: 'THẤT', meaning: 'Con (đếm động vật), tương xứng', level: 'N4', breakdown: '匸 (Hệ) che 八 (Bát)', mnemonic: 'Nhốt con thú nhỏ vào góc chuồng kín.' },
      { kanji: '匹敵', hiragana: 'ひってき (hitteki)', sinoVietnamese: 'THẤT ĐỊCH', meaning: 'Sánh ngang, ngang tài ngang sức', level: 'N1', breakdown: '匹 (Thất) + 敵 (Địch)', mnemonic: 'Đối thủ xứng tầm ngang ngửa.' },
      { kanji: '匿う', hiragana: 'かくまう (kakumau)', sinoVietnamese: 'NẶC', meaning: 'Bao che, giấu giếm ai đó', level: 'N1', breakdown: '匸 (Hệ) + 若 (Nhược)', mnemonic: 'Giấu người yếu thế vào nơi kín đáo an toàn.' },
      { kanji: '匿名', hiragana: 'とくめい (tokumei)', sinoVietnamese: 'NẶC DANH', meaning: 'Ẩn danh, giấu tên', level: 'N2', breakdown: '匿 (Nặc) + 名 (Danh)', mnemonic: 'Giấu tên tuổi không để ai biết.' },
      { kanji: '隠匿', hiragana: 'いんとく (intoku)', sinoVietnamese: 'ẨN NẶC', meaning: 'Cất giấu phi pháp, che giấu', level: 'N1', breakdown: '隠 (Ẩn) + 匿 (Nặc)', mnemonic: 'Che giấu tang vật kỹ càng.' },
      { kanji: '区分', hiragana: 'くぶん (kubun)', sinoVietnamese: 'KHU PHÂN', meaning: 'Phân chia khu vực, phân loại', level: 'N2', breakdown: '区 có nét 匸 + 分 (Phân)', mnemonic: 'Chia nhỏ ranh giới từng vùng.' },
      { kanji: '区', hiragana: 'く (ku)', sinoVietnamese: 'KHU', meaning: 'Khu, quận (đơn vị hành chính)', level: 'N4', breakdown: '匸 (Hệ) bao bọc', mnemonic: 'Khu vực khép kín trong thành phố.' },
      { kanji: '地区', hiragana: 'ちく (chiku)', sinoVietnamese: 'ĐỊA KHU', meaning: 'Địa khu, khu vực địa lý', level: 'N3', breakdown: '地 (Địa) + 区 (Khu)', mnemonic: 'Khu đất đã được quy hoạch rõ ràng.' },
      { kanji: '区別', hiragana: 'くべつ (kubetsu)', sinoVietnamese: 'KHU BIỆT', meaning: 'Phân biệt rạch ròi', level: 'N3', breakdown: '区 (Khu) + 別 (Biệt)', mnemonic: 'Vạch ranh giới phân biệt giữa các bên.' },
      { kanji: '区域', hiragana: 'くいき (kuiki)', sinoVietnamese: 'KHU VỰC', meaning: 'Khu vực, phạm vi', level: 'N2', breakdown: '区 (Khu) + 域 (Vực)', mnemonic: 'Ranh giới địa hạt phân định.' }
    ]
  },
  {
    stt: 24,
    strokeCount: 2,
    radical: '十',
    name: 'Thập',
    meaning: 'Số mười',
    mnemonic: 'Dấu cộng (+), giao nhau giữa vạch ngang và vạch dọc.',
    relatedVocab: [
      { kanji: '十', hiragana: 'とお / じゅう (jū)', sinoVietnamese: 'THẬP', meaning: 'Số mười (10)', level: 'N5', breakdown: 'Nét ngang 一 và nét sổ 丨', mnemonic: 'Mười phương trời đất giao thoa hoàn hảo.' },
      { kanji: '十分', hiragana: 'じゅうぶん (jūbun)', sinoVietnamese: 'THẬP PHÂN', meaning: 'Đầy đủ, trọn vẹn, thoả đáng', level: 'N4', breakdown: '十 (Thập) + 分 (Phân)', mnemonic: 'Đạt 10 phần trọn vẹn không thiếu thốn.' },
      { kanji: '十日', hiragana: 'とおか (tōka)', sinoVietnamese: 'THẬP NHẬT', meaning: 'Ngày mùng 10, mười ngày', level: 'N5', breakdown: '十 (Thập) + 日 (Nhật)', mnemonic: 'Cột mốc 10 ngày trong tháng.' },
      { kanji: '二十歳', hiragana: 'はたち (hatachi)', sinoVietnamese: 'NHỊ THẬP TUẾ', meaning: '20 tuổi (tuổi trưởng thành)', level: 'N4', breakdown: '二 (Nhị) + 十 (Thập) + 歳 (Tuế)', mnemonic: 'Cột mốc tròn hai mươi tuổi.' },
      { kanji: '千', hiragana: 'せん (sen)', sinoVietnamese: 'THIÊN', meaning: 'Một nghìn (1.000)', level: 'N5', breakdown: 'Thập có nét phẩy', mnemonic: 'Gấp 100 lần số Mười là số Thiên.' },
      { kanji: '午', hiragana: 'ご (go)', sinoVietnamese: 'NGỌ', meaning: 'Buổi trưa, giờ Ngọ', level: 'N5', breakdown: 'Thập nhô lên nét phẩy', mnemonic: 'Đúng 12 giờ trưa ánh nắng chiếu đỉnh đầu.' },
      { kanji: '午前', hiragana: 'ごぜん (gozen)', sinoVietnamese: 'NGỌ TIỀN', meaning: 'Buổi sáng, trước 12h trưa (AM)', level: 'N5', breakdown: '午 (Ngọ) + 前 (Tiền)', mnemonic: 'Thời gian trước giờ ngọ.' },
      { kanji: '午後', hiragana: 'ごご (gogo)', sinoVietnamese: 'NGỌ HẬU', meaning: 'Buổi chiều, sau 12h trưa (PM)', level: 'N5', breakdown: '午 (Ngọ) + 後 (Hậu)', mnemonic: 'Thời gian sau giờ ngọ.' },
      { kanji: '協調', hiragana: 'きょうちょう (kyōchō)', sinoVietnamese: 'HIỆP ĐIỀU', meaning: 'Hợp tác hài hòa, phối hợp', level: 'N2', breakdown: '十 (Thập) + 3 chữ Lực (力)', mnemonic: 'Mười người chung sức hiệp lực làm việc.' },
      { kanji: '協力', hiragana: 'きょうりょく (kyōryoku)', sinoVietnamese: 'HIỆP LỰC', meaning: 'Hợp tác, chung sức giúp đỡ', level: 'N4', breakdown: '協 (Hiệp) + 力 (Lực)', mnemonic: 'Cùng nhau góp mười phần sức lực.' }
    ]
  },
  {
    stt: 25,
    strokeCount: 2,
    radical: '卜',
    name: 'Bốc',
    meaning: 'Xem bói',
    mnemonic: 'Vết nứt trên mai rùa khi người xưa đốt lửa xem bói toán.',
    relatedVocab: [
      { kanji: '占う', hiragana: 'うらなう (uranau)', sinoVietnamese: 'CHIÊM', meaning: 'Bói toán, đoán trước', level: 'N2', breakdown: '卜 (Bốc) + 口 (Khẩu)', mnemonic: 'Xem quẻ bói vết nứt trên mai rùa rồi mở miệng phán.' },
      { kanji: '占い', hiragana: 'うらない (uranai)', sinoVietnamese: 'CHIÊM', meaning: 'Quẻ bói, việc bói toán', level: 'N3', breakdown: '占 (Chiêm) + い', mnemonic: 'Lời tiên tri của thầy bói.' },
      { kanji: '占める', hiragana: 'しめる (shimeru)', sinoVietnamese: 'CHIÊM', meaning: 'Chiếm cứ, nắm giữ tỉ lệ', level: 'N2', breakdown: '占 (Chiêm) + める', mnemonic: 'Chiếm giữ vị trí đắc địa theo quẻ bói.' },
      { kanji: '独占', hiragana: 'どくせん (dokusen)', sinoVietnamese: 'ĐỘC CHIÊM', meaning: 'Độc quyền, chiếm độc tôn', level: 'N2', breakdown: '独 (Độc) + 占 (Chiêm)', mnemonic: 'Một mình thâu tóm toàn bộ thị trường.' },
      { kanji: '占領', hiragana: 'せんりょう (senryō)', sinoVietnamese: 'CHIÊM LÃNH', meaning: 'Chiếm đóng lãnh thổ', level: 'N1', breakdown: '占 (Chiêm) + 領 (Lãnh)', mnemonic: 'Đóng quân kiểm soát lãnh thổ.' },
      { kanji: '卦', hiragana: 'け (ke)', sinoVietnamese: 'QUÁI', meaning: 'Quẻ bói trong Kinh Dịch', level: 'N1', breakdown: '圭 (Khuê) + 卜 (Bốc)', mnemonic: 'Tám quẻ Bát quái suy đoán vận mệnh.' },
      { kanji: '卜筮', hiragana: 'ぼくぜい (bokuzei)', sinoVietnamese: 'BỐC PHỆ', meaning: 'Xem bói cỏ thi và mai rùa', level: 'N1', breakdown: '卜 (Bốc) + 筮 (Phệ)', mnemonic: 'Nghệ thuật chiêm bốc cổ truyền.' },
      { kanji: '上', hiragana: 'うえ (ue)', sinoVietnamese: 'THƯỢNG', meaning: 'Phía trên, bên trên', level: 'N5', breakdown: 'Nét ngang kèm nét 卜 chỉ phía trên', mnemonic: 'Dấu chỉ định vị trí ở phía trên.' },
      { kanji: '予言', hiragana: 'よげん (yogen)', sinoVietnamese: 'DỰ NGÔN', meaning: 'Lời tiên tri, dự đoán tương lai', level: 'N2', breakdown: '予 (Dự) + 言 (Ngôn)', mnemonic: 'Lời nói báo trước điều sắp xảy ra.' },
      { kanji: '的確', hiragana: 'てきかく (tekikaku)', sinoVietnamese: 'ĐÍCH XÁC', meaning: 'Chính xác, trúng hồng tâm', level: 'N2', breakdown: '的 (Đích có 卜) + 確 (Xác)', mnemonic: 'Đoán trúng đích như thần.' }
    ]
  },
  {
    stt: 26,
    strokeCount: 2,
    radical: '卩',
    name: 'Tiết',
    meaning: 'Đốt tre, quyền hành',
    mnemonic: 'Hình người đang quỳ gối phục tùng hoặc một đốt cây tre.',
    relatedVocab: [
      { kanji: '印', hiragana: 'しるし / いん (in)', sinoVietnamese: 'ẤN', meaning: 'Con dấu, dấu ấn', level: 'N3', breakdown: '爪 (Trảo) + 卩 (Tiết)', mnemonic: 'Tay cầm con dấu ấn xuống giấy ký kết.' },
      { kanji: '印象', hiragana: 'いんしょう (inshō)', sinoVietnamese: 'ẤN TƯỢNG', meaning: 'Ấn tượng sâu đậm', level: 'N3', breakdown: '印 (Ấn) + 象 (Tượng)', mnemonic: 'Hình ảnh in hằn sâu trong tâm trí.' },
      { kanji: '印刷', hiragana: 'いんさつ (insatsu)', sinoVietnamese: 'ẤN LOÁT', meaning: 'Việc in ấn, in tài liệu', level: 'N3', breakdown: '印 (Ấn) + 刷 (Loát)', mnemonic: 'Quét mực đóng dấu in hàng loạt.' },
      { kanji: '卵', hiragana: 'たまご (tamago)', sinoVietnamese: 'NOÃN', meaning: 'Quả trứng', level: 'N5', breakdown: 'Hai nửa vỏ trứng có phôi 卩', mnemonic: 'Hai mảnh vỏ trứng vừa tách đôi ra.' },
      { kanji: '危ない', hiragana: 'あぶない (abunai)', sinoVietnamese: 'NGUY', meaning: 'Nguy hiểm, nguy cấp', level: 'N5', breakdown: 'Người đứng bên bờ vực quỳ gối 卩', mnemonic: 'Đứng chênh vênh mép vực vô cùng nguy hiểm.' },
      { kanji: '危険', hiragana: 'きけん (kiken)', sinoVietnamese: 'NGUY HIỂM', meaning: 'Sự nguy hiểm, mối rủi ro', level: 'N4', breakdown: '危 (Nguy) + 険 (Hiểm)', mnemonic: 'Mối hiểm họa đe dọa an toàn.' },
      { kanji: '危機', hiragana: 'きき (kiki)', sinoVietnamese: 'NGUY CƠ', meaning: 'Khủng hoảng, nguy cơ', level: 'N2', breakdown: '危 (Nguy) + 機 (Cơ)', mnemonic: 'Trong nguy cơ luôn tiềm ẩn cơ hội.' },
      { kanji: '節', hiragana: 'ふし / せつ (setsu)', sinoVietnamese: 'TIẾT', meaning: 'Đốt tre, khớp xương, tiết kiệm', level: 'N3', breakdown: '竹 (Trúc) + 即 có 卩', mnemonic: 'Mỗi đốt cây tre đều phân chia rõ rệt.' },
      { kanji: '季節', hiragana: 'きせつ (kisetsu)', sinoVietnamese: 'QUÝ TIẾT', meaning: 'Mùa màng, các mùa trong năm', level: 'N4', breakdown: '季 (Quý) + 節 (Tiết)', mnemonic: 'Thời tiết bốn mùa luân chuyển.' },
      { kanji: '即座に', hiragana: 'そくざに (sokuzani)', sinoVietnamese: 'TỨC TỌA', meaning: 'Ngay tức khắc, ngay tại chỗ', level: 'N1', breakdown: '即 (Tức có 卩) + 座 (Tọa)', mnemonic: 'Phản ứng ngay lập tức khi vừa nghe thấy.' }
    ]
  },
  {
    stt: 27,
    strokeCount: 2,
    radical: '厂',
    name: 'Hán, xưởng',
    meaning: 'Sườn núi, vách đá',
    mnemonic: 'Hình vách đá nhô ra bên sườn núi cheo leo hiểm trở.',
    relatedVocab: [
      { kanji: '厚い', hiragana: 'あつい (atsui)', sinoVietnamese: 'HẬU', meaning: 'Dày dặn, nồng hậu', level: 'N4', breakdown: '厂 (Hán) + 日 + 子', mnemonic: 'Vách đá sườn núi dày dặn che chắn giông gió.' },
      { kanji: '厄介', hiragana: 'やっかい (yakkai)', sinoVietnamese: 'ÁCH GIỚI', meaning: 'Phiền toái, rắc rối', level: 'N2', breakdown: '厄 (Ách có 厂) + 介 (Giới)', mnemonic: 'Mối tai ương rắc rối rơi xuống đầu.' },
      { kanji: '原', hiragana: 'はら / げん (gen)', sinoVietnamese: 'NGUYÊN', meaning: 'Thảo nguyên, nguồn cội', level: 'N3', breakdown: '厂 (Hán) + 泉 (Tuyền - suối)', mnemonic: 'Dòng suối nguồn tuôn ra từ vách đá.' },
      { kanji: '原因', hiragana: 'げんいん (gen\'in)', sinoVietnamese: 'NGUYÊN NHÂN', meaning: 'Nguyên nhân gốc rễ', level: 'N4', breakdown: '原 (Nguyên) + 因 (Nhân)', mnemonic: 'Nguồn gốc sâu xa dẫn đến sự việc.' },
      { kanji: '原子', hiragana: 'げんし (genshi)', sinoVietnamese: 'NGUYÊN TỬ', meaning: 'Hạt nguyên tử', level: 'N2', breakdown: '原 (Nguyên) + 子 (Tử)', mnemonic: 'Hạt cơ bản cấu tạo nên vật chất.' },
      { kanji: '原料', hiragana: 'げんりょう (genryō)', sinoVietnamese: 'NGUYÊN LIỆU', meaning: 'Nguyên liệu thô ban đầu', level: 'N3', breakdown: '原 (Nguyên) + 料 (Liệu)', mnemonic: 'Vật liệu gốc khai thác từ tự nhiên.' },
      { kanji: '厳重', hiragana: 'げんじゅう (genjū)', sinoVietnamese: 'NGHIÊM TRỌNG', meaning: 'Nghiêm ngặt, cẩn mật', level: 'N2', breakdown: '厳 (Nghiêm có 厂) + 重 (Trọng)', mnemonic: 'Bảo vệ nghiêm mật như vách núi kiên cố.' },
      { kanji: '厳格', hiragana: 'げんかく (genkaku)', sinoVietnamese: 'NGHIÊM CÁCH', meaning: 'Nghiêm khắc, kỷ luật cao', level: 'N1', breakdown: '厳 (Nghiêm) + 格 (Cách)', mnemonic: 'Quy tắc khắt khe không nhân nhượng.' },
      { kanji: '歴', hiragana: 'れき (reki)', sinoVietnamese: 'LỊCH', meaning: 'Trải qua, lịch sử', level: 'N3', breakdown: '厂 (Hán) + 禾 (Hòa) + 止', mnemonic: 'Bước chân đi qua sườn núi ghi dấu năm tháng.' },
      { kanji: '歴史', hiragana: 'れきし (rekishi)', sinoVietnamese: 'LỊCH SỬ', meaning: 'Lịch sử ngàn năm', level: 'N4', breakdown: '歴 (Lịch) + 史 (Sử)', mnemonic: 'Những trang sử vàng của dân tộc.' }
    ]
  },
  {
    stt: 28,
    strokeCount: 2,
    radical: '厶',
    name: 'Khư, tư',
    meaning: 'Riêng tư, bản thân',
    mnemonic: 'Vòng tay khép kín giữ đồ dùng cho riêng tư cá nhân.',
    relatedVocab: [
      { kanji: '私', hiragana: 'わたし (watashi)', sinoVietnamese: 'TƯ', meaning: 'Tôi, riêng tư, cá nhân', level: 'N5', breakdown: '禾 (Hòa - lúa) + 厶 (Khư)', mnemonic: 'Phần thóc lúa riêng tư thu hoạch về nhà.' },
      { kanji: '私立', hiragana: 'しりつ (shiritsu)', sinoVietnamese: 'TƯ LẬP', meaning: 'Trường tư, tư nhân thành lập', level: 'N4', breakdown: '私 (Tư) + 立 (Lập)', mnemonic: 'Tổ chức do tư nhân bỏ vốn gây dựng.' },
      { kanji: '公私', hiragana: 'こうし (kōshi)', sinoVietnamese: 'CÔNG TƯ', meaning: 'Việc công và việc tư', level: 'N2', breakdown: '公 (Công) + 私 (Tư)', mnemonic: 'Rạch ròi giữa việc chung và việc riêng.' },
      { kanji: '去る', hiragana: 'さる (saru)', sinoVietnamese: 'KHỨ', meaning: 'Rời đi, qua đi', level: 'N3', breakdown: '土 (Thổ) + 厶 (Khư)', mnemonic: 'Chôn giấu chuyện riêng vào lòng đất rồi ra đi.' },
      { kanji: '去年', hiragana: 'きょねん (kyonen)', sinoVietnamese: 'KHỨ NIÊN', meaning: 'Năm ngoái, năm trước', level: 'N5', breakdown: '去 (Khứ) + 年 (Niên)', mnemonic: 'Năm cũ đã trôi qua vĩnh viễn.' },
      { kanji: '過去', hiragana: 'かこ (kako)', sinoVietnamese: 'QUÁ KHỨ', meaning: 'Quá khứ, ngày xưa', level: 'N3', breakdown: '過 (Quá) + 去 (Khứ)', mnemonic: 'Kỷ niệm đã lùi vào dĩ vãng.' },
      { kanji: '参る', hiragana: 'まいる (mairu)', sinoVietnamese: 'THAM', meaning: 'Đi, đến (khiêm nhường ngữ), bái lạy', level: 'N4', breakdown: 'Bộ 厶 kết hợp đại', mnemonic: 'Thành tâm đi đến đền thờ bái lạy.' },
      { kanji: '参加', hiragana: 'さんか (sanka)', sinoVietnamese: 'THAM GIA', meaning: 'Tham gia vào sự kiện', level: 'N4', breakdown: '参 (Tham) + 加 (Gia)', mnemonic: 'Góp mặt cùng mọi người trong hoạt động.' },
      { kanji: '参考', hiragana: 'さんこう (sankō)', sinoVietnamese: 'THAM KHẢO', meaning: 'Tham khảo tài liệu', level: 'N3', breakdown: '参 (Tham) + 考 (Khảo)', mnemonic: 'Đọc thêm tư liệu để cân nhắc.' },
      { kanji: '台', hiragana: 'だい (dai)', sinoVietnamese: 'ĐÀI', meaning: 'Cái bệ, đài, bục giảng', level: 'N4', breakdown: '厶 (Khư) + 口 (Khẩu)', mnemonic: 'Bục cao riêng tư để người đứng phát biểu.' }
    ]
  },
  {
    stt: 29,
    strokeCount: 2,
    radical: '又',
    name: 'Hựu',
    meaning: 'Lại nữa, một lần nữa',
    mnemonic: 'Hình bàn tay phải đang vươn ra nắm lấy vật gì đó.',
    relatedVocab: [
      { kanji: '又', hiragana: 'また (mata)', sinoVietnamese: 'HỰU', meaning: 'Lại, vả lại, lần nữa', level: 'N3', breakdown: 'Hình bàn tay phải đưa ra nắm lấy', mnemonic: 'Lại giơ tay nắm lấy cơ hội lần nữa.' },
      { kanji: '友', hiragana: 'とも (tomo)', sinoVietnamese: 'HỮU', meaning: 'Bạn bè thân thiết', level: 'N5', breakdown: 'Hai bàn tay 又 đan vào nhau', mnemonic: 'Hai bàn tay tri kỷ bắt chặt lấy nhau.' },
      { kanji: '友達', hiragana: 'ともだち (tomodachi)', sinoVietnamese: 'HỮU ĐẠT', meaning: 'Bạn bè đồng lứa', level: 'N5', breakdown: '友 (Hữu) + 達 (Đạt)', mnemonic: 'Những người bạn cùng chí hướng.' },
      { kanji: '友人', hiragana: 'ゆうじん (yūjin)', sinoVietnamese: 'HỮU NHÂN', meaning: 'Người bạn quý', level: 'N3', breakdown: '友 (Hữu) + 人 (Nhân)', mnemonic: 'Người bạn thân tình lâu năm.' },
      { kanji: '友好', hiragana: 'ゆうこう (yūkō)', sinoVietnamese: 'HỮU HẢO', meaning: 'Tình hữu nghị, hòa hảo', level: 'N2', breakdown: '友 (Hữu) + 好 (Hảo)', mnemonic: 'Mối quan hệ bang giao hữu nghị tốt đẹp.' },
      { kanji: '反省', hiragana: 'はんせい (hansei)', sinoVietnamese: 'PHẢN TỈNH', meaning: 'Tự kiểm điểm, nhìn nhận lỗi', level: 'N3', breakdown: '反 (Phản có 又) + 省 (Tỉnh)', mnemonic: 'Lật lại hành vi để tự nhắc nhở bản thân.' },
      { kanji: '反対', hiragana: 'はんたい (hantai)', sinoVietnamese: 'PHẢN ĐỐI', meaning: 'Phản đối, đối nghịch', level: 'N4', breakdown: '反 (Phản) + 対 (Đối)', mnemonic: 'Giơ tay ra dấu phản bác ý kiến.' },
      { kanji: '収める', hiragana: 'おさめる (osameru)', sinoVietnamese: 'THU', meaning: 'Thu thập, gặt hái, cất giữ', level: 'N2', breakdown: 'Bàn tay 又 thu nhận vào', mnemonic: 'Đưa tay thu gom thành quả về kho.' },
      { kanji: '収入', hiragana: 'しゅうにゅう (shūnyū)', sinoVietnamese: 'THU NHẬP', meaning: 'Thu nhập, tiền kiếm được', level: 'N3', breakdown: '収 (Thu) + 入 (Nhập)', mnemonic: 'Khoản tiền thực thu vào túi.' },
      { kanji: '双子', hiragana: 'ふたご (futago)', sinoVietnamese: 'SONG TỬ', meaning: 'Cặp sinh đôi', level: 'N3', breakdown: 'Hai chữ 又 cạnh nhau + 子', mnemonic: 'Hai đứa trẻ sinh đôi tay nắm tay.' }
    ]
  },
  // Nhóm 3 nét (Bộ 30 – 60)
  {
    stt: 30,
    strokeCount: 3,
    radical: '口',
    name: 'Khẩu',
    meaning: 'Cái miệng, lối vào',
    mnemonic: 'Hình cái miệng đang há to hình vuông tròn trịa.',
    relatedVocab: [
      { kanji: '口', hiragana: 'くち (kuchi)', sinoVietnamese: 'KHẨU', meaning: 'Miệng, cửa ngõ, lối vào', level: 'N5', breakdown: 'Hình cái miệng mở', mnemonic: 'Chiếc miệng mở ra trò chuyện và ăn uống.' },
      { kanji: '入口', hiragana: 'いりぐち (iriguchi)', sinoVietnamese: 'NHẬP KHẨU', meaning: 'Lối vào, cửa vào', level: 'N5', breakdown: '入 (Nhập) + 口 (Khẩu)', mnemonic: 'Cửa ngõ để bước vào trong tòa nhà.' },
      { kanji: '出口', hiragana: 'でぐち (deguchi)', sinoVietnamese: 'XUẤT KHẨU', meaning: 'Lối ra, cửa thoát', level: 'N5', breakdown: '出 (Xuất) + 口 (Khẩu)', mnemonic: 'Cửa đi ra ngoài an toàn.' },
      { kanji: '食べる', hiragana: 'たべる (taberu)', sinoVietnamese: 'THỰC', meaning: 'Ăn uống', level: 'N5', breakdown: 'Có bộ 口 kết hợp', mnemonic: 'Cho thức ăn ngon vào miệng nhai.' },
      { kanji: '飲む', hiragana: 'のむ (nomu)', sinoVietnamese: 'ẨM', meaning: 'Uống nước', level: 'N5', breakdown: 'Thực có Khẩu ân cần', mnemonic: 'Mở miệng uống từng ngụm nước trong lành.' },
      { kanji: '呼ぶ', hiragana: 'よぶ (yobu)', sinoVietnamese: 'HÔ', meaning: 'Gọi tên, mời gọi', level: 'N4', breakdown: '口 (Khẩu) + 乎', mnemonic: 'Mở miệng hô vang tên người bạn.' },
      { kanji: '吸う', hiragana: 'すう (suu)', sinoVietnamese: 'HẤP', meaning: 'Hít vào, hút thuốc', level: 'N5', breakdown: '口 (Khẩu) + 及', mnemonic: 'Mở miệng hít luồng không khí mát lành.' },
      { kanji: '吹く', hiragana: 'ふく (fuku)', sinoVietnamese: 'XÚY', meaning: 'Thổi (gió), thổi nến', level: 'N5', breakdown: '口 (Khẩu) + 欠', mnemonic: 'Chu miệng thổi tắt ngọn nến sinh nhật.' },
      { kanji: '吐く', hiragana: 'はく (haku)', sinoVietnamese: 'THỔ', meaning: 'Nôn ọe, thở dài', level: 'N2', breakdown: '口 (Khẩu) + 土 (Thổ)', mnemonic: 'Mở miệng nôn thốc ra mặt đất.' },
      { kanji: '叫ぶ', hiragana: 'さけぶ (sakebu)', sinoVietnamese: 'KHIẾU', meaning: 'Hét to, gào thét kêu cứu', level: 'N2', breakdown: '口 (Khẩu) + 丩', mnemonic: 'Hét toáng miệng giữa đám đông cầu cứu.' },
      { kanji: '味', hiragana: 'あじ (aji)', sinoVietnamese: 'VỊ', meaning: 'Hương vị, mùi vị', level: 'N4', breakdown: '口 (Khẩu) + 未 (Vị)', mnemonic: 'Nếm thử bằng miệng xem mùi vị thơm ngon không.' },
      { kanji: '歌', hiragana: 'うた (uta)', sinoVietnamese: 'CA', meaning: 'Bài hát, ca khúc', level: 'N5', breakdown: 'Có 口 + 欠 (Khiếm)', mnemonic: 'Mở miệng cất lên giai điệu bài ca rộn rã.' },
      { kanji: '問う', hiragana: 'とう (tou)', sinoVietnamese: 'VẤN', meaning: 'Hỏi, truy cứu trách nhiệm', level: 'N3', breakdown: '門 (Môn) + 口 (Khẩu)', mnemonic: 'Đứng trước cổng mở miệng hỏi thăm đường.' },
      { kanji: '答える', hiragana: 'こたえる (kotaeru)', sinoVietnamese: 'ĐÁP', meaning: 'Trả lời, đáp ứng', level: 'N5', breakdown: '竹 (Trúc) + 合 có 口', mnemonic: 'Mở miệng hồi đáp chuẩn xác câu hỏi.' },
      { kanji: '喜ぶ', hiragana: 'よろこぶ (yorokobu)', sinoVietnamese: 'HỈ', meaning: 'Vui mừng, hân hoan', level: 'N4', breakdown: 'Chuỗi miệng 口 cười vang', mnemonic: 'Niềm vui sướng khiến miệng cười toe toét.' },
      { kanji: '器', hiragana: 'うつわ / き (ki)', sinoVietnamese: 'KHÍ', meaning: 'Dụng cụ, đồ chứa, khí phách', level: 'N2', breakdown: '4 chữ 口 quanh Khuyển', mnemonic: 'Bốn chiếc chén bát đặt ngay ngắn trên bàn.' },
      { kanji: '喫茶店', hiragana: 'きっさてん (kissaten)', sinoVietnamese: 'KHIẾT TRÀ ĐIẾM', meaning: 'Quán cà phê, tiệm trà', level: 'N5', breakdown: '喫 (Khiết có 口) + 茶 + 店', mnemonic: 'Quán trà ngồi nhâm nhi trò chuyện.' },
      { kanji: '合唱', hiragana: 'がっしょう (gasshō)', sinoVietnamese: 'HỢP XƯỚNG', meaning: 'Hát hợp xướng, đồng ca', level: 'N1', breakdown: '合 + 唱 (Xướng có 3 口)', mnemonic: 'Nhiều người cùng mở miệng hòa chung tiếng hát.' }
    ]
  },
  {
    stt: 31,
    strokeCount: 3,
    radical: '囗',
    name: 'Vi',
    meaning: 'Vây quanh, bao bọc bốn phía',
    mnemonic: 'Bức tường thành bốn phía khép kín bao vây bên ngoài (to hơn bộ Khẩu).',
    relatedVocab: [
      { kanji: '国', hiragana: 'くに / こく (koku)', sinoVietnamese: 'QUỐC', meaning: 'Đất nước, quốc gia', level: 'N5', breakdown: '囗 (Vi) bao bọc 玉 (Ngọc)', mnemonic: 'Tường thành vững chắc bao bọc ngọc ngà tổ quốc.' },
      { kanji: '外国', hiragana: 'がいこく (gaikoku)', sinoVietnamese: 'NGOẠI QUỐC', meaning: 'Nước ngoài', level: 'N5', breakdown: '外 (Ngoại) + 国 (Quốc)', mnemonic: 'Các quốc gia bên ngoài bờ cõi.' },
      { kanji: '四', hiragana: 'よん / し (shi)', sinoVietnamese: 'TỨ', meaning: 'Số bốn (4)', level: 'N5', breakdown: '囗 (Vi) bao quanh nét phẩy cong', mnemonic: 'Bốn bức tường khép kín bao quanh căn phòng.' },
      { kanji: '回る', hiragana: 'まわる (mawaru)', sinoVietnamese: 'HỒI', meaning: 'Quay vòng, xoay quanh', level: 'N4', breakdown: '囗 lớn bao bọc 口 nhỏ', mnemonic: 'Vòng tròn lớn xoay quanh vòng tròn nhỏ.' },
      { kanji: '今回', hiragana: 'こんかい (konkai)', sinoVietnamese: 'KIM HỒI', meaning: 'Lần này', level: 'N4', breakdown: '今 (Kim) + 回 (Hồi)', mnemonic: 'Lượt quay vòng lần này.' },
      { kanji: '図', hiragana: 'ず / と (zu)', sinoVietnamese: 'ĐỒ', meaning: 'Bản đồ, sơ đồ', level: 'N4', breakdown: '囗 (Vi) bao bọc bản đồ bên trong', mnemonic: 'Bức vẽ sơ đồ đóng khung ngay ngắn.' },
      { kanji: '図書館', hiragana: 'としょかん (toshokan)', sinoVietnamese: 'ĐỒ THƯ QUÁN', meaning: 'Thư viện', level: 'N5', breakdown: '図 + 書 (Thư) + 館 (Quán)', mnemonic: 'Tòa nhà lưu giữ sách và bản đồ quý.' },
      { kanji: '園', hiragana: 'その / えん (en)', sinoVietnamese: 'VIÊN', meaning: 'Vườn cây, công viên', level: 'N4', breakdown: '囗 (Vi) bao quanh Viên', mnemonic: 'Hàng rào bao quanh khu vườn hoa quả.' },
      { kanji: '公園', hiragana: 'こうえん (kōen)', sinoVietnamese: 'CÔNG VIÊN', meaning: 'Công viên công cộng', level: 'N5', breakdown: '公 (Công) + 園 (Viên)', mnemonic: 'Khu vườn chung cho toàn thể người dân.' },
      { kanji: '困る', hiragana: 'こまる (komaru)', sinoVietnamese: 'KHỐN', meaning: 'Khó khăn, bối rối', level: 'N5', breakdown: '囗 (Vi) nhốt 木 (Mộc)', mnemonic: 'Cây bị nhốt trong hộp kín không lớn được, lâm cảnh khốn cùng.' },
      { kanji: '困難', hiragana: 'こんなん (konnan)', sinoVietnamese: 'KHỐN NAN', meaning: 'Khó khăn, gian nan', level: 'N3', breakdown: '困 (Khốn) + 難 (Nan)', mnemonic: 'Vượt qua muôn trùng sóng gió gian nan.' },
      { kanji: '固い', hiragana: 'かたい (katai)', sinoVietnamese: 'CỐ', meaning: 'Cứng nhắc, kiên cố', level: 'N3', breakdown: '囗 (Vi) bao bọc 古 (Cổ)', mnemonic: 'Đồ cổ bọc trong thành kiên cố vô cùng rắn rỏi.' }
    ]
  },
  {
    stt: 32,
    strokeCount: 3,
    radical: '土',
    name: 'Thổ',
    meaning: 'Đất đai, thổ nhưỡng',
    mnemonic: 'Mầm cây (chữ Thập 十) đâm chồi nhú lên từ mặt đất (nét ngang dưới dài hơn).',
    relatedVocab: [
      { kanji: '土', hiragana: 'つち / ど (do)', sinoVietnamese: 'THỔ', meaning: 'Đất đai, thổ nhưỡng', level: 'N5', breakdown: 'Mầm nhú trên mặt đất', mnemonic: 'Nền đất phì nhiêu nuôi dưỡng cỏ cây sinh sôi.' },
      { kanji: '土曜日', hiragana: 'どようび (doyōbi)', sinoVietnamese: 'THỔ DIỆU NHẬT', meaning: 'Thứ bảy', level: 'N5', breakdown: '土 (Thổ) + 曜日', mnemonic: 'Ngày của Thổ tinh trong tuần.' },
      { kanji: '土地', hiragana: 'とち (tochi)', sinoVietnamese: 'THỔ ĐỊA', meaning: 'Khu đất, thổ địa', level: 'N3', breakdown: '土 (Thổ) + 地 (Địa)', mnemonic: 'Mảnh đất thuộc quyền sở hữu.' },
      { kanji: '地下鉄', hiragana: 'ちかてつ (chikatetsu)', sinoVietnamese: 'ĐỊA HẠ THIẾT', meaning: 'Tàu điện ngầm', level: 'N5', breakdown: '地 (Địa) + 下 (Hạ) + 鉄', mnemonic: 'Tuyến đường sắt chạy dưới lòng đất.' },
      { kanji: '地震', hiragana: 'じしん (jishin)', sinoVietnamese: 'ĐỊA CHẤN', meaning: 'Trận động đất', level: 'N4', breakdown: '地 (Địa) + 震 (Chấn)', mnemonic: 'Mặt đất rung chuyển dữ dội.' },
      { kanji: '坂', hiragana: 'さか (saka)', sinoVietnamese: 'PHẢN', meaning: 'Dốc, con dốc nghiêng', level: 'N4', breakdown: '土 (Thổ) + 反 (Phản)', mnemonic: 'Đất đắp nghiêng dốc ngược sườn núi.' },
      { kanji: '城', hiragana: 'しろ / じょう (jō)', sinoVietnamese: 'THÀNH', meaning: 'Lâu đài, thành lũy', level: 'N3', breakdown: '土 (Thổ) + 成 (Thành)', mnemonic: 'Đắp đất xây nên tòa thành sừng sững.' },
      { kanji: '地域', hiragana: 'ちいき (chiiki)', sinoVietnamese: 'ĐỊA VỰC', meaning: 'Vùng lãnh thổ, địa bàn', level: 'N3', breakdown: '地 (Địa) + 域 (Vực có Thổ)', mnemonic: 'Khu vực địa lý xác định rõ ràng.' },
      { kanji: '埋める', hiragana: 'うめる (umeru)', sinoVietnamese: 'MAI', meaning: 'Chôn lấp, lấp đầy', level: 'N2', breakdown: '土 (Thổ) + 里 (Lý)', mnemonic: 'Đào đất chôn giấu kho báu tại quê nhà.' },
      { kanji: '塔', hiragana: 'とう (tō)', sinoVietnamese: 'THÁP', meaning: 'Tòa tháp cao tầng', level: 'N2', breakdown: '土 (Thổ) + 荅', mnemonic: 'Tháp đất đá vươn cao chọc trời.' },
      { kanji: '増える', hiragana: 'ふえる (fueru)', sinoVietnamese: 'TĂNG', meaning: 'Tăng lên, sinh sôi', level: 'N4', breakdown: '土 (Thổ) + 曽', mnemonic: 'Đất bồi đắp thêm làm tăng diện tích.' },
      { kanji: '壁', hiragana: 'かべ (kabe)', sinoVietnamese: 'BÍCH', meaning: 'Bức tường, rào cản', level: 'N3', breakdown: 'Bích trên bộ 土 (Thổ)', mnemonic: 'Bức tường đất vững chãi ngăn cách.' },
      { kanji: '壊す', hiragana: 'こわす (kowasu)', sinoVietnamese: 'HOẠI', meaning: 'Làm hỏng, phá hủy', level: 'N4', breakdown: '土 (Thổ) + 褱', mnemonic: 'Đập nát công trình xuống mặt đất.' }
    ]
  },
  {
    stt: 33,
    strokeCount: 3,
    radical: '士',
    name: 'Sỹ',
    meaning: 'Kẻ sĩ, quan lại có học',
    mnemonic: 'Người học rộng: học Một (一) biết Mười (十) là kẻ sĩ (nét ngang trên dài hơn).',
    relatedVocab: [
      { kanji: '武士', hiragana: 'ぶし (bushi)', sinoVietnamese: 'VŨ SĨ', meaning: 'Võ sĩ đạo, Samurai', level: 'N3', breakdown: '武 (Vũ) + 士 (Sĩ)', mnemonic: 'Người võ sĩ trung dũng xông pha bảo vệ chính nghĩa.' },
      { kanji: '博士', hiragana: 'はかせ / はくし (hakase)', sinoVietnamese: 'BÁC SĨ', meaning: 'Tiến sĩ, chuyên gia sâu rộng', level: 'N3', breakdown: '博 (Bác) + 士 (Sĩ)', mnemonic: 'Học giả uyên bác tài ba tột bậc.' },
      { kanji: '紳士', hiragana: 'しんし (shinshi)', sinoVietnamese: 'THÂN SĨ', meaning: 'Quý ông lịch lãm', level: 'N2', breakdown: '紳 (Thân) + 士 (Sĩ)', mnemonic: 'Bậc trí thức cư xử nhã nhặn tôn nghiêm.' },
      { kanji: '弁護士', hiragana: 'べんごし (bengoshi)', sinoVietnamese: 'BIỆN HỘ SĨ', meaning: 'Luật sư bào chữa', level: 'N3', breakdown: '弁 (Biện) + 護 (Hộ) + 士 (Sĩ)', mnemonic: 'Luật sư dùng tài hùng biện bảo vệ thân chủ.' },
      { kanji: '志', hiragana: 'こころざし (kokorozashi)', sinoVietnamese: 'CHÍ', meaning: 'Ý chí, nguyện vọng hoài bão', level: 'N2', breakdown: '士 (Sĩ) + 心 (Tâm)', mnemonic: 'Ý chí sắt đá nung nấu trong tâm kẻ sĩ.' },
      { kanji: '志望', hiragana: 'しぼう (shibō)', sinoVietnamese: 'CHÍ VỌNG', meaning: 'Nguyện vọng, ước mơ thi tuyển', level: 'N2', breakdown: '志 (Chí) + 望 (Vọng)', mnemonic: 'Nuôi hoài bão thi đỗ trường mơ ước.' },
      { kanji: '壮大', hiragana: 'そうだい (sōdai)', sinoVietnamese: 'TRÁNG ĐẠI', meaning: 'Hùng vĩ, hoành tráng', level: 'N1', breakdown: '壮 (Tráng có 士) + 大 (Đại)', mnemonic: 'Cảnh tượng tráng lệ huy hoàng quy mô lớn.' },
      { kanji: '壮絶', hiragana: 'そうぜつ (sōzetsu)', sinoVietnamese: 'TRÁNG TUYỆT', meaning: 'Anh dũng tuyệt vời, vô cùng oanh liệt', level: 'N1', breakdown: '壮 (Tráng) + 絶 (Tuyệt)', mnemonic: 'Trận chiến oanh liệt của các bậc nghĩa sĩ.' },
      { kanji: '声', hiragana: 'こえ (koe)', sinoVietnamese: 'THANH', meaning: 'Tiếng, giọng nói', level: 'N5', breakdown: 'Có nét 士 phía trên', mnemonic: 'Tiếng hô dõng dạc của trượng phu.' },
      { kanji: '声明', hiragana: 'せいめい (seimei)', sinoVietnamese: 'THANH MINH', meaning: 'Tuyên bố chính thức', level: 'N1', breakdown: '声 (Thanh) + 明 (Minh)', mnemonic: 'Phát ngôn tuyên cáo rõ ràng trước công chúng.' }
    ]
  },
  {
    stt: 34,
    strokeCount: 3,
    radical: '夂',
    name: 'Trĩ',
    meaning: 'Đến ở phía sau',
    mnemonic: 'Hình bàn chân bước đi nhưng bị vướng víu nên tụt lại phía sau.',
    relatedVocab: [
      { kanji: '各', hiragana: 'おのおの / かく (kaku)', sinoVietnamese: 'CÁC', meaning: 'Mỗi, các, từng cái', level: 'N3', breakdown: '夂 (Trĩ) + 口 (Khẩu)', mnemonic: 'Mỗi người bước đến cất lời phát biểu riêng.' },
      { kanji: '各自', hiragana: 'かくじ (kakuji)', sinoVietnamese: 'CÁC TỰ', meaning: 'Mỗi người, từng cá nhân', level: 'N3', breakdown: '各 (Các) + 自 (Tự)', mnemonic: 'Mỗi cá nhân tự chịu trách nhiệm.' },
      { kanji: '冬', hiragana: 'ふゆ (fuyu)', sinoVietnamese: 'ĐÔNG', meaning: 'Mùa đông lạnh giá', level: 'N5', breakdown: '夂 (Trĩ) + 2 chấm băng giá', mnemonic: 'Bước chân mùa đông lạnh buốt có tuyết rơi.' },
      { kanji: '冬休み', hiragana: 'ふゆやすみ (fuyuyasumi)', sinoVietnamese: 'ĐÔNG HƯU', meaning: 'Kỳ nghỉ đông', level: 'N5', breakdown: '冬 (Đông) + 休 (Hưu)', mnemonic: 'Khoảng thời gian nghỉ ngơi ấm áp mùa đông.' },
      { kanji: '処', hiragana: 'しょ (sho)', sinoVietnamese: 'XỬ', meaning: 'Nơi chốn, giải quyết xử lý', level: 'N3', breakdown: '夂 (Trĩ) + 几 (Kỷ)', mnemonic: 'Bước chân đến ngồi lên ghế xử lý việc.' },
      { kanji: '処理', hiragana: 'しょり (shori)', sinoVietnamese: 'XỬ LÝ', meaning: 'Xử lý, giải quyết công việc', level: 'N3', breakdown: '処 (Xử) + 理 (Lý)', mnemonic: 'Giải quyết êm xuôi từng vấn đề phát sinh.' },
      { kanji: '処分', hiragana: 'しょぶん (shobun)', sinoVietnamese: 'XỬ PHÂN', meaning: 'Xử phạt, thanh lý đồ vứt bỏ', level: 'N2', breakdown: '処 (Xử) + 分 (Phân)', mnemonic: 'Thanh lý giải phóng đồ cũ.' },
      { kanji: '条約', hiragana: 'じょうやく (jōyaku)', sinoVietnamese: 'ĐIỀU ƯỚC', meaning: 'Hiệp ước, điều ước quốc tế', level: 'N2', breakdown: '条 (Điều có 夂) + 約 (Ước)', mnemonic: 'Hiệp ước văn bản quy định từng điều khoản.' },
      { kanji: '条件', hiragana: 'じょうけん (jōken)', sinoVietnamese: 'ĐIỀU KIỆN', meaning: 'Điều kiện tiên quyết', level: 'N3', breakdown: '条 (Điều) + 件 (Kiện)', mnemonic: 'Điều kiện bắt buộc cần phải thỏa mãn.' },
      { kanji: '条理', hiragana: 'じょうり (jōri)', sinoVietnamese: 'ĐIỀU LÝ', meaning: 'Đạo lý, tính hợp lý', level: 'N1', breakdown: '条 (Điều) + 理 (Lý)', mnemonic: 'Lý lẽ thông suốt hợp với luân thường.' }
    ]
  },
  {
    stt: 35,
    strokeCount: 3,
    radical: '夊',
    name: 'Truy',
    meaning: 'Đi chậm rãi',
    mnemonic: 'Hình người lê bước chân đi từ từ, thong thả chậm rãi.',
    relatedVocab: [
      { kanji: '変', hiragana: 'へん (hen) / かわる', sinoVietnamese: 'BIẾN', meaning: 'Kỳ lạ, biến đổi', level: 'N4', breakdown: 'Đầu có 夊 ở dưới kéo lê chân', mnemonic: 'Thay đổi bước chân biến thành người khác.' },
      { kanji: '変化', hiragana: 'へんか (henka)', sinoVietnamese: 'BIẾN HÓA', meaning: 'Sự thay đổi, biến hóa', level: 'N4', breakdown: '変 (Biến) + 化 (Hóa)', mnemonic: 'Vạn vật không ngừng chuyển động đổi thay.' },
      { kanji: '夏', hiragana: 'なつ (natsu)', sinoVietnamese: 'HẠ', meaning: 'Mùa hè nắng ấm', level: 'N5', breakdown: 'Đầu đội nón, chân 夊 bước chậm', mnemonic: 'Trời hè nóng nực chân bước đi uể oải.' },
      { kanji: '夏休み', hiragana: 'なつやすみ (natsuyasumi)', sinoVietnamese: 'HẠ HƯU', meaning: 'Kỳ nghỉ hè', level: 'N5', breakdown: '夏 (Hạ) + 休 (Hưu)', mnemonic: 'Kỳ nghỉ dài ngày tắm biển vui tươi.' },
      { kanji: '麦', hiragana: 'むぎ (mugi)', sinoVietnamese: 'MẠCH', meaning: 'Lúa mạch, lúa mì', level: 'N3', breakdown: 'Lai có chân 夊 phía dưới', mnemonic: 'Mùa hè lúa mạch chín vàng rộm đồng.' },
      { kanji: '複', hiragana: 'ふく (fuku)', sinoVietnamese: 'PHỨC', meaning: 'Phức tạp, lặp lại nhiều lần', level: 'N3', breakdown: 'Y + Phục có 夊', mnemonic: 'Nhiều lớp áo chồng chéo phức tạp.' },
      { kanji: '複雑', hiragana: 'ふくざつ (fukuzatsu)', sinoVietnamese: 'PHỨC TẠP', meaning: 'Phức tạp, rối rắm', level: 'N4', breakdown: '複 (Phức) + 雑 (Tạp)', mnemonic: 'Tình huống khó gỡ đầy khúc mắc.' },
      { kanji: '復旧', hiragana: 'ふっきゅう (fukkyū)', sinoVietnamese: 'PHỤC CỰU', meaning: 'Khôi phục lại hiện trạng cũ', level: 'N2', breakdown: '復 (Phục có 夊) + 旧 (Cựu)', mnemonic: 'Tái lập nguyên trạng hệ thống sau sự cố.' },
      { kanji: '復活', hiragana: 'ふっかつ (fukkatsu)', sinoVietnamese: 'PHỤC HOẠT', meaning: 'Hồi sinh, sống lại', level: 'N2', breakdown: '復 (Phục) + 活 (Hoạt)', mnemonic: 'Sức sống trỗi dậy mãnh liệt trở lại.' },
      { kanji: '後悔', hiragana: 'こうかい (kōkai)', sinoVietnamese: 'HẬU HỐI', meaning: 'Hối hận, nuối tiếc', level: 'N3', breakdown: '後 (Hậu có 夊) + 悔 (Hối)', mnemonic: 'Bước chân lỡ nhịp để rồi hối tiếc về sau.' }
    ]
  },
  {
    stt: 36,
    strokeCount: 3,
    radical: '夕',
    name: 'Tịch',
    meaning: 'Đêm tối, buổi chiều tà',
    mnemonic: 'Vầng trăng khuyết bị mây che bớt một nét khi màn đêm buông xuống.',
    relatedVocab: [
      { kanji: '夕方', hiragana: 'ゆうがた (yūgata)', sinoVietnamese: 'TỊCH PHƯƠNG', meaning: 'Buổi chiều tà, hoàng hôn', level: 'N5', breakdown: '夕 (Tịch) + 方 (Phương)', mnemonic: 'Bóng chiều buông xuống nơi góc trời.' },
      { kanji: '夕食', hiragana: 'ゆうしょく (yūshoku)', sinoVietnamese: 'TỊCH THỰC', meaning: 'Bữa cơm tối', level: 'N5', breakdown: '夕 (Tịch) + 食 (Thực)', mnemonic: 'Bữa cơm sum vầy gia đình lúc chiều muộn.' },
      { kanji: '夕日', hiragana: 'ゆうひ (yūhi)', sinoVietnamese: 'TỊCH NHẬT', meaning: 'Ánh nắng chiều tà', level: 'N3', breakdown: '夕 (Tịch) + 日 (Nhật)', mnemonic: 'Vầng mặt trời đỏ ối khuất dần sau núi.' },
      { kanji: '夜', hiragana: 'よる (yoru)', sinoVietnamese: 'DẠ', meaning: 'Đêm tối', level: 'N5', breakdown: 'Đầu có 夕 kết hợp', mnemonic: 'Chiều tàn nhường chỗ cho màn đêm tĩnh mịch.' },
      { kanji: '多', hiragana: 'おおい (ōi)', sinoVietnamese: 'ĐA', meaning: 'Nhiều, phong phú', level: 'N5', breakdown: 'Hai chữ 夕 chồng lên nhau', mnemonic: 'Nhiều đêm liền tích lũy thành số lượng lớn.' },
      { kanji: '多数', hiragana: 'たすう (tasū)', sinoVietnamese: 'ĐA SỐ', meaning: 'Đa số, phần đông', level: 'N3', breakdown: '多 (Đa) + 数 (Số)', mnemonic: 'Số lượng chiếm phần lớn.' },
      { kanji: '外国', hiragana: 'がいこく (gaikoku)', sinoVietnamese: 'NGOẠI QUỐC', meaning: 'Nước ngoài', level: 'N5', breakdown: '外 (Ngoại có 夕) + 国 (Quốc)', mnemonic: 'Quốc gia nằm ngoài ranh giới bản xứ.' },
      { kanji: '名刺', hiragana: 'めいし (meishi)', sinoVietnamese: 'DANH THỨ', meaning: 'Danh thiếp, card visit', level: 'N3', breakdown: '名 (Danh có 夕) + 刺 (Thứ)', mnemonic: 'Tấm thiệp in tên giao tiếp buổi gặp mặt.' },
      { kanji: '夢', hiragana: 'ゆめ (yume)', sinoVietnamese: 'MỘNG', meaning: 'Giấc mơ, ước mơ hoài bão', level: 'N3', breakdown: 'Thảo + Mắt + 夕 (Tịch)', mnemonic: 'Nhắm mắt lúc chiều tối chìm vào giấc mộng đẹp.' },
      { kanji: '夢中', hiragana: 'むちゅう (muchū)', sinoVietnamese: 'MỘNG TRUNG', meaning: 'Say mê, đắm chìm say đắm', level: 'N3', breakdown: '夢 (Mộng) + 中 (Trung)', mnemonic: 'Chìm đắm đam mê như lạc vào cơn mơ.' }
    ]
  },
  {
    stt: 37,
    strokeCount: 3,
    radical: '大',
    name: 'Đại',
    meaning: 'To lớn, vĩ đại',
    mnemonic: 'Hình người (Nhân 人) dang rộng cả hai tay và hai chân hết cỡ.',
    relatedVocab: [
      { kanji: '大きい', hiragana: 'おおきい (ōkii)', sinoVietnamese: 'ĐẠI', meaning: 'To lớn, vĩ đại', level: 'N5', breakdown: 'Người dang rộng hai tay hai chân', mnemonic: 'Dang rộng tay hết cỡ để biểu thị to lớn.' },
      { kanji: '大学', hiragana: 'だいがく (daigaku)', sinoVietnamese: 'ĐẠI HỌC', meaning: 'Trường đại học', level: 'N5', breakdown: '大 (Đại) + 学 (Học)', mnemonic: 'Nơi học tập đỉnh cao tri thức nhân loại.' },
      { kanji: '大人', hiragana: 'おとな (otona)', sinoVietnamese: 'ĐẠI NHÂN', meaning: 'Người lớn, người trưởng thành', level: 'N5', breakdown: '大 (Đại) + 人 (Nhân)', mnemonic: 'Người đã khôn lớn trưởng thành tự lập.' },
      { kanji: '大切', hiragana: 'たいせつ (taisetsu)', sinoVietnamese: 'ĐẠI THIẾT', meaning: 'Quan trọng, quý báu', level: 'N5', breakdown: '大 (Đại) + 切 (Thiết)', mnemonic: 'Điều vô cùng trân quý không thể thiếu.' },
      { kanji: '大変', hiragana: 'たいへん (taihen)', sinoVietnamese: 'ĐẠI BIẾN', meaning: 'Vất vả, khó khăn, rất...', level: 'N5', breakdown: '大 (Đại) + 変 (Biến)', mnemonic: 'Biến cố lớn cần nỗ lực vượt qua.' },
      { kanji: '太陽', hiragana: 'たいよう (taiyō)', sinoVietnamese: 'THÁI DƯƠNG', meaning: 'Mặt trời rực rỡ', level: 'N4', breakdown: '太 (Thái có 大) + 陽 (Dương)', mnemonic: 'Vầng thái dương tỏa ánh hào quang.' },
      { kanji: '太い', hiragana: 'ふとい (futoi)', sinoVietnamese: 'THÁI', meaning: 'Dày dặn, mập mạp', level: 'N5', breakdown: '大 (Đại) thêm dấu chấm', mnemonic: 'To lớn đẫy đà vững chãi.' },
      { kanji: '夫', hiragana: 'おっと (otto)', sinoVietnamese: 'PHU', meaning: 'Chồng mình', level: 'N4', breakdown: 'Đại có trâm cài đầu', mnemonic: 'Người trượng phu gánh vác việc gia đình.' },
      { kanji: '夫婦', hiragana: 'ふうふ (fūfu)', sinoVietnamese: 'PHU PHỤ', meaning: 'Vợ chồng gắn kết', level: 'N4', breakdown: '夫 (Phu) + 婦 (Phụ)', mnemonic: 'Đôi vợ chồng sắt son đầu bạc răng long.' },
      { kanji: '天気', hiragana: 'てんき (tenki)', sinoVietnamese: 'THIÊN KHÍ', meaning: 'Thời tiết', level: 'N5', breakdown: '天 (Thiên có 大) + 気 (Khí)', mnemonic: 'Bầu trời quang đãng thời tiết tuyệt đẹp.' },
      { kanji: '大会', hiragana: 'たいかい (taikai)', sinoVietnamese: 'ĐẠI HỘI', meaning: 'Đại hội, giải đấu lớn', level: 'N3', breakdown: '大 (Đại) + 会 (Hội)', mnemonic: 'Hội nghị quy mô lớn tập hợp anh tài.' },
      { kanji: '雄大', hiragana: 'ゆうだい (yūdai)', sinoVietnamese: 'HÙNG ĐẠI', meaning: 'Hùng vĩ, bao la tráng lệ', level: 'N1', breakdown: '雄 (Hùng) + 大 (Đại)', mnemonic: 'Non sông cẩm tú kỳ vĩ bao la.' }
    ]
  },
  {
    stt: 38,
    strokeCount: 3,
    radical: '女',
    name: 'Nữ',
    meaning: 'Con gái, phụ nữ, người mẹ',
    mnemonic: 'Hình người phụ nữ ngồi thùy mị, hai tay đan chéo trước ngực.',
    relatedVocab: [
      { kanji: '女', hiragana: 'おんな (onna)', sinoVietnamese: 'NỮ', meaning: 'Phụ nữ, nữ giới', level: 'N5', breakdown: 'Dáng người phụ nữ ngồi duyên dáng', mnemonic: 'Đường nét dịu dàng uyển chuyển của người phụ nữ.' },
      { kanji: '女性', hiragana: 'じょせい (josei)', sinoVietnamese: 'NỮ TÍNH', meaning: 'Phụ nữ, phái nữ', level: 'N4', breakdown: '女 (Nữ) + 性 (Tính)', mnemonic: 'Phái nữ dịu hiền và thanh lịch.' },
      { kanji: '女の子', hiragana: 'おんなのこ (onnanoko)', sinoVietnamese: 'NỮ TỬ', meaning: 'Bé gái', level: 'N5', breakdown: '女 (Nữ) + 子 (Tử)', mnemonic: 'Bé gái dễ thương hồn nhiên.' },
      { kanji: '彼女', hiragana: 'かのじょ (kanojo)', sinoVietnamese: 'BỈ NỮ', meaning: 'Cô ấy, bạn gái', level: 'N4', breakdown: '彼 (Bỉ) + 女 (Nữ)', mnemonic: 'Người bạn gái thanh tú dịu dàng.' },
      { kanji: '好き', hiragana: 'すき (suki)', sinoVietnamese: 'HẢO', meaning: 'Thích thú, yêu mến', level: 'N5', breakdown: '女 (Nữ) + 子 (Tử)', mnemonic: 'Người mẹ yêu thương đứa con thơ của mình.' },
      { kanji: '始める', hiragana: 'はじめる (hajimeru)', sinoVietnamese: 'THỦY', meaning: 'Bắt đầu khởi sự', level: 'N5', breakdown: '女 (Nữ) + 台 (Thai)', mnemonic: 'Người phụ nữ mang thai bắt đầu một sinh mệnh mới.' },
      { kanji: '姉', hiragana: 'あね (ane)', sinoVietnamese: 'TỶ', meaning: 'Chị gái', level: 'N5', breakdown: '女 (Nữ) + 市 (Thị)', mnemonic: 'Người chị gái đảm đang đi chợ lo việc nhà.' },
      { kanji: '妹', hiragana: 'いもうと (imōto)', sinoVietnamese: 'MUỘI', meaning: 'Em gái', level: 'N5', breakdown: '女 (Nữ) + 未 (Vị - chưa trưởng thành)', mnemonic: 'Bé gái nhỏ tuổi chưa trưởng thành là em gái.' },
      { kanji: '安心', hiragana: 'あんしん (anshin)', sinoVietnamese: 'AN TÂM', meaning: 'An tâm, yên lòng', level: 'N4', breakdown: '安 (An có 女) + 心 (Tâm)', mnemonic: 'Có người phụ nữ trong nhà giúp lòng an yên.' },
      { kanji: '安全', hiragana: 'あんぜん (anzen)', sinoVietnamese: 'AN TOÀN', meaning: 'An toàn tuyệt đối', level: 'N4', breakdown: '安 (An) + 全 (Toàn)', mnemonic: 'Bảo đảm an toàn không xảy ra tai họa.' },
      { kanji: '結婚', hiragana: 'けっこん (kekkon)', sinoVietnamese: 'KẾT HÔN', meaning: 'Kết hôn, lấy nhau', level: 'N4', breakdown: '結 (Kết) + 婚 (Hôn có 女)', mnemonic: 'Ngày cưới rước cô dâu về xây tổ ấm.' },
      { kanji: '妻', hiragana: 'つま (tsuma)', sinoVietnamese: 'THÊ', meaning: 'Vợ hiền', level: 'N4', breakdown: 'Tay cầm chổi + 女 (Nữ)', mnemonic: 'Người vợ hiền thục thu vén việc nhà.' },
      { kanji: '娘', hiragana: 'むすめ (musume)', sinoVietnamese: 'NƯƠNG', meaning: 'Con gái ruột', level: 'N4', breakdown: '女 (Nữ) + 良 (Lương)', mnemonic: 'Cô con gái ngoan ngoãn hiền lương.' },
      { kanji: '姿', hiragana: 'すがた (sugata)', sinoVietnamese: 'TƯ', meaning: 'Vóc dáng, diện mạo', level: 'N3', breakdown: '次 + 女 (Nữ)', mnemonic: 'Dáng vẻ thanh thoát của người thiếu nữ.' }
    ]
  },
  {
    stt: 39,
    strokeCount: 3,
    radical: '子',
    name: 'Tử',
    meaning: 'Con cái, đứa trẻ',
    mnemonic: 'Hình em bé quấn tã đang dang hai tay đòi cha mẹ bế ẵm.',
    relatedVocab: [
      { kanji: '子', hiragana: 'こ (ko)', sinoVietnamese: 'TỬ', meaning: 'Đứa con, trẻ con', level: 'N5', breakdown: 'Hình đứa trẻ sơ sinh quấn tã vung tay', mnemonic: 'Đứa trẻ thơ ngây đang vẫy tay chào mẹ.' },
      { kanji: '子供', hiragana: 'こども (kodomo)', sinoVietnamese: 'TỬ CUNG', meaning: 'Trẻ con, con nít', level: 'N5', breakdown: '子 (Tử) + 供 (Cung)', mnemonic: 'Những đứa trẻ tung tăng vui đùa ngoài sân.' },
      { kanji: '息子', hiragana: 'むすこ (musuko)', sinoVietnamese: 'TỨC TỬ', meaning: 'Con trai ruột', level: 'N4', breakdown: '息 (Tức) + 子 (Tử)', mnemonic: 'Đứa con trai ruột thịt yêu quý.' },
      { kanji: '字', hiragana: 'じ (ji)', sinoVietnamese: 'TỰ', meaning: 'Chữ viết, ký tự', level: 'N5', breakdown: '宀 (Miên) + 子 (Tử)', mnemonic: 'Đứa trẻ ngồi dưới mái nhà tập viết từng nét chữ.' },
      { kanji: '漢字', hiragana: 'かんじ (kanji)', sinoVietnamese: 'HÁN TỰ', meaning: 'Chữ Hán tự', level: 'N5', breakdown: '漢 (Hán) + 字 (Tự)', mnemonic: 'Kho tàng chữ Hán phong phú biểu cảm.' },
      { kanji: '学校', hiragana: 'がっこう (gakkō)', sinoVietnamese: 'HỌC HIỆU', meaning: 'Trường học', level: 'N5', breakdown: '学 (Học có 子) + 校 (Hiệu)', mnemonic: 'Ngôi trường nơi các em thơ chăm chỉ học tập.' },
      { kanji: '学生', hiragana: 'がくせい (gakusei)', sinoVietnamese: 'HỌC SINH', meaning: 'Học sinh, sinh viên', level: 'N5', breakdown: '学 (Học) + 生 (Sinh)', mnemonic: 'Học sinh rèn đức luyện tài tương lai.' },
      { kanji: '季節', hiragana: 'きせつ (kisetsu)', sinoVietnamese: 'QUÝ TIẾT', meaning: 'Mùa trong năm', level: 'N4', breakdown: '季 (Quý có 子) + 節 (Tiết)', mnemonic: 'Lúa non mọc theo tiết trời bốn mùa.' },
      { kanji: '孤立', hiragana: 'こりつ (koritsu)', sinoVietnamese: 'CÔ LẬP', meaning: 'Cô lập, trơ trọi', level: 'N2', breakdown: '孤 (Cô có 子) + 立 (Lập)', mnemonic: 'Đứa trẻ đứng trơ trọi bơ vơ giữa trời.' },
      { kanji: '孫', hiragana: 'まご (mago)', sinoVietnamese: 'TÔN', meaning: 'Cháu nội, cháu ngoại', level: 'N3', breakdown: '子 (Tử) + 系 (Hệ)', mnemonic: 'Thế hệ cháu con nối dõi tông đường.' },
      { kanji: '孔子', hiragana: 'こうし (kōshi)', sinoVietnamese: 'KHỔNG TỬ', meaning: 'Khổng Tử', level: 'N1', breakdown: '孔 (Khổng) + 子 (Tử)', mnemonic: 'Bậc thầy Nho gia uyên thâm muôn đời.' },
      { kanji: '存在', hiragana: 'そんざい (sonzai)', sinoVietnamese: 'TỒN TẠI', meaning: 'Tồn tại, hiện hữu', level: 'N3', breakdown: '存 (Tồn có 子) + 在 (Tại)', mnemonic: 'Sự sống của con người hiện hữu trong vũ trụ.' }
    ]
  },
  {
    stt: 40,
    strokeCount: 3,
    radical: '宀',
    name: 'Miên',
    meaning: 'Mái nhà, nơi che chở',
    mnemonic: 'Hình mái nhà có ống khói nhỏ nhô lên ở chính giữa nóc đỉnh.',
    relatedVocab: [
      { kanji: '家', hiragana: 'いえ / うち (ie)', sinoVietnamese: 'GIA', meaning: 'Ngôi nhà, gia đình', level: 'N5', breakdown: '宀 (Miên) + 豕 (Thỉ - heo)', mnemonic: 'Dưới mái nhà có đàn heo no đủ đầm ấm.' },
      { kanji: '家族', hiragana: 'かぞく (kazoku)', sinoVietnamese: 'GIA TỘC', meaning: 'Gia đình ruột thịt', level: 'N5', breakdown: '家 (Gia) + 族 (Tộc)', mnemonic: 'Các thành viên quây quần dưới mái ấm gia đình.' },
      { kanji: '安い', hiragana: 'やすい (yasui)', sinoVietnamese: 'AN', meaning: 'Rẻ tiền, an tâm', level: 'N5', breakdown: '宀 (Miên) + 女 (Nữ)', mnemonic: 'Người phụ nữ an yên giữ gìn tổ ấm.' },
      { kanji: '宝', hiragana: 'たから (takara)', sinoVietnamese: 'BẢO', meaning: 'Kho báu, bảo vật', level: 'N3', breakdown: '宀 (Miên) + 玉 (Ngọc)', mnemonic: 'Viên ngọc bích quý giá cất giấu trong nhà.' },
      { kanji: '宝石', hiragana: 'ほうせき (hōseki)', sinoVietnamese: 'BẢO THẠCH', meaning: 'Đá quý, kim cương', level: 'N3', breakdown: '宝 (Bảo) + 石 (Thạch)', mnemonic: 'Loại đá quý lấp lánh giá trị ngàn vàng.' },
      { kanji: '宇宙', hiragana: 'うちゅう (uchū)', sinoVietnamese: 'VŨ TRỤ', meaning: 'Vũ trụ bao la', level: 'N3', breakdown: '宇 (Vũ có 宀) + 宙 (Trụ có 宀)', mnemonic: 'Mái vòm không gian và thời gian bao la.' },
      { kanji: '宿題', hiragana: 'しゅくだい (shukudai)', sinoVietnamese: 'TÚC ĐỀ', meaning: 'Bài tập về nhà', level: 'N5', breakdown: '宿 (Túc có 宀) + 題 (Đề)', mnemonic: 'Nhiệm vụ học tập cần hoàn thành ở nhà.' },
      { kanji: '新宿', hiragana: 'しんじゅく (shinjuku)', sinoVietnamese: 'TÂN TÚC', meaning: 'Shinjuku (khu phố lớn tại Tokyo)', level: 'N4', breakdown: '新 (Tân) + 宿 (Túc)', mnemonic: 'Trạm nghỉ chân phồn hoa giữa lòng thủ đô.' },
      { kanji: '客', hiragana: 'きゃく (kyaku)', sinoVietnamese: 'KHÁCH', meaning: 'Khách hàng, khách quý', level: 'N4', breakdown: '宀 (Miên) + 各 (Các)', mnemonic: 'Mỗi vị khách đến thăm dưới mái nhà tiếp đón nồng hậu.' },
      { kanji: '案内', hiragana: 'あんない (annai)', sinoVietnamese: 'ÁN NỘI', meaning: 'Hướng dẫn, dẫn đường', level: 'N4', breakdown: '案 (Án có 宀) + 内 (Nội)', mnemonic: 'Chỉ dẫn tận tình các lối đi bên trong.' },
      { kanji: '寂しい', hiragana: 'さびしい (sabishii)', sinoVietnamese: 'TỊCH', meaning: 'Cô đơn, trống trải', level: 'N4', breakdown: '宀 (Miên) + Thúc', mnemonic: 'Ngồi một mình trong căn nhà vắng hiu quạnh.' },
      { kanji: '寄付', hiragana: 'きふ (kifu)', sinoVietnamese: 'KÝ PHÓ', meaning: 'Quyên góp, từ thiện', level: 'N2', breakdown: '寄 (Ký có 宀) + 付 (Phó)', mnemonic: 'Gửi tiền của giúp đỡ những người có hoàn cảnh khó khăn.' }
    ]
  },
  {
    stt: 41,
    strokeCount: 3,
    radical: '寸',
    name: 'Thốn',
    meaning: 'Tấc (đơn vị đo chiều dài cổ)',
    mnemonic: 'Bàn tay đặt một ngón (nét chấm) vào vị trí bắt mạch cổ tay (cách đúng 1 tấc).',
    relatedVocab: [
      { kanji: '寺', hiragana: 'てら (tera)', sinoVietnamese: 'TỰ', meaning: 'Ngôi chùa thanh tịnh', level: 'N5', breakdown: '土 (Thổ) + 寸 (Thốn)', mnemonic: 'Khu đất tuân thủ quy củ giới luật trang nghiêm.' },
      { kanji: 'お寺', hiragana: 'おてら (otera)', sinoVietnamese: 'TỰ', meaning: 'Chùa chiền', level: 'N5', breakdown: 'お + 寺 (Tự)', mnemonic: 'Nơi vãn cảnh cầu bình an cho gia đạo.' },
      { kanji: '対', hiragana: 'たい (tai)', sinoVietnamese: 'ĐỐI', meaning: 'Đối diện, đối lập, đối xứng', level: 'N3', breakdown: 'Văn + 寸 (Thốn)', mnemonic: 'Hai vế đối chuẩn xác từng tấc một.' },
      { kanji: '反対', hiragana: 'はんたい (hantai)', sinoVietnamese: 'PHẢN ĐỐI', meaning: 'Phản đối, không đồng tình', level: 'N4', breakdown: '反 (Phản) + 対 (Đối)', mnemonic: 'Ý kiến trái ngược hoàn toàn.' },
      { kanji: '封筒', hiragana: 'ふうとう (fūtō)', sinoVietnamese: 'PHONG ĐỒNG', meaning: 'Phong bì thư', level: 'N4', breakdown: '封 (Phong có 寸) + 筒 (Đồng)', mnemonic: 'Bì thư niêm phong cẩn thận trước khi gửi.' },
      { kanji: '射す', hiragana: 'さす (sasu)', sinoVietnamese: 'XẠ', meaning: 'Chiếu rọi, bắn tên', level: 'N2', breakdown: '身 (Thân) + 寸 (Thốn)', mnemonic: 'Căng người đo từng tấc ngắm bắn bia tên.' },
      { kanji: '寿命', hiragana: 'じゅみょう (jumyō)', sinoVietnamese: 'THỌ MỆNH', meaning: 'Tuổi thọ, tuổi đời', level: 'N2', breakdown: '寿 (Thọ có 寸) + 命 (Mệnh)', mnemonic: 'Đo từng tấc năm tháng của kiếp nhân sinh.' },
      { kanji: '専門', hiragana: 'せんもん (senmon)', sinoVietnamese: 'CHUYÊN MÔN', meaning: 'Chuyên ngành, chuyên môn sâu', level: 'N4', breakdown: '専 (Chuyên có 寸) + 門 (Môn)', mnemonic: 'Cửa ải lĩnh vực đòi hỏi đo đạc chính xác.' },
      { kanji: '導く', hiragana: 'みちびく (michibiku)', sinoVietnamese: 'ĐẠO', meaning: 'Dẫn dắt, chỉ lối', level: 'N2', breakdown: 'Đạo + 寸 (Thốn)', mnemonic: 'Dẫn dắt đi từng bước theo quy củ.' },
      { kanji: '尊い', hiragana: 'とうとい / たっとい (tōtoi)', sinoVietnamese: 'TÔN', meaning: 'Cao quý, đáng kính trọng', level: 'N2', breakdown: 'Tù + 寸 (Thốn)', mnemonic: 'Đôi tay nâng bình rượu quý dâng bậc tôn trưởng.' }
    ]
  },
  {
    stt: 42,
    strokeCount: 3,
    radical: '小',
    name: 'Tiểu',
    meaning: 'Nhỏ bé, vụn vặt',
    mnemonic: 'Một vật ở giữa bị gọt bớt hai mảnh nhỏ văng sang hai bên.',
    relatedVocab: [
      { kanji: '小さい', hiragana: 'ちいさい (chiisai)', sinoVietnamese: 'TIỂU', meaning: 'Nhỏ bé, bé tí', level: 'N5', breakdown: 'Vạch giữa và hai nét phẩy nhỏ hai bên', mnemonic: 'Tách nhỏ thành từng mẩu vụn li ti.' },
      { kanji: '小学校', hiragana: 'しょうがっこう (shōgakkō)', sinoVietnamese: 'TIỂU HỌC HIỆU', meaning: 'Trường tiểu học', level: 'N5', breakdown: '小 (Tiểu) + 学 + 校', mnemonic: 'Ngôi trường nuôi dưỡng các mầm non bé nhỏ.' },
      { kanji: '小学生', hiragana: 'しょうがくせい (shōgakusei)', sinoVietnamese: 'TIỂU HỌC SINH', meaning: 'Học sinh cấp một', level: 'N5', breakdown: '小 (Tiểu) + 学 + 生', mnemonic: 'Em nhỏ tung tăng cắp sách tới trường.' },
      { kanji: '少ない', hiragana: 'すくない (sukunai)', sinoVietnamese: 'THIỂU', meaning: 'Ít ỏi, hiếm hoi', level: 'N5', breakdown: '小 (Tiểu) thêm nét phẩy dài', mnemonic: 'Số lượng ít ỏi hiếm hoi chắt chiu.' },
      { kanji: '少し', hiragana: 'すこし (sukoshi)', sinoVietnamese: 'THIỂU', meaning: 'Một chút, một ít', level: 'N5', breakdown: '少 (Thiểu) + し', mnemonic: 'Một lượng nhỏ xíu không đáng kể.' },
      { kanji: '少女', hiragana: 'しょうじょ (shōjo)', sinoVietnamese: 'THIẾU NỮ', meaning: 'Thiếu nữ, cô gái trẻ', level: 'N3', breakdown: '少 (Thiểu) + 女 (Nữ)', mnemonic: 'Cô gái tuổi trăng tròn ngây thơ trong sáng.' },
      { kanji: '光', hiragana: 'ひかり (hikari)', sinoVietnamese: 'QUANG', meaning: 'Ánh sáng rực rỡ', level: 'N3', breakdown: '小 (Tiểu) trên đầu người dang chân', mnemonic: 'Tia sáng nhỏ rọi chiếu soi bước người đi.' },
      { kanji: '光る', hiragana: 'ひかる (hikaru)', sinoVietnamese: 'QUANG', meaning: 'Phát sáng, lấp lánh', level: 'N4', breakdown: '光 (Quang) + る', mnemonic: 'Ngôi sao nhỏ tỏa sáng lung linh trên trời đêm.' },
      { kanji: '当たる', hiragana: 'あたる (ataru)', sinoVietnamese: 'ĐƯƠNG', meaning: 'Trúng thưởng, va chạm đúng', level: 'N4', breakdown: 'Đầu có 小 + Kệ', mnemonic: 'Bắn trúng ngay điểm nhỏ mục tiêu.' },
      { kanji: '尖る', hiragana: 'とがる (togaru)', sinoVietnamese: 'TIÊM', meaning: 'Nhọn hoắt, sắc bén', level: 'N1', breakdown: '小 (Tiểu) trên 大 (Đại)', mnemonic: 'Dưới to trên thu nhỏ lại thành mũi nhọn.' }
    ]
  },
  {
    stt: 43,
    strokeCount: 3,
    radical: '尢',
    name: 'Uông',
    meaning: 'Yếu đuối, què quặt',
    mnemonic: 'Người có một bên chân bị cong queo, đi lại tập tễnh.',
    relatedVocab: [
      { kanji: '就職', hiragana: 'しゅうしょく (shūshoku)', sinoVietnamese: 'TỰU CHỨC', meaning: 'Tìm việc làm, nhận việc', level: 'N3', breakdown: '就 (Tựu có 尢) + 職 (Chức)', mnemonic: 'Bước chân vững vàng tựu chức nơi cơ quan.' },
      { kanji: '就く', hiragana: 'つく (tsuku)', sinoVietnamese: 'TỰU', meaning: 'Đảm nhận chức vụ, bước vào vị trí', level: 'N2', breakdown: '就 (Tựu có 尢) + く', mnemonic: 'Bắt đầu đảm trách cương vị mới.' },
      { kanji: '尤も', hiragana: 'もっとも (mottomo)', sinoVietnamese: 'VƯU', meaning: 'Đương nhiên, hợp lý, có lý', level: 'N2', breakdown: '尢 (Uông) thêm chấm', mnemonic: 'Lời nói hoàn toàn có lý lẽ thuyết phục.' },
      { kanji: '尬', hiragana: 'かい (kai)', sinoVietnamese: 'GIỚI', meaning: 'Lúng túng, ngượng ngùng', level: 'N1', breakdown: '尢 (Uông) + 介 (Giới)', mnemonic: 'Bước đi ngượng ngập bối rối trước đám đông.' },
      { kanji: '尽力', hiragana: 'じんりょく (jinryoku)', sinoVietnamese: 'TẬN LỰC', meaning: 'Tận lực, dốc hết sức mình', level: 'N2', breakdown: '尽 (Tận có 尢 biến thể) + 力', mnemonic: 'Dốc đến chút sức lực cuối cùng để cống hiến.' },
      { kanji: '就任', hiragana: 'しゅうにん (shūnin)', sinoVietnamese: 'TỰU NHIỆM', meaning: 'Nhậm chức, lên nắm quyền', level: 'N2', breakdown: '就 (Tựu) + 任 (Nhiệm)', mnemonic: 'Chính thức tiếp nhận trọng trách mới.' },
      { kanji: '尾', hiragana: 'お (o)', sinoVietnamese: 'VĨ', meaning: 'Cái đuôi', level: 'N3', breakdown: 'Thi + 尢 (đuôi vẫy)', mnemonic: 'Cái đuôi ve vẩy sau thân mình con thú.' },
      { kanji: '屈折', hiragana: 'くっせつ (kussetsu)', sinoVietnamese: 'KHUẤT CHIẾT', meaning: 'Khúc xạ ánh sáng, quanh co', level: 'N1', breakdown: '屈 có dáng 尢 + 折 (Chiết)', mnemonic: 'Tia sáng bẻ cong gập khúc khi qua lăng kính.' },
      { kanji: '尴', hiragana: 'かん (kan)', sinoVietnamese: 'GIAM', meaning: 'Bối rối, ngại ngùng', level: 'N1', breakdown: '尢 (Uông) + 监', mnemonic: 'Tình huống khó xử ngượng ngùng.' },
      { kanji: '成就', hiragana: 'じょうじゅ (jōju)', sinoVietnamese: 'THÀNH TỰU', meaning: 'Hoàn thành, đại công cáo thành', level: 'N1', breakdown: '成 (Thành) + 就 (Tựu)', mnemonic: 'Ước nguyện bao năm nay đã đơm hoa kết trái.' }
    ]
  },
  {
    stt: 44,
    strokeCount: 3,
    radical: '尸',
    name: 'Thi',
    meaning: 'Xác chết, thây ma, thân xác',
    mnemonic: 'Hình cơ thể người đang nằm bất động duỗi thẳng trên giường.',
    relatedVocab: [
      { kanji: '居る', hiragana: 'いる (iru)', sinoVietnamese: 'CƯ', meaning: 'Ở, có mặt (người/động vật)', level: 'N5', breakdown: '尸 (Thi) + 古 (Cổ)', mnemonic: 'Người ngồi yên nghỉ ngơi trong căn nhà cổ xưa.' },
      { kanji: '居酒屋', hiragana: 'いざかや (izakaya)', sinoVietnamese: 'CƯ TỬU ỐC', meaning: 'Quán nhậu kiểu Nhật', level: 'N3', breakdown: '居 (Cư) + 酒 (Tửu) + 屋 (Ốc)', mnemonic: 'Quán rượu ấm cúng sau giờ tan tầm.' },
      { kanji: '屋', hiragana: 'や / おく (ya)', sinoVietnamese: 'ỐC', meaning: 'Căn nhà, mái nhà, cửa hàng', level: 'N4', breakdown: '尸 (Thi) + 至 (Chí)', mnemonic: 'Mái nhà nơi bước chân dừng lại nghỉ ngơi.' },
      { kanji: '部屋', hiragana: 'へや (heya)', sinoVietnamese: 'BỘ ỐC', meaning: 'Căn phòng', level: 'N5', breakdown: '部 (Bộ) + 屋 (Ốc)', mnemonic: 'Căn phòng riêng biệt ngăn nắp sạch sẽ.' },
      { kanji: '本屋', hiragana: 'ほんや (hon\'ya)', sinoVietnamese: 'BỔN ỐC', meaning: 'Hiệu sách, tiệm sách', level: 'N5', breakdown: '本 (Bổn) + 屋 (Ốc)', mnemonic: 'Tiệm bán muôn vàn đầu sách hay.' },
      { kanji: '届く', hiragana: 'とどく (todoku)', sinoVietnamese: 'GIỚI', meaning: 'Được chuyển tới tận nơi', level: 'N4', breakdown: '尸 (Thi) + 由 (Do)', mnemonic: 'Gói hàng gửi đến tận cửa nhà người nhận.' },
      { kanji: '郵便局', hiragana: 'ゆうびんきょく (yūbinkyoku)', sinoVietnamese: 'BƯU TIỆN CỤC', meaning: 'Bưu điện', level: 'N5', breakdown: '郵便 + 局 (Cục có 尸)', mnemonic: 'Cơ quan phụ trách bưu chính chuyển phát.' },
      { kanji: '展覧会', hiragana: 'てんらんかい (tenrankai)', sinoVietnamese: 'TRIỂN LÃM HỘI', meaning: 'Buổi triển lãm nghệ thuật', level: 'N3', breakdown: '展 (Triển có 尸) + 覧 + 会', mnemonic: 'Mở rộng cánh cửa trưng bày các kiệt tác.' },
      { kanji: '履く', hiragana: 'はく (haku)', sinoVietnamese: 'LÝ', meaning: 'Mặc (quần), xỏ (giày tất)', level: 'N5', breakdown: '尸 (Thi) + 复', mnemonic: 'Ngồi xuống xỏ giày trước khi bước ra ngoài.' },
      { kanji: '屍', hiragana: 'しかばね (shikabane)', sinoVietnamese: 'THI', meaning: 'Thi thể, xác ướp', level: 'N1', breakdown: '尸 (Thi) + 死 (Tử)', mnemonic: 'Thi thể bất động sau trận chiến sa trường.' }
    ]
  },
  {
    stt: 45,
    strokeCount: 3,
    radical: '屮',
    name: 'Triệt',
    meaning: 'Mầm non, cỏ mới mọc',
    mnemonic: 'Hình chồi non vừa nhú lên khỏi mặt đất với hai lá mầm xanh non.',
    relatedVocab: [
      { kanji: '屯', hiragana: 'とん (ton)', sinoVietnamese: 'TRUÂN', meaning: 'Đồn trú, tích tụ', level: 'N1', breakdown: '屮 (Triệt) đâm thủng đất 一', mnemonic: 'Mầm cây kiên cường đâm xuyên qua lớp đất cứng.' },
      { kanji: '駐屯', hiragana: 'ちゅうとん (chūton)', sinoVietnamese: 'TRÚ TRUÂN', meaning: 'Đồn trú quân sự', level: 'N1', breakdown: '駐 (Trú) + 屯 (Truân)', mnemonic: 'Đơn vị binh sĩ đóng quân đồn trú vững chãi.' },
      { kanji: '出', hiragana: 'でる / だす (deru)', sinoVietnamese: 'XUẤT', meaning: 'Đi ra, xuất hiện', level: 'N5', breakdown: 'Hai chữ 屮 trồng lên nhau vươn lên', mnemonic: 'Mầm cây đâm chồi vươn mình ra khỏi mặt đất.' },
      { kanji: '出口', hiragana: 'でぐち (deguchi)', sinoVietnamese: 'XUẤT KHẨU', meaning: 'Cửa ra, lối thoát hiểm', level: 'N5', breakdown: '出 (Xuất) + 口 (Khẩu)', mnemonic: 'Lối thoát ra ngoài thông thoáng an toàn.' },
      { kanji: '出発', hiragana: 'しゅっぱつ (shuppatsu)', sinoVietnamese: 'XUẤT PHÁT', meaning: 'Khởi hành, xuất phát', level: 'N4', breakdown: '出 (Xuất) + 発 (Phát)', mnemonic: 'Bắt đầu lăn bánh khởi hành chuyến đi xa.' },
      { kanji: '出席', hiragana: 'しゅっせき (shusseki)', sinoVietnamese: 'XUẤT TỊCH', meaning: 'Có mặt, tham dự', level: 'N4', breakdown: '出 (Xuất) + 席 (Tịch)', mnemonic: 'Có mặt đầy đủ tại chỗ ngồi sự kiện.' },
      { kanji: '芽', hiragana: 'め (me)', sinoVietnamese: 'NHA', meaning: 'Mầm non cây cối', level: 'N2', breakdown: 'Thảo biến thể từ 屮 + Nha', mnemonic: 'Mầm xanh mới nhú mơn mởn đón nắng mai.' },
      { kanji: '苗', hiragana: 'なえ (nae)', sinoVietnamese: 'MIÊU', meaning: 'Cây mạ non, cây con', level: 'N2', breakdown: 'Thảo có 屮 + Điền (Ruộng)', mnemonic: 'Những khóm mạ non xanh mướt trên cánh đồng.' },
      { kanji: '若者', hiragana: 'わかもの (wakamono)', sinoVietnamese: 'NHƯỢC GIẢ', meaning: 'Người trẻ tuổi, thanh niên', level: 'N3', breakdown: '若 (Nhược) + 者 (Giả)', mnemonic: 'Thế hệ trẻ tràn đầy sức sống như mầm non.' },
      { kanji: '芝生', hiragana: 'しばふ (shibafu)', sinoVietnamese: 'CHI SINH', meaning: 'Thảm cỏ xanh', level: 'N3', breakdown: '芝 (Chi) + 生 (Sinh)', mnemonic: 'Bãi cỏ xanh mướt mọc dày như thảm lụa.' }
    ]
  },
  {
    stt: 46,
    strokeCount: 3,
    radical: '山',
    name: 'Sơn',
    meaning: 'Núi non hùng vĩ',
    mnemonic: 'Hình ba đỉnh núi nhấp nhô cao thấp cạnh nhau trùng điệp.',
    relatedVocab: [
      { kanji: '山', hiragana: 'やま (yama)', sinoVietnamese: 'SƠN', meaning: 'Núi non, ngọn núi', level: 'N5', breakdown: 'Ba đỉnh núi nhô cao', mnemonic: 'Ba đỉnh núi cao sừng sững chạm trời xanh.' },
      { kanji: '富士山', hiragana: 'ふじさん (fujisan)', sinoVietnamese: 'PHÚ SĨ SƠN', meaning: 'Núi Phú Sĩ', level: 'N5', breakdown: '富士 + 山 (Sơn)', mnemonic: 'Ngọn núi thiêng phủ tuyết trắng biểu tượng nước Nhật.' },
      { kanji: '山登り', hiragana: 'やまのぼり (yamanobori)', sinoVietnamese: 'SƠN ĐĂNG', meaning: 'Leo núi, leo dốc', level: 'N5', breakdown: '山 (Sơn) + 登 (Đăng)', mnemonic: 'Chinh phục đỉnh núi cao rèn luyện sức bền.' },
      { kanji: '岩', hiragana: 'いわ (iwa)', sinoVietnamese: 'NHAM', meaning: 'Tảng đá lớn, vách đá', level: 'N3', breakdown: '山 (Sơn) + 石 (Thạch)', mnemonic: 'Khối đá hoa cương sừng sững trên đỉnh núi.' },
      { kanji: '岸', hiragana: 'きし (kishi)', sinoVietnamese: 'NGẠN', meaning: 'Bờ sông, bờ biển', level: 'N3', breakdown: '山 (Sơn) + Can', mnemonic: 'Dải đất nhô lên ngăn cách dòng nước mát.' },
      { kanji: '海岸', hiragana: 'かいがん (kaigan)', sinoVietnamese: 'HẢI NGẠN', meaning: 'Bờ biển cát trắng', level: 'N4', breakdown: '海 (Hải) + 岸 (Ngạn)', mnemonic: 'Bờ cát dài phẳng lặng nghe sóng vỗ rì rào.' },
      { kanji: '島', hiragana: 'しま (shima)', sinoVietnamese: 'ĐẢO', meaning: 'Hòn đảo trên biển', level: 'N4', breakdown: 'Điểu + 山 (Sơn)', mnemonic: 'Hòn đảo giữa đại dương nơi chim biển nghỉ chân.' },
      { kanji: '崩れる', hiragana: 'くずれる (kuzureru)', sinoVietnamese: 'BĂNG', meaning: 'Sụp đổ, lở đất núi', level: 'N2', breakdown: '山 (Sơn) + Băng', mnemonic: 'Đất đá sườn núi sạt lở dữ dội sau mưa lớn.' },
      { kanji: '炭', hiragana: 'すみ (sumi)', sinoVietnamese: 'THAN', meaning: 'Than đá, than củi', level: 'N3', breakdown: '山 (Sơn) + Hỏa (Lửa)', mnemonic: 'Than đốt từ gỗ rừng trên núi tỏa nhiệt ấm.' },
      { kanji: '炭酸', hiragana: 'たんさん (tansan)', sinoVietnamese: 'THAN TOAN', meaning: 'Khí cacbonic, nước có ga', level: 'N2', breakdown: '炭 (Than) + 酸 (Toan)', mnemonic: 'Bọt khí sủi tăm mát lạnh sảng khoái.' },
      { kanji: '嵐', hiragana: 'あらし (arashi)', sinoVietnamese: 'LAM', meaning: 'Cơn bão tố dữ dội', level: 'N2', breakdown: '山 (Sơn) + 風 (Phong - gió)', mnemonic: 'Gió bão gầm rít dữ dội qua các đỉnh núi.' },
      { kanji: '嶺', hiragana: 'みね / れい (rei)', sinoVietnamese: 'LĨNH', meaning: 'Dãy núi cao chót vót', level: 'N1', breakdown: '山 (Sơn) + 領 (Lãnh)', mnemonic: 'Đỉnh núi cao vời vợi chạm tầng mây.' }
    ]
  },
  {
    stt: 47,
    strokeCount: 3,
    radical: '巛',
    variants: ['川'],
    name: 'Xuyên',
    meaning: 'Dòng sông, kênh rạch',
    mnemonic: 'Ba dòng nước uốn lượn chảy song song tạo thành con sông dài.',
    relatedVocab: [
      { kanji: '川', hiragana: 'かわ (kawa)', sinoVietnamese: 'XUYÊN', meaning: 'Dòng sông, con suối', level: 'N5', breakdown: 'Ba vạch dọc uốn lượn', mnemonic: 'Ba dòng nước mát lành tuôn chảy xuôi về biển cả.' },
      { kanji: '小川', hiragana: 'おがわ (ogawa)', sinoVietnamese: 'TIỂU XUYÊN', meaning: 'Con suối nhỏ róc rách', level: 'N4', breakdown: '小 (Tiểu) + 川 (Xuyên)', mnemonic: 'Dòng suối trong veo chảy róc rách qua rừng.' },
      { kanji: '河川', hiragana: 'かせん (kasen)', sinoVietnamese: 'HÀ XUYÊN', meaning: 'Hệ thống sông ngòi', level: 'N2', breakdown: '河 (Hà) + 川 (Xuyên)', mnemonic: 'Mạng lưới sông suối bồi đắp phù sa màu mỡ.' },
      { kanji: '順', hiragana: 'じゅん (jun)', sinoVietnamese: 'THUẬN', meaning: 'Thuận theo, thứ tự', level: 'N3', breakdown: '川 (Xuyên) + 頁 (Hiệp)', mnemonic: 'Thuận buồm xuôi gió theo chiều dòng chảy tự nhiên.' },
      { kanji: '順番', hiragana: 'じゅんばん (jumban)', sinoVietnamese: 'THUẬN PHIÊN', meaning: 'Thứ tự lần lượt', level: 'N3', breakdown: '順 (Thuận) + 番 (Phiên)', mnemonic: 'Xếp hàng ngay ngắn lần lượt theo thứ tự.' },
      { kanji: '順調', hiragana: 'じゅんちょう (junchō)', sinoVietnamese: 'THUẬN ĐIỀU', meaning: 'Thuận lợi, trôi chảy tốt đẹp', level: 'N3', breakdown: '順 (Thuận) + 調 (Điều)', mnemonic: 'Mọi sự diễn ra suôn sẻ không gặp trắc trở.' },
      { kanji: '巡る', hiragana: 'めぐる (meguru)', sinoVietnamese: 'TUẦN', meaning: 'Đi vòng quanh, dạo quanh', level: 'N2', breakdown: '辶 (Sước) + 巛 (Xuyên)', mnemonic: 'Đi thuyền xuôi ngược quanh khúc sông êm đềm.' },
      { kanji: '巡回', hiragana: 'じゅんかい (junkai)', sinoVietnamese: 'TUẦN HỒI', meaning: 'Đi tuần tra, tuần tra bảo vệ', level: 'N2', breakdown: '巡 (Tuần) + 回 (Hồi)', mnemonic: 'Đội an ninh đi tuần tra kiểm soát địa bàn.' },
      { kanji: '本州', hiragana: 'ほんしゅう (honshū)', sinoVietnamese: 'BỔN CHÂU', meaning: 'Đảo Honshu (đảo chính Nhật Bản)', level: 'N3', breakdown: '本 (Bổn) + 州 (Châu có 巛)', mnemonic: 'Đảo lớn trung tâm xứ sở mặt trời mọc.' },
      { kanji: '九州', hiragana: 'きゅうしゅう (kyūshū)', sinoVietnamese: 'CỬU CHÂU', meaning: 'Đảo Kyushu', level: 'N4', breakdown: '九 (Cửu) + 州 (Châu)', mnemonic: 'Vùng đất chín châu trù phú phía nam.' },
      { kanji: '巣', hiragana: 'す (su)', sinoVietnamese: 'SÀO', meaning: 'Tổ chim, tổ ấm', level: 'N2', breakdown: '巛 (Xuyên) trên Quả', mnemonic: 'Tổ chim đan bằng cành cây bên bờ suối vắng.' }
    ]
  },
  {
    stt: 48,
    strokeCount: 3,
    radical: '工',
    name: 'Công',
    meaning: 'Người thợ, công việc xây dựng',
    mnemonic: 'Hình cây thước vuông chữ T của người thợ xây, thợ mộc.',
    relatedVocab: [
      { kanji: '工場', hiragana: 'こうじょう / こうば (kōjō)', sinoVietnamese: 'CÔNG TRƯỜNG', meaning: 'Nhà máy, xưởng chế tạo', level: 'N5', breakdown: '工 (Công) + 場 (Trường)', mnemonic: 'Nơi công nhân hăng say sản xuất hàng hóa.' },
      { kanji: '工事', hiragana: 'こうじ (kōji)', sinoVietnamese: 'CÔNG SỰ', meaning: 'Công trình thi công, sửa chữa', level: 'N4', breakdown: '工 (Công) + 事 (Sự)', mnemonic: 'Thi công xây dựng nâng cấp hạ tầng.' },
      { kanji: '左', hiragana: 'ひだり (hidari)', sinoVietnamese: 'TẢ', meaning: 'Bên trái', level: 'N5', breakdown: 'Hựu cầm thước 工 bên tay trái', mnemonic: 'Bàn tay trái cầm thước đo kỹ thuật.' },
      { kanji: '左側', hiragana: 'ひだりがわ (hidarigawa)', sinoVietnamese: 'TẢ TRẮC', meaning: 'Phía bên trái đường', level: 'N5', breakdown: '左 (Tả) + 側 (Trắc)', mnemonic: 'Quy tắc đi bên trái đường chuẩn mực tại Nhật.' },
      { kanji: '差', hiragana: 'さ (sa)', sinoVietnamese: 'SA', meaning: 'Khoảng cách, chênh lệch', level: 'N3', breakdown: 'Dương + 工 (Công)', mnemonic: 'Đo đạc thấy rõ độ lệch chuẩn giữa hai bên.' },
      { kanji: '差別', hiragana: 'さべつ (sabetsu)', sinoVietnamese: 'SA BIỆT', meaning: 'Kỳ thị, phân biệt đối xử', level: 'N2', breakdown: '差 (Sa) + 別 (Biệt)', mnemonic: 'Hành vi kỳ thị bất công cần bài trừ.' },
      { kanji: '成功', hiragana: 'せいこう (seikō)', sinoVietnamese: 'THÀNH CÔNG', meaning: 'Thành công vang dội', level: 'N3', breakdown: '成 (Thành) + 功 (Công có 工)', mnemonic: 'Bao công sức miệt mài cuối cùng đã hái quả ngọt.' },
      { kanji: '巧み', hiragana: 'たくみ (takumi)', sinoVietnamese: 'XẢO', meaning: 'Khéo léo, tinh tế xảo diệu', level: 'N1', breakdown: '工 (Công) + 丂', mnemonic: 'Đôi bàn tay người nghệ nhân điêu khắc tinh xảo.' },
      { kanji: '貢献', hiragana: 'こうけん (kōken)', sinoVietnamese: 'CỐNG HIẾN', meaning: 'Đóng góp, cống hiến to lớn', level: 'N1', breakdown: '貢 (Cống có 工) + 献 (Hiến)', mnemonic: 'Cống hiến tài năng vì sự phát triển của xã hội.' },
      { kanji: '工作', hiragana: 'こうさく (kōsaku)', sinoVietnamese: 'CÔNG TÁC', meaning: 'Đồ thủ công, chế tác mỹ thuật', level: 'N2', breakdown: '工 (Công) + 作 (Tác)', mnemonic: 'Tự tay cắt dán sáng tạo các mô hình đẹp mắt.' }
    ]
  },
  {
    stt: 49,
    strokeCount: 3,
    radical: '己',
    name: 'Kỷ',
    meaning: 'Bản thân mình, tự kỷ',
    mnemonic: 'Sợi dây cuộn lại hoặc hình người đang ngồi nhìn lại nội tâm chính mình.',
    relatedVocab: [
      { kanji: '自己', hiragana: 'じこ (jiko)', sinoVietnamese: 'TỰ KỶ', meaning: 'Bản thân mình', level: 'N3', breakdown: '自 (Tự) + 己 (Kỷ)', mnemonic: 'Tự hiểu rõ chính bản thân mình.' },
      { kanji: '自己紹介', hiragana: 'じこしょうかい (jiko shōkai)', sinoVietnamese: 'TỰ KỶ THIỆU GIỚI', meaning: 'Tự giới thiệu bản thân', level: 'N4', breakdown: '自己 + 紹介', mnemonic: 'Bài phát biểu mở màn giới thiệu danh tính lịch sự.' },
      { kanji: '利己的', hiragana: 'りこてき (rikoteki)', sinoVietnamese: 'LỢI KỶ ĐÍCH', meaning: 'Ích kỷ, chỉ lo cho bản thân', level: 'N1', breakdown: '利 (Lợi) + 己 (Kỷ) + 的', mnemonic: 'Thói hẹp hòi chỉ mưu cầu lợi ích riêng tư.' },
      { kanji: '既に', hiragana: 'すでに (sudeni)', sinoVietnamese: 'KÝ', meaning: 'Đã, rồi (hoàn thành trước đó)', level: 'N2', breakdown: 'Có nét 己 biến thể', mnemonic: 'Việc đã trót xảy ra không thể vãn hồi.' },
      { kanji: '忌む', hiragana: 'いむ (imu)', sinoVietnamese: 'KỴ', meaning: 'Kiêng kỵ, ghét bỏ tránh xa', level: 'N1', breakdown: '己 (Kỷ) + 心 (Tâm)', mnemonic: 'Trong lòng tự răn mình phải kiêng kỵ điều xấu.' },
      { kanji: '改める', hiragana: 'あらためる (aratameru)', sinoVietnamese: 'CẢI', meaning: 'Sửa đổi, cải tiến tân trang', level: 'N2', breakdown: '己 (Kỷ) + 攵 (Phộc)', mnemonic: 'Tự gõ nhắc nhở bản thân để sửa đổi tiến bộ.' },
      { kanji: '改革', hiragana: 'かいかく (kaikaku)', sinoVietnamese: 'CẢI CÁCH', meaning: 'Cải cách toàn diện', level: 'N2', breakdown: '改 (Cải) + 革 (Cách)', mnemonic: 'Công cuộc đổi mới đem lại luồng sinh khí tân tiến.' },
      { kanji: '配る', hiragana: 'くばる (kubaru)', sinoVietnamese: 'PHỐI', meaning: 'Phân phát, chia cho từng người', level: 'N4', breakdown: 'Dậu + 己 (Kỷ)', mnemonic: 'Tự tay rót rượu chia đều cho mọi người trong bàn.' },
      { kanji: '配達', hiragana: 'はいたつ (haitatsu)', sinoVietnamese: 'PHỐI ĐẠT', meaning: 'Giao hàng tận nơi', level: 'N3', breakdown: '配 (Phối) + 達 (Đạt)', mnemonic: 'Vận chuyển bưu phẩm đến tận tay người nhận.' },
      { kanji: '心配', hiragana: 'しんぱい (shinpai)', sinoVietnamese: 'TÂM PHỐI', meaning: 'Lo lắng, bận tâm', level: 'N5', breakdown: '心 (Tâm) + 配 (Phối)', mnemonic: 'Phân tâm lo lắng cho người thân phương xa.' }
    ]
  },
  {
    stt: 50,
    strokeCount: 3,
    radical: '巾',
    name: 'Cân',
    meaning: 'Cái khăn, dải vải',
    mnemonic: 'Mảnh vải vắt ngang qua móc treo rủ hai đầu xuống.',
    relatedVocab: [
      { kanji: '布', hiragana: 'ぬの (nuno)', sinoVietnamese: 'BỐ', meaning: 'Vải vóc, mảnh vải dệt', level: 'N3', breakdown: 'Đưa tay giũ tấm vải 巾', mnemonic: 'Mảnh vải mềm mại dệt từ sợi bông thiên nhiên.' },
      { kanji: '布団', hiragana: 'ふとん (futon)', sinoVietnamese: 'BỐ ĐOÀN', meaning: 'Nệm, chăn nệm kiểu Nhật', level: 'N5', breakdown: '布 (Bố) + 団 (Đoàn)', mnemonic: 'Chiếc nệm bông êm ái cho giấc ngủ say.' },
      { kanji: '財布', hiragana: 'さいふ (saifu)', sinoVietnamese: 'TÀI BỐ', meaning: 'Ví tiền, bóp đựng tiền', level: 'N5', breakdown: '財 (Tài) + 布 (Bố)', mnemonic: 'Túi vải bền bỉ đựng tiền bạc tài sản.' },
      { kanji: '帆船', hiragana: 'はんせん (hansen)', sinoVietnamese: 'PHÀM THUYỀN', meaning: 'Thuyền buồm lướt sóng', level: 'N2', breakdown: '帆 (Phàm có 巾) + 船 (Thuyền)', mnemonic: 'Cánh buồm vải giăng căng gió đẩy thuyền lướt đi.' },
      { kanji: '席', hiragana: 'せき (seki)', sinoVietnamese: 'TỊCH', meaning: 'Chỗ ngồi, ghế ngồi', level: 'N4', breakdown: 'Nghiễm + 巾 (Cân)', mnemonic: 'Mảnh chiếu trải dưới mái hiên mời khách an tọa.' },
      { kanji: '出席', hiragana: 'しゅっせき (shusseki)', sinoVietnamese: 'XUẤT TỊCH', meaning: 'Tham dự, có mặt', level: 'N4', breakdown: '出 (Xuất) + 席 (Tịch)', mnemonic: 'Ngồi đúng ghế tham gia buổi lễ trang trọng.' },
      { kanji: '帽子', hiragana: 'ぼうし (bōshi)', sinoVietnamese: 'MẠO TỬ', meaning: 'Cái mũ, nón đội đầu', level: 'N5', breakdown: 'Mạo có 巾 + 子 (Tử)', mnemonic: 'Chiếc nón vải che nắng ấm áp trên đầu.' },
      { kanji: '幕', hiragana: 'まく (maku)', sinoVietnamese: 'MẠC', meaning: 'Tấm màn nhung, bức rèm sân khấu', level: 'N2', breakdown: 'Mạc có 巾 phía dưới', mnemonic: 'Bức rèm nhung lộng lẫy kéo ra mở màn vở kịch.' },
      { kanji: '手帳', hiragana: 'てちょう (techō)', sinoVietnamese: 'THỦ TRƯỚNG', meaning: 'Sổ tay ghi chép', level: 'N4', breakdown: '手 (Thủ) + 帳 (Trướng có 巾)', mnemonic: 'Cuốn sổ tay bìa vải ghi nhớ lịch trình công tác.' },
      { kanji: '幅', hiragana: 'はば (haba)', sinoVietnamese: 'BÚC', meaning: 'Chiều rộng, bề ngang, biên độ', level: 'N3', breakdown: '巾 (Cân) + Phúc', mnemonic: 'Đo bề rộng khổ vải dệt may y phục.' }
    ]
  },
  {
    stt: 51,
    strokeCount: 3,
    radical: '干',
    name: 'Can',
    meaning: 'Thiên can, can dự, chiếc khiên',
    mnemonic: 'Hình chiếc khiên hoặc chày giã gạo dùng để phòng thân chống đỡ.',
    relatedVocab: [
      { kanji: '干す', hiragana: 'ほす (hosu)', sinoVietnamese: 'CAN', meaning: 'Phơi khô, làm cạn nước', level: 'N4', breakdown: 'Cái giá phơi đồ dưới nắng', mnemonic: 'Treo quần áo lên giàn phơi khô dưới nắng.' },
      { kanji: '梅干し', hiragana: 'うめぼし (umeboshi)', sinoVietnamese: 'MAI CAN', meaning: 'Mơ muối ngâm phơi khô', level: 'N4', breakdown: '梅 (Mai) + 干 (Can)', mnemonic: 'Món mơ muối truyền thống chua ngọt đậm đà.' },
      { kanji: '汗', hiragana: 'あせ (ase)', sinoVietnamese: 'HÃN', meaning: 'Mồ hôi', level: 'N3', breakdown: '氵 (Thủy) + 干 (Can)', mnemonic: 'Mồ hôi tuôn rơi như nước khi trời hanh khô.' },
      { kanji: '肝臓', hiragana: 'かんぞう (kanzō)', sinoVietnamese: 'CAN TẠNG', meaning: 'Lá gan', level: 'N2', breakdown: '月 (Nhục) + 干 (Can) + 臓', mnemonic: 'Lá gan lọc độc đóng vai trò then chốt trong cơ thể.' },
      { kanji: '幹', hiragana: 'みき / かん (kan)', sinoVietnamese: 'CÁN', meaning: 'Thân cây, cốt cán', level: 'N2', breakdown: 'Thập + Triều + 干 (Can)', mnemonic: 'Thân cây vững chãi chống chọi mọi mưa giông.' },
      { kanji: '幹部', hiragana: 'かんぶ (kambu)', sinoVietnamese: 'CÁN BỘ', meaning: 'Cán bộ lãnh đạo, nhân sự chủ chốt', level: 'N2', breakdown: '幹 (Cán) + 部 (Bộ)', mnemonic: 'Đội ngũ cán bộ then chốt lèo lái tổ chức.' },
      { kanji: '刊', hiragana: 'かん (kan)', sinoVietnamese: 'SAN', meaning: 'Xuất bản, ấn bản', level: 'N3', breakdown: '干 (Can) + 刂 (Đao)', mnemonic: 'Khắc bản gỗ in ấn phát hành sách báo.' },
      { kanji: '朝刊', hiragana: 'ちょうかん (chōkan)', sinoVietnamese: 'TRIÊU SAN', meaning: 'Báo buổi sáng', level: 'N3', breakdown: '朝 (Triều) + 刊 (San)', mnemonic: 'Tờ báo sớm giao tới tận nhà mỗi bình minh.' },
      { kanji: '夕刊', hiragana: 'ゆうかん (yūkan)', sinoVietnamese: 'TỊCH SAN', meaning: 'Báo buổi chiều', level: 'N3', breakdown: '夕 (Tịch) + 刊 (San)', mnemonic: 'Bản tin chiều cập nhật dòng thời sự nóng hổi.' },
      { kanji: '平和', hiragana: 'へいわ (heiwa)', sinoVietnamese: 'BÌNH HÒA', meaning: 'Hòa bình, thanh bình', level: 'N4', breakdown: '平 (Bình có nét 干) + 和', mnemonic: 'Thế giới phẳng lặng không còn chiến tranh loạn lạc.' }
    ]
  },
  {
    stt: 52,
    strokeCount: 3,
    radical: '幺',
    name: 'Yêu',
    meaning: 'Nhỏ nhắn, sợi tơ nhỏ',
    mnemonic: 'Hai kén tơ nhỏ xíu nối liền vào nhau tạo thành mối liên kết.',
    relatedVocab: [
      { kanji: '幼い', hiragana: 'おさない (osanai)', sinoVietnamese: 'ẤU', meaning: 'Thơ ấu, còn nhỏ dại', level: 'N3', breakdown: '幺 (Yêu) + 力 (Lực)', mnemonic: 'Đứa trẻ non nớt sức lực còn non yếu.' },
      { kanji: '幼児', hiragana: 'ようじ (yōji)', sinoVietnamese: 'ẤU NHI', meaning: 'Trẻ mầm non, em bé', level: 'N3', breakdown: '幼 (Ấu) + 児 (Nhi)', mnemonic: 'Các bé mầm non cần tình yêu thương săn sóc.' },
      { kanji: '幽霊', hiragana: 'ゆうれい (yūrei)', sinoVietnamese: 'U LINH', meaning: 'Hồn ma, bóng ma u linh', level: 'N2', breakdown: '幽 (U có 2 幺) + 霊 (Linh)', mnemonic: 'Bóng ma ẩn hiện chập chờn nơi u tịch.' },
      { kanji: '幻', hiragana: 'まぼろし / げん (gen)', sinoVietnamese: 'ẢO', meaning: 'Ảo ảnh, mộng ảo huyền diệu', level: 'N2', breakdown: '幺 (Yêu) biến thể', mnemonic: 'Cảnh tượng huyền ảo thoáng ẩn thoáng hiện.' },
      { kanji: '幻想', hiragana: 'げんそう (gensō)', sinoVietnamese: 'ẢO TƯỞNG', meaning: 'Ảo tưởng, mộng tưởng kỳ diệu', level: 'N2', breakdown: '幻 (Ảo) + 想 (Tưởng)', mnemonic: 'Thả hồn bay bổng theo những điều kỳ diệu.' },
      { kanji: '幾つ', hiragana: 'いくつ (ikutsu)', sinoVietnamese: 'KỶ', meaning: 'Bao nhiêu (cái), mấy tuổi', level: 'N5', breakdown: '幺 (Yêu) + Thú', mnemonic: 'Từng sợi tơ nhỏ đếm xem có tất cả bao nhiêu cái.' },
      { kanji: '幾分', hiragana: 'いくぶん (ikubun)', sinoVietnamese: 'KỶ PHÂN', meaning: 'Đôi chút, có phần hơi...', level: 'N2', breakdown: '幾 (Kỷ) + 分 (Phân)', mnemonic: 'Có phần thuyên giảm đôi chút sau cơn sốt.' },
      { kanji: '幼稚園', hiragana: 'ようちえん (yōchien)', sinoVietnamese: 'ẤU TRĨ VIÊN', meaning: 'Trường mầm non, mẫu giáo', level: 'N4', breakdown: '幼 (Ấu) + 稚 + 園 (Viên)', mnemonic: 'Khu vườn rộn rã tiếng cười trẻ thơ.' },
      { kanji: '幾重', hiragana: 'いくえ (ikue)', sinoVietnamese: 'KỶ TRỌNG', meaning: 'Muôn vàn lớp, nhiều tầng lớp dày đặc', level: 'N1', breakdown: '幾 (Kỷ) + 重 (Trọng)', mnemonic: 'Muôn trùng sóng gió bao bọc trùng điệp.' },
      { kanji: '幽玄', hiragana: 'ゆうげん (yūgen)', sinoVietnamese: 'U HUYỀN', meaning: 'Vẻ đẹp u huyền, thâm trầm kín đáo', level: 'N1', breakdown: '幽 (U) + 玄 (Huyền)', mnemonic: 'Nét đẹp tĩnh lặng sâu lắng trong trà đạo Nhật Bản.' }
    ]
  },
  {
    stt: 53,
    strokeCount: 3,
    radical: '广',
    name: 'Nghiễm',
    meaning: 'Mái nhà tựa vách núi',
    mnemonic: 'Ngôi nhà xây tựa vào vách núi, chỉ có mái che một bên.',
    relatedVocab: [
      { kanji: '店', hiragana: 'みせ / てん (ten)', sinoVietnamese: 'ĐIẾM', meaning: 'Cửa hàng, tiệm buôn bán', level: 'N5', breakdown: '广 (Nghiễm) + 占 (Chiêm)', mnemonic: 'Dưới mái hiên rộng mở cửa hàng kinh doanh phát tài.' },
      { kanji: '店員', hiragana: 'てんいん (ten\'in)', sinoVietnamese: 'ĐIẾM VIÊN', meaning: 'Nhân viên bán hàng', level: 'N5', breakdown: '店 (Điếm) + 員 (Viên)', mnemonic: 'Người nhân viên ân cần chào đón quý khách.' },
      { kanji: '席', hiragana: 'せき (seki)', sinoVietnamese: 'TỊCH', meaning: 'Chỗ ngồi', level: 'N4', breakdown: '广 (Nghiễm) + 巾 (Cân)', mnemonic: 'Trải chiếu dưới mái nhà ngồi uống trà.' },
      { kanji: '広大', hiragana: 'こうだい (kōdai)', sinoVietnamese: 'QUẢNG ĐẠI', meaning: 'Rộng lớn, bao la bát ngát', level: 'N2', breakdown: '広 (Quảng có 广) + 大 (Đại)', mnemonic: 'Thảo nguyên bao la ngút ngàn tầm mắt.' },
      { kanji: '広い', hiragana: 'ひろい (hiroi)', sinoVietnamese: 'QUẢNG', meaning: 'Rộng rãi, khoáng đạt', level: 'N5', breakdown: '广 (Nghiễm) + ム', mnemonic: 'Căn phòng rộng thênh thang thoáng mát.' },
      { kanji: '床屋', hiragana: 'とこや (tokoya)', sinoVietnamese: 'SÀNG ỐC', meaning: 'Tiệm cắt tóc nam', level: 'N4', breakdown: '床 (Sàng có 广) + 屋 (Ốc)', mnemonic: 'Tiệm hớt tóc gọn gàng ngăn nắp ven đường.' },
      { kanji: '底', hiragana: 'そこ (soko)', sinoVietnamese: 'ĐỂ', meaning: 'Đáy (nồi, biển, cốc)', level: 'N3', breakdown: '广 (Nghiễm) + Đê', mnemonic: 'Mò tận đáy sâu đại dương tìm kiếm kho báu.' },
      { kanji: '政府', hiragana: 'せいふ (seifu)', sinoVietnamese: 'CHÍNH PHỦ', meaning: 'Chính phủ quốc gia', level: 'N3', breakdown: '政 (Chính) + 府 (Phủ có 广)', mnemonic: 'Dinh thự chính phủ điều hành quốc gia hưng thịnh.' },
      { kanji: '態度', hiragana: 'たいど (taido)', sinoVietnamese: 'THÁI ĐỘ', meaning: 'Thái độ, cách hành xử', level: 'N3', breakdown: '態 (Thái) + 度 (Độ có 广)', mnemonic: 'Thái độ tôn trọng chân thành trong giao tiếp.' },
      { kanji: '冷蔵庫', hiragana: 'れいぞうこ (reizōko)', sinoVietnamese: 'LÃNH TÀNG KHỐ', meaning: 'Tủ lạnh bảo quản thực phẩm', level: 'N4', breakdown: '冷 + 蔵 + 庫 (Khố có 广)', mnemonic: 'Nhà kho lạnh bảo quản đồ ăn luôn tươi ngon.' },
      { kanji: '庭', hiragana: 'にわ (niwa)', sinoVietnamese: 'ĐÌNH', meaning: 'Sân vườn', level: 'N5', breakdown: '广 (Nghiễm) + Đình', mnemonic: 'Khu vườn xinh đẹp dưới mái nhà yên ả.' },
      { kanji: '廃止', hiragana: 'はいし (haishi)', sinoVietnamese: 'PHẾ CHỈ', meaning: 'Bãi bỏ, hủy bỏ quy định cũ', level: 'N2', breakdown: '廃 (Phế có 广) + 止 (Chỉ)', mnemonic: 'Dỡ bỏ mái nhà dột nát hủy bỏ luật lỗi thời.' }
    ]
  },
  {
    stt: 54,
    strokeCount: 3,
    radical: '廴',
    name: 'Dẫn',
    meaning: 'Bước chân dài, kéo dài',
    mnemonic: 'Đường đi kéo dài nối tiếp nhịp nhàng dưới bước chân.',
    relatedVocab: [
      { kanji: '延びる', hiragana: 'のびる (nobiru)', sinoVietnamese: 'DUYÊN', meaning: 'Kéo dài ra, hoãn lại', level: 'N3', breakdown: '廴 (Dẫn) + 止 (Chỉ)', mnemonic: 'Bước chân dài sải bước kéo dài thêm thời gian.' },
      { kanji: '延期', hiragana: 'えんき (enki)', sinoVietnamese: 'DUYÊN KỲ', meaning: 'Trì hoãn, lùi lịch hẹn', level: 'N3', breakdown: '延 (Duyên) + 期 (Kỳ)', mnemonic: 'Hoãn kỳ thi sang tuần sau do bão lớn.' },
      { kanji: '建てる', hiragana: 'たてる (tateru)', sinoVietnamese: 'KIẾN', meaning: 'Xây dựng, dựng nên', level: 'N5', breakdown: '廴 (Dẫn) + 聿 (Duật - bút)', mnemonic: 'Cầm bút vạch sơ đồ rồi sải bước xây nhà kiên cố.' },
      { kanji: '建物', hiragana: 'たてもの (tatemono)', sinoVietnamese: 'KIẾN VẬT', meaning: 'Tòa nhà, công trình', level: 'N5', breakdown: '建 (Kiến) + 物 (Vật)', mnemonic: 'Tòa cao ốc đồ sộ nguy nga giữa phố xá.' },
      { kanji: '建築', hiragana: 'けんちく (kenchiku)', sinoVietnamese: 'KIẾN TRÚC', meaning: 'Ngành kiến trúc, xây dựng', level: 'N3', breakdown: '建 (Kiến) + 築 (Trúc)', mnemonic: 'Công trình kiến trúc độc đáo mang tính biểu tượng.' },
      { kanji: '法廷', hiragana: 'ほうてい (hōtei)', sinoVietnamese: 'PHÁP ĐÌNH', meaning: 'Tòa án, phòng xét xử', level: 'N1', breakdown: '法 (Pháp) + 廷 (Đình có 廴)', mnemonic: 'Chốn pháp đình công lý bước vào xét xử nghiêm minh.' },
      { kanji: '宮廷', hiragana: 'きゅうてい (kyūtei)', sinoVietnamese: 'CUNG ĐÌNH', meaning: 'Cung đình hoàng gia', level: 'N1', breakdown: '宮 (Cung) + 廷 (Đình)', mnemonic: 'Chốn triều đình nguy nga của các bậc đế vương xưa.' },
      { kanji: '廻る', hiragana: 'まわる (mawaru)', sinoVietnamese: 'HỒI', meaning: 'Xoay quanh, luân chuyển', level: 'N1', breakdown: '廴 (Dẫn) + 回 (Hồi)', mnemonic: 'Bước chân dài sải vòng quanh khuôn viên hoa viên.' },
      { kanji: '廻船', hiragana: 'かいせん (kaisen)', sinoVietnamese: 'HỒI THUYỀN', meaning: 'Thuyền buôn vận tải đường biển thời Edo', level: 'N1', breakdown: '廻 (Hồi) + 船 (Thuyền)', mnemonic: 'Đoàn thuyền chạy luân phiên vận chuyển gạo hàng hải.' },
      { kanji: '建設', hiragana: 'けんせつ (kensetsu)', sinoVietnamese: 'KIẾN THIẾT', meaning: 'Kiến thiết, xây dựng đất nước', level: 'N3', breakdown: '建 (Kiến) + 設 (Thiết)', mnemonic: 'Chung tay kiến thiết nước nhà giàu mạnh ấm no.' }
    ]
  },
  {
    stt: 55,
    strokeCount: 3,
    radical: '廾',
    name: 'Củng',
    meaning: 'Chắp hai tay cung kính',
    mnemonic: 'Hình hai bàn tay cùng giơ lên nâng đỡ một vật thiêng liêng.',
    relatedVocab: [
      { kanji: '弁護士', hiragana: 'べんごし (bengoshi)', sinoVietnamese: 'BIỆN HỘ SĨ', meaning: 'Luật sư', level: 'N3', breakdown: '弁 (Biện có 廾) + 護 + 士', mnemonic: 'Hai tay nâng cán cân công lý biện hộ cho người vô tội.' },
      { kanji: 'お弁当', hiragana: 'おべんとう (obentō)', sinoVietnamese: 'BIỆN ĐƯƠNG', meaning: 'Hộp cơm bento mang đi', level: 'N5', breakdown: 'お + 弁 (Biện có 廾) + 当', mnemonic: 'Hai tay nâng niu hộp cơm trưa mẹ chuẩn bị chu đáo.' },
      { kanji: '弊害', hiragana: 'へいがい (heigai)', sinoVietnamese: 'TỆ HẠI', meaning: 'Tác hại khôn lường, tệ nạn', level: 'N1', breakdown: '弊 (Tệ có 廾) + 害 (Hại)', mnemonic: 'Những hủ tục mục nát gây ra bao nhiêu tác hại.' },
      { kanji: '弊社', hiragana: 'へいしゃ (heisha)', sinoVietnamese: 'TỆ XÃ', meaning: 'Công ty chúng tôi (khiêm nhường ngữ)', level: 'N2', breakdown: '弊 (Tệ) + 社 (Xã)', mnemonic: 'Cách xưng hô khiêm tốn khi giao dịch làm ăn với đối tác.' },
      { kanji: '算数', hiragana: 'さんすう (sansū)', sinoVietnamese: 'TOÁN SỐ', meaning: 'Môn toán tiểu học', level: 'N3', breakdown: '算 (Toán có 廾 phía dưới) + 数', mnemonic: 'Hai tay cầm que tính làm phép tính nhanh như chớp.' },
      { kanji: '計算', hiragana: 'けいさん (keisan)', sinoVietnamese: 'KẾ TOÁN', meaning: 'Tính toán thu chi', level: 'N3', breakdown: '計 (Kế) + 算 (Toán)', mnemonic: 'Tính toán sổ sách rõ ràng minh bạch.' },
      { kanji: '昇進', hiragana: 'しょうしん (shōshin)', sinoVietnamese: 'THĂNG TIẾN', meaning: 'Thăng tiến, lên chức', level: 'N2', breakdown: '昇 (Thăng có 廾) + 進 (Tiến)', mnemonic: 'Hai tay giơ cao đón nhận quyết định thăng chức vinh hiển.' },
      { kanji: '戒める', hiragana: 'いましめる (imashimeru)', sinoVietnamese: 'GIỚI', meaning: 'Răn đe, cảnh giới', level: 'N1', breakdown: 'Qua (Giáo) + 廾 (hai tay dâng)', mnemonic: 'Hai tay nắm chặt vũ khí tự răn mình phải luôn cảnh giác.' },
      { kanji: '戒律', hiragana: 'かいりつ (kairitsu)', sinoVietnamese: 'GIỚI LUẬT', meaning: 'Giới luật nhà chùa', level: 'N1', breakdown: '戒 (Giới) + 律 (Luật)', mnemonic: 'Nghiêm cẩn giữ trọn giới luật thanh tịnh.' },
      { kanji: '弄ぶ', hiragana: 'もてあそぶ (moteasobu)', sinoVietnamese: 'LỘNG', meaning: 'Trêu đùa, đùa cợt tình cảm', level: 'N1', breakdown: 'Vương + 廾 (hai tay tung hứng)', mnemonic: 'Hai tay chuyền qua chuyền lại đùa giỡn vô tâm.' }
    ]
  },
  {
    stt: 56,
    strokeCount: 3,
    radical: '弋',
    name: 'Dặc',
    meaning: 'Bắn chiếm lấy, cọc gỗ',
    mnemonic: 'Cây cọc gỗ có buộc dây vào mũi tên để bắn chim săn mồi.',
    relatedVocab: [
      { kanji: '式', hiragana: 'しき (shiki)', sinoVietnamese: 'THỨC', meaning: 'Nghi thức, công thức, phong cách', level: 'N4', breakdown: '弋 (Dặc) + 工 (Công)', mnemonic: 'Người thợ dựng cọc đo đạc theo đúng quy thức chuẩn mực.' },
      { kanji: '卒業式', hiragana: 'そつぎょうしき (sotsugyōshiki)', sinoVietnamese: 'TỐT NGHIỆP THỨC', meaning: 'Lễ tốt nghiệp ra trường', level: 'N4', breakdown: '卒業 + 式 (Thức)', mnemonic: 'Buổi lễ tốt nghiệp trang trọng lưu dấu thanh xuân.' },
      { kanji: '結婚式', hiragana: 'けっこんしき (kekkonshiki)', sinoVietnamese: 'KẾT HÔN THỨC', meaning: 'Lễ cưới, hôn lễ', level: 'N4', breakdown: '結婚 + 式 (Thức)', mnemonic: 'Hôn lễ trang nghiêm chúc phúc lứa đôi hạnh phúc.' },
      { kanji: '正式', hiragana: 'せいしき (seishiki)', sinoVietnamese: 'CHÍNH THỨC', meaning: 'Chính thức, chuẩn quy', level: 'N3', breakdown: '正 (Chính) + 式 (Thức)', mnemonic: 'Được công nhận theo thể thức chính thống.' },
      { kanji: '武', hiragana: 'ぶ / たけ (take)', sinoVietnamese: 'VŨ', meaning: 'Võ thuật, vũ dũng', level: 'N3', breakdown: 'Chỉ (bàn chân) + 弋 (cọc/giáo mác)', mnemonic: 'Dừng bước can qua gác lại giáo gươm gìn giữ hòa bình.' },
      { kanji: '武器', hiragana: 'ぶき (buki)', sinoVietnamese: 'VŨ KHÍ', meaning: 'Vũ khí chiến đấu', level: 'N3', breakdown: '武 (Vũ) + 器 (Khí)', mnemonic: 'Trang thiết bị vũ khí phòng thủ bờ cõi.' },
      { kanji: '弐', hiragana: 'に (ni)', sinoVietnamese: 'NHỊ', meaning: 'Số hai (viết trên văn bản tiền tệ hạn chế sửa chữa)', level: 'N1', breakdown: '弋 (Dặc) + 二', mnemonic: 'Chữ Nhị viết hoa trang trọng trong ngân phiếu tài chính.' },
      { kanji: '弑する', hiragana: 'しいする (shiisuru)', sinoVietnamese: 'SÍ', meaning: 'Thí nghịch, giết vua cha phạm thượng', level: 'N1', breakdown: 'Sát + 弋 (Dặc)', mnemonic: 'Hành vi thí chúa bất trung bất hiếu thời loạn lạc.' },
      { kanji: '式場', hiragana: 'しきじょう (shikijō)', sinoVietnamese: 'THỨC TRƯỜNG', meaning: 'Hội trường tổ chức nghi lễ', level: 'N2', breakdown: '式 (Thức) + 場 (Trường)', mnemonic: 'Khán phòng trang hoàng rực rỡ đón chào khách quý.' },
      { kanji: '様式', hiragana: 'ようしき (yōshiki)', sinoVietnamese: 'DẠNG THỨC', meaning: 'Hình thức, phong cách nghệ thuật', level: 'N2', breakdown: '様 (Dạng) + 式 (Thức)', mnemonic: 'Trường phái kiến trúc mang đậm phong cách truyền thống.' }
    ]
  },
  {
    stt: 57,
    strokeCount: 3,
    radical: '弓',
    name: 'Cung',
    meaning: 'Cây cung bắn tên',
    mnemonic: 'Hình dáng thân cây cung uốn cong có dây cung căng ra.',
    relatedVocab: [
      { kanji: '弓', hiragana: 'ゆみ (yumi)', sinoVietnamese: 'CUNG', meaning: 'Cây cung, cánh cung', level: 'N3', breakdown: 'Hình cây cung uốn cong ba khúc', mnemonic: 'Cánh cung uốn cong giương tên nhắm thẳng mục tiêu.' },
      { kanji: '弓道', hiragana: 'きゅうどう (kyūdō)', sinoVietnamese: 'CUNG ĐẠO', meaning: 'Cung đạo Nhật Bản', level: 'N2', breakdown: '弓 (Cung) + 道 (Đạo)', mnemonic: 'Môn nghệ thuật bắn cung rèn luyện thân tâm định tĩnh.' },
      { kanji: '引く', hiragana: 'ひく (hiku)', sinoVietnamese: 'DẪN', meaning: 'Kéo, tra cứu', level: 'N5', breakdown: '弓 (Cung) + 丨 (Cổn - dây cung)', mnemonic: 'Dùng sức kéo căng dây cung bật tên bay xa.' },
      { kanji: '引き出し', hiragana: 'ひきだし (hikidashi)', sinoVietnamese: 'DẪN XUẤT', meaning: 'Ngăn kéo bàn', level: 'N5', breakdown: '引 (Dẫn) + 出 (Xuất)', mnemonic: 'Kéo ngăn kéo cất đồ đạc ngăn nắp.' },
      { kanji: '弟', hiragana: 'おとうと (otōto)', sinoVietnamese: 'ĐỆ', meaning: 'Em trai', level: 'N5', breakdown: 'Dây quấn quanh cây cung 弓', mnemonic: 'Em trai ngoan ngoãn giúp anh tra dây vào cánh cung.' },
      { kanji: '強', hiragana: 'つよい (tsuyoi)', sinoVietnamese: 'CƯỜNG', meaning: 'Mạnh mẽ, kiên cường', level: 'N5', breakdown: '弓 (Cung) + Trùng (sâu bọ)', mnemonic: 'Cánh cung cứng cáp bắn sức công phá mạnh mẽ.' },
      { kanji: '勉強', hiragana: 'べんきょう (benkyō)', sinoVietnamese: 'MIỄN CƯỜNG', meaning: 'Học tập, cố gắng rèn luyện', level: 'N5', breakdown: '勉 (Miễn) + 強 (Cường)', mnemonic: 'Chăm chỉ miệt mài học hỏi để trở nên tài giỏi.' },
      { kanji: '弱', hiragana: 'よわい (yowai)', sinoVietnamese: 'NHƯỢC', meaning: 'Yếu đuối, mỏng manh', level: 'N4', breakdown: 'Hai cánh cung 弓 nhỏ gắn lông chim', mnemonic: 'Cánh cung mềm yếu bắn không trúng bia.' },
      { kanji: '張る', hiragana: 'はる (haru)', sinoVietnamese: 'TRƯƠNG', meaning: 'Căng ra, giăng buồm, dán tem', level: 'N3', breakdown: '弓 (Cung) + 長 (Trường - dài)', mnemonic: 'Kéo căng dây cung hết cỡ theo chiều dài.' },
      { kanji: '緊張', hiragana: 'きんちょう (kinchō)', sinoVietnamese: 'KHẨN TRƯƠNG', meaning: 'Căng thẳng, hồi hộp', level: 'N3', breakdown: '緊 (Khẩn) + 張 (Trương có 弓)', mnemonic: 'Tâm trạng căng như dây đàn trước giờ thi đấu.' },
      { kanji: '弾む', hiragana: 'はずむ (hazumu)', sinoVietnamese: 'ĐÀN', meaning: 'Nảy lên, rộn ràng phấn khởi', level: 'N2', breakdown: '弓 (Cung) + Đơn', mnemonic: 'Quả bóng nảy tưng bừng lòng ngập tràn hân hoan.' },
      { kanji: '発弾', hiragana: 'はつだん (hatsudan)', sinoVietnamese: 'PHÁT ĐẠN', meaning: 'Bắn đạn, phát pháo', level: 'N1', breakdown: '発 (Phát) + 弾 (Đạn có 弓)', mnemonic: 'Khai hỏa viên đạn bay vút xé toạc màn sương.' }
    ]
  },
  {
    stt: 58,
    strokeCount: 3,
    radical: '彐',
    name: 'Kệ',
    meaning: 'Đầu con nhím',
    mnemonic: 'Hình cái mõm nhọn hoặc lớp lông gai nhọn trên đầu nhím.',
    relatedVocab: [
      { kanji: '当たる', hiragana: 'あたる (ataru)', sinoVietnamese: 'ĐƯƠNG', meaning: 'Trúng giải, đúng đắn', level: 'N4', breakdown: 'Tiểu + 彐 (Kệ)', mnemonic: 'Bàn tay vuốt cào bốc trúng lá thăm may mắn.' },
      { kanji: '当然', hiragana: 'とうぜん (tōzen)', sinoVietnamese: 'ĐƯƠNG NHIÊN', meaning: 'Đương nhiên, dĩ nhiên', level: 'N3', breakdown: '当 (Đương) + 然 (Nhiên)', mnemonic: 'Lẽ đương nhiên ai ai cũng thấu hiểu rõ ràng.' },
      { kanji: '雪', hiragana: 'ゆき (yuki)', sinoVietnamese: 'TUYẾT', meaning: 'Tuyết rơi trắng xóa', level: 'N5', breakdown: '雨 (Vũ - mưa) + 彐 (móng cào quét)', mnemonic: 'Mưa đông rơi đóng băng lấy chổi quét tuyết trắng xóa.' },
      { kanji: '彗星', hiragana: 'すいせい (suisei)', sinoVietnamese: 'TUỆ TINH', meaning: 'Sao chổi trên bầu trời', level: 'N1', breakdown: 'Hai chữ 彐 + Sơn + Tinh', mnemonic: 'Ngôi sao mang cái đuôi dài quét sáng ngang trời đêm.' },
      { kanji: '急ぐ', hiragana: 'いそぐ (isogu)', sinoVietnamese: 'CẤP', meaning: 'Gấp gáp, vội vã', level: 'N5', breakdown: '彐 (móng vuốt vồ) + 心 (Tâm)', mnemonic: 'Trong lòng nôn nao giục giã bước chân vội vã.' },
      { kanji: '特急', hiragana: 'とっきゅう (tokkyū)', sinoVietnamese: 'ĐẶC CẤP', meaning: 'Tàu tốc hành đặc biệt', level: 'N4', breakdown: '特 (Đặc) + 急 (Cấp)', mnemonic: 'Chuyến tàu lao vun vút nhanh như chớp.' },
      { kanji: '緊急', hiragana: 'きんきゅう (kinkyū)', sinoVietnamese: 'KHẨN CẤP', meaning: 'Khẩn cấp, tình huống nguy ngập', level: 'N2', breakdown: '緊 (Khẩn) + 急 (Cấp)', mnemonic: 'Tình huống hiểm nghèo cần xử lý ngay tức khắc.' },
      { kanji: '帰る', hiragana: 'かえる (kaeru)', sinoVietnamese: 'QUY', meaning: 'Trở về nhà', level: 'N5', breakdown: 'Chỉ + 彐 (quét tước quét dọn tổ ấm) + Cân', mnemonic: 'Trở về mái ấm gia đình sau chuyến đi xa.' },
      { kanji: '帰国', hiragana: 'きこく (kikoku)', sinoVietnamese: 'QUY QUỐC', meaning: 'Về nước, hồi hương', level: 'N4', breakdown: '帰 (Quy) + 国 (Quốc)', mnemonic: 'Hồi hương sum vầy cùng người thân yêu.' },
      { kanji: '尋ねる', hiragana: 'たずねる (tazuneru)', sinoVietnamese: 'TẦM', meaning: 'Hỏi thăm, truy tìm tung tích', level: 'N4', breakdown: '彐 (Kệ) + Khẩu + Thốn', mnemonic: 'Dò hỏi lần mò từng bước tìm ra manh mối sự thật.' }
    ]
  },
  {
    stt: 59,
    strokeCount: 3,
    radical: '彡',
    name: 'Sam',
    meaning: 'Lông tóc dài, vệt màu',
    mnemonic: 'Ba lọn tóc dài mượt hoặc ba vệt màu trang trí lung linh.',
    relatedVocab: [
      { kanji: '形', hiragana: 'かたち / けい (katachi)', sinoVietnamese: 'HÌNH', meaning: 'Hình dáng, hình thái, cấu trúc', level: 'N4', breakdown: 'Khai + 彡 (Sâm - hoa văn)', mnemonic: 'Những nét vẽ hoa văn khắc họa nên hình thù rõ nét.' },
      { kanji: '人形', hiragana: 'にんぎょう (ningyō)', sinoVietnamese: 'NHÂN HÌNH', meaning: 'Búp bê đáng yêu', level: 'N4', breakdown: '人 (Nhân) + 形 (Hình)', mnemonic: 'Búp bê tạo hình cô gái Nhật Bản duyên dáng.' },
      { kanji: '形式', hiragana: 'けいしき (keishiki)', sinoVietnamese: 'HÌNH THỨC', meaning: 'Hình thức, quy cách khuôn mẫu', level: 'N3', breakdown: '形 (Hình) + 式 (Thức)', mnemonic: 'Tuân thủ đúng chuẩn mực hình thức bề ngoài.' },
      { kanji: '彩る', hiragana: 'いろどる (irodoru)', sinoVietnamese: 'THẢI', meaning: 'Tô điểm sắc màu, rực rỡ', level: 'N1', breakdown: 'Thái (hái) + 彡 (hoa văn rực rỡ)', mnemonic: 'Vẽ thêm những dải màu lộng lẫy tô điểm bức tranh.' },
      { kanji: '色彩', hiragana: 'しきさい (shikisai)', sinoVietnamese: 'SẮC THẢI', meaning: 'Màu sắc, gam màu nghệ thuật', level: 'N1', breakdown: '色 (Sắc) + 彩 (Thải)', mnemonic: 'Gam màu hài hòa tạo nên tác phẩm tuyệt mỹ.' },
      { kanji: '影', hiragana: 'かげ (kage)', sinoVietnamese: 'ẢNH', meaning: 'Cái bóng, bóng râm, hình bóng', level: 'N3', breakdown: 'Cảnh (ánh sáng) + 彡 (vệt hoa văn bóng)', mnemonic: 'Ánh nắng soi rọi in vệt bóng dài trên nền đường.' },
      { kanji: '影響', hiragana: 'えいきょう (eikyō)', sinoVietnamese: 'ẢNH HƯỞNG', meaning: 'Sự ảnh hưởng, tác động lan tỏa', level: 'N3', breakdown: '影 (Ảnh) + 響 (Hưởng)', mnemonic: 'Sức lan tỏa sâu rộng tác động đến nhiều người.' },
      { kanji: '撮影', hiragana: 'さつえい (satsuei)', sinoVietnamese: 'NHIẾP ẢNH', meaning: 'Chụp ảnh, quay phim', level: 'N2', breakdown: '撮 (Nhiếp) + 影 (Ảnh)', mnemonic: 'Bấm máy ghi lại khoảnh khắc đẹp ngập tràn ánh sáng.' },
      { kanji: '彫刻', hiragana: 'ちょうこく (chōkoku)', sinoVietnamese: 'ĐIÊU KHẮC', meaning: 'Nghệ thuật điêu khắc chạm trổ', level: 'N2', breakdown: '彫 (Điêu có 彡) + 刻 (Khắc)', mnemonic: 'Dùng dao trổ từng đường hoa văn tinh xảo lên gỗ.' },
      { kanji: '杉', hiragana: 'すぎ (sugi)', sinoVietnamese: 'SAM', meaning: 'Cây tuyết tùng, cây sam', level: 'N2', breakdown: '木 (Mộc) + 彡 (lá kim vươn tơ)', mnemonic: 'Rừng thông tuyết tùng thẳng tắp tỏa hương thơm ngát.' }
    ]
  },
  {
    stt: 60,
    strokeCount: 3,
    radical: '彳',
    name: 'Xích',
    meaning: 'Bước chân trái, ngã tư đường',
    mnemonic: 'Hình dấu chân trái bước đi thong thả trên ngã tư đường.',
    relatedVocab: [
      { kanji: '行く', hiragana: 'いく / ゆく (iku)', sinoVietnamese: 'HÀNH', meaning: 'Đi, tiến bước', level: 'N5', breakdown: '彳 (bước trái) + 亍 (bước phải)', mnemonic: 'Bước chân trái bước tới, chân phải tiếp nối tiến lên.' },
      { kanji: '銀行', hiragana: 'ぎんこう (ginkō)', sinoVietnamese: 'NGÂN HÀNH', meaning: 'Ngân hàng', level: 'N5', breakdown: '銀 (Ngân - bạc) + 行 (Hành)', mnemonic: 'Nơi dòng tiền tệ bạc vàng lưu thông nhộn nhịp.' },
      { kanji: '旅行', hiragana: 'りょこう (ryokō)', sinoVietnamese: 'LỮ HÀNH', meaning: 'Du lịch khám phá', level: 'N5', breakdown: '旅 (Lữ) + 行 (Hành)', mnemonic: 'Khoác ba lô cất bước phiêu du bốn phương trời.' },
      { kanji: '行動', hiragana: 'こうどう (kōdō)', sinoVietnamese: 'HÀNH ĐỘNG', meaning: 'Hành động thực tế', level: 'N3', breakdown: '行 (Hành) + 動 (Động)', mnemonic: 'Biến lời nói lý thuyết thành hành động cụ thể.' },
      { kanji: '役', hiragana: 'やく (yaku)', sinoVietnamese: 'DỊCH', meaning: 'Vai trò, chức vụ đảm nhiệm', level: 'N3', breakdown: '彳 (Xích) + Thù (vũ khí)', mnemonic: 'Cất bước lên đường tòng quân làm tròn nghĩa vụ.' },
      { kanji: '役に立つ', hiragana: 'やくにたつ (yakunitatsu)', sinoVietnamese: 'DỊCH LẬP', meaning: 'Có ích, phát huy tác dụng', level: 'N4', breakdown: '役 (Dịch) + 立 (Lập)', mnemonic: 'Mang lại giá trị hữu dụng thiết thực cho đời.' },
      { kanji: '待つ', hiragana: 'まつ (matsu)', sinoVietnamese: 'ĐÃI', meaning: 'Chờ đợi người thân', level: 'N5', breakdown: '彳 (Xích) + 寺 (Tự - chùa)', mnemonic: 'Dừng bước chân trước cổng chùa đứng chờ cố nhân.' },
      { kanji: '期待', hiragana: 'きたい (kitai)', sinoVietnamese: 'KỲ ĐÃI', meaning: 'Kỳ vọng, mong chờ tin tốt', level: 'N3', breakdown: '期 (Kỳ) + 待 (Đãi)', mnemonic: 'Đặt trọn niềm tin mong mỏi tương lai tươi sáng.' },
      { kanji: '彼', hiragana: 'かれ (kare)', sinoVietnamese: 'BỈ', meaning: 'Anh ấy, bạn trai', level: 'N4', breakdown: '彳 (Xích) + Bì (Da)', mnemonic: 'Chàng trai cất bước đồng hành cùng sẻ chia.' },
      { kanji: '得', hiragana: 'える / とく (toku)', sinoVietnamese: 'ĐẮC', meaning: 'Đạt được, thu được món hời', level: 'N3', breakdown: '彳 (bước tìm kiếm) + Đán + Thốn', mnemonic: 'Sải bước tìm tòi gặt hái được nhiều điều quý giá.' },
      { kanji: '得意', hiragana: 'とくい (tokui)', sinoVietnamese: 'ĐẮC Ý', meaning: 'Sở trường, tự hào, giỏi giang', level: 'N4', breakdown: '得 (Đắc) + 意 (Ý)', mnemonic: 'Tự tin với thế mạnh vượt trội của bản thân.' },
      { kanji: '徹底', hiragana: 'てってい (tettei)', sinoVietnamese: 'TRIỆT ĐỂ', meaning: 'Triệt để, đến nơi đến chốn', level: 'N1', breakdown: '徹 (Triệt có 彳) + 底 (Để)', mnemonic: 'Làm việc cặn kẽ thấu đáo từ đầu đến chân.' }
    ]
  },
  // Nhóm 4 nét (Bộ 61 – 94)
  {
    stt: 61,
    strokeCount: 4,
    radical: '心',
    variants: ['忄', '⺗'],
    name: 'Tâm',
    meaning: 'Quả tim, tấm lòng, tâm trí',
    mnemonic: 'Hình dáng quả tim với các ngăn van và mạch máu đập rộn ràng.',
    relatedVocab: [
      { kanji: '心', hiragana: 'こころ / しん (shin)', sinoVietnamese: 'TÂM', meaning: 'Trái tim, tấm lòng, tâm can', level: 'N4', breakdown: 'Hình quả tim với các cuống mạch máu', mnemonic: 'Trái tim nhân hậu đong đầy yêu thương.' },
      { kanji: '心配', hiragana: 'しんぱい (shinpai)', sinoVietnamese: 'TÂM PHỐI', meaning: 'Lo lắng, bận tâm', level: 'N5', breakdown: '心 (Tâm) + 配 (Phối)', mnemonic: 'Trong lòng bất an lo nghĩ cho người thân.' },
      { kanji: '安心', hiragana: 'あんしん (anshin)', sinoVietnamese: 'AN TÂM', meaning: 'An tâm, nhẹ nhõm', level: 'N4', breakdown: '安 (An) + 心 (Tâm)', mnemonic: 'Lòng bình an không còn âu lo muộn phiền.' },
      { kanji: '熱心', hiragana: 'ねっしん (nesshin)', sinoVietnamese: 'NHIỆT TÂM', meaning: 'Nhiệt tình, hăng hái', level: 'N4', breakdown: '熱 (Nhiệt) + 心 (Tâm)', mnemonic: 'Ngọn lửa nhiệt huyết cháy bỏng trong tim.' },
      { kanji: '忙しい', hiragana: 'いそがしい (isogashii)', sinoVietnamese: 'MANG', meaning: 'Bận rộn tối mắt', level: 'N5', breakdown: '忄 (Tâm) + 亡 (Vong - mất)', mnemonic: 'Bận đến nỗi tâm trí như muốn đánh mất đi.' },
      { kanji: '忘れる', hiragana: 'わすれる (wasureru)', sinoVietnamese: 'VONG', meaning: 'Quên lãng, bỏ quên', level: 'N5', breakdown: '亡 (Vong) + 心 (Tâm)', mnemonic: 'Ký ức trôi mất khỏi trái tim.' },
      { kanji: '怒る', hiragana: 'おこる / いかる (okoru)', sinoVietnamese: 'NỘ', meaning: 'Tức giận, giận dữ', level: 'N4', breakdown: 'Nô (nô lệ) + 心 (Tâm)', mnemonic: 'Cơn phẫn nộ bốc hỏa trong lòng.' },
      { kanji: '怖い', hiragana: 'こわい (kowai)', sinoVietnamese: 'PHỐ', meaning: 'Đáng sợ, khiếp sợ', level: 'N4', breakdown: '忄 (Tâm) + Bố', mnemonic: 'Nỗi sợ hãi rợn tóc gáy trong tim.' },
      { kanji: '恥ずかしい', hiragana: 'はずかしい (hazukashii)', sinoVietnamese: 'SỈ', meaning: 'Xấu hổ, ngượng ngùng', level: 'N4', breakdown: 'Nhĩ (tai) + 心 (Tâm)', mnemonic: 'Tai đỏ ửng lòng xấu hổ ngượng ngùng.' },
      { kanji: '思う', hiragana: 'おもう (omou)', sinoVietnamese: 'TƯ', meaning: 'Suy nghĩ, ngỡ rằng', level: 'N5', breakdown: 'Điền (ruộng) + 心 (Tâm)', mnemonic: 'Tâm trí luôn trăn trở suy nghĩ về ruộng đồng quê hương.' },
      { kanji: '思い出す', hiragana: 'おもいだす (omoidasu)', sinoVietnamese: 'TƯ XUẤT', meaning: 'Nhớ lại, hồi tưởng', level: 'N4', breakdown: '思 (Tư) + 出 (Xuất)', mnemonic: 'Kỷ niệm xưa chợt ùa về trong tâm trí.' },
      { kanji: '急ぐ', hiragana: 'いそぐ (isogu)', sinoVietnamese: 'CẤP', meaning: 'Gấp gáp, vội vã', level: 'N5', breakdown: 'Kệ + 心 (Tâm)', mnemonic: 'Lòng nôn nao rảo bước thật nhanh.' },
      { kanji: '息', hiragana: 'いき (iki)', sinoVietnamese: 'TỨC', meaning: 'Hơi thở, nhịp thở', level: 'N4', breakdown: 'Tự (mũi) + 心 (Tâm)', mnemonic: 'Hơi thở điều hòa từ trái tim qua cánh mũi.' },
      { kanji: '感謝', hiragana: 'かんしゃ (kansha)', sinoVietnamese: 'CẢM TẠ', meaning: 'Biết ơn sâu sắc, cảm tạ', level: 'N3', breakdown: '感 (Cảm có 心) + 謝 (Tạ)', mnemonic: 'Tấm lòng rung động tri ân người giúp đỡ.' },
      { kanji: '感情', hiragana: 'かんじょう (kanjō)', sinoVietnamese: 'CẢM TÌNH', meaning: 'Cảm xúc, tình cảm chân thành', level: 'N3', breakdown: '感 (Cảm) + 情 (Tình có 忄)', mnemonic: 'Những cung bậc cảm xúc chân thực trong tâm hồn.' },
      { kanji: '慣れる', hiragana: 'なれる (nareru)', sinoVietnamese: 'QUÁN', meaning: 'Quen thuộc, thích nghi', level: 'N4', breakdown: '忄 (Tâm) + Quán', mnemonic: 'Trái tim đã quen dần với nếp sống mới.' },
      { kanji: '慎重', hiragana: 'しんちょう (shinchō)', sinoVietnamese: 'THẬN TRỌNG', meaning: 'Thận trọng, cẩn trọng', level: 'N2', breakdown: '慎 (Thận có 忄) + 重 (Trọng)', mnemonic: 'Trong lòng luôn cân nhắc cẩn trọng từng đường đi nước bước.' },
      { kanji: '悔しい', hiragana: 'くやしい (kuyashii)', sinoVietnamese: 'HỐI', meaning: 'Tiếc nuối, cay cú nuốt hận', level: 'N3', breakdown: '忄 (Tâm) + Mỗi', mnemonic: 'Nuối tiếc nghẹn ngào vì chưa đạt được mục tiêu.' }
    ]
  },
  {
    stt: 62,
    strokeCount: 4,
    radical: '戈',
    name: 'Qua',
    meaning: 'Cây giáo dài có lưỡi móc',
    mnemonic: 'Cây giáo dài có lưỡi ngang dùng để móc và chém quân địch.',
    relatedVocab: [
      { kanji: '戦う', hiragana: 'たたかう (tatakau)', sinoVietnamese: 'CHIẾN', meaning: 'Chiến đấu, quyết đấu', level: 'N3', breakdown: 'Đan + 戈 (Qua)', mnemonic: 'Cầm chắc ngọn giáo xông pha trận mạc chiến đấu.' },
      { kanji: '戦争', hiragana: 'せんそう (sensō)', sinoVietnamese: 'CHIẾN TRANH', meaning: 'Chiến tranh đẫm máu', level: 'N4', breakdown: '戦 (Chiến có 戈) + 争 (Tranh)', mnemonic: 'Cuộc giao tranh gươm giáo khốc liệt.' },
      { kanji: '我々', hiragana: 'われわれ (wareware)', sinoVietnamese: 'NGÃ', meaning: 'Chúng tôi, phe ta', level: 'N3', breakdown: 'Thủ (tay) cầm 戈 (giáo mác)', mnemonic: 'Tay cầm giáo bảo vệ chính mình và đồng đội.' },
      { kanji: '自我', hiragana: 'じが (jiga)', sinoVietnamese: 'TỰ NGÃ', meaning: 'Bản ngã, cái tôi cá nhân', level: 'N1', breakdown: '自 (Tự) + 我 (Ngã có 戈)', mnemonic: 'Cái tôi kiên cường bảo vệ lý tưởng riêng.' },
      { kanji: '戒める', hiragana: 'いましめる (imashimeru)', sinoVietnamese: 'GIỚI', meaning: 'Răn dạy, cảnh giới', level: 'N1', breakdown: '戈 (Qua) + Củng (hai tay)', mnemonic: 'Hai tay cầm gươm tự nhắc nhở cảnh giác đề phòng.' },
      { kanji: '威張る', hiragana: 'いばる (ibaru)', sinoVietnamese: 'UY TRƯƠNG', meaning: 'Kiêu ngạo, hống hách ra oai', level: 'N3', breakdown: '威 (Uy có 戈) + 張 (Trương)', mnemonic: 'Cầm giáo mác thị uy thị chúng.' },
      { kanji: '権威', hiragana: 'けんい (ken\'i)', sinoVietnamese: 'QUYỀN UY', meaning: 'Quyền uy, uy tín lừng lẫy', level: 'N1', breakdown: '権 (Quyền) + 威 (Uy có 戈)', mnemonic: 'Uy tín và quyền lực tuyệt đối của bậc lãnh đạo.' },
      { kanji: '滅びる', hiragana: 'ほろびる (horobiru)', sinoVietnamese: 'DIỆT', meaning: 'Diệt vong, lụi tàn', level: 'N1', breakdown: 'Thủy + Hỏa + 戈 (Qua)', mnemonic: 'Giáo gươm khói lửa thiêu rụi cả một đế chế.' },
      { kanji: '全滅', hiragana: 'ぜんめつ (zemmetsu)', sinoVietnamese: 'TOÀN DIỆT', meaning: 'Bị tiêu diệt hoàn toàn', level: 'N1', breakdown: '全 (Toàn) + 滅 (Diệt có 戈)', mnemonic: 'Đội quân bị đánh bại hoàn toàn trên chiến trường.' },
      { kanji: '戯れる', hiragana: 'たわむれる (tawamureru)', sinoVietnamese: 'HÍ', meaning: 'Đùa vui, vui chơi đùa giỡn', level: 'N1', breakdown: 'Hư + 戈 (Qua)', mnemonic: 'Vờ múa gươm đùa giỡn trong màn kịch vui.' }
    ]
  },
  {
    stt: 63,
    strokeCount: 4,
    radical: '戶',
    variants: ['户', '戸'],
    name: 'Hộ',
    meaning: 'Cửa một cánh, hộ gia đình',
    mnemonic: 'Hình một cánh cửa gỗ gắn vào bản lề bên tường bao bọc nhà ở.',
    relatedVocab: [
      { kanji: '戸', hiragana: 'と (to)', sinoVietnamese: 'HỘ', meaning: 'Cánh cửa một cánh', level: 'N5', breakdown: 'Hình cánh cửa đơn đóng mở bằng then gỗ', mnemonic: 'Khép cánh cửa gỗ giữ ấm cho gian phòng.' },
      { kanji: '雨戸', hiragana: 'あまど (amado)', sinoVietnamese: 'VŨ HỘ', meaning: 'Cửa chớp chắn mưa bão', level: 'N4', breakdown: '雨 (Vũ) + 戸 (Hộ)', mnemonic: 'Đóng chặt cửa chớp che mưa gió bão bùng.' },
      { kanji: '井戸', hiragana: 'いど (ido)', sinoVietnamese: 'TỈNH HỘ', meaning: 'Giếng nước làng quê', level: 'N3', breakdown: '井 (Tỉnh - giếng) + 戸 (Hộ)', mnemonic: 'Cửa nắp giếng nước trong mát ngàn năm.' },
      { kanji: '戻る', hiragana: 'もどる (modoru)', sinoVietnamese: 'LỆ', meaning: 'Quay trở lại, về chỗ cũ', level: 'N4', breakdown: '戸 (Hộ) + Đại (người dang tay)', mnemonic: 'Người đẩy cánh cửa bước quay trở về nhà.' },
      { kanji: '房', hiragana: 'ふさ / ぼう (bō)', sinoVietnamese: 'PHÒNG', meaning: 'Gian phòng riêng, chùm quả', level: 'N2', breakdown: '戸 (Hộ) + Phương', mnemonic: 'Gian phòng nhỏ sau cánh cửa ấm cúng.' },
      { kanji: '暖房', hiragana: 'だんぼう (dambō)', sinoVietnamese: 'NOÃN PHÒNG', meaning: 'Hệ thống sưởi ấm mùa đông', level: 'N4', breakdown: '暖 (Noãn) + 房 (Phòng có 戸)', mnemonic: 'Bật máy sưởi ấm áp cả căn phòng kín.' },
      { kanji: '冷房', hiragana: 'れいぼう (reibō)', sinoVietnamese: 'LÃNH PHÒNG', meaning: 'Máy điều hòa mát mùa hè', level: 'N4', breakdown: '冷 (Lãnh) + 房 (Phòng có 戸)', mnemonic: 'Không khí mát mẻ xua tan oi ả ngày hè.' },
      { kanji: '雇う', hiragana: 'やとう (yatou)', sinoVietnamese: 'CỐ', meaning: 'Thuê mướn nhân công', level: 'N3', breakdown: '戸 (Hộ) + Chuy (chim)', mnemonic: 'Mời người đến gõ cửa giao việc làm ăn.' },
      { kanji: '雇用', hiragana: 'こよう (koyō)', sinoVietnamese: 'CỐ DỤNG', meaning: 'Tuyển dụng, việc làm', level: 'N2', breakdown: '雇 (Cố có 戸) + 用 (Dụng)', mnemonic: 'Chính sách tạo công ăn việc làm cho người lao động.' },
      { kanji: '所', hiragana: 'ところ / しょ (sho)', sinoVietnamese: 'SỞ', meaning: 'Nơi chốn, địa điểm', level: 'N5', breakdown: '戸 (Hộ) + 斤 (Cân - rìu đẽo cửa)', mnemonic: 'Đẽo then cài cửa định vị chốn an cư lạc nghiệp.' }
    ]
  },
  {
    stt: 64,
    strokeCount: 4,
    radical: '手',
    variants: ['扌'],
    name: 'Thủ',
    meaning: 'Bàn tay, ngón tay',
    mnemonic: 'Hình bàn tay xòe các ngón tay và đường chỉ tay khéo léo.',
    relatedVocab: [
      { kanji: '手', hiragana: 'て (te)', sinoVietnamese: 'THỦ', meaning: 'Bàn tay, cánh tay', level: 'N5', breakdown: 'Hình các ngón tay xòe ra', mnemonic: 'Đôi bàn tay khéo léo làm nên tất cả.' },
      { kanji: '手紙', hiragana: 'てがみ (tegami)', sinoVietnamese: 'THỦ CHỈ', meaning: 'Bức thư tay chan chứa tình cảm', level: 'N5', breakdown: '手 (Thủ) + 紙 (Chỉ - giấy)', mnemonic: 'Tự tay nắn nót viết từng dòng thư gửi bạn.' },
      { kanji: '持つ', hiragana: 'もつ (motsu)', sinoVietnamese: 'TRÌ', meaning: 'Cầm, nắm giữ, sở hữu', level: 'N5', breakdown: '扌 (Thủ) + 寺 (Tự - chùa)', mnemonic: 'Tay cầm nén hương thành tâm bái lễ.' },
      { kanji: '気持ち', hiragana: 'きもち (kimochi)', sinoVietnamese: 'KHÍ TRÌ', meaning: 'Tâm trạng, cảm giác thoải mái', level: 'N4', breakdown: '気 (Khí) + 持 (Trì có 扌)', mnemonic: 'Cảm xúc hân hoan dễ chịu trong lòng.' },
      { kanji: '押す', hiragana: 'おす (osu)', sinoVietnamese: 'ÁP', meaning: 'Nhấn nút, ấn, đẩy', level: 'N5', breakdown: '扌 (Thủ) + Giáp', mnemonic: 'Dùng ngón tay ấn nút chuông cửa.' },
      { kanji: '引く', hiragana: 'ひく (hiku)', sinoVietnamese: 'DẪN', meaning: 'Kéo vào', level: 'N5', breakdown: 'Cung có nét thủ', mnemonic: 'Dùng sức tay kéo cửa trượt.' },
      { kanji: '払う', hiragana: 'はらう (harau)', sinoVietnamese: 'PHẤT', meaning: 'Trả tiền, thanh toán', level: 'N4', breakdown: '扌 (Thủ) + Khư', mnemonic: 'Đưa tay móc tiền trả hóa đơn sòng phẳng.' },
      { kanji: '拾う', hiragana: 'ひろう (hirou)', sinoVietnamese: 'THẬP', meaning: 'Nhặt lên, lượm đồ rơi', level: 'N4', breakdown: '扌 (Thủ) + Hợp', mnemonic: 'Cúi người đưa tay nhặt chiếc ví rơi bên đường.' },
      { kanji: '指', hiragana: 'ゆび (yubi)', sinoVietnamese: 'CHỈ', meaning: 'Ngón tay', level: 'N4', breakdown: '扌 (Thủ) + Chỉ', mnemonic: 'Ngón tay thon dài gõ phím nhẹ nhàng.' },
      { kanji: '探す', hiragana: 'さがす (sagasu)', sinoVietnamese: 'THÁM', meaning: 'Tìm kiếm đồ thất lạc', level: 'N4', breakdown: '扌 (Thủ) + Thâm', mnemonic: 'Dùng tay vạch từng ngăn tìm chiếc chìa khóa.' },
      { kanji: '投げる', hiragana: 'なげる (nageru)', sinoVietnamese: 'ĐẦU', meaning: 'Ném, phóng bóng', level: 'N4', breakdown: '扌 (Thủ) + Thù', mnemonic: 'Vung cánh tay ném bóng thẳng vào rổ.' },
      { kanji: '折る', hiragana: 'おる (oru)', sinoVietnamese: 'CHIẾT', meaning: 'Bẻ gãy, gấp giấy origami', level: 'N4', breakdown: '扌 (Thủ) + Cân (rìu)', mnemonic: 'Dùng tay gấp từng nếp giấy tạo hình chú hạc.' },
      { kanji: '抜く', hiragana: 'ぬく (nuku)', sinoVietnamese: 'BẠT', meaning: 'Rút ra, nhổ cỏ', level: 'N3', breakdown: '扌 (Thủ) + Bạt', mnemonic: 'Đưa tay nhổ tận gốc cỏ dại ngoài vườn.' },
      { kanji: '打つ', hiragana: 'うつ (utsu)', sinoVietnamese: 'ĐẢ', meaning: 'Đánh bóng, gõ bàn phím', level: 'N4', breakdown: '扌 (Thủ) + Đinh', mnemonic: 'Tay cầm búa gõ đinh chắc nịch.' },
      { kanji: '招く', hiragana: 'まねく (maneku)', sinoVietnamese: 'CHIÊU', meaning: 'Mời gọi, vẫy gọi khách', level: 'N3', breakdown: '扌 (Thủ) + Chiêu', mnemonic: 'Mèo thần tài giơ tay vẫy chào rước tài lộc.' },
      { kanji: '拡大', hiragana: 'かくだい (kakudai)', sinoVietnamese: 'KHUẾCH ĐẠI', meaning: 'Mở rộng quy mô', level: 'N3', breakdown: '拡 (Khuếch có 扌) + 大 (Đại)', mnemonic: 'Dang rộng đôi tay mở rộng tầm nhìn doanh nghiệp.' },
      { kanji: '握る', hiragana: 'にぎる (nigiru)', sinoVietnamese: 'ÁC', meaning: 'Nắm chặt, nắm cơm onigiri', level: 'N2', breakdown: '扌 (Thủ) + Ốc', mnemonic: 'Hai bàn tay khéo léo nắm nắm cơm nóng hổi.' },
      { kanji: '援助', hiragana: 'えんじょ (enjo)', sinoVietnamese: 'VIỆN TRỢ', meaning: 'Giúp đỡ, viện trợ nhân đạo', level: 'N2', breakdown: '援 (Viện có 扌) + 助 (Trợ)', mnemonic: 'Chung tay chìa bàn tay ấm áp cứu trợ đồng bào.' }
    ]
  },
  {
    stt: 65,
    strokeCount: 4,
    radical: '支',
    name: 'Chi',
    meaning: 'Cành cây, chi nhánh',
    mnemonic: 'Bàn tay (Hựu 又) đang cầm một cành cây (Thập 十).',
    relatedVocab: [
      { kanji: '支える', hiragana: 'ささえる (sasaeru)', sinoVietnamese: 'CHI', meaning: 'Nâng đỡ, chống đỡ, hỗ trợ', level: 'N3', breakdown: 'Thập + Hựu (tay cầm gậy chống)', mnemonic: 'Cầm gậy vững vàng chống đỡ căn nhà lúc giông bão.' },
      { kanji: '支配', hiragana: 'しはい (shihai)', sinoVietnamese: 'CHI PHỐI', meaning: 'Thống trị, kiểm soát chi phối', level: 'N2', breakdown: '支 (Chi) + 配 (Phối)', mnemonic: 'Nắm quyền kiểm soát toàn bộ cục diện thị trường.' },
      { kanji: '支店', hiragana: 'してん (shiten)', sinoVietnamese: 'CHI ĐIẾM', meaning: 'Chi nhánh ngân hàng/công ty', level: 'N3', breakdown: '支 (Chi) + 店 (Điếm)', mnemonic: 'Cửa hàng chi nhánh mở rộng mạng lưới kinh doanh.' },
      { kanji: '支持', hiragana: 'しじ (shiji)', sinoVietnamese: 'CHI TRÌ', meaning: 'Ủng hộ, đồng tình tán thành', level: 'N2', breakdown: '支 (Chi) + 持 (Trì)', mnemonic: 'Hết lòng ủng hộ lý tưởng cao đẹp của đồng nghiệp.' },
      { kanji: '支払い', hiragana: 'しはらい (shiharai)', sinoVietnamese: 'CHI PHẤT', meaning: 'Sự thanh toán tiền nong', level: 'N3', breakdown: '支 (Chi) + 払 (Phất)', mnemonic: 'Thanh toán viện phí đầy đủ sòng phẳng.' },
      { kanji: '枝', hiragana: 'えだ (eda)', sinoVietnamese: 'CHI', meaning: 'Cành cây rợp bóng mát', level: 'N4', breakdown: '木 (Mộc) + 支 (Chi)', mnemonic: 'Những cành cây vươn dài đan xen đón nắng mai.' },
      { kanji: '収支', hiragana: 'しゅうし (shūshi)', sinoVietnamese: 'THU CHI', meaning: 'Thu chi ngân sách', level: 'N2', breakdown: '収 (Thu) + 支 (Chi)', mnemonic: 'Cân đối nguồn thu và nguồn chi hợp lý.' },
      { kanji: '支出', hiragana: 'ししゅつ (shishutsu)', sinoVietnamese: 'CHI XUẤT', meaning: 'Khoản chi tiêu xuất quỹ', level: 'N2', breakdown: '支 (Chi) + 出 (Xuất)', mnemonic: 'Quản lý chặt chẽ từng khoản chi tiêu trong gia đình.' },
      { kanji: '支部', hiragana: 'しぶ (shibu)', sinoVietnamese: 'CHI BỘ', meaning: 'Chi bộ, phân hội', level: 'N1', breakdown: '支 (Chi) + 部 (Bộ)', mnemonic: 'Phân hội cơ sở triển khai sâu sát nhiệm vụ.' },
      { kanji: '支援', hiragana: 'しえん (shien)', sinoVietnamese: 'CHI VIỆN', meaning: 'Chi viện, trợ giúp đắc lực', level: 'N2', breakdown: '支 (Chi) + 援 (Viện)', mnemonic: 'Cung cấp lương thực thuốc men chi viện vùng lũ lụt.' }
    ]
  },
  {
    stt: 66,
    strokeCount: 4,
    radical: '攴',
    variants: ['攵'],
    name: 'Phộc',
    meaning: 'Đánh khẽ, rèn giũa',
    mnemonic: 'Bàn tay (又) cầm que gậy (卜) gõ nhẹ để dạy dỗ uốn nắn học trò.',
    relatedVocab: [
      { kanji: '教える', hiragana: 'おしえる (oshieru)', sinoVietnamese: 'GIÁO', meaning: 'Dạy dỗ, chỉ bảo', level: 'N5', breakdown: 'Hiếu + 攵 (Phộc)', mnemonic: 'Cầm roi nhẹ nhàng uốn nắn học trò nên người.' },
      { kanji: '教室', hiragana: 'きょうしつ (kyōshitsu)', sinoVietnamese: 'GIÁO THẤT', meaning: 'Phòng học, lớp học', level: 'N5', breakdown: '教 (Giáo) + 室 (Thất)', mnemonic: 'Phòng học nơi thầy trò cùng trao đổi tri thức.' },
      { kanji: '数える', hiragana: 'かぞえる (kazoeru)', sinoVietnamese: 'SỐ', meaning: 'Đếm số lượng', level: 'N4', breakdown: 'Lâu + 攵 (Phộc)', mnemonic: 'Cầm que tính gõ nhẹ đếm từng món đồ.' },
      { kanji: '数学', hiragana: 'すうがく (sūgaku)', sinoVietnamese: 'SỐ HỌC', meaning: 'Môn toán học', level: 'N4', breakdown: '数 (Số) + 学 (Học)', mnemonic: 'Môn khoa học về các con số logic.' },
      { kanji: '救う', hiragana: 'すくう (sukuu)', sinoVietnamese: 'CỨU', meaning: 'Cứu giúp, cứu vớt', level: 'N3', breakdown: 'Cầu + 攵 (Phộc)', mnemonic: 'Chìa tay cứu vớt người gặp nạn giữa dòng nước lũ.' },
      { kanji: '救急車', hiragana: 'きゅうきゅうしゃ (kyūkyūsha)', sinoVietnamese: 'CỨU CẤP XA', meaning: 'Xe cứu thương', level: 'N4', breakdown: '救 (Cứu) + 急 (Cấp) + 車', mnemonic: 'Xe cấp cứu hụ còi hối hả đưa bệnh nhân vào viện.' },
      { kanji: '散歩', hiragana: 'さんぽ (sampo)', sinoVietnamese: 'TẢN BỘ', meaning: 'Đi dạo bộ thư giãn', level: 'N5', breakdown: '散 (Tản có 攵) + 歩 (Bộ)', mnemonic: 'Thong dong rảo bước ngắm cảnh hoàng hôn.' },
      { kanji: '政権', hiragana: 'せいけん (seiken)', sinoVietnamese: 'CHÍNH QUYỀN', meaning: 'Chính quyền lãnh đạo', level: 'N2', breakdown: '政 (Chính có 攵) + 権 (Quyền)', mnemonic: 'Cầm roi quyền lực điều hành việc nước công minh.' },
      { kanji: '改める', hiragana: 'あらためる (aratameru)', sinoVietnamese: 'CẢI', meaning: 'Sửa đổi, cải tiến', level: 'N2', breakdown: 'Kỷ + 攵 (Phộc)', mnemonic: 'Tự gõ nhắc nhở mình sửa đổi thói hư tật xấu.' },
      { kanji: '故障', hiragana: 'こしょう (koshō)', sinoVietnamese: 'CỐ CHƯỚNG', meaning: 'Hỏng hóc, sự cố máy móc', level: 'N4', breakdown: '故 (Cố có 攵) + 障 (Chướng)', mnemonic: 'Máy móc trục trặc ngưng hoạt động.' }
    ]
  },
  {
    stt: 67,
    strokeCount: 4,
    radical: '文',
    name: 'Văn',
    meaning: 'Văn chương, văn hoa',
    mnemonic: 'Hình người có các nét hoa văn trang trí đan chéo trước ngực rực rỡ.',
    relatedVocab: [
      { kanji: '文学', hiragana: 'ぶんがく (bungaku)', sinoVietnamese: 'VĂN HỌC', meaning: 'Văn học nghệ thuật', level: 'N4', breakdown: '文 (Văn) + 学 (Học)', mnemonic: 'Kho tàng các tác phẩm văn chương bất hủ.' },
      { kanji: '文化', hiragana: 'ぶんか (bunka)', sinoVietnamese: 'VĂN HÓA', meaning: 'Văn hóa dân tộc', level: 'N4', breakdown: '文 (Văn) + 化 (Hóa)', mnemonic: 'Nền văn hóa đậm đà bản sắc truyền thống.' },
      { kanji: '作文', hiragana: 'さくぶん (sakubun)', sinoVietnamese: 'TÁC VĂN', meaning: 'Bài văn, tập làm văn', level: 'N5', breakdown: '作 (Tác) + 文 (Văn)', mnemonic: 'Bài văn nắn nót viết từ cảm xúc chân thật.' },
      { kanji: '文字', hiragana: 'もじ / もんじ (moji)', sinoVietnamese: 'VĂN TỰ', meaning: 'Chữ cái, ký tự', level: 'N3', breakdown: '文 (Văn) + 字 (Tự)', mnemonic: 'Ký tự chữ viết truyền tải tư tưởng.' },
      { kanji: '文章', hiragana: 'ぶんしょう (bunshō)', sinoVietnamese: 'VĂN CHƯƠNG', meaning: 'Đoạn văn, bài báo', level: 'N3', breakdown: '文 (Văn) + 章 (Chương)', mnemonic: 'Đoạn văn mạch lạc giàu hình ảnh gợi cảm.' },
      { kanji: '注文', hiragana: 'ちゅうもん (chūmon)', sinoVietnamese: 'CHÚ VĂN', meaning: 'Đặt hàng, gọi món', level: 'N4', breakdown: '注 (Chú) + 文 (Văn)', mnemonic: 'Ghi chú gọi món ăn trong nhà hàng.' },
      { kanji: '文房具', hiragana: 'ぶんぼうぐ (bumbōgu)', sinoVietnamese: 'VĂN PHÒNG CỤ', meaning: 'Văn phòng phẩm, đồ dùng học tập', level: 'N3', breakdown: '文 (Văn) + 房 + 具', mnemonic: 'Bút thước vở ghi chuẩn bị cho năm học mới.' },
      { kanji: '天文学', hiragana: 'てんもんがく (temmongaku)', sinoVietnamese: 'THIÊN VĂN HỌC', meaning: 'Ngành thiên văn học', level: 'N1', breakdown: '天 + 文 (Văn) + 学', mnemonic: 'Khám phá các vì sao và quỹ đạo hành tinh.' },
      { kanji: '文句', hiragana: 'もんく (monku)', sinoVietnamese: 'VĂN CÚ', meaning: 'Phàn nàn, càu nhàu, câu chữ', level: 'N3', breakdown: '文 (Văn) + 句 (Cú)', mnemonic: 'Cất lời cằn nhằn phàn nàn về dịch vụ.' },
      { kanji: '文明', hiragana: 'ぶんめい (bummei)', sinoVietnamese: 'VĂN MINH', meaning: 'Văn minh nhân loại', level: 'N2', breakdown: '文 (Văn) + 明 (Minh)', mnemonic: 'Nền văn minh rực rỡ soi sáng lịch sử.' }
    ]
  },
  {
    stt: 68,
    strokeCount: 4,
    radical: '斗',
    name: 'Đẩu',
    meaning: 'Cái đấu để đong, sao Bắc Đẩu',
    mnemonic: 'Cái gáo có cán dài dùng để múc nước hoặc đong lúa gạo.',
    relatedVocab: [
      { kanji: '北斗七星', hiragana: 'ほくとしちせい (hokuto shichisei)', sinoVietnamese: 'BẮC ĐẨU THẤT TINH', meaning: 'Chòm sao Bắc Đẩu hình chiếc gáo', level: 'N1', breakdown: '北 + 斗 (Đẩu) + 七星', mnemonic: 'Bảy ngôi sao sáng lấp lánh định hướng phương Bắc.' },
      { kanji: '料', hiragana: 'りょう (ryō)', sinoVietnamese: 'LIỆU', meaning: 'Nguyên liệu, chi phí', level: 'N4', breakdown: 'Mễ (thóc gạo) + 斗 (Đẩu - gáo đong)', mnemonic: 'Dùng gáo đong gạo tính toán khẩu phần ăn.' },
      { kanji: '料金', hiragana: 'りょうきん (ryōkin)', sinoVietnamese: 'LIỆU KIM', meaning: 'Tiền cước, tiền phí', level: 'N4', breakdown: '料 (Liệu) + 金 (Kim)', mnemonic: 'Khoản chi phí thanh toán vé tàu xe.' },
      { kanji: '料理', hiragana: 'りょうり (ryōri)', sinoVietnamese: 'LIỆU LÝ', meaning: 'Nấu nướng, món ăn', level: 'N5', breakdown: '料 (Liệu có 斗) + 理 (Lý)', mnemonic: 'Tự tay nấu những món ăn thơm ngon bổ dưỡng.' },
      { kanji: '無料', hiragana: 'むりょう (muryō)', sinoVietnamese: 'VÔ LIỆU', meaning: 'Miễn phí, không tốn tiền', level: 'N4', breakdown: '無 (Vô) + 料 (Liệu)', mnemonic: 'Được vào cửa tham quan hoàn toàn miễn phí.' },
      { kanji: '給料', hiragana: 'きゅうりょう (kyūryō)', sinoVietnamese: 'CẤP LIỆU', meaning: 'Tiền lương hàng tháng', level: 'N4', breakdown: '給 (Cấp) + 料 (Liệu)', mnemonic: 'Khoản tiền lương xứng đáng sau tháng ngày lao động.' },
      { kanji: '材料', hiragana: 'ざいりょう (zairyō)', sinoVietnamese: 'TÀI LIỆU', meaning: 'Vật liệu, nguyên liệu làm bánh', level: 'N4', breakdown: '材 (Tài) + 料 (Liệu)', mnemonic: 'Chuẩn bị đầy đủ nguyên liệu trước khi vào bếp.' },
      { kanji: '斜め', hiragana: 'ななめ (naname)', sinoVietnamese: 'TÀ', meaning: 'Nghiêng nghiêng, chéo xiên', level: 'N3', breakdown: 'Dư + 斗 (Đẩu)', mnemonic: 'Cầm nghiêng cái gáo rót từng giọt rượu quý.' },
      { kanji: '科', hiragana: 'か (ka)', sinoVietnamese: 'KHOA', meaning: 'Chuyên khoa, khoa mục', level: 'N3', breakdown: 'Hòa + 斗 (Đẩu)', mnemonic: 'Đong lúa phân chia vào từng khoa mục cụ thể.' },
      { kanji: '科学', hiragana: 'かがく (kagaku)', sinoVietnamese: 'KHOA HỌC', meaning: 'Khoa học công nghệ', level: 'N4', breakdown: '科 (Khoa có 斗) + 学 (Học)', mnemonic: 'Khoa học mở ra chân trời khám phá mới.' }
    ]
  },
  {
    stt: 69,
    strokeCount: 4,
    radical: '斤',
    name: 'Cân',
    meaning: 'Cái rìu, cân lượng',
    mnemonic: 'Hình lưỡi rìu gắn vào cán gỗ dùng để đốn củi khai hoang.',
    relatedVocab: [
      { kanji: '新', hiragana: 'あたら.しい / しん (shin)', sinoVietnamese: 'TÂN', meaning: 'Mới mẻ, tân tiến', level: 'N5', breakdown: 'Lập + Mộc + 斤 (Cân - rìu)', mnemonic: 'Dùng rìu đẵn gỗ tươi đóng chiếc bàn mới toanh.' },
      { kanji: '新聞', hiragana: 'しんぶん (shimbun)', sinoVietnamese: 'TÂN VĂN', meaning: 'Tờ báo, tin tức mới nghe', level: 'N5', breakdown: '新 (Tân có 斤) + 聞 (Văn - nghe)', mnemonic: 'Đọc báo sáng cập nhật tin tức mới nhất.' },
      { kanji: '新年', hiragana: 'しんねん (shinnen)', sinoVietnamese: 'TÂN NIÊN', meaning: 'Năm mới, đầu xuân', level: 'N4', breakdown: '新 (Tân) + 年 (Niên)', mnemonic: 'Chào đón năm mới với muôn điều an khang thịnh vượng.' },
      { kanji: '斧', hiragana: 'おの (ono)', sinoVietnamese: 'PHỦ', meaning: 'Cái rìu đốn củi', level: 'N1', breakdown: 'Phụ + 斤 (Cân)', mnemonic: 'Chiếc rìu sắc bén đốn củi trong truyện cổ tích.' },
      { kanji: '断る', hiragana: 'ことわる (kotowaru)', sinoVietnamese: 'ĐOÁN', meaning: 'Từ chối lịch sự', level: 'N3', breakdown: 'Đoạn + 斤 (Cân - rìu chặt đứt)', mnemonic: 'Dứt khoát từ chối lời đề nghị không phù hợp.' },
      { kanji: '横断歩道', hiragana: 'おうだんほどう (ōdan hodō)', sinoVietnamese: 'HOÀNH ĐOÁN BỘ ĐẠO', meaning: 'Vạch kẻ sang đường cho người đi bộ', level: 'N4', breakdown: '横 + 断 (Đoán có 斤) + 歩道', mnemonic: 'Băng qua đường an toàn trên vạch kẻ trắng.' },
      { kanji: '所', hiragana: 'ところ (tokoro)', sinoVietnamese: 'SỞ', meaning: 'Nơi chốn, địa điểm', level: 'N5', breakdown: 'Hộ + 斤 (Cân)', mnemonic: 'Đẵn gỗ làm then cài cửa an cư lạc nghiệp.' },
      { kanji: '住所', hiragana: 'じゅうしょ (jūsho)', sinoVietnamese: 'TRÚ SỞ', meaning: 'Địa chỉ nhà ở', level: 'N5', breakdown: '住 (Trú) + 所 (Sở có 斤)', mnemonic: 'Địa chỉ nơi cư trú ghi rõ ràng trên bưu kiện.' },
      { kanji: '斤量', hiragana: 'きんりょう (kinryō)', sinoVietnamese: 'CÂN LƯỢNG', meaning: 'Trọng lượng, khối lượng cân đo', level: 'N1', breakdown: '斤 (Cân) + 量 (Lượng)', mnemonic: 'Đo đếm trọng lượng chính xác từng cân.' },
      { kanji: '斬新', hiragana: 'ざんしん (zanshin)', sinoVietnamese: 'TRẢM TÂN', meaning: 'Mới lạ, độc đáo mang tính đột phá', level: 'N1', breakdown: '斬 (Trảm có 斤) + 新 (Tân có 斤)', mnemonic: 'Ý tưởng độc đáo mang tính cách tân vượt bậc.' }
    ]
  },
  {
    stt: 70,
    strokeCount: 4,
    radical: '方',
    name: 'Phương',
    meaning: 'Phương hướng, hình vuông',
    mnemonic: 'Hình hai chiếc thuyền buộc song song hoặc dáng người chỉ phương hướng.',
    relatedVocab: [
      { kanji: '方', hiragana: 'かた / ほう (hō)', sinoVietnamese: 'PHƯƠNG', meaning: 'Phương hướng, vị ngài (kính ngữ), cách thức', level: 'N5', breakdown: 'Hình mái chèo rẽ sóng định hướng', mnemonic: 'Định rõ phương hướng tiến lên phía trước.' },
      { kanji: '使い方', hiragana: 'つかいかた (tsukaikata)', sinoVietnamese: 'SỬ PHƯƠNG', meaning: 'Cách sử dụng máy móc', level: 'N5', breakdown: '使 (Sử) + 方 (Phương)', mnemonic: 'Đọc kỹ hướng dẫn cách vận hành thiết bị.' },
      { kanji: '読み方', hiragana: 'よみかた (yomikata)', sinoVietnamese: 'ĐỘC PHƯƠNG', meaning: 'Cách đọc chữ Hán', level: 'N5', breakdown: '読 (Độc) + 方 (Phương)', mnemonic: 'Tra cứu cách đọc âm Hán và âm thuần Nhật.' },
      { kanji: '夕方', hiragana: 'ゆうがた (yūgata)', sinoVietnamese: 'TỊCH PHƯƠNG', meaning: 'Buổi chiều tà', level: 'N5', breakdown: '夕 (Tịch) + 方 (Phương)', mnemonic: 'Bóng chiều buông xuống nơi phương trời tây.' },
      { kanji: '旅', hiragana: 'たび (tabi)', sinoVietnamese: 'LỮ', meaning: 'Chuyến đi xa, chuyến du hành', level: 'N4', breakdown: 'Phương (cờ phất) + người', mnemonic: 'Cầm cờ định hướng dẫn đoàn người đi du ngoạn.' },
      { kanji: '旅行', hiragana: 'りょこう (ryokō)', sinoVietnamese: 'LỮ HÀNH', meaning: 'Du lịch nghỉ dưỡng', level: 'N5', breakdown: '旅 (Lữ có 方) + 行 (Hành)', mnemonic: 'Chuyến du lịch khám phá bao danh lam thắng cảnh.' },
      { kanji: '旅館', hiragana: 'りょかん (ryokan)', sinoVietnamese: 'LỮ QUÁN', meaning: 'Nhà trọ truyền thống kiểu Nhật', level: 'N4', breakdown: '旅 (Lữ) + 館 (Quán)', mnemonic: 'Khách sạn cổ kính trải chiếu tatami tắm suối nước nóng.' },
      { kanji: '方法', hiragana: 'ほうほう (hōhō)', sinoVietnamese: 'PHƯƠNG PHÁP', meaning: 'Phương pháp, cách làm', level: 'N4', breakdown: '方 (Phương) + 法 (Pháp)', mnemonic: 'Tìm ra phương pháp học tập hiệu quả nhất.' },
      { kanji: '方面', hiragana: 'ほうめん (hōmen)', sinoVietnamese: 'PHƯƠNG DIỆN', meaning: 'Hướng đi (tàu), lĩnh vực', level: 'N3', breakdown: '方 (Phương) + 面 (Diện)', mnemonic: 'Chuyến tàu hướng về khu vực trung tâm Tokyo.' },
      { kanji: '四方', hiragana: 'しほう (shihō)', sinoVietnamese: 'TỨ PHƯƠNG', meaning: 'Bốn phương tám hướng', level: 'N2', breakdown: '四 (Tứ) + 方 (Phương)', mnemonic: 'Tiếng tăm vang dội khắp bốn phương trời.' }
    ]
  },
  {
    stt: 71,
    strokeCount: 4,
    radical: '无',
    name: 'Vô',
    meaning: 'Không có gì',
    mnemonic: 'Hình người ngửa mặt lên trời thở dài vì không còn sót lại thứ gì.',
    relatedVocab: [
      { kanji: '無', hiragana: 'な.い / む (mu)', sinoVietnamese: 'VÔ', meaning: 'Không có, vô nghĩa', level: 'N4', breakdown: 'Dạng phái sinh biểu thị không có', mnemonic: 'Vạn vật trở về cõi hư vô tĩnh lặng.' },
      { kanji: '無料', hiragana: 'むりょう (muryō)', sinoVietnamese: 'VÔ LIỆU', meaning: 'Miễn phí hoàn toàn', level: 'N4', breakdown: '無 (Vô) + 料 (Liệu)', mnemonic: 'Không thu bất kỳ khoản chi phí phát sinh nào.' },
      { kanji: '無理', hiragana: 'むり (muri)', sinoVietnamese: 'VÔ LÝ', meaning: 'Quá sức, vô lý không thể làm', level: 'N5', breakdown: '無 (Vô) + 理 (Lý)', mnemonic: 'Đừng làm việc quá sức ảnh hưởng đến sức khỏe.' },
      { kanji: '無事', hiragana: 'ぶじ (buji)', sinoVietnamese: 'VÔ SỰ', meaning: 'Bình an vô sự, an lành', level: 'N3', breakdown: '無 (Vô) + 事 (Sự)', mnemonic: 'Mọi người trở về nhà bình an vô sự sau cơn bão.' },
      { kanji: '無視', hiragana: 'むし (mushi)', sinoVietnamese: 'VÔ THỊ', meaning: 'Phớt lờ, coi như không thấy', level: 'N3', breakdown: '無 (Vô) + 視 (Thị)', mnemonic: 'Phớt lờ những lời xầm xì ác ý.' },
      { kanji: '無駄', hiragana: 'むだ (muda)', sinoVietnamese: 'VÔ ĐÀ', meaning: 'Lãng phí, vô ích công cốc', level: 'N3', breakdown: '無 (Vô) + 駄 (Đà)', mnemonic: 'Tránh lãng phí thời gian và tiền bạc quý báu.' },
      { kanji: '無限', hiragana: 'むげん (mugen)', sinoVietnamese: 'VÔ HẠN', meaning: 'Vô hạn, không có điểm dừng', level: 'N2', breakdown: '無 (Vô) + 限 (Hạn)', mnemonic: 'Tiềm năng con người là vô hạn không bờ bến.' },
      { kanji: '無念', hiragana: 'むねん (munen)', sinoVietnamese: 'VÔ NIỆM', meaning: 'Nuối tiếc, cam chịu bất lực', level: 'N1', breakdown: '無 (Vô) + 念 (Niệm)', mnemonic: 'Nỗi tiếc nuối khôn nguôi khi dang dở ước mơ.' },
      { kanji: '无', hiragana: 'ぶ (bu)', sinoVietnamese: 'VÔ', meaning: 'Bộ Vô cổ tự', level: 'N1', breakdown: '无 (Vô)', mnemonic: 'Chữ Vô cổ truyền trong thư pháp đạo giáo.' },
      { kanji: '無口', hiragana: 'むくち (mukuchi)', sinoVietnamese: 'VÔ KHẨU', meaning: 'Ít nói, kiệm lời, lầm lì', level: 'N2', breakdown: '無 (Vô) + 口 (Khẩu)', mnemonic: 'Người trầm tính ít khi cất lời ba hoa.' }
    ]
  },
  {
    stt: 72,
    strokeCount: 4,
    radical: '日',
    name: 'Nhật',
    meaning: 'Mặt trời, ban ngày',
    mnemonic: 'Vòng tròn mặt trời có một vệt sáng ở giữa (thon dài theo chiều dọc).',
    relatedVocab: [
      { kanji: '日', hiragana: 'ひ / にち (nichi)', sinoVietnamese: 'NHẬT', meaning: 'Mặt trời, ngày', level: 'N5', breakdown: 'Vầng thái dương tròn có tâm sáng', mnemonic: 'Mặt trời chiếu sáng mang lại nguồn sống mỗi ngày.' },
      { kanji: '一日', hiragana: 'ついたち / いちにち (tsuitachi)', sinoVietnamese: 'NHẤT NHẬT', meaning: 'Ngày mùng một / một ngày', level: 'N5', breakdown: '一 (Nhất) + 日 (Nhật)', mnemonic: 'Ngày đầu tiên khởi sắc của tháng mới.' },
      { kanji: '日曜日', hiragana: 'にちようび (nichiyōbi)', sinoVietnamese: 'NHẬT DIỆU NHẬT', meaning: 'Chủ nhật', level: 'N5', breakdown: '日 + 曜日', mnemonic: 'Ngày nghỉ cuối tuần chan hòa ánh nắng ấm.' },
      { kanji: '毎日', hiragana: 'まいにち (mainichi)', sinoVietnamese: 'MỖI NHẬT', meaning: 'Mỗi ngày, hàng ngày', level: 'N5', breakdown: '毎 (Mỗi) + 日 (Nhật)', mnemonic: 'Chăm chỉ rèn luyện tiếng Nhật mỗi ngày.' },
      { kanji: '休日', hiragana: 'きゅうじつ (kyūjitsu)', sinoVietnamese: 'HƯU NHẬT', meaning: 'Ngày nghỉ, ngày lễ', level: 'N4', breakdown: '休 (Hưu) + 日 (Nhật)', mnemonic: 'Ngày nghỉ ngơi thảnh thơi sau chuỗi ngày làm việc.' },
      { kanji: '今日', hiragana: 'きょう (kyō)', sinoVietnamese: 'KIM NHẬT', meaning: 'Hôm nay', level: 'N5', breakdown: '今 (Kim) + 日 (Nhật)', mnemonic: 'Trân trọng từng giây phút của ngày hôm nay.' },
      { kanji: '明日', hiragana: 'あした / みょうにち (ashita)', sinoVietnamese: 'MINH NHẬT', meaning: 'Ngày mai tươi sáng', level: 'N5', breakdown: '明 (Minh) + 日 (Nhật)', mnemonic: 'Hướng về ngày mai với niềm tin tràn đầy.' },
      { kanji: '昨日', hiragana: 'きのう (kinō)', sinoVietnamese: 'TÁC NHẬT', meaning: 'Hôm qua', level: 'N5', breakdown: '昨 (Tác có 日) + 日', mnemonic: 'Kỷ niệm đẹp của ngày hôm qua đọng lại.' },
      { kanji: '日本', hiragana: 'にほん / にっぽん (nihon)', sinoVietnamese: 'NHẬT BẢN', meaning: 'Đất nước Nhật Bản', level: 'N5', breakdown: '日 (Nhật) + 本 (Bản)', mnemonic: 'Xứ sở nơi mặt trời mọc rạng ngời phương Đông.' },
      { kanji: '日本語', hiragana: 'にほんご (nihongo)', sinoVietnamese: 'NHẬT BẢN NGỮ', meaning: 'Tiếng Nhật', level: 'N5', breakdown: '日本 + 語 (Ngữ)', mnemonic: 'Ngôn ngữ tinh tế giàu bản sắc văn hóa.' },
      { kanji: '太陽', hiragana: 'たいよう (taiyō)', sinoVietnamese: 'THÁI DƯƠNG', meaning: 'Mặt trời rực rỡ', level: 'N4', breakdown: '太 + 陽 (Dương có 日)', mnemonic: 'Vầng thái dương sưởi ấm vạn vật sinh sôi.' },
      { kanji: '時間', hiragana: 'じかん (jikan)', sinoVietnamese: 'THỜI GIAN', meaning: 'Thời gian, tiếng đồng hồ', level: 'N5', breakdown: '時 (Thời có 日) + 間 (Gian)', mnemonic: 'Thời gian quý báu trôi qua tựa bóng câu qua cửa.' },
      { kanji: '時計', hiragana: 'とけい (tokei)', sinoVietnamese: 'THỜI KẾ', meaning: 'Đồng hồ xem giờ', level: 'N5', breakdown: '時 (Thời) + 計 (Kế)', mnemonic: 'Chiếc đồng hồ tích tắc báo giờ chính xác.' },
      { kanji: '朝', hiragana: 'あさ (asa)', sinoVietnamese: 'TRIÊU', meaning: 'Buổi sáng sớm', level: 'N5', breakdown: 'Thập + Nhật (日) + Nguyệt', mnemonic: 'Mặt trời nhô lên bắt đầu buổi sớm trong lành.' },
      { kanji: '春', hiragana: 'はる (haru)', sinoVietnamese: 'XUÂN', meaning: 'Mùa xuân hoa nở', level: 'N5', breakdown: 'Tam nhân dưới ánh mặt trời 日', mnemonic: 'Mặt trời mùa xuân sưởi ấm hoa anh đào đua nở.' },
      { kanji: '昼', hiragana: 'ひる (hiru)', sinoVietnamese: 'TRÚ', meaning: 'Buổi trưa, ban ngày', level: 'N5', breakdown: 'Xích + Nhật (日)', mnemonic: 'Ánh mặt trời đứng bóng lúc chính ngọ.' },
      { kanji: '暑い', hiragana: 'あつい (atsui)', sinoVietnamese: 'THỬ', meaning: 'Trời nóng bức', level: 'N5', breakdown: 'Nhật (日) + Giả', mnemonic: 'Mặt trời rực lửa tỏa hơi nóng ran mùa hạ.' },
      { kanji: '晴れ', hiragana: 'はれ (hare)', sinoVietnamese: 'TÌNH', meaning: 'Trời nắng đẹp, quang đãng', level: 'N5', breakdown: '日 (Nhật) + 青 (Thanh - xanh)', mnemonic: 'Mặt trời chiếu rọi bầu trời xanh biếc.' },
      { kanji: '昔', hiragana: 'むかし (mukashi)', sinoVietnamese: 'TÍCH', meaning: 'Ngày xưa, cổ tích', level: 'N4', breakdown: 'Cộng + Nhật (日)', mnemonic: 'Những ngày tháng mặt trời của thuở xa xưa.' },
      { kanji: '日常', hiragana: 'にちじょう (nichijō)', sinoVietnamese: 'NHẬT THƯỜNG', meaning: 'Thường ngày, đời sống hàng ngày', level: 'N3', breakdown: '日 (Nhật) + 常 (Thường)', mnemonic: 'Những khoảnh khắc dung dị trong đời sống thường nhật.' }
    ]
  },
  {
    stt: 73,
    strokeCount: 4,
    radical: '曰',
    name: 'Viết',
    meaning: 'Nói rằng, thưa rằng',
    mnemonic: 'Cái miệng (Khẩu 口) mở rộng bè ngang có luồng hơi bay ra khi nói.',
    relatedVocab: [
      { kanji: '子曰く', hiragana: 'しいわく (shiiwaku)', sinoVietnamese: 'TỬ VIẾT', meaning: 'Khổng Tử nói rằng, lời thầy dạy', level: 'N1', breakdown: '子 (Tử) + 曰 (Viết)', mnemonic: 'Lời răn dạy thâm thúy của Khổng Tử muôn đời truyền tụng.' },
      { kanji: '曲', hiragana: 'きょく (kyoku)', sinoVietnamese: 'KHÚC', meaning: 'Bài hát, ca khúc, giai điệu', level: 'N4', breakdown: '曰 (Viết - mở miệng hát) + nét lượn khúc', mnemonic: 'Giai điệu du dương ngân vang cất lên thành lời ca.' },
      { kanji: '作曲', hiragana: 'さっきょく (sakkyoku)', sinoVietnamese: 'TÁC KHÚC', meaning: 'Sáng tác bài hát, soạn nhạc', level: 'N4', breakdown: '作 (Tác) + 曲 (Khúc có 曰)', mnemonic: 'Nhạc sĩ dệt nên những nốt nhạc làm say đắm lòng người.' },
      { kanji: '書', hiragana: 'しょ / かく (sho)', sinoVietnamese: 'THƯ', meaning: 'Sách vở, thư tịch cổ', level: 'N4', breakdown: 'Duật (bút) + 曰 (Viết - lời nói ghi chép)', mnemonic: 'Cầm bút ghi lại từng lời dạy bảo vào trang sách.' },
      { kanji: '読書', hiragana: 'どくしょ (dokusho)', sinoVietnamese: 'ĐỘC THƯ', meaning: 'Đọc sách, nghiền ngẫm sách', level: 'N4', breakdown: '読 (Độc) + 書 (Thư có 曰)', mnemonic: 'Niềm say mê mở từng trang sách làm giàu trí tuệ.' },
      { kanji: '辞書', hiragana: 'じしょ (jisho)', sinoVietnamese: 'TỪ THƯ', meaning: 'Từ điển tra cứu', level: 'N5', breakdown: '辞 (Từ) + 書 (Thư)', mnemonic: 'Cuốn từ điển tra cứu ngữ nghĩa chuẩn xác.' },
      { kanji: '更', hiragana: 'さら / こう (kō)', sinoVietnamese: 'CANH', meaning: 'Hơn nữa, đổi mới, canh giờ', level: 'N2', breakdown: 'Nhất + 曰 (Viết) + Phệt', mnemonic: 'Đổi mới tư duy tiến bộ hơn mỗi ngày.' },
      { kanji: '変更', hiragana: 'へんこう (henkō)', sinoVietnamese: 'BIẾN CANH', meaning: 'Thay đổi lịch trình/kế hoạch', level: 'N3', breakdown: '変 (Biến) + 更 (Canh có 曰)', mnemonic: 'Điều chỉnh kế hoạch cho phù hợp với hoàn cảnh mới.' },
      { kanji: '更新', hiragana: 'こうしん (kōshin)', sinoVietnamese: 'CANH TÂN', meaning: 'Cập nhật, gia hạn visa/thẻ', level: 'N2', breakdown: '更 (Canh) + 新 (Tân)', mnemonic: 'Làm thủ tục gia hạn visa cư trú đúng kỳ hạn.' },
      { kanji: '曹達', hiragana: 'そうだ (sōda)', sinoVietnamese: 'TÀO ĐẠT', meaning: 'Nước ngọt soda có ga sảng khoái', level: 'N1', breakdown: '曹 (Tào có 曰) + 達', mnemonic: 'Thức uống giải khát mát lạnh mùa hè.' }
    ]
  },
  {
    stt: 74,
    strokeCount: 4,
    radical: '月',
    name: 'Nguyệt',
    meaning: 'Mặt trăng, tháng, thịt (nhục)',
    mnemonic: 'Hình vầng trăng khuyết treo lơ lửng trên bầu trời đêm.',
    relatedVocab: [
      { kanji: '月', hiragana: 'つき / げつ (tsuki)', sinoVietnamese: 'NGUYỆT', meaning: 'Mặt trăng, tháng', level: 'N5', breakdown: 'Hình vầng trăng khuyết soi sáng trời đêm', mnemonic: 'Ánh trăng rằm vằng vặc soi tỏ nhân gian.' },
      { kanji: '月曜日', hiragana: 'げつようび (getsuyōbi)', sinoVietnamese: 'NGUYỆT DIỆU NHẬT', meaning: 'Thứ hai', level: 'N5', breakdown: '月 + 曜日', mnemonic: 'Ngày thứ hai khởi đầu tuần mới ngập tràn năng lượng.' },
      { kanji: '毎月', hiragana: 'まいつき / まいげつ (maitsuki)', sinoVietnamese: 'MỖI NGUYỆT', meaning: 'Mỗi tháng, hàng tháng', level: 'N5', breakdown: '毎 (Mỗi) + 月 (Nguyệt)', mnemonic: 'Tiết kiệm một khoản tiền cố định mỗi tháng.' },
      { kanji: '今月', hiragana: 'こんげつ (kongetsu)', sinoVietnamese: 'KIM NGUYỆT', meaning: 'Tháng này', level: 'N5', breakdown: '今 (Kim) + 月 (Nguyệt)', mnemonic: 'Mục tiêu cần hoàn thành trong tháng này.' },
      { kanji: '先月', hiragana: 'せんげつ (sengetsu)', sinoVietnamese: 'TIÊN NGUYỆT', meaning: 'Tháng trước', level: 'N5', breakdown: '先 (Tiên) + 月 (Nguyệt)', mnemonic: 'Báo cáo tổng kết công việc của tháng trước.' },
      { kanji: '来月', hiragana: 'らいげつ (raigetsu)', sinoVietnamese: 'LAI NGUYỆT', meaning: 'Tháng sau, tháng tới', level: 'N5', breakdown: '来 (Lai) + 月 (Nguyệt)', mnemonic: 'Kế hoạch đi công tác xa vào tháng tới.' },
      { kanji: '明るい', hiragana: 'あかるい (akarui)', sinoVietnamese: 'MINH', meaning: 'Sáng sủa, tươi vui, hoạt bát', level: 'N5', breakdown: '日 (Nhật - mặt trời) + 月 (Nguyệt - mặt trăng)', mnemonic: 'Mặt trời hòa cùng mặt trăng tỏa sáng rạng ngời.' },
      { kanji: '服', hiragana: 'ふく (fuku)', sinoVietnamese: 'PHỤC', meaning: 'Quần áo, y phục', level: 'N5', breakdown: '月 (Nhục - cơ thể) + Phục', mnemonic: 'Trang phục chỉnh tề khoác lên cơ thể.' },
      { kanji: '洋服', hiragana: 'ようふく (yōfuku)', sinoVietnamese: 'DƯƠNG PHỤC', meaning: 'Quần áo kiểu Tây', level: 'N5', breakdown: '洋 (Dương) + 服 (Phục có 月)', mnemonic: 'Bộ âu phục lịch lãm tham dự dạ hội.' },
      { kanji: '有名', hiragana: 'ゆうめい (yūmei)', sinoVietnamese: 'HỮU DANH', meaning: 'Nổi tiếng lẫy lừng', level: 'N5', breakdown: '有 (Hữu có 月) + 名 (Danh)', mnemonic: 'Danh tiếng vang xa được muôn người biết đến.' },
      { kanji: '朝', hiragana: 'あさ (asa)', sinoVietnamese: 'TRIÊU', meaning: 'Buổi sáng sớm', level: 'N5', breakdown: 'Thập + Nhật + 月 (Nguyệt)', mnemonic: 'Ánh trăng nhường bước cho bình minh rạng rỡ.' },
      { kanji: '育てる', hiragana: 'そだてる (sodateru)', sinoVietnamese: 'DỤC', meaning: 'Nuôi nấng, dưỡng dục', level: 'N4', breakdown: 'Khí + 月 (Nhục - thể xác)', mnemonic: 'Chăm lo miếng ăn giấc ngủ nuôi dưỡng con khôn lớn.' },
      { kanji: '期間', hiragana: 'きかん (kikan)', sinoVietnamese: 'KỲ GIAN', meaning: 'Thời kỳ, khoảng thời gian', level: 'N3', breakdown: '期 (Kỳ có 月) + 間 (Gian)', mnemonic: 'Một chu kỳ thời gian theo từng tuần trăng.' },
      { kanji: '望む', hiragana: 'のぞむ (nozomu)', sinoVietnamese: 'VỌNG', meaning: 'Trông mong, ngóng đợi', level: 'N3', breakdown: 'Vong + Nguyệt (月) + Vương', mnemonic: 'Đứng ngắm trăng tròn gửi gắm niềm ước vọng tha thiết.' },
      { kanji: '朗らか', hiragana: 'ほがらか (hogaraka)', sinoVietnamese: 'LÃNG', meaning: 'Vui tươi, rạng rỡ cởi mở', level: 'N2', breakdown: 'Lương + 月 (Nguyệt)', mnemonic: 'Nụ cười rạng ngời như ánh trăng thu trong vắt.' },
      { kanji: '期限', hiragana: 'きげん (kigen)', sinoVietnamese: 'KỲ HẠN', meaning: 'Thời hạn chót, deadline', level: 'N3', breakdown: '期 (Kỳ có 月) + 限 (Hạn)', mnemonic: 'Hạn chót nộp báo cáo trước kỳ trăng mới.' }
    ]
  },
  {
    stt: 75,
    strokeCount: 4,
    radical: '木',
    name: 'Mộc',
    meaning: 'Cây cối, gỗ',
    mnemonic: 'Hình cái cây có thân dọc đứng thẳng, cành ngang và rễ bám đất.',
    relatedVocab: [
      { kanji: '木', hiragana: 'き / もく (ki)', sinoVietnamese: 'MỘC', meaning: 'Cây cối, gỗ', level: 'N5', breakdown: 'Thân cây vươn cành và rễ cắm sâu', mnemonic: 'Cây xanh tỏa bóng mát cho muôn loài.' },
      { kanji: '木曜日', hiragana: 'もくようび (mokuyōbi)', sinoVietnamese: 'MỘC DIỆU NHẬT', meaning: 'Thứ năm', level: 'N5', breakdown: '木 + 曜日', mnemonic: 'Ngày thứ năm của sao Mộc bình yên.' },
      { kanji: '本', hiragana: 'ほん (hon)', sinoVietnamese: 'BẢN', meaning: 'Quyển sách, cội nguồn', level: 'N5', breakdown: '木 (Mộc) thêm vạch ở gốc', mnemonic: 'Gốc rễ cây cối là nguồn cội, làm ra trang sách.' },
      { kanji: '日本', hiragana: 'にほん (nihon)', sinoVietnamese: 'NHẬT BẢN', meaning: 'Nhật Bản', level: 'N5', breakdown: '日 (Nhật) + 本 (Bản có 木)', mnemonic: 'Gốc nơi mặt trời tỏa sáng rạng ngời.' },
      { kanji: '机', hiragana: 'つくえ (tsukue)', sinoVietnamese: 'CƠ', meaning: 'Cái bàn làm việc bằng gỗ', level: 'N5', breakdown: '木 (Mộc) + 几 (Kỷ)', mnemonic: 'Bàn học bằng gỗ chắc chắn ngồi học bài.' },
      { kanji: '林', hiragana: 'はやし (hayashi)', sinoVietnamese: 'LÂM', meaning: 'Rừng cây thưa', level: 'N4', breakdown: 'Hai chữ 木 đứng cạnh nhau', mnemonic: 'Hai cây mọc cạnh nhau thành rặng rừng râm mát.' },
      { kanji: '森', hiragana: 'もり (mori)', sinoVietnamese: 'SÂM', meaning: 'Rừng rậm bạt ngàn', level: 'N4', breakdown: 'Ba chữ 木 sum suê', mnemonic: 'Ba cây sum suê tạo thành cánh rừng nguyên sinh.' },
      { kanji: '村', hiragana: 'むら (mura)', sinoVietnamese: 'THÔN', meaning: 'Làng quê, thôn xóm', level: 'N4', breakdown: '木 (Mộc) + 寸 (Thốn)', mnemonic: 'Ngôi làng bình yên rợp bóng cây xanh cổ thụ.' },
      { kanji: '校長', hiragana: 'こうちょう (kōchō)', sinoVietnamese: 'HIỆU TRƯỜNG', meaning: 'Thầy/Cô hiệu trưởng', level: 'N4', breakdown: '校 (Hiệu có 木) + 長', mnemonic: 'Thầy hiệu trưởng đáng kính của ngôi trường làng.' },
      { kanji: '学校', hiragana: 'がっこう (gakkō)', sinoVietnamese: 'HỌC HIỆU', meaning: 'Trường học', level: 'N5', breakdown: '学 (Học) + 校 (Hiệu có 木)', mnemonic: 'Ngôi trường thân yêu nơi rợp mát bóng cây.' },
      { kanji: '松', hiragana: 'まつ (matsu)', sinoVietnamese: 'TÙNG', meaning: 'Cây thông tùng', level: 'N2', breakdown: '木 (Mộc) + Công', mnemonic: 'Cây thông xanh tươi kiên cường bốn mùa bão táp.' },
      { kanji: '枝', hiragana: 'えだ (eda)', sinoVietnamese: 'CHI', meaning: 'Cành cây', level: 'N4', breakdown: '木 (Mộc) + 支 (Chi)', mnemonic: 'Những cành cây vươn dài đan nhau rợp bóng.' },
      { kanji: '根', hiragana: 'ね (ne)', sinoVietnamese: 'CĂN', meaning: 'Rễ cây, gốc rễ', level: 'N3', breakdown: '木 (Mộc) + Cấn', mnemonic: 'Rễ cây bám chặt vào lòng đất mẹ màu mỡ.' },
      { kanji: '植える', hiragana: 'うえる (ueru)', sinoVietnamese: 'THỰC', meaning: 'Trồng cây, gieo mầm', level: 'N4', breakdown: '木 (Mộc) + Trực', mnemonic: 'Trồng ngay ngắn từng cây non phủ xanh đồi trọc.' },
      { kanji: '極める', hiragana: 'きわめる (kiwameru)', sinoVietnamese: 'CỰC', meaning: 'Đạt tới tột đỉnh, đỉnh cao', level: 'N1', breakdown: '木 (Mộc) + Cực', mnemonic: 'Chinh phục đỉnh cao tuyệt đối của học vấn.' },
      { kanji: '構う', hiragana: 'かまう (kamau)', sinoVietnamese: 'CẤU', meaning: 'Bận tâm, chăm sóc chu đáo', level: 'N3', breakdown: '木 (Mộc) + Câu', mnemonic: 'Kết cấu gỗ vững chắc không lo mưa gió.' },
      { kanji: '桜', hiragana: 'さくら (sakura)', sinoVietnamese: 'ANH', meaning: 'Hoa anh đào', level: 'N4', breakdown: '木 (Mộc) + Nữ đội hoa', mnemonic: 'Cây hoa anh đào bung nở rực rỡ sắc xuân.' },
      { kanji: '橋', hiragana: 'はし (hashi)', sinoVietnamese: 'KIỀU', meaning: 'Cây cầu bắc qua sông', level: 'N4', breakdown: '木 (Mộc) + Kiều', mnemonic: 'Cây cầu gỗ cổ kính bắc qua dòng sông thơ mộng.' },
      { kanji: '材料', hiragana: 'ざいりょう (zairyō)', sinoVietnamese: 'TÀI LIỆU', meaning: 'Vật liệu gỗ, nguyên liệu', level: 'N4', breakdown: '材 (Tài có 木) + 料', mnemonic: 'Gỗ tốt chọn làm vật liệu dựng nhà cổ.' },
      { kanji: '枯れる', hiragana: 'かれる (kareru)', sinoVietnamese: 'KHÔ', meaning: 'Cây cối khô héo tàn', level: 'N2', breakdown: '木 (Mộc) + Cổ', mnemonic: 'Lá vàng rụng xuống nhành cây khô đón đông sang.' }
    ]
  },
  {
    stt: 76,
    strokeCount: 4,
    radical: '欠',
    name: 'Khiếm',
    meaning: 'Khiếm khuyết, thiếu thốn',
    mnemonic: 'Hình người đang há miệng ngáp dài vì thiếu dưỡng khí, mệt mỏi.',
    relatedVocab: [
      { kanji: '欠陥', hiragana: 'けっかん (kekkan)', sinoVietnamese: 'KHIẾM HÃM', meaning: 'Khuyết tật, khiếm khuyết sản phẩm', level: 'N1', breakdown: '欠 (Khiếm) + 陥 (Hãm)', mnemonic: 'Lỗi kỹ thuật khiếm khuyết cần thu hồi sửa chữa.' },
      { kanji: '欠席', hiragana: 'けっせき (kesseki)', sinoVietnamese: 'KHIẾM TỊCH', meaning: 'Vắng mặt, nghỉ học', level: 'N4', breakdown: '欠 (Khiếm) + 席 (Tịch)', mnemonic: 'Vắng mặt để trống chỗ ngồi trong lớp học.' },
      { kanji: '欠ける', hiragana: 'かける (kakeru)', sinoVietnamese: 'KHIẾM', meaning: 'Sứt mẻ chén đĩa, thiếu hụt', level: 'N2', breakdown: '欠 (Khiếm) + ける', mnemonic: 'Chiếc bát sứt một mảnh miệng.' },
      { kanji: '次', hiragana: 'つぎ (tsugi)', sinoVietnamese: 'THỨ', meaning: 'Tiếp theo, lần tới', level: 'N5', breakdown: 'Băng + 欠 (Khiếm)', mnemonic: 'Há miệng chờ đến lượt tiếp theo bước vào.' },
      { kanji: '次回', hiragana: 'じかい (jikai)', sinoVietnamese: 'THỨ HỒI', meaning: 'Lần sau, dịp tới', level: 'N3', breakdown: '次 (Thứ) + 回 (Hồi)', mnemonic: 'Hẹn gặp lại quý khách vào lần kế tiếp.' },
      { kanji: '欲しい', hiragana: 'ほしい (hoshii)', sinoVietnamese: 'DỤC', meaning: 'Mong muốn có được', level: 'N5', breakdown: 'Cốc + 欠 (Khiếm)', mnemonic: 'Thiếu thốn nên lòng khao khát muốn có được.' },
      { kanji: '歌', hiragana: 'うた (uta)', sinoVietnamese: 'CA', meaning: 'Bài hát, ca khúc', level: 'N5', breakdown: 'Khả + 欠 (Khiếm - há miệng ngân)', mnemonic: 'Há to miệng cất vang lời ca ngọt ngào.' },
      { kanji: '歌手', hiragana: 'かしゅ (kashu)', sinoVietnamese: 'CA THỦ', meaning: 'Ca sĩ biểu diễn', level: 'N4', breakdown: '歌 (Ca có 欠) + 手 (Thủ)', mnemonic: 'Người ca sĩ cất giọng hát truyền cảm rung động lòng người.' },
      { kanji: '吹く', hiragana: 'ふく (fuku)', sinoVietnamese: 'XÚY', meaning: 'Thổi sáo, gió thổi', level: 'N5', breakdown: 'Khẩu + 欠 (Khiếm)', mnemonic: 'Há miệng lấy hơi thổi tắt ngọn nến lung linh.' },
      { kanji: '歓迎', hiragana: 'かんげい (kangei)', sinoVietnamese: 'HOAN NGHÊNH', meaning: 'Nhiệt liệt chào đón', level: 'N3', breakdown: '歓 (Hoan có 欠) + 迎 (Nghênh)', mnemonic: 'Há miệng cười tươi hân hoan đón khách quý.' }
    ]
  },
  {
    stt: 77,
    strokeCount: 4,
    radical: '止',
    name: 'Chỉ',
    meaning: 'Dừng lại, đứng yên',
    mnemonic: 'Hình bàn chân đặt vững trên mặt đất, đứng yên không bước nữa.',
    relatedVocab: [
      { kanji: '止まる', hiragana: 'とまる (tomaru)', sinoVietnamese: 'CHỈ', meaning: 'Dừng lại, đứng bánh', level: 'N5', breakdown: 'Bàn chân dừng bước trên mặt đất', mnemonic: 'Dừng xe an toàn trước vạch dừng đèn đỏ.' },
      { kanji: '止める', hiragana: 'とめる / やめる (tomeru)', sinoVietnamese: 'CHỈ', meaning: 'Đỗ xe, dừng thói quen xấu', level: 'N5', breakdown: '止 (Chỉ) + める', mnemonic: 'Dứt khoát từ bỏ thói quen hút thuốc lá.' },
      { kanji: '中止', hiragana: 'ちゅうし (chūshi)', sinoVietnamese: 'TRUNG CHỈ', meaning: 'Tạm dừng, hủy bỏ trận đấu', level: 'N4', breakdown: '中 (Trung) + 止 (Chỉ)', mnemonic: 'Hủy trận bóng đá do mưa bão bất ngờ.' },
      { kanji: '歩く', hiragana: 'あるく (aruku)', sinoVietnamese: 'BỘ', meaning: 'Đi bộ, rảo bước', level: 'N5', breakdown: '止 (bàn chân trước) + thiểu (chân sau)', mnemonic: 'Hai bàn chân bước đều rèn luyện sức khỏe.' },
      { kanji: '散歩', hiragana: 'さんぽ (sampo)', sinoVietnamese: 'TẢN BỘ', meaning: 'Đi dạo bộ thư thái', level: 'N5', breakdown: '散 (Tản) + 歩 (Bộ có 止)', mnemonic: 'Thong dong dạo bước trong công viên hoa thơm.' },
      { kanji: '正', hiragana: 'ただ.しい / しょう (shō)', sinoVietnamese: 'CHÍNH', meaning: 'Đúng đắn, chính xác', level: 'N4', breakdown: 'Nhất (mục tiêu) + 止 (bước chân)', mnemonic: 'Bước chân dừng đúng vạch tiêu chuẩn chính trực.' },
      { kanji: '正しい', hiragana: 'ただしい (tadashii)', sinoVietnamese: 'CHÍNH', meaning: 'Chính xác, chân chính', level: 'N5', breakdown: '正 (Chính có 止) + しい', mnemonic: 'Đưa ra câu trả lời hoàn toàn chính xác.' },
      { kanji: 'お正月', hiragana: 'おしょうがつ (oshōgatsu)', sinoVietnamese: 'CHÍNH NGUYỆT', meaning: 'Tết Nguyên Đán truyền thống', level: 'N5', breakdown: 'お + 正 (Chính) + 月', mnemonic: 'Dịp Tết sum họp đón phúc lành đầu năm.' },
      { kanji: '禁止', hiragana: 'きんし (kinshi)', sinoVietnamese: 'CẤM CHỈ', meaning: 'Nghiêm cấm, cấm đoán', level: 'N3', breakdown: '禁 (Cấm) + 止 (Chỉ)', mnemonic: 'Nghiêm cấm hành vi xả rác bừa bãi.' },
      { kanji: '波止場', hiragana: 'はとば (hatoba)', sinoVietnamese: 'BA CHỈ TRƯỜNG', meaning: 'Bến cảng chắn sóng, âu thuyền', level: 'N1', breakdown: '波 (Ba - sóng) + 止 (Chỉ - chặn) + 場', mnemonic: 'Đê chắn sóng bảo vệ tàu thuyền neo đậu an bình.' }
    ]
  },
  {
    stt: 78,
    strokeCount: 4,
    radical: '歹',
    variants: ['歺'],
    name: 'Đãi',
    meaning: 'Xấu xa, chết chóc',
    mnemonic: 'Mảnh xương tàn còn sót lại, gợi sự chết chóc, rủi ro hiểm họa.',
    relatedVocab: [
      { kanji: '死ぬ', hiragana: 'しぬ (shinu)', sinoVietnamese: 'TỬ', meaning: 'Chết, qua đời', level: 'N5', breakdown: '歹 (Đãi - hài cốt) + ヒ (người quỳ viếng)', mnemonic: 'Người quỳ viếng bên đống hài cốt tiễn biệt người đã khuất.' },
      { kanji: '死亡', hiragana: 'しぼう (shibō)', sinoVietnamese: 'TỬ VONG', meaning: 'Tử vong, qua đời', level: 'N2', breakdown: '死 (Tử có 歹) + 亡 (Vong)', mnemonic: 'Ghi nhận số liệu người không may qua đời do dịch bệnh.' },
      { kanji: '必死', hiragana: 'ひっし (hisshi)', sinoVietnamese: 'TẤT TỬ', meaning: 'Liều mạng, hết sức quyết tử', level: 'N3', breakdown: '必 (Tất) + 死 (Tử)', mnemonic: 'Chiến đấu quyết tử bảo vệ từng tấc đất quê hương.' },
      { kanji: '残る', hiragana: 'のこる (nokoru)', sinoVietnamese: 'TÀN', meaning: 'Còn sót lại, sót lại', level: 'N4', breakdown: '歹 (Đãi) + 2 cái giáo', mnemonic: 'Sau trận chiến tàn khốc chỉ còn sót lại chút dấu vết.' },
      { kanji: '残念', hiragana: 'ざんねん (zannen)', sinoVietnamese: 'TÀN NIỆM', meaning: 'Đáng tiếc, tiếc thật đấy', level: 'N5', breakdown: '残 (Tàn có 歹) + 念 (Niệm)', mnemonic: 'Thật đáng tiếc khi phải lỡ hẹn lần này.' },
      { kanji: '列', hiragana: 'れつ (retsu)', sinoVietnamese: 'LIỆT', meaning: 'Hàng lối, đoàn tàu', level: 'N4', breakdown: '歹 (Đãi) + 刂 (Đao)', mnemonic: 'Xếp thành từng hàng ngay ngắn theo phân bổ.' },
      { kanji: '列車', hiragana: 'れっしゃ (ressha)', sinoVietnamese: 'LIỆT XA', meaning: 'Đoàn tàu hỏa', level: 'N4', breakdown: '列 (Liệt có 歹) + 車 (Xa)', mnemonic: 'Đoàn tàu hỏa dài nối đuôi nhau vun vút trên đường ray.' },
      { kanji: '殊に', hiragana: 'ことに (kotoni)', sinoVietnamese: 'THÙ', meaning: 'Đặc biệt là, nhất là', level: 'N1', breakdown: '歹 (Đãi) + Chu', mnemonic: 'Món quà đặc biệt dành riêng cho người tri kỷ.' },
      { kanji: '特殊', hiragana: 'とくしゅ (tokushu)', sinoVietnamese: 'ĐẶC THÙ', meaning: 'Đặc thù, tính chất riêng biệt', level: 'N2', breakdown: '特 (Đặc) + 殊 (Thù có 歹)', mnemonic: 'Nhiệm vụ mang tính chất đặc thù đòi hỏi bảo mật cao.' },
      { kanji: '殖やす', hiragana: 'ふやす (fuyasu)', sinoVietnamese: 'THỰC', meaning: 'Làm sinh sôi, sinh lợi tiền bạc', level: 'N1', breakdown: '歹 (Đãi) + Trực', mnemonic: 'Tận dụng xương tàn tro bụi làm phân bón sinh sôi hoa màu.' }
    ]
  },
  {
    stt: 79,
    strokeCount: 4,
    radical: '殳',
    name: 'Thù',
    meaning: 'Binh khí dài',
    mnemonic: 'Tay (又) cầm gậy búa (几) vung lên chiến đấu xua đuổi kẻ địch.',
    relatedVocab: [
      { kanji: '投げる', hiragana: 'なげる (nageru)', sinoVietnamese: 'ĐẦU', meaning: 'Ném bóng, phóng đi', level: 'N4', breakdown: 'Thủ + 殳 (Thù - vung vũ khí cán dài)', mnemonic: 'Vung gậy ném quả bóng đi thật xa.' },
      { kanji: '投資', hiragana: 'とうし (tōshi)', sinoVietnamese: 'ĐẦU TƯ', meaning: 'Đầu tư tài chính', level: 'N2', breakdown: '投 (Đầu có 殳) + 資 (Tư)', mnemonic: 'Đầu tư nguồn vốn vào dự án công nghệ xanh.' },
      { kanji: '段', hiragana: 'だん (dan)', sinoVietnamese: 'ĐOẠN', meaning: 'Bậc thang, giai đoạn', level: 'N4', breakdown: 'Thủy + 殳 (Thù)', mnemonic: 'Từng bậc đá đẽo bằng rìu xếp thành cầu thang.' },
      { kanji: '階段', hiragana: 'かいだん (kaidan)', sinoVietnamese: 'GIAI ĐOẠN', meaning: 'Cầu thang bộ', level: 'N5', breakdown: '階 (Giai) + 段 (Đoạn có 殳)', mnemonic: 'Từng bước leo lên các bậc cầu thang bộ.' },
      { kanji: '値段', hiragana: 'ねだん (nedan)', sinoVietnamese: 'TRỊ ĐOẠN', meaning: 'Giá cả hàng hóa', level: 'N5', breakdown: '値 (Trị) + 段 (Đoạn)', mnemonic: 'Giá tiền niêm yết rõ ràng trên kệ hàng.' },
      { kanji: '殺す', hiragana: 'ころす (korosu)', sinoVietnamese: 'SÁT', meaning: 'Giết, tiêu diệt', level: 'N3', breakdown: 'Sam + 殳 (Thù - vung vũ khí)', mnemonic: 'Vung binh khí tiêu diệt kẻ thù bạo ngược.' },
      { kanji: '自殺', hiragana: 'じさつ (jisatsu)', sinoVietnamese: 'TỰ SÁT', meaning: 'Tự sát, tự kết liễu', level: 'N2', breakdown: '自 (Tự) + 殺 (Sát có 殳)', mnemonic: 'Tự hủy hoại sinh mệnh quý báu của chính mình.' },
      { kanji: '殻', hiragana: 'から (kara)', sinoVietnamese: 'XÁC', meaning: 'Vỏ trứng, mai rùa', level: 'N1', breakdown: 'Sĩ + Mịch + 殳 (Thù)', mnemonic: 'Gõ nhẹ chiếc gậy làm nứt lớp vỏ trứng gà.' },
      { kanji: '役者', hiragana: 'やくしゃ (yakusha)', sinoVietnamese: 'DỊCH GIẢ', meaning: 'Diễn viên sân khấu', level: 'N3', breakdown: '役 (Dịch có 殳) + 者 (Giả)', mnemonic: 'Người diễn viên nhập vai xuất thần trên sân khấu kịch.' },
      { kanji: '疫病', hiragana: 'えきびょう (ekibyō)', sinoVietnamese: 'DỊCH BỆNH', meaning: 'Dịch bệnh truyền nhiễm', level: 'N1', breakdown: '疫 (Dịch có 殳) + 病 (Bệnh)', mnemonic: 'Dịch bệnh hoành hành gõ đòn cảnh tỉnh nhân loại.' }
    ]
  },
  {
    stt: 80,
    strokeCount: 4,
    radical: '毋',
    variants: ['母'],
    name: 'Vô / Mẫu',
    meaning: 'Chớ đừng / Người mẹ',
    mnemonic: 'Chữ Nữ (女) bị một nét gạch ngang khóa lại: cấm đoán đừng làm.',
    relatedVocab: [
      { kanji: '母', hiragana: 'はは (haha)', sinoVietnamese: 'MẪU', meaning: 'Mẹ mình', level: 'N5', breakdown: 'Người mẹ bế con cho bú có hai giọt sữa', mnemonic: 'Mẹ hiền tần tảo sớm hôm nuôi nấng đàn con.' },
      { kanji: 'お母さん', hiragana: 'おかあさん (okāsan)', sinoVietnamese: 'MẪU', meaning: 'Mẹ, mẹ của bạn', level: 'N5', breakdown: 'お + 母 (Mẫu) + さん', mnemonic: 'Tiếng gọi Mẹ ơi thiêng liêng nhất trần đời.' },
      { kanji: '母国', hiragana: 'ぼこく (bokoku)', sinoVietnamese: 'MẪU QUỐC', meaning: 'Đất mẹ, quê hương tổ quốc', level: 'N3', breakdown: '母 (Mẫu) + 国 (Quốc)', mnemonic: 'Quê hương đất mẹ muôn đời chở che.' },
      { kanji: '毎', hiragana: 'まい (mai)', sinoVietnamese: 'MỖI', meaning: 'Mỗi, từng, hàng...', level: 'N5', breakdown: 'Nhân + 母 (Mẫu)', mnemonic: 'Mỗi người mẹ đều tận tụy vì con cái.' },
      { kanji: '毎日', hiragana: 'まいにち (mainichi)', sinoVietnamese: 'MỖI NHẬT', meaning: 'Hàng ngày, mỗi ngày', level: 'N5', breakdown: '毎 (Mỗi có 母) + 日 (Nhật)', mnemonic: 'Chăm chỉ ôn tập bài vở đều đặn mỗi ngày.' },
      { kanji: '毎週', hiragana: 'まいしゅう (maishū)', sinoVietnamese: 'MỖI CHU', meaning: 'Hàng tuần', level: 'N5', breakdown: '毎 (Mỗi) + 週 (Chu)', mnemonic: 'Tham gia lớp học đàn guitar vào cuối mỗi tuần.' },
      { kanji: '毒', hiragana: 'どく (doku)', sinoVietnamese: 'ĐỘC', meaning: 'Chất độc, độc hại', level: 'N3', breakdown: 'Chủ + 毋 (Vô - ngăn cấm)', mnemonic: 'Cỏ độc chết người cấm tiệt không được đụng vào.' },
      { kanji: '消毒', hiragana: 'しょうどく (shōdoku)', sinoVietnamese: 'TIÊU ĐỘC', meaning: 'Khử trùng, sát khuẩn y tế', level: 'N3', breakdown: '消 (Tiêu) + 毒 (Độc có 毋)', mnemonic: 'Rửa tay sát khuẩn phòng ngừa vi khuẩn gây hại.' },
      { kanji: '中毒', hiragana: 'ちゅうどく (chūdoku)', sinoVietnamese: 'TRUNG ĐỘC', meaning: 'Ngộ độc thực phẩm, nghiện game', level: 'N2', breakdown: '中 (Trung) + 毒 (Độc)', mnemonic: 'Cơn ngộ độc thức ăn cần được cấp cứu kịp thời.' },
      { kanji: '毋', hiragana: 'なかれ (nakare)', sinoVietnamese: 'VÔ', meaning: 'Chớ, đừng làm điều ác', level: 'N1', breakdown: '毋 (Vô - răn cấm)', mnemonic: 'Lời răn dạy chớ làm điều trái với lương tâm.' }
    ]
  },
  {
    stt: 81,
    strokeCount: 4,
    radical: '比',
    name: 'Tỷ',
    meaning: 'So sánh, đọ sức',
    mnemonic: 'Hình hai người đứng sát cạnh nhau để so đọ chiều cao, tầm vóc.',
    relatedVocab: [
      { kanji: '比べる', hiragana: 'くらべる (kuraberu)', sinoVietnamese: 'TỶ', meaning: 'So sánh, đối chiếu', level: 'N4', breakdown: 'Hai chữ 匕 đứng kề nhau', mnemonic: 'Đặt hai chiếc thìa kề nhau để so sánh độ dài.' },
      { kanji: '比例', hiragana: 'ひれい (hirei)', sinoVietnamese: 'TỶ LỆ', meaning: 'Tỉ lệ thuận/nghịch', level: 'N2', breakdown: '比 (Tỷ) + 例 (Lệ)', mnemonic: 'Tỉ lệ tăng trưởng tương ứng theo cấp số.' },
      { kanji: '比較', hiragana: 'ひかく (hikaku)', sinoVietnamese: 'TỶ KHẢO', meaning: 'So sánh, đối chiếu dữ liệu', level: 'N3', breakdown: '比 (Tỷ) + 較 (Khảo)', mnemonic: 'Đặt hai phương án lên bàn cân so sánh thiệt hơn.' },
      { kanji: '比率', hiragana: 'ひりつ (hiritsu)', sinoVietnamese: 'TỶ SUẤT', meaning: 'Tỉ suất phần trăm', level: 'N2', breakdown: '比 (Tỷ) + 率 (Suất)', mnemonic: 'Tỉ lệ phần trăm đỗ kỳ thi JLPT năm nay.' },
      { kanji: '対比', hiragana: 'たいひ (taihi)', sinoVietnamese: 'ĐỐI TỶ', meaning: 'Đối chiếu, tương phản', level: 'N1', breakdown: '対 (Đối) + 比 (Tỷ)', mnemonic: 'Sự đối lập tương phản rõ rệt giữa hai gam màu.' },
      { kanji: '恵比寿', hiragana: 'えびす (ebisu)', sinoVietnamese: 'HUỆ TỶ THỌ', meaning: 'Thần Tài Ebisu, ga Ebisu Tokyo', level: 'N2', breakdown: '恵 + 比 (Tỷ) + 寿', mnemonic: 'Vị thần may mắn tay cầm cần câu cá biển.' },
      { kanji: '皆', hiragana: 'みんな / みな (minna)', sinoVietnamese: 'GIAI', meaning: 'Mọi người, tất cả', level: 'N5', breakdown: 'Tỷ (so sánh) + Bạch (trắng)', mnemonic: 'Tất cả mọi người cùng chung một tấm lòng trong sáng.' },
      { kanji: '皆既日食', hiragana: 'かいきにっしょく (kaiki nisshoku)', sinoVietnamese: 'GIAI KÝ NHẬT THỰC', meaning: 'Hiện tượng nhật thực toàn phần', level: 'N1', breakdown: '皆 (Giai) + 既 + 日食', mnemonic: 'Mặt trăng che khuất toàn bộ vầng mặt trời.' },
      { kanji: '匹敵', hiragana: 'ひってき (hitteki)', sinoVietnamese: 'THẤT ĐỊCH', meaning: 'Ngang tài ngang sức, sánh kịp', level: 'N1', breakdown: '匹 (có dạng 比) + 敵', mnemonic: 'Hai đối thủ so tài ngang ngửa bất phân thắng bại.' },
      { kanji: '比重', hiragana: 'ひじゅう (hijū)', sinoVietnamese: 'TỶ TRỌNG', meaning: 'Tỉ trọng, tầm quan trọng', level: 'N2', breakdown: '比 (Tỷ) + 重 (Trọng)', mnemonic: 'Tỉ trọng ngành công nghệ thông tin trong nền kinh tế.' }
    ]
  },
  {
    stt: 82,
    strokeCount: 4,
    radical: '毛',
    name: 'Mao',
    meaning: 'Lông mao, tóc tơ',
    mnemonic: 'Hình sợi lông vũ mềm mại có nhiều nhánh nhỏ rủ bay.',
    relatedVocab: [
      { kanji: '毛', hiragana: 'け (ke)', sinoVietnamese: 'MAO', meaning: 'Lông, sợi tóc, lông thú', level: 'N4', breakdown: 'Hình sợi lông tơ phất phơ', mnemonic: 'Những sợi lông tơ mềm mại giữ ấm cơ thể.' },
      { kanji: '毛布', hiragana: 'もうふ (mōfu)', sinoVietnamese: 'MAO BỐ', meaning: 'Chăn len ấm áp', level: 'N4', breakdown: '毛 (Mao) + 布 (Bố - vải)', mnemonic: 'Tấm chăn len dày dặn sưởi ấm mùa đông lạnh giá.' },
      { kanji: '髪の毛', hiragana: 'かみのけ (kaminoke)', sinoVietnamese: 'PHÁT MAO', meaning: 'Sợi tóc, mái tóc', level: 'N4', breakdown: '髪 (Phát) + の + 毛 (Mao)', mnemonic: 'Mái tóc đen nhánh mượt mà bay trong gió.' },
      { kanji: '羊毛', hiragana: 'ようもう (yōmō)', sinoVietnamese: 'DƯƠNG MAO', meaning: 'Lông cừu nguyên chất', level: 'N2', breakdown: '羊 (Dương - cừu) + 毛 (Mao)', mnemonic: 'Lông cừu dệt nên những chiếc áo ấm tuyệt hảo.' },
      { kanji: '毛糸', hiragana: 'けいと (keito)', sinoVietnamese: 'MAO MỊCH', meaning: 'Len đan áo', level: 'N3', breakdown: '毛 (Mao) + 糸 (Mịch - sợi)', mnemonic: 'Cuộn len sắc màu thoăn thoắt đan khăn tặng mẹ.' },
      { kanji: '毛皮', hiragana: 'けがわ (kegawa)', sinoVietnamese: 'MAO BÌ', meaning: 'Bộ da lông thú', level: 'N2', breakdown: '毛 (Mao) + 皮 (Bì - da)', mnemonic: 'Tấm áo khoác da lông ấm áp của cư dân vùng tuyết.' },
      { kanji: '睫毛', hiragana: 'まつげ (matsuge)', sinoVietnamese: 'TIỆP MAO', meaning: 'Lông mi cong vút', level: 'N1', breakdown: 'Tiệp + 毛 (Mao)', mnemonic: 'Đôi hàng mi cong chớp nhẹ che chở mắt ngọc.' },
      { kanji: '眉毛', hiragana: 'まゆげ (mayuge)', sinoVietnamese: 'MI MAO', meaning: 'Lông mày lá liễu', level: 'N2', breakdown: '眉 (Mi) + 毛 (Mao)', mnemonic: 'Đôi lông mày thanh tú toát lên vẻ thông tuệ.' },
      { kanji: '鳥の毛', hiragana: 'とりのけ (torinoke)', sinoVietnamese: 'ĐIỂU MAO', meaning: 'Lông chim tơ mịn', level: 'N4', breakdown: '鳥 (Điểu) + 毛 (Mao)', mnemonic: 'Những chiếc lông vũ nhẹ tựa làn sương sớm.' },
      { kanji: '刷毛', hiragana: 'はけ (hake)', sinoVietnamese: 'LOÁT MAO', meaning: 'Cây chổi quét sơn, cọ vẽ', level: 'N1', breakdown: '刷 (Loát) + 毛 (Mao)', mnemonic: 'Cây cọ lông mềm quét đều lớp vecni bóng loáng.' }
    ]
  },
  {
    stt: 83,
    strokeCount: 4,
    radical: '氏',
    name: 'Thị',
    meaning: 'Họ tộc, nguồn gốc dòng dõi',
    mnemonic: 'Rễ cây bám sâu vào lòng đất như cội nguồn dòng họ sinh sôi.',
    relatedVocab: [
      { kanji: '氏名', hiragana: 'しめい (shimei)', sinoVietnamese: 'THỊ DANH', meaning: 'Họ và tên đầy đủ', level: 'N4', breakdown: '氏 (Thị) + 名 (Danh)', mnemonic: 'Điền đầy đủ họ và tên vào tờ khai xin việc.' },
      { kanji: '摂津氏', hiragana: 'せっつし (settsushi)', sinoVietnamese: 'NHIẾP TÂN THỊ', meaning: 'Gia tộc họ Settsu quý tộc xưa', level: 'N1', breakdown: '摂津 + 氏 (Thị)', mnemonic: 'Dòng tộc quyền quý thời kỳ Mạc phủ.' },
      { kanji: '民', hiragana: 'たみ / みん (min)', sinoVietnamese: 'DÂN', meaning: 'Người dân, bách tính', level: 'N4', breakdown: 'Hình con mắt bị chọc mù làm nô lệ, biến thể 氏', mnemonic: 'Toàn thể người dân chung tay xây dựng đất nước.' },
      { kanji: '国民', hiragana: 'こくみん (kokumin)', sinoVietnamese: 'QUỐC DÂN', meaning: 'Công dân quốc gia', level: 'N4', breakdown: '国 (Quốc) + 民 (Dân có 氏)', mnemonic: 'Mỗi công dân đều có nghĩa vụ bảo vệ tổ quốc.' },
      { kanji: '市民', hiragana: 'しみん (shimin)', sinoVietnamese: 'THỊ DÂN', meaning: 'Cư dân thành phố', level: 'N4', breakdown: '市 (Thị) + 民 (Dân)', mnemonic: 'Người dân đô thị cùng giữ gìn môi trường xanh.' },
      { kanji: '民主主義', hiragana: 'みんしゅしゅぎ (minshushugi)', sinoVietnamese: 'DÂN CHỦ CHỦ NGHĨA', meaning: 'Chủ nghĩa dân chủ', level: 'N2', breakdown: '民 + 主 + 主義', mnemonic: 'Chế độ dân chủ quyền lực thuộc về nhân dân.' },
      { kanji: '氏', hiragana: 'し (shi)', sinoVietnamese: 'THỊ', meaning: 'Ông, bà (hậu tố xưng hô trang trọng)', level: 'N3', breakdown: '氏 (Thị)', mnemonic: 'Lời xưng hô kính cẩn dành cho quý ông Tanaka.' },
      { kanji: '紙', hiragana: 'かみ (kami)', sinoVietnamese: 'CHỈ', meaning: 'Tờ giấy', level: 'N5', breakdown: 'Mịch (tơ) + 氏 (Thị)', mnemonic: 'Tờ giấy trắng mịn làm từ sợi thực vật ép phẳng.' },
      { kanji: '手紙', hiragana: 'てがみ (tegami)', sinoVietnamese: 'THỦ CHỈ', meaning: 'Bức thư tay chan chứa ân tình', level: 'N5', breakdown: '手 (Thủ) + 紙 (Chỉ có 氏)', mnemonic: 'Gửi gắm nỗi nhớ nhung vào từng trang thư tay.' },
      { kanji: '婚氏', hiragana: 'こんし (konshi)', sinoVietnamese: 'HÔN THỊ', meaning: 'Họ sau khi kết hôn theo luật Nhật', level: 'N1', breakdown: '婚 (Hôn) + 氏 (Thị)', mnemonic: 'Quy định đổi họ theo vợ hoặc chồng sau khi cưới.' }
    ]
  },
  {
    stt: 84,
    strokeCount: 4,
    radical: '气',
    name: 'Khí',
    meaning: 'Hơi nước, luồng không khí',
    mnemonic: 'Những làn mây, hơi nước bốc lên tầng tầng lớp lớp từ đất trời.',
    relatedVocab: [
      { kanji: '気', hiragana: 'き / け (ki)', sinoVietnamese: 'KHÍ', meaning: 'Không khí, tinh thần, tâm trạng', level: 'N5', breakdown: '气 (luồng khí) bao quanh Mễ', mnemonic: 'Hơi thở sinh khí nuôi dưỡng tinh thần con người.' },
      { kanji: '元気', hiragana: 'げんき (genki)', sinoVietnamese: 'NGUYÊN KHÍ', meaning: 'Khỏe mạnh, tràn đầy sinh lực', level: 'N5', breakdown: '元 (Nguyên) + 気 (Khí)', mnemonic: 'Luôn giữ tinh thần lạc quan khỏe khoắn mỗi sớm mai.' },
      { kanji: '天気', hiragana: 'てんき (tenki)', sinoVietnamese: 'THIÊN KHÍ', meaning: 'Thời tiết bầu trời', level: 'N5', breakdown: '天 (Thiên) + 気 (Khí)', mnemonic: 'Trời xanh mây trắng thời tiết thật trong lành.' },
      { kanji: '気持ち', hiragana: 'きもち (kimochi)', sinoVietnamese: 'KHÍ TRÌ', meaning: 'Tâm trạng, cảm giác sảng khoái', level: 'N4', breakdown: '気 (Khí) + 持 (Trì)', mnemonic: 'Cảm giác dễ chịu khi đắm mình trong làn nước ấm.' },
      { kanji: '気をつける', hiragana: 'きをつける (ki o tsukeru)', sinoVietnamese: 'KHÍ', meaning: 'Cẩn thận, chú ý an toàn', level: 'N5', breakdown: '気 (Khí) + 付ける', mnemonic: 'Tập trung tinh thần chú ý an toàn giao thông.' },
      { kanji: '空気', hiragana: 'くうき (kūki)', sinoVietnamese: 'KHÔNG KHÍ', meaning: 'Không khí hít thở', level: 'N4', breakdown: '空 (Không) + 気 (Khí)', mnemonic: 'Hít thở bầu không khí mát lành của rừng thông.' },
      { kanji: '人気', hiragana: 'にんき (ninki)', sinoVietnamese: 'NHÂN KHÍ', meaning: 'Được yêu thích, mến mộ', level: 'N4', breakdown: '人 (Nhân) + 気 (Khí)', mnemonic: 'Món ăn được thực khách vô cùng ưa chuộng.' },
      { kanji: '気分', hiragana: 'きぶん (kibun)', sinoVietnamese: 'KHÍ PHÂN', meaning: 'Tâm trạng, trạng thái sức khỏe', level: 'N4', breakdown: '気 (Khí) + 分 (Phân)', mnemonic: 'Tâm trạng phấn chấn sẵn sàng cho thử thách mới.' },
      { kanji: '気候', hiragana: 'きこう (kikō)', sinoVietnamese: 'KHÍ HẬU', meaning: 'Khí hậu vùng miền', level: 'N3', breakdown: '気 (Khí) + 候 (Hậu)', mnemonic: 'Khí hậu ôn hòa bốn mùa tươi đẹp.' },
      { kanji: '雰囲気', hiragana: 'ふんいき (fun\'iki)', sinoVietnamese: 'PHÂN VI KHÍ', meaning: 'Bầu không khí, cảm quan môi trường', level: 'N3', breakdown: '雰 + 囲 + 気 (Khí)', mnemonic: 'Bầu không khí trang nhã ấm cúng trong quán trà.' }
    ]
  },
  {
    stt: 85,
    strokeCount: 4,
    radical: '水',
    variants: ['氵', '氺'],
    name: 'Thủy',
    meaning: 'Nước, dòng chảy',
    mnemonic: 'Dòng nước chảy ở giữa và những giọt nước bắn tung tóe hai bên bờ.',
    relatedVocab: [
      { kanji: '水', hiragana: 'みず / すい (mizu)', sinoVietnamese: 'THỦY', meaning: 'Nước trong lành', level: 'N5', breakdown: 'Dòng nước chảy chính giữa bắn bọt hai bên', mnemonic: 'Nguồn nước trong mát duy trì sự sống cho muôn loài.' },
      { kanji: '水曜日', hiragana: 'すいようび (suiyōbi)', sinoVietnamese: 'THỦY DIỆU NHẬT', meaning: 'Thứ tư', level: 'N5', breakdown: '水 + 曜日', mnemonic: 'Ngày thứ tư của sao Thủy dịu êm.' },
      { kanji: '海', hiragana: 'うみ / かい (umi)', sinoVietnamese: 'HẢI', meaning: 'Biển cả mênh mông', level: 'N5', breakdown: '氵 (Thủy) + Mỗi', mnemonic: 'Mỗi giọt nước đều tìm đường xuôi về biển lớn.' },
      { kanji: '池', hiragana: 'いけ (ike)', sinoVietnamese: 'TRÌ', meaning: 'Ao nước, hồ cảnh', level: 'N4', breakdown: '氵 (Thủy) + Dã', mnemonic: 'Ao nước trong veo đàn cá koi tung tăng bơi lội.' },
      { kanji: '洗う', hiragana: 'あらう (arau)', sinoVietnamese: 'TẨY', meaning: 'Rửa tay, giặt giũ đồ', level: 'N5', breakdown: '氵 (Thủy) + Tiên', mnemonic: 'Rửa tay sạch sẽ bằng xà phòng trước bữa ăn.' },
      { kanji: '泳ぐ', hiragana: 'およぐ (oyogu)', sinoVietnamese: 'VỊNH', meaning: 'Bơi lội tung tăng', level: 'N5', breakdown: '氵 (Thủy) + Vĩnh', mnemonic: 'Đắm mình bơi lội thỏa thích dưới làn nước mát.' },
      { kanji: '湖', hiragana: 'みずうみ / こ (mizuumi)', sinoVietnamese: 'HỒ', meaning: 'Hồ nước ngọt tĩnh lặng', level: 'N3', breakdown: '氵 (Thủy) + Cổ + Nguyệt', mnemonic: 'Mặt hồ êm đềm in bóng vầng trăng nghìn năm.' },
      { kanji: '汗', hiragana: 'あせ (ase)', sinoVietnamese: 'HÃN', meaning: 'Mồ hôi chảy ròng ròng', level: 'N3', breakdown: '氵 (Thủy) + Can', mnemonic: 'Mồ hôi ướt đẫm lưng áo sau buổi tập hăng say.' },
      { kanji: '涙', hiragana: 'なみだ (namida)', sinoVietnamese: 'LỆ', meaning: 'Giọt nước mắt xúc động', level: 'N3', breakdown: '氵 (Thủy) + Lệ', mnemonic: 'Giọt nước mắt nghẹn ngào vì quá đỗi hạnh phúc.' },
      { kanji: '港', hiragana: 'みなと / こう (minato)', sinoVietnamese: 'CẢNG', meaning: 'Bến cảng tàu thuyền neo đậu', level: 'N4', breakdown: '氵 (Thủy) + Hạng', mnemonic: 'Bến cảng sầm uất tàu thuyền ra vào tấp nập.' },
      { kanji: '空港', hiragana: 'くうこう (kūkō)', sinoVietnamese: 'KHÔNG CẢNG', meaning: 'Sân bay quốc tế', level: 'N4', breakdown: '空 (Không) + 港 (Cảng có 氵)', mnemonic: 'Cảng hàng không hiện đại tấp nập du khách.' },
      { kanji: 'お湯', hiragana: 'おゆ (oyu)', sinoVietnamese: 'THANG', meaning: 'Nước sôi, nước nóng ngâm bồn', level: 'N5', breakdown: 'お + 湯 (Thang có 氵)', mnemonic: 'Nước nóng onsen thư giãn sau ngày dài mệt mỏi.' },
      { kanji: '決める', hiragana: 'きめる (kimeru)', sinoVietnamese: 'QUYẾT', meaning: 'Quyết định dứt khoát', level: 'N4', breakdown: '氵 (Thủy) + Quyết', mnemonic: 'Dòng nước chảy xiết đưa ra quyết định không do dự.' },
      { kanji: '泣く', hiragana: 'なく (naku)', sinoVietnamese: 'KHỐC', meaning: 'Khóc than, rơi lệ', level: 'N4', breakdown: '氵 (Thủy) + Lập', mnemonic: 'Đứng khóc rấm rứt nước mắt rơi lã chã.' },
      { kanji: '注ぐ', hiragana: 'そそぐ / つぐ (sosogu)', sinoVietnamese: 'CHÚ', meaning: 'Rót trà, trút nước, dồn tâm huyết', level: 'N3', breakdown: '氵 (Thủy) + Chủ', mnemonic: 'Cẩn thận rót nước trà thơm đãi khách quý.' },
      { kanji: '油', hiragana: 'あぶら / ゆ (abura)', sinoVietnamese: 'DU', meaning: 'Dầu ăn, xăng dầu', level: 'N4', breakdown: '氵 (Thủy) + Do', mnemonic: 'Những giọt dầu thực vật vàng óng ánh trên chảo.' },
      { kanji: '治る', hiragana: 'なおる (naoru)', sinoVietnamese: 'TRỊ', meaning: 'Khỏi bệnh hoàn toàn', level: 'N4', breakdown: '氵 (Thủy) + Đài', mnemonic: 'Uống nhiều nước ấm giúp cơn sốt nhanh chóng lành hẳn.' },
      { kanji: '浅い', hiragana: 'あさい (asai)', sinoVietnamese: 'THIỂN', meaning: 'Nông cạn, mặt nước nông', level: 'N3', breakdown: '氵 (Thủy) + Tiễn', mnemonic: 'Dòng suối nước nông nhìn thấy rõ từng hòn sỏi.' },
      { kanji: '深い', hiragana: 'ふかい (fukai)', sinoVietnamese: 'THÂM', meaning: 'Sâu thẳm, sâu sắc', level: 'N4', breakdown: '氵 (Thủy) + Thâm', mnemonic: 'Vực nước sâu thẳm ẩn chứa bao điều kỳ bí.' },
      { kanji: '清い', hiragana: 'きよい (kiyoi)', sinoVietnamese: 'THANH', meaning: 'Trong trẻo, thanh khiết', level: 'N2', breakdown: '氵 (Thủy) + Thanh', mnemonic: 'Dòng suối thanh khiết ngọt lành tuôn chảy từ khe núi.' },
      { kanji: '渡る', hiragana: 'わたる (wataru)', sinoVietnamese: 'ĐỘ', meaning: 'Băng qua cầu, qua đường', level: 'N5', breakdown: '氵 (Thủy) + Độ', mnemonic: 'Băng qua cây cầu bắc ngang dòng sông thơ mộng.' },
      { kanji: '消す', hiragana: 'けす (kesu)', sinoVietnamese: 'TIÊU', meaning: 'Tắt đèn, dập tắt lửa', level: 'N5', breakdown: '氵 (Thủy) + Tiêu', mnemonic: 'Dùng nước dập tắt hoàn toàn tàn lửa.' }
    ]
  },
  {
    stt: 86,
    strokeCount: 4,
    radical: '火',
    variants: ['灬'],
    name: 'Hỏa',
    meaning: 'Ngọn lửa, sức nóng',
    mnemonic: 'Ngọn lửa đang bùng cháy với các tia lửa bắn ra xung quanh.',
    relatedVocab: [
      { kanji: '火', hiragana: 'ひ / か (ka)', sinoVietnamese: 'HỎA', meaning: 'Ngọn lửa, ánh lửa', level: 'N5', breakdown: 'Ngọn lửa bốc cháy từ đống củi khô', mnemonic: 'Lửa ấm xua tan giá lạnh đêm đông.' },
      { kanji: '火曜日', hiragana: 'かようび (kayōbi)', sinoVietnamese: 'HỎA DIỆU NHẬT', meaning: 'Thứ ba', level: 'N5', breakdown: '火 + 曜日', mnemonic: 'Ngày thứ ba của sao Hỏa nhiệt huyết.' },
      { kanji: '花火', hiragana: 'はなび (hanabi)', sinoVietnamese: 'HOA HỎA', meaning: 'Pháo hoa rực rỡ', level: 'N5', breakdown: '花 (Hoa) + 火 (Hỏa)', mnemonic: 'Những bông hoa lửa rực sáng trên bầu trời đêm mùa hạ.' },
      { kanji: '火事', hiragana: 'かじ (kaji)', sinoVietnamese: 'HỎA SỰ', meaning: 'Hỏa hoạn, vụ cháy', level: 'N4', breakdown: '火 (Hỏa) + 事 (Sự)', mnemonic: 'Cần cẩn thận đề phòng hỏa hoạn khi dùng bếp ga.' },
      { kanji: '火山', hiragana: 'かざん (kazan)', sinoVietnamese: 'HỎA SƠN', meaning: 'Núi lửa phun trào', level: 'N4', breakdown: '火 (Hỏa) + 山 (Sơn)', mnemonic: 'Ngọn núi lửa phun trào nham thạch đỏ rực.' },
      { kanji: '消火器', hiragana: 'しょうかき (shōkaki)', sinoVietnamese: 'TIÊU HỎA KHÍ', meaning: 'Bình chữa cháy cứu hỏa', level: 'N3', breakdown: '消 (Tiêu) + 火 (Hỏa) + 器', mnemonic: 'Bình cứu hỏa mini trang bị tại mỗi góc hành lang.' },
      { kanji: '点', hiragana: 'てん (ten)', sinoVietnamese: 'ĐIỂM', meaning: 'Điểm số, dấu chấm', level: 'N4', breakdown: 'Chiêm + 灬 (Hỏa)', mnemonic: 'Chấm từng điểm than hồng đánh dấu số điểm đạt được.' },
      { kanji: '焦げる', hiragana: 'こげる (kogeru)', sinoVietnamese: 'TIÊU', meaning: 'Bị cháy khét bánh mì', level: 'N2', breakdown: 'Tiêu (chim) + 灬 (Hỏa)', mnemonic: 'Lửa quá to làm cháy khét miếng thịt nướng.' },
      { kanji: '焼く', hiragana: 'やく (yaku)', sinoVietnamese: 'THIÊU', meaning: 'Nướng thịt, thiêu đốt', level: 'N4', breakdown: '火 (Hỏa) + Nghiêu', mnemonic: 'Nướng bánh mì thơm phức cho bữa điểm tâm.' },
      { kanji: '燃える', hiragana: 'もえる (moeru)', sinoVietnamese: 'NHIÊN', meaning: 'Cháy bùng lên, rực cháy', level: 'N3', breakdown: '火 (Hỏa) + Nhiên', mnemonic: 'Ngọn lửa đam mê rực cháy trong tim người trẻ.' },
      { kanji: '熱い', hiragana: 'あつい (atsui)', sinoVietnamese: 'NHIỆT', meaning: 'Nóng sốt, nóng bỏng', level: 'N5', breakdown: 'Nhiệt + 灬 (Hỏa)', mnemonic: 'Tách trà nóng hổi sưởi ấm lòng người.' },
      { kanji: '照る', hiragana: 'てる (teru)', sinoVietnamese: 'CHIẾU', meaning: 'Chiếu sáng, nắng chiếu', level: 'N3', breakdown: 'Chiêu + 灬 (Hỏa)', mnemonic: 'Ánh lửa soi rọi lối đi trong đêm vắng.' },
      { kanji: '灯台', hiragana: 'とうだい (tōdai)', sinoVietnamese: 'ĐĂNG ĐÀI', meaning: 'Ngọn hải đăng dẫn lối', level: 'N2', breakdown: '灯 (Đăng có 火) + 台', mnemonic: 'Ngọn hải đăng thắp sáng soi đường cho tàu thuyền cập bến.' },
      { kanji: '炊く', hiragana: 'たく (taku)', sinoVietnamese: 'XUY', meaning: 'Nấu cơm, thổi cơm', level: 'N3', breakdown: '火 (Hỏa) + Khiếm', mnemonic: 'Nấu nồi cơm trắng dẻo thơm bằng nồi cơm điện.' },
      { kanji: '煙', hiragana: 'けむり (kemuri)', sinoVietnamese: 'YÊN', meaning: 'Khói bếp nghi ngút', level: 'N3', breakdown: '火 (Hỏa) + Yên', mnemonic: 'Khói lam chiều bảng lảng trên mái nhà tranh.' },
      { kanji: '煮る', hiragana: 'にる (niru)', sinoVietnamese: 'CHỬ', meaning: 'Ninh, kho cá, hầm canh', level: 'N3', breakdown: 'Giả + 灬 (Hỏa)', mnemonic: 'Hầm nhừ nồi súp thơm lừng bằng ngọn lửa nhỏ liu riu.' },
      { kanji: '爆発', hiragana: 'ばくはつ (bakuhatsu)', sinoVietnamese: 'BẠO PHÁT', meaning: 'Nổ tung, bùng nổ dân số', level: 'N2', breakdown: '爆 (Bạo có 火) + 発', mnemonic: 'Ngọn lửa bùng phát nổ tung làm rung chuyển tòa nhà.' },
      { kanji: '熟す', hiragana: 'じゅくす (jukusu)', sinoVietnamese: 'THỤC', meaning: 'Trái cây chín mọng', level: 'N1', breakdown: 'Thục + 灬 (Hỏa)', mnemonic: 'Nắng ấm sưởi chín mọng chùm nho ngọt lành.' }
    ]
  },
  {
    stt: 87,
    strokeCount: 4,
    radical: '爪',
    variants: ['爫'],
    name: 'Trảo',
    meaning: 'Móng vuốt cầm thú',
    mnemonic: 'Bàn tay hoặc chân chim muông chúc xuống để quắp lấy con mồi.',
    relatedVocab: [
      { kanji: '爪', hiragana: 'つめ (tsume)', sinoVietnamese: 'TRẢO', meaning: 'Móng tay, móng vuốt', level: 'N3', breakdown: 'Hình bàn tay có móng vuốt cào', mnemonic: 'Cắt tỉa móng tay sạch sẽ gọn gàng.' },
      { kanji: '爪切り', hiragana: 'つめきり (tsumekiri)', sinoVietnamese: 'TRẢO THIẾT', meaning: 'Cái bấm móng tay', level: 'N4', breakdown: '爪 (Trảo) + 切 (Thiết)', mnemonic: 'Dụng cụ bấm móng tay tiện dụng trong gia đình.' },
      { kanji: '爪痕', hiragana: 'つめあと (tsumeato)', sinoVietnamese: 'TRẢO NGÂN', meaning: 'Vết cào móng vuốt, tàn tích cơn bão', level: 'N1', breakdown: '爪 (Trảo) + 痕 (Ngân)', mnemonic: 'Cơn bão đi qua để lại những vết tích nặng nề.' },
      { kanji: '妥協', hiragana: 'だきょう (dakyō)', sinoVietnamese: 'THỎA HIỆP', meaning: 'Thỏa hiệp nhượng bộ', level: 'N1', breakdown: '妥 (Thỏa có 爫) + 協 (Hiệp)', mnemonic: 'Hai bên nhượng bộ đạt được thỏa hiệp êm đẹp.' },
      { kanji: '妥当', hiragana: 'だとう (datō)', sinoVietnamese: 'THỎA ĐƯƠNG', meaning: 'Hợp lý, thỏa đáng', level: 'N2', breakdown: '妥 (Thỏa) + 当 (Đương)', mnemonic: 'Mức giá đưa ra hoàn toàn thỏa đáng hợp tình hợp lý.' },
      { kanji: '受ける', hiragana: 'うける (ukeru)', sinoVietnamese: 'THỤ', meaning: 'Nhận được, tham dự kỳ thi', level: 'N4', breakdown: '爫 (Trảo) + 冖 + Hựu', mnemonic: 'Đưa tay đón nhận món quà ý nghĩa từ người bạn.' },
      { kanji: '受験', hiragana: 'じゅけん (juken)', sinoVietnamese: 'THỤ NGHIỆM', meaning: 'Dự thi, thi tuyển sinh', level: 'N3', breakdown: '受 (Thụ có 爫) + 験 (Nghiệm)', mnemonic: 'Ôn luyện chăm chỉ sẵn sàng cho kỳ thi đại học.' },
      { kanji: '愛情', hiragana: 'あいじょう (aijō)', sinoVietnamese: 'ÁI TÌNH', meaning: 'Tình yêu thương bao la', level: 'N3', breakdown: '愛 (Ái có 爫 phía trên) + 情', mnemonic: 'Tình mẫu tử thiêng liêng vỗ về ấp ôm con thơ.' },
      { kanji: '採る', hiragana: 'とる (toru)', sinoVietnamese: 'THẢI', meaning: 'Hái hoa quả, tuyển dụng nhân tài', level: 'N3', breakdown: 'Thủ + 采 (Thải có 爫)', mnemonic: 'Đưa tay hái những quả táo chín mọng trên cành.' },
      { kanji: '争う', hiragana: 'あらそう (arasou)', sinoVietnamese: 'TRANH', meaning: 'Tranh giành, tranh đua', level: 'N3', breakdown: '爫 (Trảo) + Quyết', mnemonic: 'Hai tay vung móng tranh giành nhau miếng mồi ngon.' }
    ]
  },
  {
    stt: 88,
    strokeCount: 4,
    radical: '父',
    name: 'Phụ',
    meaning: 'Cha, người cha',
    mnemonic: 'Hình người cha tay cầm rìu đá đi làm lụng vất vả nuôi con.',
    relatedVocab: [
      { kanji: '父', hiragana: 'ちち (chichi)', sinoVietnamese: 'PHỤ', meaning: 'Bố, cha ruột của mình', level: 'N5', breakdown: 'Tay cầm gậy chỉ lối bảo ban', mnemonic: 'Người cha nghiêm khắc mà giàu lòng bao dung.' },
      { kanji: 'お父さん', hiragana: 'おとうさん (otōsan)', sinoVietnamese: 'PHỤ', meaning: 'Bố, ba (gọi bố người khác)', level: 'N5', breakdown: 'お + 父 (Phụ) + さん', mnemonic: 'Tiếng gọi Bố ơi ấm áp xua tan mỏi mệt.' },
      { kanji: '父親', hiragana: 'ちちおや (chichioya)', sinoVietnamese: 'PHỤ THÂN', meaning: 'Bậc làm cha, người cha', level: 'N4', breakdown: '父 (Phụ) + 親 (Thân)', mnemonic: 'Trách nhiệm của người cha nuôi dạy con khôn lớn.' },
      { kanji: '祖父', hiragana: 'そふ (sofu)', sinoVietnamese: 'TỔ PHỤ', meaning: 'Ông nội, ông ngoại của mình', level: 'N5', breakdown: '祖 (Tổ) + 父 (Phụ)', mnemonic: 'Người ông hiền từ kể chuyện cổ tích đêm trăng.' },
      { kanji: 'おじいさん', hiragana: 'おじいさん (ojiisan)', sinoVietnamese: 'TỔ PHỤ', meaning: 'Ông cụ, ông của bạn', level: 'N5', breakdown: 'Kính ngữ gia đình', mnemonic: 'Kính trọng lễ phép chào hỏi các bậc trưởng bối.' },
      { kanji: '父母', hiragana: 'ふぼ (fubo)', sinoVietnamese: 'PHỤ MẪU', meaning: 'Cha mẹ, song thân phụ mẫu', level: 'N3', breakdown: '父 (Phụ) + 母 (Mẫu)', mnemonic: 'Công cha như núi Thái Sơn, nghĩa mẹ như nước trong nguồn.' },
      { kanji: '伯父', hiragana: 'おじ (oji)', sinoVietnamese: 'BÁ PHỤ', meaning: 'Bác trai (anh của bố mẹ)', level: 'N3', breakdown: '伯 (Bá) + 父 (Phụ)', mnemonic: 'Bác trai ân cần chúc tết gia đình.' },
      { kanji: '叔父', hiragana: 'おじ (oji)', sinoVietnamese: 'THÚC PHỤ', meaning: 'Chú, cậu (em của bố mẹ)', level: 'N3', breakdown: '叔 (Thúc) + 父 (Phụ)', mnemonic: 'Chú út vui tính thường mua quà cho các cháu.' },
      { kanji: '義父', hiragana: 'ぎふ (gifu)', sinoVietnamese: 'NGHĨA PHỤ', meaning: 'Bố chồng, bố vợ, cha dượng', level: 'N2', breakdown: '義 (Nghĩa) + 父 (Phụ)', mnemonic: 'Kính hiếu với cha mẹ hai bên gia đình.' },
      { kanji: '父系', hiragana: 'ふけい (fukei)', sinoVietnamese: 'PHỤ HỆ', meaning: 'Theo dòng họ cha, dòng phụ hệ', level: 'N1', breakdown: '父 (Phụ) + 系 (Hệ)', mnemonic: 'Gia phả lưu truyền theo họ nội phụ hệ đời đời.' }
    ]
  },
  {
    stt: 89,
    strokeCount: 4,
    radical: '爻',
    name: 'Hào',
    meaning: 'Hào âm, hào dương (Kinh Dịch)',
    mnemonic: 'Những que tính đan chéo nhau dùng để gieo quẻ Kinh Dịch.',
    relatedVocab: [
      { kanji: '爽やか', hiragana: 'さわやか (sawayaka)', sinoVietnamese: 'SẢNG', meaning: 'Sảng khoái, tươi mát dễ chịu', level: 'N2', breakdown: 'Đại kẹp hai cặp 爻 (Hào)', mnemonic: 'Làn gió ban mai thổi qua mang lại cảm giác sảng khoái tuyệt vời.' },
      { kanji: '爽快', hiragana: 'そうかい (sōkai)', sinoVietnamese: 'SẢNG KHOÁI', meaning: 'Khoan khoái, tỉnh táo tinh thần', level: 'N1', breakdown: '爽 (Sảng có 爻) + 快 (Khoái)', mnemonic: 'Cốc nước chanh mát lạnh đem lại cảm giác khoan khoái.' },
      { kanji: '爾', hiragana: 'なんじ / じ (ji)', sinoVietnamese: 'NHĨ', meaning: 'Ngươi, mày (đại từ cổ), từ đó', level: 'N1', breakdown: '爻 đan xen dưới vòm', mnemonic: 'Lời xưng hô trang trọng trong văn bản cổ xưa.' },
      { kanji: '爾来', hiragana: 'じらい (jirai)', sinoVietnamese: 'NHĨ LAI', meaning: 'Kể từ đó đến nay, từ bấy đến giờ', level: 'N1', breakdown: '爾 (Nhĩ có 爻) + 来 (Lai)', mnemonic: 'Kể từ dạo chia tay đến nay đã mười năm trôi qua.' },
      { kanji: '爻辞', hiragana: 'こうじ (kōji)', sinoVietnamese: 'HÀO TỪ', meaning: 'Lời giải thích ý nghĩa từng hào trong Kinh Dịch', level: 'N1', breakdown: '爻 (Hào) + 辞 (Từ)', mnemonic: 'Lời giảng giải sâu xa về dịch lý biến chuyển của trời đất.' },
      { kanji: '学', hiragana: 'まな.ぶ / がく (gaku)', sinoVietnamese: 'HỌC', meaning: 'Học tập (chữ cổ chứa 爻)', level: 'N5', breakdown: 'Hai tay trao quẻ 爻 cho đứa trẻ Tử', mnemonic: 'Thầy trao tri thức sâu sắc cho học trò dưới mái trường.' },
      { kanji: '斑', hiragana: 'まだら / はん (han)', sinoVietnamese: 'BAN', meaning: 'Đốm hoa văn đan chéo rực rỡ', level: 'N1', breakdown: 'Vương + 爻 (Hào) + Vương', mnemonic: 'Bộ lông đốm hoa văn tuyệt đẹp của chú báo hoa mai.' },
      { kanji: '駁論', hiragana: 'ばくろん (bakuron)', sinoVietnamese: 'BÁC LUẬN', meaning: 'Bác bỏ luận điểm, phản biện sắc bén', level: 'N1', breakdown: 'Bác (chứa 爻) + 論 (Luận)', mnemonic: 'Đưa ra dẫn chứng sắc bén bác bỏ luận điệu sai lầm.' },
      { kanji: '爽籟', hiragana: 'そうらい (sōrai)', sinoVietnamese: 'SẢNG LÃI', meaning: 'Tiếng gió mùa thu thổi qua hàng cây êm dịu', level: 'N1', breakdown: '爽 (Sảng có 爻) + 籟', mnemonic: 'Tiếng gió reo thì thào giữa tiết thu trong trẻo.' },
      { kanji: '交じる', hiragana: 'まじる (majiru)', sinoVietnamese: 'GIAO', meaning: 'Giao thoa, đan xen lẫn nhau', level: 'N3', breakdown: 'Có dáng 爻 giao chéo', mnemonic: 'Những sắc màu đan xen tạo nên bức tranh đa dạng sinh động.' }
    ]
  },
  {
    stt: 90,
    strokeCount: 4,
    radical: '爿',
    variants: ['丬'],
    name: 'Tường',
    meaning: 'Mảnh gỗ xẻ trái, cái giường',
    mnemonic: 'Nửa thân cây gỗ xẻ dọc bên trái dựng lên làm thành cái giường nằm.',
    relatedVocab: [
      { kanji: '床', hiragana: 'ゆか / とこ (yuka)', sinoVietnamese: 'SÀNG', meaning: 'Sàn nhà, giường nằm', level: 'N4', breakdown: 'Nghiễm + 爿 (Tường - giường gỗ)', mnemonic: 'Sàn nhà gỗ lau chùi sáng bóng sạch sẽ.' },
      { kanji: '牀', hiragana: 'しょう (shō)', sinoVietnamese: 'SÀNG', meaning: 'Cái giường ngủ thời xưa', level: 'N1', breakdown: '爿 (Tường) + Mộc', mnemonic: 'Chiếc giường gỗ lim chạm trổ tinh xảo thời cổ.' },
      { kanji: '壯大', hiragana: 'そうだい (sōdai)', sinoVietnamese: 'TRÁNG ĐẠI', meaning: 'Hùng vĩ, tráng lệ quy mô lớn', level: 'N1', breakdown: '爿 (Tường) + Sĩ + Đại', mnemonic: 'Công trình kỳ vĩ hoành tráng giữa lòng thủ đô.' },
      { kanji: '將来', hiragana: 'しょうらい (shōrai)', sinoVietnamese: 'TƯƠNG LAI', meaning: 'Tương lai tươi sáng', level: 'N4', breakdown: '爿 (Tường) + Nhục + Thốn + Lai', mnemonic: 'Vững bước tiến vào tương lai với bao hoài bão lớn.' },
      { kanji: '將軍', hiragana: 'しょうぐん (shōgun)', sinoVietnamese: 'TƯỚNG QUÂN', meaning: 'Tướng quân Shogun thống lĩnh quân đội', level: 'N2', breakdown: '將 (Tướng có 爿) + 軍 (Quân)', mnemonic: 'Bậc tướng lĩnh uy dũng chỉ huy ngàn vạn binh sĩ.' },
      { kanji: '牆壁', hiragana: 'しょうへき (shōheki)', sinoVietnamese: 'TƯỜNG BÍCH', meaning: 'Tường thành kiên cố vách đá', level: 'N1', breakdown: '牆 (Tường có 爿) + 壁 (Bích)', mnemonic: 'Bức tường thành đá kiên cố ngăn chặn giặc ngoại xâm.' },
      { kanji: '壯健', hiragana: 'そうけん (sōken)', sinoVietnamese: 'TRÁNG KIỆN', meaning: 'Tráng kiện, dẻo dai khỏe mạnh', level: 'N1', breakdown: '壯 (Tráng có 爿) + 健 (Kiện)', mnemonic: 'Thân thể cường tráng dù tuổi đã ngoài thất tuần.' },
      { kanji: '裝飾', hiragana: 'そうしょく (sōshoku)', sinoVietnamese: 'TRANG SỨC', meaning: 'Trang trí, làm đẹp không gian', level: 'N2', breakdown: '裝 (Trang có 爿) + 飾 (Sức)', mnemonic: 'Trang hoàng lộng lẫy căn phòng đón giáng sinh.' },
      { kanji: '牀上', hiragana: 'しょうじょう (shōjō)', sinoVietnamese: 'SÀNG THƯỢNG', meaning: 'Trên giường bệnh, nằm dưỡng bệnh', level: 'N1', breakdown: '牀 (Sàng có 爿) + 上', mnemonic: 'Tĩnh dưỡng an tâm trên giường bệnh để mau hồi phục.' },
      { kanji: '壯絶', hiragana: 'そうぜつ (sōzetsu)', sinoVietnamese: 'TRÁNG TUYỆT', meaning: 'Anh dũng vô song, vô cùng oanh liệt', level: 'N1', breakdown: '壯 (Tráng có 爿) + 絶 (Tuyệt)', mnemonic: 'Bản anh hùng ca oanh liệt chấn động non sông.' }
    ]
  },
  {
    stt: 91,
    strokeCount: 4,
    radical: '片',
    name: 'Phiến',
    meaning: 'Mảnh ván xẻ phải, miếng mỏng',
    mnemonic: 'Nửa thân cây gỗ xẻ dọc bên phải tạo thành tấm ván mỏng mảnh.',
    relatedVocab: [
      { kanji: '片方', hiragana: 'かたほう (katahō)', sinoVietnamese: 'PHIẾN PHƯƠNG', meaning: 'Một bên, một chiếc (trong đôi)', level: 'N3', breakdown: '片 (Phiến) + 方 (Phương)', mnemonic: 'Đánh rơi mất một chiếc găng tay mùa đông.' },
      { kanji: '片道', hiragana: 'かたみち (katamichi)', sinoVietnamese: 'PHIẾN ĐẠO', meaning: 'Vé một chiều', level: 'N4', breakdown: '片 (Phiến) + 道 (Đạo)', mnemonic: 'Mua vé tàu một chiều lên thành phố học tập.' },
      { kanji: '片付く', hiragana: 'かたづく (katadzuku)', sinoVietnamese: 'PHIẾN PHÓ', meaning: 'Được dọn dẹp ngăn nắp', level: 'N4', breakdown: '片 (Phiến) + 付 (Phó)', mnemonic: 'Căn phòng đã được thu dọn gọn gàng sạch sẽ.' },
      { kanji: '片言', hiragana: 'かたこと (katakoto)', sinoVietnamese: 'PHIẾN NGÔN', meaning: 'Bập bẹ, nói chưa sõi', level: 'N2', breakdown: '片 (Phiến) + 言 (Ngôn)', mnemonic: 'Bé thơ bập bẹ nói những tiếng đầu đời.' },
      { kanji: '破片', hiragana: 'はへん (hahen)', sinoVietnamese: 'PHÁ PHIẾN', meaning: 'Mảnh vỡ thủy tinh', level: 'N2', breakdown: '破 (Phá) + 片 (Phiến)', mnemonic: 'Cẩn thận nhặt từng mảnh vỡ chiếc cốc rơi.' },
      { kanji: '欠片', hiragana: 'かけら (kakera)', sinoVietnamese: 'KHIẾM PHIẾN', meaning: 'Mảnh vụn, mẩu nhỏ sót lại', level: 'N2', breakdown: '欠 (Khiếm) + 片 (Phiến)', mnemonic: 'Còn chút mảnh vụn hy vọng le lói nơi đáy tim.' },
      { kanji: '断片', hiragana: 'だんぺん (dampen)', sinoVietnamese: 'ĐOÁN PHIẾN', meaning: 'Mảnh rời rạc, mẩu tin ngắn', level: 'N1', breakdown: '断 (Đoán) + 片 (Phiến)', mnemonic: 'Thu thập những mảnh ghép thông tin chắp nối manh mối.' },
      { kanji: '肉片', hiragana: 'にくへん (nikuhen)', sinoVietnamese: 'NHỤC PHIẾN', meaning: 'Miếng thịt mỏng thái đều', level: 'N1', breakdown: '肉 (Nhục) + 片 (Phiến)', mnemonic: 'Thái mỏng từng lát thịt bò tươi ngon nhúng lẩu.' },
      { kanji: '木片', hiragana: 'もくへん (mokuhen)', sinoVietnamese: 'MỘC PHIẾN', meaning: 'Mẩu gỗ vụn đẽo ra', level: 'N1', breakdown: '木 (Mộc) + 片 (Phiến)', mnemonic: 'Những mẩu gỗ thừa sau khi đóng chiếc ghế xinh.' },
      { kanji: '骨片', hiragana: 'こっぺん (koppen)', sinoVietnamese: 'CỐT PHIẾN', meaning: 'Mảnh xương hóa thạch', level: 'N1', breakdown: '骨 (Cốt) + 片 (Phiến)', mnemonic: 'Các nhà khảo cổ khai quật được mảnh xương khủng long cổ.' }
    ]
  },
  {
    stt: 92,
    strokeCount: 4,
    radical: '牙',
    name: 'Nha',
    meaning: 'Răng nanh nhọn',
    mnemonic: 'Hình chiếc răng nanh sắc nhọn đan khít vào nhau của loài thú.',
    relatedVocab: [
      { kanji: '牙', hiragana: 'きば / が (kiba)', sinoVietnamese: 'NHA', meaning: 'Răng nanh, ngà thú', level: 'N2', breakdown: 'Hình hai chiếc răng nanh bắt chéo', mnemonic: 'Con hổ nhe cặp răng nanh nhọn hoắt gầm vang.' },
      { kanji: '象牙', hiragana: 'ぞうげ (zōge)', sinoVietnamese: 'TƯỢNG NHA', meaning: 'Ngà voi quý hiếm', level: 'N2', breakdown: '象 (Tượng - voi) + 牙 (Nha)', mnemonic: 'Nghiêm cấm săn bắn mua bán ngà voi trái phép.' },
      { kanji: '毒牙', hiragana: 'どくが (dokuga)', sinoVietnamese: 'ĐỘC NHA', meaning: 'Nanh độc rắn rết, cạm bẫy hiểm độc', level: 'N1', breakdown: '毒 (Độc) + 牙 (Nha)', mnemonic: 'Rắn độc thè lưỡi giương nanh độc tấn công mồi.' },
      { kanji: '牙城', hiragana: 'がじょう (gajō)', sinoVietnamese: 'NHA THÀNH', meaning: 'Thành trì vững chắc, pháo đài bất khả xâm phạm', level: 'N1', breakdown: '牙 (Nha) + 城 (Thành)', mnemonic: 'Tấn công đánh sập cứ điểm thành trì kiên cố của đối thủ.' },
      { kanji: '芽', hiragana: 'め (me)', sinoVietnamese: 'NHA', meaning: 'Mầm cây non mới nhú', level: 'N2', breakdown: 'Thảo (cỏ) + 牙 (Nha - răng nhú)', mnemonic: 'Mầm non nhú lên như chiếc răng sữa đón nắng xuân.' },
      { kanji: '芽生える', hiragana: 'めばえる (mebaeru)', sinoVietnamese: 'NHA SINH', meaning: 'Nảy nở mầm sống, chớm nở tình cảm', level: 'N2', breakdown: '芽 (Nha) + 生 (Sinh)', mnemonic: 'Tình bạn trong sáng dần nảy nở thành tình yêu thương.' },
      { kanji: '萌芽', hiragana: 'ほうが (hōga)', sinoVietnamese: 'MANH NHA', meaning: 'Mầm mống, khởi đầu giai đoạn mới', level: 'N1', breakdown: '萌 (Manh) + 芽 (Nha)', mnemonic: 'Mầm mống của nền kinh tế tri thức đang trỗi dậy.' },
      { kanji: '爪牙', hiragana: 'そうが (sōga)', sinoVietnamese: 'TRẢO NHA', meaning: 'Móng vuốt và nanh nhọn, tay sai đắc lực', level: 'N1', breakdown: '爪 (Trảo) + 牙 (Nha)', mnemonic: 'Móng vuốt sắc nhọn săn mồi chốn rừng thiêng.' },
      { kanji: '歯牙', hiragana: 'しが (shiga)', sinoVietnamese: 'XỈ NHA', meaning: 'Răng miệng, không đáng để bận tâm', level: 'N1', breakdown: '歯 (Xỉ) + 牙 (Nha)', mnemonic: 'Những lời thị phi nhỏ nhen không đáng bận tâm vào miệng.' },
      { kanji: '牙営', hiragana: 'がえい (gaei)', sinoVietnamese: 'NHA DOANH', meaning: 'Dinh thự của vị tướng quân chỉ huy', level: 'N1', breakdown: '牙 (Nha) + 営 (Doanh)', mnemonic: 'Dinh trại cắm cờ lệnh chỉ huy trận đánh.' }
    ]
  },
  {
    stt: 93,
    strokeCount: 4,
    radical: '牛',
    variants: ['牜'],
    name: 'Ngưu',
    meaning: 'Con trâu, con bò',
    mnemonic: 'Hình đầu con trâu nhìn trực diện với cặp sừng cong vút uy lực.',
    relatedVocab: [
      { kanji: '牛', hiragana: 'うし / ぎゅう (ushi)', sinoVietnamese: 'NGƯU', meaning: 'Con bò, thịt bò', level: 'N5', breakdown: 'Đầu bò có cặp sừng cong vút', mnemonic: 'Chú bò thong dong gặm cỏ trên thảo nguyên xanh.' },
      { kanji: '牛肉', hiragana: 'ぎゅうにく (gyūniku)', sinoVietnamese: 'NGƯU NHỤC', meaning: 'Thịt bò tươi ngon', level: 'N5', breakdown: '牛 (Ngưu) + 肉 (Nhục)', mnemonic: 'Món thịt bò nướng thơm lừng trong bữa tiệc nướng.' },
      { kanji: '牛乳', hiragana: 'ぎゅうにゅう (gyūnyū)', sinoVietnamese: 'NGƯU NHŨ', meaning: 'Sữa bò tươi nguyên chất', level: 'N5', breakdown: '牛 (Ngưu) + 乳 (Nhũ - sữa)', mnemonic: 'Uống một ly sữa bò ấm mỗi sáng bổ sung canxi.' },
      { kanji: '子牛', hiragana: 'こうし (kōshi)', sinoVietnamese: 'TỬ NGƯU', meaning: 'Chú bê con đáng yêu', level: 'N4', breakdown: '子 (Tử) + 牛 (Ngưu)', mnemonic: 'Chú bê con chạy nhảy tung tăng bên mẹ hiền.' },
      { kanji: '牧場', hiragana: 'ぼくじょう (bokujō)', sinoVietnamese: 'MỤC TRƯỜNG', meaning: 'Nông trại chăn nuôi bò sữa', level: 'N3', breakdown: '牧 (Mục có 牜) + 場 (Trường)', mnemonic: 'Nông trại bò sữa xanh mướt trải dài ngút tầm mắt.' },
      { kanji: '和牛', hiragana: 'わぎゅう (wagyū)', sinoVietnamese: 'HÒA NGƯU', meaning: 'Thịt bò Wagyu trứ danh Nhật Bản', level: 'N3', breakdown: '和 (Hòa - Nhật) + 牛 (Ngưu)', mnemonic: 'Bò Wagyu vân mỡ cẩm thạch mềm tan nơi đầu lưỡi.' },
      { kanji: '特別', hiragana: 'とくべつ (tokubetsu)', sinoVietnamese: 'ĐẶC BIỆT', meaning: 'Đặc biệt, khác thường', level: 'N4', breakdown: '特 (Đặc có 牜) + 別 (Biệt)', mnemonic: 'Con bò quý hiếm khác biệt được chăm sóc đặc biệt.' },
      { kanji: '物', hiragana: 'もの / ぶつ (mono)', sinoVietnamese: 'VẬT', meaning: 'Đồ vật, vật phẩm', level: 'N5', breakdown: '牜 (Ngưu) + Vật (cờ)', mnemonic: 'Muôn loài sinh vật vạn vật trên trái đất.' },
      { kanji: '買い物', hiragana: 'かいもの (kaimono)', sinoVietnamese: 'MÃI VẬT', meaning: 'Mua sắm đồ đạc', level: 'N5', breakdown: '買 (Mãi) + 物 (Vật có 牜)', mnemonic: 'Dạo phố mua sắm quần áo và đồ lưu niệm.' },
      { kanji: '牡牛', hiragana: 'おうし (ōshi)', sinoVietnamese: 'MẪU NGƯU', meaning: 'Bò đực dũng mãnh', level: 'N2', breakdown: '牡 (Mẫu có 牜) + 牛 (Ngưu)', mnemonic: 'Chú bò đực lực lưỡng kéo cày vỡ đất ruộng sâu.' }
    ]
  },
  {
    stt: 94,
    strokeCount: 4,
    radical: '犬',
    variants: ['犭'],
    name: 'Khuyển',
    meaning: 'Con chó trung thành',
    mnemonic: 'Chữ Đại (大) thêm dấu chấm ở trên giống chú chó có cái tai vểnh.',
    relatedVocab: [
      { kanji: '犬', hiragana: 'いぬ / けん (inu)', sinoVietnamese: 'KHUYỂN', meaning: 'Con chó trung thành', level: 'N5', breakdown: 'Đại thêm dấu chấm là chú chó vẫy đuôi', mnemonic: 'Chú chó trung thành đón chủ về mỗi chiều.' },
      { kanji: '子犬', hiragana: 'こいぬ (koinu)', sinoVietnamese: 'TỬ KHUYỂN', meaning: 'Cún con, chó con', level: 'N5', breakdown: '子 (Tử) + 犬 (Khuyển)', mnemonic: 'Đàn cún con lông trắng quấn quýt quanh chân.' },
      { kanji: '番犬', hiragana: 'ばんけん (banken)', sinoVietnamese: 'PHIÊN KHUYỂN', meaning: 'Chó giữ nhà, chó canh gác', level: 'N2', breakdown: '番 (Phiên) + 犬 (Khuyển)', mnemonic: 'Chú chó canh gác đêm hôm bảo vệ sự an toàn cho ngôi nhà.' },
      { kanji: '犯人', hiragana: 'はんにん (hannin)', sinoVietnamese: 'PHẠM NHÂN', meaning: 'Thủ phạm, kẻ phạm tội', level: 'N3', breakdown: '犯 (Phạm có 犭) + 人 (Nhân)', mnemonic: 'Cảnh sát nhanh chóng truy bắt thủ phạm gây án.' },
      { kanji: '犯罪', hiragana: 'はんざい (hanzai)', sinoVietnamese: 'PHẠM TỘI', meaning: 'Tội phạm, hành vi phi pháp', level: 'N3', breakdown: '犯 (Phạm) + 罪 (Tội)', mnemonic: 'Ngăn chặn kịp thời các hành vi tội phạm nguy hiểm.' },
      { kanji: '狭い', hiragana: 'せまい (semai)', sinoVietnamese: 'HIỆP', meaning: 'Chật hẹp, eo hẹp', level: 'N5', breakdown: '犭 (Khuyển) + Hiệp', mnemonic: 'Căn phòng nhỏ hẹp chỉ vừa kê một chiếc giường.' },
      { kanji: '独身', hiragana: 'どくしん (dokushin)', sinoVietnamese: 'ĐỘC THÂN', meaning: 'Độc thân, chưa lập gia đình', level: 'N4', breakdown: '独 (Độc có 犭) + 身 (Thân)', mnemonic: 'Tận hưởng cuộc sống độc thân tự do thoải mái.' },
      { kanji: '独立', hiragana: 'どくりつ (dokuritsu)', sinoVietnamese: 'ĐỘC LẬP', meaning: 'Độc lập tự chủ', level: 'N3', breakdown: '独 (Độc) + 立 (Lập)', mnemonic: 'Quốc gia giành lại nền độc lập tự do thiêng liêng.' },
      { kanji: '狂う', hiragana: 'くるう (kuruu)', sinoVietnamese: 'CUỒNG', meaning: 'Điên cuồng, trục trặc đồng hồ', level: 'N2', breakdown: '犭 (Khuyển) + Vương', mnemonic: 'Kế hoạch bị đảo lộn chệch hướng hoàn toàn.' },
      { kanji: '猫', hiragana: 'ねこ (neko)', sinoVietnamese: 'MIÊU', meaning: 'Con mèo ngoan', level: 'N5', breakdown: '犭 (Khuyển) + Miêu (ruộng lúa)', mnemonic: 'Chú mèo nằm sưởi nắng lười biếng ngoài hiên.' },
      { kanji: '狩り', hiragana: 'かり (kari)', sinoVietnamese: 'THÚ', meaning: 'Săn bắn, hái lượm dâu tây', level: 'N2', breakdown: '犭 (Khuyển) + Thủ', mnemonic: 'Trải nghiệm hái dâu tây ngọt lịm tại nông trại.' },
      { kanji: '猛烈', hiragana: 'もうれつ (mōretsu)', sinoVietnamese: 'MÃNH LIỆT', meaning: 'Mãnh liệt, dữ dội', level: 'N1', breakdown: '猛 (Mãnh có 犭) + 烈', mnemonic: 'Cơn bão đổ bộ với sức gió giật mạnh dữ dội.' },
      { kanji: '獣', hiragana: 'けもの / じゅう (jū)', sinoVietnamese: 'THÚ', meaning: 'Thú rừng, muông thú hoang dã', level: 'N2', breakdown: 'Đơn + 犭 (Khuyển)', mnemonic: 'Bảo tồn các loài thú hoang dã quý hiếm trong rừng.' },
      { kanji: '獲物', hiragana: 'えもの (emono)', sinoVietnamese: 'HOẠCH VẬT', meaning: 'Con mồi săn được, chiến lợi phẩm', level: 'N2', breakdown: '獲 (Hoạch có 犭) + 物', mnemonic: 'Thợ săn mang chiến lợi phẩm trở về buôn làng.' },
      { kanji: '猟師', hiragana: 'りょうし (ryōshi)', sinoVietnamese: 'LIỆP SƯ', meaning: 'Người thợ săn kinh nghiệm', level: 'N1', breakdown: '猟 (Liệp có 犭) + 師', mnemonic: 'Bác thợ săn thông thạo từng lối mòn trong rừng già.' }
    ]
  },
  // Nhóm 5 nét (Bộ 95 – 117)
  {
    stt: 95,
    strokeCount: 5,
    radical: '玄',
    name: 'Huyền',
    meaning: 'Màu đen huyền, huyền bí',
    mnemonic: 'Bó tơ (幺) được nhúng vào chậu thuốc nhuộm màu đen sẫm sâu thẳm.',
    relatedVocab: [
      { kanji: '玄関', hiragana: 'げんかん (genkan)', sinoVietnamese: 'HUYỀN QUAN', meaning: 'Tiền sảnh vào nhà, cửa sảnh', level: 'N5', breakdown: '玄 (Huyền) + 関 (Quan)', mnemonic: 'Cửa sảnh tháo giày trước khi bước vào phòng khách ấm cúng.' },
      { kanji: '玄米', hiragana: 'げんまい (genmai)', sinoVietnamese: 'HUYỀN MỄ', meaning: 'Gạo lứt dinh dưỡng', level: 'N2', breakdown: '玄 (Huyền - màu sẫm) + 米 (Mễ)', mnemonic: 'Ăn cơm gạo lứt rất tốt cho sức khỏe tim mạch.' },
      { kanji: '玄人', hiragana: 'くろうと (kurōto)', sinoVietnamese: 'HUYỀN NHÂN', meaning: 'Chuyên gia lão luyện, dân sành nghề', level: 'N1', breakdown: '玄 (Huyền) + 人 (Nhân)', mnemonic: 'Bậc thầy lão luyện tinh thông mọi ngóc ngách chuyên môn.' },
      { kanji: '幽玄', hiragana: 'ゆうげん (yūgen)', sinoVietnamese: 'U HUYỀN', meaning: 'Vẻ đẹp thâm trầm, sâu lắng tinh tế', level: 'N1', breakdown: '幽 (U) + 玄 (Huyền)', mnemonic: 'Nét đẹp u huyền trầm mặc trong nghệ thuật kịch Noh.' },
      { kanji: '玄武', hiragana: 'げんぶ (gembu)', sinoVietnamese: 'HUYỀN VŨ', meaning: 'Thần rùa đen Huyền Vũ trấn giữ phương Bắc', level: 'N1', breakdown: '玄 (Huyền) + 武 (Vũ)', mnemonic: 'Linh vật rùa rắn thiêng liêng trấn yểm kinh thành.' },
      { kanji: '玄孫', hiragana: 'やしゃご (yashago)', sinoVietnamese: 'HUYỀN TÔN', meaning: 'Chắt, chút (thế hệ thứ tư)', level: 'N1', breakdown: '玄 (Huyền) + 孫 (Tôn)', mnemonic: 'Cụ già trăm tuổi hạnh phúc bế cháu chắt trên tay.' },
      { kanji: '玄妙', hiragana: 'げんみょう (gemmyō)', sinoVietnamese: 'HUYỀN DIỆU', meaning: 'Huyền diệu, kỳ diệu khôn lường', level: 'N1', breakdown: '玄 (Huyền) + 妙 (Diệu)', mnemonic: 'Quy luật huyền diệu vận hành của vũ trụ bao la.' },
      { kanji: '玄奥', hiragana: 'げんおう (gen\'ō)', sinoVietnamese: 'HUYỀN ÁO', meaning: 'Sâu xa uyên thâm', level: 'N1', breakdown: '玄 (Huyền) + 奥 (Áo)', mnemonic: 'Đạo lý uyên thâm đòi hỏi nhiều năm nghiền ngẫm.' },
      { kanji: '玄黄', hiragana: 'げんこう (genkō)', sinoVietnamese: 'HUYỀN HOÀNG', meaning: 'Trời và Đất (Trời màu huyền, Đất màu hoàng)', level: 'N1', breakdown: '玄 (Huyền) + 黄 (Hoàng)', mnemonic: 'Càn khôn vũ trụ rộng mở chở che muôn vật.' },
      { kanji: '弦', hiragana: 'つる / げん (gen)', sinoVietnamese: 'HUYỀN', meaning: 'Dây cung, dây đàn nguyệt', level: 'N1', breakdown: 'Cung + 玄 (Huyền)', mnemonic: 'Tiếng gảy dây đàn nguyệt ngân vang trầm bổng.' }
    ]
  },
  {
    stt: 96,
    strokeCount: 5,
    radical: '玉',
    variants: ['王', '⺩'],
    name: 'Ngọc / Vương',
    meaning: 'Đá quý, ngọc bích / Vua',
    mnemonic: 'Ba viên ngọc quý xâu qua một sợi dây, có chấm sáng lấp lánh.',
    relatedVocab: [
      { kanji: '玉', hiragana: 'たま (tama)', sinoVietnamese: 'NGỌC', meaning: 'Viên ngọc quý, quả bóng', level: 'N4', breakdown: 'Vương thêm dấu chấm ngọc', mnemonic: 'Viên ngọc bích lấp lánh giá trị ngàn vàng.' },
      { kanji: 'お年玉', hiragana: 'おとしだま (otoshidama)', sinoVietnamese: 'NIÊN NGỌC', meaning: 'Tiền mừng tuổi đầu năm', level: 'N4', breakdown: 'お + 年 (Niên) + 玉 (Ngọc)', mnemonic: 'Phong bao lì xì đỏ chúc bé ngoan hay ăn chóng lớn.' },
      { kanji: '王様', hiragana: 'おうさま (ōsama)', sinoVietnamese: 'VƯƠNG DẠNG', meaning: 'Nhà vua, đức vua đáng kính', level: 'N4', breakdown: '王 (Vương) + 様 (Dạng)', mnemonic: 'Bậc minh quân đức độ cai quản đất nước thanh bình.' },
      { kanji: '王国', hiragana: 'おうこく (ōkoku)', sinoVietnamese: 'VƯƠNG QUỐC', meaning: 'Vương quốc cổ tích', level: 'N3', breakdown: '王 (Vương) + 国 (Quốc)', mnemonic: 'Vương quốc trù phú giữa đại ngàn xanh biếc.' },
      { kanji: '宝物', hiragana: 'たからもの (takaramono)', sinoVietnamese: 'BẢO VẬT', meaning: 'Bảo vật, kho báu quý giá', level: 'N3', breakdown: '宝 (Bảo có 玉) + 物 (Vật)', mnemonic: 'Món quà kỷ niệm trân quý nhất suốt thời niên thiếu.' },
      { kanji: '宝石', hiragana: 'ほうせき (hōseki)', sinoVietnamese: 'BẢO THẠCH', meaning: 'Đá quý, kim cương lấp lánh', level: 'N3', breakdown: '宝 (Bảo) + 石 (Thạch)', mnemonic: 'Viên đá quý đính trên chiếc nhẫn cưới trang trọng.' },
      { kanji: '現れる', hiragana: 'あらわれる (arawareru)', sinoVietnamese: 'HIỆN', meaning: 'Xuất hiện, lộ diện', level: 'N3', breakdown: '玉 (Ngọc) + Kiến (thấy)', mnemonic: 'Viên ngọc sáng bóng lộ ra sau lớp đất đá mờ sương.' },
      { kanji: '現代', hiragana: 'げんだい (gendai)', sinoVietnamese: 'HIỆN ĐẠI', meaning: 'Thời hiện đại tân tiến', level: 'N3', breakdown: '現 (Hiện có 玉) + 代 (Đại)', mnemonic: 'Kỷ nguyên công nghệ số hiện đại phát triển vượt bậc.' },
      { kanji: '理科', hiragana: 'りか (rika)', sinoVietnamese: 'LÝ KHOA', meaning: 'Môn khoa học tự nhiên', level: 'N4', breakdown: '理 (Lý có 玉) + 科 (Khoa)', mnemonic: 'Mài giũa viên ngọc tìm hiểu chân lý tự nhiên.' },
      { kanji: '理由', hiragana: 'りゆう (riyū)', sinoVietnamese: 'LÝ DO', meaning: 'Lý do, nguyên cớ', level: 'N4', breakdown: '理 (Lý) + 由 (Do)', mnemonic: 'Trình bày rõ ràng lý do vắng mặt chính đáng.' },
      { kanji: '料理', hiragana: 'りょうり (ryōri)', sinoVietnamese: 'LIỆU LÝ', meaning: 'Nấu nướng, món ăn ngon', level: 'N5', breakdown: '料 + 理 (Lý có 玉)', mnemonic: 'Nấu nướng tỉ mỉ như thợ mài giũa ngọc quý.' },
      { kanji: '珍しい', hiragana: 'めずらしい (mezurashii)', sinoVietnamese: 'TRÂN', meaning: 'Hiếm có, quý hiếm', level: 'N4', breakdown: '玉 (Ngọc) + Nhân', mnemonic: 'Loài hoa quý hiếm ngàn năm mới nở một lần.' },
      { kanji: '地球', hiragana: 'ちきゅう (chikyū)', sinoVietnamese: 'ĐỊA CẦU', meaning: 'Trái đất thân yêu', level: 'N4', breakdown: '地 (Địa) + 球 (Cầu có 玉)', mnemonic: 'Hành tinh xanh hình cầu quay quanh mặt trời.' },
      { kanji: '環境', hiragana: 'かんきょう (kankyō)', sinoVietnamese: 'HOÀN CẢNH', meaning: 'Môi trường tự nhiên', level: 'N3', breakdown: '環 (Hoàn có 玉) + 境 (Cảnh)', mnemonic: 'Chung tay bảo vệ môi trường sinh thái trong lành.' },
      { kanji: '璧', hiragana: 'へき (heki)', sinoVietnamese: 'BÍCH', meaning: 'Miếng ngọc bích hoàn hảo', level: 'N1', breakdown: 'Tịch + 玉 (Ngọc)', mnemonic: 'Viên ngọc bích gia bảo hoàn bích quy Triệu.' }
    ]
  },
  {
    stt: 97,
    strokeCount: 5,
    radical: '瓜',
    name: 'Qua',
    meaning: 'Quả dưa',
    mnemonic: 'Quả dưa treo lủng lẳng ở giữa những dây leo rủ xuống xum xuê.',
    relatedVocab: [
      { kanji: '瓜', hiragana: 'うり (uri)', sinoVietnamese: 'QUA', meaning: 'Quả dưa, các loại dưa', level: 'N3', breakdown: 'Dây leo buông thõng quả dưa', mnemonic: 'Giàn dưa sai trĩu quả thơm mát ngày hè.' },
      { kanji: '西瓜', hiragana: 'すいか (suika)', sinoVietnamese: 'TÂY QUA', meaning: 'Quả dưa hấu giải nhiệt', level: 'N5', breakdown: '西 (Tây) + 瓜 (Qua)', mnemonic: 'Miếng dưa hấu đỏ mọng ngọt lịm xua tan nóng bức.' },
      { kanji: '胡瓜', hiragana: 'きゅうり (kyūri)', sinoVietnamese: 'HỒ QUA', meaning: 'Quả dưa chuột, dưa leo', level: 'N4', breakdown: '胡 (Hồ) + 瓜 (Qua)', mnemonic: 'Dưa chuột tươi giòn làm món salad thanh mát.' },
      { kanji: '南瓜', hiragana: 'かぼちゃ (kabocha)', sinoVietnamese: 'NAM QUA', meaning: 'Quả bí đỏ, bí ngô', level: 'N4', breakdown: '南 (Nam) + 瓜 (Qua)', mnemonic: 'Bí ngô hầm ngọt bùi bổ dưỡng cho trẻ nhỏ.' },
      { kanji: '苦瓜', hiragana: 'にがうり / ゴーヤ (nigauri)', sinoVietnamese: 'KHỔ QUA', meaning: 'Mướp đắng, khổ qua', level: 'N3', breakdown: '苦 (Khổ - đắng) + 瓜 (Qua)', mnemonic: 'Món mướp đắng xào trứng thanh nhiệt giải độc.' },
      { kanji: '瓜二つ', hiragana: 'うりふたつ (urifutatsu)', sinoVietnamese: 'QUA NHỊ', meaning: 'Giống nhau như đúc, như hai giọt nước', level: 'N2', breakdown: '瓜 (Qua) + 二つ', mnemonic: 'Hai anh em sinh đôi giống nhau như hai nửa quả dưa bổ đôi.' },
      { kanji: '甜瓜', hiragana: 'まくわうり / メロン (makuwauri)', sinoVietnamese: 'ĐIỀM QUA', meaning: 'Quả dưa lê, dưa lưới ngọt ngào', level: 'N2', breakdown: '甜 (Điềm - ngọt) + 瓜 (Qua)', mnemonic: 'Quả dưa lê thơm phức ngọt đậm đà.' },
      { kanji: '冬瓜', hiragana: 'とうがん (tōgan)', sinoVietnamese: 'ĐÔNG QUA', meaning: 'Quả bí đao nấu canh', level: 'N2', breakdown: '冬 (Đông) + 瓜 (Qua)', mnemonic: 'Bát canh bí đao nấu sườn thanh ngọt bổ mát.' },
      { kanji: '瓜田', hiragana: 'かでん (kaden)', sinoVietnamese: 'QUA ĐIỀN', meaning: 'Ruộng trồng dưa', level: 'N1', breakdown: '瓜 (Qua) + 田 (Điền)', mnemonic: 'Qua ruộng dưa chớ chỉnh giày tránh hiềm nghi.' },
      { kanji: '瓜実顔', hiragana: 'うりざねがお (urizanegao)', sinoVietnamese: 'QUA THỰC NHAN', meaning: 'Khuôn mặt trái xoan thanh tú', level: 'N1', breakdown: '瓜 + 実 + 顔 (Nhan)', mnemonic: 'Khuôn mặt trái xoan yêu kiều của thiếu nữ thời xưa.' }
    ]
  },
  {
    stt: 98,
    strokeCount: 5,
    radical: '瓦',
    name: 'Ngõa',
    meaning: 'Ngói lợp nhà',
    mnemonic: 'Những viên ngói âm dương xếp chồng khít lên nhau trên mái nhà vững chãi.',
    relatedVocab: [
      { kanji: '瓦', hiragana: 'かわら (kawara)', sinoVietnamese: 'NGÕA', meaning: 'Viên ngói nung', level: 'N2', breakdown: 'Hình viên ngói đan cài gối đầu lên nhau', mnemonic: 'Những viên ngói đất nung che mưa nắng cho tổ ấm.' },
      { kanji: '瓦礫', hiragana: 'がれき (gareki)', sinoVietnamese: 'NGÕA LỊCH', meaning: 'Đống gạch ngói vụn sau động đất', level: 'N1', breakdown: '瓦 (Ngõa) + 礫 (Lịch)', mnemonic: 'Dọn dẹp đống gạch vụn tái thiết lại khu phố.' },
      { kanji: '瓦葺き', hiragana: 'かわらぶき (kawarabuki)', sinoVietnamese: 'NGÕA DẬP', meaning: 'Mái lợp ngói truyền thống', level: 'N1', breakdown: '瓦 (Ngõa) + 葺 (Dập)', mnemonic: 'Ngôi nhà cổ lợp ngói đen rêu phong trầm mặc.' },
      { kanji: '鬼瓦', hiragana: 'おにがわら (onigawara)', sinoVietnamese: 'QUỶ NGÕA', meaning: 'Ngói trang trí mặt quỷ trừ tà', level: 'N1', breakdown: '鬼 (Quỷ) + 瓦 (Ngõa)', mnemonic: 'Viên ngói chạm hình mặt quỷ xua đuổi tà khí trên nóc đền.' },
      { kanji: '瓦解', hiragana: 'がかい (gakai)', sinoVietnamese: 'NGÕA GIẢI', meaning: 'Tan rã, sụp đổ hoàn toàn', level: 'N1', breakdown: '瓦 (Ngõa) + 解 (Giải)', mnemonic: 'Đế chế suy tàn sụp đổ tan tành như ngói vỡ.' },
      { kanji: '陶瓦', hiragana: 'とうが (tōga)', sinoVietnamese: 'ĐÀO NGÕA', meaning: 'Ngói tráng men gốm', level: 'N1', breakdown: '陶 (Đào) + 瓦 (Ngõa)', mnemonic: 'Ngói gốm sứ tráng men sáng bóng bền bỉ hàng thế kỷ.' },
      { kanji: '磚瓦', hiragana: 'せんが (senga)', sinoVietnamese: 'CHUYÊN NGÕA', meaning: 'Gạch và ngói xây cất', level: 'N1', breakdown: '磚 (Gạch) + 瓦 (Ngói)', mnemonic: 'Vật liệu gạch ngói nung kiên cố cho công trình cổ.' },
      { kanji: '桟瓦', hiragana: 'さんがわら (sangawara)', sinoVietnamese: 'SẠN NGÕA', meaning: 'Ngói lượn sóng chữ S', level: 'N1', breakdown: '桟 (Sạn) + 瓦 (Ngõa)', mnemonic: 'Loại ngói lượn sóng thoát nước mưa nhanh chóng.' },
      { kanji: '瓦斯', hiragana: 'がす (gasu)', sinoVietnamese: 'NGÕA TƯ', meaning: 'Khí gas đun nấu (từ mượn cổ)', level: 'N3', breakdown: '瓦 (Ngõa) + 斯', mnemonic: 'Khóa van bình ga an toàn sau khi nấu nướng xong.' },
      { kanji: '丸瓦', hiragana: 'まるがわら (marugawara)', sinoVietnamese: 'HOÀN NGÕA', meaning: 'Ngói máng tròn bán nguyệt', level: 'N1', breakdown: '丸 (Hoàn) + 瓦 (Ngõa)', mnemonic: 'Ngói lòng máng tròn đan úp trên nóc cổng chùa.' }
    ]
  },
  {
    stt: 99,
    strokeCount: 5,
    radical: '甘',
    name: 'Cam',
    meaning: 'Ngọt ngào, cam tâm',
    mnemonic: 'Cái miệng đang ngậm một miếng bánh ngọt ngon lành ở chính giữa.',
    relatedVocab: [
      { kanji: '甘い', hiragana: 'あまい (amai)', sinoVietnamese: 'CAM', meaning: 'Ngọt ngào, dễ dãi nuông chiều', level: 'N5', breakdown: 'Miệng ngậm mật ngọt thơm lừng', mnemonic: 'Chiếc bánh ngọt ngào vị kem dâu tây.' },
      { kanji: '甘える', hiragana: 'あまえる (amaeru)', sinoVietnamese: 'CAM', meaning: 'Nũng nịu, dựa dẫm', level: 'N3', breakdown: '甘 (Cam) + える', mnemonic: 'Đứa con thơ sà vào lòng mẹ nũng nịu vòi quà.' },
      { kanji: '甘やかす', hiragana: 'あまやかす (amayakasu)', sinoVietnamese: 'CAM', meaning: 'Nuông chiều con cái thái quá', level: 'N3', breakdown: '甘 (Cam) + やかす', mnemonic: 'Đừng quá nuông chiều khiến trẻ sinh tính ỷ lại.' },
      { kanji: '甘味', hiragana: 'かんみ / あまみ (kammi)', sinoVietnamese: 'CAM VỊ', meaning: 'Vị ngọt, đồ ngọt tráng miệng', level: 'N2', breakdown: '甘 (Cam) + 味 (Vị)', mnemonic: 'Vị ngọt thanh tao của trà đạo truyền thống.' },
      { kanji: '甘酒', hiragana: 'あまざけ (amazake)', sinoVietnamese: 'CAM TỬU', meaning: 'Rượu nếp ngọt truyền thống', level: 'N2', breakdown: '甘 (Cam) + 酒 (Tửu)', mnemonic: 'Chén rượu nếp ấm nồng sưởi ấm đêm giao thừa.' },
      { kanji: '甘露', hiragana: 'かんろ (kanro)', sinoVietnamese: 'CAM LỘ', meaning: 'Giọt sương ngọt cam lộ, tuyệt phẩm', level: 'N1', breakdown: '甘 (Cam) + 露 (Lộ - sương)', mnemonic: 'Giọt sương ngọt lành nuôi dưỡng vạn vật hồi sinh.' },
      { kanji: '甘党', hiragana: 'あまとう (amatō)', sinoVietnamese: 'CAM ĐẢNG', meaning: 'Tín đồ thích đồ ngọt, hảo ngọt', level: 'N2', breakdown: '甘 (Cam) + 党 (Đảng)', mnemonic: 'Tín đồ hảo ngọt mê mẩn các loại bánh ngọt Wagashi.' },
      { kanji: '甘辛い', hiragana: 'あまからい (amakarai)', sinoVietnamese: 'CAM TÂN', meaning: 'Vị mặn ngọt cay hòa quyện', level: 'N3', breakdown: '甘 (Cam) + 辛 (Tân - cay)', mnemonic: 'Nước sốt teriyaki mặn ngọt đậm đà đưa cơm.' },
      { kanji: '甘受', hiragana: 'かんじゅ (kanju)', sinoVietnamese: 'CAM THỤ', meaning: 'Cam chịu, chấp nhận khó khăn', level: 'N1', breakdown: '甘 (Cam) + 受 (Thụ)', mnemonic: 'Cam chịu mọi gian nan để theo đuổi lý tưởng lớn.' },
      { kanji: '甘美', hiragana: 'かんび (kambi)', sinoVietnamese: 'CAM MỸ', meaning: 'Ngọt ngào êm dịu, say đắm', level: 'N1', breakdown: '甘 (Cam) + 美 (Mỹ)', mnemonic: 'Giai điệu du dương ngọt ngào làm say đắm lòng người.' }
    ]
  },
  {
    stt: 100,
    strokeCount: 5,
    radical: '生',
    name: 'Sinh',
    meaning: 'Sinh nở, sinh sống, sống sót',
    mnemonic: 'Cỏ cây đâm chồi nảy lộc vươn cao trên mặt đất (Thổ 土).',
    relatedVocab: [
      { kanji: '生きる', hiragana: 'いきる (ikiru)', sinoVietnamese: 'SINH', meaning: 'Sống, sinh tồn', level: 'N5', breakdown: 'Mầm cây nảy mầm vươn lên đón nắng', mnemonic: 'Trân trọng từng ngày tháng được sống trong hòa bình.' },
      { kanji: '生まれる', hiragana: 'うまれる (umareru)', sinoVietnamese: 'SINH', meaning: 'Được sinh ra đời', level: 'N5', breakdown: '生 (Sinh) + まれる', mnemonic: 'Đứa bé chào đời trong niềm hân hoan của cả gia đình.' },
      { kanji: '先生', hiragana: 'せんせい (sensei)', sinoVietnamese: 'TIÊN SINH', meaning: 'Thầy giáo, cô giáo, bác sĩ', level: 'N5', breakdown: '先 (Tiên) + 生 (Sinh)', mnemonic: 'Người đi trước dẫn dắt truyền thụ tri thức cho đời.' },
      { kanji: '学生', hiragana: 'がくせい (gakusei)', sinoVietnamese: 'HỌC SINH', meaning: 'Học sinh, sinh viên', level: 'N5', breakdown: '学 (Học) + 生 (Sinh)', mnemonic: 'Các bạn học sinh rạng rỡ tới trường học tập.' },
      { kanji: '生活', hiragana: 'せいかつ (seikatsu)', sinoVietnamese: 'SINH HOẠT', meaning: 'Đời sống, sinh hoạt thường nhật', level: 'N4', breakdown: '生 (Sinh) + 活 (Hoạt)', mnemonic: 'Thích nghi nhanh chóng với nhịp sống tại xứ sở hoa anh đào.' },
      { kanji: '生', hiragana: 'なま (nama)', sinoVietnamese: 'SINH', meaning: 'Tươi sống (cá hồi, bia tươi)', level: 'N4', breakdown: '生 (Sinh)', mnemonic: 'Thưởng thức món cá hồi tươi sống sashimi trứ danh.' },
      { kanji: '生産', hiragana: 'せいさん (seisan)', sinoVietnamese: 'SINH SẢN', meaning: 'Sản xuất hàng hóa', level: 'N4', breakdown: '生 (Sinh) + 産 (Sản)', mnemonic: 'Dây chuyền tự động hóa nâng cao năng suất sản xuất.' },
      { kanji: '誕生日', hiragana: 'たんじょうび (tanjōbi)', sinoVietnamese: 'ĐẢN SINH NHẬT', meaning: 'Ngày sinh nhật', level: 'N5', breakdown: '誕 + 生 (Sinh) + 日', mnemonic: 'Thổi nến ước nguyện trong ngày sinh nhật ấm áp.' },
      { kanji: '生物', hiragana: 'せいぶつ (seibutsu)', sinoVietnamese: 'SINH VẬT', meaning: 'Sinh vật sống, muôn loài', level: 'N3', breakdown: '生 (Sinh) + 物 (Vật)', mnemonic: 'Bảo vệ sự đa dạng của các loài sinh vật biển.' },
      { kanji: '一生', hiragana: 'いっしょう (isshō)', sinoVietnamese: 'NHẤT SINH', meaning: 'Cả một đời, suốt đời', level: 'N3', breakdown: '一 (Nhất) + 生 (Sinh)', mnemonic: 'Nguyện gắn bó bên nhau trọn vẹn suốt một đời.' }
    ]
  },
  {
    stt: 101,
    strokeCount: 5,
    radical: '用',
    name: 'Dụng',
    meaning: 'Sử dụng, ứng dụng',
    mnemonic: 'Cái thùng gỗ có đai nẹp chắc chắn dùng để chứa đồ sinh hoạt.',
    relatedVocab: [
      { kanji: '用意', hiragana: 'ようい (yōi)', sinoVietnamese: 'DỤNG Ý', meaning: 'Chuẩn bị, sẵn sàng', level: 'N5', breakdown: '用 (Dụng) + 意 (Ý)', mnemonic: 'Dùng ý nghĩ để chuẩn bị chu đáo trước mọi việc.' },
      { kanji: '利用', hiragana: 'りよう (riyō)', sinoVietnamese: 'LỢI DỤNG', meaning: 'Sử dụng, tận dụng', level: 'N4', breakdown: '利 (Lợi) + 用 (Dụng)', mnemonic: 'Sử dụng những điều có lợi cho công việc.' },
      { kanji: '使用', hiragana: 'しよう (shiyō)', sinoVietnamese: 'SỬ DỤNG', meaning: 'Sử dụng, dùng đến', level: 'N3', breakdown: '使 (Sử) + 用 (Dụng)', mnemonic: 'Sai khiến và sử dụng đồ vật hay nhân lực.' },
      { kanji: '作用', hiragana: 'さよう (sayō)', sinoVietnamese: 'TÁC DỤNG', meaning: 'Tác dụng, ảnh hưởng', level: 'N3', breakdown: '作 (Tác) + 用 (Dụng)', mnemonic: 'Tạo ra công dụng và hiệu quả thực tế.' },
      { kanji: '信用', hiragana: 'しんよう (shin\'yō)', sinoVietnamese: 'TÍN DỤNG', meaning: 'Lòng tin, tín nhiệm', level: 'N3', breakdown: '信 (Tín) + 用 (Dụng)', mnemonic: 'Có lòng tin tưởng để trọng dụng giao phó.' },
      { kanji: '引用', hiragana: 'いんよう (in\'yō)', sinoVietnamese: 'DẪN DỤNG', meaning: 'Trích dẫn tài liệu', level: 'N2', breakdown: '引 (Dẫn) + 用 (Dụng)', mnemonic: 'Dẫn dắt và sử dụng câu từ của người khác.' },
      { kanji: '効用', hiragana: 'こうよう (kōyō)', sinoVietnamese: 'HIỆU DỤNG', meaning: 'Công hiệu, ích lợi', level: 'N2', breakdown: '効 (Hiệu) + 用 (Dụng)', mnemonic: 'Hiệu quả và công dụng thực tế của đồ dùng.' },
      { kanji: '適用', hiragana: 'てきよう (tekiyō)', sinoVietnamese: 'THÍCH DỤNG', meaning: 'Áp dụng, ứng dụng', level: 'N1', breakdown: '適 (Thích) + 用 (Dụng)', mnemonic: 'Thích hợp để đem vào áp dụng thực tế.' },
      { kanji: '費用', hiragana: 'ひよう (hiyō)', sinoVietnamese: 'PHÍ DỤNG', meaning: 'Chi phí, tổn phí', level: 'N3', breakdown: '費 (Phí) + 用 (Dụng)', mnemonic: 'Tiền bạc chi phí dùng cho các mục đích.' },
      { kanji: '応用', hiragana: 'おうよう (ōyō)', sinoVietnamese: 'ỨNG DỤNG', meaning: 'Ứng dụng vào thực tiễn', level: 'N2', breakdown: '応 (Ứng) + 用 (Dụng)', mnemonic: 'Ứng biến và áp dụng lý thuyết vào đời sống.' },
      { kanji: '軍用', hiragana: 'ぐんよう (gun\'yō)', sinoVietnamese: 'QUÂN DỤNG', meaning: 'Dùng cho quân sự', level: 'N1', breakdown: '軍 (Quân) + 用 (Dụng)', mnemonic: 'Đồ dùng trang bị cho quân đội.' },
      { kanji: '用事', hiragana: 'ようじ (yōji)', sinoVietnamese: 'DỤNG SỰ', meaning: 'Công việc bận, việc cần làm', level: 'N5', breakdown: '用 (Dụng) + 事 (Sự)', mnemonic: 'Việc cần phải dùng thời gian để xử lý.' }
    ]
  },
  {
    stt: 102,
    strokeCount: 5,
    radical: '田',
    name: 'Điền',
    meaning: 'Ruộng nương màu mỡ',
    mnemonic: 'Thửa ruộng vuông vức được chia thành 4 ô bởi các bờ đê dẫn nước.',
    relatedVocab: [
      { kanji: '田んぼ', hiragana: 'たんぼ (tanbo)', sinoVietnamese: 'ĐIỀN', meaning: 'Thửa ruộng lúa nước', level: 'N4', breakdown: '田 (Điền)', mnemonic: 'Những ô ruộng vuông vắn màu mỡ trù phú.' },
      { kanji: '水田', hiragana: 'すいでん (suiden)', sinoVietnamese: 'THỦY ĐIỀN', meaning: 'Ruộng nước, ruộng lúa', level: 'N3', breakdown: '水 (Thủy) + 田 (Điền)', mnemonic: 'Ruộng lúa có nguồn nước dồi dào chảy vào.' },
      { kanji: '油田', hiragana: 'ゆでん (yuden)', sinoVietnamese: 'DU ĐIỀN', meaning: 'Mỏ dầu, giếng dầu', level: 'N2', breakdown: '油 (Du) + 田 (Điền)', mnemonic: 'Vùng đất trù phú khai thác vàng đen - dầu mỏ.' },
      { kanji: '田舎', hiragana: 'いなか (inaka)', sinoVietnamese: 'ĐIỀN XÁ', meaning: 'Quê hương, nông thôn', level: 'N4', breakdown: '田 (Điền) + 舎 (Xá)', mnemonic: 'Những ngôi nhà mộc mạc bên cạnh cánh đồng quê.' },
      { kanji: '田畑', hiragana: 'たはた (tahata)', sinoVietnamese: 'ĐIỀN HẠC', meaning: 'Ruộng nương hoa màu', level: 'N2', breakdown: '田 (Điền) + 畑 (Hạc - nương rẫy)', mnemonic: 'Bao gồm cả ruộng lúa nước và nương rẫy khô.' },
      { kanji: '田園', hiragana: 'でんえん (den\'en)', sinoVietnamese: 'ĐIỀN VIÊN', meaning: 'Đồng ruộng vườn tược', level: 'N1', breakdown: '田 (Điền) + 園 (Viên)', mnemonic: 'Khung cảnh vườn cây đồng ruộng thanh bình.' },
      { kanji: '新田', hiragana: 'しんでん (shinden)', sinoVietnamese: 'TÂN ĐIỀN', meaning: 'Ruộng mới khai hoang', level: 'N1', breakdown: '新 (Tân) + 田 (Điền)', mnemonic: 'Mảnh ruộng mới được con người khai hoang trồng trọt.' },
      { kanji: '山田', hiragana: 'やまだ (yamada)', sinoVietnamese: 'SƠN ĐIỀN', meaning: 'Họ Yamada (Ruộng trên núi)', level: 'N5', breakdown: '山 (Sơn) + 田 (Điền)', mnemonic: 'Họ phổ biến ở Nhật bắt nguồn từ thửa ruộng ven núi.' },
      { kanji: '塩田', hiragana: 'えんでん (enden)', sinoVietnamese: 'DIÊM ĐIỀN', meaning: 'Cánh đồng muối ven biển', level: 'N1', breakdown: '塩 (Diêm) + 田 (Điền)', mnemonic: 'Ruộng trải nước biển phơi nắng lấy hạt muối trắng.' },
      { kanji: '苗代田', hiragana: 'なわしろだ (nawashiroda)', sinoVietnamese: 'MIÊU ĐẠI ĐIỀN', meaning: 'Ruộng ươm mạ non', level: 'N1', breakdown: '苗 (Miêu) + 代 (Đại) + 田 (Điền)', mnemonic: 'Mảnh ruộng chuyên dùng để ươm những nhánh mạ non.' }
    ]
  },
  {
    stt: 103,
    strokeCount: 5,
    radical: '疋',
    variants: ['𤴔'],
    name: 'Thất',
    meaning: 'Tấm vải, đơn vị đo vải',
    mnemonic: 'Hình cuộn vải dài hoặc bàn chân kèm bắp chân đo từng bước đi.',
    relatedVocab: [
      { kanji: '疋', hiragana: 'ひき (hiki)', sinoVietnamese: 'THẤT', meaning: 'Cuộn vải, sấp vải', level: 'N1', breakdown: 'Bộ 疋 (Thất)', mnemonic: 'Cuộn vải dài đo bằng bước chân đi.' },
      { kanji: '一疋', hiragana: 'いっぴき (ippiki)', sinoVietnamese: 'NHẤT THẤT', meaning: 'Một cuộn vải dệt', level: 'N1', breakdown: '一 (Nhất) + 疋 (Thất)', mnemonic: 'Một cuộn vải tơ tằm nguyên vẹn.' },
      { kanji: '疎通', hiragana: 'そつう (sotsū)', sinoVietnamese: 'SƠ THÔNG', meaning: 'Thông suốt, hiểu ý nhau', level: 'N1', breakdown: 'Chứa gốc chữ 疋 trong 疎 (Sơ)', mnemonic: 'Ý nghĩ thông suốt liền mạch không ngăn cách.' },
      { kanji: '疎遠', hiragana: 'そえん (soen)', sinoVietnamese: 'SƠ VIỄN', meaning: 'Xa cách, lạnh nhạt', level: 'N1', breakdown: 'Chứa gốc 疋 trong 疎 (Sơ) + 遠 (Viễn)', mnemonic: 'Khoảng cách bước chân ngày càng xa vời.' },
      { kanji: '楚々', hiragana: 'そそ (soso)', sinoVietnamese: 'SỞ SỞ', meaning: 'Thanh tú, duyên dáng', level: 'N1', breakdown: 'Chứa bộ 疋', mnemonic: 'Dáng vẻ thanh tao duyên dáng như lụa mềm.' },
      { kanji: '疎外', hiragana: 'そがい (sogai)', sinoVietnamese: 'SƠ NGOẠI', meaning: 'Xa lánh, tẩy chay', level: 'N1', breakdown: '疎 (Sơ) + 外 (Ngoại)', mnemonic: 'Đẩy ra bên ngoài vòng bè bạn.' },
      { kanji: '疎開', hiragana: 'そかい (sokai)', sinoVietnamese: 'SƠ KHAI', meaning: 'Sơ tán, tản cư', level: 'N1', breakdown: '疎 (Sơ) + 開 (Khai)', mnemonic: 'Di chuyển tản mát để tránh chiến tranh bom đạn.' },
      { kanji: '過疎', hiragana: 'かそ (kaso)', sinoVietnamese: 'QUÁ SƠ', meaning: 'Thưa thớt dân cư', level: 'N1', breakdown: '過 (Quá) + 疎 (Sơ)', mnemonic: 'Dân số giảm sút quá mức ở vùng nông thôn.' },
      { kanji: '疎忽', hiragana: 'そこつ (sokotsu)', sinoVietnamese: 'SƠ HỐT', meaning: 'Sơ suất, bất cẩn', level: 'N1', breakdown: '疎 (Sơ) + 忽 (Hốt)', mnemonic: 'Bất cẩn lơ là làm hỏng việc.' },
      { kanji: '基礎', hiragana: 'きそ (kiso)', sinoVietnamese: 'CƠ SỞ', meaning: 'Nền tảng căn bản', level: 'N2', breakdown: '基 (Cơ) + 礎 (Sở - chứa 疋 và 石)', mnemonic: 'Hòn đá tảng vững vàng làm móng nhà.' }
    ]
  },
  {
    stt: 104,
    strokeCount: 5,
    radical: '疒',
    name: 'Nạch',
    meaning: 'Bệnh tật, ốm đau',
    mnemonic: 'Hình người bị ốm phải nằm trên giường bệnh (Tường 爿), người đổ mồ hôi (2 chấm).',
    relatedVocab: [
      { kanji: '病気', hiragana: 'びょうき (byōki)', sinoVietnamese: 'BỆNH KHÍ', meaning: 'Bệnh tật, ốm đau', level: 'N5', breakdown: '病 (Bệnh - bộ 疒) + 気 (Khí)', mnemonic: 'Khí sắc suy yếu phải nằm trên giường bệnh.' },
      { kanji: '病院', hiragana: 'びょういん (byōin)', sinoVietnamese: 'BỆNH VIỆN', meaning: 'Bệnh viện', level: 'N5', breakdown: '病 (Bệnh) + 院 (Viện)', mnemonic: 'Nơi các bác sĩ chữa trị cho bệnh nhân.' },
      { kanji: '痛み', hiragana: 'いたみ (itami)', sinoVietnamese: 'THỐNG', meaning: 'Cơn đau, sự đau đớn', level: 'N4', breakdown: '痛 (Thống - bộ 疒)', mnemonic: 'Cơn đau đớn như bị tên bắn trúng khi nằm giường bệnh.' },
      { kanji: '疲労', hiragana: 'ひろう (hirō)', sinoVietnamese: 'BÌ LAO', meaning: 'Mệt mỏi kiệt sức', level: 'N2', breakdown: '疲 (Bì - bộ 疒) + 労 (Lao)', mnemonic: 'Lao lực quá sức dẫn đến mỏi mệt kiệt quệ.' },
      { kanji: '症状', hiragana: 'しょうじょう (shōjō)', sinoVietnamese: 'CHỨNG TRẠNG', meaning: 'Triệu chứng bệnh tật', level: 'N2', breakdown: '症 (Chứng - bộ 疒) + 状 (Trạng)', mnemonic: 'Tình trạng biểu hiện của căn bệnh.' },
      { kanji: '伝染病', hiragana: 'でんせんびょう (densenbyō)', sinoVietnamese: 'TRUYỀN NHIỄM BỆNH', meaning: 'Bệnh truyền nhiễm', level: 'N1', breakdown: '伝 (Truyền) + 染 (Nhiễm) + 病 (Bệnh)', mnemonic: 'Bệnh lây lan từ người này sang người khác.' },
      { kanji: '痴呆', hiragana: 'ちほう (chihō)', sinoVietnamese: 'SI NGỐC', meaning: 'Chứng sa sút trí tuệ', level: 'N1', breakdown: '痴 (Si - bộ 疒) + 呆 (Ngốc)', mnemonic: 'Bệnh suy giảm nhận thức ở người cao tuổi.' },
      { kanji: '痛覚', hiragana: 'つうかく (tsūkaku)', sinoVietnamese: 'THỐNG GIÁC', meaning: 'Cảm giác đau đớn', level: 'N1', breakdown: '痛 (Thống) + 覚 (Giác)', mnemonic: 'Giác quan cảm nhận thấy sự đau đớn.' },
      { kanji: '疾患', hiragana: 'しっかん (shikkan)', sinoVietnamese: 'TẬT HOẠN', meaning: 'Căn bệnh, chứng tật', level: 'N1', breakdown: '疾 (Tật - bộ 疒) + 患 (Hoạn)', mnemonic: 'Bệnh tật gây lo lắng phiền muộn.' },
      { kanji: '痒み', hiragana: 'かゆみ (kayumi)', sinoVietnamese: 'DƯƠNG', meaning: 'Cơn ngứa ngáy', level: 'N1', breakdown: '痒 (Dương - bộ 疒)', mnemonic: 'Cảm giác ngứa ngáy khó chịu trên da.' },
      { kanji: '療養', hiragana: 'りょうよう (ryōyō)', sinoVietnamese: 'LIỆU DƯỠNG', meaning: 'Dưỡng bệnh, hồi phục', level: 'N1', breakdown: '療 (Liệu - bộ 疒) + 養 (Dưỡng)', mnemonic: 'Chăm sóc tĩnh dưỡng để bệnh mau lành.' },
      { kanji: '疫病', hiragana: 'えきびょう (ekibyō)', sinoVietnamese: 'DỊCH BỆNH', meaning: 'Dịch bệnh bùng phát', level: 'N1', breakdown: '疫 (Dịch - bộ 疒) + 病 (Bệnh)', mnemonic: 'Dịch bệnh lây lan khắp mọi nẻo đường.' }
    ]
  },
  {
    stt: 105,
    strokeCount: 5,
    radical: '癶',
    name: 'Bát',
    meaning: 'Gạt ngược lại, leo lên',
    mnemonic: 'Hai bàn chân xoay ngược hướng nhau để đạp và leo lên cao.',
    relatedVocab: [
      { kanji: '発車', hiragana: 'はっしゃ (hassha)', sinoVietnamese: 'PHÁT XA', meaning: 'Xe khởi hành lăn bánh', level: 'N4', breakdown: '発 (Phát - bộ 癶) + 車 (Xa)', mnemonic: 'Xe chuyển động bánh lăn đi ra tiền tuyến.' },
      { kanji: '発表', hiragana: 'はっぴょう (happyō)', sinoVietnamese: 'PHÁT BIỂU', meaning: 'Phát biểu, công bố', level: 'N3', breakdown: '発 (Phát) + 表 (Biểu)', mnemonic: 'Bộc lộ và công bố ý kiến trước mọi người.' },
      { kanji: '発見', hiragana: 'はっけん (hakken)', sinoVietnamese: 'PHÁT KIẾN', meaning: 'Tìm ra, phát hiện', level: 'N3', breakdown: '発 (Phát) + 見 (Kiến)', mnemonic: 'Nhìn thấy và phát hiện ra điều mới mẻ.' },
      { kanji: '登る', hiragana: 'のぼる (noboru)', sinoVietnamese: 'ĐĂNG', meaning: 'Leo trèo, trèo lên núi', level: 'N5', breakdown: '登 (Đăng - bộ 癶)', mnemonic: 'Hai chân bước nhịp nhàng trèo lên đỉnh núi.' },
      { kanji: '登山', hiragana: 'とざん (tozan)', sinoVietnamese: 'ĐĂNG SƠN', meaning: 'Việc leo núi', level: 'N3', breakdown: '登 (Đăng) + 山 (Sơn)', mnemonic: 'Hành trình đôi chân chinh phục đỉnh cao.' },
      { kanji: '発展', hiragana: 'はってん (hatten)', sinoVietnamese: 'PHÁT TRIỂN', meaning: 'Phát triển thịnh vượng', level: 'N3', breakdown: '発 (Phát) + 展 (Triển)', mnemonic: 'Mở rộng và tiến lên phía trước mạnh mẽ.' },
      { kanji: '発売', hiragana: 'はつばい (hatsubai)', sinoVietnamese: 'PHÁT MẠI', meaning: 'Phát hành, mở bán', level: 'N3', breakdown: '発 (Phát) + 売 (Mại)', mnemonic: 'Đưa sản phẩm mới ra thị trường bày bán.' },
      { kanji: '登校', hiragana: 'とうこう (tōkō)', sinoVietnamese: 'ĐĂNG HIỆU', meaning: 'Đến trường đi học', level: 'N2', breakdown: '登 (Đăng) + 校 (Hiệu)', mnemonic: 'Cất bước tới ngôi trường để học hỏi.' },
      { kanji: '発作', hiragana: 'ほっさ (hossa)', sinoVietnamese: 'PHÁT TÁC', meaning: 'Cơn phát tác bệnh', level: 'N1', breakdown: '発 (Phát) + 作 (Tác)', mnemonic: 'Cơn đau đột ngột bộc phát trỗi dậy.' },
      { kanji: '登録', hiragana: 'とうろく (tōroku)', sinoVietnamese: 'ĐĂNG LỤC', meaning: 'Đăng ký danh tính', level: 'N3', breakdown: '登 (Đăng) + 録 (Lục)', mnemonic: 'Ghi chép tên tuổi vào danh sách chính thức.' }
    ]
  },
  {
    stt: 106,
    strokeCount: 5,
    radical: '白',
    name: 'Bạch',
    meaning: 'Màu trắng, trong sáng',
    mnemonic: 'Tia nắng đầu tiên (nét phẩy) chiếu rọi từ Mặt trời (Nhật 日) làm sáng trắng vạn vật.',
    relatedVocab: [
      { kanji: '白い', hiragana: 'しろい (shiroi)', sinoVietnamese: 'BẠCH', meaning: 'Màu trắng tinh khiết', level: 'N5', breakdown: '白 (Bạch)', mnemonic: 'Tia nắng mặt trời chiếu rọi hạt ngọc trắng ngần.' },
      { kanji: '明白', hiragana: 'めいはく (meihaku)', sinoVietnamese: 'MINH BẠCH', meaning: 'Rõ ràng, minh bạch', level: 'N2', breakdown: '明 (Minh) + 白 (Bạch)', mnemonic: 'Sáng sủa và trong trắng, không có chút mập mờ.' },
      { kanji: '告白', hiragana: 'こくはく (kokuhaku)', sinoVietnamese: 'CÁO BẠCH', meaning: 'Tỏ tình, thú nhận thật lòng', level: 'N2', breakdown: '告 (Cáo) + 白 (Bạch)', mnemonic: 'Bày tỏ nỗi lòng chân thật trong trắng với người thương.' },
      { kanji: '白鳥', hiragana: 'はくちょう (hakuchō)', sinoVietnamese: 'BẠCH ĐIỂU', meaning: 'Chim thiên nga trắng', level: 'N2', breakdown: '白 (Bạch) + 鳥 (Điểu)', mnemonic: 'Loài chim có bộ lông trắng tinh khiết tuyệt đẹp.' },
      { kanji: '空白', hiragana: 'くうはく (kūhaku)', sinoVietnamese: 'KHÔNG BẠCH', meaning: 'Chỗ trống, khoảng trống', level: 'N2', breakdown: '空 (Không) + 白 (Bạch)', mnemonic: 'Khoảng giấy trắng trống trơn chưa ghi chép.' },
      { kanji: '潔白', hiragana: 'けっぱく (keppaku)', sinoVietnamese: 'KHIẾT BẠCH', meaning: 'Trong sạch, vô tội', level: 'N1', breakdown: '潔 (Khiết) + 白 (Bạch)', mnemonic: 'Tâm hồn trong sạch không vướng bụi trần.' },
      { kanji: '面白い', hiragana: 'おもしろい (omoshiroi)', sinoVietnamese: 'DIỆN BẠCH', meaning: 'Thú vị, hấp dẫn', level: 'N5', breakdown: '面 (Diện) + 白 (Bạch)', mnemonic: 'Nét mặt sáng bừng lên vì điều thú vị vui nhộn.' },
      { kanji: '白紙', hiragana: 'はくし (hakushi)', sinoVietnamese: 'BẠCH CHỈ', meaning: 'Tờ giấy trắng tinh', level: 'N2', breakdown: '白 (Bạch) + 紙 (Chỉ)', mnemonic: 'Trang giấy trắng chưa viết chữ nào.' },
      { kanji: '純白', hiragana: 'じゅんぱく (junpaku)', sinoVietnamese: 'THUẦN BẠCH', meaning: 'Trắng muốt tinh khôi', level: 'N1', breakdown: '純 (Thuần) + 白 (Bạch)', mnemonic: 'Sắc trắng tinh khôi không chút pha tạp.' },
      { kanji: '白髪', hiragana: 'しらが (shiraga)', sinoVietnamese: 'BẠCH PHÁT', meaning: 'Mái tóc bạc phơ', level: 'N2', breakdown: '白 (Bạch) + 髪 (Phát)', mnemonic: 'Mái tóc nhuộm màu sương gió bạc trắng.' }
    ]
  },
  {
    stt: 107,
    strokeCount: 5,
    radical: '皮',
    name: 'Bì',
    meaning: 'Da thú, vỏ ngoài',
    mnemonic: 'Bàn tay (Hựu 又) đang lột lớp da thú ra khỏi thân để thuộc.',
    relatedVocab: [
      { kanji: '皮', hiragana: 'かわ (kawa)', sinoVietnamese: 'BÌ', meaning: 'Làn da, vỏ quả', level: 'N3', breakdown: '皮 (Bì)', mnemonic: 'Bàn tay lột tấm da thú bên ngoài.' },
      { kanji: '皮膚', hiragana: 'ひふ (hifu)', sinoVietnamese: 'BÌ PHU', meaning: 'Da người, làn da', level: 'N2', breakdown: '皮 (Bì) + 膚 (Phu)', mnemonic: 'Lớp da bao bọc bên ngoài cơ thể con người.' },
      { kanji: '皮肉', hiragana: 'ひにく (hiniku)', sinoVietnamese: 'BÌ NHỤC', meaning: 'Châm chọc, mỉa mai', level: 'N2', breakdown: '皮 (Bì) + 肉 (Nhục)', mnemonic: 'Chỉ chạm ngoài da thịt mà làm nhói lòng.' },
      { kanji: '毛皮', hiragana: 'けがわ (kegawa)', sinoVietnamese: 'MAO BÌ', meaning: 'Áo lông thú, da lông', level: 'N2', breakdown: '毛 (Mao) + 皮 (Bì)', mnemonic: 'Tấm da thú có lớp lông ấm áp giữ nhiệt.' },
      { kanji: '剥皮', hiragana: 'はくひ (hakuhi)', sinoVietnamese: 'BÁC BÌ', meaning: 'Lột da, bóc vỏ cây', level: 'N1', breakdown: '剥 (Bác) + 皮 (Bì)', mnemonic: 'Hành động bóc tách lớp vỏ bọc ngoài.' },
      { kanji: '波及', hiragana: 'はきゅう (hakyū)', sinoVietnamese: 'BA CẬP', meaning: 'Lan truyền ảnh hưởng', level: 'N1', breakdown: 'Chứa chữ 波 (có 皮)', mnemonic: 'Sóng gợn lan rộng khắp mặt nước.' },
      { kanji: '疲弊', hiragana: 'ひへい (hihei)', sinoVietnamese: 'BÌ TỆ', meaning: 'Kiệt quệ, suy thoái', level: 'N1', breakdown: 'Chứa chữ 疲 (có 皮)', mnemonic: 'Cơ thể rã rời da bọc xương kiệt quệ.' },
      { kanji: '表皮', hiragana: 'ひょうひ (hyōhi)', sinoVietnamese: 'BIỂU BÌ', meaning: 'Lớp biểu bì ngoài cùng', level: 'N1', breakdown: '表 (Biểu) + 皮 (Bì)', mnemonic: 'Tầng da ngoài cùng bảo vệ cơ thể.' },
      { kanji: '皮革', hiragana: 'ひかく (hikaku)', sinoVietnamese: 'BÌ CÁCH', meaning: 'Đồ da thuộc thủ công', level: 'N1', breakdown: '皮 (Bì) + 革 (Cách)', mnemonic: 'Da sống và da đã qua xử lý thuộc da.' },
      { kanji: '皮算用', hiragana: 'かわざんよう (kawazan\'yō)', sinoVietnamese: 'BÌ TOÁN DỤNG', meaning: 'Tính cua trong lỗ, đếm da thú chưa săn', level: 'N1', breakdown: '皮 (Bì) + 算用 (Toán dụng)', mnemonic: 'Thành ngữ tính tiền bán da khi thú còn trong rừng.' }
    ]
  },
  {
    stt: 108,
    strokeCount: 5,
    radical: '皿',
    name: 'Mãnh',
    meaning: 'Bát đĩa, khay đựng',
    mnemonic: 'Hình chiếc bát hoặc khay đựng thức ăn có chân đế bên dưới.',
    relatedVocab: [
      { kanji: 'お皿', hiragana: 'おさら (osara)', sinoVietnamese: 'MÃNH', meaning: 'Cái đĩa đựng thức ăn', level: 'N5', breakdown: '皿 (Mãnh)', mnemonic: 'Chiếc đĩa đáy bằng có thành dựng lên.' },
      { kanji: '灰皿', hiragana: 'はいざら (haizara)', sinoVietnamese: 'HÔI MÃNH', meaning: 'Gạt tàn thuốc lá', level: 'N4', breakdown: '灰 (Hôi - tro) + 皿 (Mãnh)', mnemonic: 'Chiếc đĩa chuyên dùng để đựng tàn thuốc lá.' },
      { kanji: '盆', hiragana: 'ぼん (bon)', sinoVietnamese: 'BỒN', meaning: 'Cái khay, mâm đựng / Lễ Vu Lan', level: 'N3', breakdown: '分 (Phân) + 皿 (Mãnh)', mnemonic: 'Chiếc khay chia nhỏ đồ ăn đựng lên trên.' },
      { kanji: '盗難', hiragana: 'とうなん (tōnan)', sinoVietnamese: 'ĐẠO NAN', meaning: 'Vụ trộm cắp, tai họa mất cắp', level: 'N3', breakdown: '盗 (Đạo - có bộ 皿) + 難 (Nan)', mnemonic: 'Kẻ trộm thèm khát nuốt nước bọt vét sạch bát đĩa đồ đạc.' },
      { kanji: '盛り皿', hiragana: 'もりざら (morizara)', sinoVietnamese: 'THỊNH MÃNH', meaning: 'Đĩa bày biện thức ăn lớn', level: 'N2', breakdown: '盛 (Thịnh - có bộ 皿) + 皿 (Mãnh)', mnemonic: 'Đĩa lớn bày biện thức ăn thịnh soạn.' },
      { kanji: '大皿', hiragana: 'おおざら (ōzara)', sinoVietnamese: 'ĐẠI MÃNH', meaning: 'Đĩa cỡ lớn cho bàn tiệc', level: 'N3', breakdown: '大 (Đại) + 皿 (Mãnh)', mnemonic: 'Chiếc đĩa có kích thước to rộng.' },
      { kanji: '小皿', hiragana: 'こざら (kozara)', sinoVietnamese: 'TIỂU MÃNH', meaning: 'Đĩa nhỏ chấm gia vị', level: 'N3', breakdown: '小 (Tiểu) + 皿 (Mãnh)', mnemonic: 'Chiếc đĩa nhỏ xinh đựng nước chấm.' },
      { kanji: '取り皿', hiragana: 'とりざら (torizara)', sinoVietnamese: 'THỦ MÃNH', meaning: 'Đĩa chia phần ăn', level: 'N2', breakdown: '取 (Thủ) + 皿 (Mãnh)', mnemonic: 'Đĩa dùng để gắp thức ăn chung về phần mình.' },
      { kanji: '皿洗い', hiragana: 'さらあらい (saraarai)', sinoVietnamese: 'MÃNH TẨY', meaning: 'Công việc rửa bát đĩa', level: 'N3', breakdown: '皿 (Mãnh) + 洗 (Tẩy)', mnemonic: 'Rửa sạch dầu mỡ trên bát đĩa sau bữa ăn.' },
      { kanji: '塩皿', hiragana: 'しおざら (shiozara)', sinoVietnamese: 'DIÊM MÃNH', meaning: 'Đĩa đựng muối trắng cúng', level: 'N1', breakdown: '塩 (Diêm) + 皿 (Mãnh)', mnemonic: 'Chiếc đĩa nhỏ đựng muối xua đuổi tà khí.' }
    ]
  },
  {
    stt: 109,
    strokeCount: 5,
    radical: '目',
    name: 'Mục',
    meaning: 'Con mắt, nhìn ngắm',
    mnemonic: 'Hình con mắt người xoay dọc lại, có con ngươi ở giữa quan sát.',
    relatedVocab: [
      { kanji: '目', hiragana: 'め (me)', sinoVietnamese: 'MỤC', meaning: 'Đôi mắt', level: 'N5', breakdown: '目 (Mục)', mnemonic: 'Hình dáng đôi mắt tròn xoe mở to nhìn đời.' },
      { kanji: '目的', hiragana: 'もくてき (mokuteki)', sinoVietnamese: 'MỤC ĐÍCH', meaning: 'Mục đích, đích nhắm đến', level: 'N4', breakdown: '目 (Mục) + 的 (Đích)', mnemonic: 'Tâm điểm mà đôi mắt luôn dõi theo hướng tới.' },
      { kanji: '目標', hiragana: 'もくひょう (mokuhyō)', sinoVietnamese: 'MỤC TIÊU', meaning: 'Mục tiêu phấn đấu', level: 'N3', breakdown: '目 (Mục) + 標 (Tiêu)', mnemonic: 'Cột mốc đặt ra để mắt nhìn vào mà cố gắng.' },
      { kanji: '目覚まし', hiragana: 'めざまし (mezamashi)', sinoVietnamese: 'MỤC GIÁC', meaning: 'Chuông báo thức thức giấc', level: 'N4', breakdown: '目 (Mục) + 覚 (Giác)', mnemonic: 'Đánh thức đôi mắt tỉnh dậy sau giấc ngủ say.' },
      { kanji: '注目', hiragana: 'ちゅうもく (chūmoku)', sinoVietnamese: 'CHÚ MỤC', meaning: 'Tập trung chú ý theo dõi', level: 'N3', breakdown: '注 (Chú) + 目 (Mục)', mnemonic: 'Rót mọi ánh nhìn của mắt vào một điểm.' },
      { kanji: '科目', hiragana: 'かもく (kamoku)', sinoVietnamese: 'KHOA MỤC', meaning: 'Môn học, học phần', level: 'N3', breakdown: '科 (Khoa) + 目 (Mục)', mnemonic: 'Từng mục kiến thức trong chương trình giảng dạy.' },
      { kanji: '着目', hiragana: 'ちゃくもく (chakumoku)', sinoVietnamese: 'TRƯỚC MỤC', meaning: 'Để mắt tới, chú trọng', level: 'N2', breakdown: '着 (Trước) + 目 (Mục)', mnemonic: 'Dừng ánh mắt lại trên điểm mấu chốt.' },
      { kanji: '盲目', hiragana: 'もうもく (mōmoku)', sinoVietnamese: 'MANH MỤC', meaning: 'Mù quáng, mù lòa', level: 'N1', breakdown: '盲 (Manh - có bộ 目) + 目 (Mục)', mnemonic: 'Mắt không nhìn thấy được ánh sáng chân lý.' },
      { kanji: '面目', hiragana: 'めんぼく (menboku)', sinoVietnamese: 'DIỆN MỤC', meaning: 'Thể diện, danh dự', level: 'N1', breakdown: '面 (Diện) + 目 (Mục)', mnemonic: 'Mặt mũi và danh dự trước mắt bàn dân thiên hạ.' },
      { kanji: '目次', hiragana: 'もくじ (mokuji)', sinoVietnamese: 'MỤC THỨ', meaning: 'Mục lục cuốn sách', level: 'N3', breakdown: '目 (Mục) + 次 (Thứ)', mnemonic: 'Thứ tự các mục được liệt kê rõ ràng đầu sách.' }
    ]
  },
  {
    stt: 110,
    strokeCount: 5,
    radical: '矛',
    name: 'Mâu',
    meaning: 'Cây giáo để đâm',
    mnemonic: 'Hình mũi giáo nhọn hoắt có móc khuyên ở thân.',
    relatedVocab: [
      { kanji: '矛盾', hiragana: 'むじゅん (mujun)', sinoVietnamese: 'MÂU THUẪN', meaning: 'Mâu thuẫn, trái ngược', level: 'N3', breakdown: '矛 (Mâu - ngọn giáo) + 盾 (Thuẫn - cái khiên)', mnemonic: 'Ngọn giáo đâm thủng mọi khiên vs cái khiên đỡ mọi giáo.' },
      { kanji: '矛先', hiragana: 'ほこさき (hokosaki)', sinoVietnamese: 'MÂU TIÊN', meaning: 'Mũi giáo nhọn, mũi dùi công kích', level: 'N1', breakdown: '矛 (Mâu) + 先 (Tiên)', mnemonic: 'Chĩa mũi giáo nhọn vào đối thủ công kích.' },
      { kanji: '務める', hiragana: 'つとめる (tsutomeru)', sinoVietnamese: 'VỤ', meaning: 'Đảm nhiệm nhiệm vụ', level: 'N3', breakdown: '務 (chứa bộ 矛) + 力 (Lực)', mnemonic: 'Cầm giáo dốc sức làm tròn bổn phận.' },
      { kanji: '柔道', hiragana: 'じゅうどう (jūdō)', sinoVietnamese: 'NHU ĐẠO', meaning: 'Môn võ Judo', level: 'N3', breakdown: '柔 (Nhu - chứa bộ 矛) + 道 (Đạo)', mnemonic: 'Mềm dẻo uốn nắn như cán giáo tre bền bỉ.' },
      { kanji: '義務', hiragana: 'ぎむ (gimu)', sinoVietnamese: 'NGHĨA VỤ', meaning: 'Nghĩa vụ, bổn phận', level: 'N3', breakdown: '義 (Nghĩa) + 務 (Vụ - có bộ 矛)', mnemonic: 'Bổn phận chính đáng người lính cầm giáo giữ nước.' },
      { kanji: '事務所', hiragana: 'じむしょ (jimusho)', sinoVietnamese: 'SỰ VỤ SỞ', meaning: 'Văn phòng làm việc', level: 'N4', breakdown: '事 (Sự) + 務 (Vụ) + 所 (Sở)', mnemonic: 'Nơi giải quyết mọi sự vụ công tác hành chính.' },
      { kanji: '公務員', hiragana: 'こうむいん (kōmuin)', sinoVietnamese: 'CÔNG VỤ VIÊN', meaning: 'Công chức nhà nước', level: 'N3', breakdown: '公 (Công) + 務 (Vụ) + 員 (Viên)', mnemonic: 'Người đảm nhận công vụ phục vụ đất nước.' },
      { kanji: '柔軟', hiragana: 'じゅうなん (jūnan)', sinoVietnamese: 'NHU NHUYỄN', meaning: 'Linh hoạt, dẻo dai', level: 'N2', breakdown: '柔 (Nhu - có 矛) + 軟 (Nhuyễn)', mnemonic: 'Dẻo dai mềm mại ứng phó mọi tình huống.' },
      { kanji: '財務', hiragana: 'ざいむ (zaimu)', sinoVietnamese: 'TÀI VỤ', meaning: 'Tài chính kế toán', level: 'N1', breakdown: '財 (Tài) + 務 (Vụ)', mnemonic: 'Công việc quản lý dòng tiền tài chính.' },
      { kanji: '教務', hiragana: 'きょうむ (kyōmu)', sinoVietnamese: 'GIÁO VỤ', meaning: 'Công tác giáo vụ nhà trường', level: 'N1', breakdown: '教 (Giáo) + 務 (Vụ)', mnemonic: 'Công tác quản lý việc dạy và học.' }
    ]
  },
  {
    stt: 111,
    strokeCount: 5,
    radical: '矢',
    name: 'Thỉ',
    meaning: 'Mũi tên bắn',
    mnemonic: 'Hình mũi tên có đầu nhọn phía trên và đuôi lông vũ phía dưới.',
    relatedVocab: [
      { kanji: '矢', hiragana: 'や (ya)', sinoVietnamese: 'THỈ', meaning: 'Mũi tên bay vút', level: 'N3', breakdown: '矢 (Thỉ)', mnemonic: 'Mũi tên có đầu nhọn và lông vũ đuôi bay thẳng.' },
      { kanji: '弓矢', hiragana: 'ゆみや (yumiya)', sinoVietnamese: 'CUNG THỈ', meaning: 'Cung tên thiện xạ', level: 'N2', breakdown: '弓 (Cung) + 矢 (Thỉ)', mnemonic: 'Cây cung kéo căng bắn mũi tên lao vút đi.' },
      { kanji: '矢印', hiragana: 'やじるし (yajirushi)', sinoVietnamese: 'THỈ ẤN', meaning: 'Dấu mũi tên chỉ hướng', level: 'N3', breakdown: '矢 (Thỉ) + 印 (Ấn)', mnemonic: 'Ký hiệu hình mũi tên dẫn dắt phương hướng.' },
      { kanji: '知る', hiragana: 'しる (shiru)', sinoVietnamese: 'TRI', meaning: 'Biết, hiểu biết', level: 'N5', breakdown: '矢 (Thỉ) + 口 (Khẩu)', mnemonic: 'Lời nói ra nhanh và chuẩn xác như mũi tên bắn.' },
      { kanji: '短い', hiragana: 'みじかい (mijikai)', sinoVietnamese: 'ĐOẢN', meaning: 'Ngắn ngủi', level: 'N5', breakdown: '矢 (Thỉ) + 豆 (Đậu)', mnemonic: 'Mũi tên ngắn như hạt đậu.' },
      { kanji: '知識', hiragana: 'ちしき (chishiki)', sinoVietnamese: 'TRI THỨC', meaning: 'Tri thức, hiểu biết', level: 'N3', breakdown: '知 (Tri) + 識 (Thức)', mnemonic: 'Kiến thức sâu rộng nhận biết mọi điều.' },
      { kanji: '短縮', hiragana: 'たんしゅく (tanshuku)', sinoVietnamese: 'ĐOẢN SÚC', meaning: 'Rút ngắn thời gian/khoảng cách', level: 'N2', breakdown: '短 (Đoản) + 縮 (Súc)', mnemonic: 'Thu ngắn khoảng cách giúp tiết kiệm công sức.' },
      { kanji: '矯正', hiragana: 'きょうせい (kyōsei)', sinoVietnamese: 'KIỂU CHÍNH', meaning: 'Uốn nắn, chỉnh sửa ngay ngắn', level: 'N1', breakdown: '矯 (Kiểu - có bộ 矢) + 正 (Chính)', mnemonic: 'Uốn cho thẳng thắn như mũi tên săn bắn.' },
      { kanji: '矢継ぎ早', hiragana: 'やつぎばや (yatsugibaya)', sinoVietnamese: 'THỈ KẾ TẢO', meaning: 'Dồn dập liên tiếp như mưa tên', level: 'N1', breakdown: '矢 (Thỉ) + 継 (Kế) + 早 (Tảo)', mnemonic: 'Bắn tên liên hoàn không ngơi nghỉ.' },
      { kanji: '知人', hiragana: 'ちじん (chijin)', sinoVietnamese: 'TRI NHÂN', meaning: 'Người quen biết', level: 'N3', breakdown: '知 (Tri) + 人 (Nhân)', mnemonic: 'Người mình quen mặt biết tên.' }
    ]
  },
  {
    stt: 112,
    strokeCount: 5,
    radical: '石',
    name: 'Thạch',
    meaning: 'Hòn đá, sỏi đá',
    mnemonic: 'Hòn đá (口) lăn từ dưới vách núi (厂) xuống mặt đất.',
    relatedVocab: [
      { kanji: '石', hiragana: 'いし (ishi)', sinoVietnamese: 'THẠCH', meaning: 'Hòn đá cuội, đá tảng', level: 'N5', breakdown: '石 (Thạch)', mnemonic: 'Hòn đá rơi từ vách đá cheo leo xuống sườn núi.' },
      { kanji: '石油', hiragana: 'せきゆ (sekiyu)', sinoVietnamese: 'THẠCH DU', meaning: 'Dầu mỏ, dầu thô', level: 'N4', breakdown: '石 (Thạch) + 油 (Du)', mnemonic: 'Thứ dầu quý giá khai thác từ tầng đá sâu.' },
      { kanji: '化石', hiragana: 'かせき (kaseki)', sinoVietnamese: 'HÓA THẠCH', meaning: 'Hóa thạch cổ sinh vật', level: 'N2', breakdown: '化 (Hóa) + 石 (Thạch)', mnemonic: 'Xương sinh vật biến đổi ngàn năm thành đá cứng.' },
      { kanji: '磁石', hiragana: 'じしゃく (jishaku)', sinoVietnamese: 'TỪ THẠCH', meaning: 'Nam châm hút sắt', level: 'N2', breakdown: '磁 (Từ) + 石 (Thạch)', mnemonic: 'Hòn đá có từ tính hút kim loại mạnh mẽ.' },
      { kanji: '宝石', hiragana: 'ほうせき (hōseki)', sinoVietnamese: 'BẢO THẠCH', meaning: 'Đá quý lấp lánh', level: 'N2', breakdown: '宝 (Bảo) + 石 (Thạch)', mnemonic: 'Viên đá quý báu tỏa ánh hào quang.' },
      { kanji: '石炭', hiragana: 'せきたん (sekitan)', sinoVietnamese: 'THẠCH THAN', meaning: 'Than đá đốt nhiệt', level: 'N3', breakdown: '石 (Thạch) + 炭 (Than)', mnemonic: 'Than đen như đá dùng làm chất đốt công nghiệp.' },
      { kanji: '石鹸', hiragana: 'せっけん (sekken)', sinoVietnamese: 'THẠCH KIỀM', meaning: 'Xà phòng bánh', level: 'N4', breakdown: '石 (Thạch) + 鹸 (Kiềm)', mnemonic: 'Cục xà bông cứng như đá tắm sạch sẽ thơm tho.' },
      { kanji: '礎石', hiragana: 'そせき (soseki)', sinoVietnamese: 'SỞ THẠCH', meaning: 'Đá móng, nền tảng cốt lõi', level: 'N1', breakdown: '礎 (Sở) + 石 (Thạch)', mnemonic: 'Tảng đá đặt nền móng dựng xây cơ đồ.' },
      { kanji: '投石', hiragana: 'とうせき (tōseki)', sinoVietnamese: 'ĐẦU THẠCH', meaning: 'Ném đá', level: 'N1', breakdown: '投 (Đầu) + 石 (Thạch)', mnemonic: 'Ném những hòn đá bay về phía trước.' },
      { kanji: '墓石', hiragana: 'ぼせき (boseki)', sinoVietnamese: 'MỘ THẠCH', meaning: 'Bia mộ bằng đá', level: 'N1', breakdown: '墓 (Mộ) + 石 (Thạch)', mnemonic: 'Tấm bia đá tưởng nhớ người đã khuất.' }
    ]
  },
  {
    stt: 113,
    strokeCount: 5,
    radical: '示',
    variants: ['礻'],
    name: 'Thị, kỳ',
    meaning: 'Chỉ thị, thần linh, bàn thờ',
    mnemonic: 'Chiếc bàn thờ có chân cao dùng để dâng lễ vật cúng thần linh (1 chấm phải).',
    relatedVocab: [
      { kanji: '指示', hiragana: 'しじ (shiji)', sinoVietnamese: 'CHỈ THỊ', meaning: 'Chỉ thị, hướng dẫn', level: 'N3', breakdown: '指 (Chỉ) + 示 (Thị)', mnemonic: 'Ngón tay chỉ dẫn bảo ban mệnh lệnh.' },
      { kanji: '示す', hiragana: 'しめす (shimesu)', sinoVietnamese: 'THỊ', meaning: 'Chỉ ra, biểu thị', level: 'N3', breakdown: '示 (Thị)', mnemonic: 'Đưa ra dẫn chứng soi sáng chân lý.' },
      { kanji: '神社', hiragana: 'じんじゃ (jinja)', sinoVietnamese: 'THẦN XÃ', meaning: 'Đền thờ Thần đạo Shinto', level: 'N4', breakdown: '神 (Thần - có 礻) + 社 (Xã - có 礻)', mnemonic: 'Nơi thờ phụng các vị thần linh che chở dân chúng.' },
      { kanji: '神様', hiragana: 'かみさま (kamisama)', sinoVietnamese: 'THẦN DẠNG', meaning: 'Thần linh, Thượng đế', level: 'N4', breakdown: '神 (Thần) + 様 (Dạng)', mnemonic: 'Đấng thần linh tối cao ban phước lành.' },
      { kanji: '祈る', hiragana: 'いのる (inoru)', sinoVietnamese: 'KỲ', meaning: 'Cầu nguyện thành tâm', level: 'N4', breakdown: '祈 (Kỳ - có 礻)', mnemonic: 'Đứng trước bàn thờ thần cầm rìu tế lễ cầu an.' },
      { kanji: '祝う', hiragana: 'いわう (iwau)', sinoVietnamese: 'CHÚC', meaning: 'Chúc mừng hân hoan', level: 'N4', breakdown: '祝 (Chúc - có 礻)', mnemonic: 'Lời chúc phúc thành kính trước đấng thần linh.' },
      { kanji: '祭り', hiragana: 'まつり (matsuri)', sinoVietnamese: 'TẾ', meaning: 'Lễ hội dân gian', level: 'N4', breakdown: '祭 (Tế - có 示)', mnemonic: 'Dâng lễ vật lên bàn thờ thần trong ngày hội tưng bừng.' },
      { kanji: '礼儀', hiragana: 'れいぎ (reigi)', sinoVietnamese: 'LỄ NGHI', meaning: 'Lễ nghi, phép tắc cư xử', level: 'N3', breakdown: '礼 (Lễ - có 礻) + 儀 (Nghi)', mnemonic: 'Phép tắc cung kính khi đối diện bề trên.' },
      { kanji: '福祉', hiragana: 'ふくし (fukushi)', sinoVietnamese: 'PHÚC CHỈ', meaning: 'Phúc lợi xã hội', level: 'N2', breakdown: '福 (Phúc - có 礻) + 祉 (Chỉ - có 礻)', mnemonic: 'Hồng ân may mắn thần ban cho muôn dân ấm no.' },
      { kanji: '禁煙', hiragana: 'きんえん (kin\'en)', sinoVietnamese: 'CẤM YÊN', meaning: 'Cấm hút thuốc', level: 'N4', breakdown: '禁 (Cấm - có 示) + 煙 (Yên)', mnemonic: 'Quy định linh thiêng nghiêm cấm khói thuốc độc hại.' }
    ]
  },
  {
    stt: 114,
    strokeCount: 5,
    radical: '禸',
    name: 'Nhựu',
    meaning: 'Vết chân thú, lốt chân',
    mnemonic: 'Dấu chân thú vật in hằn sâu xuống nền đất mềm.',
    relatedVocab: [
      { kanji: '獣脚', hiragana: 'じゅうきゃく (jūkyaku)', sinoVietnamese: 'THÚ CƯỚC', meaning: 'Chân thú móng vuốt', level: 'N1', breakdown: 'Chứa nghĩa vết chân thú 禸', mnemonic: 'Dấu chân móng vuốt thú rừng in sâu trên nền đất tuyết.' },
      { kanji: '離れる', hiragana: 'はなれる (hanareru)', sinoVietnamese: 'LY', meaning: 'Rời xa, tách rời', level: 'N4', breakdown: '離 (Ly - có bộ 禸)', mnemonic: 'Con chim cất cánh để lại dấu chân thú xa dần.' },
      { kanji: '離婚', hiragana: 'りこん (rikon)', sinoVietnamese: 'LY HÔN', meaning: 'Ly hôn, chia tay', level: 'N3', breakdown: '離 (Ly) + 婚 (Hôn)', mnemonic: 'Rời xa cuộc sống hôn nhân.' },
      { kanji: '距離', hiragana: 'きょり (kyori)', sinoVietnamese: 'CỰ LY', meaning: 'Khoảng cách cự ly', level: 'N2', breakdown: '距 (Cự) + 離 (Ly)', mnemonic: 'Khoảng cách không gian ngăn cách đôi bên.' },
      { kanji: '隔離', hiragana: 'かくり (kakuri)', sinoVietnamese: 'CÁCH LY', meaning: 'Cách ly phòng ngừa', level: 'N1', breakdown: '隔 (Cách) + 離 (Ly)', mnemonic: 'Tách biệt cách ly nguồn lây nhiễm.' },
      { kanji: '分離', hiragana: 'ぶんり (bunri)', sinoVietnamese: 'PHÂN LY', meaning: 'Phân chia, tách lọc', level: 'N2', breakdown: '分 (Phân) + 離 (Ly)', mnemonic: 'Tách bạch các thành phần ra khỏi nhau.' },
      { kanji: '見離す', hiragana: 'みはなす (mihanasu)', sinoVietnamese: 'KIẾN LY', meaning: 'Bỏ rơi, quay lưng', level: 'N1', breakdown: '見 (Kiến) + 離 (Ly)', mnemonic: 'Nhìn người khác rời xa mà bỏ mặc.' },
      { kanji: '離陸', hiragana: 'りりく (ririku)', sinoVietnamese: 'LY LỤC', meaning: 'Máy bay cất cánh rời mặt đất', level: 'N2', breakdown: '離 (Ly) + 陸 (Lục)', mnemonic: 'Rời khỏi mặt đất bay vút lên bầu trời.' },
      { kanji: '離脱', hiragana: 'りだつ (ridatsu)', sinoVietnamese: 'LY THOÁT', meaning: 'Rút lui, ly khai khỏi tổ chức', level: 'N1', breakdown: '離 (Ly) + 脱 (Thoát)', mnemonic: 'Rút lui thoát ra khỏi liên minh.' },
      { kanji: '乖離', hiragana: 'かいり (kairi)', sinoVietnamese: 'QUAI LY', meaning: 'Sai lệch, xa rời thực tế', level: 'N1', breakdown: '乖 (Quai) + 離 (Ly)', mnemonic: 'Lệch lạc xa rời hẳn với thực tiễn khách quan.' }
    ]
  },
  {
    stt: 115,
    strokeCount: 5,
    radical: '禾',
    name: 'Hòa',
    meaning: 'Cây lúa trĩu hạt',
    mnemonic: 'Cây (Mộc 木) có bông lúa trĩu hạt rủ cong xuống ở trên ngọn (nét phẩy).',
    relatedVocab: [
      { kanji: '私', hiragana: 'わたし (watashi)', sinoVietnamese: 'TƯ', meaning: 'Tôi, bản thân', level: 'N5', breakdown: '禾 (Hòa) + 厶 (Khư - riêng tư)', mnemonic: 'Lúa gạo thu hoạch về làm của riêng bản thân mình.' },
      { kanji: '秋', hiragana: 'あき (aki)', sinoVietnamese: 'THU', meaning: 'Mùa thu lá vàng', level: 'N5', breakdown: '禾 (Hòa) + 火 (Hỏa)', mnemonic: 'Mùa lúa chín vàng ươm dưới nắng như ngọn lửa sưởi ấm.' },
      { kanji: '科学', hiragana: 'かがく (kagaku)', sinoVietnamese: 'KHOA HỌC', meaning: 'Khoa học kỹ thuật', level: 'N4', breakdown: '科 (Khoa - có 禾) + 学 (Học)', mnemonic: 'Đong đếm từng nhánh lúa nghiên cứu thành tựu khoa học.' },
      { kanji: '科目', hiragana: 'かもく (kamoku)', sinoVietnamese: 'KHOA MỤC', meaning: 'Môn học giáo trình', level: 'N3', breakdown: '科 (Khoa) + 目 (Mục)', mnemonic: 'Các phân môn chi tiết rõ ràng.' },
      { kanji: '季節', hiragana: 'きせつ (kisetsu)', sinoVietnamese: 'QUÝ TIẾT', meaning: 'Mùa màng trong năm', level: 'N4', breakdown: '季 (Quý - có 禾) + 節 (Tiết)', mnemonic: 'Vụ mùa lúa nuôi sống con thơ suốt các mùa.' },
      { kanji: '税金', hiragana: 'ぜいきん (zeikin)', sinoVietnamese: 'THUẾ KIM', meaning: 'Tiền thuế nộp nhà nước', level: 'N3', breakdown: '税 (Thuế - có 禾) + 金 (Kim)', mnemonic: 'Thời xưa nộp thuế bằng lúa gạo mùa màng.' },
      { kanji: '穀物', hiragana: 'こくもつ (kokumotsu)', sinoVietnamese: 'CỐC VẬT', meaning: 'Ngũ cốc lương thực', level: 'N2', breakdown: '穀 (Cốc - có 禾) + 物 (Vật)', mnemonic: 'Hạt lúa gạo ngũ cốc nuôi sống muôn loài.' },
      { kanji: '移る', hiragana: 'うつる (utsuru)', sinoVietnamese: 'DI', meaning: 'Di chuyển, lây lan', level: 'N3', breakdown: '移 (Di - có 禾)', mnemonic: 'Cấy chuyển từng nhánh lúa từ ruộng này sang ruộng khác.' },
      { kanji: '穏やか', hiragana: 'おだやか (odayaka)', sinoVietnamese: 'ỔN', meaning: 'Yên bình, ôn hòa', level: 'N2', breakdown: '穏 (Ổn - có 禾)', mnemonic: 'Lúa thóc đầy bồ, cuộc sống yên bình ấm no.' },
      { kanji: '秘密', hiragana: 'ひみつ (himitsu)', sinoVietnamese: 'BÍ MẬT', meaning: 'Bí mật kín đáo', level: 'N3', breakdown: '秘 (Bí - có 禾) + 密 (Mật)', mnemonic: 'Giấu kỹ giống lúa quý trong lòng sâu kín đáo.' }
    ]
  },
  {
    stt: 116,
    strokeCount: 5,
    radical: '穴',
    name: 'Huyệt',
    meaning: 'Hang động, lỗ hổng',
    mnemonic: 'Mái vòm (Miên 宀) được đào khoét rộng ra hai bên (Bát 八) tạo thành hang động.',
    relatedVocab: [
      { kanji: '穴', hiragana: 'あな (ana)', sinoVietnamese: 'HUYỆT', meaning: 'Hang hốc, lỗ thủng', level: 'N3', breakdown: '穴 (Huyệt)', mnemonic: 'Cửa hang khoét sâu dưới mái che vách núi.' },
      { kanji: '空間', hiragana: 'くうかん (kūkan)', sinoVietnamese: 'KHÔNG GIAN', meaning: 'Không gian đa chiều', level: 'N3', breakdown: '空 (Không - có 穴) + 間 (Gian)', mnemonic: 'Khoảng không bao la khoáng đạt vô tận.' },
      { kanji: '空気', hiragana: 'くうき (kūki)', sinoVietnamese: 'KHÔNG KHÍ', meaning: 'Không khí thở trong lành', level: 'N5', breakdown: '空 (Không) + 気 (Khí)', mnemonic: 'Bầu không khí trong lành nuôi dưỡng sự sống.' },
      { kanji: '研究', hiragana: 'けんきゅう (kenkyū)', sinoVietnamese: 'NGHIÊN CỨU', meaning: 'Nghiên cứu khoa học', level: 'N5', breakdown: '研 (Nghiên) + 究 (Cứu - có 穴)', mnemonic: 'Mài giũa đào sâu vào tận hang cùng ngõ hẻm tri thức.' },
      { kanji: '突く', hiragana: 'つく (tsuku)', sinoVietnamese: 'ĐỘT', meaning: 'Đâm thủng, chọc mạnh', level: 'N2', breakdown: '突 (Đột - có 穴)', mnemonic: 'Con chó lao vọt ra từ miệng hang tấn công bất ngờ.' },
      { kanji: '突然', hiragana: 'とつぜん (totsuzen)', sinoVietnamese: 'ĐỘT NHIÊN', meaning: 'Đột nhiên, bất thình lình', level: 'N3', breakdown: '突 (Đột) + 然 (Nhiên)', mnemonic: 'Bất ngờ xuất hiện như lao vút ra khỏi hang tối.' },
      { kanji: '洞穴', hiragana: 'ほらあな (horaana)', sinoVietnamese: 'ĐỖNG HUYỆT', meaning: 'Hang động hoang sơ', level: 'N1', breakdown: '洞 (Đỗng) + 穴 (Huyệt)', mnemonic: 'Hang sâu hun hút trong lòng núi đá vôi.' },
      { kanji: '墓穴', hiragana: 'ぼけつ (boketsu)', sinoVietnamese: 'MỘ HUYỆT', meaning: 'Huyệt mộ chôn cất', level: 'N1', breakdown: '墓 (Mộ) + 穴 (Huyệt)', mnemonic: 'Huyệt sâu đào dưới lòng đất an nghỉ vĩnh hằng.' },
      { kanji: '落とし穴', hiragana: 'おとしあな (otoshiana)', sinoVietnamese: 'LẠC HUYỆT', meaning: 'Cạm bẫy, hố sụp bất ngờ', level: 'N1', breakdown: '落 (Lạc) + 穴 (Huyệt)', mnemonic: 'Chiếc hố nguy hiểm ngụy trang để giăng bẫy thú.' },
      { kanji: '窒息', hiragana: 'ちっそく (chissoku)', sinoVietnamese: 'TRÁI TỨC', meaning: 'Nghẹt thở, ngạt khí', level: 'N1', breakdown: '窒 (Trái - có 穴) + 息 (Tức)', mnemonic: 'Bị bít kín trong hang hốc không còn không khí thở.' }
    ]
  },
  {
    stt: 117,
    strokeCount: 5,
    radical: '立',
    name: 'Lập',
    meaning: 'Đứng thẳng, thành lập',
    mnemonic: 'Hình một người (Đại 大) đứng thẳng vững chãi trên mặt đất (nét ngang dưới).',
    relatedVocab: [
      { kanji: '立つ', hiragana: 'たつ (tatsu)', sinoVietnamese: 'LẬP', meaning: 'Đứng dậy, đứng thẳng', level: 'N5', breakdown: '立 (Lập)', mnemonic: 'Con người đứng hiên ngang vững chãi hai chân trên mặt đất.' },
      { kanji: '独立', hiragana: 'どくりつ (dokuritsu)', sinoVietnamese: 'ĐỘC LẬP', meaning: 'Độc lập, tự chủ', level: 'N3', breakdown: '独 (Độc) + 立 (Lập)', mnemonic: 'Tự mình đứng vững vàng không phụ thuộc vào ai.' },
      { kanji: '立派', hiragana: 'りっぱ (rippa)', sinoVietnamese: 'LẬP PHÁI', meaning: 'Hào nhoáng, đàng hoàng, tuyệt vời', level: 'N4', breakdown: '立 (Lập) + 派 (Phái)', mnemonic: 'Tư thế hiên ngang đàng hoàng xứng bậc anh tài.' },
      { kanji: '設立', hiragana: 'せつりつ (setsuritsu)', sinoVietnamese: 'THIẾT LẬP', meaning: 'Thành lập công ty, tổ chức', level: 'N2', breakdown: '設 (Thiết) + 立 (Lập)', mnemonic: 'Xây dựng và dựng nên tổ chức mới.' },
      { kanji: '国立', hiragana: 'こくりつ (kokuritsu)', sinoVietnamese: 'QUỐC LẬP', meaning: 'Thuộc quốc gia, công lập', level: 'N3', breakdown: '国 (Quốc) + 立 (Lập)', mnemonic: 'Cơ sở do nhà nước xây dựng và điều hành.' },
      { kanji: '私立', hiragana: 'しりつ (shiritsu)', sinoVietnamese: 'TƯ LẬP', meaning: 'Dân lập, tư thục', level: 'N3', breakdown: '私 (Tư) + 立 (Lập)', mnemonic: 'Trường lớp do tư nhân bỏ vốn gây dựng.' },
      { kanji: '成立', hiragana: 'せいりつ (seiritsu)', sinoVietnamese: 'THÀNH LẬP', meaning: 'Thành lập, thông qua hợp đồng', level: 'N2', breakdown: '成 (Thành) + 立 (Lập)', mnemonic: 'Sự việc hoàn thành và chính thức có hiệu lực.' },
      { kanji: '対立', hiragana: 'たいりつ (tairitsu)', sinoVietnamese: 'ĐỐI LẬP', meaning: 'Đối đầu, bất đồng quan điểm', level: 'N2', breakdown: '対 (Đối) + 立 (Lập)', mnemonic: 'Đứng đối diện nhau kịch liệt tranh luận.' },
      { kanji: '起立', hiragana: 'きりつ (kiritsu)', sinoVietnamese: 'KHỞI LẬP', meaning: 'Đứng dậy nghiêm trang chào', level: 'N2', breakdown: '起 (Khởi) + 立 (Lập)', mnemonic: 'Cùng đồng loạt đứng dậy biểu thị lòng tôn trọng.' },
      { kanji: '目立つ', hiragana: 'めだつ (medatsu)', sinoVietnamese: 'MỤC LẬP', meaning: 'Nổi bật, đập vào mắt', level: 'N3', breakdown: '目 (Mục) + 立 (Lập)', mnemonic: 'Nổi bật đứng sừng sững thu hút mọi ánh nhìn.' }
    ]
  },
  // Nhóm 6 nét (Bộ 118 – 146)
  {
    stt: 118,
    strokeCount: 6,
    radical: '竹',
    variants: ['⺮'],
    name: 'Trúc',
    meaning: 'Cây tre, cây trúc',
    mnemonic: 'Hình hai khóm lá tre rủ xuống cạnh nhau thanh nhã.',
    relatedVocab: [
      { kanji: '竹', hiragana: 'たけ (take)', sinoVietnamese: 'TRÚC', meaning: 'Cây tre, bụi trúc', level: 'N3', breakdown: '竹 (Trúc)', mnemonic: 'Hai nhánh tre đung đưa với những phiến lá nhọn.' },
      { kanji: '笛', hiragana: 'ふえ (fue)', sinoVietnamese: 'ĐỊCH', meaning: 'Cây sáo trúc, tiếng còi', level: 'N2', breakdown: '竹 (Trúc) + 由 (Do)', mnemonic: 'Ống tre khoét lỗ phát ra âm thanh du dương.' },
      { kanji: '筆', hiragana: 'ふで (fude)', sinoVietnamese: 'BÚT', meaning: 'Bút lông viết chữ nho', level: 'N2', breakdown: '竹 (Trúc) + 聿 (Duật - tay cầm bút)', mnemonic: 'Cây bút làm bằng cán trúc gắn lông mềm mềm.' },
      { kanji: '答える', hiragana: 'こたえる (kotaeru)', sinoVietnamese: 'ĐÁP', meaning: 'Trả lời câu hỏi', level: 'N5', breakdown: '竹 (Trúc) + 合 (Hợp)', mnemonic: 'Gieo quẻ thẻ tre xem ý trời rồi đối đáp rõ ràng.' },
      { kanji: '箱', hiragana: 'はこ (hako)', sinoVietnamese: 'TƯƠNG', meaning: 'Cái hộp, thùng chứa', level: 'N4', breakdown: '竹 (Trúc) + 相 (Tương)', mnemonic: 'Chiếc hộp đan bằng cật tre chứa đựng đồ vật.' },
      { kanji: '笑う', hiragana: 'わらう (warau)', sinoVietnamese: 'TIẾU', meaning: 'Cười vui vẻ, mỉm cười', level: 'N5', breakdown: '竹 (Trúc) + 夭 (Yêu)', mnemonic: 'Nghe tiếng tre xào xạc trong gió như tiếng cười rộn rã.' },
      { kanji: '簡単', hiragana: 'かんたん (kantan)', sinoVietnamese: 'GIẢN ĐƠN', meaning: 'Đơn giản, dễ dàng', level: 'N4', breakdown: '簡 (Giản - có ⺮) + 単 (Đơn)', mnemonic: 'Thẻ tre biên chép ngắn gọn súc tích dễ hiểu.' },
      { kanji: '節約', hiragana: 'せつやく (setsuyaku)', sinoVietnamese: 'TIẾT ƯỚC', meaning: 'Tiết kiệm chi tiêu', level: 'N3', breakdown: '節 (Tiết - có ⺮) + 約 (Ước)', mnemonic: 'Từng đốt tre ngay ngắn nhắc nhở chi tiêu có chừng mực.' },
      { kanji: '箸', hiragana: 'はし (hashi)', sinoVietnamese: 'TRỢ', meaning: 'Đôi đũa ăn cơm', level: 'N4', breakdown: '竹 (Trúc) + 者 (Giả)', mnemonic: 'Đôi đũa vót bằng cật tre dùng trong bữa cơm.' },
      { kanji: '竹の子', hiragana: 'たけのこ (takenoko)', sinoVietnamese: 'TRÚC TỬ', meaning: 'Búp măng non ngọt giòn', level: 'N3', breakdown: '竹 (Trúc) + 子 (Tử)', mnemonic: 'Búp măng con mọc lên từ gốc tre già sau mưa.' }
    ]
  },
  {
    stt: 119,
    strokeCount: 6,
    radical: '米',
    name: 'Mễ',
    meaning: 'Gạo, hạt cơm',
    mnemonic: 'Bông lúa được đập tách hạt gạo bắn ra bốn phía xung quanh cây (Mộc 木).',
    relatedVocab: [
      { kanji: '米', hiragana: 'こめ (kome)', sinoVietnamese: 'MỄ', meaning: 'Hạt gạo trắng ngần', level: 'N4', breakdown: '米 (Mễ)', mnemonic: 'Bốn hạt gạo tỏa đều quanh bông lúa.' },
      { kanji: '米国', hiragana: 'べいこく (beikoku)', sinoVietnamese: 'MỄ QUỐC', meaning: 'Nước Mỹ (Hoa Kỳ)', level: 'N3', breakdown: '米 (Mễ) + 国 (Quốc)', mnemonic: 'Tên viết tắt của đất nước cờ hoa Hoa Kỳ.' },
      { kanji: '料理', hiragana: 'りょうり (ryōri)', sinoVietnamese: 'LIỆU LÝ', meaning: 'Món ăn, nấu nướng', level: 'N5', breakdown: '料 (Liệu - có 米) + 理 (Lý)', mnemonic: 'Đong gạo và nguyên liệu nấu thành món ăn ngon miệng.' },
      { kanji: '玄米', hiragana: 'げんまい (genmai)', sinoVietnamese: 'HUYỀN MỄ', meaning: 'Gạo lứt dinh dưỡng', level: 'N2', breakdown: '玄 (Huyền) + 米 (Mễ)', mnemonic: 'Hạt gạo giữ nguyên lớp vỏ cám sẫm màu bổ dưỡng.' },
      { kanji: '白米', hiragana: 'はくまい (hakumai)', sinoVietnamese: 'BẠCH MỄ', meaning: 'Gạo trắng xay xát kỹ', level: 'N2', breakdown: '白 (Bạch) + 米 (Mễ)', mnemonic: 'Gạo đã được giã trắng muốt tinh khiết.' },
      { kanji: '精米', hiragana: 'せいまい (seimai)', sinoVietnamese: 'TINH MỄ', meaning: 'Xay xát hạt gạo tinh xảo', level: 'N1', breakdown: '精 (Tinh - có 米) + 米 (Mễ)', mnemonic: 'Quá trình chà xát cho hạt gạo bóng bẩy.' },
      { kanji: '粉末', hiragana: 'ふんまつ (funmatsu)', sinoVietnamese: 'PHẤN MẠT', meaning: 'Bột mịn, dạng bột', level: 'N1', breakdown: '粉 (Phấn - có 米) + 末 (Mạt)', mnemonic: 'Hạt gạo nghiền nát thành bột mịn nấu cháo.' },
      { kanji: '粗末', hiragana: 'そまつ (somatsu)', sinoVietnamese: 'THÔ MẠT', meaning: 'Sơ sài, đạm bạc / lãng phí', level: 'N2', breakdown: '粗 (Thô - có 米) + 末 (Mạt)', mnemonic: 'Bữa cơm đạm bạc chỉ có gạo thô sơ.' },
      { kanji: '粒', hiragana: 'つぶ (tsubu)', sinoVietnamese: 'LẠP', meaning: 'Hạt nhỏ li ti', level: 'N2', breakdown: '米 (Mễ) + 立 (Lập)', mnemonic: 'Từng hạt gạo đứng tách rời nhỏ nhắn.' },
      { kanji: '新米', hiragana: 'しんまい (shinmai)', sinoVietnamese: 'TÂN MỄ', meaning: 'Gạo mới đầu mùa / người mới vào nghề', level: 'N2', breakdown: '新 (Tân) + 米 (Mễ)', mnemonic: 'Hạt gạo vụ mới thơm dẻo, cũng chỉ lính mới ngây thơ.' }
    ]
  },
  {
    stt: 120,
    strokeCount: 6,
    radical: '糸',
    variants: ['糹'],
    name: 'Mịch',
    meaning: 'Sợi tơ nhỏ, dệt may',
    mnemonic: 'Hai cuộn tơ (幺) được buộc túm lại ở phần đuôi sợi bên dưới (小).',
    relatedVocab: [
      { kanji: '糸', hiragana: 'いと (ito)', sinoVietnamese: 'MỊCH', meaning: 'Sợi chỉ, sợi tơ dệt', level: 'N4', breakdown: '糸 (Mịch)', mnemonic: 'Cuộn tơ tằm thắt lại với những sợi chỉ buông dài.' },
      { kanji: '約束', hiragana: 'やくそく (yakusoku)', sinoVietnamese: 'ƯỚC THÚC', meaning: 'Lời hứa, cuộc hẹn', level: 'N5', breakdown: '約 (Ước - có 糹) + 束 (Thúc)', mnemonic: 'Sợi chỉ thắt chặt kết nối niềm tin giao ước.' },
      { kanji: '結ぶ', hiragana: 'むすぶ (musubu)', sinoVietnamese: 'KẾT', meaning: 'Buộc lại, thắt nút, ký kết', level: 'N4', breakdown: '結 (Kết - có 糹)', mnemonic: 'Buộc chặt các đầu dây tơ lại thành nút thắt bền chặt.' },
      { kanji: '結婚', hiragana: 'けっこん (kekkon)', sinoVietnamese: 'KẾT HÔN', meaning: 'Kết hôn, cưới hỏi', level: 'N5', breakdown: '結 (Kết) + 婚 (Hôn)', mnemonic: 'Sợi tơ hồng buộc chặt hai con người xây dựng mái ấm.' },
      { kanji: '続く', hiragana: 'つづく (tsudzuku)', sinoVietnamese: 'TỤC', meaning: 'Tiếp tục liên tục', level: 'N4', breakdown: '続 (Tục - có 糹)', mnemonic: 'Nối tiếp sợi chỉ dài không để đứt đoạn.' },
      { kanji: '経済', hiragana: 'けいざい (keizai)', sinoVietnamese: 'KINH TẾ', meaning: 'Kinh tế thị trường', level: 'N3', breakdown: '経 (Kinh - có 糹) + 済 (Tế)', mnemonic: 'Đan dệt đường lối kinh bang tế thế cứu giúp dân lành.' },
      { kanji: '練習', hiragana: 'れんしゅう (renshū)', sinoVietnamese: 'LUYỆN TẬP', meaning: 'Luyện tập rèn giũa', level: 'N5', breakdown: '練 (Luyện - có 糹) + 習 (Tập)', mnemonic: 'Nấu và luộc sợi tơ nhiều lần cho trắng mềm bền dai.' },
      { kanji: '紹介', hiragana: 'しょうかい (shōkai)', sinoVietnamese: 'THIỆU GIỚI', meaning: 'Giới thiệu làm quen', level: 'N4', breakdown: '紹 (Thiệu - có 糹) + 介 (Giới)', mnemonic: 'Nối sợi dây giao lưu giữa hai con người.' },
      { kanji: '紙', hiragana: 'かみ (kami)', sinoVietnamese: 'CHỈ', meaning: 'Tờ giấy viết', level: 'N5', breakdown: '糸 (Mịch) + 氏 (Thị)', mnemonic: 'Xưa làm giấy từ các sợi xơ tơ tằm ép mỏng.' },
      { kanji: '線', hiragana: 'せん (sen)', sinoVietnamese: 'TUYẾN', meaning: 'Tuyến đường, đường kẻ', level: 'N4', breakdown: '糸 (Mịch) + 泉 (Tuyền)', mnemonic: 'Đường dây tơ dài uốn lượn như dòng suối trong vắt.' }
    ]
  },
  {
    stt: 121,
    strokeCount: 6,
    radical: '缶',
    name: 'Phẫu',
    meaning: 'Đồ sành, bình đất',
    mnemonic: 'Hình cái vò, cái hũ bằng đất nung có nắp đậy ở trên.',
    relatedVocab: [
      { kanji: '缶', hiragana: 'かん (kan)', sinoVietnamese: 'PHẪU', meaning: 'Cái lon, hộp kim loại', level: 'N3', breakdown: '缶 (Phẫu)', mnemonic: 'Chiếc bình đất nung có nắp đậy kín miệng.' },
      { kanji: '缶詰', hiragana: 'かんづめ (kanzume)', sinoVietnamese: 'PHẪU CẬT', meaning: 'Đồ hộp đóng kín', level: 'N2', breakdown: '缶 (Phẫu) + 詰 (Cật)', mnemonic: 'Thức ăn đóng gói kín mít trong hộp kim loại.' },
      { kanji: '空き缶', hiragana: 'あきかん (akikan)', sinoVietnamese: 'KHÔNG PHẪU', meaning: 'Vỏ lon rỗng vứt rác', level: 'N3', breakdown: '空 (Không) + 缶 (Phẫu)', mnemonic: 'Chiếc vỏ lon nước ngọt đã uống cạn kiệt.' },
      { kanji: '缶ビール', hiragana: 'かんビール (kanbīru)', sinoVietnamese: 'PHẪU BIA', meaning: 'Bia lon mát lạnh', level: 'N4', breakdown: '缶 (Phẫu) + ビール', mnemonic: 'Bia đóng trong lon thiếc tiện lợi.' },
      { kanji: '陶缶', hiragana: 'とうかん (tōkan)', sinoVietnamese: 'ĐÀO PHẪU', meaning: 'Ống gốm thoát nước', level: 'N1', breakdown: '陶 (Đào) + 缶 (Phẫu)', mnemonic: 'Ống làm bằng đất nung gốm sứ.' },
      { kanji: '瓦缶', hiragana: 'がかん (gakan)', sinoVietnamese: 'NGÕA PHẪU', meaning: 'Bình đất nung mộc mạc', level: 'N1', breakdown: '瓦 (Ngõa) + 缶 (Phẫu)', mnemonic: 'Đồ sành đất nung mộc mạc dân dã.' },
      { kanji: '薬缶', hiragana: 'やかん (yakan)', sinoVietnamese: 'DƯỢC PHẪU', meaning: 'Ấm đun nước sôi', level: 'N2', breakdown: '薬 (Dược) + 缶 (Phẫu)', mnemonic: 'Ấm sắc thuốc đất nung nay thành ấm kim loại đun nước.' },
      { kanji: '缶切', hiragana: 'かんきり (kankiri)', sinoVietnamese: 'PHẪU THIẾT', meaning: 'Dụng cụ khui hộp thiếc', level: 'N2', breakdown: '缶 (Phẫu) + 切 (Thiết)', mnemonic: 'Lưỡi dao chuyên dùng để cắt nắp hộp đồ hộp.' },
      { kanji: '茶缶', hiragana: 'ちゃかん (chakan)', sinoVietnamese: 'TRÀ PHẪU', meaning: 'Hộp thiếc đựng trà khô', level: 'N1', breakdown: '茶 (Trà) + 缶 (Phẫu)', mnemonic: 'Chiếc hộp đậy kín bảo quản lá trà thơm ngát.' },
      { kanji: '汽缶', hiragana: 'きかん (kikan)', sinoVietnamese: 'KHÍ PHẪU', meaning: 'Nồi súp-de nồi hơi', level: 'N1', breakdown: '汽 (Khí) + 缶 (Phẫu)', mnemonic: 'Bình chứa áp suất tạo hơi nước chạy động cơ.' }
    ]
  },
  {
    stt: 122,
    strokeCount: 6,
    radical: '网',
    variants: ['罒', '⺲', '⺳'],
    name: 'Võng',
    meaning: 'Cái lưới bắt cá chim',
    mnemonic: 'Các mắt lưới đan chéo nhau trong một cái khung để bắt cá, chim.',
    relatedVocab: [
      { kanji: '網', hiragana: 'あみ (ami)', sinoVietnamese: 'VÕNG', meaning: 'Cái lưới mắt cá, mạng lưới', level: 'N2', breakdown: '糸 (Mịch) + 罔 (Võng)', mnemonic: 'Tấm lưới bện bằng dây gai giăng bắt cá.' },
      { kanji: '通信網', hiragana: 'つうしんもう (tsūshinmō)', sinoVietnamese: 'THÔNG TIN VÕNG', meaning: 'Mạng lưới viễn thông', level: 'N2', breakdown: '通信 (Thông tin) + 網 (Võng)', mnemonic: 'Mạng lưới kết nối thông tin đa phương thức.' },
      { kanji: '罪', hiragana: 'つみ (tsumi)', sinoVietnamese: 'TỘI', meaning: 'Tội lỗi, tội ác', level: 'N3', breakdown: '罒 (Võng) + 非 (Phi)', mnemonic: 'Làm điều phi pháp nên bị sa vào lưới pháp luật.' },
      { kanji: '置く', hiragana: 'おく (oku)', sinoVietnamese: 'TRÍ', meaning: 'Đặt, để đồ vật', level: 'N5', breakdown: '罒 (Võng) + 直 (Trực)', mnemonic: 'Thả lưới thẳng ngay ngắn cố định một chỗ.' },
      { kanji: '位置', hiragana: 'いち (ichi)', sinoVietnamese: 'VỊ TRÍ', meaning: 'Vị trí địa lý', level: 'N3', breakdown: '位 (Vị) + 置 (Trí - có 罒)', mnemonic: 'Điểm định vị chính xác trên bản đồ.' },
      { kanji: '罰', hiragana: 'ばつ (batsu)', sinoVietnamese: 'PHẠT', meaning: 'Hình phạt trừng trị', level: 'N2', breakdown: '罒 (Võng) + 言 (Ngôn) + 刂 (Đao)', mnemonic: 'Sa lưới pháp luật, bị tra xét và trừng trị bằng đao kiếm.' },
      { kanji: '処罰', hiragana: 'しょばつ (shobatsu)', sinoVietnamese: 'XỬ PHẠT', meaning: 'Xử phạt nghiêm minh', level: 'N1', breakdown: '処 (Xử) + 罰 (Phạt - có 罒)', mnemonic: 'Áp dụng chế tài xử phạt người có tội.' },
      { kanji: '署名', hiragana: 'しょめい (shomei)', sinoVietnamese: 'THỰ DANH', meaning: 'Ký tên xác nhận', level: 'N2', breakdown: '署 (Thự - có 罒) + 名 (Danh)', mnemonic: 'Đặt bút ký tên dưới sự giám sát của quan thự.' },
      { kanji: '金網', hiragana: 'かなあみ (kanaami)', sinoVietnamese: 'KIM VÕNG', meaning: 'Lưới thép rào chắn', level: 'N2', breakdown: '金 (Kim) + 網 (Võng)', mnemonic: 'Hàng rào đan bằng dây thép gai kiên cố.' },
      { kanji: '配意', hiragana: 'はいい (haii)', sinoVietnamese: 'PHỐI Ý', meaning: 'Quan tâm chú ý', level: 'N1', breakdown: 'Chứa gốc nghĩa sắp đặt lưới 罒', mnemonic: 'Bủa lưới quan sát chu đáo từng chi tiết.' }
    ]
  },
  {
    stt: 123,
    strokeCount: 6,
    radical: '羊',
    variants: ['⺶', '⺷'],
    name: 'Dương',
    meaning: 'Con dê, con cừu',
    mnemonic: 'Đầu con dê với hai chiếc sừng cong trên đỉnh đầu và cái mõm dài hiền lành.',
    relatedVocab: [
      { kanji: '羊', hiragana: 'ひつじ (hitsuji)', sinoVietnamese: 'DƯƠNG', meaning: 'Con cừu, con dê', level: 'N3', breakdown: '羊 (Dương)', mnemonic: 'Con dê có hai sừng cong cong trên đầu và bộ lông dày.' },
      { kanji: '羊毛', hiragana: 'ようもう (yōmō)', sinoVietnamese: 'DƯƠNG MAO', meaning: 'Lông cừu dệt áo len', level: 'N3', breakdown: '羊 (Dương) + 毛 (Mao)', mnemonic: 'Lông cừu mềm mại êm ái giữ ấm mùa đông.' },
      { kanji: '美しい', hiragana: 'うつくしい (utsukushii)', sinoVietnamese: 'MỸ', meaning: 'Đẹp đẽ, tuyệt mỹ', level: 'N4', breakdown: '羊 (Dương) + 大 (Đại)', mnemonic: 'Con dê to béo hiến tế thần linh là biểu tượng của cái đẹp.' },
      { kanji: '美術', hiragana: 'びじゅつ (bijutsu)', sinoVietnamese: 'MỸ THUẬT', meaning: 'Mỹ thuật hội họa', level: 'N4', breakdown: '美 (Mỹ) + 術 (Thuật)', mnemonic: 'Nghệ thuật tạo ra những tác phẩm hội họa tươi đẹp.' },
      { kanji: '群れ', hiragana: 'むれ (mure)', sinoVietnamese: 'QUẦN', meaning: 'Đàn, bầy đàn động vật', level: 'N2', breakdown: '君 (Quân) + 羊 (Dương)', mnemonic: 'Đàn cừu đông đúc đi theo người chăn cừu dẫn dắt.' },
      { kanji: '義務', hiragana: 'ぎむ (gimu)', sinoVietnamese: 'NGHĨA VỤ', meaning: 'Nghĩa vụ thiêng liêng', level: 'N3', breakdown: '義 (Nghĩa - có 羊) + 務 (Vụ)', mnemonic: 'Lẽ phải công chính trong sáng như con dê hiến tế.' },
      { kanji: '正義', hiragana: 'せいぎ (seigi)', sinoVietnamese: 'CHÍNH NGHĨA', meaning: 'Chính nghĩa, lẽ phải', level: 'N2', breakdown: '正 (Chính) + 義 (Nghĩa - có 羊)', mnemonic: 'Hành động theo lẽ phải và sự công bằng.' },
      { kanji: '養う', hiragana: 'やしなう (yashinau)', sinoVietnamese: 'DƯỠNG', meaning: 'Nuôi nấng, phụng dưỡng', level: 'N2', breakdown: '羊 (Dương) + 食 (Thực)', mnemonic: 'Cho ăn thịt cừu tẩm bổ nuôi con khôn lớn.' },
      { kanji: '鮮やか', hiragana: 'あざやか (azayaka)', sinoVietnamese: 'TIÊN', meaning: 'Tươi thắm, rực rỡ', level: 'N2', breakdown: '魚 (Ngư) + 羊 (Dương)', mnemonic: 'Cá tươi và thịt cừu ngon tươi rói.' },
      { kanji: '善意', hiragana: 'ぜんい (zen\'i)', sinoVietnamese: 'THIỆN Ý', meaning: 'Ý tốt, thiện chí', level: 'N2', breakdown: '善 (Thiện - có 羊) + 意 (Ý)', mnemonic: 'Lòng tốt thanh tao thánh thiện như đức tính loài cừu.' }
    ]
  },
  {
    stt: 124,
    strokeCount: 6,
    radical: '羽',
    name: 'Vũ',
    meaning: 'Lông vũ, cánh chim',
    mnemonic: 'Hình đôi cánh chim với những chiếc lông vũ xếp đều đặn tung bay.',
    relatedVocab: [
      { kanji: '羽', hiragana: 'はね (hane)', sinoVietnamese: 'VŨ', meaning: 'Lông vũ, cánh chim', level: 'N3', breakdown: '羽 (Vũ)', mnemonic: 'Hai cánh chim xòe rộng với lớp lông vũ bay lượn.' },
      { kanji: '翼', hiragana: 'つばさ (tsubasa)', sinoVietnamese: 'DỰC', meaning: 'Đôi cánh dang rộng', level: 'N1', breakdown: '異 (Dị) + 羽 (Vũ)', mnemonic: 'Đôi cánh khác biệt giúp chim bay vút lên bầu trời xanh.' },
      { kanji: '習う', hiragana: 'ならう (narau)', sinoVietnamese: 'TẬP', meaning: 'Học tập, rèn luyện', level: 'N5', breakdown: '羽 (Vũ) + 白 (Bạch)', mnemonic: 'Chim non vỗ cánh trắng tập bay hàng ngày.' },
      { kanji: '練習', hiragana: 'れんしゅう (renshū)', sinoVietnamese: 'LUYỆN TẬP', meaning: 'Luyện tập chăm chỉ', level: 'N5', breakdown: '練 (Luyện) + 習 (Tập - có 羽)', mnemonic: 'Tập luyện bền bỉ như chim non tập bay mỗi sớm.' },
      { kanji: '習慣', hiragana: 'しゅうかん (shūkan)', sinoVietnamese: 'TẬP QUÁN', meaning: 'Tập quán, thói quen', level: 'N4', breakdown: '習 (Tập) + 慣 (Quán)', mnemonic: 'Thói quen được hình thành qua rèn luyện lâu ngày.' },
      { kanji: '翌日', hiragana: 'よくじつ (yokujitsu)', sinoVietnamese: 'DẬC NHẬT', meaning: 'Ngày hôm sau kế tiếp', level: 'N3', breakdown: '翌 (Dực - có 羽) + 日 (Nhật)', mnemonic: 'Cánh chim bay đón ánh bình minh ngày mới.' },
      { kanji: '翻す', hiragana: 'ひるがえす (hirugaesu)', sinoVietnamese: 'PHIÊN', meaning: 'Phấp phới tung bay / đổi ý', level: 'N1', breakdown: '番 (Phiên) + 羽 (Vũ)', mnemonic: 'Tung cánh chim chao lượn đổi hướng bay.' },
      { kanji: '羽毛', hiragana: 'うもう (umō)', sinoVietnamese: 'VŨ MAO', meaning: 'Lông vũ nhồi chăn áo ấm', level: 'N2', breakdown: '羽 (Vũ) + 毛 (Mao)', mnemonic: 'Lớp lông chim siêu nhẹ giữ nhiệt mùa lạnh.' },
      { kanji: '翁', hiragana: 'おきな (okina)', sinoVietnamese: 'ÔNG', meaning: 'Ông lão râu tóc bạc phơ', level: 'N1', breakdown: '公 (Công) + 羽 (Vũ)', mnemonic: 'Cụ già có chòm râu trắng mềm như lông vũ.' },
      { kanji: '羽織る', hiragana: 'はおる (haoru)', sinoVietnamese: 'VŨ CHỨC', meaning: 'Khoác hờ chiếc áo qua vai', level: 'N1', breakdown: '羽 (Vũ) + 織 (Chức)', mnemonic: 'Khoác chiếc áo dệt nhẹ nhàng như đôi cánh chim.' }
    ]
  },
  {
    stt: 125,
    strokeCount: 6,
    radical: '老',
    variants: ['耂'],
    name: 'Lão',
    meaning: 'Người già, sống thọ',
    mnemonic: 'Người già tóc dài bạc trắng, lưng còng phải chống gậy (匕) đi lại.',
    relatedVocab: [
      { kanji: '老人', hiragana: 'ろうじん (rōjin)', sinoVietnamese: 'LÃO NHÂN', meaning: 'Cụ già, người cao tuổi', level: 'N3', breakdown: '老 (Lão) + 人 (Nhân)', mnemonic: 'Cụ già lưng còng tóc bạc chống gậy bước đi.' },
      { kanji: '老いる', hiragana: 'おいる (oiru)', sinoVietnamese: 'LÃO', meaning: 'Già đi theo năm tháng', level: 'N2', breakdown: '老 (Lão)', mnemonic: 'Quy luật thời gian khiến con người dần già nua.' },
      { kanji: '敬老', hiragana: 'けいろう (keirō)', sinoVietnamese: 'KÍNH LÃO', meaning: 'Kính trọng người già', level: 'N2', breakdown: '敬 (Kính) + 老 (Lão)', mnemonic: 'Tôn kính và phụng dưỡng các bậc cao niên.' },
      { kanji: '孝行', hiragana: 'こうこう (kōkō)', sinoVietnamese: 'HIẾU HÀNH', meaning: 'Hiếu thảo với cha mẹ', level: 'N1', breakdown: '孝 (Hiếu - chứa 老) + 行 (Hành)', mnemonic: 'Đứa con cõng cha già trên lưng đi từng bước hiếu nghĩa.' },
      { kanji: '考慮', hiragana: 'こうりょ (kōryo)', sinoVietnamese: 'KHẢO LỰ', meaning: 'Suy xét, cân nhắc kỹ', level: 'N2', breakdown: '考 (Khảo - chứa 老) + 慮 (Lự)', mnemonic: 'Người già suy nghĩ chín chắn trước sau thấu đáo.' },
      { kanji: '先生', hiragana: 'せんせい (sensei)', sinoVietnamese: 'TIÊN SINH', meaning: 'Thầy giáo, cô giáo', level: 'N5', breakdown: '先 (Tiên) + 生 (Sinh)', mnemonic: 'Người sinh ra trước tích lũy kinh nghiệm dạy dỗ trò.' },
      { kanji: '老後', hiragana: 'ろうご (rōgo)', sinoVietnamese: 'LÃO HẬU', meaning: 'Tuổi già về sau', level: 'N2', breakdown: '老 (Lão) + 後 (Hậu)', mnemonic: 'Những năm tháng an nhàn sau khi về hưu.' },
      { kanji: '不老', hiragana: 'ふろう (furō)', sinoVietnamese: 'BẤT LÃO', meaning: 'Trẻ mãi không già', level: 'N1', breakdown: '不 (Bất) + 老 (Lão)', mnemonic: 'Ước nguyện sống lâu trẻ mãi cùng trời đất.' },
      { kanji: '老舗', hiragana: 'しにせ (shinise)', sinoVietnamese: 'LÃO PHỐ', meaning: 'Cửa tiệm lâu đời truyền thống', level: 'N1', breakdown: '老 (Lão) + 舗 (Phố)', mnemonic: 'Cửa hàng gia truyền trải qua bao thế hệ uy tín.' },
      { kanji: '考古学', hiragana: 'こうこがく (kōkogaku)', sinoVietnamese: 'KHẢO CỔ HỌC', meaning: 'Ngành khảo cổ học', level: 'N1', breakdown: '考 (Khảo - có 老) + 古 (Cổ) + 学 (Học)', mnemonic: 'Ngành khoa học đào bới nghiên cứu di tích ngàn xưa.' }
    ]
  },
  {
    stt: 126,
    strokeCount: 6,
    radical: '而',
    name: 'Nhi',
    meaning: 'Mà, và, râu quai nón',
    mnemonic: 'Hình bộ râu quai nón rậm rạp rủ xuống dưới cằm của người trượng phu.',
    relatedVocab: [
      { kanji: '而して', hiragana: 'しかして (shikashite)', sinoVietnamese: 'NHI', meaning: 'Và rồi, sau đó thì', level: 'N1', breakdown: 'Bộ 而 (Nhi)', mnemonic: 'Chòm râu buông xuống nối dài các ý câu chuyện.' },
      { kanji: '而も', hiragana: 'しかも (shikamo)', sinoVietnamese: 'NHI', meaning: 'Hơn nữa, vả lại', level: 'N2', breakdown: 'Bộ 而 (Nhi)', mnemonic: 'Thêm vào đó một ý nghĩa mới liên kết.' },
      { kanji: '耐える', hiragana: 'たえる (taeru)', sinoVietnamese: 'NẠI', meaning: 'Nhẫn nại, chịu đựng', level: 'N2', breakdown: '而 (Nhi) + 寸 (Thốn)', mnemonic: 'Cắn răng giữ chặt chòm râu nhẫn nhịn vượt qua gian khó.' },
      { kanji: '耐久', hiragana: 'たいきゅう (taikyū)', sinoVietnamese: 'NẠI CỬU', meaning: 'Bền bỉ, chịu lực lâu dài', level: 'N2', breakdown: '耐 (Nại - có 而) + 久 (Cửu)', mnemonic: 'Khả năng chịu đựng bền bỉ thách thức thời gian.' },
      { kanji: '忍耐', hiragana: 'にんたい (nintai)', sinoVietnamese: 'NHẪN NẠI', meaning: 'Lòng kiên nhẫn nhẫn nại', level: 'N1', breakdown: '忍 (Nhẫn) + 耐 (Nại - có 而)', mnemonic: 'Kiên cường nhẫn nại không lùi bước trước khó khăn.' },
      { kanji: '耐熱', hiragana: 'たいねつ (tainetsu)', sinoVietnamese: 'NẠI NHIỆT', meaning: 'Khả năng chịu nhiệt độ cao', level: 'N2', breakdown: '耐 (Nại) + 熱 (Nhiệt)', mnemonic: 'Chất liệu không bị biến dạng khi gặp lửa nóng.' },
      { kanji: '耐火', hiragana: 'たいか (taika)', sinoVietnamese: 'NẠI HỎA', meaning: 'Chống cháy lan', level: 'N1', breakdown: '耐 (Nại) + 火 (Hỏa)', mnemonic: 'Vật liệu chống cháy bảo vệ tòa nhà an toàn.' },
      { kanji: '耐震', hiragana: 'たいしん (taishin)', sinoVietnamese: 'NẠI CHẤN', meaning: 'Chống chịu động đất', level: 'N2', breakdown: '耐 (Nại) + 震 (Chấn)', mnemonic: 'Thiết kế móng nhà chịu đựng rung lắc động đất vững vàng.' },
      { kanji: '端倪', hiragana: 'たんげい (tangei)', sinoVietnamese: 'ĐOAN NGHÊ', meaning: 'Manh mối, phỏng đoán', level: 'N1', breakdown: 'Chứa gốc chữ liên đới 而', mnemonic: 'Dò tìm từng đầu mối phỏng đoán chân tướng.' },
      { kanji: '須臾', hiragana: 'しゅゆ (shuyu)', sinoVietnamese: 'TU DU', meaning: 'Giây lát, thoáng chốc', level: 'N1', breakdown: '須 (Tu - có 而) + 臾', mnemonic: 'Thời gian trôi qua nhanh như một sợi râu đung đưa.' }
    ]
  },
  {
    stt: 127,
    strokeCount: 6,
    radical: '耒',
    name: 'Lỗi',
    meaning: 'Cái cày, bừa xới đất',
    mnemonic: 'Cây gỗ (Mộc 木) có gắn thêm các răng bừa/lưỡi cày (3 nét ngang) để xới đất.',
    relatedVocab: [
      { kanji: '耕す', hiragana: 'たがやす (tagayasu)', sinoVietnamese: 'CANH', meaning: 'Cày bừa xới đất', level: 'N3', breakdown: '耒 (Lỗi) + 井 (Tỉnh)', mnemonic: 'Cầm cái cày xới đất tơi xốp cạnh giếng nước.' },
      { kanji: '耕作', hiragana: 'こうさく (kōsaku)', sinoVietnamese: 'CANH TÁC', meaning: 'Canh tác nông nghiệp', level: 'N2', breakdown: '耕 (Canh - có 耒) + 作 (Tác)', mnemonic: 'Cày cuốc làm đất trồng trọt hoa màu.' },
      { kanji: '農耕', hiragana: 'のうこう (nōkō)', sinoVietnamese: 'NÔNG CANH', meaning: 'Nghề nông canh tác', level: 'N1', breakdown: '農 (Nông) + 耕 (Canh)', mnemonic: 'Nền văn minh nông nghiệp lấy cày cấy làm gốc.' },
      { kanji: '耕地', hiragana: 'こうち (kōchi)', sinoVietnamese: 'CANH ĐỊA', meaning: 'Đất canh tác nông nghiệp', level: 'N2', breakdown: '耕 (Canh) + 地 (Địa)', mnemonic: 'Diện tích đất đai dùng cho sản xuất nông nghiệp.' },
      { kanji: '耗弱', hiragana: 'もうじゃく (mōjaku)', sinoVietnamese: 'HAO NHƯỢC', meaning: 'Suy kiệt, hao mòn sức lực', level: 'N1', breakdown: '耗 (Hao - có 耒) + 弱 (Nhược)', mnemonic: 'Cày bừa vất vả hao tổn hết tâm lực.' },
      { kanji: '消耗', hiragana: 'しょうもう (shōmō)', sinoVietnamese: 'TIÊU HAO', meaning: 'Tiêu hao sức lực, tốn năng lượng', level: 'N2', breakdown: '消 (Tiêu) + 耗 (Hao - có 耒)', mnemonic: 'Năng lượng bị hao mòn vơi cạn dần.' },
      { kanji: '心神耗弱', hiragana: 'しんしんもうじゃく (shinshinmōjaku)', sinoVietnamese: 'TÂM THẦN HAO NHƯỢC', meaning: 'Trạng thái tinh thần suy nhược', level: 'N1', breakdown: '心神 + 耗弱 (có 耒)', mnemonic: 'Thuật ngữ pháp lý chỉ tinh thần bị suy giảm khả năng nhận thức.' },
      { kanji: '耘田', hiragana: 'うんでん (unden)', sinoVietnamese: 'VÂN ĐIỀN', meaning: 'Làm cỏ ruộng', level: 'N1', breakdown: '耘 (Vân - có 耒) + 田 (Điền)', mnemonic: 'Dùng cày xới diệt cỏ dại bảo vệ lúa.' },
      { kanji: '耜', hiragana: 'すき (suki)', sinoVietnamese: 'TỰ', meaning: 'Lưỡi cày sắc bén', level: 'N1', breakdown: '耒 (Lỗi) + 㠯', mnemonic: 'Lưỡi cày cắm sâu vào lòng đất phì nhiêu.' },
      { kanji: '耙', hiragana: 'まぐわ (maguwa)', sinoVietnamese: 'BÀ', meaning: 'Cái bừa san phẳng ruộng', level: 'N1', breakdown: '耒 (Lỗi) + 巴', mnemonic: 'Dụng cụ bừa đất cho phẳng mịn trước khi cấy.' }
    ]
  },
  {
    stt: 128,
    strokeCount: 6,
    radical: '耳',
    name: 'Nhĩ',
    meaning: 'Lỗ tai, lắng nghe',
    mnemonic: 'Hình dáng vành tai và dái tai của con người đón nhận âm thanh.',
    relatedVocab: [
      { kanji: '耳', hiragana: 'みみ (mimi)', sinoVietnamese: 'NHĨ', meaning: 'Cái tai, lỗ tai', level: 'N5', breakdown: '耳 (Nhĩ)', mnemonic: 'Hình dáng vành tai người lắng nghe âm thanh bốn phương.' },
      { kanji: '聞く', hiragana: 'きく (kiku)', sinoVietnamese: 'VĂN', meaning: 'Nghe thấy, hỏi han', level: 'N5', breakdown: '門 (Môn) + 耳 (Nhĩ)', mnemonic: 'Ghé tai vào khe cửa lắng nghe tin tức.' },
      { kanji: '職業', hiragana: 'しょくぎょう (shokugyō)', sinoVietnamese: 'CHỨC NGHIỆP', meaning: 'Nghề nghiệp, công việc', level: 'N3', breakdown: '職 (Chức - có 耳) + 業 (Nghiệp)', mnemonic: 'Người đi làm phải biết lắng nghe chỉ thị cấp trên.' },
      { kanji: '職人', hiragana: 'しょくにん (shokunin)', sinoVietnamese: 'CHỨC NHÂN', meaning: 'Thợ thủ công lành nghề', level: 'N2', breakdown: '職 (Chức) + 人 (Nhân)', mnemonic: 'Nghệ nhân tinh tế lắng nghe từng chuyển động của tác phẩm.' },
      { kanji: '耳寄り', hiragana: 'みみより (mimiyori)', sinoVietnamese: 'NHĨ KÝ', meaning: 'Tin sốt dẻo, tin đáng nghe', level: 'N1', breakdown: '耳 (Nhĩ) + 寄 (Ký)', mnemonic: 'Tin tức hấp dẫn khiến ai cũng muốn ghé tai vào nghe.' },
      { kanji: '耳障り', hiragana: 'みみざわり (mimizawari)', sinoVietnamese: 'NHĨ CHƯỚNG', meaning: 'Chói tai, khó chịu', level: 'N1', breakdown: '耳 (Nhĩ) + 障 (Chướng)', mnemonic: 'Âm thanh ồn ào gây chướng tai gai mắt.' },
      { kanji: '恥ずかしい', hiragana: 'はずかしい (hazukashii)', sinoVietnamese: 'SỈ', meaning: 'Xấu hổ, ngượng ngùng đỏ mặt', level: 'N4', breakdown: '耳 (Nhĩ) + 心 (Tâm)', mnemonic: 'Trong lòng xấu hổ khiến hai vành tai đỏ ửng lên.' },
      { kanji: '聡明', hiragana: 'そうめい (sōmei)', sinoVietnamese: 'THÔNG MINH', meaning: 'Thông minh, sáng suốt', level: 'N1', breakdown: '聡 (Thông - có 耳) + 明 (Minh)', mnemonic: 'Tai thính mắt tinh nhạy bén hiểu thấu sự đời.' },
      { kanji: '耳栓', hiragana: 'みみせん (mimisen)', sinoVietnamese: 'NHĨ XUYÊN', meaning: 'Nút bịt tai chống ồn', level: 'N2', breakdown: '耳 (Nhĩ) + 栓 (Xuyên - nút)', mnemonic: 'Nút bịt vào tai để ngăn tiếng ồn khi ngủ.' },
      { kanji: '初耳', hiragana: 'はつみみ (hatsumimi)', sinoVietnamese: 'SƠ NHĨ', meaning: 'Lần đầu tiên nghe thấy', level: 'N2', breakdown: '初 (Sơ) + 耳 (Nhĩ)', mnemonic: 'Tin tức hoàn toàn mới lạ lần đầu lọt vào tai.' }
    ]
  },
  {
    stt: 129,
    strokeCount: 6,
    radical: '聿',
    name: 'Duật',
    meaning: 'Cây bút lông',
    mnemonic: 'Bàn tay (彐) đang cầm chặt cán bút lông (丨) viết từng nét chữ uyển chuyển.',
    relatedVocab: [
      { kanji: '筆', hiragana: 'ふで (fude)', sinoVietnamese: 'BÚT', meaning: 'Cây bút lông mềm mại', level: 'N2', breakdown: '竹 (Trúc) + 聿 (Duật)', mnemonic: 'Bàn tay cầm ống trúc làm bút chấm mực viết chữ.' },
      { kanji: '筆者', hiragana: 'ひっしゃ (hissha)', sinoVietnamese: 'BÚT GIẢ', meaning: 'Tác giả bài viết', level: 'N2', breakdown: '筆 (Bút - có 聿) + 者 (Giả)', mnemonic: 'Người cầm bút sáng tác ra bài văn cuốn sách.' },
      { kanji: '鉛筆', hiragana: 'えんぴつ (enpitsu)', sinoVietnamese: 'DUYÊN BÚT', meaning: 'Bút chì', level: 'N5', breakdown: '鉛 (Duyên - chì) + 筆 (Bút - có 聿)', mnemonic: 'Bút làm từ lõi chì than đen.' },
      { kanji: '万年筆', hiragana: 'まんねんひつ (mannenhitsu)', sinoVietnamese: 'VẠN NIÊN BÚT', meaning: 'Bút máy viết mực', level: 'N4', breakdown: '万年 (Vạn niên) + 筆 (Bút)', mnemonic: 'Cây bút bền bỉ bơm mực dùng vạn năm không hỏng.' },
      { kanji: '筆記', hiragana: 'ひっき (hikki)', sinoVietnamese: 'BÚT KÝ', meaning: 'Thi viết, ghi chép tay', level: 'N3', breakdown: '筆 (Bút) + 記 (Ký)', mnemonic: 'Dùng bút ghi chép bài thi cẩn thận.' },
      { kanji: '津々浦々', hiragana: 'つつうらうら (tsutsuuraura)', sinoVietnamese: 'TÂN PHỔ', meaning: 'Khắp mọi nẻo đường đất nước', level: 'N1', breakdown: 'Chứa chữ 津 (có cấu trúc liên đới)', mnemonic: 'Khắp mọi bến cảng thôn làng xa xôi.' },
      { kanji: '自筆', hiragana: 'じひつ (jihitsu)', sinoVietnamese: 'TỰ BÚT', meaning: 'Chính tay viết, bút tích', level: 'N1', breakdown: '自 (Tự) + 筆 (Bút)', mnemonic: 'Tự tay mình cầm bút viết nên bức thư.' },
      { kanji: '執筆', hiragana: 'しっぴつ (shippitsu)', sinoVietnamese: 'CHẤP BÚT', meaning: 'Cầm bút viết sách', level: 'N1', breakdown: '執 (Chấp) + 筆 (Bút)', mnemonic: 'Cầm bút dốc lòng viết tác phẩm tâm huyết.' },
      { kanji: '直筆', hiragana: 'じきひつ (jikihitsu)', sinoVietnamese: 'TRỰC BÚT', meaning: 'Bút tích viết tay trực tiếp', level: 'N1', breakdown: '直 (Trực) + 筆 (Bút)', mnemonic: 'Nét chữ nguyên bản do chính tác giả hạ bút.' },
      { kanji: '代筆', hiragana: 'だいひつ (daihitsu)', sinoVietnamese: 'ĐẠI BÚT', meaning: 'Viết thay, chép hộ', level: 'N1', breakdown: '代 (Đại) + 筆 (Bút)', mnemonic: 'Cầm bút viết hộ người không biết chữ.' }
    ]
  },
  {
    stt: 130,
    strokeCount: 6,
    radical: '肉',
    variants: ['月'],
    name: 'Nhục',
    meaning: 'Thịt, cơ bắp cơ thể',
    mnemonic: 'Miếng thịt được thái ra từng thớ gân bên trong (viết thành bộ Nguyệt).',
    relatedVocab: [
      { kanji: '肉', hiragana: 'にく (niku)', sinoVietnamese: 'NHỤC', meaning: 'Thịt tươi, đồ ăn thịt', level: 'N5', breakdown: '肉 (Nhục)', mnemonic: 'Tảng thịt nạc có các thớ thịt đan xen nhau.' },
      { kanji: '牛肉', hiragana: 'ぎゅうにく (gyūniku)', sinoVietnamese: 'NGƯU NHỤC', meaning: 'Thịt bò giàu dinh dưỡng', level: 'N5', breakdown: '牛 (Ngưu) + 肉 (Nhục)', mnemonic: 'Thịt thơm ngon từ chú bò khỏe mạnh.' },
      { kanji: '筋肉', hiragana: 'きんにく (kinniku)', sinoVietnamese: 'CÂN NHỤC', meaning: 'Cơ bắp cơ thể', level: 'N3', breakdown: '筋 (Cân) + 肉 (Nhục)', mnemonic: 'Các múi cơ bắp săn chắc sau khi tập luyện.' },
      { kanji: '胃', hiragana: 'い (i)', sinoVietnamese: 'VỊ', meaning: 'Dạ dày tiêu hóa', level: 'N2', breakdown: '田 (Điền) + ⺼ (Nhục)', mnemonic: 'Bộ phận như thửa ruộng chứa thịt và cơm tiêu hóa.' },
      { kanji: '肝臓', hiragana: 'かんぞう (kanzō)', sinoVietnamese: 'CAN TẠNG', meaning: 'Lá gan nội tạng', level: 'N1', breakdown: '肝 (Can - có ⺼) + 臓 (Tạng - có ⺼)', mnemonic: 'Lá gan nội tạng cốt yếu trong cơ thể người.' },
      { kanji: '肺', hiragana: 'はい (hai)', sinoVietnamese: 'PHẾ', meaning: 'Lá phổi hô hấp', level: 'N1', breakdown: '⺼ (Nhục) + 市 (Thị)', mnemonic: 'Lá phổi trao đổi khí duy trì sinh mệnh.' },
      { kanji: '脳', hiragana: 'のう (nō)', sinoVietnamese: 'NÃO', meaning: 'Bộ não tư duy', level: 'N2', breakdown: '⺼ (Nhục) + 凶 + 巛', mnemonic: 'Bộ não trung tâm điều khiển suy nghĩ của con người.' },
      { kanji: '腕', hiragana: 'うで (ude)', sinoVietnamese: 'OÃN', meaning: 'Cánh tay khỏe khoắn', level: 'N3', breakdown: '⺼ (Nhục) + 宛 (Uyển)', mnemonic: 'Cánh tay rắn rỏi gánh vác mọi trọng trách.' },
      { kanji: '胸', hiragana: 'むね (mune)', sinoVietnamese: 'HUNG', meaning: 'Lồng ngực, tấm lòng', level: 'N3', breakdown: '⺼ (Nhục) + 匈 (Hung)', mnemonic: 'Lồng ngực đập phập phồng chứa đựng con tim.' },
      { kanji: '腰', hiragana: 'こし (koshi)', sinoVietnamese: 'YÊU', meaning: 'Thắt lưng, hông eo', level: 'N2', breakdown: '⺼ (Nhục) + 要 (Yếu)', mnemonic: 'Vùng thắt lưng là điểm cốt yếu nâng đỡ cả cơ thể.' }
    ]
  },
  {
    stt: 131,
    strokeCount: 6,
    radical: '臣',
    name: 'Thần',
    meaning: 'Bầy tôi, quần thần',
    mnemonic: 'Con mắt nhìn dọc khi vị quan cúi đầu sát đất cung kính trước nhà vua.',
    relatedVocab: [
      { kanji: '大臣', hiragana: 'だいじん (daijin)', sinoVietnamese: 'ĐẠI THẦN', meaning: 'Bộ trưởng chính phủ', level: 'N3', breakdown: '大 (Đại) + 臣 (Thần)', mnemonic: 'Vị quan lớn đứng đầu trông coi một bộ ngành quốc gia.' },
      { kanji: '総理大臣', hiragana: 'そうりだいじん (sōridaijin)', sinoVietnamese: 'TỔNG LÝ ĐẠI THẦN', meaning: 'Thủ tướng chính phủ', level: 'N3', breakdown: '総理 (Tổng lý) + 大臣 (Đại thần)', mnemonic: 'Người đứng đầu nội các lãnh đạo đất nước.' },
      { kanji: '家臣', hiragana: 'かしん (kashin)', sinoVietnamese: 'GIA THẦN', meaning: 'Gia thần thân cận', level: 'N1', breakdown: '家 (Gia) + 臣 (Thần)', mnemonic: 'Người bầy tôi trung thành phục vụ gia tộc nhiều đời.' },
      { kanji: '忠臣', hiragana: 'ちゅうしん (chūshin)', sinoVietnamese: 'TRUNG THẦN', meaning: 'Tôi trung ái quốc', level: 'N1', breakdown: '忠 (Trung) + 臣 (Thần)', mnemonic: 'Vị quan trung nghĩa hết lòng vì nước vì dân.' },
      { kanji: '臣下', hiragana: 'しんか (shinka)', sinoVietnamese: 'THẦN HẠ', meaning: 'Bầy tôi bề dưới', level: 'N1', breakdown: '臣 (Thần) + 下 (Hạ)', mnemonic: 'Kẻ dưới quyền phục tùng mệnh lệnh bề trên.' },
      { kanji: '蔵相', hiragana: 'ぞうしょう (zōshō)', sinoVietnamese: 'TÀNG TƯƠNG', meaning: 'Bộ trưởng tài chính', level: 'N1', breakdown: '蔵 (chứa 臣)', mnemonic: 'Người quản lý kho tàng quốc gia.' },
      { kanji: '緊迫', hiragana: 'きんぱく (kinpaku)', sinoVietnamese: 'KHẨN BÁCH', meaning: 'Căng thẳng cấp bách', level: 'N1', breakdown: '緊 (chứa 臣) + 迫 (Bách)', mnemonic: 'Tình thế khẩn trương quan thần họp bàn ứng phó.' },
      { kanji: '緊急', hiragana: 'きんきゅう (kinkyū)', sinoVietnamese: 'KHẨN CẤP', meaning: 'Khẩn cấp nguy nan', level: 'N3', breakdown: '緊 (Khẩn - có 臣) + 急 (Cấp)', mnemonic: 'Tình trạng gấp gáp cần xử lý ngay lập tức.' },
      { kanji: '君臣', hiragana: 'くんしん (kunshin)', sinoVietnamese: 'QUÂN THẦN', meaning: 'Vua và bầy tôi', level: 'N1', breakdown: '君 (Quân) + 臣 (Thần)', mnemonic: 'Quan hệ chính trực giữa vua và quần thần.' },
      { kanji: '重臣', hiragana: 'じゅうしん (jūshin)', sinoVietnamese: 'TRỌNG THẦN', meaning: 'Trọng thần rường cột', level: 'N1', breakdown: '重 (Trọng) + 臣 (Thần)', mnemonic: 'Vị đại thần giữ trọng trách quan trọng trong triều đình.' }
    ]
  },
  {
    stt: 132,
    strokeCount: 6,
    radical: '自',
    name: 'Tự',
    meaning: 'Tự mình, cái mũi',
    mnemonic: 'Hình cái mũi của mình (người Nhật hay chỉ ngón tay vào mũi khi nói về bản thân).',
    relatedVocab: [
      { kanji: '自分', hiragana: 'じぶん (jibun)', sinoVietnamese: 'TỰ PHÂN', meaning: 'Bản thân mình', level: 'N5', breakdown: '自 (Tự) + 分 (Phân)', mnemonic: 'Ngón tay chỉ vào mũi mình để khẳng định bản thân.' },
      { kanji: '自由', hiragana: 'じゆう (jiyū)', sinoVietnamese: 'TỰ DO', meaning: 'Tự do, thoải mái', level: 'N4', breakdown: '自 (Tự) + 由 (Do)', mnemonic: 'Do chính bản thân mình tự quyết định hành động.' },
      { kanji: '自然', hiragana: 'しぜん (shizen)', sinoVietnamese: 'TỰ NHIÊN', meaning: 'Thiên nhiên trong lành', level: 'N4', breakdown: '自 (Tự) + 然 (Nhiên)', mnemonic: 'Vạn vật tự thân vốn dĩ tồn tại hài hòa.' },
      { kanji: '自信', hiragana: 'じしん (jishin)', sinoVietnamese: 'TỰ TÍN', meaning: 'Tự tin vào bản thân', level: 'N3', breakdown: '自 (Tự) + 信 (Tín)', mnemonic: 'Đặt niềm tin trọn vẹn vào năng lực của chính mình.' },
      { kanji: '自転車', hiragana: 'じてんしゃ (jitensha)', sinoVietnamese: 'TỰ CHUYỂN XA', meaning: 'Xe đạp', level: 'N5', breakdown: '自 (Tự) + 転 (Chuyển) + 車 (Xa)', mnemonic: 'Chiếc xe tự dùng sức chân đạp bánh lăn tròn.' },
      { kanji: '自動車', hiragana: 'じどうしゃ (jidōsha)', sinoVietnamese: 'TỰ ĐỘNG XA', meaning: 'Xe hơi, ô tô', level: 'N5', breakdown: '自 (Tự) + 動 (Động) + 車 (Xa)', mnemonic: 'Chiếc xe tự động nổ máy di chuyển.' },
      { kanji: '自首', hiragana: 'じしゅ (jishu)', sinoVietnamese: 'TỰ THỦ', meaning: 'Đầu thú nhận tội', level: 'N1', breakdown: '自 (Tự) + 首 (Thủ)', mnemonic: 'Tự thân đến nộp mình trước cơ quan công lý.' },
      { kanji: '自覚', hiragana: 'じかく (jikaku)', sinoVietnamese: 'TỰ GIÁC', meaning: 'Tự giác, ý thức rõ', level: 'N2', breakdown: '自 (Tự) + 覚 (Giác)', mnemonic: 'Tự bản thân nhận thức rõ bổn phận trách nhiệm.' },
      { kanji: '独自', hiragana: 'どくじ (dokuji)', sinoVietnamese: 'ĐỘC TỰ', meaning: 'Độc đáo, riêng biệt', level: 'N2', breakdown: '独 (Độc) + 自 (Tự)', mnemonic: 'Nét đặc trưng riêng biệt chỉ bản thân mới có.' },
      { kanji: '自粛', hiragana: 'じしゅく (jishuku)', sinoVietnamese: 'TỰ TÚC', meaning: 'Tự kiềm chế, tự hạn chế ra ngoài', level: 'N1', breakdown: '自 (Tự) + 粛 (Túc)', mnemonic: 'Tự giác kiềm chế hạn chế hoạt động vì cộng đồng.' }
    ]
  },
  {
    stt: 133,
    strokeCount: 6,
    radical: '至',
    name: 'Chí',
    meaning: 'Đến nơi, cùng cực',
    mnemonic: 'Mũi tên từ trên cao bắn cắm phập xuống mặt đất (Thổ 土) – đã bay tới đích.',
    relatedVocab: [
      { kanji: '至る', hiragana: 'いたる (itaru)', sinoVietnamese: 'CHÍ', meaning: 'Đến, dẫn tới kết quả', level: 'N2', breakdown: '至 (Chí)', mnemonic: 'Mũi tên bay thẳng cắm trúng đích đến cuối cùng.' },
      { kanji: '夏至', hiragana: 'げし (geshi)', sinoVietnamese: 'HẠ CHÍ', meaning: 'Tiết hạ chí (ngày dài nhất năm)', level: 'N1', breakdown: '夏 (Hạ) + 至 (Chí)', mnemonic: 'Mùa hè lên tới đỉnh điểm ánh sáng chan hòa.' },
      { kanji: '冬至', hiragana: 'とうじ (tōji)', sinoVietnamese: 'ĐÔNG CHÍ', meaning: 'Tiết đông chí (đêm dài nhất năm)', level: 'N1', breakdown: '冬 (Đông) + 至 (Chí)', mnemonic: 'Mùa đông lạnh giá chạm tới tột cùng bóng tối.' },
      { kanji: '至急', hiragana: 'しきゅう (shikyū)', sinoVietnamese: 'CHÍ CẤP', meaning: 'Hết sức khẩn cấp', level: 'N3', breakdown: '至 (Chí) + 急 (Cấp)', mnemonic: 'Khẩn cấp đến tột cùng cần làm ngay không chậm trễ.' },
      { kanji: '今に至る', hiragana: 'いまにいたる (imaniitaru)', sinoVietnamese: 'KIM CHÍ', meaning: 'Cho đến tận ngày hôm nay', level: 'N2', breakdown: '今 (Kim) + 至 (Chí)', mnemonic: 'Kéo dài từ quá khứ đến tận thời điểm hiện tại.' },
      { kanji: '必至', hiragana: 'ひっし (hisshi)', sinoVietnamese: 'TẤT CHÍ', meaning: 'Tất yếu sẽ xảy đến', level: 'N1', breakdown: '必 (Tất) + 至 (Chí)', mnemonic: 'Điều tất nhiên không thể tránh khỏi sẽ diễn ra.' },
      { kanji: '至福', hiragana: 'しふく (shifuku)', sinoVietnamese: 'CHÍ PHÚC', meaning: 'Hạnh phúc tột cùng', level: 'N1', breakdown: '至 (Chí) + 福 (Phúc)', mnemonic: 'Niềm hạnh phúc trọn vẹn không gì sánh bằng.' },
      { kanji: '至高', hiragana: 'しこう (shikō)', sinoVietnamese: 'CHÍ CAO', meaning: 'Tối cao, đỉnh cao tuyệt đối', level: 'N1', breakdown: '至 (Chí) + 高 (Cao)', mnemonic: 'Vươn tới tầm cao tột đỉnh của nghệ thuật.' },
      { kanji: '至極', hiragana: 'しごく (shigoku)', sinoVietnamese: 'CHÍ CỰC', meaning: 'Hết mực, vô cùng, cực kỳ', level: 'N1', breakdown: '至 (Chí) + 極 (Cực)', mnemonic: 'Đạt tới giới hạn tột cùng của cảm xúc.' },
      { kanji: '至上', hiragana: 'しじょう (shijō)', sinoVietnamese: 'CHÍ THƯỢNG', meaning: 'Trên hết, cao quý nhất', level: 'N1', breakdown: '至 (Chí) + 上 (Thượng)', mnemonic: 'Mục tiêu tối thượng được đặt lên vị trí số một.' }
    ]
  },
  {
    stt: 134,
    strokeCount: 6,
    radical: '臼',
    name: 'Cữu',
    meaning: 'Cái cối giã gạo',
    mnemonic: 'Cái cối đá khoét lõm ở giữa, bên trong có các khấc để giã hạt ngũ cốc.',
    relatedVocab: [
      { kanji: '臼', hiragana: 'うす (usu)', sinoVietnamese: 'CỮU', meaning: 'Cái cối đá, cối giã gạo', level: 'N1', breakdown: '臼 (Cữu)', mnemonic: 'Chiếc cối đá có các vết răng cưa để giã nát hạt thóc.' },
      { kanji: '石臼', hiragana: 'いしうす (ishiusu)', sinoVietnamese: 'THẠCH CỮU', meaning: 'Cối xay bằng đá', level: 'N1', breakdown: '石 (Thạch) + 臼 (Cữu)', mnemonic: 'Cối đá nặng trịch dùng để xay bột làm bánh.' },
      { kanji: '脱臼', hiragana: 'だっきゅう (dakkyū)', sinoVietnamese: 'THOÁT CỮU', meaning: 'Trật khớp xương', level: 'N1', breakdown: '脱 (Thoát) + 臼 (Cữu)', mnemonic: 'Khớp xương trượt ra khỏi ổ cối chấn thương.' },
      { kanji: '挿す', hiragana: 'さす (sasu)', sinoVietnamese: 'SÁP', meaning: 'Cắm hoa, cài trâm', level: 'N2', breakdown: '扌 (Thủ) + 臼 (Cữu) + 干', mnemonic: 'Bàn tay cắm chày vào cối như cài hoa vào lọ.' },
      { kanji: '毀損', hiragana: 'きそん (kison)', sinoVietnamese: 'HỦ TỔN', meaning: 'Phá hoại, làm tổn hại danh dự', level: 'N1', breakdown: '毀 (Hủy - có 臼) + 損 (Tổn)', mnemonic: 'Đập vỡ tan cối làm tổn hại giá trị đồ vật.' },
      { kanji: '臼歯', hiragana: 'きゅうし (kyūshi)', sinoVietnamese: 'CỮU XỈ', meaning: 'Răng cối, răng hàm nghiền thức ăn', level: 'N1', breakdown: '臼 (Cữu) + 歯 (Xỉ)', mnemonic: 'Chiếc răng hàm bằng phẳng nghiền nát cơm như cối giã.' },
      { kanji: '茶臼', hiragana: 'ちゃうす (chausu)', sinoVietnamese: 'TRÀ CỮU', meaning: 'Cối đá xay trà xanh Matcha', level: 'N1', breakdown: '茶 (Trà) + 臼 (Cữu)', mnemonic: 'Cối đá tinh xảo xay lá trà khô thành bột matcha mịn.' },
      { kanji: '餅臼', hiragana: 'もちうす (mochiusu)', sinoVietnamese: 'BÍNH CỮU', meaning: 'Cối giã bánh dày Mochi ngày Tết', level: 'N1', breakdown: '餅 (Bính) + 臼 (Cữu)', mnemonic: 'Chiếc cối gỗ lớn dùng để giã mochi dẻo quánh đón xuân.' },
      { kanji: '興奮', hiragana: 'こうふん (kōfun)', sinoVietnamese: 'HƯNG PHẤN', meaning: 'Hưng phấn hào hứng', level: 'N2', breakdown: '興 (Hưng - chứa 臼) + 奮 (Phấn)', mnemonic: 'Bốn tay cùng nâng cối hò reo hào hứng.' },
      { kanji: '興味', hiragana: 'きょうみ (kyōmi)', sinoVietnamese: 'HƯNG VỊ', meaning: 'Hứng thú, quan tâm', level: 'N4', breakdown: '興 (Hưng - có 臼) + 味 (Vị)', mnemonic: 'Cảm nhận được niềm say mê thích thú trong sự việc.' }
    ]
  },
  {
    stt: 135,
    strokeCount: 6,
    radical: '舌',
    name: 'Thiệt',
    meaning: 'Cái lưỡi',
    mnemonic: 'Cái lưỡi (千) thè ra từ trong miệng (Khẩu 口) nếm trải hương vị.',
    relatedVocab: [
      { kanji: '舌', hiragana: 'した (shita)', sinoVietnamese: 'THIỆT', meaning: 'Cái lưỡi', level: 'N3', breakdown: '舌 (Thiệt)', mnemonic: 'Chiếc lưỡi thò ra từ vòm miệng nếm các vị ngon ngọt.' },
      { kanji: '舌鼓', hiragana: 'したづつみ (shitazutsumi)', sinoVietnamese: 'THIỆT CỔ', meaning: 'Tặc lưỡi khen ngon, đánh chén', level: 'N1', breakdown: '舌 (Thiệt) + 鼓 (Cổ - trống)', mnemonic: 'Lưỡi gõ như tiếng trống tấm tắc khen món ăn hảo hạng.' },
      { kanji: '毒舌', hiragana: 'どくぜつ (dokuzetsu)', sinoVietnamese: 'ĐỘC THIỆT', meaning: 'Miệng lưỡi độc địa cay nghiệt', level: 'N1', breakdown: '毒 (Độc) + 舌 (Thiệt)', mnemonic: 'Lời nói cay độc tuôn ra từ đầu lưỡi làm tổn thương người khác.' },
      { kanji: '舌禍', hiragana: 'ぜっか (zekka)', sinoVietnamese: 'THIỆT HỌA', meaning: 'Họa từ miệng mà ra', level: 'N1', breakdown: '舌 (Thiệt) + 禍 (Họa)', mnemonic: 'Tai vạ giáng xuống do chiếc lưỡi phát ngôn bừa bãi.' },
      { kanji: '話す', hiragana: 'はなす (hanasu)', sinoVietnamese: 'THOẠI', meaning: 'Nói chuyện, trò chuyện', level: 'N5', breakdown: '言 (Ngôn) + 舌 (Thiệt)', mnemonic: 'Chiếc lưỡi uốn lượn thốt lên những lời nói tâm tình.' },
      { kanji: '乱れる', hiragana: 'みだれる (midareru)', sinoVietnamese: 'LOẠN', meaning: 'Hỗn loạn, rối bời', level: 'N2', breakdown: '舌 (Thiệt) + 乚', mnemonic: 'Lời qua tiếng lại khua môi múa mép gây cảnh hỗn loạn.' },
      { kanji: '舌足らず', hiragana: 'したたらず (shitatarazu)', sinoVietnamese: 'THIỆT TÚC', meaning: 'Nói ngọng, diễn đạt chưa gãy gọn', level: 'N1', breakdown: '舌 (Thiệt) + 足 (Túc)', mnemonic: 'Diễn đạt ấp úng chưa đủ ý như bị líu lưỡi.' },
      { kanji: '舌先', hiragana: 'したさき (shitasaki)', sinoVietnamese: 'THIỆT TIÊN', meaning: 'Đầu lưỡi', level: 'N1', breakdown: '舌 (Thiệt) + 先 (Tiên)', mnemonic: 'Phần chóp đầu lưỡi nhạy cảm nếm vị ngọt.' },
      { kanji: '猫舌', hiragana: 'ねこじた (nekojita)', sinoVietnamese: 'MIÊU THIỆT', meaning: 'Lưỡi mèo (không ăn được đồ nóng)', level: 'N2', breakdown: '猫 (Miêu) + 舌 (Thiệt)', mnemonic: 'Chiếc lưỡi sợ nóng như lưỡi loài mèo con.' },
      { kanji: '弁舌', hiragana: 'べんぜつ (benzetsu)', sinoVietnamese: 'BIỆN THIỆT', meaning: 'Tài hùng biện lưu loát', level: 'N1', breakdown: '弁 (Biện) + 舌 (Thiệt)', mnemonic: 'Tài ăn nói hùng hồn khéo léo thuyết phục lòng người.' }
    ]
  },
  {
    stt: 136,
    strokeCount: 6,
    radical: '舛',
    name: 'Suyễn',
    meaning: 'Sai suyễn, sai lầm, hai chân ngược chiều',
    mnemonic: 'Hai bàn chân quay lưng ngược chiều nhau, bước đi lệch lạc không đồng điệu.',
    relatedVocab: [
      { kanji: '舞う', hiragana: 'まう (mau)', sinoVietnamese: 'VŨ', meaning: 'Múa lượn, khiêu vũ', level: 'N3', breakdown: '舞 (chứa bộ 舛)', mnemonic: 'Đôi chân bước đảo nhịp nhàng theo điệu múa mê say.' },
      { kanji: '舞踏', hiragana: 'ぶとう (butō)', sinoVietnamese: 'VŨ ĐẠP', meaning: 'Vũ hội, khiêu vũ dạ tiệc', level: 'N1', breakdown: '舞 (Vũ - có 舛) + 踏 (Đạp)', mnemonic: 'Đôi bàn chân dẫm nhịp nhàng xoay tròn trong điệu nhạc.' },
      { kanji: '歌舞伎', hiragana: 'かぶき (kabuki)', sinoVietnamese: 'CA VŨ KĨ', meaning: 'Kịch Kabuki truyền thống Nhật Bản', level: 'N2', breakdown: '歌 (Ca) + 舞 (Vũ - có 舛) + 伎 (Kĩ)', mnemonic: 'Nghệ thuật ca múa kịch trường cổ truyền đặc sắc.' },
      { kanji: '舞台', hiragana: 'ぶたい (butai)', sinoVietnamese: 'VŨ ĐÀI', meaning: 'Sân khấu kịch, vũ đài', level: 'N3', breakdown: '舞 (Vũ) + 台 (Đài)', mnemonic: 'Sân khấu tỏa sáng nơi người nghệ sĩ biểu diễn tài ba.' },
      { kanji: '見舞い', hiragana: 'みまい (mimai)', sinoVietnamese: 'KIẾN VŨ', meaning: 'Thăm hỏi người ốm đau', level: 'N4', breakdown: '見 (Kiến) + 舞 (Vũ - có 舛)', mnemonic: 'Cất bước tới thăm hỏi người bệnh mong chóng bình phục.' },
      { kanji: '振る舞う', hiragana: 'ふるまう (furumau)', sinoVietnamese: 'CHẤN VŨ', meaning: 'Cư xử, thết đãi tiệc tùng', level: 'N1', breakdown: '振 (Chấn) + 舞 (Vũ)', mnemonic: 'Cách hành xử hào sảng thết đãi bạn hữu chu đáo.' },
      { kanji: '傑作', hiragana: 'けっさく (kessaku)', sinoVietnamese: 'KIỆT TÁC', meaning: 'Kiệt tác đỉnh cao', level: 'N2', breakdown: 'Chứa kết cấu biến cách của 舛', mnemonic: 'Tác phẩm xuất sắc phi phàm vượt trội thời đại.' },
      { kanji: '舛目', hiragana: 'ますめ (masume)', sinoVietnamese: 'SUYỄN MỤC', meaning: 'Ô vuông chia lưới bàn cờ', level: 'N1', breakdown: '舛 (Suyễn) + 目 (Mục)', mnemonic: 'Các ô đan chéo đối xứng ngay ngắn trên mặt bàn.' },
      { kanji: '舛形', hiragana: 'ますがた (masugata)', sinoVietnamese: 'SUYỄN HÌNH', meaning: 'Khu cửa thành chữ U phòng thủ', level: 'N1', breakdown: '舛 (Suyễn) + 形 (Hình)', mnemonic: 'Cấu trúc cổng thành gấp khúc bẻ gãy đà công kích.' },
      { kanji: '舞い散る', hiragana: 'まいちる (maichiru)', sinoVietnamese: 'VŨ TẢN', meaning: 'Lá hoa bay lả tả trong gió', level: 'N1', breakdown: '舞 (Vũ) + 散 (Tản)', mnemonic: 'Những cánh hoa anh đào bay lượn tản mát khắp trời.' }
    ]
  },
  {
    stt: 137,
    strokeCount: 6,
    radical: '舟',
    name: 'Chu',
    meaning: 'Chiếc thuyền độc mộc',
    mnemonic: 'Hình chiếc thuyền gỗ có mũi nhọn, khoang thuyền và mái chèo lướt sóng.',
    relatedVocab: [
      { kanji: '舟', hiragana: 'ふね (fune)', sinoVietnamese: 'CHU', meaning: 'Chiếc thuyền nhỏ mộc mạc', level: 'N3', breakdown: '舟 (Chu)', mnemonic: 'Chiếc thuyền độc mộc thon dài lướt nhẹ trên mặt nước.' },
      { kanji: '船', hiragana: 'ふね (fune)', sinoVietnamese: 'THUYỀN', meaning: 'Con tàu, con thuyền lớn', level: 'N4', breakdown: '舟 (Chu) + 㕣 (Duyên)', mnemonic: 'Con thuyền lớn chở đầy hàng hóa xuôi dòng nước.' },
      { kanji: '船舶', hiragana: 'せんぱく (senpaku)', sinoVietnamese: 'THUYỀN BẠC', meaning: 'Tàu bè đường thủy', level: 'N1', breakdown: '船 (Thuyền) + 舶 (Bạc - đều có 舟)', mnemonic: 'Đội tàu thuyền bè neo đậu tấp nập tại hải cảng.' },
      { kanji: '航空機', hiragana: 'こうくうき (kōkūki)', sinoVietnamese: 'HÀNG KHÔNG CƠ', meaning: 'Máy bay hàng không', level: 'N2', breakdown: '航 (Hàng - có 舟) + 空 (Không) + 機 (Cơ)', mnemonic: 'Con thuyền bay lượn thám hiểm bầu trời bao la.' },
      { kanji: '航海', hiragana: 'こうかい (kōkai)', sinoVietnamese: 'HÀNG HẢI', meaning: 'Hành trình vượt đại dương', level: 'N2', breakdown: '航 (Hàng - có 舟) + 海 (Hải)', mnemonic: 'Thuyền giương buồm vượt qua sóng to biển lớn.' },
      { kanji: '小舟', hiragana: 'こぶね (kobune)', sinoVietnamese: 'TIỂU CHU', meaning: 'Chiếc thuyền nan nhỏ bé', level: 'N2', breakdown: '小 (Tiểu) + 舟 (Chu)', mnemonic: 'Thuyền nan nhỏ lững lờ trôi trên dòng sông quê.' },
      { kanji: '渡し舟', hiragana: 'わたしぶね (watashibune)', sinoVietnamese: 'ĐỘ CHU', meaning: 'Chuyến đò ngang qua sông', level: 'N2', breakdown: '渡 (Độ) + 舟 (Chu)', mnemonic: 'Chiếc đò đưa đón khách qua lại đôi bờ bến nước.' },
      { kanji: '難破船', hiragana: 'なんぱせん (nanpasen)', sinoVietnamese: 'NAN PHÁ THUYỀN', meaning: 'Con tàu bị đắm vỡ chìm', level: 'N1', breakdown: '難 (Nan) + 破 (Phá) + 船 (Thuyền)', mnemonic: 'Con tàu gặp nạn vỡ tan giữa tâm bão biển sâu.' },
      { kanji: '帆船', hiragana: 'はんせん (hansen)', sinoVietnamese: 'PHÀM THUYỀN', meaning: 'Thuyền buồm căng gió', level: 'N2', breakdown: '帆 (Phàm - cánh buồm) + 船 (Thuyền)', mnemonic: 'Cánh buồm đón gió đẩy con thuyền lướt sóng ra khơi.' },
      { kanji: '舟歌', hiragana: 'ふなうた (funauta)', sinoVietnamese: 'CHU CA', meaning: 'Khúc hát chèo đò du dương', level: 'N1', breakdown: '舟 (Chu) + 歌 (Ca)', mnemonic: 'Điệu hò sông nước vang vọng trong chiều êm ả.' }
    ]
  },
  {
    stt: 138,
    strokeCount: 6,
    radical: '艮',
    name: 'Cấn',
    meaning: 'Quẻ Cấn, dừng lại, bền bỉ',
    mnemonic: 'Con mắt (Mục 目) ngoái nhìn lại phía sau, đôi chân dừng bước không đi nữa.',
    relatedVocab: [
      { kanji: '良い', hiragana: 'よい (yoi)', sinoVietnamese: 'LƯƠNG', meaning: 'Tốt lành, tuyệt vời', level: 'N5', breakdown: '良 (Lương - biến thể từ 艮)', mnemonic: 'Tấm lòng trong sáng lương thiện hướng về điều tốt.' },
      { kanji: '良好', hiragana: 'りょうこう (ryōkō)', sinoVietnamese: 'LƯƠNG HẢO', meaning: 'Tốt đẹp, tiến triển thuận lợi', level: 'N2', breakdown: '良 (Lương) + 好 (Hảo)', mnemonic: 'Tình trạng sức khỏe và công việc tiến triển rất tốt.' },
      { kanji: '限る', hiragana: 'かぎる (kagiru)', sinoVietnamese: 'HẠN', meaning: 'Giới hạn, hạn chế', level: 'N3', breakdown: '阝 (Phụ) + 艮 (Cấn)', mnemonic: 'Chân núi sừng sững làm giới hạn dừng bước.' },
      { kanji: '限界', hiragana: 'げんかい (genkai)', sinoVietnamese: 'HẠN GIỚI', meaning: 'Giới hạn tột cùng', level: 'N2', breakdown: '限 (Hạn - có 艮) + 界 (Giới)', mnemonic: 'Ngưỡng chịu đựng tối đa của con người.' },
      { kanji: '根', hiragana: 'ね (ne)', sinoVietnamese: 'CĂN', meaning: 'Rễ cây bám chặt', level: 'N3', breakdown: '木 (Mộc) + 艮 (Cấn)', mnemonic: 'Rễ cây cắm sâu bám chặt vào lòng đất kiên định.' },
      { kanji: '根本', hiragana: 'こんぽん (konpon)', sinoVietnamese: 'CĂN BẢN', meaning: 'Gốc rễ căn bản vấn đề', level: 'N2', breakdown: '根 (Căn - có 艮) + 本 (Bản)', mnemonic: 'Nền tảng cốt lõi của mọi sự việc.' },
      { kanji: '眼痕', hiragana: 'がんこん (gankon)', sinoVietnamese: 'NHÃN NGÂN', meaning: 'Vết sẹo nơi khóe mắt', level: 'N1', breakdown: 'Chứa gốc chữ 痕 (có 艮)', mnemonic: 'Vết sẹo để lại dấu tích không thể xóa nhòa.' },
      { kanji: '退恨', hiragana: 'たいこん (taikon)', sinoVietnamese: 'THỐI HẬN', meaning: 'Oán hận ngấm ngầm', level: 'N1', breakdown: 'Chứa chữ 恨 (Hận - có 艮)', mnemonic: 'Nỗi căm phẫn găm sâu trong lòng không nguôi.' },
      { kanji: '銀', hiragana: 'ぎん (gin)', sinoVietnamese: 'NGÂN', meaning: 'Bạc, màu ánh bạc sáng', level: 'N4', breakdown: '金 (Kim) + 艮 (Cấn)', mnemonic: 'Kim loại trắng lấp lánh dừng ánh nhìn mê hoặc.' },
      { kanji: '銀行', hiragana: 'ぎんこう (ginkō)', sinoVietnamese: 'NGÂN HÀNG', meaning: 'Ngân hàng tài chính', level: 'N5', breakdown: '銀 (Ngân - có 艮) + 行 (Hành)', mnemonic: 'Nơi lưu thông tiền bạc tài chính của toàn xã hội.' }
    ]
  },
  {
    stt: 139,
    strokeCount: 6,
    radical: '色',
    name: 'Sắc',
    meaning: 'Màu sắc, dáng vẻ, nét mặt',
    mnemonic: 'Người (⺈) đang quỳ (巴) vẻ mặt ửng hồng biểu lộ cảm xúc rực rỡ.',
    relatedVocab: [
      { kanji: '色', hiragana: 'いろ (iro)', sinoVietnamese: 'SẮC', meaning: 'Màu sắc tươi tắn', level: 'N5', breakdown: '色 (Sắc)', mnemonic: 'Hai người ôm lấy nhau bộc lộ sắc thái tình cảm đằm thắm.' },
      { kanji: '景色', hiragana: 'けしき (keshiki)', sinoVietnamese: 'CẢNH SẮC', meaning: 'Phong cảnh thiên nhiên', level: 'N4', breakdown: '景 (Cảnh) + 色 (Sắc)', mnemonic: 'Cảnh tượng non nước hữu tình lung linh sắc màu.' },
      { kanji: '特色', hiragana: 'とくしょく (tokushoku)', sinoVietnamese: 'ĐẶC SẮC', meaning: 'Đặc sắc, điểm độc đáo', level: 'N2', breakdown: '特 (Đặc) + 色 (Sắc)', mnemonic: 'Gam màu cá tính làm nổi bật nét riêng biệt.' },
      { kanji: '色々', hiragana: 'いろいろ (iroiro)', sinoVietnamese: 'SẮC SẮC', meaning: 'Nhiều loại, phong phú', level: 'N5', breakdown: '色 (Sắc) lặp lại', mnemonic: 'Muôn vàn màu sắc rực rỡ phong phú đa dạng.' },
      { kanji: '茶色', hiragana: 'ちゃいろ (chairo)', sinoVietnamese: 'TRÀ SẮC', meaning: 'Màu nâu trà trầm ấm', level: 'N5', breakdown: '茶 (Trà) + 色 (Sắc)', mnemonic: 'Màu nâu mộc mạc như màu nước trà xanh đậm.' },
      { kanji: '黄色', hiragana: 'きいろ (kiiro)', sinoVietnamese: 'HOÀNG SẮC', meaning: 'Màu vàng rực rỡ', level: 'N5', breakdown: '黄 (Hoàng) + 色 (Sắc)', mnemonic: 'Sắc vàng tươi sáng của ánh nắng mặt trời.' },
      { kanji: '青色', hiragana: 'あおいろ (aoiro)', sinoVietnamese: 'THANH SẮC', meaning: 'Màu xanh da trời, xanh lam', level: 'N5', breakdown: '青 (Thanh) + 色 (Sắc)', mnemonic: 'Màu xanh thanh bình của đại dương và bầu trời.' },
      { kanji: '黒色', hiragana: 'くろいろ (kuroiro)', sinoVietnamese: 'HẮC SẮC', meaning: 'Màu đen tuyền', level: 'N5', breakdown: '黒 (Hắc) + 色 (Sắc)', mnemonic: 'Sắc đen huyền bí như đêm tối mịt mù.' },
      { kanji: '灰色', hiragana: 'はいいろ (haiiro)', sinoVietnamese: 'HÔI SẮC', meaning: 'Màu xám tro', level: 'N4', breakdown: '灰 (Hôi) + 色 (Sắc)', mnemonic: 'Sắc xám tĩnh lặng như tàn tro bếp lửa.' },
      { kanji: '気色', hiragana: 'けしき (keshiki) / きしょく', sinoVietnamese: 'KHÍ SẮC', meaning: 'Sắc mặt, tâm trạng biểu hiện', level: 'N1', breakdown: '気 (Khí) + 色 (Sắc)', mnemonic: 'Nét mặt và khí sắc bộc lộ rõ tâm tư bên trong.' }
    ]
  },
  {
    stt: 140,
    strokeCount: 6,
    radical: '艸',
    variants: ['艹'],
    name: 'Thảo',
    meaning: 'Cỏ cây hoa lá, thảo mộc',
    mnemonic: 'Hai mầm cỏ non (屮) mọc sát nhau tạo thành bãi cỏ xanh ngát.',
    relatedVocab: [
      { kanji: '草', hiragana: 'くさ (kusa)', sinoVietnamese: 'THẢO', meaning: 'Cỏ xanh, ngọn cỏ', level: 'N4', breakdown: '艹 (Thảo) + 早 (Tảo)', mnemonic: 'Những mầm cỏ non đâm chồi sớm mai đón sương sớm.' },
      { kanji: '花', hiragana: 'はな (hana)', sinoVietnamese: 'HOA', meaning: 'Bông hoa tươi thắm', level: 'N5', breakdown: '艹 (Thảo) + 化 (Hóa)', mnemonic: 'Cây cỏ biến hóa nở ra những đóa hoa thơm ngát.' },
      { kanji: 'お茶', hiragana: 'おちゃ (ocha)', sinoVietnamese: 'TRÀ', meaning: 'Trà xanh, chè', level: 'N5', breakdown: '艹 (Thảo) + 人 + 木', mnemonic: 'Lá thảo mộc con người hái từ cành cây pha nước uống.' },
      { kanji: '薬', hiragana: 'くすり (kusuri)', sinoVietnamese: 'DƯỢC', meaning: 'Thuốc chữa bệnh', level: 'N4', breakdown: '艹 (Thảo) + 楽 (Lạc)', mnemonic: 'Cỏ cây thảo dược giúp cơ thể khỏi bệnh vui vẻ trở lại.' },
      { kanji: '若い', hiragana: 'わかい (wakai)', sinoVietnamese: 'NHƯỢC', meaning: 'Trẻ trung, tươi trẻ', level: 'N5', breakdown: '艹 (Thảo) + 右 (Hữu)', mnemonic: 'Sức sống tươi non dồi dào như ngọn cỏ mùa xuân.' },
      { kanji: '苦しい', hiragana: 'くるしい (kurushii)', sinoVietnamese: 'KHỔ', meaning: 'Đau khổ, đắng cay', level: 'N4', breakdown: '艹 (Thảo) + 古 (Cổ)', mnemonic: 'Nếm ngọn cỏ đắng từ ngàn xưa đọng lại vị cay đắng.' },
      { kanji: '荷物', hiragana: 'にもつ (nimotsu)', sinoVietnamese: 'HÀ VẬT', meaning: 'Hành lý, đồ đạc mang theo', level: 'N5', breakdown: '荷 (Hà - có 艹) + 物 (Vật)', mnemonic: 'Gánh nặng thảo mộc đồ đạc trên vai đường xa.' },
      { kanji: '英語', hiragana: 'えいご (eigo)', sinoVietnamese: 'ANH NGỮ', meaning: 'Tiếng Anh', level: 'N5', breakdown: '英 (Anh - có 艹) + 語 (Ngữ)', mnemonic: 'Ngôn ngữ tinh hoa rực rỡ như hoa cỏ nước Anh.' },
      { kanji: '葉っぱ', hiragana: 'はっぱ (happa)', sinoVietnamese: 'DIỆP', meaning: 'Chiếc lá cây xanh tươi', level: 'N3', breakdown: '葉 (Diệp - có 艹)', mnemonic: 'Những phiến lá non xanh rì xào xạc trong gió.' },
      { kanji: '菜園', hiragana: 'さいえん (saien)', sinoVietnamese: 'THÁI VIÊN', meaning: 'Vườn rau xanh mướt', level: 'N2', breakdown: '菜 (Thái - có 艹) + 園 (Viên)', mnemonic: 'Mảnh vườn trồng đủ thứ rau củ tươi ngon.' }
    ]
  },
  {
    stt: 141,
    strokeCount: 6,
    radical: '虍',
    name: 'Hổ',
    meaning: 'Vằn vện của loài hổ dữ',
    mnemonic: 'Hình cái đầu hổ với những vệt lông vằn vện oai nghiêm dữ tợn.',
    relatedVocab: [
      { kanji: '虎', hiragana: 'とら (tora)', sinoVietnamese: 'HỔ', meaning: 'Con hổ chúa sơn lâm', level: 'N3', breakdown: '虎 (Hổ)', mnemonic: 'Chúa sơn lâm có bộ lông vằn và tiếng gầm vang dội.' },
      { kanji: '虐待', hiragana: 'ぎゃくたい (gyakutai)', sinoVietnamese: 'NGƯỢC ĐÃI', meaning: 'Ngược đãi tàn nhẫn', level: 'N1', breakdown: '虐 (Ngược - có 虍) + 待 (Đãi)', mnemonic: 'Hành vi tàn bạo xé xác như vuốt cọp dữ.' },
      { kanji: '虚偽', hiragana: 'きょぎ (kyogi)', sinoVietnamese: 'HƯ NGỤY', meaning: 'Giả dối dối trá', level: 'N1', breakdown: '虚 (Hư - có 虍) + 偽 (Ngụy)', mnemonic: 'Lời nói rỗng tuếch lừa mị như vẽ cọp giấy.' },
      { kanji: '虜', hiragana: 'とりこ (toriko)', sinoVietnamese: 'LỖ', meaning: 'Tù binh / say đắm lòng người', level: 'N1', breakdown: '虍 (Hổ) + 男 (Nam)', mnemonic: 'Bị vuốt cọp bắt giữ làm tù binh giam cầm.' },
      { kanji: '虚弱', hiragana: 'きょじゃく (kyojaku)', sinoVietnamese: 'HƯ NHƯỢC', meaning: 'Yếu đuối gầy còm', level: 'N1', breakdown: '虚 (Hư) + 弱 (Nhược)', mnemonic: 'Sức khỏe suy kiệt khí lực tiêu tán.' },
      { kanji: '謙虚', hiragana: 'けんきょ (kenkyo)', sinoVietnamese: 'KHIÊM HƯ', meaning: 'Khiêm tốn nhã nhặn', level: 'N2', breakdown: '謙 (Khiêm) + 虚 (Hư)', mnemonic: 'Để lòng mình trống rỗng sẵn sàng học hỏi mọi người.' },
      { kanji: '劇', hiragana: 'げき (geki)', sinoVietnamese: 'KỊCH', meaning: 'Vở kịch sân khấu / kịch liệt', level: 'N3', breakdown: '虍 (Hổ) + 豕 (Thỉ) + 刂 (Đao)', mnemonic: 'Cọp và lợn rừng giao chiến quyết liệt như màn kịch.' },
      { kanji: '劇的', hiragana: 'げきてき (gekiteki)', sinoVietnamese: 'KỊCH ĐÍCH', meaning: 'Kịch tính bất ngờ', level: 'N1', breakdown: '劇 (Kịch) + 的 (Đích)', mnemonic: 'Tình huống đảo ngược đầy hồi hộp bất ngờ.' },
      { kanji: '虎口', hiragana: 'ここう (kokō)', sinoVietnamese: 'HỔ KHẨU', meaning: 'Miệng cọp, hang hùm hiểm nguy', level: 'N1', breakdown: '虎 (Hổ) + 口 (Khẩu)', mnemonic: 'Cửa ải sinh tử ngàn cân treo sợi tóc.' },
      { kanji: '暴虐', hiragana: 'ぼうぎゃく (bōgyaku)', sinoVietnamese: 'BẠO NGƯỢC', meaning: 'Tàn bạo độc ác', level: 'N1', breakdown: '暴 (Bạo) + 虐 (Ngược)', mnemonic: 'Sự hung tàn bạo ngược của kẻ độc tài.' }
    ]
  },
  {
    stt: 142,
    strokeCount: 6,
    radical: '虫',
    name: 'Trùng',
    meaning: 'Côn trùng, sâu bọ, rắn rết',
    mnemonic: 'Hình con sâu hoặc con rắn có cái đầu hình tam giác và cái đuôi ngóc lên.',
    relatedVocab: [
      { kanji: '虫', hiragana: 'むし (mushi)', sinoVietnamese: 'TRÙNG', meaning: 'Côn trùng, sâu bọ', level: 'N4', breakdown: '虫 (Trùng)', mnemonic: 'Con sâu nhỏ uốn mình bò trên phiến lá xanh.' },
      { kanji: '昆虫', hiragana: 'こんちゅう (konchū)', sinoVietnamese: 'CÔN TRÙNG', meaning: 'Các loài côn trùng', level: 'N2', breakdown: '昆 (Côn) + 虫 (Trùng)', mnemonic: 'Thế giới các loài côn trùng nhiều chân đa dạng.' },
      { kanji: '蚊', hiragana: 'か (ka)', sinoVietnamese: 'VĂN', meaning: 'Con muỗi vo ve', level: 'N3', breakdown: '虫 (Trùng) + 文 (Văn)', mnemonic: 'Con côn trùng bay phát ra tiếng vo ve như đọc văn.' },
      { kanji: '蛇', hiragana: 'へび (hebi)', sinoVietnamese: 'XÀ', meaning: 'Con rắn trườn bò', level: 'N3', breakdown: '虫 (Trùng) + 它 (Tha)', mnemonic: 'Loài bò sát không chân trườn mình dưới bụi cỏ.' },
      { kanji: '蛍', hiragana: 'ほたる (hotaru)', sinoVietnamese: 'HUỲNH', meaning: 'Con đom đóm lập lòe', level: 'N2', breakdown: '虫 (Trùng) + 爫', mnemonic: 'Con trùng nhỏ phát ra ánh sáng lung linh trong đêm.' },
      { kanji: '蜂', hiragana: 'はち (hachi)', sinoVietnamese: 'PHONG', meaning: 'Con ong chăm chỉ', level: 'N2', breakdown: '虫 (Trùng) + 夆 (Phùng)', mnemonic: 'Đàn ong bay đi tìm hoa hút mật ngọt.' },
      { kanji: '蝶', hiragana: 'ちょう (chō)', sinoVietnamese: 'ĐIỆP', meaning: 'Con bươm bướm rực rỡ', level: 'N2', breakdown: '虫 (Trùng) + 枼 (Diệp)', mnemonic: 'Cánh bướm bay dập dờn như chiếc lá lượn trên cành.' },
      { kanji: '害虫', hiragana: 'がいちゅう (gaichū)', sinoVietnamese: 'HẠI TRÙNG', meaning: 'Côn trùng gây hại mùa màng', level: 'N2', breakdown: '害 (Hại) + 虫 (Trùng)', mnemonic: 'Sâu bọ cắn phá hoa màu của nhà nông.' },
      { kanji: '虫歯', hiragana: 'むしば (mushiba)', sinoVietnamese: 'TRÙNG XỈ', meaning: 'Răng sâu bị hỏng', level: 'N4', breakdown: '虫 (Trùng) + 歯 (Xỉ)', mnemonic: 'Vi khuẩn gặm nhấm làm răng đau nhức.' },
      { kanji: '蜘蛛', hiragana: 'くも (kumo)', sinoVietnamese: 'TRI THƯ', meaning: 'Con nhện giăng tơ', level: 'N1', breakdown: '虫 (Trùng) + 知 + 朱', mnemonic: 'Loài côn trùng giăng mạng lưới tơ bẫy mồi.' }
    ]
  },
  {
    stt: 143,
    strokeCount: 6,
    radical: '血',
    name: 'Huyết',
    meaning: 'Máu, huyết quản',
    mnemonic: 'Một giọt máu (nét phẩy) nhỏ vào trong chiếc đĩa tế lễ (Mãnh 皿).',
    relatedVocab: [
      { kanji: '血', hiragana: 'ち (chi)', sinoVietnamese: 'HUYẾT', meaning: 'Máu đỏ', level: 'N4', breakdown: '血 (Huyết)', mnemonic: 'Giọt máu đỏ rơi vào chiếc đĩa tế thần 皿.' },
      { kanji: '血管', hiragana: 'けっかん (kekkan)', sinoVietnamese: 'HUYẾT QUẢN', meaning: 'Mạch máu, mạch dẫn', level: 'N2', breakdown: '血 (Huyết) + 管 (Quản)', mnemonic: 'Hệ thống ống dẫn máu nuôi sống toàn bộ cơ thể.' },
      { kanji: '輸血', hiragana: 'ゆけつ (yuketsu)', sinoVietnamese: 'THÂU HUYẾT', meaning: 'Truyền máu cứu người', level: 'N2', breakdown: '輸 (Thâu) + 血 (Huyết)', mnemonic: 'Chuyển máu tương thích cứu chữa bệnh nhân.' },
      { kanji: '流血', hiragana: 'りゅうけつ (ryūketsu)', sinoVietnamese: 'LƯU HUYẾT', meaning: 'Chảy máu, đổ máu chiến tranh', level: 'N1', breakdown: '流 (Lưu) + 血 (Huyết)', mnemonic: 'Dòng máu đỏ tuôn rơi trong xung đột.' },
      { kanji: '冷血', hiragana: 'れいけつ (reiketsu)', sinoVietnamese: 'LÃNH HUYẾT', meaning: 'Máu lạnh vô tình', level: 'N1', breakdown: '冷 (Lãnh) + 血 (Huyết)', mnemonic: 'Trái tim băng giá không chút lòng trắc ẩn.' },
      { kanji: '血圧', hiragana: 'けつあつ (ketsuatsu)', sinoVietnamese: 'HUYẾT ÁP', meaning: 'Huyết áp tim mạch', level: 'N2', breakdown: '血 (Huyết) + 圧 (Áp)', mnemonic: 'Áp lực dòng máu chảy qua thành mạch.' },
      { kanji: '鼻血', hiragana: 'はなぢ (hanaji)', sinoVietnamese: 'TỊ HUYẾT', meaning: 'Chảy máu cam', level: 'N2', breakdown: '鼻 (Tị) + 血 (Huyết)', mnemonic: 'Máu chảy ra từ khóe mũi khi nóng trong người.' },
      { kanji: '血筋', hiragana: 'ちすじ (chisuji)', sinoVietnamese: 'HUYẾT CÂN', meaning: 'Dòng máu huyết thống', level: 'N1', breakdown: '血 (Huyết) + 筋 (Cân)', mnemonic: 'Dòng máu tổ tiên lưu truyền qua bao đời con cháu.' },
      { kanji: '採血', hiragana: 'さいけつ (saiketsu)', sinoVietnamese: 'THẢI HUYẾT', meaning: 'Lấy mẫu máu xét nghiệm', level: 'N1', breakdown: '採 (Thải) + 血 (Huyết)', mnemonic: 'Rút một lượng máu nhỏ để kiểm tra sức khỏe.' },
      { kanji: '熱血', hiragana: 'ねっけつ (nekketsu)', sinoVietnamese: 'NHIỆT HUYẾT', meaning: 'Nhiệt huyết sục sôi', level: 'N1', breakdown: '熱 (Nhiệt) + 血 (Huyết)', mnemonic: 'Dòng máu sôi sục ngập tràn đam mê cống hiến.' }
    ]
  },
  {
    stt: 144,
    strokeCount: 6,
    radical: '行',
    name: 'Hành',
    meaning: 'Đi lại, thi hành, giao lộ',
    mnemonic: 'Bước chân trái (彳) và bước chân phải (亍) cùng bước đi trên giao lộ.',
    relatedVocab: [
      { kanji: '行く', hiragana: 'いく (iku)', sinoVietnamese: 'HÀNH', meaning: 'Đi đến, bước đi', level: 'N5', breakdown: '行 (Hành)', mnemonic: 'Con người bước qua ngã tư đường rộng thênh thang.' },
      { kanji: '旅行', hiragana: 'りょこう (ryokō)', sinoVietnamese: 'LỮ HÀNH', meaning: 'Du lịch, chuyến đi', level: 'N5', breakdown: '旅 (Lữ) + 行 (Hành)', mnemonic: 'Chuyến đi xa khám phá những vùng đất mới lạ.' },
      { kanji: '行動', hiragana: 'こうどう (kōdō)', sinoVietnamese: 'HÀNH ĐỘNG', meaning: 'Hành động thực tế', level: 'N3', breakdown: '行 (Hành) + 動 (Động)', mnemonic: 'Biến suy nghĩ thành việc làm cụ thể.' },
      { kanji: '銀行', hiragana: 'ぎんこう (ginkō)', sinoVietnamese: 'NGÂN HÀNG', meaning: 'Ngân hàng', level: 'N5', breakdown: '銀 (Ngân) + 行 (Hàng)', mnemonic: 'Nơi các thương gia giao dịch vàng bạc tấp nập.' },
      { kanji: '行列', hiragana: 'ぎょうれつ (gyōretsu)', sinoVietnamese: 'HÀNH LIỆT', meaning: 'Hàng người xếp hàng dài', level: 'N2', breakdown: '行 (Hành) + 列 (Liệt)', mnemonic: 'Dòng người trật tự nối đuôi nhau đợi đến lượt.' },
      { kanji: '行儀', hiragana: 'ぎょうぎ (gyōgi)', sinoVietnamese: 'HÀNH NGHI', meaning: 'Phép tắc lễ nghi cư xử', level: 'N2', breakdown: '行 (Hành) + 儀 (Nghi)', mnemonic: 'Cử chỉ tao nhã đúng chuẩn mực gia phong.' },
      { kanji: '飛行機', hiragana: 'ひこうき (hikōki)', sinoVietnamese: 'PHI HÀNH CƠ', meaning: 'Máy bay', level: 'N5', breakdown: '飛 (Phi) + 行 (Hành) + 機 (Cơ)', mnemonic: 'Chiếc máy bay lượn trên bầu trời xanh thẳm.' },
      { kanji: '行事', hiragana: 'ぎょうじ (gyōji)', sinoVietnamese: 'HÀNH SỰ', meaning: 'Sự kiện, lễ hội tổ chức', level: 'N3', breakdown: '行 (Hành) + 事 (Sự)', mnemonic: 'Các hoạt động phong trào được tổ chức trong năm.' },
      { kanji: '運行', hiragana: 'うんこう (unkō)', sinoVietnamese: 'VẬN HÀNH', meaning: 'Vận hành tàu xe đúng giờ', level: 'N2', breakdown: '運 (Vận) + 行 (Hành)', mnemonic: 'Lịch trình tàu điện chuyển động an toàn thông suốt.' },
      { kanji: '実行', hiragana: 'じっこう (jikkō)', sinoVietnamese: 'THỰC HÀNH', meaning: 'Thực hiện cam kết', level: 'N2', breakdown: '実 (Thực) + 行 (Hành)', mnemonic: 'Bắt tay vào thực thi kế hoạch đã đề ra.' }
    ]
  },
  {
    stt: 145,
    strokeCount: 6,
    radical: '衣',
    variants: ['衤'],
    name: 'Y',
    meaning: 'Áo quần, trang phục',
    mnemonic: 'Hình chiếc áo cổ truyền với cổ áo trên cùng và hai vạt áo rủ xuống (2 chấm phải).',
    relatedVocab: [
      { kanji: '衣服', hiragana: 'いふく (ifuku)', sinoVietnamese: 'Y PHỤC', meaning: 'Quần áo may mặc', level: 'N3', breakdown: '衣 (Y) + 服 (Phục)', mnemonic: 'Trang phục chỉnh tề khoác lên người giữ ấm và làm đẹp.' },
      { kanji: '衣類', hiragana: 'いるい (irui)', sinoVietnamese: 'Y LOẠI', meaning: 'Các loại trang phục', level: 'N2', breakdown: '衣 (Y) + 類 (Loại)', mnemonic: 'Tất cả các chủng loại quần áo dệt may.' },
      { kanji: '初め', hiragana: 'はじめ (hajime)', sinoVietnamese: 'SƠ', meaning: 'Khởi đầu, ban đầu', level: 'N5', breakdown: '衤 (Y) + 刀 (Đao)', mnemonic: 'Hạ nhát kéo đầu tiên cắt vải may chiếc áo mới.' },
      { kanji: '被る', hiragana: 'かぶる (kaburu)', sinoVietnamese: 'BỊ', meaning: 'Đội mũ, trùm đầu / gánh chịu', level: 'N3', breakdown: '被 (có 衤)', mnemonic: 'Trùm tấm áo qua đầu để che mưa nắng.' },
      { kanji: '被害', hiragana: 'ひがい (higai)', sinoVietnamese: 'BỊ HẠI', meaning: 'Thiệt hại sau thiên tai', level: 'N3', breakdown: '被 (Bị - có 衤) + 害 (Hại)', mnemonic: 'Gánh chịu tổn thất do tai ương ập tới.' },
      { kanji: '複雑', hiragana: 'ふくざつ (fukuzatsu)', sinoVietnamese: 'PHỨC TẠP', meaning: 'Phức tạp, rắc rối', level: 'N4', breakdown: '複 (Phức - có 衤) + 雑 (Tạp)', mnemonic: 'Nhiều lớp áo chồng chéo đan xen phức tạp.' },
      { kanji: '補修', hiragana: 'ほしゅう (hoshū)', sinoVietnamese: 'BỔ TU', meaning: 'Sửa chữa, tu bổ', level: 'N1', breakdown: '補 (Bổ - có 衤) + 修 (Tu)', mnemonic: 'Vá lại mảnh áo rách cho lành lặn đẹp đẽ.' },
      { kanji: '裕福', hiragana: 'ゆうふく (yūfuku)', sinoVietnamese: 'DỤ PHÚC', meaning: 'Giàu sang ấm no', level: 'N1', breakdown: '裕 (Dụ - có 衤) + 福 (Phúc)', mnemonic: 'Áo quần sung túc lụa là ấm no cả đời.' },
      { kanji: '袖', hiragana: 'そで (sode)', sinoVietnamese: 'TỤ', meaning: 'Ống tay áo kimono', level: 'N2', breakdown: '衤 (Y) + 由 (Do)', mnemonic: 'Phần ống tay áo buông dài thướt tha.' },
      { kanji: '襟', hiragana: 'えり (eri)', sinoVietnamese: 'KHÂM', meaning: 'Cổ áo sơ mi', level: 'N2', breakdown: '衤 (Y) + 禁 (Cấm)', mnemonic: 'Cổ áo ôm sát vòng cổ trang nhã lịch thiệp.' }
    ]
  },
  {
    stt: 146,
    strokeCount: 6,
    radical: '襾',
    variants: ['西', '覀'],
    name: 'Á',
    meaning: 'Che đậy, úp lên, phương Tây',
    mnemonic: 'Hình cái nắp đậy kín từ phía trên xuống hoặc chiếc tổ chim.',
    relatedVocab: [
      { kanji: '西', hiragana: 'にし (nishi)', sinoVietnamese: 'TÂY', meaning: 'Phương tây mặt trời lặn', level: 'N5', breakdown: '西 (Tây)', mnemonic: 'Mặt trời lặn sau tổ chim ở phương Tây.' },
      { kanji: '要る', hiragana: 'いる (iru)', sinoVietnamese: 'YẾU', meaning: 'Cần thiết', level: 'N5', breakdown: '覀 (Á) + 女 (Nữ)', mnemonic: 'Phụ nữ thắt lưng che khăn là điều cốt yếu.' },
      { kanji: '重要', hiragana: 'じゅうよう (jūyō)', sinoVietnamese: 'TRỌNG YẾU', meaning: 'Quan trọng, cốt lõi', level: 'N3', breakdown: '重 (Trọng) + 要 (Yếu)', mnemonic: 'Vấn đề mấu chốt quyết định thành bại.' },
      { kanji: '西洋', hiragana: 'せいよう (seiyō)', sinoVietnamese: 'TÂY DƯƠNG', meaning: 'Phương Tây Âu Mỹ', level: 'N4', breakdown: '西 (Tây) + 洋 (Dương)', mnemonic: 'Các quốc gia bên bờ đại dương phía Tây.' },
      { kanji: '覆う', hiragana: 'おおう (ōʊ)', sinoVietnamese: 'PHÚC', meaning: 'Bao phủ, che trùm', level: 'N2', breakdown: '覀 (Á) + 復 (Phục)', mnemonic: 'Cái nắp đậy che phủ kín toàn bộ đồ vật bên dưới.' },
      { kanji: '覆折', hiragana: 'ふくせつ (fukusetsu)', sinoVietnamese: 'PHÚC CHIẾT', meaning: 'Lật đổ đỗ vỡ', level: 'N1', breakdown: '覆 (Phúc - có 覀) + 折 (Chiết)', mnemonic: 'Chiếc xe lật úp giữa chặng đường gian nan.' },
      { kanji: '要求', hiragana: 'ようきゅう (yōkyū)', sinoVietnamese: 'YÊU CẦU', meaning: 'Đòi hỏi, yêu cầu', level: 'N3', breakdown: '要 (Yếu) + 求 (Cầu)', mnemonic: 'Đưa ra đòi hỏi thiết yếu cần đáp ứng.' },
      { kanji: '要約', hiragana: 'ようやく (yōyaku)', sinoVietnamese: 'YẾU ƯỚC', meaning: 'Tóm tắt đại ý', level: 'N2', breakdown: '要 (Yếu) + 約 (Ước)', mnemonic: 'Tóm lược những ý chính cốt lõi ngắn gọn.' },
      { kanji: '転覆', hiragana: 'てんぷく (tenpuku)', sinoVietnamese: 'CHUYỂN PHÚC', meaning: 'Lật nhào, chìm tàu', level: 'N1', breakdown: '転 (Chuyển) + 覆 (Phúc)', mnemonic: 'Con tàu bị sóng đánh lật úp đáy lên trời.' },
      { kanji: '西暦', hiragana: 'せいれき (seireki)', sinoVietnamese: 'TÂY LỊCH', meaning: 'Dương lịch quốc tế', level: 'N2', breakdown: '西 (Tây) + 暦 (Lịch)', mnemonic: 'Lịch tính năm theo phương thức phương Tây.' }
    ]
  },
  // Nhóm 7 nét (Bộ 147 – 166)
  {
    stt: 147,
    strokeCount: 7,
    radical: '見',
    name: 'Kiến',
    meaning: 'Trông thấy, nhìn nhận',
    mnemonic: 'Con mắt (Mục 目) gắn trên đôi chân người (Nhi 儿) đi khắp nơi để quan sát.',
    relatedVocab: [
      { kanji: '見る', hiragana: 'みる (miru)', sinoVietnamese: 'KIẾN', meaning: 'Nhìn, xem, trông thấy', level: 'N5', breakdown: '目 (Mục) + 儿 (Nhi - đôi chân)', mnemonic: 'Đôi mắt đứng trên đôi chân quan sát vạn vật.' },
      { kanji: '意見', hiragana: 'いけん (iken)', sinoVietnamese: 'Ý KIẾN', meaning: 'Ý kiến đóng góp', level: 'N4', breakdown: '意 (Ý) + 見 (Kiến)', mnemonic: 'Góc nhìn và quan điểm của bản thân về sự việc.' },
      { kanji: '見学', hiragana: 'けんがく (kengaku)', sinoVietnamese: 'KIẾN HỌC', meaning: 'Tham quan học hỏi thực tế', level: 'N4', breakdown: '見 (Kiến) + 学 (Học)', mnemonic: 'Đi tận nơi tận mắt chứng kiến để tiếp thu tri thức.' },
      { kanji: '発見', hiragana: 'はっけん (hakken)', sinoVietnamese: 'PHÁT KIẾN', meaning: 'Phát hiện ra điều mới', level: 'N3', breakdown: '発 (Phát) + 見 (Kiến)', mnemonic: 'Tìm thấy và nhìn ra những chân trời mới.' },
      { kanji: '拝見', hiragana: 'はいけん (haiken)', sinoVietnamese: 'BÁI KIẾN', meaning: 'Kính cẩn xem qua (khiêm nhường)', level: 'N3', breakdown: '拝 (Bái) + 見 (Kiến)', mnemonic: 'Cúi đầu kính cẩn chiêm ngưỡng tài liệu của cấp trên.' },
      { kanji: '偏見', hiragana: 'へんけん (henken)', sinoVietnamese: 'THIÊN KIẾN', meaning: 'Định kiến hẹp hòi', level: 'N1', breakdown: '偏 (Thiên) + 見 (Kiến)', mnemonic: 'Ánh nhìn lệch lạc phiến diện một chiều.' },
      { kanji: '見事', hiragana: 'みごと (migoto)', sinoVietnamese: 'KIẾN SỰ', meaning: 'Tuyệt vời, ngoạn mục', level: 'N3', breakdown: '見 (Kiến) + 事 (Sự)', mnemonic: 'Thành quả tuyệt mỹ ai nhìn vào cũng ngợi khen.' },
      { kanji: '見解', hiragana: 'けんかい (kenkai)', sinoVietnamese: 'KIẾN GIẢI', meaning: 'Quan điểm phân tích', level: 'N2', breakdown: '見 (Kiến) + 解 (Giải)', mnemonic: 'Góc nhìn thấu đáo giải mã rõ nguyên nhân.' },
      { kanji: '予見', hiragana: 'よけん (yoken)', sinoVietnamese: 'DỰ KIẾN', meaning: 'Dự đoán trước tương lai', level: 'N1', breakdown: '予 (Dự) + 見 (Kiến)', mnemonic: 'Nhìn thấy trước những viễn cảnh sắp xảy ra.' },
      { kanji: '一見', hiragana: 'いっけん (ikken)', sinoVietnamese: 'NHẤT KIẾN', meaning: 'Thoạt nhìn qua, ngắm nhìn một lần', level: 'N2', breakdown: '一 (Nhất) + 見 (Kiến)', mnemonic: 'Chỉ vừa liếc mắt nhìn qua đã nhận ra ngay.' }
    ]
  },
  {
    stt: 148,
    strokeCount: 7,
    radical: '角',
    name: 'Giác',
    meaning: 'Góc cạnh, sừng thú',
    mnemonic: 'Hình chiếc sừng thú có đầu nhọn ở trên và các khấc vân sừng bên dưới.',
    relatedVocab: [
      { kanji: '角', hiragana: 'かど (kado) / つの (tsuno)', sinoVietnamese: 'GIÁC', meaning: 'Góc đường / sừng hươu', level: 'N4', breakdown: '角 (Giác)', mnemonic: 'Chiếc sừng cong nhọn trên đầu con thú.' },
      { kanji: '方角', hiragana: 'ほうがく (hōgaku)', sinoVietnamese: 'PHƯƠNG GIÁC', meaning: 'Phương hướng la bàn', level: 'N3', breakdown: '方 (Phương) + 角 (Giác)', mnemonic: 'Góc quay của kim chỉ nam xác định phương hướng.' },
      { kanji: '三角形', hiragana: 'さんかっけい (sankakkei)', sinoVietnamese: 'TAM GIÁC HÌNH', meaning: 'Hình tam giác ba cạnh', level: 'N3', breakdown: '三 (Tam) + 角 (Giác) + 形 (Hình)', mnemonic: 'Hình học khép kín có ba đỉnh nhọn.' },
      { kanji: '角度', hiragana: 'かくど (kakudo)', sinoVietnamese: 'GIÁC ĐỘ', meaning: 'Góc độ, góc nhìn', level: 'N3', breakdown: '角 (Giác) + 度 (Độ)', mnemonic: 'Độ mở của hai đường thẳng hoặc góc nhìn nhận sự việc.' },
      { kanji: '四角い', hiragana: 'しかくい (shikakui)', sinoVietnamese: 'TỨ GIÁC', meaning: 'Vuông vắn, có bốn góc', level: 'N5', breakdown: '四 (Tứ) + 角 (Giác)', mnemonic: 'Chiếc hộp vuông vức vát bốn góc ngay ngắn.' },
      { kanji: '視角', hiragana: 'しかく (shikaku)', sinoVietnamese: 'THỊ GIÁC', meaning: 'Góc nhìn quan sát', level: 'N1', breakdown: '視 (Thị) + 角 (Giác)', mnemonic: 'Góc độ mà mắt ta quan sát toàn cảnh sự vật.' },
      { kanji: '街角', hiragana: 'まちかど (machikado)', sinoVietnamese: 'NHAI GIÁC', meaning: 'Góc phố rẽ lối', level: 'N2', breakdown: '街 (Nhai) + 角 (Giác)', mnemonic: 'Góc rẽ nơi con phố đông đúc người qua lại.' },
      { kanji: '角突き合わせる', hiragana: 'つのつきあわせる', sinoVietnamese: 'GIÁC ĐỘT HỢP', meaning: 'Húc sừng vào nhau, đối đầu nảy lửa', level: 'N1', breakdown: '角 (Giác) + 突 (Đột)', mnemonic: 'Hai con trâu mộng chọi sừng không ai nhường ai.' },
      { kanji: '直角', hiragana: 'ちょっかく (chokkaku)', sinoVietnamese: 'TRỰC GIÁC', meaning: 'Góc vuông 90 độ', level: 'N2', breakdown: '直 (Trực) + 角 (Giác)', mnemonic: 'Góc vuông thẳng tắp chuẩn xác trong hình học.' },
      { kanji: '一角', hiragana: 'いっかく (ikkaku)', sinoVietnamese: 'NHẤT GIÁC', meaning: 'Một góc, một phần', level: 'N1', breakdown: '一 (Nhất) + 角 (Giác)', mnemonic: 'Chiếm một góc nhỏ trong tổng thể bức tranh.' }
    ]
  },
  {
    stt: 149,
    strokeCount: 7,
    radical: '言',
    variants: ['訁'],
    name: 'Ngôn',
    meaning: 'Lời nói, ngôn ngữ',
    mnemonic: 'Những làn sóng âm thanh (4 nét ngang) phát ra từ cái miệng (Khẩu 口).',
    relatedVocab: [
      { kanji: '言う', hiragana: 'いう (iu)', sinoVietnamese: 'NGÔN', meaning: 'Nói, phát biểu', level: 'N5', breakdown: '言 (Ngôn)', mnemonic: 'Những làn sóng âm thanh phát ra từ vòm miệng truyền đi thông điệp.' },
      { kanji: '言葉', hiragana: 'ことば (kotoba)', sinoVietnamese: 'NGÔN DIỆP', meaning: 'Từ ngữ, tiếng nói', level: 'N5', breakdown: '言 (Ngôn) + 葉 (Diệp)', mnemonic: 'Lời nói đơm hoa kết trái như những chiếc lá xanh tươi.' },
      { kanji: '言語', hiragana: 'げんご (gengo)', sinoVietnamese: 'NGÔN NGỮ', meaning: 'Ngôn ngữ giao tiếp', level: 'N3', breakdown: '言 (Ngôn) + 語 (Ngữ)', mnemonic: 'Hệ thống tiếng nói giao lưu của loài người.' },
      { kanji: '説明', hiragana: 'せつめい (setsumei)', sinoVietnamese: 'THUYẾT MINH', meaning: 'Giải thích, thuyết minh', level: 'N4', breakdown: '説 (Thuyết - có 言) + 明 (Minh)', mnemonic: 'Dùng lời nói sáng tỏ làm rõ mọi khúc mắc.' },
      { kanji: '計画', hiragana: 'けいかく (keikaku)', sinoVietnamese: 'KẾ HOẠCH', meaning: 'Kế hoạch định hướng', level: 'N4', breakdown: '計 (Kế - có 言) + 画 (Họa)', mnemonic: 'Bàn thảo và tính toán đường đi nước bước cẩn thận.' },
      { kanji: '話す', hiragana: 'はなす (hanasu)', sinoVietnamese: 'THOẠI', meaning: 'Nói chuyện tâm sự', level: 'N5', breakdown: '話 (Thoại - có 言)', mnemonic: 'Dùng lưỡi thốt lên lời nói chân thành sẻ chia.' },
      { kanji: '許す', hiragana: 'ゆるす (yurusu)', sinoVietnamese: 'HỨA', meaning: 'Tha thứ, cho phép', level: 'N3', breakdown: '許 (Hứa - có 言)', mnemonic: 'Nói lời bao dung tha thứ lỗi lầm cho nhau.' },
      { kanji: '記録', hiragana: 'きろく (kiroku)', sinoVietnamese: 'KÝ LỤC', meaning: 'Ghi chép, kỷ lục', level: 'N3', breakdown: '記 (Ký - có 言) + 録 (Lục)', mnemonic: 'Dùng lời văn ghi lại những cột mốc đáng nhớ.' },
      { kanji: '証拠', hiragana: 'しょうこ (shōko)', sinoVietnamese: 'CHỨNG CỨ', meaning: 'Bằng chứng xác thực', level: 'N2', breakdown: '証 (Chứng - có 言) + 拠 (Cứ)', mnemonic: 'Lời nói và văn bản có căn cứ xác thực minh bạch.' },
      { kanji: '誠実', hiragana: 'せいじつ (seijitsu)', sinoVietnamese: 'THÀNH THỰC', meaning: 'Chân thành, thật thà', level: 'N2', breakdown: '誠 (Thành - có 言) + 実 (Thực)', mnemonic: 'Lời nói xuất phát từ đáy lòng chân thật trọn vẹn.' }
    ]
  },
  {
    stt: 150,
    strokeCount: 7,
    radical: '谷',
    name: 'Cốc',
    meaning: 'Thung lũng sâu',
    mnemonic: 'Dòng nước chảy xối xả mở rộng qua các khe núi (八) đổ về cửa hang (口).',
    relatedVocab: [
      { kanji: '谷', hiragana: 'たに (tani)', sinoVietnamese: 'CỐC', meaning: 'Thung lũng giữa hai vách núi', level: 'N3', breakdown: '谷 (Cốc)', mnemonic: 'Hai dòng nước từ vách núi rẽ ra đổ vào miệng thung lũng sâu.' },
      { kanji: '渓谷', hiragana: 'けいこく (keikoku)', sinoVietnamese: 'KHÊ CỐC', meaning: 'Hẻm vực, khe suối sâu', level: 'N1', breakdown: '渓 (Khê) + 谷 (Cốc)', mnemonic: 'Khe suối trong vắt uốn lượn giữa hẻm núi cheo leo.' },
      { kanji: '谷間', hiragana: 'たにま (tanima)', sinoVietnamese: 'CỐC GIAN', meaning: 'Khoảng cách thung lũng, vùng trũng', level: 'N2', breakdown: '谷 (Cốc) + 間 (Gian)', mnemonic: 'Vùng đất lọt thỏm giữa các rặng núi cao.' },
      { kanji: '渋谷', hiragana: 'しぶや (shibuya)', sinoVietnamese: 'SÁP CỐC', meaning: 'Quận Shibuya sầm uất ở Tokyo', level: 'N4', breakdown: '渋 (Sáp) + 谷 (Cốc)', mnemonic: 'Khu phố nổi tiếng Nhật Bản nằm trong một vùng trũng thung lũng.' },
      { kanji: '谷底', hiragana: 'たにぞこ (tanizoko)', sinoVietnamese: 'CỐC ĐỂ', meaning: 'Đáy vực sâu thẳm', level: 'N2', breakdown: '谷 (Cốc) + 底 (Để)', mnemonic: 'Nơi sâu nhất dưới đáy vực thẳm âm u.' },
      { kanji: '深谷', hiragana: 'しんこく (shinkoku)', sinoVietnamese: 'THÂM CỐC', meaning: 'Thung lũng sâu thẳm hiểm trở', level: 'N1', breakdown: '深 (Thâm) + 谷 (Cốc)', mnemonic: 'Hẻm núi sâu hun hút ít người qua lại.' },
      { kanji: '山谷', hiragana: 'さんこく (sankoku) / やまたに', sinoVietnamese: 'SƠN CỐC', meaning: 'Núi đồi và thung lũng trùng điệp', level: 'N1', breakdown: '山 (Sơn) + 谷 (Cốc)', mnemonic: 'Địa hình trập trùng hết đồi núi lại tới vực sâu.' },
      { kanji: '幽谷', hiragana: 'ゆうこく (yūkoku)', sinoVietnamese: 'U CỐC', meaning: 'Hẻm núi u tịch tịch mịch', level: 'N1', breakdown: '幽 (U) + 谷 (Cốc)', mnemonic: 'Thung lũng thanh vắng tĩnh mịch chim hót ríu rít.' },
      { kanji: '谷川', hiragana: 'たにがわ (tanigawa)', sinoVietnamese: 'CỐC XUYÊN', meaning: 'Dòng suối chảy qua thung lũng', level: 'N2', breakdown: '谷 (Cốc) + 川 (Xuyên)', mnemonic: 'Con suối nước trong leo lẻo róc rách chảy giữa thung lũng.' },
      { kanji: '波谷', hiragana: 'はこく (hakoku)', sinoVietnamese: 'BA CỐC', meaning: 'Đáy sóng biển (vật lý)', level: 'N1', breakdown: '波 (Ba) + 谷 (Cốc)', mnemonic: 'Điểm trũng thấp nhất của một chu kỳ sóng nước.' }
    ]
  },
  {
    stt: 151,
    strokeCount: 7,
    radical: '豆',
    name: 'Đậu',
    meaning: 'Hạt đậu, cái bát đựng đồ cúng',
    mnemonic: 'Chiếc bát cổ có chân cao dùng để đựng hạt đậu thơm trong mâm cỗ cúng tế.',
    relatedVocab: [
      { kanji: '豆', hiragana: 'まめ (mame)', sinoVietnamese: 'ĐẬU', meaning: 'Hạt đậu béo bùi', level: 'N3', breakdown: '豆 (Đậu)', mnemonic: 'Hạt đậu tròn xinh đặt trong chiếc chén tế chân cao.' },
      { kanji: '大豆', hiragana: 'だいず (daizu)', sinoVietnamese: 'ĐẠI ĐẬU', meaning: 'Đậu nành giàu đạm', level: 'N3', breakdown: '大 (Đại) + 豆 (Đậu)', mnemonic: 'Hạt đậu tương nguyên liệu làm đậu phụ miso.' },
      { kanji: '豆腐', hiragana: 'とうふ (tōfu)', sinoVietnamese: 'ĐẬU HŨ', meaning: 'Đậu phụ mềm mát', level: 'N4', breakdown: '豆 (Đậu) + 腐 (Hũ)', mnemonic: 'Đậu nành lên men ép thành miếng đậu trắng mịn.' },
      { kanji: '小豆', hiragana: 'あずき (azuki)', sinoVietnamese: 'TIỂU ĐẬU', meaning: 'Đậu đỏ nấu chè', level: 'N2', breakdown: '小 (Tiểu) + 豆 (Đậu)', mnemonic: 'Hạt đậu đỏ ngọt ngào nấu xôi bánh truyền thống.' },
      { kanji: '短大', hiragana: 'たんだい (tandai)', sinoVietnamese: 'ĐOẢN ĐẠI', meaning: 'Trường cao đẳng', level: 'N2', breakdown: '短 (có 豆) + 大 (Đại)', mnemonic: 'Khóa học đại học rút ngắn thời gian.' },
      { kanji: '頭', hiragana: 'あたま (atama)', sinoVietnamese: 'ĐẦU', meaning: 'Cái đầu, trí não', level: 'N5', breakdown: '豆 (Đậu) + 頁 (Hiệt)', mnemonic: 'Cái đầu tròn tròn như hạt đậu trên cổ người.' },
      { kanji: '納豆', hiragana: 'なっとう (nattō)', sinoVietnamese: 'NẠP ĐẬU', meaning: 'Món đậu nành lên men Natto', level: 'N3', breakdown: '納 (Nạp) + 豆 (Đậu)', mnemonic: 'Món ăn truyền thống giàu dinh dưỡng của người Nhật.' },
      { kanji: '豆乳', hiragana: 'とうにゅう (tōnyū)', sinoVietnamese: 'ĐẬU NHŨ', meaning: 'Sữa đậu nành', level: 'N2', breakdown: '豆 (Đậu) + 乳 (Nhũ)', mnemonic: 'Sữa béo ngậy vắt từ những hạt đậu nành thơm ngon.' },
      { kanji: '枝豆', hiragana: 'えだまめ (edamame)', sinoVietnamese: 'CHI ĐẬU', meaning: 'Đậu nành luộc cả cành nhắm bia', level: 'N2', breakdown: '枝 (Chi - cành) + 豆 (Đậu)', mnemonic: 'Cả chùm quả đậu non luộc muối ngọt mát.' },
      { kanji: '豊か', hiragana: 'ゆたか (yutaka)', sinoVietnamese: 'PHONG', meaning: 'Trù phú phong phú', level: 'N3', breakdown: '曲 + 豆 (Đậu)', mnemonic: 'Chén tế chất đầy hạt đậu biểu trưng cho sự trù phú.' }
    ]
  },
  {
    stt: 152,
    strokeCount: 7,
    radical: '豕',
    name: 'Thỉ',
    meaning: 'Con heo, con lợn',
    mnemonic: 'Hình con heo béo tròn với cái bụng phệ, 4 chân và cái đuôi ngắn phía sau.',
    relatedVocab: [
      { kanji: '豚', hiragana: 'ぶた (buta)', sinoVietnamese: 'ĐỒN', meaning: 'Con lợn, con heo', level: 'N4', breakdown: '⺼ (Nhục) + 豕 (Thỉ)', mnemonic: 'Thịt con lợn béo núc ních trong chuồng trại.' },
      { kanji: '豚肉', hiragana: 'ぶたにく (butaniku)', sinoVietnamese: 'ĐỒN NHỤC', meaning: 'Thịt lợn, thịt heo', level: 'N5', breakdown: '豚 (Đồn) + 肉 (Nhục)', mnemonic: 'Thức ăn thịt lợn phổ biến trong bữa cơm gia đình.' },
      { kanji: '家', hiragana: 'いえ (ie)', sinoVietnamese: 'GIA', meaning: 'Ngôi nhà ấm cúng', level: 'N5', breakdown: '宀 (Miên - mái nhà) + 豕 (Thỉ - con lợn)', mnemonic: 'Dưới mái nhà có nuôi lợn tượng trưng cho gia đình ấm no.' },
      { kanji: '家族', hiragana: 'かぞく (kazoku)', sinoVietnamese: 'GIA TỘC', meaning: 'Gia đình yêu thương', level: 'N5', breakdown: '家 (Gia - có 豕) + 族 (Tộc)', mnemonic: 'Các thành viên sum họp quây quần bên mái nhà.' },
      { kanji: '象', hiragana: 'ぞう (zō)', sinoVietnamese: 'TƯỢNG', meaning: 'Con voi to lớn', level: 'N3', breakdown: 'Chứa kết cấu biến thể của 豕', mnemonic: 'Con voi vòi dài thân to như chú heo khổng lồ.' },
      { kanji: '豪快', hiragana: 'ごうかい (gōkai)', sinoVietnamese: 'HÀO KHOÁI', meaning: 'Hào sảng, sảng khoái', level: 'N1', breakdown: '豪 (Hào - có 豕) + 快 (Khoái)', mnemonic: 'Người anh hào dũng mãnh khí phách hiên ngang.' },
      { kanji: '豪華', hiragana: 'ごうか (gōka)', sinoVietnamese: 'HÀO HOA', meaning: 'Xa hoa lộng lẫy', level: 'N3', breakdown: '豪 (Hào - có 豕) + 華 (Hoa)', mnemonic: 'Cơ ngơi tráng lệ bề thế bậc nhất.' },
      { kanji: '猪', hiragana: 'いのしし (inoshishi)', sinoVietnamese: 'TRƯ', meaning: 'Con lợn rừng hung dữ', level: 'N2', breakdown: '犭 (Khuyển) + 者 (chứa nghĩa 豕)', mnemonic: 'Lợn rừng có nanh nhọn ủi đất trong rừng thẳm.' },
      { kanji: '逐次', hiragana: 'ちくじ (chikuji)', sinoVietnamese: 'TRỤC THỨ', meaning: 'Lần lượt nối tiếp nhau', level: 'N1', breakdown: '辶 (Sước) + 豕 (Thỉ)', mnemonic: 'Đuổi theo đàn lợn lần lượt từng con một.' },
      { kanji: '豚汁', hiragana: 'とんじる (tonjiru)', sinoVietnamese: 'ĐỒN TRẤP', meaning: 'Súp canh thịt heo rau củ kiểu Nhật', level: 'N2', breakdown: '豚 (Đồn) + 汁 (Trấp - canh)', mnemonic: 'Món canh nóng hổi nấu từ thịt heo và củ cải mùa đông.' }
    ]
  },
  {
    stt: 153,
    strokeCount: 7,
    radical: '豸',
    name: 'Trãi',
    meaning: 'Loài sâu không chân, mãnh thú',
    mnemonic: 'Hình con thú săn mồi lưng dài uốn cong, nhe răng chuẩn bị vồ lấy con mồi.',
    relatedVocab: [
      { kanji: '猫', hiragana: 'ねこ (neko)', sinoVietnamese: 'MIÊU', meaning: 'Con mèo đáng yêu', level: 'N5', breakdown: '豸/犭 + 苗 (Miêu)', mnemonic: 'Chú mèo kêu meo meo bắt chuột ngoài ruộng mạ.' },
      { kanji: '豹', hiragana: 'ひょう (hyō)', sinoVietnamese: 'BÁO', meaning: 'Con báo gấm săn mồi', level: 'N1', breakdown: '豸 (Trĩ) + 勺 (Chước)', mnemonic: 'Loài thú săn mồi chạy nhanh như gió có đốm hoa.' },
      { kanji: '貌', hiragana: 'ぼう (bō)', sinoVietnamese: 'MẠO', meaning: 'Diện mạo, dáng vẻ bên ngoài', level: 'N1', breakdown: '豸 (Trĩ) + 皃 (Mạo)', mnemonic: 'Dáng vẻ thần thái toát ra từ khuôn mặt.' },
      { kanji: '容貌', hiragana: 'ようぼう (yōbō)', sinoVietnamese: 'DUNG MẠO', meaning: 'Dung mạo, nét mặt', level: 'N1', breakdown: '容 (Dung) + 貌 (Mạo - có 豸)', mnemonic: 'Đường nét khuôn mặt thanh tú đoan trang.' },
      { kanji: '全貌', hiragana: 'ぜんぼう (zenbō)', sinoVietnamese: 'TOÀN MẠO', meaning: 'Toàn cảnh, diện mạo tổng thể', level: 'N1', breakdown: '全 (Toàn) + 貌 (Mạo - có 豸)', mnemonic: 'Bức tranh toàn cảnh được phơi bày rõ nét.' },
      { kanji: '変貌', hiragana: 'へんぼう (henbō)', sinoVietnamese: 'BIẾN MẠO', meaning: 'Thay đổi diện mạo ngoạn mục', level: 'N1', breakdown: '変 (Biến) + 貌 (Mạo)', mnemonic: 'Lột xác thay đổi hoàn toàn hình ảnh cũ.' },
      { kanji: '豺狼', hiragana: 'さいろう (sairō)', sinoVietnamese: 'SÀI LANG', meaning: 'Chó sói lang sói độc ác', level: 'N1', breakdown: '豺 (Sài - có 豸) + 狼 (Lang)', mnemonic: 'Kẻ tâm địa độc ác nham hiểm như loài sói dữ.' },
      { kanji: '貂', hiragana: 'てん (ten)', sinoVietnamese: 'ĐIÊU', meaning: 'Chồn macten lông quý', level: 'N1', breakdown: '豸 (Trĩ) + 召 (Triệu)', mnemonic: 'Loài chồn tuyết nhỏ có bộ lông ấm áp vô giá.' },
      { kanji: '愛猫', hiragana: 'あいびょう (aibyō)', sinoVietnamese: 'ÁI MIÊU', meaning: 'Mèo cưng được yêu chiều', level: 'N1', breakdown: '愛 (Ái) + 猫 (Miêu - có gốc 豸)', mnemonic: 'Chú mèo con được gia chủ nâng niu chăm sóc.' },
      { kanji: '美貌', hiragana: 'びぼう (bibō)', sinoVietnamese: 'MỸ MẠO', meaning: 'Nhan sắc xinh đẹp tuyệt trần', level: 'N1', breakdown: '美 (Mỹ) + 貌 (Mạo - có 豸)', mnemonic: 'Dung mạo diễm lệ làm say đắm lòng người.' }
    ]
  },
  {
    stt: 154,
    strokeCount: 7,
    radical: '貝',
    name: 'Bối',
    meaning: 'Vỏ sò, của cải tiền tài',
    mnemonic: 'Hình vỏ sò (Mục 目) mở hai chân (Bát 八) – người xưa dùng vỏ sò làm tiền tệ quý giá.',
    relatedVocab: [
      { kanji: '貝', hiragana: 'かい (kai)', sinoVietnamese: 'BỐI', meaning: 'Con sò, vỏ ốc biển', level: 'N3', breakdown: '貝 (Bối)', mnemonic: 'Chiếc vỏ sò biển ngày xưa dùng làm tiền trao đổi hàng hóa.' },
      { kanji: '買う', hiragana: 'かう (kau)', sinoVietnamese: 'MÃI', meaning: 'Mua sắm đồ đạc', level: 'N5', breakdown: '買 (có bộ 貝)', mnemonic: 'Dùng vỏ sò tiền tệ để đổi lấy vật dụng cần thiết.' },
      { kanji: '財産', hiragana: 'ざいさん (zaisan)', sinoVietnamese: 'TÀI SẢN', meaning: 'Tài sản của cải', level: 'N3', breakdown: '財 (Tài - có 貝) + 産 (Sản)', mnemonic: 'Tiền của tích lũy được trong đời.' },
      { kanji: '貧しい', hiragana: 'まずしい (mazushii)', sinoVietnamese: 'BẦN', meaning: 'Nghèo khó, bần hàn', level: 'N3', breakdown: '分 (Phân) + 貝 (Bối)', mnemonic: 'Tiền bạc vỏ sò bị chia năm xẻ bảy nên hóa nghèo.' },
      { kanji: '貯金', hiragana: 'ちょきん (chokin)', sinoVietnamese: 'TRỮ KIM', meaning: 'Tiết kiệm tiền bạc', level: 'N4', breakdown: '貯 (Trữ - có 貝) + 金 (Kim)', mnemonic: 'Tích trữ từng đồng bạc vào hũ tiết kiệm.' },
      { kanji: '貴族', hiragana: 'きぞく (kizoku)', sinoVietnamese: 'QUÝ TỘC', meaning: 'Tầng lớp quý tộc danh giá', level: 'N2', breakdown: '貴 (Quý - có 貝) + 族 (Tộc)', mnemonic: 'Gia tộc giàu có danh giá nắm giữ nhiều tiền của.' },
      { kanji: '負ける', hiragana: 'まける (makeru)', sinoVietnamese: 'PHỤ', meaning: 'Thua trận, giảm giá', level: 'N4', breakdown: '負 (Phụ - có 貝)', mnemonic: 'Gánh nặng tiền bạc đè trĩu vai nhận phần thua thiệt.' },
      { kanji: '責任', hiragana: 'せきにん (sekinin)', sinoVietnamese: 'TRÁCH NHIỆM', meaning: 'Trách nhiệm bổn phận', level: 'N3', breakdown: '責 (Trách - có 貝) + 任 (Nhiệm)', mnemonic: 'Bổn phận gánh vác đền bù khi làm sai việc.' },
      { kanji: '貨幣', hiragana: 'かへい (kahei)', sinoVietnamese: 'HÓA TỆ', meaning: 'Tiền tệ lưu thông', level: 'N1', breakdown: '貨 (Hóa - có 貝) + 幣 (Tệ)', mnemonic: 'Đồng tiền trao đổi buôn bán trong nền kinh tế.' },
      { kanji: '貿易', hiragana: 'ぼうえき (bōeki)', sinoVietnamese: 'MẬU DỊCH', meaning: 'Mậu dịch, thương mại quốc tế', level: 'N3', breakdown: '貿 (Mậu - có 貝) + 易 (Dịch)', mnemonic: 'Trao đổi hàng hóa và tiền tệ giữa các quốc gia.' }
    ]
  },
  {
    stt: 155,
    strokeCount: 7,
    radical: '赤',
    name: 'Xích',
    meaning: 'Màu đỏ rực, xích son',
    mnemonic: 'Đất (Thổ 土) bị nung trên ngọn lửa lớn chuyển sang màu đỏ rực như gạch ngói.',
    relatedVocab: [
      { kanji: '赤い', hiragana: 'あかい (akai)', sinoVietnamese: 'XÍCH', meaning: 'Màu đỏ rực rỡ', level: 'N5', breakdown: '赤 (Xích)', mnemonic: 'Ngọn lửa bốc cháy bập bùng trên đống đất màu đỏ.' },
      { kanji: '赤ちゃん', hiragana: 'あかちゃん (akachan)', sinoVietnamese: 'XÍCH', meaning: 'Em bé sơ sinh đỏ hỏn', level: 'N4', breakdown: '赤 (Xích) + ちゃん', mnemonic: 'Bé con mới sinh làn da hồng hào đỏ hỏn đáng yêu.' },
      { kanji: '赤道', hiragana: 'せきどう (sekidō)', sinoVietnamese: 'XÍCH ĐẠO', meaning: 'Đường xích đạo Trái Đất', level: 'N2', breakdown: '赤 (Xích) + 道 (Đạo)', mnemonic: 'Vành đai nóng đỏ bao quanh chia đôi địa cầu.' },
      { kanji: '赤字', hiragana: 'あかじ (akaji)', sinoVietnamese: 'XÍCH TỰ', meaning: 'Thâm hụt tài chính, thua lỗ', level: 'N3', breakdown: '赤 (Xích) + 字 (Tự)', mnemonic: 'Dòng số viết bằng mực đỏ báo hiệu kinh doanh thua lỗ.' },
      { kanji: '真赤', hiragana: 'まっか (makka)', sinoVietnamese: 'CHÂN XÍCH', meaning: 'Đỏ bừng, đỏ au', level: 'N3', breakdown: '真 (Chân) + 赤 (Xích)', mnemonic: 'Khuôn mặt xấu hổ đỏ bừng như quả gấc chín.' },
      { kanji: '赫々', hiragana: 'かっかく (kakkaku)', sinoVietnamese: 'HÁCH HÁCH', meaning: 'Lẫy lừng, chói lọi', level: 'N1', breakdown: 'Hai chữ 赤 ghép lại thành 赫', mnemonic: 'Ánh lửa đỏ rực rỡ lẫy lừng vang danh thiên hạ.' },
      { kanji: '赤外線', hiragana: 'せきがいせん (sekigaisen)', sinoVietnamese: 'XÍCH NGOẠI TUYẾN', meaning: 'Tia hồng ngoại', level: 'N1', breakdown: '赤 (Xích) + 外 (Ngoại) + 線 (Tuyến)', mnemonic: 'Tia sáng nằm ngoài vùng quang phổ ánh sáng đỏ.' },
      { kanji: '赤信号', hiragana: 'あかしんごう (akashingō)', sinoVietnamese: 'XÍCH TÍN HIỆU', meaning: 'Đèn đỏ giao thông', level: 'N4', breakdown: '赤 (Xích) + 信号 (Tín hiệu)', mnemonic: 'Đèn tín hiệu đỏ báo hiệu phương tiện dừng lại.' },
      { kanji: '赤恥', hiragana: 'あかはじ (akahaji)', sinoVietnamese: 'XÍCH SỈ', meaning: 'Xấu hổ tột cùng đỏ mặt', level: 'N1', breakdown: '赤 (Xích) + 恥 (Sỉ)', mnemonic: 'Ngượng ngùng đến nỗi đỏ ửng cả hai tai và mặt.' },
      { kanji: '赤十字', hiragana: 'せきじゅうじ (sekijūji)', sinoVietnamese: 'XÍCH THẬP TỰ', meaning: 'Hội Chữ thập đỏ nhân đạo', level: 'N2', breakdown: '赤 (Xích) + 十 (Thập) + 字 (Tự)', mnemonic: 'Biểu tượng chữ thập đỏ cứu trợ nhân đạo quốc tế.' }
    ]
  },
  {
    stt: 156,
    strokeCount: 7,
    radical: '走',
    name: 'Tẩu',
    meaning: 'Chạy nhanh, tẩu thoát',
    mnemonic: 'Người vung tay trên mặt đất (Thổ 土), dưới là bàn chân (Chỉ 止) chạy thật nhanh.',
    relatedVocab: [
      { kanji: '走る', hiragana: 'はしる (hashiru)', sinoVietnamese: 'TẨU', meaning: 'Chạy bộ, chạy nhanh', level: 'N5', breakdown: '走 (Tẩu)', mnemonic: 'Người vung hai tay đôi chân thoăn thoắt sải bước chạy.' },
      { kanji: '疾走', hiragana: 'しっそう (shissō)', sinoVietnamese: 'TẬT TẨU', meaning: 'Phóng nhanh như gió', level: 'N1', breakdown: '疾 (Tật - nhanh) + 走 (Tẩu)', mnemonic: 'Chạy lao nhanh vun vút như mũi tên bay.' },
      { kanji: '逃走', hiragana: 'とうそう (tōsō)', sinoVietnamese: 'ĐÀO TẨU', meaning: 'Bỏ trốn, tẩu thoát', level: 'N2', breakdown: '逃 (Đào) + 走 (Tẩu)', mnemonic: 'Tháo chạy thoát khỏi hiện trường nguy hiểm.' },
      { kanji: '暴走', hiragana: 'ぼうそう (bōsō)', sinoVietnamese: 'BẠO TẨU', meaning: 'Phóng bạt mạng, mất kiểm soát', level: 'N2', breakdown: '暴 (Bạo) + 走 (Tẩu)', mnemonic: 'Lao đi điên cuồng mất lái gây nguy hiểm.' },
      { kanji: 'ご馳走', hiragana: 'ごちそう (gochisō)', sinoVietnamese: 'TRÌ TẨU', meaning: 'Bữa tiệc thịnh soạn, chiêu đãi', level: 'N5', breakdown: '馳 (Trì) + 走 (Tẩu)', mnemonic: 'Chủ nhà chạy đôn chạy đáo chuẩn bị tiệc thịnh soạn thết khách.' },
      { kanji: '師走', hiragana: 'しわす (shiwasu)', sinoVietnamese: 'SƯ TẨU', meaning: 'Tháng Chạp âm lịch (tháng 12)', level: 'N1', breakdown: '師 (Sư - thầy) + 走 (Tẩu)', mnemonic: 'Tháng cuối năm bận rộn đến mức các vị thầy cũng phải chạy đôn đáo.' },
      { kanji: '奔走', hiragana: 'ほんそう (honsō)', sinoVietnamese: 'BÔN TẨU', meaning: 'Bôn ba ngược xuôi lo việc', level: 'N1', breakdown: '奔 (Bôn) + 走 (Tẩu)', mnemonic: 'Chạy ngược chạy xuôi không quản mệt nhọc giải quyết vấn đề.' },
      { kanji: '徒走', hiragana: 'とそう (tosō)', sinoVietnamese: 'ĐỒ TẨU', meaning: 'Chạy bộ thể thao', level: 'N1', breakdown: '徒 (Đồ) + 走 (Tẩu)', mnemonic: 'Đôi chân trần sải bước rèn luyện thể lực.' },
      { kanji: '走路', hiragana: 'そうろ (sōro)', sinoVietnamese: 'TẨU LỘ', meaning: 'Đường chạy điền kinh, đường băng', level: 'N2', breakdown: '走 (Tẩu) + 路 (Lộ)', mnemonic: 'Làn đường chuyên dụng dành cho vận động viên điền kinh.' },
      { kanji: '力走', hiragana: 'りきそう (rikisō)', sinoVietnamese: 'LỰC TẨU', meaning: 'Dốc sức chạy về đích', level: 'N1', breakdown: '力 (Lực) + 走 (Tẩu)', mnemonic: 'Vắt kiệt sức lực chạy hết tốc lực về vạch đích.' }
    ]
  },
  {
    stt: 157,
    strokeCount: 7,
    radical: '足',
    name: 'Túc',
    meaning: 'Bàn chân, đầy đủ sung túc',
    mnemonic: 'Hình đầu gối, bắp chân (口) nối liền với bàn chân (止) phía dưới vững chắc.',
    relatedVocab: [
      { kanji: '足', hiragana: 'あし (ashi)', sinoVietnamese: 'TÚC', meaning: 'Bàn chân, cẳng chân', level: 'N5', breakdown: '足 (Túc)', mnemonic: 'Cẳng chân vững chãi nâng đỡ toàn bộ thân hình.' },
      { kanji: '足りる', hiragana: 'たりる (tariru)', sinoVietnamese: 'TÚC', meaning: 'Đầy đủ, trọn vẹn', level: 'N4', breakdown: '足 (Túc)', mnemonic: 'Bước chân tới đích trọn vẹn không còn thiếu thốn.' },
      { kanji: '遠足', hiragana: 'えんそく (ensoku)', sinoVietnamese: 'VIỄN TÚC', meaning: 'Dã ngoại, chuyến đi bộ xa', level: 'N4', breakdown: '遠 (Viễn) + 足 (Túc)', mnemonic: 'Chuyến đi bộ cùng bè bạn ra ngoại ô hóng gió.' },
      { kanji: '満足', hiragana: 'まんぞく (manzoku)', sinoVietnamese: 'MÃN TÚC', meaning: 'Thỏa mãn, hài lòng', level: 'N3', breakdown: '満 (Mãn) + 足 (Túc)', mnemonic: 'Hài lòng trọn vẹn với những gì mình đạt được.' },
      { kanji: '踏む', hiragana: 'ふむ (fumu)', sinoVietnamese: 'ĐẠP', meaning: 'Dẫm lên, đạp chân', level: 'N3', breakdown: '𧾷 (Túc) + 沓', mnemonic: 'Đặt bàn chân dẫm mạnh xuống mặt đất.' },
      { kanji: '踊る', hiragana: 'おどる (odoru)', sinoVietnamese: 'DŨNG', meaning: 'Nhảy múa rộn ràng', level: 'N4', breakdown: '𧾷 (Túc) + 勇 (Dũng)', mnemonic: 'Đôi chân nhún nhảy dũng cảm theo nhịp điệu rộn rã.' },
      { kanji: '跳ぶ', hiragana: 'とぶ (tobu)', sinoVietnamese: 'KHIÊU', meaning: 'Bật nhảy cao lên', level: 'N3', breakdown: '𧾷 (Túc) + 兆 (Triệu)', mnemonic: 'Dùng sức đôi chân bật nhảy qua xà ngang.' },
      { kanji: '足跡', hiragana: 'あしあと (ashiato)', sinoVietnamese: 'TÚC TÍCH', meaning: 'Dấu chân in trên cát tuyết', level: 'N2', breakdown: '足 (Túc) + 跡 (Tích)', mnemonic: 'Vết tích bàn chân để lại sau mỗi bước đi.' },
      { kanji: '裸足', hiragana: 'はだし (hadashi)', sinoVietnamese: 'LỎA TÚC', meaning: 'Chân trần không mang giày', level: 'N2', breakdown: '裸 (Lỏa) + 足 (Túc)', mnemonic: 'Đôi chân trần mát rượi dạo bước trên bãi cát mềm.' },
      { kanji: '蹴る', hiragana: 'ける (keru)', sinoVietnamese: 'XÚC', meaning: 'Đá bóng, sút mạnh', level: 'N2', breakdown: '𧾷 (Túc) + 就 (Tựu)', mnemonic: 'Vung chân sút tung quả bóng vào khung thành đối phương.' }
    ]
  },
  {
    stt: 158,
    strokeCount: 7,
    radical: '身',
    name: 'Thân',
    meaning: 'Thân thể, bản thân',
    mnemonic: 'Hình dáng cơ thể người nhìn nghiêng với phần bụng nhô ra phía trước.',
    relatedVocab: [
      { kanji: '身', hiragana: 'み (mi)', sinoVietnamese: 'THÂN', meaning: 'Bản thân, mình', level: 'N3', breakdown: '身 (Thân)', mnemonic: 'Dáng hình người phụ nữ bụng mang dạ chửa thiêng liêng.' },
      { kanji: '身長', hiragana: 'しんちょう (shinchō)', sinoVietnamese: 'THÂN TRƯỜNG', meaning: 'Chiều cao cơ thể', level: 'N3', breakdown: '身 (Thân) + 長 (Trường)', mnemonic: 'Số đo chiều dài từ đầu đến gót chân.' },
      { kanji: '独身', hiragana: 'どくしん (dokushin)', sinoVietnamese: 'ĐỘC THÂN', meaning: 'Độc thân, chưa lập gia đình', level: 'N4', breakdown: '独 (Độc) + 身 (Thân)', mnemonic: 'Một mình một bóng tự do tự tại sống.' },
      { kanji: '出身', hiragana: 'しゅっしん (shusshin)', sinoVietnamese: 'XUẤT THÂN', meaning: 'Xuất thân từ quê quán', level: 'N4', breakdown: '出 (Xuất) + 身 (Thân)', mnemonic: 'Nơi chôn rau cắt rốn sinh ra bản thân mình.' },
      { kanji: '自身', hiragana: 'じしん (jishin)', sinoVietnamese: 'TỰ THÂN', meaning: 'Bản thân mình', level: 'N3', breakdown: '自 (Tự) + 身 (Thân)', mnemonic: 'Chính bản thân mình tự chịu trách nhiệm.' },
      { kanji: '中身', hiragana: 'なかみ (nakami)', sinoVietnamese: 'TRUNG THÂN', meaning: 'Ruột, phần bên trong', level: 'N3', breakdown: '中 (Trung) + 身 (Thân)', mnemonic: 'Nội dung giá trị thực chất bên trong chiếc hộp.' },
      { kanji: '刺身', hiragana: 'さしみ (sashimi)', sinoVietnamese: 'THÍCH THÂN', meaning: 'Món cá sống Sashimi', level: 'N4', breakdown: '刺 (Thích) + 身 (Thân)', mnemonic: 'Miếng thịt cá tươi rói cắt lát chấm mù tạt wasabi.' },
      { kanji: '身近', hiragana: 'みぢか (mijika)', sinoVietnamese: 'THÂN CẬN', meaning: 'Gần gũi ngay bên mình', level: 'N2', breakdown: '身 (Thân) + 近 (Cận)', mnemonic: 'Những sự việc quen thuộc diễn ra ngay quanh ta.' },
      { kanji: '身分', hiragana: 'みぶん (mibun)', sinoVietnamese: 'THÂN PHÂN', meaning: 'Địa vị xã hội, thân phận', level: 'N3', breakdown: '身 (Thân) + 分 (Phân)', mnemonic: 'Vị thế đứng của một người trong cộng đồng.' },
      { kanji: '献身', hiragana: 'けんしん (kenshin)', sinoVietnamese: 'HIẾN THÂN', meaning: 'Cống hiến hết mình', level: 'N1', breakdown: '献 (Hiến) + 身 (Thân)', mnemonic: 'Dâng hiến trọn vẹn cả thân thể và tâm sức cho lý tưởng.' }
    ]
  },
  {
    stt: 159,
    strokeCount: 7,
    radical: '車',
    name: 'Xa',
    meaning: 'Chiếc xe, cỗ xe',
    mnemonic: 'Chiếc xe ngựa nhìn từ trên xuống: có thùng xe ở giữa và hai bánh xe hai bên.',
    relatedVocab: [
      { kanji: '車', hiragana: 'くるま (kuruma)', sinoVietnamese: 'XA', meaning: 'Xe hơi, xe cộ', level: 'N5', breakdown: '車 (Xa)', mnemonic: 'Chiếc xe cổ nhìn từ trên xuống có hai bánh và trục lăn.' },
      { kanji: '電車', hiragana: 'でんしゃ (densha)', sinoVietnamese: 'ĐIỆN XA', meaning: 'Tàu điện chạy đường ray', level: 'N5', breakdown: '電 (Điện) + 車 (Xa)', mnemonic: 'Đoàn tàu chạy bằng năng lượng điện cao thế vùn vụt.' },
      { kanji: '自動車', hiragana: 'じどうしゃ (jidōsha)', sinoVietnamese: 'TỰ ĐỘNG XA', meaning: 'Xe ô tô tự hành', level: 'N5', breakdown: '自 (Tự) + 動 (Động) + 車 (Xa)', mnemonic: 'Phương tiện giao thông 4 bánh di chuyển linh hoạt.' },
      { kanji: '自転車', hiragana: 'じてんしゃ (jitensha)', sinoVietnamese: 'TỰ CHUYỂN XA', meaning: 'Xe đạp', level: 'N5', breakdown: '自 (Tự) + 転 (Chuyển) + 車 (Xa)', mnemonic: 'Chiếc xe tự xoay chuyển bằng lực đạp của hai chân.' },
      { kanji: '輪', hiragana: 'わ (wa)', sinoVietnamese: 'LUÂN', meaning: 'Vòng tròn, bánh xe', level: 'N2', breakdown: '車 (Xa) + 侖 (Luân)', mnemonic: 'Bánh xe tròn quay tít trên mọi nẻo đường.' },
      { kanji: '駐車', hiragana: 'ちゅうしゃ (chūsha)', sinoVietnamese: 'TRÚ XA', meaning: 'Đỗ xe vào bãi', level: 'N3', breakdown: '駐 (Trú) + 車 (Xa)', mnemonic: 'Dừng xe đậu ngay ngắn trong bãi đỗ xe.' },
      { kanji: '軌道', hiragana: 'きどう (kidō)', sinoVietnamese: 'QUỸ ĐẠO', meaning: 'Quỹ đạo chuyển động, đường ray', level: 'N1', breakdown: '軌 (Quỹ - có 車) + 道 (Đạo)', mnemonic: 'Lối mòn vệt bánh xe lăn trên đường ray cố định.' },
      { kanji: '輸送', hiragana: 'ゆそう (yusō)', sinoVietnamese: 'THÂU TỐNG', meaning: 'Vận chuyển hàng hóa', level: 'N2', breakdown: '輸 (Thâu - có 車) + 送 (Tống)', mnemonic: 'Dùng đoàn xe chuyên chở hàng đi khắp đất nước.' },
      { kanji: '車輪', hiragana: 'しゃりん (sharin)', sinoVietnamese: 'XA LUÂN', meaning: 'Bánh xe lăn tròn', level: 'N2', breakdown: '車 (Xa) + 輪 (Luân)', mnemonic: 'Vành bánh xe cao su quay đều trên xa lộ.' },
      { kanji: '軟弱', hiragana: 'なんじゃく (nanjaku)', sinoVietnamese: 'NHUYỄN NHƯỢC', meaning: 'Yếu ớt, mềm yếu', level: 'N1', breakdown: '軟 (Nhuyễn - có 車) + 弱 (Nhược)', mnemonic: 'Chiếc xe đệm da êm ái quá mức làm con người mềm yếu.' }
    ]
  },
  {
    stt: 160,
    strokeCount: 7,
    radical: '辛',
    name: 'Tân',
    meaning: 'Cay nồng, gian truân cay đắng',
    mnemonic: 'Hình chiếc kim xăm mình thời cổ của tội phạm, gợi nỗi đau đớn, cay đắng.',
    relatedVocab: [
      { kanji: '辛い', hiragana: 'からい (karai) / つらい (tsurai)', sinoVietnamese: 'TÂN', meaning: 'Vị cay xè / đau khổ vất vả', level: 'N5', breakdown: '辛 (Tân)', mnemonic: 'Cây kim xăm hình tội nhân gây cảm giác đau đớn cay đắng.' },
      { kanji: '辛抱', hiragana: 'しんぼう (shinbō)', sinoVietnamese: 'TÂN BÃO', meaning: 'Kiên nhẫn nhẫn nhịn chịu đựng', level: 'N2', breakdown: '辛 (Tân) + 抱 (Bão)', mnemonic: 'Ôm nỗi gian nan vào lòng cắn răng nhẫn nại vượt qua.' },
      { kanji: '香辛料', hiragana: 'こうしんりょう (kōshinryō)', sinoVietnamese: 'HƯƠNG TÂN LIỆU', meaning: 'Gia vị cay nồng', level: 'N2', breakdown: '香 (Hương) + 辛 (Tân) + 料 (Liệu)', mnemonic: 'Các loại hạt tiêu ớt cay làm dậy mùi thơm món ăn.' },
      { kanji: '辛苦', hiragana: 'しんく (shinku)', sinoVietnamese: 'TÂN KHỔ', meaning: 'Gian truân cay đắng', level: 'N1', breakdown: '辛 (Tân) + 苦 (Khổ)', mnemonic: 'Trải qua bao thăng trầm đắng cay của cuộc đời.' },
      { kanji: '幸', hiragana: 'しあわせ (shiawase)', sinoVietnamese: 'HẠNH', meaning: 'Hạnh phúc may mắn', level: 'N4', breakdown: 'Biến thể từ bộ 辛', mnemonic: 'Thoát khỏi gông cùm trừng phạt là điều hạnh phúc nhất.' },
      { kanji: '辟易', hiragana: 'へきえき (hekieki)', sinoVietnamese: 'TÍCH DỊCH', meaning: 'Ngán ngẩm, chùn bước phát ớn', level: 'N1', breakdown: '辟 (chứa 辛) + 易', mnemonic: 'Quá đỗi mệt mỏi chán ngán muốn thoái lui.' },
      { kanji: '激辛', hiragana: 'げきから (gekikara)', sinoVietnamese: 'KÍCH TÂN', meaning: 'Siêu cay xé lưỡi', level: 'N2', breakdown: '激 (Kích) + 辛 (Tân)', mnemonic: 'Vị cay mãnh liệt bốc hỏa vòm họng.' },
      { kanji: '辛口', hiragana: 'からくち (karakuchi)', sinoVietnamese: 'TÂN KHẨU', meaning: 'Vị cay nồng / lời nhận xét cay độc gắt gao', level: 'N2', breakdown: '辛 (Tân) + 口 (Khẩu)', mnemonic: 'Rượu có vị chát cay hoặc lời bình luận thẳng thừng gai góc.' },
      { kanji: '辛勝', hiragana: 'しんしょう (shinshō)', sinoVietnamese: 'TÂN THẮNG', meaning: 'Chiến thắng nhọc nhằn sát nút', level: 'N1', breakdown: '辛 (Tân) + 勝 (Thắng)', mnemonic: 'Giành được phần thắng sau trận đấu vô cùng gian nan.' },
      { kanji: '辛酸', hiragana: 'しんさん (shinsan)', sinoVietnamese: 'TÂN TOAN', meaning: 'Nếm mùi cay đắng chua chát', level: 'N1', breakdown: '辛 (Tân) + 酸 (Toan - chua)', mnemonic: 'Nếm đủ mùi cay đắng của sóng gió phong ba.' }
    ]
  },
  {
    stt: 161,
    strokeCount: 7,
    radical: '辰',
    name: 'Thần',
    meaning: 'Giờ Thìn, rồng, nhật nguyệt tinh thần',
    mnemonic: 'Hình con trai/sò hé vỏ thò chân ra cày bừa vào buổi sáng sớm (giờ Thìn).',
    relatedVocab: [
      { kanji: '農民', hiragana: 'のうみん (nōmin)', sinoVietnamese: 'NÔNG DÂN', meaning: 'Người nông dân hiền lành', level: 'N3', breakdown: '農 (Nông - có 辰) + 民 (Dân)', mnemonic: 'Người nông dân ra đồng cày cấy từ sáng sớm tinh mơ.' },
      { kanji: '農業', hiragana: 'のうぎょう (nōgyō)', sinoVietnamese: 'NÔNG NGHIỆP', meaning: 'Ngành sản xuất nông nghiệp', level: 'N4', breakdown: '農 (Nông - có 辰) + 業 (Nghiệp)', mnemonic: 'Nghề làm ruộng phụ thuộc vào thiên thời mùa màng.' },
      { kanji: '農村', hiragana: 'のうそん (nōson)', sinoVietnamese: 'NÔNG THÔN', meaning: 'Làng quê nông thôn thanh bình', level: 'N3', breakdown: '農 (Nông) + 村 (Thôn)', mnemonic: 'Thôn xóm bao quanh bởi những cánh đồng lúa xanh ngát.' },
      { kanji: '辰年', hiragana: 'たつどし (tatsudoshi)', sinoVietnamese: 'THẦN NIÊN', meaning: 'Năm Thìn (năm con Rồng)', level: 'N2', breakdown: '辰 (Thần) + 年 (Niên)', mnemonic: 'Năm con Rồng mang lại may mắn và uy quyền.' },
      { kanji: '北辰', hiragana: 'ほくしん (hokushin)', sinoVietnamese: 'BẮC THẦN', meaning: 'Sao Bắc Cực dẫn đường', level: 'N1', breakdown: '北 (Bắc) + 辰 (Thần)', mnemonic: 'Ngôi sao sáng cố định phương Bắc dẫn lối người đi biển.' },
      { kanji: '震える', hiragana: 'ふるえる (furueru)', sinoVietnamese: 'CHẤN', meaning: 'Rung rinh, run rẩy vì sợ', level: 'N3', breakdown: '雨 (Vũ) + 辰 (Thần)', mnemonic: 'Sấm sét rền vang ban sớm khiến mặt đất rung chuyển.' },
      { kanji: '地震', hiragana: 'じしん (jishin)', sinoVietnamese: 'ĐỊA CHẤN', meaning: 'Trận động đất', level: 'N4', breakdown: '地 (Địa) + 震 (Chấn - có 辰)', mnemonic: 'Mặt đất rung lắc dữ dội chao đảo nhà cửa.' },
      { kanji: '農薬', hiragana: 'のうやく (nōyaku)', sinoVietnamese: 'NÔNG DƯỢC', meaning: 'Thuốc trừ sâu bảo vệ thực vật', level: 'N2', breakdown: '農 (Nông) + 薬 (Dược)', mnemonic: 'Thuốc bảo vệ mùa màng khỏi sâu bệnh phá hoại.' },
      { kanji: '震度', hiragana: 'しんど (shindo)', sinoVietnamese: 'CHẤN ĐỘ', meaning: 'Cấp độ rung chấn động đất', level: 'N2', breakdown: '震 (Chấn) + 度 (Độ)', mnemonic: 'Thang đo cường độ chấn động tại từng khu vực.' },
      { kanji: '振興', hiragana: 'しんこう (shinkō)', sinoVietnamese: 'CHẤN HƯNG', meaning: 'Chấn hưng phát triển kinh tế', level: 'N1', breakdown: '振 (Chấn - có 辰) + 興 (Hưng)', mnemonic: 'Vực dậy và phát triển hưng thịnh trở lại.' }
    ]
  },
  {
    stt: 162,
    strokeCount: 7,
    radical: '辵',
    variants: ['辶', '⻌'],
    name: 'Sước',
    meaning: 'Chợt bước đi, chợt dừng lại, đi xa',
    mnemonic: 'Bước chân đi trên đường dài, lúc nhanh lúc chậm (hình con đường uốn lượn).',
    relatedVocab: [
      { kanji: '道', hiragana: 'みち (michi)', sinoVietnamese: 'ĐẠO', meaning: 'Con đường, đạo lý', level: 'N5', breakdown: '辶 (Sước) + 首 (Thủ)', mnemonic: 'Mang theo cái đầu dẫn dắt bước đi trên con đường đúng đắn.' },
      { kanji: '近い', hiragana: 'ちかい (chikai)', sinoVietnamese: 'CẬN', meaning: 'Gần gũi', level: 'N5', breakdown: '辶 (Sước) + 斤 (Cân)', mnemonic: 'Chỉ bước vài bước bằng độ dài cây rìu là tới nơi.' },
      { kanji: '遠い', hiragana: 'とおい (tōi)', sinoVietnamese: 'VIỄN', meaning: 'Xa xôi', level: 'N5', breakdown: '辶 (Sước) + 袁 (Viên)', mnemonic: 'Mặc áo dài cất bước đi nghìn dặm xa xôi.' },
      { kanji: '進む', hiragana: 'すすむ (susumu)', sinoVietnamese: 'TIẾN', meaning: 'Tiến lên phía trước', level: 'N4', breakdown: '辶 (Sước) + 隹 (Chuy - chim)', mnemonic: 'Như cánh chim sải cánh tiến lên phía trước không ngừng.' },
      { kanji: '送る', hiragana: 'おくる (okuru)', sinoVietnamese: 'TỐNG', meaning: 'Gửi đồ, tiễn đưa', level: 'N5', breakdown: '辶 (Sước) + 关', mnemonic: 'Cất bước tiễn bạn bè lên đường thượng lộ bình an.' },
      { kanji: '通る', hiragana: 'とおる (tōru)', sinoVietnamese: 'THÔNG', meaning: 'Đi qua, thông suốt', level: 'N4', breakdown: '辶 (Sước) + 甬', mnemonic: 'Bước chân lưu thông thuận lợi qua mọi nẻo đường.' },
      { kanji: '運ぶ', hiragana: 'はこぶ (hakobu)', sinoVietnamese: 'VẬN', meaning: 'Vận chuyển, mang vác', level: 'N4', breakdown: '辶 (Sước) + 軍 (Quân)', mnemonic: 'Đoàn quân bước đi chở nặng quân lương ra tiền tuyến.' },
      { kanji: '速い', hiragana: 'はやい (hayai)', sinoVietnamese: 'TỐC', meaning: 'Nhanh nhẹn, tốc độ', level: 'N4', breakdown: '辶 (Sước) + 束 (Thúc)', mnemonic: 'Bó chặt hành lý bước thoăn thoắt với tốc độ thần tốc.' },
      { kanji: '遅い', hiragana: 'おそい (osoi)', sinoVietnamese: 'TRÌ', meaning: 'Chậm chạp, muộn màng', level: 'N5', breakdown: '辶 (Sước) + 犀 (Tê)', mnemonic: 'Bước đi ì ạch nặng nề như con tê giác rừng.' },
      { kanji: '返す', hiragana: 'かえす (kaesu)', sinoVietnamese: 'PHẢN', meaning: 'Trả lại, quay về', level: 'N5', breakdown: '辶 (Sước) + 反 (Phản)', mnemonic: 'Quay gót bước trở lại nơi chốn ban đầu.' }
    ]
  },
  {
    stt: 163,
    strokeCount: 7,
    radical: '邑',
    variants: ['阝 (phải)'],
    name: 'Ấp',
    meaning: 'Thành thị, vùng đất dân cư (Đứng bên PHẢI)',
    mnemonic: 'Vùng đất có tường thành bao quanh (口) và người dân quỳ phục (巴) sinh sống bên PHẢI.',
    relatedVocab: [
      { kanji: '部屋', hiragana: 'へや (heya)', sinoVietnamese: 'BỘ ỐC', meaning: 'Căn phòng ngủ', level: 'N5', breakdown: '部 (Bộ - có 阝) + 屋 (Ốc)', mnemonic: 'Từng gian phòng được chia cắt ngăn nắp dưới mái nhà.' },
      { kanji: '都市', hiragana: 'とし (toshi)', sinoVietnamese: 'ĐÔ THỊ', meaning: 'Đô thị sầm uất', level: 'N3', breakdown: '都 (Đô - có 阝) + 市 (Thị)', mnemonic: 'Nơi tập trung muôn dân quần tụ phồn vinh.' },
      { kanji: '京都', hiragana: 'きょうと (kyōto)', sinoVietnamese: 'KINH ĐÔ', meaning: 'Cố đô Kyoto thanh bình', level: 'N5', breakdown: '京 (Kinh) + 都 (Đô - có 阝)', mnemonic: 'Cố đô cổ kính ngàn năm văn hiến của đất nước Phù Tang.' },
      { kanji: '郵送', hiragana: 'ゆうそう (yūsō)', sinoVietnamese: 'BƯU TỐNG', meaning: 'Gửi bưu điện', level: 'N3', breakdown: '郵 (Bưu - có 阝) + 送 (Tống)', mnemonic: 'Chuyển thư từ bưu phẩm giữa các ấp thôn làng.' },
      { kanji: '郷里', hiragana: 'きょうり (kyōri)', sinoVietnamese: 'HƯƠNG LÝ', meaning: 'Quê cha đất tổ', level: 'N1', breakdown: '郷 (Hương - có 阝) + 里 (Lý)', mnemonic: 'Làng quê nơi cội nguồn sinh dưỡng thân thương.' },
      { kanji: '郊外', hiragana: 'こうがい (kōgai)', sinoVietnamese: 'GIAO NGOẠI', meaning: 'Vùng ngoại ô thoáng đãng', level: 'N3', breakdown: '郊 (Giao - có 阝) + 外 (Ngoại)', mnemonic: 'Khu vực ven rìa tiếp giáp giữa làng xóm và thiên nhiên.' },
      { kanji: '邪悪', hiragana: 'じゃあく (jaaku)', sinoVietnamese: 'TÀ ÁC', meaning: 'Tà ác hiểm độc', level: 'N1', breakdown: '邪 (Tà - có 阝) + 悪 (Ác)', mnemonic: 'Tư tưởng lệch lạc tà mị gây hại cho nhân dân.' },
      { kanji: '郡', hiragana: 'ぐん (gun)', sinoVietnamese: 'QUẬN', meaning: 'Quận, huyện nông thôn', level: 'N1', breakdown: '君 (Quân) + 阝 (Ấp)', mnemonic: 'Đơn vị hành chính tập hợp nhiều làng xã dưới quyền quản lý.' },
      { kanji: '那覇', hiragana: 'なは (naha)', sinoVietnamese: 'NA BÁ', meaning: 'Thành phố Naha (Okinawa)', level: 'N2', breakdown: '那 (Na - có 阝) + 覇 (Bá)', mnemonic: 'Thủ phủ xinh đẹp của quần đảo nhiệt đới Okinawa.' },
      { kanji: '邸宅', hiragana: 'ていたく (teitaku)', sinoVietnamese: 'ĐỂ TRẠCH', meaning: 'Dinh thự sang trọng', level: 'N1', breakdown: '邸 (Để - có 阝) + 宅 (Trạch)', mnemonic: 'Ngôi biệt thự bề thế lộng lẫy nơi góc phố.' }
    ]
  },
  {
    stt: 164,
    strokeCount: 7,
    radical: '酉',
    name: 'Dậu',
    meaning: 'Giờ Dậu, bình ủ rượu nếp',
    mnemonic: 'Hình chiếc vò ủ rượu có miệng hẹp, bên trong có vạch nước rượu đang lên men.',
    relatedVocab: [
      { kanji: 'お酒', hiragana: 'おさけ (osake)', sinoVietnamese: 'TỬU', meaning: 'Rượu Sake truyền thống', level: 'N5', breakdown: '氵 (Thủy) + 酉 (Dậu)', mnemonic: 'Nước gạo ủ lên men trong hũ rượu thơm lừng cay nồng.' },
      { kanji: '配達', hiragana: 'はいたつ (haitatsu)', sinoVietnamese: 'PHỐI ĐẠT', meaning: 'Giao hàng tận nơi', level: 'N4', breakdown: '配 (Phối - có 酉) + 達 (Đạt)', mnemonic: 'Phân chia từng vò rượu giao tận tay người thưởng thức.' },
      { kanji: '酸素', hiragana: 'さんそ (sanso)', sinoVietnamese: 'TOAN TỐ', meaning: 'Khí oxy duy trì sự sống', level: 'N2', breakdown: '酸 (Toan - có 酉) + 素 (Tố)', mnemonic: 'Khí nuôi dưỡng quá trình lên men và hô hấp.' },
      { kanji: '酷い', hiragana: 'ひどい (hidoi)', sinoVietnamese: 'KHỐC', meaning: 'Tồi tệ, tàn nhẫn', level: 'N4', breakdown: '酷 (Khốc - có 酉)', mnemonic: 'Rượu ủ quá đậm đặc đến cay đắng nồng nặc.' },
      { kanji: '酢', hiragana: 'す (su)', sinoVietnamese: 'TỐ', meaning: 'Giấm ăn chua dịu', level: 'N2', breakdown: '酉 (Dậu) + 乍', mnemonic: 'Rượu lên men lâu ngày hóa thành giấm chua nấu ăn.' },
      { kanji: '酔う', hiragana: 'よう (yō)', sinoVietnamese: 'TÚY', meaning: 'Say xỉn, say xe', level: 'N3', breakdown: '酉 (Dậu) + 卒', mnemonic: 'Uống cạn bình rượu say mèm bước thấp bước cao.' },
      { kanji: '酵母', hiragana: 'こうぼ (kōbo)', sinoVietnamese: 'DIẾU MẪU', meaning: 'Men vi sinh làm bánh mỳ', level: 'N1', breakdown: '酵 (Diếu - có 酉) + 母 (Mẫu)', mnemonic: 'Vi sinh vật mẹ nuôi dưỡng hạt men nở xốp.' },
      { kanji: '醸造', hiragana: 'じょうぞう (jōzō)', sinoVietnamese: 'NHƯỠNG TẠO', meaning: 'Ủ rượu bia, ủ tương lên men', level: 'N1', breakdown: '醸 (Nhưỡng - có 酉) + 造 (Tạo)', mnemonic: 'Kỹ thuật ủ lên men truyền thống tạo nên quốc tửu.' },
      { kanji: '酪農', hiragana: 'らくのう (rakunō)', sinoVietnamese: 'LẠC NÔNG', meaning: 'Nghề chăn nuôi lấy sữa', level: 'N1', breakdown: '酪 (Lạc - có 酉) + 農 (Nông)', mnemonic: 'Nông nghiệp sản xuất sữa tươi bơ phô mai lên men.' },
      { kanji: '醜い', hiragana: 'みにくい (minikui)', sinoVietnamese: 'XÚ', meaning: 'Xấu xí, khó coi', level: 'N1', breakdown: '酉 (Dậu) + 鬼 (Quỷ)', mnemonic: 'Say rượu mặt mũi biến dạng hung dữ như mặt quỷ.' }
    ]
  },
  {
    stt: 165,
    strokeCount: 7,
    radical: '釆',
    name: 'Biện',
    meaning: 'Phân biệt xem xét chân thú',
    mnemonic: 'Nhìn dấu chân thú in trên mặt đất để phân biệt xem đó là loài vật nào.',
    relatedVocab: [
      { kanji: '悉く', hiragana: 'ことごとく (kotogotoku)', sinoVietnamese: 'TẤT', meaning: 'Tất cả, toàn bộ không sót một ai', level: 'N1', breakdown: '釆 (Biện) + 心 (Tâm)', mnemonic: 'Quan sát dấu chân và đặt trọn tâm trí thấu hiểu toàn bộ.' },
      { kanji: '番', hiragana: 'ばん (ban)', sinoVietnamese: 'PHIÊN', meaning: 'Số thứ tự, phiên trực', level: 'N5', breakdown: '釆 (Biện) + 田 (Điền)', mnemonic: 'Phân chia từng ô ruộng đánh dấu số thứ tự canh tác.' },
      { kanji: '番組', hiragana: 'ばんぐみ (bangumi)', sinoVietnamese: 'PHIÊN TỔ', meaning: 'Chương trình truyền hình', level: 'N4', breakdown: '番 (Phiên) + 組 (Tổ)', mnemonic: 'Lịch phát sóng các tiết mục được sắp xếp theo phiên kíp.' },
      { kanji: '一番', hiragana: 'いちばん (ichiban)', sinoVietnamese: 'NHẤT PHIÊN', meaning: 'Số một, nhất, tuyệt nhất', level: 'N5', breakdown: '一 (Nhất) + 番 (Phiên)', mnemonic: 'Đứng đầu bảng danh sách không ai sánh bằng.' },
      { kanji: '交番', hiragana: 'こうばん (kōban)', sinoVietnamese: 'GIAO PHIÊN', meaning: 'Đồn cảnh sát góc phố', level: 'N5', breakdown: '交 (Giao) + 番 (Phiên)', mnemonic: 'Nơi các cảnh sát luân phiên túc trực giữ gìn trị an.' },
      { kanji: '順番', hiragana: 'じゅんばん (junban)', sinoVietnamese: 'THUẬN PHIÊN', meaning: 'Thứ tự xếp hàng', level: 'N3', breakdown: '順 (Thuận) + 番 (Phiên)', mnemonic: 'Tuân thủ đúng lượt đi theo trật tự trước sau.' },
      { kanji: '留守番', hiragana: 'るすばん (rusuban)', sinoVietnamese: 'LƯU THỦ PHIÊN', meaning: 'Trông nhà khi vắng người', level: 'N3', breakdown: '留守 + 番 (Phiên)', mnemonic: 'Nhận phiên trực giữ nhà bảo vệ tài sản an toàn.' },
      { kanji: '審判', hiragana: 'しんぱん (shinpan)', sinoVietnamese: 'THẨM PHÁN', meaning: 'Trọng tài, phán quyết', level: 'N2', breakdown: '審 (Thẩm) + 判 (Phán - có nguồn gốc phân biệt)', mnemonic: 'Quan sát móng vuốt phân biệt rõ đúng sai công minh.' },
      { kanji: '当番', hiragana: 'とうばん (tōban)', sinoVietnamese: 'ĐƯƠNG PHIÊN', meaning: 'Người đến lượt trực nhật', level: 'N2', breakdown: '当 (Đương) + 番 (Phiên)', mnemonic: 'Đến phiên mình chịu trách nhiệm làm nhiệm vụ.' },
      { kanji: '背番号', hiragana: 'せばんごう (sebangō)', sinoVietnamese: 'BỐI PHIÊN HIỆU', meaning: 'Số áo vận động viên sau lưng', level: 'N2', breakdown: '背 (Bối) + 番号 (Phiên hiệu)', mnemonic: 'Con số in sau lưng giúp nhận diện cầu thủ trên sân.' }
    ]
  },
  {
    stt: 166,
    strokeCount: 7,
    radical: '里',
    name: 'Lý',
    meaning: 'Dặm đường, làng xóm',
    mnemonic: 'Nơi có ruộng đồng (Điền 田) và đất đai (Thổ 土) để lập thành làng xóm ấm no.',
    relatedVocab: [
      { kanji: '里', hiragana: 'さと (sato)', sinoVietnamese: 'LÝ', meaning: 'Làng quê, quê ngoại', level: 'N3', breakdown: '田 (Điền) + 土 (Thổ)', mnemonic: 'Đất đai và ruộng nương trù phú hình thành nên thôn làng.' },
      { kanji: '里帰り', hiragana: 'さとがえり (satogaeri)', sinoVietnamese: 'LÝ QUY', meaning: 'Về thăm quê mẹ, về nhà mẹ đẻ', level: 'N2', breakdown: '里 (Lý) + 帰 (Quy)', mnemonic: 'Người con gái lấy chồng trở về thăm lại mái ấm làng xưa.' },
      { kanji: '重い', hiragana: 'おもい (omoi)', sinoVietnamese: 'TRỌNG', meaning: 'Nặng trĩu, nghiêm trọng', level: 'N5', breakdown: 'chứa bộ 里', mnemonic: 'Gánh nặng cả dặm đường dài đè trĩu đôi vai.' },
      { kanji: '野原', hiragana: 'のはら (nohara)', sinoVietnamese: 'DÃ NGUYÊN', meaning: 'Cánh đồng hoang bao la', level: 'N3', breakdown: '野 (Dã - có 里) + 原 (Nguyên)', mnemonic: 'Cánh đồng thênh thang trải dài ngút ngàn tầm mắt.' },
      { kanji: '野菜', hiragana: 'やさい (yasai)', sinoVietnamese: 'DÃ THÁI', meaning: 'Rau củ tươi xanh', level: 'N5', breakdown: '野 (Dã - có 里) + 菜 (Thái)', mnemonic: 'Rau xanh hái từ nương đồng tươi non mát lành.' },
      { kanji: '理由', hiragana: 'りゆう (riyū)', sinoVietnamese: 'LÝ DO', meaning: 'Nguyên nhân lý do', level: 'N4', breakdown: '理 (Lý - có 里) + 由 (Do)', mnemonic: 'Đạo lý sáng tỏ như quy luật phân chia đất đai.' },
      { kanji: '料理', hiragana: 'りょうり (ryōri)', sinoVietnamese: 'LIỆU LÝ', meaning: 'Nấu ăn, món ăn ngon', level: 'N5', breakdown: '料 (Liệu) + 理 (Lý - có 里)', mnemonic: 'Nghệ thuật điều hòa nguyên liệu tạo hương vị mỹ vị.' },
      { kanji: '万里の長城', hiragana: 'ばんりのちょうじょう', sinoVietnamese: 'VẠN LÝ TRƯỜNG THÀNH', meaning: 'Vạn Lý Trường Thành kỳ vĩ', level: 'N1', breakdown: '万 + 里 (Lý) + 長城', mnemonic: 'Bức tường thành kiên cố vắt ngang vạn dặm non sông.' },
      { kanji: '里程標', hiragana: 'りていひょう (riteihyō)', sinoVietnamese: 'LÝ TRÌNH TIÊU', meaning: 'Cột mốc cây số bên đường', level: 'N1', breakdown: '里 (Lý) + 程 + 標', mnemonic: 'Cột mốc báo hiệu số dặm đường đã vượt qua.' },
      { kanji: '里心', hiragana: 'さとごころ (satogokoro)', sinoVietnamese: 'LÝ TÂM', meaning: 'Nỗi nhớ quê hương da diết', level: 'N1', breakdown: '里 (Lý) + 心 (Tâm)', mnemonic: 'Nỗi niềm nhớ da diết về làng quê mẹ thân thương.' }
    ]
  },
  // Nhóm 8 nét (Bộ 167 – 175)
  {
    stt: 167,
    strokeCount: 8,
    radical: '金',
    variants: ['釒'],
    name: 'Kim',
    meaning: 'Kim loại, vàng, tiền tài',
    mnemonic: 'Dưới mái mỏ (人), trong lòng đất (土) có hai cục quặng vàng lấp lánh (2 chấm).',
    relatedVocab: [
      { kanji: 'お金', hiragana: 'おかね (okane)', sinoVietnamese: 'KIM', meaning: 'Tiền bạc tiêu dùng', level: 'N5', breakdown: '金 (Kim)', mnemonic: 'Đất ủ vàng ròng quý giá phát sáng hào quang rực rỡ.' },
      { kanji: '鉄', hiragana: 'てつ (tetsu)', sinoVietnamese: 'THIẾT', meaning: 'Sắt thép kiên cố', level: 'N3', breakdown: '釒 (Kim) + 失', mnemonic: 'Kim loại cứng rắn làm nên khung nhà đường ray.' },
      { kanji: '銀', hiragana: 'ぎん (gin)', sinoVietnamese: 'NGÂN', meaning: 'Bạc trắng sáng', level: 'N4', breakdown: '釒 (Kim) + 艮 (Cấn)', mnemonic: 'Ánh kim loại bạc sáng chói dừng mắt nhìn.' },
      { kanji: '銅', hiragana: 'どう (dō)', sinoVietnamese: 'ĐỒNG', meaning: 'Đồng đỏ đúc chuông', level: 'N2', breakdown: '釒 (Kim) + 同 (Đồng)', mnemonic: 'Kim loại màu đỏ đúc nên chuông đồng uy nghiêm.' },
      { kanji: '鉛筆', hiragana: 'えんぴつ (enpitsu)', sinoVietnamese: 'DUYÊN BÚT', meaning: 'Bút chì viết', level: 'N5', breakdown: '鉛 (Duyên - có 釒) + 筆 (Bút)', mnemonic: 'Bút làm từ kim loại chì và than vẽ.' },
      { kanji: '針', hiragana: 'はり (hari)', sinoVietnamese: 'CHÂM', meaning: 'Cây kim may, mũi kim', level: 'N3', breakdown: '釒 (Kim) + 十 (Thập)', mnemonic: 'Cây kim thép nhỏ nhọn tinh xảo luồn chỉ vá áo.' },
      { kanji: '鏡', hiragana: 'かがみ (kagami)', sinoVietnamese: 'KÍNH', meaning: 'Tấm gương soi mặt', level: 'N3', breakdown: '釒 (Kim) + 竟 (Cánh)', mnemonic: 'Tấm đồng mài bóng loáng soi rõ từng sợi tóc chân tơ.' },
      { kanji: '録音', hiragana: 'ろくおん (rokuon)', sinoVietnamese: 'LỤC ÂM', meaning: 'Ghi âm giọng nói', level: 'N3', breakdown: '録 (Lục - có 釒) + 音 (Âm)', mnemonic: 'Khắc âm thanh vào đĩa kim loại lưu giữ ngàn năm.' },
      { kanji: '鍋', hiragana: 'なべ (nabe)', sinoVietnamese: 'OA', meaning: 'Cái nồi nấu lẩu', level: 'N2', breakdown: '釒 (Kim) + 咼', mnemonic: 'Chiếc nồi kim loại đun sôi món lẩu thơm lừng ngày đông.' },
      { kanji: '鋭い', hiragana: 'するどい (surudoi)', sinoVietnamese: 'NHUỆ', meaning: 'Sắc bén, nhạy bén', level: 'N2', breakdown: '釒 (Kim) + 兌 (Đoái)', mnemonic: 'Lưỡi gươm kim loại sắc bén chém sắt như chém bùn.' }
    ]
  },
  {
    stt: 168,
    strokeCount: 8,
    radical: '長',
    variants: ['镸'],
    name: 'Trường / Trưởng',
    meaning: 'Dài dằng dặc, lớn lên, thủ trưởng',
    mnemonic: 'Hình người già có mái tóc rất dài bay phấp phới trong gió.',
    relatedVocab: [
      { kanji: '長い', hiragana: 'ながい (nagai)', sinoVietnamese: 'TRƯỜNG', meaning: 'Dài thượt, dài lâu', level: 'N5', breakdown: '長 (Trường)', mnemonic: 'Mái tóc người già buông dài chấm đất theo năm tháng.' },
      { kanji: '社長', hiragana: 'しゃちょう (shachō)', sinoVietnamese: 'XÃ TRƯỞNG', meaning: 'Giám đốc công ty', level: 'N5', breakdown: '社 (Xã) + 長 (Trưởng)', mnemonic: 'Người đứng đầu chèo lái toàn bộ công ty.' },
      { kanji: '校長', hiragana: 'こうちょう (kōchō)', sinoVietnamese: 'HIỆU TRƯỞNG', meaning: 'Hiệu trưởng trường học', level: 'N4', breakdown: '校 (Hiệu) + 長 (Trưởng)', mnemonic: 'Thầy giáo mẫu mực đứng đầu ngôi trường học tập.' },
      { kanji: '成長', hiragana: 'せいちょう (seichō)', sinoVietnamese: 'THÀNH TRƯỞNG', meaning: 'Trưởng thành, lớn lên', level: 'N3', breakdown: '成 (Thành) + 長 (Trưởng)', mnemonic: 'Cây non lớn dần thành cây cổ thụ vững chãi.' },
      { kanji: '身長', hiragana: 'しんちょう (shinchō)', sinoVietnamese: 'THÂN TRƯỜNG', meaning: 'Chiều cao cơ thể', level: 'N3', breakdown: '身 (Thân) + 長 (Trường)', mnemonic: 'Độ dài thân thể đo từ gót tới đỉnh đầu.' },
      { kanji: '特長', hiragana: 'とくちょう (tokuchō)', sinoVietnamese: 'ĐẶC TRƯỜNG', meaning: 'Điểm mạnh nổi trội', level: 'N2', breakdown: '特 (Đặc) + 長 (Trường)', mnemonic: 'Ưu điểm vượt trội hơn hẳn so với người khác.' },
      { kanji: '長所', hiragana: 'ちょうしょ (chōsho)', sinoVietnamese: 'TRƯỜNG SỞ', meaning: 'Sở trường, điểm mạnh', level: 'N3', breakdown: '長 (Trường) + 所 (Sở)', mnemonic: 'Năng khiếu và sở trường thế mạnh của bản thân.' },
      { kanji: '長男', hiragana: 'ちょうなん (chōnan)', sinoVietnamese: 'TRƯỞNG NAM', meaning: 'Con trai cả trưởng gia', level: 'N3', breakdown: '長 (Trưởng) + 男 (Nam)', mnemonic: 'Người con trai lớn gánh vác việc gia đình.' },
      { kanji: '長寿', hiragana: 'ちょうじゅ (chōju)', sinoVietnamese: 'TRƯỜNG THỌ', meaning: 'Sống lâu trường thọ', level: 'N1', breakdown: '長 (Trường) + 寿 (Thọ)', mnemonic: 'Tuổi thọ dồi dào an hưởng phúc lành bách niên giai lão.' },
      { kanji: '議長', hiragana: 'ぎちょう (gichō)', sinoVietnamese: 'NGHỊ TRƯỞNG', meaning: 'Chủ tịch quốc hội/phiên họp', level: 'N1', breakdown: '議 (Nghị) + 長 (Trưởng)', mnemonic: 'Người điều phối chủ trì các phiên họp nghị sự quan trọng.' }
    ]
  },
  {
    stt: 169,
    strokeCount: 8,
    radical: '門',
    name: 'Môn',
    meaning: 'Cổng lớn hai cánh',
    mnemonic: 'Hai cánh cửa Hộ (戶) ghép đối xứng nhau tạo thành cổng lớn uy nghiêm.',
    relatedVocab: [
      { kanji: '門', hiragana: 'もん (mon)', sinoVietnamese: 'MÔN', meaning: 'Cánh cổng ra vào', level: 'N4', breakdown: '門 (Môn)', mnemonic: 'Hai cánh cổng lớn mở rộng chào đón khách phương xa.' },
      { kanji: '専門', hiragana: 'せんもん (senmon)', sinoVietnamese: 'CHUYÊN MÔN', meaning: 'Chuyên môn nghiên cứu', level: 'N4', breakdown: '専 (Chuyên) + 門 (Môn)', mnemonic: 'Cánh cổng bước vào lĩnh vực kiến thức sâu rộng.' },
      { kanji: '開く', hiragana: 'あく (aku) / ひらく (hiraku)', sinoVietnamese: 'KHAI', meaning: 'Mở cổng, khai mạc', level: 'N5', breakdown: '門 (Môn) + 开', mnemonic: 'Hai tay đẩy then cài mở toang hai cánh cửa đón gió.' },
      { kanji: '閉める', hiragana: 'しめる (shimeru)', sinoVietnamese: 'BẾ', meaning: 'Đóng cửa lại', level: 'N5', breakdown: '門 (Môn) + 才', mnemonic: 'Khép chặt cánh cổng then cài cẩn thận trước khi ngủ.' },
      { kanji: '聞く', hiragana: 'きく (kiku)', sinoVietnamese: 'VĂN', meaning: 'Nghe thấy, hỏi thăm', level: 'N5', breakdown: '門 (Môn) + 耳 (Nhĩ)', mnemonic: 'Ghé vành tai vào khe cửa lắng nghe tiếng chim ca.' },
      { kanji: '間', hiragana: 'あいだ (aida) / かん (kan)', sinoVietnamese: 'GIAN', meaning: 'Khoảng cách, thời gian', level: 'N5', breakdown: '門 (Môn) + 日 (Nhật)', mnemonic: 'Ánh mặt trời lọt qua khe hở giữa hai cánh cổng.' },
      { kanji: '校門', hiragana: 'こうもん (kōmon)', sinoVietnamese: 'HIỆU MÔN', meaning: 'Cổng trường học', level: 'N3', breakdown: '校 (Hiệu) + 門 (Môn)', mnemonic: 'Cổng trường ríu rít tiếng cười đùa của học sinh.' },
      { kanji: '関門', hiragana: 'かんもん (kanmon)', sinoVietnamese: 'QUAN MÔN', meaning: 'Cửa ải hiểm trở', level: 'N1', breakdown: '関 (Quan) + 門 (Môn)', mnemonic: 'Trạm kiểm soát chốt chặn biên ải nghiêm ngặt.' },
      { kanji: '門限', hiragana: 'もんげん (mongen)', sinoVietnamese: 'MÔN HẠN', meaning: 'Giờ giới nghiêm đóng cổng', level: 'N2', breakdown: '門 (Môn) + 限 (Hạn)', mnemonic: 'Quy định giờ giấc phải về nhà trước khi khóa cổng.' },
      { kanji: '閉鎖', hiragana: 'へいさ (heisa)', sinoVietnamese: 'BẾ TỎA', meaning: 'Phong tỏa, đóng cửa cách ly', level: 'N1', breakdown: '閉 (Bế - có 門) + 鎖 (Tỏa - khóa)', mnemonic: 'Khóa xích chặt cánh cửa cách ly hoàn toàn.' }
    ]
  },
  {
    stt: 170,
    strokeCount: 8,
    radical: '阜',
    variants: ['阝 (trái)'],
    name: 'Phụ',
    meaning: 'Gò đồi, đống đất (Đứng bên TRÁI)',
    mnemonic: 'Các bậc đất xếp chồng lên nhau dọc theo sườn đồi để leo lên (Đứng bên TRÁI).',
    relatedVocab: [
      { kanji: '階段', hiragana: 'かいだん (kaidan)', sinoVietnamese: 'GIAI ĐOẠN', meaning: 'Bậc cầu thang', level: 'N4', breakdown: '階 (Giai - có 阝) + 段 (Đoạn)', mnemonic: 'Từng bậc thang đất xếp tầng tầng lớp lớp leo lên đồi.' },
      { kanji: '防ぐ', hiragana: 'ふせぐ (fusegu)', sinoVietnamese: 'PHÒNG', meaning: 'Phòng thủ, ngăn chặn', level: 'N3', breakdown: '阝 (Phụ) + 方 (Phương)', mnemonic: 'Đắp bờ đê gò đất vững chắc ngăn nước lũ dâng.' },
      { kanji: '降る', hiragana: 'ふる (furu)', sinoVietnamese: 'GIÁNG', meaning: 'Mưa rơi, tuyết rơi xuống', level: 'N5', breakdown: '阝 (Phụ) + 夅', mnemonic: 'Những giọt mưa từ trên trời rơi xuống sườn đồi.' },
      { kanji: '陽気', hiragana: 'ようき (yōki)', sinoVietnamese: 'DƯƠNG KHÍ', meaning: 'Ấm áp, vui tươi hoạt bát', level: 'N2', breakdown: '陽 (Dương - có 阝) + 気 (Khí)', mnemonic: 'Sườn đồi đón ánh nắng mặt trời rực rỡ tươi vui.' },
      { kanji: '陰気', hiragana: 'いんき (inki)', sinoVietnamese: 'ÂM KHÍ', meaning: 'U ám, ảm đạm', level: 'N1', breakdown: '陰 (Âm - có 阝) + 気 (Khí)', mnemonic: 'Mặt khuất sau sườn đồi luôn ẩm ướt thiếu ánh sáng.' },
      { kanji: '陸地', hiragana: 'りくち (rikuchi)', sinoVietnamese: 'LỤC ĐỊA', meaning: 'Đất liền, lục địa bao la', level: 'N2', breakdown: '陸 (Lục - có 阝) + 地 (Địa)', mnemonic: 'Dải đất bằng phẳng cao ráo nổi trên mặt biển.' },
      { kanji: '限界', hiragana: 'げんかい (genkai)', sinoVietnamese: 'HẠN GIỚI', meaning: 'Giới hạn tột cùng', level: 'N2', breakdown: '限 (Hạn - có 阝) + 界 (Giới)', mnemonic: 'Gò đồi dựng sừng sững làm giới hạn ranh giới đất đai.' },
      { kanji: '陣地', hiragana: 'じんち (jinchi)', sinoVietnamese: 'TRẬN ĐỊA', meaning: 'Trận địa đóng quân', level: 'N1', breakdown: '陣 (Trận - có 阝) + 地 (Địa)', mnemonic: 'Quân đội chọn gò đất cao để dàn trận thế phòng thủ.' },
      { kanji: '障子', hiragana: 'しょうじ (shōji)', sinoVietnamese: 'CHƯỚNG TỬ', meaning: 'Cửa lùa giấy shoji truyền thống', level: 'N2', breakdown: '障 (Chướng - có 阝) + 子', mnemonic: 'Vách ngăn che chắn gió lạnh lùa vào phòng.' },
      { kanji: '隆起', hiragana: 'りゅうき (ryūki)', sinoVietnamese: 'LONG KHỞI', meaning: 'Trồi lên, nhô cao mặt đất', level: 'N1', breakdown: '隆 (Long - có 阝) + 起 (Khởi)', mnemonic: 'Vỏ trái đất đùn lên tạo thành những gò đồi mới.' }
    ]
  },
  {
    stt: 171,
    strokeCount: 8,
    radical: '隶',
    name: 'Đãi',
    meaning: 'Kịp đến, với tới',
    mnemonic: 'Bàn tay (彐) vươn ra tóm kịp cái đuôi con thú có lông xòe ở dưới (氺).',
    relatedVocab: [
      { kanji: '逮', hiragana: 'たい (tai)', sinoVietnamese: 'ĐÃI', meaning: 'Đuổi kịp, bắt kịp', level: 'N2', breakdown: '辶 (Sước) + 隶 (Đãi)', mnemonic: 'Chạy vội đuổi theo vươn tay tóm bắt lấy kẻ trộm.' },
      { kanji: '逮捕', hiragana: 'たいほ (taiho)', sinoVietnamese: 'ĐÃI BỘ', meaning: 'Bắt giữ tội phạm', level: 'N2', breakdown: '逮 (Đãi - có 隶) + 捕 (Bộ)', mnemonic: 'Cảnh sát đuổi theo tra tay vào còng bắt giữ tội phạm.' },
      { kanji: '逮捕状', hiragana: 'たいほじょう (taihojō)', sinoVietnamese: 'ĐÃI BỘ TRẠNG', meaning: 'Lệnh bắt giữ của tòa án', level: 'N1', breakdown: '逮捕 + 状 (Trạng)', mnemonic: 'Văn bản lệnh bắt giữ chính thức theo luật pháp.' },
      { kanji: '兼ねる', hiragana: 'かねる (kaneru)', sinoVietnamese: 'KIÊM', meaning: 'Kiêm nhiệm nhiều việc', level: 'N2', breakdown: 'chứa gốc 隶 kết hợp', mnemonic: 'Một tay với nắm hai bó lúa kiêm hai nhiệm vụ.' },
      { kanji: '兼任', hiragana: 'けんにん (kennin)', sinoVietnamese: 'KIÊM NHIỆM', meaning: 'Kiêm nhiệm chức vụ', level: 'N1', breakdown: '兼 (Kiêm) + 任 (Nhiệm)', mnemonic: 'Đồng thời đảm nhận nhiều trọng trách cùng lúc.' },
      { kanji: '謙遜', hiragana: 'けんそん (kenson)', sinoVietnamese: 'KHIÊM TỐN', meaning: 'Khiêm nhường từ tốn', level: 'N2', breakdown: '謙 (Khiêm) + 遜 (Tốn)', mnemonic: 'Nói năng nhún nhường không tự cao tự đại.' },
      { kanji: '嫌い', hiragana: 'きらい (kirai)', sinoVietnamese: 'HIỀM', meaning: 'Ghét bỏ, không thích', level: 'N5', breakdown: '女 (Nữ) + 兼 (Kiêm)', mnemonic: 'Bày tỏ thái độ ghét bỏ rõ ràng.' },
      { kanji: '機嫌', hiragana: 'きげん (kigen)', sinoVietnamese: 'CƠ HIỀM', meaning: 'Tâm trạng, sắc mặt vui buồn', level: 'N3', breakdown: '機 (Cơ) + 嫌 (Hiềm)', mnemonic: 'Trạng thái cảm xúc vui vẻ hay cáu kỉnh trong ngày.' },
      { kanji: '嫌悪', hiragana: 'けんお (ken\'o)', sinoVietnamese: 'HIỀM ÁC', meaning: 'Căm ghét kinh tởm', level: 'N1', breakdown: '嫌 (Hiềm) + 悪 (Ác)', mnemonic: 'Cảm giác chán ghét tột cùng muốn xa lánh.' },
      { kanji: '兼備', hiragana: 'けんび (kenbi)', sinoVietnamese: 'KIÊM BỊ', meaning: 'Có đủ cả đôi đường (tài đức kiêm toàn)', level: 'N1', breakdown: '兼 (Kiêm) + 備 (Bị)', mnemonic: 'Sở hữu trọn vẹn cả tài năng lẫn phẩm hạnh cao quý.' }
    ]
  },
  {
    stt: 172,
    strokeCount: 8,
    radical: '隹',
    name: 'Truy, chuy',
    meaning: 'Chim đuôi ngắn',
    mnemonic: 'Hình chú chim nhỏ đuôi ngắn đang đậu, có đầu, cánh và 4 hàng lông ngực.',
    relatedVocab: [
      { kanji: '集まる', hiragana: 'あつまる (atsumaru)', sinoVietnamese: 'TẬP', meaning: 'Tập hợp, quây quần', level: 'N4', breakdown: '隹 (Chuy) + 木 (Mộc)', mnemonic: 'Đàn chim ríu rít đậu tụ tập trên cành cây xanh.' },
      { kanji: '進む', hiragana: 'すすむ (susumu)', sinoVietnamese: 'TIẾN', meaning: 'Tiến lên phía trước', level: 'N4', breakdown: '辶 (Sước) + 隹 (Chuy)', mnemonic: 'Cất cánh bay thẳng tiến về chân trời phía trước.' },
      { kanji: '雀', hiragana: 'すずめ (suzume)', sinoVietnamese: 'TƯỚC', meaning: 'Chim sẻ nâu nhỏ bé', level: 'N2', breakdown: '小 (Tiểu) + 隹 (Chuy)', mnemonic: 'Chú chim nhỏ ríu rít nhảy nhót trên sân thóc.' },
      { kanji: '雄', hiragana: 'おす (osu) / ゆう (yū)', sinoVietnamese: 'HÙNG', meaning: 'Con đực / anh hùng dũng mãnh', level: 'N1', breakdown: '厷 + 隹 (Chuy)', mnemonic: 'Chim trống dang rộng đôi cánh thể hiện sức mạnh.' },
      { kanji: '雌', hiragana: 'めす (mesu) / し (shi)', sinoVietnamese: 'THƯ', meaning: 'Con cái / giống cái hiền hòa', level: 'N1', breakdown: '止 + 隹 (Chuy)', mnemonic: 'Chim mái ấp trứng dịu dàng trong tổ ấm.' },
      { kanji: '雇う', hiragana: 'やとう (yatou)', sinoVietnamese: 'CỐ', meaning: 'Thuê mướn nhân công', level: 'N3', breakdown: '戸 (Hộ) + 隹 (Chuy)', mnemonic: 'Mở cửa đón người vào nhà làm việc trả công.' },
      { kanji: '難しい', hiragana: 'むずかしい (muzukashii)', sinoVietnamese: 'NAN', meaning: 'Khó khăn trở ngại', level: 'N5', breakdown: '革 + 隹 (Chuy)', mnemonic: 'Bắt chim chuy giữa rừng gai rậm rạp thật vô cùng khó.' },
      { kanji: '離れる', hiragana: 'はなれる (hanareru)', sinoVietnamese: 'LY', meaning: 'Rời xa, tách rời', level: 'N4', breakdown: '离 + 隹 (Chuy)', mnemonic: 'Đôi cánh chim rời tổ bay xa ngút ngàn dặm.' },
      { kanji: '誰', hiragana: 'だれ (dare)', sinoVietnamese: 'THÙY', meaning: 'Ai, người nào', level: 'N5', breakdown: '言 (Ngôn) + 隹 (Chuy)', mnemonic: 'Lời nói thắc mắc hỏi xem ai đang cất tiếng như chim hót.' },
      { kanji: '雑音', hiragana: 'ざつおん (zatsuon)', sinoVietnamese: 'TẠP ÂM', meaning: 'Tiếng ồn nhiễu loạn', level: 'N2', breakdown: '雑 (Tạp - có 隹) + 音 (Âm)', mnemonic: 'Nhiều âm thanh lẫn lộn như tiếng đàn chim cùng hót inh ỏi.' }
    ]
  },
  {
    stt: 173,
    strokeCount: 8,
    radical: '雨',
    variants: ['⻗'],
    name: 'Vũ',
    meaning: 'Cơn mưa từ trời',
    mnemonic: 'Bầu trời (nét ngang), đám mây (冂) và 4 hạt mưa đang rơi tí tách xuống đất.',
    relatedVocab: [
      { kanji: '雨', hiragana: 'あめ (ame)', sinoVietnamese: 'VŨ', meaning: 'Cơn mưa rào mát rượi', level: 'N5', breakdown: '雨 (Vũ)', mnemonic: 'Bốn giọt nước mưa rơi xuống từ đám mây trên bầu trời.' },
      { kanji: '雪', hiragana: 'ゆき (yuki)', sinoVietnamese: 'TUYẾT', meaning: 'Tuyết trắng rơi', level: 'N5', breakdown: '雨 (Vũ) + 彐', mnemonic: 'Bông tuyết trắng rơi xuống như có bàn tay quét dọn.' },
      { kanji: '雲', hiragana: 'くも (kumo)', sinoVietnamese: 'VÂN', meaning: 'Đám mây bồng bềnh', level: 'N3', breakdown: '雨 (Vũ) + 云 (Vân)', mnemonic: 'Hơi nước ngưng tụ thành mây bồng bềnh chuẩn bị làm mưa.' },
      { kanji: '雷', hiragana: 'かみなり (kaminari)', sinoVietnamese: 'LÔI', meaning: 'Sấm sét nổ vang', level: 'N2', breakdown: '雨 (Vũ) + 田 (Điền)', mnemonic: 'Tia chớp sấm rền đánh xuống thửa ruộng lúc trời mưa.' },
      { kanji: '電車', hiragana: 'でんしゃ (densha)', sinoVietnamese: 'ĐIỆN XA', meaning: 'Tàu điện chạy nhanh', level: 'N5', breakdown: '電 (Điện - có 雨) + 車 (Xa)', mnemonic: 'Năng lượng điện như tia chớp vận hành đoàn tàu vùn vụt.' },
      { kanji: '電話', hiragana: 'でんわ (denwa)', sinoVietnamese: 'ĐIỆN THOẠI', meaning: 'Điện thoại liên lạc', level: 'N5', breakdown: '電 (Điện - có 雨) + 話 (Thoại)', mnemonic: 'Nói chuyện xuyên khoảng cách qua dây dẫn điện.' },
      { kanji: '霧', hiragana: 'きり (kiri)', sinoVietnamese: 'VỤ', meaning: 'Sương mù giăng kín lối', level: 'N1', breakdown: '雨 (Vũ) + 務 (Vụ)', mnemonic: 'Màn sương dày đặc giăng mờ ảo khắp sườn đồi sớm mai.' },
      { kanji: '霜', hiragana: 'しも (shimo)', sinoVietnamese: 'SƯƠNG', meaning: 'Sương muối lạnh cóng', level: 'N1', breakdown: '雨 (Vũ) + 相 (Tương)', mnemonic: 'Hạt sương đọng thành băng mỏng trắng xóa trên ngọn cỏ.' },
      { kanji: '梅雨', hiragana: 'つゆ (tsuyu) / ばいう', sinoVietnamese: 'MAI VŨ', meaning: 'Mùa mưa dầm đầu hạ ở Nhật', level: 'N3', breakdown: '梅 (Mai) + 雨 (Vũ)', mnemonic: 'Những ngày mưa rả rích đúng mùa quả mơ chín mọng.' },
      { kanji: '豪雨', hiragana: 'ごうう (gōʊ)', sinoVietnamese: 'HÀO VŨ', meaning: 'Mưa xối xả, mưa to dữ dội', level: 'N2', breakdown: '豪 (Hào) + 雨 (Vũ)', mnemonic: 'Cơn mưa trút nước ào ạt gây ngập lụt khắp đường phố.' }
    ]
  },
  {
    stt: 174,
    strokeCount: 8,
    radical: '靑',
    variants: ['青'],
    name: 'Thanh',
    meaning: 'Màu xanh biếc, thanh xuân',
    mnemonic: 'Cây cối sinh sôi (Sinh 生) bên miệng giếng (Đan 丹) có màu xanh tươi mát.',
    relatedVocab: [
      { kanji: '青い', hiragana: 'あおい (aoi)', sinoVietnamese: 'THANH', meaning: 'Màu xanh da trời, xanh biếc', level: 'N5', breakdown: '青 (Thanh)', mnemonic: 'Mầm cây xanh non vươn lên đón ánh sáng giếng trời.' },
      { kanji: '青年', hiragana: 'せいねん (seinen)', sinoVietnamese: 'THANH NIÊN', meaning: 'Thanh niên, tuổi trẻ', level: 'N3', breakdown: '青 (Thanh) + 年 (Niên)', mnemonic: 'Những tháng năm rực rỡ nhiệt huyết tươi xanh của đời người.' },
      { kanji: '青春', hiragana: 'せいしゅん (seishun)', sinoVietnamese: 'THANH XUÂN', meaning: 'Thanh xuân tươi đẹp', level: 'N2', breakdown: '青 (Thanh) + 春 (Xuân)', mnemonic: 'Mùa xuân xanh mát ngập tràn hoài bão và ước mơ.' },
      { kanji: '晴天', hiragana: 'せいてん (seiten)', sinoVietnamese: 'TÌNH THIÊN', meaning: 'Trời trong xanh quang đãng', level: 'N2', breakdown: '晴 (Tình - có 青) + 天 (Thiên)', mnemonic: 'Mặt trời chiếu sáng bầu trời xanh trong vắt không một gợn mây.' },
      { kanji: '清掃', hiragana: 'せいそう (seisō)', sinoVietnamese: 'THANH TÁO', meaning: 'Quét dọn vệ sinh sạch sẽ', level: 'N3', breakdown: '清 (Thanh - có 青) + 掃 (Táo)', mnemonic: 'Dùng dòng nước trong xanh rửa sạch mọi bụi bẩn.' },
      { kanji: '精神', hiragana: 'せいしん (seishin)', sinoVietnamese: 'TINH THẦN', meaning: 'Tinh thần, ý chí kiên định', level: 'N3', breakdown: '精 (Tinh - có 青) + 神 (Thần)', mnemonic: 'Ý chí trong sáng kiên định dẫn lối thành công.' },
      { kanji: '静か', hiragana: 'しずか (shizuka)', sinoVietnamese: 'TĨNH', meaning: 'Yên tĩnh, tĩnh lặng', level: 'N5', breakdown: '青 (Thanh) + 争 (Tranh)', mnemonic: 'Trời xanh không tranh đua giữ trọn bầu không gian yên ắng.' },
      { kanji: '青空', hiragana: 'あおぞら (aozora)', sinoVietnamese: 'THANH KHÔNG', meaning: 'Bầu trời xanh trong vắt', level: 'N3', breakdown: '青 (Thanh) + 空 (Không)', mnemonic: 'Vòm trời xanh ngắt trải rộng không một bóng mây.' },
      { kanji: '青信号', hiragana: 'あおしんごう (aoshingō)', sinoVietnamese: 'THANH TÍN HIỆU', meaning: 'Đèn xanh giao thông', level: 'N4', breakdown: '青 (Thanh) + 信号 (Tín hiệu)', mnemonic: 'Tín hiệu đèn xanh cho phép xe cộ lưu thông an toàn.' },
      { kanji: '精密', hiragana: 'せいみつ (seimitsu)', sinoVietnamese: 'TINH MẬT', meaning: 'Chính xác tinh vi', level: 'N1', breakdown: '精 (Tinh) + 密 (Mật)', mnemonic: 'Thiết bị đo lường cực kỳ tinh xảo và chuẩn xác.' }
    ]
  },
  {
    stt: 175,
    strokeCount: 8,
    radical: '非',
    name: 'Phi',
    meaning: 'Không phải, phi lý, trái ngược',
    mnemonic: 'Đôi cánh chim vỗ ngược chiều nhau biểu thị sự trái ngược, phủ định hoàn toàn.',
    relatedVocab: [
      { kanji: '非常に', hiragana: 'ひじょうに (hijōni)', sinoVietnamese: 'PHI THƯỜNG', meaning: 'Vô cùng, cực kỳ khác thường', level: 'N4', breakdown: '非 (Phi) + 常 (Thường)', mnemonic: 'Vượt trên mức bình thường muôn phần.' },
      { kanji: '是非', hiragana: 'ぜひ (zehi)', sinoVietnamese: 'THỊ PHI', meaning: 'Nhất định / lẽ đúng sai', level: 'N4', breakdown: '是 (Thị - đúng) + 非 (Phi - sai)', mnemonic: 'Phân định điều phải trái đúng sai trắng đen rõ ràng.' },
      { kanji: '非常口', hiragana: 'ひじょうぐち (hijōguchi)', sinoVietnamese: 'PHI THƯỜNG KHẨU', meaning: 'Cửa thoát hiểm khẩn cấp', level: 'N3', breakdown: '非常 + 口 (Khẩu)', mnemonic: 'Lối thoát hiểm dùng khi xảy ra hỏa hoạn bất thường.' },
      { kanji: '非難', hiragana: 'ひなん (hinan)', sinoVietnamese: 'PHI NAN', meaning: 'Chỉ trích, phê phán', level: 'N2', breakdown: '非 (Phi) + 難 (Nan)', mnemonic: 'Chỉ ra những việc làm sai trái để phê bình uốn nắn.' },
      { kanji: '非行', hiragana: 'ひこう (hikō)', sinoVietnamese: 'PHI HÀNH', meaning: 'Hành vi sai trái ngỗ nghịch', level: 'N1', breakdown: '非 (Phi) + 行 (Hành)', mnemonic: 'Lạc lối phạm vào những việc làm trái pháp luật đạo đức.' },
      { kanji: '罪', hiragana: 'つみ (tsumi)', sinoVietnamese: 'TỘI', meaning: 'Tội lỗi, phạm tội', level: 'N3', breakdown: '罒 (Võng) + 非 (Phi)', mnemonic: 'Làm điều sai trái phi pháp thì sa vào lưới công lý.' },
      { kanji: '悲しい', hiragana: 'かなしい (kanashii)', sinoVietnamese: 'BI', meaning: 'Buồn bã đau xót', level: 'N5', breakdown: '非 (Phi) + 心 (Tâm)', mnemonic: 'Trong lòng đau xót khi nhìn thấy cảnh chia lìa ngang trái.' },
      { kanji: '非公開', hiragana: 'ひこうかい (hikōkai)', sinoVietnamese: 'PHI CÔNG KHAI', meaning: 'Kín đáo, không công khai', level: 'N2', breakdown: '非 (Phi) + 公開 (Công khai)', mnemonic: 'Giữ kín bí mật không để lộ ra ngoài công chúng.' },
      { kanji: '非凡', hiragana: 'ひぼん (hibon)', sinoVietnamese: 'PHI PHÀM', meaning: 'Phi phàm, xuất chúng khác thường', level: 'N1', breakdown: '非 (Phi) + 凡 (Phàm)', mnemonic: 'Tài năng xuất chúng không phải là người phàm tục.' },
      { kanji: '拒絶', hiragana: 'きょぜつ (kyozetsu)', sinoVietnamese: 'CỰ TUYỆT', meaning: 'Khước từ cự tuyệt dứt khoát', level: 'N1', breakdown: 'Chứa gốc nghĩa phủ định phi', mnemonic: 'Lắc đầu từ chối dứt khoát không chấp thuận đề nghị.' }
    ]
  },
  // Nhóm 9 nét (Bộ 176 – 186)
  {
    stt: 176,
    strokeCount: 9,
    radical: '面',
    name: 'Diện',
    meaning: 'Mặt mũi, bề mặt',
    mnemonic: 'Khuôn mặt người với sống mũi ở giữa và đường viền má bao quanh.',
    relatedVocab: [
      { kanji: '面', hiragana: 'めん (men) / おもて', sinoVietnamese: 'DIỆN', meaning: 'Khuôn mặt, bề mặt / mặt nạ kịch', level: 'N3', breakdown: '面 (Diện)', mnemonic: 'Khuôn mặt người có đầy đủ trán mũi miệng viền mắt.' },
      { kanji: '面白い', hiragana: 'おもしろい (omoshiroi)', sinoVietnamese: 'DIỆN BẠCH', meaning: 'Thú vị, hấp dẫn', level: 'N5', breakdown: '面 (Diện) + 白 (Bạch)', mnemonic: 'Nét mặt bừng sáng trắng lên vì điều thú vị vui nhộn.' },
      { kanji: '面接', hiragana: 'めんせつ (mensetsu)', sinoVietnamese: 'DIỆN TIẾP', meaning: 'Phỏng vấn trực tiếp', level: 'N3', breakdown: '面 (Diện) + 接 (Tiếp)', mnemonic: 'Gặp mặt đối diện trực tiếp để trao đổi vấn đáp.' },
      { kanji: '面積', hiragana: 'めんせき (menseki)', sinoVietnamese: 'DIỆN TÍCH', meaning: 'Diện tích đất đai', level: 'N2', breakdown: '面 (Diện) + 積 (Tích)', mnemonic: 'Tích số chiều dài và chiều rộng của một bề mặt.' },
      { kanji: '方面', hiragana: 'ほうめん (hōmen)', sinoVietnamese: 'PHƯƠNG DIỆN', meaning: 'Phương diện, hướng đi', level: 'N3', breakdown: '方 (Phương) + 面 (Diện)', mnemonic: 'Một khía cạnh nhìn nhận hoặc hướng tàu xe di chuyển.' },
      { kanji: '正面', hiragana: 'しょうめん (shōmen)', sinoVietnamese: 'CHÍNH DIỆN', meaning: 'Chính diện, phía trước mặt', level: 'N2', breakdown: '正 (Chính) + 面 (Diện)', mnemonic: 'Vị trí đối diện thẳng ngay trước tầm mắt.' },
      { kanji: '面倒', hiragana: 'めんどう (mendō)', sinoVietnamese: 'DIỆN ĐẢO', meaning: 'Phiền phức, chăm sóc chu đáo', level: 'N4', breakdown: '面 (Diện) + 倒 (Đảo)', mnemonic: 'Mặt mày đảo lộn vì việc rắc rối phức tạp.' },
      { kanji: '画面', hiragana: 'がめん (gamen)', sinoVietnamese: 'HỌA DIỆN', meaning: 'Màn hình tivi điện thoại', level: 'N3', breakdown: '画 (Họa) + 面 (Diện)', mnemonic: 'Bề mặt hiển thị hình ảnh phim ảnh sống động.' },
      { kanji: '対面', hiragana: 'たいめん (taimen)', sinoVietnamese: 'ĐỐI DIỆN', meaning: 'Đối mặt, chạm trán', level: 'N2', breakdown: '対 (Đối) + 面 (Diện)', mnemonic: 'Hai người mặt đối mặt trò chuyện thẳng thắn.' },
      { kanji: '場面', hiragana: 'ばめん (bamen)', sinoVietnamese: 'TRƯỜNG DIỆN', meaning: 'Bối cảnh sân khấu, phân cảnh', level: 'N2', breakdown: '場 (Trường) + 面 (Diện)', mnemonic: 'Khung cảnh diễn ra một màn kịch hoặc sự kiện.' }
    ]
  },
  {
    stt: 177,
    strokeCount: 9,
    radical: '革',
    name: 'Cách',
    meaning: 'Da thuộc, thay đổi cải cách',
    mnemonic: 'Tấm da thú có đầu, hai chân trên và đuôi được căng phẳng ra để thuộc lại.',
    relatedVocab: [
      { kanji: '革', hiragana: 'かわ (kawa)', sinoVietnamese: 'CÁCH', meaning: 'Da thuộc đã qua xử lý', level: 'N2', breakdown: '革 (Cách)', mnemonic: 'Tấm da thú lột ra căng bốn góc hong khô thuộc da.' },
      { kanji: '改革', hiragana: 'かいかく (kaikaku)', sinoVietnamese: 'CẢI CÁCH', meaning: 'Cải cách thể chế', level: 'N2', breakdown: '改 (Cải) + 革 (Cách)', mnemonic: 'Đổi mới triệt để như thuộc một tấm da mới.' },
      { kanji: '革命', hiragana: 'かくめい (kakumei)', sinoVietnamese: 'CÁCH MẠNG', meaning: 'Cách mạng lịch sử', level: 'N2', breakdown: '革 (Cách) + 命 (Mệnh)', mnemonic: 'Thay đổi vận mệnh dân tộc bước sang trang sử mới.' },
      { kanji: '革靴', hiragana: 'かわぐつ (kawagutsu)', sinoVietnamese: 'CÁCH NGOA', meaning: 'Đôi giày da bóng loáng', level: 'N4', breakdown: '革 (Cách) + 靴 (Ngoa - có 革)', mnemonic: 'Đôi giày đóng bằng da thuộc cao cấp bền đẹp.' },
      { kanji: '靴', hiragana: 'くつ (kutsu)', sinoVietnamese: 'NGOA', meaning: 'Giày dép đi chân', level: 'N5', breakdown: '革 (Cách) + 化 (Hóa)', mnemonic: 'Miếng da thuộc biến hóa thành đôi giày ôm khít chân.' },
      { kanji: '鞄', hiragana: 'かばん (kaban)', sinoVietnamese: 'BẠC', meaning: 'Cặp da, túi xách', level: 'N5', breakdown: '革 (Cách) + 包 (Bao)', mnemonic: 'Túi bọc bằng da dùng để đựng tài liệu sách vở.' },
      { kanji: '靴下', hiragana: 'くつした (kutsushita)', sinoVietnamese: 'NGOA HẠ', meaning: 'Tất chân, vớ đi trong giày', level: 'N5', breakdown: '靴 (Ngoa) + 下 (Hạ)', mnemonic: 'Đôi tất ấm áp lót bên dưới chiếc giày da.' },
      { kanji: '皮革', hiragana: 'ひかく (hikaku)', sinoVietnamese: 'BÌ CÁCH', meaning: 'Ngành đồ da may mặc', level: 'N1', breakdown: '皮 (Bì) + 革 (Cách)', mnemonic: 'Các chất liệu da thô và da đã thuộc công nghiệp.' },
      { kanji: '鞭', hiragana: 'むち (muchi)', sinoVietnamese: 'TIÊN', meaning: 'Roi da quất ngựa', level: 'N1', breakdown: '革 (Cách) + 便 (Tiện)', mnemonic: 'Chiếc roi bện bằng da bò dẻo dai vút gió.' },
      { kanji: '革新', hiragana: 'かくしん (kakushin)', sinoVietnamese: 'CÁCH TÂN', meaning: 'Đổi mới canh tân', level: 'N1', breakdown: '革 (Cách) + 新 (Tân)', mnemonic: 'Loại bỏ cái cũ kỹ đón nhận làn gió mới mẻ tiến bộ.' }
    ]
  },
  {
    stt: 178,
    strokeCount: 9,
    radical: '韋',
    name: 'Vi',
    meaning: 'Da đã thuộc rồi, vây quanh',
    mnemonic: 'Hai bàn chân đi vòng quanh canh giữ bức tường thành hoặc tấm da mềm bao quanh.',
    relatedVocab: [
      { kanji: '偉大', hiragana: 'いだい (idai)', sinoVietnamese: 'VĨ ĐẠI', meaning: 'Vĩ đại, xuất chúng', level: 'N2', breakdown: '偉 (có 韋) + 大 (Đại)', mnemonic: 'Bậc vĩ nhân có nhân cách bao dung như tấm da lớn.' },
      { kanji: '違反', hiragana: 'いはん (ihan)', sinoVietnamese: 'VI PHẢN', meaning: 'Vi phạm quy tắc, pháp luật', level: 'N3', breakdown: '違 (có 韋) + 反 (Phản)', mnemonic: 'Hành động sai lệch đi ngược lại quy định chung.' },
      { kanji: '違う', hiragana: 'ちがう (chigau)', sinoVietnamese: 'VI', meaning: 'Khác biệt, nhầm lẫn', level: 'N5', breakdown: '辶 (Sước) + 韋 (Vi)', mnemonic: 'Bước đi sai hướng làm lệch với chuẩn mực.' },
      { kanji: '間違い', hiragana: 'まちがい (machigai)', sinoVietnamese: 'GIAN VI', meaning: 'Sai lầm, sơ suất', level: 'N4', breakdown: '間 + 違い (Vi)', mnemonic: 'Lỗi lầm bất cẩn cần phải sửa đổi ngay ngắn.' },
      { kanji: '偉い', hiragana: 'えらい (erai)', sinoVietnamese: 'VĨ', meaning: 'Giỏi giang, đáng nể', level: 'N3', breakdown: '偉 (có bộ 韋)', mnemonic: 'Người có công lao to lớn ai cũng khâm phục.' },
      { kanji: '違和感', hiragana: 'いわかん (iwakan)', sinoVietnamese: 'VI HÒA CẢM', meaning: 'Cảm giác gượng gạo, không tự nhiên', level: 'N1', breakdown: '違 (Vi) + 和 (Hòa) + 感 (Cảm)', mnemonic: 'Cảm giác không ăn khớp có sự gợn khúc mắc.' },
      { kanji: '相違', hiragana: 'そうい (sōi)', sinoVietnamese: 'TƯƠNG VI', meaning: 'Khác nhau, bất đồng', level: 'N1', breakdown: '相 (Tương) + 違 (Vi)', mnemonic: 'Có sự khác biệt rõ nét giữa hai bản tường trình.' },
      { kanji: '護衛', hiragana: 'ごえい (goei)', sinoVietnamese: 'HỘ VỆ', meaning: 'Bảo vệ hộ tống', level: 'N1', breakdown: '護 (Hộ) + 衛 (Vệ - có gốc 韋)', mnemonic: 'Vòng bảo vệ nghiêm mật che chắn cho nguyên thủ.' },
      { kanji: '衛生', hiragana: 'えいせい (eisei)', sinoVietnamese: 'VỆ SINH', meaning: 'Vệ sinh sạch sẽ, phòng dịch', level: 'N2', breakdown: '衛 (Vệ - có 韋) + 生 (Sinh)', mnemonic: 'Giữ gìn bảo vệ sức khỏe và môi trường sống trong lành.' },
      { kanji: '違法', hiragana: 'いほう (ihō)', sinoVietnamese: 'VI PHÁP', meaning: 'Trái pháp luật, phi pháp', level: 'N2', breakdown: '違 (Vi) + 法 (Pháp)', mnemonic: 'Hành vi sai trái làm trái với quy định của hiến pháp.' }
    ]
  },
  {
    stt: 179,
    strokeCount: 9,
    radical: '韭',
    name: 'Phỉ, cửu',
    meaning: 'Rau phỉ (cây hẹ)',
    mnemonic: 'Những lá hẹ (Phi 非) mọc thẳng đứng trên mặt đất (Nhất 一).',
    relatedVocab: [
      { kanji: '韭', hiragana: 'にら (nira)', sinoVietnamese: 'CỬU', meaning: 'Cây rau hẹ xanh thơm', level: 'N2', breakdown: '韭 (Cửu)', mnemonic: 'Bụi rau hẹ lá dẹt xanh mướt mọc từng khóm trên luống rau.' },
      { kanji: '韭炒め', hiragana: 'にらいため (niraitame)', sinoVietnamese: 'CỬU SAO', meaning: 'Món hẹ xào gan heo', level: 'N2', breakdown: '韭 (Cửu) + 炒 (Sao - xào)', mnemonic: 'Món ăn xào thơm lừng bồi bổ sức khỏe của người Nhật.' },
      { kanji: '韭玉', hiragana: 'にらたま (niratama)', sinoVietnamese: 'CỬU NGỌC', meaning: 'Trứng rán rau hẹ', level: 'N2', breakdown: '韭 (Cửu) + 玉 (Ngọc - trứng)', mnemonic: 'Món trứng chiên vàng xốp cùng rau hẹ xanh ngát thơm ngon.' },
      { kanji: '韭雑炊', hiragana: 'にらぞうすい (nirazōsui)', sinoVietnamese: 'CỬU TẠP THÔI', meaning: 'Cháo hẹ giải cảm', level: 'N1', breakdown: '韭 (Cửu) + 雑炊 (Cháo thập cẩm)', mnemonic: 'Tô cháo nóng rắc đầy lá hẹ giúp toát mồ hôi giải cảm.' },
      { kanji: '韮の花', hiragana: 'にらのはな (niranohana)', sinoVietnamese: 'CỬU HOA', meaning: 'Hoa hẹ trắng nhỏ xinh', level: 'N1', breakdown: '韮 (Cửu) + 花 (Hoa)', mnemonic: 'Những chùm hoa hẹ màu trắng li ti nở rộ cuối thu.' },
      { kanji: '韭菜', hiragana: 'きゅうさい (kyūsai)', sinoVietnamese: 'CỬU THÁI', meaning: 'Rau hẹ (tiếng Hán cổ)', level: 'N1', breakdown: '韭 (Cửu) + 菜 (Thái)', mnemonic: 'Thứ rau gia vị thanh nhiệt trừ hàn giải độc.' },
      { kanji: '黄韮', hiragana: 'きにら (kinira)', sinoVietnamese: 'HOÀNG CỬU', meaning: 'Hẹ vàng cao cấp trồng bóng râm', level: 'N1', breakdown: '黄 (Hoàng) + 韮 (Cửu)', mnemonic: 'Giống hẹ ủ bóng râm lá vàng mềm ngọt dịu đặc sản Okayama.' },
      { kanji: '花韮', hiragana: 'はなにら (hananira)', sinoVietnamese: 'HOA CỬU', meaning: 'Cây hẹ hoa cảnh', level: 'N1', breakdown: '花 (Hoa) + 韮 (Cửu)', mnemonic: 'Cây hẹ cảnh nở hoa hình ngôi sao trắng muốt.' },
      { kanji: '韮饅頭', hiragana: 'にらまんじゅう (niramanjū)', sinoVietnamese: 'CỬU MÀN THẦU', meaning: 'Bánh bao nhân rau hẹ chiên giòn', level: 'N1', breakdown: '韮 (Cửu) + 饅頭', mnemonic: 'Chiếc bánh há cảo nhân hẹ thơm nức cắn ngập miệng.' },
      { kanji: '韭根', hiragana: 'きゅうこん (kyūkon)', sinoVietnamese: 'CỬU CĂN', meaning: 'Rễ củ cây hẹ', level: 'N1', breakdown: '韭 (Cửu) + 根 (Căn)', mnemonic: 'Phần củ rễ bám chặt trong lòng đất dùng làm vị thuốc đông y.' }
    ]
  },
  {
    stt: 180,
    strokeCount: 9,
    radical: '音',
    name: 'Âm',
    meaning: 'Âm thanh, tiếng vang',
    mnemonic: 'Lời nói (Ngôn 言) phát ra mang theo một ý nghĩa trong lòng tạo thành âm thanh (Lập 立 + Nhật 日).',
    relatedVocab: [
      { kanji: '音', hiragana: 'おと (oto) / おん (on)', sinoVietnamese: 'ÂM', meaning: 'Âm thanh, tiếng động', level: 'N5', breakdown: '立 (Lập) + 日 (Nhật)', mnemonic: 'Tiếng nói thốt lên từ vòm miệng vang vọng dưới ánh mặt trời.' },
      { kanji: '音楽', hiragana: 'おんがく (ongaku)', sinoVietnamese: 'ÂM LẠC', meaning: 'Âm nhạc giải trí', level: 'N5', breakdown: '音 (Âm) + 楽 (Lạc)', mnemonic: 'Âm điệu du dương mang lại niềm vui sướng cho tâm hồn.' },
      { kanji: '発音', hiragana: 'はつおん (hatsuon)', sinoVietnamese: 'PHÁT ÂM', meaning: 'Phát âm tiếng nói', level: 'N4', breakdown: '発 (Phát) + 音 (Âm)', mnemonic: 'Bật ra thanh âm chuẩn xác khi học ngoại ngữ.' },
      { kanji: '本音', hiragana: 'ほんね (honne)', sinoVietnamese: 'BỔN ÂM', meaning: 'Ý nghĩ thật lòng trong tâm', level: 'N2', breakdown: '本 (Bổn) + 音 (Âm)', mnemonic: 'Tiếng lòng chân thật từ tận đáy dạ con người.' },
      { kanji: '暗記', hiragana: 'あんき (anki)', sinoVietnamese: 'ÁM KÝ', meaning: 'Học thuộc lòng', level: 'N3', breakdown: '暗 (Ám - có 音) + 記 (Ký)', mnemonic: 'Nhẩm đi nhẩm lại trong bóng tối để ghi nhớ kiến thức.' },
      { kanji: '響く', hiragana: 'ひびく (hibiku)', sinoVietnamese: 'HƯỞNG', meaning: 'Vang vọng, ngân vang', level: 'N2', breakdown: '郷 (Hương) + 音 (Âm)', mnemonic: 'Âm thanh tiếng chuông ngân vang khắp thôn xóm xa xôi.' },
      { kanji: '録音', hiragana: 'ろくおん (rokuon)', sinoVietnamese: 'LỤC ÂM', meaning: 'Ghi âm bài hát', level: 'N3', breakdown: '録 (Lục) + 音 (Âm)', mnemonic: 'Lưu lại âm thanh vào băng đĩa nhạc.' },
      { kanji: '雑音', hiragana: 'ざつおん (zatsuon)', sinoVietnamese: 'TẠP ÂM', meaning: 'Tạp âm, tiếng ồn quấy rầy', level: 'N2', breakdown: '雑 (Tạp) + 音 (Âm)', mnemonic: 'Tiếng ồn ào hỗn tạp gây khó chịu thính giác.' },
      { kanji: '音声', hiragana: 'おんせい (onsei)', sinoVietnamese: 'ÂM THANH', meaning: 'Âm thanh giọng nói', level: 'N2', breakdown: '音 (Âm) + 声 (Thanh)', mnemonic: 'Thanh âm truyền tải thông tin qua micro đài phát thanh.' },
      { kanji: '音痴', hiragana: 'おんち (onchi)', sinoVietnamese: 'ÂM SI', meaning: 'Mù nhạc, hát lạc nhịp', level: 'N2', breakdown: '音 (Âm) + 痴 (Si)', mnemonic: 'Người không phân biệt được cao độ nốt nhạc khi hát karaoke.' }
    ]
  },
  {
    stt: 181,
    strokeCount: 9,
    radical: '頁',
    name: 'Hiệt',
    meaning: 'Trang giấy, cái đầu người',
    mnemonic: 'Cái đầu (Một 一 + Tự 自) gắn trên đôi chân người (Bát 八) – phần đầu nổi bật nhất.',
    relatedVocab: [
      { kanji: '頭', hiragana: 'あたま (atama)', sinoVietnamese: 'ĐẦU', meaning: 'Cái đầu, đầu óc', level: 'N5', breakdown: '豆 (Đậu) + 頁 (Hiệt)', mnemonic: 'Chiếc đầu tròn như hạt đậu nâng đỡ bởi cổ và gáy.' },
      { kanji: '頂上', hiragana: 'ちょうじょう (chōjō)', sinoVietnamese: 'ĐÍNH THƯỢNG', meaning: 'Đỉnh núi, tột đỉnh', level: 'N3', breakdown: '頂 (Đính - có 頁) + 上 (Thượng)', mnemonic: 'Điểm cao nhất trên chóp đầu ngọn núi cao chót vót.' },
      { kanji: '顔', hiragana: 'かお (kao)', sinoVietnamese: 'NHAN', meaning: 'Khuôn mặt xinh đẹp', level: 'N5', breakdown: '彦 (Ngạn) + 頁 (Hiệt)', mnemonic: 'Khuôn mặt rạng rỡ của chàng trai tài hoa khôi ngô.' },
      { kanji: '頼む', hiragana: 'たのむ (tanomu)', sinoVietnamese: 'LẠI', meaning: 'Nhờ vả, trông cậy', level: 'N5', breakdown: '頼 (có bộ 頁)', mnemonic: 'Cúi đầu cậy nhờ vào sự giúp đỡ của bạn hữu.' },
      { kanji: '類', hiragana: 'るい (rui)', sinoVietnamese: 'LOẠI', meaning: 'Chủng loại, thể loại', level: 'N3', breakdown: '米 + 犬 + 頁 (Hiệt)', mnemonic: 'Phân chia từng trang từng loại đồ vật rõ ràng.' },
      { kanji: '額', hiragana: 'ひたい (hitai) / がく (gaku)', sinoVietnamese: 'NGẠCH', meaning: 'Vầng trán / số tiền, kim ngạch', level: 'N2', breakdown: '客 (Khách) + 頁 (Hiệt)', mnemonic: 'Vầng trán cao rộng của người khách quý ghé thăm.' },
      { kanji: '願う', hiragana: 'ねがう (negau)', sinoVietnamese: 'NGUYỆN', meaning: 'Cầu nguyện, ước mong', level: 'N4', breakdown: '原 (Nguyên) + 頁 (Hiệt)', mnemonic: 'Cúi đầu thành tâm khấn nguyện trước trời cao.' },
      { kanji: '題名', hiragana: 'だいめい (daimei)', sinoVietnamese: 'ĐỀ DANH', meaning: 'Nhan đề cuốn sách, tiêu đề', level: 'N3', breakdown: '題 (Đề - có 頁) + 名 (Danh)', mnemonic: 'Tên sách được in trang trọng ngay trang đầu tiên.' },
      { kanji: '頻繁', hiragana: 'ひんぱん (hinpan)', sinoVietnamese: 'TẦN PHỒN', meaning: 'Thường xuyên dồn dập', level: 'N1', breakdown: '頻 (Tần - có 頁) + 繁 (Phồn)', mnemonic: 'Lật giở từng trang liên tiếp không ngừng nghỉ.' },
      { kanji: 'ページ', hiragana: 'ぺーじ (pēji)', sinoVietnamese: 'HIỆT', meaning: 'Trang sách (chữ 頁 đọc là page)', level: 'N5', breakdown: '頁 (Hiệt)', mnemonic: 'Từng trang sách mở ra chân trời tri thức bất tận.' }
    ]
  },
  {
    stt: 182,
    strokeCount: 9,
    radical: '風',
    variants: ['凩'],
    name: 'Phong',
    meaning: 'Ngọn gió, phong cách',
    mnemonic: 'Khi gió thổi (cánh buồm 几), côn trùng sâu bọ (Trùng 虫) sinh sôi và bay theo gió.',
    relatedVocab: [
      { kanji: '風', hiragana: 'かぜ (kaze)', sinoVietnamese: 'PHONG', meaning: 'Cơn gió mát lành', level: 'N5', breakdown: '風 (Phong)', mnemonic: 'Gió luồn qua vách cửa làm côn trùng sâu bọ 虫 chuyển động.' },
      { kanji: '台風', hiragana: 'たいふう (taifū)', sinoVietnamese: 'ĐÀI PHONG', meaning: 'Cơn bão nhiệt đới', level: 'N4', breakdown: '台 (Đài) + 風 (Phong)', mnemonic: 'Cơn bão lớn cuồng phong gầm rú ngoài biển khơi.' },
      { kanji: 'お風呂', hiragana: 'おふろ (ofuro)', sinoVietnamese: 'PHONG LỮ', meaning: 'Bồn tắm nước nóng kiểu Nhật', level: 'N5', breakdown: '風 (Phong) + 呂', mnemonic: 'Ngâm mình trong bồn nước nóng sảng khoái sau ngày dài.' },
      { kanji: '風邪', hiragana: 'かぜ (kaze)', sinoVietnamese: 'PHONG TÀ', meaning: 'Cảm cúm, trúng gió', level: 'N5', breakdown: '風 (Phong) + 邪 (Tà)', mnemonic: 'Trúng phải luồng gió độc gây ốm đau sổ mũi.' },
      { kanji: '風景', hiragana: 'ふうけい (fūkei)', sinoVietnamese: 'PHONG CẢNH', meaning: 'Phong cảnh thiên nhiên', level: 'N3', breakdown: '風 (Phong) + 景 (Cảnh)', mnemonic: 'Bức tranh sơn thủy hữu tình trong gió ngàn lộng lẫy.' },
      { kanji: '暴風', hiragana: 'ぼうふう (bōfū)', sinoVietnamese: 'BẠO PHONG', meaning: 'Cơn bão tố cuồng phong', level: 'N2', breakdown: '暴 (Bạo) + 風 (Phong)', mnemonic: 'Gió bão gầm rít quật ngã cây cối trên đường đi.' },
      { kanji: '風俗', hiragana: 'ふうぞく (fūzoku)', sinoVietnamese: 'PHONG TỤC', meaning: 'Phong tục tập quán', level: 'N2', breakdown: '風 (Phong) + 俗 (Tục)', mnemonic: 'Nếp sống và tập quán truyền thống của một vùng miền.' },
      { kanji: '和風', hiragana: 'わふう (wafū)', sinoVietnamese: 'HÒA PHONG', meaning: 'Phong cách truyền thống Nhật Bản', level: 'N2', breakdown: '和 (Hòa) + 風 (Phong)', mnemonic: 'Nét đẹp tao nhã mang đậm tinh thần văn hóa Nhật Bản.' },
      { kanji: '洋風', hiragana: 'ようふう (yōfū)', sinoVietnamese: 'DƯƠNG PHONG', meaning: 'Phong cách phương Tây hiện đại', level: 'N2', breakdown: '洋 (Dương) + 風 (Phong)', mnemonic: 'Thiết kế kiến trúc hiện đại mang hơi thở phương Tây.' },
      { kanji: '風波', hiragana: 'ふうは (fūha)', sinoVietnamese: 'PHONG BA', meaning: 'Sóng gió phong ba bão táp', level: 'N1', breakdown: '風 (Phong) + 波 (Ba)', mnemonic: 'Sóng gió cuộc đời thử thách ý chí người quân tử.' }
    ]
  },
  {
    stt: 183,
    strokeCount: 9,
    radical: '飛',
    name: 'Phi',
    meaning: 'Bay lượn trên trời',
    mnemonic: 'Hình chú chim đang vỗ hai đôi cánh tung bay vút lên bầu trời cao.',
    relatedVocab: [
      { kanji: '飛ぶ', hiragana: 'とぶ (tobu)', sinoVietnamese: 'PHI', meaning: 'Bay lượn trên không', level: 'N5', breakdown: '飛 (Phi)', mnemonic: 'Cánh chim dang rộng vỗ cánh bay vút vào mây xanh.' },
      { kanji: '飛行機', hiragana: 'ひこうき (hikōki)', sinoVietnamese: 'PHI HÀNH CƠ', meaning: 'Máy bay chở khách', level: 'N5', breakdown: '飛 (Phi) + 行 (Hành) + 機 (Cơ)', mnemonic: 'Cỗ máy bay lượn đưa hành khách vượt đại dương.' },
      { kanji: '飛び出す', hiragana: 'とびだす (tobidasu)', sinoVietnamese: 'PHI XUẤT', meaning: 'Lao ra, nhảy vọt ra đường', level: 'N3', breakdown: '飛 (Phi) + 出 (Xuất)', mnemonic: 'Bất ngờ phóng lao vọt ra ngoài gây nguy hiểm.' },
      { kanji: '飛行場', hiragana: 'ひこうじょう (hikōjō)', sinoVietnamese: 'PHI HÀNH TRƯỜNG', meaning: 'Sân bay cất hạ cánh', level: 'N4', breakdown: '飛行 + 場 (Trường)', mnemonic: 'Bãi đỗ và đường băng đón trả các chuyến bay.' },
      { kanji: '飛躍', hiragana: 'ひやく (hiyaku)', sinoVietnamese: 'PHI DƯỢC', meaning: 'Bước nhảy vọt vượt bậc', level: 'N1', breakdown: '飛 (Phi) + 躍 (Dược - nhảy)', mnemonic: 'Sự tiến bộ nhảy vọt ngoạn mục vươn tới tầm cao mới.' },
      { kanji: '飛び降りる', hiragana: 'とびおりる (tobioriru)', sinoVietnamese: 'PHI HÀNG', meaning: 'Nhảy từ trên cao xuống', level: 'N3', breakdown: '飛 (Phi) + 降 (Hàng)', mnemonic: 'Bật nhảy từ trên cao tiếp đất an toàn.' },
      { kanji: '雄飛', hiragana: 'ゆうひ (yūhi)', sinoVietnamese: 'HÙNG PHI', meaning: 'Vươn mình tung cánh bay xa', level: 'N1', breakdown: '雄 (Hùng) + 飛 (Phi)', mnemonic: 'Đại bàng dũng mãnh tung cánh lập nên nghiệp lớn.' },
      { kanji: '散飛', hiragana: 'さんぴ (sanpi)', sinoVietnamese: 'TẢN PHI', meaning: 'Bay tản mát muôn phương', level: 'N1', breakdown: '散 (Tản) + 飛 (Phi)', mnemonic: 'Những mảnh vỡ bay tung tóe khắp mọi ngóc ngách.' },
      { kanji: '飛ばす', hiragana: 'とばす (tobasu)', sinoVietnamese: 'PHI', meaning: 'Làm cho bay lên / bỏ qua một đoạn', level: 'N3', breakdown: '飛 (Phi)', mnemonic: 'Thả cánh diều bay lượn hoặc bỏ qua trang sách đọc nhanh.' },
      { kanji: '飛沫', hiragana: 'ひまつ (himatsu)', sinoVietnamese: 'PHI MẠT', meaning: 'Giọt bắn li ti, bọt nước bắn', level: 'N1', breakdown: '飛 (Phi) + 沫 (Mạt)', mnemonic: 'Bọt sóng bắn tung tóe hoặc giọt bắn khi hắt hơi.' }
    ]
  },
  {
    stt: 184,
    strokeCount: 9,
    radical: '食',
    variants: ['飠', '𩙿'],
    name: 'Thực',
    meaning: 'Ăn uống, thức ăn',
    mnemonic: 'Nắp vung (人) đậy trên bát cơm đầy ắp thơm ngon lành (良).',
    relatedVocab: [
      { kanji: '食べる', hiragana: 'たべる (taberu)', sinoVietnamese: 'THỰC', meaning: 'Ăn cơm, ăn uống', level: 'N5', breakdown: '食 (Thực)', mnemonic: 'Dưới mái nhà sum họp mọi người cùng thưởng thức bát cơm ngon.' },
      { kanji: '食事', hiragana: 'しょくじ (shokuji)', sinoVietnamese: 'THỰC SỰ', meaning: 'Bữa ăn uống hàng ngày', level: 'N4', breakdown: '食 (Thực) + 事 (Sự)', mnemonic: 'Bữa cơm ấm cúng gắn kết các thành viên gia đình.' },
      { kanji: '食堂', hiragana: 'しょくどう (shokudō)', sinoVietnamese: 'THỰC ĐƯỜNG', meaning: 'Nhà ăn công ty, căng tin', level: 'N5', breakdown: '食 (Thực) + 堂 (Đường)', mnemonic: 'Căn phòng rộng lớn phục vụ bữa trưa cho nhân viên.' },
      { kanji: '朝食', hiragana: 'ちょうしょく (chōshoku)', sinoVietnamese: 'TRIỀU THỰC', meaning: 'Bữa sáng dinh dưỡng', level: 'N4', breakdown: '朝 (Triều) + 食 (Thực)', mnemonic: 'Bữa điểm tâm khởi đầu ngày mới ngập tràn năng lượng.' },
      { kanji: '昼食', hiragana: 'ちゅうしょく (chūshoku)', sinoVietnamese: 'TRÚ THỰC', meaning: 'Bữa trưa', level: 'N4', breakdown: '昼 (Trú) + 食 (Thực)', mnemonic: 'Bữa cơm trưa nạp lại năng lượng sau giờ làm việc vất vả.' },
      { kanji: '夕食', hiragana: 'ゆうしょく (yūshoku)', sinoVietnamese: 'TỊCH THỰC', meaning: 'Bữa tối ấm cúng', level: 'N4', breakdown: '夕 (Tịch) + 食 (Thực)', mnemonic: 'Bữa cơm chiều hoàng hôn quây quần bên người thân yêu.' },
      { kanji: 'ご飯', hiragana: 'ごはん (gohan)', sinoVietnamese: 'PHẠN', meaning: 'Bát cơm trắng / bữa ăn', level: 'N5', breakdown: '飠 (Thực) + 反 (Phản)', mnemonic: 'Hạt gạo trắng nấu chín thành bát cơm dẻo ngọt thơm lừng.' },
      { kanji: '館', hiragana: 'かん (kan)', sinoVietnamese: 'QUÁN', meaning: 'Tòa nhà, hội quán, bảo tàng', level: 'N4', breakdown: '飠 (Thực) + 官 (Quan)', mnemonic: 'Nơi các vị quan lại nghỉ ngơi ăn uống thời xưa.' },
      { kanji: '飲む', hiragana: 'のむ (nomu)', sinoVietnamese: 'ẨM', meaning: 'Uống nước, uống trà', level: 'N5', breakdown: '飠 (Thực) + 欠 (Khiếm)', mnemonic: 'Há to miệng nuốt từng ngụm nước mát giải cơn khát.' },
      { kanji: '飢餓', hiragana: 'きが (kiga)', sinoVietnamese: 'CƠ NGÃ', meaning: 'Nạn đói khát cùng cực', level: 'N1', breakdown: '飢 (Cơ - có 飠) + 餓 (Ngã - có 飠)', mnemonic: 'Nỗi thống khổ thiếu thốn lương thực đe dọa sinh mạng.' }
    ]
  },
  {
    stt: 185,
    strokeCount: 9,
    radical: '首',
    name: 'Thủ',
    meaning: 'Cái đầu, cổ, đứng đầu',
    mnemonic: 'Cái đầu có hai lọn tóc/sừng ở trên (丷), mái tóc (一) và cái mũi ở giữa mặt (Tự 自).',
    relatedVocab: [
      { kanji: '首', hiragana: 'くび (kubi)', sinoVietnamese: 'THỦ', meaning: 'Cổ họng / cái đầu', level: 'N4', breakdown: '首 (Thủ)', mnemonic: 'Cái đầu với chỏm tóc và đôi mắt nhìn thẳng trên chiếc cổ.' },
      { kanji: '首相', hiragana: 'しゅしょう (shushō)', sinoVietnamese: 'THỦ TƯƠNG', meaning: 'Thủ tướng chính phủ', level: 'N3', breakdown: '首 (Thủ) + 相 (Tương)', mnemonic: 'Người đứng đầu nội các lãnh đạo toàn bộ quốc gia.' },
      { kanji: '首都', hiragana: 'しゅと (shuto)', sinoVietnamese: 'THỦ ĐÔ', meaning: 'Thủ đô đất nước', level: 'N3', breakdown: '首 (Thủ) + 都 (Đô)', mnemonic: 'Trái tim và trung tâm đầu não chính trị của một đất nước.' },
      { kanji: '手首', hiragana: 'てくび (tekubi)', sinoVietnamese: 'THỦ THỦ', meaning: 'Cổ tay mềm dẻo', level: 'N3', breakdown: '手 (Thủ - tay) + 首 (Thủ - cổ)', mnemonic: 'Khớp nối cổ tay linh hoạt cử động bàn tay khéo léo.' },
      { kanji: '足首', hiragana: 'あしくび (ashikubi)', sinoVietnamese: 'TÚC THỦ', meaning: 'Cổ chân', level: 'N3', breakdown: '足 (Túc) + 首 (Thủ)', mnemonic: 'Khớp cổ chân nâng đỡ những bước chạy bền bỉ.' },
      { kanji: '部首', hiragana: 'ぶしゅ (bushu)', sinoVietnamese: 'BỘ THỦ', meaning: 'Bộ thủ chữ Hán Hán tự', level: 'N2', breakdown: '部 (Bộ) + 首 (Thủ)', mnemonic: 'Các thành phần gốc đứng đầu cấu tạo nên 214 bộ Hán tự.' },
      { kanji: '首長', hiragana: 'しゅちょう (shuchō)', sinoVietnamese: 'THỦ TRƯỞNG', meaning: 'Thủ trưởng, người đứng đầu địa phương', level: 'N1', breakdown: '首 (Thủ) + 長 (Trưởng)', mnemonic: 'Người đứng đầu giữ vị trí then chốt ra quyết định.' },
      { kanji: '自首', hiragana: 'じしゅ (jishu)', sinoVietnamese: 'TỰ THỦ', meaning: 'Tự thú, đầu thú tại đồn cảnh sát', level: 'N1', breakdown: '自 (Tự) + 首 (Thủ)', mnemonic: 'Tự mình cúi đầu nhận tội trước cơ quan công lý.' },
      { kanji: '首尾', hiragana: 'しゅび (shubi)', sinoVietnamese: 'THỦ VĨ', meaning: 'Đầu đuôi xuôi ngược, kết quả', level: 'N1', breakdown: '首 (Thủ - đầu) + 尾 (Vĩ - đuôi)', mnemonic: 'Từ đầu đến cuối câu chuyện diễn ra thuận buồm xuôi gió.' },
      { kanji: '首飾り', hiragana: 'くびかざり (kubikazari)', sinoVietnamese: 'THỦ SỨC', meaning: 'Vòng đeo cổ lấp lánh', level: 'N2', breakdown: '首 (Thủ) + 飾 (Sức)', mnemonic: 'Chiếc dây chuyền trang sức làm tôn nét duyên dáng vòm cổ.' }
    ]
  },
  {
    stt: 186,
    strokeCount: 9,
    radical: '香',
    name: 'Hương',
    meaning: 'Mùi hương thơm thoang thoảng',
    mnemonic: 'Lúa chín (Hòa 禾) dưới ánh mặt trời (Nhật 日) tỏa ra mùi hương thơm ngát.',
    relatedVocab: [
      { kanji: '香る', hiragana: 'かおる (kaoru)', sinoVietnamese: 'HƯƠNG', meaning: 'Tỏa hương thơm ngát', level: 'N2', breakdown: '禾 (Hòa - lúa) + 日 (Nhật - miệng thưởng thức)', mnemonic: 'Hạt lúa chín tỏa ra mùi hương ngọt ngào khắp xóm làng.' },
      { kanji: '香り', hiragana: 'かおり (kaori)', sinoVietnamese: 'HƯƠNG', meaning: 'Mùi hương, hương thơm', level: 'N3', breakdown: '香 (Hương)', mnemonic: 'Hương thơm ngạt ngào của đóa hoa hồng trong sớm mai.' },
      { kanji: '香水', hiragana: 'こうすい (kōsui)', sinoVietnamese: 'HƯƠNG THỦY', meaning: 'Nước hoa cao cấp', level: 'N3', breakdown: '香 (Hương) + 水 (Thủy)', mnemonic: 'Làn nước tinh chế chứa đựng hương thơm quyến rũ.' },
      { kanji: '香辛料', hiragana: 'こうしんりょう (kōshinryō)', sinoVietnamese: 'HƯƠNG TÂN LIỆU', meaning: 'Gia vị cay nồng thơm ngon', level: 'N2', breakdown: '香 (Hương) + 辛 (Tân) + 料 (Liệu)', mnemonic: 'Gia vị làm bùng nổ hương sắc và vị cay của món ăn.' },
      { kanji: '線香', hiragana: 'せんこう (senkō)', sinoVietnamese: 'TUYẾN HƯƠNG', meaning: 'Nén nhang thắp bàn thờ', level: 'N2', breakdown: '線 (Tuyến) + 香 (Hương)', mnemonic: 'Nén nhang thơm thành kính dâng lên tổ tiên thần linh.' },
      { kanji: '香港', hiragana: 'ほんこん (honkon)', sinoVietnamese: 'HƯƠNG CẢNG', meaning: 'Đặc khu Hong Kong sầm uất', level: 'N3', breakdown: '香 (Hương) + 港 (Cảng)', mnemonic: 'Bến cảng thơm nức mùi trầm hương thời cổ đại.' },
      { kanji: '芳香', hiragana: 'ほうこう (hōkō)', sinoVietnamese: 'PHƯƠNG HƯƠNG', meaning: 'Hương thơm nồng nàn dịu ngọt', level: 'N1', breakdown: '芳 (Phương) + 香 (Hương)', mnemonic: 'Mùi thơm dịu dàng thanh tao lan tỏa khắp không gian.' },
      { kanji: '焼香', hiragana: 'しょうこう (shōkō)', sinoVietnamese: 'THIÊU HƯƠNG', meaning: 'Thắp hương viếng tang lễ', level: 'N1', breakdown: '焼 (Thiêu) + 香 (Hương)', mnemonic: 'Đốt nén hương thơm tiễn biệt người đã khuất.' },
      { kanji: '香気', hiragana: 'こうき (kōki)', sinoVietnamese: 'HƯƠNG KHÍ', meaning: 'Mùi hương thoảng đưa', level: 'N1', breakdown: '香 (Hương) + 気 (Khí)', mnemonic: 'Luồng không khí thơm ngát đón gió xuân về.' },
      { kanji: '薫香', hiragana: 'くんこう (kunkō)', sinoVietnamese: 'HUÂN HƯƠNG', meaning: 'Xông trầm thơm lừng', level: 'N1', breakdown: '薫 (Huân) + 香 (Hương)', mnemonic: 'Khói trầm hương thanh tịnh tẩy uế tâm hồn.' }
    ]
  },
  // Nhóm 10 nét (Bộ 187 – 194)
  {
    stt: 187,
    strokeCount: 10,
    radical: '馬',
    name: 'Mã',
    meaning: 'Con ngựa',
    mnemonic: 'Hình con ngựa có bờm tóc bay (3 nét ngang), 4 vó chân (4 chấm) và cái đuôi cong.',
    relatedVocab: [
      { kanji: '馬', hiragana: 'うま (uma)', sinoVietnamese: 'MÃ', meaning: 'Con ngựa dũng mãnh', level: 'N4', breakdown: '馬 (Mã)', mnemonic: 'Hình dáng con ngựa có bờm dài, bốn chân phi nhanh như gió.' },
      { kanji: '乗馬', hiragana: 'じょうば (jōba)', sinoVietnamese: 'THỪA MÃ', meaning: 'Cưỡi ngựa thể thao', level: 'N2', breakdown: '乗 (Thừa) + 馬 (Mã)', mnemonic: 'Ngồi vững chãi trên lưng ngựa phi nước đại trên thảo nguyên.' },
      { kanji: '競馬', hiragana: 'けいば (keiba)', sinoVietnamese: 'CẠNH MÃ', meaning: 'Đua ngựa kịch tính', level: 'N2', breakdown: '競 (Cạnh) + 馬 (Mã)', mnemonic: 'Cuộc tranh tài tốc độ nghẹt thở giữa các chú ngựa chiến.' },
      { kanji: '駄目', hiragana: 'だめ (dame)', sinoVietnamese: 'ĐÀ MỤC', meaning: 'Không được, hỏng bét', level: 'N5', breakdown: '駄 (Đà - có 馬) + 目 (Mục)', mnemonic: 'Ngựa chở quá tải không thể bước tiếp đành chịu thua.' },
      { kanji: '駅', hiragana: 'えき (eki)', sinoVietnamese: 'DỊCH', meaning: 'Nhà ga tàu điện', level: 'N5', breakdown: '馬 (Mã) + 尺 (Xích)', mnemonic: 'Trạm dừng chân ngày xưa nơi đổi ngựa chạy thư tín.' },
      { kanji: '驚く', hiragana: 'おどろく (odoroku)', sinoVietnamese: 'KINH', meaning: 'Kinh ngạc, giật mình', level: 'N4', breakdown: '敬 (Kính) + 馬 (Mã)', mnemonic: 'Con ngựa hoảng hốt hí vang lồng lộn giật mình.' },
      { kanji: '騎手', hiragana: 'きしゅ (kishu)', sinoVietnamese: 'KỴ THỦ', meaning: 'Tay nài ngựa cừ khôi', level: 'N1', breakdown: '騎 (Kỵ - có 馬) + 手 (Thủ)', mnemonic: 'Vận động viên điều khiển ngựa đua tài ba điệu nghệ.' },
      { kanji: '騒ぐ', hiragana: 'さわぐ (sawagu)', sinoVietnamese: 'TAO', meaning: 'Làm ồn náo loạn', level: 'N4', breakdown: '馬 (Mã) + 蚤 (Tảo)', mnemonic: 'Ngựa bị bọ chét cắn lồng lộn hí vang gây náo loạn.' },
      { kanji: '駆ける', hiragana: 'かける (kakeru)', sinoVietnamese: 'KHU', meaning: 'Chạy phi nhanh, phi nước đại', level: 'N2', breakdown: '馬 (Mã) + 区 (Khu)', mnemonic: 'Chiến mã phi nước đại thần tốc qua các nẻo đường.' },
      { kanji: '駿馬', hiragana: 'しゅんば (shunba)', sinoVietnamese: 'TUẤN MÃ', meaning: 'Ngựa hay tuấn mã', level: 'N1', breakdown: '駿 (Tuấn) + 馬 (Mã)', mnemonic: 'Con tuấn mã phi ngàn dặm không biết mệt mỏi.' }
    ]
  },
  {
    stt: 188,
    strokeCount: 10,
    radical: '骨',
    name: 'Cốt',
    meaning: 'Xương cốt cơ thể',
    mnemonic: 'Phần khớp xương nối với nhau ở trên (冎) và phần thịt tủy (Nguyệt 月) ở dưới.',
    relatedVocab: [
      { kanji: '骨', hiragana: 'ほね (hone)', sinoVietnamese: 'CỐT', meaning: 'Khung xương cốt cơ thể', level: 'N3', breakdown: '骨 (Cốt)', mnemonic: 'Khung xương nâng đỡ các thớ thịt ⺼ tạo nên hình hài vững chắc.' },
      { kanji: '骨折', hiragana: 'こっせつ (kossetsu)', sinoVietnamese: 'CỐT CHIẾT', meaning: 'Gãy xương chấn thương', level: 'N2', breakdown: '骨 (Cốt) + 折 (Chiết - gãy)', mnemonic: 'Xương cốt bị rạn nứt gãy sau va đập mạnh.' },
      { kanji: '背骨', hiragana: 'せぼね (sebone)', sinoVietnamese: 'BỐI CỐT', meaning: 'Cột sống lưng rường cột', level: 'N2', breakdown: '背 (Bối - lưng) + 骨 (Cốt)', mnemonic: 'Trục xương sống vững chãi giữ thẳng lưng người.' },
      { kanji: '軟骨', hiragana: 'なんこつ (nankotsu)', sinoVietnamese: 'NHUYỄN CỐT', meaning: 'Sụn giòn ngọt', level: 'N1', breakdown: '軟 (Nhuyễn) + 骨 (Cốt)', mnemonic: 'Lớp sụn đàn hồi êm ái giữa các khớp xương.' },
      { kanji: '骨格', hiragana: 'こっかく (kokkaku)', sinoVietnamese: 'CỐT CÁCH', meaning: 'Bộ xương, khung sườn kết cấu', level: 'N1', breakdown: '骨 (Cốt) + 格 (Cách)', mnemonic: 'Khung sườn cốt lõi định hình nên toàn bộ cơ thể.' },
      { kanji: '骨髄', hiragana: 'こつずい (kotsuzui)', sinoVietnamese: 'CỐT TỦY', meaning: 'Tủy xương sinh máu', level: 'N1', breakdown: '骨 (Cốt) + 髄 (Tủy)', mnemonic: 'Tủy đỏ nằm sâu trong lòng ống xương sản sinh tế bào máu.' },
      { kanji: '白骨', hiragana: 'はっこつ (hakkotsu)', sinoVietnamese: 'BẠCH CỐT', meaning: 'Bộ xương trắng ngàn năm', level: 'N1', breakdown: '白 (Bạch) + 骨 (Cốt)', mnemonic: 'Hài cốt bạc màu thời gian còn mãi với đất mẹ.' },
      { kanji: '骸骨', hiragana: 'がいこつ (gaikotsu)', sinoVietnamese: 'HÀI CỐT', meaning: 'Bộ xương người tiêu bản', level: 'N1', breakdown: '骸 (Hài) + 骨 (Cốt)', mnemonic: 'Tiêu bản mô hình toàn bộ khung xương trong phòng thí nghiệm.' },
      { kanji: '気骨', hiragana: 'きこつ (kikotsu)', sinoVietnamese: 'KHÍ CỐT', meaning: 'Khí phách hiên ngang kiên cường', level: 'N1', breakdown: '気 (Khí) + 骨 (Cốt)', mnemonic: 'Khí phách cứng cỏi không bao giờ chịu khuất phục.' },
      { kanji: '骨肉', hiragana: 'こつにく (kotsuniku)', sinoVietnamese: 'CỐT NHỤC', meaning: 'Máu mủ ruột thịt tình thân', level: 'N1', breakdown: '骨 (Cốt) + 肉 (Nhục)', mnemonic: 'Tình ruột thịt sâu nặng như xương với thịt gắn liền.' }
    ]
  },
  {
    stt: 189,
    strokeCount: 10,
    radical: '高',
    name: 'Cao',
    meaning: 'Cao vút, đắt đỏ',
    mnemonic: 'Hình một tòa tháp hoặc cổng thành cao chọc trời có mái nhọn và hai tầng cửa (口).',
    relatedVocab: [
      { kanji: '高い', hiragana: 'たかい (takai)', sinoVietnamese: 'CAO', meaning: 'Cao ráo, đắt đỏ', level: 'N5', breakdown: '高 (Cao)', mnemonic: 'Tòa tháp canh cao ngút ngàn với cổng lớn và đài quan sát.' },
      { kanji: '高校', hiragana: 'こうこう (kōkō)', sinoVietnamese: 'CAO HIỆU', meaning: 'Trường cấp 3, trung học phổ thông', level: 'N5', breakdown: '高 (Cao) + 校 (Hiệu)', mnemonic: 'Bậc học phổ thông cao nhất trước ngưỡng cửa đại học.' },
      { kanji: '高校生', hiragana: 'こうこうせい (kōkōsei)', sinoVietnamese: 'CAO HIỆU SINH', meaning: 'Học sinh cấp 3 năng động', level: 'N5', breakdown: '高校 + 生 (Sinh)', mnemonic: 'Những cô cậu học trò tuổi thanh xuân hồn nhiên.' },
      { kanji: '最高', hiragana: 'さいこう (saikō)', sinoVietnamese: 'TỐI CAO', meaning: 'Tuyệt vời nhất, đỉnh cao tột bực', level: 'N3', breakdown: '最 (Tối) + 高 (Cao)', mnemonic: 'Chạm tới mức thang cao nhất không gì sánh bằng.' },
      { kanji: '高級', hiragana: 'こうきゅう (kōkyū)', sinoVietnamese: 'CAO CẤP', meaning: 'Cao cấp sang trọng', level: 'N3', breakdown: '高 (Cao) + 級 (Cấp)', mnemonic: 'Hàng hóa dịch vụ chất lượng hảo hạng bậc nhất.' },
      { kanji: '円高', hiragana: 'えんだか (endaka)', sinoVietnamese: 'VIÊN CAO', meaning: 'Đồng Yên tăng giá mạnh', level: 'N2', breakdown: '円 (Viên) + 高 (Cao)', mnemonic: 'Tỷ giá đồng Yên Nhật tăng vọt trên thị trường quốc tế.' },
      { kanji: '高層', hiragana: 'こうそう (kōsō)', sinoVietnamese: 'CAO TẦNG', meaning: 'Nhà chọc trời cao tầng', level: 'N2', breakdown: '高 (Cao) + 層 (Tầng)', mnemonic: 'Tòa nhà chọc trời sừng sững vươn lên mây xanh.' },
      { kanji: '標高', hiragana: 'ひょうこう (hyōkō)', sinoVietnamese: 'TIÊU CAO', meaning: 'Độ cao so với mực nước biển', level: 'N2', breakdown: '標 (Tiêu) + 高 (Cao)', mnemonic: 'Chỉ số chiều cao địa lý của một đỉnh núi.' },
      { kanji: '高尚', hiragana: 'こうしょう (kōshō)', sinoVietnamese: 'CAO THƯỢNG', meaning: 'Cao thượng tao nhã', level: 'N1', breakdown: '高 (Cao) + 尚 (Thượng)', mnemonic: 'Tâm hồn trong sáng vị tha hướng tới những điều cao quý.' },
      { kanji: '高嶺の花', hiragana: 'たかねのはな (takanenohana)', sinoVietnamese: 'CAO LĨNH HOA', meaning: 'Hoa trên đỉnh núi (người quá xa vời khó với tới)', level: 'N1', breakdown: '高嶺 (Cao lĩnh) + 花 (Hoa)', mnemonic: 'Bông hoa tuyệt mỹ trên đỉnh núi tuyết xa xôi không với tới.' }
    ]
  },
  {
    stt: 190,
    strokeCount: 10,
    radical: '髟',
    name: 'Bưu, tiêu',
    meaning: 'Tóc dài bồng bềnh',
    mnemonic: 'Mái tóc dài (Trường 長) được chải chuốt thành những lọn mượt mà (Sam 彡).',
    relatedVocab: [
      { kanji: '髪', hiragana: 'かみ (kami)', sinoVietnamese: 'PHÁT', meaning: 'Mái tóc bồng bềnh', level: 'N4', breakdown: '髟 (Tiêu) + 友 (Hữu)', mnemonic: 'Mái tóc mượt mà buông xõa ngang vai nâng niu.' },
      { kanji: '白髪', hiragana: 'しらが (shiraga)', sinoVietnamese: 'BẠCH PHÁT', meaning: 'Mái tóc bạc phơ theo năm tháng', level: 'N2', breakdown: '白 (Bạch) + 髪 (Phát - có 髟)', mnemonic: 'Mái tóc ngả màu sương gió bạc phơ của bậc cao niên.' },
      { kanji: '髭', hiragana: 'ひげ (hige)', sinoVietnamese: 'TÙ', meaning: 'Bộ râu mép, râu quai nón', level: 'N3', breakdown: '髟 (Tiêu) + 此', mnemonic: 'Hàng ria mép rậm rạp làm tăng vẻ nam tính phong độ.' },
      { kanji: '金髪', hiragana: 'きんぱつ (kinpatsu)', sinoVietnamese: 'KIM PHÁT', meaning: 'Mái tóc vàng óng ánh', level: 'N2', breakdown: '金 (Kim) + 髪 (Phát)', mnemonic: 'Mái tóc màu vàng óng ả tỏa sáng dưới ánh mặt trời.' },
      { kanji: '鬘', hiragana: 'かつら (katsura)', sinoVietnamese: 'MAN', meaning: 'Bộ tóc giả diễn viên', level: 'N1', breakdown: '髟 (Tiêu) + 曼', mnemonic: 'Bộ tóc giả tinh xảo cho diễn viên kịch Kabuki biểu diễn.' },
      { kanji: '長髪', hiragana: 'ちょうはつ (chōhatsu)', sinoVietnamese: 'TRƯỜNG PHÁT', meaning: 'Mái tóc dài thướt tha', level: 'N2', breakdown: '長 (Trường) + 髪 (Phát)', mnemonic: 'Mái tóc dài đen nhánh buông thõng dịu dàng.' },
      { kanji: '短髪', hiragana: 'たんぱつ (tanpatsu)', sinoVietnamese: 'ĐOẢN PHÁT', meaning: 'Mái tóc cắt ngắn cá tính', level: 'N2', breakdown: '短 (Đoản) + 髪 (Phát)', mnemonic: 'Kiểu tóc ngắn gọn gàng năng động mát mẻ.' },
      { kanji: '理髪', hiragana: 'りはつ (rihatsu)', sinoVietnamese: 'LÝ PHÁT', meaning: 'Nghề cắt tóc cắt tỉa gội sấy', level: 'N1', breakdown: '理 (Lý) + 髪 (Phát)', mnemonic: 'Tiệm cắt tóc chải chuốt làm đẹp cho mọi người.' },
      { kanji: '抜け毛', hiragana: 'ぬけげ (nukege)', sinoVietnamese: 'BẠT MAO', meaning: 'Tóc rụng', level: 'N2', breakdown: '抜 + 毛 (liên đới bộ 髟)', mnemonic: 'Tóc rụng theo chu kỳ sinh học cần bổ sung dưỡng chất.' },
      { kanji: '毛髪', hiragana: 'もうはつ (mōhatsu)', sinoVietnamese: 'MAO PHÁT', meaning: 'Lông tóc trên cơ thể', level: 'N1', breakdown: '毛 (Mao) + 髪 (Phát - có 髟)', mnemonic: 'Hệ thống lông và tóc bảo vệ bề mặt da đầu.' }
    ]
  },
  {
    stt: 191,
    strokeCount: 10,
    radical: '鬥',
    name: 'Đấu',
    meaning: 'Chống nhau, giao đấu tranh chấp',
    mnemonic: 'Hình hai người giơ tay đối mặt nhau chuẩn bị giao đấu phân tài cao thấp.',
    relatedVocab: [
      { kanji: '闘う', hiragana: 'たたかう (tatakau)', sinoVietnamese: 'ĐẤU', meaning: 'Chiến đấu kiên cường chống bệnh tật', level: 'N3', breakdown: '鬥 (Đấu) + 門', mnemonic: 'Hai dũng sĩ lao vào nhau quyết chiến giữ gìn chính nghĩa.' },
      { kanji: '戦闘', hiragana: 'せんとう (sentō)', sinoVietnamese: 'CHIẾN ĐẤU', meaning: 'Trận chiến đấu quyết liệt', level: 'N2', breakdown: '戦 (Chiến) + 闘 (Đấu - có 鬥)', mnemonic: 'Cuộc giao tranh nảy lửa trên chiến trường khốc liệt.' },
      { kanji: '格闘', hiragana: 'かくとう (kakutō)', sinoVietnamese: 'CÁCH ĐẤU', meaning: 'Đấu võ vật lộn tay không', level: 'N1', breakdown: '格 (Cách) + 闘 (Đấu)', mnemonic: 'Trận so tài quyền cước tay không giữa các võ sĩ.' },
      { kanji: '奮闘', hiragana: 'ふんとう (funtō)', sinoVietnamese: 'PHẤN ĐẤU', meaning: 'Phấn đấu nỗ lực hết mình', level: 'N2', breakdown: '奮 (Phấn) + 闘 (Đấu)', mnemonic: 'Dốc hết tâm trí và nghị lực vượt qua mọi rào cản.' },
      { kanji: '闘志', hiragana: 'とうし (tōshi)', sinoVietnamese: 'ĐẤU CHÍ', meaning: 'Ý chí chiến đấu bất khuất', level: 'N1', breakdown: '闘 (Đấu) + 志 (Chí)', mnemonic: 'Ngọn lửa quyết tâm rực cháy trong tim không hề run sợ.' },
      { kanji: '争闘', hiragana: 'そうとう (sōtō)', sinoVietnamese: 'TRANH ĐẤU', meaning: 'Tranh giành đấu đá quyền lực', level: 'N1', breakdown: '争 (Tranh) + 闘 (Đấu)', mnemonic: 'Xung đột xâu xé giành giật quyền lợi địa vị.' },
      { kanji: '闘牛', hiragana: 'とうぎゅう (tōgyū)', sinoVietnamese: 'ĐẤU NGƯU', meaning: 'Môn đấu bò tót Tây Ban Nha', level: 'N1', breakdown: '闘 (Đấu) + 牛 (Ngưu)', mnemonic: 'Vũ điệu dũng cảm của đấu sĩ đối đầu chú bò tót hung hãn.' },
      { kanji: '鬨', hiragana: 'とき (toki)', sinoVietnamese: 'HỐNG', meaning: 'Tiếng hò reo xung trận vang trời', level: 'N1', breakdown: '鬥 (Đấu) + 共 (Cộng)', mnemonic: 'Hàng vạn binh sĩ cùng đồng thanh reo hò xung phong.' },
      { kanji: '闘病', hiragana: 'とうびょう (tōbyō)', sinoVietnamese: 'ĐẤU BỆNH', meaning: 'Chiến đấu chống lại bệnh tật', level: 'N1', breakdown: '闘 (Đấu) + 病 (Bệnh)', mnemonic: 'Nghị lực kiên cường chiến thắng căn bệnh hiểm nghèo.' },
      { kanji: '闘争', hiragana: 'とうそう (tōsō)', sinoVietnamese: 'ĐẤU TRANH', meaning: 'Đấu tranh đòi quyền lợi', level: 'N1', breakdown: '闘 (Đấu) + 争 (Tranh)', mnemonic: 'Cuộc đấu tranh bền bỉ vì quyền lợi người lao động.' }
    ]
  },
  {
    stt: 192,
    strokeCount: 10,
    radical: '鬯',
    name: 'Sưởng',
    meaning: 'Rượu nếp thơm, bao đựng cung',
    mnemonic: 'Bát (凵) đựng gạo nếp (米) ủ thảo mộc, dùng cái muỗng (匕) múc rượu thơm ngát tế thần.',
    relatedVocab: [
      { kanji: '鬱', hiragana: 'うつ (utsu)', sinoVietnamese: 'ÚC', meaning: 'U uất, trầm cảm, rừng cây um tùm', level: 'N1', breakdown: 'Chứa bộ 鬯 ở giữa', mnemonic: 'Nỗi u uất sâu kín như hũ rượu cất giữ giữa rừng rậm um tùm.' },
      { kanji: '鬱病', hiragana: 'うつびょう (utsubyō)', sinoVietnamese: 'ÚC BỆNH', meaning: 'Bệnh trầm cảm tâm lý', level: 'N1', breakdown: '鬱 (Úc - có 鬯) + 病 (Bệnh)', mnemonic: 'Tâm trạng chìm trong u uất kéo dài cần điều trị tâm lý.' },
      { kanji: '陰鬱', hiragana: 'いんうつ (in\'utsu)', sinoVietnamese: 'ÂM ÚC', meaning: 'U ám, buồn bã ủ rũ', level: 'N1', breakdown: '陰 (Âm) + 鬱 (Úc)', mnemonic: 'Bầu trời ảm đạm phủ bóng đen lên tâm trạng.' },
      { kanji: '鬱憤', hiragana: 'うっぷん (uppun)', sinoVietnamese: 'ÚC PHẪN', meaning: 'Uất hận dồn nén trong lòng', level: 'N1', breakdown: '鬱 (Úc) + 憤 (Phẫn)', mnemonic: 'Cơn phẫn uất kìm nén lâu ngày chực chờ bùng nổ.' },
      { kanji: '憂鬱', hiragana: 'ゆううつ (yūutsu)', sinoVietnamese: 'ƯU ÚC', meaning: 'Buồn rầu phiền muộn', level: 'N2', breakdown: '憂 (Ưu) + 鬱 (Úc - có 鬯)', mnemonic: 'Tâm trạng nặng trĩu âu lo phiền muộn vì việc đời.' },
      { kanji: '鬱陶しい', hiragana: 'うっとうしい (uttōshii)', sinoVietnamese: 'ÚC ĐÀO', meaning: 'Bứt rứt, ngột ngạt khó chịu', level: 'N1', breakdown: '鬱 (Úc) + 陶', mnemonic: 'Thời tiết oi bức ngột ngạt làm lòng dạ bứt rứt.' },
      { kanji: '鬯酒', hiragana: 'ちょうしゅ (chōshu)', sinoVietnamese: 'SƯỞNG TỬU', meaning: 'Rượu nghệ thơm cúng tế trời đất', level: 'N1', breakdown: '鬯 (Sưởng) + 酒 (Tửu)', mnemonic: 'Hũ rượu quý dâng lên các vị thần linh ban phước lành.' },
      { kanji: '秬鬯', hiragana: 'きょちょう (kyochō)', sinoVietnamese: 'CỰ SƯỞNG', meaning: 'Rượu nấu từ kê đen thơm nức', level: 'N1', breakdown: '秬 (Kê đen) + 鬯 (Sưởng)', mnemonic: 'Thức uống hoàng gia cúng tế tổ tiên thời cổ đại.' },
      { kanji: '鬱蒼', hiragana: 'うっそう (ussō)', sinoVietnamese: 'ÚC THƯƠNG', meaning: 'Cây cối um tùm rậm rạp', level: 'N1', breakdown: '鬱 (Úc - có 鬯) + 蒼 (Thương)', mnemonic: 'Khu rừng nguyên sinh cây cối sum suê che khuất ánh mặt trời.' },
      { kanji: '鬱屈', hiragana: 'うっくつ (ukkutsu)', sinoVietnamese: 'ÚC KHUẤT', meaning: 'U uất tắc nghẽn tâm tư', level: 'N1', breakdown: '鬱 (Úc) + 屈 (Khuất)', mnemonic: 'Nỗi u uất đè nặng không cách nào giải tỏa được.' }
    ]
  },
  {
    stt: 193,
    strokeCount: 10,
    radical: '鬲',
    name: 'Cách',
    meaning: 'Cái đỉnh đồng ba chân',
    mnemonic: 'Chiếc nồi đồng cổ có miệng tròn ở trên (口) và ba cái chân rỗng bên dưới để đun bếp.',
    relatedVocab: [
      { kanji: '隔てる', hiragana: 'へだてる (hedateru)', sinoVietnamese: 'CÁCH', meaning: 'Ngăn cách, chia tách', level: 'N2', breakdown: '阝 (Phụ) + 鬲 (Cách)', mnemonic: 'Bức tường ngăn cách hai bên như vách nồi kiên cố.' },
      { kanji: '隔離', hiragana: 'かくり (kakuri)', sinoVietnamese: 'CÁCH LY', meaning: 'Cách ly y tế phòng dịch', level: 'N1', breakdown: '隔 (Cách - có 鬲) + 離 (Ly)', mnemonic: 'Tách biệt bệnh nhân để bảo vệ an toàn cho cộng đồng.' },
      { kanji: '隔週', hiragana: 'かくしゅう (kakushū)', sinoVietnamese: 'CÁCH CHU', meaning: 'Cách một tuần một lần', level: 'N2', breakdown: '隔 (Cách) + 週 (Chu)', mnemonic: 'Hoạt động diễn ra cách tuần đều đặn.' },
      { kanji: '隔月', hiragana: 'かくげつ (kakugetsu)', sinoVietnamese: 'CÁCH NGUYỆT', meaning: 'Cách một tháng một lần', level: 'N2', breakdown: '隔 (Cách) + 月 (Nguyệt)', mnemonic: 'Hai tháng một kỳ phát hành tạp chí.' },
      { kanji: '融和', hiragana: 'ゆうわ (yūwa)', sinoVietnamese: 'DUNG HÒA', meaning: 'Hòa nhập gắn kết', level: 'N1', breakdown: '融 (Dung - có 鬲) + 和 (Hòa)', mnemonic: 'Hòa tan vào nhau êm đẹp như nấu chung trong một nồi.' },
      { kanji: '融資', hiragana: 'ゆうし (yūshi)', sinoVietnamese: 'DUNG TƯ', meaning: 'Cấp vốn, cho vay vốn', level: 'N1', breakdown: '融 (Dung - có 鬲) + 資 (Tư)', mnemonic: 'Dòng vốn lưu thông nuôi dưỡng các dự án kinh tế.' },
      { kanji: '融通', hiragana: 'ゆうずう (yūzū)', sinoVietnamese: 'DUNG THÔNG', meaning: 'Linh hoạt uyển chuyển', level: 'N1', breakdown: '融 (Dung) + 通 (Thông)', mnemonic: 'Xử lý tình huống linh động không máy móc cứng nhắc.' },
      { kanji: '隔日', hiragana: 'かくじつ (kakujitsu)', sinoVietnamese: 'CÁCH NHẬT', meaning: 'Cách ngày một lần', level: 'N2', breakdown: '隔 (Cách) + 日 (Nhật)', mnemonic: 'Uống thuốc hoặc luyện tập cách một ngày một lần.' },
      { kanji: '隔たり', hiragana: 'へだたり (hedatari)', sinoVietnamese: 'CÁCH', meaning: 'Khoảng cách cách biệt', level: 'N2', breakdown: '隔 (Cách - có 鬲)', mnemonic: 'Khoảng cách ngăn cách thế hệ cần lắng nghe để thu hẹp.' },
      { kanji: '金融', hiragana: 'きんゆう (kin\'yū)', sinoVietnamese: 'KIM DUNG', meaning: 'Tài chính ngân hàng', level: 'N2', breakdown: '金 (Kim) + 融 (Dung - có 鬲)', mnemonic: 'Dòng chảy tiền tệ điều tiết toàn bộ nền kinh tế.' }
    ]
  },
  {
    stt: 194,
    strokeCount: 10,
    radical: '鬼',
    name: 'Quỷ',
    meaning: 'Con quỷ, ma quái',
    mnemonic: 'Hình người (儿) đội chiếc đầu to kì dị (田) có sừng trên đỉnh (丿) và cái đuôi (厶).',
    relatedVocab: [
      { kanji: '鬼', hiragana: 'おに (oni)', sinoVietnamese: 'QUỶ', meaning: 'Con quỷ có sừng, hung dữ', level: 'N3', breakdown: '鬼 (Quỷ)', mnemonic: 'Quái vật đầu to có sừng cầm chùy gai hung dữ.' },
      { kanji: '魅力', hiragana: 'みりょく (miryoku)', sinoVietnamese: 'MỊ LỰC', meaning: 'Sức quyến rũ mê hoặc', level: 'N3', breakdown: '魅 (Mị - có 鬼) + 力 (Lực)', mnemonic: 'Sức hút ma mị khó cưỡng làm say đắm lòng người.' },
      { kanji: '鬼ごっこ', hiragana: 'おにごっこ (onigokko)', sinoVietnamese: 'QUỶ', meaning: 'Trò chơi đuổi bắt trốn tìm', level: 'N3', breakdown: '鬼 (Quỷ) + ごっこ', mnemonic: 'Trò chơi con nít một người đóng quỷ đi bắt các bạn.' },
      { kanji: '吸血鬼', hiragana: 'きゅうけつき (kyūketsuki)', sinoVietnamese: 'HẤP HUYẾT QUỶ', meaning: 'Ma cà rồng hút máu', level: 'N2', breakdown: '吸血 (Hút máu) + 鬼 (Quỷ)', mnemonic: 'Quái vật bóng đêm chuyên đi hút máu người.' },
      { kanji: '魂', hiragana: 'たましい (tamashii)', sinoVietnamese: 'HỒN', meaning: 'Linh hồn bất diệt', level: 'N2', breakdown: '云 + 鬼 (Quỷ)', mnemonic: 'Linh hồn thanh cao bay lượn trên mây ngàn.' },
      { kanji: '魔術', hiragana: 'まじゅつ (majutsu)', sinoVietnamese: 'MA THUẬT', meaning: 'Ảo thuật, phép thuật ma quái', level: 'N2', breakdown: '魔 (Ma - có 鬼) + 術 (Thuật)', mnemonic: 'Phép thuật biến hóa khôn lường đầy kỳ ảo.' },
      { kanji: '邪魔', hiragana: 'じゃま (jama)', sinoVietnamese: 'TÀ MA', meaning: 'Quấy rầy, cản trở', level: 'N4', breakdown: '邪 (Tà) + 魔 (Ma - có 鬼)', mnemonic: 'Tà ma cản lối làm phiền toái công việc người khác.' },
      { kanji: '悪魔', hiragana: 'あくま (akuma)', sinoVietnamese: 'ÁC MA', meaning: 'Ác quỷ tàn ác', level: 'N2', breakdown: '悪 (Ác) + 魔 (Ma - có 鬼)', mnemonic: 'Kẻ đại diện cho thế lực bóng tối tàn bạo độc ác.' },
      { kanji: '鬼才', hiragana: 'きさい (kisai)', sinoVietnamese: 'QUỶ TÀI', meaning: 'Tài năng xuất quỷ nhập thần', level: 'N1', breakdown: '鬼 (Quỷ) + 才 (Tài)', mnemonic: 'Thiên tài có tư duy xuất chúng vượt xa người phàm.' },
      { kanji: '気迫', hiragana: 'きはく (kihaku)', sinoVietnamese: 'KHÍ PHÁCH', meaning: 'Khí thế áp đảo dũng mãnh', level: 'N1', breakdown: 'Chứa gốc chữ 魄 (có 鬼)', mnemonic: 'Khí phách ngút trời làm đối thủ kinh hồn bạt vía.' }
    ]
  },
  // Nhóm 11 nét (Bộ 195 – 200)
  {
    stt: 195,
    strokeCount: 11,
    radical: '魚',
    name: 'Ngư',
    meaning: 'Con cá bơi dưới nước',
    mnemonic: 'Hình con cá có đầu nhọn (⺈), thân có vảy như ô ruộng (田) và vây đuôi xòe ra (灬).',
    relatedVocab: [
      { kanji: '魚', hiragana: 'さかな (sakana) / うお (uo)', sinoVietnamese: 'NGƯ', meaning: 'Con cá bơi lội', level: 'N5', breakdown: '魚 (Ngư)', mnemonic: 'Đầu cá, vảy cá và chiếc đuôi vẫy bơi tung tăng dưới làn nước.' },
      { kanji: '金魚', hiragana: 'きんぎょ (kingyo)', sinoVietnamese: 'KIM NGƯ', meaning: 'Cá vàng cảnh tung tăng', level: 'N4', breakdown: '金 (Kim) + 魚 (Ngư)', mnemonic: 'Chú cá vàng óng ả bơi lội trong bể kính trong veo.' },
      { kanji: '魚屋', hiragana: 'さかなや (sakanaya)', sinoVietnamese: 'NGƯ ỐC', meaning: 'Cửa hàng bán hải sản tươi sống', level: 'N5', breakdown: '魚 (Ngư) + 屋 (Ốc)', mnemonic: 'Sạp hàng bày bán cá tôm tươi ngon vừa cập bến.' },
      { kanji: '漁業', hiragana: 'ぎょぎょう (gyogyō)', sinoVietnamese: 'NGƯ NGHIỆP', meaning: 'Nghề đánh bắt hải sản', level: 'N3', breakdown: '漁 (Ngư) + 業 (Nghiệp)', mnemonic: 'Ngư dân ra khơi đánh bắt cá tôm nuôi sống gia đình.' },
      { kanji: '鮮魚', hiragana: 'せんぎょ (sengyo)', sinoVietnamese: 'TIÊN NGƯ', meaning: 'Cá tươi ngon vừa bắt', level: 'N2', breakdown: '鮮 (Tiên) + 魚 (Ngư)', mnemonic: 'Những mẻ cá tươi rói chuẩn bị cho món sashimi.' },
      { kanji: '鮭', hiragana: 'さけ (sake)', sinoVietnamese: 'KHUÊ', meaning: 'Cá hồi cam ngọt bùi', level: 'N3', breakdown: '魚 (Ngư) + 圭 (Khuê)', mnemonic: 'Loài cá hồi vượt thác sinh sản thịt cam béo ngậy.' },
      { kanji: '鯨', hiragana: 'くじら (kujira)', sinoVietnamese: 'KÌNH', meaning: 'Cá voi khổng lồ đại dương', level: 'N2', breakdown: '魚 (Ngư) + 京 (Kinh)', mnemonic: 'Loài sinh vật biển to lớn như tòa nhà kinh đô.' },
      { kanji: '鯛', hiragana: 'たい (tai)', sinoVietnamese: 'ĐIÊU', meaning: 'Cá tráp biển mang lại may mắn', level: 'N2', breakdown: '魚 (Ngư) + 周 (Chu)', mnemonic: 'Cá tráp đỏ món ăn may mắn trong các bữa tiệc mừng của người Nhật.' },
      { kanji: '鮪', hiragana: 'まぐろ (maguro)', sinoVietnamese: 'VỊ', meaning: 'Cá ngừ đại dương hảo hạng', level: 'N2', breakdown: '魚 (Ngư) + 有 (Hữu)', mnemonic: 'Cá ngừ béo ngậy món sushi được ưa chuộng nhất.' },
      { kanji: '人魚', hiragana: 'にんぎょ (ningyo)', sinoVietnamese: 'NHÂN NGƯ', meaning: 'Nàng tiên cá trong cổ tích', level: 'N2', breakdown: '人 (Nhân) + 魚 (Ngư)', mnemonic: 'Nàng tiên cá xinh đẹp với chiếc đuôi cá vẫy lượn dưới biển sâu.' }
    ]
  },
  {
    stt: 196,
    strokeCount: 11,
    radical: '鳥',
    name: 'Điểu',
    meaning: 'Con chim hót',
    mnemonic: 'Tương tự chữ Mã nhưng có cái mào trên đầu, thân lông vũ và 4 ngón chân (灬).',
    relatedVocab: [
      { kanji: '鳥', hiragana: 'とり (tori)', sinoVietnamese: 'ĐIỂU', meaning: 'Con chim, gia cầm', level: 'N5', breakdown: '鳥 (Điểu)', mnemonic: 'Con chim có mắt tròn, mỏ nhọn và đuôi dài đậu trên cành.' },
      { kanji: '小鳥', hiragana: 'ことり (kotori)', sinoVietnamese: 'TIỂU ĐIỂU', meaning: 'Chú chim non ríu rít', level: 'N5', breakdown: '小 (Tiểu) + 鳥 (Điểu)', mnemonic: 'Chim non hót líu lo chào đón bình minh sớm.' },
      { kanji: '白鳥', hiragana: 'はくちょう (hakuchō)', sinoVietnamese: 'BẠCH ĐIỂU', meaning: 'Thiên nga trắng thanh tao', level: 'N2', breakdown: '白 (Bạch) + 鳥 (Điểu)', mnemonic: 'Chim thiên nga với bộ lông trắng muốt bơi trên mặt hồ êm đềm.' },
      { kanji: '鳴く', hiragana: 'なく (naku)', sinoVietnamese: 'MINH', meaning: 'Chim hót líu lo, thú kêu', level: 'N4', breakdown: '口 (Khẩu) + 鳥 (Điểu)', mnemonic: 'Chú chim mở rộng chiếc mỏ cất tiếng hót véo von.' },
      { kanji: '焼鳥', hiragana: 'やきとり (yakitori)', sinoVietnamese: 'THIÊU ĐIỂU', meaning: 'Thịt gà xiên nướng thơm lừng', level: 'N4', breakdown: '焼 (Thiêu) + 鳥 (Điểu)', mnemonic: 'Món gà nướng xiên que nức mũi nhậu cùng bia lạnh.' },
      { kanji: '野鳥', hiragana: 'やちょう (yachō)', sinoVietnamese: 'DÃ ĐIỂU', meaning: 'Chim hoang dã thiên nhiên', level: 'N2', breakdown: '野 (Dã) + 鳥 (Điểu)', mnemonic: 'Các loài chim tự do bay lượn giữa núi rừng hoang sơ.' },
      { kanji: '鳩', hiragana: 'はと (hato)', sinoVietnamese: 'CÂU', meaning: 'Chim bồ câu hòa bình', level: 'N2', breakdown: '九 (Cửu) + 鳥 (Điểu)', mnemonic: 'Cánh chim bồ câu trắng mang thông điệp hòa bình nhân loại.' },
      { kanji: '鴨', hiragana: 'かも (kamo)', sinoVietnamese: 'ÁP', meaning: 'Con vịt trời bơi lội', level: 'N2', breakdown: '甲 (Giáp) + 鳥 (Điểu)', mnemonic: 'Đàn vịt trời rẽ nước bơi lặn kiếm mồi bên đầm sen.' },
      { kanji: '鶴', hiragana: 'つる (tsuru)', sinoVietnamese: 'HẠC', meaning: 'Chim hạc trắng trường thọ', level: 'N2', breakdown: '隺 + 鳥 (Điểu)', mnemonic: 'Biểu tượng sống lâu trường thọ trong văn hóa Á Đông.' },
      { kanji: '烏', hiragana: 'からす (karasu)', sinoVietnamese: 'Ô', meaning: 'Con quạ đen thông minh', level: 'N2', breakdown: 'Biến thể từ chữ 鳥 (mắt đen tuyền)', mnemonic: 'Con quạ lông đen nhánh kêu quạ quạ trên ngọn cây cao.' }
    ]
  },
  {
    stt: 197,
    strokeCount: 11,
    radical: '鹵',
    name: 'Lỗ',
    meaning: 'Đất mặn, đồng muối',
    mnemonic: 'Cái túi hoặc ruộng muối (囗) bên trong có những hạt muối kết tinh (4 dấu chấm).',
    relatedVocab: [
      { kanji: '鹵獲', hiragana: 'ろかく (rokaku)', sinoVietnamese: 'LỖ HOẠCH', meaning: 'Tịch thu, thu gom chiến lợi phẩm', level: 'N1', breakdown: '鹵 (Lỗ) + 獲 (Hoạch)', mnemonic: 'Tịch thu toàn bộ muối và chiến lợi phẩm của đối phương.' },
      { kanji: '塩分', hiragana: 'えんぶん (enbun)', sinoVietnamese: 'DIÊM PHÂN', meaning: 'Độ mặn hàm lượng muối', level: 'N2', breakdown: 'Chứa gốc nghĩa đất mặn 鹵', mnemonic: 'Hàm lượng muối mặn cần kiểm soát trong khẩu phần ăn.' },
      { kanji: '鹹水', hiragana: 'かんすい (kansui)', sinoVietnamese: 'HÀM THỦY', meaning: 'Nước muối kiềm làm mì ramen', level: 'N1', breakdown: '鹹 (Hàm - chứa 鹵) + 水 (Thủy)', mnemonic: 'Nước khoáng mặn tạo độ dai giòn vàng óng cho sợi mì ramen.' },
      { kanji: '鹵莽', hiragana: 'ろもう (romō)', sinoVietnamese: 'LỖ MÃNG', meaning: 'Hấp tấp, cẩu thả sơ sài', level: 'N1', breakdown: '鹵 (Lỗ) + 莽 (Mãng)', mnemonic: 'Làm việc hấp tấp cẩu thả làm hỏng việc lớn.' },
      { kanji: '岩塩', hiragana: 'がんえん (gan\'en)', sinoVietnamese: 'NHAM DIÊM', meaning: 'Muối mỏ đá tự nhiên', level: 'N1', breakdown: '岩 (Nham) + 塩 (Diêm - chứa 鹵)', mnemonic: 'Muối kết tinh thành khối đá sâu trong lòng núi.' },
      { kanji: '粗塩', hiragana: 'あらじお (arajio)', sinoVietnamese: 'THÔ DIÊM', meaning: 'Muối hạt thô nguyên chất', level: 'N2', breakdown: '粗 (Thô) + 塩 (Diêm)', mnemonic: 'Muối hạt to phơi từ nước biển giữ trọn vị đậm đà.' },
      { kanji: '塩害', hiragana: 'えんがい (engai)', sinoVietnamese: 'DIÊM HẠI', meaning: 'Nhiễm mặn, gió muối làm rỉ sét', level: 'N1', breakdown: '塩 (Diêm) + 害 (Hại)', mnemonic: 'Gió biển mặn làm hoen rỉ xe cộ và công trình ven biển.' },
      { kanji: '製塩', hiragana: 'せいえん (seien)', sinoVietnamese: 'CHẾ DIÊM', meaning: 'Nghề làm muối thủ công', level: 'N1', breakdown: '製 (Chế) + 塩 (Diêm)', mnemonic: 'Nghề phơi nước biển trên đồng muối lấy hạt ngọc trắng.' },
      { kanji: '食塩', hiragana: 'しょくえん (shokuen)', sinoVietnamese: 'THỰC DIÊM', meaning: 'Muối ăn tinh khiết', level: 'N3', breakdown: '食 (Thực) + 塩 (Diêm)', mnemonic: 'Muối ăn gia vị thiết yếu trong mọi bữa cơm gia đình.' },
      { kanji: '減塩', hiragana: 'げんえん (gen\'en)', sinoVietnamese: 'GIẢM DIÊM', meaning: 'Giảm lượng muối bảo vệ tim mạch', level: 'N2', breakdown: '減 (Giảm) + 塩 (Diêm)', mnemonic: 'Chế độ ăn nhạt giảm muối bảo vệ huyết áp an toàn.' }
    ]
  },
  {
    stt: 198,
    strokeCount: 11,
    radical: '鹿',
    name: 'Lộc',
    meaning: 'Con hươu, con nai',
    mnemonic: 'Con thú có cặp sừng nhánh trên đầu (广), thân có đốm và đôi chân thon dài (比) chạy thoăn thoắt.',
    relatedVocab: [
      { kanji: '鹿', hiragana: 'しか (shika)', sinoVietnamese: 'LỘC', meaning: 'Con hươu sao hiền lành', level: 'N3', breakdown: '鹿 (Lộc)', mnemonic: 'Chú hươu có đôi gạc sừng xòe rộng và đôi chân chạy nhanh.' },
      { kanji: '馬鹿', hiragana: 'ばか (baka)', sinoVietnamese: 'MÃ LỘC', meaning: 'Ngốc nghếch, ngớ ngẩn (chỉ hươu bảo ngựa)', level: 'N5', breakdown: '馬 (Mã) + 鹿 (Lộc)', mnemonic: 'Điển tích Triệu Cao chỉ hươu bảo ngựa lừa dối quân thần.' },
      { kanji: '鹿児島', hiragana: 'かごしま (kagoshima)', sinoVietnamese: 'LỘC NHI ĐẢO', meaning: 'Tỉnh Kagoshima miền nam Nhật Bản', level: 'N3', breakdown: '鹿 (Lộc) + 児 (Nhi) + 島 (Đảo)', mnemonic: 'Vùng đất trù phú với thiên nhiên núi lửa hùng vĩ.' },
      { kanji: '鹿肉', hiragana: 'しかにく (shikaniku)', sinoVietnamese: 'LỘC NHỤC', meaning: 'Thịt hươu, thịt nai bổ dưỡng', level: 'N2', breakdown: '鹿 (Lộc) + 肉 (Nhục)', mnemonic: 'Thịt thú rừng thơm ngọt giàu dinh dưỡng.' },
      { kanji: '鹿革', hiragana: 'しかがわ (shikagawa)', sinoVietnamese: 'LỘC CÁCH', meaning: 'Da hươu mềm mịn làm găng tay', level: 'N1', breakdown: '鹿 (Lộc) + 革 (Cách)', mnemonic: 'Chất liệu da hươu dẻo dai chống trầy xước thượng hạng.' },
      { kanji: '鹿角', hiragana: 'ろっかく (rokkaku) / しかづの', sinoVietnamese: 'LỘC GIÁC', meaning: 'Gạc nai nhung hươu quý hiếm', level: 'N1', breakdown: '鹿 (Lộc) + 角 (Giác)', mnemonic: 'Đôi sừng hươu quý làm vị thuốc bổ thượng hạng trong đông y.' },
      { kanji: '迷鹿', hiragana: 'めいろく (meiroku)', sinoVietnamese: 'MÊ LỘC', meaning: 'Hươu lạc lối trong rừng', level: 'N1', breakdown: '迷 (Mê) + 鹿 (Lộc)', mnemonic: 'Chú hươu con ngơ ngác lạc bước giữa rừng sâu.' },
      { kanji: '麗しい', hiragana: 'うるわしい (uruwashii)', sinoVietnamese: 'LỆ', meaning: 'Diễm lệ tuyệt mỹ', level: 'N1', breakdown: 'Chứa bộ 鹿 trong 麗', mnemonic: 'Vẻ đẹp kiều diễm tuyệt trần như dáng hươu sao.' },
      { kanji: '塵', hiragana: 'ごみ (gomi) / ちり (chiri)', sinoVietnamese: 'TRẦN', meaning: 'Bụi trần, rác rưởi', level: 'N2', breakdown: '鹿 (Lộc) + 土 (Thổ)', mnemonic: 'Đàn hươu chạy qua tung bụi đất mù mịt cả bầu trời.' },
      { kanji: '小鹿', hiragana: 'こじか (kojika)', sinoVietnamese: 'TIỂU LỘC', meaning: 'Chú hươu con Bambi ngây thơ', level: 'N3', breakdown: '小 (Tiểu) + 鹿 (Lộc)', mnemonic: 'Chú nai con ngơ ngác sải những bước chân đầu đời.' }
    ]
  },
  {
    stt: 199,
    strokeCount: 11,
    radical: '麥',
    variants: ['麦'],
    name: 'Mạch',
    meaning: 'Lúa mạch, yến mạch',
    mnemonic: 'Cây lúa (来) mọc từ trên nương được mang về với bước chân chậm rãi (夊).',
    relatedVocab: [
      { kanji: '麦', hiragana: 'むぎ (mugi)', sinoVietnamese: 'MẠCH', meaning: 'Cây lúa mạch, lúa mì', level: 'N3', breakdown: '麦 (Mạch)', mnemonic: 'Cây lúa mạch có râu dài trĩu hạt đón bước chân người đi.' },
      { kanji: '小麦', hiragana: 'こむぎ (komugi)', sinoVietnamese: 'TIỂU MẠCH', meaning: 'Cây lúa mì xay bột', level: 'N2', breakdown: '小 (Tiểu) + 麦 (Mạch)', mnemonic: 'Hạt lúa mì nguyên liệu xay thành bột mì làm bánh nướng.' },
      { kanji: '小麦粉', hiragana: 'こむぎこ (komugiko)', sinoVietnamese: 'TIỂU MẠCH PHẤN', meaning: 'Bột mì làm bánh', level: 'N3', breakdown: '小麦 + 粉 (Phấn)', mnemonic: 'Bột mì trắng mịn làm bánh mì ramen tempura giòn rụm.' },
      { kanji: '麦茶', hiragana: 'むぎちゃ (mugicha)', sinoVietnamese: 'MẠCH TRÀ', meaning: 'Trà lúa mạch thanh nhiệt ngày hè', level: 'N3', breakdown: '麦 (Mạch) + 茶 (Trà)', mnemonic: 'Thức uống giải nhiệt ngọt bùi thơm lừng mùa hè nước Nhật.' },
      { kanji: '大麦', hiragana: 'おおむぎ (ōmugi)', sinoVietnamese: 'ĐẠI MẠCH', meaning: 'Đại mạch nấu bia', level: 'N2', breakdown: '大 (Đại) + 麦 (Mạch)', mnemonic: 'Hạt đại mạch ủ men nấu bia và cháo bổ dưỡng.' },
      { kanji: '麦酒', hiragana: 'ばくしゅ (bakushu) / ビール', sinoVietnamese: 'MẠCH TỬU', meaning: 'Rượu bia lúa mạch mát lạnh', level: 'N2', breakdown: '麦 (Mạch) + 酒 (Tửu)', mnemonic: 'Bia vàng sủi bọt nấu từ mầm lúa mạch lên men hảo hạng.' },
      { kanji: '麦畑', hiragana: 'むぎばたけ (mugibatake)', sinoVietnamese: 'MẠCH HẠC', meaning: 'Cánh đồng lúa mì vàng óng', level: 'N2', breakdown: '麦 (Mạch) + 畑 (Hạc - nương rẫy)', mnemonic: 'Cánh đồng lúa mì chín vàng rực dập dờn trong nắng chiều.' },
      { kanji: 'ライ麦', hiragana: 'らいむぎ (raimugi)', sinoVietnamese: 'MẠCH', meaning: 'Lúa mạch đen làm bánh mì lứt', level: 'N2', breakdown: 'ライ + 麦 (Mạch)', mnemonic: 'Nguyên liệu làm bánh mì đen dinh dưỡng phong cách Bắc Âu.' },
      { kanji: '麦芽', hiragana: 'ばくが (bakuga)', sinoVietnamese: 'MẠCH NHA', meaning: 'Mầm lúa mạch, mạch nha ngọt ngào', level: 'N1', breakdown: '麦 (Mạch) + 芽 (Nha - mầm)', mnemonic: 'Mầm lúa mạch ủ ngọt làm kẹo mạch nha dẻo quánh.' },
      { kanji: '麦わら帽子', hiragana: 'むぎわらぼうし', sinoVietnamese: 'MẠCH MÃO TỬ', meaning: 'Chiếc mũ rơm che nắng của Luffy', level: 'N3', breakdown: '麦わら (Rơm lúa mì) + 帽子', mnemonic: 'Chiếc mũ đan bằng cọng rơm lúa mì che mát ngày hè rực rỡ.' }
    ]
  },
  {
    stt: 200,
    strokeCount: 11,
    radical: '麻',
    name: 'Ma',
    meaning: 'Cây gai, tơ sợi gai',
    mnemonic: 'Hai bó cây gai (Lâm 林) được mang về phơi dưới mái hiên nhà (Nghiễm 广) để tước sợi dệt áo.',
    relatedVocab: [
      { kanji: '麻', hiragana: 'あさ (asa)', sinoVietnamese: 'MA', meaning: 'Cây gai dầu, vải lanh gai', level: 'N2', breakdown: '广 (Quảng - mái nhà) + 林 (hai cây gai hong khô)', mnemonic: 'Phơi những bó cây gai dầu dưới mái hiên để tách sợi dệt áo.' },
      { kanji: '麻酔', hiragana: 'ますい (masui)', sinoVietnamese: 'MA TÚY', meaning: 'Thuốc gây tê, gây mê phẫu thuật', level: 'N2', breakdown: '麻 (Ma) + 酔 (Túy - say)', mnemonic: 'Làm tê liệt cảm giác đau đớn khi bác sĩ mổ phẫu thuật.' },
      { kanji: '麻痺', hiragana: 'まひ (mahi)', sinoVietnamese: 'MA TÝ', meaning: 'Tê liệt, mất cảm giác', level: 'N1', breakdown: '麻 (Ma) + 痺 (Tý - tê)', mnemonic: 'Tay chân tê dại không cử động được sau đột quỵ.' },
      { kanji: '麻薬', hiragana: 'まやく (mayaku)', sinoVietnamese: 'MA DƯỢC', meaning: 'Chất ma túy cấm', level: 'N2', breakdown: '麻 (Ma) + 薬 (Dược)', mnemonic: 'Chất kích thích gây nghiện độc hại pháp luật nghiêm cấm.' },
      { kanji: '麻婆豆腐', hiragana: 'まーぼーどうふ (mābōdōfu)', sinoVietnamese: 'MA BÀ ĐẬU HŨ', meaning: 'Món đậu phụ sốt cay Tứ Xuyên', level: 'N3', breakdown: '麻 + 婆 + 豆腐', mnemonic: 'Món đậu phụ sốt ớt cay tê nồng nức danh của bà Ma.' },
      { kanji: '麻布', hiragana: 'あさぬの (asanuno)', sinoVietnamese: 'MA BỐ', meaning: 'Vải bố gai dầu thoáng mát', level: 'N2', breakdown: '麻 (Ma) + 布 (Bố - vải)', mnemonic: 'Tấm vải dệt từ sợi gai thoáng khí thấm hút mồ hôi ngày hè.' },
      { kanji: '麻袋', hiragana: 'あさぶくろ (asabukuro)', sinoVietnamese: 'MA ĐẠI', meaning: 'Bao tải gai đựng cà phê', level: 'N2', breakdown: '麻 (Ma) + 袋 (Đại - túi)', mnemonic: 'Bao tải bền chắc chuyên dùng đựng hạt cà phê xuất khẩu.' },
      { kanji: '摩天楼', hiragana: 'まてんろう (matenrō)', sinoVietnamese: 'MA THIÊN LÂU', meaning: 'Tòa nhà chọc trời sừng sững', level: 'N1', breakdown: '摩 (có bộ 麻) + 天 (Thiên) + 楼 (Lâu)', mnemonic: 'Tòa tháp cao chạm tới mây trời thủ đô.' },
      { kanji: '蕁麻疹', hiragana: 'じんましん (jinmashin)', sinoVietnamese: 'TẦM MA CHẨN', meaning: 'Bệnh nổi mề đay ngứa ngáy', level: 'N1', breakdown: '蕁 + 麻 (Ma) + 疹', mnemonic: 'Dị ứng nổi mẩn đỏ ngứa rát như chạm phải lá cây gai dại.' },
      { kanji: '麻糸', hiragana: 'あさいと (asaito)', sinoVietnamese: 'MA MỊCH', meaning: 'Sợi chỉ gai bền chắc', level: 'N2', breakdown: '麻 (Ma) + 糸 (Mịch)', mnemonic: 'Cuộn chỉ bện từ xơ gai bền dai khâu vá giày dép.' }
    ]
  },
  // Nhóm 12 nét (Bộ 201 – 204)
  {
    stt: 201,
    strokeCount: 12,
    radical: '黃',
    variants: ['黄'],
    name: 'Hoàng',
    meaning: 'Màu vàng óng',
    mnemonic: 'Cánh đồng ruộng (Điền 田) mùa lúa chín rực một màu vàng óng ả ấm no.',
    relatedVocab: [
      { kanji: '黄色', hiragana: 'きいろ (kiiro)', sinoVietnamese: 'HOÀNG SẮC', meaning: 'Màu vàng tươi sáng', level: 'N5', breakdown: '黄 (Hoàng) + 色 (Sắc)', mnemonic: 'Sắc vàng ấm áp của ánh nắng mùa thu rọi trên đồng lúa.' },
      { kanji: '黄色い', hiragana: 'きいろい (kiiroi)', sinoVietnamese: 'HOÀNG', meaning: 'Có màu vàng', level: 'N5', breakdown: '黄 (Hoàng)', mnemonic: 'Đóa hoa cúc vàng rực rỡ đón gió heo may.' },
      { kanji: '黄身', hiragana: 'きみ (kimi)', sinoVietnamese: 'HOÀNG THÂN', meaning: 'Lòng đỏ trứng gà béo ngậy', level: 'N3', breakdown: '黄 (Hoàng) + 身 (Thân)', mnemonic: 'Phần lòng đỏ thơm ngon giàu dinh dưỡng trong quả trứng.' },
      { kanji: '黄金', hiragana: 'おうごん (ōgon) / こがね', sinoVietnamese: 'HOÀNG KIM', meaning: 'Vàng ròng, thời hoàng kim thịnh vượng', level: 'N2', breakdown: '黄 (Hoàng) + 金 (Kim)', mnemonic: 'Thứ kim loại quý hiếm ánh vàng rực rỡ vô giá.' },
      { kanji: '黄昏', hiragana: 'たそがれ (tasogare) / こうこん', sinoVietnamese: 'HOÀNG HÔN', meaning: 'Hoàng hôn buông xuống, chập choạng tối', level: 'N1', breakdown: '黄 (Hoàng) + 昏 (Hôn)', mnemonic: 'Ánh nắng vàng nhạt dần nhường chỗ cho màn đêm buông xuống.' },
      { kanji: '黄砂', hiragana: 'こうさ (kōsa)', sinoVietnamese: 'HOÀNG SA', meaning: 'Cát vàng sa mạc bay trong gió', level: 'N2', breakdown: '黄 (Hoàng) + 砂 (Sa)', mnemonic: 'Hiện tượng bão bụi cát vàng từ sa mạc bay sang bầu trời Nhật Bản.' },
      { kanji: '黄泉', hiragana: 'よみ (yomi) / こうせん', sinoVietnamese: 'HOÀNG TUYỀN', meaning: 'Suối vàng, cõi âm vĩnh hằng', level: 'N1', breakdown: '黄 (Hoàng) + 泉 (Tuyền)', mnemonic: 'Dòng suối nơi chín suối thế giới của người đã khuất.' },
      { kanji: '卵黄', hiragana: 'らんおう (ran\'ō)', sinoVietnamese: 'NOÃN HOÀNG', meaning: 'Lòng đỏ trứng (thuật ngữ khoa học)', level: 'N1', breakdown: '卵 (Noãn) + 黄 (Hoàng)', mnemonic: 'Phần lòng đỏ của phôi trứng gia cầm.' },
      { kanji: '黄熱病', hiragana: 'おうねつびょう (ōnetsubyō)', sinoVietnamese: 'HOÀNG NHIỆT BỆNH', meaning: 'Bệnh sốt vàng da truyền nhiễm', level: 'N1', breakdown: '黄 (Hoàng) + 熱 (Nhiệt) + 病 (Bệnh)', mnemonic: 'Bệnh truyền nhiễm do muỗi làm da chuyển sang sắc vàng.' },
      { kanji: '黄葉', hiragana: 'こうよう (kōyō) / もみじ', sinoVietnamese: 'HOÀNG DIỆP', meaning: 'Lá cây chuyển sang màu vàng thu', level: 'N2', breakdown: '黄 (Hoàng) + 葉 (Diệp)', mnemonic: 'Rừng cây thay áo vàng rực rỡ đón mùa thu sang.' }
    ]
  },
  {
    stt: 202,
    strokeCount: 12,
    radical: '黍',
    name: 'Thử',
    meaning: 'Lúa nếp dẻo',
    mnemonic: 'Cây lúa (Hòa 禾) dùng để nấu với nước (Thủy 水) tạo thành rượu hoặc xôi nếp dẻo quánh.',
    relatedVocab: [
      { kanji: '黍', hiragana: 'きび (kibi)', sinoVietnamese: 'THỬ', meaning: 'Cây kê hạt dẻo làm bánh', level: 'N2', breakdown: '禾 (Hòa) + 氺 (nước dẻo quánh)', mnemonic: 'Giống ngũ cốc hạt tròn dẻo quánh nấu xôi làm bánh.' },
      { kanji: '黍団子', hiragana: 'きびだんご (kibidango)', sinoVietnamese: 'THỬ ĐOÀN TỬ', meaning: 'Bánh kê Momotaro thuần phục thú', level: 'N2', breakdown: '黍 (Thử) + 団子 (Bánh nếp dango)', mnemonic: 'Bánh dango bột kê cậu bé Momotaro chia cho chó khỉ trĩ cùng đi diệt quỷ.' },
      { kanji: '黎明', hiragana: 'れいめい (reimei)', sinoVietnamese: 'LÊ MINH', meaning: 'Rạng đông, bình minh thời đại mới', level: 'N1', breakdown: '黎 (Lê - chứa 黍) + 明 (Minh)', mnemonic: 'Khoảnh khắc ánh bình minh rạng rỡ xua tan bóng tối.' },
      { kanji: '黏土', hiragana: 'ねんど (nendo)', sinoVietnamese: 'NIÊM THỔ', meaning: 'Đất sét nặn đồ gốm', level: 'N2', breakdown: '黏 (Niêm - có 黍) + 土 (Thổ)', mnemonic: 'Đất sét dẻo quánh như bột kê dùng để nhào nặn tượng gốm.' },
      { kanji: '黏膜', hiragana: 'ねんまく (nenmaku)', sinoVietnamese: 'NIÊM MẠC', meaning: 'Lớp niêm mạc ẩm bảo vệ', level: 'N1', breakdown: '黏 (Niêm - có 黍) + 膜 (Mạc)', mnemonic: 'Lớp màng nhầy bảo vệ bề mặt bên trong khoang miệng dạ dày.' },
      { kanji: '黎民', hiragana: 'れいみん (reimin)', sinoVietnamese: 'LÊ DÂN', meaning: 'Muôn dân bá tánh', level: 'N1', breakdown: '黎 (Lê - có 黍) + 民 (Dân)', mnemonic: 'Đông đảo quần chúng nhân dân cần cù lao động.' },
      { kanji: '黍畑', hiragana: 'きびばたけ (kibibatake)', sinoVietnamese: 'THỬ HẠC', meaning: 'Nương rẫy trồng cây kê', level: 'N2', breakdown: '黍 (Thử) + 畑 (Hạc)', mnemonic: 'Mảnh nương rẫy trĩu những bông kê vàng hạt mẩy.' },
      { kanji: '黍餅', hiragana: 'きびもち (kibimochi)', sinoVietnamese: 'THỬ BÍNH', meaning: 'Bánh dày bột kê thơm dẻo', level: 'N2', breakdown: '黍 (Thử) + 餅 (Bính - bánh dày)', mnemonic: 'Bánh mochi dẻo quánh làm từ gạo kê thơm lừng.' },
      { kanji: '黍米', hiragana: 'しょまい (shomai)', sinoVietnamese: 'THỬ MỄ', meaning: 'Hạt kê vàng', level: 'N1', breakdown: '黍 (Thử) + 米 (Mễ)', mnemonic: 'Hạt kê tròn xoe như những viên ngọc vàng óng.' },
      { kanji: '黍離', hiragana: 'しょり (shori)', sinoVietnamese: 'THỬ LY', meaning: 'Nỗi thương cảm cảnh nước mất nhà tan', level: 'N1', breakdown: '黍 (Thử) + 離 (Ly)', mnemonic: 'Điển tích ngắm ruộng kê xưa hoài niệm về thời hưng thịnh đã qua.' }
    ]
  },
  {
    stt: 203,
    strokeCount: 12,
    radical: '黑',
    variants: ['黒'],
    name: 'Hắc',
    meaning: 'Màu đen huyền, bóng tối',
    mnemonic: 'Lửa (灬) đốt ở dưới lò làm khói bốc lên bám thành bồ hóng đen kịt quanh ô cửa sổ (里).',
    relatedVocab: [
      { kanji: '黒い', hiragana: 'くろい (kuroi)', sinoVietnamese: 'HẮC', meaning: 'Màu đen tuyền', level: 'N5', breakdown: '黒 (Hắc)', mnemonic: 'Khói đen bốc lên từ ngọn lửa lò sưởi bám thành bồ hóng đen nhánh.' },
      { kanji: '黒板', hiragana: 'こくばん (kokuban)', sinoVietnamese: 'HẮC BẢN', meaning: 'Bảng đen lớp học', level: 'N4', breakdown: '黒 (Hắc) + 板 (Bản - tấm bảng)', mnemonic: 'Tấm bảng đen nơi thầy cô viết phấn trắng giảng bài.' },
      { kanji: '暗黒', hiragana: 'あんこく (ankoku)', sinoVietnamese: 'ÁM HẮC', meaning: 'Bóng tối mịt mù, u tối', level: 'N2', breakdown: '暗 (Ám) + 黒 (Hắc)', mnemonic: 'Màn đêm u tối không một tia sáng le lói.' },
      { kanji: '黒字', hiragana: 'くろじ (kuroji)', sinoVietnamese: 'HẮC TỰ', meaning: 'Lãi, thặng dư tài chính', level: 'N3', breakdown: '黒 (Hắc) + 字 (Tự)', mnemonic: 'Dòng chữ viết bằng mực đen báo hiệu kinh doanh có lãi lớn.' },
      { kanji: '真っ黒', hiragana: 'まっくろ (makkuro)', sinoVietnamese: 'CHÂN HẮC', meaning: 'Đen kịt, đen nhánh', level: 'N3', breakdown: '真 (Chân) + 黒 (Hắc)', mnemonic: 'Màu đen sẫm hoàn toàn như màn đêm không trăng sao.' },
      { kanji: '黙る', hiragana: 'だまる (damaru)', sinoVietnamese: 'MẶC', meaning: 'Im lặng không nói lời nào', level: 'N3', breakdown: '黒 (Hắc) + 犬 (Khuyển)', mnemonic: 'Chú chó đen nằm im thin thít canh giữ ngôi nhà trong đêm.' },
      { kanji: '沈黙', hiragana: 'ちんもく (chinmoku)', sinoVietnamese: 'TRẦM MẶC', meaning: 'Trầm mặc, im lặng sâu sắc', level: 'N2', breakdown: '沈 (Trầm) + 黙 (Mặc - có 黒)', mnemonic: 'Khoảng lặng thinh sâu lắng chứa đựng bao suy tư.' },
      { kanji: '黒海', hiragana: 'こっかい (kokkai)', sinoVietnamese: 'HẮC HẢI', meaning: 'Biển Đen (châu Âu)', level: 'N2', breakdown: '黒 (Hắc) + 海 (Hải)', mnemonic: 'Vùng biển sâu thẳm ngăn cách châu Âu và châu Á.' },
      { kanji: '黒曜石', hiragana: 'こくようせき (kokuyōseki)', sinoVietnamese: 'HẮC DIỆU THẠCH', meaning: 'Đá vỏ chai thủy tinh đen bóng', level: 'N1', breakdown: '黒 + 曜 + 石', mnemonic: 'Loại đá nham thạch núi lửa đen bóng sắc như dao mổ.' },
      { kanji: '白黒', hiragana: 'しろくろ (shirokuro)', sinoVietnamese: 'BẠCH HẮC', meaning: 'Trắng đen rõ ràng, đúng sai', level: 'N2', breakdown: '白 (Bạch) + 黒 (Hắc)', mnemonic: 'Phân minh trắng đen rõ ràng không để mập mờ.' }
    ]
  },
  {
    stt: 204,
    strokeCount: 12,
    radical: '黹',
    name: 'Chỉ',
    meaning: 'May vá, khâu thêu',
    mnemonic: 'Hình những đường kim mũi chỉ thêu thùa đan xen đối xứng trên tấm vải hoa.',
    relatedVocab: [
      { kanji: '刺繍', hiragana: 'ししゅう (shishū)', sinoVietnamese: 'THÍCH TÚ', meaning: 'Nghệ thuật thêu thùa gấm hoa', level: 'N1', breakdown: '繡 (Tú - có bộ 黹)', mnemonic: 'Từng mũi kim luồn chỉ thêu nên bức tranh hoa gấm lộng lẫy.' },
      { kanji: '刺す', hiragana: 'さす (sasu)', sinoVietnamese: 'THÍCH', meaning: 'Đâm kim, chích thuốc, xâu chuỗi', level: 'N3', breakdown: 'liên quan may vá thêu thùa', mnemonic: 'Cây kim nhọn đâm xuyên qua lớp vải dệt thêu hoa.' },
      { kanji: '縫う', hiragana: 'ぬう (nuu)', sinoVietnamese: 'PHÙNG', meaning: 'Khâu vá quần áo', level: 'N2', breakdown: '糸 (Mịch) + 逢 (liên đới bộ 黹)', mnemonic: 'Đưa đường kim mũi chỉ nối liền mảnh vải rách.' },
      { kanji: '織る', hiragana: 'おる (oru)', sinoVietnamese: 'CHỨC', meaning: 'Dệt vải tơ tằm', level: 'N2', breakdown: '糸 + 戠', mnemonic: 'Khung cửi lách cách dệt nên tấm lụa mềm mại.' },
      { kanji: '黹文', hiragana: 'ちぶん (chibun)', sinoVietnamese: 'CHỈ VĂN', meaning: 'Hoa văn thêu tinh xảo', level: 'N1', breakdown: '黹 (Chỉ) + 文 (Văn)', mnemonic: 'Họa tiết hoa văn thêu tay tỉ mỉ đối xứng trên vạt áo hoàng gia.' },
      { kanji: '縫製', hiragana: 'ほうせい (hōsei)', sinoVietnamese: 'PHÙNG CHẾ', meaning: 'Ngành may mặc trang phục', level: 'N1', breakdown: '縫 (Phùng) + 製 (Chế)', mnemonic: 'Dây chuyền cắt may trang phục xuất khẩu chuẩn mực.' },
      { kanji: '針仕事', hiragana: 'はりしごと (harishigoto)', sinoVietnamese: 'CHÂM SỰ', meaning: 'Công việc khâu vá thêu thùa của phụ nữ', level: 'N2', breakdown: '針 (Kim) + 仕事 (Công việc)', mnemonic: 'Ngồi bên cửa sổ tỉ mẩn khâu từng đường kim mũi chỉ.' },
      { kanji: '裁縫', hiragana: 'さいほう (saihō)', sinoVietnamese: 'TÀI PHÙNG', meaning: 'Cắt may y phục', level: 'N2', breakdown: '裁 (Tài - cắt) + 縫 (Phùng - khâu)', mnemonic: 'Cắt vải theo số đo rồi may thành bộ đồ đẹp.' },
      { kanji: '錦繍', hiragana: 'きんしゅう (kinshū)', sinoVietnamese: 'CẨM TÚ', meaning: 'Gấm vóc thêu hoa rực rỡ non sông', level: 'N1', breakdown: '錦 (Cẩm) + 繍 (Tú - có 黹)', mnemonic: 'Non sông gấm vóc tươi đẹp rực rỡ như một bức thêu hoa.' },
      { kanji: '繍工', hiragana: 'しゅうこう (shūkō)', sinoVietnamese: 'TÚ CÔNG', meaning: 'Thợ thêu thủ công lành nghề', level: 'N1', breakdown: '繍 (Tú) + 工 (Công)', mnemonic: 'Bàn tay nghệ nhân thêu từng cánh hoa sống động như thật.' }
    ]
  },
  // Nhóm 13 nét (Bộ 205 – 208)
  {
    stt: 205,
    strokeCount: 13,
    radical: '黽',
    name: 'Mãnh',
    meaning: 'Con ếch, cố gắng nỗ lực',
    mnemonic: 'Hình con ếch nhìn từ trên xuống với hai mắt lồi, bụng to và hai chân sau gấp khúc chuẩn bị nhảy.',
    relatedVocab: [
      { kanji: '勉学', hiragana: 'べんがく (bengaku)', sinoVietnamese: 'MIỄN HỌC', meaning: 'Chăm chỉ học tập, nỗ lực đèn sách', level: 'N3', breakdown: '勉 (Miễn - chứa gốc 黽) + 学 (Học)', mnemonic: 'Dốc lòng kiên trì nỗ lực như chú ếch bật nhảy vượt khó khăn.' },
      { kanji: '勉強', hiragana: 'べんきょう (benkyō)', sinoVietnamese: 'MIỄN CƯỜNG', meaning: 'Học bài, giảm giá mua sắm', level: 'N5', breakdown: '勉 (có 黽) + 強 (Cường)', mnemonic: 'Cố gắng nỗ lực rèn luyện để trở nên mạnh mẽ tài giỏi.' },
      { kanji: '勤勉', hiragana: 'きんべん (kinben)', sinoVietnamese: 'CẦN MIỄN', meaning: 'Cần cù chăm chỉ', level: 'N2', breakdown: '勤 (Cần) + 勉 (Miễn - có 黽)', mnemonic: 'Đức tính siêng năng chịu thương chịu khó vươn lên.' },
      { kanji: '縄', hiragana: 'なわ (nawa)', sinoVietnamese: 'THẰNG', meaning: 'Sợi dây thừng bện chặt', level: 'N2', breakdown: '糸 (Mịch) + 黽 (Mãnh)', mnemonic: 'Dây thừng bện chắc cuộn tròn như chú ếch nằm phục.' },
      { kanji: '縄文時代', hiragana: 'じょうもんじだい (jōmonjidai)', sinoVietnamese: 'THẰNG VĂN THỜI ĐẠI', meaning: 'Thời kỳ đồ gốm Jomon (dấu dây thừng)', level: 'N2', breakdown: '縄 (Thằng - có 黽) + 文 + 時代', mnemonic: 'Thời kỳ cổ xưa nổi tiếng với đồ gốm hoa văn vặn thừng.' },
      { kanji: '一文縄', hiragana: 'いちもんなわ (ichimonnawa)', sinoVietnamese: 'NHẤT VĂN THẰNG', meaning: 'Sợi dây buộc tiền đồng thời xưa', level: 'N1', breakdown: '一文 + 縄 (có 黽)', mnemonic: 'Xâu chuỗi tiền đồng xỏ qua sợi dây thừng chắc chắn.' },
      { kanji: '縄張り', hiragana: 'なわばり (nawabari)', sinoVietnamese: 'THẰNG TRƯƠNG', meaning: 'Lãnh thổ ranh giới, địa bàn', level: 'N1', breakdown: '縄 (có 黽) + 張 (Trương)', mnemonic: 'Giăng dây thừng phân chia ranh giới địa bàn hoạt động.' },
      { kanji: '沖縄', hiragana: 'おきなわ (okinawa)', sinoVietnamese: 'TRÙNG THẰNG', meaning: 'Quần đảo Okinawa nhiệt đới', level: 'N3', breakdown: '沖 (Trùng) + 縄 (Thằng - có 黽)', mnemonic: 'Chuỗi đảo ngọc xinh đẹp trải dài như sợi dây thừng giữa biển khơi.' },
      { kanji: '黽勉', hiragana: 'びんべん (binben)', sinoVietnamese: 'MÃNH MIỄN', meaning: 'Cần cù nỗ lực hết lòng', level: 'N1', breakdown: '黽 (Mãnh) + 勉 (Miễn)', mnemonic: 'Hai chữ biểu trưng cho sự cố gắng kiên trì vượt bậc.' },
      { kanji: '蛙跳び', hiragana: 'かわずとび (kawazutobi)', sinoVietnamese: 'OA KHIÊU', meaning: 'Ếch nhảy cóc vượt chướng ngại', level: 'N1', breakdown: 'liên quan ý nghĩa tượng hình ếch 黽', mnemonic: 'Cú nhảy ngoạn mục của chú ếch vượt qua con lạch sâu.' }
    ]
  },
  {
    stt: 206,
    strokeCount: 13,
    radical: '鼎',
    name: 'Đỉnh',
    meaning: 'Cái đỉnh đồng ba chân linh thiêng',
    mnemonic: 'Chiếc đỉnh đồng ba chân uy nghiêm có hai tai xách (bộ Mục 目 ở trên, hai mảnh gỗ 爿, 片 làm chân ở dưới).',
    relatedVocab: [
      { kanji: '鼎立', hiragana: 'ていりつ (teiritsu)', sinoVietnamese: 'ĐỈNH LẬP', meaning: 'Thế chân vạc ba bên cân bằng', level: 'N1', breakdown: '鼎 (Đỉnh) + 立 (Lập)', mnemonic: 'Thế cân bằng kiên cố chân vạc thời Tam Quốc phân tranh.' },
      { kanji: '三国鼎立', hiragana: 'さんごくていりつ (sangokuteiritsu)', sinoVietnamese: 'TAM QUỐC ĐỈNH LẬP', meaning: 'Thế ba nước chân vạc Ngụy Thục Ngô', level: 'N1', breakdown: '三国 + 鼎立', mnemonic: 'Cục diện giằng co vững chãi của ba thế lực thời Tam Quốc.' },
      { kanji: '鼎談', hiragana: 'ていだん (teidan)', sinoVietnamese: 'ĐỈNH ĐÀM', meaning: 'Cuộc tọa đàm ba người thảo luận', level: 'N1', breakdown: '鼎 (Đỉnh) + 談 (Đàm)', mnemonic: 'Ba chuyên gia cùng ngồi đàm đạo trao đổi ý kiến chuyên sâu.' },
      { kanji: '鼎', hiragana: 'かなえ (kanae)', sinoVietnamese: 'ĐỈNH', meaning: 'Cái đỉnh đồng ba chân cổ kính', level: 'N1', breakdown: '鼎 (Đỉnh)', mnemonic: 'Chiếc đỉnh đồng uy nghiêm tượng trưng cho vương quyền và xã tắc.' },
      { kanji: '鐘鼎文', hiragana: 'しょうていぶん (shōteibun)', sinoVietnamese: 'CHUNG ĐỈNH VĂN', meaning: 'Văn tự khắc trên chuông và đỉnh đồng (Kim văn)', level: 'N1', breakdown: '鐘 (Chung) + 鼎 (Đỉnh) + 文 (Văn)', mnemonic: 'Nét chữ cổ kính khắc sâu vào chuông và đỉnh đồng ngàn xưa.' },
      { kanji: '革鼎', hiragana: 'かくてい (kakutei)', sinoVietnamese: 'CÁCH ĐỈNH', meaning: 'Thay đổi triều đại chính quyền', level: 'N1', breakdown: '革 (Cách) + 鼎 (Đỉnh)', mnemonic: 'Chuyển giao biểu tượng quyền lực đỉnh đồng lập vương triều mới.' },
      { kanji: '九鼎', hiragana: 'きゅうてい (kyūtei)', sinoVietnamese: 'CỬU ĐỈNH', meaning: 'Cửu đỉnh đúc chín châu thời vua Hạ Vũ', level: 'N1', breakdown: '九 (Cửu) + 鼎 (Đỉnh)', mnemonic: 'Chín chiếc đỉnh đồng báu vật trấn quốc uy nghiêm.' },
      { kanji: '問鼎', hiragana: 'もんてい (montei)', sinoVietnamese: 'VẤN ĐỈNH', meaning: 'Hỏi thăm đỉnh nặng nhẹ (dòm ngó ngôi báu)', level: 'N1', breakdown: '問 (Vấn) + 鼎 (Đỉnh)', mnemonic: 'Điển tích dòm ngó quyền lực tối cao của thiên hạ.' },
      { kanji: '鼎座', hiragana: 'ていざ (teiza)', sinoVietnamese: 'ĐỈNH TỌA', meaning: 'Chân đế đặt đỉnh vạc vững chãi', level: 'N1', breakdown: '鼎 (Đỉnh) + 座 (Tọa)', mnemonic: 'Bệ đá kiên cố nâng đỡ chiếc đỉnh đồng linh thiêng.' },
      { kanji: '鼎鍋', hiragana: 'かなえなべ (kanaenabe)', sinoVietnamese: 'ĐỈNH OA', meaning: 'Nồi ba chân nấu yến tiệc', level: 'N1', breakdown: '鼎 (Đỉnh) + 鍋 (Oa - nồi)', mnemonic: 'Chiếc vạc lớn đun sôi thức ăn trong đại lễ cung đình.' }
    ]
  },
  {
    stt: 207,
    strokeCount: 13,
    radical: '鼓',
    name: 'Cổ',
    meaning: 'Cái trống, đánh trống cổ vũ',
    mnemonic: 'Bên trái là cái trống đặt trên giá đỡ (壴), bên phải là bàn tay cầm dùi trống (支) gõ vang.',
    relatedVocab: [
      { kanji: '太鼓', hiragana: 'たいこ (taiko)', sinoVietnamese: 'THÁI CỔ', meaning: 'Trống Taiko truyền thống Nhật Bản', level: 'N3', breakdown: '太 (Thái) + 鼓 (Cổ)', mnemonic: 'Tiếng trống hội vang dội hào hùng trong đêm hội Matsuri.' },
      { kanji: '鼓動', hiragana: 'こどう (kodō)', sinoVietnamese: 'CỔ ĐỘNG', meaning: 'Nhịp tim đập thình thịch', level: 'N2', breakdown: '鼓 (Cổ) + 動 (Động)', mnemonic: 'Trái tim đập rộn ràng như tiếng trống giục giã trong lồng ngực.' },
      { kanji: '鼓舞', hiragana: 'こぶ (kobu)', sinoVietnamese: 'CỔ VŨ', meaning: 'Cổ vũ khích lệ tinh thần', level: 'N1', breakdown: '鼓 (Cổ - trống) + 舞 (Vũ - múa)', mnemonic: 'Khua trống múa cờ tiếp thêm sức mạnh cho các chiến binh.' },
      { kanji: '腹鼓', hiragana: 'はらづつみ (harazutsumi)', sinoVietnamese: 'PHÚC CỔ', meaning: 'Vỗ bụng no nê thỏa mãn', level: 'N1', breakdown: '腹 (Phúc - bụng) + 鼓 (Cổ)', mnemonic: 'Ăn một bữa no nê thỏa thuê rồi vỗ bụng như gõ trống.' },
      { kanji: '鼓膜', hiragana: 'こまく (komaku)', sinoVietnamese: 'CỔ MẠC', meaning: 'Màng nhĩ tai', level: 'N1', breakdown: '鼓 (Cổ) + 膜 (Mạc)', mnemonic: 'Màng tai rung lên đón nhận sóng âm thanh như mặt trống.' },
      { kanji: '舌鼓', hiragana: 'したづつみ (shitazutsumi)', sinoVietnamese: 'THIỆT CỔ', meaning: 'Tặc lưỡi tấm tắc khen ngon', level: 'N1', breakdown: '舌 (Thiệt) + 鼓 (Cổ)', mnemonic: 'Uốn lưỡi khen món ăn ngon miệng như gõ nhịp trống.' },
      { kanji: '小鼓', hiragana: 'こつづみ (kotsudzumi)', sinoVietnamese: 'TIỂU CỔ', meaning: 'Chiếc trống cơm nhỏ kẹp nách kịch Noh', level: 'N1', breakdown: '小 (Tiểu) + 鼓 (Cổ)', mnemonic: 'Chiếc trống nhỏ người nghệ sĩ vỗ tay đệm nhịp kịch Noh.' },
      { kanji: '鼓手', hiragana: 'こしゅ (koshu)', sinoVietnamese: 'CỔ THỦ', meaning: 'Tay trống cừ khôi', level: 'N1', breakdown: '鼓 (Cổ) + 手 (Thủ)', mnemonic: 'Người đánh trống giữ nhịp cho dàn nhạc giao hưởng.' },
      { kanji: '陣太鼓', hiragana: 'じんだいこ (jindaiko)', sinoVietnamese: 'TRẬN THÁI CỔ', meaning: 'Trống trận giục quân xung phong', level: 'N1', breakdown: '陣 (Trận) + 太鼓', mnemonic: 'Tiếng trống lệnh thúc giục binh lính đồng loạt xung trận.' },
      { kanji: '一木鼓', hiragana: 'いちぼくこ (ichibokuko)', sinoVietnamese: 'NHẤT MỘC CỔ', meaning: 'Mõ gỗ gõ nhịp chùa', level: 'N1', breakdown: '一木 + 鼓 (Cổ)', mnemonic: 'Mõ khoét từ thân cây nguyên khối gõ nhịp tụng kinh thanh tịnh.' }
    ]
  },
  {
    stt: 208,
    strokeCount: 13,
    radical: '鼠',
    name: 'Thử',
    meaning: 'Con chuột',
    mnemonic: 'Phía trên là cái đầu với hàm răng nhọn gặm nhấm (臼), phía dưới là 4 chân và cái đuôi dài lanh lẹ.',
    relatedVocab: [
      { kanji: '鼠', hiragana: 'ねずみ (nezumi)', sinoVietnamese: 'THỬ', meaning: 'Con chuột nhắt, chuột cống', level: 'N3', breakdown: '鼠 (Thử)', mnemonic: 'Chú chuột có đôi tai vểnh, râu dài và răng gặm nhấm đồ đạc.' },
      { kanji: '鼠色', hiragana: 'ねずみいろ (nezumiiro)', sinoVietnamese: 'THỬ SẮC', meaning: 'Màu xám lông chuột trang nhã', level: 'N2', breakdown: '鼠 (Thử) + 色 (Sắc)', mnemonic: 'Tông màu xám tro nhẹ nhàng mộc mạc kiểu Nhật.' },
      { kanji: '鼠算', hiragana: 'ねずみざん (nezumizan)', sinoVietnamese: 'THỬ TOÁN', meaning: 'Cấp số nhân, đẻ nhanh như chuột', level: 'N1', breakdown: '鼠 (Thử) + 算 (Toán)', mnemonic: 'Tốc độ sinh sôi nảy nở tăng theo cấp số nhân chóng mặt.' },
      { kanji: '齧歯類', hiragana: 'げっしるい (gesshirui)', sinoVietnamese: 'NGHIỆT XỈ LOẠI', meaning: 'Bộ gặm nhấm động vật', level: 'N1', breakdown: 'liên đới loài chuột 鼠', mnemonic: 'Các loài thú có hai chiếc răng cửa mọc dài suốt đời như chuột.' },
      { kanji: '二十日鼠', hiragana: 'はつかねずみ (hatsukanezumi)', sinoVietnamese: 'NHỊ THẬP NHẬT THỬ', meaning: 'Chuột bạch thí nghiệm', level: 'N1', breakdown: '二十日 + 鼠', mnemonic: 'Chú chuột nhỏ màu trắng dùng trong nghiên cứu dược phẩm.' },
      { kanji: '鼠小僧', hiragana: 'ねずみこぞう (nezamikozō)', sinoVietnamese: 'THỬ TIỂU TĂNG', meaning: 'Nezumi Kozo (tướng cướp trượng nghĩa như Robin Hood)', level: 'N1', breakdown: '鼠 + 小僧', mnemonic: 'Nhân vật hiệp trộm thoăn thoắt cướp của người giàu chia cho dân nghèo.' },
      { kanji: '鼠蹊部', hiragana: 'そけいぶ (sokeibu)', sinoVietnamese: 'THỬ KHÊ BỘ', meaning: 'Vùng bẹn háng cơ thể', level: 'N1', breakdown: '鼠 + 蹊 + 部', mnemonic: 'Vùng nếp gấp khớp háng giải phẫu học cơ thể.' },
      { kanji: '白鼠', hiragana: 'しろねずみ (shironezumi)', sinoVietnamese: 'BẠCH THỬ', meaning: 'Chuột bạch cưng', level: 'N2', breakdown: '白 (Bạch) + 鼠 (Thử)', mnemonic: 'Chú chuột cảnh có bộ lông trắng muốt và đôi mắt hồng.' },
      { kanji: '栗鼠', hiragana: 'りす (risu)', sinoVietnamese: 'LẬT THỬ', meaning: 'Con sóc đuôi xù ăn hạt dẻ', level: 'N2', breakdown: '栗 (Lật - hạt dẻ) + 鼠 (Thử)', mnemonic: 'Chú sóc nhanh thoăn thoắt gặm hạt dẻ trên cành thông.' },
      { kanji: '鼬ごっこ', hiragana: 'いたちごっこ (itachigokko)', sinoVietnamese: 'THỬ DU', meaning: 'Vòng luẩn quẩn mèo đuổi chuột', level: 'N1', breakdown: 'Chứa nghĩa đuổi bắt chuột 鼠', mnemonic: 'Trò chơi luẩn quẩn không có hồi kết giải quyết được vấn đề.' }
    ]
  },
  // Nhóm 14 nét (Bộ 209 – 210)
  {
    stt: 209,
    strokeCount: 14,
    radical: '鼻',
    name: 'Tỵ',
    meaning: 'Cái mũi ngửi hương vị',
    mnemonic: 'Cái mũi (Tự 自) nằm ở trung tâm khuôn mặt (Điền 田), bên dưới là hai lỗ mũi thở hơi (廾).',
    relatedVocab: [
      { kanji: '鼻', hiragana: 'はな (hana)', sinoVietnamese: 'TỊ', meaning: 'Cái mũi hít thở ngửi mùi', level: 'N5', breakdown: '自 (Tự) + 畀', mnemonic: 'Chiếc mũi nằm ngay giữa khuôn mặt tự mình hít thở không khí trong lành.' },
      { kanji: '鼻水', hiragana: 'はなみず (hanamizu)', sinoVietnamese: 'TỊ THỦY', meaning: 'Nước mũi chảy khi cảm cúm', level: 'N4', breakdown: '鼻 (Tị) + 水 (Thủy)', mnemonic: 'Nước mũi sụt sịt chảy ra mỗi khi trời trở lạnh.' },
      { kanji: '鼻声', hiragana: 'はなごえ (hanagoe)', sinoVietnamese: 'TỊ THANH', meaning: 'Giọng nghẹt mũi', level: 'N3', breakdown: '鼻 (Tị) + 声 (Thanh)', mnemonic: 'Giọng nói ồm ồm nghẹt lại do tịt mũi lúc ốm.' },
      { kanji: '鼻血', hiragana: 'はなぢ (hanaji)', sinoVietnamese: 'TỊ HUYẾT', meaning: 'Chảy máu cam', level: 'N2', breakdown: '鼻 (Tị) + 血 (Huyết)', mnemonic: 'Máu chảy ra từ niêm mạc mũi khi thời tiết quá hanh khô.' },
      { kanji: '耳鼻科', hiragana: 'じびか (jibika)', sinoVietnamese: 'NHĨ TỊ KHOA', meaning: 'Khoa tai mũi họng bệnh viện', level: 'N2', breakdown: '耳 (Nhĩ) + 鼻 (Tị) + 科 (Khoa)', mnemonic: 'Khoa chuyên khám chữa các bệnh về tai và mũi họng.' },
      { kanji: '鼻歌', hiragana: 'はなうた (hanauta)', sinoVietnamese: 'TỊ CA', meaning: 'Tiếng hát ngâm nga trong mũi', level: 'N2', breakdown: '鼻 (Tị) + 歌 (Ca)', mnemonic: 'Ngâm nga điệu nhạc vui vẻ yêu đời qua cánh mũi.' },
      { kanji: '鼻筋', hiragana: 'はなすじ (hanasuji)', sinoVietnamese: 'TỊ CÂN', meaning: 'Sống mũi dọc dừa cao thẳng', level: 'N1', breakdown: '鼻 (Tị) + 筋 (Cân)', mnemonic: 'Sống mũi thanh tú cao vút làm bừng sáng cả khuôn mặt.' },
      { kanji: '鼻毛', hiragana: 'はなげ (hanage)', sinoVietnamese: 'TỊ MAO', meaning: 'Lông mũi lọc bụi', level: 'N2', breakdown: '鼻 (Tị) + 毛 (Mao)', mnemonic: 'Lớp lông mao tự nhiên ngăn bụi bẩn lọt vào đường hô hấp.' },
      { kanji: '象鼻', hiragana: 'ぞうばな (zōbana)', sinoVietnamese: 'TƯỢNG TỊ', meaning: 'Chiếc vòi dài của chú voi', level: 'N1', breakdown: '象 (Tượng) + 鼻 (Tị)', mnemonic: 'Chiếc mũi dài linh hoạt của chú voi có thể hút nước phun mưa.' },
      { kanji: '鼻息', hiragana: 'はないき (hanaiki)', sinoVietnamese: 'TỊ TỨC', meaning: 'Hơi thở phì phò qua mũi, khí thế hừng hực', level: 'N1', breakdown: '鼻 (Tị) + 息 (Tức)', mnemonic: 'Thở hắt ra qua mũi thể hiện khí thế tự tin quyết tâm.' }
    ]
  },
  {
    stt: 210,
    strokeCount: 14,
    radical: '齊',
    variants: ['斉'],
    name: 'Tề',
    meaning: 'Ngang bằng, cùng nhau tề tựu',
    mnemonic: 'Hình những bông lúa trên cánh đồng mọc cao đều tăm tắp, bằng phẳng ngang nhau.',
    relatedVocab: [
      { kanji: '一斉に', hiragana: 'いっせいに (isseini)', sinoVietnamese: 'NHẤT TỀ', meaning: 'Đồng loạt cùng một lúc', level: 'N3', breakdown: '一 (Nhất) + 斉 (Tề)', mnemonic: 'Tất cả mọi người đồng loạt đứng dậy cùng một thời khắc.' },
      { kanji: '斉唱', hiragana: 'せいしょう (seishō)', sinoVietnamese: 'TỀ XƯỚNG', meaning: 'Cùng đồng thanh hát vang', level: 'N2', breakdown: '斉 (Tề) + 唱 (Xướng)', mnemonic: 'Cả hội trường cùng cất cao giọng hòa chung bài hát.' },
      { kanji: '斉整', hiragana: 'せいせい (seisei)', sinoVietnamese: 'TỀ CHỈNH', meaning: 'Ngay ngắn, trật tự chỉnh tề', level: 'N1', breakdown: '斉 (Tề) + 整 (Chỉnh)', mnemonic: 'Đội ngũ xếp hàng thẳng tắp chỉnh tề nghiêm trang.' },
      { kanji: '整斉', hiragana: 'せいせい (seisei)', sinoVietnamese: 'CHỈNH TỀ', meaning: 'Gọn gàng đâu ra đấy', level: 'N1', breakdown: '整 (Chỉnh) + 斉 (Tề)', mnemonic: 'Đồ đạc xếp đặt gọn gàng ngăn nắp chuẩn mực.' },
      { kanji: '均斉', hiragana: 'きんせい (kinsei)', sinoVietnamese: 'QUÂN TỀ', meaning: 'Cân đối hài hòa tỷ lệ vàng', level: 'N1', breakdown: '均 (Quân) + 斉 (Tề)', mnemonic: 'Bức tượng điêu khắc có tỷ lệ cân đối hoàn hảo tuyệt mỹ.' },
      { kanji: '斉家', hiragana: 'せいか (seika)', sinoVietnamese: 'TỀ GIA', meaning: 'Tề gia trị quốc, giữ yên ấm gia đình', level: 'N1', breakdown: '斉 (Tề) + 家 (Gia)', mnemonic: 'Tu thân rồi tề gia giữ cho mái ấm trong ấm ngoài êm.' },
      { kanji: '斉天大聖', hiragana: 'せいてんたいせい (seitentaisei)', sinoVietnamese: 'TỀ THIÊN ĐẠI THÁNH', meaning: 'Tề Thiên Đại Thánh Tôn Ngộ Không', level: 'N1', breakdown: '斉 (Tề) + 天 (Thiên) + 大聖', mnemonic: 'Danh xưng thần thánh sánh ngang trời đất của Tôn Ngộ Không.' },
      { kanji: '斉一', hiragana: 'せいいつ (seiitsu)', sinoVietnamese: 'TỀ NHẤT', meaning: 'Đồng nhất một thể', level: 'N1', breakdown: '斉 (Tề) + 一 (Nhất)', mnemonic: 'Tiêu chuẩn hóa đồng bộ thống nhất mọi sản phẩm.' },
      { kanji: '斉美', hiragana: 'せいび (seibi)', sinoVietnamese: 'TỀ MỸ', meaning: 'Đều đẹp đẽ toàn bích', level: 'N1', breakdown: '斉 (Tề) + 美 (Mỹ)', mnemonic: 'Mọi mặt đều đạt đến độ hoàn mỹ toàn vẹn.' },
      { kanji: '斉放', hiragana: 'せいほう (seihō)', sinoVietnamese: 'TỀ PHÓNG', meaning: 'Đồng loạt bắn pháo hoa', level: 'N1', breakdown: '斉 (Tề) + 放 (Phóng)', mnemonic: 'Hàng ngàn quả pháo hoa đồng loạt phóng lên bầu trời đêm rực rỡ.' }
    ]
  },
  // Nhóm 15 nét (Bộ 211)
  {
    stt: 211,
    strokeCount: 15,
    radical: '齒',
    variants: ['歯'],
    name: 'Xỉ',
    meaning: 'Răng hàm, tuổi tác',
    mnemonic: 'Phía trên là âm đọc (Chỉ 止), phía dưới là cái miệng há to lộ hai hàm răng (米) xếp đều đặn.',
    relatedVocab: [
      { kanji: '歯', hiragana: 'は (ha)', sinoVietnamese: 'XỈ', meaning: 'Hàm răng, chiếc răng', level: 'N5', breakdown: '歯 (Xỉ)', mnemonic: 'Hàm răng trắng muốt đều tăm tắp trong vòm miệng 止.' },
      { kanji: '歯科', hiragana: 'しか (shika)', sinoVietnamese: 'XỈ KHOA', meaning: 'Nha khoa, phòng khám răng', level: 'N4', breakdown: '歯 (Xỉ) + 科 (Khoa)', mnemonic: 'Nơi nha sĩ chăm sóc và điều trị các bệnh răng miệng.' },
      { kanji: '虫歯', hiragana: 'むしば (mushiba)', sinoVietnamese: 'TRÙNG XỈ', meaning: 'Chiếc răng sâu đau buốt', level: 'N4', breakdown: '虫 (Trùng) + 歯 (Xỉ)', mnemonic: 'Vi khuẩn sâu răng gặm nhấm men răng làm nhức nhối.' },
      { kanji: '歯医者', hiragana: 'はいしゃ (haisha)', sinoVietnamese: 'XỈ Y GIẢ', meaning: 'Bác sĩ nha khoa', level: 'N5', breakdown: '歯 (Xỉ) + 医者 (Y giả)', mnemonic: 'Bác sĩ tận tâm nhổ răng sâu và làm trắng răng.' },
      { kanji: '歯ブラシ', hiragana: 'はブラシ (haburashi)', sinoVietnamese: 'XỈ', meaning: 'Bàn chải đánh răng', level: 'N5', breakdown: '歯 (Xỉ) + ブラシ', mnemonic: 'Bàn chải lông mềm chải sạch răng sau bữa ăn.' },
      { kanji: '歯車', hiragana: 'はぐるま (haguruma)', sinoVietnamese: 'XỈ XA', meaning: 'Bánh răng cưa máy móc', level: 'N2', breakdown: '歯 (Xỉ) + 車 (Xa)', mnemonic: 'Bánh xe có các răng cưa ăn khớp truyền chuyển động.' },
      { kanji: '義歯', hiragana: 'ぎし (gishi)', sinoVietnamese: 'NGHĨA XỈ', meaning: 'Hàm răng giả tháo lắp', level: 'N1', breakdown: '義 (Nghĩa) + 歯 (Xỉ)', mnemonic: 'Bộ răng giả thay thế cho người cao tuổi ăn nhai ngon miệng.' },
      { kanji: '乳歯', hiragana: 'にゅうし (nyūshi)', sinoVietnamese: 'NHŨ XỈ', meaning: 'Răng sữa của trẻ thơ', level: 'N1', breakdown: '乳 (Nhũ - sữa) + 歯 (Xỉ)', mnemonic: 'Những chiếc răng sữa đầu đời của bé con mọc lên.' },
      { kanji: '永久歯', hiragana: 'えいきゅうし (eikyūshi)', sinoVietnamese: 'VĨNH CỬU XỈ', meaning: 'Răng vĩnh viễn trưởng thành', level: 'N1', breakdown: '永久 + 歯 (Xỉ)', mnemonic: 'Bộ răng mọc thay thế tồn tại suốt cuộc đời con người.' },
      { kanji: '歯茎', hiragana: 'はぐき (haguki)', sinoVietnamese: 'XỈ HÀNH', meaning: 'Lợi răng, nướu răng hồng hào', level: 'N2', breakdown: '歯 (Xỉ) + 茎 (Hành)', mnemonic: 'Nướu răng khỏe mạnh bám chắc lấy chân răng.' }
    ]
  },
  // Nhóm 16 nét (Bộ 212 – 213)
  {
    stt: 212,
    strokeCount: 16,
    radical: '龍',
    variants: ['竜'],
    name: 'Long',
    meaning: 'Con rồng uy dũng',
    mnemonic: 'Linh vật có sừng (立) trên đầu, thân uốn lượn bay trên mây với bờm tóc và vảy rồng bên phải.',
    relatedVocab: [
      { kanji: '竜', hiragana: 'りゅう (ryū) / たつ (tatsu)', sinoVietnamese: 'LONG', meaning: 'Con rồng uy nghiêm, thần long', level: 'N3', breakdown: '竜/龍 (Long)', mnemonic: 'Thần thú mình rắn có vảy, râu dài bay lượn giữa mây ngàn uy phong.' },
      { kanji: '恐竜', hiragana: 'きょうりゅう (kyōryū)', sinoVietnamese: 'KHỦNG LONG', meaning: 'Khủng long thời tiền sử', level: 'N3', breakdown: '恐 (Khủng) + 竜 (Long)', mnemonic: 'Loài bò sát khổng lồ đáng sợ thống trị Trái Đất cổ xưa.' },
      { kanji: '竜巻', hiragana: 'たつまき (tatsumaki)', sinoVietnamese: 'LONG QUYỂN', meaning: 'Cơn lốc xoáy vòi rồng', level: 'N2', breakdown: '竜 (Long) + 巻 (Quyển)', mnemonic: 'Cột gió xoáy cuộn tròn hút nước lên trời như rồng lấy nước.' },
      { kanji: '昇竜', hiragana: 'しょうりゅう (shōryū)', sinoVietnamese: 'THĂNG LONG', meaning: 'Rồng bay lên trời cao, Thăng Long', level: 'N1', breakdown: '昇 (Thăng) + 竜 (Long)', mnemonic: 'Hình ảnh con rồng vàng bay vút lên bầu trời linh thiêng.' },
      { kanji: '登竜門', hiragana: 'とうりゅうもん (tōryūmon)', sinoVietnamese: 'ĐĂNG LONG MÔN', meaning: 'Cửa vũ môn cá chép hóa rồng', level: 'N1', breakdown: '登 (Đăng) + 竜 (Long) + 門 (Môn)', mnemonic: 'Cửa ải thử thách vượt qua để đạt thành công vang dội.' },
      { kanji: '竜神', hiragana: 'りゅうじん (ryūjin)', sinoVietnamese: 'LONG THẦN', meaning: 'Long Vương cai quản đại dương', level: 'N1', breakdown: '竜 (Long) + 神 (Thần)', mnemonic: 'Vị thần rồng cai quản muôn loài dưới thủy cung.' },
      { kanji: '竜宮城', hiragana: 'りゅうぐうじょう (ryūgūjō)', sinoVietnamese: 'LONG CUNG THÀNH', meaning: 'Thủy cung Long Vương trong truyện Urashima Taro', level: 'N2', breakdown: '竜宮 + 城 (Thành)', mnemonic: 'Cung điện nguy nga lộng lẫy dưới đáy biển sâu thẳm.' },
      { kanji: '竜王', hiragana: 'りゅうおう (ryūō)', sinoVietnamese: 'LONG VƯƠNG', meaning: 'Quân xe phong cấp trong cờ Shogi / Long Vương', level: 'N1', breakdown: '竜 (Long) + 王 (Vương)', mnemonic: 'Quân cờ mạnh nhất tung hoành trên bàn cờ tướng Nhật.' },
      { kanji: '画竜点睛', hiragana: 'がりょうてんせい (garyōtensei)', sinoVietnamese: 'HỌA LONG ĐIỂM TINH', meaning: 'Vẽ rồng điểm mắt (nét vẽ quyết định đỉnh cao)', level: 'N1', breakdown: '画竜 (Vẽ rồng) + 点睛 (Chấm mắt)', mnemonic: 'Nét chấm phá hoàn thiện biến tác phẩm trở nên sống động như thật.' },
      { kanji: '竜骨', hiragana: 'りゅうこつ (ryūkotsu)', sinoVietnamese: 'LONG CỐT', meaning: 'Sống tàu đáy tàu thủy', level: 'N1', breakdown: '竜 (Long) + 骨 (Cốt)', mnemonic: 'Trục xương sống đáy tàu vững chắc rẽ sóng vượt trùng khơi.' }
    ]
  },
  {
    stt: 213,
    strokeCount: 16,
    radical: '龜',
    variants: ['亀'],
    name: 'Quy',
    meaning: 'Con rùa trường thọ',
    mnemonic: 'Hình con rùa nhìn nghiêng: đầu nhô lên, chân thò ra trước, lưng mang cái mai và cái đuôi cong ở dưới.',
    relatedVocab: [
      { kanji: '亀', hiragana: 'かめ (kame)', sinoVietnamese: 'QUY', meaning: 'Con rùa mai cứng', level: 'N4', breakdown: '亀 (Quy)', mnemonic: 'Chú rùa có chiếc mai cứng cáp và bốn chân chèo bơi lội dưới biển.' },
      { kanji: 'ウミガメ', hiragana: 'うみがめ (umigame)', sinoVietnamese: 'HẢI QUY', meaning: 'Con rùa biển khổng lồ', level: 'N3', breakdown: '海 (Hải) + 亀 (Quy)', mnemonic: 'Chú rùa biển vượt ngàn hải lý trở về bãi cát xưa đẻ trứng.' },
      { kanji: '亀裂', hiragana: 'きれつ (kiretsu)', sinoVietnamese: 'QUY LIỆT', meaning: 'Vết nứt nẻ rạn rỡ chân chim', level: 'N1', breakdown: '亀 (Quy) + 裂 (Liệt - nứt)', mnemonic: 'Vết nứt nẻ chằng chịt trên tường như hoa văn mai rùa.' },
      { kanji: '亀甲', hiragana: 'きっこう (kikkō)', sinoVietnamese: 'QUY GIÁP', meaning: 'Mai rùa bói toán thời xưa', level: 'N1', breakdown: '亀 (Quy) + 甲 (Giáp - mai)', mnemonic: 'Chiếc mai rùa nướng trên lửa để xem điềm lành dữ bói toán.' },
      { kanji: '亀鑑', hiragana: 'きかん (kikan)', sinoVietnamese: 'QUY GIÁM', meaning: 'Tấm gương sáng mẫu mực noi theo', level: 'N1', breakdown: '亀 (Quy) + 鑑 (Giám - gương)', mnemonic: 'Tấm gương sáng ngời làm kim chỉ nam soi rọi hành động.' },
      { kanji: '亀齢', hiragana: 'きれい (kirei)', sinoVietnamese: 'QUY LINH', meaning: 'Tuổi thọ dài lâu như loài rùa', level: 'N1', breakdown: '亀 (Quy) + 齢 (Linh - tuổi)', mnemonic: 'Lời chúc thọ bách niên giai lão trường thọ cùng trời đất.' },
      { kanji: '亀の子束子', hiragana: 'かめのこたわし (kamenokotawashi)', sinoVietnamese: 'QUY TỬ THÚC TỬ', meaning: 'Búi cọ rửa bát hình con rùa xơ dừa', level: 'N2', breakdown: '亀の子 + 束子', mnemonic: 'Búi cọ xơ dừa hình con rùa chà sạch bong đáy nồi của người Nhật.' },
      { kanji: '亀甲墓', hiragana: 'かめこうばか (kamekōbaka)', sinoVietnamese: 'QUY GIÁP MỘ', meaning: 'Mộ hình mai rùa độc đáo ở Okinawa', level: 'N1', breakdown: '亀甲 + 墓 (Mộ)', mnemonic: 'Lăng mộ truyền thống hình mai rùa vững chãi che chở tổ tiên.' },
      { kanji: '亀息', hiragana: 'きそく (kisoku)', sinoVietnamese: 'QUY TỨC', meaning: 'Hơi thở nhẹ sâu như rùa thở', level: 'N1', breakdown: '亀 (Quy) + 息 (Tức)', mnemonic: 'Phương pháp thở tĩnh tâm dưỡng sinh sâu và chậm rãi.' },
      { kanji: '鶴亀', hiragana: 'つるかめ (tsurukame)', sinoVietnamese: 'HẠC QUY', meaning: 'Hạc và rùa biểu tượng trường thọ may mắn', level: 'N2', breakdown: '鶴 (Hạc) + 亀 (Quy)', mnemonic: 'Cặp đôi biểu tượng phúc lộc thọ cát tường muôn đời.' }
    ]
  },
  // Nhóm 17 nét (Bộ 214)
  {
    stt: 214,
    strokeCount: 17,
    radical: '龠',
    name: 'Dược',
    meaning: 'Cây sáo 3 lỗ hòa âm',
    mnemonic: 'Nhạc cụ gồm các ống trúc có 3 lỗ tròn (品) ghép lại (冊), trên cùng là miệng người thổi (亼).',
    relatedVocab: [
      { kanji: '龠', hiragana: 'やく (yaku)', sinoVietnamese: 'DƯỢC', meaning: 'Ống sáo trúc ba lỗ cổ xưa, đơn vị đong lường', level: 'N1', breakdown: '龠 (Dược)', mnemonic: 'Ống sáo bằng trúc có ba lỗ thổi phát ra âm điệu hòa nhã thanh tao.' },
      { kanji: '鑰匙', hiragana: 'やくし (yakushi) / かぎ', sinoVietnamese: 'DƯỢC THI', meaning: 'Chiếc chìa khóa mở cổng', level: 'N1', breakdown: '鑰 (chứa 龠) + 匙 (Thi)', mnemonic: 'Chìa khóa tra vào ổ mở toang cánh cổng bí mật.' },
      { kanji: '管龠', hiragana: 'かんやく (kan\'yaku)', sinoVietnamese: 'QUẢN DƯỢC', meaning: 'Các loại sáo trúc thổi hơi', level: 'N1', breakdown: '管 (Quản - ống) + 龠 (Dược)', mnemonic: 'Bộ nhạc cụ sáo hơi cổ truyền trong dàn nhã nhạc cung đình.' },
      { kanji: '和龠', hiragana: 'わやく (wayaku)', sinoVietnamese: 'HÒA DƯỢC', meaning: 'Âm thanh sáo trúc du dương hòa hợp', level: 'N1', breakdown: '和 (Hòa) + 龠 (Dược)', mnemonic: 'Tiếng sáo trúc hòa nhịp mang lại bầu không khí thanh bình.' },
      { kanji: '啓龠', hiragana: 'けいやく (keiyaku)', sinoVietnamese: 'KHẢI DƯỢC', meaning: 'Mở khóa then cài đón bình minh', level: 'N1', breakdown: '啓 (Khải) + 龠 (Dược)', mnemonic: 'Mở chìa khóa then cổng đón ánh nắng ban mai rọi vào.' },
      { kanji: '龠舞', hiragana: 'やくぶ (yakubu)', sinoVietnamese: 'DƯỢC VŨ', meaning: 'Điệu múa cầm sáo trúc tế lễ', level: 'N1', breakdown: '龠 (Dược) + 舞 (Vũ)', mnemonic: 'Điệu múa tay cầm sáo trúc uyển chuyển dâng tế trời đất.' },
      { kanji: '銅龠', hiragana: 'どうやく (dōyaku)', sinoVietnamese: 'ĐỒNG DƯỢC', meaning: 'Ống chuẩn đo lường đúc bằng đồng', level: 'N1', breakdown: '銅 (Đồng) + 龠 (Dược)', mnemonic: 'Ống chuẩn đong hạt ngũ cốc bằng đồng thời xưa.' },
      { kanji: '尺龠', hiragana: 'しゃくやく (shakuyaku)', sinoVietnamese: 'XÍCH DƯỢC', meaning: 'Thước đo chiều dài và ống sáo định âm', level: 'N1', breakdown: '尺 (Xích) + 龠 (Dược)', mnemonic: 'Quy chuẩn độ dài và âm thanh chuẩn mực của triều đình.' },
      { kanji: '鈴龠', hiragana: 'れいやく (reiyaku)', sinoVietnamese: 'LINH DƯỢC', meaning: 'Chuông và sáo trúc hòa tấu', level: 'N1', breakdown: '鈴 (Linh) + 龠 (Dược)', mnemonic: 'Tiếng chuông ngân và tiếng sáo hòa quyện êm dịu.' },
      { kanji: '雅龠', hiragana: 'がやく (gayaku)', sinoVietnamese: 'NHÃ DƯỢC', meaning: 'Khúc sáo trúc nhã nhạc thanh cao', level: 'N1', breakdown: '雅 (Nhã) + 龠 (Dược)', mnemonic: 'Giai điệu nhã nhạc cung đình thanh cao làm lắng đọng tâm can.' }
    ]
  }
];

// Helper lọc danh sách bộ thủ theo số nét
export function getRadicalsByStrokes(strokes?: number): RadicalItem[] {
  if (!strokes) return RADICALS_214_DATA;
  return RADICALS_214_DATA.filter((r) => r.strokeCount === strokes);
}

// Helper tìm kiếm bộ thủ theo từ khóa (ký tự, tên Hán Việt, nghĩa)
export function searchRadicals(query: string): RadicalItem[] {
  if (!query.trim()) return RADICALS_214_DATA;
  const q = query.toLowerCase().trim();
  return RADICALS_214_DATA.filter(
    (r) =>
      r.radical.includes(q) ||
      (r.variants && r.variants.some((v) => v.includes(q))) ||
      r.name.toLowerCase().includes(q) ||
      r.meaning.toLowerCase().includes(q) ||
      r.mnemonic.toLowerCase().includes(q) ||
      r.relatedVocab.some(
        (v) =>
          v.kanji.includes(q) ||
          v.sinoVietnamese.toLowerCase().includes(q) ||
          v.meaning.toLowerCase().includes(q)
      )
  );
}
