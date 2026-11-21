import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { NuanceParticleMatrixItem } from '../../types/learnerBoostExtended';
import { initialNuanceParticleList, extraNuanceParticleList } from '../../data/learnerBoostDatabasePart2';
import { speechService } from '../../services/speechService';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  RotateCcw,
  Plus,
  Search,
  HelpCircle,
  Info,
  Lightbulb,
  Layers,
  ArrowRightLeft,
  Compass,
  Check,
  Award,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

// Additional high-yield particle contrasting pairs for continuous +5 loading batches
const additionalParticleBatches: NuanceParticleMatrixItem[][] = [
  extraNuanceParticleList,
  [
    {
      id: 'np_batch2_1',
      particlePair: '「によって」 (Tùy theo / Do bởi nguyên nhân) vs 「によると / によれば」 (Theo nguồn tin trích dẫn)',
      coreDistinction: '「によって」 chỉ nguyên nhân, phương tiện hoặc tính biến thiên («Tùy theo mỗi người mà khác nhau»). 「によると / によれば」 BẮT BUỘC dùng để trích dẫn nguồn tin và vế sau thường kết thúc bằng 「〜そうだ / 〜ということだ / 〜らしい」.',
      linguisticExplanation: 'Bản chất của によると bắt nguồn từ động từ 拠る (dựa trên căn cứ tin tức). Nếu vế sau không phải thể truyền đạt hoặc trích dẫn mà là mệnh lệnh/hành động thì việc dùng によると là sai ngữ pháp tuyệt đối.',
      contrastingPairs: {
        sentenceA: '人によって考え方が大きく異なる。',
        readingA: 'ひとによって かんがえかたが おおきく ことなる。',
        meaningA: 'Tùy vào mỗi người mà cách suy nghĩ khác biệt rất lớn.',
        nuanceA: 'Biểu thị sự khác biệt tương ứng theo từng đối tượng.',
        sentenceB: '天気予報によると、明日は午後から大雨になるそうだ。',
        readingB: 'てんきよほうによると、あしたは ごごから おおあめに なるそうだ。',
        meaningB: 'Theo như dự báo thời tiết thì chiều mai trời sẽ mưa to.',
        nuanceB: 'Trích dẫn nguồn tin kèm đuôi câu 〜そうだ.',
      },
      jlptTrapAdvice: 'Cứ thấy đuôi câu có 〜そうだ hoặc 〜とのことだ thì 90% chọn 「によると / によれば」, tránh nhầm sang 「によって」.',
      quiz: {
        question: 'Điền cấu trúc đúng: "新聞の報道_____、その事件の真相が判明したということだ。"',
        options: ['によると', 'によって', 'について', 'にとって'],
        correctIndex: 0,
        explanation: 'Đuôi câu có 「〜ということだ」 (nghe nói là...) là dấu hiệu nhận biết bắt buộc của 「によると / によれば」.',
      },
    },
    {
      id: 'np_batch2_2',
      particlePair: '「に際して」 (Thời điểm chuẩn bị tiến hành) vs 「にあたって」 (Trước thềm sự kiện trọng đại tích cực)',
      coreDistinction: 'Cả hai đều dịch là "Nhân dịp / Trước khi...". Nhưng 「にあたって」 mang thái độ tích cực, hướng đến tương lai và trang trọng hơn hẳn (khai mạc, cưới hỏi, thành lập). 「に際して」 trung tính hơn và có thể dùng cho cả cảnh báo pháp lý.',
      linguisticExplanation: 'Chữ Hán 際 (Tế - ranh giới thời khắc) mang tính chỉ mốc thời gian khách quan, trong khi 当 (Đương - đương đầu) chứa đựng ý chí chủ động chuẩn bị tâm thế vững vàng để đón nhận.',
      contrastingPairs: {
        sentenceA: '新会社設立にあたって、皆様のご支援に心より感謝申し上げます。',
        readingA: 'しんがいしゃ せつりつにあたって、みなさまの ごしえんに こころより かんしゃもうしあげます。',
        meaningA: 'Nhân dịp trước thềm thành lập công ty mới, tôi xin gửi lời cảm ơn chân thành tới sự hỗ trợ của quý vị.',
        nuanceA: 'Sự kiện trọng đại mang tính xây dựng, hân hoan đón chào.',
        sentenceB: '本契約の締結に際して、注意事項を再度ご確認ください。',
        readingB: 'ほんけいやくの ていけつにさいして、ちゅういじこうを さいど ごかくにんください。',
        meaningB: 'Trước khi ký kết hợp đồng này, xin hãy xác nhận lại các điều khoản lưu ý một lần nữa.',
        nuanceB: 'Quy trình thủ tục hành chính, nghiêm ngặt và trung tính.',
      },
      jlptTrapAdvice: 'Khi bối cảnh là việc tiêu cực (như phá sản, tai nạn), KHÔNG ĐƯỢC dùng 「にあたって」.',
      quiz: {
        question: 'Câu nào sau đây sử dụng 「にあたって」 chuẩn xác nhất theo văn phong Nhật Bản?',
        options: [
          '新工場の操業開始にあたって、安全祈願祭を執り行いました。',
          '倒産にあたって、借金を返済した。',
          '風邪を引いたにあたって、薬を飲んだ。',
          '電車が遅延したにあたって、走った。',
        ],
        correctIndex: 0,
        explanation: 'にあたって chỉ dùng cho các sự kiện trang trọng, hướng tới khởi đầu mới đầy hy vọng.',
      },
    },
    {
      id: 'np_batch2_3',
      particlePair: '「に対して」 (Hướng tới đối tượng / Trái ngược tương phản) vs 「にとって」 (Đứng trên lập trường quan điểm)',
      coreDistinction: '「に対して」 mô tả hành vi tác động hướng vào ai đó (thái độ ân cần, nghiêm khắc) hoặc so sánh tương phản A và B. 「にとって」 mô tả cách nhìn nhận đánh giá từ góc độ của một chủ thể («Đối với tôi, sức khỏe là số một»).',
      linguisticExplanation: 'Sau 「にとって」 luôn là tính từ chỉ giá trị, tầm quan trọng hoặc mức độ (大切だ, 必要だ, 難しい, 不可能だ). Sau 「に対して」 là hành động hướng ngoại hoặc cảm xúc nhắm vào đối tượng (親切にする, 怒る, 厳しい).',
      contrastingPairs: {
        sentenceA: 'お客様に対して、失礼な言葉遣いをしてはならない。',
        readingA: 'おきゃくさまにたいして、しつれいな ことばづかいをしてはならない。',
        meaningA: 'Đối với khách hàng, tuyệt đối không được ăn nói thất lễ.',
        nuanceA: 'Thái độ ứng xử hướng tới một đối tượng cụ thể.',
        sentenceB: '留学生にとって、漢字の習得は最大の難関の一つである。',
        readingB: 'りゅうがくせいにとって、かんじの しゅうとくは さいだいの なんかんの ひとつである。',
        meaningB: 'Đối với các du học sinh, việc lĩnh hội chữ Hán là một trong những chướng ngại vật lớn nhất.',
        nuanceB: 'Đánh giá giá trị hay mức độ khó khăn từ góc độ của du học sinh.',
      },
      jlptTrapAdvice: 'Đừng dịch nhầm cả 2 thành từ "đối với" chung chung trong tiếng Việt rồi chọn sai!',
      quiz: {
        question: 'Chọn cấu trúc thích hợp: "現代の若者_____、スマートフォンは手放せない生活必需品だ。"',
        options: ['にとって', 'に対して', 'について', 'によって'],
        correctIndex: 0,
        explanation: 'Câu thể hiện giá trị/quan điểm đánh giá ("là vật dụng thiết yếu") nên dùng にとって.',
      },
    },
    {
      id: 'np_batch2_4',
      particlePair: '「を通じて / を通して」 (Xuyên suốt thời kỳ / Thông qua trung gian) vs 「を経て」 (Kinh qua các giai đoạn/lịch sử)',
      coreDistinction: '「を通じて」 nhấn mạnh sự liên tục không ngắt quãng trong suốt một khoảng thời gian hoặc phương tiện làm cầu nối («thông qua bạn bè»). 「を経て」 nhấn mạnh việc trải qua các trạm dừng, gian nan thử thách hoặc thời gian dài biến động để đạt tới kết quả hiện tại.',
      linguisticExplanation: 'Chữ 経 (Kinh - kinh qua) gợi hình ảnh dòng sợi dệt qua nhiều khung cửi; đòi hỏi các mốc tiến trình rõ rệt (Trải qua 3 năm đàm phán, vượt qua ngàn trùng gian nan).',
      contrastingPairs: {
        sentenceA: '四季を通じて、この山は美しい自然を見せてくれる。',
        readingA: 'しきをつうじて、このやまは うつくしい しぜんを みせてくれる。',
        meaningA: 'Xuyên suốt bốn mùa quanh năm, ngọn núi này luôn phô diễn cảnh sắc thiên nhiên tuyệt mỹ.',
        nuanceA: 'Tính liên tục kéo dài suốt chu kỳ 4 mùa.',
        sentenceB: '数々の苦難を経て、ようやく事業を黒字化することに成功した。',
        readingB: 'かずかずの くなんをへて、ようやく じぎょうを くろじかすることに せいこうした。',
        meaningB: 'Kinh qua vô vàn khổ nạn gian truân, cuối cùng chúng tôi đã thành công đưa doanh nghiệp có lãi.',
        nuanceB: 'Trải qua chuỗi thử thách tiến trình gian khổ.',
      },
      jlptTrapAdvice: 'Khi nói về việc quá cảnh qua một thành phố: "シンガポールを経てパリへ行く" dùng を経て (ghé trạm trung chuyển).',
      quiz: {
        question: 'Điền từ ngữ chuẩn xác: "十年の歳月_____、ついに巨大な橋が完成した。"',
        options: ['を経て', 'を通じて', 'をめぐって', 'に際して'],
        correctIndex: 0,
        explanation: 'Trải qua một tiến trình thời gian dài để hoàn tất một công trình đồ sộ dùng を経て.',
      },
    },
    {
      id: 'np_batch2_5',
      particlePair: '「を契機に / を契機として」 (Lấy cớ / Biến cố tích cực tạo bước ngoặt) vs 「を皮切りに」 (Khởi đầu làn sóng liên tiếp)',
      coreDistinction: '「を契機に」 nói về một sự kiện trở thành cơ duyên hoặc bước ngoặt lịch sử mở ra thay đổi to lớn mang chiều hướng tốt đẹp. 「を皮切りに」 nói về việc một sự việc khởi đầu làm phát súng khai mạc, sau đó hàng loạt sự việc tương tự liên tiếp bùng nổ.',
      linguisticExplanation: '契機 (Khế cơ - cơ hội kết nối). 皮切り (Bì thiết - vết châm cứu đầu tiên trên da làm khởi đầu điều trị), sau phát súng đầu tiên thì các hoạt động cùng loại cứ thế ùa theo.',
      contrastingPairs: {
        sentenceA: '大病を患ったことを契機に、健康管理に真剣に取り組むようになった。',
        readingA: 'たいびょうを わずらったことを けいきに、けんこうかんりに しんけんに とりくむようになった。',
        meaningA: 'Lấy biến cố trận ốm thập tử nhất sinh làm bước ngoặt, tôi đã bắt đầu nghiêm túc quản lý sức khỏe.',
        nuanceA: 'Bước ngoặt làm thay đổi hẳn nhận thức và lối sống.',
        sentenceB: '東京公演を皮切りに、全国１０都市を巡る全国ツアーが幕を開けた。',
        readingB: 'とうきょうこうえんを かわきりに、ぜんこく じゅっとしを めぐる ぜんこくつあーが まくをあけた。',
        meaningB: 'Khởi đầu từ buổi biểu diễn ở Tokyo, chuyến lưu diễn qua 10 thành phố lớn trên toàn quốc đã chính thức mở màn.',
        nuanceB: 'Hành động đầu tiên mở màn cho một chuỗi các hoạt động y hệt tiếp diễn.',
      },
      jlptTrapAdvice: 'Nếu vế sau là chuỗi các buổi diễn, hội thảo cùng loại liên tiếp thì BẮT BUỘC chọn 「を皮切りに」.',
      quiz: {
        question: 'Khi một ca sĩ bắt đầu chuỗi lưu diễn: "大阪のライブ_____、アジア５カ国での公演が行われる", điền từ nào?',
        options: ['を皮切りに', 'を契機に', 'をめぐって', 'に際して'],
        correctIndex: 0,
        explanation: 'Sự kiện mở màn cho chuỗi hành động cùng loại diễn ra liên tiếp bắt buộc dùng を皮切りに.',
      },
    },
  ],
];

