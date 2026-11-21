import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { KojiSeigoMasteryItem } from '../../types/cultural';
import { initialKojiSeigoList, extraKojiSeigoList } from '../../data/culturalLearningDatabasePart4';
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
  Scroll,
  Briefcase,
  HelpCircle,
  Info,
  Compass,
  Award,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const KojiSeigoMasteryLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<KojiSeigoMasteryItem[]>(initialKojiSeigoList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [filterSchool, setFilterSchool] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const matchesFilter =
      filterSchool === 'all' || item.culturalDeepDive.philosophicalSchool.includes(filterSchool);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.idiom.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.sinoVietnamese.toLowerCase().includes(q) ||
      item.literalMeaning.toLowerCase().includes(q) ||
      item.philosophicalMeaning.toLowerCase().includes(q) ||
      item.historicalOriginStory.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraKojiSeigoList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/80 via-stone-900 to-red-950/50 p-6 sm:p-8 border border-amber-900/50 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
              <Scroll className="w-3.5 h-3.5" />
              Điển Tích Lịch Sử & Triết Lý Xử Thế
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              49. Bách Khoa Điển Tích & Thành Ngữ Lịch Sử Koji Seigo
            </h2>
            <p className="text-sm sm:text-base text-amber-200/80 max-w-2xl leading-relaxed">
              Giải mã cội nguồn ngụ ngôn thời Xuân Thu Chiến Quốc, Hán Sở tranh hùng; đối chiếu tư tưởng Nho gia,
              Lão Trang, Binh pháp Tôn Tử và ứng dụng đỉnh cao trong thương thuyết kinh doanh hiện đại.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-amber-950/40 transition-all border border-amber-500/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-stone-900/80 border border-stone-800 text-xs font-medium text-amber-300">
              Tổng thành ngữ: <span className="font-bold text-amber-400">{list.length}</span>
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
                : 'bg-stone-800/60 text-stone-400 hover:text-white'
            }`}
          >
            Thẻ Điển Tích (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-stone-800/60 text-stone-400 hover:text-white'
            }`}
          >
            Bảng Tra Cứu Toàn Bộ Điển Tích
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-stone-800/60 text-stone-400 hover:text-white'
            }`}
          >
            Trắc Nghiệm Tư Duy Chiến Lược Koji Seigo
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-stone-900/50 p-3 rounded-xl border border-stone-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-stone-400 font-medium whitespace-nowrap pl-1">Trường phái triết học:</span>
          {['all', 'Nho giáo', 'Binh pháp Tôn Tử', 'Lão Trang / Đạo giáo', 'Thiền tông', 'Pháp gia'].map((sch) => (
            <button
              key={sch}
              onClick={() => {
                setFilterSchool(sch);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterSchool === sch
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                  : 'bg-stone-800/50 text-stone-400 hover:text-stone-200 border border-stone-700/40'
              }`}
            >
              {sch === 'all' ? 'Tất cả' : sch}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Tìm theo chữ Hán, điển tích, nghĩa bóng..."
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
          Không tìm thấy thành ngữ điển tích phù hợp với bộ lọc.
        </div>
      ) : activeTab === 'card' ? (
        /* CARD VIEW */
        <div className="space-y-6">
          <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Index Counter & Navigation */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {currentItem.culturalDeepDive.philosophicalSchool}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-stone-800 text-stone-300 border border-stone-700">
                  JLPT N1 / Xã luận Asahi: {currentItem.culturalDeepDive.jlptN1Frequency}
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

            {/* Idiom Display & Core Meaning */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-900 border border-amber-900/40">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-amber-300 tracking-wider">
                      {currentItem.idiom}
                    </span>
                    <button
                      onClick={() => handleSpeak(currentItem.idiom)}
                      className="p-2 rounded-full bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-stone-400 font-mono mt-1">{currentItem.reading}</div>
                  <div className="text-sm font-semibold text-amber-400/90 mt-0.5">
                    Hán-Việt: {currentItem.sinoVietnamese}
                  </div>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-800">
                  <div className="text-xs text-stone-400">Tương đương tục ngữ Việt:</div>
                  <div className="text-sm font-bold text-white italic">
                    &quot;{currentItem.culturalDeepDive.comparativeIdiom}&quot;
                  </div>
                </div>
              </div>

              {/* Meanings Grid: Literal vs Philosophical */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-800/40 border border-stone-700/60">
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Nghĩa Đen Bề Mặt (Literal):
                  </div>
                  <p className="text-sm text-stone-200 leading-relaxed">{currentItem.literalMeaning}</p>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-400" /> Nghĩa Bóng Triết Lý Xử Thế (Philosophy):
                  </div>
                  <p className="text-sm text-amber-100/90 leading-relaxed">{currentItem.philosophicalMeaning}</p>
                </div>
              </div>

              {/* Historical Origin Story */}
              <div className="p-5 rounded-2xl bg-stone-950/60 border border-stone-800/90">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Scroll className="w-4 h-4" /> Cội Nguồn Điển Tích Lịch Sử (Xuân Thu - Chiến Quốc / Hán Sở):
                </div>
                <p className="text-sm text-stone-300 leading-relaxed font-serif">
                  {currentItem.historicalOriginStory}
                </p>
              </div>

              {/* Modern Business Application & Context */}
              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> Bối cảnh sử dụng & Ví dụ câu:
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.sampleUsage.japanese)}
                    className="text-stone-400 hover:text-white flex items-center gap-1 text-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Phát âm
                  </button>
                </div>
                <div className="text-xs text-stone-400 italic">Bối cảnh: {currentItem.sampleUsage.context}</div>
                <div className="text-sm sm:text-base font-bold text-white">{currentItem.sampleUsage.japanese}</div>
                <div className="text-xs text-stone-400 font-mono">{currentItem.sampleUsage.reading}</div>
                <div className="text-xs text-stone-300 italic">&quot;{currentItem.sampleUsage.meaning}&quot;</div>
              </div>

              {/* Toggle Deep Explanation */}
              <div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-semibold transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation
                    ? 'Thu gọn mục giải thích chiến lược kinh doanh & văn hóa'
                    : 'Xem mục giải thích chi tiết hơn: Ứng dụng chiến lược B2B, Tần suất đề thi N1 & Điểm tựa triết học'}
                </button>
              </div>
            </div>

            {/* EXPANDABLE DEEP SECTION */}
            {showDeepExplanation && (
              <div className="mt-8 pt-6 border-t border-amber-900/40 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <Info className="w-5 h-5" />
                  Mục Giải Thích Văn Hóa Điển Tích & Ứng Dụng Chiến Lược
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" /> Ứng dụng trong Chiến lược Kinh doanh & Thương thuyết:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.modernBusinessStrategy}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> Tần suất JLPT N1 & Xã luận Asahi Shimbun (Thiên Thanh Nhân Ngữ):
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {currentItem.culturalDeepDive.jlptN1Frequency}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Compass className="w-4 h-4" /> Điểm tựa Trường phái Triết học:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      Thành ngữ này thuộc hệ quy chiếu của {currentItem.culturalDeepDive.philosophicalSchool},
                      rèn luyện tầm nhìn dài hạn và nghệ thuật kiên định của giới lãnh đạo Nhật Bản.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Tục ngữ tương đương & Giao lưu văn hóa Việt - Nhật:
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      Trong tiếng Việt tương ứng với câu: &quot;{currentItem.culturalDeepDive.comparativeIdiom}&quot;.
                      Hiểu rõ mối tương đồng giúp người học dịch thuật văn chương và đàm phán mượt mà.
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
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">
                    {item.culturalDeepDive.philosophicalSchool}
                  </span>
                  <span className="text-xs text-stone-500">Hán-Việt: {item.sinoVietnamese}</span>
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
                  {item.idiom}
                </h4>
                <div className="text-xs text-stone-400 font-mono mb-2">{item.reading}</div>
                <p className="text-xs text-amber-200/90 font-medium line-clamp-2 mb-2">
                  {item.philosophicalMeaning}
                </p>
                <p className="text-xs text-stone-500 line-clamp-2">
                  Điển tích: {item.historicalOriginStory}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
                <span>Tương đương: {item.culturalDeepDive.comparativeIdiom}</span>
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
              Trắc Nghiệm Phản Xạ Điển Tích & Koji Seigo ({currentIndex + 1} / {filteredList.length})
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
              Thành ngữ trước
            </button>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Thành ngữ tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
