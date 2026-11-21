import React, { useState, useEffect } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import { historyService, HistoryItem } from '../../services/historyService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import {
  Clock,
  RefreshCw,
  Search,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  HelpCircle,
  History,
  Zap,
  Volume2,
  Sparkles,
  BookOpen,
  Filter,
} from 'lucide-react';

export interface DokkaiSpeedPassage {
  id: string;
  title: string;
  level: JLPTLevel;
  recommendedSeconds: number;
  topic: string;
  rawText: string;
  translation: string;
  keyConnectors: {
    word: string;
    type: 'contrast' | 'conclusion' | 'addition' | 'cause';
    role: string;
  }[];
  mainIdea: string;
  question: {
    prompt: string;
    options: { id: string; text: string; isCorrect: boolean }[];
    speedScanningTip: string;
    trapWarning: string;
    explanation: string;
  };
}

const initialPassages: DokkaiSpeedPassage[] = [
  {
    id: 'dsp_1',
    title: 'AI技術と人間の共生 (Trí tuệ nhân tạo và sự cộng sinh với con người)',
    level: 'N2',
    recommendedSeconds: 60,
    topic: 'Khoa học công nghệ & Xã hội tương lai',
    rawText:
      '近年、生成AIの進化により、文章作成やプログラミングなど知的労働の自動化が急速に進んでいる。多くの人々は将来自分の仕事が奪われるのではないかと危惧している。しかし、AIは既存の膨大なデータを学習して再現する道具にすぎない。つまり、前例のない新しい価値を生み出す独創性や、他者の痛みに寄り添う共感力は依然として人間にしか持ち得ない特権なのだ。したがって、私たちはAIを脅威として恐れるのではなく、自らの創造性を拡張するための協働パートナーとして捉えるべきである。',
    translation:
      'Những năm gần đây, với sự tiến hóa của AI tạo sinh, quá trình tự động hóa các lao động trí óc như soạn thảo văn bản hay lập trình đang diễn ra nhanh chóng. Nhiều người lo sợ rằng công việc của mình trong tương lai sẽ bị cướp mất. TUY NHIÊN (しかし), AI chẳng qua chỉ là công cụ học hỏi và tái hiện lại lượng dữ liệu khổng lồ có sẵn. TỨC LÀ (つまり), sự độc tạo tạo ra giá trị mới chưa từng có tiền lệ và năng lực thấu cảm sẻ chia nỗi đau của người khác vẫn là đặc quyền mà chỉ con người mới có. DO ĐÓ (したがって), thay vì sợ hãi AI như một mối đe dọa, chúng ta nên nhìn nhận nó như một đối tác cộng tác để mở rộng sức sáng tạo của chính mình.',
    keyConnectors: [
      { word: 'しかし', type: 'contrast', role: 'Đổi hướng tư duy: Bác bỏ nỗi sợ AI cướp việc làm' },
      { word: 'つまり', type: 'conclusion', role: 'Tóm lược bản chất: Chỉ rõ giới hạn của AI và đặc quyền của con người' },
      { word: 'したがって', type: 'conclusion', role: 'Chốt luận điểm tác giả: Phải coi AI là đối tác sáng tạo' },
    ],
    mainIdea: 'AI chỉ là công cụ dựa trên dữ liệu cũ; sự sáng tạo và thấu cảm là đặc quyền của con người, nên cần coi AI là đối tác.',
    question: {
      prompt: '筆者の最も主張したいことは何か。 (Luận điểm trọng tâm nhất của tác giả là gì?)',
      options: [
        { id: 'a', text: 'AIの進化を法的に規制し、人間の仕事を保護するべきだ。', isCorrect: false },
        { id: 'b', text: 'AIの特性を理解した上で、創造性を高める協力相手として向き合うべきだ。', isCorrect: true },
        { id: 'c', text: 'AIは既存データの再現しかできないため、今後進化することはない。', isCorrect: false },
        { id: 'd', text: 'プログラミングや文章作成の仕事はすべてAIに任せるべきだ。', isCorrect: false },
      ],
      speedScanningTip: 'Kỹ thuật Scan siêu tốc: Bỏ qua đoạn mô tả thực trạng đầu bài, lướt thẳng mắt đến liên từ [したがって] ở câu cuối cùng để tóm gọn luận điểm tác giả!',
      trapWarning: 'Bẫy đọc lướt: Không chọn các đáp án cực đoan như "cấm AI" hay "giao phó toàn bộ cho AI".',
      explanation: 'Câu kết「したがって、私たちはAIを脅威として恐れるのではなく、自らの創造性を拡張するための協働パートナーとして捉えるべきである」khẳng định đáp án B.',
    },
  },
  {
    id: 'dsp_2',
    title: '失敗の受容と組織のイノベーション (Chấp nhận thất bại & Đổi mới sáng tạo)',
    level: 'N1',
    recommendedSeconds: 75,
    topic: 'Quản trị doanh nghiệp Nhật Bản',
    rawText:
      '伝統的な日本企業では、減点主義が根強く、一度のミスが昇進の道を閉ざす傾向が長く続いてきた。そのため、社員は冒険を避け、前例踏襲の無難な選択に終始しがちであった。ところが、激変するグローバル市場において、何もしないことこそが最大の敗北要因となりつつある。なぜなら、不確実性の高い時代には、数々の小さな実験と失敗の積み重ねからしか革新的な突破口は生まれないからだ。要するに、失敗を個人の失態として責めるのではなく、組織全体の学びの資産として還元する企業文化への転換が急務なのだ。',
    translation:
      'Tại các doanh nghiệp Nhật Bản truyền thống, chủ nghĩa trừ điểm cắm rễ sâu sắc, khiến một lỗi lầm có thể dập tắt con đường thăng tiến. Do đó nhân viên có xu hướng né tránh mạo hiểm, chỉ trung thành với tiền lệ an toàn. TRÁI LẠI (ところが), trong thị trường toàn cầu biến động khốc liệt, việc "không dám làm gì" đang dần trở thành yếu tố thất bại lớn nhất. BỞI VÌ (なぜなら), trong kỷ nguyên bất định, đột phá đổi mới chỉ sinh ra từ việc tích lũy các thử nghiệm nhỏ và thất bại. TÓM LẠI (要するに), việc chuyển đổi sang văn hóa doanh nghiệp coi thất bại là tài sản học tập chung thay vì quy trách nhiệm cá nhân là yêu cầu cấp bách.',
    keyConnectors: [
      { word: 'ところが', type: 'contrast', role: 'Bẻ ngoặt vấn đề: Chỉ ra việc không mạo hiểm chính là nguy cơ lớn nhất' },
      { word: 'なぜなら', type: 'cause', role: 'Giải thích nguyên nhân: Đổi mới chỉ nảy sinh từ chuỗi thử nghiệm thất bại' },
      { word: '要するに', type: 'conclusion', role: 'Kết luận chốt hạ: Cần văn hóa coi thất bại là tài sản học hỏi của tổ chức' },
    ],
    mainIdea: 'Doanh nghiệp cần biến thất bại thành tài sản tri thức của tổ chức để thúc đẩy đổi mới.',
    question: {
      prompt: '現在、企業に最も求められている意識改革はどのようなものか。 (Sự đổi mới nhận thức cấp bách nhất là gì?)',
      options: [
        { id: 'a', text: '前例を厳格に守り、ミスのない確実な業務を徹底すること。', isCorrect: false },
        { id: 'b', text: '失敗を恐れず挑戦し、その経験を組織全体の成長に生かすこと。', isCorrect: true },
        { id: 'c', text: '失敗を起こした社員を速やかに処分し、再発を防ぐこと。', isCorrect: false },
        { id: 'd', text: '海外市場への進出を取りやめ、国内事業に専念すること。', isCorrect: false },
      ],
      speedScanningTip: 'Kỹ thuật Scan siêu tốc: Tìm ngay từ khóa tóm tắt「要するに」-> Sau đó đọc vị cụm từ「組織全体の学びの資産として還元する」.',
      trapWarning: 'Bẫy đề thi JEES: Đáp án A là tư duy cũ thời xưa mà tác giả đang phê phán, chớ nhầm lẫn!',
      explanation: 'Tác giả dùng「要するに」để kết luận rằng cần biến thất bại thành tài sản của tập thể -> Chọn B.',
    },
  },
  {
    id: 'dsp_3',
    title: '読書習慣と情報の取捨選択 (Thói quen đọc sách & Chọn lọc thông tin)',
    level: 'N3',
    recommendedSeconds: 50,
    topic: 'Kỹ năng sống & Phát triển bản thân',
    rawText:
      '現代社会はインターネットやSNSの普及により、膨大な情報が瞬時に手に入るようになった。しかし、断片的な情報をいくら集めても、物事の本質を深く理解したことにはならない。なぜなら、真の思考力とは、体系的に整理された知識をじっくり吟味する中で培われるからである。だからこそ、一冊の本を最初から最後まで丁寧に読み通す読書体験が、今こそ見直されるべきなのだ。',
    translation:
      'Xã hội hiện đại nhờ internet và mạng xã hội mà ta có thể tiếp cận lượng thông tin khổng lồ trong tích tắc. TUY NHIÊN (しかし), dù gom nhặt bao nhiêu thông tin manh mún đi chăng nữa cũng không đồng nghĩa với việc hiểu thấu đáo bản chất. BỞI VÌ (なぜなら), năng lực tư duy đích thực chỉ được bồi đắp khi nghiền ngẫm tri thức có hệ thống. CHÍNH VÌ THẾ (だからこそ), trải nghiệm đọc trọn vẹn một cuốn sách từ đầu đến cuối chính là điều cần được nhìn nhận lại lúc này.',
    keyConnectors: [
      { word: 'しかし', type: 'contrast', role: 'Phủ nhận giá trị thông tin manh mún trôi nổi trên mạng' },
      { word: 'なぜなら', type: 'cause', role: 'Lý giải vì sao tư duy cần tri thức có hệ thống' },
      { word: 'だからこそ', type: 'conclusion', role: 'Khẳng định giá trị của việc đọc sách chỉn chu' },
    ],
    mainIdea: 'Thông tin mạng xã hội mang tính chắp vá; chỉ có đọc sách trọn vẹn mới rèn luyện được năng lực tư duy đích thực.',
    question: {
      prompt: '筆者が読書を勧めている理由は何か。 (Vì sao tác giả lại khuyên nên đọc sách?)',
      options: [
        { id: 'a', text: 'ネットよりも早く最新のニュースを知ることができるから。', isCorrect: false },
        { id: 'b', text: '体系的な知識を通じて、深く本質を考える力が身につくから。', isCorrect: true },
        { id: 'c', text: 'SNSを使う時間を減らして、目を休めることができるから。', isCorrect: false },
        { id: 'd', text: '本を買うことで出版業界の発展に貢献できるから。', isCorrect: false },
      ],
      speedScanningTip: 'Kỹ thuật Scan siêu tốc: Sau「なぜなら」tác giả nói「体系的に整理された知識をじっくり吟味する」-> Chọn ngay đáp án có từ khóa「体系的」!',
      trapWarning: 'Bẫy đề thi: Đáp án A ngược với thực tế (sách cập nhật chậm hơn mạng xã hội).',
      explanation: 'Tác giả nêu rõ tư duy sâu sắc chỉ đến từ tri thức hệ thống -> Đáp án B.',
    },
  },
];

