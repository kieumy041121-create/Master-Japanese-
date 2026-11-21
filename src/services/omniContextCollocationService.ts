import { JLPTLevel } from '../types';
import { callGemini, safeExtractJson } from './geminiService';
import { refineVietnameseMeaning } from '../utils/vietnameseMeaningSanitizer';

export type CollocationLayerType = 'keyword' | 'noun_phrase' | 'verb_phrase';

export interface CollocationArsenalItem {
  id: string;
  layer: CollocationLayerType;
  kanji: string;
  furigana: string;
  romaji: string;
  pitchCode: string; // e.g. "[0] Bình bản" or "[2] Trung cao"
  pitchPattern: ('H' | 'L')[]; // 1 value per mora
  meaningVn: string;
  exampleJp: string;
  exampleFurigana: string;
  exampleVn: string;
  nativeNuance: string;
  subAngleLabel?: string;
}

export interface OmniContextXRay {
  contextTitle: string;
  japaneseSceneTag: string;
  complexityTier: string;
  physicalActions: string[];
  psychologicalStates: string[];
  storyThreadSummary: string;
}

export interface OmniContextProjectionResult {
  contextQuery: string;
  xray: OmniContextXRay;
  keywords: CollocationArsenalItem[];
  nounPhrases: CollocationArsenalItem[];
  verbPhrases: CollocationArsenalItem[];
  expansionDepth: number;
  layerDepths: {
    keyword: number;
    noun_phrase: number;
    verb_phrase: number;
  };
  unlockedAngles: string[];
  source: 'gemini' | 'curated';
}

const SMALL_YOOON = new Set(['ゃ', 'ゅ', 'ょ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ャ', 'ュ', 'ョ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ']);

/**
 * Splits a kana string into proper Japanese phonetic moras (拍 / haku).
 * Small ゃ/ゅ/ょ attach to the preceding consonant kana; っ, ん, ー count as independent moras.
 */
export function splitJapaneseMoras(kana: string): string[] {
  const clean = (kana || '')
    .replace(/[・\s　、。！？「」【】()（）\[\]〜~]/g, '')
    .trim();
  if (!clean) return [];

  const moras: string[] = [];
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (SMALL_YOOON.has(ch) && moras.length > 0) {
      moras[moras.length - 1] += ch;
    } else {
      moras.push(ch);
    }
  }
  return moras;
}

/**
 * Aligns an incoming pitchPattern array or string ("L-H-H-L") with the actual mora count.
 */
export function normalizePitchPattern(
  furigana: string,
  rawPattern?: unknown,
  pitchCode?: string
): ('H' | 'L')[] {
  const moras = splitJapaneseMoras(furigana);
  const targetLen = Math.max(1, moras.length);

  let parsed: ('H' | 'L')[] = [];
  if (Array.isArray(rawPattern)) {
    parsed = rawPattern
      .map((v) => String(v).trim().toUpperCase())
      .filter((v): v is 'H' | 'L' => v === 'H' || v === 'L');
  } else if (typeof rawPattern === 'string') {
    parsed = rawPattern
      .toUpperCase()
      .replace(/[^HL]/g, '')
      .split('') as ('H' | 'L')[];
  }

  if (parsed.length === targetLen) {
    return parsed;
  }

  if (parsed.length > 0) {
    // Stretch or trim gracefully while keeping Japanese initial L-H / H-L constraint
    const res: ('H' | 'L')[] = [];
    for (let i = 0; i < targetLen; i++) {
      res.push(parsed[Math.min(i, parsed.length - 1)]);
    }
    return res;
  }

  // Fallback derived from pitchCode number [n]
  const numMatch = (pitchCode || '').match(/\[(\d+)\]/);
  const accentNum = numMatch ? Number(numMatch[1]) : 0;
  const out: ('H' | 'L')[] = [];

  if (accentNum === 1) {
    for (let i = 0; i < targetLen; i++) out.push(i === 0 ? 'H' : 'L');
  } else if (accentNum > 1 && accentNum < targetLen) {
    for (let i = 0; i < targetLen; i++) {
      if (i === 0) out.push('L');
      else if (i < accentNum) out.push('H');
      else out.push('L');
    }
  } else {
    // Heiban [0] or Odaka [n]
    for (let i = 0; i < targetLen; i++) {
      out.push(i === 0 && targetLen > 1 ? 'L' : 'H');
    }
  }
  return out;
}

// ============================================================================
// CURATED STATE-OF-THE-ART CONTEXT ARCHIVES (INITIAL + MULTI-DEPTH +3 ANGLES)
// ============================================================================

interface CuratedContextBundle {
  matchTokens: string[];
  xray: OmniContextXRay;
  initialAngle: string;
  keywords: Omit<CollocationArsenalItem, 'id' | 'layer'>[];
  nounPhrases: Omit<CollocationArsenalItem, 'id' | 'layer'>[];
  verbPhrases: Omit<CollocationArsenalItem, 'id' | 'layer'>[];
  deepDiveBatches: Array<{
    angleLabel: string;
    keywords: Omit<CollocationArsenalItem, 'id' | 'layer'>[];
    nounPhrases: Omit<CollocationArsenalItem, 'id' | 'layer'>[];
    verbPhrases: Omit<CollocationArsenalItem, 'id' | 'layer'>[];
  }>;
}

