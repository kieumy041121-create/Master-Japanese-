export interface JapaneseFashionStyleItem {
  id: string;
  name: string;
  jpName: string;
  romaji: string;
  badge: string;
  aestheticVibe: string;
  eraOrOrigin: string;
  targetGenZ: string;
  tagColor: string;

  // 1. Phối đồ chi tiết (Outfit Coordination)
  outfit: {
    tops: string;
    bottoms: string;
    outerwear: string;
    footwear: string;
    colorPalette: {
      primary: string;
      secondary: string;
      accent: string;
      colors: string[];
    };
    goldenRules: string[];
    silhouetteTips: string;
  };

  // 2. Phong cách trang điểm phù hợp (Makeup Guide)
  makeup: {
    base: string;
    eyes: {
      namidaBukuro: string;
      eyeliner: string;
      eyeshadow: string;
      lashes: string;
    };
    blush: string;
    lips: string;
  };

  // 3. Kiểu tóc chuẩn gái Nhật (Hair Styling)
  hairstyle: {
    mainStyle: string;
    bangs: string;
    hairAccessories: string;
    colorTrend: string;
  };

  // 4. Trang sức & Phụ kiện đi kèm (Jewelry & Accessories)
  accessories: {
    jewelry: string[];
    bags: string[];
    hats: string[];
    nails: string;
  };

  // 5. Giải thích văn hóa chuyên sâu (Cultural Explanation)
  culturalContext: {
    sociologicalOrigin: string;
    psychologicalMeaning: string;
    japaneseKeyTerms: {
      term: string;
      reading: string;
      meaning: string;
    }[];
    practicalAdvice: string;
  };

  // 6. Hoàn cảnh & Thực chiến 4 mùa tại Việt Nam (Occasions & Seasonal Wear)
  occasions?: {
    cafeOotd: string;
    romanticDate: string;
    campusSchool: string;
    streetHangout: string;
    vietnamWeatherTips: string;
  };

  // 7. Gợi ý phối mẫu 1-click (Mix & Match Presets)
  mixMatchPresets?: {
    presetName: string;
    occasion: string;
    top: string;
    bottom: string;
    outer: string;
    shoes: string;
    accessories: string;
    hackTip: string;
  }[];
}

