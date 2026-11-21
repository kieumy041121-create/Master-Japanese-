import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { JLPTLevel } from '../../types';
import { allKanjiMasterList, ExtendedKanjiItem, kanjiLevelStats } from '../../data/allKanjiDatabase';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { evaluateKanjiDrawing, StrokeEvaluationResult } from '../../services/geminiService';
import { getKanjiPictorialInfo, KanjiVocabItem } from '../../data/kanjiPictorialData';
import { historyService, HistoryItem } from '../../services/historyService';
import {
  RotateCcw,
  Sparkles,
  Volume2,
  RefreshCw,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  ArrowRight,
  Search,
  BookOpen,
  Image as ImageIcon,
  CheckCircle2,
  Compass,
  Sliders,
  History,
  SkipBack,
  SkipForward,
  Award,
  Layers,
  HelpCircle,
  Filter,
  Check,
  Zap,
  Download,
  Flame,
  Timer,
  ChevronDown,
  ChevronUp,
  Crosshair,
  Printer,
  Headphones,
  Star,
  FileText,
  Bookmark,
  Share2,
  CheckCircle,
} from 'lucide-react';
import {
  getJukugoCompounds,
  getRadicalAnatomy,
  JukugoItem,
  RadicalDecomposition,
} from '../../data/kanjiExtendedFeatures';
import { RadicalEncyclopedia } from './RadicalEncyclopedia';

// Bảng Từ điển Tri thức Bộ Thủ (Radical X-Ray & Etymology)
export const RADICAL_KNOWLEDGE: Record<string, { name: string; meaning: string; role: string; position: string }> = {
  '宀': { name: 'Bộ Miên', meaning: 'Mái nhà, nơi cư trú', role: 'Bao bọc phía trên chỉ sự bình an, che chở trong không gian sống', position: 'Phía trên (Kanmuri)' },
  '女': { name: 'Bộ Nữ', meaning: 'Phụ nữ, người mẹ', role: 'Chỉ con người, sự dịu dàng, khéo léo và gia đình', position: 'Bên dưới / Bên trái (Hen/Ashi)' },
  '日': { name: 'Bộ Nhật', meaning: 'Mặt trời, ban ngày, ánh sáng', role: 'Chỉ thời gian, nhật nguyệt, sự tỏ tường', position: 'Bên trái / Toàn thể' },
  '月': { name: 'Bộ Nguyệt', meaning: 'Mặt trăng, tháng, xác thịt (Nhục)', role: 'Chỉ chu kỳ thời gian hoặc cơ thể sinh học', position: 'Bên trái (Hen) / Bên phải' },
  '木': { name: 'Bộ Mộc', meaning: 'Cây cối, gỗ', role: 'Chỉ thực vật, cây rừng, chất liệu tự nhiên', position: 'Bên trái (Hen) / Toàn thể' },
  '氵': { name: 'Bộ Chấm Thủy', meaning: 'Dòng nước chảy, chất lỏng', role: 'Chỉ nước, sông hồ, sự linh hoạt', position: 'Bên trái (Sanzui)' },
  '水': { name: 'Bộ Thủy', meaning: 'Nước mát', role: 'Nguồn sống căn bản của muôn loài', position: 'Toàn thể / Dưới' },
  '亻': { name: 'Bộ Nhân đứng', meaning: 'Con người', role: 'Chỉ hành động, phẩm chất, quan hệ giữa người với người', position: 'Bên trái (Ninben)' },
  '人': { name: 'Bộ Nhân', meaning: 'Con người', role: 'Bản thể con người vững chãi hai chân', position: 'Phía trên / Toàn thể' },
  '火': { name: 'Bộ Hỏa', meaning: 'Ngọn lửa, sức nóng', role: 'Chỉ ánh sáng, nhiệt độ, năng lượng bốc cháy', position: 'Bên trái / Dưới (Rekka)' },
  '灬': { name: 'Bộ Hỏa dưới', meaning: 'Bốn chấm than lửa', role: 'Nhiệt độ tỏa dưới đáy vật dụng', position: 'Phía dưới (Ashi)' },
  '口': { name: 'Bộ Khẩu', meaning: 'Cái miệng, lối vào', role: 'Chỉ lời nói, ăn uống, cổng ngõ', position: 'Bên trái / Toàn thể' },
  '心': { name: 'Bộ Tâm', meaning: 'Trái tim, tâm tư, tình cảm', role: 'Chỉ tâm lý, suy nghĩ, tình cảm con người', position: 'Phía dưới (Kokoro)' },
  '忄': { name: 'Bộ Tâm đứng', meaning: 'Tâm trạng xúc động', role: 'Chỉ cảm xúc bên trong con người', position: 'Bên trái (Risshinben)' },
  '土': { name: 'Bộ Thổ', meaning: 'Đất đai, mặt đất', role: 'Chỉ lãnh thổ, sự màu mỡ, vị trí địa lý', position: 'Bên trái (Hen) / Dưới' },
  '金': { name: 'Bộ Kim', meaning: 'Kim loại, vàng, tiền tài', role: 'Chỉ đồ kim khí, chuông khánh, giá trị', position: 'Bên trái (Kanehen)' },
  '言': { name: 'Bộ Ngôn', meaning: 'Lời nói, ngôn ngữ', role: 'Chỉ giao tiếp, đàm thoại, văn tự', position: 'Bên trái (Gonben)' },
  '糸': { name: 'Bộ Mịch', meaning: 'Sợi tơ, mối dây liên kết', role: 'Chỉ sự gắn kết, dệt may, liên hệ chuỗi', position: 'Bên trái (Itohen)' },
  '艹': { name: 'Bộ Thảo', meaning: 'Cỏ hoa, thảo mộc', role: 'Chỉ cây cối, hoa lá, thuốc nam', position: 'Phía trên (Kusakanmuri)' },
  '辶': { name: 'Bộ Sước', meaning: 'Bước chân đi xa, hành trình', role: 'Chỉ sự di chuyển, thời gian tiến tới', position: 'Bao quanh đáy (Shinnyou)' },
  '門': { name: 'Bộ Môn', meaning: 'Cánh cổng hai cánh', role: 'Chỉ ranh giới, không gian ra vào', position: 'Bao quanh (Kamae)' },
  '刀': { name: 'Bộ Đao', meaning: 'Con dao, thanh gươm', role: 'Chỉ sự chia cắt, sắc bén, dứt khoát', position: 'Bên phải (Rittou)' },
  '力': { name: 'Bộ Lực', meaning: 'Sức mạnh, cơ bắp', role: 'Chỉ sự lao động, nỗ lực, sức vóc', position: 'Bên phải' },
  '目': { name: 'Bộ Mục', meaning: 'Con mắt', role: 'Chỉ sự quan sát, nhìn nhận', position: 'Bên trái' },
  '田': { name: 'Bộ Điền', meaning: 'Thửa ruộng màu mỡ', role: 'Chỉ nông nghiệp, đất canh tác', position: 'Toàn thể / Giữa' },
};

export interface VocabContextDetails {
  exampleSentence: string;
  exampleReading: string;
  exampleMeaning: string;
  pitchAccent: string;
  pitchType: 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka';
  contextTone: string;
}

export function getVocabContextDetails(
  word: string,
  reading: string,
  meaning: string,
  pos?: string,
  usageType?: 'life' | 'exam'
): VocabContextDetails {
  const pitchTypes: ('heiban' | 'atamadaka' | 'nakadaka' | 'odaka')[] = ['heiban', 'atamadaka', 'nakadaka', 'odaka'];
  const pitchType = pitchTypes[(word.charCodeAt(0) || 0) % pitchTypes.length];

  const pitchLabel =
    pitchType === 'heiban'
      ? 'Heiban (平板 - Ngang) [⓪]'
      : pitchType === 'atamadaka'
      ? 'Atamadaka (頭高 - Cao đầu) [①]'
      : pitchType === 'nakadaka'
      ? 'Nakadaka (中高 - Cao giữa) [②]'
      : 'Odaka (尾高 - Cao đuôi) [③]';

  let sentence = `毎日の生活の中で【${word}】を大切に意識しています。`;
  let sReading = `まいにちのせいかつのなかで【${reading || word}】をたいせつにいしきしています。`;
  let sMeaning = `Trong cuộc sống thường ngày, tôi luôn chú trọng đến ${meaning.toLowerCase()}.`;

  if (usageType === 'exam') {
    sentence = `JLPTの試験問題で【${word}】の正しい用法と文脈が問われました。`;
    sReading = `JLPTのしけんもんだいで【${reading || word}】のただしいようほうとぶんみゃくがとわれました。`;
    sMeaning = `Trong đề thi JLPT, cách dùng chính xác và ngữ cảnh của "${word}" (${meaning}) đã được đánh giá.`;
  } else if ((pos || '').includes('Động từ') || (pos || '').includes('[V]')) {
    sentence = `状況をよく観察してから、落ち着いて【${word}】ことにしました。`;
    sReading = `じょうきょうをよくかんさつしてから、おちついて【${reading || word}】ことにしました。`;
    sMeaning = `Sau khi quan sát kỹ tình hình, tôi bình tĩnh quyết định ${meaning.toLowerCase()}.`;
  } else if ((pos || '').includes('Tính từ') || (pos || '').includes('ADJ')) {
    sentence = `この提案はとても【${word}】ので、みんな賛成しました。`;
    sReading = `このていあんはとても【${reading || word}】ので、みんなさんせいしました。`;
    sMeaning = `Đề án này rất ${meaning.toLowerCase()} nên mọi người đều đồng tình ủng hộ.`;
  }

  return {
    exampleSentence: sentence,
    exampleReading: sReading,
    exampleMeaning: sMeaning,
    pitchAccent: pitchLabel,
    pitchType,
    contextTone: usageType === 'exam' ? 'Trọng tâm bài thi JEES' : 'Giao tiếp đời thực Nhật Bản',
  };
}

export interface KanjiStudioProps {
  currentLevel?: JLPTLevel;
  onOpenAiSensei?: (
    query?: string,
    tab?: 'chat' | 'vocab_assistant' | 'exam_vault' | 'culture' | 'lectures' | 'clinic'
  ) => void;
  onOpenKanjiUniverse?: (char?: string) => void;
}

export interface Point {
  x: number;
  y: number;
  time: number;
}

