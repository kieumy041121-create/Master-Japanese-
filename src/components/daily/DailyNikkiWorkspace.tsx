import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  BookMarked,
  Bookmark,
  BookmarkCheck,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CloudRain,
  Eye,
  EyeOff,
  Feather,
  HeartHandshake,
  History,
  Mic,
  Moon,
  Music2,
  PenTool,
  Plus,
  Radio,
  Send,
  Sparkles,
  Square,
  SunMedium,
  Trash2,
  Trees,
  Volume2,
} from 'lucide-react';
import {
  buildMonthlyMoodMap,
  enrichStreamedNikkiEntry,
  evaluateSelfWrittenNikkiEntry,
  formatJapaneseDateLabel,
  GLASS_JAR_PROMPTS,
  GlassJarPrompt,
  NikkiEntryRecord,
  NikkiInputMode,
  NikkiStyleMode,
  NikkiToken,
  NikkiVocabTreasure,
  nikkiHistoryService,
  RedPenCorrection,
  streamEmpathicNikkiTranslation,
} from '../../services/dailyNikkiEngine';
import { speechService } from '../../services/speechService';
import { srsVaultService } from '../../services/srsVaultService';
import { zenAudioRadio, ZenAmbienceType } from '../../services/zenAudioRadio';
import { PitchAccentMiniSvg } from '../kanjiUniverse/PitchAccentMiniSvg';
import { ZenKoyomiMoodMap } from './ZenKoyomiMoodMap';

interface DailyNikkiWorkspaceProps {
  onExit: () => void;
  onOpenSrsVault: () => void;
}

type NikkiTheme = 'dark' | 'sepia';

const QUICK_TRANSLATE_PROMPTS = [
  {
    label: 'Mưa buồn ngang',
    text: 'Hôm nay trời mưa to, tự nhiên thấy buồn ngang, chả muốn làm gì cả.',
  },
  {
    label: 'Xui quá làm rơi ví',
    text: 'Hôm nay xui quá, làm rơi mất cái ví.',
  },
  {
    label: 'Suýt lỡ tàu sáng nay',
    text: 'Sáng nay ngủ quên nên suýt nữa thì trễ chuyến tàu đi làm, may mà chạy kịp đúng phút chót.',
  },
  {
    label: 'Tối yên bình một mình',
    text: 'Cuối ngày nấu một bữa cơm đơn giản, mở bản nhạc nhẹ rồi tự thưởng cho mình chút bình yên sau tuần làm việc căng thẳng.',
  },
];

const QUICK_SELF_WRITE_PROMPTS = [
  {
    label: 'Hôm nay mệt vì việc nhiều',
    text: '今日は仕事がとても多いから、すごく疲れた。早く寝たいです。',
  },
  {
    label: 'Trời mưa ngồi uống cà phê',
    text: '今日は雨が降っています。カフェで温かいコーヒーを飲んで、少し気分がよくなりました。',
  },
  {
    label: 'Chút hy vọng cho ngày mai',
    text: '最近ちょっと大変だけど、自分のペースで一歩ずつ頑張りたいと思う。',
  },
];

const STYLE_OPTIONS: { id: NikkiStyleMode; label: string; desc: string }[] = [
  { id: 'monologue', label: 'Độc thoại (独り言)', desc: 'Chân thật, tự nhủ nhẹ nhàng' },
  { id: 'futsukei', label: 'Thể ngắn (普通形)', desc: 'Nhật ký chuẩn mực ngắn gọn' },
  { id: 'poetic', label: 'Tản văn (エッセイ)', desc: 'Giàu hình ảnh, sâu lắng' },
];

const AMBIENCE_OPTIONS: { id: ZenAmbienceType; label: string; icon: React.ReactNode }[] = [
  { id: 'rain', label: 'Mưa rơi', icon: <CloudRain className="w-3.5 h-3.5" /> },
  { id: 'forest', label: 'Lá xào xạc', icon: <Trees className="w-3.5 h-3.5" /> },
  { id: 'lofi', label: 'Lofi Thiền', icon: <Music2 className="w-3.5 h-3.5" /> },
  { id: 'none', label: 'Chỉ giọng đọc', icon: <Mic className="w-3.5 h-3.5" /> },
];

const CORRECTION_CATEGORY_LABEL: Record<RedPenCorrection['category'], string> = {
  particle: 'Trợ từ',
  conjugation: 'Chia thể',
  nuance: 'Sắc thái bản xứ',
  style: 'Nhịp văn nhật ký',
};

/**
 * Renders the user's original Japanese text with gentle soft-rose wavy underlines
 * on phrases that have Red Pen upgrade suggestions, preserving ego and readability.
 */
function renderSoftRedPenHighlights(
  rawText: string,
  corrections: RedPenCorrection[] | undefined,
  isSepia: boolean
): React.ReactNode {
  if (!corrections || corrections.length === 0) return rawText;

  const ranges: { start: number; end: number; correction: RedPenCorrection }[] = [];
  for (const c of corrections) {
    if (!c.original) continue;
    const idx = rawText.indexOf(c.original);
    if (idx >= 0) {
      const overlaps = ranges.some(
        (r) => !(idx + c.original.length <= r.start || idx >= r.end)
      );
      if (!overlaps) {
        ranges.push({ start: idx, end: idx + c.original.length, correction: c });
      }
    }
  }

  if (ranges.length === 0) return rawText;
  ranges.sort((a, b) => a.start - b.start);

  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  ranges.forEach((r, idx) => {
    if (r.start > cursor) {
      nodes.push(<span key={`plain_${idx}`}>{rawText.slice(cursor, r.start)}</span>);
    }
    nodes.push(
      <span
        key={`corr_${r.correction.id}`}
        title={`Gợi ý tự nhiên hơn: ${r.correction.corrected}`}
        className={`underline decoration-wavy underline-offset-4 px-0.5 rounded ${
          isSepia
            ? 'decoration-rose-500/80 bg-rose-100/70 text-[#4A1D24]'
            : 'decoration-rose-400/80 bg-rose-500/10 text-rose-100'
        }`}
      >
        {rawText.slice(r.start, r.end)}
      </span>
    );
    cursor = r.end;
  });

  if (cursor < rawText.length) {
    nodes.push(<span key="plain_tail">{rawText.slice(cursor)}</span>);
  }
  return nodes;
}

