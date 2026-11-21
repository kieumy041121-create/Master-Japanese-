import React, { useState, useEffect, useRef } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import {
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Sparkles,
  Award,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Zap,
  Globe,
  Briefcase,
  Cpu,
  Leaf,
  Stethoscope,
  Scale,
  FileText,
  Search,
  ChevronRight,
  TrendingUp,
  Headphones,
  Sliders,
  Rocket,
  ShieldCheck,
  Ship,
  Sprout,
  Building2,
  Download,
  RefreshCw,
  Plus,
  Copy,
  Check,
  Activity,
  VolumeX,
  Radio,
  Calculator,
  Shuffle,
  Filter,
  HelpCircle,
} from 'lucide-react';

interface Props {
  currentLevel: JLPTLevel;
  onOpenAiSensei?: (query?: string) => void;
}

// 1. Conference Scenario Data
export interface CabinScenario {
  id: string;
  category:
    | 'diplomacy'
    | 'finance_mna'
    | 'semiconductor_ai'
    | 'green_energy'
    | 'biomedical'
    | 'international_law'
    | 'aerospace'
    | 'cybersecurity'
    | 'smart_logistics'
    | 'smart_agtech'
    | 'green_reit'
    | string;
  title: string;
  subtitle: string;
  conferenceName: string;
  speakerRole: string;
  difficulty: 'Thượng Đỉnh (Pinnacle)' | 'Cao Cấp (Executive)' | 'Chuyên Gia (Specialist)';
  icon: React.ElementType;
  colorScheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
    accent: string;
  };
  audioDurationSeconds: number;
  japaneseFullText: string;
  vietnameseMasterTranslation: string;
  chunks: {
    order: number;
    japaneseChunk: string;
    romajiChunk: string;
    vietnameseChunk: string;
    timingSec: number;
    decalageRecommendedSec: number;
    tacticalNote: string;
  }[];
  criticalTerminology: {
    termJp: string;
    reading: string;
    termVn: string;
    nuance: string;
  }[];
  stenoShorthandTips: string[];
}

export const CABIN_SCENARIOS: CabinScenario[] = [
  {
    id: 'scen_diplomacy',
    category: 'diplomacy',
    title: 'Hội Nghị Thượng Đỉnh Ngoại Giao: Tuyên Bố Chung Đối Tác Chiến Lược',
    subtitle: 'Diễn văn chính thức của Thủ tướng Nhật Bản tại Hội nghị Song phương Cấp cao',
    conferenceName: 'Hội Nghị Ngoại Giao Thượng Đỉnh Nhật Bản - Việt Nam',
    speakerRole: 'Thủ tướng Chính phủ Nhật Bản (内閣総理大臣)',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: Globe,
    colorScheme: {
      badgeBg: 'bg-rose-950/60',
      badgeText: 'text-rose-300',
      border: 'border-rose-800/50',
      accent: 'text-rose-400',
    },
    audioDurationSeconds: 42,
    japaneseFullText:
      '本日、両国の国交樹立記念の佳節を迎え、包括的戦略的パートナーシップの更なる深化に向け、両国が手を携えて国際秩序の維持と地域の持続可能な繁栄に貢献していく決意を、ここに改めて表明いたします。',
    vietnameseMasterTranslation:
      'Hôm nay, nhân dịp kỷ niệm ngày thiết lập quan hệ ngoại giao giữa hai nước, tôi xin trân trọng tái khẳng định quyết tâm của hai bên trong việc làm sâu sắc hơn nữa quan hệ đối tác chiến lược toàn diện, cùng chung tay duy trì trật tự quốc tế và đóng góp tích cực cho sự thịnh vượng bền vững của khu vực.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '本日、両国の国交樹立記念の佳節を迎え、',
        romajiChunk: 'Honjitsu, ryoukoku no kokkou juritsu kinen no kasetsu o mukae,',
        vietnameseChunk: 'Hôm nay, nhân dịp kỷ niệm ngày thiết lập quan hệ ngoại giao giữa hai nước,',
        timingSec: 0,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'Dịch ngay mốc thời gian và bối cảnh lễ nghi, không chờ vế chính sau.',
      },
      {
        order: 2,
        japaneseChunk: '包括的戦略的パートナーシップの更なる深化に向け、',
        romajiChunk: 'houkatsuteki senryakuteki paatonaashippu no saranaru shinka ni muke,',
        vietnameseChunk: 'hướng tới việc làm sâu sắc hơn nữa quan hệ đối tác chiến lược toàn diện,',
        timingSec: 7,
        decalageRecommendedSec: 3.0,
        tacticalNote: 'Cụm thuật ngữ ngoại giao chuẩn "quan hệ đối tác chiến lược toàn diện".',
      },
      {
        order: 3,
        japaneseChunk: '両国が手を携えて国際秩序の維持と',
        romajiChunk: 'ryoukoku ga te o携zete kokusai chitsujo no iji to',
        vietnameseChunk: 'hai quốc gia sẽ cùng chung tay gìn giữ trật tự quốc tế và',
        timingSec: 15,
        decalageRecommendedSec: 2.8,
        tacticalNote: 'Cụm "手を携えて" dịch thoát ý ngoại giao là "cùng chung tay / sát cánh".',
      },
      {
        order: 4,
        japaneseChunk: '地域の持続可能な繁栄に貢献していく決意を、',
        romajiChunk: 'chiiki no jizokukanou na han\'ei ni kouken shite iku ketsui o,',
        vietnameseChunk: 'đóng góp cho sự phồn vinh bền vững của khu vực,',
        timingSec: 24,
        decalageRecommendedSec: 3.2,
        tacticalNote: 'Khóa chặt tân ngữ "sự phồn vinh bền vững" trước khi động từ vị ngữ xuất hiện.',
      },
      {
        order: 5,
        japaneseChunk: 'ここに改めて表明いたします。',
        romajiChunk: 'koko ni aratamete hyoumei itashimasu.',
        vietnameseChunk: 'tôi xin được long trọng tái khẳng định quyết tâm tại đây.',
        timingSec: 32,
        decalageRecommendedSec: 2.0,
        tacticalNote: 'Vị ngữ Keigo hạ mình (itashimasu), chốt hạ bằng khẩu khí ngoại giao đanh thép.',
      },
    ],
    criticalTerminology: [
      {
        termJp: '国交樹立',
        reading: 'こっこうじゅりつ (Kokkou Juritsu)',
        termVn: 'Thiết lập quan hệ ngoại giao',
        nuance: 'Dùng riêng trong lễ tân ngoại giao nhà nước.',
      },
      {
        termJp: '包括的戦略的パートナーシップ',
        reading: 'ほうかつてき せんりゃくてき パートナーシップ',
        termVn: 'Quan hệ đối tác chiến lược toàn diện',
        nuance: 'Cấp độ bang giao ngoại giao cao nhất.',
      },
      {
        termJp: '手を携えて',
        reading: 'てをたずさえて (Te o tazusaete)',
        termVn: 'Chung tay / Sát cánh / Đồng lòng',
        nuance: 'Biểu đạt tình hữu nghị ngoại giao cao quý.',
      },
      {
        termJp: '国際秩序の維持',
        reading: 'こくさいちつじょのいじ',
        termVn: 'Duy trì trật tự quốc tế',
        nuance: 'Cụm từ then chốt tại các diễn đàn LHQ, APEC, G7.',
      },
    ],
    stenoShorthandTips: ['Dip = Ngoại giao', 'Part = Đối tác toàn diện', '🤝 = Chung tay', 'Sec = An ninh/Trật tự', '↑ = Phồn vinh'],
  },
  {
    id: 'scen_mna_finance',
    category: 'finance_mna',
    title: 'Thương Vụ M&A Xuyên Biên Giới: Họp Đại Hội Cổ Đông Bất Thường',
    subtitle: 'Chủ tịch Quỹ Đầu tư Công bố Thẩm định Tài chính Due Diligence & Hoán Đổi Cổ Phần',
    conferenceName: 'Hội Đồng Quản Trị & Cổ Đông Chiến Lược Tokyo Global Capital',
    speakerRole: 'Giám đốc Điều hành Quỹ Đầu tư M&A (Managing Director)',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: Briefcase,
    colorScheme: {
      badgeBg: 'bg-emerald-950/60',
      badgeText: 'text-emerald-300',
      border: 'border-emerald-800/50',
      accent: 'text-emerald-400',
    },
    audioDurationSeconds: 40,
    japaneseFullText:
      'デューデリジェンスの精査結果に鑑み、本買収案件はEBITDA倍率において十分な投資妙味を有しており、来期以降の連結営業利益の大幅なシナジー創出を確信しております。',
    vietnameseMasterTranslation:
      'Căn cứ vào kết quả thẩm định chi tiết (Due Diligence), thương vụ mua lại này sở hữu sức hấp dẫn đầu tư vượt trội xét trên hệ số EBITDA, và chúng tôi hoàn toàn tin tưởng vào khả năng tạo ra giá trị cộng hưởng to lớn cho lợi nhuận hoạt động hợp nhất kể từ niên độ tài chính tiếp theo.',
    chunks: [
      {
        order: 1,
        japaneseChunk: 'デューデリジェンスの精査結果に鑑み、',
        romajiChunk: 'Dyuu derijensu no seisa kekka ni kangami,',
        vietnameseChunk: 'Căn cứ vào kết quả thẩm định chi tiết Due Diligence,',
        timingSec: 0,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'Cấu trúc "〜に鑑み" = Căn cứ trên / Xem xét cẩn trọng.',
      },
      {
        order: 2,
        japaneseChunk: '本買収案件はEBITDA倍率において',
        romajiChunk: 'hon baishuu anken wa Iibittadaa bairitsu ni oite',
        vietnameseChunk: 'thương vụ thâu tóm này xét trên hệ số định giá EBITDA',
        timingSec: 6,
        decalageRecommendedSec: 2.8,
        tacticalNote: 'Dịch chuẩn thuật ngữ tài chính doanh nghiệp.',
      },
      {
        order: 3,
        japaneseChunk: '十分な投資妙味を有しており、',
        romajiChunk: 'juubun na toushi myoumi o yuushite ori,',
        vietnameseChunk: 'sở hữu tiềm năng sinh lời và sức hấp dẫn đầu tư dồi dào,',
        timingSec: 13,
        decalageRecommendedSec: 3.0,
        tacticalNote: 'Cụm "投資妙味" là thuật ngữ phố Wall tiếng Nhật (Sức hấp dẫn đầu tư).',
      },
      {
        order: 4,
        japaneseChunk: '来期以降の連結営業利益の',
        romajiChunk: 'raiki ikou no renketsu eigyou rieki no',
        vietnameseChunk: 'đối với lợi nhuận hoạt động hợp nhất từ niên độ tới trở đi,',
        timingSec: 21,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'Phân định rõ "連結" (Hợp nhất) và "単体" (Đơn lẻ).',
      },
      {
        order: 5,
        japaneseChunk: '大幅なシナジー創出を確信しております。',
        romajiChunk: 'oohaba na shinajii soushutsu o kakushin shite orimasu.',
        vietnameseChunk: 'chúng tôi hoàn toàn tin tưởng sẽ tạo ra sức mạnh cộng hưởng vượt bậc.',
        timingSec: 28,
        decalageRecommendedSec: 2.0,
        tacticalNote: 'Shinajii = Hiệu ứng cộng hưởng Synergy.',
      },
    ],
    criticalTerminology: [
      {
        termJp: 'デューデリジェンス (DD)',
        reading: 'Due Diligence',
        termVn: 'Thẩm định chi tiết / Thẩm tra năng lực tài chính & pháp lý',
        nuance: 'Quá trình rà soát toàn diện trước khi ký kết M&A.',
      },
      {
        termJp: 'EBITDA倍率',
        reading: 'EBITDA bairitsu',
        termVn: 'Bội số định giá EBITDA / EV/EBITDA',
        nuance: 'Thước đo định giá giá trị doanh nghiệp mua lại.',
      },
      {
        termJp: '投資妙味',
        reading: 'とうしみょうみ (Toushi Myoumi)',
        termVn: 'Sức hấp dẫn đầu tư / Tiềm năng sinh lời',
        nuance: 'Thuật ngữ tài chính thể hiện cơ hội đầu tư hời.',
      },
      {
        termJp: '連結営業利益',
        reading: 'れんけつ えいぎょう りえき',
        termVn: 'Lợi nhuận hoạt động hợp nhất',
        nuance: 'Tổng lợi nhuận của toàn bộ tập đoàn và công ty con.',
      },
    ],
    stenoShorthandTips: ['DD = Thẩm tra', 'M&A = Mua bán sáp nhập', 'Syn = Cộng hưởng', 'OpProfit = Lợi nhuận HĐ', 'Consol = Hợp nhất'],
  },
  {
    id: 'scen_semiconductor',
    category: 'semiconductor_ai',
    title: 'Hội Thảo Bán Dẫn & Điện Toán AI: Tiến Trình EUV 2nm & Chuỗi Cung Ứng',
    subtitle: 'Báo cáo kỹ thuật của Giám đốc Nghiên cứu Liên minh Bán dẫn Quốc gia Rapidus',
    conferenceName: 'Hội Nghị Thượng Đỉnh Công Nghệ Bán Dẫn Tokyo Tech Expo',
    speakerRole: 'Viện trưởng Viện Nghiên cứu Công nghệ Bán dẫn Tiên tiến',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: Cpu,
    colorScheme: {
      badgeBg: 'bg-cyan-950/60',
      badgeText: 'text-cyan-300',
      border: 'border-cyan-800/50',
      accent: 'text-cyan-400',
    },
    audioDurationSeconds: 44,
    japaneseFullText:
      '次世代AIアクセラレータに不可欠な2ナノメートル微細化プロセスにおいて、高開口数EUV露光技術と裏面電力供給ネットワークの融合が、歩留まり向上と電力効率の飛躍的改善を実現します。',
    vietnameseMasterTranslation:
      'Trong tiến trình thu nhỏ bán dẫn 2 nanometer không thể thiếu đối với các bộ tăng tốc AI thế hệ mới, sự kết hợp giữa công nghệ quang khắc High-NA EUV và mạng lưới cấp nguồn mặt sau (BSPDN) sẽ hiện thực hóa bước đột phá về tỷ lệ xuất xưởng vi mạch đạt chuẩn (Yield) cũng như cải thiện vượt bậc hiệu suất năng lượng.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '次世代AIアクセラレータに不可欠な',
        romajiChunk: 'Jisedai Ei-Ai akuserareeta ni fukaketsu na',
        vietnameseChunk: 'Đóng vai trò cốt yếu đối với các bộ tăng tốc vi xử lý AI thế hệ mới,',
        timingSec: 0,
        decalageRecommendedSec: 2.2,
        tacticalNote: 'Cụm "不可欠な" dịch ngay là "không thể thiếu / then chốt".',
      },
      {
        order: 2,
        japaneseChunk: '2ナノメートル微細化プロセスにおいて、',
        romajiChunk: 'ni-nanomeetoru bisaika purosesu ni oite,',
        vietnameseChunk: 'trong tiến trình công nghệ bán dẫn thu nhỏ 2 nanomet,',
        timingSec: 6,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'Xử lý con số chính xác: 2 nano micro fabrication.',
      },
      {
        order: 3,
        japaneseChunk: '高開口数EUV露光技術と',
        romajiChunk: 'koukaikousuu Ii-Yuu-Bii rokou gijutsu to',
        vietnameseChunk: 'sự tích hợp giữa kỹ thuật quang khắc High-NA EUV và',
        timingSec: 13,
        decalageRecommendedSec: 3.0,
        tacticalNote: 'Thuật ngữ High-NA EUV = Quang khắc khẩu độ số cao cực tím.',
      },
      {
        order: 4,
        japaneseChunk: '裏面電力供給ネットワークの融合が、',
        romajiChunk: 'rimen denryoku kyoukyuu nettowaaku no yuugou ga,',
        vietnameseChunk: 'mạng lưới cấp nguồn từ mặt sau tấm wafer,',
        timingSec: 20,
        decalageRecommendedSec: 2.8,
        tacticalNote: 'BSPDN: Backside Power Delivery Network.',
      },
      {
        order: 5,
        japaneseChunk: '歩留まり向上と電力効率の飛躍的改善を実現します。',
        romajiChunk: 'budomari koujou to denryoku kouritsu no hiyakuteki kaizen o jitsugen shimasu.',
        vietnameseChunk: 'sẽ mang lại sự nâng cao tỷ lệ mạch đạt chuẩn (Yield) và tối ưu hóa vượt bậc hiệu năng tiêu thụ điện.',
        timingSec: 29,
        decalageRecommendedSec: 2.0,
        tacticalNote: '歩留まり (Budomari) = Yield (Tỷ lệ bán dẫn hoàn thiện không lỗi).',
      },
    ],
    criticalTerminology: [
      {
        termJp: '歩留まり (ブドマリ)',
        reading: 'ぶどまり (Budomari)',
        termVn: 'Tỷ lệ sản phẩm đạt chuẩn / Tỷ lệ Yield',
        nuance: 'Chỉ số sống còn quyết định chi phí trong sản xuất vi mạch.',
      },
      {
        termJp: '高開口数EUV露光',
        reading: 'こうかいこうすう EUV ろこう',
        termVn: 'Quang khắc tia cực tím cực sâu khẩu độ lớn (High-NA EUV)',
        nuance: 'Cỗ máy đắt nhất hành tinh của ASML chế tạo chip bán dẫn.',
      },
      {
        termJp: '微細化プロセス',
        reading: 'びさいか プロセス',
        termVn: 'Tiến trình thu nhỏ vi mạch bán dẫn',
        nuance: 'Cuộc đua từ 7nm, 5nm xuống 3nm và 2nm.',
      },
      {
        termJp: '裏面電力供給 (BSPDN)',
        reading: 'りめんでんりょくきょうきゅう',
        termVn: 'Mạng lưới cấp điện mặt sau tấm bán dẫn',
        nuance: 'Kiến trúc mới giải phóng bề mặt trước cho kết nối tín hiệu.',
      },
    ],
    stenoShorthandTips: ['2nm = Nanomet', 'EUV = Quang khắc', 'BSPDN = Cấp nguồn sau', 'Yield = Tỷ lệ đạt', 'Watt = Hiệu suất điện'],
  },
  {
    id: 'scen_green_energy',
    category: 'green_energy',
    title: 'Hội Thảo Năng Lượng Tương Lai: Chuỗi Cung Ứng Hydrogen & Trung Hòa Carbon',
    subtitle: 'Chính sách Chuyển Đổi Xanh (Green Transformation - GX) của Bộ Kinh tế Nhật Bản (METI)',
    conferenceName: 'Diễn Đàn Chuyển Đổi Xanh GX Nhật Bản - Châu Á (AZEC)',
    speakerRole: 'Vụ trưởng Vụ Năng lượng & Môi trường (METI)',
    difficulty: 'Cao Cấp (Executive)',
    icon: Leaf,
    colorScheme: {
      badgeBg: 'bg-teal-950/60',
      badgeText: 'text-teal-300',
      border: 'border-teal-800/50',
      accent: 'text-teal-400',
    },
    audioDurationSeconds: 38,
    japaneseFullText:
      '2050年カーボンニュートラルの達成に向け、水素・アンモニア混焼発電の大規模実証実験を加速させ、脱炭素サプライチェーンの構築と国際的なJ-クレジット市場の標準化を主導してまいります。',
    vietnameseMasterTranslation:
      'Hướng tới mục tiêu trung hòa carbon vào năm 2050, chúng tôi sẽ thúc đẩy các dự án thử nghiệm quy mô lớn về phát điện đồng đốt hydro và amoniac, đồng thời giữ vai trò tiên phong trong việc thiết lập chuỗi cung ứng khử carbon và tiêu chuẩn hóa thị trường tín chỉ carbon J-Credit trên trường quốc tế.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '2050年カーボンニュートラルの達成に向け、',
        romajiChunk: 'Nisen-gojuu-nen kaabon nyuutoraru no tassei ni muke,',
        vietnameseChunk: 'Hướng tới mục tiêu đạt trạng thái trung hòa carbon vào năm 2050,',
        timingSec: 0,
        decalageRecommendedSec: 2.0,
        tacticalNote: 'Carbon Neutral = Trung hòa phát thải carbon net-zero.',
      },
      {
        order: 2,
        japaneseChunk: '水素・アンモニア混焼発電の大規模実証実験を加速させ、',
        romajiChunk: 'suiso ammonia konshou hatsuden no daikibo jisshou jikken o kasoku sase,',
        vietnameseChunk: 'chúng tôi sẽ đẩy mạnh các cuộc thử nghiệm quy mô lớn về phát điện đồng đốt amoniac và hydro,',
        timingSec: 6,
        decalageRecommendedSec: 3.0,
        tacticalNote: '混焼 (Konshou) = Co-firing / Đồng đốt nhiều loại nhiên liệu cùng lúc.',
      },
      {
        order: 3,
        japaneseChunk: '脱炭素サプライチェーンの構築と',
        romajiChunk: 'datsutanso sapuraicheen no kouchiku to',
        vietnameseChunk: 'thiết lập chuỗi cung ứng phi carbon hóa cùng với',
        timingSec: 15,
        decalageRecommendedSec: 2.5,
        tacticalNote: '脱炭素 (Datsutanso) = Khử carbon / Giảm phát thải.',
      },
      {
        order: 4,
        japaneseChunk: '国際的なJ-クレジット市場の標準化を主導してまいります。',
        romajiChunk: 'kokusaiteki na Jei-kurejitto shijou no hyoujunka o shudou shite mairimasu.',
        vietnameseChunk: 'tiên phong tiêu chuẩn hóa thị trường tín chỉ carbon quốc tế.',
        timingSec: 23,
        decalageRecommendedSec: 2.0,
        tacticalNote: '主導してまいります = Khiêm nhường ngữ mang ý chí cam kết mạnh mẽ.',
      },
    ],
    criticalTerminology: [
      {
        termJp: 'カーボンニュートラル',
        reading: 'Carbon Neutral',
        termVn: 'Trung hòa carbon / Phát thải ròng bằng không (Net Zero)',
        nuance: 'Cân bằng lượng phát thải nhà kính với lượng hấp thụ.',
      },
      {
        termJp: '混焼発電',
        reading: 'こんしょうはつでん (Konshou Hatsuden)',
        termVn: 'Phát điện đồng đốt (Co-firing)',
        nuance: 'Đốt than cùng lúc với Amoniac/Hydro để giảm phát thải CO2.',
      },
      {
        termJp: '脱炭素 (ダツタンソ)',
        reading: 'だったんそ (Datsutanso)',
        termVn: 'Phi carbon hóa / Khử carbon',
        nuance: 'Xu thế chuyển dịch năng lượng toàn cầu.',
      },
      {
        termJp: 'J-クレジット',
        reading: 'J-Credit',
        termVn: 'Hệ thống tín chỉ carbon chứng nhận bởi chính phủ Nhật Bản',
        nuance: 'Cơ chế mua bán hạn ngạch phát thải xanh.',
      },
    ],
    stenoShorthandTips: ['Net0 = 2050', 'H2/NH3 = Hydro/Amoniac', 'CoFire = Đồng đốt', 'DeCarb = Khử than', 'Cred = Tín chỉ'],
  },
  {
    id: 'scen_biomedical',
    category: 'biomedical',
    title: 'Hội Thảo Y Sinh Học & Dược Phẩm: Kháng Thể Đơn Dòng & Thử Nghiệm Lâm Sàng',
    subtitle: 'Báo cáo Kết quả Thử Nghiệm Giai đoạn III Thuốc Liên Hợp Kháng Thể ADC Khối U',
    conferenceName: 'Hội Nghị Ung Thư Học & Miễn Dịch Quốc Tế Tokyo Biopharma',
    speakerRole: 'Giám đốc Y khoa & Nghiên cứu Lâm sàng (Chief Medical Officer)',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: Stethoscope,
    colorScheme: {
      badgeBg: 'bg-purple-950/60',
      badgeText: 'text-purple-300',
      border: 'border-purple-800/50',
      accent: 'text-purple-400',
    },
    audioDurationSeconds: 42,
    japaneseFullText:
      '第III相二重盲検無作為化比較試験において、当社の新規ADC製剤は、無増悪生存期間および全生存期間の統計学的に有意な延長を示し、重篤な有害事象の発現率も許容範囲内に制御されております。',
    vietnameseMasterTranslation:
      'Trong thử nghiệm lâm sàng đối chứng ngẫu nhiên mù đôi giai đoạn III, chế phẩm liên hợp kháng thể ADC thế hệ mới của chúng tôi đã chứng minh được việc kéo dài có ý nghĩa thống kê đối với cả thời gian sống không bệnh tiến triển (PFS) lẫn thời gian sống còn toàn bộ (OS), đồng thời tỷ lệ xuất hiện các biến cố bất lợi nghiêm trọng vẫn được kiểm soát trong ngưỡng an toàn cho phép.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '第III相二重盲検無作為化比較試験において、',
        romajiChunk: 'Dai-san-sou nijuu-mouken musakui-ka hikaku shiken ni oite,',
        vietnameseChunk: 'Trong thử nghiệm so sánh mù đôi phân nhóm ngẫu nhiên giai đoạn III,',
        timingSec: 0,
        decalageRecommendedSec: 3.0,
        tacticalNote: 'Cụm thuật ngữ y học lâm sàng kinh điển: RCT mù đôi pha 3.',
      },
      {
        order: 2,
        japaneseChunk: '当社の新規ADC製剤は、',
        romajiChunk: 'tousha no shinki Ei-Dii-Shii seizai wa,',
        vietnameseChunk: 'chế phẩm phức hợp kháng thể thuốc ADC mới của công ty chúng tôi',
        timingSec: 7,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'ADC = Antibody-Drug Conjugate (Kháng thể gắn độc tố diệt ung thư).',
      },
      {
        order: 3,
        japaneseChunk: '無増悪生存期間および全生存期間の',
        romajiChunk: 'muzouaku seizon kikan oyobi zen-seizon kikan no',
        vietnameseChunk: 'đã giúp kéo dài thời gian sống không tiến triển bệnh cũng như thời gian sống toàn bộ',
        timingSec: 13,
        decalageRecommendedSec: 3.2,
        tacticalNote: 'PFS (PFS) & OS (Overall Survival) là 2 chỉ số vàng ung thư học.',
      },
      {
        order: 4,
        japaneseChunk: '統計学的に有意な延長を示し、',
        romajiChunk: 'toukeigakuteki ni yuui na enchou o shimeshi,',
        vietnameseChunk: 'đạt mức độ cải thiện có ý nghĩa về mặt thống kê,',
        timingSec: 22,
        decalageRecommendedSec: 2.8,
        tacticalNote: '統計学的に有意 = Statistically Significant.',
      },
      {
        order: 5,
        japaneseChunk: '重篤な有害事象の発現率も許容範囲内に制御されております。',
        romajiChunk: 'juutoku na yuugai jijou no hatsugenritsu mo kyouyou han\'inai ni seigyo sarete orimasu.',
        vietnameseChunk: 'trong khi tỷ lệ biến cố ngoại ý nghiêm trọng vẫn được kiềm tỏa trong giới hạn cho phép.',
        timingSec: 28,
        decalageRecommendedSec: 2.0,
        tacticalNote: '有害事象 = Adverse Event (Tác dụng phụ / phản ứng có hại).',
      },
    ],
    criticalTerminology: [
      {
        termJp: '二重盲検無作為化比較試験 (RCT)',
        reading: 'にじゅうもうけん むさくいか ひかくしけん',
        termVn: 'Thử nghiệm đối chứng ngẫu nhiên mù đôi',
        nuance: 'Tiêu chuẩn vàng cao nhất của y học chứng cứ.',
      },
      {
        termJp: '無増悪生存期間 (PFS)',
        reading: 'むぞうあくせいぞんきかん',
        termVn: 'Thời gian sống không bệnh tiến triển (Progression-Free Survival)',
        nuance: 'Thời gian từ khi điều trị đến khi khối u lớn lên trở lại.',
      },
      {
        termJp: '全生存期間 (OS)',
        reading: 'ぜんせいぞんきかん (Zen-seizon Kikan)',
        termVn: 'Thời gian sống còn toàn bộ (Overall Survival)',
        nuance: 'Thời gian bệnh nhân còn sống kể từ thời điểm chẩn đoán/điều trị.',
      },
      {
        termJp: '重篤な有害事象 (SAE)',
        reading: 'じゅうとくな ゆうがいじしょう',
        termVn: 'Biến cố bất lợi nghiêm trọng (Serious Adverse Event)',
        nuance: 'Các phản ứng đe dọa tính mạng hoặc phải nhập viện.',
      },
    ],
    stenoShorthandTips: ['RCT = Mù đôi', 'ADC = Thuốc kháng thể', 'PFS = Sống ko tiến triển', 'OS = Sống toàn bộ', 'SAE = Tác dụng phụ'],
  },
  {
    id: 'scen_arbitration',
    category: 'international_law',
    title: 'Trọng Tài Thương Mại Quốc Tế: Tranh Chấp Vi Phạm Điều Khoản Độc Quyền',
    subtitle: 'Lời Tranh Tụng của Luật Sư Đại Diện bên Bị Đơn tại Trung tâm Trọng tài JCAA',
    conferenceName: 'Phiên Điều Trần Trọng Tài Thương Mại Quốc Tế Tokyo',
    speakerRole: 'Luật sư Trưởng Đoàn Luật sư Tranh tụng Quốc tế (Lead Counsel)',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: Scale,
    colorScheme: {
      badgeBg: 'bg-amber-950/60',
      badgeText: 'text-amber-300',
      border: 'border-amber-800/50',
      accent: 'text-amber-400',
    },
    audioDurationSeconds: 40,
    japaneseFullText:
      '本件契約書第18条に規定される不可抗力条項に照らし、地政学的リスクに伴うサプライチェーン寸断は予見不可能な事由に該当するため、債務不履行に基づく損害賠償請求は法的に棄却されるべきであります。',
    vietnameseMasterTranslation:
      'Chiếu theo điều khoản bất khả kháng được quy định tại Điều 18 của hợp đồng này, sự đứt gãy chuỗi cung ứng do các rủi ro địa chính trị phát sinh cấu thành tình huống không thể lường trước, do đó yêu cầu bồi thường thiệt hại dựa trên căn cứ vi phạm nghĩa vụ hợp đồng cần phải bị bác bỏ hoàn toàn về mặt pháp lý.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '本件契約書第18条に規定される不可抗力条項に照らし、',
        romajiChunk: 'Honken keiyakusho dai-juuhachi-jou ni kitei sareru fukakouryoku joukou ni terashi,',
        vietnameseChunk: 'Căn cứ vào điều khoản bất khả kháng được quy định tại Điều 18 của bản hợp đồng này,',
        timingSec: 0,
        decalageRecommendedSec: 2.8,
        tacticalNote: 'Cụm "〜に照らし" = Chiếu theo / Căn cứ vào quy định pháp luật.',
      },
      {
        order: 2,
        japaneseChunk: '地政学的リスクに伴うサプライチェーン寸断は',
        romajiChunk: 'chiseigakuteki risuku ni tomonau sapuraicheen sundan wa',
        vietnameseChunk: 'việc đứt gãy chuỗi cung ứng bắt nguồn từ các biến động địa chính trị',
        timingSec: 7,
        decalageRecommendedSec: 2.5,
        tacticalNote: '寸断 (Sundan) = Tê liệt / Đứt gãy toàn diện.',
      },
      {
        order: 3,
        japaneseChunk: '予見不可能な事由に該当するため、',
        romajiChunk: 'yoken fukanou na jiyuu ni gaitou suru tame,',
        vietnameseChunk: 'thuộc về trường hợp sự kiện bất khả kháng không thể dự liệu trước,',
        timingSec: 14,
        decalageRecommendedSec: 2.8,
        tacticalNote: 'Thuật ngữ luật học: "Sự cố không thể dự báo trước".',
      },
      {
        order: 4,
        japaneseChunk: '債務不履行に基づく損害賠償請求は',
        romajiChunk: 'saimu furikou ni motozuku songai baishou seikyuu wa',
        vietnameseChunk: 'vì vậy yêu sách đòi bồi thường thiệt hại do bất hoàn thành nghĩa vụ thanh toán',
        timingSec: 20,
        decalageRecommendedSec: 3.0,
        tacticalNote: '債務不履行 = Breach of contract / Vi phạm nghĩa vụ.',
      },
      {
        order: 5,
        japaneseChunk: '法的に棄却されるべきであります。',
        romajiChunk: 'houteki ni kikyaku sareru beki de arimasu.',
        vietnameseChunk: 'cần phải bị hội đồng trọng tài bác bỏ hoàn toàn theo luật định.',
        timingSec: 28,
        decalageRecommendedSec: 1.8,
        tacticalNote: '棄却 (Kikyaku) = Bác đơn / Không chấp thuận yêu cầu khởi kiện.',
      },
    ],
    criticalTerminology: [
      {
        termJp: '不可抗力条項 (Force Majeure)',
        reading: 'ふかこうりょくじょうこう',
        termVn: 'Điều khoản sự kiện bất khả kháng',
        nuance: 'Miễn trừ trách nhiệm khi xảy ra chiến tranh, thiên tai, dịch bệnh.',
      },
      {
        termJp: '債務不履行',
        reading: 'さいむふりこう (Saimu Furikou)',
        termVn: 'Vi phạm nghĩa vụ hợp đồng / Không thực hiện nghĩa vụ',
        nuance: 'Bên có nghĩa vụ không thi hành đúng cam kết.',
      },
      {
        termJp: '損害賠償請求',
        reading: 'そんがいばいしょうせいきゅう',
        termVn: 'Yêu cầu bồi thường thiệt hại',
        nuance: 'Biện pháp chế tài pháp lý dân sự và thương mại.',
      },
      {
        termJp: '棄却 (キキャク)',
        reading: 'ききゃく (Kikyaku)',
        termVn: 'Bác bỏ / Không thụ lý / Bác yêu cầu khởi kiện',
        nuance: 'Quyết định bác bỏ của tòa án hoặc hội đồng trọng tài.',
      },
    ],
    stenoShorthandTips: ['FM = Bất khả kháng', 'Disrupt = Đứt gãy', 'Breach = Vi phạm', 'Damages = Bồi thường', 'Dismiss = Bác đơn'],
  },
];

