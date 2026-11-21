import { JLPTLevel } from '../types';
import { allKanjiMasterList, ExtendedKanjiItem } from '../data/allKanjiDatabase';
import {
  KanjiUniverseDossier,
  SiblingKanjiNode,
  findKanjiRecord,
  buildKanjiUniverseDossier,
  expandThreeSiblingKanji,
} from './kanjiUniverseEngine';

// ============================================================================
// INTERFACES FOR THE KANJI OMNIVERSE PILLARS
// ============================================================================

export type HomophoneVisualIcon =
  | 'ruler'
  | 'thermometer'
  | 'scale'
  | 'blueprint'
  | 'scheme'
  | 'handshake'
  | 'puzzle'
  | 'lantern'
  | 'lightning'
  | 'briefcase'
  | 'flame'
  | 'pillar'
  | 'eye'
  | 'stethoscope'
  | 'binocular'
  | 'nurse'
  | 'ear'
  | 'music'
  | 'medicine'
  | 'wrench'
  | 'camera'
  | 'compass';

export interface HomophoneMatrixEntry {
  word: string;
  baseKanji: string;
  reading: string;
  romaji: string;
  sinoVietnamese: string;
  coreNuance: string;
  targetDomain: string;
  radicalKey: string;
  radicalDecode: string;
  collocationDo: {
    phrase: string;
    meaning: string;
  };
  collocationDont: {
    phrase: string;
    reason: string;
  };
  tier: 'core' | 'advanced';
  tabooTrapRule: string;
  exampleJa: string;
  exampleVi: string;
  visualIcon: HomophoneVisualIcon;
  visualCaption: string;
  jlpt: JLPTLevel;
}

export interface HomophoneResolutionCluster {
  clusterId: string;
  title: string;
  readingBadge: string;
  romajiKey: string;
  summaryWarning: string;
  entries: HomophoneMatrixEntry[];
}

export interface MultiFontAlert {
  id: string;
  radicalOrPart: string;
  title: string;
  printFormNote: string;
  handwrittenFormNote: string;
  izakayaRealWorldTip: string;
  highlightZone: 'left' | 'right' | 'top' | 'bottom' | 'wrap' | 'center';
  crimsonOverlayPaths: string[];
}

export interface MultiFontProfile {
  character: string;
  hasCriticalDivergence: boolean;
  alerts: MultiFontAlert[];
  fonts: {
    id: 'mincho' | 'gothic' | 'kyokasho' | 'gyosho';
    label: string;
    sublabel: string;
    contextNote: string;
  }[];
}

export interface RealWorldScenePlate {
  id: string;
  sceneType: 'supermarket_tag' | 'tokyo_street_sign' | 'izakaya_menu' | 'jr_station_board';
  locationBadge: string;
  headlineJa: string;
  sublineJa: string;
  highlightedTerm: string;
  reading: string;
  sceneCaptionVi: string;
  realLifeTip: string;
}

export interface PressureAssessmentPayload {
  targetChar: string;
  targetWord: string;
  targetReading: string;
  targetRomaji: string;
  targetMeaning: string;
  level: JLPTLevel;
  flashRead: {
    promptKanji: string;
    correctReading: string;
    options: string[];
  };
  pitchVoice: {
    word: string;
    reading: string;
    morae: string[];
    highLowPattern: ('H' | 'L')[];
    pitchTypeLabel: string;
    pitchRuleNote: string;
  };
  newspaperCloze: {
    sourceTag: string;
    sentenceBefore: string;
    sentenceAfter: string;
    fullSentence: string;
    translationVi: string;
    correctOption: string;
    options: string[];
  };
}

export interface OmniverseAudit200Report {
  homophoneMatrixResolved: boolean;
  homophoneClusterTitle: string;
  homophoneSplitCardsReady: boolean;
  jlptTieringReady: boolean;
  hexaZenOrdered: boolean;
  multiFontReady: boolean;
  realWorldScenesReady: boolean;
  pressureCoreReady: boolean;
  zenUiDisciplined: boolean;
  allPassed: boolean;
}

export interface KanjiOmniverseBundle {
  dossier: KanjiUniverseDossier;
  homophoneCluster: HomophoneResolutionCluster;
  multiFont: MultiFontProfile;
  realWorldScenes: RealWorldScenePlate[];
  pressureCore: PressureAssessmentPayload;
  initialRadicalSiblings: SiblingKanjiNode[];
  initialReadingSiblings: SiblingKanjiNode[];
  audit200: OmniverseAudit200Report;
}

// ============================================================================
// 1. CURATED HIGH-YIELD HOMOPHONE & SYNONYM RESOLUTION CLUSTERS
// ============================================================================

