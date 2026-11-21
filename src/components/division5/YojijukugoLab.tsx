import React, { useState, useEffect } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import { historyService, HistoryItem } from '../../services/historyService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import {
  Sparkles,
  BookOpen,
  Volume2,
  RefreshCw,
  Search,
  CheckCircle2,
  HelpCircle,
  History,
  RotateCcw,
  Award,
  Layers,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export interface YojiItem {
  id: string;
  kanji: string;
  hiragana: string;
  sinoVietnamese: string;
  meaning: string;
  level: JLPTLevel;
  type: 'yojijukugo' | 'kotowaza';
  literalMeaning: string;
  originStory: string;
  contextUsage: string;
  exampleSentence: string;
  exampleReading: string;
  exampleMeaning: string;
  blankQuiz: {
    question: string;
    missingKanji: string;
    options: string[];
    explanation: string;
  };
}

const initialYojiList: YojiItem[] = [
  {
    id: 'yj_1',
    kanji: '一期一会',
    hiragana: 'いちごいちえ',
    sinoVietnamese: 'Nhất Kỳ Nhất Hội',
    meaning: 'Mỗi cuộc gặp gỡ trong đời chỉ xảy ra duy nhất một lần, hãy trân quý hết lòng.',
    level: 'N2',
    type: 'yojijukugo',
    literalMeaning: 'Một đời gặp một lần',
    originStory: 'Bắt nguồn từ trà đạo Sen no Rikyu, nhắc nhở người pha trà và khách mời rằng buổi gặp hôm nay là độc nhất vô nhị.',
    contextUsage: 'Dùng trong lời mở đầu hội nghị, chia tay đồng nghiệp, hoặc trân trọng khách hàng.',
    exampleSentence: 'お客様との出会いを「一期一会」と思い、真心を込めて接客しております。',
    exampleReading: 'おきゃくさまとのであいを「いちごいちえ」とおもい、まごころをこめてせっきゃくしております。',
    exampleMeaning: 'Tôi luôn coi cuộc gặp gỡ với quý khách là "nhất kỳ nhất hội" và phục vụ bằng cả tấm lòng chân thành.',
    blankQuiz: {
      question: '一期一□：Điền chữ Hán còn thiếu để hoàn thành thành ngữ mang nghĩa trân trọng từng cơ duyên gặp gỡ.',
      missingKanji: '会',
      options: ['会', '期', '生', '合'],
      explanation: '一期一会 (Nhất Kỳ Nhất Hội): Hội (会) mang nghĩa gặp gỡ.',
    },
  },
  {
    id: 'yj_2',
    kanji: '臨機応変',
    hiragana: 'りんきおうへん',
    sinoVietnamese: 'Lâm Cơ Ứng Biến',
    meaning: 'Tùy cơ ứng biến, linh hoạt thay đổi phương pháp thích nghi hoàn cảnh.',
    level: 'N1',
    type: 'yojijukugo',
    literalMeaning: 'Đối diện thời cơ thì ứng đối biến hóa',
    originStory: 'Xuất phát từ kinh điển nhà Phật, chỉ người thông tuệ biết tùy theo căn cơ đối tượng mà giảng pháp linh hoạt.',
    contextUsage: 'Lời khen ngợi nhân viên xử lý khủng hoảng khéo léo trong kinh doanh Nhật Bản.',
    exampleSentence: 'マニュアル通りにいかない突発的な事態にも、臨機応変に対応してください。',
    exampleReading: 'マニュアルどおりにいかないとっぱつてきなじたいにも、りんきおうへんにたいおうしてください。',
    exampleMeaning: 'Ngay cả khi gặp sự cố bất ngờ không có trong cẩm nang hướng dẫn, xin hãy tùy cơ ứng biến.',
    blankQuiz: {
      question: '臨機□変：Chữ Hán còn thiếu trong thành ngữ chỉ sự biến hóa linh hoạt là gì?',
      missingKanji: '応',
      options: ['応', '適', '合', '対'],
      explanation: '臨機応変 (Lâm Cơ Ứng Biến): Ứng (応) mang nghĩa phản ứng, đáp lại hoàn cảnh.',
    },
  },
  {
    id: 'yj_3',
    kanji: '以心伝心',
    hiragana: 'いしんでんしん',
    sinoVietnamese: 'Dĩ Tâm Truyền Tâm',
    meaning: 'Tâm đầu ý hợp, không cần nói ra lời nhưng hai bên vẫn thấu hiểu sâu sắc.',
    level: 'N2',
    type: 'yojijukugo',
    literalMeaning: 'Lấy tâm truyền tâm',
    originStory: 'Xuất phát từ Phật giáo Thiền tông, chân lý giác ngộ truyền thẳng từ tâm sư phụ đến tâm học trò mà không qua văn tự.',
    contextUsage: 'Nói về sự ăn ý tuyệt đối giữa đồng nghiệp lâu năm hoặc bạn bè tri kỷ.',
    exampleSentence: '長年一緒に仕事をしている先輩とは、以心伝心で指示が分かります。',
    exampleReading: 'ながねんいっしょにしごとをしているせんぱいとは、いしんでんしんでしじがわかります。',
    exampleMeaning: 'Với tiền bối đã cùng làm việc nhiều năm, tôi có thể hiểu ngay chỉ thị nhờ sự thấu hiểu tâm đầu ý hợp.',
    blankQuiz: {
      question: '以心□心：Điền chữ Hán còn thiếu.',
      missingKanji: '伝',
      options: ['伝', '通', '知', '達'],
      explanation: '以心伝心: Truyền (伝) có nghĩa là truyền đạt, trao gửi tâm ý.',
    },
  },
  {
    id: 'yj_4',
    kanji: '日進月歩',
    hiragana: 'にっしんげっぽ',
    sinoVietnamese: 'Nhật Tiến Nguyệt Bộ',
    meaning: 'Tiến bộ từng ngày từng tháng, phát triển không ngừng với tốc độ chóng mặt.',
    level: 'N2',
    type: 'yojijukugo',
    literalMeaning: 'Ngày nào cũng tiến, tháng nào cũng sải bước',
    originStory: 'Miêu tả sự tiến bộ vượt bậc liên tục của tri thức và khoa học kỹ thuật hiện đại.',
    contextUsage: 'Chủ đề quen thuộc trong bài đọc hiểu Dokkai JLPT N2/N1 về công nghệ AI, bán dẫn, y học.',
    exampleSentence: '現代の人工知能技術は日進月歩の勢いで進化を遂げている。',
    exampleReading: 'げんだいのじんこうちのうぎじゅつはにっしんげっぽのいきおいでしんかをとげている。',
    exampleMeaning: 'Công nghệ trí tuệ nhân tạo hiện nay đang tiến hóa với tốc độ phát triển từng ngày từng tháng.',
    blankQuiz: {
      question: '日進□歩：Chữ Hán còn thiếu chỉ sự tiến bộ theo tháng là gì?',
      missingKanji: '月',
      options: ['月', '年', '週', '夜'],
      explanation: '日進月歩: Ngày tiến (日進), tháng bước (月歩) thể hiện sự đổi mới liên tục.',
    },
  },
  {
    id: 'yj_5',
    kanji: '七転び八起き',
    hiragana: 'ななころびやおき',
    sinoVietnamese: 'Thất Chuyển Bát Khởi',
    meaning: 'Dù ngã 7 lần cũng đứng dậy 8 lần; tinh thần bất khuất kiên trì không bao giờ nản lòng.',
    level: 'N3',
    type: 'kotowaza',
    literalMeaning: 'Bảy lần ngã, tám lần đứng dậy',
    originStory: 'Gắn liền với hình tượng lật đật Daruma của Nhật Bản, luôn tự bật dậy dù bị xô ngã theo bất kỳ hướng nào.',
    contextUsage: 'Động viên sĩ tử ôn thi JLPT hoặc người khởi nghiệp sau nhiều lần thất bại.',
    exampleSentence: '失敗を恐れず、七転び八起きの精神で何度でも挑戦し続けよう。',
    exampleReading: 'しっぱいをおそれず、ななころびやおきのせいしんでなんどでもちょうせんしつづけよう。',
    exampleMeaning: 'Đừng sợ thất bại, hãy cứ kiên trì thử thách với tinh thần ngã 7 lần đứng dậy 8 lần.',
    blankQuiz: {
      question: '七転び□起き：Con số nào tượng trưng cho lần đứng dậy kiên cường?',
      missingKanji: '八',
      options: ['八', '十', '九', '七'],
      explanation: '七転び八起き: Ngã 7 lần (七転び) thì đứng dậy 8 lần (八起き). Luôn nhiều hơn 1 lần để chiến thắng.',
    },
  },
];

