import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { AntonymJukugoItem } from '../../types/vocabKanjiExtended';
import { initialAntonymList, extraAntonymList } from '../../data/vocabKanjiExtendedDatabase';
import {
  Volume2,
  BookOpen,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Grid,
  CreditCard,
  GraduationCap,
  ArrowRight,
  ArrowLeftRight,
  Split,
} from 'lucide-react';

interface AntonymJukugoLabProps {
  currentLevel: JLPTLevel;
}

export const AntonymJukugoLab: React.FC<AntonymJukugoLabProps> = ({ currentLevel }) => {
  const [items, setItems] = useState<AntonymJukugoItem[]>(initialAntonymList);
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
      setItems((prev) => [...prev, ...extraAntonymList]);
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
      item.pairTitle.toLowerCase().includes(q) ||
      item.wordA.word.toLowerCase().includes(q) ||
      item.wordA.hanViet.toLowerCase().includes(q) ||
      item.wordA.meaning.toLowerCase().includes(q) ||
      item.wordB.word.toLowerCase().includes(q) ||
      item.wordB.hanViet.toLowerCase().includes(q) ||
      item.wordB.meaning.toLowerCase().includes(q)
    );
  });

  const activeItem = filteredItems[currentIndex] || filteredItems[0];

  return (
    <div className="space-y-6 animate-fadeIn text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-[#0c1827] border border-cyan-900/40 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                PH1 · CHUYÊN MỤC 85
              </span>
              <span className="text-xs text-slate-400">· Kích hoạt tư duy liên tưởng đối xứng</span>
              <span className="text-xs text-amber-300/80 font-mono px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/40">
                JLPT {currentLevel}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <span>Cặp Từ Hán Tự Đối Nghĩa & Tương Hỗ</span>
              <span className="text-base font-jp text-cyan-400 font-normal">対義語・類義熟語マトリックス</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Chiếm trọng số điểm rất cao trong phần Moji-Goi JLPT. Học từ vựng theo cặp đối nghĩa nhị nguyên (拡大 ⇄ 縮小, 悲観 ⇄ 楽観, 謙虚 ⇄ 傲慢) giúp bạn ghi nhớ từ vựng nhanh gấp 3 lần nhờ nguyên lý đối xứng tri giác của não bộ!
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-950/80 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('card')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Đối Chiếu Cặp Từ</span>
            </button>
            <button
              onClick={() => setActiveTab('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Ma Trận 10 Cặp</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Đấu Ghép Cặp</span>
            </button>
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-400">
            Hiển thị <strong className="text-white">{filteredItems.length} cặp Hán tự đối nghĩa</strong> chuẩn thi JLPT
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm cặp từ (拡大, 悲観, 謙虚...)"
              className="pl-8 pr-3 py-1 bg-slate-900/90 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 w-52 sm:w-64"
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
              Cặp đối nghĩa {currentIndex + 1} / {filteredItems.length}:{' '}
              <strong className="text-cyan-300 font-jp text-sm">{activeItem.pairTitle}</strong>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors cursor-pointer"
              >
                ‹ Cặp trước
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors cursor-pointer"
              >
                Cặp tiếp ›
              </button>
            </div>
          </div>

          <div className="bg-[#0b101f] border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl space-y-6">
            {/* Title & Central Opposition Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white font-jp">
                    {activeItem.pairTitle}
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Logic đối lập: {activeItem.conceptualOpposition}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-xs font-semibold rounded-full shrink-0">
                JLPT {activeItem.jlptLevel} Essential
              </span>
            </div>

            {/* Side-by-side Dual Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Word A */}
              <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-600/70 rounded-2xl p-5 flex flex-col justify-between space-y-4 group">
                <div>
                  <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-bold uppercase">TỪ KHỞI ĐIỂM (A)</span>
                      <div className="text-3xl font-bold font-jp text-white group-hover:text-cyan-300 transition-colors mt-1">
                        {activeItem.wordA.word}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {activeItem.wordA.reading} · Hán Việt: <strong className="text-amber-300">{activeItem.wordA.hanViet}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => playJapaneseAudio(activeItem.wordA.word)}
                      className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-cyan-600 rounded-xl transition-colors cursor-pointer"
                      title="Nghe phát âm từ A"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Meaning & Character Breakdown */}
                  <div className="mt-3 text-xs space-y-2">
                    <div className="text-white font-semibold">
                      Ý nghĩa: {activeItem.wordA.meaning}
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 leading-relaxed">
                      <strong className="text-cyan-400">Chiết tự Hán tự: </strong>
                      {activeItem.wordA.characterDeconstruction}
                    </div>
                  </div>
                </div>

                {/* Example A */}
                <div className="pt-3 border-t border-slate-800/80 text-xs space-y-1 bg-slate-950/40 p-3 rounded-xl">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-jp text-white leading-relaxed font-medium">
                      {activeItem.wordA.exampleSentence}
                    </p>
                    <button
                      onClick={() => playJapaneseAudio(activeItem.wordA.exampleSentence)}
                      className="text-slate-400 hover:text-white shrink-0 p-1"
                      title="Nghe câu ví dụ"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 font-jp">{activeItem.wordA.exampleReading}</p>
                  <p className="text-[11px] text-slate-300">➔ {activeItem.wordA.exampleMeaning}</p>
                </div>
              </div>

              {/* Word B */}
              <div className="bg-slate-900/80 border border-slate-800 hover:border-emerald-600/70 rounded-2xl p-5 flex flex-col justify-between space-y-4 group">
                <div>
                  <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-bold uppercase">TỪ ĐỐI LẬP (B)</span>
                      <div className="text-3xl font-bold font-jp text-white group-hover:text-emerald-300 transition-colors mt-1">
                        {activeItem.wordB.word}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {activeItem.wordB.reading} · Hán Việt: <strong className="text-amber-300">{activeItem.wordB.hanViet}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => playJapaneseAudio(activeItem.wordB.word)}
                      className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-emerald-600 rounded-xl transition-colors cursor-pointer"
                      title="Nghe phát âm từ B"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Meaning & Character Breakdown */}
                  <div className="mt-3 text-xs space-y-2">
                    <div className="text-white font-semibold">
                      Ý nghĩa: {activeItem.wordB.meaning}
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 leading-relaxed">
                      <strong className="text-emerald-400">Chiết tự Hán tự: </strong>
                      {activeItem.wordB.characterDeconstruction}
                    </div>
                  </div>
                </div>

                {/* Example B */}
                <div className="pt-3 border-t border-slate-800/80 text-xs space-y-1 bg-slate-950/40 p-3 rounded-xl">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-jp text-white leading-relaxed font-medium">
                      {activeItem.wordB.exampleSentence}
                    </p>
                    <button
                      onClick={() => playJapaneseAudio(activeItem.wordB.exampleSentence)}
                      className="text-slate-400 hover:text-white shrink-0 p-1"
                      title="Nghe câu ví dụ"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 font-jp">{activeItem.wordB.exampleReading}</p>
                  <p className="text-[11px] text-slate-300">➔ {activeItem.wordB.exampleMeaning}</p>
                </div>
              </div>
            </div>

            {/* Detailed JLPT Traps Toggle */}
            <div className="border border-cyan-950 bg-cyan-950/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowDetailedExplanation(!showDetailedExplanation)}
                className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-cyan-300 hover:text-white transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Bẫy Logic Đề Thi JLPT & Cách Ra Đề Của JEES</span>
                </span>
                {showDetailedExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showDetailedExplanation && (
                <div className="p-4 pt-0 border-t border-cyan-900/30 text-xs text-slate-300 space-y-3 leading-relaxed">
                  <p>{activeItem.jlptContextAndTraps}</p>
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
              className="bg-[#0b101f] border border-slate-800 hover:border-cyan-600/70 rounded-xl p-4 transition-all hover:bg-slate-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                    Cặp đối nghĩa #{idx + 1}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">JLPT {item.jlptLevel}</span>
                </div>

                <div className="flex items-center justify-center gap-3 py-3 my-2 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-lg font-bold font-jp text-cyan-300">{item.wordA.word}</span>
                  <ArrowLeftRight className="w-4 h-4 text-slate-500" />
                  <span className="text-lg font-bold font-jp text-emerald-300">{item.wordB.word}</span>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <p><strong className="text-cyan-400">{item.wordA.word}:</strong> {item.wordA.meaning}</p>
                  <p><strong className="text-emerald-400">{item.wordB.word}:</strong> {item.wordB.meaning}</p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-500">{item.conceptualOpposition}</span>
                <button
                  onClick={() => {
                    setCurrentIndex(filteredItems.findIndex((it) => it.id === item.id));
                    setActiveTab('card');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Xem chi tiết <ArrowRight className="w-3 h-3" />
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
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>Trắc Nghiệm Ghép Cặp Hán Tự Đối Nghĩa</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Dạng bài chọn từ đối lập trực tiếp trong bài thi Từ Vựng JLPT N3-N1.
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
                    <span className="text-xs font-mono text-cyan-400 font-bold">Thử thách #{qIdx + 1}</span>
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
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-600/30 flex items-center gap-2 transition-all cursor-pointer text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tải thêm 5 cặp từ Hán tự đối nghĩa (+5 Nạp thêm)</span>
          </button>
        </div>
      )}
      {hasLoadedExtra && (
        <div className="text-center text-xs text-slate-400 py-2">
          ✓ Đã nạp đầy đủ toàn bộ 10 cặp từ Hán tự đối nghĩa kinh điển N3-N1.
        </div>
      )}
    </div>
  );
};