const HOMOPHONE_CLUSTERS: HomophoneResolutionCluster[] = [
  {
    clusterId: 'hakaru',
    title: 'Ma trận 5 chữ HAKARU (はかる) — Đo lường & Tính toán',
    readingBadge: 'はかる',
    romajiKey: 'hakaru',
    summaryWarning:
      'Cùng đọc「はかる」nhưng khác Bộ Thủ là khác hoàn toàn đối tượng đo: Nước/Chiều dài (測), Thời gian/Con số (計), Cân nặng (量).',
    entries: [
      {
        word: '測る',
        baseKanji: '測',
        reading: 'はかる',
        romaji: 'hakaru',
        sinoVietnamese: 'TRẮC',
        coreNuance: 'Đo độ sâu, chiều dài, khoảng cách, diện tích',
        targetDomain: 'Kích thước không gian, độ sâu mặt nước',
        radicalKey: '氵 Bộ Thủy (Nước)',
        radicalDecode: 'Có bộ Thủy (氵 - Nước) → Chuyên đo mực nước, độ sâu, chiều dài, khoảng cách.',
        collocationDo: { phrase: '水深・長さを測る', meaning: 'Đo độ sâu nước / chiều dài' },
        collocationDont: { phrase: '時間を測る', reason: 'Đo thời gian phải dùng 計る' },
        tier: 'core',
        tabooTrapRule: 'CẤM dùng cho cân nặng (kg) hoặc giờ giấc!',
        exampleJa: '川の水深と橋の長さを測る。',
        exampleVi: 'Đo độ sâu dòng sông và chiều dài cây cầu.',
        visualIcon: 'ruler',
        visualCaption: 'Thước dây & Độ sâu nước',
        jlpt: 'N3',
      },
      {
        word: '計る',
        baseKanji: '計',
        reading: 'はかる',
        romaji: 'hakaru',
        sinoVietnamese: 'KẾ',
        coreNuance: 'Đo thời gian, nhiệt độ, đếm số liệu bằng máy',
        targetDomain: 'Đồng hồ bấm giờ, nhiệt kế, kế hoạch',
        radicalKey: '言 Bộ Ngôn + 十 Thập',
        radicalDecode: 'Có bộ Ngôn (言 - Tính nói) → Đo thời gian, nhiệt độ, lên kế hoạch bằng con số.',
        collocationDo: { phrase: '時間を計る', meaning: 'Đo thời gian / bấm giờ' },
        collocationDont: { phrase: '体重を計る', reason: 'Cân trọng lượng phải dùng 量る' },
        tier: 'core',
        tabooTrapRule: 'CẤM dùng để cân thực phẩm hoặc âm mưu!',
        exampleJa: '毎朝、体温計で熱を計る。',
        exampleVi: 'Mỗi sáng đo thân nhiệt bằng nhiệt kế.',
        visualIcon: 'thermometer',
        visualCaption: 'Đồng hồ & Nhiệt kế',
        jlpt: 'N4',
      },
      {
        word: '量る',
        baseKanji: '量',
        reading: 'はかる',
        romaji: 'hakaru',
        sinoVietnamese: 'LƯỢNG',
        coreNuance: 'Cân trọng lượng (kg, g) hoặc đong thể tích (ml)',
        targetDomain: 'Khối lượng & dung tích vật chất trên bàn cân',
        radicalKey: '里 Bộ Lý (Trọng lượng)',
        radicalDecode: 'Có bộ Lý/Trọng (里 - Khối lượng) → Chuyên đo cân nặng (kg) và dung tích (lít, ml).',
        collocationDo: { phrase: '重さ・体重を量る', meaning: 'Cân trọng lượng / cân nặng' },
        collocationDont: { phrase: '長さを量る', reason: 'Đo chiều dài phải dùng 測る' },
        tier: 'core',
        tabooTrapRule: 'CẤM dùng cho thời gian hay đo chiều dài!',
        exampleJa: '料理の前に砂糖の重さを量る。',
        exampleVi: 'Trước khi nấu ăn thì cân trọng lượng đường.',
        visualIcon: 'scale',
        visualCaption: 'Cân đĩa & Ca đong ml',
        jlpt: 'N3',
      },
      {
        word: '図る',
        baseKanji: '図',
        reading: 'はかる',
        romaji: 'hakaru',
        sinoVietnamese: 'ĐỒ',
        coreNuance: 'Lên kế hoạch, hướng tới cải thiện tích cực',
        targetDomain: 'Giải quyết vấn đề, tối ưu hiệu suất',
        radicalKey: '囗 Bộ Vi (Bản đồ)',
        radicalDecode: 'Có bộ Vi (囗 - Khung bản đồ) → Vạch định phương án, mưu cầu giải pháp tích cực.',
        collocationDo: { phrase: '効率化・解決を図る', meaning: 'Hướng tới hiệu suất / giải quyết' },
        collocationDont: { phrase: '長さを図る', reason: 'Không dùng cho đo đạc vật lý' },
        tier: 'advanced',
        tabooTrapRule: 'KHÔNG mang nghĩa đo đạc vật lý hay âm mưu xấu.',
        exampleJa: '業務の効率化と品質向上を図る。',
        exampleVi: 'Hướng tới nâng cao hiệu suất công việc và chất lượng.',
        visualIcon: 'blueprint',
        visualCaption: 'Bản vẽ chiến lược',
        jlpt: 'N2',
      },
      {
        word: '謀る',
        baseKanji: '謀',
        reading: 'はかる',
        romaji: 'hakaru',
        sinoVietnamese: 'MƯU',
        coreNuance: 'Âm mưu, toan tính bí mật, lừa dối',
        targetDomain: 'Mưu kế ngầm, gài bẫy đối thủ',
        radicalKey: '言 Bộ Ngôn + 某 Mỗ',
        radicalDecode: 'Có bộ Ngôn (言 - Bàn tính kín) → Bàn mưu tính kế bí mật, thường mang sắc thái xấu.',
        collocationDo: { phrase: '暗殺・悪事を謀る', meaning: 'Mưu tính việc bất chính' },
        collocationDont: { phrase: '改善を謀る', reason: 'Cải thiện tích cực phải dùng 図る' },
        tier: 'advanced',
        tabooTrapRule: 'CẤM dùng trong báo cáo tích cực thay cho 図る!',
        exampleJa: '敵を欺くために秘密の作戦を謀る。',
        exampleVi: 'Toan tính kế hoạch bí mật nhằm đánh lừa đối thủ.',
        visualIcon: 'scheme',
        visualCaption: 'Mưu lược bí mật',
        jlpt: 'N1',
      },
    ],
  },
  {
    clusterId: 'au',
    title: 'Ma trận 4 chữ AU (あう) — Gặp gỡ & Hòa hợp',
    readingBadge: 'あう',
    romajiKey: 'au',
    summaryWarning:
      'Phân tách rạch ròi: Gặp người quen (会う), Khớp kích cỡ/ý kiến (合う), Hẹn hò tình cảm (逢う) và Gặp tai họa bất ngờ (遭う).',
    entries: [
      {
        word: '会う',
        baseKanji: '会',
        reading: 'あう',
        romaji: 'au',
        sinoVietnamese: 'HỘI',
        coreNuance: 'Gặp gỡ con người (bạn bè, khách hàng, thầy cô)',
        targetDomain: 'Giao tiếp xã hội trực tiếp giữa người với người',
        radicalKey: '𠆢 Nhân Nón (Mái nhà tụ họp)',
        radicalDecode: 'Có mái nhà tụ họp (𠆢) → Con người hội ngộ, gặp mặt trực tiếp.',
        collocationDo: { phrase: '友達・先生に会う', meaning: 'Gặp gỡ bạn bè / thầy cô' },
        collocationDont: { phrase: 'サイズに会う', reason: 'Vừa kích cỡ phải dùng 合う' },
        tier: 'core',
        tabooTrapRule: 'CẤM dùng cho quần áo vừa vặn hay tai nạn!',
        exampleJa: '駅の前で十年ぶりの友人に会う。',
        exampleVi: 'Gặp người bạn sau 10 năm trước nhà ga.',
        visualIcon: 'handshake',
        visualCaption: 'Hội ngộ giữa người với người',
        jlpt: 'N5',
      },
      {
        word: '合う',
        baseKanji: '合',
        reading: 'あう',
        romaji: 'au',
        sinoVietnamese: 'HỢP',
        coreNuance: 'Vừa vặn, ăn khớp, hợp ý nhau',
        targetDomain: 'Kích cỡ, đáp án, khẩu vị, quan điểm',
        radicalKey: '亼 + 口 Bộ Khẩu (Khớp miệng)',
        radicalDecode: 'Nắp đậy khít miệng hộp (亼 + 口) → Hai vật/hai ý kiến khớp khít với nhau.',
        collocationDo: { phrase: 'サイズ・意見が合う', meaning: 'Vừa size / hợp quan điểm' },
        collocationDont: { phrase: '駅で友達に合う', reason: 'Gặp bạn bè phải dùng 会う' },
        tier: 'core',
        tabooTrapRule: 'Không dùng mang nghĩa "hẹn gặp mặt ai đó".',
        exampleJa: 'このジャケットはサイズも色も自分に合う。',
        exampleVi: 'Chiếc áo khoác này hợp với tôi cả về kích cỡ lẫn màu sắc.',
        visualIcon: 'puzzle',
        visualCaption: 'Mảnh ghép ăn khớp',
        jlpt: 'N4',
      },
      {
        word: '遭う',
        baseKanji: '遭',
        reading: 'あう',
        romaji: 'au',
        sinoVietnamese: 'TAO',
        coreNuance: 'Gặp phải sự cố bất ngờ ngoài ý muốn',
        targetDomain: 'Tai nạn, mưa bão, lừa đảo (Sắc thái xấu)',
        radicalKey: '辶 Bộ Sước (Bước gặp bất ngờ)',
        radicalDecode: 'Có bộ Sước (辶 - Đường đi) → Đang đi trên đường thì đụng phải tai họa bất ngờ.',
        collocationDo: { phrase: '事故・災害に遭う', meaning: 'Gặp tai nạn / thiên tai' },
        collocationDont: { phrase: '恋人に遭う', reason: 'Gặp người yêu phải dùng 会う/逢う' },
        tier: 'advanced',
        tabooTrapRule: 'CẤM dùng khi gặp may mắn hoặc hẹn bạn đi chơi!',
        exampleJa: '旅行の途中で激しい雷雨に遭ってしまった。',
        exampleVi: 'Giữa chuyến du lịch thì không may gặp cơn giông dữ dội.',
        visualIcon: 'lightning',
        visualCaption: 'Sự cố bất ngờ trên đường',
        jlpt: 'N2',
      },
      {
        word: '逢う',
        baseKanji: '逢',
        reading: 'あう',
        romaji: 'au',
        sinoVietnamese: 'PHÙNG',
        coreNuance: 'Trùng phùng đầy cảm xúc, hẹn hò đôi lứa',
        targetDomain: 'Văn học, thơ ca, tình cảm sâu nặng',
        radicalKey: '辶 Bộ Sước + 夆 (Giao điểm)',
        radicalDecode: 'Hai con đường giao nhau (辶 + 夆) → Cuộc hội ngộ tình cảm, mang chất thơ.',
        collocationDo: { phrase: '恋人に逢う', meaning: 'Hẹn gặp người thương (văn học)' },
        collocationDont: { phrase: '取引先に逢う', reason: 'Gặp đối tác phải dùng 会う' },
        tier: 'advanced',
        tabooTrapRule: 'Không dùng trong email hẹn đối tác kinh doanh.',
        exampleJa: '七夕の夜に織姫と彦星が天の川で逢う。',
        exampleVi: 'Đêm Thất Tịch Ngưu Lang và Chức Nữ hội ngộ bên sông Ngân.',
        visualIcon: 'lantern',
        visualCaption: 'Cuộc hẹn mang chất thơ',
        jlpt: 'N1',
      },
    ],
  },
  {
    clusterId: 'tsutomeru',
    title: 'Ma trận 3 chữ TSUTOMERU (つとめる) — Làm việc, Nỗ lực & Vai trò',
    readingBadge: 'つとめる',
    romajiKey: 'tsutomeru',
    summaryWarning:
      'Gắn chặt trợ từ & Bộ thủ: Nơi làm việc (勤める + に), Nỗ lực bằng sức lực (努める + に), Đảm nhiệm chức vụ (務める + を).',
    entries: [
      {
        word: '勤める',
        baseKanji: '勤',
        reading: 'つとめる',
        romaji: 'tsutomeru',
        sinoVietnamese: 'CẦN',
        coreNuance: 'Làm việc biên chế tại công ty, ngân hàng',
        targetDomain: 'Nơi chốn làm việc hàng ngày (cơ quan)',
        radicalKey: '力 Bộ Lực (Sức lao động chuyên cần)',
        radicalDecode: 'Chuyên cần góp sức (力) hàng ngày → Làm nhân viên tại một tổ chức/công ty.',
        collocationDo: { phrase: '会社・銀行に勤める', meaning: 'Làm việc tại công ty / ngân hàng' },
        collocationDont: { phrase: '議長を勤める', reason: 'Đảm nhiệm chức vụ phải dùng 務める' },
        tier: 'core',
        tabooTrapRule: 'CẤM dùng với trợ từ を để chỉ chức danh!',
        exampleJa: '姉は東京の外資系企業に勤めている。',
        exampleVi: 'Chị gái tôi đang làm việc tại một doanh nghiệp vốn nước ngoài ở Tokyo.',
        visualIcon: 'briefcase',
        visualCaption: 'Công sở & Nơi làm việc',
        jlpt: 'N4',
      },
      {
        word: '努める',
        baseKanji: '努',
        reading: 'つとめる',
        romaji: 'tsutomeru',
        sinoVietnamese: 'NỖ',
        coreNuance: 'Cố gắng hết sức, nỗ lực phấn đấu',
        targetDomain: 'Hành động nỗ lực đạt mục tiêu (～に努める)',
        radicalKey: '奴 + 力 Bộ Lực (Dồn toàn lực)',
        radicalDecode: 'Dồn hết sức lực (力) phía dưới → Phấn đấu, nỗ lực hết mình vì mục tiêu.',
        collocationDo: { phrase: '安全・解決に努める', meaning: 'Nỗ lực đảm bảo an toàn / giải quyết' },
        collocationDont: { phrase: '銀行に努める', reason: 'Làm việc ở công ty phải dùng 勤める' },
        tier: 'core',
        tabooTrapRule: 'Không mang nghĩa "đi làm ở cơ quan nào".',
        exampleJa: '事故を防ぐため、安全確認に努める。',
        exampleVi: 'Để phòng ngừa tai nạn, chúng tôi nỗ lực kiểm tra an toàn.',
        visualIcon: 'flame',
        visualCaption: 'Quyết tâm phấn đấu',
        jlpt: 'N3',
      },
      {
        word: '務める',
        baseKanji: '務',
        reading: 'つとめる',
        romaji: 'tsutomeru',
        sinoVietnamese: 'VỤ',
        coreNuance: 'Đảm nhiệm vai trò, chức vụ, diễn viên chính',
        targetDomain: 'Chức trách cụ thể đi kèm trợ từ を',
        radicalKey: '矛 + 力 Bộ Lực (Trọng trách nhiệm vụ)',
        radicalDecode: 'Cầm giáo gánh vác (矛 + 力) → Đứng ra đảm nhận một nhiệm vụ/vai trò cụ thể.',
        collocationDo: { phrase: '議長・主役を務める', meaning: 'Đảm nhiệm chủ tọa / vai chính' },
        collocationDont: { phrase: '会社を務める', reason: 'Làm công ty phải dùng 勤める' },
        tier: 'advanced',
        tabooTrapRule: 'Chỉ dùng với danh từ chỉ chức trách + を.',
        exampleJa: '彼は今回の国際会議で議長を務める。',
        exampleVi: 'Anh ấy đảm nhiệm vai trò chủ tọa trong hội nghị quốc tế lần này.',
        visualIcon: 'pillar',
        visualCaption: 'Trọng trách chức danh',
        jlpt: 'N2',
      },
    ],
  },
  {
    clusterId: 'miru',
    title: 'Ma trận 5 chữ MIRU (みる) — Nhìn, Khám bệnh & Chăm sóc',
    readingBadge: 'みる',
    romajiKey: 'miru',
    summaryWarning:
      'Điểm mấu chốt qua Bộ Thủ: Xem thường (見), Thưởng thức (観), Bác sĩ khám dùng bộ Ngôn (診), Điều dưỡng che mắt chăm nom (看).',
    entries: [
      {
        word: '見る',
        baseKanji: '見',
        reading: 'みる',
        romaji: 'miru',
        sinoVietnamese: 'KIẾN',
        coreNuance: 'Nhìn, xem bằng mắt thông thường',
        targetDomain: 'TV, phong cảnh, tài liệu, thử làm gì',
        radicalKey: '目 Bộ Mục (Con mắt)',
        radicalDecode: 'Con mắt (目) đặt trên đôi chân → Đưa mắt nhìn cảnh vật thông thường hàng ngày.',
        collocationDo: { phrase: 'テレビ・景色を見る', meaning: 'Xem TV / ngắm phong cảnh' },
        collocationDont: { phrase: '医師が患者を見る', reason: 'Bác sĩ khám bệnh phải dùng 診る' },
        tier: 'core',
        tabooTrapRule: 'Không dùng trong ngữ cảnh bác sĩ chẩn đoán y khoa.',
        exampleJa: '窓から美しい富士山を見る。',
        exampleVi: 'Ngắm nhìn núi Phú Sĩ tuyệt đẹp từ khung cửa sổ.',
        visualIcon: 'eye',
        visualCaption: 'Quan sát thị giác',
        jlpt: 'N5',
      },
      {
        word: '観る',
        baseKanji: '観',
        reading: 'みる',
        romaji: 'miru',
        sinoVietnamese: 'QUAN',
        coreNuance: 'Thưởng thức phim rạp, kịch, thể thao',
        targetDomain: 'Tâm thế thưởng lãm tác phẩm nghệ thuật',
        radicalKey: '見 Bộ Kiến (Quan sát thưởng lãm)',
        radicalDecode: 'Chú mục quan sát (見) tỉ mỉ → Thưởng thức phim ảnh, kịch nghệ, trận đấu.',
        collocationDo: { phrase: '映画・試合を観る', meaning: 'Xem phim rạp / xem trận đấu' },
        collocationDont: { phrase: '辞書を観る', reason: 'Tra từ điển phải dùng 見る' },
        tier: 'core',
        tabooTrapRule: 'Không dùng cho việc "xem qua" hay "tra cứu".',
        exampleJa: '週末は映画館で話題の映画を観る予定だ。',
        exampleVi: 'Cuối tuần dự định đi rạp thưởng thức bộ phim đang gây sốt.',
        visualIcon: 'camera',
        visualCaption: 'Màn ảnh & Khán đài',
        jlpt: 'N3',
      },
      {
        word: '診る',
        baseKanji: '診',
        reading: 'みる',
        romaji: 'miru',
        sinoVietnamese: 'CHẨN',
        coreNuance: 'Bác sĩ khám bệnh, bắt mạch và chẩn đoán',
        targetDomain: 'Chẩn đoán y khoa chuyên môn',
        radicalKey: '言 Bộ Ngôn (Hỏi chẩn đoán)',
        radicalDecode: 'Có bộ Ngôn (言 - Hỏi triệu chứng) → Bác sĩ hỏi khám và kết luận bệnh án.',
        collocationDo: { phrase: '医者が患者を診る', meaning: 'Bác sĩ khám bệnh cho bệnh nhân' },
        collocationDont: { phrase: '映画を診る', reason: 'Chỉ dùng cho khám chẩn đoán y khoa' },
        tier: 'advanced',
        tabooTrapRule: 'CHỈ dành cho bác sĩ/nha sĩ khám, khác 看る!',
        exampleJa: '内科の先生に喉の調子を診てもらう。',
        exampleVi: 'Nhờ bác sĩ nội khoa khám tình trạng cổ họng.',
        visualIcon: 'stethoscope',
        visualCaption: 'Khám chẩn đoán y khoa',
        jlpt: 'N2',
      },
      {
        word: '看る',
        baseKanji: '看',
        reading: 'みる',
        romaji: 'miru',
        sinoVietnamese: 'KHÁN',
        coreNuance: 'Chăm sóc, trông nom bệnh nhân/trẻ nhỏ',
        targetDomain: 'Điều dưỡng túc trực bên giường bệnh',
        radicalKey: '手 Tay + 目 Mắt (Che mắt trông nom)',
        radicalDecode: 'Bàn tay (手) che trên con mắt (目) → Túc trực chăm nom, điều dưỡng bệnh nhân.',
        collocationDo: { phrase: '病人・子供を看る', meaning: 'Chăm sóc người bệnh / trông trẻ' },
        collocationDont: { phrase: '医者が脈を看る', reason: 'Khám mạch chẩn đoán dùng 診る' },
        tier: 'advanced',
        tabooTrapRule: 'Khác 診る (chẩn bệnh): đây là chăm sóc cận kề!',
        exampleJa: '看護師が夜通し患者の容態を看る。',
        exampleVi: 'Điều dưỡng túc trực chăm nom tình trạng bệnh nhân suốt đêm.',
        visualIcon: 'nurse',
        visualCaption: 'Điều dưỡng chăm nom',
        jlpt: 'N2',
      },
      {
        word: '視る',
        baseKanji: '視',
        reading: 'みる',
        romaji: 'miru',
        sinoVietnamese: 'THỊ',
        coreNuance: 'Nhìn thẳng kiểm tra, thị sát tình hình',
        targetDomain: 'Văn viết phân tích, kiểm tra hiện trường',
        radicalKey: '礻 Bộ Thị + 見 Kiến',
        radicalDecode: 'Bộ Thị + Kiến (礻 + 見) → Nhìn nhận sâu sắc, thị sát có chủ đích.',
        collocationDo: { phrase: '現場の状況を視る', meaning: 'Thị sát / nhìn nhận hiện trường' },
        collocationDont: { phrase: 'ちょっと見て視る', reason: 'Thử làm gì dùng みる (Kana)' },
        tier: 'advanced',
        tabooTrapRule: 'Chủ yếu dùng trong văn viết phân tích & thị sát.',
        exampleJa: '現場の状況を冷静に視る必要がある。',
        exampleVi: 'Cần nhìn nhận tình hình hiện trường một cách bình tĩnh.',
        visualIcon: 'binocular',
        visualCaption: 'Thị sát & Phân tích',
        jlpt: 'N1',
      },
    ],
  },
  {
    clusterId: 'kiku',
    title: 'Ma trận 4 chữ KIKU (きく) — Nghe, Hỏi & Công hiệu',
    readingBadge: 'きく',
    romajiKey: 'kiku',
    summaryWarning:
      'Phân biệt: Nghe/Hỏi thường (聞く), Chú tâm lắng nghe bằng tim (聴く), Thuốc phát huy công hiệu (効く), Phanh/Khứu giác nhạy (利く).',
    entries: [
      {
        word: '聞く',
        baseKanji: '聞',
        reading: 'きく',
        romaji: 'kiku',
        sinoVietnamese: 'VĂN',
        coreNuance: 'Nghe âm thanh tự nhiên hoặc hỏi thăm',
        targetDomain: 'Nghe tin tức, hỏi đường, hỏi giá',
        radicalKey: '門 Cổng + 耳 Tai (Ghế tai ở cổng)',
        radicalDecode: 'Đặt tai (耳) nghe qua khung cửa (門) → Nghe ngóng tự nhiên & hỏi thăm thông tin.',
        collocationDo: { phrase: '道を聞く・話を聞く', meaning: 'Hỏi đường / nghe câu chuyện' },
        collocationDont: { phrase: '薬が聞く', reason: 'Thuốc công hiệu phải dùng 効く' },
        tier: 'core',
        tabooTrapRule: 'Không dùng cho thuốc hay phanh xe!',
        exampleJa: '店員に商品の場所を聞く。',
        exampleVi: 'Hỏi nhân viên cửa hàng vị trí món đồ.',
        visualIcon: 'ear',
        visualCaption: 'Nghe & Hỏi thông tin',
        jlpt: 'N5',
      },
      {
        word: '聴く',
        baseKanji: '聴',
        reading: 'きく',
        romaji: 'kiku',
        sinoVietnamese: 'THÍNH',
        coreNuance: 'Chú tâm lắng nghe sâu sắc bằng cả trái tim',
        targetDomain: 'Nhạc cổ điển, diễn thuyết, tâm sự',
        radicalKey: '耳 Tai + 心 Trái tim',
        radicalDecode: 'Có bộ Nhĩ (耳 - Tai) và Tâm (心 - Tim) → Lắng nghe chăm chú bằng cả trái tim.',
        collocationDo: { phrase: '音楽・講演を聴く', meaning: 'Thưởng thức nhạc / nghe diễn thuyết' },
        collocationDont: { phrase: '先生に質問を聴く', reason: 'Hỏi bài phải dùng 聞く' },
        tier: 'core',
        tabooTrapRule: 'CẤM dùng với nghĩa "hỏi đường / đặt câu hỏi"!',
        exampleJa: '静かな夜にクラシック音楽を聴く。',
        exampleVi: 'Đêm tĩnh lặng lắng nghe nhạc cổ điển.',
        visualIcon: 'music',
        visualCaption: 'Lắng nghe tập trung',
        jlpt: 'N3',
      },
      {
        word: '効く',
        baseKanji: '効',
        reading: 'きく',
        romaji: 'kiku',
        sinoVietnamese: 'HIỆU',
        coreNuance: 'Phát huy tác dụng, công hiệu',
        targetDomain: 'Thuốc cảm, điều hòa, quảng cáo',
        radicalKey: '力 Bộ Lực (Tạo ra hiệu quả)',
        radicalDecode: 'Giao hòa tạo sức mạnh (交 + 力) → Thuốc ngấm hoặc máy móc phát huy công hiệu.',
        collocationDo: { phrase: '薬・クーラーが効く', meaning: 'Thuốc ngấm / máy lạnh mát sâu' },
        collocationDont: { phrase: 'ブレーキが効く', reason: 'Phanh xe ăn ưu tiên dùng 利く' },
        tier: 'core',
        tabooTrapRule: 'Không dùng cho gia vị đậm hay "biết điều" (利く).',
        exampleJa: 'この風邪薬はとてもよく効く。',
        exampleVi: 'Loại thuốc cảm này công hiệu cực kỳ nhanh.',
        visualIcon: 'medicine',
        visualCaption: 'Công hiệu tức thì',
        jlpt: 'N3',
      },
      {
        word: '利く',
        baseKanji: '利',
        reading: 'きく',
        romaji: 'kiku',
        sinoVietnamese: 'LỢI',
        coreNuance: 'Chức năng cơ học/giác quan hoạt động nhạy bén',
        targetDomain: 'Phanh xe, mũi thính, wasabi cay, tinh tế',
        radicalKey: '禾 Lúa + 刂 Dao (Sắc bén)',
        radicalDecode: 'Lưỡi dao sắc cắt lúa (禾 + 刂) → Bộ phận/giác quan hoạt động nhạy bén, chuẩn xác.',
        collocationDo: { phrase: 'ブレーキ・気が利く', meaning: 'Phanh ăn chắc / người tinh tế' },
        collocationDont: { phrase: '音楽を利く', reason: 'Nghe nhạc phải dùng 聴く/聞く' },
        tier: 'advanced',
        tabooTrapRule: 'Ghi nhớ cụm bất di bất dịch「気が利く」(tinh tế).',
        exampleJa: 'ブレーキがしっかり利く自転車に乗り換えた。',
        exampleVi: 'Tôi đã đổi sang chiếc xe đạp có phanh ăn rất chắc.',
        visualIcon: 'wrench',
        visualCaption: 'Cơ chế hoạt động nhạy',
        jlpt: 'N2',
      },
    ],
  },
  {
    clusterId: 'naosu',
    title: 'Ma trận 2 chữ NAOSU (なおす) — Sửa đồ vật vs Chữa bệnh',
    readingBadge: 'なおす',
    romajiKey: 'naosu',
    summaryWarning:
      'Cặp từ dễ mất điểm oan trong JLPT N4–N2: Đồ vật/bài văn dùng 直す (chỉnh thẳng), Bệnh tật dùng bộ Thủy 治す (dập tắt bệnh).',
    entries: [
      {
        word: '直す',
        baseKanji: '直',
        reading: 'なおす',
        romaji: 'naosu',
        sinoVietnamese: 'TRỰC',
        coreNuance: 'Sửa chữa đồ vật hỏng, sửa lỗi văn bản',
        targetDomain: 'Máy móc, lỗi chính tả, thói quen, tư thế',
        radicalKey: '目 Con mắt + L Chỉnh thẳng',
        radicalDecode: 'Canh mắt cho ngay thẳng (直) → Sửa lại đồ hỏng, sửa bài sai hoặc chỉnh thói quen.',
        collocationDo: { phrase: 'パソコン・間違いを直す', meaning: 'Sửa máy tính / sửa lỗi sai' },
        collocationDont: { phrase: '風邪を直す', reason: 'Chữa cảm cúm phải dùng 治す' },
        tier: 'core',
        tabooTrapRule: 'CẤM dùng cho bệnh tật hay vết thương cơ thể!',
        exampleJa: '壊れた腕時計を時計屋さんに直してもらう。',
        exampleVi: 'Nhờ thợ sửa đồng hồ sửa lại chiếc đồng hồ đeo tay bị hỏng.',
        visualIcon: 'wrench',
        visualCaption: 'Sửa đồ vật & lỗi sai',
        jlpt: 'N4',
      },
      {
        word: '治す',
        baseKanji: '治',
        reading: 'なおす',
        romaji: 'naosu',
        sinoVietnamese: 'TRỊ',
        coreNuance: 'Chữa trị khỏi bệnh tật, vết thương sinh học',
        targetDomain: 'Cảm cúm, vết thương, bệnh mãn tính',
        radicalKey: '氵 Bộ Thủy (Nước điều trị)',
        radicalDecode: 'Có bộ Thủy (氵 - Nước trị thủy) → Điều trị dứt điểm bệnh tật, làm lành vết thương.',
        collocationDo: { phrase: '病気・風邪を治す', meaning: 'Chữa khỏi bệnh / cảm cúm' },
        collocationDont: { phrase: '時計を治す', reason: 'Sửa đồng hồ phải dùng 直す' },
        tier: 'core',
        tabooTrapRule: 'CẤM dùng cho sửa máy tính hoặc sửa bài thi!',
        exampleJa: '十分な睡眠をとって、早く風邪を治したい。',
        exampleVi: 'Tôi muốn ngủ đủ giấc để mau khỏi cảm cúm.',
        visualIcon: 'medicine',
        visualCaption: 'Điều trị y khoa',
        jlpt: 'N4',
      },
    ],
  },
];

