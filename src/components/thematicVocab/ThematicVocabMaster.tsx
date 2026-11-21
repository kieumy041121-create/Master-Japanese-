import React, { useState, useMemo, useEffect, useCallback, useRef, useDeferredValue } from 'react';
import {
  THEMATIC_GROUPS,
  ALL_THEMATIC_TOPICS,
  BASE_THEMATIC_TOPICS,
  ThematicTopic,
  ThematicWord,
  ThematicGroup,
  TOTAL_PRELOADED_WORDS,
  searchMassiveThematicBank,
  resolveAnyWordAsThematicWord
} from '../../data/thematicVocab';
import {
  SITUATIONAL_LOCATIONS,
  searchSituationalSentences,
  generateMoreSituationalSentences,
  resolveAnySentenceAsSituationalSentence,
  SituationalSentence
} from '../../data/thematicVocab/situationalSentencesBank';
import { JLPTLevel } from '../../types';
import {
  generateMoreThematicWords,
  LoadMoreCategory
} from '../../data/thematicVocab/thematicGenerator';
import {
  verifyVocabWithGoogleAi,
  getCachedVerifiedVocab,
  buildGoogleSearchUrl,
  VerifiedVocabResult
} from '../../services/googleAiVocabVerifier';
import { sanitizeVocabPhonetics } from '../../data/kanaRomajiUtils';
import {
  Home,
  Utensils,
  Briefcase,
  Sparkles,
  Award,
  Volume2,
  Search,
  MessageSquare,
  MessagesSquare,
  ShoppingCart,
  ShieldAlert,
  TrainTrack,
  MapPin,
  MessageCircle,
  Plus,
  RotateCcw,
  Play,
  Pause,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Copy,
  BookOpen,
  List,
  Layers,
  HelpCircle,
  ArrowLeft,
  Zap,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Trees,
  Gamepad2,
  Palmtree,
  Film,
  Cpu,
  Leaf,
  Scale,
  Clock,
  CloudSun,
  Palette,
  Compass,
  Heart,
  Activity,
  Coffee,
  ShoppingBag,
  GraduationCap,
  Train,
  Landmark,
  Building2,
  Keyboard,
  Printer,
  Download,
  Flame,
  Eye,
  EyeOff,
  ChevronDown,
  Trophy,
  Check,
  X,
  Bot,
  RefreshCw,
  Share2,
  ExternalLink
} from 'lucide-react';
import { refineVietnameseMeaning } from '../../utils/vietnameseMeaningSanitizer';

interface ThematicVocabMasterProps {
  onBackToDashboard?: () => void;
}

export type StudyViewMode =
  | 'grid'
  | 'table'
  | 'flashcard'
  | 'quiz'
  | 'spelling'
  | 'speedmatch';

export type QuizType = 'jp-to-vn' | 'vn-to-jp' | 'audio-to-word';
export type SrsStatus = 'hard' | 'learning' | 'mastered';

interface SpeedCardItem {
  id: string;
  wordId: string;
  text: string;
  subtext?: string;
  type: 'jp' | 'vn';
  isMatched: boolean;
}

export type MasterTrack = 'topics25' | 'jpt990' | 'massive10k';

