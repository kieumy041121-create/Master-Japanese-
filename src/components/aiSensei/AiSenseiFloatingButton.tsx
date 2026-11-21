import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export const AiSenseiFloatingButton: React.FC<Props> = ({ onClick }) => {
  return (
    <aside aria-label="AI Sensei Floating Trigger" className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 hover:from-indigo-500 hover:to-purple-700 active:scale-95 text-white shadow-2xl shadow-indigo-950/80 border border-indigo-400/40 hover:border-indigo-300 transition-all cursor-pointer"
        title="Mở AI Sensei - Giảng viên Đại học Bậc cao giải đáp thắc mắc (Ctrl+J)"
      >
        <div className="relative">
          <div className="w-7 h-7 rounded-lg bg-indigo-950/60 border border-indigo-400/30 flex items-center justify-center text-indigo-200 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-900 animate-pulse" />
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-xs tracking-tight">AI Sensei</span>
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
          </div>
          <span className="text-[10px] text-indigo-200/90 font-medium leading-none hidden sm:inline">
            Giáo Sư Đại Học
          </span>
        </div>

        {/* Hover Tooltip pill on desktop */}
        <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 border border-indigo-800 text-[11px] text-slate-200 shadow-xl animate-fadeIn">
          <span className="font-semibold text-indigo-300">GS. Yamato Kenji: </span>
          Sẵn sàng giải đáp mọi thắc mắc học thuật
        </div>
      </button>
    </aside>
  );
};
