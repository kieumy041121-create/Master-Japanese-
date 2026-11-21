import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { NazonazoRiddleItem } from '../../types/edutainment';
import { initialNazonazoList, extraNazonazoList } from '../../data/edutainmentDatabase';
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
  Brain,
  HelpCircle,
  Info,
  Lightbulb,
  Eye,
  Key,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const NazonazoRiddleMaster: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<NazonazoRiddleItem[]>(initialNazonazoList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const matchesType = filterType === 'all' || item.tonchiType.includes(filterType);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.riddleTitle.toLowerCase().includes(q) ||
      item.riddleQuestion.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.explanationOfWordplay.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraNazonazoList.map((item, idx) => ({
        ...item,
        id: `${item.id}_more_${extraLoadedCount + 1}_${idx}`,
      }));
      setList((prev) => [...prev, ...nextBatch]);
      setExtraLoadedCount((prev) => prev + 1);
      setIsLoadingMore(false);
    }, 350);
  };

  const handleSpeak = (text: string) => {
    speechService.speak(text);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/70 via-stone-900 to-emerald-950/40 p-6 sm:p-8 border border-amber-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
              <Brain className="w-3.5 h-3.5" />
              Đố Vui Trí Tuệ Dân Gian & Văn Hóa Tonchi Nhất Hưu
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              54. Thần Trí Đố Vui Nazonazo & Chiết Tự Chữ Hán
            </h2>
            <p className="text-sm sm:text-base text-amber-200/80 max-w-2xl leading-relaxed">
              Khám phá nghệ thuật ứng biến Tonchi (とんち) lừng danh của Thiền sư Ikkyu-san;
              thử thách não bộ với các câu đố mẹo chiết tự chữ Hán, câu đố đồng âm và văn hóa gameshow trí tuệ Nhật Bản.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-amber-950/40 transition-all border border-amber-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-stone-800/80 border border-stone-700/60 text-xs font-medium text-amber-200">
              Tổng câu đố: <span className="font-bold text-amber-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-stone-800/80">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-stone-800/60 text-stone-300 hover:text-white'
            }`}
          >
            Thử Thách Giải Đố (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-stone-800/60 text-stone-300 hover:text-white'
            }`}
          >
            Kho Câu Đố Dân Gian (Grid View)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-stone-800/60 text-stone-300 hover:text-white'
            }`}
          >
            Đố Vui Trí Tuệ Gameshow Nhật Bản
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-stone-900/50 p-3 rounded-xl border border-stone-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-stone-400 font-medium whitespace-nowrap pl-1">Loại hình câu đố:</span>
          {['all', 'Chiết tự chữ Hán', 'Đồng âm khác nghĩa', 'Đố mẹo tình huống'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setFilterType(t);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === t
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                  : 'bg-stone-800/50 text-stone-400 hover:text-stone-200 border border-stone-700/40'
              }`}
            >
              {t === 'all' ? 'Tất cả' : t}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Tìm theo câu đố, đáp án..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-stone-800/60 border border-stone-700/60 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/60"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {filteredList.length === 0 ? (
        <div className="text-center py-12 bg-stone-900/40 rounded-2xl border border-stone-800 text-stone-400">
          Không tìm thấy câu đố phù hợp.
        </div>
      ) : activeTab === 'card' ? (
        /* CARD VIEW */
        <div className="space-y-6">
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Header controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {currentItem.riddleTitle}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-stone-800 text-stone-300 border border-stone-700">
                  {currentItem.tonchiType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 mr-2">
                  {currentIndex + 1} / {filteredList.length}
                </span>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    setShowAnswer(false);
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    setShowAnswer(false);
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Riddle Question Section */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-900 border border-amber-900/50 space-y-3">
                <div className="flex items-center justify-between text-xs text-amber-400">
                  <span className="font-semibold flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" /> Câu đố tiếng Nhật dân gian:
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.riddleQuestion)}
                    className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 transition-colors flex items-center gap-1 text-xs"
                    title="Nghe câu đố"
                  >
                    <Volume2 className="w-4 h-4" /> Nghe đọc câu đố
                  </button>
                </div>

                <div className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
                  {currentItem.riddleQuestion}
                </div>
                <div className="text-xs text-stone-400 font-mono">{currentItem.reading}</div>
              </div>

              {/* Hint Box */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block mb-0.5">
                    Gợi ý tư duy mở khóa:
                  </span>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {currentItem.riddleHint}
                  </p>
                </div>
              </div>

              {/* Reveal Answer Button */}
              <div>
                {!showAnswer ? (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-amber-900/30 transition-all cursor-pointer active:scale-95"
                  >
                    <Key className="w-4 h-4" /> Mở khóa đáp án & Lời giải mã Tonchi
                  </button>
                ) : (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-stone-900 to-stone-950 border border-emerald-800/50 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Đáp án chính xác:
                      </span>
                      <button
                        onClick={() => handleSpeak(currentItem.answer)}
                        className="text-stone-400 hover:text-white flex items-center gap-1 text-xs"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Phát âm
                      </button>
                    </div>

                    <div className="text-xl sm:text-2xl font-black text-emerald-300">
                      {currentItem.answer}
                    </div>
                    {currentItem.answerReading && (
                      <div className="text-xs text-stone-400 font-mono">{currentItem.answerReading}</div>
                    )}

                    <div className="pt-2 border-t border-emerald-900/40 text-xs sm:text-sm text-stone-200 leading-relaxed">
                      <span className="font-semibold text-emerald-400 block mb-1">Giải mã bí mật chiết tự / chơi chữ:</span>
                      {currentItem.explanationOfWordplay}
                    </div>
                  </div>
                )}
              </div>

              {/* Toggle Deep Explanation */}
              <div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-semibold transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation
                    ? 'Thu gọn mục phân tích di sản Tonchi & Gameshow truyền hình'
                    : 'Xem mục giải thích chi tiết hơn: Cội nguồn Thiền sư Nhất Hưu Ikkyu, Văn hóa Quiz Show Nhật Bản & Lợi ích não bộ'}
                </button>
              </div>
            </div>

            {/* EXPANDABLE DEEP SECTION */}
            {showDeepExplanation && (
              <div className="mt-8 pt-6 border-t border-stone-800 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <Info className="w-5 h-5" />
                  Mục Giải Thích Văn Hóa Trí Tuệ Tonchi & Đố Vui Dân Gian
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Brain className="w-4 h-4" /> Cội nguồn trí khôn Thiền sư Ikkyu:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.ikkyuSanTonchiHeritage}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Eye className="w-4 h-4" /> Văn hóa Quiz Show truyền hình Nhật:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.japaneseQuizShowCulture}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Rèn luyện phản xạ não bộ:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.brainFlexBenefit}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : activeTab === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setShowAnswer(false);
                setActiveTab('card');
              }}
              className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-900 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-medium">
                    {item.tonchiType}
                  </span>
                  <span className="text-xs text-stone-500">Câu đố #{idx + 1}</span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {item.riddleTitle}
                </h4>
                <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed mb-3">
                  {item.riddleQuestion}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Bấm để giải đố</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* QUIZ VIEW */
        <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <HelpCircle className="w-5 h-5" />
              Đố Vui Trí Tuệ Gameshow Nhật Bản ({currentIndex + 1} / {filteredList.length})
            </div>
            <button
              onClick={() => setSelectedQuizAnswer(null)}
              className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Làm lại câu này
            </button>
          </div>

          <div className="space-y-4">
            <div className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {currentItem.quiz.question}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentItem.quiz.options.map((option, optIdx) => {
                const isSelected = selectedQuizAnswer === optIdx;
                const isCorrect = optIdx === currentItem.quiz.correctIndex;
                let btnStyle = 'bg-stone-800/60 hover:bg-stone-800 border-stone-700/60 text-stone-200';

                if (selectedQuizAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500/70 text-emerald-200 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/60 border-rose-500/70 text-rose-200';
                  } else {
                    btnStyle = 'opacity-40 bg-stone-900 border-stone-800 text-stone-500';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={selectedQuizAnswer !== null}
                    onClick={() => setSelectedQuizAnswer(optIdx)}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-stone-700/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed flex-1">{option}</span>
                    {selectedQuizAnswer !== null && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {selectedQuizAnswer !== null && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedQuizAnswer !== null && (
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/50 text-stone-300 text-xs sm:text-sm animate-fadeIn leading-relaxed">
                <span className="font-bold text-amber-300 block mb-1">
                  {selectedQuizAnswer === currentItem.quiz.correctIndex ? 'Chính xác tuyệt vời!' : 'Giải thích đáp án chuẩn:'}
                </span>
                {currentItem.quiz.explanation}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-stone-800">
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                setShowAnswer(false);
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs sm:text-sm font-medium transition-colors"
            >
              Câu đố trước
            </button>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                setShowAnswer(false);
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Câu đố tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
