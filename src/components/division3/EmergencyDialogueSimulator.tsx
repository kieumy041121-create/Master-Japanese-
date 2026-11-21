import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { EmergencyDialogueItem } from '../../types/listeningSpeakingExtended';
import { initialEmergencyList, extraEmergencyList } from '../../data/listeningSpeakingExtendedDatabase';
import {
  PhoneCall,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  AlertOctagon,
  RotateCcw,
  CheckSquare,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const EmergencyDialogueSimulator: React.FC<Props> = ({ currentLevel = 'N2' }) => {
  const [items, setItems] = useState<EmergencyDialogueItem[]>(initialEmergencyList);
  const [extraLoaded, setExtraLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<EmergencyDialogueItem>(initialEmergencyList[0]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [chosenOptionIdx, setChosenOptionIdx] = useState<number | null>(null);
  const [isStepAnswered, setIsStepAnswered] = useState<boolean>(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLoadMore = () => {
    if (!extraLoaded) {
      setItems([...items, ...extraEmergencyList]);
      setExtraLoaded(true);
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedLevel === 'all') return true;
    return item.level === selectedLevel;
  });

  const handleResetSim = () => {
    setCurrentStepIdx(0);
    setChosenOptionIdx(null);
    setIsStepAnswered(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isStepAnswered) return;
    setChosenOptionIdx(idx);
    setIsStepAnswered(true);
  };

  const currentStep = selectedItem.branchingSteps[currentStepIdx] || selectedItem.branchingSteps[0];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-rose-950/80 border border-red-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <PhoneCall className="w-3.5 h-3.5" />
              Chuyên Mục 93 · Lab Nghe Nói & Phản Xạ (PH3)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Mô Phỏng Giao Tiếp Tình Huống Khẩn Cấp & Sinh Tồn Nhật Bản
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono border border-red-500/30">
                119 · 110 · JR Lost & Found
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Trang bị phản xạ sinh tử nơi xứ người: Tương tác trực tiếp với tổng đài cứu thương 119, báo cảnh sát 110 khi bị bám đuôi, khai báo thất lạc ví tiền trên tàu JR và mô tả cơn đau ruột thừa tại phòng cấp cứu đêm.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={handleLoadMore}
              disabled={extraLoaded}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${
                extraLoaded
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white border border-red-400/30 hover:shadow-red-500/25'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              {extraLoaded ? 'Đã Tải Đủ 10 Tình Huống (+5 Đầy Đủ)' : 'Tải Thêm 5 Tình Huống (+5)'}
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
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
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
            <span>Danh mục tình huống khẩn cấp</span>
            <span className="font-mono text-red-400">{filteredItems.length} ca xử lý</span>
          </div>
          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    handleResetSim();
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-red-950/70 border-red-500/70 shadow-lg shadow-red-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-900/60 text-red-300 border border-red-700/40">
                      {item.level}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {item.categoryName.split(' ')[0]}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.emergencyTitle}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.situationBrief}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Interactive Emergency Dispatch Simulator */}
        <div className="lg:col-span-8 space-y-6">
          {/* Situation Header */}
          <div className="bg-slate-900/90 border border-red-800/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-red-500/20 text-red-300 border border-red-500/30">
                  {selectedItem.categoryName}
                </span>
                <h3 className="text-lg md:text-xl font-black text-white mt-2">
                  {selectedItem.emergencyTitle}
                </h3>
              </div>
              <button
                onClick={handleResetSim}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all self-start sm:self-center"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Khởi Động Lại
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed">
              <span className="font-bold text-red-400 uppercase tracking-wider block mb-1">
                Tình huống thực tế:
              </span>
              {selectedItem.situationBrief}
            </div>

            {/* Crucial Survival Keywords */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Từ khóa sinh tử bắt buộc phải nói được:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedItem.crucialKeywords.map((kw, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white font-serif">{kw.japanese}</span>
                        <span className="text-xs text-amber-400 font-mono">({kw.romaji})</span>
                      </div>
                      <span className="text-xs text-slate-400">{kw.vietnamese}</span>
                    </div>
                    <button
                      onClick={() => speakText(kw.japanese)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Branching Step Canvas */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Bước {currentStepIdx + 1} / {selectedItem.branchingSteps.length} trong quy trình điều động
              </span>
              <button
                onClick={() => speakText(currentStep.officialAudioPrompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950 border border-red-800 text-red-300 text-xs font-semibold hover:bg-red-900 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                Nghe Tổng Đài Viên Hỏi
              </button>
            </div>

            {/* Dispatcher Voice Prompt */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-slate-950 to-slate-950 border border-red-800/50 space-y-1.5">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
                Tổng Đài Viên (Dispatcher):
              </span>
              <p className="text-base font-bold text-white font-serif">{currentStep.officialAudioPrompt}</p>
              <p className="text-xs text-slate-400 italic">{currentStep.officialPromptTranslation}</p>
            </div>

            {/* User Choice Options */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Bạn sẽ trả lời qua điện thoại như thế nào?
              </span>
              {currentStep.userChoiceOptions.map((opt, idx) => {
                const isChosen = chosenOptionIdx === idx;
                let optStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                if (isStepAnswered) {
                  if (opt.isStandardSurvival) {
                    optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/50';
                  } else if (isChosen && !opt.isStandardSurvival) {
                    optStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md shadow-rose-950/50';
                  }
                } else if (isChosen) {
                  optStyle = 'bg-red-950 border-red-500 text-red-200';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl border text-sm cursor-pointer transition-all ${optStyle}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-bold text-white">{opt.userSpokenText}</p>
                          {isStepAnswered && (
                            <div className="mt-2.5 space-y-1.5">
                              <p className="text-xs text-slate-200 font-semibold">{opt.consequenceFeedback}</p>
                              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                                <span className="font-bold text-red-400">Phản hồi tiếp theo của tổng đài: </span>
                                "{opt.responseFromOfficial}"
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(opt.userSpokenText);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Step Navigation */}
            {isStepAnswered && currentStepIdx < selectedItem.branchingSteps.length - 1 && (
              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    setCurrentStepIdx((prev) => prev + 1);
                    setChosenOptionIdx(null);
                    setIsStepAnswered(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  Chuyển Sang Bước Tiếp Theo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Survival Checklist & Legal Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4" /> Checklist Sống Còn Khi Gặp Nạn:
              </span>
              <ul className="space-y-1.5">
                {selectedItem.survivalChecklist.map((chk, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{chk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Pháp Luật & Hệ Thống Công Quyền:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedItem.japanLegalSystemNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
