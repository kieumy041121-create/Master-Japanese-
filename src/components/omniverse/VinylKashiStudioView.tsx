import React, { useEffect, useRef, useState } from 'react';
import {
  Disc3,
  Sparkles,
  Volume2,
  Repeat,
  Square,
  BookmarkPlus,
  Check,
  Wand2,
  Loader2,
  Plus,
  X,
} from 'lucide-react';
import {
  DualPitchWord,
  LyricDecompileRow,
  VinylTrack,
  omniverseStorageService,
} from '../../services/omniverseStorageService';
import {
  INITIAL_VINYL_TRACKS,
  decompileCustomLyrics,
  expandThreeColloquialApplications,
  expandThreeVinylTracks,
} from '../../services/omniverseExpansionEngine';
import { DualPitchMoraChart } from './DualPitchMoraChart';
import { SanctuaryRoomFrame } from './SanctuaryRoomFrame';
import { speechService } from '../../services/speechService';
import { srsVaultService } from '../../services/srsVaultService';

interface VinylKashiStudioViewProps {
  isDark: boolean;
  onSrsUpdated: () => void;
}

const MOODS: VinylTrack['mood'][] = [
  'Đêm mưa Tokyo',
  'Hoài niệm Showa',
  'Tĩnh lặng chiều thu',
  'Hy vọng sớm mai',
];

