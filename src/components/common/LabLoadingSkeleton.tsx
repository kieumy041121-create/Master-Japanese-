import React from 'react';
import { Sparkles } from 'lucide-react';

export const LabLoadingSkeleton: React.FC<{ label?: string }> = ({ label = 'Đang khởi tạo không gian học tập...' }) => {
  return (
    <div className="w-full min-h-[420px] rounded-2xl bg-[#080d19] border border-slate-800/80 p-8 flex flex-col items-center justify-center space-y-4 shadow-xl animate-fadeIn">
      <div className="relative">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 animate-pulse">
          <Sparkles className="w-6 h-6 animate-spin" />
        </div>
      </div>

      <div className="text-center space-y-1">
        <div className="text-sm font-bold text-white tracking-tight">{label}</div>
        <div className="text-xs text-slate-400 font-jp">言葉無限 · Kotoba Infinity</div>
      </div>

      <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-[shimmer_1.5s_infinite] -translate-x-full" />
      </div>
    </div>
  );
};
