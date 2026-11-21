import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { ListeningTrapDeconstructItem } from '../../types/learnerBoostExtended';
import { initialListeningTrapList, extraListeningTrapList } from '../../data/learnerBoostDatabasePart2';
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
  Lightbulb,
  Headphones,
  AlertOctagon,
  Target,
  Play,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const ListeningTrapDeconstructLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<ListeningTrapDeconstructItem[]>(initialListeningTrapList);
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
      item.scenarioTitle.toLowerCase().includes(q) ||
      item.trapType.toLowerCase().includes(q) ||
      item.theHiddenTrap.toLowerCase().includes(q) ||
      item.solutionStrategy.toLowerCase().includes(q) ||
      item.audioTranscript.speakerA.toLowerCase().includes(q) ||
      item.audioTranscript.speakerB.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraListeningTrapList.map((item, idx) => ({
        ...item,
        id: `${item.id}_more_${extraLoadedCount + 1}_${idx}`,
      }));
      setList((prev) => [...prev, ...nextBatch]);
      setExtraLoadedCount((prev) => prev + 1);
      setIsLoadingMore(false);
    }, 350);
  };

  const handleSpeakAudio = () => {
    const text = `${currentItem.audioTranscript.speakerA} ... ${currentItem.audioTranscript.speakerB} ${
      currentItem.audioTranscript.speakerATurn2 ? '... ' + currentItem.audioTranscript.speakerATurn2 : ''
    }`;
    speechService.speak(text);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-950/80 via-slate-900 to-rose-950/60 p-6 sm:p-8 border border-red-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold tracking-wide uppercase">
              <Headphones className="w-3.5 h-3.5" />
              Chiến Thuật Nghe Hiểu Phản Xạ JLPT N2-N1 Không Sập Bẫy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              66. Bóc Tách Bẫy Nghe Hiểu N2-N1 Sokkai & Point (聴解トラップ)
            </h2>
            <p className="text-sm sm:text-base text-red-200/80 max-w-2xl leading-relaxed">
              Vạch trần 4 thủ thuật gài bẫy kinh điển của hội đồng ra đề JEES: Bẫy đổi ý phút chót (後出し条件), Phủ định kép gián tiếp (~ないわけではない),
              Ngữ điệu thở dài/bối rối (結構です / ありがたいんだけど), và Bẫy mồi nhử thứ tự hành động (その前に).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-red-950/40 transition-all border border-red-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-red-900/60 border border-red-800/60 text-xs font-medium text-red-200">
              Tổng bẫy nghe: <span className="font-bold text-red-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-red-800/60">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-red-900/50 text-red-300 hover:text-white'
            }`}
          >
            Phòng Lab Nghe Bẫy (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-red-900/50 text-red-300 hover:text-white'
            }`}
          >
            Ma Trận Bẫy Nghe (Grid View)
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setSelectedQuizAnswer(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-red-900/50 text-red-300 hover:text-white'
            }`}
          >
            Thi Thử Bài Nghe (Quiz Mode)
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo kịch bản bẫy, loại bẫy, từ khóa..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-red-500"
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
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  {currentItem.trapType}
                </span>
                <button
                  onClick={handleSpeakAudio}
                  className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Nghe toàn bộ đoạn băng
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {currentItem.scenarioTitle}
              </h3>

              {/* Dialogue Transcript */}
              <div className="my-6 p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-red-400" />
                  Kịch bản hội thoại chuẩn đề thi JLPT:
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80">
                    <span className="font-bold text-red-400 mr-2">Người nói A:</span>
                    <span className="text-slate-100">{currentItem.audioTranscript.speakerA}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80">
                    <span className="font-bold text-blue-400 mr-2">Người nói B:</span>
                    <span className="text-slate-100">{currentItem.audioTranscript.speakerB}</span>
                  </div>
                  {currentItem.audioTranscript.speakerATurn2 && (
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80">
                      <span className="font-bold text-red-400 mr-2">Người nói A (chốt):</span>
                      <span className="text-slate-100">{currentItem.audioTranscript.speakerATurn2}</span>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-300 pt-3 border-t border-slate-800/80 leading-relaxed">
                  <span className="text-slate-400 font-semibold block mb-0.5">Dịch nghĩa đoạn nghe:</span>
                  {currentItem.translation}
                </div>
              </div>

              {/* Trap & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                  <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase">
                    <AlertOctagon className="w-4 h-4" />
                    Cái Bẫy Đã Giăng Sẵn
                  </div>
                  <p className="text-xs text-rose-200/90 leading-relaxed">
                    {currentItem.theHiddenTrap}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                    <Target className="w-4 h-4" />
                    Chiến Thuật Phá Bẫy Trong 3 Giây
                  </div>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">
                    {currentItem.solutionStrategy}
                  </p>
                </div>
              </div>

              {/* Toggle Deep Explanation */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation ? 'Thu gọn phân tích tâm lý đề thi' : 'Xem mục giải thích chi tiết hơn'}
                </button>
              </div>

              {/* Deep Explanation Panel */}
              {showDeepExplanation && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase">
                      <Info className="w-4 h-4" />
                      Phân Tích Dòng Chảy Tư Duy Bài Nghe
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentItem.readingTranscript}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Quiz & Stats Sidebar (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                Câu hỏi thi chuẩn format
              </div>
              <p className="text-xs sm:text-sm text-white font-bold">
                {currentItem.questionPrompt}
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
                          ? 'bg-red-950/60 border-red-500/80 text-red-200 font-semibold'
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
                  <div className="font-semibold text-red-400 mb-1">
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
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-red-500/50 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-red-400 font-semibold">#{idx + 1}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/30 truncate max-w-[150px]">
                  {item.trapType}
                </span>
              </div>
              <div className="text-base font-bold text-white group-hover:text-red-300 transition-colors">
                {item.scenarioTitle}
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">
                {item.theHiddenTrap}
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
              <span className="font-semibold text-red-400">
                Bẫy nghe {currentIndex + 1} / {filteredList.length}
              </span>
              <span>{currentItem.scenarioTitle}</span>
            </div>

            <div className="text-base sm:text-lg font-bold text-white">
              {currentItem.questionPrompt}
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
                        ? 'bg-red-950 border-red-500 text-red-200 font-semibold'
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
                <div className="font-bold text-red-400 flex items-center gap-2">
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
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs text-white font-semibold"
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
