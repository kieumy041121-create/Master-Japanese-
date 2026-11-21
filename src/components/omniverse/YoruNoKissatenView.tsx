import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Coffee,
  Send,
  Sparkles,
  Plus,
  Volume2,
  Receipt,
  BookmarkPlus,
  Check,
  UserPlus,
  X,
  Headphones,
  MessageSquareHeart,
  Loader2,
  RotateCcw,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  KissatenMessage,
  KissatenPersona,
  KissatenReceipt,
  RubyToken,
  omniverseStorageService,
} from '../../services/omniverseStorageService';
import {
  AizuchiSuggestion,
  INITIAL_AIZUCHI_SUGGESTIONS,
  INITIAL_KISSATEN_PERSONAS,
  expandThreeAizuchiPrompts,
  expandThreeKissatenPersonas,
  generatePragmaticReceipt,
  sendKissatenReply,
} from '../../services/omniverseExpansionEngine';
import {
  SPATIAL_CHANNEL_META,
  SpatialAudioState,
  spatialAudioEngine,
} from '../../services/spatialAudioEngine';
import { speechService } from '../../services/speechService';
import { srsVaultService } from '../../services/srsVaultService';
import { SanctuaryRoomFrame } from './SanctuaryRoomFrame';
import {
  getPersonaWaitingMessage,
  normalizeKissatenPersona,
} from '../../utils/kissatenResilience';

interface YoruNoKissatenViewProps {
  isDark: boolean;
  onSrsUpdated: () => void;
}

