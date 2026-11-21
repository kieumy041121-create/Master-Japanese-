import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  BookOpen,
  HelpCircle,
  Volume2,
  Zap,
  Lightbulb,
  Layers,
  Search,
  Eye
} from 'lucide-react';
import {
  KanjiMnemonicResult,
  craftKanjiMnemonicStory
} from '../../services/aiSenseiSuperEnginesService';
import { speechService } from '../../services/speechService';

const DIFFICULT_KANJI_PRESETS = [
  { char: '鬱', label: 'Uất (U uất, trầm cảm)' },
  { char: '憂', label: 'Ưu (Ưu tư, lo lắng)' },
  { char: '躊', label: 'Trù (Trù trừ, ngập ngừng)' },
  { char: '犠', label: 'Hy (Hy sinh)' },
  { char: '薔', label: 'Tường (Hoa hồng/Tường vi)' },
  { char: '繊', label: 'Tiêm (Tinh tế, thanh mảnh)' },
  { char: '鑑', label: 'Giám (Giám định, gương soi)' }
];

export const AiSenseiKanjiMnemonicTab: React.FC = () => {
  const [inputKanji, setInputKanji] = useState('鬱');
  const [isCrafting, setIsCrafting] = useState(false);
  const [mnemonicResult, setMnemonicResult] = useState<KanjiMnemonicResult | null>(null);

  const handleCraftStory = async (customChar?: string) => {
    const charToCraft = (customChar || inputKanji).trim();
    if (!charToCraft || isCrafting) return;
    setIsCrafting(true);
    try {
      const res = await craftKanjiMnemonicStory(charToCraft);
      setMnemonicResult(res);
      speechService.playSuccessSound();
    } finally {
      setIsCrafting(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎨</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Họa Sĩ Chiết Tự &amp; Ký Ức Hình Ảnh (Kanji Mnemonic Crafter)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Đánh bại các Hán tự siêu khó bằng câu chuyện hình ảnh ly kỳ, hài hước và bản đồ tư duy ẩn dụ (Mind Map).
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-700/60 font-semibold shrink-0">
            Khắc Sâu Vào Tiềm Thức
          </span>
        </div>

        {/* Difficult Kanji Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Hán tự N1 hiểm hóc:</span>
          {DIFFICULT_KANJI_PRESETS.map((preset) => (
            <button
              key={preset.char}
              type="button"
              onClick={() => {
                setInputKanji(preset.char);
                handleCraftStory(preset.char);
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-purple-950/80 text-purple-200 border border-slate-700/60 hover:border-purple-600 transition-all cursor-pointer font-japanese"
            >
              {preset.char} <span className="text-[10px] text-slate-400">({preset.label.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3 shadow-lg">
        <div className="flex-1 flex items-center gap-2 w-full">
          <input
            type="text"
            value={inputKanji}
            onChange={(e) => setInputKanji(e.target.value)}
            placeholder="Nhập 1 chữ Hán bất kỳ để sáng tác mẹo nhớ (ví dụ: 鬱, 憂, 躊, 躇)..."
            className="flex-1 bg-slate-950 border border-slate-700 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors font-japanese"
          />
        </div>

        <button
          type="button"
          onClick={() => handleCraftStory()}
          disabled={!inputKanji.trim() || isCrafting}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-950 disabled:opacity-40 cursor-pointer"
        >
          {isCrafting ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin text-purple-200" />
              <span>Đang sáng tác câu chuyện chiết tự...</span>
            </>
          ) : (
            <>
              <Palette className="w-4 h-4 text-purple-200" />
              <span>Sáng Tác Mẹo Nhớ Độc Bản</span>
            </>
          )}
        </button>
      </div>

      {/* Story & Visual Result */}
      {mnemonicResult && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Main Visual Story Card */}
          <div className="bg-slate-900/90 border border-purple-900/50 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl font-black text-purple-300 font-japanese">
                  {mnemonicResult.kanji}
                </span>
                <div>
                  <div className="text-base font-bold text-white">
                    Âm Hán Việt: <span className="text-amber-300">{mnemonicResult.hanViet}</span>
                  </div>
                  <div className="text-xs text-purple-300/80 font-medium">
                    {mnemonicResult.visualStoryTitle}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => speechService.speakJapanese(mnemonicResult.kanji)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 cursor-pointer"
                title="Nghe phát âm chữ"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Narrative Story */}
            <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-purple-900/40 space-y-2">
              <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Câu Chuyện Ký Ức Độc Bản (Khắc Sâu Não Bộ):</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-sans">
                {mnemonicResult.visualStoryNarrative}
              </p>
            </div>

            {/* 3-Second Hook */}
            <div className="bg-purple-950/60 p-3.5 rounded-xl border border-purple-800/60 flex items-center gap-2.5 text-xs text-purple-200">
              <Zap className="w-4 h-4 text-amber-300 shrink-0" />
              <div>
                <span className="font-bold text-amber-300">Thần chú 3 giây khi vào phòng thi: </span>
                <span>{mnemonicResult.threeSecondMemoryHook}</span>
              </div>
            </div>
          </div>

          {/* Radicals & Mind Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Radical Breakdown */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Bóc Tách Bộ Thủ (Radical Breakdown)</span>
              </h4>

              <div className="space-y-2">
                {mnemonicResult.radicalBreakdown.map((rad, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base font-bold text-amber-300 font-japanese w-6 text-center">
                        {rad.radicalChar}
                      </span>
                      <span className="font-semibold text-slate-200">{rad.radicalName}</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">{rad.meaning}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metaphoric Mind Map */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Eye className="w-4 h-4 text-indigo-400" />
                <span>Bản Đồ Tư Duy Ẩn Dụ (Metaphoric Mind Map)</span>
              </h4>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                <div className="text-indigo-300 font-semibold">
                  🎯 Hình ảnh trung tâm: {mnemonicResult.metaphoricMindMap.centralImage}
                </div>
                <div className="space-y-1 text-slate-300">
                  <div className="font-medium text-slate-400 text-[11px]">Các nhánh liên tưởng:</div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                    {mnemonicResult.metaphoricMindMap.branches.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-purple-300 text-[11px] pt-1 border-t border-slate-800">
                  ⚓ Mỏ neo cảm xúc: {mnemonicResult.metaphoricMindMap.emotionalAnchor}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
