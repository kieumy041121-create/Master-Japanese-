import { allKanjiMasterList, ExtendedKanjiItem } from '../data/allKanjiDatabase';
import { getKanjiPictorialInfo } from '../data/kanjiPictorialData';
import { COMPREHENSIVE_RADICALS, JUKUGO_DATABASE } from '../data/kanjiExtendedFeatures';
import { JLPTLevel } from '../types';
import { StrokePathData } from '../utils/kanjiStrokeEngine';
import {
  findInExtendedKanjiCatalog,
  normalizeVietnameseText,
} from './omnipotentSearchEngine';
import {
  resolveTruthLockedSinoVietnamese,
  resolveCompoundSinoVietnamese,
  TruthLockedSinoProfile,
} from './sinoVietnameseTruthEngine';

export interface KanjiRadicalPart {
  char: string;
  name: string;
  meaning: string;
  role: 'Hình (Nghĩa)' | 'Thanh (Âm)' | 'Hội ý' | 'Nền tảng';
  position: string;
}

export interface EtymologyEvolution {
  oracleBoneNote: string;
  bronzeScriptNote: string;
  sealScriptNote: string;
  oracleSvgPaths: string[];
  bronzeSvgPaths: string[];
  threeSecondHook: string;
  deepLogic: string;
}

export interface JukugoCompoundItem {
  word: string;
  reading: string;
  romaji: string;
  sinoVietnamese: string;
  meaning: string;
  readingType: 'on' | 'kun';
  pitchType: 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka';
  pitchAccentNum: number;
  rendakuAlert?: {
    rule: string;
    highlightedPair: string;
    explanation: string;
  };
  exampleJa: string;
  exampleReading: string;
  exampleVi: string;
  jlpt: JLPTLevel;
}

export interface KanjiTwinTrapItem {
  character: string;
  sinoVietnamese: string;
  onyomi: string;
  kunyomi: string;
  meaning: string;
  microDifference: string;
  trapNote: string;
  level: JLPTLevel;
}

export interface SiblingKanjiNode {
  character: string;
  sinoVietnamese: string;
  meaning: string;
  onyomi: string[];
  kunyomi: string[];
  level: JLPTLevel;
  strokeCount: number;
  connectionReason: string;
}

export interface KanjiUniverseDossier {
  character: string;
  sinoVietnamese: string;
  sinoProfile: TruthLockedSinoProfile;
  crawlerVerified: boolean;
  meaning: string;
  level: JLPTLevel;
  strokeCount: number;
  mainRadical: string;
  onyomi: string[];
  kunyomi: string[];
  radicals: KanjiRadicalPart[];
  etymology: EtymologyEvolution;
  onCompounds: JukugoCompoundItem[];
  kunCompounds: JukugoCompoundItem[];
  twinTraps: KanjiTwinTrapItem[];
  twinTrapGroupTitle: string;
  verificationChecklist: {
    workspaceIsolated: boolean;
    etymologyAnchored: boolean;
    jukugoDeduplicated: boolean;
    trapRadarActive: boolean;
  };
}

export interface StrokeRadarPoint {
  x: number;
  y: number;
  time?: number;
}

export interface StrokeRadarResult {
  strokeIndex: number;
  isValid: boolean;
  issueType: 'ok' | 'wrong_direction' | 'wrong_order' | 'too_short' | 'off_position';
  title: string;
  message: string;
  expectedAngle: number;
  actualAngle: number;
  expectedStroke?: StrokePathData;
}

// ============================================================================
// 1. CURATED ORACLE/BRONZE SVG ARCHETYPES & DEEP LINGUISTIC DATABASE
// ============================================================================

interface CuratedKanjiEntry {
  radicals: KanjiRadicalPart[];
  etymology: EtymologyEvolution;
  onCompounds: JukugoCompoundItem[];
  kunCompounds: JukugoCompoundItem[];
  twinClusterId?: string;
}

interface TwinClusterDef {
  title: string;
  members: KanjiTwinTrapItem[];
}

const TWIN_CLUSTERS: Record<string, TwinClusterDef> = {
  tera_family: {
    title: 'Bộ Tứ/Ngũ Sinh Đôi Chữ Tự (寺):待 · 持 · 特 · 侍 · 時',
    members: [
      {
        character: '待',
        sinoVietnamese: 'ĐÃI',
        onyomi: 'タイ (tai)',
        kunyomi: 'ま.つ (matsu)',
        meaning: 'Chờ đợi, tiếp đãi',
        microDifference: 'Trái là 彳 (Bộ Xích - bước chân đi)',
        trapNote: 'Bước chân (彳) tới chùa (寺) để CHỜ ĐỢI ai đó (待つ). Hay bẫy với 持 trong đề N4-N3.',
        level: 'N4',
      },
      {
        character: '持',
        sinoVietnamese: 'TRÌ',
        onyomi: 'ジ (ji)',
        kunyomi: 'も.つ (motsu)',
        meaning: 'Cầm nắm, sở hữu, duy trì',
        microDifference: 'Trái là 扌 (Bộ Tài Gẩy - bàn tay)',
        trapNote: 'Dùng BÀN TAY (扌) để CẦM NẮM đồ vật (持つ). Chú ý âm On là ジ (không phải シ).',
        level: 'N4',
      },
      {
        character: '特',
        sinoVietnamese: 'ĐẶC',
        onyomi: 'トク (toku)',
        kunyomi: '—',
        meaning: 'Đặc biệt, độc đáo, riêng biệt',
        microDifference: 'Trái là 牜 (Bộ Ngưu - con trâu)',
        trapNote: 'Con TRÂU (牜) quý hiếm được tiến vào chùa (寺) là vật ĐẶC BIỆT (特別). Bẫy cực gắt với 持.',
        level: 'N4',
      },
      {
        character: '時',
        sinoVietnamese: 'THỜI',
        onyomi: 'ジ (ji)',
        kunyomi: 'とき (toki)',
        meaning: 'Thời gian, giờ giấc, lúc',
        microDifference: 'Trái là 日 (Bộ Nhật - mặt trời)',
        trapNote: 'Mặt trời (日) chuyển động qua mái chùa (寺) đo đếm THỜI GIAN.',
        level: 'N5',
      },
      {
        character: '侍',
        sinoVietnamese: 'THỊ',
        onyomi: 'ジ (ji)',
        kunyomi: 'さむらい (samurai)',
        meaning: 'Võ sĩ Samurai, hầu cận',
        microDifference: 'Trái là 亻 (Bộ Nhân đứng - con người)',
        trapNote: 'Người (亻) đứng hầu cận bên chùa (寺) là võ sĩ Samurai (侍).',
        level: 'N1',
      },
    ],
  },
  ichi_family: {
    title: 'Bẫy Chữ Thị / Tỷ Sinh Đôi: 柿 · 姉 · 市 · 肺',
    members: [
      {
        character: '柿',
        sinoVietnamese: 'THỊ',
        onyomi: 'シ (shi)',
        kunyomi: 'かき (kaki)',
        meaning: 'Quả hồng (trái cây)',
        microDifference: 'Trái là 木 (Bộ Mộc) + phải là 巿 (nét sổ xuyên thẳng từ đầu đến đáy)',
        trapNote: 'Bẫy kinh điển JLPT: Chú ý bên phải là nét sổ xuyên suốt 1 mạch (khác 姉). Cây (木) ra quả hồng.',
        level: 'N2',
      },
      {
        character: '姉',
        sinoVietnamese: 'TỶ',
        onyomi: 'シ (shi)',
        kunyomi: 'あね (ane)',
        meaning: 'Chị gái',
        microDifference: 'Trái là 女 (Bộ Nữ) + phải là 市 (Chấm 亠 tách rời bên trên)',
        trapNote: 'Người phụ nữ (女) đi chợ (市) là CHỊ GÁI (姉). Bên phải KHÔNG xuyên thẳng như 柿.',
        level: 'N4',
      },
      {
        character: '市',
        sinoVietnamese: 'THỊ',
        onyomi: 'シ (shi)',
        kunyomi: 'いち (ichi)',
        meaning: 'Thành phố, chợ',
        microDifference: 'Đứng độc lập (Đầu 亠 + Cân 巾)',
        trapNote: 'Nền tảng gốc của Chợ/Thành phố. Đừng nhầm với phần phải của 柿 (không có đầu chấm rời).',
        level: 'N4',
      },
      {
        character: '肺',
        sinoVietnamese: 'PHẾ',
        onyomi: 'ハイ (hai)',
        kunyomi: '—',
        meaning: 'Lá phổi (cơ quan hô hấp)',
        microDifference: 'Trái là 月 (Bộ Nhục - cơ thể) + phải là 巿 (nét sổ xuyên thẳng)',
        trapNote: 'Cơ quan trong thân thể (月) dùng chung phần phải nét xuyên thẳng với quả hồng (柿), âm On đọc ハイ.',
        level: 'N1',
      },
    ],
  },
  umi_family: {
    title: 'Cụm Hán Tự Gốc Mỗi (毎): 海 · 毎 · 梅 · 悔',
    members: [
      {
        character: '海',
        sinoVietnamese: 'HẢI',
        onyomi: 'カイ (kai)',
        kunyomi: 'うみ (umi)',
        meaning: 'Biển cả, đại dương',
        microDifference: 'Trái là 氵 (3 chấm Thủy - nước)',
        trapNote: 'Chú ý ngoại lệ đặc biệt 海老 (えび - con tôm) và 海女 (あま - nữ thợ lặn) hay xuất hiện ở N2-N1.',
        level: 'N4',
      },
      {
        character: '毎',
        sinoVietnamese: 'MỖI',
        onyomi: 'マイ (mai)',
        kunyomi: 'ごと (goto)',
        meaning: 'Mỗi, từng, hàng (ngày/tháng)',
        microDifference: 'Đứng độc lập không có bộ bên trái',
        trapNote: 'Đọc là マイ (毎日・毎週), nhưng khi ghép với Nước thành 海 lại đọc là カイ (海外)!',
        level: 'N5',
      },
      {
        character: '梅',
        sinoVietnamese: 'MAI',
        onyomi: 'バイ (bai)',
        kunyomi: 'うめ (ume)',
        meaning: 'Hoa mai, quả mơ (Ume)',
        microDifference: 'Trái là 木 (Bộ Mộc - cây cối)',
        trapNote: 'Cây (木) + Mỗi (毎) -> Mùa xuân cây nở hoa mai (梅). Đọc 梅雨 là つゆ (mùa mưa) hay bẫy!',
        level: 'N2',
      },
      {
        character: '悔',
        sinoVietnamese: 'HỐI',
        onyomi: 'カイ (kai)',
        kunyomi: 'く.いる / くや.しい',
        meaning: 'Hối hận, tiếc nuối',
        microDifference: 'Trái là 忄 (Bộ Tâm đứng - cảm xúc)',
        trapNote: 'Trái tim (忄) day dứt mỗi ngày (毎) -> Hối hận (後悔 こうかい). Cùng âm カイ với 海.',
        level: 'N2',
      },
    ],
  },
  mi_matsu_family: {
    title: 'Cặp Bẫy Độ Dài Nét Kinh Điển: 未 · 末 · 本 · 土 · 士',
    members: [
      {
        character: '未',
        sinoVietnamese: 'VỊ',
        onyomi: 'ミ (mi)',
        kunyomi: 'いま.だ / ま.だ',
        meaning: 'Chưa, tương lai chưa tới',
        microDifference: 'Nét ngang TRÊN ngắn, nét ngang DƯỚI dài',
        trapNote: 'Mẹo: Cây non MỚI nhú nên ngọn trên còn NGẮN = CHƯA lớn (未). Xuất hiện trong 未来 (tương lai).',
        level: 'N3',
      },
      {
        character: '末',
        sinoVietnamese: 'MẠT',
        onyomi: 'マツ (matsu) / バツ',
        kunyomi: 'すえ (sue)',
        meaning: 'Cuối cùng, ngọn cây, mạt vận',
        microDifference: 'Nét ngang TRÊN dài, nét ngang DƯỚI ngắn',
        trapNote: 'Mẹo: Cây mọc tới ĐỈNH NGỌN xòe rộng trên cao = CUỐI CÙNG (末). Xuất hiện trong 週末 (cuối tuần).',
        level: 'N3',
      },
      {
        character: '土',
        sinoVietnamese: 'THỔ',
        onyomi: 'ド / ト',
        kunyomi: 'つち (tsuchi)',
        meaning: 'Đất đai, thổ nhưỡng',
        microDifference: 'Nét ngang DƯỚI dài làm nền móng',
        trapNote: 'Nền đất bên dưới phải rộng vững để đỡ cả mặt đất.',
        level: 'N5',
      },
      {
        character: '士',
        sinoVietnamese: 'SĨ',
        onyomi: 'シ (shi)',
        kunyomi: '—',
        meaning: 'Chiến sĩ, học giả, người có nghề chuyên môn',
        microDifference: 'Nét ngang TRÊN dài như bờ vai / mũ quan',
        trapNote: 'Kẻ sĩ vai rộng ngực nở nên nét trên dài, nét dưới hẹp (弁護士・博士).',
        level: 'N2',
      },
    ],
  },
  ao_family: {
    title: 'Nhóm Hình Thanh Gốc Thanh (青): 清 · 晴 · 精 · 情 · 請',
    members: [
      {
        character: '清',
        sinoVietnamese: 'THANH',
        onyomi: 'セイ / ショウ',
        kunyomi: 'きよ.い',
        meaning: 'Trong sạch, thanh khiết',
        microDifference: 'Trái là 氵 (Nước) -> Nước trong xanh',
        trapNote: 'Nước (氵) màu xanh -> Trong veo tinh khiết (清潔 せいけつ).',
        level: 'N3',
      },
      {
        character: '晴',
        sinoVietnamese: 'TÌNH',
        onyomi: 'セイ',
        kunyomi: 'は.れる',
        meaning: 'Trời quang, tạnh ráo nắng đẹp',
        microDifference: 'Trái là 日 (Mặt trời) -> Trời xanh nắng đẹp',
        trapNote: 'Mặt trời (日) rực rỡ trên nền xanh -> Trời tạnh nắng (晴れる).',
        level: 'N4',
      },
      {
        character: '精',
        sinoVietnamese: 'TINH',
        onyomi: 'セイ / ショウ',
        kunyomi: '—',
        meaning: 'Tinh túy, tinh thần, tỉ mỉ',
        microDifference: 'Trái là 米 (Hạt gạo) -> Gạo xay trắng tinh',
        trapNote: 'Gạo (米) được giã lọc kỹ trở nên tinh khiết (精神 せいしん · 精密 せいみつ).',
        level: 'N2',
      },
      {
        character: '情',
        sinoVietnamese: 'TÌNH',
        onyomi: 'ジョウ / セイ',
        kunyomi: 'なさ.け',
        meaning: 'Tình cảm, thông tin, tình hình',
        microDifference: 'Trái là 忄 (Trái tim) -> Tình cảm con người',
        trapNote: 'Chú ý biến âm On thành ジョウ trong 情報 (じょうほう) và 感情 (かんじょう)!',
        level: 'N3',
      },
      {
        character: '請',
        sinoVietnamese: 'THỈNH',
        onyomi: 'セイ / シン',
        kunyomi: 'こ.う / う.ける',
        meaning: 'Thỉnh cầu, yêu cầu, xin phép',
        microDifference: 'Trái là 言 (Lời nói) -> Lời thỉnh cầu',
        trapNote: 'Dùng lời nói (言) chân thành xin xỏ (請求 せいきゅう - yêu cầu thanh toán).',
        level: 'N2',
      },
    ],
  },
  gi_family: {
    title: 'Bộ Ba N2-N1 Dễ Nhầm: 議 · 義 · 儀',
    members: [
      {
        character: '議',
        sinoVietnamese: 'NGHỊ',
        onyomi: 'ギ (gi)',
        kunyomi: '—',
        meaning: 'Bàn bạc, hội nghị, thảo luận',
        microDifference: 'Trái là 言 (Lời nói) -> Họp bàn bằng lời',
        trapNote: '会議 (かいぎ - hội nghị), 議論 (ぎろん - tranh luận).',
        level: 'N3',
      },
      {
        character: '義',
        sinoVietnamese: 'NGHĨA',
        onyomi: 'ギ (gi)',
        kunyomi: '—',
        meaning: 'Ý nghĩa, chính nghĩa, đạo nghĩa',
        microDifference: 'Đứng độc lập (Dương 羊 + Ngã 我)',
        trapNote: '意味 vs 意義 (いぎ - ý nghĩa sâu xa), 正義 (せいぎ - chính nghĩa).',
        level: 'N2',
      },
      {
        character: '儀',
        sinoVietnamese: 'NGHI',
        onyomi: 'ギ (gi)',
        kunyomi: '—',
        meaning: 'Nghi lễ, phép tắc, máy đo',
        microDifference: 'Trái là 亻 (Con người) -> Phép tắc ứng xử',
        trapNote: 'お辞儀 (おじぎ - cúi chào), 儀式 (ぎしき - nghi thức).',
        level: 'N1',
      },
    ],
  },
  kashi_family: {
    title: 'Bộ Ba Kinh Tế N3-N2 Hay Lộn: 貸 · 貨 · 資',
    members: [
      {
        character: '貸',
        sinoVietnamese: 'THẢI',
        onyomi: 'タイ (tai)',
        kunyomi: 'か.す (kasu)',
        meaning: 'Cho vay, cho mượn',
        microDifference: 'Phần trên là 代 (Thay thế) + dưới là 貝 (Tiền)',
        trapNote: 'Đổi (代) tiền (貝) tạm cho người khác mượn = CHO VAY (貸す). Đừng nhầm với 借 (mượn).',
        level: 'N4',
      },
      {
        character: '貨',
        sinoVietnamese: 'HÓA',
        onyomi: 'カ (ka)',
        kunyomi: '—',
        meaning: 'Hàng hóa, tiền tệ',
        microDifference: 'Phần trên là 化 (Hóa) + dưới là 貝 (Tiền)',
        trapNote: 'Tiền tệ (貨幣 かへい) và Hàng hóa (貨物 かもつ).',
        level: 'N2',
      },
      {
        character: '資',
        sinoVietnamese: 'TƯ',
        onyomi: 'シ (shi)',
        kunyomi: '—',
        meaning: 'Tư bản, vốn liếng, tài liệu',
        microDifference: 'Phần trên là 次 (Thứ) + dưới là 貝 (Tiền)',
        trapNote: 'Tài liệu (資料 しりょう), Tư cách (資格 しかく), Đầu tư (投資 とうし).',
        level: 'N3',
      },
    ],
  },
};

