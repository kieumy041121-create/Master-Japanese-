import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Loader2,
  Music2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Square,
  Volume2,
} from 'lucide-react';
import {
  generateCustomMonthlyYojijukugo,
  MoodDayCell,
  MonthlyMoodSummary,
  NikkiEntryRecord,
  WairoSpectrumFamily,
  YojijukugoMonthlySummary,
} from '../../services/dailyNikkiEngine';
import { srsVaultService } from '../../services/srsVaultService';
import { speechService } from '../../services/speechService';
import { zenAudioRadio } from '../../services/zenAudioRadio';

interface ZenKoyomiMoodMapProps {
  entries: NikkiEntryRecord[];
  summary: MonthlyMoodSummary;
  activeEntryId?: string;
  isSepia: boolean;
  onShiftMonth: (delta: number) => void;
  onSelectEntry: (entry: NikkiEntryRecord) => void;
  onFSRSChanged: () => void;
  onToast: (msg: string) => void;
}

const WEEKDAY_KANJI_HEADERS = [
  { short: 'T2', ja: '月' },
  { short: 'T3', ja: '火' },
  { short: 'T4', ja: '水' },
  { short: 'T5', ja: '木' },
  { short: 'T6', ja: '金' },
  { short: 'T7', ja: '土' },
  { short: 'CN', ja: '日' },
];

const WAIRO_LEGEND: {
  family: WairoSpectrumFamily;
  kanjiSample: string;
  label: string;
  wairoName: string;
}[] = [
  { family: 'sakura_sun', kanjiSample: '喜・楽', label: 'Tích cực, rạng rỡ', wairoName: '桜・山吹 (Sakura & Nắng)' },
  { family: 'matcha_calm', kanjiSample: '平・静', label: 'Bình yên, tĩnh tại', wairoName: '抹茶・青磁 (Matcha)' },
  { family: 'indigo_rain', kanjiSample: '哀・悲', label: 'Trầm lắng, sâu tư', wairoName: '藍染 (Indigo)' },
  { family: 'crimson_ash', kanjiSample: '疲・怒', label: 'Mệt mỏi, áp lực', wairoName: '灰桜・臙脂 (Tro & Đỏ thẫm)' },
];

function getWairoTileAppearance(family: WairoSpectrumFamily, isSepia: boolean): string {
  if (isSepia) {
    switch (family) {
      case 'sakura_sun':
        return 'bg-gradient-to-br from-[#FDE2E7]/95 via-[#FCE7F3]/85 to-[#FEF3C7]/90 text-[#7A2E45] shadow-[0_10px_24px_-12px_rgba(236,72,153,0.45)]';
      case 'matcha_calm':
        return 'bg-gradient-to-br from-[#DCFCE7]/90 via-[#E7F5EA]/90 to-[#D1FAE5]/85 text-[#1F4B33] shadow-[0_10px_24px_-12px_rgba(34,197,94,0.35)]';
      case 'indigo_rain':
        return 'bg-gradient-to-br from-[#E0E7FF]/95 via-[#DBEAFE]/90 to-[#C7D2FE]/85 text-[#1E3370] shadow-[0_10px_24px_-12px_rgba(79,70,229,0.35)]';
      case 'crimson_ash':
        return 'bg-gradient-to-br from-[#EFE4E2]/95 via-[#E8D8D6]/90 to-[#F3CFD3]/85 text-[#4E2328] shadow-[0_10px_24px_-12px_rgba(159,18,57,0.3)]';
    }
  }
  switch (family) {
    case 'sakura_sun':
      return 'bg-gradient-to-br from-rose-400/25 via-pink-400/18 to-amber-300/22 text-rose-100 shadow-[0_12px_28px_-12px_rgba(244,114,182,0.48)]';
    case 'matcha_calm':
      return 'bg-gradient-to-br from-emerald-400/22 via-teal-400/18 to-lime-300/15 text-emerald-100 shadow-[0_12px_28px_-12px_rgba(16,185,129,0.4)]';
    case 'indigo_rain':
      return 'bg-gradient-to-br from-indigo-500/30 via-blue-500/22 to-slate-700/35 text-indigo-100 shadow-[0_12px_28px_-12px_rgba(99,102,241,0.45)]';
    case 'crimson_ash':
      return 'bg-gradient-to-br from-stone-600/45 via-rose-900/35 to-slate-800/50 text-rose-100 shadow-[0_12px_28px_-12px_rgba(225,29,72,0.35)]';
  }
}

