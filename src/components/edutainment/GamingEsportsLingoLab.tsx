import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { GamingEsportsLingoItem } from '../../types/edutainment';
import { initialGamingList, extraGamingList } from '../../data/edutainmentDatabasePart2';
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
  Gamepad2,
  Crosshair,
  Swords,
  ShieldAlert,
  HelpCircle,
  Info,
  Lightbulb,
  Tv,
  MessageSquare,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const GamingEsportsLingoLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<GamingEsportsLingoItem[]>(initialGamingList);
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
      item.gamerTerm.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.meaningInGame.toLowerCase().includes(q) ||
      item.realWorldMetaphor.toLowerCase().includes(q) ||
      item.gameGenre.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraGamingList.map((item, idx) => ({
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

  const getGenreColor = (genre: string) => {
    switch (genre) {
      case 'FPS / Bắn súng':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'MOBA / Chiến thuật':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Gacha / RPG':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Đối kháng Fighting':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950/80 via-blue-950/60 to-indigo-950/40 p-6 sm:p-8 border border-cyan-800/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
              <Gamepad2 className="w-3.5 h-3.5" />
              Ngôn Ngữ Game Thủ & Chiến Thuật Esports Nhật Bản
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              60. Ngôn Ngữ Game Thủ & Chiến Thuật Esports (ゲーム用語)
            </h2>
            <p className="text-sm sm:text-base text-cyan-200/80 max-w-2xl leading-relaxed">
              Giải mã tiếng lóng phòng Voice Chat (凸る Totsuru, 沼る Numaru, 芋る Imoru, 煽り Aori, 神プ Kamipu);
              bóc tách quy tắc biến động từ đuôi &quot;-ru&quot;, cách ứng dụng ẩn dụ vào đời sống công sở và văn hóa Streamer VTuber đình đám.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-cyan-950/40 transition-all border border-cyan-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-cyan-900/60 border border-cyan-800/60 text-xs font-medium text-cyan-200">
              Tổng thuật ngữ: <span className="font-bold text-cyan-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-cyan-800/60">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-cyan-900/50 text-cyan-300 hover:text-white'
            }`}
          >
            Thẻ Thuật Ngữ Game (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-cyan-900/50 text-cyan-300 hover:text-white'
            }`}
          >
            Bảng Từ Lóng Game (Grid View)
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setSelectedQuizAnswer(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-cyan-900/50 text-cyan-300 hover:text-white'
            }`}
          >
            Trắc Nghiệm Game Thủ (Quiz Mode)
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo thuật ngữ game, ý nghĩa, thể loại..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {activeTab === 'card' && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 self-end sm:self-auto">
            <span>
              Thuật ngữ {currentIndex + 1} / {filteredList.length}
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
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getGenreColor(currentItem.gameGenre)}`}>
                  {currentItem.gameGenre}
                </span>
                <button
                  onClick={() => handleSpeak(currentItem.gamerTerm)}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 font-medium transition-colors border border-cyan-500/30"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  Nghe phát âm thuật ngữ
                </button>
              </div>

              {/* Term & Reading */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                  {currentItem.gamerTerm}
                </h3>
                <div className="text-xs sm:text-sm text-cyan-300 font-mono">
                  {currentItem.reading} · <span className="text-slate-400">{currentItem.originAndGrammarType}</span>
                </div>
              </div>

              {/* Meaning in Game & Real World */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 uppercase">
                    <Crosshair className="w-4 h-4" />
                    Ý Nghĩa Trong Game
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {currentItem.meaningInGame}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase">
                    <Lightbulb className="w-4 h-4" />
                    Ẩn Dụ Trong Đời Sống Thực Tế
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {currentItem.realWorldMetaphor}
                  </p>
                </div>
              </div>

              {/* Sample Gamer Dialogue */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-950 border border-cyan-800/30 space-y-3">
                <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Hội Thoại Voice Chat Điển Hình
                  </span>
                  <button
                    onClick={() => handleSpeak(`${currentItem.sampleGamerDialogue.player1} ${currentItem.sampleGamerDialogue.player2}`)}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-cyan-400 font-bold mr-2">Player 1:</span>
                    <span className="text-slate-100">{currentItem.sampleGamerDialogue.player1}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-blue-400 font-bold mr-2">Player 2:</span>
                    <span className="text-slate-100">{currentItem.sampleGamerDialogue.player2}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-cyan-900/40 leading-relaxed">
                  <span className="text-cyan-400 font-semibold block mb-0.5">Dịch nghĩa:</span>
                  {currentItem.sampleGamerDialogue.translation}
                </div>
              </div>

              {/* Toggle Deep Explanation */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showDeepExplanation ? 'Thu gọn phân tích chuyên sâu' : 'Xem mục giải thích chi tiết hơn'}
                </button>
              </div>

              {/* Deep Explanation Panel */}
              {showDeepExplanation && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Linguistic Depth */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <Info className="w-4 h-4" />
                        Ngữ Pháp & Rút Gọn Voice Chat
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <span className="text-slate-400 font-semibold block">Quy tắc biến động từ đuôi -ru:</span>
                        {currentItem.linguisticDepth.verbificationRule}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Khẩu lệnh rút gọn trong giao tranh:</span>
                        {currentItem.linguisticDepth.voiceChatShortcuts}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Cảnh báo ngữ cảnh lịch sự:</span>
                        {currentItem.linguisticDepth.dangerInPoliteContext}
                      </div>
                    </div>

                    {/* Cultural Deep Dive */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                        <Tv className="w-4 h-4" />
                        Văn Hóa Streamer & Tinh Thần Esports
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <span className="text-slate-400 font-semibold block">Tiến hóa từ Arcade đến Esports:</span>
                        {currentItem.culturalDeepDive.arcadeToEsportsEvolution}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Văn hóa Streamer VTuber Nhật:</span>
                        {currentItem.culturalDeepDive.streamerCommunityCulture}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                        <span className="text-slate-400 font-semibold block">Tinh thần đồng đội & Fair-play:</span>
                        {currentItem.culturalDeepDive.teamworkAndEtiquette}
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
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                Trắc nghiệm tri thức Gamer
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
                          ? 'bg-cyan-950/60 border-cyan-500/80 text-cyan-200'
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
                  <div className="font-semibold text-cyan-400 mb-1">
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
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-cyan-400 font-semibold">#{idx + 1}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getGenreColor(item.gameGenre)}`}>
                  {item.gameGenre}
                </span>
              </div>
              <div className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                {item.gamerTerm}
              </div>
              <div className="text-xs font-mono text-cyan-300">
                {item.reading}
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">
                {item.meaningInGame}
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
              <span className="font-semibold text-cyan-400">
                Thuật ngữ {currentIndex + 1} / {filteredList.length}
              </span>
              <span>{currentItem.gamerTerm}</span>
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
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-200 font-semibold'
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
                <div className="font-bold text-cyan-400 flex items-center gap-2">
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
                Thuật ngữ trước
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  setSelectedQuizAnswer(null);
                }}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs text-white font-semibold"
              >
                Thuật ngữ kế tiếp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
