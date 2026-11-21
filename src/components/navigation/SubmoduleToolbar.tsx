import React, { useState } from 'react';
import { DivisionId, JLPTLevel } from '../../types';
import {
  DIVISIONS_META,
  ALL_CURRICULUM_MODULES,
  CurriculumModule,
  getCurriculumModule,
  getAdjacentCurriculumModules,
} from '../../data/curriculumStructure';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Sparkles,
  BookOpen,
  Filter,
  LayoutDashboard,
} from 'lucide-react';

interface SubmoduleToolbarProps {
  activeDivision: DivisionId;
  activeSubModule: number;
  onSelectSubModule: (id: number) => void;
  onOpenQuickJump: () => void;
  currentLevel: JLPTLevel;
  onBackToDashboard?: () => void;
}

export const SubmoduleToolbar: React.FC<SubmoduleToolbarProps> = ({
  activeDivision,
  activeSubModule,
  onSelectSubModule,
  onOpenQuickJump,
  currentLevel,
  onBackToDashboard,
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  const currentDivMeta = DIVISIONS_META.find((d) => d.id === activeDivision);
  const currentModule = getCurriculumModule(activeSubModule);
  const { prev, next, index, total } = getAdjacentCurriculumModules(activeSubModule);

  // All modules in this division
  const divisionModules = ALL_CURRICULUM_MODULES.filter((m) => m.divisionId === activeDivision);

  // Filter by subcategory and local search
  const displayedModules = divisionModules.filter((m) => {
    if (selectedSubCategory !== 'all' && m.subCategory !== selectedSubCategory) {
      return false;
    }
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        m.desc.toLowerCase().includes(q) ||
        m.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="bg-[#090e1b]/95 border-b border-slate-800/80 sticky top-14 z-40 backdrop-blur-md gpu-accelerate">
      {/* Upper Row: Breadcrumbs, Module Title & Linear Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 border-b border-slate-800/50">
        {/* Left: Breadcrumbs & Current Submodule Title */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
              currentDivMeta?.colorScheme.badgeBg || 'bg-slate-800'
            } ${currentDivMeta?.colorScheme.badgeText || 'text-slate-300'}`}
          >
            {currentDivMeta?.code || 'PH'}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline truncate max-w-[140px]">
            {currentDivMeta?.shortName}
          </span>
          <span className="text-xs text-slate-600 hidden sm:inline">·</span>
          <h1 className="text-xs md:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {currentModule?.title || `Chuyên mục ${activeSubModule}`}
          </h1>
          <span className="text-[10px] text-amber-300/90 px-1.5 py-0.5 rounded bg-amber-950/50 border border-amber-800/40 font-mono hidden md:inline">
            JLPT {currentLevel}
          </span>
        </div>

        {/* Right: Linear Pager (Prev / Next) + Quick Jump button */}
        <div className="flex items-center gap-1.5 shrink-0 text-xs">
          {/* Previous module button */}
          <button
            onClick={() => prev && onSelectSubModule(prev.id)}
            disabled={!prev}
            className={`px-2 py-1 rounded-lg border flex items-center gap-1 transition-all cursor-pointer ${
              prev
                ? 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600'
                : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
            }`}
            title={prev ? `Bài trước: ${prev.title}` : 'Đã ở bài đầu tiên'}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs">Trước</span>
          </button>

          {/* Module Counter / Open QuickJump button */}
          <button
            onClick={onOpenQuickJump}
            className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-white hover:border-indigo-500 transition-colors font-mono cursor-pointer flex items-center gap-1 text-xs"
            title="Nhấp để tìm kiếm nhanh trong 101 chuyên mục (Ctrl+K)"
          >
            <Search className="w-3 h-3 text-indigo-400" />
            <span>
              {index}/{total}
            </span>
          </button>

          {/* Next module button */}
          <button
            onClick={() => next && onSelectSubModule(next.id)}
            disabled={!next}
            className={`px-2 py-1 rounded-lg border flex items-center gap-1 transition-all cursor-pointer ${
              next
                ? 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600'
                : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
            }`}
            title={next ? `Bài tiếp: ${next.title}` : 'Đã ở bài cuối cùng'}
          >
            <span className="hidden sm:inline text-xs">Tiếp</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="px-2 py-1 bg-slate-900/90 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:border-indigo-500 transition-colors cursor-pointer flex items-center gap-1 text-xs ml-1"
              title="Về Trang Chủ / Dashboard"
            >
              <LayoutDashboard className="w-3 h-3 text-indigo-400" />
              <span className="hidden lg:inline text-[11px]">Trang Chủ</span>
            </button>
          )}
        </div>
      </div>

      {/* Lower Row: Sub-categories + Module Strip in unified horizontal track */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
        {/* Sub-category Filter Tabs if present */}
        {currentDivMeta && currentDivMeta.subCategories.length > 1 && (
          <div className="flex items-center gap-1 shrink-0 pr-2 border-r border-slate-800">
            {currentDivMeta.subCategories.map((cat) => {
              const isSelected = selectedSubCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedSubCategory(cat.id)}
                  className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-colors cursor-pointer font-medium ${
                    isSelected
                      ? `${currentDivMeta.colorScheme.activeBg} text-white shadow-sm font-semibold`
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Submodule Items Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {displayedModules.map((mod) => {
            const isActive = mod.id === activeSubModule;
            return (
              <button
                key={mod.id}
                onClick={() => onSelectSubModule(mod.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer border flex items-center gap-1 ${
                  isActive
                    ? `${currentDivMeta?.colorScheme.activeBg || 'bg-indigo-600'} border-transparent text-white shadow-sm font-semibold`
                    : 'bg-slate-900/50 border-slate-800/70 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800/50'
                }`}
                title={mod.desc}
              >
                <span>{mod.title}</span>
              </button>
            );
          })}
          {displayedModules.length === 0 && (
            <span className="text-xs text-slate-500 py-0.5 italic">
              Không có chuyên mục nào trong nhóm này.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
