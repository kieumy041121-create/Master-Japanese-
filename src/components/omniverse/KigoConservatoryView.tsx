import React, { useEffect, useMemo, useState } from 'react';
import {
  Sparkles,
  Volume2,
  BookmarkPlus,
  Check,
  Stamp,
  Loader2,
  X,
  Compass,
  Feather,
} from 'lucide-react';
import {
  ConservatoryExhibit,
  GoshuinStamp,
  omniverseStorageService,
} from '../../services/omniverseStorageService';
import { getCurrentMicroSeason } from '../../services/japaneseCalendarEngine';
import {
  INITIAL_CONSERVATORY_EXHIBITS,
  expandThreeSeasonalExhibits,
} from '../../services/omniverseExpansionEngine';
import { speechService } from '../../services/speechService';
import { srsVaultService } from '../../services/srsVaultService';
import { SanctuaryRoomFrame } from './SanctuaryRoomFrame';

interface KigoConservatoryViewProps {
  isDark: boolean;
  onSrsUpdated: () => void;
}

const MOTIF_VISUAL: Record<string, { kanji: string; labelVi: string }> = {
  sakura: { kanji: '桜', labelVi: 'Cánh anh đào khẽ rơi' },
  rain: { kanji: '雨', labelVi: 'Làn mưa đầu mùa dịu mát' },
  mist: { kanji: '霞', labelVi: 'Sương mờ bảng lảng trên núi' },
  firefly: { kanji: '蛍', labelVi: 'Ánh đom đóm ven suối đêm' },
  maple: { kanji: '楓', labelVi: 'Lá phong đỏ rơi chậm chiều thu' },
  snow: { kanji: '雪', labelVi: 'Tuyết trắng tĩnh lặng bên hiên' },
};