export const ThematicVocabMaster: React.FC<ThematicVocabMasterProps> = ({ onBackToDashboard }) => {
  // Navigation & Category state
  const [masterTrack, setMasterTrack] = useState<MasterTrack>('topics25');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
  const [activeTopicId, setActiveTopicId] = useState<string>('topic-1-family');
  const [viewMode, setViewMode] = useState<StudyViewMode>('grid');
  const [gridPage, setGridPage] = useState<number>(1);
  const [situationalLocationFilter, setSituationalLocationFilter] = useState<string>('all');
  const [situationalRoleFilter, setSituationalRoleFilter] = useState<string>('all');
  const [situationalFormalityFilter, setSituationalFormalityFilter] = useState<string>('all');

  // Persistence: Dynamic extra words loaded via "+5 Tải thêm"
  const [topicExtraWordsMap, setTopicExtraWordsMap] = useState<Record<string, ThematicWord[]>>(() => {
    try {
      const saved = localStorage.getItem('kotoba_thematic_extra_words_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save extra words to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kotoba_thematic_extra_words_v2', JSON.stringify(topicExtraWordsMap));
    } catch (e) {
      console.warn('Failed to save thematic extra words to localStorage', e);
    }
  }, [topicExtraWordsMap]);

  // Persistence: SRS Study Status Map (wordId -> 'hard' | 'learning' | 'mastered')
  const [srsStatusMap, setSrsStatusMap] = useState<Record<string, SrsStatus>>(() => {
    try {
      const saved = localStorage.getItem('kotoba_thematic_srs_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kotoba_thematic_srs_v2', JSON.stringify(srsStatusMap));
    } catch (e) {
      console.warn('Failed to save SRS status map', e);
    }
  }, [srsStatusMap]);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('kotoba_thematic_bookmarks_v2');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kotoba_thematic_bookmarks_v2', JSON.stringify(Array.from(bookmarkedIds)));
    } catch (e) {
      console.warn('Failed to save bookmarks', e);
    }
  }, [bookmarkedIds]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [srsFilter, setSrsFilter] = useState<string>('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.9);

  // Load More Menu Toggle
  const [isLoadMoreMenuOpen, setIsLoadMoreMenuOpen] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Flashcard Player State
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState<number>(4);
  const [flashcardFuriganaHidden, setFlashcardFuriganaHidden] = useState<boolean>(false);

  // Quiz State
  const [quizType, setQuizType] = useState<QuizType>('jp-to-vn');
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizAnswerChecked, setQuizAnswerChecked] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Spelling / Typing Practice State
  const [spellingIndex, setSpellingIndex] = useState<number>(0);
  const [spellingInput, setSpellingInput] = useState<string>('');
  const [spellingResult, setSpellingResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [spellingShowHint, setSpellingShowHint] = useState<boolean>(false);
  const [spellingStreak, setSpellingStreak] = useState<number>(0);

  // Speed Match Game State
  const [speedCards, setSpeedCards] = useState<SpeedCardItem[]>([]);
  const [selectedSpeedCard, setSelectedSpeedCard] = useState<SpeedCardItem | null>(null);
  const [speedTimer, setSpeedTimer] = useState<number>(0);
  const [speedGameActive, setSpeedGameActive] = useState<boolean>(false);
  const [speedGameFinished, setSpeedGameFinished] = useState<boolean>(false);
  const [speedBestTime, setSpeedBestTime] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('kotoba_thematic_speed_record');
      return saved ? Number(saved) : null;
    } catch {
      return null;
    }
  });

  // Google AI Verification State
  const [googleAiModalWord, setGoogleAiModalWord] = useState<ThematicWord | null>(null);
  const [googleAiResult, setGoogleAiResult] = useState<VerifiedVocabResult | null>(null);
  const [googleAiLoading, setGoogleAiLoading] = useState<boolean>(false);
  const [verifiedWordsMap, setVerifiedWordsMap] = useState<Record<string, VerifiedVocabResult>>({});

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active topic data
  const baseTopic = useMemo(() => {
    return ALL_THEMATIC_TOPICS.find(t => t.id === activeTopicId) || ALL_THEMATIC_TOPICS[0];
  }, [activeTopicId]);

  // Combine pre-loaded words + dynamically loaded "+5" extra words
  const fullTopicWords = useMemo(() => {
    const extra = topicExtraWordsMap[activeTopicId] || [];
    return [...baseTopic.words, ...extra];
  }, [baseTopic, activeTopicId, topicExtraWordsMap]);

  // Total words across the entire app
  const currentTotalAppWords = useMemo(() => {
    const totalExtras = Object.values(topicExtraWordsMap).reduce((acc, words) => acc + words.length, 0);
    return TOTAL_PRELOADED_WORDS + totalExtras;
  }, [topicExtraWordsMap]);

  // Topic SRS Statistics
  const topicStats = useMemo(() => {
    if (Object.keys(srsStatusMap).length === 0 && bookmarkedIds.size === 0) {
      return {
        total: fullTopicWords.length,
        masteredCount: 0,
        learningCount: 0,
        hardCount: 0,
        bookmarkedCount: 0,
        percentMastered: 0
      };
    }

    let masteredCount = 0;
    let learningCount = 0;
    let hardCount = 0;
    let bookmarkedCount = 0;

    const sampleLimit = Math.min(fullTopicWords.length, 3000);
    for (let i = 0; i < sampleLimit; i++) {
      const w = fullTopicWords[i];
      const st = srsStatusMap[w.id];
      if (st === 'mastered') masteredCount++;
      else if (st === 'hard') hardCount++;
      else if (st === 'learning') learningCount++;

      if (bookmarkedIds.has(w.id)) bookmarkedCount++;
    }

    const percentMastered = fullTopicWords.length > 0
      ? Math.round((masteredCount / fullTopicWords.length) * 100)
      : 0;

    return {
      total: fullTopicWords.length,
      masteredCount,
      learningCount,
      hardCount,
      bookmarkedCount,
      percentMastered
    };
  }, [fullTopicWords, srsStatusMap, bookmarkedIds]);

  // Combine all pre-loaded words across 25 curated topics + JPT exam bank + dynamic extra words
  const allAppThematicWords = useMemo(() => {
    const combined: (ThematicWord & { originTopicTitle?: string; originTopicId?: string })[] = [];
    const seenIds = new Set<string>();

    for (const t of BASE_THEMATIC_TOPICS) {
      const extra = topicExtraWordsMap[t.id] || [];
      const topicWords = [...t.words, ...extra];
      for (const w of topicWords) {
        if (!seenIds.has(w.id)) {
          seenIds.add(w.id);
          combined.push({
            ...w,
            originTopicTitle: t.title,
            originTopicId: t.id
          });
        }
      }
    }
    return combined;
  }, [topicExtraWordsMap]);

  const isGlobalSearching = deferredSearchQuery.trim().length > 0;

  // Filtered words for current view: Searches all 25 curated topics, dedicated JPT 990 exam bank, and massive 200,000+ Joyo Kanji & compound bank
  const displayWords = useMemo(() => {
    if (isGlobalSearching) {
      const q = deferredSearchQuery.toLowerCase().trim();
      const seenIds = new Set<string>();
      const combined: (ThematicWord & { originTopicTitle?: string; originTopicId?: string; isMassiveBank?: boolean; isUniversalFallback?: boolean })[] = [];

      // 1. Search in preloaded 25 topic words + JPT exam bank
      for (const w of allAppThematicWords) {
        if (levelFilter !== 'all' && w.level !== levelFilter) continue;
        if (onlyBookmarks && !bookmarkedIds.has(w.id)) continue;
        if (srsFilter !== 'all' && srsStatusMap[w.id] !== srsFilter) continue;

        if (
          w.word.toLowerCase().includes(q) ||
          w.reading.toLowerCase().includes(q) ||
          w.romaji.toLowerCase().includes(q) ||
          (w.sinoVietnamese && w.sinoVietnamese.toLowerCase().includes(q)) ||
          w.meaningVn.toLowerCase().includes(q) ||
          (w.exampleJp ? w.exampleJp.toLowerCase().includes(q) : false) ||
          (w.exampleVn ? w.exampleVn.toLowerCase().includes(q) : false)
        ) {
          seenIds.add(w.id);
          seenIds.add(w.word.toLowerCase());
          combined.push(w);
        }
      }

      // 2. Search in Massive 200,000+ Bank (Instant 0ms lookup across all 2,230 Joyo Kanji & Affixes)
      const massiveMatches = searchMassiveThematicBank(q, levelFilter, 120);
      for (const mw of massiveMatches) {
        if (seenIds.has(mw.id) || seenIds.has(mw.word.toLowerCase())) continue;
        if (onlyBookmarks && !bookmarkedIds.has(mw.id)) continue;
        if (srsFilter !== 'all' && srsStatusMap[mw.id] !== srsFilter) continue;

        seenIds.add(mw.id);
        seenIds.add(mw.word.toLowerCase());
        combined.push({
          ...mw,
          originTopicTitle: `Đại Kho ${mw.level}`,
          originTopicId: `topic-massive-${mw.level.toLowerCase()}`,
          isMassiveBank: true
        });
      }

      // 3. Search in Situational Sentences Bank (5.000+ Mẫu Câu Đàm Thoại & Tình Huống Từng Địa Điểm)
      const situationalMatches = searchSituationalSentences(q, 'all', 'all', 'all', 60);
      for (const sw of situationalMatches) {
        if (seenIds.has(sw.id) || seenIds.has(sw.word.toLowerCase())) continue;
        if (onlyBookmarks && !bookmarkedIds.has(sw.id)) continue;
        if (srsFilter !== 'all' && srsStatusMap[sw.id] !== srsFilter) continue;

        seenIds.add(sw.id);
        seenIds.add(sw.word.toLowerCase());
        combined.push({
          ...sw,
          originTopicTitle: `💬 Mẫu câu: ${sw.locationName}`,
          originTopicId: 'topic-massive-situational-sentences',
          isMassiveBank: true
        });
      }

      // 4. Universal Fallback Resolver: Zero Missing Words & Sentences Guarantee
      if (combined.length === 0 || (/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/.test(q) && !seenIds.has(q))) {
        const isSentencePattern =
          activeTopicId === 'topic-massive-situational-sentences' ||
          deferredSearchQuery.length > 5 ||
          deferredSearchQuery.includes(' ') ||
          deferredSearchQuery.includes('tôi') ||
          deferredSearchQuery.includes('cho') ||
          deferredSearchQuery.includes('hỏi') ||
          deferredSearchQuery.includes('ở đâu') ||
          deferredSearchQuery.includes('bao nhiêu') ||
          deferredSearchQuery.includes('lấy') ||
          deferredSearchQuery.includes('vé');

        if (isSentencePattern) {
          const resolvedSentence = resolveAnySentenceAsSituationalSentence(deferredSearchQuery.trim());
          if (resolvedSentence && !seenIds.has(resolvedSentence.word.toLowerCase())) {
            seenIds.add(resolvedSentence.word.toLowerCase());
            combined.unshift({
              ...resolvedSentence,
              originTopicTitle: '💬 Mẫu Câu Tình Huống (Tra Cứu 100%)',
              isUniversalFallback: true
            });
          }
        } else {
          const targetLvl = (levelFilter !== 'all' ? levelFilter : 'N3') as JLPTLevel;
          const resolved = resolveAnyWordAsThematicWord(deferredSearchQuery.trim(), targetLvl);
          if (resolved && !seenIds.has(resolved.word.toLowerCase())) {
            seenIds.add(resolved.word.toLowerCase());
            combined.unshift({
              ...resolved,
              originTopicTitle: '⚡ Đại Kho Toàn Năng (Tra Cứu 100%)',
              isUniversalFallback: true
            });
          }
        }
      }

      return combined;
    }

    let result = fullTopicWords as (ThematicWord & {
      originTopicTitle?: string;
      originTopicId?: string;
      isMassiveBank?: boolean;
      isUniversalFallback?: boolean;
      locationId?: string;
      locationName?: string;
      situation?: string;
      speakerRole?: string;
      formalityLevel?: string;
      counterpartReplyJp?: string;
      counterpartReplyVn?: string;
      usageTips?: string;
    })[];

    // Filters for situational sentences topic
    if (activeTopicId === 'topic-massive-situational-sentences') {
      if (situationalLocationFilter !== 'all') {
        result = result.filter(w => (w as any).locationId === situationalLocationFilter);
      }
      if (situationalRoleFilter !== 'all') {
        result = result.filter(w => (w as any).speakerRole === situationalRoleFilter);
      }
      if (situationalFormalityFilter !== 'all') {
        result = result.filter(w => (w as any).formalityLevel === situationalFormalityFilter);
      }
    }

    if (levelFilter !== 'all') {
      result = result.filter(w => w.level === levelFilter);
    }

    if (onlyBookmarks) {
      result = result.filter(w => bookmarkedIds.has(w.id));
    }

    if (srsFilter !== 'all') {
      result = result.filter(w => srsStatusMap[w.id] === srsFilter);
    }

    return result;
  }, [
    isGlobalSearching,
    allAppThematicWords,
    fullTopicWords,
    activeTopicId,
    situationalLocationFilter,
    situationalRoleFilter,
    situationalFormalityFilter,
    levelFilter,
    onlyBookmarks,
    srsFilter,
    deferredSearchQuery,
    bookmarkedIds,
    srsStatusMap
  ]);

  // Paginated window for silky smooth performance on massive databases (up to 5.000+ words per topic)
  const paginatedWords = useMemo(() => {
    if (displayWords.length <= 60) return displayWords;
    const start = (gridPage - 1) * 60;
    return displayWords.slice(start, start + 60);
  }, [displayWords, gridPage]);

  const totalPages = Math.ceil(displayWords.length / 60) || 1;

  // Toast notifier
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Text-to-speech pronunciation
  const speakJapanese = useCallback(
    (text: string, overrideRate?: number) => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = overrideRate || speechRate;
      window.speechSynthesis.speak(utterance);
    },
    [speechRate]
  );

  // Close load more menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (loadMoreRef.current && !loadMoreRef.current.contains(e.target as Node)) {
        setIsLoadMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Load More Words with targeted category and count
  const handleLoadMore = (category: LoadMoreCategory = 'general', count: number = 5) => {
    const currentCount = fullTopicWords.length;

    if (activeTopicId === 'topic-massive-situational-sentences') {
      const moreSentences = generateMoreSituationalSentences(situationalLocationFilter, currentCount, count * 4);
      setTopicExtraWordsMap(prev => {
        const existing = prev[activeTopicId] || [];
        return {
          ...prev,
          [activeTopicId]: [...existing, ...moreSentences]
        };
      });
      setIsLoadMoreMenuOpen(false);
      const locInfo = SITUATIONAL_LOCATIONS.find(l => l.id === situationalLocationFilter);
      const locName = locInfo ? locInfo.nameVn : 'Tất cả địa điểm';
      showToast(`Đã nạp thêm +${count * 4} mẫu câu đàm thoại mới cho "${locName}"! (Hiện có ${currentCount + count * 4} mẫu câu)`);
      return;
    }

    const moreWords = generateMoreThematicWords(activeTopicId, currentCount, count, category);

    setTopicExtraWordsMap(prev => {
      const existing = prev[activeTopicId] || [];
      return {
        ...prev,
        [activeTopicId]: [...existing, ...moreWords]
      };
    });

    setIsLoadMoreMenuOpen(false);

    let categoryLabel = 'Từ mới mở rộng';
    if (activeTopicId === 'topic-jpt-mastery') categoryLabel = 'Cụm từ bẫy thi JPT 990 điểm';
    else if (category === 'advanced') categoryLabel = 'Từ vựng N2-N1 chuyên sâu';
    else if (category === 'collocation') categoryLabel = 'Cụm quán dụng ngữ / Collocations';
    else if (category === 'practical') categoryLabel = 'Từ giao tiếp thực chiến';

    showToast(`Đã thêm +${count} ${categoryLabel} cho "${baseTopic.title}"! (Hiện có ${currentCount + count} từ)`);
  };

  // Set SRS Status
  const setWordSrsStatus = (wordId: string, status: SrsStatus) => {
    setSrsStatusMap(prev => {
      const next = { ...prev };
      if (next[wordId] === status) {
        delete next[wordId]; // toggle off
      } else {
        next[wordId] = status;
      }
      return next;
    });
  };

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Export to CSV for Anki / Excel
  const handleExportCsv = () => {
    if (displayWords.length === 0) {
      showToast('Không có từ vựng nào để xuất!');
      return;
    }

    const headers = [
      'Từ vựng (Kanji)',
      'Cách đọc (Hiragana)',
      'Romaji',
      'Hán Việt',
      'Nghĩa tiếng Việt',
      'Cấp độ',
      'Câu ví dụ tiếng Nhật',
      'Dịch ví dụ tiếng Việt'
    ];
    const rows = displayWords.map(w => [
      `"${w.word.replace(/"/g, '""')}"`,
      `"${w.reading.replace(/"/g, '""')}"`,
      `"${w.romaji.replace(/"/g, '""')}"`,
      `"${(w.sinoVietnamese || '').replace(/"/g, '""')}"`,
      `"${refineVietnameseMeaning(w.meaningVn).replace(/"/g, '""')}"`,
      `"${w.level}"`,
      `"${(w.exampleJp || '').replace(/"/g, '""')}"`,
      `"${(w.exampleVn || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `kotoba_${baseTopic.id}_vocab_${displayWords.length}_words.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Đã xuất thành công ${displayWords.length} từ ra file CSV tương thích Anki!`);
  };

  // Print view
  const handlePrint = () => {
    window.print();
  };

  // Copy all words
  const handleCopyAllWords = () => {
    const text = displayWords
      .map(
        (w, i) =>
          `${i + 1}. ${w.word} (${w.reading} - ${w.romaji})${w.sinoVietnamese ? ` [${w.sinoVietnamese}]` : ''} [${w.level}]: ${refineVietnameseMeaning(w.meaningVn)}${w.exampleJp ? `\n   Ví dụ: ${w.exampleJp} -> ${w.exampleVn || ''}` : ''}`
      )
      .join('\n\n');

    navigator.clipboard.writeText(text);
    showToast(`Đã sao chép ${displayWords.length} từ vựng vào clipboard!`);
  };

  // Auto-play flashcard effect
  useEffect(() => {
    if (!isAutoPlaying || displayWords.length === 0) return;

    const timer = setInterval(() => {
      if (!isFlipped) {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
        setCardIndex(prev => (prev + 1) % displayWords.length);
      }
    }, autoPlayInterval * 1000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isFlipped, displayWords.length, autoPlayInterval]);

  // Pronounce word when card changes in auto-play
  useEffect(() => {
    if (isAutoPlaying && displayWords[cardIndex] && !isFlipped) {
      speakJapanese(displayWords[cardIndex].word);
    }
  }, [cardIndex, isAutoPlaying, isFlipped, displayWords, speakJapanese]);

  // Clamp cardIndex and reset gridPage on filter/topic changes
  useEffect(() => {
    if (cardIndex >= displayWords.length && displayWords.length > 0) {
      setCardIndex(0);
    }
  }, [displayWords.length, cardIndex]);

  useEffect(() => {
    setGridPage(1);
  }, [
    activeTopicId,
    searchQuery,
    levelFilter,
    onlyBookmarks,
    srsFilter,
    situationalLocationFilter,
    situationalRoleFilter,
    situationalFormalityFilter
  ]);

  // Keyboard navigation for Flashcard mode
  useEffect(() => {
    if (viewMode !== 'flashcard' || displayWords.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setIsFlipped(false);
        setCardIndex(prev => (prev < displayWords.length - 1 ? prev + 1 : 0));
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setIsFlipped(false);
        setCardIndex(prev => (prev > 0 ? prev - 1 : displayWords.length - 1));
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        const currentWord = displayWords[cardIndex];
        if (currentWord) speakJapanese(currentWord.word);
      } else if (e.key === '1') {
        e.preventDefault();
        const currentWord = displayWords[cardIndex];
        if (currentWord) {
          setWordSrsStatus(currentWord.id, 'hard');
          showToast(`Đã đánh dấu "${currentWord.word}" vào danh sách: Cần luyện`);
        }
      } else if (e.key === '2') {
        e.preventDefault();
        const currentWord = displayWords[cardIndex];
        if (currentWord) {
          setWordSrsStatus(currentWord.id, 'mastered');
          showToast(`Đã đánh dấu "${currentWord.word}" vào danh sách: Đã thuộc`);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, displayWords, cardIndex, speakJapanese]);

  // Quiz Questions generation for active topic (O(1) random sampling for 60fps buttery smooth performance)
  const quizQuestions = useMemo(() => {
    const len = fullTopicWords.length;
    if (len < 4) return [];

    const targetIndices = new Set<number>();
    const count = Math.min(10, len);
    while (targetIndices.size < count) {
      targetIndices.add(Math.floor(Math.random() * len));
    }

    return Array.from(targetIndices).map(idx => {
      const target = fullTopicWords[idx];
      const wrong: ThematicWord[] = [];
      const wrongSet = new Set<number>([idx]);
      let attempts = 0;
      while (wrong.length < 3 && wrong.length < len - 1 && attempts < 50) {
        attempts++;
        const randIdx = Math.floor(Math.random() * len);
        if (!wrongSet.has(randIdx)) {
          wrongSet.add(randIdx);
          wrong.push(fullTopicWords[randIdx]);
        }
      }
      const options = [target, ...wrong].sort(() => 0.5 - Math.random());
      const correctIdx = options.findIndex(o => o.id === target.id);
      return {
        target,
        options,
        correctIdx
      };
    });
  }, [fullTopicWords]);

  const handleSelectQuizOption = (idx: number) => {
    if (quizAnswerChecked) return;
    setSelectedQuizOption(idx);
    setQuizAnswerChecked(true);

    const q = quizQuestions[quizIndex];
    if (q && idx === q.correctIdx) {
      setQuizScore(prev => prev + 1);
      speakJapanese(q.target.word);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedQuizOption(null);
      setQuizAnswerChecked(false);
      if (quizType === 'audio-to-word' && quizQuestions[quizIndex + 1]) {
        setTimeout(() => speakJapanese(quizQuestions[quizIndex + 1].target.word), 300);
      }
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedQuizOption(null);
    setQuizAnswerChecked(false);
    setQuizFinished(false);
    if (quizType === 'audio-to-word' && quizQuestions[0]) {
      setTimeout(() => speakJapanese(quizQuestions[0].target.word), 400);
    }
  };

  // Speed Match Game Initialization
  const startSpeedMatchGame = useCallback(() => {
    if (fullTopicWords.length < 6) return;
    const sampleWords: ThematicWord[] = [];
    const chosenIndices = new Set<number>();
    const maxSamples = Math.min(6, fullTopicWords.length);
    while (chosenIndices.size < maxSamples) {
      const idx = Math.floor(Math.random() * fullTopicWords.length);
      if (!chosenIndices.has(idx)) {
        chosenIndices.add(idx);
        sampleWords.push(fullTopicWords[idx]);
      }
    }

    const cards: SpeedCardItem[] = [];
    sampleWords.forEach(w => {
      cards.push({
        id: `jp-${w.id}`,
        wordId: w.id,
        text: w.word,
        subtext: w.reading,
        type: 'jp',
        isMatched: false
      });
      cards.push({
        id: `vn-${w.id}`,
        wordId: w.id,
        text: refineVietnameseMeaning(w.meaningVn),
        type: 'vn',
        isMatched: false
      });
    });

    setSpeedCards(cards.sort(() => 0.5 - Math.random()));
    setSelectedSpeedCard(null);
    setSpeedTimer(0);
    setSpeedGameActive(true);
    setSpeedGameFinished(false);
  }, [fullTopicWords]);

  // Speed Match Timer
  useEffect(() => {
    let interval: any = null;
    if (speedGameActive && !speedGameFinished) {
      interval = setInterval(() => {
        setSpeedTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [speedGameActive, speedGameFinished]);

  // Handle Speed Match Card Selection
  const handleSelectSpeedCard = (card: SpeedCardItem) => {
    if (card.isMatched) return;

    if (!selectedSpeedCard) {
      setSelectedSpeedCard(card);
      if (card.type === 'jp') speakJapanese(card.text);
      return;
    }

    if (selectedSpeedCard.id === card.id) {
      setSelectedSpeedCard(null);
      return;
    }

    if (selectedSpeedCard.wordId === card.wordId && selectedSpeedCard.type !== card.type) {
      const matchedWord = fullTopicWords.find(w => w.id === card.wordId);
      if (matchedWord) speakJapanese(matchedWord.word);

      setSpeedCards(prev =>
        prev.map(c => (c.wordId === card.wordId ? { ...c, isMatched: true } : c))
      );
      setSelectedSpeedCard(null);

      const remaining = speedCards.filter(c => !c.isMatched && c.wordId !== card.wordId);
      if (remaining.length === 0) {
        setSpeedGameFinished(true);
        setSpeedGameActive(false);
        const finalTime = speedTimer + 1;
        if (!speedBestTime || finalTime < speedBestTime) {
          setSpeedBestTime(finalTime);
          try {
            localStorage.setItem('kotoba_thematic_speed_record', String(finalTime));
          } catch {}
          showToast(`KỶ LỤC MỚI! Hoàn thành xuất sắc sau ${finalTime} giây!`);
        } else {
          showToast(`Chúc mừng! Bạn đã ghép thành công 6 cặp từ sau ${finalTime} giây!`);
        }
      }
    } else {
      setSelectedSpeedCard(card);
      if (card.type === 'jp') speakJapanese(card.text);
    }
  };

  // Spelling Practice submit
  const handleCheckSpelling = () => {
    const currentWord = displayWords[spellingIndex];
    if (!currentWord || !spellingInput.trim()) return;

    const cleaned = spellingInput.trim().toLowerCase();
    const correctReading = currentWord.reading.toLowerCase();
    const correctRomaji = currentWord.romaji.toLowerCase();

    const isMatch = cleaned === correctReading || cleaned === correctRomaji;

    if (isMatch) {
      setSpellingResult('correct');
      setSpellingStreak(prev => prev + 1);
      speakJapanese(currentWord.word);
    } else {
      setSpellingResult('wrong');
      setSpellingStreak(0);
    }
  };

  const handleNextSpellingWord = () => {
    setSpellingInput('');
    setSpellingResult('idle');
    setSpellingShowHint(false);
    setSpellingIndex(prev => (prev < displayWords.length - 1 ? prev + 1 : 0));
  };

  // ⚡ GOOGLE AI 100% VERIFICATION HANDLER
  const handleVerifyWordWithGoogleAi = useCallback(
    async (word: ThematicWord) => {
      setGoogleAiModalWord(word);

      // Check cache first for 0ms response
      const cached = getCachedVerifiedVocab(word.word);
      if (cached && cached.isAiVerified) {
        setGoogleAiResult(cached);
        setGoogleAiLoading(false);
        return;
      }

      setGoogleAiLoading(true);
      // Immediate clean fallback
      const initialClean = sanitizeVocabPhonetics(word.word, word.reading, word.romaji, word.sinoVietnamese);
      setGoogleAiResult({
        word: word.word,
        kanji: word.word,
        kana: initialClean.cleanReading,
        romaji: initialClean.cleanRomaji,
        sinoVietnamese: initialClean.cleanSinoViet || word.sinoVietnamese || '',
        jlptLevel: word.level,
        meaningVn: word.meaningVn,
        exampleJp: word.exampleJp,
        exampleVn: word.exampleVn,
        isAiVerified: false,
        verifiedAt: new Date().toISOString(),
        googleSearchUrl: buildGoogleSearchUrl(word.word, 'meaning')
      });

      try {
        const verified = await verifyVocabWithGoogleAi(word.word, word.reading, word.meaningVn, word.level);
        setGoogleAiResult(verified);
        if (verified.isAiVerified) {
          setVerifiedWordsMap(prev => ({ ...prev, [word.id]: verified }));
        }
      } catch {
        showToast('Đã dùng bộ đối chiếu chuẩn điển cho từ vựng này.');
      } finally {
        setGoogleAiLoading(false);
      }
    },
    [showToast]
  );

  const handleApplyVerifiedWord = useCallback(
    (verified: VerifiedVocabResult) => {
      if (!googleAiModalWord) return;
      setVerifiedWordsMap(prev => ({
        ...prev,
        [googleAiModalWord.id]: verified
      }));
      showToast(`✓ Đã áp dụng chuẩn hóa 100% cho từ "${verified.word}"!`);
      setGoogleAiModalWord(null);
    },
    [googleAiModalWord, showToast]
  );

  // Render Topic Icon
  const renderTopicIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Home': return <Home className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Trees': return <Trees className={className} />;
      case 'Gamepad2': return <Gamepad2 className={className} />;
      case 'Palmtree': return <Palmtree className={className} />;
      case 'Film': return <Film className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Leaf': return <Leaf className={className} />;
      case 'Scale': return <Scale className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'CloudSun': return <CloudSun className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Coffee': return <Coffee className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Train': return <Train className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'MessagesSquare': return <MessagesSquare className={className} />;
      case 'MessageSquare': return <MessageSquare className={className} />;
      case 'MessageCircle': return <MessageCircle className={className} />;
      case 'ShoppingCart': return <ShoppingCart className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'TrainTrack': return <TrainTrack className={className} />;
      case 'MapPin': return <MapPin className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  // Topics list for group filter based on master track
  const topicsToDisplay = useMemo(() => {
    if (masterTrack === 'jpt990') {
      return ALL_THEMATIC_TOPICS.filter(t => t.id === 'topic-jpt-mastery');
    }
    if (masterTrack === 'massive10k') {
      return ALL_THEMATIC_TOPICS.filter(t => t.groupId === 'massive_jlpt_mastery');
    }
    // masterTrack === 'topics25'
    if (selectedGroupId === 'all' || selectedGroupId === 'jpt_exam_mastery' || selectedGroupId === 'massive_jlpt_mastery') {
      return ALL_THEMATIC_TOPICS.filter(t => t.groupId !== 'jpt_exam_mastery' && t.groupId !== 'massive_jlpt_mastery');
    }
    return ALL_THEMATIC_TOPICS.filter(t => t.groupId === selectedGroupId);
  }, [masterTrack, selectedGroupId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-emerald-500/50 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md transition-all animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <header className="relative bg-slate-950 border-b border-slate-800/80 px-4 sm:px-8 py-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950/60 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              {/* Breadcrumb metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                {onBackToDashboard && (
                  <button
                    onClick={onBackToDashboard}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </button>
                )}
                {onBackToDashboard && <span aria-hidden="true">·</span>}
                <span className="text-indigo-400 font-semibold flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  25 Chủ Đề Kinh Điển
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Kỳ Thi JPT Chuẩn Quốc Tế (Thang 990)
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Đại Kho Toàn Năng 200.000+ (N5–N1)
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex flex-wrap items-center gap-3">
                <span>TỪ VỰNG THEO CHỦ ĐỀ & ĐẠI KHO TOÀN THƯ</span>
                <span className="text-xs sm:text-sm font-bold px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full tracking-normal">
                  ⚡ 50.000+ Từ Vựng & 5.000+ Mẫu Câu
                </span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
                Hệ sinh thái học tập toàn diện được phân tách thành 3 mục lớn chuyên biệt: <strong className="text-indigo-300">25 Chủ Đề Kinh Điển</strong>, <strong className="text-amber-300">Kỳ Thi JPT Chuẩn Quốc Tế (Thang 990)</strong>, và <strong className="text-emerald-300 font-bold">Đại Kho Toàn Năng 50.000+ Từ Vựng & 5.000+ Mẫu Câu JLPT N5–N1</strong> (bao quát trọn vẹn 2.230 chữ Hán Joyo Kanji, từ ghép, tiền tố/hậu tố, động từ Suru, thành ngữ 4 chữ & 10 địa điểm thực tế tại Nhật) với công nghệ tra cứu 100% Zero Missing Words & Sentences tức thì (0ms).
              </p>
            </div>

            {/* Topic SRS Stats Panel */}
            <div className="flex flex-wrap sm:flex-nowrap gap-4 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl shadow-xl">
              <div className="px-3 py-1.5 border-r border-slate-800/80 text-center sm:text-left">
                <div className="text-[11px] text-slate-400">
                  {activeTopicId === 'topic-massive-situational-sentences' ? 'Mẫu Câu Tình Huống' : 'Từ Vựng Chủ Đề'}
                </div>
                <div className="text-lg font-black text-white">
                  {topicStats.total} {activeTopicId === 'topic-massive-situational-sentences' ? 'câu' : 'từ'}
                </div>
              </div>
              <div className="px-3 py-1.5 border-r border-slate-800/80 text-center sm:text-left">
                <div className="text-[11px] text-emerald-400">Đã Thuộc (SRS)</div>
                <div className="text-lg font-black text-emerald-400">
                  {topicStats.masteredCount} {activeTopicId === 'topic-massive-situational-sentences' ? 'câu' : 'từ'} ({topicStats.percentMastered}%)
                </div>
              </div>
              <div className="px-3 py-1.5 text-center sm:text-left">
                <div className="text-[11px] text-amber-400">Cần Luyện</div>
                <div className="text-lg font-black text-amber-400">
                  {topicStats.hardCount} {activeTopicId === 'topic-massive-situational-sentences' ? 'câu' : 'từ'}
                </div>
              </div>
            </div>
          </div>

          {/* 3 MỤC LỚN RIÊNG BIỆT (MASTER TRACKS) */}
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl">
            <button
              onClick={() => {
                setMasterTrack('topics25');
                setSelectedGroupId('all');
                if (activeTopicId === 'topic-jpt-mastery' || activeTopicId.startsWith('topic-massive-')) {
                  setActiveTopicId('topic-1-family');
                }
                setGridPage(1);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition cursor-pointer border ${
                masterTrack === 'topics25'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-950/50 border-indigo-400/50'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                masterTrack === 'topics25' ? 'bg-white/20 text-white' : 'bg-slate-800 text-indigo-400'
              }`}>
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="font-black text-xs sm:text-sm">25 CHỦ ĐỀ KINH ĐIỂN</div>
                <div className="text-[11px] opacity-80">5 Nhóm Đời Sống & Chuyên Ngành</div>
              </div>
            </button>

            <button
              onClick={() => {
                setMasterTrack('jpt990');
                setSelectedGroupId('jpt_exam_mastery');
                setActiveTopicId('topic-jpt-mastery');
                setGridPage(1);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition cursor-pointer border ${
                masterTrack === 'jpt990'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-950/50 border-amber-400/50'
                  : 'bg-slate-950/60 text-amber-300/80 hover:text-amber-200 hover:bg-slate-800/60 border-transparent'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                masterTrack === 'jpt990' ? 'bg-white/20 text-white' : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
              }`}>
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="font-black text-xs sm:text-sm">🏆 KỲ THI JPT QUỐC TẾ</div>
                <div className="text-[11px] opacity-80">Thang Điểm 990 & Bẫy Đề Thi</div>
              </div>
            </button>

            <button
              onClick={() => {
                setMasterTrack('massive10k');
                setSelectedGroupId('massive_jlpt_mastery');
                if (!activeTopicId.startsWith('topic-massive-')) {
                  setActiveTopicId('topic-massive-n5');
                }
                setGridPage(1);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition cursor-pointer border ${
                masterTrack === 'massive10k'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-lg shadow-emerald-950/50 border-emerald-400/50'
                  : 'bg-slate-950/60 text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/60 border-transparent'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                masterTrack === 'massive10k' ? 'bg-white/20 text-white' : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
              }`}>
                <Zap className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
              <div>
                <div className="font-black text-xs sm:text-sm flex items-center gap-1.5">
                  <span>⚡ ĐẠI KHO 50.000+ TỪ VỰNG</span>
                </div>
                <div className="text-[11px] opacity-80">50.000+ từ & 5.000+ mẫu câu N5–N1</div>
              </div>
            </button>
          </div>

          {/* Sub Navigation per Master Track */}
          {masterTrack === 'topics25' && (
            <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
              <button
                onClick={() => setSelectedGroupId('all')}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border ${
                  selectedGroupId === 'all'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Tất cả 25 Chủ đề kinh điển</span>
              </button>

              {THEMATIC_GROUPS.filter(g => g.id !== 'jpt_exam_mastery' && g.id !== 'massive_jlpt_mastery').map(grp => {
                const isSelected = selectedGroupId === grp.id;
                const groupTopics = ALL_THEMATIC_TOPICS.filter(t => t.groupId === grp.id);
                const totalWordsInGrp = groupTopics.reduce((acc, t) => {
                  const extra = (topicExtraWordsMap[t.id] || []).length;
                  return acc + (t.wordCount ?? t.words.length) + extra;
                }, 0);

                return (
                  <button
                    key={grp.id}
                    onClick={() => setSelectedGroupId(grp.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                        : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {renderTopicIcon(grp.iconName, 'w-4 h-4')}
                    <span>{grp.shortTitle}</span>
                    <span className="text-[11px] text-slate-300">· {totalWordsInGrp} từ</span>
                  </button>
                );
              })}
            </div>
          )}

          {masterTrack === 'massive10k' && (
            <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
              {ALL_THEMATIC_TOPICS.filter(t => t.groupId === 'massive_jlpt_mastery').map(topic => {
                const isActive = activeTopicId === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setActiveTopicId(topic.id);
                      setCardIndex(0);
                      setIsFlipped(false);
                      setGridPage(1);
                    }}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition border cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-400'
                        : 'bg-slate-900/90 text-slate-300 hover:text-white border-slate-800 hover:border-emerald-500/40'
                    }`}
                  >
                    <Zap className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-400'}`} />
                    <span>{topic.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        {/* Horizontal Topic Grid Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-2 text-slate-300">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Danh Mục Chủ Đề ({topicsToDisplay.length})
            </span>
            <span>
              Đang học: <strong className="text-white">{baseTopic.title}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {topicsToDisplay.map(topic => {
              const isActive = topic.id === activeTopicId;
              const extraCount = (topicExtraWordsMap[topic.id] || []).length;
              const totalCount = (topic.wordCount ?? topic.words.length) + extraCount;
              const isJptTopic = topic.id === 'topic-jpt-mastery';
              const isMassiveTopic = topic.id.startsWith('topic-massive-');

              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setActiveTopicId(topic.id);
                    setCardIndex(0);
                    setIsFlipped(false);
                    setIsAutoPlaying(false);
                    handleRestartQuiz();
                    setSpellingIndex(0);
                    setSpellingInput('');
                    setSpellingResult('idle');
                    setGridPage(1);
                    if (viewMode === 'speedmatch') startSpeedMatchGame();
                  }}
                  className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between group relative cursor-pointer ${
                    isActive
                      ? isJptTopic
                        ? 'bg-amber-950/40 border-amber-500/80 ring-2 ring-amber-500/40 shadow-2xl shadow-amber-950/50'
                        : isMassiveTopic
                          ? 'bg-emerald-950/40 border-emerald-500/80 ring-2 ring-emerald-500/40 shadow-2xl shadow-emerald-950/50'
                          : 'bg-slate-900 border-indigo-500/80 ring-1 ring-indigo-500/40 shadow-xl'
                      : isJptTopic
                        ? 'bg-amber-950/20 hover:bg-amber-950/40 border-amber-500/40 hover:border-amber-400'
                        : isMassiveTopic
                          ? 'bg-emerald-950/20 hover:bg-emerald-950/40 border-emerald-500/30 hover:border-emerald-400'
                          : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        isActive
                          ? isJptTopic
                            ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md'
                            : isMassiveTopic
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md'
                              : 'bg-indigo-600 text-white shadow-md'
                          : isJptTopic
                            ? 'bg-amber-900/60 text-amber-300'
                            : isMassiveTopic
                              ? 'bg-emerald-900/50 text-emerald-300'
                              : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {renderTopicIcon(topic.iconName, 'w-4 h-4')}
                    </div>
                    <div className="flex flex-col items-end">
                      {isJptTopic && (
                        <span className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-1">
                          Thang 990
                        </span>
                      )}
                      {topic.id === 'topic-massive-situational-sentences' ? (
                        <span className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-cyan-500/40 mb-1">
                          💬 5.000+ CÂU
                        </span>
                      ) : isMassiveTopic && (
                        <span className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-1">
                          ⚡ ĐẠI KHO
                        </span>
                      )}
                      <span className={`text-[11px] font-semibold ${
                        isJptTopic
                          ? 'text-amber-300'
                          : topic.id === 'topic-massive-situational-sentences'
                            ? 'text-cyan-300'
                            : isMassiveTopic
                              ? 'text-emerald-300'
                              : 'text-slate-400'
                      }`}>
                        {totalCount} {topic.id === 'topic-massive-situational-sentences' ? 'câu' : 'từ'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3
                      className={`text-xs sm:text-sm font-bold line-clamp-1 ${
                        isActive
                          ? isJptTopic ? 'text-amber-200' : 'text-white'
                          : isJptTopic ? 'text-amber-300 group-hover:text-amber-100' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {topic.title}
                    </h3>
                    <p className={`text-[11px] line-clamp-1 mt-0.5 ${isJptTopic ? 'text-amber-400/70' : 'text-slate-500'}`}>
                      {topic.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Topic Workspace */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-sm">
          {/* Active Topic Header & Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                <span>{baseTopic.groupTitle}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-semibold">{fullTopicWords.length} Từ vựng sẵn sàng</span>
                <span aria-hidden="true">·</span>
                <span>{topicStats.percentMastered}% đã thuộc</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-600 text-white shadow-md">
                  {renderTopicIcon(baseTopic.iconName, 'w-5 h-5')}
                </span>
                {baseTopic.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
                {baseTopic.description}
              </p>
            </div>

            {/* Actions: +3 Bẫy thi JPT (nếu ở chuyên đề JPT), +5 Tải thêm Vượt Chuẩn, Xuất CSV, In & Copy */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Dedicated +3 JPT Traps Button when viewing JPT topic */}
              {activeTopicId === 'topic-jpt-mastery' && (
                <button
                  onClick={() => handleLoadMore('general', 3)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 shadow-lg shadow-amber-950/40 transition border border-amber-300 cursor-pointer"
                  title="Tải thêm 3 cụm từ bẫy đề thi JPT chuẩn quốc tế thang điểm 990"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>+3 Tải thêm bẫy thi JPT (Thang 990)</span>
                </button>
              )}

              {/* Dedicated +20 Situational Sentences Button when viewing situational topic */}
              {activeTopicId === 'topic-massive-situational-sentences' && (
                <button
                  onClick={() => handleLoadMore('general', 5)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-950/40 transition border border-blue-400 cursor-pointer"
                  title="Nạp thêm +20 mẫu câu đàm thoại mới theo địa điểm thực tế (Mở rộng không giới hạn)"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>+20 Nạp mẫu câu mới (Không giới hạn)</span>
                </button>
              )}

              {/* +5 Tải thêm dropdown menu */}
              <div className="relative" ref={loadMoreRef}>
                <button
                  onClick={() => setIsLoadMoreMenuOpen(!isLoadMoreMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+5 Tải thêm</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                </button>

                {isLoadMoreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-30 py-2 divide-y divide-slate-800/80">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Chọn thể loại từ cần tải
                    </div>
                    <div className="p-1 space-y-1">
                      {activeTopicId === 'topic-jpt-mastery' && (
                        <button
                          onClick={() => handleLoadMore('general', 3)}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs text-amber-200 hover:bg-slate-800 flex items-center justify-between bg-amber-950/40 border border-amber-500/40 mb-1"
                        >
                          <div>
                            <div className="font-bold text-amber-300">+3 Cụm từ bẫy thi JPT (Thang 990)</div>
                            <div className="text-[10px] text-slate-400">Bẫy phát âm SOUSAI, từ đồng âm & ngữ cảnh B2B</div>
                          </div>
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        </button>
                      )}
                      <button
                        onClick={() => handleLoadMore('general', 5)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-white">+5 Từ mới mặc định</div>
                          <div className="text-[10px] text-slate-400">Từ vựng thiết yếu của chủ đề</div>
                        </div>
                        <Plus className="w-3.5 h-3.5 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => handleLoadMore('advanced', 5)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-indigo-300">+5 Từ N2 - N1 chuyên sâu</div>
                          <div className="text-[10px] text-slate-400">Cụm từ học thuật, đao to búa lớn</div>
                        </div>
                        <Plus className="w-3.5 h-3.5 text-indigo-400" />
                      </button>
                      <button
                        onClick={() => handleLoadMore('practical', 5)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-teal-300">+5 Từ thực chiến hội thoại</div>
                          <div className="text-[10px] text-slate-400">Khẩu ngữ người Nhật hay dùng</div>
                        </div>
                        <Plus className="w-3.5 h-3.5 text-teal-400" />
                      </button>
                      <button
                        onClick={() => handleLoadMore('collocation', 5)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-amber-300">+5 Cụm từ đi kèm (Collocation)</div>
                          <div className="text-[10px] text-slate-400">Quán dụng ngữ tự nhiên theo đề</div>
                        </div>
                        <Plus className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Export CSV for Anki */}
              <button
                onClick={handleExportCsv}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                title="Xuất file CSV cho Anki / Excel"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Xuất CSV</span>
              </button>

              {/* Print Study Sheet */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                title="In danh sách từ vựng chuẩn A4"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">In ấn</span>
              </button>

              {/* Copy all */}
              <button
                onClick={handleCopyAllWords}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                title="Sao chép toàn bộ"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sao chép</span>
              </button>
            </div>
          </div>

          {/* 7 STUDY MODES SEGMENTED CONTROLS */}
          <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Thẻ Trực Quan</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Từ Điển Bỏ Túi</span>
            </button>

            <button
              onClick={() => {
                setViewMode('flashcard');
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                viewMode === 'flashcard'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lật Thẻ 3D</span>
            </button>

            <button
              onClick={() => {
                setViewMode('quiz');
                handleRestartQuiz();
              }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                viewMode === 'quiz'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Đấu Trường Trắc Nghiệm</span>
            </button>

            <button
              onClick={() => {
                setViewMode('spelling');
                setSpellingIndex(0);
                setSpellingInput('');
                setSpellingResult('idle');
              }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                viewMode === 'spelling'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>Luyện Gõ & Chính Tả</span>
            </button>

            <button
              onClick={() => {
                setViewMode('speedmatch');
                startSpeedMatchGame();
              }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                viewMode === 'speedmatch'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Ghép Nhanh Tốc Độ</span>
            </button>

            <a
              href={buildGoogleSearchUrl(displayWords[0]?.word || baseTopic.title, 'meaning')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border bg-sky-950/60 text-sky-300 hover:text-white hover:bg-sky-900 border-sky-500/40 shadow-sm"
              title="Tra cứu từ điển tiếng Nhật trực tiếp trên Google Search"
            >
              <Search className="w-3.5 h-3.5 text-sky-400" />
              <span>🔍 Google Search</span>
            </a>
          </div>

          {/* DEDICATED SITUATIONAL SENTENCES LOCATION & FILTER BAR */}
          {activeTopicId === 'topic-massive-situational-sentences' && (
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900/95 via-blue-950/30 to-indigo-950/40 border border-blue-500/40 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300">
                    <MessagesSquare className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-black text-sm text-white flex items-center gap-2">
                      <span>10 ĐỊA ĐIỂM & TÌNH HUỐNG THỰC TẾ TẠI NHẬT BẢN</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                        5.000+ Mẫu Câu Đàm Thoại
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Chọn địa điểm sinh hoạt bên dưới để lọc tức thì các mẫu câu giao tiếp sinh tồn và thực chiến
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Speaker Role Filter */}
                  <select
                    value={situationalRoleFilter}
                    onChange={e => {
                      setSituationalRoleFilter(e.target.value);
                      setGridPage(1);
                    }}
                    className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="all">Mọi vai trò nói</option>
                    <option value="customer">Khách hàng nói</option>
                    <option value="staff">Nhân viên nói</option>
                    <option value="patient">Bệnh nhân nói</option>
                    <option value="employee">Nhân viên công sở</option>
                    <option value="general">Hội thoại chung</option>
                  </select>

                  {/* Formality Filter */}
                  <select
                    value={situationalFormalityFilter}
                    onChange={e => {
                      setSituationalFormalityFilter(e.target.value);
                      setGridPage(1);
                    }}
                    className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="all">Mọi thể văn</option>
                    <option value="keigo">Kính ngữ Keigo (敬語)</option>
                    <option value="polite">Lịch sự Teineigo (丁寧語)</option>
                    <option value="casual">Thân mật Casual</option>
                  </select>
                </div>
              </div>

              {/* Horizontal Scrollable Location Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
                {SITUATIONAL_LOCATIONS.map(loc => {
                  const isLocActive = situationalLocationFilter === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setSituationalLocationFilter(loc.id);
                        setGridPage(1);
                      }}
                      className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                        isLocActive
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400'
                          : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {renderTopicIcon(loc.iconName, 'w-3.5 h-3.5')}
                      <span>{loc.nameVn}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search, Filter & Settings Bar (Hidden in SpeedMatch to prevent clutter) */}
          {viewMode !== 'speedmatch' && (
            <div className="flex flex-col gap-3 pt-5 pb-3">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setGridPage(1);
                    }}
                    placeholder="Tra cứu TOÀN BỘ 50.000+ từ vựng & 5.000+ mẫu câu mọi địa điểm (tra từ nào cũng có)..."
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-28 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition shadow-inner"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {searchQuery.trim() && (
                      <a
                        href={buildGoogleSearchUrl(searchQuery.trim(), 'meaning')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-sky-400 hover:text-white px-2 py-0.5 rounded bg-sky-950/80 border border-sky-500/40 hover:bg-sky-900 transition flex items-center gap-1"
                        title="Mở Google Search tra từ khóa này"
                      >
                        <Search className="w-3 h-3 text-sky-400" />
                        <span>Google</span>
                      </a>
                    )}
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setGridPage(1);
                        }}
                        className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 transition cursor-pointer"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                </div>

                {/* Level Selector, SRS Filter & Audio Speed */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                    {['all', 'N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => {
                          setLevelFilter(lvl);
                          setGridPage(1);
                        }}
                        className={`px-2 py-1 rounded-lg font-medium transition cursor-pointer ${
                          levelFilter === lvl
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {lvl === 'all' ? 'Tất cả' : lvl}
                      </button>
                    ))}
                  </div>

                  <select
                    value={srsFilter}
                    onChange={e => {
                      setSrsFilter(e.target.value);
                      setGridPage(1);
                    }}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="all">Mọi trạng thái SRS</option>
                    <option value="hard">Cần luyện ({topicStats.hardCount})</option>
                    <option value="learning">Đang học ({topicStats.learningCount})</option>
                    <option value="mastered">Đã thuộc ({topicStats.masteredCount})</option>
                  </select>

                  <button
                    onClick={() => {
                      setOnlyBookmarks(!onlyBookmarks);
                      setGridPage(1);
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      onlyBookmarks
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <Bookmark className="w-3 h-3" />
                    <span>Đã lưu ({topicStats.bookmarkedCount})</span>
                  </button>

                  <select
                    value={speechRate}
                    onChange={e => setSpeechRate(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-2 py-1.5 focus:outline-none"
                    title="Tốc độ phát âm"
                  >
                    <option value={0.75}>0.75x (Chậm)</option>
                    <option value={0.9}>0.9x (Chuẩn)</option>
                    <option value={1.1}>1.1x (Nhanh)</option>
                  </select>
                </div>
              </div>

              {/* HUY HIỆU ĐẠI KHO 50.000+ TỪ VỰNG & 5.000+ MẪU CÂU TOÀN NĂNG KHI TÌM KIẾM */}
              {isGlobalSearching && (
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/70 border border-amber-500/40 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/50">
                      <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                      ⚡ Đại Kho 50.000+ Từ Vựng & 5.000+ Mẫu Câu Đàm Thoại (N5–N1)
                    </span>
                    <span className="text-xs text-slate-300">
                      Khớp tức thì: <strong className="text-amber-300 text-sm">{displayWords.length}</strong> kết quả (0ms)
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Công nghệ Universal Fallback: 100% Zero Missing Words & Sentences</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Result Count Indicator */}
          {viewMode !== 'speedmatch' && !isGlobalSearching && (
            <div className="text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 mb-4 mt-1">
              <span className="flex items-center gap-1.5 flex-wrap">
                <span>Hiển thị</span>
                <strong className="text-white font-bold">{displayWords.length}</strong>
                <span>/ {fullTopicWords.length} từ trong chủ đề hiện tại</span>
              </span>
              {srsFilter !== 'all' && (
                <span className="text-amber-400 font-medium">Lọc SRS: {srsFilter}</span>
              )}
            </div>
          )}

          {/* ========================================================
              MODE 1: INTERACTIVE FLASHCARD GRID
             ======================================================== */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedWords.map(word => {
                const isBookmarked = bookmarkedIds.has(word.id);
                const currentSrs = srsStatusMap[word.id];

                return (
                  <div
                    key={word.id}
                    className="group bg-slate-950/80 hover:bg-slate-900 border border-slate-800/90 hover:border-indigo-500/50 rounded-2xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between shadow-lg relative"
                  >
                    <div>
                      {/* Quiet metadata row: Level · SRS status · Audio · Bookmark */}
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-200">{word.level}</span>
                          {word.originTopicTitle && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-[10px] text-amber-300 bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.2 rounded font-medium">
                                {word.originTopicTitle}
                              </span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          {currentSrs === 'mastered' ? (
                            <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                              <CheckCircle2 className="w-3 h-3" />
                              Đã thuộc
                            </span>
                          ) : currentSrs === 'hard' ? (
                            <span className="text-rose-400 font-semibold text-[11px]">Cần luyện</span>
                          ) : (
                            <span className="text-slate-500 text-[11px]">Chưa đánh giá</span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => speakJapanese(word.word)}
                            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
                            title="Nghe phát âm chuẩn"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleBookmark(word.id)}
                            className={`p-1.5 rounded-lg transition ${
                              isBookmarked
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200'
                            }`}
                            title={isBookmarked ? 'Bỏ lưu' : 'Lưu từ'}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-3.5 h-3.5" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Situational Context Badges */}
                      {(word as any).locationName && (
                        <div className="flex items-center gap-1.5 flex-wrap mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-950/80 text-cyan-300 border border-blue-500/30 flex items-center gap-1">
                            <span>📍</span>
                            <span>{(word as any).locationName}</span>
                          </span>
                          {(word as any).speakerRole && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                              {(word as any).speakerRole === 'customer'
                                ? 'Khách hàng'
                                : (word as any).speakerRole === 'staff'
                                  ? 'Nhân viên'
                                  : (word as any).speakerRole === 'patient'
                                    ? 'Bệnh nhân'
                                    : 'Hội thoại'}
                            </span>
                          )}
                          {(word as any).formalityLevel && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400">
                              {(word as any).formalityLevel === 'keigo'
                                ? 'Kính ngữ (敬語)'
                                : (word as any).formalityLevel === 'polite'
                                  ? 'Lịch sự (丁寧)'
                                  : 'Thân mật'}
                            </span>
                          )}
                        </div>
                      )}

                      {(word as any).situation && (
                        <div className="text-[11px] font-medium text-cyan-400/90 mb-1.5 bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-800">
                          <span className="text-cyan-300 font-bold">Ngữ cảnh: </span>
                          <span className="text-slate-200">{(word as any).situation}</span>
                        </div>
                      )}

                      {/* Main Word Typography */}
                      {(() => {
                        const verified = verifiedWordsMap[word.id] || getCachedVerifiedVocab(word.word);
                        const cardReading = verified?.kana || word.reading;
                        const cardRomaji = verified?.romaji || word.romaji;
                        const cardMeaning = verified?.meaningVn || word.meaningVn;
                        const cardSino = verified?.sinoVietnamese || word.sinoVietnamese;
                        return (
                          <>
                            <div className="mb-2">
                              <div className="flex items-center justify-between gap-2">
                                <div className="text-xl sm:text-2xl font-black text-white tracking-wide leading-snug">
                                  {word.word}
                                </div>
                              </div>
                              <div className="text-xs text-cyan-400 font-semibold mt-1 flex items-center gap-1.5 flex-wrap">
                                <span>{cardReading}</span>
                                {cardRomaji && (
                                  <span className="text-amber-300 font-mono text-[10.5px] bg-slate-900/90 px-1.5 py-0.2 rounded border border-slate-800">
                                    {cardRomaji}
                                  </span>
                                )}
                              </div>
                              {cardSino && (
                                <div className="text-[11px] text-emerald-400/90 font-medium mt-1">
                                  Âm Hán Việt: {cardSino}
                                </div>
                              )}
                            </div>

                            {/* Vietnamese Meaning */}
                            <div className="text-xs sm:text-sm text-slate-100 font-semibold mt-2 pb-2.5 border-b border-slate-800/60 leading-relaxed">
                              {refineVietnameseMeaning(cardMeaning)}
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Example sentence, Dialog reply & Cultural Tips */}
                    <div>
                      {/* Japanese Cultural Communication Tips */}
                      {(word as any).usageTips && (
                        <div className="mt-2 text-[10.5px] text-amber-300/90 bg-amber-950/30 border border-amber-900/40 rounded-lg p-2 flex items-start gap-1.5 leading-relaxed">
                          <Sparkles className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                          <span>{(word as any).usageTips}</span>
                        </div>
                      )}

                      {word.exampleJp && (
                        <div className="mt-3 text-[11px] bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                          <div className="flex items-start justify-between gap-1">
                            <div>
                              <p className="text-slate-200 font-medium leading-relaxed">
                                {word.exampleJp}
                              </p>
                              {word.exampleReading && (
                                <p className="text-[10px] text-indigo-400/80 mt-0.5 font-sans leading-tight">
                                  {word.exampleReading}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => speakJapanese(word.exampleJp!)}
                              className="flex-shrink-0 text-slate-400 hover:text-indigo-400 p-1 transition"
                              title="Nghe đọc ví dụ"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {word.exampleVn && (
                            <p className="text-slate-400 mt-1 italic leading-relaxed border-t border-slate-800/40 pt-1">
                              &rarr; {word.exampleVn}
                            </p>
                          )}
                        </div>
                      )}

                      {/* SRS Actions & Instant AI Deep Dive Trigger */}
                      <div className="mt-3 pt-2 border-t border-slate-800/40 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setWordSrsStatus(word.id, 'hard')}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                              currentSrs === 'hard'
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            Cần luyện
                          </button>
                          <button
                            onClick={() => setWordSrsStatus(word.id, 'mastered')}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                              currentSrs === 'mastered'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            Đã thuộc
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <a
                            href={buildGoogleSearchUrl(word.word, 'meaning')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10.5px] font-bold text-sky-400 hover:text-white flex items-center gap-1 transition px-2 py-0.5 rounded-lg bg-sky-950/50 hover:bg-sky-900/70 border border-sky-500/30"
                            title="Mở Google Search tra nghĩa từ vựng này"
                            onClick={e => e.stopPropagation()}
                          >
                            <Search className="w-3 h-3 text-sky-400" />
                            <span>Google Search</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Toolbar for Grid Mode */}
          {viewMode === 'grid' && displayWords.length > 60 && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs shadow-lg">
              <div className="text-slate-400">
                Đang xem từ <strong className="text-white font-bold">{(gridPage - 1) * 60 + 1}</strong> – <strong className="text-white font-bold">{Math.min(gridPage * 60, displayWords.length)}</strong> trên tổng số <strong className="text-emerald-400 font-bold">{displayWords.length}</strong> từ
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGridPage(p => Math.max(1, p - 1))}
                  disabled={gridPage === 1}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium flex items-center gap-1 transition cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Trang trước</span>
                </button>
                <span className="px-3 py-1 font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg">
                  Trang {gridPage} / {totalPages}
                </span>
                <button
                  onClick={() => setGridPage(p => Math.min(totalPages, p + 1))}
                  disabled={gridPage >= totalPages}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium flex items-center gap-1 transition cursor-pointer"
                >
                  <span>Trang sau</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              MODE 2: POCKET DICTIONARY TABLE
             ======================================================== */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">STT</th>
                    <th className="py-3 px-4">Từ vựng (Kanji)</th>
                    <th className="py-3 px-4">Cách đọc (Furigana / Romaji)</th>
                    <th className="py-3 px-4">Hán Việt</th>
                    <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                    <th className="py-3 px-4 w-20 text-center">Cấp độ</th>
                    <th className="py-3 px-4 hidden md:table-cell">Câu ví dụ ngữ cảnh</th>
                    <th className="py-3 px-4 w-28 text-center">AI / Nghe / SRS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                  {paginatedWords.map((word, idx) => (
                    <tr key={word.id} className="hover:bg-slate-800/50 transition group">
                      <td className="py-3 px-4 text-center text-slate-500 font-mono text-xs">
                        {(gridPage - 1) * 60 + idx + 1}
                      </td>
                      <td className="py-3 px-4 font-bold text-white text-base">
                        <div className="leading-snug">{word.word}</div>
                        {(word as any).locationName && (
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <span className="text-[10px] text-cyan-300 font-normal bg-blue-950/80 border border-blue-500/30 px-1.5 py-0.5 rounded">
                              📍 {(word as any).locationName}
                            </span>
                            {(word as any).situation && (
                              <span className="text-[10px] text-slate-400 font-normal italic">
                                {(word as any).situation}
                              </span>
                            )}
                          </div>
                        )}
                        {word.originTopicTitle && !(word as any).locationName && (
                          <span className="text-[10px] text-amber-300 font-normal bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.2 rounded inline-block mt-0.5">
                            {word.originTopicTitle}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {(() => {
                          const v = verifiedWordsMap[word.id] || getCachedVerifiedVocab(word.word);
                          return (
                            <>
                              <div className="text-cyan-400 font-semibold">{v?.kana || word.reading}</div>
                              <div className="text-[10px] text-amber-300 font-mono">{v?.romaji || word.romaji}</div>
                            </>
                          );
                        })()}
                      </td>
                      <td className="py-3 px-4 text-emerald-300 font-medium text-xs">
                        {(verifiedWordsMap[word.id]?.sinoVietnamese || getCachedVerifiedVocab(word.word)?.sinoVietnamese || word.sinoVietnamese) || '—'}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-100">
                        {refineVietnameseMeaning(verifiedWordsMap[word.id]?.meaningVn || getCachedVerifiedVocab(word.word)?.meaningVn || word.meaningVn)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-[10px] font-bold text-slate-300">
                          {word.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell text-xs">
                        {word.exampleJp ? (
                          <>
                            <div className="text-slate-300">{word.exampleJp}</div>
                            {word.exampleVn && (
                              <div className="text-slate-500 italic mt-0.5">&rarr; {word.exampleVn}</div>
                            )}
                          </>
                        ) : (
                          <div className="text-slate-500 text-xs italic">
                            — Từ vựng độc bản (Đại Kho {word.level}) —
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <a
                            href={buildGoogleSearchUrl(word.word, 'meaning')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-sky-950/80 hover:bg-sky-600 text-sky-400 hover:text-white transition border border-sky-500/30"
                            title="Mở Google Search tra cứu từ này"
                          >
                            <Search className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => speakJapanese(word.word)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
                            title="Phát âm"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              setWordSrsStatus(
                                word.id,
                                srsStatusMap[word.id] === 'mastered' ? 'hard' : 'mastered'
                              )
                            }
                            className={`p-1.5 rounded-lg transition ${
                              srsStatusMap[word.id] === 'mastered'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                            title="Đánh dấu thuộc"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Toolbar for Table Mode */}
          {viewMode === 'table' && displayWords.length > 60 && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs shadow-lg">
              <div className="text-slate-400">
                Đang xem từ <strong className="text-white font-bold">{(gridPage - 1) * 60 + 1}</strong> – <strong className="text-white font-bold">{Math.min(gridPage * 60, displayWords.length)}</strong> trên tổng số <strong className="text-emerald-400 font-bold">{displayWords.length}</strong> từ
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGridPage(p => Math.max(1, p - 1))}
                  disabled={gridPage === 1}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium flex items-center gap-1 transition cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Trang trước</span>
                </button>
                <span className="px-3 py-1 font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg">
                  Trang {gridPage} / {totalPages}
                </span>
                <button
                  onClick={() => setGridPage(p => Math.min(totalPages, p + 1))}
                  disabled={gridPage >= totalPages}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium flex items-center gap-1 transition cursor-pointer"
                >
                  <span>Trang sau</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              MODE 3: 3D FLASHCARD PLAYER
             ======================================================== */}
          {viewMode === 'flashcard' && displayWords.length > 0 && (
            <div className="max-w-2xl mx-auto py-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <span>
                  Thẻ <strong>{cardIndex + 1}</strong> / {displayWords.length}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFlashcardFuriganaHidden(!flashcardFuriganaHidden)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition ${
                      flashcardFuriganaHidden
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                    title="Ẩn cách đọc để tự nhớ"
                  >
                    {flashcardFuriganaHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{flashcardFuriganaHidden ? 'Ẩn Furigana' : 'Hiện Furigana'}</span>
                  </button>

                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition ${
                      isAutoPlaying
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isAutoPlaying ? 'Tạm dừng' : 'Tự chạy'}</span>
                  </button>
                </div>
              </div>

              {displayWords[cardIndex] && (
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="cursor-pointer min-h-[380px] sm:min-h-[420px] relative select-none [perspective:1200px] group"
                >
                  <div
                    className={`relative w-full min-h-[380px] sm:min-h-[420px] transition-transform duration-500 ease-in-out [transform-style:preserve-3d] ${
                      isFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    {/* MẶT TRƯỚC (Front) */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-slate-900 border-2 border-indigo-500/40 group-hover:border-indigo-500 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-2xl transition-all duration-300">
                      <div className="w-full flex items-center justify-between text-xs text-slate-400">
                        <span className="font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg">
                          {displayWords[cardIndex].level}
                        </span>
                        <span className="text-[11px] text-indigo-400 font-semibold bg-indigo-950/70 px-3 py-1 rounded-full border border-indigo-800/40">
                          Mặt trước (Bấm chuột hoặc gõ Space để lật)
                        </span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            speakJapanese(displayWords[cardIndex].word);
                          }}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 transition"
                          title="Phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="my-auto py-6">
                        {(displayWords[cardIndex] as any).locationName && (
                          <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-950/90 text-cyan-300 border border-blue-500/40">
                              📍 {(displayWords[cardIndex] as any).locationName}
                            </span>
                            {(displayWords[cardIndex] as any).situation && (
                              <span className="text-xs text-slate-300 font-medium">
                                {(displayWords[cardIndex] as any).situation}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="text-3xl sm:text-5xl font-black text-white tracking-wide mb-3 leading-snug">
                          {displayWords[cardIndex].word}
                        </div>

                        {!flashcardFuriganaHidden ? (
                          <>
                            <div className="text-lg sm:text-xl text-indigo-400 font-semibold">
                              {displayWords[cardIndex].reading}
                            </div>
                            <div className="text-xs text-slate-400 mt-1 font-mono">
                              {displayWords[cardIndex].romaji}
                            </div>
                          </>
                        ) : (
                          <div className="text-xs text-slate-500 italic mt-2">
                            (Đang ẩn Furigana - Hãy tự nhớ cách đọc trước khi lật)
                          </div>
                        )}

                        {displayWords[cardIndex].sinoVietnamese && (
                          <div className="mt-3 text-xs font-semibold text-amber-300 bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-800/30 inline-block">
                            Âm Hán Việt: {displayWords[cardIndex].sinoVietnamese}
                          </div>
                        )}
                      </div>

                      <div className="w-full flex items-center justify-between text-xs pt-4 border-t border-slate-800/60">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setWordSrsStatus(displayWords[cardIndex].id, 'hard');
                            showToast(`Đã lưu "${displayWords[cardIndex].word}" vào: Cần luyện`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-rose-300 border border-slate-700 transition font-medium"
                        >
                          Phím 1: Cần luyện
                        </button>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={buildGoogleSearchUrl(displayWords[cardIndex].word, 'meaning')}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="px-2.5 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 border border-blue-500/40 transition font-medium flex items-center gap-1 text-[11px]"
                            title="Tra cứu từ vựng trên Google Search"
                          >
                            <Search className="w-3 h-3 text-blue-400" />
                            <span>Google Search</span>
                          </a>
                        </div>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setWordSrsStatus(displayWords[cardIndex].id, 'mastered');
                            showToast(`Đã lưu "${displayWords[cardIndex].word}" vào: Đã thuộc`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-900/50 text-emerald-300 border border-slate-700 transition font-medium"
                        >
                          Phím 2: Đã thuộc
                        </button>
                      </div>
                    </div>

                    {/* MẶT SAU (Back - rotated 180deg) */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900 border-2 border-emerald-500/50 group-hover:border-emerald-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-2xl transition-all duration-300">
                      <div className="w-full flex items-center justify-between text-xs text-slate-400">
                        <span className="font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg">
                          {displayWords[cardIndex].level}
                        </span>
                        <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-800/40">
                          Mặt sau (Nghĩa & Câu ví dụ)
                        </span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            speakJapanese(displayWords[cardIndex].word);
                          }}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 transition"
                          title="Phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="my-auto py-4 max-w-lg w-full">
                        <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-2">
                          {refineVietnameseMeaning(displayWords[cardIndex].meaningVn)}
                        </div>
                        <div className="text-sm text-indigo-300 font-medium mb-3 flex items-center justify-center gap-2 flex-wrap">
                          <span>{displayWords[cardIndex].word} · {displayWords[cardIndex].reading}</span>
                          {displayWords[cardIndex].romaji && (
                            <span className="text-slate-300 font-mono text-xs bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                              {displayWords[cardIndex].romaji}
                            </span>
                          )}
                        </div>

                        {(displayWords[cardIndex] as any).usageTips && (
                          <div className="text-xs text-amber-300 bg-amber-950/40 border border-amber-900/40 rounded-xl p-2.5 text-left mb-2.5 flex items-start gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{(displayWords[cardIndex] as any).usageTips}</span>
                          </div>
                        )}

                        {displayWords[cardIndex].exampleJp && (
                          <div className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 text-left">
                            <div className="text-xs sm:text-sm text-slate-200 font-medium">
                              {displayWords[cardIndex].exampleJp}
                            </div>
                            {displayWords[cardIndex].exampleVn && (
                              <div className="text-xs text-slate-400 italic mt-1">
                                &rarr; {displayWords[cardIndex].exampleVn}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="w-full flex items-center justify-between text-xs pt-4 border-t border-slate-800/60">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setWordSrsStatus(displayWords[cardIndex].id, 'hard');
                            showToast(`Đã lưu "${displayWords[cardIndex].word}" vào: Cần luyện`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-rose-300 border border-slate-700 transition font-medium"
                        >
                          Phím 1: Cần luyện
                        </button>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={buildGoogleSearchUrl(displayWords[cardIndex].word, 'meaning')}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="px-2.5 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 border border-blue-500/40 transition font-medium flex items-center gap-1 text-[11px]"
                            title="Tra cứu từ vựng trên Google Search"
                          >
                            <Search className="w-3 h-3 text-blue-400" />
                            <span>Google Search</span>
                          </a>
                        </div>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setWordSrsStatus(displayWords[cardIndex].id, 'mastered');
                            showToast(`Đã lưu "${displayWords[cardIndex].word}" vào: Đã thuộc`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-900/50 text-emerald-300 border border-slate-700 transition font-medium"
                        >
                          Phím 2: Đã thuộc
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex(prev => (prev > 0 ? prev - 1 : displayWords.length - 1));
                  }}
                  className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700 shadow-md"
                  title="Thẻ trước (Phím ←)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs sm:text-sm text-white transition shadow-md"
                >
                  Lật thẻ (Space)
                </button>

                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex(prev => (prev < displayWords.length - 1 ? prev + 1 : 0));
                  }}
                  className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700 shadow-md"
                  title="Thẻ tiếp (Phím →)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex(Math.floor(Math.random() * displayWords.length));
                  }}
                  className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
                  title="Xáo trộn ngẫu nhiên"
                >
                  <Shuffle className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              MODE 4: MULTI-TYPE REFLEX ARENA
             ======================================================== */}
          {viewMode === 'quiz' && (
            <div className="max-w-xl mx-auto py-6">
              <div className="flex items-center justify-center gap-2 mb-6 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                <button
                  onClick={() => {
                    setQuizType('jp-to-vn');
                    handleRestartQuiz();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    quizType === 'jp-to-vn' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Nhật &rarr; Việt
                </button>
                <button
                  onClick={() => {
                    setQuizType('vn-to-jp');
                    handleRestartQuiz();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    quizType === 'vn-to-jp' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Việt &rarr; Nhật
                </button>
                <button
                  onClick={() => {
                    setQuizType('audio-to-word');
                    handleRestartQuiz();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
                    quizType === 'audio-to-word' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe Âm &rarr; Chọn Từ</span>
                </button>
              </div>

              {!quizFinished ? (
                quizQuestions.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
                      <span>
                        Câu hỏi <strong>{quizIndex + 1}</strong> / {quizQuestions.length}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        Điểm: {quizScore} / {quizQuestions.length}
                      </span>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-6 text-center">
                      <div className="text-xs text-slate-400 mb-2 font-semibold">
                        {quizQuestions[quizIndex].target.level} · {baseTopic.title}
                      </div>

                      {quizType === 'jp-to-vn' && (
                        <>
                          <div className="text-3xl sm:text-4xl font-black text-white my-3">
                            {quizQuestions[quizIndex].target.word}
                          </div>
                          <div className="text-sm text-indigo-400 font-medium">
                            {quizQuestions[quizIndex].target.reading}
                          </div>
                          <p className="text-xs text-slate-400 mt-2">
                            Chọn nghĩa tiếng Việt chính xác nhất cho từ trên:
                          </p>
                        </>
                      )}

                      {quizType === 'vn-to-jp' && (
                        <>
                          <div className="text-xl sm:text-2xl font-bold text-emerald-400 my-3">
                            {refineVietnameseMeaning(quizQuestions[quizIndex].target.meaningVn)}
                          </div>
                          <p className="text-xs text-slate-400 mt-2">
                            Chọn từ Kanji & Furigana tiếng Nhật tương ứng:
                          </p>
                        </>
                      )}

                      {quizType === 'audio-to-word' && (
                        <>
                          <div className="my-4">
                            <button
                              onClick={() => speakJapanese(quizQuestions[quizIndex].target.word)}
                              className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30 transition animate-pulse"
                              title="Nghe lại phát âm"
                            >
                              <Volume2 className="w-8 h-8" />
                            </button>
                          </div>
                          <p className="text-xs text-slate-400">
                            Bấm để nghe phát âm và chọn từ vựng tương ứng bên dưới:
                          </p>
                        </>
                      )}
                    </div>

                    <div className="space-y-3">
                      {quizQuestions[quizIndex].options.map((opt, idx) => {
                        const isCorrect = idx === quizQuestions[quizIndex].correctIdx;
                        const isSelected = selectedQuizOption === idx;

                        let btnStyle = 'bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-200';
                        if (quizAnswerChecked) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-bold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-300 font-bold';
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            disabled={quizAnswerChecked}
                            onClick={() => handleSelectQuizOption(idx)}
                            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span className="text-xs sm:text-sm font-medium">
                              {String.fromCharCode(65 + idx)}.{' '}
                              {quizType === 'jp-to-vn'
                                ? refineVietnameseMeaning(opt.meaningVn)
                                : `${opt.word} (${opt.reading}) - ${refineVietnameseMeaning(opt.meaningVn)}`}
                            </span>
                            {quizAnswerChecked && isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizAnswerChecked && (
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={handleNextQuizQuestion}
                          className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition flex items-center gap-2"
                        >
                          <span>{quizIndex < quizQuestions.length - 1 ? 'Câu kế tiếp' : 'Xem kết quả'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-400">
                    Chủ đề này chưa đủ câu hỏi trắc nghiệm.
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Hoàn Thành Thử Thách!</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Chủ đề: {baseTopic.title}
                  </p>

                  <div className="text-4xl font-black text-indigo-400 my-4">
                    {quizScore} / {quizQuestions.length} Điểm
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
                    {quizScore >= 8
                      ? 'Tuyệt vời! Bạn đã phản xạ rất nhạy bén với từ vựng của chủ đề này.'
                      : quizScore >= 5
                      ? 'Khá tốt! Hãy ôn lại các từ chưa nhớ bằng chế độ Thẻ Trực Quan nhé.'
                      : 'Hãy kiên trì! Bạn có thể luyện lại hoặc chơi Ghép Thẻ để ghi nhớ sâu hơn.'}
                  </p>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={handleRestartQuiz}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Làm lại đề này
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
                    >
                      Quay lại danh sách từ
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              MODE 5: TYPING & KANA SPELLING CHALLENGE
             ======================================================== */}
          {viewMode === 'spelling' && displayWords.length > 0 && (
            <div className="max-w-xl mx-auto py-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
                <span>
                  Từ thứ <strong>{spellingIndex + 1}</strong> / {displayWords.length}
                </span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  Streak liên tiếp: {spellingStreak}
                </span>
              </div>

              {displayWords[spellingIndex] && (
                <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 text-center shadow-xl">
                  <div className="text-xs text-slate-400 mb-2 font-semibold">
                    {displayWords[spellingIndex].level} · {baseTopic.title}
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-white my-3">
                    {displayWords[spellingIndex].word}
                  </div>

                  <div className="text-base text-emerald-400 font-semibold mb-6">
                    {refineVietnameseMeaning(displayWords[spellingIndex].meaningVn)}
                  </div>

                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleCheckSpelling();
                    }}
                    className="max-w-md mx-auto"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        autoFocus
                        value={spellingInput}
                        onChange={e => {
                          setSpellingInput(e.target.value);
                          if (spellingResult !== 'idle') setSpellingResult('idle');
                        }}
                        placeholder="Gõ cách đọc Hiragana hoặc Romaji..."
                        className={`w-full text-center text-lg sm:text-xl font-bold py-3.5 px-4 rounded-2xl bg-slate-900 border-2 transition focus:outline-none ${
                          spellingResult === 'correct'
                            ? 'border-emerald-500 text-emerald-300'
                            : spellingResult === 'wrong'
                            ? 'border-rose-500 text-rose-300'
                            : 'border-slate-800 focus:border-indigo-500 text-white'
                        }`}
                      />
                    </div>

                    {spellingResult === 'correct' && (
                      <div className="mt-3 text-sm text-emerald-400 font-bold flex items-center justify-center gap-1.5 animate-bounce">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Chính xác! Chuẩn cách đọc: {displayWords[spellingIndex].reading}</span>
                      </div>
                    )}

                    {spellingResult === 'wrong' && (
                      <div className="mt-3 text-sm text-rose-400 font-bold flex items-center justify-center gap-1.5">
                        <X className="w-4 h-4" />
                        <span>Chưa đúng! Đáp án chuẩn: {displayWords[spellingIndex].reading} ({displayWords[spellingIndex].romaji})</span>
                      </div>
                    )}

                    {spellingShowHint && (
                      <div className="mt-3 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-amber-300">
                        Gợi ý âm Hán Việt: {displayWords[spellingIndex].sinoVietnamese || 'Không có'} · Chữ cái đầu: {displayWords[spellingIndex].romaji.slice(0, 2)}...
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSpellingShowHint(!spellingShowHint)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white transition"
                      >
                        {spellingShowHint ? 'Ẩn gợi ý' : 'Hiện gợi ý'}
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-md"
                      >
                        Kiểm tra (Enter)
                      </button>

                      <button
                        type="button"
                        onClick={handleNextSpellingWord}
                        className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                      >
                        Từ tiếp theo
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              MODE 6: SPEED MATCH MEMORY GAME
             ======================================================== */}
          {viewMode === 'speedmatch' && (
            <div className="max-w-3xl mx-auto py-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-6 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white">Ghép Nhanh 6 Cặp Từ Vựng</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-slate-300 font-mono text-sm">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>Thời gian: {speedTimer}s</span>
                  </div>
                  {speedBestTime && (
                    <div className="text-amber-400 font-semibold text-xs flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Kỷ lục: {speedBestTime}s</span>
                    </div>
                  )}
                </div>
              </div>

              {!speedGameFinished ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {speedCards.map(card => {
                    const isSelected = selectedSpeedCard?.id === card.id;

                    if (card.isMatched) {
                      return (
                        <div
                          key={card.id}
                          className="p-4 rounded-2xl bg-slate-950/40 border border-emerald-500/20 text-center opacity-40 select-none"
                        >
                          <div className="text-xs text-emerald-400 font-medium line-through">
                            {card.text}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={card.id}
                        onClick={() => handleSelectSpeedCard(card)}
                        className={`p-4 rounded-2xl border text-center transition-all select-none min-h-[90px] flex flex-col items-center justify-center shadow-md ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-400 text-white scale-105 ring-2 ring-indigo-400/50'
                            : 'bg-slate-900 hover:bg-slate-800/90 border-slate-800 text-slate-200'
                        }`}
                      >
                        <div className="text-sm sm:text-base font-bold leading-tight">
                          {card.text}
                        </div>
                        {card.subtext && (
                          <div className="text-[11px] text-indigo-300 mt-1">
                            {card.subtext}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-950 p-8 rounded-3xl border border-slate-800">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Xuất Sắc! Hoàn Thành Ván Ghép!</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Bạn đã ghép chính xác 6 cặp từ trong chủ đề: {baseTopic.title}
                  </p>

                  <div className="text-4xl font-black text-emerald-400 my-4">
                    {speedTimer} Giây
                  </div>

                  <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                      onClick={startSpeedMatchGame}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Chơi ván mới (Cặp từ khác)
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
                    >
                      Về danh sách từ
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              MODAL: GOOGLE AI THẨM ĐỊNH CHUẨN ĐIỂN 100%
          {/* Empty State */}

          {/* Empty State */}
          {displayWords.length === 0 && (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-300">Không tìm thấy từ vựng phù hợp</h3>
              <p className="text-xs text-slate-500 mt-1">
                Thử thay đổi từ khóa tìm kiếm hoặc đặt lại các bộ lọc cấp độ / trạng thái SRS.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLevelFilter('all');
                  setSrsFilter('all');
                  setOnlyBookmarks(false);
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition"
              >
                Đặt lại toàn bộ bộ lọc
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