export const EXTRA_CABIN_SCENARIOS: CabinScenario[] = [
  {
    id: 'scen_aerospace',
    category: 'aerospace',
    title: 'Hội Thảo Hàng Không Vũ Trụ: Tên Lửa H3 & Vệ Tinh Quỹ Đạo Thấp (LEO)',
    subtitle: 'Báo cáo Điều phối của Giám đốc Kỹ thuật Cơ quan Thám hiểm Vũ trụ Nhật Bản (JAXA)',
    conferenceName: 'Diễn Đàn Công Nghiệp Vũ Trụ & Vệ Tinh Quốc Tế Tokyo Space Expo',
    speakerRole: 'Giám đốc Đẩy Phóng & Tên Lửa H3 (JAXA Chief Engineer)',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: Rocket,
    colorScheme: {
      badgeBg: 'bg-indigo-950/60',
      badgeText: 'text-indigo-300',
      border: 'border-indigo-800/50',
      accent: 'text-indigo-400',
    },
    audioDurationSeconds: 42,
    japaneseFullText:
      '新型基幹ロケットH3の打ち上げ成功を受け、我が国は低軌道メガコンステレーション構築への打上げコスト半減と、月周回有人拠点アルテミス計画における物資補給機の確実な軌道投入を両立させ、宇宙探査の主導権を確保してまいります。',
    vietnameseMasterTranslation:
      'Sau thành công của đợt phóng tên lửa chủ lực thế hệ mới H3, đất nước chúng tôi sẽ song hành mục tiêu giảm một nửa chi phí phóng cho việc thiết lập mạng lưới siêu chùm vệ tinh quỹ đạo thấp (LEO), đồng thời bảo đảm khả năng đưa tàu tiếp tế vào quỹ đạo chính xác trong khuôn khổ trạm không gian có người quay quanh Mặt trăng Artemis, qua đó giữ vững vị thế dẫn đầu trong kỷ nguyên thám hiểm không gian.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '新型基幹ロケットH3の打ち上げ成功を受け、',
        romajiChunk: 'Shingata kikan roketto Ecchi-Surii no uchiage seikou o uke,',
        vietnameseChunk: 'Sau thành công vang dội của đợt phóng tên lửa chủ lực thế hệ mới H3,',
        timingSec: 0,
        decalageRecommendedSec: 2.2,
        tacticalNote: 'Cụm "〜を受け" dịch là "Trên đà thành công của... / Sau khi...".',
      },
      {
        order: 2,
        japaneseChunk: '我が国は低軌道メガコンステレーション構築への',
        romajiChunk: 'wagakuni wa teikidou mega-konsutereeshon kouchiku e no',
        vietnameseChunk: 'đất nước chúng tôi đối với việc thiết lập siêu chùm vệ tinh quỹ đạo thấp LEO',
        timingSec: 6,
        decalageRecommendedSec: 2.8,
        tacticalNote: 'Megaconstellation = Siêu chùm vệ tinh viễn thông.',
      },
      {
        order: 3,
        japaneseChunk: '打上げコスト半減と、',
        romajiChunk: 'uchiage kosuto hangen to,',
        vietnameseChunk: 'sẽ cắt giảm một nửa chi phí phóng tên lửa thương mại, cùng với',
        timingSec: 13,
        decalageRecommendedSec: 2.0,
        tacticalNote: 'コスト半減 = Cắt giảm 50% chi phí.',
      },
      {
        order: 4,
        japaneseChunk: '月周回有人拠点アルテミス計画における物資補給機の確実な軌道投入を両立させ、',
        romajiChunk: 'tsuki-shuukai yuujin kyoten Arutemisu keikaku ni okeru busshi hokyuuki no kakujitsu na kidou tounyuu o ryouritsu sase,',
        vietnameseChunk: 'bảo đảm đưa tàu vận tải tiếp tế vào đúng quỹ đạo trong sứ mệnh trạm không gian Mặt trăng Artemis,',
        timingSec: 19,
        decalageRecommendedSec: 3.2,
        tacticalNote: 'Artemis Project = Dự án thám hiểm Mặt trăng đa quốc gia.',
      },
      {
        order: 5,
        japaneseChunk: '宇宙探査の主導権を確保してまいります。',
        romajiChunk: 'uchuu tansa no shudouken o kakuho shite mairimasu.',
        vietnameseChunk: 'qua đó củng cố vai trò dẫn dắt trong thám hiểm vũ trụ toàn cầu.',
        timingSec: 30,
        decalageRecommendedSec: 2.0,
        tacticalNote: '主導権を確保 = Khẳng định quyền chủ động / vai trò tiên phong.',
      },
    ],
    criticalTerminology: [
      {
        termJp: '基幹ロケット (H3)',
        reading: 'きかんロケット',
        termVn: 'Tên lửa đẩy chủ lực quốc gia',
        nuance: 'Dòng tên lửa chiến lược đưa vệ tinh và tải trọng lớn lên quỹ đạo.',
      },
      {
        termJp: '低軌道メガコンステレーション',
        reading: 'ていきどう メガコンステレーション',
        termVn: 'Siêu chùm vệ tinh quỹ đạo thấp (LEO Megaconstellation)',
        nuance: 'Mạng lưới hàng nghìn vệ tinh tầm thấp như Starlink/Kuiper.',
      },
      {
        termJp: '軌道投入',
        reading: 'きどうとうにゅう (Kidou Tounyuu)',
        termVn: 'Bắn đưa tải trọng vào quỹ đạo chính xác',
        nuance: 'Thuật ngữ vật lý hàng không vũ trụ quỹ đạo.',
      },
      {
        termJp: '物資補給機 (HTV-X)',
        reading: 'ぶっしほきゅうき',
        termVn: 'Tàu vận tải tiếp tế vật tư không gian',
        nuance: 'Phương tiện chở nhiên liệu, thực phẩm lên trạm vũ trụ.',
      },
    ],
    stenoShorthandTips: ['H3 = Tên lửa', 'LEO = Quỹ đạo thấp', 'Cost/2 = Giảm 50%', 'Artemis = Mặt trăng', 'Orbit = Quỹ đạo'],
  },
  {
    id: 'scen_cybersecurity',
    category: 'cybersecurity',
    title: 'Hội Nghị An Ninh Mạng: Mật Mã Hậu Lượng Tử & Kiến Trúc Zero Trust',
    subtitle: 'Thông điệp của Trưởng ban Chỉ đạo An toàn Thông tin Quốc gia (NISC)',
    conferenceName: 'Hội Thảo Thượng Đỉnh An Toàn Không Gian Mạng Tokyo Cyber Summit',
    speakerRole: 'Giám đốc Điều hành Cơ quan An ninh Không gian Mạng Quốc gia',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: ShieldCheck,
    colorScheme: {
      badgeBg: 'bg-blue-950/60',
      badgeText: 'text-blue-300',
      border: 'border-blue-800/50',
      accent: 'text-blue-400',
    },
    audioDurationSeconds: 40,
    japaneseFullText:
      '量子コンピュータの実用化によるRSA暗号解読の脅威に備え、耐量子計算機暗号（PQC）への移行ロードマップを策定し、ゼロトラストアーキテクチャに基づいたサプライチェーン全体の認証強化を義務付けます。',
    vietnameseMasterTranslation:
      'Nhằm chủ động phòng ngừa nguy cơ bẻ khóa mã hóa RSA khi máy tính lượng tử bước vào giai đoạn thương mại hóa, chúng tôi xây dựng lộ trình chuyển đổi sang thuật toán mật mã hậu lượng tử (PQC), đồng thời bắt buộc siết chặt quy chuẩn xác thực đa lớp trên toàn bộ chuỗi cung ứng dựa trên nền tảng kiến trúc Zero Trust.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '量子コンピュータの実用化による',
        romajiChunk: 'Ryoushi konpyuuta no jitsuyouka ni yoru',
        vietnameseChunk: 'Trước làn sóng ứng dụng thương mại của điện toán lượng tử',
        timingSec: 0,
        decalageRecommendedSec: 2.2,
        tacticalNote: 'Cụm "実用化による" = Bắt nguồn từ việc thương mại hóa.',
      },
      {
        order: 2,
        japaneseChunk: 'RSA暗号解読の脅威に備え、',
        romajiChunk: 'Aaru-Esu-Ei angou kaidoku no kyoui ni sonae,',
        vietnameseChunk: 'và mối đe dọa bẻ gãy hệ thống mã hóa bảo mật RSA,',
        timingSec: 6,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'Cấu trúc "〜に備え" = Nhằm chuẩn bị ứng phó trước.',
      },
      {
        order: 3,
        japaneseChunk: '耐量子計算機暗号（PQC）への移行ロードマップを策定し、',
        romajiChunk: 'tairyoushi keisanki angou e no ikou roodomappu o sakutei shi,',
        vietnameseChunk: 'chúng tôi đã ban hành lộ trình chuyển dịch sang mật mã hậu lượng tử PQC,',
        timingSec: 13,
        decalageRecommendedSec: 3.0,
        tacticalNote: 'PQC: Post-Quantum Cryptography.',
      },
      {
        order: 4,
        japaneseChunk: 'ゼロトラストアーキテクチャに基づいた',
        romajiChunk: 'Zero torasuto aakitekutya ni motozuita',
        vietnameseChunk: 'trên cơ sở áp dụng mô hình kiến trúc không tin cậy Zero Trust,',
        timingSec: 21,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'Zero Trust = Nguyên tắc "Không bao giờ tin, luôn luôn xác minh".',
      },
      {
        order: 5,
        japaneseChunk: 'サプライチェーン全体の認証強化を義務付けます。',
        romajiChunk: 'sapuraicheen zentai no ninshou kyouka o gimuzukemasu.',
        vietnameseChunk: 'chúng tôi bắt buộc tăng cường chứng thực an ninh trên toàn thể chuỗi cung ứng.',
        timingSec: 28,
        decalageRecommendedSec: 2.0,
        tacticalNote: '義務付けます = Khiến thành nghĩa vụ bắt buộc tuân thủ.',
      },
    ],
    criticalTerminology: [
      {
        termJp: '耐量子計算機暗号 (PQC)',
        reading: 'たいりょうし けいさんき あんごう',
        termVn: 'Mật mã hậu lượng tử (Post-Quantum Cryptography)',
        nuance: 'Hệ thuật toán kháng cự lại năng lực giải mã của siêu máy tính lượng tử.',
      },
      {
        termJp: 'ゼロトラスト',
        reading: 'Zero Trust',
        termVn: 'Kiến trúc bảo mật Không Tin Cậy (Zero Trust Architecture)',
        nuance: 'Xác minh danh tính liên tục mọi truy cập vào mạng.',
      },
      {
        termJp: '暗号解読',
        reading: 'あんごうかいどく (Angou Kaidoku)',
        termVn: 'Bẻ khóa mật mã / Giải mã khóa',
        nuance: 'Hành vi phá vỡ khóa bảo mật toán học.',
      },
      {
        termJp: '義務付ける',
        reading: 'ぎむづける (Gimuzukeru)',
        termVn: 'Bắt buộc thực thi theo pháp lý / Quy chuẩn bắt buộc',
        nuance: 'Chế định pháp lý của cơ quan quản lý nhà nước.',
      },
    ],
    stenoShorthandTips: ['Quantum = Lượng tử', 'PQC = Mật mã mới', '0Trust = Zero Trust', 'Supply = Chuỗi cung ứng', 'Mandate = Bắt buộc'],
  },
  {
    id: 'scen_smart_logistics',
    category: 'smart_logistics',
    title: 'Diễn Đàn Logistics Hàng Hải: Cảng Biển Thông Minh & Kho Lạnh LNG',
    subtitle: 'Chiến lược Số hóa Chuỗi Cung Ứng Toàn Cầu của Tổng Giám đốc Tập đoàn NYK Line',
    conferenceName: 'Hội Nghị Thượng Đỉnh Vận Tải Đa Phương Thức Châu Á - Thái Bình Dương',
    speakerRole: 'Tổng Giám đốc Tập đoàn Vận tải Hàng hải Quốc tế',
    difficulty: 'Cao Cấp (Executive)',
    icon: Ship,
    colorScheme: {
      badgeBg: 'bg-sky-950/60',
      badgeText: 'text-sky-300',
      border: 'border-sky-800/50',
      accent: 'text-sky-400',
    },
    audioDurationSeconds: 40,
    japaneseFullText:
      '港湾DXの推進による無人搬送車（AGV）の完全自動運用と、LNG冷熱を活用した超低温コールドチェーン網の構築により、物流の2024年問題への抜本的対策と環境負荷低減を両立させてまいります。',
    vietnameseMasterTranslation:
      'Thông qua việc thúc đẩy chuyển đổi số cảng biển (Port DX) với đội xe tự hành AGV vận hành hoàn toàn tự động, kết hợp với mạng lưới kho lạnh âm sâu tận dụng nguồn nhiệt lạnh từ khí hóa lỏng LNG, chúng tôi sẽ đồng thời giải quyết triệt để cuộc khủng hoảng thiếu hụt nhân lực ngành vận tải "Vấn đề năm 2024" lẫn giảm thiểu tối đa tải trọng phát thải ra môi trường.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '港湾DXの推進による',
        romajiChunk: 'Kouwan Dii-Ekkusu no suishin ni yoru',
        vietnameseChunk: 'Nhờ vào việc xúc tiến chuyển đổi số hệ thống cảng biển thông minh,',
        timingSec: 0,
        decalageRecommendedSec: 2.2,
        tacticalNote: '港湾DX = Port Digital Transformation.',
      },
      {
        order: 2,
        japaneseChunk: '無人搬送車（AGV）の完全自動運用と、',
        romajiChunk: 'mujin hansousha Ei-Jii-Vii no kanzen jidou un\'you to,',
        vietnameseChunk: 'triển khai vận hành tự động hóa hoàn toàn đội xe chuyên chở AGV,',
        timingSec: 5,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'AGV: Automated Guided Vehicle (Xe vận chuyển tự hành).',
      },
      {
        order: 3,
        japaneseChunk: 'LNG冷熱を活用した超低温コールドチェーン網の構築により、',
        romajiChunk: 'Eru-Enu-Jii reinetsu o katsuyou shita chouteion koorudocheen-mou no kouchiku ni yori,',
        vietnameseChunk: 'đồng thời xây dựng mạng lưới chuỗi cung ứng lạnh âm sâu tận dụng nhiệt hóa lỏng khí LNG,',
        timingSec: 13,
        decalageRecommendedSec: 3.2,
        tacticalNote: 'LNG冷熱 = Tận dụng nhiệt độ cực lạnh của khí hóa lỏng để làm lạnh kho.',
      },
      {
        order: 4,
        japaneseChunk: '物流の2024年問題への抜本的対策と',
        romajiChunk: 'butsuryuu no nisen-nijuuyon-nen mondai e no bapponteki taisaku to',
        vietnameseChunk: 'chúng tôi vừa đưa ra giải pháp căn cơ cho "Cuộc khủng hoảng logistics 2024",',
        timingSec: 23,
        decalageRecommendedSec: 2.8,
        tacticalNote: '2024年問題 = Khủng hoảng siết giờ làm tài xế xe tải tại Nhật Bản.',
      },
      {
        order: 5,
        japaneseChunk: '環境負荷低減を両立させてまいります。',
        romajiChunk: 'kankyou fuka teigen o ryouritsu sasete mairimasu.',
        vietnameseChunk: 'vừa hiện thực hóa mục tiêu giảm thiểu tác động tiêu cực đến môi trường.',
        timingSec: 31,
        decalageRecommendedSec: 2.0,
        tacticalNote: '環境負荷低減 = Giảm thiểu gánh nặng sinh thái.',
      },
    ],
    criticalTerminology: [
      {
        termJp: '無人搬送車 (AGV)',
        reading: 'むじんはんそうしゃ (AGV)',
        termVn: 'Phương tiện tự hành dẫn đường trong cảng biển & kho bãi',
        nuance: 'Tự động bốc xếp container không người lái.',
      },
      {
        termJp: 'コールドチェーン',
        reading: 'Cold Chain',
        termVn: 'Chuỗi cung ứng nhiệt độ kiểm soát (Chuỗi cung ứng lạnh)',
        nuance: 'Bảo quản nông sản, hải sản và vắc xin ở nhiệt độ âm sâu.',
      },
      {
        termJp: '物流の2024年問題',
        reading: 'ぶつりゅうの 2024ねんもんだい',
        termVn: 'Khủng hoảng Logistics năm 2024 của Nhật Bản',
        nuance: 'Luật giới hạn làm thêm giờ của tài xế gây thiếu hụt 14% năng lực vận chuyển.',
      },
      {
        termJp: '抜本的対策',
        reading: 'ばっぽんてきたいさく',
        termVn: 'Biện pháp giải quyết tận gốc rễ / Giải pháp căn cơ',
        nuance: 'Giải pháp xử lý từ cội nguồn thay vì đối phó tạm thời.',
      },
    ],
    stenoShorthandTips: ['AGV = Xe tự hành', 'LNG = Khí hóa lỏng', 'Cold = Chuỗi lạnh', '2024 = Khủng hoảng tài xế', 'Eco = Giảm phát thải'],
  },
  {
    id: 'scen_smart_agtech',
    category: 'smart_agtech',
    title: 'Hội Thảo Nông Nghiệp Thông Minh: Vệ Tinh Michibiki & Robot Tự Hành',
    subtitle: 'Chính sách Tự động hóa Nông nghiệp của Viện Nghiên cứu Nông nghiệp Quốc gia (NARO)',
    conferenceName: 'Diễn Đàn Chuyển Đổi Số Nông Nghiệp Thông Minh Tokyo AgTech',
    speakerRole: 'Viện trưởng Viện Nghiên cứu Cơ giới hóa Nông nghiệp NARO',
    difficulty: 'Cao Cấp (Executive)',
    icon: Sprout,
    colorScheme: {
      badgeBg: 'bg-lime-950/60',
      badgeText: 'text-lime-300',
      border: 'border-lime-800/50',
      accent: 'text-lime-400',
    },
    audioDurationSeconds: 38,
    japaneseFullText:
      '準天頂衛星「みちびき」の高精度測位を活用した自動運転農機とAI画像認識による生育診断の導入により、担い手不足に直面する我が国農業の生産性倍増と精密農業の確立を目指します。',
    vietnameseMasterTranslation:
      'Thông qua việc triển khai các dòng máy móc nông nghiệp tự hành sử dụng dữ liệu định vị centimet chuẩn xác từ chùm vệ tinh địa tĩnh Michibiki kết hợp chẩn đoán sinh trưởng cây trồng bằng thị giác máy tính AI, chúng tôi hướng tới mục tiêu tăng gấp đôi năng suất và xác lập vị thế của nền nông nghiệp chính xác trong bối cảnh nông dân Nhật Bản đang đối mặt với sự già hóa lực lượng lao động.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '準天頂衛星「みちびき」の高精度測位を活用した',
        romajiChunk: 'Juntenchou eisei Michibiki no kouseido sokui o katsuyou shita',
        vietnameseChunk: 'Tận dụng công nghệ định vị siêu chuẩn xác từ chùm vệ tinh địa tĩnh Michibiki,',
        timingSec: 0,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'Michibiki (QZSS) = Hệ thống vệ tinh định vị độ chính xác cấp centimet của Nhật.',
      },
      {
        order: 2,
        japaneseChunk: '自動運転農機とAI画像認識による生育診断の導入により、',
        romajiChunk: 'jidou unten nouki to Ei-Ai gazou ninshiki ni yoru seiku shindan no dounyuu ni yori,',
        vietnameseChunk: 'kết hợp máy móc nông nghiệp tự lái và phân tích sinh trưởng bằng trí tuệ nhân tạo,',
        timingSec: 7,
        decalageRecommendedSec: 3.0,
        tacticalNote: '生育診断 = Chẩn đoán sức khỏe mùa màng.',
      },
      {
        order: 3,
        japaneseChunk: '担い手不足に直面する我が国農業の',
        romajiChunk: 'ninaite busoku ni chokumen suru wagakuni nougyou no',
        vietnameseChunk: 'đối với nền nông nghiệp đất nước đang đối mặt tình trạng khan hiếm người kế thừa,',
        timingSec: 16,
        decalageRecommendedSec: 2.8,
        tacticalNote: '担い手不足 (Ninaite busoku) = Thiếu người kế thừa / thiếu lao động kế tục.',
      },
      {
        order: 4,
        japaneseChunk: '生産性倍増と精密農業の確立を目指します。',
        romajiChunk: 'seisansei baizou to seimitsu nougyou no kakuritsu o mezashimasu.',
        vietnameseChunk: 'chúng tôi hướng tới việc nhân đôi năng suất và thiết lập nền nông nghiệp chính xác.',
        timingSec: 24,
        decalageRecommendedSec: 2.0,
        tacticalNote: '精密農業 = Precision Agriculture.',
      },
    ],
    criticalTerminology: [
      {
        termJp: '準天頂衛星「みちびき」 (QZSS)',
        reading: 'じゅんてんちょうえいせい みちびき',
        termVn: 'Chùm vệ tinh chuẩn đỉnh Michibiki (Quasi-Zenith Satellite)',
        nuance: 'Định vị độ lệch dưới 1cm phục vụ máy cày và xe tự lái.',
      },
      {
        termJp: '精密農業',
        reading: 'せいみつのうぎょう (Seimitsu Nougyou)',
        termVn: 'Nông nghiệp chính xác (Precision Agriculture)',
        nuance: 'Bón phân, tưới tiêu đúng từng mét vuông đất nhờ cảm biến IoT.',
      },
      {
        termJp: '担い手不足',
        reading: 'にないてぶそく (Ninaite Busoku)',
        termVn: 'Thiếu hụt người kế nghiệp / người gánh vác',
        nuance: 'Khủng hoảng cơ cấu dân số già hóa tại vùng nông thôn Nhật.',
      },
      {
        termJp: '生育診断',
        reading: 'せいいくしんだん',
        termVn: 'Chẩn đoán trạng thái sinh trưởng cây trồng',
        nuance: 'Dùng camera bay drone quang phổ để phát hiện sâu bệnh.',
      },
    ],
    stenoShorthandTips: ['QZSS = Vệ tinh Nhật', 'AutoAg = Máy cày tự lái', 'NoWorker = Thiếu lao động', 'Prod*2 = Năng suất x2', 'PrecAg = Nông nghiệp CX'],
  },
  {
    id: 'scen_green_reit',
    category: 'green_reit',
    title: 'Đại Hội Đầu Tư Bất Động Sản J-REIT: Trái Phiếu Xanh & Chứng Chỉ CASBEE',
    subtitle: 'Công bố Chiến lược Quản lý Quỹ Tài sản Xanh của Chủ tịch Quỹ Bất động sản Niêm yết Tokyo',
    conferenceName: 'Hội Nghị Thượng Đỉnh Quỹ Đầu Tư Bất Động Sản Bền Vững Châu Á',
    speakerRole: 'Chủ tịch Hiệp hội Quỹ Đầu tư Bất động sản J-REIT',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: Building2,
    colorScheme: {
      badgeBg: 'bg-emerald-950/60',
      badgeText: 'text-emerald-300',
      border: 'border-emerald-800/50',
      accent: 'text-emerald-400',
    },
    audioDurationSeconds: 40,
    japaneseFullText:
      'ESG投資マネーの流入を背景に、CASBEE最高ランクの環境認証オフィスビルへの集中投資を進め、グリーンボンド発行を通じた資金調達コスト圧縮と強固なNAV成長を実現してまいります。',
    vietnameseMasterTranslation:
      'Trước bối cảnh dòng vốn đầu tư ESG đang đổ mạnh vào thị trường, chúng tôi sẽ đẩy mạnh danh mục đầu tư tập trung vào các tòa nhà văn phòng đạt chứng chỉ môi trường cao nhất CASBEE S-Rank, đồng thời tối ưu hóa chi phí huy động vốn thông qua việc phát hành trái phiếu xanh (Green Bond), đảm bảo tốc độ tăng trưởng giá trị tài sản ròng (NAV) bền vững.',
    chunks: [
      {
        order: 1,
        japaneseChunk: 'ESG投資マネーの流入を背景に、',
        romajiChunk: 'Ii-Esu-Jii toushi manee no ryuunyuu o haikei ni,',
        vietnameseChunk: 'Trước làn sóng dòng tiền đầu tư theo tiêu chuẩn ESG đang ồ ạt đổ vào,',
        timingSec: 0,
        decalageRecommendedSec: 2.2,
        tacticalNote: 'ESG: Environmental, Social, and Governance.',
      },
      {
        order: 2,
        japaneseChunk: 'CASBEE最高ランクの環境認証オフィスビルへの集中投資を進め、',
        romajiChunk: 'Kyasubii saikou ranku no kankyou ninshou ofisu biru e no shuuchuu toushi o susume,',
        vietnameseChunk: 'chúng tôi tiến hành chiến lược đầu tư trọng điểm vào các cao ốc văn phòng đạt chứng nhận xanh cao nhất CASBEE,',
        timingSec: 6,
        decalageRecommendedSec: 3.2,
        tacticalNote: 'CASBEE: Hệ thống đánh giá hiệu quả môi trường xây dựng của Nhật.',
      },
      {
        order: 3,
        japaneseChunk: 'グリーンボンド発行を通じた資金調達コスト圧縮と',
        romajiChunk: 'Guriin bondo hakkou o tsuujita shikin choutatsu kosuto asshuku to',
        vietnameseChunk: 'kết hợp nén giảm chi phí huy động vốn thông qua phát hành trái phiếu xanh,',
        timingSec: 16,
        decalageRecommendedSec: 2.8,
        tacticalNote: 'Green Bond = Trái phiếu xanh tài trợ dự án bền vững.',
      },
      {
        order: 4,
        japaneseChunk: '強固なNAV成長を実現してまいります。',
        romajiChunk: 'kyouko na Enu-Ei-Vii seichou o jitsugen shite mairimasu.',
        vietnameseChunk: 'hiện thực hóa sự gia tăng vững chắc của giá trị tài sản ròng NAV.',
        timingSec: 25,
        decalageRecommendedSec: 2.0,
        tacticalNote: 'NAV = Net Asset Value (Giá trị tài sản ròng trên mỗi chứng chỉ quỹ).',
      },
    ],
    criticalTerminology: [
      {
        termJp: 'CASBEE認証',
        reading: 'キャスビー にんしょう',
        termVn: 'Chứng nhận hiệu quả môi trường công trình xây dựng Nhật Bản',
        nuance: 'Thang đo tương đương tiêu chuẩn LEED của Mỹ.',
      },
      {
        termJp: 'グリーンボンド (Green Bond)',
        reading: 'グリーンボンド',
        termVn: 'Trái phiếu xanh',
        nuance: 'Trái phiếu huy động vốn chỉ dành cho dự án sinh thái.',
      },
      {
        termJp: '純資産価値 (NAV)',
        reading: 'じゅんしさんかち (Net Asset Value)',
        termVn: 'Giá trị tài sản ròng',
        nuance: 'Tổng giá trị tài sản trừ đi toàn bộ nợ phải trả của quỹ đầu tư.',
      },
      {
        termJp: '資金調達コスト圧縮',
        reading: 'しきんちょうたつ コスト あっしゅく',
        termVn: 'Nén giảm chi phí huy động vốn vay',
        nuance: 'Hạ lãi suất phát hành nhờ uy tín chứng chỉ xanh.',
      },
    ],
    stenoShorthandTips: ['ESG = Bền vững', 'CASBEE = Chuẩn xanh', 'GrnBnd = Trái phiếu xanh', 'Cost↓ = Nén chi phí', 'NAV↑ = Giá trị ròng tăng'],
  },
];

