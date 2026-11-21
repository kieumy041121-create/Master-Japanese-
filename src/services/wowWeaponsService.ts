import { callGemini, safeExtractJson } from './geminiService';
import izakayaMenuImg from '../assets/images/izakaya_menu_preset_1794634142647.jpg';
import trainPriorityImg from '../assets/images/train_priority_seat_1794634143110.jpg';
import kyotoOmamoriImg from '../assets/images/kyoto_omamori_charm_1794634143594.jpg';

/* ============================================================================
 * WEAPON 1: MẮT THẦN AR & BÁCH KHOA QUÉT THỰC TẾ (AR Culture & Menu Decoder)
 * ============================================================================ */
export interface ArDecodedItem {
  id: string;
  japaneseText: string;
  furigana: string;
  romaji: string;
  vietnameseMeaning: string;
  atejiOrVariantNote: string;
  priceYen?: string;
  isTrap: boolean;
  trapWarning?: string;
  hotspotX: number; // % 0-100
  hotspotY: number; // % 0-100
}

export interface ArDecodeResult {
  sceneTitle: string;
  sceneCategory: 'Thực đơn Izakaya' | 'Biển báo ga tàu' | 'Vật phẩm văn hóa / Omamori' | 'Ảnh thực tế';
  overallSummary: string;
  culturalDeepDive: string;
  unspokenRule: string;
  estimatedHiddenCostYen: number;
  items: ArDecodedItem[];
  survivalPhrases: { jp: string; romaji: string; vi: string }[];
}

export interface ArPresetScene {
  id: string;
  label: string;
  subtitle: string;
  imageUrl: string;
  result: ArDecodeResult;
}

export const AR_PRESET_SCENES: ArPresetScene[] = [
  {
    id: 'izakaya',
    label: 'Thực đơn Izakaya Tokyo',
    subtitle: 'Chữ Hán dị thể, Ateji & bẫy tiền bàn Otoushi',
    imageUrl: izakayaMenuImg,
    result: {
      sceneTitle: 'Bảng Thực Đơn Gỗ Izakaya (お品書き)',
      sceneCategory: 'Thực đơn Izakaya',
      overallSummary:
        'Thực đơn quán nhậu truyền thống viết bằng bút lông Kanji. Xuất hiện 2 khoản phí ngầm bắt buộc (Otoushi ¥550 & phụ phí đêm khuya 10%) cùng các món Kanji hiếm/Ateji dễ khiến thực khách nước ngoài bối rối.',
      culturalDeepDive:
        'Văn hóa Otoushi (お通し) ở vùng Kanto tương đương "tiền chỗ ngồi / Sekiryou" kèm đĩa khai vị nhỏ tự động dọn lên dù bạn không gọi. Quán trả lương đầu bếp & chi phí giữ chỗ từ khoản này, từ chối thẳng thừng thường bị coi là thiếu hiểu biết phép tắc Izakaya.',
      unspokenRule:
        'Ở Izakaya, chữ "お会計時にお願い致します" kèm "深夜料金 10%" nghĩa là sau 22:00 toàn bộ hóa đơn tự động cộng thêm 10%. Nếu chỉ gọi 1-2 món nhẹ, khoản Otoushi + Shinya + thuế có thể đội hóa đơn lên 35%.',
      estimatedHiddenCostYen: 550,
      items: [
        {
          id: 'iz-1',
          japaneseText: 'お通し',
          furigana: 'おとおし',
          romaji: 'O-tōshi',
          vietnameseMeaning: 'Phí tiền bàn & món khai vị mặc định',
          atejiOrVariantNote: 'Kansai gọi là 突き出し (Tsukidashi). Không gọi vẫn tự tính tiền theo đầu người.',
          priceYen: '¥550 / người',
          isTrap: true,
          trapWarning: 'BẪY CHI PHÍ #1: Mỗi người ngồi vào bàn auto cộng ¥550 (~90.000₫) trước khi gọi món.',
          hotspotX: 46,
          hotspotY: 31,
        },
        {
          id: 'iz-2',
          japaneseText: '河豚刺身',
          furigana: 'ふぐさしみ',
          romaji: 'Fugu Sashimi',
          vietnameseMeaning: 'Gỏi cá nóc (Món cao cấp có độc tố đòi hỏi bằng đầu bếp riêng)',
          atejiOrVariantNote: 'Ateji kinh điển: 河豚 (Hà Đồn = lợn sông) dùng để chỉ Cá Nóc vì nó phồng bụng như lợn khi gặp nguy hiểm.',
          priceYen: '¥2,800',
          isTrap: false,
          hotspotX: 46,
          hotspotY: 39,
        },
        {
          id: 'iz-3',
          japaneseText: '馬刺し',
          furigana: 'ばさし',
          romaji: 'Basashi',
          vietnameseMeaning: 'Thịt ngựa sống thái lát (Đặc sản Kumamoto)',
          atejiOrVariantNote: 'Còn gọi là "Sakura-niku" (桜肉 - thịt hoa anh đào) do sắc hồng đỏ đẹp mắt. Không dùng nhầm với thịt bò.',
          priceYen: '¥1,600',
          isTrap: false,
          hotspotX: 46,
          hotspotY: 46,
        },
        {
          id: 'iz-4',
          japaneseText: '鶏の唐揚げ',
          furigana: 'とりのからあげ',
          romaji: 'Tori no Karaage',
          vietnameseMeaning: 'Gà chiên giòn kiểu Nhật (tẩm gừng, xì dầu & bột khoai)',
          atejiOrVariantNote: 'Chữ 唐 (Đường - nhà Đường) ám chỉ kỹ thuật chiên từ Trung Hoa truyền sang thời Edo.',
          priceYen: '¥680',
          isTrap: false,
          hotspotX: 46,
          hotspotY: 53,
        },
        {
          id: 'iz-5',
          japaneseText: '深夜料金 10%',
          furigana: 'しんやりょうきん',
          romaji: 'Shin’ya Ryōkin 10%',
          vietnameseMeaning: 'Phụ phí phục vụ đêm khuya (thường áp dụng sau 22:00)',
          atejiOrVariantNote: 'Viết chữ rất nhỏ ở góc dưới cùng để thực khách ít chú ý khi xem giá từng món.',
          priceYen: '+10% tổng bill',
          isTrap: true,
          trapWarning: 'BẪY CHI PHÍ #2: Tính thêm 10% lên toàn bộ hóa đơn sau 22:00 (cộng dồn cả tiền Otoushi).',
          hotspotX: 60,
          hotspotY: 84,
        },
      ],
      survivalPhrases: [
        {
          jp: 'お通しはキャンセルできますか？',
          romaji: 'Otōshi wa kyanseru dekimasu ka?',
          vi: 'Có thể hủy món khai vị Otoushi không ạ? (Hỏi lịch sự trước khi ngồi)',
        },
        {
          jp: 'お会計は別々でお願いします。',
          romaji: 'Okaikei wa betsubetsu de onegaishimasu.',
          vi: 'Xin vui lòng tính tiền tách riêng từng người (chia bill).',
        },
      ],
    },
  },
  {
    id: 'train',
    label: 'Biển báo Ưu tiên trên tàu điện',
    subtitle: 'Quy tắc tắt điện thoại & áp lực không gian Kuki',
    imageUrl: trainPriorityImg,
    result: {
      sceneTitle: 'Biển Cửa Sổ Khu Vực Ghế Ưu Tiên (優先席 · 携帯電話マナー)',
      sceneCategory: 'Biển báo ga tàu',
      overallSummary:
        'Biển báo trên tàu điện JR / Tokyo Metro tại khu vực ghế màu xanh/cam dành cho người cao tuổi, phụ nữ mang thai, người bế trẻ nhỏ và người mang máy tạo nhịp tim.',
      culturalDeepDive:
        'Quy định "Tắt nguồn điện thoại khi tàu đông" bắt nguồn từ tiêu chuẩn y tế cũ năm 1998 nhằm bảo vệ máy tạo nhịp tim (ペースメーカー) khỏi nhiễu sóng 2G. Dù công nghệ 4G/5G hiện đại ít gây nhiễu hơn, quy tắc này đã biến thành chuẩn mực đạo đức bất thành văn (Meiwaku-boushi) thể hiện sự tôn trọng người yếu thế.',
      unspokenRule:
        'Dù toa tàu vắng tanh nhưng đứng cạnh khu vực 優先席 mà rút điện thoại ra gọi video hay nói chuyện, người Nhật lớn tuổi sẽ nhìn chằm chằm ("Ji-tto miru") hoặc nhân viên nhà ga sẽ nhắc qua loa toàn tàu.',
      estimatedHiddenCostYen: 0,
      items: [
        {
          id: 'tr-1',
          japaneseText: '優先席',
          furigana: 'ゆうせんせき',
          romaji: 'Yūsen-seki',
          vietnameseMeaning: 'Ghế ưu tiên (Không phải "ghế cấm ngồi" hoàn toàn)',
          atejiOrVariantNote: 'Nếu toa vắng bạn vẫn có thể ngồi, NHƯNG phải chủ động đứng dậy ngay khi người thuộc 4 nhóm biểu tượng bước lên.',
          isTrap: false,
          hotspotX: 31,
          hotspotY: 26,
        },
        {
          id: 'tr-2',
          japaneseText: '妊婦・心臓ペースメーカー',
          furigana: 'にんぷ・しんぞうペースメーカー',
          romaji: 'Ninpu / Shinzō Pēsumēkā',
          vietnameseMeaning: 'Phụ nữ mang thai & Người đặt máy tạo nhịp tim',
          atejiOrVariantNote: 'Biểu tượng hình trái tim có sóng nhỏ là lý do cốt lõi của lệnh cấm sóng điện thoại tại khu vực này.',
          isTrap: true,
          trapWarning: 'QUY TẮC TỬ HUYỆT: Đứng trước biểu tượng này tuyệt đối chuyển sang chế độ Máy Bay hoặc tắt nguồn khi đông.',
          hotspotX: 35,
          hotspotY: 42,
        },
        {
          id: 'tr-3',
          japaneseText: '携帯電話の電源をお切りください',
          furigana: 'けいたいでんわのでんげんをおきりください',
          romaji: 'Keitai denwa no dengen o okiri kudasai',
          vietnameseMeaning: 'Vui lòng tắt nguồn điện thoại di động tại đây',
          atejiOrVariantNote: 'Cấu trúc Kính ngữ Tôn kính 「お＋V(ます)＋ください」 dùng cho thông báo công cộng trang trọng.',
          isTrap: true,
          trapWarning: 'LỖI ỨNG XỬ PHỔ BIẾN: Không bao giờ nghe gọi thoại trên bất kỳ toa tàu nào ở Nhật (kể cả toa thường).',
          hotspotX: 32,
          hotspotY: 60,
        },
      ],
      survivalPhrases: [
        {
          jp: 'どうぞ、こちらにお座りください。',
          romaji: 'Dōzo, kochira ni osuwari kudasai.',
          vi: 'Xin mời bác/chị ngồi vào chỗ này ạ (khi nhường ghế lịch sự).',
        },
        {
          jp: 'マナーモードに設定しております。',
          romaji: 'Manā mōdo ni settei shite orimasu.',
          vi: 'Tôi đã chuyển sang chế độ im lặng (Manner Mode) rồi ạ.',
        },
      ],
    },
  },
  {
    id: 'omamori',
    label: 'Bùa Omamori & Thẻ gỗ Ema Kyoto',
    subtitle: 'Ý nghĩa thần đạo Kotodama & điều đại kỵ khi mang bùa',
    imageUrl: kyotoOmamoriImg,
    result: {
      sceneTitle: 'Bùa Hộ Mệnh Thần Đạo (お守り) & Thẻ Nguyện Ước (絵馬)',
      sceneCategory: 'Vật phẩm văn hóa / Omamori',
      overallSummary:
        'Túi gấm gài nút rút truyền thống thỉnh từ Đền Thần đạo (Jinja) bên cạnh bảng gỗ Ema cầu sức khỏe và lương duyên tốt đẹp.',
      culturalDeepDive:
        'Chữ "勝守" (Kachimamori) không chỉ có nghĩa là thắng cuộc đấu, mà mang triết lý "thắng chính sự yếu đuối của bản thân" (Onore ni katsu). Bên trong Omamori chứa một mẩu gỗ/giấy thiêng ghi ấn triện của thần linh (Shintai - Thần thể). Nút thắt miệng túi gọi là "Nijuu Kanou Musubi" (Thắt nút điều ước thành sự thật).',
      unspokenRule:
        'ĐẠI KỴ SỐ 1: Tuyệt đối KHÔNG BAO GIỜ mở túi vải Omamori ra xem bên trong vì thần lực (Reiryoku) sẽ thoát ra hết. Và bùa chỉ có "hạn sử dụng 1 năm" — sang năm mới phải mang trả lại đền cũ để đốt hóa (Otakiage), không được vứt sọt rác!',
      estimatedHiddenCostYen: 800,
      items: [
        {
          id: 'om-1',
          japaneseText: '勝守',
          furigana: 'かちまもり',
          romaji: 'Kachi-mamori',
          vietnameseMeaning: 'Bùa Chiến Thắng (Thi cử, JLPT, sự nghiệp, thể thao)',
          atejiOrVariantNote: 'Kachi (勝) ghép với Mamori (守). Đeo vào cặp sách hoặc ví tiền mang đi thi JLPT.',
          priceYen: 'Tiền lễ ~¥800–¥1,000',
          isTrap: false,
          hotspotX: 48,
          hotspotY: 47,
        },
        {
          id: 'om-2',
          japaneseText: '縁結び',
          furigana: 'えんむすび',
          romaji: 'En-musubi',
          vietnameseMeaning: 'Bùa Kết Duyên (Tình duyên & Mối quan hệ làm ăn quý nhân)',
          atejiOrVariantNote: 'Từ "En" (縁 - Duyên) bao gồm cả duyên công việc, bạn bè tốt chứ không chỉ tình yêu đôi lứa.',
          isTrap: false,
          hotspotX: 48,
          hotspotY: 63,
        },
        {
          id: 'om-3',
          japaneseText: '賽銭箱',
          furigana: 'さいせんばこ',
          romaji: 'Saisen-bako',
          vietnameseMeaning: 'Hòm công đức gỗ trước điện thờ',
          atejiOrVariantNote: 'Người Nhật thích ném đồng xu 5 Yên (五円 = Go-en, đồng âm với ご縁 = Hữu duyên) trước khi cầu nguyện.',
          isTrap: true,
          trapWarning: 'MẸO NGHI THỨC: Tránh ném đồng 10 Yên (To-en = 遠縁 = xa duyên); đồng 5 Yên (Go-en) là may mắn nhất!',
          hotspotX: 25,
          hotspotY: 45,
        },
      ],
      survivalPhrases: [
        {
          jp: 'このお守りは一年に一度お返しするべきですか？',
          romaji: 'Kono omamori wa ichinen ni ichido okaeshi suru beki desu ka?',
          vi: 'Chiếc bùa này mỗi năm một lần có nên mang trả lại đền không ạ?',
        },
      ],
    },
  },
];

