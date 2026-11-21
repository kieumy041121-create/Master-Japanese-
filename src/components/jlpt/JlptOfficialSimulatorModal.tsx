import React, { useState, useEffect, useMemo, useRef } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import {
  X,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  Headphones,
  RotateCcw,
  Zap,
  Flame,
  TrendingUp,
  FileText,
  ShieldAlert,
  HelpCircle,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface JlptOfficialSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLevel?: JLPTLevel;
}

interface ExamQuestion {
  id: number;
  section: 'vocab_grammar' | 'reading' | 'listening';
  questionJp: string;
  contextJp?: string;
  options: string[];
  correctAnswer: number; // 1, 2, 3, or 4
  explanation: string;
  trapWarning: string;
}

const SAMPLE_EXAM_QUESTIONS: Record<JLPTLevel, ExamQuestion[]> = {
  N1: [
    {
      id: 1,
      section: 'vocab_grammar',
      questionJp: '問題１：次の下線の言葉の読み方として最もよいものを一つ選びなさい。\n\n彼の提案を導入することに、社内からは【躊躇】する声が多く上がった。',
      options: ['ちゅうちょ', 'ちゅうじょ', 'ちゅうち', 'しゅうちょ'],
      correctAnswer: 1,
      explanation: '躊躇 (ちゅうちょ): Ngập ngừng, do dự. Âm Hán Việt là "Trù trừ".',
      trapWarning: 'Bẫy âm đục じょ và âm ngắn/dài trong kỳ thi N1.',
    },
    {
      id: 2,
      section: 'vocab_grammar',
      questionJp: '問題２：次の文の（　）に入れるのに最もよいものを一つ選びなさい。\n\n新技術の開発に（　）、我が社の市場シェアは劇的に拡大した。',
      options: ['皮切りに', '伴い', '至って', '契機に'],
      correctAnswer: 2,
      explanation: '〜に伴い (にともない): Cùng với sự thay đổi của A thì B cũng biến chuyển theo quy mô lớn.',
      trapWarning: 'Bẫy nhầm với 〜を皮切りに (khởi đầu cho một chuỗi hành động tương tự lặp lại).',
    },
    {
      id: 3,
      section: 'reading',
      contextJp: '現代社会において「空気を読む」という行為は、円滑な人間関係を維持するための不可欠な知恵として称揚される。しかし、それは裏を返せば、同調圧力に屈して自己の主体的な思考を放棄することに他ならない。周囲の顔色を窺うあまり、異論を唱える勇気を失った集団は、やがて致命的な判断ミスへと突き進む危険を孕んでいる。',
      questionJp: '問３：筆者がこの文章で最も主張したいことは何か。',
      options: [
        '空気を読む能力は、現代社会を生き抜くために最優先で磨くべきである。',
        '同調圧力に従うことは、集団の結束を高める最善の策である。',
        '空気を読みすぎて自己の主体性を失うことは、集団に破滅をもたらす危険がある。',
        '周囲と異なる意見を持つ者は、組織から排除されるべきである。',
      ],
      correctAnswer: 3,
      explanation: 'Tác giả chỉ trích việc đọc vị không khí mù quáng dẫn đến đánh mất tính chủ thể và gây ra sai lầm chết người cho tập thể.',
      trapWarning: 'Bẫy chọn phương án 1 vì câu đầu bài viết có khen, nhưng vế sau "しかし" mới là luận điểm trọng tâm!',
    },
    {
      id: 4,
      section: 'listening',
      contextJp: '（音声問題：会議室での打ち合わせ）\n女の人と男の人が新商品の発売時期について話しています。二人は最終的に発売日をいつに決定しましたか。',
      questionJp: '聴解問題：最終的に決定した新商品の発売時期はどれか。',
      options: ['来月の初め', '来月の１５日', '再来月の初め', '年末商戦'],
      correctAnswer: 2,
      explanation: 'Ban đầu người nữ đề xuất đầu tháng sau, nhưng người nam chỉ ra linh kiện chậm trễ nên thống nhất lùi sang ngày 15.',
      trapWarning: 'Bẫy thay đổi quyết định vào phút chót trong Choukai N1.',
    },
  ],
  N2: [
    {
      id: 1,
      section: 'vocab_grammar',
      questionJp: '問題１：次の文の（　）に入れるのに最もよいものを一つ選びなさい。\n\n原料価格の高騰を（　）、来月から製品価格を値上げせざるを得ない。',
      options: ['理由に', '契機に', '受けて', '皮切りに'],
      correctAnswer: 3,
      explanation: '〜を受けて: Tiếp nhận tác động/tình hình khách quan để đưa ra quyết định tương ứng.',
      trapWarning: 'Bẫy nhầm giữa 〜を契機に (nhân cơ hội biến cố) và 〜を受けて (do ảnh hưởng khách quan).',
    },
    {
      id: 2,
      section: 'reading',
      contextJp: '失敗を恐れて何もしないことこそが、人生における最大の失敗である。行動を起こせば、たとえ望む結果が得られなかったとしても、そこから得られる知見は次なる成功の糧となる。',
      questionJp: '問２：筆者の考えと合致するものはどれか。',
      options: [
        '失敗しないためには、十分な準備が整うまで行動を控えるべきだ。',
        '結果がどうであれ、行動を起こして得た経験は将来の糧となる。',
        '望む結果が得られない挑戦には、時間を使う価値がない。',
        '失敗した者は、二度と挑戦する資格を失う。',
      ],
      correctAnswer: 2,
      explanation: 'Tác giả khẳng định hành động và học hỏi từ thất bại chính là nền tảng cho thành công tương lai.',
      trapWarning: 'Bẫy tuyệt đối hóa ở phương án 1 và 3.',
    },
    {
      id: 3,
      section: 'listening',
      questionJp: '聴解問題：男の人は明日、最初に行うべき業務は何ですか。',
      options: ['取引先への電話連絡', '企画書の修正', '部長への報告', '会議室の予約'],
      correctAnswer: 3,
      explanation: 'Trước khi liên hệ khách hàng hay sửa văn bản, bắt buộc phải báo cáo (Horenso) cho Trưởng phòng trước 9h sáng.',
      trapWarning: 'Bẫy thứ tự ưu tiên công việc trong văn hóa doanh nghiệp Nhật.',
    },
    {
      id: 4,
      section: 'vocab_grammar',
      questionJp: '問題４：下線の言葉に最も近い意味のものを一つ選びなさい。\n\n彼はいつも【大げさに】話す癖がある。',
      options: ['誇張して', '簡潔に', '控えめに', '正直に'],
      correctAnswer: 1,
      explanation: '大げさ (おおげさ) = 誇張 (こちょう): Nói quá, phóng đại sự thật.',
      trapWarning: 'Bẫy từ trái nghĩa 控えめに (khiêm tốn, chừng mực).',
    },
  ],
  N3: [
    {
      id: 1,
      section: 'vocab_grammar',
      questionJp: '問題１：次の文の（　）に入る最もよいものを一つ選びなさい。\n\n雨が降らない（　）、運動会は予定通り行われます。',
      options: ['かぎり', 'ばかり', 'とおり', 'だけに'],
      correctAnswer: 1,
      explanation: '〜ない限り (かぎり): Chừng nào mà không... thì sự việc vẫn diễn ra như cũ.',
      trapWarning: 'Bẫy cấu trúc điều kiện giới hạn.',
    },
    {
      id: 2,
      section: 'reading',
      contextJp: '最近、電子書籍を利用する人が増えている。重い本を持ち歩く必要がなく、いつでも読みたい本を購入できる便利さがあるからだ。しかし、紙の書籍の持つ手触りや装丁の美しさを好む読者も依然として少なくない。',
      questionJp: '問２：文章の内容と合っているものはどれか。',
      options: [
        '紙の本は重いため、利用する人が完全にいなくなった。',
        '電子書籍の普及にもかかわらず、紙の本の魅力を支持する人も多い。',
        '電子書籍は購入手続きが面倒である。',
        '紙の本の方が電子書籍よりも常に安く購入できる。',
      ],
      correctAnswer: 2,
      explanation: 'Dù sách điện tử tiện lợi nhưng vẫn có nhiều người yêu thích sách giấy.',
      trapWarning: 'Bẫy từ tuyệt đối "hoàn toàn không còn ai" ở câu 1.',
    },
    {
      id: 3,
      section: 'listening',
      questionJp: '聴解問題：留学生はこれから何を買いに行きますか。',
      options: ['切手と封筒', 'ノートと鉛筆', 'お弁当とお茶', '電車の一日乗車券'],
      correctAnswer: 1,
      explanation: 'Cần gửi hồ sơ gia hạn visa nên cần mua tem và phong bì trước tiên.',
      trapWarning: 'Bẫy các vật dụng được nhắc đến nhưng không phải mục đích tức thì.',
    },
    {
      id: 4,
      section: 'vocab_grammar',
      questionJp: '問題４：下線の漢字の読み方を選びなさい。\n\n明日の午後は【会議】があります。',
      options: ['かいぎ', 'かいき', 'あいぎ', 'えいぎ'],
      correctAnswer: 1,
      explanation: '会議 (かいぎ): Cuộc họp.',
      trapWarning: 'Bẫy âm đục ぎ vs き.',
    },
  ],
  N4: [],
  N5: [],
};