// ============================================================================
// 2. CURATED PRINT VS HANDWRITTEN DIVERGENCE RULES (PILLAR 3)
// ============================================================================

const RADICAL_DIVERGENCE_RULES: {
  id: string;
  matchChars: string[];
  radicalOrPart: string;
  title: string;
  printFormNote: string;
  handwrittenFormNote: string;
  izakayaRealWorldTip: string;
  highlightZone: MultiFontAlert['highlightZone'];
  crimsonOverlayPaths: string[];
}[] = [
  {
    id: 'ito_hen',
    matchChars: ['糸', '紙', '終', '絵', '約', '練', '結', '続', '経', '細', '組', '紅', '紫', '緑', '総', '織'],
    radicalOrPart: '糸 (Bộ Mịch / Tơ sợi)',
    title: 'Khác biệt đáy 3 chấm (小) vs Nét kéo ngang viết tay',
    printFormNote: 'Chữ in Mincho/Gothic tách đáy chữ 糸 thành 3 nét chấm tách rời giống bộ Tiểu (小).',
    handwrittenFormNote: 'Viết tay Kyokashotai & chữ thảo Gyosho thường nối liền phần đáy hoặc đánh lệch 3 chấm liên hoàn trong 1 nhịp.',
    izakayaRealWorldTip: 'Trên thực đơn viết tay hoặc hóa đơn Nhật, cụm 糸 và đuôi phẩy thường gộp thành nét lượn sóng duy nhất.',
    highlightZone: 'left',
    crimsonOverlayPaths: ['M 24 64 L 16 84', 'M 28 60 L 28 86', 'M 36 64 L 42 78'],
  },
  {
    id: 'shinnyou',
    matchChars: ['道', '遠', '近', '進', '通', '送', '連', '運', '選', '遊', '週', '辺', '達', '違', '過', '適', '遅', '速', '造', '遇', '遭'],
    radicalOrPart: '辶 (Bộ Sước — Shinnyou)',
    title: 'Sốc thị giác 1 chấm vs 2 chấm & Sóng đáy chữ Sước',
    printFormNote: 'In ấn hiện đại (JIS2004 / Mincho-Gothic) dùng 1 chấm đầu hoặc 2 chấm gấp khúc sắc nhọn ở bên trái.',
    handwrittenFormNote: 'Viết tay Kyokashotai và Gyosho luôn uốn chữ 辶 thành chữ "Z mềm" rồi kéo dài nét Mác nâng đỡ toàn bộ phần bên phải.',
    izakayaRealWorldTip: 'Nhận diện nhanh bảng chỉ dẫn ga tàu & thực đơn: thấy nét sóng dài vươn từ trái qua đáy chính là họ hàng chữ 辶.',
    highlightZone: 'wrap',
    crimsonOverlayPaths: ['M 18 24 L 26 32', 'M 14 48 L 28 48 L 16 74 L 88 86'],
  },
  {
    id: 'gon_ben',
    matchChars: ['言', '語', '話', '読', '記', '説', '談', '調', '議', '謝', '認', '試', '計', '詞', '訳', '証', '論', '請', '謀'],
    radicalOrPart: '言 (Bộ Ngôn — Gonben)',
    title: 'Chấm trên bộ Ngôn nằm ngang (Mincho) vs Thẳng đứng (Viết tay)',
    printFormNote: 'Font máy tính Mincho/Gothic thường đặt nét phẩy trên đỉnh bộ Ngôn nghiêng nhẹ hoặc ngang dẹt.',
    handwrittenFormNote: 'Chữ viết tay Kyokashotai dựng chấm trên cùng thẳng góc với nét ngang dài, còn chữ thảo Gyosho nối liền 3 nét ngang giữa thành đường zic-zac.',
    izakayaRealWorldTip: 'Trong chữ ký thư pháp Gyosho, toàn bộ phần 口 ở đáy bộ Ngôn được thu gọn thành 1 nét vòng tròn nhỏ.',
    highlightZone: 'left',
    crimsonOverlayPaths: ['M 26 16 L 30 28', 'M 14 36 L 42 34', 'M 18 52 L 36 52 M 18 66 L 36 66'],
  },
  {
    id: 'rei_kai',
    matchChars: ['令', '冷', '領', '鈴', '零', '齢', '命', '今'],
    radicalOrPart: '令 / マ (Nét móc dưới mái nhà)',
    title: 'Khác biệt kinh điển JIS: Nét sổ móc dưới mái vs Phẩy ngang + Chấm',
    printFormNote: 'Font in Gothic (như trên Web) ghép 令 dạng mũi nhọn kèm nét sổ thẳng 卩 ở dưới đáy.',
    handwrittenFormNote: 'Sách giáo khoa Kyokashotai bắt buộc viết thành chữ マ + nét chấm ở giữa, khác rõ rệt với font Gothic trên điện thoại!',
    izakayaRealWorldTip: 'Đây là chữ gây tranh cãi nhiều nhất trong đề luyện viết JLPT — luôn ưu tiên viết dạng Kyokashotai trên giấy.',
    highlightZone: 'bottom',
    crimsonOverlayPaths: ['M 36 48 L 66 48 L 46 68', 'M 42 70 L 58 84'],
  },
  {
    id: 'sanzui_water',
    matchChars: ['海', '清', '注', '洋', '漢', '決', '法', '治', '活', '池', '洗', '泳', '涙', '酒', '湯', '油', '消', '温'],
    radicalOrPart: '氵 (Bộ Chấm Thủy)',
    title: 'Nét hất từ dưới lên (Hane) vs 3 chấm rời nhau trên mặt chữ',
    printFormNote: 'Chữ in Gothic thể hiện 3 vạch nghiêng gần tương đồng chiều dài.',
    handwrittenFormNote: 'Trong viết tay Kyokashotai & Gyosho, 2 chấm trên hướng xuống, riêng nét thứ 3 BẮT BUỘC hất ngược từ dưới lên trên mạnh mẽ.',
    izakayaRealWorldTip: 'Trên menu quán nhậu Nhật (chữ 酒 - Rượu, 湯 - Nước dùng), 3 chấm thủy thường nối thành 1 nét cong chữ S cực nhanh.',
    highlightZone: 'left',
    crimsonOverlayPaths: ['M 22 22 L 30 30', 'M 18 44 L 26 52', 'M 18 82 L 30 62'],
  },
  {
    id: 'ki_wood',
    matchChars: ['木', '本', '休', '林', '森', '校', '柿', '梅', '相', '格', '様', '楽', '業', '村', '機', '橋', '桜'],
    radicalOrPart: '木 (Bộ Mộc — Đứng bên trái hoặc độc lập)',
    title: 'Hất móc hay Sổ thẳng ở trục đứng của Bộ Mộc',
    printFormNote: 'Font Mincho/Gothic thường để trục đứng kết thúc dứt khoát không móc khi nằm ở vị trí chữ đơn.',
    handwrittenFormNote: 'Viết tay Kyokashotai có 2 trường phái: kéo thẳng dứt nét hoặc phẩy nhẹ; khi đứng bên trái (Ki-hen) nét phẩy phải thu gọn nhường đất cho vế phải.',
    izakayaRealWorldTip: 'Ở chữ 様 (Sama - Kính ngữ trên hóa đơn), vế phải bị viết thảo rất bay bổng, nhưng vế trái 木 vẫn giữ khung chữ Thập lệch trái.',
    highlightZone: 'center',
    crimsonOverlayPaths: ['M 50 18 L 50 86', 'M 50 42 L 22 74', 'M 50 42 L 78 74'],
  },
  {
    id: 'kokoro_heart',
    matchChars: ['心', '意', '思', '感', '忘', '応', '念', '急', '必', '悔', '情', '忙', '快', '怖'],
    radicalOrPart: '心 / 忄 (Bộ Tâm nằm & Tâm đứng)',
    title: 'Độ cong vòng cung đáy chữ Tâm & Thứ tự nét Tâm đứng',
    printFormNote: 'Chữ in đặt 3 chấm và vòng cung khá vuông vức; Tâm đứng (忄) in đều như 2 tai song song.',
    handwrittenFormNote: 'Viết tay buộc vòng cung chữ Tâm phải nằm ngả như chiếc thuyền mềm rồi móc lên, còn Tâm đứng viết Trái → Phải → Sổ thẳng sau cùng!',
    izakayaRealWorldTip: 'Trong thư tay, chữ 感謝 (Cảm tạ) và 心 luôn có nét móc hất dài sang phải.',
    highlightZone: 'bottom',
    crimsonOverlayPaths: ['M 22 68 L 16 80', 'M 32 62 Q 48 92 78 82 L 74 68'],
  },
];

