export interface JapaneseMakeupLayout {
  id: string;
  name: string;
  jpName: string;
  romaji: string;
  badge: string;
  vibe: string;
  targetTone: 'Mọi tone da' | 'Cool tone (Da tông lạnh)' | 'Warm tone (Da tông ấm)' | 'Da sáng tự nhiên';
  tagColor: string;

  // Chi tiết 5 vùng trang điểm
  features: {
    base: {
      title: string;
      technique: string;
      finish: 'Matte mịn lì' | 'Semi-matte da mochi' | 'Dewy căng bóng' | 'Glass-skin trong suốt';
      proTip: string;
    };
    eyes: {
      title: string;
      eyeshadow: string;
      namidaBukuro: string; // Bọng mắt
      eyeliner: string;
      lashes: string;
      proTip: string;
    };
    brows: {
      title: string;
      shape: string;
      color: string;
      technique: string;
    };
    cheeks: {
      title: string;
      placement: string;
      colors: string;
      technique: string;
    };
    lips: {
      title: string;
      colors: string;
      finish: string;
      technique?: string;
      proTip?: string;
    };
  };

  // Gợi ý mỹ phẩm tiêu biểu (J-Beauty holy grails)
  recommendedProducts: {
    category: string;
    productName: string;
    brand: string;
    whyLoved: string;
  }[];

  // 3 Bí quyết vàng thực chiến
  goldenRules: string[];

  // Mục giải thích chuyên sâu (Cultural & Technical In-depth Explanation)
  deepExplanation?: {
    historyAndPhilosophy: string;
    asianFacialAnatomy: string;
    colorTheory: string;
    commonMistakes: string[];
    proSecrets: string;
    fashionMatchAdvice: string;
  };
}

export interface JBeautySkincareStep {
  stepNumber: number;
  stepName: string;
  jpName: string;
  romaji: string;
  purpose: string;
  technique: string;
  holyGrailProduct: string;
  proTip: string;
  deepExplanation?: {
    biologicalMechanism: string;
    skinBarrierScience: string;
    proAdvice: string;
  };
}

export interface BeautyVocabularyItem {
  term: string;
  reading: string;
  romaji: string;
  meaning: string;
  contextUsage: string;
  deepExplanation?: {
    culturalNuance: string;
    originEra: string;
    howToUseInSentence: string;
  };
}

