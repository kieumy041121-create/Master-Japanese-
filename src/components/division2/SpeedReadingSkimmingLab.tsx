import React, { useState, useEffect, useRef } from 'react';
import { JLPTLevel } from '../../types';
import { SpeedReadingItem } from '../../types/readingJlptExtended';
import { initialSpeedReadingList, extraSpeedReadingList } from '../../data/readingJlptExtendedDatabase';
import {
  Zap,
  Volume2,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  PlusCircle,
  Sparkles,
  Timer,
  Search,
  BookOpen,
  HelpCircle,
  Compass,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const SpeedReadingSkimmingLab: React.FC<Props> = ({ currentLevel = 'N2' }) => {
  const [items, setItems] = useState<SpeedReadingItem[]>(initialSpeedReadingList);
  const [extraLoaded, setExtraLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<SpeedReadingItem>(initialSpeedReadingList[0]);

  // Speed pacer state
  const [targetSeconds, setTargetSeconds] = useState<number>(selectedItem.recommendedTimeSec);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(selectedItem.recommendedTimeSec);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [selectedQuestionOption, setSelectedQuestionOption] = useState<number | null>(null);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState<boolean>(false);
  const [scanningRevealed, setScanningRevealed] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setSecondsRemaining(selectedItem.recommendedTimeSec);
    setTargetSeconds(selectedItem.recommendedTimeSec);
    setIsTimerRunning(false);
    setShowAnswer(false);
    setSelectedQuestionOption(null);
    setIsQuestionSubmitted(false);
    setScanningRevealed(false);
  }, [selectedItem]);

  useEffect(() => {
    if (isTimerRunning && secondsRemaining > 0) {
      timerRef.current = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, secondsRemaining]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLoadMore = () => {
    if (!extraLoaded) {
      setItems([...items, ...extraSpeedReadingList]);
      setExtraLoaded(true);
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedLevel === 'all') return true;
    return item.level === selectedLevel;
  });

  const progressPercentage = Math.round(
    ((targetSeconds - secondsRemaining) / targetSeconds) * 100
  );

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-950/80 via-slate-900 to-cyan-950/80 border border-teal-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              Chuyên Mục 87 · Đọc Hiểu & JLPT (PH2)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Phòng Luyện Tốc Đọc Skimming & Scanning
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono border border-teal-500/30">
                Speed Pacer 350-500 WPM
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Giải quyết áp lực thiếu giờ kinh điển của bài thi N2-N1: Bấm giờ đọc lướt định vị câu chuyển ý (Pivot), truy quét từ khóa vàng trong 60 giây và kiểm tra mức độ thấu triệt luận điểm.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={handleLoadMore}
              disabled={extraLoaded}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${
                extraLoaded
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white border border-teal-400/30 hover:shadow-teal-500/25'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              {extraLoaded ? 'Đã Tải Đủ 10 Bài (+5 Đầy Đủ)' : 'Tải Thêm 5 Bài (+5)'}
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 mr-2 uppercase tracking-wider">Cấp độ JLPT:</span>
          {['all', 'N1', 'N2'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedLevel === lvl
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
              }`}
            >
              {lvl === 'all' ? `Tất Cả (${items.length})` : `${lvl} (${items.filter((i) => i.level === lvl).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Article Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Danh sách bài tập tốc đọc</span>
            <span className="font-mono text-teal-400">{filteredItems.length} đề thi</span>
          </div>
          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-teal-950/70 border-teal-500/70 shadow-lg shadow-teal-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-900/60 text-teal-300 border border-teal-700/40">
                      {item.level}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.wordCount} chữ · {item.recommendedTimeSec}s
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1 font-mono text-teal-400">
                    Chủ đề: {item.theme}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Speed Pacer & Challenge Arena */}
        <div className="lg:col-span-8 space-y-5">
          {/* Stopwatch & Speed Controller Bar */}
          <div className="bg-slate-900/90 border border-teal-800/40 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-950 border border-teal-700 flex flex-col items-center justify-center shrink-0 shadow-inner">
                <Timer className="w-4 h-4 text-teal-400" />
                <span className="text-lg font-mono font-extrabold text-white">{secondsRemaining}s</span>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
                  <span>Mục tiêu tốc đọc: {selectedItem.recommendedTimeSec} giây</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-300">{selectedItem.wordCount} chữ</span>
                </div>
                <div className="w-48 sm:w-64 bg-slate-800 rounded-full h-2 mt-2 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-cyan-400 h-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                  isTimerRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/30'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isTimerRunning ? 'Tạm Dừng' : 'Bắt Đầu Đọc'}
              </button>

              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setSecondsRemaining(selectedItem.recommendedTimeSec);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                title="Khởi động lại đồng hồ"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => speakText(selectedItem.contentJapanese)}
                className="p-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 hover:bg-cyan-900 transition-all"
                title="Phát âm tiếng Nhật chuẩn"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reading Canvas */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-400" />
                {selectedItem.title}
              </h3>
              <div className="flex items-center gap-2">
                {selectedItem.pivotsAndConnectors.map((pivot, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300"
                  >
                    {pivot}
                  </span>
                ))}
              </div>
            </div>

            {/* Passage Content */}
            <div className="text-base text-slate-100 font-serif leading-relaxed tracking-wide whitespace-pre-line bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 selection:bg-teal-500/30">
              {selectedItem.contentJapanese}
            </div>

            {/* Pivot Sentence Toggle */}
            <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Câu Chốt Định Vị Luận Điểm (Core Pivot Sentence):
                </span>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="text-xs text-teal-400 hover:underline font-semibold"
                >
                  {showAnswer ? 'Ẩn Câu Chốt' : 'Hiển Thị Câu Chốt'}
                </button>
              </div>
              {showAnswer && (
                <div className="text-sm font-semibold text-white bg-slate-900/90 p-3 rounded-lg border border-teal-500/40">
                  {selectedItem.corePivotSentence}
                </div>
              )}
            </div>

            {/* Scanning Challenge Hunt */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Thử thách Scanning (Tìm điểm rơi từ khóa trong 5s):
                  </span>
                </div>
                <button
                  onClick={() => setScanningRevealed(!scanningRevealed)}
                  className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium transition-all"
                >
                  {scanningRevealed ? 'Đóng Gợi Ý' : 'Xem Vị Trí Từ Khóa'}
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Gợi ý: {selectedItem.scanningChallenge.targetHint} ➔ Hãy tìm từ:{' '}
                <span className="text-cyan-300 font-bold font-mono">
                  [{selectedItem.scanningChallenge.targetKeyword}]
                </span>
              </p>
              {scanningRevealed && (
                <div className="text-xs bg-slate-900 p-2.5 rounded border border-cyan-800/60 text-cyan-300">
                  Vị trí trong bài: {selectedItem.scanningChallenge.answerContext}
                </div>
              )}
            </div>

            {/* Quick Comprehension Check */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                Kiểm tra mức độ hiểu sâu sau khi đọc lướt:
              </div>
              {selectedItem.skimmingQuestions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3">
                  <p className="text-sm font-semibold text-white">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedQuestionOption === optIdx;
                      let btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (isQuestionSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                        } else if (isSelected && optIdx !== q.correctIndex) {
                          btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-teal-950/80 border-teal-500 text-teal-200';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => !isQuestionSubmitted && setSelectedQuestionOption(optIdx)}
                          className={`p-3 rounded-xl border text-xs md:text-sm cursor-pointer transition-all ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                              {optIdx + 1}
                            </span>
                            <span>{opt}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {!isQuestionSubmitted ? (
                    <button
                      onClick={() => setIsQuestionSubmitted(true)}
                      disabled={selectedQuestionOption === null}
                      className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                        selectedQuestionOption !== null
                          ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/30'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Kiểm Tra Đáp Án
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-teal-400">Giải thích: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Technique Insight */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-slate-900 to-teal-950/40 border border-teal-800/40">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5" />
                Chiến Thuật Tốc Đọc Chuyên Nghiệp:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedItem.techniqueExplanation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