export const initialJapaneseFashionStyles: JapaneseFashionStyleItem[] = [
  {
    id: 'shoujo_style',
    name: 'Shoujo Style (少女スタイル - Thiếu Nữ Mộng Mơ Manga)',
    jpName: '少女系・ガーリースタイル',
    romaji: 'Shoujo-kei Gaarii Sutairu',
    badge: 'Đặc Biệt Yêu Cầu · Biểu Tượng Manga Thiếu Nữ',
    aestheticVibe: 'Trong trẻo, ngọt ngào, thơ mộng như bước ra từ trang bìa truyện tranh thiếu nữ Ribon & Nakayoshi',
    eraOrOrigin: 'Khởi nguồn từ truyện tranh Shoujo Manga thập niên 1970–90 và thánh địa thời trang Harajuku Laforet',
    targetGenZ: 'Dành cho các bạn nữ theo đuổi vẻ đẹp ngây thơ, dịu dàng, chụp ảnh cafe hoa, dạo phố mùa xuân hay hẹn hò lãng mạn',
    tagColor: 'from-pink-500/20 to-rose-500/10 border-pink-500/40 text-pink-300',

    outfit: {
      tops: 'Áo sơ mi chiffon trắng kem cổ sen tròn Peter Pan viền ren thêu hoa, tay phồng babydoll xếp nếp bồng bềnh, áo dệt kim mỏng thắt nơ ruy băng satin trước ngực.',
      bottoms: 'Chân váy chữ A xòe nhẹ viền bèo tầng hoặc chân váy yếm vintage màu pastel (hồng phấn, vàng bơ, xanh baby) có thắt đai nơ tôn eo nhỏ nhắn.',
      outerwear: 'Cardigan len mỏng dệt hoa cúc nhí, áo khoác dạ cúc gỗ kiểu búp bê hoặc áo khoác tweed dáng lửng tôn tỷ lệ cơ thể.',
      footwear: 'Giày Mary Jane da bóng đế cao 3-5cm quai ngang đính khóa trái tim, kết hợp tất trắng cổ cao viền đăng ten ren gợn sóng.',
      colorPalette: {
        primary: 'Hồng phấn hoa đào (Sakura Pink)',
        secondary: 'Trắng kem sữa (Vanilla Cream)',
        accent: 'Xanh da trời baby (Pastel Sky Blue)',
        colors: ['#FCE4EC', '#FFF9C4', '#E1F5FE', '#FFFFFF'],
      },
      goldenRules: [
        'Quy tắc 60-30-10: 60% gam màu trắng kem nền nã, 30% màu hồng phấn/xanh baby của váy, 10% điểm nhấn nơ đỏ cherry hoặc phụ kiện ngọc trai.',
        'Độ dài váy lý tưởng: Chân váy chạm trên đầu gối 7-10cm giúp đôi chân trông thon thả và giữ trọn nét đáng yêu thiếu nữ.',
        'Chất liệu ưu tiên mềm mại: Tơ tằm voan, chiffon mỏng rủ, cotton dập nổi xốp nhẹ, tránh chất liệu cứng nhắc khô khan.',
      ],
      silhouetteTips: 'Phom dáng chữ A hoặc đồng hồ cát nhẹ: Áo ôm vừa vặn thân trên kết hợp tùng váy xòe bồng tạo hiệu ứng eo thon và đôi chân dài hơn.',
    },

    makeup: {
      base: 'Lớp nền da mochi (Mochi-hada) mướt sương, che khuyết điểm mỏng nhẹ giữ lại nét tự nhiên của làn da thiếu nữ, dặm phấn phủ kiềm dầu vùng chữ T.',
      eyes: {
        namidaBukuro: 'Vẽ bọng mắt cười giả 3D (涙袋 Namida-bukuro): Dùng cọ dẹt kẻ đường bóng màu nâu nhạt dưới mí dưới 2mm, tán nhũ ngọc trai champagne bắt sáng đỉnh bọng mắt.',
        eyeliner: 'Kẻ mắt cụp ngây thơ (垂れ目 Tare-me): Dùng chì nâu vẽ đuôi mắt xuôi nhẹ xuống 1-2mm theo khóe mắt tự nhiên, tạo ánh nhìn e ấp hiền thục.',
        eyeshadow: 'Tông màu hồng đào đào san hô hoặc cam sữa mơ màng, nhấn thêm nhũ mịn lấp lánh (Kirakira glitter) ở giữa bầu mắt.',
        lashes: 'Bấm mi cong vút hình cánh quạt, chuốt mascara tơi từng sợi hoặc gắn mi giả sợi chùm tách lớp mỏng như mi nhân vật manga.',
      },
      blush: 'Đánh phấn má hồng tròn ửng sát dưới bọng mắt (kiểu say rượu Igari nhẹ nhàng) lan sang sống mũi, tạo cảm giác như vừa bước ra từ gió xuân se lạnh.',
      lips: 'Son tint bóng syrup mọng nước (Garasu-dama lip) màu dâu tây hoặc đào mọng, viền môi tán mờ sương tạo hiệu ứng chúm chím.',
    },

    hairstyle: {
      mainStyle: 'Tóc uốn sóng lơi nữ tính Yuru-fuwa (ゆるふわ) bay bổng tự nhiên, hoặc tóc buộc hai bên thấp (Low Twin-tail) đánh phồng chân tóc.',
      bangs: 'Mái thưa búp bê Hime-cut nhẹ hai bên mai ôm sát xương gò má, giúp gương mặt trở nên tròn trịa và nhỏ nhắn (Kogao 小顔効果).',
      hairAccessories: 'Kẹp nơ ruy băng nhung đôi hai bên tai, băng đô cài tóc viền ren ngọc trai, kẹp mỏ vịt hoa anh đào.',
      colorTrend: 'Nâu trà sữa (Milk tea beige), nâu hạt dẻ ánh cam mật ong hoặc nâu đen tự nhiên.',
    },

    accessories: {
      jewelry: ['Vòng cổ choker ruy băng đính mặt trái tim thạch anh', 'Khuyên tai ngọc trai rơi dáng nơ', 'Nhẫn bạc đính hoa cúc đá lấp lánh'],
      bags: ['Túi xách da mini hình hộp tròn đính nơ', 'Túi cói đan hoa ren vintage mùa hè', 'Túi xách quai ngọc trai tiểu thư'],
      hats: ['Mũ nồi beret dạ len phong cách thiếu nữ Paris', 'Mũ cói thắt nơ ruy băng ren dạo phố'],
      nails: 'Móng tay đính đá thạch pastel ombre, vẽ hoa cúc nhỏ hoặc đính charm nơ 3D trong suốt.',
    },

    culturalContext: {
      sociologicalOrigin: 'Shoujo Style bắt nguồn từ mỹ học "Kawaii" (Đáng yêu) của văn hóa đại chúng Nhật Bản, tôn vinh thời thanh xuân tươi đẹp và khao khát gìn giữ tâm hồn thiếu nữ thuần khiết trước sức ép trưởng thành.',
      psychologicalMeaning: 'Tại Nhật Bản, diện Shoujo Style là một hình thức "Fuku-iku" (Thời trang chữa lành): Mang lại cảm giác an yên, tự thưởng cho bản thân một ngày ngọt ngào thoát khỏi những quy chuẩn công sở ngột ngạt.',
      japaneseKeyTerms: [
        { term: '少女趣味 (Shoujo Shumi)', reading: 'しょうじょしゅみ', meaning: 'Gu thẩm mỹ yêu thích sự ngọt ngào, lãng mạn tuổi thiếu nữ' },
        { term: 'ゆるふわ (Yuru-fuwa)', reading: 'ゆるふわ', meaning: 'Phong cách uốn tóc / phối đồ lơi mềm mại, bồng bềnh' },
        { term: '小顔効果 (Kogao Kouka)', reading: 'こがおこうか', meaning: 'Hiệu ứng phối đồ / kiểu tóc giúp khuôn mặt trông nhỏ nhắn, thanh tú' },
        { term: '涙袋 (Namida-bukuro)', reading: 'なみだぶくろ', meaning: 'Bọng mắt cười tạo vẻ ngây thơ, đáng yêu chuẩn gái Nhật' },
      ],
      practicalAdvice: 'Tại Việt Nam, bạn có thể diện style này vào tiết trời thu đông se lạnh hoặc những ngày xuân nắng nhẹ. Kết hợp áo sơ mi voan tay lỡ cùng chân váy xếp ly đi cafe phong cách Nhật Bản rất ăn ảnh!',
    },

    occasions: {
      cafeOotd: 'Áo sơ mi voan tay bồng cổ sen thêu hoa + Chân váy xếp ly hồng pastel + Giày Mary Jane quai ngang + Kẹp nơ ruy băng satin. Ngồi cạnh cửa sổ kính quán cafe hoa ngập nắng chụp ảnh cực kỳ ăn hình!',
      romanticDate: 'Đầm xòe chữ A hoa nhí vintage tay lỡ phối cổ đăng ten ren + Cardigan len lông thỏ mỏng khoác hờ vai + Giày búp bê thắt nơ + Túi xách vintage da bò nâu nhỏ.',
      campusSchool: 'Áo len dệt kim mỏng cổ tròn màu kem thêu hoa nhí + Chân váy xếp ly caro be nhạt chạm trên gối + Giày Loafer nữ sinh da bóng + Tất cổ cao dệt gân.',
      streetHangout: 'Áo baby tee cotton trắng phối cổ ren + Chân váy xòe bèo tầng pastel + Cardigan mỏng buộc vạt + Balo mini da mềm.',
      vietnamWeatherTips: 'Khí hậu Việt Nam: Mùa hè chọn chất liệu tencel/voan lụa nhẹ thoáng mát thấm mồ hôi tốt; Mùa đông miền Bắc layer thêm áo khoác dạ cúc gỗ Duffle coat ấm áp chuẩn phim Nhật.',
    },

    mixMatchPresets: [
      {
        presetName: 'Set 1: Nàng Thơ Trà Chiều (Tea Party Princess)',
        occasion: 'Đi cafe hoa, trà chiều tiểu thư, chụp ảnh lookbook',
        top: 'Sơ mi chiffon trắng cổ sen Peter Pan viền ren đăng ten',
        bottom: 'Chân váy chữ A xòe bồng màu hồng hoa anh đào (Sakura Pink)',
        outer: 'Cardigan len lông thỏ màu kem dệt hoa cúc nhí',
        shoes: 'Giày Mary Jane da bóng đế 4cm kèm tất ren bèo nhún',
        accessories: 'Kẹp nơ ruy băng lụa satin + Dây chuyền ngọc trai mảnh',
        hackTip: 'Cắm thùng sơ mi cao tạo tỷ lệ eo thon và đôi chân dài hơn 7cm.',
      },
      {
        presetName: 'Set 2: Thanh Xuân Dạo Phố Mùa Xuân (Spring Stroll)',
        occasion: 'Dạo phố cuối tuần, hẹn hò lãng mạn, triển lãm tranh',
        top: 'Áo dệt kim mỏng cổ vuông tay lỡ màu xanh pastel mint',
        bottom: 'Chân váy xòe hoa nhí vintage có dây nơ thắt eo',
        outer: 'Áo blazer dạ tweed dáng lửng màu trắng kem',
        shoes: 'Giày búp bê Ballet đế bệt buộc dây ruy băng',
        accessories: 'Mũ beret dạ len mỏng đội lệch + Túi tote thêu hoa nhí',
        hackTip: 'Áo lửng giúp nâng cao đường eo thị giác cực kỳ tự nhiên.',
      },
    ],
  },

  {
    id: 'meimei_shoujo_aesthetic',
    name: 'Mei Mei Aesthetic (Nàng Thơ Shoujo x Coquette - TikTok @nnmeii Inspired)',
    jpName: 'メイメイ風・現代少女コケット',
    romaji: 'Meimei-fu Gendai Shoujo Koketto',
    badge: 'TikTok Trend · Nàng Thơ Búp Bê Á Đông',
    aestheticVibe: 'Ngọt ngào, mong manh như búp bê nhưng hiện đại và tôn dáng cực đỉnh theo phong cách TikToker Mei Mei (@nnmeii)',
    eraOrOrigin: 'Làn sóng Shoujo & Coquette Aesthetic hiện đại trên TikTok / Douyin / Instagram do các hot creator như Mei Mei dẫn đầu',
    targetGenZ: 'Dành cho các bạn trẻ mê diện đồ đi cafe OOTD, quay video ngắn aesthetic, hẹn hò, vừa nữ tính dịu dàng vừa sành điệu hút mắt',
    tagColor: 'from-pink-500/20 to-purple-500/10 border-pink-500/40 text-pink-300',

    outfit: {
      tops: 'Áo thun ôm sát body baby tee in chữ mini, áo ống quây ngực (tube top) kèm cardigan len mỏng khoác hờ vai buông lơi, hoặc áo sơ mi voan trắng cách điệu tay phồng cổ sen búp bê.',
      bottoms: 'Chân váy ngắn chữ A xếp ly cạp cao tôn eo thon, chân váy midi xòe vải ren dập nổi hoặc quần cạp trễ ống suông hack chân siêu dài.',
      outerwear: 'Cardigan dệt kim mỏng nhẹ tone kem/hồng phấn khoác hờ buông vai, áo gile len mỏng hoặc áo blazer dạ tweed dáng lửng tôn tỷ lệ cơ thể.',
      footwear: 'Giày Mary Jane da bóng đế bánh mì nhẹ (chunky sole), giày búp bê buộc dây ruy băng ballerina phối cùng tất ngắn viền ren bèo hoặc tất ống chân len dệt gân (leg warmers).',
      colorPalette: {
        primary: 'Trắng kem sữa (Cream White)',
        secondary: 'Hồng đào pastel (Peach Pink)',
        accent: 'Xám khói hoặc Đen tinh tế (Misty Grey / Minimal Black)',
        colors: ['#FFFDF9', '#FFD1DC', '#ECEFF1', '#212121'],
      },
      goldenRules: [
        'Tỷ lệ "Trên ôm - Dưới xòe" hoặc "Trên hở vai hờ - Dưới kín đáo" tạo hiệu ứng cơ thể thanh mảnh, mảnh mai chuẩn gu gái Nhật hiện đại.',
        'Điểm xuyết nơ ruy băng satin nhỏ xíu (Coquette detail): một chiếc nơ nhỏ ở cổ áo, kẹp tóc hoặc quai giày tạo điểm nhấn nữ tính khó cưỡng.',
        'Chất liệu mềm mại, mỏng nhẹ có độ rủ tự nhiên (voan, ren, cotton dập xốp, len lông cừu mỏng) mang lại rung cảm thơ mộng.',
      ],
      silhouetteTips: 'Định hình tỷ lệ 1/3 - 2/3 với cạp váy cao trên rốn và áo croptop vừa chạm mép váy, giúp kéo dài đôi chân tối đa khi lên ảnh và quay video TikTok.',
    },

    makeup: {
      base: 'Lớp nền Glass-skin da mướt như sương mai (Dewy glass skin), che khuyết điểm tỉ mỉ nhưng vẫn giữ độ căng bóng trong veo phản chiếu ánh sáng tự nhiên.',
      eyes: {
        namidaBukuro: 'Bọng mắt cười Aegyo-sal / Namida-bukuro to tròn: Tạo bóng bằng chì tán nâu nhạt tự nhiên, điểm phấn nhũ ngọc trai champagne hoặc nhũ mắt dạng lỏng lấp lánh ở 1/2 bọng mắt tạo ánh nhìn long lanh biết cười.',
        eyeliner: 'Đường eyeliner nét mảnh màu nâu sẫm, kéo dài nhẹ ngang khóe mắt và hơi cụp nhẹ ở đuôi (Puppy/Tare-me eyes) mang lại vẻ ngây thơ, búp bê.',
        eyeshadow: 'Phấn mắt gam hồng đào, san hô hoặc cam nude ấm áp tán nhẹ bầu mắt, nhấn một chút nhũ mịn ở giữa bầu mắt.',
        lashes: 'Kẹp mi cong vút hình chữ C, gắn mi giả từng chùm tách sợi chữ A (Manga/Anime lashes) và chuốt tơi mi dưới tạo đôi mắt búp bê to tròn.',
      },
      blush: 'Má hồng dạng kem hoặc lỏng màu hồng sữa / cam đào tán tròn lan rộng ngay dưới bọng mắt và vắt phớt nhẹ qua sống mũi, tạo hiệu ứng "má ửng nắng e ấp" (Sun-kissed / Igari doll flush).',
      lips: 'Son tint bóng căng mọng thấu kính (Water glow plumping lip tint) lòng môi màu hồng đất, đỏ cherry nhạt hoặc cam đào, viền môi được tán mờ (blur lip) tạo cảm giác môi đầy đặn, mọng nước như kẹo thạch.',
    },

    hairstyle: {
      mainStyle: 'Tóc uốn sóng lơi nhẹ nhàng (Yuru-fuwa waves) buông xõa bồng bềnh, hoặc tóc buộc nửa đầu (half-up half-down) cài nơ lụa satin.',
      bangs: 'Mái thưa búp bê (See-through bangs) uốn phồng chữ C che nhẹ phần trán, kết hợp 2 lọn tóc mai dài uốn lượn ôm sát quai hàm giúp gương mặt thanh thoát nhỏ gọn (Kogao).',
      hairAccessories: 'Kẹp nơ ruy băng satin màu đen/hồng/trắng kem, kẹp càng cua ngọc trai mini, băng đô nhung mảnh.',
      colorTrend: 'Nâu trà sữa hạt dẻ (Milk Tea Ash Brown), Nâu mật ong ấm (Honey Brown) hoặc Đen mun phủ bóng tự nhiên.',
    },

    accessories: {
      jewelry: ['Dây chuyền bạc thanh mảnh mặt trái tim đính đá nhỏ', 'Hoa tai ngọc trai mini hoặc khuyên tròn bạc mảnh', 'Nhẫn bạc vintage thanh thoát'],
      bags: ['Túi xách kẹp nách da mềm phong cách Y2K/Modern Girly', 'Túi tote vải thêu ren hoa nhí phong cách nàng thơ', 'Túi xách tay mini đính nơ ruy băng'],
      hats: ['Mũ beret dạ len mỏng đội lệch góc nhẹ nhàng', 'Mũ len beanie dệt kim mềm mại mùa thu đông'],
      nails: 'Nail art thạch hồng thấu quang (Syrup blush nails), đính viền nhũ bạc đầu móng hoặc điểm xuyết hình nơ/trái tim mini 3D trong trẻo.',
    },

    culturalContext: {
      sociologicalOrigin: 'Xu hướng "Modern Shoujo & Coquette GenZ" bắt nguồn từ sự giao thoa giữa thời trang tiểu thư Harajuku Nhật Bản, nét tối giản phong cách Hàn Quốc và làn sóng video "Get Ready With Me (GRWM) / OOTD" viral trên TikTok toàn cầu mà các nhà sáng tạo nội dung như Mei Mei (@nnmeii) là hình mẫu tiêu biểu.',
      psychologicalMeaning: 'Tuyên ngôn về "Nữ tính mềm mại tích cực" (Soft Femininity): GenZ không ngần ngại thể hiện sự điệu đà, dễ thương, yêu chuộng bản thân và tự do biến mọi khoảnh khắc đời thường (đi cafe, dạo phố, chụp hình) thành một tác phẩm nghệ thuật thơ mộng.',
      japaneseKeyTerms: [
        { term: '少女コア (Shoujo Core)', reading: 'しょうじょこあ', meaning: 'Mỹ học thiếu nữ mộng mơ chuyển thể vào đời sống GenZ' },
        { term: '涙袋メイク (Namida-bukuro Meiku)', reading: 'なみだぶくろめいく', meaning: 'Kỹ thuật trang điểm bọng mắt cười lung linh chuẩn Á Đông' },
        { term: 'ゆるふわ (Yuru-fuwa)', reading: 'ゆるふわ', meaning: 'Phong cách bồng bềnh, mềm mại, thoải mái và thư thái' },
        { term: '垢抜け (Akanuke)', reading: 'あかぬけ', meaning: 'Sự lột xác trở nên sành điệu, tinh tế và hút mắt hơn' },
      ],
      practicalAdvice: 'Để bắt chước style này của Mei Mei cực đẹp khi đi chơi tại Việt Nam: Hãy chuẩn bị một chiếc chân váy chữ A xếp ly ngắn (trắng hoặc xám), phối cùng áo croptop cổ vuông hoặc áo dệt kim mỏng khoác hờ, đi giày Mary Jane kèm tất viền ren và không quên kẹp một chiếc nơ nhỏ trên tóc. Bạn sẽ có ngay một set đồ chuẩn "nàng thơ TikTok"!',
    },

    occasions: {
      cafeOotd: 'Áo baby tee ôm body in chữ mini + Chân váy xếp ly trắng chữ A + Cardigan len mỏng hồng pastel khoác hờ vai + Giày Mary Jane đế bánh mì + Túi kẹp nách mini. Đứng góc nào trong quán cafe cũng ra video triệu view!',
      romanticDate: 'Áo quây ngực tube top màu kem phối áo khoác voan mỏng buông lơi + Chân váy midi ren xòe nhẹ hoa nhí + Giày búp bê thắt nơ ruy băng + Dây chuyền bạc mặt trái tim nhỏ.',
      campusSchool: 'Áo sơ mi trắng cách điệu tay phồng cổ sen búp bê + Chân váy tennis xếp ly màu xám khói + Giày sneaker trắng đế độn + Tất cổ ngắn ren bèo nhún.',
      streetHangout: 'Áo croptop cổ vuông ôm body + Quần jeans suông cạp trễ vừa phải + Tai nghe chụp tai chunky + Túi tote ren.',
      vietnamWeatherTips: 'Set đồ sinh ra dành cho khí hậu Việt Nam: Áo chất thun tăm cotton co giãn thoáng mát, ra ngoài khoác cardigan mỏng che nắng, vào quán cafe máy lạnh thả vai hững hờ cực quyến rũ.',
    },

    mixMatchPresets: [
      {
        presetName: 'Set 1: Mei Mei Signature Fit Check (OOTD Cafe)',
        occasion: 'Quay video TikTok OOTD, đi cafe cuối tuần, chụp ảnh sống ảo',
        top: 'Áo baby tee ôm sát body màu trắng kem in chữ hoa mini',
        bottom: 'Chân váy chữ A xếp ly ngắn màu xám khói cạp cao',
        outer: 'Cardigan dệt kim sợi mỏng màu hồng phấn buông lơi một bên vai',
        shoes: 'Giày Mary Jane da bóng đế bánh mì nhẹ 5cm + Tất ren bèo',
        accessories: 'Kẹp nơ ruy băng satin đen + Túi kẹp nách da mềm',
        hackTip: 'Tỷ lệ trên ôm sát, dưới xòe chữ A giúp chân thon dài và eo nhỏ gọn trông thấy.',
      },
      {
        presetName: 'Set 2: Modern Coquette Princess (Nàng Thơ Hẹn Hò)',
        occasion: 'Hẹn hò lãng mạn buổi tối, tiệc sinh nhật bạn bè',
        top: 'Áo ống quây ngực màu trắng viền ren nhỏ tinh tế',
        bottom: 'Chân váy ngắn xếp tầng ren dập nổi màu trắng kem đồng điệu',
        outer: 'Áo cardigan len lông thỏ mỏng màu kem vani',
        shoes: 'Giày búp bê Ballet buộc dây ruy băng ballerina',
        accessories: 'Vòng cổ ngọc trai mảnh mini + Kẹp tóc nơ đôi hai bên',
        hackTip: 'Phối Monochrome toàn trắng tạo cảm giác tiểu thư trong trẻo tinh khôi tuyệt đối.',
      },
    ],
  },

  {
    id: 'jirai_kei',
    name: 'Jirai Kei (地雷系 - "Bẫy Ngọt Ngào" Cá Tính Shinjuku)',
    jpName: '地雷系（じらいけい）スタイル',
    romaji: 'Jirai-kei Sutairu',
    badge: 'Cơn Sốt GenZ · Đen Hồng Bí Ẩn',
    aestheticVibe: 'Sự pha trộn đối lập giữa nét dễ thương tột cùng (Kawaiisa) và vẻ u buồn, ma mị, nổi loạn nội tâm',
    eraOrOrigin: 'Bùng nổ từ quảng trường To-yoko (Shinjuku Kabukicho, Tokyo) đầu thập niên 2020 trên TikTok và Twitter/X Nhật Bản',
    targetGenZ: 'Dành cho các bạn trẻ cá tính mạnh, thích gu thời trang ấn tượng, yêu chiều bản thân và muốn nổi bật giữa đám đông',
    tagColor: 'from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300',

    outfit: {
      tops: 'Áo sơ mi đen hoặc trắng phối cổ ren babydoll to bản, đính nơ ruy băng đen bản lớn có kẹp mặt đá chữ thập hoặc trâm cài thánh giá bạc.',
      bottoms: 'Chân váy xếp ly cạp cao xòe phồng (chất liệu dạ hoặc da bóng) đính dây xích bạc treo chéo hông và viền ren chân váy.',
      outerwear: 'Áo khoác bomber da bóng oversized, áo nỉ hoodie đen tai gấu đính đinh tán hoặc áo khoác lông cừu mềm mại màu đen huyền bí.',
      footwear: 'Giày đế bánh mì siêu dày (Atsuzoko 厚底) từ 7-10cm có khóa kim loại kiểu Lolita, phối tất đùi đen ren hoặc tất trắng gân sọc cổ điển.',
      colorPalette: {
        primary: 'Đen tuyền bóng đêm (Jet Black)',
        secondary: 'Hồng khói Dusty Pink',
        accent: 'Bạc kim loại Gothic Silver',
        colors: ['#1A1A24', '#F48FB1', '#E0E0E0', '#4A148C'],
      },
      goldenRules: [
        'Tương phản Đen - Hồng: Đen thể hiện sự bí ẩn sắc sảo, Hồng đại diện cho sự ngây thơ yếu đuối.',
        'Đế giày bắt buộc phải dày: Giày Atsuzoko không chỉ hack chân dài miên man mà còn tạo phong thái vững chãi, độc lập.',
        'Chi tiết nơ to bản & dây xích: Sự kết hợp giữa nơ ruy băng nữ tính và móc xích kim loại là linh hồn của Jirai Kei.',
      ],
      silhouetteTips: 'Phần thân trên xếp ly gọn gàng, phần dưới xòe bồng kết hợp cùng giày đế hầm hố tạo tỷ lệ đôi chân cực kỳ thon nhỏ.',
    },

    makeup: {
      base: 'Lớp nền da sứ trắng sáng lì không bóng dầu, che sạch mọi khuyết điểm, đánh khối gò má và mũi thanh thoát.',
      eyes: {
        namidaBukuro: 'Bọng mắt đỏ rượu vang/hồng tím đậm nét: Vẽ bọng mắt to và phủ phấn mắt màu đỏ berry dưới mi mắt tạo cảm giác như vừa khóc xong (Naki-gao 泣き顔).',
        eyeliner: 'Eyeliner đen đậm kéo dài sắc lẹm ngang khóe mắt hoặc hơi cụp nhẹ rồi hất góc nhọn cá tính.',
        eyeshadow: 'Tông màu đỏ mận, đỏ mâm xôi phối cùng phấn mắt đen khói ở đuôi mắt, tán nhũ kim tuyến đa sắc hạt lớn.',
        lashes: 'Mi giả sợi dài dày búp bê gothic, đặc biệt chuốt mi dưới cực đậm tạo chiều sâu ma mị cho ánh mắt.',
      },
      blush: 'Tán má hồng màu đỏ mận/rượu vang ngay dưới sát mi mắt dưới, tạo hiệu ứng má ửng sốt mong manh cần được bảo bọc.',
      lips: 'Son màu đỏ trầm, đỏ cherry đậm hoặc son bóng đen ánh tím (Black lip gloss) lòng môi căng mọng.',
    },

    hairstyle: {
      mainStyle: 'Twin-tail buộc cao hai bên (High Twin-tail) uốn lọn xoăn tít, hoặc tóc bob đen duỗi thẳng cắt Hime-cut sắc cạnh.',
      bangs: 'Mái bằng dày cắt thẳng tắp ngang chân mày, xịt gôm giữ nếp tuyệt đối không để gió làm bay.',
      hairAccessories: 'Kẹp tóc cánh dơi đen, kẹp nơ nhung đen đính đá giọt nước pha lê, bờm cài tóc tai mèo ren gothic.',
      colorTrend: 'Đen nhánh truyền thống (Karasu-ba), đen ánh xanh hoặc nhuộm highlight ẩn sau tai màu hồng neon/tím pastel.',
    },

    accessories: {
      jewelry: ['Vòng cổ choker da đính đinh tán bạc hoặc hình trái tim khóa ổ', 'Dây chuyền thánh giá bạc dáng dài', 'Nhẫn giáp kim loại gothic'],
      bags: ['Balo da MCM đính đinh tán mini hoặc túi xách Maison de FLEUR nơ to', 'Túi xách da hình quan tài mini'],
      hats: ['Mũ beret da bóng đính khuyên kim loại', 'Mũ len tai mèo đính kim băng'],
      nails: 'Móng tay nhọn vuốt dài màu đen đính đá thánh giá, đầu lâu mini, hoa hồng đen đắp nổi 3D.',
    },

    culturalContext: {
      sociologicalOrigin: 'Jirai Kei bắt nguồn từ cụm từ "Jirai-onna" (Cô gái bom nổ chậm - bề ngoài ngọt ngào nhưng ẩn chứa cảm xúc mãnh liệt), được giới trẻ Harajuku và Kabukicho đón nhận như một phong cách nghệ thuật tự do.',
      psychologicalMeaning: 'Biểu tượng cho tiếng nói phản kháng áp lực chuẩn mực xã hội khắt khe của Nhật Bản, nơi các cô gái GenZ tự tin bộc lộ mặt yếu đuối, u sầu và tình cảm sâu sắc của mình.',
      japaneseKeyTerms: [
        { term: '地雷系 (Jirai-kei)', reading: 'じらいけい', meaning: 'Phong cách thời trang đen-hồng cá tính đậm chất Shinjuku' },
        { term: '厚底靴 (Atsuzoko-gutsu)', reading: 'あつぞこぐつ', meaning: 'Giày đế bánh mì siêu dày đặc trưng của thời trang Tokyo' },
        { term: '病みかわ (Yami-kawa)', reading: 'やみかわ', meaning: 'Mỹ học kết hợp giữa bóng tối u buồn và nét dễ thương' },
        { term: '量産型 (Ryousangata)', reading: 'りょうさんがた', meaning: 'Phong cách đối ứng màu pastel ngọt ngào thường sánh đôi cùng Jirai' },
      ],
      practicalAdvice: 'Khi diện Jirai Kei tại Việt Nam, bạn có thể tiết chế lại bằng sơ mi đen cổ sen nơ ruy băng phối chân váy xếp ly đen và giày Mary Jane đế độn, vừa thời thượng vừa rất thu hút khi chụp ảnh kỷ niệm.',
    },
  },

  {
    id: 'ryousangata',
    name: 'Ryousangata (量産型 - "Thiên Nga Kẹo Ngọt" Tiểu Thư Oshi-katsu)',
    jpName: '量産型（りょうさんがた）オタク女子',
    romaji: 'Ryousangata Otaku Joshi',
    badge: 'Tiểu Thư Concert · Tình Yêu Thần Tượng Oshi',
    aestheticVibe: 'Đồng điệu, ngọt ngào tuyệt đối, thanh lịch như những nàng tiểu thư đài các đi trẩy hội âm nhạc',
    eraOrOrigin: 'Phát triển từ cộng đồng người hâm mộ Idol J-Pop (Johnny’s / START ENTERTAINMENT, Anime seiyuu) tại Shibuya và Yokohama Arena',
    targetGenZ: 'Dành cho các cô gái yêu thích style tiểu thư ngoan hiền, tham dự các buổi concert, fan meeting hay tiệc trà chiều quý tộc',
    tagColor: 'from-rose-500/20 to-pink-500/10 border-rose-500/40 text-rose-300',

    outfit: {
      tops: 'Áo sơ mi voan trắng tinh khôi tay bồng tiểu thư, cổ áo đính ngọc trai hoặc viền ren xòe, điểm xuyết nơ ruy băng màu pastel đồng điệu với màu đại diện của thần tượng (Oshi color).',
      bottoms: 'Chân váy chữ A xòe bồng bềnh xếp ly mềm màu hồng phấn (Pale Pink), be nhạt hoặc tím oải hương Lavender, có đính cúc ngọc trai lấp lánh.',
      outerwear: 'Áo khoác dạ ngắn cổ lông thú tháo rời, áo dạ dáng váy tiểu thư thắt đai eo nơ bướm hoặc cardigan mỏng đính hạt cườm ngọc bích.',
      footwear: 'Giày Mary Jane da bóng màu đen hoặc hồng pastel đế vuông 5cm có khóa trái tim đính đá, kết hợp tất ren trắng viền đăng ten bèo nhún.',
      colorPalette: {
        primary: 'Hồng pastel kẹo ngọt (Sweet Pastel Pink)',
        secondary: 'Trắng sứ thanh khiết (Porcelain White)',
        accent: 'Màu sắc đại diện thần tượng (Oshi Member Color)',
        colors: ['#F8BBD0', '#FFFFFF', '#E1BEE7', '#FFF3E0'],
      },
      goldenRules: [
        'Quy tắc Ton-sur-Ton ngọt lịm: Tất cả trang phục và phụ kiện phải có sự hài hòa đồng điệu về sắc độ hồng phấn hoặc pastel.',
        'Chi tiết ngọc trai & nơ bướm: Không thể thiếu ngọc trai ở cổ áo, khuy cúc hoặc quai túi xách để tạo khí chất tiểu thư con nhà gia giáo.',
        'Luôn chỉn chu, không một nếp nhăn: Trang phục Ryousangata luôn được ủi phẳng phiu, toát lên sự tôn trọng cao nhất dành cho thần tượng.',
      ],
      silhouetteTips: 'Dáng váy xòe chữ A dáng ngắn tôn chân thon dài, eo thắt cao tạo cảm giác thân hình mảnh mai nhỏ nhắn.',
    },

    makeup: {
      base: 'Lớp nền da căng mọng bóng khỏe (Glowy dewy skin), dùng cushion ngọc trai bắt sáng hai bên gò má và sống mũi.',
      eyes: {
        namidaBukuro: 'Bọng mắt cười siêu sáng: Tán nhũ bạc ánh hồng lấp lánh rực rỡ, đường viền bọng mắt vẽ mềm mại tự nhiên.',
        eyeliner: 'Kẻ mắt nét mảnh màu nâu sô cô la, hơi cong nhẹ ở đuôi mắt tạo ánh nhìn tươi vui, long lanh.',
        eyeshadow: 'Tông màu hồng đào nhũ vàng champagne lấp lánh, nhấn sáng góc mắt trong (Aegyo-sal highlight).',
        lashes: 'Mi uốn cong vút, chuốt mascara tơi mi tự nhiên không vón cục, gắn sợi mi đơn lẻ mắt nai.',
      },
      blush: 'Má hồng phấn baby tán tròn ở vị trí cao nhất của gò má, tạo vẻ ửng hồng e thẹn đáng yêu như kẹo bông.',
      lips: 'Son tint bóng syrup màu hoa anh đào mọng nước, đánh ombre lòng môi căng mướt phủ lớp bóng thủy tinh.',
    },

    hairstyle: {
      mainStyle: 'Tóc uốn xoăn sóng lọn tròn công chúa (Princess roll curls), tóc buộc nửa đầu đính nơ to bản phía sau.',
      bangs: 'Mái mưa mỏng cong nhẹ chuẩn Hàn-Nhật, xịt keo cố định để không bị xẹp trong suốt buổi concert 3 tiếng.',
      hairAccessories: 'Nơ ruy băng satin to bản thắt kiểu tiểu thư Pháp, kẹp ngọc trai chữ U, bờm tóc nhung nơ bướm.',
      colorTrend: 'Nâu hạt dẻ sáng, nâu caramel ngọt ngào, nâu be sữa ấm áp.',
    },

    accessories: {
      jewelry: ['Dây chuyền mặt trái tim lồng ảnh idol mini', 'Vòng tay đính ngọc trai nhân tạo', 'Khuyên tai dáng dài giọt sương pha lê'],
      bags: ['Túi xách Itabag mini trong suốt đựng thú bông & huy hiệu thần tượng', 'Túi xách Maison de FLEUR thắt nơ lụa trứ danh', 'Balo da Samantha Vega'],
      hats: ['Mũ beret nỉ đính ngọc trai', 'Mũ len quả bông xù mùa đông'],
      nails: 'Móng tay đính đá lộng lẫy, vẽ chữ cái tên thần tượng (Oshi initial), đính charm vương miện và trái tim pha lê.',
    },

    culturalContext: {
      sociologicalOrigin: 'Cụm từ "Ryousangata" vốn có nghĩa là "sản xuất hàng loạt", nhưng trong văn hóa Otaku nữ, nó trở thành lời khẳng định kiêu hãnh: Chúng mình cùng diện trang phục tiểu thư xinh đẹp nhất để bước vào thánh đường âm nhạc gặp thần tượng!',
      psychologicalMeaning: 'Thể hiện tinh thần cộng đồng gắn kết mạnh mẽ của các bạn nữ GenZ có chung niềm đam mê thần tượng (Oshi-katsu), cùng nhau làm đẹp và chia sẻ niềm hạnh phúc.',
      japaneseKeyTerms: [
        { term: '量産型女子 (Ryousangata Joshi)', reading: 'りょうさんがたじょし', meaning: 'Các cô gái theo đuổi style tiểu thư ngọt ngào Oshi-katsu' },
        { term: '痛バッグ (Ita-bag)', reading: 'いたばっぐ', meaning: 'Chiếc túi có ngăn trong suốt trưng bày huy hiệu, ảnh thần tượng' },
        { term: '推し活 (Oshi-katsu)', reading: 'おしかつ', meaning: 'Các hoạt động ủng hộ thần tượng yêu thích hết mình' },
        { term: '参戦服 (Sansen-fuku)', reading: 'さんせんふく', meaning: 'Bộ trang phục lộng lẫy nhất được chuẩn bị riêng để đi concert' },
      ],
      practicalAdvice: 'Một set đồ gồm sơ mi trắng cổ thắt nơ và chân váy hồng pastel kết hợp túi xách nơ nhỏ là công thức hoàn hảo để đi tiệc trà, sinh nhật bạn bè hay chụp ảnh kỷ yếu.',
    },
  },

  {
    id: 'tenshi_kaiwai',
    name: 'Tenshi Kaiwai / Subcul (天使界隈 - "Thiên Thần Kỹ Thuật Số" Cyber White)',
    jpName: '天使界隈（てんしかいわい）・サブカル系',
    romaji: 'Tenshi Kaiwai Subcul Kei',
    badge: 'Xu Hướng Bùng Nổ GenZ 2024–2026',
    aestheticVibe: 'Thuần khiết, siêu thực như thiên thần không gian số với tông màu trắng tinh khôi và xanh băng giá',
    eraOrOrigin: 'Xuất hiện từ trào lưu Subculture đường phố Harajuku & mạng xã hội số năm 2022–2024, hòa trộn giữa Anime mecha và trang phục thiên sứ',
    targetGenZ: 'Dành cho GenZ yêu thích sự độc lạ, phong cách công nghệ tương lai (Cyberpunk), chụp ảnh concept nghệ thuật ảo diệu',
    tagColor: 'from-cyan-500/20 to-sky-500/10 border-cyan-500/40 text-cyan-300',

    outfit: {
      tops: 'Áo nỉ hoodie trắng tuyết oversized có in họa tiết cánh thiên thần phản quang sau lưng, áo thun tay dài dáng rộng phối ren gấu áo.',
      bottoms: 'Chân váy ngắn viền ren trắng xòe bồng giấu dưới áo hoodie, hoặc quần shorts trắng viền bèo baby.',
      outerwear: 'Áo khoác gió thể thao dáng dù (Windbreaker) màu xanh pastel phối sọc trắng bạc phản quang, áo phao ngắn màu trắng bông tuyết.',
      footwear: 'Giày thể thao chunky sneaker trắng tinh đế khủng hầm hố, phối tất ống rộng chân gấu (Leg warmers) màu trắng lông xù hoặc ren đính nơ.',
      colorPalette: {
        primary: 'Trắng tinh khôi thiên sứ (Pure Angel White)',
        secondary: 'Xanh băng giá nhạt (Ice Cyan Blue)',
        accent: 'Bạc phản quang tương lai (Reflective Silver)',
        colors: ['#FFFFFF', '#E0F7FA', '#B2EBF2', '#ECEFF1'],
      },
      goldenRules: [
        'Toàn bộ trang phục gam màu sáng lạnh: 90% màu trắng tuyết kết hợp điểm xuyết 10% xanh ngọc băng tuyết tạo cảm giác vô thực.',
        'Phom dáng trên rộng dưới gọn (Oversized Silhouette): Áo hoodie to che gần hết váy tạo hiệu ứng "búp bê lọt thỏm" siêu đáng yêu.',
        'Tất ống chân lông xù (Leg warmers): Phụ kiện linh hồn mang hơi thở Y2K kết hợp cùng giày thể thao hầm hố.',
      ],
      silhouetteTips: 'Dáng áo thụng oversize giấu quần giúp thân hình trông thon gọn và tôn lên đôi chân với tất ống lông trắng muốt.',
    },

    makeup: {
      base: 'Lớp nền da trắng phát sáng trong suốt (Glass skin), phủ phấn bắt sáng ngọc trai ánh xanh băng tuyết lên sống mũi và gò má.',
      eyes: {
        namidaBukuro: 'Bọng mắt ánh kim tuyến bạc băng giá: Dùng nhũ mắt lỏng hạt to màu trắng bạc lấp lánh như giọt sương băng.',
        eyeliner: 'Eyeliner màu trắng hoặc xanh pastel vẽ hình cánh thiên thần nhỏ ở khóe mắt ngoài.',
        eyeshadow: 'Phấn mắt nhạt màu xanh phấn hoặc trắng ngọc trai, tán nhẹ viền mắt trong trẻo.',
        lashes: 'Mi chuốt mascara trong suốt hoặc mi giả màu trắng tuyết ở phần đuôi mắt tạo điểm nhấn siêu thực.',
      },
      blush: 'Má hồng màu tím hoa cà (Lavender blush) hoặc hồng sữa phớt nhẹ, giúp trung hòa sắc vàng của da và nâng tông trắng sứ.',
      lips: 'Son bóng trong suốt không màu hoặc son dưỡng có ánh nhũ xanh băng tuyết, tạo đôi môi căng mọng như viên kẹo hồ lô thủy tinh.',
    },

    hairstyle: {
      mainStyle: 'Tóc ngắn cúp đuôi kiểu búp bê, hoặc tóc dài suôn mượt buộc hai bên thấp đính kẹp cánh thiên sứ dạ quang.',
      bangs: 'Mái ngố thưa uốn phồng nhẹ hình vòm cung trong trẻo.',
      hairAccessories: 'Kẹp tóc hình cánh thiên thần phát sáng, kẹp chữ thập nhựa trong suốt acrylic, tai nghe trùm tai màu trắng bạc (Cyber headphones).',
      colorTrend: 'Bạch kim (Platinum blonde), xám khói ánh xanh (Ice grey ash) hoặc đen tuyền nguyên bản.',
    },

    accessories: {
      jewelry: ['Dây chuyền hạt nhựa trong suốt', 'Vòng tay acrylic phát quang trong đêm', 'Nhẫn bạc hình đôi cánh thiên sứ'],
      bags: ['Balo trong suốt mini chứa móc khóa cánh thiên thần', 'Túi đeo chéo dáng gối ôm lông cừu trắng'],
      hats: ['Mũ len trùm đầu có tai mèo lông trắng xù', 'Kính bảo hộ thời trang gọng trong suốt'],
      nails: 'Móng tay trong suốt đính charm cánh thiên thần 3D, vân thạch nước băng giá aurora lấp lánh.',
    },

    culturalContext: {
      sociologicalOrigin: 'Tenshi Kaiwai ra đời như một nhánh tiến hóa thanh khiết của trào lưu Subculture Tokyo, nơi giới trẻ số hóa bản thân thành những thiên sứ ảo giữa kỷ nguyên AI và mạng xã hội metaverse.',
      psychologicalMeaning: 'Biểu hiện cho khát vọng tìm kiếm sự thanh lọc tâm hồn, thoát ly khỏi hiện thực ồn ào và được đón nhận trong một thế giới dịu dàng, không phán xét.',
      japaneseKeyTerms: [
        { term: '天使界隈 (Tenshi Kaiwai)', reading: 'てんしかいわい', meaning: 'Cộng đồng phong cách thời trang thiên thần trắng tuyết' },
        { term: 'レッグウォーマー (Leg Warmers)', reading: 'れっぐうぉーまー', meaning: 'Ống tất giữ ấm bắp chân trứ danh của GenZ' },
        { term: '透明感 (Toumeikan)', reading: 'とうめいかん', meaning: 'Cảm giác trong suốt, thuần khiết tột cùng trong mỹ học Nhật' },
        { term: '水色系統 (Mizuiro Keitou)', reading: 'みずいろけいとう', meaning: 'Hệ màu xanh da trời nhạt kết hợp trắng' },
      ],
      practicalAdvice: 'Chỉ cần một chiếc áo hoodie trắng oversized phối cùng chân váy ren trắng, tất ống chân và giày sneaker chunky là bạn đã có ngay một set đồ chuẩn Tenshi Kaiwai cực kỳ nổi bật để dạo phố mùa đông.',
    },
  },

  {
    id: 'y2k_gyaru',
    name: 'Heisei Gyaru Revival (平成ギャル復活 - Nữ Quyền Phóng Khoáng Shibuya 109)',
    jpName: '平成ギャル復活・Y2Kスタイル',
    romaji: 'Heisei Gyaru Y2K Sutairu',
    badge: 'Biểu Tượng Shibuya · Năng Động Nổi Loạn',
    aestheticVibe: 'Tự tin, tràn đầy năng lượng, quyến rũ và phá vỡ mọi định kiến khuôn mẫu của xã hội truyền thống',
    eraOrOrigin: 'Sự trỗi dậy của làn sóng Gyaru thời Heisei (thập niên 1990–2000) tại tòa nhà biểu tượng Shibuya 109, được GenZ Nhật hồi sinh rực rỡ',
    targetGenZ: 'Dành cho các bạn nữ tự tin vào vóc dáng, thích sự rực rỡ, tiệc tùng, nhảy múa và khẳng định phong cách cá nhân độc lập',
    tagColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300',

    outfit: {
      tops: 'Áo thun baby tee croptop bó sát in hình typo retro thập niên 2000, áo hai dây đính kim sa lấp lánh hoặc áo yếm cổ yếm denim.',
      bottoms: 'Chân váy mini siêu ngắn xếp ly kẻ sọc caro rực rỡ, hoặc chân váy denim cạp trễ phối thắt lưng bản to đính khóa kim loại sáng bóng.',
      outerwear: 'Áo khoác da lửng màu nâu/đen, áo khoác gió thể thao màu sắc sặc sỡ hoặc áo khoác lông thú cúp ngực báo hoa mai.',
      footwear: 'Bốt da cao cổ đến đầu gối gót nhọn, hoặc giày lười nữ sinh Loafer đi kèm tất ống thụng trắng nhăn nhúm Loose Socks (ルーズソックス).',
      colorPalette: {
        primary: 'Hồng sen rực rỡ (Hot Neon Pink)',
        secondary: 'Nâu rám nắng đồng (Bronze Tan)',
        accent: 'Họa tiết da báo Leopard & Kẻ caro vàng',
        colors: ['#E91E63', '#795548', '#FFEB3B', '#000000'],
      },
      goldenRules: [
        'Khoe vòng eo & đôi chân thon thả: Tỉ lệ trang phục trên ngắn dưới ngắn là đặc trưng không thể nhầm lẫn của phong cách Gyaru.',
        'Tất thụng trắng Loose Socks: Tất ống trắng chùng xuống mắt cá chân là biểu tượng tự do trường tồn của nữ sinh Tokyo.',
        'Họa tiết da báo & sắc neon: Tự tin sử dụng các hoa văn nổi bật để thể hiện khí chất dẫn đầu xu hướng.',
      ],
      silhouetteTips: 'Áo ôm sát vòng eo thon gọn phối cùng chân váy mini và tất thụng giúp đôi chân trông dài miên man và bước đi đầy tự tin.',
    },

    makeup: {
      base: 'Lớp nền da bánh mật rám nắng khỏe khoắn (hoặc da nâu ấm), tạo khối khối gò má góc cạnh sắc sảo.',
      eyes: {
        namidaBukuro: 'Kẻ viền mắt dưới bằng chì trắng nhũ sáng tương phản nổi bật với đường viền mắt đen dày.',
        eyeliner: 'Eyeliner mắt mèo sắc nét kéo xếch lên cao (Tsuri-me 吊り目), kẻ cả viền mi trên và mi dưới đen tuyền.',
        eyeshadow: 'Phấn mắt nhũ vàng kim loại, đồng hoặc hồng neon tán khói quyến rũ.',
        lashes: 'Mi giả đôi cực dày và dài cong vút, nhấn mạnh khóe mắt ngoài đầy uy lực.',
      },
      blush: 'Phấn má màu cam san hô hoặc nâu đồng tán xéo từ gò má ngược lên thái dương.',
      lips: 'Son nude bóng viền chì môi nâu trầm, hoặc son hồng baby bóng bẩy đúng chất Y2K Heisei.',
    },

    hairstyle: {
      mainStyle: 'Tóc uốn sóng to bồng bềnh dập xù (Su-ji hair), tóc cột đuôi ngựa cao vút vắt sang một bên.',
      bangs: 'Mái dài vuốt xéo phồng chân tóc hoặc kẹp hai chiếc kẹp mỏ vịt sặc sỡ hai bên trán.',
      hairAccessories: 'Kẹp hoa dâm bụt Hawaii cài một bên tai, kẹp tóc cánh bướm kim loại, băng đô cài tóc thể thao Y2K.',
      colorTrend: 'Vàng hoe bạch kim (Bleached blonde), nâu sáng caramel hoặc highlight nhiều sợi tương phản.',
    },

    accessories: {
      jewelry: ['Vòng cổ choker kim loại bản to', 'Khuyên tai tròn to bản (Hoop earrings) màu vàng kim', 'Vòng tay hạt cườm lấp lánh'],
      bags: ['Túi kẹp nách baguette da báo', 'Túi xách mini đính gương cầm tay'],
      hats: ['Mũ lưỡi trai nhung phong cách thể thao', 'Kính râm mắt ruồi gọng to màu trà'],
      nails: 'Móng tay nhọn siêu dài (Gal nails) đính đá pha lê Swarovski kín móng, đính charm hoa 3D và chuỗi xích vàng.',
    },

    culturalContext: {
      sociologicalOrigin: 'Văn hóa Gyaru bùng nổ cuối thập niên 1990 như một cuộc cách mạng văn hóa của nữ sinh Nhật: Phản đối định kiến phụ nữ phải da trắng hiền thục, khẳng định quyền làm chủ cơ thể và phong cách sống của phái nữ.',
      psychologicalMeaning: 'Đại diện cho sự tự tin tuyệt đối, tinh thần lạc quan yêu đời "Gyaru Mind" (Không bao giờ gục ngã trước khó khăn, luôn tỏa sáng rực rỡ).',
      japaneseKeyTerms: [
        { term: '平成ギャル (Heisei Gyaru)', reading: 'へいせいきゃる', meaning: 'Phong trào thiếu nữ Gyaru thời kỳ Heisei thập niên 90-2000' },
        { term: 'ルーズソックス (Loose Socks)', reading: 'るーずそっくす', meaning: 'Đôi tất trắng thụng dài bồng bềnh huyền thoại' },
        { term: 'ギャルマインド (Gyaru Mind)', reading: 'ぎゃるまいんど', meaning: 'Tư duy sống tự tin, lạc quan và yêu quý bản thân' },
        { term: '厚底ブーツ (Atsuzoko Buutsu)', reading: 'あつぞこぶーつ', meaning: 'Bốt đế bánh mì cao gót sành điệu' },
      ],
      practicalAdvice: 'Bạn có thể diện phong cách này với áo thun baby tee ôm sát cùng chân váy jeans ngắn và đôi bốt cổ lửng, tạo vẻ ngoài cực kỳ thời thượng và tràn trề năng lượng.',
    },
  },

  {
    id: 'french_girly',
    name: 'French Girly (フレンチガーリー - Quý Cô Tokyo Kiểu Pháp Thanh Lịch)',
    jpName: 'フレンチガーリースタイル',
    romaji: 'Furenchi Gaarii Sutairu',
    badge: 'Quý Tộc Sang Trọng · Thịnh Hành Shibuya & Ginza',
    aestheticVibe: 'Sang trọng, đài các, cổ điển pha trộn giữa tinh thần thời trang lãng mạn Paris và nét tinh tế của quý cô Tokyo',
    eraOrOrigin: 'Thịnh hành mạnh mẽ trong giới trẻ Tokyo từ năm 2021 đến nay, được dẫn dắt bởi các thương hiệu nổi tiếng như Epine, Treat Urself',
    targetGenZ: 'Dành cho các cô nàng mê phong cách thanh lịch tinh tế, thích chụp ảnh tại các bảo tàng nghệ thuật, khách sạn sang trọng và tiệc sinh nhật sang chảnh',
    tagColor: 'from-slate-500/20 to-indigo-500/10 border-slate-500/40 text-slate-300',

    outfit: {
      tops: 'Áo blouse trắng cổ đăng ten ren Pháp cao bồi, áo len tay phồng dệt họa tiết quả trám, áo khoác dạ tweed viền cúc vàng kim loại.',
      bottoms: 'Váy liền thân chữ A nhung đen tuyền có cổ ren trắng tương phản, hoặc chân váy mini dạ kẻ caro houndstooth (răng sói) đen trắng.',
      outerwear: 'Áo khoác dáng dài dạ cashmere màu kem sữa, áo blazer vải tweed đính cúc ngọc trai sang trọng.',
      footwear: 'Giày búp bê Mary Jane da bóng gót vuông thấp hoặc bốt da ôm sát bắp chân màu đen mờ, đi cùng tất lụa mỏng đen chấm bi hoặc tất ren trắng.',
      colorPalette: {
        primary: 'Đen nhung quý tộc (Velvet Black)',
        secondary: 'Trắng kem ngọc trai (Ivory Pearl)',
        accent: 'Đỏ rượu vang Bordeaux (Wine Red)',
        colors: ['#000000', '#F5F5F5', '#880E4F', '#D7CCC8'],
      },
      goldenRules: [
        'Cặp đôi Đen - Trắng kinh điển: Tạo nên vẻ thanh lịch vượt thời gian không bao giờ lỗi mốt.',
        'Chất liệu cao cấp: Nhung tăm, dạ tweed, lụa satin và ren thêu thủ công là cốt lõi của phong cách quý cô.',
        'Điểm nhấn nơ nhung tối giản: Một chiếc nơ nhung đen trên tóc hoặc cổ áo tạo vẻ đài các kiêu sa.',
      ],
      silhouetteTips: 'Dáng váy ôm eo vừa vặn và xòe nhẹ phía dưới giúp tôn dáng quý phái, thanh tao và che khuyết điểm hông hoàn hảo.',
    },

    makeup: {
      base: 'Lớp nền da sứ bán lì (Semi-matte porcelain), tự nhiên như làn da thật được dưỡng ẩm kỹ lưỡng, mịn màng không tì vết.',
      eyes: {
        namidaBukuro: 'Bọng mắt tự nhiên: Chỉ tán nhẹ một đường bóng nâu nhạt và nhũ kem vàng mơ kín đáo.',
        eyeliner: 'Đường kẻ mắt mảnh ôm sát chân mi, hơi hất nhẹ ở đuôi mắt tạo ánh nhìn sắc sảo, đằm thắm.',
        eyeshadow: 'Tông màu nâu be, nâu tây hoặc hồng đất nhạt thanh nhã.',
        lashes: 'Mi uốn cong nhẹ nhàng, chuốt mascara mảnh tơi tự nhiên.',
      },
      blush: 'Phấn má màu hồng đất (Dusty rose) phớt nhẹ ngang gò má tạo chiều sâu quý phái.',
      lips: 'Son màu đỏ nhung lì (Velvet red) hoặc màu đỏ cánh hồng khô sang trọng quý phái.',
    },

    hairstyle: {
      mainStyle: 'Tóc búi thấp kiểu Pháp lơi vài sợi mai buông lơi (Chignon), hoặc tóc dài gợn sóng retro cổ điển.',
      bangs: 'Mái dài rẽ ngôi giữa ôm lấy gương mặt thanh tú hoặc mái bằng thưa kiểu minh tinh Audrey Hepburn.',
      hairAccessories: 'Kẹp nơ nhung đen to bản kẹp nửa đầu phía sau, mũ nồi beret dạ len, băng đô nhung đen đính ngọc trai.',
      colorTrend: 'Nâu sô cô la đậm, đen nhung huyền bí, nâu mocha ánh lạnh.',
    },

    accessories: {
      jewelry: ['Dây chuyền ngọc trai hạt tròn nhỏ cổ điển', 'Khuyên tai cúc vàng đính ngọc', 'Đồng hồ dây da vintage mặt vuông'],
      bags: ['Túi xách chần bông da cừu quai xích kim loại', 'Túi kẹp nách da bóng màu đen'],
      hats: ['Mũ beret nỉ Pháp màu đen hoặc kem', 'Mũ len dạ vành nhỏ'],
      nails: 'Móng tay đầu móng kiểu Pháp (French tip nails) viền trắng thanh nhã hoặc sơn màu đỏ rượu vang bóng loáng.',
    },

    culturalContext: {
      sociologicalOrigin: 'French Girly là sự kết tinh giữa niềm say mê văn hóa thời trang Paris của phụ nữ Nhật Bản và sự cải biên khéo léo của các bạn trẻ Tokyo, biến phong cách quý tộc châu Âu thành trang phục thường nhật duyên dáng.',
      psychologicalMeaning: 'Thể hiện mong muốn khẳng định sự trưởng thành, độc lập tài chính và gu thẩm mỹ thanh lịch, cao cấp của phụ nữ trẻ hiện đại.',
      japaneseKeyTerms: [
        { term: 'フレンチガーリー (French Girly)', reading: 'ふれんちがーりー', meaning: 'Phong cách thời trang tiểu thư Tokyo kiểu Pháp' },
        { term: '上品 (Jouhin)', reading: 'じょうひん', meaning: 'Khí chất tao nhã, sang trọng, thanh lịch' },
        { term: 'ベレー帽 (Beret-bou)', reading: 'べれーぼう', meaning: 'Mũ nồi phong cách Pháp kinh điển' },
        { term: 'ツイード生地 (Tweed-kiji)', reading: 'ついーどきじ', meaning: 'Chất liệu vải dạ tweed đài các' },
      ],
      practicalAdvice: 'Một chiếc đầm nhung đen cổ ren trắng đi cùng giày Mary Jane và kẹp nơ nhung là set đồ hoàn hảo cho bất kỳ buổi phỏng vấn nghệ thuật, dạ tiệc hay hẹn hò sang trọng nào.',
    },
  },
];