export async function analyzeArScene(imageDataUrl: string, customHint?: string): Promise<ArDecodeResult> {
  const prompt = `Bạn là "Mắt Thần AR Văn Hóa Nhật Bản". Hãy phân tích toàn bộ chữ Nhật, thực đơn, biển báo hoặc vật phẩm trong ảnh này.
${customHint ? `Gợi ý ngữ cảnh từ người dùng: "${customHint}"` : ''}

NHIỆM VỤ BẮT BUỘC:
1. Đọc chính xác các chữ Kanji/Kana (đặc biệt Kanji dị thể, Ateji chơi chữ).
2. Phát hiện MỌI BẪY CHI PHÍ (Otoushi, Sekiryou, thuế chưa gồm, phụ phí đêm khuya, size lớn) hoặc BẪY VĂN HÓA/QUY TẮC NGẦM (Meiwaku, cấm điện thoại, kiêng kỵ đền chùa).
3. Giải thích nguồn gốc văn hóa sâu sắc và quy tắc bất thành văn.
4. Gán tọa độ điểm nóng (hotspotX, hotspotY từ 15 đến 85) ước lượng vị trí chữ trên ảnh.

Trả về JSON chuẩn:
{
  "sceneTitle": "Tiêu đề ngắn gọn",
  "sceneCategory": "Thực đơn Izakaya | Biển báo ga tàu | Vật phẩm văn hóa / Omamori | Ảnh thực tế",
  "overallSummary": "Tóm tắt tình huống thực tế 2 câu",
  "culturalDeepDive": "Nguồn gốc văn hóa sâu sắc",
  "unspokenRule": "Quy tắc ngầm người nước ngoài hay vấp",
  "estimatedHiddenCostYen": 0,
  "items": [
    {
      "id": "item-1",
      "japaneseText": "Chữ Nhật",
      "furigana": "ふりがな",
      "romaji": "Romaji",
      "vietnameseMeaning": "Nghĩa tiếng Việt chuẩn",
      "atejiOrVariantNote": "Giải mã Ateji/Hán tự/Sắc thái",
      "priceYen": "¥...",
      "isTrap": true,
      "trapWarning": "Cảnh báo bẫy cụ thể nếu isTrap = true",
      "hotspotX": 50,
      "hotspotY": 40
    }
  ],
  "survivalPhrases": [
    { "jp": "Câu sinh tồn tiếng Nhật", "romaji": "Romaji", "vi": "Nghĩa tiếng Việt" }
  ]
}`;

  try {
    const raw = await callGemini(
      prompt,
      'Chỉ trả về JSON thuần hợp lệ tiếng Việt có giải mã tiếng Nhật chính xác.',
      imageDataUrl
    );
    const parsed = safeExtractJson<ArDecodeResult | null>(raw, null);
    if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
      return parsed;
    }
  } catch {
    // Fallback below
  }

  return {
    sceneTitle: 'Phân tích Ảnh Thực Tế Nhật Bản (Chế độ Ngoại Tuyến)',
    sceneCategory: 'Ảnh thực tế',
    overallSummary:
      'Đã quét khung hình thành công. Hiện không kết nối được máy chủ AI Vision nên hệ thống hiển thị khung giải mã mẫu các ký hiệu quan trọng thường gặp trên biển báo & thực đơn Nhật.',
    culturalDeepDive:
      'Tại Nhật Bản, thông tin quan trọng nhất (như phí chỗ ngồi Otoushi, phụ phí 10%, hay ngoại lệ giờ cấm) thường được in bằng chữ Kanji cỡ nhỏ ở góc dưới bên phải hoặc cuối cột dọc.',
    unspokenRule:
      'Luôn kiểm tra 2 chữ 「税込」(Đã gồm thuế) vs 「税抜」(Chưa gồm thuế +10%) và dòng 「お一人様」 (mỗi người tối thiểu 1 đồ uống/món) trước khi gọi món.',
    estimatedHiddenCostYen: 440,
    items: [
      {
        id: 'fb-1',
        japaneseText: '税込 / 税抜',
        furigana: 'ぜいこみ / ぜいぬき',
        romaji: 'Zeikomi / Zeinuki',
        vietnameseMeaning: 'Giá đã gồm thuế vs Chưa gồm thuế tiêu dùng 10%',
        atejiOrVariantNote: 'Phân biệt ký tự 込 (vào) và 抜 (trừ ra) để không giật mình lúc thanh toán.',
        isTrap: true,
        trapWarning: 'Kiểm tra kỹ ký tự cuối của bảng giá để tránh cộng thêm 10% bất ngờ.',
        hotspotX: 48,
        hotspotY: 42,
      },
      {
        id: 'fb-2',
        japaneseText: 'お一人様ワンドリンク制',
        furigana: 'おひとりさまワンドリンクせい',
        romaji: 'Ohitorisama wan dorinku sei',
        vietnameseMeaning: 'Quy định bắt buộc mỗi khách gọi ít nhất 1 đồ uống',
        atejiOrVariantNote: 'Rất phổ biến tại quán cafe, izakaya và live-house ở Tokyo.',
        isTrap: true,
        trapWarning: 'Nếu không gọi đồ uống, quán vẫn có thể phụ thu tiền chỗ ngồi.',
        hotspotX: 52,
        hotspotY: 64,
      },
    ],
    survivalPhrases: [
      {
        jp: 'これは税込みの値段ですか？',
        romaji: 'Kore wa zeikomi no nedan desu ka?',
        vi: 'Giá này đã bao gồm thuế chưa ạ?',
      },
    ],
  };
}

/* ============================================================================
 * WEAPON 2: PHÒNG LAB NHÂN BẢN GIỌNG NÓI & HIỆU CHỈNH ÂM ĐIỆU (Voice Clone Lab)
 * ============================================================================ */
export interface VoiceAcousticProfile {
  speakerLabel: string;
  basePitchHz: number; // e.g., 105 - 260 Hz
  spectralBrightness: number; // 0.5 - 1.5
  estimatedVoiceType: 'Nam trầm ấm (Baritone)' | 'Nam sáng thanh (Tenor)' | 'Nữ dịu dàng (Alto)' | 'Nữ trong trẻo (Soprano)';
  recommendedGeminiVoice: 'Charon' | 'Fenrir' | 'Puck' | 'Kore' | 'Aoede';
  pitchShiftSemitones: number;
  recordedSamplesCount: number;
  clonedAt: string;
}

export interface PitchDrillPhrase {
  id: string;
  japanese: string;
  kana: string;
  romaji: string;
  vietnamese: string;
  pitchPattern: ('L' | 'H')[]; // Tokyo pitch contour per mora
  moraLabels: string[];
  accentType: string;
  trapNote: string;
}

export const CALIBRATION_VI_SENTENCES = [
  'Xin chào Tokyo, hôm nay tôi sẽ làm chủ hoàn toàn ngữ điệu tiếng Nhật chuẩn.',
  'Cà phê sữa đá buổi sáng ở Sài Gòn thật đậm đà và tràn đầy năng lượng.',
  'Tôi tự tin giao tiếp trôi chảy như người bản xứ trong mọi cuộc họp.',
];

export const PITCH_DRILL_PHRASES: PitchDrillPhrase[] = [
  {
    id: 'pd-1',
    japanese: '橋の端で箸を使う',
    kana: 'はしのはしではしをつかう',
    romaji: 'Hashi no hashi de hashi o tsukau',
    vietnamese: 'Dùng đũa ở rìa cây cầu (Kinh điển 3 từ đồng âm khác Pitch)',
    pitchPattern: ['L', 'H', 'L', 'L', 'H', 'H', 'L', 'H', 'L', 'L', 'L', 'H', 'H'],
    moraLabels: ['は', 'し', 'の', 'は', 'し', 'で', 'は', 'し', 'を', 'つ', 'か', 'う', '。'],
    accentType: 'Odaka [2] (Cầu) · Heiban [0] (Rìa) · Atamadaka [1] (Đũa)',
    trapNote: 'Nếu đọc bằng âm thanh phẳng tiếng Việt, người Nhật nghe cả 3 chữ "hashi" giống hệt nhau!',
  },
  {
    id: 'pd-2',
    japanese: '雨の日に飴を食べる',
    kana: 'あめのひにあめをたべる',
    romaji: 'Ame no hi ni ame o taberu',
    vietnamese: 'Ăn kẹo vào ngày mưa (Âm mưa [1] vs Kẹo [0])',
    pitchPattern: ['H', 'L', 'L', 'H', 'L', 'L', 'H', 'H', 'L', 'H', 'L'],
    moraLabels: ['あ', 'め', 'の', 'ひ', 'に', 'あ', 'め', 'を', 'た', 'べ', 'る'],
    accentType: 'Atamadaka [1] (Mưa: Á-mề) vs Heiban [0] (Kẹo: À-mế)',
    trapNote: 'Mưa phải rơi ngay từ âm thứ nhất (Á-mề), kẹo lại đi lên ở âm hai (à-MẾ).',
  },
  {
    id: 'pd-3',
    japanese: 'お疲れ様でした',
    kana: 'おつかれさまでした',
    romaji: 'Otsukaresama deshita',
    vietnamese: 'Anh/chị đã vất vả rồi ạ (Câu cửa miệng công sở chuẩn Tokyo)',
    pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'L', 'L', 'L'],
    moraLabels: ['お', 'つ', 'か', 'れ', 'さ', 'ま', 'で', 'し', 'た'],
    accentType: 'Nakadaka [5] - Hạ giọng mượt sau chữ ま',
    trapNote: 'Người Việt hay lên giọng ở chữ "shita" cuối câu như tiếng Anh; người Nhật hạ êm xuống.',
  },
  {
    id: 'pd-4',
    japanese: '恐れ入りますが、ご確認いただけますか',
    kana: 'おそれいりますが、ごかくにんいただけますか',
    romaji: 'Osoreirimasu ga, gokakunin itadakemasu ka',
    vietnamese: 'Xin lỗi làm phiền, anh/chị có thể kiểm tra giúp tôi không ạ?',
    pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'L', 'L', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'H', 'L', 'L'],
    moraLabels: ['お', 'そ', 'れ', 'い', 'り', 'ま', 'す', 'が', 'ご', 'か', 'く', 'に', 'ん', 'い', 'た', 'だ', 'け', 'か'],
    accentType: 'Cushion Kotoba Keigo chuẩn phòng họp',
    trapNote: 'Giữ nhịp đệm nhẹ ở cụm 「恐れ入りますが」 để truyền sự khiêm nhường chân thành.',
  },
];

export function classifyVoiceProfile(basePitchHz: number, brightness: number, samplesCount: number): VoiceAcousticProfile {
  let estimatedVoiceType: VoiceAcousticProfile['estimatedVoiceType'] = 'Nam trầm ấm (Baritone)';
  let recommendedGeminiVoice: VoiceAcousticProfile['recommendedGeminiVoice'] = 'Charon';
  let refHz = 130;

  if (basePitchHz < 140) {
    estimatedVoiceType = 'Nam trầm ấm (Baritone)';
    recommendedGeminiVoice = 'Charon';
    refHz = 122;
  } else if (basePitchHz < 180) {
    estimatedVoiceType = 'Nam sáng thanh (Tenor)';
    recommendedGeminiVoice = 'Puck';
    refHz = 155;
  } else if (basePitchHz < 225) {
    estimatedVoiceType = 'Nữ dịu dàng (Alto)';
    recommendedGeminiVoice = 'Kore';
    refHz = 200;
  } else {
    estimatedVoiceType = 'Nữ trong trẻo (Soprano)';
    recommendedGeminiVoice = 'Aoede';
    refHz = 240;
  }

  const pitchShiftSemitones = Number((12 * Math.log2(Math.max(85, Math.min(300, basePitchHz)) / refHz)).toFixed(2));

  return {
    speakerLabel: 'Bản Sao Giọng Nói Của Bạn',
    basePitchHz: Math.round(basePitchHz),
    spectralBrightness: Number(brightness.toFixed(2)),
    estimatedVoiceType,
    recommendedGeminiVoice,
    pitchShiftSemitones,
    recordedSamplesCount: samplesCount,
    clonedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  };
}

export async function synthesizePersonalizedJapaneseAudio(
  text: string,
  profile: VoiceAcousticProfile
): Promise<{ audioBase64?: string; mimeType?: string; pitchFactor: number; toneHint: string }> {
  const pitchFactor = Math.pow(2, profile.pitchShiftSemitones / 12);
  const stylePrompt = `Speak cleanly in natural standard Tokyo pitch accent with warm vocal tone (${profile.estimatedVoiceType}, pitch around ${profile.basePitchHz}Hz)`;

  try {
    const res = await fetch('/api/gemini/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        voiceName: profile.recommendedGeminiVoice,
        stylePrompt,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.audioBase64) {
        return {
          audioBase64: data.audioBase64,
          mimeType: data.mimeType || 'audio/wav',
          pitchFactor,
          toneHint: `Gemini Neural Voice (${profile.recommendedGeminiVoice}) + Hiệu chỉnh tần số cơ bản ${profile.basePitchHz}Hz`,
        };
      }
    }
  } catch {
    // Fallback gracefully to tuned Web Speech
  }

  return {
    pitchFactor,
    toneHint: `Tổng hợp Web Speech Tokyo chuẩn đã hiệu chỉnh cao độ tương đồng ${profile.basePitchHz}Hz`,
  };
}

/* ============================================================================
 * WEAPON 3: GIẢ LẬP MẠNG XÃ HỘI LINE & PHÁ MÃ GEN-Z (LINE Chat & Social Hacker)
 * ============================================================================ */
export type LinePersonaId = string;

export interface KyDecodeReport {
  surfaceMeaning: string;
  slangAndKaomojiDecoded: { token: string; meaning: string }[];
  maruharaAlert?: string; // Detection of "。" period coldness or punctuation emotion
  truePsychologicalIntent: string;
  suggestedReplies: {
    label: string;
    japanese: string;
    romaji: string;
    vietnamese: string;
    safetyScore: number; // 0-100
    whyItWorks: string;
  }[];
}

export interface LineMessage {
  id: string;
  sender: 'them' | 'me';
  text: string;
  timestamp: string;
  readStatus?: string;
  kyAnalysis?: KyDecodeReport;
}

export interface LinePersonaConfig {
  id: LinePersonaId;
  name: string;
  jpHandle: string;
  role: string;
  avatarText: string;
  accentColor: string;
  openingMessage: LineMessage;
}

