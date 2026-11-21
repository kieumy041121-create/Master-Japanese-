import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Send,
  Target,
  MessageSquare,
  Award,
  Zap,
  Info
} from 'lucide-react';
import {
  CURATED_ROLEPLAY_SCENARIOS,
  RoleplayScenario,
  LiveSpokenFeedback,
  evaluateLiveSpokenInput
} from '../../services/aiSenseiSuperEnginesService';
import { speechService } from '../../services/speechService';

export const AiSenseiVoiceRoleplayTab: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<RoleplayScenario>(CURATED_ROLEPLAY_SCENARIOS[0]);
  const [conversation, setConversation] = useState<{ role: 'user' | 'npc'; text: string; furigana?: string; romaji?: string; vietnamese?: string }[]>([
    {
      role: 'npc',
      text: CURATED_ROLEPLAY_SCENARIOS[0].initialMessage.japanese,
      furigana: CURATED_ROLEPLAY_SCENARIOS[0].initialMessage.furigana,
      romaji: CURATED_ROLEPLAY_SCENARIOS[0].initialMessage.romaji,
      vietnamese: CURATED_ROLEPLAY_SCENARIOS[0].initialMessage.vietnamese
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [liveFeedback, setLiveFeedback] = useState<LiveSpokenFeedback | null>(null);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Web Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ja-JP';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputText(transcript);
            handleSubmitSpeech(transcript);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [selectedScenario, conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, isEvaluating]);

  const handleSelectScenario = (scen: RoleplayScenario) => {
    setSelectedScenario(scen);
    setLiveFeedback(null);
    setInputText('');
    setConversation([
      {
        role: 'npc',
        text: scen.initialMessage.japanese,
        furigana: scen.initialMessage.furigana,
        romaji: scen.initialMessage.romaji,
        vietnamese: scen.initialMessage.vietnamese
      }
    ]);
    speechService.speakJapanese(scen.initialMessage.audioText);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Trình duyệt của bạn chưa bật Microphone hoặc không hỗ trợ Web Speech API. Bạn có thể gõ nội dung vào ô bên dưới!');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSubmitSpeech = async (speechText?: string) => {
    const textToSubmit = (speechText || inputText).trim();
    if (!textToSubmit || isEvaluating) return;

    setInputText('');
    const newConv = [...conversation, { role: 'user' as const, text: textToSubmit }];
    setConversation(newConv);
    setIsEvaluating(true);

    try {
      const feedback = await evaluateLiveSpokenInput(selectedScenario.id, textToSubmit, conversation);
      setLiveFeedback(feedback);

      // Append NPC reply
      setConversation((prev) => [
        ...prev,
        {
          role: 'npc',
          text: feedback.npcReply.japanese,
          furigana: feedback.npcReply.furigana,
          romaji: feedback.npcReply.romaji,
          vietnamese: feedback.npcReply.vietnamese
        }
      ]);

      // Automatically speak NPC reply in Tokyo Japanese
      speechService.speakJapanese(feedback.npcReply.audioText);
    } catch {
      // Fallback
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Banner & Scenario Selector */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎙️</span>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Động Cơ Khẩu Ngữ Thực Chiến & TPO Scanner
              </h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-900/70 text-emerald-300 font-semibold border border-emerald-700/60">
                Giao Tiếp Giọng Nói &lt;1s
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Phản xạ đàm thoại 1-1 với đối tác người Nhật. Quét TPO song song, bắt lỗi ngữ điệu và đề xuất Collocation mượt mà tức thì.
            </p>
          </div>
        </div>

        {/* Scenarios Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800">
          {CURATED_ROLEPLAY_SCENARIOS.map((scen) => {
            const isSelected = selectedScenario.id === scen.id;
            return (
              <button
                key={scen.id}
                type="button"
                onClick={() => handleSelectScenario(scen)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'bg-emerald-950/80 border-emerald-500 shadow-md shadow-emerald-950/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-2xl mt-0.5">{scen.npcAvatar}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{scen.title}</div>
                  <div className="text-[11px] text-slate-400 truncate">{scen.npcRole}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Chat Stream vs Right Live Clinic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-[460px]">
        {/* Left: Chat & Voice Interface (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {/* NPC Header */}
          <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedScenario.npcAvatar}</span>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedScenario.npcName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-emerald-300 font-medium">
                    {selectedScenario.npcRole}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                  {selectedScenario.backgroundBrief}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSelectScenario(selectedScenario)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Làm mới kịch bản"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 max-h-[380px]">
            {conversation.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'npc' && (
                  <span className="text-xl self-end mb-1">{selectedScenario.npcAvatar}</span>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm space-y-1.5 shadow-md ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-100 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[11px] uppercase tracking-wider opacity-75">
                      {msg.role === 'user' ? 'Bạn' : selectedScenario.npcName}
                    </span>
                    {msg.role === 'npc' && (
                      <button
                        type="button"
                        onClick={() => speechService.speakJapanese(msg.text)}
                        className="p-1 rounded text-emerald-400 hover:bg-emerald-950/80 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="font-japanese font-medium leading-relaxed">{msg.text}</div>
                  {msg.romaji && (
                    <div className="text-[11px] text-emerald-300/80 font-mono">{msg.romaji}</div>
                  )}
                  {msg.vietnamese && (
                    <div className="text-[11px] text-slate-300 border-t border-slate-800/80 pt-1">
                      {msg.vietnamese}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isEvaluating && (
              <div className="flex gap-2 items-center text-xs text-emerald-400 animate-pulse bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/40">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>AI Sensei đang thẩm định giọng nói & quét TPO thời gian thực...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Sample Response Chips */}
          <div className="px-3.5 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-thin">
            <span className="text-[10px] text-slate-400 whitespace-nowrap font-semibold">Gợi ý phản xạ:</span>
            {selectedScenario.sampleResponses.map((res, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setInputText(res.japanese);
                  handleSubmitSpeech(res.japanese);
                }}
                className={`text-[11px] px-2.5 py-1 rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                  res.quality === 'excellent'
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/60'
                    : res.quality === 'danger_trap'
                    ? 'bg-rose-950/50 text-rose-300 border-rose-800/50 hover:bg-rose-900/50'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {res.label}
              </button>
            ))}
          </div>

          {/* Input & Voice Trigger Bar */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-900/50'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950'
              }`}
              title={isListening ? 'Đang lắng nghe... bấm để dừng' : 'Bấm mic để nói tiếng Nhật'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitSpeech()}
              placeholder={isListening ? 'Đang lắng nghe giọng bạn nói...' : 'Nói qua mic hoặc gõ câu trả lời tiếng Nhật...'}
              className="flex-1 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-colors font-japanese"
            />

            <button
              type="button"
              onClick={() => handleSubmitSpeech()}
              disabled={!inputText.trim() || isEvaluating}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Live Spoken Clinic & TPO Scanner (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Hộp Chẩn Đoán Khẩu Ngữ AI (TPO Scanner)</span>
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                Quét Song Song
              </span>
            </div>

            {liveFeedback ? (
              <div className="space-y-3.5 animate-in fade-in duration-300">
                {/* Score Card */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Điểm phát âm & ngữ điệu</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">
                      {liveFeedback.pronunciationScore}
                      <span className="text-xs text-slate-400 font-normal"> / 100</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Độ chuẩn TPO</div>
                    <div className="text-xs font-bold text-teal-300 mt-2">
                      {liveFeedback.tpoAppropriateness.status}
                    </div>
                  </div>
                </div>

                {/* TPO Comment */}
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đánh giá văn hóa & ranh giới Uchi - Soto:</span>
                  </span>
                  <p className="leading-relaxed">{liveFeedback.tpoAppropriateness.comment}</p>
                </div>

                {/* Collocation Replacement */}
                <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-800/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Collocation Bản Xứ Nâng Tầm:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => speechService.speakJapanese(liveFeedback.nativeCollocationAlternative.nativePhrase)}
                      className="p-1 rounded text-emerald-400 hover:bg-emerald-900/60 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="bg-slate-950/90 p-2.5 rounded-lg border border-emerald-900/40">
                    <div className="text-sm font-bold text-white font-japanese">
                      {liveFeedback.nativeCollocationAlternative.nativePhrase}
                    </div>
                    <div className="text-[11px] text-emerald-300 font-mono">
                      {liveFeedback.nativeCollocationAlternative.romaji}
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 border-t border-slate-800 pt-1">
                      {liveFeedback.nativeCollocationAlternative.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-3 text-slate-400">
                <span className="text-3xl">🎯</span>
                <p className="text-xs max-w-xs">
                  Bấm nút Microphone hoặc chọn một gợi ý phản xạ bên trái để AI Sensei quét giọng nói và phân tích TPO lập tức.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Advice */}
          <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Quy tắc vàng phỏng vấn/đàm phán Tokyo: Tuyệt đối không dùng 「分かりました」 với cấp trên (dùng 「承知いたしました」), và luôn cảm ơn trước khi nêu quan điểm bất đồng.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