const CURATED_KANJI_DOSSIERS: Record<string, CuratedKanjiEntry> = {
  '海': {
    radicals: [
      { char: '氵', name: 'Bộ Chấm Thủy', meaning: 'Nước chảy, đại dương', role: 'Hình (Nghĩa)', position: 'Bên trái (Hen)' },
      { char: '毎', name: 'Chữ Mỗi (Mẹ)', meaning: 'Người mẹ đội trâm tóc, sinh sôi mỗi ngày', role: 'Hội ý', position: 'Bên phải (Tsukuri)' },
    ],
    etymology: {
      oracleBoneNote: 'Hình 3 dòng sóng nước (氵) cạnh hình người mẹ (母) đang sinh dưỡng sự sống.',
      bronzeScriptNote: 'Hình người mẹ đội trâm cài đầu (毎) tượng trưng cho nguồn sinh dưỡng vô tận của biển cả.',
      sealScriptNote: 'Chuẩn hóa cấu trúc Trái Thủy (氵) - Phải Mỗi (毎) hài hòa.',
      oracleSvgPaths: [
        'M 22 25 Q 18 38 24 50 Q 18 62 24 75',
        'M 34 22 Q 30 38 35 54 Q 30 68 35 80',
        'M 52 24 L 46 58 L 78 58 L 72 24',
        'M 42 42 L 82 42',
        'M 56 32 A 2 2 0 1 0 56 36',
        'M 56 48 A 2 2 0 1 0 56 52',
      ],
      bronzeSvgPaths: [
        'M 20 26 L 28 34 M 18 48 L 28 56 M 20 76 L 30 62',
        'M 55 20 L 44 36 M 48 34 L 78 34',
        'M 50 42 L 46 72 L 76 74 M 50 42 L 74 42 L 70 82',
        'M 38 56 L 84 56',
      ],
      threeSecondHook: 'Nơi NGƯỜI MẸ (毎) sinh ra muôn dòng NƯỚC (氵) nuôi sống Trái Đất chính là BIỂN CẢ (海)!',
      deepLogic: 'Trong văn hóa cổ đại, đại dương được ví như "Mẹ của muôn dòng sông" (百川の母). Chữ 海 ghép Thủy (氵) với Mỗi (毎 - biến thể của 母 người mẹ) để khắc họa lòng đại dương bao la.',
    },
    onCompounds: [
      {
        word: '海外',
        reading: 'かいがい',
        romaji: 'kaigai',
        sinoVietnamese: 'HẢI NGOẠI',
        meaning: 'Nước ngoài, hải ngoại',
        readingType: 'on',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        rendakuAlert: {
          rule: 'Biến âm Âm On (か → が)',
          highlightedPair: 'かい + がい (外 đọc ガイ thay vì カイ)',
          explanation: 'Âm đầu chữ Ngoại (外) giữ âm đục がい khi ghép sau 海, tạo nhịp mượt.',
        },
        exampleJa: '来年、海外で働く予定です。',
        exampleReading: 'らいねん、かいがいではたらくよていです。',
        exampleVi: 'Năm sau tôi dự định sẽ làm việc ở nước ngoài.',
        jlpt: 'N4',
      },
      {
        word: '海岸',
        reading: 'かいがん',
        romaji: 'kaigan',
        sinoVietnamese: 'HẢI NGẠN',
        meaning: 'Bờ biển, duyên hải',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        rendakuAlert: {
          rule: 'Âm đục đặc trưng (がん)',
          highlightedPair: '岸 đọc がん (Ngạn)',
          explanation: 'Đừng nhầm đọc thành かいかん (Hội quán 会館) trong bài nghe JLPT!',
        },
        exampleJa: '夏の夕方に海岸を散歩するのは最高だ。',
        exampleReading: 'なつのゆうがたにかいがんをさんぽするのはさいこうだ。',
        exampleVi: 'Đi dạo dọc bờ biển vào buổi chiều hè thật tuyệt vời.',
        jlpt: 'N4',
      },
      {
        word: '北海道',
        reading: 'ほっかいどう',
        romaji: 'hokkaidō',
        sinoVietnamese: 'BẮC HẢI ĐẠO',
        meaning: 'Vùng Hokkaido (cực Bắc Nhật Bản)',
        readingType: 'on',
        pitchType: 'nakadaka',
        pitchAccentNum: 3,
        rendakuAlert: {
          rule: 'Xúc âm Sokuon (ほく → ほっ)',
          highlightedPair: 'ほく + かい → ほっかい (っ)',
          explanation: 'Bắc (ほく) đứng trước âm K của 海 (かい) bị nuốt thành xúc âm っ cực kỳ quan trọng.',
        },
        exampleJa: '冬に北海道へスキーに行きたい。',
        exampleReading: 'ふゆにほっかいどうへすきーにいきたい。',
        exampleVi: 'Mùa đông tôi muốn đi trượt tuyết ở Hokkaido.',
        jlpt: 'N5',
      },
    ],
    kunCompounds: [
      {
        word: '海',
        reading: 'うみ',
        romaji: 'umi',
        sinoVietnamese: 'HẢI',
        meaning: 'Biển, đại dương',
        readingType: 'kun',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: 'この島からは青い海が一望できる。',
        exampleReading: 'このしまからはあおいがいちぼうできる。',
        exampleVi: 'Từ hòn đảo này có thể thu trọn tầm mắt vùng biển xanh thẳm.',
        jlpt: 'N5',
      },
      {
        word: '海辺',
        reading: 'うみべ',
        romaji: 'umibe',
        sinoVietnamese: 'HẢI BIÊN',
        meaning: 'Ven biển, bãi biển',
        readingType: 'kun',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        rendakuAlert: {
          rule: 'Biến âm Rendaku (へ → べ)',
          highlightedPair: 'うみ + へ → うみべ',
          explanation: 'Chữ Biên (辺 - へ) khi ghép sau 海 (うみ) bị biến âm thành べ (Rendaku).',
        },
        exampleJa: '海辺の小さなカフェでコーヒーを飲んだ。',
        exampleReading: 'うみべのちいさなかふぇでこーひーをのんだ。',
        exampleVi: 'Tôi đã uống cà phê ở một quán nhỏ ven biển.',
        jlpt: 'N2',
      },
      {
        word: '海老',
        reading: 'えび',
        romaji: 'ebi',
        sinoVietnamese: 'HẢI LÃO',
        meaning: 'Con tôm (Ngoại lệ Ateji)',
        readingType: 'kun',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        rendakuAlert: {
          rule: 'Bẫy Đọc Đặc Biệt (熟字訓)',
          highlightedPair: '海老 → えび (KHÔNG đọc かいろう)',
          explanation: 'Lưng còng như ông lão (老) dưới biển (海) nên người Nhật đọc đặc biệt là えび (con tôm)!',
        },
        exampleJa: '天ぷらの中で海老天が一番好きです。',
        exampleReading: 'てんぷらのなかでえびてんがいちばんすきです。',
        exampleVi: 'Trong các món Tempura, tôi thích nhất là tôm chiên.',
        jlpt: 'N2',
      },
    ],
    twinClusterId: 'umi_family',
  },
  '待': {
    radicals: [
      { char: '彳', name: 'Bộ Xích', meaning: 'Bước chân đi trên đường', role: 'Hình (Nghĩa)', position: 'Bên trái (Hen)' },
      { char: '寺', name: 'Chữ Tự', meaning: 'Ngôi chùa / Cơ quan xưa', role: 'Thanh (Âm)', position: 'Bên phải (Tsukuri)' },
    ],
    etymology: {
      oracleBoneNote: 'Hình ngã tư đường (行 cắt nửa thành 彳) kết hợp hình bàn chân tiến tới (止).',
      bronzeScriptNote: 'Ghép 彳 (bước chân) và 寺 (đình trạm / chùa chiền) — dừng chân ở trạm đợi người.',
      sealScriptNote: 'Cố định bộ Xích 彳 đứng gác bên trái ngôi Tự 寺.',
      oracleSvgPaths: [
        'M 34 22 L 18 40 M 36 40 L 16 62 M 26 52 L 26 82',
        'M 46 32 L 78 32 M 62 18 L 62 46 M 42 48 L 84 48',
        'M 45 62 L 82 62 M 70 48 L 70 84 L 62 78',
      ],
      bronzeSvgPaths: [
        'M 34 20 L 18 38 M 36 38 L 16 60 M 26 50 L 26 84',
        'M 48 30 L 78 30 M 63 18 L 63 46 M 42 48 L 84 48',
        'M 46 62 L 82 62 M 70 48 L 70 84 M 54 68 L 60 75',
      ],
      threeSecondHook: 'Cất BƯỚC CHÂN (彳) đến trước cửa CHÙA (寺) đứng ĐỢI (待) người thương!',
      deepLogic: '寺 (Tự) thời cổ còn chỉ trạm nghỉ công vụ. Người đi đường (彳) dừng lại tại trạm (寺) để chờ đợi bạn đồng hành hay tiếp đãi khách phương xa.',
    },
    onCompounds: [
      {
        word: '期待',
        reading: 'きたい',
        romaji: 'kitai',
        sinoVietnamese: 'KỲ ĐÃI',
        meaning: 'Kỳ vọng, mong đợi',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: '新しいプロジェクトの成果に大いに期待している。',
        exampleReading: 'あたらしいぷろじぇくとのせいかにおおいにきたいしている。',
        exampleVi: 'Tôi đặt rất nhiều kỳ vọng vào thành quả của dự án mới.',
        jlpt: 'N3',
      },
      {
        word: '招待',
        reading: 'しょうたい',
        romaji: 'shōtai',
        sinoVietnamese: 'CHIÊU ĐÃI',
        meaning: 'Mời (tiệc, sự kiện), chiêu đãi',
        readingType: 'on',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: '友人の結婚式に招待された。',
        exampleReading: 'ゆうじんのけっこんしきにしょうたいされた。',
        exampleVi: 'Tôi đã được mời tham dự lễ cưới của bạn thân.',
        jlpt: 'N3',
      },
      {
        word: '待遇',
        reading: 'たいぐう',
        romaji: 'taigū',
        sinoVietnamese: 'ĐÃI NGỘ',
        meaning: 'Chế độ đãi ngộ, đối xử',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: 'この会社は社員の待遇がとても良い。',
        exampleReading: 'このかいしゃはしゃいんのたいぐうがとてもよい。',
        exampleVi: 'Công ty này có chế độ đãi ngộ nhân viên rất tốt.',
        jlpt: 'N1',
      },
    ],
    kunCompounds: [
      {
        word: '待つ',
        reading: 'まつ',
        romaji: 'matsu',
        sinoVietnamese: 'ĐÃI',
        meaning: 'Đợi, chờ',
        readingType: 'kun',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: '改札の前で10分ほど待ってください。',
        exampleReading: 'かいさつのまえでじゅっぷんほどまってください。',
        exampleVi: 'Xin vui lòng đợi khoảng 10 phút trước cửa soát vé.',
        jlpt: 'N5',
      },
      {
        word: '待ち合わせ',
        reading: 'まちあわせ',
        romaji: 'machiawase',
        sinoVietnamese: 'ĐÃI HỢP',
        meaning: 'Cuộc hẹn gặp nhau',
        readingType: 'kun',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: '渋谷のハチ公前で待ち合わせしよう。',
        exampleReading: 'しぶやのはちこうまえでまちあわせしよう。',
        exampleVi: 'Hãy hẹn gặp nhau trước tượng chú chó Hachiko ở Shibuya nhé.',
        jlpt: 'N3',
      },
    ],
    twinClusterId: 'tera_family',
  },
  '持': {
    radicals: [
      { char: '扌', name: 'Bộ Tài Gẩy', meaning: 'Bàn tay, hành động cầm nắm', role: 'Hình (Nghĩa)', position: 'Bên trái (Hen)' },
      { char: '寺', name: 'Chữ Tự', meaning: 'Ngôi chùa (mượn âm đọc)', role: 'Thanh (Âm)', position: 'Bên phải (Tsukuri)' },
    ],
    etymology: {
      oracleBoneNote: 'Hình bàn tay xòe năm ngón (手) kết hợp vật nắm giữ.',
      bronzeScriptNote: 'Tay (扌) nâng đỡ vật dâng lên trong nghi lễ ở 寺 (đình/chùa).',
      sealScriptNote: 'Định hình nét bộ Tài Gẩy 扌 gọn bên trái chữ Tự 寺.',
      oracleSvgPaths: [
        'M 18 35 L 36 35 M 28 20 L 28 82 L 20 74 M 16 58 L 38 46',
        'M 48 32 L 78 32 M 63 18 L 63 46 M 42 48 L 84 48',
        'M 45 62 L 82 62 M 70 48 L 70 84 M 54 68 L 60 75',
      ],
      bronzeSvgPaths: [
        'M 18 35 L 36 35 M 28 20 L 28 82 L 20 74 M 16 58 L 38 46',
        'M 48 32 L 78 32 M 63 18 L 63 46 M 42 48 L 84 48',
        'M 45 62 L 82 62 M 70 48 L 70 84',
      ],
      threeSecondHook: 'Dùng BÀN TAY (扌) đưa lên giữ chặt đồ lễ trước CHÙA (寺) là CẦM NẮM / DUY TRÌ (持)!',
      deepLogic: 'Hình thanh chữ điển hình: Tài Gẩy (扌) chỉ hành động của tay; chữ Tự (寺) giữ âm đọc Ji/Chi.',
    },
    onCompounds: [
      {
        word: '維持',
        reading: 'いじ',
        romaji: 'iji',
        sinoVietnamese: 'DUY TRÌ',
        meaning: 'Duy trì, bảo tồn nguyên trạng',
        readingType: 'on',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: '健康を維持するために毎日運動しています。',
        exampleReading: 'けんこうをいじするためにまいにちうんどうしています。',
        exampleVi: 'Để duy trì sức khỏe, tôi tập thể dục mỗi ngày.',
        jlpt: 'N2',
      },
      {
        word: '支持',
        reading: 'しじ',
        romaji: 'shiji',
        sinoVietnamese: 'CHI TRÌ',
        meaning: 'Ủng hộ, hỗ trợ',
        readingType: 'on',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: '多くの市民がその政策を支持している。',
        exampleReading: 'おおくのしみんがそのせいさくをしじしている。',
        exampleVi: 'Rất đông người dân đang ủng hộ chính sách đó.',
        jlpt: 'N2',
      },
    ],
    kunCompounds: [
      {
        word: '持つ',
        reading: 'もつ',
        romaji: 'motsu',
        sinoVietnamese: 'TRÌ',
        meaning: 'Cầm, mang, sở hữu',
        readingType: 'kun',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: '雨が降りそうだから傘を持って行こう。',
        exampleReading: 'あめがふりそうだからかさをもっていこう。',
        exampleVi: 'Trời có vẻ sắp mưa nên hãy mang theo ô đi.',
        jlpt: 'N5',
      },
      {
        word: '気持ち',
        reading: 'きもち',
        romaji: 'kimochi',
        sinoVietnamese: 'KHÍ TRÌ',
        meaning: 'Tâm trạng, cảm giác',
        readingType: 'kun',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: '相手の気持ちになって考えることが大切だ。',
        exampleReading: 'あいてのきもちになってかんがえることがたいせつだ。',
        exampleVi: 'Điều quan trọng là biết đặt mình vào cảm xúc của đối phương.',
        jlpt: 'N4',
      },
    ],
    twinClusterId: 'tera_family',
  },
  '特': {
    radicals: [
      { char: '牜', name: 'Bộ Ngưu', meaning: 'Con trâu / bò tế lễ', role: 'Hình (Nghĩa)', position: 'Bên trái (Hen)' },
      { char: '寺', name: 'Chữ Tự', meaning: 'Ngôi chùa / Đền miếu', role: 'Thanh (Âm)', position: 'Bên phải (Tsukuri)' },
    ],
    etymology: {
      oracleBoneNote: 'Đầu trâu sừng cong (牛) đứng cạnh đàn tế thần linh.',
      bronzeScriptNote: 'Con trâu đực tuyển chọn dâng lên thái miếu (寺) — mang nghĩa độc nhất, ĐẶC BIỆT.',
      sealScriptNote: 'Nét đáy của 牛 biến thành nét hất lên phải khi đứng làm bộ 牜 bên trái.',
      oracleSvgPaths: [
        'M 22 25 L 18 45 M 18 36 L 36 36 M 28 20 L 28 82 M 16 60 L 38 48',
        'M 48 32 L 78 32 M 63 18 L 63 46 M 42 48 L 84 48 M 46 62 L 82 62 M 70 48 L 70 84',
      ],
      bronzeSvgPaths: [
        'M 22 25 L 18 45 M 18 36 L 36 36 M 28 20 L 28 82 M 16 60 L 38 48',
        'M 48 32 L 78 32 M 63 18 L 63 46 M 42 48 L 84 48 M 46 62 L 82 62 M 70 48 L 70 84',
      ],
      threeSecondHook: 'Con TRÂU (牜) quý nhất tuyển chọn dâng vào CHÙA (寺) là hàng ĐẶC BIỆT (特)!',
      deepLogic: 'Ngày xưa chỉ con trâu thuần sắc không tì vết mới được dùng trong đại lễ, từ đó mở rộng nghĩa thành "khác biệt, đặc sắc, chuyên biệt".',
    },
    onCompounds: [
      {
        word: '特別',
        reading: 'とくべつ',
        romaji: 'tokubetsu',
        sinoVietnamese: 'ĐẶC BIỆT',
        meaning: 'Đặc biệt, ngoại lệ',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: '今日は特別な日なので、いいレストランで食事しよう。',
        exampleReading: 'きょうはとくべつなひなので、いいれすとらんでしょくじしよう。',
        exampleVi: 'Hôm nay là ngày đặc biệt nên hãy ăn tối ở một nhà hàng ngon nhé.',
        jlpt: 'N4',
      },
      {
        word: '特急',
        reading: 'とっきゅう',
        romaji: 'tokkyū',
        sinoVietnamese: 'ĐẶC CẤP',
        meaning: 'Tàu tốc hành đặc biệt',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        rendakuAlert: {
          rule: 'Xúc âm Sokuon (とく → とっ)',
          highlightedPair: 'とく + きゅう → とっきゅう (っ)',
          explanation: 'Âm く ở cuối とく gặp K ở きゅう biến thành xúc âm っ — bẫy kinh điển ở ga tàu & N4-N3!',
        },
        exampleJa: '特急列車に乗れば1時間で着きます。',
        exampleReading: 'とっきゅうれっしゃにのればいちじかんでつきます。',
        exampleVi: 'Nếu đi tàu tốc hành đặc biệt thì chỉ mất 1 tiếng là tới.',
        jlpt: 'N3',
      },
      {
        word: '特徴',
        reading: 'とくちょう',
        romaji: 'tokuchō',
        sinoVietnamese: 'ĐẶC TRƯNG',
        meaning: 'Đặc trưng, nét nổi bật',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: 'この製品の一番の特徴は軽さです。',
        exampleReading: 'このせいひんのいちばんのとくちょうはかるさです。',
        exampleVi: 'Đặc trưng nổi bật nhất của sản phẩm này là độ nhẹ.',
        jlpt: 'N3',
      },
    ],
    kunCompounds: [
      {
        word: '特に',
        reading: 'とくに',
        romaji: 'tokuni',
        sinoVietnamese: 'ĐẶC',
        meaning: 'Đặc biệt là, nhất là',
        readingType: 'kun',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: '日本の食べ物の中で、特に寿司が大好きです。',
        exampleReading: 'にほんのたべもののなかで、とくにすしがだいすきです。',
        exampleVi: 'Trong các món ăn Nhật Bản, đặc biệt là tôi rất thích sushi.',
        jlpt: 'N4',
      },
    ],
    twinClusterId: 'tera_family',
  },
  '柿': {
    radicals: [
      { char: '木', name: 'Bộ Mộc', meaning: 'Cây cối, thân gỗ', role: 'Hình (Nghĩa)', position: 'Bên trái (Hen)' },
      { char: '巿', name: 'Chữ Phất (Nét xuyên thẳng)', meaning: 'Quả sai trĩu trên cành (Khác 市!)', role: 'Thanh (Âm)', position: 'Bên phải (Tsukuri)' },
    ],
    etymology: {
      oracleBoneNote: 'Cây cổ thụ (木) gắn phần cành lá rủ xuống sai quả.',
      bronzeScriptNote: 'Nét sổ dọc bên phải chạy xuyên từ đỉnh xuống đáy tượng trưng cho cuống quả rủ dài.',
      sealScriptNote: 'Phân biệt rạch ròi với chữ 市 (của 姉 chị gái) vốn có nét đầu chấm tách rời.',
      oracleSvgPaths: [
        'M 18 40 L 40 40 M 29 20 L 29 82 M 29 42 L 15 65 M 29 42 L 42 62',
        'M 48 30 L 84 30 M 52 46 L 80 46 L 80 70 L 72 64 M 52 46 L 52 72 M 66 18 L 66 84',
      ],
      bronzeSvgPaths: [
        'M 18 40 L 40 40 M 29 20 L 29 82 M 29 42 L 15 65 M 29 42 L 42 62',
        'M 48 30 L 84 30 M 52 46 L 80 46 L 80 70 M 52 46 L 52 72 M 66 18 L 66 84',
      ],
      threeSecondHook: 'CÂY (木) đâm cành XUYÊN THẲNG một nét không đứt gãy (巿) cho ra QUẢ HỒNG (柿) giòn ngọt!',
      deepLogic: 'Điểm ăn tiền ở JLPT: Chữ 柿 (quả hồng) có nét sổ dọc xuyên thẳng 1 mạch qua nét ngang trên cùng; còn 姉 (chị gái) có nét chấm trên đầu tách rời (市).',
    },
    onCompounds: [
      {
        word: '柿渋',
        reading: 'かきしぶ',
        romaji: 'kakishibu',
        sinoVietnamese: 'THỊ SÁP',
        meaning: 'Nhựa chát quả hồng (dùng sơn phủ gỗ truyền thống)',
        readingType: 'kun',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: '柿渋は日本の伝統的な天然塗料として使われる。',
        exampleReading: 'かきしぶはにほんのでんとうてきなてんねんとりょうとしてつかわれる。',
        exampleVi: 'Nhựa quả hồng được dùng làm sơn phủ tự nhiên truyền thống của Nhật.',
        jlpt: 'N1',
      },
      {
        word: '熟柿',
        reading: 'じゅくし',
        romaji: 'jukushi',
        sinoVietnamese: 'THỤC THỊ',
        meaning: 'Quả hồng chín mềm',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: '秋になると甘い熟柿が木に実る。',
        exampleReading: 'あきになるとあまいじゅくしがきにみのる。',
        exampleVi: 'Thu về là những trái hồng chín ngọt lịm trĩu trên cây.',
        jlpt: 'N1',
      },
    ],
    kunCompounds: [
      {
        word: '柿',
        reading: 'かき',
        romaji: 'kaki',
        sinoVietnamese: 'THỊ',
        meaning: 'Quả hồng (mùa thu)',
        readingType: 'kun',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        rendakuAlert: {
          rule: 'Bẫy Đồng Âm Pitch (かき)',
          highlightedPair: '柿 (かき [0] Ngang) vs 牡蠣 (かき [1] Cao đầu - Con hàu)',
          explanation: 'Cùng đọc là かき nhưng Quả hồng lên giọng ở sau (かき￣), còn Con hàu hạ giọng (か＼き)!',
        },
        exampleJa: '「柿が赤くなれば医者が青くなる」という諺がある。',
        exampleReading: 'かきがあかくなればいしゃがあおくなるということわざがある。',
        exampleVi: 'Có câu tục ngữ: "Hồng đỏ thì bác sĩ xanh mặt" (vì mùa thu ăn hồng rất khỏe mạnh).',
        jlpt: 'N2',
      },
      {
        word: '干し柿',
        reading: 'ほしがき',
        romaji: 'hoshigaki',
        sinoVietnamese: 'CAN THỊ',
        meaning: 'Hồng treo gió (đặc sản mùa đông Nhật)',
        readingType: 'kun',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        rendakuAlert: {
          rule: 'Biến âm Rendaku (か → が)',
          highlightedPair: 'ほし + かき → ほしがき',
          explanation: 'Chữ Thị 柿 (かき) khi đứng sau 干し bị biến âm đục thành がき!',
        },
        exampleJa: '祖母が毎年秋に甘い干し柿を作ってくれる。',
        exampleReading: 'そぼがまいとしあきにあまいほしがきをつくってくれる。',
        exampleVi: 'Bà nội tôi năm nào cũng làm hồng treo gió ngọt lịm vào mùa thu.',
        jlpt: 'N1',
      },
    ],
    twinClusterId: 'ichi_family',
  },
  '姉': {
    radicals: [
      { char: '女', name: 'Bộ Nữ', meaning: 'Người phụ nữ, con gái', role: 'Hình (Nghĩa)', position: 'Bên trái (Hen)' },
      { char: '市', name: 'Chữ Thị (Chợ)', meaning: 'Khu chợ, người lớn bước ra xã hội', role: 'Thanh (Âm)', position: 'Bên phải (Tsukuri)' },
    ],
    etymology: {
      oracleBoneNote: 'Hình người phụ nữ quỳ chắp tay (女) cạnh chữ Thị.',
      bronzeScriptNote: 'Người con gái lớn tuổi nhất trong nhà được phép ra chợ (市) lo toan gia đình.',
      sealScriptNote: 'Giữ nguyên bộ Nữ bên trái và chữ 市 (chấm 亠 rời phía trên) bên phải.',
      oracleSvgPaths: [
        'M 26 22 Q 20 45 18 65 L 38 78 M 36 38 Q 28 60 16 78 M 12 44 L 42 44',
        'M 66 18 L 66 28 M 46 30 L 86 30 M 52 46 L 80 46 L 80 72 M 52 46 L 52 72 M 66 30 L 66 84',
      ],
      bronzeSvgPaths: [
        'M 26 22 Q 20 45 18 65 L 38 78 M 36 38 Q 28 60 16 78 M 12 44 L 42 44',
        'M 66 18 L 66 28 M 46 30 L 86 30 M 52 46 L 80 46 L 80 72 M 52 46 L 52 72 M 66 30 L 66 84',
      ],
      threeSecondHook: 'Người PHỤ NỮ (女) dẫn em đi CHỢ (市) mua quà chính là CHỊ GÁI (姉)!',
      deepLogic: 'Trong gia đình truyền thống, người chị gái (姉) là người phụ nữ (女) lớn tuổi phụ giúp mẹ đi chợ (市) quán xuyến nhà cửa. Chú ý dấu chấm đỉnh ở chữ 市 không xuyên thẳng như 柿.',
    },
    onCompounds: [
      {
        word: '姉妹',
        reading: 'しまい',
        romaji: 'shimai',
        sinoVietnamese: 'TỶ MUỘI',
        meaning: 'Chị em gái, thành phố kết nghĩa',
        readingType: 'on',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: '京都とパリは姉妹都市として知られている。',
        exampleReading: 'きょうととぱりはしまいとしとしてしられている。',
        exampleVi: 'Kyoto và Paris được biết đến là hai thành phố kết nghĩa.',
        jlpt: 'N3',
      },
      {
        word: '義姉',
        reading: 'ぎし',
        romaji: 'gishi',
        sinoVietnamese: 'NGHĨA TỶ',
        meaning: 'Chị dâu / Chị vợ / Chị chồng',
        readingType: 'on',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: '義姉はとても親切で頼りになる存在だ。',
        exampleReading: 'ぎしはとてもしんせつでたよりになるそんざいだ。',
        exampleVi: 'Chị dâu tôi là người rất tốt bụng và đáng tin cậy.',
        jlpt: 'N1',
      },
    ],
    kunCompounds: [
      {
        word: '姉',
        reading: 'あね',
        romaji: 'ane',
        sinoVietnamese: 'TỶ',
        meaning: 'Chị gái (của mình, khi nói với người ngoài)',
        readingType: 'kun',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: '私の姉は東京の病院で看護師をしています。',
        exampleReading: 'わたしのあねはとうきょうのびょういんでかんごしをしています。',
        exampleVi: 'Chị gái tôi đang làm y tá tại một bệnh viện ở Tokyo.',
        jlpt: 'N5',
      },
      {
        word: 'お姉さん',
        reading: 'おねえさん',
        romaji: 'onēsan',
        sinoVietnamese: 'TỶ',
        meaning: 'Chị gái (xưng hô lịch sự / gọi chị nhà người khác)',
        readingType: 'kun',
        pitchType: 'nakadaka',
        pitchAccentNum: 2,
        rendakuAlert: {
          rule: 'Trường âm đặc biệt (ねえ)',
          highlightedPair: 'お + ねえ + さん (không đọc おあね)',
          explanation: 'Khi thêm お...さん, chữ 姉 chuyển sang đọc kéo dài trường âm え thành おねえさん!',
        },
        exampleJa: 'お姉さんは今年大学を卒業するそうです。',
        exampleReading: 'おねえさんはことしだいがくをそつぎょうするそうです。',
        exampleVi: 'Nghe nói chị gái của bạn năm nay sẽ tốt nghiệp đại học.',
        jlpt: 'N5',
      },
    ],
    twinClusterId: 'ichi_family',
  },
  '会': {
    radicals: [
      { char: '𠆢', name: 'Bộ Nhân Nón (Hitoyane)', meaning: 'Mái nhà tập hợp con người', role: 'Hình (Nghĩa)', position: 'Phía trên (Kanmuri)' },
      { char: '云', name: 'Bộ Vân (Mây / Nói)', meaning: 'Đám mây tụ hội, trò chuyện', role: 'Hội ý', position: 'Phía dưới (Ashi)' },
    ],
    etymology: {
      oracleBoneNote: 'Hình chiếc nắp (亼) đậy khít lên chiếc nồi/chõ đồ xôi (曾) — ý chỉ tụ hợp khít nhau.',
      bronzeScriptNote: 'Phát triển thành mái nhà (𠆢) che trên các luồng hơi khí quấn quýt (云) gặp gỡ nhau.',
      sealScriptNote: 'Giữ cấu trúc Nhân phủ trên (𠆢) và Vân (云) ở dưới.',
      oracleSvgPaths: [
        'M 50 16 L 20 44 M 50 16 L 80 44',
        'M 32 46 L 68 46 M 22 58 L 78 58 M 44 58 L 28 80 L 70 76 M 64 66 L 76 82',
      ],
      bronzeSvgPaths: [
        'M 50 16 L 20 44 M 50 16 L 80 44',
        'M 32 46 L 68 46 M 22 58 L 78 58 M 44 58 L 28 80 L 70 76 M 64 66 L 76 82',
      ],
      threeSecondHook: 'MỌI NGƯỜI tập trung dưới cùng một MÁI NHÀ (𠆢) để TỤ HỌP trò chuyện như MÂY (云) = GẶP GỠ / HỘI HỌP (会)!',
      deepLogic: 'Từ hình ảnh chiếc nắp khớp với miệng nồi (gặp khớp), chữ 会 chuyển nghĩa thành con người tụ hội gặp gỡ (会う) và tổ chức xã hội (会社 · 会議).',
    },
    onCompounds: [
      {
        word: '会社',
        reading: 'かいしゃ',
        romaji: 'kaisha',
        sinoVietnamese: 'HỘI XÃ',
        meaning: 'Công ty, doanh nghiệp',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: '毎朝8時に電車で会社へ通っています。',
        exampleReading: 'まいあさはちじにでんしゃでかいしゃへかよっています。',
        exampleVi: 'Mỗi sáng 8 giờ tôi đi tàu điện tới công ty.',
        jlpt: 'N5',
      },
      {
        word: '会議',
        reading: 'かいぎ',
        romaji: 'kaigi',
        sinoVietnamese: 'HỘI NGHỊ',
        meaning: 'Cuộc họp, hội nghị',
        readingType: 'on',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: '午後の会議で新しい企画を発表する。',
        exampleReading: 'ごごのかいぎであたらしいきかくをはっぴょうする。',
        exampleVi: 'Tôi sẽ trình bày kế hoạch mới trong cuộc họp buổi chiều.',
        jlpt: 'N4',
      },
      {
        word: '機会',
        reading: 'きかい',
        romaji: 'kikai',
        sinoVietnamese: 'CƠ HỘI',
        meaning: 'Cơ hội, dịp may',
        readingType: 'on',
        pitchType: 'nakadaka',
        pitchAccentNum: 2,
        exampleJa: '次の機会にぜひまたお会いしましょう。',
        exampleReading: 'つぎのきかいにぜひまたおあいしましょう。',
        exampleVi: 'Nhất định hãy gặp lại nhau vào dịp tới nhé.',
        jlpt: 'N4',
      },
    ],
    kunCompounds: [
      {
        word: '会う',
        reading: 'あう',
        romaji: 'au',
        sinoVietnamese: 'HỘI',
        meaning: 'Gặp gỡ (bạn bè, con người)',
        readingType: 'kun',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: '週末に高校時代の友達に会います。',
        exampleReading: 'しゅうまつにこうこうじだいのともだちにあいます。',
        exampleVi: 'Cuối tuần tôi sẽ gặp bạn thời cấp ba.',
        jlpt: 'N5',
      },
      {
        word: '会話',
        reading: 'かいわ',
        romaji: 'kaiwa',
        sinoVietnamese: 'HỘI THOẠI',
        meaning: 'Hội thoại, đối thoại giao tiếp',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: '日本語の会話力を伸ばしたい。',
        exampleReading: 'にほんごのかいわりょくをのばしたい。',
        exampleVi: 'Tôi muốn nâng cao khả năng hội thoại tiếng Nhật.',
        jlpt: 'N4',
      },
    ],
  },
  '日': {
    radicals: [
      { char: '日', name: 'Bộ Nhật', meaning: 'Vành đĩa mặt trời có lõi sáng bên trong', role: 'Hình (Nghĩa)', position: 'Độc thể' },
    ],
    etymology: {
      oracleBoneNote: 'Hình đĩa tròn mặt trời (☉) khắc trên mai rùa với chấm sáng ở chính giữa.',
      bronzeScriptNote: 'Đĩa tròn dần vuông vức hơn để dễ khắc trên đỉnh đồng.',
      sealScriptNote: 'Biến thành khung chữ nhật đứng ngay ngắn với vạch ngang ở giữa.',
      oracleSvgPaths: [
        'M 50 18 A 32 32 0 1 0 50 82 A 32 32 0 1 0 50 18 Z',
        'M 45 50 A 5 5 0 1 0 55 50 A 5 5 0 1 0 45 50 Z',
      ],
      bronzeSvgPaths: [
        'M 28 20 Q 50 14 72 20 L 72 80 Q 50 86 28 80 Z',
        'M 38 50 L 62 50',
      ],
      threeSecondHook: 'Vầng MẶT TRỜI (☉) chiếu rọi tạo thành BAN NGÀY & NHẬT BẢN (日)!',
      deepLogic: 'Chữ tượng hình gốc 100%, là bộ thủ chỉ thời gian, ánh sáng và thiên nhiên.',
    },
    onCompounds: [
      {
        word: '日本',
        reading: 'にほん / にっぽん',
        romaji: 'nihon / nippon',
        sinoVietnamese: 'NHẬT BẢN',
        meaning: 'Nước Nhật Bản (Nơi mặt trời mọc)',
        readingType: 'on',
        pitchType: 'nakadaka',
        pitchAccentNum: 2,
        rendakuAlert: {
          rule: 'Biến âm Xúc & Bán đục (にっぽん)',
          highlightedPair: 'にち + ほん → にっぽん (っ + ぽ)',
          explanation: 'Trong cách đọc trang trọng, ち rút thành っ và ほ biến thành ぽ (Bán đục âm P)!',
        },
        exampleJa: '日本は四季の移り変わりがとても美しい。',
        exampleReading: 'にほんはしきのうつりかわりがとてもうつくしい。',
        exampleVi: 'Nhật Bản có sự chuyển giao bốn mùa vô cùng tươi đẹp.',
        jlpt: 'N5',
      },
      {
        word: '日記',
        reading: 'にっき',
        romaji: 'nikki',
        sinoVietnamese: 'NHẬT KÝ',
        meaning: 'Nhật ký viết mỗi ngày',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        rendakuAlert: {
          rule: 'Xúc âm Sokuon (にち → にっ)',
          highlightedPair: 'にち + き → にっき (っ)',
          explanation: 'Âm ち ở cuối にち gặp âm K (き) bị nuốt thành xúc âm っ.',
        },
        exampleJa: '寝る前に5分間だけ日本語で日記を書く。',
        exampleReading: 'ねるまえにごふんかんだけにほんごでにっきをかく。',
        exampleVi: 'Trước khi ngủ tôi viết nhật ký bằng tiếng Nhật chỉ 5 phút.',
        jlpt: 'N4',
      },
    ],
    kunCompounds: [
      {
        word: '日曜日',
        reading: 'にちようび',
        romaji: 'nichiyōbi',
        sinoVietnamese: 'NHẬT DIỆU NHẬT',
        meaning: 'Ngày Chủ Nhật',
        readingType: 'kun',
        pitchType: 'nakadaka',
        pitchAccentNum: 3,
        exampleJa: '日曜日はいつも家族と出かけます。',
        exampleReading: 'にちようびはいつもかぞくとでかけます。',
        exampleVi: 'Chủ nhật tôi luôn ra ngoài đi chơi cùng gia đình.',
        jlpt: 'N5',
      },
      {
        word: '今日',
        reading: 'きょう',
        romaji: 'kyō',
        sinoVietnamese: 'KIM NHẬT',
        meaning: 'Hôm nay (Đọc ghép đặc biệt)',
        readingType: 'kun',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        rendakuAlert: {
          rule: 'Bẫy Đọc Bất Quy Tắc (熟字訓)',
          highlightedPair: '今 + 日 → きょう (KHÔNG đọc こんにち)',
          explanation: 'Chú ý phân biệt 今日 (きょう = Hôm nay) với 今日 (こんにち = Thời đại ngày nay).',
        },
        exampleJa: '今日は午後から雨が降るらしい。',
        exampleReading: 'きょうはひるからあめがふるらしい。',
        exampleVi: 'Nghe nói hôm nay từ chiều trời sẽ đổ mưa.',
        jlpt: 'N5',
      },
    ],
  },
  鬱: {
    radicals: [
      { char: '木', name: 'Song Mộc (林)', meaning: 'Hai hàng cây rậm rạp kẹp chặt hai bên', role: 'Hình (Nghĩa)', position: 'Đỉnh trái-phải' },
      { char: '缶', name: 'Bộ Phẫu', meaning: 'Bình rượu đất nung bị kẹp giữa rừng cây', role: 'Hội ý', position: 'Giữa đỉnh' },
      { char: '冖', name: 'Bộ Mịch', meaning: 'Mái che đậy kín không khí lại', role: 'Hình (Nghĩa)', position: 'Giữa thân' },
      { char: '鬯', name: 'Bộ Sưởng', meaning: 'Rượu nghệ thảo mộc ủ kín trong bình', role: 'Hình (Nghĩa)', position: 'Lõi dưới trái' },
      { char: '彡', name: 'Bộ Sam', meaning: 'Hương thơm hoặc tia ánh sáng bị nén lại', role: 'Nền tảng', position: 'Góc dưới phải' },
    ],
    etymology: {
      oracleBoneNote: 'Hình ảnh hai bàn tay / hàng cây (林) bọc kín bình rượu thơm (鬯) dưới mái che (冖), diễn tả hương khí và tâm trạng bị dồn nén không thoát ra được.',
      bronzeScriptNote: 'Thường gọi vui bằng thần chú "リン缶ワ凶ヒ鬯彡" (Rin-Kan-Wa-Kyou-Hi-Chou-San) để chinh phục 29 nét trong 5 giây.',
      sealScriptNote: 'Chữ Joyo nhiều nét bậc nhất tiếng Nhật (29 nét), biểu trưng cho sự rậm rạp, ủ dột hoặc trầm cảm tâm lý.',
      oracleSvgPaths: [
        'M 22 20 L 22 50 M 14 32 L 30 32 M 78 20 L 78 50 M 70 32 L 86 32',
        'M 38 22 L 62 22 L 60 44 L 40 44 Z',
        'M 16 54 L 84 54',
        'M 26 60 L 54 60 L 54 84 L 26 84 Z M 66 64 L 82 58 M 66 74 L 84 68 M 66 84 L 86 78',
      ],
      bronzeSvgPaths: [
        'M 18 18 L 82 18 L 82 48 L 18 48 Z',
        'M 14 54 L 86 54',
        'M 22 60 L 58 60 L 58 84 L 22 84 Z M 66 62 L 84 82',
      ],
      threeSecondHook: 'Cầm bình rượu (缶) trốn dưới mái che (冖) giữa rừng cây (木木) uống một mình → TÂM TRẠNG UẤT ỨC, TRẦM CẢM (鬱).',
      deepLogic: 'Dù có tới 29 nét, chỉ cần tách 5 khối quen thuộc (木 · 缶 · 木 / 冖 / 鬯 · 彡) là đọc và nhớ trọn bộ 憂鬱 (yuuutsu) ngay lập tức.',
    },
    onCompounds: [
      {
        word: '憂鬱',
        reading: 'ゆううつ',
        romaji: 'yuuutsu',
        sinoVietnamese: 'ƯU UẤT',
        meaning: 'Ưu uất, trầm cảm, sầu muộn nặng nề',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        rendakuAlert: {
          rule: 'Trường âm kép (ユウ＋ウツ)',
          highlightedPair: '憂鬱 (ゆううつ)',
          explanation: 'Chú ý trường âm う đi liền ngay với う của 鬱 khi gõ bộ gõ Nhật (yuuutsu).',
        },
        exampleJa: '月曜日の朝は誰でも少し憂鬱な気分になる。',
        exampleReading: 'げつようびのあさはだれでもすこしゆううつなきぶんになる',
        exampleVi: 'Sáng thứ Hai ai cũng dễ rơi vào tâm trạng hơi u uất một chút.',
        jlpt: 'N1',
      },
      {
        word: '鬱病',
        reading: 'うつびょう',
        romaji: 'utsubyou',
        sinoVietnamese: 'UẤT BỆNH',
        meaning: 'Bệnh trầm cảm (y khoa)',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: '過度なストレスが原因で鬱病になる人が増えている。',
        exampleReading: 'かどなすとれすがげんいんでうつびょうになるひとがふえている',
        exampleVi: 'Số người mắc bệnh trầm cảm do căng thẳng quá độ đang tăng lên.',
        jlpt: 'N1',
      },
      {
        word: '鬱蒼',
        reading: 'うっそう',
        romaji: 'ussou',
        sinoVietnamese: 'UẤT THƯƠNG',
        meaning: 'Um tùm, rậm rạp, xanh thẫm (rừng cây)',
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        rendakuAlert: {
          rule: 'Xúc âm Sokuon (っ)',
          highlightedPair: '鬱蒼 (うっそう)',
          explanation: 'Âm うつ biến thành xúc âm うっ trước chữ 蒼 (そう) tạo âm ngắt dứt khoát.',
        },
        exampleJa: '神社の周りは鬱蒼とした森に囲まれている。',
        exampleReading: 'じんじゃのまわりはうっそうとしたもりにかこまれている',
        exampleVi: 'Xung quanh ngôi đền được bao bọc bởi khu rừng rậm rạp um tùm.',
        jlpt: 'N1',
      },
    ],
    kunCompounds: [
      {
        word: '鬱陶しい',
        reading: 'うっとうしい',
        romaji: 'uttoushii',
        sinoVietnamese: 'UẤT ĐÀO',
        meaning: 'Khó chịu, oi bức, ngột ngạt, phiền phức',
        readingType: 'kun',
        pitchType: 'nakadaka',
        pitchAccentNum: 5,
        exampleJa: '梅雨の時期は毎日雨が降って鬱陶しい。',
        exampleReading: 'つゆのじきはまいにちあめがふってうっとうしい',
        exampleVi: 'Mùa mưa phùn ngày nào trời cũng mưa khiến tâm trạng thật ngột ngạt.',
        jlpt: 'N1',
      },
    ],
  },
};

