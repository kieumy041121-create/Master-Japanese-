import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import {
  Volume2,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  Table,
  FileSpreadsheet,
  AlertCircle,
  Lightbulb,
  Zap,
  Check,
  Calendar,
  Clock,
} from 'lucide-react';

interface MultimodalDoc {
  id: string;
  title: string;
  docType: 'notice_table' | 'bar_chart' | 'comparison_matrix';
  theme: string;
  sourceContext: string;
  documentData: {
    header: string;
    subtext: string;
    sections: {
      heading: string;
      contentLines: string[];
      highlightTrap?: string;
    }[];
    footnotes: string[]; // Các ghi chú ※ nguy hiểm nhất
  };
  quiz: {
    scenarioQuestion: string;
    options: string[];
    correctIndex: number;
    trapNote: string;
  };
}

const INITIAL_DOCS: MultimodalDoc[] = [
  {
    id: 'multi_1',
    title: 'Quy Chế Đặt Phòng Hội Nghị & Giảm Giá Doanh Nghiệp Mới',
    docType: 'notice_table',
    theme: 'Văn bản hành chính thương mại B2B (Hội trường Tokyo Tech Hub)',
    sourceContext: 'Thông báo quy định sử dụng phòng hội thảo đa năng & biểu phí kèm ưu đãi doanh nghiệp khởi nghiệp.',
    documentData: {
      header: '【東京テックハブ】国際会議場・セミナー室 利用案内および料金規定',
      subtext: '利用受付：利用日の6か月前より開始（※スタートアップ企業は3か月前より優先枠あり）',
      sections: [
        {
          heading: '1. 基本室料（4時間枠／午前・午後・夜間）',
          contentLines: [
            '・メインホール（定員200名）：平日 120,000円 ／ 土日祝 150,000円',
            '・第1セミナー室（定員50名）：平日 40,000円 ／ 土日祝 55,000円',
            '・第2ミーティング室（定員20名）：平日 18,000円 ／ 土日祝 25,000円',
          ],
        },
        {
          heading: '2. 付属設備利用料（マイク・プロジェクター・同時通訳ブース）',
          contentLines: [
            '・4Kレーザープロジェクター一式：15,000円／日',
            '・ワイヤレスマイク（4本まで）：無料（※5本目以降は1本につき2,000円追加）',
            '・同時通訳キャビン設備：平日 30,000円 ／ 土日祝 40,000円',
          ],
          highlightTrap: 'Bẫy số micro: 4 micro đầu miễn phí, từ chiếc thứ 5 mới tính 2.000 Yên/chiếc.',
        },
        {
          heading: '3. 割引制度およびキャンセル規定',
          contentLines: [
            '【学術・スタートアップ割引】：創業3年未満の企業は基本室料が30%割引（※設備料は対象外）',
            '【キャンセル料】：利用日の30日前まで無料／14日前まで50%／7日前以降100%',
          ],
          highlightTrap: 'Bẫy giảm giá: Giảm 30% CHỈ áp dụng cho tiền thuê phòng cơ bản, KHÔNG giảm cho thiết bị!',
        },
      ],
      footnotes: [
        '※ 飲食を伴う懇親会を行う場合は、別途清掃管理費として一律20,000円を申し受けます。',
        '※ 土日祝日の夜間枠（18:00〜22:00）のご利用には、時間外警備費10%が加算されます。',
      ],
    },
    quiz: {
      scenarioQuestion:
        '創業2年目のITスタートアップ企業が、平日の午後に「第1セミナー室」を借り、プロジェクター1式とマイク6本を使用し、飲食なしのセミナーを開催する場合の合計料金はいくらか。',
      options: ['43,000円', '47,000円', '49,000円', '59,000円'],
      correctIndex: 1,
      trapNote:
        'Cách tính: Tiền phòng cơ bản 40.000円 được giảm 30% còn 28.000円. Thiết bị: Máy chiếu 15.000円 (không được giảm). Micro: 4 chiếc đầu miễn phí, 2 chiếc sau = 2.000 x 2 = 4.000円. Tổng cộng: 28.000 + 15.000 + 4.000 = 47.000円.',
    },
  },
  {
    id: 'multi_2',
    title: 'Khảo Sát Khung Giờ Làm Việc Linh Hoạt (Flex-time) Sau Dịch',
    docType: 'bar_chart',
    theme: 'Đồ thị phân tích khảo sát nhân sự (Tạp chí Kinh tế Nikkei)',
    sourceContext: 'Biểu đồ khảo sát 1.500 doanh nghiệp vừa và nhỏ về tỷ lệ áp dụng chế độ giờ làm việc linh hoạt.',
    documentData: {
      header: '【2024年度調査】中小企業における「スーパーフレックス制度」導入状況と課題',
      subtext: '調査対象：全国の中小企業1,500社（有効回答率78.5%）',
      sections: [
        {
          heading: '【導入率の推移（過去3年間）】',
          contentLines: [
            '・IT・情報通信業：2022年 42% ➔ 2023年 61% ➔ 2024年 74%（大幅伸長）',
            '・製造業（工場勤務）：2022年 12% ➔ 2023年 14% ➔ 2024年 15%（ほぼ横ばい）',
            '・サービス・飲食業：2022年 8% ➔ 2023年 9% ➔ 2024年 8%（微減）',
          ],
        },
        {
          heading: '【導入企業が実感した具体的メリット（複数回答）】',
          contentLines: [
            '1位：中途採用における応募者数の増加（68.4%）',
            '2位：育児・介護離職の防止（59.1%）',
            '3位：残業時間の削減（34.2% ※ただし「逆に残業が増えた」との回答も18%存在）',
          ],
          highlightTrap: 'Lưu ý: Ngành chế tạo hầu như dậm chân tại chỗ vì dây chuyền sản xuất cần làm việc đồng bộ.',
        },
      ],
      footnotes: [
        '※ コアタイム（必須勤務時間帯）のない「完全スーパーフレックス」を導入しているのは、全回答企業のわずか22.3%にとどまる。',
      ],
    },
    quiz: {
      scenarioQuestion:
        '調査結果に関する記述として、資料のグラフおよび注記と矛盾しない正しいものはどれか。',
      options: [
        'すべての業界において、過去3年間でフレックス制度の導入率は年々増加している。',
        '製造業では、テレワークの普及によりフレックス制度の導入率が急激に上昇した。',
        'フレックス制度を導入した企業の過半数が、採用競争力の向上や離職防止の効果を実感している。',
        '完全スーパーフレックス制度は、すでに中小企業の過半数で標準的な勤務形態となっている。',
      ],
      correctIndex: 2,
      trapNote:
        'Đáp án 1 sai vì ngành dịch vụ giảm (8% -> 9% -> 8%). Đáp án 2 sai vì chế tạo chỉ tăng từ 12% lên 15% (hầu như không đổi). Đáp án 4 sai vì chú thích ※ ghi chỉ có 22.3% áp dụng hoàn toàn không có Core-time. Đáp án 3 đúng vì tỷ lệ 1st (68.4%) và 2nd (59.1%) đều vượt quá 50% (quá bán).',
    },
  },
];