const CURATED_CONTEXT_BUNDLES: CuratedContextBundle[] = [
  {
    matchTokens: ['đi chợ', 'siêu thị', 'mua đồ', 'mua sắm', 'supermarket', 'スーパー', '買い物'],
    xray: {
      contextTitle: 'Đi chợ & Mua sắm tại Siêu thị Nhật Bản',
      japaneseSceneTag: 'スーパーでの買い物・会計',
      complexityTier: 'Đời sống thường nhật · Phản xạ thực chiến',
      physicalActions: [
        'Lấy giỏ/xe đẩy và dạo qua các quầy hàng theo lộ trình lạnh-khô',
        'Kiểm tra hạn sử dụng, độ tươi và nhãn giảm giá theo giờ',
        'Xếp hàng thanh toán, quẹt thẻ tích điểm và tự đóng túi tại quầy',
      ],
      psychologicalStates: [
        'Cân nhắc giá trị/độ tươi (tiết kiệm tinh tế, không phô trương)',
        'Ý thức trật tự & phép lịch sự tại quầy thu ngân (tránh làm chậm hàng sau)',
      ],
      storyThreadSummary:
        'Bước vào siêu thị lấy giỏ, ghé quầy rau chọn đồ tươi trong ngày, săn nhãn giảm giá rồi xếp hàng quét thẻ tích điểm.',
    },
    initialAngle: 'Ngóc ngách #1 · Chọn đồ tươi & Dạo quầy hàng',
    keywords: [
      {
        kanji: '買い物かご',
        furigana: 'かいものかご',
        romaji: 'kaimonokago',
        pitchCode: '[5] Trung cao (Nakadaka)',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L'],
        meaningVn: 'Giỏ xách tay đi siêu thị',
        exampleJp: '入り口で買い物かごを取る。',
        exampleFurigana: 'いりぐちで かいものかごを とる。',
        exampleVn: 'Lấy một chiếc giỏ mua hàng ngay ở cửa vào.',
        nativeNuance: 'Dùng ở siêu thị, konbini; phân biệt với カート (xe đẩy).',
      },
      {
        kanji: '野菜売り場',
        furigana: 'やさいうりば',
        romaji: 'yasai uriba',
        pitchCode: '[5] Trung cao (Nakadaka)',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L'],
        meaningVn: 'Quầy / khu vực bán rau củ',
        exampleJp: 'まず野菜売り場から回る。',
        exampleFurigana: 'まず やさいうりばから まわる。',
        exampleVn: 'Trước hết đi dạo một vòng từ quầy rau củ.',
        nativeNuance: 'Ghép [Mặt hàng + 売り場 (うりば)]: 鮮魚売り場 (cá), 精肉売り場 (thịt).',
      },
      {
        kanji: '割引シール',
        furigana: 'わりびきシール',
        romaji: 'waribiki shīru',
        pitchCode: '[5] Trung cao (Nakadaka)',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'L'],
        meaningVn: 'Nhãn dán giảm giá (cuối ngày)',
        exampleJp: 'お惣菜に割引シールが貼られる。',
        exampleFurigana: 'おそうざいに わりびきシールが はられる。',
        exampleVn: 'Đồ ăn chế biến sẵn bắt đầu được dán tem giảm giá.',
        nativeNuance: 'Văn hóa siêu thị Nhật: thường dán giảm giá 20%–50% sau 19h.',
      },
      {
        kanji: '消費期限',
        furigana: 'しょうひきげん',
        romaji: 'shōhi kigen',
        pitchCode: '[4] Trung cao (Nakadaka)',
        pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'L'],
        meaningVn: 'Hạn sử dụng an toàn (đồ tươi)',
        exampleJp: '牛乳の消費期限を確認する。',
        exampleFurigana: 'ぎゅうにゅうの しょうひきげんを かくにんする。',
        exampleVn: 'Kiểm tra kỹ hạn dùng của hộp sữa tươi.',
        nativeNuance: 'Phân biệt với 賞味期限 (hạn ngon nhất với đồ khô, bánh kẹo).',
      },
    ],
    nounPhrases: [
      {
        kanji: '朝採れの新鮮な野菜',
        furigana: 'あさどれの しんせんな やさい',
        romaji: 'asadore no shinsen na yasai',
        pitchCode: '[0]+[0]+[0] Nhịp liên kết',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
        meaningVn: 'Rau củ tươi mới hái từ sáng sớm',
        exampleJp: '朝採れの新鮮な野菜が並んでいる。',
        exampleFurigana: 'あさどれの しんせんな やさいが ならんでいる。',
        exampleVn: 'Rau củ tươi rói mới thu hoạch ban sáng đang bày đầy kệ.',
        nativeNuance: 'Cụm từ vàng trên bảng quảng cáo nông sản địa phương tại Nhật.',
      },
      {
        kanji: '本日限りの特売品',
        furigana: 'ほんじつかぎりの とくばいひん',
        romaji: 'honjitsu kagiri no tokubaihin',
        pitchCode: '[1]+[3]+[0] Cụm báo giá',
        pitchPattern: ['H', 'L', 'L', 'L', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'H'],
        meaningVn: 'Mặt hàng đại hạ giá duy nhất hôm nay',
        exampleJp: '本日限りの特売品を狙って来た。',
        exampleFurigana: 'ほんじつかぎりの とくばいひんを ねらって きた。',
        exampleVn: 'Tôi ghé siêu thị cốt để săn món hàng giảm giá chỉ trong hôm nay.',
        nativeNuance: 'Dùng từ 特売品 hoặc 目玉商品 (mặt hàng câu khách giá hời).',
      },
      {
        kanji: 'マイバッグ持参の客',
        furigana: 'マイバッグ じさんの きゃく',
        romaji: 'maibaggu jisan no kyaku',
        pitchCode: '[3]+[0]+[0]',
        pitchPattern: ['L', 'H', 'H', 'L', 'L', 'L', 'H', 'H', 'H', 'H', 'H'],
        meaningVn: 'Khách hàng tự mang theo túi cá nhân',
        exampleJp: 'マイバッグ持参でポイントがつく。',
        exampleFurigana: 'マイバッグ じさんで ポイントが つく。',
        exampleVn: 'Tự mang túi đi chợ sẽ được cộng thêm điểm thưởng.',
        nativeNuance: 'Tại Nhật túi nilon (レジ袋) tính phí nên ai cũng mang マイバッグ/エコバッグ.',
      },
    ],
    verbPhrases: [
      {
        kanji: '旬の食材を見極める',
        furigana: 'しゅんの しょくざいを みきわめる',
        romaji: 'shun no shokuzai o mikiwameru',
        pitchCode: '[1]+[0]+[4]',
        pitchPattern: ['H', 'L', 'L', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'L', 'L'],
        meaningVn: 'Nhận định, lựa chọn kỹ nguyên liệu đúng mùa',
        exampleJp: '色つやを見て旬の食材を見極める。',
        exampleFurigana: 'いろつやを みて しゅんの しょくざいを みきわめる。',
        exampleVn: 'Nhìn độ bóng màu sắc để chọn nguyên liệu ngon đúng mùa.',
        nativeNuance: 'Động từ 見極める tinh tế hơn nhiều so với 選ぶ thông thường.',
      },
      {
        kanji: 'レジの列に並ぶ',
        furigana: 'レジの れつに ならぶ',
        romaji: 'reji no retsu ni narabu',
        pitchCode: '[1]+[1]+[0]',
        pitchPattern: ['H', 'L', 'L', 'H', 'L', 'L', 'L', 'H', 'H'],
        meaningVn: 'Xếp hàng chờ thanh toán ở quầy thu ngân',
        exampleJp: '混む前にレジの列に並ぼう。',
        exampleFurigana: 'こむ まえに レジの れつに ならぼう。',
        exampleVn: 'Mình ra xếp hàng ở quầy tính tiền trước khi đông nhé.',
        nativeNuance: 'Không dùng *支払いに並ぶ, người Nhật luôn nói レジに並ぶ / レジの列に並ぶ.',
      },
      {
        kanji: 'ポイントカードを提示する',
        furigana: 'ポイントカードを ていじする',
        romaji: 'pointo kādo o teiji suru',
        pitchCode: '[4]+[0]',
        pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'L', 'L', 'L', 'H', 'H', 'H'],
        meaningVn: 'Xuất trình thẻ tích điểm khi thanh toán',
        exampleJp: 'お会計の前にポイントカードを提示する。',
        exampleFurigana: 'おかいけいの まえに ポイントカードを ていじする。',
        exampleVn: 'Đưa thẻ tích điểm ra trước khi nhân viên chốt hóa đơn.',
        nativeNuance: 'Khẩu ngữ thân mật có thể nói ポイントカードを出す.',
      },
    ],
    deepDiveBatches: [
      {
        angleLabel: 'Ngóc ngách #2 · Thanh toán lỗi thẻ & Hết hạn khuyến mãi',
        keywords: [
          {
            kanji: '残高不足',
            furigana: 'ざんだかぶそく',
            romaji: 'zandaka busoku',
            pitchCode: '[5] Trung cao (Nakadaka)',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L'],
            meaningVn: 'Không đủ số dư trong thẻ / ví điện tử',
            exampleJp: 'ICカードが残高不足でエラーになった。',
            exampleFurigana: 'アイシーカードが ざんだかぶそくで エラーに なった。',
            exampleVn: 'Thẻ trả trước báo lỗi vì không đủ số dư.',
            nativeNuance: 'Thuật ngữ chuẩn hiện trên màn hình máy POS khi quẹt thẻ thất bại.',
          },
          {
            kanji: '暗証番号',
            furigana: 'あんしょうばんごう',
            romaji: 'anshō bangō',
            pitchCode: '[5] Trung cao (Nakadaka)',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'L'],
            meaningVn: 'Mã PIN thẻ ngân hàng',
            exampleJp: '暗証番号を3回間違えてしまった。',
            exampleFurigana: 'あんしょうばんごうを 3かい まちがえて しまった。',
            exampleVn: 'Lỡ nhập sai mã PIN tới 3 lần liên tiếp.',
            nativeNuance: 'Phân biệt với パスワード (mật khẩu tài khoản online).',
          },
          {
            kanji: 'レシート',
            furigana: 'レシート',
            romaji: 'reshīto',
            pitchCode: '[2] Trung cao (Nakadaka)',
            pitchPattern: ['L', 'H', 'L', 'L'],
            meaningVn: 'Hóa đơn bán lẻ',
            exampleJp: '念のためレシートを受け取っておく。',
            exampleFurigana: 'ねんのため レシートを うけとって おく。',
            exampleVn: 'Cứ cầm lấy hóa đơn phòng trường hợp cần đối chiếu.',
            nativeNuance: 'Khác với 領収書 (hóa đơn đỏ dùng để thanh toán chi phí công ty).',
          },
        ],
        nounPhrases: [
          {
            kanji: '磁気不良のクレジットカード',
            furigana: 'じきふりょうの クレジットカード',
            romaji: 'jiki furyō no kurejitto kādo',
            pitchCode: '[2]+[4]',
            pitchPattern: ['L', 'H', 'L', 'L', 'L', 'L', 'L', 'H', 'H', 'H', 'L', 'L', 'L', 'L'],
            meaningVn: 'Thẻ tín dụng bị hỏng dải từ / chip đọc',
            exampleJp: '磁気不良のカードは決済できない。',
            exampleFurigana: 'じきふりょうの カードは けっさい できない。',
            exampleVn: 'Thẻ bị lỗi từ thì máy không thanh toán được.',
            nativeNuance: 'Cách nói lịch sự khi nhân viên giải thích lý do máy không nhận thẻ.',
          },
          {
            kanji: '半額になる時間帯',
            furigana: 'はんがくに なる じかんたい',
            romaji: 'hangaku ni naru jikantai',
            pitchCode: '[0]+[1]+[0]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'H'],
            meaningVn: 'Khung giờ vàng giảm hẳn nửa giá',
            exampleJp: '半額になる時間帯はお客で溢れる。',
            exampleFurigana: 'はんがくに なる じかんたいは おきゃくで あふれる。',
            exampleVn: 'Cứ tới khung giờ giảm 50% là khách đông nghịt cả quầy.',
            nativeNuance: 'Cụm miêu tả cảnh tượng đặc trưng ở siêu thị Nhật buổi tối.',
          },
          {
            kanji: '打ち間違いのあるレシート',
            furigana: 'うちまちがいの ある レシート',
            romaji: 'uchimachigai no aru reshīto',
            pitchCode: '[0]+[1]+[2]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'L', 'L'],
            meaningVn: 'Hóa đơn bị nhân viên bấm nhầm giá',
            exampleJp: '店を出る前に打ち間違いを確認する。',
            exampleFurigana: 'みせを でる まえに うちまちがいを かくにんする。',
            exampleVn: 'Kiểm tra lại xem có bị tính nhầm tiền trước khi rời tiệm.',
            nativeNuance: '打ち間違い (ấm nhầm số/quét đúp 2 lần) là lỗi thu ngân hay gặp.',
          },
        ],
        verbPhrases: [
          {
            kanji: '支払方法を切り替える',
            furigana: 'しはらいほうほうを きりかえる',
            romaji: 'shiharai hōhō o kirikaeru',
            pitchCode: '[5]+[3]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'L', 'L', 'H', 'H', 'L', 'L'],
            meaningVn: 'Đổi sang phương thức thanh toán khác (khi thẻ lỗi)',
            exampleJp: 'カードが通らず現金払いに切り替えた。',
            exampleFurigana: 'カードが とおらず げんきんばらいに きりかえた。',
            exampleVn: 'Thẻ quẹt không qua nên tôi chuyển sang trả tiền mặt.',
            nativeNuance: 'Cụm カードが通らない ("thẻ không qua") cực kỳ tự nhiên trong giao tiếp.',
          },
          {
            kanji: '商品の返品を申し出る',
            furigana: 'しょうひんの へんぴんを もうしでる',
            romaji: 'shōhin no henpin o mōshideru',
            pitchCode: '[1]+[0]+[4]',
            pitchPattern: ['H', 'L', 'L', 'L', 'L', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'L', 'L'],
            meaningVn: 'Đề nghị trả lại hàng (khi mua nhầm/hỏng)',
            exampleJp: 'レシートを持参して返品を申し出た。',
            exampleFurigana: 'レシートを じさんして へんぴんを もうしでた。',
            exampleVn: 'Tôi mang theo hóa đơn quay lại xin hoàn trả món hàng.',
            nativeNuance: '申し出る thể hiện thái độ lịch sự, đúng quy trình với quầy CSKH.',
          },
          {
            kanji: '値札の付け間違いに気づく',
            furigana: 'ねふだの つけまちがいに きづく',
            romaji: 'nefuda no tsukemachigai ni kizuku',
            pitchCode: '[0]+[5]+[2]',
            pitchPattern: ['L', 'H', 'H', 'L', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'L'],
            meaningVn: 'Phát hiện tem giá bị dán nhầm',
            exampleJp: 'レジ前で値札の付け間違いに気づいた。',
            exampleFurigana: 'レジまえで ねふだの つけまちがいに きづいた。',
            exampleVn: 'Ngay trước quầy thu ngân mới phát hiện món này dán nhầm giá.',
            nativeNuance: 'Tình huống thực tế khi giá niêm yết trên kệ khác giá tính ở quầy.',
          },
        ],
      },
      {
        angleLabel: 'Ngóc ngách #3 · Làm rơi đồ, xin đá giữ lạnh & giao tiếp với nhân viên',
        keywords: [
          {
            kanji: '保冷剤',
            furigana: 'ほれいざい',
            romaji: 'horeizai',
            pitchCode: '[0] Bình bản (Heiban)',
            pitchPattern: ['L', 'H', 'H', 'H', 'H'],
            meaningVn: 'Túi gel đá giữ lạnh',
            exampleJp: '生肉用に保冷剤を二つもらう。',
            exampleFurigana: 'なまにくように ほれいざいを ふたつ もらう。',
            exampleVn: 'Xin thêm hai túi giữ lạnh cho phần thịt tươi.',
            nativeNuance: 'Đồ siêu thị Nhật thường đặt sẵn đá khô/gel đá ở bàn đóng gói.',
          },
          {
            kanji: '袋詰め',
            furigana: 'ふくろづめ',
            romaji: 'fukurozume',
            pitchCode: '[0] Bình bản (Heiban)',
            pitchPattern: ['L', 'H', 'H', 'H', 'H'],
            meaningVn: 'Việc tự xếp đồ vào túi (sau thu ngân)',
            exampleJp: 'サッカー台で丁寧に袋詰めをする。',
            exampleFurigana: 'サッカーだいで ていねいに ふくろづめを する。',
            exampleVn: 'Xếp đồ gọn gàng vào túi ở bàn đóng gói chuyên dụng.',
            nativeNuance: 'Người Nhật gọi bàn tự đóng túi sau quầy thu ngân là サッカー台.',
          },
          {
            kanji: '品出し',
            furigana: 'しなだし',
            romaji: 'shinadashi',
            pitchCode: '[0] Bình bản (Heiban)',
            pitchPattern: ['L', 'H', 'H', 'H'],
            meaningVn: 'Việc châm hàng mới lên kệ',
            exampleJp: '品出し中の店員さんに在庫を聞く。',
            exampleFurigana: 'しなだしちゅうの てんいんさんに ざいこを きく。',
            exampleVn: 'Hỏi nhân viên đang châm hàng xem trong kho còn không.',
            nativeNuance: 'Từ nội bộ ngành bán lẻ nhưng cực phổ biến trong đời sống Nhật.',
          },
        ],
        nounPhrases: [
          {
            kanji: 'うっかり落とした卵パック',
            furigana: 'うっかり おとした たまごパック',
            romaji: 'ukkari otoshita tamago pakku',
            pitchCode: '[3]+[2]+[2]',
            pitchPattern: ['L', 'H', 'H', 'L', 'L', 'H', 'L', 'L', 'L', 'H', 'L', 'L'],
            meaningVn: 'Vỉ trứng lỡ tay làm rơi vỡ',
            exampleJp: '落とした卵パックを店員に申し出る。',
            exampleFurigana: 'おとした たまごパックを てんいんに もうしでる。',
            exampleVn: 'Chủ động báo với nhân viên về vỉ trứng mình lỡ làm rơi.',
            nativeNuance: 'Ở Nhật, lỡ làm rơi đồ ở siêu thị nên báo nhân viên ngay để xử lý vệ sinh.',
          },
          {
            kanji: '売り切れ間近の人気商品',
            furigana: 'うりきれまぢかの にんきしょうひん',
            romaji: 'urikire majika no ninki shōhin',
            pitchCode: '[0]+[0]+[4]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'H', 'L', 'L'],
            meaningVn: 'Mặt hàng hot sắp bán hết sạch',
            exampleJp: '売り切れ間近の限定パンを手に入れた。',
            exampleFurigana: 'うりきれまぢかの げんていパンを てに いれた。',
            exampleVn: 'Vừa kịp tóm được ổ bánh giới hạn sắp cháy hàng.',
            nativeNuance: 'Cụm danh từ cô đọng miêu tả độ khan hiếm trên kệ.',
          },
          {
            kanji: '奥から出したての乳製品',
            furigana: 'おくから だしたての にゅうせいひん',
            romaji: 'oku kara dashitate no nyūseihin',
            pitchCode: '[1]+[0]+[3]',
            pitchPattern: ['H', 'L', 'L', 'L', 'L', 'H', 'H', 'H', 'L', 'H', 'H', 'L', 'L'],
            meaningVn: 'Chế phẩm sữa lấy từ hàng phía sâu bên trong',
            exampleJp: '奥から取るのは少し控えたいところだ。',
            exampleFurigana: 'おくから とるのは すこし ひかえたい ところだ。',
            exampleVn: 'Thói quen móc đồ tận phía trong kệ là điều nên tiết chế.',
            nativeNuance: 'Gần đây siêu thị Nhật kêu gọi 「てまえどり」 (lấy hộp ngoài cùng tránh lãng phí).',
          },
        ],
        verbPhrases: [
          {
            kanji: '重い物を底に詰める',
            furigana: 'おもい ものを そこに つめる',
            romaji: 'omoi mono o soko ni tsumeru',
            pitchCode: '[0]+[2]+[2]',
            pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'L', 'L', 'H', 'L'],
            meaningVn: 'Xếp đồ nặng xuống dưới đáy túi (tránh dập đồ mềm)',
            exampleJp: '崩れないよう重い物を底に詰める。',
            exampleFurigana: 'くずれないよう おもい ものを そこに つめる。',
            exampleVn: 'Xếp đồ nặng xuống đáy túi để không đè nát đồ phía trên.',
            nativeNuance: 'Động từ 詰める là từ chuẩn xác nhất cho việc đóng gói hàng vào túi/hộp.',
          },
          {
            kanji: 'バックヤードの在庫を調べてもらう',
            furigana: 'バックヤードの ざいこを しらべて もらう',
            romaji: 'bakkuyādo no zaiko o shirabete morau',
            pitchCode: '[4]+[0]+[2]',
            pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'L', 'H', 'H', 'L', 'H', 'L', 'L'],
            meaningVn: 'Nhờ nhân viên vào kho kiểm tra hàng còn không',
            exampleJp: '棚が空だったので在庫を調べてもらった。',
            exampleFurigana: 'たなが からだったので ざいこを しらべて もらった。',
            exampleVn: 'Thấy kệ trống trơn nên tôi nhờ nhân viên kiểm kho giúp.',
            nativeNuance: 'バックヤード (backyard) là cách người Nhật gọi kho sau siêu thị.',
          },
          {
            kanji: 'うっかり手を滑らせる',
            furigana: 'うっかり てを すべらせる',
            romaji: 'ukkari te o suberaseru',
            pitchCode: '[3]+[1]+[4]',
            pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'H', 'L'],
            meaningVn: 'Lỡ tuột tay đánh rơi món đồ',
            exampleJp: 'ジャムの瓶を手を滑らせて割ってしまった。',
            exampleFurigana: 'ジャムの びんを てを すべらせて わって しまった。',
            exampleVn: 'Lỡ trượt tay làm vỡ mất lọ mứt thủy tinh.',
            nativeNuance: '手を滑らせる miêu tả cực đắt khoảnh khắc tuột tay tự nhiên thay vì dịch "tay trượt".',
          },
        ],
      },
    ],
  },
  {
    matchTokens: ['đổ rác', 'phân loại rác', 'vứt rác', 'rác', 'ゴミ', 'ごみ'],
    xray: {
      contextTitle: 'Phân loại & Đổ rác đúng quy tắc tại Nhật Bản',
      japaneseSceneTag: 'ゴミの分別とゴミ出し',
      complexityTier: 'Đời sống thường nhật · Kỷ luật cộng đồng',
      physicalActions: [
        'Rửa sạch chai nhựa/hộp sữa và phân loại theo lịch ngày thu gom',
        'Buộc chặt miệng túi rác quy định trước giờ quy định buổi sáng',
        'Mang ra điểm tập kết rác chung và đậy kín lưới chống quạ',
      ],
      psychologicalStates: [
        'Cẩn trọng không để sai ngày/sai loại (tránh bị dán nhãn từ chối thu gom)',
        'Ý thức giữ thể diện & tránh gây phiền hà hàng xóm (Meiwaku)',
      ],
      storyThreadSummary:
        'Rửa sơ chai nhựa, buộc chặt túi rác đúng loại theo lịch khu phố rồi đem ra điểm tập kết trước 8 giờ sáng.',
    },
    initialAngle: 'Ngóc ngách #1 · Phân loại & Đổ rác đúng giờ',
    keywords: [
      {
        kanji: '燃えるゴミ',
        furigana: 'もえるゴミ',
        romaji: 'moeru gomi',
        pitchCode: '[0]+[2] (可燃ゴミ)',
        pitchPattern: ['L', 'H', 'H', 'H', 'L'],
        meaningVn: 'Rác cháy được (rác hữu cơ, giấy)',
        exampleJp: '火曜日は燃えるゴミの日だ。',
        exampleFurigana: 'かようびは もえるゴミの ひだ。',
        exampleVn: 'Thứ Ba là ngày thu gom rác cháy được.',
        nativeNuance: 'Trong văn bản hành chính của quận/thành phố ghi là 可燃ごみ (かねんごみ).',
      },
      {
        kanji: '集積所',
        furigana: 'しゅうせきじょ',
        romaji: 'shūsekijo',
        pitchCode: '[0] Bình bản (Heiban)',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H'],
        meaningVn: 'Điểm tập kết rác chung của khu dân cư',
        exampleJp: '朝8時までに集積所へ出す。',
        exampleFurigana: 'あさ はちじまでに しゅうせきじょへ だす。',
        exampleVn: 'Mang rác ra điểm tập kết trước 8 giờ sáng.',
        nativeNuance: 'Thường đi với động từ 出す (đem ra đặt), không dùng 捨てる khi đặt ở điểm gom.',
      },
      {
        kanji: '資源ゴミ',
        furigana: 'しげんゴミ',
        romaji: 'shigen gomi',
        pitchCode: '[2]+[2]',
        pitchPattern: ['L', 'H', 'L', 'H', 'L'],
        meaningVn: 'Rác tài nguyên tái chế (lon, chai, báo)',
        exampleJp: '空き缶とペットボトルは資源ゴミだ。',
        exampleFurigana: 'あきかんと ペットボトルは しげんゴミだ。',
        exampleVn: 'Lon rỗng và chai nhựa PET thuộc nhóm rác tái chế.',
        nativeNuance: 'Nhật phân tách rất kỹ giữa rác bỏ đi và tài nguyên tái chế.',
      },
    ],
    nounPhrases: [
      {
        kanji: '自治体指定のゴミ袋',
        furigana: 'じちたい していの ゴミぶくろ',
        romaji: 'jichitai shitei no gomibukuro',
        pitchCode: '[0]+[0]+[3]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'L', 'L'],
        meaningVn: 'Túi đựng rác theo quy chuẩn của địa phương',
        exampleJp: '自治体指定のゴミ袋しか回収されない。',
        exampleFurigana: 'じちたい していの ゴミぶくろしか かいしゅうされない。',
        exampleVn: 'Chỉ những túi rác đúng chuẩn của địa phương mới được xe thu gom.',
        nativeNuance: 'Nhiều thành phố ở Nhật buộc mua túi in tên thành phố bán tại siêu thị.',
      },
      {
        kanji: 'カラスよけのネット',
        furigana: 'カラスよけの ネット',
        romaji: 'karasu yoke no netto',
        pitchCode: '[5]+[1]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'H', 'L', 'L'],
        meaningVn: 'Tấm lưới phủ chống quạ mổ rách túi rác',
        exampleJp: 'カラスよけのネットをしっかり被せる。',
        exampleFurigana: 'カラスよけの ネットを しっかり かぶせる。',
        exampleVn: 'Phủ kỹ tấm lưới chống quạ lên đống túi rác.',
        nativeNuance: 'Chi tiết văn hóa rất Nhật vì quạ đô thị ở Tokyo rất tinh ranh.',
      },
      {
        kanji: '回収時間外の放置ゴミ',
        furigana: 'かいしゅうじかんがいの ほうちゴミ',
        romaji: 'kaishū jikangai no hōchi gomi',
        pitchCode: '[5]+[1]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'L', 'L'],
        meaningVn: 'Rác vứt trễ ngoài khung giờ thu gom',
        exampleJp: '時間外のゴミは迷惑になる。',
        exampleFurigana: 'じかんがいの ゴミは めいわくに なる。',
        exampleVn: 'Đem rác ra ngoài giờ thu gom sẽ gây phiền toái cho cả khu.',
        nativeNuance: 'Tuyệt đối tránh vứt rác đêm hôm trước nếu quy định chỉ cho phép sáng sớm.',
      },
    ],
    verbPhrases: [
      {
        kanji: 'ラベルとキャップを外す',
        furigana: 'ラベルと キャップを はずす',
        romaji: 'raberu to kyappu o hazusu',
        pitchCode: '[0]+[1]+[0]',
        pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'L', 'L', 'H', 'H'],
        meaningVn: 'Bóc nhãn mác và tháo rời nắp chai nhựa',
        exampleJp: '捨てる前にラベルとキャップを外す。',
        exampleFurigana: 'すてる まえに ラベルと キャップを はずす。',
        exampleVn: 'Trước khi bỏ đi phải bóc tem và vặn riêng nắp chai.',
        nativeNuance: 'Quy trình 3 bước chuẩn của chai PET tại Nhật: 1. Tháo nắp, 2. Bóc tem, 3. Tráng sạch.',
      },
      {
        kanji: 'ゴミ袋の口をきつく縛る',
        furigana: 'ゴミぶくろの くちを きつく しばる',
        romaji: 'gomibukuro no kuchi o kitsuku shibaru',
        pitchCode: '[3]+[0]+[2]',
        pitchPattern: ['L', 'H', 'H', 'L', 'L', 'L', 'H', 'L', 'H', 'L', 'L', 'H', 'L'],
        meaningVn: 'Buộc thật chặt miệng túi rác (tránh bay mùi)',
        exampleJp: '生ゴミが漏れないよう口を縛る。',
        exampleFurigana: 'なまゴミが もれないよう くちを しばる。',
        exampleVn: 'Buộc chặt miệng túi kẻo nước rác thực phẩm rỉ ra ngoài.',
        nativeNuance: 'Dùng động từ 縛る (しぶ/しばる) hoặc 結ぶ (むすぶ).',
      },
      {
        kanji: '収集日を守ってゴミを出す',
        furigana: 'しゅうしゅうびを まもって ゴミを だす',
        romaji: 'shūshūbi o mamotte gomi o dasu',
        pitchCode: '[3]+[2]+[1]',
        pitchPattern: ['L', 'H', 'H', 'L', 'L', 'L', 'H', 'L', 'L', 'H', 'L', 'H', 'L'],
        meaningVn: 'Đổ rác đúng lịch ngày thu gom quy định',
        exampleJp: 'ルール通り収集日を守って出す。',
        exampleFurigana: 'ルールどおり しゅうしゅうびを まもって だす。',
        exampleVn: 'Đem rác ra đúng ngày thu gom theo đúng nội quy.',
        nativeNuance: 'Cụm từ cố định là ゴミを出す (đổ rác theo lịch), khác với ゴミ箱に捨てる (vứt vào thùng).',
      },
    ],
    deepDiveBatches: [
      {
        angleLabel: 'Ngóc ngách #2 · Rác cồng kềnh, lỡ giờ & bị dán giấy phạt',
        keywords: [
          {
            kanji: '粗大ゴミ',
            furigana: 'そだいゴミ',
            romaji: 'sodai gomi',
            pitchCode: '[0] Bình bản (Heiban)',
            pitchPattern: ['L', 'H', 'H', 'H', 'H'],
            meaningVn: 'Rác kích thước lớn (bàn ghế, nệm, xe đạp)',
            exampleJp: '古い机は粗大ゴミとして申し込む。',
            exampleFurigana: 'ふるい つくえは そだいゴミとして もうしこむ。',
            exampleVn: 'Bàn học cũ phải đăng ký xử lý theo diện rác cồng kềnh.',
            nativeNuance: 'Phải gọi điện/đăng ký online với trung tâm 粗大ゴミ受付センター trước.',
          },
          {
            kanji: '処理券',
            furigana: 'しょりけん',
            romaji: 'shoriken',
            pitchCode: '[2] Trung cao (Nakadaka)',
            pitchPattern: ['L', 'H', 'L', 'L'],
            meaningVn: 'Tem phí xử lý rác cồng kềnh (mua ở konbini)',
            exampleJp: 'コンビニで粗大ゴミ処理券を買う。',
            exampleFurigana: 'コンビニで そだいゴミ しょりけんを かう。',
            exampleVn: 'Ra cửa hàng tiện lợi mua tem lệ phí dán lên rác cỡ lớn.',
            nativeNuance: 'Dán 処理券 có ghi tên/mã đăng ký rồi mới đặt ra cửa đúng ngày hẹn.',
          },
          {
            kanji: '生ゴミ',
            furigana: 'なまゴミ',
            romaji: 'nama gomi',
            pitchCode: '[2] Trung cao (Nakadaka)',
            pitchPattern: ['L', 'H', 'L', 'L'],
            meaningVn: 'Rác thực phẩm tươi sống, đồ ăn thừa',
            exampleJp: '夏場は生ゴミのにおいが気になる。',
            exampleFurigana: 'なつばは なまゴミの においが きになる。',
            exampleVn: 'Vào mùa hè mùi rác đồ ăn thừa rất dễ gây khó chịu.',
            nativeNuance: 'Thường cần chắt ráo nước (水切り) trước khi bỏ túi.',
          },
        ],
        nounPhrases: [
          {
            kanji: '違反シールが貼られた袋',
            furigana: 'いはんシールが はられた ふくろ',
            romaji: 'ihan shīru ga harareta fukuro',
            pitchCode: '[0]+[0]+[3]',
            pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'L', 'H', 'L', 'L', 'H', 'H', 'L'],
            meaningVn: 'Túi rác bị nhân viên dán tem cảnh báo vi phạm phân loại',
            exampleJp: '自分の袋に違反シールが貼られていた。',
            exampleFurigana: 'じぶんの ふくろに いはんシールが はられて いた。',
            exampleVn: 'Túi rác của mình bị dán giấy vàng báo không thu gom vì sai loại.',
            nativeNuance: 'Nếu bị dán tem này, người bỏ phải tự mang vào phân loại lại.',
          },
          {
            kanji: '水切りが不十分な生ゴミ',
            furigana: 'みずきりが ふじゅうぶんな なまゴミ',
            romaji: 'mizukiri ga fujūbun na nama gomi',
            pitchCode: '[0]+[2]+[2]',
            pitchPattern: ['L', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'L', 'L', 'H', 'L', 'L'],
            meaningVn: 'Rác thực phẩm chưa được vắt ráo nước',
            exampleJp: '水切りが不十分だとカラスが寄る。',
            exampleFurigana: 'みずきりが ふじゅうぶんだと カラスが よる。',
            exampleVn: 'Rác ướt sũng không vắt khô dễ thu hút quạ tới bới.',
            nativeNuance: 'Kỹ năng bếp núc Nhật: bồn rửa bát luôn có lưới lọc 水切りネット.',
          },
          {
            kanji: 'ゴミ収集車が行った直後',
            furigana: 'ゴミしゅうしゅうしゃが いった ちょくご',
            romaji: 'gomi shūshūsha ga itta chokugo',
            pitchCode: '[1]+[3]+[1]',
            pitchPattern: ['H', 'L', 'L', 'H', 'H', 'L', 'L', 'H', 'L', 'H', 'L', 'L'],
            meaningVn: 'Khoảnh khắc vừa lỡ ngay sau khi xe rác chạy qua',
            exampleJp: '収集車が行った直後で間に合わなかった。',
            exampleFurigana: 'しゅうしゅうしゃが いった ちょくごで まにあわなかった。',
            exampleVn: 'Xe rác vừa rời đi ngay tức thì nên tôi không kịp mang ra.',
            nativeNuance: 'Tình huống dở khóc dở cười ai ở Nhật cũng từng trải qua ít nhất một lần.',
          },
        ],
        verbPhrases: [
          {
            kanji: '出し損ねたゴミを持ち帰る',
            furigana: 'だしそこねた ゴミを もちかえる',
            romaji: 'dashisokoneta gomi o mochikaeru',
            pitchCode: '[4]+[1]+[4]',
            pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'H', 'L', 'L', 'H', 'H', 'L', 'L'],
            meaningVn: 'Mang túi rác bị lỡ chuyến quay trở vào nhà',
            exampleJp: '遅れたので出し損ねたゴミを持ち帰った。',
            exampleFurigana: 'おくれたので だしそこねた ゴミを もちかえった。',
            exampleVn: 'Vì mang ra trễ nên tôi đành xách túi rác quay về nhà đợi lần sau.',
            nativeNuance: 'V-ます + 損ねる (そこねる) = lỡ hụt mất cơ hội làm gì đó.',
          },
          {
            kanji: '管理人から分別を注意される',
            furigana: 'かんりにんから ぶんべつを ちゅういされる',
            romaji: 'kanrinin kara bunbetsu o chūi sareru',
            pitchCode: '[3]+[0]+[1]',
            pitchPattern: ['L', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'H', 'L', 'L', 'L'],
            meaningVn: 'Bị bác quản lý tòa nhà nhắc nhở chuyện phân loại rác',
            exampleJp: '分別ミスで管理人に優しく注意された。',
            exampleFurigana: 'ぶんべつミスで かんりにんに やさしく ちゅういされた。',
            exampleVn: 'Do phân loại nhầm nên bị bác quản lý chung cư nhắc nhẹ.',
            nativeNuance: 'Bị động ở đây thể hiện sự ngại ngùng nhưng tiếp thu chuẩn Nhật.',
          },
          {
            kanji: 'ペットボトルを軽くすすいで潰す',
            furigana: 'ペットボトルを かるく すすいで つぶす',
            romaji: 'petto botoru o karuku susuide tsubusu',
            pitchCode: '[4]+[0]+[2]+[0]',
            pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H'],
            meaningVn: 'Tráng sơ chai nhựa rồi bóp dẹp cho gọn',
            exampleJp: 'かさばらないようボトルを軽く潰す。',
            exampleFurigana: 'かさばらないよう ボトルを かるく つぶす。',
            exampleVn: 'Bóp dẹp vỏ chai lại cho đỡ chiếm diện tích túi.',
            nativeNuance: 'Từ かさばる (cồng kềnh tốn chỗ) và 潰す (bóp bẹp) kết hợp cực kỳ chuẩn xác.',
          },
        ],
      },
    ],
  },
  {
    matchTokens: ['đi tàu', 'tàu điện', 'ga tàu', 'đi làm bằng tàu', '電車', '駅', '満員電車'],
    xray: {
      contextTitle: 'Đi tàu điện & Phản xạ nơi nhà ga Nhật Bản',
      japaneseSceneTag: '電車での移動・乗り換え',
      complexityTier: 'Đời sống đô thị · Giao thông',
      physicalActions: [
        'Quẹt thẻ IC qua cổng soát vé tự động và tìm đúng sân ga',
        'Xếp hàng theo vạch kẻ sàn, nhường khách xuống trước rồi mới lên toa',
        'Chuyển tuyến hoặc chú ý nghe thông báo trạm dừng tiếp theo',
      ],
      psychologicalStates: [
        'Nhịp điệu khẩn trương giờ cao điểm nhưng giữ im lặng tuyệt đối trên toa',
        'Bồn chồn khi sợ lỡ chuyến hoặc nhầm hướng tàu nhanh/tàu thường',
      ],
      storyThreadSummary:
        'Chạm thẻ qua cổng soát vé, xếp hàng lên tàu đúng vạch, chuyển tuyến nhịp nhàng và chuẩn bị xuống ở ga đích.',
    },
    initialAngle: 'Ngóc ngách #1 · Qua cổng vé, Lên toa & Chuyển tuyến',
    keywords: [
      {
        kanji: '改札口',
        furigana: 'かいさつぐち',
        romaji: 'kaisatsuguchi',
        pitchCode: '[4] Trung cao (Nakadaka)',
        pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L'],
        meaningVn: 'Cổng soát vé vào sân ga',
        exampleJp: '改札口を出た所で待ち合わせる。',
        exampleFurigana: 'かいさつぐちを でた ところで まちあわせる。',
        exampleVn: 'Hẹn gặp nhau ngay phía ngoài cổng soát vé.',
        nativeNuance: 'Nói ngắn gọn là 改札 (かいさつ).',
      },
      {
        kanji: '乗り換え',
        furigana: 'のりかえ',
        romaji: 'norikae',
        pitchCode: '[0] Bình bản (Heiban)',
        pitchPattern: ['L', 'H', 'H', 'H'],
        meaningVn: 'Việc chuyển tuyến tàu',
        exampleJp: '新宿で山手線に乗り換える。',
        exampleFurigana: 'しんじゅくで やまのてせんに のりかえる。',
        exampleVn: 'Chuyển sang tuyến Yamanote tại ga Shinjuku.',
        nativeNuance: 'Danh từ là 乗り換え, động từ là 乗り換える.',
      },
      {
        kanji: '各駅停車',
        furigana: 'かくえきていしゃ',
        romaji: 'kakueki teisha',
        pitchCode: '[5] Trung cao (Nakadaka)',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'L'],
        meaningVn: 'Tàu thường dừng ở tất cả mọi ga',
        exampleJp: '急行ではなく各駅停車に乗る。',
        exampleFurigana: 'きゅうこうではなく かくえきていしゃに のる。',
        exampleVn: 'Đi tàu chậm dừng mọi ga chứ không lên tàu tốc hành.',
        nativeNuance: 'Người Tokyo hay gọi tắt là 各停 (かくてい).',
      },
    ],
    nounPhrases: [
      {
        kanji: 'ラッシュ時の満員電車',
        furigana: 'ラッシュじの まんいんでんしゃ',
        romaji: 'rasshuji no man’in densha',
        pitchCode: '[1]+[5]',
        pitchPattern: ['H', 'L', 'L', 'L', 'L', 'H', 'H', 'H', 'H', 'L', 'L'],
        meaningVn: 'Chuyến tàu đông nghẹt người vào giờ cao điểm',
        exampleJp: '毎朝ラッシュ時の満員電車に揺られる。',
        exampleFurigana: 'まいあさ ラッシュじの まんいんでんしゃに ゆられる。',
        exampleVn: 'Sáng nào cũng lắc lư chen chúc trên chuyến tàu giờ cao điểm.',
        nativeNuance: 'Cụm từ kinh điển: 電車に揺られる (lắc lư theo nhịp tàu chạy).',
      },
      {
        kanji: '駆け込み乗車の危険',
        furigana: 'かけこみじょうしゃの きけん',
        romaji: 'kakekomi jōsha no kiken',
        pitchCode: '[5]+[0]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'L', 'L', 'H', 'H'],
        meaningVn: 'Nguy hiểm khi chạy lao vào toa lúc cửa sắp đóng',
        exampleJp: '駆け込み乗車はおやめください。',
        exampleFurigana: 'かけこみじょうしゃは おやめください。',
        exampleVn: 'Xin quý khách vui lòng không cố chạy nhảy lên tàu khi còi đóng cửa reo.',
        nativeNuance: 'Câu loa phát thanh quen thuộc ở mọi nhà ga Nhật Bản.',
      },
      {
        kanji: '優先席付近のエリア',
        furigana: 'ゆうせんせき ふきんの エリア',
        romaji: 'yūsenseki fukin no eria',
        pitchCode: '[3]+[1]+[1]',
        pitchPattern: ['L', 'H', 'H', 'L', 'L', 'H', 'L', 'L', 'H', 'L', 'L'],
        meaningVn: 'Khu vực quanh hàng ghế ưu tiên',
        exampleJp: '優先席付近ではマナーモードにする。',
        exampleFurigana: 'ゆうせんせき ふきんでは マナーモードに する。',
        exampleVn: 'Khi đứng gần khu ghế ưu tiên nhớ chuyển điện thoại sang chế độ im lặng.',
        nativeNuance: 'Quy tắc ngầm tôn trọng người cao tuổi, phụ nữ mang thai và người cần trợ giúp.',
      },
    ],
    verbPhrases: [
      {
        kanji: '改札にICカードをタッチする',
        furigana: 'かいさつに カードを タッチする',
        romaji: 'kaisatsu ni kādo o tacchi suru',
        pitchCode: '[0]+[1]+[1]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'L', 'L'],
        meaningVn: 'Chạm thẻ IC vào đầu đọc cổng soát vé',
        exampleJp: '改札にSuicaを軽くタッチして通る。',
        exampleFurigana: 'かいさつに スイカを かるく タッチして とおる。',
        exampleVn: 'Quẹt nhẹ thẻ Suica qua cổng rồi bước vào.',
        nativeNuance: 'Người Nhật dùng タッチする hoặc かざす (đưa thẻ lướt qua), ít dùng dịch word-by-word.',
      },
      {
        kanji: 'つり革にしっかり掴まる',
        furigana: 'つりかわに しっかり つかまる',
        romaji: 'tsurikawa ni shikkari tsukamaru',
        pitchCode: '[0]+[3]+[0]',
        pitchPattern: ['L', 'H', 'H', 'H', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'H'],
        meaningVn: 'Nắm chắc lấy tay vịn treo trên trần toa',
        exampleJp: '揺れるのでつり革に掴まってください。',
        exampleFurigana: 'ゆれるので つりかわに つかまって ください。',
        exampleVn: 'Tàu sắp rung lắc nên hãy bám chắc vào tay vịn treo nhé.',
        nativeNuance: 'つり革 là tay nắm tròn treo cao; 手すり là thanh tay vịn ngang.',
      },
      {
        kanji: '降りる人を先に通す',
        furigana: 'おりる ひとを さきに とおす',
        romaji: 'oriru hito o saki ni tōsu',
        pitchCode: '[2]+[0]+[0]+[1]',
        pitchPattern: ['L', 'H', 'L', 'L', 'H', 'L', 'H', 'H', 'H', 'L', 'L'],
        meaningVn: 'Đứng nép nhường đường cho người xuống tàu trước',
        exampleJp: 'ドア脇に避けて降りる人を先に通す。',
        exampleFurigana: 'ドアわきに よけて おりる ひとを さきに とおす。',
        exampleVn: 'Đứng nép sang hai bên cửa để dòng người từ trong đi xuống trước.',
        nativeNuance: 'Văn hóa đi tàu bất di bất dịch của người Nhật.',
      },
    ],
    deepDiveBatches: [
      {
        angleLabel: 'Ngóc ngách #2 · Tàu trễ giờ, ngủ quên lố trạm & lấy giấy chứng nhận trễ',
        keywords: [
          {
            kanji: '遅延証明書',
            furigana: 'ちえんしょうめいしょ',
            romaji: 'chien shōmeisho',
            pitchCode: '[5] Trung cao (Nakadaka)',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'L'],
            meaningVn: 'Giấy xác nhận tàu bị trễ (nộp cho công ty/trường)',
            exampleJp: '駅員から遅延証明書を受け取る。',
            exampleFurigana: 'えきいんから ちえんしょうめいしょを うけとる。',
            exampleVn: 'Nhận tờ giấy chứng nhận tàu trễ từ nhân viên nhà ga.',
            nativeNuance: 'Vũ khí sinh tồn bắt buộc để chứng minh đi làm trễ không phải lỗi cá nhân.',
          },
          {
            kanji: '乗り過ごし',
            furigana: 'のりすごし',
            romaji: 'norisugoshi',
            pitchCode: '[4] Trung cao (Nakadaka)',
            pitchPattern: ['L', 'H', 'H', 'H', 'L'],
            meaningVn: 'Việc ngồi quá lố ga cần xuống',
            exampleJp: '寝てしまい二駅も乗り過ごした。',
            exampleFurigana: 'ねてしまい ふたえきも のりすごした。',
            exampleVn: 'Ngủ thiếp đi mất nên bị đi lố hẳn hai ga.',
            nativeNuance: 'Danh từ là 乗り過ごし, động từ là 乗り過ごす.',
          },
          {
            kanji: '見合わせ',
            furigana: 'みあわせ',
            romaji: 'miawase',
            pitchCode: '[0] Bình bản (Heiban)',
            pitchPattern: ['L', 'H', 'H', 'H'],
            meaningVn: 'Tạm ngưng chạy tàu (do sự cố/thời tiết)',
            exampleJp: '人身事故で運転を見合わせている。',
            exampleFurigana: 'じんしんじこで うんてんを みあわせて いる。',
            exampleVn: 'Tuyến tàu đang tạm ngưng vận hành do có sự cố trên đường ray.',
            nativeNuance: '運転見合わせ là cụm thông báo chuẩn trên bảng điện tử.',
          },
        ],
        nounPhrases: [
          {
            kanji: '終電間際のホーム',
            furigana: 'しゅうでん まぎわの ホーム',
            romaji: 'shūden magiwa no hōmu',
            pitchCode: '[0]+[1]+[1]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'L', 'L'],
            meaningVn: 'Sân ga lúc sát giờ chuyến tàu cuối trong ngày',
            exampleJp: '終電間際のホームに急いで走る。',
            exampleFurigana: 'しゅうでん まぎわの ホームに いそいで はしる。',
            exampleVn: 'Chạy vội xuống sân ga khi chuyến tàu cuối sắp lăn bánh.',
            nativeNuance: '終電 (しゅうでん) vs 始発 (しはつ - chuyến tàu đầu tiên sáng sớm).',
          },
          {
            kanji: '方面を間違えた反対電車',
            furigana: 'ほうめんを まちがえた はんたいでんしゃ',
            romaji: 'hōmen o machigaeta hantai densha',
            pitchCode: '[3]+[4]+[0]',
            pitchPattern: ['L', 'H', 'H', 'L', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'H'],
            meaningVn: 'Chuyến tàu chạy ngược chiều do lên nhầm hướng',
            exampleJp: '気づいたら反対方向の電車だった。',
            exampleFurigana: 'きづいたら はんたいほうこうの でんしゃだった。',
            exampleVn: 'Ngước nhìn bảng điện mới giật mình biết mình leo nhầm chiều ngược lại.',
            nativeNuance: 'Người Nhật phân biệt 上り (hướng vào trung tâm Tokyo) và 下り (hướng ra ngoài).',
          },
          {
            kanji: '振替輸送の案内',
            furigana: 'ふりかえゆそうの あんない',
            romaji: 'furikae yusō no annai',
            pitchCode: '[0]+[3]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'L'],
            meaningVn: 'Hướng dẫn đi nhờ tuyến tàu hãng khác khi tuyến chính sự cố',
            exampleJp: '振替輸送を利用して別ルートで向かう。',
            exampleFurigana: 'ふりかえゆそうを りようして べつルートで むかう。',
            exampleVn: 'Dùng vé chuyển tuyến thay thế để vòng sang tuyến khác tới chỗ làm.',
            nativeNuance: 'Kiến thức sống còn ở Tokyo khi một tuyến bị sự cố.',
          },
        ],
        verbPhrases: [
          {
            kanji: 'うたた寝をして乗り過ごす',
            furigana: 'うたたねをして のりすごす',
            romaji: 'utatane o shite norisugosu',
            pitchCode: '[0]+[4]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'L', 'L'],
            meaningVn: 'Ngủ gật gà gật rồi đi lố mất trạm xuống',
            exampleJp: '疲れてうたた寝をして乗り過ごした。',
            exampleFurigana: 'つかれて うたたねをして のりすごした。',
            exampleVn: 'Mệt quá ngủ gật trên tàu thế là trôi tuột qua mất ga nhà.',
            nativeNuance: 'うたた寝 diễn tả trạng thái thiu thiu ngủ ngồi cực chuẩn ngữ cảnh tàu xe.',
          },
          {
            kanji: '自動改札に引っかかる',
            furigana: 'じどうかいさつに ひっかかる',
            romaji: 'jidō kaisatsu ni hikkakaru',
            pitchCode: '[5]+[3]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'L', 'H', 'H', 'L', 'L'],
            meaningVn: 'Bị thanh chắn cổng soát vé kẹp đóng lại (do lỗi/thiếu tiền)',
            exampleJp: '残高不足で自動改札に引っかかった。',
            exampleFurigana: 'ざんだかぶそくで じどうかいさつに ひっかかった。',
            exampleVn: 'Thẻ hết tiền nên bị cổng tự động đóng sập chặn lại.',
            nativeNuance: 'Động từ 引っかかる diễn tả cảnh thanh chắn đóng lại kêu "píp píp" rất sống động.',
          },
          {
            kanji: '精算機で不足分を支払う',
            furigana: 'せいさんきで ふそくぶんを しはらう',
            romaji: 'seisanki de fusokubun o shiharau',
            pitchCode: '[3]+[0]+[3]',
            pitchPattern: ['L', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'L', 'H', 'H', 'L'],
            meaningVn: 'Nạp bù phần tiền vé còn thiếu ở máy điều chỉnh giá vé',
            exampleJp: '乗り越したので精算機で不足分を払う。',
            exampleFurigana: 'のりこしたので せいさんきで ふそくぶんを はらう。',
            exampleVn: 'Vì đi lố trạm nên phải ra máy 乗り越し精算機 bù thêm tiền vé.',
            nativeNuance: 'Máy 乗り越し精算機 luôn đặt ngay bên trong cổng soát vé trước khi ra.',
          },
        ],
      },
    ],
  },
  {
    matchTokens: ['đàm phán', 'hợp đồng', 'thất bại', 'thương lượng', 'ký kết', '契約', '交渉'],
    xray: {
      contextTitle: 'Đàm phán Hợp đồng Thất bại & Giữ thể diện B2B',
      japaneseSceneTag: '契約交渉の難航・決裂',
      complexityTier: 'Công sở & Thương mại B2B cấp cao (N2–N1)',
      physicalActions: [
        'Rà soát lại bảng điều khoản, chi phí và biên độ nhượng bộ lần cuối',
        'Đưa ra phát ngôn Cushion Kotoba (từ đệm mềm) trước khi báo không thể đáp ứng',
        'Thu dọn tài liệu, đứng dậy cúi chào giữ cửa hợp tác cho dự án sau',
      ],
      psychologicalStates: [
        'Áp lực giữa mục tiêu doanh số nội bộ và giới hạn ngân sách của đối tác',
        'Tuyệt đối tránh nói "Không" cộc lốc — bảo toàn thể diện (Kao o tateru) cho cả hai bên',
      ],
      storyThreadSummary:
        'Hai bên không tìm được tiếng nói chung về điều khoản giá cả nên đàm phán rơi vào bế tắc, nhưng vẫn giữ thái độ tôn trọng để khéo léo khép lại mà không phá vỡ quan hệ lâu dài.',
    },
    initialAngle: 'Ngóc ngách #1 · Bế tắc điều khoản & Rút lui giữ thể diện',
    keywords: [
      {
        kanji: '条件面',
        furigana: 'じょうけんめん',
        romaji: 'jōkenmen',
        pitchCode: '[3] Trung cao (Nakadaka)',
        pitchPattern: ['L', 'H', 'H', 'L', 'L', 'L'],
        meaningVn: 'Khía cạnh điều kiện / điều khoản hợp tác',
        exampleJp: '条件面での折り合いがつかない。',
        exampleFurigana: 'じょうけんめんでの おりあいが つかない。',
        exampleVn: 'Hai bên không thể thống nhất nổi về mặt điều khoản.',
        nativeNuance: 'Cách nói lịch sự quy về "yếu tố khách quan" thay vì đổ lỗi cho đối phương.',
      },
      {
        kanji: '平行線',
        furigana: 'へいこうせん',
        romaji: 'heikōsen',
        pitchCode: '[0] Bình bản (Heiban)',
        pitchPattern: ['L', 'H', 'H', 'H', 'H'],
        meaningVn: 'Thế song song không có điểm giao (bế tắc)',
        exampleJp: '両社の議論は平行線を辿っている。',
        exampleFurigana: 'りょうしゃの ぎろんは へいこうせんを たどっている。',
        exampleVn: 'Cuộc thảo luận giữa hai công ty đang rơi vào bế tắc không lối thoát.',
        nativeNuance: 'Collocation vàng cố định: 平行線を辿る (たどる).',
      },
      {
        kanji: '見送り',
        furigana: 'みおくり',
        romaji: 'miokuri',
        pitchCode: '[0] Bình bản (Heiban)',
        pitchPattern: ['L', 'H', 'H', 'H'],
        meaningVn: 'Sự tạm gác / từ chối khéo phương án hợp tác',
        exampleJp: '今回は契約の見送りとなった。',
        exampleFurigana: 'こんかいは けいやくの みおくりと なった。',
        exampleVn: 'Đợt này hợp đồng đành phải gác lại (chưa ký được).',
        nativeNuance: 'Trong B2B Nhật, 見送り là từ chối lịch sự thay cho 拒否 hay 失敗.',
      },
    ],
    nounPhrases: [
      {
        kanji: '歩み寄りの余地がない提案',
        furigana: 'あゆみよりの よちが ない ていあん',
        romaji: 'ayumiyori no yochi ga nai teian',
        pitchCode: '[5]+[1]+[0]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'L', 'H', 'L', 'H', 'H', 'H'],
        meaningVn: 'Đề xuất cứng rắn không còn dư địa nhượng bộ',
        exampleJp: '歩み寄りの余地がなく交渉は決裂した。',
        exampleFurigana: 'あゆみよりの よちが なく こうしょうは けつれつした。',
        exampleVn: 'Không bên nào chịu nhượng bộ thêm nên cuộc đàm phán đổ vỡ.',
        nativeNuance: '歩み寄り (cùng tiến một bước lại gần nhau) là từ khóa trong thương thuyết Nhật.',
      },
      {
        kanji: '採算の合わない厳しい条件',
        furigana: 'さいさんの あわない きびしい じょうけん',
        romaji: 'saisan no awanai kibishii jōken',
        pitchCode: '[0]+[2]+[3]',
        pitchPattern: ['L', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'L', 'H', 'H', 'L', 'H', 'H', 'L'],
        meaningVn: 'Điều kiện khắc nghiệt không đảm bảo nổi biên lợi nhuận',
        exampleJp: '採算の合わない条件は呑み込めない。',
        exampleFurigana: 'さいさんの あわない じょうけんは のみこめない。',
        exampleVn: 'Điều kiện mà làm không có lãi thì bên tôi không thể gật đầu được.',
        nativeNuance: '採算が合わない dùng cực nhiều khi từ chối ép giá.',
      },
      {
        kanji: '双方の認識の食い違い',
        furigana: 'そうほうの にんしきの くいちがい',
        romaji: 'sōhō no ninshiki no kuichigai',
        pitchCode: '[1]+[0]+[0]',
        pitchPattern: ['H', 'L', 'L', 'L', 'L', 'H', 'H', 'H', 'L', 'H', 'H', 'H', 'H'],
        meaningVn: 'Sự vênh nhau trong cách hiểu giữa hai phía',
        exampleJp: '認識の食い違いが合意を阻んだ。',
        exampleFurigana: 'にんしきの くいちがいが ごういを はばんだ。',
        exampleVn: 'Cách hiểu vênh nhau của đôi bên đã cản trở việc đi đến đồng thuận.',
        nativeNuance: 'Diễn đạt khách quan, tránh chỉ trích cá nhân "anh hiểu sai ý tôi".',
      },
    ],
    verbPhrases: [
      {
        kanji: '交渉の折り合いがつかない',
        furigana: 'こうしょうの おりあいが つかない',
        romaji: 'kōshō no oriai ga tsukanai',
        pitchCode: '[0]+[0]+[2]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'H', 'L', 'L'],
        meaningVn: 'Không đi đến được điểm thỏa hiệp chung trong đàm phán',
        exampleJp: '価格面でどうしても折り合いがつかない。',
        exampleFurigana: 'かかくめんで どうしても おりあいが つかない。',
        exampleVn: 'Riêng về giá cả thì cố thế nào hai bên cũng không khớp được với nhau.',
        nativeNuance: 'Collocation B2B kinh điển: 折り合いがつく / つかない.',
      },
      {
        kanji: '今回の件はいったん白紙に戻す',
        furigana: 'こんかいの けんは いったん はくしに もどす',
        romaji: 'konkai no ken wa ittan hakushi ni modosu',
        pitchCode: '[1]+[0]+[2]',
        pitchPattern: ['H', 'L', 'L', 'L', 'L', 'H', 'H', 'L', 'L', 'H', 'L', 'L'],
        meaningVn: 'Tạm thời đưa thương vụ lần này trở lại trạng thái ban đầu (hủy bàn tiếp)',
        exampleJp: '遺憾ながら交渉を白紙に戻すしかない。',
        exampleFurigana: 'いかんながら こうしょうを はくしに もどすしかない。',
        exampleVn: 'Rất lấy làm tiếc nhưng đành phải xếp lại cuộc đàm phán từ vạch xuất phát.',
        nativeNuance: '白紙に戻す (trả về tờ giấy trắng) rất trang trọng, tránh dùng từ nặng nề "hủy bỏ".',
      },
      {
        kanji: '相手の顔を立てて角を立てずに断る',
        furigana: 'あいての かおを たてて かどを たてずに ことわる',
        romaji: 'aite no kao o tatete kado o tatezu ni kotowaru',
        pitchCode: '[3]+[0]+[2]',
        pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'H', 'L', 'L', 'H', 'L', 'L', 'H', 'H', 'L'],
        meaningVn: 'Giữ thể diện cho đối tác và từ chối khéo không gây mất lòng',
        exampleJp: '今後のため相手の顔を立てて引いた。',
        exampleFurigana: 'こんごのため あいての かおを たてて ひいた。',
        exampleVn: 'Nghĩ cho quan hệ tương lai nên tôi nhún nhường rút lui mà vẫn giữ thể diện cho họ.',
        nativeNuance: 'Kết hợp 2 thành ngữ tâm lý Nhật: 顔を立てる (giữ mặt mũi) và 角が立つ (gây gai góc mất lòng).',
      },
    ],
    deepDiveBatches: [
      {
        angleLabel: 'Ngóc ngách #2 · Báo cáo thất bại về nội bộ, đàm phán đổ vỡ & mở lối tái hợp',
        keywords: [
          {
            kanji: '決裂',
            furigana: 'けつれつ',
            romaji: 'ketsuretsu',
            pitchCode: '[0] Bình bản (Heiban)',
            pitchPattern: ['L', 'H', 'H', 'H'],
            meaningVn: 'Sự đổ vỡ, tan vỡ hoàn toàn trong đàm phán',
            exampleJp: '最終局面で交渉が決裂した。',
            exampleFurigana: 'さいしゅうきょくめんで こうしょうが けつれつした。',
            exampleVn: 'Ngay ở phút chót thì cuộc đàm phán đã đổ vỡ.',
            nativeNuance: 'Dùng trong báo cáo nội bộ/báo chí, tránh nói trực diện trước mặt khách hàng.',
          },
          {
            kanji: '不調',
            furigana: 'ふちょう',
            romaji: 'fuchō',
            pitchCode: '[0] Bình bản (Heiban)',
            pitchPattern: ['L', 'H', 'H'],
            meaningVn: 'Không thành, trục trặc (chỉ cuộc thương lượng không đạt kết quả)',
            exampleJp: '合併協議は不調に終わった。',
            exampleFurigana: 'がっぺいきょうぎは ふちょうに おわった。',
            exampleVn: 'Cuộc thảo luận sáp nhập đã kết thúc mà không thành.',
            nativeNuance: 'Collocation báo cáo chuyên nghiệp: 不調に終わる.',
          },
          {
            kanji: '遺憾',
            furigana: 'いかん',
            romaji: 'ikan',
            pitchCode: '[0] Bình bản (Heiban)',
            pitchPattern: ['L', 'H', 'H'],
            meaningVn: 'Lấy làm tiếc (sắc thái trang trọng trong kinh doanh)',
            exampleJp: '合意に至らず誠に遺憾です。',
            exampleFurigana: 'ごういに いたらず まことに いかんです。',
            exampleVn: 'Thật vô cùng đáng tiếc khi hai bên chưa thể đi đến thống nhất.',
            nativeNuance: 'Từ vựng N1 biểu đạt sự tiếc nuối mang tính ngoại giao.',
          },
        ],
        nounPhrases: [
          {
            kanji: '苦渋の決断を下した背景',
            furigana: 'くじゅうの けつだんを くだした はいけい',
            romaji: 'kujū no ketsudan o kudashita haikei',
            pitchCode: '[0]+[0]+[3]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H'],
            meaningVn: 'Bối cảnh đằng sau quyết định khó khăn đầy day dứt',
            exampleJp: '社長に苦渋の決断の背景を説明する。',
            exampleFurigana: 'しゃちょうに くじゅうの けつだんの はいけいを せつめいする。',
            exampleVn: 'Giải trình với giám đốc bối cảnh dẫn tới quyết định rút lui đầy khó khăn này.',
            nativeNuance: '苦渋の決断 (quyết định ngậm đắng nuốt cay) cực hay dùng trong email xin lỗi rút dự án.',
          },
          {
            kanji: '次の機会に繋がる良好な関係',
            furigana: 'つぎの きかいに つながる りょうこうな かんけい',
            romaji: 'tsugi no kikai ni tsunagaru ryōkō na kankei',
            pitchCode: '[2]+[2]+[0]',
            pitchPattern: ['L', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'H', 'L', 'H', 'H', 'H', 'H'],
            meaningVn: 'Mối quan hệ tốt đẹp mở đường cho cơ hội hợp tác sau',
            exampleJp: '断っても良好な関係を維持したい。',
            exampleFurigana: 'ことわっても りょうこうな かんけいを いじしたい。',
            exampleVn: 'Dù lần này không ký được vẫn muốn giữ mối quan hệ êm đẹp cho lần tới.',
            nativeNuance: 'Triết lý B2B Nhật: một thương vụ hỏng không đồng nghĩa chấm dứt quan hệ.',
          },
          {
            kanji: '社内の稟議が通らない理由',
            furigana: 'しゃないの りんぎが とおらない りゆう',
            romaji: 'shanai no ringi ga tōranai riyū',
            pitchCode: '[1]+[0]+[3]',
            pitchPattern: ['H', 'L', 'L', 'L', 'H', 'H', 'L', 'H', 'H', 'L', 'L', 'H', 'H'],
            meaningVn: 'Lý do tờ trình phê duyệt nội bộ không được thông qua',
            exampleJp: '稟議が通らず契約を見送らざるを得ない。',
            exampleFurigana: 'りんぎが とおらず けいやくを みおくらざるを えない。',
            exampleVn: 'Vì tờ trình nội bộ không qua nên buộc lòng phải gác hợp đồng lại.',
            nativeNuance: 'Đổ lý do về quy trình 稟議 (Ringi) là cách từ chối êm ái nhất tại Nhật.',
          },
        ],
        verbPhrases: [
          {
            kanji: 'ご期待に沿えずお詫び申し上げる',
            furigana: 'ごきたいに そえず おわび もうしあげる',
            romaji: 'gokitai ni soezu owabi mōshiageru',
            pitchCode: '[0]+[2]+[5]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'L', 'H', 'H', 'H', 'H', 'L'],
            meaningVn: 'Thành thật xin lỗi vì không thể đáp ứng kỳ vọng của quý đối tác',
            exampleJp: 'ご期待に沿えず深くお詫び申し上げます。',
            exampleFurigana: 'ごきたいに そえず ふかく おわび もうしあげます。',
            exampleVn: 'Chúng tôi thành thật xin lỗi vì lần này chưa thể đáp ứng mong muốn của quý công ty.',
            nativeNuance: 'Mẫu câu Keigo vàng chuẩn xác 100% trong thư từ chối thương mại.',
          },
          {
            kanji: '持ち帰って再度検討し直す',
            furigana: 'もちかえって さいど けんとうしなおす',
            romaji: 'mochikaette saido kentō shinaosu',
            pitchCode: '[4]+[1]+[5]',
            pitchPattern: ['L', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'H', 'H', 'L', 'L'],
            meaningVn: 'Mang phương án về cân nhắc lại (tạo vùng đệm rút lui)',
            exampleJp: '一度社内に持ち帰って検討し直します。',
            exampleFurigana: 'いちど しゃないに もちかえって けんとうしなおします。',
            exampleVn: 'Xin phép mang đề xuất về công ty rà soát lại một lần nữa ạ.',
            nativeNuance: 'Trong văn hóa Nhật, đây thường là tín hiệu ngầm báo cuộc họp khó chốt ngay.',
          },
          {
            kanji: '交渉失敗の原因を社内で総括する',
            furigana: 'こうしょうしっぱいの げんいんを しゃないで そうかつする',
            romaji: 'kōshō shippai no gen’in o shanai de sōkatsu suru',
            pitchCode: '[0]+[0]+[0]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'H'],
            meaningVn: 'Tổng kết rút kinh nghiệm nguyên nhân thất bại trong nội bộ',
            exampleJp: '次回に向けて敗因を冷静に総括する。',
            exampleFurigana: 'じかいに むけて はいいんを れいせいに そうかつする。',
            exampleVn: 'Bình tĩnh tổng kết lại nguyên nhân thất bại để chuẩn bị cho lần tới.',
            nativeNuance: '総括する (tổng kết, đúc rút bài học hệ thống) mang sắc thái chuyên nghiệp cao.',
          },
        ],
      },
    ],
  },
  {
    matchTokens: ['bị sếp mắng', 'đi trễ', 'đi muộn', 'sếp mắng', '遅刻', '上司に叱られる'],
    xray: {
      contextTitle: 'Đi làm trễ & Đối diện khi bị cấp trên khiển trách',
      japaneseSceneTag: '遅刻・上司からの指導',
      complexityTier: 'Công sở Nhật Bản · Quản trị khủng hoảng cá nhân',
      physicalActions: [
        'Báo cáo sớm qua điện thoại/nhắn tin trước giờ vào ca (Horenso)',
        'Bước vào văn phòng cúi đầu xin lỗi dứt khoát, không bao biện',
        'Lắng nghe cấp trên nhắc nhở và báo cáo phương án bù đắp tiến độ',
      ],
      psychologicalStates: [
        'Áy náy sâu sắc, hạ thấp cái tôi (tuyệt đối không giải thích dài dòng nghe như ngụy biện)',
        'Nhanh chóng lấy lại tinh thần để chuộc lỗi bằng kết quả công việc',
      ],
      storyThreadSummary:
        'Ngủ quên đi làm trễ bị sếp gọi vào nhắc nhở nghiêm khắc; nhận lỗi thẳng thắn không ngụy biện và lập tức bắt tay bù lại tiến độ.',
    },
    initialAngle: 'Ngóc ngách #1 · Nhận lỗi thẳng thắn & Phản xạ công sở',
    keywords: [
      {
        kanji: '寝坊',
        furigana: 'ねぼう',
        romaji: 'nebō',
        pitchCode: '[0] Bình bản (Heiban)',
        pitchPattern: ['L', 'H', 'H'],
        meaningVn: 'Sự ngủ quên / dậy trễ',
        exampleJp: '目覚ましを聞き逃して寝坊した。',
        exampleFurigana: 'めざましを ききのがして ねぼうした。',
        exampleVn: 'Ngủ say không nghe chuông báo thức nên dậy trễ mất.',
        nativeNuance: 'Khẩu ngữ là 寝坊する; khi báo cáo sếp nên nói thật chứ không bịa lý do.',
      },
      {
        kanji: '言い訳',
        furigana: 'いいわけ',
        romaji: 'iiwake',
        pitchCode: '[0] Bình bản (Heiban)',
        pitchPattern: ['L', 'H', 'H', 'H'],
        meaningVn: 'Lời bao biện, ngụy biện',
        exampleJp: '上司の前で言い訳は禁物だ。',
        exampleFurigana: 'じょうしの まえで いいわけは きんもつだ。',
        exampleVn: 'Trước mặt sếp thì tuyệt đối cấm kỵ việc kiếm cớ bao biện.',
        nativeNuance: 'Ở Nhật, giải thích lý do khi đang bị mắng thường bị đánh giá là 言い訳 (ngụy biện).',
      },
      {
        kanji: '始末書',
        furigana: 'しまつしょ',
        romaji: 'shimatsusho',
        pitchCode: '[0] Bình bản (Heiban)',
        pitchPattern: ['L', 'H', 'H', 'H'],
        meaningVn: 'Bản tường trình kiểm điểm sự cố',
        exampleJp: '度重なる遅刻で始末書を書かされた。',
        exampleFurigana: 'どかさなる ちこくで しまつしょを かかされた。',
        exampleVn: 'Vì đi trễ nhiều lần nên bị bắt viết bản kiểm điểm.',
        nativeNuance: 'Văn bản nhân sự nghiêm trọng hơn 反省文 (bản tự kiểm điểm nhẹ).',
      },
    ],
    nounPhrases: [
      {
        kanji: '自分の不注意による大遅刻',
        furigana: 'じぶんの ふちゅういに よる だいちこく',
        romaji: 'jibun no fuchūi ni yoru daichikoku',
        pitchCode: '[0]+[2]+[3]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'L', 'L', 'H', 'H', 'L', 'L'],
        meaningVn: 'Việc đi muộn nghiêm trọng do sự bất cẩn của bản thân',
        exampleJp: '自分の不注意による遅刻を深く詫びた。',
        exampleFurigana: 'じぶんの ふちゅういに よる ちこくを ふかく わびた。',
        exampleVn: 'Tôi cúi đầu xin lỗi sâu sắc vì sự cố đi trễ do sơ suất cá nhân.',
        nativeNuance: 'Nhận trọn trách nhiệm về mình là cách hạ hỏa sếp nhanh nhất.',
      },
      {
        kanji: '上司からの厳しいお叱り',
        furigana: 'じょうしからの きびしい おしかり',
        romaji: 'jōshi kara no kibishii oshikari',
        pitchCode: '[1]+[3]+[0]',
        pitchPattern: ['H', 'L', 'L', 'L', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'H'],
        meaningVn: 'Lời quở trách nghiêm khắc từ cấp trên',
        exampleJp: '上司からの厳しいお叱りを真摯に受け止める。',
        exampleFurigana: 'じょうしからの きびしい おしかりを しんしに うけとめる。',
        exampleVn: 'Nghiêm túc tiếp thu lời răn dạy gay gắt từ cấp trên.',
        nativeNuance: 'Dùng お叱り (kính ngữ trang trọng của 叱り) khi kể lại một cách khiêm tốn.',
      },
      {
        kanji: '信頼を損ねる軽率な行動',
        furigana: 'しんらいを そこねる けいそつな こうどう',
        romaji: 'shinrai o sokoneru keisotsu na kōdō',
        pitchCode: '[0]+[3]+[0]+[0]',
        pitchPattern: ['L', 'H', 'H', 'H', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'H'],
        meaningVn: 'Hành vi khinh suất làm tổn hại đến lòng tin tập thể',
        exampleJp: '小さな遅刻も信頼を損ねる原因になる。',
        exampleFurigana: 'ちいさな ちこくも しんらいを そこねる げんいんに なる。',
        exampleVn: 'Dù chỉ trễ ít phút cũng có thể làm rạn nứt sự tin tưởng.',
        nativeNuance: 'Collocation văn hóa công sở Nhật: 信頼を損ねる (làm sứt mẻ tín nhiệm).',
      },
    ],
    verbPhrases: [
      {
        kanji: '頭を下げて誠心誠意謝罪する',
        furigana: 'あたまを さげて せいしんせいい しゃざいする',
        romaji: 'atama o sagete seishin seii shazai suru',
        pitchCode: '[3]+[2]+[0]',
        pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'H', 'H', 'L', 'L'],
        meaningVn: 'Cúi gập đầu xin lỗi bằng tất cả sự thành tâm',
        exampleJp: '出社するなり上司に頭を下げて謝罪した。',
        exampleFurigana: 'しゅっしゃするなり じょうしに あたまを さげて しゃざいした。',
        exampleVn: 'Vừa đặt chân tới công ty là tôi cúi đầu tạ lỗi với sếp ngay.',
        nativeNuance: 'Cúi đầu trước mặt tập thể để thể hiện thái độ hối lỗi rõ ràng.',
      },
      {
        kanji: '言い訳をせず素直に非を認める',
        furigana: 'いいわけを せず すなおに ひを みとめる',
        romaji: 'iiwake o sezu sunao ni hi o mitomeru',
        pitchCode: '[0]+[1]+[0]',
        pitchPattern: ['L', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'L', 'H', 'H', 'H'],
        meaningVn: 'Không kiếm cớ ngụy biện, thẳng thắn nhận phần sai về mình',
        exampleJp: '言い訳をせず素直に非を認めるべきだ。',
        exampleFurigana: 'いいわけを せず すなおに ひを みとめるべきだ。',
        exampleVn: 'Tuyệt đối đừng chống chế mà hãy thẳng thắn nhận sai.',
        nativeNuance: 'Collocation N2/N1 cực đắt giá: 非を認める (ひを みとめる).',
      },
      {
        kanji: '遅れた分の業務を挽回する',
        furigana: 'おくれた ぶんの ぎょうむを ばんかいする',
        romaji: 'okureta bun no gyōmu o bankai suru',
        pitchCode: '[0]+[1]+[0]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'H'],
        meaningVn: 'Gỡ gạc, bù đắp lại phần công việc bị chậm trễ',
        exampleJp: '昼休みを削って遅れた分を挽回する。',
        exampleFurigana: 'ひるやすみを けずって おくれた ぶんを ばんかいする。',
        exampleVn: 'Bớt giờ nghỉ trưa để làm bù lại khoảng thời gian bị trễ.',
        nativeNuance: 'Động từ 挽回する (vãn hồi, lấy lại phong độ) cực được sếp Nhật đánh giá cao.',
      },
    ],
    deepDiveBatches: [
      {
        angleLabel: 'Ngóc ngách #2 · Gọi báo gấp trên đường, không khí nặng nề & lấy lại uy tín',
        keywords: [
          {
            kanji: '報連相',
            furigana: 'ほうれんそう',
            romaji: 'hōrensō',
            pitchCode: '[3] Trung cao (Nakadaka)',
            pitchPattern: ['L', 'H', 'H', 'L', 'L'],
            meaningVn: 'Quy tắc Báo cáo - Liên lạc - Thảo luận',
            exampleJp: '遅刻しそうな時は事前の報連相が必須だ。',
            exampleFurigana: 'ちこくしそうな ときは じぜんの ほうれんそうが ひっすだ。',
            exampleVn: 'Lúc thấy có nguy cơ trễ là phải báo cáo trước ngay lập tức.',
            nativeNuance: 'Chậm một bước là bị mắng tội "không báo sớm" còn nặng hơn tội đi trễ.',
          },
          {
            kanji: '気まずさ',
            furigana: 'きまずさ',
            romaji: 'kimazusa',
            pitchCode: '[0] Bình bản (Heiban)',
            pitchPattern: ['L', 'H', 'H', 'H'],
            meaningVn: 'Sự ngượng ngập, gượng gạo trong bầu không khí',
            exampleJp: '怒られた後の気まずさに耐える。',
            exampleFurigana: 'おこられた あとの きまずさに たえる。',
            exampleVn: 'Chịu đựng bầu không khí ngượng ngùng nặng nề sau khi vừa bị mắng.',
            nativeNuance: 'Danh từ hóa tính từ 気まずい miêu tả cực chuẩn tâm lý sau trận la rầy.',
          },
          {
            kanji: '名誉挽回',
            furigana: 'めいよばんかい',
            romaji: 'meiyo bankai',
            pitchCode: '[5] Trung cao (Nakadaka)',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L'],
            meaningVn: 'Sự gỡ gạc lại thanh danh, uy tín đã mất',
            exampleJp: '次の案件で名誉挽回を狙う。',
            exampleFurigana: 'つぎの あんけんで めいよばんかいを ねらう。',
            exampleVn: 'Quyết tâm lấy lại uy tín ở dự án tiếp theo.',
            nativeNuance: 'Yojijukugo thực chiến giúp vực dậy tinh thần nơi công sở.',
          },
        ],
        nounPhrases: [
          {
            kanji: '始業時刻に間に合わない焦り',
            furigana: 'しぎょうじこくに まにあわない あせり',
            romaji: 'shigyō jikoku ni maniawanai aseri',
            pitchCode: '[4]+[4]+[3]',
            pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'L'],
            meaningVn: 'Nỗi sốt ruột cuống cuồng khi thấy không kịp giờ vào làm',
            exampleJp: '腕時計を見るたびに焦りが募る。',
            exampleFurigana: 'うでどけいを みるたびに あせりが つのる。',
            exampleVn: 'Cứ mỗi lần liếc nhìn đồng hồ là lòng lại càng nóng như lửa đốt.',
            nativeNuance: '焦りが募る (nỗi bồn chồn ngày càng dâng cao) là cụm miêu tả tâm lý chuẩn văn học.',
          },
          {
            kanji: '雷を落とされた後の重苦しい空気',
            furigana: 'かみなりを おとされた あとの おもくるしい くうき',
            romaji: 'kaminari o otosareta ato no omokurushii kūki',
            pitchCode: '[4]+[2]+[1]',
            pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'H', 'L', 'L', 'H', 'L', 'L', 'H', 'L', 'L'],
            meaningVn: 'Bầu không khí nặng như chì sau khi bị sếp nổi trận lôi đình',
            exampleJp: '課長に雷を落とされ席に戻りにくい。',
            exampleFurigana: 'かちょうに かみなりを おとされ せきに もどりにくい。',
            exampleVn: 'Bị trưởng phòng giáng một trận sấm sét xong ngại chẳng dám quay về chỗ.',
            nativeNuance: 'Quán dụng ngữ sống động: 雷を落とす (trút sấm sét = mắng xối xả).',
          },
          {
            kanji: '再発防止に向けた具体策',
            furigana: 'さいはつぼうしに むけた ぐたいさく',
            romaji: 'saihatsu bōshi ni muketa gutaisaku',
            pitchCode: '[5]+[0]+[2]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'L', 'H', 'L', 'L'],
            meaningVn: 'Giải pháp cụ thể nhằm ngăn ngừa việc tái diễn',
            exampleJp: '同じミスを防ぐため再発防止策を出す。',
            exampleFurigana: 'おなじ ミスを ふせぐため さいはつぼうしさくを だす。',
            exampleVn: 'Trình phương án phòng ngừa để không bao giờ lặp lại lỗi cũ.',
            nativeNuance: 'Người Nhật coi trọng 再発防止 (không tái phạm) hơn vạn lời hứa suông.',
          },
        ],
        verbPhrases: [
          {
            kanji: '到着予定時刻を一報入れる',
            furigana: 'とうちゃくよていじこくを いっぽう いれる',
            romaji: 'tōchaku yotei jikoku o ippō ireru',
            pitchCode: '[7]+[0]+[0]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'H'],
            meaningVn: 'Nhắn/gọi báo trước một tiếng về khung giờ dự kiến sẽ có mặt',
            exampleJp: '電車に乗る前に上司へ一報入れた。',
            exampleFurigana: 'でんしゃに のる まえに じょうしへ いっぽう いれた。',
            exampleVn: 'Trước khi bước lên tàu tôi đã gọi báo ngay một tiếng cho sếp biết giờ đến.',
            nativeNuance: '一報入れる (いっぽう いれる = báo ngắn một tin) cực kỳ tự nhiên.',
          },
          {
            kanji: '厳重注意を受けて肝に銘じる',
            furigana: 'げんじゅう ちゅういを うけて きもに めいじる',
            romaji: 'genjū chūi o ukete kimo ni meijiru',
            pitchCode: '[0]+[1]+[2]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'L', 'H', 'H', 'L'],
            meaningVn: 'Chịu cảnh cáo nghiêm khắc và khắc cốt ghi tâm làm bài học',
            exampleJp: '指摘された言葉を深く肝に銘じた。',
            exampleFurigana: 'してきされた ことばを ふかく きもに めいじた。',
            exampleVn: 'Ghi sâu từng lời sếp góp ý vào trong tâm khảm.',
            nativeNuance: '肝に銘じる (khắc vào gan = ghi nhớ sâu sắc suốt đời) là quán dụng ngữ chuẩn.',
          },
          {
            kanji: '誠実な態度で信頼を取り戻す',
            furigana: 'せいじつな たいどで しんらいを とりもどす',
            romaji: 'seijitsu na taido de shinrai o torimodosu',
            pitchCode: '[0]+[1]+[4]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'L', 'H', 'H', 'L'],
            meaningVn: 'Lấy lại sự tín nhiệm bằng thái độ làm việc chân thành',
            exampleJp: '日々の積み重ねで信頼を取り戻すしかない。',
            exampleFurigana: 'ひびの つみかさねで しんらいを とりもどすしかない。',
            exampleVn: 'Chỉ còn cách nỗ lực từng ngày để từng bước giành lại lòng tin.',
            nativeNuance: 'Động từ 取り戻す kết hợp với 信頼 là cặp collocation tuyệt đối chuẩn mực.',
          },
        ],
      },
    ],
  },
  {
    matchTokens: ['tỏ tình', 'từ chối khéo', 'từ chối lời tỏ tình', '告白', '断る'],
    xray: {
      contextTitle: 'Từ chối khéo lời tỏ tình & Giữ vẹn tình cảm bạn bè',
      japaneseSceneTag: '告白をやんわり断る',
      complexityTier: 'Tâm lý & Quan hệ xã hội tinh tế (Omoiyari)',
      physicalActions: [
        'Lắng nghe trọn vẹn lời bày tỏ, không cắt ngang hay cười gượng',
        'Thể hiện sự cảm kích chân thành trước tình cảm của đối phương',
        'Nói rõ ranh giới một cách dịu dàng để không gieo hy vọng hão huyền',
      ],
      psychologicalStates: [
        'Trân trọng dũng khí của người kia nhưng vẫn kiên quyết giữ lòng trung thực',
        'Tinh tế dùng từ mềm mại (やんわり) giảm sát thương nhưng không mập mờ',
      ],
      storyThreadSummary:
        'Đón nhận tấm lòng với sự trân trọng chân thành, sau đó khéo léo đặt lại ranh giới bạn bè để không làm tổn thương tự tôn của người đối diện.',
    },
    initialAngle: 'Ngóc ngách #1 · Cảm kích chân thành & Từ chối dịu dàng không mập mờ',
    keywords: [
      {
        kanji: 'やんわり',
        furigana: 'やんわり',
        romaji: 'yanwari',
        pitchCode: '[3] Trung cao (Nakadaka)',
        pitchPattern: ['L', 'H', 'H', 'L'],
        meaningVn: 'Một cách nhẹ nhàng, uyển chuyển, êm ái',
        exampleJp: '相手の気持ちを考えやんわり断る。',
        exampleFurigana: 'あいての きもちを かんがえ やんわり ことわる。',
        exampleVn: 'Nghĩ cho cảm xúc của người kia nên khéo léo từ chối thật nhẹ nhàng.',
        nativeNuance: 'Phó từ đắt giá nhất đi với 断る / 伝える khi không muốn làm đối phương đau lòng.',
      },
      {
        kanji: '恋愛対象',
        furigana: 'れんあいたいしょう',
        romaji: 'ren’ai taishō',
        pitchCode: '[5] Trung cao (Nakadaka)',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L'],
        meaningVn: 'Đối tượng để yêu đương / tiến tới tình cảm đôi lứa',
        exampleJp: '今は恋愛対象として見られない。',
        exampleFurigana: 'いまは れんあいたいしょうとして みられない。',
        exampleVn: 'Hiện tại mình chưa thể nhìn bạn như đối tượng yêu đương được.',
        nativeNuance: 'Cụm từ lịch sự, rõ ràng phổ biến nhất trong hội thoại tình cảm Nhật.',
      },
      {
        kanji: '思わせぶり',
        furigana: 'おもわせぶり',
        romaji: 'omowaseburi',
        pitchCode: '[5] Trung cao (Nakadaka)',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L'],
        meaningVn: 'Thái độ lập lờ thả thính gây hiểu lầm hy vọng',
        exampleJp: '思わせぶりな返事はかえって残酷だ。',
        exampleFurigana: 'おもわせぶりな へんじは かえって ざんこくだ。',
        exampleVn: 'Trả lời mập mờ lập lờ ngược lại còn tàn nhẫn hơn với họ.',
        nativeNuance: 'Người Nhật đánh giá cao sự ân cần nhưng ghét thái độ 思わせぶり khi từ chối.',
      },
    ],
    nounPhrases: [
      {
        kanji: '気まずさを残さない配慮',
        furigana: 'きまずさを のこさない はいりょ',
        romaji: 'kimazusa o nokosanai hairyo',
        pitchCode: '[0]+[2]+[1]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'L', 'L'],
        meaningVn: 'Sự tinh tế quan tâm để không đọng lại ngượng ngùng về sau',
        exampleJp: '気まずさを残さない配慮が必要だ。',
        exampleFurigana: 'きまずさを のこさない はいりょが ひつようだ。',
        exampleVn: 'Cần sự khéo léo tinh tế để sau này gặp lại đỡ gượng gạo.',
        nativeNuance: '配慮 (thấu cảm chu toàn) là cốt lõi của giao tiếp tình cảm Nhật Bản.',
      },
      {
        kanji: '友達としての大切な関係',
        furigana: 'ともだちとしての たいせつな かんけい',
        romaji: 'tomodachi to shite no taisetsu na kankei',
        pitchCode: '[0]+[0]+[0]',
        pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'H', 'H', 'H'],
        meaningVn: 'Mối quan hệ quý giá dưới danh nghĩa bạn bè',
        exampleJp: '友達としての関係を壊したくない。',
        exampleFurigana: 'ともだちとしての かんけいを こわしたくない。',
        exampleVn: 'Mình không muốn đánh mất tình bạn tốt đẹp giữa hai đứa.',
        nativeNuance: 'Cách kéo ranh giới quen thuộc và mềm mại nhất tại Nhật.',
      },
      {
        kanji: '相手の勇気への感謝',
        furigana: 'あいての ゆうきへの かんしゃ',
        romaji: 'aite no yūki e no kansha',
        pitchCode: '[3]+[1]+[1]',
        pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'L', 'L'],
        meaningVn: 'Lời cảm ơn dành cho sự can đảm mở lòng của đối phương',
        exampleJp: 'まずは勇気を出してくれたことに感謝する。',
        exampleFurigana: 'まずは ゆうきを だしてくれた ことに かんしゃする。',
        exampleVn: 'Trước hết phải cảm ơn vì người ấy đã lấy hết can đảm nói ra.',
        nativeNuance: 'Quy tắc vàng: luôn mở đầu bằng lời cảm ơn (ありがとう / 嬉しい) trước khi từ chối.',
      },
    ],
    verbPhrases: [
      {
        kanji: '相手のプライドを傷つけずに断る',
        furigana: 'あいての プライドを きずつけずに ことわる',
        romaji: 'aite no puraido o kizutsukezu ni kotowaru',
        pitchCode: '[3]+[0]+[4]+[3]',
        pitchPattern: ['L', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'L', 'H', 'H', 'L', 'L'],
        meaningVn: 'Từ chối mà không làm tổn thương lòng tự trọng của người kia',
        exampleJp: '相手のプライドを傷つけないよう言葉を選ぶ。',
        exampleFurigana: 'あいての プライドを きずつけないよう ことばを えらぶ。',
        exampleVn: 'Cân nhắc từng câu chữ để không làm sứt mẻ lòng tự tôn của bạn ấy.',
        nativeNuance: '言葉を選ぶ (chọn lọc ngôn từ cẩn trọng) là kỹ năng tâm lý tinh tế.',
      },
      {
        kanji: '期待を持たせずに気持ちを伝える',
        furigana: 'きたいを もたせずに きもちを つたえる',
        romaji: 'kitai o motasezu ni kimochi o tsutaeru',
        pitchCode: '[0]+[3]+[0]+[0]',
        pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'L', 'H', 'H', 'H'],
        meaningVn: 'Nói rõ lòng mình dứt khoát nhưng êm ái để không gây hy vọng ảo',
        exampleJp: '余計な期待を持たせない方が誠実だ。',
        exampleFurigana: 'よけいな きたいを もたせない ほうが せいじつだ。',
        exampleVn: 'Không gieo hy vọng thừa thãi mới là cách cư xử chân thành nhất.',
        nativeNuance: '期待を持たせる (gieo kỳ vọng) là điều nên tránh khi xác định không tiến xa hơn.',
      },
      {
        kanji: 'これからも良い友達でいたいと添える',
        furigana: 'これからも いい ともだちで いたいと そえる',
        romaji: 'kore kara mo ii tomodachi de itai to soeru',
        pitchCode: '[0]+[1]+[0]+[2]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'H', 'L', 'H', 'L'],
        meaningVn: 'Nói thêm lời mong muốn từ nay về sau vẫn giữ làm bạn tốt',
        exampleJp: '最後に良い友達でいたいと優しく添えた。',
        exampleFurigana: 'さいごに いい ともだちで いたいと やさしく そえた。',
        exampleVn: 'Cuối câu tôi dịu dàng nói thêm rằng vẫn mong cả hai mãi là bạn tốt.',
        nativeNuance: 'Động từ 添える (đặt kèm, nói thêm một ý nhẹ) tạo âm hưởng vô cùng ấm áp.',
      },
    ],
    deepDiveBatches: [
      {
        angleLabel: 'Ngóc ngách #2 · Gặp lại sau khi từ chối, xin thời gian suy nghĩ & câu thoại mẫu',
        keywords: [
          {
            kanji: '脈なし',
            furigana: 'みゃくなし',
            romaji: 'myakunashi',
            pitchCode: '[2] Trung cao (Nakadaka)',
            pitchPattern: ['L', 'H', 'L', 'L'],
            meaningVn: 'Không có tín hiệu bật đèn xanh / vô vọng trong tình cảm',
            exampleJp: '脈なしだと悟って身を引いた。',
            exampleFurigana: 'みゃくなしだと さとって みを ひいた。',
            exampleVn: 'Nhận ra đối phương không có tình ý nên chủ động rút lui.',
            nativeNuance: 'Khẩu ngữ giới trẻ Nhật cực phổ biến: 脈あり (có hy vọng) vs 脈なし (hết cửa).',
          },
          {
            kanji: '保留',
            furigana: 'ほりゅう',
            romaji: 'horyū',
            pitchCode: '[0] Bình bản (Heiban)',
            pitchPattern: ['L', 'H', 'H'],
            meaningVn: 'Sự tạm gác câu trả lời lại để suy nghĩ thêm',
            exampleJp: '返事を保留にすると相手が苦しむ。',
            exampleFurigana: 'へんじを ほりゅうに すると あいてが くるしむ。',
            exampleVn: 'Cứ treo câu trả lời lơ lửng không đáp thì người kia càng day dứt.',
            nativeNuance: 'Nếu đã chắc chắn không thích thì nên trả lời rõ thay vì 保留 kéo dài.',
          },
          {
            kanji: '誠意',
            furigana: 'せいい',
            romaji: 'seii',
            pitchCode: '[1] Đầu cao (Atamadaka)',
            pitchPattern: ['H', 'L', 'L'],
            meaningVn: 'Tấm lòng chân thành, ngay thẳng',
            exampleJp: '誠意を持って向き合うことが大切だ。',
            exampleFurigana: 'せいいを もって むきあう ことが たいせつだ。',
            exampleVn: 'Điều quan trọng nhất là đối diện bằng tất cả sự chân thành.',
            nativeNuance: 'Collocation chuẩn: 誠意を見せる / 誠意を持って対応する.',
          },
        ],
        nounPhrases: [
          {
            kanji: '気遣いゆえの遠回しな表現',
            furigana: 'きづかい ゆえの とおまわしな ひょうげん',
            romaji: 'kidzukai yue no tōmawashi na hyōgen',
            pitchCode: '[2]+[0]+[3]',
            pitchPattern: ['L', 'H', 'L', 'L', 'L', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'L'],
            meaningVn: 'Cách nói vòng tránh nhẹ nhàng xuất phát từ lòng quan tâm',
            exampleJp: '遠回しな表現だと真意が伝わらないこともある。',
            exampleFurigana: 'とおまわしな ひょうげんだと しんいが つたわらない こともある。',
            exampleVn: 'Nhiều lúc nói vòng vo quá mức lại khiến người nghe không hiểu đúng ý thật.',
            nativeNuance: 'Ranh giới mỏng manh giữa khéo léo (気遣い) và thiếu rõ ràng (遠回し).',
          },
          {
            kanji: '失恋のショックを引きずる相手',
            furigana: 'しつれんの ショックを ひきずる あいて',
            romaji: 'shitsuren no shokku o hikizuru aite',
            pitchCode: '[0]+[1]+[0]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'L', 'H', 'H', 'H', 'L'],
            meaningVn: 'Người kia vẫn còn vương vấn nỗi buồn thất tình chưa nguôi',
            exampleJp: 'しばらく相手と適度な距離を保つ。',
            exampleFurigana: 'しばらく あいてと てきどな きょりを たもつ。',
            exampleVn: 'Tạm thời giữ khoảng cách vừa phải một thời gian để người ấy nguôi ngoai.',
            nativeNuance: 'Động từ 引きずる diễn tả nỗi buồn kéo dài dai dẳng rất chuẩn xác.',
          },
          {
            kanji: '前向きに恋を諦められる一言',
            furigana: 'まえむきに こいを あきらめられる ひとこと',
            romaji: 'maemuki ni koi o akiramerareru hitokoto',
            pitchCode: '[0]+[1]+[4]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'L', 'H', 'L'],
            meaningVn: 'Một câu nói ấm áp giúp đối phương thanh thản buông bỏ',
            exampleJp: 'きれいな区切りがつく一言を掛けた。',
            exampleFurigana: 'きれいな くぎりが つく ひとことを かけた。',
            exampleVn: 'Dành một lời dứt khoát nhưng dịu dàng để khép lại thật đẹp.',
            nativeNuance: '区切りがつく (tạo dấu chấm hết trọn vẹn, không day dứt) là khái niệm đẹp trong tiếng Nhật.',
          },
        ],
        verbPhrases: [
          {
            kanji: 'お気持ちはとても嬉しいと前置きする',
            furigana: 'おきもちは とても うれしいと まえおきする',
            romaji: 'okimochi wa totemo ureshii to maeoki suru',
            pitchCode: '[0]+[0]+[3]+[0]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'H'],
            meaningVn: 'Mở đầu câu bằng lời trân trọng rằng mình rất vui vì tình cảm đó',
            exampleJp: '「嬉しいよ」と前置きしてから本題に入る。',
            exampleFurigana: '「うれしいよ」と まえおきしてから ほんだいに はいる。',
            exampleVn: 'Mở lời cảm kích trước rồi mới nhẹ nhàng đi vào ý từ chối.',
            nativeNuance: 'Kỹ thuật 前置きする (làm lớp đệm mở đầu) chuẩn phong cách giao tiếp Nhật.',
          },
          {
            kanji: '恋愛に気持ちが向かないと打ち明ける',
            furigana: 'れんあいに きもちが むかないと うちあける',
            romaji: 'ren’ai ni kimochi ga mukanai to uchiakeru',
            pitchCode: '[0]+[0]+[0]+[4]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'L'],
            meaningVn: 'Thú nhận chân thành rằng lòng mình hiện không hướng tới chuyện yêu đương',
            exampleJp: '今は仕事優先で恋に気持ちが向かないと伝えた。',
            exampleFurigana: 'いまは しごとゆうせんで こいに きもちが むかないと つたえた。',
            exampleVn: 'Thẳng thắn chia sẻ rằng hiện tại tâm trí đang dồn cho công việc chưa nghĩ tới chuyện yêu.',
            nativeNuance: 'Đổ lý do vào trạng thái cá nhân ("lòng chưa hướng tới") tránh chê bai đối phương.',
          },
          {
            kanji: '以前と変わらぬ距離感で接する',
            furigana: 'いぜんと かわらぬ きょりかんで せっする',
            romaji: 'izen to kawaranu kyori-kan de sessuru',
            pitchCode: '[1]+[0]+[2]',
            pitchPattern: ['H', 'L', 'L', 'L', 'L', 'H', 'H', 'H', 'L', 'L', 'L', 'H', 'H'],
            meaningVn: 'Tiếp xúc lại với cự ly tự nhiên bình thường như trước đây',
            exampleJp: '翌日も変に避けず自然に接した。',
            exampleFurigana: 'よくじつも へんに さけず しぜんに せっした。',
            exampleVn: 'Hôm sau gặp lại cũng không né tránh gượng gạo mà cư xử tự nhiên.',
            nativeNuance: 'Không bơ đẹp hay tỏ thái độ khó xử là phép lịch sự tối cao hậu tỏ tình.',
          },
        ],
      },
    ],
  },
  {
    matchTokens: ['thuyết trình', 'báo cáo tài chính', 'phản bác', 'tranh luận với sếp', 'プレゼン', '財務'],
    xray: {
      contextTitle: 'Thuyết trình Báo cáo Tài chính & Bị cấp trên phản bác gay gắt',
      japaneseSceneTag: '財務報告プレゼンと上司からの鋭い指摘',
      complexityTier: 'Công sở B2B thượng đỉnh · Ứng biến áp lực cao (N1)',
      physicalActions: [
        'Trình chiếu biểu đồ doanh thu, biên lợi nhuận và dòng tiền trước ban lãnh đạo',
        'Đón nhận câu hỏi chất vấn sắc bén về tính khả thi của giả định số liệu',
        'Ghi nhận phản hồi bằng thái độ điềm tĩnh và đưa ra phương án đối chứng dữ liệu',
      ],
      psychologicalStates: [
        'Bị bất ngờ trước phản bác trực diện nhưng tuyệt đối không cãi tay đôi theo cảm tính',
        'Vận dụng Cushion Kotoba để thừa nhận góc nhìn của sếp trước khi bảo vệ luận điểm bằng số liệu',
      ],
      storyThreadSummary:
        'Giữa buổi thuyết trình số liệu tài chính, sếp đặt nghi vấn thẳng vào căn cứ tính toán; bình tĩnh tiếp thu ý kiến, dùng đệm từ lịch sự rồi chứng minh lại bằng dẫn chứng thực tế.',
    },
    initialAngle: 'Ngóc ngách #1 · Bảo vệ số liệu & Phản hồi khi bị chất vấn trực diện',
    keywords: [
      {
        kanji: '根拠',
        furigana: 'こんきょ',
        romaji: 'konkyo',
        pitchCode: '[1] Đầu cao (Atamadaka)',
        pitchPattern: ['H', 'L', 'L'],
        meaningVn: 'Căn cứ thực chứng, cơ sở dữ liệu chứng minh',
        exampleJp: 'その数値の根拠を明確に示す。',
        exampleFurigana: 'その すうちの こんきょを めいかくに しめす。',
        exampleVn: 'Trình bày rõ ràng cơ sở tính toán đằng sau con số đó.',
        nativeNuance: 'Sếp Nhật phản bác báo cáo tài chính gần như luôn hỏi về 根拠.',
      },
      {
        kanji: '見通し',
        furigana: 'みとおし',
        romaji: 'mitōshi',
        pitchCode: '[0] Bình bản (Heiban)',
        pitchPattern: ['L', 'H', 'H', 'H', 'H'],
        meaningVn: 'Triển vọng, dự báo dòng tiền / kết quả tương lai',
        exampleJp: '来期の収益見通しが甘すぎる。',
        exampleFurigana: 'らいきの しゅうえきみとおしが あますぎる。',
        exampleVn: 'Dự báo doanh thu kỳ tới đang quá lạc quan thiếu chặt chẽ.',
        nativeNuance: '見通しが甘い (dự báo quá ngây thơ/lỏng lẻo) là câu phê bình kinh điển.',
      },
      {
        kanji: '指摘',
        furigana: 'してき',
        romaji: 'shiteki',
        pitchCode: '[0] Bình bản (Heiban)',
        pitchPattern: ['L', 'H', 'H', 'H'],
        meaningVn: 'Điểm sếp chỉ ra, lời chất vấn góp ý trúng huyệt',
        exampleJp: '部長のご指摘は全くその通りです。',
        exampleFurigana: 'ぶちょうの ごしてきは まったく そのとおりです。',
        exampleVn: 'Điểm trưởng phòng vừa chỉ ra hoàn toàn xác đáng ạ.',
        nativeNuance: 'Luôn gọi lời phản bác của cấp trên là ご指摘 (không dùng 反対 hay 批判).',
      },
      {
        kanji: '試算',
        furigana: 'しさん',
        romaji: 'shisan',
        pitchCode: '[0] Bình bản (Heiban)',
        pitchPattern: ['L', 'H', 'H'],
        meaningVn: 'Phép tính thử / mô hình ước tính tài chính',
        exampleJp: '最悪のケースを想定して試算する。',
        exampleFurigana: 'さいあくの ケースを そうていして しさんする。',
        exampleVn: 'Ước tính lại bảng số liệu dựa trên kịch bản xấu nhất.',
        nativeNuance: 'Từ chuyên môn tài chính dùng hàng ngày trong phòng họp Nhật.',
      },
    ],
    nounPhrases: [
      {
        kanji: '説得力に欠ける甘い予測',
        furigana: 'せっとくりょくに かける あまい よそく',
        romaji: 'settokuryoku ni kakeru amai yosoku',
        pitchCode: '[3]+[2]+[2]+[0]',
        pitchPattern: ['L', 'H', 'H', 'L', 'L', 'L', 'H', 'L', 'L', 'H', 'L', 'L', 'H', 'H', 'H'],
        meaningVn: 'Bản dự báo còn lỏng lẻo, thiếu sức thuyết phục',
        exampleJp: '説得力に欠ける予測は差し戻される。',
        exampleFurigana: 'せっとくりょくに かける よそくは さしもどされる。',
        exampleVn: 'Bản dự báo thiếu cơ sở thuyết phục sẽ bị trả về làm lại ngay.',
        nativeNuance: '～に欠ける (thiếu hụt yếu tố gì) cực hay dùng trong nhận xét chuyên môn.',
      },
      {
        kanji: '客観的な裏付けデータ',
        furigana: 'きゃっかんてきな うらづけデータ',
        romaji: 'kyakkanteki na uradzuke dēta',
        pitchCode: '[0]+[0]+[1]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'H', 'H', 'L', 'L'],
        meaningVn: 'Dữ liệu chứng minh khách quan làm chỗ dựa cho báo cáo',
        exampleJp: '裏付けデータを添えて反論をかわす。',
        exampleFurigana: 'うらづけデータを そえて はんろんを かわす。',
        exampleVn: 'Đưa kèm số liệu chứng thực để hóa giải thắc mắc phản bác.',
        nativeNuance: '裏付け (chứng cứ hậu thuẫn phía sau) đắt giá hơn 証拠 trong kinh doanh.',
      },
      {
        kanji: 'リスクを織り込んだ修正案',
        furigana: 'リスクを おりこんだ しゅうせいあん',
        romaji: 'risuku o orikonda shūseian',
        pitchCode: '[1]+[3]+[3]',
        pitchPattern: ['H', 'L', 'L', 'L', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'L', 'L'],
        meaningVn: 'Phương án điều chỉnh đã tính gộp sẵn các rủi ro',
        exampleJp: 'リスクを織り込んだ修正案を提示する。',
        exampleFurigana: 'リスクを おりこんだ しゅうせいあんを ていじする。',
        exampleVn: 'Đệ trình phương án sửa đổi đã lường trước biên độ rủi ro.',
        nativeNuance: 'Động từ 織り込む (dệt lồng vào) là collocation kinh tế cực kỳ tự nhiên.',
      },
    ],
    verbPhrases: [
      {
        kanji: 'ご指摘を踏まえて補足説明する',
        furigana: 'ごしてきを ふまえて ほそくせつめいする',
        romaji: 'goshiteki o fumaete hosoku setsumei suru',
        pitchCode: '[0]+[2]+[0]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'H', 'H', 'H'],
        meaningVn: 'Tiếp thu ý kiến phản bác của sếp để giải thích bổ sung làm rõ thêm',
        exampleJp: 'ご指摘を踏まえて一点補足いたします。',
        exampleFurigana: 'ごしてきを ふまえて いってん ほそくいたします。',
        exampleVn: 'Dựa trên góp ý của anh, tôi xin phép giải trình bổ sung thêm một điểm.',
        nativeNuance: 'Cấu trúc vàng 10 điểm công sở Nhật: vừa nể sếp vừa bảo vệ được lập luận.',
      },
      {
        kanji: '感情的にならず冷静に切り返す',
        furigana: 'かんじょうてきに ならず れいせいに きりかえす',
        romaji: 'kanjōteki ni narazu reisei ni kirikaesu',
        pitchCode: '[0]+[2]+[0]+[3]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'H', 'L', 'H', 'H', 'L'],
        meaningVn: 'Không nổi nóng cảm tính mà điềm tĩnh phản hồi lại sắc bén',
        exampleJp: '鋭い質問にも冷静に切り返した。',
        exampleFurigana: 'するどい しつもんにも れいせいに きりかえした。',
        exampleVn: 'Trước câu hỏi hóc búa anh ấy vẫn điềm tĩnh đối đáp đâu ra đấy.',
        nativeNuance: '切り返す (đỡ đòn rồi phản công mượt mà) sắc thái cao hơn 反論する.',
      },
      {
        kanji: '確認のうえ改めてご報告いたします',
        furigana: 'かくにんの うえ あらためて ごほうこく いたします',
        romaji: 'kakunin no ue aratamete gohōkoku itashimasu',
        pitchCode: '[0]+[3]+[0]',
        pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'H', 'H'],
        meaningVn: 'Xin phép kiểm chứng lại số liệu rồi báo cáo lại đầy đủ sau (khi chưa có đáp án ngay)',
        exampleJp: '詳細を確認のうえ改めてご報告します。',
        exampleFurigana: 'しょうさいを かくにんの うえ あらためて ごほうこくします。',
        exampleVn: 'Xin phép kiểm tra lại chi tiết rồi tôi sẽ báo cáo lại ngay ạ.',
        nativeNuance: 'Câu cứu nguy chuẩn mực tuyệt đối: tuyệt đối không đoán mò số liệu trước sếp.',
      },
    ],
    deepDiveBatches: [
      {
        angleLabel: 'Ngóc ngách #2 · Sếp yêu cầu làm lại số liệu, áp lực phòng họp & chốt cam kết',
        keywords: [
          {
            kanji: '精査',
            furigana: 'せいさ',
            romaji: 'seisa',
            pitchCode: '[1] Đầu cao (Atamadaka)',
            pitchPattern: ['H', 'L', 'L'],
            meaningVn: 'Sự rà soát kiểm định kỹ lưỡng từng chi tiết',
            exampleJp: '経費の内訳をもう一度精査する。',
            exampleFurigana: 'けいひの うちわけを もういちど せいさする。',
            exampleVn: 'Rà soát tỉ mỉ lại một lần nữa bảng kê chi tiết chi phí.',
            nativeNuance: 'Từ N1 chuyên nghiệp hơn チェック trong văn phong tài chính.',
          },
          {
            kanji: '乖離',
            furigana: 'かいり',
            romaji: 'kairi',
            pitchCode: '[1] Đầu cao (Atamadaka)',
            pitchPattern: ['H', 'L', 'L'],
            meaningVn: 'Độ vênh, khoảng cách chênh lệch giữa dự báo và thực tế',
            exampleJp: '予算と実績に大きな乖離がある。',
            exampleFurigana: 'よさんと じっせきに おおきな かいりが ある。',
            exampleVn: 'Có độ chênh lệch lớn giữa ngân sách dự toán và số thực tế.',
            nativeNuance: 'Thuật ngữ sắc bén khi giải trình chênh lệch tài chính.',
          },
          {
            kanji: '詰め',
            furigana: 'つめ',
            romaji: 'tsume',
            pitchCode: '[2] Đuôi cao (Odaka)',
            pitchPattern: ['L', 'H'],
            meaningVn: 'Khâu chốt hạ hoàn thiện cuối cùng cho kín kẽ',
            exampleJp: '事前準備の詰めが甘かったと痛感する。',
            exampleFurigana: 'じぜんじゅんびの つめが あまかったと つうかんする。',
            exampleVn: 'Thấm thía rằng khâu rà soát chốt cuối trước buổi họp vẫn còn sơ hở.',
            nativeNuance: 'Cụm cố định: 詰めが甘い (đoạn kết vẫn còn non/hở sườn).',
          },
        ],
        nounPhrases: [
          {
            kanji: '会議室に漂う張り詰めた空気',
            furigana: 'かいぎしつに ただよう はりつめた くうき',
            romaji: 'kaigishitsu ni tadayou haritsumeta kūki',
            pitchCode: '[3]+[3]+[4]+[1]',
            pitchPattern: ['L', 'H', 'H', 'L', 'L', 'L', 'H', 'L', 'L', 'H', 'H', 'L', 'H', 'L', 'L'],
            meaningVn: 'Bầu không khí căng như dây đàn bao trùm phòng họp',
            exampleJp: '指摘を受け張り詰めた空気が流れた。',
            exampleFurigana: 'してきを うけ はりつめた くうきが ながれた。',
            exampleVn: 'Sau lời chất vấn của sếp, cả phòng họp rơi vào im lặng căng thẳng.',
            nativeNuance: '張り詰めた空気 (không khí căng chặt) cực chuẩn văn phong miêu tả.',
          },
          {
            kanji: '別の角度からの検証結果',
            furigana: 'べつの かくどからの けんしょうけっか',
            romaji: 'betsu no kakudo kara no kenshō kekka',
            pitchCode: '[0]+[1]+[0]',
            pitchPattern: ['L', 'H', 'H', 'H', 'L', 'L', 'L', 'H', 'H', 'H', 'H', 'H'],
            meaningVn: 'Kết quả kiểm chứng đối chiếu từ một góc độ khác',
            exampleJp: '別の角度からの検証結果をお見せします。',
            exampleFurigana: 'べつの かくどからの けんしょうけっかを おみせします。',
            exampleVn: 'Tôi xin phép trình chiếu kết quả đối chiếu từ một lát cắt khác ạ.',
            nativeNuance: 'Cụm chuyển hướng giải trình mượt mà không gây đối đầu.',
          },
          {
            kanji: '現実的な着地点の見極め',
            furigana: 'げんじつてきな ちゃくちてんの みきわめ',
            romaji: 'genjitsuteki na chakuchiten no mikiwame',
            pitchCode: '[0]+[4]+[0]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'H'],
            meaningVn: 'Việc xác định điểm hạ cánh thực tế khả thi cho ngân sách',
            exampleJp: '現実的な着地点を今すぐ見極めたい。',
            exampleFurigana: 'げんじつてきな ちゃくちてんを いま すぐ みきわめたい。',
            exampleVn: 'Tôi muốn cùng chốt ngay phương án khả thi thực tế nhất lúc này.',
            nativeNuance: '着地点 (điểm hạ cánh / mức dung hòa hợp lý) rất hay dùng trong họp bàn.',
          },
        ],
        verbPhrases: [
          {
            kanji: '一理あると認めたうえで本論を守る',
            furigana: 'いちり あると みとめたうえで ほんろんを まもる',
            romaji: 'ichiri aru to mitometa ue de honron o mamoru',
            pitchCode: '[2]+[0]+[1]+[2]',
            pitchPattern: ['L', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'L', 'H', 'L', 'L'],
            meaningVn: 'Ghi nhận ý sếp có lý rồi mới bảo vệ trục lập luận chính',
            exampleJp: '相手にも一理あると認める姿勢が大切だ。',
            exampleFurigana: 'あいてにも いちり あると みとめる しせいが たいせつだ。',
            exampleVn: 'Thái độ biết công nhận phần có lý trong góc nhìn của người đối diện rất quan trọng.',
            nativeNuance: 'Kỹ thuật "Yes, and..." kiểu Nhật giúp giảm xung đột trong phản biện.',
          },
          {
            kanji: 'データの整合性を一から洗い直す',
            furigana: 'データの せいごうせいを いちから あらいなおす',
            romaji: 'dēta no seigōsei o ichi kara arainaosu',
            pitchCode: '[1]+[0]+[2]+[5]',
            pitchPattern: ['H', 'L', 'L', 'L', 'H', 'H', 'H', 'L', 'H', 'L', 'H', 'H', 'H', 'L'],
            meaningVn: 'Rà soát kiểm tra lại toàn bộ tính nhất quán của dữ liệu từ đầu',
            exampleJp: '指摘を受け数値を一から洗い直した。',
            exampleFurigana: 'してきを うけ すうちを いちから あらいなおした。',
            exampleVn: 'Tiếp thu góp ý, tôi đã rà lại toàn bộ tính khớp nối số liệu từ bước đầu.',
            nativeNuance: '洗い直す (gột rửa xét lại tận gốc) là collocation công việc cực đắt.',
          },
          {
            kanji: '提出期限までに資料をブラッシュアップする',
            furigana: 'ていしゅつきげんまでに しりょうを ブラッシュアップする',
            romaji: 'teishutsu kigen made ni shiryō o burasshuappu suru',
            pitchCode: '[5]+[1]+[4]',
            pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'H', 'L', 'L'],
            meaningVn: 'Chau chuốt nâng cấp lại tài liệu báo cáo trước hạn nộp',
            exampleJp: '明日朝までに資料をブラッシュアップします。',
            exampleFurigana: 'あした あさまでに しりょうを ブラッシュアップします。',
            exampleVn: 'Trước sáng mai tôi sẽ chỉnh sửa hoàn thiện sắc bén lại bản báo cáo này ạ.',
            nativeNuance: 'ブラッシュアップ (brush up) được dùng như từ thuần trong văn phòng Tokyo.',
          },
        ],
      },
    ],
  },
];