export const LINE_PERSONAS: LinePersonaConfig[] = [
  {
    id: 'genz_friend',
    name: 'Kenji (Bạn thân Gen-Z Shibuya)',
    jpHandle: '@kenji_tokyo24',
    role: 'Gen-Z Slang · Teencode · Kaomoji',
    avatarText: '健',
    accentColor: 'emerald',
    openingMessage: {
      id: 'm-gz-1',
      sender: 'them',
      text: '昨日の終電逃したのガチ草ｗｗｗ まだ生きてる？りょ待ち(⌒▽⌒)',
      timestamp: '21:14',
      kyAnalysis: {
        surfaceMeaning: 'Hôm qua lỡ chuyến tàu cuối hài xỉu haha. Vẫn còn sống không đó? Đợi bạn "okela" nha (⌒▽⌒)',
        slangAndKaomojiDecoded: [
          { token: 'ガチ (Gachi)', meaning: 'Thật sự / Cực kỳ (viết tắt của ガチンコ - đấu thật)' },
          { token: '草 (Kusa) / ｗｗｗ', meaning: 'Cười bể bụng (w = warai; nhiều chữ www mọc lên như đám cỏ "kusa")' },
          { token: 'りょ (Ryo)', meaning: 'Teencode viết tắt của 了解 (Ryoukai - Ok / Đã rõ)' },
          { token: '(⌒▽⌒)', meaning: 'Kaomoji cười toe toét thân thiện, trêu chọc vô tư' },
        ],
        truePsychologicalIntent: 'Đang trêu bạn một cách thân thiết và rủ tụ tập tiếp. Nếu bạn trả lời bằng kính ngữ hay có dấu chấm "。" sẽ tạo cảm giác xa cách ngay lập tức.',
        suggestedReplies: [
          {
            label: 'Bắt trend Gen-Z chuẩn',
            japanese: 'まじぴえん🥺 まだゾンビ状態ｗ とりま今日どうする？',
            romaji: 'Maji pien🥺 Mada zonbi jōtai w Torima kyō dō suru?',
            vietnamese: 'Huhu khóc thét thật sự🥺 Giờ vẫn như zombie haha. Tóm lại nay tính sao?',
            safetyScore: 98,
            whyItWorks: 'Dùng mượt combo ぴえん (buồn cute), ｗ (cười) và とりま (tạm thời/tóm lại).',
          },
          {
            label: 'Nhẹ nhàng thân thiện',
            japanese: 'それな〜！めっちゃ寝不足だわ(；´Д｀) 午後からならいける！',
            romaji: 'Sore na~! Metcha nebusoku da wa (;´Д`) Gogo kara nara ikeru!',
            vietnamese: 'Chuẩn luôn á! Thiếu ngủ kinh khủng. Từ chiều thì đi được nè!',
            safetyScore: 92,
            whyItWorks: 'それな (Chuẩn khỏi chỉnh) tạo cảm giác đồng điệu tức thì với bạn Nhật.',
          },
        ],
      },
    },
  },
  {
    id: 'boss_tanaka',
    name: 'Trưởng phòng Tanaka (田中部長)',
    jpHandle: 'TANAKA · Công sở Tokyo',
    role: 'Maruhara · Đọc bầu không khí KY · Kính ngữ',
    avatarText: '田',
    accentColor: 'amber',
    openingMessage: {
      id: 'm-bs-1',
      sender: 'them',
      text: '先ほどの企画書、拝見しました。内容は悪くないと思います。明日朝一で少しお時間いただけますか。',
      timestamp: '19:42',
      kyAnalysis: {
        surfaceMeaning: 'Tôi đã xem bản đề án lúc nãy. Nội dung không tệ. Sáng sớm mai bạn cho tôi xin chút thời gian nhé.',
        slangAndKaomojiDecoded: [
          { token: '内容は悪くない (Không tệ)', meaning: 'Cách nói giảm nói tránh kiểu Tatemae: Có vấn đề cần sửa lớn nhưng không chê thẳng!' },
          { token: '朝一 (Asaichi)', meaning: 'Ngay đầu giờ sáng (phải có mặt đúng 8:45–9:00 với phương án sửa)' },
        ],
        maruharaAlert: 'CẢNH BÁO MARUHARA (マルハラ): Sếp kết thúc CẢ 3 CÂU bằng dấu chấm tròn "。" mà không có icon hay chữ "!" — báo hiệu thái độ nghiêm túc/không hài lòng nhẹ!',
        truePsychologicalIntent: 'Sếp không quá tức giận nhưng bản đề án ĐANG THIẾU ĐIỂM CHỐT hoặc sai hướng ngân sách. Sáng mai là buổi "mổ xẻ" lại — tuyệt đối không được nhắn mỗi chữ 「了解です。」!',
        suggestedReplies: [
          {
            label: 'Phản hồi J1+ Chuyên nghiệp',
            japanese: '部長、お忙しい中ご確認いただきありがとうございます！明朝8時50分に修正案をお持ちいたします。よろしくお願いいたします🙇‍♂️',
            romaji: 'Buchō, oisogashii naka gokakunin itadaki arigatō gozaimasu! Myōchō 8-ji 50-pun ni shūseian o omochi itashimasu.',
            vietnamese: 'Cảm ơn Trưởng phòng đã xem giúp dù đang bận ạ! Sáng mai 8:50 em xin phép mang bản chỉnh sửa tới ạ.',
            safetyScore: 99,
            whyItWorks: 'Chủ động chốt giờ cụ thể trước 9h, thể hiện tinh thần Hourensou và kèm icon cúi đầu mềm hóa căng thẳng.',
          },
          {
            label: 'Cẩn trọng hỏi trước phạm vi sửa',
            japanese: 'ご確認ありがとうございます。明朝すぐにお伺いいたします！特に重点的に見直すべき点があれば事前にご教示いただけますでしょうか。',
            romaji: 'Gokakunin arigatō gozaimasu. Myōchō sugu ni oukagai itashimasu!...',
            vietnamese: 'Em cảm ơn sếp ạ. Sáng mai em qua ngay! Nếu có điểm trọng tâm cần xem lại trước, sếp chỉ điểm giúp em nhé ạ.',
            safetyScore: 95,
            whyItWorks: 'Chuẩn bị trước tư duy phản biện, tránh bị động khi vào phòng.',
          },
        ],
      },
    },
  },
  {
    id: 'crush_aoi',
    name: 'Aoi-chan (Crush mới quen ở quán Cafe)',
    jpHandle: '@aoi_latte',
    role: 'Thả thính tinh tế · Trễ tin nhắn · Tín hiệu ẩn',
    avatarText: '葵',
    accentColor: 'rose',
    openingMessage: {
      id: 'm-cr-1',
      sender: 'them',
      text: '返信遅くなってごめんね〜💦 最近ちょっとバタバタしてて… 来週の土曜って空いてたりする？👀✨',
      timestamp: '22:08',
      kyAnalysis: {
        surfaceMeaning: 'Xin lỗi rep trễ nha~ Dạo này hơi lu bu xíu... Thứ Bảy tuần sau bạn có rảnh không thế? 👀✨',
        slangAndKaomojiDecoded: [
          { token: 'ごめんね〜💦', meaning: 'Dấu sóng "〜" + mồ hôi 💦 kéo dài âm thanh để tạo vẻ đáng yêu, không bị lạnh lùng' },
          { token: 'バタバタしてて', meaning: 'Bận rộn túi bụi (nhưng vẫn chủ động hỏi lịch Thứ Bảy = RẤT CÓ TÌNH Ý)' },
          { token: '空いてたりする？👀✨', meaning: 'Cách hỏi vòng "~tari suru?" để giữ thể diện nếu bị từ chối, kèm icon lấp lánh bật đèn xanh!' },
        ],
        truePsychologicalIntent: 'ĐÈN XANH 95%! Người Nhật rất ngại hỏi thẳng "Thứ 7 đi chơi không?". Dùng 「空いてたりする？」là tín hiệu chủ động rủ hẹn hò nhưng chừa đường lùi tinh tế.',
        suggestedReplies: [
          {
            label: 'Đáp lại tinh tế & mở kèo',
            japanese: '全然大丈夫だよ〜！土曜ちょうど空いてる😊 どこか行きたいカフェとかある？✨',
            romaji: 'Zenzen daijōbu da yo~! Dōyō chōdo aiteru😊 Doko ka ikitai kafe toka aru?✨',
            vietnamese: 'Không sao chút nào luôn~! Thứ 7 mình đúng lúc rảnh nè😊 Bạn có quán cafe nào muốn ghé hông?',
            safetyScore: 98,
            whyItWorks: 'Dùng 「〜だよ〜！」ấm áp, xác nhận rảnh ngay và ném bóng chọn quán khéo léo.',
          },
          {
            label: 'Hơi giữ giá lịch sự',
            japanese: '忙しいのに連絡ありがとう！土曜の午後なら大丈夫だよ〜☕️',
            romaji: 'Isogashii no ni renraku arigatō! Dōyō no gogo nara daijōbu da yo~☕️',
            vietnamese: 'Cảm ơn cậu dù bận vẫn nhắn nha! Chiều Thứ 7 thì mình rảnh nè~☕️',
            safetyScore: 91,
            whyItWorks: 'Ghi nhận sự bận rộn của đối phương (Kikubari) khiến bạn Nhật cực kỳ ấn tượng.',
          },
        ],
      },
    },
  },
];

export async function generateLineReplyAndKyAnalysis(
  persona: LinePersonaConfig,
  history: LineMessage[],
  userReplyText: string
): Promise<{ replyText: string; kyAnalysis: KyDecodeReport; userMessageFeedback: string }> {
  const recentLog = history
    .slice(-5)
    .map((m) => `${m.sender === 'me' ? 'Người học' : persona.name}: ${m.text}`)
    .join('\n');

  const prompt = `Bạn là "${persona.name}" (${persona.role}) đang nhắn tin trên LINE với người học tiếng Nhật.
Lịch sử chat gần đây:
${recentLog}
Tin nhắn mới của người học: "${userReplyText}"

Hãy:
1. Chấm nhanh cách dùng từ / sắc thái / dấu câu của người học (userMessageFeedback - 1 câu tiếng Việt cực sắc bén, cảnh báo nếu dùng dấu chấm "。" gây Maruhara hoặc dùng kính ngữ/slang sai đối tượng).
2. Nhập vai "${persona.name}" trả lời 1 tin nhắn LINE siêu tự nhiên kiểu bản xứ (có thể có Teencode Nhật như ｗ, 草, りょ, それな, ぴえん, Kaomoji hoặc Tatemae công sở tùy vai).
3. Phân tích KY (Đọc bầu không khí) câu trả lời MỚI của bạn + gợi ý 2 câu đáp lại hay nhất.

Trả về JSON duy nhất:
{
  "userMessageFeedback": "Nhận xét tin nhắn người học vừa gửi",
  "replyText": "Tin nhắn LINE đáp lại bằng tiếng Nhật",
  "kyAnalysis": {
    "surfaceMeaning": "Nghĩa bề mặt",
    "slangAndKaomojiDecoded": [{ "token": "từ/icon", "meaning": "giải mã" }],
    "maruharaAlert": "Cảnh báo dấu chấm 。 hoặc áp lực thời gian nếu có, hoặc rỗng",
    "truePsychologicalIntent": "Ý đồ tâm lý thật đằng sau tin nhắn",
    "suggestedReplies": [
      { "label": "Phong cách 1", "japanese": "...", "romaji": "...", "vietnamese": "...", "safetyScore": 95, "whyItWorks": "..." }
    ]
  }
}`;

  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON hợp lệ.');
    const parsed = safeExtractJson<any>(raw, null);
    if (parsed && parsed.replyText && parsed.kyAnalysis) {
      return {
        replyText: parsed.replyText,
        userMessageFeedback: parsed.userMessageFeedback || 'Phản hồi tự nhiên, đúng ngữ cảnh LINE Nhật.',
        kyAnalysis: parsed.kyAnalysis,
      };
    }
  } catch {
    // Offline fallback
  }

  const hasPeriod = userReplyText.trim().endsWith('。');
  const maruharaNote = hasPeriod
    ? 'Phát hiện bạn vừa kết thúc câu bằng dấu chấm "。" — trong văn hóa LINE Nhật (Maruhara), Gen-Z có thể cảm thấy bạn đang giận hoặc lạnh nhạt!'
    : 'Nhịp ngắt câu không dùng dấu chấm nặng nề "。", giữ được không khí thân thiện trên LINE.';

  if (persona.id === 'boss_tanaka') {
    return {
      userMessageFeedback: maruharaNote,
      replyText: '承知しました。では明日の朝礼後、第2会議室でお待ちしております。資料の数字だけ念のため再確認しておいてください。',
      kyAnalysis: {
        surfaceMeaning: 'Tôi rõ rồi. Vậy sau buổi họp sáng mai tôi đợi ở phòng họp số 2. Nhờ bạn kiểm tra lại các con số trong tài liệu cho chắc nhé.',
        slangAndKaomojiDecoded: [
          { token: '承知しました', meaning: 'Kính ngữ chuẩn: Tôi đã nắm rõ / Đồng ý' },
          { token: '念のため (Nen no tame)', meaning: 'Để chắc chắn — thực chất là "Sếp thấy số liệu đang có lỗi, kiểm tra lại ngay!"' },
        ],
        maruharaAlert: 'MARUHARA CÔNG SỞ: Toàn bộ câu không emoji, dùng dấu chấm "。" -> Yêu cầu độ chính xác tuyệt đối.',
        truePsychologicalIntent: 'Trưởng phòng đã chỉ thẳng phần "Con số trong tài liệu" là chỗ có vấn đề. Tối nay phải rà soát lại bảng Excel!',
        suggestedReplies: [
          {
            label: 'Cam kết xử lý ngay',
            japanese: '承知いたしました！今夜中に数値データをすべて精査し、明朝お持ちいたします🙇‍♂️',
            romaji: 'Shōchi itashimashita! Kon’yajū ni sūchi dēta o subete seisa shi, myōchō omochi itashimasu.',
            vietnamese: 'Em đã rõ ạ! Trong tối nay em sẽ rà soát toàn bộ số liệu và mang lên sáng mai ạ.',
            safetyScore: 99,
            whyItWorks: 'Dùng chính xác 精査 (tinh tra/rà soát kỹ) ghi điểm tuyệt đối với sếp Nhật.',
          },
        ],
      },
    };
  }

  if (persona.id === 'crush_aoi') {
    return {
      userMessageFeedback: maruharaNote,
      replyText: 'やった〜！じゃあ表参道の隠れ家カフェどう？ずっと行きたかったんだよね(〃▽〃)♪',
      kyAnalysis: {
        surfaceMeaning: 'Tuyệt quá~! Vậy quán cafe ẩn mình ở Omotesando thì sao? Tớ muốn đi chỗ đó lâu lắm rồi á (〃▽〃)♪',
        slangAndKaomojiDecoded: [
          { token: '隠れ家カフェ', meaning: 'Quán cafe bí mật/yên tĩnh (tín hiệu muốn không gian riêng tư 2 người)' },
          { token: '(〃▽〃)', meaning: 'Kaomoji đỏ mặt ngượng ngùng cực kỳ dễ thương' },
        ],
        truePsychologicalIntent: 'Đối phương cực kỳ hào hứng vì đã chọn sẵn địa điểm lãng mạn và còn đỏ mặt qua Kaomoji!',
        suggestedReplies: [
          {
            label: 'Ga-lăng nhận kèo đặt bàn',
            japanese: 'めっちゃいいじゃん！場所予約できそうなら俺が取っておくね✨ 何時頃がいい？',
            romaji: 'Metcha ii jan! Basho yoyaku dekisō nara ore ga totte oku ne✨ Nanji goro ga ii?',
            vietnamese: 'Quá đỉnh luôn! Nếu đặt chỗ trước được thì để mình đặt cho nhé✨ Tầm mấy giờ thì hợp lý?',
            safetyScore: 98,
            whyItWorks: 'Chủ động đặt bàn trước (Kikubari) là điểm cộng chí mạng trong văn hóa hẹn hò Nhật.',
          },
        ],
      },
    };
  }

  return {
    userMessageFeedback: maruharaNote,
    replyText: 'まじそれなｗｗｗ じゃあ駅前のゲーセン集合でいい？ワンチャン終電また逃すかも草(ﾟ∀ﾟ)',
    kyAnalysis: {
      surfaceMeaning: 'Chuẩn cơm mẹ nấu haha. Vậy hẹn ở tiệm game trước ga nhé? Hên xui nay lại lỡ tàu tiếp đó cỏ ơi!',
      slangAndKaomojiDecoded: [
        { token: 'それな', meaning: 'Chuẩn không cần chỉnh / Đồng ý 100%' },
        { token: 'ワンチャン (One-chan)', meaning: 'One chance = Có khi nào / Nhỡ đâu / Hên xui' },
        { token: '(ﾟ∀ﾟ)', meaning: 'Kaomoji hưng phấn cao độ kiểu "Quẩy thôi!"' },
      ],
      truePsychologicalIntent: 'Rất thoải mái và coi bạn như "chiến hữu" thân thiết thực sự.',
      suggestedReplies: [
        {
          label: 'Bắt nhịp lầy lội',
          japanese: '了解ｗ 今日は絶対終電死守するぞ🔥 18時ハチ公前で！',
          romaji: 'Ryōkai w Kyō wa zettai shūden shishu suru zo🔥 18-ji Hachikō-mae de!',
          vietnamese: 'Okela haha. Nay quyết tâm tử thủ giữ chuyến tàu cuối nha🔥 18h trước tượng chó Hachiko!',
          safetyScore: 97,
          whyItWorks: 'Chốt giờ & địa điểm cụ thể (Hachiko Shibuya) bằng ngôn ngữ Gen-Z siêu mượt.',
        },
      ],
    },
  };
}

/* ============================================================================
 * WEAPON 4: TRẠM SINH TỒN BAITO & VĂN HÓA 3D (Konbini POS, Kamiza & Webcam Ojigi)
 * ============================================================================ */
export interface KonbiniOrderItem {
  nameJp: string;
  nameVi: string;
  price: number;
  needsWarming?: boolean;
  isAgeRestricted?: boolean; // Alcohol / Tobacco requires >= 20 age button!
}

export interface KonbiniCustomerOrder {
  id: string;
  customerLabel: string;
  ageGroupCode: '男·20代' | '女·30代' | '男·50代' | '女·10代';
  customerMood: string;
  items: KonbiniOrderItem[];
  paymentMethod: 'Suica / IC' | 'Tiền mặt (1000¥)' | 'PayPay';
  hasPointCard: boolean;
  wantsBag: boolean;
  wantsWarming: boolean;
  customerDialogueJp: string;
  requiredKeigoSteps: {
    stepId: string;
    promptVi: string;
    correctPhraseJp: string;
    distractorPhrasesJp: string[];
  }[];
}

export const KONBINI_ORDERS: KonbiniCustomerOrder[] = [
  {
    id: 'kb-1',
    customerLabel: 'Nhân viên văn phòng vội vã (Nam ~28 tuổi)',
    ageGroupCode: '男·20代',
    customerMood: 'Đang vội bắt tàu, muốn thanh toán bằng Suica',
    items: [
      { nameJp: '特製カツ丼弁当', nameVi: 'Cơm hộp Katsudon (Cần hỏi hâm nóng)', price: 598, needsWarming: true },
      { nameJp: 'アサヒスーパードライ 350ml', nameVi: 'Bia Asahi lon (Rượu bia: Bắt buộc xác nhận đủ 20 tuổi)', price: 245, isAgeRestricted: true },
    ],
    paymentMethod: 'Suica / IC',
    hasPointCard: false,
    wantsBag: true,
    wantsWarming: true,
    customerDialogueJp: 'あ、袋お願いします。あとお弁当温めてください。Suicaで！',
    requiredKeigoSteps: [
      {
        stepId: 'greet',
        promptVi: '1. Chào khách & Hỏi thẻ tích điểm (Point Card)',
        correctPhraseJp: 'いらっしゃいませ！ポイントカードはお持ちでしょうか？',
        distractorPhrasesJp: ['こんにちは、ポイントカードある？', 'いらっしゃい、カード見せてください。'],
      },
      {
        stepId: 'warm_bag',
        promptVi: '2. Xác nhận hâm nóng cơm hộp & túi nilon (tính phí)',
        correctPhraseJp: 'お弁当は温めますか？また、レジ袋はご利用になりますか？',
        distractorPhrasesJp: ['弁当温める？袋はいる？', '食べ物を熱くしましょうか。'],
      },
      {
        stepId: 'age_check',
        promptVi: '3. Mời khách chạm màn hình xác nhận trên 20 tuổi (mua bia)',
        correctPhraseJp: 'お酒が含まれておりますので、画面の年齢確認ボタンをお願いいたします。',
        distractorPhrasesJp: ['20歳以上ですか？免許証を出してください。', 'お酒だから大人ボタン押して。'],
      },
      {
        stepId: 'checkout',
        promptVi: '4. Chốt thanh toán Suica & Cảm ơn khách',
        correctPhraseJp: 'お会計843円になります。左の端末にタッチをお願いいたします。ありがとうございました！',
        distractorPhrasesJp: ['843円です。Suicaを置いて。さようなら。', '合計843円もらいます。またね！'],
      },
    ],
  },
  {
    id: 'kb-2',
    customerLabel: 'Nữ sinh viên mua đồ đêm (Nữ ~19 tuổi)',
    ageGroupCode: '女·10代',
    customerMood: 'Mang túi vải cá nhân (Eco-bag), thanh toán PayPay',
    items: [
      { nameJp: 'ファミチキ (Gà rán)', nameVi: 'Gà rán nóng Konbini', price: 230 },
      { nameJp: 'おにぎり鮭', nameVi: 'Cơm nắm cá hồi', price: 165 },
    ],
    paymentMethod: 'PayPay',
    hasPointCard: true,
    wantsBag: false,
    wantsWarming: false,
    customerDialogueJp: 'Tカードあります。袋は大丈夫です。PayPayでお願いします！',
    requiredKeigoSteps: [
      {
        stepId: 'greet',
        promptVi: '1. Chào đón & Quét mã điểm thưởng',
        correctPhraseJp: 'いらっしゃいませ！ポイントカードはお持ちですか？お預かりいたします。',
        distractorPhrasesJp: ['いらっしゃいませ。カード貸して！', 'ポイントカードありますか。'],
      },
      {
        stepId: 'bag_check',
        promptVi: '2. Xác nhận khách không lấy túi (dùng túi riêng)',
        correctPhraseJp: 'レジ袋は不要でよろしかったでしょうか？シールをお貼りしますね。',
        distractorPhrasesJp: ['袋いらないんですね、了解！', 'レジ袋あげませんね。'],
      },
      {
        stepId: 'checkout',
        promptVi: '3. Quét mã PayPay & Đưa hóa đơn bằng 2 tay',
        correctPhraseJp: 'お会計395円でございます。バーコードをスキャンいたします。ありがとうございました！',
        distractorPhrasesJp: ['395円。PayPay見せて。ありがと！', '合計395円になります。バイバイ！'],
      },
    ],
  },
];

