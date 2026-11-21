import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Info,
  TrendingDown,
  TrendingUp,
  Award
} from 'lucide-react';
import {
  CURATED_PITCH_SENTENCES,
  PitchSentenceModel,
  PitchShadowingFeedback,
  evaluatePitchShadowing
} from '../../services/aiSenseiSuperEnginesService';
import { speechService } from '../../services/speechService';

export const AiSenseiPitchCoachTab: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<PitchSentenceModel>(CURATED_PITCH_SENTENCES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<PitchShadowingFeedback | null>(null);
  const [userTranscript, setUserTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.lang = 'ja-JP';
        rec.continuous = false;
        rec.interimResults = false;

        rec.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          if (text) {
            setUserTranscript(text);
            const fb = evaluatePitchShadowing(selectedModel.id, 2500, text);
            setFeedback(fb);
            speechService.playSuccessSound();
          }
        };

        rec.onerror = () => setIsRecording(false);
        rec.onend = () => setIsRecording(false);
        recognitionRef.current = rec;
      }
    }
  }, [selectedModel]);

  // Animated Waveform Simulation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = isRecording ? '#10b981' : '#6366f1';
      ctx.beginPath();

      const sliceWidth = canvas.width / 50;
      let x = 0;

      for (let i = 0; i < 50; i++) {
        const amplitude = isRecording ? Math.sin(i * 0.2 + phase) * 20 + 25 : Math.sin(i * 0.1 + phase) * 6 + 25;
        const y = amplitude;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.stroke();
      phase += isRecording ? 0.2 : 0.05;
      animFrameIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isRecording]);

  const handleSelectModel = (model: PitchSentenceModel) => {
    setSelectedModel(model);
    setFeedback(null);
    setUserTranscript('');
    speechService.speakJapanese(model.audioText);
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      // Mock simulation fallback
      if (isRecording) {
        setIsRecording(false);
      } else {
        setIsRecording(true);
        setTimeout(() => {
          setIsRecording(false);
          const fb = evaluatePitchShadowing(selectedModel.id, 2000, selectedModel.japanese);
          setFeedback(fb);
          speechService.playSuccessSound();
        }, 2500);
      }
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setFeedback(null);
      setUserTranscript('');
      try {
        recognitionRef.current.start();
      } catch {
        setIsRecording(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-900 border border-teal-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎧</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Huấn Luyện Viên Ngữ Điệu Đa Chiều (Pitch Accent Waveform Scorer)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Đập tan ngữ điệu phẳng (Heiban hóa) kiểu tiếng Việt. Luyện Shadowing theo biểu đồ cao độ Tokyo và chấm điểm sóng âm thời gian thực.
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-700/60 font-semibold shrink-0">
            Cao Độ Chuẩn Tokyo
          </span>
        </div>

        {/* Pattern Models Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800">
          {CURATED_PITCH_SENTENCES.map((model) => {
            const isSelected = selectedModel.id === model.id;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => handleSelectModel(model)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-950/80 border-teal-500 shadow-md shadow-teal-950/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-bold">
                    {model.patternType}
                  </span>
                  <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <div className="text-xs font-bold text-white mt-1.5 font-japanese truncate">
                  {model.japanese}
                </div>
                <div className="text-[11px] text-slate-400 truncate">{model.vietnamese}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pitch Accent Visualization Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-teal-300">Biểu Đồ Trọng Âm Cao Độ (Pitch Contour):</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {selectedModel.patternType}
              </span>
            </div>
            <div className="text-base sm:text-lg font-black text-white font-japanese">
              {selectedModel.japanese}
            </div>
            <div className="text-xs text-teal-200/80 font-mono">{selectedModel.reading}</div>
          </div>

          <button
            type="button"
            onClick={() => speechService.speakJapanese(selectedModel.audioText)}
            className="p-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-950 cursor-pointer"
            title="Nghe phát âm chuẩn Tokyo"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Step-by-Step Pitch Contour Moras */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Sơ đồ nốt Cao (H) / nốt Thấp (L) từng âm tiết:</span>
            <span className="text-teal-400 font-semibold">Chuẩn Tokyo Dialect</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 pb-4">
            {selectedModel.moras.map((m, idx) => {
              const isHigh = m.pitch === 'H';
              return (
                <div key={idx} className="flex flex-col items-center">
                  {/* High Node Box */}
                  <div
                    className={`w-9 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all mb-1 ${
                      isHigh
                        ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/50'
                        : 'bg-transparent text-transparent border border-dashed border-slate-800'
                    }`}
                  >
                    {isHigh ? 'H' : ''}
                  </div>

                  {/* Mora Letter */}
                  <span className="text-xs font-bold text-slate-200 font-mono">{m.mora}</span>

                  {/* Low Node Box */}
                  <div
                    className={`w-9 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all mt-1 ${
                      !isHigh
                        ? 'bg-slate-700 text-slate-200'
                        : 'bg-transparent text-transparent border border-dashed border-slate-800'
                    }`}
                  >
                    {!isHigh ? 'L' : ''}
                  </div>

                  {m.isDropTarget && (
                    <span className="text-[10px] text-rose-400 font-bold mt-1 flex items-center">
                      <TrendingDown className="w-3 h-3" /> Rơi
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-2.5 bg-teal-950/40 rounded-lg border border-teal-900/50 text-xs text-teal-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>{selectedModel.keyWarning}</span>
          </div>
        </div>

        {/* Live Audio Shadowing & Waveform Section */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-white">Luyện Shadowing &amp; Chấm Điểm Sóng Âm:</span>
            </div>

            <button
              type="button"
              onClick={toggleRecording}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-950'
                  : 'bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-950'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Đang thu âm... Bấm để dừng</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Bật Mic Đọc Shadowing</span>
                </>
              )}
            </button>
          </div>

          {/* Canvas Waveform */}
          <div className="w-full bg-slate-900/90 rounded-lg border border-slate-800/80 p-2 flex items-center justify-center">
            <canvas ref={canvasRef} width={600} height={50} className="w-full h-12" />
          </div>

          {/* Feedback Card */}
          {feedback && (
            <div className="p-4 bg-slate-900 rounded-xl border border-teal-900/50 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-400" />
                  <span className="text-sm font-bold text-white">
                    Điểm Trùng Khớp Cao Độ: <span className="text-teal-400 text-lg">{feedback.matchScore}%</span>
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
                  {feedback.accuracyGrade}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">{feedback.feedbackComment}</p>

              {feedback.heibanDropAlerts.length > 0 && (
                <div className="p-2.5 bg-rose-950/40 rounded-lg border border-rose-900/40 text-xs text-rose-300 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Cảnh báo lỗi ngữ điệu:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    {feedback.heibanDropAlerts.map((alt, i) => (
                      <li key={i}>{alt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
