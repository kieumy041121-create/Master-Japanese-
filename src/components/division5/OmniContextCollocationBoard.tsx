import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Compass,
  Search,
  Volume2,
  Plus,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Layers,
  Zap,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { JLPTLevel } from '../../types';
import {
  CollocationLayerType,
  CollocationArsenalItem,
  OmniContextProjectionResult,
  QUICK_CONTEXT_PRESETS,
  getInstantPredictiveSeed,
  buildInstantPredictiveDraft,
  projectCollocationContextParallel,
  prefetchCollocationContext,
  expandSingleLayerDeepDive,
  expandCollocationContextDeepDive,
  splitJapaneseMoras,
  normalizePitchPattern,
} from '../../services/omniContextCollocationService';
import { speechService } from '../../services/speechService';

interface Props {
  currentLevel?: JLPTLevel;
  initialContext?: string;
  onAskAiSensei?: (query: string) => void;
  compactHeader?: boolean;
}

function normalizeDedupKey(text: string): string {
  return text.replace(/\s+/g, '').toLowerCase();
}

/**
 * Renders a crisp, zero-clutter NHK-style Japanese Pitch Accent contour
 * (High bar / Low bar + drop step indicator) aligned directly above each mora.
 */
const PitchAccentContour: React.FC<{
  furigana: string;
  pitchPattern: ('H' | 'L')[];
  pitchCode: string;
}> = ({ furigana, pitchPattern, pitchCode }) => {
  const moras = useMemo(() => splitJapaneseMoras(furigana), [furigana]);
  const pattern = useMemo(
    () => normalizePitchPattern(furigana, pitchPattern, pitchCode),
    [furigana, pitchPattern, pitchCode]
  );

  if (moras.length === 0) return null;

  const isCompactMode = moras.length > 15;

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-400">
        <span className="font-medium text-sky-400">Trọng âm Tokyo</span>
        <span aria-hidden="true">·</span>
        <span className="font-mono tabular-nums text-slate-300">{pitchCode}</span>
      </div>

      {!isCompactMode ? (
        <div className="flex flex-wrap items-end gap-0.5 pt-1 overflow-x-auto pb-0.5">
          {moras.map((mora, idx) => {
            const pitch = pattern[idx] || 'L';
            const nextPitch = pattern[idx + 1];
            const isDrop = pitch === 'H' && nextPitch === 'L';
            const isRise = pitch === 'L' && nextPitch === 'H';

            return (
              <div key={`${mora}_${idx}`} className="flex items-end">
                <div className="flex flex-col items-center min-w-[1.25rem]">
                  <div className="w-full h-3.5 relative flex items-center justify-center">
                    <div
                      className={`w-full h-[2px] rounded-full transition-colors ${
                        pitch === 'H'
                          ? 'bg-sky-400 -translate-y-1.5'
                          : 'bg-slate-600 translate-y-1.5'
                      }`}
                    />
                  </div>
                  <span className="text-[11px] font-jp text-slate-300 leading-none pt-0.5">
                    {mora}
                  </span>
                </div>
                {(isDrop || isRise) && (
                  <div
                    className={`w-[1.5px] h-3 mb-3.5 ${
                      isDrop ? 'bg-rose-400/90' : 'bg-sky-400/70'
                    }`}
                    title={isDrop ? 'Điểm rơi cao độ (アクセント核)' : 'Điểm lên giọng'}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-1 pt-0.5 text-[11px] font-mono text-slate-300">
          {moras.map((mora, idx) => {
            const pitch = pattern[idx] || 'L';
            const nextPitch = pattern[idx + 1];
            const isDrop = pitch === 'H' && nextPitch === 'L';
            return (
              <span
                key={`${mora}_${idx}`}
                className={
                  pitch === 'H'
                    ? 'border-t-2 border-sky-400 pt-0.5 text-slate-100'
                    : 'border-b border-slate-600 pb-0.5 text-slate-400'
                }
              >
                {mora}
                {isDrop ? <span className="text-rose-400 font-bold">┐</span> : ''}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface ArsenalCardProps {
  item: CollocationArsenalItem;
  index: number;
  showNuanceDetails: boolean;
}

const ArsenalItemCard: React.FC<ArsenalCardProps> = ({ item, index, showNuanceDetails }) => {
  return (
    <div className="bg-slate-950/75 border border-slate-800/90 hover:border-slate-700 rounded-xl p-4 sm:p-5 transition-colors space-y-3.5">
      {/* Top Row: Index + Kanji + Furigana + Audio */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-xs text-slate-400">
            <span className="font-mono tabular-nums text-sky-400 font-semibold">
              {String(index + 1).padStart(2, '0')}.
            </span>
            <span className="font-mono text-slate-400">{item.romaji}</span>
            {item.subAngleLabel && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400 truncate max-w-[260px]">{item.subAngleLabel}</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-0.5">
            <h4 className="text-lg sm:text-xl font-bold text-white font-jp tracking-tight">
              {item.kanji}
            </h4>
            <span className="text-sm font-jp text-sky-300">{item.furigana}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => speechService.speakJapanese(item.kanji)}
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-300 hover:text-white transition-colors shrink-0 cursor-pointer"
          title="Nghe phát âm chuẩn Tokyo"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Meaning in Refined Vietnamese */}
      <div className="text-sm sm:text-base font-semibold text-emerald-300 leading-snug">
        {item.meaningVn}
      </div>

      {/* Pitch Accent Diagram */}
      <div className="pt-2 border-t border-slate-800/70">
        <PitchAccentContour
          furigana={item.furigana}
          pitchPattern={item.pitchPattern}
          pitchCode={item.pitchCode}
        />
      </div>

      {/* Short Contextual Example */}
      <div className="pt-2.5 border-t border-slate-800/70 space-y-1.5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5 min-w-0">
            <div className="text-sm font-medium text-slate-100 font-jp leading-relaxed">
              {item.exampleJp}
            </div>
            <div className="text-xs font-jp text-slate-400 leading-relaxed">
              {item.exampleFurigana}
            </div>
          </div>
          <button
            type="button"
            onClick={() => speechService.speakJapanese(item.exampleJp)}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-slate-400 hover:text-sky-300 transition-colors shrink-0 cursor-pointer"
            title="Nghe câu ví dụ"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {item.exampleVn}
        </div>
      </div>

      {/* Optional Native Nuance Note */}
      {showNuanceDetails && item.nativeNuance && (
        <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-400 leading-relaxed">
          <span className="font-semibold text-slate-300">Sắc thái bản xứ: </span>
          {item.nativeNuance}
        </div>
      )}
    </div>
  );
};

export const OmniContextCollocationBoard: React.FC<Props> = ({
  currentLevel = 'N2',
  initialContext = 'Đi chợ',
  onAskAiSensei,
  compactHeader = false,
}) => {
  const [contextInput, setContextInput] = useState(initialContext);
  const [projection, setProjection] = useState<OmniContextProjectionResult>(() => {
    return (
      getInstantPredictiveSeed(initialContext, currentLevel) ||
      buildInstantPredictiveDraft(initialContext, currentLevel)
    );
  });

  const [isSyncingLayers, setIsSyncingLayers] = useState<Record<CollocationLayerType, boolean>>({
    keyword: false,
    noun_phrase: false,
    verb_phrase: false,
  });

  const [expandingLayers, setExpandingLayers] = useState<Record<CollocationLayerType, boolean>>({
    keyword: false,
    noun_phrase: false,
    verb_phrase: false,
  });

  const [isExpandingAll, setIsExpandingAll] = useState(false);
  const [showNuanceDetails, setShowNuanceDetails] = useState(true);
  const [lastUnlockedNotice, setLastUnlockedNotice] = useState<string | null>(null);

  const [expandedLayers, setExpandedLayers] = useState<Record<CollocationLayerType, boolean>>({
    keyword: true,
    noun_phrase: true,
    verb_phrase: true,
  });

  const activeQueryIdRef = useRef(0);

  const handleProjectContext = useCallback(
    async (targetQuery?: string) => {
      const query = (targetQuery !== undefined ? targetQuery : contextInput).trim();
      if (!query) return;

      const reqId = ++activeQueryIdRef.current;
      setContextInput(query);
      setLastUnlockedNotice(null);
      setExpandedLayers({ keyword: true, noun_phrase: true, verb_phrase: true });

      // 1. Instant 0ms Cache / Curated Lookup (Zero Loading Spinner)
      const instant = getInstantPredictiveSeed(query, currentLevel);
      if (instant) {
        setProjection(instant);
        setIsSyncingLayers({ keyword: false, noun_phrase: false, verb_phrase: false });
        return;
      }

      // 2. Immediate 0ms Predictive Frame + Tri-Core Parallel Execution
      setProjection(buildInstantPredictiveDraft(query, currentLevel));
      setIsSyncingLayers({ keyword: true, noun_phrase: true, verb_phrase: true });

      try {
        const finalResult = await projectCollocationContextParallel(
          query,
          currentLevel,
          (partial) => {
            if (activeQueryIdRef.current !== reqId) return;
            setProjection((prev) => ({
              ...prev,
              ...partial,
              xray: partial.xray ?? prev.xray,
              keywords: partial.keywords ?? prev.keywords,
              nounPhrases: partial.nounPhrases ?? prev.nounPhrases,
              verbPhrases: partial.verbPhrases ?? prev.verbPhrases,
              unlockedAngles: partial.unlockedAngles ?? prev.unlockedAngles,
              source: 'gemini',
            }));
            setIsSyncingLayers((prev) => ({
              keyword: partial.keywords ? false : prev.keyword,
              noun_phrase: partial.nounPhrases ? false : prev.noun_phrase,
              verb_phrase: partial.verbPhrases ? false : prev.verb_phrase,
            }));
          }
        );

        if (activeQueryIdRef.current === reqId) {
          setProjection(finalResult);
          setIsSyncingLayers({ keyword: false, noun_phrase: false, verb_phrase: false });
        }
      } catch {
        if (activeQueryIdRef.current === reqId) {
          setIsSyncingLayers({ keyword: false, noun_phrase: false, verb_phrase: false });
        }
      }
    },
    [contextInput, currentLevel]
  );

  // Sync initialContext cleanly on mount if uncached
  useEffect(() => {
    const instant = getInstantPredictiveSeed(initialContext, currentLevel);
    if (!instant) {
      handleProjectContext(initialContext);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Anticipatory Predictive Prefetch while user types (180ms debounce)
  useEffect(() => {
    const trimmed = contextInput.trim();
    if (trimmed.length < 4) return;
    if (trimmed.toLowerCase() === projection.contextQuery.toLowerCase()) return;

    const timer = window.setTimeout(() => {
      prefetchCollocationContext(trimmed, currentLevel);
    }, 180);

    return () => window.clearTimeout(timer);
  }, [contextInput, currentLevel, projection.contextQuery]);

  // Independent Per-Layer "+3" Expansion Handler
  const handleExpandSingleLayer = async (layer: CollocationLayerType) => {
    if (expandingLayers[layer] || isExpandingAll) return;

    setExpandingLayers((prev) => ({ ...prev, [layer]: true }));
    try {
      const expansion = await expandSingleLayerDeepDive(projection, layer, currentLevel);

      setProjection((prev) => {
        const existingSet = new Set<string>();
        for (const item of [...prev.keywords, ...prev.nounPhrases, ...prev.verbPhrases]) {
          existingSet.add(normalizeDedupKey(item.kanji));
          existingSet.add(normalizeDedupKey(item.furigana));
        }

        const uniqueNew = expansion.items.filter((item) => {
          const kKey = normalizeDedupKey(item.kanji);
          const fKey = normalizeDedupKey(item.furigana);
          if (existingSet.has(kKey) || existingSet.has(fKey)) return false;
          existingSet.add(kKey);
          existingSet.add(fKey);
          return true;
        });

        const nextDepths = {
          ...(prev.layerDepths || {
            keyword: prev.expansionDepth,
            noun_phrase: prev.expansionDepth,
            verb_phrase: prev.expansionDepth,
          }),
          [layer]:
            (prev.layerDepths?.[layer] ?? prev.expansionDepth) + 1,
        };

        const unlockedSet = prev.unlockedAngles.includes(expansion.angleLabel)
          ? prev.unlockedAngles
          : [...prev.unlockedAngles, expansion.angleLabel];

        return {
          ...prev,
          keywords: layer === 'keyword' ? [...prev.keywords, ...uniqueNew] : prev.keywords,
          nounPhrases:
            layer === 'noun_phrase' ? [...prev.nounPhrases, ...uniqueNew] : prev.nounPhrases,
          verbPhrases:
            layer === 'verb_phrase' ? [...prev.verbPhrases, ...uniqueNew] : prev.verbPhrases,
          layerDepths: nextDepths,
          expansionDepth: Math.max(
            prev.expansionDepth,
            nextDepths.keyword,
            nextDepths.noun_phrase,
            nextDepths.verb_phrase
          ),
          unlockedAngles: unlockedSet,
        };
      });

      setExpandedLayers((prev) => ({ ...prev, [layer]: true }));

      const layerLabelVi =
        layer === 'keyword'
          ? 'Từ vựng Cốt lõi'
          : layer === 'noun_phrase'
          ? 'Cụm Danh Từ'
          : 'Cụm Động Từ & Collocations';
      setLastUnlockedNotice(
        `Đã nạp thêm +${expansion.items.length} mục mới vào [${layerLabelVi}] — ${expansion.angleLabel}`
      );
    } finally {
      setExpandingLayers((prev) => ({ ...prev, [layer]: false }));
    }
  };

  // Full 3-Pillar Parallel "+3" Expansion Handler
  const handleExpandAllDeepDive = async () => {
    if (isExpandingAll) return;
    setIsExpandingAll(true);
    setExpandingLayers({ keyword: true, noun_phrase: true, verb_phrase: true });

    try {
      const expansion = await expandCollocationContextDeepDive(projection, currentLevel);

      setProjection((prev) => {
        const existingSet = new Set<string>();
        for (const item of [...prev.keywords, ...prev.nounPhrases, ...prev.verbPhrases]) {
          existingSet.add(normalizeDedupKey(item.kanji));
          existingSet.add(normalizeDedupKey(item.furigana));
        }

        const filterUnique = (items: CollocationArsenalItem[]) =>
          items.filter((item) => {
            const kKey = normalizeDedupKey(item.kanji);
            const fKey = normalizeDedupKey(item.furigana);
            if (existingSet.has(kKey) || existingSet.has(fKey)) return false;
            existingSet.add(kKey);
            existingSet.add(fKey);
            return true;
          });

        const newK = filterUnique(expansion.newKeywords);
        const newN = filterUnique(expansion.newNounPhrases);
        const newV = filterUnique(expansion.newVerbPhrases);

        const prevDepths = prev.layerDepths || {
          keyword: prev.expansionDepth,
          noun_phrase: prev.expansionDepth,
          verb_phrase: prev.expansionDepth,
        };

        const nextDepths = {
          keyword: prevDepths.keyword + 1,
          noun_phrase: prevDepths.noun_phrase + 1,
          verb_phrase: prevDepths.verb_phrase + 1,
        };

        const unlockedSet = prev.unlockedAngles.includes(expansion.angleLabel)
          ? prev.unlockedAngles
          : [...prev.unlockedAngles, expansion.angleLabel];

        return {
          ...prev,
          keywords: [...prev.keywords, ...newK],
          nounPhrases: [...prev.nounPhrases, ...newN],
          verbPhrases: [...prev.verbPhrases, ...newV],
          layerDepths: nextDepths,
          expansionDepth: Math.max(nextDepths.keyword, nextDepths.noun_phrase, nextDepths.verb_phrase),
          unlockedAngles: unlockedSet,
        };
      });

      setExpandedLayers({ keyword: true, noun_phrase: true, verb_phrase: true });
      setLastUnlockedNotice(
        `Đã khai mở toàn cảnh ${expansion.angleLabel} (+${expansion.newKeywords.length} từ, +${expansion.newNounPhrases.length} cụm danh từ, +${expansion.newVerbPhrases.length} cụm động từ độc bản)`
      );
    } finally {
      setIsExpandingAll(false);
      setExpandingLayers({ keyword: false, noun_phrase: false, verb_phrase: false });
    }
  };

  const toggleLayer = (layer: CollocationLayerType) => {
    setExpandedLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const totalItems =
    projection.keywords.length + projection.nounPhrases.length + projection.verbPhrases.length;

  const isAnySyncing =
    isSyncingLayers.keyword || isSyncingLayers.noun_phrase || isSyncingLayers.verb_phrase;

  return (
    <div className="space-y-6">
      {/* Control Deck: Omni-Context Input + Quick Presets */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        {!compactHeader && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold">
                <Compass className="w-4 h-4" />
                <span>Động cơ Dự phóng Hoàn cảnh 360°</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400 font-normal">Chuẩn {currentLevel}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Nhập bất kỳ bối cảnh nào để tạo kho vũ khí 3 tầng tức thì
              </h3>
            </div>

            <label className="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none shrink-0">
              <input
                type="checkbox"
                checked={showNuanceDetails}
                onChange={(e) => setShowNuanceDetails(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-sky-500 focus:ring-sky-500"
              />
              <span>Hiện ghi chú sắc thái TPO</span>
            </label>
          </div>
        )}

        {/* Search / Context Input (Zero Blocking Spinners) */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={contextInput}
              onChange={(e) => setContextInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleProjectContext()}
              placeholder='Nhập bối cảnh (vd: "Đi chợ", "Đổ rác", "Đi tàu điện", "Thuyết trình báo cáo tài chính bị sếp phản bác")...'
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700/80 focus:border-sky-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={() => handleProjectContext()}
            disabled={!contextInput.trim()}
            className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Zap className="w-4 h-4" />
            <span>{isAnySyncing ? 'Đang đồng bộ 3 luồng...' : 'Dự phóng Bối cảnh'}</span>
          </button>
        </div>

        {/* Clean Preset Selector */}
        <div className="space-y-2 pt-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium mr-1">Đời sống:</span>
            {QUICK_CONTEXT_PRESETS.filter((p) => p.tier === 'daily').map((preset) => {
              const isActive =
                projection.contextQuery.toLowerCase() === preset.query.toLowerCase();
              return (
                <button
                  key={preset.query}
                  type="button"
                  onClick={() => handleProjectContext(preset.query)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}

            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">
              |
            </span>
            <span className="text-slate-400 font-medium mr-1">Tâm lý &amp; Công sở:</span>
            {QUICK_CONTEXT_PRESETS.filter((p) => p.tier === 'complex').map((preset) => {
              const isActive =
                projection.contextQuery.toLowerCase() === preset.query.toLowerCase();
              return (
                <button
                  key={preset.query}
                  type="button"
                  onClick={() => handleProjectContext(preset.query)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Projection Content (Always Instantaneous 0ms Presence) */}
      <div className="space-y-6">
        {/* 1. X-Quang Tình huống 360° */}
        <div className="bg-slate-900/75 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs text-slate-400">
                <span className="font-semibold text-sky-400">Quét X-Quang 360°</span>
                <span aria-hidden="true">·</span>
                <span>{projection.xray.complexityTier}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-slate-300">
                  {totalItems} mục đã nạp (Lớp sâu #{projection.expansionDepth})
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex flex-wrap items-baseline gap-2.5">
                <span>{projection.xray.contextTitle}</span>
                <span className="text-sm font-normal font-jp text-sky-300">
                  「{projection.xray.japaneseSceneTag}」
                </span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {onAskAiSensei && (
                <button
                  type="button"
                  onClick={() =>
                    onAskAiSensei(
                      `Sensei hãy hướng dẫn phản xạ giao tiếp thực chiến cho bối cảnh "${projection.xray.contextTitle}" theo chuẩn Từ vựng - Cụm danh từ - Cụm động từ và bẫy TPO cần tránh`
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                  <span>Hỏi AI Sensei</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleExpandAllDeepDive}
                disabled={isExpandingAll}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{isExpandingAll ? 'Đang đào sâu cả 3 mục...' : '+3 Cả 3 mục'}</span>
              </button>
            </div>
          </div>

          {/* Physical Actions & Psychological States */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">
                Hành động vật lý trong tình huống
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                {projection.xray.physicalActions.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="font-mono text-sky-400 text-xs mt-0.5">{idx + 1}.</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">
                Trạng thái tâm lý &amp; Sắc thái TPO
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                {projection.xray.psychologicalStates.map((st, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-400 font-bold mt-0.5">·</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Story Thread Summary */}
          {projection.xray.storyThreadSummary && (
            <div className="pt-3 border-t border-slate-800/70 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-white">Mạch kể chuyện thực chiến: </span>
              {projection.xray.storyThreadSummary}
            </div>
          )}

          {/* Newly Unlocked Sub-Angle Banner */}
          {lastUnlockedNotice && (
            <div className="pt-3 border-t border-slate-800/70 flex items-center gap-2 text-xs text-emerald-300 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{lastUnlockedNotice}</span>
            </div>
          )}
        </div>

        {/* 2. Tri-Layer Phrasal Arsenal with Per-Section "+3" Independent Buttons */}
        <div className="space-y-5">
          {/* LAYER 1: TỪ VỰNG CỐT LÕI (KEYWORDS) */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => toggleLayer('keyword')}
                className="flex items-center gap-3 text-left min-w-0 flex-1 cursor-pointer group"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>1. Từ vựng Cốt lõi (Keywords)</span>
                    </h3>
                    <span className="text-xs font-mono tabular-nums text-slate-400">
                      {projection.keywords.length} từ
                    </span>
                    {isSyncingLayers.keyword && (
                      <span className="text-xs text-sky-400 font-medium">
                        · Đang cập nhật luồng 1...
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    Danh từ và tính từ xương sống không thể thiếu trong bối cảnh
                  </p>
                </div>
                {expandedLayers.keyword ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleExpandSingleLayer('keyword')}
                disabled={expandingLayers.keyword || isExpandingAll}
                className="px-3.5 py-2 rounded-xl bg-sky-600/90 hover:bg-sky-500 active:scale-[0.99] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{expandingLayers.keyword ? 'Đang tải +3...' : '+3 Từ vựng'}</span>
              </button>
            </div>

            {expandedLayers.keyword && (
              <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-800/70 grid grid-cols-1 md:grid-cols-2 gap-4">
                {projection.keywords.map((item, idx) => (
                  <ArsenalItemCard
                    key={item.id}
                    item={item}
                    index={idx}
                    showNuanceDetails={showNuanceDetails}
                  />
                ))}
              </div>
            )}
          </section>

          {/* LAYER 2: CỤM DANH TỪ (NOUN PHRASES) */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => toggleLayer('noun_phrase')}
                className="flex items-center gap-3 text-left min-w-0 flex-1 cursor-pointer group"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>2. Cụm Danh Từ (Noun Phrases)</span>
                    </h3>
                    <span className="text-xs font-mono tabular-nums text-slate-400">
                      {projection.nounPhrases.length} cụm
                    </span>
                    {isSyncingLayers.noun_phrase && (
                      <span className="text-xs text-indigo-400 font-medium">
                        · Đang cập nhật luồng 2...
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    Cụm danh từ ghép tự nhiên giúp mô tả sự vật và trạng thái sắc nét như người bản xứ
                  </p>
                </div>
                {expandedLayers.noun_phrase ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleExpandSingleLayer('noun_phrase')}
                disabled={expandingLayers.noun_phrase || isExpandingAll}
                className="px-3.5 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 active:scale-[0.99] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{expandingLayers.noun_phrase ? 'Đang tải +3...' : '+3 Cụm danh từ'}</span>
              </button>
            </div>

            {expandedLayers.noun_phrase && (
              <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-800/70 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {projection.nounPhrases.map((item, idx) => (
                  <ArsenalItemCard
                    key={item.id}
                    item={item}
                    index={idx}
                    showNuanceDetails={showNuanceDetails}
                  />
                ))}
              </div>
            )}
          </section>

          {/* LAYER 3: CỤM ĐỘNG TỪ & COLLOCATIONS (VERB PHRASES) */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => toggleLayer('verb_phrase')}
                className="flex items-center gap-3 text-left min-w-0 flex-1 cursor-pointer group"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>3. Cụm Động Từ &amp; Collocations (Verb Phrases)</span>
                    </h3>
                    <span className="text-xs font-mono tabular-nums text-slate-400">
                      {projection.verbPhrases.length} chuỗi hành động
                    </span>
                    {isSyncingLayers.verb_phrase && (
                      <span className="text-xs text-emerald-400 font-medium">
                        · Đang cập nhật luồng 3...
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    Chuỗi động tác và phản xạ giao tiếp liên hoàn để tự kể lại hoặc xử lý trọn vẹn tình huống
                  </p>
                </div>
                {expandedLayers.verb_phrase ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleExpandSingleLayer('verb_phrase')}
                disabled={expandingLayers.verb_phrase || isExpandingAll}
                className="px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 active:scale-[0.99] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>
                  {expandingLayers.verb_phrase ? 'Đang tải +3...' : '+3 Cụm động từ & Collocations'}
                </span>
              </button>
            </div>

            {expandedLayers.verb_phrase && (
              <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-800/70 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {projection.verbPhrases.map((item, idx) => (
                  <ArsenalItemCard
                    key={item.id}
                    item={item}
                    index={idx}
                    showNuanceDetails={showNuanceDetails}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Bottom "+3 Cả 3 mục" Bar */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-300">
              Các ngóc ngách đã khai mở ({projection.unlockedAngles.length})
            </div>
            <div className="text-xs text-slate-400 leading-relaxed">
              {projection.unlockedAngles.join(' · ')}
            </div>
          </div>

          <button
            type="button"
            onClick={handleExpandAllDeepDive}
            disabled={isExpandingAll}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>
              {isExpandingAll
                ? 'Đang đào sâu cả 3 mục...'
                : '+3 Đào sâu cả 3 mục (100% Độc bản)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
