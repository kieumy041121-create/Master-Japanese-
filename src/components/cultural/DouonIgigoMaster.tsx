import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { DouonIgigoItem } from '../../types/cultural';
import { initialDouonIgigoList, extraDouonIgigoList } from '../../data/culturalLearningDatabasePart4';
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
  Split,
  AlertOctagon,
  Eye,
  Zap,
  HelpCircle,
  Info,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const DouonIgigoMaster: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<DouonIgigoItem[]>(initialDouonIgigoList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);

  // Contextual quick test state
  const [contextTestAnswer, setContextTestAnswer] = useState<string | null>(null);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const q = searchQuery.toLowerCase();
    const kanjiMatches = item.confusingPairs.some(
      (pair) =>
        pair.kanji.toLowerCase().includes(q) ||
        pair.sinoVietnamese.toLowerCase().includes(q) ||
        pair.coreMeaning.toLowerCase().includes(q) ||
        pair.nuanceDistinction.toLowerCase().includes(q)
    );
    return (
      item.soundHiragana.toLowerCase().includes(q) ||
      item.romaji.toLowerCase().includes(q) ||
      kanjiMatches
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraDouonIgigoList.map((item, idx) => ({
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950/70 via-slate-900 to-blue-950/40 p-6 sm:p-8 border border-cyan-900/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
              <Split className="w-3.5 h-3.5" />
              Bóc Tách Cặp Từ Đồng Âm & Phân Biệt Sắc Thái N2-N1
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              51. Đối Chiếu Từ Đồng Âm Dị Nghĩa & Bẫy Chữ Hán Dễ Nhầm
            </h2>
            <p className="text-sm sm:text-base text-cyan-200/80 max-w-2xl leading-relaxed">
              Làm chủ các cụm từ đồng âm gây bối rối nhất như おさめる (収/納/治/修), はかる (計/測/量/図/諮),
              つくる (作/造/創); bóc trần bẫy đề thi JLPT N2-N1 và nguyên tắc quyết định trong 3 giây.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-cyan-950/40 transition-all border border-cyan-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-cyan-300">
              Tổng cụm âm: <span className="font-bold text-cyan-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            Thẻ Đối Chiếu Sắc Thái (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            Bảng Tra Cứu Cặp Âm (Grid View)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            Trắc Nghiệm Phản Xạ Điền Chữ Hán Chuẩn
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
        <div className="text-xs text-slate-400 font-medium pl-1 hidden sm:block">
          Tra cứu âm đọc Hiragana hoặc chữ Hán cần phân biệt:
        </div>
        <div className="relative flex-1 sm:max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo âm (おさめる, はかる...), chữ Hán (収, 納, 治...)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {filteredList.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
          Không tìm thấy cụm từ đồng âm phù hợp.
        </div>
      ) : activeTab === 'card' ? (
        /* CARD VIEW */
        <div className="space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Header controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-black text-cyan-300">
                  {currentItem.soundHiragana}
                </span>
                <span className="text-xs text-slate-400 font-mono">({currentItem.romaji})</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                  {currentItem.confusingPairs.length} chữ Hán cùng âm
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 mr-2">
                  {currentIndex + 1} / {filteredList.length}
                </span>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    setShowDeepExplanation(false);
                    setContextTestAnswer(null);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    setShowDeepExplanation(false);
                    setContextTestAnswer(null);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CONFUSING PAIRS MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentItem.confusingPairs.map((pair, pIdx) => (
                <div
                  key={pIdx}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/90 hover:border-cyan-500/40 transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-black text-white">{pair.kanji}</span>
                      <button
                        onClick={() => handleSpeak(pair.kanji)}
                        className="p-1.5 rounded-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 transition-colors"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/60 text-cyan-300">
                      Hán-Việt: {pair.sinoVietnamese}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-200">
                    Nghĩa cốt lõi: <span className="text-cyan-300">{pair.coreMeaning}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                    <span className="text-cyan-400 font-semibold block mb-0.5">Sắc thái phân biệt cốt lõi:</span>
                    {pair.nuanceDistinction}
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 font-medium block mb-1.5">
                      Cụm từ thường đi cùng (Collocations):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {pair.typicalCollocations.map((col, cIdx) => (
                        <span
                          key={cIdx}
                          onClick={() => handleSpeak(col)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs text-slate-200 hover:text-cyan-300 hover:border-cyan-500/50 cursor-pointer transition-all flex items-center gap-1"
                        >
                          {col}
                          <Volume2 className="w-2.5 h-2.5 opacity-60" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* QUICK IN-CONTEXT BLANK TEST */}
            <div className="mt-6 p-5 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-cyan-400" /> Thử Thách Phản Xạ 3 Giây - Điền Chữ Hán Chuẩn Vào Câu:
                </span>
                <span className="text-slate-400">Đọc: {currentItem.sampleQuizInContext.reading}</span>
              </div>

              <div className="text-base sm:text-lg font-bold text-white font-mono">
                {currentItem.sampleQuizInContext.sentenceWithBlank}
              </div>
              <div className="text-xs text-slate-300 italic">
                Nghĩa câu: &quot;{currentItem.sampleQuizInContext.translation}&quot;
              </div>

              {/* Choices */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  currentItem.sampleQuizInContext.correctKanji,
                  ...currentItem.sampleQuizInContext.distractors,
                ]
                  .sort()
                  .map((kanjiOpt, kIdx) => {
                    const isSelected = contextTestAnswer === kanjiOpt;
                    const isCorrect = kanjiOpt === currentItem.sampleQuizInContext.correctKanji;
                    let style = 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700';

                    if (contextTestAnswer !== null) {
                      if (isCorrect) style = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                      else if (isSelected) style = 'bg-rose-950/80 border-rose-500 text-rose-300';
                      else style = 'opacity-40 bg-slate-900 border-slate-800 text-slate-500';
                    }

                    return (
                      <button
                        key={kIdx}
                        disabled={contextTestAnswer !== null}
                        onClick={() => setContextTestAnswer(kanjiOpt)}
                        className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${style}`}
                      >
                        {kanjiOpt}
                      </button>
                    );
                  })}
              </div>

              {contextTestAnswer !== null && (
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed animate-fadeIn">
                  <span className="font-bold text-cyan-300 block mb-1">
                    {contextTestAnswer === currentItem.sampleQuizInContext.correctKanji
                      ? 'Chính xác tuyệt đối!'
                      : 'Chưa chính xác!'}
                  </span>
                  {currentItem.sampleQuizInContext.explanation}
                </div>
              )}
            </div>

            {/* Toggle Deep Explanation */}
            <div className="mt-6">
              <button
                onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs sm:text-sm font-semibold transition-all"
              >
                <BookOpen className="w-4 h-4" />
                {showDeepExplanation
                  ? 'Thu gọn mục bóc tách bẫy JLPT N2-N1 & mẹo nhớ bộ thủ'
                  : 'Xem mục giải thích chi tiết hơn: Vì sao cùng âm, Bóc tách cách ra đề bẫy JLPT N2-N1 & Nguyên tắc 3 giây'}
              </button>
            </div>

            {/* EXPANDABLE DEEP SECTION */}
            {showDeepExplanation && (
              <div className="mt-8 pt-6 border-t border-cyan-900/40 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                  <Info className="w-5 h-5" />
                  Mục Bóc Tách Bẫy Chữ Hán Đồng Âm Dị Nghĩa Chuyên Sâu
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Split className="w-4 h-4" /> Căn nguyên Ngữ âm học: Vì sao cùng âm lại chia nhiều chữ Hán?
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {currentItem.culturalDeepDive.etymologyWhySameSound}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4" /> Bóc tách bẫy ra đề của Hội đồng thi JLPT N2-N1:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {currentItem.culturalDeepDive.jlptExamPitfallAnalysis}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Eye className="w-4 h-4" /> Mẹo ghi nhớ hình ảnh qua Bộ thủ (Radicals):
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {currentItem.culturalDeepDive.visualMnemonics}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Zap className="w-4 h-4" /> Nguyên tắc quyết định trong 3 giây khi làm bài thi:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {currentItem.culturalDeepDive.quickDecisionRule}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : activeTab === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setActiveTab('card');
              }}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-medium">
                    {item.romaji}
                  </span>
                  <span className="text-xs text-slate-500">{item.confusingPairs.length} chữ Hán</span>
                </div>
                <h4 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {item.soundHiragana}
                </h4>

                <div className="space-y-1.5">
                  {item.confusingPairs.map((p, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="font-bold text-white px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {p.kanji}
                      </span>
                      <span className="text-slate-400 truncate">{p.coreMeaning}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>Xem đối chiếu sắc thái</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* QUIZ VIEW */
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
              <HelpCircle className="w-5 h-5" />
              Trắc Nghiệm Phản Xạ Đồng Âm Dị Nghĩa ({currentIndex + 1} / {filteredList.length})
            </div>
            <button
              onClick={() => setSelectedQuizAnswer(null)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Làm lại câu này
            </button>
          </div>

          <div className="space-y-4">
            <div className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {currentItem.quiz.question}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentItem.quiz.options.map((option, optIdx) => {
                const isSelected = selectedQuizAnswer === optIdx;
                const isCorrect = optIdx === currentItem.quiz.correctIndex;
                let btnStyle = 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-200';

                if (selectedQuizAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500/70 text-emerald-200 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/60 border-rose-500/70 text-rose-200';
                  } else {
                    btnStyle = 'opacity-40 bg-slate-900 border-slate-800 text-slate-500';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={selectedQuizAnswer !== null}
                    onClick={() => setSelectedQuizAnswer(optIdx)}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed flex-1">{option}</span>
                    {selectedQuizAnswer !== null && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {selectedQuizAnswer !== null && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedQuizAnswer !== null && (
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-900/50 text-slate-300 text-xs sm:text-sm animate-fadeIn leading-relaxed">
                <span className="font-bold text-cyan-300 block mb-1">
                  {selectedQuizAnswer === currentItem.quiz.correctIndex ? 'Chính xác!' : 'Giải thích đáp án chuẩn:'}
                </span>
                {currentItem.quiz.explanation}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition-colors"
            >
              Cụm âm trước
            </button>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Cụm âm tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
