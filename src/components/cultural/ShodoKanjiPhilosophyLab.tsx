import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { ShodoKanjiPhilosophyItem } from '../../types/cultural';
import { initialShodoKanjiList, extraShodoKanjiList } from '../../data/culturalLearningDatabasePart4';
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
  PenTool,
  Award,
  Layers,
  HelpCircle,
  Info,
  Lightbulb,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const ShodoKanjiPhilosophyLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<ShodoKanjiPhilosophyItem[]>(initialShodoKanjiList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [filterStyle, setFilterStyle] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const matchesFilter = filterStyle === 'all' || item.shodoStyle === filterStyle;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.targetKanji.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.sinoVietnamese.toLowerCase().includes(q) ||
      item.etymologyStory.toLowerCase().includes(q) ||
      item.rikukouCategory.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraShodoKanjiList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-neutral-900 to-amber-950/40 p-6 sm:p-8 border border-amber-900/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
              <PenTool className="w-3.5 h-3.5" />
              Chuyên Sâu Hán Tự & Mỹ Học Thư Pháp
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              47. Ngũ Thể Thư Đạo & Triết Lý Nét Chữ Hán
            </h2>
            <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
              Khám phá Lục thư (6 phép tạo chữ Hán), 5 thể thư pháp (Triện, Lệ, Khải, Hành, Thảo),
              khoảng trống nghệ thuật Yohaku và triết lý &quot;Thư như kỳ nhân&quot; (Nét chữ nết người).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-amber-900/30 transition-all border border-amber-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-stone-800/80 border border-stone-700/60 text-xs font-medium text-stone-300">
              Tổng chữ Hán: <span className="font-bold text-amber-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-stone-800/80">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-stone-800/60 text-stone-400 hover:text-white'
            }`}
          >
            Thẻ Chuyên Sâu (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-stone-800/60 text-stone-400 hover:text-white'
            }`}
          >
            Bảng Tra Cứu (Danh sách đầy đủ)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-stone-800/60 text-stone-400 hover:text-white'
            }`}
          >
            Trắc Nghiệm Phản Xạ Hán Tự & Thư Đạo
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-stone-900/50 p-3 rounded-xl border border-stone-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-stone-400 font-medium whitespace-nowrap pl-1">Thể thư pháp:</span>
          {['all', 'Khải thư (楷書)', 'Hành thư (行書)', 'Thảo thư (草書)', 'Lệ thư (隷書)', 'Triện thư (篆書)'].map((style) => (
            <button
              key={style}
              onClick={() => {
                setFilterStyle(style);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterStyle === style
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                  : 'bg-stone-800/50 text-stone-400 hover:text-stone-200 border border-stone-700/40'
              }`}
            >
              {style === 'all' ? 'Tất cả' : style}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Tìm theo chữ Hán, nghĩa, Lục thư..."
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
          Không tìm thấy chữ Hán hoặc nội dung thư pháp phù hợp.
        </div>
      ) : activeTab === 'card' ? (
        /* CARD VIEW */
        <div className="space-y-6">
          <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Index Counter & Navigation */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {currentItem.shodoStyle}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-stone-800 text-stone-300 border border-stone-700">
                  Lục thư: {currentItem.rikukouCategory}
                </span>
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

            {/* Kanji Giant Display & Core Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Huge Kanji Ink Style */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-stone-950 to-stone-900 rounded-2xl border border-stone-800/90 shadow-inner">
                <div className="text-8xl font-serif text-amber-200 tracking-wider hover:scale-105 transition-transform duration-300 cursor-pointer select-none">
                  {currentItem.targetKanji}
                </div>
                <div className="mt-4 text-center space-y-1">
                  <div className="text-lg font-bold text-white flex items-center justify-center gap-2">
                    {currentItem.reading}
                    <button
                      onClick={() => handleSpeak(currentItem.targetKanji)}
                      className="p-1 rounded-full bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm font-semibold text-amber-400">
                    Hán-Việt: {currentItem.sinoVietnamese}
                  </div>
                </div>

                <div className="mt-6 w-full pt-4 border-t border-stone-800 text-xs text-stone-400 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Phép tạo chữ:</span>
                    <span className="font-medium text-stone-300">{currentItem.rikukouCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Thể thư pháp:</span>
                    <span className="font-medium text-stone-300">{currentItem.shodoStyle}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Title, Etymology & Brush Philosophy */}
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {currentItem.title}
                  </h3>
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-stone-300 text-sm leading-relaxed">
                    <span className="font-semibold text-amber-300 block mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Cội Nguồn Giáp Cốt Văn & Hán Tự Học:
                    </span>
                    {currentItem.etymologyStory}
                  </div>
                </div>

                {/* Brush Philosophy */}
                <div className="p-4 rounded-xl bg-stone-800/40 border border-stone-700/50 text-stone-300 text-sm leading-relaxed">
                  <span className="font-semibold text-amber-200 block mb-1 flex items-center gap-1.5">
                    <PenTool className="w-4 h-4 text-amber-400" /> Triết Lý Nét Bút, Lực Ấn & Không Gian Yohaku:
                  </span>
                  {currentItem.brushPhilosophy}
                </div>

                {/* Sample Phrase */}
                <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800">
                  <div className="text-xs text-stone-400 mb-1 flex items-center justify-between">
                    <span className="font-semibold text-amber-400">Câu ứng dụng trong tác phẩm / Thành ngữ:</span>
                    <button
                      onClick={() => handleSpeak(currentItem.samplePhrase.japanese)}
                      className="text-stone-400 hover:text-white flex items-center gap-1 text-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Phát âm
                    </button>
                  </div>
                  <div className="text-base font-bold text-white">{currentItem.samplePhrase.japanese}</div>
                  <div className="text-xs text-stone-400 font-mono mt-0.5">{currentItem.samplePhrase.reading}</div>
                  <div className="text-xs text-stone-300 mt-1 italic">&quot;{currentItem.samplePhrase.meaning}&quot;</div>
                </div>

                {/* Toggle Deep Explanation */}
                <div>
                  <button
                    onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-semibold transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    {showDeepExplanation ? 'Thu gọn mục giải thích văn hóa chi tiết' : 'Xem mục giải thích văn hóa chi tiết hơn (Lịch sử, Danh gia, JLPT N2-N1)'}
                  </button>
                </div>
              </div>
            </div>

            {/* EXPANDABLE DEEP CULTURAL EXPLANATION SECTION */}
            {showDeepExplanation && (
              <div className="mt-8 pt-6 border-t border-amber-900/40 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <Info className="w-5 h-5" />
                  Mục Giải Thích Văn Hóa Chi Tiết & Ứng Dụng Chuyên Sâu
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> Danh gia Thư pháp & Bối cảnh Lịch sử:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.historicalCalligrapher}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Layers className="w-4 h-4" /> Mỹ học & Ý nghĩa Tâm linh &quot;Thư như kỳ nhân&quot;:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.aestheticSpiritualMeaning}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4" /> Bí quyết ghi nhớ Hán tự cho đề thi JLPT N2-N1:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.jlptMasteryAdvice}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Ứng dụng trong Thiết kế & Logo Hiện đại:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.modernGraphicDesignConnection}
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
              className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-900 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">
                    {item.shodoStyle}
                  </span>
                  <span className="text-xs text-stone-500">Lục thư: {item.rikukouCategory}</span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-4xl font-serif text-amber-200 group-hover:scale-110 transition-transform">
                    {item.targetKanji}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h4>
                    <div className="text-xs text-stone-400">{item.reading}</div>
                    <div className="text-xs text-amber-400/90 font-medium">Hán-Việt: {item.sinoVietnamese}</div>
                  </div>
                </div>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {item.etymologyStory}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
                <span>Bấm để xem chi tiết</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* QUIZ VIEW */
        <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <HelpCircle className="w-5 h-5" />
              Trắc Nghiệm Phản Xạ Hán Tự & Thư Đạo ({currentIndex + 1} / {filteredList.length})
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
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/50 text-stone-300 text-xs sm:text-sm animate-fadeIn leading-relaxed">
                <span className="font-bold text-amber-300 block mb-1">
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
              Câu trước
            </button>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Câu tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