export interface SeatSlot {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
  correctRole: 'vip' | 'host' | 'me_junior' | 'mid';
  explanation: string;
}

export interface SeatingScenario {
  id: string;
  title: string;
  subtitle: string;
  landmarkHint: string;
  slots: SeatSlot[];
}

export const SEATING_SCENARIOS: SeatingScenario[] = [
  {
    id: 'boardroom',
    title: 'Phòng Họp Hội Đồng Quản Trị (会議室)',
    subtitle: 'Xác định ghế Thượng tọa (Kamiza) cho Đối tác VIP và Hạ tọa (Shimoza) cho Nhân viên mới',
    landmarkHint: 'Cửa ra vào ở góc Dưới-Phải · Bảng/Cửa sổ ngắm cảnh ở phía Trên',
    slots: [
      { id: 's1', label: 'Ghế A (Xa cửa nhất, giữa bàn trên)', xPercent: 32, yPercent: 25, correctRole: 'vip', explanation: 'THƯỢNG TỌA (Kamiza) số 1: Xa cửa ra vào nhất, tránh bị người qua lại làm phiền — dành cho Khách VIP / Giám đốc đối tác.' },
      { id: 's2', label: 'Ghế B (Cạnh khách VIP, quay lưng tường)', xPercent: 64, yPercent: 25, correctRole: 'mid', explanation: 'Vị trí Phó đoàn đối tác hoặc Thư ký cấp cao của khách.' },
      { id: 's3', label: 'Ghế C (Bên phía chủ nhà, đối diện VIP)', xPercent: 32, yPercent: 72, correctRole: 'host', explanation: 'Ghế Trưởng đoàn Chủ nhà (Sếp bên mình), ngồi đối diện trực tiếp với VIP để đàm phán.' },
      { id: 's4', label: 'Ghế D (Gần cửa ra vào nhất)', xPercent: 72, yPercent: 72, correctRole: 'me_junior', explanation: 'HẠ TỌA (Shimoza): Gần cửa nhất! Nhân viên nhỏ tuổi nhất phải ngồi đây để tiện đứng dậy mở cửa, rót trà.' },
    ],
  },
  {
    id: 'taxi',
    title: 'Xe Taxi Đón Sếp & Đối Tác (タクシー)',
    subtitle: 'Quy tắc ngồi trong xe có tài xế người Nhật (cửa tự động bên trái)',
    landmarkHint: 'Tay lái bên Phải (Ghế tài xế ở Trên-Phải) · Cửa lên xe bên Trái',
    slots: [
      { id: 't1', label: 'Ghế sau bên Phải (Sau lưng tài xế)', xPercent: 68, yPercent: 66, correctRole: 'vip', explanation: 'THƯỢNG TỌA TAXI: An toàn nhất (xa vỉa hè/va chạm), riêng tư nhất và không phải nhích qua ghế khác — dành cho VIP cao cấp nhất!' },
      { id: 't2', label: 'Ghế sau bên Trái (Sát cửa lên xuống)', xPercent: 30, yPercent: 66, correctRole: 'host', explanation: 'Thượng tọa số 2: Dễ bước ra trước, dành cho Sếp/Trưởng phòng bên mình.' },
      { id: 't3', label: 'Ghế giữa hàng sau (Chật nhất)', xPercent: 49, yPercent: 66, correctRole: 'mid', explanation: 'Vị trí dự phòng nếu đi 4 khách, thường dành cho người có thâm niên thấp thứ nhì.' },
      { id: 't4', label: 'Ghế phụ phía trước (Cạnh tài xế)', xPercent: 30, yPercent: 30, correctRole: 'me_junior', explanation: 'HẠ TỌA TAXI: Nhân viên trẻ nhất BẮT BUỘC ngồi ghế phụ để chỉ đường cho tài xế và thanh toán tiền xe!' },
    ],
  },
];

export function evaluateOjigiAngle(angleDeg: number, targetType: 'eshaku_15' | 'keirei_30' | 'saikeirei_45'): {
  verdict: string;
  accuracyPercent: number;
  passed: boolean;
  detail: string;
} {
  const targetMap = {
    eshaku_15: { target: 15, name: 'Eshaku (会釈 - 15°)', useCase: 'Chào xã giao hành lang, gật đầu khi bước vào phòng' },
    keirei_30: { target: 30, name: 'Keirei (敬礼 - 30°)', useCase: 'Chào chuẩn phỏng vấn, gặp khách hàng, bắt đầu họp' },
    saikeirei_45: { target: 45, name: 'Saikeirei (最敬礼 - 45°)', useCase: 'Tạ lỗi nghiêm trọng (Shazai), cảm tạ sâu sắc, lễ nghi lớn' },
  };
  const cfg = targetMap[targetType];
  const diff = Math.abs(angleDeg - cfg.target);
  const accuracyPercent = Math.max(0, Math.round(100 - diff * 3.2));
  const passed = diff <= 6;

  let detail = '';
  if (passed) {
    detail = `Tuyệt hảo! Góc cúi ${angleDeg}° khớp chuẩn ${cfg.name}. Nhớ giữ lưng và cổ thẳng thành một trục, giữ yên đáy góc khoảng 1.5 giây trước khi ngẩng lên.`;
  } else if (angleDeg < cfg.target) {
    detail = `Bạn mới cúi ${angleDeg}° (thiếu ${(cfg.target - angleDeg).toFixed(0)}° so với chuẩn ${cfg.target}°). Với bối cảnh "${cfg.useCase}", cúi quá nông dễ bị đánh giá là thiếu thành ý.`;
  } else {
    detail = `Bạn cúi hơi sâu ${angleDeg}° (vượt ${(angleDeg - cfg.target).toFixed(0)}° so với chuẩn ${cfg.target}°). Cúi sâu quá mức cần thiết trong giao tiếp thường nhật có thể khiến đối phương Nhật thấy lúng túng.`;
  }

  return {
    verdict: passed ? `Đạt chuẩn ${cfg.name}` : `Cần chỉnh góc (${angleDeg}° / chuẩn ${cfg.target}°)`,
    accuracyPercent,
    passed,
    detail,
  };
}

/* ============================================================================
 * WEAPON 5: MÁY KIẾN TẠO RIREKISHO & PHÒNG PHỎNG VẤN KHỐC LIỆT (Asshuku Mensetsu)
 * ============================================================================ */
export interface RirekishoDraft {
  fullNameKatakana: string;
  fullNameKanjiOrRomaji: string;
  eraBirthDate: string;
  targetPositionJp: string;
  shibouDoukiJp: string;
  shibouDoukiVi: string;
  jikoPrJp: string;
  jikoPrVi: string;
  workHighlightsJp: string[];
  hrScorePrediction: number;
  hrOptimizationNotes: string[];
}

export interface InterviewTrapQuestion {
  id: string;
  hrQuestionJp: string;
  hrQuestionRomaji: string;
  hrQuestionVi: string;
  psychologicalTrap: string;
  winningStrategyVi: string;
  sampleStarAnswerJp: string;
  sampleStarAnswerVi: string;
}

export const INTERVIEW_TRAP_QUESTIONS: InterviewTrapQuestion[] = [
  {
    id: 'iq-1',
    hrQuestionJp: '前職を退職された一番の理由は何ですか？',
    hrQuestionRomaji: 'Zenshoku o taishoku sareta ichiban no riyū wa nan desu ka?',
    hrQuestionVi: 'Lý do lớn nhất khiến bạn nghỉ việc ở công ty cũ là gì?',
    psychologicalTrap:
      'BẪY TỬ HUYỆT: Nếu nói xấu sếp cũ, chê lương thấp hay đồng nghiệp độc hại, HR Nhật lập tức đánh trượt vì lo bạn sẽ nói xấu công ty họ sau này!',
    winningStrategyVi:
      'Xoay chuyển 100% sang "Lý do tích cực hướng về tương lai" (Positive Career Pivot): Ghi nhận công ty cũ đã dạy nền tảng, nhưng bạn muốn thử thách ở quy mô / công nghệ mà chỉ công ty mới đáp ứng được.',
    sampleStarAnswerJp:
      '前職では基礎的な実務力を培うことができましたが、より長期的なキャリアの中で貴社の強みであるグローバル開発に携わり、価値を発揮したいと考えたため転職を決意いたしました。',
    sampleStarAnswerVi:
      'Ở công ty cũ tôi đã rèn giũa được năng lực thực chiến nền tảng, tuy nhiên để phát triển dài hạn, tôi mong muốn đóng góp vào mảng phát triển toàn cầu vốn là thế mạnh của Quý công ty.',
  },
  {
    id: 'iq-2',
    hrQuestionJp: 'もし配属先が希望と全く違う部署だった場合、どうしますか？',
    hrQuestionRomaji: 'Moshi haizokusaki ga kibō to mattaku chigau busho datta baai, dō shimasu ka?',
    hrQuestionVi: 'Nếu vào công ty bạn bị phân công sang bộ phận hoàn toàn trái chuyên môn/nguyện vọng thì sao?',
    psychologicalTrap:
      'BẪY ĐO LÒNG TRUNG THÀNH (Jōyō / Shuushin Koyō): Công ty Nhật luân chuyển nhân sự định kỳ. Trả lời "Em sẽ xin nghỉ" là trượt ngay lập tức!',
    winningStrategyVi:
      'Thể hiện tinh thần cầu thị (Jun’ousei): Coi việc luân chuyển là cơ hội hiểu rộng toàn chuỗi giá trị công ty, và dùng thế mạnh cốt lõi của mình tạo giá trị ở vị trí mới.',
    sampleStarAnswerJp:
      '新しい業務にも前向きに挑戦し、まずは目の前の仕事で成果を出すことに集中いたします。どの部署であっても、これまでの改善意識を活かして貢献できると確信しております。',
    sampleStarAnswerVi:
      'Tôi sẽ chủ động đón nhận thử thách ở nghiệp vụ mới và tập trung tạo kết quả trước mắt. Dù ở bộ phận nào, tôi tin tư duy cải tiến Kaizen của mình đều đóng góp được giá trị.',
  },
  {
    id: 'iq-3',
    hrQuestionJp: 'あなたの最大の短所と、それをどう克服しているか教えてください。',
    hrQuestionRomaji: 'Anata no saidai no tansho to, sore o dō kokufuku shite iru ka oshiete kudasai.',
    hrQuestionVi: 'Điểm yếu lớn nhất của bạn là gì và bạn đang khắc phục nó thế nào?',
    psychologicalTrap:
      'BẪY TỰ HẠI MÌNH: Nói điểm yếu chí mạng cho vị trí đó (VD: thi kế toán bảo "tôi tính ẩu") hoặc khoe khéo giả tạo ("tôi quá hoàn hảo") đều bị trừ điểm nặng.',
    winningStrategyVi:
      'Công thức 3 bước: (1) Thừa nhận điểm yếu có thể kiểm soát -> (2) Nêu hành động Kaizen cụ thể đang làm hàng ngày -> (3) Chứng minh điểm yếu đó đang trở thành mặt tích cực.',
    sampleStarAnswerJp:
      '慎重になりすぎて作業に時間がかかる点です。そのため現在は「まず6割の完成度で一度報連相する」ルールを徹底し、スピードと正確さの両立を図っております。',
    sampleStarAnswerVi:
      'Điểm yếu của tôi là hay cẩn trọng quá mức nên tốn thời gian. Do đó hiện nay tôi áp dụng nguyên tắc "hoàn thành 60% là báo cáo Hourensou ngay" để cân bằng tốc độ và độ chính xác.',
  },
];

export async function buildRirekishoFromVietnamese(input: {
  fullName: string;
  birthYear: string;
  targetCompany: string;
  experienceVi: string;
  strengthsVi: string;
}): Promise<RirekishoDraft> {
  const prompt = `Bạn là Giám đốc Tuyển dụng Nhân sự Cấp cao (Jinji Buchou) tại Tokyo chuyên chỉnh sửa hồ sơ JIS Rirekisho (履歴書) & Shokumukeirekisho (職務経歴書) cho ứng viên quốc tế.

Thông tin thô bằng tiếng Việt từ ứng viên:
- Họ tên: ${input.fullName}
- Năm sinh: ${input.birthYear}
- Vị trí / Công ty mục tiêu: ${input.targetCompany}
- Kinh nghiệm làm việc: ${input.experienceVi}
- Điểm mạnh / Nguyện vọng: ${input.strengthsVi}

Hãy chuyển hóa toàn bộ sang văn phong tiếng Nhật tuyển dụng chuẩn J1+ (thể hiện tinh thần Kaizen, Hourensou, sự tận tụy gắn bó lâu dài và khiêm nhường).
Trả về JSON duy nhất:
{
  "fullNameKatakana": "カタカナ",
  "fullNameKanjiOrRomaji": "Tên chuẩn trên CV Nhật",
  "eraBirthDate": "Ví dụ: 平成10年（1998年）生",
  "targetPositionJp": "Chức danh bằng tiếng Nhật",
  "shibouDoukiJp": "Đoạn Động cơ ứng tuyển 志望動機 tiếng Nhật thuyết phục (khoảng 120-160 chữ Nhật)",
  "shibouDoukiVi": "Bản dịch tiếng Việt mượt mà",
  "jikoPrJp": "Đoạn Tự giới thiệu thế mạnh 自己PR dùng từ khóa Kaizen/Hourensou",
  "jikoPrVi": "Bản dịch tiếng Việt",
  "workHighlightsJp": ["Gạch đầu dòng thành tích 1 bằng tiếng Nhật", "Gạch đầu dòng 2"],
  "hrScorePrediction": 92,
  "hrOptimizationNotes": ["Lý do chỉnh sửa 1 để chinh phục HR Nhật", "Lý do 2"]
}`;

  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON hợp lệ.');
    const parsed = safeExtractJson<RirekishoDraft | null>(raw, null);
    if (parsed && parsed.shibouDoukiJp && parsed.jikoPrJp) {
      return parsed;
    }
  } catch {
    // Fallback below
  }

  const yr = parseInt(input.birthYear, 10) || 1998;
  const showaOrHeisei = yr >= 1989 ? `平成${yr - 1988}年（${yr}年）` : `昭和${yr - 1925}年（${yr}年）`;

  return {
    fullNameKatakana: 'グエン・ヴァン・ミン',
    fullNameKanjiOrRomaji: input.fullName || 'NGUYEN VAN MINH',
    eraBirthDate: showaOrHeisei,
    targetPositionJp: input.targetCompany || 'ITシステムエンジニア・グローバル架け橋人材',
    shibouDoukiJp: `貴社の技術力と日本基準の品質管理体制に深く共感し、志望いたしました。これまで「${input.experienceVi.slice(0, 40)}」の現場で培った実務経験と報連相（ホウレンソウ）の姿勢を活かし、長期的に貴社の成長に貢献してまいりたいと存じます。`,
    shibouDoukiVi: `Tôi ứng tuyển vì ấn tượng sâu sắc với năng lực công nghệ và hệ thống quản lý chất lượng chuẩn Nhật của Quý công ty. Phát huy kinh nghiệm từ "${input.experienceVi.slice(0, 50)}" cùng tinh thần Hourensou, tôi mong muốn đóng góp lâu dài cho sự phát triển của Quý công ty.`,
    jikoPrJp: `私の強みは、課題を発見し改善（カイゼン）へと繋げる継続力です。「${input.strengthsVi.slice(0, 40)}」を軸に、常に周囲との協調性を重んじながら粘り強く業務を完遂してきました。入社後も細部への気配りを忘れず即戦力として貢献いたします。`,
    jikoPrVi: `Điểm mạnh của tôi là sự bền bỉ phát hiện vấn đề để triển khai Cải tiến (Kaizen). Dựa trên nền tảng "${input.strengthsVi.slice(0, 45)}", tôi luôn coi trọng phối hợp đồng đội và bám sát công việc đến cùng.`,
    workHighlightsJp: [
      `実務実績：${input.experienceVi.slice(0, 60)}（チーム連携と納期厳守を徹底）`,
      `強み・改善力：${input.strengthsVi.slice(0, 60)}を活かした業務効率化を実施`,
    ],
    hrScorePrediction: 91,
    hrOptimizationNotes: [
      'Đã quy đổi năm sinh sang niên hiệu Nhật Bản (Heisei/Showa) đúng quy chuẩn JIS Rirekisho.',
      'Lồng ghép cụm từ khóa vàng HR Nhật săn đón: 報連相 (Hourensou), 改善 (Kaizen), 納期厳守 (Tuân thủ deadline) & 長期的貢献 (Gắn bó lâu dài).',
    ],
  };
}

