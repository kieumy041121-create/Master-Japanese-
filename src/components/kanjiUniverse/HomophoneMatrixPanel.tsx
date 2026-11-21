import React, { useEffect, useState } from 'react';
import {
  ShieldAlert,
  Volume2,
  Bookmark,
  BookmarkCheck,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Plus,
  ChevronUp,
} from 'lucide-react';
import { JLPTLevel } from '../../types';
import {
  HomophoneMatrixEntry,
  HomophoneResolutionCluster,
  HomophoneVisualIcon,
} from '../../services/kanjiOmniverseEngine';
import { speechService } from '../../services/speechService';
import { srsVaultService } from '../../services/srsVaultService';

interface HomophoneMatrixPanelProps {
  cluster: HomophoneResolutionCluster;
  activeChar: string;
  jlptFilter?: JLPTLevel | 'ALL';
  onSelectKanji: (char: string) => void;
  onTriggerHomophoneSearch: (romajiOrKanji: string) => void;
  onSrsMutated: () => void;
}

const CLASSIC_HOMOPHONE_PRESETS = [
  { key: 'hakaru', label: 'はかる (Hakaru)' },
  { key: 'au', label: 'あう (Au)' },
  { key: 'tsutomeru', label: 'つとめる (Tsutomeru)' },
  { key: 'miru', label: 'みる (Miru)' },
  { key: 'kiku', label: 'きく (Kiku)' },
  { key: 'naosu', label: 'なおす (Naosu)' },
];

const HomophoneSceneSvg: React.FC<{ icon: HomophoneVisualIcon }> = ({ icon }) => {
  const common = {
    viewBox: '0 0 48 48',
    className: 'w-9 h-9 shrink-0',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (icon) {
    case 'ruler':
      return (
        <svg {...common}>
          <rect x="6" y="16" width="36" height="14" rx="2" className="text-sky-400" />
          <path d="M13 16v6M20 16v4M27 16v6M34 16v4" className="text-sky-300" />
          <path d="M8 37c4-2 8 2 12 0s8 2 12 0 6 2 8 0" className="text-cyan-400" />
        </svg>
      );
    case 'thermometer':
      return (
        <svg {...common}>
          <path d="M24 8v20" className="text-amber-400" />
          <rect x="19" y="6" width="10" height="24" rx="5" className="text-slate-300" />
          <circle cx="24" cy="34" r="6" className="text-rose-400" />
          <path d="M32 13h6M32 19h4M32 25h6" className="text-amber-300" />
        </svg>
      );
    case 'scale':
      return (
        <svg {...common}>
          <path d="M24 9v28M14 37h20M10 17h28" className="text-emerald-400" />
          <path d="M10 17l-4 11h8l-4-11zM38 17l-4 11h8l-4-11z" className="text-emerald-300" />
        </svg>
      );
    case 'blueprint':
      return (
        <svg {...common}>
          <rect x="7" y="9" width="34" height="30" rx="3" className="text-indigo-400" />
          <path d="M14 29l7-8 6 5 8-9" className="text-emerald-400" />
          <path d="M31 17h4v4" className="text-emerald-400" />
        </svg>
      );
    case 'scheme':
      return (
        <svg {...common}>
          <path d="M24 7l15 9v16l-15 9-15-9V16z" className="text-rose-400" />
          <path d="M17 22l7 4 7-4M24 26v9" className="text-rose-300" />
        </svg>
      );
    case 'handshake':
      return (
        <svg {...common}>
          <path d="M8 22l8-7 8 5 8-5 8 7" className="text-indigo-400" />
          <path d="M14 27l7 6c2 2 4 2 6 0l7-6" className="text-indigo-300" />
        </svg>
      );
    case 'puzzle':
      return (
        <svg {...common}>
          <path d="M10 16h9a4 4 0 0 1 8 0h9v18H10z" className="text-emerald-400" />
          <circle cx="23" cy="25" r="3" className="text-emerald-300" />
        </svg>
      );
    case 'lantern':
      return (
        <svg {...common}>
          <path d="M24 6v4M17 10h14M16 36h16" className="text-amber-400" />
          <ellipse cx="24" cy="23" rx="10" ry="12" className="text-rose-400" />
          <path d="M15 20h18M15 26h18" className="text-amber-300" />
        </svg>
      );
    case 'lightning':
      return (
        <svg {...common}>
          <path d="M27 7L12 26h11l-2 15 15-19H25z" className="text-amber-400" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg {...common}>
          <rect x="8" y="15" width="32" height="23" rx="3" className="text-indigo-400" />
          <path d="M18 15v-4h12v4M8 24h32" className="text-indigo-300" />
        </svg>
      );
    case 'flame':
      return (
        <svg {...common}>
          <path
            d="M24 8c5 7 11 12 11 20a11 11 0 1 1-22 0c0-5 3-10 7-13 0 4 2 6 4 6 0-5 0-9 0-13z"
            className="text-amber-400"
          />
        </svg>
      );
    case 'pillar':
      return (
        <svg {...common}>
          <path d="M10 12h28M12 38h24M17 12v26M24 12v26M31 12v26" className="text-cyan-400" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...common}>
          <path d="M6 24s7-11 18-11 18 11 18 11-7 11-18 11S6 24 6 24z" className="text-sky-400" />
          <circle cx="24" cy="24" r="5" className="text-sky-300" />
        </svg>
      );
    case 'stethoscope':
      return (
        <svg {...common}>
          <path d="M14 9v10a10 10 0 0 0 20 0V9" className="text-emerald-400" />
          <path d="M24 29v5a6 6 0 0 0 12 0v-6" className="text-emerald-300" />
          <circle cx="36" cy="25" r="3" className="text-rose-400" />
        </svg>
      );
    case 'camera':
      return (
        <svg {...common}>
          <rect x="7" y="13" width="34" height="24" rx="3" className="text-purple-400" />
          <path d="M21 20l9 5-9 5z" className="text-purple-300" />
        </svg>
      );
    case 'nurse':
      return (
        <svg {...common}>
          <rect x="9" y="10" width="30" height="28" rx="4" className="text-rose-400" />
          <path d="M24 16v16M16 24h16" className="text-rose-300" />
        </svg>
      );
    case 'binocular':
      return (
        <svg {...common}>
          <circle cx="15" cy="28" r="7" className="text-cyan-400" />
          <circle cx="33" cy="28" r="7" className="text-cyan-400" />
          <path d="M15 21l3-9h4M33 21l-3-9h-4M21 24h6" className="text-cyan-300" />
        </svg>
      );
    case 'ear':
      return (
        <svg {...common}>
          <path
            d="M17 19a9 9 0 1 1 16 6c-2 3-4 4-4 8a4 4 0 0 1-8 0"
            className="text-sky-400"
          />
          <path d="M21 20a4 4 0 0 1 7 2" className="text-sky-300" />
        </svg>
      );
    case 'music':
      return (
        <svg {...common}>
          <path d="M18 33V12l18-3v21" className="text-indigo-400" />
          <circle cx="14" cy="34" r="4" className="text-indigo-300" />
          <circle cx="32" cy="31" r="4" className="text-indigo-300" />
        </svg>
      );
    case 'medicine':
      return (
        <svg {...common}>
          <rect x="11" y="17" width="26" height="14" rx="7" transform="rotate(-35 24 24)" className="text-emerald-400" />
          <path d="M20 19l8 10" className="text-emerald-200" />
        </svg>
      );
    case 'wrench':
      return (
        <svg {...common}>
          <path
            d="M31 11a7 7 0 0 0-9 9l-11 11a3 3 0 0 0 4 4l11-11a7 7 0 0 0 9-9l-4 4-4-4z"
            className="text-amber-400"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="15" className="text-indigo-400" />
          <path d="M29 19l-4 10-10 4 4-10z" className="text-amber-300" />
        </svg>
      );
  }
};