function getWairoSwatchDot(family: WairoSpectrumFamily, isSepia: boolean): string {
  switch (family) {
    case 'sakura_sun':
      return isSepia ? 'bg-[#F4A8B8]' : 'bg-rose-400/80';
    case 'matcha_calm':
      return isSepia ? 'bg-[#86BA90]' : 'bg-emerald-400/80';
    case 'indigo_rain':
      return isSepia ? 'bg-[#6F86C8]' : 'bg-indigo-400/85';
    case 'crimson_ash':
      return isSepia ? 'bg-[#9E6B70]' : 'bg-rose-400/55';
  }
}

function getDominantBackdropWash(family: WairoSpectrumFamily, isSepia: boolean): string {
  if (isSepia) {
    switch (family) {
      case 'sakura_sun':
        return 'from-[#FDE8EC]/55 via-[#FBF7EE]/90 to-[#FEF6E0]/55';
      case 'matcha_calm':
        return 'from-[#E9F5EC]/60 via-[#FBF7EE]/90 to-[#EEF6EE]/55';
      case 'indigo_rain':
        return 'from-[#E9EEFC]/60 via-[#FBF7EE]/90 to-[#EEF2FF]/55';
      case 'crimson_ash':
        return 'from-[#F2E9E8]/60 via-[#FBF7EE]/90 to-[#F6EFEA]/55';
    }
  }
  switch (family) {
    case 'sakura_sun':
      return 'from-rose-950/35 via-[#0b1120]/85 to-amber-950/20';
    case 'matcha_calm':
      return 'from-emerald-950/30 via-[#0b1120]/85 to-teal-950/20';
    case 'indigo_rain':
      return 'from-indigo-950/40 via-[#0b1120]/85 to-slate-900/55';
    case 'crimson_ash':
      return 'from-rose-950/30 via-[#0b1120]/85 to-stone-900/55';
  }
}

interface HoveredMemoryState {
  cell: MoodDayCell;
  left: number;
  top: number;
  placeAbove: boolean;
}