export const DokkaiSpeedScanner: React.FC<{ currentLevel: JLPTLevel }> = ({ currentLevel }) => {
  const [passages, setPassages] = useState<DokkaiSpeedPassage[]>(initialPassages);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [highlightConnectors, setHighlightConnectors] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(() =>
    historyService.getHistory('speed_dokkai')
  );

  const currentPassage = passages[currentIndex % passages.length] || passages[0];

  // Track viewed passage in history
  useEffect(() => {
    if (currentPassage) {
      const updated = historyService.addItem('speed_dokkai', {
        id: currentPassage.id,
        title: currentPassage.title,
        subtitle: currentPassage.mainIdea.slice(0, 35) + '...',
        level: currentPassage.level,
      });
      setHistoryItems(updated);
    }
  }, [currentPassage?.id]);

  // Reset timer on passage change
  useEffect(() => {
    setSecondsRemaining(currentPassage.recommendedSeconds);
    setTimerRunning(false);
    setSelectedOption(null);
  }, [currentIndex, currentPassage.recommendedSeconds]);

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && timerRunning) {
      setTimerRunning(false);
      speechService.playErrorSound();
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsRemaining]);

  // Load More +5 Speed Reading Passages
  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo thêm 5 Bài luyện đọc lướt Dokkai Speed-Scanner tiếng Nhật trình độ ${currentLevel} hoặc N1/N2/N3 (đoạn văn ngắn 120-180 chữ) kèm phân tích liên từ logic (Connectors) và câu hỏi trắc nghiệm chốt ý tác giả.
