import React, { useState, useEffect } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import { historyService, HistoryItem } from '../../services/historyService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import {
  Briefcase,
  RefreshCw,
  Search,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  History,
  Sparkles,
  UserCheck,
  ShieldAlert,
  ChevronRight,
  MessageSquare,
  Award,
} from 'lucide-react';

export interface InterviewScenario {
  id: string;
  category: 'intro' | 'motivation' | 'strength_weakness' | 'failure' | 'reverse_question';
  categoryLabel: string;
  questionJp: string;
  questionReading: string;
  questionMeaning: string;
  targetMinutes: string;
  interviewerIntent: string; // Ý đồ ngầm của nhà tuyển dụng Nhật Bản (Honne)
  trapToAvoid: string; // Bẫy cần tránh tuyệt đối
  modelAnswerPrep: {
    point: string; // Point: Khẳng định mấu chốt
    reason: string; // Reason: Lý do căn bản
    example: string; // Example: Trải nghiệm thực tế
    pointSummary: string; // Point: Đúc kết đóng góp cho công ty
  };
  fullSampleAnswerJp: string;
  fullSampleAnswerReading: string;
  fullSampleAnswerMeaning: string;
  keyBusinessPhrases: string[];
}

const initialScenarios: InterviewScenario[] = [
  {
    id: 'int_1',
    category: 'intro',
    categoryLabel: 'Giới thiệu bản thân (自己紹介)',
    questionJp: '1分程度で自己紹介をお願いいたします。',
    questionReading: 'いっぷんていどでじこしょうかいをおねがいいたします。',
    questionMeaning: 'Xin vui lòng tự giới thiệu về bản thân trong khoảng 1 phút.',
    targetMinutes: 'Khoảng 1 phút (250 - 300 chữ)',
    interviewerIntent: 'Đánh giá tác phong mở đầu, giọng điệu tự tin, khả năng tóm tắt ngắn gọn kinh nghiệm mấu chốt và sự lịch thiệp trong giao tiếp.',
    trapToAvoid: 'Bẫy nói dài dòng kể lể tiểu sử từ thời phổ thông; quên gửi lời chào kết thúc (本日はどうぞよろしくお願いいたします).',
    modelAnswerPrep: {
      point: 'Chào hỏi, nêu họ tên, quốc tịch và chuyên môn cốt lõi (IT / Kỹ sư / Kinh doanh).',
      reason: 'Lý do tự tin ứng tuyển dựa trên kinh nghiệm thực tế đã tích lũy.',
      example: 'Đã hoàn thành dự án lớn, vượt chỉ tiêu hoặc phối hợp nhóm đa quốc gia.',
      pointSummary: 'Bày tỏ lòng biết ơn cơ hội phỏng vấn và mong muốn được cống hiến hết mình.',
    },
    fullSampleAnswerJp:
      '本日は貴重なお時間をいただき、誠にありがとうございます。グエン・ヴァン・Aと申します。大学卒業後、IT企業にて約3年間、Webアプリケーションのバックエンド開発に従事してまいりました。特にチーム開発における円滑なコミュニケーションと、納期の厳守を常に心がけております。これまでの経験を生かし、御社のグローバル事業の成長に貢献したいと考えております。本日はどうぞよろしくお願いいたします。',
    fullSampleAnswerReading:
      'ほんじつはきちょうなおじかんをいただき、まことにありがとうございます。グエン・ヴァン・Aともうします。だいがくそつぎょうご、ITきぎょうにてやくさんねんかん、Webアプリケーションのバックエンドかいはつにじゅうじしてまいりました。とくにチームかいはつにおけるえんかつなコミュニケーションと、のうきのげんしゅをつねにこころがけております。これまでのけいけんをいかし、おんしゃのグローバルじぎょうのせいちょうにこうけんしたいとかんがえております。ほんじつはどうぞよろしくおねがいいたします。',
    fullSampleAnswerMeaning:
      'Hôm nay tôi xin chân thành cảm ơn quý công ty đã dành cho tôi khoảng thời gian quý báu này. Tôi tên là Nguyen Van A. Sau khi tốt nghiệp đại học, tôi đã làm việc khoảng 3 năm tại một công ty IT trong mảng phát triển backend ứng dụng web. Tôi luôn đặc biệt chú trọng việc giao tiếp suôn sẻ trong làm việc nhóm và tuân thủ nghiêm ngặt thời hạn bàn giao. Tôi rất mong muốn được vận dụng những kinh nghiệm đã tích lũy để cống hiến cho sự tăng trưởng mảng kinh doanh toàn cầu của quý công ty. Rất mong nhận được sự chỉ giáo của quý công ty trong buổi phỏng vấn hôm nay.',
    keyBusinessPhrases: ['貴重なお時間をいただき', '〜に従事してまいりました', '納期の厳守', '御社の成長に貢献したい'],
  },
  {
    id: 'int_2',
    category: 'motivation',
    categoryLabel: 'Lý do ứng tuyển (志望動機)',
    questionJp: '数ある企業の中で、なぜ弊社を志望されたのですか。',
    questionReading: 'かずあるきぎょうのなかで、なぜへいしゃをしぼうされたのですか。',
    questionMeaning: 'Trong số rất nhiều doanh nghiệp, tại sao bạn lại chọn ứng tuyển vào công ty chúng tôi?',
    targetMinutes: 'Khoảng 1.5 - 2 phút',
    interviewerIntent: 'Kiểm tra xem ứng viên có nghiên cứu kỹ doanh nghiệp (kigyou-kenkyuu) hay chỉ nộp rải hồ sơ hàng loạt; mức độ phù hợp với triết lý kinh doanh (Kigyou Rinen).',
    trapToAvoid: 'Chỉ khen công ty lớn, chế độ đãi ngộ tốt, hay nói chung chung những điều công ty nào cũng có.',
    modelAnswerPrep: {
      point: 'Khẳng định ấn tượng sâu sắc với sản phẩm cốt lõi hoặc định hướng tiên phong độc nhất của công ty.',
      reason: 'Định hướng nghề nghiệp của bản thân hoàn toàn đồng điệu với sứ mệnh của công ty.',
      example: 'Nêu điểm giao thoa giữa kỹ năng hiện tại và thị trường công ty đang mở rộng.',
      pointSummary: 'Quyết tâm tạo ra giá trị khác biệt cho công ty ngay từ giai đoạn đầu gia nhập.',
    },
    fullSampleAnswerJp:
      '御社を志望いたしました理由は、先進的なAIソリューションを通じて社会課題の解決に挑まれている企業姿勢に深く共感したためです。他社にはない高い技術力と、顧客第一主義のサービス開発に大きな魅力を感じております。私はこれまで培ってきたクラウドインフラの知見を生かし、御社が現在推進されているアジア市場への事業展開に、即戦力として貢献できると確信しております。',
    fullSampleAnswerReading:
      'おんしゃをしぼういたしましたりゆうは、せんしんてきなAIソリューションをつうじてしゃかいかだいのかいけつにいどまれているきぎょうしせいにふかくきょうかんしたためです。たしゃにはないたかぎじゅつりょくと、こきゃくだいいちしゅぎのサービスかいはつにおおきなみりょくをかんじております。わたしはこれまでつちかってきたクラウドインフラのちけんをいかし、おんしゃがげんざいすいしんされているアジアしじょうへのじぎょうてんかいに、そくせんりょくとしてこうけんできるとかくしんしております。',
    fullSampleAnswerMeaning:
      'Lý do tôi ứng tuyển vào quý công ty là vì tôi vô cùng đồng cảm với lập trường doanh nghiệp luôn tiên phong giải quyết các vấn đề xã hội thông qua các giải pháp AI hiện đại. Tôi cảm thấy bị thu hút mãnh liệt bởi năng lực công nghệ vượt trội mà các công ty khác không có, cùng tinh thần phát triển dịch vụ lấy khách hàng làm trung tâm. Tôi tin tưởng chắc chắn rằng với vốn kiến thức về hạ tầng đám mây mà mình đã tích lũy, tôi có thể đóng góp với tư cách là một nhân sự sẵn sàng làm được việc ngay cho chiến lược mở rộng thị trường châu Á của quý công ty.',
    keyBusinessPhrases: ['企業姿勢に深く共感したため', '他社にはない強み', '即戦力として貢献できる'],
  },
  {
    id: 'int_3',
    category: 'strength_weakness',
    categoryLabel: 'Điểm mạnh & Điểm yếu (長所と短所)',
    questionJp: 'ご自身の長所と、それを業務にどう生かせるかを教えてください。',
    questionReading: 'ごじしんのちょうしょと、それをぎょうむにどういかせるかをおしえてください。',
    questionMeaning: 'Xin hãy cho biết điểm mạnh của bạn và bạn sẽ vận dụng nó vào công việc như thế nào?',
    targetMinutes: 'Khoảng 1 - 1.5 phút',
    interviewerIntent: 'Đo lường năng lực tự nhận thức bản thân (Self-awareness) và khả năng chuyển hóa thế mạnh thành kết quả kinh doanh thực tế.',
    trapToAvoid: 'Khen bản thân quá đà mà không có số liệu/dẫn chứng minh họa cụ thể.',
    modelAnswerPrep: {
      point: 'Điểm mạnh lớn nhất là tính kiên trì bền bỉ và khả năng tìm kiếm giải pháp đến cùng.',
      reason: 'Luôn xem trở ngại là cơ hội nâng cấp tư duy thay vì than vãn.',
      example: 'Kể lại việc khắc phục sự cố hệ thống trong thời gian ngắn kỷ lục.',
      pointSummary: 'Vận dụng điểm mạnh đó để đảm bảo tiến độ và chất lượng dự án tại công ty.',
    },
    fullSampleAnswerJp:
      '私の最大の長所は、「困難な課題に対しても粘り強く解決策を模索する行動力」です。前職におきまして、納期間際に予期せぬ仕様変更が発生した際も、冷静にタスクの優先順位を再設計し、チームメンバーと密に連携することで、期日通りにリリースを完遂させました。御社におきましても、不測の事態に直面した際にチームの支柱となり、粘り強くプロジェクトを成功に導く所存です。',
    fullSampleAnswerReading:
      'わたしのさいだいのちょうしょは、「こんなんなかだいに対してもねばりづよくかいけつさくをもさくするこうどうりょく」です。ぜんしょくにおきまして、のうきまぎわによきせぬしようへんこうがはっせいしたさいも、れいせいにタスクのゆうせんじゅんいをさいせっけいし、チームメンバーとみつにれんけいすることで、きじつどおりにリリースをかんすいさせました。おんしゃにおきましても、ふそくのじたいにちょくめんしたさいにチームのしちゅうとなり、ねばりづよくプロジェクトをせいこうにみちびくしょぞんです。',
    fullSampleAnswerMeaning:
      'Điểm mạnh lớn nhất của tôi là "hành động kiên trì tìm kiếm giải pháp ngay cả trước những thách thức khó khăn". Tại công ty cũ, khi phát sinh thay đổi thông số bất ngờ ngay sát hạn chót, tôi vẫn giữ bình tĩnh tái thiết kế thứ tự ưu tiên công việc, phối hợp chặt chẽ với các thành viên và hoàn tất phát hành đúng hẹn. Tại quý công ty, tôi cũng tâm niệm sẽ trở thành điểm tựa vững vàng cho nhóm khi đối mặt tình huống bất ngờ, kiên trì dẫn dắt dự án đến thành công.',
    keyBusinessPhrases: ['粘り強く解決策を模索する', '優先順位を再設計', '密に連携することで', '成功に導く所存です'],
  },
  {
    id: 'int_4',
    category: 'failure',
    categoryLabel: 'Kinh nghiệm thất bại & Cách vượt qua (失敗経験)',
    questionJp: 'これまでに最も大きな失敗をした経験と、それをどう乗り越えたかを教えてください。',
    questionReading: 'これまでにきっともおおきなしっぱいをしたけいけんと、それをどうのりこえたかをおしえてください。',
    questionMeaning: 'Hãy chia sẻ về trải nghiệm thất bại lớn nhất từ trước đến nay và bạn đã vượt qua nó như thế nào?',
    targetMinutes: 'Khoảng 1.5 phút',
    interviewerIntent: 'Đánh giá tinh thần phục hồi (Resilience), tính trung thực dám nhận lỗi và bài học rút ra để không lặp lại sai lầm.',
    trapToAvoid: 'Đổ lỗi cho hoàn cảnh hoặc đồng nghiệp; chọn thất bại liên quan đến đạo đức/vi phạm pháp luật.',
    modelAnswerPrep: {
      point: 'Thẳng thắn thừa nhận một sai sót do sơ suất trong giao tiếp/xác nhận thông tin.',
      reason: 'Phân tích nguyên nhân gốc rễ (do chủ quan suy đoán thay vì hỏi lại).',
      example: 'Hành động tức thì để khắc phục hậu quả và thiết lập quy trình kiểm tra kép.',
      pointSummary: 'Biến thất bại thành kinh nghiệm quý báu nâng cao tính cẩn trọng sau này.',
    },
    fullSampleAnswerJp:
      '新人時代に、顧客への仕様確認を「理解したつもり」で進めてしまい、納品直前に認識のズレが発覚したことが最大の失敗です。その際、私は直ちに上司に報告して真摯にお詫びし、修正作業に全力で当たりました。この手痛い失敗を教訓とし、以後は「口頭での合意内容を必ず議事録に残して双方で再確認する」ルールを徹底いたしました。その結果、以後は認識の齟齬によるトラブルをゼロに抑えることができております。',
    fullSampleAnswerReading:
      'しんじんじだいに、こきゃくへのしようかくにんを「りかいしたつもり」ですすめてしまい、のうひんちょくぜんににんしきのズレがはっかくしたことがさいだいのしっぱいです。そのさい、わたしはただちにじょうしにほうこくしてしんしにおわびし、しゅうせいさぎょうにぜんりょくであたりました。このていたいしっぱいをきょうくんとし、いごは「こうとうでのごういないようをかならずぎじろくにのこしてそうほうでさいかくにんする」ルールをてっていいたしました。そのけっか、いごはにんしきのそごによるトラブルをゼロにおさえることができております。',
    fullSampleAnswerMeaning:
      'Thời còn là nhân viên mới, tôi đã phạm sai lầm lớn nhất là tiếp tục triển khai dự án chỉ với suy nghĩ "chắc là mình hiểu đúng rồi" mà không xác nhận kỹ với khách hàng, dẫn đến lệch pha nhận thức ngay trước giờ bàn giao. Lúc đó, tôi lập tức báo cáo với cấp trên, chân thành xin lỗi và dốc toàn lực sửa chữa. Lấy thất bại đau đớn này làm bài học xương máu, từ đó về sau tôi luôn triệt để áp dụng nguyên tắc "luôn ghi lại biên bản cuộc họp đối với mọi thỏa thuận miệng để hai bên cùng xác nhận lại". Nhờ đó, tôi đã duy trì được tỷ lệ sự cố do bất đồng nhận thức về mức 0.',
    keyBusinessPhrases: ['真摯にお詫びし', '手痛い失敗を教訓とし', '認識の齟齬を防ぐ', 'ルールを徹底いたしました'],
  },
  {
    id: 'int_5',
    category: 'reverse_question',
    categoryLabel: 'Câu hỏi ngược thông minh (逆質問)',
    questionJp: '面接の最後に、何か弊社に対して質問はございますか。',
    questionReading: 'めんせつのさいごに、なにかへいしゃにたいしてしつもんはございますか。',
    questionMeaning: 'Ở cuối buổi phỏng vấn, bạn có câu hỏi nào muốn dành cho quý công ty chúng tôi không?',
    targetMinutes: 'Khoảng 1 phút',
    interviewerIntent: 'Đo lường mức độ khao khát muốn gia nhập công ty, sự chủ động và tư duy chiến lược của ứng viên.',
    trapToAvoid: 'Trả lời "Tôi không có câu hỏi nào cả" (được coi là thiếu nhiệt huyết), hoặc chỉ hỏi về lương thưởng, ngày nghỉ phép.',
    modelAnswerPrep: {
      point: 'Bày tỏ sự hào hứng với dự án mới của công ty đã được công bố trên tin tức.',
      reason: 'Muốn biết trước những kỹ năng cần chuẩn bị thêm trước ngày chính thức đi làm.',
      example: 'Hỏi về đặc điểm của những nhân sự đang thành công vượt trội tại vị trí ứng tuyển.',
      pointSummary: 'Thể hiện tư thế sẵn sàng học hỏi và chủ động tiếp cận công việc.',
    },
    fullSampleAnswerJp:
      'ご質問の機会をいただき、ありがとうございます。御社のIR情報にて、来期より新規クラウド事業を本格展開されると拝読いたしました。もしご縁をいただき入社させていただけた場合、入社日までに事前に習得あるいは準備しておくべき技術や専門知識がございましたら、ぜひご教示いただけますでしょうか。',
    fullSampleAnswerReading:
      'ごしつもんのきかいをいただき、ありがとうございます。おんしゃのIRじょうほうにて、らいきよりしんきクラウドじぎょうをほんかくてんかいされるとはいどくいたしました。もしごえんをいただきにゅうしゃさせていただけたばあい、にゅうしゃびまでにじぜんにしゅうとくあるいはじゅんびしておくべきぎじゅつやせんもんちしきがございましたら、ぜひごきょうじいただけますでしょうか。',
    fullSampleAnswerMeaning:
      'Cảm ơn quý công ty đã dành cho tôi cơ hội đặt câu hỏi. Tôi đã đọc trong báo cáo quan hệ nhà đầu tư IR của quý công ty rằng từ kỳ tới công ty sẽ đẩy mạnh triển khai mảng kinh doanh đám mây mới. Nếu có cơ duyên được gia nhập quý công ty, tôi xin phép được học hỏi xem liệu có những kỹ thuật hoặc kiến thức chuyên môn nào mà tôi nên chủ động trau dồi, chuẩn bị trước từ giờ cho đến ngày nhận việc không ạ?',
    keyBusinessPhrases: ['ご質問の機会をいただき', 'もしご縁をいただき入社させていただけた場合', 'ぜひご教示いただけますでしょうか'],
  },
];

