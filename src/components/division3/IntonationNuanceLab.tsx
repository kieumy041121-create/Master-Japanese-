import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { IntonationNuanceItem } from '../../types/listeningSpeakingExtended';
import { initialIntonationList, extraIntonationList } from '../../data/listeningSpeakingExtendedDatabase';
import {
  Activity,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PlusCircle,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  RotateCcw,
  Lightbulb,
  Compass,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const IntonationNuanceLab: React.FC<Props> = ({ currentLevel = 'N2' }) => {
  const [items, setItems] = useState<IntonationNuanceItem[]>(initialIntonationList);
  const [extraLoaded, setExtraLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<IntonationNuanceItem>(initialIntonationList[0]);
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const speakText = (text: string, pitch: number = 1.0, rate: number = 0.95) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.pitch = pitch;
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLoadMore = () => {
    if (!extraLoaded) {
      setItems([...items, ...extraIntonationList]);
      setExtraLoaded(true);
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedLevel === 'all') return true;
    return item.level === selectedLevel;
  });

  const getContourIcon = (type: string) => {
    switch (type) {
      case 'rising':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'falling':
        return <TrendingDown className="w-4 h-4 text-rose-400" />;
      default:
        return <Minus className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-orange-950/80 border border-amber-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Activity className="w-3.5 h-3.5" />
              Chuyên Mục 92 · Lab Nghe Nói & Phản Xạ (PH3)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Bậc Thầy Ngữ Điệu Cảm Xúc & Nghĩa Ngầm
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                イントネーションとニュアンス
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Cùng một từ ngữ, ngữ điệu khác nhau mang ý nghĩa trái ngược 180 độ: Lên giọng "いいですね↗" (Đồng ý) vs Hạ giọng "いいです↘" (Từ chối khéo), "大丈夫です", "そうですか" và bẫy giao tiếp tinh vi của người Nhật.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={handleLoadMore}
              disabled={extraLoaded}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${
                extraLoaded
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border border-amber-400/30 hover:shadow-amber-500/25'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              {extraLoaded ? 'Đã Tải Đủ 10 Cặp Điệu (+5 Đầy Đủ)' : 'Tải Thêm 5 Cặp Điệu (+5)'}
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
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
              }`}
            >
              {lvl === 'all' ? `Tất Cả (${items.length})` : `${lvl} (${items.filter((i) => i.level === lvl).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Danh mục cặp ngữ điệu</span>
            <span className="font-mono text-amber-400">{filteredItems.length} từ khóa</span>
          </div>
          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setSelectedQuizIdx(null);
                    setIsQuizSubmitted(false);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-amber-950/70 border-amber-500/70 shadow-lg shadow-amber-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-700/40">
                      {item.level}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{item.romaji}</span>
                  </div>
                  <h4 className="text-base font-black text-white">{item.targetPhrase}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1">{item.literalMeaning}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Pitch Contrast Canvas */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {selectedItem.level} · Từ khóa mục tiêu
                </span>
                <h3 className="text-2xl font-black text-white mt-2 font-serif">
                  {selectedItem.targetPhrase}{' '}
                  <span className="text-sm font-normal text-slate-400 font-mono">({selectedItem.romaji})</span>
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-medium bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                {selectedItem.literalMeaning}
              </p>
            </div>

            {/* Contrast Grid: Side A vs Side B */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Variant A */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-600/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {getContourIcon(selectedItem.contrastA.pitchContour)}
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      {selectedItem.contrastA.contourLabel}
                    </span>
                  </div>
                  <button
                    onClick={() => speakText(selectedItem.contrastA.spokenSentence, 1.25)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs font-bold transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe Thử
                  </button>
                </div>

                <div className="text-sm font-bold text-white leading-relaxed">
                  Ý nghĩa thật: <span className="text-emerald-300">{selectedItem.contrastA.realMeaning}</span>
                </div>
                <div className="text-xs text-slate-400">
                  Tâm trạng: <span className="text-slate-300 font-medium">{selectedItem.contrastA.toneMood}</span>
                </div>
                <div className="text-xs text-slate-400 italic bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  Ví dụ: "{selectedItem.contrastA.spokenSentence}"
                </div>
              </div>

              {/* Variant B */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-rose-950/40 to-slate-950 border border-rose-600/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {getContourIcon(selectedItem.contrastB.pitchContour)}
                    <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                      {selectedItem.contrastB.contourLabel}
                    </span>
                  </div>
                  <button
                    onClick={() => speakText(selectedItem.contrastB.spokenSentence, 0.75)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-bold transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe Thử
                  </button>
                </div>

                <div className="text-sm font-bold text-white leading-relaxed">
                  Ý nghĩa thật: <span className="text-rose-300">{selectedItem.contrastB.realMeaning}</span>
                </div>
                <div className="text-xs text-slate-400">
                  Tâm trạng: <span className="text-slate-300 font-medium">{selectedItem.contrastB.toneMood}</span>
                </div>
                <div className="text-xs text-slate-400 italic bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  Ví dụ: "{selectedItem.contrastB.spokenSentence}"
                </div>
              </div>
            </div>

            {/* Subtle Clues */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Dấu hiệu nhận biết vi tế (Subtle Clues):
              </span>
              <ul className="space-y-1">
                {selectedItem.subtleClues.map((clue, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scenario Intuition Quiz */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Trắc Nghiệm Phân Biệt Ngữ Điệu Trong Thực Tế:
              </h4>
              <button
                onClick={() => speakText(selectedItem.testScenario.scenarioAudio)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950 border border-amber-800 text-amber-300 text-xs font-semibold hover:bg-amber-900 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                Nghe Tình Huống
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <p className="text-sm font-bold text-white font-mono">{selectedItem.testScenario.scenarioAudio}</p>
              <p className="text-xs text-slate-400 italic">{selectedItem.testScenario.scenarioTranslation}</p>
            </div>

            <div className="space-y-2.5">
              <p className="text-xs font-bold text-slate-300">{selectedItem.testScenario.question}</p>
              {selectedItem.testScenario.options.map((opt, idx) => {
                const isChosen = selectedQuizIdx === idx;
                let optStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                if (isQuizSubmitted) {
                  if (idx === selectedItem.testScenario.correctIndex) {
                    optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                  } else if (isChosen && idx !== selectedItem.testScenario.correctIndex) {
                    optStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }
                } else if (isChosen) {
                  optStyle = 'bg-amber-950 border-amber-500 text-amber-200';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => !isQuizSubmitted && setSelectedQuizIdx(idx)}
                    className={`p-3 rounded-xl border text-xs md:text-sm cursor-pointer transition-all ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {!isQuizSubmitted ? (
              <button
                onClick={() => setIsQuizSubmitted(true)}
                disabled={selectedQuizIdx === null}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                  selectedQuizIdx !== null
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Kiểm Tra Nghĩa Ngầm
              </button>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-amber-400">Giải thích tâm lý ngữ điệu: </span>
                {selectedItem.testScenario.explanation}
              </div>
            )}
          </div>

          {/* Cultural Insight Card */}
          <div className="bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-800/40 rounded-2xl p-5 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              Hiểu Sâu Tâm Lý & Văn Hóa Ngữ Điệu Nhật Bản:
            </div>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">{selectedItem.culturalInsight}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