export const JAPANESE_MAKEUP_LAYOUTS: JapaneseMakeupLayout[] = [
  {
    id: 'shoujo_doll',
    name: 'Shoujo Manga Doll (Thiếu Nữ Búp Bê Manga)',
    jpName: '少女漫画風・涙袋ドールメイク',
    romaji: 'Shoujo Manga-fuu Namida-bukuro Dooru Meiku',
    badge: 'Top 1 Yêu Thích · Mộng Mơ Thuần Khiết',
    vibe: 'Trong trẻo, đôi mắt to tròn long lanh biết cười như bước ra từ trang truyện tranh thiếu nữ',
    targetTone: 'Mọi tone da',
    tagColor: 'from-pink-500/20 to-rose-500/10 border-pink-500/40 text-pink-300',

    features: {
      base: {
        title: 'Lớp nền Mochi-hada (Da bánh nếp dẻo)',
        technique: 'Dưỡng ẩm sâu trước khi trang điểm, dùng cushion bán lì dặm từ giữa mặt lan ra ngoài, phủ phấn bột ngọc trai kiềm dầu vùng chữ T.',
        finish: 'Semi-matte da mochi',
        proTip: 'Không đánh nền quá dày; giữ lại độ ửng hồng tự nhiên của làn da thiếu nữ.',
      },
      eyes: {
        title: 'Đôi mắt to tròn & Bọng mắt 3D ngọc trai',
        eyeshadow: 'Phấn mắt hồng đào kết hợp nâu nhạt hạnh nhân tán nhẹ hốc mắt, nhấn nhũ mịn ở tâm bầu mắt.',
        namidaBukuro: 'Kẻ rãnh bọng mắt bằng chì nâu nhạt cách mi dưới 3mm; dặm nhũ champagne ngọc trai ở giữa bọng mắt tạo ánh nhìn ướt át long lanh.',
        eyeliner: 'Kẻ mắt nét mảnh màu nâu sẫm, kéo ngang và chúc nhẹ đuôi mắt 15 độ (Tare-me) tạo ánh nhìn hiền dịu ngây thơ.',
        lashes: 'Kẹp mi cong chữ C, chuốt mascara tơi mi tự nhiên hoặc gắn mi chùm búp bê sợi mảnh.',
        proTip: 'Dùng tăm bông dặm nhẹ đường chì bọng mắt để nét vẽ hòa tan tự nhiên vào da.',
      },
      brows: {
        title: 'Lông mày sương mai mềm mại (Yawa-mayu)',
        shape: 'Dáng mày ngang cong nhẹ ở đuôi, tỉa gọn gàng tự nhiên.',
        color: 'Nâu sáng hơn màu tóc 1 tone.',
        technique: 'Dùng bột tán mày nâu nhạt, chuốt mascara lông mày trong suốt giữ nếp tơi.',
      },
      cheeks: {
        title: 'Má hồng say nắng e ấp (Igari flush)',
        placement: 'Tán tròn ngay sát dưới bọng mắt và phớt nhẹ qua sống mũi.',
        colors: 'Hồng sữa hoa anh đào (Sakura Pink) hoặc cam đào san hô.',
        technique: 'Dùng cọ bung mềm xoay tròn nhẹ tay, tạo cảm giác má ửng đỏ như vừa ngượng ngùng.',
      },
      lips: {
        title: 'Môi kẹo thạch thủy tinh (Garasu-dama)',
        colors: 'Hồng đất nhạt hoặc cam đào mọng nước.',
        finish: 'Bóng căng mọng nước như kẹo hồ lô (Plumping glass gloss).',
        technique: 'Thoa son tint màu đào ở lòng môi, tán mờ viền môi bằng ngón tay, phủ son bóng trong suốt tràn viền.',
      },
    },

    recommendedProducts: [
      { category: 'Phấn mắt & Bọng mắt', productName: 'Silky Souffle Eyes 02', brand: 'Canmake Tokyo', whyLoved: 'Chất phấn mịn như lụa, nhũ ngọc trai bắt sáng siêu thực' },
      { category: 'Eyeliner siêu mảnh', productName: 'Prime Liquid Eyeliner 02 Brown', brand: 'Kissme Heroine Make', whyLoved: 'Đầu cọ 0.1mm chống trôi nước mắt và mồ hôi tuyệt đối' },
      { category: 'Son bóng nước', productName: 'Watery Tint Lip 01', brand: 'Cezanne', whyLoved: 'Tạo hiệu ứng môi mọng như thủy tinh không gây bết dính' },
      { category: 'Má hồng kem', productName: 'Cream Cheek 21', brand: 'Canmake', whyLoved: 'Tan chảy vào da tạo hiệu ứng má ửng tự nhiên từ bên trong' },
    ],

    goldenRules: [
      'Điểm nhấn duy nhất là đôi mắt bọng cười long lanh; các phần khác tiết chế nhẹ nhàng.',
      'Ưu tiên tông nâu ấm và hồng phấn thay cho màu đen tuyền để giữ nét ngây thơ.',
      'Luôn tán mờ viền môi để tạo cảm giác tự nhiên, không viền cứng nhắc.',
    ],
  },

  {
    id: 'meimei_glass_skin',
    name: 'Mei Mei Glass-Skin (Nàng Thơ TikTok @nnmeii)',
    jpName: 'メイメイ風・透明感ガラス肌メイク',
    romaji: 'Meimei-fu Toumeikan Garasu-hada Meiku',
    badge: 'Cơn Sốt TikTok · Tôn Nhan Sắc Triệu View',
    vibe: 'Căng mọng, bắt sáng đỉnh cao khi quay video, vừa ngọt ngào quyến rũ vừa hiện đại',
    targetTone: 'Mọi tone da',
    tagColor: 'from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300',

    features: {
      base: {
        title: 'Lớp nền Glass-skin mướt như sương (Dewy Finish)',
        technique: 'Trộn 1 giọt dầu dưỡng hoặc tinh chất cấp ẩm vào cushion, vỗ đều khắp mặt tạo màng bóng gương phản chiếu ánh sáng tự nhiên.',
        finish: 'Glass-skin trong suốt',
        proTip: 'Che khuyết điểm cẩn thận góc cánh mũi và khóe miệng để tổng thể gương mặt sáng bừng.',
      },
      eyes: {
        title: 'Đôi mắt to tròn mở góc & Mi anime tách sợi',
        eyeshadow: 'Tông màu cam đào nude ấm áp, nhấn nhũ lỏng đa sắc ở mi dưới và đầu mắt.',
        namidaBukuro: 'Kẻ bọng mắt rõ nét, dặm nhũ glitter hạt lớn ở giữa mắt tạo hiệu ứng lấp lánh hút mắt trước ống kính.',
        eyeliner: 'Kẻ mắt dạ nâu đen kéo dài mảnh, hơi vát nhẹ tạo vẻ quyến rũ tinh tế.',
        lashes: 'Gắn mi giả từng chùm tách sợi chữ A (Manga lashes), chuốt mi dưới tơi dài.',
        proTip: 'Chuốt mascara mi dưới theo chiều dọc để sợi mi tơi dài như búp bê.',
      },
      brows: {
        title: 'Lông mày cong nhẹ phẩy sợi tự nhiên',
        shape: 'Độ cong nhẹ nhàng, tỉa thanh mảnh tôn đường nét thanh tú.',
        color: 'Nâu tro (Ash brown) hoặc nâu trà sữa.',
        technique: 'Phẩy từng sợi mảnh ở đầu mày, tán bột nhạt dần về phía đuôi.',
      },
      cheeks: {
        title: 'Má hồng Douyin x Igari loang sống mũi',
        placement: 'Má hồng dạng kem tán lan từ dưới bọng mắt vắt ngang qua giữa sống mũi và chóp mũi.',
        colors: 'Hồng sữa dâu tây hoặc cam san hô mọng nước.',
        technique: 'Dặm bằng mút ẩm để má hồng tệp sâu vào lớp nền căng bóng.',
      },
      lips: {
        title: 'Đôi môi mọng nước tràn viền mờ ảo (Juicy Lip)',
        colors: 'Đỏ anh đào nhạt hoặc hồng trà đào.',
        finish: 'Bóng nước căng mọng làm đầy rãnh môi.',
        technique: 'Dùng cọ tán mờ viền môi trên để tạo cảm giác môi đầy đặn hơn, phủ son bóng thấu kính.',
      },
    },

    recommendedProducts: [
      { category: 'Cushion bắt sáng', productName: 'Tirtir Mask Fit Crystal Mesh Cushion', brand: 'Tirtir Japan', whyLoved: 'Độ căng bóng như gương bền màu suốt 24 giờ' },
      { category: 'Nhũ mắt bọng cười', productName: 'Tear Shine Eye Glitter', brand: 'Cipicipi', whyLoved: 'Đầu cọ nhọn siêu vi, nhũ kim tuyến bắt sáng tuyệt đối khi lên video' },
      { category: 'Mi giả Anime', productName: 'Manga Lash Clusters A-type', brand: 'D-Up', whyLoved: 'Mi sợi đơn nhẹ tênh không gây cộm mắt' },
      { category: 'Son dưỡng bóng', productName: 'Lip Fondue Plumper', brand: 'Mentholatum Rohto', whyLoved: 'Làm đầy rãnh môi tức thì, độ bóng sánh mịn như mật ong' },
    ],

    goldenRules: [
      'Ánh sáng bắt trọn ở sống mũi, chóp mũi, gò má và bọng mắt.',
      'Má hồng vắt ngang sống mũi là chữ ký nhận diện nét ngây thơ đáng yêu.',
      'Mi tách sợi chữ A giúp đôi mắt sâu thẳm mà không hề bị nặng mắt.',
    ],
  },

  {
    id: 'jirai_kei_dark',
    name: 'Jirai Kei Shinjuku (Búp Bê Đen Hồng Kabukicho)',
    jpName: '地雷系・歌舞伎町病みかわメイク',
    romaji: 'Jirai-kei Kabukicho Yami-kawa Meiku',
    badge: 'Cá Tính Shinjuku · Bí Ẩn Ma Mị',
    vibe: 'Sự pha trộn đối lập giữa nét dễ thương mong manh và vẻ u buồn, ma mị, sắc sảo',
    targetTone: 'Cool tone (Da tông lạnh)',
    tagColor: 'from-purple-600/20 to-pink-600/10 border-purple-500/40 text-purple-300',

    features: {
      base: {
        title: 'Lớp nền sứ trắng sáng lì tuyệt đối (Porcelain Skin)',
        technique: 'Dùng kem lót nâng tông tím khử vàng da, đánh nền trắng hơn 1 tone tạo vẻ đẹp ma mị như tượng sứ, phủ phấn bột lì không bóng dầu.',
        finish: 'Matte mịn lì',
        proTip: 'Đánh khối nhẹ ở cánh mũi và xương quai hàm để khuôn mặt sắc nét, nhỏ nhắn.',
      },
      eyes: {
        title: 'Mắt đỏ mận u sầu khóc nhè (Naki-gao 泣き顔)',
        eyeshadow: 'Tán phấn mắt màu đỏ mận, đỏ rượu vang hoặc đỏ mâm xôi khắp bầu mắt và viền mi dưới.',
        namidaBukuro: 'Bọng mắt siêu to viền đỏ tím: Kẻ rãnh bọng mắt sâu, phủ phấn mắt đỏ berry dưới mi mắt tạo cảm giác như vừa khóc xong cần được che chở.',
        eyeliner: 'Eyeliner dạ đen tuyền kẻ dày, kéo dài sắc lẹm ngang khóe mắt và hất nhẹ góc nhọn.',
        lashes: 'Gắn mi giả búp bê dày rậm, đặc biệt chuốt mascara mi dưới thật đậm tạo ánh nhìn ma mị.',
        proTip: 'Dùng nhũ kim tuyến ánh tím hoặc đỏ dặm ở khóe mắt trong.',
      },
      brows: {
        title: 'Lông mày đen nhánh thanh mảnh hơi cụp',
        shape: 'Dáng mày hơi chúc nhẹ về đuôi tạo vẻ mặt u buồn, trầm ngâm.',
        color: 'Đen xám hoặc đen nhánh.',
        technique: 'Kẻ sắc nét từng đường, không tán bột quá nhạt.',
      },
      cheeks: {
        title: 'Má hồng đỏ ửng sốt (Fever blush)',
        placement: 'Tán ngay sát mí mắt dưới kéo dài ra thái dương.',
        colors: 'Đỏ rượu vang hoặc hồng tím mận chín.',
        technique: 'Tán đậm màu ở sát mi dưới rồi loang nhạt dần xuống gò má.',
      },
      lips: {
        title: 'Lòng môi đỏ thẫm đẫm sương (Gothic Ombre Lip)',
        colors: 'Đỏ mận, đỏ cherry đậm hoặc đỏ đen ma cà rồng.',
        finish: 'Lòng môi bóng nhẹ, viền môi lì mờ ảo.',
        technique: 'Thoa son đỏ đậm ở lòng môi trong, viền môi dùng kem che khuyết điểm làm mờ.',
      },
    },

    recommendedProducts: [
      { category: 'Kem lót khử vàng', productName: 'Skin Protector Color Control 01 Purple', brand: 'Addiction Tokyo', whyLoved: 'Nâng tông da trắng sứ thuần khiết không bị bợt' },
      { category: 'Phấn mắt đỏ mận', productName: 'Perfect Stylist Eyes 14 Antique Ruby', brand: 'Canmake', whyLoved: 'Tông màu đỏ đá quý ma mị huyền thoại của phong trào Jirai' },
      { category: 'Mascara mi dày cong', productName: 'Volume & Curl Mascara Super Waterproof 01 Jet Black', brand: 'Kissme Heroine Make', whyLoved: 'Giữ mi dưới đậm nét suốt cả ngày không lem' },
      { category: 'Son đỏ trầm', productName: 'Lip Monster 07 Last Boss', brand: 'Kate Tokyo', whyLoved: 'Màu đỏ mận huyền bí bám màu cực đỉnh' },
    ],

    goldenRules: [
      'Bọng mắt đỏ mận là linh hồn không thể thay thế của phong cách Jirai Kei.',
      'Sự tương phản giữa lớp da trắng sứ và đôi mắt viền đỏ đen tạo nên vẻ đẹp ma mị cuốn hút.',
      'Eyeliner phải sắc nét, mi dưới phải được chuốt đậm rõ từng sợi.',
    ],
  },

  {
    id: 'ryousangata_sweet',
    name: 'Ryousangata Oshi Sweet (Tiểu Thư Kẹo Ngọt Concert)',
    jpName: '量産型オタク・うるつやピンクメイク',
    romaji: 'Ryousangata Otaku Uru-tsuya Pinku Meiku',
    badge: 'Tiểu Thư Đi Concert · Lấp Lánh Tuyệt Đối',
    vibe: 'Ngọt ngào, đồng điệu, sáng lấp lánh như viên kẹo bông dành riêng cho buổi gặp thần tượng Oshi',
    targetTone: 'Mọi tone da',
    tagColor: 'from-rose-500/20 to-pink-500/10 border-rose-500/40 text-rose-300',

    features: {
      base: {
        title: 'Lớp nền ngọc trai phát sáng (Pearl Glow Skin)',
        technique: 'Dùng cushion bắt sáng ngọc trai, dùng phấn highlight dặm chữ C quanh hốc mắt, sống mũi và nhân trung.',
        finish: 'Dewy căng bóng',
        proTip: 'Đảm bảo nền da mịn màng, phủ phấn nén ngọc trai bắt sáng hai bên gò má.',
      },
      eyes: {
        title: 'Mắt hồng lấp lánh ngàn sao & Mở góc mắt',
        eyeshadow: 'Tông hồng pastel hoa anh đào phối phấn nhũ vàng kim champagne lộng lẫy.',
        namidaBukuro: 'Bọng mắt siêu sáng: Tán nhũ bạc ánh hồng lấp lánh, đường viền vẽ mềm mại tự nhiên.',
        eyeliner: 'Kẻ mắt nâu sô-cô-la nét mảnh, đuôi mắt hơi cong nhẹ tươi vui.',
        lashes: 'Mi uốn cong vút hình cánh quạt, gắn từng sợi mi đơn mắt nai.',
        proTip: 'Kẻ một đường chì trắng ở khóe mắt trong để mở rộng góc mắt to gấp rưỡi.',
      },
      brows: {
        title: 'Lông mày cong tròn dịu dàng',
        shape: 'Đường cong mềm mại, nữ tính, không góc cạnh.',
        color: 'Nâu sáng caramel hoặc nâu hồng.',
        technique: 'Dùng chì kẻ mảnh chuốt theo hướng lông mày mọc.',
      },
      cheeks: {
        title: 'Má hồng kẹo bông gòn (Cotton candy blush)',
        placement: 'Vị trí cao nhất của gò má, đánh tròn xoay cọ đều.',
        colors: 'Hồng baby nhạt kẹo ngọt.',
        technique: 'Tán thêm một lớp phấn phủ ngọc trai mỏng đè lên trên để má bắt sáng.',
      },
      lips: {
        title: 'Son tint bóng syrup mọng nước (Syrup Lip)',
        colors: 'Hồng hoa đào hoặc đỏ dâu ngọt lịm.',
        finish: 'Bóng kính phủ sương.',
        technique: 'Thoa hai lớp son tint bóng, viền môi tán mờ nhẹ nhàng.',
      },
    },

    recommendedProducts: [
      { category: 'Bảng phấn nhũ mắt', productName: 'Brown Shade Eyes N BR-3', brand: 'Kate Tokyo', whyLoved: 'Độ lấp lánh đỉnh cao dưới ánh đèn sân khấu concert' },
      { category: 'Highlight bắt sáng', productName: 'Pearl Glow Highlight 01 Champagne Beige', brand: 'Cezanne', whyLoved: 'Hạt nhũ siêu mịn tạo hiệu ứng da phát sáng tự nhiên' },
      { category: 'Son bóng siro', productName: 'Fruity Glam Tint 104 Cherry', brand: 'Laka / Canmake Fruity', whyLoved: 'Màu hồng đào mọng nước ngọt ngào như siro hoa quả' },
    ],

    goldenRules: [
      'Toàn bộ tông makeup phải Ton-sur-Ton với sắc hồng pastel ngọt lịm.',
      'Nhũ mắt và highlight là điểm nhấn quan trọng nhất để bắt trọn ánh đèn concert.',
      'Luôn giữ vẻ mặt tươi vui, rạng rỡ, tràn trề sức sống.',
    ],
  },

  {
    id: 'french_girly_chic',
    name: 'French Girly Tokyo (Quý Cô Paris Cổ Điển)',
    jpName: 'フレンチガーリー・クラシックメイク',
    romaji: 'Furenchi Gaarii Kurashikku Meiku',
    badge: 'Quý Tộc Cổ Điển · Thanh Lịch Sang Chảnh',
    vibe: 'Vẻ đẹp đài các phong cách quý cô Pháp hòa quyện nét tinh tế của đường phố Shibuya & Ginza',
    targetTone: 'Warm tone (Da tông ấm)',
    tagColor: 'from-amber-500/20 to-rose-500/10 border-amber-500/40 text-amber-300',

    features: {
      base: {
        title: 'Lớp nền nhung lụa bán lì (Velvet Semi-matte)',
        technique: 'Lớp nền mịn lì như vải nhung, đánh khối gò má tinh tế tạo góc cạnh thanh thoát.',
        finish: 'Semi-matte da mochi',
        proTip: 'Tập trung tạo khối xương hàm và sống mũi cao thanh mảnh chuẩn quý cô phương Tây.',
      },
      eyes: {
        title: 'Mắt khói nâu espresso & Eyeliner mắt mèo mảnh',
        eyeshadow: 'Tông màu nâu be, nâu sô-cô-la ấm áp tán loang mềm mại hốc mắt.',
        namidaBukuro: 'Tạo bóng bọng mắt nhẹ nhàng màu nâu be, không dùng nhũ quá lấp lánh.',
        eyeliner: 'Kẻ eyeliner mắt mèo thanh mảnh vuốt nhọn ở đuôi mắt tạo thần thái kiêu kỳ.',
        lashes: 'Mi chuốt mascara cong vút tự nhiên, tập trung làm dày đuôi mắt.',
        proTip: 'Đánh phấn mắt nâu sẫm viền sát mi dưới tạo chiều sâu bí ẩn.',
      },
      brows: {
        title: 'Lông mày vòng cung thanh tú kiểu Pháp',
        shape: 'Đường cong cổ điển thanh mảnh, định hình rõ đỉnh mày.',
        color: 'Nâu đậm hoặc nâu hạt dẻ ấm áp.',
        technique: 'Kẻ chì sắc nét rồi dùng cọ chải đều.',
      },
      cheeks: {
        title: 'Má hồng màu cánh hồng khô (Dusty rose)',
        placement: 'Tán xéo từ gò má chếch lên thái dương tôn xương gò má.',
        colors: 'Hồng khô, hồng đất hoặc cam đất ấm.',
        technique: 'Tán nhẹ tay tạo cảm giác gò má ửng màu tự nhiên sang trọng.',
      },
      lips: {
        title: 'Môi đỏ rượu nhung lì (French Red Velvet)',
        colors: 'Đỏ rượu vang, đỏ đất hoặc hồng nâu trầm.',
        finish: 'Lì mịn như cánh hoa hồng nhung.',
        technique: 'Thoa kín môi sắc nét, dùng khăn giấy bặm nhẹ tạo độ lì mịn cổ điển.',
      },
    },

    recommendedProducts: [
      { category: 'Son lì mịn môi', productName: 'Rouge Lip Blossom Velvet 03', brand: 'Jill Stuart Beauty', whyLoved: 'Thiết kế gương gập công chúa, chất son mịn như nhung' },
      { category: 'Bảng phấn mắt nâu khói', productName: 'Eye Coloration 15 Flawless Clarity', brand: 'Lunasol Kanebo', whyLoved: 'Đỉnh cao phối màu thanh lịch của giới thượng lưu Tokyo' },
      { category: 'Má hồng đất', productName: 'Natural Cheek N 18 Rose Beige', brand: 'Cezanne', whyLoved: 'Tông màu nâu hồng khô sang trọng tôn mọi góc mặt' },
    ],

    goldenRules: [
      'Điểm nhấn trung tâm là màu son đỏ nhung kiêu kỳ và đường eyeliner mắt mèo mảnh.',
      'Tránh lạm dụng nhũ to hạt; ưu tiên chất phấn mịn lì sang trọng.',
      'Kết hợp hoàn hảo cùng mũ beret, áo dạ tweed và vòng cổ ngọc trai.',
    ],
  },

  {
    id: 'clean_natural_jk',
    name: 'Suppin Natural (Trong Veo Nữ Sinh Đi Học)',
    jpName: 'すっぴん風・ナチュラル学生メイク',
    romaji: 'Suppin-fuu Nachuraru Gakusei Meiku',
    badge: 'Học Đường & Công Sở · Đẹp Như Không Trang Điểm',
    vibe: 'Trong suốt, tự nhiên, làn da tỏa sáng khỏe mạnh như mặt mộc không tì vết',
    targetTone: 'Mọi tone da',
    tagColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300',

    features: {
      base: {
        title: 'Lớp nền sương mỏng nhẹ (No-Makeup Base)',
        technique: 'Dùng kem chống nắng nâng tông nhẹ kết hợp kem che khuyết điểm dạng lỏng chấm các nốt mụn và quầng thâm.',
        finish: 'Dewy căng bóng',
        proTip: 'Không dùng phấn phủ toàn mặt; chỉ phủ nhẹ sống mũi và trán để giữ độ bóng khỏe tự nhiên.',
      },
      eyes: {
        title: 'Đôi mắt mộc tròn trong veo',
        eyeshadow: 'Phấn mắt màu be sáng hoặc cam sữa nhạt gần như tệp màu da.',
        namidaBukuro: 'Dùng cọ nhỏ chấm phấn bắt sáng ngọc trai siêu mịn sát mí dưới tạo độ tươi tắn.',
        eyeliner: 'Dùng chì nâu kẻ sát mi trong (tightline), không kéo dài đuôi mắt.',
        lashes: 'Kẹp mi cong và chuốt mascara không màu (Clear mascara) giữ nếp tơi.',
        proTip: 'Kẻ sát chân mi giúp tròng mắt to tròn hơn mà bạn bè nhìn gần cũng không phát hiện ra.',
      },
      brows: {
        title: 'Lông mày nguyên bản chải nếp tơi',
        shape: 'Giữ trọn dáng mày thật, chỉ tỉa bớt những sợi mọc thừa.',
        color: 'Trùng màu lông mày tự nhiên.',
        technique: 'Dùng mascara lông mày trong suốt chải ngược nhẹ đầu mày.',
      },
      cheeks: {
        title: 'Má ửng hồng tự nhiên sau khi vận động',
        placement: 'Tán nhẹ hai bên gò má bằng ngón tay.',
        colors: 'Hồng đào sữa hoặc cam đào nhạt.',
        technique: 'Dùng son dưỡng có màu thoa nhẹ lên má rồi tán đều.',
      },
      lips: {
        title: 'Đôi môi ửng hồng hào mọng nước (Tinted Balm)',
        colors: 'Hồng tự nhiên hoặc cam san hô mộc.',
        finish: 'Bóng nhẹ dưỡng ẩm.',
        technique: 'Thoa son dưỡng có màu bảo vệ môi chống nứt nẻ và làm tươi tắn bờ môi.',
      },
    },

    recommendedProducts: [
      { category: 'Kem chống nắng nâng tông', productName: 'Skin Aqua Tone Up UV Essence Lavender', brand: 'Rohto Japan', whyLoved: 'Nâng tông da trong suốt ánh tím hồng chống tia cực tím SPF50+' },
      { category: 'Mascara dưỡng mi', productName: 'Quick Lash Curler Transparent', brand: 'Canmake', whyLoved: 'Giữ mi cong cả ngày mà hoàn toàn không màu tự nhiên như mi thật' },
      { category: 'Son dưỡng có màu', productName: 'CC Lip Cream Tint SPF20', brand: 'Kate Tokyo', whyLoved: 'Vừa dưỡng ẩm sâu vừa tạo sắc môi hồng hào tươi tắn tự nhiên' },
    ],

    goldenRules: [
      'Nguyên tắc "Less is more": Trang điểm để tôn vẻ đẹp tự nhiên sẵn có của bản thân.',
      'Đầu tư chăm sóc da kỹ lưỡng là 80% thành công của phong cách trong veo này.',
      'Phù hợp mọi hoàn cảnh: Đi học, thi cử, phỏng vấn, đi làm công sở sáng tạo.',
    ],
  },
];

