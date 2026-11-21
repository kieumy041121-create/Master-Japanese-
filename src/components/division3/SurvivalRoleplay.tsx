import React, { useState } from 'react';
import { RoleplayScenario } from '../../types';
import { initialRoleplayScenarios } from '../../data/initialData';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { Users, AlertCircle, RefreshCw, Volume2, ShieldCheck, Sparkles, Lightbulb, CheckCircle2, XCircle } from 'lucide-react';

export const SurvivalRoleplay: React.FC = () => {
  const [scenarios, setScenarios] = useState<RoleplayScenario[]>(initialRoleplayScenarios);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentEventText, setCurrentEventText] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isGeneratingEvent, setIsGeneratingEvent] = useState<boolean>(false);

  const currentScenario = scenarios[currentIndex % scenarios.length];

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    const chosen = currentScenario.options.find((o) => o.id === optId);
    if (chosen?.isPoliteAndEffective) {
      speechService.playSuccessSound();
    } else {
      speechService.playErrorSound();
    }
  };

  // Button "Tải nạp thêm biến cố"
  const handleTriggerSuddenEvent = async () => {
    setIsGeneratingEvent(true);
    try {
      const prompt = `
Bạn là AI đạo diễn tình huống đóng vai giao tiếp tiếng Nhật.
Bối cảnh hiện tại: "${currentScenario.title}" (${currentScenario.setting}).
Nhân vật: ${currentScenario.characterName} (${currentScenario.characterRole}).
Hãy sinh ra 1 BIẾN CỐ BẤT NGỜ (Sudden twist / Crisis event) cực kỳ hóc búa, ép người học phải suy nghĩ nhanh cách ứng xử văn hóa Nhật để gỡ rối.
Kèm câu thoại bất ngờ của nhân vật bằng tiếng Nhật và dịch nghĩa.
Trả về định dạng JSON:
{
  "event": "mô tả biến cố éo le bằng tiếng Việt",
  "characterSpeech": "lời thoại giận dữ hoặc thử thách bằng tiếng Nhật",
  "speechTranslation": "dịch lời thoại"
}
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = safeExtractJson<{ event?: string; characterSpeech?: string; speechTranslation?: string } | null>(res, null);
      if (parsed && parsed.characterSpeech) {
        const eventMsg = `[BIẾN CỐ MỚI]: ${parsed.event || 'Tình huống bất ngờ'}\n👉 ${currentScenario.characterName}: 「${parsed.characterSpeech}」(${parsed.speechTranslation || ''})`;
        setCurrentEventText(eventMsg);
        speechService.speak(parsed.characterSpeech);
      } else {
        throw new Error('Dữ liệu JSON không hợp lệ');
      }
    } catch {
      const fallbackEvent = currentScenario.suddenEvents[Math.floor(Math.random() * currentScenario.suddenEvents.length)];
      setCurrentEventText(`[BIẾN CỐ MỚI]: ${fallbackEvent}`);
      speechService.playErrorSound();
    } finally {
      setIsGeneratingEvent(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % scenarios.length);
    setCurrentEventText(null);
    setSelectedOptionId(null);
  };

  const chosenOption = currentScenario.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>AI Roleplay Sinh tồn Đa nhánh</span>
            <span className="text-xs font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>Phỏng vấn · Nomikai · Xử lý khủng hoảng</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Nhập vai tình huống sinh tồn giao tiếp. Nút "Tải nạp thêm biến cố" ép AI sinh ra rắc rối bất ngờ để thử thách phản xạ.
          </p>
        </div>

        <button
          onClick={handleTriggerSuddenEvent}
          disabled={isGeneratingEvent}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-lg text-xs md:text-sm font-semibold transition-all shadow-md cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
        >
          <AlertCircle className={`w-4 h-4 ${isGeneratingEvent ? 'animate-spin' : ''}`} />
          <span>{isGeneratingEvent ? 'AI đang tạo biến cố...' : 'Tải nạp thêm biến cố!'}</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
          {/* Situation Title & Setting */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
            <span className="font-semibold text-rose-400">{currentScenario.setting}</span>
            <span className="text-slate-500">Tình huống {currentIndex + 1} / {scenarios.length}</span>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
              {currentScenario.title}
            </h3>
            <div className="text-xs text-slate-400 mt-1">
              Đối tượng đối thoại: <span className="text-slate-200 font-semibold">{currentScenario.characterName}</span> ({currentScenario.characterRole})
            </div>
          </div>

          {/* NPC Dialogue Bubble */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 relative space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 font-jp">
                {currentScenario.characterName}:
              </span>
              <button
                onClick={() => speechService.speak(currentScenario.initialMessage)}
                className="text-slate-400 hover:text-rose-300 cursor-pointer p-1"
                title="Nghe giọng NPC"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="text-base md:text-lg font-jp text-slate-100 font-medium leading-relaxed">
              「{currentScenario.initialMessage}」
            </div>
          </div>

          {/* Sudden Event Warning Alert (If triggered) */}
          {currentEventText && (
            <div className="bg-rose-950/30 border-2 border-rose-600/80 p-4 rounded-xl text-xs md:text-sm text-rose-200 space-y-1.5 animate-bounce-subtle">
              <div className="font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wide">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>CẢNH BÁO: TÌNH HUỐNG PHÁT SINH BẤT NGỜ!</span>
              </div>
              <p className="leading-relaxed whitespace-pre-line text-white font-medium">{currentEventText}</p>
            </div>
          )}

          {/* Multiple choice decision branches */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-semibold text-slate-300">
              Bạn sẽ ứng đáp như thế nào để xử lý tình huống hợp lý nhất theo văn hóa Nhật?
            </div>
            <div className="space-y-2.5">
              {currentScenario.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let btnClass = 'border-slate-800 bg-slate-950/60 text-slate-200 hover:border-slate-700';

                if (selectedOptionId) {
                  if (opt.isPoliteAndEffective) {
                    btnClass = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-100';
                  } else if (isSelected && !opt.isPoliteAndEffective) {
                    btnClass = 'border-rose-500/80 bg-rose-950/40 text-rose-100';
                  } else {
                    btnClass = 'border-slate-800/40 bg-slate-950/20 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={!!selectedOptionId}
                    className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm font-jp leading-relaxed cursor-pointer transition-all flex items-start justify-between gap-3 ${btnClass}`}
                  >
                    <span>{opt.text}</span>
                    {selectedOptionId && opt.isPoliteAndEffective && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {selectedOptionId && isSelected && !opt.isPoliteAndEffective && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cultural Feedback & Senpai Survival Tip */}
          {chosenOption && (
            <div className="space-y-3 pt-4 border-t border-slate-800 animate-fadeIn">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
                <div className="font-semibold text-indigo-300">Phân tích phản ứng tâm lý người Nhật:</div>
                <p className="leading-relaxed">{chosenOption.culturalFeedback}</p>
              </div>

              <div className="bg-amber-950/20 border border-amber-900/30 p-3.5 rounded-xl text-xs text-amber-200/90 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300">Mẹo sinh tồn của Senpai: </span>
                  <span>{chosenOption.senpaiTip}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Kịch bản tiếp theo →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
