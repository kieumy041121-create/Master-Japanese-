import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Plus,
  AlertTriangle,
  Sparkles,
  Brain,
  ChevronRight,
  RotateCw,
  CheckCircle2,
  ShieldAlert,
  Compass,
  BookOpen,
  Scale,
  Type,
  Gift,
  ArrowRight,
} from 'lucide-react';
import { JLPTLevel } from '../../types';
import {
  expandThreeSiblingKanji,
  findKanjiRecord,
  searchKanjiCandidates,
  SiblingKanjiNode,
  JukugoCompoundItem,
} from '../../services/kanjiUniverseEngine';
import {
  buildKanjiOmniverseBundle,
  detectHomophoneQueryTarget,
  scheduleBackgroundOmniversePrefetch,
} from '../../services/kanjiOmniverseEngine';
import { srsVaultService, SrsCardItem } from '../../services/srsVaultService';
import { speechService } from '../../services/speechService';
import { callGemini } from '../../services/geminiService';
import { PitchAccentMiniSvg } from './PitchAccentMiniSvg';
import { OmnipotentKanjiGateway } from './OmnipotentKanjiGateway';
import { HomophoneMatrixPanel } from './HomophoneMatrixPanel';
import { MultiFontImmersionPanel } from './MultiFontImmersionPanel';
import { KanjiPressureAssessmentPanel } from './KanjiPressureAssessmentPanel';

type HexaTabId = 'etymology' | 'jukugo' | 'homophone' | 'multifont' | 'pressure' | 'expansion';

const HEXA_ZEN_TABS: {
  id: HexaTabId;
  step: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: 'etymology', step: '1', label: 'Chiết tự', icon: Compass },
  { id: 'jukugo', step: '2', label: 'Từ ghép & Bẫy', icon: BookOpen },
  { id: 'homophone', step: '3', label: 'Đồng âm & Sắc thái', icon: Scale },
  { id: 'multifont', step: '4', label: 'Đa phông & Đời thực', icon: Type },
  { id: 'pressure', step: '5', label: 'Khảo thí Áp lực', icon: Sparkles },
  { id: 'expansion', step: '6', label: '+3 Đồng hệ', icon: Gift },
];

interface KanjiUniverseMacroModuleProps {
  initialKanji?: string;
  initialLevel?: JLPTLevel | 'ALL';
  onExit: () => void;
  onOpenFullSrsModal?: () => void;
}

