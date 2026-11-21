import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  X,
  Send,
  Sparkles,
  Volume2,
  Copy,
  Check,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Plus,
  Stethoscope,
  MessageSquare,
  Award,
  Compass,
  AlertTriangle,
  Lightbulb,
  Landmark,
  Layers,
  Flame,
  HelpCircle,
  ArrowRight,
  Maximize2,
  Minimize2,
  Mic,
  MicOff,
  Target,
  Radio,
  Zap,
  Search,
  FileText,
  Mail,
  Palette,
  Scale,
  Headphones,
  Activity,
  Brain,
  RotateCcw,
} from 'lucide-react';
import {
  SenseiChatMessage,
  CuratedLectureTopic,
  INITIAL_CURATED_LECTURES,
  EXTRA_CURATED_LECTURES,
  DeepCultureTopic,
  INITIAL_DEEP_CULTURE_TOPICS,
  EXTRA_DEEP_CULTURE_TOPICS,
  SentenceDiagnosisResult,
  SenseiFocusMode,
  SenseiExplanationPersona,
  EXAM_MASTERY_STRATEGIES,
  EXTRA_EXAM_STRATEGIES,
  DAILY_SPOKEN_VAULT,
  EXTRA_DAILY_SPOKEN,
  KEIGO_QUICK_MATRIX,
  EXTRA_KEIGO_MATRIX,
  ExamStrategyItem,
  DailySpokenItem,
  KeigoMatrixItem,
  askAiSenseiAcademic,
  diagnoseJapaneseSentence,
  cleanSenseiText,
  detectUserAcademicIntent,
  transformKeigoMultiTier,
  KeigoMultiTierResult,
  consultNativeTpoExpression,
  NativeTpoExpressionResult,
  getTopAchillesHeels,
  recordLearnerInteraction,
  resetLearnerVulnerabilityProfile,
  purgeSenseiLookupCache,
} from '../../services/aiSenseiService';
import { speechService } from '../../services/speechService';
import { hiraganaToRomaji, sentenceHiraganaToRomaji, katakanaToHiragana } from '../../data/japaneseMasterDictionary';
import { JLPTLevel } from '../../types';
import { AiSenseiVocabAssistantTab } from './AiSenseiVocabAssistantTab';
import { AiSenseiDrillArenaTab } from './AiSenseiDrillArenaTab';
import { AiSenseiVoiceRoleplayTab } from './AiSenseiVoiceRoleplayTab';
import { AiSenseiSmartReaderTab } from './AiSenseiSmartReaderTab';
import { AiSenseiB2bEmailTab } from './AiSenseiB2bEmailTab';
import { AiSenseiAdaptiveJlptTab } from './AiSenseiAdaptiveJlptTab';
import { AiSenseiKanjiMnemonicTab } from './AiSenseiKanjiMnemonicTab';
import { AiSenseiPitchCoachTab } from './AiSenseiPitchCoachTab';
import { AiSenseiTranslationLabTab } from './AiSenseiTranslationLabTab';
import { AiSenseiSplitWorkspace } from './AiSenseiSplitWorkspace';
import { OmniContextCollocationBoard } from '../division5/OmniContextCollocationBoard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: JLPTLevel;
  onSetLevel?: (level: JLPTLevel) => void;
  initialQuery?: string;
  initialTab?:
    | 'chat'
    | 'vocab_assistant'
    | 'drill_arena'
    | 'exam_vault'
    | 'culture'
    | 'lectures'
    | 'clinic'
    | 'voice_roleplay'
    | 'smart_reader'
    | 'b2b_email'
    | 'adaptive_jlpt'
    | 'kanji_mnemonic'
    | 'pitch_coach'
    | 'translation_lab'
    | 'context_collocation';
  onClearInitialQuery?: () => void;
}

interface PromptCategory {
  id: string;
  label: string;
  icon: any;
  chips: string[];
}

const CATEGORIZED_PROMPT_CHIPS: PromptCategory[] = [
  {
    id: 'tpo',
    label: '🎯 Cố Vấn Diễn Đạt TPO Bản Xứ',
    icon: Target,
    chips: [
      'Câu này diễn đạt tiếng Nhật thế nào cho tự nhiên: "Tôi đang cố gắng suy nghĩ giải pháp"',
      'Cách diễn đạt tự nhiên chuẩn TPO: "Xin lỗi vì tôi đã trả lời email muộn"',
      'Diễn đạt thế nào cho tự nhiên: "Cảm ơn anh đã luôn ủng hộ và giúp đỡ tôi"',
      'Thay vì dịch word-by-word "cố gắng suy nghĩ", người Nhật dùng cụm từ gì?',
      'Diễn đạt tự nhiên: "Công việc này thực sự rất khó nhằn và tốn sức"',
      'Cách nói tự nhiên khi từ chối lời mời của sếp mà không bị xem là thất lễ',
      'Diễn đạt tự nhiên 3 tầng Tameguchi - Teineigo - Keigo: "Tôi sẽ làm việc này ngay bây giờ"',
      'Từ này trong tiếng Nhật nói thế nào: "Sự thấu cảm và tinh tế quan tâm người khác trước khi họ lên tiếng"',
      'Khái niệm này tiếng Nhật gọi là gì: "Cảm giác áy náy, ngượng ngùng khi làm phiền người khác"',
      'Từ nào diễn tả cảm giác hơi buồn buồn man mác nhưng vẫn thấy đẹp đúng không Sensei?',
      'Dự phóng Collocation 3 tầng (Từ vựng - Cụm danh từ - Cụm động từ) cho bối cảnh: "Đi chợ"',
      'Dự phóng Collocation 3 tầng cho bối cảnh tâm lý công sở: "Bị sếp mắng do đi trễ"',
    ],
  },
  {
    id: 'jlpt',
    label: '🎯 Bẫy Đề Thi JLPT N1 & BJT',
    icon: Award,
    chips: [
      'Phân biệt bộ ba thượng đỉnh N1: 〜であれ〜であれ vs 〜といい〜といい vs 〜につけ〜につけ',
      'Bí quyết phá bẫy đề thi Ngữ pháp JLPT N1',
      'Bẫy đề thi N1: 〜たるもの vs 〜ともあろうものが',
      'Cấu trúc N1 biểu thị mục đích cao cả: 〜んがため',
      'Phân biệt cấu trúc N1: 〜にたえない vs 〜を禁じ得ない',
      'Đọc hiểu Dokkai N1: Bắt trọn ý tác giả trong trường văn',
      'Từ vựng N1: 敷居が高い, 姑息, 杞憂, 捲土重来, 隔靴掻痒',
      'Trong câu này tại sao chọn わけがない mà không chọn わけではない?',
      'Phân biệt bộ tứ 〜わけ (わけではない vs わけがない vs わけにはいかない)',
      'Phân biệt bộ tứ câu điều kiện: と vs ば vs たら vs なら',
      'Phân biệt phán đoán: そうだ vs ようだ vs らしい vs みたいだ',
      'Bẫy đề thi N2: 〜かねる vs 〜かねない',
      'Bí kíp bẻ khóa bài điền dấu sao ★ (Hoshi-mondai)',
      'Chiến thuật phân bổ thời gian thi JLPT vàng',
    ],
  },
  {
    id: 'clinic',
    label: '🩺 Giám Định & Sửa Câu',
    icon: Stethoscope,
    chips: [
      'Sửa giúp tôi câu này: watashi wa tokyo he ikitai',
      'Câu này nói vậy có tự nhiên không: 先生に言いました',
      'Sửa giúp câu này: 毎日勉強をしますから日本語が上手になりました',
      'Sửa câu này theo kính ngữ công sở: 明日行きます',
      'Tại sao nói "ドアを開けてあります" mà không nói "ドアが開いています"?',
      'Câu này sai ở đâu: 友達に本をあげられました',
    ],
  },
  {
    id: 'vocab',
    label: '📖 Từ Vựng Nghĩa Đen & Bóng',
    icon: Sparkles,
    chips: [
      'nghĩa bóng của từ amai (甘い)',
      'omoi (nghĩa bóng tình cảm ngột ngạt)',
      'Phân tích từ 腹が黒い (Haraguroi)',
      'Phân tích từ 首にする (Kubi ni suru)',
      'cho tôi 5 từ vựng về đàm phán hợp đồng',
      'cho tôi 5 từ vựng về thời tiết giông bão',
      'cho tôi 5 từ vựng về cảm xúc giấu kín Honne',
      'cho tôi 5 từ vựng về y tế bệnh viện',
      'từ vựng IT',
      'quán dụng ngữ về mắt (目)',
      'thành ngữ bộ phận cơ thể',
    ],
  },
  {
    id: 'business',
    label: '💼 Kính Ngữ & Công Sở',
    icon: Landmark,
    chips: [
      'Lỗi sai lạm dụng 〜させていただきます',
      'Bảng tra cứu Sonkeigo vs Kenjougo 7 động từ bất quy tắc',
      'Khi nói chuyện với khách hàng về giám đốc dùng từ gì?',
      'Quy tắc bất di bất dịch trao đổi danh thiếp Meishi',
      'Câu chào mở đầu và kết thúc Email đối tác B2B',
      'Văn hóa tiệc rượu Nomikai và cách rót bia chuẩn mực',
      'Phân biệt お疲れ様 vs ご苦労様',
      'Cách dùng 失礼します và 失礼いたします',
    ],
  },
  {
    id: 'daily',
    label: '🗣️ Khẩu Ngữ Đời Thường',
    icon: MessageSquare,
    chips: [
      'Rút gọn khẩu ngữ 〜ちゃう & 〜じゃう',
      'Khẩu ngữ chuẩn bị trước 〜とく & 〜どく',
      'Ý nghĩa đa dạng và cách dùng của やばい (Yabai)',
      '4 câu đệm Cushion Kotoba làm mềm lời nói',
      'Khẩu ngữ 〜っけ xác nhận lại điều mình quên',
      'Khẩu ngữ 〜なきゃ & 〜なくちゃ',
      'Slang giới trẻ: マジで, ガチで, ウケる',
    ],
  },
  {
    id: 'particles',
    label: '🔍 Trợ Từ & Hư Từ',
    icon: Compass,
    chips: [
      'Phân biệt cách dùng arimasu và imasu',
      'Phân biệt は (wa) và が (ga) trực tiếp',
      'Phân biệt に (ni) và で (de)',
      'Phân biệt kara vs node',
      'Phân biệt だけ (dake) vs しか (shika) vs ばかり (bakari)',
      'Hệ thống động từ cho nhận: あげる, くれる, もらう',
      'Phân biệt tự động từ (が) vs tha động từ (を)',
    ],
  },
  {
    id: 'dokkai_choukai',
    label: '🎧 Nghe Choukai & Đọc Dokkai',
    icon: Headphones,
    chips: [
      'Bí kíp Nghe Choukai N1: Bắt nuốt âm 〜てる, 〜ちゃう, 〜とく, 〜なくちゃ và lược chủ ngữ',
      'Chiến thuật nhận diện ngữ điệu đảo chiều 180 độ (えっ / ちょっと... / まあ...)',
      'Đọc hiểu Dokkai N1: Cách bóc tách câu đa tầng, phủ định kép và luận điểm Tatemae vs Honne',
      'Phân tích 5 chiều Hán tự & Trọng âm Tokyo: 曖昧 (あいまい), 忖度 (そんたく), 葛藤 (かっとう)',
      'Tìm từ tiếng Nhật theo nghĩa Việt (4 bước): "Cảm giác ngượng ngùng áy náy khi làm phiền người khác"',
    ],
  },
];