export const KigoConservatoryView: React.FC<KigoConservatoryViewProps> = ({ isDark, onSrsUpdated }) => {
  const microSeason = useMemo(() => getCurrentMicroSeason(new Date()), []);
  const motif = MOTIF_VISUAL[microSeason.ambientMotif] || MOTIF_VISUAL.mist;

  const [exhibits, setExhibits] = useState<ConservatoryExhibit[]>(INITIAL_CONSERVATORY_EXHIBITS);
  const [activeExhibitId, setActiveExhibitId] = useState<string>(INITIAL_CONSERVATORY_EXHIBITS[0].id);
  const [goshuinStamps, setGoshuinStamps] = useState<GoshuinStamp[]>([]);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);
  const [justStampedId, setJustStampedId] = useState<string | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      await omniverseStorageService.registerSeedHashes(
        'conservatory_word',
        INITIAL_CONSERVATORY_EXHIBITS.map((e) => e.wordJp)
      );
      const state = await omniverseStorageService.loadState();
      if (!mounted) return;
      if (state.conservatoryExhibits.length > 0) {
        setExhibits(state.conservatoryExhibits);
        setActiveExhibitId(state.conservatoryExhibits[0].id);
      } else {
        state.conservatoryExhibits = INITIAL_CONSERVATORY_EXHIBITS;
        await omniverseStorageService.saveState(state);
      }
      setGoshuinStamps(state.goshuinStamps || []);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const activeExhibit = exhibits.find((e) => e.id === activeExhibitId) || exhibits[0];
  const alreadyStamped = goshuinStamps.some((s) => s.exhibitId === activeExhibit.id);

  const handleExpandThreeExhibits = async () => {
    if (isExpanding) return;
    setErrorBanner(null);
    setIsExpanding(true);
    try {
      const fresh = await expandThreeSeasonalExhibits(
        microSeason,
        exhibits.map((e) => e.wordJp)
      );
      if (fresh.length === 0) {
        setErrorBanner('Các bảo vật vừa nhận trùng với phòng trưng bày. Hãy nhấn lại để mở 3 từ mới.');
      } else {
        const nextExhibits = [...fresh, ...exhibits];
        setExhibits(nextExhibits);
        setActiveExhibitId(fresh[0].id);
        setSelectedChoiceIdx(null);
        const state = await omniverseStorageService.loadState();
        state.conservatoryExhibits = nextExhibits;
        await omniverseStorageService.saveState(state);
      }
    } catch (err: any) {
      setErrorBanner(err?.message || 'Chưa thể khai mở thêm 3 bảo vật ngôn từ mùa này.');
    } finally {
      setIsExpanding(false);
    }
  };

  const pushExhibitToSrs = (ex: ConservatoryExhibit) => {
    srsVaultService.addBookmark({
      japanese: ex.wordJp,
      reading: ex.reading,
      vietnamese: `${ex.meaningVi}${ex.hanViet ? ` (${ex.hanViet})` : ''}`,
      type: 'vocab',
      level: 'N1',
      contextSentence: ex.literaryUsage.jp,
      contextTranslation: ex.literaryUsage.vi,
      source: `Bảo Tàng Ngôn Từ · ${microSeason.kanji}`,
      tags: ['Saijiki', '72-Kō', 'Mỹ học Nhật Bản'],
    });
    setSavedWords((prev) => ({ ...prev, [ex.wordJp]: true }));
    onSrsUpdated();
  };

  const handleSelectMicroChoice = async (choiceIdx: number) => {
    setSelectedChoiceIdx(choiceIdx);
    const choice = activeExhibit.microExercise.choices[choiceIdx];
    if (!choice) return;

    // Gentle low-pressure reward: stamp Goshuin & sync to FSRS on completion
    pushExhibitToSrs(activeExhibit);

    if (!alreadyStamped) {
      const newStamp: GoshuinStamp = {
        id: `goshuin_${Date.now()}`,
        exhibitId: activeExhibit.id,
        wordJp: activeExhibit.wordJp,
        reading: activeExhibit.reading,
        meaningVi: activeExhibit.meaningVi,
        goshuinKanji: activeExhibit.goshuinKanji,
        goshuinMottoJp: activeExhibit.goshuinMottoJp,
        microSeasonJp: microSeason.kanji,
        microSeasonVi: microSeason.vietnamese,
        stampedAt: Date.now(),
      };
      const nextStamps = [newStamp, ...goshuinStamps];
      setGoshuinStamps(nextStamps);
      setJustStampedId(activeExhibit.id);
      const state = await omniverseStorageService.loadState();
      state.goshuinStamps = nextStamps;
      await omniverseStorageService.saveState(state);
    }
  };

  const panelClass = isDark
    ? 'bg-[#141923] border-stone-800/90 text-stone-100'
    : 'bg-[#fcf9f3] border-stone-200 text-stone-900';

  const isSaved = savedWords[activeExhibit.wordJp] || srsVaultService.isBookmarked(activeExhibit.wordJp);

  // Build crisp NHK Pitch SVG for active exhibit
  const pitchStep = 50;
  const pitchPad = 24;
  const moraeCount = Math.max(1, activeExhibit.morae.length);
  const svgWidth = pitchPad * 2 + (moraeCount - 1) * pitchStep;
  const pitchPath = activeExhibit.morae
    .map((_, i) => {
      const x = pitchPad + i * pitchStep;
      const y = (activeExhibit.pitchContour[i] ?? 0) >= 1 ? 16 : 44;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const kisetsuHex = microSeason.wairoHex || '#C77D8A';

  return (
    <SanctuaryRoomFrame
      isDark={isDark}
      wairoHex={kisetsuHex}
      academicPanelLabel="Trọng Âm NHK & Sổ Triện Goshuin"
      headerSlot={
        <div className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-2 -top-5 font-mincho text-[96px] leading-none opacity-[0.06]"
            style={{ color: kisetsuHex }}
          >
            {motif.kanji}
          </div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium opacity-80">
                <Compass className="w-4 h-4 shrink-0" style={{ color: kisetsuHex }} />
                <span>
                  Bảo Tàng 72 Tiết Khí (七十二候) · Tiết {microSeason.sekkiKanji} · Hậu thứ {microSeason.index}/72
                </span>
              </div>
              <div className="flex items-baseline gap-3 flex-wrap mt-1">
                <h2 className="font-mincho text-2xl sm:text-3xl font-bold tracking-tight">
                  {microSeason.kanji}
                </h2>
                <span className="font-jp text-sm opacity-80">{microSeason.reading}</span>
                <span className="text-sm font-semibold" style={{ color: kisetsuHex }}>
                  · {microSeason.vietnamese}
                </span>
              </div>
              <p className={`text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                {microSeason.poeticDescVi} — Sắc Wairo hôm nay: <strong>{microSeason.wairoNameJp}</strong> ({microSeason.wairoNameVi}) · {motif.labelVi}.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExpandThreeExhibits}
              disabled={isExpanding}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              style={{
                backgroundColor: isDark ? `${kisetsuHex}26` : kisetsuHex,
                color: isDark ? '#f5e6e9' : '#faf7f2',
                border: isDark ? `1px solid ${kisetsuHex}66` : '1px solid transparent',
              }}
            >
              {isExpanding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>[+3 Bảo Vật Mùa Này]</span>
            </button>
          </div>
        </div>
      }
      experienceSlot={
        <div className="space-y-4">
          {errorBanner && (
            <div className={`rounded-xl border px-4 py-3 text-xs flex items-center justify-between gap-3 ${isDark ? 'bg-rose-950/40 border-rose-800/60 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
              <span>{errorBanner}</span>
              <button type="button" onClick={() => setErrorBanner(null)} className="cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
          )}

          {/* Exhibit Gallery Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {exhibits.map((ex) => {
              const active = ex.id === activeExhibit.id;
              const stamped = goshuinStamps.some((s) => s.exhibitId === ex.id);
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => {
                    setActiveExhibitId(ex.id);
                    setSelectedChoiceIdx(null);
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? isDark
                        ? 'bg-stone-100 text-stone-950 border-stone-100 font-semibold'
                        : 'bg-[#2c2520] text-[#faf7f2] border-[#2c2520] font-semibold'
                      : isDark
                      ? 'bg-[#141923] border-stone-800 text-stone-300 hover:border-stone-700'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span className="font-mincho font-bold">{ex.wordJp}</span>
                  <span className="opacity-70 font-jp">{ex.reading}</span>
                  {stamped && <span className="text-[#c24136] font-mincho font-bold">印</span>}
                </button>
              );
            })}
          </div>

          {/* Primary 65% Artifact Pedestal & Cultural Layers */}
          <article className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${panelClass}`}>
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-stone-500/20">
              <div>
                <div className="text-[11px] uppercase tracking-wider opacity-65">
                  Bảo Vật Ngôn Từ · {activeExhibit.seasonTag}
                </div>
                <div className="flex items-baseline gap-3 flex-wrap mt-1">
                  <h3 className="font-mincho text-3xl sm:text-4xl font-bold">{activeExhibit.wordJp}</h3>
                  <span className="font-jp text-base font-medium" style={{ color: kisetsuHex }}>
                    {activeExhibit.reading}
                  </span>
                  {activeExhibit.hanViet && (
                    <span className="text-xs opacity-75">· Âm Hán Việt: {activeExhibit.hanViet}</span>
                  )}
                </div>
                <p className="text-sm sm:text-base font-medium mt-2">{activeExhibit.meaningVi}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => speechService.speak(activeExhibit.reading, 0.85)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer ${
                    isDark ? 'bg-stone-800 text-stone-200 hover:bg-stone-700' : 'bg-stone-200/80 text-stone-800 hover:bg-stone-300'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe chuẩn</span>
                </button>
                <button
                  type="button"
                  onClick={() => pushExhibitToSrs(activeExhibit)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer ${
                    isSaved
                      ? 'bg-emerald-600/20 text-emerald-600 dark:text-emerald-300'
                      : isDark
                      ? 'bg-stone-800 text-stone-100 border border-stone-700 hover:border-stone-500'
                      : 'bg-stone-100 text-stone-900 border border-stone-300 hover:border-stone-400'
                  }`}
                >
                  {isSaved ? <Check className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
                  <span>{isSaved ? 'Đã lưu FSRS' : 'Lưu FSRS'}</span>
                </button>
              </div>
            </div>

            {/* Layer 1: Etymology & Ancient Kanji Structure */}
            <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-[#181e2a] border-stone-800' : 'bg-[#f8f4ec] border-stone-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: kisetsuHex }}>
                Tầng 1 · Từ Nguyên & Cấu Trúc Hán Tự
              </div>
              <div className="text-xs font-semibold font-mincho">{activeExhibit.kanjiStructureNote}</div>
              <p className={`text-xs sm:text-[13px] leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                {activeExhibit.etymologyLayerVi}
              </p>
            </div>

            {/* Layers 2 & 3 Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Layer 2: Native Collocations */}
              <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-[#181e2a] border-stone-800' : 'bg-white border-stone-200'}`}>
                <div className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                  Tầng 2 · Collocations Bản Xứ
                </div>
                <div className="space-y-2.5">
                  {activeExhibit.collocations.map((col, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2 text-xs">
                      <div>
                        <div className="font-jp font-bold">{col.jp}</div>
                        <div className="font-jp text-[11px] opacity-70">{col.reading}</div>
                        <div className={isDark ? 'text-stone-300' : 'text-stone-600'}>{col.vi}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => speechService.speak(col.reading, 0.9)}
                        className="p-1 rounded opacity-70 hover:opacity-100 shrink-0 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 3: Literary & Conversation Usage */}
              <div className={`rounded-xl border p-4 space-y-2.5 ${isDark ? 'bg-[#181e2a] border-stone-800' : 'bg-white border-stone-200'}`}>
                <div className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                  Tầng 3 · Văn Viết & Hội Thoại
                </div>
                <div className="text-xs space-y-1">
                  <div className="text-[10px] uppercase opacity-65">Tùy bút / Văn viết</div>
                  <div className="font-mincho font-semibold leading-relaxed">{activeExhibit.literaryUsage.jp}</div>
                  <div className={isDark ? 'text-stone-400' : 'text-stone-600'}>{activeExhibit.literaryUsage.vi}</div>
                </div>
                <div className="text-xs space-y-1 pt-2 border-t border-stone-500/15">
                  <div className="text-[10px] uppercase opacity-65">Đời thường</div>
                  <div className="font-jp font-semibold leading-relaxed">{activeExhibit.conversationUsage.jp}</div>
                  <div className={isDark ? 'text-stone-400' : 'text-stone-600'}>{activeExhibit.conversationUsage.vi}</div>
                </div>
              </div>
            </div>

            {/* Related Kotowaza Proverb */}
            <div className={`rounded-xl border p-4 flex flex-wrap items-center justify-between gap-3 ${isDark ? 'bg-[#1a1816] border-stone-700/80' : 'bg-[#f8f2e6] border-stone-300/70'}`}>
              <div className="space-y-0.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: kisetsuHex }}>
                  Thành Ngữ Kotowaza Liên Kết
                </div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-mincho text-lg font-bold">{activeExhibit.relatedKotowaza.jp}</span>
                  <span className="font-jp text-xs opacity-75">{activeExhibit.relatedKotowaza.reading}</span>
                </div>
                <p className="text-xs font-medium">{activeExhibit.relatedKotowaza.vi}</p>
                <p className="text-xs opacity-75">{activeExhibit.relatedKotowaza.nuance}</p>
              </div>
              <button
                type="button"
                onClick={() => speechService.speak(activeExhibit.relatedKotowaza.reading, 0.85)}
                className={`p-2 rounded-lg shrink-0 cursor-pointer ${isDark ? 'bg-stone-800 hover:bg-stone-700' : 'bg-white hover:bg-stone-100'}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </article>
        </div>
      }
      academicSlot={
        <div className="space-y-4">
          {/* Layer 4: Tokyo NHK Pitch Accent SVG */}
          <div className={`rounded-2xl border p-4 space-y-2 ${panelClass}`}>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
              Tầng 4 · Trọng Âm Tokyo NHK
            </div>
            <div className="text-xs font-mono tabular-nums opacity-80">{activeExhibit.pitchLabel}</div>
            <div className="overflow-x-auto pt-1">
              <svg width={svgWidth} height={68} viewBox={`0 0 ${svgWidth} 68`} className="block">
                <path d={pitchPath} fill="none" stroke="#2f9e73" strokeWidth="2.4" strokeLinecap="round" />
                {activeExhibit.morae.map((m, idx) => {
                  const x = pitchPad + idx * pitchStep;
                  const y = (activeExhibit.pitchContour[idx] ?? 0) >= 1 ? 16 : 44;
                  return (
                    <g key={idx}>
                      <circle cx={x} cy={y} r="4.5" fill="#2f9e73" />
                      <text
                        x={x}
                        y={62}
                        textAnchor="middle"
                        fontSize="13"
                        fill={isDark ? '#e7e5e4' : '#1c1917'}
                        className="font-jp font-bold"
                      >
                        {m}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* 15-Second Low-Pressure Micro-Exercise */}
          <div className={`rounded-2xl border p-4 sm:p-5 space-y-3.5 ${panelClass}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-[#b84a39]" />
                <h4 className="text-sm font-bold">Chạm Nhẹ 15 Giây · Nhận Dấu Goshuin</h4>
              </div>
              {alreadyStamped && (
                <span className="text-[11px] font-semibold text-[#b84a39] shrink-0">Đã đóng ấn</span>
              )}
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
              {activeExhibit.microExercise.promptVi}
            </p>

            <div className="space-y-2">
              {activeExhibit.microExercise.choices.map((ch, idx) => {
                const picked = selectedChoiceIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectMicroChoice(idx)}
                    className={`w-full text-left rounded-xl border p-3 transition-colors cursor-pointer ${
                      picked
                        ? ch.isIdeal
                          ? isDark
                            ? 'bg-emerald-900/35 border-emerald-500/60'
                            : 'bg-emerald-50 border-emerald-400'
                          : isDark
                          ? 'bg-amber-900/25 border-amber-500/50'
                          : 'bg-amber-50 border-amber-400'
                        : isDark
                        ? 'bg-[#181e2a] border-stone-800 hover:border-stone-600'
                        : 'bg-white border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="font-jp text-sm font-bold">{ch.labelJp}</div>
                    <div className="font-jp text-[11px] opacity-70">{ch.reading}</div>
                    {picked && (
                      <p className="text-xs mt-2 leading-relaxed opacity-95">{ch.gentleNoteVi}</p>
                    )}
                  </button>
                );
              })}
            </div>

            {justStampedId === activeExhibit.id && (
              <div className={`rounded-xl border p-3 text-xs flex items-center gap-2.5 ${isDark ? 'bg-rose-950/35 border-rose-700/50 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
                <Stamp className="w-4 h-4 shrink-0 text-[#b84a39]" />
                <span>Đã đóng dấu triện đỏ 「{activeExhibit.goshuinKanji}」 vào sổ Goshuin & đồng bộ FSRS!</span>
              </div>
            )}
          </div>

          {/* Collectible Goshuin-chō (御朱印帳) */}
          <div className={`rounded-2xl border p-4 sm:p-5 space-y-3 ${panelClass}`}>
            <div className="flex items-center justify-between">
              <h4 className="font-mincho text-base font-bold">
                Sổ Triện Đỏ Goshuin (御朱印帳)
              </h4>
              <span className="text-xs font-mono tabular-nums opacity-70">{goshuinStamps.length} dấu</span>
            </div>

            {goshuinStamps.length === 0 ? (
              <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                Hoàn thành một bài chạm nhẹ 15 giây phía trên để sưu tầm dấu triện đỏ Goshuin đầu tiên cho mùa {microSeason.vietnamese}.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {goshuinStamps.slice(0, 6).map((st) => (
                  <div
                    key={st.id}
                    className={`rounded-xl border p-3 flex flex-col items-center text-center ${
                      isDark ? 'bg-[#191513] border-stone-800' : 'bg-[#fbf6ec] border-[#dfd3be]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl border-2 border-[#b84a39] text-[#b84a39] flex items-center justify-center font-mincho text-2xl font-bold">
                      {st.goshuinKanji}
                    </div>
                    <div className="font-mincho text-xs font-bold mt-2">{st.wordJp}</div>
                    <div className="font-jp text-[10px] opacity-70">{st.goshuinMottoJp}</div>
                    <div className="text-[10px] opacity-60 mt-1 tabular-nums">
                      {st.microSeasonJp} · {new Date(st.stampedAt).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};
