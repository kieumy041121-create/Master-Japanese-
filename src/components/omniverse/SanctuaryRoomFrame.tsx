import React, { useState } from 'react';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

interface SanctuaryRoomFrameProps {
  isDark: boolean;
  wairoHex: string;
  academicPanelLabel?: string;
  headerSlot: React.ReactNode;
  experienceSlot: React.ReactNode;
  academicSlot: React.ReactNode;
  footerSlot?: React.ReactNode;
}

/**
 * Enforces the 65% Primary Experience / 35% Collapsible Academic & Tools layout
 * across all 5 sanctuaries for clean, uncrowded Zen visual clarity.
 */
export const SanctuaryRoomFrame: React.FC<SanctuaryRoomFrameProps> = ({
  isDark,
  wairoHex,
  academicPanelLabel = 'Bảng Giải Phẫu & Công Cụ',
  headerSlot,
  experienceSlot,
  academicSlot,
  footerSlot,
}) => {
  const [isAcademicOpen, setIsAcademicOpen] = useState<boolean>(true);

  return (
    <div className="space-y-4">
      {/* Subtle Wairo Room Header with Collapse Toggle */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 transition-colors relative overflow-hidden ${
          isDark
            ? 'bg-[#141923] border-stone-800/90 text-stone-100'
            : 'bg-[#fcf9f3] border-stone-200 text-stone-900'
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[2.5px]"
          style={{ backgroundColor: wairoHex }}
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">{headerSlot}</div>
            <button
              type="button"
              onClick={() => setIsAcademicOpen((v) => !v)}
              className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isDark
                  ? 'border-stone-700 bg-stone-900/70 text-stone-300 hover:text-white hover:border-stone-500'
                  : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:border-stone-500'
              }`}
              title={isAcademicOpen ? 'Thu gọn bảng phân tích để tập trung 100%' : 'Mở lại bảng giải phẫu 35%'}
            >
              {isAcademicOpen ? (
                <>
                  <PanelRightClose className="w-3.5 h-3.5" />
                  <span>Tập trung 100%</span>
                </>
              ) : (
                <>
                  <PanelRightOpen className="w-3.5 h-3.5" />
                  <span>Mở {academicPanelLabel}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Disciplined 65% / 35% Split Canvas */}
      <div
        className={`grid grid-cols-1 gap-5 items-start ${
          isAcademicOpen ? 'lg:grid-cols-[minmax(0,65fr)_minmax(0,35fr)]' : 'lg:grid-cols-1'
        }`}
      >
        {/* Left 65% — Primary Calm Immersion Stage */}
        <div className="min-w-0 space-y-4">{experienceSlot}</div>

        {/* Right 35% — Collapsible Academic Dissection & Tools */}
        {isAcademicOpen && (
          <aside className="min-w-0 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: wairoHex }}
              >
                {academicPanelLabel} · 35%
              </span>
            </div>
            {academicSlot}
          </aside>
        )}
      </div>

      {footerSlot && <div className="pt-1">{footerSlot}</div>}
    </div>
  );
};