// ============================================================================
// LIGHTWEIGHT TRI-CORE SCHEMAS & PREDICTIVE CACHE ENGINE (ZERO-LATENCY)
// ============================================================================

const ITEM_SCHEMA = {
  type: 'OBJECT',
  properties: {
    kanji: { type: 'STRING' },
    furigana: { type: 'STRING' },
    romaji: { type: 'STRING' },
    pitchCode: { type: 'STRING' },
    pitchPattern: { type: 'ARRAY', items: { type: 'STRING' } },
    meaningVn: { type: 'STRING' },
    exampleJp: { type: 'STRING' },
    exampleFurigana: { type: 'STRING' },
    exampleVn: { type: 'STRING' },
    nativeNuance: { type: 'STRING' },
  },
  required: [
    'kanji',
    'furigana',
    'romaji',
    'pitchCode',
    'pitchPattern',
    'meaningVn',
    'exampleJp',
    'exampleFurigana',
    'exampleVn',
    'nativeNuance',
  ],
};

const THREAD_KEYWORDS_XRAY_SCHEMA = {
  type: 'OBJECT',
  properties: {
    xray: {
      type: 'OBJECT',
      properties: {
        contextTitle: { type: 'STRING' },
        japaneseSceneTag: { type: 'STRING' },
        complexityTier: { type: 'STRING' },
        physicalActions: { type: 'ARRAY', items: { type: 'STRING' } },
        psychologicalStates: { type: 'ARRAY', items: { type: 'STRING' } },
        storyThreadSummary: { type: 'STRING' },
      },
      required: ['contextTitle', 'japaneseSceneTag', 'complexityTier', 'physicalActions', 'psychologicalStates', 'storyThreadSummary'],
    },
    angleLabel: { type: 'STRING' },
    items: { type: 'ARRAY', items: ITEM_SCHEMA },
  },
  required: ['xray', 'angleLabel', 'items'],
};