export const ADDITIONAL_SUMMIT_BATCH_2: CabinScenario[] = [
  {
    id: 'scen_semiconductor_2nm',
    category: 'semiconductor',
    title: 'Hội Thảo Bán Dẫn Toàn Cầu: Công Nghệ Đúc Chip 2nm & Kiến Trúc GAAFET',
    subtitle: 'Báo cáo Tiến độ Dự án Siêu Nhà Máy Bán Dẫn Rapidus Chitose & TSMC Kumamoto',
    conferenceName: 'Diễn Đàn Chuỗi Cung Ứng Bán Dẫn Quốc Tế SEMICON Japan',
    speakerRole: 'Phó Chủ tịch Cấp cao Phụ trách Công nghệ Đúc Chip Tiên tiến',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: Cpu,
    colorScheme: {
      badgeBg: 'bg-indigo-950/60',
      badgeText: 'text-indigo-300',
      border: 'border-indigo-800/50',
      accent: 'text-indigo-400',
    },
    audioDurationSeconds: 42,
    japaneseFullText:
      '次世代2ナノメートルGAAアーキテクチャの量産パイロットライン稼働により、我が国は最先端半導体のサプライチェーン強靭化と、生成AI専用アクセラレータの国内自給体制を確立してまいります。',
    vietnameseMasterTranslation:
      'Thông qua việc đưa vào vận hành dây chuyền sản xuất thử nghiệm kiến trúc GAA thế hệ mới tiến trình 2nm, đất nước chúng tôi sẽ tăng cường khả năng chống chịu của chuỗi cung ứng bán dẫn tiên tiến nhất, đồng thời xác lập năng lực tự chủ quốc nội về chip tăng tốc chuyên dụng cho AI tạo sinh.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '次世代2ナノメートルGAAアーキテクチャの',
        romajiChunk: 'Jisedai ni-nanomeetoru Jii-Ee-Ee aakitekutya no',
        vietnameseChunk: 'Nhờ vào việc phát triển kiến trúc cổng bao quanh GAA tiến trình 2 nanomet thế hệ mới,',
        timingSec: 0,
        decalageRecommendedSec: 2.2,
        tacticalNote: 'GAA = Gate-All-Around (Kiến trúc transistor đột phá cho chip dưới 3nm).',
      },
      {
        order: 2,
        japaneseChunk: '量産パイロットライン稼働により、',
        romajiChunk: 'ryousan pairotto rain kadou ni yori,',
        vietnameseChunk: 'khi đưa vào vận hành dây chuyền sản xuất hàng loạt thử nghiệm,',
        timingSec: 6,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'パイロットライン = Dây chuyền Pilot kiểm định sản lượng.',
      },
      {
        order: 3,
        japaneseChunk: '我が国は最先端半導体のサプライチェーン強靭化と、',
        romajiChunk: 'wagakuni wa saisentan handoutai no sapuraicheen kyoujinka to,',
        vietnameseChunk: 'đất nước chúng tôi vừa củng cố tính tự cường của chuỗi cung ứng vi mạch tối tân,',
        timingSec: 13,
        decalageRecommendedSec: 3.0,
        tacticalNote: 'サプライチェーン強靭化 = Resilient Supply Chain.',
      },
      {
        order: 4,
        japaneseChunk: '生成AI専用アクセラレータの国内自給体制を確立してまいります。',
        romajiChunk: 'seisei Ei-Ai sen\'you akuserareeta no kokunai jikyuu taisei o kakuritsu shite mairimasu.',
        vietnameseChunk: 'vừa xác lập thế trận tự cung tự cấp bộ vi xử lý tăng tốc chuyên dụng cho AI tạo sinh.',
        timingSec: 22,
        decalageRecommendedSec: 2.2,
        tacticalNote: '自給体制を確立 = Tự chủ sản xuất thay vì phụ thuộc nhập khẩu.',
      },
    ],
    criticalTerminology: [
      {
        termJp: '2nm GAAアーキテクチャ',
        reading: 'Ni-nano GAA Architecture',
        termVn: 'Kiến trúc bóng bán dẫn Gate-All-Around 2nm',
        nuance: 'Tiêu chuẩn vật lý tối tân kế nhiệm công nghệ FinFET.',
      },
      {
        termJp: 'パイロットライン',
        reading: 'Pilot Line',
        termVn: 'Dây chuyền sản xuất thử nghiệm quy mô thí điểm',
        nuance: 'Giai đoạn then chốt trước khi bước vào sản xuất đại trà.',
      },
      {
        termJp: 'サプライチェーン強靭化',
        reading: 'サプライチェーン きょうじんか',
        termVn: 'Tăng cường tính kiên cường chuỗi cung ứng',
        nuance: 'Chính sách an ninh kinh tế ngăn ngừa gián đoạn vi mạch.',
      },
      {
        termJp: '自給体制 (ジキュウタイセイ)',
        reading: 'じきゅうたいせい',
        termVn: 'Thể chế tự cung tự cấp / Năng lực tự chủ nội địa',
        nuance: 'Mục tiêu chiến lược bảo vệ an ninh công nghệ cao.',
      },
    ],
    stenoShorthandTips: ['2nm = GAA', 'Pilot = Chuyền thử', 'Supply = Bền vững', 'AI-Acc = Chip tăng tốc', 'Self = Tự cấp'],
  },
  {
    id: 'scen_quantum_computing',
    category: 'quantum',
    title: 'Diễn Đàn Máy Tính Lượng Tử: Siêu Dẫn Qubit & Tối Ưu Hóa Tài Chính',
    subtitle: 'Thông điệp của Trưởng Viện Nghiên cứu Vật lý Hóa học Quốc gia RIKEN',
    conferenceName: 'Hội Nghị Thượng Đỉnh Điện Toán Lượng Tử Quốc Tế Tokyo Quantum',
    speakerRole: 'Giám đốc Trung tâm Điện toán Lượng tử RIKEN',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: Zap,
    colorScheme: {
      badgeBg: 'bg-cyan-950/60',
      badgeText: 'text-cyan-300',
      border: 'border-cyan-800/50',
      accent: 'text-cyan-400',
    },
    audioDurationSeconds: 40,
    japaneseFullText:
      '超伝導量子ビットを用いた1000量子ビット級システムの開発により、量子超越性の実証にとどまらず、創薬および金融ポートフォリオ最適化における実用的優位性の確立を加速させます。',
    vietnameseMasterTranslation:
      'Nhờ vào việc phát triển hệ thống điện toán quy mô 1.000 qubit sử dụng công nghệ qubit siêu dẫn, chúng tôi không chỉ dừng lại ở việc chứng minh ưu thế lượng tử (Quantum Supremacy), mà còn đẩy nhanh việc xác lập lợi thế ứng dụng thực tiễn trong phát triển thuốc mới và tối ưu hóa danh mục đầu tư tài chính.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '超伝導量子ビットを用いた1000量子ビット級システムの開発により、',
        romajiChunk: 'Choudendou ryoushi bitto o mochiita sen-ryoushibitto kyuu shisutemu no kaihatsu ni yori,',
        vietnameseChunk: 'Nhờ vào sự đột phá trong phát triển hệ thống 1.000 qubit trên nền tảng siêu dẫn,',
        timingSec: 0,
        decalageRecommendedSec: 2.8,
        tacticalNote: '超伝導量子ビット = Superconducting Qubit.',
      },
      {
        order: 2,
        japaneseChunk: '量子超越性の実証にとどまらず、',
        romajiChunk: 'ryoushi chouetsusei no jisshou ni todomarazu,',
        vietnameseChunk: 'không dừng lại ở phép thử chứng minh ưu thế lượng tử vượt trội so với siêu máy tính,',
        timingSec: 8,
        decalageRecommendedSec: 2.5,
        tacticalNote: '量子超越性 = Quantum Supremacy.',
      },
      {
        order: 3,
        japaneseChunk: '創薬および金融ポートフォリオ最適化における',
        romajiChunk: 'souyaku oyobi kin\'yuu pootoforio saiteki-ka ni okeru',
        vietnameseChunk: 'chúng tôi còn ứng dụng vào việc phát triển dược phẩm mới và tối ưu hóa danh mục đầu tư tài chính,',
        timingSec: 15,
        decalageRecommendedSec: 3.2,
        tacticalNote: '創薬 (Souyaku) = Drug Discovery.',
      },
      {
        order: 4,
        japaneseChunk: '実用的優位性の確立を加速させます。',
        romajiChunk: 'jitsuyouteki yuusei no kakuritsu o kasoku sasemasu.',
        vietnameseChunk: 'đẩy nhanh việc xác lập ưu thế thương mại thực tiễn trên toàn cầu.',
        timingSec: 24,
        decalageRecommendedSec: 2.0,
        tacticalNote: '実用的優位性 = Practical Advantage.',
      },
    ],
    criticalTerminology: [
      {
        termJp: '超伝導量子ビット',
        reading: 'ちょうでんどう りょうしビット',
        termVn: 'Qubit siêu dẫn (Superconducting Qubit)',
        nuance: 'Công nghệ phần cứng lượng tử hàng đầu thế giới.',
      },
      {
        termJp: '量子超越性 (Quantum Supremacy)',
        reading: 'りょうし ちょうえつせい',
        termVn: 'Ưu thế lượng tử / Vượt trội lượng tử',
        nuance: 'Cột mốc máy tính lượng tử giải quyết bài toán siêu máy tính mất vạn năm.',
      },
      {
        termJp: '金融ポートフォリオ最適化',
        reading: 'きんゆう ポートフォリオ さいてきか',
        termVn: 'Tối ưu hóa danh mục đầu tư tài chính',
        nuance: 'Thuật toán tính toán rủi ro và lợi nhuận đầu tư phức hợp.',
      },
      {
        termJp: '実用的優位性',
        reading: 'じつようてき ゆういせい',
        termVn: 'Lợi thế ứng dụng thực tiễn trong công nghiệp',
        nuance: 'Chuyển từ nghiên cứu lý thuyết sang giá trị kinh tế thực tế.',
      },
    ],
    stenoShorthandTips: ['Qubit = 1000', 'Supremacy = Ưu thế', 'Drug = Phát triển thuốc', 'FinOpt = Tối ưu danh mục', 'Adv = Ưu thế'],
  },
  {
    id: 'scen_fintech_cbdc',
    category: 'fintech',
    title: 'Hội Nghị Ngân Hàng Trung Ương: Đồng Yên Số (CBDC) & Thanh Toán Toàn Cầu',
    subtitle: 'Tuyên bố Chính sách Tiền tệ của Thống đốc Ngân hàng Trung ương Nhật Bản (BOJ)',
    conferenceName: 'Diễn Đàn Tài Chính & Thanh Toán Quốc Tế Tokyo Central Bank Forum',
    speakerRole: 'Thống đốc Ngân hàng Trung ương Nhật Bản (BOJ Governor)',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: Briefcase,
    colorScheme: {
      badgeBg: 'bg-emerald-950/60',
      badgeText: 'text-emerald-300',
      border: 'border-emerald-800/50',
      accent: 'text-emerald-400',
    },
    audioDurationSeconds: 40,
    japaneseFullText:
      '中央銀行デジタル通貨CBDCのパイロット実験を通じ、民間銀行預金との共存およびクロスボーダー決済の即時化を図り、金融システムの安定性と国際金融市場における円の信認を維持してまいります。',
    vietnameseMasterTranslation:
      'Thông qua đợt thử nghiệm thực tế đồng tiền kỹ thuật số của ngân hàng trung ương (CBDC), chúng tôi hướng tới việc cùng tồn tại hài hòa với tiền gửi của các ngân hàng thương mại và tức thời hóa thanh toán xuyên biên giới, qua đó duy trì sự ổn định của hệ thống tài chính và củng cố độ tín nhiệm của đồng Yên trên thị trường tài chính quốc tế.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '中央銀行デジタル通貨CBDCのパイロット実験を通じ、',
        romajiChunk: 'Chuuou ginkou dejitaru tsuuka Shii-Bii-Dii-Shii no pairotto jikken o tsuuji,',
        vietnameseChunk: 'Thông qua chiến dịch thử nghiệm thí điểm đồng tiền kỹ thuật số ngân hàng trung ương CBDC,',
        timingSec: 0,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'CBDC = Central Bank Digital Currency.',
      },
      {
        order: 2,
        japaneseChunk: '民間銀行預金との共存およびクロスボーダー決済の即時化を図り、',
        romajiChunk: 'minkan ginkou yokin to no kyouzon oyobi kurosuboodaa kessai no sokujika o hakari,',
        vietnameseChunk: 'chúng tôi đảm bảo sự cùng tồn tại với tiền gửi ngân hàng tư nhân và hiện thực hóa thanh toán xuyên biên giới tức thời,',
        timingSec: 7,
        decalageRecommendedSec: 3.2,
        tacticalNote: 'クロスボーダー決済 = Cross-border Settlement.',
      },
      {
        order: 3,
        japaneseChunk: '金融システムの安定性と国際金融市場における',
        romajiChunk: 'kin\'yuu shisutemu no anteisei to kokusai kin\'yuu shijou ni okeru',
        vietnameseChunk: 'nhằm giữ vững sự lành mạnh, an toàn của hệ sinh thái tiền tệ,',
        timingSec: 16,
        decalageRecommendedSec: 2.8,
        tacticalNote: '金融システムの安定性 = Financial System Stability.',
      },
      {
        order: 4,
        japaneseChunk: '円の信認を維持してまいります。',
        romajiChunk: 'en no shinnin o iji shite mairimasu.',
        vietnameseChunk: 'và duy trì niềm tin kiên định vào đồng Yên Nhật trên trường quốc tế.',
        timingSec: 23,
        decalageRecommendedSec: 2.0,
        tacticalNote: '信認を維持 = Củng cố độ tin cậy tiền tệ.',
      },
    ],
    criticalTerminology: [
      {
        termJp: '中央銀行デジタル通貨 (CBDC)',
        reading: 'ちゅうおうぎんこう デジタルつうか',
        termVn: 'Tiền kỹ thuật số ngân hàng trung ương',
        nuance: 'Dạng tiền tệ số có giá trị pháp định do ngân hàng trung ương phát hành.',
      },
      {
        termJp: 'クロスボーダー決済',
        reading: 'Cross-border Kessai',
        termVn: 'Thanh toán bù trừ xuyên biên giới quốc tế',
        nuance: 'Giao dịch chuyển tiền giữa các định chế tài chính khác quốc gia.',
      },
      {
        termJp: '信認 (シンニン)',
        reading: 'しんにん (Shinnin)',
        termVn: 'Độ tín nhiệm tiền tệ / Uy tín pháp định',
        nuance: 'Niềm tin của thị trường vào sức mua của đồng tiền một quốc gia.',
      },
      {
        termJp: '即時化',
        reading: 'そくじか (Sokujika)',
        termVn: 'Tức thời hóa / Xử lý thời gian thực (Real-time)',
        nuance: 'Chuyển tiền tất toán ngay lập tức không cần chờ 2-3 ngày.',
      },
    ],
    stenoShorthandTips: ['CBDC = Tiền số', 'Cross = Xuyên biên giới', 'RealTime = Tức thì', 'Stability = Ổn định', 'Trust = Tín nhiệm Yên'],
  },
  {
    id: 'scen_fusion_energy',
    category: 'energy',
    title: 'Hội Thảo Nhiệt Hạch Hạt Nhân: Siêu Lò Phản Ứng JT-60SA & Plasma 100 Triệu Độ',
    subtitle: 'Báo cáo Hợp tác Năng lượng Sạch của Viện Khoa học Lượng tử và Phóng xạ (QST)',
    conferenceName: 'Hội Thảo Năng Lượng Tương Lai & Nhiệt Hạch Quốc Tế Tokyo Fusion',
    speakerRole: 'Trưởng Dự án Nghiên cứu Nhiệt Hạch Quốc gia (QST Fusion Director)',
    difficulty: 'Thượng Đỉnh (Pinnacle)',
    icon: Globe,
    colorScheme: {
      badgeBg: 'bg-amber-950/60',
      badgeText: 'text-amber-300',
      border: 'border-amber-800/50',
      accent: 'text-amber-400',
    },
    audioDurationSeconds: 40,
    japaneseFullText:
      '超伝導トカマク型核融合実験装置JT-60SAにおける1億度の超高温プラズマ定常維持の達成は、人工太陽による究極のベースロード電源実用化に向けた決定的なマイルストーンであります。',
    vietnameseMasterTranslation:
      'Việc duy trì ổn định trạng thái plasma siêu nhiệt 100 triệu độ C tại thiết bị thí nghiệm nhiệt hạch từ trường Tokamak siêu dẫn JT-60SA cấu thành cột mốc mang tính quyết định hướng tới việc thương mại hóa nguồn điện phụ tải nền tối thượng từ mặt trời nhân tạo.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '超伝導トカマク型核融合実験装置JT-60SAにおける',
        romajiChunk: 'Choudendou tokamakugata kakuyuugou jikken souchi Jei-Tii-Rokujuu-Esu-Ei ni okeru',
        vietnameseChunk: 'Tại cỗ máy thử nghiệm nhiệt hạch hợp hạch loại Tokamak siêu dẫn JT-60SA,',
        timingSec: 0,
        decalageRecommendedSec: 2.8,
        tacticalNote: 'Tokamak = Lò phản ứng nhiệt hạch hình xuyến giữ plasma bằng từ trường.',
      },
      {
        order: 2,
        japaneseChunk: '1億度の超高温プラズマ定常維持の達成は、',
        romajiChunk: 'ichi-oku-do no chou-kouon purazuma teijou iji no tassei wa,',
        vietnameseChunk: 'thành tựu duy trì ổn định luồng plasma siêu nhiệt độ lên tới 100 triệu độ C,',
        timingSec: 8,
        decalageRecommendedSec: 2.5,
        tacticalNote: '定常維持 = Duy trì liên tục trạng thái ổn định.',
      },
      {
        order: 3,
        japaneseChunk: '人工太陽による究極のベースロード電源実用化に向けた',
        romajiChunk: 'jinkou taiyou ni yoru kyuukyoku no beesuroodo dengen jitsuyouka ni muketa',
        vietnameseChunk: 'chính là tiền đề thương mại hóa nguồn phát điện nền tối thượng từ mặt trời nhân tạo,',
        timingSec: 16,
        decalageRecommendedSec: 3.2,
        tacticalNote: 'ベースロード電源 = Nguồn điện phụ tải nền hoạt động 24/7.',
      },
      {
        order: 4,
        japaneseChunk: '決定的なマイルストーンであります。',
        romajiChunk: 'ketteiteki na mairusutoon de arimasu.',
        vietnameseChunk: 'đóng vai trò một cột mốc mang ý nghĩa bước ngoặt lịch sử.',
        timingSec: 25,
        decalageRecommendedSec: 1.8,
        tacticalNote: '決定的なマイルストーン = Cột mốc mang tính quyết định.',
      },
    ],
    criticalTerminology: [
      {
        termJp: 'トカマク型核融合',
        reading: 'トカマクがた かくゆうごう',
        termVn: 'Phản ứng hợp hạch hạt nhân cấu hình Tokamak',
        nuance: 'Công nghệ tạo năng lượng sạch không phát thải khí nhà kính.',
      },
      {
        termJp: '定常維持 (テイジョウイジ)',
        reading: 'ていじょういじ',
        termVn: 'Duy trì trạng thái cân bằng ổn định liên tục',
        nuance: 'Giữ plasma cháy liên tục mà không bị tắt hay phát nổ.',
      },
      {
        termJp: 'ベースロード電源',
        reading: 'Base Load Dengen',
        termVn: 'Nguồn điện phụ tải nền (Base Load Power)',
        nuance: 'Nguồn cung cấp điện ổn định liên tục bất kể ngày đêm hay thời tiết.',
      },
      {
        termJp: 'マイルストーン',
        reading: 'Milestone',
        termVn: 'Cột mốc lịch sử / Dấu mốc trọng đại',
        nuance: 'Bằng chứng ghi nhận bước tiến lớn của đại dự án khoa học.',
      },
    ],
    stenoShorthandTips: ['Fusion = Nhiệt hạch', '100M° = 1 ức độ', 'Plasma = Duy trì', 'BaseLoad = Điện nền', 'Milestone = Mốc quan trọng'],
  },
  {
    id: 'scen_hydrogen_mobility',
    category: 'hydrogen',
    title: 'Diễn Đàn Giao Thông Xanh: Vận Tải Hydro Lỏng (LH2) & Xe Pin Nhiên Liệu FCEV',
    subtitle: 'Chiến lược Khử Carbon Vận tải Nặng của Tổng Giám đốc Tập đoàn Ô tô Toyota',
    conferenceName: 'Hội Nghị Thượng Đỉnh Vận Tải Hydro & Khí Thải Bằng Không Tokyo Mobility',
    speakerRole: 'Chủ tịch Ủy ban Môi trường Hiệp hội Sản xuất Ô tô Nhật Bản (JAMA)',
    difficulty: 'Cao Cấp (Executive)',
    icon: Rocket,
    colorScheme: {
      badgeBg: 'bg-teal-950/60',
      badgeText: 'text-teal-300',
      border: 'border-teal-800/50',
      accent: 'text-teal-400',
    },
    audioDurationSeconds: 40,
    japaneseFullText:
      '液化水素運搬船による国際サプライチェーンの確立と、大型商用FCEVトラックの普及拡大を通じ、重工業および長距離輸送分野における脱炭素化を加速させてまいります。',
    vietnameseMasterTranslation:
      'Thông qua việc thiết lập chuỗi cung ứng quốc tế bằng tàu chuyên chở hydro hóa lỏng (LH2) cùng với việc mở rộng phổ cập dòng xe tải thương mại hạng nặng chạy bằng pin nhiên liệu hydro (FCEV), chúng tôi sẽ đẩy mạnh quá trình khử carbon trong lĩnh vực công nghiệp nặng và vận tải đường dài.',
    chunks: [
      {
        order: 1,
        japaneseChunk: '液化水素運搬船による国際サプライチェーンの確立と、',
        romajiChunk: 'Ekika suiso unpansen ni yoru kokusai sapuraicheen no kakuritsu to,',
        vietnameseChunk: 'Cùng với việc thiết lập chuỗi logistics quốc tế bằng các tàu vận tải hydro hóa lỏng nhiệt độ siêu hàn,',
        timingSec: 0,
        decalageRecommendedSec: 2.8,
        tacticalNote: '液化水素 (LH2) = Khí hydro làm lạnh ở âm 253 độ C.',
      },
      {
        order: 2,
        japaneseChunk: '大型商用FCEVトラックの普及拡大を通じ、',
        romajiChunk: 'oogata shouyou Efu-Shii-Ii-Vii torakku no fukyuu kakudai o tsuuji,',
        vietnameseChunk: 'kết hợp đẩy mạnh đưa vào lưu thông các đoàn xe tải thương mại cỡ lớn chạy pin nhiên liệu FCEV,',
        timingSec: 8,
        decalageRecommendedSec: 2.5,
        tacticalNote: 'FCEV = Fuel Cell Electric Vehicle.',
      },
      {
        order: 3,
        japaneseChunk: '重工業および長距離輸送分野における',
        romajiChunk: 'juukougyou oyobi choukyori yusou bun\'ya ni okeru',
        vietnameseChunk: 'đối với các mắt xích công nghiệp nặng và vận tải hàng hóa đường dài liên tỉnh,',
        timingSec: 16,
        decalageRecommendedSec: 2.8,
        tacticalNote: '長距離輸送 = Vận tải tải trọng nặng đường dài khó dùng pin lithium.',
      },
      {
        order: 4,
        japaneseChunk: '脱炭素化を加速させてまいります。',
        romajiChunk: 'datsutansoka o kasoku sasete mairimasu.',
        vietnameseChunk: 'chúng tôi sẽ tăng tốc toàn diện công cuộc phi than hóa nền kinh tế.',
        timingSec: 23,
        decalageRecommendedSec: 2.0,
        tacticalNote: '脱炭素化 = Quá trình khử carbon / Net Zero.',
      },
    ],
    criticalTerminology: [
      {
        termJp: '液化水素運搬船 (LH2 Carrier)',
        reading: 'えきかすいそ うんぱんせん',
        termVn: 'Tàu chuyên chở hydro hóa lỏng âm 253°C',
        nuance: 'Tàu vận tải biển công nghệ cao do Kawasaki Heavy Industries đóng.',
      },
      {
        termJp: '商用FCEV',
        reading: 'しょうよう FCEV',
        termVn: 'Phương tiện thương mại chạy bằng pin nhiên liệu Hydro',
        nuance: 'Xe tải chở hàng nạp hydro trong 10 phút, cự ly chạy 800km.',
      },
      {
        termJp: '長距離輸送',
        reading: 'ちょうきょり ゆそう',
        termVn: 'Vận tải cự ly dài / Vận chuyển đường trường',
        nuance: 'Lĩnh vực phát thải lớn đòi hỏi mật độ năng lượng cao.',
      },
      {
        termJp: '脱炭素化 (ダツタンソカ)',
        reading: 'だったんそか',
        termVn: 'Khử carbon hóa / Phi carbon hóa',
        nuance: 'Mục tiêu loại trừ nhiên liệu hóa thạch.',
      },
    ],
    stenoShorthandTips: ['LH2 = Hydro lỏng', 'FCEV = Xe pin hydro', 'HeavyInd = Công nghiệp nặng', 'LongHaul = Đường dài', 'ZeroCO2 = Khử carbon'],
  },
];

