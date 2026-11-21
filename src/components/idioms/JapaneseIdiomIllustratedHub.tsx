import React, { useState } from 'react';
import {
  ILLUSTRATED_JAPANESE_IDIOMS,
  IllustratedIdiomItem,
  IdiomCategoryType,
  getNextIdiomsBatch,
} from '../../data/japaneseIdiomsIllustratedData';
import { HandDrawnIdiomArt } from './HandDrawnIdiomArt';
import { speechService } from '../../services/speechService';
import {
  BookOpen,
  Volume2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Search,
  Scroll,
  Layers,
  Award,
  Compass,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  MessageSquare,
  Radio,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { JLPTLevel } from '../../types';

interface Props {
  onBackToDashboard: () => void;
  onOpenAiSenseiWithQuery?: (query: string) => void;
  currentLevel?: JLPTLevel;
}

export const JapaneseIdiomIllustratedHub: React.FC<Props> = ({
  onBackToDashboard,
  onOpenAiSenseiWithQuery,
  currentLevel = 'N3',
}) => {
  const [idiomsList, setIdiomsList] = useState<IllustratedIdiomItem[]>(ILLUSTRATED_JAPANESE_IDIOMS);
  const [selectedCategory, setSelectedCategory] = useState<IdiomCategoryType>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'showcase' | 'gallery' | 'quiz'>('showcase');
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddThreeIdioms = () => {
    const currentIds = idiomsList.map((i) => i.id);
    const newThree = getNextIdiomsBatch(currentIds, 3);
    const oldLength = idiomsList.length;
    setIdiomsList((prev) => [...prev, ...newThree]);

    // Play pleasant chime
    speechService.playSuccessSound();

    // Auto navigate to the newly loaded item in showcase view
    setCurrentIndex(oldLength);
    if (viewMode !== 'showcase') {
      setViewMode('showcase');
    }

    const names = newThree.map((i) => i.idiom).join('、');
    setToastMessage(`Đã nạp thêm +3 thành ngữ tranh vẽ mới: ${names}! Tổng hiện có: ${oldLength + 3} câu.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  // Quiz state
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number; streak: number }>({
    correct: 0,
    total: 0,
    streak: 0,
  });
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  // Filter idioms
  const filteredIdioms = idiomsList.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.type === selectedCategory;
    const matchTheme = selectedTheme === 'all' || item.theme === selectedTheme;
    const matchLevel = selectedLevel === 'all' || item.jlptLevel === selectedLevel;

    if (!matchCat || !matchTheme || !matchLevel) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.idiom.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.romaji.toLowerCase().includes(q) ||
      item.hanViet.toLowerCase().includes(q) ||
      item.vietnameseEquivalent.toLowerCase().includes(q) ||
      item.literalMeaning.toLowerCase().includes(q) ||
      item.figurativeMeaning.toLowerCase().includes(q) ||
      item.originStory.title.toLowerCase().includes(q)
    );
  });

  const activeItem = filteredIdioms[currentIndex] || idiomsList[0];

  const handleNext = () => {
    if (currentIndex < filteredIdioms.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    speechService.playSuccessSound();
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredIdioms.length - 1);
    }
    speechService.playSuccessSound();
  };

  const handleSpeak = (text: string) => {
    speechService.speak(text, speechRate);
  };

  // Generate Quiz options for the active item
  const otherIdioms = idiomsList.filter((i) => i.id !== activeItem.id);
  const shuffledOthers = [...otherIdioms].sort(() => 0.5 - Math.random()).slice(0, 3);
  const quizOptions = [
    { text: activeItem.vietnameseEquivalent, isCorrect: true },
    ...shuffledOthers.map((o) => ({ text: o.vietnameseEquivalent, isCorrect: false })),
  ].sort(() => 0.5 - Math.random());

  const handleSelectQuiz = (idx: number, isCorrect: boolean) => {
    if (quizAnswered) return;
    setSelectedQuizOption(idx);
    setQuizAnswered(true);
    if (isCorrect) {
      speechService.playCorrectSound();
      setQuizScore((prev) => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
        streak: prev.streak + 1,
      }));
    } else {
      speechService.playIncorrectSound();
      setQuizScore((prev) => ({
        ...prev,
        total: prev.total + 1,
        streak: 0,
      }));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-amber-950/40 to-slate-950 border border-amber-600/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </button>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 font-jp">
              日本ことわざ・四字熟語・故事成語
            </span>
            <span className="text-xs text-amber-200/70 font-mono">
              Kho tàng {idiomsList.length} thành ngữ minh họa
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span className="p-2 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-lg">
              <Scroll className="w-6 h-6" />
            </span>
            <span>Đại Bách Khoa Thành Ngữ Nhật Bản · Điển Tích & Tranh Vẽ Tay</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Học sâu bản chất từng câu thành ngữ không phân biệt số lượng chữ: Giải thích cặn kẽ <strong>nghĩa đen</strong>, <strong>nghĩa bóng</strong>, <strong>chuyện gốc ngàn năm</strong>, <strong>cách dùng thực tế</strong> cùng <strong>tranh vẽ tay dân gian sinh động</strong> và <strong>thành ngữ Việt Nam đối chiếu tương đương</strong>.
          </p>
        </div>

        {/* +3 Button & View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-center relative z-10">
          <button
            onClick={handleAddThreeIdioms}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs shadow-xl shadow-emerald-600/30 border border-emerald-400/40 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.03] active:scale-[0.97]"
            title="Nạp thêm 3 thành ngữ mới kèm tranh vẽ và điển tích"
          >
            <Plus className="w-4 h-4 text-emerald-200 stroke-[3]" />
            <span>+3 Nạp Thêm</span>
          </button>

          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('showcase')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'showcase'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" />
              <span>Thưởng thức tranh</span>
            </button>
            <button
              onClick={() => setViewMode('gallery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'gallery'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Thư viện ({filteredIdioms.length})</span>
            </button>
            <button
              onClick={() => setViewMode('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'quiz'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Đố vui điển tích</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast alert when +3 is clicked */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xl animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs text-emerald-300 hover:text-white underline cursor-pointer shrink-0"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Tìm theo chữ Hán, Hiragana, Romaji, Hán Việt hoặc Thành ngữ Việt (vd: ếch, khỉ, mèo, daruma, đếm cua trong lỗ...)"
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Speech Rate Controls */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl shrink-0">
            <span className="text-[11px] text-slate-400 font-semibold uppercase pr-1">Tốc độ đọc:</span>
            {([0.8, 1.0, 1.2] as const).map((r) => (
              <button
                key={r}
                onClick={() => setSpeechRate(r)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  speechRate === r
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {r}x
              </button>
            ))}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none pt-1">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] text-slate-400 font-semibold uppercase mr-1">Thể loại:</span>
            {[
              { id: 'all', label: 'Tất cả độ dài' },
              { id: 'kotowaza', label: 'Tục ngữ (ことわざ)' },
              { id: 'yojijukugo', label: '4 Chữ (四字熟語)' },
              { id: 'koji_seigo', label: 'Điển tích dài (故事成語)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as any);
                  setCurrentIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] text-slate-400 font-semibold uppercase mr-1">JLPT:</span>
            {['all', 'N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                  setCurrentIndex(0);
                }}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-mono ${
                  selectedLevel === lvl
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {lvl === 'all' ? 'Tất cả' : lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: SHOWCASE (SPLIT ARTWORK + STORY & USAGE) */}
      {viewMode === 'showcase' && activeItem && (
        <div className="space-y-6">
          {/* Stepper Navigator */}
          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Thành ngữ trước</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-300 font-mono font-bold bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-lg">
                Thành ngữ {currentIndex + 1} / {filteredIdioms.length}
              </span>
              <button
                onClick={handleAddThreeIdioms}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all cursor-pointer"
                title="Nạp thêm 3 thành ngữ mới ngay tại đây"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>+3 nạp thêm</span>
              </button>
            </div>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white transition-colors cursor-pointer shadow-md"
            >
              <span>Thành ngữ tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Main 2-Column Split: Hand-Drawn Art (Left) & Comprehensive Story/Usage (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: ARTWORK & KEY IDENTIFIERS (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Hand-Drawn Art Card */}
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-amber-600/40 shadow-2xl relative group">
                {/* SVG Artwork */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <HandDrawnIdiomArt scene={activeItem.illustration.svgScene} className="w-full h-full object-cover" />

                  {/* Badges on artwork */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/40 text-[11px] font-bold">
                      {activeItem.illustration.badgeText}
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md text-slate-200 border border-slate-700 text-[11px] font-mono font-bold">
                      {activeItem.typeName}
                    </span>
                  </div>

                  {/* Audio Listen Overlay Button */}
                  <button
                    onClick={() => handleSpeak(activeItem.idiom)}
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-amber-600/90 hover:bg-amber-500 text-white shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
                    title={`Nghe phát âm (${speechRate}x)`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Caption below illustration */}
                <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-amber-200/80 italic font-serif flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {activeItem.illustration.caption}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    JLPT {activeItem.jlptLevel}
                  </span>
                </div>
              </div>

              {/* Japanese Script Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-900/40 space-y-3 shadow-xl">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                      Chữ Hán & Cách Đọc Chuẩn:
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-jp tracking-wide">
                      {activeItem.idiom}
                    </h2>
                    <p className="text-sm text-indigo-200 font-jp font-semibold">
                      {activeItem.reading}
                    </p>
                    <p className="text-xs text-amber-300 font-mono italic">
                      🔤 {activeItem.romaji}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSpeak(`${activeItem.idiom}. ${activeItem.reading}`)}
                    className="p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-300 hover:text-white transition-all cursor-pointer shrink-0"
                    title="Nghe cách đọc chuẩn"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Âm Hán Việt: <strong className="text-white font-serif">{activeItem.hanViet}</strong>
                  </span>
                  <span className="text-slate-400">
                    Độ dài: <strong className="text-amber-300">{activeItem.charCount} chữ</strong>
                  </span>
                </div>

                {/* Vietnamese Equivalent Golden Banner */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/60 via-amber-900/30 to-slate-950 border border-amber-500/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    🇻🇳 Thành ngữ tiếng Việt tương đương:
                  </span>
                  <div className="text-base font-extrabold text-white">
                    {activeItem.vietnameseEquivalent}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DEEP MEANING, ORIGIN STORY & PRACTICAL USAGE (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* 1. Deep Meanings (Literal vs Figurative) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3.5 shadow-xl">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  1. Giải Nghĩa Cặn Kẽ & Dễ Hiểu
                </h3>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <strong className="text-amber-300 mr-1.5">Nghĩa đen (Mô tả thực tế):</strong>
                    {activeItem.literalMeaning}
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs sm:text-sm text-indigo-100 leading-relaxed">
                    <strong className="text-indigo-300 mr-1.5">Nghĩa bóng (Hàm ý nhân sinh & Đời sống):</strong>
                    {activeItem.figurativeMeaning}
                  </div>
                </div>
              </div>

              {/* 2. Origin Story (Chuyện Gốc Điển Tích) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-amber-900/40 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-amber-400" />
                    2. Chuyện Gốc & Điển Tích Lịch Sử
                  </h3>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-amber-950 border border-amber-800/60 text-amber-300 font-serif">
                    {activeItem.originStory.sourceEra}
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {activeItem.originStory.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans text-justify">
                    {activeItem.originStory.narrative}
                  </p>

                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 flex items-start gap-2 italic">
                    <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-amber-300 not-italic">Bài học nhân sinh: </strong>
                      {activeItem.originStory.moralTakeaway}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Practical Usage & Real Dialogue */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-emerald-900/40 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    3. Ngữ Cảnh Sử Dụng & Hội Thoại Thực Tế
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-medium">
                    Sắc thái: {activeItem.usageGuide.tone}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400 mr-1.5">Cách dùng chuẩn xác:</strong>
                  {activeItem.usageGuide.context} {activeItem.usageGuide.culturalNote}
                </div>

                {/* Practical Dialogue Card */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    Mẫu đối thoại giao tiếp đời sống:
                  </span>

                  <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-emerald-950">
                    {/* Speaker A */}
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">
                          {activeItem.usageGuide.dialogue.speakerA}:
                        </span>
                        <button
                          onClick={() => handleSpeak(activeItem.usageGuide.dialogue.speakerAJp)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white font-jp">
                        {activeItem.usageGuide.dialogue.speakerAJp}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono italic">
                        {activeItem.usageGuide.dialogue.speakerARomaji}
                      </div>
                      <div className="text-xs text-slate-300">
                        🇻🇳 {activeItem.usageGuide.dialogue.speakerAVn}
                      </div>
                    </div>

                    <div className="border-t border-slate-800/80 my-2" />

                    {/* Speaker B */}
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400">
                          {activeItem.usageGuide.dialogue.speakerB}:
                        </span>
                        <button
                          onClick={() => handleSpeak(activeItem.usageGuide.dialogue.speakerBJp)}
                          className="p-1 text-emerald-400 hover:text-white"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-200 font-jp">
                        {activeItem.usageGuide.dialogue.speakerBJp}
                      </div>
                      <div className="text-[11px] text-emerald-400/80 font-mono italic">
                        {activeItem.usageGuide.dialogue.speakerBRomaji}
                      </div>
                      <div className="text-xs text-slate-300">
                        🇻🇳 {activeItem.usageGuide.dialogue.speakerBVn}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: +3 Nạp thêm and Ask AI Sensei */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handleAddThreeIdioms}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer border border-emerald-400/40"
                    title="Nạp thêm 3 thành ngữ mới kèm tranh vẽ và điển tích"
                  >
                    <Plus className="w-4 h-4 text-emerald-200 stroke-[3]" />
                    <span>+3 Nạp Thêm Thành Ngữ Mới</span>
                  </button>

                  <button
                    onClick={() =>
                      onOpenAiSenseiWithQuery?.(
                        `Sensei hãy giải thích chi tiết nguồn gốc lịch sử và cách dùng trong thi cử JLPT của thành ngữ 「${activeItem.idiom}」 (${activeItem.vietnameseEquivalent})`
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Hỏi GS. Yamato về thành ngữ này</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: GALLERY GRID OF ALL IDIOMS */}
      {viewMode === 'gallery' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredIdioms.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setViewMode('showcase');
                speechService.playSuccessSound();
              }}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg space-y-3"
            >
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                <HandDrawnIdiomArt scene={item.illustration.svgScene} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-amber-300 backdrop-blur-sm">
                  {item.typeName}
                </span>
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 text-slate-300">
                  {item.jlptLevel}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-jp group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.idiom}
                </h3>
                <p className="text-xs text-slate-400 font-jp line-clamp-1">
                  {item.reading}
                </p>
                <div className="text-xs font-semibold text-amber-400 line-clamp-1 pt-1 border-t border-slate-800/80">
                  🇻🇳 {item.vietnameseEquivalent}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {item.figurativeMeaning}
              </div>
            </div>
          ))}

          {/* +3 Load More Card in Gallery */}
          <div
            onClick={handleAddThreeIdioms}
            className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/30 via-slate-900/90 to-slate-950 border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer group flex flex-col items-center justify-center text-center space-y-3 min-h-[260px] shadow-lg hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Plus className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <div className="text-base font-bold text-white group-hover:text-emerald-300">
                +3 Nạp Thêm Thành Ngữ
              </div>
              <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
                Mở khóa 3 thành ngữ mới kèm tranh vẽ tay, chuyện gốc ngụ ngôn và hội thoại thực tế
              </p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              Bấm để nạp thêm ngay
            </span>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: INTERACTIVE QUIZ ARENA */}
      {viewMode === 'quiz' && activeItem && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-900 border border-amber-600/40 shadow-2xl space-y-5 animate-fadeIn">
          {/* Quiz Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Đấu Trường Đố Vui Điển Tích
              </span>
              <h3 className="text-lg font-bold text-white">
                Thành ngữ này tương đương câu nào trong tiếng Việt?
              </h3>
            </div>
            <div className="text-center px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono">
              <div className="text-base font-extrabold text-amber-400">
                {quizScore.correct} / {quizScore.total}
              </div>
              <div className="text-[10px] text-slate-400">Chuỗi: {quizScore.streak} 🔥</div>
            </div>
          </div>

          {/* Question Card with Hand-Drawn Art */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-28 h-24 rounded-lg overflow-hidden shrink-0 border border-slate-800">
              <HandDrawnIdiomArt scene={activeItem.illustration.svgScene} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-mono text-indigo-400">{activeItem.reading}</span>
              <h2 className="text-2xl font-extrabold text-white font-jp">{activeItem.idiom}</h2>
              <p className="text-xs text-slate-400">Hán Việt: {activeItem.hanViet}</p>
            </div>
          </div>

          {/* 4 Choices */}
          <div className="space-y-2.5">
            {quizOptions.map((opt, idx) => {
              const isSelected = selectedQuizOption === idx;
              let btnStyle = 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800';

              if (quizAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-950/80 text-emerald-200 border-emerald-500 font-bold';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-950/80 text-rose-200 border-rose-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectQuiz(idx, opt.isCorrect)}
                  disabled={quizAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt.text}</span>
                  {quizAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation reveal & Next Question button */}
          {quizAnswered && (
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/50 space-y-3 animate-fadeIn">
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-indigo-300">Ý nghĩa cốt lõi: </strong>
                {activeItem.figurativeMeaning}
              </div>
              <div className="text-xs text-amber-300/90 italic">
                <strong>Chuyện gốc: </strong> {activeItem.originStory.title} ({activeItem.originStory.sourceEra}).
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    handleNext();
                    setQuizAnswered(false);
                    setSelectedQuizOption(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Câu hỏi tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
