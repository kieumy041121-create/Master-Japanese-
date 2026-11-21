import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { JlptChokkaiItem } from '../../types/listeningSpeakingExtended';
import { initialJlptChokkaiList, extraJlptChokkaiList } from '../../data/listeningSpeakingExtendedDatabase';
import {
  Headphones,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PlusCircle,
  Sparkles,
  Edit3,
  RotateCcw,
  Compass,
  ArrowRight,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  BookOpen,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const JlptChokkaiSokkaiLab: React.FC<Props> = ({ currentLevel = 'N2' }) => {
  const [items, setItems] = useState<JlptChokkaiItem[]>(initialJlptChokkaiList);
  const [extraLoaded, setExtraLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<JlptChokkaiItem>(initialJlptChokkaiList[0]);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userNotes, setUserNotes] = useState<string>('');
  const [showScript, setShowScript] = useState<boolean>(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlayFullAudio = () => {
    const fullDialogue = selectedItem.audioDialogueScript
      .map((s) => `${s.speaker}: ${s.text}`)
      .join('。 ');
    speakText(`${fullDialogue}。 ${selectedItem.questionAudioText}`);
  };

  const [loadCount, setLoadCount] = useState<number>(0);

  const handleLoadMoreFive = () => {
    const timestamp = Date.now();
    const sourceList = extraJlptChokkaiList.length > 0 ? extraJlptChokkaiList : initialJlptChokkaiList;
    const batch: JlptChokkaiItem[] = Array.from({ length: 5 }).map((_, idx) => {
      const base = sourceList[(loadCount * 5 + idx) % sourceList.length];
      return {
        ...base,
        id: `chokkai_inf_${timestamp}_${loadCount + 1}_${idx + 1}`,
        title: `${base.title} [Luyện tập tăng cường #${loadCount * 5 + idx + 1}]`,
      };
    });
    setItems((prev) => [...prev, ...batch]);
    setLoadCount((prev) => prev + 1);
    setSelectedItem(batch[0]);
    handleReset();
  };

  const filteredItems = items.filter((item) => {
    if (selectedLevel === 'all') return true;
    return item.level === selectedLevel;
  });

  const currentIdx = filteredItems.findIndex((it) => it.id === selectedItem.id);

  const handlePrevItem = () => {
    if (filteredItems.length === 0) return;
    const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIdx]);
    handleReset();
  };

  const handleNextItem = () => {
    if (filteredItems.length === 0) return;
    const nextIdx = (currentIdx + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIdx]);
    handleReset();
  };

  const handleReset = () => {
    setSelectedChoiceIdx(null);
    setIsAnswerSubmitted(false);
    setUserNotes('');
    setShowScript(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border border-sky-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Headphones className="w-3.5 h-3.5" />
              Chuyên Mục 91 · Lab Nghe Nói & Phản Xạ (PH3)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Phòng Luyện Nghe Đề JLPT Chuyên Sâu: Mondai 4 & Mondai 5
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono border border-sky-500/30">
                即時応答 & 統合理解
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Chinh phục 2 dạng bài khó nhằn và chiếm điểm cao nhất trong phần thi Nghe hiểu JLPT: Phản xạ tức thì không có chữ in (Mondai 4) và Hội thoại đa nhân vật kèm ma trận lọc tiêu chí (Mondai 5).
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={handleLoadMoreFive}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white border border-sky-400/30 hover:shadow-sky-500/25 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tải Thêm 5 Đề (+5)</span>
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
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
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
            <span>Danh sách đề thi nghe</span>
            <span className="font-mono text-sky-400">{filteredItems.length} đề thi</span>
          </div>
          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    handleReset();
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-sky-950/70 border-sky-500/70 shadow-lg shadow-sky-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-900/60 text-sky-300 border border-sky-700/40">
                      {item.level}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {item.questionTypeName.split(':')[0]}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.scenarioDescription}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Listening Test Simulator & Scratchpad */}
        <div className="lg:col-span-8 space-y-5">
          {/* Top Stepper Navigation Bar: [← Bài trước] [X / Y] [Bài tiếp theo →] + [➕ Tải thêm 5 cái] */}
          <div className="p-2.5 sm:p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-2.5 shadow-lg">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevItem}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Xem bài nghe trước đó"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Bài trước</span>
              </button>
              <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-sky-400 font-bold">
                {currentIdx + 1} / {filteredItems.length}
              </div>
              <button
                onClick={handleNextItem}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md shadow-sky-900/30"
                title="Xem bài nghe tiếp theo"
              >
                <span>Bài tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleLoadMoreFive}
              className="px-3.5 py-1.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
              title="Tải thêm 5 đề luyện thi nghe Mondai 4 & 5 mới tức thì"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Tải thêm 5 cái</span>
            </button>
          </div>

          {/* Audio Console Bar */}
          <div className="bg-slate-900/90 border border-sky-800/40 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayFullAudio}
                className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 transition-all shrink-0"
                title="Phát toàn bộ bài nghe"
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block">
                  Trình Phát Bài Nghe Mô Phỏng:
                </span>
                <span className="text-sm font-bold text-white">{selectedItem.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowScript(!showScript)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
              >
                {showScript ? 'Ẩn Lời Thoại (Script)' : 'Xem Lời Thoại (Script)'}
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                title="Làm lại đề này"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Transcript / Dialogue Display */}
          {showScript && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Văn Bản Lời Thoại (Audio Script):
              </h4>
              <div className="space-y-2.5">
                {selectedItem.audioDialogueScript.map((line, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-sky-300 font-mono">{line.speaker}:</span>
                      <button
                        onClick={() => speakText(line.text)}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" /> Nghe đoạn này
                      </button>
                    </div>
                    <p className="text-sm text-white font-serif">{line.text}</p>
                    <p className="text-xs text-slate-400 italic mt-1">{line.translation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scratchpad note area for Mondai 5 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                Sổ tay nháp (Note-taking Scratchpad) - Kỹ thuật sống còn Mondai 5:
              </span>
              <button
                onClick={() => setUserNotes('')}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                Xóa nháp
              </button>
            </div>
            <textarea
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Ghi chú nhanh các tiêu chí: Gói A (server ngoại loại), Gói B (8 vạn, trong nước ok), Gói C (vượt 10 vạn loại)..."
              className="w-full h-20 bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono resize-none"
            />
          </div>

          {/* Question & Choices Arena */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Câu Hỏi Đề Thi (Phát Bằng Âm Thanh):
              </span>
              <p className="text-sm font-bold text-white flex items-center justify-between">
                <span>{selectedItem.questionAudioText}</span>
                <button
                  onClick={() => speakText(selectedItem.questionAudioText)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </p>
              <p className="text-xs text-slate-400 italic mt-1">{selectedItem.questionTranslation}</p>
            </div>

            {/* Choices */}
            <div className="space-y-3">
              {selectedItem.choices.map((choice) => {
                const isChosen = selectedChoiceIdx === choice.index;
                let choiceStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                if (isAnswerSubmitted) {
                  if (choice.isCorrect) {
                    choiceStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/50';
                  } else if (isChosen && !choice.isCorrect) {
                    choiceStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md shadow-rose-950/50';
                  }
                } else if (isChosen) {
                  choiceStyle = 'bg-sky-950 border-sky-500 text-sky-200';
                }

                return (
                  <div
                    key={choice.index}
                    onClick={() => !isAnswerSubmitted && setSelectedChoiceIdx(choice.index)}
                    className={`p-4 rounded-xl border text-sm cursor-pointer transition-all ${choiceStyle}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {choice.index}
                        </span>
                        <div>
                          <p className="font-semibold text-white">{choice.text}</p>
                          {isAnswerSubmitted && (
                            <p className="text-xs mt-2 text-slate-300 leading-relaxed">
                              {choice.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(choice.text);
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

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {!isAnswerSubmitted ? (
                <button
                  onClick={() => setIsAnswerSubmitted(true)}
                  disabled={selectedChoiceIdx === null}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                    selectedChoiceIdx !== null
                      ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Nộp Bài & Phân Tích Bẫy
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Đã mở lời giải chi tiết và phân tích bẫy nghe!
                </div>
              )}
            </div>

            {/* Strategy & Key Catchphrase */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/40 to-slate-900 border border-sky-800/40 space-y-2 mt-4">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                Chiến Thuật Bắt Từ Khóa Vàng (Catchphrase):
              </div>
              <p className="text-sm font-bold text-white font-mono bg-slate-950 p-2.5 rounded border border-slate-800">
                {selectedItem.keyCatchPhrase}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedItem.listeningStrategy}</p>
            </div>

            {/* MỤC GIẢI THÍCH CHUYÊN SÂU & BẪY PHẢN XẠ SOKKAI */}
            <div className="p-4 bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Mục giải thích chuyên sâu & Phân tích bẫy phản xạ Sokkai</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-rose-400 font-semibold flex items-center gap-1">
                    <span>⚠️ Bẫy tâm lý Mondai 4:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Đề thi Mondai 4 không in câu hỏi lên giấy và mỗi đáp án chỉ đọc 1 lần. Thí sinh thường bị cuốn vào việc dịch từng từ thay vì phản xạ theo mẫu câu đàm thoại cố định (Kuroi-aizuchi / Aizuchi phản biện).
                  </p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-emerald-300 font-semibold flex items-center gap-1">
                    <span>💡 Chiến thuật Mondai 5 (Tổng hợp):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Vẽ ngay bảng ma trận 4 góc nháp (Phương án A, B, C, D) và tick vào các điều kiện loại trừ ngay khi nhân vật A hoặc B phát biểu ý kiến từ chối.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Stepper Navigation Bar: [← Bài trước] [X / Y] [Bài tiếp theo →] + [➕ Tải thêm 5 cái] */}
            <div className="pt-4 border-t border-slate-800/80 p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevItem}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Xem bài nghe trước đó"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Bài trước</span>
                </button>
                <div className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-sky-400 font-bold">
                  {currentIdx + 1} / {filteredItems.length}
                </div>
                <button
                  onClick={handleNextItem}
                  className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md shadow-sky-900/30"
                  title="Xem bài nghe tiếp theo"
                >
                  <span>Bài tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleLoadMoreFive}
                className="px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
                title="Tải thêm 5 đề luyện thi nghe Mondai 4 & 5 mới tức thì"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Tải thêm 5 cái ({filteredItems.length})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
