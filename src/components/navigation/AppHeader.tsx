import React, { useEffect, useRef, useState } from 'react';
import { DivisionId, JLPTLevel } from '../../types';
import { DIVISIONS_META } from '../../data/curriculumStructure';
import {
  BookOpen,
  GraduationCap,
  Headphones,
  Briefcase,
  Sparkles,
  Layers,
  Gamepad2,
  Landmark,
  Search,
  HelpCircle,
  Zap,
  ShieldAlert,
  MoreVertical,
  ChevronDown,
  Feather,
  BookMarked,
  Compass,
  LayoutDashboard,
} from 'lucide-react';

export interface AppHeaderProps {
  activeDivision: DivisionId;
  onSwitchDivision: (divisionId: DivisionId) => void;
  currentLevel?: JLPTLevel;
  onSetLevel?: (level: JLPTLevel) => void;
  onOpenQuickJump: () => void;
  onOpenGuide: () => void;
  onOpenAiSensei: () => void;
  onOpenSrsVault?: () => void;
  onOpenJlptSimulator?: () => void;
  onOpenWowHub?: () => void;
  onOpenKanjiUniverse?: () => void;
  onOpenDailyNikki?: () => void;
  onOpenOmniverse?: () => void;
  isDashboard: boolean;
  isKanjiUniverseActive?: boolean;
  isDailyNikkiActive?: boolean;
  isOmniverseActive?: boolean;
  onToggleDashboard: () => void;
  isFastMode?: boolean;
  onToggleFastMode?: () => void;
}

type CoreNavId = 'home' | 'kanji' | 'nikki' | 'omniverse' | 'srs';