export const NuanceParticleMatrixLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<NuanceParticleMatrixItem[]>(initialNuanceParticleList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(true);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [batchCycle, setBatchCycle] = useState(0);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.particlePair.toLowerCase().includes(q) ||
      item.coreDistinction.toLowerCase().includes(q) ||
      item.linguisticExplanation.toLowerCase().includes(q) ||
      item.contrastingPairs.sentenceA.toLowerCase().includes(q) ||
      item.contrastingPairs.sentenceB.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handlePrevItem = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
    setSelectedQuizAnswer(null);
  };

  const handleNextItem = () => {
    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
    setSelectedQuizAnswer(null);
  };

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const batchPool = additionalParticleBatches[batchCycle % additionalParticleBatches.length];
      const nextBatch = batchPool.map((item, idx) => ({
        ...item,
        id: `${item.id}_cycle_${batchCycle}_${idx}_${Date.now()}`,
      }));
      setList((prev) => [...prev, ...nextBatch]);
      setBatchCycle((prev) => prev + 1);
      setIsLoadingMore(false);
    }, 180);
  };

  const handleSpeak = (text: string) => {
    speechService.speak(text);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-950/60 p-6 sm:p-8 border border-emerald-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
              <Compass className="w-3.5 h-3.5" />
              Linh Hồn Ngữ Pháp Tiếng Nhật & Ma Trận Trợ Từ
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              64. Bách Khoa Trợ Từ & Phân Tắc Tinh Tế (助詞の深層)
            </h2>
            <p className="text-sm sm:text-base text-emerald-200/80 max-w-2xl leading-relaxed">
              Phân biệt tận gốc rễ bản chất các cặp trợ từ bẫy kinh điển: 「は」 vs 「が」, 「に」 vs 「で」, 「を」 vs 「に」 di chuyển,
              「までに」 vs 「まで」, 「ばかり」 vs 「だけ」, 「もの」 vs 「こと」; xóa tan hoang mang khi làm bài thi JLPT.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-emerald-950/40 transition-all border border-emerald-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-emerald-900/60 border border-emerald-800/60 text-xs font-medium text-emerald-200">
              Tổng cặp đối chiếu: <span className="font-bold text-emerald-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-emerald-800/60">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-900/50 text-emerald-300 hover:text-white'
            }`}
          >
            Thẻ Đối Chiếu Trợ Từ (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-900/50 text-emerald-300 hover:text-white'
            }`}
          >
            Bảng Ma Trận So Sánh (Grid View)
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setSelectedQuizAnswer(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-900/50 text-emerald-300 hover:text-white'
            }`}
          >
            Trắc Nghiệm Bẫy Trợ Từ (Quiz Mode)
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo trợ từ は, が, に, で, を, について..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {activeTab === 'card' && (
          <div className="flex items-center gap-3 text-xs font-medium text-slate-400 self-end sm:self-auto">
            <span>
              Cặp {currentIndex + 1} / {filteredList.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevItem}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="Cặp trước"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Trước</span>
              </button>
              <button
                onClick={handleNextItem}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white transition-colors font-medium"
                title="Cặp kế tiếp"
              >
                <span className="hidden sm:inline">Kế tiếp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'card' && currentItem && (
        <div className="space-y-4">
          {/* Top Quick Stepper Bar */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl">
            <button
              onClick={handlePrevItem}
              className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>← Cặp trước</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-lg">
                Cặp {currentIndex + 1} / {filteredList.length}
              </span>
              <button
                onClick={handleLoadMoreFive}
                disabled={isLoadingMore}
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-300 hover:text-white px-2.5 py-1 rounded-lg bg-teal-950/60 border border-teal-800/60 hover:bg-teal-900 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+5 cặp</span>
              </button>
            </div>

            <button
              onClick={handleNextItem}
              className="inline-flex items-center gap-1 text-xs font-semibold text-white px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors"
            >
              <span>Cặp tiếp theo →</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Card (Col 8) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
                      Trợ từ phân tắc #{currentIndex + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                      {currentItem.particlePair}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-300 font-medium mt-2 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/30">
                  <span className="font-bold text-white">Điểm cốt lõi: </span>
                  {currentItem.coreDistinction}
                </p>

                {/* Contrasting Pairs Showcase */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  {/* Case A */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
                    <div className="text-xs font-bold text-emerald-400 flex items-center justify-between">
                      <span>Trường hợp A:</span>
                      <button
                        onClick={() => handleSpeak(currentItem.contrastingPairs.sentenceA)}
                        className="text-emerald-400 hover:text-emerald-300 p-1 rounded-md hover:bg-emerald-950"
                        title="Phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-base font-bold text-white">
                      {currentItem.contrastingPairs.sentenceA}
                    </div>
                    <div className="text-xs text-emerald-300/80 font-mono">
                      {currentItem.contrastingPairs.readingA}
                    </div>
                    <div className="text-xs text-slate-300 pt-1 border-t border-slate-800">
                      {currentItem.contrastingPairs.meaningA}
                    </div>
                    <div className="text-xs text-emerald-200/90 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/30">
                      💡 Sắc thái: {currentItem.contrastingPairs.nuanceA}
                    </div>
                  </div>

                  {/* Case B */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-teal-500/30 space-y-2">
                    <div className="text-xs font-bold text-teal-400 flex items-center justify-between">
                      <span>Trường hợp B:</span>
                      <button
                        onClick={() => handleSpeak(currentItem.contrastingPairs.sentenceB)}
                        className="text-teal-400 hover:text-teal-300 p-1 rounded-md hover:bg-teal-950"
                        title="Phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-base font-bold text-white">
                      {currentItem.contrastingPairs.sentenceB}
                    </div>
                    <div className="text-xs text-teal-300/80 font-mono">
                      {currentItem.contrastingPairs.readingB}
                    </div>
                    <div className="text-xs text-slate-300 pt-1 border-t border-slate-800">
                      {currentItem.contrastingPairs.meaningB}
                    </div>
                    <div className="text-xs text-teal-200/90 bg-teal-950/40 p-2 rounded-lg border border-teal-800/30">
                      💡 Sắc thái: {currentItem.contrastingPairs.nuanceB}
                    </div>
                  </div>
                </div>

                {/* JLPT Advice */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200/90">
                  <span className="font-bold text-amber-300 block mb-1">Mẹo nhận diện bẫy JLPT:</span>
                  {currentItem.jlptTrapAdvice}
                </div>

                {/* Toggle Deep Explanation */}
                <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    {showDeepExplanation ? 'Thu gọn mục giải thích chuyên sâu' : 'Xem mục giải thích chuyên sâu & Bản chất ngữ pháp'}
                  </button>
                </div>

                {/* Deep Explanation Panel */}
                {showDeepExplanation && (
                  <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                    <div className="p-5 rounded-xl bg-slate-950/90 border border-emerald-900/50 space-y-3">
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
                        <Info className="w-4 h-4" />
                        Mục Giải Thích Chuyên Sâu & Phân Tích Cơ Chế Ngôn Ngữ Học
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {currentItem.linguisticExplanation}
                      </p>

                      <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                          <span className="font-semibold text-emerald-400 block mb-1">🧠 Cơ chế tư duy người Nhật:</span>
                          Trợ từ trong tiếng Nhật hoạt động như "nhãn dán chức năng" (functional tagging) cho từng cụm từ trong câu, quyết định tiêu điểm tâm lý của người nói trước khi động từ vị ngữ xuất hiện.
                        </div>
                        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                          <span className="font-semibold text-amber-400 block mb-1">⚡ Bẫy dịch thuật người Việt:</span>
                          Không nên chỉ dịch sang một từ tiếng Việt đơn lẻ, mà phải xét động từ đi kèm mang tính tĩnh (kết quả/vị trí) hay động (hành vi diễn ra), và vế sau có phải phán đoán chủ quan hay khách quan.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Quiz & Stats Sidebar (Col 4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <HelpCircle className="w-4 h-4" />
                  Trắc nghiệm phản xạ trợ từ
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  {currentItem.quiz.question}
                </p>

                <div className="space-y-2 pt-2">
                  {currentItem.quiz.options.map((opt, oIdx) => {
                    const isSelected = selectedQuizAnswer === oIdx;
                    const isCorrect = oIdx === currentItem.quiz.correctIndex;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => setSelectedQuizAnswer(oIdx)}
                        className={`w-full text-left p-3 rounded-xl text-xs transition-all border ${
                          selectedQuizAnswer === null
                            ? 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800 text-slate-300'
                            : isCorrect
                            ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-semibold'
                            : isSelected
                            ? 'bg-rose-950/60 border-rose-500/80 text-rose-200'
                            : 'bg-slate-950/30 border-slate-800/40 text-slate-500'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-slate-400">{oIdx + 1}.</span>
                          <span className="flex-1 leading-snug">{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedQuizAnswer !== null && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed animate-fadeIn">
                    <div className="font-semibold text-emerald-400 mb-1">
                      {selectedQuizAnswer === currentItem.quiz.correctIndex ? 'Chính xác! 🎉' : 'Chưa đúng rồi!'}
                    </div>
                    {currentItem.quiz.explanation}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Dual Stepper Navigation Bar */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 px-5 py-3 rounded-xl mt-6">
            <button
              onClick={handlePrevItem}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 hover:text-white px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>← Cặp trước</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-4 py-1.5 rounded-lg">
                Cặp {currentIndex + 1} / {filteredList.length}
              </span>
              <button
                onClick={handleLoadMoreFive}
                disabled={isLoadingMore}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-300 hover:text-white px-3.5 py-1.5 rounded-lg bg-teal-950/60 border border-teal-800/60 hover:bg-teal-900 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>+5 cặp</span>
              </button>
            </div>

            <button
              onClick={handleNextItem}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-md"
            >
              <span>Cặp tiếp theo →</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Grid Tab */}
      {activeTab === 'grid' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
            {filteredList.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setActiveTab('card');
                }}
                className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-emerald-400 font-semibold">#{idx + 1}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    Đối chiếu
                  </span>
                </div>
                <div className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.particlePair}
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {item.coreDistinction}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Tải thêm 5 cặp trợ từ tiếp theo (+5)</span>
            </button>
          </div>
        </div>
      )}

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-emerald-400">
                Câu hỏi {currentIndex + 1} / {filteredList.length}
              </span>
              <span>{currentItem.particlePair}</span>
            </div>

            <div className="text-base sm:text-lg font-bold text-white">
              {currentItem.quiz.question}
            </div>

            <div className="space-y-3 pt-2">
              {currentItem.quiz.options.map((opt, oIdx) => {
                const isSelected = selectedQuizAnswer === oIdx;
                const isCorrect = oIdx === currentItem.quiz.correctIndex;
                return (
                  <button
                    key={oIdx}
                    onClick={() => setSelectedQuizAnswer(oIdx)}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                      selectedQuizAnswer === null
                        ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200'
                        : isCorrect
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-semibold'
                        : isSelected
                        ? 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-950/40 border-slate-800/40 text-slate-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-slate-400">{oIdx + 1}.</span>
                      <span className="flex-1">{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedQuizAnswer !== null && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2 animate-fadeIn">
                <div className="font-bold text-emerald-400 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  {selectedQuizAnswer === currentItem.quiz.correctIndex
                    ? 'Chính xác xuất sắc! 🎉'
                    : 'Chưa chính xác!'}
                </div>
                <p className="leading-relaxed">{currentItem.quiz.explanation}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={handlePrevItem}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
              >
                ← Mục trước
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoadMoreFive}
                  disabled={isLoadingMore}
                  className="px-3 py-1.5 rounded-lg bg-teal-950/70 border border-teal-800/60 text-xs text-teal-300 hover:text-white"
                >
                  +5 câu mới
                </button>
                <button
                  onClick={handleNextItem}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-semibold"
                >
                  Mục kế tiếp →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
