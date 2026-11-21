import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { DajareWordplayItem } from '../../types/edutainment';
import { initialDajareList, extraDajareList } from '../../data/edutainmentDatabase';
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
  Smile,
  Flame,
  HelpCircle,
  Info,
  Lightbulb,
  Snowflake,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const DajareWordplayLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<DajareWordplayItem[]>(initialDajareList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.punTitle.toLowerCase().includes(q) ||
      item.japanesePunchline.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.translation.toLowerCase().includes(q) ||
      item.humorMechanism.toLowerCase().includes(q) ||
      item.linguisticDepth.homophonePair.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraDajareList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-fuchsia-950/70 via-purple-950/60 to-indigo-950/40 p-6 sm:p-8 border border-fuchsia-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-semibold tracking-wide uppercase">
              <Smile className="w-3.5 h-3.5" />
              Nghệ Thuật Hài Hước & Đỉnh Cao Phản Xạ Ngữ Âm
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              52. Đấu Trường Chơi Chữ Dajare & Nghệ Thuật Oyaji Gag
            </h2>
            <p className="text-sm sm:text-base text-fuchsia-200/80 max-w-2xl leading-relaxed">
              Giải mã hiện tượng đồng âm ngắt nhịp (Mora), đảo vần Kaibun và văn hóa tấu hài Rakugo / Manzai;
              tập cười và phản xạ với những câu đùa chơi chữ kinh điển khiến người Nhật vừa ôm bụng cười vừa thốt lên &quot;Samui!&quot;.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-fuchsia-950/40 transition-all border border-fuchsia-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-purple-900/60 border border-purple-800/60 text-xs font-medium text-fuchsia-200">
              Tổng câu chơi chữ: <span className="font-bold text-fuchsia-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-purple-800/60">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-fuchsia-600 text-white shadow-md'
                : 'bg-purple-900/50 text-purple-300 hover:text-white'
            }`}
          >
            Thẻ Chơi Chữ Hài Hước (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-fuchsia-600 text-white shadow-md'
                : 'bg-purple-900/50 text-purple-300 hover:text-white'
            }`}
          >
            Bảng Tổng Hợp Dajare (Grid View)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-fuchsia-600 text-white shadow-md'
                : 'bg-purple-900/50 text-purple-300 hover:text-white'
            }`}
          >
            Trắc Nghiệm Phản Xạ Bắt Miếng Hài Chơi Chữ
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-purple-950/30 p-3 rounded-xl border border-purple-900/40">
        <div className="text-xs text-purple-300 font-medium pl-1 hidden sm:block">
          Tìm kiếm câu chơi chữ, từ đồng âm, cơ chế gây cười:
        </div>
        <div className="relative flex-1 sm:max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            placeholder="Tìm kiếm Dajare (アルミ缶, パンダ, サケ...)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-purple-900/40 border border-purple-800/60 text-xs text-purple-100 placeholder-purple-400/60 focus:outline-none focus:border-fuchsia-500/60"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {filteredList.length === 0 ? (
        <div className="text-center py-12 bg-purple-950/20 rounded-2xl border border-purple-900/40 text-purple-300">
          Không tìm thấy câu chơi chữ phù hợp.
        </div>
      ) : activeTab === 'card' ? (
        /* CARD VIEW */
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-purple-900/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Header controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-900/40">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                  {currentItem.punTitle}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-purple-950 border border-purple-800/60 text-purple-300 flex items-center gap-1">
                  <Snowflake className="w-3 h-3 text-cyan-400" /> Độ lạnh (Samui): {currentItem.samuiLevel}/5
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-purple-300 mr-2">
                  {currentIndex + 1} / {filteredList.length}
                </span>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-purple-900/50 hover:bg-purple-800 text-purple-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-purple-900/50 hover:bg-purple-800 text-purple-200 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Giant Punchline Display */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-fuchsia-950/40 via-purple-950/40 to-slate-900 border border-fuchsia-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-4xl font-black text-fuchsia-200">
                      {currentItem.japanesePunchline}
                    </span>
                    <button
                      onClick={() => handleSpeak(currentItem.japanesePunchline)}
                      className="p-2 rounded-full bg-fuchsia-500/20 text-fuchsia-300 hover:bg-fuchsia-500/40 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-purple-300 font-mono">{currentItem.reading}</div>
                  <div className="text-base text-white font-medium italic mt-2">
                    &quot;{currentItem.translation}&quot;
                  </div>
                </div>

                <div className="sm:max-w-xs p-3.5 rounded-xl bg-purple-900/40 border border-purple-800/60 text-xs text-purple-200">
                  <span className="font-bold text-fuchsia-300 block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Bí mật cơ chế gây cười:
                  </span>
                  {currentItem.humorMechanism}
                </div>
              </div>

              {/* Linguistic Depth Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-purple-900/40 space-y-1">
                  <span className="font-semibold text-fuchsia-300 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-fuchsia-400" /> Cặp từ đồng âm then chốt:
                  </span>
                  <p className="text-purple-200 leading-relaxed font-mono">
                    {currentItem.linguisticDepth.homophonePair}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-purple-900/40 space-y-1">
                  <span className="font-semibold text-fuchsia-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-fuchsia-400" /> Phân tích âm tiết Mora:
                  </span>
                  <p className="text-purple-200 leading-relaxed">
                    {currentItem.linguisticDepth.moraSyllableBreakdown}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-purple-900/40 space-y-1">
                  <span className="font-semibold text-fuchsia-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-fuchsia-400" /> Điểm ngữ pháp / từ vựng JLPT:
                  </span>
                  <p className="text-purple-200 leading-relaxed">
                    {currentItem.linguisticDepth.jlptGrammarOrVocabPoint}
                  </p>
                </div>
              </div>

              {/* Toggle Deep Explanation */}
              <div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-fuchsia-600/20 hover:bg-fuchsia-600/30 text-fuchsia-300 border border-fuchsia-500/30 text-xs sm:text-sm font-semibold transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation
                    ? 'Thu gọn mục giải thích văn hóa hài kịch Rakugo / Manzai'
                    : 'Xem mục giải thích chi tiết hơn: Nguồn gốc tấu hài Rakugo, Phản ứng người Nhật & Cách dùng trong tiệc Nomikai'}
                </button>
              </div>
            </div>

            {/* EXPANDABLE DEEP SECTION */}
            {showDeepExplanation && (
              <div className="mt-8 pt-6 border-t border-purple-900/40 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-fuchsia-400 font-bold text-base">
                  <Info className="w-5 h-5" />
                  Mục Giải Thích Văn Hóa Hài Hước & Hậu Trường Dajare Chuyên Sâu
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/60 space-y-1.5">
                    <span className="font-semibold text-fuchsia-300 flex items-center gap-1.5">
                      <Smile className="w-4 h-4" /> Nguồn gốc kịch tấu Rakugo / Manzai:
                    </span>
                    <p className="text-purple-200 leading-relaxed">
                      {currentItem.culturalDeepDive.rakugoManzaiOrigin}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/60 space-y-1.5">
                    <span className="font-semibold text-fuchsia-300 flex items-center gap-1.5">
                      <Snowflake className="w-4 h-4" /> Phản ứng thực tế của người Nhật:
                    </span>
                    <p className="text-purple-200 leading-relaxed">
                      {currentItem.culturalDeepDive.howJapaneseReact}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/60 space-y-1.5">
                    <span className="font-semibold text-fuchsia-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Lời khuyên sử dụng trong tiệc tùng:
                    </span>
                    <p className="text-purple-200 leading-relaxed">
                      {currentItem.culturalDeepDive.conversationalUsageAdvice}
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
                setActiveTab('card');
              }}
              className="p-5 rounded-2xl bg-slate-900/70 border border-purple-900/40 hover:border-fuchsia-500/50 hover:bg-purple-950/30 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-medium">
                    {item.punTitle}
                  </span>
                  <span className="text-xs text-purple-400 flex items-center gap-1">
                    <Snowflake className="w-3 h-3 text-cyan-400" /> {item.samuiLevel}/5
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-fuchsia-300 transition-colors mb-1">
                  {item.japanesePunchline}
                </h4>
                <div className="text-xs text-purple-300 font-mono mb-2">{item.reading}</div>
                <p className="text-xs text-purple-200 line-clamp-2 italic mb-2">
                  &quot;{item.translation}&quot;
                </p>
                <p className="text-xs text-purple-400 line-clamp-2">
                  Cơ chế: {item.humorMechanism}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-900/40 flex items-center justify-between text-xs text-purple-400">
                <span>Khám phá miếng hài</span>
                <ChevronRight className="w-3.5 h-3.5 text-purple-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* QUIZ VIEW */
        <div className="bg-slate-900/80 border border-purple-900/40 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
            <div className="flex items-center gap-2 text-fuchsia-400 font-bold text-base">
              <HelpCircle className="w-5 h-5" />
              Trắc Nghiệm Phản Xạ Bắt Miếng Hài ({currentIndex + 1} / {filteredList.length})
            </div>
            <button
              onClick={() => setSelectedQuizAnswer(null)}
              className="text-xs text-purple-400 hover:text-purple-200 flex items-center gap-1"
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
                let btnStyle = 'bg-purple-950/40 hover:bg-purple-900/50 border-purple-800/50 text-purple-100';

                if (selectedQuizAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500/70 text-emerald-200 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/60 border-rose-500/70 text-rose-200';
                  } else {
                    btnStyle = 'opacity-40 bg-slate-900 border-slate-800 text-slate-500';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={selectedQuizAnswer !== null}
                    onClick={() => setSelectedQuizAnswer(optIdx)}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-purple-800/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
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
              <div className="p-4 rounded-xl bg-fuchsia-950/30 border border-fuchsia-900/50 text-purple-200 text-xs sm:text-sm animate-fadeIn leading-relaxed">
                <span className="font-bold text-fuchsia-300 block mb-1">
                  {selectedQuizAnswer === currentItem.quiz.correctIndex ? 'Chính xác!' : 'Giải thích miếng hài chuẩn:'}
                </span>
                {currentItem.quiz.explanation}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-purple-900/40">
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-purple-200 text-xs sm:text-sm font-medium transition-colors"
            >
              Câu đùa trước
            </button>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Câu đùa tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
