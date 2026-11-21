import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { HissatsuwazaBattleItem } from '../../types/edutainment';
import { initialHissatsuwazaList, extraHissatsuwazaList } from '../../data/edutainmentDatabasePart2';
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
  Swords,
  Flame,
  Zap,
  Shield,
  HelpCircle,
  Info,
  Lightbulb,
  Crosshair,
  Award,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const HissatsuwazaBattleLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<HissatsuwazaBattleItem[]>(initialHissatsuwazaList);
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
      item.moveName.toLowerCase().includes(q) ||
      item.kanjiWithFurigana.toLowerCase().includes(q) ||
      item.seriesAndUser.toLowerCase().includes(q) ||
      item.translation.toLowerCase().includes(q) ||
      item.sampleChant.battleChant.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraHissatsuwazaList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/80 via-orange-950/60 to-red-950/40 p-6 sm:p-8 border border-amber-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
              <Swords className="w-3.5 h-3.5" />
              Mỹ Học Hán Tự Uy Lực & Tiếng Hét Tuyệt Kỹ Shonen
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              61. Tiếng Hét Tuyệt Kỹ Shonen & Mỹ Học Hissatsuwaza (必殺技)
            </h2>
            <p className="text-sm sm:text-base text-amber-200/80 max-w-2xl leading-relaxed">
              Giải mã các chiêu thức hủy diệt chấn động tuổi thơ (Rasengan, Kamehameha, Hinokami Kagura, Getsuga Tensho, Bankai, Ryusuisen);
              khám phá kỹ thuật ghép Hán tự sấm sét (Ateji), ngữ âm học kích phát nội lực và quy tắc đặt tên kinh điển của Shonen Jump.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-amber-950/40 transition-all border border-amber-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-amber-900/60 border border-amber-800/60 text-xs font-medium text-amber-200">
              Tổng tuyệt kỹ: <span className="font-bold text-amber-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-amber-800/60">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-900/50 text-amber-300 hover:text-white'
            }`}
          >
            Đấu Trường Tuyệt Kỹ (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-900/50 text-amber-300 hover:text-white'
            }`}
          >
            Bảng Phong Thần Chiêu Thức (Grid View)
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setSelectedQuizAnswer(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-900/50 text-amber-300 hover:text-white'
            }`}
          >
            Trắc Nghiệm Hán Tự Tuyệt Kỹ (Quiz Mode)
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên chiêu thức, nhân vật, tác phẩm, thần chú..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        {activeTab === 'card' && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 self-end sm:self-auto">
            <span>
              Tuyệt kỹ {currentIndex + 1} / {filteredList.length}
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
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  {currentItem.seriesAndUser}
                </span>
                <button
                  onClick={() => handleSpeak(currentItem.moveName)}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 font-medium transition-colors border border-amber-500/30"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  Hét tên chiêu thức
                </button>
              </div>

              {/* Move Name */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                  {currentItem.moveName}
                </h3>
                <div className="text-xs sm:text-sm text-amber-300 font-mono">
                  {currentItem.kanjiWithFurigana}
                </div>
                <div className="text-xs sm:text-sm text-slate-300">
                  <span className="text-amber-400 font-semibold mr-1">Dịch nghĩa uy lực:</span>
                  {currentItem.translation}
                </div>
              </div>

              {/* Epic Battle Chant Showcase */}
              <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-red-950/40 to-slate-950 border border-amber-700/30 relative space-y-3">
                <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-red-400" />
                    Khẩu Quyết Thi Triển Chiêu Thức (詠唱 & 叫び)
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.sampleChant.battleChant)}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white leading-relaxed tracking-wide font-sans">
                  {currentItem.sampleChant.battleChant}
                </div>
                <div className="text-xs sm:text-sm text-amber-200/70 font-mono leading-relaxed">
                  {currentItem.sampleChant.reading}
                </div>
                <div className="pt-3 border-t border-amber-800/40 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  <span className="text-amber-400 font-semibold block mb-0.5">Dịch nghĩa khí phách:</span>
                  {currentItem.sampleChant.epicMeaning}
                </div>
              </div>

              {/* Toggle Deep Explanation */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation ? 'Thu gọn phân tích mỹ học' : 'Xem mục giải thích chi tiết hơn'}
                </button>
              </div>

              {/* Deep Explanation Panel */}
              {showDeepExplanation && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Kanji Aesthetics & Ateji */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Info className="w-4 h-4" />
                        Mỹ Học Kết Hợp Chữ Hán & Ateji
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <span className="text-slate-400 font-semibold block">Mỹ học Hán tự tượng thanh tượng hình:</span>
                        {currentItem.linguisticDepth.kanjiCompositionAesthetics}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Kỹ thuật Ateji (viết Hán đọc Ngoại ngữ):</span>
                        {currentItem.linguisticDepth.atejiTechnique}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Ngữ âm học tiếng hét chiến đấu (Battle Cry):</span>
                        {currentItem.linguisticDepth.battleCryPhonetics}
                      </div>
                    </div>

                    {/* Cultural Deep Dive */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                        <Zap className="w-4 h-4" />
                        Cội Nguồn Kiếm Đạo & Shonen Jump
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <span className="text-slate-400 font-semibold block">Nguồn gốc Kiếm đạo Kendo & Ninja:</span>
                        {currentItem.culturalDeepDive.samuraiKendoRoots}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Quy tắc vàng Shonen Jump:</span>
                        {currentItem.culturalDeepDive.weeklyJumpNamingRules}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Văn hóa Gokko-asobi tuổi thơ Nhật:</span>
                        {currentItem.culturalDeepDive.childhoodPretendPlay}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Quiz & Stats Sidebar (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                Trắc nghiệm Hán tự & nguồn gốc
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
                          ? 'bg-amber-950/60 border-amber-500/80 text-amber-200'
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
                  <div className="font-semibold text-amber-400 mb-1">
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
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-amber-400 font-semibold">#{idx + 1}</span>
                <span className="truncate max-w-[150px]">{item.seriesAndUser}</span>
              </div>
              <div className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                {item.moveName}
              </div>
              <div className="text-xs font-mono text-amber-300">
                {item.kanjiWithFurigana}
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">
                {item.translation}
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
              <span className="font-semibold text-amber-400">
                Tuyệt kỹ {currentIndex + 1} / {filteredList.length}
              </span>
              <span>{currentItem.seriesAndUser}</span>
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
                        ? 'bg-amber-950 border-amber-500 text-amber-200 font-semibold'
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
                <div className="font-bold text-amber-400 flex items-center gap-2">
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
                Tuyệt kỹ trước
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  setSelectedQuizAnswer(null);
                }}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs text-white font-semibold"
              >
                Tuyệt kỹ kế tiếp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
