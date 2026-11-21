import React, { useState, useMemo } from 'react';
import {
  JAPANESE_MAKEUP_LAYOUTS,
  EXTRA_JAPANESE_MAKEUP_LAYOUTS,
  JBEAUTY_SKINCARE_STEPS,
  EXTRA_SKINCARE_STEPS,
  BEAUTY_DICTIONARY,
  EXTRA_BEAUTY_DICTIONARY,
  JAPANESE_NATURAL_INGREDIENTS,
  EXTRA_NATURAL_INGREDIENTS,
  NATURAL_BEAUTY_RECIPES,
  EXTRA_NATURAL_RECIPES,
  JapaneseMakeupLayout,
  JapaneseNaturalIngredient,
  NaturalBeautyRecipe,
  JBeautySkincareStep,
  BeautyVocabularyItem,
} from '../../data/japaneseBeautyDatabase';
import { speechService } from '../../services/speechService';
import {
  Sparkles,
  Palette,
  Eye,
  Heart,
  CheckCircle2,
  Volume2,
  Droplets,
  BookOpen,
  Copy,
  ChevronRight,
  ChevronLeft,
  Smile,
  ShieldCheck,
  Check,
  RotateCcw,
  Star,
  Search,
  Layers,
  ArrowRight,
  Crown,
  Leaf,
  Clock,
  AlertCircle,
  HelpCircle,
  Plus,
  BookMarked,
  Info,
  CheckSquare,
} from 'lucide-react';

interface Props {
  onOpenFashionStudio?: () => void;
  onOpenFunArcade?: () => void;
}