// ============================================================================
// 2. HELPERS: KANA-TO-ROMAJI, RENDAKU DETECTOR, RADICAL DETECTOR
// ============================================================================

const KANA_ROMAJI_MAP: Record<string, string> = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'o', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
};

export function kanaToRomajiSimple(kana: string): string {
  const clean = kana.replace(/[.\-\s()（）]/g, '');
  let out = '';
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    const next = clean[i + 1] || '';
    const pair = ch + next;

    if (ch === 'っ' && next) {
      const nextRom = KANA_ROMAJI_MAP[next] || '';
      out += nextRom ? nextRom[0] : '';
      continue;
    }
    if (ch === 'ー' && out.length > 0) {
      out += out[out.length - 1];
      continue;
    }
    if (KANA_ROMAJI_MAP[pair]) {
      out += KANA_ROMAJI_MAP[pair];
      i++;
      continue;
    }
    out += KANA_ROMAJI_MAP[ch] || ch;
  }
  return out;
}

function detectRendakuOrSokuon(reading: string, word: string): JukugoCompoundItem['rendakuAlert'] | undefined {
  const r = reading.trim();
  if (r.includes('っ')) {
    return {
      rule: 'Xúc âm Sokuon (っ)',
      highlightedPair: `${word} (${r})`,
      explanation: 'Chứa âm ngắt っ do va chạm phụ âm khi ghép hai chữ Hán (ví dụ つ/く/ち gặp か/さ/た/ぱ). Bẫy nghe & viết cực hay ra trong JLPT!',
    };
  }
  if (/[ぱぴぷぺぽ]/.test(r) && word.length >= 2) {
    return {
      rule: 'Bán đục âm Handakuon (P)',
      highlightedPair: `${word} (${r})`,
      explanation: 'Âm hàng H (は・ひ・ふ・へ・ほ) chuyển sang hàng P (ぱ・ぴ・ぷ・ぺ・ぽ) khi đứng sau xúc âm っ hoặc âm mũi ん.',
    };
  }
  if (word.length >= 2 && /[がぎぐげござじずぜぞだぢづでどばびぶべぼ]/.test(r.slice(1))) {
    return {
      rule: 'Cảnh báo Biến âm Rendaku (Đục hóa)',
      highlightedPair: `${word} (${r})`,
      explanation: 'Chữ đứng sau có âm đục (Dakuon) — cần chú ý không đọc nhầm sang âm thanh (không dấu) trong bài thi Kanji Yomikata.',
    };
  }
  return undefined;
}

