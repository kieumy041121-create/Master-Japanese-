import React from 'react';

interface PitchAccentMiniSvgProps {
  reading: string;
  pitchType: 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka';
  pitchAccentNum: number;
}

function splitMoras(kana: string): string[] {
  const clean = kana.split('/')[0].replace(/[・\s()（）\-]/g, '').trim();
  const smalls = new Set(['ゃ', 'ゅ', 'ょ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ャ', 'ュ', 'ョ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ']);
  const moras: string[] = [];
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (smalls.has(ch) && moras.length > 0) {
      moras[moras.length - 1] += ch;
    } else {
      moras.push(ch);
    }
  }
  return moras.length > 0 ? moras : [kana];
}

export const PitchAccentMiniSvg: React.FC<PitchAccentMiniSvgProps> = ({
  reading,
  pitchType,
  pitchAccentNum,
}) => {
  const moras = splitMoras(reading).slice(0, 7);
  const count = moras.length;

  // Determine High (1) vs Low (0) per mora according to Tokyo pitch standard
  const levels: number[] = moras.map((_, idx) => {
    if (pitchType === 'atamadaka' || pitchAccentNum === 1) {
      return idx === 0 ? 1 : 0;
    }
    if (pitchType === 'heiban' || pitchAccentNum === 0) {
      return idx === 0 ? 0 : 1;
    }
    if (pitchType === 'odaka') {
      return idx === 0 ? 0 : 1;
    }
    // Nakadaka
    const dropAt = Math.min(Math.max(2, pitchAccentNum), Math.max(2, count));
    if (idx === 0) return 0;
    return idx < dropAt ? 1 : 0;
  });

  const stepX = 24;
  const padX = 12;
  const width = Math.max(64, padX * 2 + (count - 1) * stepX + 12);
  const highY = 10;
  const lowY = 24;

  const points = levels.map((lvl, idx) => ({
    x: padX + idx * stepX,
    y: lvl === 1 ? highY : lowY,
    mora: moras[idx],
    high: lvl === 1,
  }));

  const pathD = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const pitchLabel =
    pitchType === 'heiban'
      ? 'Ngang [⓪]'
      : pitchType === 'atamadaka'
      ? 'Cao đầu [①]'
      : pitchType === 'nakadaka'
      ? `Cao giữa [${pitchAccentNum}]`
      : `Cao đuôi [${count}]`;

  return (
    <div className="inline-flex items-center gap-2.5">
      <svg
        width={width}
        height={42}
        viewBox={`0 0 ${width} 42`}
        className="overflow-visible shrink-0"
        aria-label={`Sơ đồ trọng âm ${pitchLabel}`}
      >
        <path
          d={pathD}
          fill="none"
          stroke="#818cf8"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, idx) => (
          <g key={idx}>
            <circle
              cx={p.x}
              cy={p.y}
              r={3}
              fill={p.high ? '#38bdf8' : '#1e293b'}
              stroke={p.high ? '#38bdf8' : '#64748b'}
              strokeWidth="1.5"
            />
            <text
              x={p.x}
              y={39}
              textAnchor="middle"
              fontSize="10"
              fill="#cbd5e1"
              className="font-jp"
            >
              {p.mora}
            </text>
          </g>
        ))}
      </svg>
      <span className="text-[11px] font-mono tabular-nums text-slate-400 whitespace-nowrap">
        {pitchLabel}
      </span>
    </div>
  );
};