export const JBEAUTY_SKINCARE_STEPS: JBeautySkincareStep[] = [
  {
    stepNumber: 1,
    stepName: 'Rửa Mặt Tạo Bọt Bông Mịn',
    jpName: '濃密泡洗顔',
    romaji: 'Nou-mitsu Awa Sengan',
    purpose: 'Làm sạch sâu lỗ chân lông mà không ma sát làm tổn thương da mặt',
    technique: 'Dùng lưới tạo bọt đánh sữa rửa mặt thành khối bọt bông xốp dày đặc như bánh kem. Áp bọt lên mặt và dùng bọt lăn trên da, tuyệt đối ngón tay không chạm miết vào da.',
    holyGrailProduct: 'Perfect Whip Senka / Bioré Marshmallow Foaming Wash',
    proTip: 'Rửa lại bằng nước ấm vừa phải, vỗ nhẹ 10 lần bằng nước mát ở bước cuối để se khít chân lông.',
  },
  {
    stepNumber: 2,
    stepName: 'Vỗ Nước Dưỡng Lotion 3 Lớp',
    jpName: '化粧水重ね付け・ローションパック',
    romaji: 'Keshousui Kasanedzuke / Rooshon Pakku',
    purpose: 'Cấp ẩm sâu tầng biểu bì, tạo nền tảng cho làn da Mochi-hada nảy nở căng mọng',
    technique: 'Lấy lượng lotion bằng đồng xu ra lòng bàn tay, áp nhẹ lên mặt và giữ 5 giây cho hơi ấm tay thấm dưỡng chất. Lặp lại 3 lần liên tiếp cho đến khi da có độ dính nhẹ đàn hồi.',
    holyGrailProduct: 'Hada Labo Gokujyun Premium Hyaluronic Acid Lotion / Naturie Hatomugi Skin Conditioner',
    proTip: 'Đắp mặt nạ bông tẩy trang tẩm đẫm lotion trong 3 phút trước khi makeup giúp lớp nền bám chặt không mốc phấn.',
  },
  {
    stepNumber: 3,
    stepName: 'Serum Tinh Chất Đặc Trị',
    jpName: '美容液ケア',
    romaji: 'Biyoueki Kea',
    purpose: 'Làm mờ thâm nám, dưỡng trắng trong suốt và chống lão hóa sớm',
    technique: 'Chấm serum vào 5 điểm trán, hai má, mũi, cằm. Xoa đều nhẹ nhàng theo chuyển động tròn hướng lên trên.',
    holyGrailProduct: 'Melano CC Vitamin C Brightening Essence / Shiseido Ultimune Power Infusing Serum',
    proTip: 'Vitamin C của Nhật bọc màng lipid thẩm thấu sâu, dùng ban ngày kết hợp kem chống nắng giúp nhân đôi hiệu quả chống tia UV.',
  },
  {
    stepNumber: 4,
    stepName: 'Khóa Ẩm Nhũ Tương Sữa Dưỡng',
    jpName: '乳液・エマルジョンロック',
    romaji: 'Nyueki / Emarujon Rokku',
    purpose: 'Khóa chặt độ ẩm của các bước trước, tạo lớp màng bảo vệ da mềm mịn như lụa',
    technique: 'Thoa một lượng nhỏ sữa dưỡng nhũ tương mỏng nhẹ khắp mặt. Vỗ nhẹ bằng lòng bàn tay cho đến khi ráo mịn.',
    holyGrailProduct: 'Minon Amino Moist Charge Milk / Curél Intensive Moisture Facial Milk',
    proTip: 'Vào mùa hè chỉ cần dùng emulsion; mùa đông se lạnh có thể thoa thêm một lớp kem dưỡng ẩm mỏng ở vùng má khô.',
  },
];

export const BEAUTY_DICTIONARY: BeautyVocabularyItem[] = [
  {
    term: '涙袋 (Namida-bukuro)',
    reading: 'なみだぶくろ',
    romaji: 'namida-bukuro',
    meaning: 'Bọng mắt cười (túi nước mắt) tạo ánh nhìn ngây thơ, to tròn, biết cười',
    contextUsage: '涙袋メイクで目が一回り大きく見えます。(Trang điểm bọng mắt giúp mắt trông to hơn hẳn một vòng.)',
  },
  {
    term: '餅肌 (Mochi-hada)',
    reading: 'もちはだ',
    romaji: 'mochi-hada',
    meaning: 'Làn da bánh dày Mochi: Trắng trẻo, mềm mịn, căng mọng và có độ đàn hồi tự nhiên',
    contextUsage: '保湿を徹底して、憧れのもち肌を目指す。(Dưỡng ẩm kỹ càng để hướng tới làn da mochi hằng mơ ước.)',
  },
  {
    term: 'すっぴん (Suppin)',
    reading: 'すっぴん',
    romaji: 'suppin',
    meaning: 'Mặt mộc không trang điểm / Làn da tự nhiên nguyên bản',
    contextUsage: 'すっぴん風メイクは学校やバイトに最適です。(Trang điểm kiểu mặt mộc cực kỳ thích hợp đi học hoặc đi làm thêm.)',
  },
  {
    term: 'たれ目 (Tare-me)',
    reading: 'たれめ',
    romaji: 'tare-me',
    meaning: 'Dáng mắt cúp đuôi hiền dịu, ngây thơ như mắt búp bê manga (đối lập với tsurime - mắt xếch)',
    contextUsage: 'アイラインを少し下げて描くと、愛らしいたれ目になります。(Kẻ eyeliner hơi chúc xuống một chút sẽ tạo đôi mắt tare-me đáng yêu.)',
  },
  {
    term: '垢抜け (Akanuke)',
    reading: 'あかぬけ',
    romaji: 'akanuke',
    meaning: 'Sự lột xác trở nên sành điệu, tinh tế, sang chảnh và cuốn hút hơn',
    contextUsage: '眉毛の形を整えるだけで一気に垢抜けます。(Chỉ cần tỉa lại dáng lông mày là diện mạo đã lột xác sành điệu hơn hẳn.)',
  },
  {
    term: '透明感 (Toumeikan)',
    reading: 'とうめいかん',
    romaji: 'toumeikan',
    meaning: 'Cảm giác trong suốt, thuần khiết, thanh khiết của làn da và thần thái',
    contextUsage: 'ラベンダー色の下地で肌の透明感がアップする。(Dùng kem lót màu hoa oải hương giúp độ trong suốt của làn da tăng vọt.)',
  },
  {
    term: '抜け感 (Nukekan)',
    reading: 'ぬけかん',
    romaji: 'nukekan',
    meaning: 'Sự buông lơi tự nhiên, không cố gồng, tạo cảm giác thoải mái mà vẫn rất thời thượng',
    contextUsage: 'リップをラフに塗って、抜け感を出す。(Thoa son môi nhẹ tay tự nhiên để tạo cảm giác buông lơi thoải mái.)',
  },
  {
    term: '血色感 (Kesshoku-kan)',
    reading: 'けっしょくかん',
    romaji: 'kesshoku-kan',
    meaning: 'Sắc thái hồng hào, tươi tắn, tràn đầy sinh khí của đôi má và làn môi',
    contextUsage: 'チークをふわっとのせて、自然な血色感をプラス。(Dặm nhẹ má hồng để thêm sắc thái hồng hào tự nhiên cho khuôn mặt.)',
  },
  {
    term: '陶器肌 (Touki-hada)',
    reading: 'とうきはだ',
    romaji: 'touki-hada',
    meaning: 'Làn da gốm sứ trắng mịn không tì vết, không lộ lỗ chân lông',
    contextUsage: '毛穴をカバーして陶器肌を一日中キープ。(Che phủ lỗ chân lông để duy trì làn da gốm sứ suốt cả ngày.)',
  },
  {
    term: '小顔効果 (Kogao Kouka)',
    reading: 'こがおこうか',
    romaji: 'kogao kouka',
    meaning: 'Hiệu ứng trang điểm hoặc kiểu tóc giúp khuôn mặt trông nhỏ nhắn, thanh thoát',
    contextUsage: 'シェーディングで抜群の小顔効果が期待できる。(Đánh khối tạo khối mang lại hiệu quả mặt nhỏ gọn vượt trội.)',
  },
];

export interface JapaneseNaturalIngredient {
  id: string;
  name: string;
  jpName: string;
  romaji: string;
  historicalEra: string;
  icon: string;
  keyNutrients: string[];
  skinBenefits: string;
  hairBenefits?: string;
  traditionalUsage: string;
  modernApplication: string;
  proTip: string;
  deepExplanation?: {
    scientificResearch: string;
    molecularBio: string;
    geishaSecretHeritage: string;
  };
}

export interface NaturalBeautyRecipe {
  id: string;
  title: string;
  ingredientHighlight: string;
  targetSkinType: string;
  prepTime: string;
  ingredients: string[];
  steps: string[];
  frequency: string;
  caution: string;
  deepExplanation?: {
    synergyMechanism: string;
    stepByStepSecret: string;
    dermatologistNote: string;
  };
}

export const JAPANESE_NATURAL_INGREDIENTS: JapaneseNaturalIngredient[] = [
  {
    id: 'komenuka',
    name: 'Cám Gạo & Nước Vo Gạo (Komenuka / 米ぬか)',
    jpName: '米ぬか・米のとぎ汁',
    romaji: 'Komenuka / Kome no Togijiru',
    historicalEra: 'Thời kỳ Heian (794–1185) & Thời kỳ Edo (1603–1867)',
    icon: '🌾',
    keyNutrients: ['Gamma-oryzanol', 'Axit Ferulic', 'Vitamin E & B3', 'Squalene tự nhiên'],
    skinBenefits: 'Dưỡng sáng da mờ thâm nám, tẩy tế bào chết vi mô siêu êm dịu, cấp ẩm làm mềm lớp sừng, chống oxy hóa mạnh mẽ.',
    traditionalUsage: 'Cung nữ triều đình và Geisha đựng cám gạo trong túi vải lụa tơ tằm mềm (*Nukabukuro*), nhúng nước ấm rồi thoa nhẹ lên mặt và cơ thể thay xà phòng tắm.',
    modernApplication: 'Chiết xuất cám gạo lên men (*Rice Ferment Filtrate*) là thành phần ngôi sao trong các dòng nước thần dưỡng da cao cấp Nhật Bản.',
    proTip: 'Dùng nước vo gạo lần thứ 2 (để lắng 2 tiếng, gạn lấy phần nước đục dưới đáy) vỗ lên mặt giúp da trắng sáng tự nhiên mà không tốn chi phí.',
  },
  {
    id: 'matcha_ryokucha',
    name: 'Trà Xanh Uji Matcha (Uji Matcha / 宇治抹茶)',
    jpName: '宇治抹茶・緑茶カテキン',
    romaji: 'Uji Matcha / Ryokucha Catechin',
    historicalEra: 'Thế kỷ XII (Thiền sư Eisai du nhập từ Trung Hoa vào Kyoto)',
    icon: '🍵',
    keyNutrients: ['EGCG (Epigallocatechin Gallate)', 'Polyphenol', 'Vitamin C & A', 'Chlorophyll (Diệp lục tố)'],
    skinBenefits: 'Kháng khuẩn trị mụn, kiểm soát bã nhờn, làm dịu vết mẩn đỏ kích ứng, trung hòa gốc tự do ngăn ngừa lão hóa sớm.',
    traditionalUsage: 'Người Nhật dùng bã trà xanh đắp lên vết mụn viêm và dùng nước trà xanh nguội rửa mặt vào mỗi sáng để giữ làn da sạch sẽ sảng khoái.',
    modernApplication: 'Bột matcha hữu cơ nghiền mịn làm mặt nạ đất sét thanh lọc lỗ chân lông và xịt khoáng kiềm dầu cho da dầu mụn.',
    proTip: 'Đá viên trà xanh: Pha trà xanh đặc đông thành đá viên, lăn nhẹ quanh vùng mắt vào buổi sáng giúp xua tan bọng mắt và quầng thâm tức thì.',
  },
  {
    id: 'tsubaki_oil',
    name: 'Dầu Hoa Trà Tsubaki (Camellia Japonica Oil / 椿油)',
    jpName: '椿油（つばきあぶら）',
    romaji: 'Tsubaki Abura',
    historicalEra: 'Khởi nguồn từ đảo Izu Oshima & Nagasaki thế kỷ VIII',
    icon: '🌺',
    keyNutrients: ['Axit Oleic (Omega-9 chiếm hơn 85%)', 'Vitamin A, D, E', 'Polyphenol thực vật'],
    skinBenefits: 'Cấu trúc tương đồng hoàn hảo với dầu tự nhiên trên da người, thấm sâu không gây bít tắc lỗ chân lông, khóa ẩm tuyệt hảo.',
    hairBenefits: 'Bí quyết ngàn năm của các nàng Geisha: Phục hồi tóc chẻ ngọn, tạo độ bóng mượt huyền bí như tơ lụa đen (*Karasu-ba*).',
    traditionalUsage: 'Nhỏ 2 giọt dầu hoa trà vào lược gỗ hoàng dương (*Tsuge Kushi*) để chải tóc hàng ngày, vừa mát-xa da đầu vừa giữ nếp tóc suôn mượt.',
    modernApplication: 'Dầu dưỡng tóc Tsubaki Shiseido và dầu mát-xa mặt chống nếp nhăn đuôi mắt.',
    proTip: 'Thoa 1-2 giọt dầu hoa trà lên đuôi tóc ẩm trước khi sấy để bảo vệ tóc tuyệt đối khỏi nhiệt độ máy sấy.',
  },
  {
    id: 'sake_kasu',
    name: 'Men Rượu Sake & Bã Rượu Sake-kasu (酒粕)',
    jpName: '酒粕エキス・コウジ酸',
    romaji: 'Sake-kasu Ekisu / Kouji-san',
    historicalEra: 'Thế kỷ XVII tại các xưởng ủ rượu Fushimi (Kyoto) & Nada (Kobe)',
    icon: '🍶',
    keyNutrients: ['Axit Kojic tự nhiên', 'Hơn 18 loại Axit Amin', 'Peptide lên men', 'Axit Ferulic'],
    skinBenefits: 'Ức chế sản sinh enzyme Tyrosinase gây nám da, kích thích tăng sinh tế bào mới, thu nhỏ lỗ chân lông và làm da trắng trong (*Toumeikan*).',
    traditionalUsage: 'Bắt nguồn từ hiện tượng kinh điển: Những nghệ nhân nấu rượu Sake tuổi đã cao nhưng đôi bàn tay vẫn trắng nõn, căng mọng không một nếp nhăn.',
    modernApplication: 'Mặt nạ bã rượu Sake Wafood Made PDC đình đám trên bảng xếp hạng @cosme Tokyo.',
    proTip: 'Trộn bã rượu sake tươi với sữa chua không đường và 1 thìa mật ong đắp mặt 15 phút, da sẽ lột xác mềm mại như da em bé.',
  },
  {
    id: 'azuki_beans',
    name: 'Bột Đậu Đỏ Azuki (Azuki Powder / 小豆)',
    jpName: '小豆の粉（あずき）',
    romaji: 'Azuki no Kona',
    historicalEra: 'Thời kỳ Nara (710–794) được ghi chép trong y văn cổ',
    icon: '🫘',
    keyNutrients: ['Saponin tự nhiên (Chất tạo bọt sinh học)', 'Kẽm', 'Vitamin B1, B6', 'Chất xơ vi mô'],
    skinBenefits: 'Hạt saponin tự nhiên tạo bọt nhẹ khi gặp nước, nhẹ nhàng cuốn trôi bụi bẩn và bã nhờn sâu trong lỗ chân lông mà không làm khô căng da.',
    traditionalUsage: 'Phụ nữ quý tộc Nhật Bản xay mịn hạt đậu đỏ Azuki, cho vào túi lụa con để rửa mặt hàng ngày nhằm giữ làn da láng mịn không mụn đầu đen.',
    modernApplication: 'Sữa rửa mặt bột thảo mộc tự nhiên (*Powder wash*) không chứa chất bảo quản hóa học.',
    proTip: 'Trộn bột đậu đỏ với sữa tươi không đường thành hỗn hợp sệt, mát-xa nhẹ nhàng vùng cánh mũi để loại bỏ hoàn toàn sợi bã nhờn.',
  },
  {
    id: 'yomogi_mugwort',
    name: 'Ngải Cứu Nhật Bản Yomogi (Japanese Mugwort / 蓬)',
    jpName: 'ヨモギ（蓬）エキス',
    romaji: 'Yomogi Ekisu',
    historicalEra: 'Vị thuốc thảo mộc dân gian ngàn năm của người dân xứ Phù Tang',
    icon: '🌿',
    keyNutrients: ['Cineol', 'Flavonoid', 'Tanin', 'Choline'],
    skinBenefits: 'Làm dịu cấp tốc làn da cháy nắng, giảm viêm ngứa kích ứng, tăng cường tuần hoàn máu dưới da giúp da dẻ hồng hào (*Kesshoku-kan*).',
    traditionalUsage: 'Nấu lá ngải cứu Yomogi thả vào bồn tắm nước nóng Onsen (*Yomogi-yu*), vừa thư giãn cơ bắp vừa giúp toàn thân thải độc mịn màng.',
    modernApplication: 'Toner và mặt nạ giấy chiết xuất Yomogi làm dịu làn da nhạy cảm vào mùa hè.',
    proTip: 'Đun sôi một nắm lá ngải cứu tươi, để nguội và dùng nước đó làm xịt khoáng làm dịu da sau khi đi nắng về.',
  },
  {
    id: 'yuzu_citrus',
    name: 'Trái Thanh Yên Yuzu (Japanese Yuzu Citrus / 柚子)',
    jpName: 'ゆずエキス・セラミド',
    romaji: 'Yuzu Ekisu / Seramido',
    historicalEra: 'Thời kỳ Asuka (Thế kỷ VI–VII)',
    icon: '🍋',
    keyNutrients: ['Vitamin C (cao gấp 3 lần quả chanh thông thường)', 'Yuzu Ceramide tự nhiên', 'Axit Citric'],
    skinBenefits: 'Tăng cường hàng rào bảo vệ da, dưỡng ẩm sâu, phục hồi làn da xỉn màu thiếu sức sống, hương thơm tinh dầu xua tan căng thẳng mệt mỏi.',
    traditionalUsage: 'Tập tục tắm bồn thả trái Yuzu vào ngày Đông chí (*Toji Yuzu-yu*): Giúp cơ thể giữ ấm, da dẻ không bị nứt nẻ qua mùa đông lạnh giá.',
    modernApplication: 'Kem dưỡng ẩm Yuzu Gel và tẩy tế bào chết dạng gel dịu nhẹ.',
    proTip: 'Hương thơm từ tinh dầu vỏ quả Yuzu kích thích hệ thần kinh đối giao cảm, giúp bạn ngủ sâu giấc - bí quyết số 1 cho làn da không quầng thâm.',
  },
];

