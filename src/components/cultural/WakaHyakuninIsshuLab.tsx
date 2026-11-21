import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { WakaHyakuninIsshuItem } from '../../types/culturalPart5';
import { initialWakaList, extraWakaList } from '../../data/culturalLearningDatabasePart5';
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
  HelpCircle,
  Info,
  Lightbulb,
  Feather,
  Layers,
  Scroll,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const WakaHyakuninIsshuLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<WakaHyakuninIsshuItem[]>(initialWakaList);
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
      item.poemTitle.toLowerCase().includes(q) ||
      item.poetName.toLowerCase().includes(q) ||
      item.poemKanaAndKanji.toLowerCase().includes(q) ||
      item.translation.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraWakaList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/80 via-red-950/60 to-purple-950/50 p-6 sm:p-8 border border-rose-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide uppercase">
              <Feather className="w-3.5 h-3.5" />
              100 Bài Thơ Cổ Bách Nhân Nhất Thủ & Mỹ Cảm Heian
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              71. Thơ Ca Cổ Điển Waka & Ogura Hyakunin Isshu (小倉百人一首)
            </h2>
            <p className="text-sm sm:text-base text-rose-200/80 max-w-2xl leading-relaxed">
              Khám phá thể thơ Tanka 31 âm tiết (5-7-5-7-7), nghệ thuật gieo gối từ (枕詞 Makurakotoba), từ đa nghĩa (掛詞 Kakekotoba) và từ chỉ mùa (季語 Kigo);
              cảm thụ kiệt tác của Thiên hoàng Tenji, Ono no Komachi, Narihira và bộ môn thi đấu trí tuệ Kyogi Karuta.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-rose-950/40 transition-all border border-rose-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-rose-900/60 border border-rose-800/60 text-xs font-medium text-rose-200">
              Tổng thi phẩm: <span className="font-bold text-rose-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-rose-800/60">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-900/50 text-rose-300 hover:text-white'
            }`}
          >
            Thẻ Ngâm Thơ Waka (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-900/50 text-rose-300 hover:text-white'
            }`}
          >
            Bảng Thi Phẩm Cổ (Grid View)
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setSelectedQuizAnswer(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-900/50 text-rose-300 hover:text-white'
            }`}
          >
            Trắc Nghiệm Tu Từ Waka (Quiz Mode)
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo thi sĩ, câu thơ, bản dịch..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-rose-500"
          />
        </div>

        {activeTab === 'card' && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 self-end sm:self-auto">
            <span>
              Bài thơ {currentIndex + 1} / {filteredList.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                  setSelectedQuizAnswer(null);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  setSelectedQuizAnswer(null);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'card' && currentItem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Card (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  {currentItem.poetName}
                </span>
                <button
                  onClick={() => handleSpeak(currentItem.poemKanaAndKanji)}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 font-medium transition-colors border border-rose-500/30"
                >
                  <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                  Ngâm thơ Tanka
                </button>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-300 mb-2">
                {currentItem.poemTitle}
              </h3>

              {/* Poem Box */}
              <div className="my-6 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-rose-950/60 via-purple-950/40 to-slate-950 border border-rose-700/40">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-widest leading-loose font-serif text-center sm:text-left">
                  {currentItem.poemKanaAndKanji}
                </div>
                <div className="text-xs sm:text-sm text-rose-200/80 font-mono mt-3 leading-relaxed">
                  {currentItem.reading}
                </div>
                <div className="mt-4 pt-3 border-t border-rose-800/40 text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                  <span className="text-rose-400 font-semibold block mb-0.5">Dịch thơ:</span>
                  {currentItem.translation}
                </div>
              </div>

              {/* Rhetorical Devices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-rose-400 uppercase">Gối Từ (枕詞):</div>
                  <div className="text-xs text-slate-300">{currentItem.rhetoricalDevices.makurakotoba}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-purple-400 uppercase">Từ Đa Nghĩa (掛詞):</div>
                  <div className="text-xs text-slate-300">{currentItem.rhetoricalDevices.kakekotoba}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-amber-400 uppercase">Từ Chỉ Mùa (季語):</div>
                  <div className="text-xs text-slate-300">{currentItem.rhetoricalDevices.kigo}</div>
                </div>
              </div>

              {/* Background */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-rose-400 uppercase block mb-1">Bối cảnh lịch sử ra đời bài thơ:</span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentItem.poeticBackground}
                </p>
              </div>

              {/* Toggle Deep Explanation */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation ? 'Thu gọn phân tích thi ca' : 'Xem mục giải thích chi tiết hơn'}
                </button>
              </div>

              {/* Deep Explanation Panel */}
              {showDeepExplanation && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase">
                      <Info className="w-4 h-4" />
                      Mỹ Học Cảm Thụ Mono No Aware
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentItem.culturalExplanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Quiz & Stats Sidebar (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                Trắc nghiệm thi ca cổ điển
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                {currentItem.quiz.question}
              </p>

              <div className="space-y-2 pt-2">
                {currentItem.quiz.options.map((opt, oIdx) => {
                  const isSelected = selectedQuizAnswer === oIdx;
                  const isCorrect = oIdx === currentItem.quiz.correctIndex;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => setSelectedQuizAnswer(oIdx)}
                      className={`w-full text-left p-3 rounded-xl text-xs transition-all border ${
                        selectedQuizAnswer === null
                          ? 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800 text-slate-300'
                          : isCorrect
                          ? 'bg-rose-950/60 border-rose-500/80 text-rose-200 font-semibold'
                          : isSelected
                          ? 'bg-amber-950/60 border-amber-500/80 text-amber-200'
                          : 'bg-slate-950/30 border-slate-800/40 text-slate-500'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-slate-400">{oIdx + 1}.</span>
                        <span className="flex-1 leading-snug">{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedQuizAnswer !== null && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed animate-fadeIn">
                  <div className="font-semibold text-rose-400 mb-1">
                    {selectedQuizAnswer === currentItem.quiz.correctIndex ? 'Chính xác! 🎉' : 'Chưa đúng rồi!'}
                  </div>
                  {currentItem.quiz.explanation}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid Tab */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
          {filteredList.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setActiveTab('card');
              }}
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-rose-500/50 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-rose-400 font-semibold">#{idx + 1}</span>
                <span className="truncate max-w-[150px]">{item.poetName}</span>
              </div>
              <div className="text-base font-bold text-white group-hover:text-rose-300 transition-colors font-serif">
                {item.poemKanaAndKanji}
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">
                {item.translation}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-rose-400">
                Thi phẩm {currentIndex + 1} / {filteredList.length}
              </span>
              <span>{currentItem.poetName}</span>
            </div>

            <div className="text-base sm:text-lg font-bold text-white">
              {currentItem.quiz.question}
            </div>

            <div className="space-y-3 pt-2">
              {currentItem.quiz.options.map((opt, oIdx) => {
                const isSelected = selectedQuizAnswer === oIdx;
                const isCorrect = oIdx === currentItem.quiz.correctIndex;
                return (
                  <button
                    key={oIdx}
                    onClick={() => setSelectedQuizAnswer(oIdx)}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                      selectedQuizAnswer === null
                        ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200'
                        : isCorrect
                        ? 'bg-rose-950 border-rose-500 text-rose-200 font-semibold'
                        : isSelected
                        ? 'bg-amber-950 border-amber-500 text-amber-200'
                        : 'bg-slate-950/40 border-slate-800/40 text-slate-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-slate-400">{oIdx + 1}.</span>
                      <span className="flex-1">{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedQuizAnswer !== null && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2 animate-fadeIn">
                <div className="font-bold text-rose-400 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  {selectedQuizAnswer === currentItem.quiz.correctIndex
                    ? 'Chính xác xuất sắc! 🎉'
                    : 'Chưa chính xác!'}
                </div>
                <p className="leading-relaxed">{currentItem.quiz.explanation}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                  setSelectedQuizAnswer(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
              >
                Mục trước
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  setSelectedQuizAnswer(null);
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs text-white font-semibold"
              >
                Mục kế tiếp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