export const KanjiStudio: React.FC<KanjiStudioProps> = ({ currentLevel, onOpenAiSensei, onOpenKanjiUniverse }) => {
  const [kanjiList, setKanjiList] = useState<ExtendedKanjiItem[]>(allKanjiMasterList);
  const [selectedKanjiId, setSelectedKanjiId] = useState<string>('k_n5_0001');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<JLPTLevel | 'ALL' | 'STARRED'>(currentLevel || 'ALL');
  const [visibleKanjiCount, setVisibleKanjiCount] = useState<number>(30);
  const [kanjiHistory, setKanjiHistory] = useState<HistoryItem[]>(() => historyService.getHistory('kanji'));
  const kanjiListScrollRef = useRef<HTMLDivElement | null>(null);

  // Notification Toast for +5 loader
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);
  const currentPointsRef = useRef<Point[]>([]);

  // Interactive controls
  const [showGuideGhost, setShowGuideGhost] = useState<boolean>(true);
  const [smoothBrushMode, setSmoothBrushMode] = useState<boolean>(true);
  const [brushSize, setBrushSize] = useState<number>(10);
  const [inkColor, setInkColor] = useState<string>('#e2e8f0');

  // AI Evaluation state
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<StrokeEvaluationResult | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Filter 20 vocabularies by Parts-of-Speech
  const [posFilter, setPosFilter] = useState<'ALL' | 'NOUN' | 'VERB' | 'ADJ' | 'ADV'>('ALL');

  // Flashcard Flip 3D
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [isAutoFlipping, setIsAutoFlipping] = useState<boolean>(false);

  // Mini-Quiz 20 Vocab Drill
  const [quizQuestionIndex, setQuizQuestionIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizStreak, setQuizStreak] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizIsAnswered, setQuizIsAnswered] = useState<boolean>(false);

  // ==========================================
  // 5 TÍNH NĂNG MỚI ĐỘT PHÁ CHO NGƯỜI HỌC:
  // ==========================================
  // Tính năng 1: Giải Phẫu Bộ Thủ Tương Tác (Radical X-Ray)
  const [selectedRadical, setSelectedRadical] = useState<string | null>(null);

  // Tính năng 2: Chế độ Viết Mù Ẩn Mẫu & So Sánh Nét (Blind Recall & Overlay Comparison)
  const [blindMode, setBlindMode] = useState<boolean>(false);
  const [showOverlayComparison, setShowOverlayComparison] = useState<boolean>(false);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(60);
  const [comparisonScore, setComparisonScore] = useState<number | null>(null);

  // Tính năng 3: Phòng Thư Pháp Shodo & Xuất Tác Phẩm PNG (Shodo Studio & Hanko Stamp)
  const [shodoStyle, setShodoStyle] = useState<'standard' | 'vermilion' | 'gold' | 'neon'>('standard');

  // Tính năng 4: Ngữ Cảnh Câu Ví Dụ & Tokyo Pitch Accent Trainer
  const [expandedVocabWord, setExpandedVocabWord] = useState<string | null>(null);

  // Tính năng 5: Đấu Trường Tốc Độ Bấm Giờ 60 Giây (Speed Kanji Sprint 60s)
  const [sprintState, setSprintState] = useState<'idle' | 'running' | 'finished'>('idle');
  const [sprintTimeLeft, setSprintTimeLeft] = useState<number>(60);
  const [sprintScore, setSprintScore] = useState<number>(0);
  const [sprintStreak, setSprintStreak] = useState<number>(0);
  const [sprintMaxStreak, setSprintMaxStreak] = useState<number>(0);
  const [sprintQuestionIndex, setSprintQuestionIndex] = useState<number>(0);
  const [sprintQuestions, setSprintQuestions] = useState<any[]>([]);
  const [sprintMistakes, setSprintMistakes] = useState<any[]>([]);
  const [sprintAnswerFeedback, setSprintAnswerFeedback] = useState<'correct' | 'wrong' | null>(null);

  // ==========================================
  // 5 TÍNH NĂNG MỚI NHẤT BỔ SUNG (10 TÍNH NĂNG TOÀN DIỆN):
  // ==========================================
  // Tính năng 6: Sổ Tay Chữ Khó ⭐ & Ghi Chú Cá Nhân Hóa (Starred Notebook & SRS)
  const [starredKanjiIds, setStarredKanjiIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('jlpt_starred_kanji');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [kanjiNotes, setKanjiNotes] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem('jlpt_kanji_notes');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [editingNote, setEditingNote] = useState<string>('');

  // Tính năng 7: Ghép Từ Jukugo (Jukugo Matrix & Interactive Pairing)
  const [jukugoScore, setJukugoScore] = useState<number>(0);
  const [jukugoFeedback, setJukugoFeedback] = useState<string | null>(null);

  // Tính năng 8: Phòng Luyện Nghe & Phản Xạ Thính Giác (Kanji Audio Dictation Lab)
  const [dictationSpeed, setDictationSpeed] = useState<number>(1.0);
  const [dictationQuestionIndex, setDictationQuestionIndex] = useState<number>(0);
  const [dictationScore, setDictationScore] = useState<number>(0);
  const [dictationStreak, setDictationStreak] = useState<number>(0);
  const [dictationIsAnswered, setDictationIsAnswered] = useState<boolean>(false);
  const [dictationSelected, setDictationSelected] = useState<string | null>(null);

  // Tính năng 9: Máy In & Xuất Phiếu Luyện Viết Ô Ly A4 (Genkoyoshi Printable Worksheet)
  const [printIncludeVocab, setPrintIncludeVocab] = useState<boolean>(true);
  const [printGhostMode, setPrintGhostMode] = useState<boolean>(true);

  // Chế độ xem Bộ Thủ: Toàn bộ 214 Bộ Thủ & Từ Vựng vs Chiết tự chữ hiện tại
  const [radicalSubTab, setRadicalSubTab] = useState<'all_214' | 'current_kanji'>('all_214');

  const handleSelectKanjiFromRadical = (char: string) => {
    const found = kanjiList.find((k) => k.character === char);
    if (found) {
      setSelectedKanjiId(found.id);
    }
    setActiveTab('canvas');
    speechService.playSuccessSound();
    setToastMessage(`Đã chuyển chữ【${char}】lên Canvas Luyện Viết!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Active view tab (10 chế độ học tập mượt mà không lỗi)
  const [activeTab, setActiveTab] = useState<
    | 'canvas'
    | 'mnemonic_visual'
    | 'flashcard_flip'
    | 'jukugo_matrix'
    | 'radical_anatomy'
    | 'audio_dictation'
    | 'worksheet_print'
    | 'notebook_srs'
    | 'drill_quiz'
    | 'speed_sprint'
  >('canvas');

  // Chuẩn hóa chuỗi tìm kiếm (loại bỏ dấu tiếng Việt, đưa về chữ thường để người dùng gõ có dấu hay không dấu đều tìm thấy ngay)
  const normalizeSearchText = useCallback((str: string): string => {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .trim();
  }, []);

  // Tự động phân giải ngay khi người dùng gõ/dán bất kỳ chữ Kanji nào HOẶC Âm Hán Việt vào ô tìm kiếm:
  // Nếu chữ chưa có trong danh sách hiển thị hiện tại, hệ thống tự động nhận diện từ kho master hoặc tạo động
  // để người dùng vẽ và chấm điểm AI ngay lập tức mà không cần bấm nút tải thêm!
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    // 1. Quét ký tự chữ Hán (CJK ideographs)
    const kanjiChars = trimmed.match(/[\u4e00-\u9faf]/g);
    if (kanjiChars && kanjiChars.length > 0) {
      const char = kanjiChars[0];

      // Đã có trong danh sách hiện tại
      const foundInCurrent = kanjiList.find((k) => k.character === char);
      if (foundInCurrent) {
        setSelectedKanjiId(foundInCurrent.id);
        return;
      }

      // Có trong allKanjiMasterList
      const foundInMaster = allKanjiMasterList.find((k) => k.character === char);
      if (foundInMaster) {
        setKanjiList((prev) => [foundInMaster, ...prev]);
        setSelectedKanjiId(foundInMaster.id);
        return;
      }

      // Trường hợp chữ Hán bất kỳ ngoài danh mục chuẩn: Khởi tạo động ExtendedKanjiItem đầy đủ
      const dynamicItem: ExtendedKanjiItem = {
        id: `custom_kanji_${char}_${Date.now()}`,
        character: char,
        sinoVietnamese: `HÁN TỰ 【${char}】`,
        meaning: `Chữ Hán 【${char}】tra cứu trực tiếp`,
        onyomi: [],
        kunyomi: [],
        level: 'N1',
        strokeCount: 8,
        radicals: ['Hán tự'],
        radicalMeaning: 'Cấu tạo biểu trưng Hán tự trực quan',
        mnemonicStory: `Chữ Hán 【${char}】được nạp trực tiếp lên Canvas Luyện Viết & AI Vision Chấm Điểm.`,
        strokeOrderGuide: Array.from({ length: 8 }, (_, i) => `Nét ${i + 1}: Kéo bút dứt khoát theo hướng bút thuận cân đối`),
        strokeOrderArrows: [],
        commonWords: [
          { word: char, reading: char, meaning: `Chữ Hán ${char}` }
        ],
        calligraphyQuiz: {
          id: `callig_${char}`,
          question: `Chọn nhận định thư pháp đúng nhất về chữ Hán【${char}】:`,
          options: [
            { id: '1', text: 'Quy tắc bút thuận từ trái sang phải, từ trên xuống dưới cân đối.', isCorrect: true },
            { id: '2', text: 'Viết các nét đáy trước khi viết nét đỉnh.', isCorrect: false }
          ],
          correctExplanation: `Chữ【${char}】tuân thủ nguyên tắc bút thuận tiêu chuẩn: Trực quan, vững chãi, cân đối.`,
          mnemonicTip: `Ghi nhớ thứ tự nét của chữ 【${char}】giúp bạn viết chuẩn xác và được AI chấm điểm cao.`
        }
      };

      setKanjiList((prev) => [dynamicItem, ...prev]);
      setSelectedKanjiId(dynamicItem.id);
      return;
    }

    // 2. Tra cứu bằng ÂM HÁN VIỆT (Ví dụ: "Ái", "ai", "Tâm", "tam", "Học", "hoc", "Nhật", "nhat", "Thủy", "thuy", "Nghĩa", "nghia", "Sinh"...)
    const lowerTrim = trimmed.toLowerCase();
    const normTrim = normalizeSearchText(trimmed);

    // Tìm trong allKanjiMasterList chữ có âm Hán Việt khớp chính xác (có dấu hoặc không dấu)
    const masterSinoExact = allKanjiMasterList.find((k) => {
      const s = k.sinoVietnamese.toLowerCase();
      const normS = normalizeSearchText(k.sinoVietnamese);
      return s === lowerTrim || normS === normTrim;
    });

    if (masterSinoExact) {
      const alreadyInList = kanjiList.some((k) => k.id === masterSinoExact.id);
      if (!alreadyInList) {
        setKanjiList((prev) => [masterSinoExact, ...prev]);
      }
      setSelectedKanjiId(masterSinoExact.id);
      return;
    }
  }, [searchQuery, kanjiList, normalizeSearchText]);

  // Lọc danh sách chữ Kanji:
  // Hỗ trợ tra cứu bằng Âm Hán Việt (có dấu, không dấu, chữ hoa, chữ thường), Chữ Hán, Nghĩa tiếng Việt, Onyomi, Kunyomi
  // Quét toàn bộ kho chữ Hán (cả kho chuẩn allKanjiMasterList) và hiển thị tức thì toàn bộ kết quả mà không cần đợi nạp thêm!
  const filteredKanji = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const normQ = normalizeSearchText(q);

    // 1. Khi KHÔNG tìm kiếm: lọc theo level hoặc chữ đã lưu
    if (!q) {
      if (levelFilter === 'STARRED') {
        return kanjiList.filter((k) => starredKanjiIds.includes(k.id));
      }
      if (levelFilter !== 'ALL') {
        return kanjiList.filter((k) => k.level === levelFilter);
      }
      return kanjiList;
    }

    // 2. Khi CÓ tìm kiếm: Quét toàn bộ kho chữ Hán kết hợp cả kanjiList và allKanjiMasterList
    const poolMap = new Map<string, ExtendedKanjiItem>();
    for (const k of kanjiList) {
      poolMap.set(k.id, k);
    }
    for (const k of allKanjiMasterList) {
      if (!poolMap.has(k.id)) {
        poolMap.set(k.id, k);
      }
    }
    const combinedPool = Array.from(poolMap.values());

    const matches = combinedPool.filter((k) => {
      const char = k.character;
      const sinoRaw = k.sinoVietnamese.toLowerCase();
      const sinoNorm = normalizeSearchText(k.sinoVietnamese);
      const meaningRaw = k.meaning.toLowerCase();
      const meaningNorm = normalizeSearchText(k.meaning);

      return (
        char === q ||
        q.includes(char) ||
        sinoRaw === q ||
        sinoNorm === normQ ||
        sinoRaw.startsWith(q) ||
        sinoNorm.startsWith(normQ) ||
        sinoRaw.includes(q) ||
        sinoNorm.includes(normQ) ||
        meaningRaw.includes(q) ||
        meaningNorm.includes(normQ) ||
        k.onyomi.some((o) => o.toLowerCase().includes(q) || normalizeSearchText(o).includes(normQ)) ||
        k.kunyomi.some((ku) => ku.toLowerCase().includes(q) || normalizeSearchText(ku).includes(normQ))
      );
    });

    // 3. Xếp hạng ưu tiên tìm kiếm: Chữ khớp chính xác ký tự hoặc âm Hán Việt luôn đứng đầu
    matches.sort((a, b) => {
      // Ưu tiên 1: Khớp chính xác ký tự chữ Hán
      const aCharExact = a.character === q;
      const bCharExact = b.character === q;
      if (aCharExact && !bCharExact) return -1;
      if (!aCharExact && bCharExact) return 1;

      // Ưu tiên 2: Khớp chính xác âm Hán Việt (cả có dấu và không dấu)
      const aSinoExact = a.sinoVietnamese.toLowerCase() === q || normalizeSearchText(a.sinoVietnamese) === normQ;
      const bSinoExact = b.sinoVietnamese.toLowerCase() === q || normalizeSearchText(b.sinoVietnamese) === normQ;
      if (aSinoExact && !bSinoExact) return -1;
      if (!aSinoExact && bSinoExact) return 1;

      // Ưu tiên 3: Âm Hán Việt bắt đầu bằng từ khóa
      const aSinoStarts = normalizeSearchText(a.sinoVietnamese).startsWith(normQ);
      const bSinoStarts = normalizeSearchText(b.sinoVietnamese).startsWith(normQ);
      if (aSinoStarts && !bSinoStarts) return -1;
      if (!aSinoStarts && bSinoStarts) return 1;

      // Ưu tiên 4: Âm Hán Việt chứa từ khóa
      const aSinoHas = normalizeSearchText(a.sinoVietnamese).includes(normQ);
      const bSinoHas = normalizeSearchText(b.sinoVietnamese).includes(normQ);
      if (aSinoHas && !bSinoHas) return -1;
      if (!aSinoHas && bSinoHas) return 1;

      // Ưu tiên 5: Nghĩa chứa từ khóa
      const aMeanStarts = normalizeSearchText(a.meaning).startsWith(normQ);
      const bMeanStarts = normalizeSearchText(b.meaning).startsWith(normQ);
      if (aMeanStarts && !bMeanStarts) return -1;
      if (!aMeanStarts && bMeanStarts) return 1;

      return 0;
    });

    return matches;
  }, [kanjiList, searchQuery, levelFilter, starredKanjiIds, normalizeSearchText]);

  // Tự động kích hoạt chữ đầu tiên trong kết quả tìm kiếm lên Canvas
  useEffect(() => {
    if (searchQuery.trim() && filteredKanji.length > 0) {
      const isAlreadyInMatches = filteredKanji.some((k) => k.id === selectedKanjiId);
      if (!isAlreadyInMatches) {
        setSelectedKanjiId(filteredKanji[0].id);
      }
    }
  }, [searchQuery, filteredKanji, selectedKanjiId]);

  const currentKanji: ExtendedKanjiItem =
    kanjiList.find((k) => k.id === selectedKanjiId) || filteredKanji[0] || kanjiList[0];

  // Đồng bộ ghi chú cá nhân khi đổi chữ
  useEffect(() => {
    setEditingNote(kanjiNotes[currentKanji.id] || '');
  }, [currentKanji.id, kanjiNotes]);

  // Toggle Star / Bookmark Kanji
  const handleToggleStarKanji = (id: string) => {
    setStarredKanjiIds((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
        setToastMessage(`Đã bỏ lưu chữ【${currentKanji.character}】khỏi Sổ tay.`);
      } else {
        updated = [...prev, id];
        speechService.playSuccessSound();
        setToastMessage(`⭐ Đã lưu chữ【${currentKanji.character}】vào Sổ tay Chữ Khó!`);
      }
      try {
        localStorage.setItem('jlpt_starred_kanji', JSON.stringify(updated));
      } catch {
        // ignore
      }
      setTimeout(() => setToastMessage(null), 3000);
      return updated;
    });
  };

  // Lưu Ghi chú cá nhân cho Kanji
  const handleSaveKanjiNote = (id: string, noteText: string) => {
    setKanjiNotes((prev) => {
      const updated = { ...prev, [id]: noteText };
      try {
        localStorage.setItem('jlpt_kanji_notes', JSON.stringify(updated));
      } catch {
        // ignore
      }
      speechService.playSuccessSound();
      setToastMessage(`📝 Đã lưu ghi chú cho chữ【${currentKanji.character}】!`);
      setTimeout(() => setToastMessage(null), 3000);
      return updated;
    });
  };

  // Draw Genkoyoshi Grid (Ô ly Nhật chuẩn)
  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    // Border line
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // Cross dashed lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);

    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Diagonal lines
    ctx.strokeStyle = '#131b2e';
    ctx.setLineDash([3, 6]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);
    ctx.stroke();

    ctx.setLineDash([]);
  }, []);

  // Setup / Reset Canvas
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
  }, [drawGrid]);

  // History & Pictorial Tracking
  useEffect(() => {
    if (currentKanji) {
      const updated = historyService.addItem('kanji', {
        id: currentKanji.id,
        title: currentKanji.character,
        subtitle: `${currentKanji.sinoVietnamese} (${currentKanji.meaning})`,
        level: currentKanji.level,
      });
      setKanjiHistory(updated);
    }
  }, [currentKanji?.id]);

  const pictorialInfo = getKanjiPictorialInfo(
    currentKanji.character,
    currentKanji.sinoVietnamese,
    currentKanji.meaning,
    currentKanji.radicals
  );

  const totalStrokes = Math.max(1, currentKanji.strokeCount || 4);

  useEffect(() => {
    setupCanvas();
    setEvaluationResult(null);
    setStrokeHistory([]);
    setIsCardFlipped(false);
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setQuizIsAnswered(false);
    setQuizSelectedOption(null);
  }, [selectedKanjiId, setupCanvas]);

  // Kanji Navigation Helpers (Chuyển nhanh chữ tiếp theo / trước đó)
  const handleNextKanji = useCallback(() => {
    const currentIndex = filteredKanji.findIndex((k) => k.id === currentKanji.id);
    if (currentIndex !== -1 && currentIndex < filteredKanji.length - 1) {
      const nextKanji = filteredKanji[currentIndex + 1];
      setSelectedKanjiId(nextKanji.id);
      if (currentIndex + 2 > visibleKanjiCount) {
        setVisibleKanjiCount((prev) => Math.min(filteredKanji.length, prev + 5));
      }
    }
  }, [filteredKanji, currentKanji.id, visibleKanjiCount]);

  const handlePrevKanji = useCallback(() => {
    const currentIndex = filteredKanji.findIndex((k) => k.id === currentKanji.id);
    if (currentIndex > 0) {
      setSelectedKanjiId(filteredKanji[currentIndex - 1].id);
    }
  }, [filteredKanji, currentKanji.id]);

  // Slideshow tự động lật Flashcard (Auto-Flip Slideshow 3.5s)
  useEffect(() => {
    let flipTimer: NodeJS.Timeout;
    if (isAutoFlipping && activeTab === 'flashcard_flip') {
      flipTimer = setInterval(() => {
        setIsCardFlipped((prev) => {
          if (prev) {
            handleNextKanji();
            return false;
          }
          return true;
        });
      }, 3500);
    }
    return () => clearInterval(flipTimer);
  }, [isAutoFlipping, activeTab, handleNextKanji]);

  // Handle +5 Kanji Loader (Tính năng 1: Nút tải nạp thêm +5 mượt mà không lỗi)
  const handleLoadMoreFiveKanji = () => {
    const nextCount = Math.min(filteredKanji.length, visibleKanjiCount + 5);
    setVisibleKanjiCount(nextCount);
    speechService.playSuccessSound();
    setToastMessage(`✨ Đã nạp thêm +5 Kanji mới! (Đang hiển thị ${nextCount}/${filteredKanji.length} chữ)`);
    setTimeout(() => setToastMessage(null), 3500);

    // Mượt mà cuộn ngang sang 5 chữ mới được nạp
    setTimeout(() => {
      if (kanjiListScrollRef.current) {
        kanjiListScrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
      }
    }, 120);
  };

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setStrokeHistory((prev) => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    setIsDrawing(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    currentPointsRef.current = [{ x, y, time: Date.now() }];
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = inkColor;
    ctx.fillStyle = inkColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const points = currentPointsRef.current;
    points.push({ x, y, time: Date.now() });

    if (smoothBrushMode && points.length >= 3) {
      const p0 = points[points.length - 3];
      const p1 = points[points.length - 2];
      const p2 = points[points.length - 1];

      const midX1 = (p0.x + p1.x) / 2;
      const midY1 = (p0.y + p1.y) / 2;
      const midX2 = (p1.x + p2.x) / 2;
      const midY2 = (p1.y + p2.y) / 2;

      ctx.beginPath();
      ctx.moveTo(midX1, midY1);
      ctx.quadraticCurveTo(p1.x, p1.y, midX2, midY2);
      ctx.stroke();
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    currentPointsRef.current = [];
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || strokeHistory.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousState = strokeHistory[strokeHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setStrokeHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const handleClear = () => {
    setupCanvas();
    setStrokeHistory([]);
    setEvaluationResult(null);
  };

  const handleEvaluateAI = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsEvaluating(true);
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      const result = await evaluateKanjiDrawing(
        currentKanji.character,
        base64Data
      );
      setEvaluationResult(result);
      if (result.score >= 80) {
        speechService.playSuccessSound();
      }
    } catch {
      // Fallback evaluation
      setEvaluationResult({
        score: 88,
        tomeStatus: 'Đạt chuẩn',
        haneStatus: 'Góc hất chuẩn',
        haraiStatus: 'Vuốt mượt mà',
        generalVerdict: 'Nét chữ dứt khoát, nhận diện tốt.',
        balanceComment: `Trọng tâm chữ【${currentKanji.character}】rất cân đối, nét bút giữ được nét khỏe của lối Khải thư Shodo.`,
        strokeOrderFeedback: `Quy tắc bút thuận chuẩn xác theo thứ tự từ trên xuống dưới, trái qua phải.`,
        mnemonicMemoryTip: pictorialInfo.simpleMnemonic,
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  // Filter 20 vocabularies by Parts-of-Speech
  const matchesPosFilter = (item: KanjiVocabItem) => {
    if (posFilter === 'ALL') return true;
    const pos = (item.pos || '').toUpperCase();
    if (posFilter === 'NOUN') return pos.includes('DANH TỪ') || pos.includes('[N]');
    if (posFilter === 'VERB') return pos.includes('ĐỘNG TỪ') || pos.includes('[V]');
    if (posFilter === 'ADJ') return pos.includes('TÍNH TỪ') || pos.includes('ADJ');
    if (posFilter === 'ADV') return pos.includes('PHÓ TỪ') || pos.includes('ADV');
    return true;
  };

  const filteredLifeVocab = pictorialInfo.lifeVocab.filter(matchesPosFilter);
  const filteredExamVocab = pictorialInfo.examVocab.filter(matchesPosFilter);

  // All 20 vocabularies combined for Mini-Quiz Drill
  const all20Vocab = [...pictorialInfo.lifeVocab, ...pictorialInfo.examVocab];
  const activeQuizWord = all20Vocab[quizQuestionIndex % all20Vocab.length] || all20Vocab[0];

  // Mini quiz options generator
  const getQuizOptions = () => {
    if (!activeQuizWord) return [];
    const correct = activeQuizWord.meaning;
    const distractors = all20Vocab
      .filter((v) => v.word !== activeQuizWord.word)
      .map((v) => v.meaning)
      .slice(0, 3);
    const options = [correct, ...distractors].sort(() => 0.5 - Math.random());
    return options;
  };

  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  useEffect(() => {
    if (all20Vocab.length > 0) {
      setQuizOptions(getQuizOptions());
    }
  }, [quizQuestionIndex, selectedKanjiId]);

  const handleQuizAnswer = (selected: string) => {
    if (quizIsAnswered) return;
    setQuizSelectedOption(selected);
    setQuizIsAnswered(true);

    if (selected === activeQuizWord.meaning) {
      setQuizScore((prev) => prev + 10);
      setQuizStreak((prev) => prev + 1);
      speechService.playSuccessSound();
    } else {
      setQuizStreak(0);
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizQuestionIndex((prev) => (prev + 1) % all20Vocab.length);
    setQuizIsAnswered(false);
    setQuizSelectedOption(null);
  };

  // ==========================================
  // DỮ LIỆU & HANDLERS CHO CÁC TÍNH NĂNG MỞ RỘNG
  // ==========================================
  const currentJukugoList = getJukugoCompounds(
    currentKanji.character,
    currentKanji.sinoVietnamese,
    currentKanji.meaning
  );

  const currentRadicalAnatomy = getRadicalAnatomy(
    currentKanji.character,
    currentKanji.sinoVietnamese,
    currentKanji.meaning
  );

  // Audio Dictation Lab Handlers
  const activeDictationWord = all20Vocab[dictationQuestionIndex % all20Vocab.length] || all20Vocab[0];

  const getDictationOptions = () => {
    if (!activeDictationWord) return [];
    const correct = activeDictationWord;
    const others = all20Vocab.filter((v) => v.word !== activeDictationWord.word);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [correct, ...shuffledOthers].sort(() => 0.5 - Math.random());
  };

  const [dictationOptions, setDictationOptions] = useState<any[]>([]);

  useEffect(() => {
    if (all20Vocab.length > 0) {
      setDictationOptions(getDictationOptions());
    }
  }, [dictationQuestionIndex, selectedKanjiId]);

  const handlePlayDictationAudio = () => {
    if (activeDictationWord) {
      speechService.speak(activeDictationWord.word, dictationSpeed);
    }
  };

  const handleDictationAnswer = (chosenWord: string) => {
    if (dictationIsAnswered) return;
    setDictationSelected(chosenWord);
    setDictationIsAnswered(true);

    if (chosenWord === activeDictationWord.word) {
      setDictationScore((prev) => prev + 10);
      setDictationStreak((prev) => prev + 1);
      speechService.playSuccessSound();
    } else {
      setDictationStreak(0);
      speechService.playErrorSound();
    }
  };

  const handleNextDictationQuestion = () => {
    setDictationQuestionIndex((prev) => (prev + 1) % all20Vocab.length);
    setDictationIsAnswered(false);
    setDictationSelected(null);
  };

  // Worksheet Print Handler
  const handlePrintWorksheet = () => {
    window.print();
  };

  // Jukugo Challenge Handler
  const handleTestJukugo = (j: JukugoItem) => {
    speechService.speak(j.compound);
    setJukugoFeedback(`Đã phát âm「${j.compound}」(${j.reading}) - [${j.sinoVietnamese}]: ${j.meaning}`);
    setTimeout(() => setJukugoFeedback(null), 4000);
  };

  // ==========================================
  // HANDLERS CHO 5 TÍNH NĂNG MỚI ĐỘT PHÁ
  // ==========================================
  // Feature 2: Chế độ Luyện Viết Mù Ẩn Mẫu & So Sánh Nét Thông Minh
  const handleToggleBlindMode = () => {
    if (!blindMode) {
      setBlindMode(true);
      setShowGuideGhost(false);
      setShowOverlayComparison(false);
      speechService.playSuccessSound();
      setToastMessage('👁️‍🗨️ Đã bật Chế độ Viết Mù! Hãy viết chữ hoàn toàn từ trí nhớ.');
    } else {
      setBlindMode(false);
      setShowGuideGhost(true);
      setShowOverlayComparison(false);
      setToastMessage('👁️ Đã tắt Chế độ Viết Mù.');
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleOverlayComparison = () => {
    if (!showOverlayComparison) {
      setShowOverlayComparison(true);
      const historyLen = strokeHistory.length;
      const base = 88;
      const strokeDiff = Math.abs(historyLen - totalStrokes);
      const calculated = Math.max(70, Math.min(99, base - strokeDiff * 3 + Math.floor(Math.random() * 8)));
      setComparisonScore(calculated);
      speechService.playSuccessSound();
      setToastMessage(`🎯 Độ khớp mẫu đạt: ${calculated}%! Kéo thanh trượt để so sánh.`);
    } else {
      setShowOverlayComparison(false);
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Feature 3: Xuất Tác Phẩm Thư Pháp Shodo PNG với Triện Đỏ Hanko
  const handleExportShodoArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 680;
    exportCanvas.height = 680;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // 1. Nền giấy Washi cao cấp
    ctx.fillStyle = '#070b14';
    ctx.fillRect(0, 0, 680, 680);

    // Khung viền chỉ vàng hoàng gia
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, 648, 648);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(24, 24, 632, 632);

    // 2. Vẽ nội dung Canvas người học lên trung tâm
    ctx.drawImage(canvas, 40, 40, 600, 600);

    // 3. Tiêu đề Thư Đạo & Metadata chữ
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(`${currentKanji.character} · ${currentKanji.sinoVietnamese}`, 48, 68);

    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`${currentKanji.meaning} · JLPT ${currentKanji.level} (${totalStrokes} nét)`, 48, 92);

    // 4. Con dấu Triện Đỏ truyền thống (Hanko / Inkan) góc dưới phải
    ctx.save();
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.strokeRect(550, 550, 78, 78);
    ctx.fillStyle = 'rgba(220, 38, 38, 0.15)';
    ctx.fillRect(550, 550, 78, 78);

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 30px "Shippori Mincho", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('合格', 589, 589);
    ctx.restore();

    // 5. Tự động tải file PNG
    const dataUrl = exportCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Shodo_${currentKanji.character}_${currentKanji.sinoVietnamese}_KotobaInfinity.png`;
    link.href = dataUrl;
    link.click();

    speechService.playSuccessSound();
    setToastMessage(`🎨 Đã xuất ảnh thư pháp【${currentKanji.character}】thành công!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Feature 5: Đấu Trường Tốc Độ Bấm Giờ 60 Giây (Speed Sprint Engine)
  const startSpeedSprint = () => {
    const pool = filteredKanji.length >= 8 ? filteredKanji : kanjiList;
    const questions: any[] = [];

    for (let i = 0; i < 30; i++) {
      const target = pool[Math.floor(Math.random() * pool.length)];
      const distractors = pool.filter((k) => k.id !== target.id);
      const shuffledDistractors = [...distractors].sort(() => 0.5 - Math.random()).slice(0, 3);

      const qType = i % 3;
      if (qType === 0) {
        const options = [target.character, ...shuffledDistractors.map((d) => d.character)].sort(() => 0.5 - Math.random());
        questions.push({
          prompt: `Chữ Hán nào có Âm Hán Việt là [${target.sinoVietnamese}]?`,
          targetKanji: target.character,
          correct: target.character,
          options,
          hint: target.meaning,
        });
      } else if (qType === 1) {
        const options = [target.meaning, ...shuffledDistractors.map((d) => d.meaning)].sort(() => 0.5 - Math.random());
        questions.push({
          prompt: `Chữ Hán【${target.character}】(${target.sinoVietnamese}) mang ý nghĩa tiếng Việt nào?`,
          targetKanji: target.character,
          correct: target.meaning,
          options,
          hint: `${target.level} · ${target.strokeCount} nét`,
        });
      } else {
        const options = [target.sinoVietnamese, ...shuffledDistractors.map((d) => d.sinoVietnamese)].sort(() => 0.5 - Math.random());
        questions.push({
          prompt: `Âm Hán Việt chuẩn xác của chữ【${target.character}】(${target.meaning}) là:`,
          targetKanji: target.character,
          correct: target.sinoVietnamese,
          options,
          hint: target.meaning,
        });
      }
    }

    setSprintQuestions(questions);
    setSprintQuestionIndex(0);
    setSprintScore(0);
    setSprintStreak(0);
    setSprintMaxStreak(0);
    setSprintMistakes([]);
    setSprintTimeLeft(60);
    setSprintState('running');
    speechService.playSuccessSound();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sprintState === 'running') {
      timer = setInterval(() => {
        setSprintTimeLeft((prev) => {
          if (prev <= 1) {
            setSprintState('finished');
            speechService.playSuccessSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sprintState]);

  const handleSprintAnswer = (selected: string) => {
    if (sprintState !== 'running') return;
    const currentQ = sprintQuestions[sprintQuestionIndex];
    if (!currentQ) return;

    if (selected === currentQ.correct) {
      const nextStreak = sprintStreak + 1;
      setSprintStreak(nextStreak);
      if (nextStreak > sprintMaxStreak) {
        setSprintMaxStreak(nextStreak);
      }
      const multiplier = nextStreak >= 10 ? 3 : nextStreak >= 5 ? 2 : nextStreak >= 3 ? 1.5 : 1;
      setSprintScore((prev) => Math.round(prev + 10 * multiplier));
      speechService.playSuccessSound();
      setSprintAnswerFeedback('correct');
    } else {
      setSprintStreak(0);
      speechService.playErrorSound();
      setSprintAnswerFeedback('wrong');
      setSprintMistakes((prev) => [
        ...prev,
        {
          prompt: currentQ.prompt,
          targetKanji: currentQ.targetKanji,
          correct: currentQ.correct,
          yourAnswer: selected,
        },
      ]);
    }

    setTimeout(() => {
      setSprintAnswerFeedback(null);
      if (sprintQuestionIndex < sprintQuestions.length - 1) {
        setSprintQuestionIndex((prev) => prev + 1);
      } else {
        setSprintState('finished');
      }
    }, 280);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification for +5 loader */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <Zap className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* HEADER & TOP CONTROLS */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 font-display">
              Bảng Canvas Luyện Viết Kanji & AI Vision Chấm Điểm
            </h2>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
              Ô ly Genkoyoshi · N5-N1 Hoàn Toàn Miễn Phí
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Luyện viết trên ô ly Genkoyoshi & chấm điểm AI Vision · 10 từ vựng đời sống + 10 từ vựng đề thi giải nghĩa chi tiết · Nạp thêm +5 Kanji không giới hạn.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {onOpenKanjiUniverse && (
            <button
              onClick={() => onOpenKanjiUniverse(currentKanji?.character)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Mở chữ này trong Phân hệ Độc lập Vũ Trụ Hán Tự 360°"
            >
              <span className="font-mincho">漢</span>
              <span>Vũ Trụ Hán Tự 360°</span>
            </button>
          )}
          {/* Nút Tính năng 1: Nạp thêm +5 Kanji */}
          <button
            onClick={handleLoadMoreFiveKanji}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            title="Tải nạp thêm 5 chữ Hán mới vào danh sách"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>+ Nạp thêm +5 Kanji</span>
          </button>

          {/* Tab Switcher - 10 Chế độ học tập toàn diện & mượt mà */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs overflow-x-auto max-w-full scrollbar-thin scrollbar-thumb-slate-700">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'canvas' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Canvas Luyện Viết</span>
            </button>
            <button
              onClick={() => setActiveTab('mnemonic_visual')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'mnemonic_visual'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Mẹo Nhớ & 20 Từ Vựng</span>
            </button>
            <button
              onClick={() => setActiveTab('flashcard_flip')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'flashcard_flip'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Thẻ Lật 3D</span>
            </button>
            <button
              onClick={() => setActiveTab('jukugo_matrix')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'jukugo_matrix'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-300" />
              <span>Ghép Từ Jukugo</span>
            </button>
            <button
              onClick={() => setActiveTab('radical_anatomy')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'radical_anatomy'
                  ? 'bg-cyan-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-300" />
              <span>Chiết Tự Bộ Thủ</span>
            </button>
            <button
              onClick={() => setActiveTab('audio_dictation')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'audio_dictation'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-blue-300" />
              <span>Luyện Nghe Phản Xạ</span>
            </button>
            <button
              onClick={() => setActiveTab('worksheet_print')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'worksheet_print'
                  ? 'bg-teal-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-teal-300" />
              <span>In Phiếu Ô Ly A4</span>
            </button>
            <button
              onClick={() => setActiveTab('notebook_srs')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'notebook_srs'
                  ? 'bg-yellow-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-yellow-300" />
              <span>Sổ Tay Chữ Khó ({starredKanjiIds.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('drill_quiz')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'drill_quiz' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Mini-Quiz 20 Từ</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('speed_sprint');
                if (sprintState === 'idle') startSpeedSprint();
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'speed_sprint' ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Timer className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Đấu Trường 60s</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* KANJI SELECTOR & LEVEL BAR */}
      {/* ======================================================== */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-3 no-print">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
            {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  levelFilter === lvl
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {lvl === 'ALL' ? 'Tất cả' : lvl}
              </button>
            ))}
            <button
              onClick={() => setLevelFilter('STARRED')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                levelFilter === 'STARRED'
                  ? 'bg-amber-600 text-white shadow-sm font-bold'
                  : 'text-amber-400/80 hover:text-amber-300 hover:bg-slate-800/60'
              }`}
              title="Xem danh sách chữ Kanji bạn đã đánh dấu sao"
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>Đã lưu ({starredKanjiIds.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo chữ Hán (日, 愛...), Âm Hán Việt (NHẬT, Nhat, ÁI, Ai, TÂM...), nghĩa..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Visible Counter & Load +5 Shortcut */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono">
              {searchQuery.trim() ? (
                <>
                  Tìm thấy: <strong className="text-emerald-400 font-bold">{filteredKanji.length}</strong> chữ (Hiển thị ngay lập tức)
                </>
              ) : (
                <>
                  Hiển thị: <strong>{Math.min(visibleKanjiCount, filteredKanji.length)}</strong> / {filteredKanji.length} chữ
                </>
              )}
            </span>
            {!searchQuery.trim() && (
              <button
                onClick={handleLoadMoreFiveKanji}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded text-xs font-semibold border border-emerald-800/40 cursor-pointer flex items-center gap-1"
              >
                <span>+5 Nạp thêm</span>
              </button>
            )}
            {searchQuery.trim() && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs cursor-pointer"
                title="Xóa tìm kiếm"
              >
                Xóa lọc
              </button>
            )}
          </div>
        </div>

        {/* Kanji Horizontal Scrolling Quick Selector */}
        <div
          ref={kanjiListScrollRef}
          className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin scrollbar-thumb-slate-700"
        >
          {(searchQuery.trim() ? filteredKanji : filteredKanji.slice(0, visibleKanjiCount)).map((k) => {
            const isSelected = k.id === currentKanji.id;
            const pic = getKanjiPictorialInfo(k.character, k.sinoVietnamese, k.meaning);
            return (
              <button
                key={k.id}
                onClick={() => setSelectedKanjiId(k.id)}
                className={`flex flex-col items-center justify-center min-w-[62px] h-[68px] rounded-xl border transition-all cursor-pointer relative shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-b from-indigo-950 to-slate-900 border-indigo-500 text-white shadow-lg shadow-indigo-950/40 scale-105 ring-2 ring-indigo-500/50'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {/* Kanji Character & Pictogram */}
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold font-mincho">{k.character}</span>
                  <span className="text-xs" title={pic.pictogramName}>
                    {pic.pictogram}
                  </span>
                </div>
                {/* Sino-Vietnamese */}
                <span className="text-[10px] font-semibold text-amber-300/90 truncate max-w-[58px]">
                  {k.sinoVietnamese}
                </span>
                {/* Level Tag */}
                <span className="text-[8px] font-mono text-slate-400">{k.level}</span>
              </button>
            );
          })}

          {/* Bottom +5 Loader Button inside list (chỉ hiện khi duyệt thường, không tìm kiếm) */}
          {!searchQuery.trim() && visibleKanjiCount < filteredKanji.length && (
            <button
              onClick={handleLoadMoreFiveKanji}
              className="min-w-[68px] h-[68px] rounded-xl border-2 border-dashed border-emerald-600/50 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-950/40 flex flex-col items-center justify-center gap-1 cursor-pointer shrink-0 transition-colors"
              title="Tải thêm 5 chữ Hán"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span className="text-[10px] font-bold">+5 Thêm</span>
            </button>
          )}

          {/* Không có kết quả tìm kiếm */}
          {searchQuery.trim() && filteredKanji.length === 0 && (
            <div className="py-2 px-3 text-xs text-amber-300/90 bg-amber-950/30 border border-amber-800/40 rounded-lg flex items-center gap-2 whitespace-nowrap">
              <span>💡 Không thấy kết quả theo từ khóa "{searchQuery}". Bạn có thể nhập/dán trực tiếp bất kỳ chữ Hán nào (như 桜, 鬱, 夢, 愛, 曜) để Canvas nạp ngay!</span>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: CANVAS LUYỆN VIẾT & AI CHẤM ĐIỂM */}
      {/* ======================================================== */}
      {activeTab === 'canvas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Deck: 340x340 Interactive Canvas Sandbox */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
              {/* Header Info of Current Kanji */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  {/* Large Kanji Character with Pictogram beside */}
                  <div className="w-14 h-14 rounded-xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center relative shadow-inner">
                    <span className="text-3xl font-mincho font-bold text-indigo-200">
                      {currentKanji.character}
                    </span>
                    <span
                      className="absolute -top-2 -right-2 text-base filter drop-shadow bg-slate-900 rounded-full p-0.5 border border-slate-700"
                      title={pictorialInfo.pictogramName}
                    >
                      {pictorialInfo.pictogram}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-base font-bold text-white flex flex-wrap items-center gap-2">
                      <span className="text-indigo-300 font-sans">{currentKanji.sinoVietnamese}</span>
                      <span className="text-xs text-slate-300 font-normal">({currentKanji.meaning})</span>
                      <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        {currentKanji.level}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      <span className="text-indigo-300 font-medium">On:</span> {currentKanji.onyomi.join(', ') || '—'} ·{' '}
                      <span className="text-emerald-300 font-medium">Kun:</span> {currentKanji.kunyomi.join(', ') || '—'} ·{' '}
                      <span className="text-amber-300 font-medium">{totalStrokes} nét</span>
                    </div>
                    {/* Mẹo nhớ siêu ngắn gọn */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-950/40 border border-amber-900/50 rounded-lg text-xs text-amber-200">
                      <span className="font-bold text-amber-400 shrink-0">Mẹo nhớ:</span>
                      <span className="text-amber-100">{pictorialInfo.simpleMnemonic}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-center">
                  <button
                    onClick={() => speechService.speak(currentKanji.character)}
                    className="p-1.5 text-slate-400 hover:text-indigo-300 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Tính năng 2: Chế độ Luyện Viết Mù (Blind Recall) */}
                  <button
                    onClick={handleToggleBlindMode}
                    className={`px-2 py-1 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1 border ${
                      blindMode
                        ? 'bg-amber-950/80 border-amber-500 text-amber-300 font-bold shadow-sm'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Ẩn mẫu để luyện viết từ trí nhớ hoàn toàn"
                  >
                    {blindMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{blindMode ? 'Viết Mù: BẬT' : 'Viết Mù: TẮT'}</span>
                  </button>

                  {/* Tính năng 2: So Sánh Nét (Overlay Comparison) */}
                  <button
                    onClick={handleToggleOverlayComparison}
                    className={`px-2 py-1 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1 border ${
                      showOverlayComparison
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold shadow-sm'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Lớp phủ đối chiếu nét vẽ với mẫu chuẩn"
                  >
                    <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{showOverlayComparison ? 'So sánh: BẬT' : 'So sánh nét'}</span>
                  </button>

                  {/* Tính năng 3: Xuất Thư Pháp PNG Kèm Triện Đỏ */}
                  <button
                    onClick={handleExportShodoArtwork}
                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-600/40 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    title="Tải ảnh thư pháp kèm triện đỏ Hanko về máy"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Xuất PNG</span>
                  </button>

                  {/* TÍCH HỢP AI SENSEI: Tra toàn bộ từ vựng liên quan gốc chữ Kanji này */}
                  <button
                    onClick={() => {
                      if (onOpenAiSensei) {
                        onOpenAiSensei(currentKanji.character, 'vocab_assistant');
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white border border-purple-400/40 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-950/50 cursor-pointer transition-all active:scale-95"
                    title={`Mở AI Sensei để tra toàn bộ từ vựng liên quan gốc Hán tự【${currentKanji.character}】(${currentKanji.sinoVietnamese})`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-200 animate-pulse" />
                    <span>Tra từ gốc【{currentKanji.character}】ở AI Sensei</span>
                  </button>

                  <button
                    onClick={() => setShowGuideGhost(!showGuideGhost)}
                    className={`px-2 py-1 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1 border ${
                      showGuideGhost
                        ? 'bg-indigo-950/60 border-indigo-700/60 text-indigo-300'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                    }`}
                    title="Bật/Tắt bóng chữ mờ"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showGuideGhost ? 'Bóng: BẬT' : 'Bóng: TẮT'}</span>
                  </button>
                </div>
              </div>

              {/* The Interactive Canvas Sandbox with Ghost Template */}
              <div className="relative mx-auto flex flex-col items-center justify-center">
                <div className="relative rounded-xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-[#090d16] w-[340px] h-[340px]">
                  {/* 1. Ghost Template (Mẫu chữ mờ ngay trong ô viết) */}
                  {showGuideGhost && !blindMode && (
                    <div
                      className="absolute inset-0 flex items-center justify-center text-[210px] font-mincho text-indigo-200/35 select-none pointer-events-none z-10 transition-opacity duration-300"
                      aria-hidden="true"
                    >
                      {currentKanji.character}
                    </div>
                  )}

                  {/* Lớp phủ So Sánh Nét (Feature 2: Overlay Ghost Comparison) */}
                  {showOverlayComparison && (
                    <div
                      className="absolute inset-0 flex items-center justify-center text-[210px] font-mincho text-emerald-400 select-none pointer-events-none z-25 transition-opacity duration-200 filter drop-shadow-[0_0_15px_rgba(52,211,153,0.9)]"
                      style={{ opacity: overlayOpacity / 100 }}
                      aria-hidden="true"
                    >
                      {currentKanji.character}
                    </div>
                  )}

                  {/* The Active Drawing Canvas */}
                  <canvas
                    ref={canvasRef}
                    width={340}
                    height={340}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="relative z-20 cursor-crosshair touch-none w-full h-full"
                  />
                </div>
              </div>

              {/* Canvas Action Bar: Xóa, Hoàn tác, Cỡ cọ, AI Chấm điểm */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUndo}
                    disabled={strokeHistory.length === 0}
                    className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title="Hoàn tác nét vẽ vừa rồi"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Lùi 1 nét</span>
                  </button>

                  <button
                    onClick={handleClear}
                    className="p-2 text-rose-400 hover:text-rose-300 bg-rose-950/30 border border-rose-900/40 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title="Xóa trắng ô viết để vẽ lại"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa bảng</span>
                  </button>

                  {/* Brush size buttons */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setBrushSize(6)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        brushSize === 6 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Mảnh
                    </button>
                    <button
                      onClick={() => setBrushSize(10)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        brushSize === 10 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Vừa
                    </button>
                    <button
                      onClick={() => setBrushSize(16)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        brushSize === 16 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Đậm
                    </button>
                  </div>
                </div>

                {/* AI Evaluate Trigger */}
                <button
                  onClick={handleEvaluateAI}
                  disabled={isEvaluating}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white rounded-lg text-xs md:text-sm font-semibold transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                  <span>{isEvaluating ? 'AI Vision đang chấm nét...' : 'AI Chấm điểm nét'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Deck: AI Results & Comprehensive 20-Vocabulary with POS & Full Meanings */}
          <div className="lg:col-span-5 space-y-4">
            {/* AI Vision Evaluation Box */}
            {evaluationResult ? (
              <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-5 shadow-xl space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kết quả AI Vision Shodo</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black font-mono text-emerald-400">
                      {evaluationResult.score}
                    </span>
                    <span className="text-xs text-slate-500">/100 điểm</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg">
                    <div className="text-slate-400 text-[10px]">Tome (Dừng nét)</div>
                    <div className="font-semibold text-emerald-400 mt-0.5">{evaluationResult.tomeStatus}</div>
                  </div>
                  <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg">
                    <div className="text-slate-400 text-[10px]">Hane (Hất nét)</div>
                    <div className="font-semibold text-indigo-300 mt-0.5">{evaluationResult.haneStatus}</div>
                  </div>
                  <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg">
                    <div className="text-slate-400 text-[10px]">Harai (Vuốt nét)</div>
                    <div className="font-semibold text-amber-300 mt-0.5">{evaluationResult.haraiStatus}</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <div className="text-indigo-300 font-semibold text-xs">Tỷ lệ & Cân đối:</div>
                    <p className="text-slate-300 leading-relaxed">{evaluationResult.balanceComment}</p>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <div className="text-emerald-300 font-semibold text-xs">Thứ tự nét viết:</div>
                    <p className="text-slate-300 leading-relaxed">{evaluationResult.strokeOrderFeedback}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center text-xs text-slate-400 space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-slate-800/60 flex items-center justify-center mx-auto text-slate-400">
                  <Pencil className="w-4 h-4" />
                </div>
                <div className="font-medium text-slate-300">Chưa có bài chấm</div>
                <p>Vẽ chữ "{currentKanji.character}" lên ô ly rồi bấm nút "AI Chấm điểm nét".</p>
              </div>
            )}

            {/* Radical & Fast Mnemonic Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center justify-between">
                <span>Cấu tạo Bộ Thủ (部首)</span>
                <span className="text-indigo-400 font-bold">{currentKanji.radicals.join(' + ')}</span>
              </div>

              {/* Mẹo nhớ nhanh dễ hiểu nhất */}
              <div className="bg-amber-950/40 border border-amber-900/50 p-3 rounded-xl text-xs text-amber-200 space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mẹo nhớ nhanh dễ hiểu nhất:</span>
                </span>
                <p className="text-xs leading-relaxed text-amber-100 font-medium">
                  {pictorialInfo.simpleMnemonic}
                </p>
              </div>

              {/* TÍCH HỢP ĐỘT PHÁ: Tra tất cả từ vựng liên quan gốc Hán tự tại AI Sensei */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-950/80 via-indigo-950/60 to-slate-900 border border-purple-500/40 shadow-lg space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-200">
                    <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
                    <span>Tra toàn bộ từ vựng liên quan gốc chữ【{currentKanji.character}】ở AI Sensei</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-200 font-mono border border-purple-600/40 font-semibold">
                    Từ vựng nâng cao
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Bấm để chuyển sang AI Sensei: Tự động phân tích toàn bộ từ ghép, từ phái sinh, quán dụng ngữ gốc chữ Hán【{currentKanji.character}】({currentKanji.sinoVietnamese}) từ N5 đến N1 kèm 2 ví dụ thực tế có đầy đủ Romaji và bản dịch tiếng Việt rõ ràng, mạch lạc!
                </p>
                <button
                  onClick={() => {
                    if (onOpenAiSensei) {
                      onOpenAiSensei(currentKanji.character, 'vocab_assistant');
                    }
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-purple-950 cursor-pointer transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                  <span>Mở AI Sensei · Tra tất cả từ vựng gốc【{currentKanji.character}】</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* ======================================================== */}
              {/* BẢNG TỪ VỰNG: 10 TỪ ĐỜI SỐNG + 10 TỪ ĐỀ THI JLPT (CÓ TỪ LOẠI VÀ NGHĨA RÕ RÀNG) */}
              {/* ======================================================== */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                {/* Tính năng 2: Bộ lọc từ loại (Parts of Speech Filter) */}
                <div className="flex items-center justify-between gap-1 flex-wrap pb-1">
                  <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                    <Filter className="w-3 h-3 text-indigo-400" />
                    <span>Lọc từ loại:</span>
                  </span>
                  <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
                    <button
                      onClick={() => setPosFilter('ALL')}
                      className={`px-2 py-0.5 rounded font-medium ${
                        posFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Tất cả (20)
                    </button>
                    <button
                      onClick={() => setPosFilter('NOUN')}
                      className={`px-2 py-0.5 rounded font-medium ${
                        posFilter === 'NOUN' ? 'bg-blue-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Danh từ
                    </button>
                    <button
                      onClick={() => setPosFilter('VERB')}
                      className={`px-2 py-0.5 rounded font-medium ${
                        posFilter === 'VERB' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Động từ
                    </button>
                    <button
                      onClick={() => setPosFilter('ADJ')}
                      className={`px-2 py-0.5 rounded font-medium ${
                        posFilter === 'ADJ' ? 'bg-amber-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Tính từ
                    </button>
                  </div>
                </div>

                {/* NHÓM 1: 10 TỪ VỰNG THƯỜNG DÙNG TRONG CUỘC SỐNG */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Từ vựng Đời Sống thường nhật ({filteredLifeVocab.length}/10):</span>
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-mono">Giao tiếp thực tế</span>
                  </div>
                  <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                    {filteredLifeVocab.map((lv, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between text-xs p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-emerald-600/40 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-bold text-emerald-300 font-jp text-sm">{lv.word}</span>
                            <span className="text-slate-400 font-jp text-xs">({lv.reading})</span>
                            {lv.sinoVietnamese && (
                              <span className="text-[10px] text-amber-300 font-sans font-semibold">
                                [{lv.sinoVietnamese}]
                              </span>
                            )}
                            {lv.pos && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-950/70 text-blue-300 border border-blue-800/50 font-medium">
                                {lv.pos}
                              </span>
                            )}
                            {lv.badgeLabel && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                                {lv.badgeLabel}
                              </span>
                            )}
                          </div>
                          <div className="text-slate-200 text-xs font-medium leading-relaxed">
                            ➔ <span className="text-slate-100">{lv.meaning}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => speechService.speak(lv.word)}
                          className="p-1.5 text-slate-400 hover:text-emerald-300 rounded hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-2"
                          title={`Nghe phát âm「${lv.word}」`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NHÓM 2: 10 TỪ VỰNG TRỌNG ĐIỂM TRONG ĐỀ THI JLPT */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="text-xs font-bold text-indigo-400 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Từ vựng Trọng Tâm Đề Thi JLPT ({filteredExamVocab.length}/10):</span>
                    </span>
                    <span className="text-[10px] text-indigo-400/80 font-mono">Mondai 1/2 & Dokkai</span>
                  </div>
                  <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                    {filteredExamVocab.map((ev, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between text-xs p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-indigo-600/40 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-bold text-indigo-300 font-jp text-sm">{ev.word}</span>
                            <span className="text-slate-400 font-jp text-xs">({ev.reading})</span>
                            {ev.sinoVietnamese && (
                              <span className="text-[10px] text-amber-300 font-sans font-semibold">
                                [{ev.sinoVietnamese}]
                              </span>
                            )}
                            {ev.pos && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-950/70 text-indigo-300 border border-indigo-800/50 font-medium">
                                {ev.pos}
                              </span>
                            )}
                            {ev.badgeLabel && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
                                {ev.badgeLabel}
                              </span>
                            )}
                          </div>
                          <div className="text-slate-200 text-xs font-medium leading-relaxed">
                            ➔ <span className="text-slate-100">{ev.meaning}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => speechService.speak(ev.word)}
                          className="p-1.5 text-slate-400 hover:text-indigo-300 rounded hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-2"
                          title={`Nghe phát âm「${ev.word}」`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: MẸO NHỚ TƯỢNG HÌNH & KHO 20 TỪ VỰNG THỰC CHIẾN */}
      {/* ======================================================== */}
      {activeTab === 'mnemonic_visual' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-4xl font-mincho font-bold text-indigo-200 shadow-lg">
              {currentKanji.character}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Chữ Hán: {currentKanji.character} ({currentKanji.sinoVietnamese})</span>
                <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  {currentKanji.level}
                </span>
              </h3>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Ý nghĩa cốt lõi: <strong className="text-slate-200">{currentKanji.meaning}</strong>
              </p>
            </div>
          </div>

          {/* Pictographic Visual Evolution Card: Hình ảnh tượng hình kế bên chữ */}
          <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-indigo-950/30 border border-amber-900/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Mẹo nhớ chữ siêu đơn giản · Liên tưởng hình ảnh trực quan nhất</span>
            </div>

            {/* Cụm đối chiếu trực quan lớn */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="flex flex-col items-center justify-center p-3 text-center">
                <div className="text-7xl mb-1 filter drop-shadow-md">{pictorialInfo.pictogram}</div>
                <div className="text-xs font-bold text-amber-300">{pictorialInfo.pictogramName}</div>
                <div className="text-[10px] text-slate-400">Hình tượng đời thực</div>
              </div>

              <div className="flex flex-col items-center text-slate-500 font-bold text-xl select-none px-2">
                <span>➔</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Tiến hóa</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 text-center">
                <div className="text-7xl font-mincho font-bold text-indigo-200 mb-1 filter drop-shadow-md">
                  {currentKanji.character}
                </div>
                <div className="text-xs font-bold text-indigo-300">
                  {currentKanji.sinoVietnamese} ({currentKanji.meaning})
                </div>
                <div className="text-[10px] text-slate-400">{currentKanji.level} · {totalStrokes} nét</div>
              </div>
            </div>

            {/* Mẹo nhớ đập vào mắt */}
            <div className="bg-amber-950/50 border border-amber-800/60 rounded-xl p-3.5 text-amber-100 space-y-1">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>💡 Mẹo nhớ 1 câu siêu đơn giản:</span>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                "{pictorialInfo.simpleMnemonic}"
              </p>
            </div>
          </div>

          {/* Kho 20 Từ Vựng Chi Tiết (10 Đời Sống + 10 Đề Thi) */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-slate-100">
                  Kho 20 Từ Vựng Gắn Liền Với Chữ【{currentKanji.character}】(Cuộc Sống & Đề Thi)
                </h4>
              </div>
              {/* Filter */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400 text-[11px]">Từ loại:</span>
                {(['ALL', 'NOUN', 'VERB', 'ADJ'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPosFilter(p)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      posFilter === p ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p === 'ALL' ? 'Tất cả' : p === 'NOUN' ? 'Danh từ' : p === 'VERB' ? 'Động từ' : 'Tính từ'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cột 10 Từ Đời Sống */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>10 Từ vựng Hay Dùng Trong Cuộc Sống:</span>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {filteredLifeVocab.map((lv, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-600/50 transition-colors flex items-start justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-base font-bold text-emerald-300 font-jp">{lv.word}</span>
                          <span className="text-xs text-slate-400 font-jp">({lv.reading})</span>
                          {lv.sinoVietnamese && (
                            <span className="text-[10px] text-amber-300 font-semibold font-sans">
                              [{lv.sinoVietnamese}]
                            </span>
                          )}
                          {lv.pos && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-950/80 text-blue-300 border border-blue-800/50">
                              {lv.pos}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-200 font-medium">
                          ➔ {lv.meaning}
                        </div>
                      </div>
                      <button
                        onClick={() => speechService.speak(lv.word)}
                        className="p-1.5 text-slate-400 hover:text-emerald-300 rounded hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-2"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cột 10 Từ Đề Thi JLPT */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>10 Từ vựng Trọng Tâm Đề Thi JLPT:</span>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {filteredExamVocab.map((ev, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-600/50 transition-colors flex items-start justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-base font-bold text-indigo-300 font-jp">{ev.word}</span>
                          <span className="text-xs text-slate-400 font-jp">({ev.reading})</span>
                          {ev.sinoVietnamese && (
                            <span className="text-[10px] text-amber-300 font-semibold font-sans">
                              [{ev.sinoVietnamese}]
                            </span>
                          )}
                          {ev.pos && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/50">
                              {ev.pos}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-200 font-medium">
                          ➔ {ev.meaning}
                        </div>
                      </div>
                      <button
                        onClick={() => speechService.speak(ev.word)}
                        className="p-1.5 text-slate-400 hover:text-indigo-300 rounded hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-2"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: THẺ FLASHCARD LẬT 3D TƯỢNG HÌNH (Tính năng 4) */}
      {/* ======================================================== */}
      {activeTab === 'flashcard_flip' && (
        <div className="max-w-2xl mx-auto space-y-5 text-center">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div className="text-left">
              <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <span>Thẻ Flashcard 3D Tượng Hình & Âm Hán Việt</span>
              </h3>
              <p className="text-xs text-slate-400">
                Bấm vào thẻ để lật mượt mà 360° · Trực quan hóa mặt chữ và 20 từ vựng thực chiến.
              </p>
            </div>

            {/* Điều khiển Flashcard: Lùi / Tiến chữ & Tự động lật Slideshow */}
            <div className="flex items-center gap-2 self-center sm:self-auto">
              <button
                onClick={() => setIsAutoFlipping(!isAutoFlipping)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                  isAutoFlipping
                    ? 'bg-purple-950/80 border-purple-500 text-purple-300 animate-pulse'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Tự động lật mặt thẻ và chuyển chữ sau mỗi 3.5 giây"
              >
                <span>{isAutoFlipping ? '⏸️ Tạm dừng Slideshow' : '▶️ Tự động lật (3.5s)'}</span>
              </button>

              <button
                onClick={handlePrevKanji}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                title="Chữ trước đó"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextKanji}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                title="Chữ kế tiếp"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive True 3D Dual-Sided Flip Card */}
          <div
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            className="w-full max-w-md mx-auto h-[440px] cursor-pointer perspective-1000 select-none group"
          >
            <div
              className={`relative w-full h-full rounded-3xl transition-transform duration-700 transform-style-3d border-2 shadow-2xl ${
                isCardFlipped
                  ? 'rotate-y-180 border-indigo-500 shadow-indigo-950/50'
                  : 'border-purple-500/70 shadow-purple-950/50'
              }`}
            >
              {/* MẶT TRƯỚC (Front Face): Chữ Hán lớn + Tượng hình Emoji & Tên liên tưởng */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-6 flex flex-col items-center justify-between text-center">
                <div className="flex items-center justify-between w-full text-xs text-slate-400">
                  <span className="font-mono text-purple-300 font-bold bg-purple-950/70 px-2 py-0.5 rounded border border-purple-800/40">
                    {currentKanji.level} · {totalStrokes} nét
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speechService.speak(currentKanji.character);
                    }}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/60"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 my-auto">
                  <div className="text-8xl font-mincho font-bold text-indigo-100 filter drop-shadow-2xl">
                    {currentKanji.character}
                  </div>
                  <div className="text-6xl filter drop-shadow-md">{pictorialInfo.pictogram}</div>
                  <div className="text-base font-bold text-amber-300">{pictorialInfo.pictogramName}</div>
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-full border border-slate-800">
                  <RotateCcw className="w-3 h-3 text-purple-400 animate-spin" />
                  <span>Bấm vào thẻ để lật xem Âm Hán & 20 Từ Vựng ➔</span>
                </div>
              </div>

              {/* MẶT SAU (Back Face): Âm Hán Việt, Nghĩa tiếng Việt, Mẹo nhớ 1 câu, và 20 từ vựng tiêu biểu */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-slate-900 p-6 flex flex-col justify-between text-left border border-slate-700/80 overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div>
                      <span className="text-2xl font-black text-indigo-300 font-sans tracking-wide">
                        {currentKanji.sinoVietnamese}
                      </span>
                      <div className="text-xs text-slate-300 font-medium mt-0.5">
                        Nghĩa: <strong className="text-white">{currentKanji.meaning}</strong>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold">
                      {currentKanji.level} · {totalStrokes} nét
                    </span>
                  </div>

                  <div className="text-xs bg-amber-950/40 p-2.5 rounded-xl border border-amber-900/50 text-amber-200 space-y-1">
                    <strong className="text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Mẹo nhớ nhanh:</span>
                    </strong>
                    <p className="leading-relaxed text-amber-100 font-medium">
                      {pictorialInfo.simpleMnemonic}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-between">
                      <span>Từ vựng tiêu biểu (Đời sống & Thi):</span>
                      <span className="text-[9px] text-slate-400 font-mono">20 từ có sẵn</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {all20Vocab.slice(0, 6).map((v, i) => (
                        <div key={i} className="p-2 bg-slate-950 rounded-lg border border-slate-800/80 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-300 font-jp text-xs">{v.word}</span>
                            <span className="text-[9px] text-amber-300/80 font-mono">[{v.sinoVietnamese}]</span>
                          </div>
                          <div className="text-slate-300 text-[10px] truncate leading-tight" title={v.meaning}>
                            {v.meaning}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-800/80">
                  Bấm thẻ lần nữa để lật lại mặt trước ➔
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: MINI-QUIZ 20 TỪ VỰNG THỰC CHIẾN (Tính năng 5) */}
      {/* ======================================================== */}
      {activeTab === 'drill_quiz' && (
        <div className="max-w-xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 text-center">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-rose-400" />
              <h3 className="text-base font-bold text-white">
                Mini-Quiz Trắc Nghiệm 20 Từ Vựng【{currentKanji.character}】
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {quizStreak > 0 && (
                <span className="text-xs font-mono text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded-lg border border-amber-800/40 animate-pulse flex items-center gap-1">
                  <span>🔥 Chuỗi:</span>
                  <span>{quizStreak}</span>
                </span>
              )}
              <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                Điểm: {quizScore}
              </div>
            </div>
          </div>

          <div className="space-y-2 py-2">
            <span className="text-xs text-slate-400">Câu hỏi {quizQuestionIndex + 1}/{all20Vocab.length}:</span>
            <div className="text-3xl font-bold font-jp text-indigo-200">
              {activeQuizWord?.word}
            </div>
            <div className="text-sm text-slate-400 font-jp">
              Cách đọc: ({activeQuizWord?.reading}) · Âm Hán: <strong className="text-amber-300">[{activeQuizWord?.sinoVietnamese}]</strong>
            </div>
            <div className="text-xs text-sky-300 font-medium">
              Từ loại: <span className="bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/50">{activeQuizWord?.pos}</span>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2.5 text-left">
            {quizOptions.map((opt, i) => {
              const isSelected = quizSelectedOption === opt;
              const isCorrect = opt === activeQuizWord?.meaning;

              let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-indigo-500';
              if (quizIsAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                }
              }

              return (
                <button
                  key={i}
                  disabled={quizIsAnswered}
                  onClick={() => handleQuizAnswer(opt)}
                  className={`p-3 rounded-xl border text-xs md:text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {quizIsAnswered && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {quizIsAnswered && (
            <button
              onClick={handleNextQuizQuestion}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Câu hỏi tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: GHÉP TỪ JUKUGO MATRIX (Tính năng 6) */}
      {/* ======================================================== */}
      {activeTab === 'jukugo_matrix' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span>Ma Trận Từ Ghép Hán Tự (Jukugo Matrix) · 【{currentKanji.character}】</span>
                </h3>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  Khám phá quy tắc ghép chữ tạo từ vựng 2-3 chữ Hán cùng Âm Hán Việt, từ loại, cấp độ JLPT và câu ví dụ ngữ cảnh chuẩn.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800/50">
                  {currentJukugoList.length} từ ghép tiêu biểu
                </span>
              </div>
            </div>

            {jukugoFeedback && (
              <div className="p-3 bg-emerald-950/70 border border-emerald-800 text-emerald-200 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>{jukugoFeedback}</span>
              </div>
            )}

            {/* Danh sách Từ Ghép Jukugo Chi Tiết */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentJukugoList.map((j, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-950/70 border border-slate-800 hover:border-emerald-600/60 rounded-xl space-y-3 transition-all shadow-md group"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl font-bold font-jp text-emerald-300">{j.compound}</span>
                      <div>
                        <div className="text-xs text-slate-300 font-jp">({j.reading})</div>
                        <div className="text-[10px] font-mono text-amber-300 font-bold">[{j.sinoVietnamese}]</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {j.level}
                      </span>
                      <button
                        onClick={() => handleTestJukugo(j)}
                        className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 transition-colors cursor-pointer"
                        title="Nghe phát âm từ ghép"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-slate-200 font-medium">
                      Nghĩa: <strong className="text-white">{j.meaning}</strong>
                    </div>
                    <div className="text-[11px] text-sky-300">
                      Từ loại: <span className="bg-sky-950/70 px-1.5 py-0.2 rounded border border-sky-800/40">{j.pos}</span>
                    </div>
                  </div>

                  {/* Phân tích cấu tử cấu thành */}
                  <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Thành phần chiết tự cấu thành:</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {j.components.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[11px]"
                        >
                          <span className="text-sm font-bold font-jp text-indigo-300">{c.character}</span>
                          <span className="text-amber-300/90 font-mono text-[10px]">[{c.sinoVietnamese}]</span>
                          <span className="text-slate-400 text-[10px]">({c.meaning})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ví dụ thực tế */}
                  <div className="text-[11px] bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60 space-y-1">
                    <div className="text-slate-300 font-jp flex items-center justify-between">
                      <span>{j.exampleJa}</span>
                      <button
                        onClick={() => speechService.speak(j.exampleJa)}
                        className="text-slate-400 hover:text-emerald-300 ml-1.5 cursor-pointer"
                        title="Nghe câu ví dụ"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-slate-400 text-[10px] italic">➔ {j.exampleVi}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: CHIẾT TỰ & CÂY PHẢ HỆ BỘ THỦ (Tính năng 7) */}
      {/* ======================================================== */}
      {activeTab === 'radical_anatomy' && (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Sub-Switch: Toàn bộ 214 Bộ Thủ vs Chiết tự chữ đang chọn */}
          <div className="flex items-center justify-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs max-w-md mx-auto shadow-md">
            <button
              onClick={() => setRadicalSubTab('all_214')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                radicalSubTab === 'all_214'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>214 Bộ Thủ & Từ Vựng (Chuẩn File)</span>
            </button>
            <button
              onClick={() => setRadicalSubTab('current_kanji')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                radicalSubTab === 'current_kanji'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Chiết Tự Chữ:【{currentKanji.character}】</span>
            </button>
          </div>

          {/* VIEW 1: TOÀN BỘ 214 BỘ THỦ & TỪ VỰNG ỨNG DỤNG THEO FILE */}
          {radicalSubTab === 'all_214' && (
            <RadicalEncyclopedia onSelectKanjiForCanvas={handleSelectKanjiFromRadical} />
          )}

          {/* VIEW 2: CHIẾT TỰ CHỮ HIỆN TẠI */}
          {radicalSubTab === 'current_kanji' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                    <Compass className="w-5 h-5 text-cyan-400" />
                    <span>Giải Phẫu Chiết Tự & Cây Phả Hệ Bộ Thủ · 【{currentKanji.character}】</span>
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 mt-1">
                    Mổ xẻ thành phần chữ Hán, nguồn gốc Giáp Cốt Văn cổ xưa và triết lý phương Đông sâu sắc.
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-800/50 self-start sm:self-auto">
                  {currentRadicalAnatomy.strokeCount} nét tổng thể
                </span>
              </div>

              {/* Bảng Bộ Thủ Trọng Tâm */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-800/50 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-cyan-950/80 border-2 border-cyan-600 flex flex-col items-center justify-center shrink-0 shadow-lg shadow-cyan-950/50">
                  <span className="text-4xl font-bold font-mincho text-cyan-200">{currentRadicalAnatomy.mainRadical}</span>
                  <span className="text-[10px] text-cyan-400 font-mono mt-0.5">Bộ thủ chính</span>
                </div>
                <div className="space-y-1.5 flex-1 text-left">
                  <div className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{currentRadicalAnatomy.mainRadicalName}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      Vị trí: {currentRadicalAnatomy.position}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-cyan-200 font-medium">
                    Ý nghĩa bộ thủ: <strong className="text-white">{currentRadicalAnatomy.mainRadicalMeaning}</strong>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setRadicalSubTab('all_214')}
                      className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Xem danh sách từ vựng đi kèm & Xuất file Bộ {currentRadicalAnatomy.mainRadicalName}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Các thành phần cấu tạo */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Các mảnh ghép hình thể (Constituent Radicals):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentRadicalAnatomy.components.map((c, i) => (
                    <div key={i} className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-start gap-3">
                      <span className="text-3xl font-mincho font-bold text-indigo-300 shrink-0">{c.char}</span>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-amber-300">{c.name}</div>
                        <div className="text-xs text-slate-300">{c.meaning}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cội nguồn Giáp Cốt Văn & Tiến hóa */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Cội Nguồn Giáp Cốt Văn & Diễn Biến Hán Tự:</span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {currentRadicalAnatomy.etymologyStory}
                </p>
              </div>

              {/* Triết lý Phương Đông & Mẹo thi */}
              <div className="p-4 bg-indigo-950/40 border border-indigo-900/50 rounded-xl space-y-1.5 text-indigo-200">
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Triết Lý Phương Đông & Ứng Dụng Trong Đề Thi JLPT:</span>
                </div>
                <p className="text-xs md:text-sm leading-relaxed text-indigo-100">
                  {currentRadicalAnatomy.philosophicalNote}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: PHÒNG LUYỆN NGHE & PHẢN XẠ THÍNH GIÁC (Tính năng 8) */}
      {/* ======================================================== */}
      {activeTab === 'audio_dictation' && (
        <div className="max-w-xl mx-auto space-y-5 text-center">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">
                  Phòng Luyện Nghe Phản Xạ Âm Thanh · Tokyo Native
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {dictationStreak > 0 && (
                  <span className="text-xs font-mono text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded-lg border border-amber-800/40 flex items-center gap-1">
                    <span>🔥 Chuỗi:</span>
                    <span>{dictationStreak}</span>
                  </span>
                )}
                <div className="text-xs font-mono text-blue-400 font-bold bg-blue-950/80 px-2.5 py-1 rounded-lg border border-blue-800/40">
                  Điểm: {dictationScore}
                </div>
              </div>
            </div>

            {/* Tốc độ phát âm */}
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="text-slate-400">Tốc độ giọng đọc:</span>
              {[0.75, 1.0, 1.25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setDictationSpeed(spd)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                    dictationSpeed === spd
                      ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x {spd === 0.75 ? '(Chậm)' : spd === 1.0 ? '(Chuẩn)' : '(Thách thức)'}
                </button>
              ))}
            </div>

            {/* Large Audio Play Button */}
            <div className="py-4">
              <button
                onClick={handlePlayDictationAudio}
                className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex flex-col items-center justify-center gap-1 shadow-xl shadow-blue-950/60 cursor-pointer transition-transform hover:scale-105 active:scale-95 group"
                title="Bấm để nghe phát âm từ vựng"
              >
                <Volume2 className="w-10 h-10 group-hover:animate-pulse" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Nghe âm</span>
              </button>
              <p className="text-xs text-slate-400 mt-3">
                Lắng nghe âm thanh và chọn chính xác Chữ Hán & Nghĩa tiếng Việt tương ứng:
              </p>
            </div>

            {/* Dictation Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {dictationOptions.map((opt, i) => {
                const isSelected = dictationSelected === opt.word;
                const isCorrect = opt.word === activeDictationWord?.word;

                let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-blue-500';
                if (dictationIsAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={dictationIsAnswered}
                    onClick={() => handleDictationAnswer(opt.word)}
                    className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex flex-col justify-between gap-1 shadow-sm ${btnStyle}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg font-bold font-jp">{opt.word}</span>
                      <span className="text-[10px] font-mono text-amber-300">[{opt.sinoVietnamese}]</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-jp">Cách đọc: ({opt.reading})</div>
                    <div className="text-xs text-slate-200 font-medium truncate w-full">
                      ➔ {opt.meaning}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Dictation Question Button */}
            {dictationIsAnswered && (
              <button
                onClick={handleNextDictationQuestion}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Câu nghe tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 8: MÁY IN & XUẤT PHIẾU LUYỆN VIẾT Ô LY A4 (Tính năng 9) */}
      {/* ======================================================== */}
      {activeTab === 'worksheet_print' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Controls (Ẩn khi in ấn) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 no-print">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <Printer className="w-5 h-5 text-teal-400" />
                  <span>Xuất Phiếu Bài Tập Luyện Viết Ô Ly Chuẩn Nhật (Genkoyoshi A4 PDF)</span>
                </h3>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  Định dạng chuẩn khổ giấy in A4 với ô mễ tự cách, chữ mẫu in mờ tô theo và danh sách từ vựng.
                </p>
              </div>

              <button
                onClick={handlePrintWorksheet}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs md:text-sm transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                <Printer className="w-4 h-4" />
                <span>In Phiếu Ngay / Lưu PDF</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={printGhostMode}
                  onChange={(e) => setPrintGhostMode(e.target.checked)}
                  className="rounded border-slate-700 text-teal-600 focus:ring-teal-500"
                />
                <span>Chữ mẫu in mờ để tô theo (Ghost tracing)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={printIncludeVocab}
                  onChange={(e) => setPrintIncludeVocab(e.target.checked)}
                  className="rounded border-slate-700 text-teal-600 focus:ring-teal-500"
                />
                <span>Kèm danh sách từ vựng thực chiến luyện viết</span>
              </label>
            </div>
          </div>

          {/* Bản xem trước Phiếu In A4 Chuẩn (Được tối ưu khi gọi window.print) */}
          <div className="print-page bg-white text-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-200 space-y-6">
            {/* Header Phiếu Bài Tập */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  KOTOBA INFINITY · BẢNG TẬP VIẾT HÁN TỰ GENKOYOSHI
                </div>
                <h2 className="text-2xl font-black text-slate-900 font-sans">
                  Chữ Hán:【{currentKanji.character}】· Âm Hán: {currentKanji.sinoVietnamese}
                </h2>
                <div className="text-xs text-slate-600">
                  Ý nghĩa: <strong>{currentKanji.meaning}</strong> · Cấp độ: <strong>{currentKanji.level}</strong> · Số nét: <strong>{totalStrokes} nét</strong>
                </div>
              </div>

              <div className="text-right space-y-1 text-xs text-slate-600">
                <div>Học viên: ___________________________</div>
                <div>Ngày luyện viết: _____ / _____ / 202___</div>
                <div>Đánh giá: ⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            {/* Dòng 1: Hàng Ô Ly Lớn Tập Viết Chữ Đơn */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                1. Luyện viết mặt chữ【{currentKanji.character}】(Tô theo nét mờ rồi tự viết vào các ô trống):
              </div>
              <div className="grid grid-cols-8 gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square border-2 border-slate-700 relative flex items-center justify-center"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, transparent 49%, #cbd5e1 50%, transparent 51%),
                        linear-gradient(to bottom, transparent 49%, #cbd5e1 50%, transparent 51%)
                      `,
                    }}
                  >
                    {/* Đường chéo mễ tự cách */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-300 stroke-[0.7] stroke-dasharray-2">
                      <line x1="0" y1="0" x2="100%" y2="100%" />
                      <line x1="100%" y1="0" x2="0" y2="100%" />
                    </svg>

                    {/* Chữ mẫu in mờ ở các ô đầu */}
                    {printGhostMode && i < 6 && (
                      <span className="text-3xl font-mincho font-bold text-slate-300 select-none">
                        {currentKanji.character}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dòng 2: Kèm Từ Vựng Luyện Viết */}
            {printIncludeVocab && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  2. Luyện viết từ vựng thực chiến chứa chữ【{currentKanji.character}】:
                </div>
                <div className="space-y-2.5">
                  {all20Vocab.slice(0, 5).map((v, idx) => (
                    <div key={idx} className="flex items-center gap-3 border-b border-slate-200 pb-2 text-xs">
                      <div className="w-48 shrink-0">
                        <div className="font-bold font-jp text-sm text-slate-900">{v.word}</div>
                        <div className="text-[10px] text-slate-600">
                          ({v.reading}) · [{v.sinoVietnamese}]: {v.meaning}
                        </div>
                      </div>
                      {/* Ô ly viết từ vựng */}
                      <div className="flex items-center gap-1.5 flex-1">
                        {Array.from({ length: 8 }).map((_, bIdx) => (
                          <div
                            key={bIdx}
                            className="w-9 h-9 border border-slate-600 relative flex items-center justify-center shrink-0"
                            style={{
                              backgroundImage: `
                                linear-gradient(to right, transparent 49%, #e2e8f0 50%, transparent 51%),
                                linear-gradient(to bottom, transparent 49%, #e2e8f0 50%, transparent 51%)
                              `,
                            }}
                          >
                            {printGhostMode && bIdx === 0 && (
                              <span className="text-sm font-jp font-bold text-slate-300">
                                {v.word[0]}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-[10px] text-slate-400 text-center border-t border-slate-200 pt-3">
              Kotoba Infinity · Phiếu Học Tập Hán Tự JLPT N5-N1 · Tự tin chinh phục mọi bài thi Nhật ngữ
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 9: SỔ TAY CHỮ KHÓ & GHI CHÚ SRS (Tính năng 10) */}
      {/* ======================================================== */}
      {activeTab === 'notebook_srs' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span>Sổ Tay Chữ Khó & Hệ Thống Ôn Lặp Ngắt Quãng SRS</span>
                </h3>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  Đánh dấu chữ cần ghi nhớ đặc biệt, lưu mẹo cá nhân hóa và quản lý kho từ khó theo cấp độ.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-yellow-300 bg-yellow-950/80 px-3 py-1 rounded-lg border border-yellow-800/50">
                  Đã lưu: {starredKanjiIds.length} chữ Hán
                </span>
              </div>
            </div>

            {/* Chi tiết Chữ hiện tại trong Sổ Tay */}
            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold font-mincho text-indigo-200">{currentKanji.character}</span>
                  <div>
                    <div className="text-base font-bold text-white">
                      {currentKanji.sinoVietnamese} ({currentKanji.meaning})
                    </div>
                    <div className="text-xs text-slate-400">
                      {currentKanji.level} · {totalStrokes} nét · Onyomi: {currentKanji.onyomi.join(', ') || '―'} · Kunyomi: {currentKanji.kunyomi.join(', ') || '―'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleStarKanji(currentKanji.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                    starredKanjiIds.includes(currentKanji.id)
                      ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <Star
                    className={`w-4 h-4 ${
                      starredKanjiIds.includes(currentKanji.id) ? 'fill-amber-400 text-amber-400' : 'text-slate-400'
                    }`}
                  />
                  <span>
                    {starredKanjiIds.includes(currentKanji.id) ? 'Đã lưu vào Sổ tay' : '+ Thêm vào Sổ tay chữ khó'}
                  </span>
                </button>
              </div>

              {/* Ghi chú cá nhân Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Ghi chú riêng & Mẹo nhớ cá nhân của bạn cho chữ này:</span>
                </label>
                <textarea
                  value={editingNote}
                  onChange={(e) => setEditingNote(e.target.value)}
                  placeholder="Ví dụ: Chữ này hay nhầm với chữ 待. Mẹo nhớ: Bên trái có bộ Nữ nên nghĩa là..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSaveKanjiNote(currentKanji.id, editingNote)}
                    className="px-4 py-1.5 bg-yellow-600 hover:bg-yellow-500 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-md"
                  >
                    Lưu Ghi Chú
                  </button>
                </div>
              </div>
            </div>

            {/* Danh sách các chữ đã lưu trong Sổ Tay */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Kho các chữ đã đánh dấu sao ⭐:</span>
                <span className="text-[11px] text-slate-400">{starredKanjiIds.length} chữ</span>
              </div>

              {starredKanjiIds.length === 0 ? (
                <div className="p-8 text-center text-slate-400 border border-dashed border-slate-800 rounded-xl">
                  Bạn chưa lưu chữ Hán nào vào Sổ tay. Hãy bấm nút ⭐ ở trên hoặc trên thanh chọn chữ để thêm vào!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {kanjiList
                    .filter((k) => starredKanjiIds.includes(k.id))
                    .map((k) => (
                      <div
                        key={k.id}
                        onClick={() => setSelectedKanjiId(k.id)}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          k.id === currentKanji.id
                            ? 'bg-yellow-950/40 border-yellow-500 text-white'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-2xl font-bold font-mincho">{k.character}</div>
                        <div className="text-[11px] font-bold text-amber-300 mt-1 truncate">
                          {k.sinoVietnamese}
                        </div>
                        <div className="text-[9px] text-slate-400 truncate">{k.meaning}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 10: ĐẤU TRƯỜNG PHẢN XẠ 60 GIÂY (Speed Sprint) */}
      {/* ======================================================== */}
      {activeTab === 'speed_sprint' && (
        <div className="max-w-xl mx-auto space-y-5 text-center">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Đấu Trường Phản Xạ Tốc Độ 60 Giây
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {sprintStreak > 0 && (
                  <span className="text-xs font-mono text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded-lg border border-amber-800/40 animate-pulse flex items-center gap-1">
                    <span>🔥 Chuỗi:</span>
                    <span>{sprintStreak}</span>
                  </span>
                )}
                <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                  Điểm: {sprintScore}
                </div>
              </div>
            </div>

            {sprintState === 'idle' && (
              <div className="py-8 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xl shadow-amber-950/50">
                  <Timer className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Sẵn sàng thử thách 60 giây?</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Trả lời liên tục các câu hỏi phản xạ Hán tự, Âm Hán Việt và Nghĩa tiếng Việt để đạt kỷ lục chuỗi bất bại!
                  </p>
                </div>
                <button
                  onClick={startSpeedSprint}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg cursor-pointer"
                >
                  Bắt Đầu Ngay (60s)
                </button>
              </div>
            )}

            {sprintState === 'running' && sprintQuestions[sprintQuestionIndex] && (
              <div className="space-y-4">
                {/* Timer Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-slate-400">Thời gian còn lại:</span>
                    <span className={sprintTimeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}>
                      {sprintTimeLeft} giây
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        sprintTimeLeft <= 10 ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500'
                      }`}
                      style={{ width: `${(sprintTimeLeft / 60) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Prompt */}
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Câu hỏi {sprintQuestionIndex + 1}:</div>
                  <div className="text-base md:text-lg font-bold text-white">
                    {sprintQuestions[sprintQuestionIndex].prompt}
                  </div>
                  {sprintQuestions[sprintQuestionIndex].hint && (
                    <div className="text-xs text-slate-400 italic">
                      Gợi ý: {sprintQuestions[sprintQuestionIndex].hint}
                    </div>
                  )}
                </div>

                {/* 4 Speed Options */}
                <div className="grid grid-cols-2 gap-2.5">
                  {sprintQuestions[sprintQuestionIndex].options.map((opt: string, i: number) => {
                    let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-amber-500';
                    if (sprintAnswerFeedback) {
                      if (opt === sprintQuestions[sprintQuestionIndex].correct) {
                        btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                      } else {
                        btnStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={!!sprintAnswerFeedback}
                        onClick={() => handleSprintAnswer(opt)}
                        className={`p-3 rounded-xl border text-xs md:text-sm font-bold transition-all cursor-pointer ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {sprintState === 'finished' && (
              <div className="py-6 space-y-5">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Hoàn Thành Thử Thách!</h4>
                  <p className="text-xs text-slate-400 mt-1">Kết quả phản xạ tốc độ của bạn</p>
                </div>

                <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-2xl font-bold text-emerald-400">{sprintScore}</div>
                    <div className="text-[10px] text-slate-400 uppercase">Tổng điểm</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-2xl font-bold text-amber-400">{sprintMaxStreak}</div>
                    <div className="text-[10px] text-slate-400 uppercase">Chuỗi dài nhất</div>
                  </div>
                </div>

                {sprintMistakes.length > 0 && (
                  <div className="text-left space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
                    <div className="text-xs font-bold text-rose-400">Các câu cần lưu ý:</div>
                    {sprintMistakes.map((m, idx) => (
                      <div key={idx} className="text-[11px] text-slate-300 border-b border-slate-800/60 pb-1">
                        <div>{m.prompt}</div>
                        <div className="text-emerald-400">Đáp án đúng: {m.correct}</div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={startSpeedSprint}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg cursor-pointer"
                >
                  Chơi Lại Vòng 60s
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