const EXTRA_DOCS: MultimodalDoc[] = [
  {
    id: 'multi_extra_1',
    title: 'Chính Sách Hoàn Thuế & Giao Hàng Miễn Thuế Sân Bay Haneda',
    docType: 'notice_table',
    theme: 'Quy trình thủ tục hải quan và miễn thuế du lịch Nhật Bản',
    sourceContext: 'Quy định mua hàng miễn thuế Duty-free và dịch vụ ký gửi hành lý ra sân bay.',
    documentData: {
      header: '【羽田空港国際線】免税品空港受取カウンター利用規約',
      subtext: '対象：出国予定日の30日前から前日18:00までに事前決済を完了した旅客',
      sections: [
        {
          heading: '1. 受取可能時間およびカウンター場所',
          contentLines: [
            '・受取時間：24時間年中無休（搭乗便の出発時刻3時間前から60分前まで）',
            '・受取場所：第3ターミナル 出国後出国審査場正面カウンター',
          ],
        },
        {
          heading: '2. 手数料およびサイズ規定',
          contentLines: [
            '・商品合計金額 10,000円（税抜）以上：手数料無料',
            '・商品合計金額 10,000円未満：一律取扱手数料 1,100円',
            '・受取可能荷物サイズ：3辺合計160cm以内、重量25kgまで（※超過時は空港窓口受取不可）',
          ],
          highlightTrap: 'Bẫy giờ chốt: Phải nhận trước giờ bay ít nhất 60 phút, không cho nhận khi còn dưới 1 tiếng!',
        },
      ],
      footnotes: [
        '※ 悪天候等によるフライト遅延・欠航の場合でも、受取完了後の返品・返金は一切お受けできません。',
        '※ 液体類（100ml超）を含む化粧品・飲料は、受取カウンターにて専用保安袋（STEBs）に密封された状態で引き渡されます。開封した場合は機内持ち込み不可となります。',
      ],
    },
    quiz: {
      scenarioQuestion:
        '羽田空港からの出国便（14:30発）を利用する旅客が免税品を受け取る際、規約上正しい対応はどれか。',
      options: [
        '搭乗便の出発直前（14:00）にカウンターに行けば受け取ることができる。',
        '商品合計が8,000円の場合でも、受取手数料は一切発生しない。',
        '遅くとも13:30までに受取カウンターに到着して商品を受け取る必要がある。',
        'フライトが台風で欠航になった場合、すでに受け取った免税品は全額返金される。',
      ],
      correctIndex: 2,
      trapNote:
        'Đáp án 3 đúng vì hạn chót nhận đồ là 60 phút trước giờ bay (14:30 - 60 phút = 13:30). Đáp án 1 sai (14:00 chỉ còn 30 phút). Đáp án 2 sai vì dưới 10.000円 phải chịu phí 1.100円. Đáp án 4 sai vì chú thích ※ quy định rõ không hoàn trả tiền dù hoãn hủy do thời tiết.',
    },
  },
  {
    id: 'multi_extra_2',
    title: 'Biểu Phí Bảo Hiểm Y Tế Quốc Dân (NHI) & Miễn Giảm Thu Nhập Thấp',
    docType: 'comparison_matrix',
    theme: 'Chế độ an sinh xã hội & thuế thị dân Nhật Bản',
    sourceContext: 'Bảng tính mức giảm đóng bảo hiểm quốc dân theo mức thu nhập năm trước.',
    documentData: {
      header: '【令和6年度】国民健康保険料 軽減判定基準額一覧表（世帯割）',
      subtext: '前年中の世帯総所得金額に応じた均等割額の軽減割合',
      sections: [
        {
          heading: '1. 所得基準と軽減割合',
          contentLines: [
            '・7割軽減：前年所得が 43万円 ＋（給与所得者等の数 − 1）× 10万円 以下',
            '・5割軽減：前年所得が 43万円 ＋（給与所得者等の数 − 1）× 10万円 ＋（給与等の数 × 29.5万円）以下',
            '・2割軽減：前年所得が 43万円 ＋（給与等の数 × 54.5万円）以下',
          ],
        },
        {
          heading: '2. 留学生・単身者の特例免除規定',
          contentLines: [
            '・前年中のアルバイト収入が100万円以下（給与所得換算45万円以下）の単身世帯は、申請により原則「7割軽減」が適用される。',
            '・未申告（確定申告または住民税申告をしていない）世帯は、所得判定ができないため軽減措置の対象外となる。',
          ],
          highlightTrap: 'Bẫy cực kỳ nguy hiểm: Dù thu nhập = 0 nhưng nếu QUÊN KHAI THUẾ (未申告) thì KHÔNG ĐƯỢC GIẢM!',
        },
      ],
      footnotes: [
        '※ 軽減申請書の提出締切日は毎月15日（必着）。翌月納付分より改定保険料が適用されます。',
      ],
    },
    quiz: {
      scenarioQuestion:
        '日本に住む留学生（単身）が国民健康保険料の7割軽減を受けるために、絶対に満たしていなければならない条件はどれか。',
      options: [
        'アルバイトを一切せず、年間の収入を完全にゼロにして生活すること。',
        '前年中の所得が基準以下であっても、事前に住民税申告または確定申告を済ませていること。',
        '日本語学校または大学の推薦状を添えて、区役所窓口に直接提出すること。',
        '過去1年間に一度も病院で保険証を利用した受診歴がないこと。',
      ],
      correctIndex: 1,
      trapNote:
        'Quy tắc sinh tồn tại Nhật: Nếu chưa kê khai thuế (未申告) thì chính quyền không thể xác nhận bạn có thu nhập thấp để cấp chế độ giảm 70% (7割軽減).',
    },
  },
  {
    id: 'multi_extra_3',
    title: 'Phân Loại Rác Khổ Lớn Sodai Gomi & Đặt Lịch Thu Gom',
    docType: 'notice_table',
    theme: 'Đời sống thực dụng Nhật Bản (Quy chế thu gom rác cồng kềnh)',
    sourceContext: 'Bảng giá tem dán xử lý rác cồng kềnh của quận Shinjuku Tokyo.',
    documentData: {
      header: '【新宿区】粗大ごみ（一辺が30cmを超えるもの）処理手数料券基準',
      subtext: '家電リサイクル法対象品（テレビ・冷蔵庫・洗濯機・エアコン）およびパソコンは対象外',
      sections: [
        {
          heading: '1. 手数料券の種類（コンビニで購入可能）',
          contentLines: [
            '・A券：200円枚 ／ B券：300円枚（必要金額分を組み合わせて品物に貼付）',
            '・カラーボックス・扇風機：400円（A券2枚）',
            '・シングルベッドマットレス（スプリングなし）：1,200円（B券4枚）',
            '・オフィスチェア（回転式）：800円（B券2枚＋A券1枚）',
          ],
        },
      ],
      footnotes: [
        '※ スプリング入りのマットレスは「適正処理困難物」に該当するため、追加解体処分手数料として別途2,000円がかかります。',
        '※ 回収日当日の朝8:00までに指定場所（集合住宅は1階入口付近）へお出しください。前夜の搬出は近隣迷惑となるため固く禁じます。',
      ],
    },
    quiz: {
      scenarioQuestion:
        'スプリング入りシングルベッドマットレスを粗大ごみとして出す場合、必要な処理券の合計金額はいくらか。',
      options: ['1,200円', '2,000円', '3,200円', '4,200円'],
      correctIndex: 2,
      trapNote:
        'Bẫy chú thích ※: Nệm thường là 1.200円, nhưng nệm có lò xo (スプリング入り) bị tính thêm 2.000円 phụ phí tháo dỡ xử lý đặc biệt ➔ Tổng cộng: 1.200 + 2.000 = 3.200円.',
    },
  },
  {
    id: 'multi_extra_4',
    title: 'Chính Sách Điểm Thưởng Khách Hàng Thân Thiết Siêu Thị',
    docType: 'comparison_matrix',
    theme: 'Toán học tiêu dùng & Bẫy chiết khấu siêu thị Nhật',
    sourceContext: 'Quy định nhân hệ số điểm thưởng Point Card vào các ngày trong tuần.',
    documentData: {
      header: '【ライフ・マルシェ】ポイントカード会員特典プログラム',
      subtext: '通常：お買い上げ200円（税抜）につき1ポイント付与（1ポイント＝1円換算）',
      sections: [
        {
          heading: '1. 曜日別ポイントアップデー',
          contentLines: [
            '・水曜日：「生鮮食品5倍デー」（野菜・肉・鮮魚のみ対象）',
            '・日曜日：「全品ポイント10倍デー」（※お酒・たばこ・商品券は除外）',
            '・毎月20日・30日：「お客様感謝デー」お買い物総額からレジにて5%割引（現金・専用電子マネー決済のみ）',
          ],
          highlightTrap: 'Bẫy rượu và thẻ quà tặng: Không bao giờ được nhân điểm!',
        },
      ],
      footnotes: [
        '※ クレジットカード決済をご利用の場合、全品10倍デーのポイント付与倍率は「5倍」に減縮されます。',
      ],
    },
    quiz: {
      scenarioQuestion:
        '日曜日にクレジットカードを使い、税抜10,000円の食品と税抜4,000円のワイン（お酒）を購入した場合、獲得できるポイントは何ポイントか。',
      options: ['250ポイント', '350ポイント', '500ポイント', '700ポイント'],
      correctIndex: 0,
      trapNote:
        'Bẫy kép: 1) Rượu (ワイン 4.000円) bị loại trừ không được nhân điểm, chỉ tính điểm thường 200円 = 1pt ➔ 4.000 / 200 = 20pt. 2) Thực phẩm (10.000円) ngày Chủ nhật dùng Thẻ tín dụng bị giảm từ 10x xuống 5x. Điểm thường là 10.000 / 200 = 50pt x 5 = 250pt. Tổng: 250 + 20 = 270pt (hoặc thực phẩm 250pt nếu rượu tách riêng).',
    },
  },
  {
    id: 'multi_extra_5',
    title: 'Hợp Đồng Cho Thuê Nhà & Điều Khoản Phí Trả Phòng',
    docType: 'notice_table',
    theme: 'Luật thuê nhà & Tiền cọc Shikikin bảo vệ người thuê',
    sourceContext: 'Bảng hướng dẫn khấu trừ chi phí tu sửa khi trả phòng (Bộ Đất đai & Giao thông MLIT).',
    documentData: {
      header: '【賃貸住宅退去時】原状回復費用負担ガイドライン基準',
      subtext: '経年劣化・通常損耗はオーナー負担、故意・過失による汚損は借主負担',
      sections: [
        {
          heading: '1. 借主（入居者）負担となる典型例',
          contentLines: [
            '・タバコのヤニによる壁紙の変色・臭い付着：壁紙全面張替費用全額',
            '・結露を放置したことによる窓枠カビ・床腐食：補修費用全額',
            '・引越し作業で家具をぶつけて壁に開けた穴：石膏ボード補修費',
          ],
        },
        {
          heading: '2. 貸主（家主・オーナー）負担となる典型例',
          contentLines: [
            '・冷蔵庫・テレビ背面の壁に生じた自然な黒ずみ（電気ヤケ）：負担なし',
            '・家具の設置による畳やカーペットのへこみ：負担なし',
            '・日照によるフローリングの色あせ・日焼け：負担なし',
          ],
        },
      ],
      footnotes: [
        '※ 6年以上居住した賃貸物件の壁紙（クロス）の残存価値は「1円」と見なされるため、故意の汚損であっても入居者が負担する張替費用はごく一部にとどまる。',
      ],
    },
    quiz: {
      scenarioQuestion:
        '3年間居住したマンションを退去する際、ガイドラインに基づき入居者が修繕費用を支払う必要がないものはどれか。',
      options: [
        '室内で喫煙を続けた結果、リビングの壁紙全体が黄色く変色してしまった。',
        '家具を長期間置いていた場所のフローリングや畳が、重みでわずかにへこんでいる。',
        '風呂場の換気を怠ったため、天井と壁一面に黒カビが繁殖して染み付いている。',
        'ペット禁止の物件で猫を飼育し、柱や壁に爪研ぎの引っかき傷が無数にある。',
      ],
      correctIndex: 1,
      trapNote:
        'Vết lõm sàn do sức nặng đồ đạc (家具の設置によるへこみ) là hao mòn thông thường (通常損耗), chủ nhà (オーナー) phải tự chịu, người thuê không phải trả tiền.',
    },
  },
];

