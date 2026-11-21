import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { KaraokeCultureItem } from '../../types/edutainment';
import { initialKaraokeList, extraKaraokeList } from '../../data/edutainmentDatabasePart2';
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
  Mic2,
  Flame,
  Users,
  Building,
  HelpCircle,
  Info,
  Lightbulb,
  PartyPopper,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const KaraokeCultureLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<KaraokeCultureItem[]>(initialKaraokeList);
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
      item.karaokeScenario.toLowerCase().includes(q) ||
      item.keyPhrase.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.translation.toLowerCase().includes(q) ||
      item.hypeEnergyLevel.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraKaraokeList.map((item, idx) => ({
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

  const getEnergyBadgeColor = (level: string) => {
    switch (level) {
      case 'Hò reo bùng nổ (100%)':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Lịch thiệp công sở':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Thả thính ngọt ngào':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'Cứu nguy không khí':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/80 via-red-950/60 to-purple-950/40 p-6 sm:p-8 border border-rose-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide uppercase">
              <Mic2 className="w-3.5 h-3.5" />
              Văn Hóa Phòng Hát & Tiếng Nhật Khuấy Động Không Khí
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              59. Karaoke Etiquette & Tiếng Nhật Phòng Hát (カラオケ文化)
            </h2>
            <p className="text-sm sm:text-base text-rose-200/80 max-w-2xl leading-relaxed">
              Làm chủ nghệ thuật tăng nhiệt (Moriage) trong tiệc rượu Nomikai: Kỹ thuật tung hứng Ainomote,
              nghi thức chọn bài nhường sếp, giải mã từ vựng bài tủ Ohako (十八番) và nghệ thuật khen ngợi tự nhiên chuẩn người bản xứ.
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
              Tổng kịch bản phòng hát: <span className="font-bold text-rose-400">{list.length}</span>
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
            Kịch Bản Thực Chiến (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-900/50 text-rose-300 hover:text-white'
            }`}
          >
            Ma Trận Khẩu Lệnh (Grid View)
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
            Trắc Nghiệm Nghi Thức (Quiz Mode)
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tình huống, khẩu lệnh, khen ngợi, sếp..."
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
              Kịch bản {currentIndex + 1} / {filteredList.length}
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
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getEnergyBadgeColor(currentItem.hypeEnergyLevel)}`}>
                  {currentItem.hypeEnergyLevel}
                </span>
                <button
                  onClick={() => handleSpeak(currentItem.keyPhrase)}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 font-medium transition-colors border border-rose-500/30"
                >
                  <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                  Nghe âm thanh mẫu
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {currentItem.karaokeScenario}
              </h3>

              {/* Key Phrase Showcase */}
              <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-rose-950/60 via-red-950/40 to-slate-950 border border-rose-700/30 relative">
                <div className="text-xs font-semibold text-rose-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
                  Khẩu Lệnh Vàng / Câu Nói Chuẩn Người Bản Xứ (キーフレーズ)
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white leading-relaxed tracking-wide font-sans">
                  {currentItem.keyPhrase}
                </div>
                <div className="text-xs sm:text-sm text-rose-200/70 font-mono mt-3 leading-relaxed">
                  {currentItem.reading}
                </div>
                <div className="mt-4 pt-3 border-t border-rose-800/40 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  <span className="text-rose-400 font-semibold block mb-0.5">Dịch nghĩa tình huống:</span>
                  {currentItem.translation}
                </div>
              </div>

              {/* Toggle Deep Explanation */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation ? 'Thu gọn phân tích văn hóa' : 'Xem mục giải thích chi tiết hơn'}
                </button>
              </div>

              {/* Deep Explanation Panel */}
              {showDeepExplanation && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Linguistic & Reaction Technique */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                        <Info className="w-4 h-4" />
                        Ngữ Pháp Đối Đáp & Khen Ngợi
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <span className="text-slate-400 font-semibold block">Ngữ pháp đối đáp tung hứng:</span>
                        {currentItem.linguisticDepth.callAndResponseGrammar}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Nghệ thuật khen ngợi tự nhiên:</span>
                        {currentItem.linguisticDepth.flatteryComplimentTech}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Thuật ngữ chuyên ngành máy hát:</span>
                        {currentItem.linguisticDepth.karaokeLingoGlossary}
                      </div>
                    </div>

                    {/* Cultural Deep Dive */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        Quy Tắc Ngầm & Cội Nguồn Karaoke
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <span className="text-slate-400 font-semibold block">Cội nguồn phát minh Kobe:</span>
                        {currentItem.culturalDeepDive.kobeOriginStory}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Quy tắc ngầm trong tiệc rượu Nomikai:</span>
                        {currentItem.culturalDeepDive.unspokenRulesOfNomikai}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Tâm lý học giải tỏa căng thẳng:</span>
                        {currentItem.culturalDeepDive.stressReleasePsychology}
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
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                Trắc nghiệm văn hóa phòng hát
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
                          ? 'bg-rose-950/60 border-rose-500/80 text-rose-200'
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
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getEnergyBadgeColor(item.hypeEnergyLevel)}`}>
                  {item.hypeEnergyLevel}
                </span>
              </div>
              <div className="font-bold text-white text-base group-hover:text-rose-300 transition-colors">
                {item.karaokeScenario}
              </div>
              <div className="text-xs font-mono text-rose-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 line-clamp-1">
                {item.keyPhrase}
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
                Tình huống {currentIndex + 1} / {filteredList.length}
              </span>
              <span>{currentItem.karaokeScenario}</span>
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
                Tình huống trước
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  setSelectedQuizAnswer(null);
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs text-white font-semibold"
              >
                Tình huống kế tiếp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
