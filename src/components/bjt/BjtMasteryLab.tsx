import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Award,
  GraduationCap,
  BookOpen,
  Headphones,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  Volume2,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  ChevronRight,
  Building,
  FileText,
  PhoneCall,
  Mail,
  BarChart3,
  Handshake,
  Users,
  AlertTriangle,
  FileCheck,
  Laptop,
  Compass,
  Play,
  RotateCcw,
  Plus
} from 'lucide-react';
import { speechService } from '../../services/speechService';
import { BJT_EXTRA_QUESTIONS } from '../../data/bjtExtraQuestions';

export interface BjtModule {
  id: number;
  code: string;
  category: 'keigo_comm' | 'business_ops' | 'reading_analysis' | 'cbt_strategy';
  categoryLabel: string;
  title: string;
  japaneseTitle: string;
  badge: string;
  description: string;
  targetLevel: 'J1+' | 'J1' | 'J2';
  corePrinciples: string[];
  practicalExpressions: {
    phrase: string;
    reading: string;
    meaning: string;
    context: string;
  }[];
  caseStudy: {
    scenario: string;
    dialogueOrSample: {
      speaker: string;
      line: string;
      reading?: string;
      vn: string;
    }[];
    expertAnalysis: string;
    bjtTrapWarning: string;
  };
  practiceQuestion: {
    instruction: string;
    content: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const BJT_20_MODULES: BjtModule[] = [
  {
    id: 1,
    code: 'BJT-01',
    category: 'keigo_comm',
    categoryLabel: 'Kính ngữ & Giao tiếp',
    title: 'Kính ngữ thương mại tối thượng (Sonkeigo, Kenjougo I & II công sở)',
    japaneseTitle: 'ビジネス敬語体系：尊敬語・謙譲語（Ⅰ・Ⅱ）・丁寧語の完全峻別',
    badge: 'Chuyên đề 1 · Trọng tâm 90% BJT',
    description: 'Nắm vững bản đồ "chiếc thang hạ nâng" tâm lý. Phân biệt tuyệt đối giữa Khiêm nhường ngữ I (hạ mình đối với người nhận hành động) và Khiêm nhường ngữ II/Đinh trọng ngữ (lịch sự nhã nhặn trước người nghe). Tuyệt đối không dùng Sonkeigo cho bản thân và người cùng nhóm Uchi.',
    targetLevel: 'J1+',
    corePrinciples: [
      'Nguyên tắc Uchi-Soto: Khi nói với khách hàng bên ngoài, Giám đốc của mình bị xem là người trong nhà (Uchi), phải gọi cộc tên không chức vụ (ví dụ: "弊社代表の田中" thay vì "田中社長様").',
      'Động từ đặc biệt: 行く/来る/いる -> いらっしゃる (Sonkei) / 参る (Kenjou II) / 伺う (Kenjou I hướng tới người nhận).',
      'Cấm kỵ Nhị trùng kính ngữ (二重敬語): Không nói "おっしゃられました" (Sai vì vừa おっしゃる vừa られる), chuẩn là "おっしゃいました".',
      'Cushion Words (クッション言葉): Luôn mở đầu bằng "恐れ入りますが" hoặc "お手数をおかけいたしますが" trước khi yêu cầu.'
    ],
    practicalExpressions: [
      {
        phrase: 'ご査収のほどよろしくお願い申し上げます',
        reading: 'ごさしゅうのほどよろしくおねがいもうしあげます',
        meaning: 'Kính mong quý đối tác kiểm tra và tiếp nhận tài liệu đính kèm.',
        context: 'Dùng cuối email khi gửi báo giá hoặc tài liệu quan trọng.'
      },
      {
        phrase: 'ご期待に沿えず、誠に申し訳ございません',
        reading: 'ごきたいにそえず、まことにもうしわけございません',
        meaning: 'Thành thật xin lỗi vì không thể đáp ứng được kỳ vọng của quý công ty.',
        context: 'Lời từ chối khéo léo và trang trọng khi không thể hạ giá thêm.'
      },
      {
        phrase: '弊社の田中より、改めてご連絡申し上げます',
        reading: 'へいしゃのたなかより、あらためてごれんらくもうしあげます',
        meaning: 'Anh Tanaka bên công ty chúng tôi sẽ chủ động liên hệ lại sau.',
        context: 'Nói với khách hàng khi người phụ trách đang đi vắng.'
      }
    ],
    caseStudy: {
      scenario: 'Nhân viên công ty A gọi điện thoại cho Giám đốc công ty đối tác B để báo cáo tiến độ.',
      dialogueOrSample: [
        {
          speaker: 'Nhân viên A',
          line: 'いつも大変お世話になっております。株式会社Aの鈴木でございます。',
          reading: 'いつもたいへんおせわになっております。かぶしきがいしゃエーのすずきでございます。',
          vn: 'Kính chào quý công ty. Tôi là Suzuki bên công ty cổ phần A.'
        },
        {
          speaker: 'Nhân viên A',
          line: '先日ご依頼いただきました企画書の件で、山田社長にお取り次ぎいただけますでしょうか。',
          reading: 'せんじつごいらいいただきましたきかくしょのけんで、やまだしゃちょうにおとりつぎいただけますでしょうか。',
          vn: 'Về bản kế hoạch ngài đã yêu cầu hôm trước, xin phép vui lòng chuyển máy cho Giám đốc Yamada giúp tôi được không ạ?'
        }
      ],
      expertAnalysis: 'Nhân viên A xưng tên mình kèm でございます (Teichougo chuẩn mực), dùng ご依頼いただきました (Tôn kính ngữ cho hành động yêu cầu của đối tác), và gọi đối tác là 山田社長 (hợp lý).',
      bjtTrapWarning: 'Đề thi BJT hay gài: "田中社長は外出されました" khi nói với khách hàng -> SAI BÉT! Phải là "社長の田中は外出しております".'
    },
    practiceQuestion: {
      instruction: '取引先との会話で、空欄に入る最も適切な敬語表現を選びなさい。',
      content: '取引先：「この資料、部長にも見てもらえましたか。」\nあなた：「はい、先ほど部長に（　）。」',
      options: [
        'お目にかかりました',
        'ご覧に入れました',
        'ご覧になりました',
        '拝見させました'
      ],
      correctIndex: 1,
      explanation: 'Đáp án đúng là 2: 「ご覧に入れました」(Tôi đã trình cho trưởng phòng xem rồi ạ - Khiêm nhường ngữ II chuẩn mực khi đưa đồ cho người khác xem). Phương án 1 (Gặp mặt), phương án 3 (Tôn kính ngữ - không dùng cho việc mình đưa xem), phương án 4 (Sai ngữ pháp kính ngữ).'
    }
  },
  {
    id: 2,
    code: 'BJT-02',
    category: 'keigo_comm',
    categoryLabel: 'Kính ngữ & Giao tiếp',
    title: 'Giao tiếp điện thoại & Tiếp khách chuẩn tác phong Nhật (電話応対・来客対応)',
    japaneseTitle: '電話応対の黄金プロトコルと受付・来客接遇マナー',
    badge: 'Chuyên đề 2 · Kỹ năng phản xạ 3 giây',
    description: 'Quy trình nhấc máy trong 3 hồi chuông đầu tiên, kỹ năng lắng nghe chủ động (Aizuchi), cách chuyển máy không làm đứt kết nối, ghi chép tin nhắn Denpyou 5W1H và nghi thức tiễn khách tại thang máy.',
    targetLevel: 'J1',
    corePrinciples: [
      'Chuông reo quá 3 tiếng: Bắt buộc mở đầu bằng "大変お待たせいたしました" (Xin lỗi vì để quý khách phải đợi lâu).',
      'Quy tắc nhắc lại số liệu & tên riêng: Luôn nhắc lại họ tên, công ty và số điện thoại để đối chiếu xác nhận.',
      'Khi người được gọi đi vắng: Báo lý do vắng mặt nhã nhặn (外出しております, 会議中でございます, 席を外しております) và chủ động đề nghị gọi lại.',
      'Nghi thức thang máy: Cúi chào góc 30-45 độ và giữ nguyên tư thế cho đến khi cửa thang máy đóng hẳn.'
    ],
    practicalExpressions: [
      {
        phrase: 'あいにく佐藤は席を外しております',
        reading: 'あいにくさとうわせきをはずしております',
        meaning: 'Thật tiếc là anh Sato vừa rời khỏi bàn làm việc một lát ạ.',
        context: 'Nói khi đồng nghiệp đi vệ sinh hoặc đi lấy nước.'
      },
      {
        phrase: '恐れ入りますが、お電話が少々遠いようでございます',
        reading: 'おそれいりますが、おでんわがしょうしょうとおいようでございます',
        meaning: 'Thành thật áy náy nhưng đường truyền hơi khó nghe một chút ạ.',
        context: 'Cách nhắc đối phương nói to hơn mà không trách móc.'
      },
      {
        phrase: '私、総務部の高橋が承りました',
        reading: 'わたくし、そうむぶのたかはしがうけたまわりました',
        meaning: 'Tôi là Takahashi phòng Tổng vụ xin phép tiếp nhận thông điệp này.',
        context: 'Xác nhận danh tính người nhận lời nhắn khi ghi chép điện thoại.'
      }
    ],
    caseStudy: {
      scenario: 'Đối tác gọi điện tìm nhân viên Tanaka nhưng Tanaka đang đi công tác Osaka.',
      dialogueOrSample: [
        {
          speaker: 'Người trực máy',
          line: 'あいにく田中は本日、大阪出張に出ておりまして、夕方戻る予定でございます。',
          reading: 'あいにくたなかはほんじつ、おおさかしゅっちょうにでておりまして、ゆうがたもどるよていでございます。',
          vn: 'Thật tiếc là hôm nay anh Tanaka đi công tác Osaka, dự kiến chiều tối mới về văn phòng ạ.'
        },
        {
          speaker: 'Người trực máy',
          line: '戻り次第、田中からお電話を差し上げましょうか。それともご伝言を承りましょうか。',
          reading: 'もどりしだい、たなかからおでんわをさしあげましょうか。それともごでんごんをうけたまわりましょうか。',
          vn: 'Ngay khi về, Tanaka sẽ gọi lại cho quý khách hay quý khách có muốn nhắn lại điều gì không ạ?'
        }
      ],
      expertAnalysis: 'Đưa ra 2 lựa chọn chủ động giúp khách hàng cảm thấy được phục vụ chu đáo tối đa mà không lãng phí thời gian.',
      bjtTrapWarning: 'Không bao giờ nói: "田中さんはいません" (Quá cộc cằn và thêm -san cho người nhà).'
    },
    practiceQuestion: {
      instruction: '電話応対において、相手の名前が聞き取れなかったときの最も適切な表現を選びなさい。',
      content: '「恐れ入りますが、お電話が少々遠いようでございまして、（　）。」',
      options: [
        'もう一度おっしゃってください。',
        'もう一度お名前をお伺いしてもよろしいでしょうか。',
        'お名前は何ですか。',
        'もう一度聞こえるように話してください。'
      ],
      correctIndex: 1,
      explanation: 'Đáp án đúng là 2: 「もう一度お名前をお伺いしてもよろしいでしょうか」(Xin phép cho em hỏi lại quý danh được không ạ?). Vừa nhã nhặn, vừa dùng Khiêm nhường ngữ お伺いする.'
    }
  },
  {
    id: 3,
    code: 'BJT-03',
    category: 'reading_analysis',
    categoryLabel: 'Đọc hiểu & Biểu đồ',
    title: 'Soạn thảo Email & Văn bản thương mại (ビジネスメール・社外社内文書)',
    japaneseTitle: 'ビジネスEメールと社内報・対外文書の標準フォーマット',
    badge: 'Chuyên đề 3 · Viết văn bản tốc độ cao',
    description: 'Cấu trúc chuẩn 5 phần của email tiếng Nhật: Tiêu đề súc tích có mã hiệu dự án, Lời chào hỏi theo mùa (時候の挨拶), Tự giới thiệu, Trình bày nội dung chính theo gạch đầu dòng, và Lời chúc kết thư.',
    targetLevel: 'J1',
    corePrinciples: [
      'Tiêu đề email: Luôn để trong ngoặc vuông mục đích rõ ràng, ví dụ: 【重要・期日10/15】新システム導入に関するご相談.',
      'Câu chào mở đầu chuẩn: 「いつも大変お世話になっております。」 hoặc 「貴社におかれましては益々ご清栄のこととお慶び申し上げます。」',
      'Nội dung chính: Sử dụng gạch đầu dòng (記・以上) để liệt kê thời gian, địa điểm, nội dung giúp người đọc nắm bắt trong 5 giây.',
      'Xử lý file đính kèm: Luôn ghi rõ tên file và dung lượng: 「添付ファイルにてお送りいたしますので、ご査収のほどよろしくお願い申し上げます。」'
    ],
    practicalExpressions: [
      {
        phrase: '取り急ぎ、メールにて御礼申し上げます',
        reading: 'とりいそぎ、メールにておんれいもうしあげます',
        meaning: 'Trước mắt tôi xin phép gửi lời cảm ơn nhanh qua email.',
        context: 'Viết ngay sau buổi gặp gỡ hoặc tiệc chiêu đãi đối tác.'
      },
      {
        phrase: 'ご多忙の折、恐れ入りますが',
        reading: 'ごたぼうのおり、おそれいりますが',
        meaning: 'Biết quý vị đang giữa lúc bận rộn nhiều công việc, tôi rất áy náy nhưng...',
        context: 'Lời mở đầu khi cần xin phản hồi gấp.'
      },
      {
        phrase: '何卒ご容赦のほどお願い申し上げます',
        reading: 'なにとぞごようしゃのほどおねがいもうしあげます',
        meaning: 'Kính mong quý khách lượng thứ và thông cảm bỏ qua cho.',
        context: 'Dùng trong thông báo bảo trì hoặc phát sinh chậm trễ.'
      }
    ],
    caseStudy: {
      scenario: 'Email thông báo thay đổi thời gian họp định kỳ với đối tác do xung đột lịch công tác của sếp.',
      dialogueOrSample: [
        {
          speaker: 'Tiêu đề',
          line: '【日程変更のお願い】定例ミーティング日程変更について（株式会社A・鈴木）',
          reading: '',
          vn: '【Yêu cầu đổi lịch】Về việc điều chỉnh lịch họp định kỳ (Công ty A - Suzuki)'
        },
        {
          speaker: 'Nội dung',
          line: '誠に勝手ながら、弊社側の都合により、会議の日時を下記のように変更させていただきたく存じます。',
          reading: 'まことにかってながら、へいしゃがわのつごうにより、かいぎのにちじをかきのようにへんこうさせていただきたくぞんじます。',
          vn: 'Dù vô cùng tùy tiện và e ngại, do sự sắp xếp từ phía công ty chúng tôi, kính mong được đổi lịch họp như dưới đây.'
        }
      ],
      expertAnalysis: 'Dùng cụm từ "誠に勝手ながら" (dù rất tùy tiện/đường đột) trước khi xin đổi lịch là quy chuẩn văn hóa công sở Nhật Bản để thể hiện sự áy náy chân thành.',
      bjtTrapWarning: 'Đề thi đọc hiểu BJT rất hay hỏi câu kết thúc văn bản: Văn bản nội bộ dùng "以上", thư từ trang trọng dùng "敬具" đi cặp với "拝啓".'
    },
    practiceQuestion: {
      instruction: '社外向けのビジネスメールの結びの言葉として、最も適切なものを選びなさい。',
      content: '「今後とも変わらぬお引き立てを賜りますよう、（　）。」',
      options: [
        'よろしくお願い申し上げます',
        'お願いいたしましょう',
        'お頼み申し上げます',
        'ご遠慮申し上げます'
      ],
      correctIndex: 0,
      explanation: 'Đáp án đúng là 1: 「よろしくお願い申し上げます」(Kính mong tiếp tục nhận được sự nâng đỡ chiếu cố của quý đối tác). Cụm từ bất di bất dịch trong thư từ thương mại.'
    }
  },
  {
    id: 4,
    code: 'BJT-04',
    category: 'reading_analysis',
    categoryLabel: 'Đọc hiểu & Biểu đồ',
    title: 'Thuyết trình, Đọc hiểu biểu đồ & Báo cáo số liệu kinh tế (プレゼン・グラフ分析・数値報告)',
    japaneseTitle: '数値報告・グラフ推移の言語化とプレゼンテーション論理展開',
    badge: 'Chuyên đề 4 · Trọng tâm Part 2 BJT',
    description: 'Bóc tách từ vựng mô tả xu hướng số liệu: Tăng vọt (急増), giảm dần đều (漸減), đi ngang không đổi (横ばい), chạm đáy phục hồi (底打ち), biến động mạnh (乱高下). Cách thuyết trình số liệu logic theo mô hình PREP.',
    targetLevel: 'J1+',
    corePrinciples: [
      'Từ vựng tăng trưởng: 急増する (tăng vọt), 増加傾向にある (có xu hướng tăng), 上回る (vượt qua mốc), 過去最高を記録する (kỷ lục cao nhất).',
      'Từ vựng sụt giảm: 激減する (giảm sốc), 減少に転じる (chuyển sang chiều hướng giảm), 下回る (thấp hơn mốc dự kiến).',
      'Trạng thái bình ổn: 横ばいで推移している (duy trì đi ngang không đổi), ほぼ横ばい (hầu như không dao động).',
      'Điểm đảo chiều: 底を打つ (chạm đáy), 回復の兆しが見られる (xuất hiện dấu hiệu hồi phục), 頭打ちになる (chạm trần kịch kim).'
    ],
    practicalExpressions: [
      {
        phrase: '売上高は前年同期比で15％増となりました',
        reading: 'うりあげだかはぜんねんどうきひでじゅうごパーセントぞうとなりました',
        meaning: 'Doanh thu đã tăng 15% so với cùng kỳ năm ngoái.',
        context: 'Báo cáo tài chính quý.'
      },
      {
        phrase: '第3四半期を底に、回復基調に転じております',
        reading: 'だいさんしはんきをそこに、かいふくきちょうにてんじております',
        meaning: 'Lấy quý 3 làm đáy, số liệu đang chuyển mình theo đà hồi phục.',
        context: 'Phân tích chu kỳ kinh tế trong cuộc họp hội đồng quản trị.'
      },
      {
        phrase: '市場シェアの拡大が頭打ちになっている状況です',
        reading: 'しじょうシェアのかくだいがあたまうちになっているじょうきょうです',
        meaning: 'Tình hình việc mở rộng thị phần hiện đang chạm trần kịch kim.',
        context: 'Phân tích đối thủ cạnh tranh.'
      }
    ],
    caseStudy: {
      scenario: 'Thuyết trình trước ban giám đốc về biểu đồ doanh số bán hàng của dòng sản phẩm mới.',
      dialogueOrSample: [
        {
          speaker: 'Người thuyết trình',
          line: 'こちらの折れ線グラフをご覧ください。発売当初は横ばいで推移しておりましたが、',
          reading: 'こちらの おれせんグラフをごらんください。はつばいとうしょは よこばいですいいしておりましたが、',
          vn: 'Kính mời quý vị nhìn vào biểu đồ đường gấp khúc này. Giai đoạn đầu mở bán số liệu duy trì đi ngang, nhưng...'
        },
        {
          speaker: 'Người thuyết trình',
          line: 'テレビCMの放映を機に急増し、目標の120％を達成いたしました。',
          reading: 'テレビシーエムのほうえいをきに きゅうぞうし、もくひょうのひゃくにじゅっパーセントをたっせいいたしました。',
          vn: 'Kể từ lúc phát sóng quảng cáo truyền hình, doanh số đã tăng vọt và đạt 120% mục tiêu ấn định.'
        }
      ],
      expertAnalysis: 'Kết hợp từ ngữ chỉ biểu đồ (折れ線グラフ - biểu đồ đường, 円グラフ - biểu đồ tròn, 棒グラフ - biểu đồ cột) với các động từ biến chuyển (横ばいで推移 -> 急増 -> 達成).',
      bjtTrapWarning: 'Bài nghe đọc hiểu BJT thường chiếu biểu đồ và người nói dùng các từ gài bẫy như "ほぼ横ばい" hoặc "〜を境に急減" để đánh lừa mắt thí sinh.'
    },
    practiceQuestion: {
      instruction: 'グラフの推移を説明する文として最も適切な表現を選びなさい。',
      content: '「景気悪化の影響で、輸出額は一昨年のピークから（　）、今年に入ってようやく下げ止まった。」',
      options: [
        '右肩上がりに推移し',
        '横ばいの状態が続き',
        '右肩下がりに減少し',
        '急激に回復傾向を示し'
      ],
      correctIndex: 2,
      explanation: 'Đáp án đúng là 3: 「右肩下がりに減稍微」(Giảm dần đều theo chiều dốc xuống bên phải). Biểu đồ giảm từ đỉnh (ピーク) đến khi dừng rơi (下げ止まる).'
    }
  },
  {
    id: 5,
    code: 'BJT-05',
    category: 'business_ops',
    categoryLabel: 'Quản trị & Thương mại',
    title: 'Đàm phán giá cả, Thương lượng hợp đồng & Giảm thiểu rủi ro (価格交渉・契約締結)',
    japaneseTitle: '価格交渉における「妥協点」の模索とリスクヘッジ条項',
    badge: 'Chuyên đề 5 · Nghệ thuật đàm phán B2B',
    description: 'Nghệ thuật mặc cả nhã nhặn trong văn hóa kinh doanh Nhật Bản: Không chê đắt thẳng thừng, dùng từ đệm "Chotto kibishii", đưa ra điều kiện trao đổi (Trade-off: Tăng số lượng để giảm đơn giá), và rà soát điều khoản bảo mật NDA.',
    targetLevel: 'J1+',
    corePrinciples: [
      'Nói giảm nói tránh khi giá cao: Không nói "高いです" (Thô lỗ), hãy nói: 「少々予算をオーバーしておりまして...」(Hơi vượt quá ngân sách một chút ạ).',
      'Chiến thuật Win - Win: 「もし発注ロット数を2倍に増やした場合、単価のご相談は可能でしょうか。」(Nếu chúng tôi tăng số lượng đặt gấp đôi thì có thể thương lượng lại đơn giá được không ạ?).',
      'Điều khoản bảo vệ rủi ro: Bồi thường thiệt hại (損害賠償), miễn trừ trách nhiệm bất khả kháng (不可抗力), bảo mật thông tin bí mật kinh doanh (秘密保持義務).',
      'Từ chối khéo: 「社内で持ち帰り、検討させていただきます。」(Chúng tôi xin phép mang về công ty thảo luận kỹ lại).'
    ],
    practicalExpressions: [
      {
        phrase: '何とか歩み寄ることはできませんでしょうか',
        reading: 'なんとかあゆみよることはできませんでしょうか',
        meaning: 'Liệu hai bên chúng ta có thể nhượng bộ tiến lại gần nhau một chút được không ạ?',
        context: 'Khi đàm phán rơi vào bế tắc giằng co.'
      },
      {
        phrase: 'これ以上の値引きは、採算が合わなくなります',
        reading: 'これいじょうのねびきは、さいさんがあわなくなります',
        meaning: 'Nếu giảm giá hơn mức này nữa thì chúng tôi sẽ bị lỗ vốn.',
        context: 'Bảo vệ giá sàn của công ty.'
      },
      {
        phrase: '双方合意の上で、覚書を取り交わしましょう',
        reading: 'そうほうごういのうえで、おぼえがきをとりかわしましょう',
        meaning: 'Sau khi hai bên đạt được đồng thuận, chúng ta hãy cùng ký kết biên bản ghi nhớ.',
        context: 'Chốt các thỏa thuận sơ bộ trước khi ký hợp đồng chính thức.'
      }
    ],
    caseStudy: {
      scenario: 'Đối tác ép giảm giá 10% nhưng công ty chỉ chấp nhận giảm 5% nếu tăng số lượng đơn hàng.',
      dialogueOrSample: [
        {
          speaker: 'Bên mua',
          line: '他社からも見積もりを取っておりまして、御社の価格は少し厳しいですね。',
          reading: '他社からもみつもりをとっておりまして、おんしゃのかかくはすこしきびしいですね。',
          vn: 'Chúng tôi cũng đã lấy báo giá từ công ty khác rồi, mức giá bên anh đưa ra hơi căng nhỉ.'
        },
        {
          speaker: 'Bên bán',
          line: 'ご事情は重々承知しております。では、年間契約をお約束いただけるのであれば、5％の値引きでご提案いたします。',
          reading: 'ごじじょうはじゅうじゅうちょうちしております。では、ねんかんけいやくをおやくそくいただけるのであれば、ごパーセントのねびきでごていあんいたします。',
          vn: 'Chúng tôi rất thấu hiểu hoàn cảnh của quý vị. Vậy nếu quý vị cam kết ký hợp đồng năm, chúng tôi xin phép đề xuất mức giảm 5%.'
        }
      ],
      expertAnalysis: 'Bên bán không từ chối thẳng mà thể hiện sự lắng nghe (重々承知), sau đó đưa ra điều kiện đánh đổi hợp lý để giữ hòa khí đôi bên.',
      bjtTrapWarning: 'Trong bài nghe BJT, khi người Nhật nói "前向きに検討します" (Chúng tôi sẽ xem xét tích cực) thì trong 90% trường hợp thực tế là lời từ chối khéo.'
    },
    practiceQuestion: {
      instruction: '価格交渉で、相手の提案を受け入れられないときの最も適切なビジネス表現を選びなさい。',
      content: '「誠に恐れ入りますが、ご提示いただいた条件では弊社として（　）。」',
      options: [
        'お引き受けいたしかねます',
        'お受けすることはできませんでした',
        '受け取りたくありません',
        'お断り申し上げます'
      ],
      correctIndex: 0,
      explanation: 'Đáp án đúng là 1: 「お引き受けいたしかねます」(Chúng tôi khó lòng có thể tiếp nhận được điều kiện này ạ). Dùng thể V-masu + かねる để từ chối nhã nhặn, lịch sự nhất trong văn hóa thương mại.'
    }
  },
  {
    id: 6,
    code: 'BJT-06',
    category: 'business_ops',
    categoryLabel: 'Quản trị & Thương mại',
    title: 'Quy tắc Hou-Ren-Sou đa cấp bậc (報告・連絡・相談の実践)',
    japaneseTitle: '報連相（ほうれんそう）の階層的実践とバッドニュース・ファースト原則',
    badge: 'Chuyên đề 6 · Xương sống công sở Nhật',
    description: 'Quy tắc vàng sinh tồn trong công ty Nhật: Báo cáo (Houkoku - kết quả trước nguyên nhân sau), Liên lạc (Renraku - thông tin sự thật khách quan không thêm cảm xúc), Tham vấn (Soudan - xin chỉ thị kèm theo phương án đề xuất của bản thân).',
    targetLevel: 'J1',
    corePrinciples: [
      'Bad news first (Tin xấu báo trước): Khi xảy ra lỗi hoặc sự cố, phải báo ngay cho cấp trên trong vòng 15 phút, không được giấu giếm tự xử lý.',
      'Báo cáo theo cấu trúc Kết luận trước: Luôn mở đầu: 「結論から申し上げますと、プロジェクトAは予定通り完了いたしました。」',
      'Phân biệt Sự thật (Fact) và Ý kiến (Opinion): Báo cáo số liệu và thực tế trước, suy đoán cá nhân để ở phần sau.',
      'Tham vấn thông minh: Không bao giờ hỏi sếp "Em phải làm sao?", hãy hỏi: "Em định chọn phương án A vì lý do này, sếp thấy có ổn không ạ?".'
    ],
    practicalExpressions: [
      {
        phrase: '進捗状況のご報告に伺いました',
        reading: 'しんちょくじょうきょうのごほうこくにうかがいました',
        meaning: 'Em xin phép đến báo cáo tình hình tiến độ công việc ạ.',
        context: 'Báo cáo định kỳ cho sếp.'
      },
      {
        phrase: '至急ご相談したい案件がございます',
        reading: 'しきゅうごそうだんしたいあんけんがございます',
        meaning: 'Em có một việc khẩn cấp muốn xin tham vấn ý kiến sếp.',
        context: 'Khi phát sinh sự cố bất ngờ cần chỉ đạo.'
      },
      {
        phrase: '私見ではございますが、A案が最もリスクが低いかと存じます',
        reading: 'しけんではございますが、エーあんがもっともりすくがひくいかとぞんじます',
        meaning: 'Theo thiển ý của cá nhân em, phương án A là ít rủi ro nhất ạ.',
        context: 'Đưa ra đề xuất giải pháp khi tham vấn.'
      }
    ],
    caseStudy: {
      scenario: 'Nhân viên phát hiện lô hàng xuất khẩu sang đối tác có nguy cơ bị trễ 2 ngày do bão lớn ở cảng Hải Phòng.',
      dialogueOrSample: [
        {
          speaker: 'Nhân viên',
          line: '課長、緊急でご報告とご相談がございます。今お時間よろしいでしょうか。',
          reading: 'かちょう、きんきゅうでごほうこくとごそうだんがございます。いまおじかんよろしいでしょうか。',
          vn: 'Trưởng phòng, em có việc khẩn cấp muốn báo cáo và xin tham vấn ý kiến sếp. Bây giờ sếp có tiện không ạ?'
        },
        {
          speaker: 'Nhân viên',
          line: '台風の影響で船便に遅延が生じる恐れがあります。代替案として航空便への切り替えを検討しております。',
          reading: 'たいふうのえいきょうでふなびんにちえんがしょうじるおそれがあります。だいたいあんとしてこうくうびんへのきりかえをけんとうしております。',
          vn: 'Do ảnh hưởng của bão nên đường biển có nguy cơ bị chậm. Phương án thay thế là em đang cân nhắc chuyển sang dịch vụ gửi/vận chuyển qua đường hàng không (máy bay) ạ.'
        }
      ],
      expertAnalysis: 'Nhân viên hỏi xin thời gian của sếp trước (お時間よろしいでしょうか), nêu vấn đề khẩn cấp ngay dòng đầu, và chuẩn bị sẵn phương án thay thế (航空便への切り替え).',
      bjtTrapWarning: 'Trong bài thi BJT, thí sinh không được chọn câu hỏi cụt lủn "どうすればいいですか" khi gặp cấp trên.'
    },
    practiceQuestion: {
      instruction: 'ミスが発生した際の、上司への報告の第一声として最も適切なものを選びなさい。',
      content: '「課長、大変申し訳ございません。（　）。」',
      options: [
        '先方の担当者が無理な要求をしてきまして困っています',
        '私の不注意により、納品データに誤りが発生してしまいました',
        'なぜかシステムにバグが出てしまって動かない状態です',
        '明日の会議までに何とか間に合えばいいのですが'
      ],
      correctIndex: 1,
      explanation: 'Đáp án đúng là 2: Thừa nhận trách nhiệm rõ ràng về bản thân (私の不注意により), nói thẳng vào sự cố lỗi (納品データに誤りが発生). Các câu khác đổ lỗi cho khách hàng hoặc hệ thống.'
    }
  },
  {
    id: 7,
    code: 'BJT-07',
    category: 'business_ops',
    categoryLabel: 'Quản trị & Thương mại',
    title: 'Quy trình Ringi & Trình ký nội bộ (稟議書・決裁ルート・社内合意)',
    japaneseTitle: '稟議制度（りんぎ）の意思決定メカニズムと根回し（ねまわし）技法',
    badge: 'Chuyên đề 7 · Văn hóa ra quyết định Nhật',
    description: 'Bản chất của mô hình quản trị đồng thuận tập thể từ dưới lên (Bottom-up Consensus). Nghệ thuật vận động hành lang Nemawashi trước khi đệ trình Ringisho để đảm bảo khi bước vào phòng họp dự án đã được duyệt 100%.',
    targetLevel: 'J1',
    corePrinciples: [
      'Bản chất Ringi: Nhân viên cấp dưới khởi xướng đề xuất -> Chuyền tay qua các cấp trưởng phòng, giám đốc khối để đóng dấu Hanko -> Tổng giám đốc ký duyệt cuối cùng.',
      'Nemawashi (Cắt tỉa rễ): Gặp gỡ riêng các phòng ban tài chính, pháp chế và nhân sự từ trước để giải thích dự án và tháo gỡ khúc mắc.',
      'Văn phong tờ trình Ringisho: Lý do đề xuất (起案理由), ngân sách chi tiết (所要予算), hiệu quả kỳ vọng (期待効果), và rủi ro đi kèm.',
      'Quy tắc No Surprises: Không bao giờ làm cho cấp trên bị bất ngờ tại cuộc họp toàn thể.'
    ],
    practicalExpressions: [
      {
        phrase: '事前に根回しをしておいたので、承認はスムーズでした',
        reading: 'じぜんにねまわしをしておいたので、しょうにんはスムーズでした',
        meaning: 'Nhờ đã làm công tác tư tưởng và thỏa thuận ngầm từ trước nên việc phê duyệt diễn ra rất trôi chảy.',
        context: 'Chia sẻ kinh nghiệm làm dự án.'
      },
      {
        phrase: '稟議書の決裁ルートを確認してください',
        reading: 'りんぎしょのけっさいルートをかくにんしてください',
        meaning: 'Hãy kiểm tra lại quy trình luân chuyển đóng dấu phê duyệt của tờ trình.',
        context: 'Hướng dẫn nhân viên mới nộp tờ trình.'
      },
      {
        phrase: '役員会での審議に先立ち、関係部署の合意を取り付けました',
        reading: 'やくいんかいでのしんぎにさきだち、かんけいぶしょのごういをと付つけました',
        meaning: 'Trước thềm xem xét tại hội đồng quản trị, chúng tôi đã nhận được sự đồng thuận của các phòng ban liên quan.',
        context: 'Báo cáo trưởng phòng.'
      }
    ],
    caseStudy: {
      scenario: 'Nhân viên phụ trách đề xuất mua 10 bộ máy tính chuyên dụng mới cho phòng thiết kế đồ họa.',
      dialogueOrSample: [
        {
          speaker: 'Nhân viên',
          line: 'デザインチームのPC購入に関する稟議書を作成いたしました。ご査収の上、ご決裁いただけますでしょうか。',
          reading: 'デザインチームのピーシーこうにゅうにかんするりんぎしょをさくせいいたしました。ごさしゅうのうえ、ごけっさいいただけますでしょうか。',
          vn: 'Em đã lập tờ trình về việc mua máy tính cho đội thiết kế. Kính mong sếp xem xét và phê duyệt giúp em ạ.'
        },
        {
          speaker: 'Trưởng phòng',
          line: '経理部とIT管理部への事前相談はもう済んでいるかい？',
          reading: 'けいりぶとアイティーかんりぶへのじぜんそうだんはもうすんでいるかい？',
          vn: 'Em đã trao đổi sơ bộ trước với phòng Kế toán và phòng Quản trị IT chưa?'
        }
      ],
      expertAnalysis: 'Trưởng phòng luôn hỏi về công tác phối hợp liên phòng ban (事前相談 - Nemawashi) trước khi đặt bút ký duyệt.',
      bjtTrapWarning: 'Trong bài đọc hiểu BJT, nếu đề hỏi tại sao các cuộc họp ở công ty Nhật diễn ra nhanh chóng, đáp án đúng thường là do đã hoàn tất khâu "根回し" từ trước.'
    },
    practiceQuestion: {
      instruction: '日本企業の稟議制度に関する説明として、最も適切なものを選びなさい。',
      content: '稟議書を提出する前に重要とされる「根回し」の目的は何か。',
      options: [
        '関係者の意見を事前に集約し、会議での円滑な合意形成を図るため。',
        '会社の機密情報を外部の取引先に漏洩させないようにするため。',
        '経費の領収書を整理して税務署に提出する準備をするため。',
        '役員全員にプレゼントを贈って個人的な昇進を頼み込むため。'
      ],
      correctIndex: 0,
      explanation: 'Đáp án đúng là 1: Gom góp ý kiến các bên liên quan từ trước để việc đạt được đồng thuận tại cuộc họp diễn ra suôn sẻ và êm đẹp.'
    }
  },
  {
    id: 8,
    code: 'BJT-08',
    category: 'business_ops',
    categoryLabel: 'Quản trị & Thương mại',
    title: 'Giải quyết khiếu nại & Khủng hoảng khách hàng (クレーム対応・謝罪・再発防止)',
    japaneseTitle: '顧客クレーム処理の4段階手順と誠意ある謝罪の言語技術',
    badge: 'Chuyên đề 8 · Xử lý khủng hoảng',
    description: 'Quy trình 4 bước xử lý khiếu nại chuyên nghiệp: Lắng nghe và xoa dịu cảm xúc giận dữ, Phân tích nguyên nhân khách quan, Đưa ra phương án giải quyết và đền bù thỏa đáng, Cam kết các biện pháp phòng ngừa tái diễn.',
    targetLevel: 'J1+',
    corePrinciples: [
      'Bước 1 - Lắng nghe không ngắt lời: Thể hiện sự thấu cảm bằng "ご不快な思いをおかけし、誠に申し訳ございません" (chưa vội nhận lỗi pháp lý nếu chưa rõ nguyên nhân).',
      'Bước 2 - Phân định rõ trách nhiệm: Tìm hiểu xem lỗi do sản phẩm, lỗi giao vận hay do hiểu lầm từ phía khách.',
      'Bước 3 - Phương án khắc phục: Đổi hàng mới, hoàn tiền hoặc cử kỹ thuật viên tới xử lý tận nơi.',
      'Bước 4 - Tường trình phòng ngừa tái diễn (再発防止策): Lập biên bản cải tiến quy trình kiểm định chất lượng.'
    ],
    practicalExpressions: [
      {
        phrase: 'ご不審の念を抱かせてしまい、弁解の余地もございません',
        reading: 'ごふしんのねんをいだかせてしまい、べんかいのよちもございません',
        meaning: 'Để quý khách phải nghi ngờ và bận lòng, chúng tôi hoàn toàn không có lời nào để biện minh.',
        context: 'Tạ lỗi khi xảy ra lỗi nghiêm trọng.'
      },
      {
        phrase: '至急、原因を究明し、再発防止に努めてまいります',
        reading: 'しきゅう、げんいんをきゅうめいし、さいはつぼうしにつとめてまいります',
        meaning: 'Chúng tôi sẽ khẩn cấp làm rõ nguyên nhân và nỗ lực hết mình để ngăn ngừa tái diễn.',
        context: 'Cam kết trách nhiệm trong văn bản xin lỗi.'
      },
      {
        phrase: 'ご指摘いただき、身の引き締まる思いでございます',
        reading: 'ごしてきいただき、みのひきしまるおもいでございます',
        meaning: 'Được quý khách chỉ ra thiếu sót, chúng tôi vô cùng chấn chỉnh tinh thần và nghiêm túc tiếp thu.',
        context: 'Biến lời phàn nàn thành cơ hội cải tiến dịch vụ.'
      }
    ],
    caseStudy: {
      scenario: 'Khách hàng bức xúc gọi điện vì sản phẩm giao bị trầy xước vỏ hộp bên ngoài.',
      dialogueOrSample: [
        {
          speaker: 'Nhân viên CSKH',
          line: 'せっかく楽しみにお待ちいただいていたにもかかわらず、大変ご不快な思いをおかけいたしました。',
          reading: 'せっかくたのしみにおまちいただいていたにもかかわらず、たいへんごふかいなおもいをおかけいたしました。',
          vn: 'Dù quý khách đã rất mong chờ sản phẩm nhưng chúng tôi lại để quý khách phải chịu cảm xúc khó chịu như vậy.'
        },
        {
          speaker: 'Nhân viên CSKH',
          line: '直ちに新品の良品を手配し、本日中に発送させていただきます。お手元の不良品は着払いにてご返送いただけますでしょうか。',
          reading: 'ただちにしんぴんのりょうひんをてはいし、ほんじつちゅうにはっそうさせていただきます。おてもとのふりょうひんはちゃくばいにてごへんそういただけますでしょうか。',
          vn: 'Chúng tôi sẽ lập tức chuẩn bị một sản phẩm mới hoàn hảo và gửi đi ngay trong ngày hôm nay. Hàng lỗi quý khách vui lòng gửi lại theo hình thức người nhận trả cước ạ.'
        }
      ],
      expertAnalysis: 'Xoa dịu cảm xúc trước (せっかく〜にもかかわらず), sau đó hành động ngay lập tức (直ちに手配) và chịu toàn bộ chi phí phát sinh (着払い - người nhận trả tiền ship).',
      bjtTrapWarning: 'Tuyệt đối tránh câu: "そんなはずはありません" (Làm gì có chuyện đó) - câu này sẽ châm ngòi cơn thịnh nộ của khách hàng lên gấp 10 lần.'
    },
    practiceQuestion: {
      instruction: '顧客からの激しいクレームに対する電話応対の第一声として、最も適切なものを選びなさい。',
      content: '「この商品、説明書通りに動かないぞ！どうなってるんだ！」',
      options: [
        'お客様の使い方が間違っているのではないでしょうか。',
        '大変ご不便とご迷惑をおかけし、誠に申し訳ございません。',
        'それはメーカーの製造ミスですので、こちらでは分かりかねます。',
        '怒鳴らないで静かに状況を説明してください。'
      ],
      correctIndex: 1,
      explanation: 'Đáp án đúng là 2: 「大変ご不便とご迷惑をおかけし、誠に申し訳ございません」(Thành thật xin lỗi vì đã gây ra sự bất tiện và phiền toái to lớn cho quý khách). Xoa dịu tâm lý trước khi đi vào kỹ thuật.'
    }
  },
  {
    id: 9,
    code: 'BJT-09',
    category: 'reading_analysis',
    categoryLabel: 'Đọc hiểu & Biểu đồ',
    title: 'Đọc hiểu tài liệu nội bộ, Nội quy lao động & Hợp đồng (就業規則・雇用契約)',
    japaneseTitle: '労働法規・就業規則および雇用契約条項の読解速解術',
    badge: 'Chuyên đề 9 · Pháp lý lao động',
    description: 'Bóc tách các thuật ngữ pháp lý lao động thường xuất hiện trong đề thi đọc hiểu BJT: Thời gian thử việc (試用期間), nghỉ phép có lương (有給休暇), làm thêm giờ (時間外労働・残業), phụ cấp đi lại (通勤手当), điều chuyển công tác (転勤・出向).',
    targetLevel: 'J1',
    corePrinciples: [
      'Nghỉ phép có lương: 「有給休暇の取得」(Yukyuu kyuuka no shutoku) - quy định về số ngày phép tăng theo thâm niên làm việc.',
      'Quy định làm thêm: 「36協定」(Quy định hiệp định 36) về giới hạn số giờ làm thêm tối đa trong tháng.',
      'Thời gian thử việc: 「試用期間中であっても、正当な理由なき解雇は認められない」(Dù trong thời gian thử việc, việc sa thải không lý do chính đáng là trái pháp luật).',
      'Nghĩa vụ bảo mật: 「退職後も在職中に知り得た企業秘密を漏洩してはならない」(Sau khi nghỉ việc vẫn không được tiết lộ bí mật kinh doanh có được trong lúc làm việc).'
    ],
    practicalExpressions: [
      {
        phrase: '就業規則の改定について全従業員に周知する',
        reading: 'しゅうぎょうきそくのかいていについてぜんじゅうぎょういんにしゅうちする',
        meaning: 'Phổ biến rộng rãi tới toàn thể người lao động về việc sửa đổi nội quy lao động.',
        context: 'Thông báo phòng nhân sự.'
      },
      {
        phrase: '年次有給休暇の計画的付与を実施する',
        reading: 'ねんじゆうきゅうきゅうかのけいかくてきふよをじっしする',
        meaning: 'Thực hiện việc bố trí nghỉ phép năm theo kế hoạch định kỳ.',
        context: 'Chính sách phúc lợi công ty.'
      },
      {
        phrase: '守秘義務に違反した場合、損害賠償を請求されることがある',
        reading: 'しゅひぎむにいはんしたばあい、そんがいばいしょうをせいきゅうされることがある',
        meaning: 'Nếu vi phạm nghĩa vụ bảo mật, có thể bị yêu cầu bồi thường thiệt hại.',
        context: 'Điều khoản hợp đồng lao động.'
      }
    ],
    caseStudy: {
      scenario: 'Đọc hiểu đoạn trích từ Nội quy lao động của công ty BJT về chế độ làm việc từ xa (Telework).',
      dialogueOrSample: [
        {
          speaker: 'Nội quy',
          line: '第12条（在宅勤務）：勤続1年以上の社員は、上長の承認を得た上で、週2日を限度として在宅勤務を行うことができる。',
          reading: 'だいじゅうにじょう（ざいたくきんむ）：きんぞくいちねんいじょうのしゃいんは、じょうちょうのしょうにんをえたうえで、しゅうふつかをげんどとしてざいたくきんむをおこなうことができる。',
          vn: 'Điều 12 (Làm việc tại nhà): Nhân viên có thâm niên làm việc từ 1 năm trở lên, sau khi được cấp trên trực tiếp phê duyệt, được phép làm việc tại nhà tối đa 2 ngày mỗi tuần.'
        },
        {
          speaker: 'Nội quy',
          line: 'ただし、試用期間中の社員および業務の性質上出社が不可欠な職種については、この限りではない。',
          reading: 'ただし、しようきかんちゅうのしゃいんおよびぎょうむのせいしつじょうしゅっしゃがふかけつなしょくしゅについては、このかぎりではない。',
          vn: 'Tuy nhiên, đối với nhân viên đang trong thời gian thử việc và các vị trí có tính chất bắt buộc phải có mặt tại văn phòng thì không áp dụng quy định này.'
        }
      ],
      expertAnalysis: 'Để ý các từ khóa điều kiện: "勤続1年以上" (thâm niên 1 năm), "週2日を限度" (tối đa 2 ngày/tuần), và cụm từ ngoại lệ "この限りではない" (không áp dụng điều này).',
      bjtTrapWarning: 'BJT rất hay hỏi câu ngoại lệ: "Ai là người KHÔNG ĐƯỢC làm việc tại nhà?" -> Đáp án là nhân viên thử việc hoặc công việc đòi hỏi trực tiếp.'
    },
    practiceQuestion: {
      instruction: '就業規則の条文に関する質問に答えなさい。',
      content: '「勤続6ヶ月の契約社員Aさんは、週2日の在宅勤務を申請できるか。」',
      options: [
        '申請できる（全社員に認められているため）。',
        '申請できない（勤続1年未満であるため）。',
        '社長の特命があれば無制限に可能である。',
        '週1日だけなら申請できる。'
      ],
      correctIndex: 1,
      explanation: 'Đáp án đúng là 2: Không được nộp đơn vì quy định ghi rõ "勤続1年以上" (phải làm việc từ 1 năm trở lên), anh A mới làm 6 tháng nên chưa đủ điều kiện.'
    }
  },
  {
    id: 10,
    code: 'BJT-10',
    category: 'keigo_comm',
    categoryLabel: 'Kính ngữ & Giao tiếp',
    title: 'Văn hóa Uchi - Soto & Quan hệ đối tác Nhật Bản (内と外の人間関係・敬語境界線)',
    japaneseTitle: '「ウチとソト」の境界線理論とステークホルダー間の敬語力学',
    badge: 'Chuyên đề 10 · Cội nguồn tư duy Nhật',
    description: 'Ranh giới "Trong - Ngoài" biến chuyển linh hoạt theo vị thế người đối thoại. Người thuộc nhóm Trong (gia đình, công ty mình) phải hạ mình khiêm nhường. Người thuộc nhóm Ngoài (khách hàng, đối tác) phải được tôn vinh lên cao.',
    targetLevel: 'J1+',
    corePrinciples: [
      'Ranh giới biến chuyển linh hoạt: Khi ở trong nội bộ công ty, bạn gọi sếp là "Tanaka-buchou" (kính trọng). Nhưng khi bước ra gặp khách hàng, Giám đốc của bạn trở thành người nhóm Uchi, phải gọi cộc tên là "Tanaka".',
      'Đại từ xưng hô công ty: Công ty mình = 弊社 (Heisha) / 当社 (Tousha - dùng trong báo cáo nội bộ). Công ty khách hàng = 貴社 (Kisha - dùng khi viết) / 御社 (Onsha - dùng khi nói).',
      'Tặng quà đáp lễ (Giri): Luôn gửi quà Ochuugen vào mùa hè và Oseibo vào cuối năm để duy trì sợi dây kết nối bền chặt với khách hàng VIP.'
    ],
    practicalExpressions: [
      {
        phrase: '弊社の担当者より折り返しご連絡差し上げます',
        reading: 'へいしゃのたんとうしゃよりおりかえしごれんらくさしあげます',
        meaning: 'Người phụ trách bên công ty chúng tôi sẽ gọi điện thoại lại cho quý khách.',
        context: 'Nói với khách hàng bên ngoài.'
      },
      {
        phrase: '御社の益々のご発展を心より祈念申し上げます',
        reading: 'おんしゃのますますのごはってんをこころよりきねんもうしあげます',
        meaning: 'Từ đáy lòng xin kính chúc quý công ty ngày càng phát triển thịnh vượng.',
        context: 'Lời kết chúc trang trọng trong văn bản hợp tác.'
      },
      {
        phrase: '身内の恥をさらすようで恐縮ですが',
        reading: 'みうちのはじをさらすようできょうしゅくですが',
        meaning: 'Dù rất áy náy như đang vạch áo cho người xem lưng việc nội bộ...',
        context: 'Khi cần giải thích về sự cố do nhân viên nội bộ gây ra.'
      }
    ],
    caseStudy: {
      scenario: 'Tiếp đón đoàn đại biểu khách hàng Nhật Bản tới thăm nhà máy sản xuất.',
      dialogueOrSample: [
        {
          speaker: 'Chủ nhà',
          line: '本日はご多忙のところ、遠方より足をお運びいただき、誠にありがとうございます。',
          reading: 'ほんじつはごたぼうのところ、えんぽうよりあしをおはこびいただき、まことにありがとうございます。',
          vn: 'Hôm nay giữa lúc bận rộn, quý vị đã cất công không quản đường xa đến thăm, chúng tôi xin chân thành cảm ơn.'
        },
        {
          speaker: 'Chủ nhà',
          line: '工場の案内は、私どもの製造部長の小林が務めさせていただきます。',
          reading: 'こうじょうのあんないは、わたくしどものせいぞうぶちょうのこばやしがつとめさせていただきます。',
          vn: 'Về phần hướng dẫn tham quan nhà máy, anh Kobayashi Trưởng bộ phận sản xuất bên chúng tôi xin phép được đảm nhiệm.'
        }
      ],
      expertAnalysis: 'Dùng cụm từ "足をお運びいただき" (Tôn kính ngữ cho hành động khách đến), và xưng hô cấp dưới mình là "私どもの製造部長の小林" (chức vụ đặt trước tên, không có -san).',
      bjtTrapWarning: 'Đề thi gài: "小林部長様がご案内なさいます" -> SAI NGHIÊM TRỌNG vì dùng kính ngữ cho người nhà trước mặt khách.'
    },
    practiceQuestion: {
      instruction: '社外の取引先に対して、自分の上司（社長）の行動を説明する文として最も適切なものを選びなさい。',
      content: '取引先：「社長様はいらっしゃいますか。」\nあなた：「あいにく、社長の鈴木は（　）。」',
      options: [
        '外出していらっしゃいます',
        '外出されました',
        '外出しております',
        'お出かけになられました'
      ],
      correctIndex: 2,
      explanation: 'Đáp án đúng là 3: 「外出しております」(Giám đốc Suzuki bên em đang đi ra ngoài ạ). Khi nói với khách hàng bên ngoài, sếp của mình thuộc nhóm Uchi, bắt buộc dùng Khiêm nhường ngữ しております.'
    }
  },
  {
    id: 11,
    code: 'BJT-11',
    category: 'business_ops',
    categoryLabel: 'Quản trị & Thương mại',
    title: 'Thuật ngữ Tài chính, Kế toán & Phân tích Báo cáo tài chính (財務・会計・決算書)',
    japaneseTitle: '決算短信と財務諸表（B/S・P/L・C/F）の読解および収益性分析',
    badge: 'Chuyên đề 11 · Tài chính doanh nghiệp',
    description: 'Đọc hiểu báo cáo tài chính doanh nghiệp Nhật Bản: Bảng cân đối kế toán (貸借対照表 B/S), Báo cáo kết quả hoạt động kinh doanh (損益計算書 P/L), Báo cáo lưu chuyển tiền tệ (キャッシュフロー計算書 C/F). Phân biệt các loại lợi nhuận.',
    targetLevel: 'J1+',
    corePrinciples: [
      'Doanh thu thuần: 売上高 (Uriage-daka).',
      'Lợi nhuận gộp: 売上総利益 (Uriage sou-rieki / 粗利益 - Doanh thu trừ giá vốn bán hàng).',
      'Lợi nhuận thuần từ hoạt động kinh doanh: 営業利益 (Eigyou rieki - phản ánh sức khỏe cốt lõi của doanh nghiệp).',
      'Lợi nhuận thông thường: 経常利益 (Keijou rieki - tính thêm doanh thu tài chính và lãi vay ngân hàng).',
      'Lợi nhuận ròng sau thuế: 当期純利益 (Touki jun-rieki).'
    ],
    practicalExpressions: [
      {
        phrase: '今年度は増収増益を達成する見込みです',
        reading: 'こんねんどはぞうしゅうぞうえきをたっせいするみこみです',
        meaning: 'Năm tài chính này công ty dự kiến đạt được tăng cả về doanh thu lẫn lợi nhuận.',
        context: 'Báo cáo đại hội cổ đông.'
      },
      {
        phrase: '営業利益率の向上に向けてコスト削減を図る',
        reading: 'えいぎょうりえきりつのこうじょうにむけてコストさくげんをはかる',
        meaning: 'Hướng tới nâng cao biên lợi nhuận hoạt động kinh doanh thông qua cắt giảm chi phí.',
        context: 'Kế hoạch tái cơ cấu doanh nghiệp.'
      },
      {
        phrase: '自己資本比率が高く、財務健全性は極めて良好です',
        reading: 'じこしほんひりつがたかく、ざいむけんぜんせいはきわめてりょうこうです',
        meaning: 'Tỷ lệ vốn chủ sở hữu cao, sức khỏe an toàn tài chính cực kỳ vững chắc.',
        context: 'Đánh giá tín nhiệm công ty.'
      }
    ],
    caseStudy: {
      scenario: 'Đọc báo cáo tài chính quý 3 của một tập đoàn điện tử niêm yết trên sàn chứng khoán Tokyo.',
      dialogueOrSample: [
        {
          speaker: 'Báo cáo tài chính',
          line: '半導体不足の影響により売上高は微減となったものの、円安の恩恵と固定費削減により、経常利益は前年同期比で20％の大幅増益となった。',
          reading: 'はんどうたいぶそくのえいきょうによりうりあげだかはびげんとなったものの、えんやすのおんけいとこていひさくげんにより、けいじょうりえきはぜんねんどうきひでにじゅっパーセントのおおはばぞうえきとなった。',
          vn: 'Dù doanh thu bị giảm nhẹ do ảnh hưởng của tình trạng thiếu chip bán dẫn, nhưng nhờ hưởng lợi từ đồng Yên suy yếu và việc cắt giảm chi phí cố định, lợi nhuận thông thường đã tăng vọt 20% so với cùng kỳ năm ngoái.'
        }
      ],
      expertAnalysis: 'Cặp từ tương phản: "売上高は微減" (doanh thu giảm nhẹ) đi với "ものの" (tuy nhiên), vế sau là "大幅増益" (lợi nhuận tăng vọt).',
      bjtTrapWarning: 'Đề thi hay hỏi: "Doanh nghiệp này làm ăn tốt hay xấu?" -> Trả lời: Doanh thu giảm nhưng lợi nhuận tăng nhờ tỷ giá và tiết kiệm chi phí.'
    },
    practiceQuestion: {
      instruction: '財務用語に関する記述として最も適切なものを選びなさい。',
      content: '本業の営業活動から直接生み出された利益を示す用語はどれか。',
      options: [
        '売上高',
        '営業利益',
        '当期純利益',
        '特別利益'
      ],
      correctIndex: 1,
      explanation: 'Đáp án đúng là 2: 【営業利益】(Lợi nhuận hoạt động kinh doanh cốt lõi). Nó phản ánh chính xác khả năng kiếm tiền từ ngành nghề kinh doanh chính của doanh nghiệp.'
    }
  },
  {
    id: 12,
    code: 'BJT-12',
    category: 'business_ops',
    categoryLabel: 'Quản trị & Thương mại',
    title: 'Logistics, Chuỗi cung ứng & Nghiệp vụ Xuất nhập khẩu (サプライチェーン・貿易実務)',
    japaneseTitle: '通関・船積み実務およびSCMサプライチェーンリスク管理',
    badge: 'Chuyên đề 12 · Nghiệp vụ ngoại thương',
    description: 'Các điều kiện thương mại quốc tế Incoterms (FOB, CIF), vận đơn đường biển (船荷証券 B/L), thủ tục hải quan xuất nhập khẩu (通関手続), quản lý tồn kho an toàn (安全在庫) và xử lý rủi ro đứt gãy chuỗi cung ứng.',
    targetLevel: 'J1',
    corePrinciples: [
      'Điều kiện Incoterms: FOB (Free on Board - giao hàng lên tàu), CIF (Cost, Insurance and Freight - tiền hàng, bảo hiểm và cước phí tàu).',
      'Bộ chứng từ xuất nhập khẩu: Hóa đơn thương mại (商業送り状 Commercial Invoice), phiếu đóng gói (梱包明細書 Packing List), vận đơn đường biển (B/L).',
      'Thủ tục thông quan: 「通関手続を経て、輸入許可書を取得する」(Trải qua thủ tục thông quan để nhận giấy phép nhập khẩu).',
      'Quản lý chuỗi cung ứng: Tránh tình trạng cháy hàng (品切れ) nhưng không để tồn kho quá mức gây ứ đọng vốn (在庫過多).'
    ],
    practicalExpressions: [
      {
        phrase: '船積みが完了次第、船荷証券（B/L）をお送りいたします',
        reading: 'ふなづみがかんりょうしだい、ふなにしょうけんをおおくりいたします',
        meaning: 'Ngay khi việc xếp hàng lên tàu hoàn tất, chúng tôi sẽ gửi vận đơn B/L cho quý đối tác.',
        context: 'Thông báo xuất khẩu hàng hóa.'
      },
      {
        phrase: '通関で思わぬ足止めを食らい、納品が1日遅延いたします',
        reading: 'つうかんでおもわぬあしどめをくらい、のうひんがいちにちちえんいたします',
        meaning: 'Do gặp trục trặc bất ngờ tại khâu thông quan hải quan nên hàng giao sẽ bị trễ 1 ngày.',
        context: 'Báo cáo sự cố logistics.'
      },
      {
        phrase: 'リードタイムの短縮を図るため、国内倉庫を活用する',
        reading: 'リードタイムのたんしゅくをはかるため、こくないそうこをかつようする',
        meaning: 'Để rút ngắn thời gian giao hàng (Lead time), chúng tôi tận dụng hệ thống kho bãi nội địa.',
        context: 'Chiến lược tối ưu hóa phân phối.'
      }
    ],
    caseStudy: {
      scenario: 'Email trao đổi giữa công ty xuất khẩu linh kiện tại Việt Nam và công ty sản xuất xe hơi tại Nagoya.',
      dialogueOrSample: [
        {
          speaker: 'Email',
          line: 'ご注文いただきましたエンジン部品（ロット番号EK-88）につきまして、予定通り横浜港へ向けて出航いたしました。',
          reading: 'ごちゅうもんいただきましたエンジンぶひん（ロットばんごうイーケーはちじゅうはち）につきまして、よていどおりよこはまこうへむけてしゅっこういたしました。',
          vn: 'Về lô linh kiện động cơ (Mã lô EK-88) quý công ty đã đặt hàng, tàu đã xuất bến đúng kế hoạch hướng về cảng Yokohama.'
        },
        {
          speaker: 'Email',
          line: 'インボイスおよびパッキングリストを添付ファイルにてお送りいたしますので、ご査収のほどお願い申し上げます。',
          reading: 'インボイスおよびパッキングリストをてんぷファイルにておおくりいたしますので、ごさしゅうのほどおねがいもうしあげます。',
          vn: 'Kính gửi kèm hóa đơn thương mại và phiếu đóng gói qua tệp đính kèm, kính mong quý đối tác kiểm tra tiếp nhận.'
        }
      ],
      expertAnalysis: 'Văn phong thông báo xuất hàng chuẩn quốc tế: Xác nhận tên hàng, mã lô, cảng đến và gửi kèm bộ chứng từ bắt buộc.',
      bjtTrapWarning: 'Từ vựng "着払い" (người nhận trả tiền cước) và "元払い" (người gửi trả trước) thường xuyên bị gài bẫy trong phần thi nghe BJT.'
    },
    practiceQuestion: {
      instruction: '貿易実務において、貨物の所有権を表し、荷物の引き取りに必要な最重要書類はどれか。',
      content: '「輸入地で貨物を受け取るために、船会社に提示しなければならない有価証券は何か。」',
      options: [
        '見積書（Quotation）',
        '船荷証券（Bill of Lading / B/L）',
        '請求書（Invoice）',
        '領収書（Receipt）'
      ],
      correctIndex: 1,
      explanation: 'Đáp án đúng là 2: 【船荷証券】(B/L - Bill of Lading). Đây là chứng từ sở hữu hàng hóa có giá trị pháp lý bắt buộc phải xuất trình để nhận hàng tại cảng đến.'
    }
  },
  {
    id: 13,
    code: 'BJT-13',
    category: 'business_ops',
    categoryLabel: 'Quản trị & Thương mại',
    title: 'Quản trị Nhân sự, Tuyển dụng & Đánh giá năng lực (人事・採用・労務管理・360度評価)',
    japaneseTitle: '人材マネジメント・採用面接の評価基準と人事考課制度',
    badge: 'Chuyên đề 13 · Quản trị con người',
    description: 'Quy trình tuyển dụng và đánh giá nhân tài trong doanh nghiệp Nhật: Phỏng vấn ứng viên theo phương pháp STAR, đánh giá 360 độ (多面評価), chế độ đãi ngộ lương bổng theo thâm niên kết hợp năng lực (職能給・成果給), và đào tạo nội bộ OJT.',
    targetLevel: 'J1',
    corePrinciples: [
      'Đào tạo nội bộ OJT (On-the-Job Training): Vừa làm việc thực tế vừa được tiền bối (Senpai) kèm cặp chỉ dẫn từng bước.',
      'Đánh giá hiệu suất KPI & MBO: Mục tiêu quản lý theo kết quả (目標管理制度).',
      'Đánh giá 360 độ: Được đánh giá chéo từ cấp trên, đồng nghiệp ngang cấp, cấp dưới và đối tác bên ngoài.',
      'Phúc lợi và giữ chân nhân tài: Đãi ngộ nhà ở (社宅), phụ cấp gia đình (家族手当), và lộ trình thăng tiến rõ ràng (キャリアパス).'
    ],
    practicalExpressions: [
      {
        phrase: '人物本位の採用選考を実施しております',
        reading: 'じんぶつほんいのさいようせんこうをじっししております',
        meaning: 'Chúng tôi tiến hành tuyển chọn ứng viên dựa trên tư chất con người thực tế.',
        context: 'Tiêu chí tuyển dụng của công ty Nhật.'
      },
      {
        phrase: '半期ごとの人事考課に基づき、昇給および賞与を決定する',
        reading: 'はんきごとのじんじこうかに基づき、しょうきゅうおよびしょうよをけっていする',
        meaning: 'Căn cứ vào đợt đánh giá nhân sự nửa năm một lần, công ty sẽ quyết định việc tăng lương và thưởng.',
        context: 'Quy chế lương thưởng.'
      },
      {
        phrase: '若手社員の自律的なキャリア形成を支援する',
        reading: 'わかてしゃいんのじりつてきなキャリアけいせいをしえんする',
        meaning: 'Hỗ trợ việc xây dựng lộ trình sự nghiệp chủ động cho nhân viên trẻ.',
        context: 'Chính sách phát triển nguồn nhân lực.'
      }
    ],
    caseStudy: {
      scenario: 'Buổi phỏng vấn tuyển dụng vị trí Trưởng nhóm cầu nối kỹ sư BrSE Nhật - Việt.',
      dialogueOrSample: [
        {
          speaker: 'Người phỏng vấn',
          line: 'これまでのプロジェクトで、困難な対立をどのように乗り越えたか、具体例を挙げて教えていただけますか。',
          reading: 'これまでのプロジェクトで、こんなんなたいりつをどのようにのりこえたか、ぐていれいをあげておしえていただけますか。',
          vn: 'Trong các dự án trước đây, bạn đã vượt qua những xung đột thử thách như thế nào, bạn có thể nêu ví dụ cụ thể được không?'
        },
        {
          speaker: 'Ứng viên',
          line: '文化の違いによる仕様理解の齟齬が発生した際、双方が納得するまで直接対話を重ね、認識の統一を図りました。',
          reading: 'ぶんかのちがいによるしようりかいのそごがはっせいしたさい、そうほうがなっとくするまでちょくせつたいわをかさね、にんしきのとういつをはかりました。',
          vn: 'Khi xảy ra bất đồng hiểu lệch về đặc tả do khác biệt văn hóa, tôi đã liên tục trao đổi trực tiếp cho tới khi hai bên đồng thuận, nhằm thống nhất nhận thức chung.'
        }
      ],
      expertAnalysis: 'Ứng viên sử dụng từ ngữ cao cấp: "仕様理解の齟齬" (lệch pha hiểu đặc tả kỹ thuật), "認識の統一を図る" (hướng tới thống nhất nhận thức) - ghi điểm tuyệt đối trong mắt nhà tuyển dụng Nhật.',
      bjtTrapWarning: 'Trong phỏng vấn tuyển dụng, tuyệt đối tránh nói xấu công ty cũ ("前の会社は残業が多くて嫌だった"). Người Nhật sẽ đánh giá bạn thiếu lòng trung thành và tính nhẫn nại.'
    },
    practiceQuestion: {
      instruction: '日本企業の人材育成において、実務を通じて上司や先輩が後輩を直接指導する方式を何と呼ぶか。',
      content: '「実際の職場で業務を遂行しながら、必要なスキルやマナーを習得させる教育手法はどれか。」',
      options: [
        'Off-JT（職場外研修）',
        'OJT（On-the-Job Training）',
        'MBO（目標管理）',
        'RPA（業務自動化）'
      ],
      correctIndex: 1,
      explanation: 'Đáp án đúng là 2: 【OJT】(On-the-Job Training - Đào tạo tại nơi làm việc thực tế). Phương thức đào tạo truyền thống cốt lõi của mọi công ty Nhật Bản.'
    }
  },
  {
    id: 14,
    code: 'BJT-14',
    category: 'reading_analysis',
    categoryLabel: 'Đọc hiểu & Biểu đồ',
    title: 'Chiến lược Tiếp thị, Nghiên cứu thị trường & Hành vi tiêu dùng (マーケティング・市場調査)',
    japaneseTitle: 'マーケティング戦略（4P・STP）と日本型消費者インサイトの分析',
    badge: 'Chuyên đề 14 · Tiếp thị & Thị trường',
    description: 'Phân tích chiến lược tiếp thị thị trường Nhật Bản: Phân khúc khách hàng (Segmentation), thị trường mục tiêu (Targeting), định vị thương hiệu (Positioning). Tâm lý người tiêu dùng Nhật Bản chuộng sự an toàn, chất lượng tỉ mỉ và uy tín thương hiệu lâu đời.',
    targetLevel: 'J1',
    corePrinciples: [
      'Tâm lý tiêu dùng Nhật: Chú trọng độ tin cậy và sự tỉ mỉ của bao bì hơn là chỉ chăm chăm vào giá rẻ.',
      'Nghiên cứu thị trường: Khảo sát bảng hỏi (アンケート調査), phỏng vấn nhóm tập trung (グループインタビュー), phân tích dữ liệu mua hàng POS.',
      'Chiến lược sản phẩm: Khác biệt hóa sản phẩm (差別化戦略), cải tiến liên tục dựa trên ý kiến khách hàng (VOC - Voice of Customer).',
      'Xây dựng thương hiệu: Định vị thương hiệu cao cấp (ブランディング), truyền miệng tích cực (口コミ).'
    ],
    practicalExpressions: [
      {
        phrase: '若年層をターゲットにしたプロモーションを展開する',
        reading: 'じゃくねんそうをターゲットにしたプロモーションをてんかいする',
        meaning: 'Triển khai chiến dịch quảng bá nhắm vào phân khúc giới trẻ.',
        context: 'Chiến dịch marketing mùa hè.'
      },
      {
        phrase: '競合他社との差別化を図るため、アフターサービスを強化する',
        reading: 'きょうごうたしゃとのさべつかをつながるため、アフターサービスをきょうかする',
        meaning: 'Để tạo sự khác biệt với các đối thủ cạnh tranh, chúng tôi tăng cường dịch vụ hậu mãi.',
        context: 'Chiến lược cạnh tranh.'
      },
      {
        phrase: 'SNS上の口コミ効果により、認知度が飛躍的に向上した',
        reading: 'エスエヌエスじょうのくちこみこうかにより、にんちどがひやくてきにこうじょうした',
        meaning: 'Nhờ hiệu ứng truyền miệng trên mạng xã hội, độ nhận diện thương hiệu đã tăng trưởng vượt bậc.',
        context: 'Báo cáo hiệu quả tiếp thị.'
      }
    ],
    caseStudy: {
      scenario: 'Báo cáo kết quả nghiên cứu thị trường về dòng trà sữa hữu cơ Việt Nam ra mắt tại Tokyo.',
      dialogueOrSample: [
        {
          speaker: 'Báo cáo',
          line: '健康志向の高まりを背景に、無糖・オーガニック製品への需要が拡大傾向にあることが判明した。',
          reading: 'けんこうしこうのたかまりをはいけいに、むとう・オーガニックせいひんへのじゅようがかくだいけいこうにあることがはんめいした。',
          vn: 'Với bối cảnh ý thức bảo vệ sức khỏe ngày càng tăng cao, kết quả cho thấy nhu cầu đối với các sản phẩm không đường và hữu cơ đang có chiều hướng mở rộng mạnh.'
        },
        {
          speaker: 'Báo cáo',
          line: '特に20代から30代の働く女性層において、高い購買意欲が確認された。',
          reading: 'とくににじゅうだいからさんじゅうだいのはたらくじょせいそうにおいて、たかいこうばいいよくがかくにんされた。',
          vn: 'Đặc biệt ở phân khúc phụ nữ đi làm từ 20 đến 30 tuổi, tỷ lệ sẵn sàng chi trả mua sắm được ghi nhận ở mức rất cao.'
        }
      ],
      expertAnalysis: 'Dùng từ vựng phân tích thị trường chuẩn xác: "健康志向の高まり" (xu hướng quan tâm sức khỏe), "購買意欲" (ý muốn mua hàng), "働く女性層" (tập khách hàng phụ nữ đi làm).',
      bjtTrapWarning: 'Trong bài đọc BJT, chú ý sự khác biệt giữa "需要" (nhu cầu/cầu) và "供給" (cung ứng/cung).'
    },
    practiceQuestion: {
      instruction: 'マーケティング用語に関する文として最も適切なものを選びなさい。',
      content: '消費者が特定の商品やサービスに対して抱く独自の価値や信頼感を高める活動を何と呼ぶか。',
      options: [
        'ダンピング（不当廉売）',
        'ブランディング（ブランド構築）',
        'インサイダー取引',
        'カルテル（価格協定）'
      ],
      correctIndex: 1,
      explanation: 'Đáp án đúng là 2: 【ブランディング】(Branding - Xây dựng và định vị thương hiệu). Tạo dựng giá trị độc bản và niềm tin trong lòng người tiêu dùng.'
    }
  },
  {
    id: 15,
    code: 'BJT-15',
    category: 'business_ops',
    categoryLabel: 'Quản trị & Thương mại',
    title: 'Chuyển đổi số DX & Công nghệ thông tin trong doanh nghiệp Nhật (DX・ITビジネス・クラウド)',
    japaneseTitle: 'デジタルトランスフォーメーション（DX）とITガバナンス実務',
    badge: 'Chuyên đề 15 · Xu hướng thời đại DX',
    description: 'Xu thế chuyển đổi số (Digital Transformation) đang bùng nổ tại các doanh nghiệp Nhật Bản: Tự động hóa quy trình nghiệp vụ bằng phần mềm RPA, số hóa tài liệu hóa đơn điện tử (ペーパーレス), bảo mật đám mây và phòng chống tấn công mạng ransomware.',
    targetLevel: 'J1',
    corePrinciples: [
      'Chuyển đổi số DX: 既存の業務プロセスをデジタル技術で根本から変革する (Cải cách tận gốc quy trình vận hành cũ bằng công nghệ số).',
      'Văn phòng không giấy tờ: ペーパーレス化 (Paperless) - giảm thiểu in ấn, chuyển sang ký hợp đồng điện tử (電子契約).',
      'Tự động hóa RPA: Robotic Process Automation - robot phần mềm xử lý các tác vụ lặp đi lặp lại như nhập hóa đơn, xuất file Excel.',
      'Bảo mật thông tin: Quản lý quyền truy cập (アクセス権限), mã hóa dữ liệu (暗号化), và đào tạo an ninh mạng cho nhân viên.'
    ],
    practicalExpressions: [
      {
        phrase: 'レガシーシステムを刷新し、クラウドへ移行する',
        reading: 'レガシーシステムをさっしんし、クラウドへいこうする',
        meaning: 'Đổi mới toàn diện hệ thống máy chủ cũ kỹ (Legacy system) và chuyển đổi lên nền tảng đám mây.',
        context: 'Dự án nâng cấp hạ tầng IT.'
      },
      {
        phrase: 'RPAの導入により、年間1,000時間の残業時間を削減した',
        reading: 'アールピーエーのどうにゅうにより、ねんかんせんじかんのざんぎょうじかんをさくげんした',
        meaning: 'Nhờ áp dụng công nghệ tự động hóa RPA, công ty đã cắt giảm được 1.000 giờ làm thêm mỗi năm.',
        context: 'Báo cáo hiệu quả cải tiến năng suất.'
      },
      {
        phrase: '不審なメールの添付ファイルは絶対に開かないでください',
        reading: 'ふしんなメールのてんぷファイルはぜったいにひらかないでください',
        meaning: 'Tuyệt đối không được mở tệp đính kèm của các email đáng ngờ.',
        context: 'Cảnh báo an ninh mạng nội bộ.'
      }
    ],
    caseStudy: {
      scenario: 'Thông báo về việc áp dụng chữ ký số và hợp đồng điện tử thay thế con dấu Hanko truyền thống.',
      dialogueOrSample: [
        {
          speaker: 'Thông báo',
          line: '業務の迅速化およびテレワーク環境の整備を目的として、来月1日より電子契約サービスを全面導入いたします。',
          reading: 'ぎょうむのじんそくかおよびテレワークかんきょうのせいびをもくてきとして、らいげつついたちよりでんしけいやくサービスをぜんめんどうにゅういたします。',
          vn: 'Nhằm mục đích đẩy nhanh tốc độ xử lý công việc và hoàn thiện môi trường làm việc từ xa, từ ngày 1 tháng tới công ty sẽ chính thức áp dụng toàn diện dịch vụ hợp đồng điện tử.'
        },
        {
          speaker: 'Thông báo',
          line: 'これにより、従来の書面による押印や郵送の手間が大幅に削減される見通しです。',
          reading: 'これにより、じゅうらいのしょめんによるおういんやゆうそうのてまがおおはばにさくげんされるみとおしです。',
          vn: 'Nhờ đó, dự kiến sẽ cắt giảm được đáng kể thời gian và công sức đóng dấu trên giấy và gửi bưu điện truyền thống.'
        }
      ],
      expertAnalysis: 'Văn phong thông báo cải tiến công nghệ: Nêu rõ mục đích (業務の迅速化), thời gian áp dụng (来月1日より) và lợi ích cắt giảm chi phí (手間の削減).',
      bjtTrapWarning: 'Trong văn bản IT Nhật, chú ý phân biệt: "本番環境" (Môi trường chạy thật Production) và "テスト環境" (Môi trường thử nghiệm Staging/Test).'
    },
    practiceQuestion: {
      instruction: 'ITビジネス用語に関する記述として最も適切なものを選びなさい。',
      content: '定型的なパソコン業務をソフトウェアロボットによって自動化する技術はどれか。',
      options: [
        'RPA（Robotic Process Automation）',
        'IoT（Internet of Things）',
        'SEO（Search Engine Optimization）',
        'B2C（Business to Consumer）'
      ],
      correctIndex: 0,
      explanation: 'Đáp án đúng là 1: 【RPA】(Robotic Process Automation). Công nghệ robot phần mềm tự động hóa các thao tác văn phòng lặp lại theo quy tắc.'
    }
  },
  {
    id: 16,
    code: 'BJT-16',
    category: 'keigo_comm',
    categoryLabel: 'Kính ngữ & Giao tiếp',
    title: 'Nghi thức Trao đổi danh thiếp, Chào hỏi & Tiệc chiêu đãi (名刺交換・会食・席次マナー)',
    japaneseTitle: '名刺交換の所作と会食・タクシー・会議室における上座・下座の席次原則',
    badge: 'Chuyên đề 16 · Tác phong danh thiếp & Bàn tiệc',
    description: 'Quy tắc "chân lý" về ghế thượng vị (Kamiza - vị trí danh dự sâu nhất phòng cách xa cửa ra vào) và ghế hạ vị (Shimoza - vị trí gần cửa dành cho người đón tiếp/người trẻ tuổi). Nghi thức trao nhận danh thiếp 2 tay không đè ngón tay lên chữ ký.',
    targetLevel: 'J1',
    corePrinciples: [
      'Quy tắc Kamiza / Shimoza: Người có địa vị cao nhất hoặc khách hàng ngồi ở vị trí sâu nhất trong phòng họp (Kamiza - 上座). Người đón tiếp hoặc cấp bậc thấp nhất ngồi gần cửa ra vào nhất (Shimoza - 下座).',
      'Vị trí trên xe hơi: Xe có tài xế riêng -> Ghế danh dự nhất là ghế phía sau bên phải (ngay sau ghế phụ lái). Xe do sếp lái -> Ghế danh dự là ghế phụ lái phía trước.',
      'Nghi thức danh thiếp (Meishi): Đưa danh thiếp bằng cả 2 tay, hướng chữ về phía đối phương, nói rõ tên công ty và họ tên mình. Không cất danh thiếp ngay vào túi áo (thô lỗ), phải đặt ngay ngắn trên hộp đựng danh thiếp Meishire.',
      'Tiệc chiêu đãi Nomikai: Khi rót bia (Oshaku) cho cấp trên, luôn cầm chai bia bằng 2 tay, nhãn chai hướng lên trên. Khi cụng ly, miệng ly của mình phải thấp hơn miệng ly của sếp.'
    ],
    practicalExpressions: [
      {
        phrase: '頂戴いたします。よろしくお願い申し上げます',
        reading: 'ちょうだいいたします。よろしくおねがいもうしあげます',
        meaning: 'Em xin phép được đón nhận danh thiếp của quý ngài. Rất mong được sự giúp đỡ.',
        context: 'Nói khi tiếp nhận danh thiếp của đối tác bằng 2 tay.'
      },
      {
        phrase: 'どうぞ奥のお席にお掛けください',
        reading: 'どうぞおくのおせきにおかけください',
        meaning: 'Kính mời quý khách ngồi vào vị trí phía trong ạ.',
        context: 'Mời khách ngồi vào ghế thượng vị Kamiza.'
      },
      {
        phrase: '本日はお招きいただき、大変光栄でございます',
        reading: 'ほんじつはおまねきいただき、たいへんこうえいでございます',
        meaning: 'Hôm nay được quý công ty mời tới dự tiệc, tôi vô cùng vinh hạnh.',
        context: 'Lời chào khi bước vào bữa tiệc chiêu đãi đối tác.'
      }
    ],
    caseStudy: {
      scenario: 'Hai nhân viên công ty A đi cùng Trưởng phòng đón 3 đối tác quan trọng bước vào phòng họp.',
      dialogueOrSample: [
        {
          speaker: 'Nhân viên',
          line: '山田様、どうぞこちらの奥のソファーにお掛けください。',
          reading: 'やまださま、どうぞこちらのおくのソファーにおかけください。',
          vn: 'Kính mời ngài Yamada ngồi vào ghế sô-pha phía trong này ạ.'
        },
        {
          speaker: 'Đối tác',
          line: 'ありがとうございます。では、失礼してお座りいたします。',
          reading: 'ありがとうございます。では、しつれいしておすわりいたします。',
          vn: 'Cảm ơn quý vị. Vậy tôi xin phép được ngồi.'
        }
      ],
      expertAnalysis: 'Hướng dẫn khách vào vị trí sâu nhất (奥のお席 - Kamiza), nhân viên đón tiếp ngồi phía gần cửa để tiện mở cửa và bưng nước trà.',
      bjtTrapWarning: 'Đề thi hình ảnh BJT rất hay vẽ sơ đồ phòng họp có 4 chiếc ghế quanh bàn và hỏi: "Vị trí nào là của vị khách VIP nhất?" -> Luôn chọn vị trí sâu nhất bên trong, đối diện cửa ra vào.'
    },
    practiceQuestion: {
      instruction: '名刺交換のマナーとして、不適切なものを一つ選びなさい。',
      content: '名刺を交換する際、行ってはならない行動はどれか。',
      options: [
        '両手で名刺を差し出し、相手が読める向きにして渡す。',
        '相手の名刺を受け取った後、相手の社名やロゴの上に指を置いて持つ。',
        '受け取った名刺は、商談中は名刺入れの上に置いてテーブルに並べる。',
        '名刺を渡す際、会社名・部署名・氏名を名乗りながら一礼する。'
      ],
      correctIndex: 1,
      explanation: 'Đáp án sai (hành động không được làm) là 2: Tuyệt đối không được để ngón tay đè lên logo công ty hoặc tên của đối phương khi cầm danh thiếp. Đó bị coi là hành vi bất kính.'
    }
  },
  {
    id: 17,
    code: 'BJT-17',
    category: 'reading_analysis',
    categoryLabel: 'Đọc hiểu & Biểu đồ',
    title: 'Kỹ thuật Đọc lướt văn bản BJT & Bắt từ khóa trong 60 giây (BJT読解速読術・キーワード抽出)',
    japaneseTitle: 'BJT読解セクションのタイムマネジメントと「逆三角スキャン」速読術',
    badge: 'Chuyên đề 17 · Tốc độ làm bài CBT',
    description: 'Chiến thuật giải đề đọc hiểu BJT trên máy tính: Đọc lướt theo hình tam giác ngược (Scan tiêu đề -> Người gửi/người nhận -> Câu hỏi -> Quét từ khóa trong thân bài). Phân bổ tối đa 90 giây cho mỗi câu hỏi đọc hiểu.',
    targetLevel: 'J1+',
    corePrinciples: [
      'Nguyên tắc Đọc câu hỏi trước: Luôn đọc câu hỏi và 4 phương án trước khi đọc bài để định vị chính xác thông tin cần tìm.',
      'Định vị văn bản trong 5 giây: Nhìn nhanh tiêu đề (件名), người gửi (差出人), người nhận (宛先), ngày giờ ban hành.',
      'Bắt liên từ chuyển ý: Khi thấy 「しかし」「だが」「つきましては」「なお」 thì giảm tốc độ đọc kỹ câu nằm ngay sau đó vì 85% đáp án nằm ở đây.',
      'Xử lý phần ghi chú bên dưới (注): Các số liệu hoặc điều kiện loại trừ nằm ở dòng chữ nhỏ cuối văn bản thường là chiếc bẫy tinh vi nhất của BJT.'
    ],
    practicalExpressions: [
      {
        phrase: '詳細は別紙をご参照ください',
        reading: 'しょうさいはべっしをごさんしょうください',
        meaning: 'Chi tiết xin vui lòng tham khảo tờ tài liệu đính kèm riêng.',
        context: 'Dẫn chứng tài liệu trong văn bản thông báo.'
      },
      {
        phrase: '本件に関するお問い合わせは、担当窓口まで',
        reading: 'ほんけんにかんするおといあわせは、たんとうまどぐちまで',
        meaning: 'Mọi thắc mắc liên quan đến vấn đề này, xin vui lòng liên hệ đầu mối phụ trách.',
        context: 'Câu kết thông báo.'
      },
      {
        phrase: '期日を過ぎた申請は受理いたしかねますのでご注意ください',
        reading: 'きじつをすぎたしんせいはじゅりいたしかねますのでごちゅういください',
        meaning: 'Xin lưu ý các đơn xin nộp quá hạn chót sẽ không được tiếp nhận.',
        context: 'Quy định hạn chót trong thông báo.'
      }
    ],
    caseStudy: {
      scenario: 'Văn bản thông báo về việc thay đổi địa điểm tổ chức đại hội cổ đông thường niên.',
      dialogueOrSample: [
        {
          speaker: 'Văn bản',
          line: '【重要】第25期定時株主総会 開催会場変更のお知らせ',
          reading: '',
          vn: '【QUAN TRỌNG】Thông báo thay đổi địa điểm tổ chức Đại hội cổ đông thường niên lần thứ 25'
        },
        {
          speaker: 'Văn bản',
          line: '当初予定しておりました本社ビル大会議室が改修工事中であるため、近隣の「グランドホテル東京 3階 鳳凰の間」へ変更いたします。なお、開始時刻（午前10時）に変更はございません。',
          reading: '',
          vn: 'Do phòng hội nghị lớn tại tòa nhà trụ sở chính dự kiến ban đầu đang sửa chữa, địa điểm sẽ được đổi sang "Khách sạn Grand Hotel Tokyo, tầng 3, sảnh Phượng Hoàng". Ngoài ra, thời gian bắt đầu (10 giờ sáng) không có sự thay đổi.'
        }
      ],
      expertAnalysis: 'Từ khóa then chốt: "会場変更" (đổi địa điểm) -> Grand Hotel Tokyo. Bẫy gài: "開始時刻に変更はございません" (giờ bắt đầu 10:00 không đổi).',
      bjtTrapWarning: 'Đề thi hay hỏi: "Nội dung nào KHÔNG BỊ THAY ĐỔI?" -> Đáp án là thời gian bắt đầu (10 giờ sáng).'
    },
    practiceQuestion: {
      instruction: '速読技術に基づき、社内通知の要点を素早く把握しなさい。',
      content: '社内通知に「なお、本制度の適用は正社員に限り、パート・アルバイトは対象外とする」とある場合、正しい記述はどれか。',
      options: [
        'パート・アルバイトも申請すれば制度を利用できる。',
        '正社員のみが本制度の適用対象である。',
        '全従業員が一律に適用対象となる。',
        '役員のみが対象となる。'
      ],
      correctIndex: 1,
      explanation: 'Đáp án đúng là 2: 「正社員に限り」(chỉ giới hạn nhân viên chính thức) và 「対象外とする」(không áp dụng cho part-time).'
    }
  },
  {
    id: 18,
    code: 'BJT-18',
    category: 'cbt_strategy',
    categoryLabel: 'Chiến lược phòng thi CBT',
    title: 'Bóc tách bẫy Nghe hiểu & Nghe đọc hiểu BJT (BJT聴読解・聴解の引っかけ分析)',
    japaneseTitle: '聴読解・聴解セクションのトラップ構造解剖と先読みテクニック',
    badge: 'Chuyên đề 18 · Cứu cánh điểm số Nghe',
    description: 'Bóc tách 3 cái bẫy kinh điển trong bài thi Nghe BJT: Bẫy phủ định kép (Đồng ý nhưng nói lùi), Bẫy đổi ý phút chót ("A cũng tốt nhưng thôi lấy B"), và Kỹ thuật vừa nhìn biểu đồ vừa bắt từ khóa âm thanh.',
    targetLevel: 'J1+',
    corePrinciples: [
      'Kỹ thuật xem trước (先読み): Dùng 5 giây trước khi phát âm thanh để quét nhanh tiêu đề biểu đồ và các đáp án trên màn hình.',
      'Bẫy lật ngược vấn đề: Người nói thường mở đầu bằng việc khen ngợi phương án A, nhưng sau đó dùng 「ただ...」「しかし...」「予算を考えると...」 để chốt phương án B.',
      'Xác định người thực hiện hành động: Câu hỏi hỏi "Người A sẽ làm gì tiếp theo?" khác hoàn toàn với "Người B sẽ làm gì tiếp theo?".',
      'Đại từ chỉ định ngầm: Chú ý các từ 「その件」「先ほどの件」「例の書類」 để biết người nói đang ám chỉ dự án nào.'
    ],
    practicalExpressions: [
      {
        phrase: '一理ありますが、今回は見送ることにしましょう',
        reading: 'いちりありますが、こんかいはみおくることにしましょう',
        meaning: 'Ý kiến đó cũng có lý đấy, nhưng lần này chúng ta hãy tạm gác lại.',
        context: 'Quyết định bác bỏ đề xuất.'
      },
      {
        phrase: 'せっかくの提案だけど、納期が間に合わないね',
        reading: 'せっかくのていあんだけど、のうきがまにあわないね',
        meaning: 'Đề xuất rất hay đấy nhưng thời hạn giao hàng lại không kịp mất rồi.',
        context: 'Lý do từ chối phương án.'
      },
      {
        phrase: 'では、そちらの方向で進めてください',
        reading: 'では、そちらのほうこうですすめてください',
        meaning: 'Vậy hãy cứ tiến hành theo hướng đi đó đi nhé.',
        context: 'Chốt chỉ thị phương án cuối cùng.'
      }
    ],
    caseStudy: {
      scenario: 'Hai nhân viên đang bàn nhau chọn quà tặng lưu niệm cho đoàn đối tác Việt Nam sắp sang thăm.',
      dialogueOrSample: [
        {
          speaker: 'Nữ',
          line: '伝統工芸品の扇子なんて、日本らしくて喜ばれるんじゃないかしら。',
          reading: '',
          vn: 'Quạt xếp thủ công truyền thống mang đậm nét Nhật Bản chắc sẽ được yêu thích lắm đấy nhỉ.'
        },
        {
          speaker: 'Nam',
          line: 'うーん、扇子は以前も贈ったことがあるからね。今回は日持ちのする銘菓の詰め合わせにしないか。荷物にもならないし。',
          reading: '',
          vn: 'Ừm, quạt xếp lần trước mình tặng rồi mà. Lần này hay là chọn hộp bánh kẹo đặc sản bảo quản được lâu đi? Vừa không bị cồng kềnh hành lý.'
        },
        {
          speaker: 'Nữ',
          line: 'そうね、それが一番無難ね。そうしましょう。',
          reading: '',
          vn: 'Ừ nhỉ, cái đó là an toàn nhất rồi. Quyết định vậy đi.'
        }
      ],
      expertAnalysis: 'Phương án quạt xếp (扇子) được đưa ra trước nhưng bị bác bỏ vì trùng lặp. Phương án bánh kẹo đặc sản (銘菓の詰め合わせ) được thống nhất cuối cùng.',
      bjtTrapWarning: 'Thí sinh hay chọn ngay đáp án đầu tiên nghe thấy (扇子) mà không nghe hết câu đối đáp chốt hạ ở đoạn kết.'
    },
    practiceQuestion: {
      instruction: '会話を聞いて、二人が最終的に決定した行動として最も適切なものを選びなさい。',
      content: '男：「新製品のチラシ、印刷会社に発注するかい？」\n女：「その前に、課長の最終確認をもらわなきゃダメよ。」\n男：「あ、そうだった。じゃあまず課長のところへ行こう。」\n二人はこの後、まず何をしますか。',
      options: [
        '印刷会社に電話をかけて発注する。',
        '新製品のチラシのデザインを作り直す。',
        '課長のところへ行き、最終確認をもらう。',
        '他社のチラシを集めて比較検討する。'
      ],
      correctIndex: 2,
      explanation: 'Đáp án đúng là 3: 「じゃあまず課長のところへ行こう」(Vậy trước hết đi gặp trưởng phòng xin xác nhận cuối cùng đã). Hành động đầu tiên cần làm là gặp sếp.'
    }
  },
  {
    id: 19,
    code: 'BJT-19',
    category: 'cbt_strategy',
    categoryLabel: 'Chiến lược phòng thi CBT',
    title: 'Chiến lược Quản trị thời gian CBT & Tối ưu hóa điểm số J1+ (BJTタイムマネジメント＆スコア最大化)',
    japaneseTitle: 'CBTテスト環境での時間配分戦略とメンタルマネジメント',
    badge: 'Chuyên đề 19 · Bí kíp đạt 600+ điểm J1+',
    description: 'Kỳ thi BJT diễn ra 100% trên máy vi tính tại các trung tâm khảo thí Pearson VUE. Chiến lược làm bài thi không chuột trễ: Phân bổ 35 phút cho Nghe hiểu (35 câu), 30 phút cho Nghe đọc hiểu (30 câu) và 35 phút cho Đọc hiểu (35 câu).',
    targetLevel: 'J1+',
    corePrinciples: [
      'Không thể quay lại câu hỏi phần Nghe: Phần Nghe hiểu và Nghe đọc hiểu chạy tự động một chiều, không được bỏ trống câu nào.',
      'Phân bổ thời gian phần Đọc hiểu: 35 câu trong 35 phút -> Đúng 60 giây cho mỗi câu. Không dừng lại ở câu khó quá 90 giây.',
      'Chiến lược loại trừ đáp án nhanh: Gạch bỏ ngay 2 đáp án sai rõ ràng, tập trung 15 giây còn lại để cân nhắc sự khác biệt tinh tế giữa 2 đáp án còn lại.',
      'Mục tiêu điểm số J1+: Đạt từ 600 đến 800 điểm (Top 5% thí sinh toàn cầu). Được Cục Xuất Nhập Cảnh Nhật Bản cộng tối đa 15 điểm ưu đãi diện Nhân lực chất lượng cao (高度人材).'
    ],
    practicalExpressions: [
      {
        phrase: '時間配分を誤ると、後半の長文読解に手が回らなくなる',
        reading: 'じかんはいぶんをあやまると、こうはんのちょうぶんどっかいにてがまわらなくなる',
        meaning: 'Nếu phân bổ thời gian sai lầm, bạn sẽ không kịp trở tay làm các bài đọc hiểu dài ở phần sau.',
        context: 'Lời khuyên phòng thi CBT.'
      },
      {
        phrase: '消去法を用いて、正答率を確実に引き上げる',
        reading: 'しょうきょほうをもちいて、せいとうりつをかくじつにひきあげる',
        meaning: 'Sử dụng phương pháp loại trừ để nâng cao xác suất chọn đúng đáp án một cách chắc chắn.',
        context: 'Chiến thuật phòng thi.'
      },
      {
        phrase: 'BJTでJ1+を取得すれば、高度人材ビザで15点加算される',
        reading: 'ビージェーティーでジェイワンプラスをしゅとくすれば、こうどじんざいビザでじゅうごてんかさんされる',
        meaning: 'Đạt cấp độ J1+ trong kỳ thi BJT sẽ được cộng 15 điểm vào visa nhân lực chất lượng cao.',
        context: 'Lợi ích định cư và làm việc tại Nhật.'
      }
    ],
    caseStudy: {
      scenario: 'Thí sinh gặp một câu hỏi đọc hiểu hợp đồng kinh tế rất dài và phức tạp ở câu số 25.',
      dialogueOrSample: [
        {
          speaker: 'Chiến thuật gia Yamato',
          line: 'CBT không giống thi giấy! Bạn không thể lật trang qua lại tự do.',
          reading: '',
          vn: 'Trên máy tính, hãy nhìn đồng hồ góc phải màn hình. Nếu đã quá 60 giây mà chưa dịch xong hợp đồng, hãy chọn phương án khả dĩ nhất và gắn cờ (Flag) rồi đi tiếp.'
        },
        {
          speaker: 'Chiến thuật gia Yamato',
          line: 'Tuyệt đối không để một câu khó cướp đi thời gian của 5 câu dễ phía sau!',
          reading: '',
          vn: 'Các câu thông báo nội bộ và email ở cuối đề thường rất dễ ăn điểm nếu bạn còn đủ thời gian.'
        }
      ],
      expertAnalysis: 'Tâm lý vững vàng và kỷ luật thời gian quyết định 40% kết quả thi BJT. Thí sinh điểm cao không phải là người biết hết mọi từ, mà là người không bao giờ bị hết giờ.',
      bjtTrapWarning: 'Đừng bấm nút "Finish Exam" khi chưa hết giờ, hãy kiểm tra lại toàn bộ các câu gắn cờ (Flagged questions).'
    },
    practiceQuestion: {
      instruction: 'BJT（ビジネス日本語能力テスト）のスコアと評価基準に関する記述として、最も適切なものを選びなさい。',
      content: 'BJTの最高評価レベルである「J1+」のスコア基準として正しいものはどれか。',
      options: [
        '420点以上（日常業務がこなせるレベル）',
        '530点以上（十分なビジネスコミュニケーションができるレベル）',
        '600点〜800点（いかなるビジネス場面でも適切な対応ができる最高峰レベル）',
        '800点満点中750点以上のみ'
      ],
      correctIndex: 2,
      explanation: 'Đáp án đúng là 3: Cấp độ cao nhất 【J1+】 dành cho thí sinh đạt từ 600 đến 800 điểm trên thang điểm chuẩn hóa. Đây là chứng chỉ vàng được các tập đoàn đa quốc gia và Cục quản lý xuất nhập cảnh Nhật Bản đánh giá cao nhất.'
    }
  },
  {
    id: 20,
    code: 'BJT-20',
    category: 'cbt_strategy',
    categoryLabel: 'Chiến lược phòng thi CBT',
    title: '100 Bộ câu hỏi mô phỏng đề thi BJT thực chiến có giải thích chi tiết chuẩn EDVEC/CBT',
    japaneseTitle: 'BJT実戦模擬試験問題バンクと解説総覧（EDVEC・Pearson VUE準拠）',
    badge: 'Chuyên đề 20 · Ngân hàng đề thi thực chiến',
    description: 'Kho câu hỏi mô phỏng đề thi thật BJT bao quát cả 3 phần thi: Section 1 (聴解 35 câu), Section 2 (聴読解 35 câu) và Section 3 (読解 35 câu). Mỗi câu đều có phân tích chi tiết tại sao chọn đáp án này và bóc tách các phương án nhiễu.',
    targetLevel: 'J1+',
    corePrinciples: [
      'Bám sát chuẩn đề thi BJT do Hiệp hội Kiểm định Năng lực Hán tự Nhật Bản (Kanken) và EDVEC tổ chức.',
      'Mô phỏng 100% tình huống công sở thực tế phát sinh giữa sếp, đồng nghiệp, khách hàng và đối tác nước ngoài.',
      'Chỉ số độ khó IRT: Đề thi thích ứng đo lường chính xác từ cấp độ J5 đến J1+.',
      'Giải thích học thuật sắc bén từ Hội đồng ngôn ngữ GS. Yamato Kenji.'
    ],
    practicalExpressions: [
      {
        phrase: '模擬試験を繰り返し解くことで、本番の瞬発力を養う',
        reading: 'もぎしけんをくりかえしとくことで、ほんばんのしゅんぱつりょくをやしなう',
        meaning: 'Bằng việc luyện giải đề thi thử nhiều lần, bạn sẽ rèn luyện được phản xạ nhạy bén trong phòng thi thật.',
        context: 'Phương pháp ôn thi đỗ J1+.'
      },
      {
        phrase: '間違えた問題を徹底的に復習し、知識の穴を埋める',
        reading: 'まちがえたもんだいをつていてきにふくしゅうし、ちしきのあなをうめる',
        meaning: 'Ôn tập triệt để các câu đã làm sai để lấp đầy những lỗ hổng kiến thức.',
        context: 'Chiến lược cải thiện điểm số.'
      },
      {
        phrase: '本番と同じ時間制限でプレッシャーに慣れておく',
        reading: 'ほんばんとおなじじかんせいげんでプレッシャーになれておく',
        meaning: 'Luyện tập làm quen với áp lực dưới đúng giới hạn thời gian như thi thật.',
        context: 'Rèn luyện tâm lý phòng thi.'
      }
    ],
    caseStudy: {
      scenario: 'Câu hỏi tổng hợp nâng cao thử thách năng lực phân biệt Kính ngữ và Tác phong đàm phán.',
      dialogueOrSample: [
        {
          speaker: 'Tình huống',
          line: '取引先の役員があなたの会社に来社された際、担当部署の部長が急な体調不良で病院へ向かった直後だった。',
          reading: '',
          vn: 'Khi một vị Ủy viên ban điều hành của công ty đối tác đến thăm công ty bạn, Trưởng bộ phận phụ trách lại vừa phải đi cấp cứu ở bệnh viện do bị ốm đột xuất.'
        },
        {
          speaker: 'Tình huống',
          line: 'あなたはこの非常事態において、どのような言葉遣いと行動で相手に説明し、失礼のない対応を取るべきか。',
          reading: '',
          vn: 'Trong tình huống khẩn cấp này, bạn cần sử dụng ngôn từ và hành động nào để giải thích với đối tác mà không làm mất lòng họ?'
        }
      ],
      expertAnalysis: 'Thành thật tạ lỗi ngay từ đầu (大変申し訳ございません), giải thích rõ sự việc khách quan không né tránh (急な体調不良により病院へ向かいました), và lập tức đưa ra người thay thế có thẩm quyền tương đương (代理として副部長の〜が対応させていただきます).',
      bjtTrapWarning: 'Tuyệt đối không nói: "部長が病気で帰っちゃいました" (Cộc lốc, vô trách nhiệm và thiếu kính ngữ).'
    },
    practiceQuestion: {
      instruction: '突発的な事態における、取引先役員への対応として最も適切な表現を選びなさい。',
      content: '「誠に申し訳ございません。担当の部長が急病のため病院へ向かいました。代わりまして（　）。」',
      options: [
        '副部長の鈴木が喜んでご案内なさいます。',
        '副部長の鈴木が責任を持ってお話を伺わせていただきます。',
        '明日もう一度出直していただけますでしょうか。',
        '私では分かりかねますのでお帰りください。'
      ],
      correctIndex: 1,
      explanation: 'Đáp án đúng là 2: 「副部長の鈴木が責任を持ってお話を伺わせていただきます」(Phó phòng Suzuki bên em xin phép chịu trách nhiệm lắng nghe tiếp nhận câu chuyện của quý ngài ạ). Khiêm nhường ngữ 伺わせていただきます thể hiện sự tôn trọng tuyệt đối và trách nhiệm cao.'
    }
  }
];

interface BjtMasteryLabProps {
  onBackToDashboard?: () => void;
  onOpenAiSenseiWithQuery?: (query?: string) => void;
}

export const BjtMasteryLab: React.FC<BjtMasteryLabProps> = ({
  onBackToDashboard,
  onOpenAiSenseiWithQuery
}) => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [revealedQuiz, setRevealedQuiz] = useState<Record<string, boolean>>({});
  const [extraQuestionsLoaded, setExtraQuestionsLoaded] = useState<Record<number, number>>({});
  const [speakingPhrase, setSpeakingPhrase] = useState<string | null>(null);

  const activeModule = useMemo(() => {
    return BJT_20_MODULES.find((m) => m.id === activeModuleId) || BJT_20_MODULES[0];
  }, [activeModuleId]);

  const activeQuestions = useMemo(() => {
    const qBase = {
      id: `m${activeModule.id}_q0`,
      instruction: activeModule.practiceQuestion.instruction,
      content: activeModule.practiceQuestion.content,
      options: activeModule.practiceQuestion.options,
      correctIndex: activeModule.practiceQuestion.correctIndex,
      explanation: activeModule.practiceQuestion.explanation,
      examFocus: 'Câu hỏi cốt lõi chuẩn chuyên đề BJT'
    };
    const loadedCount = extraQuestionsLoaded[activeModule.id] || 0;
    const extras = (BJT_EXTRA_QUESTIONS[activeModule.id] || []).slice(0, loadedCount);
    return [qBase, ...extras];
  }, [activeModule, extraQuestionsLoaded]);

  const filteredModules = useMemo(() => {
    return BJT_20_MODULES.filter((m) => {
      const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.japaneseTitle.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.code.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSpeak = (text: string) => {
    setSpeakingPhrase(text);
    speechService.speak(text, 0.95);
    setTimeout(() => {
      setSpeakingPhrase(null);
    }, 3500);
  };

  const handleSelectQuestion = (qKey: string, optionIdx: number, correctIdx: number) => {
    setSelectedQuizAnswers((prev) => ({ ...prev, [qKey]: optionIdx }));
    setRevealedQuiz((prev) => ({ ...prev, [qKey]: true }));
    if (optionIdx === correctIdx) {
      speechService.playSuccessSound();
    }
  };

  const handleLoadMoreQuestions = (moduleId: number) => {
    setExtraQuestionsLoaded((prev) => ({
      ...prev,
      [moduleId]: (prev[moduleId] || 0) + 3
    }));
    speechService.playSuccessSound();
  };

  return (
    <div className="space-y-6">
      {/* ========================================================
          1. HEADER BANNER: BJT SUPREME MASTERY ACADEMY
          ======================================================== */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-orange-950/80 border border-amber-600/50 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                <Briefcase className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    Viện Luyện Thi BJT Chuyên Sâu
                  </h1>
                  <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    BJT Business Japanese Test
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-200/90 font-serif">
                  ビジネス日本語能力テスト · 20 Chuyên Đề Cực Kỳ Chuyên Sâu Đạt Chuẩn J1+ (600 - 800 Điểm)
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl font-sans">
              Hệ thống hóa toàn diện kỹ năng tiếng Nhật thương mại thực chiến: Từ kính ngữ công sở tối thượng, điện thoại, email, thuyết trình biểu đồ, đàm phán giá cả, Hou-Ren-Sou, Ringi, cho đến bóc tách bẫy nghe - đọc hiểu và chiến lược quản trị thời gian phòng thi máy tính CBT.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onBackToDashboard && (
              <button
                onClick={onBackToDashboard}
                className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer shadow"
              >
                ← Trang chủ
              </button>
            )}
            <button
              onClick={() => {
                if (onOpenAiSenseiWithQuery) {
                  onOpenAiSenseiWithQuery('Sensei phân tích chiến lược đạt điểm J1+ kỳ thi BJT và các lỗi sai người Việt hay mắc phải nhất?');
                }
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Hỏi GS. Yamato về BJT</span>
            </button>
          </div>
        </div>

        {/* 4 Score Tiers Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-amber-700/30 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-amber-500/30 flex items-center gap-2.5">
            <span className="text-xl font-black text-amber-400 font-mono">J1+</span>
            <div className="text-[11px] leading-tight">
              <strong className="text-white block font-mono">600 - 800đ</strong>
              <span className="text-slate-400">Giao tiếp đỉnh cao</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
            <span className="text-xl font-black text-indigo-400 font-mono">J1</span>
            <div className="text-[11px] leading-tight">
              <strong className="text-white block font-mono">530 - 599đ</strong>
              <span className="text-slate-400">Thương mại độc lập</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
            <span className="text-xl font-black text-emerald-400 font-mono">J2</span>
            <div className="text-[11px] leading-tight">
              <strong className="text-white block font-mono">420 - 529đ</strong>
              <span className="text-slate-400">Công sở cơ bản</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
            <span className="text-xl font-black text-purple-400 font-mono">J3</span>
            <div className="text-[11px] leading-tight">
              <strong className="text-white block font-mono">320 - 419đ</strong>
              <span className="text-slate-400">Giao tiếp có hướng dẫn</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. FILTER & SEARCH CONTROL BAR
          ======================================================== */}
      <div className="bg-[#090e1b]/95 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-600 text-slate-950 font-black'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Tất cả 20 Chuyên đề
          </button>
          <button
            onClick={() => setSelectedCategory('keigo_comm')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              selectedCategory === 'keigo_comm'
                ? 'bg-amber-600 text-slate-950 font-black'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Kính ngữ & Tiếp khách (5)
          </button>
          <button
            onClick={() => setSelectedCategory('business_ops')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              selectedCategory === 'business_ops'
                ? 'bg-amber-600 text-slate-950 font-black'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Quản trị & Thương mại (7)
          </button>
          <button
            onClick={() => setSelectedCategory('reading_analysis')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              selectedCategory === 'reading_analysis'
                ? 'bg-amber-600 text-slate-950 font-black'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Đọc hiểu & Biểu đồ (5)
          </button>
          <button
            onClick={() => setSelectedCategory('cbt_strategy')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              selectedCategory === 'cbt_strategy'
                ? 'bg-amber-600 text-slate-950 font-black'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Chiến lược thi CBT (3)
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo chủ đề, từ khóa BJT..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* ========================================================
          3. MAIN LAYOUT: MODULES SIDEBAR & ACTIVE DEEP CANVAS
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 20 Modules Index (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[850px] overflow-y-auto pr-1 scrollbar-thin">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 pb-1">
            Danh mục 20 chuyên đề ({filteredModules.length}):
          </div>
          {filteredModules.map((m) => {
            const isSelected = m.id === activeModuleId;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveModuleId(m.id);
                  speechService.playSuccessSound();
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer space-y-1 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-950/60 to-slate-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-[#090e1b]/90 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {m.code}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    Mục tiêu {m.targetLevel}
                  </span>
                </div>
                <h3 className={`text-xs font-bold leading-snug ${isSelected ? 'text-amber-200' : 'text-slate-200'}`}>
                  {m.id}. {m.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-1 font-serif">
                  {m.japaneseTitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Module Deep Studio (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Module Header */}
          <div className="bg-[#090e1b]/95 border border-amber-600/40 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                {activeModule.code} · {activeModule.badge}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono font-semibold">
                Chuẩn khảo thí CBT · Cấp độ {activeModule.targetLevel}
              </span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {activeModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-amber-300 font-serif mt-0.5">
                {activeModule.japaneseTitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans border-t border-slate-800/80 pt-2.5">
              {activeModule.description}
            </p>

            {/* Core Principles (Quy tắc cốt lõi) */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Quy tắc tác phong & Nguyên lý bất di bất dịch:</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeModule.corePrinciples.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0 mt-0.5">▪</span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Practical Expressions Grid */}
          <div className="bg-[#090e1b]/95 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Cụm từ vàng thực chiến bản ngữ (Nói & Viết chuẩn tác phong):</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Bấm loa để nghe phát âm</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {activeModule.practicalExpressions.map((expr, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-amber-700/50 transition-all space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-amber-200 font-serif">
                        {expr.phrase}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {expr.reading}
                      </div>
                    </div>
                    <button
                      onClick={() => handleSpeak(expr.phrase)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                        speakingPhrase === expr.phrase
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                      title="Nghe phát âm chuẩn giọng Tokyo"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed font-sans">
                    👉 <strong>Ý nghĩa:</strong> {expr.meaning}
                  </div>
                  <div className="text-[11px] text-amber-400/90 italic">
                    💡 Ngữ cảnh: {expr.context}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Case Study & BJT Trap Analysis */}
          <div className="bg-[#090e1b]/95 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Tình huống thực tế (Case Study) & Bóc tách bẫy đề thi BJT:</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="text-xs font-semibold text-slate-300">
                📌 <strong>Tình huống:</strong> {activeModule.caseStudy.scenario}
              </div>

              {/* Dialogue lines */}
              <div className="space-y-1.5 pt-1 border-t border-slate-800">
                {activeModule.caseStudy.dialogueOrSample.map((d, dIdx) => (
                  <div key={dIdx} className="text-xs bg-slate-900/80 p-2 rounded-lg border border-slate-800 space-y-0.5">
                    <span className="font-bold text-amber-300">{d.speaker}: </span>
                    <span className="text-white font-serif">{d.line}</span>
                    <div className="text-[11px] text-slate-400 italic">👉 {d.vn}</div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-emerald-300 leading-relaxed pt-1">
                🔍 <strong>Chuyên gia phân tích:</strong> {activeModule.caseStudy.expertAnalysis}
              </div>

              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/50 text-xs text-rose-200 leading-relaxed">
                ⚠️ <strong>Cảnh báo bẫy thi BJT:</strong> {activeModule.caseStudy.bjtTrapWarning}
              </div>
            </div>
          </div>

          {/* Practice CBT Questions Section */}
          <div className="bg-[#090e1b]/95 border border-amber-500/50 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center font-mono">
                  ?
                </span>
                <h3 className="text-sm font-bold text-white">
                  Ngân hàng câu hỏi mô phỏng đề thi BJT/JPT thực chiến ({activeQuestions.length} câu):
                </h3>
              </div>
              <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-700/60">
                Chuẩn EDVEC/CBT Quốc tế
              </span>
            </div>

            <div className="space-y-4">
              {activeQuestions.map((q, qIdx) => {
                const qKey = q.id;
                const isRevealed = revealedQuiz[qKey];
                const selectedOpt = selectedQuizAnswers[qKey];

                return (
                  <div key={qKey} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-1 text-[11px]">
                      <span className="font-mono font-bold text-amber-400">
                        Câu hỏi #{qIdx + 1} {qIdx > 0 ? '· Bổ sung thực chiến' : '· Cốt lõi'}
                      </span>
                      {q.examFocus && (
                        <span className="px-2 py-0.5 rounded bg-amber-950/50 text-amber-300 border border-amber-800/40 text-[10px]">
                          🎯 {q.examFocus}
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-mono text-slate-400">
                      {q.instruction}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white whitespace-pre-line font-serif leading-relaxed">
                      {q.content}
                    </div>

                    {/* Options */}
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        const isCorrect = optIdx === q.correctIndex;

                        let optClass = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-600';
                        if (isRevealed) {
                          if (isCorrect) {
                            optClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isSelected) {
                            optClass = 'bg-rose-950 border-rose-500 text-rose-200';
                          }
                        } else if (isSelected) {
                          optClass = 'bg-amber-600 text-slate-950 font-bold border-amber-400';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuestion(qKey, optIdx, q.correctIndex)}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${optClass}`}
                          >
                            <span>
                              <strong className="mr-2 font-mono">({optIdx + 1})</strong>
                              {opt}
                            </span>
                            {isRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                            {isRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation upon selection */}
                    {isRevealed && (
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2 animate-fadeIn text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-amber-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Giải thích cặn kẽ đáp án & bóc tách bẫy:</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-sans">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Load More +3 Questions Button */}
            <div className="pt-2">
              {(extraQuestionsLoaded[activeModule.id] || 0) < 3 ? (
                <button
                  onClick={() => handleLoadMoreQuestions(activeModule.id)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer border border-amber-400/40"
                >
                  <Plus className="w-4 h-4 text-slate-950" />
                  <span>+3 Tải Thêm Câu Hỏi Mô Phỏng Đề Thi JPT/BJT Thực Chiến (Chuẩn CBT)</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Đã tải trọn bộ 4 câu hỏi mô phỏng thực chiến cho chuyên đề {activeModule.code}!</span>
                  </div>
                  <button
                    onClick={() => {
                      setExtraQuestionsLoaded(prev => ({ ...prev, [activeModule.id]: 0 }));
                      speechService.playSuccessSound();
                    }}
                    className="text-[11px] text-slate-400 hover:text-white underline"
                  >
                    Thu gọn
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