export async function evaluateInterviewResponse(
  question: InterviewTrapQuestion,
  userAnswerJpOrVi: string,
  postureStats: { eyeContactScore: number; lightingOk: boolean; postureStable: boolean }
): Promise<{
  hrPassProbability: number;
  honneVerdictVi: string;
  tatemaeFeedbackJp: string;
  polishedAnswerJp: string;
  polishedAnswerVi: string;
}> {
  const prompt = `Bạn là Hội đồng Giám khảo Phỏng vấn Khốc liệt Nhật Bản (圧迫面接 / Asshuku Mensetsu).
Câu hỏi bẫy tâm lý: "${question.hrQuestionJp}" (${question.hrQuestionVi})
Câu trả lời của ứng viên: "${userAnswerJpOrVi}"
Chỉ số Camera: Giao tiếp mắt ${postureStats.eyeContactScore}%, Tư thế ổn định: ${postureStats.postureStable ? 'Có' : 'Hơi rung lắc'}.

Hãy soi thật gắt lỗi câu từ, kính ngữ, tư duy (có dính bẫy nói xấu sếp cũ hoặc thiếu khiêm tốn không) và đề xuất câu sửa chuẩn N1.
Trả về JSON duy nhất:
{
  "hrPassProbability": 78,
  "honneVerdictVi": "Đánh giá thẳng thắn (Honne) của HR Nhật về câu trả lời & phong thái",
  "tatemaeFeedbackJp": "Câu nhận xét lịch sự kiểu Nhật",
  "polishedAnswerJp": "Phiên bản câu trả lời được nâng cấp lên chuẩn đậu 95%",
  "polishedAnswerVi": "Nghĩa tiếng Việt của bản nâng cấp"
}`;

  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON hợp lệ.');
    const parsed = safeExtractJson<any>(raw, null);
    if (parsed && parsed.honneVerdictVi && parsed.polishedAnswerJp) {
      return parsed;
    }
  } catch {
    // Fallback
  }

  const hasNegativeWords = /chán|tệ|ghét|sếp|lương|bực|nghỉ/i.test(userAnswerJpOrVi);
  const prob = Math.min(96, Math.max(48, (hasNegativeWords ? 55 : 80) + Math.round(postureStats.eyeContactScore * 0.15)));

  return {
    hrPassProbability: prob,
    honneVerdictVi: hasNegativeWords
      ? 'CẢNH BÁO ĐỎ TỪ HR NHẬT: Bạn đang vô tình bộc lộ cảm xúc tiêu cực hoặc nhắc khía cạnh bất mãn với nơi cũ. Dù đúng sự thật, Hội đồng Nhật sẽ đánh giá bạn thiếu khả năng thích nghi (Jun’ousei).'
      : 'Ý hướng trả lời tích cực, đúng trọng tâm. Cần tăng thêm kính ngữ Khiêm nhường ngữ (Kenjougo: 〜いたしております / 〜存じます) và giữ ánh nhìn ổn định vào tâm camera.',
    tatemaeFeedbackJp: '貴重なご意見をありがとうございます。これまでのご経験についてさらに詳しく伺えればと存じます。',
    polishedAnswerJp: question.sampleStarAnswerJp,
    polishedAnswerVi: question.sampleStarAnswerVi,
  };
}

/* ============================================================================
 * LOAD MORE (+3) EXPANSION GENERATORS ACROSS ALL 5 WOW WEAPONS
 * ============================================================================ */

function buildJapaneseSignSvgDataUrl(title: string, lines: string[], bgHex = '#111827', accentHex = '#f59e0b'): string {
  const escapedLines = lines
    .slice(0, 6)
    .map(
      (line, idx) =>
        `<text x="400" y="${185 + idx * 62}" text-anchor="middle" fill="#f8fafc" font-size="34" font-weight="700" font-family="'Noto Sans JP', sans-serif">${line
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')}</text>`
    )
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgHex}"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <rect x="44" y="44" width="712" height="512" rx="22" fill="none" stroke="${accentHex}" stroke-width="4" stroke-opacity="0.7"/>
    <text x="400" y="108" text-anchor="middle" fill="${accentHex}" font-size="30" font-weight="800" font-family="'Noto Sans JP', sans-serif">${title
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}</text>
    <line x1="120" y1="130" x2="680" y2="130" stroke="${accentHex}" stroke-opacity="0.35" stroke-width="2"/>
    ${escapedLines}
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// --- WEAPON 1 (+3 AR Presets & +3 Deep Items) ---
const EXTRA_AR_PRESETS: ArPresetScene[] = [
  {
    id: 'karaoke_bill',
    label: 'Bảng Giá Karaoke Shinjuku',
    subtitle: 'Bẫy One-Drink bắt buộc & giá cuối tuần tăng x3',
    imageUrl: buildJapaneseSignSvgDataUrl(
      'カラオケ料金表（お一人様30分）',
      ['昼フリータイム ¥980（税抜）', '金・祝前日 18時〜 ¥680/30分', '※ワンドリンク制（¥550〜）', '延長自動更新 · ご注意ください', '深夜パック +22:00 別途チャージ'],
      '#1e1b4b',
      '#fb7185'
    ),
    result: {
      sceneTitle: 'Bảng Giá Karaoke Kabukicho / Shinjuku (料金表)',
      sceneCategory: 'Thực đơn Izakaya',
      overallSummary:
        'Bảng giá niêm yết nhìn qua rất rẻ ("chỉ ¥980"), nhưng chứa đầy bẫy giờ vàng Thứ Sáu/Trước Ngày Lễ, giá tính theo 30 phút và quy định bắt buộc gọi đồ uống.',
      culturalDeepDive:
        'Các chuỗi Karaoke Nhật chia giá rất nhỏ theo khung 30 phút (30分) và phân biệt rạch ròi ngày thường (Heijitsu) với đêm Thứ Sáu/Trước ngày nghỉ (Kin/Shukuzenjitsu). Nhiều khách tưởng giá ¥980 là trọn gói cả tối.',
      unspokenRule:
        'Nhân viên Karaoke Nhật KHÔNG gọi nhắc bạn hết giờ trước lúc tính tiền ở nhiều hệ thống tự động. Nếu lố quá 1 phút, máy tự động gia hạn (延長 - Enchou) thêm 30 phút giá đêm khuya!',
      estimatedHiddenCostYen: 1230,
      items: [
        {
          id: 'kr-1',
          japaneseText: 'お一人様30分',
          furigana: 'おひとりさまさんじゅっぷん',
          romaji: 'Ohitorisama 30-pun',
          vietnameseMeaning: 'Đơn giá tính cho 1 NGƯỜI mỗi 30 PHÚT (không phải tiền cả phòng)',
          atejiOrVariantNote: 'Đi nhóm 4 người phải nhân 4 lần đơn giá trên bảng.',
          priceYen: 'x4 nếu đi 4 người',
          isTrap: true,
          trapWarning: 'BẪY NHÂN HỆ SỐ: Khách hay nhầm là giá thuê 1 phòng trọn gói.',
          hotspotX: 50,
          hotspotY: 20,
        },
        {
          id: 'kr-2',
          japaneseText: 'ワンドリンク制',
          furigana: 'わんどりんくせい',
          romaji: 'Wan dorinku sei',
          vietnameseMeaning: 'Chế độ bắt buộc mỗi người gọi ít nhất 1 đồ uống riêng',
          atejiOrVariantNote: 'Dù chọn gói phòng rẻ, mỗi người vẫn cộng tối thiểu ¥550 tiền nước ngoài hóa đơn phòng.',
          priceYen: '+¥550/người',
          isTrap: true,
          trapWarning: 'BẪY PHỤ PHÍ: Tự động cộng thêm tiền 1 ly nước khi thanh toán.',
          hotspotX: 50,
          hotspotY: 52,
        },
        {
          id: 'kr-3',
          japaneseText: '延長自動更新',
          furigana: 'えんちょうじどうこうしん',
          romaji: 'Enchō jidō kōshin',
          vietnameseMeaning: 'Tự động gia hạn thêm giờ nếu chưa ra khỏi phòng trước 10 phút',
          atejiOrVariantNote: 'Phải chú ý điện thoại bàn reo báo còn 10 phút ("10-pun mae call").',
          isTrap: false,
          hotspotX: 50,
          hotspotY: 64,
        },
      ],
      survivalPhrases: [
        {
          jp: '時間になったら教えていただけますか？',
          romaji: 'Jikan ni nattara oshiete itadakemasu ka?',
          vi: 'Đến giờ vui lòng gọi điện báo giúp tôi với nhé (tránh bị tự động gia hạn).',
        },
      ],
    },
  },
  {
    id: 'ramen_jiro',
    label: 'Bảng Gọi Topping Ramen Jiro',
    subtitle: 'Mật mã "Yasai Mashi Mashi · Nin’niku"',
    imageUrl: buildJapaneseSignSvgDataUrl(
      'ラーメン二郎 · 無料トッピング',
      ['ニンニク入れますか？（コール）', 'ヤサイ（もやし・キャベツ増量）', 'アブラ（背脂）· カラメ（醤油ダレ）', '※マシマシは完食できる方のみ', '残し厳禁！食券は先にお買い求めを'],
      '#271c19',
      '#facc15'
    ),
    result: {
      sceneTitle: 'Bảng Mật Mã Gọi Ramen Jiro (無料トッピングコール)',
      sceneCategory: 'Thực đơn Izakaya',
      overallSummary:
        'Văn hóa gọi topping miễn phí nổi tiếng tại các tiệm Ramen Jiro. Người mới rất dễ hoảng khi đầu bếp hỏi dồn 1 câu 3 chữ ngay trước lúc bưng bát ra.',
      culturalDeepDive:
        'Khi đầu bếp nhìn bạn và nói 「ニンニク入れますか？」(Có cho tỏi không?), đó KHÔNG phải câu hỏi Yes/No đơn thuần mà là hiệu lệnh để bạn đọc thần chú chọn 4 thứ: Tỏi (Nin’niku), Rau (Yasai), Mỡ lưng (Abura), Độ mặn (Karame).',
      unspokenRule:
        'ĐẠI KỴ QUÁN RAMEN JIRO: Nếu gọi "Mashi Mashi" (tăng gấp đôi-gấp ba rau & thịt) mà ăn thừa mứa không hết (お残し), nhiều chủ quán khó tính sẽ từ chối phục vụ lần sau. Người mới chỉ nên nói 「ニンニク少し、あと普通で」!',
      estimatedHiddenCostYen: 0,
      items: [
        {
          id: 'rj-1',
          japaneseText: 'ニンニク入れますか？',
          furigana: 'にんにくいれますか',
          romaji: 'Nin’niku iremasu ka?',
          vietnameseMeaning: 'Tín hiệu gọi các loại Topping miễn phí (ngay trước khi bưng ra)',
          atejiOrVariantNote: 'Chỉ nói "Hai" không thì quán chỉ cho tỏi; hãy nói rõ "Sukuname" (ít) hoặc "Nashi" (không).',
          isTrap: true,
          trapWarning: 'BẪY KHI GỌI "全マシ (Zen-mashi)": Một bát khổng lồ 2,000 kcal xuất hiện trước mặt bạn!',
          hotspotX: 50,
          hotspotY: 32,
        },
        {
          id: 'rj-2',
          japaneseText: '食券制 (Shokken-sei)',
          furigana: 'しょっけんせい',
          romaji: 'Shokken-sei',
          vietnameseMeaning: 'Mua phiếu ăn ở máy bán tự động NGAY CỬA trước khi ngồi vào ghế',
          atejiOrVariantNote: 'Không đưa tiền mặt trực tiếp trên bàn ăn.',
          isTrap: false,
          hotspotX: 50,
          hotspotY: 72,
        },
      ],
      survivalPhrases: [
        {
          jp: 'ニンニク少し、あとは普通でお願いします。',
          romaji: 'Nin’niku sukoshi, ato wa futsū de onegaishimasu.',
          vi: 'Cho em ít tỏi thôi, các thứ khác bình thường ạ (Câu gọi an toàn nhất).',
        },
      ],
    },
  },
  {
    id: 'trash_sorting',
    label: 'Bảng Phân Loại Rác Shibuya',
    subtitle: 'Rác cháy được · Chai PET & Giờ đổ rác',
    imageUrl: buildJapaneseSignSvgDataUrl(
      '渋谷区 · ゴミ出しルール（8時まで）',
      ['可燃ゴミ：月・木（生ゴミ・紙くず）', '資源ゴミ：水（ペットボトルはラベル剥がす）', '不燃ゴミ：第1・3火（割れ物・小型家電）', '※ルール違反は回収されません', '収集時間：当日朝8:00までに出すこと'],
      '#064e3b',
      '#34d399'
    ),
    result: {
      sceneTitle: 'Bảng Quy Định Phân Loại Rác Chung Cư Nhật (ゴミ分別)',
      sceneCategory: 'Biển báo ga tàu',
      overallSummary:
        'Bảng quy định nghiêm ngặt về 3 loại rác: Rác cháy được (Kanen), Rác tài nguyên (Shigen) và Rác không cháy được (Funen) cùng giờ chốt 8 giờ sáng.',
      culturalDeepDive:
        'Tại Nhật, chai nhựa PET bắt buộc phải: (1) Đổ sạch nước, (2) Bóc nhãn màng co (Raberu), (3) Tháo nắp riêng bỏ vào thùng nhựa riêng, và (4) Giẫm bẹp trước khi vứt đúng ngày Nước/Thứ Tư.',
      unspokenRule:
        'TUYỆT ĐỐI KHÔNG vứt rác từ đêm hôm trước nếu tòa nhà cấm (quạ đen Karasu sẽ mổ rách túi bới tung cả ngõ, hàng xóm và chủ nhà sẽ dán giấy cảnh cáo đỏ lên túi rác của bạn!).',
      estimatedHiddenCostYen: 0,
      items: [
        {
          id: 'ts-1',
          japaneseText: '可燃ゴミ / 不燃ゴミ',
          furigana: 'かねんごみ / ふねんごみ',
          romaji: 'Kanen gomi / Funen gomi',
          vietnameseMeaning: 'Rác đốt được (rác bếp, giấy) vs Rác không đốt được (thủy tinh, pin)',
          atejiOrVariantNote: 'Phải nhớ cặp chữ Hán trái nghĩa 可 (Có thể) vs 不 (Không).',
          isTrap: true,
          trapWarning: 'CẢNH BÁO PHẠT: Bỏ pin hoặc bình ga mini vào túi rác đốt được có thể gây cháy nổ xe rác!',
          hotspotX: 50,
          hotspotY: 32,
        },
        {
          id: 'ts-2',
          japaneseText: 'ペットボトルはラベル剥がす',
          furigana: 'ぺっとぼとるはらべるはがす',
          romaji: 'Petto botoru wa raberu hagasu',
          vietnameseMeaning: 'Chai nhựa PET phải bóc sạch nhãn nilon & tháo nắp',
          atejiOrVariantNote: 'Màng co nhãn là nhựa thường (プラ), còn thân chai là nhựa PET tái chế cao cấp.',
          isTrap: false,
          hotspotX: 50,
          hotspotY: 42,
        },
      ],
      survivalPhrases: [
        {
          jp: '粗大ゴミの出し方を教えていただけますか？',
          romaji: 'Sodai gomi no dashikata o oshiete itadakemasu ka?',
          vi: 'Xin hỏi cách vứt rác cỡ lớn (tủ/nệm phải mua tem ở Konbini) như thế nào ạ?',
        },
      ],
    },
  },
];

