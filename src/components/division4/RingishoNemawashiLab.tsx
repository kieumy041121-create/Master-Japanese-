import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { RingishoNemawashiItem } from '../../types/bizCultureExtended';
import { initialRingishoList, extraRingishoList } from '../../data/bizCultureExtendedDatabase';
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
  FileCheck,
  Stamp,
  Users,
  AlertTriangle,
  GitBranch,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const RingishoNemawashiLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<RingishoNemawashiItem[]>(initialRingishoList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasLoadedExtra, setHasLoadedExtra] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const phases = ['all', 'Chuẩn bị dữ liệu', 'Tham vấn tiền trạm', 'Soạn đơn Ringisho', 'Đóng dấu Hanco'];

  const filteredList = list.filter((item) => {
    const matchesSearch =
      item.decisionMakingTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyPersuasionPhrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vietnameseMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.culturalExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPhase = selectedPhase === 'all' || item.nemawashiPhase === selectedPhase;
    return matchesSearch && matchesPhase;
  });

  const currentItem = filteredList[currentIndex] || filteredList[0] || list[0];

  const handleLoadMore = () => {
    if (hasLoadedExtra) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setList((prev) => [...prev, ...extraRingishoList]);
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Cơ Chế Phê Duyệt & Đồng Thuận Doanh Nghiệp</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Nghệ Thuật Viết Đơn Ringisho & Đồng Thuận Nemawashi</span>
              <span className="text-sm px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30">
                稟議書 & 根回しの極意
              </span>
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Bí quyết thông qua dự án 100% trong doanh nghiệp Nhật Bản: Nghệ thuật vận động hành lang trước hậu trường (Nemawashi), quy cách đóng dấu Hanco nghiêng cúi chào sếp, và cấu trúc tờ trình Ringisho chuẩn mực.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowDetailedExplanation((prev) => !prev)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                showDetailedExplanation
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-200'
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
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-900/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
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
                Đã nạp đủ 10 chuyên đề trình ký
              </span>
            )}
          </div>
        </div>

        {/* Filters and Views */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            {phases.map((ph) => (
              <button
                key={ph}
                onClick={() => {
                  setSelectedPhase(ph);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedPhase === ph
                    ? 'bg-blue-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {ph === 'all' ? 'Tất cả giai đoạn' : ph}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm đề án, thuật ngữ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900/80 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-44 md:w-56"
              />
            </div>

            <div className="flex rounded-lg bg-slate-900/80 p-1 border border-slate-700">
              <button
                onClick={() => setViewMode('card')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  viewMode === 'card' ? 'bg-blue-500/20 text-blue-300 font-semibold' : 'text-slate-400'
                }`}
              >
                Quy trình
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  viewMode === 'grid' ? 'bg-blue-500/20 text-blue-300 font-semibold' : 'text-slate-400'
                }`}
              >
                Danh mục ({filteredList.length})
              </button>
              <button
                onClick={() => setViewMode('quiz')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  viewMode === 'quiz' ? 'bg-blue-500/20 text-blue-300 font-semibold' : 'text-slate-400'
                }`}
              >
                Thử thách
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      {viewMode === 'card' && currentItem && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-mono font-semibold">
                  Đề án #{currentIndex + 1}/{filteredList.length}
                </span>
                <span className="text-xs text-slate-300 font-medium px-2 py-0.5 rounded bg-blue-900/40 border border-blue-700/50">
                  {currentItem.nemawashiPhase}
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

            {/* Title & Key Persuasion Phrase */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-blue-400 shrink-0" />
                <span>{currentItem.decisionMakingTopic}</span>
              </h2>

              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-wider text-blue-400/80 font-semibold">
                    Ngôn từ thuyết phục Nemawashi & Đệ trình
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.keyPersuasionPhrase)}
                    className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-all flex items-center gap-1.5 text-xs font-medium"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Phát âm</span>
                  </button>
                </div>
                <div className="text-lg md:text-xl font-bold text-blue-200 font-sans tracking-wide">
                  {currentItem.keyPersuasionPhrase}
                </div>
                <div className="text-xs text-blue-300/80 font-mono">
                  {currentItem.reading}
                </div>
                <div className="text-xs text-slate-300 italic pt-1 border-t border-blue-500/20">
                  Ý nghĩa: {currentItem.vietnameseMeaning}
                </div>
              </div>
            </div>

            {/* Process Execution Steps */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                Trình tự các bước thực hiện Nemawashi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {currentItem.processExecutionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hanco Protocol & Pitfall */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-bold uppercase font-mono">
                  <Stamp className="w-3.5 h-3.5" />
                  Quy chuẩn đóng dấu Hanco (Hanco Protocol)
                </div>
                <p className="text-indigo-200/90 text-xs leading-relaxed">
                  {currentItem.hancoProtocol}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase font-mono">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Cấm kỵ tối kỵ (Pitfall Warning)
                </div>
                <p className="text-amber-200/90 text-xs leading-relaxed">
                  {currentItem.pitfallWarning}
                </p>
              </div>
            </div>

            {/* Detailed Explanation */}
            {showDetailedExplanation && (
              <div className="p-5 rounded-xl bg-slate-800/60 border border-blue-500/30 space-y-2">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase font-mono">
                  <BookOpen className="w-4 h-4" />
                  Mục giải thích chi tiết hơn: Bản chất phân quyền & Cơ chế chia sẻ trách nhiệm Ringi
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
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer space-y-3 hover:bg-slate-850 group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-mono font-medium">
                  {item.nemawashiPhase}
                </span>
                <span className="text-xs text-slate-500 font-mono">#{idx + 1}</span>
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">
                {item.decisionMakingTopic}
              </h3>
              <div className="text-xs text-blue-200/90 font-mono bg-blue-950/20 p-2 rounded border border-blue-500/20">
                {item.keyPersuasionPhrase}
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {item.culturalExplanation}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Quiz Mode */}
      {viewMode === 'quiz' && currentItem && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 max-w-2xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 font-mono text-xs font-semibold">
              Tình huống phê duyệt #{currentIndex + 1}
            </span>
            <span className="text-xs text-slate-400">{currentItem.nemawashiPhase}</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed flex items-start gap-2">
              <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
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
                Đề án trước
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  setSelectedQuizAnswer(null);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-semibold"
              >
                Đề án kế tiếp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
