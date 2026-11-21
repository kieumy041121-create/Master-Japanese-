import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { NohKabukiTheatricalItem } from '../../types/culturalPart5';
import { initialNohKabukiList, extraNohKabukiList } from '../../data/culturalLearningDatabasePart5';
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
  Tv,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const NohKabukiTheatricalLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<NohKabukiTheatricalItem[]>(initialNohKabukiList);
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
      item.conceptTitle.toLowerCase().includes(q) ||
      item.kanjiHeading.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.sinoVietnamese.toLowerCase().includes(q) ||
      item.theatricalEssence.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraNohKabukiList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-950/80 via-slate-900 to-indigo-950/60 p-6 sm:p-8 border border-violet-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Kịch Khúc Cung Đình, Kabuki Thời Edo & Mỹ Học Zeami
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              68. Kịch Nghệ Noh & Kabuki (能・歌舞伎の美学)
            </h2>
            <p className="text-sm sm:text-base text-violet-200/80 max-w-2xl leading-relaxed">
              Giải mã mỹ học U Huyền (幽玄 Yugen), tiết tấu Tự Phá Cấp (序破急 Jo-Ha-Kyu), khoảng lặng nghệ thuật (間 Ma) và tâm lý học mặt nạ Noh;
              bóc tách ngôn ngữ thoại kịch cổ điển, điệu bộ Mie và từ vựng kịch trường N1.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-violet-950/40 transition-all border border-violet-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-violet-900/60 border border-violet-800/60 text-xs font-medium text-violet-200">
              Tổng khái niệm: <span className="font-bold text-violet-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-violet-800/60">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-violet-900/50 text-violet-300 hover:text-white'
            }`}
          >
            Thẻ Mỹ Học Sân Khấu (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-violet-900/50 text-violet-300 hover:text-white'
            }`}
          >
            Bảng Khái Niệm Noh-Kabuki (Grid View)
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setSelectedQuizAnswer(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-violet-900/50 text-violet-300 hover:text-white'
            }`}
          >
            Trắc Nghiệm Kịch Nghệ & N1 (Quiz Mode)
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo khái niệm Noh, Kabuki, Yugen, Jo-Ha-Kyu..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-violet-500"
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
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300">
                  {currentItem.sinoVietnamese}
                </span>
                <button
                  onClick={() => handleSpeak(currentItem.kanjiHeading)}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 font-medium transition-colors border border-violet-500/30"
                >
                  <Volume2 className="w-3.5 h-3.5 text-violet-400" />
                  Nghe âm thanh
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide mb-2">
                {currentItem.kanjiHeading}
              </h3>
              <div className="text-xs sm:text-sm text-violet-300 font-mono mb-4">
                {currentItem.reading}
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm sm:text-base text-slate-200 leading-relaxed">
                {currentItem.theatricalEssence}
              </div>

              {/* Mask Psychology & Archaism */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-800/30 space-y-2">
                  <div className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                    Tâm Lý Mặt Nạ & Biểu Cảm:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentItem.stageMaskPsychology}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/30 space-y-2">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Ngôn Ngữ Thoại Cổ Điển & N1:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentItem.linguisticArchaism}
                  </p>
                </div>
              </div>

              {/* Academic Relevance */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300">
                <span className="font-bold text-amber-400 block mb-1">Ứng dụng thi cử JLPT N1:</span>
                {currentItem.academicRelevance}
              </div>

              {/* Toggle Deep Explanation */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation ? 'Thu gọn phân tích mỹ học' : 'Xem mục giải thích chi tiết hơn'}
                </button>
              </div>

              {/* Deep Explanation Panel */}
              {showDeepExplanation && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-violet-400 flex items-center gap-1.5 uppercase">
                      <Info className="w-4 h-4" />
                      Chiều Sâu Văn Hóa & Triết Học Kịch Nghệ
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
              <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                Trắc nghiệm kịch nghệ Noh & Kabuki
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
                          ? 'bg-violet-950/60 border-violet-500/80 text-violet-200 font-semibold'
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
                  <div className="font-semibold text-violet-400 mb-1">
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
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-violet-400 font-semibold">#{idx + 1}</span>
                <span className="text-slate-300 font-mono">{item.sinoVietnamese}</span>
              </div>
              <div className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                {item.kanjiHeading}
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                {item.theatricalEssence}
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
              <span className="font-semibold text-violet-400">
                Khái niệm {currentIndex + 1} / {filteredList.length}
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
                        ? 'bg-violet-950 border-violet-500 text-violet-200 font-semibold'
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
                <div className="font-bold text-violet-400 flex items-center gap-2">
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
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs text-white font-semibold"
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
