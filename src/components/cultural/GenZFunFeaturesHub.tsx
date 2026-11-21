import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  OmikujiFortune,
  INITIAL_OMIKUJI_FORTUNES,
  EXTRA_OMIKUJI_FORTUNES,
  TokyoSoundscape,
  INITIAL_TOKYO_SOUNDSCAPES,
  EXTRA_TOKYO_SOUNDSCAPES,
  BloodTypeMatch,
  INITIAL_BLOOD_MATCHES,
  EXTRA_BLOOD_MATCHES,
  JapaneseNickname,
  INITIAL_NICKNAMES,
  EXTRA_NICKNAMES,
  IzakayaMenuItem,
  INITIAL_IZAKAYA_MENU,
  EXTRA_IZAKAYA_MENU,
  GenZBuzzword,
  INITIAL_BUZZWORDS,
  EXTRA_BUZZWORDS,
  AnimePilgrimageSpot,
  INITIAL_PILGRIMAGE_SPOTS,
  EXTRA_PILGRIMAGE_SPOTS,
  PurikuraPose,
  INITIAL_PURIKURA_POSES,
  EXTRA_PURIKURA_POSES,
  EngimonoMascot,
  INITIAL_ENGIMONO_MASCOTS,
  EXTRA_ENGIMONO_MASCOTS,
  OnomatopoeiaQuizItem,
  INITIAL_ONOMATOPOEIA_QUIZ,
  EXTRA_ONOMATOPOEIA_QUIZ,
} from '../../data/japaneseFunFeaturesDatabase';
import { speechService } from '../../services/speechService';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Heart,
  RotateCcw,
  Plus,
  Search,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Copy,
  BookOpen,
  MapPin,
  Camera,
  Utensils,
  Compass,
  Smile,
  Music,
  Flame,
  Star,
  Layers,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  onBackToCultureHub?: () => void;
  onOpenFashionStudio?: () => void;
  onOpenBeautyStudio?: () => void;
}