export const JlptOfficialSimulatorModal: React.FC<JlptOfficialSimulatorModalProps> = ({
  isOpen,
  onClose,
  initialLevel = 'N1',
}) => {
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>(initialLevel);
  const [examStatus, setExamStatus] = useState<'idle' | 'in_progress' | 'completed'>('idle');

  // Official JEES Timing in seconds (N1: 110m + 60m = 170m; for simulator test: 15m compressed mock mode or full mode)
  const [isCompressedTime, setIsCompressedTime] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 mins default compressed
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  // User answers on Virtual OMR Sheet (Record of questionId -> selected answer 1,2,3,4)
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  // Choukai continuous audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Scaled Score Result
  const [examResult, setExamResult] = useState<{
    vocabGrammarScore: number; // 0 - 60
    readingScore: number; // 0 - 60
    listeningScore: number; // 0 - 60
    totalScore: number; // 0 - 180
    isPassed: boolean;
    hasFailedSection: boolean; // Điểm liệt (<19)
    expGained: number;
  } | null>(null);

  // Questions for current level
  const questions = SAMPLE_EXAM_QUESTIONS[selectedLevel] && SAMPLE_EXAM_QUESTIONS[selectedLevel].length > 0
    ? SAMPLE_EXAM_QUESTIONS[selectedLevel]
    : SAMPLE_EXAM_QUESTIONS.N1;

  const currentQ = questions[activeQuestionIndex] || questions[0];

  // Official Time limits
  const fullOfficialTimeSeconds: Record<JLPTLevel, number> = {
    N1: 170 * 60,
    N2: 155 * 60,
    N3: 140 * 60,
    N4: 120 * 60,
    N5: 105 * 60,
  };

  // Timer countdown
  useEffect(() => {
    let timer: any = null;
    if (examStatus === 'in_progress' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinishExam();
            return 0;
          }
          if (prev === 300) {
            // 5 minutes warning
            speechService.playErrorSound();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStatus, timeLeft]);

  const handleStartExam = () => {
    const timeToSet = isCompressedTime ? 900 : fullOfficialTimeSeconds[selectedLevel] || 900;
    setTimeLeft(timeToSet);
    setUserAnswers({});
    setActiveQuestionIndex(0);
    setExamResult(null);
    setExamStatus('in_progress');
    speechService.playSuccessSound();
  };

  // Virtual OMR Sheet selection
  const handleSelectAnswer = (qId: number, optionNum: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionNum,
    }));
    speechService.playAmbientBurst('station');
  };

  // Finish and compute 180 Scaled Score
  const handleFinishExam = () => {
    setExamStatus('completed');
    speechService.stop();

    let vocabCorrect = 0;
    let vocabTotal = 0;
    let readCorrect = 0;
    let readTotal = 0;
    let listenCorrect = 0;
    let listenTotal = 0;

    questions.forEach((q) => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (q.section === 'vocab_grammar') {
        vocabTotal++;
        if (isCorrect) vocabCorrect++;
      } else if (q.section === 'reading') {
        readTotal++;
        if (isCorrect) readCorrect++;
      } else if (q.section === 'listening') {
        listenTotal++;
        if (isCorrect) listenCorrect++;
      }
    });

    const vocabGrammarScore = Math.round(((vocabCorrect / (vocabTotal || 1))) * 60);
    const readingScore = Math.round(((readCorrect / (readTotal || 1))) * 60);
    const listeningScore = Math.round(((listenCorrect / (listenTotal || 1))) * 60);
    const totalScore = vocabGrammarScore + readingScore + listeningScore;

    const passThresholds: Record<JLPTLevel, number> = {
      N1: 100,
      N2: 90,
      N3: 95,
      N4: 90,
      N5: 80,
    };

    const hasFailedSection =
      vocabGrammarScore < 19 || readingScore < 19 || listeningScore < 19;
    const isPassed = !hasFailedSection && totalScore >= (passThresholds[selectedLevel] || 90);

    const expGained = isPassed ? totalScore * 10 : totalScore * 4;

    setExamResult({
      vocabGrammarScore,
      readingScore,
      listeningScore,
      totalScore,
      isPassed,
      hasFailedSection,
      expGained,
    });

    if (isPassed) {
      speechService.playSuccessSound();
    } else {
      speechService.playErrorSound();
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Play Choukai continuous stream
  const handlePlayChoukai = () => {
    if (isAudioPlaying) {
      speechService.stop();
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
      speechService.speak(
        currentQ.contextJp || currentQ.questionJp,
        1.0,
        1.0
      );
      setTimeout(() => {
        setIsAudioPlaying(false);
      }, 7000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-rose-800/60 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-rose-950/60 to-slate-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-600/30 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-inner">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Thao Trường Thi Thật JLPT Chống Gian Lận
                </h2>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                  JEES Protocol
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Áp lực thi thật với đồng hồ đếm ngược, Choukai không dừng, phiếu OMR ảo và thang điểm 180 Scaled Score
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {examStatus === 'in_progress' && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-rose-600/60 shadow-inner">
                <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
                <span className="font-mono font-black text-rose-300 text-sm">
                  {formatTimer(timeLeft)}
                </span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* STATE 1: IDLE / CONFIG */}
          {examStatus === 'idle' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Level Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Chọn Cấp Độ Đề Thi:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['N1', 'N2', 'N3'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        selectedLevel === lvl
                          ? 'bg-rose-950/80 border-rose-500 text-white font-bold ring-2 ring-rose-500/40 shadow-lg shadow-rose-950'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="text-xl font-black">{lvl}</div>
                      <div className="text-[11px] opacity-75 mt-1 font-sans">
                        {lvl === 'N1' ? '180đ · Điểm liệt <19' : lvl === 'N2' ? '180đ · Đậu >= 90' : '180đ · Đậu >= 95'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Strict Regulations Checklist */}
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 text-xs text-slate-300">
                <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Quy Định Phòng Thi Nghiêm Ngặt Của Ủy Ban JEES:
                </h4>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Không tạm dừng:</strong> Đồng hồ đếm ngược chạy liên tục. Hết giờ hệ thống tự động thu bài và chấm điểm.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Choukai 1 mạch:</strong> Nghe hiểu phát một mạch theo tốc độ loa trường thi, không có nút tua lại.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Cảnh báo Điểm Liệt:</strong> Bất kể tổng điểm cao đến đâu, chỉ cần 1 trong 3 phân môn dưới 19 điểm đều tính là TRƯỢT.</span>
                  </li>
                </ul>
              </div>

              {/* Mode: Fast Mock (15 mins) vs Full Official Timing */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <div className="font-bold text-white">Chế độ thi thử siêu tốc (Compressed 15 Phút)</div>
                  <div className="text-slate-400 text-[11px]">Tập trung áp lực giải nhanh bộ câu hỏi trọng tâm</div>
                </div>
                <input
                  type="checkbox"
                  checked={isCompressedTime}
                  onChange={(e) => setIsCompressedTime(e.target.checked)}
                  className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
                />
              </div>

              <button
                onClick={handleStartExam}
                className="w-full py-4 bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Zap className="w-5 h-5" />
                <span>Bắt Đầu Làm Bài Thi Thật {selectedLevel} Ngay</span>
              </button>
            </div>
          )}

          {/* STATE 2: EXAM IN PROGRESS (QUESTIONS + VIRTUAL OMR SHEET) */}
          {examStatus === 'in_progress' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Question View (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 shadow-xl">
                  {/* Section tag */}
                  <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
                    <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold font-mono">
                      Câu {activeQuestionIndex + 1} / {questions.length} · {
                        currentQ.section === 'vocab_grammar' ? 'Kiến Thức Ngôn Ngữ' : currentQ.section === 'reading' ? 'Đọc Hiểu Dokkai' : 'Nghe Hiểu Choukai'
                      }
                    </span>

                    {currentQ.section === 'listening' && (
                      <button
                        onClick={handlePlayChoukai}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-900/60 border border-indigo-700 text-indigo-200 hover:bg-indigo-800 cursor-pointer text-xs font-bold"
                      >
                        <Headphones className="w-3.5 h-3.5" />
                        <span>{isAudioPlaying ? 'Đang Phát Loa...' : 'Phát Đoạn Nghe (1 Lần)'}</span>
                      </button>
                    )}
                  </div>

                  {/* Context passage if Dokkai or Choukai */}
                  {currentQ.contextJp && (
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm font-jp leading-relaxed text-slate-200 whitespace-pre-wrap">
                      {currentQ.contextJp}
                    </div>
                  )}

                  {/* Question Prompt */}
                  <div className="text-base font-bold font-jp text-white leading-relaxed whitespace-pre-wrap">
                    {currentQ.questionJp}
                  </div>

                  {/* 4 Multiple Choice Options */}
                  <div className="space-y-2.5 pt-2">
                    {currentQ.options.map((opt, optIdx) => {
                      const optNum = optIdx + 1;
                      const isSelected = userAnswers[currentQ.id] === optNum;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectAnswer(currentQ.id, optNum)}
                          className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-rose-950/80 border-rose-500 text-white font-bold ring-2 ring-rose-500/30'
                              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold font-mono text-xs ${
                              isSelected
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {optNum}
                          </span>
                          <span className="font-jp text-sm">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Nav Buttons */}
                <div className="flex items-center justify-between text-xs">
                  <button
                    disabled={activeQuestionIndex === 0}
                    onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Câu Trước</span>
                  </button>

                  <button
                    disabled={activeQuestionIndex === questions.length - 1}
                    onClick={() => setActiveQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Câu Kế Tiếp</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Virtual OMR Sheet (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-rose-400" />
                      Phiếu Tô Đáp Án Chì (OMR Sheet)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Bút chì 2B</span>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Chạm trực tiếp vào các ô tròn 1-2-3-4 để tô đen đáp án như trong phòng thi thật:
                  </p>

                  <div className="space-y-2">
                    {questions.map((q, idx) => {
                      const answered = userAnswers[q.id];
                      return (
                        <div
                          key={q.id}
                          className={`p-2 rounded-xl border flex items-center justify-between ${
                            activeQuestionIndex === idx
                              ? 'bg-slate-900 border-rose-500/60'
                              : 'bg-slate-950/60 border-slate-800/80'
                          }`}
                        >
                          <button
                            onClick={() => setActiveQuestionIndex(idx)}
                            className="font-mono text-xs font-bold text-slate-300 hover:text-white"
                          >
                            Câu {idx + 1}
                          </button>

                          {/* 4 OMR Bubbles */}
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4].map((num) => {
                              const isChecked = answered === num;
                              return (
                                <button
                                  key={num}
                                  onClick={() => {
                                    handleSelectAnswer(q.id, num);
                                    setActiveQuestionIndex(idx);
                                  }}
                                  className={`w-6 h-6 rounded-full border text-[11px] font-mono font-bold flex items-center justify-center cursor-pointer transition-all ${
                                    isChecked
                                      ? 'bg-slate-200 border-white text-slate-950 shadow-inner ring-2 ring-slate-400'
                                      : 'border-slate-700 text-slate-500 hover:border-slate-500 hover:text-white'
                                  }`}
                                  title={`Tô đáp án ${num}`}
                                >
                                  {num}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit Exam Button */}
                  <button
                    onClick={handleFinishExam}
                    className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-950 cursor-pointer"
                  >
                    Nộp Bài & Chấm Điểm 180 Scaled Score
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATE 3: COMPLETED RESULTS & 6-AXIS RADAR */}
          {examStatus === 'completed' && examResult && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Main Score Banner */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 shadow-2xl ${
                  examResult.isPassed
                    ? 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-950/70 border-emerald-500/70'
                    : 'bg-gradient-to-br from-rose-950/80 via-slate-900 to-red-950/70 border-rose-500/70'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-700">
                  {examResult.isPassed ? (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> KẾT QUẢ: ĐẬU (合 格)
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> KẾT QUẢ: TRƯỢT (不合格)
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
                    {examResult.totalScore} <span className="text-2xl text-slate-400">/ 180</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Điểm thi quy đổi chuẩn hóa (Scaled Score) theo thuật toán Khảo thí JLPT
                  </p>
                </div>

                {examResult.hasFailedSection && (
                  <div className="p-3 rounded-xl bg-rose-950/90 border border-rose-600/80 text-rose-200 text-xs font-semibold flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-300" />
                    <span>CẢNH BÁO ĐIỂM LIỆT: Có phân môn dưới 19 điểm dẫn đến kết quả không đạt dù tổng điểm vượt sàn!</span>
                  </div>
                )}

                {/* 3 Section Breakdown */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <div className="text-xs text-slate-400">Từ vựng & Ngữ pháp</div>
                    <div className="text-xl font-bold font-mono text-white">
                      {examResult.vocabGrammarScore} / 60
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <div className="text-xs text-slate-400">Đọc hiểu Dokkai</div>
                    <div className="text-xl font-bold font-mono text-white">
                      {examResult.readingScore} / 60
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <div className="text-xs text-slate-400">Nghe hiểu Choukai</div>
                    <div className="text-xl font-bold font-mono text-white">
                      {examResult.listeningScore} / 60
                    </div>
                  </div>
                </div>
              </div>

              {/* 6-Axis Radar Capability Chart (SVG) */}
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                    Biểu Đồ Radar Năng Lực 6 Trục (Skill X-Ray)
                  </h4>
                  <span className="text-[11px] font-mono text-emerald-400">
                    +{examResult.expGained} EXP Thăng Hạng
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                  {/* SVG Radar */}
                  <svg width="240" height="240" viewBox="0 0 240 240" className="overflow-visible">
                    {/* Background concentric polygons */}
                    {[1, 0.75, 0.5, 0.25].map((scale, i) => {
                      const r = 90 * scale;
                      const points = [
                        [120, 120 - r],
                        [120 + r * 0.866, 120 - r * 0.5],
                        [120 + r * 0.866, 120 + r * 0.5],
                        [120, 120 + r],
                        [120 - r * 0.866, 120 + r * 0.5],
                        [120 - r * 0.866, 120 - r * 0.5],
                      ].map((p) => p.join(',')).join(' ');
                      return (
                        <polygon
                          key={i}
                          points={points}
                          fill="none"
                          stroke="#334155"
                          strokeWidth="1"
                          strokeDasharray={scale === 1 ? 'none' : '3,3'}
                        />
                      );
                    })}

                    {/* Data polygon */}
                    {(() => {
                      const scores = [
                        0.85, // Kanji
                        examResult.vocabGrammarScore / 60, // Vocab
                        examResult.vocabGrammarScore / 60, // Grammar
                        examResult.readingScore / 60, // Dokkai
                        examResult.listeningScore / 60, // Choukai
                        0.9, // Keigo/Culture
                      ];
                      const dataPoints = scores
                        .map((s, idx) => {
                          const angle = (idx * 60 - 90) * (Math.PI / 180);
                          const r = 90 * Math.max(0.2, s);
                          return `${120 + r * Math.cos(angle)},${120 + r * Math.sin(angle)}`;
                        })
                        .join(' ');
                      return (
                        <polygon
                          points={dataPoints}
                          fill="rgba(99, 102, 241, 0.35)"
                          stroke="#6366f1"
                          strokeWidth="2.5"
                        />
                      );
                    })()}

                    {/* Axis Labels */}
                    <text x="120" y="18" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Hán Tự</text>
                    <text x="210" y="70" fill="#94a3b8" fontSize="10" textAnchor="start" fontWeight="bold">Từ Vựng</text>
                    <text x="210" y="180" fill="#94a3b8" fontSize="10" textAnchor="start" fontWeight="bold">Ngữ Pháp</text>
                    <text x="120" y="230" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Đọc Hiểu</text>
                    <text x="30" y="180" fill="#94a3b8" fontSize="10" textAnchor="end" fontWeight="bold">Nghe Hiểu</text>
                    <text x="30" y="70" fill="#94a3b8" fontSize="10" textAnchor="end" fontWeight="bold">Keigo/Văn Hóa</text>
                  </svg>

                  {/* Summary Notes */}
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="font-bold text-white">Chẩn Đoán Năng Lực & Khuyến Nghị:</div>
                    <p className="text-slate-400">
                      {examResult.readingScore < 30
                        ? '⚠️ Điểm Đọc hiểu còn non. Cần tăng tốc luyện phân rã cấu trúc câu Kakikotoba và lướt tin tức Nikkei/NHK hàng ngày.'
                        : '🔥 Khả năng xử lý trường văn rất tốt! Giữ vững phản xạ bắt ý chính để tối ưu điểm Dokkai.'}
                    </p>
                    <p className="text-slate-400">
                      {examResult.listeningScore < 30
                        ? '⚠️ Cần luyện thêm Shadowing phát thanh viên ở tốc độ 1.0x - 1.25x để bắt kịp tốc độ nói tự nhiên của người Nhật.'
                        : '⚡ Tai nghe thời sự và đối thoại phản xạ nhạy bén!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Review detailed answers & trap breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Giải Mã Chi Tiết Từng Câu & Bẫy Thi JEES:
                </h4>
                {questions.map((q, idx) => {
                  const userAnswer = userAnswers[q.id];
                  const isCorrect = userAnswer === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-mono text-white">
                          Câu {idx + 1} ({q.section}):
                        </span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            isCorrect ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-rose-950 text-rose-300 border border-rose-600'
                          }`}
                        >
                          {isCorrect ? 'ĐÚNG' : `SAI (Bạn chọn: ${userAnswer || 'Chưa tô'})`}
                        </span>
                      </div>
                      <p className="font-jp text-slate-200">{q.questionJp}</p>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-emerald-400 font-semibold">
                          Đáp án đúng: Phương án {q.correctAnswer}
                        </div>
                        <p className="text-slate-300">{q.explanation}</p>
                        <p className="text-amber-300/90 italic">⚠️ Bẫy JEES: {q.trapWarning}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleStartExam}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md"
                >
                  Làm Lại Đề Thi Này
                </button>
                <button
                  onClick={() => setExamStatus('idle')}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs cursor-pointer"
                >
                  Chọn Cấp Độ Khác
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="font-mono">Bộ Đề Thi Thử Chuẩn Hóa Theo Cấu Trúc Khảo Thí Quốc Tế</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
          >
            Đóng Thao Trường
          </button>
        </div>
      </div>
    </div>
  );
};
