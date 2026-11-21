import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { NichietuBridgeItem } from '../../types/bizCultureExtended';
import { initialNichietuList, extraNichietuList } from '../../data/bizCultureExtendedDatabase';
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
  Globe2,
  MessageSquare,
  UserX,
  UserCheck,
  ArrowRightLeft,
  HeartHandshake,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const NichietuWorkplaceBridgeLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<NichietuBridgeItem[]>(initialNichietuList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasLoadedExtra, setHasLoadedExtra] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const categories = ['all', 'Xử lý Deadline', 'Nhận chỉ thị & Kakunin', 'Giải thích sự cố', 'Nghỉ phép & Tăng ca'];

  const filteredList = list.filter((item) => {
    const matchesSearch =
      item.frictionPointTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vietnamesePerspective.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.japaneseBossMindset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recommendedBridgeAction.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.workplaceCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const currentItem = filteredList[currentIndex] || filteredList[0] || list[0];

  const handleLoadMore = () => {
    if (hasLoadedExtra) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setList((prev) => [...prev, ...extraNichietuList]);
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-950/60 via-slate-900 to-cyan-950/60 border border-violet-500/30 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Giao Tiếp Đa Văn Hóa Công Sở & Cầu Nối BrSE / Comtor</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Cầu Nối Văn Hóa Công Sở Nhật - Việt (BrSE & Comtor)</span>
              <span className="text-sm px-2.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300 font-mono border border-violet-500/30">
                日越異文化コミュニケーション
              </span>
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Hóa giải các điểm nghẽn xung đột văn hóa giữa nhân viên Việt Nam và lãnh đạo người Nhật: Khái niệm Deadline Genshu, ranh giới giữa giải trình và ngụy biện (Iiwake), phục thuật xác nhận (Kakunin) và đối thoại mẫu đạt điểm 10.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowDetailedExplanation((prev) => !prev)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                showDetailedExplanation
                  ? 'bg-violet-500/20 border-violet-500/50 text-violet-200'
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
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-violet-900/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
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
                Đã nạp đủ 10 tình huống đa văn hóa
              </span>
            )}
          </div>
        </div>

        {/* Filters and Views */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-violet-500 text-white font-bold shadow'
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
                placeholder="Tìm xung đột, giải pháp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900/80 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 w-44 md:w-56"
              />
            </div>

            <div className="flex rounded-lg bg-slate-900/80 p-1 border border-slate-700">
              <button
                onClick={() => setViewMode('card')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  viewMode === 'card' ? 'bg-violet-500/20 text-violet-300 font-semibold' : 'text-slate-400'
                }`}
              >
                Tình huống
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  viewMode === 'grid' ? 'bg-violet-500/20 text-violet-300 font-semibold' : 'text-slate-400'
                }`}
              >
                Tổng hợp ({filteredList.length})
              </button>
              <button
                onClick={() => setViewMode('quiz')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  viewMode === 'quiz' ? 'bg-violet-500/20 text-violet-300 font-semibold' : 'text-slate-400'
                }`}
              >
                Thử thách
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card View */}
      {viewMode === 'card' && currentItem && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-violet-500/20 text-violet-300 text-xs font-mono font-semibold">
                  Tình huống #{currentIndex + 1}/{filteredList.length}
                </span>
                <span className="text-xs text-violet-300 font-medium px-2 py-0.5 rounded bg-violet-950/60 border border-violet-700/50">
                  {currentItem.workplaceCategory}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-violet-400 shrink-0" />
                <span>{currentItem.frictionPointTitle}</span>
              </h2>
            </div>

            {/* Two Perspectives Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vietnamese Perspective */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                <div className="flex items-center gap-1.5 text-slate-300 text-xs font-bold uppercase font-mono">
                  <UserX className="w-3.5 h-3.5 text-amber-400" />
                  Góc nhìn phản xạ của nhân sự Việt
                </div>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                  {currentItem.vietnamesePerspective}
                </p>
              </div>

              {/* Japanese Boss Mindset */}
              <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-500/30 space-y-2">
                <div className="flex items-center gap-1.5 text-violet-300 text-xs font-bold uppercase font-mono">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Tâm lý & Kỳ vọng thực sự của Sếp Nhật
                </div>
                <p className="text-violet-200/90 text-xs md:text-sm leading-relaxed">
                  {currentItem.japaneseBossMindset}
                </p>
              </div>
            </div>

            {/* Recommended Bridge Action */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold uppercase font-mono">
                <HeartHandshake className="w-3.5 h-3.5" />
                Hành động đề xuất hóa giải (Recommended Bridge Action)
              </div>
              <p className="text-emerald-200 text-xs md:text-sm leading-relaxed">
                {currentItem.recommendedBridgeAction}
              </p>
            </div>

            {/* Model Dialogue in Japanese */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-violet-300 font-semibold flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Mẫu đối thoại công sở chuẩn mực (Model Dialogue JP)
                </span>
                <button
                  onClick={() => handleSpeak(currentItem.modelDialogueJP.staff)}
                  className="p-1.5 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 transition-all flex items-center gap-1.5 text-xs font-medium"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu thoại nhân viên</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
                    Bạn (Nhân sự Việt):
                  </span>
                  <div className="text-sm font-bold text-slate-100 font-sans">
                    {currentItem.modelDialogueJP.staff}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {currentItem.modelDialogueJP.staffReading}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-violet-950/40 border border-violet-800/40 space-y-1">
                  <span className="text-[11px] font-mono text-violet-400 font-semibold uppercase">
                    Sếp người Nhật (Phản hồi):
                  </span>
                  <div className="text-sm font-semibold text-violet-200 font-sans">
                    {currentItem.modelDialogueJP.bossResponse}
                  </div>
                </div>

                <div className="text-xs text-slate-400 italic pt-1">
                  Phân tích tâm lý: {currentItem.modelDialogueJP.analysis}
                </div>
              </div>
            </div>

            {/* Detailed Explanation */}
            {showDetailedExplanation && (
              <div className="p-5 rounded-xl bg-slate-800/60 border border-violet-500/30 space-y-2">
                <div className="flex items-center gap-2 text-violet-300 text-xs font-bold uppercase font-mono">
                  <BookOpen className="w-4 h-4" />
                  Mục giải thích chi tiết hơn: Ranh giới giải trình vs Bao biện (Iiwake) & Tâm lý văn hóa
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
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/50 transition-all cursor-pointer space-y-3 hover:bg-slate-850 group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 text-xs font-mono font-medium">
                  {item.workplaceCategory}
                </span>
                <span className="text-xs text-slate-500 font-mono">#{idx + 1}</span>
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">
                {item.frictionPointTitle}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {item.recommendedBridgeAction}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Quiz Mode */}
      {viewMode === 'quiz' && currentItem && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 max-w-2xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 font-mono text-xs font-semibold">
              Tình huống ứng biến đa văn hóa #{currentIndex + 1}
            </span>
            <span className="text-xs text-slate-400">{currentItem.workplaceCategory}</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed flex items-start gap-2">
              <HelpCircle className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
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
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs text-white font-semibold"
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