export const NATURAL_BEAUTY_RECIPES: NaturalBeautyRecipe[] = [
  {
    id: 'recipe_rice_mask',
    title: 'Mặt Nạ Cám Gạo Sữa Chua Sáng Da Mochi',
    ingredientHighlight: 'Cám gạo Komenuka + Sữa chua không đường',
    targetSkinType: 'Da xỉn màu, thâm mụn, da không đều màu',
    prepTime: '5 phút chuẩn bị · Đắp 15 phút',
    ingredients: [
      '2 thìa canh bột cám gạo nguyên chất (hoặc bột gạo mịn)',
      '2 thìa canh sữa chua không đường lên men tự nhiên',
      '1 thìa cà phê mật ong rừng nguyên chất',
    ],
    steps: [
      'Trộn đều cám gạo, sữa chua và mật ong trong chén sạch thành hỗn hợp sệt mịn.',
      'Rửa sạch mặt bằng nước ấm để giãn nở lỗ chân lông nhẹ.',
      'Thoa đều hỗn hợp lên mặt, tránh vùng mắt và môi.',
      'Thư giãn trong 15 phút, sau đó vỗ nhẹ nước mát và mát-xa xoay tròn nhẹ tay để rửa sạch.',
    ],
    frequency: '2 lần / tuần',
    caution: 'Chọn cám gạo sạch không pha tạp chất để tránh gây kích ứng da.',
  },
  {
    id: 'recipe_matcha_mist',
    title: 'Xịt Khoáng Trà Xanh Kiềm Dầu & Giảm Mụn',
    ingredientHighlight: 'Matcha Uji + Nước cất / Nước khoáng',
    targetSkinType: 'Da dầu nhờn, dễ nổi mụn, lỗ chân lông to',
    prepTime: '3 phút chuẩn bị',
    ingredients: [
      '1/2 thìa cà phê bột trà xanh Matcha nguyên chất',
      '100ml nước khoáng tinh khiết hoặc nước cất',
      '2 giọt tinh dầu tràm trà (tùy chọn)',
    ],
    steps: [
      'Khuấy tan bột matcha trong 20ml nước ấm cho tan hết cặn.',
      'Đổ hỗn hợp qua rây lọc sạch vào chai xịt phun sương.',
      'Thêm 80ml nước khoáng còn lại và lắc đều.',
      'Bảo quản trong ngăn mát tủ lạnh, xịt cấp ẩm 2-3 lần/ngày.',
    ],
    frequency: 'Sử dụng hàng ngày (dùng trong 5-7 ngày bảo quản lạnh)',
    caution: 'Vì không có chất bảo quản, chỉ nên làm lượng vừa đủ dùng trong tuần.',
  },
  {
    id: 'recipe_tsubaki_hair',
    title: 'Ủ Tóc Phục Hồi Tơ Lụa Bằng Dầu Hoa Trà Tsubaki',
    ingredientHighlight: 'Dầu hoa trà Tsubaki tinh khiết',
    targetSkinType: 'Tóc khô xơ, chẻ ngọn, tóc hư tổn do uốn nhuộm',
    prepTime: '2 phút chuẩn bị · Ủ 20-30 phút',
    ingredients: [
      '1-2 thìa canh dầu hoa trà Tsubaki (tùy độ dài tóc)',
      '1 chiếc khăn bông ấm',
    ],
    steps: [
      'Làm ấm nhẹ dầu hoa trà bằng cách ngâm chén dầu vào nước nóng.',
      'Thoa đều dầu từ thân tóc xuống ngọn tóc khi tóc còn khô trước khi gội.',
      'Quấn khăn bông ấm quanh tóc và ủ trong 20-30 phút.',
      'Gội đầu lại 2 lần với dầu gội dịu nhẹ và xả sạch bằng nước mát.',
    ],
    frequency: '1 lần / tuần',
    caution: 'Tránh thoa trực tiếp lượng dầu quá nhiều vào sát chân tóc nếu da đầu bạn thuộc loại dầu nhờn.',
  },
  {
    id: 'recipe_azuki_scrub',
    title: 'Tẩy Tế Bào Chết Đậu Đỏ Sạch Mụn Đầu Đen',
    ingredientHighlight: 'Bột đậu đỏ Azuki + Nước ấm / Sữa tươi',
    targetSkinType: 'Da sần sùi, mụn đầu đen vùng mũi, da bít tắc',
    prepTime: '3 phút chuẩn bị · Mát-xa 2 phút',
    ingredients: [
      '1 thìa canh bột đậu đỏ Azuki xay siêu mịn',
      '1.5 thìa canh sữa tươi không đường hoặc nước ấm',
    ],
    steps: [
      'Trộn bột đậu đỏ với sữa tươi thành hỗn hợp sệt nhuyễn.',
      'Thoa lên vùng cánh mũi, cằm và trán.',
      'Dùng đầu ngón tay mát-xa thật nhẹ nhàng theo vòng tròn nhỏ trong 1-2 phút (saponin trong đậu đỏ sẽ tự làm sạch bã nhờn).',
      'Rửa sạch bằng nước mát và vỗ ngay lotion cấp ẩm.',
    ],
    frequency: '1-2 lần / tuần',
    caution: 'Bột đậu đỏ phải xay cực mịn, tuyệt đối không chà xát mạnh tay làm rát da.',
  },
];


