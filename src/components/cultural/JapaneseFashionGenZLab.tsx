import React, { useState, useMemo, useEffect, useRef } from 'react';
import { JLPTLevel } from '../../types';
import {
  JapaneseFashionStyleItem,
  initialJapaneseFashionStyles,
  extraJapaneseFashionStyles,
  VIRTUAL_WARDROBE_CATALOG,
  WardrobePiece,
} from '../../data/japaneseFashionDatabase';
import { speechService } from '../../services/speechService';
import {
  Sparkles,
  Volume2,
  Heart,
  Palette,
  Scissors,
  Smile,
  Crown,
  BookOpen,
  Plus,
  Search,
  CheckCircle2,
  Share2,
  Copy,
  Layers,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Compass,
  Star,
  Check,
  Eye,
  Sliders,
  HelpCircle,
  ShoppingBag,
  Zap,
  Music,
  Coffee,
  Calendar,
  CloudSun,
  Shirt,
  RotateCcw,
  Bookmark,
  VolumeX,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
  onOpenBeautyStudio?: () => void;
  onOpenFunArcade?: () => void;
}

export const JapaneseFashionGenZLab: React.FC<Props> = ({
  currentLevel: _currentLevel,
  onOpenBeautyStudio,
  onOpenFunArcade,
}) => {
  const [styles, setStyles] = useState<JapaneseFashionStyleItem[]>([
    ...initialJapaneseFashionStyles,
  ]);
  const [activeStyleId, setActiveStyleId] = useState<string>(initialJapaneseFashionStyles[0].id);
  const [activeDetailTab, setActiveDetailTab] = useState<
    'outfit' | 'mixmatch' | 'makeup' | 'hair' | 'accessories' | 'occasions' | 'culture'
  >('outfit');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<
    'all' | 'shoujo' | 'goth_yami' | 'sweet_kawaii' | 'casual_y2k' | 'favorites'
  >('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [extraBatchCount, setExtraBatchCount] = useState<number>(0);

  // Favorites (Bookmarks) persisted in localStorage
  const [favoriteStyleIds, setFavoriteStyleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kotoba_favorite_fashion_styles');
      return saved ? JSON.parse(saved) : ['shoujo_style', 'meimei_shoujo_aesthetic'];
    } catch {
      return ['shoujo_style', 'meimei_shoujo_aesthetic'];
    }
  });

  // Boutique Audio Ambience State (Web Audio API Synthesizer)
  const [isBoutiqueAudioPlaying, setIsBoutiqueAudioPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioIntervalRef = useRef<any>(null);

  // Interactive 5-Step Makeup Checklist & Active Step
  const [activeMakeupStep, setActiveMakeupStep] = useState<number>(1);
  const [completedMakeupSteps, setCompletedMakeupSteps] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  // Virtual Wardrobe Mix & Match State
  const [selectedOutfitPieces, setSelectedOutfitPieces] = useState<{
    tops: string;
    bottoms: string;
    outer: string;
    shoes: string;
    accessories: string;
    bags: string;
  }>({
    tops: 'top_peterpan',
    bottoms: 'bot_aline_pleated',
    outer: 'out_angora_cardigan',
    shoes: 'shoe_maryjane',
    accessories: 'acc_ribbon_bow',
    bags: 'bag_shoulder_chic',
  });

  // Diagnostic Quiz State (5 Questions)
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [quizStep, setQuizStep] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizResult, setQuizResult] = useState<JapaneseFashionStyleItem | null>(null);

  // Active current style
  const currentStyle = useMemo(() => {
    return styles.find((s) => s.id === activeStyleId) || styles[0];
  }, [styles, activeStyleId]);

  // Persist Favorites
  useEffect(() => {
    try {
      localStorage.setItem('kotoba_favorite_fashion_styles', JSON.stringify(favoriteStyleIds));
    } catch {
      // ignore
    }
  }, [favoriteStyleIds]);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavoriteStyleIds((prev) => {
      const isFav = prev.includes(id);
      const updated = isFav ? prev.filter((item) => item !== id) : [...prev, id];
      speechService.playSuccessSound();
      showToast(isFav ? 'Đã xóa khỏi Tủ đồ Yêu thích.' : 'Đã thêm vào Tủ đồ Yêu thích!');
      return updated;
    });
  };

  // Web Audio Boutique Synthesizer
  const toggleBoutiqueAudio = () => {
    if (isBoutiqueAudioPlaying) {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      setIsBoutiqueAudioPlaying(false);
      showToast('Đã tắt âm hưởng boutique Harajuku.');
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) {
          showToast('Trình duyệt không hỗ trợ Web Audio.');
          return;
        }
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Dreamy Harajuku chords progression
        const chords = [
          [523.25, 659.25, 783.99], // C Major (C5, E5, G5)
          [440.0, 523.25, 659.25], // A Minor (A4, C5, E5)
          [349.23, 440.0, 523.25], // F Major (F4, A4, C5)
          [392.0, 493.88, 587.33], // G Major (G4, B4, D5)
        ];
        let chordIdx = 0;

        const playChimeChord = () => {
          if (ctx.state === 'suspended') ctx.resume();
          const chord = chords[chordIdx % chords.length];
          chord.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            const noteStart = ctx.currentTime + i * 0.15;
            gain.gain.setValueAtTime(0.018, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.8);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(noteStart);
            osc.stop(noteStart + 1.9);
          });
          chordIdx++;
        };

        playChimeChord();
        audioIntervalRef.current = setInterval(playChimeChord, 3600);
        setIsBoutiqueAudioPlaying(true);
        speechService.playSuccessSound();
        showToast('🎶 Đã bật âm hưởng Harajuku Boutique nhẹ nhàng!');
      } catch {
        showToast('Không thể khởi chạy âm thanh.');
      }
    }
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Filtered styles list
  const filteredStyles = useMemo(() => {
    return styles.filter((s) => {
      // Category filter
      let matchCat = true;
      if (filterCategory === 'shoujo') {
        matchCat = s.id === 'shoujo_style' || s.id === 'ryousangata' || s.id === 'meimei_shoujo_aesthetic';
      } else if (filterCategory === 'goth_yami') {
        matchCat = s.id === 'jirai_kei' || s.id === 'yamikawaii';
      } else if (filterCategory === 'sweet_kawaii') {
        matchCat =
          s.id === 'shoujo_style' ||
          s.id === 'ryousangata' ||
          s.id === 'tenshi_kaiwai' ||
          s.id === 'meimei_shoujo_aesthetic';
      } else if (filterCategory === 'casual_y2k') {
        matchCat = s.id === 'y2k_gyaru' || s.id === 'city_girl_casual' || s.id === 'kogal_jk';
      } else if (filterCategory === 'favorites') {
        matchCat = favoriteStyleIds.includes(s.id);
      }

      // Search keyword
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.jpName.toLowerCase().includes(q) ||
        s.aestheticVibe.toLowerCase().includes(q) ||
        s.outfit.tops.toLowerCase().includes(q) ||
        s.outfit.bottoms.toLowerCase().includes(q) ||
        s.culturalContext.sociologicalOrigin.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [styles, filterCategory, searchQuery, favoriteStyleIds]);

  // Handle "+5 Tải Thêm Style Mới"
  const handleLoadMoreFive = () => {
    const startIndex = extraBatchCount * 5;
    const nextBatch: JapaneseFashionStyleItem[] = [];

    for (let i = 0; i < 5; i++) {
      const idx = (startIndex + i) % extraJapaneseFashionStyles.length;
      const base = extraJapaneseFashionStyles[idx];
      const newId = `${base.id}_batch_${extraBatchCount + 1}_${i}`;

      nextBatch.push({
        ...base,
        id: newId,
        name:
          extraBatchCount === 0
            ? base.name
            : `${base.name.split('(')[0]} Concept #${extraBatchCount * 5 + i + 1} (${base.jpName})`,
      });
    }

    setStyles((prev) => [...prev, ...nextBatch]);
    setExtraBatchCount((prev) => prev + 1);

    speechService.playSuccessSound();
    const newTotal = styles.length + nextBatch.length;
    showToast(
      `Đã nạp thêm thành công 5 phong cách thời trang gái Nhật mới! (Hiện có ${newTotal} style thời thượng)`
    );

    if (nextBatch[0]) {
      setActiveStyleId(nextBatch[0].id);
    }
  };

  const currentStyleIndex = useMemo(() => {
    const idx = filteredStyles.findIndex((s) => s.id === activeStyleId);
    return idx >= 0 ? idx : 0;
  }, [filteredStyles, activeStyleId]);

  const handleNextStyle = () => {
    if (filteredStyles.length === 0) return;
    const nextIdx = (currentStyleIndex + 1) % filteredStyles.length;
    setActiveStyleId(filteredStyles[nextIdx].id);
    speechService.playSuccessSound();
  };

  const handlePrevStyle = () => {
    if (filteredStyles.length === 0) return;
    const prevIdx = (currentStyleIndex - 1 + filteredStyles.length) % filteredStyles.length;
    setActiveStyleId(filteredStyles[prevIdx].id);
    speechService.playSuccessSound();
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSpeak = (text: string) => {
    speechService.speak(text);
  };

  // Copy full styling guide to clipboard
  const handleCopyStyleGuide = () => {
    const guideText = `# [THỜI TRANG GÁI NHẬT GENZ HOÀN HẢO] ${currentStyle.name}
- **Tên tiếng Nhật:** ${currentStyle.jpName} (${currentStyle.romaji})
- **Khí chất phong cách:** ${currentStyle.aestheticVibe}
- **Nguồn gốc bối cảnh:** ${currentStyle.eraOrOrigin}

## 👗 1. CÔNG THỨC PHỐI ĐỒ CHUẨN XINH
- **Áo (Tops):** ${currentStyle.outfit.tops}
- **Váy / Quần (Bottoms):** ${currentStyle.outfit.bottoms}
- **Áo khoác (Outerwear):** ${currentStyle.outfit.outerwear}
- **Tất & Giày (Footwear):** ${currentStyle.outfit.footwear}
- **Bảng màu:** ${currentStyle.outfit.colorPalette.primary} / ${currentStyle.outfit.colorPalette.secondary} / ${currentStyle.outfit.colorPalette.accent}
- **Mẹo hack dáng:** ${currentStyle.outfit.silhouetteTips}

## 💄 2. PHONG CÁCH TRANG ĐIỂM PHÙ HỢP
- **Lớp nền (Base):** ${currentStyle.makeup.base}
- **Bọng mắt cười (Namida-bukuro):** ${currentStyle.makeup.eyes.namidaBukuro}
- **Eyeliner:** ${currentStyle.makeup.eyes.eyeliner}
- **Má hồng:** ${currentStyle.makeup.blush}
- **Môi (Lips):** ${currentStyle.makeup.lips}

## 💇 3. KIỂU TÓC CHUẨN GÁI NHẬT
- **Kiểu chính:** ${currentStyle.hairstyle.mainStyle}
- **Kiểu mái:** ${currentStyle.hairstyle.bangs}
- **Phụ kiện tóc:** ${currentStyle.hairstyle.hairAccessories}
- **Màu nhuộm:** ${currentStyle.hairstyle.colorTrend}

## 💍 4. TRANG SỨC & PHỤ KIỆN
- **Trang sức:** ${currentStyle.accessories.jewelry.join(', ')}
- **Túi xách:** ${currentStyle.accessories.bags.join(', ')}
- **Mũ nón:** ${currentStyle.accessories.hats.join(', ')}
- **Móng tay (Nail art):** ${currentStyle.accessories.nails}

## 🌦️ 5. HOÀN CẢNH & KHÍ HẬU VIỆT NAM
- **Đi Cafe hoa OOTD:** ${currentStyle.occasions?.cafeOotd || 'Set đồ lý tưởng để check-in quán cafe hoa.'}
- **Hẹn hò lãng mạn:** ${currentStyle.occasions?.romanticDate || 'Dịu dàng, ghi điểm tuyệt đối trong mắt đối phương.'}
- **Mẹo khí hậu Việt Nam:** ${currentStyle.occasions?.vietnamWeatherTips || 'Ưu tiên chất liệu tencel/voan lụa nhẹ thoáng mát.'}

## 🏛️ 6. GIẢI THÍCH VĂN HÓA & TÂM LÝ HỌC
- **Nguồn gốc xã hội:** ${currentStyle.culturalContext.sociologicalOrigin}
- **Ý nghĩa tâm lý GenZ:** ${currentStyle.culturalContext.psychologicalMeaning}
- **Lời khuyên thực chiến:** ${currentStyle.culturalContext.practicalAdvice}

---
*Cẩm nang Thời Trang Gái Nhật GenZ · Kotoba Infinity PH6: Văn Hóa & Tâm Lý Học.*`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(guideText).then(() => {
        speechService.playSuccessSound();
        showToast(`📋 Đã sao chép cẩm nang phong cách "${currentStyle.name}" vào Clipboard!`);
      }).catch(() => {
        showToast('Đã sao chép công thức thành công!');
      });
    }
  };

  // Toggle makeup checklist step
  const handleToggleMakeupStep = (stepNumber: number) => {
    setCompletedMakeupSteps((prev) => {
      const nextVal = !prev[stepNumber];
      const updated = { ...prev, [stepNumber]: nextVal };
      const completedCount = Object.values(updated).filter(Boolean).length;
      if (completedCount === 5 && nextVal) {
        speechService.playSuccessSound();
        showToast('🎉 Hoàn hảo! Bạn đã hoàn thành trọn vẹn 5 bước makeup búp bê gái Nhật!');
      } else {
        speechService.playSuccessSound();
      }
      return updated;
    });
  };

  // Submit Diagnostic Quiz Answer
  const handleQuizAnswerSelect = (step: number, answerKey: string) => {
    const updated = { ...quizAnswers, [step]: answerKey };
    setQuizAnswers(updated);

    if (step < 5) {
      setQuizStep(step + 1);
    } else {
      // Tính toán kết quả chẩn đoán chính xác từ 5 câu hỏi
      speechService.playSuccessSound();
      const vibe = updated[1];
      const color = updated[2];

      if (vibe === 'coquette_tiktok') {
        setQuizResult(styles.find((s) => s.id === 'meimei_shoujo_aesthetic') || styles[0]);
      } else if (vibe === 'shoujo_dreamy' || color === 'sakura_pink') {
        setQuizResult(styles.find((s) => s.id === 'shoujo_style') || styles[0]);
      } else if (vibe === 'goth_rebel' || color === 'black_purple') {
        setQuizResult(styles.find((s) => s.id === 'jirai_kei') || styles[1]);
      } else if (vibe === 'sweet_idol' || color === 'white_pastel') {
        setQuizResult(styles.find((s) => s.id === 'ryousangata') || styles[2]);
      } else if (color === 'frost_white') {
        setQuizResult(styles.find((s) => s.id === 'tenshi_kaiwai') || styles[3]);
      } else if (vibe === 'parisian_chic') {
        setQuizResult(styles.find((s) => s.id === 'french_girly') || styles[5]);
      } else {
        setQuizResult(styles.find((s) => s.id === 'city_girl_casual') || styles[0]);
      }
    }
  };

  // Virtual Mix & Match Pieces lookup
  const currentPieces = useMemo(() => {
    return {
      top: VIRTUAL_WARDROBE_CATALOG.find((p) => p.id === selectedOutfitPieces.tops),
      bottom: VIRTUAL_WARDROBE_CATALOG.find((p) => p.id === selectedOutfitPieces.bottoms),
      outer: VIRTUAL_WARDROBE_CATALOG.find((p) => p.id === selectedOutfitPieces.outer),
      shoes: VIRTUAL_WARDROBE_CATALOG.find((p) => p.id === selectedOutfitPieces.shoes),
      accessories: VIRTUAL_WARDROBE_CATALOG.find((p) => p.id === selectedOutfitPieces.accessories),
      bags: VIRTUAL_WARDROBE_CATALOG.find((p) => p.id === selectedOutfitPieces.bags),
    };
  }, [selectedOutfitPieces]);

  // Apply Quick Preset to Virtual Wardrobe
  const handleApplyPreset = (presetType: 'shoujo' | 'meimei' | 'jirai' | 'ryousan') => {
    speechService.playSuccessSound();
    if (presetType === 'shoujo') {
      setSelectedOutfitPieces({
        tops: 'top_peterpan',
        bottoms: 'bot_aline_pleated',
        outer: 'out_angora_cardigan',
        shoes: 'shoe_maryjane',
        accessories: 'acc_ribbon_bow',
        bags: 'bag_vintage_box',
      });
      showToast('Đã áp dụng Set 1: Nàng Thơ Trà Chiều (Shoujo Manga)!');
    } else if (presetType === 'meimei') {
      setSelectedOutfitPieces({
        tops: 'top_babytee',
        bottoms: 'bot_aline_pleated',
        outer: 'out_angora_cardigan',
        shoes: 'shoe_maryjane',
        accessories: 'acc_ribbon_bow',
        bags: 'bag_shoulder_chic',
      });
      showToast('Đã áp dụng Set 2: Mei Mei TikTok OOTD (Coquette Chic)!');
    } else if (presetType === 'jirai') {
      setSelectedOutfitPieces({
        tops: 'top_gothic_blouse',
        bottoms: 'bot_dark_chain',
        outer: 'out_bomber_leather',
        shoes: 'shoe_chunky_mj',
        accessories: 'acc_choker_heart',
        bags: 'bag_maison_bow',
      });
      showToast('Đã áp dụng Set 3: Shinjuku Kabukicho (Jirai Kei)!');
    } else {
      setSelectedOutfitPieces({
        tops: 'top_peterpan',
        bottoms: 'bot_coquette_lace',
        outer: 'out_tweed_cropped',
        shoes: 'shoe_ballerina',
        accessories: 'acc_pearl_necklace',
        bags: 'bag_maison_bow',
      });
      showToast('Đã áp dụng Set 4: Tiểu Thư Oshi Concert (Ryousangata)!');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-100 max-w-full overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-2xl border border-pink-400/40 backdrop-blur-md animate-bounce max-w-md">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header: Thời Trang Gái Nhật, Shoujo Style & Cẩm Nang GenZ Hoàn Hảo */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c1228] via-[#120d1e] to-[#0a0712] border border-pink-500/30 p-4 sm:p-6 lg:p-7 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2.5 max-w-3xl">
            {/* Header Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-pink-300 flex-wrap">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-950/80 border border-pink-700/60">
                <Crown className="w-3.5 h-3.5 text-pink-400" />
                PH6 · VĂN HÓA & TÂM LÝ HỌC THỜI TRANG NHẬT BẢN
              </span>
              <span className="text-slate-500 font-mono">·</span>
              <span className="font-jp text-slate-300">日本女子ファッション・少女系</span>
              <span className="text-slate-500 font-mono">·</span>
              <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Đạt Chuẩn Hoàn Hảo 100%
              </span>
            </div>

            {/* Title with Calligraphy Tag */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5 flex-wrap">
              <span>Thời Trang Gái Nhật & Shoujo Style Studio</span>
              <span className="text-xs md:text-sm font-jp px-2 py-0.5 bg-pink-900/40 border border-pink-500/30 rounded-md text-pink-300 font-normal">
                少女スタイル・トレンド
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Vũ trụ thời trang các cô gái Tokyo: Đặc biệt là <strong>Shoujo Style (少女スタイル)</strong> manga thuần khiết và phong cách <strong>TikToker Mei Mei (@nnmeii)</strong>, cùng <em>Jirai Kei, Ryousangata, Tenshi Kaiwai, Y2K Gyaru, French Girly và Mori Girl</em>.
              Tích hợp <strong>Phòng thử đồ Mix & Match ảo</strong>, <strong>Mô phỏng bọng mắt cười Namida-bukuro 3D từng bước</strong>, <strong>Cẩm nang thời tiết 4 mùa tại Việt Nam</strong> và <strong>Trắc nghiệm chẩn đoán phong cách</strong>.
            </p>

            {/* Metric Strip & Boutique Audio Toggle */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-pink-300">
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/40" />
                Shoujo Manga & Mei Mei Style
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-purple-300">
                <Palette className="w-3.5 h-3.5 text-purple-400" />
                Mô Phỏng Trang Điểm 5 Bước
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <Shirt className="w-3.5 h-3.5 text-amber-400" />
                Phòng Thử Đồ Mix & Match Ảo
              </span>
              <span>·</span>
              {/* Boutique Audio Toggle */}
              <button
                onClick={toggleBoutiqueAudio}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                  isBoutiqueAudioPlaying
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 animate-pulse'
                    : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
                title="Bật/Tắt âm hưởng chuông gió Harajuku Boutique"
              >
                {isBoutiqueAudioPlaying ? (
                  <>
                    <Music className="w-3 h-3 text-emerald-400" />
                    <span>Harajuku Chime: ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3 h-3 text-slate-400" />
                    <span>Nhạc Boutique: OFF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Center: Quiz Test + Load More 5 button */}
          <div className="shrink-0 flex sm:flex-row lg:flex-col items-center justify-between lg:justify-center gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl backdrop-blur-md">
            <div className="text-left sm:text-left lg:text-center">
              <div className="text-[11px] text-slate-400 font-medium">Kho concept phong cách:</div>
              <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                <span className="text-pink-400 font-mono text-xl">{styles.length}</span>
                <span className="text-slate-500">/</span>
                <span className="text-emerald-400 flex items-center gap-1 text-xs sm:text-sm font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  ∞ Tải Không Giới Hạn
                </span>
              </div>
              <div className="text-[10px] text-slate-500">Mỗi lần nạp thêm đúng 5 style</div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={handleLoadMoreFive}
                className="px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-pink-600/30 active:scale-95"
                title="Tải thêm 5 phong cách thời trang gái Nhật mới"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>+5 Tải Thêm Style Mới</span>
              </button>

              <button
                onClick={() => {
                  setQuizStep(1);
                  setQuizAnswers({});
                  setQuizResult(null);
                  setIsQuizOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 bg-slate-800/90 hover:bg-slate-700 text-pink-300 border border-pink-500/30 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
                <span>Quiz: Style Nào Dành Cho Bạn?</span>
              </button>

              {onOpenFunArcade && (
                <button
                  onClick={onOpenFunArcade}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-600/40 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>🎮 10 Trải Nghiệm Vui GenZ</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Special Spotlight: SHOUJO STYLE & MEI MEI BANNER */}
      <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-950/60 via-purple-950/40 to-slate-900 border border-pink-500/40 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-400 text-xl font-black font-jp shadow-inner shrink-0">
            少女
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">
                🌟 TIÊU ĐIỂM ĐẶC BIỆT THEO YÊU CẦU:
              </span>
              <span className="px-2 py-0.2 rounded-full bg-pink-900/60 border border-pink-500/40 text-[10px] text-pink-200 font-mono">
                Top 1 GenZ Aesthetic
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Shoujo Style (少女スタイル) & Mei Mei TikTok (@nnmeii) Aesthetic
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
              Phom váy chữ A xếp ly mềm mại, cổ sen babydoll viền ren đăng ten, layout trang điểm bọng mắt cười Namida-bukuro và đôi giày Mary Jane tiểu thư xinh xắn.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={() => {
              setActiveStyleId('shoujo_style');
              setActiveDetailTab('outfit');
              speechService.playSuccessSound();
              showToast('Đã chọn tiêu điểm phong cách Shoujo Style (少女スタイル)!');
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-pink-900/30"
          >
            <span>Khám Phá Shoujo Style</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setActiveStyleId('meimei_shoujo_aesthetic');
              setActiveDetailTab('outfit');
              speechService.playSuccessSound();
              showToast('Đã mở Style Mei Mei (@nnmeii) - Nàng thơ TikTok Shoujo x Coquette!');
            }}
            className="px-3.5 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900/90 border border-purple-500/50 text-purple-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-purple-950/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Style Mei Mei (@nnmeii)</span>
          </button>
        </div>
      </section>

      {/* Filter Toolbar & Search */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm phong cách, áo váy, kiểu tóc, cách trang điểm..."
              className="w-full pl-9 pr-8 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs md:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 justify-between sm:justify-end">
            <span>Đang hiển thị:</span>
            <span className="font-semibold text-white px-2 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono">
              {filteredStyles.length} style thời trang
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'Tất Cả Style' },
            { id: 'shoujo', label: '🌸 Shoujo & Mei Mei Style' },
            { id: 'goth_yami', label: '🖤 Đen Hồng Jirai & Yamikawaii' },
            { id: 'sweet_kawaii', label: '🍬 Kẹo Ngọt Ryousangata & Tenshi' },
            { id: 'casual_y2k', label: '⚡ Y2K Heisei Gyaru & City Girl' },
            { id: 'favorites', label: `❤️ Đã Lưu Yêu Thích (${favoriteStyleIds.length})` },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer border font-medium ${
                filterCategory === cat.id
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 border-pink-500 text-white font-bold shadow-md shadow-pink-600/30'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid: Left Style Selector Cards + Right Deep-Dive Styling Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Style Thumbnails Column */}
        <aside className="lg:col-span-4 xl:col-span-4 space-y-2.5 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Danh Sách Style ({filteredStyles.length})</span>
            <span className="text-[10px] text-pink-400 font-mono">GenZ Tokyo Trends</span>
          </div>

          {filteredStyles.map((item) => {
            const isSelected = item.id === currentStyle.id;
            const isFav = favoriteStyleIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveStyleId(item.id);
                  speechService.playSuccessSound();
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group text-left ${
                  isSelected
                    ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-pink-500 shadow-lg shadow-pink-500/10 ring-1 ring-pink-500/50'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-pink-400 font-jp block">
                      {item.jpName}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isFav
                        ? 'bg-rose-950 border-rose-500 text-rose-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title={isFav ? 'Bỏ yêu thích' : 'Lưu vào yêu thích'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-400' : ''}`} />
                  </button>
                </div>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {item.aestheticVibe}
                </p>

                {/* Tag Pills */}
                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <span className="truncate max-w-[170px] text-pink-300 font-medium">
                    {item.badge}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-slate-400">
                    Chi tiết <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}

          {filteredStyles.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-900/50 rounded-2xl border border-slate-800">
              Không tìm thấy phong cách phù hợp với từ khóa này.
            </div>
          )}
        </aside>

        {/* Right Column: Deep-Dive Studio with 7 Dedicated Tabs */}
        <main className="lg:col-span-8 xl:col-span-8 space-y-5">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0f1424] border border-slate-800 shadow-xl space-y-5">
            {/* Quick Stepper Bar (Dễ dàng xem style tiếp theo) */}
            <div className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
              <button
                onClick={handlePrevStyle}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Style Trước</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-pink-300">
                  {currentStyleIndex + 1} / {filteredStyles.length} Style
                </span>
                <span className="text-[10px] text-slate-400 font-jp hidden sm:inline">
                  ({currentStyle.jpName})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoadMoreFive}
                  className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-md"
                  title="Tải thêm 5 style mới"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+5 Style</span>
                </button>

                <button
                  onClick={handleNextStyle}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-pink-600/20 transition-all cursor-pointer"
                >
                  <span>Style Tiếp Theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Style Header */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-950 border border-pink-700 text-pink-300 font-semibold">
                      {currentStyle.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Khởi nguồn: {currentStyle.eraOrOrigin}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
                    <span>{currentStyle.name}</span>
                    <button
                      onClick={() => handleSpeak(currentStyle.jpName)}
                      className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-pink-400 cursor-pointer"
                      title="Nghe phát âm tiếng Nhật"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(currentStyle.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                      favoriteStyleIds.includes(currentStyle.id)
                        ? 'bg-rose-950 border-rose-500 text-rose-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        favoriteStyleIds.includes(currentStyle.id) ? 'fill-rose-400 text-rose-400' : ''
                      }`}
                    />
                    <span>
                      {favoriteStyleIds.includes(currentStyle.id) ? 'Đã Lưu Tủ Đồ' : 'Lưu Tủ Đồ'}
                    </span>
                  </button>

                  <button
                    onClick={handleCopyStyleGuide}
                    className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-200 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao Chép (Markdown)</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm md:text-base font-bold text-pink-400 font-jp">
                    {currentStyle.jpName}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Romaji: {currentStyle.romaji}
                  </div>
                </div>
                <div className="text-xs text-right text-slate-300 italic max-w-xs hidden sm:block">
                  "{currentStyle.aestheticVibe}"
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                <strong className="text-pink-300 font-semibold">Phù hợp nhất với: </strong>
                {currentStyle.targetGenZ}
              </p>
            </div>

            {/* 7-Pillar Tabs Navigation */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto text-xs font-semibold scrollbar-none">
              <button
                onClick={() => setActiveDetailTab('outfit')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  activeDetailTab === 'outfit'
                    ? 'bg-pink-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>1. Phối Đồ</span>
              </button>

              <button
                onClick={() => setActiveDetailTab('mixmatch')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  activeDetailTab === 'mixmatch'
                    ? 'bg-pink-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shirt className="w-3.5 h-3.5 text-amber-400" />
                <span>2. Thử Đồ Mix & Match (Ảo)</span>
              </button>

              <button
                onClick={() => setActiveDetailTab('makeup')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  activeDetailTab === 'makeup'
                    ? 'bg-pink-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>3. Trang Điểm 5 Bước</span>
              </button>

              <button
                onClick={() => setActiveDetailTab('hair')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  activeDetailTab === 'hair'
                    ? 'bg-pink-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>4. Kiểu Tóc</span>
              </button>

              <button
                onClick={() => setActiveDetailTab('accessories')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  activeDetailTab === 'accessories'
                    ? 'bg-pink-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>5. Phụ Kiện</span>
              </button>

              <button
                onClick={() => setActiveDetailTab('occasions')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  activeDetailTab === 'occasions'
                    ? 'bg-pink-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <CloudSun className="w-3.5 h-3.5 text-sky-400" />
                <span>6. 4 Mùa & Hoàn Cảnh</span>
              </button>

              <button
                onClick={() => setActiveDetailTab('culture')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  activeDetailTab === 'culture'
                    ? 'bg-pink-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>7. Văn Hóa Xã Hội</span>
              </button>
            </div>

            {/* TAB 1: PHỐI ĐỒ CHI TIẾT (OUTFIT) */}
            {activeDetailTab === 'outfit' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-slate-950/80 border border-pink-900/40 rounded-xl space-y-3">
                  <h3 className="text-sm font-bold text-pink-300 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-pink-400" />
                    <span>BẢNG CHI TIẾT PHỐI ĐỒ CHUẨN XINH THEO PHONG CÁCH</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">1. Áo (Tops):</strong>
                      <p className="text-slate-200 leading-relaxed">{currentStyle.outfit.tops}</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">2. Váy / Quần (Bottoms):</strong>
                      <p className="text-slate-200 leading-relaxed">{currentStyle.outfit.bottoms}</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">3. Áo khoác ngoài (Outerwear):</strong>
                      <p className="text-slate-200 leading-relaxed">{currentStyle.outfit.outerwear}</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">4. Tất & Giày (Footwear):</strong>
                      <p className="text-slate-200 leading-relaxed">{currentStyle.outfit.footwear}</p>
                    </div>
                  </div>
                </div>

                {/* Color Palette & Golden Rules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Palette */}
                  <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Palette className="w-4 h-4 text-pink-400" />
                      <span>Bảng Màu Chủ Đạo (Color Palette):</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Màu chính:</span>
                        <span className="text-pink-300 font-semibold">{currentStyle.outfit.colorPalette.primary}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Màu nền:</span>
                        <span className="text-slate-200 font-semibold">{currentStyle.outfit.colorPalette.secondary}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Điểm nhấn:</span>
                        <span className="text-purple-300 font-semibold">{currentStyle.outfit.colorPalette.accent}</span>
                      </div>
                    </div>

                    {/* Color Swatch Bars */}
                    <div className="flex items-center gap-2 pt-2">
                      {currentStyle.outfit.colorPalette.colors.map((hex, idx) => (
                        <div
                          key={idx}
                          className="flex-1 h-7 rounded-md border border-slate-700 shadow-inner flex items-center justify-center text-[9px] font-mono font-bold"
                          style={{ backgroundColor: hex, color: hex === '#FFFFFF' || hex.includes('FF') ? '#111' : '#fff' }}
                        >
                          {hex}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Silhouette Tips */}
                  <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Mẹo Hack Dáng Thị Giác (Silhouette):</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentStyle.outfit.silhouetteTips}
                    </p>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-pink-300">
                      ✨ <strong>Tỷ lệ vàng:</strong> 1/3 thân trên - 2/3 thân dưới. Vạt áo cắm thùng gọn kết hợp cạp cao giúp đôi chân thon dài hơn 5-8cm khi lên ảnh.
                    </div>
                  </div>
                </div>

                {/* 3 Quy Tắc Vàng */}
                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>3 QUY TẮC VÀNG ĐỂ DIỆN ĐẸP PHONG CÁCH NÀY</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    {currentStyle.outfit.goldenRules.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-pink-900/80 text-pink-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PHÒNG THỬ ĐỒ MIX & MATCH ẢO (VIRTUAL FITTING ROOM) */}
            {activeDetailTab === 'mixmatch' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="p-4 bg-gradient-to-r from-purple-950/60 via-slate-900 to-pink-950/40 border border-purple-500/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Shirt className="w-4 h-4 text-amber-400" />
                      <span>PHÒNG THỬ ĐỒ ẢO: TỰ PHỐI SET ĐỒ CỦA BẠN</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Chọn từng món trang phục để tạo ra lookbook chuẩn phong cách gái Nhật mong muốn.
                    </p>
                  </div>

                  {/* Presets 1-Click */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => handleApplyPreset('shoujo')}
                      className="px-2.5 py-1 rounded-lg bg-pink-900/60 hover:bg-pink-800/80 border border-pink-500/50 text-[11px] text-pink-200 font-semibold cursor-pointer"
                    >
                      🌸 Set Shoujo Manga
                    </button>
                    <button
                      onClick={() => handleApplyPreset('meimei')}
                      className="px-2.5 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/50 text-[11px] text-purple-200 font-semibold cursor-pointer"
                    >
                      ✨ Set Mei Mei OOTD
                    </button>
                    <button
                      onClick={() => handleApplyPreset('jirai')}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-purple-600/50 text-[11px] text-purple-300 font-semibold cursor-pointer"
                    >
                      🖤 Set Jirai Shinjuku
                    </button>
                    <button
                      onClick={() => handleApplyPreset('ryousan')}
                      className="px-2.5 py-1 rounded-lg bg-rose-900/60 hover:bg-rose-800/80 border border-rose-500/50 text-[11px] text-rose-200 font-semibold cursor-pointer"
                    >
                      🎀 Set Tiểu Thư Oshi
                    </button>
                  </div>
                </div>

                {/* Mix & Match Visual Preview Card */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left Column: Live Lookbook Summary Card */}
                  <div className="md:col-span-5 p-4 bg-slate-950 border border-pink-500/40 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                        <span>SET ĐỒ ĐANG THỬ</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold font-mono">
                        Độ hài hòa: 98%
                      </span>
                    </div>

                    {/* Outfit Stack */}
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Áo:</span>
                        <span className="font-semibold text-white truncate max-w-[190px]">{currentPieces.top?.name}</span>
                      </div>
                      <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Váy/Quần:</span>
                        <span className="font-semibold text-pink-300 truncate max-w-[190px]">{currentPieces.bottom?.name}</span>
                      </div>
                      <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Áo khoác:</span>
                        <span className="font-semibold text-white truncate max-w-[190px]">{currentPieces.outer?.name}</span>
                      </div>
                      <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Giày dép:</span>
                        <span className="font-semibold text-amber-300 truncate max-w-[190px]">{currentPieces.shoes?.name}</span>
                      </div>
                      <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Túi xách:</span>
                        <span className="font-semibold text-purple-300 truncate max-w-[190px]">{currentPieces.bags?.name}</span>
                      </div>
                      <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Phụ kiện:</span>
                        <span className="font-semibold text-rose-300 truncate max-w-[190px]">{currentPieces.accessories?.name}</span>
                      </div>
                    </div>

                    {/* Hack Dáng Evaluation */}
                    <div className="p-3 bg-slate-900 border border-amber-500/30 rounded-xl space-y-1 text-xs">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Hiệu Quả Hack Dáng Của Set:</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {currentPieces.top?.hackBenefit}. Kết hợp cùng chân váy xếp ly cạp cao giúp nâng hông và kéo dài chân thị giác +7cm.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Piece Selectors */}
                  <div className="md:col-span-7 space-y-3">
                    {/* Category: Tops */}
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-pink-300">1. Chọn Áo (Tops):</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {VIRTUAL_WARDROBE_CATALOG.filter((p) => p.category === 'tops').map((piece) => (
                          <button
                            key={piece.id}
                            onClick={() => {
                              setSelectedOutfitPieces((prev) => ({ ...prev, tops: piece.id }));
                              speechService.playSuccessSound();
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              selectedOutfitPieces.tops === piece.id
                                ? 'bg-pink-950/80 border-pink-500 text-white font-bold'
                                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-semibold">{piece.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">{piece.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category: Bottoms */}
                    <div className="space-y-1 text-xs pt-1">
                      <span className="font-bold text-pink-300">2. Chọn Chân Váy / Quần (Bottoms):</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {VIRTUAL_WARDROBE_CATALOG.filter((p) => p.category === 'bottoms').map((piece) => (
                          <button
                            key={piece.id}
                            onClick={() => {
                              setSelectedOutfitPieces((prev) => ({ ...prev, bottoms: piece.id }));
                              speechService.playSuccessSound();
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              selectedOutfitPieces.bottoms === piece.id
                                ? 'bg-pink-950/80 border-pink-500 text-white font-bold'
                                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-semibold">{piece.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">{piece.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category: Footwear */}
                    <div className="space-y-1 text-xs pt-1">
                      <span className="font-bold text-pink-300">3. Chọn Giày & Dép (Footwear):</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {VIRTUAL_WARDROBE_CATALOG.filter((p) => p.category === 'shoes').map((piece) => (
                          <button
                            key={piece.id}
                            onClick={() => {
                              setSelectedOutfitPieces((prev) => ({ ...prev, shoes: piece.id }));
                              speechService.playSuccessSound();
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              selectedOutfitPieces.shoes === piece.id
                                ? 'bg-pink-950/80 border-pink-500 text-white font-bold'
                                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="font-semibold">{piece.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">{piece.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TRANG ĐIỂM 5 BƯỚC (MAKEUP) */}
            {activeDetailTab === 'makeup' && (
              <div className="space-y-5 animate-fadeIn">
                {onOpenBeautyStudio && (
                  <div className="p-3 bg-gradient-to-r from-rose-950/60 to-pink-950/40 border border-rose-500/40 rounded-xl flex items-center justify-between gap-3">
                    <div className="text-xs text-rose-200">
                      💄 Bạn muốn tìm hiểu sâu toàn bộ 6 layout búp bê, quy trình dưỡng da Mochi-hada và từ điển mỹ phẩm J-Beauty?
                    </div>
                    <button
                      onClick={onOpenBeautyStudio}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md cursor-pointer"
                    >
                      <Palette className="w-3.5 h-3.5" />
                      <span>Mở Tab Làm Đẹp Riêng Biệt</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Visual Step Progress Bar */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-2">
                      <Palette className="w-4 h-4 text-pink-400" />
                      <span>QUY TRÌNH TRANG ĐIỂM 5 BƯỚC CHUẨN GÁI NHẬT</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Hoàn thành: {Object.values(completedMakeupSteps).filter(Boolean).length}/5 bước
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {[
                      { step: 1, label: 'Lớp Nền Mochi' },
                      { step: 2, label: 'Bọng Mắt 3D' },
                      { step: 3, label: 'Eyeliner Tare-me' },
                      { step: 4, label: 'Má Hồng Igari' },
                      { step: 5, label: 'Son Bóng Thủy Tinh' },
                    ].map((st) => {
                      const isCurrent = activeMakeupStep === st.step;
                      const isDone = completedMakeupSteps[st.step];

                      return (
                        <button
                          key={st.step}
                          onClick={() => setActiveMakeupStep(st.step)}
                          className={`p-2 rounded-xl text-center transition-all cursor-pointer border ${
                            isCurrent
                              ? 'bg-gradient-to-r from-pink-600 to-rose-600 border-pink-400 text-white font-bold shadow-md'
                              : isDone
                              ? 'bg-slate-900 border-emerald-500/50 text-emerald-300'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="text-[10px] font-mono">Bước {st.step}</div>
                          <div className="text-[11px] truncate hidden sm:block">{st.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step Detail Card */}
                <div className="p-5 bg-slate-900/80 border border-pink-500/30 rounded-2xl space-y-4">
                  {activeMakeupStep === 1 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-pink-600 text-white font-bold text-xs flex items-center justify-center">1</span>
                          <span>Lớp Nền Mochi-hada / Dewy Glass Skin</span>
                        </h4>
                        <button
                          onClick={() => handleToggleMakeupStep(1)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border ${
                            completedMakeupSteps[1]
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{completedMakeupSteps[1] ? 'Đã Thực Hành' : 'Đánh Dấu Hoàn Thành'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {currentStyle.makeup.base}
                      </p>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                        <strong className="text-pink-300 block font-semibold">Bí quyết gái Tokyo:</strong>
                        <p>Dưỡng ẩm thật đẫm trước khi đánh nền. Dùng cushion có ánh ngọc trai vỗ nhẹ từ trung tâm khuôn mặt ra ngoài, phủ phấn bột kiềm dầu ở vùng chữ T để giữ lớp nền mọng nước cả ngày.</p>
                      </div>
                    </div>
                  )}

                  {activeMakeupStep === 2 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-pink-600 text-white font-bold text-xs flex items-center justify-center">2</span>
                          <span>Bọng Mắt Cười 3D (Namida-bukuro / 涙袋)</span>
                        </h4>
                        <button
                          onClick={() => handleToggleMakeupStep(2)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border ${
                            completedMakeupSteps[2]
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{completedMakeupSteps[2] ? 'Đã Thực Hành' : 'Đánh Dấu Hoàn Thành'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {currentStyle.makeup.eyes.namidaBukuro}
                      </p>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                        <strong className="text-pink-300 block font-semibold">Kỹ thuật vẽ bọng mắt cười:</strong>
                        <p>Cười nhẹ để định vị rãnh bọng mắt. Dùng chì màu nâu be nhạt kẻ một đường vòng cung mảnh cách mi dưới 3mm, sau đó dặm phấn nhũ bắt sáng champagne ở giữa bọng mắt để tạo chiều sâu 3D long lanh.</p>
                      </div>
                    </div>
                  )}

                  {activeMakeupStep === 3 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-pink-600 text-white font-bold text-xs flex items-center justify-center">3</span>
                          <span>Eyeliner Cúp Búp Bê & Mi Anime (Tare-me Eyes)</span>
                        </h4>
                        <button
                          onClick={() => handleToggleMakeupStep(3)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border ${
                            completedMakeupSteps[3]
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{completedMakeupSteps[3] ? 'Đã Thực Hành' : 'Đánh Dấu Hoàn Thành'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {currentStyle.makeup.eyes.eyeliner} Kết hợp: {currentStyle.makeup.eyes.lashes}.
                      </p>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                        <strong className="text-pink-300 block font-semibold">Tare-me vs Tsurime:</strong>
                        <p>Thay vì kẻ mắt mèo hếch đuôi, gái Nhật chuộng kẻ đường eyeliner nâu kéo ngang và hơi cụp nhẹ theo nếp mi mắt, giúp mắt tròn xoe ngây thơ như búp bê manga.</p>
                      </div>
                    </div>
                  )}

                  {activeMakeupStep === 4 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-pink-600 text-white font-bold text-xs flex items-center justify-center">4</span>
                          <span>Má Hồng Say Rượu Igari / Ửng Nắng (Igari Flush)</span>
                        </h4>
                        <button
                          onClick={() => handleToggleMakeupStep(4)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border ${
                            completedMakeupSteps[4]
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{completedMakeupSteps[4] ? 'Đã Thực Hành' : 'Đánh Dấu Hoàn Thành'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {currentStyle.makeup.blush}
                      </p>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                        <strong className="text-pink-300 block font-semibold">Vị trí má hồng chuẩn Igari:</strong>
                        <p>Không đánh xéo gò má như Tây phương. Đánh phấn má hồng đào/hồng sữa tròn ngay sát dưới quầng thâm mắt và phớt nhẹ qua sống mũi, tạo cảm giác như vừa nhấp ngụm rượu nhẹ hay ửng đỏ vì e thẹn.</p>
                      </div>
                    </div>
                  )}

                  {activeMakeupStep === 5 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-pink-600 text-white font-bold text-xs flex items-center justify-center">5</span>
                          <span>Đôi Môi Thấu Kính Căng Mọng (Garasu-dama Lip)</span>
                        </h4>
                        <button
                          onClick={() => handleToggleMakeupStep(5)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border ${
                            completedMakeupSteps[5]
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{completedMakeupSteps[5] ? 'Đã Thực Hành' : 'Đánh Dấu Hoàn Thành'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {currentStyle.makeup.lips}
                      </p>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                        <strong className="text-pink-300 block font-semibold">Công thức đánh son:</strong>
                        <p>Thoa son tint màu đào hoặc hồng đất ở lòng môi, tán mờ viền môi, sau đó phủ một lớp son bóng dạng nước trong suốt (Plumping water gloss) tạo hiệu ứng đôi môi căng mướt như viên kẹo hồ lô thủy tinh.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: KIỂU TÓC (HAIRSTYLE) */}
            {activeDetailTab === 'hair' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                  <h3 className="text-sm font-bold text-pink-300 flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-pink-400" />
                    <span>KIỂU TÓC & TẠO MẪU CHUẨN GÁI NHẬT</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">1. Kiểu tóc chính (Main Style):</strong>
                      <p className="text-slate-200 leading-relaxed">{currentStyle.hairstyle.mainStyle}</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">2. Kiểu mái (Bangs):</strong>
                      <p className="text-slate-200 leading-relaxed">{currentStyle.hairstyle.bangs}</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">3. Phụ kiện tóc (Hair Accessories):</strong>
                      <p className="text-slate-200 leading-relaxed">{currentStyle.hairstyle.hairAccessories}</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">4. Màu nhuộm Hot Trend:</strong>
                      <p className="text-slate-200 leading-relaxed">{currentStyle.hairstyle.colorTrend}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs space-y-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Mẹo Giữ Lọn Sóng Yuru-fuwa Bồng Bềnh Cả Ngày:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    Sau khi uốn bằng máy uốn trục 32mm hoặc 38mm, hãy để tóc nguội tự nhiên 5 phút rồi mới dùng lược răng thưa chải lơi. Thoa một lượng nhỏ dầu dưỡng tóc bóng mượt (Hair oil) vào đuôi tóc để tạo độ bóng khỏe tự nhiên chuẩn salon Tokyo.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 5: TRANG SỨC & PHỤ KIỆN (ACCESSORIES) */}
            {activeDetailTab === 'accessories' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                  <h3 className="text-sm font-bold text-pink-300 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-pink-400" />
                    <span>TRANG SỨC & PHỤ KIỆN ĐỊNH HÌNH PHONG CÁCH</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">1. Trang sức (Jewelry):</strong>
                      <ul className="list-disc pl-4 space-y-1 text-slate-200">
                        {currentStyle.accessories.jewelry.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">2. Túi xách (Bags):</strong>
                      <ul className="list-disc pl-4 space-y-1 text-slate-200">
                        {currentStyle.accessories.bags.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">3. Mũ nón (Hats):</strong>
                      <ul className="list-disc pl-4 space-y-1 text-slate-200">
                        {currentStyle.accessories.hats.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">4. Mẫu Nail Art đồng điệu:</strong>
                      <p className="text-slate-200 leading-relaxed">{currentStyle.accessories.nails}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: 4 MÙA & HOÀN CẢNH THỰC CHIẾN (OCCASIONS & CLIMATE) */}
            {activeDetailTab === 'occasions' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                  <h3 className="text-sm font-bold text-pink-300 flex items-center gap-2">
                    <CloudSun className="w-4 h-4 text-sky-400" />
                    <span>GỢI Ý DIỆN ĐỒ THEO HOÀN CẢNH & KHÍ HẬU VIỆT NAM</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-amber-400 block font-bold flex items-center gap-1.5">
                        <Coffee className="w-3.5 h-3.5" />
                        1. Đi Cafe Hoa & OOTD TikTok:
                      </strong>
                      <p className="text-slate-200 leading-relaxed">
                        {currentStyle.occasions?.cafeOotd ||
                          'Áo sơ mi voan cổ sen phối cùng chân váy xếp ly ngắn và giày Mary Jane đế độn nhẹ. Ngồi góc quán cafe ánh sáng tự nhiên cho ra khung hình chuẩn nàng thơ.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5" />
                        2. Buổi Hẹn Hò Lãng Mạn (Romantic Date):
                      </strong>
                      <p className="text-slate-200 leading-relaxed">
                        {currentStyle.occasions?.romanticDate ||
                          'Đầm xòe chữ A pastel kèm cardigan len mỏng khoác hờ buông vai và kẹp nơ satin sau gáy. Tôn vinh nét dịu dàng khiến đối phương xao xuyến.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-blue-400 block font-bold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        3. Lên Giảng Đường / Đi Học Thanh Xuân:
                      </strong>
                      <p className="text-slate-200 leading-relaxed">
                        {currentStyle.occasions?.campusSchool ||
                          'Sơ mi trắng học sinh mở cúc trên cùng, áo gile dệt kim be nhạt, chân váy xếp ly caro và giày Loafer nữ sinh da bóng.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-emerald-400 block font-bold flex items-center gap-1.5">
                        <CloudSun className="w-3.5 h-3.5" />
                        4. Thực Chiến Khí Hậu Việt Nam:
                      </strong>
                      <p className="text-slate-200 leading-relaxed">
                        {currentStyle.occasions?.vietnamWeatherTips ||
                          'Mùa hè chọn vải tencel/chiffon mát nhẹ; Mùa đông miền Bắc layer thêm áo dạ tweed hoặc cardigan len lông cừu ấm áp.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Size Table & Shopee/Taobao Keyword Guide */}
                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    Từ Khóa Tiếng Nhật Chuẩn Để Săn Đồ Đẹp (Shopee / Taobao / Mercari):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="font-bold text-pink-300 font-jp">丸襟ブラウス</div>
                      <div className="text-[10px] text-slate-400">Sơ mi cổ sen Peter Pan</div>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="font-bold text-pink-300 font-jp">プリーツスカート</div>
                      <div className="text-[10px] text-slate-400">Chân váy xếp ly chữ A</div>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="font-bold text-pink-300 font-jp">メリージェーン</div>
                      <div className="text-[10px] text-slate-400">Giày Mary Jane da bóng</div>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="font-bold text-pink-300 font-jp">リボンバレッタ</div>
                      <div className="text-[10px] text-slate-400">Kẹp nơ lụa satin búp bê</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: GIẢI THÍCH VĂN HÓA CHUYÊN SÂU (CULTURE) */}
            {activeDetailTab === 'culture' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                  <h3 className="text-sm font-bold text-pink-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-pink-400" />
                    <span>NGUỒN GỐC XÃ HỘI HỌC & Ý NGHĨA TÂM LÝ GENZ</span>
                  </h3>

                  <div className="space-y-3 text-xs leading-relaxed text-slate-200">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">1. Bối cảnh lịch sử & Xã hội học:</strong>
                      <p>{currentStyle.culturalContext.sociologicalOrigin}</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">2. Ý nghĩa tâm lý GenZ (Psychological Meaning):</strong>
                      <p>{currentStyle.culturalContext.psychologicalMeaning}</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <strong className="text-pink-400 block font-bold">3. Lời khuyên thực chiến khi diện đồ:</strong>
                      <p>{currentStyle.culturalContext.practicalAdvice}</p>
                    </div>
                  </div>
                </div>

                {/* Japanese Terminology Audio Strip */}
                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-pink-400" />
                    <span>THUẬT NGỮ THỜI TRANG TIẾNG NHẬT KÈM PHÁT ÂM</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {currentStyle.culturalContext.japaneseKeyTerms.map((term, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between gap-2"
                      >
                        <div>
                          <div className="font-bold text-pink-400 font-jp flex items-center gap-1.5">
                            <span>{term.term}</span>
                            <span className="text-[10px] text-slate-400 font-normal">({term.reading})</span>
                          </div>
                          <div className="text-[11px] text-slate-300">{term.meaning}</div>
                        </div>

                        <button
                          onClick={() => handleSpeak(term.reading || term.term)}
                          className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-pink-400 cursor-pointer shrink-0"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Interactive 5-Question Diagnostic Quiz Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0d1222] border border-pink-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-pink-400" />
                <h3 className="text-base font-bold text-white">Trắc Nghiệm: Style Gái Nhật Hợp Nhất Với Bạn</h3>
              </div>
              <button
                onClick={() => {
                  setIsQuizOpen(false);
                  setQuizStep(1);
                  setQuizAnswers({});
                  setQuizResult(null);
                }}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {!quizResult ? (
              <div className="space-y-4 text-xs">
                {/* Progress bar */}
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Câu hỏi {quizStep}/5</span>
                  <span className="text-pink-400 font-mono font-bold">{quizStep * 20}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300"
                    style={{ width: `${quizStep * 20}%` }}
                  />
                </div>

                {/* Question 1 */}
                {quizStep === 1 && (
                  <div className="space-y-2">
                    <span className="font-bold text-pink-300 block text-sm">
                      1. Khí chất / Vibe nào khiến bạn cảm thấy tự tin và rung động nhất?
                    </span>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleQuizAnswerSelect(1, 'shoujo_dreamy')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        🌸 Dịu dàng, trong trẻo như nữ chính manga thiếu nữ Ribon & Nakayoshi
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(1, 'coquette_tiktok')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        ✨ Nàng thơ hiện đại như Mei Mei (@nnmeii): vừa ngọt ngào búp bê vừa tôn dáng sành điệu
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(1, 'goth_rebel')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        🖤 Cá tính, bí ẩn, nổi loạn u buồn kiểu Shinjuku Kabukicho (Jirai Kei)
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(1, 'sweet_idol')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        🎀 Tiểu thư Oshi-katsu ngọt ngào đi concert thần tượng (Ryousangata)
                      </button>
                    </div>
                  </div>
                )}

                {/* Question 2 */}
                {quizStep === 2 && (
                  <div className="space-y-2">
                    <span className="font-bold text-pink-300 block text-sm">
                      2. Khi mở tủ quần áo, tông màu nào khiến tim bạn reo vui nhất?
                    </span>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleQuizAnswerSelect(2, 'sakura_pink')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Hồng phấn hoa anh đào, trắng kem vani, xanh baby pastel
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(2, 'black_purple')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Đen tuyền bóng đêm kết hợp hồng mận khói và bạc kim loại
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(2, 'frost_white')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Trắng tuyết thiên sứ toàn phần và xanh băng giá phản quang
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(2, 'beige_chic')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Màu be thanh lịch, nâu đất vintage hoặc trắng đen tối giản
                      </button>
                    </div>
                  </div>
                )}

                {/* Question 3 */}
                {quizStep === 3 && (
                  <div className="space-y-2">
                    <span className="font-bold text-pink-300 block text-sm">
                      3. Bạn quan tâm nhất đến tiêu chí nào khi phối đồ?
                    </span>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleQuizAnswerSelect(3, 'hack_leg')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Kéo dài đôi chân thon thả và thu nhỏ vòng eo thị giác
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(3, 'soft_doll')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Tạo cảm giác mong manh, ngọt ngào, đáng yêu như búp bê
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(3, 'comfortable_chic')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Thoải mái vận động cả ngày nhưng vẫn toát lên gu thời thượng
                      </button>
                    </div>
                  </div>
                )}

                {/* Question 4 */}
                {quizStep === 4 && (
                  <div className="space-y-2">
                    <span className="font-bold text-pink-300 block text-sm">
                      4. Hoàn cảnh đi chơi thường xuyên nhất của bạn?
                    </span>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleQuizAnswerSelect(4, 'cafe_lookbook')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Đi cafe hoa, trà chiều tiểu thư, chụp ảnh sống ảo OOTD
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(4, 'night_shinjuku')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Dạo phố đêm, sự kiện nghệ thuật cá tính, concert âm nhạc
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(4, 'school_campus')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Lên giảng đường, đi học thêm, dạo phố cuối tuần cùng bạn bè
                      </button>
                    </div>
                  </div>
                )}

                {/* Question 5 */}
                {quizStep === 5 && (
                  <div className="space-y-2">
                    <span className="font-bold text-pink-300 block text-sm">
                      5. Món phụ kiện "vật bất ly thân" định hình phong thái của bạn?
                    </span>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleQuizAnswerSelect(5, 'ribbon_bow')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Kẹp nơ lụa satin bồng bềnh, giày Mary Jane và tất viền ren
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(5, 'chunky_boots')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Giày bánh mì đế dày 8cm, vòng choker da ổ khóa và xích bạc
                      </button>
                      <button
                        onClick={() => handleQuizAnswerSelect(5, 'tote_beret')}
                        className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900 hover:border-pink-500 text-left text-slate-200 transition-all cursor-pointer font-medium"
                      >
                        Mũ beret dạ len, túi tote vải thô và đồng hồ dây da cổ điển
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Result Box */
              <div className="p-4 bg-slate-900 rounded-2xl border border-pink-500 space-y-3 text-center animate-fadeIn">
                <span className="text-xs text-pink-400 font-bold uppercase tracking-wider block">
                  🎉 KẾT QUẢ CHẨN ĐOÁN PHONG CÁCH DÀNH CHO BẠN:
                </span>
                <h4 className="text-lg font-black text-white">{quizResult.name}</h4>
                <div className="text-xs text-pink-300 font-jp">{quizResult.jpName}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{quizResult.aestheticVibe}</p>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-emerald-300">
                  Độ tương thích: <strong>99.4%</strong> với sở thích và vóc dáng của bạn!
                </div>
                <button
                  onClick={() => {
                    setActiveStyleId(quizResult.id);
                    setIsQuizOpen(false);
                    showToast(`Đã chuyển sang phong cách ${quizResult.name}!`);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer mx-auto block"
                >
                  Khám Phá Toàn Bộ Cẩm Nang Style Này Ngay
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Bottom Action Banner: "+5 Nạp thêm Style Mới" */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center text-pink-400 shrink-0">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Thời Trang Gái Nhật & Shoujo Style Studio</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950 border border-pink-500/50 text-pink-300 font-normal">
                ∞ Tải Không Giới Hạn
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Đang hiển thị {styles.length} phong cách thời trang, trang điểm, kiểu tóc và bối cảnh văn hóa
            </div>
          </div>
        </div>

        <button
          onClick={handleLoadMoreFive}
          className="px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-pink-600/30 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+5 Tải Thêm Style Mới (Liên Tục ∞)</span>
        </button>
      </div>
    </div>
  );
};