// 5 Style tiếp theo cho nút "+5 Tải Thêm Style Mới" (Tải liên tục không giới hạn)
export const extraJapaneseFashionStyles: JapaneseFashionStyleItem[] = [
  {
    id: 'mori_girl',
    name: 'Mori Girl (森ガール - Nàng Thơ Rừng Xanh Vintage Mộc Mạc)',
    jpName: '森ガール（もりガール）スタイル',
    romaji: 'Mori Gaaru Sutairu',
    badge: 'Mộc Mạc Tự Nhiên · Nàng Thơ Thung Lũng',
    aestheticVibe: 'Nhẹ nhàng, mộc mạc như một cô gái sống giữa khu rừng cổ tích tràn ngập cỏ cây hoa lá',
    eraOrOrigin: 'Khởi xướng từ mạng xã hội Mixi Nhật Bản năm 2006 tại quận Kichijoji và Shimokitazawa Tokyo',
    targetGenZ: 'Dành cho các bạn gái yêu thiên nhiên, đam mê sách, nhiếp ảnh phim analog và lối sống chậm rãi an yên',
    tagColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300',

    outfit: {
      tops: 'Áo blouse vải đũi linen màu be mộc, áo sơ mi cotton thêu hoa nhí cổ lá sen thêu tay thủ công.',
      bottoms: 'Chân váy xoè maxi nhiều tầng chạm mắt cá chân làm từ vải xô tự nhiên, chân váy hoa nhí nhún bèo.',
      outerwear: 'Áo len cardigan đan tay thủ công mũi to màu rêu ấm, áo khoác choàng poncho viền tua rua mộc mạc.',
      footwear: 'Giày da bò mộc đế bệt mũi tròn (Clarks/Birkenstock), bốt da lộn đi kèm tất len đan màu đất nhăn cổ chân.',
      colorPalette: {
        primary: 'Nâu đất rừng thông (Forest Earth Brown)',
        secondary: 'Xanh rêu cổ kính (Moss Green)',
        accent: 'Màu be đay tự nhiên (Natural Beige)',
        colors: ['#795548', '#558B2F', '#D7CCC8', '#FFF8E1'],
      },
      goldenRules: [
        'Phối đồ nhiều lớp (Layering): Xếp lớp áo sơ mi, váy suông, gile đan và khăn choàng tạo chiều sâu ấm áp.',
        '100% chất liệu tự nhiên: Linen thô, cotton mộc, len cừu không pha sợi tổng hợp bóng loáng.',
        'Màu sắc của đất mẹ: Tông màu trầm ấm của đất, rêu phong, lá khô và gỗ thông.',
      ],
      silhouetteTips: 'Dáng suông rủ tự nhiên phóng khoáng, thoải mái vận động và mang lại cảm giác bình yên nhẹ nhõm.',
    },

    makeup: {
      base: 'Lớp nền mỏng nhẹ như sương, tôn trọng những đốm tàn nhang tự nhiên của làn da mộc mạc.',
      eyes: {
        namidaBukuro: 'Bọng mắt tạo bóng tự nhiên bằng phấn màu nâu be nhẹ.',
        eyeliner: 'Không kẻ eyeliner sắc nhọn, chỉ viền chì nâu nhạt sát mí trong.',
        eyeshadow: 'Màu nâu ấm của lá khô hoặc cam đất nhạt dịu mắt.',
        lashes: 'Kẹp mi cong tự nhiên và chuốt mascara màu nâu hạt dẻ trong suốt.',
      },
      blush: 'Má hồng màu cam đất hoặc hồng mơ phớt nhẹ ngang qua sống mũi như vệt nắng chiếu qua tàng cây rừng.',
      lips: 'Son dưỡng có màu cam đào nhạt hoặc son kem lì màu cánh hồng khô mộc mạc.',
    },

    hairstyle: {
      mainStyle: 'Tóc tết đuôi sam lệch một bên nới lỏng tự nhiên, hoặc tóc xoăn xù mì gợn sóng lơi bồng bềnh.',
      bangs: 'Mái ngố cắt bằng ngang trán hoặc mái uốn xoăn nhẹ như búp bê gỗ.',
      hairAccessories: 'Khăn turban thắt nơ len, kẹp gỗ điêu khắc hình chiếc lá, trâm cài hoa khô dại.',
      colorTrend: 'Nâu hạt dẻ nguyên bản, nâu cà phê ấm áp.',
    },

    accessories: {
      jewelry: ['Dây chuyền mặt đồng hồ quả quýt vintage', 'Vòng tay dây cói đan hạt gỗ', 'Nhẫn bạc đính đá thạch anh thô'],
      bags: ['Túi đeo chéo da bò sáp mộc nguyên tấm', 'Giỏ cói đan tay đính hoa khô dạo chơi'],
      hats: ['Mũ len đan tay chụp đầu ấm áp', 'Mũ cói rộng vành dạo đồng quê'],
      nails: 'Móng tay cắt ngắn sạch sẽ, sơn dưỡng bóng trong hoặc vẽ họa tiết cỏ ba lá hoa nhí pastel.',
    },

    culturalContext: {
      sociologicalOrigin: 'Mori Girl ra đời như một phong trào phản kháng lối sống tiêu dùng hối hả của các đô thị lớn Nhật Bản, hướng con người trở về với sự giản đơn của thiên nhiên.',
      psychologicalMeaning: 'Nuôi dưỡng trạng thái "Iyashi" (癒し - Chữa lành tâm hồn), mang lại cảm giác bình thản, tĩnh lặng cho cả người mặc và người ngắm nhìn.',
      japaneseKeyTerms: [
        { term: '森ガール (Mori Girl)', reading: 'もりがーる', meaning: 'Cô gái khu rừng sống hòa hợp cùng thiên nhiên' },
        { term: '重ね着 (Kasanegi)', reading: 'かさねぎ', meaning: 'Nghệ thuật phối đồ nhiều tầng lớp ấm áp' },
        { term: '癒し系 (Iyashi-kei)', reading: 'いやしけい', meaning: 'Phong cách mang lại cảm giác chữa lành, dễ chịu' },
        { term: '天然素材 (Tennan Sozai)', reading: 'てんねんそざい', meaning: 'Chất liệu sợi tự nhiên thân thiện môi trường' },
      ],
      practicalAdvice: 'Phù hợp tuyệt đối cho những chuyến du lịch Đà Lạt, cắm trại ngoại ô hay những buổi chiều dạo thư viện đọc sách.',
    },
  },

  {
    id: 'kogal_jk',
    name: 'Kogal High School Chic (コギャル女子高生 - Phong Cách Nữ Sinh Nổi Loạn)',
    jpName: 'コギャル・JK制服ファッション',
    romaji: 'Kogal JK Seifuku Fashion',
    badge: 'Học Đường Tokyo · Huyền Thoại Thanh Xuân',
    aestheticVibe: 'Trẻ trung, tinh nghịch, phóng khoáng gắn liền với ký ức thanh xuân vườn trường rực rỡ',
    eraOrOrigin: 'Văn hóa đồng phục nữ sinh biến tấu tại Shibuya và Harajuku thập niên 2000, được GenZ tái hiện qua làn sóng phim Anime học đường',
    targetGenZ: 'Dành cho các bạn học sinh sinh viên muốn tạo nên bộ ảnh thanh xuân tươi đẹp hoặc trang phục dạo phố năng động',
    tagColor: 'from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-300',

    outfit: {
      tops: 'Áo sơ mi trắng học sinh mở cúc trên cùng phóng khoáng, thắt nơ ruy băng kẻ sọc caro hoặc cà vạt ngắn nữ sinh.',
      bottoms: 'Chân váy xếp ly đồng phục caro xanh hải quân (Navy) hoặc đỏ burgundy kéo cạp cao.',
      outerwear: 'Áo len gile vest dệt kim màu be thêu huy hiệu trường học, áo khoác cardigan len dài trùm hông dáng thụng.',
      footwear: 'Giày lười nữ sinh Loafer da đen bóng truyền thống phối tất ống thụng Loose socks trắng xốp.',
      colorPalette: {
        primary: 'Xanh hải quân học đường (Navy Blue)',
        secondary: 'Trắng tinh khôi (Oxford White)',
        accent: 'Đỏ rượu vang caro (Tartan Red)',
        colors: ['#0D47A1', '#FFFFFF', '#B71C1C', '#FFF8E1'],
      },
      goldenRules: [
        'Váy xếp ly ngắn trên gối: Tinh nghịch và làm nổi bật đôi tất ống trắng huyền thoại.',
        'Áo len cardigan thụng rộng: Áo len dài tay trùm qua bàn tay (Moesode 萌え袖) tạo vẻ đáng yêu vô đối.',
        'Cà vạt hoặc nơ bướm trường học: Phụ kiện định hình phong cách học đường.',
      ],
      silhouetteTips: 'Chân váy chữ A xếp ly ngắn tôn dáng cùng giày bệt Loafer tạo nên vẻ ngoài thanh xuân bất hủ.',
    },

    makeup: {
      base: 'Lớp nền tự nhiên mỏng nhẹ không tì vết đúng chuẩn làn da học sinh tràn trề sức sống.',
      eyes: {
        namidaBukuro: 'Kẻ bọng mắt cười ánh nhũ nhẹ tươi tắn.',
        eyeliner: 'Đường kẻ mắt nâu sát chân mi mở rộng góc mắt tròn xoe.',
        eyeshadow: 'Tông cam đào hoặc hồng đào nhạt nhã nhặn.',
        lashes: 'Mi chuốt mascara tơi cong như mi thật.',
      },
      blush: 'Má hồng đào cam tươi tắn đánh phớt hai bên gò má.',
      lips: 'Son tint bóng màu cam san hô hoặc dâu tây tươi tắn, tự nhiên.',
    },

    hairstyle: {
      mainStyle: 'Tóc thẳng suôn mượt tự nhiên, hoặc buộc đuôi ngựa cao năng động với dây buộc tóc scrunchie caro.',
      bangs: 'Mái bằng mưa lưa thưa giữ nếp thẳng mượt.',
      hairAccessories: 'Kẹp mỏ vịt màu sắc, bờm tóc học đường đơn sắc.',
      colorTrend: 'Đen nguyên bản hoặc nâu hạt dẻ nhạt.',
    },

    accessories: {
      jewelry: ['Đồng hồ điện tử Casio Baby-G năng động', 'Dây chuyền mảnh hình cỏ 4 lá may mắn'],
      bags: ['Cặp đi học da đen học sinh Nhật Bản có móc treo vô số thú bông Oshi'],
      hats: ['Mũ lưỡi trai thể thao đội ngược'],
      nails: 'Móng tay màu hồng thạch tự nhiên bóng khỏe.',
    },

    culturalContext: {
      sociologicalOrigin: 'Kogal là biểu tượng của tinh thần tự do học đường Nhật Bản, nơi các nữ sinh biến bộ đồng phục gò bó thành tuyên ngôn thời trang cá nhân rực rỡ.',
      psychologicalMeaning: 'Khát khao lưu giữ những năm tháng thanh xuân tươi đẹp nhất của cuộc đời học sinh trước ngưỡng cửa trách nhiệm người lớn.',
      japaneseKeyTerms: [
        { term: 'コギャル (Kogal)', reading: 'こぎゃる', meaning: 'Phong cách nữ sinh sành điệu, tự tin thời trang học đường' },
        { term: '萌え袖 (Moesode)', reading: 'もえそで', meaning: 'Ống tay áo len dài che nửa bàn tay tạo cảm giác đáng yêu cưng nựng' },
        { term: 'スクールバッグ (School Bag)', reading: 'すくーるばっぐ', meaning: 'Chiếc cặp nữ sinh đeo chéo treo đầy gấu bông' },
        { term: '青春 (Seishun)', reading: 'せいしゅん', meaning: 'Thanh xuân vườn trường tươi đẹp' },
      ],
      practicalAdvice: 'Set đồ tuyệt đẹp để chụp những bộ ảnh kỷ yếu học đường, dạo phố cuối tuần hay tham dự các lễ hội văn hóa Anime.',
    },
  },

  {
    id: 'yamikawaii',
    name: 'Yamikawaii / Menhera (病み可愛い - Dễ Thương Ma Mị Độc Đáo)',
    jpName: '病み可愛い（やみかわいい）・メンヘラ系',
    romaji: 'Yamikawaii Menhera Kei',
    badge: 'Mỹ Học Độc Lạ · Phá Cách Harajuku',
    aestheticVibe: 'Đáng yêu pha lẫn sự bất an nội tâm, phối hợp giữa màu hồng pastel và các biểu tượng y tế kẹo ngọt',
    eraOrOrigin: 'Phát tích từ khu phố thời trang Takeshita-dori (Harajuku) giữa thập niên 2010 qua nhân vật Menhera-chan',
    targetGenZ: 'Dành cho các bạn trẻ yêu thích phong cách thời trang giàu tính biểu tượng, đậm chất minh họa truyện tranh',
    tagColor: 'from-pink-500/20 to-purple-500/10 border-pink-500/40 text-pink-300',

    outfit: {
      tops: 'Áo thun oversize màu hồng phấn in hình nhân vật hoạt hình mắt đẫm lệ, áo hoodie tím lavender thêu hoa hồng gai.',
      bottoms: 'Chân váy xòe ngắn màu đen hoặc tím than viền ren đen, đính nơ ruy băng tím.',
      outerwear: 'Áo khoác gió thể thao màu pastel đính phụ kiện ghim băng kim loại.',
      footwear: 'Giày búp bê quai chéo đế bánh mì màu hồng đỗ hoặc bốt da buộc dây.',
      colorPalette: {
        primary: 'Hồng phấn pastel (Pastel Pink)',
        secondary: 'Tím hoa cà (Lavender Purple)',
        accent: 'Đen ma mị (Shadow Black)',
        colors: ['#F8BBD0', '#E1BEE7', '#212121', '#E0F7FA'],
      },
      goldenRules: [
        'Màu sắc ngọt ngào tương phản chi tiết gai góc: Sử dụng tông màu pastel kết hợp họa tiết dây gai, kim băng.',
        'Phụ kiện băng cá nhân thời trang: Điểm nhấn đặc trưng không thể nhầm lẫn.',
        'Đôi mắt đẫm lệ: Phong cách trang điểm tạo cảm giác mỏng manh yếu đuối.',
      ],
      silhouetteTips: 'Áo dáng thụng to kết hợp chân váy ngắn tạo vẻ ngoài nhỏ nhắn, dễ thương như nhân vật bước ra từ manga.',
    },

    makeup: {
      base: 'Lớp nền da trắng bệch tinh khôi như búp bê sứ.',
      eyes: {
        namidaBukuro: 'Bọng mắt phủ phấn đỏ hồng ửng mọng như vừa rơi lệ.',
        eyeliner: 'Eyeliner cụp sâu xuống đuôi mắt tạo ánh nhìn man mác buồn.',
        eyeshadow: 'Tông màu hồng tím khói hoặc đỏ mận phớt nhẹ.',
        lashes: 'Mi chuốt dài tơi mỏng.',
      },
      blush: 'Má hồng màu mận chín đánh đậm ngay dưới mi mắt dưới.',
      lips: 'Son màu quả mọng viền mờ sương, lòng môi đậm màu máu anh đào.',
    },

    hairstyle: {
      mainStyle: 'Tóc ngắn uốn cụp đuôi, hoặc tóc dài buộc hai bên đính kẹp nơ tím đen.',
      bangs: 'Mái bằng phủ kín lông mày.',
      hairAccessories: 'Kẹp tóc hình băng cá nhân pastel, kẹp hình kim tiêm kẹo ngọt, kẹp thánh giá tím.',
      colorTrend: 'Tóc nhuộm ombre hồng pastel sang tím khói, hoặc đen tuyền.',
    },

    accessories: {
      jewelry: ['Choker da đính trái tim vỡ', 'Vòng tay charm ống thuốc kẹo ngọt'],
      bags: ['Túi đeo chéo hình hộp y tế mini màu hồng phấn', 'Túi tote in typo gothic'],
      hats: ['Mũ len đính kim băng bạc'],
      nails: 'Móng tay vẽ họa tiết nhịp tim, giọt nước mắt và trái tim băng bó.',
    },

    culturalContext: {
      sociologicalOrigin: 'Yamikawaii ra đời như một hình thức chuyển hóa nỗi buồn và những vấn đề tâm lý thành ngôn ngữ thời trang tươi sáng, giúp giới trẻ mở lòng và tìm thấy sự đồng điệu.',
      psychologicalMeaning: 'Khẳng định rằng: Dù có những lúc tổn thương hay yếu đuối, bạn vẫn luôn xinh đẹp và đáng được yêu thương.',
      japaneseKeyTerms: [
        { term: '病み可愛い (Yamikawaii)', reading: 'やみかわいい', meaning: 'Vẻ đẹp đáng yêu hòa quyện cùng nỗi buồn ma mị' },
        { term: 'メンヘラ (Menhera)', reading: 'めんへら', meaning: 'Từ lóng chỉ người nhạy cảm, giàu cảm xúc nội tâm' },
        { term: '絆創膏 (Bansoukou)', reading: 'ばんそうこう', meaning: 'Băng cá nhân - phụ kiện biểu tượng của style' },
        { term: '原宿系 (Harajuku-kei)', reading: 'はらじゅくけい', meaning: 'Trường phái thời trang đường phố tự do Harajuku' },
      ],
      practicalAdvice: 'Một phong cách thời trang ấn tượng cho các buổi triển lãm nghệ thuật, sự kiện cosplay hoặc quay video sáng tạo trên mạng xã hội.',
    },
  },

  {
    id: 'city_girl_casual',
    name: 'City Girl Tokyo (シティガール - Tối Giản Năng Động Daikanyama)',
    jpName: 'シティガール・カジュアルスタイル',
    romaji: 'City Girl Casual Sutairu',
    badge: 'Thời Thượng Đời Thường · Phong Cách Tạp Chí Popeye',
    aestheticVibe: 'Tự do, thanh lịch, phóng khoáng và thông minh theo trường phái thời trang thường nhật của các cô gái Tokyo hiện đại',
    eraOrOrigin: 'Phát triển từ các khu phố sành điệu Daikanyama, Omotesando và tạp chí thời trang danh tiếng Popeye & FUDGE',
    targetGenZ: 'Dành cho các cô nàng yêu thích sự thoải mái, thanh lịch, đi học, đi làm văn phòng sáng tạo hay dạo phố cuối tuần',
    tagColor: 'from-amber-600/20 to-yellow-600/10 border-amber-600/40 text-amber-300',

    outfit: {
      tops: 'Áo sơ mi Oxford kẻ sọc xanh trắng dáng rộng (Oversized), áo thun trơn cotton chất lượng cao, áo nỉ dệt kim cổ thuyền.',
      bottoms: 'Quần tây xếp ly cạp cao ống suông rộng (Wide-leg trousers) màu be hoặc quần jeans xanh chàm ống đứng.',
      outerwear: 'Áo khoác măng tô Trench coat dáng dài màu be, áo khoác blazer kẻ caro cổ điển hoặc áo len quàng hờ ngang vai.',
      footwear: 'Giày lười Loafer da bò màu nâu hạt dẻ, giày thể thao New Balance/Salomon đi cùng tất trắng trơn cao cổ.',
      colorPalette: {
        primary: 'Màu be cát sa mạc (Camel Beige)',
        secondary: 'Xanh sơ mi Oxford (Sky Blue)',
        accent: 'Màu xám lông chuột (Charcoal Grey)',
        colors: ['#D7CCC8', '#BBDEFB', '#455A64', '#FFFFFF'],
      },
      goldenRules: [
        'Quy tắc phom dáng rộng phóng khoáng: Quần ống rộng và áo sơ mi dáng thụng mang lại sự thoải mái tuyệt đối.',
        'Áo len quàng vai (Kake-ami): Chiếc áo len dệt kim quàng ngang vai thắt hờ tạo điểm nhấn chuẩn gái Tokyo sành điệu.',
        'Màu sắc trung tính trang nhã: Ưu tiên tông màu be, xám, trắng, xanh navy tạo cảm giác thông minh, tri thức.',
      ],
      silhouetteTips: 'Sơ vin áo vạt trước kết hợp thắt lưng da bò nâu giúp tôn vòng eo thon và kéo dài đôi chân thanh lịch.',
    },

    makeup: {
      base: 'Lớp nền mỏng mịn tự nhiên như không trang điểm (No-makeup makeup look).',
      eyes: {
        namidaBukuro: 'Đánh sáng nhẹ bằng phấn nhũ mịn màu be sáng.',
        eyeliner: 'Kẻ sát chân mi nét mảnh tự nhiên.',
        eyeshadow: 'Tông màu nâu be hoặc cam đất nhạt thanh nhã.',
        lashes: 'Mi chuốt tơi nhẹ nhàng.',
      },
      blush: 'Phấn má màu cam đất hoặc hồng khô tán xéo nhẹ nhàng.',
      lips: 'Son màu cam cháy hoặc đỏ gạch mờ sương tự nhiên.',
    },

    hairstyle: {
      mainStyle: 'Tóc ngắn ngang vai uốn cụp đuôi nhẹ (Bob hair) hoặc tóc buộc đuôi ngựa thấp kiểu Pháp thanh thoát.',
      bangs: 'Mái dài vuốt lệch tự nhiên hoặc mái thưa rủ nhẹ.',
      hairAccessories: 'Kẹp càng cua kim loại tối giản, kính mắt gọng kim loại tròn trí thức.',
      colorTrend: 'Nâu sô cô la hạt dẻ ấm áp, nâu đen tự nhiên.',
    },

    accessories: {
      jewelry: ['Đồng hồ dây da mặt tròn cổ điển', 'Khuyên tai tròn nhỏ mạ vàng', 'Nhẫn bạc trơn thanh lịch'],
      bags: ['Túi tote vải canvas in typo nghệ thuật', 'Túi xách da đeo vai dáng xô bucket'],
      hats: ['Mũ lưỡi trai thêu chữ typo đơn sắc', 'Mũ len trùm đầu màu xám'],
      nails: 'Móng tay màu nude trong suốt hoặc sơn màu xanh rêu nhạt tối giản.',
    },

    culturalContext: {
      sociologicalOrigin: 'City Girl đại diện cho thế hệ phụ nữ Tokyo độc lập, thông minh và có gu thẩm mỹ tinh tế, không chạy theo những trào lưu phù phiếm mà trân trọng sự thoải mái, bền vững của trang phục thường nhật.',
      psychologicalMeaning: 'Khẳng định giá trị bản thân từ tri thức và sự tự tin, tạo nên một phong thái cuốn hút đĩnh đạc.',
      japaneseKeyTerms: [
        { term: 'シティガール (City Girl)', reading: 'してぃがーる', meaning: 'Cô nàng đô thị Tokyo sành điệu, độc lập, thanh lịch' },
        { term: '抜け感 (Nukekan)', reading: 'ぬけかん', meaning: 'Sự buông lơi tự nhiên, không gò bó trong cách phối đồ' },
        { term: 'トラッド系 (Trad-kei)', reading: 'とらっどけい', meaning: 'Trường phái thời trang thanh lịch cổ điển kiểu học viện' },
        { term: '大人可愛い (Otona Kawaii)', reading: 'おとなかわいい', meaning: 'Nét đáng yêu trưởng thành, đằm thắm của phụ nữ hiện đại' },
      ],
      practicalAdvice: 'Set đồ hoàn hảo để đi làm công sở sáng tạo, đi học đại học, gặp gỡ đối tác hay đi du lịch khắp muôn nơi với sự thoải mái tối đa.',
    },
  },
];

