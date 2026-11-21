import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Volume2,
  Square,
  BookmarkPlus,
  Check,
  Eye,
  EyeOff,
  AlignJustify,
  Columns2,
  Loader2,
  Layers,
  X,
} from 'lucide-react';
import {
  BunkoLevel,
  BunkoSentence,
  BunkoWork,
  SyntaxSegment,
  omniverseStorageService,
} from '../../services/omniverseStorageService';
import {
  INITIAL_BUNKO_WORKS,
  expandThreeBunkoMetaphors,
  expandThreeBunkoWorks,
} from '../../services/omniverseExpansionEngine';
import { speechService } from '../../services/speechService';
import { srsVaultService } from '../../services/srsVaultService';
import { SanctuaryRoomFrame } from './SanctuaryRoomFrame';

interface BunkoTeahouseViewProps {
  isDark: boolean;
  onSrsUpdated: () => void;
}

const LEVELS: BunkoLevel[] = ['N4', 'N3', 'N2', 'N1'];
const LEVEL_LABELS: Record<BunkoLevel, string> = {
  N4: 'N4 · Mộc mạc dễ đọc',
  N3: 'N3 · Tự nhiên đời sống',
  N2: 'N2 · Chiều sâu văn chương',
  N1: 'N1 · Nguyên bản tinh hoa',
};