export const HomophoneMatrixPanel: React.FC<HomophoneMatrixPanelProps> = ({
  cluster,
  activeChar,
  jlptFilter = 'ALL',
  onSelectKanji,
  onTriggerHomophoneSearch,
  onSrsMutated,
}) => {
  const isAdvancedFilter = jlptFilter === 'N2' || jlptFilter === 'N1';
  const [showAdvanced, setShowAdvanced] = useState<boolean>(isAdvancedFilter);

  useEffect(() => {
    setShowAdvanced(jlptFilter === 'N2' || jlptFilter === 'N1');
  }, [cluster.clusterId, jlptFilter]);

  const coreEntries = cluster.entries.filter(
    (e) => e.tier === 'core' || e.baseKanji === activeChar
  );
  const advancedEntries = cluster.entries.filter(
    (e) => e.tier === 'advanced' && e.baseKanji !== activeChar
  );

  // Fallback: if cluster happens to have only advanced entries, reveal them by default
  const effectiveCore = coreEntries.length > 0 ? coreEntries : cluster.entries;
  const visibleEntries = showAdvanced ? cluster.entries : effectiveCore;
  const hiddenCount = showAdvanced ? 0 : advancedEntries.length;

  const handleBookmarkEntry = (entry: HomophoneMatrixEntry) => {
    srsVaultService.toggleBookmark({
      japanese: entry.word,
      reading: `${entry.reading} (${entry.romaji})`,
      vietnamese: `[${entry.sinoVietnamese}] ${entry.coreNuance} — Chuẩn: ${entry.collocationDo.phrase} / Tránh: ${entry.collocationDont.phrase}`,
      type: 'vocab',
      level: entry.jlpt,
      contextSentence: entry.exampleJa,
      contextTranslation: entry.exampleVi,
      source: `Ma trận Đồng âm · ${cluster.readingBadge}`,
      tags: ['Homophone Matrix', entry.jlpt, entry.romaji],
    });
    speechService.playSuccessSound();
    onSrsMutated();
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5 sm:p-7 space-y-6">
      {/* Header + Preset Killer Homophone Cluster Switchers */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <h3 className="text-base sm:text-lg font-semibold text-white">
              {cluster.title}
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            {cluster.summaryWarning}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {CLASSIC_HOMOPHONE_PRESETS.map((preset) => {
            const isActive = cluster.clusterId === preset.key;
            return (
              <button
                key={preset.key}
                type="button"
                onClick={() => onTriggerHomophoneSearch(preset.key)}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-indigo-600/25 border-indigo-400 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tier Status Line */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <span>
          {showAdvanced
            ? `Đang hiển thị đầy đủ ${visibleEntries.length} sắc thái (N5–N1)`
            : `Đang ưu tiên ${visibleEntries.length} thẻ cốt lõi (N5–N3) để não bộ phân tách rõ ràng`}
        </span>
        {advancedEntries.length > 0 && (
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="text-indigo-300 hover:text-indigo-200 font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            {showAdvanced ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Thu gọn sắc thái cao cấp (N2–N1)</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Mở rộng {hiddenCount} sắc thái cao cấp (N2–N1)</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Split-Card Zen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {visibleEntries.map((entry) => {
          const isCurrent = entry.baseKanji === activeChar;
          const isSaved = srsVaultService.isBookmarked(entry.word);

          return (
            <article
              key={`${entry.word}_${entry.sinoVietnamese}`}
              className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-colors ${
                isCurrent
                  ? 'border-indigo-500/75 bg-indigo-950/20'
                  : 'border-slate-800 bg-[#070b14] hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                {/* 1. Quiet Unboxed Metadata + Audio/Bookmark Controls */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl border border-slate-800 bg-slate-900/90 flex items-center justify-center shrink-0">
                      <HomophoneSceneSvg icon={entry.visualIcon} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono text-slate-400 truncate">
                        {entry.sinoVietnamese} · {entry.jlpt} · {entry.visualCaption}
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => onSelectKanji(entry.baseKanji)}
                          className="text-3xl font-mincho font-bold text-white hover:text-indigo-300 transition-colors cursor-pointer leading-none"
                          title={`Mổ xẻ chữ ${entry.baseKanji}`}
                        >
                          {entry.word}
                        </button>
                        <span className="text-xs font-jp text-indigo-300">{entry.reading}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => speechService.speak(entry.word)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                      aria-label={`Nghe phát âm ${entry.word}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBookmarkEntry(entry)}
                      className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                        isSaved
                          ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-600/50'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                      aria-label={`Lưu ${entry.word} vào FSRS`}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* 2. Bold Core Vietnamese Nuance */}
                <div className="text-base font-bold text-white leading-snug">
                  {entry.coreNuance}
                </div>

                {/* 3. Radical-Based Decoding Logic (1 crisp line anchored to radical) */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 space-y-1">
                  <div className="text-[11px] font-semibold text-cyan-300">
                    Logic Bộ Thủ: {entry.radicalKey}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {entry.radicalDecode}
                  </p>
                </div>

                {/* 4. Visual Do (O) / Don't (X) Collocation Anchors */}
                <div className="space-y-2 text-xs">
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/25 px-3 py-2 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="min-w-0 leading-snug">
                      <span className="font-semibold text-emerald-300">(O) Chuẩn: </span>
                      <span className="font-jp font-semibold text-white">
                        {entry.collocationDo.phrase}
                      </span>
                      <span className="text-slate-300"> — {entry.collocationDo.meaning}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-rose-500/40 bg-rose-950/25 px-3 py-2 flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="min-w-0 leading-snug">
                      <span className="font-semibold text-rose-300">(X) Bẫy: </span>
                      <span className="font-jp font-semibold text-rose-100 line-through decoration-rose-400/80">
                        {entry.collocationDont.phrase}
                      </span>
                      <span className="text-rose-200/90"> — {entry.collocationDont.reason}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Quiet Example Footer + Deep Jump */}
              <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-jp text-slate-200">{entry.exampleJa}</span>
                  <button
                    type="button"
                    onClick={() => speechService.speak(entry.exampleJa)}
                    className="text-slate-400 hover:text-indigo-300 shrink-0 cursor-pointer"
                    aria-label="Nghe ví dụ"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-slate-400">{entry.exampleVi}</div>
                {!isCurrent && (
                  <button
                    type="button"
                    onClick={() => onSelectKanji(entry.baseKanji)}
                    className="text-[11px] font-medium text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    <span>Mổ xẻ chữ【{entry.baseKanji}】ở Chiết tự</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Expandable Advanced N2-N1 Prompt (Calm Discovery) */}
      {!showAdvanced && hiddenCount > 0 && (
        <div className="flex justify-center pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:border-indigo-400 text-xs font-medium text-indigo-200 inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>
              Mở rộng {hiddenCount} sắc thái cao cấp (N2–N1):{' '}
              {advancedEntries.map((e) => e.word).join(' · ')}
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

