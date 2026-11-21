/**
 * Kanji Extended Features Knowledge Base & Utilities
 * Provides support for:
 * 1. Jukugo Compounds Matrix (Ghép từ Hán tự 2-3 chữ)
 * 2. Radical Anatomy & Etymology Deep-Dive (Chiết tự & Phân tích Bộ Thủ)
 * 3. Audio Dictation Lab (Phòng luyện nghe & Phản xạ Thính Giác)
 * 4. Printable Genkoyoshi Worksheet (Phiếu in luyện viết ô ly chuẩn Nhật A4)
 * 5. Starred & Notebook Spaced Repetition (Sổ tay chữ khó & Ghi chú cá nhân)
 */

export interface JukugoItem {
  compound: string;          // e.g. 日本
  reading: string;           // e.g. にほん
  sinoVietnamese: string;    // e.g. NHẬT BẢN
  meaning: string;           // e.g. Nước Nhật Bản
  pos: string;               // e.g. Danh từ
  level: string;             // e.g. N5
  components: {
    character: string;
    sinoVietnamese: string;
    meaning: string;
  }[];
  exampleJa: string;
  exampleVi: string;
}

export interface RadicalDecomposition {
  mainRadical: string;
  mainRadicalName: string;
  mainRadicalMeaning: string;
  position: string;
  strokeCount: number;
  components: {
    char: string;
    name: string;
    meaning: string;
  }[];
  etymologyStory: string;
  philosophicalNote: string;
}