export const DailyNikkiWorkspace: React.FC<DailyNikkiWorkspaceProps> = ({
  onExit,
  onOpenSrsVault,
}) => {
  const [theme, setTheme] = useState<NikkiTheme>(() => {
    try {
      const saved = localStorage.getItem('kotoba_nikki_theme');
      return saved === 'sepia' ? 'sepia' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [entries, setEntries] = useState<NikkiEntryRecord[]>(() =>
    nikkiHistoryService.getAll()
  );
  const [activeEntryId, setActiveEntryId] = useState<string>(
    () => nikkiHistoryService.getAll()[0]?.id || ''
  );

  // Composer state
  const [inputMode, setInputMode] = useState<NikkiInputMode>('translate');
  const [composerText, setComposerText] = useState<string>(
    'Hôm nay trời mưa to, tự nhiên thấy buồn ngang, chả muốn làm gì cả.'
  );
  const [styleMode, setStyleMode] = useState<NikkiStyleMode>('monologue');
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [srsVersion, setSrsVersion] = useState<number>(0);

  // Glass Jar of Prompts state
  const [drawnPrompt, setDrawnPrompt] = useState<GlassJarPrompt | null>(null);
  const [showCollocationDrawer, setShowCollocationDrawer] = useState<boolean>(false);
  const [jarShaking, setJarShaking] = useState<boolean>(false);

  // Zen Audio Radio state
  const [ambience, setAmbience] = useState<ZenAmbienceType>('rain');
  const [ambienceVolume, setAmbienceVolume] = useState<number>(0.34);
  const [playbackRate, setPlaybackRate] = useState<number>(0.84);
  const [isRadioPlaying, setIsRadioPlaying] = useState<boolean>(false);

  // Monthly Kanji Mood Calendar state
  const nowDate = new Date();
  const [moodYear, setMoodYear] = useState<number>(nowDate.getFullYear());
  const [moodMonth, setMoodMonth] = useState<number>(nowDate.getMonth());

  const manuscriptRef = useRef<HTMLElement | null>(null);
  const moodSectionRef = useRef<HTMLElement | null>(null);
  const streamSeqRef = useRef<number>(0);

  const [streamPreview, setStreamPreview] = useState<{
    vietnameseRaw: string;
    tokens: NikkiToken[];
    plainText: string;
    phase: 'streaming' | 'enriching';
    totalKanji: number;
    coveredKanji: number;
  } | null>(null);

  useEffect(() => {
    return () => {
      zenAudioRadio.stopAll();
    };
  }, []);

  const activeEntry = useMemo(
    () => entries.find((e) => e.id === activeEntryId) || entries[0] || null,
    [entries, activeEntryId]
  );

  const monthlyMoodSummary = useMemo(
    () => buildMonthlyMoodMap(entries, moodYear, moodMonth),
    [entries, moodYear, moodMonth]
  );

  const isSepia = theme === 'sepia';

  const handleExit = () => {
    zenAudioRadio.stopAll();
    onExit();
  };

  const handleChangeTheme = (next: NikkiTheme) => {
    setTheme(next);
    try {
      localStorage.setItem('kotoba_nikki_theme', next);
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSwitchInputMode = (nextMode: NikkiInputMode) => {
    if (nextMode === inputMode) return;
    setInputMode(nextMode);
    setErrorMsg(null);
    if (nextMode === 'self_write' && composerText === QUICK_TRANSLATE_PROMPTS[0].text) {
      setComposerText(QUICK_SELF_WRITE_PROMPTS[0].text);
    } else if (nextMode === 'translate' && composerText === QUICK_SELF_WRITE_PROMPTS[0].text) {
      setComposerText(QUICK_TRANSLATE_PROMPTS[0].text);
    }
  };

  const handleDrawGlassJarPrompt = () => {
    setJarShaking(true);
    setTimeout(() => setJarShaking(false), 380);
    const pool = GLASS_JAR_PROMPTS.filter((p) => p.id !== drawnPrompt?.id);
    const picked = pool[Math.floor(Math.random() * pool.length)] || GLASS_JAR_PROMPTS[0];
    setDrawnPrompt(picked);
    setShowCollocationDrawer(true);
    speechService.playSuccessSound();
  };

  const handleInsertCollocation = (expression: string, meaning: string) => {
    const snippet = inputMode === 'self_write' ? expression : `${meaning} (${expression})`;
    setComposerText((prev) => {
      const trimmed = prev.trimEnd();
      if (!trimmed) return snippet;
      const spacer = inputMode === 'self_write' ? '' : ' ';
      return `${trimmed}${spacer}${snippet}`;
    });
    showToast(`Đã chèn cụm「${expression}」vào khung viết.`);
  };

  const handleSubmitNikki = async () => {
    const trimmed = composerText.trim();
    if (!trimmed) {
      setErrorMsg(
        inputMode === 'translate'
          ? 'Hãy viết vài dòng cảm xúc tiếng Việt của bạn hôm nay trước nhé.'
          : 'Hãy thử viết vài câu tiếng Nhật để Sensei Bút Đỏ đồng hành cùng bạn.'
      );
      return;
    }

    const requestSeq = ++streamSeqRef.current;
    setErrorMsg(null);
    setIsGenerating(true);

    if (inputMode === 'translate') {
      // Stage A: Zero-Latency Live Stream Rendering directly with Furigana <ruby> tokens
      setStreamPreview({
        vietnameseRaw: trimmed,
        tokens: [],
        plainText: '',
        phase: 'streaming',
        totalKanji: 0,
        coveredKanji: 0,
      });

      try {
        const streamedResult = await streamEmpathicNikkiTranslation(
          trimmed,
          styleMode,
          ({ tokens, plainText, audit }) => {
            if (streamSeqRef.current !== requestSeq) return;
            setStreamPreview({
              vietnameseRaw: trimmed,
              tokens,
              plainText,
              phase: 'streaming',
              totalKanji: audit.totalKanjiChars,
              coveredKanji: audit.coveredKanjiChars,
            });
          }
        );

        if (streamSeqRef.current !== requestSeq) return;

        // Immediately release interactive button while Stage B enriches Haiku, Omoiyari & Treasures
        setIsGenerating(false);
        setStreamPreview((prev) =>
          prev
            ? {
                ...prev,
                tokens: streamedResult.tokens,
                plainText: streamedResult.plainText,
                phase: 'enriching',
                totalKanji: streamedResult.audit.totalKanjiChars,
                coveredKanji: streamedResult.audit.coveredKanjiChars,
              }
            : null
        );

        const enriched = await enrichStreamedNikkiEntry(
          trimmed,
          streamedResult.plainText,
          streamedResult.tokens,
          styleMode
        );
        if (streamSeqRef.current !== requestSeq) return;

        const nextList = nikkiHistoryService.saveEntry(enriched);
        setEntries(nextList);
        setActiveEntryId(enriched.id);
        setStreamPreview(null);
        speechService.playSuccessSound();
        showToast(
          `Đã hoàn tất chuyển ngữ tức thì · Khảm Furigana ${enriched.moodKanji.kanji} (${enriched.moodKanji.sinoVietnamese})`
        );
      } catch (err: unknown) {
        if (streamSeqRef.current !== requestSeq) return;
        setStreamPreview(null);
        setIsGenerating(false);
        const msg =
          err instanceof Error
            ? err.message
            : 'Không thể kết nối AI lúc này. Vui lòng thử lại sau giây lát.';
        setErrorMsg(msg);
      }
      return;
    }

    // Self-Write Red Pen Evaluation Mode
    try {
      const result = await evaluateSelfWrittenNikkiEntry(trimmed, styleMode);
      if (streamSeqRef.current !== requestSeq) return;
      const nextList = nikkiHistoryService.saveEntry(result);
      setEntries(nextList);
      setActiveEntryId(result.id);
      speechService.playSuccessSound();
      showToast('Sensei đã chấm Bút Đỏ dịu dàng & gửi hồi đáp Omoiyari!');
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Không thể kết nối AI lúc này. Vui lòng thử lại sau giây lát.';
      setErrorMsg(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleZenRadio = async () => {
    if (!activeEntry) return;
    if (isRadioPlaying) {
      zenAudioRadio.stopAll();
      setIsRadioPlaying(false);
      return;
    }
    setIsRadioPlaying(true);
    await zenAudioRadio.playDiaryRadio({
      text: activeEntry.japanesePlain,
      ambience,
      ambienceVolume,
      playbackRate,
      onEnded: () => setIsRadioPlaying(false),
    });
  };

  const handleSelectAmbience = (nextAmb: ZenAmbienceType) => {
    setAmbience(nextAmb);
    if (isRadioPlaying) {
      zenAudioRadio.startAmbience(nextAmb, ambienceVolume);
    }
  };

  const handleVolumeChange = (nextVol: number) => {
    setAmbienceVolume(nextVol);
    if (isRadioPlaying) {
      zenAudioRadio.setAmbienceVolume(nextVol);
    }
  };

  const handleSelectEntry = (entry: NikkiEntryRecord) => {
    if (isRadioPlaying) {
      zenAudioRadio.stopAll();
      setIsRadioPlaying(false);
    }
    setActiveEntryId(entry.id);
    manuscriptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSaveSingleTreasure = (tr: NikkiVocabTreasure) => {
    if (!activeEntry) return;
    const added = srsVaultService.toggleBookmark({
      japanese: tr.expression,
      reading: `${tr.furigana} (${tr.romaji})`,
      vietnamese: `${tr.meaning} — ${tr.whyLearn}`,
      type: 'phrase',
      level: tr.jlpt,
      contextSentence: tr.contextSentence,
      contextTranslation: activeEntry.vietnameseRaw,
      source: `Nhật ký ${activeEntry.dateLabelJa}`,
      tags: ['Daily Nikki', tr.jlpt, 'Collocation'],
    });
    setSrsVersion((v) => v + 1);
    speechService.playSuccessSound();
    showToast(
      added
        ? `Đã lưu「${tr.expression}」vào Từ điển cá nhân FSRS!`
        : `Đã gỡ「${tr.expression}」khỏi Từ điển cá nhân.`
    );
  };

  const handleSyncAllTreasuresToSrs = () => {
    if (!activeEntry || activeEntry.treasures.length === 0) return;

    let addedCount = 0;
    for (const tr of activeEntry.treasures) {
      const already = srsVaultService.isBookmarked(tr.expression);
      srsVaultService.addBookmark({
        japanese: tr.expression,
        reading: `${tr.furigana} (${tr.romaji})`,
        vietnamese: `${tr.meaning} — ${tr.whyLearn}`,
        type: 'phrase',
        level: tr.jlpt,
        contextSentence: tr.contextSentence,
        contextTranslation: activeEntry.vietnameseRaw,
        source: `Nhật ký ${activeEntry.dateLabelJa}`,
        tags: ['Daily Nikki', tr.jlpt, 'Collocation'],
      });
      if (!already) addedCount += 1;
    }

    const updated = nikkiHistoryService.markSyncedToSrs(activeEntry.id);
    setEntries(updated);
    setSrsVersion((v) => v + 1);
    speechService.playSuccessSound();
    showToast(
      addedCount > 0
        ? `Đã hút ${addedCount} cụm từ tinh hoa vào Phòng Luyện Trí Nhớ FSRS!`
        : `Toàn bộ ${activeEntry.treasures.length} cụm từ đã nằm gọn trong Từ điển cá nhân FSRS.`
    );
  };

  const handleDeleteEntry = (id: string) => {
    const remaining = nikkiHistoryService.deleteEntry(id);
    setEntries(remaining);
    if (activeEntryId === id) {
      setActiveEntryId(remaining[0]?.id || '');
    }
    showToast('Đã xóa trang nhật ký khỏi lịch sử.');
  };

  const handleShiftMonth = (delta: number) => {
    const next = new Date(moodYear, moodMonth + delta, 1);
    setMoodYear(next.getFullYear());
    setMoodMonth(next.getMonth());
  };

  const handleFocusMoodSection = () => {
    moodSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Explicit surface, border, and typography tokens for crisp contrast in both Dark & Sepia Washi
  const canvasClass = isSepia
    ? 'bg-[#F6F1E7] text-[#2C241B]'
    : 'bg-[#070b14] text-slate-100';
  const headerClass = isSepia
    ? 'bg-[#F6F1E7]/92 border-[#E2D6C3]'
    : 'bg-[#070b14]/88 border-slate-800/80';
  const cardClass = isSepia
    ? 'bg-[#FBF7EE] border-[#E2D6C3]'
    : 'bg-[#0b1120] border-slate-800';
  const subSurfaceClass = isSepia
    ? 'bg-[#F2EADF] border-[#DFD2BE]'
    : 'bg-[#070b14] border-slate-800';
  const mutedTextClass = isSepia ? 'text-[#6E6051]' : 'text-slate-400';
  const headingTextClass = isSepia ? 'text-[#211A13]' : 'text-white';
  const bodyTextClass = isSepia ? 'text-[#3A2F24]' : 'text-slate-200';
  const accentBtnClass = isSepia
    ? 'bg-[#7A4B2A] hover:bg-[#653C1F] text-[#FFFDF9] border-[#7A4B2A]'
    : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500';
  const ghostBtnClass = isSepia
    ? 'bg-[#F2EADF] hover:bg-[#E7DCCB] text-[#3A2F24] border-[#D8C8B1]'
    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700';

  const savedDueCount = useMemo(
    () => srsVaultService.getDueCards().length,
    [srsVersion]
  );

  const moodAccentStyle = (tone: string) => {
    if (isSepia) {
      switch (tone) {
        case 'bright':
          return 'bg-amber-100/80 border-amber-400/70 text-amber-950';
        case 'warm':
          return 'bg-emerald-100/70 border-emerald-400/70 text-emerald-950';
        case 'melancholy':
          return 'bg-sky-100/80 border-sky-400/70 text-sky-950';
        case 'heavy':
          return 'bg-rose-100/70 border-rose-400/70 text-rose-950';
        default:
          return 'bg-[#EFE5D5] border-[#C9B396] text-[#2C241B]';
      }
    }
    switch (tone) {
      case 'bright':
        return 'bg-amber-500/15 border-amber-400/40 text-amber-200';
      case 'warm':
        return 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200';
      case 'melancholy':
        return 'bg-sky-500/15 border-sky-400/40 text-sky-200';
      case 'heavy':
        return 'bg-rose-500/15 border-rose-400/40 text-rose-200';
      default:
        return 'bg-indigo-500/15 border-indigo-400/40 text-indigo-200';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${canvasClass}`}>
      {/* Quiet 3-Zone Standalone Zen Top Bar */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${headerClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={handleExit}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${ghostBtnClass}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
            <h1 className={`text-sm sm:text-base font-bold tracking-tight truncate ${headingTextClass}`}>
              Nhật Ký Mỗi Ngày · 日記
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleFocusMoodSection}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${ghostBtnClass}`}
            >
              <Calendar className={`w-3.5 h-3.5 ${isSepia ? 'text-[#7A4B2A]' : 'text-indigo-400'}`} />
              <span className="hidden md:inline">Bản Đồ Cảm Xúc</span>
            </button>

            {/* Dark / Sepia Zen Theme Switcher */}
            <div
              role="group"
              aria-label="Chọn nền đọc viết Zen"
              className={`flex items-center p-1 rounded-lg border text-xs ${subSurfaceClass}`}
            >
              <button
                type="button"
                onClick={() => handleChangeTheme('dark')}
                className={`px-2.5 py-1 rounded-md font-medium inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                  !isSepia
                    ? 'bg-indigo-600 text-white'
                    : 'text-[#6E6051] hover:text-[#211A13]'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tĩnh Đêm</span>
              </button>
              <button
                type="button"
                onClick={() => handleChangeTheme('sepia')}
                className={`px-2.5 py-1 rounded-md font-medium inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                  isSepia
                    ? 'bg-[#7A4B2A] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <SunMedium className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Giấy Washi</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenSrsVault}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${ghostBtnClass}`}
            >
              <BookMarked className="w-3.5 h-3.5 text-emerald-500" />
              <span className="tabular-nums">FSRS ({savedDueCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Feedback */}
      {toastMsg && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl border text-xs font-medium shadow-xl animate-fadeIn ${
            isSepia
              ? 'bg-[#2C241B] text-[#FFFDF9] border-[#7A4B2A]'
              : 'bg-slate-900 text-white border-indigo-500/60'
          }`}
        >
          {toastMsg}
        </div>
      )}

      {/* Main Generous Therapeutic Sanctuary Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 5 COLS: Sanctuary Composer + Glass Jar of Prompts + Mode Toggle */}
          <section className={`lg:col-span-5 rounded-2xl border p-6 sm:p-7 flex flex-col justify-between gap-5 ${cardClass}`}>
            <div className="space-y-5">
              {/* Top Composer Header + Interactive Lọ Lưu Ly (Glass Jar) Button */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className={`text-xs font-mono ${mutedTextClass}`}>
                    Thánh địa cảm xúc · Trị liệu & Thực chiến
                  </div>
                  <h2 className={`text-lg font-bold flex items-center gap-2 ${headingTextClass}`}>
                    <Feather className={`w-4 h-4 shrink-0 ${isSepia ? 'text-[#7A4B2A]' : 'text-indigo-400'}`} />
                    <span>Viết Trang Nhật Ký Hôm Nay</span>
                  </h2>
                </div>

                {/* Glowing Glass Jar of Prompts Trigger */}
                <button
                  type="button"
                  onClick={handleDrawGlassJarPrompt}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 transition-all ${
                    isSepia
                      ? 'bg-amber-100/90 hover:bg-amber-200/80 border-amber-400/70 text-[#4A2E14] shadow-sm'
                      : 'bg-sky-500/15 hover:bg-sky-500/25 border-sky-400/50 text-sky-200 shadow-[0_0_20px_-6px_rgba(56,189,248,0.55)]'
                  } ${jarShaking ? 'scale-95 rotate-2' : ''}`}
                  title="Rút 1 mảnh giấy gợi ý chủ đề & 5 collocations từ Lọ Lưu Ly"
                >
                  {/* Inline SVG Glass Jar Icon */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M8 3h8v2H8z" />
                    <path d="M7 5h10l1.5 3.5V19a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V8.5L7 5z" />
                    <path d="M9 12.5l2 1.5 4-3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Lọ Lưu Ly</span>
                </button>
              </div>

              {/* Drawn Glass Jar Prompt Card + 5 Collocations Dropdown */}
              {drawnPrompt && (
                <div
                  className={`rounded-xl border p-4 space-y-3 transition-all ${
                    isSepia
                      ? 'bg-[#F4ECDC] border-[#D3BC9A]'
                      : 'bg-sky-950/25 border-sky-500/35'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <div className={`text-[11px] font-mono ${isSepia ? 'text-[#7A4B2A]' : 'text-sky-300'}`}>
                        Mảnh giấy Lọ Lưu Ly · {drawnPrompt.suggestedMood}
                      </div>
                      <div lang="ja" className={`text-sm font-mincho font-bold leading-snug ${headingTextClass}`}>
                        {drawnPrompt.japanese}
                      </div>
                      <div className={`text-[11px] font-jp ${mutedTextClass}`}>
                        {drawnPrompt.reading}
                      </div>
                      <div className={`text-xs pt-0.5 ${bodyTextClass}`}>
                        {drawnPrompt.vietnamese}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => speechService.speak(drawnPrompt.japanese, 0.9)}
                        className={`p-1.5 rounded-lg border cursor-pointer ${ghostBtnClass}`}
                        aria-label="Nghe câu hỏi gợi ý"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleDrawGlassJarPrompt}
                        className={`px-2 py-1.5 rounded-lg border text-[11px] font-medium cursor-pointer whitespace-nowrap shrink-0 ${ghostBtnClass}`}
                      >
                        Rút câu khác
                      </button>
                    </div>
                  </div>

                  {/* Expandable 5 Collocations Dropdown */}
                  <div className={`border-t pt-2.5 ${isSepia ? 'border-[#DFD0B8]' : 'border-sky-500/20'}`}>
                    <button
                      type="button"
                      onClick={() => setShowCollocationDrawer((v) => !v)}
                      className={`w-full flex items-center justify-between text-xs font-semibold cursor-pointer ${
                        isSepia ? 'text-[#5A361B]' : 'text-sky-200'
                      }`}
                    >
                      <span>5 Collocations gợi ý chèn ngay ({drawnPrompt.collocations.length})</span>
                      {showCollocationDrawer ? (
                        <ChevronUp className="w-4 h-4 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 shrink-0" />
                      )}
                    </button>

                    {showCollocationDrawer && (
                      <div className="mt-2.5 space-y-1.5">
                        {drawnPrompt.collocations.map((col) => (
                          <div
                            key={col.expression}
                            className={`rounded-lg border px-2.5 py-2 flex items-center justify-between gap-2 ${subSurfaceClass}`}
                          >
                            <div className="min-w-0">
                              <div className="flex items-baseline gap-2 flex-wrap">
                                <span lang="ja" className={`text-xs font-mincho font-bold ${headingTextClass}`}>
                                  {col.expression}
                                </span>
                                <span className={`text-[11px] font-jp ${mutedTextClass}`}>
                                  ({col.reading})
                                </span>
                              </div>
                              <div className={`text-[11px] truncate ${mutedTextClass}`}>
                                {col.meaning}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => speechService.speak(col.expression)}
                                className={`p-1 rounded border cursor-pointer ${ghostBtnClass}`}
                                aria-label={`Nghe ${col.expression}`}
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleInsertCollocation(col.expression, col.meaning)}
                                className={`px-2 py-1 rounded border text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${ghostBtnClass}`}
                              >
                                <Plus className="w-3 h-3" />
                                <span>Chèn</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mode Switch: Dịch tự động <-> Tôi tự viết (Bút Đỏ) */}
              <div
                role="tablist"
                aria-label="Chế độ viết nhật ký"
                className={`grid grid-cols-2 p-1 rounded-xl border gap-1 ${subSurfaceClass}`}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={inputMode === 'translate'}
                  onClick={() => handleSwitchInputMode('translate')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
                    inputMode === 'translate'
                      ? accentBtnClass
                      : `${mutedTextClass} hover:opacity-90`
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Dịch tự động</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={inputMode === 'self_write'}
                  onClick={() => handleSwitchInputMode('self_write')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
                    inputMode === 'self_write'
                      ? accentBtnClass
                      : `${mutedTextClass} hover:opacity-90`
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5 shrink-0" />
                  <span>Tôi tự viết (Bút Đỏ)</span>
                </button>
              </div>

              {/* Quick Sample Presets per Mode */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(inputMode === 'translate' ? QUICK_TRANSLATE_PROMPTS : QUICK_SELF_WRITE_PROMPTS).map(
                  (sample) => (
                    <button
                      key={sample.label}
                      type="button"
                      onClick={() => setComposerText(sample.text)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 transition-colors ${ghostBtnClass}`}
                    >
                      {sample.label}
                    </button>
                  )
                )}
              </div>

              {/* Composer Textarea */}
              <div className="space-y-2">
                <textarea
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      if (!isGenerating) {
                        handleSubmitNikki();
                      }
                    }
                  }}
                  rows={5}
                  lang={inputMode === 'self_write' ? 'ja' : 'vi'}
                  placeholder={
                    inputMode === 'translate'
                      ? 'Trút bỏ mọi tâm tư bằng tiếng Việt (Enter để dịch dòng chảy tức thì): Hôm nay xui quá, làm rơi mất cái ví...'
                      : 'Tự tin viết bằng tiếng Nhật theo ý bạn (Enter để gửi Sensei Bút Đỏ): 今日は...'
                  }
                  className={`w-full rounded-xl border p-4 text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 resize-y ${
                    inputMode === 'self_write' ? 'font-jp' : ''
                  } ${
                    isSepia
                      ? 'bg-[#FFFDF9] border-[#D8C8B1] text-[#211A13] placeholder:text-[#9A8B7A] focus:ring-[#7A4B2A]/40'
                      : 'bg-[#070b14] border-slate-800 text-slate-100 placeholder:text-slate-500 focus:ring-indigo-500/40'
                  }`}
                />
                <div className={`flex items-center justify-between text-xs ${mutedTextClass}`}>
                  <span className="tabular-nums">{composerText.trim().length} ký tự</span>
                  <span>
                    {inputMode === 'translate'
                      ? 'Enter để dịch dòng chảy · Shift+Enter xuống dòng'
                      : 'Enter để gửi Bút Đỏ · Shift+Enter xuống dòng'}
                  </span>
                </div>
              </div>

              {/* Style Mode Selector */}
              <div className="space-y-2">
                <div className={`text-xs font-medium ${mutedTextClass}`}>
                  Sắc thái văn phong Nhật ký đích
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {STYLE_OPTIONS.map((opt) => {
                    const active = styleMode === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setStyleMode(opt.id)}
                        className={`px-3 py-2 rounded-xl border text-left transition-colors cursor-pointer ${
                          active
                            ? isSepia
                              ? 'bg-[#7A4B2A]/12 border-[#7A4B2A] text-[#211A13]'
                              : 'bg-indigo-600/20 border-indigo-400 text-white'
                            : `${subSurfaceClass} ${mutedTextClass}`
                        }`}
                      >
                        <div className="text-xs font-semibold whitespace-nowrap truncate">
                          {opt.label}
                        </div>
                        <div className="text-[11px] opacity-80 truncate">{opt.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              {errorMsg && (
                <div
                  className={`rounded-xl border px-3.5 py-2.5 text-xs flex items-start gap-2 ${
                    isSepia
                      ? 'bg-rose-50 border-rose-300 text-rose-900'
                      : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmitNikki}
                disabled={isGenerating}
                className={`w-full py-3 px-5 rounded-xl border text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-75 whitespace-nowrap shrink-0 ${accentBtnClass}`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {isGenerating
                    ? inputMode === 'translate'
                      ? 'Đang chảy từng cụm từ tiếng Nhật...'
                      : 'Sensei Bút Đỏ đang trau chuốt câu chữ...'
                    : inputMode === 'translate'
                    ? 'Chuyển Ngữ Quang Tốc & Khảm Furigana'
                    : 'Chấm Bút Đỏ Tinh Tế & Hồi Đáp'}
                </span>
              </button>
            </div>
          </section>

          {/* RIGHT 7 COLS: Japanese Manuscript + Live Stream Ruby Renderer + Zen Audio Radio + AI Therapist */}
          <section
            ref={manuscriptRef}
            className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between gap-6 ${cardClass}`}
          >
            {streamPreview ? (
              <div className="space-y-5">
                <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 ${isSepia ? 'border-[#E2D6C3]' : 'border-slate-800'}`}>
                  <div className="space-y-0.5 min-w-0">
                    <div className={`text-xs font-mono ${mutedTextClass}`}>
                      {formatJapaneseDateLabel()} · {streamPreview.phase === 'streaming' ? 'Dòng chảy chuyển ngữ tức thì' : 'Đang dệt Haiku & lời đáp Omoiyari'}
                    </div>
                    <h3 className={`text-lg sm:text-xl font-mincho font-bold ${headingTextClass}`}>
                      本日の日記 · Trang viết hôm nay
                    </h3>
                  </div>

                  {/* Live 0ms Furigana Zen Toggle — interactive even while streaming */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={showFurigana}
                    onClick={() => setShowFurigana((v) => !v)}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      showFurigana
                        ? isSepia
                          ? 'bg-[#7A4B2A] border-[#7A4B2A] text-white'
                          : 'bg-indigo-600/25 border-indigo-400 text-white'
                        : ghostBtnClass
                    }`}
                  >
                    {showFurigana ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{showFurigana ? 'Furigana: BẬT' : 'Furigana: TẮT'}</span>
                  </button>
                </div>

                <div className={`rounded-2xl border p-6 sm:p-7 ${subSurfaceClass}`}>
                  <p
                    lang="ja"
                    className={`font-mincho text-xl sm:text-2xl leading-[2.75] tracking-wide ${headingTextClass}`}
                  >
                    {streamPreview.tokens.length > 0 ? (
                      streamPreview.tokens.map((tok, idx) =>
                        tok.isKanji && tok.reading ? (
                          <ruby key={idx} className="group mx-[0.5px]">
                            {tok.text}
                            <rt
                              className={`text-[11px] sm:text-xs font-jp font-normal select-none transition-opacity duration-100 ${
                                isSepia ? 'text-[#7A4B2A]' : 'text-indigo-300'
                              } ${
                                showFurigana
                                  ? 'opacity-100'
                                  : 'opacity-0 pointer-events-none group-hover:opacity-75'
                              }`}
                            >
                              {tok.reading}
                            </rt>
                          </ruby>
                        ) : (
                          <span key={idx}>{tok.text}</span>
                        )
                      )
                    ) : (
                      <span className={`text-base font-sans ${mutedTextClass}`}>
                        Đang thấu cảm mạch câu tiếng Việt để cất lời bản xứ...
                      </span>
                    )}
                  </p>
                </div>

                <div className={`flex flex-wrap items-center justify-between gap-2 text-xs ${mutedTextClass}`}>
                  <span>
                    Bản gốc: “{streamPreview.vietnameseRaw}”
                  </span>
                  {streamPreview.totalKanji > 0 && (
                    <span className="font-mono tabular-nums">
                      Furigana phủ {streamPreview.coveredKanji}/{streamPreview.totalKanji} chữ Hán
                    </span>
                  )}
                </div>
              </div>
            ) : activeEntry ? (
              <>
                <div className="space-y-5">
                  {/* Manuscript Header with Mood Kanji Seal + 0ms Furigana Switch */}
                  <div className={`flex flex-wrap items-start justify-between gap-4 border-b pb-4 ${isSepia ? 'border-[#E2D6C3]' : 'border-slate-800'}`}>
                    <div className="flex items-start gap-3.5 min-w-0">
                      {/* Representative Mood Kanji Hanko Seal */}
                      <div
                        className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center shrink-0 ${moodAccentStyle(
                          activeEntry.moodKanji.tone
                        )}`}
                        title={`${activeEntry.moodKanji.kanji} (${activeEntry.moodKanji.sinoVietnamese}): ${activeEntry.moodKanji.meaningVi}`}
                      >
                        <span lang="ja" className="text-2xl font-gyosho leading-none">
                          {activeEntry.moodKanji.kanji}
                        </span>
                        <span className="text-[10px] font-mono font-semibold mt-1 tracking-wider">
                          {activeEntry.moodKanji.sinoVietnamese}
                        </span>
                      </div>

                      <div className="space-y-0.5 min-w-0">
                        <div className={`text-xs font-mono ${mutedTextClass}`}>
                          {activeEntry.dateLabelJa} ·{' '}
                          {activeEntry.inputMode === 'self_write' ? 'Bút Đỏ Thực Chiến' : 'Thấu Cảm Tự Sự'} ·{' '}
                          {activeEntry.moodKanji.meaningVi}
                        </div>
                        <h3 className={`text-lg sm:text-xl font-mincho font-bold ${headingTextClass}`}>
                          {activeEntry.japaneseTitle}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* 0ms Zero-Latency Furigana Toggle Switch */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={showFurigana}
                        onClick={() => setShowFurigana((v) => !v)}
                        className={`px-3.5 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          showFurigana
                            ? isSepia
                              ? 'bg-[#7A4B2A] border-[#7A4B2A] text-white'
                              : 'bg-indigo-600/25 border-indigo-400 text-white'
                            : ghostBtnClass
                        }`}
                        title="Ẩn/Hiện Furigana tức thì 0ms không xô lệch dòng"
                      >
                        {showFurigana ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5" />
                        )}
                        <span>{showFurigana ? 'Furigana: BẬT' : 'Furigana: TẮT'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Zen Audio Playback Radio Bar */}
                  <div className={`rounded-xl border p-3.5 space-y-3 ${subSurfaceClass}`}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handleToggleZenRadio}
                        className={`px-3.5 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                          isRadioPlaying
                            ? isSepia
                              ? 'bg-rose-700 border-rose-700 text-white'
                              : 'bg-rose-600 border-rose-500 text-white'
                            : accentBtnClass
                        }`}
                      >
                        {isRadioPlaying ? (
                          <>
                            <Square className="w-3.5 h-3.5 fill-current" />
                            <span>Dừng Đài Thiền Định</span>
                          </>
                        ) : (
                          <>
                            <Radio className="w-3.5 h-3.5" />
                            <span>Phát Đài Thiền Định</span>
                          </>
                        )}
                      </button>

                      {/* Ambience Soundscape Selector */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {AMBIENCE_OPTIONS.map((opt) => {
                          const selected = ambience === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectAmbience(opt.id)}
                              className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                                selected
                                  ? isSepia
                                    ? 'bg-[#7A4B2A]/15 border-[#7A4B2A] text-[#211A13]'
                                    : 'bg-indigo-600/25 border-indigo-400 text-white'
                                  : ghostBtnClass
                              }`}
                            >
                              {opt.icon}
                              <span>{opt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Speed Toggle + Labeled Ambience Volume Slider */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${mutedTextClass}`}>Tốc độ giọng đọc:</span>
                        <button
                          type="button"
                          onClick={() =>
                            setPlaybackRate((r) => (r < 0.9 ? 0.95 : 0.82))
                          }
                          className={`px-2.5 py-1 rounded-lg border text-xs font-mono cursor-pointer whitespace-nowrap shrink-0 ${ghostBtnClass}`}
                        >
                          {playbackRate < 0.9 ? '0.82x Chậm rãi' : '0.95x Tự nhiên'}
                        </button>
                      </div>

                      {ambience !== 'none' && (
                        <label className="flex items-center gap-2.5 text-xs">
                          <span className={`font-medium whitespace-nowrap tabular-nums ${mutedTextClass}`}>
                            Nhạc nền: {Math.round(ambienceVolume * 100)}%
                          </span>
                          <input
                            type="range"
                            min={0.05}
                            max={0.75}
                            step={0.05}
                            value={ambienceVolume}
                            onChange={(e) => handleVolumeChange(Number(e.target.value))}
                            className="w-28 accent-indigo-500 cursor-pointer"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Japanese Nikki Passage (Fixed line-height 2.75 prevents ANY line jump on Furigana toggle!) */}
                  <div className={`rounded-2xl border p-6 sm:p-7 ${subSurfaceClass}`}>
                    <p
                      lang="ja"
                      className={`font-mincho text-xl sm:text-2xl leading-[2.75] tracking-wide ${headingTextClass}`}
                    >
                      {activeEntry.tokens.map((tok, idx) =>
                        tok.isKanji && tok.reading ? (
                          <ruby key={idx} className="group mx-[0.5px]">
                            {tok.text}
                            <rt
                              className={`text-[11px] sm:text-xs font-jp font-normal select-none transition-opacity duration-100 ${
                                isSepia ? 'text-[#7A4B2A]' : 'text-indigo-300'
                              } ${
                                showFurigana
                                  ? 'opacity-100'
                                  : 'opacity-0 pointer-events-none group-hover:opacity-75'
                              }`}
                            >
                              {tok.reading}
                            </rt>
                          </ruby>
                        ) : (
                          <span key={idx}>{tok.text}</span>
                        )
                      )}
                    </p>
                  </div>

                  {/* RED PEN & EGO-PRESERVATION SECTION (Visible when user self-wrote in Japanese) */}
                  {activeEntry.inputMode === 'self_write' && activeEntry.selfWrittenOriginalJa && (
                    <div
                      className={`rounded-2xl border p-5 space-y-4 ${
                        isSepia
                          ? 'bg-[#F8F1E5] border-[#DFC9A8]'
                          : 'bg-rose-950/15 border-rose-500/30'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <HeartHandshake
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isSepia ? 'text-[#7A4B2A]' : 'text-emerald-400'
                          }`}
                        />
                        <div className="space-y-1">
                          <div className={`text-xs font-bold ${headingTextClass}`}>
                            Bút Đỏ Dịu Dàng & Bảo Toàn Lòng Tự Trọng
                          </div>
                          {activeEntry.praiseFirst && (
                            <p className={`text-xs leading-relaxed ${bodyTextClass}`}>
                              {activeEntry.praiseFirst}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Original Japanese Draft with Soft-Rose Wavy Underlines */}
                      <div className={`rounded-xl border p-3.5 space-y-1 ${subSurfaceClass}`}>
                        <div className={`text-[11px] font-mono ${mutedTextClass}`}>
                          Bản bạn tự viết (gạch chân hồng nhạt ở điểm có thể nâng cấp):
                        </div>
                        <p lang="ja" className={`text-sm sm:text-base font-jp leading-relaxed ${bodyTextClass}`}>
                          {renderSoftRedPenHighlights(
                            activeEntry.selfWrittenOriginalJa,
                            activeEntry.redPenCorrections,
                            isSepia
                          )}
                        </p>
                      </div>

                      {/* Upgrade Comparison Items */}
                      {activeEntry.redPenCorrections && activeEntry.redPenCorrections.length > 0 && (
                        <div className="space-y-2.5">
                          {activeEntry.redPenCorrections.map((corr) => (
                            <div
                              key={corr.id}
                              className={`rounded-xl border p-3.5 space-y-1.5 ${subSurfaceClass}`}
                            >
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                <span
                                  className={`px-2 py-0.5 rounded-md border font-mono text-[11px] ${
                                    isSepia
                                      ? 'bg-[#EFE3D0] border-[#D3BC9A] text-[#5C3A1E]'
                                      : 'bg-slate-900 border-slate-700 text-slate-300'
                                  }`}
                                >
                                  {CORRECTION_CATEGORY_LABEL[corr.category]}
                                </span>
                                <span lang="ja" className="line-through opacity-65 font-jp">
                                  {corr.original}
                                </span>
                                <span className={mutedTextClass}>→</span>
                                <span
                                  lang="ja"
                                  className={`font-jp font-semibold ${
                                    isSepia ? 'text-emerald-800' : 'text-emerald-300'
                                  }`}
                                >
                                  {corr.corrected}
                                </span>
                              </div>
                              <p className={`text-xs leading-relaxed ${bodyTextClass}`}>
                                <span className={`font-semibold ${mutedTextClass}`}>
                                  Tại sao tự nhiên hơn:{' '}
                                </span>
                                {corr.gentleReason}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* AI THERAPIST OMOIYARI FEEDBACK LOOP */}
                  <div
                    className={`rounded-2xl border p-5 space-y-3 ${
                      isSepia
                        ? 'bg-[#F1EAD9] border-[#D4C1A3]'
                        : 'bg-indigo-950/25 border-indigo-500/35'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <HeartHandshake
                          className={`w-4 h-4 shrink-0 ${
                            isSepia ? 'text-[#7A4B2A]' : 'text-indigo-300'
                          }`}
                        />
                        <span className={`text-xs font-bold ${headingTextClass}`}>
                          Lời Thấu Cảm Từ AI Sensei (Omoiyari · 思いやり)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => speechService.speak(activeEntry.therapistReply.japanese, 0.9)}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${ghostBtnClass}`}
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Nghe Sensei</span>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <p lang="ja" className={`text-base sm:text-lg font-mincho font-semibold leading-relaxed ${headingTextClass}`}>
                        {activeEntry.therapistReply.japanese}
                      </p>
                      {showFurigana && (
                        <p className={`text-xs font-jp ${isSepia ? 'text-[#7A4B2A]' : 'text-indigo-300'}`}>
                          {activeEntry.therapistReply.reading}
                        </p>
                      )}
                      <p className={`text-xs sm:text-sm leading-relaxed ${bodyTextClass}`}>
                        {activeEntry.therapistReply.vietnamese}
                      </p>
                    </div>

                    <div className={`pt-2 border-t text-[11px] ${isSepia ? 'border-[#D9C7AA]' : 'border-indigo-500/20'} ${mutedTextClass}`}>
                      {activeEntry.therapistReply.cultureNote}
                    </div>
                  </div>

                  {/* Original Emotion & Audit Summary */}
                  <div className="space-y-1.5 text-xs">
                    <div className={bodyTextClass}>
                      <span className={`font-semibold ${mutedTextClass}`}>Mạch cảm xúc: </span>
                      {activeEntry.emotionalTone}
                    </div>
                    <div className={`flex flex-wrap items-center gap-2 ${mutedTextClass}`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{activeEntry.audit.auditNote}</span>
                    </div>
                  </div>
                </div>

                {/* Original Meaning Whisper */}
                <div className={`pt-4 border-t text-xs ${isSepia ? 'border-[#E2D6C3]' : 'border-slate-800/80'} ${mutedTextClass}`}>
                  <span className="font-semibold">Ý nghĩa nguyên bản: </span>
                  <span>“{activeEntry.vietnameseRaw}”</span>
                </div>
              </>
            ) : (
              <div className={`py-16 text-center text-sm ${mutedTextClass}`}>
                Hãy viết đôi dòng tâm sự bên trái để AI dệt nên trang nhật ký chữa lành đầu tiên của bạn.
              </div>
            )}
          </section>
        </div>

        {/* ZEN KOYOMI MOOD MAP & WAIRO SPECTRUM */}
        <section ref={moodSectionRef} className="scroll-mt-20">
          <ZenKoyomiMoodMap
            entries={entries}
            summary={monthlyMoodSummary}
            activeEntryId={activeEntry?.id}
            isSepia={isSepia}
            onShiftMonth={handleShiftMonth}
            onSelectEntry={handleSelectEntry}
            onFSRSChanged={() => setSrsVersion((v) => v + 1)}
            onToast={showToast}
          />
        </section>

        {/* TREASURE CHEST: EXTRACTED LIVING COLLOCATIONS & PITCH ACCENT */}
        {activeEntry && activeEntry.treasures.length > 0 && (
          <section className={`rounded-2xl border p-6 sm:p-7 space-y-5 ${cardClass}`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${isSepia ? 'border-[#E2D6C3]' : 'border-slate-800'}`}>
              <div className="space-y-1">
                <h3 className={`text-base sm:text-lg font-bold ${headingTextClass}`}>
                  Rương Báu Vật Từ Vựng & Cụm Từ Đời Sống
                </h3>
                <p className={`text-xs ${mutedTextClass}`}>
                  Chắt lọc trực tiếp từ trang nhật ký hôm nay — đầy đủ Kanji, Furigana, Pitch Accent, Ý nghĩa và Lý do đáng học.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSyncAllTreasuresToSrs}
                className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                  activeEntry.syncedToSrs
                    ? isSepia
                      ? 'bg-emerald-800 border-emerald-700 text-white'
                      : 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                    : accentBtnClass
                }`}
              >
                <BookMarked className="w-4 h-4" />
                <span>
                  {activeEntry.syncedToSrs
                    ? 'Đã lưu vào Từ điển cá nhân'
                    : 'Lưu vào Từ điển cá nhân'}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeEntry.treasures.map((tr) => {
                const isSaved = srsVaultService.isBookmarked(tr.expression);
                return (
                  <article
                    key={tr.id}
                    className={`rounded-xl border p-5 flex flex-col justify-between gap-3.5 ${subSurfaceClass}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className={`text-[11px] font-mono ${mutedTextClass}`}>
                            {tr.jlpt} · {tr.furigana} · {tr.romaji}
                          </div>
                          <div className={`text-xl sm:text-2xl font-mincho font-bold mt-0.5 ${headingTextClass}`}>
                            {tr.expression}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => speechService.speak(tr.expression)}
                            className={`p-1.5 rounded-lg border cursor-pointer ${ghostBtnClass}`}
                            aria-label={`Nghe phát âm ${tr.expression}`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveSingleTreasure(tr)}
                            className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
                              isSaved
                                ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                                : ghostBtnClass
                            }`}
                            aria-label={`Lưu ${tr.expression} vào FSRS`}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="w-3.5 h-3.5" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className={`text-sm font-semibold ${headingTextClass}`}>
                        {tr.meaning}
                      </div>

                      {/* Pitch Accent Contour */}
                      <div className="space-y-1">
                        <div className={`text-[11px] font-mono ${mutedTextClass}`}>
                          {tr.pitchLabel}
                        </div>
                        <PitchAccentMiniSvg
                          reading={tr.furigana}
                          pitchType={tr.pitchType}
                          pitchAccentNum={tr.pitchAccentNum}
                        />
                      </div>

                      <div className={`text-xs leading-relaxed ${bodyTextClass}`}>
                        <span className={`font-semibold ${isSepia ? 'text-[#7A4B2A]' : 'text-indigo-300'}`}>
                          Lý do nên học:{' '}
                        </span>
                        {tr.whyLearn}
                      </div>
                    </div>

                    <div className={`pt-2.5 border-t text-xs font-jp ${isSepia ? 'border-[#E2D6C3]' : 'border-slate-800/80'} ${mutedTextClass}`}>
                      “{tr.contextSentence}”
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* PRIVATE NIKKI ARCHIVE SHELF */}
        <section className={`rounded-2xl border p-6 space-y-4 ${cardClass}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className={`text-sm sm:text-base font-bold flex items-center gap-2 ${headingTextClass}`}>
              <History className={`w-4 h-4 ${isSepia ? 'text-[#7A4B2A]' : 'text-indigo-400'}`} />
              <span>Trang Nhật Ký Đã Lưu ({entries.length})</span>
            </h3>
            <span className={`text-xs ${mutedTextClass}`}>
              Lưu trữ riêng tư trên trình duyệt · Nhấp để đọc lại hoặc bật Đài Thiền Định
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {entries.map((entry) => {
              const isCurrent = activeEntry?.id === entry.id;
              return (
                <div
                  key={entry.id}
                  onClick={() => handleSelectEntry(entry)}
                  className={`rounded-xl border p-4 flex flex-col justify-between gap-2.5 cursor-pointer transition-colors ${
                    isCurrent
                      ? isSepia
                        ? 'bg-[#7A4B2A]/10 border-[#7A4B2A]'
                        : 'bg-indigo-950/25 border-indigo-400'
                      : subSurfaceClass
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          lang="ja"
                          className={`w-6 h-6 rounded-md border inline-flex items-center justify-center text-sm font-gyosho shrink-0 ${moodAccentStyle(
                            entry.moodKanji.tone
                          )}`}
                        >
                          {entry.moodKanji.kanji}
                        </span>
                        <span className={`text-[11px] font-mono truncate ${mutedTextClass}`}>
                          {entry.dateLabelJa}
                        </span>
                      </div>
                      {entries.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEntry(entry.id);
                          }}
                          className={`p-1 rounded hover:text-rose-500 cursor-pointer shrink-0 ${mutedTextClass}`}
                          aria-label="Xóa nhật ký"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className={`text-sm font-mincho font-bold truncate ${headingTextClass}`}>
                      {entry.japaneseTitle}
                    </div>
                    <p className={`text-xs line-clamp-2 ${mutedTextClass}`}>
                      {entry.vietnameseRaw}
                    </p>
                  </div>
                  <div className={`text-[11px] font-mono ${isSepia ? 'text-[#7A4B2A]' : 'text-indigo-300'}`}>
                    {entry.inputMode === 'self_write' ? 'Bút Đỏ · ' : 'Thấu Cảm · '}
                    {entry.treasures.length} cụm từ {entry.syncedToSrs ? '· Đã đồng bộ FSRS' : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
