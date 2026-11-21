import React from 'react';
import { Volume2, BookmarkPlus, Check } from 'lucide-react';
import { DualPitchWord } from '../../services/omniverseStorageService';
import { speechService } from '../../services/speechService';

interface DualPitchMoraChartProps {
  item: DualPitchWord;
  isDark: boolean;
  isSavedToSrs?: boolean;
  onSaveToSrs?: (item: DualPitchWord) => void;
}

export const DualPitchMoraChart: React.FC<DualPitchMoraChartProps> = ({
  item,
  isDark,
  isSavedToSrs = false,
  onSaveToSrs,
}) => {
  const morae = item.morae.length > 0 ? item.morae : [{ kana: item.reading, type: 'normal' as const }];
  const count = morae.length;
  const stepX = 58;
  const padX = 34;
  const width = Math.max(240, padX * 2 + (count - 1) * stepX);
  const height = 104;

  // Map sungPitch (0..2) and tokyoPitch (0..1) into clear non-overlapping vertical tracks
  const sungY = (val: number) => (val >= 2 ? 18 : val === 1 ? 36 : 54);
  const tokyoY = (val: number) => (val >= 1 ? 68 : 88);

  const sungPoints = morae.map((_, i) => {
    const x = padX + i * stepX;
    const y = sungY(item.sungPitch[i] ?? 1);
    return { x, y };
  });

  const tokyoPoints = morae.map((_, i) => {
    const x = padX + i * stepX;
    const y = tokyoY(item.tokyoPitch[i] ?? 0);
    return { x, y };
  });

  const buildPath = (pts: Array<{ x: number; y: number }>) =>
    pts.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const moraTypeMeta = (type: DualPitchWord['morae'][number]['type']) => {
    switch (type) {
      case 'long':
        return { label: 'Trường âm', accent: isDark ? 'text-amber-300 border-amber-500/40 bg-amber-500/10' : 'text-amber-800 border-amber-400/60 bg-amber-50' };
      case 'sokuon':
        return { label: 'Xúc âm っ', accent: isDark ? 'text-rose-300 border-rose-500/40 bg-rose-500/10' : 'text-rose-800 border-rose-400/60 bg-rose-50' };
      case 'nasal':
        return { label: 'Âm mũi ん', accent: isDark ? 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10' : 'text-emerald-800 border-emerald-400/60 bg-emerald-50' };
      default:
        return { label: 'Mora', accent: isDark ? 'text-stone-200 border-stone-700 bg-stone-900/70' : 'text-stone-800 border-stone-300 bg-stone-50' };
    }
  };

  return (
    <div
      className={`rounded-2xl border p-4 transition-colors ${
        isDark ? 'bg-[#161b24] border-stone-800' : 'bg-[#fbf8f3] border-stone-200/90'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className={`font-mincho text-xl font-bold ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
              {item.word}
            </span>
            <span className={`text-sm font-jp ${isDark ? 'text-amber-300/90' : 'text-amber-800'}`}>
              {item.reading}
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            {item.meaningVi} · <span className="font-mono tabular-nums">{item.pitchPatternLabel}</span> · {count} Mora
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => speechService.speak(item.reading, 0.85)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              isDark
                ? 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                : 'bg-stone-200/70 text-stone-800 hover:bg-stone-300/80'
            }`}
            title="Nghe phát âm chuẩn Tokyo"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Nghe NHK</span>
          </button>
          {onSaveToSrs && (
            <button
              type="button"
              onClick={() => onSaveToSrs(item)}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                isSavedToSrs
                  ? isDark
                    ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : isDark
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                  : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
              }`}
            >
              {isSavedToSrs ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
              <span>{isSavedToSrs ? 'Đã lưu FSRS' : 'Lưu FSRS'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Dual Pitch Curve SVG */}
      <div className="overflow-x-auto pb-1">
        <div className="flex items-center gap-4 text-[11px] mb-1.5">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-4 h-0.5 border-t-2 border-dashed border-amber-500" />
            <span className={isDark ? 'text-amber-300/90' : 'text-amber-800'}>Giai điệu khi hát</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-4 h-0.5 bg-emerald-500" />
            <span className={isDark ? 'text-emerald-300/90' : 'text-emerald-800'}>Trọng âm chuẩn Tokyo NHK</span>
          </span>
        </div>

        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block max-w-full"
          role="img"
          aria-label={`Biểu đồ trọng âm kép cho ${item.word}`}
        >
          {/* Subtle guide lines */}
          <line x1={12} y1={58} x2={width - 12} y2={58} stroke={isDark ? '#29303d' : '#e5dfd4'} strokeWidth="1" />

          {/* Sung Melody Contour (Dashed Warm Amber) */}
          <path
            d={buildPath(sungPoints)}
            fill="none"
            stroke="#d98a2b"
            strokeWidth="2.2"
            strokeDasharray="5 4"
            strokeLinecap="round"
          />
          {sungPoints.map((pt, idx) => (
            <circle
              key={`sung_${idx}`}
              cx={pt.x}
              cy={pt.y}
              r="4"
              fill={isDark ? '#161b24' : '#fbf8f3'}
              stroke="#d98a2b"
              strokeWidth="2"
            />
          ))}

          {/* Standard Tokyo NHK Pitch Contour (Solid Emerald) */}
          <path
            d={buildPath(tokyoPoints)}
            fill="none"
            stroke="#2f9e73"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {tokyoPoints.map((pt, idx) => {
            const isDrop = idx > 0 && (item.tokyoPitch[idx - 1] ?? 0) === 1 && (item.tokyoPitch[idx] ?? 0) === 0;
            return (
              <g key={`tokyo_${idx}`}>
                <circle cx={pt.x} cy={pt.y} r="4.5" fill="#2f9e73" />
                {isDrop && (
                  <text
                    x={pt.x - stepX * 0.45}
                    y={pt.y - 8}
                    fontSize="10"
                    fill="#d15b47"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    ＼
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Visual Mora Grid */}
        <div className="flex items-stretch gap-1.5 mt-1" style={{ minWidth: `${Math.min(width, 280)}px` }}>
          {morae.map((m, idx) => {
            const meta = moraTypeMeta(m.type);
            return (
              <div
                key={`mora_${idx}`}
                className={`flex-1 min-w-[46px] rounded-lg border px-1.5 py-1.5 text-center ${meta.accent}`}
              >
                <div className="font-jp text-base font-bold leading-tight">{m.kana}</div>
                <div className="text-[10px] opacity-80 leading-tight mt-0.5 tabular-nums">
                  {m.type === 'normal' ? `M${idx + 1}` : meta.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className={`text-xs leading-relaxed mt-3 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
        {item.contrastNoteVi}
      </p>
    </div>
  );
};