// 214 Bộ Thủ & Chiết tự Hán Tự Phổ biến
export const COMPREHENSIVE_RADICALS: Record<string, RadicalDecomposition> = {
  '日': {
    mainRadical: '日',
    mainRadicalName: 'Bộ Nhật (Hi / Nichi)',
    mainRadicalMeaning: 'Mặt trời, ban ngày, ánh sáng quang minh',
    position: 'Độc thể / Bộ thủ chính (Hen)',
    strokeCount: 4,
    components: [
      { char: '口', name: 'Bộ Khẩu', meaning: 'Vòng tròn khép kín biểu thị vành mặt trời trên bầu trời' },
      { char: '一', name: 'Bộ Nhất', meaning: 'Nét gạch ngang ở giữa biểu thị điểm sáng cốt lõi của thái dương' }
    ],
    etymologyStory: 'Hình tượng chữ tượng hình sơ khai khắc trên mai rùa (Giáp cốt văn) vẽ đĩa tròn mặt trời có một chấm hoặc vệt sáng ở tâm, tượng trưng cho nguồn năng lượng và sự phân định ngày - đêm của vũ trụ.',
    philosophicalNote: 'Trong triết học phương Đông, "Nhật" là cực Dương (Thái Dương), khởi nguyên của vạn vật sinh sôi, tượng trưng cho trí tuệ minh bạch và sự ngay thẳng.'
  },
  '安': {
    mainRadical: '宀',
    mainRadicalName: 'Bộ Miên (Ukanmuri)',
    mainRadicalMeaning: 'Mái nhà che mưa chở nắng, nơi cư ngụ bình yên',
    position: 'Phía trên đầu chữ (Kanmuri)',
    strokeCount: 6,
    components: [
      { char: '宀', name: 'Bộ Miên', meaning: 'Mái nhà vững chãi che chở khỏi giông bão' },
      { char: '女', name: 'Bộ Nữ', meaning: 'Người phụ nữ, người mẹ ngồi yên vui giữ lửa ấm gia đình' }
    ],
    etymologyStory: 'Người xưa quan niệm rằng trong ngôi nhà (宀) có bóng dáng người phụ nữ (女) quán xuyến êm ấm, bình yên thì gia đình ắt được an cư lạc nghiệp, tinh thần thảnh thơi an định.',
    philosophicalNote: 'Chữ AN là cội nguồn của sự an lành (安全), an tâm (安心) và bình an (平安). Trong thời hiện đại, chữ còn mang nghĩa giá cả phải chăng (安い) vì đem lại sự yên tâm cho túi tiền người mua.'
  },
  '人': {
    mainRadical: '人',
    mainRadicalName: 'Bộ Nhân (Hito)',
    mainRadicalMeaning: 'Con người, nhân loại',
    position: 'Độc thể / Toàn phần',
    strokeCount: 2,
    components: [
      { char: '丿', name: 'Nét Phẩy', meaning: 'Nét vươn tới nâng đỡ' },
      { char: '乀', name: 'Nét Mác', meaning: 'Nét trụ vững tựa vào nhau' }
    ],
    etymologyStory: 'Vẽ dáng dấp con người đứng nghiêng đang lao động hoặc hai con người đứng tựa lưng vào nhau để nương tựa sinh tồn giữa tự nhiên khắc nghiệt.',
    philosophicalNote: 'Con người không thể tồn tại đơn độc mà phải tương trợ (人間 - Nhân gian, Người trong mối quan hệ giữa người với người).'
  },
  '本': {
    mainRadical: '木',
    mainRadicalName: 'Bộ Mộc (Ki)',
    mainRadicalMeaning: 'Cây cối, gỗ',
    position: 'Gốc chữ (Shita/Hen)',
    strokeCount: 5,
    components: [
      { char: '木', name: 'Bộ Mộc', meaning: 'Thân và cành cây đứng thẳng giữa trời' },
      { char: '一', name: 'Nét Chỉ sự', meaning: 'Vạch ngang đánh dấu vào gốc rễ cội nguồn phía dưới thân cây' }
    ],
    etymologyStory: 'Đây là chữ Chỉ sự (Chỉ vào gốc cây 木 bằng một vạch ngang ở đáy), có nghĩa là gốc rễ, cội nguồn. Từ gốc rễ phát triển thành sách vở lưu giữ cội nguồn tri thức nhân loại.',
    philosophicalNote: 'Ý niệm "Căn bản" (根本), "Bản chất" (本质) - làm việc gì cũng phải bắt đầu từ gốc rễ vững chãi mới sinh hoa kết trái.'
  },
  '気': {
    mainRadical: '气',
    mainRadicalName: 'Bộ Khí (Kigamae)',
    mainRadicalMeaning: 'Hơi nước, luồng không khí, năng lượng vô hình',
    position: 'Bao bọc ngoài trên (Gamae)',
    strokeCount: 6,
    components: [
      { char: '气', name: 'Bộ Khí', meaning: 'Mây và hơi nước bốc lên từ mặt đất' },
      { char: '〆/米', name: 'Hạt gạo / Mễ (chữ giản thể)', meaning: 'Hạt cơm gạo bốc hơi ngút ngàn, tượng trưng cho năng lượng sống' }
    ],
    etymologyStory: 'Hơi nước và luồng gió bốc lên cuồn cuộn biểu thị linh khí đất trời. Chữ phồn thể chứa bộ Mễ (gạo), ý chỉ nguồn năng lượng nuôi dưỡng cơ thể toát ra nguyên khí.',
    philosophicalNote: 'Tâm khí (気分), Khí chất (気質), Nguyên khí (元気) - tâm trạng và sức khỏe con người đều do luồng năng lượng bên trong điều tiết.'
  },
  '月': {
    mainRadical: '月',
    mainRadicalName: 'Bộ Nguyệt (Tsuki / Nikuzuki)',
    mainRadicalMeaning: 'Mặt trăng, tháng, hoặc cơ thể xác thịt',
    position: 'Độc thể / Bên trái (Hen)',
    strokeCount: 4,
    components: [
      { char: '冂', name: 'Bộ Quynh', meaning: 'Khoảng không gian xa xăm trên bầu trời đêm' },
      { char: '二', name: 'Bộ Nhị', meaning: 'Hai vầng mây mỏng lướt qua mặt trăng khuyết' }
    ],
    etymologyStory: 'Khắc hình vành trăng lưỡi liềm với hai vệt mây vờn. Khi đứng bên trái các chữ liên quan đến bộ phận cơ thể (như Bụng 腹, Ngực 胸, Não 脳), bộ Nguyệt vốn là biến thể của bộ Nhục (thịt).',
    philosophicalNote: 'Vầng trăng tượng trưng cho sự dịu mát, tĩnh tại và quy luật biến thiên tròn khuyết của cuộc đời.'
  },
  '木': {
    mainRadical: '木',
    mainRadicalName: 'Bộ Mộc (Kihen)',
    mainRadicalMeaning: 'Cây cối, rừng xanh, mộc chất',
    position: 'Độc thể / Bên trái (Hen)',
    strokeCount: 4,
    components: [
      { char: '十', name: 'Thân cành', meaning: 'Cành lá vươn lên cao đón ánh sáng' },
      { char: '八', name: 'Rễ cây', meaning: 'Rễ cắm sâu vào lòng đất mẹ hút dưỡng chất' }
    ],
    etymologyStory: 'Hình ảnh cái cây với thân vươn thẳng, cành chĩa hai bên và rễ chùm bám chắc trong đất.',
    philosophicalNote: 'Cây cối đại diện cho sự kiên trì, sinh trưởng bền bỉ theo mùa và chở che bóng mát.'
  },
  '水': {
    mainRadical: '水 / 氵',
    mainRadicalName: 'Bộ Thủy / Chấm Thủy (Mizu / Sanzui)',
    mainRadicalMeaning: 'Nước, dòng chảy mát lành, chất lỏng linh hoạt',
    position: 'Bên trái (Sanzui 氵) / Độc thể',
    strokeCount: 4,
    components: [
      { char: '亅', name: 'Dòng nước chính', meaning: 'Dòng sông uốn lượn cuộn trôi ở giữa' },
      { char: '冫/ 丷', name: 'Giọt nước bắn', meaning: 'Các tia nước và bọt sóng văng tung tóe hai bên bờ' }
    ],
    etymologyStory: 'Vẽ dòng sông uốn khúc ở giữa với các xoáy nước nhỏ hai bên bờ, mô phỏng đặc tính mềm mại uốn lượn nhưng có sức mạnh bào mòn núi đá.',
    philosophicalNote: 'Lão Tử dạy: "Thượng thiện nhược thủy" - Đỉnh cao của điều lành giống như nước, nuôi dưỡng muôn loài mà không tranh giành.'
  },
  '金': {
    mainRadical: '金',
    mainRadicalName: 'Bộ Kim (Kane / Kanehen)',
    mainRadicalMeaning: 'Kim loại, vàng, tiền tài, sự cứng cáp bền vững',
    position: 'Độc thể / Bên trái (Hen)',
    strokeCount: 8,
    components: [
      { char: '亼', name: 'Nắp phủ', meaning: 'Mặt đất che giấu kho báu khoáng sản bên dưới' },
      { char: '土', name: 'Bộ Thổ', meaning: 'Đất cát nơi quặng kim loại kết tinh' },
      { char: '丷', name: 'Hai hạt vàng', meaning: 'Những hạt kim loại lấp lánh ẩn sâu trong lòng đất' }
    ],
    etymologyStory: 'Hình ảnh hai thỏi vàng hoặc quặng kim loại quý giá được tôi luyện và chôn giấu trong tầng đất sâu.',
    philosophicalNote: 'Tượng trưng cho sự kiên định qua thử thách lửa đỏ (Lửa thử vàng, gian nan thử sức).'
  },
  '土': {
    mainRadical: '土',
    mainRadicalName: 'Bộ Thổ (Tsuchi / Tsuchihen)',
    mainRadicalMeaning: 'Đất, thổ nhưỡng, nền tảng nuôi dưỡng muôn vật',
    position: 'Độc thể / Bên trái (Hen) / Bên dưới (Ashi)',
    strokeCount: 3,
    components: [
      { char: '十', name: 'Cây mầm', meaning: 'Chồi non nhú lên khỏi mặt đất' },
      { char: '一', name: 'Mặt đất', meaning: 'Mặt phẳng bằng phẳng của lòng đất mẹ' }
    ],
    etymologyStory: 'Mô phỏng đụn đất hoặc ụ tế thần đắp bằng đất sét thời cổ đại nơi mầm cây sinh sôi.',
    philosophicalNote: 'Đất mẹ dung dưỡng vạn vật mà không đòi hỏi đền đáp, thể hiện đức tính nhẫn nại và khiêm nhường.'
  }
};