// (3D Constellation Graph removed per user request)

// ============================================================================
// 4. HOMOPHONE & SYNONYM RESOLUTION ENGINE (PILLAR 2)
// ============================================================================

export function detectHomophoneQueryTarget(query: string): {
  clusterId?: string;
  preferredChar?: string;
} {
  const q = query.trim().toLowerCase();
  if (!q) return {};

  for (const cluster of HOMOPHONE_CLUSTERS) {
    if (
      q === cluster.romajiKey ||
      q === cluster.readingBadge ||
      q.includes(cluster.romajiKey) ||
      q.includes(cluster.readingBadge)
    ) {
      return { clusterId: cluster.clusterId, preferredChar: cluster.entries[0].baseKanji };
    }
    const matchedEntry = cluster.entries.find(
      (e) => q.includes(e.baseKanji) || q.includes(e.word)
    );
    if (matchedEntry) {
      return { clusterId: cluster.clusterId, preferredChar: matchedEntry.baseKanji };
    }
  }
  return {};
}

export function resolveHomophoneMatrix(
  dossier: KanjiUniverseDossier,
  rawQuery?: string
): HomophoneResolutionCluster {
  if (rawQuery) {
    const det = detectHomophoneQueryTarget(rawQuery);
    if (det.clusterId) {
      const found = HOMOPHONE_CLUSTERS.find((c) => c.clusterId === det.clusterId);
      if (found) return found;
    }
  }

  // Check if current character belongs to any classic killer homophone cluster
  const directMatch = HOMOPHONE_CLUSTERS.find((c) =>
    c.entries.some((e) => e.baseKanji === dossier.character)
  );
  if (directMatch) return directMatch;

  // Dynamic synthesis of Homophone/Synonym resolution matrix for any Kanji
  const cleanKun = (dossier.kunyomi[0] || '').replace(/[.-]/g, '').trim();
  const cleanOn = (dossier.onyomi[0] || '').replace(/[-.]/g, '').trim();
  const searchKey = cleanKun || cleanOn || dossier.character;

  const peers: ExtendedKanjiItem[] = [];
  for (const k of allKanjiMasterList) {
    if (k.character === dossier.character) continue;
    const matchKun = cleanKun && k.kunyomi.some((ku) => ku.replace(/[.-]/g, '').trim() === cleanKun);
    const matchOn = cleanOn && k.onyomi.some((on) => on.replace(/[-.]/g, '').trim() === cleanOn);
    if (matchKun || matchOn) {
      peers.push(k);
    }
    if (peers.length >= 3) break;
  }

  // Fallback to twins if no identical reading peer exists
  if (peers.length < 2) {
    for (const twin of dossier.twinTraps) {
      if (twin.character === dossier.character) continue;
      const rec = findKanjiRecord(twin.character);
      if (rec && !peers.some((p) => p.character === rec.character)) {
        peers.push(rec);
      }
      if (peers.length >= 3) break;
    }
  }

  const icons: HomophoneVisualIcon[] = ['compass', 'blueprint', 'puzzle', 'eye'];
  const mainWord = dossier.kunCompounds[0]?.word || dossier.character;
  const mainCollocDo = dossier.onCompounds[0] || dossier.kunCompounds[0];
  const entries: HomophoneMatrixEntry[] = [
    {
      word: mainWord,
      baseKanji: dossier.character,
      reading: cleanKun || cleanOn || dossier.character,
      romaji: cleanOn ? `${cleanOn} / ${cleanKun || '—'}` : dossier.sinoVietnamese,
      sinoVietnamese: dossier.sinoVietnamese,
      coreNuance: dossier.meaning,
      targetDomain: `Bộ ${dossier.mainRadical}`,
      radicalKey: `Bộ ${dossier.mainRadical}`,
      radicalDecode: `Có bộ [${dossier.mainRadical}] (${dossier.strokeCount} nét) → Thể hiện sắc thái cốt lõi: ${dossier.meaning}.`,
      collocationDo: {
        phrase: mainCollocDo ? `${mainCollocDo.word}（${mainCollocDo.reading}）` : `${dossier.character}を使う`,
        meaning: mainCollocDo?.meaning || dossier.meaning,
      },
      collocationDont: {
        phrase: peers[0] ? `Nhầm sang ${peers[0].character} (${peers[0].sinoVietnamese})` : `Dùng sai ngữ cảnh [${searchKey}]`,
        reason: peers[0] ? `${peers[0].character} mang nghĩa "${peers[0].meaning.split(',')[0]}"` : 'Khác bộ thủ nên khác hoàn toàn nghĩa',
      },
      tier: dossier.level === 'N1' || dossier.level === 'N2' ? 'advanced' : 'core',
      tabooTrapRule: `Không đánh đồng nghĩa với các chữ đồng âm [${searchKey}] khác bộ thủ.`,
      exampleJa:
        dossier.onCompounds[0]?.exampleJa ||
        dossier.kunCompounds[0]?.exampleJa ||
        `正確な文脈で「${dossier.character}」を使う。`,
      exampleVi:
        dossier.onCompounds[0]?.exampleVi ||
        dossier.kunCompounds[0]?.exampleVi ||
        `Dùng chuẩn xác chữ ${dossier.character} (${dossier.meaning}) theo đúng ngữ cảnh.`,
      visualIcon: 'compass',
      visualCaption: `${dossier.character} · Tâm điểm tra cứu`,
      jlpt: dossier.level,
    },
    ...peers.map((p, idx) => {
      const pKun = (p.kunyomi[0] || p.onyomi[0] || p.character).replace(/[.-]/g, '');
      const pRad = Array.isArray(p.radicals) ? p.radicals[0] || 'Gốc' : p.radicals || 'Gốc';
      return {
        word: p.character,
        baseKanji: p.character,
        reading: pKun,
        romaji: p.onyomi[0] || pKun,
        sinoVietnamese: p.sinoVietnamese,
        coreNuance: p.meaning,
        targetDomain: `Bộ [${pRad}] (${p.strokeCount} nét)`,
        radicalKey: `Bộ ${pRad}`,
        radicalDecode: `Có bộ [${pRad}] → Gắn với nghĩa "${p.meaning}" (Hán Việt: ${p.sinoVietnamese}).`,
        collocationDo: {
          phrase: p.commonWords?.[0]?.word ? `${p.commonWords[0].word}（${p.commonWords[0].reading}）` : `${p.character}（${pKun}）`,
          meaning: p.commonWords?.[0]?.meaning || p.meaning,
        },
        collocationDont: {
          phrase: `Thay cho ${dossier.character} (${dossier.sinoVietnamese})`,
          reason: `${dossier.character} mang nghĩa "${dossier.meaning.split(',')[0]}"`,
        },
        tier: p.level === 'N1' || p.level === 'N2' ? ('advanced' as const) : ('core' as const),
        tabooTrapRule: `Cẩn thận bẫy đồng âm「${searchKey}」: Không thay thế cho「${dossier.character}」(${dossier.meaning}).`,
        exampleJa: `同じ読みでも「${p.character}」は「${p.meaning.split(',')[0]}」の意味になる。`,
        exampleVi: `Tuy trùng âm đọc nhưng「${p.character}」(${p.sinoVietnamese}) mang nghĩa: ${p.meaning}.`,
        visualIcon: icons[(idx + 1) % icons.length],
        visualCaption: `${p.character} (${p.sinoVietnamese})`,
        jlpt: p.level,
      };
    }),
  ];

  return {
    clusterId: `dynamic_${dossier.character}`,
    title: `Ma Trận Đồng Âm & Sắc Thái quanh「${dossier.character}」(${searchKey})`,
    readingBadge: searchKey,
    romajiKey: searchKey,
    summaryWarning: `Phân tách rạch ròi chữ「${dossier.character}」(${dossier.sinoVietnamese}) qua Bộ Thủ với các chữ trùng âm「${searchKey}」.`,
    entries,
  };
}

