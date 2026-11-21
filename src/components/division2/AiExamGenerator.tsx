import React, { useState, useEffect, useRef } from 'react';
import { JLPTLevel } from '../../types';
import {
  CustomQuizQuestion,
  QuizConfig,
  QuizFormat,
  QuizSubFormat,
  QuizMode,
  QuizSource,
  MistakeRecord,
} from '../../types/quizGenerator';
import {
  createCustomQuiz,
  appendMoreQuizQuestions,
  computeIrtScore,
  getMistakeRecords,
  recordQuizMistake,
  removeMistakeRecord,
  clearAllMistakes,
} from '../../services/customQuizService';
import { speechService } from '../../services/speechService';
import { THEMATIC_GROUPS } from '../../data/thematicVocab';
import {
  Sparkles,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  Lightbulb,
  FileSpreadsheet,
  AlertCircle,
  Play,
  RotateCcw,
  Sliders,
  Award,
  ListOrdered,
  PlusCircle,
  Printer,
  Flag,
  Volume2,
  Bookmark,
  GraduationCap,
  Layers,
  BookOpen,
  Headphones,
  FileText,
  HelpCircle,
  Check,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Props {
  currentLevel: JLPTLevel;
  onOpenAiSensei?: (query?: string) => void;
}

const SAMPLE_KEYWORDS = [
  'Phỏng vấn IT & Kỹ thuật',
  'Du lịch & Onsen Nhật Bản',
  'Bẫy trợ từ は vs が',
  'Kính ngữ công sở Sonkeigo',
  'Thương lượng giá cả B2B',
  'Slang giới trẻ Gen Z & Anime',
  'Y tế & Khám bệnh tại Nhật',
  'Thuê nhà & Đăng ký cư trú',
];

export const AiExamGenerator: React.FC<Props> = ({ currentLevel, onOpenAiSensei }) => {
  // Config State
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>(currentLevel);
  const [selectedFormat, setSelectedFormat] = useState<QuizFormat>('mixed');
  const [questionCount, setQuestionCount] = useState<5 | 10 | 20 | 30>(10);
  const [quizMode, setQuizMode] = useState<QuizMode>('practice');
  const [quizSource, setQuizSource] = useState<QuizSource>('curated_bank');
  const [customKeyword, setCustomKeyword] = useState<string>('');
  const [selectedThematicTopic, setSelectedThematicTopic] = useState<string>('topic-1-family');
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);

  // Exam Running State
  const [questions, setQuestions] = useState<CustomQuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [revealedInPractice, setRevealedInPractice] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isAppending, setIsAppending] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  // Timer State (for timed_exam mode)
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 mins
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Sổ tay câu sai (Mistake Notebook)
  const [mistakeRecords, setMistakeRecords] = useState<MistakeRecord[]>([]);

  // Review Filter after submission
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'flagged'>('all');

  // Star Mondai interactive token states
  const [userStarOrders, setUserStarOrders] = useState<Record<string, number[]>>({});

  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Sync prop level with internal state
  useEffect(() => {
    setSelectedLevel(currentLevel);
  }, [currentLevel]);

  // Load initial mistakes count
  useEffect(() => {
    setMistakeRecords(getMistakeRecords());
  }, []);

  // Initial load
  useEffect(() => {
    handleInitQuiz({
      level: currentLevel,
      format: 'mixed',
      count: 10,
      mode: 'practice',
      source: 'curated_bank',
    });
  }, [currentLevel]);

  // Timer effect
  useEffect(() => {
    let interval: any;
    if (timerActive && !isSubmitted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isSubmitted && timerActive) {
      handleSubmitExam();
    }
    return () => clearInterval(interval);
  }, [timerActive, isSubmitted, timeLeft]);

  const handleInitQuiz = async (configOverride?: Partial<QuizConfig>) => {
    setIsGenerating(true);
    const config: QuizConfig = {
      level: configOverride?.level || selectedLevel,
      format: configOverride?.format || selectedFormat,
      count: configOverride?.count || questionCount,
      mode: configOverride?.mode || quizMode,
      source: configOverride?.source || quizSource,
      customKeyword: configOverride?.customKeyword !== undefined ? configOverride.customKeyword : customKeyword,
      thematicTopicId: configOverride?.thematicTopicId || selectedThematicTopic,
    };

    try {
      const qs = await createCustomQuiz(config);
      setQuestions(qs);
      setAnswers({});
      setFlaggedIds(new Set());
      setRevealedInPractice({});
      setIsSubmitted(false);
      setUserStarOrders({});

      const totalSeconds = (config.count || 10) * 90; // 1.5 mins per question
      setTimeLeft(totalSeconds);
      setTimerActive(config.mode === 'timed_exam');
      setIsConfigOpen(false);
      speechService.playSuccessSound();
    } catch (e) {
      console.error('Quiz creation failed:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAppendMore = async () => {
    if (isAppending || questions.length >= 50) return;
    setIsAppending(true);
    const config: QuizConfig = {
      level: selectedLevel,
      format: selectedFormat,
      count: questionCount,
      mode: quizMode,
      source: quizSource,
      customKeyword,
      thematicTopicId: selectedThematicTopic,
    };

    try {
      const extra = await appendMoreQuizQuestions(config, questions);
      if (extra.length > 0) {
        setQuestions((prev) => [...prev, ...extra]);
        // Extend time if timed exam
        if (quizMode === 'timed_exam' && !isSubmitted) {
          setTimeLeft((prev) => prev + extra.length * 90);
        }
        speechService.playSuccessSound();
      }
    } catch (e) {
      console.warn('Failed to append questions:', e);
    } finally {
      setIsAppending(false);
    }
  };

  const handleSelectAnswer = (question: CustomQuizQuestion, optionIndex: number) => {
    if (isSubmitted) return;

    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));

    if (quizMode === 'practice') {
      setRevealedInPractice((prev) => ({ ...prev, [question.id]: true }));
      const isCorrect = optionIndex === question.correctIndex;
      if (isCorrect) {
        speechService.playSuccessSound();
      } else {
        speechService.playErrorSound();
        // Record mistake into notebook
        recordQuizMistake(question, optionIndex);
        setMistakeRecords(getMistakeRecords());
      }
    }
  };

  const handleToggleFlag = (qId: string) => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      return next;
    });
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setTimerActive(false);
    speechService.playSuccessSound();

    // Automatically record all wrong answers into Mistake Notebook
    questions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns !== undefined && userAns !== q.correctIndex) {
        recordQuizMistake(q, userAns);
      }
    });
    setMistakeRecords(getMistakeRecords());
  };

  const handleResetExam = () => {
    setAnswers({});
    setFlaggedIds(new Set());
    setRevealedInPractice({});
    setIsSubmitted(false);
    setUserStarOrders({});
    setTimeLeft(questions.length * 90);
    setTimerActive(quizMode === 'timed_exam');
  };

  const handleSpeak = (text: string, id: string) => {
    if (activeSpeechId === id) {
      speechService.stop();
      setActiveSpeechId(null);
      return;
    }
    setActiveSpeechId(id);
    speechService.speak(text, speechRate);
    setTimeout(() => {
      setActiveSpeechId(null);
    }, 4000);
  };

  const handlePrintExam = () => {
    window.print();
  };

  const handleAskSenseiAboutQuestion = (q: CustomQuizQuestion) => {
    if (!onOpenAiSensei) return;
    const query = `Thầy giải thích cặn kẽ giúp em câu hỏi này:
"${q.content}"
Đáp án đúng là "${q.options[q.correctIndex]}" nhưng tại sao các phương án khác lại sai? Bản chất ngữ pháp hoặc bẫy đề thi ở đây là gì ạ?`;
    onOpenAiSensei(query);
  };

  // Star Mondai: Interactive order click
  const handleToggleStarToken = (qId: string, tokenIndex: number) => {
    if (isSubmitted) return;
    setUserStarOrders((prev) => {
      const currentList = prev[qId] || [];
      if (currentList.includes(tokenIndex)) {
        return { ...prev, [qId]: currentList.filter((idx) => idx !== tokenIndex) };
      }
      if (currentList.length < 4) {
        return { ...prev, [qId]: [...currentList, tokenIndex] };
      }
      return prev;
    });
  };

  const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const answeredCount = Object.keys(answers).length;
  const scoreStats = computeIrtScore(correctCount, questions.length, selectedLevel, selectedFormat);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Filter questions for display
  const displayedQuestions = questions.filter((q) => {
    if (!isSubmitted) return true;
    if (reviewFilter === 'wrong') {
      return answers[q.id] !== undefined && answers[q.id] !== q.correctIndex;
    }
    if (reviewFilter === 'flagged') {
      return flaggedIds.has(q.id);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* ========================================================
          1. HEADER BANNER: STUDIO IDENTITY & ACTIONS (NO-PRINT)
          ======================================================== */}
      <div className="no-print bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-800/50 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                Studio Tạo Bài Quiz Theo Yêu Cầu
              </h2>
              <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Custom Quiz Generator
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <span>👑 N1 Chuẩn Thượng Đỉnh</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl font-sans">
              Tùy biến không giới hạn: Đầy đủ 6 dạng thức JLPT (Kanji, Collocation, Dấu sao ★, Đọc hiểu Dokkai, Nghe Pitch Accent, Mixed), 2 chế độ Luyện tập / Bấm giờ IRT, AI Gemini Flash & Kho 2.557+ từ.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Sổ tay câu sai badge button */}
            <button
              onClick={() => {
                setSelectedFormat('mixed');
                setQuizSource('mistake_notebook');
                handleInitQuiz({ source: 'mistake_notebook', format: 'mixed', mode: 'practice' });
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-700/50 hover:border-rose-500 text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Làm lại các câu đã từng làm sai trong sổ tay"
            >
              <Bookmark className="w-3.5 h-3.5 text-rose-400" />
              <span>Sổ tay câu sai</span>
              <span className="font-mono text-[11px] px-1.5 py-0.2 rounded-full bg-rose-900/80 text-white font-bold">
                {mistakeRecords.length}
              </span>
            </button>

            {/* Print / Export PDF Button */}
            <button
              onClick={handlePrintExam}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-400 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="In đề thi ra giấy hoặc xuất file PDF chuẩn A4"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" />
              <span>In đề / Xuất PDF</span>
            </button>

            {/* Toggle Config Studio Button */}
            <button
              onClick={() => setIsConfigOpen((prev) => !prev)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isConfigOpen ? 'Đóng Tùy Biến' : '⚙️ Tùy Biến Đề Thi'}</span>
              {isConfigOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* ========================================================
            2. CONFIGURATION STUDIO DRAWER / ACCORDION
            ======================================================== */}
        {isConfigOpen && (
          <div className="pt-4 border-t border-purple-800/40 space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Level Selector */}
              <div className="space-y-1.5 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-300 uppercase tracking-wider block">
                  1. Chọn Cấp Độ JLPT
                </span>
                <div className="grid grid-cols-5 gap-1 font-mono">
                  {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => {
                    const isSelected = selectedLevel === lvl;
                    const isN1 = lvl === 'N1';
                    return (
                      <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                          isSelected
                            ? isN1
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black ring-1 ring-amber-300'
                              : 'bg-purple-600 text-white font-bold'
                            : isN1
                            ? 'bg-slate-900 text-amber-300 hover:bg-slate-800 border border-amber-900/40'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {isN1 ? '👑 N1' : lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dạng thức JLPT */}
              <div className="space-y-1.5 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-300 uppercase tracking-wider block">
                  2. Dạng Thức Bài Thi
                </span>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value as QuizFormat)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="mixed">🌟 Tổng Hợp Đa Dạng (Chuẩn Đề Thật JLPT)</option>
                  <option value="jpt_standard">🏆 JPT Chuẩn Quốc Tế (Thang Điểm 990: Tìm Lỗi Sai, Ngữ Pháp, Đọc Hiểu)</option>
                  <option value="kanji">🈶 Hán Tự: Đọc, Viết & Bộ Thủ</option>
                  <option value="vocab_collocation">📖 Từ Vựng & Collocation Trợ Từ</option>
                  <option value="grammar_star">🧩 Ngữ Pháp & Bài Tập Dấu Sao (★)</option>
                  <option value="reading_dokkai">📄 Đọc Hiểu Đoạn Văn (Dokkai)</option>
                  <option value="listening_pitch">🎧 Nghe Hiểu & Pitch Accent Tokyo</option>
                </select>
              </div>

              {/* Chế độ làm bài & Số câu */}
              <div className="space-y-1.5 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-300 uppercase tracking-wider block">
                  3. Chế Độ & Quy Mô
                </span>
                <div className="flex gap-1.5 mb-1.5">
                  <button
                    onClick={() => setQuizMode('practice')}
                    className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      quizMode === 'practice'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    ⚡ Luyện tập
                  </button>
                  <button
                    onClick={() => setQuizMode('timed_exam')}
                    className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      quizMode === 'timed_exam'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    ⏱️ Thi bấm giờ
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-1 font-mono">
                  {([5, 10, 20, 30] as const).map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuestionCount(num)}
                      className={`py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                        questionCount === num
                          ? 'bg-slate-700 text-white ring-1 ring-purple-400'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {num} câu
                    </button>
                  ))}
                </div>
              </div>

              {/* Nguồn đề bài */}
              <div className="space-y-1.5 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-300 uppercase tracking-wider block">
                  4. Nguồn Đề Bài
                </span>
                <select
                  value={quizSource}
                  onChange={(e) => setQuizSource(e.target.value as QuizSource)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="curated_bank">📚 Kho Bản Quyền 2.557+ Từ</option>
                  <option value="ai_gemini">🤖 AI Gemini Flash (Từ khóa tự do)</option>
                  <option value="thematic_25">🍱 25 Chủ Đề Tuyển Chọn</option>
                  <option value="mistake_notebook">📕 Sổ Tay Câu Sai ({mistakeRecords.length} câu)</option>
                </select>
              </div>
            </div>

            {/* Sub-bar: If AI Gemini Source is selected */}
            {quizSource === 'ai_gemini' && (
              <div className="bg-slate-950/90 border border-indigo-900/60 p-3 rounded-xl space-y-2 animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Nhập từ khóa tự do muốn AI Gemini Flash tạo đề bài:</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Mô hình Flash sinh đề bám sát ngữ cảnh thực tế trong ~3 giây
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customKeyword}
                    onChange={(e) => setCustomKeyword(e.target.value)}
                    placeholder="VD: Phỏng vấn xin việc IT, Du lịch suối nước nóng Onsen, Đàm phán hợp đồng..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleInitQuiz();
                    }}
                  />
                  <button
                    onClick={() => handleInitQuiz()}
                    disabled={isGenerating}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {isGenerating ? 'Đang sinh...' : 'Tạo với từ khóa này'}
                  </button>
                </div>

                {/* Sample Keywords */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-slate-400">Gợi ý nhanh:</span>
                  {SAMPLE_KEYWORDS.map((kw) => (
                    <button
                      key={kw}
                      onClick={() => {
                        setCustomKeyword(kw);
                        handleInitQuiz({ customKeyword: kw });
                      }}
                      className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-indigo-200 transition-colors cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-bar: If Thematic 25 source is selected */}
            {quizSource === 'thematic_25' && (
              <div className="bg-slate-950/90 border border-emerald-900/60 p-3 rounded-xl space-y-2 animate-fadeIn">
                <span className="text-xs font-bold text-emerald-300 block">
                  Chọn 1 trong 25 chuyên đề lớn:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 text-xs">
                  {THEMATIC_GROUPS.map((grp) => (
                    <button
                      key={grp.id}
                      onClick={() => {
                        setSelectedThematicTopic(grp.topicIds[0]);
                        handleInitQuiz({ thematicTopicId: grp.topicIds[0] });
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-emerald-950/50 border border-slate-800 hover:border-emerald-700/60 text-slate-300 hover:text-white transition-colors cursor-pointer text-left truncate"
                    >
                      {grp.shortTitle}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Launch Action */}
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => handleInitQuiz()}
                disabled={isGenerating}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Đang khởi tạo đề thi...' : '⚡ Khởi Tạo Bài Thi Mới'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          3. RUNNING EXAM STATUS BAR & QUICK CONTROLS (NO-PRINT)
          ======================================================== */}
      <div className="no-print bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Format badge */}
          <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 text-purple-300 border border-purple-800/60 font-semibold flex items-center gap-1.5">
            {selectedFormat === 'jpt_standard' && <Award className="w-3.5 h-3.5 text-amber-400" />}
            {selectedFormat === 'mixed' && <Sparkles className="w-3.5 h-3.5" />}
            {selectedFormat === 'kanji' && <BookOpen className="w-3.5 h-3.5" />}
            {selectedFormat === 'vocab_collocation' && <Layers className="w-3.5 h-3.5" />}
            {selectedFormat === 'grammar_star' && <Lightbulb className="w-3.5 h-3.5" />}
            {selectedFormat === 'reading_dokkai' && <FileText className="w-3.5 h-3.5" />}
            {selectedFormat === 'listening_pitch' && <Headphones className="w-3.5 h-3.5" />}
            <span>
              {selectedFormat === 'jpt_standard'
                ? '🏆 JPT Chuẩn Quốc Tế (990 Điểm)'
                : selectedFormat === 'mixed'
                ? 'Tổng Hợp Mixed'
                : selectedFormat === 'kanji'
                ? 'Hán Tự'
                : selectedFormat === 'vocab_collocation'
                ? 'Từ Vựng & Collocation'
                : selectedFormat === 'grammar_star'
                ? 'Dấu Sao ★'
                : selectedFormat === 'reading_dokkai'
                ? 'Đọc Hiểu Dokkai'
                : 'Pitch Accent Tokyo'}
            </span>
          </span>

          {/* Level badge */}
          <span className="px-2 py-1 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-mono font-bold">
            JLPT {selectedLevel}
          </span>

          {/* Mode badge */}
          <span
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 ${
              quizMode === 'practice'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                : 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/60'
            }`}
          >
            {quizMode === 'practice' ? '⚡ Luyện tập tương tác' : '⏱️ Thi bấm giờ IRT'}
          </span>

          {/* Answered Counter */}
          <span className="text-slate-400">
            Tiến độ:{' '}
            <strong className="text-white font-mono">
              {answeredCount}/{questions.length}
            </strong>{' '}
            câu
          </span>

          {flaggedIds.size > 0 && (
            <span className="text-amber-400 flex items-center gap-1 font-mono font-semibold">
              <Flag className="w-3 h-3 fill-amber-400" />
              <span>{flaggedIds.size} gắn cờ</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Timer if in Timed Exam mode */}
          {quizMode === 'timed_exam' && !isSubmitted && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-700 rounded-lg font-mono text-xs">
              <Clock
                className={`w-3.5 h-3.5 ${
                  timeLeft < 180 ? 'text-rose-400 animate-pulse' : 'text-purple-400'
                }`}
              />
              <span
                className={`font-bold ${
                  timeLeft < 180 ? 'text-rose-400 animate-pulse' : 'text-slate-200'
                }`}
              >
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Append +5 More Questions Button */}
          <button
            onClick={handleAppendMore}
            disabled={isAppending || questions.length >= 50}
            className="px-3 py-1 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 hover:from-emerald-600/50 hover:to-teal-600/50 border border-emerald-500/40 text-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            title="Nạp thêm 5 câu hỏi mới ngay lập tức vào bài thi hiện tại"
          >
            <PlusCircle className={`w-3.5 h-3.5 ${isAppending ? 'animate-spin' : ''}`} />
            <span>{isAppending ? 'Đang nạp...' : '+ Tải thêm 5 câu'}</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={handleResetExam}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Làm lại đề thi này từ đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================
          PRINT ONLY HEADER (ONLY VISIBLE ON PAPER / PDF EXPORT)
          ======================================================== */}
      <div className="print-only pb-6 mb-6 border-b border-black text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          BÀI THI TRẮC NGHIỆM TIẾNG NHẬT · KOTOBA INFINITY
        </h1>
        <div className="text-sm font-semibold text-gray-800">
          Cấp độ: JLPT {selectedLevel} · Dạng thức: {selectedFormat.toUpperCase()} · Quy mô:{' '}
          {questions.length} câu
        </div>
        <div className="flex justify-between text-xs text-gray-600 pt-2 border-t border-gray-300">
          <span>Họ và tên thí sinh: _______________________________</span>
          <span>Số báo danh: __________________</span>
          <span>Ngày thi: {new Date().toLocaleDateString('vi-VN')}</span>
        </div>
      </div>

      {/* ========================================================
          4. MAIN EXAM GRID (QUESTIONS + STICKY ANSWER SHEET)
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Questions List (8 of 12 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {displayedQuestions.map((q, idx) => {
            const selected = answers[q.id];
            const isAnswered = selected !== undefined;
            const isFlagged = flaggedIds.has(q.id);
            const isPracticeRevealed = quizMode === 'practice' && revealedInPractice[q.id];
            const isCorrect = (isSubmitted || isPracticeRevealed) && selected === q.correctIndex;
            const isWrong =
              (isSubmitted || isPracticeRevealed) && isAnswered && selected !== q.correctIndex;

            // Highlight border
            let cardBorder = 'border-slate-800 bg-[#090e1b]/95';
            if (isSubmitted || isPracticeRevealed) {
              if (isCorrect) cardBorder = 'border-emerald-600/60 bg-emerald-950/20';
              else if (isWrong) cardBorder = 'border-rose-600/60 bg-rose-950/20';
            }

            return (
              <div
                key={q.id}
                ref={(el) => {
                  questionRefs.current[q.id] = el;
                }}
                className={`quiz-card-print border rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 transition-all ${cardBorder}`}
              >
                {/* Question Header: Number, Format Badge, Source Tag, Flag, Audio */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-900/60 border border-purple-700/60 text-purple-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-purple-300 bg-purple-950/50 border border-purple-800/50 px-2 py-0.5 rounded-lg">
                      {q.subFormatTitle}
                    </span>
                    {q.sourceTag && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 hidden sm:inline">
                        {q.sourceTag}
                      </span>
                    )}
                  </div>

                  {/* Actions: Audio Tokyo TTS + Flag Toggle */}
                  <div className="no-print flex items-center gap-1.5 shrink-0">
                    {/* Tokyo Audio Pronunciation */}
                    {(q.audioText || q.content) && (
                      <button
                        onClick={() => handleSpeak(q.audioText || q.content, q.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          activeSpeechId === q.id
                            ? 'bg-purple-600 text-white animate-pulse'
                            : 'text-slate-400 hover:text-purple-300 hover:bg-slate-800'
                        }`}
                        title="Phát âm tiếng Nhật chuẩn Tokyo"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}

                    {/* Flag button */}
                    <button
                      onClick={() => handleToggleFlag(q.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isFlagged
                          ? 'text-amber-400 bg-amber-950/60 border border-amber-800/60'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                      }`}
                      title={isFlagged ? 'Bỏ cờ đánh dấu' : 'Gắn cờ xem lại câu này (Flag)'}
                    >
                      <Flag className={`w-4 h-4 ${isFlagged ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Instruction in Japanese */}
                <div className="text-xs text-slate-400 font-jp leading-relaxed">
                  {q.instruction}
                </div>

                {/* Optional Reading Passage (for Dokkai) */}
                {q.passage && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-200 text-xs sm:text-sm font-jp leading-relaxed whitespace-pre-line font-mincho border-l-4 border-l-indigo-500">
                    {q.passage}
                  </div>
                )}

                {/* Pitch Accent Visualizer (if pitch question) */}
                {q.pitchDisplay && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 text-xs">
                    <Headphones className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Mẫu cao độ Tokyo:</span>
                    <strong className="font-mono text-white">{q.pitchDisplay}</strong>
                  </div>
                )}

                {/* Star Mondai (★) Interactive Token Builder */}
                {q.starTokens && q.starTokens.length === 4 && (
                  <div className="space-y-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block font-medium">
                      🧩 Nhấp vào 4 mảnh ghép để thử trật tự câu (Vị trí ★ là đáp án cần tìm):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {q.starTokens.map((tok, tIdx) => {
                        const orderList = userStarOrders[q.id] || [];
                        const placedIndex = orderList.indexOf(tIdx);
                        const isPlaced = placedIndex !== -1;

                        return (
                          <button
                            key={tIdx}
                            onClick={() => handleToggleStarToken(q.id, tIdx)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-jp transition-all cursor-pointer border flex items-center gap-1.5 ${
                              isPlaced
                                ? 'bg-indigo-600 border-indigo-400 text-white font-semibold shadow-sm'
                                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                            }`}
                          >
                            <span className="font-mono text-[10px] opacity-70">
                              {isPlaced ? `[Vị trí ${placedIndex + 1}]` : `(${tIdx + 1})`}
                            </span>
                            <span>{tok}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Question Content */}
                <div className="text-sm sm:text-base font-jp text-white leading-relaxed whitespace-pre-line py-1 font-semibold">
                  {q.content}
                </div>

                {/* 4 Choices Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isChecked = selected === optIdx;
                    let optStyle =
                      'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-purple-600/60 hover:text-white';

                    if (isSubmitted || isPracticeRevealed) {
                      if (optIdx === q.correctIndex) {
                        optStyle =
                          'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold shadow-md';
                      } else if (isChecked && optIdx !== q.correctIndex) {
                        optStyle =
                          'bg-rose-950/70 border-rose-500 text-rose-200 line-through';
                      }
                    } else if (isChecked) {
                      optStyle =
                        'bg-purple-600 border-purple-400 text-white font-semibold shadow-md';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q, optIdx)}
                        disabled={isSubmitted}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                            {optIdx + 1}
                          </span>
                          <span className="font-jp">{opt}</span>
                        </div>
                        {isSubmitted || isPracticeRevealed ? (
                          optIdx === q.correctIndex ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : isChecked ? (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          ) : null
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                {/* Detailed Explanation upon submit OR in practice mode after selection */}
                {(isSubmitted || isPracticeRevealed) && (
                  <div className="no-print pt-3 border-t border-slate-800/80 space-y-2 text-xs animate-fadeIn">
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Lời giải chi tiết & Bóc tách bẫy đề thi:</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed font-sans">{q.explanation}</p>
                    </div>

                    {q.grammarMnemonic && (
                      <div className="bg-amber-950/30 border border-amber-900/50 p-3 rounded-xl space-y-1">
                        <div className="font-bold text-amber-300 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                          <span>Mẹo nhớ phản xạ 3 giây:</span>
                        </div>
                        <p className="text-amber-200/90 leading-relaxed font-sans">
                          {q.grammarMnemonic}
                        </p>
                      </div>
                    )}

                    {/* Ask AI Sensei About This Question Action */}
                    {onOpenAiSensei && (
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleAskSenseiAboutQuestion(q)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-700/50 text-indigo-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Hỏi Giáo sư AI Sensei về câu này</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky Answer Sheet & IRT Scorecard (4 of 12 cols) */}
        <div className="no-print lg:col-span-4 sticky top-20 space-y-4">
          <div className="bg-[#090e1b]/95 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <ListOrdered className="w-4 h-4 text-purple-400" />
                <span>Phiếu Tô Đáp Án Trắc Nghiệm</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {answeredCount}/{questions.length} đã làm
              </span>
            </div>

            {/* Answer Bubbles Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto p-1 scrollbar-thin">
              {questions.map((q, idx) => {
                const selected = answers[q.id];
                const isAnswered = selected !== undefined;
                const isFlagged = flaggedIds.has(q.id);
                const isPracticeRevealed = quizMode === 'practice' && revealedInPractice[q.id];
                const isCorrect = (isSubmitted || isPracticeRevealed) && selected === q.correctIndex;
                const isWrong =
                  (isSubmitted || isPracticeRevealed) && isAnswered && selected !== q.correctIndex;

                let bubbleColor =
                  'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600';
                if (isSubmitted || isPracticeRevealed) {
                  bubbleColor = isCorrect
                    ? 'bg-emerald-600 border-emerald-500 text-white font-bold'
                    : isWrong
                    ? 'bg-rose-600 border-rose-500 text-white font-bold'
                    : 'bg-slate-800 border-slate-700 text-slate-500';
                } else if (isAnswered) {
                  bubbleColor = 'bg-purple-600 border-purple-400 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      questionRefs.current[q.id]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      });
                    }}
                    className={`relative h-10 rounded-xl border text-xs flex flex-col items-center justify-center transition-all cursor-pointer ${bubbleColor}`}
                    title={`Chuyển đến câu ${idx + 1}`}
                  >
                    {isFlagged && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                    )}
                    <span className="text-[10px] opacity-70">Câu {idx + 1}</span>
                    <span className="font-mono font-bold">
                      {selected !== undefined ? selected + 1 : '-'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scorecard upon Submission (Timed Exam or Full Practice) */}
            {isSubmitted && (
              <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/40 space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    {scoreStats.isJpt ? 'Điểm chuẩn JPT (Thang 990):' : 'Kết quả chuẩn hóa IRT:'}
                  </div>
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-2xl font-black text-emerald-400">
                      {scoreStats.scaledScore}/{scoreStats.isJpt ? 990 : 180}
                    </span>
                    <span className="text-xs text-slate-400">điểm</span>
                  </div>
                </div>

                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(scoreStats.scaledScore / (scoreStats.isJpt ? 990 : 180)) * 100}%` }}
                  />
                </div>

                <div className="text-xs text-slate-300 leading-relaxed font-sans">
                  {scoreStats.verdict}
                </div>

                {/* Filter Results Tabs */}
                <div className="flex gap-1 pt-2 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`flex-1 py-1 rounded text-center font-medium ${
                      reviewFilter === 'all'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    Tất cả
                  </button>
                  <button
                    onClick={() => setReviewFilter('wrong')}
                    className={`flex-1 py-1 rounded text-center font-medium ${
                      reviewFilter === 'wrong'
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    Câu sai ({questions.length - correctCount})
                  </button>
                  <button
                    onClick={() => setReviewFilter('flagged')}
                    className={`flex-1 py-1 rounded text-center font-medium ${
                      reviewFilter === 'flagged'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    Cờ ({flaggedIds.size})
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmitExam}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Nộp bài & Tính điểm IRT</span>
                </button>
              ) : (
                <button
                  onClick={handleResetExam}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại bài thi này</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
