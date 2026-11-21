import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { ShiritoriWordChainItem } from '../../types/edutainment';
import { initialShiritoriList, extraShiritoriList } from '../../data/edutainmentDatabasePart2';
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
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  Info,
  Lightbulb,
  Zap,
  Clock,
  Compass,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const ShiritoriWordChainLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<ShiritoriWordChainItem[]>(initialShiritoriList);
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
      item.chainTitle.toLowerCase().includes(q) ||
      item.startWord.kanji.toLowerCase().includes(q) ||
      item.startWord.reading.toLowerCase().includes(q) ||
      item.connectedWord.kanji.toLowerCase().includes(q) ||
      item.connectedWord.reading.toLowerCase().includes(q) ||
      item.killerWordTip.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraShiritoriList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/80 via-teal-950/60 to-cyan-950/40 p-6 sm:p-8 border border-emerald-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5" />
              Đấu Trí Ngữ Âm & Phản Xạ Nối Từ Đỉnh Cao
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              57. Shiritori Đấu Trí & Đảo Âm Từ Vựng (しりとり)
            </h2>
            <p className="text-sm sm:text-base text-emerald-200/80 max-w-2xl leading-relaxed">
              Vượt qua trò chơi dân gian 1.000 năm tuổi thời Heian: Luyện chiến thuật nối từ hiểm hóc (đòn khóa chữ る, ぬ),
              nhận diện bẫy âm ん (N), giải mã nhịp Mora âm tiết Katakana và mở rộng vốn từ vựng phản xạ siêu tốc.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-emerald-950/40 transition-all border border-emerald-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-emerald-900/60 border border-emerald-800/60 text-xs font-medium text-emerald-200">
              Tổng cặp chuỗi: <span className="font-bold text-emerald-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-emerald-800/60">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-900/50 text-emerald-300 hover:text-white'
            }`}
          >
            Đấu Trí Shiritori (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-900/50 text-emerald-300 hover:text-white'
            }`}
          >
            Ma Trận Chuỗi Từ (Grid View)
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setSelectedQuizAnswer(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-900/50 text-emerald-300 hover:text-white'
            }`}
          >
            Trắc Nghiệm Phản Xạ (Quiz Mode)
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo từ Hán tự, Hiragana, đòn khóa chữ..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {activeTab === 'card' && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 self-end sm:self-auto">
            <span>
              Cặp {currentIndex + 1} / {filteredList.length}
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
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  {currentItem.chainTitle}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentItem.linguisticDepth.jlptLevelRange}
                </span>
              </div>

              {/* Shiritori Visual Connection */}
              <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-teal-950/40 border border-emerald-800/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center relative">
                  {/* Word 1 */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 relative">
                    <div className="text-xs text-emerald-400 font-semibold mb-1 flex items-center justify-between">
                      <span>Từ Xuất Phát (Word A)</span>
                      <button
                        onClick={() => handleSpeak(currentItem.startWord.reading)}
                        className="text-emerald-400 hover:text-emerald-300"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-2xl font-bold text-white tracking-wide">
                      {currentItem.startWord.kanji}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-1">
                      {currentItem.startWord.reading}
                    </div>
                    <div className="text-xs text-slate-300 mt-2">
                      {currentItem.startWord.meaning}
                    </div>
                    <div className="mt-3 inline-block px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                      Âm đuôi nối: {currentItem.startWord.lastMora}
                    </div>
                  </div>

                  {/* Word 2 */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 relative">
                    <div className="text-xs text-teal-400 font-semibold mb-1 flex items-center justify-between">
                      <span>Từ Nối Tiếp (Word B)</span>
                      <button
                        onClick={() => handleSpeak(currentItem.connectedWord.reading)}
                        className="text-teal-400 hover:text-teal-300"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-2xl font-bold text-white tracking-wide">
                      {currentItem.connectedWord.kanji}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-1">
                      {currentItem.connectedWord.reading}
                    </div>
                    <div className="text-xs text-slate-300 mt-2">
                      {currentItem.connectedWord.meaning}
                    </div>
                    <div className="mt-3 inline-block px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-300 text-xs font-bold">
                      Âm đầu nhận: {currentItem.connectedWord.firstMora}
                    </div>
                  </div>
                </div>
              </div>

              {/* Killer Word Tip & Trap Notice */}
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-amber-200/90">
                    <span className="font-bold text-amber-300 block mb-1">
                      Chiến Thuật & Đòn Khóa Hiểm Hóc:
                    </span>
                    {currentItem.killerWordTip}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-rose-200/90">
                    <span className="font-bold text-rose-300 block mb-1">
                      Cảnh Báo Bẫy Thua Cuộc Tức Thì:
                    </span>
                    {currentItem.trapNotice}
                  </div>
                </div>
              </div>

              {/* Toggle Deep Explanation */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation ? 'Thu gọn phân tích chuyên sâu' : 'Xem mục giải thích chi tiết hơn'}
                </button>
              </div>

              {/* Deep Explanation Panel */}
              {showDeepExplanation && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Linguistic Depth */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <Info className="w-4 h-4" />
                        Góc Nhìn Ngôn Ngữ Học & Mora
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <span className="text-slate-400 font-semibold block">Quy tắc ngữ âm nhịp Mora:</span>
                        {currentItem.linguisticDepth.moraPhoneticsRule}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Mẹo nhớ Hán tự:</span>
                        {currentItem.linguisticDepth.kanjiMnemonic}
                      </div>
                    </div>

                    {/* Cultural Deep Dive */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                        <Compass className="w-4 h-4" />
                        Cội Nguồn Văn Hóa & Lịch Sử
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <span className="text-slate-400 font-semibold block">Nguồn gốc Heian:</span>
                        {currentItem.culturalDeepDive.heianDynastyOrigin}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Văn hóa đi tàu Shinkansen:</span>
                        {currentItem.culturalDeepDive.trainTravelTradition}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Giải đấu Shiritori chuyên nghiệp:</span>
                        {currentItem.culturalDeepDive.proCompetitiveShiritori}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Quiz & Stats Sidebar (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                Câu hỏi phản xạ nhanh
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
                          ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200'
                          : isSelected
                          ? 'bg-rose-950/60 border-rose-500/80 text-rose-200'
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
                  <div className="font-semibold text-emerald-400 mb-1">
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
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-emerald-400">#{idx + 1}</span>
                <span>{item.linguisticDepth.jlptLevelRange}</span>
              </div>
              <div className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                {item.chainTitle}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-emerald-400 font-bold">{item.startWord.kanji}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-teal-400 font-bold">{item.connectedWord.kanji}</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">
                {item.killerWordTip}
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
              <span className="font-semibold text-emerald-400">
                Câu hỏi {currentIndex + 1} / {filteredList.length}
              </span>
              <span>{currentItem.chainTitle}</span>
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
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-semibold'
                        : isSelected
                        ? 'bg-rose-950 border-rose-500 text-rose-200'
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
                <div className="font-bold text-emerald-400 flex items-center gap-2">
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
                Câu trước
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  setSelectedQuizAnswer(null);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-semibold"
              >
                Câu kế tiếp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