export async function loadMoreArPresets(existingIds: string[]): Promise<ArPresetScene[]> {
  const unseen = EXTRA_AR_PRESETS.filter((p) => !existingIds.includes(p.id));
  if (unseen.length > 0) {
    return unseen.slice(0, 3);
  }

  // Dynamic AI generation when built-in presets are exhausted
  const prompt = `Tạo đúng 3 bối cảnh quét AR thực tế mới tại Nhật Bản (khác các id: ${existingIds.join(', ')}). Ví dụ: Hóa đơn Taxi đêm khuya, Biển phòng tắm Onsen có hình xăm, Bảng mua vé Shinkansen. Trả về JSON array gồm 3 phần tử có sceneTitle, subtitle, label, lines (4 dòng chữ Nhật trên ảnh), culturalDeepDive, unspokenRule, items (2 item mỗi cảnh).`;
  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON array hợp lệ.');
    const arr = safeExtractJson<any[]>(raw, []);
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.slice(0, 3).map((x, idx) => ({
        id: `ai-ar-${Date.now()}-${idx}`,
        label: x.label || x.sceneTitle || `Cảnh AR Nhật #${existingIds.length + idx + 1}`,
        subtitle: x.subtitle || 'Bối cảnh thực tế AI kiến tạo',
        imageUrl: buildJapaneseSignSvgDataUrl(
          x.sceneTitle || '日本の看板',
          Array.isArray(x.lines) && x.lines.length > 0 ? x.lines : ['ご注意ください', 'お会計はこちら'],
          '#0f172a',
          '#38bdf8'
        ),
        result: {
          sceneTitle: x.sceneTitle || 'Biển báo thực tế Nhật Bản',
          sceneCategory: 'Ảnh thực tế',
          overallSummary: x.overallSummary || 'Phân tích thực tế các chữ Hán và quy tắc ngầm Nhật Bản.',
          culturalDeepDive: x.culturalDeepDive || 'Giải mã tầng văn hóa đằng sau thông báo này.',
          unspokenRule: x.unspokenRule || 'Chú ý kiểm tra chi phí phụ và quy tắc cư xử nơi công cộng.',
          estimatedHiddenCostYen: Number(x.estimatedHiddenCostYen) || 0,
          items: Array.isArray(x.items) && x.items.length > 0 ? x.items : EXTRA_AR_PRESETS[0].result.items,
          survivalPhrases: Array.isArray(x.survivalPhrases) && x.survivalPhrases.length > 0 ? x.survivalPhrases : EXTRA_AR_PRESETS[0].result.survivalPhrases,
        },
      }));
    }
  } catch {
    // Fallback clone with unique id
  }

  return [
    {
      ...EXTRA_AR_PRESETS[0],
      id: `ar-dyn-${Date.now()}`,
      label: `Bối cảnh Mở rộng #${existingIds.length + 1}`,
    },
  ];
}

export async function loadMoreArItemsForScene(
  sceneTitle: string,
  existingJapaneseTexts: string[]
): Promise<ArDecodedItem[]> {
  const prompt = `Trong khung cảnh "${sceneTitle}", hãy giải mã thêm 3 thuật ngữ Kanji/Ateji hoặc bẫy chi phí/quy tắc khác chưa nằm trong danh sách [${existingJapaneseTexts.join(', ')}]. Trả về JSON array 3 phần tử đúng cấu trúc ArDecodedItem (id, japaneseText, furigana, romaji, vietnameseMeaning, atejiOrVariantNote, isTrap, trapWarning, hotspotX, hotspotY).`;
  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON array hợp lệ.');
    const arr = safeExtractJson<ArDecodedItem[]>(raw, []);
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.slice(0, 3).map((it, i) => ({
        ...it,
        id: `ext-item-${Date.now()}-${i}`,
        hotspotX: it.hotspotX || 35 + i * 18,
        hotspotY: it.hotspotY || 38 + i * 12,
      }));
    }
  } catch {
    // Fallback
  }
  const stamp = Date.now();
  return [
    {
      id: `ext-1-${stamp}`,
      japaneseText: '内税 / 外税',
      furigana: 'うちぜい / そとぜい',
      romaji: 'Uchizei / Sotozei',
      vietnameseMeaning: 'Thuế gộp sẵn trong giá vs Thuế cộng ngoài (+10%)',
      atejiOrVariantNote: 'Khi thấy chữ 外税 ở đáy menu, tổng bill sẽ tăng 10% lúc quẹt thẻ.',
      isTrap: true,
      trapWarning: 'Kiểm tra ký tự 内 hay 外 trước khi chốt đơn bàn đông người.',
      hotspotX: 30,
      hotspotY: 75,
    },
    {
      id: `ext-2-${stamp}`,
      japaneseText: 'お冷や',
      furigana: 'おひや',
      romaji: 'Ohiya',
      vietnameseMeaning: 'Nước lọc đá miễn phí (ở quán ăn Nhật)',
      atejiOrVariantNote: 'Đừng nhầm với 水 (mizu) trong quán rượu — gọi Ohiya luôn miễn phí!',
      isTrap: false,
      hotspotX: 68,
      hotspotY: 28,
    },
    {
      id: `ext-3-${stamp}`,
      japaneseText: 'ラストオーダー',
      furigana: 'らすとおーだー',
      romaji: 'Rasuto Ōdā (L.O.)',
      vietnameseMeaning: 'Lượt gọi món cuối cùng (thường trước giờ đóng cửa 30–45 phút)',
      atejiOrVariantNote: 'Sau tiếng gọi L.O., bếp tắt lửa và không nhận thêm đồ ăn dù quán chưa đóng.',
      isTrap: false,
      hotspotX: 52,
      hotspotY: 50,
    },
  ];
}

// --- WEAPON 2 (+3 Calibration Sentences & +3 Tokyo Pitch Drills) ---
const EXTRA_CALIBRATION_VI: string[] = [
  'Buổi chiều trên chuyến tàu điện Yamanote đông đúc người đi làm về rất trật tự.',
  'Tôi muốn đặt một bàn cho bốn người vào lúc bảy giờ tối thứ Sáu tại khu Ginza.',
  'Xin lỗi anh, tôi có thể kiểm tra lại bảng báo giá dự án trước buổi họp được không?',
  'Mùa thu ở Kyoto lá phong đỏ rực bên những ngôi chùa cổ kính thật yên bình.',
  'Cảm ơn quý khách đã luôn tin tưởng và đồng hành cùng công ty chúng tôi suốt năm qua.',
  'Sáng mai nhóm kỹ sư chúng ta sẽ rà soát toàn bộ tiến độ trước khi bàn giao.',
];

export async function loadMoreCalibrationViSentences(existing: string[]): Promise<string[]> {
  const unseen = EXTRA_CALIBRATION_VI.filter((s) => !existing.includes(s));
  if (unseen.length >= 3) return unseen.slice(0, 3);
  return EXTRA_CALIBRATION_VI.slice(0, 3);
}

const EXTRA_PITCH_DRILLS: PitchDrillPhrase[] = [
  {
    id: 'pd-extra-1',
    japanese: '蜘蛛の巣と雲の形',
    kana: 'くものすとくものかたち',
    romaji: 'Kumo no su to kumo no katachi',
    vietnamese: 'Mạng nhện và hình dáng đám mây (蜘蛛 [1] vs 雲 [1/L-H])',
    pitchPattern: ['H', 'L', 'L', 'L', 'L', 'L', 'H', 'L', 'L', 'H', 'H'],
    moraLabels: ['く', 'も', 'の', 'す', 'と', 'く', 'も', 'の', 'か', 'た', 'ち'],
    accentType: 'Atamadaka [1] (Nhện: KÚ-mồ) vs Odaka/Kifuku [1/0] (Mây: kù-MỐ)',
    trapNote: 'Phân biệt Nhện (Ku cao -> mo hạ) với Mây ở Tokyo (Ku thấp -> mo cao lên)!',
  },
  {
    id: 'pd-extra-2',
    japanese: '今朝、お坊さんが袈裟を着た',
    kana: 'けさ、おぼうさんがけさをきた',
    romaji: 'Kesa, obōsan ga kesa o kita',
    vietnamese: 'Sáng nay nhà sư đã mặc áo cà sa (今朝 [1] vs 袈裟 [0])',
    pitchPattern: ['H', 'L', 'L', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'L', 'H'],
    moraLabels: ['け', 'さ', 'お', 'ぼ', 'う', 'さ', 'ん', 'が', 'け', 'さ', 'を', 'き'],
    accentType: 'Atamadaka [1] (今朝: KÉ-sà) vs Heiban [0] (袈裟: kè-SÁ)',
    trapNote: 'Hai chữ phát âm đều là "kesa" nhưng KÉ-sa (sáng nay) luôn hạ giọng ở chữ さ.',
  },
  {
    id: 'pd-extra-3',
    japanese: 'お世話になっております',
    kana: 'おせわになっております',
    romaji: 'Osewa ni natte orimasu',
    vietnamese: 'Cảm ơn anh/chị đã luôn giúp đỡ (Câu chào điện thoại công sở #1)',
    pitchPattern: ['L', 'H', 'L', 'L', 'H', 'L', 'L', 'L', 'H', 'H', 'L'],
    moraLabels: ['お', 'せ', 'わ', 'に', 'な', 'っ', 'て', 'お', 'り', 'ま', 'す'],
    accentType: 'Nakadaka [2] (お世' + '話: ò-SÉ-wà) + hạ êm orimasu',
    trapNote: 'Điểm nhấn rơi ngay sau chữ せ (o-SE-wa) tạo âm hưởng lịch thiệp chuyên nghiệp.',
  },
  {
    id: 'pd-extra-4',
    japanese: 'お待たせいたしました',
    kana: 'おまたせいたしました',
    romaji: 'Omatase itashimashita',
    vietnamese: 'Xin lỗi đã để quý khách phải đợi lâu ạ',
    pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'L', 'H', 'H', 'L'],
    moraLabels: ['お', 'ま', 'た', 'せ', 'い', 'た', 'し', 'ま', 'し', 'た'],
    accentType: 'Heiban mượt sang Đuôi lịch sự ~まLした',
    trapNote: 'Không nhấn mạnh giật cục chữ ま; lướt đều L-H-H-H ở cụm お待たせ.',
  },
  {
    id: 'pd-extra-5',
    japanese: '紙を切るか、服を着るか',
    kana: 'かみをきるか、ふくをきるか',
    romaji: 'Kami o kiru ka, fuku o kiru ka',
    vietnamese: 'Cắt giấy hay là mặc quần áo? (切る [1] vs 着る [0])',
    pitchPattern: ['L', 'H', 'L', 'H', 'L', 'L', 'L', 'H', 'L', 'L', 'H', 'H'],
    moraLabels: ['か', 'み', 'を', 'き', 'る', 'か', 'ふ', 'く', 'を', 'き', 'る', 'か'],
    accentType: 'Atamadaka [1] (切る KÍ-rù = cắt) vs Heiban [0] (着る kì-RÚ = mặc)',
    trapNote: 'Cặp động từ tử huyệt N5-N1: KÍ-ru (rơi) là cắt, ki-RÚ (lên) là mặc!',
  },
  {
    id: 'pd-extra-6',
    japanese: 'ご確認のほどよろしくお願いいたします',
    kana: 'ごかくにんのほどよろしくおねがいいたします',
    romaji: 'Gokakunin no hodo yoroshiku onegai itashimasu',
    vietnamese: 'Rất mong nhận được sự xác nhận của anh/chị ạ',
    pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'L'],
    moraLabels: ['ご', 'か', 'く', 'に', 'ん', 'の', 'ほ', 'ど', 'よ', 'ろ', 'し', 'く', 'お', 'ね', 'が', 'い'],
    accentType: 'Business Kính ngữ Pitch chuẩn B2B',
    trapNote: 'Hạ nhịp rõ sau ご確認 rồi nối hơi trầm ấm ở のほど.',
  },
];

export async function loadMorePitchDrills(existingIds: string[]): Promise<PitchDrillPhrase[]> {
  const unseen = EXTRA_PITCH_DRILLS.filter((p) => !existingIds.includes(p.id));
  if (unseen.length > 0) return unseen.slice(0, 3);

  const prompt = `Tạo đúng 3 bài tập phát âm Tokyo Pitch Accent (minimal pair đồng âm khác Pitch hoặc câu Kính ngữ công sở thực chiến) khác với id [${existingIds.join(', ')}]. Trả về JSON array 3 phần tử gồm: id, japanese, kana, romaji, vietnamese, pitchPattern (mảng gồm các ký tự "L" hoặc "H" khớp số lượng với moraLabels), moraLabels (mảng từng ký tự kana), accentType, trapNote.`;
  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON array hợp lệ.');
    const arr = safeExtractJson<PitchDrillPhrase[]>(raw, []);
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.slice(0, 3).map((d, i) => ({ ...d, id: `ai-pd-${Date.now()}-${i}` }));
    }
  } catch {
    // Fallback
  }
  return EXTRA_PITCH_DRILLS.slice(0, 3).map((d, i) => ({ ...d, id: `pd-rep-${Date.now()}-${i}` }));
}

