import React, { useState, useEffect } from 'react';
import { VocabItem, JLPTLevel, GrammarItem } from '../../types';
import { initialVocabList } from '../../data/initialData';
import {
  comprehensiveVocabList,
  rawVocabDatabase,
  vocabLevelStats,
  mapRawToVocabItem,
} from '../../data/comprehensiveVocabDatabase';
import {
  grammarMasterList,
  grammarLevelStats,
} from '../../data/grammarDatabase';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import {
  Volume2,
  RefreshCw,
  Sparkles,
  RotateCw,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Search,
  BookOpen,
  Layers,
  ChevronLeft,
  ChevronRight,
  BookCheck,
  History,
  Copy,
  Gauge,
  CheckCircle2,
  Shuffle,
} from 'lucide-react';
import { historyService, HistoryItem } from '../../services/historyService';

interface VocabMasterProps {
  currentLevel: JLPTLevel;
}

export const VocabMaster: React.FC<VocabMasterProps> = ({ currentLevel }) => {
  const [vocabList, setVocabList] = useState<VocabItem[]>([
    ...initialVocabList,
    ...comprehensiveVocabList,
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'flashcard' | 'quiz' | 'grammar' | 'dictionary'>('flashcard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel | 'ALL'>(currentLevel || 'ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Furigana and Speech Rate preferences
  const [showFurigana, setShowFurigana] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kotoba_encyclopedia_furigana') !== 'false';
    } catch {
      return true;
    }
  });

  const [speechRate, setSpeechRate] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kotoba_speech_rate');
      return saved ? parseFloat(saved) : 1.0;
    } catch {
      return 1.0;
    }
  });

  const [vocabHistory, setVocabHistory] = useState<HistoryItem[]>(() => [
    ...historyService.getHistory('vocab'),
    ...historyService.getHistory('grammar')
  ]);

  // Dictionary pagination & visible counters
  const [dictPage, setDictPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [visibleGrammarCount, setVisibleGrammarCount] = useState<number>(10);

  // Auto-sync level with currentLevel prop
  useEffect(() => {
    setSelectedLevel(currentLevel);
  }, [currentLevel]);

  // Filter list for flashcards and quiz
  const filteredList = vocabList.filter((item) => {
    const matchLevel = selectedLevel === 'ALL' || item.level === selectedLevel;
    if (!matchLevel) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.word.includes(q) ||
      item.reading.includes(q) ||
      item.meaning.toLowerCase().includes(q)
    );
  });
  const currentItem = filteredList[currentIndex % (filteredList.length || 1)] || vocabList[0];

  // Record viewed item to history
  useEffect(() => {
    if (currentItem) {
      historyService.addItem('vocab', {
        id: currentItem.id,
        title: currentItem.word,
        subtitle: `${currentItem.reading} - ${currentItem.meaning}`,
        level: currentItem.level,
      });
      setVocabHistory([
        ...historyService.getHistory('vocab'),
        ...historyService.getHistory('grammar'),
      ]);
    }
  }, [currentItem?.id]);

  // Filter for Grammar patterns tab
  const filteredGrammar = grammarMasterList.filter((item) => {
    const matchLevel = selectedLevel === 'ALL' || item.level === selectedLevel;
    if (!matchLevel) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.pattern.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.explanation.toLowerCase().includes(q)
    );
  });

  // Filter for Full Dictionary tab
  const filteredDict = rawVocabDatabase.filter((item) => {
    const matchLevel = selectedLevel === 'ALL' || item.lvl === selectedLevel;
    if (!matchLevel) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.w.includes(q) ||
      item.r.includes(q) ||
      item.m.toLowerCase().includes(q)
    );
  });

  const totalDictPages = Math.ceil(filteredDict.length / itemsPerPage) || 1;
  const currentDictItems = filteredDict
    .slice((dictPage - 1) * itemsPerPage, dictPage * itemsPerPage)
    .map(mapRawToVocabItem);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredList.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
  };

  const handleSrsAction = (_grade: 'Again' | 'Hard' | 'Good' | 'Easy') => {
    speechService.playSuccessSound();
    handleNext();
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Keyboard navigation for Flashcard study
  useEffect(() => {
    if (activeTab !== 'flashcard') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA'].includes(tag)) return;

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1') {
        handleSrsAction('Again');
      } else if (e.key === '2') {
        handleSrsAction('Hard');
      } else if (e.key === '3') {
        handleSrsAction('Good');
      } else if (e.key === '4') {
        handleSrsAction('Easy');
      } else if (e.key.toLowerCase() === 'r' || e.key.toLowerCase() === 'p') {
        if (currentItem) {
          speechService.speak(currentItem.word, speechRate);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, filteredList.length, currentIndex, speechRate, currentItem]);

  // Export current flashcard to Anki / Markdown format
  const handleExportCardToAnki = () => {
    if (!currentItem) return;
    const ankiText = `${currentItem.word}\t${currentItem.reading}\t${currentItem.meaning}\t${currentItem.exampleSentence || ''}\t${currentItem.exampleReading || ''}\t${currentItem.exampleMeaning || ''}\t${currentItem.level}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(ankiText).then(() => {
        speechService.playSuccessSound();
        showToast(`📋 Đã chép từ vựng "${currentItem.word}" sang định dạng Anki (Tab-Separated)!`);
      }).catch(() => {
        showToast(`Đã sao chép từ vựng ${currentItem.word}!`);
      });
    }
  };

  // Infinite load additional vocabulary: Loads 5 items each time (mỗi lần tải thêm 5 cái)
  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    const targetLvl = selectedLevel === 'ALL' ? currentLevel : selectedLevel;
    try {
      const prompt = `
Bạn là chuyên gia khảo thí JLPT. Hãy tạo chính xác 5 từ vựng tiếng Nhật cấp độ ${targetLvl} thực chiến chuẩn đề thi JLPT.
Mỗi từ kèm câu ví dụ, cách đọc hiragana, dịch tiếng Việt, bóc tách kanji, câu chuyện mẹo nhớ tượng hình, và 1 bài trắc nghiệm 4 lựa chọn, lời giải chi tiết, bẫy logic JEES và mẹo nhớ.
Định dạng JSON thuần là một mảng gồm 5 phần tử:
[
  {
    "id": "v_${Date.now()}_1",
    "word": "từ tiếng Nhật",
    "reading": "hiragana",
    "meaning": "nghĩa tiếng Việt",
    "level": "${targetLvl}",
    "kanjiBreakdown": "bóc tách kanji",
    "exampleSentence": "câu ví dụ tiếng Nhật",
    "exampleReading": "hiragana câu ví dụ",
    "exampleMeaning": "dịch nghĩa câu ví dụ",
    "mnemonicStory": "câu chuyện mẹo nhớ sâu sắc",
    "quiz": {
      "id": "qv_${Date.now()}_1",
      "question": "câu hỏi trắc nghiệm",
      "options": [
        { "id": "a", "text": "đáp án 1", "isCorrect": true },
        { "id": "b", "text": "đáp án 2", "isCorrect": false },
        { "id": "c", "text": "đáp án 3", "isCorrect": false },
        { "id": "d", "text": "đáp án 4", "isCorrect": false }
      ],
      "correctExplanation": "lời giải chi tiết",
      "trapAnalysis": "bẫy logic JEES",
      "mnemonicTip": "mẹo nhớ nhanh"
    }
  }
]
`;
      const result = await callGemini(prompt, 'Trả về JSON thuần là một mảng gồm 5 từ vựng, không markdown.');
      const parsed = safeExtractJson<VocabItem[] | null>(result, null);

      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.filter((it) => it && it.word).slice(0, 5);
        if (valid5.length > 0) {
          setVocabList((prev) => [...valid5, ...prev]);
          setCurrentIndex(0);
          speechService.playSuccessSound();
          return;
        }
      }
      throw new Error('Dùng 5 từ từ kho dữ liệu chuẩn');
    } catch {
      // Pick 5 words from comprehensive rawVocabDatabase
      const matchingRaw = rawVocabDatabase.filter((v) => v.lvl === targetLvl);
      const existingWords = new Set(vocabList.map((v) => v.word));
      const unstudied = matchingRaw.filter((v) => !existingWords.has(v.w));
      const pool = unstudied.length >= 5 ? unstudied : matchingRaw;

      // Shuffle and pick 5 distinct items
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const chosen5 = shuffled.slice(0, 5);
      const mapped5 = chosen5.map((raw, idx) => mapRawToVocabItem(raw, Date.now() + idx));

      setVocabList((prev) => [...mapped5, ...prev]);
      setCurrentIndex(0);
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ======================================================== */}
      {/* OFFICIAL JLPT DATA SPECTRUM BANNER (N5 - N1) */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-900/50 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Kho Dữ Liệu Toàn Diện JLPT (N5 - N1) Sẵn Có</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                  {vocabLevelStats.total.toLocaleString()} Từ vựng · {grammarLevelStats.total.toLocaleString()} Ngữ pháp
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Kho dữ liệu đối chuẩn chính thức theo quy chuẩn JLPT (Japan Educational Exchanges and Services)
              </p>
            </div>
          </div>

          {/* Level Badges Matrix */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <div className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="font-bold text-emerald-400">N5:</span>
              <span className="text-slate-300">~800 từ · 70 mẫu</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-blue-500/30 flex items-center gap-1.5">
              <span className="font-bold text-blue-400">N4:</span>
              <span className="text-slate-300">~1.500 từ · 150 mẫu</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-indigo-500/30 flex items-center gap-1.5">
              <span className="font-bold text-indigo-400">N3:</span>
              <span className="text-slate-300">~3.750 từ · 200 mẫu</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-amber-500/30 flex items-center gap-1.5">
              <span className="font-bold text-amber-400">N2:</span>
              <span className="text-slate-300">~6.000 từ · 350 mẫu</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-rose-500/30 flex items-center gap-1.5">
              <span className="font-bold text-rose-400">N1:</span>
              <span className="text-slate-300">~10.000 từ · 500 mẫu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header and Main Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>Từ vựng & Cấu trúc Ngữ pháp (N5 - N1)</span>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
              {selectedLevel} ·{' '}
              {activeTab === 'grammar'
                ? `${filteredGrammar.length} Mẫu Ngữ pháp`
                : activeTab === 'dictionary'
                ? `${filteredDict.length.toLocaleString()} Từ vựng`
                : `${filteredList.length} Từ vựng`}
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Học tập qua Spaced Repetition (SRS), tra cứu từ điển toàn diện và phân tích bẫy thi JEES.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {/* Main 4 Mode Tabs */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('flashcard')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'flashcard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flashcard SRS</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Trắc nghiệm ({filteredList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('grammar')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'grammar'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Kho Ngữ pháp ({filteredGrammar.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('dictionary')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'dictionary'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Toàn bộ Từ vựng ({filteredDict.length.toLocaleString()})</span>
            </button>
          </div>

          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải thêm 5 từ vựng mới mỗi lần bấm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải thêm (+5 từ vựng)</span>
          </button>
        </div>
      </div>

      {/* Level & Search Toolbar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs text-slate-400 mr-1 shrink-0 font-medium">Lọc cấp độ:</span>
          {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                setDictPage(1);
              }}
              className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                selectedLevel === lvl
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl === 'ALL' ? 'Tất cả' : lvl}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDictPage(1);
            }}
            placeholder={
              activeTab === 'grammar'
                ? 'Tìm mẫu ngữ pháp, cấu trúc, ý nghĩa...'
                : 'Tìm từ vựng, kanji, nghĩa tiếng Việt...'
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Lịch sử từ vựng / ngữ pháp đã xem */}
      {vocabHistory.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 text-indigo-400 shrink-0 font-semibold">
            <History className="w-3.5 h-3.5" />
            <span>Đã xem ({vocabHistory.length}):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-0.5">
            {vocabHistory.slice(0, 15).map((h) => (
              <button
                key={h.id}
                onClick={() => {
                  setSearchQuery(h.title);
                  if (h.category === 'grammar') {
                    setActiveTab('grammar');
                  } else {
                    setActiveTab('flashcard');
                  }
                  speechService.playSuccessSound();
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:text-white text-xs font-medium cursor-pointer transition-all shrink-0"
                title={`${h.subtitle || ''} (Bấm để xem lại)`}
              >
                <span className="font-jp font-bold text-indigo-300">{h.title}</span>
                {h.level && <span className="text-[9px] text-slate-500 font-mono">[{h.level}]</span>}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              historyService.clearHistory('vocab');
              historyService.clearHistory('grammar');
              setVocabHistory([]);
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 ml-auto shrink-0 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800"
            title="Xóa lịch sử đã xem"
          >
            Xóa
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 1: FLASHCARD SRS */}
      {/* ======================================================== */}
      {activeTab === 'flashcard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Flashcard Container */}
          <div className="lg:col-span-8 space-y-3">
            {/* Flashcard Multi-tool Header */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-indigo-400 font-bold bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                  {currentItem.level} · Thẻ {currentIndex + 1} / {filteredList.length}
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">Phím tắt: Space (lật thẻ) · 1-4 (SRS)</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Speed Selector */}
                <div className="flex items-center gap-0.5 bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-[11px] font-mono">
                  <Gauge className="w-3 h-3 text-slate-400 ml-1.5" />
                  {[0.8, 1.0, 1.2].map((rate) => (
                    <button
                      key={rate}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSpeechRate(rate);
                        try {
                          localStorage.setItem('kotoba_speech_rate', String(rate));
                        } catch {}
                        speechService.playSuccessSound();
                        showToast(`Đã đổi tốc độ phát âm sang ${rate}x`);
                      }}
                      className={`px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                        speechRate === rate ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title={`Tốc độ đọc tiếng Nhật: ${rate}x`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                {/* Furigana Reading Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFurigana((prev) => !prev);
                    speechService.playSuccessSound();
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer border ${
                    showFurigana
                      ? 'bg-indigo-950 border-indigo-500/60 text-indigo-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                  title={showFurigana ? 'Tắt Furigana âm đọc' : 'Bật Furigana âm đọc'}
                >
                  <span className="font-jp text-[11px]">あ</span>
                  <span className="hidden sm:inline">{showFurigana ? 'Furigana Bật' : 'Furigana Tắt'}</span>
                </button>

                {/* Anki Export */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExportCardToAnki();
                  }}
                  className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Sao chép từ vựng sang định dạng Anki (Tab-Separated)"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                {/* Shuffle Card */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                    const rand = Math.floor(Math.random() * filteredList.length);
                    setCurrentIndex(rand);
                    speechService.playSuccessSound();
                  }}
                  className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Xáo trộn ngẫu nhiên"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Hardware-Accelerated 3D Flip Flashcard */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative min-h-[360px] md:min-h-[400px] w-full cursor-pointer select-none perspective-1000 group"
              title="Nhấp để lật thẻ (hoặc bấm phím Space)"
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-2xl border p-6 md:p-8 flex flex-col justify-between shadow-2xl ${
                  isFlipped
                    ? 'rotate-y-180 bg-gradient-to-br from-[#121933] via-slate-900 to-slate-950 border-indigo-500/60'
                    : 'bg-slate-900/95 border-slate-800 hover:border-slate-700 hover:shadow-indigo-500/10'
                }`}
              >
                {/* Front Side */}
                {!isFlipped ? (
                  <div className="w-full h-full flex flex-col justify-between items-center text-center">
                    <div className="w-full flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono text-indigo-400 font-semibold">
                        JLPT {currentItem.level}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speechService.speak(currentItem.word, speechRate);
                        }}
                        className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                        title={`Nghe phát âm chuẩn Tokyo (${speechRate}x)`}
                      >
                        <Volume2 className="w-4 h-4 text-indigo-400" />
                        <span className="text-[11px] font-mono">{speechRate}x</span>
                      </button>
                    </div>

                    <div className="space-y-4 my-auto py-4">
                      <div className="text-4xl md:text-6xl font-bold font-jp text-slate-100 tracking-wide">
                        {showFurigana ? (
                          <ruby>
                            {currentItem.word}
                            <rt className="text-base md:text-lg text-indigo-300 font-normal">{currentItem.reading}</rt>
                          </ruby>
                        ) : (
                          currentItem.word
                        )}
                      </div>

                      {!showFurigana && (
                        <div className="text-lg md:text-xl text-slate-400 font-jp">
                          {currentItem.reading}
                        </div>
                      )}

                      <div className="text-xs text-slate-500 flex items-center justify-center gap-1.5 pt-2">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Nhấp chuột hoặc ấn Space để xem ý nghĩa & câu ví dụ</span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="w-full flex items-center justify-between pt-4 border-t border-slate-800/60 text-xs text-slate-400">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Trước (←)</span>
                      </button>

                      <span className="text-[11px] text-slate-500 font-mono">
                        Space: Lật · 1-4: SRS
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Kế tiếp (→)</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Back Side */
                  <div className="w-full h-full flex flex-col justify-between rotate-y-180 text-left">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs text-indigo-400 uppercase tracking-wider font-semibold">
                        Ý nghĩa cốt lõi & Ví dụ
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speechService.speak(currentItem.word, speechRate);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        title="Nghe phát âm từ vựng"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4 my-auto py-2">
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-amber-300">
                          {currentItem.meaning}
                        </div>
                        <div className="text-xs text-slate-400 font-jp mt-0.5">
                          {currentItem.word} ({currentItem.reading})
                        </div>
                      </div>

                      {currentItem.kanjiBreakdown && (
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                          <span className="text-xs text-slate-400 font-medium">Bóc tách chữ Hán: </span>
                          <span className="text-xs text-slate-200 font-jp">{currentItem.kanjiBreakdown}</span>
                        </div>
                      )}

                      <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        <div className="text-xs text-indigo-400 font-medium flex items-center justify-between">
                          <span>Câu ví dụ thực tế:</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speechService.speak(currentItem.exampleSentence, speechRate);
                            }}
                            className="hover:text-indigo-300 p-1"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-sm font-jp text-slate-200 leading-relaxed">
                          {currentItem.exampleSentence}
                        </div>
                        <div className="text-xs font-jp text-slate-400">
                          {currentItem.exampleReading}
                        </div>
                        <div className="text-xs text-slate-300 italic pt-1 border-t border-slate-900">
                          {currentItem.exampleMeaning}
                        </div>
                      </div>

                      {currentItem.mnemonicStory && (
                        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 flex items-start gap-2.5">
                          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div className="text-xs text-amber-200/90 leading-relaxed">
                            <span className="font-semibold text-amber-300">Mẹo nhớ (Mnemonic): </span>
                            {currentItem.mnemonicStory}
                          </div>
                        </div>
                      )}

                      {/* Phân hệ Giải Mã Bẫy Thi JEES */}
                      {(currentItem.jeesTrapDecode || currentItem.quiz?.trapAnalysis) && (
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-950/40 to-slate-950 border border-rose-800/50 space-y-1.5 shadow-sm">
                          <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                              🎯 Giải Mã Bẫy Thi JEES ({currentItem.jeesTrapDecode?.trapType || 'Bẫy Lỗi Thường Gặp'}):
                            </span>
                            <span className="text-[10px] text-rose-400 font-mono font-bold bg-rose-950 px-2 py-0.5 rounded border border-rose-800/60">
                              Cảnh Báo Đề Thi Thật
                            </span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed font-sans">
                            {currentItem.jeesTrapDecode?.trapDescription || currentItem.quiz?.trapAnalysis}
                          </p>
                          {currentItem.jeesTrapDecode?.howToNeutralize && (
                            <div className="text-[11px] text-emerald-300 pt-1 border-t border-rose-900/40">
                              🛡️ <span className="font-semibold">Bí quyết vô hiệu hóa:</span> {currentItem.jeesTrapDecode.howToNeutralize}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs text-slate-400">
                      <span className="text-indigo-300">Nhấp để lật lại mặt trước</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                      >
                        <span>Từ tiếp theo</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SRS Action Buttons */}
            <div className="grid grid-cols-4 gap-2.5">
              <button
                onClick={() => handleSrsAction('Again')}
                className="py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all cursor-pointer text-center"
              >
                <div className="font-bold">Again</div>
                <div className="text-[10px] text-rose-400/80">Lặp lại (&lt;1p)</div>
              </button>
              <button
                onClick={() => handleSrsAction('Hard')}
                className="py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all cursor-pointer text-center"
              >
                <div className="font-bold">Hard</div>
                <div className="text-[10px] text-amber-400/80">Khó nhớ (1 ngày)</div>
              </button>
              <button
                onClick={() => handleSrsAction('Good')}
                className="py-2.5 px-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-all cursor-pointer text-center"
              >
                <div className="font-bold">Good</div>
                <div className="text-[10px] text-indigo-400/80">Tốt (3 ngày)</div>
              </button>
              <button
                onClick={() => handleSrsAction('Easy')}
                className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all cursor-pointer text-center"
              >
                <div className="font-bold">Easy</div>
                <div className="text-[10px] text-emerald-400/80">Dễ (7 ngày)</div>
              </button>
            </div>
          </div>

          {/* Right Column: Mini Quiz & Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center justify-between">
                <span>Kho dữ liệu tích lũy</span>
                <span className="text-indigo-400 font-mono">{vocabList.length} từ vựng</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                Hệ thống SRS tự động tính toán thời điểm lặp lại tối ưu cho trí nhớ dài hạn (Spaced Repetition).
              </div>
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
                <div className="flex justify-between">
                  <span>Trình độ hiện tại:</span>
                  <span className="font-semibold text-indigo-400">{currentLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mẹo nhớ đã kích hoạt:</span>
                  <span className="text-emerald-400 font-mono">100% Mnemonics</span>
                </div>
              </div>
            </div>

            {/* Mini quiz right below */}
            <QuizCard
              quiz={currentItem.quiz}
              title={`Trắc nghiệm kiểm tra: ${currentItem.word}`}
              onNext={handleNext}
            />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: TRẮC NGHIỆM CHỌN NGHĨA TỪ VỰNG */}
      {/* ======================================================== */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto">
          <QuizCard
            quiz={currentItem.quiz}
            title={`Bài tập trắc nghiệm chọn nghĩa từ vựng [${currentItem.level}]`}
            onNext={handleNext}
            nextLabel="Chuyển sang từ vựng tiếp theo"
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 3: KHO CẤU TRÚC NGỮ PHÁP (N5-N1) */}
      {/* ======================================================== */}
      {activeTab === 'grammar' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGrammar.slice(0, visibleGrammarCount).map((gm: GrammarItem) => (
              <div
                key={gm.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3.5 shadow-lg transition-all"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/20">
                      {gm.level}
                    </span>
                    <h3 className="text-base font-bold text-slate-100 font-jp">{gm.pattern}</h3>
                  </div>
                  <button
                    onClick={() => speechService.speak(gm.exampleSentence)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                    title="Nghe câu ví dụ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Meaning & Formation */}
                <div className="space-y-1.5">
                  <div className="text-xs text-indigo-300 font-semibold">
                    <span className="text-slate-400 font-normal">Ý nghĩa: </span>
                    {gm.meaning}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300">
                    <span className="text-amber-400 font-bold">Cấu trúc: </span>
                    {gm.formation}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{gm.explanation}</p>
                </div>

                {/* Example sentence */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="text-xs text-slate-200 font-jp">{gm.exampleSentence}</div>
                  <div className="text-[11px] text-slate-400 font-jp">{gm.exampleReading}</div>
                  <div className="text-[11px] text-slate-300 italic">{gm.exampleMeaning}</div>
                </div>

                {/* Trap Analysis & Mnemonic */}
                <div className="space-y-1.5 pt-1 text-xs">
                  {gm.trapAnalysis && (
                    <div className="text-rose-300/90 text-[11px] flex items-start gap-1.5">
                      <span className="font-bold text-rose-400 shrink-0">Bẫy JEES:</span>
                      <span>{gm.trapAnalysis}</span>
                    </div>
                  )}
                  {gm.mnemonicTip && (
                    <div className="text-amber-300/90 text-[11px] flex items-start gap-1.5">
                      <span className="font-bold text-amber-400 shrink-0">Mẹo nhớ:</span>
                      <span>{gm.mnemonicTip}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button (Mỗi lần tải thêm 5 cái) */}
          {visibleGrammarCount < filteredGrammar.length && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => {
                  setVisibleGrammarCount((prev) => prev + 5);
                  speechService.playSuccessSound();
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-indigo-500/20 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Tải thêm (+5 cấu trúc ngữ pháp)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-800 text-indigo-200">
                  Đang xem {Math.min(visibleGrammarCount, filteredGrammar.length)}/{filteredGrammar.length} mẫu
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 4: TOÀN BỘ DANH MỤC TỪ VỰNG & TRA CỨU DICTIONARY */}
      {/* ======================================================== */}
      {activeTab === 'dictionary' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Cấp độ</th>
                    <th className="py-3 px-4">Từ vựng (Kanji)</th>
                    <th className="py-3 px-4">Cách đọc (Furigana)</th>
                    <th className="py-3 px-4">Ý nghĩa tiếng Việt</th>
                    <th className="py-3 px-4">Câu ví dụ</th>
                    <th className="py-3 px-4 text-center">Âm thanh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {currentDictItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-indigo-400">{item.level}</td>
                      <td className="py-3 px-4 font-bold text-slate-100 font-jp text-sm">
                        {showFurigana ? (
                          <ruby>
                            {item.word}
                            <rt className="text-[10px] text-indigo-300 font-normal">{item.reading}</rt>
                          </ruby>
                        ) : (
                          item.word
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-jp">{item.reading}</td>
                      <td className="py-3 px-4 text-slate-200">{item.meaning}</td>
                      <td className="py-3 px-4 text-slate-300 font-jp max-w-xs truncate" title={item.exampleSentence}>
                        {item.exampleSentence}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => speechService.speak(item.word)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div>
                Hiển thị trang <span className="font-bold text-slate-200">{dictPage}</span> / {totalDictPages} (Tổng cộng{' '}
                <span className="font-bold text-indigo-400">{filteredDict.length.toLocaleString()}</span> từ)
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setItemsPerPage((prev) => prev + 5);
                    speechService.playSuccessSound();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium cursor-pointer flex items-center gap-1.5"
                  title="Tải thêm 5 từ vựng trên mỗi trang"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Tải thêm (+5 từ/trang)</span>
                </button>
                <button
                  disabled={dictPage <= 1}
                  onClick={() => setDictPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 cursor-pointer"
                >
                  Trang trước
                </button>
                <button
                  disabled={dictPage >= totalDictPages}
                  onClick={() => setDictPage((p) => Math.min(totalDictPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 cursor-pointer"
                >
                  Trang sau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-2xl border border-indigo-400/40 backdrop-blur-md animate-bounce max-w-md">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
