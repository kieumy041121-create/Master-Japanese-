import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { SynonymNuanceItem } from '../../types/vocabKanjiExtended';
import { initialSynonymList, extraSynonymList } from '../../data/vocabKanjiExtendedDatabase';
import {
  Volume2,
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Grid,
  CreditCard,
  GraduationCap,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

interface SynonymNuanceLabProps {
  currentLevel: JLPTLevel;
}

export const SynonymNuanceLab: React.FC<SynonymNuanceLabProps> = ({ currentLevel }) => {
  const [items, setItems] = useState<SynonymNuanceItem[]>(initialSynonymList);
  const [hasLoadedExtra, setHasLoadedExtra] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(true);

  // Quiz state
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const handleLoadExtra = () => {
    if (!hasLoadedExtra) {
      setItems((prev) => [...prev, ...extraSynonymList]);
      setHasLoadedExtra(true);
    }
  };

  const playJapaneseAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[（(].*?[）)]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.conceptTitle.toLowerCase().includes(q) ||
      item.generalMeaning.toLowerCase().includes(q) ||
      item.wordsInPair.some(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.reading.toLowerCase().includes(q) ||
          w.coreNuance.toLowerCase().includes(q) ||
          w.exampleSentence.toLowerCase().includes(q)
      )
    );
  });

  const activeItem = filteredItems[currentIndex] || filteredItems[0];

  return (
    <div className="space-y-6 animate-fadeIn text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-[#1c1409] border border-amber-900/40 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800/80">
                PH1 · CHUYÊN MỤC 84
              </span>
              <span className="text-xs text-slate-400">· Giải mã bẫy đề thi N3-N1</span>
              <span className="text-xs text-amber-300/80 font-mono px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/40">
                JLPT {currentLevel}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <span>Bách Khoa Từ Đồng Nghĩa & Ma Trận Sắc Thái</span>
              <span className="text-base font-jp text-amber-400 font-normal">類義語使い分け・ニュアンス比較</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Khắc phục hoàn toàn lỗi dùng từ dịch thô Việt - Nhật! Bóc tách ranh giới tinh vi giữa các cặp từ đồng nghĩa kinh điển (Kaeru vs Aratameru, Manzoku vs Nattoku, Kotowaru vs Jitai...) kèm cảnh báo bối cảnh cấm kỵ và bài kiểm tra phản xạ 3 giây.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-950/80 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('card')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Đối So Sắc Thái</span>
            </button>
            <button
              onClick={() => setActiveTab('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Ma Trận 10 Nhóm</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Đấu Trường Bắt Bẫy</span>
            </button>
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-400">
            Hiển thị <strong className="text-white">{filteredItems.length} nhóm từ đồng nghĩa</strong> bẫy đề thi
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm từ đồng nghĩa (変える, 満足, 辞退...)"
              className="pl-8 pr-3 py-1 bg-slate-900/90 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 w-52 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* VIEW 1: CARD VIEW */}
      {activeTab === 'card' && activeItem && (
        <div className="space-y-4">
          {/* Navigator */}
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
            <span className="font-medium">
              Chuyên đề {currentIndex + 1} / {filteredItems.length}:{' '}
              <strong className="text-amber-300">{activeItem.conceptTitle}</strong>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors cursor-pointer"
              >
                ‹ Nhóm trước
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors cursor-pointer"
              >
                Nhóm tiếp ›
              </button>
            </div>
          </div>

          <div className="bg-[#0b101f] border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl space-y-6">
            {/* Title & Core Meaning */}
            <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  ĐỐI SÁNH SẮC THÁI NGỮ NGHĨA
                </span>
                <h2 className="text-lg md:text-xl font-bold text-white mt-1">
                  {activeItem.conceptTitle}
                </h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {activeItem.generalMeaning}
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-950/70 border border-amber-800 text-amber-300 text-xs font-mono font-semibold rounded-full shrink-0">
                JLPT {activeItem.jlptLevel} Focus
              </span>
            </div>

            {/* Nuance Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeItem.wordsInPair.map((w, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 hover:border-amber-600/70 rounded-xl p-4 transition-all hover:bg-slate-800/60 flex flex-col justify-between space-y-3 group"
                >
                  <div>
                    {/* Header: Word + Audio */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div>
                        <span className="text-xl font-bold font-jp text-white group-hover:text-amber-300 transition-colors">
                          {w.word}
                        </span>
                        <span className="text-xs text-slate-400 ml-2 font-mono">({w.reading})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          {w.jlptLevel}
                        </span>
                        <button
                          onClick={() => playJapaneseAudio(w.word)}
                          className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-amber-600 rounded-lg transition-colors cursor-pointer"
                          title="Nghe phát âm từ"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sắc thái cốt lõi */}
                    <div className="mt-2 text-xs space-y-1.5">
                      <div className="text-amber-300/90 font-medium bg-amber-950/30 p-2 rounded-lg border border-amber-900/40">
                        <strong className="text-amber-300">Sắc thái cốt lõi: </strong>
                        {w.coreNuance}
                      </div>

                      <div className="text-slate-300">
                        <strong className="text-emerald-400">Bối cảnh phù hợp: </strong>
                        {w.appropriateContext}
                      </div>

                      {/* Taboo context */}
                      <div className="text-rose-300 bg-rose-950/20 p-2 rounded-lg border border-rose-900/30 flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>Cấm kỵ / Không tự nhiên: </strong>
                          {w.tabooOrUnnatural}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Example Sentence */}
                  <div className="pt-2.5 border-t border-slate-800/80 text-xs space-y-1 bg-slate-950/40 p-2.5 rounded-lg">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-jp text-white leading-relaxed font-medium">
                        {w.exampleSentence}
                      </p>
                      <button
                        onClick={() => playJapaneseAudio(w.exampleSentence)}
                        className="text-slate-400 hover:text-white shrink-0 p-1"
                        title="Nghe câu ví dụ"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 font-jp">{w.exampleReading}</p>
                    <p className="text-[11px] text-slate-300">➔ {w.exampleMeaning}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Distinction Tip & Summary */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Mẹo Phân Biệt Nhanh 3 Giây:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-mono">
                {activeItem.quickDistinctionTip}
              </p>
            </div>

            {/* Detailed Explanation Toggle */}
            <div className="border border-amber-950 bg-amber-950/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowDetailedExplanation(!showDetailedExplanation)}
                className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Ma Trận So Sánh Tóm Tắt & Bẫy Đề Thi JLPT</span>
                </span>
                {showDetailedExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showDetailedExplanation && (
                <div className="p-4 pt-0 border-t border-amber-900/30 text-xs text-slate-300 space-y-3 leading-relaxed">
                  <p>{activeItem.comparativeMatrixSummary}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: GRID VIEW */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#0b101f] border border-slate-800 hover:border-amber-600/70 rounded-xl p-4 transition-all hover:bg-slate-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800/60">
                    Cặp phân biệt #{idx + 1}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">JLPT {item.jlptLevel}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{item.conceptTitle}</h3>
                <p className="text-xs text-slate-400 mb-3">{item.generalMeaning}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                  {item.wordsInPair.map((w, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-jp font-bold text-amber-300 shrink-0">{w.word}:</span>
                      <span className="text-slate-300 text-[11px]">{w.coreNuance}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-500">{item.wordsInPair.length} từ trong nhóm</span>
                <button
                  onClick={() => {
                    setCurrentIndex(filteredItems.findIndex((it) => it.id === item.id));
                    setActiveTab('card');
                  }}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Xem bẫy chi tiết <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: QUIZ TEST */}
      {activeTab === 'quiz' && (
        <div className="bg-[#0b101f] border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <span>Trắc Nghiệm Bắt Bẫy: Chọn Từ Đúng Ngữ Cảnh</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Các câu hỏi trích từ dạng bài chọn từ thích hợp (言葉の使い方) trong đề thi JLPT N3-N1.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Điểm số:</span>
              <div className="text-lg font-bold text-emerald-400 font-mono">{quizScore} điểm</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item, qIdx) => {
              const q = item.quizQuestion;
              const userAnswer = quizAnswers[item.id];

              return (
                <div key={item.id} className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-bold">Câu hỏi #{qIdx + 1}</span>
                    <span className="text-xs text-slate-400 font-mono">JLPT {item.jlptLevel}</span>
                  </div>

                  <p className="text-xs md:text-sm text-white font-jp font-semibold leading-relaxed p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = optIdx === q.correctIndex;
                      const isSelected = userAnswer === optIdx;

                      let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700';
                      if (userAnswer !== undefined) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950 border-emerald-600 text-emerald-300 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-950 border-rose-600 text-rose-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={userAnswer !== undefined}
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, [item.id]: optIdx }));
                            if (isCorrect) setQuizScore((prev) => prev + 10);
                          }}
                          className={`p-2 rounded-lg border transition-all cursor-pointer font-jp font-semibold ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {userAnswer !== undefined && (
                    <div className="text-[11px] text-slate-300 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                      <strong>Giải thích:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Button Tải thêm 5 cái (+5) */}
      {!hasLoadedExtra && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleLoadExtra}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-600/30 flex items-center gap-2 transition-all cursor-pointer text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tải thêm 5 nhóm từ đồng nghĩa nâng cao (+5 Nạp thêm)</span>
          </button>
        </div>
      )}
      {hasLoadedExtra && (
        <div className="text-center text-xs text-slate-400 py-2">
          ✓ Đã nạp đầy đủ toàn bộ 10 nhóm từ đồng nghĩa bẫy sắc thái JLPT N3-N1.
        </div>
      )}
    </div>
  );
};