// --- WEAPON 3 (+3 LINE Personas & +3 Extra Reply Ideas) ---
const EXTRA_LINE_PERSONAS: LinePersonaConfig[] = [
  {
    id: 'senpai_nomikai',
    name: 'Senpai Sato (Rủ đi Nomikai)',
    jpHandle: '@sato_senpai',
    role: 'Cách từ chối khéo Kuki · Hậu bối công sở',
    avatarText: '佐',
    accentColor: 'cyan',
    openingMessage: {
      id: 'm-sp-1',
      sender: 'them',
      text: '今日仕事終わり、課長も行くらしいんだけど軽く飲みに行かない？無理なら全然いいよ〜🍺',
      timestamp: '17:35',
      kyAnalysis: {
        surfaceMeaning: 'Nay tan làm nghe bảo Trưởng phòng cũng đi đấy, đi uống nhẹ một chút không? Nếu kẹt quá thì không sao đâu nha~🍺',
        slangAndKaomojiDecoded: [
          { token: '課長も行くらしい', meaning: 'Chiêu nhắc khéo có sếp lớn đi cùng = Nhậu tạo quan hệ (Nominication)' },
          { token: '無理なら全然いいよ〜', meaning: 'Tatemae kinh điển: Nói là "không sao", nhưng nếu bạn từ chối thẳng "Muri desu" sẽ mất điểm nghiêm trọng!' },
        ],
        truePsychologicalIntent: 'Đang kiểm tra mức độ hòa nhập tập thể của bạn. Nếu bận thật, bắt buộc phải "Bù đắp tinh thần" + xin lỗi sâu sắc và hẹn lần sau cụ thể!',
        suggestedReplies: [
          {
            label: 'Nhận kèo chuẩn Kouhai',
            japanese: 'お誘いありがとうございます！ぜひ参加させてください🙌 何時頃どこ集合でしょうか？',
            romaji: 'Osasoi arigatō gozaimasu! Zehi sanka sasete kudasai🙌...',
            vietnamese: 'Em cảm ơn anh đã rủ ạ! Nhất định cho em tham gia với ạ🙌 Mấy giờ tập trung ở đâu thế anh?',
            safetyScore: 99,
            whyItWorks: 'Dùng 「参加させてください」 (Xin cho phép tôi được tham gia) thể hiện thái độ kính trọng tuyệt vời.',
          },
          {
            label: 'Từ chối khéo giữ thể diện 100%',
            japanese: 'お声がけ大変嬉しいです😭 あいにく本日は先約があり伺えず残念です…次回は必ず参加させてください！',
            romaji: 'Okoegake taihen ureshii desu😭 Ainiku honjitsu wa sen’yaku ga ari...',
            vietnamese: 'Được anh rủ em mừng lắm luôn😭 Tiếc quá nay em trót có hẹn trước không tới được... Lần sau nhất định cho em đi với ạ!',
            safetyScore: 96,
            whyItWorks: 'Không nói rõ lý do riêng tư mà dùng từ vàng 「先約があり」(trót có hẹn trước) + cam kết lần sau.',
          },
        ],
      },
    },
  },
  {
    id: 'landlord_fudousan',
    name: 'Chủ nhà Yamamoto (Quản lý nhà)',
    jpHandle: 'YAMAMOTO_KANRI',
    role: 'Phàn nàn tiếng ồn · Vấn đề sinh hoạt Nhật',
    avatarText: '山',
    accentColor: 'amber',
    openingMessage: {
      id: 'm-ld-1',
      sender: 'them',
      text: 'いつもお世話になっております。近隣の方から夜間23時以降の足音・話し声についてご相談がございました。ご確認のほどよろしくお願いいたします。',
      timestamp: '10:15',
      kyAnalysis: {
        surfaceMeaning: 'Cảm ơn anh/chị đã tin dùng. Phía hàng xóm có phản ánh về tiếng bước chân và giọng nói sau 23h đêm. Xin nhờ anh/chị kiểm tra lại giúp.',
        slangAndKaomojiDecoded: [
          { token: 'ご相談がございました', meaning: 'Cách nói giảm cực mạnh cho chữ "KHIẾU NẠI GAY GẮT" (Kuremu) từ hàng xóm!' },
          { token: '近隣の方 (Hàng xóm)', meaning: 'Quản lý giấu tên hàng xóm để tránh hai bên cãi vã trực tiếp' },
        ],
        maruharaAlert: 'Văn phong hành chính trang trọng toàn dấu chấm "。". Nếu im lặng không rep trong 24h sẽ bị ghi vào hồ sơ vi phạm nội quy chung cư!',
        truePsychologicalIntent: 'CẢNH BÁO ĐỎ: Hàng xóm đã chịu hết nổi và gọi lên công ty quản lý nhà. Bắt buộc phải nhận lỗi nhẹ nhàng ngay và cam kết lót thảm/giữ im lặng sau 22h.',
        suggestedReplies: [
          {
            label: 'Xử lý khủng hoảng êm đẹp',
            japanese: 'ご連絡ありがとうございます。ご迷惑をおかけし大変申し訳ございません🙇‍♂️ 本日より22時以降の騒音には細心の注意を払い、防音マットも敷くようにいたします。',
            romaji: 'Gorenraku arigatō gozaimasu. Gomeiwaku o okake shi taihen mōshiwake gozaimasen...',
            vietnamese: 'Cảm ơn anh/chị đã báo ạ. Thành thật xin lỗi vì đã làm phiền hàng xóm🙇‍♂️ Từ hôm nay sau 22h em sẽ cực kỳ chú ý và trải thêm thảm cách âm ạ.',
            safetyScore: 99,
            whyItWorks: 'Xin lỗi bằng 「ご迷惑をおかけし」 + đưa ngay giải pháp thực tế (thảm cách âm) khiến người Nhật nguôi giận ngay.',
          },
        ],
      },
    },
  },
  {
    id: 'x_otaku_group',
    name: 'Rina (Bạn fan Anime trên X/LINE)',
    jpHandle: '@rina_oshi活',
    role: 'Từ lóng Oshi-katsu · Chữ viết tắt X Trends',
    avatarText: '莉',
    accentColor: 'rose',
    openingMessage: {
      id: 'm-xt-1',
      sender: 'them',
      text: '待ってｗ 今週のアニメ最新話マジ神回すぎて語彙力死んだｗｗｗ 推し尊い😭✨ ネタバレ踏んでない？',
      timestamp: '23:20',
      kyAnalysis: {
        surfaceMeaning: 'Khoan đã haha. Tập mới anime tuần này đỉnh nóc kịch trần làm mình mất luôn vốn từ vựng huhu. Idol đáng quý quá 😭✨ Bạn chưa dính spoil chứ?',
        slangAndKaomojiDecoded: [
          { token: '神回 (Kamikai)', meaning: 'Tập phim hay cấp thần thánh' },
          { token: '語彙力死んだ', meaning: 'Hay đến mức cạn lời / não ngừng xử lý ngôn ngữ' },
          { token: '推し尊い (Oshi tōtoi)', meaning: 'Bias/nhân vật yêu thích đẹp & cao quý không tỳ vết' },
          { token: 'ネタバレ踏む', meaning: 'Dính Spoiler (bị lộ nội dung phim)' },
        ],
        truePsychologicalIntent: 'Đang cực kỳ phấn khích tìm đồng minh "gáy" về tập phim mới nhưng lịch sự hỏi xem bạn đã xem chưa để tránh làm lộ nội dung.',
        suggestedReplies: [
          {
            label: 'Bắt nhịp Otaku chính hiệu',
            japanese: 'わかるｗｗｗ 作画エグすぎて鳥肌立った！！推ししか勝たん😭🔥 今夜もう3周するｗ',
            romaji: 'Wakaru www Sakuga egusugite torihada tatta!! Oshi shika katan 😭🔥',
            vietnamese: 'Hiểu luôn haha! Nét vẽ đỉnh chóp nổi hết cả da gà!! Chỉ có Idol nhà mình là chân ái😭🔥 Đêm nay cày lại 3 vòng haha!',
            safetyScore: 98,
            whyItWorks: 'Dùng chuẩn slang fan Nhật: エグい (khét lẹt/đỉnh), 鳥肌 (nổi da gà) và ~しか勝たん (~là chân ái).',
          },
        ],
      },
    },
  },
];

export async function loadMoreLinePersonas(existingIds: string[]): Promise<LinePersonaConfig[]> {
  const unseen = EXTRA_LINE_PERSONAS.filter((p) => !existingIds.includes(p.id));
  if (unseen.length > 0) return unseen.slice(0, 3);

  const prompt = `Tạo đúng 3 kịch bản nhân vật nhắn tin LINE/X tiếng Nhật mới (khác ${existingIds.join(', ')}), có Teencode/Tatemae/Maruhara. Trả về JSON array 3 LinePersonaConfig đầy đủ (id, name, jpHandle, role, avatarText 1 Kanji, accentColor, openingMessage với kyAnalysis chi tiết).`;
  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON array hợp lệ.');
    const arr = safeExtractJson<LinePersonaConfig[]>(raw, []);
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.slice(0, 3).map((p, idx) => ({ ...p, id: `ai-ln-${Date.now()}-${idx}` }));
    }
  } catch {
    // Fallback
  }
  return EXTRA_LINE_PERSONAS.slice(0, 3).map((p, i) => ({ ...p, id: `ln-ext-${Date.now()}-${i}` }));
}

export async function loadMoreLineReplies(
  persona: LinePersonaConfig,
  lastMessageText: string,
  existingLabels: string[]
): Promise<KyDecodeReport['suggestedReplies']> {
  const prompt = `Trong ngữ cảnh chat LINE với "${persona.name}" (${persona.role}), tin nhắn của đối phương là: "${lastMessageText}".
Hãy đề xuất thêm 3 phương án trả lời tiếng Nhật MỚI với sắc thái khác nhau (chưa trùng [${existingLabels.join(', ')}]).
Trả về JSON array 3 phần tử gồm: label, japanese, romaji, vietnamese, safetyScore (70-99), whyItWorks.`;
  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON array hợp lệ.');
    const arr = safeExtractJson<KyDecodeReport['suggestedReplies']>(raw, []);
    if (Array.isArray(arr) && arr.length > 0) return arr.slice(0, 3);
  } catch {
    // Fallback
  }
  return [
    {
      label: 'Phản hồi an toàn trung lập',
      japanese: 'ご連絡ありがとうございます！確認してすぐにお返事しますね🙏',
      romaji: 'Gorenraku arigatō gozaimasu! Kakunin shite sugu ni ohenji shimasu ne🙏',
      vietnamese: 'Cảm ơn đã nhắn nhé! Mình kiểm tra rồi rep lại ngay nha🙏',
      safetyScore: 93,
      whyItWorks: 'An toàn tuyệt đối trong mọi tình huống cần câu giờ suy nghĩ.',
    },
    {
      label: 'Tạo thiện cảm ấm áp',
      japanese: 'わざわざありがとうございます✨ すごく助かります！また詳しくお話ししましょう〜',
      romaji: 'Wazawaza arigatō gozaimasu✨ Sugoku tasukarimasu!...',
      vietnamese: 'Cảm ơn bạn đã cất công nhắn cho mình nha✨ Giúp mình nhiều lắm luôn!',
      safetyScore: 95,
      whyItWorks: 'Chữ わざわざ + 助かります tạo cảm giác đối phương được trân trọng.',
    },
    {
      label: 'Thẳng thắn nhưng lịch sự',
      japanese: 'なるほど、そういうことですね！少し検討してから改めて連絡してもいいですか？',
      romaji: 'Naruhodo, sō iu koto desu ne! Sukoshi kentō shite kara aratamete renraku shite mo ii desu ka?',
      vietnamese: 'À ra vậy! Cho mình cân nhắc chút rồi liên lạc lại sau được không?',
      safetyScore: 89,
      whyItWorks: 'Giữ ranh giới lịch sự kiểu Nhật mà không gây áp lực.',
    },
  ];
}

// --- WEAPON 4 (+3 Konbini Orders, +3 Kamiza Scenarios, +3 Ojigi Real Cases) ---
const EXTRA_KONBINI_ORDERS: KonbiniCustomerOrder[] = [
  {
    id: 'kb-3',
    customerLabel: 'Ông chú mua thuốc lá Mevius (Nam ~52 tuổi)',
    ageGroupCode: '男·50代',
    customerMood: 'Hơi vội, muốn đọc số mã thuốc lá trên kệ sau lưng bạn và trả tiền mặt ¥1000',
    items: [
      { nameJp: 'メビウス・ゴールド (Số 14)', nameVi: 'Thuốc lá Mevius (Bắt buộc xác nhận đủ 20 tuổi)', price: 580, isAgeRestricted: true },
      { nameJp: 'ブラックコーヒー缶', nameVi: 'Cà phê đen lon nóng', price: 150 },
    ],
    paymentMethod: 'Tiền mặt (1000¥)',
    hasPointCard: false,
    wantsBag: false,
    wantsWarming: false,
    customerDialogueJp: '14番のタバコ1つとこれ。レシートはいらないよ。',
    requiredKeigoSteps: [
      {
        stepId: 'tobacco_num',
        promptVi: '1. Xác nhận đúng số thứ tự gói thuốc lá sau quầy',
        correctPhraseJp: '14番のおタバコ、お一つでお間違いないでしょうか？',
        distractorPhrasesJp: ['14番のタバコでいいですか。', 'はい、14番を取ってきますね。'],
      },
      {
        stepId: 'age_check',
        promptVi: '2. Mời khách chạm nút xác nhận trên 20 tuổi trên màn hình khách',
        correctPhraseJp: '恐れ入りますが、画面の年齢確認ボタンにタッチをお願いいたします。',
        distractorPhrasesJp: ['大人ですか？ボタンを押してください。', '20歳以上ですよね、タッチして。'],
      },
      {
        stepId: 'cash_change',
        promptVi: '3. Nhận 1000¥, trả 270¥ tiền thừa bằng 2 tay đúng quy chuẩn',
        correctPhraseJp: '1000円お預かりいたします。270円のお返しでございます。ありがとうございました！',
        distractorPhrasesJp: ['1000円もらいます。お釣り270円。', '270円返しますね。バイバイ！'],
      },
    ],
  },
  {
    id: 'kb-4',
    customerLabel: 'Cô nhân viên thanh toán hóa đơn điện nước (Nữ ~34 tuổi)',
    ageGroupCode: '女·30代',
    customerMood: 'Cầm phiếu đóng tiền điện (Koukyou Ryoukin) — CHỈ ĐƯỢC TRẢ TIỀN MẶT',
    items: [
      { nameJp: '東京電力 電気料金 (Phiếu thu hộ)', nameVi: 'Hóa đơn tiền điện Tokyo (Không thanh toán bằng thẻ/PayPay)', price: 4820 },
      { nameJp: 'ホットカフェラテ R', nameVi: 'Cà phê Latte nóng cỡ vừa', price: 180 },
    ],
    paymentMethod: 'Tiền mặt (1000¥)',
    hasPointCard: false,
    wantsBag: false,
    wantsWarming: false,
    customerDialogueJp: 'すみません、電気代の支払いとカフェラテRを一つ、現金でお願いします。',
    requiredKeigoSteps: [
      {
        stepId: 'bill_cash_only',
        promptVi: '1. Xác nhận quét mã vạch hóa đơn thu hộ & nhắc chỉ nhận tiền mặt',
        correctPhraseJp: '公共料金のお支払いですね。恐れ入りますが、お支払いは現金のみとなっております。',
        distractorPhrasesJp: ['電気代ですね、カード使えませんよ。', '現金を出してください。'],
      },
      {
        stepId: 'stamp_receipt',
        promptVi: '2. Đóng dấu xác nhận lên biên lai và giao lại bản lưu cho khách',
        correctPhraseJp: '5000円ちょうど頂戴いたします。こちらが受領証の控えでございます。',
        distractorPhrasesJp: ['領収書あげますね。', 'スタンプ押しましたから持って帰って。'],
      },
      {
        stepId: 'coffee_cup',
        promptVi: '3. Giao ly rỗng cho khách tự pha ở máy cà phê Konbini',
        correctPhraseJp: 'カフェラテのカップでございます。あちらのマシンをご利用くださいませ！',
        distractorPhrasesJp: ['カップです、自分で入れて。', 'コップ渡しますね、あっちで押して。'],
      },
    ],
  },
  {
    id: 'kb-5',
    customerLabel: 'Khách gửi bưu kiện Takkyubin & mua đồ ăn (Nam ~24 tuổi)',
    ageGroupCode: '男·20代',
    customerMood: 'Mang thùng hàng Yamato cần đo kích thước 80cm',
    items: [
      { nameJp: '宅急便 80サイズ (Gửi hàng)', nameVi: 'Phí gửi bưu kiện nội địa Nhật size 80', price: 1150 },
      { nameJp: '肉まん (Bánh bao nóng)', nameVi: 'Bánh bao thịt hấp nóng tủ giữ nhiệt', price: 160, needsWarming: true },
    ],
    paymentMethod: 'Suica / IC',
    hasPointCard: true,
    wantsBag: true,
    wantsWarming: false,
    customerDialogueJp: 'この荷物東京へ送りたいです。あと肉まん一つと袋もください。',
    requiredKeigoSteps: [
      {
        stepId: 'parcel_check',
        promptVi: '1. Xác nhận bên trong kiện hàng không có chất dễ cháy nổ (pin, bình xịt)',
        correctPhraseJp: '恐れ入りますが、お荷物の中に危険物やリチウム電池などは入っておりませんか？',
        distractorPhrasesJp: ['危ない物入ってないですよね？', '中身は何ですか、チェックします。'],
      },
      {
        stepId: 'bag_charge',
        promptVi: '2. Thông báo giá túi nilon 3 Yên và hỏi có dán băng dính không',
        correctPhraseJp: 'レジ袋は一枚3円になりますがよろしいでしょうか？テープでお留めいたしますか？',
        distractorPhrasesJp: ['袋3円かかるけどいる？', 'テープ貼るか貼らないか言って。'],
      },
      {
        stepId: 'finish_service',
        promptVi: '3. Đưa phiếu theo dõi đơn hàng & tiễn khách',
        correctPhraseJp: 'ご依頼主様控えをお渡しいたします。またのお越しをお待ちしております！',
        distractorPhrasesJp: ['控えこれね。ありがとう！', '終わりました、さようなら。'],
      },
    ],
  },
];

export async function loadMoreKonbiniOrders(existingIds: string[]): Promise<KonbiniCustomerOrder[]> {
  const unseen = EXTRA_KONBINI_ORDERS.filter((o) => !existingIds.includes(o.id));
  if (unseen.length > 0) return unseen.slice(0, 3);
  return EXTRA_KONBINI_ORDERS.slice(0, 3).map((o, i) => ({
    ...o,
    id: `kb-ext-${Date.now()}-${i}`,
    customerLabel: `${o.customerLabel} (Ca mới)`,
  }));
}