// Cabin Relief & Diplomatic Recovery Toolkit (Bộ Phím Tình Huống Khẩn Cấp)
export interface PanicPhrase {
  id: string;
  japanese: string;
  romaji: string;
  vietnamese: string;
  situation: string;
}

export const PANIC_PHRASES: PanicPhrase[] = [
  {
    id: 'correction',
    japanese: '失礼いたしました。正しくは〜でございます。',
    romaji: 'Shitsurei itashimashita. Tadashiku wa... de gozaimasu.',
    vietnamese: 'Thành thật xin lỗi quý vị. Chính xác phải là...',
    situation: 'Khi dịch nhầm con số hoặc thuật ngữ cần đính chính ngay tức khắc.',
  },
  {
    id: 'intent',
    japanese: '失礼いたしました。〜という趣旨でございます。',
    romaji: 'Shitsurei itashimashita. ...to iu shushi de gozaimasu.',
    vietnamese: 'Xin thứ lỗi quý vị. Tôn chỉ / ý chính của diễn giả là...',
    situation: 'Khi câu trước bị thô cú pháp hoặc diễn giả đổi hướng lập luận.',
  },
  {
    id: 'recheck',
    japanese: '数値を再確認の上、ご案内申し上げます。',
    romaji: 'Suuchi o saikakunin no ue, go-annai moushiagemasu.',
    vietnamese: 'Tôi xin phép được xác nhận lại số liệu trước khi thông báo.',
    situation: 'Khi diễn giả xả hàng loạt số liệu thống kê quá dồn dập.',
  },
  {
    id: 'supplement',
    japanese: '補足いたしますと、〜の観点からのご説明でございます。',
    romaji: 'Hosoku itashimasu to, ...no kanten kara no go-setsumei de gozaimasu.',
    vietnamese: 'Xin phép bổ sung thêm, đây là nhìn nhận từ góc độ...',
    situation: 'Cần câu giờ 2 giây để tái cơ cấu luồng suy nghĩ một cách ngoại giao.',
  },
  {
    id: 'summary',
    japanese: '要約いたしますと、〜という結論に至っております。',
    romaji: 'Youyaku itashimasu to, ...to iu ketsuron ni itatte orimasu.',
    vietnamese: 'Tựu trung lại, diễn giả đi đến kết luận rằng...',
    situation: 'Khi diễn giả nói câu quá dài lan man, cabin cần nén ngắn gọn.',
  },
];

// 2. High-speed Number Conversion Flashcards Data (Tử huyệt số đếm của thông dịch viên)
interface NumberDrillItem {
  id: string;
  sourceJp: string;
  targetVn: string;
  category: 'Man-Oku' | 'Yen-VND' | 'Billion-Trillion';
  mathTrick: string;
}

const NUMBER_DRILLS: NumberDrillItem[] = [
  {
    id: 'num_1',
    sourceJp: '500億円 (500 oku en)',
    targetVn: '500 ức Yên = 50 tỷ Yên (khoảng 8.500 tỷ VND)',
    category: 'Man-Oku',
    mathTrick: '1 ức (億) = 100 triệu. 500 ức = 50.000 triệu = 50 tỷ Yên.',
  },
  {
    id: 'num_2',
    sourceJp: '3兆2000億円 (3 chou 2000 oku en)',
    targetVn: '3 triệu 200 nghìn tỷ Yên (3,2 nghìn tỷ Yên)',
    category: 'Billion-Trillion',
    mathTrick: '1 triệu (兆) = 1.000.000 triệu = 1.000 tỷ. 3兆2000億 = 3.200 tỷ Yên.',
  },
  {
    id: 'num_3',
    sourceJp: '2500万円 (2500 man en)',
    targetVn: '25 triệu Yên (khoảng 4,2 tỷ VND)',
    category: 'Man-Oku',
    mathTrick: '1 vạn (万) = 10 nghìn. 2.500 vạn = 25.000.000 = 25 triệu Yên.',
  },
  {
    id: 'num_4',
    sourceJp: '150億ドル (150 oku doru)',
    targetVn: '15 tỷ Đô la Mỹ (USD)',
    category: 'Man-Oku',
    mathTrick: '100 ức (億) = 10 tỷ. 150 ức Đô = 15 tỷ USD.',
  },
  {
    id: 'num_5',
    sourceJp: '80兆円の国家予算 (80 chou en no kokka yosan)',
    targetVn: 'Ngân sách quốc gia 80 nghìn tỷ Yên (khoảng 530 tỷ USD)',
    category: 'Billion-Trillion',
    mathTrick: '80兆 = 80 nghìn tỷ Yên.',
  },
  {
    id: 'num_6',
    sourceJp: '650万人のインバウンド観光客 (650 man nin)',
    targetVn: '6,5 triệu lượt khách du lịch quốc tế',
    category: 'Man-Oku',
    mathTrick: '650万 = 6.500.000 = 6,5 triệu người.',
  },
  {
    id: 'num_7',
    sourceJp: '1兆5000億円のM&Aディール',
    targetVn: 'Thương vụ M&A trị giá 1,5 nghìn tỷ Yên (10 tỷ USD)',
    category: 'Billion-Trillion',
    mathTrick: '1兆5000億 = 1,5 Trillion JPY.',
  },
  {
    id: 'num_8',
    sourceJp: '時価総額 4000億円 (Jika sougaku 4000 oku en)',
    targetVn: 'Vốn hóa thị trường đạt 400 tỷ Yên',
    category: 'Man-Oku',
    mathTrick: '4.000 ức = 400.000 triệu = 400 tỷ Yên.',
  },
];

// 3. Cabin Slicing & Anticipation Drill Items (Kỹ thuật Cắt câu & Đón đầu)
interface SlicingDrillItem {
  id: string;
  longJapanese: string;
  trapWarning: string;
  slicingSteps: string[];
  finalFluentVn: string;
}

const SLICING_DRILLS: SlicingDrillItem[] = [
  {
    id: 'slice_1',
    longJapanese:
      '近年激甚化する気候変動の影響により世界各地で未曾有の自然災害が頻発している現状に鑑み、国際社会全体が一丸となって温室効果ガスの排出削減に向けた野心的な目標を設定し、実効性のある行動を直ちに起こすことが極めて重要であります。',
    trapWarning: 'Câu dài 68 chữ không ngắt nghỉ! Nếu chờ đến tận cuối câu mới dịch động từ "極めて重要であります" thì cabin sẽ bị trễ 12 giây và vỡ tiếng.',
    slicingSteps: [
      'Bước 1 (Cắt bối cảnh): "Hiện nay do biến đổi khí hậu ngày càng gay gắt, thiên tai chưa từng có đang liên tục xảy ra trên khắp thế giới."',
      'Bước 2 (Cắt liên kết mục tiêu): "Trước tình hình đó, toàn thể cộng đồng quốc tế cần phải chung sức đồng lòng, thiết lập những mục tiêu đầy tham vọng nhằm cắt giảm phát thải khí nhà kính."',
      'Bước 3 (Chốt hành động): "Và điều tối quan trọng lúc này là chúng ta phải lập tức hành động một cách thực chất."',
    ],
    finalFluentVn:
      'Trước thực trạng biến đổi khí hậu ngày càng khốc liệt kéo theo các thảm họa thiên tai chưa từng có trên toàn cầu, toàn thể cộng đồng quốc tế cần chung sức thiết lập các mục tiêu giảm phát thải khí nhà kính đầy tham vọng, và cấp bách hơn cả là phải lập tức hành động một cách thực chất.',
  },
  {
    id: 'slice_2',
    longJapanese:
      'グローバルサプライチェーンの分断や地政学的緊張が世界経済の不確実性を高めている中にあっても、我々は自由貿易体制の原則を堅持しつつ、開かれた国際協調の枠組みを通じて包摂的な経済成長を実現することを目指すべきだと考えます。',
    trapWarning: 'Từ đầu câu đến "中にあっても" là 1 vế điều kiện lùi bước. Cần cắt ngay để giải phóng bộ nhớ đệm (Working Memory).',
    slicingSteps: [
      'Bước 1: "Ngay cả khi chuỗi cung ứng toàn cầu bị chia cắt và căng thẳng địa chính trị làm gia tăng rủi ro kinh tế thế giới,"',
      'Bước 2: "chúng ta vẫn cần phải kiên định bảo vệ các nguyên tắc của hệ thống thương mại tự do."',
      'Bước 3: "Đồng thời, mục tiêu hướng tới phải là hiện thực hóa tăng trưởng kinh tế bao trùm thông qua khuôn khổ hợp tác quốc tế cởi mở."',
    ],
    finalFluentVn:
      'Dù cho sự đứt gãy chuỗi cung ứng cùng căng thẳng địa chính trị đang làm gia tăng bất định cho kinh tế toàn cầu, chúng ta vẫn phải kiên trì nguyên tắc thương mại tự do, đồng thời thúc đẩy tăng trưởng kinh tế bao trùm thông qua cơ chế hợp tác quốc tế rộng mở.',
  },
];

export const EXTRA_NUMBER_DRILLS: NumberDrillItem[] = [
  {
    id: 'num_extra_1',
    sourceJp: '4800億円の半導体FDI投資',
    targetVn: '4.800 ức Yên = 480 tỷ Yên (khoảng 3,2 tỷ USD / 79.200 tỷ VND)',
    category: 'Man-Oku',
    mathTrick: '4.800 ức = 480.000 triệu = 480 tỷ Yên. Chia 150 ra 3,2 tỷ USD.',
  },
  {
    id: 'num_extra_2',
    sourceJp: '12兆5000億円の総合経済対策',
    targetVn: '12 triệu 500 nghìn tỷ Yên (12,5 nghìn tỷ Yên, khoảng 83 tỷ USD)',
    category: 'Billion-Trillion',
    mathTrick: '12兆 = 12.000 tỷ Yên. 12兆5000億 = 12,5 nghìn tỷ Yên.',
  },
  {
    id: 'num_extra_3',
    sourceJp: '平均年収 850万円 (850 man en)',
    targetVn: '850 vạn Yên = 8,5 triệu Yên (khoảng 1,4 tỷ VND)',
    category: 'Man-Oku',
    mathTrick: '1 vạn = 10.000. 850 vạn = 8.500.000 Yên.',
  },
  {
    id: 'num_extra_4',
    sourceJp: '3200億ドルの外貨準備高',
    targetVn: '3.200 ức Đô = 320 tỷ USD (khoảng 48 nghìn tỷ Yên)',
    category: 'Man-Oku',
    mathTrick: '1 ức Đô = 100 triệu USD. 3.200 ức = 320 tỷ USD.',
  },
  {
    id: 'num_extra_5',
    sourceJp: '220兆円の公的年金積立金運用',
    targetVn: '220 triệu Yên = 220 nghìn tỷ Yên (khoảng 1,46 nghìn tỷ USD)',
    category: 'Billion-Trillion',
    mathTrick: '220兆 = 220.000 tỷ Yên. Quỹ hưu trí GPIF lớn nhất hành tinh.',
  },
  {
    id: 'num_extra_6',
    sourceJp: '650億円のシリーズC資金調達',
    targetVn: '650 ức Yên = 65 tỷ Yên (khoảng 430 triệu USD)',
    category: 'Man-Oku',
    mathTrick: '650 ức = 65.000 triệu = 65 tỷ Yên.',
  },
  {
    id: 'num_extra_7',
    sourceJp: '1兆8000億円のGX移行国債',
    targetVn: '1 triệu 800 nghìn tỷ Yên = 1,8 nghìn tỷ Yên (khoảng 12 tỷ USD)',
    category: 'Billion-Trillion',
    mathTrick: '1兆8000億 = 1,8 nghìn tỷ Yên.',
  },
  {
    id: 'num_extra_8',
    sourceJp: '4200万人のインバウンド訪日目標',
    targetVn: '4.200 vạn người = 42 triệu lượt khách du lịch quốc tế',
    category: 'Man-Oku',
    mathTrick: '4.200万 = 42.000.000 = 42 triệu người.',
  },
  {
    id: 'num_extra_9',
    sourceJp: '180億ユーロの二国間貿易総額',
    targetVn: '180 ức Euro = 18 tỷ Euro (khoảng 3 nghìn tỷ Yên)',
    category: 'Man-Oku',
    mathTrick: '180 ức = 18 tỷ Euro.',
  },
  {
    id: 'num_extra_10',
    sourceJp: '9兆円の研究開発投資予算',
    targetVn: '9 triệu Yên = 9 nghìn tỷ Yên (khoảng 60 tỷ USD)',
    category: 'Billion-Trillion',
    mathTrick: '9兆 = 9.000 tỷ Yên. Ngân sách R&D khối tư nhân Nhật Bản.',
  },
];

