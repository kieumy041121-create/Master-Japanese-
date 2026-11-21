import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import {
  Volume2,
  Headphones,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  Check,
  Award,
  Play,
  RotateCcw,
} from 'lucide-react';

interface NoteTakingItem {
  id: string;
  conferenceTitle: string;
  speaker: string;
  speechDurationSec: number;
  fullSpeechJp: string;
  fullSpeechVn: string;
  proStenoNotes: {
    columnLeft: string[]; // Cột Luận điểm chính & Diễn giả
    columnRight: string[]; // Cột Số liệu, Căn cứ, Ký hiệu tốc ký
  };
  symbolLegend: {
    symbol: string;
    meaning: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const INITIAL_NOTE_DRILLS: NoteTakingItem[] = [
  {
    id: 'note_1',
    conferenceTitle: 'Hội Thảo Chiến Lược Chuyển Đổi Số AI Cho Doanh Nghiệp Sản Xuất',
    speaker: 'Giám Đốc Đổi Mới Công Nghệ (CTO) - Tập Đoàn Điện Tử Tokyo',
    speechDurationSec: 50,
    fullSpeechJp:
      '本日はお忙しい中お集まりいただきありがとうございます。当社のスマートファクトリー推進事業についてご報告いたします。昨年度、全国5カ所の主力工場に画像認識AI検査システムを全面導入いたしました。その結果、従来目視で行っていた不良品検知の精度が99.8%まで向上し、検査工程に要する人員を従来の30名から8名へと大幅に削減することに成功いたしました。投資回収期間は当初見込んでいた3年から、わずか1年2カ月へと前倒しされる見通しでございます。しかしながら、地方工場においては熟練技術者のデジタルスキル不足という新たな課題も顕在化しており、今後は外部専門機関と提携したリスキリング研修への投資を年間5,000万円規模で継続してまいる所存です。',
    fullSpeechVn:
      'Cảm ơn quý vị đã dành thời gian tham dự. Tôi xin báo cáo về dự án nhà máy thông minh của công ty. Năm ngoái, chúng tôi đã đưa hệ thống kiểm tra AI thị giác vào 5 nhà máy chủ lực trên toàn quốc. Kết quả là độ chính xác phát hiện lỗi vốn làm bằng mắt thường đã tăng lên 99,8%, nhân sự bộ phận kiểm thử giảm mạnh từ 30 người xuống còn 8 người. Thời gian hoàn vốn dự kiến ban đầu 3 năm nay được rút ngắn xuống chỉ còn 1 năm 2 tháng. Tuy nhiên, tại các nhà máy địa phương đang phát sinh vấn đề thiếu hụt kỹ năng số của kỹ sư lành nghề, do đó thời gian tới chúng tôi sẽ duy trì khoản đầu tư đào tạo lại (Reskilling) 50 triệu Yên/năm hợp tác với tổ chức chuyên môn bên ngoài.',
    proStenoNotes: {
      columnLeft: [
        '・Smart Factory (5 Main Plants) ➔ AI Inspect 全面導入',
        '・Result 1: 不良品検知 (Defect Rate) ➔ 99.8% ↑',
        '・Result 2: 人員 (Staff): 30名 ➔ 8名 (73% Cut)',
        '・ROI: 3yr ➔ 1yr 2mo (前倒し達成)',
        '・Problem: 地方工場 ➔ 熟練工 Digital Skill 不足 ⚠️',
        '・Solution: Reskilling 🤝 外部機関 ➔ 5,000万円/yr',
      ],
      columnRight: [
        '5 Factory 🏢',
        'AI Check = 99.8% ↑🎯',
        'Staff: 30 ➔ 8 👤',
        'Payback: 1.2 yr 💰',
        'Issue: Skill Gap ⚠️',
        'Invest: 50M 円/yr 🤝',
      ],
    },
    symbolLegend: [
      { symbol: '➔', meaning: 'Dẫn đến, kết quả là / Chuyển giao' },
      { symbol: '↑', meaning: 'Tăng trưởng, cải thiện tỷ lệ' },
      { symbol: '⚠️', meaning: 'Vấn đề phát sinh, rủi ro nảy sinh' },
      { symbol: '🤝', meaning: 'Hợp tác đối tác (提携 / パートナーシップ)' },
      { symbol: '💰', meaning: 'Ngân sách, chi phí đầu tư' },
    ],
    quiz: {
      question: 'Báo cáo của diễn giả đề cập đến con số 5.000 vạn Yên (5,000万円) cho mục đích gì?',
      options: [
        'Chi phí mua bản quyền hệ thống AI kiểm tra sản phẩm lỗi.',
        'Ngân sách hàng năm cho việc đào tạo nâng cao kỹ năng số cho công nhân địa phương.',
        'Khoản tiền thưởng cho 8 nhân sự xuất sắc tại nhà máy thông minh.',
        'Chi phí đền bù cho các nhân sự phải cắt giảm trong dây chuyền.',
      ],
      correctIndex: 1,
      explanation:
        'Cụm từ tốc ký chốt bài: "外部専門機関と提携したリスキリング研修への投資を年間5,000万円規模で継続" ➔ Đầu tư 50 triệu Yên hàng năm cho việc Reskilling (đào tạo lại kỹ năng số).',
    },
  },
  {
    id: 'note_2',
    conferenceTitle: 'Chiến Lược Thâm Nhập Thị Trường ASEAN & Chuỗi Cung Ứng',
    speaker: 'Trưởng Ban Kế Hoạch Quốc Tế - Tập Đoàn Logistics Toàn Cầu',
    speechDurationSec: 45,
    fullSpeechJp:
      'アジア新興国市場における当社のサプライチェーン戦略についてご説明申し上げます。現在、地政学的リスクの分散を目的として、従来の「チャイナ・プラスワン」から「マルチハブ体制」への移行を加速しております。具体的には、ベトナムのハイフォン港近郊に延床面積4万平方メートルの最新鋭スマート物流倉庫を新設し、2025年秋より本格稼働を開始いたします。これにより、日本・ASEAN間の海上輸送リードタイムは現行の7日間から4日間へと40%短縮され、在庫回転率は年12回から18回へと大幅に改善する見込みです。現地の人件費上昇傾向を考慮し、自動搬送ロボットAGVを120台配備することで、人手不足への耐性を高めてまいります。',
    fullSpeechVn:
      'Tôi xin trình bày về chiến lược chuỗi cung ứng tại thị trường mới nổi châu Á. Nhằm phân tán rủi ro địa chính trị, chúng tôi đang đẩy nhanh chuyển đổi từ mô hình "China+1" sang "Cơ chế đa trung tâm (Multi-hub)". Cụ thể, chúng tôi sẽ xây mới kho thông minh 40.000 m2 gần cảng Hải Phòng, Việt Nam, vận hành chính thức từ mùa thu 2025. Nhờ đó, thời gian vận chuyển đường biển Nhật - ASEAN sẽ rút ngắn 40% từ 7 ngày xuống còn 4 ngày, vòng quay tồn kho tăng từ 12 lên 18 vòng/năm. Để đối phó với giá nhân công tăng, chúng tôi trang bị 120 robot tự hành AGV nhằm tăng sức chống chịu thiếu hụt lao động.',
    proStenoNotes: {
      columnLeft: [
        '・Strategy: China+1 ➔ Multi-Hub (Risk Hedge 🌐)',
        '・Location: Vietnam Haiphong 🚢 (40,000 ㎡ Warehouse)',
        '・Launch: 2025 Autumn 🍁',
        '・Lead Time: 7 Days ➔ 4 Days (40% Cut ⏱️)',
        '・Inventory Turnover: 12x ➔ 18x/yr 📦',
        '・Countermeasure: 120 AGV Robots 🤖 (人件費高騰対策)',
      ],
      columnRight: [
        'Multi-Hub 🌐',
        'Haiphong: 40k ㎡ 🏭',
        'Open: 2025 Fall ⏱️',
        'Leadtime: 7d ➔ 4d ⚡',
        'Turnover: 18x 📈',
        '120 AGV Robots 🤖',
      ],
    },
    symbolLegend: [
      { symbol: '🌐', meaning: 'Phân tán toàn cầu / Toàn cầu hóa' },
      { symbol: '⚡', meaning: 'Rút ngắn thời gian, đẩy nhanh tiến độ' },
      { symbol: '📈', meaning: 'Gia tăng hiệu suất vòng quay' },
      { symbol: '🤖', meaning: 'Tự động hóa robot hóa' },
    ],
    quiz: {
      question: 'Thời gian vận chuyển hàng hải giữa Nhật Bản và ASEAN sẽ rút ngắn như thế nào sau khi mở kho Hải Phòng?',
      options: [
        'Rút ngắn từ 10 ngày xuống còn 5 ngày.',
        'Rút ngắn từ 7 ngày xuống còn 4 ngày (giảm 40%).',
        'Rút ngắn từ 14 ngày xuống còn 7 ngày.',
        'Rút ngắn từ 18 ngày xuống còn 12 ngày.',
      ],
      correctIndex: 1,
      explanation:
        'Dữ liệu tốc ký: "海上輸送リードタイムは現行の7日間から4日間へと40%短縮" ➔ Giảm từ 7 ngày xuống 4 ngày.',
    },
  },
];

const EXTRA_NOTE_DRILLS: NoteTakingItem[] = [
  {
    id: 'note_extra_1',
    conferenceTitle: 'Hội Thảo Y Tế Từ Xa & Bản Quyền Dược Phẩm Sinh Học',
    speaker: 'Chuyên gia Đàm phán Bản quyền Dược - Viện Nghiên Cứu Y Học',
    speechDurationSec: 45,
    fullSpeechJp:
      '抗がん剤などのバイオ医薬品市場において、特許切れに伴うバイオシミラー（バイオ後続品）の普及が急速に進んでおります。当社では次世代抗体薬の国内特許を保有しておりましたが、先月、欧米の大手製薬企業と総額300億円規模のライセンス許諾契約を締結いたしました。契約に基づき、契約一時金として50億円を今期受領し、今後の治験進捗に応じて最大250億円のマイルストーン収入を見込んでおります。開発期間はおよそ5年間を想定しており、2029年の米国FDA承認を目指します。',
    fullSpeechVn:
      'Trên thị trường thuốc sinh học ung thư, các sản phẩm Biosimilar tương tự sinh học đang phát triển nhanh chóng sau khi hết hạn bảo hộ sáng chế. Công ty chúng tôi nắm bằng sáng chế thuốc kháng thể thế hệ mới tại Nhật, tháng trước đã ký hợp đồng cấp phép bản quyền trị giá 300 ức Yên (300 tỷ Yên) với hãng dược lớn Âu Mỹ. Tạm ứng ngay đợt 1 là 50 ức Yên, 250 ức Yên còn lại là thu nhập Milestone theo tiến độ thử nghiệm. Dự kiến thời gian phát triển khoảng 5 năm, hướng tới phê duyệt FDA Hoa Kỳ vào năm 2029.',
    proStenoNotes: {
      columnLeft: [
        '・Market: Biosimilar (特許切れ普及加速 💊)',
        '・Deal: 欧米大手 🤝 License契約 (Total 300億円)',
        '・Upfront: 一時金 50億円 (今期受領 💰)',
        '・Milestone: 最大 250億円 (治験進捗連動 🎯)',
        '・Target: 5yr Dev ➔ 2029 US FDA Approval 🇺🇸',
      ],
      columnRight: [
        'Total: 300億 🤝',
        'Upfront: 50億 💰',
        'Milestone: 250億 🎯',
        'Timeline: 5 Years ⏱️',
        '2029 FDA OK 🇺🇸',
      ],
    },
    symbolLegend: [
      { symbol: '💊', meaning: 'Dược phẩm sinh học / Thuốc' },
      { symbol: '🎯', meaning: 'Cột mốc mục tiêu Milestone' },
      { symbol: '💰', meaning: 'Tiền tạm ứng, giải ngân tài chính' },
    ],
    quiz: {
      question: 'Khoản tiền 50 ức Yên (50億円) mà công ty nhận được ngay trong kỳ này là gì?',
      options: [
        'Khoản tiền chi trả cho thử nghiệm lâm sàng động vật.',
        'Khoản tiền ký kết tạm ứng ban đầu (Upfront Payment / 契約一時金).',
        'Khoản tiền bồi thường vi phạm bản quyền từ đối tác.',
        'Doanh thu bán thuốc Biosimilar tại thị trường Mỹ.',
      ],
      correctIndex: 1,
      explanation: 'Tốc ký ghi rõ: "契約一時金として50億円を今期受領" ➔ Tiền tạm ứng ban đầu.',
    },
  },
  {
    id: 'note_extra_2',
    conferenceTitle: 'Chiến Lược Thu Hồi Carbon & Năng Lượng Hydro Sạch',
    speaker: 'Viện Trưởng Viện Nghiên Cứu Công Nghệ Năng Lượng Mới (NEDO)',
    speechDurationSec: 45,
    fullSpeechJp:
      '脱炭素社会の実現に向けて、二酸化炭素を回収・貯留するCCS技術の実証実験を北海道苫小牧沖にて実施しております。これまで累計30万トンのCO2を地下1,000メートル以深の遮蔽層へ圧入することに成功いたしました。現在の回収コストはCO2 1トンあたり約1万2,000円でございますが、新規吸収液の開発と排熱回収システムの導入により、2030年までに1トンあたり3,000円台へとコストを4分の1に低減させるロードマップを策定いたしました。これにより、鉄鋼やセメントといった脱炭素化が困難な産業のトランジションを力強く支援してまいります。',
    fullSpeechVn:
      'Hướng tới xã hội phi carbon, chúng tôi đang thử nghiệm công nghệ thu hồi và lưu trữ carbon (CCS) ngoài khơi Tomakomai, Hokkaido. Đến nay đã nén thành công lũy kế 300.000 tấn CO2 xuống tầng chắn sâu hơn 1.000m dưới lòng đất. Chi phí thu hồi hiện tại khoảng 12.000 Yên/tấn CO2, nhưng nhờ dung dịch hấp thụ mới và hệ thống thu hồi nhiệt thừa, chúng tôi đã lập lộ trình cắt giảm chi phí xuống còn 3.000 Yên/tấn (giảm 1/4) trước năm 2030, hỗ trợ mạnh mẽ ngành thép và xi măng.',
    proStenoNotes: {
      columnLeft: [
        '・Project: CCS (CO2 回収・貯留) @ Hokkaido 苫小牧 🌊',
        '・Record: 累計 30万トン CO2 ➔ 地下 1,000m 圧入完了',
        '・Cost Now: 12,000円 / ton 💸',
        '・Target 2030: 3,000円 / ton (1/4 Cut! 📉)',
        '・Support: 鉄鋼・セメントなど難脱炭素産業 🏭',
      ],
      columnRight: [
        'Hokkaido CCS 🌊',
        '300k ton CO2 🗄️',
        'Now: 12k 円/t 💸',
        '2030: 3k 円/t 📉',
        'Steel & Cement 🏭',
      ],
    },
    symbolLegend: [
      { symbol: '📉', meaning: 'Cắt giảm chi phí sâu (Cost Reduction)' },
      { symbol: '🏭', meaning: 'Ngành sản xuất công nghiệp nặng' },
    ],
    quiz: {
      question: 'Mục tiêu cắt giảm chi phí thu hồi CO2 vào năm 2030 là bao nhiêu?',
      options: [
        'Giảm từ 12.000 Yên xuống còn 6.000 Yên (giảm 50%).',
        'Giảm từ 12.000 Yên xuống mức 3.000 Yên (giảm 1/4 chi phí).',
        'Giảm từ 30.000 Yên xuống còn 12.000 Yên.',
        'Miễn phí hoàn toàn nhờ trợ cấp chính phủ.',
      ],
      correctIndex: 1,
      explanation: 'Tốc ký ghi rõ: 12,000円 ➔ 3,000円 (giảm 1/4).',
    },
  },
  {
    id: 'note_extra_3',
    conferenceTitle: 'Phân Tích Báo Cáo Tài Chính Hợp Nhất & Lợi Nhuận Thuần',
    speaker: 'Giám Đốc Tài Chính (CFO) - Tập Đoàn Bán Lẻ Đa Quốc Gia',
    speechDurationSec: 40,
    fullSpeechJp:
      '2024年2月期通期の連結決算についてご報告いたします。売上高は前期比8.5%増の2兆4,500億円、営業利益は12.3%増の1,850億円となり、いずれも過去最高を更新いたしました。円安に伴うインバウンド免税売上の急伸に加え、プライベートブランド商品の粗利率改善が業績を力強く牽引いたしました。配当につきましては、年間配当金を前期から15円増配の1株あたり85円とさせていただきます。自己資本比率も前期末の48.2%から51.5%へと向上し、財務健全性は盤石でございます。',
    fullSpeechVn:
      'Báo cáo kết quả kinh doanh hợp nhất năm tài chính kết thúc tháng 2/2024: Doanh thu tăng 8,5% đạt 2,45 nghìn tỷ Yên (2兆4500億円), lợi nhuận kinh doanh tăng 12,3% đạt 1.850 ức Yên (1850億円), đều lập kỷ lục cao nhất lịch sử. Nhờ đồng Yên yếu kích thích doanh số miễn thuế Inbound và cải thiện biên lợi nhuận hàng thương hiệu riêng PB. Cổ tức tăng 15 Yên lên 85 Yên/cổ phiếu. Tỷ lệ an toàn vốn chủ sở hữu tăng từ 48,2% lên 51,5%.',
    proStenoNotes: {
      columnLeft: [
        '・Revenue: 2兆4,500億円 (+8.5% 📈 過去最高)',
        '・Operating Profit: 1,850億円 (+12.3% 🎯 過去最高)',
        '・Driver: 円安 Inbound Duty-Free 🛍️ + PB粗利改善',
        '・Dividend: 85円 / 株 (+15円 増配 💰)',
        '・Capital Ratio: 48.2% ➔ 51.5% (財務盤石 🛡️)',
      ],
      columnRight: [
        'Rev: 2.45T 円 📈',
        'OP: 185B 円 🎯',
        'Inbound & PB 🛍️',
        'Div: 85円 (+15) 💰',
        'Equity: 51.5% 🛡️',
      ],
    },
    symbolLegend: [
      { symbol: '📈', meaning: 'Đạt đỉnh cao kỷ lục lịch sử' },
      { symbol: '🛡️', meaning: 'Vững chắc, an toàn tài chính' },
    ],
    quiz: {
      question: 'Yếu tố chính nào đã kéo doanh thu và lợi nhuận công ty đạt đỉnh kỷ lục?',
      options: [
        'Cắt giảm nhân sự tại các cửa hàng tiện lợi.',
        'Đồng Yên giảm giá đẩy mạnh bán hàng miễn thuế cho khách du lịch và cải thiện biên lợi nhuận hàng PB.',
        'Mở rộng hệ thống bán hàng sang thị trường châu Âu.',
        'Bán bớt các bất động sản không sinh lời.',
      ],
      correctIndex: 1,
      explanation: 'Tốc ký ghi rõ: "円安 Inbound Duty-Free + PB粗利改善".',
    },
  },
  {
    id: 'note_extra_4',
    conferenceTitle: 'Chiến Lược An Ninh Mạng & Ứng Phó Ransomware Tống Tiền',
    speaker: 'Chuyên Gia Cố Vấn An Ninh Mạng Quốc Gia',
    speechDurationSec: 40,
    fullSpeechJp:
      '国内企業を標的としたランサムウェア攻撃は、昨年1年間で前年比35%増加し、年間230件の被害が警察庁に報告されました。注目すべきは、中小サプライヤーを踏み台にして大企業の基幹システムへ侵入する「サプライチェーン攻撃」が全体の過半数を占めている点です。復旧までに要した平均日数は18.5日、直接的な被害額は1件あたり平均4,200万円に上ります。侵入を前提とした「ゼロトラスト」モデルの導入と、オフラインでの多重バックアップ体制の確立が急務となっております。',
    fullSpeechVn:
      'Các cuộc tấn công mã độc tống tiền Ransomware nhắm vào doanh nghiệp nội địa đã tăng 35% trong năm qua, với 230 vụ được báo cáo lên Cơ quan Cảnh sát Quốc gia. Đáng chú ý, các cuộc tấn công chuỗi cung ứng dùng nhà thầu phụ nhỏ làm bàn đạp chiếm hơn một nửa. Thời gian khắc phục trung bình mất 18,5 ngày, thiệt hại trực tiếp bình quân 42 triệu Yên/vụ. Khẩn cấp nhất hiện nay là áp dụng mô hình Zero-trust và sao lưu dữ liệu offline nhiều tầng.',
    proStenoNotes: {
      columnLeft: [
        '・Ransomware Attack: 230件 (+35% YoY ⚠️)',
        '・Pattern: Supply Chain 踏み台 (Over 50% 🎯)',
        '・Downtime: 復旧平均 18.5 Days ⏱️',
        '・Direct Loss: 4,200万円 / 件 💸',
        '・Urgent: Zero Trust 導入 + Offline Backup 🛡️',
      ],
      columnRight: [
        'Ransomware +35% ⚠️',
        'Supply Chain: 50%+ 🎯',
        'Down: 18.5 Days ⏱️',
        'Loss: 42M 円/件 💸',
        'Zero Trust 🛡️',
      ],
    },
    symbolLegend: [
      { symbol: '⚠️', meaning: 'Cảnh báo tội phạm mạng' },
      { symbol: '💸', meaning: 'Thiệt hại kinh tế trực tiếp' },
    ],
    quiz: {
      question: 'Đặc điểm đáng chú ý nhất của hơn 50% các cuộc tấn công mã độc Ransomware trong báo cáo là gì?',
      options: [
        'Tấn công trực tiếp thông qua thư điện tử giả mạo của giám đốc.',
        'Dùng các nhà cung cấp nhỏ trong chuỗi cung ứng làm bàn đạp xâm nhập hệ thống tập đoàn lớn.',
        'Đòi tiền chuộc hoàn toàn bằng tiền mặt thay vì tiền điện tử.',
        'Chỉ nhắm vào các bệnh viện và trường học.',
      ],
      correctIndex: 1,
      explanation: 'Tốc ký ghi rõ: "中小サプライヤーを踏み台にして大企業へ侵入 (サプライチェーン攻撃)".',
    },
  },
  {
    id: 'note_extra_5',
    conferenceTitle: 'Chiến Lược Giữ Chân Nhân Tài & Bình Đẳng Giới',
    speaker: 'Giám Đốc Nhân Sự (CHRO) - Ngân Hàng Đầu Tư Tokyo',
    speechDurationSec: 40,
    fullSpeechJp:
      'ダイバーシティ＆インクルージョン経営の推進状況について報告いたします。当社では女性管理職比率を2030年までに30%以上とする数値目標を掲げておりますが、今年4月時点で24.8%に達し、目標達成に順調に近づいております。男性従業員の育児休業取得率は3年連続で100%を達成し、平均取得日数も従来の14日から45日へと伸長いたしました。女性の復職率は98.5%を誇り、キャリア中断を防ぐメンター制度の拡充が功を奏しております。',
    fullSpeechVn:
      'Báo cáo về quản trị đa dạng và hòa nhập: Mục tiêu tỷ lệ nữ quản lý đạt trên 30% vào năm 2030, tính đến tháng 4 năm nay đã đạt 24,8%. Tỷ lệ nam nhân viên nghỉ thai sản đạt 100% trong 3 năm liên tiếp, số ngày nghỉ bình quân tăng từ 14 lên 45 ngày. Tỷ lệ phụ nữ quay lại làm việc sau sinh đạt 98,5% nhờ chế độ Mentor chống đứt gãy sự nghiệp.',
    proStenoNotes: {
      columnLeft: [
        '・D&I Goal: 女性管理職 (Female Mgr) 30% by 2030',
        '・Status: Now 24.8% (順調 📈)',
        '・Male Paternity Leave: 100% (3 Years Straight 👶)',
        '・Leave Days: 14 Days ➔ 45 Days (伸長 ⏱️)',
        '・Return Rate: 98.5% (Mentor System 🤝)',
      ],
      columnRight: [
        'Female Mgr: 24.8% 📈',
        'Target: 30% (2030) 🎯',
        'Male Leave: 100% 👶',
        'Duration: 45 Days ⏱️',
        'Return: 98.5% 🤝',
      ],
    },
    symbolLegend: [
      { symbol: '👶', meaning: 'Chế độ nghỉ phép chăm sóc con nhỏ' },
      { symbol: '📈', meaning: 'Tiến độ tăng trưởng sát mục tiêu' },
    ],
    quiz: {
      question: 'Tỷ lệ nam nhân viên nghỉ sinh chăm sóc con (育休) tại công ty này đạt mức nào?',
      options: [
        'Đạt 30% số lượng nhân sự.',
        'Đạt 100% trong suốt 3 năm liên tiếp.',
        'Đạt 50% nhờ chính sách khen thưởng.',
        'Chỉ có 14 người đăng ký tham gia.',
      ],
      correctIndex: 1,
      explanation: 'Tốc ký ghi rõ: "Male Paternity Leave: 100% (3 Years Straight)".',
    },
  },
];

interface Props {
  currentLevel: JLPTLevel;
}

export const ConferenceNoteTakingLab: React.FC<Props> = ({ currentLevel }) => {
  const [drills, setDrills] = useState<NoteTakingItem[]>(INITIAL_NOTE_DRILLS);
  const [loadBatchCount, setLoadBatchCount] = useState<number>(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedDrillId, setSelectedDrillId] = useState<string>(INITIAL_NOTE_DRILLS[0].id);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [userScratchNotes, setUserScratchNotes] = useState<string>('');
  const [showProNotes, setShowProNotes] = useState<boolean>(false);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleLoadMore = () => {
    const nextBatchNum = loadBatchCount + 1;
    const startIndex = ((nextBatchNum - 1) * 5) % EXTRA_NOTE_DRILLS.length;
    let batch = EXTRA_NOTE_DRILLS.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_NOTE_DRILLS.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextBatchNum}_${idx}`,
    }));

    setDrills((prev) => [...prev, ...uniqueBatch]);
    setLoadBatchCount(nextBatchNum);
    setNotice(`Đã nạp thêm 5 bài luyện tốc ký hội nghị đợt ${nextBatchNum}! (Tổng hiện có: ${drills.length + uniqueBatch.length} bài)`);
    speechService.playSuccessSound();
    setTimeout(() => setNotice(null), 4000);
  };

  const currentDrill = drills.find((d) => d.id === selectedDrillId) || drills[0];

  const handlePlaySpeech = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speechService.speak(currentDrill.fullSpeechJp, 1.0);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-10">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c132c] via-[#091024] to-[#060a16] border border-blue-600/30 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="text-blue-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Phân Hệ 3 (PH3) · Lab Nghe Nói & Phản Xạ Thực Chiến
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-jp">メモ取り・キーワード聴取ラボ</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400 font-semibold">Vũ khí tối thượng cho JLPT Choukai Mondai 5 & Hội nghị</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Tốc Ký Hội Nghị & Bắt Từ Khóa Tai Nghe{' '}
              <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
                (Conference Note-Taking & Keyword Catching Lab)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Giải phóng bộ não khỏi hiện tượng "nghe tai này trôi tai kia" khi diễn giả nói liên tục: Luyện phương pháp phân đôi cột ghi chép, sử dụng hệ ký hiệu tốc ký chuyên nghiệp (➔, ↑, ⚠️, 🤝, 💰) để tóm gọn số liệu và quyết định chiến lược.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-xl border border-dashed border-blue-500/60 bg-blue-950/30 hover:bg-blue-950/60 text-blue-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-blue-400"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              <span>+5 Tải thêm bài luyện tốc ký</span>
              {loadBatchCount > 0 && (
                <span className="text-[10px] bg-blue-500 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
                  +{loadBatchCount * 5}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      {notice && (
        <div className="bg-emerald-950/60 border border-emerald-700/60 text-emerald-200 text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-emerald-400 hover:text-white cursor-pointer text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Ribbon Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {drills.map((d, idx) => {
          const isSelected = d.id === selectedDrillId;
          return (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDrillId(d.id);
                setUserChoice(null);
                setShowResult(false);
                setUserScratchNotes('');
                setShowProNotes(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 text-left ${
                isSelected
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md shadow-blue-950/50'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate max-w-[200px]">Bài #{idx + 1}: {d.conferenceTitle}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Simulation: Audio + Interactive Scratchpad + Pro Steno Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Conference Audio & Scratchpad */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/40 uppercase font-bold">
                  Diễn giả: {currentDrill.speaker}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-1.5">{currentDrill.conferenceTitle}</h2>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Thời lượng phát biểu: ~{currentDrill.speechDurationSec} giây</span>
                </div>
              </div>

              {/* Play / Stop Button */}
              <button
                onClick={handlePlaySpeech}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-lg ${
                  isPlayingAudio
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40 animate-pulse'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingAudio ? 'Dừng phát biểu' : 'Phát bài nói & Bắt đầu ghi'}</span>
              </button>
            </div>

            {/* Interactive User Steno Notepad */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span>Sổ Tốc Ký Của Bạn (Vừa nghe vừa ghi chép từ khóa / số liệu):</span>
                <button
                  onClick={() => setUserScratchNotes('')}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Xóa trắng</span>
                </button>
              </div>

              <textarea
                value={userScratchNotes}
                onChange={(e) => setUserScratchNotes(e.target.value)}
                placeholder="VD: Smart factory ➔ AI inspect 99.8%... staff 30 ➔ 8... ROI 1.2yr... 50M yen/yr reskilling..."
                className="w-full h-28 bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-amber-300 font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />

              {/* Quick Symbols Palette */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                <span className="text-[10px] text-slate-400 font-mono font-bold">Chèn ký hiệu nhanh:</span>
                {['➔', '↑', '↓', '⚠️', '🤝', '💰', '🎯', '⏱️', '📈'].map((sym) => (
                  <button
                    key={sym}
                    onClick={() => setUserScratchNotes((prev) => `${prev} ${sym} `)}
                    className="px-2 py-0.5 rounded bg-slate-900 hover:bg-blue-600/30 text-slate-300 hover:text-blue-300 border border-slate-800 font-mono transition-colors cursor-pointer text-xs"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Pro Steno Notes Comparison */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowProNotes(!showProNotes)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-300 hover:text-white border border-blue-900/40 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>{showProNotes ? 'Ẩn bản tốc ký mẫu' : 'Đối Chiếu Với Bản Tốc Ký Của Thông Dịch Viên Chuyên Nghiệp'}</span>
              </button>

              {showProNotes && (
                <div className="mt-3 space-y-3 animate-fadeIn">
                  {/* Pro 2-Column Note Table */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-900/60 space-y-1.5">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                        Cột 1: Cấu Trúc Luận Điểm (Logic Stream)
                      </span>
                      {currentDrill.proStenoNotes.columnLeft.map((line, idx) => (
                        <p key={idx} className="text-slate-200">{line}</p>
                      ))}
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-900/60 space-y-1.5">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        Cột 2: Tốc Ký Siêu Tốc (Micro Symbols)
                      </span>
                      {currentDrill.proStenoNotes.columnRight.map((line, idx) => (
                        <p key={idx} className="text-amber-300">{line}</p>
                      ))}
                    </div>
                  </div>

                  {/* Full Transcript (Reference) */}
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                      Toàn văn bài nói của diễn giả (Transcript):
                    </span>
                    <p className="text-slate-300 font-jp leading-relaxed">{currentDrill.fullSpeechJp}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Key Fact Check Quiz */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1427] border border-blue-700/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Kiểm Tra Trí Nhớ & Số Liệu Tốc Ký
                </h3>
              </div>
              <span className="text-xs font-mono text-blue-400 font-bold">Điểm: {score}</span>
            </div>

            <p className="text-xs text-slate-300">
              Dựa vào bản ghi chú bạn vừa tốc ký, hãy trả lời câu hỏi cốt lõi sau:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs sm:text-sm font-sans font-bold text-white leading-relaxed bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                {currentDrill.quiz.question}
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {currentDrill.quiz.options.map((opt, oIdx) => {
                  const isChosen = userChoice === oIdx;
                  const isCorrect = oIdx === currentDrill.quiz.correctIndex;

                  let btnStyle = 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800';
                  if (showResult) {
                    if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                    else if (isChosen) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                    else btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-50';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={showResult}
                      onClick={() => {
                        setUserChoice(oIdx);
                        setShowResult(true);
                        if (isCorrect) {
                          setScore((prev) => prev + 10);
                          speechService.playSuccessSound();
                        }
                      }}
                      className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="font-mono text-slate-400 shrink-0 mt-0.5">[{oIdx + 1}]</span>
                      <span className="flex-1 leading-snug">{opt}</span>
                      {showResult && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                      {showResult && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {showResult && (
                <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                  <div
                    className={`text-xs font-bold flex items-center gap-1.5 ${
                      userChoice === currentDrill.quiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {userChoice === currentDrill.quiz.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Bắt trúng từ khóa & số liệu! (+10 điểm)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Bỏ sót số liệu then chốt! Xem giải mã:</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    {currentDrill.quiz.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