// ==========================================
// 5 EXTRA MAKEUP LAYOUTS (TẢI THÊM 5 LAYOUT)
// ==========================================
export const EXTRA_JAPANESE_MAKEUP_LAYOUTS: JapaneseMakeupLayout[] = [
  {
    id: 'heisei_gyaru_revival',
    name: 'Heisei Gyaru Revival (ギャル風令和進化系)',
    jpName: '平成ギャル・令和リバイバルメイク',
    romaji: 'Heisei Gyaru Reiwa Ribaibaru Meiku',
    badge: 'Trend TikTok Shibuya · Năng Động Nổi Bật',
    vibe: 'Cá tính, tự tin, quyến rũ phá cách với hàng mi búp bê cụm taba-kan và môi bóng căng mọng',
    targetTone: 'Mọi tone da',
    tagColor: 'from-amber-500/20 to-pink-500/10 border-amber-500/40 text-amber-300',
    features: {
      base: {
        title: 'Nền Semi-matte ấm áp & Highlight bắt sáng',
        technique: 'Đánh nền satin mịn, dùng kem bắt sáng ánh vàng sâm-panh ở sống mũi và đỉnh gò má tạo góc cạnh sắc sảo.',
        finish: 'Semi-matte da mochi',
        proTip: 'Tránh đánh nền trắng bợt; Gyaru chuộng sắc da khỏe khoắn, tươi tắn và tràn đầy năng lượng sống.',
      },
      eyes: {
        title: 'Mắt mèo to tròn mi cụm Taba-kan cá tính',
        eyeshadow: 'Tone nâu đồng kết hợp nhũ vàng lấp lánh ở 1/2 bầu mắt.',
        namidaBukuro: 'Kẻ bọng mắt sắc nét, phủ nhũ ánh kim vàng chanh rực rỡ.',
        eyeliner: 'Đường kẻ mắt nước đen sắc sảo xếch nhẹ 25 độ ở đuôi mắt.',
        lashes: 'Mi giả từng cụm chữ V vuốt cong vút, nhấn đậm cả mi dưới.',
        proTip: 'Dùng nhíp đầu nhọn gom các sợi mi mi giả thành 5-6 cụm rõ nét chuẩn tinh thần Gyaru Reiwa.',
      },
      brows: {
        title: 'Lông mày nâu sáng sắc sảo',
        shape: 'Dáng cong nhẹ vát đuôi, nâng khung xương mắt',
        color: 'Nâu caramel hoặc nâu mật ong sáng',
        technique: 'Dùng mascara chải mày màu sáng để hạ tone lông mày thật, giúp ánh mắt trông sáng và rực rỡ hơn.',
      },
      cheeks: {
        title: 'Má hồng cam đào nghiêng gò má',
        placement: 'Tán xéo từ gò má chếch lên phía thái dương',
        colors: 'Cam san hô hoặc hồng cam đất ánh ngọc trai',
        technique: 'Tán lớp phấn má chuyển màu 3D từ đậm ở đỉnh gò má nhạt dần về thái dương.',
      },
      lips: {
        title: 'Môi Nude căng mọng tráng gương',
        colors: 'Hồng nude đất viền nâu nhạt, phủ son bóng trong suốt',
        finish: 'Căng mọng mọng nước (Plump Gloss)',
        proTip: 'Đánh son tràn viền môi trên 1mm rồi phủ son bóng chứa bạc hà the mát tạo độ mọng.',
      },
    },
    recommendedProducts: [
      { category: 'Eyeliner', productName: 'Love Liner Liquid Dark Brown', brand: 'msh', whyLoved: 'Đầu cọ 0.1mm chống lem dầu cực đỉnh' },
      { category: 'Mascara', productName: 'Heroine Make Super Waterproof', brand: 'KissMe', whyLoved: 'Giữ mi cong suốt 16 tiếng không chảy' },
    ],
    goldenRules: [
      'Gom mi chụm thành từng tép (Taba-kan) là linh hồn của layout Gyaru hiện đại.',
      'Viền môi màu nude kết hợp son bóng bắt sáng tạo hiệu ứng môi tều quyến rũ.',
      'Đánh khối nhẹ hai bên cánh mũi để sống mũi thon cao kiêu kỳ.',
    ],
    deepExplanation: {
      historyAndPhilosophy: 'Phong trào Gyaru xuất hiện từ Shibuya thập niên 1990 như biểu tượng phản kháng sự gò bó của xã hội truyền thống Nhật. Phiên bản Reiwa hiện nay đã tinh tế hóa: giữ lại sự tự tin, phóng khoáng nhưng chuyển sang nền da trong mướt và màu mắt nâu ấm thanh lịch.',
      asianFacialAnatomy: 'Mắt người châu Á thường có nếp mí nông; kỹ thuật kẻ mắt nước xếch nhẹ kết hợp mi cụm taba-kan mở rộng góc mắt cả chiều ngang lẫn chiều dọc, tạo chiều sâu 3D hút hồn.',
      colorTheory: 'Sự tương phản giữa phấn mắt màu đồng ấm (Warm Bronze) và nhũ sâm-panh hạt mịn giúp thu hút ánh sáng tối đa vào lòng đen của mắt.',
      commonMistakes: [
        'Kẻ eyeliner quá dày làm sụp nếp mí hai mí.',
        'Chọn màu son nude quá bợt khiến gương mặt trông thiếu sức sống.',
        'Dán mi giả nguyên dải dày cộp không tự nhiên thay vì chia cụm.',
      ],
      proSecrets: 'Dùng tăm bông chụm 2 sợi mi lại với nhau bằng chút keo dán mi trước khi chuốt mascara để giữ dáng cụm mi sắc bén suốt cả ngày.',
      fashionMatchAdvice: 'Phối hoàn hảo với Shoujo Y2K Street, Áo croptop tay lỡ, Váy tennis xếp ly và Giày platform cao cổ.',
    },
  },
  {
    id: 'ryousangata_sweet',
    name: 'Ryousangata Sweet Pink Doll (量産型ドーリーピンク)',
    jpName: '量産型・地雷系ドーリーピンクメイク',
    romaji: 'Ryousangata Doori Pinku Meiku',
    badge: 'Oshi-katsu & Idol Fan · Ngọt Ngào Say Đắm',
    vibe: 'Búp bê anime ngọt lịm với tone hồng dâu, bọng mắt to tròn ướt át và đôi môi giọt nước',
    targetTone: 'Cool tone (Da tông lạnh)',
    tagColor: 'from-pink-600/20 to-fuchsia-500/10 border-pink-500/40 text-pink-300',
    features: {
      base: {
        title: 'Nền trắng sứ không tì vết (Porcelain White)',
        technique: 'Sử dụng base nâng tone tím lavender để triệt sắc vàng, kết hợp kem nền che phủ cao dặm mút ẩm.',
        finish: 'Matte mịn lì',
        proTip: 'Đánh phấn phủ không màu kiềm dầu kỹ vùng trán và cằm để lớp nền lì như búp bê sứ.',
      },
      eyes: {
        title: 'Đôi mắt rơm rớm ướt lệ (Tare-me & Namida)',
        eyeshadow: 'Tone hồng đào sữa tán đều mí trên và viền mí dưới.',
        namidaBukuro: 'Kẻ rãnh bọng mắt to bản rõ rệt, nhấn kim tuyến hạt lớn lấp lánh ở chính giữa mi dưới.',
        eyeliner: 'Kẻ viền mắt cụp xuống (Droopy Tare-me) tạo ánh mắt nũng nịu yếu đuối.',
        lashes: 'Mi sợi búp bê mảnh mai, mi dưới chuốt từng sợi tách rời rõ rệt.',
        proTip: 'Chấm một nốt nhũ kim cương ngay dưới con ngươi mi dưới để khi chớp mắt tạo cảm giác như sắp khóc.',
      },
      brows: {
        title: 'Lông mày ngang mềm mại màu nâu xám',
        shape: 'Đường thẳng đuôi cụp nhẹ dịu dàng',
        color: 'Nâu tro nhạt (Ash Brown)',
        technique: 'Vẽ dáng mày ngắn hơn đuôi mắt 2mm tạo nét mặt ngây thơ trẻ con.',
      },
      cheeks: {
        title: 'Má hồng dâu tây ngay sát mi dưới',
        placement: 'Ngay dưới bọng mắt lan nhẹ sang hai cánh mũi',
        colors: 'Hồng phấn em bé (Baby Pink) hoặc hồng dâu lạnh',
        technique: 'Dùng cọ lông tơ dặm tròn nhẹ nhàng, tạo hiệu ứng khuôn mặt ửng hồng e thẹn như vừa xúc động.',
      },
      lips: {
        title: 'Môi kẹo hồ lô bóng nước (Candy Glass Lip)',
        colors: 'Đỏ mâm xôi lòng môi lan dần ra viền hồng sữa',
        finish: 'Bóng tráng gương (Mirror Glass)',
        proTip: 'Dùng son bóng hồng trong suốt phủ toàn bộ môi sau khi đã ombre son tint lì ở lòng môi.',
      },
    },
    recommendedProducts: [
      { category: 'Base', productName: 'CandyDoll Bright Pure Base Lavender', brand: 'CandyDoll', whyLoved: 'Nâng tone da trắng sứ tự nhiên triệt sắc vàng' },
      { category: 'Glitter', productName: 'Canmake Jewelry Shadow Veil', brand: 'Canmake', whyLoved: 'Nhũ hạt kim cương lấp lánh như nước mắt thần tiên' },
    ],
    goldenRules: [
      'Bọng mắt to và má hồng ngay sát mí dưới là hai điểm nhận diện tối thượng của style búp bê Ryousangata.',
      'Luôn dùng lót tím lavender để có được làn da trắng trong veo chuẩn gu gái Tokyo.',
      'Son lòng môi bóng căng mọng như giọt sương mai.',
    ],
    deepExplanation: {
      historyAndPhilosophy: 'Phong cách Ryousangata bắt nguồn từ văn hóa Oshi-katsu (ủng hộ thần tượng J-pop / 2.5D stage). Các thiếu nữ muốn xuất hiện với hình ảnh xinh đẹp, đáng yêu nhất khi gặp thần tượng tại concert, tạo nên chuẩn mực búp bê hồng ngọt ngào lan tỏa khắp châu Á.',
      asianFacialAnatomy: 'Đặt má hồng ngay sát mí dưới giúp rút ngắn khoảng cách từ mắt tới miệng (khoảng cách nhân trung thị giác), tạo hiệu ứng khuôn mặt nhỏ nhắn (Kogao) và trẻ ra 3-5 tuổi.',
      colorTheory: 'Sắc hồng Baby Pink với base xanh lạnh làm nổi bật lòng trắng mắt trong vắt và tôn lên nước da trắng ngần.',
      commonMistakes: [
        'Vẽ rãnh bọng mắt bằng đường kẻ quá đậm hoặc quá đen khiến mắt trông như bị thâm quầng mệt mỏi.',
        'Đánh má hồng quá thấp xuống dưới rãnh cười làm xệ cơ mặt.',
        'Đánh son bóng tràn quá nhiều ra khóe miệng gây lem luốc.',
      ],
      proSecrets: 'Dùng cọ dẹt chấm phấn phủ kiềm dầu thật kỹ quanh rãnh bọng mắt trước khi kẻ chì, nét chì sẽ ăn màu êm mượt mà không bao giờ trôi.',
      fashionMatchAdvice: 'Đi cùng váy đen cổ sen viền ren trắng, nơ cài ruy băng lụa tơ, túi Maison de Fleur và giày Mary Jane đế bánh mì.',
    },
  },
  {
    id: 'kimono_classic_grace',
    name: 'Kimono Wabi-Sabi Traditional (和装クラシック麗人メイク)',
    jpName: '和装・着物クラシック麗人メイク',
    romaji: 'Wasou Kimono Kurasshiku Reijin Meiku',
    badge: 'Truyền Thống Quý Phái · Thuần Khiết Đẳng Cấp',
    vibe: 'Vẻ đẹp thanh tao, quý phái vượt thời gian đậm chất Kyoto với điểm nhấn đỏ chu sa nơi đuôi mắt',
    targetTone: 'Da sáng tự nhiên',
    tagColor: 'from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-300',
    features: {
      base: {
        title: 'Nền gốm sứ mờ tinh khiết (Toukihadaka)',
        technique: 'Lớp nền bán lì mịn màng không tì vết, kiềm dầu tuyệt đối nhưng không khô mốc.',
        finish: 'Matte mịn lì',
        proTip: 'Dùng kem che khuyết điểm dạng hũ dặm kỹ khóe mũi và viền môi để tôn vinh sự tinh tế chuẩn mực.',
      },
      eyes: {
        title: 'Đuôi mắt chu sa đỏ son thanh tú',
        eyeshadow: 'Màu be ngọc trai phủ bầu mắt, nhấn màu đỏ son (Beni) ở 1/3 đuôi mắt.',
        namidaBukuro: 'Bọng mắt tinh tế, không dùng kim tuyến lớn mà dùng phấn nhũ ngọc trai mịn màng.',
        eyeliner: 'Kẻ mắt đen tuyền mảnh sắc nét kéo dài ngang đuôi mắt 3mm.',
        lashes: 'Mi thật kẹp cong nhẹ nhàng, chuốt mascara tơ tằm đen nhánh tự nhiên.',
        proTip: 'Độ đậm của sắc đỏ chu sa ở đuôi mắt phải chuyển màu khói mờ ảo (Gradation), không để viền sắc nhọn.',
      },
      brows: {
        title: 'Lông mày lá liễu mềm mại cổ điển',
        shape: 'Đường cong bán nguyệt thanh mảnh thanh tú',
        color: 'Đen xám mực tàu (Sumi-iro)',
        technique: 'Phần đầu mày tán mờ nhạt, đậm dần về thân và vuốt nhọn êm ở đuôi.',
      },
      cheeks: {
        title: 'Má hồng cánh sen phơn phớt',
        placement: 'Tán tản đều hai bên gò má nhẹ nhàng kín đáo',
        colors: 'Hồng phấn nhạt cánh sen',
        technique: 'Dùng cọ lớn xoay nhẹ như một làn gió thoảng qua, tạo sắc diện khỏe khoắn quý phái.',
      },
      lips: {
        title: 'Đôi môi son đỏ cánh hoa anh đào',
        colors: 'Đỏ son truyền thống Nhật Bản (Beni-iro) hoặc đỏ trầm quý phái',
        finish: 'Satin nhung mịn',
        proTip: 'Vẽ khuôn môi tròn đầy đặn, viền môi trên hình cánh cung mềm mại.',
      },
    },
    recommendedProducts: [
      { category: 'Lipstick', productName: 'Shiseido ModernMatte Powder Lipstick 508', brand: 'Shiseido', whyLoved: 'Chất son nhung lì siêu nhẹ môi lên màu đỏ chuẩn mực' },
      { category: 'Eyeshadow', productName: 'SUQQU Signature Color Eyes 04', brand: 'SUQQU', whyLoved: 'Bột phấn siêu mịn lướt trên da như lụa Kimono' },
    ],
    goldenRules: [
      'Điểm nhấn đỏ son nơi đuôi mắt (Mejiri Beni) là linh hồn của nghệ thuật trang điểm truyền thống Nhật Bản.',
      'Lông mày phải vẽ thanh mảnh và mềm mại, tôn trọn vầng trán thanh cao.',
      'Lớp nền lì mịn như bề mặt gốm sứ Arita nung men ngọc.',
    ],
    deepExplanation: {
      historyAndPhilosophy: 'Bắt nguồn từ cung đình Heian và các kỹ nữ Geisha thời Edo, màu đỏ son (*Beni*) chiết xuất từ hoa rum đỏ (*Benibana*) mang ý nghĩa trừ tà, đem lại may mắn và tôn vinh nét cao sang. Khi mặc Kimono hay Yukata, layout này mang lại khí chất đoan trang, kiều diễm tuyệt đối.',
      asianFacialAnatomy: 'Đường kẻ mắt ngang kết hợp sắc đỏ ở đuôi mắt tạo hiệu ứng mắt phượng dài thanh thoát (*Nagashime*), khắc phục nhược điểm mắt tròn hoặc mí lót.',
      colorTheory: 'Sự hòa quyện giữa nền da trắng sứ lạnh và sắc đỏ Beni ấm tạo sự cân bằng âm dương hoàn hảo trong mỹ học truyền thống.',
      commonMistakes: [
        'Dùng son bóng quá nhiều làm mất đi tính trang trọng cổ điển của trang phục truyền thống.',
        'Kẻ lông mày sâu róm quá dày hiện đại làm phá vỡ nét thanh tú cổ xưa.',
        'Dặm sắc đỏ đuôi mắt quá đậm giống hóa trang kịch Kabuki.',
      ],
      proSecrets: 'Dùng chút son môi đỏ dặm nhẹ lên đầu cọ dẹt rồi tán phớt lên đuôi mắt sẽ tạo sự đồng điệu màu sắc 100% giữa mắt và môi.',
      fashionMatchAdvice: 'Lựa chọn số 1 cho Yukata mùa lễ hội pháo hoa Hanabi, Kimono lễ tốt nghiệp Seijinshiki hoặc Áo dài cách tân.',
    },
  },
  {
    id: 'tokyo_clean_minimal',
    name: 'Tokyo Minimalist Clean Girl (透明感ナチュラル美肌)',
    jpName: '東京ミニマリスト・透明感すっぴん風メイク',
    romaji: 'Toukyou Minimarisuto Toumeikan Meiku',
    badge: 'Đi Học & Công Sở · Thanh Lịch Trong Suốt',
    vibe: 'Vẻ đẹp trong trẻo tự nhiên như không trang điểm, tôn vinh làn da mộc bóng khỏe và khí chất trí thức',
    targetTone: 'Mọi tone da',
    tagColor: 'from-teal-500/20 to-emerald-500/10 border-teal-500/40 text-teal-300',
    features: {
      base: {
        title: 'Lớp nền trong suốt như nước sương',
        technique: 'Chỉ dùng kem chống nắng nâng tone nhẹ kết hợp chấm kem che khuyết điểm ở quầng thâm và nốt mụn.',
        finish: 'Glass-skin trong suốt',
        proTip: 'Trộn 1 giọt dầu dưỡng hoa trà vào kem lót giúp da phát sáng tự nhiên từ bên trong suốt 12 tiếng.',
      },
      eyes: {
        title: 'Mắt màu cát nude tự nhiên',
        eyeshadow: 'Phấn mắt màu be cát tự nhiên hoặc nâu sữa hạt dẻ.',
        namidaBukuro: 'Dùng phấn highlight mịn bắt sáng tự nhiên ở đầu mắt, không kẻ viền giả bọng mắt lộ liễu.',
        eyeliner: 'Kẻ viền trong mí mắt (Tightlining) bằng chì nâu sô-cô-la mềm.',
        lashes: 'Kẹp mi cong tự nhiên chữ C, chuốt mascara trong suốt hoặc nâu đen tách sợi.',
        proTip: 'Giữ hàng mi tơi mềm tự nhiên, tuyệt đối không dùng mi giả.',
      },
      brows: {
        title: 'Lông mày phẩy sợi tự nhiên (Feathery Brows)',
        shape: 'Theo khuôn chân mày nguyên bản của khuôn mặt',
        color: 'Trùng màu tóc tự nhiên',
        technique: 'Dùng gel chuốt mày trong suốt chải ngược sợi mày hướng lên trên tạo sự phóng khoáng tươi mới.',
      },
      cheeks: {
        title: 'Má hồng kem dạng thạch tan vào da',
        placement: 'Chính giữa gò má tán rộng tròn sang hai bên',
        colors: 'Màu quả mơ khô hoặc hồng đất nude',
        technique: 'Dùng ngón tay áp út vỗ nhẹ kem má hồng lên da ẩm để màu má tiệp hoàn toàn như màu da thật ửng máu.',
      },
      lips: {
        title: 'Môi ửng hồng màu cánh hoa tự nhiên (MLBB)',
        colors: 'Son dưỡng có màu hoa anh đào hoặc cam nude trong trẻo',
        finish: 'Bóng nhẹ ẩm mượt (Dewy Moisture)',
        proTip: 'Thoa son dưỡng ẩm trước 5 phút rồi dặm nhẹ son màu bằng đầu ngón tay tạo viền môi mờ sương.',
      },
    },
    recommendedProducts: [
      { category: 'Sunscreen Base', productName: 'Elixir Day Care Revolution Tone Up', brand: 'Shiseido Elixir', whyLoved: 'Vừa chống nắng SPF50+ vừa dưỡng ẩm căng bóng cả ngày' },
      { category: 'Lip Balm', productName: 'Opera Lip Tint N 05 Coral Pink', brand: 'Opera', whyLoved: 'Thỏi son dưỡng màu số 1 Cosme Nhật Bản nhiều năm liền' },
    ],
    goldenRules: [
      'Triết lý J-Beauty đỉnh cao: Trang điểm mà như không trang điểm (Suhada-kan - 素肌感).',
      'Đầu tư 80% thời gian cho dưỡng ẩm để có làn da căng bóng thật, lớp nền chỉ cần mỏng nhẹ như voan.',
      'Sử dụng chì kẻ viền trong mí mắt (Tightline) giúp đôi mắt sâu và sáng mà không lộ đường kẻ.',
    ],
    deepExplanation: {
      historyAndPhilosophy: 'Phong cách bắt nguồn từ lối sống Wabi-Sabi tôn vinh vẻ đẹp chân thực, mộc mạc và thanh khiết. Phụ nữ hiện đại tại Ginza và Omotesando chuộng layout này vì toát lên vẻ thông minh, tự tin và đẳng cấp mà không cần phô trương son phấn lòe loẹt.',
      asianFacialAnatomy: 'Tận dụng cấu trúc xương mềm mại tự nhiên của người Á Đông; giữ nguyên dáng mày thật và màu môi tự nhiên mang lại vẻ gần gũi, ấm áp và thiện cảm cao nhất trong giao tiếp.',
      colorTheory: 'Sử dụng bảng màu đơn sắc tự nhiên (Monochromatic Nude/Beige) hòa trộn hoàn hảo với sắc tố Melanin của da người Châu Á.',
      commonMistakes: [
        'Chọn kem nền quá sáng so với màu da cổ tạo hiệu ứng mặt nạ.',
        'Đánh phấn phủ quá dày làm mất đi độ bóng khỏe tự nhiên của làn da.',
        'Kẻ viền môi quá sắc nhọn cứng nhắc.',
      ],
      proSecrets: 'Xịt khoáng một lớp sương mịn sau khi hoàn tất lớp nền, rồi dùng mút ẩm ấn nhẹ lên toàn mặt để khóa ẩm và loại bỏ toàn bộ bụi phấn thừa.',
      fashionMatchAdvice: 'Phù hợp tuyệt đối với trang phục công sở Tokyo Minimalist, áo sơ mi lụa trắng, quần âu ống suông hoặc áo len dệt kim dáng basic.',
    },
  },
  {
    id: 'chusa_retro_romance',
    name: 'Chusa Hybrid Doll (中華×日系ドールメイク)',
    jpName: '中華×日系ハイブリッド・華麗ドールメイク',
    romaji: 'Chuusa Nikkei Haiburiddo Dooru Meiku',
    badge: 'Hot Trend Trào Lưu Châu Á · Sắc Sảo Kiều Diễm',
    vibe: 'Sự giao thoa hoàn hảo giữa nét sắc sảo của mỹ nhân tỷ tỷ Douyin và sự ngọt ngào mềm mại của búp bê Nhật Bản',
    targetTone: 'Mọi tone da',
    tagColor: 'from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300',
    features: {
      base: {
        title: 'Nền sứ ngọc trai không tì vết',
        technique: 'Nền matte phủ sương vi mô, tạo khối mũi cao thanh tú hình chữ V.',
        finish: 'Semi-matte da mochi',
        proTip: 'Đánh sáng đỉnh trán, chóp mũi và cằm bằng phấn bắt sáng ngọc trai mịn.',
      },
      eyes: {
        title: 'Đôi mắt to tròn long lanh chiều sâu 3D',
        eyeshadow: 'Tone hồng rượu vang kết hợp nâu khói ở hốc mắt, nhấn nhũ kim cương siêu sáng.',
        namidaBukuro: 'Kẻ bọng mắt sâu sắc nét kết hợp nhũ dạng lỏng ánh kim tuyến đa sắc.',
        eyeliner: 'Eyeliner mảnh đuôi dài chếch 15 độ, kết hợp mở góc mắt trong và góc mắt ngoài.',
        lashes: 'Mi sợi cụm đan xen sợi dài sợi ngắn chuẩn búp bê tiên tử.',
        proTip: 'Mở góc mắt dưới (Hagyou): kẻ mi dưới cách mí thật 1mm và lấp đầy khoảng trống bằng chì trắng.',
      },
      brows: {
        title: 'Lông mày cong nhẹ thanh mảnh',
        shape: 'Đỉnh cong mềm mại, sắc sảo về đuôi',
        color: 'Nâu đen khói',
        technique: 'Phẩy từng sợi lông mày ở đầu mày và viền sắc ở đuôi tạo vẻ kiêu kỳ quyền lực.',
      },
      cheeks: {
        title: 'Má hồng quả đào tỏa sáng',
        placement: 'Vùng chữ C gò má kéo nhẹ lên thái dương',
        colors: 'Hồng đào phấn kết hợp cam đào nhạt',
        technique: 'Dặm phấn má dạng kem trước phấn phủ, phủ thêm lớp phấn má bột cùng tone để khóa màu 12h.',
      },
      lips: {
        title: 'Môi cánh hoa 3D mờ ảo viền môi mờ sương',
        colors: 'Đỏ hồng anh đào đất tán ombre viền môi mờ sương',
        finish: 'Bóng thủy tinh đa chiều (3D Plumping Glass)',
        proTip: 'Tán mờ viền môi trên hình chữ M bằng tăm bông, chấm son bóng đậm ở điểm lõm lòng môi dưới.',
      },
    },
    recommendedProducts: [
      { category: 'Liquid Glitter', productName: 'CipiCipi Glitter Illumination Liner', brand: 'CipiCipi', whyLoved: 'Đầu cọ 0.07mm kẻ bọng mắt chính xác từng milimet' },
      { category: 'Lip Tint', productName: 'Rom&nd Glasting Water Tint', brand: 'Rom&nd', whyLoved: 'Lớp bóng tách biệt như màng nước trong veo không dính' },
    ],
    goldenRules: [
      'Kỹ thuật mở góc mắt dưới (Hagyou) tạo đôi mắt to gấp 1.5 lần thực tế.',
      'Sự hòa trộn giữa nhũ kim cương sắc sảo và má hồng đào búp bê tạo sức hút ma mị khó cưỡng.',
      'Tạo khối sống mũi hình chữ V tạo gương mặt thon gọn sắc nét dưới mọi góc chụp ảnh.',
    ],
    deepExplanation: {
      historyAndPhilosophy: 'Chusa Makeup là xu hướng bùng nổ khi thế hệ Gen Z Nhật Bản mê mẩn phong cách trang điểm mỹ nhân Trung Hoa (Douyin) nhưng đã biến tấu với gu thẩm mỹ tinh tế, dịu dàng của J-Beauty. Kết quả là một layout vừa sắc nét chụp ảnh ăn hình, vừa ngọt ngào khi nhìn trực diện ngoài đời.',
      asianFacialAnatomy: 'Mở rộng góc mắt cả 4 hướng (trên, dưới, trong, ngoài) giúp khuôn mặt trông lập thể và thon nhỏ đáng kinh ngạc, đặc biệt hữu hiệu với người có khuôn mặt tròn hoặc gò má rộng.',
      colorTheory: 'Màu hồng đất phối nâu rượu vang tạo chiều sâu hốc mắt mà không làm mắt bị sưng như các tone hồng thuần túy.',
      commonMistakes: [
        'Mở góc mắt quá xa mi thật trông thiếu tự nhiên khi nhìn gần.',
        'Dùng hạt kim tuyến quá to rơi vào trong mắt gây kích ứng.',
        'Đánh khối mũi quá đậm thành hai vệt thẳng đứng cứng nhắc.',
      ],
      proSecrets: 'Dùng cọ vát siêu mỏng thấm xịt khoáng trước khi lấy phấn nâu kẻ rãnh bọng mắt, đường nét sẽ mảnh như sợi chỉ và giữ màu cả ngày.',
      fashionMatchAdvice: 'Rực rỡ khi chụp ảnh kỷ yếu, tiệc tối sang trọng hoặc đi cùng các trang phục phong cách Jirai Kei, Shoujo Lolita sang chảnh.',
    },
  },
];

