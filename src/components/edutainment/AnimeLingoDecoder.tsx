import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { AnimeLingoDecoderItem } from '../../types/edutainment';
import { initialAnimeLingoList, extraAnimeLingoList } from '../../data/edutainmentDatabase';
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
  Tv,
  AlertTriangle,
  HelpCircle,
  Info,
  Mic,
  Clapperboard,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const AnimeLingoDecoder: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<AnimeLingoDecoderItem[]>(initialAnimeLingoList);
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
      item.tropeName.toLowerCase().includes(q) ||
      item.iconicQuote.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.characterRoleType.toLowerCase().includes(q) ||
      item.translation.toLowerCase().includes(q) ||
      item.yakuwarigoAnalysis.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraAnimeLingoList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-950/80 via-purple-950/60 to-rose-950/40 p-6 sm:p-8 border border-violet-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold tracking-wide uppercase">
              <Tv className="w-3.5 h-3.5" />
              Mật Mã Anime, Manga & Thoại Nhân Vật Bất Hủ
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              53. Giải Mã Ngữ Khí Nhân Vật Yakuwarigo & Anime Tropes
            </h2>
            <p className="text-sm sm:text-base text-violet-200/80 max-w-2xl leading-relaxed">
              Bóc tách phong cách thoại của Tsundere, Chuunibyou, Kuudere, Yandere, Shonen Hero, Samurai lãng khách;
              phân tích ngôn ngữ vai vế Yakuwarigo và cẩm nang cảnh báo &quot;Cái nào dùng được ngoài đời vs Cái nào tuyệt đối cấm kỵ&quot;.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-500 hover:to-rose-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-violet-950/40 transition-all border border-violet-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-violet-900/60 border border-violet-800/60 text-xs font-medium text-violet-200">
              Tổng mô-típ: <span className="font-bold text-violet-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-violet-800/60">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-violet-900/50 text-violet-300 hover:text-white'
            }`}
          >
            Thẻ Thoại Anime (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-violet-900/50 text-violet-300 hover:text-white'
            }`}
          >
            Bảng Tra Cứu Mô-típ (Grid View)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-violet-900/50 text-violet-300 hover:text-white'
            }`}
          >
            Trắc Nghiệm Nhận Diện Yakuwarigo
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-violet-950/30 p-3 rounded-xl border border-violet-900/40">
        <div className="text-xs text-violet-300 font-medium pl-1 hidden sm:block">
          Tìm kiếm mô-típ nhân vật (Tsundere, Shonen, Samurai, Isekai...):
        </div>
        <div className="relative flex-1 sm:max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-violet-400" />
          <input
            type="text"
            placeholder="Tìm theo mô-típ, câu thoại, nhân vật..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-violet-900/40 border border-violet-800/60 text-xs text-violet-100 placeholder-violet-400/60 focus:outline-none focus:border-violet-500/60"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {filteredList.length === 0 ? (
        <div className="text-center py-12 bg-violet-950/20 rounded-2xl border border-violet-900/40 text-violet-300">
          Không tìm thấy mô-típ anime phù hợp.
        </div>
      ) : activeTab === 'card' ? (
        /* CARD VIEW */
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-violet-900/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Header controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-violet-900/40">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {currentItem.tropeName}
                </span>
                <span className="text-xs text-violet-400 hidden sm:inline">
                  Đặc trưng: {currentItem.characterRoleType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-violet-300 mr-2">
                  {currentIndex + 1} / {filteredList.length}
                </span>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-violet-900/50 hover:bg-violet-800 text-violet-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-violet-900/50 hover:bg-violet-800 text-violet-200 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Iconic Quote Display */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-950/50 via-purple-950/40 to-slate-900 border border-violet-800/50 space-y-3">
                <div className="flex items-center justify-between text-xs text-violet-400">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Clapperboard className="w-3.5 h-3.5 text-rose-400" /> Câu thoại kinh điển làm nên thương hiệu:
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.iconicQuote)}
                    className="p-1.5 rounded-lg bg-violet-500/20 text-violet-300 hover:bg-violet-500/40 transition-colors flex items-center gap-1 text-xs"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" /> Phát âm
                  </button>
                </div>

                <div className="text-xl sm:text-2xl font-black text-white leading-relaxed font-serif">
                  &quot;{currentItem.iconicQuote}&quot;
                </div>
                <div className="text-xs text-violet-300 font-mono">{currentItem.reading}</div>
                <div className="text-sm text-violet-200 italic">&quot;{currentItem.translation}&quot;</div>
              </div>

              {/* Yakuwarigo Analysis */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-900/40 text-xs sm:text-sm space-y-1">
                <span className="font-bold text-violet-300 block mb-1 flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-violet-400" /> Phân tích Ngữ khí vai vế (役割語 - Yakuwarigo):
                </span>
                <p className="text-violet-200 leading-relaxed">{currentItem.yakuwarigoAnalysis}</p>
              </div>

              {/* Real Life Danger Warning & Equivalent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1.5">
                  <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-500" /> Cảnh báo sử dụng ngoài đời thực:
                  </span>
                  <div className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-rose-900/40 border border-rose-800 text-rose-200 mb-1">
                    {currentItem.linguisticDepth.realLifeDangerLevel}
                  </div>
                  <p className="text-rose-200/90 leading-relaxed">
                    Độ lập dị: {currentItem.linguisticDepth.grammarQuirk}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1.5">
                  <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cách nói chuẩn mực ngoài đời thực thay thế:
                  </span>
                  <p className="text-emerald-200 leading-relaxed font-medium">
                    {currentItem.linguisticDepth.realLifeEquivalent}
                  </p>
                </div>
              </div>

              {/* Toggle Deep Explanation */}
              <div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 text-xs sm:text-sm font-semibold transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation
                    ? 'Thu gọn mục phân tích tâm lý & hậu trường Seiyuu'
                    : 'Xem mục giải thích chi tiết hơn: Lịch sử hình thành mô-típ, Tâm lý học nhân vật & Bí quyết lồng tiếng Seiyuu'}
                </button>
              </div>
            </div>

            {/* EXPANDABLE DEEP SECTION */}
            {showDeepExplanation && (
              <div className="mt-8 pt-6 border-t border-violet-900/40 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-violet-400 font-bold text-base">
                  <Info className="w-5 h-5" />
                  Mục Giải Thích Văn Hóa Anime & Tâm Lý Học Nhân Vật
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-900/60 space-y-1.5">
                    <span className="font-semibold text-violet-300 flex items-center gap-1.5">
                      <Tv className="w-4 h-4" /> Lịch sử hình thành mô-típ:
                    </span>
                    <p className="text-violet-200 leading-relaxed">
                      {currentItem.culturalDeepDive.tropeOrigin ||
                        currentItem.culturalDeepDive.animeHistoryContext}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-900/60 space-y-1.5">
                    <span className="font-semibold text-violet-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Tâm lý học đằng sau hình tượng:
                    </span>
                    <p className="text-violet-200 leading-relaxed">
                      {currentItem.culturalDeepDive.psychologicalArchetype}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-900/60 space-y-1.5">
                    <span className="font-semibold text-violet-300 flex items-center gap-1.5">
                      <Mic className="w-4 h-4" /> Sắc thái biểu cảm của Seiyuu:
                    </span>
                    <p className="text-violet-200 leading-relaxed">
                      {currentItem.culturalDeepDive.voiceActorNuance}
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
              className="p-5 rounded-2xl bg-slate-900/70 border border-violet-900/40 hover:border-violet-500/50 hover:bg-violet-950/30 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-medium">
                    {item.tropeName}
                  </span>
                  <span className="text-xs text-rose-400 font-mono text-[10px]">
                    {item.linguisticDepth.realLifeDangerLevel.includes('Tuyệt đối') ? '⚠️ Cấm dùng' : '💬 Dùng đùa'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors mb-1 font-serif line-clamp-2">
                  &quot;{item.iconicQuote}&quot;
                </h4>
                <div className="text-xs text-violet-400 font-mono mb-2">{item.reading}</div>
                <p className="text-xs text-violet-200 line-clamp-2 italic mb-2">
                  &quot;{item.translation}&quot;
                </p>
                <p className="text-xs text-violet-400 line-clamp-2">
                  Vai: {item.characterRoleType}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-violet-900/40 flex items-center justify-between text-xs text-violet-400">
                <span>Giải mã câu thoại</span>
                <ChevronRight className="w-3.5 h-3.5 text-violet-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* QUIZ VIEW */
        <div className="bg-slate-900/80 border border-violet-900/40 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-violet-900/40">
            <div className="flex items-center gap-2 text-violet-400 font-bold text-base">
              <HelpCircle className="w-5 h-5" />
              Trắc Nghiệm Kiến Thức Anime & Yakuwarigo ({currentIndex + 1} / {filteredList.length})
            </div>
            <button
              onClick={() => setSelectedQuizAnswer(null)}
              className="text-xs text-violet-400 hover:text-violet-200 flex items-center gap-1"
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
                let btnStyle = 'bg-violet-950/40 hover:bg-violet-900/50 border-violet-800/50 text-violet-100';

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
                    <span className="w-6 h-6 rounded-full bg-violet-800/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
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
              <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-900/50 text-violet-200 text-xs sm:text-sm animate-fadeIn leading-relaxed">
                <span className="font-bold text-violet-300 block mb-1">
                  {selectedQuizAnswer === currentItem.quiz.correctIndex ? 'Chính xác!' : 'Giải thích kiến thức anime chuẩn:'}
                </span>
                {currentItem.quiz.explanation}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-violet-900/40">
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-violet-900/50 hover:bg-violet-800 text-violet-200 text-xs sm:text-sm font-medium transition-colors"
            >
              Mô-típ trước
            </button>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Mô-típ tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
