import React, { useState, useEffect } from 'react';
import {
  Target,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Award,
  Zap,
  Activity,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import {
  JlptAdaptiveQuestion,
  generateAdaptiveJlptExam
} from '../../services/aiSenseiSuperEnginesService';
import { speechService } from '../../services/speechService';
import { JLPTLevel } from '../../types';

export const AiSenseiAdaptiveJlptTab: React.FC<{ initialLevel?: JLPTLevel }> = ({ initialLevel = 'N1' }) => {
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>(initialLevel);
  const [questions, setQuestions] = useState<JlptAdaptiveQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const fetchExam = async (lvl: JLPTLevel) => {
    setIsLoading(true);
    setIsSubmitted(false);
    setUserAnswers({});
    setTimerSeconds(0);
    setIsTimerActive(true);
    try {
      const qList = await generateAdaptiveJlptExam(lvl);
      setQuestions(qList);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExam(selectedLevel);
  }, [selectedLevel]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && !isSubmitted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isSubmitted]);

  const handleSelectOption = (questionId: string, optionId: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setIsTimerActive(false);
    speechService.playSuccessSound();
  };

  // Calculate score & pinpoint weaknesses
  const totalCount = questions.length;
  const correctCount = questions.filter((q) => {
    const chosen = userAnswers[q.id];
    const correctOpt = q.options.find((o) => o.isCorrect);
    return chosen === correctOpt?.id;
  }).length;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border border-rose-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎯</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Lò Luyện JLPT Độc Bản &amp; Nắn Chỉnh Lỗ Hổng
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Sinh đề thi mới 100% bám sát ma trận đề thi JEES. Chụp X-Quang lỗ hổng trí mạng và tiêm liều thuốc vá lỗi tức thì.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Level Selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-rose-300">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(timerSeconds)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Questions List */}
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Sparkles className="w-8 h-8 animate-spin text-rose-400" />
            <span className="text-sm text-slate-300">Đang khởi tạo bộ đề JLPT {selectedLevel} độc bản...</span>
          </div>
        ) : (
          questions.map((q, qIndex) => {
            const chosenId = userAnswers[q.id];
            const correctOpt = q.options.find((o) => o.isCorrect);
            const isCorrect = chosenId === correctOpt?.id;

            return (
              <div
                key={q.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/60">
                      Câu {qIndex + 1} · {q.level}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {q.questionType === 'star_problem' ? '★ Bài điền dấu sao' : 'Ngữ pháp & Từ vựng'}
                    </span>
                  </div>

                  {isSubmitted && (
                    <div className="flex items-center gap-1 text-xs font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Chính xác
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Mắc bẫy JEES
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-sm sm:text-base font-bold text-white font-japanese leading-relaxed">
                  {q.prompt}
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => {
                    const isSelected = chosenId === opt.id;
                    let optionStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200';

                    if (isSubmitted) {
                      if (opt.isCorrect) {
                        optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !opt.isCorrect) {
                        optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold line-through';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-rose-950/70 border-rose-500 text-white font-bold shadow-md';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 text-xs sm:text-sm ${optionStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-800/80 flex items-center justify-center text-xs font-bold shrink-0">
                          {opt.id}
                        </span>
                        <span className="font-japanese leading-normal">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Post-submit Trap Explanation */}
                {isSubmitted && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Giải mã bẫy JEES: {q.explanation.targetedTopic}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{q.explanation.correctReason}</p>
                    <div className="text-rose-300 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/40">
                      ⚠️ {q.explanation.trapAnalysis}
                    </div>
                    <div className="text-amber-300 font-semibold pt-1">
                      💡 Chìa khóa: {q.explanation.coreKnowledgeKey}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Submit / Action Bar */}
      {!isLoading && questions.length > 0 && !isSubmitted && (
        <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="text-xs text-slate-300">
            Đã làm: <span className="font-bold text-rose-400">{Object.keys(userAnswers).length}</span> / {totalCount} câu
          </div>

          <button
            type="button"
            onClick={handleSubmitExam}
            disabled={Object.keys(userAnswers).length === 0}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-rose-950 disabled:opacity-40 cursor-pointer"
          >
            Nộp Bài &amp; Kích Hoạt Chụp X-Quang Lỗ Hổng
          </button>
        </div>
      )}

      {/* Weakness X-Ray Report */}
      {isSubmitted && (
        <div className="bg-slate-900/90 border border-rose-900/50 rounded-2xl p-5 space-y-4 shadow-2xl animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-400" />
              <span>Chẩn Đoán X-Quang Lỗ Hổng Kiến Thức (Weakness X-Ray)</span>
            </h4>
            <div className="text-sm font-bold text-rose-300">
              Kết quả: {correctCount} / {totalCount} ({Math.round((correctCount / totalCount) * 100)}%)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Điểm yếu trí mạng phát hiện:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {correctCount === totalCount
                  ? 'Tuyệt vời! Bạn đã vượt qua toàn bộ các bẫy tâm lý của JEES ở cấp độ này.'
                  : 'Phát hiện sự nhầm lẫn giữa cấu trúc nêu căn cứ trực tiếp và suy luận gián tiếp. Bạn có xu hướng bị phương án nhiễu dẫn dụ khi câu có yếu tố cảm xúc.'}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>Liều thuốc trợ lực tiêm thẳng:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Ghi nhớ quy tắc: Cứ có chứng cứ vật chất cụ thể (dấu vân tay, nét mặt, số liệu) thì 100% chọn 「〜からして」 thay vì các cấu trúc phỏng đoán lỏng lẻo.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => fetchExam(selectedLevel)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Luyện Thêm Đề Mới Khác</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
