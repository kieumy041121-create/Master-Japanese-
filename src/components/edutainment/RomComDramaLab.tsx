import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { RomComDramaItem } from '../../types/edutainment';
import { initialRomComList, extraRomComList } from '../../data/edutainmentDatabase';
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
  Sparkles,
  Film,
  Moon,
  HelpCircle,
  Info,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const RomComDramaLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<RomComDramaItem[]>(initialRomComList);
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
      item.situationTitle.toLowerCase().includes(q) ||
      item.dialogueJapanese.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.translation.toLowerCase().includes(q) ||
      item.linguisticDepth.indirectExpressionTechnique.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraRomComList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/80 via-red-950/60 to-purple-950/40 p-6 sm:p-8 border border-rose-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide uppercase">
              <Heart className="w-3.5 h-3.5" />
              Điện Ảnh J-Drama & Ngôn Ngữ Tình Cảm Munekyun
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              56. Ngôn Ngữ Tình Cảm J-Drama & Tình Huống Munekyun
            </h2>
            <p className="text-sm sm:text-base text-rose-200/80 max-w-2xl leading-relaxed">
              Đi sâu vào những câu thoại kinh điển làm tan chảy trái tim người xem (Mặt trăng đêm nay đẹp quá, Kabedon, Aiaigasa chung ô, Lỡ chuyến tàu cuối);
              khám phá tâm lý e thẹn Hazukashisa và nghệ thuật bày tỏ gián tiếp tinh tế của người Nhật.
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
              Tổng phân cảnh: <span className="font-bold text-rose-400">{list.length}</span>
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
            Phân Cảnh Lãng Mạn (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-900/50 text-rose-300 hover:text-white'
            }`}
          >
            Kịch Bản Tình Cảm (Grid View)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-900/50 text-rose-300 hover:text-white'
            }`}
          >
            Trắc Nghiệm Cảm Thụ Tình Huống Munekyun
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-rose-950/30 p-3 rounded-xl border border-rose-900/40">
        <div className="text-xs text-rose-300 font-medium pl-1 hidden sm:block">
          Tìm kiếm tình huống tình cảm J-Drama (Trăng đẹp, Tỏ tình, Mưa, Sân ga...):
        </div>
        <div className="relative flex-1 sm:max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" />
          <input
            type="text"
            placeholder="Tìm theo tình huống, lời thoại..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-rose-900/40 border border-rose-800/60 text-xs text-rose-100 placeholder-rose-400/60 focus:outline-none focus:border-rose-500/60"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {filteredList.length === 0 ? (
        <div className="text-center py-12 bg-rose-950/20 rounded-2xl border border-rose-900/40 text-rose-300">
          Không tìm thấy tình huống lãng mạn phù hợp.
        </div>
      ) : activeTab === 'card' ? (
        /* CARD VIEW */
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-rose-900/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Header controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-rose-900/40">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {currentItem.situationTitle}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-rose-950 border border-rose-800/60 text-rose-300 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/50" /> Rung động tim: {currentItem.munekyunScore}/5
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-300 mr-2">
                  {currentIndex + 1} / {filteredList.length}
                </span>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-rose-900/50 hover:bg-rose-800 text-rose-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-rose-900/50 hover:bg-rose-800 text-rose-200 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drama Scene Display */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/50 via-purple-950/40 to-slate-900 border border-rose-800/50 space-y-3">
                <div className="flex items-center justify-between text-xs text-rose-400">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-rose-400" /> Thoại phim truyền hình rung động lòng người:
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.dialogueJapanese)}
                    className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 transition-colors flex items-center gap-1 text-xs"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" /> Nghe diễn xuất
                  </button>
                </div>

                <div className="text-xl sm:text-2xl font-black text-white leading-relaxed font-serif">
                  &quot;{currentItem.dialogueJapanese}&quot;
                </div>
                <div className="text-xs text-rose-300 font-mono">{currentItem.reading}</div>
                <div className="text-sm sm:text-base text-rose-100 italic mt-1">&quot;{currentItem.translation}&quot;</div>
              </div>

              {/* Linguistic Depth Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-900/40 space-y-1">
                  <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                    <Moon className="w-4 h-4 text-rose-400" /> Kỹ thuật diễn đạt gián tiếp:
                  </span>
                  <p className="text-rose-200 leading-relaxed">
                    {currentItem.linguisticDepth.indirectExpressionTechnique}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-900/40 space-y-1">
                  <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-rose-400" /> Ngữ điệu dịu dàng & Khoảng lặng:
                  </span>
                  <p className="text-rose-200 leading-relaxed">
                    {currentItem.linguisticDepth.toneAndVibeAdvice}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-900/40 space-y-1">
                  <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-400" /> Đánh giá thực tế ngoài đời:
                  </span>
                  <p className="text-rose-200 leading-relaxed">
                    {currentItem.linguisticDepth.realLifeSuitability}
                  </p>
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
                    ? 'Thu gọn mục phân tích văn học Natsume Soseki & Văn hóa tỏ tình'
                    : 'Xem mục giải thích chi tiết hơn: Điển tích Natsume Soseki, Văn hóa tỏ tình Kokuhaku & Tâm lý e thẹn Hazukashisa'}
                </button>
              </div>
            </div>

            {/* EXPANDABLE DEEP SECTION */}
            {showDeepExplanation && (
              <div className="mt-8 pt-6 border-t border-rose-900/40 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                  <Info className="w-5 h-5" />
                  Mục Giải Thích Văn Hóa Tình Yêu & Tâm Lý Học E Thẹn Nhật Bản
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/60 space-y-1.5">
                    <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <Moon className="w-4 h-4" /> Di sản văn học Natsume Soseki:
                    </span>
                    <p className="text-rose-200 leading-relaxed">
                      {currentItem.culturalDeepDive.natsumeSosekiLegacy}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/60 space-y-1.5">
                    <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <Heart className="w-4 h-4" /> Văn hóa tỏ tình Kokuhaku:
                    </span>
                    <p className="text-rose-200 leading-relaxed">
                      {currentItem.culturalDeepDive.kokuhakuCulture}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/60 space-y-1.5">
                    <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Tâm lý e thẹn Hazukashisa & Enryo:
                    </span>
                    <p className="text-rose-200 leading-relaxed">
                      {currentItem.culturalDeepDive.hazukashisaAndEnryo}
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
              className="p-5 rounded-2xl bg-slate-900/70 border border-rose-900/40 hover:border-rose-500/50 hover:bg-rose-950/30 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-medium">
                    {item.situationTitle}
                  </span>
                  <span className="text-xs text-rose-400 flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-500" /> {item.munekyunScore}/5
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors mb-1 font-serif line-clamp-2">
                  &quot;{item.dialogueJapanese}&quot;
                </h4>
                <div className="text-xs text-rose-300 font-mono mb-2">{item.reading}</div>
                <p className="text-xs text-rose-100 line-clamp-2 italic mb-2">
                  &quot;{item.translation}&quot;
                </p>
                <p className="text-xs text-rose-300/80 line-clamp-2">
                  {item.linguisticDepth.indirectExpressionTechnique}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-900/40 flex items-center justify-between text-xs text-rose-400">
                <span>Khám phá phân cảnh</span>
                <ChevronRight className="w-3.5 h-3.5 text-rose-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* QUIZ VIEW */
        <div className="bg-slate-900/80 border border-rose-900/40 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-rose-900/40">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <HelpCircle className="w-5 h-5" />
              Trắc Nghiệm Cảm Thụ Munekyun ({currentIndex + 1} / {filteredList.length})
            </div>
            <button
              onClick={() => setSelectedQuizAnswer(null)}
              className="text-xs text-rose-400 hover:text-rose-200 flex items-center gap-1"
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
                let btnStyle = 'bg-rose-950/40 hover:bg-rose-900/50 border-rose-800/50 text-rose-100';

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
                    <span className="w-6 h-6 rounded-full bg-rose-800/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
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
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/50 text-rose-200 text-xs sm:text-sm animate-fadeIn leading-relaxed">
                <span className="font-bold text-rose-300 block mb-1">
                  {selectedQuizAnswer === currentItem.quiz.correctIndex ? 'Chính xác!' : 'Giải thích đáp án chuẩn:'}
                </span>
                {currentItem.quiz.explanation}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-rose-900/40">
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-rose-900/50 hover:bg-rose-800 text-rose-200 text-xs sm:text-sm font-medium transition-colors"
            >
              Phân cảnh trước
            </button>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Phân cảnh tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