export const JobInterviewSimulator: React.FC<{ currentLevel: JLPTLevel }> = ({ currentLevel }) => {
  const [scenarios, setScenarios] = useState<InterviewScenario[]>(initialScenarios);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [showReadingKana, setShowReadingKana] = useState<boolean>(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(() =>
    historyService.getHistory('interview')
  );

  const currentScenario = scenarios[currentIndex % scenarios.length] || scenarios[0];

  // Track viewed scenario in history
  useEffect(() => {
    if (currentScenario) {
      const updated = historyService.addItem('interview', {
        id: currentScenario.id,
        title: currentScenario.categoryLabel,
        subtitle: currentScenario.questionJp,
        level: 'B2B Keigo',
      });
      setHistoryItems(updated);
    }
  }, [currentScenario?.id]);

  // Load More +5 Interview Scenarios
  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo thêm 5 Tình huống câu hỏi phỏng vấn tuyển dụng & chuyển việc tiếng Nhật (Shinsotsu & Tenshoku) chuẩn mực của các tập đoàn Nhật Bản.
Định dạng JSON thuần là một mảng 5 phần tử InterviewScenario:
[
  {
    "id": "int_${Date.now()}_1",
    "category": "motivation",
    "categoryLabel": "Chủ đề câu hỏi",
    "questionJp": "câu hỏi tiếng Nhật trang trọng",
    "questionReading": "phiên âm hiragana câu hỏi",
    "questionMeaning": "nghĩa tiếng Việt câu hỏi",
    "targetMinutes": "thời lượng trả lời lý tưởng",
    "interviewerIntent": "Ý đồ thực sự của nhà tuyển dụng Nhật (Honne)",
    "trapToAvoid": "Bẫy thí sinh hay mắc phải",
    "modelAnswerPrep": {
      "point": "Ý chính mở đầu",
      "reason": "Lý do",
      "example": "Dẫn chứng thực tế",
      "pointSummary": "Đúc kết cam kết"
    },
    "fullSampleAnswerJp": "câu trả lời mẫu chuẩn Kính ngữ Keigo (Kenjougo, Sonkeigo, Teineigo)",
    "fullSampleAnswerReading": "phiên âm hiragana",
    "fullSampleAnswerMeaning": "bản dịch tiếng Việt chỉn chu",
    "keyBusinessPhrases": ["cụm kính ngữ 1", "cụm kính ngữ 2", "cụm kính ngữ 3"]
  }
]
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = safeExtractJson<InterviewScenario[] | null>(res, null);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.filter((it) => it && it.questionJp).slice(0, 5);
        if (valid5.length > 0) {
          setScenarios((prev) => [...valid5, ...prev]);
          setCurrentIndex(0);
          speechService.playSuccessSound();
          return;
        }
      }
      throw new Error('Dùng 5 tình huống fallback');
    } catch {
      // 5 Curated High-Yield Fallbacks
      const fallbackScenarios: InterviewScenario[] = [
        {
          id: `int_fall_${Date.now()}_1`,
          category: 'motivation',
          categoryLabel: 'Lý do chuyển việc (転職理由)',
          questionJp: '今回、転職を決意された理由を教えていただけますか。',
          questionReading: 'こんかい、てんしょくをけついされたりゆうをおしえていただけますか。',
          questionMeaning: 'Xin bạn cho biết lý do vì sao lần này bạn lại quyết định chuyển việc?',
          targetMinutes: 'Khoảng 1.5 phút',
          interviewerIntent: 'Đánh giá xem ứng viên chuyển việc vì mục tiêu phát triển tích cực hay chỉ vì mâu thuẫn nội bộ hoặc bất mãn ở công ty cũ.',
          trapToAvoid: 'Tuyệt đối không nói xấu sếp cũ, chê bai lương thấp hoặc phàn nàn về chế độ công ty cũ.',
          modelAnswerPrep: {
            point: 'Khẳng định mong muốn mở rộng phạm vi đóng góp và thử thách ở môi trường quy mô lớn hơn.',
            reason: 'Tại công ty cũ đã hoàn thành tốt vai trò nhưng bị giới hạn về cơ hội phát triển công nghệ mới.',
            example: 'Đã tích lũy đủ nền tảng và nhận thấy hướng đi của quý công ty là mảnh đất lý tưởng.',
            pointSummary: 'Hướng tới việc tạo ra giá trị bền vững lâu dài.',
          },
          fullSampleAnswerJp:
            '前職ではプロジェクト管理の基礎を徹底的に叩き込んでいただき、深く感謝しております。その上で、より大規模かつ最先端のクラウド技術を駆使したサービス開発に挑戦したいという思いが強くなり、この度転職を決意いたしました。グローバル展開で業界を牽引されている御社において、これまでの経験を生かし、さらなる高みを目指したいと考えております。',
          fullSampleAnswerReading:
            'ぜんしょくではプロジェクトかんりのきそをてっていてきにたたきこんでいただき、ふかくかんしゃしております。そのうえで、よりだいきぼかつさいせんたんのクラウドぎじゅつをくししたサービスかいはつにちょうせんしたいというおもいがつよくなり、このたびてんしょくをけついいたしました。グローバルてんかいでぎょうかいをけんいんされているおんしゃにおいて、これまでのけいけんをいかし、さらなるたかみをめざしたいとかんがえております。',
          fullSampleAnswerMeaning:
            'Tại công ty cũ, tôi vô cùng biết ơn vì đã được các anh chị rèn giũa kỹ lưỡng từ những nền tảng quản trị dự án căn bản nhất. Trên cơ sở đó, khát khao muốn thử thách bản thân trong việc phát triển dịch vụ quy mô lớn hơn, ứng dụng công nghệ đám mây tối tân nhất ngày càng thôi thúc trong tôi, và tôi đã quyết định chuyển việc lần này. Tại quý công ty - đơn vị đang dẫn dắt ngành với chiến lược toàn cầu hóa, tôi rất mong muốn phát huy kinh nghiệm đã có để vươn tới những nấc thang thành tựu cao hơn.',
          keyBusinessPhrases: ['深く感謝しております', '挑戦したいという思いが強くなり', 'さらなる高みを目指したい'],
        },
        {
          id: `int_fall_${Date.now()}_2`,
          category: 'strength_weakness',
          categoryLabel: 'Xử lý điểm yếu (短所と改善策)',
          questionJp: 'ご自身の短所と、それを改善するために意識していることは何ですか。',
          questionReading: 'ごじしんのたんしょと、それをかいぜんするためにいしきしていることはなんですか。',
          questionMeaning: 'Điểm yếu của bạn là gì và bạn đang ý thức cải thiện nó như thế nào?',
          targetMinutes: 'Khoảng 1 - 1.5 phút',
          interviewerIntent: 'Đo lường sự khiêm tốn, tính trung thực và các giải pháp hành động cụ thể để khắc phục nhược điểm bản thân.',
          trapToAvoid: 'Nói "Tôi không có điểm yếu nào" (kiêu ngạo) hoặc nhận những lỗi chết người như "hay đi muộn", "lười biếng".',
          modelAnswerPrep: {
            point: 'Điểm yếu là đôi khi quá cầu toàn, dẫn đến việc mất nhiều thời gian cho chi tiết nhỏ.',
            reason: 'Muốn mọi thứ hoàn hảo nên khó buông bỏ tiểu tiết.',
            example: 'Nhận thức được điều này nên hiện tại luôn đặt ra thời hạn cụ thể cho từng đầu việc.',
            pointSummary: 'Cân bằng giữa chất lượng sản phẩm và tốc độ bàn giao.',
          },
          fullSampleAnswerJp:
            '私の短所は、「細部にこだわりすぎて完璧を追求してしまう点」です。そのため、当初はタスクの消化に時間を要することがありました。現在はその反省を生かし、作業に着手する前に「全体の80%の完成度を目指す目標時間」を設定し、まずは全体像を素早く完成させてからブラッシュアップする工夫を行っております。これにより、スピードと品質の両立を図れるようになりました。',
          fullSampleAnswerReading:
            'わたしのたんしょは、「さいぶにこだわりすぎてかんぺきをついきゅうしてしまうてん」です。そのため、とうしょはタスクのしょうかにじかんをようすることがありました。げんざいはそのはんせいをいかし、さぎょうにちゃくしゅするまえに「ぜんたいのはちじゅうパーセントのかんせいどをめざすもくひょうじかん」をせっていし、まずはぜんたいぞうをすばやくかんせいさせてからブラッシュアップするくふうをおこなっております。これにより、スピードとひんしつのりょうりつをはかれるようになりました。',
          fullSampleAnswerMeaning:
            'Điểm yếu của tôi là "quá chú trọng vào tiểu tiết và mải mê theo đuổi sự hoàn hảo". Do đó, thời gian đầu tôi từng mất khá nhiều thời gian để hoàn thành xong một nhiệm vụ. Hiện tại, rút kinh nghiệm sâu sắc từ điều đó, trước khi bắt tay vào làm việc tôi luôn đặt ra "khung thời gian mục tiêu đạt độ hoàn thiện 80%", nhanh chóng phác thảo xong toàn bộ bức tranh tổng thể rồi mới tiến hành mài giũa chi tiết. Nhờ biện pháp này, tôi đã cân bằng hài hòa được cả tốc độ lẫn chất lượng.',
          keyBusinessPhrases: ['その反省を生かし', '工夫を行っております', 'スピードと品質の両立'],
        },
        {
          id: `int_fall_${Date.now()}_3`,
          category: 'strength_weakness',
          categoryLabel: 'Làm việc nhóm & Xung đột (チームワーク)',
          questionJp: 'チーム内で意見が対立した際、どのように合意形成を図りますか。',
          questionReading: 'チームないでいけんがたいりつしたさい、どのようにごういけいせいをはかりますか。',
          questionMeaning: 'Khi ý kiến trong nhóm đối lập nhau, bạn làm thế nào để xây dựng sự đồng thuận?',
          targetMinutes: 'Khoảng 1.5 phút',
          interviewerIntent: 'Đánh giá kỹ năng đàm phán, khả năng lắng nghe thấu hiểu (Keicho) và tư duy hướng tới mục tiêu chung của tổ chức.',
          trapToAvoid: 'Áp đặt cái tôi cá nhân hoặc ngược lại là nhu nhược thỏa hiệp vô nguyên tắc.',
          modelAnswerPrep: {
            point: 'Trước hết lắng nghe trọn vẹn lập luận của đối phương mà không ngắt lời.',
            reason: 'Mọi bất đồng đều xuất phát từ mong muốn mang lại điều tốt nhất cho dự án.',
            example: 'Đưa cuộc tranh luận quay trở lại mục tiêu cốt lõi của khách hàng và dữ liệu khách quan.',
            pointSummary: 'Tìm ra giải pháp thứ 3 tối ưu kết hợp thế mạnh của cả hai bên.',
          },
          fullSampleAnswerJp:
            '意見の対立が生じた際は、まず感情的にならず、相手の主張の背景にある論拠を徹底的に傾聴することを最優先といたします。その上で、議論の焦点を「誰が正しいか」ではなく、「顧客にとって何が最善か」という共通の目的に立ち返らせます。客観的なデータやプロトタイプを用いて検証を行い、双方の強みを融合させた「第3の最適解」を導き出すよう努めております。',
          fullSampleAnswerReading:
            'いけんのたいりつがしょうじたさいは、まずかんじょうてきにならず、あいてのしゅちょうのはいけいにあるろんきょをてっていてきにけいちょうすることをさいゆうせんといたします。そのうえで、ぎろんのしょうてんを「だれがただしいか」ではなく、「こきゃくにとってなにがさいぜんか」というきょうつうのもくてきにたちかえらせます。きゃっかんてきなデータやプロトタイプをもちいてけんしょうをおこない、そうほうのつよみをゆうごうさせた「だいさんのさいてきかい」をみちびきだすようつとめております。',
          fullSampleAnswerMeaning:
            'Khi phát sinh đối lập ý kiến, ưu tiên hàng đầu của tôi là tuyệt đối không để cảm xúc chi phối, mà kiên nhẫn lắng nghe toàn bộ luận cứ nằm sau quan điểm của đối phương. Tiếp đó, tôi hướng tiêu điểm tranh luận từ "Ai đúng ai sai" quay trở về mục tiêu chung "Điều gì là tốt nhất cho khách hàng". Bằng việc sử dụng dữ liệu khách quan và bản mẫu thử nghiệm để kiểm chứng, tôi luôn nỗ lực tìm ra "giải pháp thứ ba tối ưu" kết hợp điểm mạnh của cả hai phía.',
          keyBusinessPhrases: ['感情的にならず', '徹底的に傾聴する', '共通の目的に立ち返らせる', '第3の最適解'],
        },
        {
          id: `int_fall_${Date.now()}_4`,
          category: 'motivation',
          categoryLabel: 'Định hướng 5 năm tới (キャリアプラン)',
          questionJp: '入社後、5年後にどのようなビジネスパーソンになっていたいですか。',
          questionReading: 'にゅうしゃご、ごねんごにどのようなビジネスパーソンになっていたいですか。',
          questionMeaning: 'Sau khi gia nhập công ty, bạn muốn trở thành người đi làm như thế nào trong 5 năm tới?',
          targetMinutes: 'Khoảng 1.5 phút',
          interviewerIntent: 'Đánh giá tầm nhìn nghề nghiệp dài hạn, tinh thần cầu tiến và ý định gắn bó lâu dài với doanh nghiệp.',
          trapToAvoid: 'Trả lời mơ hồ không có lộ trình (vd: "Tôi muốn có mức lương cao"); hoặc mục tiêu hoàn toàn không liên quan đến ngành của công ty.',
          modelAnswerPrep: {
            point: 'Trong 2 năm đầu, trở thành chuyên gia tinh thông kỹ thuật và chủ chốt dự án.',
            reason: 'Nắm vững quy trình nghiệp vụ và xây dựng uy tín trong nội bộ.',
            example: 'Từ năm thứ 3 trở đi, đảm nhận vai trò Project Manager dẫn dắt nhóm kỹ sư trẻ.',
            pointSummary: 'Đóng vai trò cầu nối vững chắc kết nối kỹ sư Việt Nam và ban lãnh đạo Nhật Bản.',
          },
          fullSampleAnswerJp:
            '入社後の最初の2年間は、現場の業務プロセスを深く理解し、エンジニアとして確実に成果を出す「頼れるプレイヤー」を目指します。そして3年目から5年目にかけては、プロジェクトマネージャーとしてチームを牽引し、後輩の育成にも注力したいと考えております。将来的には、日本とベトナムの架け橋となり、御社のオフショア開発事業を大成功に導く中核人材へと成長する所存です。',
          fullSampleAnswerReading:
            'にゅうしゃごのさいしょのにねんかんは、げんばのぎょうむプロセスをふかくりかいし、エンジニアとしてかくじつにせいかをだす「たよれるプレイヤー」をめざします。そしてさんねんめからごねんめにかけては、プロジェクトマネージャーとしてチームをけんいんし、こうはいのいくせいにもちゅうりょくしたいとかんがえております。しょうらいてきには、にほんとベトナムのかけはしとなり、おんしゃのオフショアかいはつじぎょうをおおせいこうにみちびくちゅうかくじんざいへとせいちょうするしょぞんです。',
          fullSampleAnswerMeaning:
            'Trong 2 năm đầu tiên sau khi gia nhập công ty, mục tiêu của tôi là thấu hiểu sâu sắc quy trình nghiệp vụ thực tế tại hiện trường, trở thành một "nhân sự trụ cột đáng tin cậy" luôn tạo ra thành quả vững chắc với tư cách kỹ sư. Và từ năm thứ 3 đến năm thứ 5, tôi mong muốn đảm nhận vai trò Quản lý dự án để dẫn dắt đội ngũ, đồng thời chú trọng đào tạo thế hệ đàn em. Về lâu dài, tôi tâm niệm sẽ trở thành chiếc cầu nối vững chắc giữa Nhật Bản và Việt Nam, phát triển thành nhân sự hạt nhân đưa mảng phát triển offshore của quý công ty gặt hái thành công rực rỡ.',
          keyBusinessPhrases: ['頼れるプレイヤーを目指します', 'チームを牽引し', '後輩の育成にも注力したい', '日本とベトナムの架け橋'],
        },
        {
          id: `int_fall_${Date.now()}_5`,
          category: 'reverse_question',
          categoryLabel: 'Câu hỏi ngược về văn hóa (逆質問・企業文化)',
          questionJp: '他に何か聞いておきたいことはございますか。',
          questionReading: 'ほかになにかきいておきたいことはございますか。',
          questionMeaning: 'Bạn còn điều gì muốn hỏi thêm chúng tôi không?',
          targetMinutes: 'Khoảng 1 phút',
          interviewerIntent: 'Tạo cơ hội cuối cùng để ứng viên ghi điểm bằng một câu hỏi sâu sắc thể hiện sự am hiểu và tôn trọng văn hóa công ty.',
          trapToAvoid: 'Hỏi những câu mà thông tin đã ghi rõ ràng trên trang tuyển dụng.',
          modelAnswerPrep: {
            point: 'Hỏi về đặc điểm và phẩm chất chung của những nhân viên được đánh giá cao nhất trong công ty.',
            reason: 'Thể hiện tâm thế muốn nhanh chóng hòa nhập và cống hiến đúng kỳ vọng của ban lãnh đạo.',
            example: 'Liên hệ với sự sẵn sàng chuẩn bị của bản thân.',
            pointSummary: 'Gửi lời cảm ơn chân thành kết thúc buổi phỏng vấn.',
          },
          fullSampleAnswerJp:
            '温かいお心遣いをいただき、ありがとうございます。最後に一つお伺いしたいのですが、御社で現在最も活躍され、周囲から高く評価されている社員の方々には、共通してどのような行動特性やマインドセットがございますでしょうか。ぜひ今後の心構えの参考とさせていただければ幸いです。',
          fullSampleAnswerReading:
            'あたたかいおこころづかいをいただき、ありがとうございます。さいごにひとつおうかがいしたいのですが、おんしゃでげんざいきっともかつやくされ、しゅういからたかくひょうかされているしゃいんのかたがたには、きょうつうしてどのようなこうどうとくせいやマインドセットがございますでしょうか。ぜひこんごのこころがえのさんこうとさせていただければさいわいです。',
          fullSampleAnswerMeaning:
            'Cảm ơn quý công ty vì sự quan tâm chu đáo. Cuối cùng tôi xin phép được hỏi thêm một câu: Đối với những nhân sự hiện đang hoạt động xuất sắc nhất và nhận được sự đánh giá cao nhất từ mọi người xung quanh trong quý công ty, họ thường có chung những đặc điểm hành vi và tư duy như thế nào ạ? Tôi rất mong được lắng nghe để làm kim chỉ nam chuẩn bị tâm thế vững vàng cho chặng đường sắp tới.',
          keyBusinessPhrases: ['温かいお心遣いをいただき', '一つお伺いしたいのですが', 'ぜひ今後の心構えの参考とさせていただければ幸いです'],
        },
      ];

      setScenarios((prev) => [...fallbackScenarios, ...prev]);
      setCurrentIndex(0);
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  const filteredScenarios = scenarios.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    if (!matchCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.questionJp.includes(q) ||
      item.questionMeaning.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <span className="font-display">Trợ Thủ Phỏng Vấn Tuyển Dụng & Chuyển Việc Tiếng Nhật</span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>Shinsotsu & Tenshoku Master</span>
              </span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Bí kíp chinh phục nhà tuyển dụng Nhật Bản. Cấu trúc trả lời vàng PREP / STAR, Kính ngữ Keigo chuẩn B2B, giải mã ý đồ ngầm (Honne) & Audio luyện giọng bản xứ.
          </p>
        </div>

        {/* Load More +5 Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải thêm 5 câu hỏi phỏng vấn mới mỗi lần bấm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải nạp thêm (+5 Tình huống phỏng vấn)</span>
          </button>
        </div>
      </div>

      {/* Viewed History Ribbon */}
      {historyItems.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 shrink-0 font-semibold">
            <History className="w-3.5 h-3.5" />
            <span>Đã xem ({historyItems.length}):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-0.5">
            {historyItems.slice(0, 10).map((h) => {
              const idx = scenarios.findIndex((s) => s.id === h.id);
              return (
                <button
                  key={h.id}
                  onClick={() => {
                    if (idx >= 0) {
                      setCurrentIndex(idx);
                      speechService.playSuccessSound();
                    }
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition-all shrink-0 ${
                    currentScenario.id === h.id
                      ? 'bg-emerald-600 border-emerald-400 text-white font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                  title={h.subtitle}
                >
                  <span className="truncate max-w-[150px] font-medium">{h.title}</span>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              historyService.clearHistory('interview');
              setHistoryItems([]);
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 ml-auto shrink-0 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800"
            title="Xóa lịch sử phỏng vấn"
          >
            Xóa
          </button>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'intro', label: 'Tự giới thiệu' },
            { id: 'motivation', label: 'Lý do ứng tuyển' },
            { id: 'strength_weakness', label: 'Ưu & Nhược điểm' },
            { id: 'failure', label: 'Vượt qua thất bại' },
            { id: 'reverse_question', label: 'Hỏi ngược nhà tuyển dụng' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap border ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm câu hỏi, từ khóa phỏng vấn..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Main Interview Workspace */}
      {currentScenario && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interviewer Question & Secret Intent */}
          <div className="lg:col-span-5 space-y-4">
            {/* The Question Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {currentScenario.categoryLabel}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Thời lượng lý tưởng: {currentScenario.targetMinutes}
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Câu hỏi của Người Phỏng Vấn (面接官):</span>
                  <button
                    onClick={() => speechService.speak(currentScenario.questionJp)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe</span>
                  </button>
                </div>
                <div className="text-lg md:text-xl font-bold font-jp text-slate-100 leading-snug">
                  {currentScenario.questionJp}
                </div>
                <div className="text-xs font-jp text-slate-400">{currentScenario.questionReading}</div>
                <div className="text-xs text-emerald-300/90 pt-1 border-t border-slate-800/80">
                  {currentScenario.questionMeaning}
                </div>
              </div>
            </div>

            {/* Behind The Scenes: Honne & Trap */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5 shadow-xl">
              <div className="space-y-1">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ý đồ thực sự của Nhà Tuyển Dụng (本音):</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  {currentScenario.interviewerIntent}
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Bẫy chết người cần tránh tuyệt đối:</span>
                </div>
                <p className="text-xs text-rose-200 leading-relaxed bg-rose-950/20 p-3 rounded-xl border border-rose-900/40">
                  {currentScenario.trapToAvoid}
                </p>
              </div>
            </div>

            {/* PREP Structure Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2.5 shadow-xl">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cấu Trúc Trả Lời Vàng (PREP Framework):</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="font-bold text-emerald-400">P (Point): </span>
                  <span className="text-slate-300">{currentScenario.modelAnswerPrep.point}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="font-bold text-blue-400">R (Reason): </span>
                  <span className="text-slate-300">{currentScenario.modelAnswerPrep.reason}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="font-bold text-amber-400">E (Example): </span>
                  <span className="text-slate-300">{currentScenario.modelAnswerPrep.example}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="font-bold text-emerald-400">P (Point Summary): </span>
                  <span className="text-slate-300">{currentScenario.modelAnswerPrep.pointSummary}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Sample Keigo Model Answer */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Câu Trả Lời Mẫu Chuẩn Kính Ngữ (Keigo Model Answer)</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowReadingKana(!showReadingKana)}
                    className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showReadingKana ? 'Ẩn Furigana' : 'Hiện Furigana'}
                  </button>

                  <button
                    onClick={() => speechService.speak(currentScenario.fullSampleAnswerJp)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer shadow-md transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Luyện nghe giọng bản xứ</span>
                  </button>
                </div>
              </div>

              {/* Japanese Script Box */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="text-slate-100 font-jp text-base md:text-lg leading-loose tracking-wide select-text">
                  {currentScenario.fullSampleAnswerJp}
                </div>
                {showReadingKana && (
                  <div className="text-xs font-jp text-slate-400 pt-2 border-t border-slate-800/80 leading-relaxed">
                    {currentScenario.fullSampleAnswerReading}
                  </div>
                )}
              </div>

              {/* Vietnamese Meaning */}
              <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4 text-xs text-slate-200 leading-relaxed space-y-1">
                <div className="font-bold text-emerald-400">Bản dịch nghĩa chi tiết:</div>
                <p>{currentScenario.fullSampleAnswerMeaning}</p>
              </div>

              {/* Key Business Keigo Expressions */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Cụm từ Kính ngữ B2B đắt giá cần học thuộc:
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentScenario.keyBusinessPhrases.map((phrase) => (
                    <span
                      key={phrase}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 text-emerald-300 border border-emerald-800/60 font-jp text-xs font-medium"
                    >
                      {phrase}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev - 1 + scenarios.length) % scenarios.length);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer transition-colors"
                >
                  ← Tình huống trước
                </button>
                <span className="text-xs text-slate-400 font-mono">
                  {currentIndex + 1} / {scenarios.length}
                </span>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev + 1) % scenarios.length);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Tình huống tiếp theo →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
