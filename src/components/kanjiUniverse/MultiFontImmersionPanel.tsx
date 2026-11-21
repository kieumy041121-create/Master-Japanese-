import React, { useState } from 'react';
import {
  Type,
  AlertTriangle,
  Volume2,
  Eye,
  Sparkles,
  MapPin,
} from 'lucide-react';
import {
  MultiFontProfile,
  RealWorldScenePlate,
} from '../../services/kanjiOmniverseEngine';
import { speechService } from '../../services/speechService';

interface MultiFontImmersionPanelProps {
  profile: MultiFontProfile;
  scenes: RealWorldScenePlate[];
  onTriggerScenePreset: (query: string) => void;
}

const FONT_CLASS_MAP: Record<'mincho' | 'gothic' | 'kyokasho' | 'gyosho', string> = {
  mincho: 'font-mincho',
  gothic: 'font-jp',
  kyokasho: 'font-kyokasho',
  gyosho: 'font-gyosho',
};

const REAL_WORLD_PRESETS = [
  { query: '半額', label: 'Tem Siêu thị「半額」' },
  { query: '注意', label: 'Biển Báo Tokyo「注意」' },
  { query: '語', label: 'Bảng Ga JR「語」' },
];

const RealWorldPlateGraphic: React.FC<{ plate: RealWorldScenePlate }> = ({ plate }) => {
  const playSceneAudio = () => {
    const ambientMap: Record<RealWorldScenePlate['sceneType'], 'supermarket' | 'shibuya' | 'izakaya' | 'station'> = {
      supermarket_tag: 'supermarket',
      tokyo_street_sign: 'shibuya',
      izakaya_menu: 'izakaya',
      jr_station_board: 'station',
    };
    speechService.playAmbientBurst(ambientMap[plate.sceneType]);
    speechService.speak(plate.headlineJa);
  };

  if (plate.sceneType === 'supermarket_tag') {
    return (
      <div className="rounded-xl border-2 border-red-600 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-400 text-slate-950 p-4 shadow-md flex flex-col justify-between min-h-[178px] relative overflow-hidden">
        {/* Supermarket red price ribbon */}
        <div className="flex items-center justify-between border-b-2 border-red-600 pb-1.5">
          <span className="text-[11px] font-black tracking-wider uppercase text-red-700">
            割引シール · SUPERMARKET TAG
          </span>
          <button
            type="button"
            onClick={playSceneAudio}
            className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            aria-label={`Nghe bảng ${plate.highlightedTerm}`}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="py-2 text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-red-700 tracking-tight font-jp leading-tight">
            {plate.headlineJa}
          </div>
          <div className="text-xs font-bold text-slate-900 font-jp">{plate.sublineJa}</div>
        </div>

        {/* Faux barcode strip */}
        <div className="flex items-center justify-between pt-2 border-t border-red-600/40 text-[10px] font-mono text-slate-900">
          <span>{plate.highlightedTerm}</span>
          <div className="flex items-center gap-[1.5px] h-4" aria-hidden="true">
            {[2, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1, 2].map((w, idx) => (
              <span
                key={idx}
                className="bg-slate-950 h-full inline-block"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (plate.sceneType === 'tokyo_street_sign') {
    return (
      <div className="rounded-xl border-2 border-amber-400 bg-slate-950 text-amber-300 p-4 shadow-md flex flex-col justify-between min-h-[178px] relative overflow-hidden">
        {/* Top hazard stripe */}
        <div
          className="h-2.5 w-full rounded-sm mb-2"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #facc15 0, #facc15 10px, #0f172a 10px, #0f172a 20px)',
          }}
        />
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">
            TOKYO ROAD SIGN
          </span>
          <button
            type="button"
            onClick={playSceneAudio}
            className="p-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 cursor-pointer"
            aria-label={`Nghe biển báo ${plate.highlightedTerm}`}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="py-2 text-center space-y-1">
          <div className="text-xl sm:text-2xl font-black text-amber-300 font-jp tracking-wide leading-snug">
            {plate.headlineJa}
          </div>
          <div className="text-xs text-slate-200 font-jp">{plate.sublineJa}</div>
        </div>

        <div
          className="h-2.5 w-full rounded-sm mt-2"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #facc15 0, #facc15 10px, #0f172a 10px, #0f172a 20px)',
          }}
        />
      </div>
    );
  }

  if (plate.sceneType === 'jr_station_board') {
    return (
      <div className="rounded-xl border border-emerald-500/60 bg-[#071310] text-white p-4 shadow-md flex flex-col justify-between min-h-[178px]">
        {/* JR Yamanote signature green band */}
        <div className="flex items-center justify-between border-b-4 border-emerald-500 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-black">
              JR
            </span>
            <span className="text-xs font-mono text-emerald-300">STATION DISPLAY</span>
          </div>
          <button
            type="button"
            onClick={playSceneAudio}
            className="p-1.5 rounded-lg bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 cursor-pointer"
            aria-label={`Nghe bảng ga ${plate.highlightedTerm}`}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="py-3 space-y-1.5">
          <div className="text-lg sm:text-xl font-bold text-amber-300 font-jp tracking-wide">
            {plate.headlineJa}
          </div>
          <div className="text-xs text-emerald-200/90 font-jp">{plate.sublineJa}</div>
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between border-t border-emerald-900/60 pt-1.5">
          <span>{plate.highlightedTerm}</span>
          <span className="text-emerald-400">LED LIVE</span>
        </div>
      </div>
    );
  }

  // Izakaya wooden hanging menu (tanzaku)
  return (
    <div className="rounded-xl border border-amber-800/80 bg-gradient-to-b from-[#3c2415] via-[#2b180d] to-[#1f1108] text-amber-50 p-4 shadow-md flex flex-col justify-between min-h-[178px]">
      <div className="flex items-center justify-between border-b border-amber-700/40 pb-2">
        <span className="text-[11px] font-mono text-amber-300">居酒屋 · 手書き短冊</span>
        <button
          type="button"
          onClick={playSceneAudio}
          className="p-1.5 rounded-lg bg-amber-900/70 hover:bg-amber-800 text-amber-100 cursor-pointer"
          aria-label={`Nghe thực đơn ${plate.highlightedTerm}`}
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="py-2 text-center space-y-1.5">
        <div className="text-2xl sm:text-3xl font-gyosho text-amber-100 tracking-wider leading-snug">
          {plate.headlineJa}
        </div>
        <div className="text-xs font-kyokasho text-amber-200/90">{plate.sublineJa}</div>
      </div>

      <div className="flex items-center justify-between pt-1.5 border-t border-amber-700/40 text-[11px]">
        <span className="text-amber-300 font-jp">{plate.highlightedTerm}</span>
        <span className="px-1.5 py-0.5 border border-rose-500 text-rose-400 font-mincho text-[10px] font-bold">
          酒処印
        </span>
      </div>
    </div>
  );
};

export const MultiFontImmersionPanel: React.FC<MultiFontImmersionPanelProps> = ({
  profile,
  scenes,
  onTriggerScenePreset,
}) => {
  const [selectedFontId, setSelectedFontId] = useState<'mincho' | 'gothic' | 'kyokasho' | 'gyosho'>('gyosho');
  const [showOverlayDiff, setShowOverlayDiff] = useState<boolean>(true);
  const primaryAlert = profile.alerts[0];

  return (
    <div className="space-y-6">
      {/* PILLAR 3: MULTI-FONT & GYOSHO REAL-WORLD DECRYPTION */}
      <section className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <Type className="w-4 h-4 text-indigo-400" />
              <span>Trạm Khảo Cứu Đa Phông Chữ & Giải Mã Chữ Thảo Thực Chiến</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Soi song song chữ【{profile.character}】qua 4 hệ phông chữ Nhật Bản thực tế (Mincho · Gothic · Kyokashotai · Gyosho) và cảnh báo nét khác biệt giữa chữ in và viết tay.
            </p>
          </div>

          <button
            type="button"
            onClick={() => speechService.speak(profile.character)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-indigo-400 text-xs text-slate-200 inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Phát âm【{profile.character}】</span>
          </button>
        </div>

        {/* 4-Font Parallel Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.fonts.map((font) => {
            const isSelected = selectedFontId === font.id;
            return (
              <div
                key={font.id}
                onClick={() => setSelectedFontId(font.id)}
                className={`rounded-xl border p-4 flex flex-col justify-between gap-3 cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/25'
                    : 'border-slate-800 bg-[#070b14] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-semibold text-indigo-300">{font.label}</span>
                  <span className="text-slate-500">{font.sublabel}</span>
                </div>

                {/* Glyph Frame with subtle paper grid crosshairs */}
                <div className="h-32 rounded-xl border border-slate-800/80 bg-[#0b1120] relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-slate-500" />
                    <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-slate-500" />
                  </div>
                  <span
                    className={`text-7xl text-white leading-none select-all ${FONT_CLASS_MAP[font.id]}`}
                  >
                    {profile.character}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{font.contextNote}</p>
              </div>
            );
          })}
        </div>

        {/* Crimson Print-vs-Handwritten Divergence Analyzer */}
        {primaryAlert && (
          <div className="rounded-xl border border-rose-500/45 bg-rose-950/20 p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Visual Divergence Comparator Box */}
            <div className="lg:col-span-4 flex flex-col items-center gap-2">
              <div className="w-40 h-40 rounded-2xl border border-rose-500/40 bg-[#070b14] relative flex items-center justify-center overflow-hidden">
                {/* Base textbook / print glyph */}
                <span
                  className={`text-8xl leading-none transition-colors ${
                    selectedFontId === 'gyosho'
                      ? 'font-gyosho text-slate-200'
                      : 'font-kyokasho text-slate-200'
                  }`}
                >
                  {profile.character}
                </span>

                {/* Crimson SVG Divergence Overlay */}
                {showOverlayDiff && (
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    {primaryAlert.crimsonOverlayPaths.map((d, idx) => (
                      <path
                        key={idx}
                        d={d}
                        fill="none"
                        stroke="#fb7185"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeOpacity="0.85"
                      />
                    ))}
                  </svg>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowOverlayDiff((v) => !v)}
                className="text-[11px] font-medium text-rose-300 hover:text-rose-200 inline-flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showOverlayDiff ? 'Tắt lớp tô đỏ khác biệt' : 'Bật lớp tô đỏ khác biệt'}</span>
              </button>
            </div>

            {/* Detailed Print vs Handwritten Notes */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-xs font-mono font-bold text-rose-300 uppercase">
                  {primaryAlert.radicalOrPart}
                </span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span className="text-sm font-semibold text-white">{primaryAlert.title}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-slate-800 bg-[#070b14] p-3 space-y-1">
                  <div className="font-semibold text-indigo-300">Chữ In (Mincho / Gothic)</div>
                  <p className="text-slate-300 leading-relaxed">{primaryAlert.printFormNote}</p>
                </div>
                <div className="rounded-lg border border-rose-500/35 bg-[#070b14] p-3 space-y-1">
                  <div className="font-semibold text-rose-300">Viết Tay (Kyokashotai / Gyosho)</div>
                  <p className="text-slate-300 leading-relaxed">{primaryAlert.handwrittenFormNote}</p>
                </div>
              </div>

              <div className="text-xs text-amber-200/95 flex items-start gap-2 pt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-amber-300">Thực chiến Izakaya & Bảng hiệu:</strong>{' '}
                  {primaryAlert.izakayaRealWorldTip}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* PILLAR 4: REAL-WORLD VISUAL IMMERSION ENGINE */}
      <section className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Động Cơ Hòa Nhập Đời Thực & Bối Cảnh Hóa Thị Giác Nhật Bản</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Đưa chữ Hán thoát khỏi trang giấy trắng lên tem siêu thị, biển cảnh báo đường phố Tokyo, bảng điện ga JR và thực đơn quán Izakaya.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {REAL_WORLD_PRESETS.map((preset) => (
              <button
                key={preset.query}
                type="button"
                onClick={() => onTriggerScenePreset(preset.query)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/60 text-xs font-medium text-slate-200 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {scenes.map((plate) => (
            <article
              key={plate.id}
              className="rounded-xl border border-slate-800 bg-[#070b14] p-3.5 flex flex-col justify-between gap-3.5"
            >
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-emerald-300 truncate">
                  {plate.locationBadge}
                </div>

                <RealWorldPlateGraphic plate={plate} />

                <div className="space-y-1">
                  <div className="text-sm font-semibold text-white">
                    {plate.highlightedTerm}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{plate.sceneCaptionVi}</p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-800/80 text-xs text-amber-200/90 leading-snug">
                <strong className="text-amber-300">Mẹo sinh tồn:</strong> {plate.realLifeTip}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