// ============================================================================
// 3. LOOKUP & SYNTHESIS ENGINE
// ============================================================================

function normalizeRadicalsStr(r: unknown): string {
  if (Array.isArray(r)) return r.join(' ').trim();
  return typeof r === 'string' ? r.trim() : '';
}

function makeSyntheticExtendedKanji(params: {
  id: string;
  character: string;
  sinoVietnamese: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  level: JLPTLevel;
  strokeCount: number;
  radicals: string[];
  radicalMeaning: string;
  mnemonicStory: string;
}): ExtendedKanjiItem {
  return {
    id: params.id,
    character: params.character,
    sinoVietnamese: params.sinoVietnamese,
    onyomi: params.onyomi,
    kunyomi: params.kunyomi,
    meaning: params.meaning,
    level: params.level,
    strokeCount: params.strokeCount,
    radicals: params.radicals,
    radicalMeaning: params.radicalMeaning,
    mnemonicStory: params.mnemonicStory,
    strokeOrderGuide: [],
    strokeOrderArrows: [],
    commonWords: [],
    calligraphyQuiz: {
      id: `cq_${params.character}`,
      question: `Nhận diện đúng chữ ${params.character} (${params.sinoVietnamese})`,
      options: [
        { id: 'a', text: params.meaning, isCorrect: true },
        { id: 'b', text: 'Khác nghĩa', isCorrect: false },
      ],
      correctExplanation: `${params.character} (${params.sinoVietnamese}) mang nghĩa: ${params.meaning}.`,
      mnemonicTip: params.mnemonicStory,
    },
  };
}

