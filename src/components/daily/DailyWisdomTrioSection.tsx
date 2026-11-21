import React, { useState, useEffect, useMemo } from 'react';
import { JLPTLevel, DivisionId } from '../../types';
import {
  DailyRitualBundle,
  getDailyRitualForDate,
  formatDateKey
} from '../../data/dailyRitualData';
import { dailyRitualStorage } from '../../services/dailyRitualStorage';
import { speechService } from '../../services/speechService';
import { DailyArchiveModal } from './DailyArchiveModal';
import {
  Calendar,
  Volume2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Send,
  RotateCcw,
  Clock,
  Heart,
  History
} from 'lucide-react';

interface DailyWisdomTrioSectionProps {
  currentLevel: JLPTLevel;
  onSelectDivision: (divisionId: DivisionId, moduleId?: number) => void;
  onOpenAiSenseiWithQuery: (query?: string) => void;
}

export const DailyWisdomTrioSection: React.FC<DailyWisdomTrioSectionProps> = ({
  currentLevel,
  onSelectDivision,
  onOpenAiSenseiWithQuery
}) => {
  // Current active date (defaults to today's local date)
  const [activeDateStr, setActiveDateStr] = useState<string>(() => formatDateKey(new Date()));
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false);

  // Load deterministic bundle for the active date & level
  const bundle: DailyRitualBundle = useMemo(() => {
    return getDailyRitualForDate(activeDateStr, currentLevel);
  }, [activeDateStr, currentLevel]);

  // Storage states for this active date
  const [isCompleted, setIsCompleted] = useState<boolean>(() =>
    dailyRitualStorage.isDateCompleted(activeDateStr)
  );
  const [isKanjiBookmarked, setIsKanjiBookmarked] = useState<boolean>(() =>
    dailyRitualStorage.isBookmarked(activeDateStr, 'kanji')
  );
  const [isGrammarBookmarked, setIsGrammarBookmarked] = useState<boolean>(() =>
    dailyRitualStorage.isBookmarked(activeDateStr, 'grammar')
  );
  const [isPhilBookmarked, setIsPhilBookmarked] = useState<boolean>(() =>
    dailyRitualStorage.isBookmarked(activeDateStr, 'philosophy')
  );
  const [dayNote, setDayNote] = useState<string>(() =>
    dailyRitualStorage.getDayNote(activeDateStr)
  );
  const [noteSavedFeedback, setNoteSavedFeedback] = useState<boolean>(false);

  // Interactive Quiz state for Card B
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState<boolean>(false);

  // Sync state whenever active date changes
  useEffect(() => {
    setIsCompleted(dailyRitualStorage.isDateCompleted(activeDateStr));
    setIsKanjiBookmarked(dailyRitualStorage.isBookmarked(activeDateStr, 'kanji'));
    setIsGrammarBookmarked(dailyRitualStorage.isBookmarked(activeDateStr, 'grammar'));
    setIsPhilBookmarked(dailyRitualStorage.isBookmarked(activeDateStr, 'philosophy'));
    setDayNote(dailyRitualStorage.getDayNote(activeDateStr));
    setSelectedQuizOption(null);
    setIsQuizAnswered(false);
  }, [activeDateStr]);

  const todayStr = formatDateKey(new Date());
  const isViewingToday = activeDateStr === todayStr;

  // Date Navigation Helpers
  const handleShiftDate = (daysDelta: number) => {
    const cur = new Date(activeDateStr);
    cur.setDate(cur.getDate() + daysDelta);
    setActiveDateStr(formatDateKey(cur));
  };

  const handleGoToToday = () => {
    setActiveDateStr(todayStr);
  };

  const handleToggleCompleted = () => {
    const nowDone = dailyRitualStorage.toggleDateCompleted(activeDateStr);
    setIsCompleted(nowDone);
    if (nowDone) {
      speechService.playSuccessSound();
    }
  };

  const handleToggleBookmark = (type: 'kanji' | 'grammar' | 'philosophy') => {
    let title = '';
    let subtitle = '';
    if (type === 'kanji') {
      title = `${bundle.kanji.character} (${bundle.kanji.hanViet})`;
      subtitle = bundle.kanji.meaning;
    } else if (type === 'grammar') {
      title = bundle.grammar.pattern;
      subtitle = bundle.grammar.title;
    } else {
      title = bundle.philosophy.title;
      subtitle = bundle.philosophy.vietnameseName;
    }

    const state = dailyRitualStorage.toggleBookmark(activeDateStr, type, title, subtitle);
    if (type === 'kanji') setIsKanjiBookmarked(state);
    if (type === 'grammar') setIsGrammarBookmarked(state);
    if (type === 'philosophy') setIsPhilBookmarked(state);
  };

  const handleSaveNote = () => {
    dailyRitualStorage.saveDayNote(activeDateStr, dayNote);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  const handlePlayAudio = (text: string) => {
    speechService.speak(text, 1.0);
  };

  const handleQuizAnswer = (optIndex: number) => {
    if (isQuizAnswered) return;
    setSelectedQuizOption(optIndex);
    setIsQuizAnswered(true);
    if (optIndex === bundle.grammar.quickQuiz.correctIndex) {
      speechService.playSuccessSound();
    }
  };

  return (
    <section className="space-y-4">
      {/* 1. Header Bar: Date Title, Navigation Controls, History Archive Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0a0f1d] border border-slate-800/90 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                TRI THỨC MỖI NGÀY
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-400 font-jp">日々の知恵</span>
              {isViewingToday && (
                <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-950/70 border border-indigo-800/40 px-2 py-0.5 rounded">
                  Hôm nay
                </span>
              )}
            </div>
            <div className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>{bundle.dayOfWeekVi}, ngày {bundle.dateStr}</span>
              <span className="text-xs font-normal text-slate-400 font-mono">(JLPT {currentLevel})</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Day Shift Controls */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => handleShiftDate(-1)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Xem ngày hôm trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleGoToToday}
              disabled={isViewingToday}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                isViewingToday
                  ? 'text-slate-500 cursor-default'
                  : 'text-indigo-400 hover:bg-slate-800 hover:text-indigo-300'
              }`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => handleShiftDate(1)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Xem ngày tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* History Modal Button */}
          <button
            onClick={() => setIsArchiveModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <History className="w-3.5 h-3.5 text-indigo-400" />
            <span>Lịch sử đã qua</span>
          </button>

          {/* Mark Complete Checkbox */}
          <button
            onClick={handleToggleCompleted}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 shadow-sm'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-white'}`} />
            <span>{isCompleted ? 'Đã hoàn thành hôm nay' : 'Đánh dấu đã học'}</span>
          </button>
        </div>
      </div>

      {/* 2. The 3 Master Cards Grid: Hán Tự Hôm Nay + Ngữ Pháp Phản Xạ + Triết Lý Sống */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ========================================================================= */}
        {/* CARD 1: HÁN TỰ HÔM NAY (KANJI OF THE DAY) */}
        {/* ========================================================================= */}
        <div className="bg-[#090e1b] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-md group">
          <div className="space-y-4">
            {/* Top Tag & Actions */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-bold text-amber-400 uppercase tracking-wider">Hán Tự Hôm Nay</span>
                <span>·</span>
                <span className="font-mono text-slate-400">JLPT {bundle.kanji.level}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleToggleBookmark('kanji')}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isKanjiBookmarked
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={isKanjiBookmarked ? 'Bỏ lưu yêu thích' : 'Lưu vào mục yêu thích'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isKanjiBookmarked ? 'fill-amber-400' : ''}`} />
                </button>
                <button
                  onClick={() => handlePlayAudio(bundle.kanji.character)}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-indigo-600/30 text-indigo-400 hover:text-white transition-colors cursor-pointer"
                  title="Nghe phát âm Hán tự"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Kanji Character Large Box & Key Meta */}
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-5xl font-mincho text-white shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
                {bundle.kanji.character}
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-amber-300 tracking-tight">
                    {bundle.kanji.hanViet}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ({bundle.kanji.strokeCount} nét · Bộ {bundle.kanji.radical})
                  </span>
                </div>
                <div className="text-xs text-slate-200 font-medium line-clamp-2">
                  {bundle.kanji.meaning}
                </div>
                <div className="text-[11px] text-slate-400 font-mono space-y-0.5 pt-0.5">
                  <div className="truncate"><span className="text-slate-500">Kunyomi:</span> {bundle.kanji.kunyomi}</div>
                  <div className="truncate"><span className="text-slate-500">Onyomi:</span> {bundle.kanji.onyomi}</div>
                </div>
              </div>
            </div>

            {/* Mnemonic / Chiết Tự */}
            <div className="text-xs text-slate-300 bg-slate-900/70 p-3 rounded-xl border border-slate-800/90 leading-relaxed">
              <span className="text-amber-400 font-semibold">Mẹo nhớ chiết tự: </span>
              {bundle.kanji.mnemonic}
            </div>

            {/* Compound Words */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Từ vựng ghép tiêu biểu:
              </div>
              <div className="space-y-1.5">
                {bundle.kanji.examples.map((ex, i) => (
                  <div
                    key={i}
                    onClick={() => handlePlayAudio(ex.word)}
                    className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-slate-900/50 hover:bg-slate-800/70 border border-slate-800/60 transition-colors group/ex cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-jp font-bold text-white group-hover/ex:text-amber-300 transition-colors">
                        {ex.word}
                      </span>
                      <span className="text-slate-400 text-[11px]">({ex.reading})</span>
                    </div>
                    <span className="text-slate-400 text-[11px] truncate max-w-[130px]">{ex.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card Footer: Jump to Kanji Studio */}
          <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
            <button
              onClick={() => onSelectDivision('vocab_kanji', 2)}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Vào Kanji Studio luyện viết nét</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenAiSenseiWithQuery(`Thưa Giáo sư Yamato, xin giải thích cặn kẽ nguồn gốc lịch sử, ngữ cảnh sử dụng và các bẫy đề thi JLPT liên quan đến chữ Hán ${bundle.kanji.character} (${bundle.kanji.hanViet})`)}
              className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              Hỏi Sensei
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: NGỮ PHÁP PHẢN XẠ (DAILY REFLEX GRAMMAR) */}
        {/* ========================================================================= */}
        <div className="bg-[#090e1b] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-md group">
          <div className="space-y-4">
            {/* Top Tag & Actions */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-bold text-rose-400 uppercase tracking-wider">Ngữ Pháp Phản Xạ</span>
                <span>·</span>
                <span className="font-mono text-slate-400">JLPT {bundle.grammar.level}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleToggleBookmark('grammar')}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isGrammarBookmarked
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={isGrammarBookmarked ? 'Bỏ lưu yêu thích' : 'Lưu vào mục yêu thích'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isGrammarBookmarked ? 'fill-rose-400' : ''}`} />
                </button>
                <button
                  onClick={() => handlePlayAudio(bundle.grammar.reflexSentence)}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-rose-600/30 text-rose-400 hover:text-white transition-colors cursor-pointer"
                  title="Nghe câu phản xạ người bản xứ"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pattern & Title */}
            <div className="space-y-1">
              <div className="text-lg font-extrabold text-rose-300 font-mono tracking-tight">
                {bundle.grammar.pattern}
              </div>
              <div className="text-xs text-slate-200 font-semibold">
                {bundle.grammar.title}
              </div>
            </div>

            {/* Situation & Native Reflex Sentence */}
            <div className="bg-slate-900/80 border border-slate-800/90 rounded-xl p-3 space-y-2">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="text-slate-300 font-medium">Tình huống phản xạ: </span>
                <span className="truncate">{bundle.grammar.situation}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-1">
                <div className="text-xs font-bold text-white font-jp leading-relaxed">
                  {bundle.grammar.reflexSentence}
                </div>
                <div className="text-[11px] text-slate-400 leading-normal">
                  {bundle.grammar.vietnamese}
                </div>
              </div>
            </div>

            {/* Interactive Reflex Quiz */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <span>Thử phản xạ trắc nghiệm:</span>
                {isQuizAnswered && (
                  <span
                    className={`font-bold ${
                      selectedQuizOption === bundle.grammar.quickQuiz.correctIndex
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {selectedQuizOption === bundle.grammar.quickQuiz.correctIndex ? 'Chính xác! ✨' : 'Chưa đúng, thử lại!'}
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-300 font-jp font-medium bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/70">
                {bundle.grammar.quickQuiz.question}
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {bundle.grammar.quickQuiz.options.map((opt, oIdx) => {
                  const isCorrect = oIdx === bundle.grammar.quickQuiz.correctIndex;
                  const isChosen = selectedQuizOption === oIdx;

                  let btnStyle = 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700';
                  if (isQuizAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-bold';
                    } else if (isChosen) {
                      btnStyle = 'bg-rose-950/80 border-rose-600 text-rose-300';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleQuizAnswer(oIdx)}
                      className={`text-left text-xs p-2 rounded-lg border transition-all cursor-pointer font-jp truncate ${btnStyle}`}
                    >
                      <span className="font-mono text-slate-500 mr-1.5">{oIdx + 1}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {isQuizAnswered && (
                <div className="text-[11px] text-slate-400 bg-slate-900/40 p-2 rounded border border-slate-800/60 animate-fadeIn">
                  <span className="text-emerald-400 font-medium">Giải thích: </span>
                  {bundle.grammar.quickQuiz.explanation}
                </div>
              )}
            </div>
          </div>

          {/* Card Footer: Jump to Confusing Grammar Lab */}
          <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
            <button
              onClick={() => onSelectDivision('learner_boost', 27)}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Vào Lab 27: Cặp Ngữ Pháp Dễ Nhầm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenAiSenseiWithQuery(`Thưa Giáo sư Yamato, hãy giúp tôi giải thích bản chất, phân biệt các mẫu dễ nhầm và hướng dẫn bẫy thi JLPT của cấu trúc ${bundle.grammar.pattern}`)}
              className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              Hỏi Sensei
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: TRIẾT LÝ SỐNG NHẬT BẢN (JAPANESE LIFE PHILOSOPHY) */}
        {/* ========================================================================= */}
        <div className="bg-[#090e1b] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-md group">
          <div className="space-y-4">
            {/* Top Tag & Actions */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-bold text-purple-400 uppercase tracking-wider">Triết Lý Sống</span>
                <span>·</span>
                <span className="text-slate-400 font-jp">日本の美学</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleToggleBookmark('philosophy')}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isPhilBookmarked
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={isPhilBookmarked ? 'Bỏ lưu yêu thích' : 'Lưu vào mục yêu thích'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isPhilBookmarked ? 'fill-purple-400' : ''}`} />
                </button>
                <button
                  onClick={() => handlePlayAudio(bundle.philosophy.inspiringQuote.japanese)}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-purple-600/30 text-purple-400 hover:text-white transition-colors cursor-pointer"
                  title="Nghe danh ngôn truyền cảm hứng"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Philosophy Title & Vietnamese Name */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold font-mincho text-white tracking-widest">
                  {bundle.philosophy.title}
                </span>
                <span className="text-xs font-mono text-purple-300 font-semibold">
                  {bundle.philosophy.romaji}
                </span>
              </div>
              <div className="text-xs text-indigo-300 font-medium">
                {bundle.philosophy.vietnameseName}
              </div>
            </div>

            {/* Core Meaning & Origin */}
            <div className="bg-slate-900/80 border border-slate-800/90 rounded-xl p-3 space-y-2">
              <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
                {bundle.philosophy.coreMeaning}
              </p>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 leading-relaxed">
                <span className="text-slate-300 font-medium">Nguồn gốc: </span>
                {bundle.philosophy.originAndContext}
              </div>
            </div>

            {/* Inspiring Quote (Meigen) */}
            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-purple-400 font-mono">
                <span>DANH NGÔN TRUYỀN CẢM HỨNG</span>
                <span>{bundle.philosophy.inspiringQuote.author}</span>
              </div>
              <div className="text-xs font-jp text-purple-200 font-semibold leading-relaxed">
                {bundle.philosophy.inspiringQuote.japanese}
              </div>
              <div className="text-[11px] text-slate-300 italic leading-relaxed">
                "{bundle.philosophy.inspiringQuote.vietnamese}"
              </div>
            </div>

            {/* Personal Reflection & Daily Note */}
            <div className="space-y-1.5">
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span className="font-semibold text-slate-300">Chiêm nghiệm hôm nay:</span>
                {noteSavedFeedback && (
                  <span className="text-emerald-400 text-[10px] animate-fadeIn">Đã lưu ghi chú!</span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 italic">
                {bundle.philosophy.reflectionPrompt}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={dayNote}
                  onChange={(e) => setDayNote(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveNote()}
                  placeholder="Ghi lại 1 suy nghĩ hoặc quyết tâm của bạn..."
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleSaveNote}
                  className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer shrink-0"
                  title="Lưu chiêm nghiệm cho ngày này"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card Footer: Cultural Lab */}
          <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
            <button
              onClick={() => onSelectDivision('cultural_learning', 47)}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Khám phá Triết Lý Văn Hóa Nhật</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenAiSenseiWithQuery(`Thưa Giáo sư Yamato, hãy đàm đạo sâu sắc hơn về triết lý ${bundle.philosophy.title} (${bundle.philosophy.vietnameseName}) và cách người Nhật ứng dụng điều này vào nghệ thuật đối nhân xử thế`)}
              className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              Đàm đạo Sensei
            </button>
          </div>
        </div>
      </div>

      {/* 3. Daily History Archive Modal */}
      <DailyArchiveModal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        currentLevel={currentLevel}
        selectedDateStr={activeDateStr}
        onSelectDate={(pickedDate) => setActiveDateStr(pickedDate)}
        onOpenAiSensei={onOpenAiSenseiWithQuery}
      />
    </section>
  );
};
