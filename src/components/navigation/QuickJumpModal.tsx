import React, { useState, useEffect, useRef } from 'react';
import { DivisionId } from '../../types';
import {
  ALL_CURRICULUM_MODULES,
  DIVISIONS_META,
  CurriculumModule,
  searchCurriculumModules,
} from '../../data/curriculumStructure';
import { Search, X, ChevronRight, Sparkles, BookOpen, GraduationCap, Headphones, Briefcase, Layers, Gamepad2, Compass, Landmark } from 'lucide-react';

interface QuickJumpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (divisionId: DivisionId, moduleId: number) => void;
  activeModuleId: number;
}

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

export const QuickJumpModal: React.FC<QuickJumpModalProps> = ({
  isOpen,
  onClose,
  onSelectModule,
  activeModuleId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDivisionFilter, setSelectedDivisionFilter] = useState<DivisionId | 'all'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setSearchTerm('');
      setSelectedDivisionFilter('all');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = searchCurriculumModules(searchTerm, selectedDivisionFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="bg-[#0d1424] border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[82vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Search Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-[#0a0f1d]">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Tìm nhanh trong ${ALL_CURRICULUM_MODULES.length} chuyên mục (VD: danh thiếp, bẫy nghe, tatemae, trà đạo, kanji...)`}
            className="w-full bg-transparent text-sm md:text-base text-white placeholder-slate-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2 py-1 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-xs font-mono shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Division Quick Filter Pills */}
        <div className="px-4 py-2.5 bg-[#0a0f1d]/90 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
          <button
            onClick={() => setSelectedDivisionFilter('all')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
              selectedDivisionFilter === 'all'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
            }`}
          >
            Tất cả ({ALL_CURRICULUM_MODULES.length})
          </button>
          {DIVISIONS_META.map((div) => {
            const count = ALL_CURRICULUM_MODULES.filter((m) => m.divisionId === div.id).length;
            const isSelected = selectedDivisionFilter === div.id;
            return (
              <button
                key={div.id}
                onClick={() => setSelectedDivisionFilter(div.id)}
                className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors flex items-center gap-1 ${
                  isSelected
                    ? `${div.colorScheme.activeBg} text-white font-semibold`
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                }`}
              >
                <span>{div.code}</span>
                <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-800/50">
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Compass className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm">Không tìm thấy chuyên mục nào phù hợp với từ khóa.</p>
              <p className="text-xs text-slate-500 mt-1">Thử tìm theo: "danh thiếp", "trà đạo", "nghe", "đề thi", "bộ thủ"...</p>
            </div>
          ) : (
            results.map((item) => {
              const IconComp = DIVISION_ICONS[item.divisionId] || BookOpen;
              const isCurrentActive = item.id === activeModuleId;
              const divMeta = DIVISIONS_META.find((d) => d.id === item.divisionId);

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectModule(item.divisionId, item.id);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                    isCurrentActive
                      ? 'bg-indigo-950/60 border border-indigo-700/60 text-white'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isCurrentActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            divMeta?.colorScheme.badgeBg || 'bg-slate-800'
                          } ${divMeta?.colorScheme.badgeText || 'text-slate-300'}`}
                        >
                          {item.divisionCode}
                        </span>
                        <span className="font-semibold text-sm text-white group-hover:text-indigo-300 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-400">· {item.subCategoryLabel}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-slate-800/80 text-amber-300/90 rounded font-mono">
                          {item.jlptFocus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isCurrentActive && (
                      <span className="text-[10px] text-indigo-400 bg-indigo-950 border border-indigo-800 px-2 py-0.5 rounded-full font-medium">
                        Đang học
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#0a0f1d] border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <span>Tìm thấy {results.length} / 81 chuyên mục</span>
          <span>Nhấn ESC để đóng · Nhấp để chuyển ngay</span>
        </div>
      </div>
    </div>
  );
};
