import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { speechService } from '../../services/speechService';
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, Volume2, ArrowRight } from 'lucide-react';

interface QuizCardProps {
  quiz: QuizQuestion;
  title?: string;
  onAnswerSubmit?: (isCorrect: boolean) => void;
  onNext?: () => void;
  nextLabel?: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  title = 'Bài tập trắc nghiệm thực chiến',
  onAnswerSubmit,
  onNext,
  nextLabel = 'Câu tiếp theo',
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const chosen = quiz.options.find((o) => o.id === optionId);
    const isCorrect = !!chosen?.isCorrect;

    if (isCorrect) {
      speechService.playSuccessSound();
    } else {
      speechService.playErrorSound();
    }

    if (onAnswerSubmit) {
      onAnswerSubmit(isCorrect);
    }
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    if (onNext) onNext();
  };

  const chosenOption = quiz.options.find((o) => o.id === selectedOptionId);
  const correctOption = quiz.options.find((o) => o.isCorrect);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 md:p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="text-xs font-semibold text-indigo-400 tracking-wide uppercase">
          {title}
        </div>
        <button
          onClick={() => speechService.speak(quiz.question)}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-300 transition-colors cursor-pointer"
          title="Đọc câu hỏi tiếng Nhật"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Nghe câu hỏi</span>
        </button>
      </div>

      <div className="text-slate-100 font-medium text-base md:text-lg mb-2 leading-relaxed whitespace-pre-line">
        {quiz.question}
      </div>

      {quiz.subText && (
        <div className="text-sm text-slate-400 mb-4 italic">
          {quiz.subText}
        </div>
      )}

      {/* Options list */}
      <div className="space-y-2.5 my-4">
        {quiz.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          let btnStyle = 'border-slate-800 bg-slate-950/60 text-slate-200 hover:border-slate-700 hover:bg-slate-800/40';

          if (isAnswered) {
            if (option.isCorrect) {
              btnStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200';
            } else if (isSelected && !option.isCorrect) {
              btnStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200';
            } else {
              btnStyle = 'border-slate-800/50 bg-slate-950/30 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={isAnswered}
              className={`w-full text-left p-3.5 rounded-lg border transition-all text-sm md:text-base flex items-start gap-3 cursor-pointer ${btnStyle}`}
            >
              <span className="w-6 h-6 rounded-md bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 leading-snug">{option.text}</span>
              {isAnswered && option.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isAnswered && isSelected && !option.isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer & In-depth Explanation section */}
      {isAnswered && (
        <div className="mt-5 pt-4 border-t border-slate-800 space-y-3.5 animate-fadeIn">
          {/* Result Banner */}
          <div className="flex items-center gap-2">
            {chosenOption?.isCorrect ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Chính xác! Đáp án đúng là {correctOption?.text}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Chưa đúng! Đáp án chính xác là: {correctOption?.text}</span>
              </div>
            )}
          </div>

          {/* Lời giải siêu chi tiết */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 text-xs md:text-sm text-slate-300 space-y-1.5">
            <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
              <span>Lời giải bóc tách chi tiết:</span>
            </div>
            <p className="leading-relaxed text-slate-300">{quiz.correctExplanation}</p>
          </div>

          {/* Bẫy logic JEES / Lỗi hay gặp */}
          {quiz.trapAnalysis && (
            <div className="bg-amber-950/20 border border-amber-900/40 rounded-lg p-3.5 text-xs md:text-sm text-amber-200/90 space-y-1">
              <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Bẫy logic JEES / Cạm bẫy tư duy:</span>
              </div>
              <p className="leading-relaxed text-amber-100/80">{quiz.trapAnalysis}</p>
            </div>
          )}

          {/* Mẹo nhớ nhanh / Mnemonics */}
          {quiz.mnemonicTip && (
            <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-lg p-3.5 text-xs md:text-sm text-indigo-200/90 space-y-1">
              <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 shrink-0 text-amber-300" />
                <span>Mẹo ghi nhớ thần tốc (Mnemonic):</span>
              </div>
              <p className="leading-relaxed text-slate-200">{quiz.mnemonicTip}</p>
            </div>
          )}

          {onNext && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                <span>{nextLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