export const AiSenseiModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentLevel,
  onSetLevel,
  initialQuery,
  onClearInitialQuery,
  initialTab,
}) => {
  const [senseiLevel, setSenseiLevel] = useState<JLPTLevel>(currentLevel || 'N1');

  useEffect(() => {
    if (currentLevel) {
      setSenseiLevel(currentLevel);
    }
  }, [currentLevel]);

  const handleLevelChange = (lvl: JLPTLevel) => {
    setSenseiLevel(lvl);
    onSetLevel?.(lvl);
    speechService.playSuccessSound();
  };

  const [activeTab, setActiveTab] = useState<
    | 'chat'
    | 'vocab_assistant'
    | 'drill_arena'
    | 'exam_vault'
    | 'culture'
    | 'lectures'
    | 'clinic'
    | 'voice_roleplay'
    | 'smart_reader'
    | 'b2b_email'
    | 'adaptive_jlpt'
    | 'kanji_mnemonic'
    | 'pitch_coach'
    | 'translation_lab'
    | 'context_collocation'
  >('chat');
  const [focusMode, setFocusMode] = useState<SenseiFocusMode>('comprehensive');
  const [explanationPersona, setExplanationPersona] = useState<SenseiExplanationPersona>('encyclopedic_master');
  const [selectedPromptCategory, setSelectedPromptCategory] = useState<string>('jlpt');

  const [messages, setMessages] = useState<SenseiChatMessage[]>([
    {
      id: 'welcome',
      sender: 'sensei',
      explanationPersona: 'encyclopedic_master',
      text: `Không gian học tập tĩnh tại **AI Sensei · GS. Yamato Kenji** đã sẵn sàng.\n\nBạn có thể tự do chuyển đổi **2 Chế độ Giảng giải** ngay thanh điều khiển phía trên:\n• ⚡ **Chế độ 1 · Đại Tông Sư Toàn Năng (Nhanh)**: 5 Trụ cột Bách khoa — Từ vựng 5 chiều, Ngữ pháp 3 chiều & bẫy JEES, TPO 3 tầng, Dokkai/Choukai, Văn hóa và Truy xuất Việt → Nhật 4 bước.\n• 🌌 **Chế độ 2 · Thực Thể Toàn Tri (Singularity)**: Ngoại cảm ý định mơ hồ, trị liệu dịch thô, vá lỗ hổng **Achilles** theo trình độ và Neo trí nhớ 3 giây trên nền Zen.\n\nHãy chọn chế độ phù hợp và đặt câu hỏi bất kỳ.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);
  const [lookupEpoch, setLookupEpoch] = useState<number>(0);
  const [activeQueryTarget, setActiveQueryTarget] = useState<string>('');
  const [achillesHeels, setAchillesHeels] = useState(() => getTopAchillesHeels(2));
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [vocabInitialTopic, setVocabInitialTopic] = useState<string>('');
  const [vocabInitialMode, setVocabInitialMode] = useState<'dual_metaphor' | 'core_meaning' | 'concept_retrieval'>('dual_metaphor');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  // Audio Speech Rate State (0.8x, 1.0x, 1.2x)
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  // Voice Input (Microphone Speech Recognition) State
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Exam Vault State
  const [vaultSubTab, setVaultSubTab] = useState<'strategies' | 'slang' | 'keigo'>('strategies');
  const [examStrategies, setExamStrategies] = useState<ExamStrategyItem[]>(EXAM_MASTERY_STRATEGIES);
  const [dailySpoken, setDailySpoken] = useState<DailySpokenItem[]>(DAILY_SPOKEN_VAULT);
  const [keigoMatrix, setKeigoMatrix] = useState<KeigoMatrixItem[]>(KEIGO_QUICK_MATRIX);
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>(EXAM_MASTERY_STRATEGIES[0].id);
  const [isLoadingExtraVault, setIsLoadingExtraVault] = useState<boolean>(false);

  // Lectures State & Search
  const [lectures, setLectures] = useState<CuratedLectureTopic[]>(INITIAL_CURATED_LECTURES);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [isLoadingExtraLectures, setIsLoadingExtraLectures] = useState(false);
  const [lectureSearchQuery, setLectureSearchQuery] = useState('');

  // Sentence Clinic, TPO Communicator & 4-Tier Keigo Transformer State
  const [clinicSubTab, setClinicSubTab] = useState<'tpo_communicator' | 'diagnosis' | 'keigo_transformer'>('tpo_communicator');
  const [tpoInput, setTpoInput] = useState('Tôi đang cố gắng suy nghĩ giải pháp cho vấn đề này');
  const [isConsultingTpo, setIsConsultingTpo] = useState(false);
  const [tpoResult, setTpoResult] = useState<NativeTpoExpressionResult | null>(null);
  const [clinicInput, setClinicInput] = useState('');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<SentenceDiagnosisResult | null>(null);
  const [keigoInput, setKeigoInput] = useState('');
  const [isTransformingKeigo, setIsTransformingKeigo] = useState(false);
  const [keigoResult, setKeigoResult] = useState<KeigoMultiTierResult | null>(null);

  // Deep Culture State & Search
  const [cultureTopics, setCultureTopics] = useState<DeepCultureTopic[]>(INITIAL_DEEP_CULTURE_TOPICS);
  const [selectedCultureId, setSelectedCultureId] = useState<string>(INITIAL_DEEP_CULTURE_TOPICS[0].id);
  const [selectedCultureCategory, setSelectedCultureCategory] = useState<string>('Tất cả');
  const [isLoadingExtraCulture, setIsLoadingExtraCulture] = useState(false);
  const [cultureSearchQuery, setCultureSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialTab) {
        setActiveTab(initialTab);
      }
      if (initialQuery && initialQuery.trim()) {
        const query = initialQuery.trim();
        if (initialTab === 'vocab_assistant') {
          setActiveTab('vocab_assistant');
          setVocabInitialTopic(query);
          onClearInitialQuery?.();
        } else if (!initialTab || initialTab === 'chat') {
          setActiveTab('chat');
          onClearInitialQuery?.();
          setTimeout(() => {
            handleSendMessage(query);
          }, 50);
        }
      }
    }
  }, [isOpen, initialQuery, initialTab]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isAnswering) return;

    const detected = detectUserAcademicIntent(query);
    recordLearnerInteraction(query, detected, senseiLevel);
    setAchillesHeels(getTopAchillesHeels(2));

    const userMsg: SenseiChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const streamId = `sensei_${Date.now() + 1}`;
    const streamTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // AGGRESSIVE CACHE-PURGE: wipe previous term's lookup cache & force fresh Target-Lock epoch BEFORE async call
    purgeSenseiLookupCache(query);
    setActiveQueryTarget(query);
    setLookupEpoch((prev) => prev + 1);

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsAnswering(true);
    setStreamingMsgId(null);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-4)
        .map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('model' as const),
          text: cleanSenseiText(m.text),
        }));

      let insertedStreamBubble = false;
      const activePersona = explanationPersona;
      const reply = await askAiSenseiAcademic(query, {
        level: senseiLevel,
        focusMode,
        explanationPersona: activePersona,
        conversationHistory: history,
        onStreamUpdate: (partialText) => {
          if (!partialText) return;
          if (!insertedStreamBubble) {
            insertedStreamBubble = true;
            setStreamingMsgId(streamId);
            setMessages((prev) => [
              ...prev,
              {
                id: streamId,
                sender: 'sensei',
                explanationPersona: activePersona,
                text: partialText,
                timestamp: streamTimestamp,
              },
            ]);
          } else {
            setMessages((prev) =>
              prev.map((m) => (m.id === streamId ? { ...m, text: partialText } : m))
            );
          }
        },
      });

      const finalText = cleanSenseiText(reply, true);
      if (insertedStreamBubble) {
        setMessages((prev) =>
          prev.map((m) => (m.id === streamId ? { ...m, text: finalText } : m))
        );
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: streamId,
            sender: 'sensei',
            explanationPersona: activePersona,
            text: finalText,
            timestamp: streamTimestamp,
          },
        ]);
      }
      speechService.playSuccessSound();
    } catch {
      const errorMsg: SenseiChatMessage = {
        id: `sensei_err_${Date.now()}`,
        sender: 'sensei',
        text: 'Thành thật xin lỗi bạn, đường truyền học thuật tạm thời gián đoạn. Tôi đã kích hoạt hệ thống tri thức lưu trữ, xin mời bạn thử lại sau giây lát!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAnswering(false);
      setStreamingMsgId(null);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(cleanSenseiText(text));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, customRate?: number) => {
    const cleaned = cleanSenseiText(text);
    const lines = cleaned.split('\n').map((l) => l.trim());
    const jpLines = lines.filter((l) => /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(l));
    const rateToUse = customRate !== undefined ? customRate : speechRate;

    if (jpLines.length > 0) {
      speechService.speak(jpLines.slice(0, 3).join('. '), rateToUse);
    } else {
      speechService.speak(cleaned.slice(0, 120), rateToUse);
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Trình duyệt hiện tại chưa hỗ trợ Web Speech API. Bạn có thể sử dụng Google Chrome trên máy tính hoặc điện thoại để nói tiếng Nhật trực tiếp!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          speechService.playSuccessSound();
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleTransformKeigo = async (customSentence?: string) => {
    const sentenceToTransform = (customSentence || keigoInput).trim();
    if (!sentenceToTransform || isTransformingKeigo) return;

    setIsTransformingKeigo(true);
    try {
      const result = await transformKeigoMultiTier(sentenceToTransform);
      setKeigoResult(result);
      speechService.playSuccessSound();
    } catch {
      speechService.playErrorSound();
    } finally {
      setIsTransformingKeigo(false);
    }
  };

  const handlePrevLecture = () => {
    setCurrentLectureIndex((prev) => (prev > 0 ? prev - 1 : lectures.length - 1));
  };

  const handleNextLecture = () => {
    setCurrentLectureIndex((prev) => (prev < lectures.length - 1 ? prev + 1 : 0));
  };

  const handleLoadMoreLectures = () => {
    setIsLoadingExtraLectures(true);
    setTimeout(() => {
      const nextBatch = EXTRA_CURATED_LECTURES.map((item, idx) => ({
        ...item,
        id: `${item.id}_loaded_${idx}_${Date.now()}`,
      }));
      setLectures((prev) => [...prev, ...nextBatch]);
      setIsLoadingExtraLectures(false);
      speechService.playSuccessSound();
    }, 200);
  };

  const handleConsultTpo = async (customInput?: string) => {
    const textToConsult = (customInput || tpoInput).trim();
    if (!textToConsult || isConsultingTpo) return;
    setIsConsultingTpo(true);
    try {
      const result = await consultNativeTpoExpression(textToConsult);
      setTpoResult(result);
      speechService.playSuccessSound();
    } finally {
      setIsConsultingTpo(false);
    }
  };

  const handleDiagnoseSentence = async () => {
    if (!clinicInput.trim() || isDiagnosing) return;
    setIsDiagnosing(true);
    try {
      const result = await diagnoseJapaneseSentence(clinicInput.trim());
      setDiagnosisResult(result);
      speechService.playSuccessSound();
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleLoadMoreCulture = () => {
    setIsLoadingExtraCulture(true);
    setTimeout(() => {
      const nextBatch = EXTRA_DEEP_CULTURE_TOPICS.map((item, idx) => ({
        ...item,
        id: `${item.id}_loaded_${idx}_${Date.now()}`,
      }));
      setCultureTopics((prev) => [...prev, ...nextBatch]);
      setIsLoadingExtraCulture(false);
      speechService.playSuccessSound();
    }, 200);
  };

  const handleAskSenseiAboutCulture = (topic: DeepCultureTopic) => {
    setActiveTab('chat');
    handleSendMessage(`Sensei hãy giải thích chuyên sâu về góc nhìn văn hóa, ứng xử và tâm lý của "${topic.kanjiTitle} (${topic.romajiTitle}) - ${topic.vietnameseTitle}"`);
  };

  const handleLoadMoreVault = () => {
    setIsLoadingExtraVault(true);
    setTimeout(() => {
      if (vaultSubTab === 'strategies') {
        const nextBatch = EXTRA_EXAM_STRATEGIES.map((item, idx) => ({
          ...item,
          id: `${item.id}_loaded_${idx}_${Date.now()}`,
        }));
        setExamStrategies((prev) => [...prev, ...nextBatch]);
      } else if (vaultSubTab === 'slang') {
        const nextBatch = EXTRA_DAILY_SPOKEN.map((item, idx) => ({
          ...item,
          id: `${item.id}_loaded_${idx}_${Date.now()}`,
        }));
        setDailySpoken((prev) => [...prev, ...nextBatch]);
      } else {
        const nextBatch = EXTRA_KEIGO_MATRIX.map((item, idx) => ({
          ...item,
          verb: item.verb,
        }));
        setKeigoMatrix((prev) => [...prev, ...nextBatch]);
      }
      setIsLoadingExtraVault(false);
      speechService.playSuccessSound();
    }, 200);
  };

  const currentLecture = lectures[currentLectureIndex] || lectures[0];
  const selectedCultureTopic = cultureTopics.find((t) => t.id === selectedCultureId) || cultureTopics[0];
  const selectedExamStrategy = examStrategies.find((s) => s.id === selectedStrategyId) || examStrategies[0];

  const filteredCultureTopics = cultureTopics
    .filter((t) => (selectedCultureCategory === 'Tất cả' ? true : t.category === selectedCultureCategory))
    .filter((t) => {
      if (!cultureSearchQuery.trim()) return true;
      const q = cultureSearchQuery.toLowerCase().trim();
      return (
        t.kanjiTitle.toLowerCase().includes(q) ||
        t.romajiTitle.toLowerCase().includes(q) ||
        t.vietnameseTitle.toLowerCase().includes(q) ||
        t.summaryBadge.toLowerCase().includes(q)
      );
    });

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-fadeIn ${
        isMaximized ? 'p-0' : 'p-1.5 sm:p-3 md:p-4'
      }`}
    >
      <div
        className={`relative flex flex-col bg-[#070b14] border border-indigo-900/60 shadow-2xl overflow-hidden transition-all duration-200 gpu-accelerate ${
          isMaximized
            ? 'w-screen h-screen max-w-none max-h-none rounded-none'
            : 'w-full max-w-[98vw] xl:max-w-[1580px] h-[95vh] max-h-[960px] rounded-2xl'
        }`}
      >
        {/* Top Header Banner */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-0.5 shadow-lg flex items-center justify-center text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base sm:text-lg tracking-tight">
                  AI Sensei · GS. Yamato Kenji
                </h3>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-jp">
                  高級大学教授 · 日本語学
                </span>
              </div>
              <p className="text-xs text-indigo-200/70 hidden sm:block">
                Đại Tông Sư Tiếng Nhật Toàn Năng · Hán tự 5 chiều, Ma trận JLPT, Choukai/Dokkai & Tâm lý văn hóa bản xứ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Interactive JLPT Level Selector (N5 -> N1) */}
            <div className="flex items-center gap-1 bg-slate-900/90 border border-indigo-700/50 p-1 rounded-xl shadow-inner">
              <span className="text-[10px] font-bold text-indigo-300 uppercase px-1.5 hidden xl:inline">
                Trình độ:
              </span>
              {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => {
                const isSelected = senseiLevel === lvl;
                const isN1 = lvl === 'N1';
                return (
                  <button
                    key={lvl}
                    onClick={() => handleLevelChange(lvl)}
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-mono flex items-center gap-1 ${
                      isSelected
                        ? isN1
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md font-extrabold ring-1 ring-amber-300'
                          : 'bg-indigo-600 text-white shadow-sm font-bold'
                        : isN1
                        ? 'text-amber-300/90 hover:text-amber-200 hover:bg-amber-950/40 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                    title={isN1 ? 'JLPT N1 · Cấp độ Thượng Đỉnh Cao Nhất' : `Chọn trình độ JLPT ${lvl}`}
                  >
                    {isN1 && <span>👑</span>}
                    <span>{lvl}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-900/40 border border-indigo-800/40 text-xs text-indigo-300">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>{senseiLevel === 'N1' ? 'Chuẩn N1 Thượng Đỉnh' : `Chuẩn JLPT ${senseiLevel}`}</span>
            </div>
            <button
              onClick={() => setIsMaximized((prev) => !prev)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title={isMaximized ? 'Thu nhỏ giao diện chuẩn' : 'Phóng to toàn màn hình'}
            >
              {isMaximized ? (
                <Minimize2 className="w-5 h-5 text-indigo-400" />
              ) : (
                <Maximize2 className="w-5 h-5 text-slate-300 hover:text-white" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-col bg-slate-950/90 border-b border-slate-800/80 text-xs sm:text-sm">
          {/* Row 1: 7 Siêu Phân Hệ Huấn Luyện Vượt Chuẩn */}
          <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2 overflow-x-auto scrollbar-none border-b border-slate-900 bg-slate-950">
            <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              8 Siêu Phân Hệ:
            </span>

            <button
              onClick={() => setActiveTab('context_collocation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
                activeTab === 'context_collocation'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-950'
                  : 'bg-sky-950/40 text-sky-300 hover:bg-sky-900/60 border border-sky-800/50'
              }`}
            >
              <span>🧭</span>
              <span>Dự Phóng Collocation Bối Cảnh</span>
            </button>

            <button
              onClick={() => setActiveTab('voice_roleplay')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
                activeTab === 'voice_roleplay'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950'
                  : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-800/50'
              }`}
            >
              <span>🎙️</span>
              <span>Khẩu Ngữ & TPO Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('smart_reader')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
                activeTab === 'smart_reader'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-950'
                  : 'bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/60 border border-indigo-800/50'
              }`}
            >
              <span>📑</span>
              <span>X-Quang Văn Bản & Tatemae</span>
            </button>

            <button
              onClick={() => setActiveTab('b2b_email')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
                activeTab === 'b2b_email'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-950'
                  : 'bg-amber-950/40 text-amber-300 hover:bg-amber-900/60 border border-amber-800/50'
              }`}
            >
              <span>🏢</span>
              <span>Thư Tín B2B & Cushion</span>
            </button>

            <button
              onClick={() => setActiveTab('adaptive_jlpt')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
                activeTab === 'adaptive_jlpt'
                  ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md shadow-rose-950'
                  : 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border border-rose-800/50'
              }`}
            >
              <span>🎯</span>
              <span>Lò Luyện JLPT & Lỗ Hổng</span>
            </button>

            <button
              onClick={() => setActiveTab('kanji_mnemonic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
                activeTab === 'kanji_mnemonic'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-950'
                  : 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/60 border border-purple-800/50'
              }`}
            >
              <span>🎨</span>
              <span>Họa Sĩ Chiết Tự & Story</span>
            </button>

            <button
              onClick={() => setActiveTab('pitch_coach')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
                activeTab === 'pitch_coach'
                  ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md shadow-teal-950'
                  : 'bg-teal-950/40 text-teal-300 hover:bg-teal-900/60 border border-teal-800/50'
              }`}
            >
              <span>🎧</span>
              <span>Ngữ Điệu & Waveform</span>
            </button>

            <button
              onClick={() => setActiveTab('translation_lab')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
                activeTab === 'translation_lab'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-950'
                  : 'bg-blue-950/40 text-blue-300 hover:bg-blue-900/60 border border-blue-800/50'
              }`}
            >
              <span>⚖️</span>
              <span>Đối Chiếu Dịch Thuật</span>
            </button>
          </div>

          {/* Row 2: Standard Master Modules */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'chat'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Hỏi Đáp & Luyện Thi</span>
              </button>
              <button
                onClick={() => setActiveTab('drill_arena')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'drill_arena'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950 font-bold'
                    : 'text-slate-400 hover:text-rose-200 hover:bg-slate-900'
                }`}
              >
                <Target className="w-4 h-4 text-rose-300" />
                <span>Đấu Trường Luyện Đề & Bẫy ★</span>
              </button>
              <button
                onClick={() => setActiveTab('vocab_assistant')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'vocab_assistant'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-950'
                    : 'text-slate-400 hover:text-purple-200 hover:bg-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span>Từ Vựng Theo Yêu Cầu</span>
              </button>
              <button
                onClick={() => setActiveTab('clinic')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'clinic'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>Bác Sĩ Câu Văn & Keigo</span>
              </button>
              <button
                onClick={() => setActiveTab('exam_vault')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'exam_vault'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                    : 'text-slate-400 hover:text-emerald-200 hover:bg-slate-900'
                }`}
              >
                <Award className="w-4 h-4 text-emerald-300" />
                <span>Bí Kíp Đề Thi & Đời Sống</span>
              </button>
              <button
                onClick={() => setActiveTab('culture')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'culture'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-950'
                    : 'text-slate-400 hover:text-amber-200 hover:bg-slate-900'
                }`}
              >
                <Compass className="w-4 h-4 text-amber-300" />
                <span>Văn Hóa Chuyên Sâu ({cultureTopics.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('lectures')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'lectures'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Bách Khoa Chuyên Khảo ({lectures.length})</span>
              </button>
            </div>
            <div className="text-[11px] font-mono text-slate-400 hidden lg:flex items-center gap-1.5 shrink-0 pl-2">
              <span>Trực thấu tri thức</span>
            </div>
          </div>
        </div>

        {/* TAB 1: SPLIT-CORE DUAL WORKSPACE (LEFT CHAT + MAGNETIC DIVIDER + RIGHT KNOWLEDGE DISPLAY) */}
        {activeTab === 'chat' && (
          <AiSenseiSplitWorkspace
            messages={messages}
            inputText={inputText}
            onInputChange={setInputText}
            onSendMessage={(custom) => handleSendMessage(custom)}
            isAnswering={isAnswering}
            streamingMsgId={streamingMsgId}
            activeQueryTarget={activeQueryTarget}
            lookupEpoch={lookupEpoch}
            explanationPersona={explanationPersona}
            onPersonaChange={setExplanationPersona}
            focusMode={focusMode}
            onFocusModeChange={setFocusMode}
            senseiLevel={senseiLevel}
            achillesHeels={achillesHeels}
            onResetAchilles={() => {
              resetLearnerVulnerabilityProfile();
              setAchillesHeels([]);
            }}
            speechRate={speechRate}
            onSpeechRateChange={setSpeechRate}
            isListening={isListening}
            onToggleVoiceInput={toggleVoiceInput}
            onSpeak={(text) => handleSpeak(text)}
            onCopy={(id, text) => handleCopyMessage(id, text)}
            copiedId={copiedId}
            categorizedPromptChips={CATEGORIZED_PROMPT_CHIPS}
            selectedPromptCategory={selectedPromptCategory}
            onSelectPromptCategory={setSelectedPromptCategory}
            onOpenVocab5D={(topic) => {
              setVocabInitialMode('dual_metaphor');
              setVocabInitialTopic(topic);
              setActiveTab('vocab_assistant');
            }}
            onOpenConceptRetrieval={() => {
              setVocabInitialMode('concept_retrieval');
              setActiveTab('vocab_assistant');
            }}
          />
        )}

        {/* TAB: DRILL ARENA (ĐẤU TRƯỜNG LUYỆN ĐỀ & SOI BẪY JLPT N5-N1) */}
        {activeTab === 'drill_arena' && (
          <AiSenseiDrillArenaTab
            currentLevel={senseiLevel}
            onOpenChatWithQuery={(query) => {
              setActiveTab('chat');
              handleSendMessage(query);
            }}
          />
        )}

        {/* TAB 1.5: ON-DEMAND VOCABULARY ASSISTANT (Nghĩa Đen & Nghĩa Bóng + Tìm Từ Việt → Nhật 4 Bước) */}
        {activeTab === 'vocab_assistant' && (
          <AiSenseiVocabAssistantTab
            currentLevel={senseiLevel}
            initialTopic={vocabInitialTopic}
            initialLookupMode={vocabInitialMode}
            onOpenChatWithQuery={(query) => {
              setActiveTab('chat');
              handleSendMessage(query);
            }}
          />
        )}

        {/* TAB 2: EXAM MASTERY & DAILY SPOKEN VAULT */}
        {activeTab === 'exam_vault' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#060a14]">
            {/* Vault Sub-tabs Bar with +5 Button */}
            <div className="px-4 sm:px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setVaultSubTab('strategies')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    vaultSubTab === 'strategies'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Chiến Thuật Thi JLPT & BJT ({examStrategies.length})</span>
                </button>
                <button
                  onClick={() => setVaultSubTab('slang')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    vaultSubTab === 'slang'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Từ Điển Khẩu Ngữ & Slang ({dailySpoken.length})</span>
                </button>
                <button
                  onClick={() => setVaultSubTab('keigo')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    vaultSubTab === 'keigo'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5 text-purple-300" />
                  <span>Bảng Tra Kính Ngữ Bất Quy Tắc ({keigoMatrix.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={handleLoadMoreVault}
                  disabled={isLoadingExtraVault}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer active:scale-95 disabled:opacity-50"
                  title="Nạp thêm 5 bí kíp thực chiến chuyên sâu"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>
                    {isLoadingExtraVault
                      ? 'Đang nạp...'
                      : `+5 ${
                          vaultSubTab === 'strategies'
                            ? 'Bí kíp thi cử'
                            : vaultSubTab === 'slang'
                            ? 'Khẩu ngữ & Slang'
                            : 'Kính ngữ công sở'
                        }`}
                  </span>
                </button>
                <div className="text-[11px] text-slate-400 hidden lg:block">
                  Tập trung tri thức thi đậu điểm cao & giao tiếp tự nhiên
                </div>
              </div>
            </div>

            {/* Sub-tab 1: Exam Strategies */}
            {vaultSubTab === 'strategies' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {examStrategies.map((strat) => (
                    <button
                      key={strat.id}
                      onClick={() => setSelectedStrategyId(strat.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        selectedStrategyId === strat.id
                          ? 'bg-amber-950/50 border-amber-500/80 shadow-lg'
                          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-amber-400">{strat.category}</span>
                          <span className="text-slate-400 font-mono">{strat.targetLevel}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                          {strat.title}
                        </h4>
                      </div>
                      <span className="text-[11px] text-indigo-300 flex items-center gap-1 font-medium">
                        Xem chi tiết & làm ví dụ <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected Strategy Deep Dossier */}
                <div className="p-5 sm:p-7 rounded-2xl bg-slate-900/90 border border-amber-900/40 space-y-5 shadow-2xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                        <span>{selectedExamStrategy.category}</span>
                        <span>·</span>
                        <span>Áp dụng: {selectedExamStrategy.targetLevel}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                        {selectedExamStrategy.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('chat');
                        setFocusMode('jlpt_exam');
                        handleSendMessage(
                          `Sensei hãy phân tích sâu hơn về chiến thuật: "${selectedExamStrategy.title}" và cho em thêm bài tập áp dụng thực tế`
                        );
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow shrink-0 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Hỏi Sensei mở rộng</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-950 space-y-1.5">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" /> Bản chất bí truyền
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {selectedExamStrategy.coreSecret}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                      Quy trình bẻ khóa từng bước
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedExamStrategy.stepByStepGuide.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Real Exam Example */}
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wide">
                      <span className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" /> Ví dụ minh họa từ đề thi thật
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white font-jp">
                      {selectedExamStrategy.realExamExample.question}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300">
                      {selectedExamStrategy.realExamExample.choices.map((c, cIdx) => (
                        <div key={cIdx} className="p-2 rounded bg-slate-900 border border-slate-800">
                          {c}
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200 space-y-1">
                      <div className="font-bold text-emerald-300">
                        Đáp án đúng: {selectedExamStrategy.realExamExample.correctOrder}
                      </div>
                      <p className="leading-relaxed text-slate-300">
                        {selectedExamStrategy.realExamExample.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>
                      <strong className="text-indigo-300">Thần chú Giáo sư: </strong>
                      {selectedExamStrategy.senseiMnemonicTip}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 2: Daily Spoken & Street Slang */}
            {vaultSubTab === 'slang' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200">
                  💡 <strong>Cẩm nang khẩu ngữ bản xứ:</strong> Đây là các dạng rút gọn và slang mà người Nhật nói hàng ngày ngoài đời thực, trong Anime và phim ảnh nhưng sách giáo khoa hiếm khi giải thích cặn kẽ.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dailySpoken.map((slang) => (
                    <div
                      key={slang.id}
                      className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-emerald-400">{slang.category}</span>
                            <span className="text-[10px] text-slate-400">Gốc: {slang.formalOrigin}</span>
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-white font-jp mt-0.5">
                            {slang.pattern}
                          </h4>
                          <p className="text-xs font-medium text-emerald-200">{slang.meaning}</p>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('chat');
                            setFocusMode('daily_spoken');
                            handleSendMessage(
                              `Sensei hãy giải thích chi tiết hơn về cách dùng khẩu ngữ "${slang.pattern}" và cho 3 câu hội thoại tự nhiên của giới trẻ Nhật`
                            );
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white transition-colors cursor-pointer"
                          title="Hỏi Sensei mở rộng"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{slang.nuanceAndContext}</p>

                      {/* Real Dialogue Box */}
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2 font-sans">
                        <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-between">
                          <span>Tình huống: {slang.realConversations.situation}</span>
                          <span className="text-[9px] text-purple-300 font-mono">100% Romaji & Dịch nghĩa</span>
                        </div>
                        {(() => {
                          const parseSpeaker = (raw: string) => {
                            const match = raw.match(/^([^\(]+)(?:\((.+)\))?$/);
                            const jp = match ? match[1].trim() : raw.trim();
                            const vn = match && match[2] ? match[2].trim() : '';
                            const rom = hiraganaToRomaji(katakanaToHiragana(jp));
                            return { jp, vn, rom };
                          };
                          const a = parseSpeaker(slang.realConversations.speakerA);
                          const b = parseSpeaker(slang.realConversations.speakerB);

                          return (
                            <div className="space-y-2">
                              <div className="space-y-0.5">
                                <div className="text-emerald-300 font-jp font-semibold">
                                  <strong>A: </strong>{a.jp}
                                </div>
                                <div className="text-[10px] text-purple-300 font-mono italic pl-4">
                                  🔤 {a.rom}
                                </div>
                                {a.vn && (
                                  <div className="text-[11px] text-slate-300 pl-4">
                                    🇻🇳 {a.vn}
                                  </div>
                                )}
                              </div>
                              <div className="space-y-0.5 pt-1 border-t border-slate-800/60">
                                <div className="text-indigo-300 font-jp font-semibold">
                                  <strong>B: </strong>{b.jp}
                                </div>
                                <div className="text-[10px] text-purple-300 font-mono italic pl-4">
                                  🔤 {b.rom}
                                </div>
                                {b.vn && (
                                  <div className="text-[11px] text-slate-300 pl-4">
                                    🇻🇳 {b.vn}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="p-2.5 rounded bg-amber-950/30 border border-amber-900/40 text-[11px] text-amber-200">
                        <strong>⚠️ Lưu ý ứng xử: </strong>
                        {slang.culturalCaution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-tab 3: Keigo Matrix */}
            {vaultSubTab === 'keigo' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200">
                  💼 <strong>Bảng quy chuẩn Kính ngữ bất quy tắc:</strong> Nắm chắc {keigoMatrix.length} động từ cốt lõi này là bạn đã làm chủ trọn vẹn câu hỏi kính ngữ trong đề thi JLPT N3-N1 và phỏng vấn doanh nghiệp Nhật.
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {keigoMatrix.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm sm:text-base font-bold text-white font-jp">
                              {item.verb}
                            </h4>
                            <span className="text-xs font-mono text-purple-300">({item.romaji})</span>
                            <span className="text-xs text-slate-300">· {item.meaning}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('chat');
                            setFocusMode('business_keigo');
                            handleSendMessage(
                              `Sensei hãy giải thích chi tiết cách dùng Tôn kính ngữ và Khiêm nhường ngữ của động từ "${item.verb}" trong giao tiếp với khách hàng`
                            );
                          }}
                          className="px-2.5 py-1 rounded-md bg-purple-900/60 hover:bg-purple-800 border border-purple-700/50 text-white text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Hỏi sâu</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-amber-900/40 space-y-0.5">
                          <span className="text-[10px] font-bold text-amber-400 uppercase">
                            Tôn kính (Khách / Sếp)
                          </span>
                          <div className="text-sm font-bold text-white font-jp">{item.sonkeigo}</div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-indigo-900/40 space-y-0.5">
                          <span className="text-[10px] font-bold text-indigo-400 uppercase">
                            Khiêm nhường (Bản thân / Phe mình)
                          </span>
                          <div className="text-sm font-bold text-white font-jp">{item.kenjougo}</div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            Lịch sự thông thường
                          </span>
                          <div className="text-sm font-bold text-slate-200 font-jp">{item.teineigo}</div>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-800/80 bg-slate-950/70 p-2.5 rounded-xl">
                        <div className="flex items-center justify-between">
                          <strong className="text-xs text-emerald-300 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Ví dụ công sở chuẩn mực:</span>
                          </strong>
                          <button
                            onClick={() => handleSpeak(item.businessExample)}
                            className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
                            title="Nghe câu ví dụ"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                          </button>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-white font-jp">
                          {item.businessExample}
                        </div>
                        <div className="text-[11px] text-purple-300 font-mono italic">
                          🔤 Romaji: {item.businessExampleRomaji || sentenceHiraganaToRomaji(item.businessExample)}
                        </div>
                        {item.businessExampleVn && (
                          <div className="text-xs text-slate-300 pt-0.5 border-t border-slate-800/60 font-sans">
                            🇻🇳 Dịch nghĩa: {item.businessExampleVn}
                          </div>
                        )}
                      </div>

                      <div className="p-2 rounded bg-rose-950/30 border border-rose-900/40 text-[11px] text-rose-200">
                        <strong>⚠️ Bẫy sai sót cần tránh: </strong>
                        {item.commonMistakeTrap}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DEEP CULTURE */}
        {activeTab === 'culture' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#060a14]">
            {/* Category Filter Pills & Load More */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                {['Tất cả', 'Ứng Xử Xã Hội', 'Tâm Lý Học', 'Văn Hóa Công Sở', 'Triết Học Đời Sống', 'Đạo Đức & Lễ Nghi'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCultureCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCultureCategory === cat
                        ? 'bg-amber-600 text-white shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-44 sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={cultureSearchQuery}
                    onChange={(e) => setCultureSearchQuery(e.target.value)}
                    placeholder="Tìm nét văn hóa, Hán tự..."
                    className="w-full pl-8 pr-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  onClick={handleLoadMoreCulture}
                  disabled={isLoadingExtraCulture}
                  className="px-3 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+5 nét văn hóa</span>
                </button>
              </div>
            </div>

            {/* Cultural Topics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {filteredCultureTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedCultureId(topic.id)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                    selectedCultureId === topic.id
                      ? 'bg-amber-950/60 border-amber-500 shadow-md shadow-amber-950'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-amber-400 font-semibold">
                      {topic.summaryBadge}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white font-jp line-clamp-1">
                      {topic.kanjiTitle}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                      {topic.romajiTitle}
                    </p>
                  </div>
                  <span className="text-[10px] text-amber-300/80 font-medium line-clamp-1">
                    {topic.vietnameseTitle}
                  </span>
                </button>
              ))}
            </div>

            {/* Detailed Selected Cultural Dossier */}
            <div className="p-5 sm:p-7 rounded-2xl bg-slate-900/90 border border-amber-900/40 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {selectedCultureTopic.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Mã: {selectedCultureTopic.id.toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white font-jp">
                    {selectedCultureTopic.kanjiTitle} ({selectedCultureTopic.romajiTitle})
                  </h2>
                  <p className="text-sm sm:text-base font-bold text-amber-200">
                    {selectedCultureTopic.vietnameseTitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleSpeak(`${selectedCultureTopic.kanjiTitle}、${selectedCultureTopic.romajiTitle}`)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white transition-colors cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAskSenseiAboutCulture(selectedCultureTopic)}
                    className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Hỏi Sensei mở rộng</span>
                  </button>
                </div>
              </div>

              {/* Cultural Deep Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5" /> 1. Bản chất cốt lõi
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedCultureTopic.originAndConcept}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" /> 2. Cơ chế vận hành xã hội
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedCultureTopic.coreMechanism}
                  </p>
                </div>
              </div>

              {/* Linguistic Manifestations */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                  3. Câu nói cửa miệng kinh điển của người bản xứ
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedCultureTopic.linguisticManifestations.map((manifest, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-white font-jp">
                          {manifest.japanese}
                        </div>
                        <button
                          onClick={() => handleSpeak(manifest.japanese)}
                          className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs font-mono text-indigo-300/80">{manifest.furigana}</div>
                      <div className="text-[11px] text-purple-300 font-mono italic">
                        🔤 Romaji: {sentenceHiraganaToRomaji(manifest.furigana || manifest.japanese)}
                      </div>
                      <div className="text-xs text-emerald-300 font-medium">
                        🇻🇳 Dịch nghĩa: {manifest.vietnamese}
                      </div>
                      <div className="text-[11px] text-slate-400 pt-1">
                        <strong>Ngữ cảnh: </strong>
                        {manifest.usageContext}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Perspective Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-1.5">
                  <div className="text-xs font-bold text-rose-300">🇯🇵 Góc nhìn Nhật Bản:</div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedCultureTopic.culturalComparison.japanPerspective}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-yellow-900/40 space-y-1.5">
                  <div className="text-xs font-bold text-yellow-300">🇻🇳 Góc nhìn Việt Nam:</div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedCultureTopic.culturalComparison.vietnamPerspective}
                  </p>
                </div>
              </div>

              {/* Workplace Rules */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                  4. Quy tắc công sở cần nhớ
                </div>
                <div className="space-y-1.5">
                  {selectedCultureTopic.workplaceRules.map((rule, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-2 rounded bg-slate-900 text-xs text-slate-200 flex items-start gap-2"
                    >
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {rIdx + 1}
                      </span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trap warning */}
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/40 text-xs text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Cảnh báo bẫy người ngoại quốc: </strong>
                  {selectedCultureTopic.foreignTrapToAvoid}
                </span>
              </div>

              {/* Professor Yamato's takeaway */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/50 to-indigo-950/50 border border-purple-500/40 text-xs text-purple-200 flex items-center gap-2 italic">
                <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                <span>"{selectedCultureTopic.professorTakeaway}"</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CURATED LECTURES */}
        {activeTab === 'lectures' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#060a14]">
            {/* Top Stepper Bar */}
            <div className="flex items-center justify-between bg-slate-950/90 border border-slate-800 px-4 py-2.5 rounded-xl">
              <button
                onClick={handlePrevLecture}
                className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>← Chuyên đề trước</span>
              </button>

              <div className="flex items-center gap-2">
                <div className="relative hidden md:block w-52">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={lectureSearchQuery}
                    onChange={(e) => {
                      const q = e.target.value;
                      setLectureSearchQuery(q);
                      if (q.trim()) {
                        const foundIdx = lectures.findIndex(
                          (l) =>
                            l.title.toLowerCase().includes(q.toLowerCase()) ||
                            l.japaneseTitle.toLowerCase().includes(q.toLowerCase()) ||
                            l.category.toLowerCase().includes(q.toLowerCase())
                        );
                        if (foundIdx !== -1) {
                          setCurrentLectureIndex(foundIdx);
                        }
                      }
                    }}
                    placeholder="Tìm nhanh chuyên đề..."
                    className="w-full pl-8 pr-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <span className="text-xs font-semibold text-indigo-300 bg-indigo-950/60 border border-indigo-800/60 px-3 py-1 rounded-lg">
                  Chuyên đề {currentLectureIndex + 1} / {lectures.length}
                </span>
                <button
                  onClick={handleLoadMoreLectures}
                  disabled={isLoadingExtraLectures}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-white px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900 transition-colors cursor-pointer disabled:opacity-50"
                  title="Nạp thêm 5 chuyên đề học thuật mới"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+5 chuyên đề</span>
                </button>
              </div>

              <button
                onClick={handleNextLecture}
                className="inline-flex items-center gap-1 text-xs font-semibold text-white px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer shadow-md"
              >
                <span>Chuyên đề tiếp theo →</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Lecture Content Card */}
            <div className="bg-slate-900/90 border border-indigo-900/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {currentLecture.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Mã bài: {currentLecture.id.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {currentLecture.title}
                  </h3>
                  <p className="text-sm text-indigo-200/80 font-jp font-semibold">
                    {currentLecture.japaneseTitle}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('chat');
                    handleSendMessage(
                      `Sensei hãy giảng dạy chi tiết và cho bài tập thực hành về: "${currentLecture.title}"`
                    );
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Hỏi Sensei về bài này</span>
                </button>
              </div>

              {/* Abstract */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-400 mr-2">Tóm lược học thuật:</span>
                {currentLecture.abstract}
              </div>

              {/* Core Mechanic */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" /> Cơ chế nhận thức & Quy luật ngôn ngữ
                </h4>
                <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {currentLecture.coreMechanic}
                </div>
              </div>

              {/* Comparative Matrix */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Ma trận đối chiếu chuyên sâu
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="font-bold text-sm text-indigo-300">
                      {currentLecture.comparativeMatrix.itemA.label}
                    </div>
                    <div className="text-xs font-mono text-amber-300 bg-amber-950/30 p-2 rounded border border-amber-900/30">
                      {currentLecture.comparativeMatrix.itemA.formula}
                    </div>
                    <p className="text-xs text-slate-300">
                      {currentLecture.comparativeMatrix.itemA.nuance}
                    </p>
                    <div className="text-xs text-emerald-300 italic pt-1 border-t border-slate-800">
                      Ví dụ: {currentLecture.comparativeMatrix.itemA.example}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="font-bold text-sm text-purple-300">
                      {currentLecture.comparativeMatrix.itemB.label}
                    </div>
                    <div className="text-xs font-mono text-purple-300 bg-purple-950/30 p-2 rounded border border-purple-900/30">
                      {currentLecture.comparativeMatrix.itemB.formula}
                    </div>
                    <p className="text-xs text-slate-300">
                      {currentLecture.comparativeMatrix.itemB.nuance}
                    </p>
                    <div className="text-xs text-emerald-300 italic pt-1 border-t border-slate-800">
                      Ví dụ: {currentLecture.comparativeMatrix.itemB.example}
                    </div>
                  </div>
                </div>
              </div>

              {/* JLPT Trap & Professor Takeaway */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Cảnh báo bẫy đề thi JLPT
                  </div>
                  <p className="leading-relaxed">{currentLecture.jlptTrapWarning}</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-200 space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Lời khuyên vàng của Giáo sư
                  </div>
                  <p className="leading-relaxed font-medium italic">
                    "{currentLecture.professorTakeaway}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SENTENCE CLINIC & KEIGO */}
        {activeTab === 'clinic' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#060a14]">
            {/* Sub-tab Selector */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-thin">
              <button
                onClick={() => setClinicSubTab('tpo_communicator')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  clinicSubTab === 'tpo_communicator'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950'
                    : 'bg-slate-900 text-slate-400 hover:text-emerald-300 border border-slate-800'
                }`}
              >
                <Compass className="w-4 h-4 text-emerald-300" />
                <span>🎯 Cố Vấn Diễn Đạt TPO Bản Xứ</span>
              </button>
              <button
                onClick={() => setClinicSubTab('diagnosis')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  clinicSubTab === 'diagnosis'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>Bác Sĩ Khám Câu Văn</span>
              </button>
              <button
                onClick={() => setClinicSubTab('keigo_transformer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  clinicSubTab === 'keigo_transformer'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-950'
                    : 'bg-slate-900 text-slate-400 hover:text-amber-200 border border-slate-800'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-300" />
                <span>Bộ Chuyển Đổi Kính Ngữ 4 Tầng B2B</span>
              </button>
            </div>

            {/* SUB-TAB 0: NATIVE TPO COMMUNICATOR STUDIO */}
            {clinicSubTab === 'tpo_communicator' && (
              <>
                <div className="bg-slate-900/90 border border-emerald-800/40 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Compass className="w-5 h-5 text-emerald-400" />
                        <span>Cố Vấn Giao Tiếp Bản Xứ Tối Cao (Native TPO Communicator)</span>
                      </h3>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-semibold">
                        Chuỗi Phân Tích 4 Bước Chuẩn Tokyo
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Đập tan hoàn toàn tư duy dịch &ldquo;word-by-word&rdquo; (tiếng Nhật bồi). Định hình phản xạ giao tiếp theo đúng lăng kính tư duy giới tinh hoa Tokyo qua 4 bước: Ma trận TPO (3 tầng), Collocation bản xứ, Nuance tâm lý và Kiểm chứng thực tế.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <textarea
                      value={tpoInput}
                      onChange={(e) => setTpoInput(e.target.value)}
                      placeholder='Nhập ý định giao tiếp bằng tiếng Việt hoặc tiếng Nhật (Ví dụ: "Tôi đang cố gắng suy nghĩ giải pháp cho việc này", "Nhờ anh xem qua báo cáo giúp tôi nhé", "Anh ta tiêu tiền như nước")...'
                      rows={3}
                      className="w-full p-4 bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors"
                    />

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                        <span className="text-slate-400 font-medium">Gợi ý tình huống:</span>
                        {[
                          { label: 'Vắt óc suy nghĩ', text: 'Tôi đang cố gắng suy nghĩ giải pháp cho vấn đề này' },
                          { label: 'Nhờ xem báo cáo', text: 'Nhờ anh xem qua bản báo cáo này giúp tôi với nhé' },
                          { label: 'Đau đầu khó xử', text: 'Tôi đang rất đau đầu không biết phải xử lý chuyện này ra sao' },
                          { label: 'Tiêu tiền như nước', text: 'Anh ta tiêu tiền như nước vào những việc vô bổ' },
                          { label: 'Không đồng ý', text: 'Về điểm này tôi không thể đồng ý với đề xuất của quý đối tác' },
                          { label: 'Xin lỗi phản hồi trễ', text: 'Thành thật xin lỗi vì tôi đã phản hồi email của anh muộn thế này' },
                        ].map((chip) => (
                          <button
                            key={chip.label}
                            type="button"
                            onClick={() => {
                              setTpoInput(chip.text);
                              handleConsultTpo(chip.text);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-emerald-950/70 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-600/60 text-slate-300 text-[11px] transition-all cursor-pointer"
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleConsultTpo()}
                        disabled={!tpoInput.trim() || isConsultingTpo}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-950 disabled:opacity-40 cursor-pointer"
                      >
                        {isConsultingTpo ? (
                          <>
                            <Sparkles className="w-4 h-4 animate-spin text-emerald-200" />
                            <span>Đang bóc tách TPO 4 bước...</span>
                          </>
                        ) : (
                          <>
                            <Compass className="w-4 h-4 text-emerald-200" />
                            <span>Thực thi Chuỗi Phân Tích 4 Bước</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* TPO CONSULTATION RESULT */}
                {tpoResult && (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    {/* BƯỚC 1: CẢNH BÁO TIẾNG NHẬT BỒI & COLLOCATION THAY THẾ */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Cảnh báo Dịch Thô */}
                      <div className="bg-rose-950/30 border border-rose-800/50 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          <span>⚠️ BƯỚC 1: CẢNH BÁO TIẾNG NHẬT BỒI (LỖI WORD-BY-WORD)</span>
                        </div>
                        <p className="text-xs text-rose-200 leading-relaxed font-sans bg-rose-950/50 p-3 rounded-xl border border-rose-900/40">
                          {tpoResult.literalWordByWordWarning}
                        </p>
                        <div className="text-[11px] text-slate-400 space-y-1">
                          <span className="text-slate-400 font-semibold">Ý định gốc: </span>
                          <span className="text-slate-200 italic">&ldquo;{tpoResult.userIdea}&rdquo;</span>
                        </div>
                      </div>

                      {/* Lắp Ghép Collocation Bản Xứ */}
                      <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                            <Target className="w-4 h-4" />
                            <span>🧩 BƯỚC 2: LẮP GHÉP COLLOCATION BẢN XỨ</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 font-semibold border border-emerald-700/50">
                            Chuẩn 100% Native
                          </span>
                        </div>
                        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-emerald-900/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-bold text-emerald-300 tracking-wide font-japanese">
                                {tpoResult.collocationReplacement.nativeCollocation}
                              </span>
                              <span className="text-xs text-slate-400 ml-2 font-japanese">
                                【{tpoResult.collocationReplacement.reading}】
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => speechService.speakJapanese(tpoResult.collocationReplacement.nativeCollocation)}
                              className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-800/80 text-emerald-300 border border-emerald-700/50 cursor-pointer"
                              title="Nghe phát âm Collocation"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-xs text-emerald-200/90 font-mono">
                            Romaji: {tpoResult.collocationReplacement.romaji}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-2">
                            {tpoResult.collocationReplacement.explanation}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* BƯỚC 3: MA TRẬN PHÂN NHÁNH 3 TẦNG TPO */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Compass className="w-4 h-4 text-emerald-400" />
                          <span>🧭 BƯỚC 3: MA TRẬN PHÂN NHÁNH TPO (3 PHIÊN BẢN ĐA TẦNG)</span>
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          Rạch ròi Văn nói (Kougo) vs Văn viết (Kakikotoba)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Tầng 1: Tameguchi */}
                        <div className="bg-slate-950 border border-sky-900/50 rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-sky-700/70 transition-colors">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800/60 font-bold">
                                👦 Suồng sã đời sống (Tameguchi)
                              </span>
                              <button
                                type="button"
                                onClick={() => speechService.speakJapanese(tpoResult.tpoVersions.tameguchi.japanese)}
                                className="p-1 rounded-md text-sky-400 hover:bg-sky-950 cursor-pointer"
                                title="Nghe câu"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-sm font-bold text-white font-japanese leading-relaxed">
                              {tpoResult.tpoVersions.tameguchi.japanese}
                            </div>
                            <div className="text-xs text-sky-200/80 font-mono">
                              {tpoResult.tpoVersions.tameguchi.romaji}
                            </div>
                            <div className="text-xs text-slate-300 leading-normal">
                              {tpoResult.tpoVersions.tameguchi.vietnamese}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
                            <div className="text-slate-400">
                              <span className="text-sky-400 font-semibold">TPO: </span>
                              {tpoResult.tpoVersions.tameguchi.tpoContext}
                            </div>
                            {tpoResult.tpoVersions.tameguchi.sentenceEndingParticles && (
                              <div className="text-sky-300 bg-sky-950/60 px-2 py-1 rounded border border-sky-900/40">
                                💬 Trợ từ tình thái: {tpoResult.tpoVersions.tameguchi.sentenceEndingParticles}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Tầng 2: Teineigo */}
                        <div className="bg-slate-950 border border-indigo-900/50 rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-indigo-700/70 transition-colors">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-bold">
                                👔 Lịch sự tiêu chuẩn (Teineigo)
                              </span>
                              <button
                                type="button"
                                onClick={() => speechService.speakJapanese(tpoResult.tpoVersions.teineigo.japanese)}
                                className="p-1 rounded-md text-indigo-400 hover:bg-indigo-950 cursor-pointer"
                                title="Nghe câu"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-sm font-bold text-white font-japanese leading-relaxed">
                              {tpoResult.tpoVersions.teineigo.japanese}
                            </div>
                            <div className="text-xs text-indigo-200/80 font-mono">
                              {tpoResult.tpoVersions.teineigo.romaji}
                            </div>
                            <div className="text-xs text-slate-300 leading-normal">
                              {tpoResult.tpoVersions.teineigo.vietnamese}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
                            <div className="text-slate-400">
                              <span className="text-indigo-400 font-semibold">TPO: </span>
                              {tpoResult.tpoVersions.teineigo.tpoContext}
                            </div>
                            {tpoResult.tpoVersions.teineigo.sentenceEndingParticles && (
                              <div className="text-indigo-300 bg-indigo-950/60 px-2 py-1 rounded border border-indigo-900/40">
                                💬 Trợ từ lịch thiệp: {tpoResult.tpoVersions.teineigo.sentenceEndingParticles}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Tầng 3: Keigo Kakikotoba */}
                        <div className="bg-slate-950 border border-amber-900/50 rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-amber-700/70 transition-colors">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/60 font-bold">
                                🏢 Công sở B2B / Viết (Keigo)
                              </span>
                              <button
                                type="button"
                                onClick={() => speechService.speakJapanese(tpoResult.tpoVersions.keigoKakikotoba.japanese)}
                                className="p-1 rounded-md text-amber-400 hover:bg-amber-950 cursor-pointer"
                                title="Nghe câu"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-sm font-bold text-white font-japanese leading-relaxed">
                              {tpoResult.tpoVersions.keigoKakikotoba.japanese}
                            </div>
                            <div className="text-xs text-amber-200/80 font-mono">
                              {tpoResult.tpoVersions.keigoKakikotoba.romaji}
                            </div>
                            <div className="text-xs text-slate-300 leading-normal">
                              {tpoResult.tpoVersions.keigoKakikotoba.vietnamese}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
                            <div className="text-slate-400">
                              <span className="text-amber-400 font-semibold">TPO: </span>
                              {tpoResult.tpoVersions.keigoKakikotoba.tpoContext}
                            </div>
                            {tpoResult.tpoVersions.keigoKakikotoba.aizuchiOrCushion && (
                              <div className="text-amber-300 bg-amber-950/60 px-2 py-1 rounded border border-amber-900/40">
                                🛡️ Cushion Kotoba: {tpoResult.tpoVersions.keigoKakikotoba.aizuchiOrCushion}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BƯỚC 4: GIẢI MÃ SẮC THÁI CẢM XÚC & BỘ LỌC KIỂM CHỨNG THỰC TẾ */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Sắc thái Nuance & Uekara Mesen */}
                      <div className="bg-slate-900/80 border border-purple-900/50 rounded-2xl p-5 space-y-2">
                        <div className="flex items-center gap-2 text-purple-300 font-bold text-xs sm:text-sm">
                          <Lightbulb className="w-4 h-4 text-purple-400" />
                          <span>🎭 BƯỚC 4A: GIẢI MÃ SẮC THÁI & CHỐNG THẤT LỄ (UEKARA MESEN)</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {tpoResult.nuanceSoul}
                        </p>
                      </div>

                      {/* Kiểm chứng Thực tế & Mã gen tâm lý */}
                      <div className="bg-slate-900/80 border border-emerald-900/50 rounded-2xl p-5 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs sm:text-sm">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>🛡️ BƯỚC 4B: KIỂM CHỨNG THỰC TẾ BẢN XỨ & MÃ GEN TÂM LÝ</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {tpoResult.nativeRealityCheck}
                        </p>
                        <div className="text-xs text-emerald-200/90 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/40">
                          {tpoResult.psychologicalInsight}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* SUB-TAB 1: SENTENCE DIAGNOSIS CLINIC */}
            {clinicSubTab === 'diagnosis' && (
              <>
                <div className="bg-slate-900/80 border border-indigo-900/40 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-indigo-400" />
                      Bác Sĩ Giám Định Câu Văn & Kính Ngữ Công Sở
                    </h3>
                    <p className="text-xs text-slate-300">
                      Nhập câu tiếng Nhật bạn tự viết (Email công việc, câu giao tiếp, bài tập ngữ pháp). Giáo sư sẽ "khám bệnh", chấm điểm độ tự nhiên chuẩn bản xứ và viết lại phiên bản hoàn mỹ nhất.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <textarea
                      value={clinicInput}
                      onChange={(e) => setClinicInput(e.target.value)}
                      placeholder="Ví dụ: 明日、田中社長は会社に来ますか？ (Hoặc câu tiếng Nhật bạn tự viết...)"
                      rows={3}
                      className="w-full p-4 bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors"
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="text-slate-400">Gợi ý thử nghiệm:</span>
                        <button
                          onClick={() =>
                            setClinicInput(
                              '私は明日の会議で企画書を社長にお見せさせていただきます。'
                            )
                          }
                          className="text-indigo-400 hover:underline cursor-pointer"
                        >
                          Bẫy Kính ngữ kép
                        </button>
                        <span>·</span>
                        <button
                          onClick={() => setClinicInput('先生、明日は私の家へ来てくれますか？')}
                          className="text-indigo-400 hover:underline cursor-pointer"
                        >
                          Bẫy Thể nhờ vả
                        </button>
                      </div>

                      <button
                        onClick={handleDiagnoseSentence}
                        disabled={!clinicInput.trim() || isDiagnosing}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg disabled:opacity-40 cursor-pointer"
                      >
                        {isDiagnosing ? (
                          <>
                            <Sparkles className="w-4 h-4 animate-spin" />
                            <span>Đang thẩm định...</span>
                          </>
                        ) : (
                          <>
                            <Stethoscope className="w-4 h-4" />
                            <span>Giám định câu văn</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Diagnosis Result Card */}
                {diagnosisResult && (
                  <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-6 sm:p-7 space-y-6 shadow-2xl animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-400">Kết luận tổng quát:</span>
                        <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {diagnosisResult.overallVerdict}
                          </span>
                        </h4>
                      </div>

                      {/* 3 Metrics Scores */}
                      <div className="flex items-center gap-3">
                        <div className="text-center px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-base font-extrabold text-emerald-400">
                            {diagnosisResult.grammarScore}
                          </div>
                          <div className="text-[10px] text-slate-400">Ngữ pháp</div>
                        </div>
                        <div className="text-center px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-base font-extrabold text-indigo-400">
                            {diagnosisResult.naturalnessScore}
                          </div>
                          <div className="text-[10px] text-slate-400">Độ tự nhiên</div>
                        </div>
                        <div className="text-center px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-base font-extrabold text-amber-400">
                            {diagnosisResult.registerScore}
                          </div>
                          <div className="text-[10px] text-slate-400">Kính ngữ / Xã hội</div>
                        </div>
                      </div>
                    </div>

                    {/* Native Refactored Version */}
                    <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                          <Check className="w-4 h-4" /> Phiên bản chuẩn xác & tự nhiên nhất của người bản xứ:
                        </span>
                        <button
                          onClick={() => handleSpeak(diagnosisResult.nativeRefactoredVersion)}
                          className="p-1 rounded text-emerald-300 hover:text-white cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white font-jp">
                        {diagnosisResult.nativeRefactoredVersion}
                      </div>
                      {diagnosisResult.readingFurigana && (
                        <div className="text-xs font-mono text-emerald-300/80">
                          {diagnosisResult.readingFurigana}
                        </div>
                      )}
                      <div className="text-xs sm:text-sm text-slate-300 pt-1 border-t border-emerald-900/40">
                        <strong className="text-emerald-400">Ý nghĩa: </strong>
                        {diagnosisResult.vietnameseMeaning}
                      </div>
                    </div>

                    {/* Detailed Critique Points */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                        Nhận xét chi tiết từ Bác sĩ câu văn:
                      </span>
                      <div className="space-y-2">
                        {diagnosisResult.detailedCritique.map((critique, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{critique}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Academic Notes */}
                    <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs sm:text-sm text-indigo-200 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="text-white">Lời khuyên nâng cao: </strong>
                        {diagnosisResult.academicNotes}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* SUB-TAB 2: 4-TIER KEIGO MATRIX TRANSFORMER (BỘ CHUYỂN ĐỔI KÍNH NGỮ 4 TẦNG) */}
            {clinicSubTab === 'keigo_transformer' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="bg-slate-900/80 border border-amber-900/40 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-amber-400" />
                      Bộ Chuyển Đổi Kính Ngữ 4 Tầng Công Sở & Thương Mại B2B
                    </h3>
                    <p className="text-xs text-slate-300">
                      Nhập bất kỳ câu tiếng Nhật nào (khẩu ngữ, thông thường hoặc câu lịch sự). Sensei sẽ tự động phân giải cấu trúc và chuyển đổi sang 4 tầng giao tiếp chuẩn Nhật: Thể Thường (Tameguchi), Thể Lịch Sự (Teineigo), Tôn Kính Ngữ (Sonkeigo - Khách hàng/Đối tác), và Khiêm Nhường Ngữ (Kenjougo - Hạ mình). Kèm theo cảnh báo bẫy Kính ngữ kép (二重敬語) và cẩm nang ứng xử công ty Nhật.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <textarea
                      value={keigoInput}
                      onChange={(e) => setKeigoInput(e.target.value)}
                      placeholder="Ví dụ: 明日、企画書を送ります hoặc 田中社長が来ます hoặc これを見てください..."
                      rows={3}
                      className="w-full p-4 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors font-jp"
                    />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="text-slate-400">Câu mẫu kiểm tra:</span>
                        {[
                          '明日行きます',
                          'これを見てください',
                          '分かりました',
                          '社長は何時に来ますか？',
                        ].map((sample) => (
                          <button
                            key={sample}
                            type="button"
                            onClick={() => {
                              setKeigoInput(sample);
                              handleTransformKeigo(sample);
                            }}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-slate-700 transition-colors cursor-pointer font-jp text-[11px]"
                          >
                            {sample}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handleTransformKeigo()}
                        disabled={!keigoInput.trim() || isTransformingKeigo}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg disabled:opacity-40 cursor-pointer shrink-0"
                      >
                        {isTransformingKeigo ? (
                          <>
                            <Sparkles className="w-4 h-4 animate-spin" />
                            <span>Đang chuyển đổi 4 tầng...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4" />
                            <span>Chuyển Đổi Kính Ngữ 4 Tầng</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Transformer Result Cards */}
                {keigoResult && (
                  <div className="space-y-5 animate-fadeIn">
                    {/* Source sentence header */}
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-xs text-slate-400">Câu gốc được phân tích:</span>
                        <div className="text-base font-bold text-white font-jp">
                          {keigoResult.originalSentence}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                          Chuẩn hóa 4 Tầng Kính Ngữ B2B
                        </span>
                      </div>
                    </div>

                    {/* 4 Tiers Matrix Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* TIER 1: TAMEGUCHI */}
                      <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-400" />
                            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                              1. Thể Thân Mật / Bạn Bè (ため口)
                            </span>
                          </div>
                          <button
                            onClick={() => handleSpeak(keigoResult.tameguchi.japanese)}
                            className="p-1 rounded text-emerald-400 hover:text-white hover:bg-emerald-900/40 cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-lg font-bold text-white font-jp">
                          {keigoResult.tameguchi.japanese}
                        </div>
                        {keigoResult.tameguchi.romaji && (
                          <div className="text-xs font-mono text-emerald-300/80">
                            {keigoResult.tameguchi.romaji}
                          </div>
                        )}
                        <div className="text-xs text-slate-300">
                          <strong className="text-emerald-400">Nghĩa: </strong>
                          {keigoResult.tameguchi.vietnamese}
                        </div>
                        <div className="text-[11px] p-2 rounded-lg bg-slate-950/70 border border-emerald-900/30 text-emerald-200/90 leading-relaxed">
                          <strong>Ngữ cảnh: </strong>
                          {keigoResult.tameguchi.situation}
                        </div>
                      </div>

                      {/* TIER 2: TEINEIGO */}
                      <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-800/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-400" />
                            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-300">
                              2. Thể Lịch Sự Chuẩn Mực (丁寧語)
                            </span>
                          </div>
                          <button
                            onClick={() => handleSpeak(keigoResult.teineigo.japanese)}
                            className="p-1 rounded text-blue-400 hover:text-white hover:bg-blue-900/40 cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-lg font-bold text-white font-jp">
                          {keigoResult.teineigo.japanese}
                        </div>
                        {keigoResult.teineigo.romaji && (
                          <div className="text-xs font-mono text-blue-300/80">
                            {keigoResult.teineigo.romaji}
                          </div>
                        )}
                        <div className="text-xs text-slate-300">
                          <strong className="text-blue-400">Nghĩa: </strong>
                          {keigoResult.teineigo.vietnamese}
                        </div>
                        <div className="text-[11px] p-2 rounded-lg bg-slate-950/70 border border-blue-900/30 text-blue-200/90 leading-relaxed">
                          <strong>Ngữ cảnh: </strong>
                          {keigoResult.teineigo.situation}
                        </div>
                      </div>

                      {/* TIER 3: SONKEIGO */}
                      <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-800/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-purple-400" />
                            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-300">
                              3. Tôn Kính Ngữ (尊敬語 · Đối tác / Cấp trên)
                            </span>
                          </div>
                          <button
                            onClick={() => handleSpeak(keigoResult.sonkeigo.japanese)}
                            className="p-1 rounded text-purple-400 hover:text-white hover:bg-purple-900/40 cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-lg font-bold text-white font-jp">
                          {keigoResult.sonkeigo.japanese}
                        </div>
                        {keigoResult.sonkeigo.romaji && (
                          <div className="text-xs font-mono text-purple-300/80">
                            {keigoResult.sonkeigo.romaji}
                          </div>
                        )}
                        <div className="text-xs text-slate-300">
                          <strong className="text-purple-400">Nghĩa: </strong>
                          {keigoResult.sonkeigo.vietnamese}
                        </div>
                        <div className="text-[11px] p-2 rounded-lg bg-slate-950/70 border border-purple-900/30 text-purple-200/90 leading-relaxed">
                          <strong>Ngữ cảnh: </strong>
                          {keigoResult.sonkeigo.situation}
                        </div>
                      </div>

                      {/* TIER 4: KENJOUGO */}
                      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-amber-400" />
                            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                              4. Khiêm Nhường Ngữ (謙譲語 · Hạ mình / Công ty mình)
                            </span>
                          </div>
                          <button
                            onClick={() => handleSpeak(keigoResult.kenjougo.japanese)}
                            className="p-1 rounded text-amber-400 hover:text-white hover:bg-amber-900/40 cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-lg font-bold text-white font-jp">
                          {keigoResult.kenjougo.japanese}
                        </div>
                        {keigoResult.kenjougo.romaji && (
                          <div className="text-xs font-mono text-amber-300/80">
                            {keigoResult.kenjougo.romaji}
                          </div>
                        )}
                        <div className="text-xs text-slate-300">
                          <strong className="text-amber-400">Nghĩa: </strong>
                          {keigoResult.kenjougo.vietnamese}
                        </div>
                        <div className="text-[11px] p-2 rounded-lg bg-slate-950/70 border border-amber-900/30 text-amber-200/90 leading-relaxed">
                          <strong>Ngữ cảnh: </strong>
                          {keigoResult.kenjougo.situation}
                        </div>
                      </div>
                    </div>

                    {/* Trap Warning & Business Etiquette */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-1.5 text-xs">
                        <div className="font-bold text-rose-300 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>Cảnh Báo Bẫy Kính Ngữ Kép (二重敬語):</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {keigoResult.doubleKeigoTrapWarning}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 space-y-1.5 text-xs">
                        <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                          <Landmark className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>Quy Tắc Ứng Xử Doanh Nghiệp Chuẩn Nhật:</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {keigoResult.yamatoEtiquetteRule}
                        </p>
                      </div>
                    </div>

                    {/* Quick Ask Sensei about this keigo */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => {
                          setActiveTab('chat');
                          handleSendMessage(
                            `Sensei hãy giảng giải chi tiết về sự khác nhau và cách dùng trong mail kinh doanh của 4 dạng kính ngữ: "${keigoResult.tameguchi.japanese}" vs "${keigoResult.sonkeigo.japanese}" vs "${keigoResult.kenjougo.japanese}"`
                          );
                        }}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Hỏi Sensei mở rộng về kính ngữ câu này</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SUPER ENGINE 1: LIVE VOICE ROLEPLAY & TPO SCANNER */}
        {activeTab === 'voice_roleplay' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#060a14]">
            <AiSenseiVoiceRoleplayTab />
          </div>
        )}

        {/* SUPER ENGINE 2: SMART DOCUMENT READER & TATEMAE DECODER */}
        {activeTab === 'smart_reader' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#060a14]">
            <AiSenseiSmartReaderTab />
          </div>
        )}

        {/* SUPER ENGINE 3: BUSINESS EMAIL & CUSHION KOTOBA DRAFTER */}
        {activeTab === 'b2b_email' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#060a14]">
            <AiSenseiB2bEmailTab />
          </div>
        )}

        {/* SUPER ENGINE 4: ADAPTIVE JLPT MOCK TEST & WEAKNESS X-RAY */}
        {activeTab === 'adaptive_jlpt' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#060a14]">
            <AiSenseiAdaptiveJlptTab initialLevel={senseiLevel} />
          </div>
        )}

        {/* SUPER ENGINE 5: KANJI MNEMONIC & VISUAL STORY CRAFTER */}
        {activeTab === 'kanji_mnemonic' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#060a14]">
            <AiSenseiKanjiMnemonicTab />
          </div>
        )}

        {/* SUPER ENGINE 6: PITCH ACCENT WAVEFORM SCORER */}
        {activeTab === 'pitch_coach' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#060a14]">
            <AiSenseiPitchCoachTab />
          </div>
        )}

        {/* SUPER ENGINE 7: CONTRASTIVE TRANSLATION STUDIO */}
        {activeTab === 'translation_lab' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#060a14]">
            <AiSenseiTranslationLabTab />
          </div>
        )}

        {/* SUPER ENGINE 8: OMNI-CONTEXT COLLOCATION PROJECTION ENGINE */}
        {activeTab === 'context_collocation' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#060a14]">
            <OmniContextCollocationBoard
              currentLevel={senseiLevel}
              initialContext={initialTab === 'context_collocation' && initialQuery ? initialQuery : 'Đi chợ'}
              onAskAiSensei={(q) => {
                setActiveTab('chat');
                handleSendMessage(q);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