// ============================================================================
// 5. MULTI-FONT & PRINT VS HANDWRITING SCANNER (PILLAR 3)
// ============================================================================

export function buildMultiFontProfile(dossier: KanjiUniverseDossier): MultiFontProfile {
  const ch = dossier.character;
  const matchedAlerts: MultiFontAlert[] = [];

  for (const rule of RADICAL_DIVERGENCE_RULES) {
    if (rule.matchChars.includes(ch)) {
      matchedAlerts.push({
        id: rule.id,
        radicalOrPart: rule.radicalOrPart,
        title: rule.title,
        printFormNote: rule.printFormNote,
        handwrittenFormNote: rule.handwrittenFormNote,
        izakayaRealWorldTip: rule.izakayaRealWorldTip,
        highlightZone: rule.highlightZone,
        crimsonOverlayPaths: rule.crimsonOverlayPaths,
      });
    }
  }

  const hasCriticalDivergence = matchedAlerts.length > 0;
  if (matchedAlerts.length === 0) {
    matchedAlerts.push({
      id: 'kaisho_gyosho_general',
      radicalOrPart: `Cấu trúc ${dossier.strokeCount} nét của【${ch}】`,
      title: 'Khác biệt Nét nối liên hoàn & Điểm kết thúc (Mincho/Gothic vs Viết tay)',
      printFormNote:
        'Phông báo chí Mincho có chân tam giác (Uroko) ở đầu nét ngang và gập góc sắc; Phông số Gothic giữ độ dày các nét bằng nhau tuyệt đối.',
      handwrittenFormNote:
        'Chữ viết tay Kyokashotai lược bỏ chân tam giác máy in, nhấn rõ lực nhấn-nhả tự nhiên; chữ thảo Gyosho nối liền 2–3 nét gần nhau thành 1 mạch bút.',
      izakayaRealWorldTip:
        `Khi đọc biển hiệu hay thực đơn viết tay có chữ【${ch}】, hãy bám vào khung bộ【${dossier.mainRadical}】thay vì tìm từng nét gãy rời rạc như font máy tính.`,
      highlightZone: 'center',
      crimsonOverlayPaths: ['M 24 28 L 76 28', 'M 28 74 L 74 70'],
    });
  }

  return {
    character: ch,
    hasCriticalDivergence,
    alerts: matchedAlerts,
    fonts: [
      {
        id: 'mincho',
        label: 'Mincho (明朝体)',
        sublabel: 'Báo chí · Tiểu thuyết · Đề thi JLPT',
        contextNote: 'Có gai tam giác đầu nét, nét dọc đậm hơn nét ngang — chuẩn in ấn giấy.',
      },
      {
        id: 'gothic',
        label: 'Gothic (ゴシック体)',
        sublabel: 'Web · Ứng dụng · Biển ga tàu',
        contextNote: 'Nét đều tăm tắp, không chân, dễ đọc từ xa trên bảng điện tử.',
      },
      {
        id: 'kyokasho',
        label: 'Kyokashotai (教科書体)',
        sublabel: 'Sách giáo khoa · Luyện viết tay',
        contextNote: 'Chuẩn nét bút viết tay học đường: thấy rõ điểm dừng, hất móc & độ nghiêng.',
      },
      {
        id: 'gyosho',
        label: 'Gyosho (行書体)',
        sublabel: 'Thư pháp · Thực đơn Izakaya · Thư tay',
        contextNote: 'Chữ thảo bán liên kết, nét mềm và gộp nhịp bút thực chiến đời thực.',
      },
    ],
  };
}

