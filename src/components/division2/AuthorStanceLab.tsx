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
  Eye,
  EyeOff,
  Lightbulb,
  Zap,
  Target,
  ArrowRight,
  Check,
} from 'lucide-react';

interface AuthorStanceItem {
  id: string;
  theme: string;
  jlptTarget: 'N2' | 'N1';
  paragraphJp: string;
  pivotKeywords: string[];
  breakdown: {
    generalOpinion: string;
    concession: string;
    authorCoreStance: string;
  };
  translationVn: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    trapAnalysis: string;
  };
}

const INITIAL_STANCE_ITEMS: AuthorStanceItem[] = [
  {
    id: 'stance_1',
    theme: 'AI và Bản sắc Sáng tạo của Con người (AIと人間の創造性)',
    jlptTarget: 'N1',
    paragraphJp:
      '生成AIの急速な発展により、文章執筆や絵画制作といった知的労働の多くが機械に代替されるのではないかという懸念が強まっている。確かに、膨大なデータを学習したAIのアウトプットは驚異的な完成度を誇る。しかし、我々が見落としてはならないのは、表現の本質とは単なる巧みなデータ編集ではなく、自らの身体性を伴った痛みや歓喜の体験から紡ぎ出される切実な衝動にほかならないということである。AIがどれほど精緻な模倣を成し遂げようとも、そこに生きる実感が宿らない限り、真の創造とは言えないのではないだろうか。',
    pivotKeywords: ['確かに〜', 'しかし〜', '見落としてはならないのは〜', '〜にほかならない', '〜のではないだろうか'],
    breakdown: {
      generalOpinion: 'Nỗi lo sợ rằng AI tạo sinh sẽ thay thế hầu hết lao động trí tuệ như viết văn, vẽ tranh của con người.',
      concession: 'Thừa nhận khách quan: Dữ liệu lớn giúp sản phẩm đầu ra của AI đạt độ hoàn thiện đáng kinh ngạc (確かに...).',
      authorCoreStance: 'Bản chất của nghệ thuật và sáng tạo bắt nguồn từ sự thôi thúc da diết của trải nghiệm thể xác (nỗi đau, niềm vui sống), chứ không thể chỉ là sự lắp ghép dữ liệu vô hồn.',
    },
    translationVn:
      'Với sự phát triển vũ bão của AI tạo sinh, mối lo ngại rằng nhiều lao động trí tuệ như viết lách hay hội họa sẽ bị máy móc thay thế ngày càng gia tăng. Quả thực, sản phẩm của AI sau khi học lượng dữ liệu khổng lồ đạt độ hoàn hảo đáng kinh ngạc. Tuy nhiên, điều chúng ta không được phép bỏ qua là: Bản chất của biểu đạt không phải là việc biên tập dữ liệu khéo léo, mà chính là sự thôi thúc bức thiết được đúc kết từ trải nghiệm vui buồn thực tế bằng chính thân xác mình. Cho dù AI có mô phỏng tinh vi đến đâu, chừng nào ở đó không có cảm giác sống thực thụ thì không thể gọi là sáng tạo đích thực.',
    quiz: {
      question: '筆者がこの文章で最も主張したいことは何か。',
      options: [
        'AI技術の進化によって、人間の知的労働の大部分が失われることは避けられない。',
        'AIが生成した作品は完成度が高いため、人間の芸術作品と同等に評価すべきである。',
        '真の創造とは生身の体験と切実な衝動に基づくものであり、AIには代替できない。',
        'データ学習の精度を高めれば、いずれAIも人間と同じ感情を獲得できるはずだ。',
      ],
      correctIndex: 2,
      trapAnalysis:
        'Đáp án 1 và 2 là bẫy thừa nhận vế nhượng bộ dẫn nhập. Đáp án 4 suy diễn ngược lại kết luận của tác giả. Tác giả khẳng định cốt lõi ở câu cuối qua từ khóa "〜にほかならない" và "〜のではないだろうか".',
    },
  },
  {
    id: 'stance_2',
    theme: 'Văn hóa Tiêu dùng Tối giản và Hạnh phúc (ミニマリズムと幸福論)',
    jlptTarget: 'N2',
    paragraphJp:
      'モノを極限まで減らして暮らす「ミニマリズム」が若者を中心に支持を集めている。余計な所有物を手放すことで心が身軽になり、経済的・時間的な自由が得られるという主張には一理ある。だが、あらゆる所有を否定し、無機質な空間で暮らすこと自体が自己目的化してしまっては本末転倒ではないか。人間が何かを所有したいと願うのは、単なる物欲ではなく、愛着あるモノを通じて自己の歴史や記憶を確かめ合いたいという根源的な欲求に基づいていると考えるべきである。',
    pivotKeywords: ['一理ある', 'だが〜', '本末転倒ではないか', '〜べきである'],
    breakdown: {
      generalOpinion: 'Trào lưu sống tối giản vứt bỏ hết đồ đạc để đạt tự do và thảnh thơi tâm trí.',
      concession: 'Thừa nhận: Việc buông bỏ đồ đạc dư thừa quả thật có lý và mang lại sự nhẹ nhõm (一理ある).',
      authorCoreStance: 'Cảnh báo nguy cơ biến chủ nghĩa tối giản thành mục tiêu máy móc, vì việc sở hữu những món đồ gắn bó với ký ức là nhu cầu tự nhiên của con người để khẳng định bản thân.',
    },
    translationVn:
      'Lối sống "tối giản" cắt giảm tối đa đồ đạc đang nhận được sự ủng hộ rộng rãi từ giới trẻ. Lập luận cho rằng buông bỏ đồ dư thừa sẽ giúp tâm trí nhẹ nhõm, đạt được tự do về kinh tế và thời gian quả là có lý. Nhưng nếu phủ nhận mọi sự sở hữu và biến việc sống trong không gian trống trơn thành mục đích sống thì chẳng phải là đảo lộn gốc ngọn hay sao? Chúng ta cần nhận thức rằng, khao khát sở hữu đồ vật của con người không chỉ là ham muốn vật chất tầm thường, mà bắt nguồn từ nhu cầu căn bản muốn xác nhận ký ức và lịch sử của bản thân qua những món đồ thân thương.',
    quiz: {
      question: 'ミニマリズムに関する筆者の考えとして、最も適切なものはどれか。',
      options: [
        'モノを減らすことは無意味であり、できるだけ多くのモノを所有して生きるべきだ。',
        '極端なミニマリズムに陥るのではなく、愛着あるモノを持つ意味を見つめ直すべきだ。',
        '若者の経済的困窮がミニマリズムを生んだため、社会全体で消費を喚起すべきだ。',
        '時間と経済の自由を得るためには、過去の記憶にまつわるモノも全て捨てるべきだ。',
      ],
      correctIndex: 1,
      trapAnalysis:
        'Đáp án 1 quá cực đoan. Đáp án 3 và 4 không có trong bài. Tác giả chỉ trích xu hướng tối giản thái quá (本末転倒) và khuyên nên nhìn nhận đúng giá trị của đồ vật gắn bó (愛着あるモノ).',
    },
  },
];