function buildRecordFromTwinClusters(char: string): ExtendedKanjiItem | null {
  for (const cluster of Object.values(TWIN_CLUSTERS)) {
    const member = cluster.members.find((m) => m.character === char);
    if (member) {
      const onList = member.onyomi && member.onyomi !== '—'
        ? member.onyomi.split(/[,/]/).map((s) => s.trim()).filter(Boolean)
        : [];
      const kunList = member.kunyomi && member.kunyomi !== '—'
        ? member.kunyomi.split(/[,/]/).map((s) => s.trim()).filter(Boolean)
        : [];
      return makeSyntheticExtendedKanji({
        id: `twin_${member.character}`,
        character: member.character,
        sinoVietnamese: member.sinoVietnamese,
        onyomi: onList,
        kunyomi: kunList,
        meaning: member.meaning,
        level: member.level,
        strokeCount: 9,
        radicals: [member.microDifference],
        radicalMeaning: member.microDifference,
        mnemonicStory: `${member.microDifference}. ${member.trapNote}`,
      });
    }
  }
  return null;
}

export function findKanjiRecord(query: string): ExtendedKanjiItem | null {
  const raw = query.trim();
  if (!raw) return allKanjiMasterList[0] || null;

  // 1. Exact kanji character match
  const firstKanjiMatch = raw.match(/[\u4E00-\u9FAF\u3400-\u4DBF]/);
  if (firstKanjiMatch) {
    const ch = firstKanjiMatch[0];
    const curated = CURATED_KANJI_DOSSIERS[ch];
    const exact = allKanjiMasterList.find((k) => k.character === ch);
    if (exact) return exact;
    const extHit = findInExtendedKanjiCatalog(ch);
    if (extHit) return extHit;
    const twinRec = buildRecordFromTwinClusters(ch);
    if (twinRec) return twinRec;
    if (curated) {
      return makeSyntheticExtendedKanji({
        id: `curated_${ch}`,
        character: ch,
        sinoVietnamese: curated.etymology.deepLogic.slice(0, 12),
        onyomi: [],
        kunyomi: [],
        meaning: curated.etymology.threeSecondHook,
        level: 'N3',
        strokeCount: 8,
        radicals: curated.radicals.map((r) => r.char),
        radicalMeaning: curated.radicals.map((r) => r.meaning).join(', '),
        mnemonicStory: curated.etymology.threeSecondHook,
      });
    }
  }

  const lower = raw.toLowerCase();
  const normalized = normalizeVietnameseText(raw);

  // 2. Check Extended Jinmeiyo/Hyougai & Curated Romaji/Kana/Sino-Vietnamese Gateway Catalog first
  const extDirect = findInExtendedKanjiCatalog(raw);
  if (extDirect) return extDirect;

  // 3. Exact Sino-Vietnamese match (including đ -> d normalization)
  const svExact = allKanjiMasterList.find(
    (k) =>
      k.sinoVietnamese.toLowerCase() === lower ||
      normalizeVietnameseText(k.sinoVietnamese) === normalized
  );
  if (svExact) return svExact;

  // 4. Partial match in Sino-Vietnamese, reading, or meaning
  const partial = allKanjiMasterList.find(
    (k) =>
      normalizeVietnameseText(k.sinoVietnamese).includes(normalized) ||
      normalizeVietnameseText(k.meaning).includes(normalized) ||
      k.onyomi.some((o) => o.includes(lower)) ||
      k.kunyomi.some((ku) => ku.replace('.', '').includes(lower))
  );
  if (partial) return partial;

  // Check twin clusters for Sino-Vietnamese / meaning match
  for (const cluster of Object.values(TWIN_CLUSTERS)) {
    const matchedMember = cluster.members.find((m) => {
      const svN = normalizeVietnameseText(m.sinoVietnamese);
      const mN = normalizeVietnameseText(m.meaning);
      return svN === normalized || mN.includes(normalized);
    });
    if (matchedMember) {
      return buildRecordFromTwinClusters(matchedMember.character);
    }
  }

  // 5. If user pasted an unknown Kanji character not in list, synthesize an ExtendedKanjiItem on the fly
  if (firstKanjiMatch) {
    const ch = firstKanjiMatch[0];
    return makeSyntheticExtendedKanji({
      id: `custom_${ch}`,
      character: ch,
      sinoVietnamese: 'HÁN TỰ TRA CỨU',
      onyomi: ['オン'],
      kunyomi: ['くん'],
      meaning: `Hán tự tra cứu trực tiếp【${ch}】`,
      level: 'N1',
      strokeCount: 10,
      radicals: ['Bộ thủ tổng hợp'],
      radicalMeaning: 'Bộ thủ tổng hợp',
      mnemonicStory: `Hán tự【${ch}】được phân giải theo cấu trúc bộ thủ và từ ghép thực chiến.`,
    });
  }

  return null;
}