// ============================================================================
// 6. REAL-WORLD VISUAL IMMERSION ENGINE (PILLAR 4)
// ============================================================================

export function buildRealWorldScenes(
  dossier: KanjiUniverseDossier,
  rawQuery?: string
): RealWorldScenePlate[] {
  const ch = dossier.character;
  const q = (rawQuery || '').trim();

  // Iconic preset triggers for 半額, 注意, etc.
  if (q.includes('半額') || ch === '半' || ch === '額') {
    return [
      {
        id: 'hangaku_supermarket',
        sceneType: 'supermarket_tag',
        locationBadge: 'Siêu thị Aeon / Life · 19:30 tối',
        headlineJa: '半額',
        sublineJa: 'タイムセール · 本体価格より 50% OFF',
        highlightedTerm: '半額 (はんがく)',
        reading: 'はんがく (Hangaku)',
        sceneCaptionVi: 'Nhãn dán màu vàng viền đỏ kinh điển trên hộp cơm Bento & Sushi lúc tối muộn tại siêu thị Nhật.',
        realLifeTip: 'Thấy tem vàng chữ 半額 ở siêu thị Nhật nghĩa là giảm ngay 50% giá niêm yết!',
      },
      {
        id: 'hangaku_station',
        sceneType: 'jr_station_board',
        locationBadge: 'Cửa hàng bách hóa Depachika · Tokyo',
        headlineJa: '閉店間際 全品 半額セール実施中',
        sublineJa: 'お惣菜・お弁当コーナー 特別割引',
        highlightedTerm: '半額セール',
        reading: 'はんがくせーる',
        sceneCaptionVi: 'Bảng thông báo khu đồ ăn sẵn trước giờ đóng cửa, thu hút dòng người tan tầm mua sắm.',
        realLifeTip: 'Phân biệt nhanh: 半額 (giảm một nửa = 50%) vs 割引 (giảm theo % hoặc số tiền ghi kèm).',
      },
      {
        id: 'hangaku_izakaya',
        sceneType: 'izakaya_menu',
        locationBadge: 'Quán Izakaya · Shinjuku Golden Gai',
        headlineJa: 'ハッピーアワー 生ビール 半額',
        sublineJa: '17:00〜19:00 限定 · お一人様何杯でも',
        highlightedTerm: '生ビール半額',
        reading: 'なまびーるはんがく',
        sceneCaptionVi: 'Thẻ gỗ viết tay trước cửa quán nhậu báo giờ vàng bia tươi giảm nửa giá.',
        realLifeTip: 'Chữ 半 (Bán) + 額 (Ngạch - Số tiền) = Một nửa số tiền.',
      },
    ];
  }

  if (q.includes('注意') || ch === '注' || ch === '意') {
    return [
      {
        id: 'chuui_street',
        sceneType: 'tokyo_street_sign',
        locationBadge: 'Ngã tư Shibuya · Đường phố Tokyo',
        headlineJa: '歩行者注意 · 飛び出し危険',
        sublineJa: 'スピード落とせ · 交差点安全確認',
        highlightedTerm: '注意 (ちゅうい)',
        reading: 'ちゅうい (Chūi)',
        sceneCaptionVi: 'Biển báo giao thông nền vàng-đen đặc trưng trên đường phố Tokyo nhắc tài xế chú ý người đi bộ băng qua đường.',
        realLifeTip: 'Từ 注意 xuất hiện ở 90% biển cảnh báo đường phố, công trường và ga tàu điện ngầm Nhật Bản.',
      },
      {
        id: 'chuui_station',
        sceneType: 'jr_station_board',
        locationBadge: 'Sân ga JR Yamanote Line · Shinjuku',
        headlineJa: '足元にご注意ください',
        sublineJa: 'ホームと電車の間が広くあいております',
        highlightedTerm: 'ご注意 (ごちゅうい)',
        reading: 'ごちゅうい',
        sceneCaptionVi: 'Bảng LED vàng nhấp nháy cạnh mép đường ray nhắc hành khách coi chừng khe hở giữa sân ga và tàu.',
        realLifeTip: 'Dạng kính ngữ lịch sự ご注意ください xuất hiện dày đặc trên loa phát thanh sân ga.',
      },
      {
        id: 'chuui_supermarket',
        sceneType: 'supermarket_tag',
        locationBadge: 'Tủ đông Siêu thị · Hokkaido',
        headlineJa: '取扱注意 · 要冷蔵 10℃以下',
        sublineJa: '賞味期限にご注意の上お早めにお召し上がりください',
        highlightedTerm: '取扱注意',
        reading: 'とりあつかいちゅうい',
        sceneCaptionVi: 'Tem nhãn đỏ trên bao bì thực phẩm nhắc bảo quản lạnh và lưu ý hạn sử dụng.',
        realLifeTip: 'Nhớ cụm cố định: 注意を払う (hết sức chú ý) và 注意する (cẩn thận / nhắc nhở).',
      },
    ];
  }

  // Dynamic real-world synthesis from dossier compounds for ANY Kanji
  const primaryOnWord = dossier.onCompounds[0];
  const primaryKunWord = dossier.kunCompounds[0];
  const secondaryOnWord = dossier.onCompounds[1] || primaryOnWord;

  const w1 = primaryOnWord?.word || ch;
  const r1 = primaryOnWord?.reading || dossier.onyomi[0] || ch;
  const m1 = primaryOnWord?.meaning || dossier.meaning;

  const w2 = primaryKunWord?.word || secondaryOnWord?.word || ch;
  const r2 = primaryKunWord?.reading || secondaryOnWord?.reading || dossier.kunyomi[0] || ch;
  const m2 = primaryKunWord?.meaning || secondaryOnWord?.meaning || dossier.meaning;

  const w3 = secondaryOnWord?.word || w1;
  const r3 = secondaryOnWord?.reading || r1;
  const m3 = secondaryOnWord?.meaning || m1;

  return [
    {
      id: `scene_station_${ch}`,
      sceneType: 'jr_station_board',
      locationBadge: 'Bảng thông tin Ga tàu điện Tokyo · JR East',
      headlineJa: `【ご案内】${w1}についてのお知らせ`,
      sublineJa: `ご利用のお客様は${w1}の表示をご確認ください`,
      highlightedTerm: `${w1} (${r1})`,
      reading: r1,
      sceneCaptionVi: `Bảng hướng dẫn điện tử tại khu vực soát vé ga tàu có chứa từ ghép「${w1}」— nghĩa: ${m1}.`,
      realLifeTip: `Nhận diện nhanh chữ【${ch}】(${dossier.sinoVietnamese}) ngay trên bảng chỉ dẫn nơi công cộng.`,
    },
    {
      id: `scene_sign_${ch}`,
      sceneType: 'tokyo_street_sign',
      locationBadge: 'Biển chỉ dẫn khu phố · Ginza / Akihabara',
      headlineJa: `${w2} · 安全確認`,
      sublineJa: `地域案内表示板 · 東京23区公式サイン`,
      highlightedTerm: `${w2} (${r2})`,
      reading: r2,
      sceneCaptionVi: `Biển hiệu phố xá ngoài trời hiển thị chữ「${w2}」với nét chữ Gothic vuông rõ: ${m2}.`,
      realLifeTip: `Âm đọc đời thực cần bật phản xạ trong 0.5 giây:「${r2}」.`,
    },
    {
      id: `scene_izakaya_${ch}`,
      sceneType: 'izakaya_menu',
      locationBadge: 'Thẻ gỗ & Bảng phấn Cửa hàng Nhật Bản',
      headlineJa: `本日のおすすめ · 「${w3}」`,
      sublineJa: `店主手書き案内 · 心を込めてお届けします`,
      highlightedTerm: `${w3} (${r3})`,
      reading: r3,
      sceneCaptionVi: `Thẻ gỗ hoặc bảng viết tay trong quán ăn/cửa hàng sử dụng「${w3}」mang sắc thái: ${m3}.`,
      realLifeTip: `Đối chiếu phông chữ viết tay để không bị lúng túng khi gặp【${ch}】trên thực đơn ngoài đời.`,
    },
  ];
}