export const BunkoTeahouseView: React.FC<BunkoTeahouseViewProps> = ({ isDark, onSrsUpdated }) => {
  const [works, setWorks] = useState<BunkoWork[]>(INITIAL_BUNKO_WORKS);
  const [activeWorkId, setActiveWorkId] = useState<string>(INITIAL_BUNKO_WORKS[0].id);
  const [levelIdx, setLevelIdx] = useState<number>(2); // Default N2
  const [isTategaki, setIsTategaki] = useState<boolean>(true);
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(null);
  const [playingSentenceIdx, setPlayingSentenceIdx] = useState<number | null>(null);

  const [isExpandingWorks, setIsExpandingWorks] = useState(false);
  const [isExpandingMetaphors, setIsExpandingMetaphors] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [savedTerms, setSavedTerms] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      await omniverseStorageService.registerSeedHashes(
        'bunko_work',
        INITIAL_BUNKO_WORKS.map((w) => `${w.titleJp}_${w.authorJp}`)
      );
      const state = await omniverseStorageService.loadState();
      if (!mounted) return;
      if (state.bunkoWorks.length > 0) {
        setWorks(state.bunkoWorks);
        setActiveWorkId(state.bunkoWorks[0].id);
      } else {
        state.bunkoWorks = INITIAL_BUNKO_WORKS;
        await omniverseStorageService.saveState(state);
      }
    })();

    return () => {
      mounted = false;
      speechService.stop();
    };
  }, []);

  const activeLevel = LEVELS[levelIdx] || 'N2';
  const activeWork = works.find((w) => w.id === activeWorkId) || works[0];
  const sentences: BunkoSentence[] =
    activeWork.levels[activeLevel]?.length > 0
      ? activeWork.levels[activeLevel]
      : activeWork.levels.N1;

  const inspectedSentence =
    sentences.find((s) => s.id === selectedSentenceId) || sentences[0] || null;

  const stopAudiobook = () => {
    speechService.stop();
    setPlayingSentenceIdx(null);
  };

  const playSynchronizedAudiobook = (startIndex = 0) => {
    if (!sentences[startIndex]) {
      setPlayingSentenceIdx(null);
      return;
    }
    setPlayingSentenceIdx(startIndex);
    setSelectedSentenceId(sentences[startIndex].id);
    const s = sentences[startIndex];
    const speakText = s.tokens.map((t) => t.reading || t.text).join('');

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(speakText);
      utt.lang = 'ja-JP';
      utt.rate = 0.86;
      utt.onend = () => {
        if (startIndex + 1 < sentences.length) {
          playSynchronizedAudiobook(startIndex + 1);
        } else {
          setPlayingSentenceIdx(null);
        }
      };
      utt.onerror = () => setPlayingSentenceIdx(null);
      window.speechSynthesis.speak(utt);
    } else {
      speechService.speak(speakText, 0.86);
    }
  };

  const handleExpandThreeWorks = async () => {
    if (isExpandingWorks) return;
    setErrorBanner(null);
    setIsExpandingWorks(true);
    try {
      const fresh = await expandThreeBunkoWorks(
        activeLevel,
        works.map((w) => `${w.titleJp} (${w.authorJp})`)
      );
      if (fresh.length === 0) {
        setErrorBanner('Các tác phẩm vừa nhận bị trùng với kệ sách. Hãy nhấn lại để mở 3 kiệt tác mới.');
      } else {
        const nextWorks = [...fresh, ...works];
        setWorks(nextWorks);
        setActiveWorkId(fresh[0].id);
        setSelectedSentenceId(null);
        const state = await omniverseStorageService.loadState();
        state.bunkoWorks = nextWorks;
        await omniverseStorageService.saveState(state);
      }
    } catch (err: any) {
      setErrorBanner(err?.message || 'Chưa thể khai mở thêm 3 tuyệt phẩm văn học mới.');
    } finally {
      setIsExpandingWorks(false);
    }
  };

  const handleExpandThreeMetaphors = async () => {
    if (isExpandingMetaphors) return;
    setErrorBanner(null);
    setIsExpandingMetaphors(true);
    try {
      const fresh = await expandThreeBunkoMetaphors(
        activeWork,
        activeWork.metaphors.map((m) => m.term)
      );
      if (fresh.length > 0) {
        const nextWorks = works.map((w) =>
          w.id === activeWork.id ? { ...w, metaphors: [...w.metaphors, ...fresh] } : w
        );
        setWorks(nextWorks);
        const state = await omniverseStorageService.loadState();
        state.bunkoWorks = nextWorks;
        await omniverseStorageService.saveState(state);
      }
    } catch (err: any) {
      setErrorBanner(err?.message || 'Không thể khai quật thêm tầng ẩn dụ lúc này.');
    } finally {
      setIsExpandingMetaphors(false);
    }
  };

  const handleSaveToSrs = (term: string, reading: string, explanation: string, example: string) => {
    srsVaultService.addBookmark({
      japanese: term,
      reading,
      vietnamese: explanation,
      type: 'vocab',
      level: activeLevel,
      contextSentence: example,
      contextTranslation: explanation,
      source: `Phòng Đọc Bunko · ${activeWork.titleJp}`,
      tags: ['Bunko Teahouse', 'Mỹ học', activeLevel],
    });
    setSavedTerms((prev) => ({ ...prev, [term]: true }));
    onSrsUpdated();
  };

  const syntaxRoleStyle = (role: SyntaxSegment['role']) => {
    switch (role) {
      case 'subject':
        return isDark
          ? 'bg-sky-900/35 border-sky-700/50 text-sky-200'
          : 'bg-sky-50 border-sky-300/80 text-sky-900';
      case 'predicate':
        return isDark
          ? 'bg-rose-900/35 border-rose-700/50 text-rose-200'
          : 'bg-rose-50 border-rose-300/80 text-rose-900';
      case 'modifier':
        return isDark
          ? 'bg-emerald-900/35 border-emerald-700/50 text-emerald-200'
          : 'bg-emerald-50 border-emerald-300/80 text-emerald-900';
      case 'object':
        return isDark
          ? 'bg-amber-900/35 border-amber-700/50 text-amber-200'
          : 'bg-amber-50 border-amber-300/80 text-amber-900';
      default:
        return isDark
          ? 'bg-stone-800 border-stone-700 text-stone-200'
          : 'bg-stone-100 border-stone-300 text-stone-800';
    }
  };

  const panelClass = isDark
    ? 'bg-[#141923] border-stone-800/90 text-stone-100'
    : 'bg-[#fbf7ef] border-stone-200 text-stone-900';

  return (
    <SanctuaryRoomFrame
      isDark={isDark}
      wairoHex="#5B7A5E"
      academicPanelLabel="Kính Lúp Cú Pháp & Mỹ Học"
      headerSlot={
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <h2 className="font-mincho text-xl sm:text-2xl font-bold tracking-tight">
                  Phòng Đọc Văn Học Tí Hon
                </h2>
                <span className="font-jp text-sm font-medium" style={{ color: '#5B7A5E' }}>
                  文庫茶室 · Matcha 抹茶
                </span>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                Thưởng thức tản văn 3 phút trên giấy Washi · Nhấn bất kỳ câu nào để soi cú pháp X-Quang
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsTategaki((v) => !v)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isDark
                    ? 'border-stone-700 bg-stone-800/80 text-stone-100 hover:bg-stone-700'
                    : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-100'
                }`}
              >
                {isTategaki ? <Columns2 className="w-3.5 h-3.5" /> : <AlignJustify className="w-3.5 h-3.5" />}
                <span>{isTategaki ? '縦書き · Đọc Dọc' : '横書き · Đọc Ngang'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowFurigana((v) => !v)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  showFurigana
                    ? 'bg-[#5B7A5E]/20 border-[#5B7A5E]/60 text-emerald-700 dark:text-emerald-200'
                    : isDark
                    ? 'border-stone-700 text-stone-400 hover:bg-stone-800'
                    : 'border-stone-300 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {showFurigana ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>Furigana: {showFurigana ? 'Bật' : 'Ẩn'}</span>
              </button>

              <button
                type="button"
                onClick={() => (playingSentenceIdx !== null ? stopAudiobook() : playSynchronizedAudiobook(0))}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-opacity hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: playingSentenceIdx !== null ? '#A64444' : '#5B7A5E' }}
              >
                {playingSentenceIdx !== null ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{playingSentenceIdx !== null ? 'Dừng sách nói' : 'Sách nói đồng bộ'}</span>
              </button>
            </div>
          </div>

          {/* Adaptive Level Morph Slider */}
          <div className={`pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold">Biến Hình Cú Pháp:</span>
              <span className="font-bold" style={{ color: '#5B7A5E' }}>
                {LEVEL_LABELS[activeLevel]}
              </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-72">
              <span className="text-[11px] font-mono tabular-nums opacity-70">N4</span>
              <input
                type="range"
                min={0}
                max={3}
                step={1}
                value={levelIdx}
                aria-label={`Trình độ văn bản ${activeLevel}`}
                onChange={(e) => {
                  stopAudiobook();
                  setLevelIdx(Number(e.target.value));
                  setSelectedSentenceId(null);
                }}
                className="flex-1 accent-[#5B7A5E] cursor-pointer"
              />
              <span className="text-[11px] font-mono tabular-nums opacity-70">N1</span>
            </div>
          </div>
        </div>
      }
      experienceSlot={
        <>
          {errorBanner && (
            <div className={`rounded-xl border px-4 py-3 text-xs flex items-center justify-between gap-3 ${isDark ? 'bg-rose-950/40 border-rose-800/60 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
              <span>{errorBanner}</span>
              <button type="button" onClick={() => setErrorBanner(null)}><X className="w-4 h-4" /></button>
            </div>
          )}

          {/* Literary Shelf */}
          <div className="flex flex-wrap items-center gap-2">
            {works.map((w) => {
              const active = w.id === activeWork.id;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => {
                    stopAudiobook();
                    setActiveWorkId(w.id);
                    setSelectedSentenceId(null);
                  }}
                  style={active ? { backgroundColor: '#5B7A5E', borderColor: '#5B7A5E', color: '#ffffff' } : undefined}
                  className={`px-3.5 py-2 rounded-xl border text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'shadow-xs'
                      : isDark
                      ? 'bg-[#141923] border-stone-800 text-stone-300 hover:border-stone-700'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span className="font-mincho font-bold mr-1.5">{w.titleJp}</span>
                  <span className="opacity-80">· {w.authorVi}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleExpandThreeWorks}
              disabled={isExpandingWorks}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#5B7A5E]/20 border-[#5B7A5E]/55 text-emerald-200 hover:bg-[#5B7A5E]/30'
                  : 'bg-emerald-50 border-[#5B7A5E]/60 text-emerald-950 hover:bg-emerald-100'
              }`}
            >
              {isExpandingWorks ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>[+3 Tuyệt Phẩm Mới]</span>
            </button>
          </div>

          {/* 65% Washi Paper Book Spread */}
          <article
            className={`rounded-2xl border p-5 sm:p-7 transition-colors ${
              isDark
                ? 'bg-[#171614] border-stone-800 text-stone-100'
                : 'bg-[#f8f3e8] border-[#e2d7c3] text-[#221d18]'
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-stone-500/20">
              <div>
                <div className="text-[11px] uppercase tracking-wider opacity-65">
                  {activeWork.genre} · {activeWork.eraTag}
                </div>
                <h3 className="font-mincho text-2xl font-bold mt-1">
                  {activeWork.titleJp}{' '}
                  <span className="text-sm font-normal opacity-70">({activeWork.titleReading})</span>
                </h3>
                <p className="text-xs mt-1 opacity-75">
                  {activeWork.titleVi} — {activeWork.authorJp} ({activeWork.authorVi})
                </p>
              </div>
              <span className="text-[11px] font-mono tabular-nums opacity-70">
                Chạm câu để soi X-Quang →
              </span>
            </div>

            <div className={`mt-5 ${isTategaki ? 'overflow-x-auto pb-3 flex justify-end' : 'space-y-4'}`}>
              <div
                style={isTategaki ? { writingMode: 'vertical-rl', textOrientation: 'mixed' } : undefined}
                className={
                  isTategaki
                    ? 'min-h-[300px] max-h-[430px] py-2 px-3 leading-[2.45] font-mincho text-lg sm:text-xl tracking-wider space-x-reverse space-x-5'
                    : 'space-y-4 font-mincho text-lg sm:text-xl leading-[2.3]'
                }
              >
                {sentences.map((s, idx) => {
                  const isSelected = inspectedSentence?.id === s.id;
                  const isSpeaking = playingSentenceIdx === idx;
                  return (
                    <p
                      key={s.id}
                      onClick={() => setSelectedSentenceId(s.id)}
                      className={`cursor-pointer rounded-xl px-2.5 py-2 transition-colors ${
                        isSpeaking
                          ? isDark
                            ? 'bg-amber-500/25 ring-1 ring-amber-400/60'
                            : 'bg-amber-200/60 ring-1 ring-amber-500/50'
                          : isSelected
                          ? isDark
                            ? 'bg-[#5B7A5E]/30 ring-1 ring-[#5B7A5E]'
                            : 'bg-[#5B7A5E]/18 ring-1 ring-[#5B7A5E]'
                          : isDark
                          ? 'hover:bg-stone-800/60'
                          : 'hover:bg-stone-200/50'
                      }`}
                    >
                      {s.tokens.map((tok, tIdx) =>
                        tok.reading ? (
                          <ruby key={tIdx} className="ruby-align-center">
                            {tok.text}
                            <rt
                              className={`text-[10px] font-jp select-none transition-opacity duration-150 ${
                                showFurigana ? 'opacity-80' : 'opacity-0'
                              }`}
                            >
                              {tok.reading}
                            </rt>
                          </ruby>
                        ) : (
                          <span key={tIdx}>{tok.text}</span>
                        )
                      )}
                    </p>
                  );
                })}
              </div>
            </div>

            {inspectedSentence && (
              <div className="mt-5 pt-4 border-t border-stone-500/20">
                <div className="text-[11px] uppercase tracking-wider opacity-65 mb-1">
                  Bản dịch văn học câu đang chọn
                </div>
                <p className="text-sm leading-relaxed">{inspectedSentence.vietnamese}</p>
              </div>
            )}
          </article>
        </>
      }
      academicSlot={
        <>
          {inspectedSentence && (
            <div className={`rounded-2xl border p-4 sm:p-5 ${panelClass}`}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4" style={{ color: '#5B7A5E' }} />
                  <h4 className="text-sm font-bold">Kính Lúp Cú Pháp (Syntax X-Ray)</h4>
                </div>
                <button
                  type="button"
                  onClick={() => speechService.speak(inspectedSentence.japanese, 0.85)}
                  className={`p-1.5 rounded-lg cursor-pointer ${isDark ? 'bg-stone-800 hover:bg-stone-700' : 'bg-stone-100 hover:bg-stone-200'}`}
                  title="Nghe câu này"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                {inspectedSentence.structureSummaryVi}
              </p>

              <div className="space-y-2">
                {inspectedSentence.syntaxSegments.map((seg, idx) => (
                  <div key={idx} className={`rounded-xl border px-3 py-2.5 ${syntaxRoleStyle(seg.role)}`}>
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <span className="font-jp text-sm font-bold">{seg.text}</span>
                      <span className="text-[11px] font-semibold opacity-90">{seg.labelVi}</span>
                    </div>
                    {seg.reading && <div className="text-[11px] font-jp opacity-75 mt-0.5">{seg.reading}</div>}
                    <p className="text-xs mt-1 leading-relaxed opacity-90">{seg.explanationVi}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`rounded-2xl border p-4 sm:p-5 ${panelClass}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" style={{ color: '#5B7A5E' }} />
                <h4 className="text-sm font-bold">Mỹ Học &amp; Từ Tượng Thanh</h4>
              </div>
              <button
                type="button"
                onClick={handleExpandThreeMetaphors}
                disabled={isExpandingMetaphors}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap shrink-0 cursor-pointer ${
                  isDark
                    ? 'border-stone-700 text-emerald-300 hover:bg-stone-800'
                    : 'border-stone-300 text-emerald-900 hover:bg-stone-100'
                }`}
              >
                {isExpandingMetaphors ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                <span>[+3 Khai Quật Ẩn Dụ]</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {activeWork.metaphors.map((m, idx) => {
                const isSaved = savedTerms[m.term] || srsVaultService.isBookmarked(m.term);
                return (
                  <div
                    key={`${m.term}_${idx}`}
                    className={`rounded-xl border p-3.5 ${
                      isDark ? 'bg-[#181e2a] border-stone-800' : 'bg-white border-stone-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="font-mincho text-base font-bold">{m.term}</span>
                          <span className="font-jp text-xs" style={{ color: '#5B7A5E' }}>
                            {m.reading}
                          </span>
                        </div>
                        <div className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                          {m.category} · {m.aestheticTag}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSaveToSrs(m.term, m.reading, m.explanationVi, m.exampleInText)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap shrink-0 cursor-pointer ${
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
                    <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                      {m.explanationVi}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      }
    />
  );
};