const THREAD_SINGLE_LAYER_SCHEMA = {
  type: 'OBJECT',
  properties: {
    angleLabel: { type: 'STRING' },
    items: { type: 'ARRAY', items: ITEM_SCHEMA },
  },
  required: ['angleLabel', 'items'],
};

const SYSTEM_FAST_NLP_CORE = `
Bạn là Lõi NLP Dự phóng Collocation Bản xứ Tốc độ Quang tốc (NHK日本語発音アクセント新辞典, Daijirin, BCCWJ).
Quy tắc tuyệt đối:
1. Chỉ xuất cụm từ 100% người Nhật bản xứ sử dụng tự nhiên; tuyệt đối không bịa cụm ghép word-by-word.
2. Mọi mục PHẢI đủ: kanji, furigana chính xác, romaji (Modified Hepburn), pitchCode (vd "[0] Bình bản"), pitchPattern (mảng "H"/"L" khớp từng mora của furigana), exampleJp SIÊU NGẮN (5–11 từ), exampleFurigana, meaningVn & exampleVn tiếng Việt tinh tế, nativeNuance 1 câu ngắn.
3. Trả JSON thuần hợp lệ đúng schema. Kiểm định ngầm không lặp lại các từ bị cấm.
`;

// Predictive Cache & In-Flight Request Registry
const predictiveCache = new Map<string, OmniContextProjectionResult>();
const inFlightPredictions = new Map<string, Promise<OmniContextProjectionResult>>();