// ==========================================
// 5 EXTRA SKINCARE STEPS (BƯỚC 8 ĐẾN 12)
// ==========================================
export const EXTRA_SKINCARE_STEPS: JBeautySkincareStep[] = [
  {
    stepNumber: 8,
    stepName: 'Massage Tanaka Zogan Bấm Huyệt Thon Gọn Mặt (造顔マッサージ)',
    jpName: '田中宥久子の造顔・リンパマッサージ',
    romaji: 'Tanaka Zogan Rimpa Masaaji',
    purpose: 'Thải độc hệ bạch huyết, nâng cơ chống chảy xệ, xua tan phù nề và thon gọn cằm V-line',
    technique: 'Dùng 3 đầu ngón tay vuốt từ giữa trán sang thái dương, vuốt từ khóe mắt xuống hạch cổ, rồi miết dọc cơ ức đòn chũm xuống xương quai xanh.',
    holyGrailProduct: 'SUQQU Musculate Massage & Mask Cream',
    proTip: 'Luôn dùng đủ kem massage để ngón tay lướt êm, tuyệt đối không miết trên da khô rát vì sẽ gây nếp nhăn.',
    deepExplanation: {
      biologicalMechanism: 'Hệ bạch huyết là cỗ máy dọn rác tế bào của cơ thể. Động tác ấn huyệt Tanaka kích thích dòng chảy bạch huyết, đào thải độc tố và dịch ứ đọng, giúp giảm phù nề mặt buổi sáng tức thì.',
      skinBarrierScience: 'Tăng cường tuần hoàn vi mạch dưới da đưa oxy và dưỡng chất dồi dào nuôi dưỡng tầng biểu bì, kích thích nguyên bào sợi sản sinh elastin tự nhiên.',
      proAdvice: 'Thực hiện 3 phút mỗi sáng trước khi thoa dưỡng chất; bạn sẽ thấy khuôn mặt thon gọn rõ rệt và ăn phấn nền mượt mà hơn gấp đôi.',
    },
  },
  {
    stepNumber: 9,
    stepName: 'Xịt Khoáng Nước Cất Thảo Mộc Nano Đa Tầng (ナノミスト保水)',
    jpName: '和漢植物・ナノハイドレーションミスト',
    romaji: 'Wakan Shokubutsu Nano Misuto',
    purpose: 'Cung cấp độ ẩm tức thì, cân bằng độ pH và làm dịu da trước tác động của điều hòa nhiệt độ',
    technique: 'Để chai xịt cách mặt 20cm, xịt đều theo hình chữ X và dấu cộng, dùng lòng bàn tay áp nhẹ cho sương thẩm thấu.',
    holyGrailProduct: 'd program Allerbarrier Mist N (Shiseido)',
    proTip: 'Chiết ra chai nhỏ mang theo trong túi xách để xịt dặm lại mỗi 3-4 tiếng khi ngồi phòng máy lạnh.',
    deepExplanation: {
      biologicalMechanism: 'Các hạt sương nano kích thước micromet len lỏi qua các rãnh gian bào biểu bì, bù nước tức thì cho tầng sừng bị mất nước do bốc hơi biểu bì (TEWL).',
      skinBarrierScience: 'Chiết xuất thảo mộc Wakan (ngải cứu, cam thảo) củng cố màng lipid tự nhiên, ngăn ngừa các hạt bụi mịn PM2.5 bám dính vào lỗ chân lông.',
      proAdvice: 'Sau khi xịt xong, luôn vỗ nhẹ bằng tay ấm để hơi nước không bốc hơi mang theo độ ẩm tự nhiên của da.',
    },
  },
  {
    stepNumber: 10,
    stepName: 'Tẩy Tế Bào Chết Sinh Học Enzyme Gạo & Trái Cây (米酵素ピーリング)',
    jpName: '米ぬか・パパイン酵素洗顔パウダー',
    romaji: 'Komenuka Papain Kouso Sengan',
    purpose: 'Làm sạch sâu tận gốc lỗ chân lông, loại bỏ mụn đầu đen và sừng già cỗi mà không làm mòn rát da',
    technique: 'Đổ một lượng bột enzyme bằng đồng xu ra lòng bàn tay, thêm chút nước tạo bọt bông xốp mềm rồi massage vùng mũi, cằm và trán.',
    holyGrailProduct: 'Kanebo Suisai Beauty Clear Powder Wash',
    proTip: 'Chỉ massage bọt bông trên da trong 45-60 giây, không chà xát mạnh tay.',
    deepExplanation: {
      biologicalMechanism: 'Enzyme sinh học Papain và Protease hoạt động bằng cách thủy phân liên kết protein giữa các tế bào sừng chết đã thoái hóa, giúp chúng tự bong ra một cách êm ái mà không ảnh hưởng tới tế bào sống khỏe mạnh.',
      skinBarrierScience: 'Khác với tẩy da chết hạt thô (scrub) gây xước vi mô hoặc acid nồng độ cao gây rát đỏ, enzyme có độ pH trung tính thân thiện tuyệt đối với làn da nhạy cảm châu Á.',
      proAdvice: 'Sử dụng 1-2 lần mỗi tuần vào buổi tối sau bước tẩy trang để lỗ chân lông thông thoáng tuyệt đối, hấp thụ kem dưỡng sâu hơn 300%.',
    },
  },
  {
    stepNumber: 11,
    stepName: 'Chăm Sóc Vùng Da Cổ & Xương Quai Xanh (首元・デコルテケア)',
    jpName: '美首・デコルテ・エイジングケア',
    romaji: 'Biyou-kubi Dekorute Kea',
    purpose: 'Xóa mờ rãnh nhăn cổ, nâng cơ vùng ức ngực và duy trì đường nét cổ thiên nga kiêu sa',
    technique: 'Lấy kem dưỡng thoa từ dưới chân cổ vuốt ngược lên cằm theo chiều chống trọng lực, sau đó vuốt ngang hai bên xương quai xanh.',
    holyGrailProduct: 'Decorté AQ Meliority Intensive Neck Cream',
    proTip: 'Đừng bao giờ dừng bước dưỡng da ở cằm; khuôn mặt của phụ nữ Nhật Bản kéo dài từ trán xuống tận bầu ngực!',
    deepExplanation: {
      biologicalMechanism: 'Vùng da cổ có mật độ tuyến bã nhờn chỉ bằng 1/3 da mặt và cơ bám da cổ (Platysma) rất mỏng, khiến vùng này dễ bị lão hóa, chảy xệ và hình thành ngấn cổ sớm nhất trên cơ thể.',
      skinBarrierScience: 'Bổ sung peptide sinh học và ceramide thực vật giúp củng cố mạng lưới sợi collagen nâng đỡ vùng da cổ căng mịn.',
      proAdvice: 'Hạn chế cúi đầu nhìn điện thoại quá lâu (Hội chứng Tech Neck) và luôn bôi kem chống nắng cho toàn bộ vùng cổ mỗi khi ra ngoài.',
    },
  },
  {
    stepNumber: 12,
    stepName: 'Mặt Nạ Ngủ Khóa Ẩm Collagen Thạch Đêm (睡眠スリーピングパック)',
    jpName: '夜間集中リペア・スリーピングジェルパック',
    romaji: 'Suimin Suriipingu Jeru Pakku',
    purpose: 'Tái tạo tế bào suốt giấc ngủ vàng, khóa chặt toàn bộ tinh chất và đánh thức làn da căng mọng như ngậm nước vào sáng hôm sau',
    technique: 'Lấy lượng gel bằng hạt óc chó chấm lên 5 điểm, thoa nhẹ thành một lớp màng bảo vệ mỏng trong suốt rồi đi ngủ.',
    holyGrailProduct: 'Elixir Superieur Sleeping Gel Pack (Shiseido)',
    proTip: 'Để hũ gel vào ngăn mát tủ lạnh 15 phút trước khi đắp; cảm giác mát lịm sẽ ru dịu mọi căng thẳng và thu nhỏ lỗ chân lông tức thì.',
    deepExplanation: {
      biologicalMechanism: 'Khoảng thời gian từ 23h đến 2h sáng là lúc hormone tăng trưởng và quá trình phân chia tế bào da diễn ra mạnh mẽ nhất gấp 3 lần ban ngày.',
      skinBarrierScience: 'Dạng gel màng nước khóa ẩm bán thấm (Semi-occlusive Membrane) ngăn chặn tình trạng mất nước ban đêm do không khí phòng ngủ khô mà vẫn để da thở tự nhiên.',
      proAdvice: 'Đắp 2-3 lần mỗi tuần; vào những đêm đắp mặt nạ ngủ, bạn có thể bỏ qua bước kem dưỡng ẩm cuối cùng.',
    },
  },
];