const EXTRA_SEATING_SCENARIOS: SeatingScenario[] = [
  {
    id: 'washitsu_tatami',
    title: 'Phòng Tiệc Chiếu Tatami (和室・床の間)',
    subtitle: 'Xác định chỗ ngồi trước hốc trang trí Tokonoma trong tiệc công ty / gặp mặt',
    landmarkHint: 'Hốc trang trí Tokonoma (tranh/hoa) ở Trên-Trái · Cửa trượt Fusuma ở Dưới-Phải',
    slots: [
      {
        id: 'ws-1',
        label: 'Chỗ #1 (Quay lưng vào hốc Tokonoma)',
        xPercent: 28,
        yPercent: 26,
        correctRole: 'vip',
        explanation: 'THƯỢNG TỌA WASHITSU: Người quan trọng nhất ngồi quay lưng về phía hốc Tokonoma (chính giữa ngắm được cả phòng & xa cửa ra vào nhất)!',
      },
      {
        id: 'ws-2',
        label: 'Chỗ #2 (Cạnh VIP, phía trên bàn)',
        xPercent: 64,
        yPercent: 26,
        correctRole: 'mid',
        explanation: 'Thượng tọa nhì: Dành cho khách đi cùng cấp phó hoặc khách lớn tuổi thứ hai.',
      },
      {
        id: 'ws-3',
        label: 'Chỗ #3 (Đối diện VIP, xa cửa hơn)',
        xPercent: 28,
        yPercent: 72,
        correctRole: 'host',
        explanation: 'Vị trí Trưởng đoàn Chủ nhà / Sếp bên mời tiệc ngồi tiếp chuyện trực tiếp với VIP.',
      },
      {
        id: 'ws-4',
        label: 'Chỗ #4 (Sát cửa trượt Fusuma nhất)',
        xPercent: 72,
        yPercent: 72,
        correctRole: 'me_junior',
        explanation: 'HẠ TỌA (Shimoza): Sát cửa ra vào nhất! Nhân viên mới ngồi đây để tiện gọi đồ, nhận bia/trà từ nhân viên phục vụ.',
      },
    ],
  },
  {
    id: 'elevator_vip',
    title: 'Thang Máy Công Ty Đi Cùng VIP (エレベーター)',
    subtitle: 'Vị trí đứng của người bấm nút (Bảng điều khiển) và góc trang trọng cho khách',
    landmarkHint: 'Cửa thang máy ở phía Dưới · Bảng nút bấm tầng ở góc Dưới-Phải',
    slots: [
      {
        id: 'el-1',
        label: 'Góc sâu bên Trái (Đối diện bảng nút bấm)',
        xPercent: 28,
        yPercent: 28,
        correctRole: 'vip',
        explanation: 'THƯỢNG TỌA THANG MÁY: Sâu nhất bên trái (xa cửa & đối diện bảng điều khiển) — an toàn, không bị chạm vai khi người khác bấm nút!',
      },
      {
        id: 'el-2',
        label: 'Góc sâu bên Phải (Phía sau người bấm nút)',
        xPercent: 70,
        yPercent: 28,
        correctRole: 'host',
        explanation: 'Thượng tọa số 2: Dành cho Sếp bên mình hoặc khách VIP thứ hai.',
      },
      {
        id: 'el-3',
        label: 'Giữa thang máy (Lưng hướng vách)',
        xPercent: 48,
        yPercent: 52,
        correctRole: 'mid',
        explanation: 'Vị trí trung gian khi thang có 4 người.',
      },
      {
        id: 'el-4',
        label: 'Sát cửa bên Phải (Ngay bảng điều khiển)',
        xPercent: 72,
        yPercent: 76,
        correctRole: 'me_junior',
        explanation: 'HẠ TỌA BẮT BUỘC: Nhân viên nhỏ tuổi nhất phải vào trước hoặc đứng giữ nút 「開」 (Mở cửa), bấm tầng giúp VIP và bước ra sau cùng!',
      },
    ],
  },
  {
    id: 'shinkansen_seats',
    title: 'Hàng Ghế 3 Chỗ Tàu Shinkansen (新幹線 3列席)',
    subtitle: 'Quy tắc chọn ghế cửa sổ E-D-A khi đi công tác cùng Sếp',
    landmarkHint: 'Cửa sổ ngắm núi Phú Sĩ bên Trái · Lối đi hành lang ở bên Phải',
    slots: [
      {
        id: 'sk-1',
        label: 'Ghế A (Sát cửa sổ yên tĩnh nhất)',
        xPercent: 28,
        yPercent: 46,
        correctRole: 'vip',
        explanation: 'THƯỢNG TỌA TÀU HỎA: Ghế sát cửa sổ (A/E) không bị người đi lại làm phiền và ngắm cảnh — dành cho VIP / Sếp lớn!',
      },
      {
        id: 'sk-2',
        label: 'Ghế C (Sát lối đi hành lang)',
        xPercent: 72,
        yPercent: 46,
        correctRole: 'host',
        explanation: 'Thượng tọa nhì: Ghế sát lối đi dễ duỗi chân và đứng dậy đi vệ sinh không phải xin phép ai.',
      },
      {
        id: 'sk-3',
        label: 'Ghế B (Ghế kẹp ở giữa 2 người)',
        xPercent: 50,
        yPercent: 46,
        correctRole: 'me_junior',
        explanation: 'HẠ TỌA SHINKANSEN: Ghế B ở chính giữa (chật nhất, dùng chung cả 2 tay vịn với 2 bên) luôn dành cho nhân viên cấp thấp nhất!',
      },
    ],
  },
];

export async function loadMoreSeatingScenarios(existingIds: string[]): Promise<SeatingScenario[]> {
  const unseen = EXTRA_SEATING_SCENARIOS.filter((s) => !existingIds.includes(s.id));
  if (unseen.length > 0) return unseen.slice(0, 3);
  return EXTRA_SEATING_SCENARIOS.slice(0, 3).map((s, i) => ({
    ...s,
    id: `seat-ext-${Date.now()}-${i}`,
    title: `${s.title} (Mở rộng)`,
  }));
}

export interface OjigiPracticeScenario {
  id: string;
  situationTitle: string;
  contextDetail: string;
  targetType: 'eshaku_15' | 'keirei_30' | 'saikeirei_45';
  spokenPhraseJp: string;
}

export const OJIGI_PRACTICE_SCENARIOS: OjigiPracticeScenario[] = [
  {
    id: 'oj-base-1',
    situationTitle: 'Lướt gặp Trưởng phòng ở hành lang công ty',
    contextDetail: 'Đang bước đi thì gặp sếp đi ngược chiều. Cần cúi Eshaku nhanh 15° kết hợp gật mắt.',
    targetType: 'eshaku_15',
    spokenPhraseJp: 'お疲れ様です。',
  },
  {
    id: 'oj-base-2',
    situationTitle: 'Bước vào phòng phỏng vấn Shinsotsu (Nói "Shitsurei shimasu")',
    contextDetail: 'Sau khi đóng cửa phòng họp, đứng trước ghế và thực hiện Keirei chuẩn 30° giữ 1.5 giây.',
    targetType: 'keirei_30',
    spokenPhraseJp: '失礼いたします。よろしくお願いいたします。',
  },
  {
    id: 'oj-base-3',
    situationTitle: 'Tạ lỗi giao nhầm lô hàng B2B với Giám đốc đối tác',
    contextDetail: 'Khủng hoảng nghiêm trọng! Bắt buộc thực hiện Saikeirei 45° lưng thẳng, giữ đáy góc 3 giây.',
    targetType: 'saikeirei_45',
    spokenPhraseJp: 'この度は多大なるご迷惑をおかけし、誠に申し訳ございません。',
  },
];

const EXTRA_OJIGI_SCENARIOS: OjigiPracticeScenario[] = [
  {
    id: 'oj-ex-1',
    situationTitle: 'Tiễn khách VIP vào thang máy cho đến khi cửa khép kín',
    contextDetail: 'Mọi nhân viên Nhật đứng giữ góc Keirei 30° suốt từ lúc bấm tầng đến khi cửa thang máy đóng 100% mới ngẩng đầu.',
    targetType: 'keirei_30',
    spokenPhraseJp: '本日は誠にありがとうございました。お気をつけてお帰りくださいませ。',
  },
  {
    id: 'oj-ex-2',
    situationTitle: 'Bước ngang qua bàn sếp để mang tài liệu vào phòng họp',
    contextDetail: 'Không cúi sâu 45° gây kỳ quặc; chỉ hạ Eshaku 15° nhẹ nhàng kèm câu xin phép.',
    targetType: 'eshaku_15',
    spokenPhraseJp: '前を失礼いたします。',
  },
  {
    id: 'oj-ex-3',
    situationTitle: 'Cảm tạ sâu sắc khi được Trao bằng khen / Ký hợp đồng triệu đô',
    contextDetail: 'Dùng Saikeirei 45° thể hiện lòng biết ơn chân thành nhất tới đối tác chiến lược.',
    targetType: 'saikeirei_45',
    spokenPhraseJp: '心より厚く御礼申し上げます。',
  },
];

export async function loadMoreOjigiScenarios(existingIds: string[]): Promise<OjigiPracticeScenario[]> {
  const unseen = EXTRA_OJIGI_SCENARIOS.filter((s) => !existingIds.includes(s.id));
  if (unseen.length > 0) return unseen.slice(0, 3);
  return EXTRA_OJIGI_SCENARIOS.map((s, i) => ({ ...s, id: `oj-ext-${Date.now()}-${i}` }));
}

// --- WEAPON 5 (+3 Industry CV Templates & +3 Interview Trap Questions) ---
export interface CvIndustryTemplate {
  id: string;
  label: string;
  fullName: string;
  birthYear: string;
  targetCompany: string;
  experienceVi: string;
  strengthsVi: string;
}

export const EXTRA_CV_INDUSTRY_TEMPLATES: CvIndustryTemplate[] = [
  {
    id: 'cv-it',
    label: 'Kỹ sư Cầu nối IT (BrSE)',
    fullName: 'TRAN QUOC TUAN',
    birthYear: '1997',
    targetCompany: 'Công ty Phát triển Phần mềm Tokyo (Vị trí BrSE)',
    experienceVi: '4 năm làm Fullstack TypeScript & điều phối offshore Việt-Nhật, giảm 30% bug nhờ quy trình code review.',
    strengthsVi: 'N2 JLPT, dịch tốt tài liệu đặc tả (Shiyousho), báo cáo Hourensou đúng giờ và chịu áp lực deadline.',
  },
  {
    id: 'cv-tokutei',
    label: 'Khách sạn / Omotenashi',
    fullName: 'LE THI HOA',
    birthYear: '2000',
    targetCompany: 'Ryokan / Khách sạn Cao cấp Kyoto (Vị trí Lễ tân Omotenashi)',
    experienceVi: '2 năm làm lễ tân khách sạn 4 sao, đón tiếp 150 khách/ngày và xử lý khéo léo các yêu cầu đổi phòng.',
    strengthsVi: 'Kính ngữ giao tiếp tự nhiên, nụ cười thân thiện, luôn quan sát trước nhu cầu của khách (Kikubari).',
  },
  {
    id: 'cv-seizo',
    label: 'Kỹ sư Cơ khí / Kaizen',
    fullName: 'PHAM DUC ANH',
    birthYear: '1996',
    targetCompany: 'Tập đoàn Sản xuất Linh kiện Ô tô Aichi (Vị trí Kỹ sư QC/Kaizen)',
    experienceVi: '5 năm quản lý dây chuyền CNC, triển khai chuẩn 5S và giảm 18% tỷ lệ hàng lỗi tại xưởng.',
    strengthsVi: 'Tư duy cải tiến Kaizen, ý thức an toàn lao động Hiyari-Hatto và gắn bó công ty lâu dài.',
  },
];

export async function loadMoreCvIndustryTemplates(existingIds: string[]): Promise<CvIndustryTemplate[]> {
  const unseen = EXTRA_CV_INDUSTRY_TEMPLATES.filter((t) => !existingIds.includes(t.id));
  if (unseen.length > 0) return unseen.slice(0, 3);
  return EXTRA_CV_INDUSTRY_TEMPLATES.map((t, i) => ({
    ...t,
    id: `cv-ext-${Date.now()}-${i}`,
    label: `${t.label} (Biến thể)`,
  }));
}

const EXTRA_INTERVIEW_TRAP_QUESTIONS: InterviewTrapQuestion[] = [
  {
    id: 'iq-4',
    hrQuestionJp: '日本に何年くらい住む予定ですか？将来は帰国しますか？',
    hrQuestionRomaji: 'Nihon ni nan’nen kurai sumu yotei desu ka? Shōrai wa kikoku shimasu ka?',
    hrQuestionVi: 'Bạn dự định sống ở Nhật mấy năm? Tương lai có về nước không?',
    psychologicalTrap:
      'BẪY ĐÀO TẠO RỒI BỎ ĐI: Doanh nghiệp Nhật rất sợ bỏ tiền đào tạo 1-2 năm xong ứng viên lại nói "Em làm 2 năm kiếm tiền rồi về nước".',
    winningStrategyVi:
      'Khẳng định định hướng phát triển sự nghiệp DÀI HẠN tại Nhật và đồng hành cùng công ty (5-10 năm+), lấy lý do muốn cống hiến sau khi trưởng thành.',
    sampleStarAnswerJp:
      '長く日本に滞在し、貴社でキャリアを築いていきたいと考えております。将来的には日本と母国を繋ぐ中核人材として貴社に貢献し続けたいです。',
    sampleStarAnswerVi:
      'Tôi dự định sinh sống lâu dài tại Nhật để xây dựng sự nghiệp tại Quý công ty, hướng tới trở thành nhân sự nòng cốt kết nối Nhật Bản và quê hương.',
  },
  {
    id: 'iq-5',
    hrQuestionJp: '急に急ぎの残業が入った日、プライベートの予定と重なったらどうしますか？',
    hrQuestionRomaji: 'Kyū ni isogi no zangyō ga haitta hi, puraibēto no yotei to kasanattara dō shimasu ka?',
    hrQuestionVi: 'Ngày bỗng nhiên có việc gấp phải tăng ca trùng đúng lịch hẹn cá nhân thì bạn làm sao?',
    psychologicalTrap:
      'BẪY ƯU TIÊN CÔNG VIỆC: Trả lời cứng nhắc "Luôn bỏ hẹn cá nhân" trông thiếu cân bằng/nói dối; còn trả lời "Em ưu tiên việc riêng" là mất điểm trách nhiệm ngay!',
    winningStrategyVi:
      'Cân bằng 2 vế chuẩn Nhật: Ưu tiên xử lý sự cố cấp bách của team trước, đồng thời chủ động thương lượng phân chia phần việc khẩn để vừa kịp tiến độ vừa văn minh.',
    sampleStarAnswerJp:
      'まずは業務の緊急度とチームへの影響を確認し、私にしか対応できない急務であれば予定を調整して責任を持ってやり遂げます。その上で日頃から計画的な業務管理を徹底します。',
    sampleStarAnswerVi:
      'Trước hết tôi sẽ xác nhận mức độ khẩn cấp và ảnh hưởng tới team; nếu là đầu việc gấp bắt buộc do mình phụ trách, tôi sẽ điều chỉnh lịch hẹn để hoàn thành trọn vẹn trách nhiệm.',
  },
  {
    id: 'iq-6',
    hrQuestionJp: '同業他社ではなく、なぜ当社を選んだのですか？',
    hrQuestionRomaji: 'Dōgyō tasha de wa naku, naze tōsha o eranda no desu ka?',
    hrQuestionVi: 'Cùng ngành có nhiều công ty lớn hơn, tại sao bạn lại chọn công ty chúng tôi?',
    psychologicalTrap:
      'BẪY RẢI CV HÀNG LOẠT: HR kiểm tra xem bạn có thực sự tìm hiểu văn hóa/sản phẩm riêng của họ hay chỉ nộp đơn bừa bãi.',
    winningStrategyVi:
      'Chỉ ra 1 điểm ĐỘC BẢN của công ty (công nghệ ngách, triết lý doanh nghiệp Rinen, hoặc thị trường mở rộng) rồi ghép khớp trực tiếp với thế mạnh cá nhân bạn.',
    sampleStarAnswerJp:
      '他社と比較した上で、貴社の「顧客第一の現場主義」と海外展開のスピード感に最も魅力を感じました。私の実務経験が最も早く価値に変わると確信したためです。',
    sampleStarAnswerVi:
      'Sau khi so sánh các doanh nghiệp cùng ngành, tôi bị thuyết phục nhất bởi triết lý "lấy hiện trường và khách hàng làm gốc" cùng tốc độ vươn ra quốc tế của Quý công ty.',
  },
];

export async function loadMoreInterviewTrapQuestions(existingIds: string[]): Promise<InterviewTrapQuestion[]> {
  const unseen = EXTRA_INTERVIEW_TRAP_QUESTIONS.filter((q) => !existingIds.includes(q.id));
  if (unseen.length > 0) return unseen.slice(0, 3);

  const prompt = `Tạo đúng 3 câu hỏi bẫy tâm lý phỏng vấn tuyển dụng khốc liệt kiểu Nhật (Asshuku Mensetsu) mới, khác [${existingIds.join(', ')}]. Trả về JSON array 3 InterviewTrapQuestion (id, hrQuestionJp, hrQuestionRomaji, hrQuestionVi, psychologicalTrap, winningStrategyVi, sampleStarAnswerJp, sampleStarAnswerVi).`;
  try {
    const raw = await callGemini(prompt, 'Chỉ trả về JSON array hợp lệ.');
    const arr = safeExtractJson<InterviewTrapQuestion[]>(raw, []);
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.slice(0, 3).map((q, i) => ({ ...q, id: `ai-iq-${Date.now()}-${i}` }));
    }
  } catch {
    // Fallback
  }
  return EXTRA_INTERVIEW_TRAP_QUESTIONS.map((q, i) => ({ ...q, id: `iq-ext-${Date.now()}-${i}` }));
}