export const ZenKoyomiMoodMap: React.FC<ZenKoyomiMoodMapProps> = ({
  entries,
  summary,
  activeEntryId,
  isSepia,
  onShiftMonth,
  onSelectEntry,
  onFSRSChanged,
  onToast,
}) => {
  const [hoveredMemory, setHoveredMemory] = useState<HoveredMemoryState | null>(null);
  const [customYoji, setCustomYoji] = useState<{
    monthKey: string;
    yojijukugo: YojijukugoMonthlySummary;
    wishJa: string;
    wishVi: string;
  } | null>(null);
  const [isRefreshingYoji, setIsRefreshingYoji] = useState<boolean>(false);
  const [isHealingLofiPlaying, setIsHealingLofiPlaying] = useState<boolean>(false);
  const [healingStatus, setHealingStatus] = useState(() =>
    srsVaultService.getHealingPacingStatus()
  );

  const monthKey = `${summary.year}-${summary.month}`;
  const activeYojijukugo =
    customYoji && customYoji.monthKey === monthKey ? customYoji.yojijukugo : summary.yojijukugo;
  const activeWishJa =
    customYoji && customYoji.monthKey === monthKey
      ? customYoji.wishJa
      : summary.healingPrescription.omoiyariWishJa;
  const activeWishVi =
    customYoji && customYoji.monthKey === monthKey
      ? customYoji.wishVi
      : summary.healingPrescription.omoiyariWishVi;

  // Automatically engage gentle FSRS 3-day pressure reduction when heavy/melancholy mood dominates
  useEffect(() => {
    if (summary.healingPrescription.needsHealing) {
      const current = srsVaultService.getHealingPacingStatus();
      if (!current.active) {
        const res = srsVaultService.applyGentleHealingPacing(2);
        if (res.applied) {
          setHealingStatus(srsVaultService.getHealingPacingStatus());
          onFSRSChanged();
        }
      } else {
        setHealingStatus(current);
      }
    }
  }, [summary.healingPrescription.needsHealing, monthKey]);

  // Dismiss hover card smoothly on scroll or resize so it never overlaps weirdly
  useEffect(() => {
    const clearHover = () => setHoveredMemory(null);
    window.addEventListener('scroll', clearHover, { passive: true });
    window.addEventListener('resize', clearHover, { passive: true });
    return () => {
      window.removeEventListener('scroll', clearHover);
      window.removeEventListener('resize', clearHover);
    };
  }, []);

  const showFloatingMemory = (
    e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>,
    cell: MoodDayCell
  ) => {
    if (!cell.entry) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cardWidth = Math.min(330, window.innerWidth - 32);
    const rawLeft = rect.left + rect.width / 2 - cardWidth / 2;
    const clampedLeft = Math.max(16, Math.min(rawLeft, window.innerWidth - cardWidth - 16));
    const placeAbove = rect.top > 260;
    const top = placeAbove ? rect.top - 12 : rect.bottom + 12;

    setHoveredMemory({
      cell,
      left: clampedLeft,
      top,
      placeAbove,
    });
  };

  const handleSynthesizeCustomYoji = async () => {
    setIsRefreshingYoji(true);
    try {
      const res = await generateCustomMonthlyYojijukugo(entries, summary);
      setCustomYoji({
        monthKey,
        yojijukugo: res.yojijukugo,
        wishJa: res.wishJa,
        wishVi: res.wishVi,
      });
      speechService.playSuccessSound();
      onToast(`AI đã đúc kết tháng bằng thành ngữ「${res.yojijukugo.idiom}」!`);
    } catch (err: unknown) {
      onToast(err instanceof Error ? err.message : 'Chưa thể kết nối AI đúc kết lúc này.');
    } finally {
      setIsRefreshingYoji(false);
    }
  };

  const handleToggleHealingAudio = () => {
    if (isHealingLofiPlaying) {
      zenAudioRadio.stopAmbience();
      setIsHealingLofiPlaying(false);
      return;
    }
    zenAudioRadio.startAmbience(summary.healingPrescription.recommendedAmbience, 0.36);
    setIsHealingLofiPlaying(true);
    onToast('Đang phát giai điệu Thiền Lofi xoa dịu tâm trí...');
  };

  const handleActivateGentleFsrs = () => {
    const res = srsVaultService.applyGentleHealingPacing(2);
    setHealingStatus(srsVaultService.getHealingPacingStatus());
    onFSRSChanged();
    speechService.playSuccessSound();
    onToast(
      res.deferredCount > 0
        ? `Đã giảm tải FSRS 3 ngày tới: từ ${res.previousDueCount} xuống còn ${res.newDueCount} thẻ nhẹ/ngày.`
        : 'Đã kích hoạt nhịp độ FSRS dịu nhẹ (tối đa 2 thẻ/ngày trong 3 ngày tới).'
    );
  };

  const handleRestoreFsrs = () => {
    srsVaultService.restoreFromHealingPacing();
    setHealingStatus(srsVaultService.getHealingPacingStatus());
    onFSRSChanged();
    onToast('Đã khôi phục lịch ôn tập FSRS đầy đủ ban đầu.');
  };

  const mutedText = isSepia ? 'text-[#6E6051]' : 'text-slate-400';
  const headingText = isSepia ? 'text-[#211A13]' : 'text-white';
  const bodyText = isSepia ? 'text-[#3A2F24]' : 'text-slate-200';
  const ghostBtn = isSepia
    ? 'bg-[#F3E9D8]/85 hover:bg-[#EAE0CE] text-[#3A2F24] border-[#DFD0B8]/70'
    : 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border-white/10';

  const wairoDominantPill = useMemo(
    () => getWairoTileAppearance(summary.dominantWairo, isSepia),
    [summary.dominantWairo, isSepia]
  );

  return (
    <div
      className={`relative rounded-3xl backdrop-blur-2xl bg-gradient-to-br p-6 sm:p-8 space-y-7 transition-colors duration-300 ${getDominantBackdropWash(
        summary.dominantWairo,
        isSepia
      )} ${
        isSepia
          ? 'shadow-[0_24px_60px_-24px_rgba(92,62,32,0.18)] ring-1 ring-[#DFD0B8]/60'
          : 'shadow-[0_28px_70px_-24px_rgba(2,6,23,0.9)] ring-1 ring-white/10'
      }`}
    >
      {/* 1. TOP CROWN: YOJIJUKUGO CALLIGRAPHY SUMMATION & MONTH SWITCHER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 min-w-0">
          {/* Crown Yojijukugo Seal */}
          <div
            className={`px-5 py-4 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center shrink-0 ${wairoDominantPill}`}
          >
            <div lang="ja" className="font-gyosho text-3xl sm:text-4xl tracking-[0.18em] leading-none">
              {activeYojijukugo.idiom}
            </div>
            <div className="text-[11px] font-jp opacity-85 mt-1.5 tracking-wide">
              {activeYojijukugo.reading} · {activeYojijukugo.sinoVietnamese}
            </div>
          </div>

          <div className="space-y-1.5 min-w-0">
            <div className={`text-xs font-mono ${mutedText}`}>
              Lịch Thiền Định Koyomi · {summary.monthLabel} ({summary.monthLabelVi})
            </div>
            <h3 className={`text-base sm:text-lg font-bold leading-snug ${headingText}`}>
              {activeYojijukugo.toneSummary}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${bodyText}`}>
              {activeYojijukugo.meaningVi}
            </p>
          </div>
        </div>

        {/* Month Navigation + AI Yojijukugo Re-synthesis */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSynthesizeCustomYoji}
            disabled={isRefreshingYoji}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors disabled:opacity-60 ${ghostBtn}`}
          >
            {isRefreshingYoji ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>AI Đúc Kết Thành Ngữ</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onShiftMonth(-1)}
              className={`p-2 rounded-xl border cursor-pointer transition-colors ${ghostBtn}`}
              aria-label="Tháng trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span
              lang="ja"
              className={`text-xs sm:text-sm font-mincho font-bold min-w-[92px] text-center tabular-nums ${headingText}`}
            >
              {summary.monthLabel}
            </span>
            <button
              type="button"
              onClick={() => onShiftMonth(1)}
              className={`p-2 rounded-xl border cursor-pointer transition-colors ${ghostBtn}`}
              aria-label="Tháng sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* WAIRO SPECTRUM LEGEND (Quiet unboxed color spectrum guide) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          {WAIRO_LEGEND.map((item) => (
            <div key={item.family} className="inline-flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full shrink-0 ${getWairoSwatchDot(item.family, isSepia)}`}
              />
              <span lang="ja" className={`font-gyosho text-sm ${headingText}`}>
                {item.kanjiSample}
              </span>
              <span className={mutedText}>
                {item.wairoName} · {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Monthly Kanji Frequency Tally */}
        {summary.kanjiTally.length > 0 && (
          <div className={`text-xs font-mono tabular-nums ${mutedText}`}>
            {summary.kanjiTally
              .map((t) => `${t.tag.kanji}(${t.tag.sinoVietnamese}) ×${t.count}`)
              .join('  ·  ')}
          </div>
        )}
      </div>

      {/* 2. ZEN KOYOMI BORDERLESS FLOATING HEATMAP GRID */}
      <div className="space-y-2.5">
        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {WEEKDAY_KANJI_HEADERS.map((wd) => (
            <div key={wd.short} className={`text-xs py-1 flex items-center justify-center gap-1 ${mutedText}`}>
              <span lang="ja" className="font-mincho font-semibold">
                {wd.ja}
              </span>
              <span className="text-[10px] opacity-75">({wd.short})</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {Array.from({ length: summary.leadingEmptyCells }).map((_, idx) => (
            <div key={`empty_${idx}`} className="h-16 sm:h-20 rounded-2xl opacity-0 pointer-events-none" />
          ))}

          {summary.days.map((cell) => {
            const entry = cell.entry;
            const mk = entry?.moodKanji;
            const isSelected = Boolean(entry && activeEntryId === entry.id);

            if (!entry || !mk) {
              return (
                <div
                  key={cell.day}
                  className={`h-16 sm:h-20 rounded-2xl p-2 flex flex-col items-center justify-between transition-colors ${
                    isSepia
                      ? 'bg-[#EFE6D7]/45 text-[#8E7D6B]'
                      : 'bg-white/[0.025] text-slate-600'
                  }`}
                >
                  <span className="text-[11px] font-mono tabular-nums self-start opacity-75">
                    {cell.day}
                  </span>
                  <span className="text-xs opacity-25 mb-1">·</span>
                </div>
              );
            }

            return (
              <button
                key={cell.day}
                type="button"
                onMouseEnter={(e) => showFloatingMemory(e, cell)}
                onMouseLeave={() => setHoveredMemory(null)}
                onFocus={(e) => showFloatingMemory(e, cell)}
                onBlur={() => setHoveredMemory(null)}
                onClick={() => {
                  setHoveredMemory(null);
                  onSelectEntry(entry);
                }}
                className={`group relative h-16 sm:h-20 rounded-2xl p-2 flex flex-col items-center justify-between cursor-pointer transition-all duration-100 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${getWairoTileAppearance(
                  mk.wairoFamily,
                  isSepia
                )} ${
                  isSelected
                    ? isSepia
                      ? 'ring-2 ring-[#7A4B2A] scale-[1.02]'
                      : 'ring-2 ring-white/75 scale-[1.02]'
                    : ''
                }`}
                aria-label={`Ngày ${cell.dateStr}: ${mk.kanji} (${mk.sinoVietnamese}) - ${entry.japaneseTitle}`}
              >
                <div className="w-full flex items-center justify-between text-[10px] font-mono tabular-nums opacity-80">
                  <span>{cell.day}</span>
                  <span className="hidden sm:inline tracking-tight">{mk.sinoVietnamese}</span>
                </div>

                {/* Centerpiece Gyosho Brush Calligraphy Kanji */}
                <span
                  lang="ja"
                  className="font-gyosho text-2xl sm:text-3xl leading-none mb-0.5 transition-transform duration-100 group-hover:scale-110"
                >
                  {mk.kanji}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ZERO-LATENCY 0.1s TIME-TRAVEL HOVER POP-UP CARD (VIEWPORT CLAMPED) */}
      {hoveredMemory && hoveredMemory.cell.entry && (
        <div
          role="tooltip"
          style={{
            left: `${hoveredMemory.left}px`,
            top: `${hoveredMemory.top}px`,
            transform: hoveredMemory.placeAbove ? 'translateY(-100%)' : 'translateY(0)',
            width: 'min(330px, calc(100vw - 32px))',
          }}
          className={`fixed z-50 pointer-events-none rounded-2xl backdrop-blur-2xl p-4 sm:p-5 space-y-3 transition-all duration-100 ${
            isSepia
              ? 'bg-[#FCF8F0]/95 text-[#2C241B] shadow-[0_24px_48px_-12px_rgba(62,40,18,0.28)] ring-1 ring-[#D5C2A5]'
              : 'bg-[#0b1326]/95 text-slate-100 shadow-[0_24px_54px_-12px_rgba(0,0,0,0.85)] ring-1 ring-white/15'
          }`}
        >
          {/* Item (1): Mood Kanji + Furigana */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${getWairoTileAppearance(
                  hoveredMemory.cell.entry.moodKanji.wairoFamily,
                  isSepia
                )}`}
              >
                <span lang="ja" className="font-gyosho text-2xl leading-none">
                  {hoveredMemory.cell.entry.moodKanji.kanji}
                </span>
              </div>
              <div>
                <div className={`text-xs font-bold ${headingText}`}>
                  <span lang="ja" className="font-jp">
                    {hoveredMemory.cell.entry.moodKanji.reading}
                  </span>{' '}
                  · {hoveredMemory.cell.entry.moodKanji.sinoVietnamese}
                </div>
                <div className={`text-[11px] font-mono ${mutedText}`}>
                  {hoveredMemory.cell.entry.dateLabelJa}
                </div>
              </div>
            </div>
          </div>

          {/* Item (2): AI Haiku for that day */}
          <div
            className={`rounded-xl p-3 space-y-1 ${
              isSepia ? 'bg-[#F3E9D8]/75' : 'bg-white/[0.05]'
            }`}
          >
            <div className={`text-[10px] font-mono ${mutedText}`}>Haiku ngày hôm ấy</div>
            <div lang="ja" className={`font-mincho text-sm leading-relaxed space-y-0.5 ${headingText}`}>
              {hoveredMemory.cell.entry.haiku.lines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            <div className={`text-[11px] italic pt-0.5 ${mutedText}`}>
              {hoveredMemory.cell.entry.haiku.vietnamese}
            </div>
          </div>

          {/* Item (3): Most Poignant Quote from the diary */}
          <div className="space-y-1">
            <div className={`text-[10px] font-mono ${mutedText}`}>Câu đọng lại</div>
            <p lang="ja" className={`text-xs font-mincho font-semibold leading-relaxed ${headingText}`}>
              「{hoveredMemory.cell.entry.bestQuote.japanese}」
            </p>
            <p className={`text-[11px] leading-snug ${bodyText}`}>
              {hoveredMemory.cell.entry.bestQuote.vietnamese}
            </p>
          </div>
        </div>
      )}

      {/* 4. ENERGY TRANSFORMATION & AI HEALING PRESCRIPTION SANCTUARY */}
      <div
        className={`rounded-2xl backdrop-blur-xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 ${
          isSepia
            ? 'bg-[#F3E9D8]/70 ring-1 ring-[#DFCEB4]'
            : 'bg-white/[0.04] ring-1 ring-white/10'
        }`}
      >
        <div className="space-y-2.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <HeartHandshake
              className={`w-4 h-4 shrink-0 ${
                summary.healingPrescription.needsHealing
                  ? isSepia
                    ? 'text-[#7A4B2A]'
                    : 'text-rose-300'
                  : isSepia
                  ? 'text-emerald-800'
                  : 'text-emerald-400'
              }`}
            />
            <span className={`text-xs sm:text-sm font-bold ${headingText}`}>
              AI Kê Đơn Chữa Lành · {summary.healingPrescription.titleVi}
            </span>
          </div>

          <div className="space-y-1">
            <p lang="ja" className={`font-mincho text-sm sm:text-base font-medium ${headingText}`}>
              {activeWishJa}
            </p>
            <p className={`text-xs sm:text-sm leading-relaxed ${bodyText}`}>
              {activeWishVi}
            </p>
          </div>

          <div className={`flex flex-wrap items-center gap-2 text-xs ${mutedText}`}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>
              {healingStatus.active
                ? `Đang bật Chế độ FSRS Dịu Nhẹ (3 ngày): giữ tối đa 2 thẻ/ngày · Hiện còn ${healingStatus.newDueCount} thẻ cần ôn (đã giãn ${healingStatus.deferredCount} thẻ để giảm áp lực).`
                : summary.healingPrescription.fsrsActionNote}
            </span>
          </div>
        </div>

        {/* Action Controls: Pinned Zen Lofi Reset + FSRS Gentle Load Toggle */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => speechService.speak(activeWishJa, 0.88)}
            className={`px-3 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${ghostBtn}`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Nghe lời chúc</span>
          </button>

          <button
            type="button"
            onClick={handleToggleHealingAudio}
            className={`px-3.5 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              isHealingLofiPlaying
                ? 'bg-rose-600 border-rose-500 text-white'
                : isSepia
                ? 'bg-[#7A4B2A] hover:bg-[#653C1F] border-[#7A4B2A] text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white'
            }`}
          >
            {isHealingLofiPlaying ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Tắt Nhạc Reset</span>
              </>
            ) : (
              <>
                <Music2 className="w-3.5 h-3.5" />
                <span>Phát Lofi Thiền Reset</span>
              </>
            )}
          </button>

          {healingStatus.active ? (
            <button
              type="button"
              onClick={handleRestoreFsrs}
              className={`px-3 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${ghostBtn}`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục lịch FSRS</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleActivateGentleFsrs}
              className={`px-3 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${ghostBtn}`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Giảm tải FSRS 3 ngày</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
