import React, { useState, useMemo } from 'react';
import {
  SenseiDrillItem,
  CURATED_SENSEI_DRILLS,
  getDrillsByLevelAndCategory,
  getMoreSenseiDrills
} from '../../data/aiSenseiDrillData';
import { speechService } from '../../services/speechService';
import { JLPTLevel } from '../../types';
import {
  Award,
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  Flame,
  MessageSquare,
  BookOpen,
  Filter,
  Check,
  AlertTriangle,
  Lightbulb,
  Zap,
  Target,
  Plus
} from 'lucide-react';

interface Props {
  currentLevel: JLPTLevel;
  onOpenChatWithQuery: (query: string) => void;
}

export const AiSenseiDrillArenaTab: React.FC<Props> = ({
  currentLevel,
  onOpenChatWithQuery,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>(currentLevel || 'N1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [drills, setDrills] = useState<SenseiDrillItem[]>(CURATED_SENSEI_DRILLS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stats
  const [score, setScore] = useState<{ correct: number; total: number; streak: number; maxStreak: number }>({
    correct: 0,
    total: 0,
    streak: 0,
    maxStreak: 0,
  });

  // Filtered drills
  const filteredDrills = useMemo(() => {
    return drills.filter((d) => {
      const matchLevel = selectedLevel === 'all' || d.level === selectedLevel;
      const matchCat = selectedCategory === 'all' || d.category === selectedCategory;
      return matchLevel && matchCat;
    });
  }, [drills, selectedLevel, selectedCategory]);

  const currentDrill: SenseiDrillItem | undefined = filteredDrills[currentIndex] || filteredDrills[0];

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || !currentDrill) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);
    setShowExplanation(true);

    const chosen = currentDrill.options.find((o) => o.id === optionId);
    const isCorrect = !!chosen?.isCorrect;

    if (isCorrect) {
      speechService.playSuccessSound();
      setScore((prev) => {
        const nextStreak = prev.streak + 1;
        return {
          correct: prev.correct + 1,
          total: prev.total + 1,
          streak: nextStreak,
          maxStreak: Math.max(prev.maxStreak, nextStreak),
        };
      });
    } else {
      speechService.playErrorSound();
      setScore((prev) => ({
        ...prev,
        total: prev.total + 1,
        streak: 0,
      }));
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowExplanation(false);
    if (currentIndex < filteredDrills.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    speechService.playSuccessSound();
  };

  const handleResetScore = () => {
    setScore({ correct: 0, total: 0, streak: 0, maxStreak: 0 });
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setCurrentIndex(0);
    speechService.playSuccessSound();
  };

  const handleSpeakQuestion = () => {
    if (!currentDrill) return;
    const fullText = `${currentDrill.questionReading || currentDrill.question}`;
    speechService.speak(fullText);
  };

  const handleLoadMoreDrills = () => {
    const existingIds = drills.map((d) => d.id);
    const newDrills = getMoreSenseiDrills(existingIds, 3);
    setDrills((prev) => [...prev, ...newDrills]);
    speechService.playSuccessSound();
    setToastMessage(`Đã nạp thêm +${newDrills.length} câu hỏi bẫy thi & dấu sao ★ mới!`);
    setTimeout(() => setToastMessage(null), 3200);
    // Focus on new questions
    setCurrentIndex(filteredDrills.length);
  };

  const categories = [
    { id: 'all', label: 'Tất cả dạng bài', icon: Target },
    { id: 'star_order', label: '★ Sắp xếp câu sao', icon: Sparkles },
    { id: 'grammar_trap', label: '🎯 Bẫy ngữ pháp', icon: Award },
    { id: 'vocab_idiom', label: '⚡ Bẫy quán dụng ngữ', icon: Zap },
    { id: 'keigo_business', label: '💼 Kính ngữ B2B', icon: BookOpen },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-[#060a14] p-3 sm:p-5 md:p-6 space-y-4">
      {/* Top Banner & Stats Deck */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 border border-indigo-800/40 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Award className="w-5 h-5" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
              Đấu Trường Luyện Đề & Soi Bẫy JLPT
              <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                Chuẩn Thi Thật
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Thử thách bẻ khóa các câu hỏi hóc búa nhất kỳ thi JLPT (Dấu sao ★, bẫy trợ từ, kính ngữ đàm phán). Nhận lời phân tích thấu đáo từ GS. Yamato Kenji tại sao 90% thí sinh chọn sai!
          </p>
        </div>

        {/* Live Score Counter & +3 Button */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={handleLoadMoreDrills}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs shadow-lg shadow-emerald-950/50 border border-emerald-400/50 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.03] active:scale-[0.97]"
            title="Nạp thêm 3 câu hỏi luyện đề & bẫy sao mới"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+3 Tải Thêm Đề & Bẫy ★</span>
          </button>

          <div className="flex items-center gap-2.5 sm:gap-3 bg-slate-900/90 border border-indigo-900/50 p-2 rounded-xl shadow-inner">
            <div className="text-center px-2 py-0.5">
              <div className="text-[11px] font-bold text-slate-400">Điểm số</div>
              <div className="text-sm sm:text-base font-black text-white font-mono">
                <span className="text-emerald-400">{score.correct}</span> / {score.total}
              </div>
            </div>
            <div className="h-7 w-[1px] bg-slate-800" />
            <div className="text-center px-2 py-0.5">
              <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1 justify-center">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Chuỗi
              </div>
              <div className="text-sm sm:text-base font-black text-amber-400 font-mono">
                {score.streak} 🔥
              </div>
            </div>
            <div className="h-7 w-[1px] bg-slate-800" />
            <button
              onClick={handleResetScore}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Làm mới điểm số"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Toast Feedback when +3 is clicked */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs text-emerald-400 hover:text-white underline cursor-pointer shrink-0"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Filter Bar: Level & Category */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-950/90 border border-slate-800/80 p-2.5 rounded-xl">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {categories.map((c) => {
            const isCatActive = selectedCategory === c.id;
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCategory(c.id);
                  setCurrentIndex(0);
                  setSelectedOptionId(null);
                  setIsAnswered(false);
                  setShowExplanation(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isCatActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Level Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 px-1.5 hidden sm:inline">Cấp độ:</span>
          {['all', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => {
            const isActive = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                  setCurrentIndex(0);
                  setSelectedOptionId(null);
                  setIsAnswered(false);
                  setShowExplanation(false);
                }}
                className={`px-2 py-0.5 rounded text-xs font-bold font-mono transition-all cursor-pointer ${
                  isActive
                    ? lvl === 'N1'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-sm'
                      : 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl === 'all' ? 'Tất cả' : lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      {currentDrill ? (
        <div className="bg-slate-950/95 border border-indigo-900/40 rounded-2xl p-4 sm:p-6 space-y-5 shadow-2xl animate-fadeIn">
          {/* Header Badges */}
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-black font-mono bg-indigo-950 border border-indigo-600/50 text-indigo-300">
                JLPT {currentDrill.level}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-950/80 border border-purple-800/50 text-purple-300">
                {currentDrill.categoryLabel}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-700/40 text-amber-300 flex items-center gap-1">
                🔥 {currentDrill.realExamFrequencyBadge}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">
                Câu hỏi {currentIndex + 1} / {filteredDrills.length}
              </span>
              <button
                onClick={handleSpeakQuestion}
                className="px-2.5 py-1 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-indigo-300 hover:text-white flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
                title="Nghe phát âm chuẩn câu hỏi"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe câu hỏi</span>
              </button>
            </div>
          </div>

          {/* Drill Title */}
          <div className="text-sm font-semibold text-indigo-200">
            {currentDrill.title}
          </div>

          {/* The Japanese Question Sentence */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-indigo-900/50 space-y-2">
            <div className="text-base sm:text-xl font-black text-white font-jp leading-relaxed tracking-wide">
              {currentDrill.question}
            </div>

            {/* Furigana Reading */}
            {currentDrill.questionReading && (
              <div className="text-xs sm:text-sm text-slate-400 font-mono">
                {currentDrill.questionReading}
              </div>
            )}

            {/* Romaji */}
            {currentDrill.questionRomaji && (
              <div className="text-xs text-purple-300/80 font-mono italic">
                {currentDrill.questionRomaji}
              </div>
            )}

            {/* Star Order Pieces (If star problem) */}
            {currentDrill.starParts && currentDrill.starParts.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  ★ 4 Khối từ cần sắp xếp vào 4 chỗ trống (Chọn khối từ nằm ở vị trí dấu sao):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentDrill.starParts.map((part, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center text-xs font-bold text-slate-200 font-jp"
                    >
                      <span className="text-amber-400 mr-1.5 font-mono">{pIdx + 1}.</span>
                      {part}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vietnamese Translation Hint */}
            <div className="text-xs sm:text-sm text-slate-300 pt-2 border-t border-slate-800/80 flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold shrink-0">🇻🇳 Dịch nghĩa:</span>
              <span className="text-slate-200">{currentDrill.questionMeaningVn}</span>
            </div>
          </div>

          {/* 4 Interactive Options */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Chọn phương án trả lời đúng:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentDrill.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-indigo-600/80 hover:bg-slate-850';

                if (isAnswered) {
                  if (option.isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg shadow-rose-950/50';
                  } else {
                    btnStyle = 'bg-slate-950/50 border-slate-800/60 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isAnswered}
                    className={`p-3.5 rounded-xl border text-left font-jp transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-sm sm:text-base font-bold text-white">
                        {option.text}
                      </div>
                      {option.reading && (
                        <div className="text-[11px] text-slate-400 font-mono">
                          {option.reading}
                        </div>
                      )}
                    </div>

                    {isAnswered && (
                      <div className="shrink-0">
                        {option.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Master Explanation & Trap Breakdown from GS. Yamato */}
          {showExplanation && (
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/30 border border-indigo-700/60 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-indigo-800/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-extrabold text-white">
                    Bóc Tách Chuyên Sâu & Giải Mã Bẫy Đề Từ GS. Yamato Kenji
                  </h4>
                </div>
              </div>

              {/* Main Correct Explanation */}
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {currentDrill.correctExplanation}
              </div>

              {/* Trap breakdown for each option */}
              <div className="space-y-2 pt-1 border-t border-indigo-900/50">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  🔍 Soi bẫy từng phương án:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {currentDrill.options.map((opt, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg text-xs flex items-start gap-2 border ${
                        opt.isCorrect
                          ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="font-bold shrink-0">
                        {opt.isCorrect ? '✅ ' : '❌ '} {opt.text}:
                      </span>
                      <span className="leading-snug">{opt.trapReason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yamato Golden Rule Card */}
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-700/50 text-xs text-amber-200 space-y-1">
                <div className="font-extrabold text-amber-300 flex items-center gap-1.5 uppercase tracking-wide">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                  Bí Kíp Vàng Trong Phòng Thi (Yamato Golden Rule):
                </div>
                <p className="leading-relaxed font-medium">
                  "{currentDrill.yamatoGoldenRule}"
                </p>
              </div>

              {/* Next Question & Ask Sensei Actions */}
              <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
                <button
                  onClick={() =>
                    onOpenChatWithQuery(
                      `Sensei hãy phân tích cặn kẽ hơn nữa bẫy đề thi của câu hỏi JLPT ${currentDrill.level}: "${currentDrill.question}" và tại sao lại chọn "${currentDrill.options.find(o => o.isCorrect)?.text}" ạ!`
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-indigo-800 text-indigo-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span>Hỏi sâu Sensei trong Chat</span>
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-950 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Câu hỏi tiếp theo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-950 border border-slate-800 rounded-2xl text-slate-400 space-y-3">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
          <p className="text-sm">Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.</p>
          <button
            onClick={() => {
              setSelectedLevel('all');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