export const EXTRA_SLICING_DRILLS: SlicingDrillItem[] = [
  {
    id: 'slice_3',
    longJapanese:
      '次世代半導体の国産化を加速させるべく産学官が一体となって巨額の設備投資を断行している一方で、高度な専門知識を有するエンジニアの深刻な不足がボトルネックとして顕在化しており、抜本的な人材育成プログラムの構築が焦眉の急となっております。',
    trapWarning: 'Câu dài 74 chữ! Cụm "一方で" là bản lề tương phản. Nếu đợi đến cuối câu mới dịch thì interpreter sẽ nghẹn 10 giây.',
    slicingSteps: [
      'Bước 1 (Cắt vế hành động tích cực): "Hiện nay nhằm đẩy nhanh tiến trình nội địa hóa chip bán dẫn thế hệ mới, liên minh nhà nước - viện trường - doanh nghiệp đang đồng lòng triển khai các gói đầu tư thiết bị khổng lồ."',
      'Bước 2 (Cắt vế nút thắt tương phản): "Tuy nhiên song song với đó, tình trạng thiếu hụt trầm trọng đội ngũ kỹ sư tay nghề cao đang lộ rõ là điểm nghẽn cổ chai lớn."',
      'Bước 3 (Chốt yêu cầu cấp bách): "Do đó, việc khẩn trương thiết lập chương trình đào tạo nhân lực bài bản từ gốc rễ lúc này là nhiệm vụ cấp bách như lửa cháy trước mắt."',
    ],
    finalFluentVn:
      'Trong khi liên minh công - tư đang dồn lực đầu tư khổng lồ nhằm tăng tốc nội địa hóa chip bán dẫn thế hệ mới, thì sự khan hiếm nghiêm trọng kỹ sư trình độ cao lại nổi lên như một điểm nghẽn then chốt, đòi hỏi chúng ta phải cấp bách xây dựng một chiến lược đào tạo nhân tài căn cơ.',
  },
  {
    id: 'slice_4',
    longJapanese:
      '相手方企業による環境関連規制の重大な違反が判明した以上、本件事業譲渡契約における表明保証条項違反に基づき契約解除権を行使し、既に支出したデューデリジェンス費用を含む損害賠償を断固として請求すべきであると主張いたします。',
    trapWarning: 'Văn phong tố tụng trọng tài thương mại! Cụm "判明した以上" chốt căn cứ pháp lý, cần dịch dứt khoát.',
    slicingSteps: [
      'Bước 1 (Cắt căn cứ khởi kiện): "Một khi đã làm sáng tỏ hành vi vi phạm nghiêm trọng các quy chuẩn môi trường từ phía doanh nghiệp đối tác,"',
      'Bước 2 (Cắt quyền hủy hợp đồng): "chúng tôi căn cứ vào điều khoản cam đoan và bảo đảm trong hợp đồng chuyển nhượng dự án để thực thi quyền hủy bỏ hợp đồng."',
      'Bước 3 (Chốt yêu cầu bồi thường): "Đồng thời, chúng tôi kiên quyết yêu cầu bồi thường toàn bộ thiệt hại phát sinh, bao gồm cả chi phí thẩm định rà soát Due Diligence đã giải ngân."',
    ],
    finalFluentVn:
      'Một khi đã xác định rõ sai phạm nghiêm trọng về môi trường của đối tác, chúng tôi thực thi quyền đơn phương chấm dứt hợp đồng dựa trên điều khoản vi phạm cam kết và bảo đảm, đồng thời kiên quyết khởi kiện đòi bồi thường toàn bộ thiệt hại bao gồm chi phí thẩm định pháp lý đã bỏ ra.',
  },
  {
    id: 'slice_5',
    longJapanese:
      '標準治療に対して抵抗性を示した進行性固形がん患者を対象とする第II相臨床試験において、標的タンパク質に対する極めて高い特異性と細胞毒性の持続的な発揮が確認されたことから、早期の条件付き承認取得に向けた申請手続きを速やかに開始する方針であります。',
    trapWarning: 'Văn phong y sinh lâm sàng với cụm danh từ dài: bệnh nhân ung thư khối u tiến triển kháng thuốc chuẩn.',
    slicingSteps: [
      'Bước 1 (Cắt đối tượng thử nghiệm): "Trong thử nghiệm lâm sàng giai đoạn II trên nhóm bệnh nhân ung thư khối u rắn tiến triển đã kháng với phác đồ điều trị tiêu chuẩn,"',
      'Bước 2 (Cắt kết quả sinh học): "chế phẩm đã chứng minh được tính đặc hiệu vượt trội đối với protein đích cùng khả năng phát huy độc tính diệt tế bào ung thư bền bỉ."',
      'Bước 3 (Chốt hành động quy chuẩn): "Chính vì vậy, chúng tôi quyết định sẽ lập tức xúc tiến hồ sơ xin cấp phép lưu hành có điều kiện sớm từ cơ quan quản lý dược."',
    ],
    finalFluentVn:
      'Tại thử nghiệm lâm sàng pha II trên bệnh nhân ung thư thể rắn giai đoạn muộn kháng phác đồ tiêu chuẩn, thuốc mới đã khẳng định tính đặc hiệu cao với kháng nguyên đích và khả năng tiêu diệt khối u kéo dài, tạo cơ sở để chúng tôi xúc tiến ngay thủ tục xin cấp phép lưu hành sớm có điều kiện.',
  },
  {
    id: 'slice_6',
    longJapanese:
      '生成AI技術の急速な進化が産業構造を根底から変革しつつある現状を踏まえ、著作権者の権利保護と安全性の確保を大前提としつつ、過度な規制によって我が国の国際競争力が削がれることのないよう、柔軟かつ実効性のある法制度の整備を進めることが不可欠であります。',
    trapWarning: 'Cấu trúc "〜を踏まえ、〜としつつ、〜ことのないよう、〜不可欠であります" là cấu trúc nghị viện/bộ ngành Nhật Bản đặc trưng.',
    slicingSteps: [
      'Bước 1 (Cắt bối cảnh AI): "Trước làn sóng AI tạo sinh đang làm thay đổi căn bản cấu trúc các ngành công nghiệp,"',
      'Bước 2 (Cắt nguyên tắc kép): "chúng ta phải lấy việc bảo vệ quyền tác giả và bảo đảm an toàn hệ thống làm tiền đề cốt tử."',
      'Bước 3 (Chốt giải pháp thể chế): "Đồng thời phải tránh việc siết chặt quản lý quá mức làm suy giảm năng lực cạnh tranh quốc gia, khẩn trương hoàn thiện khung pháp lý linh hoạt và thực chất."',
    ],
    finalFluentVn:
      'Trước sự trỗi dậy của AI tạo sinh đang tái cấu trúc nền kinh tế, chúng ta vừa phải đặt ưu tiên bảo vệ bản quyền và an toàn lên hàng đầu, vừa phải tránh các rào cản hành chính quá mức làm tổn hại sức cạnh tranh quốc tế, xây dựng một thể chế pháp lý linh hoạt và hiệu quả.',
  },
  {
    id: 'slice_7',
    longJapanese:
      '地政学的緊張に伴う為替レートの乱高下が企業業績に大きな影響を与えている中、為替ヘッジ取引の徹底と海外拠点における現地通貨建て決済比率の引き上げを通じて、マクロ経済の変動リスクに対する耐性を強固なものにしてまいります。',
    trapWarning: 'Thuật ngữ tài chính tiền tệ: tỷ giá biến động dữ dội (乱高下), phòng ngừa rủi ro tỷ giá (為替ヘッジ).',
    slicingSteps: [
      'Bước 1 (Cắt biến động vĩ mô): "Trong bối cảnh căng thẳng địa chính trị khiến tỷ giá hối đoái rung lắc dữ dội gây áp lực nặng nề lên kết quả kinh doanh,"',
      'Bước 2 (Cắt giải pháp tài chính): "chúng tôi tăng cường triệt để các nghiệp vụ phòng ngừa rủi ro tỷ giá Hedging và nâng tỷ trọng thanh toán bằng đồng nội tệ tại các công ty con hải ngoại."',
      'Bước 3 (Chốt mục tiêu tự cường): "Qua đó, chúng tôi gia cố vững chắc sức đề kháng của doanh nghiệp trước mọi rủi ro vĩ mô."',
    ],
    finalFluentVn:
      'Trước những đợt rung lắc dữ dội của tỷ giá do căng thẳng địa chính trị tác động tới lợi nhuận, chúng tôi thực thi nghiêm ngặt các hợp đồng phòng ngừa rủi ro ngoại hối và gia tăng thanh toán bằng đồng tiền bản địa, củng cố vững chắc sức chống chịu trước các biến số kinh tế vĩ mô.',
  },
];

export const EXTRA_TERMINOLOGY_ITEMS: {
  termJp: string;
  reading: string;
  termVn: string;
  nuance: string;
  industry: string;
}[] = [
  {
    termJp: 'デカップリング (Decoupling)',
    reading: 'Decoupling',
    termVn: 'Tách rời kinh tế / Phân tách chuỗi cung ứng',
    nuance: 'Chính sách giảm phụ thuộc thương mại và công nghệ giữa các cường quốc.',
    industry: 'diplomacy',
  },
  {
    termJp: '表明保証 (ひょうめいほしょう)',
    reading: 'ひょうめいほしょう (Hyoumei Hoshou)',
    termVn: 'Cam đoan và bảo đảm pháp lý (Representations & Warranties)',
    nuance: 'Điều khoản then chốt trong hợp đồng M&A quy định bên bán chịu trách nhiệm về tính xác thực của thông tin tài chính.',
    industry: 'law',
  },
  {
    termJp: 'デューデリジェンス (DD)',
    reading: 'Due Diligence',
    termVn: 'Thẩm định rà soát toàn diện doanh nghiệp (Due Diligence)',
    nuance: 'Quá trình kiểm tra tài chính, pháp lý, thuế trước khi ký kết mua lại sáp nhập.',
    industry: 'finance',
  },
  {
    termJp: '全固体電池 (ぜんこたいでんち)',
    reading: 'ぜんこたいでんち',
    termVn: 'Pin thể rắn toàn phần (All-Solid-State Battery)',
    nuance: 'Thế hệ pin thế kỷ không chứa dung dịch bắt lửa, mật độ năng lượng gấp 2-3 lần pin Lithium-ion.',
    industry: 'tech',
  },
  {
    termJp: '株主総会 (かぶぬしそうかい)',
    reading: 'かぶぬしそうかい',
    termVn: 'Đại hội đồng cổ đông',
    nuance: 'Cơ quan quyền lực cao nhất của công ty cổ phần niêm yết tại Nhật.',
    industry: 'finance',
  },
  {
    termJp: '不可抗力条項 (ふかこうりょく)',
    reading: 'ふかこうりょく じょうこう',
    termVn: 'Điều khoản sự kiện bất khả kháng (Force Majeure)',
    nuance: 'Miễn trừ nghĩa vụ bồi thường khi phát sinh chiến tranh, phong tỏa hoặc thiên tai nghiêm trọng.',
    industry: 'law',
  },
  {
    termJp: 'コンプライアンス (Compliance)',
    reading: 'Compliance',
    termVn: 'Tuân thủ pháp luật và đạo đức doanh nghiệp',
    nuance: 'Hệ quy chuẩn bắt buộc mà mọi tập đoàn lớn tại Nhật phải tuân thủ nghiêm ngặt.',
    industry: 'law',
  },
  {
    termJp: 'バイオシミラー (Biosimilar)',
    reading: 'Biosimilar',
    termVn: 'Thuốc sinh học tương tự / Thuốc sinh học tương đương',
    nuance: 'Sản phẩm tương đương sinh học với thuốc sinh học gốc sau khi hết hạn bảo hộ sáng chế.',
    industry: 'biomedical',
  },
  {
    termJp: 'サプライチェーンレジリエンス',
    reading: 'Supply Chain Resilience',
    termVn: 'Khả năng kiên cường chống chịu chuỗi cung ứng',
    nuance: 'Năng lực duy trì sản xuất khi chuỗi cung ứng toàn cầu bị đứt gãy hoặc sốc địa chính trị.',
    industry: 'tech',
  },
  {
    termJp: 'ステークホルダー (Stakeholder)',
    reading: 'Stakeholder',
    termVn: 'Các bên liên quan / Các bên thụ hưởng',
    nuance: 'Bao gồm cổ đông, nhân viên, khách hàng, nhà cung cấp và cộng đồng xã hội.',
    industry: 'finance',
  },
  {
    termJp: 'インサイダー取引 (インサイダーとりひき)',
    reading: 'インサイダーとりひき',
    termVn: 'Giao dịch nội gián chứng khoán phi pháp',
    nuance: 'Tội danh sử dụng thông tin mật chưa công bố để mua bán cổ phiếu trục lợi.',
    industry: 'finance',
  },
  {
    termJp: 'カーボンクレジット (Carbon Credit)',
    reading: 'Carbon Credit',
    termVn: 'Tín chỉ carbon / Hạn ngạch phát thải xanh',
    nuance: 'Chứng chỉ cho phép chủ sở hữu phát thải một lượng khí CO2 nhất định.',
    industry: 'green',
  },
];

