import React, { useState } from 'react';
import {
  MessageCircle,
  Send,
  AlertCircle,
  Sparkles,
  Volume2,
  Eye,
  RotateCcw,
  Plus,
  RefreshCw,
} from 'lucide-react';
import {
  LINE_PERSONAS,
  LineMessage,
  LinePersonaConfig,
  generateLineReplyAndKyAnalysis,
  loadMoreLinePersonas,
  loadMoreLineReplies,
} from '../../services/wowWeaponsService';
import { speechService } from '../../services/speechService';

export const LineGenZHackerLab: React.FC = () => {
  const [personas, setPersonas] = useState<LinePersonaConfig[]>(LINE_PERSONAS);
  const [activePersona, setActivePersona] = useState<LinePersonaConfig>(LINE_PERSONAS[0]);
  const [messages, setMessages] = useState<LineMessage[]>([LINE_PERSONAS[0].openingMessage]);
  const [selectedInspectedMsgId, setSelectedInspectedMsgId] = useState<string>(
    LINE_PERSONAS[0].openingMessage.id
  );
  const [draftReply, setDraftReply] = useState<string>('');
  const [userFeedback, setUserFeedback] = useState<string>(
    'Chọn 1 phương án phản hồi chuẩn bản xứ hoặc tự gõ tin nhắn bằng tiếng Nhật để kiểm tra "Maruhara" và độ tinh tế KY.'
  );
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoadingMorePersonas, setIsLoadingMorePersonas] = useState<boolean>(false);
  const [isLoadingMoreReplies, setIsLoadingMoreReplies] = useState<boolean>(false);

  const handleSelectPersona = (persona: LinePersonaConfig) => {
    setActivePersona(persona);
    setMessages([persona.openingMessage]);
    setSelectedInspectedMsgId(persona.openingMessage.id);
    setDraftReply('');
    setUserFeedback(
      `Đã mở khung chat với ${persona.name}. Nhấp vào bất kỳ tin nhắn nào của đối phương để giải mã ẩn ý KY.`
    );
  };

  const handleSendReply = async (textToSend?: string) => {
    const cleanText = (textToSend ?? draftReply).trim();
    if (!cleanText || isTyping) return;

    const myMsg: LineMessage = {
      id: `me-${Date.now()}`,
      sender: 'me',
      text: cleanText,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      readStatus: '既読',
    };

    const nextHistory = [...messages, myMsg];
    setMessages(nextHistory);
    setDraftReply('');
    setIsTyping(true);

    try {
      const response = await generateLineReplyAndKyAnalysis(activePersona, nextHistory, cleanText);
      const replyMsg: LineMessage = {
        id: `them-${Date.now()}`,
        sender: 'them',
        text: response.replyText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        kyAnalysis: response.kyAnalysis,
      };
      setMessages((prev) => [...prev, replyMsg]);
      setSelectedInspectedMsgId(replyMsg.id);
      setUserFeedback(response.userMessageFeedback);
      speechService.speak(response.replyText, 1.0);
    } finally {
      setIsTyping(false);
    }
  };

  const inspectedMessage =
    messages.find((m) => m.id === selectedInspectedMsgId && m.kyAnalysis) ||
    [...messages].reverse().find((m) => m.kyAnalysis) ||
    activePersona.openingMessage;

  const kyReport = inspectedMessage.kyAnalysis!;

  const handleLoadMorePersonas = async () => {
    if (isLoadingMorePersonas) return;
    setIsLoadingMorePersonas(true);
    try {
      const more = await loadMoreLinePersonas(personas.map((p) => p.id));
      if (more.length > 0) {
        setPersonas((prev) => [...prev, ...more]);
        handleSelectPersona(more[0]);
      }
    } finally {
      setIsLoadingMorePersonas(false);
    }
  };

  const handleLoadMoreReplies = async () => {
    if (isLoadingMoreReplies) return;
    setIsLoadingMoreReplies(true);
    try {
      const extraReplies = await loadMoreLineReplies(
        activePersona,
        inspectedMessage.text,
        kyReport.suggestedReplies.map((r) => r.label)
      );
      if (extraReplies.length > 0) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === inspectedMessage.id && m.kyAnalysis
              ? {
                  ...m,
                  kyAnalysis: {
                    ...m.kyAnalysis,
                    suggestedReplies: [...m.kyAnalysis.suggestedReplies, ...extraReplies],
                  },
                }
              : m
          )
        );
      }
    } finally {
      setIsLoadingMoreReplies(false);
    }
  };

  // Live local Maruhara check while user is typing
  const draftHasMaruhara = draftReply.trim().endsWith('。');

  return (
    <div className="space-y-4">
      {/* Header & Persona Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-emerald-400">
            VŨ KHÍ 03 · GIẢ LẬP MẠNG XÃ HỘI LINE &amp; PHÁ MÃ GEN-Z / MARUHARA
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Đọc Bầu Không Khí KY, Giải Mã Teencode (草・りょ) &amp; Tín Hiệu Ẩn Ý
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {personas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => handleSelectPersona(persona)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border whitespace-nowrap ${
                activePersona.id === persona.id
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              {persona.name}
            </button>
          ))}
          <button
            onClick={handleLoadMorePersonas}
            disabled={isLoadingMorePersonas}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-950/60 hover:bg-emerald-900/60 disabled:opacity-50 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            {isLoadingMorePersonas ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
            <span>Tải thêm 3 kịch bản LINE</span>
          </button>
        </div>
      </div>

      {/* Two-Zone Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Zone (6 cols): Authentic LINE Mobile Chat Simulator */}
        <div className="lg:col-span-6 flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-[#1a2436] shadow-2xl h-[540px]">
          {/* LINE Header Bar */}
          <div className="bg-[#0f172a] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-jp font-bold text-white">
                {activePersona.avatarText}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{activePersona.name}</div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {activePersona.jpHandle} · {activePersona.role}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSelectPersona(activePersona)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Đặt lại cuộc hội thoại"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Chat Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#7292b8]/15 scrollbar-thin">
            {messages.map((msg) => {
              const isMe = msg.sender === 'me';
              const isInspected = inspectedMessage.id === msg.id;
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-jp font-bold text-white shrink-0">
                      {activePersona.avatarText}
                    </div>
                  )}

                  {isMe && (
                    <div className="text-[10px] text-slate-400 text-right leading-tight shrink-0">
                      <div className="font-jp">{msg.readStatus}</div>
                      <div className="font-mono">{msg.timestamp}</div>
                    </div>
                  )}

                  <div
                    onClick={() => !isMe && msg.kyAnalysis && setSelectedInspectedMsgId(msg.id)}
                    className={`max-w-[76%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed transition-all ${
                      isMe
                        ? 'bg-[#86efac] text-slate-950 font-medium rounded-br-sm'
                        : `bg-white text-slate-900 rounded-bl-sm cursor-pointer border-2 ${
                            isInspected ? 'border-amber-400 shadow-lg' : 'border-transparent'
                          }`
                    }`}
                  >
                    <div className="font-jp">{msg.text}</div>
                    {!isMe && (
                      <div className="mt-1.5 pt-1 border-t border-slate-200 flex items-center justify-between gap-2 text-[10px] text-slate-500">
                        <span className="inline-flex items-center gap-1 font-semibold text-indigo-600">
                          <Eye className="w-3 h-3" />
                          Nhấp để soi KY
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speechService.speak(msg.text);
                          }}
                          className="text-slate-600 hover:text-indigo-600 cursor-pointer"
                          title="Nghe giọng đọc"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {!isMe && (
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{msg.timestamp}</span>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="text-xs text-slate-300 font-mono pl-9">
                {activePersona.name} đang gõ tin nhắn...
              </div>
            )}
          </div>

          {/* Real-time Maruhara Alert Before Sending */}
          {draftHasMaruhara && (
            <div className="px-3 py-1.5 bg-amber-950/90 border-t border-amber-600/50 text-[11px] text-amber-200 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                Cảnh báo Maruhara: Câu của bạn kết thúc bằng dấu chấm 「。」— dễ gây cảm giác lạnh lùng/tức giận trên LINE với bạn bè!
              </span>
            </div>
          )}

          {/* Chat Composer */}
          <div className="p-3 bg-[#0f172a] border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={draftReply}
              onChange={(e) => setDraftReply(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
              placeholder="Gõ tin nhắn trả lời bằng tiếng Nhật hoặc chọn gợi ý bên phải..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-jp"
            />
            <button
              onClick={() => handleSendReply()}
              disabled={!draftReply.trim() || isTyping}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white cursor-pointer"
              title="Gửi tin nhắn LINE"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Zone (6 cols): KY ("Read the Air") & Slang Decoder Inspector */}
        <div className="lg:col-span-6 space-y-3">
          {/* Your Reply Diagnostic */}
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-700/50 text-xs text-indigo-200 leading-relaxed">
            <span className="font-bold text-white">Chẩn đoán tin nhắn của bạn: </span>
            {userFeedback}
          </div>

          {/* KY Breakdown Card */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                <span>MÁY QUÉT KY (空気を読む) &amp; PHÁ MÃ TEENCODE</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Tin nhắn #{inspectedMessage.timestamp}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="text-slate-400">Nghĩa bề mặt:</div>
              <div className="text-slate-200 font-medium">{kyReport.surfaceMeaning}</div>
            </div>

            {kyReport.maruharaAlert && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-xs text-rose-200 leading-relaxed">
                {kyReport.maruharaAlert}
              </div>
            )}

            {/* Slang / Kaomoji Tokens */}
            {kyReport.slangAndKaomojiDecoded.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-300">Giải mã từ lóng / Kaomoji:</div>
                <div className="grid grid-cols-1 gap-1.5">
                  {kyReport.slangAndKaomojiDecoded.map((tk, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2"
                    >
                      <span className="font-jp font-bold text-emerald-300 shrink-0">{tk.token}</span>
                      <span className="text-slate-300">— {tk.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hidden Psychological Subtext */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-700/40 text-xs text-amber-100 leading-relaxed">
              <span className="font-bold text-amber-300">Tâm lý ẩn sau câu chữ: </span>
              {kyReport.truePsychologicalIntent}
            </div>

            {/* Tactical 1-Tap Replies */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chọn chiến thuật trả lời ngay ({kyReport.suggestedReplies.length}):</span>
                </div>
                <button
                  onClick={handleLoadMoreReplies}
                  disabled={isLoadingMoreReplies}
                  className="px-2.5 py-1 rounded-md bg-indigo-950/60 hover:bg-indigo-900/60 disabled:opacity-50 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  {isLoadingMoreReplies ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                  <span>Tải thêm 3 gợi ý</span>
                </button>
              </div>
              {kyReport.suggestedReplies.map((sug, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-emerald-400">
                      {sug.label} · Điểm an toàn KY: {sug.safetyScore}%
                    </span>
                    <button
                      onClick={() => handleSendReply(sug.japanese)}
                      disabled={isTyping}
                      className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold cursor-pointer whitespace-nowrap"
                    >
                      Gửi câu này
                    </button>
                  </div>
                  <div className="text-sm font-jp font-bold text-white">{sug.japanese}</div>
                  <div className="text-[11px] text-slate-400">{sug.vietnamese}</div>
                  <div className="text-[11px] text-indigo-300">{sug.whyItWorks}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