const DIVISION_ICONS: Record<string, React.ElementType> = {
  vocab_kanji: BookOpen,
  jlpt_reading: GraduationCap,
  listening_speaking: Headphones,
  biz_culture: Briefcase,
  learner_boost: Sparkles,
  cultural_learning: Layers,
  edutainment_fun: Gamepad2,
  japan_encyclopedia: Landmark,
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeDivision,
  onSwitchDivision,
  onOpenQuickJump,
  onOpenGuide,
  onOpenAiSensei,
  onOpenSrsVault,
  onOpenJlptSimulator,
  onOpenWowHub,
  onOpenKanjiUniverse,
  onOpenDailyNikki,
  onOpenOmniverse,
  isDashboard,
  isKanjiUniverseActive = false,
  isDailyNikkiActive = false,
  isOmniverseActive = false,
  onToggleDashboard,
  isFastMode = false,
  onToggleFastMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (!isMoreOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMoreOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isMoreOpen]);

  const handleBrandHome = () => {
    setIsMoreOpen(false);
    if (!isDashboard || isKanjiUniverseActive || isDailyNikkiActive) {
      onToggleDashboard();
    }
  };

  // Core 5 items max — prioritized so narrow viewports collapse excess items into [Xem Thêm]
  const coreItems: {
    id: CoreNavId;
    label: string;
    shortLabel: string;
    isActive: boolean;
    minWidthToShowInline: number;
    onClick: () => void;
    icon: React.ElementType;
  }[] = [
    {
      id: 'home',
      label: 'Trang Chủ',
      shortLabel: 'Trang Chủ',
      isActive: isDashboard && !isKanjiUniverseActive && !isDailyNikkiActive && !isOmniverseActive,
      minWidthToShowInline: 0,
      onClick: handleBrandHome,
      icon: LayoutDashboard,
    },
    {
      id: 'kanji',
      label: 'Vũ Trụ Kanji',
      shortLabel: 'Kanji',
      isActive: isKanjiUniverseActive,
      minWidthToShowInline: 460,
      onClick: () => onOpenKanjiUniverse?.(),
      icon: Compass,
    },
    {
      id: 'nikki',
      label: 'Nhật Ký',
      shortLabel: 'Nhật Ký',
      isActive: isDailyNikkiActive,
      minWidthToShowInline: 0,
      onClick: () => onOpenDailyNikki?.(),
      icon: Feather,
    },
    {
      id: 'omniverse',
      label: 'Ngũ Thánh Địa',
      shortLabel: 'Thánh Địa',
      isActive: isOmniverseActive,
      minWidthToShowInline: 680,
      onClick: () => onOpenOmniverse?.(),
      icon: Sparkles,
    },
    {
      id: 'srs',
      label: 'Sổ Tay SRS',
      shortLabel: 'SRS',
      isActive: false,
      minWidthToShowInline: 960,
      onClick: () => onOpenSrsVault?.(),
      icon: BookMarked,
    },
  ];

  const inlineItems = coreItems.filter((item) => viewportWidth >= item.minWidthToShowInline);
  const collapsedCoreItems = coreItems.filter((item) => viewportWidth < item.minWidthToShowInline);

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-150 gpu-accelerate ${
        isScrolled
          ? 'bg-[#070b14]/82 border-b border-slate-800/90 shadow-lg shadow-black/30'
          : 'bg-[#070b14]/70 border-b border-slate-800/60'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-8 transition-[height] duration-150 ${
          isScrolled ? 'h-12' : 'h-14'
        }`}
      >
        {/* ZONE 1: Minimal Brand Wordmark (Single clean element, no pill tags) */}
        <button
          type="button"
          onClick={handleBrandHome}
          className="flex items-center gap-2.5 text-left cursor-pointer whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg py-1"
          title="Về Trang Chủ Kotoba Infinity"
        >
          <span className="w-7 h-7 rounded-lg bg-indigo-600/90 flex items-center justify-center text-white font-jp font-bold text-sm shrink-0">
            言
          </span>
          <span className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-indigo-300 transition-colors">
            <span className="hidden sm:inline">Kotoba Infinity</span>
            <span className="sm:hidden">Kotoba</span>
          </span>
        </button>

        {/* ZONE 2: Liquid Primary Navigation (Max 4-5 core tabs, Neon bottom underline) */}
        <nav
          aria-label="Điều hướng chính"
          className="flex-1 min-w-0 flex items-center justify-center gap-3 sm:gap-6"
        >
          {inlineItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`relative py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-md ${
                item.isActive
                  ? 'text-white font-semibold after:content-[""] after:absolute after:bottom-0 after:inset-x-0 after:h-[2px] after:rounded-full after:bg-indigo-400 after:shadow-[0_0_10px_rgba(129,140,248,0.9)]'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">{item.shortLabel}</span>
            </button>
          ))}
        </nav>

        {/* ZONE 3: Quick Search Icon + Dynamic Satellite [Xem Thêm] Dropdown */}
        <div className="flex items-center gap-2 shrink-0 relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={onOpenQuickJump}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title="Tìm nhanh 102 chuyên mục (Ctrl+K)"
            aria-label="Tìm kiếm 102 chuyên mục"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="hidden lg:inline">Tìm nhanh</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMoreOpen((v) => !v)}
            aria-expanded={isMoreOpen}
            aria-haspopup="menu"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              isMoreOpen
                ? 'bg-indigo-600/20 border-indigo-400 text-white'
                : 'bg-slate-900/75 border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white'
            }`}
          >
            <MoreVertical className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
            <span>Xem Thêm</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
                isMoreOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Satellite Dropdown Panel */}
          {isMoreOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-slate-800 bg-[#0b1120]/95 backdrop-blur-xl shadow-2xl p-3 space-y-3 animate-fadeIn z-50"
            >
              {/* Collapsed Core Links (shown automatically when screen narrows) */}
              {collapsedCoreItems.length > 0 && (
                <div className="space-y-1 border-b border-slate-800 pb-2.5">
                  <div className="px-2 text-[11px] font-medium text-slate-400">
                    Phân hệ chính
                  </div>
                  {collapsedCoreItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        role="menuitem"
                        type="button"
                        onClick={() => {
                          item.onClick();
                          setIsMoreOpen(false);
                        }}
                        className={`w-full px-2.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 cursor-pointer transition-colors ${
                          item.isActive
                            ? 'bg-indigo-600/25 text-white'
                            : 'text-slate-200 hover:bg-slate-800/70'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Satellite Features & Tools */}
              <div className="space-y-1">
                <div className="px-2 text-[11px] font-medium text-slate-400">
                  Công cụ & Luyện thi
                </div>

                <button
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    onOpenAiSensei();
                    setIsMoreOpen(false);
                  }}
                  className="w-full px-2.5 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/70 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    <span>Giáo sư AI Sensei 24/7</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Ctrl+J</span>
                </button>

                <button
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    onOpenQuickJump();
                    setIsMoreOpen(false);
                  }}
                  className="sm:hidden w-full px-2.5 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/70 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-indigo-400" />
                    <span>Tìm 102 chuyên mục</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Ctrl+K</span>
                </button>

                {onOpenJlptSimulator && (
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      onOpenJlptSimulator();
                      setIsMoreOpen(false);
                    }}
                    className="w-full px-2.5 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/70 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <span>Thi Thật JLPT (180đ)</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Alt+T</span>
                  </button>
                )}

                {onOpenWowHub && (
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      onOpenWowHub();
                      setIsMoreOpen(false);
                    }}
                    className="w-full px-2.5 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/70 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>5 Vũ Khí Tương Lai WOW</span>
                    </span>
                  </button>
                )}

                {onToggleFastMode && (
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      onToggleFastMode();
                    }}
                    className="w-full px-2.5 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/70 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Zap
                        className={`w-4 h-4 ${
                          isFastMode ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      />
                      <span>Mode Nhanh Siêu Tốc</span>
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        isFastMode ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                    >
                      {isFastMode ? 'Đang bật' : 'Tắt'}
                    </span>
                  </button>
                )}

                <button
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    onOpenGuide();
                    setIsMoreOpen(false);
                  }}
                  className="w-full px-2.5 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/70 flex items-center gap-2.5 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>Hướng dẫn sử dụng</span>
                </button>
              </div>

              {/* 8 Curriculum Divisions (Cleanly Grouped Inside Dropdown) */}
              <div className="border-t border-slate-800 pt-2.5 space-y-1.5">
                <div className="px-2 text-[11px] font-medium text-slate-400">
                  8 Trụ Cột Chương Trình (PH1 – PH8)
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {DIVISIONS_META.map((div) => {
                    const Icon = DIVISION_ICONS[div.id] || BookOpen;
                    const isDivActive =
                      !isDashboard &&
                      !isKanjiUniverseActive &&
                      !isDailyNikkiActive &&
                      activeDivision === div.id;
                    return (
                      <button
                        key={div.id}
                        role="menuitem"
                        type="button"
                        onClick={() => {
                          onSwitchDivision(div.id);
                          setIsMoreOpen(false);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors truncate ${
                          isDivActive
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                        }`}
                        title={div.description}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0 opacity-85" />
                        <span className="truncate">
                          {div.code}: {div.shortName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