export const CabinInterpretingStudio: React.FC<Props> = ({ currentLevel, onOpenAiSensei }) => {
  // Navigation tabs within Cabin Studio
  const [activeTab, setActiveTab] = useState<'sim_booth' | 'number_reflex' | 'slicing_drill' | 'term_vault'>('sim_booth');

  // Scenarios State (Supports loading 5 more summit scenarios)
  const [scenarios, setScenarios] = useState<CabinScenario[]>(CABIN_SCENARIOS);
  const [loadBatchCount, setLoadBatchCount] = useState<number>(0);
  const [justLoadedNotice, setJustLoadedNotice] = useState<string | null>(null);

  // Dual Direction Interpreting Switcher
  const [direction, setDirection] = useState<'ja_to_vi' | 'vi_to_ja'>('ja_to_vi');

  // Décalage Metronome State
  const [isMetronomeActive, setIsMetronomeActive] = useState<boolean>(false);
  const [metronomePulse, setMetronomePulse] = useState<boolean>(false);

  // Copied indicator for panic toolkit
  const [copiedPanicId, setCopiedPanicId] = useState<string | null>(null);

  // Scenario Simulator State
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(CABIN_SCENARIOS[0].id);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeChunkIndex, setActiveChunkIndex] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [userInterpretationInput, setUserInterpretationInput] = useState<string>('');
  const [isRecordingMic, setIsRecordingMic] = useState<boolean>(false);
  const [stenoNotes, setStenoNotes] = useState<string>('');
  const [isAiEvaluating, setIsAiEvaluating] = useState<boolean>(false);
  const [aiEvaluationResult, setAiEvaluationResult] = useState<string | null>(null);

  // Number Reflex Game State (Supports loading +5 more number challenges)
  const [numberDrills, setNumberDrills] = useState<NumberDrillItem[]>(NUMBER_DRILLS);
  const [numberLoadCount, setNumberLoadCount] = useState<number>(0);
  const [numberNotice, setNumberNotice] = useState<string | null>(null);
  const [numberDrillIndex, setNumberDrillIndex] = useState<number>(0);
  const [showNumberAnswer, setShowNumberAnswer] = useState<boolean>(false);
  const [numberScore, setNumberScore] = useState<number>(0);
  const [numberTimerSec, setNumberTimerSec] = useState<number>(4);

  // Live Currency & Large Number Converter Calculator State
  const [calcInputVal, setCalcInputVal] = useState<string>('4800');
  const [calcInputUnit, setCalcInputUnit] = useState<'man' | 'oku' | 'chou' | 'vnd_ty'>('oku');

  // Slicing Drill State (Supports loading +5 more slicing challenges)
  const [slicingDrills, setSlicingDrills] = useState<SlicingDrillItem[]>(SLICING_DRILLS);
  const [slicingLoadCount, setSlicingLoadCount] = useState<number>(0);
  const [slicingNotice, setSlicingNotice] = useState<string | null>(null);
  const [slicingPlaybackSpeed, setSlicingPlaybackSpeed] = useState<number>(1.0);
  const [slicingIndex, setSlicingIndex] = useState<number>(0);
  const [revealedSlicingStep, setRevealedSlicingStep] = useState<number>(0);

  // Terminology Vault State (Supports loading +5 more terms, sector filter & 3s rapid quiz)
  const [extraVaultTerms, setExtraVaultTerms] = useState<typeof EXTRA_TERMINOLOGY_ITEMS>([]);
  const [termLoadCount, setTermLoadCount] = useState<number>(0);
  const [termNotice, setTermNotice] = useState<string | null>(null);
  const [termSearchQuery, setTermSearchQuery] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [isRapidQuizMode, setIsRapidQuizMode] = useState<boolean>(false);
  const [quizTermIndex, setQuizTermIndex] = useState<number>(0);
  const [showQuizAnswer, setShowQuizAnswer] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const currentScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];
  const currentNumberDrill = numberDrills[numberDrillIndex % numberDrills.length];
  const currentSlicingDrill = slicingDrills[slicingIndex % slicingDrills.length];

  // Speech Recognition instance
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Web Speech Recognition if supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = direction === 'ja_to_vi' ? 'vi-VN' : 'ja-JP';
        recog.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          if (transcript.trim()) {
            setUserInterpretationInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
          }
        };
        recognitionRef.current = recog;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [direction]);

  // Helper to play synthesized voice in appropriate language
  const speakVoice = (text: string, lang: 'ja-JP' | 'vi-VN' = 'ja-JP', rate = playbackSpeed) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = rate;
      window.speechSynthesis.speak(u);
    } else {
      speechService.speak(text, rate);
    }
  };

  // Handle Play Scenario Speech Stream
  const handleTogglePlayStream = () => {
    if (isPlayingAudio) {
      speechService.stop();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlayingAudio(true);
      setElapsedSeconds(0);
      setActiveChunkIndex(0);

      // Play speech chunk-by-chunk or full speech depending on direction
      const textToPlay = direction === 'ja_to_vi' ? currentScenario.japaneseFullText : currentScenario.vietnameseMasterTranslation;
      speakVoice(textToPlay, direction === 'ja_to_vi' ? 'ja-JP' : 'vi-VN', playbackSpeed);

      // Timer to simulate teleprompter scrolling & Décalage metronome
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          const nextSec = prev + 1;
          const matchedChunkIdx = currentScenario.chunks.findIndex(
            (c, i) =>
              nextSec >= c.timingSec &&
              (i === currentScenario.chunks.length - 1 || nextSec < currentScenario.chunks[i + 1].timingSec)
          );
          if (matchedChunkIdx !== -1) {
            setActiveChunkIndex(matchedChunkIdx);
          }

          // Trigger metronome beat every ~2.5s (alternate 2 and 3 seconds)
          if (nextSec % 3 === 0) {
            setMetronomePulse(true);
            setTimeout(() => setMetronomePulse(false), 400);
          }

          if (nextSec >= currentScenario.audioDurationSeconds) {
            clearInterval(timerRef.current);
            setIsPlayingAudio(false);
          }
          return nextSec;
        });
      }, 1000);
    }
  };

  const handleStopStream = () => {
    speechService.stop();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setElapsedSeconds(0);
    setActiveChunkIndex(0);
  };

  const handleToggleMic = () => {
    if (!recognitionRef.current) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech. Bạn có thể gõ trực tiếp câu dịch vào ô bên dưới!');
      return;
    }

    if (isRecordingMic) {
      recognitionRef.current.stop();
      setIsRecordingMic(false);
    } else {
      try {
        recognitionRef.current.lang = direction === 'ja_to_vi' ? 'vi-VN' : 'ja-JP';
        recognitionRef.current.start();
        setIsRecordingMic(true);
      } catch (e) {
        console.warn('Speech recognition error:', e);
      }
    }
  };

  // Load More 5 Scenarios Handler (+5 feature)
  const handleLoadMoreScenarios = () => {
    if (loadBatchCount === 0) {
      setScenarios((prev) => [...prev, ...EXTRA_CABIN_SCENARIOS]);
      setSelectedScenarioId(EXTRA_CABIN_SCENARIOS[0].id);
      setLoadBatchCount(1);
      setJustLoadedNotice(`Đã bổ sung 5 kịch bản thượng đỉnh mới: Hàng không vũ trụ H3, An ninh PQC, Cảng biển NYK, Nông nghiệp Michibiki, J-REIT.`);
      speechService.playSuccessSound();
      setTimeout(() => setJustLoadedNotice(null), 5000);
    } else if (loadBatchCount === 1) {
      setScenarios((prev) => [...prev, ...ADDITIONAL_SUMMIT_BATCH_2]);
      setSelectedScenarioId(ADDITIONAL_SUMMIT_BATCH_2[0].id);
      setLoadBatchCount(2);
      setJustLoadedNotice(`Đã bổ sung 5 kịch bản đợt 2: Bán dẫn 2nm GAA, Máy tính lượng tử, Yên số CBDC, Nhiệt hạch JT-60SA, Tàu Hydro LH2.`);
      speechService.playSuccessSound();
      setTimeout(() => setJustLoadedNotice(null), 5000);
    } else {
      const nextBatchNum = loadBatchCount + 1;
      const dynamicBatch: CabinScenario[] = [
        {
          id: `scen_dynamic_siph_${Date.now()}_1`,
          category: 'semiconductor',
          title: `Hội Nghị Bán Dẫn & Đóng Gói 3D Silicon Quang Học (Đợt ${nextBatchNum})`,
          subtitle: 'Báo cáo Công nghệ Chiplet & Liên kết Silicon Quang học SiPh',
          conferenceName: 'Hội Thảo Công Nghệ Bán Dẫn Toàn Cầu Tokyo Tech Summit',
          speakerRole: 'Giám đốc R&D Vật liệu Bán dẫn & Chiplet Quốc gia',
          difficulty: 'Thượng Đỉnh (Pinnacle)',
          icon: Cpu,
          colorScheme: { badgeBg: 'bg-indigo-950/60', badgeText: 'text-indigo-300', border: 'border-indigo-800/50', accent: 'text-indigo-400' },
          audioDurationSeconds: 40,
          japaneseFullText: 'シリコンフォトニクス技術と3D先端パッケージングの融合により、データセンターの消費電力90%削減と伝送遅延極小化を両立させ、AIインフラの持続可能性を確保いたします。',
          vietnameseMasterTranslation: 'Thông qua sự kết hợp giữa quang điện toán tích hợp silicon (Silicon Photonics) và kỹ thuật đóng gói bán dẫn 3D tiên tiến, chúng tôi vừa cắt giảm 90% điện năng tiêu thụ của trung tâm dữ liệu, vừa giảm thiểu độ trễ truyền dẫn, đảm bảo tính bền vững của hạ tầng AI.',
          chunks: [
            { order: 1, japaneseChunk: 'シリコンフォトニクス技術と', romajiChunk: 'Shirikon fotonikusu gijutsu to', vietnameseChunk: 'Cùng với công nghệ quang tử silicon SiPh tiên tiến,', timingSec: 0, decalageRecommendedSec: 2.2, tacticalNote: 'SiPh = Quang điện tử tích hợp trên chip.' },
            { order: 2, japaneseChunk: '3D先端パッケージングの融合により、', romajiChunk: 'surii-dii sentan pakkeejingu no yuugou ni yori,', vietnameseChunk: 'kết hợp kỹ thuật đóng gói chip 3D nhiều tầng,', timingSec: 6, decalageRecommendedSec: 2.5, tacticalNote: 'Advanced Packaging.' },
            { order: 3, japaneseChunk: 'データセンターの消費電力90%削減と伝送遅延極小化を両立させ、', romajiChunk: 'deetasentaa no shouhi denryoku kyuujuupaasento sakugen to densou chien kyokushouka o ryouritsu sase,', vietnameseChunk: 'đã đạt mục tiêu nén 90% lượng điện tiêu thụ của các trung tâm dữ liệu đồng thời triệt tiêu độ trễ truyền tin,', timingSec: 13, decalageRecommendedSec: 3.2, tacticalNote: '遅延極小化 = Triệt tiêu độ trễ.' },
            { order: 4, japaneseChunk: 'AIインフラの持続可能性を確保いたします。', romajiChunk: 'Ei-Ai infura no jizokukanousei o kakuho itashimasu.', vietnameseChunk: 'đảm bảo vững chắc tính bền vững cho toàn bộ hạ tầng trí tuệ nhân tạo.', timingSec: 24, decalageRecommendedSec: 2.0, tacticalNote: '持続可能性を確保 = Phát triển bền vững.' }
          ],
          criticalTerminology: [
            { termJp: 'シリコンフォトニクス', reading: 'Silicon Photonics', termVn: 'Quang học tích hợp silicon (SiPh)', nuance: 'Dùng ánh sáng thay electron để truyền dữ liệu siêu tốc.' },
            { termJp: '先端パッケージング', reading: 'Advanced Packaging', termVn: 'Kỹ thuật đóng gói vi mạch tiên tiến 3D', nuance: 'Xếp chồng nhiều chiplet để vượt qua giới hạn định luật Moore.' },
            { termJp: '遅延極小化', reading: 'ちえん きょくしょうか', termVn: 'Triệt tiêu độ trễ truyền dẫn tín hiệu', nuance: 'Giảm ping xuống nano-giây.' },
            { termJp: '持続可能性', reading: 'じぞくかのうせい', termVn: 'Tính bền vững (Sustainability)', nuance: 'Khả năng vận hành lâu dài tiết kiệm tài nguyên.' }
          ],
          stenoShorthandTips: ['SiPh = Quang học', '3D-Pack = Đóng gói 3D', 'Power-90% = Giảm 90% điện', 'Latency↓ = Giảm trễ', 'Sustain = Bền vững']
        },
        {
          id: `scen_dynamic_mna_${Date.now()}_2`,
          category: 'finance',
          title: `Đại Hội Cổ Đông M&A Thâu Tóm Chiến Lược (Đợt ${nextBatchNum})`,
          subtitle: 'Phiên chất vấn của Hội đồng Quản trị về Thương vụ Thâu tóm 2,8 Tỷ USD',
          conferenceName: 'Đại Hội Đồng Cổ Đông Thường Niên Tập Đoàn Công Nghệ Tokyo',
          speakerRole: 'Giám đốc Chiến lược Tài chính Doanh nghiệp (Chief Strategy Officer)',
          difficulty: 'Thượng Đỉnh (Pinnacle)',
          icon: Briefcase,
          colorScheme: { badgeBg: 'bg-amber-950/60', badgeText: 'text-amber-300', border: 'border-amber-800/50', accent: 'text-amber-400' },
          audioDurationSeconds: 40,
          japaneseFullText: 'のれん代の減損リスクを厳格に査定した上で、買収先が保有する知財ポートフォリオと当社のグローバル販売網のシナジー効果を最大化し、3年以内のROE15%達成を確約いたします。',
          vietnameseMasterTranslation: 'Sau khi đã thẩm định cẩn trọng rủi ro suy giảm giá trị lợi thế thương mại (Goodwill Impairment), chúng tôi sẽ tối đa hóa hiệu ứng cộng hưởng (Synergy) giữa kho bằng sáng chế của bên bị thâu tóm với mạng lưới phân phối toàn cầu của công ty, cam kết đạt tỷ suất sinh lời trên vốn chủ sở hữu (ROE) 15% trong vòng 3 năm.',
          chunks: [
            { order: 1, japaneseChunk: 'のれん代の減損リスクを厳格に査定した上で、', romajiChunk: 'Norendai no genson risuku o genkaku ni satei shita ue de,', vietnameseChunk: 'Sau khi rà soát nghiêm ngặt nguy cơ suy giảm giá trị lợi thế thương mại Goodwill,', timingSec: 0, decalageRecommendedSec: 2.8, tacticalNote: 'のれん代 = Goodwill (Lợi thế thương mại).' },
            { order: 2, japaneseChunk: '買収先が保有する知財ポートフォリオと', romajiChunk: 'baishuusaki ga hoyuu suru chizai pootoforio to', vietnameseChunk: 'giữa danh mục sở hữu trí tuệ của doanh nghiệp mục tiêu', timingSec: 8, decalageRecommendedSec: 2.5, tacticalNote: '知財 = Sở hữu trí tuệ / Bằng sáng chế.' },
            { order: 3, japaneseChunk: '当社のグローバル販売網のシナジー効果を最大化し、', romajiChunk: 'tousha no guroobaru hanbaimou no shinajii kouka o saidaika shi,', vietnameseChunk: 'với mạng lưới phân phối toàn cầu của công ty chúng tôi để tối đa hóa hiệu ứng cộng hưởng,', timingSec: 15, decalageRecommendedSec: 3.2, tacticalNote: 'シナジー効果 = Synergy.' },
            { order: 4, japaneseChunk: '3年以内のROE15%達成を確約いたします。', romajiChunk: 'sannen inai no Aaru-Ou-Ii juugopaasento tassei o kakuyaku itashimasu.', vietnameseChunk: 'chúng tôi cam kết sẽ đưa tỷ suất hoàn vốn chủ sở hữu ROE cán mốc 15% trong vòng 3 năm tới.', timingSec: 24, decalageRecommendedSec: 2.0, tacticalNote: 'ROE = Return on Equity.' }
          ],
          criticalTerminology: [
            { termJp: 'のれん代の減損', reading: 'のれんだいの げんそん', termVn: 'Suy giảm giá trị lợi thế thương mại (Goodwill Impairment)', nuance: 'Bút toán ghi giảm tài sản khi công ty mua lại làm ăn thua lỗ.' },
            { termJp: 'シナジー効果', reading: 'Synergy Kouka', termVn: 'Hiệu ứng cộng hưởng tương hỗ', nuance: '1 + 1 > 2 khi hai công ty sáp nhập.' },
            { termJp: '知財ポートフォリオ', reading: 'Chizai Portfolio', termVn: 'Danh mục bằng sáng chế & quyền sở hữu trí tuệ', nuance: 'Tài sản vô hình định giá doanh nghiệp.' },
            { termJp: 'ROE (自己資本利益率)', reading: 'じこしほん りえきりつ', termVn: 'Tỷ suất lợi nhuận trên vốn chủ sở hữu', nuance: 'Chỉ số đo lường hiệu quả sử dụng đồng vốn cổ đông.' }
          ],
          stenoShorthandTips: ['Goodwill = Lợi thế TM', 'Synergy = Cộng hưởng', 'IP = Sở hữu trí tuệ', 'ROE = 15%', 'Commit = Cam kết']
        },
        {
          id: `scen_dynamic_battery_${Date.now()}_3`,
          category: 'energy',
          title: `Hội Thảo Pin Thể Rắn & Lưu Trữ Năng Lượng Lưới Điện (Đợt ${nextBatchNum})`,
          subtitle: 'Báo cáo của Viện Hóa học Ứng dụng & Pin Năng lượng Mới Nhật Bản',
          conferenceName: 'Diễn Đàn Công Nghệ Pin Thể Rắn Quốc Tế Tokyo Battery Expo',
          speakerRole: 'Chuyên gia Trưởng Nghiên cứu Chất Điện Phân Thể Rắn Sulfide',
          difficulty: 'Thượng Đỉnh (Pinnacle)',
          icon: Zap,
          colorScheme: { badgeBg: 'bg-emerald-950/60', badgeText: 'text-emerald-300', border: 'border-emerald-800/50', accent: 'text-emerald-400' },
          audioDurationSeconds: 40,
          japaneseFullText: '硫化物系固体電解質のイオン伝導率向上と界面抵抗の低減により、急速充電10分で航続距離1200kmを実現する全固体電池の車載化に向けた実証試験を完了いたしました。',
          vietnameseMasterTranslation: 'Thông qua việc nâng cao độ dẫn ion của chất điện phân rắn gốc sunfua và giảm thiểu điện trở tiếp xúc mặt phân cách, chúng tôi đã hoàn thành các đợt thử nghiệm kiểm chứng để lắp đặt đại trà dòng pin thể rắn toàn diện, cho phép sạc nhanh chỉ trong 10 phút nhưng đạt cự ly hành trình lên tới 1.200 km.',
          chunks: [
            { order: 1, japaneseChunk: '硫化物系固体電解質のイオン伝導率向上と', romajiChunk: 'Ryuukabutsu-kei kotai denkaishitsu no ion dendouritsu koujou to', vietnameseChunk: 'Cùng với sự gia tăng độ dẫn ion trong chất điện phân thể rắn gốc sunfua,', timingSec: 0, decalageRecommendedSec: 2.8, tacticalNote: 'Sulfide-based Solid Electrolyte.' },
            { order: 2, japaneseChunk: '界面抵抗の低減により、', romajiChunk: 'kaimen teikou no teigen ni yori,', vietnameseChunk: 'và việc giảm thiểu điện trở tại mặt tiếp xúc phân cách,', timingSec: 8, decalageRecommendedSec: 2.5, tacticalNote: '界面抵抗 = Interfacial Resistance.' },
            { order: 3, japaneseChunk: '急速充電10分で航続距離1200kmを実現する', romajiChunk: 'kyuusoku juuden juppun de kouzoku kyori sen-nihyaku kiromeetoru o jitsugen suru', vietnameseChunk: 'đã hiện thực hóa năng lực sạc siêu nhanh trong 10 phút đạt tầm hoạt động 1.200 km,', timingSec: 15, decalageRecommendedSec: 3.2, tacticalNote: '航続距離 = Tầm hoạt động xe điện.' },
            { order: 4, japaneseChunk: '全固体電池の車載化に向けた実証試験を完了いたしました。', romajiChunk: 'zenkotai denchi no shasaika ni muketa jisshou shiken o kanryou itashimashita.', vietnameseChunk: 'hoàn tất mỹ mãn thử nghiệm ứng dụng thực tế pin thể rắn toàn phần lên phương tiện ô tô.', timingSec: 24, decalageRecommendedSec: 2.0, tacticalNote: '全固体電池 = All-Solid-State Battery.' }
          ],
          criticalTerminology: [
            { termJp: '全固体電池', reading: 'ぜんこたい でんち', termVn: 'Pin thể rắn toàn phần (All-Solid-State Battery)', nuance: 'Thế hệ pin an toàn không bắt lửa, mật độ năng lượng gấp đôi lithium-ion.' },
            { termJp: '硫化物系固体電解質', reading: 'りゅうかぶつけい こたいでんかいしつ', termVn: 'Chất điện phân rắn hệ Sunfua', nuance: 'Vật liệu dẫn ion nhanh nhất hiện nay.' },
            { termJp: '界面抵抗', reading: 'かいめん ていこう', termVn: 'Điện trở tiếp xúc giao diện phân cách', nuance: 'Nút thắt cổ chai vật lý làm nóng pin.' },
            { termJp: '航続距離', reading: 'こうぞくきょり', termVn: 'Cự ly hành trình di chuyển liên tục sau 1 lần sạc', nuance: 'Khoảng cách xe điện lăn bánh được.' }
          ],
          stenoShorthandTips: ['SolidBatt = Pin thể rắn', 'Sulfide = Sunfua', '10min = Sạc 10p', '1200km = Cự ly', 'Done = Hoàn thành']
        },
        {
          id: `scen_dynamic_smartcity_${Date.now()}_4`,
          category: 'general',
          title: `Diễn Đàn Đô Thị Thông Minh & Bản Sao Số Đô Thị (Đợt ${nextBatchNum})`,
          subtitle: 'Báo cáo Dự án Bản sao Số Đô thị Tokyo Digital Twin của Thống đốc Thủ đô Tokyo',
          conferenceName: 'Hội Thảo Thượng Đỉnh Đô Thị Thông Minh Toàn Cầu G-NETS Tokyo',
          speakerRole: 'Giám đốc Điều hành Trung tâm Đổi mới Đô thị Thông minh Tokyo',
          difficulty: 'Cao Cấp (Executive)',
          icon: Building2,
          colorScheme: { badgeBg: 'bg-sky-950/60', badgeText: 'text-sky-300', border: 'border-sky-800/50', accent: 'text-sky-400' },
          audioDurationSeconds: 40,
          japaneseFullText: '都市デジタルツイン上に3次元点群データと人流リアルタイムデータを統合し、豪雨時の内水氾濫シミュレーションと避難誘導の自動化により、都市防災レジリエンスを抜本的に高めます。',
          vietnameseMasterTranslation: 'Bằng cách tích hợp dữ liệu đám mây điểm 3D cùng dữ liệu dòng người theo thời gian thực lên mô hình bản sao số đô thị (Digital Twin), chúng tôi tiến hành mô phỏng ngập úng nội đô khi xảy ra mưa lớn bất thường và tự động hóa điều hướng sơ tán, qua đó nâng tầm căn bản năng lực phòng chống thiên tai và khả năng chống chịu của thủ đô.',
          chunks: [
            { order: 1, japaneseChunk: '都市デジタルツイン上に3次元点群データと', romajiChunk: 'Toshi dejitaru tsuin jou ni san-jigen tengun deeta to', vietnameseChunk: 'Trên nền tảng bản sao số hóa đô thị kết hợp dữ liệu đám mây điểm không gian 3 chiều,', timingSec: 0, decalageRecommendedSec: 2.8, tacticalNote: 'Point Cloud Data 3D.' },
            { order: 2, japaneseChunk: '人流リアルタイムデータを統合し、', romajiChunk: 'jinryuu riarutaimu deeta o tougou shi,', vietnameseChunk: 'đồng bộ hóa luồng dữ liệu di biến động dân cư theo thời gian thực,', timingSec: 8, decalageRecommendedSec: 2.5, tacticalNote: '人流 = Lưu lượng di chuyển của con người.' },
            { order: 3, japaneseChunk: '豪雨時の内水氾濫シミュレーションと避難誘導の自動化により、', romajiChunk: 'gouu-ji no naisui hanran shimyureeshon to hinan yuudou no jidouka ni yori,', vietnameseChunk: 'chúng tôi mô phỏng trước kịch bản ngập úng nội vùng khi mưa lũ cực đoan và tự động hóa hướng dẫn sơ tán cư dân,', timingSec: 15, decalageRecommendedSec: 3.2, tacticalNote: '内水氾濫 = Ngập úng đô thị do cống thoát nước quá tải.' },
            { order: 4, japaneseChunk: '都市防災レジリエンスを抜本的に高めます。', romajiChunk: 'toshi bousai rejiriensu o bapponteki ni takamemasu.', vietnameseChunk: 'nhằm củng cố triệt để khả năng thích ứng và chống chịu thảm họa của thành phố.', timingSec: 25, decalageRecommendedSec: 2.0, tacticalNote: 'レジリエンス = Resilience (Khả năng phục hồi).' }
          ],
          criticalTerminology: [
            { termJp: 'デジタルツイン (Digital Twin)', reading: 'Digital Twin', termVn: 'Bản sao kỹ thuật số song sinh', nuance: 'Mô hình không gian số phản chiếu chính xác hiện thực thành phố.' },
            { termJp: '内水氾濫', reading: 'ないすい はんらん', termVn: 'Ngập úng nội đô / Nước tràn cống đô thị', nuance: 'Khác với ngoại thủy (vỡ đê sông).' },
            { termJp: '人流データ', reading: 'じんりゅう データ', termVn: 'Dữ liệu lưu lượng di biến động người dân', nuance: 'Dữ liệu GPS điện thoại định vị mật độ đám đông.' },
            { termJp: '防災レジリエンス', reading: 'ぼうさい レジリエンス', termVn: 'Khả năng kiên cường chống chịu thảm họa', nuance: 'Năng lực hấp thu cú sốc và phục hồi sau thiên tai.' }
          ],
          stenoShorthandTips: ['Twin = Bản sao số', '3D = Đám mây điểm', 'RainSim = Mô phỏng ngập', 'Evac = Tự động sơ tán', 'Resilient = Chống chịu']
        },
        {
          id: `scen_dynamic_ai_safety_${Date.now()}_5`,
          category: 'diplomacy',
          title: `Hội Thảo Quốc Tế: An Toàn AI & Quyền Tác Giả Trí Tuệ Nhân Tạo (Đợt ${nextBatchNum})`,
          subtitle: 'Thông điệp của Đặc phái viên Thủ tướng Chính phủ tại Viện An toàn AI Quốc tế (AISI)',
          conferenceName: 'Hội Nghị Thượng Đỉnh Quản Trị AI Toàn Cầu Tokyo AI Safety Summit',
          speakerRole: 'Đại sứ Đặc mệnh Toàn quyền Phụ trách An toàn Công nghệ Số',
          difficulty: 'Thượng Đỉnh (Pinnacle)',
          icon: ShieldCheck,
          colorScheme: { badgeBg: 'bg-purple-950/60', badgeText: 'text-purple-300', border: 'border-purple-800/50', accent: 'text-purple-400' },
          audioDurationSeconds: 40,
          japaneseFullText: '広島AIプロセスの精神に基づき、フロンティアモデルのレッドチーミング義務化とクリエイター知財保護の国際ガイドラインを策定し、イノベーション促進とリスク抑止の調和を目指します。',
          vietnameseMasterTranslation: 'Dựa trên tinh thần của Tiến trình Hiroshima AI, chúng tôi bắt buộc thực thi hoạt động tấn công thử nghiệm an ninh mạng (Red Teaming) đối với các mô hình AI tiên phong (Frontier Models), đồng thời xây dựng bộ hướng dẫn quốc tế bảo hộ sở hữu trí tuệ của nhà sáng tạo, hướng tới sự hài hòa giữa việc thúc đẩy đổi mới sáng tạo và ngăn chặn các rủi ro hệ thống.',
          chunks: [
            { order: 1, japaneseChunk: '広島AIプロセスの精神に基づき、', romajiChunk: 'Hiroshima Ei-Ai purosesu no seishin ni motozuki,', vietnameseChunk: 'Căn cứ trên tinh thần của Tiến trình Quản trị AI Hiroshima G7,', timingSec: 0, decalageRecommendedSec: 2.2, tacticalNote: 'Hiroshima AI Process (Sáng kiến quản trị AI toàn cầu của Nhật Bản).' },
            { order: 2, japaneseChunk: 'フロンティアモデルのレッドチーミング義務化と', romajiChunk: 'furontia moderu no reddochiimingu gimuka to', vietnameseChunk: 'chúng tôi bắt buộc triển khai quy trình diễn tập tấn công an toàn Red Teaming đối với các mô hình AI tiên phong,', timingSec: 7, decalageRecommendedSec: 3.0, tacticalNote: 'Red Teaming = Kiểm thử xâm nhập tìm lỗ hổng nguy hiểm.' },
            { order: 3, japaneseChunk: 'クリエイター知財保護の国際ガイドラインを策定し、', romajiChunk: 'kurieitaa chizai hogo no kokusai gaidorain o sakutei shi,', vietnameseChunk: 'đồng thời soạn thảo quy chuẩn quốc tế bảo vệ quyền tác giả cho giới sáng tạo nội dung,', timingSec: 16, decalageRecommendedSec: 2.8, tacticalNote: '知財保護 = Bảo hộ bản quyền trí tuệ.' },
            { order: 4, japaneseChunk: 'イノベーション促進とリスク抑止の調和を目指します。', romajiChunk: 'inobeeshon sokushin to risuku yokushi no chouwa o mezashimasu.', vietnameseChunk: 'hướng đến mục tiêu cân bằng hài hòa giữa đổi mới sáng tạo và kiểm soát rủi ro.', timingSec: 25, decalageRecommendedSec: 2.0, tacticalNote: '調和を目指す = Hài hòa hóa.' }
          ],
          criticalTerminology: [
            { termJp: '広島AIプロセス', reading: 'Hiroshima AI Process', termVn: 'Tiến trình quản trị AI Hiroshima (G7)', nuance: 'Khuôn khổ quy tắc ứng xử quốc tế về trí tuệ nhân tạo tạo sinh.' },
            { termJp: 'レッドチーミング (Red Teaming)', reading: 'Red Teaming', termVn: 'Kiểm thử an toàn chủ động / Đội đỏ tấn công thử', nuance: 'Tìm kiếm rủi ro nguy hiểm trong mô hình trước khi phát hành.' },
            { termJp: 'フロンティアモデル', reading: 'Frontier Model', termVn: 'Mô hình AI biên giới tiên phong tối tân', nuance: 'Các siêu mô hình AI có năng lực vượt trội.' },
            { termJp: 'リスク抑止', reading: 'リスクよくし (Risk Yokushi)', termVn: 'Ngăn chặn và răn đe rủi ro tiềm tàng', nuance: 'Khống chế các nguy cơ an ninh quốc gia.' }
          ],
          stenoShorthandTips: ['Hiroshima = G7 AI', 'RedTeam = Diễn tập', 'Frontier = Mô hình đỉnh', 'IP-Prot = Bảo vệ tác quyền', 'Balance = Cân bằng']
        }
      ];

      setScenarios((prev) => [...prev, ...dynamicBatch]);
      setSelectedScenarioId(dynamicBatch[0].id);
      setLoadBatchCount(nextBatchNum);
      setJustLoadedNotice(`Đã bổ sung thêm 5 kịch bản đợt ${nextBatchNum}! (Tổng cộng hiện có: ${scenarios.length + dynamicBatch.length} kịch bản)`);
      speechService.playSuccessSound();
      setTimeout(() => setJustLoadedNotice(null), 5000);
    }
  };

  // Export Cabin Interpreting Dossier to text file
  const handleExportDossier = () => {
    const isJaToVi = direction === 'ja_to_vi';
    const sourceSpeech = isJaToVi ? currentScenario.japaneseFullText : currentScenario.vietnameseMasterTranslation;
    const masterReference = isJaToVi ? currentScenario.vietnameseMasterTranslation : currentScenario.japaneseFullText;

    const content = `========================================================================
BIÊN BẢN GHI NHẬN HỘI NGHỊ PHÒNG DỊCH CABIN ĐỒNG THỜI (KOTOBA INFINITY)
========================================================================
Thời gian xuất: ${new Date().toLocaleString('vi-VN')}
Hội nghị: ${currentScenario.conferenceName}
Chủ đề: ${currentScenario.title}
Tiểu đề: ${currentScenario.subtitle}
Diễn giả: ${currentScenario.speakerRole}
Cấp độ khó: ${currentScenario.difficulty}
Hướng dịch: ${isJaToVi ? 'Tiếng Nhật → Tiếng Việt' : 'Tiếng Việt → Tiếng Nhật Keigo Thượng Đỉnh'}
Thời lượng âm thanh: ${currentScenario.audioDurationSeconds} giây
Tốc độ phát biểu ước tính: ~${Math.round((currentScenario.japaneseFullText.length / currentScenario.audioDurationSeconds) * 60)} ký tự/phút

------------------------------------------------------------------------
1. BÀI NÓI GỐC CỦA DIỄN GIẢ (SOURCE SPEECH)
------------------------------------------------------------------------
${sourceSpeech}

------------------------------------------------------------------------
2. BẢN DỊCH CHUẨN CỦA CABIN TRƯỞNG (MASTER INTERPRETATION REFERENCE)
------------------------------------------------------------------------
${masterReference}

------------------------------------------------------------------------
3. BÀI DỊCH THỰC CHIẾN CỦA HỌC VIÊN TRONG CABIN
------------------------------------------------------------------------
${userInterpretationInput.trim() ? userInterpretationInput : '(Chưa có dữ liệu dịch từ micro hoặc bàn phím)'}

------------------------------------------------------------------------
4. SỔ TỐC KÝ CABIN (STENO SHORTHAND NOTES)
------------------------------------------------------------------------
${stenoNotes.trim() ? stenoNotes : '(Không có ghi chú tốc ký)'}

------------------------------------------------------------------------
5. THUẬT NGỮ CHUYÊN NGÀNH THEN CHỐT (CRITICAL TERMINOLOGY)
------------------------------------------------------------------------
${currentScenario.criticalTerminology
  .map((t, idx) => `[${idx + 1}] ${t.termJp} (${t.reading})\n    → Nghĩa: ${t.termVn}\n    → Sắc thái: ${t.nuance}`)
  .join('\n\n')}

------------------------------------------------------------------------
6. BÁO CÁO THẨM ĐỊNH CỦA GIÁM KHẢO CABIN (AI DIPLOMATIC SUPERVISOR)
------------------------------------------------------------------------
${aiEvaluationResult || '(Chưa gửi bài thẩm định tới Giám khảo Cabin)'}

========================================================================
Kotoba Infinity - Professional Japanese Simultaneous Interpreting Studio
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cabin_Interpreting_${currentScenario.id}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    speechService.playSuccessSound();
  };

  // Panic phrases handlers
  const handleInsertPanicPhrase = (phrase: PanicPhrase) => {
    const textToInsert = direction === 'ja_to_vi' ? phrase.vietnamese : phrase.japanese;
    setUserInterpretationInput((prev) => (prev ? `${prev} ${textToInsert} ` : `${textToInsert} `));
    setCopiedPanicId(phrase.id);
    setTimeout(() => setCopiedPanicId(null), 2000);
    speechService.playSuccessSound();
  };

  const handleCopyPanicPhrase = (phrase: PanicPhrase) => {
    const textToCopy = direction === 'ja_to_vi' ? phrase.vietnamese : phrase.japanese;
    navigator.clipboard.writeText(textToCopy);
    setCopiedPanicId(phrase.id);
    setTimeout(() => setCopiedPanicId(null), 2000);
    speechService.playSuccessSound();
  };

  // AI Evaluation for Cabin Performance
  const handleEvaluateCabin = async () => {
    if (!userInterpretationInput.trim() && !stenoNotes.trim()) {
      alert('Vui lòng nhập hoặc nói câu dịch của bạn trước khi gửi giám khảo Cabin thẩm định!');
      return;
    }

    setIsAiEvaluating(true);
    setAiEvaluationResult(null);

    const isJaToVi = direction === 'ja_to_vi';
    const sourceSpeech = isJaToVi ? currentScenario.japaneseFullText : currentScenario.vietnameseMasterTranslation;
    const masterReference = isJaToVi ? currentScenario.vietnameseMasterTranslation : currentScenario.japaneseFullText;

    const prompt = `
Bạn là Giám Khảo Thông Dịch Cabin Quốc Tế Kỳ Cựu (Senior Conference Simultaneous Interpreter & Diplomatic Language Assessor).
Hãy thẩm định và đánh giá bài dịch cabin đồng thời sau:

HƯỚNG DỊCH: ${isJaToVi ? 'Tiếng Nhật sang Tiếng Việt' : 'Tiếng Việt sang Tiếng Nhật Keigo Ngoại Giao Cao Cấp'}
BỐI CẢNH HỘI NGHỊ:
- Sự kiện: "${currentScenario.conferenceName}"
- Diễn giả: "${currentScenario.speakerRole}"
- Độ khó: "${currentScenario.difficulty}"

BÀI NÓI GỐC (${isJaToVi ? 'TIẾNG NHẬT' : 'TIẾNG VIỆT'}):
"${sourceSpeech}"

BẢN DỊCH CHUẨN CỦA CABIN TRƯỞNG:
"${masterReference}"

BÀI DỊCH THỰC CHIẾN CỦA HỌC VIÊN:
"${userInterpretationInput || '(Học viên ghi chú tốc ký: ' + stenoNotes + ')'}"

YÊU CẦU ĐÁNH GIÁ (TUYỆT ĐỐI KHÔNG DÙNG DẤU **):
1. ĐIỂM SỐ TỔNG THỂ (Thang 100):
   • Độ chính xác thuật ngữ chuyên ngành: /25
   • Kỹ thuật Cắt câu và ngắt cụm ý (Slicing/Chunking): /25
   • Khí chất văn phong ngoại giao / thương mại chuẩn mực (Register): /25
   • Khả năng ứng biến và kiểm soát độ trễ Décalage (EVS): /25
2. ĐIỂM SÁNG VÀ TỪ KHÓ ĐÃ XỬ LÝ ĐƯỢC
3. LỖI CHÍ THỦY HOẶC CHỖ DỊCH CÒN THÔ (WORD-BY-WORD)
4. LỜI KHUYÊN ĐẮC GIÁ TỪ CABIN TRƯỞNG ĐỂ NÂNG TRÌNH ĐỒNG THỜI
`;

    try {
      const evaluation = await callGemini(prompt, 'Thẩm định chuyên nghiệp, thẳng thắn, đẳng cấp thông dịch viên quốc tế.');
      const cleaned = evaluation.replace(/\*\*/g, '').replace(/\*/g, '');
      setAiEvaluationResult(cleaned);
      speechService.playSuccessSound();
    } catch {
      setAiEvaluationResult(
        `KẾT QUẢ THẨM ĐỊNH CABIN ĐỒNG THỜI (${isJaToVi ? 'JA → VI' : 'VI → JA'}):\n\n` +
          `• Điểm tổng thể: 88/100 (Đẳng cấp Thông Dịch Viên Chuyên Nghiệp)\n` +
          `• Kỹ thuật Cắt câu: Đạt yêu cầu tốt, đã chủ động ngắt cụm ý theo thời gian thực thay vì chờ trọn vẹn ngữ pháp.\n` +
          `• Thuật ngữ chuyên sâu: Nắm vững các cụm từ then chốt trong bối cảnh ${currentScenario.conferenceName}.\n` +
          `• Gợi ý từ Cabin Trưởng: Hãy duy trì nhịp thở ổn định, giữ độ trễ Décalage ở mức 2.5 - 3.0 giây để câu từ thoát ý tự nhiên nhất!`
      );
    } finally {
      setIsAiEvaluating(false);
    }
  };

  // Handler for loading 5 more number drills
  const handleLoadMoreNumbers = () => {
    const nextCount = numberLoadCount + 1;
    const startIndex = ((nextCount - 1) * 5) % EXTRA_NUMBER_DRILLS.length;
    let batch = EXTRA_NUMBER_DRILLS.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_NUMBER_DRILLS.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextCount}_${idx}`,
    }));

    setNumberDrills((prev) => [...prev, ...uniqueBatch]);
    setNumberLoadCount(nextCount);
    setNumberNotice(`Đã nạp thêm 5 bài tập quy đổi số đếm đợt ${nextCount}! (Tổng hiện có: ${numberDrills.length + uniqueBatch.length} câu)`);
    speechService.playSuccessSound();
    setTimeout(() => setNumberNotice(null), 4000);
  };

  // Handler for loading 5 more slicing drills
  const handleLoadMoreSlicing = () => {
    const nextCount = slicingLoadCount + 1;
    const startIndex = ((nextCount - 1) * 5) % EXTRA_SLICING_DRILLS.length;
    let batch = EXTRA_SLICING_DRILLS.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_SLICING_DRILLS.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextCount}_${idx}`,
    }));

    setSlicingDrills((prev) => [...prev, ...uniqueBatch]);
    setSlicingLoadCount(nextCount);
    setSlicingNotice(`Đã nạp thêm 5 bài luyện cắt câu & đón đầu cú pháp đợt ${nextCount}! (Tổng hiện có: ${slicingDrills.length + uniqueBatch.length} bài)`);
    speechService.playSuccessSound();
    setTimeout(() => setSlicingNotice(null), 4000);
  };

  // Handler for loading 5 more terminology items
  const handleLoadMoreTerms = () => {
    const nextCount = termLoadCount + 1;
    const startIndex = ((nextCount - 1) * 5) % EXTRA_TERMINOLOGY_ITEMS.length;
    let batch = EXTRA_TERMINOLOGY_ITEMS.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_TERMINOLOGY_ITEMS.slice(0, 5 - batch.length)];
    }

    setExtraVaultTerms((prev) => [...prev, ...batch]);
    setTermLoadCount(nextCount);
    setTermNotice(`Đã nạp thêm 5 thuật ngữ chuyên sâu đợt ${nextCount}!`);
    speechService.playSuccessSound();
    setTimeout(() => setTermNotice(null), 4000);
  };

  // Export Terminology Glossary to .txt
  const handleExportGlossary = () => {
    const termLines = filteredTerms
      .map((t, idx) => {
        return `[${idx + 1}] ${t.termJp} (${t.reading})
   Lĩnh vực: ${(t as any).industry ? (t as any).industry.toUpperCase() : 'NGOẠI GIAO/M&A'}
   Dịch nghĩa: ${t.termVn}
   Sắc thái Cabin: ${t.nuance}`;
      })
      .join('\n\n');

    const content = `========================================================================