// ==========================================
// 5 EXTRA NATURAL INGREDIENTS (THẢO MỘC MỚI)
// ==========================================
export const EXTRA_NATURAL_INGREDIENTS: JapaneseNaturalIngredient[] = [
  {
    id: 'reishi_mushroom',
    name: 'Nấm Linh Chi Đỏ Nhật Bản (Reishi / 霊芝)',
    jpName: '霊芝（れいし）・赤芝エキス',
    romaji: 'Reishi Ekisu',
    historicalEra: 'Thời kỳ Nara & Heian (Bảo vật hoàng gia dâng tiến Thiên Hoàng)',
    icon: '🍄',
    keyNutrients: ['Beta-glucan', 'Triterpenes', 'Polysaccharide', 'Ganoderic Acid'],
    skinBenefits: 'Kích thích tái tạo tế bào tầng sâu, tăng sinh collagen, tăng cường hệ miễn dịch cho da yếu và làm mờ nếp nhăn lão hóa.',
    traditionalUsage: 'Được mệnh danh là "Nấm trường sinh", quý tộc Kyoto sắc nước nấm linh chi để uống trường thọ và dùng bã nấm đắp mặt dưỡng nhan.',
    modernApplication: 'Dòng kem dưỡng trẻ hóa da cao cấp Menard Embellir chiết xuất từ tinh chất linh chi đen và linh chi đỏ Nhật Bản.',
    proTip: 'Uống trà nấm linh chi đỏ mỗi ngày kết hợp thoa tinh chất giúp làn da hồng hào từ sâu bên trong cơ thể.',
    deepExplanation: {
      scientificResearch: 'Các nghiên cứu y khoa tại Đại học Dược Tokyo chứng minh Polysaccharide trong nấm linh chi ức chế enzym Tyrosinase gây nám da và bảo vệ DNA tế bào khỏi tia bức xạ UV.',
      molecularBio: 'Beta-glucan trong linh chi kích thích các đại thực bào (Macrophage) dưới da, đẩy nhanh tốc độ phục hồi vết thương và tăng độ đàn hồi biểu bì.',
      geishaSecretHeritage: 'Các Geisha tại Gion xem nước linh chi là phương thuốc bí truyền để giữ làn da không tuổi dù thường xuyên phải trang điểm đậm.',
    },
  },
  {
    id: 'mozuku_seaweed',
    name: 'Tảo Biển Nâu Okinawa Mozuku & Fucoidan (海藻・モズク)',
    jpName: '沖縄モズク・フコイダン',
    romaji: 'Okinawa Mozuku Fucoidan',
    historicalEra: 'Truyền thống ngàn năm của cư dân đảo trường thọ Okinawa',
    icon: '🌊',
    keyNutrients: ['Fucoidan tinh khiết', 'Axit Alginic', 'Khoáng chất biển sâu', 'Vitamin B12'],
    skinBenefits: 'Khả năng giữ nước gấp 5 lần Hyaluronic Acid, tạo lớp màng sinh học khóa ẩm bảo vệ da khỏi khói bụi ô nhiễm môi trường.',
    traditionalUsage: 'Ngư dân vùng biển Okinawa dù phơi nắng gió cả ngày nhưng bàn tay luôn mềm mại nhờ thường xuyên thu hoạch tảo nâu Mozuku.',
    modernApplication: 'Mặt nạ thạch tảo biển và serum phục hồi da sau treatment peel da hoặc laser.',
    proTip: 'Đắp mặt nạ chiết xuất Fucoidan sau khi đi nắng về giúp hạ nhiệt làn da bỏng rát tức thì sau 15 phút.',
    deepExplanation: {
      scientificResearch: 'Viện Nghiên cứu Hải dương học Okinawa chỉ ra Fucoidan có cấu trúc phân tử sulfate polysaccharide tự nhiên giúp tăng khả năng tự kháng viêm của biểu bì lên tới 74%.',
      molecularBio: 'Tạo lớp màng ẩm phân tử linh hoạt giữ chặt các phân tử nước trên bề mặt da, ngăn chặn hiện tượng mất nước qua biểu bì.',
      geishaSecretHeritage: 'Phụ nữ làng chài đảo Ryukyu nổi tiếng khắp Nhật Bản với làn da căng bóng ngọc trai dù sống nơi nắng gió khắc nghiệt nhất.',
    },
  },
  {
    id: 'konjac_root',
    name: 'Củ Nưa Tự Nhiên Konjac (蒟蒻 - こんにゃく)',
    jpName: '蒟蒻（こんにゃく）・グルコマンナン',
    romaji: 'Konnyaku Gurukomannan',
    historicalEra: 'Thế kỷ VI thời kỳ Asuka (dùng làm thuốc trị bệnh và thanh lọc)',
    icon: '🥔',
    keyNutrients: ['Glucomannan (Chất xơ hòa tan tự nhiên)', 'Nước khoáng tự nhiên', 'Khoáng chất vi lượng'],
    skinBenefits: 'Làm sạch tế bào sừng chết và bã nhờn một cách dịu nhẹ nhất trên đời, cân bằng độ pH tự nhiên, an toàn cho cả làn da em bé sơ sinh.',
    traditionalUsage: 'Các bà mẹ Nhật thời Edo dùng miếng bọt củ nưa Konjac ngâm nước ấm để tắm rửa cho trẻ sơ sinh và tẩy trang cho thiếu nữ.',
    modernApplication: 'Miếng bọt biển rửa mặt Konjac Sponge 100% tự nhiên phân hủy sinh học được giới làm đẹp toàn cầu săn đón.',
    proTip: 'Luôn ngâm miếng bọt nưa Konjac vào nước ấm cho nở mềm hoàn toàn trước khi mát-xa mặt; không bao giờ chà xát khi miếng xốp còn khô cứng.',
    deepExplanation: {
      scientificResearch: 'Cấu trúc sợi xơ thực vật dạng lưới của Glucomannan có tính kiềm nhẹ tự nhiên, trung hòa acid béo dư thừa trên da mà không cần xà phòng hóa học.',
      molecularBio: 'Khả năng ngậm nước gấp 50 lần trọng lượng khô tạo thành lớp đệm nước êm ái giữa tay và da mặt, giảm ma sát xuống mức 0%.',
      geishaSecretHeritage: 'Geisha sử dụng bọt nưa luân phiên hàng ngày để loại bỏ lớp phấn trắng Oshiroi mà không làm tổn thương màng ẩm tự nhiên.',
    },
  },
  {
    id: 'shiso_leaf',
    name: 'Lá Tía Tô Đỏ Nhật Bản Akajiso (赤紫蘇)',
    jpName: '赤紫蘇（あかじそ）・ロスマリン酸',
    romaji: 'Akajiso Rosumarin-san',
    historicalEra: 'Thế kỷ VIII (Vườn thảo dược thời Heian)',
    icon: '🍃',
    keyNutrients: ['Axit Rosmarinic', 'Luteolin', 'Anthocyanin', 'Vitamin C & Carotene'],
    skinBenefits: 'Kháng histamine tự nhiên chống mẩn ngứa dị ứng thời tiết, kháng viêm mụn bọc sưng đỏ và chống oxy hóa mạnh mẽ.',
    traditionalUsage: 'Người Nhật đun lá tía tô đỏ lấy nước tắm vào mùa đông để trị mẩn ngứa và dùng nước cất tía tô lau mặt làm dịu da cháy nắng.',
    modernApplication: 'Nước hoa hồng tía tô Dokudami & Shiso Lotion làm mát da, cấp ẩm tức thì cho da dầu mụn mẫn cảm.',
    proTip: 'Nấu nước lá tía tô tươi để nguội, cho vào bình xịt làm xịt khoáng làm dịu da dị ứng phấn hoa hoặc sau khi đi nắng.',
    deepExplanation: {
      scientificResearch: 'Axit Rosmarinic trong tía tô đỏ được chứng minh có khả năng ức chế phản ứng viêm dị ứng mạnh hơn cả vitamin E, ngăn ngừa tổn thương oxy hóa do bức xạ mặt trời.',
      molecularBio: 'Anthocyanin tạo màu đỏ tía là chất chống oxy hóa tự nhiên giúp bảo vệ collagen khỏi sự thoái hóa của enzyme MMP-1.',
      geishaSecretHeritage: 'Thiếu nữ Kyoto xưa thường uống siro tía tô đỏ lên men vào mùa hè để thanh nhiệt cơ thể, giữ cho làn da không bị nổi mụn nhiệt.',
    },
  },
  {
    id: 'komenuka_abura',
    name: 'Dầu Mầm Gạo Tinh Khiết Ép Lạnh (米ぬか油)',
    jpName: '米ぬか油・ライスブランオイル',
    romaji: 'Komenuka Abura / Raisuburan Oiru',
    historicalEra: 'Thời kỳ Minh Trị (Meiji) với kỹ thuật ép dầu truyền thống',
    icon: '✨',
    keyNutrients: ['Squalene thực vật', 'Tocotrienol (Siêu Vitamin E)', 'Gamma-Oryzanol', 'Phytosterols'],
    skinBenefits: 'Khóa ẩm sâu, tái tạo lớp màng lipid bảo vệ da khô nứt nẻ, làm mềm vết chai sần và ngăn chặn tình trạng thoát hơi nước.',
    hairBenefits: 'Dưỡng ngọn tóc khô xơ chẻ ngọn trở nên bóng mượt mà không gây bết dính nặng đầu.',
    traditionalUsage: 'Thợ gặt lúa Nhật Bản thường xoa dầu mầm gạo lên bàn tay và bàn chân nứt nẻ sau mỗi vụ gặt mùa đông để làm lành da nhanh chóng.',
    modernApplication: 'Thành phần cốt lõi trong các dòng dầu tẩy trang cao cấp của Shu Uemura và DHC.',
    proTip: 'Nhỏ 1 giọt dầu mầm gạo vào lòng bàn tay xoa nóng rồi ấn nhẹ lên hai má vào bước cuối cùng của chu trình skincare buổi tối mùa đông.',
    deepExplanation: {
      scientificResearch: 'Tocotrienol trong dầu mầm gạo có hoạt tính chống oxy hóa cao gấp 40-60 lần so với Tocopherol thông thường, ngăn ngừa lipid peroxide hóa trên bề mặt da.',
      molecularBio: 'Squalene thực vật có cấu trúc tương thích sinh học 100% với bã nhờn tự nhiên của người, thẩm thấu nhanh vào tầng sừng chỉ sau 30 giây.',
      geishaSecretHeritage: 'Được sử dụng như lớp màng dưỡng ẩm nền tảng trước khi Geisha bôi sáp Bintsuke lên tóc và mặt.',
    },
  },
];