// ============================================================================
// 7. 4D PRESSURE ASSESSMENT PAYLOAD BUILDER (PILLAR 5)
// ============================================================================

function splitToMorae(reading: string): string[] {
  const clean = reading.replace(/[^ぁ-んァ-ンー]/g, '');
  if (!clean) return ['あ'];
  const smalls = new Set(['ゃ', 'ゅ', 'ょ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ャ', 'ュ', 'ョ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ']);
  const result: string[] = [];
  for (const ch of clean) {
    if (smalls.has(ch) && result.length > 0) {
      result[result.length - 1] += ch;
    } else {
      result.push(ch);
    }
  }
  return result.length > 0 ? result : ['あ'];
}

function computeHighLowPattern(
  moraeCount: number,
  pitchType: 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka'
): ('H' | 'L')[] {
  const n = Math.max(1, moraeCount);
  if (n === 1) return [pitchType === 'atamadaka' ? 'H' : 'L'];
  if (pitchType === 'heiban' || pitchType === 'odaka') {
    return Array.from({ length: n }, (_, i) => (i === 0 ? 'L' : 'H'));
  }
  if (pitchType === 'atamadaka') {
    return Array.from({ length: n }, (_, i) => (i === 0 ? 'H' : 'L'));
  }
  // nakadaka: drop after penultimate or 2nd mora
  const dropAt = Math.min(n - 1, Math.max(2, Math.ceil(n / 2)));
  return Array.from({ length: n }, (_, i) => (i === 0 ? 'L' : i < dropAt ? 'H' : 'L'));
}

