import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import {
  Volume2,
  Sparkles,
  BookOpen,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  ArrowRight,
  Zap,
  Lightbulb,
  Check,
  Flame,
} from 'lucide-react';

interface GrammarPattern {
  id: string;
  pattern: string;
  reading: string;
  level: 'N1' | 'N1+';
  register: 'Tu từ học thuật' | 'Văn kiện trang trọng' | 'Diễn văn nghị viện';
  meaning: string;
  formation: string;
  nuanceInsight: string;
  sampleSentences: {
    jp: string;
    vn: string;
  }[];
  quiz: {
    question: string;
    blankTarget: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const INITIAL_PATTERNS: GrammarPattern[] = [
  {
    id: 'pat_1',
    pattern: '〜をおいて〜ない',
    reading: '〜をおいて〜ない (o oite ... nai)',
    level: 'N1',
    register: 'Văn kiện trang trọng',
    meaning: 'Ngoài X ra thì tuyệt đối không có ai/thứ gì xứng đáng hơn (Khẳng định độc tôn duy nhất).',
    formation: 'Danh từ (N) ＋ をおいて（ほかに）＋ Khẳng định phủ định（〜ない）',
    nuanceInsight:
      'Dùng khi người nói đánh giá X là đối tượng hoàn hảo và duy nhất, không thể thay thế bởi bất kỳ ai khác. Rất thường gặp khi tiến cử nhân sự cấp cao hoặc ca ngợi tuyệt tác.',
    sampleSentences: [
      {
        jp: '次期総理大臣としてこの国家の難局を乗り越えられる人物は、彼をおいて他にはいない。',
        vn: 'Người có thể gánh vác cương vị Thủ tướng vượt qua cơn đại nạn quốc gia này, ngoài ông ấy ra tuyệt nhiên không còn ai khác.',
      },
      {
        jp: '日本酒の真髄を味わうなら、名水に恵まれたこの酒蔵をおいて語ることはできない。',
        vn: 'Nếu muốn thưởng thức trọn vẹn tinh hoa rượu Sake Nhật, ngoài hầm rượu vang danh nguồn nước này ra thì chẳng thể nói đến nơi nào khác.',
      },
    ],
    quiz: {
      question: 'この未曾有の危機において、全社員の結束を固められるリーダーは、社長（　　）他にはいない。',
      blankTarget: 'Điền cụm ngữ pháp chỉ sự lựa chọn duy nhất không thể thay thế.',
      options: ['をおいて', 'をかねて', 'を限りに', 'を皮切りに'],
      correctIndex: 0,
      explanation: 'Khẳng định người duy nhất độc tôn là N ＋ をおいて他にはいない.',
    },
  },
  {
    id: 'pat_2',
    pattern: '〜たるもの',
    reading: '〜たるもの (taru mono)',
    level: 'N1',
    register: 'Tu từ học thuật',
    meaning: 'Đã ở trên cương vị / tư cách là X thì đương nhiên phải hành xử xứng đáng.',
    formation: 'Danh từ chỉ chức vụ, cương vị, thân phận (N) ＋ たるもの',
    nuanceInsight:
      'Vế sau luôn là những điều răn dạy mang tính nghĩa vụ, đạo đức cao quý: 〜べきだ, 〜ねばならない, 〜てはならない. Không dùng cho những việc tầm thường đời sống.',
    sampleSentences: [
      {
        jp: '法を司る裁判官たるもの、いかなる権力や私情にも屈せず中立公正を貫くべきである。',
        vn: 'Đã ở cương vị thẩm phán cầm cân nảy mực thì tuyệt đối không được cúi đầu trước bất kỳ quyền lực hay tình cảm cá nhân nào, phải kiên định giữ vững sự công tâm.',
      },
      {
        jp: '医療に従事する医師たる者、患者の生命と尊厳を第一に考えるのは当然の責務だ。',
        vn: 'Đã là người thầy thuốc làm việc trong ngành y tế thì đặt sinh mạng và phẩm giá bệnh nhân lên hàng đầu là nghĩa vụ tất yếu.',
      },
    ],
    quiz: {
      question: '国家の命運を担う政治家（　　）、私利私欲を捨てて国民のために尽くすべきだ。',
      blankTarget: 'Điền cấu trúc mang nghĩa "đã ở cương vị chính khách thì phải...".',
      options: ['たるもの', 'なりに', 'とあって', 'まみれ'],
      correctIndex: 0,
      explanation: 'Thân phận chính khách đi với nghĩa vụ cao cả dùng 政治家たるもの.',
    },
  },
  {
    id: 'pat_3',
    pattern: '〜たらんとする',
    reading: '〜たらんとする (taran to suru)',
    level: 'N1+',
    register: 'Diễn văn nghị viện',
    meaning: 'Khao khát, dốc lòng hướng tới mục tiêu trở thành một X lý tưởng.',
    formation: 'Danh từ chỉ thân phận lý tưởng (N) ＋ たらんとする（者／姿勢）',
    nuanceInsight:
      'Cấu trúc văn cổ Bungo kết hợp từ たら（trợ động từタリ）+ む（ý chí）+ とする. Thường gặp trong các văn bản tuyên ngôn chính trị hoặc triết lý khởi nghiệp.',
    sampleSentences: [
      {
        jp: '世界最高水準の研究機関たらんとするならば、既存の枠組みにとらわれない抜本的な改革が不可欠だ。',
        vn: 'Nếu muốn vươn mình trở thành viện nghiên cứu tiêu chuẩn hàng đầu thế giới, cải cách triệt để vượt qua rào cản cũ là điều tối quan trọng.',
      },
    ],
    quiz: {
      question: '真の国際人（　　）者は、自国の伝統文化への深い理解と他者への寛容さを兼ね備えるべきだ。',
      blankTarget: 'Điền cấu trúc "người khao khát xứng danh là công dân quốc tế chân chính".',
      options: ['たらんとする', 'たることなき', 'たるまいとする', 'たらずとも'],
      correctIndex: 0,
      explanation: 'Cụm thành ngữ N1 cổ văn: 真の国際人たらんとする者 (người muốn phấn đấu trở thành công dân quốc tế thực thụ).',
    },
  },
];

const EXTRA_PATTERNS: GrammarPattern[] = [
  {
    id: 'pat_extra_1',
    pattern: '〜と相まって',
    reading: '〜とあいまって (to aimatte)',
    level: 'N1',
    register: 'Tu từ học thuật',
    meaning: 'Cùng cộng hưởng với..., kết hợp đan xen tạo nên hiệu quả gấp bội.',
    formation: 'Danh từ (N) ＋ と相まって',
    nuanceInsight:
      'Thường dùng khi hai yếu tố thuận lợi hoặc hai yếu tố tiêu cực tác động qua lại, làm cho kết quả cuối cùng trở nên vô cùng rõ rệt.',
    sampleSentences: [
      {
        jp: '厳しい自然環境と人々の勤勉さが相まって、独自の素晴らしい伝統工芸が生み出された。',
        vn: 'Điều kiện tự nhiên khắc nghiệt cộng hưởng cùng đức tính cần cù của người dân đã sản sinh ra những sản phẩm thủ công truyền thống tuyệt mỹ.',
      },
      {
        jp: '記録的な猛暑と電力需給の逼迫が相まって、熱中症への厳重な警戒が呼びかけられている。',
        vn: 'Đợt nắng nóng kỷ lục cộng hưởng cùng tình trạng khan hiếm nguồn cung điện đã khiến nhà chức trách liên tục cảnh báo nghiêm ngặt về nguy cơ sốc nhiệt.',
      },
    ],
    quiz: {
      question: '最新のAI技術が熟練職人の伝統の技と（　　）、かつてない精密な製品が完成した。',
      blankTarget: 'Điền cấu trúc mang nghĩa "cộng hưởng kết hợp cùng nhau".',
      options: ['相まって', '見合って', '立ち向かって', '思い余って'],
      correctIndex: 0,
      explanation: 'Hai thế mạnh kết hợp tạo thành công dùng と相まって (あいまって).',
    },
  },
  {
    id: 'pat_extra_2',
    pattern: '〜であれ、〜であれ',
    reading: '〜であれ、〜であれ (de are ... de are)',
    level: 'N1',
    register: 'Văn kiện trang trọng',
    meaning: 'Dù là X hay là Y thì kết luận phía sau vẫn tuyệt đối không thay đổi.',
    formation: 'Danh từ (N1) ＋ であれ、Danh từ (N2) ＋ であれ',
    nuanceInsight:
      'Nêu ra hai ví dụ tương phản hoặc tiêu biểu để nhấn mạnh tính phổ quát và bất di bất dịch của quy tắc pháp luật hoặc đạo lý.',
    sampleSentences: [
      {
        jp: '大企業であれ、中小企業であれ、法令遵守を怠った組織に未来はない。',
        vn: 'Dù là tập đoàn đa quốc gia hay doanh nghiệp vừa và nhỏ, một tổ chức coi thường việc tuân thủ pháp luật sẽ không bao giờ có tương lai.',
      },
      {
        jp: '大人であれ、子供であれ、他者の生命を脅かす暴力は断じて容認されない。',
        vn: 'Bất kể là người lớn hay trẻ em, hành vi bạo lực đe dọa sinh mạng người khác tuyệt đối không thể dung thứ.',
      },
    ],
    quiz: {
      question: '理由が何（　　）、約束の期限を破ることはビジネスにおいて信用の失墜を招く。',
      blankTarget: 'Điền cấu trúc "dù lý do là bất cứ điều gì đi nữa".',
      options: ['であれ', 'につけ', 'にせよ', 'とあって'],
      correctIndex: 0,
      explanation: '理由が何であれ (Dù lý do có là gì chăng nữa) là cách dùng tu từ trang trọng.',
    },
  },
  {
    id: 'pat_extra_3',
    pattern: '〜ならではの',
    reading: '〜ならではの (naradeha no)',
    level: 'N1',
    register: 'Tu từ học thuật',
    meaning: 'Đặc sắc độc nhất vô nhị chỉ có ở X (lời khen ngợi phẩm chất riêng có).',
    formation: 'Danh từ (N) ＋ ならではの ＋ Danh từ (N2)',
    nuanceInsight:
      'Luôn mang sắc thái ca ngợi tính độc đáo, nét duyên dáng hoặc thế mạnh đặc biệt mà nơi khác không thể có được.',
    sampleSentences: [
      {
        jp: '地元産の新鮮な海の幸を堪能できるのは、港町ならではの贅沢である。',
        vn: 'Thưởng thức hải sản tươi rói đánh bắt tại chỗ là sự xa xỉ đặc sắc mà chỉ có ở những thị trấn ven biển.',
      },
    ],
    quiz: {
      question: '繊細な心遣いと四季の移ろいを表現した懐石料理は、日本（　　）の食文化だ。',
      blankTarget: 'Điền cấu trúc "văn hóa ẩm thực đặc sắc chỉ có ở Nhật Bản".',
      options: ['ならでは', 'なりとも', 'めかした', 'まみれ'],
      correctIndex: 0,
      explanation: 'Nét tinh hoa chỉ có ở Nhật Bản dùng 日本ならではの食文化.',
    },
  },
  {
    id: 'pat_extra_4',
    pattern: '〜ずにはおかない',
    reading: '〜ずにはおかない (zu ni wa okanai)',
    level: 'N1',
    register: 'Tu từ học thuật',
    meaning: 'Chắc chắn sẽ làm phát sinh / Nhất định phải khiến cho xảy ra (Mãnh liệt).',
    formation: 'Động từ thể Nai (bỏ ない) ＋ ずにはおかない（※する ➔ せずにはおかない）',
    nuanceInsight:
      'Biểu thị một tác động tâm lý hoặc hậu quả tất yếu cực mạnh: Nhất định sẽ làm rung động lòng người, nhất định sẽ phải trừng phạt kẻ có tội.',
    sampleSentences: [
      {
        jp: '彼女の魂を揺さぶる歌声は、聴く者すべてを感動させずにはおかない。',
        vn: 'Giọng hát lay động tâm can của cô ấy nhất định sẽ làm rung động mọi trái tim người nghe.',
      },
    ],
    quiz: {
      question: '法を犯した者に対しては、厳格な捜査を行い、必ずや処罰せ（　　）おかない。',
      blankTarget: 'Điền cấu trúc "nhất định sẽ xử phạt thích đáng".',
      options: ['ずには', 'なくては', 'ないでは', 'ざるを'],
      correctIndex: 0,
      explanation: 'Cấu trúc せずにはおかない mang nghĩa khẳng định quyết tâm trừng phạt đến cùng.',
    },
  },
  {
    id: 'pat_extra_5',
    pattern: '〜に堪えない',
    reading: '〜にたえない (ni taenai)',
    level: 'N1',
    register: 'Văn kiện trang trọng',
    meaning: 'Vô cùng, khôn xiết (cảm xúc trào dâng) HOẶC Không thể chịu nổi (tệ hại).',
    formation: 'Danh từ chỉ cảm xúc (感謝・喜び・遺憾・慙愧) ＋ に堪えない',
    nuanceInsight:
      'Cách nói trang trọng bậc nhất trong diễn văn ngoại giao và thư cảm ơn doanh nghiệp lớn: 感謝の念に堪えません (vô cùng cảm kích), 遺憾に堪えない (vô cùng lấy làm tiếc).',
    sampleSentences: [
      {
        jp: '皆様の長年にわたるご支援に対し、心より感謝の念に堪えません。',
        vn: 'Trước sự ủng hộ bền bỉ bao năm qua của quý vị, trong lòng tôi dâng trào niềm cảm kích khôn xiết.',
      },
    ],
    quiz: {
      question: '不慮の事故により尊い人命が失われたことは、痛惜の念（　　）ない。',
      blankTarget: 'Điền cấu trúc "vô cùng đau xót khôn nguôi".',
      options: ['に堪え', 'に足ら', 'に耐え', 'に及ば'],
      correctIndex: 0,
      explanation: '痛惜の念に堪えない (Vô cùng đau xót khôn cùng) là quán dụng ngữ kinh điển N1.',
    },
  },
];

interface Props {
  currentLevel: JLPTLevel;
}

export const InvertedSyntaxLab: React.FC<Props> = ({ currentLevel }) => {
  const [patterns, setPatterns] = useState<GrammarPattern[]>(INITIAL_PATTERNS);
  const [loadBatchCount, setLoadBatchCount] = useState<number>(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedPatId, setSelectedPatId] = useState<string>(INITIAL_PATTERNS[0].id);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleLoadMore = () => {
    const nextBatchNum = loadBatchCount + 1;
    const startIndex = ((nextBatchNum - 1) * 5) % EXTRA_PATTERNS.length;
    let batch = EXTRA_PATTERNS.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_PATTERNS.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextBatchNum}_${idx}`,
    }));

    setPatterns((prev) => [...prev, ...uniqueBatch]);
    setLoadBatchCount(nextBatchNum);
    setNotice(`Đã nạp thêm 5 cấu trúc ngữ pháp đảo ngữ & tu từ N1 đợt ${nextBatchNum}! (Tổng hiện có: ${patterns.length + uniqueBatch.length} cấu trúc)`);
    speechService.playSuccessSound();
    setTimeout(() => setNotice(null), 4000);
  };

  const currentPattern = patterns.find((p) => p.id === selectedPatId) || patterns[0];

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-10">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1208] via-[#140e06] to-[#0c0803] border border-amber-600/30 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="text-amber-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                Phân Hệ 5 (PH5) · Đột Phá Luyện Thi N2-N1
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-jp">倒置・強調構文マスター</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400 font-semibold">Đỉnh cao ngữ pháp văn kiện & nghị viện N1</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Bắt Bẫy Ngữ Pháp Đảo Ngữ & Khẳng Định Cường Điệu{' '}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                (Inverted Syntax & Emphatic Grammar Lab)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Giải mã trọn vẹn những cấu trúc tu từ học thuật cao cấp nhất xuất hiện trong bài thi JLPT N1 và xã luận báo chí: 〜をおいて〜ない, 〜たるもの, 〜たらんとする, 〜と相まって, 〜であれ.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-xl border border-dashed border-amber-500/60 bg-amber-950/30 hover:bg-amber-950/60 text-amber-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-amber-400"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>+5 Tải thêm cấu trúc đảo ngữ N1</span>
              {loadBatchCount > 0 && (
                <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
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
        {patterns.map((p, idx) => {
          const isSelected = p.id === selectedPatId;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPatId(p.id);
                setUserChoice(null);
                setShowResult(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 text-left ${
                isSelected
                  ? 'bg-amber-600 border-amber-400 text-slate-950 shadow-md shadow-amber-950/50'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-jp font-bold">
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-amber-400">
                  {p.level}
                </span>
                <span>{p.pattern}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Grammar Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40 uppercase font-bold">
                  {currentPattern.register}
                </span>
                <h2 className="text-2xl font-extrabold text-amber-300 mt-1 font-jp">{currentPattern.pattern}</h2>
                <div className="text-xs font-mono text-slate-400">{currentPattern.reading}</div>
              </div>

              <button
                onClick={() => speechService.speak(currentPattern.sampleSentences[0].jp)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 cursor-pointer"
                title="Nghe câu mẫu"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Meaning & Formation */}
            <div className="space-y-2">
              <div className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                <span className="text-slate-400 font-semibold">Ý nghĩa tu từ: </span>
                {currentPattern.meaning}
              </div>
              <div className="text-xs text-amber-200 bg-amber-950/30 p-3 rounded-xl border border-amber-900/40 font-mono">
                <span className="text-amber-400 font-bold block mb-0.5">CÔNG THỨC KẾT NỐI:</span>
                {currentPattern.formation}
              </div>
            </div>

            {/* Nuance Insight */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono">
                <Lightbulb className="w-3.5 h-3.5" />
                Sắc thái học thuật & Bẫy đề thi:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentPattern.nuanceInsight}</p>
            </div>

            {/* Exemplar Sentences */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Văn Cảnh Điển Hình:</span>
              {currentPattern.sampleSentences.map((sent, sIdx) => (
                <div key={sIdx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <p className="text-xs sm:text-sm font-jp text-white leading-relaxed">{sent.jp}</p>
                  <p className="text-xs text-slate-400 italic font-sans">{sent.vn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Inverted Grammar Quiz */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1427] border border-amber-700/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Trắc Nghiệm Ngữ Pháp Tu Từ N1
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">Điểm: {score}</span>
            </div>

            <p className="text-xs text-slate-300">
              Chọn cấu trúc thích hợp nhất điền vào câu văn mang tính khẳng định mãnh liệt:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs sm:text-sm font-jp font-bold text-white leading-relaxed bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                {currentPattern.quiz.question}
              </div>
              <div className="text-[11px] text-amber-300 italic bg-amber-950/40 p-2 rounded border border-amber-900/40">
                Gợi ý: {currentPattern.quiz.blankTarget}
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {currentPattern.quiz.options.map((opt, oIdx) => {
                  const isChosen = userChoice === oIdx;
                  const isCorrect = oIdx === currentPattern.quiz.correctIndex;

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
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-jp font-bold text-center transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span className="flex-1">{opt}</span>
                      {showResult && isCorrect && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      {showResult && isChosen && !isCorrect && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {showResult && (
                <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                  <div
                    className={`text-xs font-bold flex items-center gap-1.5 ${
                      userChoice === currentPattern.quiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {userChoice === currentPattern.quiz.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Chính xác hoàn hảo! (+10 điểm)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Chưa chính xác! Xem giải mã:</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    {currentPattern.quiz.explanation}
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
