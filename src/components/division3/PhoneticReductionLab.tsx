import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { PhoneticReductionItem } from '../../types/listeningSpeakingExtended';
import { initialPhoneticReductionList, extraPhoneticReductionList } from '../../data/listeningSpeakingExtendedDatabase';
import {
  Ear,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PlusCircle,
  Sparkles,
  Play,
  RotateCcw,
  Zap,
  Layers,
  ArrowRight,
  Sliders,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const PhoneticReductionLab: React.FC<Props> = ({ currentLevel = 'N2' }) => {
  const [items, setItems] = useState<PhoneticReductionItem[]>(initialPhoneticReductionList);
  const [extraLoaded, setExtraLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PhoneticReductionItem>(initialPhoneticReductionList[0]);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [selectedDrillOption, setSelectedDrillOption] = useState<number | null>(null);
  const [isDrillSubmitted, setIsDrillSubmitted] = useState<boolean>(false);

  const speakText = (text: string, rate: number = playbackSpeed) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLoadMore = () => {
    if (!extraLoaded) {
      setItems([...items, ...extraPhoneticReductionList]);
      setExtraLoaded(true);
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedLevel === 'all') return true;
    return item.level === selectedLevel;
  });

  const handleSelectOption = (idx: number) => {
    if (isDrillSubmitted) return;
    setSelectedDrillOption(idx);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-violet-950/80 via-slate-900 to-purple-950/80 border border-violet-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Ear className="w-3.5 h-3.5" />
              Chuyên Mục 89 · Lab Nghe Nói & Phản Xạ (PH3)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Luyện Nghe Nuốt Âm, Biến Âm & Âm Lướt Khẩu Ngữ
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-mono border border-violet-500/30">
                音変化・リダクション
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Phá vỡ rào cản nghe tiếng Nhật tự nhiên: Giải mã hiện tượng nuốt âm てしまう ➔ ちゃう, なければ ➔ なきゃ, nuốt trợ từ và hiện tượng lược chữ Ra (ら抜き言葉) xuất hiện liên tục trong đời sống và kỳ thi Chokkai.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={handleLoadMore}
              disabled={extraLoaded}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${
                extraLoaded
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border border-violet-400/30 hover:shadow-violet-500/25'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              {extraLoaded ? 'Đã Tải Đủ 10 Quy Tắc (+5 Đầy Đủ)' : 'Tải Thêm 5 Quy Tắc (+5)'}
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 mr-2 uppercase tracking-wider">Cấp độ JLPT:</span>
          {['all', 'N1', 'N2'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedLevel === lvl
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
              }`}
            >
              {lvl === 'all' ? `Tất Cả (${items.length})` : `${lvl} (${items.filter((i) => i.level === lvl).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Selector & Phonetic Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Danh sách quy tắc nuốt âm</span>
            <span className="font-mono text-violet-400">{filteredItems.length} quy luật</span>
          </div>
          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setSelectedDrillOption(null);
                    setIsDrillSubmitted(false);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-violet-950/70 border-violet-500/70 shadow-lg shadow-violet-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-violet-900/60 text-violet-300 border border-violet-700/40">
                      {item.level}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.ruleCategory}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.ruleCategoryName}</h4>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-slate-400 font-mono line-through">{item.standardForm.split(' ')[0]}</span>
                    <ArrowRight className="w-3 h-3 text-violet-400" />
                    <span className="text-violet-300 font-bold font-mono">{item.reducedForm.split('/')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Interactive Acoustic Lab */}
        <div className="lg:col-span-8 space-y-5">
          {/* Speed & Pitch Control Console */}
          <div className="bg-slate-900/90 border border-violet-800/40 rounded-2xl p-5 shadow-xl flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Sliders className="w-5 h-5 text-violet-400" />
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Tốc độ phát âm (Speed Controller):
                </span>
                <span className="text-xs text-slate-400">Chọn tốc độ nghe để luyện tai bắt kịp âm nuốt</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {[0.75, 1.0, 1.25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                    playbackSpeed === spd
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Contrast Display Box: Standard vs Reduced */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-violet-500/20 text-violet-300 border border-violet-500/30">
                {selectedItem.level} · {selectedItem.ruleCategoryName}
              </span>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {selectedItem.phoneticRuleExplanation}
              </p>
            </div>

            {/* Side-by-Side Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Standard Textbook Form */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Sách Giáo Khoa (Dạng Chuẩn):
                  </span>
                  <button
                    onClick={() => speakText(selectedItem.standardForm, 0.85)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                    title="Nghe dạng chuẩn"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-base font-bold text-slate-300 font-mono">
                  {selectedItem.standardForm}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed italic border-t border-slate-900 pt-2">
                  Ví dụ chuẩn: "{selectedItem.exampleSentenceStandard}"
                </div>
              </div>

              {/* Card 2: Spoken Fast Reduced Form */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-violet-950/60 to-slate-950 border border-violet-600/50 space-y-3 shadow-lg shadow-violet-950/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Khẩu Ngữ Đời Thật (Nuốt Âm):
                  </span>
                  <button
                    onClick={() => speakText(selectedItem.exampleSentenceSpoken, playbackSpeed)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md shadow-violet-600/30"
                    title="Nghe khẩu ngữ thực tế"
                  >
                    <Volume2 className="w-4 h-4" />
                    Nghe Nói Nhanh
                  </button>
                </div>
                <div className="text-base md:text-lg font-black text-white font-mono">
                  {selectedItem.reducedForm}
                </div>
                <div className="text-xs text-violet-200 leading-relaxed border-t border-violet-900/60 pt-2">
                  Ví dụ thực tế: <span className="font-semibold text-white">"{selectedItem.exampleSentenceSpoken}"</span>
                </div>
              </div>
            </div>

            {/* Meaning & Context */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Ý nghĩa tiếng Việt:
              </span>
              <p className="text-sm text-slate-200">{selectedItem.meaningVietnamese}</p>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-900">
                <span className="text-slate-300 font-medium">Bối cảnh giao tiếp: </span>
                {selectedItem.nativeUsageContext}
              </div>
            </div>

            {/* Trap Warning Box */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                Bẫy Nghe Đề Thi JLPT Chokkai:
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">{selectedItem.listeningTrap}</p>
            </div>

            {/* Interactive Ear Drill */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-violet-800/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Tai thỏ bắt âm (Acoustic Drill):
                  </span>
                </div>
                <button
                  onClick={() => speakText(selectedItem.drillOptions.promptAudioText, playbackSpeed)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-900/60 hover:bg-violet-800 text-violet-300 text-xs font-semibold transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Nghe Câu Đố
                </button>
              </div>

              <div className="text-sm font-semibold text-violet-200 font-mono bg-slate-900 p-3 rounded-lg border border-slate-800">
                "{selectedItem.drillOptions.promptAudioText}"
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-400">Chọn câu diễn giải đúng nghĩa nhất của âm nói lướt trên:</p>
                {selectedItem.drillOptions.options.map((opt, optIdx) => {
                  const isSelected = selectedDrillOption === optIdx;
                  let styleClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isDrillSubmitted) {
                    if (optIdx === selectedItem.drillOptions.correctIndex) {
                      styleClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                    } else if (isSelected && optIdx !== selectedItem.drillOptions.correctIndex) {
                      styleClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    styleClass = 'bg-violet-950 border-violet-500 text-violet-200';
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-3 rounded-xl border text-xs md:text-sm cursor-pointer transition-all ${styleClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                          {optIdx + 1}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!isDrillSubmitted ? (
                <button
                  onClick={() => setIsDrillSubmitted(true)}
                  disabled={selectedDrillOption === null}
                  className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                    selectedDrillOption !== null
                      ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Kiểm Tra Tai Nghe
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-violet-400">Phân tích âm học: </span>
                  {selectedItem.drillOptions.explanation}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
