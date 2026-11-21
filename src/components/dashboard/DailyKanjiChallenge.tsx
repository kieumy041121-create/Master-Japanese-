import React, { useState, useEffect, useRef, useMemo } from 'react';
import { JLPTLevel } from '../../types';
import { rawKanjiDatabase, RawKanjiRecord } from '../../data/allKanjiDatabase';
import { speechService } from '../../services/speechService';
import {
  Timer,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Volume2,
  Award,
  Zap,
  Sparkles,
  ArrowRight,
  Flame,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Trophy,
  Share2,
} from 'lucide-react';

interface DailyKanjiChallengeProps {
  currentLevel: JLPTLevel;
  onSetLevel?: (level: JLPTLevel) => void;
  onOpenAiSensei?: (query?: string) => void;
}

interface KanjiQuizQuestion {
  id: string;
  kanjiRecord: RawKanjiRecord;
  questionType: 'meaning_hanviet' | 'reading' | 'reverse_kanji';
  questionPrompt: string;
  subPrompt?: string;
  correctAnswer: string;
  options: {
    id: string;
    text: string;
    subText?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

const TOTAL_QUIZ_TIME_SECONDS = 300; // 5 minutes
const QUESTIONS_PER_SESSION = 10;

export const DailyKanjiChallenge: React.FC<DailyKanjiChallengeProps> = ({
  currentLevel,
  onSetLevel,
  onOpenAiSensei,
}) => {
  // Session states: 'intro' | 'active' | 'completed'
  const [sessionState, setSessionState] = useState<'intro' | 'active' | 'completed'>('intro');
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>(currentLevel);
  const [questions, setQuestions] = useState<KanjiQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; isCorrect: boolean; selectedText: string }[]>([]);
  
  // Timer states
  const [remainingSeconds, setRemainingSeconds] = useState<number>(TOTAL_QUIZ_TIME_SECONDS);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  // Sync selectedLevel with currentLevel when currentLevel changes
  useEffect(() => {
    setSelectedLevel(currentLevel);
  }, [currentLevel]);

  // Daily Best Score from LocalStorage
  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const saved = localStorage.getItem(`kotoba_kanji_challenge_best_${selectedLevel}_${today}`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Filter Kanji by selected level
  const levelKanjiList = useMemo(() => {
    const list = rawKanjiDatabase.filter((k) => k.lvl === selectedLevel);
    return list.length > 0 ? list : rawKanjiDatabase.slice(0, 50);
  }, [selectedLevel]);

  // Generate 10 randomized high-frequency questions
  const generateQuizQuestions = (level: JLPTLevel): KanjiQuizQuestion[] => {
    const pool = rawKanjiDatabase.filter((k) => k.lvl === level);
    const sourcePool = pool.length >= 15 ? pool : rawKanjiDatabase;

    // Shuffle and pick 10
    const shuffled = [...sourcePool].sort(() => 0.5 - Math.random());
    const pickedKanji = shuffled.slice(0, QUESTIONS_PER_SESSION);

    return pickedKanji.map((kanji, qIndex) => {
      // Pick question type
      const types: ('meaning_hanviet' | 'reading' | 'reverse_kanji')[] = [
        'meaning_hanviet',
        'reading',
        'reverse_kanji',
      ];
      const qType = types[qIndex % types.length];

      // Other 3 distractors
      const distractors = sourcePool.filter((k) => k.id !== kanji.id).sort(() => 0.5 - Math.random()).slice(0, 3);

      if (qType === 'meaning_hanviet') {
        const correctText = `${kanji.s} (${kanji.m.split(',')[0].trim()})`;
        const wrongOpts = distractors.map((d) => `${d.s} (${d.m.split(',')[0].trim()})`);
        const allOpts = [
          { id: 'opt_correct', text: correctText, isCorrect: true },
          ...wrongOpts.map((w, idx) => ({ id: `opt_${idx}`, text: w, isCorrect: false })),
        ].sort(() => 0.5 - Math.random());

        return {
          id: `q_${qIndex}_${kanji.id}`,
          kanjiRecord: kanji,
          questionType: qType,
          questionPrompt: `Âm Hán Việt và nghĩa cốt lõi của chữ 「${kanji.c}」 là gì?`,
          subPrompt: `Số nét: ${kanji.st} · Bộ thủ: ${kanji.rad}`,
          correctAnswer: correctText,
          options: allOpts,
          explanation: `Chữ【${kanji.c}】Âm Hán Việt: ${kanji.s}. Nghĩa: ${kanji.m}. Mẹo nhớ: ${kanji.mn}`,
        };
      } else if (qType === 'reading') {
        // Onyomi or Kunyomi reading
        const onReadings = kanji.o.join(', ');
        const kunReadings = kanji.k.join(', ');
        const correctReading = onReadings || kunReadings;

        const wrongOpts = distractors.map((d) => (d.o.length > 0 ? d.o.join(', ') : d.k.join(', ')));
        const allOpts = [
          { id: 'opt_correct', text: correctReading, subText: onReadings ? 'Âm On' : 'Âm Kun', isCorrect: true },
          ...wrongOpts.map((w, idx) => ({ id: `opt_${idx}`, text: w, subText: 'Cách đọc khác', isCorrect: false })),
        ].sort(() => 0.5 - Math.random());

        return {
          id: `q_${qIndex}_${kanji.id}`,
          kanjiRecord: kanji,
          questionType: qType,
          questionPrompt: `Âm đọc (Onyomi / Kunyomi) chuẩn của chữ 「${kanji.c}」 (${kanji.s}) là gì?`,
          subPrompt: `Nghĩa: ${kanji.m}`,
          correctAnswer: correctReading,
          options: allOpts,
          explanation: `Chữ【${kanji.c}】(${kanji.s}): Onyomi là [${kanji.o.join(', ') || 'Không có'}], Kunyomi là [${kanji.k.join(', ') || 'Không có'}].`,
        };
      } else {
        // Reverse Kanji: given meaning & Han-Viet, find the character
        const correctText = kanji.c;
        const allOpts = [
          { id: 'opt_correct', text: correctText, subText: `${kanji.s}`, isCorrect: true },
          ...distractors.map((d, idx) => ({ id: `opt_${idx}`, text: d.c, subText: `${d.s}`, isCorrect: false })),
        ].sort(() => 0.5 - Math.random());

        return {
          id: `q_${qIndex}_${kanji.id}`,
          kanjiRecord: kanji,
          questionType: qType,
          questionPrompt: `Chữ Hán nào dưới đây có âm Hán Việt là 「${kanji.s}」 mang nghĩa "${kanji.m.split(',')[0]}"?`,
          subPrompt: `Cấp độ JLPT ${kanji.lvl}`,
          correctAnswer: correctText,
          options: allOpts,
          explanation: `Chữ【${kanji.c}】chính là âm Hán Việt ${kanji.s} (${kanji.m}).`,
        };
      }
    });
  };

  // Start the 5-Minute Challenge
  const handleStartChallenge = (lvl?: JLPTLevel) => {
    const targetLvl = lvl || selectedLevel;
    const generated = generateQuizQuestions(targetLvl);
    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setRemainingSeconds(TOTAL_QUIZ_TIME_SECONDS);
    setIsTimerPaused(false);
    setSessionState('active');

    speechService.playSuccessSound();
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (sessionState === 'active' && !isTimerPaused) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionState, isTimerPaused]);

  // Handle Option Selection
  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;

    setSelectedOptionId(optId);
    setIsAnswerSubmitted(true);

    const currentQ = questions[currentIndex];
    const chosenOpt = currentQ.options.find((o) => o.id === optId);
    const isCorrect = !!chosenOpt?.isCorrect;

    if (isCorrect) {
      speechService.playSuccessSound();
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        isCorrect,
        selectedText: chosenOpt?.text || '',
      },
    ]);

    // Auto-advance after 1.2s or allow manual Next
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOptionId(null);
        setIsAnswerSubmitted(false);
      } else {
        handleFinishQuiz();
      }
    }, 1100);
  };

  // Finish Quiz
  const handleFinishQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSessionState('completed');

    // Calculate score
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    const finalScore = correctCount * 10;

    // Save best score to localStorage
    try {
      const today = new Date().toISOString().slice(0, 10);
      const key = `kotoba_kanji_challenge_best_${selectedLevel}_${today}`;
      const saved = localStorage.getItem(key);
      const prevBest = saved ? parseInt(saved, 10) : 0;
      if (finalScore > prevBest) {
        localStorage.setItem(key, finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const timeSpentSec = TOTAL_QUIZ_TIME_SECONDS - remainingSeconds;

  return (
    <div className="bg-[#090e1b] border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden font-sans animate-fadeIn">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* STATE 1: INTRO SCREEN */}
      {sessionState === 'intro' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Thử Thách Hán Tự 5 Phút (Daily Kanji Challenge)
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Rèn luyện phản xạ 10 chữ Hán xuất hiện nhiều nhất trong đề thi JLPT thực tế với đồng hồ bấm giờ 5 phút.
              </p>
            </div>

            {/* Level Selector Buttons */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setSelectedLevel(lvl);
                    onSetLevel?.(lvl);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <Timer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Thời gian quy chuẩn</div>
                <div className="text-sm font-bold text-white font-mono">5 Phút (300 giây)</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Quy mô đề thi</div>
                <div className="text-sm font-bold text-white font-mono">10 Hán Tự JLPT {selectedLevel}</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Kỷ lục hôm nay</div>
                <div className="text-sm font-bold text-amber-300 font-mono">
                  {bestScore > 0 ? `${bestScore}/100 Điểm` : 'Chưa làm'}
                </div>
              </div>
            </div>
          </div>

          {/* Action Zone */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-jp">
              <span className="text-amber-400 font-bold">漢字特訓:</span>
              <span>Luyện đủ 3 dạng: Âm Hán Việt, Onyomi/Kunyomi & Chiết tự nhớ nhanh.</span>
            </div>

            <button
              onClick={() => handleStartChallenge()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Bắt Đầu Thử Thách 5 Phút (JLPT {selectedLevel})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STATE 2: ACTIVE 5-MINUTE QUIZ SCREEN */}
      {sessionState === 'active' && currentQ && (
        <div className="space-y-5 animate-fadeIn">
          {/* Header Bar with 5-Minute Timer & Progress */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40">
                JLPT {selectedLevel}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-300 font-semibold">
                Câu {currentIndex + 1} / {QUESTIONS_PER_SESSION}
              </span>
            </div>

            {/* Countdown Clock Display */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-sm font-extrabold transition-all ${
                remainingSeconds <= 45
                  ? 'bg-rose-950/80 text-rose-300 border-rose-700 animate-pulse'
                  : 'bg-slate-900 text-amber-300 border-amber-500/40'
              }`}
            >
              <Timer className="w-4 h-4 text-amber-400" />
              <span>{formatTimer(remainingSeconds)}</span>
            </div>
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUESTIONS_PER_SESSION) * 100}%` }}
            />
          </div>

          {/* Question Card Box */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 text-center space-y-3 shadow-inner">
            <div className="flex items-center justify-center gap-3">
              {/* Giant Kanji Display */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-5xl sm:text-6xl font-mincho text-white shadow-md mx-auto relative group">
                <span className="group-hover:scale-105 transition-transform duration-200">
                  {currentQ.kanjiRecord.c}
                </span>
                <button
                  onClick={() => speechService.speak(currentQ.kanjiRecord.c)}
                  className="absolute bottom-1 right-1 p-1 bg-slate-800 hover:bg-amber-500/20 rounded-md text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed max-w-xl mx-auto">
              {currentQ.questionPrompt}
            </h3>

            {currentQ.subPrompt && (
              <p className="text-xs text-slate-400 font-mono">
                {currentQ.subPrompt}
              </p>
            )}
          </div>

          {/* 4 Answer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnStyle = 'bg-slate-900/90 border-slate-800 hover:border-amber-500/60 text-slate-200 hover:bg-slate-800/80';

              if (isAnswerSubmitted) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-white font-bold ring-1 ring-emerald-500';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold ring-1 ring-rose-500';
                } else {
                  btnStyle = 'bg-slate-950/60 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <div>
                    <div className="text-sm font-semibold">{opt.text}</div>
                    {opt.subText && (
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{opt.subText}</div>
                    )}
                  </div>

                  {isAnswerSubmitted && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Live Explanation during active question if answered */}
          {isAnswerSubmitted && (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans flex items-start gap-2 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300">Giải thích chi tiết: </span>
                {currentQ.explanation}
              </div>
            </div>
          )}

          {/* Bottom Bar: Quit or Skip */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
            <button
              onClick={() => {
                if (confirm('Bạn có chắc muốn thoát phiên làm bài này không?')) {
                  handleFinishQuiz();
                }
              }}
              className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              Dừng làm bài & xem kết quả
            </button>

            <span className="text-slate-400 font-mono">
              Đúng: <strong className="text-emerald-400">{userAnswers.filter((a) => a.isCorrect).length}</strong>/{currentIndex + (isAnswerSubmitted ? 1 : 0)}
            </span>
          </div>
        </div>
      )}

      {/* STATE 3: COMPLETED REPORT & REVIEW SCREEN */}
      {sessionState === 'completed' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center space-y-2 py-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-1">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Hoàn Thành Thử Thách Hán Tự 5 Phút!
            </h3>
            <p className="text-xs text-slate-400">
              Bạn đã hoàn thành phiên luyện phản xạ Hán tự trình độ JLPT {selectedLevel}.
            </p>
          </div>

          {/* Performance Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[11px] text-slate-400">Điểm số đạt được</div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">
                {correctCount * 10} / 100
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[11px] text-slate-400">Độ chính xác</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                {Math.round((correctCount / QUESTIONS_PER_SESSION) * 100)}%
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[11px] text-slate-400">Thời gian làm bài</div>
              <div className="text-2xl font-extrabold text-cyan-300 font-mono">
                {formatTimer(timeSpentSec)}
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-center">
              <div className="text-[11px] text-slate-400">Xếp hạng phản xạ</div>
              <div className="text-base font-extrabold text-purple-300 mt-1">
                {correctCount >= 9
                  ? 'Bậc Thầy Hán Tự'
                  : correctCount >= 7
                  ? 'Tinh Thông'
                  : correctCount >= 5
                  ? 'Đạt Yêu Cầu'
                  : 'Cần Luyện Thêm'}
              </div>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Chi Tiết 10 Hán Tự Vừa Thi:</span>
              <span className="text-[11px] text-slate-400 font-mono">Bấm loa để nghe phát âm</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const userAns = userAnswers.find((a) => a.questionId === q.id);
                const isCorrect = userAns?.isCorrect;

                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                      isCorrect
                        ? 'bg-emerald-950/20 border-emerald-900/40'
                        : 'bg-rose-950/20 border-rose-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xl font-mincho text-white shrink-0">
                        {q.kanjiRecord.c}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {q.kanjiRecord.s} ({q.kanjiRecord.c})
                          </span>
                          <span className="text-slate-400 text-[11px]">
                            {q.kanjiRecord.m.split(',')[0]}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          On: {q.kanjiRecord.o.join(', ') || '—'} · Kun: {q.kanjiRecord.k.join(', ') || '—'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => speechService.speak(q.kanjiRecord.c)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      </button>

                      {onOpenAiSensei && (
                        <button
                          onClick={() =>
                            onOpenAiSensei(
                              `Sensei hãy giải thích chi tiết chữ Hán "${q.kanjiRecord.c}" (${q.kanjiRecord.s}) và cho ví dụ từ vựng JLPT`
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-800/40 text-[11px] text-indigo-300 hover:text-white cursor-pointer transition-colors"
                        >
                          Hỏi AI Sensei
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={() => handleStartChallenge(selectedLevel)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm Lại Bộ Đề Khác (JLPT {selectedLevel})</span>
            </button>

            <button
              onClick={() => setSessionState('intro')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              Về Menu Thử Thách
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