const EXTRA_STANCE_ITEMS: AuthorStanceItem[] = [
  {
    id: 'stance_extra_1',
    theme: 'Sự Tiện lợi Số hóa và Khả năng Chịu đựng Thất bại (デジタル利便性と耐性)',
    jlptTarget: 'N1',
    paragraphJp:
      'スマートフォン一つであらゆる情報やサービスが瞬時に手に入る現代社会において、「タイパ（タイムパフォーマンス）」を追求する風潮が加速している。無駄な時間を省き、最短ルートで目的に到達することは一見すると極めて合理的である。しかし、我々の思考力や洞察力を深めるのは、むしろ試行錯誤の過程で経験する「回り道」や「空振り」にほかならない。失敗を排除した効率至上主義の果てに待っているのは、想定外の事態に直面した途端に立ち往生してしまう脆弱な人間像ではないだろうか。',
    pivotKeywords: ['一見すると〜', 'しかし〜', 'むしろ〜にほかならない', '〜ではないだろうか'],
    breakdown: {
      generalOpinion: 'Xu hướng chạy theo "hiệu suất thời gian (Taipa)", tìm đường tắt nhanh nhất bằng smartphone.',
      concession: 'Thừa nhận: Cắt giảm lãng phí thoạt nhìn rất hợp lý (一見すると極めて合理的).',
      authorCoreStance: 'Chính những "đường vòng", thất bại và thử sai mới giúp rèn luyện tư duy sâu sắc. Loại bỏ hoàn toàn thất bại sẽ tạo ra những con người mong manh dễ sụp đổ khi gặp biến cố.',
    },
    translationVn:
      'Trong xã hội hiện đại nơi smartphone giúp tiếp cận mọi thông tin trong tích tắc, trào lưu tối ưu hiệu suất thời gian đang tăng tốc. Tiết kiệm thời gian vô bổ để đến đích nhanh nhất thoạt nhìn rất hợp lý. Tuy nhiên, thứ giúp đào sâu năng lực tư duy của chúng ta lại chính là những "đường vòng" và thử sai vất vả. Đằng sau chủ nghĩa hiệu suất bài trừ thất bại, phải chăng sẽ chỉ là hình ảnh những con người yếu ớt, lập tức bế tắc ngay khi đối mặt với điều bất ngờ?',
    quiz: {
      question: '筆者がこの文章で言いたいこととして、最も合致するものはどれか。',
      options: [
        '効率性を極限まで高めることが、現代社会で生き残るための必須条件である。',
        '試行錯誤や無駄な経験こそが思考を深めるのであり、過度な効率主義は人間を脆くする。',
        'スマートフォンの普及によって、若者の読書量と学力が低下している。',
        '失敗を完全に防ぐアルゴリズムを構築することが、これからの教育に求められる。',
      ],
      correctIndex: 1,
      trapAnalysis:
        'Từ khóa vàng "むしろ〜にほかならない" (chính là... chứ không gì khác) chỉ thẳng vào vế "thử sai và đường vòng". Đáp án 1 trái ngược; đáp án 3 và 4 lạc đề.',
    },
  },
  {
    id: 'stance_extra_2',
    theme: 'Nghệ thuật Giao tiếp và Sự Thấu cảm Chậm (コミュニケーションと「沈黙」)',
    jlptTarget: 'N2',
    paragraphJp:
      'ビジネスの場では、淀みなく論理的に自己主張を展開できる人物が高く評価されがちである。沈黙は「意見がない証拠」あるいは「自信のなさ」と見なされ、忌避される傾向にある。しかし、他者との真の相互理解とは、矢継ぎ早な言葉の応酬によってではなく、相手の言葉の行間や沈黙の意味をじっくりと推し量る「待つ姿勢」の中にこそ生まれるのではないか。言葉を急ぎすぎるあまり、我々は他者の心の機微を聴き取る耳を失いつつあるように思えてならない。',
    pivotKeywords: ['〜がちである', 'しかし〜', '〜の中にこそ生まれるのではないか', '〜思えてならない'],
    breakdown: {
      generalOpinion: 'Công sở chuộng người nói năng lưu loát, coi im lặng là yếu kém.',
      concession: 'Thừa nhận thực tế xã hội đang kỳ thị sự im lặng (忌避される傾向にある).',
      authorCoreStance: 'Sự thấu hiểu đích thực nảy sinh từ sự kiên nhẫn lắng nghe khoảng lặng và ý tại ngôn ngoại, chứ không phải đấu khẩu bắn lời liên hồi.',
    },
    translationVn:
      'Trong thương trường, những người ăn nói hoạt bát logic thường được đánh giá rất cao. Sự im lặng bị coi là không có ý kiến hoặc thiếu tự tin. Tuy nhiên, sự thấu hiểu đích thực giữa người với người không sinh ra từ màn đáp trả dồn dập, mà nảy sinh chính từ "thái độ biết chờ đợi" để thấu cảm khoảng lặng của đối phương. Việc quá vội vàng tuôn lời dường như đang khiến chúng ta đánh mất đi đôi tai để lắng nghe sự tinh tế trong tâm hồn người khác.',
    quiz: {
      question: 'コミュニケーションにおける「沈黙」について、筆者はどのように考えているか。',
      options: [
        'ビジネスでは誤解を生む原因になるため、できる限り避けるべきである。',
        '自分の意見を論理的に組み立てるための時間として利用すべきである。',
        '相手の真意を深く汲み取り、真の相互理解を育むために不可欠な要素である。',
        '相手を威圧して交渉を有利に進めるための有効なテクニックである。',
      ],
      correctIndex: 2,
      trapAnalysis:
        'Cụm "〜の中にこそ生まれるのではないか" (chính trong... mới nảy sinh) nhấn mạnh giá trị của sự im lặng trong việc thấu cảm người khác.',
    },
  },
  {
    id: 'stance_extra_3',
    theme: 'Bảo tồn Thiên nhiên và Khái niệm "Rừng Cộng sinh" Satoyama (自然保護と里山)',
    jlptTarget: 'N1',
    paragraphJp:
      '自然保護というと、人間の手を一切加えずに原生林をありのままに残すことこそが最善であると信じられがちだ。しかし、日本の「里山」に代表される二次自然は、薪炭の採取や定期的な伐採といった人間の適度な干渉によってこそ、豊かな生物多様性が維持されてきた歴史を持つ。人間を自然の破壊者として一面的に断じるのではなく、自然の循環サイクルの一部として人間が賢明に関与する道を探ることこそが、真の共生への道筋にほかならない。',
    pivotKeywords: ['〜と信じられがちだ', 'しかし〜', '〜ことこそが', '〜にほかならない'],
    breakdown: {
      generalOpinion: 'Quan niệm thông thường: Bảo tồn thiên nhiên là không được can thiệp bàn tay con người.',
      concession: 'Thừa nhận đó là niềm tin phổ biến (信じられがちだ).',
      authorCoreStance: 'Mô hình Satoyama chứng minh: Sự can thiệp chừng mực khôn ngoan của con người mới duy trì đa dạng sinh học.',
    },
    translationVn:
      'Khi nói đến bảo tồn thiên nhiên, người ta thường lầm tưởng rằng việc không can thiệp gì và để mặc rừng nguyên sinh là tốt nhất. Thế nhưng, mô hình rừng bán nhân tạo Satoyama của Nhật Bản cho thấy chính sự tác động chừng mực của con người như khai thác củi gỗ định kỳ đã duy trì sự đa dạng sinh học trù phú. Thay vì phiến diện coi con người là kẻ phá hoại, việc tìm kiếm con đường để con người tham gia thông thái như một mắt xích tuần hoàn mới chính là lối đi thực chất tới sự cộng sinh.',
    quiz: {
      question: '自然保護に関する筆者の主張はどれか。',
      options: [
        '原生林の破壊を防ぐため、人間は自然環境への立ち入りを完全に禁じられるべきだ。',
        '人間が自然の循環に適切に関与し続けることが、真の自然共生につながる。',
        '経済発展を優先するためには、多少の森林伐採や環境破壊は容認されるべきである。',
        '里山の生態系は脆弱であるため、人工的な手入れをやめて原生林に戻すべきだ。',
      ],
      correctIndex: 1,
      trapAnalysis:
        'Đáp án 1 phản ánh suy nghĩ số đông bị tác giả bác bỏ ("〜と信じられがちだ"). Đáp án 2 chuẩn xác với kết luận "人間が賢明に関与する道を探ることこそが、真の共生への道筋にほかならない".',
    },
  },
  {
    id: 'stance_extra_4',
    theme: 'Độ chính xác của Khoa học và Khái niệm "Biết mình không biết" (科学と懐疑精神)',
    jlptTarget: 'N1',
    paragraphJp:
      '科学の役割とは、世の中のあらゆる謎に絶対的な正解を提供することだと一般には受け止められている。だが、科学史を紐解けば、かつての「定説」が新たな発見によって覆されてきた事例には事欠かない。科学の真髄とは、既知の知識にしがみつくことではなく、自らの無知を自覚し、常に疑い続ける謙虚な姿勢を保ち続けることにあると言わざるを得ない。',
    pivotKeywords: ['一般には〜と受け止められている', 'だが〜', '〜と言わざるを得ない'],
    breakdown: {
      generalOpinion: 'Số đông nghĩ khoa học là đưa ra câu trả lời chân lý tuyệt đối.',
      concession: 'Chỉ ra tính bất định: Các định thuyết cũ liên tục bị lật đổ.',
      authorCoreStance: 'Bản chất của khoa học là thái độ hoài nghi khiêm nhường, luôn tự biết mình chưa biết hết.',
    },
    translationVn:
      'Vai trò của khoa học thường được số đông mặc định là đưa ra lời giải tuyệt đối cho mọi bí ẩn. Nhưng lật lại lịch sử khoa học, những định thuyết xưa bị lật đổ bởi phát hiện mới là vô số kể. Phải nói rằng, cốt lõi của khoa học không phải là bám víu vào tri thức đã biết, mà nằm ở thái độ khiêm nhường luôn ý thức về sự vô tri của mình và không ngừng hoài nghi.',
    quiz: {
      question: '科学の本質について、筆者はどのように述べているか。',
      options: [
        'あらゆる事象に対して、揺るぎない絶対的な真理を確立すること。',
        '過去の定説を固く信じ、新しい学説に対して慎重な姿勢を崩さないこと。',
        '自らの無知を認め、常に真理を疑い検証し続ける謙虚さを持つこと。',
        '実用的な技術を開発し、人類の生活水準を向上させること。',
      ],
      correctIndex: 2,
      trapAnalysis:
        'Cụm "自らの無知を自覚し、常に疑い続ける謙虚な姿勢" được khẳng định bởi vế "〜と言わざるを得ない".',
    },
  },
  {
    id: 'stance_extra_5',
    theme: 'Ngôn ngữ và Tư duy Văn hóa (言語と認知構造)',
    jlptTarget: 'N2',
    paragraphJp:
      '外国語を学ぶ際、単語と文法を暗記すれば意思疎通は可能になると考えがちである。しかし、言語とは単なる記号の体系ではなく、その民族が長い歴史の中で培ってきた世界観や価値観の結晶である。外国語を真に理解するとは、単語の置き換えを行うことではなく、その言語が持つ特有の認識の枠組みを通して世界を新しく捉え直す体験にほかならないのである。',
    pivotKeywords: ['〜と考えがちである', 'しかし〜', '〜にほかならないのである'],
    breakdown: {
      generalOpinion: 'Học ngoại ngữ chỉ là học thuộc từ vựng và ngữ pháp.',
      concession: 'Thừa nhận nhiều người học mắc phải ngộ nhận này.',
      authorCoreStance: 'Học một ngoại ngữ thực chất là trải nghiệm học cách nhìn nhận thế giới qua một hệ quy chiếu tư duy mới.',
    },
    translationVn:
      'Khi học ngoại ngữ, chúng ta dễ nghĩ rằng chỉ cần thuộc từ và ngữ pháp là giao tiếp được. Thế nhưng, ngôn ngữ không đơn thuần là hệ thống ký hiệu, mà là kết tinh thế giới quan và hệ giá trị được dân tộc ấy vun đắp qua lịch sử. Thấu hiểu một ngoại ngữ thực chất không phải là dịch đổi từ, mà chính là trải nghiệm nhìn nhận lại thế giới qua một lăng kính tư duy hoàn toàn mới.',
    quiz: {
      question: '外国語の習得について、筆者が強調している点はどれか。',
      options: [
        '母国語の語彙を素早く外国語の単語に置き換える瞬発力を鍛えること。',
        '文法規則の正確さを最優先し、誤りのない文章を作成すること。',
        'その言語の背景にある固有の世界観を通じて、世界を捉え直すこと。',
        'できるだけ幼少期から学習を開始し、ネイティブの発音を身につけること。',
      ],
      correctIndex: 2,
      trapAnalysis:
        'Cụm chốt bài: "その言語が持つ特有の認識の枠組みを通して世界を新しく捉え直す体験にほかならない".',
    },
  },
];

