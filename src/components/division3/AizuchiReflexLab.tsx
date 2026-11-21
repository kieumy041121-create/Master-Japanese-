import React, { useState, useEffect, useRef } from 'react';
import { JLPTLevel } from '../../types';
import { AizuchiReflexItem } from '../../types/listeningSpeakingExtended';
import { initialAizuchiList, extraAizuchiList } from '../../data/listeningSpeakingExtendedDatabase';
import {
  MessageSquare,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PlusCircle,
  Sparkles,
  Timer,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  Award,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const AizuchiReflexLab: React.FC<Props> = ({ currentLevel = 'N2' }) => {
  const [items, setItems] = useState<AizuchiReflexItem[]>(initialAizuchiList);
  const [extraLoaded, setExtraLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<AizuchiReflexItem>(initialAizuchiList[0]);

  // 3-second reflex challenge timer
  const [countdown, setCountdown] = useState<number>(3);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isChallengeEnded, setIsChallengeEnded] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    handleResetChallenge();
  }, [selectedItem]);

  useEffect(() => {
    if (isCounting && countdown > 0) {
      timerRef.current = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsCounting(false);
            setIsChallengeEnded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCounting, countdown]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartChallenge = () => {
    setCountdown(3);
    setSelectedOptionIdx(null);
    setIsChallengeEnded(false);
    setIsCounting(true);
    speakText(selectedItem.speakerPrompt);
  };

  const handleSelectOption = (idx: number) => {
    if (isChallengeEnded && !isCounting) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setIsCounting(false);
    setSelectedOptionIdx(idx);
    setIsChallengeEnded(true);
    if (selectedItem.options[idx].isIdeal) {
      setScore((prev) => prev + 10);
    }
  };

  const handleResetChallenge = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsCounting(false);
    setCountdown(3);
    setSelectedOptionIdx(null);
    setIsChallengeEnded(false);
  };

  const handleLoadMore = () => {
    if (!extraLoaded) {
      setItems([...items, ...extraAizuchiList]);
      setExtraLoaded(true);
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedLevel === 'all') return true;
    return item.level === selectedLevel;
  });

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-fuchsia-950/80 via-slate-900 to-rose-950/80 border border-fuchsia-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              Chuyên Mục 90 · Lab Nghe Nói & Phản Xạ (PH3)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Phản Xạ Ứng Khẩu 3 Giây - Aizuchi & Đệm Từ Tự Nhiên
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono border border-fuchsia-500/30">
                相づち & Filler Reflex
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Xóa tan sự ngượng ngùng khi trò chuyện với người Nhật: Rèn luyện phản xạ bắn từ đệm trong 3 giây (Kashikomarimashita vs Naruhodo, thấu cảm Yorisoi, giữ nhịp đàm thoại đối tác).
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={handleLoadMore}
              disabled={extraLoaded}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${
                extraLoaded
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 text-white border border-fuchsia-400/30 hover:shadow-fuchsia-500/25'
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
                  ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/30'
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
            <span>Danh mục tình huống đối thoại</span>
            <span className="font-mono text-fuchsia-400">{filteredItems.length} ca giao tiếp</span>
          </div>
          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-fuchsia-950/70 border-fuchsia-500/70 shadow-lg shadow-fuchsia-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-fuchsia-900/60 text-fuchsia-300 border border-fuchsia-700/40">
                      {item.level}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {item.situationTypeName}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.speakerContext}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1 italic">
                    "{item.speakerPrompt}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Reflex Arena */}
        <div className="lg:col-span-8 space-y-5">
          {/* Challenge Timer Controller */}
          <div className="bg-slate-900/90 border border-fuchsia-800/40 rounded-2xl p-5 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 border transition-all ${
                  isCounting
                    ? 'bg-rose-950 border-rose-500 animate-pulse text-rose-400 shadow-lg shadow-rose-950/60'
                    : 'bg-slate-950 border-slate-800 text-fuchsia-400'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span className="text-xl font-mono font-black">{countdown}s</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 block">
                  Thử thách 3 Giây Phản Xạ:
                </span>
                <span className="text-xs text-slate-400">
                  {isCounting ? 'Đang đếm ngược! Bấm chọn câu ứng khẩu ngay!' : 'Bấm "Bắt Đầu" để nghe câu nói và phản xạ!'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleStartChallenge}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-fuchsia-600/30"
              >
                <Play className="w-4 h-4" />
                Bắt Đầu 3s
              </button>
              <button
                onClick={handleResetChallenge}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                title="Khởi động lại thử thách"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Speaker Scenario Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                {selectedItem.situationTypeName}
              </span>
              <button
                onClick={() => speakText(selectedItem.speakerPrompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fuchsia-950 border border-fuchsia-800 text-fuchsia-300 text-xs font-semibold hover:bg-fuchsia-900 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                Nghe Lại Lời Người Nói
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Bối cảnh: {selectedItem.speakerContext}
              </span>
              <p className="text-base md:text-lg font-bold text-white font-serif leading-relaxed">
                "{selectedItem.speakerPrompt}"
              </p>
              <p className="text-xs text-slate-400 italic">Dịch: {selectedItem.speakerPromptTranslation}</p>
            </div>

            {/* 3 Reflex Options */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Chọn câu Aizuchi / Đệm từ thích hợp nhất để tiếp lời:
              </p>
              {selectedItem.options.map((opt, idx) => {
                const isChosen = selectedOptionIdx === idx;
                let optStyle = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700';

                if (isChallengeEnded) {
                  if (opt.isIdeal) {
                    optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/50';
                  } else if (isChosen && !opt.isIdeal) {
                    optStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md shadow-rose-950/50';
                  }
                } else if (isChosen) {
                  optStyle = 'bg-fuchsia-950 border-fuchsia-500 text-fuchsia-200';
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
                          <p className="font-bold text-white">{opt.phrase}</p>
                          {isChallengeEnded && (
                            <p className="text-xs mt-2 text-slate-300 leading-relaxed">
                              {opt.feedback}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(opt.phrase);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 shrink-0"
                        title="Nghe phát âm phương án"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Taboo Warning */}
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-1.5 mt-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                Cảnh Báo Tối Kỵ Trong Giao Tiếp Người Nhật:
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">{selectedItem.socialTabooWarning}</p>
            </div>

            {/* Ideal Master Response Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-fuchsia-950/40 to-slate-900 border border-fuchsia-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-fuchsia-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Mẫu Câu Đẳng Cấp Thấu Cảm:
                </span>
                <button
                  onClick={() => speakText(selectedItem.idealAizuchi)}
                  className="text-xs text-fuchsia-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Nghe Mẫu
                </button>
              </div>
              <p className="text-sm font-black text-white font-serif">{selectedItem.idealAizuchi}</p>
              <p className="text-xs font-mono text-fuchsia-300/80">{selectedItem.idealRomaji}</p>
              <p className="text-xs text-slate-400 pt-1 border-t border-slate-800">
                Hiệu ứng tâm lý: {selectedItem.meaningAndEffect}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
