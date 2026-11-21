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
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  Zap,
  Check,
  PhoneCall,
  Smile,
} from 'lucide-react';

interface ClaimScenario {
  id: string;
  industry: string;
  title: string;
  customerRageLevel: 'Vừa phải' | 'Nghiêm trọng' | 'Cực kỳ giận dữ';
  complaintAudioText: string;
  complaintVn: string;
  fourStepsResponse: {
    step1Apology: string; // Xin lỗi vì sự bất tiện
    step2FactCheck: string; // Xác minh sự thật
    step3Solution: string; // Đưa ra giải pháp thay thế
    step4Gratitude: string; // Cảm ơn và ngăn tái phát
  };
  goldenPhrases: string[];
  tabooPhrases: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const INITIAL_CLAIMS: ClaimScenario[] = [
  {
    id: 'claim_1',
    industry: 'Nhà hàng & Khách sạn (Hospitality)',
    title: 'Khách VIP phát hiện sợi tóc trong món ăn cao cấp Kaiseki',
    customerRageLevel: 'Cực kỳ giận dữ',
    complaintAudioText:
      'ちょっと店長呼んでくれる？！接待で大事なお客様をお連れしてるのに、料理の中に髪の毛が入ってたんだけど！衛生管理どうなってんの？！恥かかされたんだけど！',
    complaintVn:
      '"Gọi ngay quản lý ra đây cho tôi?! Tôi đang tiếp khách quý đối tác mà trong thức ăn lại có sợi tóc là thế nào! Quản lý vệ sinh kiểu gì đấy hả?! Làm tôi bẽ mặt trước khách hàng rồi!"',
    fourStepsResponse: {
      step1Apology:
        '大変申し訳ございません。お客様の大切なご接待の席に、私どもの不手際で誠にご不快な思いをおかけしてしまいましたことを、心より深くお詫び申し上げます。',
      step2FactCheck:
        '早急にお料理をお下げし、厨房責任者とともに衛生状況および調理工程を直ちに確認してまいります。',
      step3Solution:
        'もしよろしければ、至急料理長が別室にて新しく特選料理をお作り直しいたしますが、いかがでございましょうか。また、本日のご飲食代金は全額当店の責任としてご請求いたしません。',
      step4Gratitude:
        '貴重なご指摘をいただき、心より感謝申し上げます。今後二度とこのようなことが起こらぬよう、全従業員の衛生検査と調理帽の着用確認を徹底いたします。',
    },
    goldenPhrases: [
      '大変ご不快な思いをおかけいたしました',
      '私どもの不手際で〜',
      '心より深くお詫び申し上げます',
      '早急に事実関係を確認の上〜',
    ],
    tabooPhrases: [
      '「こちらの手落ちではない可能性も…」 (Bào chữa)',
      '「でも髪の毛の色がうちのスタッフと違う…」 (Đổ lỗi)',
      '「交換すればいいですか？」 (Thái độ cộc lốc)',
    ],
    quiz: {
      question:
        'Khi khách hàng vừa giận dữ chỉ vào đĩa thức ăn có dị vật, câu nói đầu tiên của nhân viên PHẢI là gì?',
      options: [
        '「厨房に確認してまいりますので、少々お待ちください。」',
        '「大変申し訳ございません。ご不快な思いをおかけし深くお詫び申し上げます。」',
        '「当店では毎日厳重に点検しておりますので、不思議ですね。」',
        '「すぐに新しいものとお取替えすればよろしいでしょうか。」',
      ],
      correctIndex: 1,
      explanation:
        'Nguyên tắc vàng số 1 khi xử lý Claim tại Nhật: Bất luận đúng sai, trước tiên phải xin lỗi vì đã làm khách hàng cảm thấy khó chịu (不快感へのお詫び). Tuyệt đối không phân bua hay vội vã đổ lỗi.',
    },
  },
  {
    id: 'claim_2',
    industry: 'Thương mại Điện tử & Bán lẻ (E-Commerce)',
    title: 'Giao nhầm quà sinh nhật gấp cho trẻ nhỏ vào đúng ngày sinh nhật',
    customerRageLevel: 'Nghiêm trọng',
    complaintAudioText:
      '今日息子の誕生日だから日時指定で頼んだのに、届いた箱を開けたら全く別の女の子用のおもちゃが入ってたんですよ！今日渡せなかったら意味ないじゃないですか！どうしてくれるんですか？！',
    complaintVn:
      '"Hôm nay là sinh nhật con trai tôi nên tôi mới đặt chỉ định giờ giao hàng, thế mà mở hộp ra lại là đồ chơi bé gái hoàn toàn khác! Không tặng được hôm nay thì còn ý nghĩa gì nữa! Các người tính đền bù thế nào đây?!"',
    fourStepsResponse: {
      step1Apology:
        'せっかくのお子様の大切なお誕生日に、誤配送により大変ご迷惑とご失望をおかけいたしましたことを、深くお詫び申し上げます。',
      step2FactCheck:
        '直ちに注文番号を確認いたしましたところ、倉庫での出荷ラベル貼り付けミスが発生しておりました。',
      step3Solution:
        '本日中に専任スタッフが直接ご自宅まで正しい商品をハンドキャリーでお届けにあがります。誤ってお届けしたお品物はそのままプレゼントとさせていただきます。',
      step4Gratitude:
        'この度は私どもの重大なミスをご指摘いただき誠にありがとうございました。二度と誤出荷を起こさぬよう出荷検品システムを改修いたします。',
    },
    goldenPhrases: [
      '大変ご失望をおかけいたしました',
      '直ちに確認いたしましたところ〜',
      '本日中に専任スタッフがお届けにあがります',
    ],
    tabooPhrases: [
      '「運送会社の配送ミスですので…」 (Đùn đẩy trách nhiệm)',
      '「返送していただければ返金します」 (Không giải quyết vấn đề cốt lõi)',
    ],
    quiz: {
      question: 'Khi nhận cuộc gọi phàn nàn về việc giao nhầm hàng ngày sinh nhật, điều tối kỵ là gì?',
      options: [
        'Lắng nghe hết câu chuyện của khách mà không ngắt lời.',
        'Đổ lỗi cho đơn vị vận chuyển bên thứ ba và yêu cầu khách tự khiếu nại nhà xe.',
        'Đề xuất phương án giao bù hỏa tốc ngay trong ngày.',
        'Chân thành xin lỗi vì đã làm hỏng ngày vui của em bé.',
      ],
      correctIndex: 1,
      explanation:
        'Trong văn hóa doanh nghiệp Nhật, đùn đẩy trách nhiệm cho đối tác thứ ba (運送会社のせい) là điều cấm kỵ nhất, sẽ biến một sự cố nhỏ thành một vụ bê bối mạng xã hội hủy hoại uy tín thương hiệu.',
    },
  },
];

const EXTRA_CLAIMS: ClaimScenario[] = [
  {
    id: 'claim_extra_1',
    industry: 'Hàng không & Lữ hành (Aviation & Travel)',
    title: 'Hành lý ký gửi bị thất lạc trong chuyến bay công tác quan trọng',
    customerRageLevel: 'Cực kỳ giận dữ',
    complaintAudioText:
      '預けたスーツケースが出てこないんだけど！明日の朝一で現地の役員会で使うプレゼン資料もスーツも全部入ってるんだよ！紛失したなんて冗談じゃない！今すぐ見つけなさいよ！',
    complaintVn:
      '"Vali hành lý ký gửi của tôi mãi không thấy ra là sao! Sáng mai có cuộc họp hội đồng quản trị quan trọng mà tài liệu thuyết trình với âu phục nằm hết trong đó! Mất hành lý là chuyện đùa được à! Tìm ngay cho tôi!"',
    fourStepsResponse: {
      step1Apology:
        '大変申し訳ございません。明朝の大切なご出張を前に、お荷物が届かず多大なご不安とご迷惑をおかけしておりますことを、深くお詫び申し上げます。',
      step2FactCheck:
        '直ちにお手元の受領証（バゲージタグ）をお預かりし、経由地空港の地上システムと連携して追跡調査を開始いたしました。',
      step3Solution:
        '現在、後続便への搭載を確認中でございます。また、今晩必要な身の回り品やスーツの調達費用として、当社の規定に基づき緊急滞在手当を即座にお支払いいたします。',
      step4Gratitude:
        'ご不便をおかけし重ねてお詫び申し上げます。お荷物が到着次第、深夜であってもご宿泊先ホテルのお部屋まで直接お届けいたします。',
    },
    goldenPhrases: ['多大なご不安とご迷惑をおかけしております', '緊急手当をお支払いいたします', '直接お部屋までお届けにあがります'],
    tabooPhrases: ['「航空券の約款に免責事項がございますので…」', '「見つかるまでホテルでお待ちください」'],
    quiz: {
      question: 'Khi khách bị thất lạc hành lý chứa đồ dùng cần gấp sáng hôm sau, giải pháp xoa dịu đẳng cấp nhất là:',
      options: [
        'Bảo khách tự đi mua và sau này gửi hóa đơn về công ty thanh toán sau 60 ngày.',
        'Giải thích rằng theo luật hàng không quốc tế công ty không chịu trách nhiệm gián tiếp.',
        'Cung cấp ngay khoản phụ cấp khẩn cấp tại chỗ để khách mua sắm đồ dùng tạm thời và cam kết giao tận phòng.',
        'Khuyên khách hoãn cuộc họp sáng mai lại.',
      ],
      correctIndex: 2,
      explanation:
        'Cung cấp hỗ trợ khẩn cấp tức thời (緊急手当) và cam kết mang tận khách sạn là chuẩn mực dịch vụ cao nhất của các hãng hàng không 5 sao Nhật Bản (ANA, JAL).',
    },
  },
  {
    id: 'claim_extra_2',
    industry: 'Ngân hàng & Fintech (Banking & Finance)',
    title: 'Hệ thống Internet Banking bị nghẽn làm trễ lệnh chuyển tiền lương',
    customerRageLevel: 'Nghiêm trọng',
    complaintAudioText:
      '今日月末の給与振込日なのに、貴行のシステム障害で送金が全件ストップしてるんだが！従業員に給料払えなかったら会社の信用問題に関わるんだよ！どう補償してくれるんだ！',
    complaintVn:
      '"Hôm nay là ngày trả lương cuối tháng mà lỗi hệ thống của quý ngân hàng làm nghẽn toàn bộ lệnh chuyển tiền! Nếu không trả lương đúng hẹn sẽ ảnh hưởng uy tín công ty tôi! Quý vị tính bồi thường thế nào?!"',
    fourStepsResponse: {
      step1Apology:
        '平素よりお引き立てをいただいております中、弊行のシステム不具合により、貴社従業員の皆様への給与振込に重大な支障をきたしておりますことを、慙愧に堪えない思いでお詫び申し上げます。',
      step2FactCheck:
        '本日14時より発生いたしました基幹サーバーの障害原因を特定し、現在エンジニア総動員で復旧作業の最終段階に入っております。',
      step3Solution:
        '本日18時までには全件の着金処理を完了させる見込みでございます。万一遅延に伴い貴社に生じた手数料等の実損額につきましては、弊行が全額責任を持って補償いたします。',
      step4Gratitude:
        '本件に関する公式の「システム遅延証明書」を直ちに発行し、貴社のお取引先や関係者様へのご説明にも同行させていただきます。',
    },
    goldenPhrases: ['慙愧に堪えない思いでお詫び申し上げます', '責任を持って補償いたします', '遅延証明書を発行いたします'],
    tabooPhrases: ['「他行でも同様の障害が起きておりますので…」', '「利用規約上、システム障害の免責がございます」'],
    quiz: {
      question: 'Ngôn từ chuẩn mực nhất trong giới tài chính khi xin lỗi lỗi hệ thống nghiêm trọng là:',
      options: [
        '「ごめんなさい、サーバーが落ちてしまいました。」',
        '「慙愧に堪えない思いで深くお詫び申し上げます。」',
        '「まあ、月末は混み合いますからね。」',
        '「復旧するまで待つしかありません。」',
      ],
      correctIndex: 1,
      explanation:
        '「慙愧（ざんき）に堪えない思い」 là cụm từ Keigo đỉnh cao trong văn phong ngân hàng và doanh nghiệp lớn Nhật Bản, thể hiện sự xấu hổ và ăn năn sâu sắc trước lỗi lầm.',
    },
  },
  {
    id: 'claim_extra_3',
    industry: 'Viễn thông & Nhà mạng (Telecom)',
    title: 'Đứt cáp quang Internet khiến doanh nghiệp tê liệt buổi bán hàng Livestream',
    customerRageLevel: 'Cực kỳ giận dữ',
    complaintAudioText:
      '光回線が急に切れて、年間最大のセール配信が途中で台無しになった！売上数千万円の機会損失だよ！毎月高い回線利用料払ってんのに、何の冗談だ？！',
    complaintVn:
      '"Cáp quang bỗng nhiên bị đứt làm hỏng tan tành buổi phát sóng bán hàng lớn nhất năm của chúng tôi! Mất cơ hội doanh thu hàng chục triệu Yên đấy! Tháng nào cũng trả tiền mạng đắt đỏ mà thế à?!"',
    fourStepsResponse: {
      step1Apology:
        'お客様の大切な大型セール配信中に、回線切断というあってはならない事態を引き起こし、甚大なるご損害とご心痛をおかけいたしましたことを、心より深くお詫び申し上げます。',
      step2FactCheck:
        '局舎内ルーターのハードウェア故障が原因であることを確認し、すでに緊急迂回バックアップ回線へと切り替えを完了いたしました。',
      step3Solution:
        '再発防止のため、今後は冗長化（二重化回線）を無償で導入し、本件に関する損害対応につきましては専任の法務担当が迅速に誠意をもって協議させていただきます。',
      step4Gratitude:
        '今後は24時間体制での回線監視レベルを一段階引き上げ、二度と同様の事故を繰り返さぬ体制を構築いたします。',
    },
    goldenPhrases: ['甚大なるご損害をおかけいたしました', 'あってはならない事態を引き起こし', '誠意をもって協議させていただきます'],
    tabooPhrases: ['「インターネットはベストエフォート型契約ですので保証できません」', '「自然災害のせいです」'],
    quiz: {
      question: 'Từ cấm kỵ nhất khi giải thích với khách hàng doanh nghiệp về sự cố mạng là:',
      options: [
        'Chân thành lắng nghe nỗi bức xúc của khách.',
        'Dùng thuật ngữ pháp lý "Hợp đồng nỗ lực tối đa (Best-effort)" để thoái thác trách nhiệm đền bù.',
        'Đưa ra giải pháp dự phòng 2 đường truyền (二重化回線).',
        'Cử chuyên viên kỹ thuật đến tận văn phòng kiểm tra.',
      ],
      correctIndex: 1,
      explanation:
        'Dù trên giấy tờ có điều khoản "Best-effort", nhưng khi đối mặt khách hàng đang tổn thất lớn, viện dẫn điều khoản kỹ thuật để phủi tay sẽ làm bùng nổ cơn thịnh nộ.',
    },
  },
  {
    id: 'claim_extra_4',
    industry: 'Bất động sản & Chung cư cao cấp (Real Estate)',
    title: 'Hàng xóm tầng trên gây tiếng ồn lúc nửa đêm nhưng ban quản lý chậm trễ',
    customerRageLevel: 'Nghiêm trọng',
    complaintAudioText:
      '上の階の騒音、先週も管理会社に連絡したよね？！毎晩ドンドンうるさくてノイローゼになりそうなんだよ！管理費払ってる意味ないじゃん！今日中に何とかして！',
    complaintVn:
      '"Tiếng ồn tầng trên tuần trước tôi đã báo ban quản lý rồi cơ mà?! Đêm nào cũng huỳnh huỵch thế này tôi sắp phát điên vì mất ngủ rồi đây! Đóng phí quản lý làm cái gì chứ! Hôm nay phải xử lý dứt điểm cho tôi!"',
    fourStepsResponse: {
      step1Apology:
        '先週ご連絡をいただいておりましたにもかかわらず、対応に行き届かない点がございまして、毎夜多大なる苦痛をおかけしておりますことを誠に申し訳なく思っております。',
      step2FactCheck:
        '上階の入居者様へこれまでに注意喚起の書面を投函いたしましたが、改善が見られない状況を重く受け止めております。',
      step3Solution:
        '本日中に管理責任者が上階の入居者様のお宅を直接訪問し、生活音への配慮について口頭で厳重に申し入れをいたします。',
      step4Gratitude:
        '入居者様が安心して快適にお過ごしいただけるよう、解決まで責任を持って私が担当者として進捗をご報告いたします。',
    },
    goldenPhrases: ['行き届かない点がございまして', '重く受け止めております', '解決まで責任を持ってご報告いたします'],
    tabooPhrases: ['「集合住宅ですので多少の音はお互い様です」', '「警察を呼んでください」'],
    quiz: {
      question: 'Khi khách thuê phàn nàn tiếng ồn, câu nói nào là bẫy tối kỵ làm khách tức giận hơn?',
      options: [
        '「お互い様ですから我慢してください。」',
        '「大変な苦痛をおかけし申し訳ございません。」',
        '「本日中に直接訪問して注意いたします。」',
        '「進捗を随時ご連絡いたします。」',
      ],
      correctIndex: 0,
      explanation:
        'Câu 「お互い様」（ở chung cư thì ai cũng phải nhịn nhau thôi）là câu nói cấm kỵ số 1, phủ nhận hoàn toàn sự khổ sở vì tiếng ồn của người thuê.',
    },
  },
  {
    id: 'claim_extra_5',
    industry: 'Dịch vụ Taxi & Vận tải hành khách (Transport)',
    title: 'Tài xế taxi chạy lòng vòng cố tình tính thêm tiền cước của khách quốc tế',
    customerRageLevel: 'Vừa phải',
    complaintAudioText:
      '普段なら2000円で行ける距離なのに、わざと遠回りされて4000円も請求されたんですけど！外国人だと思ってバカにしてるんですか？！返金してください！',
    complaintVn:
      '"Bình thường đi chỉ hết 2.000 Yên, vậy mà tài xế cố tình đi đường vòng bắt tôi trả tận 4.000 Yên! Nghĩ tôi là người nước ngoài không biết đường nên tính lừa à?! Trả lại tiền cho tôi!"',
    fourStepsResponse: {
      step1Apology:
        'せっかく弊社のタクシーをご利用いただきましたのに、乗務員の不適切な運行により大変不愉快な思いと不信感を抱かせてしまいましたことを、深くお詫び申し上げます。',
      step2FactCheck:
        '直ちにドライブレコーダーの走行GPSログおよび領収書データを確認いたしましたところ、確かに最短経路から大きく迂回した運行となっておりました。',
      step3Solution:
        '通常料金との差額2,000円を即刻ご指定の口座へご返金いたしますとともに、当該乗務員に対しては再教育指導を実施いたします。',
      step4Gratitude:
        'お客様からのお声により運行管理の不備を発見することができました。心より御礼申し上げます。',
    },
    goldenPhrases: ['不信感を抱かせてしまいました', 'GPSログを確認いたしましたところ〜', '差額を即刻ご返金いたします'],
    tabooPhrases: ['「渋滞を避けた結果ですのでメーター通りです」', '「乗務員も悪気はなかったはずです」'],
    quiz: {
      question: 'Thao tác đầu tiên để chứng minh tính minh bạch khi khách phàn nàn taxi chạy lòng vòng là:',
      options: [
        'Bênh vực tài xế nói rằng do tắc đường nên mới phải đi đường tránh.',
        'Khuyên khách lần sau nên dùng Google Maps dẫn đường cho tài xế.',
        'Kiểm tra lại dữ liệu GPS và lộ trình camera hành trình (ドラレコ) của xe để xác thực khách quan.',
        'Từ chối giải quyết vì khách đã thanh toán tiền.',
      ],
      correctIndex: 2,
      explanation:
        'Xác thực dữ liệu khách quan từ GPS và Camera hành trình (ドライブレコーダー) giúp giải quyết sự việc công bằng, minh bạch và chuyên nghiệp.',
    },
  },
];

interface Props {
  currentLevel: JLPTLevel;
}

export const CustomerClaimRecoveryLab: React.FC<Props> = ({ currentLevel }) => {
  const [claims, setClaims] = useState<ClaimScenario[]>(INITIAL_CLAIMS);
  const [loadBatchCount, setLoadBatchCount] = useState<number>(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedClaimId, setSelectedClaimId] = useState<string>(INITIAL_CLAIMS[0].id);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleLoadMore = () => {
    const nextBatchNum = loadBatchCount + 1;
    const startIndex = ((nextBatchNum - 1) * 5) % EXTRA_CLAIMS.length;
    let batch = EXTRA_CLAIMS.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_CLAIMS.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextBatchNum}_${idx}`,
    }));

    setClaims((prev) => [...prev, ...uniqueBatch]);
    setLoadBatchCount(nextBatchNum);
    setNotice(`Đã nạp thêm 5 kịch bản xử lý khiếu nại đợt ${nextBatchNum}! (Tổng hiện có: ${claims.length + uniqueBatch.length} bài)`);
    speechService.playSuccessSound();
    setTimeout(() => setNotice(null), 4000);
  };

  const currentClaim = claims.find((c) => c.id === selectedClaimId) || claims[0];

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-10">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#120a1c] via-[#0e0818] to-[#07050d] border border-rose-600/30 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="text-rose-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                Phân Hệ 3 (PH3) · Lab Nghe Nói & Phản Xạ Thực Chiến
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-jp">クレーム対応・謝罪技術マスター</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400 font-semibold">Đỉnh cao giao tiếp Omotenashi & Khủng hoảng</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Xử Lý Biến Cố & Khiếu Nại Dịch Vụ Khách Hàng{' '}
              <span className="bg-gradient-to-r from-rose-300 via-pink-200 to-amber-300 bg-clip-text text-transparent">
                (Customer Claim & Service Recovery Lab)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kỹ năng đối thoại thử thách nhất của mọi nhân sự làm việc tại Nhật: Lắng nghe giọng khách hàng giận dữ, làm chủ quy trình ứng đáp 4 bước (Thấu cảm ➔ Xác minh ➔ Đưa giải pháp ➔ Ngăn tái phát) và ngôn từ Keigo xin lỗi đỉnh cao.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-xl border border-dashed border-rose-500/60 bg-rose-950/30 hover:bg-rose-950/60 text-rose-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-rose-400"
            >
              <Plus className="w-4 h-4 text-rose-400" />
              <span>+5 Tải thêm kịch bản khiếu nại</span>
              {loadBatchCount > 0 && (
                <span className="text-[10px] bg-rose-500 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
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
        {claims.map((cl, idx) => {
          const isSelected = cl.id === selectedClaimId;
          return (
            <button
              key={cl.id}
              onClick={() => {
                setSelectedClaimId(cl.id);
                setUserChoice(null);
                setShowResult(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 text-left ${
                isSelected
                  ? 'bg-rose-600 border-rose-400 text-white shadow-md shadow-rose-950/50'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span className="truncate max-w-[200px]">Bài #{idx + 1}: {cl.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Simulation & 4-Step Master Response */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Customer Audio Voice & 4-Step Solution */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/40 uppercase font-bold">
                  {currentClaim.industry}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-1.5">{currentClaim.title}</h2>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-700/60 font-bold">
                Mức độ giận dữ: {currentClaim.customerRageLevel}
              </span>
            </div>

            {/* Customer Complaint Audio Box */}
            <div className="bg-rose-950/30 border border-rose-700/50 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 animate-pulse" />
                  <span>Lời khiếu nại giận dữ của khách hàng (Customer Raw Voice):</span>
                </span>
                <button
                  onClick={() => speechService.speak(currentClaim.complaintAudioText, 1.05)}
                  className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-900/40 cursor-pointer flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe giọng khách</span>
                </button>
              </div>

              <p className="text-base font-jp text-white font-bold leading-relaxed">
                "{currentClaim.complaintAudioText}"
              </p>
              <p className="text-xs text-rose-200/90 italic font-sans">{currentClaim.complaintVn}</p>
            </div>

            {/* 4-Step Recovery Formula */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Quy Trình 4 Bước Đáp Lời Chuẩn Mực Omotenashi:</span>
              </span>

              <div className="space-y-2.5 text-xs">
                {/* Step 1 */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-indigo-400 font-bold">
                    <span>Bước 1: Lắng nghe & Xin lỗi vì sự bất tiện (不快感へのお詫び)</span>
                    <button
                      onClick={() => speechService.speak(currentClaim.fourStepsResponse.step1Apology, 0.9)}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-200 font-jp leading-relaxed">
                    "{currentClaim.fourStepsResponse.step1Apology}"
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span>Bước 2: Nhanh chóng xác minh sự thật khách quan (迅速な事実確認)</span>
                    <button
                      onClick={() => speechService.speak(currentClaim.fourStepsResponse.step2FactCheck, 0.9)}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-200 font-jp leading-relaxed">
                    "{currentClaim.fourStepsResponse.step2FactCheck}"
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>Bước 3: Đưa ra giải pháp đền bù / thay thế thỏa đáng (代替案・解決策の提示)</span>
                    <button
                      onClick={() => speechService.speak(currentClaim.fourStepsResponse.step3Solution, 0.9)}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-200 font-jp leading-relaxed">
                    "{currentClaim.fourStepsResponse.step3Solution}"
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-cyan-400 font-bold">
                    <span>Bước 4: Cảm ơn đã chỉ ra thiếu sót & cam kết ngăn tái phát (感謝と再発防止)</span>
                    <button
                      onClick={() => speechService.speak(currentClaim.fourStepsResponse.step4Gratitude, 0.9)}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-200 font-jp leading-relaxed">
                    "{currentClaim.fourStepsResponse.step4Gratitude}"
                  </p>
                </div>
              </div>
            </div>

            {/* Golden vs Taboo phrases */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-emerald-950/20 p-3 rounded-xl border border-emerald-800/30 space-y-1 text-xs">
                <span className="font-bold text-emerald-400">Cụm từ vàng xoa dịu:</span>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                  {currentClaim.goldenPhrases.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-950/20 p-3 rounded-xl border border-rose-800/30 space-y-1 text-xs">
                <span className="font-bold text-rose-400">Lời nói cấm kỵ (Đổ thêm dầu vào lửa):</span>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                  {currentClaim.tabooPhrases.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Reflex Response Quiz */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1427] border border-rose-700/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Trắc Nghiệm Bản Lĩnh Xử Lý Khủng Hoảng
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">Điểm: {score}</span>
            </div>

            <p className="text-xs text-slate-300">
              Chọn phương án đối đáp thông minh và chuyên nghiệp nhất:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs sm:text-sm font-sans font-bold text-white leading-relaxed bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                {currentClaim.quiz.question}
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {currentClaim.quiz.options.map((opt, oIdx) => {
                  const isChosen = userChoice === oIdx;
                  const isCorrect = oIdx === currentClaim.quiz.correctIndex;

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
                      className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-jp text-left transition-all cursor-pointer flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="font-mono text-slate-400 shrink-0 mt-0.5">[{oIdx + 1}]</span>
                      <span className="flex-1 leading-snug">{opt}</span>
                      {showResult && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                      {showResult && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showResult && (
                <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                  <div
                    className={`text-xs font-bold flex items-center gap-1.5 ${
                      userChoice === currentClaim.quiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {userChoice === currentClaim.quiz.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Xử lý chuẩn phong thái Omotenashi! (+10 điểm)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Chưa hợp chuẩn ứng biến! Xem phân tích:</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    {currentClaim.quiz.explanation}
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