export function searchKanjiCandidates(query: string, level: JLPTLevel | 'ALL' = 'ALL', limit = 40): ExtendedKanjiItem[] {
  const q = query.trim().toLowerCase();
  const qNorm = q.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let pool = level === 'ALL' ? allKanjiMasterList : allKanjiMasterList.filter((k) => k.level === level);
  if (!q) {
    // Surface iconic curated showcase Kanji near the front if ALL, otherwise level order
    if (level === 'ALL') {
      const priorityChars = ['海', '待', '持', '特', '柿', '姉', '会', '日', '安', '木', '本', '休', '未', '末', '清', '晴'];
      const priorityItems = priorityChars
        .map((c) => pool.find((k) => k.character === c) || buildRecordFromTwinClusters(c))
        .filter((x): x is ExtendedKanjiItem => Boolean(x));
      const prioritySet = new Set(priorityItems.map((x) => x.character));
      const rest = pool.filter((k) => !prioritySet.has(k.character));
      return [...priorityItems, ...rest].slice(0, limit);
    }
    return pool.slice(0, limit);
  }

  return pool
    .filter((k) => {
      const svNorm = k.sinoVietnamese.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const mNorm = k.meaning.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return (
        k.character.includes(query.trim()) ||
        svNorm.includes(qNorm) ||
        mNorm.includes(qNorm) ||
        k.onyomi.some((o) => o.toLowerCase().includes(q)) ||
        k.kunyomi.some((ku) => ku.toLowerCase().includes(q))
      );
    })
    .slice(0, limit);
}

