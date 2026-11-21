import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { AmaePsychologyItem } from '../../types/culturalPart5';
import { initialAmaeList, extraAmaeList } from '../../data/culturalLearningDatabasePart5';
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
  HeartHandshake,
  Heart,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const AmaePsychologyLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<AmaePsychologyItem[]>(initialAmaeList);
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
      item.socialConcept.toLowerCase().includes(q) ||
      item.kanjiHeading.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.doiTakeoPsychologyInsight.toLowerCase().includes(q) ||
      item.grammarConnection.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraAmaeList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-950/80 via-slate-900 to-rose-950/60 p-6 sm:p-8 border border-pink-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold tracking-wide uppercase">
              <HeartHandshake className="w-3.5 h-3.5" />
              Tâm Lý Học Xã Hội & Cội Nguồn Ngữ Pháp Tiếp Nhận Ơn Huệ
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              69. Tâm Lý Học &quot;Amae&quot; & Ngữ Pháp Nhờ Vả (甘えの構造)
            </h2>
            <p className="text-sm sm:text-base text-pink-200/80 max-w-2xl leading-relaxed">
              Giải mã công trình thế kỷ của bác sĩ Doi Takeo: Tại sao người Nhật khao khát được nương tựa và dung dưỡng tình cảm (Amae);
              cội nguồn tâm lý đằng sau cấu trúc ~てもらう, ~させていただきます, nghệ thuật &quot;お言葉に甘えて&quot; và mặt trái ỷ lại trong xã hội hiện đại.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-pink-950/40 transition-all border border-pink-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-pink-900/60 border border-pink-800/60 text-xs font-medium text-pink-200">
              Tổng nghiên cứu: <span className="font-bold text-pink-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-pink-800/60">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-pink-900/50 text-pink-300 hover:text-white'
            }`}
          >
            Thẻ Tâm Lý Amae (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-pink-900/50 text-pink-300 hover:text-white'
            }`}
          >
            Ma Trận Tâm Lý & Ngữ Pháp (Grid View)
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setSelectedQuizAnswer(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-pink-900/50 text-pink-300 hover:text-white'
            }`}
          >
            Trắc Nghiệm Tâm Lý Amae (Quiz Mode)
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo khái niệm Amae, cấu trúc ngữ pháp..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-pink-500"
          />
        </div>

        {activeTab === 'card' && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 self-end sm:self-auto">
            <span>
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

      {/* Main Tab Content */}
      {activeTab === 'card' && currentItem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Card (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300">
                  Tâm lý học Doi Takeo
                </span>
                <button
                  onClick={() => handleSpeak(currentItem.kanjiHeading)}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-pink-600/30 hover:bg-pink-600/50 text-pink-200 font-medium transition-colors border border-pink-500/30"
                >
                  <Volume2 className="w-3.5 h-3.5 text-pink-400" />
                  Nghe từ khóa
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide mb-2">
                {currentItem.kanjiHeading}
              </h3>
              <div className="text-xs sm:text-sm text-pink-300 font-mono mb-4">
                {currentItem.reading}
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm sm:text-base text-slate-200 leading-relaxed">
                {currentItem.doiTakeoPsychologyInsight}
              </div>

              {/* Grammar & Sociological Impact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-xl bg-pink-950/30 border border-pink-800/30 space-y-2">
                  <div className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                    Liên Kết Ngữ Pháp Tiếp Nhận Ơn Huệ:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentItem.grammarConnection}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/30 space-y-2">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    Tác Động Xã Hội Học & Ranh Giới:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentItem.sociologicalImpact}
                  </p>
                </div>
              </div>

              {/* Conversational Example */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Mẫu câu thực tế vận dụng:</span>
                  <button
                    onClick={() => handleSpeak(currentItem.conversationalExample.japanese)}
                    className="text-emerald-400 hover:text-emerald-300"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm font-semibold text-white leading-relaxed">
                  {currentItem.conversationalExample.japanese}
                </div>
                <div className="text-xs text-emerald-300/80 font-mono">
                  {currentItem.conversationalExample.reading}
                </div>
                <div className="text-xs text-slate-300 pt-1 border-t border-slate-800">
                  {currentItem.conversationalExample.translation}
                </div>
                <div className="text-xs text-emerald-300 font-medium bg-emerald-950/40 p-2 rounded-lg">
                  💡 Sắc thái: {currentItem.conversationalExample.nuanceNote}
                </div>
              </div>

              {/* Toggle Deep Explanation */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation ? 'Thu gọn phân tích tâm lý' : 'Xem mục giải thích chi tiết hơn'}
                </button>
              </div>

              {/* Deep Explanation Panel */}
              {showDeepExplanation && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-pink-400 flex items-center gap-1.5 uppercase">
                      <Info className="w-4 h-4" />
                      Chiều Sâu Văn Hóa Ứng Xử
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentItem.culturalExplanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Quiz & Stats Sidebar (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                Trắc nghiệm tâm lý Amae
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
                          ? 'bg-pink-950/60 border-pink-500/80 text-pink-200 font-semibold'
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
                  <div className="font-semibold text-pink-400 mb-1">
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
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-pink-500/50 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-pink-400 font-semibold">#{idx + 1}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/30">
                  Tâm lý học
                </span>
              </div>
              <div className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                {item.kanjiHeading}
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                {item.socialConcept}
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
              <span className="font-semibold text-pink-400">
                Chuyên đề {currentIndex + 1} / {filteredList.length}
              </span>
              <span>{currentItem.kanjiHeading}</span>
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
                        ? 'bg-pink-950 border-pink-500 text-pink-200 font-semibold'
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
                <div className="font-bold text-pink-400 flex items-center gap-2">
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
                className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-xs text-white font-semibold"
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