function getCacheKey(query: string, level: JLPTLevel): string {
  return `${query.trim().toLowerCase()}__${level}`;
}

function hydrateItems(
  items: Omit<CollocationArsenalItem, 'id' | 'layer'>[],
  layer: CollocationLayerType,
  prefix: string,
  subAngleLabel?: string
): CollocationArsenalItem[] {
  return items.map((item, idx) => ({
    ...item,
    id: `${prefix}_${layer}_${idx}_${Math.random().toString(36).slice(2, 6)}`,
    layer,
    meaningVn: refineVietnameseMeaning(item.meaningVn),
    exampleVn: refineVietnameseMeaning(item.exampleVn),
    pitchPattern: normalizePitchPattern(item.furigana, item.pitchPattern, item.pitchCode),
    subAngleLabel: item.subAngleLabel || subAngleLabel,
  }));
}

function findCuratedBundle(contextQuery: string): CuratedContextBundle | null {
  const q = contextQuery.toLowerCase().trim();
  if (!q) return null;
  for (const bundle of CURATED_CONTEXT_BUNDLES) {
    if (bundle.matchTokens.some((tok) => q.includes(tok.toLowerCase()))) {
      return bundle;
    }
  }
  return null;
}

function deduplicateLayerItems(
  incoming: CollocationArsenalItem[],
  excludeSet: Set<string>
): CollocationArsenalItem[] {
  const unique: CollocationArsenalItem[] = [];
  for (const item of incoming) {
    const kKey = item.kanji.replace(/\s+/g, '').toLowerCase();
    const fKey = item.furigana.replace(/\s+/g, '').toLowerCase();
    if (!kKey || excludeSet.has(kKey) || (fKey && excludeSet.has(fKey))) {
      continue;
    }
    excludeSet.add(kKey);
    if (fKey) excludeSet.add(fKey);
    unique.push(item);
  }
  return unique;
}