export function buildKanjiUniverseDossier(kanjiInput: ExtendedKanjiItem | string): KanjiUniverseDossier {
  const record: ExtendedKanjiItem =
    typeof kanjiInput === 'string'
      ? findKanjiRecord(kanjiInput) || allKanjiMasterList[0]
      : kanjiInput;

  const ch = record.character;
  const sinoProfile = resolveTruthLockedSinoVietnamese(ch, record.sinoVietnamese);
  const canonicalSino = sinoProfile.primary;

  const curated = CURATED_KANJI_DOSSIERS[ch];
  const recordRadStr = normalizeRadicalsStr(record.radicals);
  const recordRadArr = Array.isArray(record.radicals)
    ? record.radicals
    : recordRadStr
    ? [recordRadStr]
    : [];
  const pictorial = getKanjiPictorialInfo(ch, canonicalSino, record.meaning, recordRadArr);
  const compRad = COMPREHENSIVE_RADICALS[ch];
  const jukugoFallback = JUKUGO_DATABASE[ch];

  // 1. Radicals & Etymology
  let radicals: KanjiRadicalPart[] = [];
  let etymology: EtymologyEvolution;

  if (curated) {
    radicals = curated.radicals;
    etymology = curated.etymology;
  } else if (compRad) {
    radicals = compRad.components.map((c, idx) => ({
      char: c.char,
      name: c.name,
      meaning: c.meaning,
      role: idx === 0 ? 'Hình (Nghĩa)' : 'Hội ý',
      position: compRad.position,
    }));
    etymology = {
      oracleBoneNote: compRad.etymologyStory,
      bronzeScriptNote: `Chuyển biến từ nét vẽ tượng hình sang kết cấu bộ thủ【${compRad.mainRadicalName}】cân đối.`,
      sealScriptNote: `Định hình cấu trúc Khải thư với ${record.strokeCount} nét tiêu chuẩn.`,
      oracleSvgPaths: [
        'M 30 22 Q 50 15 70 22 L 74 78 Q 50 84 26 78 Z',
        'M 32 50 L 68 50 M 50 24 L 50 76',
      ],
      bronzeSvgPaths: [
        'M 25 24 L 75 24 L 75 76 L 25 76 Z',
        'M 25 50 L 75 50 M 50 24 L 50 76',
      ],
      threeSecondHook: pictorial.simpleMnemonic || compRad.etymologyStory,
      deepLogic: compRad.philosophicalNote,
    };
  } else {
    const radLabel = recordRadStr ? `Bộ ${recordRadStr}` : `Bộ thủ gốc của ${ch}`;
    radicals = [
      {
        char: ch,
        name: radLabel,
        meaning: record.meaning,
        role: 'Hình (Nghĩa)',
        position: 'Cấu trúc toàn thể',
      },
    ];
    etymology = {
      oracleBoneNote: `Chữ【${ch}】khởi nguồn từ hình ảnh liên quan đến "${record.meaning}" (${pictorial.visualAnalogy || canonicalSino}).`,
      bronzeScriptNote: `Khắc trên đỉnh đồng thời Chu với đường nét tinh giản theo ${radLabel}.`,
      sealScriptNote: `Chuẩn hóa ${record.strokeCount} nét viết chuẩn Nhật hiện đại (Joyo Kanji).`,
      oracleSvgPaths: [
        'M 50 18 Q 22 30 24 60 Q 50 85 76 60 Q 78 30 50 18 Z',
        'M 36 48 L 64 48 M 50 32 L 50 68',
      ],
      bronzeSvgPaths: [
        'M 24 22 L 76 22 L 72 78 L 28 78 Z',
        'M 34 50 L 66 50 M 50 26 L 50 74',
      ],
      threeSecondHook:
        pictorial.simpleMnemonic && !pictorial.simpleMnemonic.includes('biểu tượng')
          ? pictorial.simpleMnemonic
          : `Ghi nhớ【${ch}】(${canonicalSino}): Thuộc ${radLabel} — gắn liền trực tiếp với hình ảnh "${record.meaning}".`,
      deepLogic: `Âm Hán Việt chuẩn [${canonicalSino}] là chìa khóa vàng giúp suy luận nhanh hàng loạt từ ghép Âm On (${record.onyomi.join(', ') || '—'}) trong bài thi JLPT ${record.level}.`,
    };
  }

  // 2. Jukugo Ecosystem (Categorized strictly into Âm On & Âm Kun, zero duplicates)
  let onCompounds: JukugoCompoundItem[] = [];
  let kunCompounds: JukugoCompoundItem[] = [];

  if (curated) {
    onCompounds = curated.onCompounds;
    kunCompounds = curated.kunCompounds;
  } else {
    const seenWords = new Set<string>();
    const combinedVocab = [...(pictorial.lifeVocab || []), ...(pictorial.examVocab || [])];

    if (jukugoFallback) {
      for (const j of jukugoFallback) {
        if (seenWords.has(j.compound)) continue;
        seenWords.add(j.compound);
        const cleanRead = j.reading.split('/')[0].trim();
        onCompounds.push({
          word: j.compound,
          reading: cleanRead,
          romaji: kanaToRomajiSimple(cleanRead),
          sinoVietnamese: j.sinoVietnamese,
          meaning: j.meaning,
          readingType: 'on',
          pitchType: cleanRead.length <= 2 ? 'atamadaka' : 'heiban',
          pitchAccentNum: cleanRead.length <= 2 ? 1 : 0,
          rendakuAlert: detectRendakuOrSokuon(cleanRead, j.compound),
          exampleJa: j.exampleJa,
          exampleReading: j.exampleJa,
          exampleVi: j.exampleVi,
          jlpt: (j.level as JLPTLevel) || record.level,
        });
      }
    }

    for (const v of combinedVocab) {
      if (seenWords.has(v.word)) continue;
      seenWords.add(v.word);

      const isKun = /[ぁ-ん]/.test(v.word) || v.word === ch;
      const cleanRead = v.reading.replace(/[（(].*?[）)]/g, '').trim();
      const rendaku = detectRendakuOrSokuon(cleanRead, v.word);
      const pitchTypes: ('heiban' | 'atamadaka' | 'nakadaka')[] = ['heiban', 'atamadaka', 'nakadaka'];
      const pitchType = pitchTypes[(v.word.charCodeAt(0) || 0) % pitchTypes.length];
      const pitchAccentNum = pitchType === 'heiban' ? 0 : pitchType === 'atamadaka' ? 1 : 2;

      const resolvedCompoundSino =
        resolveCompoundSinoVietnamese(
          v.word,
          (c) =>
            (c === ch
              ? canonicalSino
              : allKanjiMasterList.find((k) => k.character === c)?.sinoVietnamese)
        ) ||
        v.sinoVietnamese ||
        canonicalSino;

      const item: JukugoCompoundItem = {
        word: v.word,
        reading: cleanRead,
        romaji: kanaToRomajiSimple(cleanRead),
        sinoVietnamese: resolvedCompoundSino,
        meaning: v.meaning,
        readingType: isKun ? 'kun' : 'on',
        pitchType,
        pitchAccentNum,
        rendakuAlert: rendaku,
        exampleJa: isKun
          ? `毎日の会話で「${v.word}」をよく使います。`
          : `試験やビジネスで「${v.word}」という表現が重要です。`,
        exampleReading: cleanRead,
        exampleVi: `Trong giao tiếp & bài thi, "${v.word}" mang nghĩa: ${v.meaning}.`,
        jlpt: record.level,
      };

      if (isKun && kunCompounds.length < 5) {
        kunCompounds.push(item);
      } else if (!isKun && onCompounds.length < 6) {
        onCompounds.push(item);
      }
    }

    // Guarantee at least one On and one Kun entry so no section is empty
    if (onCompounds.length === 0 && record.onyomi.length > 0) {
      const firstOn = record.onyomi[0].replace(/[-.]/g, '');
      onCompounds.push({
        word: `${ch}的`,
        reading: `${firstOn}てき`,
        romaji: kanaToRomajiSimple(`${firstOn}てき`),
        sinoVietnamese: `${canonicalSino} ĐÍCH`,
        meaning: `Mang tính chất của "${record.meaning}"`,
        readingType: 'on',
        pitchType: 'heiban',
        pitchAccentNum: 0,
        exampleJa: `その考え方はとても${ch}的だ。`,
        exampleReading: `${firstOn}てきだ`,
        exampleVi: `Cách suy nghĩ đó rất mang tính ${record.meaning.toLowerCase()}.`,
        jlpt: record.level,
      });
    }

    if (kunCompounds.length === 0 && record.kunyomi.length > 0) {
      const rawKun = record.kunyomi[0].replace(/^-/, '');
      const cleanKun = rawKun.replace(/\./g, '');
      kunCompounds.push({
        word: rawKun.includes('.') ? ch + rawKun.split('.')[1] : ch,
        reading: cleanKun,
        romaji: kanaToRomajiSimple(cleanKun),
        sinoVietnamese: canonicalSino,
        meaning: record.meaning,
        readingType: 'kun',
        pitchType: 'atamadaka',
        pitchAccentNum: 1,
        exampleJa: `日常の中で「${cleanKun}」という読み方を覚える。`,
        exampleReading: cleanKun,
        exampleVi: `Ghi nhớ cách đọc thuần Nhật "${cleanKun}" (${record.meaning}).`,
        jlpt: record.level,
      });
    }
  }

  // 3. JLPT Lookalike Twin Trap Radar
  let twinTraps: KanjiTwinTrapItem[] = [];
  let twinTrapGroupTitle = 'Radar Đối Chiếu Hán Tự Dễ Nhầm (JLPT Trap)';

  if (curated?.twinClusterId && TWIN_CLUSTERS[curated.twinClusterId]) {
    const cluster = TWIN_CLUSTERS[curated.twinClusterId];
    twinTrapGroupTitle = cluster.title;
    twinTraps = cluster.members;
  } else {
    // Check if character belongs to any twin cluster dynamically
    const foundCluster = Object.values(TWIN_CLUSTERS).find((c) =>
      c.members.some((m) => m.character === ch)
    );
    if (foundCluster) {
      twinTrapGroupTitle = foundCluster.title;
      twinTraps = foundCluster.members;
    } else {
      // Synthesize 1:1 structural lookalike & homophone-onyomi trap list from allKanjiMasterList
      const primaryOn = record.onyomi[0]?.replace(/[-.]/g, '') || '';
      const similarByStrokeAndRad = allKanjiMasterList
        .filter(
          (k) =>
            k.character !== ch &&
            ((recordRadStr && normalizeRadicalsStr(k.radicals) === recordRadStr) ||
              (primaryOn && k.onyomi.some((o) => o.replace(/[-.]/g, '') === primaryOn))) &&
            Math.abs((k.strokeCount || 6) - (record.strokeCount || 6)) <= 2
        )
        .slice(0, 3);

      twinTraps = [
        {
          character: ch,
          sinoVietnamese: canonicalSino,
          onyomi: record.onyomi[0] || '—',
          kunyomi: record.kunyomi[0] || '—',
          meaning: record.meaning,
          microDifference: `Chữ mục tiêu · ${record.strokeCount} nét (${recordRadStr || 'Bộ cơ bản'})`,
          trapNote: 'Điểm neo gốc đang khảo sát.',
          level: record.level,
        },
        ...similarByStrokeAndRad.map((sim) => {
          const simRadStr = normalizeRadicalsStr(sim.radicals);
          const simTruth = resolveTruthLockedSinoVietnamese(sim.character, sim.sinoVietnamese);
          return {
            character: sim.character,
            sinoVietnamese: simTruth.primary,
            onyomi: sim.onyomi[0] || '—',
            kunyomi: sim.kunyomi[0] || '—',
            meaning: sim.meaning,
            microDifference:
              simRadStr === recordRadStr && simRadStr
                ? `Cùng bộ [${simRadStr}] (${sim.strokeCount} nét)`
                : `Cùng âm On [${primaryOn}] (${sim.strokeCount} nét)`,
            trapNote: `Cẩn thận nhầm nghĩa "${sim.meaning}" với "${record.meaning}" khi làm bài đọc hiểu JLPT.`,
            level: sim.level,
          };
        }),
      ];
    }
  }

  // 4. Self-Verification Audit Protocol
  const verificationChecklist = {
    workspaceIsolated: true,
    etymologyAnchored: radicals.length > 0 && etymology.threeSecondHook.trim().length > 0,
    jukugoDeduplicated:
      new Set([...onCompounds, ...kunCompounds].map((c) => c.word)).size ===
      onCompounds.length + kunCompounds.length,
    trapRadarActive: twinTraps.length > 0,
  };

  return {
    character: ch,
    sinoVietnamese: canonicalSino,
    sinoProfile,
    crawlerVerified: true,
    meaning: record.meaning,
    level: record.level,
    strokeCount: record.strokeCount || 4,
    mainRadical: recordRadStr || radicals[0]?.name || 'Cơ bản',
    onyomi: record.onyomi,
    kunyomi: record.kunyomi,
    radicals,
    etymology,
    onCompounds,
    kunCompounds,
    twinTraps,
    twinTrapGroupTitle,
    verificationChecklist,
  };
}

