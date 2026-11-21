import React, { useEffect, useMemo, useState } from 'react';
import {
  Mail,
  Sparkles,
  Stamp,
  Lock,
  Unlock,
  Volume2,
  BookmarkPlus,
  Check,
  Loader2,
  Plus,
  X,
  CalendarClock,
} from 'lucide-react';
import {
  LetterPrismResult,
  SealedTimeLetter,
  omniverseStorageService,
} from '../../services/omniverseStorageService';
import {
  STATIONERY_THEMES,
  VINTAGE_STAMPS,
  getCurrentSolarTerm,
} from '../../services/japaneseCalendarEngine';
import {
  INITIAL_LETTER_SCENARIOS,
  JikoGreetingOption,
  LetterScenarioPrompt,
  expandThreeJikoGreetings,
  expandThreeLetterScenarios,
  transformLetterStylePrism,
} from '../../services/omniverseExpansionEngine';
import { speechService } from '../../services/speechService';
import { srsVaultService } from '../../services/srsVaultService';
import { SanctuaryRoomFrame } from './SanctuaryRoomFrame';

interface TimeCapsulePostOfficeViewProps {
  isDark: boolean;
  onSrsUpdated: () => void;
}

const PRISM_TIERS: Array<{ id: 'tameguchi' | 'teineigo' | 'keigo'; label: string; jp: string }> = [
  { id: 'tameguchi', label: 'Thân mật (Tameguchi)', jp: 'タメ口' },
  { id: 'teineigo', label: 'Lịch sự (Teineigo)', jp: '丁寧語' },
  { id: 'keigo', label: 'Trang trọng (Keigo / Business)', jp: '敬語・ビジネス' },
];

const UNLOCK_DAYS_OPTIONS = [
  { days: 7, label: '7 ngày sau' },
  { days: 30, label: '30 ngày sau' },
  { days: 90, label: '3 tháng sau' },
  { days: 365, label: '1 năm sau' },
];