/**
 * Synchronous 0ms lookup: checks Predictive Cache or Curated Zero-Latency Bundles.
 */
export function getInstantPredictiveSeed(
  contextQuery: string,
  level: JLPTLevel = 'N2'
): OmniContextProjectionResult | null {
  const cleanQuery = contextQuery.trim() || 'Đi chợ';
  const cacheKey = getCacheKey(cleanQuery, level);

  const cached = predictiveCache.get(cacheKey);
  if (cached) return cached;

  const curated = findCuratedBundle(cleanQuery);
  if (curated) {
    const result: OmniContextProjectionResult = {
      contextQuery: cleanQuery,
      xray: curated.xray,
      keywords: hydrateItems(curated.keywords, 'keyword', 'cur', curated.initialAngle),
      nounPhrases: hydrateItems(curated.nounPhrases, 'noun_phrase', 'cur', curated.initialAngle),
      verbPhrases: hydrateItems(curated.verbPhrases, 'verb_phrase', 'cur', curated.initialAngle),
      expansionDepth: 1,
      layerDepths: { keyword: 1, noun_phrase: 1, verb_phrase: 1 },
      unlockedAngles: [curated.initialAngle],
      source: 'curated',
    };
    predictiveCache.set(cacheKey, result);
    return result;
  }

  return null;
}