export const KanjiUniverseMacroModule: React.FC<KanjiUniverseMacroModuleProps> = ({
  initialKanji = '海',
  initialLevel = 'ALL',
  onExit,
  onOpenFullSrsModal,
}) => {
  const [activeQuery, setActiveQuery] = useState<string>(() => {
    const q = (initialKanji || '語').trim();
    const hom = detectHomophoneQueryTarget(q);
    if (hom.preferredChar) return q;
    const found = findKanjiRecord(q);
    return found ? found.character : q || '語';
  });
  const [levelFilter, setLevelFilter] = useState<JLPTLevel | 'ALL'>(initialLevel);
  const [activeTab, setActiveTab] = useState<HexaTabId>('etymology');
  const [jukugoTab, setJukugoTab] = useState<'all' | 'on' | 'kun'>('all');
  const [isFading, setIsFading] = useState(false);

  // +3 Infinite Sibling Expansion (pre-warmed synchronously at 0ms)
  const [expansionAxis, setExpansionAxis] = useState<'radical' | 'reading'>('radical');
  const [expandedSiblings, setExpandedSiblings] = useState<SiblingKanjiNode[]>([]);

  // Optional deeper AI mnemonic elaboration
  const [aiDeepStory, setAiDeepStory] = useState<string | null>(null);
  const [isGeneratingAiStory, setIsGeneratingAiStory] = useState(false);

  // Offline FSRS Sync state & inline review drawer
  const [srsVersion, setSrsVersion] = useState(0);
  const [isFsrsDrawerOpen, setIsFsrsDrawerOpen] = useState(false);
  const [fsrsFlipped, setFsrsFlipped] = useState(false);
  const [fsrsIndex, setFsrsIndex] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const onSrsUpdated = () => setSrsVersion((v) => v + 1);
    window.addEventListener('kotoba_srs_updated', onSrsUpdated);
    return () => window.removeEventListener('kotoba_srs_updated', onSrsUpdated);
  }, []);

  useEffect(() => {
    if (initialKanji) {
      const q = initialKanji.trim();
      const hom = detectHomophoneQueryTarget(q);
      if (hom.preferredChar) {
        setActiveQuery(q);
      } else {
        const rec = findKanjiRecord(q);
        setActiveQuery(rec ? rec.character : q);
      }
    }
  }, [initialKanji]);

  const omniverse = useMemo(() => buildKanjiOmniverseBundle(activeQuery), [activeQuery]);
  const dossier = omniverse.dossier;

  // 0ms Background Async Pre-fetch of twin traps, homophone peers, and +3 sibling nodes
  useEffect(() => {
    scheduleBackgroundOmniversePrefetch(omniverse);
  }, [omniverse]);

  // Seed +3 Đồng hệ tab instantaneously from pre-warmed omniverse bundle
  useEffect(() => {
    const initialNodes =
      expansionAxis === 'radical'
        ? omniverse.initialRadicalSiblings
        : omniverse.initialReadingSiblings;
    setExpandedSiblings(initialNodes);
  }, [omniverse, expansionAxis]);

  const quickCandidates = useMemo(
    () => searchKanjiCandidates('', levelFilter, 32),
    [levelFilter]
  );

  // Reset per-kanji transient states & apply smooth 0ms opacity transition when switching
  useEffect(() => {
    setAiDeepStory(null);
    setIsFading(true);
    const raf = window.requestAnimationFrame(() => {
      setIsFading(false);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [dossier.character]);

  const allSrsCards = useMemo(() => srsVaultService.getAll(), [srsVersion]);
  const dueSrsCards = useMemo(() => srsVaultService.getDueCards(), [srsVersion]);
  const isMainKanjiBookmarked = useMemo(
    () => srsVaultService.isBookmarked(dossier.character),
    [dossier.character, srsVersion]
  );

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
  };

  const applyPreferredTab = (preferredTab?: 'all' | 'homophone' | 'multifont') => {
    if (preferredTab === 'homophone') {
      setActiveTab('homophone');
    } else if (preferredTab === 'multifont') {
      setActiveTab('multifont');
    } else {
      setActiveTab('etymology');
    }
  };

  const handleSelectKanji = (
    charOrQuery: string,
    preferredTab?: 'all' | 'homophone' | 'multifont'
  ) => {
    const q = charOrQuery.trim();
    if (!q) return;

    // Atomic Flush State: Clear stale AI story immediately on target switch
    setAiDeepStory(null);

    const hom = detectHomophoneQueryTarget(q);
    if (hom.preferredChar) {
      setActiveQuery(q);
      speechService.speak(hom.preferredChar);
      applyPreferredTab(preferredTab ?? 'homophone');
      return;
    }
    if (q.includes('半額') || q.includes('注意')) {
      setActiveQuery(q);
      speechService.speak(q);
      applyPreferredTab(preferredTab ?? 'multifont');
      return;
    }
    const rec = findKanjiRecord(q);
    if (rec) {
      setActiveQuery(rec.character);
      speechService.speak(rec.character);
      applyPreferredTab(preferredTab);
      return;
    }
    // Direct CJK / Hyougai Kanji fallback
    const directKanji = q.match(/[\u4E00-\u9FAF\u3400-\u4DBF]/);
    if (directKanji) {
      setActiveQuery(directKanji[0]);
      speechService.speak(directKanji[0]);
      applyPreferredTab(preferredTab);
      return;
    }
    showToast(
      `Không tìm thấy chữ khớp với "${q}". Hãy thử Kanji (鬱, 語), Romaji (yuuutsu), Hán Việt (Uất) hoặc dán cả câu Nhật.`
    );
  };

  const handleBookmarkMainKanji = () => {
    const firstOn = dossier.onCompounds[0];
    const firstKun = dossier.kunCompounds[0];
    const sampleSentence =
      firstOn?.exampleJa || firstKun?.exampleJa || `${dossier.character}は大切な漢字です。`;
    const sampleTranslation =
      firstOn?.exampleVi ||
      firstKun?.exampleVi ||
      `${dossier.character} (${dossier.sinoVietnamese}): ${dossier.meaning}`;

    const added = srsVaultService.toggleBookmark({
      japanese: dossier.character,
      reading: [...dossier.onyomi, ...dossier.kunyomi].filter(Boolean).join(' / '),
      vietnamese: `[${dossier.sinoVietnamese}] ${dossier.meaning} — Mẹo: ${dossier.etymology.threeSecondHook}`,
      type: 'kanji',
      level: dossier.level,
      contextSentence: sampleSentence,
      contextTranslation: sampleTranslation,
      source: 'Vũ Trụ Hán Tự (FSRS Sync)',
      tags: ['Kanji Universe', dossier.level, dossier.mainRadical],
    });
    setSrsVersion((v) => v + 1);
    speechService.playSuccessSound();
    showToast(
      added
        ? `Đã đồng bộ【${dossier.character}】vào Phòng Luyện Trí Nhớ FSRS (Offline)!`
        : `Đã gỡ【${dossier.character}】khỏi danh sách FSRS.`
    );
  };

  const handleBookmarkJukugo = (item: JukugoCompoundItem) => {
    const added = srsVaultService.toggleBookmark({
      japanese: item.word,
      reading: `${item.reading} (${item.romaji})`,
      vietnamese: `[${item.sinoVietnamese}] ${item.meaning}`,
      type: 'vocab',
      level: item.jlpt,
      contextSentence: item.exampleJa,
      contextTranslation: item.exampleVi,
      source: `Vũ Trụ Hán Tự · Gốc ${dossier.character}`,
      tags: ['Jukugo', item.jlpt, dossier.character],
    });
    setSrsVersion((v) => v + 1);
    speechService.playSuccessSound();
    showToast(
      added
        ? `Đã lưu từ ghép「${item.word}」vào FSRS!`
        : `Đã gỡ「${item.word}」khỏi FSRS.`
    );
  };

  const handleExpandThreeSiblings = () => {
    const shown = expandedSiblings.map((s) => s.character);
    const nextThree = expandThreeSiblingKanji(dossier.character, expansionAxis, shown);
    if (nextThree.length === 0) {
      showToast('Đã mở rộng hết các chữ đồng hệ khả dụng cho nhánh này!');
      return;
    }
    setExpandedSiblings((prev) => [...prev, ...nextThree]);
    speechService.playSuccessSound();
  };

  const handleGenerateAiDeeperStory = async () => {
    setIsGeneratingAiStory(true);
    try {
      const radText = dossier.radicals.map((r) => `${r.char} (${r.name}: ${r.meaning})`).join(' + ');
      const reply = await callGemini(
        `Hãy giải thích ngắn gọn (3-4 câu tiếng Việt sắc bén, giàu hình ảnh) về từ nguyên Giáp cốt văn/Kim văn và câu chuyện liên tưởng để nhớ vĩnh viễn chữ Hán "${dossier.character}" (Âm Hán Việt: ${dossier.sinoVietnamese}, Nghĩa: ${dossier.meaning}, Bộ thủ: ${radText}).`,
        'Bạn là chuyên gia từ nguyên học Hán tự Nhật Bản. Trả lời cô đọng, chuẩn xác, không rườm rà.'
      );
      setAiDeepStory(reply.trim());
    } catch {
      setAiDeepStory(
        `${dossier.etymology.deepLogic} Điểm neo thị giác: Hãy liên kết bộ [${dossier.radicals
          .map((r) => r.char)
          .join(' + ')}] thành một khung cảnh chuyển động duy nhất gắn với nghĩa "${dossier.meaning}".`
      );
    } finally {
      setIsGeneratingAiStory(false);
    }
  };

  const handleRateInlineFsrs = (card: SrsCardItem, quality: number) => {
    srsVaultService.reviewCard(card.id, quality);
    speechService.playSuccessSound();
    setFsrsFlipped(false);
    setSrsVersion((v) => v + 1);
    const remaining = srsVaultService.getDueCards();
    if (fsrsIndex >= remaining.length) setFsrsIndex(0);
  };

  const activeFsrsQueue = dueSrsCards.length > 0 ? dueSrsCards : allSrsCards;
  const activeFsrsCard = activeFsrsQueue[fsrsIndex % Math.max(1, activeFsrsQueue.length)] || null;

  const displayedJukugo = useMemo(() => {
    if (jukugoTab === 'on') return dossier.onCompounds;
    if (jukugoTab === 'kun') return dossier.kunCompounds;
    return [...dossier.onCompounds, ...dossier.kunCompounds];
  }, [dossier, jukugoTab]);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      {/* ===================================================================== */}
      {/* DEDICATED DISTRACTION-FREE TOP WORKSPACE BAR (3-Zone Clean Contract) */}
      {/* ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800/90">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Back + Standalone Brand Title */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onExit}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0">
              Vũ Trụ Hán Tự
            </h1>
          </div>

          {/* Zone 2: Omnipotent Search Gateway (Desktop) */}
          <div className="flex-1 max-w-xl hidden md:block">
            <OmnipotentKanjiGateway
              variant="header"
              currentQuery={dossier.character}
              onSelectTarget={(q, tab) => handleSelectKanji(q, tab)}
            />
          </div>

          {/* Zone 3: FSRS Inline Review Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsFsrsDrawerOpen((v) => !v)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isFsrsDrawerOpen
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-slate-900 border-slate-700 text-emerald-300 hover:border-emerald-500/60'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>Ôn tập FSRS</span>
              <span className="font-mono tabular-nums text-[11px] opacity-90">
                ({dueSrsCards.length > 0 ? `${dueSrsCards.length} đến hạn` : `${allSrsCards.length} thẻ`})
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Gateway Search + JLPT Level Quick Selector Rail */}
        <div className="border-t border-slate-800/70 bg-[#080d18]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center gap-2.5">
            <div className="md:hidden w-full">
              <OmnipotentKanjiGateway
                variant="header"
                currentQuery={dossier.character}
                onSelectTarget={(q, tab) => handleSelectKanji(q, tab)}
                placeholder="Gõ 鬱, yuuutsu, Uất hoặc dán cả câu Nhật..."
              />
            </div>

            {/* JLPT Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg shrink-0 self-start sm:self-auto">
              {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    levelFilter === lvl
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl === 'ALL' ? 'N5–N1' : lvl}
                </button>
              ))}
            </div>

            {/* Horizontal Instant Omniverse + Kanji Picker Strip */}
            <div className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-0.5">
              {(
                [
                  { q: '鬱', label: '鬱 UẤT' },
                  { q: '語', label: '語 NGỮ' },
                  { q: 'hakaru', label: 'はかる Đồng âm' },
                  { q: '半額', label: '半額 Siêu thị' },
                  { q: '注意', label: '注意 Biển báo' },
                ] as const
              ).map((preset) => (
                <button
                  key={preset.q}
                  type="button"
                  onClick={() => handleSelectKanji(preset.q)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeQuery.toLowerCase() === preset.q.toLowerCase()
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-slate-900/90 border-slate-700 text-amber-300/90 hover:border-amber-400/60'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
              {quickCandidates.map((item) => {
                const isActive = item.character === dossier.character;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectKanji(item.character)}
                    className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-indigo-600/25 border-indigo-500 text-white font-semibold'
                        : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="font-mincho text-sm">{item.character}</span>
                    <span className="text-[11px] text-slate-400">{item.sinoVietnamese}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-indigo-500/60 text-xs font-medium text-white shadow-xl animate-fadeIn">
          {toastMsg}
        </div>
      )}

      {/* ===================================================================== */}
      {/* INLINE OFFLINE FSRS REVIEW DRAWER (1-Click Sync Without Leaving)       */}
      {/* ===================================================================== */}
      {isFsrsDrawerOpen && (
        <section className="border-b border-slate-800 bg-[#0a101f] animate-fadeIn">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-white">
                  Phòng Luyện Trí Nhớ FSRS (Offline SM-2)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tổng {allSrsCards.length} thẻ đã lưu · {dueSrsCards.length} thẻ đến hạn ôn tập theo đường cong quên lãng Ebbinghaus
                </p>
              </div>
              <div className="flex items-center gap-2">
                {onOpenFullSrsModal && (
                  <button
                    type="button"
                    onClick={onOpenFullSrsModal}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Mở Kho Anki Toàn Diện
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsFsrsDrawerOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium cursor-pointer whitespace-nowrap shrink-0"
                >
                  Thu gọn
                </button>
              </div>
            </div>

            {activeFsrsCard ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <div
                  onClick={() => setFsrsFlipped((f) => !f)}
                  className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 cursor-pointer hover:border-indigo-500/50 transition-colors flex flex-col justify-between min-h-[168px]"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {activeFsrsCard.level} · {activeFsrsCard.type === 'kanji' ? 'Hán tự' : 'Từ ghép'} · Chu kỳ hiện tại {activeFsrsCard.interval} ngày
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speechService.speak(activeFsrsCard.japanese);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                      aria-label="Nghe phát âm thẻ FSRS"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="py-3 text-center space-y-2">
                    <div className="text-4xl font-mincho font-bold text-white">
                      {activeFsrsCard.japanese}
                    </div>
                    {fsrsFlipped ? (
                      <div className="space-y-1.5 animate-fadeIn">
                        <div className="text-sm text-indigo-300 font-medium">{activeFsrsCard.reading}</div>
                        <div className="text-sm text-slate-200">{activeFsrsCard.vietnamese}</div>
                        <div className="text-xs text-slate-400 italic">
                          {activeFsrsCard.contextSentence} — {activeFsrsCard.contextTranslation}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Nhấp vào thẻ để lật xem đáp án & ví dụ</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 flex flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-slate-300">Chấm mức độ ghi nhớ (SM-2)</div>
                    <p className="text-xs text-slate-400">
                      Hệ thống tự tính lại lịch ôn tiếp theo và lưu trực tiếp xuống bộ nhớ trình duyệt.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => handleRateInlineFsrs(activeFsrsCard, 1)}
                      className="py-2 px-3 rounded-lg bg-rose-950/70 border border-rose-700/60 hover:bg-rose-900/70 text-rose-200 text-xs font-semibold cursor-pointer"
                    >
                      Quên (1 ngày)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRateInlineFsrs(activeFsrsCard, 3)}
                      className="py-2 px-3 rounded-lg bg-amber-950/60 border border-amber-700/60 hover:bg-amber-900/60 text-amber-200 text-xs font-semibold cursor-pointer"
                    >
                      Khó
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRateInlineFsrs(activeFsrsCard, 4)}
                      className="py-2 px-3 rounded-lg bg-indigo-950/70 border border-indigo-600/60 hover:bg-indigo-900/70 text-indigo-200 text-xs font-semibold cursor-pointer"
                    >
                      Nhớ tốt
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRateInlineFsrs(activeFsrsCard, 5)}
                      className="py-2 px-3 rounded-lg bg-emerald-950/70 border border-emerald-600/60 hover:bg-emerald-900/70 text-emerald-200 text-xs font-semibold cursor-pointer"
                    >
                      Quá dễ
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-slate-800 text-center text-xs text-slate-400">
                Chưa có thẻ nào trong kho FSRS. Hãy bấm nút "Lưu vào FSRS" ở chữ Hán hoặc từ ghép để bắt đầu.
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* MAIN 360° ZEN GRID WORKSPACE                                          */}
      {/* ===================================================================== */}
      <main
        key={dossier.sinoProfile.sandboxSignature}
        className={`flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 transition-opacity duration-150 ${
          isFading ? 'opacity-70' : 'opacity-100'
        }`}
      >
        {/* CENTERPIECE 360° KANJI ANCHOR HERO */}
        <section className="rounded-2xl border border-slate-800 bg-[#0b1120] p-6 sm:p-7 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Giant Centerpiece Glyph + Core Truth-Locked Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl border border-slate-700/80 bg-[#070b14] flex items-center justify-center shrink-0">
                <span className="text-7xl sm:text-8xl font-mincho font-bold text-white leading-none select-all">
                  {dossier.character}
                </span>
              </div>

              <div className="space-y-2.5">
                {/* Unboxed Zero-Pill Metadata + Truth-Lock & 200% Auto-Audit Verification */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono tabular-nums">
                  <span className="text-indigo-300 font-semibold">JLPT {dossier.level}</span>
                  <span aria-hidden="true">·</span>
                  <span>{dossier.strokeCount} nét</span>
                  <span aria-hidden="true">·</span>
                  <span>Bộ {dossier.mainRadical}</span>
                  {omniverse.audit200.allPassed && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-400 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Chuẩn Hán Nôm ({dossier.sinoProfile.dictionarySources})
                      </span>
                    </>
                  )}
                </div>

                {/* Primary Sino-Vietnamese Centerpiece (Truth-Locked) */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      {dossier.sinoVietnamese}
                    </h2>
                    <span className="text-base sm:text-lg text-slate-300 font-normal">
                      {dossier.meaning}
                    </span>
                  </div>

                  {/* Subtle Secondary / Can-Chi Reference (Demoted from primary center) */}
                  {(dossier.sinoProfile.canChiWarning ||
                    dossier.sinoProfile.secondaryWarnings.length > 0) && (
                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      {dossier.sinoProfile.canChiWarning && (
                        <span>{dossier.sinoProfile.canChiWarning}</span>
                      )}
                      {dossier.sinoProfile.secondaryWarnings.map((sw, idx) => (
                        <span key={idx}>{sw}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* On'yomi & Kun'yomi triggers */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm pt-1">
                  <button
                    type="button"
                    onClick={() => speechService.speak(dossier.onyomi[0] || dossier.character)}
                    className="inline-flex items-center gap-1.5 text-slate-200 hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-slate-400">Âm On:</span>
                    <span className="font-jp font-semibold">
                      {dossier.onyomi.length > 0 ? dossier.onyomi.join(' · ') : '—'}
                    </span>
                  </button>

                  <span className="text-slate-700" aria-hidden="true">/</span>

                  <button
                    type="button"
                    onClick={() =>
                      speechService.speak(
                        (dossier.kunyomi[0] || dossier.character).replace(/[.-]/g, '')
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-slate-200 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-400">Âm Kun:</span>
                    <span className="font-jp font-semibold">
                      {dossier.kunyomi.length > 0 ? dossier.kunyomi.join(' · ') : '—'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: 1-Click FSRS Sync */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0 max-w-full">
              <button
                type="button"
                onClick={handleBookmarkMainKanji}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isMainKanjiBookmarked
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 hover:bg-emerald-900/60'
                    : 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500'
                }`}
              >
                {isMainKanjiBookmarked ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                <span>
                  {isMainKanjiBookmarked ? 'Đã đồng bộ FSRS (Nhấp để gỡ)' : 'Lưu hồ sơ vào FSRS'}
                </span>
              </button>
            </div>
          </div>

          {/* Pillar 4: Sino-Vietnamese Contextual Disambiguation Alert ("Biển báo Cảnh giác") */}
          {dossier.sinoProfile.contextualAlert && (
            <div className="rounded-xl border border-amber-500/35 bg-amber-950/20 px-4 py-2.5 flex items-start gap-2.5 text-xs text-amber-100 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div>{dossier.sinoProfile.contextualAlert}</div>
                {dossier.sinoProfile.exampleCompound && (
                  <div className="text-[11px] text-amber-200/80 font-jp">
                    Ví dụ chuẩn: {dossier.sinoProfile.exampleCompound}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ================================================================= */}
        {/* HEXA-ZEN 6-TAB EXCLUSIVE NAVIGATION BAR ("LỤC GIÁC ZEN")          */}
        {/* ================================================================= */}
        <nav
          aria-label="Lục Giác Zen — Điều hướng 6 phân trạm"
          className="rounded-2xl border border-slate-800/90 bg-[#0b1120]/95 p-1.5 shadow-lg"
        >
          <div
            role="tablist"
            aria-label="6 Phân trạm Vũ Trụ Hán Tự"
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin"
          >
            {HEXA_ZEN_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-fit px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-indigo-600/25 border-indigo-400 text-white font-semibold'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-300' : 'text-slate-500'}`} />
                  <span>
                    [{tab.step}] {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ================================================================= */}
        {/* EXCLUSIVE SINGLE-STATION STAGE (ONLY 1 ACTIVE TAB AT A TIME)      */}
        {/* ================================================================= */}
        <div key={`${dossier.character}_${activeTab}`} className="animate-fadeIn">
          {/* TAB 1: [1] CHIẾT TỰ + CORE JUKUGO PITCH + CORNER JLPT TRAP ALERT */}
          {activeTab === 'etymology' && (
            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-800 bg-[#0b1120] p-6 space-y-6">
                <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      [1] Ma Trận Chiết Tự & Từ Nguyên Học
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Xuyên không Giáp Cốt Văn ➔ Giải phẫu bộ thủ ➔ Khắc sâu câu chuyện 3 giây
                    </p>
                  </div>
                </div>

                {/* Time-Travel Evolution + Radical Decomposition Balanced 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-6 space-y-4">
                    {/* Time-Travel Evolution Strip: Oracle Bone -> Bronze -> Seal -> Modern */}
                    <div className="grid grid-cols-4 gap-2.5 text-center">
                      <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3 space-y-1.5">
                        <svg viewBox="0 0 100 100" className="w-12 h-12 mx-auto text-amber-300">
                          {dossier.etymology.oracleSvgPaths.map((d, idx) => (
                            <path
                              key={idx}
                              d={d}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          ))}
                        </svg>
                        <div className="text-[11px] font-medium text-amber-300">Giáp Cốt Văn</div>
                      </div>

                      <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3 space-y-1.5">
                        <svg viewBox="0 0 100 100" className="w-12 h-12 mx-auto text-indigo-300">
                          {dossier.etymology.bronzeSvgPaths.map((d, idx) => (
                            <path
                              key={idx}
                              d={d}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          ))}
                        </svg>
                        <div className="text-[11px] font-medium text-indigo-300">Kim Văn</div>
                      </div>

                      <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3 space-y-1.5 flex flex-col items-center justify-between">
                        <div className="h-12 flex items-center justify-center text-3xl font-serif text-slate-300 tracking-widest scale-y-110">
                          {dossier.character}
                        </div>
                        <div className="text-[11px] font-medium text-slate-300">Tiểu Triện</div>
                      </div>

                      <div className="rounded-xl border border-indigo-500/40 bg-[#070b14] p-3 space-y-1.5 flex flex-col items-center justify-between">
                        <div className="h-12 flex items-center justify-center text-3xl font-mincho font-bold text-white">
                          {dossier.character}
                        </div>
                        <div className="text-[11px] font-medium text-white">Khải Thư</div>
                      </div>
                    </div>

                    {/* Evolution notes */}
                    <div className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                      <p>
                        <strong className="text-slate-200">Khởi nguyên:</strong>{' '}
                        {dossier.etymology.oracleBoneNote}
                      </p>
                      <p>
                        <strong className="text-slate-200">Diễn biến:</strong>{' '}
                        {dossier.etymology.bronzeScriptNote}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    {/* Radical Decomposition */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-semibold text-slate-300">
                        Giải phẫu Bộ thủ cấu thành
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {dossier.radicals.map((rad, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl border border-slate-800 bg-[#070b14] p-3 flex items-start gap-3"
                          >
                            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xl font-mincho text-indigo-300 shrink-0">
                              {rad.char}
                            </div>
                            <div className="min-w-0 space-y-0.5">
                              <div className="text-xs font-semibold text-white truncate">{rad.name}</div>
                              <div className="text-[11px] text-slate-400">
                                {rad.role} · {rad.position}
                              </div>
                              <div className="text-xs text-slate-300 leading-snug">{rad.meaning}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3-Second Neuro-Mnemonic Hook */}
                    <div className="rounded-xl border border-amber-500/35 bg-amber-950/20 p-4 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-amber-300">
                          Câu chuyện liên tưởng 3 giây
                        </span>
                        <button
                          type="button"
                          onClick={handleGenerateAiDeeperStory}
                          disabled={isGeneratingAiStory}
                          className="text-[11px] font-medium text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{isGeneratingAiStory ? 'Đang phân tích...' : 'Khai thác sâu hơn'}</span>
                        </button>
                      </div>
                      <p className="text-sm text-amber-50 font-medium leading-relaxed">
                        {dossier.etymology.threeSecondHook}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {aiDeepStory || dossier.etymology.deepLogic}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Natural Cognitive Continuation: Core Jukugo (Furigana + Pitch Accent) + Corner Rose JLPT Trap Alert */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Left 7 cols: Instant Core Jukugo Strip with Furigana & Pitch Accent */}
                <section className="xl:col-span-7 rounded-2xl border border-slate-800 bg-[#0b1120] p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-white">
                        Từ Ghép Cốt Lõi (Furigana & Pitch Accent)
                      </h4>
                      <p className="text-xs text-slate-400">
                        Ứng dụng ngay sau khi hiểu gốc chữ【{dossier.character}】
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('jukugo')}
                      className="text-xs font-medium text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Xem toàn bộ ({dossier.onCompounds.length + dossier.kunCompounds.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[...dossier.onCompounds, ...dossier.kunCompounds].slice(0, 4).map((item) => (
                      <div
                        key={item.word}
                        className="rounded-xl border border-slate-800 bg-[#070b14] p-4 space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[11px] font-mono text-slate-400">
                              {item.readingType === 'on' ? 'Âm On' : 'Âm Kun'} · {item.jlpt} · {item.sinoVietnamese}
                            </div>
                            <div className="flex items-baseline gap-2 mt-0.5">
                              <span className="text-xl font-mincho font-bold text-white">{item.word}</span>
                              <span className="text-xs font-jp text-indigo-300">{item.reading}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => speechService.speak(item.word)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer shrink-0"
                            aria-label={`Nghe ${item.word}`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-xs font-medium text-slate-200">{item.meaning}</div>
                        <PitchAccentMiniSvg
                          reading={item.reading}
                          pitchType={item.pitchType}
                          pitchAccentNum={item.pitchAccentNum}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Right 5 cols: Thin Crimson-Bordered Corner JLPT Trap Alert */}
                <aside className="xl:col-span-5 rounded-2xl border border-rose-500/40 bg-[#0b1120] p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          Cảnh Báo Bẫy JLPT — Góc Nhận Diện Nhanh
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {dossier.twinTrapGroupTitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {dossier.twinTraps.slice(0, 3).map((twin) => {
                      const isCurrent = twin.character === dossier.character;
                      return (
                        <button
                          key={twin.character}
                          type="button"
                          onClick={() => handleSelectKanji(twin.character)}
                          className={`w-full text-left rounded-xl border p-3 flex items-start gap-3 transition-colors cursor-pointer ${
                            isCurrent
                              ? 'border-indigo-500/60 bg-indigo-950/20'
                              : 'border-slate-800 bg-[#070b14] hover:border-rose-500/40'
                          }`}
                        >
                          <span className="text-2xl font-mincho font-bold text-white shrink-0">
                            {twin.character}
                          </span>
                          <div className="min-w-0 space-y-0.5 text-xs">
                            <div className="font-semibold text-slate-100">
                              {twin.sinoVietnamese} · {twin.meaning}
                            </div>
                            <div className="text-[11px] text-amber-200/90 leading-snug">
                              {twin.microDifference}
                            </div>
                            <div className="text-[11px] text-rose-300/90 leading-snug">
                              {twin.trapNote}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('jukugo')}
                    className="w-full py-2 px-3 rounded-xl border border-rose-500/35 bg-rose-950/20 hover:bg-rose-950/35 text-xs font-medium text-rose-200 inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Mở Radar Đối Chiếu Đầy Đủ & Biến Âm</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </aside>
              </div>
            </div>
          )}

          {/* TAB 2: [2] TỪ GHÉP & BẪY (FULL JUKUGO + JLPT TRAP RADAR) */}
          {activeTab === 'jukugo' && (
            <section className="rounded-2xl border border-slate-800 bg-[#0b1120] p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    [2] Hệ Sinh Thái Từ Ghép (Jukugo) & Radar Chống Bẫy JLPT
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Phân loại rạch ròi Âm On / Âm Kun · Sơ đồ Pitch Accent · Cảnh báo Biến âm & Bảng đối chiếu Sinh đôi 1:1
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
                    {(
                      [
                        { id: 'all', label: `Tất cả (${dossier.onCompounds.length + dossier.kunCompounds.length})` },
                        { id: 'on', label: `Âm On (${dossier.onCompounds.length})` },
                        { id: 'kun', label: `Âm Kun (${dossier.kunCompounds.length})` },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setJukugoTab(t.id)}
                        className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          jukugoTab === t.id
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Left 7 cols: Jukugo Compounds List */}
                <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayedJukugo.map((item) => {
                    const isSaved = srsVaultService.isBookmarked(item.word);
                    return (
                      <article
                        key={item.word}
                        className="rounded-xl border border-slate-800 bg-[#070b14] p-4 flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-[11px] font-mono text-slate-400">
                                {item.readingType === 'on' ? 'Âm On (Hán-Nhật)' : 'Âm Kun (Thuần Nhật)'} ·{' '}
                                {item.jlpt} · {item.sinoVietnamese}
                              </div>
                              <div className="flex items-baseline gap-2.5 mt-1">
                                <span className="text-2xl font-mincho font-bold text-white">
                                  {item.word}
                                </span>
                                <span className="text-xs font-jp text-indigo-300">
                                  {item.reading}
                                </span>
                                <span className="text-[11px] font-mono text-slate-400">
                                  ({item.romaji})
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => speechService.speak(item.word)}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                                aria-label={`Nghe phát âm ${item.word}`}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleBookmarkJukugo(item)}
                                className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                                  isSaved
                                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-600/50'
                                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white'
                                }`}
                                aria-label={`Lưu ${item.word} vào FSRS`}
                              >
                                {isSaved ? (
                                  <BookmarkCheck className="w-3.5 h-3.5" />
                                ) : (
                                  <Bookmark className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="text-sm font-medium text-slate-100">{item.meaning}</div>

                          {/* Pitch Accent Diagram */}
                          <div className="pt-1">
                            <PitchAccentMiniSvg
                              reading={item.reading}
                              pitchType={item.pitchType}
                              pitchAccentNum={item.pitchAccentNum}
                            />
                          </div>

                          {/* Crimson Rendaku / Sokuon Alert */}
                          {item.rendakuAlert && (
                            <div className="rounded-lg border border-rose-500/50 bg-rose-950/35 p-2.5 text-xs space-y-1">
                              <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                <span>{item.rendakuAlert.rule}: {item.rendakuAlert.highlightedPair}</span>
                              </div>
                              <p className="text-rose-100/90 leading-relaxed text-[11px]">
                                {item.rendakuAlert.explanation}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Real-life Short Example */}
                        <div className="pt-2.5 border-t border-slate-800/80 text-xs space-y-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-jp text-slate-200">{item.exampleJa}</span>
                            <button
                              type="button"
                              onClick={() => speechService.speak(item.exampleJa)}
                              className="text-slate-400 hover:text-indigo-300 shrink-0 cursor-pointer"
                              aria-label="Nghe câu ví dụ"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-slate-400">{item.exampleVi}</div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Right 5 cols: JLPT Lookalike "Twin" Trap Radar (1:1 Comparison Table) */}
                <div className="xl:col-span-5 rounded-xl border border-rose-500/40 bg-[#070b14] p-4 sm:p-5 space-y-3.5">
                  <div className="flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {dossier.twinTrapGroupTitle}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Đối chiếu trực diện 1:1 các Hán tự dễ nhầm. Nhấp vào chữ để chuyển tâm điểm.
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="py-2 pr-2 font-medium">Chữ</th>
                          <th className="py-2 px-2 font-medium">Khác biệt vi mô</th>
                          <th className="py-2 pl-2 font-medium">Nghĩa & Bẫy JLPT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70">
                        {dossier.twinTraps.map((twin) => {
                          const isCurrent = twin.character === dossier.character;
                          return (
                            <tr
                              key={twin.character}
                              onClick={() => handleSelectKanji(twin.character)}
                              className={`cursor-pointer transition-colors ${
                                isCurrent ? 'bg-indigo-950/35' : 'hover:bg-slate-900/70'
                              }`}
                            >
                              <td className="py-3 pr-2 align-top whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-2xl font-mincho font-bold ${
                                      isCurrent ? 'text-indigo-300' : 'text-white'
                                    }`}
                                  >
                                    {twin.character}
                                  </span>
                                  <div>
                                    <div className="font-semibold text-slate-200">
                                      {twin.sinoVietnamese}
                                    </div>
                                    <div className="text-[11px] text-slate-400 font-mono">
                                      {twin.level}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-2 align-top text-amber-200/90 leading-snug">
                                {twin.microDifference}
                              </td>
                              <td className="py-3 pl-2 align-top space-y-1">
                                <div className="font-medium text-white">{twin.meaning}</div>
                                <div className="text-[11px] text-slate-400 font-jp">
                                  On: {twin.onyomi} · Kun: {twin.kunyomi}
                                </div>
                                <div className="text-[11px] text-rose-300/90 leading-snug">
                                  {twin.trapNote}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 3: [3] ĐỒNG ÂM & SẮC THÁI (SPLIT-CARD HOMOPHONE MATRIX) */}
          {activeTab === 'homophone' && (
            <HomophoneMatrixPanel
              cluster={omniverse.homophoneCluster}
              activeChar={dossier.character}
              jlptFilter={levelFilter}
              onSelectKanji={(ch) => handleSelectKanji(ch, 'all')}
              onTriggerHomophoneSearch={(q) => handleSelectKanji(q, 'homophone')}
              onSrsMutated={() => setSrsVersion((v) => v + 1)}
            />
          )}

          {/* TAB 4: [4] ĐA PHÔNG & ĐỜI THỰC */}
          {activeTab === 'multifont' && (
            <MultiFontImmersionPanel
              profile={omniverse.multiFont}
              scenes={omniverse.realWorldScenes}
              onTriggerScenePreset={(q) => handleSelectKanji(q, 'multifont')}
            />
          )}

          {/* TAB 5: [5] KHẢO THÍ ÁP LỰC (REFRAMED ZEN 4D MINI-GAME) */}
          {activeTab === 'pressure' && (
            <KanjiPressureAssessmentPanel
              payload={omniverse.pressureCore}
              onFsrsSynced={(msg) => {
                setSrsVersion((v) => v + 1);
                showToast(msg);
              }}
            />
          )}

          {/* TAB 6: [6] +3 ĐỒNG HỆ (BONUS VOCABULARY EXPANSION STATION) */}
          {activeTab === 'expansion' && (
            <section className="rounded-2xl border border-slate-800 bg-[#0b1120] p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    [6] Kho Thưởng Mở Rộng Từ Vựng (+3 Kanji Đồng Hệ)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Nạp sẵn 0ms các chữ Hán cùng bộ thủ hoặc cùng âm đọc từ【{dossier.character}】— học 1 biết 10
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Axis Switcher */}
                  <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setExpansionAxis('radical')}
                      className={`px-3 py-1 rounded-md font-medium cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                        expansionAxis === 'radical'
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Cùng Bộ Thủ ({dossier.mainRadical})
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpansionAxis('reading')}
                      className={`px-3 py-1 rounded-md font-medium cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                        expansionAxis === 'reading'
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Cùng Âm Đọc
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleExpandThreeSiblings}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+3 Kanji Đồng hệ</span>
                  </button>
                </div>
              </div>

              {expandedSiblings.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-800 bg-[#070b14] p-6 text-center text-xs text-slate-400">
                  Không tìm thấy thêm chữ đồng hệ nào khác cho trục này. Hãy chuyển sang trục còn lại!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {expandedSiblings.map((sib) => {
                    const sibSaved = srsVaultService.isBookmarked(sib.character);
                    return (
                      <div
                        key={sib.character}
                        onClick={() => handleSelectKanji(sib.character, 'all')}
                        className="rounded-xl border border-slate-800 hover:border-indigo-500/60 bg-[#070b14] p-4 flex items-start justify-between gap-3 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl font-mincho font-bold text-white shrink-0 group-hover:text-indigo-300 transition-colors">
                            {sib.character}
                          </div>
                          <div className="min-w-0 space-y-1">
                            <div className="text-[11px] font-mono text-indigo-300 truncate">
                              {sib.connectionReason} · {sib.level} · {sib.strokeCount} nét
                            </div>
                            <div className="text-sm font-semibold text-white truncate">
                              {sib.sinoVietnamese} — {sib.meaning}
                            </div>
                            <div className="text-xs text-slate-400 font-jp truncate">
                              On: {sib.onyomi[0] || '—'} · Kun: {sib.kunyomi[0] || '—'}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              srsVaultService.toggleBookmark({
                                japanese: sib.character,
                                reading: [...sib.onyomi, ...sib.kunyomi].filter(Boolean).join(' / '),
                                vietnamese: `[${sib.sinoVietnamese}] ${sib.meaning}`,
                                type: 'kanji',
                                level: sib.level,
                                contextSentence: `${sib.character} (${sib.connectionReason})`,
                                contextTranslation: sib.meaning,
                                source: 'Mạng lưới +3 Kanji Đồng hệ',
                                tags: ['Kanji Sibling', sib.level],
                              });
                              setSrsVersion((v) => v + 1);
                              speechService.playSuccessSound();
                            }}
                            className={`p-1.5 rounded-lg cursor-pointer ${
                              sibSaved
                                ? 'bg-emerald-950/70 text-emerald-300'
                                : 'bg-slate-900 text-slate-400 hover:text-white'
                            }`}
                            aria-label={`Lưu ${sib.character} vào FSRS`}
                          >
                            {sibSaved ? (
                              <BookmarkCheck className="w-3.5 h-3.5" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