export const YoruNoKissatenView: React.FC<YoruNoKissatenViewProps> = ({ isDark, onSrsUpdated }) => {
  const [personas, setPersonas] = useState<KissatenPersona[]>(INITIAL_KISSATEN_PERSONAS);
  const [activePersonaId, setActivePersonaId] = useState<string>(INITIAL_KISSATEN_PERSONAS[0].id);
  const [chats, setChats] = useState<Record<string, KissatenMessage[]>>({});
  const [receipts, setReceipts] = useState<KissatenReceipt[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<KissatenReceipt | null>(null);

  const [aizuchiList, setAizuchiList] = useState<AizuchiSuggestion[]>(INITIAL_AIZUCHI_SUGGESTIONS);
  const [inputText, setInputText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [isSummoningGuests, setIsSummoningGuests] = useState(false);
  const [isExpandingAizuchi, setIsExpandingAizuchi] = useState(false);
  const [isPrintingReceipt, setIsPrintingReceipt] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showAudioMixer, setShowAudioMixer] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [savedKeys, setSavedKeys] = useState<Record<string, boolean>>({});
  const [audioState, setAudioState] = useState<SpatialAudioState>(spatialAudioEngine.getState());

  // Custom guest creator form state
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [customRegion, setCustomRegion] = useState('Kyoto');
  const [customRegister, setCustomRegister] = useState<KissatenPersona['speechRegister']>('Teineigo trầm ấm');
  const [customDrink, setCustomDrink] = useState('Trà gạo rang Genmaicha');
  const [customKanji, setCustomKanji] = useState('客');

  const chatEndRef = useRef<HTMLDivElement>(null);
  const latestPersonasRef = useRef<KissatenPersona[]>(personas);
  const latestChatsRef = useRef<Record<string, KissatenMessage[]>>(chats);
  const latestReceiptsRef = useRef<KissatenReceipt[]>(receipts);

  useEffect(() => {
    latestPersonasRef.current = personas;
  }, [personas]);

  useEffect(() => {
    latestChatsRef.current = chats;
  }, [chats]);

  useEffect(() => {
    latestReceiptsRef.current = receipts;
  }, [receipts]);

  // Hydrate & auto-repair persistent personas & chat memories from IndexedDB (non-fatal if storage fails)
  useEffect(() => {
    let mounted = true;
    const unsubAudio = spatialAudioEngine.subscribe(setAudioState);

    (async () => {
      try {
        await omniverseStorageService.registerSeedHashes(
          'kissaten_persona',
          INITIAL_KISSATEN_PERSONAS.map((p) => `${p.japaneseName}_${p.role}`)
        );
        const state = await omniverseStorageService.loadState();
        if (!mounted) return;

        const seedById = new Map(INITIAL_KISSATEN_PERSONAS.map((p) => [p.id, p]));
        const rawPersonas =
          state.kissatenPersonas.length > 0 ? state.kissatenPersonas : INITIAL_KISSATEN_PERSONAS;

        // Normalize every stored persona (including legacy +3 or custom guests) so no field is ever undefined/null
        const repairedPersonas: KissatenPersona[] = rawPersonas.map((p) => {
          const seed = seedById.get(p.id);
          const norm = normalizeKissatenPersona(p);
          return {
            id: norm.id,
            name: norm.name,
            japaneseName: norm.japaneseName,
            role: norm.role,
            region: norm.region,
            speechRegister: norm.speechRegister,
            favoriteDrink: norm.favoriteDrink,
            avatarKanji: norm.avatarKanji,
            accentColor: norm.accentColor,
            bio: norm.bio,
            openingGreeting: norm.openingGreeting,
            openingTokens: p.openingTokens || seed?.openingTokens,
            openingReading: norm.openingReading,
            openingVietnamese: norm.openingVietnamese,
            systemPersonaPrompt: norm.systemPersonaPrompt,
            isCustom: norm.isCustom,
            createdAt: norm.createdAt,
          };
        });

        if (state.kissatenPersonas.length === 0) {
          state.kissatenPersonas = repairedPersonas;
          void omniverseStorageService.saveState(state).catch(() => {});
        }

        setPersonas(repairedPersonas);
        setActivePersonaId(repairedPersonas[0].id);
        setChats(state.kissatenChats || {});
        setReceipts(state.kissatenReceipts || []);
      } catch (err) {
        console.warn('[YoruNoKissaten] Storage hydration fallback active:', err);
      }
    })();

    return () => {
      mounted = false;
      unsubAudio();
    };
  }, []);

  const activePersona = useMemo(() => {
    const found = personas.find((p) => p.id === activePersonaId) || personas[0] || INITIAL_KISSATEN_PERSONAS[0];
    return found;
  }, [personas, activePersonaId]);

  const currentMessages: KissatenMessage[] = useMemo(() => {
    const existing = chats[activePersona.id];
    if (existing && existing.length > 0) return existing;
    return [
      {
        id: `opening_${activePersona.id}`,
        sender: 'persona',
        japanese: activePersona.openingGreeting,
        tokens: activePersona.openingTokens,
        reading: activePersona.openingReading,
        vietnamese: activePersona.openingVietnamese,
        timestamp: activePersona.createdAt,
      },
    ];
  }, [chats, activePersona]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [currentMessages.length, activePersona.id, isReplying]);

  /**
   * Non-blocking IndexedDB persistence: NEVER blocks UI rendering or crashes a chat turn.
   */
  const persistKissatenStateNonBlocking = (
    nextPersonas: KissatenPersona[],
    nextChats: Record<string, KissatenMessage[]>,
    nextReceipts: KissatenReceipt[]
  ) => {
    void (async () => {
      try {
        const state = await omniverseStorageService.loadState();
        state.kissatenPersonas = nextPersonas;
        state.kissatenChats = nextChats;
        state.kissatenReceipts = nextReceipts;
        await omniverseStorageService.saveState(state);
      } catch (err) {
        console.warn('[YoruNoKissaten] Non-blocking IndexedDB persistence skipped:', err);
      }
    })();
  };

  const executeChatTurn = async (
    targetPersona: KissatenPersona,
    userMsgId: string,
    text: string,
    historyWithUser: KissatenMessage[]
  ) => {
    setIsReplying(true);
    setErrorBanner(null);

    try {
      const reply = await sendKissatenReply(targetPersona, historyWithUser, text);
      const personaMsg: KissatenMessage = {
        id: `msg_p_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        sender: 'persona',
        japanese: reply.japanese,
        tokens: reply.tokens,
        reading: reply.reading,
        vietnamese: reply.vietnamese,
        uchiSotoNote: reply.uchiSotoNote || undefined,
        status: 'sent',
        timestamp: Date.now(),
      };

      // Update chat state immediately on screen (clear any previous failed flag on the user message)
      const cleanedHistory = historyWithUser.map((m) =>
        m.id === userMsgId ? { ...m, status: 'sent' as const, errorReason: undefined } : m
      );
      const finalHistory = [...cleanedHistory, personaMsg];
      const nextChatsFinal = { ...latestChatsRef.current, [targetPersona.id]: finalHistory };

      setChats(nextChatsFinal);
      if (reply.aizuchiHints && reply.aizuchiHints.length > 0) {
        setAizuchiList(reply.aizuchiHints);
      }

      // Persist asynchronously AFTER rendering so storage issues can never block the reply
      persistKissatenStateNonBlocking(latestPersonasRef.current, nextChatsFinal, latestReceiptsRef.current);
    } catch (err: any) {
      const reason =
        err?.message || 'Mất kết nối tạm thời tới Quán Cà Phê Đêm. Vui lòng bấm Gửi lại.';
      // Zero-Loss Messaging: KEEP the user's message visible with inline [↻ Gửi lại]
      const markedHistory = historyWithUser.map((m) =>
        m.id === userMsgId ? { ...m, status: 'failed' as const, errorReason: reason } : m
      );
      const nextChatsFailed = { ...latestChatsRef.current, [targetPersona.id]: markedHistory };
      setChats(nextChatsFailed);
      setErrorBanner(reason);
    } finally {
      // Mandatory state unlock so send button / typing state can NEVER get stuck
      setIsReplying(false);
    }
  };

  const handleSendMessage = async (textOverride?: string) => {
    const text = (textOverride ?? inputText).trim();
    if (!text || isReplying) return;

    setErrorBanner(null);
    if (textOverride === undefined) {
      setInputText('');
    } else if (inputText.trim() === text) {
      setInputText('');
    }

    const targetPersona = activePersona;
    const userMsg: KissatenMessage = {
      id: `msg_u_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      sender: 'user',
      japanese: text,
      status: 'sent',
      timestamp: Date.now(),
    };

    const baseHistory = latestChatsRef.current[targetPersona.id]?.length
      ? [...latestChatsRef.current[targetPersona.id]]
      : [...currentMessages];

    // Optimistic UI: render user message immediately
    const updatedWithUser = [...baseHistory, userMsg];
    const nextChatsUser = { ...latestChatsRef.current, [targetPersona.id]: updatedWithUser };
    setChats(nextChatsUser);

    await executeChatTurn(targetPersona, userMsg.id, text, updatedWithUser);
  };

  const handleRetryFailedMessage = async (failedMsg: KissatenMessage) => {
    if (isReplying) return;
    const targetPersona = activePersona;
    const baseHistory = latestChatsRef.current[targetPersona.id]?.length
      ? [...latestChatsRef.current[targetPersona.id]]
      : [...currentMessages];

    const restoredHistory = baseHistory.map((m) =>
      m.id === failedMsg.id ? { ...m, status: 'sent' as const, errorReason: undefined } : m
    );
    const nextChatsRestored = { ...latestChatsRef.current, [targetPersona.id]: restoredHistory };
    setChats(nextChatsRestored);

    await executeChatTurn(targetPersona, failedMsg.id, failedMsg.japanese, restoredHistory);
  };

  const handleSummonThreeGuests = async () => {
    if (isSummoningGuests) return;
    setErrorBanner(null);
    setIsSummoningGuests(true);
    try {
      const freshGuests = await expandThreeKissatenPersonas(personas.map((p) => `${p.name} (${p.role})`));
      if (freshGuests.length === 0) {
        setErrorBanner('Các vị khách mới trùng lặp với sổ lưu niệm. Hãy nhấn lại để triệu hồi 3 nhân vật hoàn toàn khác.');
      } else {
        const nextPersonas = [...personas, ...freshGuests];
        setPersonas(nextPersonas);
        setActivePersonaId(freshGuests[0].id);
        persistKissatenStateNonBlocking(nextPersonas, latestChatsRef.current, latestReceiptsRef.current);
      }
    } catch (err: any) {
      setErrorBanner(err?.message || 'Chưa thể mở cửa đón 3 vị khách mới lúc này.');
    } finally {
      setIsSummoningGuests(false);
    }
  };

  const handleExpandThreeAizuchi = async () => {
    if (isExpandingAizuchi) return;
    setErrorBanner(null);
    setIsExpandingAizuchi(true);
    try {
      const lastMsg = currentMessages[currentMessages.length - 1]?.japanese || activePersona.openingGreeting;
      const freshHints = await expandThreeAizuchiPrompts(
        activePersona,
        lastMsg,
        aizuchiList.map((a) => a.japanese)
      );
      if (freshHints.length > 0) {
        setAizuchiList((prev) => [...freshHints, ...prev.slice(0, 3)]);
      }
    } catch (err: any) {
      setErrorBanner(err?.message || 'Chưa thể sinh thêm 3 gợi ý đệm lời mới.');
    } finally {
      setIsExpandingAizuchi(false);
    }
  };

  const handlePrintReceipt = async () => {
    if (isPrintingReceipt) return;
    setErrorBanner(null);
    setIsPrintingReceipt(true);
    try {
      const receipt = await generatePragmaticReceipt(activePersona, currentMessages);
      const nextReceipts = [receipt, ...receipts];
      setReceipts(nextReceipts);
      setActiveReceipt(receipt);
      persistKissatenStateNonBlocking(latestPersonasRef.current, latestChatsRef.current, nextReceipts);
    } catch (err: any) {
      setErrorBanner(err?.message || 'Chưa thể in Hóa Đơn Ngữ Dụng Học.');
    } finally {
      setIsPrintingReceipt(false);
    }
  };

  const handleCreateCustomGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customRole.trim()) return;
    const norm = normalizeKissatenPersona({
      id: `persona_custom_${Date.now()}`,
      name: `${customName.trim()} · ${customRole.trim()}`,
      japaneseName: customName.trim(),
      role: customRole.trim(),
      region: customRegion.trim() || 'Tokyo',
      speechRegister: customRegister,
      favoriteDrink: customDrink.trim() || 'Cà phê nhỏ giọt',
      avatarKanji: (customKanji.trim() || '客').slice(0, 1),
      accentColor: '#9b6a44',
      bio: `Vị khách đặc biệt do chính bạn mời đến quán cà phê đêm từ ${customRegion.trim() || 'Tokyo'}.`,
      openingGreeting: `こんばんは。${customName.trim()}と申します。静かな夜ですね、少しお話ししませんか。`,
      openingReading: `こんばんは。しずかなよるですね、すこしおはなししませんか。`,
      openingVietnamese: `Chào buổi tối. Tôi là ${customName.trim()}. Đêm nay yên tĩnh quá, mình trò chuyện một chút nhé?`,
      systemPersonaPrompt: `Bạn là ${customName.trim()}, nghề nghiệp ${customRole.trim()} đến từ ${customRegion.trim() || 'Tokyo'}. Hãy trò chuyện tự nhiên theo sắc thái ${customRegister}, ấm áp và giàu lòng Omoiyari.`,
      isCustom: true,
      createdAt: Date.now(),
    });

    const newGuest: KissatenPersona = {
      id: norm.id,
      name: norm.name,
      japaneseName: norm.japaneseName,
      role: norm.role,
      region: norm.region,
      speechRegister: norm.speechRegister,
      favoriteDrink: norm.favoriteDrink,
      avatarKanji: norm.avatarKanji,
      accentColor: norm.accentColor,
      bio: norm.bio,
      openingGreeting: norm.openingGreeting,
      openingReading: norm.openingReading,
      openingVietnamese: norm.openingVietnamese,
      systemPersonaPrompt: norm.systemPersonaPrompt,
      isCustom: true,
      createdAt: norm.createdAt,
    };

    const nextPersonas = [...personas, newGuest];
    setPersonas(nextPersonas);
    setActivePersonaId(newGuest.id);
    setShowCustomModal(false);
    setCustomName('');
    setCustomRole('');
    persistKissatenStateNonBlocking(nextPersonas, latestChatsRef.current, latestReceiptsRef.current);
  };

  const handleSavePhraseToSrs = (jp: string, reading: string, vi: string, context: string) => {
    srsVaultService.addBookmark({
      japanese: jp,
      reading,
      vietnamese: vi,
      type: 'phrase',
      level: 'N2',
      contextSentence: context,
      contextTranslation: vi,
      source: `Quán Cà Phê Đêm · ${activePersona.japaneseName}`,
      tags: ['Yoru no Kissaten', 'Ngữ dụng học', 'Omoiyari'],
    });
    setSavedKeys((prev) => ({ ...prev, [jp]: true }));
    onSrsUpdated();
  };

  const panelClass = isDark
    ? 'bg-[#141923] border-stone-800/90 text-stone-100'
    : 'bg-[#fcf9f3] border-stone-200 text-stone-900';

  const subtleCardClass = isDark
    ? 'bg-[#1b2230] border-stone-800 text-stone-200'
    : 'bg-[#f4efe6] border-stone-200/80 text-stone-800';

  return (
    <>
      <SanctuaryRoomFrame
        isDark={isDark}
        wairoHex="#B47B44"
        academicPanelLabel="Vị Khách, Phối Âm & Hóa Đơn"
        headerSlot={
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <h2 className="font-mincho text-xl sm:text-2xl font-bold tracking-tight">
                  Quán Cà Phê Đêm Khuya
                </h2>
                <span className="font-jp text-sm font-medium" style={{ color: '#B47B44' }}>
                  夜の喫茶店 · Kohaku 琥珀
                </span>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                Tán gẫu chậm 5 phút · Không đồng hồ đếm ngược · Không chấm điểm
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!audioState.isPlaying) {
                    spatialAudioEngine.applyScenePreset('kissaten');
                  }
                  spatialAudioEngine.togglePlay();
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  audioState.isPlaying
                    ? 'bg-[#B47B44] text-white'
                    : isDark
                    ? 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                    : 'bg-stone-200/80 text-stone-800 hover:bg-stone-300'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{audioState.isPlaying ? 'Đang phát quán đêm' : 'Âm thanh Showa'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintReceipt}
                disabled={isPrintingReceipt}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-emerald-900/40 text-emerald-200 border border-emerald-700/50 hover:bg-emerald-900/60'
                    : 'bg-emerald-800 text-emerald-50 hover:bg-emerald-900'
                }`}
              >
                {isPrintingReceipt ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Receipt className="w-3.5 h-3.5" />}
                <span>In Hóa Đơn Ngữ Dụng Học</span>
              </button>
            </div>
          </div>
        }
        experienceSlot={
          <>
            {errorBanner && (
              <div
                className={`rounded-xl border px-4 py-3 text-xs flex items-center justify-between gap-3 ${
                  isDark
                    ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                <span>{errorBanner}</span>
                <button type="button" onClick={() => setErrorBanner(null)} className="shrink-0 opacity-75 hover:opacity-100">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Primary 65% Slow Showa Conversation Counter */}
            <section className={`rounded-2xl border p-4 sm:p-6 ${panelClass}`}>
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-stone-500/15">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center font-mincho text-xl font-bold text-white shrink-0"
                    style={{ backgroundColor: activePersona.accentColor }}
                  >
                    {activePersona.avatarKanji}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="font-mincho text-lg font-bold">{activePersona.name}</h3>
                      <span className="font-jp text-xs" style={{ color: '#B47B44' }}>
                        {activePersona.japaneseName} · {activePersona.speechRegister}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                      {activePersona.bio}
                    </p>
                  </div>
                </div>

                {/* 0ms Furigana Toggle */}
                <button
                  type="button"
                  onClick={() => setShowFurigana((v) => !v)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    showFurigana
                      ? isDark
                        ? 'border-[#B47B44]/55 bg-[#B47B44]/18 text-amber-200'
                        : 'border-[#B47B44]/55 bg-amber-50 text-amber-950'
                      : isDark
                      ? 'border-stone-700 text-stone-400 hover:text-stone-200'
                      : 'border-stone-300 text-stone-600 hover:text-stone-900'
                  }`}
                  title="Bật / Tắt Furigana tức thì (0ms)"
                >
                  {showFurigana ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Furigana</span>
                </button>
              </div>

              {/* Chat Stream */}
              <div className="py-5 space-y-4 max-h-[430px] overflow-y-auto pr-1">
                {currentMessages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  const isFailed = msg.status === 'failed';
                  const hasGranularRuby =
                    !isUser &&
                    Array.isArray(msg.tokens) &&
                    msg.tokens.some((t: RubyToken) => Boolean(t.reading));

                  return (
                    <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-3 border ${
                          isUser
                            ? isFailed
                              ? isDark
                                ? 'bg-rose-950/35 border-rose-700/60 text-stone-100'
                                : 'bg-rose-50 border-rose-300 text-stone-900'
                              : isDark
                              ? 'bg-[#B47B44]/20 border-[#B47B44]/45 text-stone-100'
                              : 'bg-[#2c2520] border-[#2c2520] text-[#faf7f2]'
                            : isDark
                            ? 'bg-[#1a2130] border-stone-800 text-stone-100'
                            : 'bg-[#f6f1e7] border-stone-200/90 text-stone-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-jp text-sm sm:text-[15px] leading-[2.15]">
                            {!isUser && Array.isArray(msg.tokens) && msg.tokens.length > 0
                              ? msg.tokens.map((tok, tIdx) =>
                                  tok.reading ? (
                                    <ruby key={tIdx} className="ruby-align-center">
                                      {tok.text}
                                      <rt
                                        className={`text-[10px] font-normal select-none transition-opacity duration-75 ${
                                          showFurigana ? 'opacity-85' : 'opacity-0'
                                        }`}
                                        style={{ color: isDark ? '#e6b88a' : '#8d5b2c' }}
                                      >
                                        {tok.reading}
                                      </rt>
                                    </ruby>
                                  ) : (
                                    <React.Fragment key={tIdx}>{tok.text}</React.Fragment>
                                  )
                                )
                              : msg.japanese}
                          </p>
                          {!isUser && (
                            <button
                              type="button"
                              onClick={() => speechService.speak(msg.reading || msg.japanese, 0.9)}
                              className={`p-1.5 rounded-lg shrink-0 transition-colors cursor-pointer ${
                                isDark ? 'hover:bg-stone-700 text-stone-300' : 'hover:bg-stone-200 text-stone-600'
                              }`}
                              title="Nghe giọng đọc vị khách"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Fallback Hiragana reading line when message doesn't have granular Kanji ruby tokens */}
                        {!isUser && showFurigana && !hasGranularRuby && msg.reading && msg.reading !== msg.japanese && (
                          <p className={`text-xs font-jp mt-1 ${isDark ? 'text-amber-300/75' : 'text-amber-900/75'}`}>
                            {msg.reading}
                          </p>
                        )}

                        {!isUser && msg.vietnamese && (
                          <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                            {msg.vietnamese}
                          </p>
                        )}

                        {!isUser && msg.uchiSotoNote && (
                          <div
                            className={`mt-2.5 pt-2 border-t text-[11px] flex items-start gap-1.5 ${
                              isDark ? 'border-stone-700/70 text-emerald-300/90' : 'border-stone-300/70 text-emerald-900'
                            }`}
                          >
                            <MessageSquareHeart className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>Sắc thái Uchi / Soto: {msg.uchiSotoNote}</span>
                          </div>
                        )}

                        {/* Zero-Loss Inline Retry Action when a user message fails after auto-retries */}
                        {isUser && isFailed && (
                          <div className="mt-2 pt-2 border-t border-rose-500/25 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                            <span className={isDark ? 'text-rose-200' : 'text-rose-800'}>
                              {msg.errorReason || 'Chưa gửi được lời nhắn.'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRetryFailedMessage(msg)}
                              disabled={isReplying}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer disabled:opacity-45 ${
                                isDark
                                  ? 'bg-rose-500/25 text-rose-100 hover:bg-rose-500/40'
                                  : 'bg-rose-700 text-white hover:bg-rose-800'
                              }`}
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Gửi lại</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isReplying && (
                  <div className={`flex items-center gap-2 text-xs pl-1 ${isDark ? 'text-amber-200/80' : 'text-amber-900/80'}`}>
                    <Coffee className="w-4 h-4 shrink-0" />
                    <span>{getPersonaWaitingMessage(activePersona)}</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Radar Aizuchi (相槌) Suggestion Bar */}
              <div className={`pt-3.5 pb-3 border-t ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className={`text-xs font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                    Radar Aizuchi (相槌) · Chạm để điền nhanh hoặc bấm nút gửi ngay
                  </span>
                  <button
                    type="button"
                    onClick={handleExpandThreeAizuchi}
                    disabled={isExpandingAizuchi}
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isDark
                        ? 'border-stone-700 text-amber-300 hover:bg-stone-800'
                        : 'border-stone-300 text-amber-900 hover:bg-stone-100'
                    }`}
                  >
                    {isExpandingAizuchi ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                    <span>[+3 Gợi Ý Đệm Lời]</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {aizuchiList.slice(0, 3).map((hint, idx) => (
                    <div
                      key={`${hint.japanese}_${idx}`}
                      className={`rounded-xl border px-3 py-2 transition-colors flex items-start justify-between gap-2 ${
                        isDark
                          ? 'bg-[#1a202c] border-stone-800 hover:border-[#B47B44]/60'
                          : 'bg-white border-stone-200 hover:border-[#B47B44]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setInputText(hint.japanese)}
                        className="text-left min-w-0 flex-1 cursor-pointer"
                      >
                        <div className="font-jp text-xs font-semibold leading-snug">{hint.japanese}</div>
                        <div className={`text-[11px] mt-0.5 leading-snug ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                          {hint.vietnamese}
                        </div>
                      </button>
                      <button
                        type="button"
                        disabled={isReplying}
                        onClick={() => handleSendMessage(hint.japanese)}
                        title="Gửi câu đệm lời này ngay"
                        className={`p-1.5 rounded-lg shrink-0 transition-colors cursor-pointer disabled:opacity-40 ${
                          isDark
                            ? 'bg-[#B47B44]/20 text-amber-200 hover:bg-[#B47B44]/40'
                            : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                        }`}
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Composer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 pt-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Gõ tiếng Nhật, Romaji hay tiếng Việt đều được..."
                  className={`flex-1 rounded-xl border px-3.5 py-2.5 text-sm font-jp focus:outline-none focus:ring-2 focus:ring-[#B47B44]/40 ${
                    isDark
                      ? 'bg-[#0f131b] border-stone-700 text-stone-100 placeholder:text-stone-500'
                      : 'bg-white border-stone-300 text-stone-900 placeholder:text-stone-400'
                  }`}
                />
                <button
                  type="submit"
                  disabled={isReplying || !inputText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-opacity disabled:opacity-40 cursor-pointer"
                  style={{ backgroundColor: '#B47B44' }}
                >
                  {isReplying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{isReplying ? 'Đang đáp...' : 'Gửi lời'}</span>
                </button>
              </form>
            </section>
          </>
        }
        academicSlot={
          <>
            {/* Showa Pragmatic Receipt (Displayed prominently at top of 35% panel when generated) */}
            {activeReceipt && (
              <div
                className={`rounded-2xl border-2 border-dashed p-4 space-y-3 ${
                  isDark
                    ? 'bg-[#191714] border-[#B47B44]/50 text-stone-100'
                    : 'bg-[#fdfaf2] border-stone-400/70 text-stone-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-dashed border-stone-500/40">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                      SHOWA PRAGMATIC RECEIPT
                    </div>
                    <h4 className="font-mincho text-base font-bold mt-0.5">
                      Hóa Đơn Ngữ Dụng Học
                    </h4>
                    <p className="text-xs mt-0.5" style={{ color: '#B47B44' }}>
                      {activeReceipt.warmthScoreLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveReceipt(null)}
                    className="p-1 rounded-lg opacity-70 hover:opacity-100 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  {activeReceipt.atmosphereSummary}
                </p>

                <div className="space-y-2.5">
                  {activeReceipt.items.map((item, idx) => {
                    const isSaved = savedKeys[item.nativeUpgrade] || srsVaultService.isBookmarked(item.nativeUpgrade);
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl border p-3 space-y-1.5 ${
                          isDark ? 'bg-[#12100e] border-stone-800' : 'bg-white border-stone-200'
                        }`}
                      >
                        <div className="text-[11px] opacity-70 font-jp">Gốc: 「{item.userPhrase}」</div>
                        <p className={`text-xs ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>{item.pragmaticNote}</p>
                        <div className="pt-2 border-t border-stone-500/15 flex items-start justify-between gap-2">
                          <div>
                            <div className="font-jp text-xs font-bold text-emerald-500">{item.nativeUpgrade}</div>
                            <div className="text-[11px] opacity-75">{item.omoiyariMeaning}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleSavePhraseToSrs(
                                item.nativeUpgrade,
                                item.nativeReading,
                                item.omoiyariMeaning,
                                item.nativeUpgrade
                              )
                            }
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                              isSaved
                                ? 'bg-emerald-600/20 text-emerald-500'
                                : 'bg-amber-600/15 text-amber-700 dark:text-amber-200'
                            }`}
                          >
                            {isSaved ? <Check className="w-3 h-3" /> : <BookmarkPlus className="w-3 h-3" />}
                            <span>{isSaved ? 'Đã lưu' : 'FSRS'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Persistent Guest Roster */}
            <div className={`rounded-2xl border p-4 space-y-3 ${panelClass}`}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold">Vị Khách Quán Đêm</h3>
                  <p className={`text-[11px] tabular-nums ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    {personas.length} nhân vật lưu ký ức
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCustomModal(true)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap shrink-0 cursor-pointer ${
                    isDark
                      ? 'border-stone-700 text-stone-200 hover:bg-stone-800'
                      : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Tự tạo</span>
                </button>
              </div>

              <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
                {personas.map((p) => {
                  const isSelected = p.id === activePersona.id;
                  const msgCount = (chats[p.id] || []).length;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setActivePersonaId(p.id);
                        setActiveReceipt(null);
                      }}
                      className={`w-full text-left rounded-xl border p-2.5 transition-all flex items-center gap-2.5 cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-[#B47B44]/18 border-[#B47B44]/65 text-stone-100'
                            : 'bg-amber-50 border-[#B47B44] text-stone-900'
                          : isDark
                          ? 'bg-[#181e2a] border-stone-800 hover:border-stone-700 text-stone-300'
                          : 'bg-white/70 border-stone-200/80 hover:border-stone-300 text-stone-800'
                      }`}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-mincho text-base font-bold text-white shrink-0"
                        style={{ backgroundColor: p.accentColor }}
                      >
                        {p.avatarKanji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-xs truncate">{p.name}</div>
                        <div className={`text-[11px] truncate ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                          {p.region} · {p.speechRegister}
                        </div>
                      </div>
                      {msgCount > 0 && (
                        <span className="text-[10px] opacity-60 tabular-nums shrink-0">{msgCount}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleSummonThreeGuests}
                disabled={isSummoningGuests}
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white whitespace-nowrap transition-opacity hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: '#B47B44' }}
              >
                {isSummoningGuests ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>[+3 Vị Khách Mới]</span>
              </button>
            </div>

            {/* Compact Spatial Audio 5-Layer Mixer Card */}
            <div className={`rounded-2xl border p-4 space-y-2.5 ${panelClass}`}>
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold">Phối Âm Không Gian Showa (5 tầng)</h4>
                <button
                  type="button"
                  onClick={() => setShowAudioMixer((v) => !v)}
                  className="text-[11px] font-semibold underline opacity-80 hover:opacity-100 cursor-pointer"
                >
                  {showAudioMixer ? 'Thu gọn' : 'Điều chỉnh'}
                </button>
              </div>
              {showAudioMixer && (
                <div className="space-y-2 pt-1">
                  {SPATIAL_CHANNEL_META.map((ch) => {
                    const pct = Math.round((audioState.channels[ch.id] || 0) * 100);
                    return (
                      <div key={ch.id} className={`rounded-xl border p-2.5 ${subtleCardClass}`}>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-medium truncate">
                            {ch.labelVi} <span className="opacity-65 font-jp">{ch.labelJp}</span>
                          </span>
                          <span className="font-mono tabular-nums font-semibold ml-1">{pct}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={pct}
                          aria-label={`${ch.labelVi} ${pct}%`}
                          onChange={(e) => {
                            if (!audioState.isPlaying) spatialAudioEngine.start();
                            spatialAudioEngine.setChannelVolume(ch.id, Number(e.target.value) / 100);
                          }}
                          className="w-full accent-[#B47B44] cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {receipts.length > 0 && (
                <div className={`pt-2.5 border-t space-y-1 ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
                  <div className="text-[11px] font-semibold opacity-70">Hóa đơn đã lưu ({receipts.length})</div>
                  {receipts.slice(0, 3).map((rec) => (
                    <button
                      key={rec.id}
                      type="button"
                      onClick={() => setActiveReceipt(rec)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        isDark ? 'hover:bg-stone-800 text-stone-300' : 'hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <span className="truncate">{rec.personaName}</span>
                      <span className="text-[10px] opacity-60 shrink-0 ml-2 tabular-nums">
                        {new Date(rec.dateIso).toLocaleDateString('vi-VN')}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        }
      />

      {/* Custom Guest Creator Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCustomGuest}
            className={`w-full max-w-md rounded-2xl border p-5 space-y-3.5 shadow-2xl ${panelClass}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-mincho text-lg font-bold">Mời Vị Khách Độc Bản Vào Quán</h3>
              <button type="button" onClick={() => setShowCustomModal(false)} className="p-1 opacity-70 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              <div className="col-span-3">
                <label className="block text-xs font-medium mb-1">Tên vị khách</label>
                <input
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Ví dụ: Kenichi / Misaki"
                  className={`w-full rounded-xl border px-3 py-2 text-sm ${
                    isDark ? 'bg-[#0f131b] border-stone-700' : 'bg-white border-stone-300'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Chữ Ấn</label>
                <input
                  maxLength={1}
                  value={customKanji}
                  onChange={(e) => setCustomKanji(e.target.value)}
                  className={`w-full rounded-xl border px-3 py-2 text-sm text-center font-mincho ${
                    isDark ? 'bg-[#0f131b] border-stone-700' : 'bg-white border-stone-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Nghề nghiệp / Bản sắc</label>
              <input
                required
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder="Ví dụ: Người sửa đồng hồ cổ, Thủ thư thư viện đêm..."
                className={`w-full rounded-xl border px-3 py-2 text-sm ${
                  isDark ? 'bg-[#0f131b] border-stone-700' : 'bg-white border-stone-300'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-medium mb-1">Vùng miền</label>
                <input
                  value={customRegion}
                  onChange={(e) => setCustomRegion(e.target.value)}
                  className={`w-full rounded-xl border px-3 py-2 text-sm ${
                    isDark ? 'bg-[#0f131b] border-stone-700' : 'bg-white border-stone-300'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Đồ uống quen thuộc</label>
                <input
                  value={customDrink}
                  onChange={(e) => setCustomDrink(e.target.value)}
                  className={`w-full rounded-xl border px-3 py-2 text-sm ${
                    isDark ? 'bg-[#0f131b] border-stone-700' : 'bg-white border-stone-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Tầng ngôn ngữ giao tiếp</label>
              <select
                value={customRegister}
                onChange={(e) => setCustomRegister(e.target.value as KissatenPersona['speechRegister'])}
                className={`w-full rounded-xl border px-3 py-2 text-sm ${
                  isDark ? 'bg-[#0f131b] border-stone-700' : 'bg-white border-stone-300'
                }`}
              >
                <option value="Teineigo trầm ấm">Teineigo trầm ấm</option>
                <option value="Tameguchi thân thiện">Tameguchi thân thiện</option>
                <option value="Kansai-ben nhẹ">Kansai-ben nhẹ</option>
                <option value="Cổ điển lịch thiệp">Cổ điển lịch thiệp</option>
                <option value="Đời thường Tokyo">Đời thường Tokyo</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium ${
                  isDark ? 'bg-stone-800 text-stone-300' : 'bg-stone-200 text-stone-700'
                }`}
              >
                Đóng
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white"
                style={{ backgroundColor: '#B47B44' }}
              >
                Mời vào quán
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