interface Props {
  currentLevel: JLPTLevel;
}

export const AuthorStanceLab: React.FC<Props> = ({ currentLevel }) => {
  const [items, setItems] = useState<AuthorStanceItem[]>(INITIAL_STANCE_ITEMS);
  const [loadBatchCount, setLoadBatchCount] = useState<number>(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string>(INITIAL_STANCE_ITEMS[0].id);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleLoadMore = () => {
    const nextBatchNum = loadBatchCount + 1;
    const startIndex = ((nextBatchNum - 1) * 5) % EXTRA_STANCE_ITEMS.length;
    let batch = EXTRA_STANCE_ITEMS.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_STANCE_ITEMS.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextBatchNum}_${idx}`,
    }));

    setItems((prev) => [...prev, ...uniqueBatch]);
    setLoadBatchCount(nextBatchNum);
    setNotice(`Đã nạp thêm 5 đoạn văn bóc tách ý tác giả đợt ${nextBatchNum}! (Tổng hiện có: ${items.length + uniqueBatch.length} bài)`);
    speechService.playSuccessSound();
    setTimeout(() => setNotice(null), 4000);
  };

  const currentItem = items.find((it) => it.id === selectedItemId) || items[0];

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-10">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#071324] via-[#09101d] to-[#050912] border border-cyan-600/30 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="text-cyan-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                Phân Hệ 2 (PH2) · Đọc Hiểu & Luyện Đề JLPT
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-jp">筆者の主張・真意解読ラボ</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400 font-semibold">Khắc tinh câu hỏi "Tác giả muốn nói gì nhất?"</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Phòng Giải Mã Tác Giả & Ngầm Ý Khẳng Định{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent">
                (Author Stance & Implied Intent Lab)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Giải quyết dạng bài khó và nhiều điểm nhất trong đề thi JLPT N2-N1: Bóc tách cấu trúc 3 tầng: "Ý kiến số đông (〜がち)" ➔ "Vế nhượng bộ (確かに〜)" ➔ "Quan điểm lõi của tác giả (しかし〜にほかならない / のではないだろうか)".
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-xl border border-dashed border-cyan-500/60 bg-cyan-950/30 hover:bg-cyan-950/60 text-cyan-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-cyan-400"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>+5 Tải thêm bài bóc tách ý tác giả</span>
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
        {items.map((item, idx) => {
          const isSelected = item.id === selectedItemId;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedItemId(item.id);
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
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-cyan-300">
                  {item.jlptTarget}
                </span>
                <span className="truncate max-w-[160px]">Bài #{idx + 1}: {item.theme.split('(')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Reading & Deconstruction Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Paragraph & 3-Tier Stance Deconstruction */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40 font-bold uppercase">
                  {currentItem.jlptTarget} Đọc Hiểu Luận Thuyết
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-1">{currentItem.theme}</h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {showTranslation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showTranslation ? 'Ẩn dịch' : 'Hiện dịch'}</span>
                </button>

                <button
                  onClick={() => speechService.speak(currentItem.paragraphJp, 0.95)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 cursor-pointer"
                  title="Nghe giọng đọc"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Paragraph Text with Highlighted Markers */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm sm:text-base font-jp text-slate-100 leading-relaxed space-y-2">
              <p>{currentItem.paragraphJp}</p>
            </div>

            {/* Translation (Collapsible) */}
            {showTranslation && (
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed animate-fadeIn">
                <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">BẢN DỊCH ĐỐI CHIẾU TIẾNG VIỆT:</span>
                {currentItem.translationVn}
              </div>
            )}

            {/* Pivot Keywords Badge Row */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                Từ Khóa Bẻ Lái & Định Vị Ý Tác Giả (Pivot Cues):
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {currentItem.pivotKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="text-xs font-jp font-bold bg-cyan-950/70 border border-cyan-800/40 text-cyan-300 px-2.5 py-1 rounded-lg"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* 3-Tier Structural Deconstruction */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wide">
                <span>Giải Phẫu 3 Tầng Luận Điểm Của Đoạn Văn:</span>
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="text-cyan-400 hover:underline text-[11px] font-normal cursor-pointer"
                >
                  {showBreakdown ? 'Thu gọn' : 'Mở rộng'}
                </button>
              </div>

              {showBreakdown && (
                <div className="space-y-2 text-xs">
                  {/* Tier 1: General Opinion */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                      Tầng 1: Quan điểm số đông / Hiện trạng dẫn nhập (一般論)
                    </span>
                    <p className="text-slate-300">{currentItem.breakdown.generalOpinion}</p>
                  </div>

                  {/* Tier 2: Concession */}
                  <div className="bg-amber-950/20 p-3 rounded-xl border border-amber-800/30 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                      Tầng 2: Vế nhượng bộ thừa nhận (譲歩: 確かに〜)
                    </span>
                    <p className="text-slate-200">{currentItem.breakdown.concession}</p>
                  </div>

                  {/* Tier 3: Core Stance */}
                  <div className="bg-cyan-950/30 p-3.5 rounded-xl border border-cyan-700/50 space-y-1 shadow-md">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <Target className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono uppercase tracking-wide">
                        Tầng 3: Quan điểm khẳng định cốt lõi của tác giả (筆者の主張)
                      </span>
                    </div>
                    <p className="text-white font-medium leading-relaxed">{currentItem.breakdown.authorCoreStance}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Stance Quiz Challenge */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1427] border border-cyan-700/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Trắc Nghiệm Bắt Ý Tác Giả
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">Điểm: {score}</span>
            </div>

            <p className="text-xs text-slate-300">
              Đọc đoạn văn và chọn đáp án phản ánh chính xác nhất chủ định tác giả muốn truyền đạt:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <p className="text-sm font-jp text-white font-bold">{currentItem.quiz.question}</p>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {currentItem.quiz.options.map((opt, oIdx) => {
                  const isChosen = userChoice === oIdx;
                  const isCorrect = oIdx === currentItem.quiz.correctIndex;

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

              {/* Result & Trap Analysis */}
              {showResult && (
                <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                  <div
                    className={`text-xs font-bold flex items-center gap-1.5 ${
                      userChoice === currentItem.quiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {userChoice === currentItem.quiz.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Bắt trúng ý tác giả! (+10 điểm)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Bị vướng bẫy luận điểm! Hãy đọc phân tích bên dưới:</span>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" />
                      Phân tích bẫy đề thi JEES:
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">{currentItem.quiz.trapAnalysis}</p>
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