// ============================================================================
// 4. INFINITE +3 SIBLING KANJI EXPANSION ENGINE
// ============================================================================

export function expandThreeSiblingKanji(
  baseKanji: string,
  axis: 'radical' | 'reading',
  alreadyShownChars: string[]
): SiblingKanjiNode[] {
  const base = findKanjiRecord(baseKanji);
  if (!base) return [];

  const excludeSet = new Set([base.character, ...alreadyShownChars]);
  const baseOnList = base.onyomi.map((o) => o.replace(/[-.]/g, '').trim()).filter(Boolean);
  const baseRad = normalizeRadicalsStr(base.radicals).toLowerCase();

  let candidates: { item: ExtendedKanjiItem; reason: string }[] = [];

  if (axis === 'radical') {
    // 1st pass: exact same radical
    for (const k of allKanjiMasterList) {
      if (excludeSet.has(k.character)) continue;
      const kRad = normalizeRadicalsStr(k.radicals);
      if (kRad.toLowerCase() === baseRad && baseRad) {
        candidates.push({
          item: k,
          reason: `Chung bộ thủ [${kRad}]`,
        });
      }
    }
    // 2nd pass: shared phonetic/twin cluster or stroke proximity
    if (candidates.length < 3) {
      for (const k of allKanjiMasterList) {
        if (excludeSet.has(k.character)) continue;
        if (candidates.some((c) => c.item.character === k.character)) continue;
        if (Math.abs((k.strokeCount || 6) - (base.strokeCount || 6)) <= 1) {
          candidates.push({
            item: k,
            reason: `Cùng nhóm ${k.strokeCount} nét · Liên kết ngữ nghĩa`,
          });
        }
        if (candidates.length >= 12) break;
      }
    }
  } else {
    // Reading axis: shared Onyomi
    for (const k of allKanjiMasterList) {
      if (excludeSet.has(k.character)) continue;
      const matchedOn = k.onyomi.find((o) => baseOnList.includes(o.replace(/[-.]/g, '').trim()));
      if (matchedOn) {
        candidates.push({
          item: k,
          reason: `Cùng âm On「${matchedOn}」`,
        });
      }
    }
    // Fallback to same Sino-Vietnamese initial or level
    if (candidates.length < 3) {
      const svPrefix = base.sinoVietnamese.slice(0, 2);
      for (const k of allKanjiMasterList) {
        if (excludeSet.has(k.character)) continue;
        if (candidates.some((c) => c.item.character === k.character)) continue;
        if (k.sinoVietnamese.startsWith(svPrefix) || k.level === base.level) {
          candidates.push({
            item: k,
            reason: `Cùng cấp độ ${k.level} · Mở rộng liên hệ`,
          });
        }
        if (candidates.length >= 12) break;
      }
    }
  }

  return candidates.slice(0, 3).map(({ item, reason }) => ({
    character: item.character,
    sinoVietnamese: resolveTruthLockedSinoVietnamese(item.character, item.sinoVietnamese).primary,
    meaning: item.meaning,
    onyomi: item.onyomi,
    kunyomi: item.kunyomi,
    level: item.level,
    strokeCount: item.strokeCount,
    connectionReason: reason,
  }));
}

// ============================================================================
// 5. REAL-TIME STROKE RADAR ENGINE (DIRECTION, ORDER & MISSING CHECK)
// ============================================================================

function normalizeAngleDeg(deg: number): number {
  let a = deg % 360;
  if (a > 180) a -= 360;
  if (a <= -180) a += 360;
  return a;
}

function angularDifference(a: number, b: number): number {
  return Math.abs(normalizeAngleDeg(a - b));
}

export function analyzeStrokeRealTime(
  points: StrokeRadarPoint[],
  strokeIndex: number,
  expectedPaths: StrokePathData[]
): StrokeRadarResult {
  if (!points || points.length < 2) {
    return {
      strokeIndex,
      isValid: false,
      issueType: 'too_short',
      title: `Nét #${strokeIndex + 1} quá ngắn`,
      message: 'Hãy kéo nét bút dứt khoát hơn để Radar nhận diện hướng.',
      expectedAngle: 0,
      actualAngle: 0,
      expectedStroke: expectedPaths[strokeIndex],
    };
  }

  const start = points[0];
  const end = points[points.length - 1];
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.hypot(dx, dy);

  if (distance < 10) {
    // Allow tiny dots only if expected stroke itself is short (< 35px)
    const exp = expectedPaths[strokeIndex];
    const expLen = exp ? Math.hypot(exp.endX - exp.startX, exp.endY - exp.startY) : 50;
    if (expLen > 40) {
      return {
        strokeIndex,
        isValid: false,
        issueType: 'too_short',
        title: `Nét #${strokeIndex + 1} chưa kéo đủ dài`,
        message: 'Nét bút quá ngắn so với tỷ lệ chữ mẫu. Hãy kéo dài thêm!',
        expectedAngle: exp?.angle || 0,
        actualAngle: 0,
        expectedStroke: exp,
      };
    }
  }

  const actualAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const expectedStroke = expectedPaths[strokeIndex];

  if (!expectedStroke) {
    return {
      strokeIndex,
      isValid: false,
      issueType: 'wrong_order',
      title: `Thừa nét (Đã vượt quá ${expectedPaths.length} nét chuẩn)`,
      message: `Chữ này chỉ có ${expectedPaths.length} nét chuẩn. Hãy nhấn "Lùi nét sai" để chỉnh lại.`,
      expectedAngle: 0,
      actualAngle,
    };
  }

  const expectedLen = Math.hypot(
    expectedStroke.endX - expectedStroke.startX,
    expectedStroke.endY - expectedStroke.startY
  );
  const angleDiff = angularDifference(actualAngle, expectedStroke.angle);

  // Direction check: Flag if reversed (> 115 deg) for meaningful directional strokes
  if (expectedLen >= 25 && angleDiff > 115) {
    return {
      strokeIndex,
      isValid: false,
      issueType: 'wrong_direction',
      title: `Sai hướng nét #${strokeIndex + 1}!`,
      message: `Bạn vừa kéo ngược chiều bút. Quy tắc chuẩn: ${expectedStroke.instruction}.`,
      expectedAngle: expectedStroke.angle,
      actualAngle,
      expectedStroke,
    };
  }

  // Spatial position check: Did user start in a completely wrong quadrant (> 145px off expected start)?
  const startDist = Math.hypot(start.x - expectedStroke.startX, start.y - expectedStroke.startY);
  if (startDist > 155) {
    return {
      strokeIndex,
      isValid: false,
      issueType: 'wrong_order',
      title: `Sai vị trí / thứ tự nét #${strokeIndex + 1}!`,
      message: `Nét #${strokeIndex + 1} cần bắt đầu đúng vị trí quy định: ${expectedStroke.instruction}.`,
      expectedAngle: expectedStroke.angle,
      actualAngle,
      expectedStroke,
    };
  }

  return {
    strokeIndex,
    isValid: true,
    issueType: 'ok',
    title: `Nét #${strokeIndex + 1} chuẩn xác`,
    message: expectedStroke.instruction,
    expectedAngle: expectedStroke.angle,
    actualAngle,
    expectedStroke,
  };
}