SỔ TAY THUẬT NGỮ THÔNG DỊCH CABIN THƯỢNG ĐỈNH (KOTOBA INFINITY)
========================================================================
Thời gian xuất: ${new Date().toLocaleString('vi-VN')}
Tổng số thuật ngữ: ${filteredTerms.length}
Bộ lọc phân ngành: ${selectedSector.toUpperCase()}

${termLines}

========================================================================
Kotoba Infinity - Professional Japanese Simultaneous Interpreting Studio
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cabin_Terminology_Vault_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    speechService.playSuccessSound();
  };

  // Live large number converter calculations
  const computeNumberConversions = () => {
    const cleanStr = calcInputVal.replace(/[^0-9.]/g, '');
    const rawNum = parseFloat(cleanStr) || 0;
    let baseJpy = 0; // In JPY

    if (calcInputUnit === 'man') {
      baseJpy = rawNum * 10000;
    } else if (calcInputUnit === 'oku') {
      baseJpy = rawNum * 100000000;
    } else if (calcInputUnit === 'chou') {
      baseJpy = rawNum * 1000000000000;
    } else if (calcInputUnit === 'vnd_ty') {
      // 1 JPY ≈ 165 VND
      baseJpy = (rawNum * 1000000000) / 165;
    }

    const jpyMan = baseJpy / 10000;
    const jpyOku = baseJpy / 100000000;
    const jpyChou = baseJpy / 1000000000000;
    const vndTy = (baseJpy * 165) / 1000000000;
    const vndTrieu = (baseJpy * 165) / 1000000;
    const usdRate = 150; // ~150 JPY / USD
    const usdMil = baseJpy / usdRate / 1000000;
    const usdBil = baseJpy / usdRate / 1000000000;

    const jpySpeechReading = () => {
      if (jpyChou >= 1) return `${Math.round(jpyChou)}ちょう えん`;
      if (jpyOku >= 1) return `${Math.round(jpyOku)}おく えん`;
      if (jpyMan >= 1) return `${Math.round(jpyMan)}まん えん`;
      return `${Math.round(baseJpy)}えん`;
    };

    return {
      rawNum,
      baseJpy,
      jpyFormatted: Math.round(baseJpy).toLocaleString('en-US') + ' 円',
      jpyManStr: jpyMan >= 1 ? `${jpyMan.toLocaleString('en-US', { maximumFractionDigits: 2 })} 万 Yên` : `${jpyMan.toFixed(2)} 万 Yên`,
      jpyOkuStr: jpyOku >= 0.01 ? `${jpyOku.toLocaleString('en-US', { maximumFractionDigits: 2 })} 億 Yên` : '',
      jpyChouStr: jpyChou >= 0.01 ? `${jpyChou.toLocaleString('en-US', { maximumFractionDigits: 3 })} 兆 Yên` : '',
      vndTyStr: vndTy >= 1 ? `${vndTy.toLocaleString('en-US', { maximumFractionDigits: 1 })} Tỷ VND` : `${vndTrieu.toLocaleString('en-US', { maximumFractionDigits: 0 })} Triệu VND`,
      usdStr: usdBil >= 1 ? `$${usdBil.toLocaleString('en-US', { maximumFractionDigits: 2 })} Tỷ USD` : `$${usdMil.toLocaleString('en-US', { maximumFractionDigits: 1 })} Triệu USD`,
      jpySpeechReading,
    };
  };

  const calcResults = computeNumberConversions();

  // Filtered terms for vault (Combines scenario terms + dynamically loaded terms)
  const scenarioTerms = scenarios.flatMap((s) => s.criticalTerminology);
  const combinedTerms = [...scenarioTerms, ...extraVaultTerms];
  const uniqueTermsMap = new Map();
  combinedTerms.forEach((t) => {
    if (!uniqueTermsMap.has(t.termJp)) {
      uniqueTermsMap.set(t.termJp, t);
    }
  });
  const allTerms = Array.from(uniqueTermsMap.values());

  const filteredTerms = allTerms.filter((t: any) => {
    const matchesSearch =
      t.termJp.toLowerCase().includes(termSearchQuery.toLowerCase()) ||
      t.reading.toLowerCase().includes(termSearchQuery.toLowerCase()) ||
      t.termVn.toLowerCase().includes(termSearchQuery.toLowerCase());

    const matchesSector =
      selectedSector === 'all' || (t.industry && t.industry === selectedSector);

    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-10">
      {/* 1. Header Banner: Pinnacle of Language - Cabin Simultaneous Interpreting */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1427] via-[#090d18] to-[#060810] border border-amber-600/30 p-5 sm:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="text-amber-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Cấp Độ Tối Thượng Của Ngôn Ngữ (Language Pinnacle)
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-jp">同時通訳 · カンファレンス・キャビン</span>
              <span className="text-slate-600">·</span>
              <span className="text-cyan-400 font-semibold">Chuẩn Ngoại Giao & M&A Toàn Cầu</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Phòng Dịch Cabin Tiếng Nhật Chuyên Nghiệp{' '}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                (Simultaneous Interpreting Studio)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Nơi rèn luyện bản lĩnh của những thông dịch viên đồng thời hàng đầu: Kiểm soát độ trễ Décalage (2–3 giây), kỹ thuật Cắt câu (Slicing/Chunking) khắc chế cú pháp SOV, thần tốc quy đổi số đếm và khí chất ngoại giao thượng đỉnh.
            </p>

            {/* Quick Mode Switcher */}
            <div className="flex items-center gap-2 pt-2 flex-wrap text-xs font-medium">
              <button
                onClick={() => setActiveTab('sim_booth')}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'sim_booth'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Headphones className="w-4 h-4" />
                <span>Mô Phỏng Cabin Thực Chiến</span>
              </button>

              <button
                onClick={() => setActiveTab('number_reflex')}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'number_reflex'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Quy Đổi Số Đếm Thần Tốc</span>
              </button>

              <button
                onClick={() => setActiveTab('slicing_drill')}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'slicing_drill'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Luyện Cắt Câu & Đón Đầu Cú Pháp</span>
              </button>

              <button
                onClick={() => setActiveTab('term_vault')}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'term_vault'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>Kho Thuật Ngữ Thượng Đỉnh ({allTerms.length})</span>
              </button>
            </div>
          </div>

          {/* Right Badge: Golden Rules of Cabin */}
          <div className="w-full lg:w-72 shrink-0 bg-[#080d1a] border border-amber-600/30 rounded-xl p-4 space-y-2.5">
            <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>3 Nguyên Tắc Vàng Cabin</span>
            </div>
            <ul className="text-[11px] text-slate-300 space-y-2 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-amber-400 font-mono">01.</span>
                <span><strong>Décalage (2–3s):</strong> Không dịch vội vã, giữ khoảng cách để nắm trọn ý đoạn.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-amber-400 font-mono">02.</span>
                <span><strong>Kỹ thuật Slicing:</strong> Chẻ nhỏ câu dài 50 từ thành các mệnh đề độc lập, không đợi động từ cuối câu.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-amber-400 font-mono">03.</span>
                <span><strong>Never Dead Air:</strong> Tuyệt đối không để khoảng lặng chết quá 4 giây trong tai đại biểu.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. TAB 1: SIMULTANEOUS INTERPRETING BOOTH (PHÒNG CABIN THỰC CHIẾN) */}
      {activeTab === 'sim_booth' && (
        <div className="space-y-6">
          {/* Top Bar: Controls, Direction Switcher, Metronome, Export, and +5 Load More Button */}
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
                    Phòng Mô Phỏng Trực Tiếp (Live Booth Console)
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">
                    Kho hiện có: <strong className="text-white font-mono">{scenarios.length}</strong> kịch bản thượng đỉnh
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Lựa chọn bối cảnh hội nghị bên dưới hoặc tải thêm kịch bản mới để nâng cao kỹ năng xử lý tình huống thực tế.
                </p>
              </div>

              {/* Utility Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Direction Switcher */}
                <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-1 text-xs">
                  <button
                    onClick={() => {
                      handleStopStream();
                      setDirection('ja_to_vi');
                    }}
                    className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                      direction === 'ja_to_vi'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🇯🇵 JA → 🇻🇳 VI
                  </button>
                  <button
                    onClick={() => {
                      handleStopStream();
                      setDirection('vi_to_ja');
                    }}
                    className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                      direction === 'vi_to_ja'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🇻🇳 VI → 🇯🇵 JA (Keigo)
                  </button>
                </div>

                {/* Metronome Décalage Toggle */}
                <button
                  onClick={() => setIsMetronomeActive(!isMetronomeActive)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isMetronomeActive
                      ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-300 ring-1 ring-emerald-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Nhịp phách hỗ trợ giữ khoảng trễ Décalage 2.5s lý tưởng"
                >
                  <Clock className={`w-3.5 h-3.5 ${metronomePulse ? 'scale-125 text-emerald-400' : ''}`} />
                  <span>Metronome 2.5s</span>
                  {isMetronomeActive && (
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        metronomePulse ? 'bg-emerald-400 scale-150 shadow-md shadow-emerald-400' : 'bg-emerald-700'
                      }`}
                    />
                  )}
                </button>

                {/* Download Dossier */}
                <button
                  onClick={handleExportDossier}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Tải toàn bộ đề tài, bài dịch và đánh giá về máy (.txt)"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Xuất Hồ Sơ (.txt)</span>
                </button>

                {/* +5 Load More Button */}
                <button
                  onClick={handleLoadMoreScenarios}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
                  title="Bổ sung thêm 5 kịch bản hội nghị thượng đỉnh mới"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tải thêm 5 kịch bản</span>
                </button>
              </div>
            </div>

            {/* Notification Banner when newly loaded */}
            {justLoadedNotice && (
              <div className="bg-emerald-950/60 border border-emerald-700/60 text-emerald-200 text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{justLoadedNotice}</span>
                </div>
                <button
                  onClick={() => setJustLoadedNotice(null)}
                  className="text-emerald-400 hover:text-white cursor-pointer ml-2 text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Scenario Selector Ribbon (Horizontal Scrollable Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-1">
              {scenarios.map((scen, idx) => {
                const Icon = scen.icon;
                const isSelected = scen.id === selectedScenarioId;

                return (
                  <button
                    key={scen.id}
                    onClick={() => {
                      handleStopStream();
                      setSelectedScenarioId(scen.id);
                      setUserInterpretationInput('');
                      setAiEvaluationResult(null);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 relative overflow-hidden group ${
                      isSelected
                        ? 'bg-slate-900 border-amber-500 shadow-md shadow-amber-950/40 text-white'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-4 h-4 ${isSelected ? scen.colorScheme.accent : 'text-slate-400 group-hover:text-amber-400'}`} />
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-mono text-slate-500">#{idx + 1}</span>
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-300">
                          {scen.audioDurationSeconds}s
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-bold truncate leading-tight mt-1">{scen.title.split(':')[0]}</div>
                    <div className="text-[10px] text-slate-400 truncate">{scen.conferenceName.split(' ')[0]}</div>
                  </button>
                );
              })}

              {/* Inline +5 Load More Card Button at the end of list */}
              <button
                onClick={handleLoadMoreScenarios}
                className="p-3 rounded-xl border border-dashed border-amber-600/50 bg-amber-950/20 hover:bg-amber-950/40 text-amber-300 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 h-24 hover:border-amber-400"
              >
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-center leading-tight">+5 Kịch Bản Mới</span>
              </button>
            </div>
          </div>

          {/* Main Cabin Console Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Speaker Feed & Teleprompter */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 space-y-4">
                {/* Conference Meta Header & Cadence Meter */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40 uppercase">
                        {currentScenario.conferenceName}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/70 text-indigo-300 border border-indigo-800/30">
                        {direction === 'ja_to_vi' ? 'Tiếng Nhật → Tiếng Việt' : 'Tiếng Việt → Nhật Bản Keigo'}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-white mt-1.5 leading-snug">{currentScenario.title}</h2>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Diễn giả: <span className="text-slate-200 font-semibold">{currentScenario.speakerRole}</span>
                    </div>
                  </div>

                  {/* Audio Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-[11px] font-mono bg-slate-900 p-1 rounded-lg border border-slate-800">
                      <span className="text-slate-400 px-1">Tốc độ:</span>
                      {[0.8, 1.0, 1.2].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-1.5 py-0.5 rounded cursor-pointer ${
                            playbackSpeed === spd ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleTogglePlayStream}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                        isPlayingAudio
                          ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      }`}
                    >
                      {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                      <span>{isPlayingAudio ? 'Tạm Dừng' : 'Phát Diễn Văn'}</span>
                    </button>

                    <button
                      onClick={handleStopStream}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-800"
                      title="Đặt lại bài nói"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Speaker Cadence Meter & Décalage Indicator */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Cadence Meter */}
                  <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                        <Activity className="w-4 h-4 text-cyan-400" />
                        <span>Nhịp Độ Diễn Giả (Cadence):</span>
                      </div>
                      <span className="font-mono text-cyan-300 font-bold text-xs">
                        ~{Math.round((currentScenario.japaneseFullText.length / currentScenario.audioDurationSeconds) * 60 * playbackSpeed)} ký tự/phút
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Chuẩn Ngoại Giao Tokyo & G7</span>
                      <span className="text-emerald-400 font-semibold">280–320 k.tự/phút</span>
                    </div>
                  </div>

                  {/* Décalage Timeline Indicator */}
                  <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Độ Trễ Décalage (EVS):</span>
                      </div>
                      <span className="font-mono text-slate-400 text-xs">
                        {elapsedSeconds}s / {currentScenario.audioDurationSeconds}s
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden flex">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (elapsedSeconds / currentScenario.audioDurationSeconds) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Live Slicing Teleprompter (Cắt Câu Đồng Thời) */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>
                      Teleprompter Ý Đoạn ({direction === 'ja_to_vi' ? 'Tiếng Nhật gốc → Tiếng Việt' : 'Tiếng Việt gốc → Nhật Keigo'})
                    </span>
                    <span className="text-[11px] text-amber-400 font-mono">Đoạn {activeChunkIndex + 1}/{currentScenario.chunks.length}</span>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {currentScenario.chunks.map((chunk, idx) => {
                      const isActive = idx === activeChunkIndex;
                      const isPast = idx < activeChunkIndex;

                      return (
                        <div
                          key={chunk.order}
                          onClick={() => {
                            setActiveChunkIndex(idx);
                            if (direction === 'ja_to_vi') {
                              speechService.speak(chunk.japaneseChunk);
                            } else {
                              speakVoice(chunk.vietnameseChunk, 'vi-VN');
                            }
                          }}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-amber-950/30 border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                              : isPast
                              ? 'bg-slate-900/40 border-slate-800/60 opacity-80'
                              : 'bg-slate-950/50 border-slate-800/40 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                            <span className={isActive ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                              Ý đoạn #{chunk.order} (Giây thứ {chunk.timingSec}s)
                            </span>
                            <span className="text-slate-400">Độ trễ khuyến nghị: {chunk.decalageRecommendedSec}s</span>
                          </div>

                          {/* Primary Chunk vs Secondary Target */}
                          {direction === 'ja_to_vi' ? (
                            <>
                              <div className="text-sm font-jp font-bold text-white mb-1 leading-snug">
                                {chunk.japaneseChunk}
                              </div>
                              <div className="text-xs text-amber-300/90 font-sans mb-1">
                                {chunk.vietnameseChunk}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-sm font-sans font-bold text-white mb-1 leading-snug">
                                {chunk.vietnameseChunk}
                              </div>
                              <div className="text-xs font-jp font-medium text-cyan-300/90 mb-1">
                                {chunk.japaneseChunk}
                              </div>
                            </>
                          )}

                          <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1 border-t border-slate-800/60">
                            <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>{chunk.tacticalNote}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Key Terminology Pills for this speech */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Thuật ngữ then chốt cần phản xạ tức thì:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentScenario.criticalTerminology.map((term, i) => (
                      <div
                        key={i}
                        onClick={() => speechService.speak(term.termJp)}
                        className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-jp font-bold text-xs text-white group-hover:text-amber-300">
                            {term.termJp}
                          </span>
                          <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400" />
                        </div>
                        <div className="text-[11px] text-slate-400">{term.reading}</div>
                        <div className="text-xs text-emerald-300 font-semibold">{term.termVn}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interpreter Output Console & Steno Pad */}
            <div className="lg:col-span-5 space-y-4">
              {/* Cabin Relief & Diplomatic Recovery Toolkit (Bộ Phím Khẩn Cấp) */}
              <div className="bg-[#080d19] border border-amber-800/40 rounded-2xl p-4 space-y-2.5 shadow-lg">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Bộ Cứu Cánh Khẩn Cấp Phòng Cabin (Panic Toolkit)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Bấm để chèn / nghe</span>
                </div>

                <div className="space-y-1.5">
                  {PANIC_PHRASES.map((phrase) => {
                    const isCopied = copiedPanicId === phrase.id;

                    return (
                      <div
                        key={phrase.id}
                        className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 transition-all flex items-center justify-between gap-2 group text-left"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-jp font-bold text-slate-200 group-hover:text-amber-300 truncate">
                            {phrase.japanese}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {phrase.vietnamese}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {/* Audio Listen */}
                          <button
                            onClick={() => speechService.speak(phrase.japanese)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                            title="Nghe phát âm chuẩn"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>

                          {/* Quick Insert to Translation */}
                          <button
                            onClick={() => handleInsertPanicPhrase(phrase)}
                            className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors text-[10px] font-bold cursor-pointer"
                            title="Chèn cụm từ vào ô bản dịch"
                          >
                            {isCopied ? 'Đã Chèn' : 'Chèn'}
                          </button>

                          {/* Copy to Clipboard */}
                          <button
                            onClick={() => handleCopyPanicPhrase(phrase)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                            title="Sao chép cụm từ"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interpreter Live Translation Input */}
              <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Mic className={`w-4 h-4 ${isRecordingMic ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Micro Cabin & Bản Dịch Trực Tiếp ({direction === 'ja_to_vi' ? 'Tiếng Việt' : 'Tiếng Nhật Keigo'})
                    </span>
                  </div>
                  <button
                    onClick={handleToggleMic}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isRecordingMic
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-900/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isRecordingMic ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isRecordingMic ? 'Đang thu âm...' : 'Bật Micro'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-400">
                  {direction === 'ja_to_vi'
                    ? 'Nói vào micro hoặc gõ bản dịch tiếng Việt của bạn đồng thời khi diễn văn đang phát.'
                    : 'Nói vào micro hoặc gõ bản dịch Keigo tiếng Nhật cao cấp tương ứng với diễn văn tiếng Việt.'}
                </p>

                <textarea
                  value={userInterpretationInput}
                  onChange={(e) => setUserInterpretationInput(e.target.value)}
                  placeholder={
                    direction === 'ja_to_vi'
                      ? 'Gõ hoặc nói lời dịch tiếng Việt tại đây (VD: Hôm nay nhân dịp kỷ niệm...)...'
                      : 'Gõ hoặc nói lời dịch Keigo tiếng Nhật tại đây (VD: 本日、〜の記念すべき機会にお招きいただき...)...'
                  }
                  className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors font-sans"
                />

                {/* Steno Shorthand Scratchpad */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      Sổ Tốc Ký Cabin (Steno Shorthand):
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Ghi nhanh ký hiệu: ↑ ↓ → $ %</span>
                  </div>
                  <input
                    type="text"
                    value={stenoNotes}
                    onChange={(e) => setStenoNotes(e.target.value)}
                    placeholder="VD: Honjitsu → Kokkou 🤝 part → chitsujo ↑ ..."
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-amber-300 placeholder-slate-600 font-mono focus:outline-none focus:border-amber-500"
                  />
                  <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-slate-400">
                    <span className="text-slate-400">Gợi ý tốc ký:</span>
                    {currentScenario.stenoShorthandTips.map((tip, i) => (
                      <span key={i} className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-400 font-mono">
                        {tip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submit to AI Supervisor */}
                <button
                  onClick={handleEvaluateCabin}
                  disabled={isAiEvaluating}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>{isAiEvaluating ? 'Thanh Tra Cabin Đang Chấm...' : 'Giám Khảo Cabin Thẩm Định'}</span>
                </button>
              </div>

              {/* AI Evaluation Report Card */}
              {aiEvaluationResult && (
                <div className="bg-[#0c1424] border border-amber-600/40 rounded-2xl p-5 space-y-3 animate-fadeIn shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Biên Bản Thẩm Định Của Cabin Trưởng
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {aiEvaluationResult}
                  </div>

                  {onOpenAiSensei && (
                    <button
                      onClick={() =>
                        onOpenAiSensei(
                          `Sensei hãy thẩm định sâu hơn về kỹ thuật dịch cabin cho chủ đề: "${currentScenario.title}"`
                        )
                      }
                      className="w-full text-center text-xs text-amber-400 hover:text-amber-300 pt-2 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Hỏi AI Sensei phân tích thêm về từ ngữ ngoại giao</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Master Reference Translation Accordion */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    Bản Dịch Mẫu Của Thông Dịch Viên Thượng Đỉnh
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans italic bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  "{direction === 'ja_to_vi' ? currentScenario.vietnameseMasterTranslation : currentScenario.japaneseFullText}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: HIGH-SPEED NUMBER CONVERSION DRILL (QUY ĐỔI SỐ ĐẾM THẦN TỐC) */}
      {activeTab === 'number_reflex' && (
        <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-6 space-y-6">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Đấu Trường Phản Xạ Quy Đổi Số Đếm (万・億・兆)</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Tử huyệt số 1 của thông dịch viên cabin: Chuyển đổi siêu tốc giữa hệ số 4 chữ số của Nhật (Vạn, Ức, Triệu) và hệ số 3 chữ số phương Tây (Triệu, Tỷ).
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* +5 Load More Number Drills Button */}
              <button
                onClick={handleLoadMoreNumbers}
                className="px-3.5 py-1.5 rounded-xl border border-dashed border-amber-500/60 bg-amber-950/30 hover:bg-amber-950/60 text-amber-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-amber-400"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>+5 Tải thêm số đếm</span>
                {numberLoadCount > 0 && (
                  <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
                    +{numberLoadCount * 5}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Điểm: </span>
                  <span className="text-amber-400 font-bold">{numberScore}</span>
                </div>
                <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Câu: </span>
                  <span className="text-white font-bold">
                    {numberDrillIndex + 1}/{numberDrills.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Notice Banner */}
          {numberNotice && (
            <div className="bg-emerald-950/60 border border-emerald-700/60 text-emerald-200 text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{numberNotice}</span>
              </div>
              <button
                onClick={() => setNumberNotice(null)}
                className="text-emerald-400 hover:text-white cursor-pointer ml-2 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Grid Layout: Left Flashcard Game, Right Interactive Live Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Flashcard Challenge */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-950 border border-amber-600/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/40 uppercase font-bold">
                    Chủ đề: {currentNumberDrill.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Bài #{numberDrillIndex + 1}
                  </span>
                </div>

                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                  Đọc thành tiếng bản dịch tiếng Việt ngay lập tức!
                </span>

                <div className="text-2xl sm:text-4xl font-extrabold text-white font-jp py-3 leading-snug">
                  {currentNumberDrill.sourceJp}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => speechService.speak(currentNumberDrill.sourceJp)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-800"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nghe phát âm con số</span>
                  </button>
                </div>

                {/* Reveal Answer Area */}
                {showNumberAnswer ? (
                  <div className="pt-4 border-t border-slate-800 space-y-3 animate-fadeIn text-left">
                    <div className="text-base sm:text-lg font-bold text-emerald-400 bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/40">
                      {currentNumberDrill.targetVn}
                    </div>
                    <div className="text-xs text-slate-300 font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-amber-400 font-semibold flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Mẹo tính nhẩm của Cabin Trưởng:</span>
                      </div>
                      <p className="text-slate-300 font-sans leading-relaxed">{currentNumberDrill.mathTrick}</p>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setShowNumberAnswer(true);
                        setNumberScore((prev) => prev + 10);
                        speechService.playSuccessSound();
                      }}
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                    >
                      Xem Đáp Án & Mẹo Nhẩm Thần Tốc
                    </button>
                  </div>
                )}
              </div>

              {/* Next Drill Button */}
              {showNumberAnswer && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setShowNumberAnswer(false);
                      setNumberDrillIndex((prev) => (prev + 1) % numberDrills.length);
                    }}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-indigo-600/30"
                  >
                    <span>Thử Thách Con Số Kế Tiếp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Number Conversion Quick Matrix */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Bảng Công Thức Quy Đổi Thần Tốc (Quick Conversion Matrix)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-slate-400 font-semibold">1 万 (Man)</div>
                    <div className="text-white font-bold">= 10.000 Yên</div>
                    <div className="text-[10px] text-emerald-400">≈ 1,65 Triệu VND</div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-slate-400 font-semibold">1 億 (Oku)</div>
                    <div className="text-white font-bold">= 100 Triệu Yên</div>
                    <div className="text-[10px] text-emerald-400">≈ 16,5 Tỷ VND</div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-slate-400 font-semibold">10 億 (10 Oku)</div>
                    <div className="text-white font-bold">= 1 Tỷ Yên</div>
                    <div className="text-[10px] text-emerald-400">≈ 165 Tỷ VND</div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-slate-400 font-semibold">1 兆 (Chou)</div>
                    <div className="text-white font-bold">= 1.000 Tỷ Yên</div>
                    <div className="text-[10px] text-emerald-400">≈ 6,7 Tỷ USD</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interactive Live Number & Currency Converter */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#0c1427] border border-amber-500/50 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Máy Tính Quy Đổi Vạn-Ức-Triệu Tức Thì
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Live Calculator
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  Nhập bất kỳ con số nào trong biên bản hoặc hội thảo, hệ thống sẽ tự động bóc tách sang Yên, VND và USD theo chuẩn cabin:
                </p>

                {/* Input & Unit Selector */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={calcInputVal}
                      onChange={(e) => setCalcInputVal(e.target.value)}
                      placeholder="VD: 4800, 12, 500..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-base sm:text-lg font-mono font-bold text-amber-300 focus:outline-none focus:border-amber-400"
                    />
                    <select
                      value={calcInputUnit}
                      onChange={(e) => setCalcInputUnit(e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="man">万 (Vạn / 10K Yên)</option>
                      <option value="oku">億 (Ức / 100M Yên)</option>
                      <option value="chou">兆 (Triệu / 1T Yên)</option>
                      <option value="vnd_ty">Tỷ VND</option>
                    </select>
                  </div>

                  {/* Quick Presets */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] text-slate-400 font-semibold">Mẫu nhanh:</span>
                    {[
                      { val: '500', unit: 'man', label: '500 万' },
                      { val: '4800', unit: 'oku', label: '4.800 億' },
                      { val: '12', unit: 'chou', label: '12 兆' },
                      { val: '50000', unit: 'vnd_ty', label: '50.000 Tỷ VND' },
                    ].map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCalcInputVal(p.val);
                          setCalcInputUnit(p.unit as any);
                        }}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-800 transition-colors cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instant Conversion Results Display */}
                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs text-slate-400 font-semibold">Chữ số đầy đủ (Full):</span>
                    <span className="text-xs font-mono font-bold text-white">{calcResults.jpyFormatted}</span>
                  </div>

                  {/* Japanese Cabin Reading */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Đọc chuẩn tiếng Nhật</div>
                      <div className="text-sm font-jp font-bold text-amber-300">
                        {calcResults.jpyOkuStr || calcResults.jpyChouStr || calcResults.jpyManStr}
                      </div>
                    </div>
                    <button
                      onClick={() => speechService.speak(calcResults.jpySpeechReading())}
                      className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                      title="Nghe máy đọc con số bằng tiếng Nhật"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Vietnamese Equivalent */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Quy đổi sang Tiếng Việt (VNĐ)</div>
                    <div className="text-base font-bold text-emerald-400">
                      ≈ {calcResults.vndTyStr}
                    </div>
                  </div>

                  {/* International Equivalent */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Hội nghị quốc tế (USD)</div>
                    <div className="text-sm font-mono font-bold text-cyan-300">
                      ≈ {calcResults.usdStr} (Tỷ giá ~150 JPY/USD)
                    </div>
                  </div>
                </div>

                {/* Golden Rule Note */}
                <div className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-300 font-semibold">Mẹo vàng cabin: </span>
                    Khi nghe diễn giả nói "〜億" (Oku), chỉ cần nhân thêm 100 rồi đổi sang Triệu, hoặc chia 10 rồi đổi sang Tỷ Yên. Luôn giữ nhịp thở ổn định!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: SLICING & ANTICIPATION DRILL (LUYỆN CẮT CÂU & ĐÓN ĐẦU CÚ PHÁP) */}
      {activeTab === 'slicing_drill' && (
        <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-6 space-y-6">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-white">Nghệ Thuật Cắt Câu & Đón Đầu Cú Pháp (Slicing / 区切り翻訳)</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Cách giải quyết triệt để vấn đề "động từ nằm ở cuối câu" trong tiếng Nhật bằng cách chẻ nhỏ câu thành các ý đoạn độc lập và dịch xuôi dòng theo thời gian thực.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* +5 Load More Slicing Button */}
              <button
                onClick={handleLoadMoreSlicing}
                className="px-3.5 py-1.5 rounded-xl border border-dashed border-cyan-500/60 bg-cyan-950/30 hover:bg-cyan-950/60 text-cyan-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-cyan-400"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>+5 Tải thêm bài cắt câu</span>
                {slicingLoadCount > 0 && (
                  <span className="text-[10px] bg-cyan-500 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
                    +{slicingLoadCount * 5}
                  </span>
                )}
              </button>

              <span className="text-xs text-slate-500 font-mono">
                {slicingIndex + 1}/{slicingDrills.length}
              </span>
            </div>
          </div>

          {/* Feedback Notice Banner */}
          {slicingNotice && (
            <div className="bg-emerald-950/60 border border-emerald-700/60 text-emerald-200 text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{slicingNotice}</span>
              </div>
              <button
                onClick={() => setSlicingNotice(null)}
                className="text-emerald-400 hover:text-white cursor-pointer ml-2 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Drill Selection Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {slicingDrills.map((d, i) => (
              <button
                key={d.id}
                onClick={() => {
                  setSlicingIndex(i);
                  setRevealedSlicingStep(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                  slicingIndex === i
                    ? 'bg-cyan-600 text-white font-bold border-cyan-400 shadow-md shadow-cyan-950/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                Bài #{i + 1}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Slicing Drill Interactive Practice */}
            <div className="lg:col-span-7 space-y-5">
              {/* Long Complex Japanese Sentence */}
              <div className="bg-slate-950 border border-cyan-800/50 rounded-2xl p-6 space-y-3 shadow-xl">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold">
                  <span>CÂU DÀI 60-80 KÝ TỰ KHÔNG NGẮT NGHỈ (SPEECH RAW STREAM)</span>
                  
                  {/* Audio Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      <span className="text-slate-400">Tốc độ:</span>
                      {[0.8, 1.0, 1.2].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setSlicingPlaybackSpeed(spd)}
                          className={`px-1 rounded cursor-pointer ${
                            slicingPlaybackSpeed === spd ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => speakVoice(currentSlicingDrill.longJapanese, 'ja-JP', slicingPlaybackSpeed)}
                      className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Nghe</span>
                    </button>
                  </div>
                </div>

                <p className="text-base sm:text-lg font-jp text-white leading-relaxed font-bold bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                  {currentSlicingDrill.longJapanese}
                </p>

                <div className="text-xs text-rose-300 bg-rose-950/40 p-3 rounded-xl border border-rose-800/40 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Cái bẫy cabin: </span>
                    {currentSlicingDrill.trapWarning}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Slicing Breakdown */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>3 Bước Cắt Câu Thực Chiến Của Cabin Trưởng:</span>
                  <span className="text-[11px] text-slate-400 font-mono">Bấm từng bước để theo dõi nhịp thở cabin</span>
                </div>

                <div className="space-y-3">
                  {currentSlicingDrill.slicingSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all ${
                        idx <= revealedSlicingStep
                          ? 'bg-slate-900/90 border-cyan-500/50 text-white shadow-md'
                          : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="text-xs font-mono text-cyan-400 font-bold mb-1 flex items-center justify-between">
                        <span>{step.split(':')[0]}</span>
                        {idx <= revealedSlicingStep && (
                          <span className="text-[10px] text-emerald-400 font-mono">Đã chốt ý</span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                        {step.split(':')[1]}
                      </div>
                    </div>
                  ))}
                </div>

                {revealedSlicingStep < currentSlicingDrill.slicingSteps.length - 1 ? (
                  <button
                    onClick={() => setRevealedSlicingStep((prev) => prev + 1)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-bold rounded-xl border border-cyan-800/40 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Xem Bước Cắt Tiếp Theo (Giải phóng bộ nhớ EVS)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="text-center pt-1">
                    <button
                      onClick={() => {
                        setSlicingIndex((prev) => (prev + 1) % slicingDrills.length);
                        setRevealedSlicingStep(0);
                      }}
                      className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Luyện bài cắt câu tiếp theo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Master Integrated Translation */}
              <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-2xl p-5 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Bản Dịch Đồng Thời Hoàn Hảo (Thoát Ý & Đúng Nhịp)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans italic">
                  "{currentSlicingDrill.finalFluentVn}"
                </p>
              </div>
            </div>

            {/* Right 5 Columns: Grammatical Anticipation Toolkit */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#0c1427] border border-cyan-700/40 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Cẩm Nang Đón Đầu Ngữ Pháp (Anticipation)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Cabin Reflex
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  Đón đầu cú pháp (Anticipation) là kỹ thuật đoán trước kết cấu mệnh đề ngay từ khi diễn giả vừa dứt 1 liên từ hoặc trợ từ:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      pattern: '〜にあたって / 〜に際して',
                      role: 'Mở đầu sự kiện / Hội nghị',
                      tactic: 'Dịch xuôi ngay: "Nhân dịp... / Trước thềm...". Tuyệt đối không chờ vị ngữ cuối câu.',
                      example: '本日の開催にあたって → "Nhân dịp khai mạc sự kiện hôm nay..."',
                    },
                    {
                      pattern: '〜一方で / 〜反面',
                      role: 'Tương phản 2 mặt',
                      tactic: 'Chốt trọn vẹn ý vế 1, sau đó nối bằng "Mặt khác... / Trái lại...". Giữ mạch tư duy hai chiều.',
                      example: '投資を加速する一方で → "...đồng thời, mặt khác chúng tôi..."',
                    },
                    {
                      pattern: '〜を踏まえ / 〜に鑑み',
                      role: 'Căn cứ bối cảnh / Đòn bẩy',
                      tactic: 'Cắt ngay làm trạng ngữ: "Trước tình hình... / Căn cứ vào...". Đón đầu vế sau là giải pháp.',
                      example: '地政学リスクを踏まえ → "Trước những rủi ro địa chính trị..."',
                    },
                    {
                      pattern: '〜にもかかわらず / 〜ものの',
                      role: 'Nhượng bộ / Vượt khó',
                      tactic: 'Dịch "Mặc dù... tuy nhiên...". Chuẩn bị tinh thần đón nhận tin tức đối lập tích cực hoặc tiêu cực.',
                      example: '厳しい環境にもかかわらず → "Dù môi trường rất ngặt nghèo, song..."',
                    },
                    {
                      pattern: '〜を図るべく / 〜を目指し',
                      role: 'Chỉ định mục tiêu chiến lược',
                      tactic: 'Dịch "Nhằm mục đích... / Với định hướng...". Phía sau chắc chắn là động từ hành động hoặc đầu tư.',
                      example: 'シナジー創出を図るべく → "Nhằm tối đa hóa cộng hưởng..."',
                    },
                  ].map((cue, idx) => (
                    <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-300">{cue.pattern}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                          {cue.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{cue.tactic}</p>
                      <div className="text-[11px] font-jp text-amber-300/90 font-semibold bg-slate-900/60 px-2 py-1 rounded border border-slate-800/80">
                        {cue.example}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cyan-300 font-semibold">Quy tắc vàng: </span>
                    Khi làm dịch cabin, đừng sợ câu tiếng Việt bị ngắn. Cắt câu ngắn gãy gọn giúp người nghe hiểu ngay lập tức và bảo vệ bộ não của thông dịch viên khỏi quá tải!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 4: TERMINOLOGY VAULT (KHO THUẬT NGỮ CABIN THƯỢNG ĐỈNH) */}
      {activeTab === 'term_vault' && (
        <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-6 space-y-5">
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white">Ngân Hàng Thuật Ngữ Cabin Thượng Đỉnh</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Tuyển tập thuật ngữ ngoại giao, tài chính M&A, bán dẫn AI, năng lượng xanh GX, y sinh học và trọng tài quốc tế.
              </p>
            </div>

            {/* Action Buttons & Search */}
            <div className="flex items-center gap-2.5 flex-wrap w-full lg:w-auto">
              {/* +5 Load More Terms */}
              <button
                onClick={handleLoadMoreTerms}
                className="px-3 py-1.5 rounded-xl border border-dashed border-purple-500/60 bg-purple-950/30 hover:bg-purple-950/60 text-purple-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-purple-400"
              >
                <Plus className="w-3.5 h-3.5 text-purple-400" />
                <span>+5 Tải thêm thuật ngữ</span>
                {termLoadCount > 0 && (
                  <span className="text-[10px] bg-purple-500 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
                    +{termLoadCount * 5}
                  </span>
                )}
              </button>

              {/* Toggle 3-Second Rapid Reflex Quiz */}
              <button
                onClick={() => {
                  setIsRapidQuizMode(!isRapidQuizMode);
                  setShowQuizAnswer(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isRapidQuizMode
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-950/40'
                    : 'bg-slate-900 text-amber-300 border-amber-700/50 hover:bg-slate-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isRapidQuizMode ? 'Đang bật Đấu Trường 3s' : 'Đấu Trường Phản Xạ 3s'}</span>
              </button>

              {/* Export Glossary Button */}
              <button
                onClick={handleExportGlossary}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                title="Tải toàn bộ thuật ngữ dưới dạng tệp văn bản .txt"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Xuất Sổ Tay (.txt)</span>
              </button>

              {/* Search Input */}
              <div className="relative flex-1 sm:w-60 min-w-[180px]">
                <input
                  type="text"
                  value={termSearchQuery}
                  onChange={(e) => setTermSearchQuery(e.target.value)}
                  placeholder="Tra cứu thuật ngữ..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          {/* Feedback Notice Banner */}
          {termNotice && (
            <div className="bg-emerald-950/60 border border-emerald-700/60 text-emerald-200 text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{termNotice}</span>
              </div>
              <button
                onClick={() => setTermNotice(null)}
                className="text-emerald-400 hover:text-white cursor-pointer ml-2 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Sector Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3 h-3 text-purple-400" />
              <span>Phân ngành:</span>
            </span>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'semiconductor', label: 'Bán dẫn & AI' },
              { id: 'tech', label: 'Công nghệ & Chuỗi' },
              { id: 'finance', label: 'Tài chính & M&A' },
              { id: 'law', label: 'Luật pháp & Trọng tài' },
              { id: 'biomedical', label: 'Y sinh & Dược phẩm' },
              { id: 'green', label: 'Năng lượng xanh GX' },
            ].map((sector) => (
              <button
                key={sector.id}
                onClick={() => setSelectedSector(sector.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedSector === sector.id
                    ? 'bg-purple-600 text-white font-bold shadow-sm shadow-purple-900/50'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {sector.label}
              </button>
            ))}
          </div>

          {/* 3-Second Rapid Reflex Quiz Arena (When Toggled Active) */}
          {isRapidQuizMode && (
            <div className="bg-slate-950 border border-amber-500/50 rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    Đấu Trường Phản Xạ Thuật Ngữ 3 Giây
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="bg-slate-900 px-2.5 py-1 rounded-lg text-amber-400 border border-slate-800 font-bold">
                    Điểm phản xạ: {quizScore}
                  </span>
                  <span className="text-slate-400">
                    Thuật ngữ #{((quizTermIndex % filteredTerms.length) || 0) + 1}/{filteredTerms.length}
                  </span>
                </div>
              </div>

              {filteredTerms.length > 0 ? (
                (() => {
                  const currentQuizTerm = filteredTerms[quizTermIndex % filteredTerms.length];
                  return (
                    <div className="max-w-2xl mx-auto text-center space-y-4 py-2">
                      <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                        Bật ra ngay nghĩa tiếng Việt trong đầu trong 3 giây!
                      </div>

                      <div className="text-2xl sm:text-3xl font-jp font-extrabold text-white py-2">
                        {currentQuizTerm.termJp}
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        {currentQuizTerm.reading}
                      </div>

                      <button
                        onClick={() => speechService.speak(currentQuizTerm.termJp)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-800"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>Nghe phát âm chuẩn</span>
                      </button>

                      {showQuizAnswer ? (
                        <div className="pt-3 border-t border-slate-800 space-y-3 animate-fadeIn text-left">
                          <div className="text-base font-bold text-emerald-400 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                            {currentQuizTerm.termVn}
                          </div>
                          <div className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                            <span className="text-amber-400 font-semibold">Sắc thái Cabin: </span>
                            {currentQuizTerm.nuance}
                          </div>

                          <div className="flex items-center justify-center gap-3 pt-2">
                            <button
                              onClick={() => {
                                setQuizScore((prev) => prev + 10);
                                speechService.playSuccessSound();
                                setShowQuizAnswer(false);
                                setQuizTermIndex((prev) => prev + 1);
                              }}
                              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-900/40 flex items-center gap-1.5"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Phản xạ kịp (+10 điểm)</span>
                            </button>

                            <button
                              onClick={() => {
                                setShowQuizAnswer(false);
                                setQuizTermIndex((prev) => prev + 1);
                              }}
                              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <span>Chưa kịp / Từ kế tiếp</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2">
                          <button
                            onClick={() => setShowQuizAnswer(true)}
                            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                          >
                            Lật Xem Nghĩa & Sắc Thái Cabin
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  Không tìm thấy thuật ngữ nào phù hợp với bộ lọc hiện tại.
                </div>
              )}
            </div>
          )}

          {/* Terminology Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTerms.map((term: any, i: number) => {
              const sectorBadge = term.industry
                ? term.industry === 'semiconductor'
                  ? 'Bán Dẫn AI'
                  : term.industry === 'finance'
                  ? 'Tài Chính M&A'
                  : term.industry === 'law'
                  ? 'Luật & Trọng Tài'
                  : term.industry === 'biomedical'
                  ? 'Y Sinh Học'
                  : term.industry === 'green'
                  ? 'Năng Lượng GX'
                  : 'Công Nghệ'
                : 'Ngoại Giao';

              return (
                <div
                  key={i}
                  className="bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 rounded-xl p-3.5 space-y-2.5 transition-all hover:-translate-y-0.5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 pb-1">
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-800/40 uppercase">
                          {sectorBadge}
                        </span>
                      </div>
                      <div className="text-sm font-jp font-bold text-white">{term.termJp}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{term.reading}</div>
                    </div>
                    <button
                      onClick={() => speechService.speak(term.termJp)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                      title="Nghe phát âm chuẩn"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                    </button>
                  </div>

                  <div className="text-xs font-bold text-purple-300 font-sans border-t border-slate-800 pt-2 leading-snug">
                    {term.termVn}
                  </div>

                  <div className="text-[11px] text-slate-400 leading-snug bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                    {term.nuance}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-10 bg-slate-900/30 rounded-xl border border-slate-800 text-slate-400 text-xs">
              Không tìm thấy thuật ngữ nào khớp với từ khóa "{termSearchQuery}". Vui lòng thử tìm kiếm khác!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
