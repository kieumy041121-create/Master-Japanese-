import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { MeishiExchangeItem } from '../../types/bizCultureExtended';
import { initialMeishiList, extraMeishiList } from '../../data/bizCultureExtendedDatabase';
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
  CreditCard,
  Building,
  UserCheck,
  ShieldAlert,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const MeishiExchangeMasteryLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<MeishiExchangeItem[]>(initialMeishiList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasLoadedExtra, setHasLoadedExtra] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const categories = ['all', 'Đổi danh thiếp', 'Tiếp khách sảnh', 'Bố trí trà nước', 'Tiễn khách'];

  const filteredList = list.filter((item) => {
    const matchesSearch =
      item.scenarioTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyJapanesePhrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vietnameseMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.etiquetteRule.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedSubCategory === 'all' || item.subCategory === selectedSubCategory;
    return matchesSearch && matchesCategory;
  });

  const currentItem = filteredList[currentIndex] || filteredList[0] || list[0];

  const handleLoadMore = () => {
    if (hasLoadedExtra) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setList((prev) => [...prev, ...extraMeishiList]);
      setHasLoadedExtra(true);
      setIsLoadingMore(false);
      speechService.playSuccessSound();
    }, 450);
  };

  const handleSpeak = (text: string) => {
    speechService.speak(text);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-4 text-slate-100">
      {/* Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border border-amber-500/30 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Nghi Thức Công Sở & Tiếp Khách B2B</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Nghệ Thuật Trao Danh Thiếp Meishi & Tiếp Khách</span>
              <span className="text-sm px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                名刺交換 & 来客応接
              </span>
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Tấm danh thiếp là "bộ mặt linh hồn thứ hai" trong văn hóa kinh doanh Nhật Bản. Nắm vững trình tự đổi danh thiếp, dâng trà Omotenashi, xếp sơ đồ bàn họp và nghi thức cúi chào tiễn khách trước cửa thang máy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowDetailedExplanation((prev) => !prev)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                showDetailedExplanation
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showDetailedExplanation ? 'Ẩn giải thích sâu' : 'Hiện giải thích sâu'}</span>
            </button>

            {!hasLoadedExtra ? (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs shadow-lg shadow-amber-900/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                {isLoadingMore ? (
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
                <span>Tải thêm 5 cái (+5)</span>
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Đã nạp đủ 10 tình huống
              </span>
            )}
          </div>
        </div>

        {/* Filters and View Switcher */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedSubCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSubCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'Tất cả chủ đề' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tình huống, câu nói..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900/80 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 w-44 md:w-56"
              />
            </div>

            <div className="flex rounded-lg bg-slate-900/80 p-1 border border-slate-700">
              <button
                onClick={() => setViewMode('card')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  viewMode === 'card' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400'
                }`}
              >
                Thẻ học
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  viewMode === 'grid' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400'
                }`}
              >
                Danh sách ({filteredList.length})
              </button>
              <button
                onClick={() => setViewMode('quiz')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  viewMode === 'quiz' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400'
                }`}
              >
                Thử thách
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'card' && currentItem && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold">
                  Tình huống #{currentIndex + 1}/{filteredList.length}
                </span>
                <span className="text-xs text-slate-400 font-medium px-2 py-0.5 rounded bg-slate-800">
                  {currentItem.subCategory}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                  title="Trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                  title="Kế tiếp"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title & Key phrase */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{currentItem.scenarioTitle}</span>
              </h2>

              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-wider text-amber-400/80 font-semibold">
                    Câu khẩu quyết giao tiếp chuẩn mực
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.keyJapanesePhrase)}
                    className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-all flex items-center gap-1.5 text-xs font-medium"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe âm bản xứ</span>
                  </button>
                </div>
                <div className="text-lg md:text-xl font-bold text-amber-200 font-sans tracking-wide">
                  {currentItem.keyJapanesePhrase}
                </div>
                <div className="text-xs text-amber-300/80 font-mono">
                  {currentItem.reading}
                </div>
                <div className="text-xs text-slate-300 italic pt-1 border-t border-amber-500/20">
                  Ý nghĩa: {currentItem.vietnameseMeaning}
                </div>
              </div>
            </div>

            {/* Core Etiquette Rule */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                Quy tắc ứng xử cốt lõi (Manners Protocol)
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
                {currentItem.etiquetteRule}
              </p>
            </div>

            {/* Step by step actions */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Trình tự các bước thực hiện chuẩn chỉ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {currentItem.stepByStepAction.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Faux Pas / Pitfalls */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-300 text-xs font-bold uppercase font-mono">
                <ShieldAlert className="w-3.5 h-3.5" />
                Cấm kỵ tối kỵ (Faux Pas cần tránh tuyệt đối)
              </div>
              <p className="text-rose-200/90 text-xs leading-relaxed">
                {currentItem.commonFauxPas}
              </p>
            </div>

            {/* Detailed Explanation Section */}
            {showDetailedExplanation && (
              <div className="p-5 rounded-xl bg-slate-800/60 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase font-mono">
                  <BookOpen className="w-4 h-4" />
                  Mục giải thích chi tiết hơn: Chiều sâu văn hóa & Tâm lý doanh nghiệp Nhật
                </div>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                  {currentItem.culturalExplanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setViewMode('card');
              }}
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer space-y-3 hover:bg-slate-850 group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-mono font-medium">
                  {item.subCategory}
                </span>
                <span className="text-xs text-slate-500 font-mono">#{idx + 1}</span>
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                {item.scenarioTitle}
              </h3>
              <div className="text-xs text-amber-200/90 font-mono bg-amber-950/20 p-2 rounded border border-amber-500/20">
                {item.keyJapanesePhrase}
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {item.etiquetteRule}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Quiz Mode */}
      {viewMode === 'quiz' && currentItem && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 max-w-2xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-semibold">
              Thử thách phản xạ công sở #{currentIndex + 1}
            </span>
            <span className="text-xs text-slate-400">{currentItem.subCategory}</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed flex items-start gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>{currentItem.quiz.question}</span>
            </h3>

            <div className="space-y-2.5">
              {currentItem.quiz.options.map((opt, oIdx) => {
                const isSelected = selectedQuizAnswer === oIdx;
                const isCorrect = oIdx === currentItem.quiz.correctIndex;
                let btnStyle =
                  'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750 hover:border-slate-600';

                if (selectedQuizAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => {
                      if (selectedQuizAnswer === null) {
                        setSelectedQuizAnswer(oIdx);
                        if (isCorrect) {
                          speechService.playSuccessSound();
                        }
                      }
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm leading-relaxed transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedQuizAnswer !== null && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {selectedQuizAnswer !== null && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedQuizAnswer !== null && (
              <div
                className={`p-4 rounded-xl border text-xs md:text-sm leading-relaxed space-y-1.5 animate-fadeIn ${
                  selectedQuizAnswer === currentItem.quiz.correctIndex
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="font-bold">
                  {selectedQuizAnswer === currentItem.quiz.correctIndex
                    ? 'Chính xác xuất sắc! 🎉'
                    : 'Chưa chính xác rồi!'}
                </div>
                <p>{currentItem.quiz.explanation}</p>
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
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs text-white font-semibold"
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