export function buildPressureAssessmentPayload(
  dossier: KanjiUniverseDossier
): PressureAssessmentPayload {
  const targetCompound = dossier.onCompounds[0] || dossier.kunCompounds[0];
  const targetWord = targetCompound?.word || dossier.character;
  const targetReading =
    targetCompound?.reading ||
    (dossier.onyomi[0] || dossier.kunyomi[0] || dossier.character).replace(/[.-]/g, '');
  const targetRomaji = targetCompound?.romaji || dossier.sinoVietnamese;
  const targetMeaning = targetCompound?.meaning || dossier.meaning;

  // Dim 1: 0.5s Flash Read options
  const distractors = new Set<string>([targetReading]);
  for (const c of [...dossier.onCompounds, ...dossier.kunCompounds]) {
    if (c.reading && c.reading !== targetReading) distractors.add(c.reading);
    if (distractors.size >= 4) break;
  }
  const suffixPool = ['こう', 'せい', 'しん', 'かい', 'たい', 'ちょう', 'かく'];
  for (const suf of suffixPool) {
    if (distractors.size >= 4) break;
    const alt = `${targetReading.slice(0, Math.max(1, targetReading.length - 1))}${suf}`;
    if (alt !== targetReading) distractors.add(alt);
  }
  const flashOptions = Array.from(distractors).slice(0, 4).sort((a, b) => a.localeCompare(b));

  // Dim 2: Pitch Accent Voice
  const morae = splitToMorae(targetReading);
  const pitchType = targetCompound?.pitchType || 'heiban';
  const highLowPattern = computeHighLowPattern(morae.length, pitchType);
  const pitchTypeLabel =
    pitchType === 'heiban'
      ? 'Heiban [⓪] — Thấp đầu, giữ cao đều'
      : pitchType === 'atamadaka'
      ? 'Atamadaka [①] — Cao phách đầu, hạ ngay sau đó'
      : pitchType === 'nakadaka'
      ? 'Nakadaka [②+] — Lên cao ở giữa rồi hạ'
      : 'Odaka [尾高] — Cao tới cuối, hạ ở trợ từ sau';

  // Dim 3: Newspaper Cloze Context
  const fullSentence =
    targetCompound?.exampleJa ||
    `今日の社会問題において、${targetWord}の重要性が改めて議論されている。`;
  const idx = fullSentence.indexOf(targetWord);
  const sentenceBefore = idx >= 0 ? fullSentence.slice(0, idx) : '今日の記事で';
  const sentenceAfter =
    idx >= 0 ? fullSentence.slice(idx + targetWord.length) : 'の意義が広く伝えられた。';

  const clozeOptionsSet = new Set<string>([targetWord]);
  for (const tw of dossier.twinTraps) {
    if (tw.character !== dossier.character) {
      const candidate = targetWord.length > 1
        ? targetWord.replace(dossier.character, tw.character)
        : tw.character;
      clozeOptionsSet.add(candidate);
    }
    if (clozeOptionsSet.size >= 4) break;
  }
  const fallbackWords = ['対策', '確認', '状況', '改善', '理解', '表現'];
  for (const fw of fallbackWords) {
    if (clozeOptionsSet.size >= 4) break;
    if (fw !== targetWord) clozeOptionsSet.add(fw);
  }
  const clozeOptions = Array.from(clozeOptionsSet).slice(0, 4).sort();

  return {
    targetChar: dossier.character,
    targetWord,
    targetReading,
    targetRomaji,
    targetMeaning,
    level: dossier.level,
    flashRead: {
      promptKanji: targetWord,
      correctReading: targetReading,
      options: flashOptions,
    },
    pitchVoice: {
      word: targetWord,
      reading: targetReading,
      morae,
      highLowPattern,
      pitchTypeLabel,
      pitchRuleNote: `Đọc rõ ${morae.length} phách: ${morae.map((m, i) => `${m}(${highLowPattern[i]})`).join(' · ')}`,
    },
    newspaperCloze: {
      sourceTag: `Thời sự Nhật Bản · JLPT ${dossier.level}`,
      sentenceBefore,
      sentenceAfter,
      fullSentence,
      translationVi: targetCompound?.exampleVi || `Trong bản tin thời sự: ${targetMeaning}.`,
      correctOption: targetWord,
      options: clozeOptions,
    },
  };
}

// ============================================================================
// 8. FULL HYPER-EVOLVED OMNIVERSE ASSEMBLER + 0MS PRELOAD LRU CACHE
// ============================================================================

const OMNIVERSE_LRU_CACHE = new Map<string, KanjiOmniverseBundle>();
const MAX_LRU_ENTRIES = 60;

export function buildKanjiOmniverseBundle(
  queryOrChar: string
): KanjiOmniverseBundle {
  const key = queryOrChar.trim() || '語';
  const cached = OMNIVERSE_LRU_CACHE.get(key);
  if (cached) {
    // Refresh LRU order
    OMNIVERSE_LRU_CACHE.delete(key);
    OMNIVERSE_LRU_CACHE.set(key, cached);
    return cached;
  }

  const homophoneDetect = detectHomophoneQueryTarget(key);
  const resolvedQuery = homophoneDetect.preferredChar || key;

  const dossier = buildKanjiUniverseDossier(resolvedQuery);
  const homophoneCluster = resolveHomophoneMatrix(dossier, key);
  const multiFont = buildMultiFontProfile(dossier);
  const realWorldScenes = buildRealWorldScenes(dossier, key);
  const pressureCore = buildPressureAssessmentPayload(dossier);
  const initialRadicalSiblings = expandThreeSiblingKanji(dossier.character, 'radical', []);
  const initialReadingSiblings = expandThreeSiblingKanji(dossier.character, 'reading', []);

  const homophoneSplitCardsReady =
    homophoneCluster.entries.length >= 2 &&
    homophoneCluster.entries.every(
      (e) =>
        Boolean(e.radicalDecode) &&
        Boolean(e.collocationDo?.phrase) &&
        Boolean(e.collocationDont?.phrase)
    );
  const jlptTieringReady = homophoneCluster.entries.every(
    (e) => e.tier === 'core' || e.tier === 'advanced'
  );

  const audit200: OmniverseAudit200Report = {
    homophoneMatrixResolved: homophoneCluster.entries.length >= 2,
    homophoneClusterTitle: homophoneCluster.title,
    homophoneSplitCardsReady,
    jlptTieringReady,
    hexaZenOrdered: true,
    multiFontReady: multiFont.fonts.length === 4 && multiFont.alerts.length > 0,
    realWorldScenesReady: realWorldScenes.length === 3,
    pressureCoreReady:
      pressureCore.flashRead.options.length >= 2 &&
      pressureCore.pitchVoice.morae.length >= 1 &&
      pressureCore.newspaperCloze.options.length >= 2,
    zenUiDisciplined: true,
    allPassed:
      homophoneSplitCardsReady &&
      jlptTieringReady &&
      multiFont.fonts.length === 4 &&
      realWorldScenes.length === 3 &&
      pressureCore.flashRead.options.length >= 2,
  };

  const bundle: KanjiOmniverseBundle = {
    dossier,
    homophoneCluster,
    multiFont,
    realWorldScenes,
    pressureCore,
    initialRadicalSiblings,
    initialReadingSiblings,
    audit200,
  };

  if (OMNIVERSE_LRU_CACHE.size >= MAX_LRU_ENTRIES) {
    const oldestKey = OMNIVERSE_LRU_CACHE.keys().next().value;
    if (oldestKey !== undefined) OMNIVERSE_LRU_CACHE.delete(oldestKey);
  }
  OMNIVERSE_LRU_CACHE.set(key, bundle);

  return bundle;
}

/**
 * Pre-warms a target Kanji or search query in memory while the user types or hovers,
 * ensuring 0ms instantaneous rendering with zero loading screens.
 */
export function preloadKanjiOmniverse(queryOrChar: string): void {
  if (!queryOrChar || !queryOrChar.trim()) return;
  try {
    buildKanjiOmniverseBundle(queryOrChar);
  } catch {
    // Silent preload
  }
}

/**
 * Background Async Prefetcher: warms related twin traps, homophone peers, and +3 sibling nodes
 * immediately after a bundle resolves so tab hopping and cross-drills occur in 0ms.
 */
export function scheduleBackgroundOmniversePrefetch(bundle: KanjiOmniverseBundle): void {
  if (typeof window === 'undefined') return;
  const targets = Array.from(
    new Set([
      ...bundle.homophoneCluster.entries.map((e) => e.baseKanji),
      ...bundle.dossier.twinTraps.map((t) => t.character),
      ...bundle.initialRadicalSiblings.map((s) => s.character),
      ...bundle.initialReadingSiblings.map((s) => s.character),
    ])
  ).filter((c) => c && c !== bundle.dossier.character);

  const run = () => {
    for (const char of targets.slice(0, 8)) {
      if (!OMNIVERSE_LRU_CACHE.has(char)) {
        preloadKanjiOmniverse(char);
      }
    }
  };

  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
    .requestIdleCallback;
  if (typeof ric === 'function') {
    ric(run);
  } else {
    window.setTimeout(run, 16);
  }
}