export const YojijukugoLab: React.FC<{ currentLevel: JLPTLevel }> = ({ currentLevel }) => {
  const [list, setList] = useState<YojiItem[]>(initialYojiList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(() =>
    historyService.getHistory('yojijukugo')
  );

  const currentItem = list[currentIndex % list.length] || list[0];

  // Track viewed idiom in history
  useEffect(() => {
    if (currentItem) {
      const updated = historyService.addItem('yojijukugo', {
        id: currentItem.id,
        title: currentItem.kanji,
        subtitle: `${currentItem.sinoVietnamese} - ${currentItem.meaning.slice(0, 30)}...`,
        level: currentItem.level,
      });
      setHistoryItems(updated);
    }
  }, [currentItem?.id]);

  // Load More +5 Items
  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo thêm 5 Thành ngữ 4 chữ Hán (Yojijukugo) hoặc Quán ngữ (Kotowaza) tiếng Nhật trình độ ${currentLevel} hoặc N1/N2 có tính ứng dụng cao trong đề thi JLPT và môi trường công sở.
Định dạng JSON thuần là một mảng 5 phần tử YojiItem:
[
  {
    "id": "yj_${Date.now()}_1",
    "kanji": "chữ Hán thành ngữ (4 chữ hoặc quán ngữ)",
    "hiragana": "cách đọc hiragana",
    "sinoVietnamese": "Âm Hán Việt",
    "meaning": "Ý nghĩa tiếng Việt sâu sắc",
    "level": "${currentLevel}",
    "type": "yojijukugo",
    "literalMeaning": "Nghĩa đen từng chữ",
    "originStory": "Điển tích, gốc tích xuất xứ",
    "contextUsage": "Ngữ cảnh dùng trong thi JLPT và doanh nghiệp",
    "exampleSentence": "Câu ví dụ tiếng Nhật tự nhiên",
    "exampleReading": "Phiên âm hiragana câu ví dụ",
    "exampleMeaning": "Bản dịch câu ví dụ",
    "blankQuiz": {
      "question": "Câu hỏi trắc nghiệm điền chữ Hán còn khuyết",
      "missingKanji": "chữ đúng",
      "options": ["chữ 1", "chữ 2", "chữ 3", "chữ 4"],
      "explanation": "Giải thích chi tiết vì sao chọn chữ đó"
    }
  }
]
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = safeExtractJson<YojiItem[] | null>(res, null);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.filter((it) => it && it.kanji).slice(0, 5);
        if (valid5.length > 0) {
          setList((prev) => [...valid5, ...prev]);
          setCurrentIndex(0);
          speechService.playSuccessSound();
          return;
        }
      }
      throw new Error('Dùng 5 thành ngữ fallback chất lượng cao');
    } catch {
      // 5 Curated High-Yield Fallbacks
      const fallbackYojis: YojiItem[] = [
        {
          id: `yj_fall_${Date.now()}_1`,
          kanji: '自画自賛',
          hiragana: 'じがじさん',
          sinoVietnamese: 'Tự Họa Tự Tán',
          meaning: 'Tự mình vẽ tranh rồi tự khen tranh mình đẹp; mang nghĩa tự khen mình, tự mãn.',
          level: 'N2',
          type: 'yojijukugo',
          literalMeaning: 'Tự vẽ rồi tự đề thơ khen ngợi',
          originStory: 'Họa sĩ tự vẽ tranh rồi tự viết lời tán dương thay vì nhờ học giả khác phê bình.',
          contextUsage: 'Cảnh báo thái độ kiêu ngạo trong kinh doanh và bài đọc Dokkai.',
          exampleSentence: '自画自賛ばかりしていると、周囲からの信頼を失いかねない。',
          exampleReading: 'じがじさんばかりしていると、しゅういからのしんらいをうしないかねない。',
          exampleMeaning: 'Nếu cứ mải mê tự khen mình, rất có thể bạn sẽ đánh mất sự tín nhiệm từ mọi người xung quanh.',
          blankQuiz: {
            question: '自画自□：Điền chữ Hán còn thiếu chỉ sự tự tán dương.',
            missingKanji: '賛',
            options: ['賛', '褒', '美', '称'],
            explanation: '自画自賛: Tán (賛) mang nghĩa khen ngợi, tán thưởng.',
          },
        },
        {
          id: `yj_fall_${Date.now()}_2`,
          kanji: '三日坊主',
          hiragana: 'みっかぼうず',
          sinoVietnamese: 'Tam Nhật Phường Chủ',
          meaning: 'Cả thèm chóng chán, làm việc gì cũng chỉ được dăm ba ngày rồi bỏ cuộc.',
          level: 'N3',
          type: 'kotowaza',
          literalMeaning: 'Làm hòa thượng được ba ngày',
          originStory: 'Người xuất gia đi tu nhưng không chịu nổi giới luật thanh tịnh nên chỉ được ba ngày thì hoàn tục.',
          contextUsage: 'Nói về thói quen học ngoại ngữ hoặc tập thể dục không kiên trì.',
          exampleSentence: '毎朝の日本語学習を三日坊主で終わらせないよう、毎日5分だけでも続けよう。',
          exampleReading: 'まいあさのにほんごがくしゅうをみっかぼうずでおわらせないよう、まいにちごふんだけでもつづけよう。',
          exampleMeaning: 'Để việc học tiếng Nhật mỗi sáng không thành "ba ngày bỏ cuộc", hãy duy trì đều đặn dù chỉ 5 phút mỗi ngày.',
          blankQuiz: {
            question: '三日□主：Điền chữ Hán chỉ người đi tu bỏ dở.',
            missingKanji: '坊',
            options: ['坊', '寺', '僧', '僧'],
            explanation: '三日坊主: Phường chủ (坊主) chỉ chú tiểu, hòa thượng.',
          },
        },
        {
          id: `yj_fall_${Date.now()}_3`,
          kanji: '起死回生',
          hiragana: 'きしかいせい',
          sinoVietnamese: 'Khởi Tử Hồi Sinh',
          meaning: 'Từ cõi chết sống lại; xoay chuyển tình thế nguy cấp thành thắng lợi ngoạn mục.',
          level: 'N1',
          type: 'yojijukugo',
          literalMeaning: 'Dậy từ cõi chết, quay về cuộc sống',
          originStory: 'Chỉ bài thuốc thần y cứu người bệnh thập tử nhất sinh tỉnh lại.',
          contextUsage: 'Dùng trong chiến lược vực dậy doanh nghiệp bên bờ vực phá sản.',
          exampleSentence: '新商品の大ヒットにより、経営陣は起死回生の一手を打つことに成功した。',
          exampleReading: 'しんしょうひんのだいヒットにより、けいえいじんはきしかいせいのいってをうつことにせいこうした。',
          exampleMeaning: 'Nhờ sản phẩm mới bùng nổ doanh số, ban lãnh đạo đã thành công tung ra nước cờ khởi tử hồi sinh.',
          blankQuiz: {
            question: '起□回生：Chữ Hán chỉ cõi chết trong thành ngữ này là gì?',
            missingKanji: '死',
            options: ['死', '危', '敗', '命'],
            explanation: '起死回生: Tử (死) đối với Sinh (生).',
          },
        },
        {
          id: `yj_fall_${Date.now()}_4`,
          kanji: '猿も木から落ちる',
          hiragana: 'さるもきからおちる',
          sinoVietnamese: 'Viên Dã Tùng Mộc Lạc',
          meaning: 'Nhân vô thập toàn; ngay cả chuyên gia lành nghề nhất đôi khi cũng phạm sai sót.',
          level: 'N3',
          type: 'kotowaza',
          literalMeaning: 'Khỉ cũng có lúc ngã khỏi cây',
          originStory: 'Khỉ vốn là bậc thầy leo trèo nhưng vẫn có khi sơ ý trượt chân rơi xuống đất.',
          contextUsage: 'An ủi đồng nghiệp kỳ cựu hoặc sếp lớn khi vô tình mắc một lỗi sơ đẳng.',
          exampleSentence: 'ベテランのエンジニアでも「猿も木から落ちる」ことがある。二重チェックを怠るな。',
          exampleReading: 'ベテランのエンジニアでも「さるもきからおちる」ことがある。にじゅうチェックをおこたるな。',
          exampleMeaning: 'Ngay cả kỹ sư kỳ cựu cũng có lúc "khỉ ngã khỏi cây". Đừng bao giờ lơ là khâu kiểm tra kép.',
          blankQuiz: {
            question: '□も木から落ちる：Loài động vật leo trèo bậc thầy được nhắc đến là gì?',
            missingKanji: '猿',
            options: ['猿', '鳥', '猫', 'リス'],
            explanation: '猿も木から落ちる: Khỉ (猿 - さる).',
          },
        },
        {
          id: `yj_fall_${Date.now()}_5`,
          kanji: '切磋琢磨',
          hiragana: 'せっさたくま',
          sinoVietnamese: 'Thiết Tha Trác Ma',
          meaning: 'Cùng nhau mài giũa tài năng và nhân cách, ganh đua lành mạnh để cùng tiến bộ.',
          level: 'N1',
          type: 'yojijukugo',
          literalMeaning: 'Cắt sừng, giũa ngà, đục ngọc, mài đá',
          originStory: 'Xuất phát từ Kinh Thi cổ điển, ví việc rèn luyện đạo đức như người thợ kim hoàn tỉ mỉ mài giũa viên ngọc thô.',
          contextUsage: 'Nói về tình bạn đẹp hoặc tinh thần đồng đội trong công ty.',
          exampleSentence: '優秀な仲間と切磋琢磨することで、技術力を飛躍的に高めることができた。',
          exampleReading: 'ゆうしゅうななかまとせっさたくますることで、ぎじゅつりょくをひやくてきにたかめることができた。',
          exampleMeaning: 'Nhờ cùng mài giũa ganh đua với các đồng nghiệp xuất sắc, tôi đã nâng cao vượt bậc năng lực kỹ thuật.',
          blankQuiz: {
            question: '切磋□磨：Chữ Hán còn thiếu chỉ hành động đục đẽo ngọc đá?',
            missingKanji: '琢',
            options: ['琢', '磨', '研', '削'],
            explanation: '切磋琢磨: Trác (琢 - đục giũa ngọc quý).',
          },
        },
      ];

      setList((prev) => [...fallbackYojis, ...prev]);
      setCurrentIndex(0);
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  const filteredList = list.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.kanji.includes(q) ||
      item.hiragana.includes(q) ||
      item.sinoVietnamese.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <span className="font-display">Ngân Hàng Thành Ngữ 4 Chữ Hán & Quán Ngữ</span>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                Yojijukugo 四字熟語 · Kotowaza 諺
              </span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Chìa khóa bứt phá điểm số Dokkai N2/N1 & Giao tiếp tinh tế với người bản xứ. Tích hợp audio chuẩn giọng Tokyo & Trắc nghiệm điền khuyết chữ Hán.
          </p>
        </div>

        {/* Load More +5 Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải thêm 5 thành ngữ/quán ngữ mới mỗi lần bấm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải nạp thêm (+5 Thành ngữ)</span>
          </button>
        </div>
      </div>

      {/* Viewed History Ribbon */}
      {historyItems.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 text-amber-400 shrink-0 font-semibold">
            <History className="w-3.5 h-3.5" />
            <span>Đã xem ({historyItems.length}):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-0.5">
            {historyItems.slice(0, 12).map((h) => {
              const idx = list.findIndex((it) => it.id === h.id);
              return (
                <button
                  key={h.id}
                  onClick={() => {
                    if (idx >= 0) {
                      setCurrentIndex(idx);
                      setSelectedAnswer(null);
                      speechService.playSuccessSound();
                    }
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition-all shrink-0 ${
                    currentItem.id === h.id
                      ? 'bg-amber-600 border-amber-400 text-white font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                  title={h.subtitle}
                >
                  <span className="font-jp font-bold text-amber-200">{h.title}</span>
                  {h.level && <span className="text-[9px] text-slate-400">[{h.level}]</span>}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              historyService.clearHistory('yojijukugo');
              setHistoryItems([]);
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 ml-auto shrink-0 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800"
            title="Xóa lịch sử thành ngữ"
          >
            Xóa
          </button>
        </div>
      )}

      {/* Tabs & Search Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'card' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Thẻ Học Điển Tích</span>
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'grid' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Bảng Tra Cứu ({filteredList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'quiz' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Trắc Nghiệm Điền Chữ</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm thành ngữ, âm Hán Việt, ý nghĩa..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* TAB 1: INTERACTIVE CARD & STORY */}
      {activeTab === 'card' && currentItem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Card */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {currentItem.level}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 uppercase">
                    {currentItem.type === 'yojijukugo' ? 'Thành ngữ 4 chữ' : 'Quán ngữ Kotowaza'}
                  </span>
                </div>
                <div className="text-sm text-slate-400 font-jp">{currentItem.hiragana}</div>
                <div className="text-3xl md:text-4xl font-bold font-jp text-slate-100 tracking-wider">
                  {currentItem.kanji}
                </div>
                <div className="text-sm font-semibold text-amber-400">
                  {currentItem.sinoVietnamese}
                </div>
              </div>

              <button
                onClick={() => speechService.speak(currentItem.kanji)}
                className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all cursor-pointer shadow-md shrink-0"
                title="Nghe phát âm chuẩn"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Meaning & Literal Meaning */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Ý nghĩa cốt lõi:
              </div>
              <div className="text-sm text-slate-200 font-medium leading-relaxed">
                {currentItem.meaning}
              </div>
              <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                <span className="text-slate-500">Nghĩa đen: </span>
                <span className="italic">{currentItem.literalMeaning}</span>
              </div>
            </div>

            {/* Origin & Story */}
            <div className="bg-gradient-to-r from-amber-950/30 via-slate-950 to-slate-950 border border-amber-900/40 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Điển tích & Xuất xứ:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentItem.originStory}
              </p>
              <div className="text-xs text-indigo-300 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/40 mt-2">
                <span className="font-semibold">Ứng dụng thực tiễn: </span>
                {currentItem.contextUsage}
              </div>
            </div>

            {/* Example sentence */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Ví dụ thực tế trong câu văn:
                </span>
                <button
                  onClick={() => speechService.speak(currentItem.exampleSentence)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu</span>
                </button>
              </div>
              <div className="text-sm font-jp text-slate-100 font-medium leading-relaxed">
                {currentItem.exampleSentence}
              </div>
              <div className="text-xs font-jp text-slate-400">
                {currentItem.exampleReading}
              </div>
              <div className="text-xs text-slate-300 italic pt-1 border-t border-slate-800/80">
                {currentItem.exampleMeaning}
              </div>
            </div>

            {/* Navigation Strip */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
                  setSelectedAnswer(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
              >
                ← Thành ngữ trước
              </button>
              <span className="text-xs text-slate-400 font-mono">
                {((currentIndex % list.length) + 1)} / {list.length}
              </span>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev + 1) % list.length);
                  setSelectedAnswer(null);
                }}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Thành ngữ tiếp theo →
              </button>
            </div>
          </div>

          {/* Side Mini Quick-Selector */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Danh mục nhanh ({filteredList.length})</span>
                <span className="text-[10px] text-amber-400 font-mono">Bấm để xem</span>
              </div>
              <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredList.map((item, idx) => {
                  const isCurrent = item.id === currentItem.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        const originalIdx = list.findIndex((it) => it.id === item.id);
                        if (originalIdx >= 0) setCurrentIndex(originalIdx);
                        setSelectedAnswer(null);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        isCurrent
                          ? 'bg-amber-950/40 border-amber-600/70 text-white'
                          : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-jp font-bold flex items-center gap-2">
                          <span>{item.kanji}</span>
                          <span className="text-[10px] font-normal text-amber-300/80 font-sans">
                            {item.sinoVietnamese}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {item.meaning}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">[{item.level}]</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GRID OVERVIEW */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((item, idx) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-amber-600/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {item.level}
                  </span>
                  <button
                    onClick={() => speechService.speak(item.kanji)}
                    className="p-1.5 text-slate-400 hover:text-amber-300 rounded cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-2xl font-bold font-jp text-slate-100">{item.kanji}</div>
                <div className="text-xs text-amber-400 font-semibold">{item.sinoVietnamese}</div>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{item.meaning}</p>
              </div>

              <button
                onClick={() => {
                  const originalIdx = list.findIndex((it) => it.id === item.id);
                  if (originalIdx >= 0) setCurrentIndex(originalIdx);
                  setActiveTab('card');
                }}
                className="w-full mt-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-amber-300 hover:border-amber-600/50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
              >
                <span>Học chi tiết & điển tích</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: FILL IN THE BLANK QUIZ */}
      {activeTab === 'quiz' && currentItem && (
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Award className="w-4 h-4" />
              <span>Thử Thách Điền Chữ Hán Khuyết Vào Thành Ngữ</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Câu {((currentIndex % list.length) + 1)} / {list.length}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 text-center">
            <div className="text-xs text-slate-400 font-medium">Bổ sung chữ Hán thích hợp vào vị trí □:</div>
            <div className="text-2xl md:text-3xl font-bold font-jp text-amber-300 tracking-wider">
              {currentItem.blankQuiz.question}
            </div>
            <div className="text-xs text-slate-400">{currentItem.meaning}</div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {currentItem.blankQuiz.options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === currentItem.blankQuiz.missingKanji;
              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

              if (selectedAnswer !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => {
                    if (selectedAnswer === null) {
                      setSelectedAnswer(opt);
                      if (opt === currentItem.blankQuiz.missingKanji) {
                        speechService.playSuccessSound();
                        setQuizScore((prev) => prev + 10);
                      } else {
                        speechService.playErrorSound();
                      }
                    }
                  }}
                  disabled={selectedAnswer !== null}
                  className={`p-4 rounded-xl border text-xl font-jp font-bold transition-all cursor-pointer ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation when answered */}
          {selectedAnswer !== null && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 animate-fadeIn">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Đáp án: {currentItem.blankQuiz.missingKanji} → {currentItem.kanji}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentItem.blankQuiz.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedAnswer(null);
                    setCurrentIndex((prev) => (prev + 1) % list.length);
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Luyện câu tiếp theo →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