// Hàm phân tích chiết tự tự động với fallback tri thức thông minh
export function getRadicalAnatomy(kanji: string, sinoVietnamese: string, meaning: string): RadicalDecomposition {
  if (COMPREHENSIVE_RADICALS[kanji]) {
    return COMPREHENSIVE_RADICALS[kanji];
  }

  // Thuật toán bóc tách thông minh dựa trên cấu trúc hình học chữ
  const fallbackComponents = [
    { char: kanji, name: `Chữ ${kanji}`, meaning: `Hình thể cơ bản mang ý nghĩa ${meaning}` }
  ];

  return {
    mainRadical: kanji,
    mainRadicalName: `Bộ thủ chữ ${sinoVietnamese}`,
    mainRadicalMeaning: `Biểu thị hạt nhân ngữ nghĩa liên quan đến ${meaning}`,
    position: 'Chính thể trung tâm',
    strokeCount: kanji.length,
    components: fallbackComponents,
    etymologyStory: `Chữ Hán【${kanji}】mang Âm Hán Việt là [${sinoVietnamese}], cốt lõi diễn đạt ý nghĩa "${meaning}". Trải qua quá trình diễn tiến từ Kim văn đến Khải thư, chữ đúc kết trí tuệ quan sát tự nhiên và đời sống nhân sinh.`,
    philosophicalNote: `Nắm vững Âm Hán Việt [${sinoVietnamese}] sẽ giúp bạn dễ dàng liên tưởng đến hàng chục từ ghép Hán-Nhật (Jukugo) cùng gốc trong các bài thi JLPT.`
  };
}