export const JapaneseBeautyMakeupStudio: React.FC<Props> = ({ onOpenFashionStudio, onOpenFunArcade }) => {
  // Main Navigation Sections inside Beauty Studio (5 Sections)
  const [activeMainSection, setActiveMainSection] = useState<
    'layouts' | 'anatomy' | 'skincare' | 'natural' | 'dictionary'
  >('layouts');

  // 1. LAYOUTS STATE
  const [layoutsList, setLayoutsList] = useState<JapaneseMakeupLayout[]>([...JAPANESE_MAKEUP_LAYOUTS]);
  const [activeLayoutId, setActiveLayoutId] = useState<string>(JAPANESE_MAKEUP_LAYOUTS[0].id);
  const [extraLayoutsBatch, setExtraLayoutsBatch] = useState<number>(0);

  // 2. ANATOMY 5 ZONES STATE
  const facialZonesList = useMemo(
    () => [
      { id: 'eyes' as const, label: '👁️ 1. Đôi Mắt & Bọng Mắt 3D (Namida-bukuro)' },
      { id: 'base' as const, label: '✨ 2. Lớp Nền & Che Khuyết Điểm (Mochi-hada)' },
      { id: 'cheeks' as const, label: '🌸 3. Má Hồng Igari & Búp Bê (Chiiku)' },
      { id: 'lips' as const, label: '💄 4. Đôi Môi Căng Mọng Ombre (Puru-puru)' },
      { id: 'brows' as const, label: '📐 5. Lông Mày Sương Mai (Mayu)' },
    ],
    []
  );
  const [activeFacialZone, setActiveFacialZone] = useState<'base' | 'eyes' | 'brows' | 'cheeks' | 'lips'>('eyes');
  const [extraAnatomyTipsUnlocked, setExtraAnatomyTipsUnlocked] = useState<boolean>(false);

  // 3. SKINCARE STEPS STATE
  const [skincareList, setSkincareList] = useState<JBeautySkincareStep[]>([...JBEAUTY_SKINCARE_STEPS]);
  const [activeSkincareStepNumber, setActiveSkincareStepNumber] = useState<number>(1);
  const [extraSkincareBatch, setExtraSkincareBatch] = useState<number>(0);

  // 4. NATURAL BEAUTY STATE
  const [activeNaturalSubTab, setActiveNaturalSubTab] = useState<'ingredients' | 'recipes' | 'concerns'>('ingredients');
  const [naturalIngredientsList, setNaturalIngredientsList] = useState<JapaneseNaturalIngredient[]>([...JAPANESE_NATURAL_INGREDIENTS]);
  const [selectedNaturalId, setSelectedNaturalId] = useState<string>(JAPANESE_NATURAL_INGREDIENTS[0].id);
  const [extraNaturalBatch, setExtraNaturalBatch] = useState<number>(0);

  const [naturalRecipesList, setNaturalRecipesList] = useState<NaturalBeautyRecipe[]>([...NATURAL_BEAUTY_RECIPES]);
  const [activeRecipeIndex, setActiveRecipeIndex] = useState<number>(0);
  const [extraRecipesBatch, setExtraRecipesBatch] = useState<number>(0);

  // 5. DICTIONARY STATE
  const [dictionaryList, setDictionaryList] = useState<BeautyVocabularyItem[]>([...BEAUTY_DICTIONARY]);
  const [extraDictionaryBatch, setExtraDictionaryBatch] = useState<number>(0);
  const [activeDictionaryIndex, setActiveDictionaryIndex] = useState<number>(0);

  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Daily Practice Checklist
  const [checklistCompleted, setChecklistCompleted] = useState<Record<string, boolean>>({
    base: true,
    eyes: false,
    brows: false,
    cheeks: false,
    lips: false,
  });

  // Toast feedback
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

  // -------------------------------------------------------------
  // NAVIGATION & LOAD MORE HANDLERS
  // -------------------------------------------------------------

  // Layouts
  const currentLayoutIndex = useMemo(() => {
    const idx = layoutsList.findIndex((l) => l.id === activeLayoutId);
    return idx >= 0 ? idx : 0;
  }, [layoutsList, activeLayoutId]);

  const currentLayout = layoutsList[currentLayoutIndex] || layoutsList[0];

  const handleNextLayout = () => {
    if (layoutsList.length === 0) return;
    const nextIdx = (currentLayoutIndex + 1) % layoutsList.length;
    setActiveLayoutId(layoutsList[nextIdx].id);
    speechService.playSuccessSound();
  };

  const handlePrevLayout = () => {
    if (layoutsList.length === 0) return;
    const prevIdx = (currentLayoutIndex - 1 + layoutsList.length) % layoutsList.length;
    setActiveLayoutId(layoutsList[prevIdx].id);
    speechService.playSuccessSound();
  };

  const handleLoadMoreLayouts = () => {
    const nextBatch = EXTRA_JAPANESE_MAKEUP_LAYOUTS.map((layout, i) => ({
      ...layout,
      id: `${layout.id}_b${extraLayoutsBatch + 1}_${i}`,
      name: extraLayoutsBatch === 0 ? layout.name : `${layout.name} (Tập #${extraLayoutsBatch * 5 + i + 1})`,
    }));
    setLayoutsList((prev) => [...prev, ...nextBatch]);
    setExtraLayoutsBatch((prev) => prev + 1);
    setActiveLayoutId(nextBatch[0].id);
    speechService.playSuccessSound();
    showToast(`✨ Đã nạp thêm 5 Layout Makeup mới! (Tổng cộng ${layoutsList.length + 5} layout)`);
  };

  // Anatomy Zones
  const currentZoneIndex = useMemo(() => {
    const idx = facialZonesList.findIndex((z) => z.id === activeFacialZone);
    return idx >= 0 ? idx : 0;
  }, [facialZonesList, activeFacialZone]);

  const handleNextZone = () => {
    const nextIdx = (currentZoneIndex + 1) % facialZonesList.length;
    setActiveFacialZone(facialZonesList[nextIdx].id);
    speechService.playSuccessSound();
  };

  const handlePrevZone = () => {
    const prevIdx = (currentZoneIndex - 1 + facialZonesList.length) % facialZonesList.length;
    setActiveFacialZone(facialZonesList[prevIdx].id);
    speechService.playSuccessSound();
  };

  const handleLoadMoreAnatomy = () => {
    setExtraAnatomyTipsUnlocked((prev) => !prev);
    speechService.playSuccessSound();
    showToast('✨ Đã mở khóa 5 Kỹ Thuật Độc Quyền Bóc Tách Vùng Mặt từ chuyên gia Ginza!');
  };

  // Skincare
  const currentSkincareIndex = useMemo(() => {
    const idx = skincareList.findIndex((s) => s.stepNumber === activeSkincareStepNumber);
    return idx >= 0 ? idx : 0;
  }, [skincareList, activeSkincareStepNumber]);

  const currentSkincare = skincareList[currentSkincareIndex] || skincareList[0];

  const handleNextSkincare = () => {
    if (skincareList.length === 0) return;
    const nextIdx = (currentSkincareIndex + 1) % skincareList.length;
    setActiveSkincareStepNumber(skincareList[nextIdx].stepNumber);
    speechService.playSuccessSound();
  };

  const handlePrevSkincare = () => {
    if (skincareList.length === 0) return;
    const prevIdx = (currentSkincareIndex - 1 + skincareList.length) % skincareList.length;
    setActiveSkincareStepNumber(skincareList[prevIdx].stepNumber);
    speechService.playSuccessSound();
  };

  const handleLoadMoreSkincare = () => {
    const nextBatch = EXTRA_SKINCARE_STEPS.map((step, i) => ({
      ...step,
      stepNumber: skincareList.length + i + 1,
    }));
    setSkincareList((prev) => [...prev, ...nextBatch]);
    setExtraSkincareBatch((prev) => prev + 1);
    setActiveSkincareStepNumber(nextBatch[0].stepNumber);
    speechService.playSuccessSound();
    showToast(`💧 Đã nạp thêm 5 Liệu Pháp & Bước Dưỡng Da J-Beauty mới! (Hiện có ${skincareList.length + 5} bước)`);
  };

  // Natural Ingredients
  const currentIngredientIndex = useMemo(() => {
    const idx = naturalIngredientsList.findIndex((ing) => ing.id === selectedNaturalId);
    return idx >= 0 ? idx : 0;
  }, [naturalIngredientsList, selectedNaturalId]);

  const currentNaturalIngredient = naturalIngredientsList[currentIngredientIndex] || naturalIngredientsList[0];

  const handleNextIngredient = () => {
    if (naturalIngredientsList.length === 0) return;
    const nextIdx = (currentIngredientIndex + 1) % naturalIngredientsList.length;
    setSelectedNaturalId(naturalIngredientsList[nextIdx].id);
    speechService.playSuccessSound();
  };

  const handlePrevIngredient = () => {
    if (naturalIngredientsList.length === 0) return;
    const prevIdx = (currentIngredientIndex - 1 + naturalIngredientsList.length) % naturalIngredientsList.length;
    setSelectedNaturalId(naturalIngredientsList[prevIdx].id);
    speechService.playSuccessSound();
  };

  const handleLoadMoreIngredients = () => {
    const nextBatch = EXTRA_NATURAL_INGREDIENTS.map((item, i) => ({
      ...item,
      id: `${item.id}_b${extraNaturalBatch + 1}_${i}`,
      name: extraNaturalBatch === 0 ? item.name : `${item.name} (#${extraNaturalBatch * 5 + i + 1})`,
    }));
    setNaturalIngredientsList((prev) => [...prev, ...nextBatch]);
    setExtraNaturalBatch((prev) => prev + 1);
    setSelectedNaturalId(nextBatch[0].id);
    speechService.playSuccessSound();
    showToast(`🌿 Đã nạp thêm 5 Thảo mộc tự nhiên mới! (Hiện có ${naturalIngredientsList.length + 5} thảo mộc)`);
  };

  // Natural Recipes
  const currentRecipe = naturalRecipesList[activeRecipeIndex] || naturalRecipesList[0];

  const handleNextRecipe = () => {
    if (naturalRecipesList.length === 0) return;
    const nextIdx = (activeRecipeIndex + 1) % naturalRecipesList.length;
    setActiveRecipeIndex(nextIdx);
    speechService.playSuccessSound();
  };

  const handlePrevRecipe = () => {
    if (naturalRecipesList.length === 0) return;
    const prevIdx = (activeRecipeIndex - 1 + naturalRecipesList.length) % naturalRecipesList.length;
    setActiveRecipeIndex(prevIdx);
    speechService.playSuccessSound();
  };

  const handleLoadMoreRecipes = () => {
    const nextBatch = EXTRA_NATURAL_RECIPES.map((r, i) => ({
      ...r,
      id: `${r.id}_b${extraRecipesBatch + 1}_${i}`,
      title: extraRecipesBatch === 0 ? r.title : `${r.title} (Công thức #${extraRecipesBatch * 5 + i + 1})`,
    }));
    setNaturalRecipesList((prev) => [...prev, ...nextBatch]);
    setExtraRecipesBatch((prev) => prev + 1);
    setActiveRecipeIndex(naturalRecipesList.length);
    speechService.playSuccessSound();
    showToast(`🥣 Đã nạp thêm 5 Công thức mặt nạ DIY tại nhà mới! (Hiện có ${naturalRecipesList.length + 5} công thức)`);
  };

  // Dictionary
  const filteredDictionary = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return dictionaryList;
    return dictionaryList.filter(
      (d) =>
        d.term.toLowerCase().includes(q) ||
        d.reading.toLowerCase().includes(q) ||
        d.meaning.toLowerCase().includes(q) ||
        d.contextUsage.toLowerCase().includes(q)
    );
  }, [dictionaryList, searchQuery]);

  const currentDictionaryItem = filteredDictionary[activeDictionaryIndex] || filteredDictionary[0];

  const handleNextDictionary = () => {
    if (filteredDictionary.length === 0) return;
    const nextIdx = (activeDictionaryIndex + 1) % filteredDictionary.length;
    setActiveDictionaryIndex(nextIdx);
    speechService.playSuccessSound();
  };

  const handlePrevDictionary = () => {
    if (filteredDictionary.length === 0) return;
    const prevIdx = (activeDictionaryIndex - 1 + filteredDictionary.length) % filteredDictionary.length;
    setActiveDictionaryIndex(prevIdx);
    speechService.playSuccessSound();
  };

  const handleLoadMoreDictionary = () => {
    const nextBatch = EXTRA_BEAUTY_DICTIONARY.map((item, i) => ({
      ...item,
      term: extraDictionaryBatch === 0 ? item.term : `${item.term} (#${extraDictionaryBatch * 5 + i + 1})`,
    }));
    setDictionaryList((prev) => [...prev, ...nextBatch]);
    setExtraDictionaryBatch((prev) => prev + 1);
    speechService.playSuccessSound();
    showToast(`📖 Đã nạp thêm 5 Thuật ngữ J-Beauty mới! (Hiện có ${dictionaryList.length + 5} thuật ngữ)`);
  };

  const toggleChecklist = (zoneKey: string) => {
    setChecklistCompleted((prev) => {
      const nextVal = !prev[zoneKey];
      const updated = { ...prev, [zoneKey]: nextVal };
      const doneCount = Object.values(updated).filter(Boolean).length;
      speechService.playSuccessSound();
      if (doneCount === 5 && nextVal) {
        showToast('🎉 Xuất sắc! Bạn đã hoàn thành trọn vẹn 5 bước layout hôm nay!');
      }
      return updated;
    });
  };

  // Copy full layout guide to clipboard
  const handleCopyLayout = () => {
    const text = `# [J-BEAUTY MAKEUP STUDIO] ${currentLayout.name}
- **Tên tiếng Nhật:** ${currentLayout.jpName} (${currentLayout.romaji})
- **Khí chất:** ${currentLayout.vibe}
- **Tone da phù hợp:** ${currentLayout.targetTone}

## 1. LỚP NỀN (BASE):
- **Kiểu hoàn thiện:** ${currentLayout.features.base.finish}
- **Kỹ thuật:** ${currentLayout.features.base.technique}
- **Mẹo chuyên gia:** ${currentLayout.features.base.proTip}

## 2. ĐÔI MẮT & BỌNG MẮT (EYES):
- **Phấn mắt:** ${currentLayout.features.eyes.eyeshadow}
- **Bọng mắt cười (Namida-bukuro):** ${currentLayout.features.eyes.namidaBukuro}
- **Eyeliner:** ${currentLayout.features.eyes.eyeliner}
- **Lông mi:** ${currentLayout.features.eyes.lashes}

## 3. LÔNG MÀY (BROWS):
- **Dáng mày:** ${currentLayout.features.brows.shape}
- **Màu sắc:** ${currentLayout.features.brows.color}

## 4. MÁ HỒNG (CHEEKS):
- **Vị trí tán:** ${currentLayout.features.cheeks.placement}
- **Màu sắc:** ${currentLayout.features.cheeks.colors}

## 5. ĐÔI MÔI (LIPS):
- **Màu son:** ${currentLayout.features.lips.colors}
- **Hiệu ứng:** ${currentLayout.features.lips.finish}

---
*Kotoba Infinity · Studio Làm Đẹp & Makeup Gái Nhật.*`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        speechService.playSuccessSound();
        showToast(`📋 Đã sao chép toàn bộ công thức "${currentLayout.name}" vào Clipboard!`);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-pink-500/50 text-white text-xs shadow-2xl flex items-center gap-2 backdrop-blur-md animate-bounce">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-[#13192e] to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Studio Độc Quyền · J-Beauty 100% Hoàn Hảo
              </span>
              <span className="text-xs text-slate-400 font-mono">
                5 Phân Hệ · Tải Thêm 5 Cái Mỗi Tab
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>Studio Làm Đẹp, Trang Điểm & Thảo Mộc Tự Nhiên</span>
              <Palette className="w-6 h-6 text-pink-400" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Trang điểm búp bê manga, bóc tách giải phẫu 5 vùng mặt, chu trình dưỡng da Mochi-hada và bí quyết làm đẹp từ 7+ đại thảo mộc cung đình Nhật Bản.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-center flex-wrap">
            {onOpenFunArcade && (
              <button
                onClick={onOpenFunArcade}
                className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                <span>🎮 10 Trải Nghiệm Vui</span>
              </button>
            )}
            {onOpenFashionStudio && (
              <button
                onClick={onOpenFashionStudio}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-pink-600/30 transition-all cursor-pointer"
              >
                <span>👗 Sang Lab Thời Trang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 5 Main Tabs Navigation (Gọn gàng, thoáng mắt, dễ nhìn) */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-950 border border-slate-800 rounded-2xl overflow-x-auto text-xs font-semibold scrollbar-none shadow-md">
        <button
          onClick={() => setActiveMainSection('layouts')}
          className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeMainSection === 'layouts'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold shadow-md shadow-pink-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Palette className="w-4 h-4 text-pink-300" />
          <span>1. Layouts Makeup ({layoutsList.length})</span>
        </button>

        <button
          onClick={() => setActiveMainSection('anatomy')}
          className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeMainSection === 'anatomy'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold shadow-md shadow-pink-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Eye className="w-4 h-4 text-amber-300" />
          <span>2. Bóc Tách 5 Vùng Mặt</span>
        </button>

        <button
          onClick={() => setActiveMainSection('skincare')}
          className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeMainSection === 'skincare'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold shadow-md shadow-pink-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Droplets className="w-4 h-4 text-sky-400" />
          <span>3. Dưỡng Da Mochi-hada ({skincareList.length} Bước)</span>
        </button>

        <button
          onClick={() => setActiveMainSection('natural')}
          className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeMainSection === 'natural'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-md shadow-emerald-600/30'
              : 'text-emerald-400 hover:text-white hover:bg-emerald-950/40'
          }`}
        >
          <Leaf className="w-4 h-4 text-emerald-300" />
          <span>4. Làm Đẹp Tự Nhiên ({naturalIngredientsList.length} Thảo Mộc · {naturalRecipesList.length} DIY)</span>
        </button>

        <button
          onClick={() => setActiveMainSection('dictionary')}
          className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeMainSection === 'dictionary'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>5. Từ Điển J-Beauty ({dictionaryList.length})</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SECTION 1: LAYOUTS MAKEUP (CÓ NÚT TẢI THÊM 5 & XEM TIẾP THEO) */}
      {/* ============================================================== */}
      {activeMainSection === 'layouts' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Action Toolbar: Load More 5 & Quick Stepper Bar */}
          <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
            {/* Stepper (Dễ dàng xem cái tiếp theo) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevLayout}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Layout Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-pink-300 font-mono font-bold">
                {currentLayoutIndex + 1} / {layoutsList.length}
              </div>

              <button
                onClick={handleNextLayout}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-pink-600/20 transition-all cursor-pointer"
              >
                <span>Layout Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Load +5 Button */}
            <button
              onClick={handleLoadMoreLayouts}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/25 transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Layout Mới</span>
              {extraLayoutsBatch > 0 && (
                <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
                  +{extraLayoutsBatch * 5}
                </span>
              )}
            </button>
          </div>

          {/* Horizontal Layout Selector Carousel / Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {layoutsList.map((layout, idx) => {
              const isSelected = layout.id === currentLayout.id;
              return (
                <button
                  key={layout.id}
                  onClick={() => {
                    setActiveLayoutId(layout.id);
                    speechService.playSuccessSound();
                  }}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-pink-500 shadow-md shadow-pink-500/20 ring-1 ring-pink-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                    <span>#{idx + 1}</span>
                    <span className="text-pink-400 font-jp truncate max-w-[80px]">{layout.jpName}</span>
                  </div>
                  <div className="font-bold text-xs text-white truncate">{layout.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{layout.features.base.finish}</div>
                </button>
              );
            })}
          </div>

          {/* Active Layout Master Panel */}
          <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-2xl shadow-xl space-y-5">
            {/* Layout Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-950 border border-pink-700 text-pink-300 font-semibold">
                    {currentLayout.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Tone da: {currentLayout.targetTone}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <span>{currentLayout.name}</span>
                  <button
                    onClick={() => handleSpeak(currentLayout.jpName)}
                    className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-pink-400 cursor-pointer"
                    title="Nghe phát âm tiếng Nhật"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </h2>
                <div className="text-xs text-pink-400 font-jp">{currentLayout.jpName} ({currentLayout.romaji})</div>
                <p className="text-xs text-slate-300 italic pt-0.5">"{currentLayout.vibe}"</p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={handleCopyLayout}
                  className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-pink-400" />
                  <span>Sao Chép Công Thức</span>
                </button>
              </div>
            </div>

            {/* 5 Facial Zones Sub-Selector */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {facialZonesList.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFacialZone(tab.id)}
                    className={`px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeFacialZone === tab.id
                        ? 'bg-gradient-to-r from-pink-600 to-rose-600 border-pink-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Zone Details */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3 text-xs leading-relaxed">
                {activeFacialZone === 'eyes' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-pink-300 flex items-center gap-2">
                        <span>{currentLayout.features.eyes.title}</span>
                      </h4>
                      <button
                        onClick={() => toggleChecklist('eyes')}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 cursor-pointer ${
                          checklistCompleted.eyes
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{checklistCompleted.eyes ? 'Đã Thực Hành' : 'Đánh Dấu Xong'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-amber-400 block font-bold">Bọng mắt cười (Namida-bukuro):</strong>
                        <p className="text-slate-200">{currentLayout.features.eyes.namidaBukuro}</p>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-pink-400 block font-bold">Phấn mắt (Eyeshadow):</strong>
                        <p className="text-slate-200">{currentLayout.features.eyes.eyeshadow}</p>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-sky-400 block font-bold">Eyeliner:</strong>
                        <p className="text-slate-200">{currentLayout.features.eyes.eyeliner}</p>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-purple-400 block font-bold">Lông mi (Lashes):</strong>
                        <p className="text-slate-200">{currentLayout.features.eyes.lashes}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-pink-500/30 text-slate-300 text-[11px]">
                      <strong className="text-pink-300">💡 Mẹo nhà nghề: </strong>
                      {currentLayout.features.eyes.proTip}
                    </div>
                  </div>
                )}

                {activeFacialZone === 'base' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-pink-300 flex items-center gap-2">
                        <span>{currentLayout.features.base.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                          {currentLayout.features.base.finish}
                        </span>
                      </h4>
                      <button
                        onClick={() => toggleChecklist('base')}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 cursor-pointer ${
                          checklistCompleted.base
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{checklistCompleted.base ? 'Đã Thực Hành' : 'Đánh Dấu Xong'}</span>
                      </button>
                    </div>

                    <p className="text-slate-200 leading-relaxed">{currentLayout.features.base.technique}</p>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-pink-500/30 text-slate-300 text-[11px]">
                      <strong className="text-pink-300">💡 Mẹo nhà nghề: </strong>
                      {currentLayout.features.base.proTip}
                    </div>
                  </div>
                )}

                {activeFacialZone === 'cheeks' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-pink-300 flex items-center gap-2">
                        <span>{currentLayout.features.cheeks.title}</span>
                      </h4>
                      <button
                        onClick={() => toggleChecklist('cheeks')}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 cursor-pointer ${
                          checklistCompleted.cheeks
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{checklistCompleted.cheeks ? 'Đã Thực Hành' : 'Đánh Dấu Xong'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-pink-400 block">Vị trí tán phấn má:</strong>
                        <p className="text-slate-200">{currentLayout.features.cheeks.placement}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-rose-400 block">Màu sắc ưu tiên:</strong>
                        <p className="text-slate-200">{currentLayout.features.cheeks.colors}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-[11px]"><strong>Kỹ thuật: </strong>{currentLayout.features.cheeks.technique}</p>
                  </div>
                )}

                {activeFacialZone === 'lips' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-pink-300 flex items-center gap-2">
                        <span>{currentLayout.features.lips.title}</span>
                      </h4>
                      <button
                        onClick={() => toggleChecklist('lips')}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 cursor-pointer ${
                          checklistCompleted.lips
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{checklistCompleted.lips ? 'Đã Thực Hành' : 'Đánh Dấu Xong'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-pink-400 block">Màu son gợi ý:</strong>
                        <p className="text-slate-200">{currentLayout.features.lips.colors}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-purple-400 block">Hiệu ứng bóng mọng:</strong>
                        <p className="text-slate-200">{currentLayout.features.lips.finish}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-[11px]"><strong>Cách đánh: </strong>{currentLayout.features.lips.technique}</p>
                  </div>
                )}

                {activeFacialZone === 'brows' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-pink-300 flex items-center gap-2">
                        <span>{currentLayout.features.brows.title}</span>
                      </h4>
                      <button
                        onClick={() => toggleChecklist('brows')}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 cursor-pointer ${
                          checklistCompleted.brows
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{checklistCompleted.brows ? 'Đã Thực Hành' : 'Đánh Dấu Xong'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-amber-400 block">Dáng chân mày:</strong>
                        <p className="text-slate-200">{currentLayout.features.brows.shape}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-teal-400 block">Tone màu mày:</strong>
                        <p className="text-slate-200">{currentLayout.features.brows.color}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-[11px]"><strong>Kỹ thuật phẩy sợi: </strong>{currentLayout.features.brows.technique}</p>
                  </div>
                )}
              </div>
            </div>

            {/* MỤC GIẢI THÍCH CHUYÊN SÂU (DEEP-DIVE SECTION) */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900 border border-purple-500/30 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <BookMarked className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    Mục Giải Thích Chuyên Sâu & Bí Mật Mỹ Học (Deep Dive)
                  </h3>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-mono">
                  Chuẩn J-Beauty 100%
                </span>
              </div>

              {currentLayout.deepExplanation ? (
                <div className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
                      <strong className="text-pink-300 font-bold flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-pink-400" />
                        1. Nguồn gốc lịch sử & Triết lý vẻ đẹp:
                      </strong>
                      <p className="text-slate-200 leading-relaxed">
                        {currentLayout.deepExplanation.historyAndPhilosophy}
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
                      <strong className="text-amber-300 font-bold flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        2. Phân tích nhân trắc học khuôn mặt Á Đông:
                      </strong>
                      <p className="text-slate-200 leading-relaxed">
                        {currentLayout.deepExplanation.asianFacialAnatomy}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
                    <strong className="text-purple-300 font-bold flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-purple-400" />
                      3. Lý thuyết màu sắc & Quang học (Color Theory):
                    </strong>
                    <p className="text-slate-200 leading-relaxed">
                      {currentLayout.deepExplanation.colorTheory}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-rose-500/30 space-y-1.5">
                      <strong className="text-rose-300 font-bold flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                        3 Lỗi sai kinh điển cần tránh:
                      </strong>
                      <ul className="list-disc pl-4 space-y-1 text-slate-200">
                        {currentLayout.deepExplanation.commonMistakes.map((mis, i) => (
                          <li key={i}>{mis}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-emerald-500/30 space-y-1.5">
                      <strong className="text-emerald-300 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        Bí mật độc quyền chuyên gia Ginza:
                      </strong>
                      <p className="text-slate-200 leading-relaxed">
                        {currentLayout.deepExplanation.proSecrets}
                      </p>
                      <div className="pt-2 border-t border-slate-900 text-slate-300">
                        <span className="text-teal-400 font-semibold">Gợi ý trang phục: </span>
                        {currentLayout.deepExplanation.fashionMatchAdvice}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs text-slate-200">
                  <p className="leading-relaxed">
                    Layout <strong>{currentLayout.name}</strong> tôn vinh triết lý mỹ học Nhật Bản: Lấy sự thanh khiết làm nền tảng, tạo điểm nhấn tập trung vào thần thái đôi mắt to tròn và đôi má ửng hồng e thẹn.
                  </p>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">
                    <strong className="text-pink-300">3 Quy tắc vàng: </strong>
                    {currentLayout.goldenRules.join(' · ')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 2: BÓC TÁCH 5 VÙNG MẶT (CÓ STEPPER & BÍ QUYẾT TẢI THÊM) */}
      {/* ============================================================== */}
      {activeMainSection === 'anatomy' && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-2xl shadow-xl space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevZone}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Vùng Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-mono font-bold">
                Vùng {currentZoneIndex + 1} / 5
              </div>

              <button
                onClick={handleNextZone}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Vùng Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleLoadMoreAnatomy}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/25 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{extraAnatomyTipsUnlocked ? 'Đã Mở 5 Kỹ Thuật Độc Quyền' : 'Tải Thêm +5 Bí Quyết Kỹ Thuật Bóc Tách'}</span>
            </button>
          </div>

          {/* 5 Facial Zones Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
            {/* Zone 1: Eyes */}
            <div
              onClick={() => setActiveFacialZone('eyes')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                activeFacialZone === 'eyes'
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-pink-500 shadow-md ring-1 ring-pink-500/50'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-pink-300">1. Đôi Mắt & Bọng Mắt (Namida-bukuro)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-pink-950 border border-pink-700 text-pink-300 font-mono">
                  Linh Hồn Shoujo
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Kỹ thuật vẽ rãnh bọng mắt bằng cọ vát siêu mảnh cách viền mi dưới 3mm. Dặm nhũ champagne ngọc trai ngay tâm điểm bọng mắt tạo ánh nhìn ướt át, ngây thơ long lanh.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 text-[11px]">
                <strong className="text-amber-300">Khắc phục khuyết điểm: </strong>
                Làm mắt to gấp 1.5 lần và rút ngắn khoảng cách giữa mắt với cằm.
              </div>
            </div>

            {/* Zone 2: Base */}
            <div
              onClick={() => setActiveFacialZone('base')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                activeFacialZone === 'base'
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-pink-500 shadow-md ring-1 ring-pink-500/50'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-teal-300">2. Lớp Nền Bánh Nếp (Mochi-hada)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-teal-950 border border-teal-700 text-teal-300 font-mono">
                  Suhada-kan
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Độ ẩm 80% từ dưỡng ẩm sâu trước khi trang điểm. Dặm cushion từ trung tâm mặt tản mỏng ra viền chân tóc để tránh cảm giác nặng mặt, phủ phấn bột ngọc trai kiềm dầu vùng chữ T.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 text-[11px]">
                <strong className="text-teal-300">Mẹo chuyên gia: </strong>
                Không bao giờ đánh nền dày cộp; giữ lại sắc ửng hồng tự nhiên của mạch máu dưới da.
              </div>
            </div>

            {/* Zone 3: Cheeks */}
            <div
              onClick={() => setActiveFacialZone('cheeks')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                activeFacialZone === 'cheeks'
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-pink-500 shadow-md ring-1 ring-pink-500/50'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-rose-300">3. Má Hồng Say Rượu (Igari Chiiku)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 border border-rose-700 text-rose-300 font-mono">
                  Me-no-shita
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Tán má hồng phớt ngay sát dưới bọng mắt lan ngang sống mũi thay vì gò má truyền thống. Mang lại vẻ mặt e ấp, dễ thương và gợi cảm giác muốn được chở che.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 text-[11px]">
                <strong className="text-rose-300">Kỹ thuật xếp lớp: </strong>
                Chấm má kem trước phấn phủ rồi dặm thêm lớp phấn má bột cùng tone để bền màu 12h.
              </div>
            </div>

            {/* Zone 4: Lips */}
            <div
              onClick={() => setActiveFacialZone('lips')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                activeFacialZone === 'lips'
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-pink-500 shadow-md ring-1 ring-pink-500/50'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-purple-300">4. Đôi Môi Căng Mọng (Puru-puru)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 border border-purple-700 text-purple-300 font-mono">
                  Candy Plump
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Tô son lòng môi rồi dùng tăm bông làm mờ viền môi trên hình cánh cung chữ M. Phủ lớp son bóng trong suốt không dính tạo hiệu ứng giọt sương mai đọng trên cánh hoa.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 text-[11px]">
                <strong className="text-purple-300">Tone màu hot trend: </strong>
                Hồng dâu tây sữa, cam mơ chín mọng và đỏ anh đào đất.
              </div>
            </div>

            {/* Zone 5: Brows */}
            <div
              onClick={() => setActiveFacialZone('brows')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                activeFacialZone === 'brows'
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-pink-500 shadow-md ring-1 ring-pink-500/50'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-amber-300">5. Lông Mày Sương Mai (Fuwa-mayu)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 border border-amber-700 text-amber-300 font-mono">
                  Natural Soft
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Lông mày ngang mềm mại, đầu mày tán bột nâu nhạt mờ sương và đuôi cụp nhẹ theo nếp xương hốc mắt. Chuốt mascara mày cùng màu tóc để hạ tone cho ánh mắt hiền hòa.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 text-[11px]">
                <strong className="text-amber-300">Tuyệt đối tránh: </strong>
                Kẻ lông mày sâu róm vuông vức sắc nhọn kiểu Tây làm mất đi nét ngây thơ thuần khiết.
              </div>
            </div>

            {/* Extra Pro Techniques Card */}
            {extraAnatomyTipsUnlocked && (
              <div className="p-4 rounded-2xl border border-amber-500/50 bg-gradient-to-b from-amber-950/30 to-slate-950 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-amber-400">✨ 5 Kỹ Thuật Bóc Tách Độc Quyền</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 border border-amber-600 text-amber-200 font-mono">
                    Ginza Master
                  </span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-slate-200 text-[11px]">
                  <li><strong>Kỹ thuật Taba-kan:</strong> Chụm mi thành 5 tép nhỏ bằng nhíp đầu nhọn tạo mắt anime.</li>
                  <li><strong>Kỹ thuật Fude-blur:</strong> Dùng cọ lông mềm quét tán mờ viền son môi không lộ rãnh môi.</li>
                  <li><strong>Kỹ thuật Tare-me:</strong> Chúc nhẹ đuôi mắt 15 độ tạo ánh nhìn yếu đuối muốn được bảo bọc.</li>
                  <li><strong>Khối mũi chữ V:</strong> Đánh phấn tạo khối chữ V ở đầu mũi thu nhỏ đầu mũi tròn.</li>
                  <li><strong>Mở góc mắt dưới (Hagyou):</strong> Kẻ viền mi dưới hở 1mm giúp mở rộng diện tích mắt.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Deep Explanation Section for Facial Anatomy */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-indigo-500/30 rounded-2xl space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Giải Thích Chuyên Sâu Về Nhân Trắc Học Khuôn Mặt Á Đông (Face Symmetry)</span>
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              Phụ nữ Đông Á thường có đặc điểm: nếp mí nông (hoặc mí lót), sống mũi thấp và khoảng cách giữa mắt với miệng tương đối dài. Bằng cách tập trung vào bọng mắt cười 3D (Namida-bukuro) và đặt má hồng cao sát mí dưới, thị giác của người đối diện sẽ bị hút lên phần trên khuôn mặt, tạo nên tỷ lệ vàng búp bê (Kogao) khiến gương mặt trở nên nhỏ nhắn, thanh tú và trẻ trung vượt trội.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 3: DƯỠNG DA MOCHI-HADA (CÓ TẢI THÊM 5 & XEM TIẾP THEO) */}
      {/* ============================================================== */}
      {activeMainSection === 'skincare' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Stepper Toolbar */}
          <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevSkincare}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Bước Trước</span>
              </button>

              <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-sky-300 font-mono font-bold">
                Bước {currentSkincare.stepNumber} / {skincareList.length}
              </div>

              <button
                onClick={handleNextSkincare}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-sky-600/20 cursor-pointer"
              >
                <span>Bước Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleLoadMoreSkincare}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-teal-600/25 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tải Thêm +5 Bước Dưỡng & Liệu Pháp Chuyên Sâu</span>
              {extraSkincareBatch > 0 && (
                <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
                  +{extraSkincareBatch * 5}
                </span>
              )}
            </button>
          </div>

          {/* Active Step Hero Card */}
          <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-2xl shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-sky-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-sky-600/30">
                    {currentSkincare.stepNumber}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-950 border border-sky-700 text-sky-300 font-semibold font-jp">
                    {currentSkincare.jpName}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <span>{currentSkincare.stepName}</span>
                  <button
                    onClick={() => handleSpeak(currentSkincare.jpName)}
                    className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-sky-400 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </h3>
                <div className="text-xs text-slate-400 font-mono">{currentSkincare.romaji}</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1 self-start sm:self-auto max-w-xs">
                <strong className="text-amber-400 block font-bold">Mỹ phẩm Holy Grail số 1 Cosme:</strong>
                <span className="text-slate-200">{currentSkincare.holyGrailProduct}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-sky-300 block font-bold text-sm">🎯 Mục tiêu & Công dụng:</strong>
                <p className="text-slate-200 leading-relaxed">{currentSkincare.purpose}</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-emerald-300 block font-bold text-sm">👐 Kỹ thuật thực hành chuẩn J-Beauty:</strong>
                <p className="text-slate-200 leading-relaxed">{currentSkincare.technique}</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-sky-500/30 text-xs space-y-1 text-slate-200">
              <strong className="text-sky-400 font-bold">💡 Bí quyết chuyên gia: </strong>
              <span>{currentSkincare.proTip}</span>
            </div>

            {/* Skincare Deep Explanation */}
            {currentSkincare.deepExplanation && (
              <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-950 via-sky-950/20 to-slate-950 border border-sky-500/30 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center gap-2 pb-1 border-b border-sky-500/20">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <h4 className="font-bold text-sm text-white">
                    Giải Thích Chuyên Sâu: Cơ Chế Sinh Học & Khoa Học Màng Ẩm
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-teal-300 block">🔬 Cơ chế sinh học tế bào biểu bì:</strong>
                    <p className="text-slate-200 leading-relaxed">
                      {currentSkincare.deepExplanation.biologicalMechanism}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-sky-300 block">🛡️ Khoa học hàng rào bảo vệ (Skin Barrier):</strong>
                    <p className="text-slate-200 leading-relaxed">
                      {currentSkincare.deepExplanation.skinBarrierScience}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-teal-500/30 text-teal-200">
                  <strong className="text-teal-300">👨‍⚕️ Lời khuyên vàng từ bác sĩ da liễu Nhật Bản: </strong>
                  {currentSkincare.deepExplanation.proAdvice}
                </div>
              </div>
            )}
          </div>

          {/* Quick Step Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {skincareList.map((step) => {
              const isSelected = step.stepNumber === currentSkincare.stepNumber;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => {
                    setActiveSkincareStepNumber(step.stepNumber);
                    speechService.playSuccessSound();
                  }}
                  className={`px-3 py-2 rounded-xl border font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-sky-600 border-sky-500 text-white shadow-md shadow-sky-600/30'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Bước {step.stepNumber}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 4: LÀM ĐẸP TỪ THIÊN NHIÊN (CÓ TẢI THÊM 5 & XEM TIẾP THEO) */}
      {/* ============================================================== */}
      {activeMainSection === 'natural' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Sub-Tab Selector inside Natural Beauty */}
          <div className="flex items-center gap-2 p-1 bg-slate-950 border border-slate-800 rounded-2xl overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveNaturalSubTab('ingredients')}
              className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeNaturalSubTab === 'ingredients'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-300" />
              <span>7+ Thảo Mộc & Tinh Hoa Tự Nhiên ({naturalIngredientsList.length})</span>
            </button>

            <button
              onClick={() => setActiveNaturalSubTab('recipes')}
              className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeNaturalSubTab === 'recipes'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-300" />
              <span>4+ Công Thức Mặt Nạ DIY Tại Nhà ({naturalRecipesList.length})</span>
            </button>

            <button
              onClick={() => setActiveNaturalSubTab('concerns')}
              className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeNaturalSubTab === 'concerns'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Tra Cứu Theo Tình Trạng Da</span>
            </button>
          </div>

          {/* SUB-TAB 1: THẢO MỘC */}
          {activeNaturalSubTab === 'ingredients' && (
            <div className="space-y-4">
              {/* Stepper Toolbar */}
              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevIngredient}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Thảo Mộc Trước</span>
                  </button>

                  <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-mono font-bold">
                    {currentIngredientIndex + 1} / {naturalIngredientsList.length}
                  </div>

                  <button
                    onClick={handleNextIngredient}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Thảo Mộc Tiếp Theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleLoadMoreIngredients}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/25 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tải Thêm +5 Thảo Mộc Tự Nhiên Mới</span>
                  {extraNaturalBatch > 0 && (
                    <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
                      +{extraNaturalBatch * 5}
                    </span>
                  )}
                </button>
              </div>

              {/* Active Ingredient Hero Card */}
              <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-2xl shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 shadow-md">
                      {currentNaturalIngredient.icon}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>{currentNaturalIngredient.name}</span>
                        <button
                          onClick={() => handleSpeak(currentNaturalIngredient.jpName)}
                          className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-emerald-400 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </h3>
                      <div className="text-xs text-emerald-400 font-jp font-semibold">
                        {currentNaturalIngredient.jpName} ({currentNaturalIngredient.romaji})
                      </div>
                    </div>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-300 font-mono self-start sm:self-auto">
                    {currentNaturalIngredient.historicalEra}
                  </span>
                </div>

                {/* Nutrients Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 block">
                    Thành phần hoạt chất sinh học tự nhiên:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentNaturalIngredient.keyNutrients.map((nut, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-emerald-950/70 border border-emerald-700/50 text-emerald-300 rounded-md text-[11px] font-medium"
                      >
                        ✓ {nut}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-300 block font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Lợi ích đối với làn da:
                    </strong>
                    <p className="text-slate-200 leading-relaxed">{currentNaturalIngredient.skinBenefits}</p>
                  </div>

                  <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-amber-300 block font-bold flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5" />
                      Bí quyết cung nữ & Geisha xưa:
                    </strong>
                    <p className="text-slate-200 leading-relaxed">{currentNaturalIngredient.traditionalUsage}</p>
                  </div>
                </div>

                {currentNaturalIngredient.hairBenefits && (
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <strong className="text-purple-300 block font-bold">Lợi ích cho mái tóc:</strong>
                    <p className="text-slate-200">{currentNaturalIngredient.hairBenefits}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-slate-400 block text-[11px]">Ứng dụng trong mỹ phẩm hiện đại:</strong>
                    <p className="text-slate-200">{currentNaturalIngredient.modernApplication}</p>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-500/30 space-y-1 text-emerald-200">
                    <strong className="text-emerald-400 block font-bold text-[11px]">💡 Mẹo thực hành tại nhà:</strong>
                    <p>{currentNaturalIngredient.proTip}</p>
                  </div>
                </div>

                {/* Natural In-depth Explanation */}
                {currentNaturalIngredient.deepExplanation && (
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 border border-emerald-500/30 rounded-2xl space-y-3 text-xs">
                    <div className="flex items-center gap-2 pb-1 border-b border-emerald-500/20">
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-bold text-sm text-white">
                        Giải Thích Chuyên Sâu: Nghiên Cứu Khoa Học & Di Sản Bí Truyền
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-emerald-300 block">🔬 Nghiên cứu y khoa & Thực nghiệm lâm sàng:</strong>
                        <p className="text-slate-200 leading-relaxed">
                          {currentNaturalIngredient.deepExplanation.scientificResearch}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <strong className="text-teal-300 block">🧬 Cơ chế phân tử sinh học (Molecular Bio):</strong>
                        <p className="text-slate-200 leading-relaxed">
                          {currentNaturalIngredient.deepExplanation.molecularBio}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-xl border border-amber-500/30 text-amber-200">
                      <strong className="text-amber-300">🎎 Di sản bí truyền của Geisha & Cung đình xưa: </strong>
                      {currentNaturalIngredient.deepExplanation.geishaSecretHeritage}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Ingredient Carousel */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {naturalIngredientsList.map((ing) => {
                  const isSelected = ing.id === currentNaturalIngredient.id;
                  return (
                    <button
                      key={ing.id}
                      onClick={() => {
                        setSelectedNaturalId(ing.id);
                        speechService.playSuccessSound();
                      }}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950 border-emerald-500 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <div className="text-lg">{ing.icon}</div>
                      <div className="font-bold text-xs truncate mt-0.5">{ing.name.split('(')[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-TAB 2: CÔNG THỨC MẶT NẠ DIY TẠI NHÀ */}
          {activeNaturalSubTab === 'recipes' && (
            <div className="space-y-4">
              {/* Stepper Toolbar */}
              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevRecipe}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Công Thức Trước</span>
                  </button>

                  <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-mono font-bold">
                    {activeRecipeIndex + 1} / {naturalRecipesList.length}
                  </div>

                  <button
                    onClick={handleNextRecipe}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Công Thức Tiếp Theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleLoadMoreRecipes}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/25 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tải Thêm +5 Công Thức DIY Mới</span>
                  {extraRecipesBatch > 0 && (
                    <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
                      +{extraRecipesBatch * 5}
                    </span>
                  )}
                </button>
              </div>

              {/* Active Recipe Master Card */}
              <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-2xl shadow-xl space-y-4">
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="space-y-0.5">
                    <span className="text-xs text-emerald-400 font-semibold block">
                      {currentRecipe.ingredientHighlight}
                    </span>
                    <h4 className="font-black text-base sm:text-lg text-white">{currentRecipe.title}</h4>
                    <div className="text-xs text-pink-300">Phù hợp: {currentRecipe.targetSkinType}</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 font-mono shrink-0">
                    ⏱️ {currentRecipe.prepTime}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <strong className="text-amber-300 block font-bold text-sm">🥣 Nguyên liệu cần chuẩn bị:</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-200">
                      {currentRecipe.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <strong className="text-emerald-400 block font-bold text-sm">📋 Các bước thực hiện:</strong>
                    <ol className="list-decimal pl-4 space-y-1.5 text-slate-200">
                      {currentRecipe.steps.map((st, i) => (
                        <li key={i} className="leading-relaxed">{st}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 gap-2">
                  <span>📅 Tần suất: <strong className="text-emerald-300">{currentRecipe.frequency}</strong></span>
                  <span className="text-amber-400">⚠️ Lưu ý an toàn: {currentRecipe.caution}</span>
                </div>

                {/* Recipe Deep Explanation */}
                {currentRecipe.deepExplanation && (
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-amber-500/30 text-xs space-y-2 text-slate-200">
                    <strong className="text-amber-300 block font-bold">🔍 Cơ chế hiệp đồng phân tử & Lời khuyên da liễu:</strong>
                    <p className="leading-relaxed">{currentRecipe.deepExplanation.synergyMechanism}</p>
                    <p className="text-teal-300 font-medium">{currentRecipe.deepExplanation.dermatologistNote}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: TRA CỨU THEO TÌNH TRẠNG DA */}
          {activeNaturalSubTab === 'concerns' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-xs flex items-center justify-center">1</span>
                  <h4 className="font-bold text-sm text-white">Da Dầu Nhờn & Dễ Nổi Mụn</h4>
                </div>
                <div className="text-emerald-400 font-semibold text-[11px]">
                  🌿 Thảo mộc khuyên dùng: Trà Xanh Matcha Uji, Ngải Cứu Yomogi & Lá Tía Tô Shiso
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Matcha chứa hàm lượng EGCG cao giúp ức chế vi khuẩn mụn và kiềm dầu tự nhiên. Ngải cứu Yomogi kháng viêm giúp làm dịu vết sưng mụn mẩn đỏ chỉ sau 1 đêm.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-xs flex items-center justify-center">2</span>
                  <h4 className="font-bold text-sm text-white">Da Xỉn Màu, Thâm Nám & Tàn Nhang</h4>
                </div>
                <div className="text-emerald-400 font-semibold text-[11px]">
                  🌾 Thảo mộc khuyên dùng: Cám Gạo Komenuka & Bã Rượu Sake-kasu
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Axit Kojic trong men rượu Sake và Axit Ferulic trong cám gạo là bộ đôi vàng ức chế hắc sắc tố melanin, trả lại làn da trắng hồng trong suốt tự nhiên.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-xs flex items-center justify-center">3</span>
                  <h4 className="font-bold text-sm text-white">Da Khô Ráp, Bong Tróc & Nứt Nẻ</h4>
                </div>
                <div className="text-emerald-400 font-semibold text-[11px]">
                  🌺 Thảo mộc khuyên dùng: Dầu Hoa Trà Tsubaki, Dầu Mầm Gạo & Quả Yuzu
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Dầu Tsubaki chứa hơn 85% Axit Oleic tương đồng với màng bã nhờn da người, thẩm thấu ngay lập tức khóa ẩm. Yuzu Ceramide củng cố hàng rào bảo vệ da bền vững.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-xs flex items-center justify-center">4</span>
                  <h4 className="font-bold text-sm text-white">Da Nhạy Cảm & Dễ Bị Kích Ứng Thời Tiết</h4>
                </div>
                <div className="text-emerald-400 font-semibold text-[11px]">
                  🌾 Thảo mộc khuyên dùng: Bông Mút Củ Nưa Konjac & Tía Tô Đỏ Akajiso
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Chất xơ Glucomannan từ củ nưa Konjac làm sạch siêu êm dịu, trong khi axit rosmarinic từ tía tô dập tắt phản ứng viêm dị ứng tức thì.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 5: TỪ ĐIỂN J-BEAUTY (CÓ TẢI THÊM 5 & XEM TIẾP THEO) */}
      {/* ============================================================== */}
      {activeMainSection === 'dictionary' && (
        <div className="p-5 sm:p-6 bg-[#0f1424] border border-slate-800 rounded-2xl shadow-xl space-y-4 animate-fadeIn">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <span>Từ Điển Thuật Ngữ Làm Đẹp & Mỹ Phẩm Bản Xứ</span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Các thuật ngữ chuẩn J-Beauty xuất hiện trên tạp chí thời trang và bảng thành phần mỹ phẩm Cosme.
              </p>
            </div>

            <div className="flex items-center gap-2 max-w-sm w-full">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm thuật ngữ (涙袋, すっぴん...)"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                onClick={handleLoadMoreDictionary}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+5 Từ Mới</span>
              </button>
            </div>
          </div>

          {/* Stepper for single item preview */}
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={handlePrevDictionary}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Thuật Ngữ Trước</span>
            </button>

            <span className="text-purple-300 font-mono font-bold">
              {activeDictionaryIndex + 1} / {filteredDictionary.length} thuật ngữ
            </span>

            <button
              onClick={handleNextDictionary}
              className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Thuật Ngữ Tiếp Theo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Current Active Deep Dive Card */}
          {currentDictionaryItem && (
            <div className="p-4 bg-gradient-to-r from-slate-950 via-purple-950/30 to-slate-950 border border-purple-500/40 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-black text-base text-pink-300 font-jp">{currentDictionaryItem.term}</span>
                  <span className="text-xs text-slate-400 font-mono">({currentDictionaryItem.reading})</span>
                </div>
                <button
                  onClick={() => handleSpeak(currentDictionaryItem.reading || currentDictionaryItem.term)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-400 border border-slate-800 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-white font-semibold text-sm">{currentDictionaryItem.meaning}</div>
              <p className="text-slate-300 italic font-jp pt-0.5">
                💬 Ví dụ: {currentDictionaryItem.contextUsage}
              </p>

              {currentDictionaryItem.deepExplanation && (
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 pt-2 text-[11px] text-slate-200">
                  <strong className="text-purple-300 block">🔍 Sắc thái văn hóa & Ngữ cảnh xã hội:</strong>
                  <p>{currentDictionaryItem.deepExplanation.culturalNuance}</p>
                </div>
              )}
            </div>
          )}

          {/* Grid of all vocabulary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs max-h-96 overflow-y-auto pr-1">
            {filteredDictionary.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveDictionaryIndex(idx)}
                className={`p-3 bg-slate-950 rounded-xl border flex items-start justify-between gap-3 transition-colors cursor-pointer ${
                  idx === activeDictionaryIndex ? 'border-purple-500 bg-purple-950/20' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-pink-300 font-jp">{item.term}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({item.reading})</span>
                  </div>
                  <div className="text-slate-200 font-medium">{item.meaning}</div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(item.reading || item.term);
                  }}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-400 border border-slate-800 cursor-pointer shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