export interface WardrobePiece {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'outer' | 'shoes' | 'accessories' | 'bags';
  styleTag: 'shoujo' | 'coquette' | 'jirai' | 'ryousan' | 'y2k' | 'french' | 'city';
  colorHex: string;
  description: string;
  hackBenefit: string;
}

export const VIRTUAL_WARDROBE_CATALOG: WardrobePiece[] = [
  // Tops
  { id: 'top_peterpan', name: 'Sơ mi voan Peter Pan viền ren', category: 'tops', styleTag: 'shoujo', colorHex: '#FFFDF9', description: 'Cổ sen búp bê thêu hoa cúc nhí, tay phồng babydoll', hackBenefit: 'Giúp phần thân trên thanh thoát, che bắp tay' },
  { id: 'top_babytee', name: 'Baby Tee ôm sát body in chữ mini', category: 'tops', styleTag: 'coquette', colorHex: '#FFEBEE', description: 'Thun tăm cotton co giãn ôm sát eo thon', hackBenefit: 'Tôn vòng eo nhỏ nhắn và đường cong thiếu nữ' },
  { id: 'top_cableknit', name: 'Áo len vặn thừng cổ lọ mềm', category: 'tops', styleTag: 'shoujo', colorHex: '#FFF8E1', description: 'Sợi len dệt gân nổi xốp nhẹ, phom rủ tự nhiên', hackBenefit: 'Tạo cảm giác ấm áp, đáng yêu cần được chở che' },
  { id: 'top_gothic_blouse', name: 'Sơ mi đen cổ bèo ren Gothic nơ to', category: 'tops', styleTag: 'jirai', colorHex: '#1A1A24', description: 'Đính nơ ruy băng có gắn đá chữ thập bạc', hackBenefit: 'Tạo điểm nhấn bí ẩn, nổi bật màu da trắng sáng' },
  { id: 'top_oxford_shirt', name: 'Sơ mi Oxford xanh pastel dáng rộng', category: 'tops', styleTag: 'city', colorHex: '#E3F2FD', description: 'Chất vải poplin đứng phom phóng khoáng', hackBenefit: 'Che khuyết điểm vai và hông, phong thái thông minh' },

  // Bottoms
  { id: 'bot_aline_pleated', name: 'Chân váy chữ A xếp ly ngắn cạp cao', category: 'bottoms', styleTag: 'shoujo', colorHex: '#FCE4EC', description: 'Xếp ly bản nhỏ mềm mại, tôn dáng tuyệt đối', hackBenefit: 'Kéo dài đôi chân thêm 5-7cm thị giác' },
  { id: 'bot_coquette_lace', name: 'Chân váy ren bèo tầng trắng kem', category: 'bottoms', styleTag: 'coquette', colorHex: '#FFFFFF', description: 'Lớp ren dập nổi bồng bềnh như nàng thơ', hackBenefit: 'Che trọn phần đùi, tạo vòng 3 đầy đặn' },
  { id: 'bot_dark_chain', name: 'Chân váy dạ xếp ly đen đính xích bạc', category: 'bottoms', styleTag: 'jirai', colorHex: '#212121', description: 'Đai eo khóa kim loại kèm dây xích chéo hông', hackBenefit: 'Cá tính mạnh mẽ, định hình vòng eo con kiến' },
  { id: 'bot_wide_jeans', name: 'Quần jeans suông cạp trễ vừa phải', category: 'bottoms', styleTag: 'y2k', colorHex: '#90CAF9', description: 'Ống suông rộng chạm mu bàn chân', hackBenefit: 'Tạo đôi chân thon thẳng tắp phong cách GenZ' },
  { id: 'bot_midi_vintage', name: 'Chân váy midi xòe hoa nhí vintage', category: 'bottoms', styleTag: 'french', colorHex: '#D7CCC8', description: 'Chạm giữa bắp chân, thắt nơ eo nhẹ nhàng', hackBenefit: 'Thanh lịch quý phái, giấu dáng cực đỉnh' },

  // Outerwear
  { id: 'out_angora_cardigan', name: 'Cardigan len lông thỏ màu kem vani', category: 'outer', styleTag: 'shoujo', colorHex: '#FFF9C4', description: 'Mềm mượt như mây, khoác hờ hoặc cài cúc ngọc trai', hackBenefit: 'Mang lại rung cảm dịu dàng, nữ tính' },
  { id: 'out_tweed_cropped', name: 'Áo khoác dạ Tweed dáng lửng sang chảnh', category: 'outer', styleTag: 'french', colorHex: '#F5F5F5', description: 'Khuy cúc mạ vàng chạm khắc cổ điển', hackBenefit: 'Nâng cao đường eo, chuẩn khí chất tiểu thư' },
  { id: 'out_duffle_coat', name: 'Áo măng tô dạ cúc gỗ học sinh Duffle', category: 'outer', styleTag: 'shoujo', colorHex: '#795548', description: 'Cúc gỗ sừng hươu, mũ trùm ấm áp mùa đông', hackBenefit: 'Chuẩn phong cách nữ sinh truyện tranh Nhật' },
  { id: 'out_bomber_leather', name: 'Áo khoác bomber da bóng đen cá tính', category: 'outer', styleTag: 'jirai', colorHex: '#121212', description: 'Dáng oversized hầm hố tương phản váy ngắn', hackBenefit: 'Cân bằng giữa ngọt ngào và nổi loạn' },

  // Footwear
  { id: 'shoe_maryjane', name: 'Giày Mary Jane da bóng khóa trái tim', category: 'shoes', styleTag: 'shoujo', colorHex: '#212121', description: 'Đế vuông cao 4cm, quai gài ngang đính đá', hackBenefit: 'Hack chiều cao thoải mái, đi bộ êm chân' },
  { id: 'shoe_chunky_mj', name: 'Giày bánh mì Mary Jane đế dày 7cm (Atsuzoko)', category: 'shoes', styleTag: 'jirai', colorHex: '#111111', description: 'Đế bánh mì hầm hố phong cách Harajuku', hackBenefit: 'Ăn gian chiều cao ngoạn mục, đôi chân siêu thon' },
  { id: 'shoe_ballerina', name: 'Giày búp bê Ballet quai ruy băng satin', category: 'shoes', styleTag: 'coquette', colorHex: '#F8BBD0', description: 'Mũi vuông mềm mại thắt dây nơ quanh cổ chân', hackBenefit: 'Tôn cổ chân thanh mảnh, vẻ đẹp tiểu thư' },
  { id: 'shoe_loafer_jk', name: 'Giày Loafer nữ sinh Tokyo da bóng', category: 'shoes', styleTag: 'city', colorHex: '#3E2723', description: 'Đế cao su đúc êm ái, khâu viền tỉ mỉ', hackBenefit: 'Thanh lịch cổ điển, phù hợp mọi hoàn cảnh' },

  // Accessories
  { id: 'acc_ribbon_bow', name: 'Kẹp nơ lụa satin pastel to bản', category: 'accessories', styleTag: 'shoujo', colorHex: '#F48FB1', description: 'Kẹp cài nửa đầu hoặc sau gáy bồng bềnh', hackBenefit: 'Khuôn mặt nhỏ gọn hơn, hút trọn sự chú ý' },
  { id: 'acc_pearl_necklace', name: 'Dây chuyền ngọc trai nước ngọt mini', category: 'accessories', styleTag: 'french', colorHex: '#FAFAFA', description: 'Hạt ngọc mini thanh mảnh ôm sát xương quai xanh', hackBenefit: 'Tôn xương quai xanh quyến rũ' },
  { id: 'acc_choker_heart', name: 'Vòng cổ Choker da đen ổ khóa trái tim', category: 'accessories', styleTag: 'jirai', colorHex: '#000000', description: 'Khóa kim loại bạc đính đá hồng ruby', hackBenefit: 'Tôn cổ dài thanh tú, thần thái sắc sảo' },
  { id: 'acc_beret_hat', name: 'Mũ beret dạ len mỏng đội lệch góc', category: 'accessories', styleTag: 'shoujo', colorHex: '#D7CCC8', description: 'Chất dạ len mềm mại chuẩn quý cô Paris - Tokyo', hackBenefit: 'Giúp tỉ lệ đầu cân đối, rất ăn ảnh' },

  // Bags
  { id: 'bag_shoulder_chic', name: 'Túi kẹp nách da mềm Minimalist', category: 'bags', styleTag: 'coquette', colorHex: '#FFFDE7', description: 'Quai đeo vai êm ái, khóa nam châm tiện lợi', hackBenefit: 'Gọn gàng, tôn eo và tỷ lệ người khi chụp ảnh' },
  { id: 'bag_maison_bow', name: 'Túi xách Maison de FLEUR nơ lụa đôi', category: 'bags', styleTag: 'ryousan', colorHex: '#FCE4EC', description: 'Chất vải satin óng ả có in chữ typo vàng kim', hackBenefit: 'Biểu tượng tiểu thư Oshi-katsu không thể thiếu' },
  { id: 'bag_vintage_box', name: 'Túi đeo chéo dáng hộp da bò cổ điển', category: 'bags', styleTag: 'french', colorHex: '#5D4037', description: 'Khóa gài kim loại đồng cổ, quai da điều chỉnh', hackBenefit: 'Thanh lịch hoài niệm, độ bền vượt thời gian' },
];