/**
 * Immediate 0ms skeleton/seed so the UI never displays a blocking loading spinner even for brand-new novel contexts.
 */
export function buildInstantPredictiveDraft(
  contextQuery: string,
  level: JLPTLevel = 'N2'
): OmniContextProjectionResult {
  const base = buildProceduralFallbackBundle(contextQuery.trim() || 'Đi chợ');
  return {
    ...base,
    xray: {
      ...base.xray,
      complexityTier: `Xử lý song song 3 luồng (${level})`,
      storyThreadSummary: `Đang đồng bộ 3 luồng Từ vựng · Cụm danh từ · Cụm động từ cho bối cảnh "${contextQuery.trim()}"...`,
    },
  };
}

/**
 * Fires Tri-Core Parallel Threads (Luồng 1 Keywords + X-Ray | Luồng 2 Noun Phrases | Luồng 3 Verb Collocations)
 * concurrently via Promise.allSettled with fastMode=true, streaming each completed layer immediately via callback.
 */
export async function projectCollocationContextParallel(
  contextQuery: string,
  level: JLPTLevel = 'N2',
  onLayerUpdate?: (partial: Partial<OmniContextProjectionResult>) => void
): Promise<OmniContextProjectionResult> {
  const cleanQuery = contextQuery.trim() || 'Đi chợ';
  const cacheKey = getCacheKey(cleanQuery, level);

  // 1. Instant 0ms Curated or Cached hit
  const instant = getInstantPredictiveSeed(cleanQuery, level);
  if (instant) {
    return instant;
  }

  // 2. Join already running Predictive Prefetch if user triggered this while typing
  const existingFlight = inFlightPredictions.get(cacheKey);
  if (existingFlight) {
    const awaited = await existingFlight;
    onLayerUpdate?.(awaited);
    return awaited;
  }

  // 3. Fire 3 Independent Parallel Micro-Threads simultaneously
  const fallbackBase = buildProceduralFallbackBundle(cleanQuery);
  const workingResult: OmniContextProjectionResult = {
    ...fallbackBase,
    source: 'gemini',
  };

  const runParallel = (async (): Promise<OmniContextProjectionResult> => {
    const excludeSet = new Set<string>();

    // Thread 1: X-Ray 360° + 4 Keywords
    const thread1Promise = callGemini(
      `Bối cảnh: "${cleanQuery}" (JLPT ${level}). Quét X-Quang 360° (xray) + ĐÚNG 4 Từ vựng Cốt lõi (danh từ/tính từ thiết yếu nhất) trong mảng items. angleLabel: "Ngóc ngách #1 · Cốt lõi bối cảnh".`,
      SYSTEM_FAST_NLP_CORE,
      undefined,
      false,
      THREAD_KEYWORDS_XRAY_SCHEMA,
      true
    ).then((raw) => {
      const parsed = safeExtractJson<any>(raw, null);
      if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
        const angle = parsed.angleLabel || 'Ngóc ngách #1 · Cốt lõi bối cảnh';
        const hydrated = deduplicateLayerItems(
          hydrateItems(parsed.items, 'keyword', 'p1', angle),
          excludeSet
        );
        if (hydrated.length > 0) {
          workingResult.keywords = hydrated;
          if (parsed.xray) {
            workingResult.xray = {
              contextTitle: parsed.xray.contextTitle || cleanQuery,
              japaneseSceneTag: parsed.xray.japaneseSceneTag || '実戦場面',
              complexityTier: parsed.xray.complexityTier || `Tình huống thực chiến (${level})`,
              physicalActions: Array.isArray(parsed.xray.physicalActions) ? parsed.xray.physicalActions : fallbackBase.xray.physicalActions,
              psychologicalStates: Array.isArray(parsed.xray.psychologicalStates) ? parsed.xray.psychologicalStates : fallbackBase.xray.psychologicalStates,
              storyThreadSummary: refineVietnameseMeaning(parsed.xray.storyThreadSummary || fallbackBase.xray.storyThreadSummary),
            };
          }
          workingResult.unlockedAngles = [angle];
          onLayerUpdate?.({
            xray: workingResult.xray,
            keywords: hydrated,
            unlockedAngles: [angle],
          });
        }
      }
    }).catch(() => {});

    // Thread 2: 3 Noun Phrases
    const thread2Promise = callGemini(
      `Bối cảnh: "${cleanQuery}" (JLPT ${level}). Kiến tạo ĐÚNG 3 Cụm Danh Từ ghép chuẩn người Nhật (名詞句 - ví dụ: 朝採れの新鮮な野菜, 歩み寄りの余地がない提案) vào mảng items.`,
      SYSTEM_FAST_NLP_CORE,
      undefined,
      false,
      THREAD_SINGLE_LAYER_SCHEMA,
      true
    ).then((raw) => {
      const parsed = safeExtractJson<any>(raw, null);
      if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
        const angle = parsed.angleLabel || 'Ngóc ngách #1 · Cụm danh từ bối cảnh';
        const hydrated = deduplicateLayerItems(
          hydrateItems(parsed.items, 'noun_phrase', 'p2', angle),
          excludeSet
        );
        if (hydrated.length > 0) {
          workingResult.nounPhrases = hydrated;
          onLayerUpdate?.({ nounPhrases: hydrated });
        }
      }
    }).catch(() => {});

    // Thread 3: 3 Verb Collocations
    const thread3Promise = callGemini(
      `Bối cảnh: "${cleanQuery}" (JLPT ${level}). Truy xuất ĐÚNG 3 Cụm Động Từ / Collocation hành động thực chiến chuẩn Tokyo (ví dụ: レジの列に並ぶ, 折り合いがつかない) vào mảng items.`,
      SYSTEM_FAST_NLP_CORE,
      undefined,
      false,
      THREAD_SINGLE_LAYER_SCHEMA,
      true
    ).then((raw) => {
      const parsed = safeExtractJson<any>(raw, null);
      if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
        const angle = parsed.angleLabel || 'Ngóc ngách #1 · Chuỗi hành động thực chiến';
        const hydrated = deduplicateLayerItems(
          hydrateItems(parsed.items, 'verb_phrase', 'p3', angle),
          excludeSet
        );
        if (hydrated.length > 0) {
          workingResult.verbPhrases = hydrated;
          onLayerUpdate?.({ verbPhrases: hydrated });
        }
      }
    }).catch(() => {});

    await Promise.allSettled([thread1Promise, thread2Promise, thread3Promise]);

    predictiveCache.set(cacheKey, workingResult);
    inFlightPredictions.delete(cacheKey);
    return workingResult;
  })();

  inFlightPredictions.set(cacheKey, runParallel);
  return runParallel;
}

/**
 * Predictive pre-computation called silently while the user is typing.
 */
export function prefetchCollocationContext(
  contextQuery: string,
  level: JLPTLevel = 'N2'
): void {
  const cleanQuery = contextQuery.trim();
  if (cleanQuery.length < 4) return;
  const cacheKey = getCacheKey(cleanQuery, level);
  if (predictiveCache.has(cacheKey) || inFlightPredictions.has(cacheKey)) return;
  if (findCuratedBundle(cleanQuery)) {
    getInstantPredictiveSeed(cleanQuery, level);
    return;
  }
  projectCollocationContextParallel(cleanQuery, level).catch(() => {});
}

// Legacy alias maintained cleanly
export async function projectCollocationContext(
  contextQuery: string,
  level: JLPTLevel = 'N2'
): Promise<OmniContextProjectionResult> {
  return projectCollocationContextParallel(contextQuery, level);
}

const MULTI_WAVE_BACKUP_POOL: Record<
  CollocationLayerType,
  Array<{
    angle: string;
    items: Omit<CollocationArsenalItem, 'id' | 'layer'>[];
  }>
> = {
  keyword: [
    {
      angle: 'Lớp mở rộng #2 · Ứng biến & Tinh tế',
      items: [
        {
          kanji: '臨機応変',
          furigana: 'りんきおうへん',
          romaji: 'rinkiōhen',
          pitchCode: '[1] Đầu cao (Atamadaka)',
          pitchPattern: ['H', 'L', 'L', 'L', 'L', 'L', 'L'],
          meaningVn: 'Linh hoạt ứng biến theo tình huống thực tế',
          exampleJp: '現場では臨機応変な対応が求められる。',
          exampleFurigana: 'げんばでは りんきおうへんな たいおうが もとめられる。',
          exampleVn: 'Tại hiện trường đòi hỏi cách xử lý linh hoạt tùy cơ ứng biến.',
          nativeNuance: 'Yojijukugo tần suất cực cao trong mọi tình huống phát sinh.',
        },
        {
          kanji: '配慮',
          furigana: 'はいりょ',
          romaji: 'hairyo',
          pitchCode: '[1] Đầu cao (Atamadaka)',
          pitchPattern: ['H', 'L', 'L'],
          meaningVn: 'Sự chu đáo, cân nhắc thấu cảm cho người khác',
          exampleJp: '周囲への細やかな配慮を忘れない。',
          exampleFurigana: 'しゅういへの こまやかな はいりょを わすれない。',
          exampleVn: 'Không quên để tâm chăm chút tới cảm nhận của những người xung quanh.',
          nativeNuance: 'Từ khóa cốt lõi của giao tiếp TPO Nhật Bản.',
        },
        {
          kanji: '手違い',
          furigana: 'てちがい',
          romaji: 'techigai',
          pitchCode: '[2] Trung cao (Nakadaka)',
          pitchPattern: ['L', 'H', 'L', 'L'],
          meaningVn: 'Sai sót trục trặc nhỏ trong khâu sắp xếp',
          exampleJp: 'こちらの手違いでご迷惑をおかけしました。',
          exampleFurigana: 'こちらの てちがいで ごめいわくを おかけしました。',
          exampleVn: 'Rất xin lỗi vì sơ suất khâu chuẩn bị bên chúng tôi đã gây phiền hà.',
          nativeNuance: 'Cách nói lịch sự nhận lỗi sự cố kỹ thuật/thủ tục.',
        },
      ],
    },
    {
      angle: 'Lớp mở rộng #3 · Điều phối & Giải tỏa áp lực',
      items: [
        {
          kanji: '念押し',
          furigana: 'ねんおし',
          romaji: 'nen’oshi',
          pitchCode: '[0] Bình bản (Heiban)',
          pitchPattern: ['L', 'H', 'H', 'H'],
          meaningVn: 'Sự dặn dò, xác nhận lại cho chắc ăn',
          exampleJp: '念押しの連絡を一本入れておいた。',
          exampleFurigana: 'ねんおしの れんらくを いっぽん いれておいた。',
          exampleVn: 'Tôi đã nhắn thêm một tin xác nhận lại cho chắc chắn.',
          nativeNuance: 'Thói quen tránh rủi ro phổ biến tại Nhật.',
        },
        {
          kanji: '落とし所',
          furigana: 'おとしどころ',
          romaji: 'otoshidokoro',
          pitchCode: '[5] Trung cao (Nakadaka)',
          pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L'],
          meaningVn: 'Điểm thỏa hiệp hài hòa hai bên cùng chấp nhận được',
          exampleJp: '双方納得のいく落とし所を探る。',
          exampleFurigana: 'そうほう なっとくの いく おとしどころを さぐる。',
          exampleVn: 'Tìm kiếm điểm dung hòa khiến đôi bên đều thấy thỏa đáng.',
          nativeNuance: 'Từ khóa cực đắt trong thương lượng và xử lý mâu thuẫn.',
        },
        {
          kanji: '気兼ね',
          furigana: 'きがね',
          romaji: 'kigane',
          pitchCode: '[0] Bình bản (Heiban)',
          pitchPattern: ['L', 'H', 'H'],
          meaningVn: 'Sự ngại ngùng, dè dặt sợ làm phiền người khác',
          exampleJp: '気兼ねなく何でも相談してください。',
          exampleFurigana: 'きがねなく なんでも そうだんして ください。',
          exampleVn: 'Đừng ngại ngần gì cả, có chuyện gì cứ trao đổi thẳng nhé.',
          nativeNuance: 'Cụm từ 気兼ねなく tự nhiên hơn 遠慮なく trong giao tiếp thân mật.',
        },
      ],
    },
  ],
  noun_phrase: [
    {
      angle: 'Lớp mở rộng #2 · Sự cố & Giao tiếp đặt mình vào người nghe',
      items: [
        {
          kanji: '想定外のアクシデント',
          furigana: 'そうていがいの アクシデント',
          romaji: 'sōteigai no akushidento',
          pitchCode: '[0]+[1]',
          pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'L', 'L', 'L'],
          meaningVn: 'Sự cố bất ngờ nằm ngoài dự tính',
          exampleJp: '想定外のアクシデントにも冷静に対処する。',
          exampleFurigana: 'そうていがいの アクシデントにも れいせいに たいしょする。',
          exampleVn: 'Bình tĩnh ứng phó cả khi phát sinh sự cố ngoài kịch bản.',
          nativeNuance: 'Collocation chuẩn: 想定外の事態 / アクシデント.',
        },
        {
          kanji: '相手の立場に立った気遣い',
          furigana: 'あいての たちばに たった きづかい',
          romaji: 'aite no tachiba ni tatta kidzukai',
          pitchCode: '[3]+[1]+[2]',
          pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'L', 'L', 'H', 'L', 'L', 'H', 'L', 'L'],
          meaningVn: 'Sự tinh tế đặt mình vào vị thế của người đối diện',
          exampleJp: '相手の立場に立った言葉遣いを心がける。',
          exampleFurigana: 'あいての たちばに たった ことばづかいを こころがける。',
          exampleVn: 'Luôn cố gắng dùng lời lẽ đặt mình vào vị trí của người nghe.',
          nativeNuance: 'Diễn đạt cốt lõi trong cả giao tiếp đời thường lẫn B2B.',
        },
        {
          kanji: '後々のトラブルを防ぐ確認',
          furigana: 'のちのちの トラブルを ふせぐ かくにん',
          romaji: 'nochinochi no toraburu o fusegu kakunin',
          pitchCode: '[0]+[2]+[2]',
          pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'L', 'H', 'L', 'L'],
          meaningVn: 'Bước kiểm tra chặn trước rắc rối về sau',
          exampleJp: 'トラブルを防ぐため念押しで確認する。',
          exampleFurigana: 'トラブルを ふせぐため ねんおしで かくにんする。',
          exampleVn: 'Hỏi xác nhận lại cho chắc chắn để tránh phát sinh phiền phức về sau.',
          nativeNuance: '念押し (nhắc lại lần nữa cho chắc) là thói quen làm việc chuẩn Nhật.',
        },
      ],
    },
    {
      angle: 'Lớp mở rộng #3 · Thấu cảm ngầm & Bầu không khí',
      items: [
        {
          kanji: '言葉の裏にある本音',
          furigana: 'ことばの うらにある ほんね',
          romaji: 'kotoba no ura ni aru honne',
          pitchCode: '[3]+[2]+[0]',
          pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'L', 'L', 'H', 'H', 'H'],
          meaningVn: 'Tâm tư thật sự ẩn sau lớp vỏ ngôn từ xã giao',
          exampleJp: '言葉の裏にある本音をそっと察する。',
          exampleFurigana: 'ことばの うらにある ほんねを そっと さっする。',
          exampleVn: 'Tinh tế cảm nhận ý thật ẩn giấu phía sau câu nói.',
          nativeNuance: 'Kỹ năng giải mã Honne-Tatemae bậc cao.',
        },
        {
          kanji: '角の立たない柔らかい言い回し',
          furigana: 'かどの たたない やわらかい いいまわし',
          romaji: 'kado no tatanai yawarakai iimawashi',
          pitchCode: '[1]+[2]+[4]',
          pitchPattern: ['H', 'L', 'L', 'H', 'L', 'L', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'H'],
          meaningVn: 'Lối diễn đạt uyển chuyển không góc cạnh gây mất lòng',
          exampleJp: '角の立たない言い回しを選んで伝える。',
          exampleFurigana: 'かどの たたない いいまわしを えらんで つたえる。',
          exampleVn: 'Chọn cách nói êm ái để truyền đạt mà không làm ai phật ý.',
          nativeNuance: '言い回し chỉ cách xoay chuyển câu chữ khéo léo.',
        },
        {
          kanji: 'その場の緊張をほぐす一言',
          furigana: 'そのばの きんちょうを ほぐす ひとこと',
          romaji: 'sono ba no kinchō o hogusu hitokoto',
          pitchCode: '[0]+[0]+[2]',
          pitchPattern: ['L', 'H', 'H', 'H', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'L'],
          meaningVn: 'Một câu nói khéo giúp xua tan bầu không khí căng thẳng',
          exampleJp: '場の緊張をほぐす一言で空気が和んだ。',
          exampleFurigana: 'ばの きんちょうを ほぐす ひとことで くうきが なごんだ。',
          exampleVn: 'Chỉ một câu mở lời nhẹ nhàng mà cả căn phòng dịu lại hẳn.',
          nativeNuance: '緊張をほぐす (làm giãn căng thẳng) là collocation tuyệt đẹp.',
        },
      ],
    },
  ],
  verb_phrase: [
    {
      angle: 'Lớp mở rộng #2 · Đọc vị không khí & Dàn xếp êm đẹp',
      items: [
        {
          kanji: 'その場の空気を瞬時に読み取る',
          furigana: 'そのばの くうきを しゅんじに よみとる',
          romaji: 'sono ba no kūki o shunji ni yomitoru',
          pitchCode: '[0]+[1]+[1]+[3]',
          pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'H', 'L', 'L', 'L', 'H', 'H', 'L'],
          meaningVn: 'Đọc vị ngay lập tức bầu không khí của tình huống',
          exampleJp: '空気を読み取って話題を切り替えた。',
          exampleFurigana: 'くうきを よみとって わだいを きりかえた。',
          exampleVn: 'Vừa nhìn sắc mặt mọi người là khéo léo đổi sang chuyện khác ngay.',
          nativeNuance: 'Nâng cấp tự nhiên của 空気を読む (KY).',
        },
        {
          kanji: '一言お詫びを添えて丸く収める',
          furigana: 'ひとこと おわびを そえて まるく おさめる',
          romaji: 'hitokoto owabi o soete maruku osameru',
          pitchCode: '[2]+[0]+[1]+[3]',
          pitchPattern: ['L', 'H', 'L', 'L', 'L', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'L'],
          meaningVn: 'Thêm một lời xin lỗi nhẹ để dàn xếp ổn thỏa êm đẹp',
          exampleJp: '笑顔で一言添えてその場を丸く収めた。',
          exampleFurigana: 'えがおで ひとこと そえて そのばを まるく おさめた。',
          exampleVn: 'Mỉm cười nói thêm một câu dịu dàng thế là mọi chuyện êm xuôi ngay.',
          nativeNuance: '丸く収める (thu xếp cho tròn trịa êm đẹp) là thành ngữ giao tiếp tuyệt hay.',
        },
        {
          kanji: '段取り良くスムーズに事を進める',
          furigana: 'だんどり よく スムーズに ことを すすめる',
          romaji: 'dandori yoku sumūzu ni koto o susumeru',
          pitchCode: '[3]+[1]+[2]+[0]',
          pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'L', 'L', 'L', 'H', 'H', 'H'],
          meaningVn: 'Sắp xếp trình tự đâu ra đấy để mọi việc trôi chảy mượt mà',
          exampleJp: '事前に段取りを組んでスムーズに進める。',
          exampleFurigana: 'じぜんに だんどりを くんで スムーズに すすめる。',
          exampleVn: 'Lên trình tự trước kỹ càng để vào việc trơn tru ngay.',
          nativeNuance: '段取りが良い (bố trí nhịp nhàng có lớp lang) là lời khen rất Nhật.',
        },
      ],
    },
    {
      angle: 'Lớp mở rộng #3 · Gỡ nút thắt & Giữ thiện cảm hậu sự việc',
      items: [
        {
          kanji: 'タイミングを見計らって声をかける',
          furigana: 'タイミングを みはからって こえを かける',
          romaji: 'taimingu o mihakaratte koe o kakeru',
          pitchCode: '[0]+[5]+[1]',
          pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'H', 'L', 'L', 'H', 'L'],
          meaningVn: 'Canh đúng thời điểm thích hợp mới mở lời bắt chuyện',
          exampleJp: '相手の動きを見てタイミングを見計らう。',
          exampleFurigana: 'あいての うごきを みて タイミングを みはからう。',
          exampleVn: 'Quan sát nhịp độ của người kia để chọn đúng thời cơ cất lời.',
          nativeNuance: 'Collocation vàng: タイミングを見計らう (canh đúng nhịp).',
        },
        {
          kanji: '誤解が解けて胸をなで下ろす',
          furigana: 'ごかいが とけて むねを なでおろす',
          romaji: 'gokai ga tokete mune o nadeorosu',
          pitchCode: '[0]+[1]+[2]+[5]',
          pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'L', 'L', 'H', 'H', 'H', 'L'],
          meaningVn: 'Hiểu lầm được hóa giải khiến lòng nhẹ nhõm thở phào',
          exampleJp: '無事に誤解が解けて胸をなで下ろした。',
          exampleFurigana: 'ぶじに ごかいが とけて むねを なでおろした。',
          exampleVn: 'Mọi hiểu nhầm tan biến hết khiến tôi thở phào nhẹ nhõm.',
          nativeNuance: 'Kết hợp 2 quán dụng ngữ chuẩn xác: 誤解が解ける và 胸をなで下ろす.',
        },
        {
          kanji: '後腐れなくきれいに話をまとめる',
          furigana: 'あとくされなく きれいに はなしを まとめる',
          romaji: 'atokusare naku kirei ni hanashi o matomeru',
          pitchCode: '[4]+[1]+[3]+[0]',
          pitchPattern: ['L', 'H', 'H', 'H', 'L', 'H', 'L', 'L', 'L', 'H', 'H', 'L', 'L', 'H', 'H', 'H'],
          meaningVn: 'Chốt gọn gàng dứt điểm câu chuyện để không còn vướng bận về sau',
          exampleJp: 'お互いに後腐れなく話をまとめた。',
          exampleFurigana: 'おたがいに あとくされなく はなしを まとめた。',
          exampleVn: 'Hai bên đã chốt lại êm xuôi không chút lấn cấn nào về sau.',
          nativeNuance: '後腐れがない (không để lại hệ lụy dở dang) là thành ngữ rất hay.',
        },
      ],
    },
  ],
};