export const VinylKashiStudioView: React.FC<VinylKashiStudioViewProps> = ({ isDark, onSrsUpdated }) => {
  const [tracks, setTracks] = useState<VinylTrack[]>(INITIAL_VINYL_TRACKS);
  const [activeTrackId, setActiveTrackId] = useState<string>(INITIAL_VINYL_TRACKS[0].id);
  const [selectedMood, setSelectedMood] = useState<VinylTrack['mood']>('Đêm mưa Tokyo');
  const [customLyricsInput, setCustomLyricsInput] = useState('');
  const [showCustomPaste, setShowCustomPaste] = useState(false);

  const [loopingRowId, setLoopingRowId] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(0.88);
  const [isDecompiling, setIsDecompiling] = useState(false);
  const [isExpandingTracks, setIsExpandingTracks] = useState(false);
  const [expandingRowId, setExpandingRowId] = useState<string | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [savedKeys, setSavedKeys] = useState<Record<string, boolean>>({});

  const loopActiveRef = useRef<string | null>(null);
  const rateRef = useRef<number>(playbackRate);
  rateRef.current = playbackRate;

  useEffect(() => {
    let mounted = true;
    (async () => {
      await omniverseStorageService.registerSeedHashes(
        'vinyl_track',
        INITIAL_VINYL_TRACKS.map((t) => t.titleJp)
      );
      const state = await omniverseStorageService.loadState();
      if (!mounted) return;
      if (state.vinylTracks.length > 0) {
        setTracks(state.vinylTracks);
        setActiveTrackId(state.vinylTracks[0].id);
      } else {
        state.vinylTracks = INITIAL_VINYL_TRACKS;
        await omniverseStorageService.saveState(state);
      }
    })();

    return () => {
      mounted = false;
      loopActiveRef.current = null;
      speechService.stop();
    };
  }, []);

  const activeTrack = tracks.find((t) => t.id === activeTrackId) || tracks[0];

  const stopMicroLoop = () => {
    loopActiveRef.current = null;
    setLoopingRowId(null);
    speechService.stop();
  };

  const toggleMicroLoop = (row: LyricDecompileRow) => {
    if (loopActiveRef.current === row.id) {
      stopMicroLoop();
      return;
    }

    stopMicroLoop();
    loopActiveRef.current = row.id;
    setLoopingRowId(row.id);

    const speakOnce = () => {
      if (loopActiveRef.current !== row.id) return;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(row.reading || row.originalLyric);
        utt.lang = 'ja-JP';
        utt.rate = rateRef.current;
        utt.onend = () => {
          if (loopActiveRef.current === row.id) {
            window.setTimeout(speakOnce, 650);
          }
        };
        utt.onerror = () => {
          if (loopActiveRef.current === row.id) {
            stopMicroLoop();
          }
        };
        window.speechSynthesis.speak(utt);
      } else {
        speechService.speak(row.reading || row.originalLyric, rateRef.current);
      }
    };

    speakOnce();
  };

  const handleDecompileCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLyricsInput.trim() || isDecompiling) return;
    setErrorBanner(null);
    setIsDecompiling(true);
    try {
      const track = await decompileCustomLyrics(customLyricsInput.trim());
      const nextTracks = [track, ...tracks];
      setTracks(nextTracks);
      setActiveTrackId(track.id);
      setCustomLyricsInput('');
      setShowCustomPaste(false);
      const state = await omniverseStorageService.loadState();
      state.vinylTracks = nextTracks;
      await omniverseStorageService.saveState(state);
    } catch (err: any) {
      setErrorBanner(err?.message || 'Chưa thể giải mã đoạn ca từ này.');
    } finally {
      setIsDecompiling(false);
    }
  };

  const handleExpandThreeTracks = async () => {
    if (isExpandingTracks) return;
    setErrorBanner(null);
    setIsExpandingTracks(true);
    try {
      const fresh = await expandThreeVinylTracks(
        selectedMood,
        tracks.map((t) => t.titleJp)
      );
      if (fresh.length === 0) {
        setErrorBanner('Các đĩa than vừa tìm trùng với kệ hiện có. Hãy nhấn lại để rút 3 đĩa mới.');
      } else {
        const nextTracks = [...fresh, ...tracks];
        setTracks(nextTracks);
        setActiveTrackId(fresh[0].id);
        const state = await omniverseStorageService.loadState();
        state.vinylTracks = nextTracks;
        await omniverseStorageService.saveState(state);
      }
    } catch (err: any) {
      setErrorBanner(err?.message || 'Chưa thể lấy thêm 3 đĩa than & thơ Tanka mới.');
    } finally {
      setIsExpandingTracks(false);
    }
  };

  const handleExpandColloquial = async (row: LyricDecompileRow) => {
    if (expandingRowId) return;
    setErrorBanner(null);
    setExpandingRowId(row.id);
    try {
      const seen = (row.colloquialApplications || []).map((a) => a.japanese);
      const freshApps = await expandThreeColloquialApplications(row, seen);
      if (freshApps.length > 0) {
        const nextTracks = tracks.map((t) =>
          t.id === activeTrack.id
            ? {
                ...t,
                rows: t.rows.map((r) =>
                  r.id === row.id
                    ? {
                        ...r,
                        colloquialApplications: [...(r.colloquialApplications || []), ...freshApps],
                      }
                    : r
                ),
              }
            : t
        );
        setTracks(nextTracks);
        const state = await omniverseStorageService.loadState();
        state.vinylTracks = nextTracks;
        await omniverseStorageService.saveState(state);
      }
    } catch (err: any) {
      setErrorBanner(err?.message || 'Chưa thể mở thêm 3 ví dụ ứng dụng khẩu ngữ.');
    } finally {
      setExpandingRowId(null);
    }
  };

  const handleSavePitchWordToSrs = (item: DualPitchWord) => {
    srsVaultService.addBookmark({
      japanese: item.word,
      reading: item.reading,
      vietnamese: `${item.meaningVi} · ${item.pitchPatternLabel}`,
      type: 'vocab',
      level: 'N2',
      contextSentence: item.contrastNoteVi,
      contextTranslation: item.meaningVi,
      source: `Vinyl Kashi Studio · ${activeTrack.titleJp}`,
      tags: ['Vinyl Kashi', 'Pitch Accent NHK', 'Mora'],
    });
    setSavedKeys((prev) => ({ ...prev, [item.word]: true }));
    onSrsUpdated();
  };

  const handleSaveLyricRowToSrs = (row: LyricDecompileRow) => {
    srsVaultService.addBookmark({
      japanese: row.originalLyric,
      reading: row.reading,
      vietnamese: `${row.phenomenonTag} → Chuẩn: ${row.textbookGrammar}`,
      type: 'phrase',
      level: 'N2',
      contextSentence: row.spokenColloquial,
      contextTranslation: row.nuanceVi,
      source: `Vinyl Kashi Studio · ${activeTrack.titleJp}`,
      tags: ['Vinyl Kashi', 'Shukuyakukei', 'Khẩu ngữ'],
    });
    setSavedKeys((prev) => ({ ...prev, [row.id]: true }));
    onSrsUpdated();
  };

  const panelClass = isDark
    ? 'bg-[#141923] border-stone-800/90 text-stone-100'
    : 'bg-[#fcf9f3] border-stone-200 text-stone-900';

  return (
    <SanctuaryRoomFrame
      isDark={isDark}
      wairoHex="#384D70"
      academicPanelLabel="Trọng Âm NHK & Kệ Đĩa +3"
      headerSlot={
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div
              className={`relative w-14 h-14 rounded-full shrink-0 flex items-center justify-center shadow-lg border-2 ${
                isDark ? 'border-stone-700' : 'border-stone-800/80'
              } ${loopingRowId ? 'motion-safe:animate-[spin_9s_linear_infinite]' : ''}`}
              style={{
                background: `radial-gradient(circle at center, ${activeTrack.vinylColor} 0%, #15171c 38%, #22262e 42%, #111317 65%, #1d2128 100%)`,
              }}
            >
              <div className="w-5 h-5 rounded-full bg-amber-100 border-2 border-amber-700 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <h2 className="font-mincho text-xl sm:text-2xl font-bold tracking-tight">
                  Phòng Nghe Đĩa Than &amp; Giải Mã Ca Từ
                </h2>
                <span className="font-jp text-sm font-medium" style={{ color: '#6985b5' }}>
                  レコード歌詞室 · Ai-iro 藍色
                </span>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                {activeTrack.titleJp} · {activeTrack.titleVi} · {activeTrack.bpmLabel}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className={`inline-flex items-center gap-1 rounded-xl border p-1 text-xs ${isDark ? 'border-stone-700 bg-[#0f131b]' : 'border-stone-300 bg-white'}`}>
              {[0.75, 0.88, 1.0].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setPlaybackRate(r)}
                  className={`px-2 py-1 rounded-lg font-mono tabular-nums whitespace-nowrap transition-colors cursor-pointer ${
                    playbackRate === r
                      ? 'bg-[#384D70] text-white font-bold'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {r}x
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowCustomPaste((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isDark
                  ? 'border-stone-700 bg-stone-800 text-stone-100 hover:bg-stone-700'
                  : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-100'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Dán ca từ bất kỳ</span>
            </button>
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

          {showCustomPaste && (
            <form onSubmit={handleDecompileCustom} className={`rounded-2xl border p-4 space-y-2.5 ${panelClass}`}>
              <label className="block text-xs font-semibold">
                Dán điệp khúc J-Pop, City Pop, Anime OST hoặc 1 bài thơ Tanka tiếng Nhật:
              </label>
              <textarea
                rows={3}
                value={customLyricsInput}
                onChange={(e) => setCustomLyricsInput(e.target.value)}
                placeholder="Ví dụ: 君のことを思い出さなきゃって思ってるのに、夜風が優しすぎる..."
                className={`w-full rounded-xl border p-3 text-sm font-jp focus:outline-none focus:ring-2 focus:ring-[#384D70]/50 ${
                  isDark
                    ? 'bg-[#0f131b] border-stone-700 text-stone-100 placeholder:text-stone-500'
                    : 'bg-white border-stone-300 text-stone-900 placeholder:text-stone-400'
                }`}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomPaste(false)}
                  className="px-3 py-1.5 rounded-lg text-xs opacity-75 hover:opacity-100 cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={isDecompiling || !customLyricsInput.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white whitespace-nowrap disabled:opacity-45 cursor-pointer"
                  style={{ backgroundColor: '#384D70' }}
                >
                  {isDecompiling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Disc3 className="w-3.5 h-3.5" />}
                  <span>Giải mã 3 tầng &amp; Trọng âm NHK</span>
                </button>
              </div>
            </form>
          )}

          {/* Vinyl Crate Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {tracks.map((t) => {
              const active = t.id === activeTrack.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    stopMicroLoop();
                    setActiveTrackId(t.id);
                  }}
                  style={active ? { backgroundColor: '#384D70', borderColor: '#384D70', color: '#ffffff' } : undefined}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'font-semibold shadow-xs'
                      : isDark
                      ? 'bg-[#141923] border-stone-800 text-stone-300 hover:border-stone-700'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: t.vinylColor }} />
                  <span className="font-jp">{t.titleJp}</span>
                  <span className="opacity-75">· {t.kind}</span>
                </button>
              );
            })}
          </div>

          {/* 65% Primary Lyric Lines & 3-Tier Colloquial Matrix */}
          <div className="space-y-4">
            {activeTrack.rows.map((row) => {
              const isLooping = loopingRowId === row.id;
              const isSaved = savedKeys[row.id] || srsVaultService.isBookmarked(row.originalLyric);
              return (
                <div key={row.id} className={`rounded-2xl border p-4 sm:p-5 space-y-4 ${panelClass}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-semibold tracking-wide" style={{ color: '#6985b5' }}>
                        {row.phenomenonTag}
                      </div>
                      <h3 className="font-mincho text-lg sm:text-xl font-bold mt-1 leading-relaxed">
                        {row.originalLyric}
                      </h3>
                      <p className={`font-jp text-xs mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                        {row.reading}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => speechService.speak(row.reading || row.originalLyric, playbackRate)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer ${
                          isDark ? 'bg-stone-800 text-stone-200 hover:bg-stone-700' : 'bg-stone-200/70 text-stone-800 hover:bg-stone-300'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleMicroLoop(row)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white whitespace-nowrap transition-opacity cursor-pointer"
                        style={{ backgroundColor: isLooping ? '#A64444' : '#384D70' }}
                      >
                        {isLooping ? <Square className="w-3.5 h-3.5" /> : <Repeat className="w-3.5 h-3.5" />}
                        <span>{isLooping ? 'Dừng Loop' : 'Micro-Loop'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSaveLyricRowToSrs(row)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer ${
                          isSaved
                            ? 'bg-emerald-600/20 text-emerald-500'
                            : isDark
                            ? 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                            : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                        }`}
                      >
                        {isSaved ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                        <span>{isSaved ? 'Đã lưu' : 'FSRS'}</span>
                      </button>
                    </div>
                  </div>

                  {/* 3-Tier Conversion Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    <div className={`rounded-xl border p-3 ${isDark ? 'bg-[#1a202d] border-stone-800' : 'bg-[#f6f1e7] border-stone-200'}`}>
                      <div className="text-[10px] font-semibold uppercase tracking-wider opacity-65">1 · Ca từ gốc</div>
                      <p className="font-jp text-xs sm:text-sm font-medium mt-1 leading-relaxed">{row.originalLyric}</p>
                    </div>

                    <div className={`rounded-xl border p-3 ${isDark ? 'bg-[#1a202d] border-stone-800' : 'bg-white border-stone-200'}`}>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-300">2 · Văn nói đời thường</div>
                      <p className="font-jp text-xs sm:text-sm font-medium mt-1 leading-relaxed">{row.spokenColloquial}</p>
                    </div>

                    <div className={`rounded-xl border p-3 ${isDark ? 'bg-[#1a202d] border-stone-800' : 'bg-white border-stone-200'}`}>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">3 · Ngữ pháp chuẩn</div>
                      <p className="font-jp text-xs sm:text-sm font-medium mt-1 leading-relaxed">{row.textbookGrammar}</p>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                    {row.nuanceVi}
                  </p>

                  {/* [+3 Ứng Dụng Khẩu Ngữ] */}
                  <div className={`pt-3 border-t space-y-2.5 ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold opacity-80">Ứng dụng khẩu ngữ đời thực</span>
                      <button
                        type="button"
                        onClick={() => handleExpandColloquial(row)}
                        disabled={expandingRowId === row.id}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border whitespace-nowrap shrink-0 cursor-pointer ${
                          isDark
                            ? 'border-stone-700 text-amber-300 hover:bg-stone-800'
                            : 'border-stone-300 text-amber-900 hover:bg-stone-100'
                        }`}
                      >
                        {expandingRowId === row.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                        <span>[+3 Ứng Dụng Khẩu Ngữ]</span>
                      </button>
                    </div>

                    {row.colloquialApplications && row.colloquialApplications.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {row.colloquialApplications.map((app, aIdx) => (
                          <div
                            key={aIdx}
                            className={`rounded-xl border p-2.5 ${isDark ? 'bg-[#181e2a] border-stone-800' : 'bg-white border-stone-200'}`}
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <span className="font-jp text-xs font-bold leading-relaxed">{app.japanese}</span>
                              <button
                                type="button"
                                onClick={() => speechService.speak(app.reading || app.japanese, 0.92)}
                                className="p-1 rounded opacity-70 hover:opacity-100 shrink-0 cursor-pointer"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-[11px] font-jp opacity-70 mt-0.5">{app.reading}</div>
                            <div className="text-xs mt-1">{app.vietnamese}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      }
      academicSlot={
        <>
          {/* Mood + [+3 Đĩa Than & Thơ Tanka Mới] Card */}
          <div className={`rounded-2xl border p-4 space-y-3 ${panelClass}`}>
            <h4 className="text-xs font-bold">Mở Rộng Kệ Đĩa Than &amp; Thơ Tanka</h4>
            <div className="flex flex-wrap gap-1.5">
              {MOODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMood(m)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedMood === m
                      ? 'bg-[#384D70] text-white font-semibold'
                      : isDark
                      ? 'bg-stone-900 text-stone-400 hover:text-stone-100'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleExpandThreeTracks}
              disabled={isExpandingTracks}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white whitespace-nowrap transition-opacity hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: '#384D70' }}
            >
              {isExpandingTracks ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>[+3 Đĩa Than &amp; Thơ Tanka Mới]</span>
            </button>
          </div>

          {/* 35% Dual Pitch Accent & Mora NHK Panel */}
          {activeTrack.pitchWords.length > 0 && (
            <div className="space-y-3">
              <div className="px-1">
                <h4 className="font-mincho text-sm font-bold">
                  Trọng Âm Kép (Giai Điệu vs NHK Tokyo)
                </h4>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  Giữ giọng nói tự nhiên, không bị “hát hóa” cao độ
                </p>
              </div>
              {activeTrack.pitchWords.map((pw, idx) => (
                <DualPitchMoraChart
                  key={`${pw.word}_${idx}`}
                  item={pw}
                  isDark={isDark}
                  isSavedToSrs={savedKeys[pw.word] || srsVaultService.isBookmarked(pw.word)}
                  onSaveToSrs={handleSavePitchWordToSrs}
                />
              ))}
            </div>
          )}
        </>
      }
    />
  );
};