// ==========================================
// 5 EXTRA NATURAL RECIPES (CÔNG THỨC DIY MỚI)
// ==========================================
export const EXTRA_NATURAL_RECIPES: NaturalBeautyRecipe[] = [
  {
    id: 'recipe_mozuku_mask',
    title: 'Mặt Nạ Thạch Tảo Biển Cấp Nước Căng Mọng Biển Sâu',
    ingredientHighlight: 'Bột tảo nâu Mozuku + Nước khoáng + 1 giọt mật ong',
    targetSkinType: 'Da khô thiếu nước, da xỉn màu mệt mỏi sau chuyến bay dài',
    prepTime: '3 phút chuẩn bị · Đắp 15 phút',
    ingredients: [
      '1 thìa canh bột tảo biển nguyên chất (hoặc tảo Mozuku nghiền nhuyễn)',
      '2 thìa canh nước ấm hoặc nước khoáng',
      '1/2 thìa cà phê mật ong nguyên chất',
    ],
    steps: [
      'Khuấy đều bột tảo biển với nước ấm cho đến khi tạo thành hỗn hợp gel sệt nhớt tự nhiên.',
      'Thêm mật ong vào khuấy đều cho hòa quyện.',
      'Dùng cọ quét đều hỗn hợp lên mặt đã rửa sạch.',
      'Thư giãn trong 15 phút rồi rửa sạch nhẹ nhàng bằng nước ấm.',
    ],
    frequency: '2 lần / tuần',
    caution: 'Kiểm tra thử dị ứng ở vùng da cổ trước nếu bạn có tiền sử dị ứng với hải sản hoặc i-ốt.',
    deepExplanation: {
      synergyMechanism: 'Fucoidan trong tảo biển phối hợp cùng đường đa tự nhiên trong mật ong tạo thành mạng lưới giữ ẩm kép, khóa chặt nước ở tầng biểu bì suốt 24 giờ.',
      stepByStepSecret: 'Quét mặt nạ theo hướng từ cằm lên trán để kích thích vi tuần hoàn và giúp chất gel bám đều trên da.',
      dermatologistNote: 'Mặt nạ thiên nhiên này cung cấp hơn 60 loại vi khoáng chất tự nhiên giúp phục hồi hàng rào sinh học của da.',
    },
  },
  {
    id: 'recipe_shiso_mist',
    title: 'Xịt Khoáng Nước Cất Tía Tô Shiso Dịu Da Cháy Nắng & Mụn Kích Ứng',
    ingredientHighlight: 'Nước hãm lá tía tô đỏ Akajiso tươi',
    targetSkinType: 'Da mẩn đỏ, da mụn kích ứng do thời tiết nắng nóng',
    prepTime: '10 phút nấu · Dùng hàng ngày',
    ingredients: [
      '1 nắm lá tía tô đỏ tươi (khoảng 15-20 lá rửa thật sạch)',
      '200ml nước cất tinh khiết',
      '1 chai xịt phun sương sạch',
    ],
    steps: [
      'Đun sôi 200ml nước cất, thả lá tía tô vào đun lửa nhỏ trong 5 phút cho tinh chất tan ra màu tím hồng.',
      'Tắt bếp, đậy nắp để nguội hoàn toàn.',
      'Lọc bỏ bã lá, rót phần nước cất tím vào chai xịt phun sương sạch.',
      'Bảo quản trong ngăn mát tủ lạnh, xịt làm dịu da khi đi ngoài trời nắng về.',
    ],
    frequency: 'Xịt 3-4 lần mỗi ngày bất cứ khi nào da thấy nóng rát',
    caution: 'Vì không có chất bảo quản, hãy dùng hết trong vòng 7 ngày và luôn để trong tủ lạnh.',
    deepExplanation: {
      synergyMechanism: 'Nhiệt độ mát lạnh kết hợp axit rosmarinic từ tía tô làm co các mao mạch đang giãn nở do nhiệt, chặn đứng phản ứng viêm sưng tức thì.',
      stepByStepSecret: 'Không đun sôi quá lâu làm phân hủy các vitamin nhạy cảm với nhiệt; 5 phút ở lửa nhỏ là thời gian lý tưởng nhất.',
      dermatologistNote: 'Nước cất thảo mộc nguyên bản không cồn, không hương liệu, là cứu tinh cho làn da nhạy cảm vào mùa hè.',
    },
  },
  {
    id: 'recipe_konjac_scrub',
    title: 'Liệu Pháp Bọt Konjac Mát-xa Sạch Mụn Cám Cánh Mũi',
    ingredientHighlight: 'Bông mút Konjac 100% tự nhiên + Bọt rửa mặt dịu nhẹ',
    targetSkinType: 'Mọi loại da, đặc biệt là da có mụn cám, sợi bã nhờn vùng chữ T',
    prepTime: '2 phút ngâm nở · Mát-xa 2 phút',
    ingredients: [
      '1 miếng bông Konjac Sponge hình giọt nước',
      '1 bát nước ấm',
      '1 lượng nhỏ bọt rửa mặt tạo bọt mịn',
    ],
    steps: [
      'Ngâm bông mút Konjac vào bát nước ấm 2-3 phút cho đến khi nở to mềm mại hoàn toàn.',
      'Vắt nhẹ bớt nước, lấy một chút bọt rửa mặt lên bề mặt bông mút.',
      'Mát-xa thật nhẹ nhàng theo chuyển động tròn quanh cánh mũi, cằm và trán.',
      'Rửa sạch mặt với nước mát, xả sạch bông mút và treo nơi khô ráo thoáng gió.',
    ],
    frequency: 'Cách ngày hoặc 3 lần / tuần',
    caution: 'Tuyệt đối không dùng khi bông còn khô cứng; thay bông mút mới sau 2-3 tháng sử dụng để đảm bảo vệ sinh.',
    deepExplanation: {
      synergyMechanism: 'Bề mặt sợi Glucomannan dạng vi xốp giữ các hạt nước tạo lớp đệm ngăn ma sát cơ học làm rát da.',
      stepByStepSecret: 'Chỉ dùng lực của chính sợi bông mút, không dùng lực đè mạnh tay từ ngón tay.',
      dermatologistNote: 'Phương pháp vật lý lành tính nhất thay thế hoàn toàn các miếng dán lột mụn gây giãn nở lỗ chân lông.',
    },
  },
  {
    id: 'recipe_reishi_eye',
    title: 'Serum Thảo Mộc Linh Chi & Hoa Cúc Mờ Quầng Thâm Mắt',
    ingredientHighlight: 'Nước sắc nấm linh chi + Tinh chất trà hoa cúc Chamomile',
    targetSkinType: 'Quầng thâm mắt mệt mỏi, bọng mắt sưng húp do thức khuya',
    prepTime: '5 phút chuẩn bị · Đắp 10 phút',
    ingredients: [
      '2 thìa canh nước sắc nấm linh chi đỏ cô đặc nguội',
      '1 thìa canh nước trà hoa cúc để lạnh',
      '2 miếng bông tẩy trang mỏng cotton',
    ],
    steps: [
      'Trộn đều nước sắc linh chi và nước trà hoa cúc trong một chén nhỏ.',
      'Nhúng 2 miếng bông tẩy trang mỏng vào hỗn hợp cho thấm đẫm.',
      'Nhắm mắt và đắp nhẹ nhàng lên vùng bọng mắt dưới.',
      'Thư giãn trong 10-15 phút nghe nhạc êm dịu, sau đó gỡ bông và vỗ nhẹ cho tinh chất thẩm thấu.',
    ],
    frequency: 'Mỗi tối trước khi đi ngủ hoặc buổi sáng khi mắt bị sưng',
    caution: 'Tránh để tinh chất chảy trực tiếp vào trong tròng mắt.',
    deepExplanation: {
      synergyMechanism: 'Beta-glucan trong linh chi tăng cường tuần hoàn vi mạch kết hợp apigenin trong hoa cúc làm dịu hệ thần kinh thị giác.',
      stepByStepSecret: 'Bảo quản hỗn hợp trong tủ lạnh trước khi đắp; độ lạnh giúp mạch máu co lại nhanh chóng, xua tan quầng thâm tức thì.',
      dermatologistNote: 'Vùng da quanh mắt mỏng gấp 4 lần da mặt, công thức thảo mộc không dầu này hoàn toàn không gây mụn thịt (Milia).',
    },
  },
  {
    id: 'recipe_tsubaki_body',
    title: 'Dầu Dưỡng Toàn Thân Tsubaki & Yuzu Khóa Ẩm Tắm Đêm Onsen',
    ingredientHighlight: 'Dầu hoa trà Tsubaki + Vài giọt tinh dầu vỏ thanh yên Yuzu',
    targetSkinType: 'Da toàn thân khô ráp, vảy sần mùa đông, căng thẳng mệt mỏi',
    prepTime: '1 phút pha chế · Thoa ngay khi da còn ẩm',
    ingredients: [
      '30ml dầu hoa trà Tsubaki nguyên chất ép lạnh',
      '3-4 giọt tinh dầu vỏ thanh yên Yuzu hữu cơ tự nhiên',
      '1 chai thủy tinh tối màu',
    ],
    steps: [
      'Nhỏ tinh dầu Yuzu vào chai dầu hoa trà Tsubaki và lắc nhẹ đều tay.',
      'Sau khi tắm nước ấm xong, khi da cơ thể vẫn còn ẩm nhẹ, lấy 5-6 giọt dầu ra lòng bàn tay.',
      'Xoa ấm hai lòng bàn tay hít hà hương thơm thư giãn của quả thanh yên Yuzu.',
      'Mát-xa đều lên cánh tay, bắp chân, khuỷu tay và vùng da khô sần.',
    ],
    frequency: 'Sử dụng hàng ngày sau khi tắm buổi tối',
    caution: 'Không thoa tinh dầu nguyên chất trực tiếp lên da mà chưa pha loãng với dầu nền hoa trà.',
    deepExplanation: {
      synergyMechanism: 'Axit Oleic trong dầu Tsubaki khóa ẩm biểu bì trong khi hương thơm thanh khiết của Yuzu kích thích hệ thần kinh đối giao cảm, giải tỏa stress và giúp ngủ sâu giấc.',
      stepByStepSecret: 'Bôi khi da còn ẩm nước (nguyên tắc 3 phút sau tắm) giúp dầu khóa chặt các phân tử nước trong biểu bì.',
      dermatologistNote: 'Mô phỏng trải nghiệm tắm suối khoáng nóng Onsen truyền thống tại nhà (*Yuzu-yu*).',
    },
  },
];

// ==========================================
// 5 EXTRA BEAUTY DICTIONARY TERMS
// ==========================================
export const EXTRA_BEAUTY_DICTIONARY: BeautyVocabularyItem[] = [
  {
    term: '素肌感 (Suhada-kan)',
    reading: 'すはだかん',
    romaji: 'suhada-kan',
    meaning: 'Cảm giác làn da mộc chân thật, mỏng nhẹ như không trang điểm mà vẫn rạng rỡ',
    contextUsage: '素肌感を活かしたベースメイクが今季のトレンド。(Lớp nền tôn vinh cảm giác da mộc tự nhiên là xu hướng chủ đạo của mùa này.)',
    deepExplanation: {
      culturalNuance: 'Triết lý tối thượng của mỹ học J-Beauty: Đỉnh cao của trang điểm là khiến người đối diện tin rằng bạn sở hữu làn da đẹp bẩm sinh mà không cần bất kỳ lớp phấn nào.',
      originEra: 'Thời kỳ Heisei đến Reiwa hiện đại tại Tokyo.',
      howToUseInSentence: '彼女のメイクは素肌感があってすごく魅力的だね。(Lớp trang điểm của cô ấy có độ mộc tự nhiên trông thật quyến rũ.)',
    },
  },
  {
    term: '艶肌 (Tsuyahada)',
    reading: 'つやはだ',
    romaji: 'tsuyahada',
    meaning: 'Làn da bóng mướt phủ sương ngọc trai, phát sáng khỏe mạnh từ sâu bên trong',
    contextUsage: 'オイルを一滴混ぜるだけで、簡単に艶肌が完成する。(Chỉ cần trộn một giọt dầu dưỡng là có thể tạo nên làn da bóng mướt hoàn hảo.)',
    deepExplanation: {
      culturalNuance: 'Khác với vẻ bóng dầu (Oily), Tsuyahada là độ bóng mờ mịn màng như ánh xà cừ ngọc trai biển sâu, biểu tượng của sự sang trọng và sức sống thanh xuân.',
      originEra: 'Bắt nguồn từ các cung nữ triều đình thời Heian.',
      howToUseInSentence: '内側から発光するような艶肌を目指しましょう。(Hãy hướng tới làn da bóng khỏe như tự phát sáng từ bên trong.)',
    },
  },
  {
    term: '束感 (Taba-kan)',
    reading: 'たばかん',
    romaji: 'taba-kan',
    meaning: 'Hiệu ứng gom chụm thành từng tép nhỏ rõ nét (dùng cho lông mi hoặc tóc mái thưa)',
    contextUsage: 'ピンセットでまつ毛をつまんで束感を出すのが今っぽい。(Dùng nhíp chụm các sợi mi lại thành từng tép nhỏ là phong cách chuẩn trend hiện nay.)',
    deepExplanation: {
      culturalNuance: 'Hiệu ứng sợi mi hoặc lọn tóc chụm lại tạo nên cấu trúc đồ họa thanh thoát, mắt to tròn như búp bê manga mà không bị dày cộp rối mắt.',
      originEra: 'Văn hóa Idol Harajuku & TikTok Reiwa.',
      howToUseInSentence: '束感まつ毛で目元の存在感がぐっとアップする。(Mi chụm tép taba-kan giúp tăng sức hút cho đôi mắt lên gấp bội.)',
    },
  },
  {
    term: '抜け感 (Nuke-kan)',
    reading: 'ぬけかん',
    romaji: 'nuke-kan',
    meaning: 'Độ thoáng đãng, tự nhiên, không bị gò bó hay gồng mình quá đà trong phong cách',
    contextUsage: 'アイラインをあえて引かないことで、目元に抜け感をプラス。(Cố tình không kẻ eyeliner đậm để tạo độ thoáng đãng tinh tế cho ánh mắt.)',
    deepExplanation: {
      culturalNuance: 'Mỹ học trừ tà sự cứng nhắc: Một layout hoàn hảo không phải là vẽ kín mọi chỗ, mà là biết để lại những khoảng trống tinh tế để tổng thể thở được.',
      originEra: 'Phong cách thời trang và làm đẹp Tokyo đương đại.',
      howToUseInSentence: '抜け感のあるヘアスタイルでおしゃれに見せる。(Tạo vẻ sành điệu nhờ kiểu tóc có độ thoáng tự nhiên.)',
    },
  },
  {
    term: '大人可愛い (Otona-kawaii)',
    reading: 'おとなかわいい',
    romaji: 'otona-kawaii',
    meaning: 'Nét đẹp dễ thương ngọt ngào nhưng vẫn toát lên khí chất trưởng thành, thanh lịch quý phái',
    contextUsage: 'ピンクをくすませて大人可愛い雰囲気に仕上げる。(Hạ trầm sắc hồng để tạo nên thần thái dễ thương trưởng thành đầy cuốn hút.)',
    deepExplanation: {
      culturalNuance: 'Sự tiến hóa của văn hóa Kawaii dành cho phụ nữ sau tuổi 20: Giữ lại trái tim ngọt ngào thiếu nữ nhưng biểu hiện qua các gam màu khói thanh tao và đường nét trang nhã.',
      originEra: 'Các tạp chí thời trang Nhật Bản như Sweet, More, CanCam thập niên 2010.',
      howToUseInSentence: '大人可愛いメイクは大人の女性の強い味方です。(Trang điểm phong cách Otona-kawaii là vũ khí đắc lực của người phụ nữ hiện đại.)',
    },
  },
];