export const TimeCapsulePostOfficeView: React.FC<TimeCapsulePostOfficeViewProps> = ({
  isDark,
  onSrsUpdated,
}) => {
  const currentSekki = useMemo(() => getCurrentSolarTerm(new Date()), []);

  const [stationeryId, setStationeryId] = useState<string>(STATIONERY_THEMES[0].id);
  const [stampId, setStampId] = useState<string>(VINTAGE_STAMPS[0].id);
  const [scenarios, setScenarios] = useState<LetterScenarioPrompt[]>(INITIAL_LETTER_SCENARIOS);
  const [jikoOptions, setJikoOptions] = useState<JikoGreetingOption[]>([
    {
      formal: currentSekki.jikoFormal,
      reading: currentSekki.jikoFormalReading,
      casual: currentSekki.jikoCasual,
      meaningVi: currentSekki.meaningVi,
    },
  ]);

  const [letterTitle, setLetterTitle] = useState('Bức thư nhỏ giữa mùa tiết khí');
  const [recipientLabel, setRecipientLabel] = useState(INITIAL_LETTER_SCENARIOS[0].recipientLabel);
  const [selectedJiko, setSelectedJiko] = useState<string>(currentSekki.jikoCasual);
  const [draftText, setDraftText] = useState<string>(INITIAL_LETTER_SCENARIOS[0].starterDraftJp);
  const [unlockDays, setUnlockDays] = useState<number>(30);

  const [prismResult, setPrismResult] = useState<LetterPrismResult | null>({
    tameguchi:
      '一ヶ月後の私へ。最近ちょっと忙しいけど、毎日自分のペースで歩き続けてるよ。無理せず、元気でいてね。',
    teineigo:
      '一ヶ月後の私へ。最近は少し忙しいですが、毎日自分のペースで歩き続けています。どうか無理をせず、元気でいてください。',
    keigo:
      '拝啓　皆様におかれましてはますますご清栄のこととお慶び申し上げます。日々の業務に追われる折ではございますが、一歩ずつ着実に歩みを進めてまいる所存です。何卒ご自愛くださいますようお願い申し上げます。敬具',
    pivots: [
      {
        tameguchi: '歩き続けてるよ',
        teineigo: '歩き続けています',
        keigo: '歩みを進めてまいる所存です',
        keigoType: 'Kenjōgo (Khiêm nhường ngữ)',
        explanationVi: 'まいる (khiêm nhường của 行く) + 所存です thể hiện quyết tâm trang trọng khiêm tốn.',
      },
      {
        tameguchi: '元気でいてね',
        teineigo: '元気でいてください',
        keigo: 'ご自愛くださいますようお願い申し上げます',
        keigoType: 'Sonkeigo (Tôn kính ngữ)',
        explanationVi: 'ご自愛ください là câu chúc giữ gìn sức khỏe tinh tế bậc nhất trong thư tín Nhật.',
      },
    ],
  });
  const [tierIdx, setTierIdx] = useState<number>(1); // 0: tameguchi, 1: teineigo, 2: keigo

  const [sealedLetters, setSealedLetters] = useState<SealedTimeLetter[]>([]);
  const [isMorphingPrism, setIsMorphingPrism] = useState(false);
  const [isExpandingJiko, setIsExpandingJiko] = useState(false);
  const [isExpandingScenarios, setIsExpandingScenarios] = useState(false);
  const [sealSuccessNote, setSealSuccessNote] = useState<string | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [savedKeys, setSavedKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      const state = await omniverseStorageService.loadState();
      if (!mounted) return;
      setSealedLetters(state.sealedLetters || []);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const activeStationery = STATIONERY_THEMES.find((s) => s.id === stationeryId) || STATIONERY_THEMES[0];
  const activeStamp = VINTAGE_STAMPS.find((s) => s.id === stampId) || VINTAGE_STAMPS[0];
  const activeTier = PRISM_TIERS[tierIdx] || PRISM_TIERS[1];

  const handleRunStylePrism = async () => {
    if (!draftText.trim() || isMorphingPrism) return;
    setErrorBanner(null);
    setIsMorphingPrism(true);
    try {
      const result = await transformLetterStylePrism(`${selectedJiko}\n${draftText}`, currentSekki);
      setPrismResult(result);
    } catch (err: any) {
      setErrorBanner(err?.message || 'Chưa thể chiếu Lăng Kính Văn Phong 3 Tầng lúc này.');
    } finally {
      setIsMorphingPrism(false);
    }
  };

  const handleExpandJiko = async () => {
    if (isExpandingJiko) return;
    setErrorBanner(null);
    setIsExpandingJiko(true);
    try {
      const fresh = await expandThreeJikoGreetings(
        currentSekki,
        jikoOptions.map((j) => j.formal)
      );
      if (fresh.length > 0) {
        setJikoOptions((prev) => [...fresh, ...prev]);
      }
    } catch (err: any) {
      setErrorBanner(err?.message || 'Không thể sinh thêm 3 lời chào tiết khí mới.');
    } finally {
      setIsExpandingJiko(false);
    }
  };

  const handleExpandScenarios = async () => {
    if (isExpandingScenarios) return;
    setErrorBanner(null);
    setIsExpandingScenarios(true);
    try {
      const fresh = await expandThreeLetterScenarios(scenarios.map((s) => s.titleVi));
      if (fresh.length > 0) {
        setScenarios((prev) => [...fresh, ...prev]);
      }
    } catch (err: any) {
      setErrorBanner(err?.message || 'Không thể gợi ý thêm 3 kịch bản thư tín mới.');
    } finally {
      setIsExpandingScenarios(false);
    }
  };

  const handleSealTimeLetter = async () => {
    if (!draftText.trim()) return;
    const now = Date.now();
    const finalPrism: LetterPrismResult = prismResult || {
      tameguchi: draftText,
      teineigo: draftText,
      keigo: draftText,
      pivots: [],
    };
    const newLetter: SealedTimeLetter = {
      id: `letter_${now}`,
      title: letterTitle.trim() || 'Lá thư gửi tương lai',
      recipientLabel: recipientLabel.trim() || 'Chính mình',
      stationeryId: activeStationery.id,
      stampKanji: activeStamp.kanji,
      stampLabel: activeStamp.labelVi,
      sekkiName: `${currentSekki.kanji} (${currentSekki.vietnamese})`,
      jikoGreeting: selectedJiko,
      originalDraft: draftText,
      prism: finalPrism,
      activeTier: activeTier.id,
      createdAt: now,
      unlockAt: now + unlockDays * 86400000,
    };

    const nextLetters = [newLetter, ...sealedLetters];
    setSealedLetters(nextLetters);
    const state = await omniverseStorageService.loadState();
    state.sealedLetters = nextLetters;
    await omniverseStorageService.saveState(state);
    setSealSuccessNote(
      `Đã đóng dấu sáp đỏ và cất vào Hộp Thư Xuyên Thời Gian (dự kiến mở khóa sau ${unlockDays} ngày).`
    );
    window.setTimeout(() => setSealSuccessNote(null), 5000);
  };

  const handleToggleEarlyOpen = async (letterId: string) => {
    const nextLetters = sealedLetters.map((l) =>
      l.id === letterId ? { ...l, isOpenedEarly: !l.isOpenedEarly } : l
    );
    setSealedLetters(nextLetters);
    const state = await omniverseStorageService.loadState();
    state.sealedLetters = nextLetters;
    await omniverseStorageService.saveState(state);
  };

  const handleSaveKeigoPivot = (jp: string, explanation: string, kind: string) => {
    srsVaultService.addBookmark({
      japanese: jp,
      reading: '',
      vietnamese: `${kind} · ${explanation}`,
      type: 'email',
      level: 'N2',
      contextSentence: prismResult?.keigo || jp,
      contextTranslation: explanation,
      source: `Bưu Cục Tĩnh Lặng · ${currentSekki.kanji}`,
      tags: ['Time-Capsule Post Office', 'Keigo', currentSekki.vietnamese],
    });
    setSavedKeys((prev) => ({ ...prev, [jp]: true }));
    onSrsUpdated();
  };

  const panelClass = isDark
    ? 'bg-[#141923] border-stone-800/90 text-stone-100'
    : 'bg-[#fcf9f3] border-stone-200 text-stone-900';

  const displayedPrismText = prismResult ? prismResult[activeTier.id] : draftText;

  const akaneHex = '#A64444';

  return (
    <SanctuaryRoomFrame
      isDark={isDark}
      wairoHex={akaneHex}
      academicPanelLabel="Lăng Kính 3 Tầng & Tiết Khí"
      headerSlot={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <h2 className="font-mincho text-xl sm:text-2xl font-bold tracking-tight">
                Hộp Thư Xuyên Thời Gian
              </h2>
              <span className="font-jp text-sm font-medium" style={{ color: isDark ? '#df8a8a' : akaneHex }}>
                時空の郵便局 · Akane 茜
              </span>
            </div>
            <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              Tiết khí hôm nay:{' '}
              <strong className={isDark ? 'text-stone-100' : 'text-stone-900'}>
                {currentSekki.kanji} ({currentSekki.reading} · {currentSekki.vietnamese})
              </strong>{' '}
              · {currentSekki.wairoNameJp} · {currentSekki.meaningVi}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExpandJiko}
              disabled={isExpandingJiko}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isDark
                  ? 'border-[#A64444]/50 bg-[#A64444]/15 text-[#f2b3b3] hover:bg-[#A64444]/25'
                  : 'border-[#A64444]/40 bg-[#A64444]/10 text-[#7d2e2e] hover:bg-[#A64444]/15'
              }`}
            >
              {isExpandingJiko ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              <span>[+3 Lời Chào Tiết Khí]</span>
            </button>

            <button
              type="button"
              onClick={handleExpandScenarios}
              disabled={isExpandingScenarios}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isDark
                  ? 'border-stone-700 text-stone-200 hover:bg-stone-800'
                  : 'border-stone-300 text-stone-800 hover:bg-stone-100'
              }`}
            >
              {isExpandingScenarios ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>[+3 Kịch Bản Thư Tín]</span>
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

          {sealSuccessNote && (
            <div className={`rounded-xl border px-4 py-3 text-xs flex items-center gap-2 ${isDark ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-900'}`}>
              <Stamp className="w-4 h-4 shrink-0" />
              <span>{sealSuccessNote}</span>
            </div>
          )}

          {/* Letter Scenarios Strip */}
          <div className="flex flex-wrap items-center gap-2">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setLetterTitle(sc.titleVi);
                  setRecipientLabel(sc.recipientLabel);
                  setDraftText(sc.starterDraftJp);
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  letterTitle === sc.titleVi
                    ? isDark
                      ? 'bg-[#A64444]/20 border-[#A64444]/60 text-[#f5c0c0] font-semibold'
                      : 'bg-[#A64444]/10 border-[#A64444]/50 text-[#7d2e2e] font-semibold'
                    : isDark
                    ? 'bg-[#141923] border-stone-800 text-stone-300 hover:border-[#A64444]/40'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-[#A64444]/40'
                }`}
              >
                {sc.titleVi}
              </button>
            ))}
          </div>

          {/* Primary 65% Stationery Composer */}
          <section
            className="rounded-2xl border p-5 sm:p-6 space-y-4 transition-colors"
            style={{
              backgroundColor: isDark ? activeStationery.paperBgDark : activeStationery.paperBgLight,
              borderColor: isDark ? 'rgba(166, 68, 68, 0.25)' : 'rgba(166, 68, 68, 0.22)',
            }}
          >
            {/* Stationery & Vintage Postage Stamp Picker */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-500/20">
              <div className="flex items-center gap-1.5 flex-wrap">
                {STATIONERY_THEMES.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setStationeryId(st.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border whitespace-nowrap transition-colors cursor-pointer ${
                      stationeryId === st.id
                        ? 'border-[#A64444] font-bold'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="font-mincho mr-1" style={{ color: st.accentHex }}>{st.motifKanji}</span>
                    <span>{st.season}</span>
                  </button>
                ))}
              </div>

              {/* Vintage Stamp Badge */}
              <div className="flex items-center gap-1.5">
                {VINTAGE_STAMPS.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setStampId(st.id)}
                    title={`${st.labelVi} (${st.yenLabel})`}
                    className={`w-9 h-10 rounded-md border-2 border-dashed flex flex-col items-center justify-center transition-transform cursor-pointer ${
                      stampId === st.id ? 'scale-105 ring-2 ring-[#A64444]/45' : 'opacity-65 hover:opacity-100'
                    }`}
                    style={{ borderColor: st.colorHex, color: st.colorHex }}
                  >
                    <span className="font-mincho text-sm font-bold leading-none">{st.kanji}</span>
                    <span className="text-[8px] font-mono tabular-nums mt-0.5">{st.yenLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider opacity-70 mb-1">
                  Tiêu đề lá thư
                </label>
                <input
                  value={letterTitle}
                  onChange={(e) => setLetterTitle(e.target.value)}
                  className={`w-full rounded-xl border px-3 py-2 text-xs ${
                    isDark ? 'bg-black/25 border-stone-700 text-stone-100' : 'bg-white/80 border-stone-300 text-stone-900'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider opacity-70 mb-1">
                  Người nhận
                </label>
                <input
                  value={recipientLabel}
                  onChange={(e) => setRecipientLabel(e.target.value)}
                  className={`w-full rounded-xl border px-3 py-2 text-xs ${
                    isDark ? 'bg-black/25 border-stone-700 text-stone-100' : 'bg-white/80 border-stone-300 text-stone-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <div className="text-[11px] font-jp opacity-80 mb-1.5">
                Lời chào tiết khí đang chọn: <span className="font-semibold">{selectedJiko}</span>
              </div>
              <textarea
                rows={7}
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                placeholder="Viết vài dòng tiếng Nhật hoặc tiếng Việt gửi chính mình / đối tác / thầy cô..."
                className={`w-full rounded-xl border p-4 text-sm sm:text-[15px] font-mincho leading-[1.9] focus:outline-none focus:ring-2 focus:ring-[#A64444]/40 ${
                  isDark
                    ? 'bg-black/25 border-stone-700 text-stone-100 placeholder:text-stone-500'
                    : 'bg-white/85 border-stone-300 text-stone-900 placeholder:text-stone-400'
                }`}
              />
            </div>

            {/* Actions: Transform via 3-Tier Prism + Red Wax Seal */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs">
                <CalendarClock className="w-4 h-4 opacity-70" />
                <select
                  value={unlockDays}
                  onChange={(e) => setUnlockDays(Number(e.target.value))}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs ${
                    isDark ? 'bg-[#141923] border-stone-700' : 'bg-white border-stone-300'
                  }`}
                >
                  {UNLOCK_DAYS_OPTIONS.map((o) => (
                    <option key={o.days} value={o.days}>
                      Mở khóa: {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleRunStylePrism}
                  disabled={isMorphingPrism || !draftText.trim()}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border whitespace-nowrap shrink-0 transition-colors disabled:opacity-45 cursor-pointer ${
                    isDark
                      ? 'border-[#A64444]/50 bg-[#A64444]/15 text-[#f2b3b3] hover:bg-[#A64444]/25'
                      : 'border-[#A64444]/45 bg-[#A64444]/10 text-[#7d2e2e] hover:bg-[#A64444]/15'
                  }`}
                >
                  {isMorphingPrism ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Chiếu Lăng Kính 3 Tầng</span>
                </button>

                <button
                  type="button"
                  onClick={handleSealTimeLetter}
                  disabled={!draftText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#A64444] text-amber-50 hover:bg-[#8c3737] whitespace-nowrap shrink-0 transition-colors disabled:opacity-45 cursor-pointer"
                >
                  <Stamp className="w-3.5 h-3.5" />
                  <span>Đóng Dấu Sáp Đỏ (封)</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      }
      academicSlot={
        <div className="space-y-4">
          {/* 0ms 3-Tier Style Prism Card */}
          <section className={`rounded-2xl border p-4 sm:p-5 space-y-4 ${panelClass}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-mincho text-base font-bold">Lăng Kính Văn Phong 3 Tầng (0ms)</h3>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  Kéo thanh trượt đổi tức thì: Tameguchi ↔ Teineigo ↔ Keigo
                </p>
              </div>
              <button
                type="button"
                onClick={() => speechService.speak(displayedPrismText, 0.9)}
                className={`p-2 rounded-lg shrink-0 cursor-pointer ${isDark ? 'bg-stone-800 hover:bg-stone-700' : 'bg-stone-100 hover:bg-stone-200'}`}
                title="Nghe bản thư hiện tại"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* 0ms Prism Slider */}
            <div className={`rounded-xl border p-3 space-y-2 ${isDark ? 'bg-[#1a202d] border-stone-800' : 'bg-[#f6f1e7] border-stone-200'}`}>
              <div className="flex items-center justify-between text-xs gap-2">
                <span className="font-semibold shrink-0">Tầng:</span>
                <span className="font-bold text-right" style={{ color: isDark ? '#f2b3b3' : akaneHex }}>
                  {activeTier.label} · <span className="font-jp">{activeTier.jp}</span>
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={2}
                step={1}
                value={tierIdx}
                aria-label={`Tầng văn phong ${activeTier.label}`}
                onChange={(e) => setTierIdx(Number(e.target.value))}
                className="w-full accent-[#A64444] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] opacity-70">
                <span>Thân mật</span>
                <span>Lịch sự</span>
                <span>Keigo</span>
              </div>
            </div>

            {/* Transformed Letter Output */}
            <div
              className={`rounded-xl border p-3.5 font-mincho text-sm leading-[1.95] whitespace-pre-line ${
                isDark ? 'bg-[#10141d] border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
              }`}
            >
              {displayedPrismText}
            </div>

            {/* Keigo Pivot Points */}
            {prismResult && prismResult.pivots.length > 0 && (
              <div className="space-y-2.5">
                <div className="text-xs font-bold">Điểm chuyển đổi Sonkeigo · Kenjōgo</div>
                {prismResult.pivots.map((pv, idx) => {
                  const isSaved = savedKeys[pv.keigo] || srsVaultService.isBookmarked(pv.keigo);
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border p-3 text-xs space-y-1.5 ${
                        isDark ? 'bg-[#181e2a] border-stone-800' : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold" style={{ color: isDark ? '#f2b3b3' : akaneHex }}>
                          {pv.keigoType}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSaveKeigoPivot(pv.keigo, pv.explanationVi, pv.keigoType)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium whitespace-nowrap cursor-pointer ${
                            isSaved
                              ? 'bg-emerald-600/20 text-emerald-600 dark:text-emerald-300'
                              : isDark
                              ? 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                              : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                          }`}
                        >
                          {isSaved ? <Check className="w-3 h-3" /> : <BookmarkPlus className="w-3 h-3" />}
                          <span>{isSaved ? 'Đã lưu' : 'FSRS'}</span>
                        </button>
                      </div>
                      <div className="font-jp flex flex-wrap items-center gap-1.5">
                        <span className="opacity-75">{pv.tameguchi}</span>
                        <span>→</span>
                        <span className="opacity-90">{pv.teineigo}</span>
                        <span>→</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-300">{pv.keigo}</span>
                      </div>
                      <p className={`leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                        {pv.explanationVi}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Compact Jikō no Aisatsu Seasonal Greetings Picker */}
          <section className={`rounded-2xl border p-4 space-y-2.5 ${panelClass}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-bold">Lời Chào Tiết Khí (時候の挨拶)</div>
              <span className="text-[11px] opacity-70 font-jp">{currentSekki.kanji}</span>
            </div>
            <div className="space-y-2">
              {jikoOptions.slice(0, 5).map((opt, idx) => {
                const fullValue = `${opt.formal}（${opt.casual}）`;
                const picked =
                  selectedJiko === fullValue ||
                  selectedJiko === opt.casual ||
                  selectedJiko === opt.formal;
                return (
                  <button
                    key={`${opt.formal}_${idx}`}
                    type="button"
                    onClick={() => setSelectedJiko(fullValue)}
                    className={`w-full text-left rounded-xl border p-2.5 transition-colors cursor-pointer ${
                      picked
                        ? isDark
                          ? 'bg-[#A64444]/20 border-[#A64444]/60'
                          : 'bg-[#A64444]/10 border-[#A64444]/50'
                        : isDark
                        ? 'bg-[#1a202c] border-stone-800 hover:border-stone-700'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-mincho text-xs font-bold">{opt.formal}</div>
                    <div className="text-[11px] font-jp opacity-75">{opt.reading} · {opt.casual}</div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>{opt.meaningVi}</div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      }
      footerSlot={
        <div className={`rounded-2xl border p-4 sm:p-5 ${panelClass}`}>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" style={{ color: akaneHex }} />
              <h3 className="font-mincho text-base font-bold">
                Tủ Thư Niêm Phong Sáp Đỏ ({sealedLetters.length})
              </h3>
            </div>
            <span className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              Lưu trữ vĩnh viễn trong trình duyệt
            </span>
          </div>

          {sealedLetters.length === 0 ? (
            <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              Chưa có bức thư nào được niêm phong. Hãy viết đôi dòng phía trên và nhấn “Đóng Dấu Sáp Đỏ (封)”.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sealedLetters.map((letter) => {
                const isUnlocked = Date.now() >= letter.unlockAt || Boolean(letter.isOpenedEarly);
                return (
                  <div
                    key={letter.id}
                    className={`rounded-xl border p-4 space-y-2.5 ${
                      isDark ? 'bg-[#181e2a] border-stone-800' : 'bg-white border-stone-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-mincho text-sm font-bold">{letter.title}</div>
                        <div className="text-[11px] opacity-70 mt-0.5">
                          Gửi: {letter.recipientLabel} · {letter.sekkiName}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#A64444] text-amber-50 font-mincho font-bold text-sm flex items-center justify-center shrink-0">
                        封
                      </div>
                    </div>

                    <div className="text-[11px] opacity-75 tabular-nums">
                      Ngày mở khóa: {new Date(letter.unlockAt).toLocaleDateString('vi-VN')}
                    </div>

                    {isUnlocked ? (
                      <p className="font-mincho text-xs leading-relaxed pt-2 border-t border-stone-500/20 whitespace-pre-line">
                        {letter.prism[letter.activeTier]}
                      </p>
                    ) : (
                      <div className={`rounded-lg p-2.5 text-xs flex items-center justify-between gap-2 ${isDark ? 'bg-black/25' : 'bg-stone-100'}`}>
                        <span className="inline-flex items-center gap-1.5 opacity-80">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Đang ngủ yên trong phong bì</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleEarlyOpen(letter.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold underline shrink-0 cursor-pointer"
                        >
                          <Unlock className="w-3 h-3" />
                          <span>Mở sớm</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      }
    />
  );
};
