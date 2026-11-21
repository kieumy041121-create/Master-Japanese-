import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { NaturalCollocationRefactorItem } from '../../types/learnerBoostExtended';
import { initialNaturalCollocationList, extraNaturalCollocationList } from '../../data/learnerBoostDatabasePart2';
import { speechService } from '../../services/speechService';
import { OmniContextCollocationBoard } from './OmniContextCollocationBoard';
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
  Check,
  X,
  MessageSquare,
  Wrench,
  Compass,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
  onOpenAiSenseiWithQuery?: (query: string) => void;
}

export const NaturalCollocationRefactorLab: React.FC<Props> = ({
  currentLevel = 'N2',
  onOpenAiSenseiWithQuery,
}) => {
  const [list, setList] = useState<NaturalCollocationRefactorItem[]>(initialNaturalCollocationList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'omni_context' | 'card' | 'grid' | 'quiz'>('omni_context');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.unnaturalVietnameseThinking.toLowerCase().includes(q) ||
      item.unnaturalJapanese.toLowerCase().includes(q) ||
      item.naturalNativeCollocation.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraNaturalCollocationList.map((item, idx) => ({
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
      {/* Zen Header Banner */}
      <div className="rounded-2xl bg-slate-900/90 p-6 sm:p-8 border border-slate-800 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-sky-400 font-semibold">
              <Compass className="w-4 h-4" />
              <span>Bộ Não Dự Phóng Hoàn Cảnh &amp; Kho Vũ Khí 3 Tầng</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">Chuẩn NHK &amp; Daijirin</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              65. Collocation Thực Chiến Theo Bối Cảnh (自然な表現)
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Nhập bất kỳ tình huống nào (từ đi chợ, đổ rác, đi tàu điện tới đàm phán thất bại, bị sếp mắng, từ chối khéo) để bóc tách thành 3 tầng rành mạch: Từ vựng cốt lõi, Cụm danh từ và Cụm động từ kèm cao độ Tokyo.
            </p>
          </div>

          {activeTab !== 'omni_context' && (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={handleLoadMoreFive}
                disabled={isLoadingMore}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
                {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
              </button>
              <span className="text-xs font-mono tabular-nums text-slate-400">
                {list.length} cụm đối chiếu
              </span>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('omni_context')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'omni_context'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Dự phóng Bối cảnh 3 tầng (+3 Đào sâu)
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'card'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Sửa lỗi Dịch thô (Card)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'grid'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Bảng Collocation Bản xứ (Grid)
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setSelectedQuizAnswer(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Trắc nghiệm Phản xạ (Quiz)
          </button>
        </div>
      </div>

      {/* Primary Tab: Omni-Context Projection Engine */}
      {activeTab === 'omni_context' && (
        <OmniContextCollocationBoard
          currentLevel={currentLevel}
          initialContext="Đi chợ"
          onAskAiSensei={onOpenAiSenseiWithQuery}
        />
      )}

      {/* Search & Filter Bar (for Refactor Card / Grid / Quiz tabs) */}
      {activeTab !== 'omni_context' && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo lỗi sai, cụm từ chuẩn, ý nghĩa..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {activeTab === 'card' && (
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 self-end sm:self-auto">
              <span className="tabular-nums">
                Mục {currentIndex + 1} / {filteredList.length}
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
      )}

      {/* Main Tab Content */}
      {activeTab === 'card' && currentItem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Card (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
              {/* Contrast Section */}
              <div className="space-y-4">
                {/* Unnatural */}
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                  <X className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-rose-300 font-semibold uppercase tracking-wider mb-1">
                      Cách nói gượng gạo / Dịch thô máy móc:
                    </div>
                    <div className="text-base font-bold text-rose-200 line-through">
                      {currentItem.unnaturalJapanese}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {currentItem.unnaturalVietnameseThinking}
                    </div>
                  </div>
                </div>

                {/* Natural */}
                <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-emerald-300 font-semibold uppercase tracking-wider mb-1">
                        Diễn đạt chuẩn người bản xứ (Collocation vàng):
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white">
                        {currentItem.naturalNativeCollocation}
                      </div>
                      <div className="text-xs text-emerald-300 font-mono mt-1">
                        {currentItem.reading}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSpeak(currentItem.naturalNativeCollocation)}
                    className="p-2 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sample Dialogue */}
              <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Bối cảnh giao tiếp: {currentItem.sampleDialogue.context}
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.sampleDialogue.japanese)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm font-semibold text-white leading-relaxed">
                  {currentItem.sampleDialogue.japanese}
                </div>
                <div className="text-xs text-blue-300/80 font-mono">
                  {currentItem.sampleDialogue.reading}
                </div>
                <div className="text-xs text-slate-300 pt-1 border-t border-slate-800">
                  {currentItem.sampleDialogue.translation}
                </div>
              </div>

              {/* Collocation Clusters */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Chùm cụm từ liên quan nên thuộc lòng:
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentItem.collocationCluster.map((cluster, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                    >
                      {cluster}
                    </span>
                  ))}
                </div>
              </div>

              {/* Toggle Deep Explanation */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation ? 'Thu gọn lý do tại sao' : 'Xem mục giải thích chi tiết hơn'}
                </button>
              </div>

              {/* Deep Explanation Panel */}
              {showDeepExplanation && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5 uppercase">
                      <Info className="w-4 h-4" />
                      Tại sao người Nhật không nói như vậy?
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentItem.explanationWhy}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Quiz & Stats Sidebar (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                Kiểm tra phản xạ Collocation
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
                          ? 'bg-blue-950/60 border-blue-500/80 text-blue-200 font-semibold'
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
                  <div className="font-semibold text-blue-400 mb-1">
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
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-blue-400 font-semibold">#{idx + 1}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">
                  Collocation
                </span>
              </div>
              <div className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                {item.naturalNativeCollocation}
              </div>
              <div className="text-xs font-mono text-blue-300">
                {item.reading}
              </div>
              <div className="text-xs text-rose-400/80 line-through">
                {item.unnaturalJapanese}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-blue-400">
                Câu hỏi {currentIndex + 1} / {filteredList.length}
              </span>
              <span>{currentItem.naturalNativeCollocation}</span>
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
                        ? 'bg-blue-950 border-blue-500 text-blue-200 font-semibold'
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
                <div className="font-bold text-blue-400 flex items-center gap-2">
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
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-semibold"
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