export const GenZFunFeaturesHub: React.FC<Props> = ({
  onBackToCultureHub,
  onOpenFashionStudio,
  onOpenBeautyStudio,
}) => {
  // Active feature 1 to 10
  const [activeFeatureId, setActiveFeatureId] = useState<number>(1);

  // 1. OMIKUJI
  const [omikujiList, setOmikujiList] = useState<OmikujiFortune[]>([...INITIAL_OMIKUJI_FORTUNES]);
  const [omikujiIndex, setOmikujiIndex] = useState<number>(0);
  const [extraOmikujiCount, setExtraOmikujiCount] = useState<number>(0);
  const [isDrawingOmikuji, setIsDrawingOmikuji] = useState<boolean>(false);

  // 2. SOUNDSCAPES (LO-FI BGM)
  const [soundscapeList, setSoundscapeList] = useState<TokyoSoundscape[]>([...INITIAL_TOKYO_SOUNDSCAPES]);
  const [soundscapeIndex, setSoundscapeIndex] = useState<number>(0);
  const [extraSoundscapeCount, setExtraSoundscapeCount] = useState<number>(0);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundIntervalRef = useRef<any>(null);

  // 3. BLOOD TYPE
  const [bloodList, setBloodList] = useState<BloodTypeMatch[]>([...INITIAL_BLOOD_MATCHES]);
  const [bloodIndex, setBloodIndex] = useState<number>(0);
  const [extraBloodCount, setExtraBloodCount] = useState<number>(0);

  // 4. NICKNAMES
  const [nicknameList, setNicknameList] = useState<JapaneseNickname[]>([...INITIAL_NICKNAMES]);
  const [nicknameIndex, setNicknameIndex] = useState<number>(0);
  const [extraNicknameCount, setExtraNicknameCount] = useState<number>(0);

  // 5. IZAKAYA
  const [izakayaList, setIzakayaList] = useState<IzakayaMenuItem[]>([...INITIAL_IZAKAYA_MENU]);
  const [izakayaIndex, setIzakayaIndex] = useState<number>(0);
  const [extraIzakayaCount, setExtraIzakayaCount] = useState<number>(0);

  // 6. BUZZWORDS
  const [buzzwordList, setBuzzwordList] = useState<GenZBuzzword[]>([...INITIAL_BUZZWORDS]);
  const [buzzwordIndex, setBuzzwordIndex] = useState<number>(0);
  const [extraBuzzwordCount, setExtraBuzzwordCount] = useState<number>(0);

  // 7. PILGRIMAGE
  const [pilgrimageList, setPilgrimageList] = useState<AnimePilgrimageSpot[]>([...INITIAL_PILGRIMAGE_SPOTS]);
  const [pilgrimageIndex, setPilgrimageIndex] = useState<number>(0);
  const [extraPilgrimageCount, setExtraPilgrimageCount] = useState<number>(0);

  // 8. PURIKURA POSES
  const [purikuraList, setPurikuraList] = useState<PurikuraPose[]>([...INITIAL_PURIKURA_POSES]);
  const [purikuraIndex, setPurikuraIndex] = useState<number>(0);
  const [extraPurikuraCount, setExtraPurikuraCount] = useState<number>(0);

  // 9. ENGIMONO MASCOTS
  const [mascotList, setMascotList] = useState<EngimonoMascot[]>([...INITIAL_ENGIMONO_MASCOTS]);
  const [mascotIndex, setMascotIndex] = useState<number>(0);
  const [extraMascotCount, setExtraMascotCount] = useState<number>(0);

  // 10. ONOMATOPOEIA QUIZ
  const [onomatopoeiaList, setOnomatopoeiaList] = useState<OnomatopoeiaQuizItem[]>([...INITIAL_ONOMATOPOEIA_QUIZ]);
  const [onomatopoeiaIndex, setOnomatopoeiaIndex] = useState<number>(0);
  const [extraOnomatopoeiaCount, setExtraOnomatopoeiaCount] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleSpeak = (text: string) => {
    speechService.speak(text);
  };

  // Soundscape audio synthesizer
  const currentSoundscape = soundscapeList[soundscapeIndex] || soundscapeList[0];

  const stopSoundscape = () => {
    if (soundIntervalRef.current) clearInterval(soundIntervalRef.current);
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }
    setIsPlayingSound(false);
  };

  const playSoundscapeChords = () => {
    if (isPlayingSound) {
      stopSoundscape();
      showToast('Đã dừng âm hưởng nền.');
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        showToast('Trình duyệt không hỗ trợ âm thanh Web Audio.');
        return;
      }
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const chords = currentSoundscape.synthChords;
      let step = 0;

      const triggerChord = () => {
        if (ctx.state === 'suspended') ctx.resume();
        const baseFreq = chords[step % chords.length];

        // Soft Bell / Water resonance tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

        gain.gain.setValueAtTime(0.018, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2.3);

        step++;
      };

      triggerChord();
      soundIntervalRef.current = setInterval(triggerChord, 2800);
      setIsPlayingSound(true);
      speechService.playSuccessSound();
      showToast(`🎶 Đang phát: ${currentSoundscape.name}`);
    } catch {
      showToast('Không thể bật âm thanh.');
    }
  };

  useEffect(() => {
    return () => {
      stopSoundscape();
    };
  }, []);

  // 10 Features Registry for Clean Navigation
  const featuresList = [
    { id: 1, title: '⛩️ Quẻ Bói Thần Đạo', subtitle: 'Omikuji & Vận Mệnh' },
    { id: 2, title: '🎧 Tokyo Lo-Fi BGM', subtitle: 'Không Gian Âm Thanh' },
    { id: 3, title: '🩸 Nhóm Máu Tương Thích', subtitle: 'Ketsuekigata Hẹn Hò' },
    { id: 4, title: '✨ Tạo Biệt Danh GenZ', subtitle: 'Nickname & Nghệ Danh' },
    { id: 5, title: '🏮 Menu Quán Izakaya', subtitle: 'Pháp Thực Bản Xứ' },
    { id: 6, title: '🔥 Meme TikTok Slang', subtitle: 'Từ Lóng Viral 2024-2026' },
    { id: 7, title: '🗾 Hành Hương Anime', subtitle: 'Seichi Junrei Đời Thực' },
    { id: 8, title: '📸 Dáng Chụp Purikura', subtitle: 'Pose Ảnh Sticker Nữ Sinh' },
    { id: 9, title: '🍀 Linh Vật May Mắn', subtitle: 'Engimono & Yuru-Chara' },
    { id: 10, title: '🎯 Từ Tượng Thanh FX', subtitle: 'Onomatopoeia Mini Game' },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-pink-500/50 text-white text-xs shadow-2xl flex items-center gap-2 backdrop-blur-md animate-bounce">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-pink-950/80 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Bộ Sưu Tập Độc Đáo · 10 Tính Năng Tự Đề Xuất
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Mỗi Tính Năng Đều Có Nút Tải Thêm +5 Cái
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>GenZ & Otaku Arcade: 10 Trải Nghiệm Văn Hóa Nhật Bản</span>
              <Sparkles className="w-6 h-6 text-pink-400" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Từ bốc quẻ Omikuji Thần đạo, đo độ hợp nhóm máu, tạo nickname anime, giải mã Izakaya, meme TikTok đến hành hương anime Seichi Junrei.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenFashionStudio && (
              <button
                onClick={onOpenFashionStudio}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                👗 Thời Trang
              </button>
            )}
            {onOpenBeautyStudio && (
              <button
                onClick={onOpenBeautyStudio}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                💄 Làm Đẹp
              </button>
            )}
            {onBackToCultureHub && (
              <button
                onClick={onBackToCultureHub}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                ← Quay lại Hub Văn Hóa
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 10 Features Horizontal Grid Navigator (Gọn gàng, dễ nhìn, không rối mắt) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-2xl shadow-md">
        {featuresList.map((item) => {
          const isSelected = item.id === activeFeatureId;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveFeatureId(item.id);
                speechService.playSuccessSound();
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-pink-400 text-white shadow-md shadow-pink-600/30'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="font-bold text-xs truncate">{item.title}</div>
              <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                {item.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* FEATURE 1: QUẺ BÓI THẦN ĐẠO & VẬN MỆNH HÔM NAY (OMIKUJI) */}
      {/* ===================================================================== */}
      {activeFeatureId === 1 && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-3xl shadow-xl space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setOmikujiIndex((prev) => (prev > 0 ? prev - 1 : omikujiList.length - 1));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Quẻ Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-rose-300 font-mono font-bold">
                Quẻ {omikujiIndex + 1} / {omikujiList.length}
              </div>

              <button
                onClick={() => {
                  setOmikujiIndex((prev) => (prev < omikujiList.length - 1 ? prev + 1 : 0));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Quẻ Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                const nextBatch = EXTRA_OMIKUJI_FORTUNES.map((o, i) => ({
                  ...o,
                  id: `${o.id}_b${extraOmikujiCount + 1}_${i}`,
                }));
                setOmikujiList((prev) => [...prev, ...nextBatch]);
                setExtraOmikujiCount((prev) => prev + 1);
                setOmikujiIndex(omikujiList.length);
                speechService.playSuccessSound();
                showToast(`⛩️ Đã nạp thêm +5 Quẻ Thần Đạo mới! (Hiện có ${omikujiList.length + 5} quẻ)`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/25 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Quẻ Thần Linh ({omikujiList.length} Quẻ)</span>
            </button>
          </div>

          {/* Active Omikuji Content */}
          {(() => {
            const currentOmikuji = omikujiList[omikujiIndex] || omikujiList[0];
            return (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-950 border border-rose-700 text-rose-300 font-bold">
                        {currentOmikuji.shrineOrigin}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      <span className="text-rose-400 font-jp">{currentOmikuji.rankJp}</span>
                      <span>- {currentOmikuji.rank}</span>
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setIsDrawingOmikuji(true);
                      setTimeout(() => {
                        const rand = Math.floor(Math.random() * omikujiList.length);
                        setOmikujiIndex(rand);
                        setIsDrawingOmikuji(false);
                        speechService.playSuccessSound();
                        showToast('✨ Lắc hộp thần đạo Mikuji-bako thành công!');
                      }, 400);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md self-start sm:self-auto"
                  >
                    <RotateCcw className={`w-4 h-4 ${isDrawingOmikuji ? 'animate-spin' : ''}`} />
                    <span>Lắc Quẻ Ngẫu Nhiên Hôm Nay</span>
                  </button>
                </div>

                {/* Poem Waka */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/30 space-y-1.5">
                  <div className="text-xs text-rose-400 font-bold uppercase tracking-wider">
                    📜 Thơ Waka Thần Truyền (和歌神託):
                  </div>
                  <div className="text-sm font-jp font-bold text-slate-100">{currentOmikuji.poemWaka}</div>
                  <p className="text-xs text-slate-300 italic">"{currentOmikuji.poemTranslation}"</p>
                  <p className="text-xs text-slate-200 pt-1 leading-relaxed">{currentOmikuji.overview}</p>
                </div>

                {/* 4 Aspects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-pink-400 block font-bold">❤️ Tình duyên (Ren'ai):</strong>
                    <p className="text-slate-200">{currentOmikuji.luckAspects.love}</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-sky-400 block font-bold">📚 Học tập & Công danh (Gakumon):</strong>
                    <p className="text-slate-200">{currentOmikuji.luckAspects.studyWork}</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-400 block font-bold">🌿 Sức khỏe & Thể chất (Kenkou):</strong>
                    <p className="text-slate-200">{currentOmikuji.luckAspects.health}</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-amber-400 block font-bold">🧭 Xuất hành & Du lịch (Ryokou):</strong>
                    <p className="text-slate-200">{currentOmikuji.luckAspects.travel}</p>
                  </div>
                </div>

                {/* Lucky Elements Row */}
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Màu may mắn:</span>
                    <strong className="text-pink-300">{currentOmikuji.luckyElements.color}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Vật may mắn:</span>
                    <strong className="text-amber-300">{currentOmikuji.luckyElements.item}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Món ăn may mắn:</span>
                    <strong className="text-emerald-300">{currentOmikuji.luckyElements.food}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Hướng đại cát:</span>
                    <strong className="text-purple-300">{currentOmikuji.luckyElements.direction}</strong>
                  </div>
                </div>

                {/* Deep Explanation */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
                  <strong className="text-rose-300 block font-bold">🔍 Mục Giải Thích Chuyên Sâu Về Quẻ Thần Đạo:</strong>
                  <p className="text-slate-300 leading-relaxed">{currentOmikuji.deepExplanation}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ===================================================================== */}
      {/* FEATURE 2: MÁY PHỐI NHẠC & KHÔNG GIAN TOKYO LO-FI BGM */}
      {/* ===================================================================== */}
      {activeFeatureId === 2 && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-3xl shadow-xl space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  stopSoundscape();
                  setSoundscapeIndex((prev) => (prev > 0 ? prev - 1 : soundscapeList.length - 1));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Không Gian Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-sky-300 font-mono font-bold">
                {soundscapeIndex + 1} / {soundscapeList.length}
              </div>

              <button
                onClick={() => {
                  stopSoundscape();
                  setSoundscapeIndex((prev) => (prev < soundscapeList.length - 1 ? prev + 1 : 0));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Không Gian Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                const nextBatch = EXTRA_TOKYO_SOUNDSCAPES.map((s, i) => ({
                  ...s,
                  id: `${s.id}_b${extraSoundscapeCount + 1}_${i}`,
                }));
                setSoundscapeList((prev) => [...prev, ...nextBatch]);
                setExtraSoundscapeCount((prev) => prev + 1);
                setSoundscapeIndex(soundscapeList.length);
                speechService.playSuccessSound();
                showToast(`🎶 Đã nạp thêm +5 Không gian âm thanh mới! (Hiện có ${soundscapeList.length + 5})`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/25 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Không Gian Âm Thanh ({soundscapeList.length})</span>
            </button>
          </div>

          {/* Soundscape Player Card */}
          <div className="p-6 bg-gradient-to-br from-slate-950 via-sky-950/30 to-slate-950 rounded-2xl border border-sky-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sky-500/20">
              <div className="space-y-1">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-950 border border-sky-700 text-sky-300 font-mono">
                  📍 {currentSoundscape.location}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">{currentSoundscape.name}</h3>
                <div className="text-xs text-sky-400 font-jp">{currentSoundscape.jpName}</div>
              </div>

              <button
                onClick={playSoundscapeChords}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                  isPlayingSound
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 animate-pulse'
                    : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 text-white shadow-sky-600/30'
                }`}
              >
                {isPlayingSound ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isPlayingSound ? 'Dừng Phát Âm Hưởng' : 'Bật Âm Hưởng BGM Tokyo'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">{currentSoundscape.vibe}</p>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-sky-200">
              <strong>Giai điệu âm học: </strong> {currentSoundscape.audioNotes}
            </div>

            {/* Deep Explanation */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
              <strong className="text-sky-300 block font-bold">🔍 Mục Giải Thích Chuyên Sâu: Âm Nhạc Môi Trường Nhật Bản (Kankyo Ongaku)</strong>
              <p className="text-slate-300 leading-relaxed">{currentSoundscape.deepExplanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* FEATURE 3: MÁY ĐO TỈ LỆ TƯƠNG THÍCH NHÓM MÁU BẢN XỨ (KETSUEKIGATA) */}
      {/* ===================================================================== */}
      {activeFeatureId === 3 && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-3xl shadow-xl space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setBloodIndex((prev) => (prev > 0 ? prev - 1 : bloodList.length - 1));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Cặp Đôi Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-rose-300 font-mono font-bold">
                {bloodIndex + 1} / {bloodList.length} Cặp
              </div>

              <button
                onClick={() => {
                  setBloodIndex((prev) => (prev < bloodList.length - 1 ? prev + 1 : 0));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Cặp Đôi Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                const nextBatch = EXTRA_BLOOD_MATCHES.map((b, i) => ({
                  ...b,
                  id: `${b.id}_b${extraBloodCount + 1}_${i}`,
                }));
                setBloodList((prev) => [...prev, ...nextBatch]);
                setExtraBloodCount((prev) => prev + 1);
                setBloodIndex(bloodList.length);
                speechService.playSuccessSound();
                showToast(`🩸 Đã nạp thêm +5 Cặp nhóm máu mới! (Hiện có ${bloodList.length + 5})`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/25 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Cặp Nhóm Máu ({bloodList.length})</span>
            </button>
          </div>

          {/* Blood Match Card */}
          {(() => {
            const currentMatch = bloodList[bloodIndex] || bloodList[0];
            return (
              <div className="space-y-4">
                <div className="p-5 bg-gradient-to-r from-rose-950/40 via-slate-950 to-purple-950/40 rounded-2xl border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-rose-600/30 border border-rose-500 text-rose-300 text-lg font-black flex items-center justify-center">
                      {currentMatch.myType} × {currentMatch.partnerType}
                    </span>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-white">{currentMatch.chemistryTitle}</h3>
                      <div className="text-xs text-rose-300 font-jp">{currentMatch.jpTitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Độ hòa hợp:</span>
                      <span className="text-xl font-black text-rose-400 font-mono">{currentMatch.compatibilityRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-300 block font-bold">✨ Điểm mạnh & Lực hút:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentMatch.strengths}</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-amber-300 block font-bold">⚠️ Điểm dễ mâu thuẫn cần lưu ý:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentMatch.potentialConflicts}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-xl border border-pink-500/30 text-xs text-slate-200">
                  <strong className="text-pink-400">💡 Mẹo hẹn hò bí mật: </strong>
                  {currentMatch.datingSecretTip}
                </div>

                {/* Deep Explanation */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
                  <strong className="text-rose-300 block font-bold">🔍 Mục Giải Thích Chuyên Sâu: Văn Hóa Nhóm Máu (Ketsuekigata)</strong>
                  <p className="text-slate-300 leading-relaxed">{currentMatch.deepExplanation}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ===================================================================== */}
      {/* FEATURE 4: MÁY TẠO NGHỆ DANH / BIỆT DANH TIẾNG NHẬT GENZ SIÊU CUTE */}
      {/* ===================================================================== */}
      {activeFeatureId === 4 && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-3xl shadow-xl space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setNicknameIndex((prev) => (prev > 0 ? prev - 1 : nicknameList.length - 1));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Tên Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-pink-300 font-mono font-bold">
                {nicknameIndex + 1} / {nicknameList.length}
              </div>

              <button
                onClick={() => {
                  setNicknameIndex((prev) => (prev < nicknameList.length - 1 ? prev + 1 : 0));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Tên Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                const nextBatch = EXTRA_NICKNAMES.map((n, i) => ({
                  ...n,
                  id: `${n.id}_b${extraNicknameCount + 1}_${i}`,
                }));
                setNicknameList((prev) => [...prev, ...nextBatch]);
                setExtraNicknameCount((prev) => prev + 1);
                setNicknameIndex(nicknameList.length);
                speechService.playSuccessSound();
                showToast(`✨ Đã nạp thêm +5 Nghệ danh mới! (Hiện có ${nicknameList.length + 5})`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-pink-600/25 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Nghệ Danh ({nicknameList.length})</span>
            </button>
          </div>

          {/* Nickname Content */}
          {(() => {
            const currentNick = nicknameList[nicknameIndex] || nicknameList[0];
            return (
              <div className="space-y-4">
                <div className="p-6 bg-slate-950 rounded-2xl border border-pink-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-950 border border-pink-700 text-pink-300 font-semibold">
                      {currentNick.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-jp flex items-center gap-2">
                      <span>{currentNick.kanjiName}</span>
                      <button
                        onClick={() => handleSpeak(currentNick.furigana)}
                        className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-pink-400 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </h3>
                    <div className="text-xs text-slate-400 font-mono">
                      Furigana: {currentNick.furigana} · Romaji: {currentNick.romaji}
                    </div>
                  </div>

                  <div className="space-y-1.5 self-start sm:self-auto">
                    <span className="text-[10px] text-slate-400 block">Biệt danh thân mật fan gọi:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentNick.cuteSuffixes.map((suf, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-pink-900/60 border border-pink-700 text-pink-200 text-xs font-mono font-bold">
                          {suf}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-pink-300 block font-bold">🌸 Ý nghĩa của tên gọi:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentNick.meaning}</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-purple-300 block font-bold">👗 Phong cách thời trang ăn ý nhất:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentNick.bestFitAesthetic}</p>
                  </div>
                </div>

                {/* Deep Explanation */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
                  <strong className="text-pink-300 block font-bold">🔍 Mục Giải Thích Chuyên Sâu: Nghệ Thuật Đặt Tên & Hậu Tố Tiếng Nhật</strong>
                  <p className="text-slate-300 leading-relaxed">{currentNick.deepExplanation}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ===================================================================== */}
      {/* FEATURE 5: TRỢ LÝ GIẢI MÃ THỰC ĐƠN IZAKAYA & PHÁP THỰC BẢN XỨ */}
      {/* ===================================================================== */}
      {activeFeatureId === 5 && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-3xl shadow-xl space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIzakayaIndex((prev) => (prev > 0 ? prev - 1 : izakayaList.length - 1));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Món Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-mono font-bold">
                {izakayaIndex + 1} / {izakayaList.length}
              </div>

              <button
                onClick={() => {
                  setIzakayaIndex((prev) => (prev < izakayaList.length - 1 ? prev + 1 : 0));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Món Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                const nextBatch = EXTRA_IZAKAYA_MENU.map((m, i) => ({
                  ...m,
                  id: `${m.id}_b${extraIzakayaCount + 1}_${i}`,
                }));
                setIzakayaList((prev) => [...prev, ...nextBatch]);
                setExtraIzakayaCount((prev) => prev + 1);
                setIzakayaIndex(izakayaList.length);
                speechService.playSuccessSound();
                showToast(`🏮 Đã nạp thêm +5 Món Izakaya mới! (Hiện có ${izakayaList.length + 5})`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/25 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Món Quán Nhậu ({izakayaList.length})</span>
            </button>
          </div>

          {/* Izakaya Content */}
          {(() => {
            const currentItem = izakayaList[izakayaIndex] || izakayaList[0];
            return (
              <div className="space-y-4">
                <div className="p-5 bg-slate-950 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700 text-amber-300 font-semibold">
                      {currentItem.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      <span>{currentItem.name}</span>
                      <button
                        onClick={() => handleSpeak(currentItem.jpName)}
                        className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-400 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </h3>
                    <div className="text-xs text-amber-300 font-jp">{currentItem.jpName} ({currentItem.romaji})</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                  <strong className="text-amber-300 block font-bold">🗣️ Câu thoại gọi món chuẩn người bản xứ:</strong>
                  <p className="text-slate-100 font-jp font-semibold text-sm">{currentItem.orderingPhrase}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-300 block font-bold">👅 Hương vị & Thưởng thức:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentItem.tasteProfile}</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-pink-300 block font-bold">🤫 Bí mật kinh nghiệm đi quán:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentItem.insiderSecret}</p>
                  </div>
                </div>

                {/* Deep Explanation */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
                  <strong className="text-amber-300 block font-bold">🔍 Mục Giải Thích Chuyên Sâu: Văn Hóa Quán Nhậu Izakaya</strong>
                  <p className="text-slate-300 leading-relaxed">{currentItem.deepExplanation}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ===================================================================== */}
      {/* FEATURE 6: BẢNG XẾP HẠNG & GIẢI MÃ MEME / NET SLANG TIKTOK NHẬT */}
      {/* ===================================================================== */}
      {activeFeatureId === 6 && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-3xl shadow-xl space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setBuzzwordIndex((prev) => (prev > 0 ? prev - 1 : buzzwordList.length - 1));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Từ Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-rose-300 font-mono font-bold">
                {buzzwordIndex + 1} / {buzzwordList.length}
              </div>

              <button
                onClick={() => {
                  setBuzzwordIndex((prev) => (prev < buzzwordList.length - 1 ? prev + 1 : 0));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Từ Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                const nextBatch = EXTRA_BUZZWORDS.map((b, i) => ({
                  ...b,
                  id: `${b.id}_b${extraBuzzwordCount + 1}_${i}`,
                }));
                setBuzzwordList((prev) => [...prev, ...nextBatch]);
                setExtraBuzzwordCount((prev) => prev + 1);
                setBuzzwordIndex(buzzwordList.length);
                speechService.playSuccessSound();
                showToast(`🔥 Đã nạp thêm +5 Slang TikTok mới! (Hiện có ${buzzwordList.length + 5})`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/25 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Từ Lóng TikTok ({buzzwordList.length})</span>
            </button>
          </div>

          {/* Buzzword Content */}
          {(() => {
            const currentBuzz = buzzwordList[buzzwordIndex] || buzzwordList[0];
            return (
              <div className="space-y-4">
                <div className="p-5 bg-slate-950 rounded-2xl border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-950 border border-rose-700 text-rose-300 font-semibold">
                      {currentBuzz.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-jp flex items-center gap-2">
                      <span>{currentBuzz.term}</span>
                      <button
                        onClick={() => handleSpeak(currentBuzz.reading)}
                        className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-rose-400 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </h3>
                    <div className="text-xs text-slate-400 font-mono">
                      {currentBuzz.reading} ({currentBuzz.romaji})
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-slate-400 block font-bold">📖 Nghĩa đen gốc:</strong>
                    <p className="text-slate-300 leading-relaxed">{currentBuzz.literalMeaning}</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-pink-500/30 space-y-1">
                    <strong className="text-pink-300 block font-bold">✨ Ý nghĩa lóng GenZ sử dụng:</strong>
                    <p className="text-slate-100 font-medium leading-relaxed">{currentBuzz.slangMeaning}</p>
                  </div>
                </div>

                {/* Example Chat */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <strong className="text-rose-300 block font-bold">💬 Ví dụ đàm thoại thực tế:</strong>
                  <div className="space-y-1 font-jp text-slate-200">
                    <div><strong>A:</strong> {currentBuzz.exampleDialogue.lineA}</div>
                    <div><strong>B:</strong> {currentBuzz.exampleDialogue.lineB}</div>
                  </div>
                  <div className="text-slate-400 italic pt-1 border-t border-slate-800/80">
                    Dịch: {currentBuzz.exampleDialogue.translation}
                  </div>
                </div>

                {/* Deep Explanation */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
                  <strong className="text-rose-300 block font-bold">🔍 Mục Giải Thích Chuyên Sâu: Tâm Lý Học Đằng Sau Trend</strong>
                  <p className="text-slate-300 leading-relaxed">{currentBuzz.deepExplanation}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ===================================================================== */}
      {/* FEATURE 7: BẢN ĐỒ HÀNH HƯƠNG ANIME ĐỜI THỰC (SEICHI JUNREI) */}
      {/* ===================================================================== */}
      {activeFeatureId === 7 && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-3xl shadow-xl space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setPilgrimageIndex((prev) => (prev > 0 ? prev - 1 : pilgrimageList.length - 1));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Địa Điểm Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-teal-300 font-mono font-bold">
                {pilgrimageIndex + 1} / {pilgrimageList.length}
              </div>

              <button
                onClick={() => {
                  setPilgrimageIndex((prev) => (prev < pilgrimageList.length - 1 ? prev + 1 : 0));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Địa Điểm Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                const nextBatch = EXTRA_PILGRIMAGE_SPOTS.map((s, i) => ({
                  ...s,
                  id: `${s.id}_b${extraPilgrimageCount + 1}_${i}`,
                }));
                setPilgrimageList((prev) => [...prev, ...nextBatch]);
                setExtraPilgrimageCount((prev) => prev + 1);
                setPilgrimageIndex(pilgrimageList.length);
                speechService.playSuccessSound();
                showToast(`🗾 Đã nạp thêm +5 Địa điểm hành hương Anime! (Hiện có ${pilgrimageList.length + 5})`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-teal-600/25 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Địa Điểm Hành Hương ({pilgrimageList.length})</span>
            </button>
          </div>

          {/* Pilgrimage Content */}
          {(() => {
            const currentSpot = pilgrimageList[pilgrimageIndex] || pilgrimageList[0];
            return (
              <div className="space-y-4">
                <div className="p-5 bg-slate-950 rounded-2xl border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-950 border border-teal-700 text-teal-300 font-semibold">
                      🎬 Anime: {currentSpot.animeTitle} ({currentSpot.jpAnimeTitle})
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-teal-400 shrink-0" />
                      <span>{currentSpot.spotName}</span>
                    </h3>
                    <div className="text-xs text-slate-300 font-medium">📍 {currentSpot.realLocation}</div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 self-start sm:self-auto max-w-xs">
                    <strong className="text-sky-300 block">Ga tàu gần nhất:</strong>
                    <span>{currentSpot.nearestStation}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1 text-xs">
                  <strong className="text-teal-300 block font-bold">🎬 Cảnh phim kinh điển trong anime:</strong>
                  <p className="text-slate-100 leading-relaxed text-sm">{currentSpot.iconicScene}</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/30 text-xs text-slate-200">
                  <strong className="text-amber-400">⚠️ Quy tắc ứng xử khi hành hương (Pilgrim Etiquette): </strong>
                  {currentSpot.pilgrimEtiquette}
                </div>

                {/* Deep Explanation */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
                  <strong className="text-teal-300 block font-bold">🔍 Mục Giải Thích Chuyên Sâu: Hiện Tượng Văn Hóa Seichi Junrei</strong>
                  <p className="text-slate-300 leading-relaxed">{currentSpot.deepExplanation}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ===================================================================== */}
      {/* FEATURE 8: BỘ SƯU TẬP TƯ THẾ CHỤP ẢNH PURIKURA & TIKTOK NHẬT BẢN */}
      {/* ===================================================================== */}
      {activeFeatureId === 8 && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-3xl shadow-xl space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setPurikuraIndex((prev) => (prev > 0 ? prev - 1 : purikuraList.length - 1));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Dáng Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-pink-300 font-mono font-bold">
                {purikuraIndex + 1} / {purikuraList.length}
              </div>

              <button
                onClick={() => {
                  setPurikuraIndex((prev) => (prev < purikuraList.length - 1 ? prev + 1 : 0));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Dáng Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                const nextBatch = EXTRA_PURIKURA_POSES.map((p, i) => ({
                  ...p,
                  id: `${p.id}_b${extraPurikuraCount + 1}_${i}`,
                }));
                setPurikuraList((prev) => [...prev, ...nextBatch]);
                setExtraPurikuraCount((prev) => prev + 1);
                setPurikuraIndex(purikuraList.length);
                speechService.playSuccessSound();
                showToast(`📸 Đã nạp thêm +5 Dáng chụp ảnh Purikura mới! (Hiện có ${purikuraList.length + 5})`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-pink-600/25 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Dáng Chụp Ảnh ({purikuraList.length})</span>
            </button>
          </div>

          {/* Purikura Content */}
          {(() => {
            const currentPose = purikuraList[purikuraIndex] || purikuraList[0];
            return (
              <div className="space-y-4">
                <div className="p-5 bg-slate-950 rounded-2xl border border-pink-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-950 border border-pink-700 text-pink-300 font-semibold">
                      {currentPose.vibeTag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      <Camera className="w-5 h-5 text-pink-400" />
                      <span>{currentPose.name}</span>
                    </h3>
                    <div className="text-xs text-pink-300 font-jp">{currentPose.jpName}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-pink-300 block font-bold">👐 Hướng dẫn thực hiện dáng:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentPose.description}</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-amber-300 block font-bold">📐 Góc chụp & Thần thái chuẩn nhất:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentPose.bestAngle}</p>
                  </div>
                </div>

                {/* Caption Instagram */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-pink-400 font-bold">📱 Caption Instagram & TikTok tiếng Nhật để copy:</strong>
                    <button
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(currentPose.instagramCaption);
                          speechService.playSuccessSound();
                          showToast('📋 Đã sao chép Caption vào Clipboard!');
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao Chép</span>
                    </button>
                  </div>
                  <p className="text-slate-100 font-mono font-medium">{currentPose.instagramCaption}</p>
                </div>

                {/* Deep Explanation */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
                  <strong className="text-pink-300 block font-bold">🔍 Mục Giải Thích Chuyên Sâu: Văn Hóa Ảnh Dán Purikura</strong>
                  <p className="text-slate-300 leading-relaxed">{currentPose.deepExplanation}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ===================================================================== */}
      {/* FEATURE 9: BỘ GIẢI MÃ LINH VẬT & THẦN MAY MẮN (ENGIMONO & MASCOTS) */}
      {/* ===================================================================== */}
      {activeFeatureId === 9 && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-3xl shadow-xl space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMascotIndex((prev) => (prev > 0 ? prev - 1 : mascotList.length - 1));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Linh Vật Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-mono font-bold">
                {mascotIndex + 1} / {mascotList.length}
              </div>

              <button
                onClick={() => {
                  setMascotIndex((prev) => (prev < mascotList.length - 1 ? prev + 1 : 0));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Linh Vật Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                const nextBatch = EXTRA_ENGIMONO_MASCOTS.map((m, i) => ({
                  ...m,
                  id: `${m.id}_b${extraMascotCount + 1}_${i}`,
                }));
                setMascotList((prev) => [...prev, ...nextBatch]);
                setExtraMascotCount((prev) => prev + 1);
                setMascotIndex(mascotList.length);
                speechService.playSuccessSound();
                showToast(`🍀 Đã nạp thêm +5 Linh vật may mắn mới! (Hiện có ${mascotList.length + 5})`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/25 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Linh Vật May Mắn ({mascotList.length})</span>
            </button>
          </div>

          {/* Mascot Content */}
          {(() => {
            const currentMascot = mascotList[mascotIndex] || mascotList[0];
            return (
              <div className="space-y-4">
                <div className="p-5 bg-slate-950 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700 text-amber-300 font-mono">
                      Khởi nguồn: {currentMascot.originEra}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      <span>{currentMascot.name}</span>
                      <button
                        onClick={() => handleSpeak(currentMascot.jpName)}
                        className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-400 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </h3>
                    <div className="text-xs text-amber-300 font-jp">{currentMascot.jpName}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-300 block font-bold">✨ Quyền năng phước lành:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentMascot.mythologicalPower}</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <strong className="text-sky-300 block font-bold">📍 Vị trí bài trí phong thủy:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentMascot.placementRule}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-xl border border-amber-500/30 text-xs text-slate-200">
                  <strong className="text-amber-400">💡 Sự thật thú vị ít người biết: </strong>
                  {currentMascot.curiousFact}
                </div>

                {/* Deep Explanation */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
                  <strong className="text-amber-300 block font-bold">🔍 Mục Giải Thích Chuyên Sâu: Thần Đạo & Linh Vật Yuru-Chara</strong>
                  <p className="text-slate-300 leading-relaxed">{currentMascot.deepExplanation}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ===================================================================== */}
      {/* FEATURE 10: TRÌNH THỬ TÀI TỪ TƯỢNG THANH TƯỢNG HÌNH (ONOMATOPOEIA) */}
      {/* ===================================================================== */}
      {activeFeatureId === 10 && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-3xl shadow-xl space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setQuizSelectedOption(null);
                  setOnomatopoeiaIndex((prev) => (prev > 0 ? prev - 1 : onomatopoeiaList.length - 1));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Câu Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-purple-300 font-mono font-bold">
                Câu {onomatopoeiaIndex + 1} / {onomatopoeiaList.length} · Điểm: {quizScore}
              </div>

              <button
                onClick={() => {
                  setQuizSelectedOption(null);
                  setOnomatopoeiaIndex((prev) => (prev < onomatopoeiaList.length - 1 ? prev + 1 : 0));
                  speechService.playSuccessSound();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Câu Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                const nextBatch = EXTRA_ONOMATOPOEIA_QUIZ.map((q, i) => ({
                  ...q,
                  id: `${q.id}_b${extraOnomatopoeiaCount + 1}_${i}`,
                }));
                setOnomatopoeiaList((prev) => [...prev, ...nextBatch]);
                setExtraOnomatopoeiaCount((prev) => prev + 1);
                setOnomatopoeiaIndex(onomatopoeiaList.length);
                setQuizSelectedOption(null);
                speechService.playSuccessSound();
                showToast(`🎯 Đã nạp thêm +5 Câu đố từ tượng thanh mới! (Hiện có ${onomatopoeiaList.length + 5})`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/25 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Câu Đố ({onomatopoeiaList.length})</span>
            </button>
          </div>

          {/* Quiz Content */}
          {(() => {
            const currentQuiz = onomatopoeiaList[onomatopoeiaIndex] || onomatopoeiaList[0];
            return (
              <div className="space-y-4">
                <div className="p-5 bg-slate-950 rounded-2xl border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-semibold">
                      {currentQuiz.type}
                    </span>
                    <button
                      onClick={() => handleSpeak(currentQuiz.audioVoiceHint)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-slate-800 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe gợi ý âm thanh</span>
                    </button>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                    {currentQuiz.situationQuestion}
                  </h3>
                </div>

                {/* 4 Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {currentQuiz.options.map((opt, i) => {
                    const isSelected = quizSelectedOption === i;
                    const isCorrect = i === currentQuiz.correctIndex;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setQuizSelectedOption(i);
                          if (isCorrect) {
                            setQuizScore((prev) => prev + 10);
                            speechService.playSuccessSound();
                          } else {
                            speechService.playErrorSound();
                          }
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer font-bold ${
                          quizSelectedOption === null
                            ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                            : isCorrect
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-600/20'
                            : isSelected
                            ? 'bg-rose-950 border-rose-500 text-rose-200'
                            : 'bg-slate-900/40 border-slate-800 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {quizSelectedOption !== null && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                          {quizSelectedOption !== null && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback explanation after select */}
                {quizSelectedOption !== null && (
                  <div
                    className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 animate-fadeIn ${
                      quizSelectedOption === currentQuiz.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                    }`}
                  >
                    <strong className="block text-sm">
                      {quizSelectedOption === currentQuiz.correctIndex ? '🎉 Chính xác!' : '❌ Chưa chính xác!'}
                    </strong>
                    <p>{currentQuiz.explanation}</p>
                  </div>
                )}

                {/* Deep Explanation */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1.5">
                  <strong className="text-purple-300 block font-bold">🔍 Mục Giải Thích Chuyên Sâu: Ngôn Ngữ Tượng Thanh Của Người Nhật</strong>
                  <p className="text-slate-300 leading-relaxed">{currentQuiz.deepExplanation}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