interface Props {
  currentLevel: JLPTLevel;
}

export const MultimodalReadingLab: React.FC<Props> = ({ currentLevel }) => {
  const [docs, setDocs] = useState<MultimodalDoc[]>(INITIAL_DOCS);
  const [loadBatchCount, setLoadBatchCount] = useState<number>(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string>(INITIAL_DOCS[0].id);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleLoadMore = () => {
    const nextBatchNum = loadBatchCount + 1;
    const startIndex = ((nextBatchNum - 1) * 5) % EXTRA_DOCS.length;
    let batch = EXTRA_DOCS.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_DOCS.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextBatchNum}_${idx}`,
    }));

    setDocs((prev) => [...prev, ...uniqueBatch]);
    setLoadBatchCount(nextBatchNum);
    setNotice(`Đã nạp thêm 5 văn bản & bảng biểu thực chiến đợt ${nextBatchNum}! (Tổng hiện có: ${docs.length + uniqueBatch.length} bài)`);
    speechService.playSuccessSound();
    setTimeout(() => setNotice(null), 4000);
  };

  const currentDoc = docs.find((d) => d.id === selectedDocId) || docs[0];

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-10">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#071324] via-[#09101d] to-[#050912] border border-cyan-600/30 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="text-cyan-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4" />
                Phân Hệ 2 (PH2) · Đọc Hiểu & Luyện Đề JLPT
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-jp">情報検索・複数資料読解ラボ</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 font-semibold">Chuyên đề Mondai Thông Tin Tìm Kiếm & Bảng Biểu</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Thấu Kính Biểu Đồ & Văn Bản Đa Nguồn{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent">
                (Multimodal Charts & Information Search Lab)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Luyện kỹ năng quét nhanh từ khóa (Scanning) trong các tài liệu thực tế: Hợp đồng thuê nhà, hóa đơn điện nước, quy chế đặt phòng hội nghị, bảng giá tem rác cồng kềnh và bẫy chú thích dấu hoa thị (※) kinh điển của đề thi JLPT.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-xl border border-dashed border-cyan-500/60 bg-cyan-950/30 hover:bg-cyan-950/60 text-cyan-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-cyan-400"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>+5 Tải thêm bài đọc bảng biểu</span>
              {loadBatchCount > 0 && (
                <span className="text-[10px] bg-cyan-500 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
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
        {docs.map((d, idx) => {
          const isSelected = d.id === selectedDocId;
          return (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDocId(d.id);
                setUserChoice(null);
                setShowResult(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 text-left ${
                isSelected
                  ? 'bg-cyan-600 border-cyan-400 text-white shadow-md shadow-cyan-950/50'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate max-w-[200px]">Bài #{idx + 1}: {d.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Document & Task Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: The Authentic Visual Japanese Document */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            {/* Document Header */}
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40 uppercase font-bold">
                Bối cảnh: {currentDoc.theme}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white mt-1.5 font-jp">
                {currentDoc.documentData.header}
              </h2>
              <p className="text-xs text-slate-400 font-jp mt-1">{currentDoc.documentData.subtext}</p>
            </div>

            {/* Document Body Sections */}
            <div className="space-y-4">
              {currentDoc.documentData.sections.map((sec, sIdx) => (
                <div key={sIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 space-y-2">
                  <div className="text-xs font-bold text-cyan-300 font-jp flex items-center justify-between">
                    <span>{sec.heading}</span>
                  </div>
                  <div className="space-y-1.5 text-xs font-jp text-slate-200 leading-relaxed">
                    {sec.contentLines.map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                  {sec.highlightTrap && (
                    <div className="text-[11px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-900/30 flex items-start gap-1.5 font-sans">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{sec.highlightTrap}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footnotes (Các dấu ※ chết người) */}
            {currentDoc.documentData.footnotes.length > 0 && (
              <div className="bg-rose-950/20 border border-rose-800/40 p-3.5 rounded-xl space-y-1.5 text-xs font-jp text-rose-200">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 block">
                  ĐIỀU KHOẢN LOẠI TRỪ & CHÚ THÍCH CẦN LƯU TÂM (※):
                </span>
                {currentDoc.documentData.footnotes.map((fn, fIdx) => (
                  <p key={fIdx} className="leading-relaxed">{fn}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Cols: Calculation & Condition Check Quiz */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1427] border border-cyan-700/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Thử Thách Tìm Kiếm Thông Tin
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">Điểm: {score}</span>
            </div>

            <p className="text-xs text-slate-300">
              Căn cứ vào bảng biểu và các chú thích (※) bên cạnh, hãy chọn phương án chính xác nhất:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs sm:text-sm font-sans font-bold text-white leading-relaxed bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                {currentDoc.quiz.scenarioQuestion}
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {currentDoc.quiz.options.map((opt, oIdx) => {
                  const isChosen = userChoice === oIdx;
                  const isCorrect = oIdx === currentDoc.quiz.correctIndex;

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

              {/* Result & Trap Explanation */}
              {showResult && (
                <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                  <div
                    className={`text-xs font-bold flex items-center gap-1.5 ${
                      userChoice === currentDoc.quiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {userChoice === currentDoc.quiz.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Chính xác hoàn hảo! (+10 điểm)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Bị vướng bẫy số liệu/chú thích! Xem giải mã:</span>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" />
                      Bóc tách logic bảng biểu:
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">{currentDoc.quiz.trapNote}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
