import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { KanseiKotobaItem } from '../../types/cultural';
import { initialKanseiKotobaList, extraKanseiKotobaList } from '../../data/culturalLearningDatabasePart4';
import { speechService } from '../../services/speechService';
import {
  Heart,
  Volume2,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  RotateCcw,
  Plus,
  Search,
  Feather,
  Sun,
  HelpCircle,
  Info,
  Sparkles,
  Smile,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const KanseiKotobaHub: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<KanseiKotobaItem[]>(initialKanseiKotobaList);
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
      item.uniqueWord.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      (item.sinoVietnamese && item.sinoVietnamese.toLowerCase().includes(q)) ||
      item.untranslatableEssence.toLowerCase().includes(q) ||
      item.psychologicalResonance.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraKanseiKotobaList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/70 via-stone-900 to-teal-950/40 p-6 sm:p-8 border border-rose-900/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide uppercase">
              <Heart className="w-3.5 h-3.5" />
              Ngôn Ngữ Rung Động & Mỹ Cảm Tao Nhã
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              50. Ngôn Ngữ Học Cảm Xúc & Mỹ Cảm Nhật Bản Kansei Kotoba
            </h2>
            <p className="text-sm sm:text-base text-rose-200/80 max-w-2xl leading-relaxed">
              Đi sâu vào những từ ngữ độc nhất vô nhị không thể dịch trọn vẹn (Komorebi, Natsukashii, Setsunai,
              Ikigai, Yugen, Mono no Aware); kết nối với tâm hồn thơ ca và bài thực hành chánh niệm (Mindfulness).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-600 hover:to-rose-700 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-rose-950/40 transition-all border border-rose-500/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-stone-900/80 border border-stone-800 text-xs font-medium text-rose-300">
              Tổng từ mỹ cảm: <span className="font-bold text-rose-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-stone-800/80">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-stone-800/60 text-stone-400 hover:text-white'
            }`}
          >
            Thẻ Mỹ Cảm (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-stone-800/60 text-stone-400 hover:text-white'
            }`}
          >
            Bảng Từ Điển Cảm Xúc
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-stone-800/60 text-stone-400 hover:text-white'
            }`}
          >
            Trắc Nghiệm Cảm Thụ Mỹ Cảm & Thi Ca
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-stone-900/50 p-3 rounded-xl border border-stone-800">
        <div className="text-xs text-stone-400 font-medium pl-1 hidden sm:block">
          Khám phá những rung động tinh tế nhất trong tâm hồn người Nhật:
        </div>
        <div className="relative flex-1 sm:max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Tìm theo từ (木漏れ日, 懐かしい...), ý nghĩa tâm lý..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-stone-800/60 border border-stone-700/60 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-rose-500/60"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {filteredList.length === 0 ? (
        <div className="text-center py-12 bg-stone-900/40 rounded-2xl border border-stone-800 text-stone-400">
          Không tìm thấy từ ngữ cảm xúc phù hợp.
        </div>
      ) : activeTab === 'card' ? (
        /* CARD VIEW */
        <div className="space-y-6">
          <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Index Counter & Navigation */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {currentItem.poeticContext.artisticMood}
                </span>
                {currentItem.sinoVietnamese && (
                  <span className="text-xs px-2.5 py-1 rounded bg-stone-800 text-stone-300 border border-stone-700">
                    Hán-Việt: {currentItem.sinoVietnamese}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 mr-2">
                  {currentIndex + 1} / {filteredList.length}
                </span>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
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
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Word Display & Untranslatable Essence */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-stone-900 to-teal-950/20 border border-rose-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-5xl font-black text-rose-200 tracking-wider">
                      {currentItem.uniqueWord}
                    </span>
                    <button
                      onClick={() => handleSpeak(currentItem.uniqueWord)}
                      className="p-2 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-sm text-stone-400 font-mono mt-1">{currentItem.reading}</div>
                </div>

                <div className="sm:max-w-md">
                  <div className="text-xs font-semibold text-rose-400 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Tinh hoa không thể dịch thoát ý:
                  </div>
                  <p className="text-sm text-stone-200 leading-relaxed italic">
                    &quot;{currentItem.untranslatableEssence}&quot;
                  </p>
                </div>
              </div>

              {/* Psychological Resonance */}
              <div className="p-5 rounded-2xl bg-stone-800/40 border border-stone-700/60">
                <div className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-400" /> Sự Cộng Hưởng Tâm Lý Học Cảm Xúc:
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {currentItem.psychologicalResonance}
                </p>
              </div>

              {/* Poetic Context Sentence */}
              <div className="p-5 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5" /> Không gian thi ca & Câu văn mẫu:
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.poeticContext.japaneseSentence)}
                    className="text-stone-400 hover:text-white flex items-center gap-1 text-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Phát âm
                  </button>
                </div>
                <div className="text-base sm:text-lg font-bold text-white font-serif">
                  {currentItem.poeticContext.japaneseSentence}
                </div>
                <div className="text-xs text-stone-400 font-mono">{currentItem.poeticContext.reading}</div>
                <div className="text-xs sm:text-sm text-stone-300 italic font-serif">
                  &quot;{currentItem.poeticContext.translation}&quot;
                </div>
              </div>

              {/* Toggle Deep Explanation */}
              <div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs sm:text-sm font-semibold transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation
                    ? 'Thu gọn mục giải thích văn học & thực hành chánh niệm'
                    : 'Xem mục giải thích chi tiết hơn: Giao hòa thiên nhiên, Trích dẫn văn chương Murakami Haruki & Nghệ thuật im lặng'}
                </button>
              </div>
            </div>

            {/* EXPANDABLE DEEP SECTION */}
            {showDeepExplanation && (
              <div className="mt-8 pt-6 border-t border-rose-900/40 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                  <Info className="w-5 h-5" />
                  Mục Giải Thích Mỹ Cảm Văn Học & Thực Hành Chánh Niệm
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <Sun className="w-4 h-4" /> Cội nguồn Giao hòa với Thiên nhiên:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.natureHarmonyRoots}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <Feather className="w-4 h-4" /> Trích dẫn Thi ca Cổ hoặc Văn chương Hiện đại:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.literaryQuotations}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Thời điểm nên nói ra vs Giữ im lặng để cảm nhận:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.whenToUseWhenToStaySilent}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <Smile className="w-4 h-4" /> Ứng dụng như một bài Thực hành Chánh niệm (Mindfulness):
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.dailyMindfulnessPractice}
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
              className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-rose-500/50 hover:bg-stone-900 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-medium">
                    {item.poeticContext.artisticMood}
                  </span>
                  {item.sinoVietnamese && (
                    <span className="text-xs text-stone-500">{item.sinoVietnamese}</span>
                  )}
                </div>
                <h4 className="text-2xl font-bold text-white group-hover:text-rose-300 transition-colors mb-1">
                  {item.uniqueWord}
                </h4>
                <div className="text-xs text-stone-400 font-mono mb-2">{item.reading}</div>
                <p className="text-xs text-rose-200/90 font-medium line-clamp-2 mb-2 italic">
                  &quot;{item.untranslatableEssence}&quot;
                </p>
                <p className="text-xs text-stone-400 line-clamp-2">
                  {item.psychologicalResonance}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
                <span>Khám phá mỹ cảm</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* QUIZ VIEW */
        <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <HelpCircle className="w-5 h-5" />
              Trắc Nghiệm Cảm Thụ Mỹ Cảm & Thi Ca ({currentIndex + 1} / {filteredList.length})
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
                    <span className="w-6 h-6 rounded-full bg-stone-700/50 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
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
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/50 text-stone-300 text-xs sm:text-sm animate-fadeIn leading-relaxed">
                <span className="font-bold text-rose-300 block mb-1">
                  {selectedQuizAnswer === currentItem.quiz.correctIndex ? 'Chính xác!' : 'Giải thích đáp án chuẩn:'}
                </span>
                {currentItem.quiz.explanation}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-stone-800">
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs sm:text-sm font-medium transition-colors"
            >
              Từ trước
            </button>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Từ tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