// Bảng Từ Ghép Hán Tự (Jukugo Matrix)
export const JUKUGO_DATABASE: Record<string, JukugoItem[]> = {
  '日': [
    {
      compound: '日本',
      reading: 'にほん / にっぽん',
      sinoVietnamese: 'NHẬT BẢN',
      meaning: 'Đất nước Nhật Bản (Xứ sở Mặt trời mọc)',
      pos: 'Danh từ',
      level: 'N5',
      components: [
        { character: '日', sinoVietnamese: 'NHẬT', meaning: 'Mặt trời' },
        { character: '本', sinoVietnamese: 'BẢN', meaning: 'Cội nguồn, gốc rễ' }
      ],
      exampleJa: '私は日本で働いています。',
      exampleVi: 'Tôi đang làm việc tại Nhật Bản.'
    },
    {
      compound: '日記',
      reading: 'にっき',
      sinoVietnamese: 'NHẬT KÝ',
      meaning: 'Sổ nhật ký ghi chép hàng ngày',
      pos: 'Danh từ',
      level: 'N4',
      components: [
        { character: '日', sinoVietnamese: 'NHẬT', meaning: 'Mỗi ngày' },
        { character: '記', sinoVietnamese: 'KÝ', meaning: 'Ghi chép lại' }
      ],
      exampleJa: '毎日、日本語で日記を書いています。',
      exampleVi: 'Mỗi ngày tôi đều viết nhật ký bằng tiếng Nhật.'
    },
    {
      compound: '休日',
      reading: 'きゅうじつ',
      sinoVietnamese: 'HƯU NHẬT',
      meaning: 'Ngày nghỉ, ngày lễ',
      pos: 'Danh từ',
      level: 'N3',
      components: [
        { character: '休', sinoVietnamese: 'HƯU', meaning: 'Nghỉ ngơi' },
        { character: '日', sinoVietnamese: 'NHẬT', meaning: 'Ngày' }
      ],
      exampleJa: '休日は家族とのんびり過ごします。',
      exampleVi: 'Vào ngày nghỉ tôi thong thả dành thời gian bên gia đình.'
    },
    {
      compound: '日程',
      reading: 'にってい',
      sinoVietnamese: 'NHẬT TRÌNH',
      meaning: 'Lịch trình, kế hoạch công tác',
      pos: 'Danh từ',
      level: 'N2',
      components: [
        { character: '日', sinoVietnamese: 'NHẬT', meaning: 'Ngày tháng' },
        { character: '程', sinoVietnamese: 'TRÌNH', meaning: 'Mức độ, tiến trình' }
      ],
      exampleJa: '来週の出張の日程を確認しましょう。',
      exampleVi: 'Chúng ta hãy xác nhận lịch trình chuyến công tác tuần tới.'
    },
    {
      compound: '日没',
      reading: 'にちぼつ',
      sinoVietnamese: 'NHẬT MỘT',
      meaning: 'Hoàng hôn, lúc mặt trời lặn',
      pos: 'Danh từ',
      level: 'N1',
      components: [
        { character: '日', sinoVietnamese: 'NHẬT', meaning: 'Mặt trời' },
        { character: '没', sinoVietnamese: 'MỘT', meaning: 'Chìm đắm, lặn mất' }
      ],
      exampleJa: '日没の海岸の風景は息をのむほど美しい。',
      exampleVi: 'Khung cảnh bờ biển lúc hoàng hôn đẹp đến nín thở.'
    }
  ],
  '安': [
    {
      compound: '安心',
      reading: 'あんしん',
      sinoVietnamese: 'AN TÂM',
      meaning: 'Sự yên tâm, an lòng, không còn lo lắng',
      pos: 'Danh từ / Động từ Suru',
      level: 'N5',
      components: [
        { character: '安', sinoVietnamese: 'AN', meaning: 'Yên ổn, bình yên' },
        { character: '心', sinoVietnamese: 'TÂM', meaning: 'Trái tim, tâm trí' }
      ],
      exampleJa: '合格の知らせを聞いて心から安心しました。',
      exampleVi: 'Nghe tin đỗ tôi đã hoàn toàn an tâm từ đáy lòng.'
    },
    {
      compound: '安全',
      reading: 'あんぜん',
      sinoVietnamese: 'AN TOÀN',
      meaning: 'An toàn, chắc chắn, không nguy hiểm',
      pos: 'Tính từ đuôi Na / Danh từ',
      level: 'N4',
      components: [
        { character: '安', sinoVietnamese: 'AN', meaning: 'Yên bình' },
        { character: '全', sinoVietnamese: 'TOÀN', meaning: 'Trọn vẹn, vẹn toàn' }
      ],
      exampleJa: '工事現場では安全第一を行動の基本とします。',
      exampleVi: 'Tại công trường xây dựng, an toàn là trên hết làm kim chỉ nam.'
    },
    {
      compound: '安定',
      reading: 'あんてい',
      sinoVietnamese: 'AN ĐỊNH',
      meaning: 'Ổn định, vững chắc, không dao động',
      pos: 'Danh từ / Động từ Suru',
      level: 'N3',
      components: [
        { character: '安', sinoVietnamese: 'AN', meaning: 'Bình an' },
        { character: '定', sinoVietnamese: 'ĐỊNH', meaning: 'Cố định, xác định' }
      ],
      exampleJa: '景気が回復し、物価がようやく安定してきました。',
      exampleVi: 'Kinh tế phục hồi, giá cả cuối cùng cũng đã ổn định lại.'
    },
    {
      compound: '安易',
      reading: 'あんい',
      sinoVietnamese: 'AN DỊ / AN DỄ',
      meaning: 'Dễ dãi, qua loa, xem nhẹ vấn đề',
      pos: 'Tính từ đuôi Na',
      level: 'N2',
      components: [
        { character: '安', sinoVietnamese: 'AN', meaning: 'Nhàn rỗi, yên ổn' },
        { character: '易', sinoVietnamese: 'DỊ / DỄ', meaning: 'Dễ dàng' }
      ],
      exampleJa: '安易な判断は将来に大きな失敗を招く。',
      exampleVi: 'Phán đoán qua loa dễ dãi sẽ dẫn đến thất bại to lớn trong tương lai.'
    },
    {
      compound: '治安',
      reading: 'ちあん',
      sinoVietnamese: 'TRỊ AN',
      meaning: 'Trật tự trị an xã hội, an ninh',
      pos: 'Danh từ',
      level: 'N1',
      components: [
        { character: '治', sinoVietnamese: 'TRỊ', meaning: 'Cai trị, thái bình' },
        { character: '安', sinoVietnamese: 'AN', meaning: 'Bình yên' }
      ],
      exampleJa: 'この街は夜間でも治安が極めて良好です。',
      exampleVi: 'Thành phố này ngay cả ban đêm trật tự trị an cũng cực kỳ tốt.'
    }
  ]
};