/**
 * Independent Per-Layer "+3" Expansion:
 * Expands ONLY the chosen pillar ('keyword' | 'noun_phrase' | 'verb_phrase') with 3 brand-new
 * non-duplicate items in fastMode without stalling the other pillars.
 */
export async function expandSingleLayerDeepDive(
  current: OmniContextProjectionResult,
  layer: CollocationLayerType,
  level: JLPTLevel = 'N2'
): Promise<{
  items: CollocationArsenalItem[];
  angleLabel: string;
  source: 'gemini' | 'curated';
}> {
  const currentDepth = current.layerDepths?.[layer] || current.expansionDepth || 1;
  const nextDepth = currentDepth + 1;

  const excludeSet = new Set<string>();
  const existingLayerTerms: string[] = [];

  for (const item of [...current.keywords, ...current.nounPhrases, ...current.verbPhrases]) {
    excludeSet.add(item.kanji.replace(/\s+/g, '').toLowerCase());
    excludeSet.add(item.furigana.replace(/\s+/g, '').toLowerCase());
  }
  const layerArray =
    layer === 'keyword'
      ? current.keywords
      : layer === 'noun_phrase'
      ? current.nounPhrases
      : current.verbPhrases;
  for (const item of layerArray) {
    existingLayerTerms.push(`${item.kanji} (${item.furigana})`);
  }

  // 1. Check Curated Multi-Batch first (0ms instant)
  const curated = findCuratedBundle(current.contextQuery);
  if (curated) {
    const batchIdx = nextDepth - 2;
    if (batchIdx >= 0 && batchIdx < curated.deepDiveBatches.length) {
      const batch = curated.deepDiveBatches[batchIdx];
      const rawItems =
        layer === 'keyword'
          ? batch.keywords
          : layer === 'noun_phrase'
          ? batch.nounPhrases
          : batch.verbPhrases;
      const hydrated = deduplicateLayerItems(
        hydrateItems(rawItems, layer, `cur_${layer}_d${nextDepth}`, batch.angleLabel),
        excludeSet
      );
      if (hydrated.length > 0) {
        return {
          items: hydrated,
          angleLabel: batch.angleLabel,
          source: 'curated',
        };
      }
    }
  }

  // 2. Fast-Mode Focused AI Call exclusively for this single layer (+3 unique items)
  const layerTitleVi =
    layer === 'keyword'
      ? 'Từ vựng Cốt lõi (danh từ/tính từ thiết yếu)'
      : layer === 'noun_phrase'
      ? 'Cụm Danh Từ ghép chuẩn người Nhật'
      : 'Cụm Động Từ & Collocations hành động thực chiến';

  const prompt = `
ĐÀO SÂU RIÊNG MỤC [${layerTitleVi}] ĐỢT #${nextDepth} (JLPT ${level}):
BỐI CẢNH: "${current.contextQuery}" (${current.xray.contextTitle})

CÁC MỤC ĐÃ CÓ (CẤM TRÙNG LẶP 100%):
${existingLayerTerms.join(', ')}

Hãy đào sâu vào các ngóc ngách mới, sự cố phát sinh, sắc thái tinh tế hoặc bước hậu kỳ của bối cảnh "${current.contextQuery}" và trả về ĐÚNG 3 mục MỚI HOÀN TOÀN thuộc loại [${layerTitleVi}] trong mảng items.
`;

  try {
    const raw = await callGemini(
      prompt,
      SYSTEM_FAST_NLP_CORE,
      undefined,
      false,
      THREAD_SINGLE_LAYER_SCHEMA,
      true
    );
    const parsed = safeExtractJson<any>(raw, null);
    if (parsed && Array.isArray(parsed.items)) {
      const angle = parsed.angleLabel || `Ngóc ngách #${nextDepth} · Mở rộng chuyên sâu`;
      const unique = deduplicateLayerItems(
        hydrateItems(parsed.items, layer, `ai_${layer}_d${nextDepth}`, angle),
        excludeSet
      ).slice(0, 3);
      if (unique.length > 0) {
        return {
          items: unique,
          angleLabel: angle,
          source: 'gemini',
        };
      }
    }
  } catch {
    // Fall through to curated multi-wave backup pool
  }

  // 3. Guaranteed Non-Duplicate Multi-Wave Backup Pool
  const waves = MULTI_WAVE_BACKUP_POOL[layer];
  for (const wave of waves) {
    const candidate = deduplicateLayerItems(
      hydrateItems(wave.items, layer, `bk_${layer}_d${nextDepth}`, wave.angle),
      excludeSet
    );
    if (candidate.length > 0) {
      return {
        items: candidate.slice(0, 3),
        angleLabel: wave.angle,
        source: 'curated',
      };
    }
  }

  return {
    items: [],
    angleLabel: `Ngóc ngách #${nextDepth}`,
    source: 'curated',
  };
}

/**
 * Unified "+3 Đào sâu cả 3 mục": Fires expandSingleLayerDeepDive across all 3 layers in parallel.
 */
export async function expandCollocationContextDeepDive(
  current: OmniContextProjectionResult,
  level: JLPTLevel = 'N2'
): Promise<{
  newKeywords: CollocationArsenalItem[];
  newNounPhrases: CollocationArsenalItem[];
  newVerbPhrases: CollocationArsenalItem[];
  angleLabel: string;
  source: 'gemini' | 'curated';
}> {
  const [kwRes, npRes, vpRes] = await Promise.all([
    expandSingleLayerDeepDive(current, 'keyword', level),
    expandSingleLayerDeepDive(current, 'noun_phrase', level),
    expandSingleLayerDeepDive(current, 'verb_phrase', level),
  ]);

  return {
    newKeywords: kwRes.items,
    newNounPhrases: npRes.items,
    newVerbPhrases: vpRes.items,
    angleLabel: vpRes.angleLabel || npRes.angleLabel || kwRes.angleLabel,
    source:
      kwRes.source === 'gemini' || npRes.source === 'gemini' || vpRes.source === 'gemini'
        ? 'gemini'
        : 'curated',
  };
}

function buildProceduralFallbackBundle(contextQuery: string): OmniContextProjectionResult {
  const angle = 'Ngóc ngách #1 · Khung phản xạ nền tảng';
  return {
    contextQuery,
    xray: {
      contextTitle: contextQuery,
      japaneseSceneTag: '実践コミュニケーション場面',
      complexityTier: 'Phản xạ bối cảnh thực tế',
      physicalActions: [
        'Quan sát tổng quan tình huống và nắm bắt đối tượng giao tiếp',
        'Triển khai hành động chính theo trình tự lịch sự chuẩn Nhật',
        'Xác nhận kết thúc hoặc chuyển tiếp sang bước tiếp theo',
      ],
      psychologicalStates: [
        'Giữ bình tĩnh và đọc bối cảnh TPO (Time - Place - Occasion)',
        'Chủ động dùng câu đệm mềm mại để tránh gây hiểu lầm',
      ],
      storyThreadSummary: `Khung phản xạ thực chiến tức thì cho bối cảnh "${contextQuery}".`,
    },
    keywords: hydrateItems(
      [
        {
          kanji: '状況把握',
          furigana: 'じょうきょうはあく',
          romaji: 'jōkyō haaku',
          pitchCode: '[5] Trung cao (Nakadaka)',
          pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'L', 'L'],
          meaningVn: 'Nắm bắt tổng quan tình hình hiện tại',
          exampleJp: 'まずは落ち着いて状況把握に努める。',
          exampleFurigana: 'まずは おちついて じょうきょうはあくに つとめる。',
          exampleVn: 'Trước hết hãy bình tĩnh nắm bắt rõ đầu đuôi sự việc.',
          nativeNuance: 'Từ khóa cốt lõi mở đầu mọi xử lý tình huống.',
        },
        {
          kanji: '気配り',
          furigana: 'きくばり',
          romaji: 'kikubari',
          pitchCode: '[2] Trung cao (Nakadaka)',
          pitchPattern: ['L', 'H', 'L', 'L'],
          meaningVn: 'Sự tinh ý để tâm tới xung quanh',
          exampleJp: '周囲への気配りが信頼を生む。',
          exampleFurigana: 'しゅういへの きくばりが しんらいを うむ。',
          exampleVn: 'Sự tinh tế để tâm đến mọi người tạo nên lòng tin.',
          nativeNuance: 'Danh từ giao tiếp cao cấp trong mọi ngữ cảnh Nhật.',
        },
        {
          kanji: '段取り',
          furigana: 'だんどり',
          romaji: 'dandori',
          pitchCode: '[3] Trung cao (Nakadaka)',
          pitchPattern: ['L', 'H', 'H', 'L'],
          meaningVn: 'Trình tự sắp xếp các bước thực hiện',
          exampleJp: '事前によく段取りを決めておく。',
          exampleFurigana: 'じぜんに よく だんどりを きめておく。',
          exampleVn: 'Lên trước trình tự các bước thật gọn gàng.',
          nativeNuance: 'Văn hóa chuẩn bị kỹ trước khi hành động của người Nhật.',
        },
      ],
      'keyword',
      'proc',
      angle
    ),
    nounPhrases: hydrateItems(
      [
        {
          kanji: 'その場にふさわしい振る舞い',
          furigana: 'そのばに ふさわしい ふるまい',
          romaji: 'sono ba ni fusawashii furumai',
          pitchCode: '[0]+[4]+[0]',
          pitchPattern: ['L', 'H', 'H', 'L', 'H', 'H', 'H', 'L', 'L', 'H', 'H', 'H'],
          meaningVn: 'Cách ứng xử phù hợp nhất với hoàn cảnh lúc đó',
          exampleJp: '場にふさわしい振る舞いを意識する。',
          exampleFurigana: 'ばに ふさわしい ふるまいを いしきする。',
          exampleVn: 'Luôn ý thức cư xử cho vừa vặn với không khí hoàn cảnh.',
          nativeNuance: 'ふさわしい đi với 振る舞い là cụm danh từ rất tự nhiên.',
        },
        {
          kanji: '誤解を招かない丁寧な表現',
          furigana: 'ごかいを まねかない ていねいな ひょうげん',
          romaji: 'gokai o manekanai teinei na hyōgen',
          pitchCode: '[0]+[3]+[1]',
          pitchPattern: ['L', 'H', 'H', 'L', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'L'],
          meaningVn: 'Cách diễn đạt lịch sự không gây hiểu lầm',
          exampleJp: '誤解を招かない表現で伝えておく。',
          exampleFurigana: 'ごかいを まねかない ひょうげんで つたえておく。',
          exampleVn: 'Truyền đạt lại bằng lời lẽ rõ ràng kẻo dễ hiểu sai ý.',
          nativeNuance: 'Collocation chuẩn: 誤解を招く (gây ra hiểu lầm).',
        },
        {
          kanji: '状況に応じた柔軟な対応',
          furigana: 'じょうきょうに おうじた じゅうなんな たいおう',
          romaji: 'jōkyō ni ōjita jūnan na taiō',
          pitchCode: '[0]+[0]+[0]',
          pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'H', 'L', 'H', 'H', 'H'],
          meaningVn: 'Cách ứng xử linh hoạt tùy theo diễn biến tình hình',
          exampleJp: '状況に応じた柔軟な対応が鍵だ。',
          exampleFurigana: 'じょうきょうに おうじた じゅうなんな たいおうが かぎだ。',
          exampleVn: 'Chìa khóa nằm ở cách phản ứng uyển chuyển theo tình huống.',
          nativeNuance: 'Mẫu ～に応じた chuẩn mực cho văn nói trang trọng lẫn văn viết.',
        },
      ],
      'noun_phrase',
      'proc',
      angle
    ),
    verbPhrases: hydrateItems(
      [
        {
          kanji: '相手の意図を正確に汲み取る',
          furigana: 'あいての いとを せいかくに くみとる',
          romaji: 'aite no ito o seikaku ni kumitoru',
          pitchCode: '[3]+[1]+[0]+[3]',
          pitchPattern: ['L', 'H', 'H', 'L', 'H', 'L', 'L', 'H', 'H', 'H', 'H', 'L'],
          meaningVn: 'Nắm bắt và thấu hiểu chính xác ý đồ của đối phương',
          exampleJp: '言葉の裏にある意図を汲み取る。',
          exampleFurigana: 'ことばの うらにある いとを くみとる。',
          exampleVn: 'Lắng nghe để thấu hiểu ẩn ý đằng sau câu nói.',
          nativeNuance: 'Động từ 汲み取る (múc nước -> thấu cảm ý sâu xa) cực hay.',
        },
        {
          kanji: '前置きをして切り出す',
          furigana: 'まえおきを して きりだす',
          romaji: 'maeoki o shite kiridasu',
          pitchCode: '[0]+[0]+[3]',
          pitchPattern: ['L', 'H', 'H', 'H', 'H', 'L', 'H', 'H', 'L'],
          meaningVn: 'Mở lời rào đón khéo rồi mới bắt đầu vào vấn đề chính',
          exampleJp: '「恐れ入りますが」と前置きして切り出した。',
          exampleFurigana: '「おそれいりますが」と まえおきして きりだした。',
          exampleVn: 'Nói rào trước "Xin lỗi làm phiền" rồi mới bắt đầu đề cập vào việc.',
          nativeNuance: 'Cặp động từ tạo nhịp hội thoại tinh tế kiểu Nhật.',
        },
        {
          kanji: '落ち着いて次の手を打つ',
          furigana: 'おちついて つぎの てを うつ',
          romaji: 'ochitsuite tsugi no te o utsu',
          pitchCode: '[0]+[2]+[1]',
          pitchPattern: ['L', 'H', 'H', 'H', 'L', 'H', 'L', 'H', 'L'],
          meaningVn: 'Bình tĩnh triển khai bước đi tiếp theo',
          exampleJp: '焦らず落ち着いて次の手を打とう。',
          exampleFurigana: 'あせらず おちついて つぎの てを うとう。',
          exampleVn: 'Đừng cuống, cứ bình tĩnh tính bước tiếp theo đã.',
          nativeNuance: 'Thành ngữ 手を打つ (tung nước cờ / áp dụng biện pháp) rất bản xứ.',
        },
      ],
      'verb_phrase',
      'proc',
      angle
    ),
    expansionDepth: 1,
    layerDepths: { keyword: 1, noun_phrase: 1, verb_phrase: 1 },
    unlockedAngles: [angle],
    source: 'curated',
  };
}

export const QUICK_CONTEXT_PRESETS: Array<{
  label: string;
  tier: 'daily' | 'complex';
  query: string;
}> = [
  { label: 'Đi chợ / Siêu thị', tier: 'daily', query: 'Đi chợ' },
  { label: 'Đổ rác phân loại', tier: 'daily', query: 'Đổ rác' },
  { label: 'Đi tàu điện', tier: 'daily', query: 'Đi tàu điện' },
  { label: 'Đàm phán hợp đồng thất bại', tier: 'complex', query: 'Đàm phán hợp đồng thất bại' },
  { label: 'Bị sếp mắng do đi trễ', tier: 'complex', query: 'Bị sếp mắng do đi trễ' },
  { label: 'Từ chối khéo lời tỏ tình', tier: 'complex', query: 'Từ chối khéo lời tỏ tình' },
  { label: 'Thuyết trình báo cáo tài chính bị sếp phản bác', tier: 'complex', query: 'Thuyết trình báo cáo tài chính bị sếp phản bác' },
];
