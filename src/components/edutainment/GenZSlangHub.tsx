import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { GenZSlangItem } from '../../types/edutainment';
import { initialGenZSlangList, extraGenZSlangList } from '../../data/edutainmentDatabase';
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
  MessageCircle,
  Smartphone,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Info,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const GenZSlangHub: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<GenZSlangItem[]>(initialGenZSlangList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.vibeCategory === filterCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.slangWord.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.romajiOrOrigin.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraGenZSlangList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-950/70 via-rose-950/60 to-purple-950/40 p-6 sm:p-8 border border-pink-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold tracking-wide uppercase">
              <TrendingUp className="w-3.5 h-3.5" />
              Từ Lóng Giới Trẻ, Gen Z Tokyo & Ngôn Ngữ TikTok
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              55. Trào Lưu Ngôn Ngữ Mạng Xã Hội, Gyaru & Gen Z Slang
            </h2>
            <p className="text-sm sm:text-base text-pink-200/80 max-w-2xl leading-relaxed">
              Khám phá thế giới ngôn từ sống động của giới trẻ Shibuya, Harajuku (草, それな, ぴえん, 蛙化現象, チルい, りょ);
              phân tích quy luật biến âm, bẫy nguy hiểm khi dùng nhầm và từ ngữ chuẩn mực tương ứng.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-pink-950/40 transition-all border border-pink-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-pink-900/60 border border-pink-800/60 text-xs font-medium text-pink-200">
              Tổng từ lóng: <span className="font-bold text-pink-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-pink-800/60">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-pink-900/50 text-pink-300 hover:text-white'
            }`}
          >
            Thẻ Từ Lóng (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-pink-900/50 text-pink-300 hover:text-white'
            }`}
          >
            Bảng Từ Lóng Thời Thượng (Grid View)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-pink-900/50 text-pink-300 hover:text-white'
            }`}
          >
            Trắc Nghiệm Phản Xạ Ngôn Ngữ Gen Z
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-pink-950/30 p-3 rounded-xl border border-pink-900/40">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-pink-300 font-medium whitespace-nowrap pl-1">Phân loại Vibe:</span>
          {['all', 'Mạng xã hội & Chat', 'Cảm xúc & Tâm trạng', 'Tình cảm & Hẹn hò', 'Đời sống học đường'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-pink-600/30 text-pink-300 border border-pink-500/50'
                  : 'bg-pink-900/40 text-pink-300/80 hover:text-pink-100 border border-pink-800/40'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" />
          <input
            type="text"
            placeholder="Tìm theo từ lóng, ý nghĩa..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-pink-900/40 border border-pink-800/60 text-xs text-pink-100 placeholder-pink-400/60 focus:outline-none focus:border-pink-500/60"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {filteredList.length === 0 ? (
        <div className="text-center py-12 bg-pink-950/20 rounded-2xl border border-pink-900/40 text-pink-300">
          Không tìm thấy từ lóng phù hợp.
        </div>
      ) : activeTab === 'card' ? (
        /* CARD VIEW */
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-pink-900/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Header controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-900/40">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {currentItem.vibeCategory}
                </span>
                <span className="text-xs text-pink-400 font-mono">
                  Gốc: {currentItem.romajiOrOrigin}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-pink-300 mr-2">
                  {currentIndex + 1} / {filteredList.length}
                </span>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-pink-900/50 hover:bg-pink-800 text-pink-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-pink-900/50 hover:bg-pink-800 text-pink-200 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Giant Slang Display */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-slate-900 border border-pink-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-5xl font-black text-pink-200">
                      {currentItem.slangWord}
                    </span>
                    <button
                      onClick={() => handleSpeak(currentItem.slangWord)}
                      className="p-2 rounded-full bg-pink-500/20 text-pink-300 hover:bg-pink-500/40 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-pink-300 font-mono">{currentItem.reading}</div>
                  <div className="text-base text-white font-semibold mt-2">
                    Ý nghĩa: {currentItem.meaning}
                  </div>
                </div>

                <div className="sm:max-w-xs p-3 rounded-xl bg-pink-900/40 border border-pink-800/60 text-xs text-pink-200">
                  <span className="font-bold text-pink-300 block mb-1 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5" /> Nguồn gốc & trào lưu:
                  </span>
                  {currentItem.romajiOrOrigin}
                </div>
              </div>

              {/* Sample LINE Chat Box */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-pink-900/40 space-y-3">
                <div className="flex items-center justify-between text-xs text-pink-400">
                  <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-400" /> Đoạn hội thoại mẫu trên LINE:
                  </span>
                  <button
                    onClick={() => handleSpeak(`${currentItem.sampleChat.userA}。${currentItem.sampleChat.userB}`)}
                    className="text-pink-300 hover:text-white flex items-center gap-1 text-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe hội thoại
                  </button>
                </div>

                {/* Chat Bubbles */}
                <div className="space-y-2.5 max-w-lg">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-700/60 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      A
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-sm bg-slate-800 text-xs sm:text-sm text-slate-100 border border-slate-700/70">
                      {currentItem.sampleChat.userA}
                    </div>
                  </div>

                  <div className="flex items-start justify-end gap-2.5">
                    <div className="p-3 rounded-2xl rounded-tr-sm bg-emerald-600/90 text-xs sm:text-sm text-white font-medium shadow-sm">
                      {currentItem.sampleChat.userB}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-pink-700/60 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      B
                    </div>
                  </div>
                </div>

                <div className="text-xs text-pink-300/90 italic pt-1 border-t border-slate-800/80">
                  Bản dịch: {currentItem.sampleChat.translation}
                </div>
              </div>

              {/* Linguistic Depth Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
                  <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-500" /> Bẫy nguy hiểm khi dùng sai đối tượng:
                  </span>
                  <p className="text-rose-200/90 leading-relaxed">
                    {currentItem.linguisticDepth.dangerOfMisuse}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                  <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Từ vựng / ngữ pháp chuẩn mực tương ứng:
                  </span>
                  <p className="text-emerald-200 leading-relaxed font-medium">
                    {currentItem.linguisticDepth.jlptCounterpart}
                  </p>
                </div>
              </div>

              {/* Toggle Deep Explanation */}
              <div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 text-xs sm:text-sm font-semibold transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation
                    ? 'Thu gọn mục phân tích xã hội học giới trẻ Nhật Bản'
                    : 'Xem mục giải thích chi tiết hơn: Lịch sử Shibuya Gyaru sang TikTok Gen Z, Tâm lý học xã hội & Tuổi thọ từ lóng'}
                </button>
              </div>
            </div>

            {/* EXPANDABLE DEEP SECTION */}
            {showDeepExplanation && (
              <div className="mt-8 pt-6 border-t border-pink-900/40 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-base">
                  <Info className="w-5 h-5" />
                  Mục Giải Thích Văn Hóa Giới Trẻ & Tâm Lý Học Ngôn Từ
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-900/60 space-y-1.5">
                    <span className="font-semibold text-pink-300 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" /> Dịch chuyển qua các thế hệ:
                    </span>
                    <p className="text-pink-200 leading-relaxed">
                      {currentItem.culturalDeepDive.generationEvolution}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-900/60 space-y-1.5">
                    <span className="font-semibold text-pink-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Bối cảnh tâm lý xã hội Gen Z:
                    </span>
                    <p className="text-pink-200 leading-relaxed">
                      {currentItem.culturalDeepDive.sociologicalInsight}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-900/60 space-y-1.5">
                    <span className="font-semibold text-pink-300 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4" /> Lưu ý về tuổi thọ từ lóng:
                    </span>
                    <p className="text-pink-200 leading-relaxed">
                      {currentItem.culturalDeepDive.trendLifetimeNotice}
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
              className="p-5 rounded-2xl bg-slate-900/70 border border-pink-900/40 hover:border-pink-500/50 hover:bg-pink-950/30 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-medium">
                    {item.vibeCategory}
                  </span>
                  <span className="text-xs text-pink-400 font-mono text-[10px]">{item.romajiOrOrigin}</span>
                </div>
                <h4 className="text-2xl font-bold text-white group-hover:text-pink-300 transition-colors mb-1">
                  {item.slangWord}
                </h4>
                <div className="text-xs text-pink-300 font-mono mb-2">{item.reading}</div>
                <p className="text-xs text-pink-100 font-medium line-clamp-2 mb-2">
                  {item.meaning}
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950/60 text-xs text-pink-300 line-clamp-2">
                  Hội thoại: &quot;{item.sampleChat.userB}&quot;
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-pink-900/40 flex items-center justify-between text-xs text-pink-400">
                <span>Khám phá từ lóng</span>
                <ChevronRight className="w-3.5 h-3.5 text-pink-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* QUIZ VIEW */
        <div className="bg-slate-900/80 border border-pink-900/40 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-pink-900/40">
            <div className="flex items-center gap-2 text-pink-400 font-bold text-base">
              <HelpCircle className="w-5 h-5" />
              Trắc Nghiệm Phản Xạ Ngôn Ngữ Gen Z ({currentIndex + 1} / {filteredList.length})
            </div>
            <button
              onClick={() => setSelectedQuizAnswer(null)}
              className="text-xs text-pink-400 hover:text-pink-200 flex items-center gap-1"
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
                let btnStyle = 'bg-pink-950/40 hover:bg-pink-900/50 border-pink-800/50 text-pink-100';

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
                    <span className="w-6 h-6 rounded-full bg-pink-800/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
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
              <div className="p-4 rounded-xl bg-pink-950/30 border border-pink-900/50 text-pink-200 text-xs sm:text-sm animate-fadeIn leading-relaxed">
                <span className="font-bold text-pink-300 block mb-1">
                  {selectedQuizAnswer === currentItem.quiz.correctIndex ? 'Chính xác!' : 'Giải thích đáp án chuẩn:'}
                </span>
                {currentItem.quiz.explanation}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-pink-900/40">
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-pink-900/50 hover:bg-pink-800 text-pink-200 text-xs sm:text-sm font-medium transition-colors"
            >
              Từ trước
            </button>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Từ tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