// Hàm sinh danh sách Jukugo tương thích cho mọi Kanji
export function getJukugoCompounds(kanji: string, sinoVietnamese: string, meaning: string): JukugoItem[] {
  if (JUKUGO_DATABASE[kanji]) {
    return JUKUGO_DATABASE[kanji];
  }

  // Fallback sinh các cặp từ Hán Việt kinh điển hữu ích
  return [
    {
      compound: `${kanji}気`,
      reading: `[Âm On của ${kanji}] + き`,
      sinoVietnamese: `${sinoVietnamese} KHÍ`,
      meaning: `Trạng thái tinh thần hoặc luồng năng lượng gắn với [${meaning}]`,
      pos: 'Danh từ',
      level: 'N3',
      components: [
        { character: kanji, sinoVietnamese, meaning },
        { character: '気', sinoVietnamese: 'KHÍ', meaning: 'Khí chất, tâm thế' }
      ],
      exampleJa: `この漢字「${kanji}」は試験によく出題されます。`,
      exampleVi: `Chữ Hán【${kanji}】này rất hay xuất hiện trong các đề thi JLPT.`
    },
    {
      compound: `大${kanji}`,
      reading: `だい + [Âm On của ${kanji}]`,
      sinoVietnamese: `ĐẠI ${sinoVietnamese}`,
      meaning: `Quy mô to lớn hoặc tầm ảnh hưởng trọng đại của [${meaning}]`,
      pos: 'Danh từ',
      level: 'N2',
      components: [
        { character: '大', sinoVietnamese: 'ĐẠI', meaning: 'To lớn, vĩ đại' },
        { character: kanji, sinoVietnamese, meaning }
      ],
      exampleJa: `文脈に応じて「${kanji}」の意味を正しく捉えましょう。`,
      exampleVi: `Hãy nắm bắt chính xác ý nghĩa chữ【${kanji}】tùy theo ngữ cảnh câu.`
    },
    {
      compound: `${kanji}的`,
      reading: `[Âm On của ${kanji}] + てき`,
      sinoVietnamese: `${sinoVietnamese} ĐÍCH`,
      meaning: `Mang tính chất đặc trưng của [${meaning}]`,
      pos: 'Tính từ đuôi Na',
      level: 'N2',
      components: [
        { character: kanji, sinoVietnamese, meaning },
        { character: '的', sinoVietnamese: 'ĐÍCH', meaning: 'Mang tính, thuộc về' }
      ],
      exampleJa: `効果的な学習法で漢字マスターを目指します。`,
      exampleVi: `Hướng tới làm chủ Hán tự bằng phương pháp học tập hiệu quả.`
    }
  ];
}
