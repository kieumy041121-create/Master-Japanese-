import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { ReadingTrapItem } from '../../types/readingJlptExtended';
import { initialReadingTrapsList, extraReadingTrapsList } from '../../data/readingJlptExtendedDatabase';
import {
  ShieldAlert,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PlusCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  Eye,
  RotateCcw,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const ReadingTrapDeconstructLab: React.FC<Props> = ({ currentLevel = 'N2' }) => {
  const [items, setItems] = useState<ReadingTrapItem[]>(initialReadingTrapsList);
  const [extraLoaded, setExtraLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ReadingTrapItem>(initialReadingTrapsList[0]);
  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'deconstruct' | 'quiz' | 'strategy'>('deconstruct');

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLoadMore = () => {
    if (!extraLoaded) {
      setItems([...items, ...extraReadingTrapsList]);
      setExtraLoaded(true);
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedLevel === 'all') return true;
    return item.level === selectedLevel;
  });

  const handleSelectOption = (key: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionKey(key);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionKey) return;
    setIsAnswerSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedOptionKey(null);
    setIsAnswerSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              Chuyên Mục 86 · Đọc Hiểu & JLPT (PH2)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Bóc Tách Bẫy Logic & Luận Cứ Đọc Hiểu N2-N1
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                Logic Deconstruction
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Giải mã công thức cài cắm phương án nhiễu của đề thi JEES: Đảo ngược nhân quả, khái quát hóa cực đoan (すべて/必ず), chủ kiến tác giả vs trích dẫn khách quan, và chuỗi phủ định kép hàn lâm.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={handleLoadMore}
              disabled={extraLoaded}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${
                extraLoaded
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white border border-cyan-400/30 hover:shadow-cyan-500/25'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              {extraLoaded ? 'Đã Tải Đủ 10 Bài (+5 Đầy Đủ)' : 'Tải Thêm 5 Bài (+5)'}
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
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
              }`}
            >
              {lvl === 'all' ? `Tất Cả (${items.length})` : `${lvl} (${items.filter((i) => i.level === lvl).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Selector Strip & Detail Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List: Case Selection */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Danh sách chuyên đề bẫy đề thi</span>
            <span className="font-mono text-cyan-400">{filteredItems.length} ca phân tích</span>
          </div>
          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    handleResetQuiz();
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-500/70 shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700/40">
                      {item.level}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {item.trapTypeName}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.passageVietnamese}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Interactive Deconstruction & Simulator */}
        <div className="lg:col-span-8 space-y-5">
          {/* Top Mode Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('deconstruct')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'deconstruct'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Bóc Tách Văn Bản & Luận Cứ
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Phòng Thi Thử & Phá Bẫy
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'strategy'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              Bí Kíp Tránh Bẫy Đề Thi
            </button>
          </div>

          {/* TAB 1: DECONSTRUCTION */}
          {activeTab === 'deconstruct' && (
            <div className="space-y-5">
              {/* Japanese Passage with Speech */}
              <div className="bg-slate-900/90 border border-cyan-800/40 rounded-2xl p-6 shadow-xl relative">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {selectedItem.level} · Đọc hiểu thực chiến
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Dạng bẫy: {selectedItem.trapTypeName}</span>
                  </div>
                  <button
                    onClick={() => speakText(selectedItem.passageJapanese)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-700/60 text-cyan-300 text-xs font-semibold hover:bg-cyan-900/80 transition-all"
                    title="Nghe phát âm chuẩn văn bản"
                  >
                    <Volume2 className="w-4 h-4" />
                    Phát Âm Tiếng Nhật
                  </button>
                </div>

                <div className="text-base md:text-lg text-white font-serif leading-relaxed tracking-wide bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  {selectedItem.passageJapanese}
                </div>

                {/* Markers highlight */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Từ khóa bẻ lái logic:
                  </span>
                  {selectedItem.keyMarkers.map((marker, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium"
                    >
                      {marker}
                    </span>
                  ))}
                </div>

                {/* Vietnamese Translation */}
                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Dịch Nghĩa Văn Bản:</h5>
                  <p className="text-sm text-slate-300 leading-relaxed italic">{selectedItem.passageVietnamese}</p>
                </div>
              </div>

              {/* Author Thesis Target Box */}
              <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-600/40 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Luận Điểm Cốt Lõi Của Tác Giả (Trọng Tâm Bắt Buộc Tìm):
                </div>
                <p className="text-white text-sm md:text-base font-medium leading-relaxed">
                  {selectedItem.authorThesis}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: QUIZ & TRAP MATRIX */}
          {activeTab === 'quiz' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Câu hỏi: 筆者の考えと最も合致するものはどれか。
                </h4>
                <p className="text-xs text-slate-400">
                  (Phương án nào dưới đây phù hợp nhất với suy nghĩ cốt lõi của tác giả?)
                </p>
              </div>

              {/* 4 Choices */}
              <div className="space-y-3">
                {Object.entries(selectedItem.distractorTrapAnalysis).map(([key, opt]) => {
                  const isSelected = selectedOptionKey === key;
                  const showResult = isAnswerSubmitted;

                  let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-950/50';
                  if (isSelected && !showResult) {
                    borderClass = 'border-cyan-500 bg-cyan-950/40';
                  } else if (showResult) {
                    if (opt.isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-950/40 shadow-emerald-950/50';
                    } else if (isSelected && !opt.isCorrect) {
                      borderClass = 'border-rose-500 bg-rose-950/40 shadow-rose-950/50';
                    }
                  }

                  return (
                    <div
                      key={key}
                      onClick={() => handleSelectOption(key)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${borderClass}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-cyan-500 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {key.replace('option', '')}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium leading-relaxed">{opt.text}</p>
                          {showResult && (
                            <div
                              className={`mt-2.5 p-3 rounded-lg text-xs leading-relaxed border ${
                                opt.isCorrect
                                  ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                                  : 'bg-rose-950/60 border-rose-800 text-rose-300'
                              }`}
                            >
                              <div className="font-bold flex items-center gap-1.5 mb-1">
                                {opt.isCorrect ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5" /> ĐÁP ÁN CHÍNH XÁC
                                  </>
                                ) : (
                                  <>
                                    <AlertTriangle className="w-3.5 h-3.5" /> BẪY ĐỀ THI
                                  </>
                                )}
                              </div>
                              {opt.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Làm Lại Câu Này
                </button>

                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOptionKey}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${
                      selectedOptionKey
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Kiểm Tra Bẫy Đề Thi
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="text-xs font-semibold text-cyan-400">
                    Đã hiển thị phân tích bẫy chi tiết từng phương án!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: STRATEGIC INSIGHT */}
          {activeTab === 'strategy' && (
            <div className="space-y-4">
              <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-3">
                  <Lightbulb className="w-5 h-5" />
                  Mẹo Nhận Diện Bẫy Đề Thi N2/N1:
                </div>
                <p className="text-sm text-slate-200 leading-relaxed bg-amber-950/20 p-4 rounded-xl border border-amber-900/40">
                  {selectedItem.strategicTip}
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-3">
                  <Eye className="w-5 h-5" />
                  Bóc Tách Tâm Lý Người Ra Đề JEES:
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedItem.detailedAnalysis}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