Định dạng JSON thuần là một mảng 5 phần tử DokkaiSpeedPassage:
[
  {
    "id": "dsp_${Date.now()}_1",
    "title": "tiêu đề bài đọc",
    "level": "${currentLevel}",
    "recommendedSeconds": 60,
    "topic": "chủ đề xã hội/công nghệ/văn hóa",
    "rawText": "đoạn văn tiếng Nhật 120-180 từ chứa liên từ logic rõ ràng",
    "translation": "bản dịch tiếng Việt chỉn chu",
    "keyConnectors": [
      { "word": "từ nối", "type": "contrast", "role": "vai trò chuyển hướng hoặc chốt hạ" }
    ],
    "mainIdea": "thông điệp trung tâm ngắn gọn",
    "question": {
      "prompt": "câu hỏi trắc nghiệm tiếng Nhật",
      "options": [
        { "id": "a", "text": "đáp án 1", "isCorrect": false },
        { "id": "b", "text": "đáp án 2", "isCorrect": true },
        { "id": "c", "text": "đáp án 3", "isCorrect": false },
        { "id": "d", "text": "đáp án 4", "isCorrect": false }
      ],
      "speedScanningTip": "mẹo scan dò tìm từ khóa nhanh",
      "trapWarning": "cảnh báo bẫy JEES",
      "explanation": "lời giải"
    }
  }
]
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = safeExtractJson<DokkaiSpeedPassage[] | null>(res, null);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.filter((it) => it && it.title && it.rawText).slice(0, 5);
        if (valid5.length > 0) {
          setPassages((prev) => [...valid5, ...prev]);
          setCurrentIndex(0);
          speechService.playSuccessSound();
          return;
        }
      }
      throw new Error('Dùng 5 bài đọc fallback');
    } catch {
      // 5 Curated High-Yield Fallbacks
      const fallbackPassages: DokkaiSpeedPassage[] = [
        {
          id: `dsp_fall_${Date.now()}_1`,
          title: '環境配慮と消費者の選択 (Bảo vệ môi trường & Lựa chọn của người tiêu dùng)',
          level: 'N2',
          recommendedSeconds: 60,
          topic: 'Kinh tế tuần hoàn & Lối sống xanh',
          rawText:
            'エコ商品の普及が進む一方で、従来品に比べて価格が高めに設定されていることが購入の障壁となっている。しかし、目先の安さだけを基準に商品を選ぶ時代は終わりを告げつつある。なぜなら、環境負荷を無視した安価な製品の大量消費は、将来的に気候変動という形でより莫大なコストとして社会に跳ね返ってくるからだ。つまり、今多少のコストを支払ってでも環境配慮型の商品を支持することが、巡り巡って私たち自身の生活基盤を守ることにつながるのである。',
          translation:
            'Trong khi các sản phẩm sinh thái ngày càng phổ biến, việc giá thành đắt hơn sản phẩm truyền thống đang là rào cản mua sắm. TUY NHIÊN (しかし), thời đại chỉ lấy tiêu chí rẻ trước mắt để chọn mua hàng đang dần khép lại. BỞI VÌ (なぜなら), việc tiêu dùng ồ ạt các sản phẩm giá rẻ ngó lơ môi trường về lâu dài sẽ dội ngược lại xã hội bằng những chi phí khổng lồ từ biến đổi khí hậu. TỨC LÀ (つまり), việc ủng hộ sản phẩm thân thiện môi trường dù phải trả giá cao hơn đôi chút lúc này sẽ bảo vệ chính nền tảng sinh tồn của chúng ta.',
          keyConnectors: [
            { word: 'しかし', type: 'contrast', role: 'Bác bỏ thói quen chuộng đồ giá rẻ' },
            { word: 'なぜなら', type: 'cause', role: 'Cảnh báo chi phí khổng lồ từ biến đổi khí hậu' },
            { word: 'つまり', type: 'conclusion', role: 'Chốt luận điểm: Mua đồ sinh thái là bảo vệ chính tương lai mình' },
          ],
          mainIdea: 'Mua sản phẩm thân thiện với môi trường dù đắt hơn một chút nhưng là khoản đầu tư bảo vệ cuộc sống tương lai.',
          question: {
            prompt: '筆者が消費者に最も伝達したいメッセージは何か。 (Thông điệp mà tác giả muốn truyền tải nhất là gì?)',
            options: [
              { id: 'a', text: '企業はエコ商品の価格を従来品と同等まで値下げするべきだ。', isCorrect: false },
              { id: 'b', text: '多少割高であっても、将来を見据えて環境配慮商品を選択すべきだ。', isCorrect: true },
              { id: 'c', text: '気候変動の防止は政府の責任であり、個人の消費とは無関係だ。', isCorrect: false },
              { id: 'd', text: '安価な製品を大量購入して生活費を節約することが賢明だ。', isCorrect: false },
            ],
            speedScanningTip: 'Kỹ thuật Scan siêu tốc: Tìm cụm「つまり」ở câu cuối -> Nắm bắt luận điểm「環境配慮型の商品を支持することが...守ることにつながる」.',
            trapWarning: 'Bẫy cực đoan: Đáp án A chỉ bàn về việc hạ giá bán, không phải thông điệp trung tâm.',
            explanation: 'Tác giả dùng「つまり」để kết luận rằng người tiêu dùng cần chấp nhận giá cao hơn đôi chút để bảo vệ tương lai -> Chọn B.',
          },
        },
        {
          id: `dsp_fall_${Date.now()}_2`,
          title: '多文化共生とコミュニケーションの姿勢 (Đa văn hóa & Thái độ giao tiếp)',
          level: 'N1',
          recommendedSeconds: 70,
          topic: 'Xã hội học & Toàn cầu hóa',
          rawText:
            '異文化コミュニケーションにおいて、言葉の正確な伝達はもちろん重要である。だが、語学力以上に決定的な要素となるのは、「相手の文脈に身を置く想像力」である。自分の常識や文化的価値観を絶対視している限り、いくら流暢な外国語を操っても真の相互理解には至らない。要するに、自らの前提を一度疑い、相手の視点から物事を捉え直す柔軟な知的謙虚さこそが、国境を越えた信頼関係を構築する基盤となるのだ。',
          translation:
            'Trong giao tiếp đa văn hóa, truyền đạt ngôn từ chính xác dĩ nhiên là quan trọng. NHƯNG (だが), yếu tố mang tính quyết định hơn cả năng lực ngôn ngữ lại chính là "trí tưởng tượng đặt mình vào ngữ cảnh của đối phương". Chừng nào còn xem thường thức và giá trị văn hóa của mình là chuẩn mực tuyệt đối, thì dù có bắn ngoại ngữ lưu loát đến đâu cũng không thể chạm tới sự thấu hiểu tương hỗ đích thực. TÓM LẠI (要するに), sự khiêm nhường linh hoạt dám hoài nghi tiền đề của bản thân và nhìn nhận sự việc từ góc nhìn đối phương mới là nền tảng xây dựng mối quan hệ tin cậy vượt biên giới.',
          keyConnectors: [
            { word: 'だが', type: 'contrast', role: 'Nhấn mạnh trí tưởng tượng thấu cảm quan trọng hơn cả năng lực ngoại ngữ' },
            { word: '要するに', type: 'conclusion', role: 'Chốt tiêu chuẩn vàng: Đặt mình vào góc nhìn đối phương với lòng khiêm tốn' },
          ],
          mainIdea: 'Giao tiếp đa văn hóa đòi hỏi sự khiêm tốn đặt mình vào góc nhìn đối phương hơn là chỉ nói tiếng lưu loát.',
          question: {
            prompt: '真の異文化理解のために最も不可欠な条件は何か。 (Điều kiện tối quan trọng nhất để thấu hiểu đa văn hóa là gì?)',
            options: [
              { id: 'a', text: 'ネイティブスピーカーと同等の完璧な発音と文法力。', isCorrect: false },
              { id: 'b', text: '自らの文化的前提を疑い、相手の視点に立とうとする柔軟性。', isCorrect: true },
              { id: 'c', text: '自国の歴史と伝統の優位性を論理的に主張する能力。', isCorrect: false },
              { id: 'd', text: '相手の文化に同化し、自らのアイデンティティを捨てること。', isCorrect: false },
            ],
            speedScanningTip: 'Kỹ thuật Scan siêu tốc: Bỏ qua câu dẫn nhập, đọc ngay sau「要するに」-> Bắt trọn từ khóa「柔軟な知的謙虚さ」.',
            trapWarning: 'Bẫy JEES: Đáp án A là suy nghĩ thông thường sai lầm mà tác giả đã phản biện trong câu 2.',
            explanation: 'Tác giả dùng「要するに」kết luận rằng linh hoạt nhìn nhận từ góc nhìn đối phương mới là gốc rễ -> Chọn B.',
          },
        },
        {
          id: `dsp_fall_${Date.now()}_3`,
          title: '睡眠の質と日中のパフォーマンス (Chất lượng giấc ngủ & Hiệu suất ban ngày)',
          level: 'N3',
          recommendedSeconds: 50,
          topic: 'Y học thường thức & Năng suất làm việc',
          rawText:
            '多忙な現代人は、締め切りに追われると真っ先に睡眠時間を削りがちである。しかし、睡眠不足の状態でいくら机に向かっても、集中力や判断力は著しく低下し、かえって作業効率を落とす結果となる。なぜなら、脳は睡眠中に不要な記憶を整理し、新しい情報を定着させる修復作業を行っているからだ。したがって、成果を出したい時ほど、十分な睡眠を確保して脳を万全の状態に保つことが賢明な戦略といえる。',
          translation:
            'Người hiện đại bận rộn khi bị dí deadline thường cắt bớt giờ ngủ đầu tiên. TUY NHIÊN (しかし), ngồi vào bàn làm việc trong tình trạng thiếu ngủ thì độ tập trung và phán đoán đều sụt giảm nghiêm trọng, rốt cuộc lại làm giảm hiệu suất. BỞI VÌ (なぜなら), não bộ thực hiện quá trình tái tạo sắp xếp lại ký ức trong giấc ngủ. DO ĐÓ (したがって), những lúc càng muốn tạo ra thành quả, việc ngủ đủ giấc để não bộ ở trạng thái tốt nhất mới là chiến lược khôn ngoan.',
          keyConnectors: [
            { word: 'しかし', type: 'contrast', role: 'Vạch trần sai lầm của việc thức đêm làm việc' },
            { word: 'なぜなら', type: 'cause', role: 'Khoa học não bộ cần giấc ngủ để phục hồi' },
            { word: 'したがって', type: 'conclusion', role: 'Khuyên ngủ đủ giấc chính là chiến lược tăng năng suất' },
          ],
          mainIdea: 'Thiếu ngủ làm giảm hiệu suất làm việc; muốn đạt thành tích cao cần ưu tiên ngủ đủ giấc.',
          question: {
            prompt: '筆者が最も主張したいことは何か。 (Luận điểm trọng tâm của bài viết là gì?)',
            options: [
              { id: 'a', text: '締め切りを守るためには徹夜もやむを得ない。', isCorrect: false },
              { id: 'b', text: '高い成果を上げるためには、十分な睡眠を優先するべきだ。', isCorrect: true },
              { id: 'c', text: '睡眠時間を削れば作業時間を2倍に増やすことができる。', isCorrect: false },
              { id: 'd', text: '睡眠中の脳は完全に活動を停止している。', isCorrect: false },
            ],
            speedScanningTip: 'Kỹ thuật Scan siêu tốc: Dò tìm liên từ「したがって」ở câu chốt cuối bài -> Đọc cụm「十分な睡眠を確保して」.',
            trapWarning: 'Bẫy tư duy: Không đồng tình với thói quen thức khuya chạy deadline.',
            explanation: 'Câu cuối cùng nêu rõ ngủ đủ giấc là chiến lược thông minh để đạt kết quả -> Chọn B.',
          },
        },
        {
          id: `dsp_fall_${Date.now()}_4`,
          title: 'アナログレコードの再評価 (Sự trỗi dậy của đĩa than Analog)',
          level: 'N2',
          recommendedSeconds: 60,
          topic: 'Văn hóa âm nhạc & Công nghệ số',
          rawText:
            '音楽配信サービスの普及により、世界中の楽曲が手軽に聴き放題の時代となった。しかし、その利便性の極致において、あえて手間のかかるアナログレコードを買い求める若者が急増している。なぜなら、針を落とす儀式的な行為や、大型ジャケットの温かみある触感が、デジタルでは決して得られない「所有する実感」を与えてくれるからだ。このように、効率や利便性が追求され尽くした社会では、不便さの中に宿る情緒的価値こそが新たな魅力として再評価されるのである。',
          translation:
            'Với sự phổ biến của nhạc số trực tuyến, kỷ nguyên nghe nhạc thả ga dễ dàng đã mở ra. TUY NHIÊN (しかし), ngay tại đỉnh cao tiện lợi ấy, số người trẻ tìm mua đĩa than vinyl bất tiện lại tăng vọt. BỞI VÌ (なぜなら), hành động đặt kim đĩa than hay cảm giác cầm bìa đĩa khổ lớn đem lại "cảm giác sở hữu thực sự" mà nhạc số không thể có. NHƯ THẾ ĐÓ (このように), trong một xã hội nơi sự tiện lợi đã được đẩy lên tột độ, thì giá trị cảm xúc ẩn chứa trong sự bất tiện lại được tái định giá như một sức hút mới.',
          keyConnectors: [
            { word: 'しかし', type: 'contrast', role: 'Nêu hiện tượng nghịch lý: Nhạc số cực tiện nhưng đĩa than lại sốt' },
            { word: 'なぜなら', type: 'cause', role: 'Lý giải trải nghiệm xúc giác và cảm xúc sở hữu thực thụ' },
            { word: 'このように', type: 'conclusion', role: 'Đúc kết quy luật xã hội: Giá trị cảm xúc trong sự bất tiện' },
          ],
          mainIdea: 'Xã hội càng siêu tiện lợi thì những trải nghiệm hoài niệm mang giá trị cảm xúc xúc giác lại càng được trân trọng.',
          question: {
            prompt: '若者がアナログレコードを買い求める最大の理由は何か。 (Vì sao người trẻ lại tìm mua đĩa than?)',
            options: [
              { id: 'a', text: '音楽配信サービスよりも音質が格段に優れているから。', isCorrect: false },
              { id: 'b', text: 'デジタルにはない実体感や情緒的な価値を実感できるから。', isCorrect: true },
              { id: 'c', text: '配信サービスが有料化されて高額になったから。', isCorrect: false },
              { id: 'd', text: 'スマートフォンを使うのをやめたいと考えているから。', isCorrect: false },
            ],
            speedScanningTip: 'Kỹ thuật Scan siêu tốc: Nhìn câu có「このように」-> Bắt cụm「不便さの中に宿る情緒的価値」.',
            trapWarning: 'Bẫy đề thi: Bài đọc không khẳng định âm thanh đĩa than ưu việt hơn kỹ thuật số, mà nhấn mạnh vào giá trị cảm xúc.',
            explanation: 'Tác giả kết luận giá trị cảm xúc thực thể (情緒的価値) là lý do người trẻ chọn đĩa than -> Chọn B.',
          },
        },
        {
          id: `dsp_fall_${Date.now()}_5`,
          title: 'リスキリングと生涯学習の重要性 (Học tập suốt đời & Reskilling)',
          level: 'N1',
          recommendedSeconds: 65,
          topic: 'Thị trường lao động & Phát triển nghề nghiệp',
          rawText:
            'かつての終身雇用制の下では、大学で学んだ知識と社内OJTだけで定年まで逃げ切ることが可能であった。ところが、産業構造が激変する現代において、スキルの賞味期限はかつてないスピードで短命化している。自分の過去の成功体験に固執していては、瞬く間に市場価値を失いかねない。つまり、これからのビジネスパーソンに必須なのは、生涯にわたって新たな知識を獲得し続ける「アンラーンとリスキリング」の姿勢なのだ。',
          translation:
            'Dưới chế độ tuyển dụng trọn đời trước đây, người ta có thể an tâm làm việc đến tuổi nghỉ hưu chỉ với kiến thức đại học và đào tạo nội bộ. TRÁI LẠI (ところが), trong thời đại biến động công nghiệp hiện nay, hạn sử dụng của kỹ năng đang rút ngắn với tốc độ chưa từng thấy. Nếu cứ bám víu vào thành công quá khứ, ta có thể đánh mất giá trị thị trường trong chớp mắt. TỨC LÀ (つまり), điều tối quan trọng với người đi làm từ nay về sau chính là thái độ "Unlearn và Reskill" - liên tục học hỏi tri thức mới suốt cả cuộc đời.',
          keyConnectors: [
            { word: 'ところが', type: 'contrast', role: 'Đối lập thời xưa an toàn với thời nay kỹ năng nhanh lỗi thời' },
            { word: 'つまり', type: 'conclusion', role: 'Chốt giải pháp sinh tồn: Liên tục nâng cấp kỹ năng và học tập suốt đời' },
          ],
          mainIdea: 'Kỹ năng thời hiện đại nhanh lỗi thời; người lao động phải liên tục học tập suốt đời để duy trì giá trị.',
          question: {
            prompt: '現代のビジネスパーソンにとって最も肝要な姿勢は何か。 (Thái độ quan trọng nhất đối với người đi làm hiện nay là gì?)',
            options: [
              { id: 'a', text: '過去の成功体験を守り続け、社内政治で地位を固めること。', isCorrect: false },
              { id: 'b', text: '時代の変化に応じて常に新しい知識や技能を学び直すこと。', isCorrect: true },
              { id: 'c', text: '大学に入り直して最初から学歴をやり直すこと。', isCorrect: false },
              { id: 'd', text: '終身雇用を保証してくれる企業だけに転職すること。', isCorrect: false },
            ],
            speedScanningTip: 'Kỹ thuật Scan siêu tốc: Nhìn câu cuối có「つまり」-> Từ khóa「生涯にわたって新たな知識を獲得し続ける」.',
            trapWarning: 'Bẫy đề thi: Chú ý không chọn đáp án bảo thủ A.',
            explanation: 'Tác giả khẳng định cần liên tục học tập và làm mới kỹ năng suốt đời -> Chọn B.',
          },
        },
      ];

      setPassages((prev) => [...fallbackPassages, ...prev]);
      setCurrentIndex(0);
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Helper to render text with highlighted connectors
  const renderHighlightedText = (text: string, connectors: DokkaiSpeedPassage['keyConnectors']) => {
    if (!highlightConnectors) return <span>{text}</span>;

    // Build regex of connector words
    const words = connectors.map((c) => c.word);
    const regex = new RegExp(`(${words.join('|')})`, 'g');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) => {
          const match = connectors.find((c) => c.word === part);
          if (match) {
            let color = 'bg-rose-500/20 text-rose-300 border-rose-500/50 font-bold';
            if (match.type === 'conclusion') color = 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold';
            if (match.type === 'cause') color = 'bg-purple-500/20 text-purple-300 border-purple-500/50 font-bold';
            if (match.type === 'addition') color = 'bg-blue-500/20 text-blue-300 border-blue-500/50 font-bold';

            return (
              <span
                key={i}
                className={`inline-block px-1.5 py-0.5 rounded border mx-0.5 shadow-sm text-sm ${color}`}
                title={`${match.word}: ${match.role}`}
              >
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <span className="font-display">Máy Huấn Luyện Đọc Lướt Siêu Tốc (Dokkai Speed-Scanner)</span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Skim & Scan Timer Mode</span>
              </span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Kỹ thuật dò tìm từ khóa trọng điểm, tự động bắt liên từ đổi hướng (しかし, つまり, したがって) & Khóa mục tiêu câu hỏi trong 45 - 60 giây.
          </p>
        </div>

        {/* Load More +5 Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải thêm 5 bài luyện đọc lướt mới mỗi lần bấm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải nạp thêm (+5 Bài luyện Skim & Scan)</span>
          </button>
        </div>
      </div>

      {/* Viewed History Ribbon */}
      {historyItems.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 text-cyan-400 shrink-0 font-semibold">
            <History className="w-3.5 h-3.5" />
            <span>Đã xem ({historyItems.length}):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-0.5">
            {historyItems.slice(0, 10).map((h) => {
              const idx = passages.findIndex((p) => p.id === h.id);
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
                    currentPassage.id === h.id
                      ? 'bg-cyan-600 border-cyan-400 text-white font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                  title={h.subtitle}
                >
                  <span className="truncate max-w-[140px]">{h.title}</span>
                  {h.level && <span className="text-[9px] text-slate-400">[{h.level}]</span>}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              historyService.clearHistory('speed_dokkai');
              setHistoryItems([]);
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 ml-auto shrink-0 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800"
            title="Xóa lịch sử bài đọc"
          >
            Xóa
          </button>
        </div>
      )}

      {/* Toolbar & Speed Timer */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          {/* Timer Display */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-sm">
            <Clock className={`w-4 h-4 ${secondsRemaining < 15 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`} />
            <span className={secondsRemaining < 15 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
              00:{String(secondsRemaining).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer border ${
              timerRunning
                ? 'bg-rose-950/70 border-rose-800 text-rose-300'
                : 'bg-cyan-600 border-cyan-500 text-white hover:bg-cyan-500 shadow-sm'
            }`}
          >
            {timerRunning ? 'Tạm dừng đồng hồ' : 'Bắt đầu bấm giờ Skim & Scan'}
          </button>

          <button
            onClick={() => {
              setSecondsRemaining(currentPassage.recommendedSeconds);
              setTimerRunning(false);
            }}
            className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 cursor-pointer"
            title="Đặt lại đồng hồ"
          >
            Reset
          </button>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHighlightConnectors(!highlightConnectors)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer border ${
              highlightConnectors
                ? 'bg-amber-950/60 border-amber-700/60 text-amber-300'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
            title="Đánh dấu từ nối logic để dò tìm câu kết luận"
          >
            <span>{highlightConnectors ? 'Bật sáng Liên từ: BẬT' : 'Bật sáng Liên từ: TẮT'}</span>
          </button>

          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer border ${
              showTranslation
                ? 'bg-indigo-950/60 border-indigo-700/60 text-indigo-300'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            {showTranslation ? <EyeOff className="w-3.5 h-3.5 inline mr-1" /> : <Eye className="w-3.5 h-3.5 inline mr-1" />}
            <span>{showTranslation ? 'Ẩn dịch nghĩa' : 'Hiện dịch nghĩa'}</span>
          </button>
        </div>
      </div>

      {/* Main Passage & Question Screen */}
      {currentPassage && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Reading Passage Area */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {currentPassage.level}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{currentPassage.topic}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 mt-1">{currentPassage.title}</h3>
              </div>

              <button
                onClick={() => speechService.speak(currentPassage.rawText)}
                className="p-2 text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                title="Nghe giọng đọc bản xứ toàn bài"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Passage Text */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 text-slate-100 font-jp text-base md:text-lg leading-loose tracking-wide select-text">
              {renderHighlightedText(currentPassage.rawText, currentPassage.keyConnectors)}
            </div>

            {/* Vietnamese Translation if toggled */}
            {showTranslation && (
              <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-xl p-4 text-xs text-slate-300 leading-relaxed animate-fadeIn">
                <div className="font-semibold text-indigo-400 mb-1">Bản dịch tiếng Việt đối chiếu:</div>
                <p>{currentPassage.translation}</p>
              </div>
            )}

            {/* Key Connectors Summary Pill Bar */}
            {highlightConnectors && currentPassage.keyConnectors.length > 0 && (
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bản đồ Từ Nối Logic (Discourse Connectors):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {currentPassage.keyConnectors.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="font-jp font-bold text-amber-300 shrink-0">{c.word}:</span>
                      <span className="text-slate-300 text-[11px] leading-tight">{c.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prev / Next Passage */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev - 1 + passages.length) % passages.length);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer transition-colors"
              >
                ← Bài trước
              </button>
              <span className="text-xs text-slate-400 font-mono">
                {currentIndex + 1} / {passages.length}
              </span>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev + 1) % passages.length);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Bài kế tiếp →
              </button>
            </div>
          </div>

          {/* Right: Question & Scan Analysis */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Câu hỏi chốt luận điểm:</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl font-jp text-sm font-semibold text-slate-100">
                {currentPassage.question.prompt}
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                {currentPassage.question.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (selectedOption !== null) {
                    if (opt.isCorrect) {
                      style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected) {
                      style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        if (selectedOption === null) {
                          setSelectedOption(opt.id);
                          if (opt.isCorrect) speechService.playSuccessSound();
                          else speechService.playErrorSound();
                        }
                      }}
                      disabled={selectedOption !== null}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-jp transition-all cursor-pointer flex items-center justify-between ${style}`}
                    >
                      <span className="leading-relaxed">{opt.text}</span>
                      {selectedOption !== null && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Speed Scanning Tip Callout */}
              <div className="bg-cyan-950/30 border border-cyan-900/50 p-3 rounded-xl text-xs space-y-1">
                <div className="font-bold text-cyan-300 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Bí quyết Skim & Scan siêu tốc:</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {currentPassage.question.speedScanningTip}
                </p>
              </div>

              {/* Post-answer analysis */}
              {selectedOption !== null && (
                <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs space-y-2 animate-fadeIn">
                  <div className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Phân tích đáp án chuẩn:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {currentPassage.question.explanation}
                  </p>
                  <div className="pt-1 text-rose-400 text-[11px] border-t border-slate-800/80">
                    <span className="font-semibold">Cảnh báo bẫy JEES: </span>
                    <span className="text-slate-300">{currentPassage.question.trapWarning}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
