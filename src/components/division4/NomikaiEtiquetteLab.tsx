import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { NomikaiEtiquetteItem } from '../../types/bizCultureExtended';
import { initialNomikaiList, extraNomikaiList } from '../../data/bizCultureExtendedDatabase';
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
  Wine,
  PartyPopper,
  Clock,
  ThumbsUp,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const NomikaiEtiquetteLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<NomikaiEtiquetteItem[]>(initialNomikaiList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasLoadedExtra, setHasLoadedExtra] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    return (
      item.eventContext.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.japaneseTerm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vietnameseMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.servingPouringRules.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const currentItem = filteredList[currentIndex] || filteredList[0] || list[0];

  const handleLoadMore = () => {
    if (hasLoadedExtra) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setList((prev) => [...prev, ...extraNomikaiList]);
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-amber-950/60 border border-rose-500/30 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              <Wine className="w-3.5 h-3.5" />
              <span>Giao Tiếp Ngoại Giao Bàn Tiệc & Nomunication</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Bàn Rượu Doanh Nghiệp Nomikai & Nghi Thức Đãi Tiệc</span>
              <span className="text-sm px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-mono border border-rose-500/30">
                飲み会マナー & 宴席の礼儀
              </span>
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Giải mã nghệ thuật "Nomunication" (Giao tiếp trên bàn rượu): Quy tắc nâng ly Kanpai thấp hơn sếp, tư thế rót bia cầm thân chai nhãn hướng lên, nghệ thuật từ chối khéo Al-hara và lời cảm ơn sáng hôm sau.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowDetailedExplanation((prev) => !prev)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                showDetailedExplanation
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-200'
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
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold text-xs shadow-lg shadow-rose-900/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
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
                Đã nạp đủ 10 nghi thức tiệc
              </span>
            )}
          </div>
        </div>

        {/* Filter and Views */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm nghi thức, văn hóa bàn rượu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex rounded-lg bg-slate-900/80 p-1 border border-slate-700 self-end">
            <button
              onClick={() => setViewMode('card')}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                viewMode === 'card' ? 'bg-rose-500/20 text-rose-300 font-semibold' : 'text-slate-400'
              }`}
            >
              Thẻ chi tiết
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                viewMode === 'grid' ? 'bg-rose-500/20 text-rose-300 font-semibold' : 'text-slate-400'
              }`}
            >
              Ma trận ({filteredList.length})
            </button>
            <button
              onClick={() => setViewMode('quiz')}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                viewMode === 'quiz' ? 'bg-rose-500/20 text-rose-300 font-semibold' : 'text-slate-400'
              }`}
            >
              Trắc nghiệm
            </button>
          </div>
        </div>
      </div>

      {/* Main Card View */}
      {viewMode === 'card' && currentItem && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 text-xs font-mono font-semibold">
                Nghi thức #{currentIndex + 1}/{filteredList.length}
              </span>

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

            {/* Context & Term */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <PartyPopper className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{currentItem.eventContext}</span>
              </h2>

              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-wider text-rose-400/80 font-semibold">
                    Thuật ngữ bàn tiệc & Khẩu quyết
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.japaneseTerm)}
                    className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-all flex items-center gap-1.5 text-xs font-medium"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Phát âm</span>
                  </button>
                </div>
                <div className="text-xl md:text-2xl font-bold text-rose-200 font-sans tracking-wide">
                  {currentItem.japaneseTerm}
                </div>
                <div className="text-xs text-rose-300/80 font-mono">
                  {currentItem.reading} ({currentItem.romaji})
                </div>
                <div className="text-xs text-slate-200 font-medium pt-1 border-t border-rose-500/20">
                  Ý nghĩa cốt lõi: {currentItem.vietnameseMeaning}
                </div>
              </div>
            </div>

            {/* Serving & Pouring Rules */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Wine className="w-3.5 h-3.5 text-rose-400" />
                Quy tắc rót bia, nâng ly và thứ bậc chỗ ngồi
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
                {currentItem.servingPouringRules}
              </p>
            </div>

            {/* Communication Tactics */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-rose-400" />
                Chiến thuật giao tiếp kết nối lòng người
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
                {currentItem.communicationTactics}
              </p>
            </div>

            {/* Morning After Etiquette */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase font-mono">
                <Clock className="w-3.5 h-3.5" />
                Nghi thức sáng hôm sau tại văn phòng (Quan trọng bậc nhất)
              </div>
              <p className="text-amber-200/90 text-xs leading-relaxed">
                {currentItem.morningAfterEtiquette}
              </p>
            </div>

            {/* Detailed Explanation */}
            {showDetailedExplanation && (
              <div className="p-5 rounded-xl bg-slate-800/60 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase font-mono">
                  <BookOpen className="w-4 h-4" />
                  Mục giải thích chi tiết hơn: Bản chất "Nomunication" & Xóa nhòa Tatemae
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
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/50 transition-all cursor-pointer space-y-3 hover:bg-slate-850 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm group-hover:text-rose-300 transition-colors">
                  {item.eventContext}
                </span>
                <span className="text-xs text-slate-500 font-mono">#{idx + 1}</span>
              </div>
              <div className="text-sm font-bold text-rose-200 font-sans bg-rose-950/20 p-2 rounded border border-rose-500/20">
                {item.japaneseTerm}
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {item.servingPouringRules}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Quiz Mode */}
      {viewMode === 'quiz' && currentItem && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 max-w-2xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-mono text-xs font-semibold">
              Tình huống phản xạ bàn tiệc #{currentIndex + 1}
            </span>
            <span className="text-xs text-slate-400">{currentItem.japaneseTerm}</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed flex items-start gap-2">
              <HelpCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
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
