import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { JLPTLevel } from '../../types';
import {
  EncyclopediaSectionId,
  EncyclopediaTopicItem,
  EncyclopediaSectionMeta,
} from '../../types/encyclopedia';
import {
  ENCYCLOPEDIA_SECTIONS_META,
  initialEncyclopediaTopics,
  extraEncyclopediaTopics,
} from '../../data/japanEncyclopediaDatabase';
import { getNextInfiniteEncyclopediaBatch } from '../../services/encyclopediaInfiniteEngine';
import { JAPAN_47_PREFECTURES, JapanPrefectureItem } from '../../data/japan47PrefecturesData';
import { JAPAN_14_EPOCHS, HistoryEpochItem } from '../../data/japanHistoryEpochsData';
import { JAPAN_MATSURI_CALENDAR, MatsuriFestivalItem } from '../../data/japanMatsuriCalendarData';
import { speechService } from '../../services/speechService';
import {
  MapPin,
  Shield,
  Flower2,
  Utensils,
  Users,
  Sparkles,
  Compass,
  GraduationCap,
  Volume2,
  Plus,
  Search,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  X,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Share2,
  Lightbulb,
  Heart,
  Layers,
  ArrowRight,
  Flag,
  Sun,
  Train,
  Check,
  Info,
  Calendar,
  Eye,
  Star,
  Copy,
  Maximize2,
  Minimize2,
  RotateCw,
  Shuffle,
  VolumeX,
  Bookmark,
  Gauge,
  Sliders,
  Play,
  RotateCcw,
  Trophy,
  Download,
  Printer,
  ChevronDown,
  Flame,
  Globe2,
  Hourglass,
  PartyPopper,
  Shirt,
  Palette,
} from 'lucide-react';
import { JapaneseFashionGenZLab } from '../cultural/JapaneseFashionGenZLab';
import { JapaneseBeautyMakeupStudio } from '../cultural/JapaneseBeautyMakeupStudio';

interface Props {
  currentLevel?: JLPTLevel;
  initialSectionId?: EncyclopediaSectionId;
  onOpenAiSenseiWithQuery?: (query?: string) => void;
}

type EncyclopediaViewTab =
  | 'articles'
  | 'prefectures47'
  | 'history14'
  | 'matsuri4seasons'
  | 'trivia'
  | 'fashion_shoujo';

// 8 Regional Data for Geography Quick Filter
const JAPAN_8_REGIONS = [
  { id: 'all', name: 'Tất cả 47 Tỉnh', count: 47 },
  { id: 'hokkaido', name: '1. Hokkaido', count: 1 },
  { id: 'tohoku', name: '2. Tohoku', count: 6 },
  { id: 'kanto', name: '3. Kanto', count: 7 },
  { id: 'chubu', name: '4. Chubu', count: 9 },
  { id: 'kansai', name: '5. Kansai', count: 7 },
  { id: 'chugoku', name: '6. Chugoku', count: 5 },
  { id: 'shikoku', name: '7. Shikoku', count: 4 },
  { id: 'kyushu', name: '8. Kyushu - Okinawa', count: 8 },
];

export const JapanEncyclopediaHub: React.FC<Props> = ({
  currentLevel = 'N3',
  initialSectionId = 'geography_admin',
}) => {
  // Main Navigation Mode Tab
  const [activeViewTab, setActiveViewTab] = useState<EncyclopediaViewTab>('articles');
  // Sub-tab for Fashion & Shoujo Studio
  const [fashionSubTab, setFashionSubTab] = useState<'fashion' | 'beauty' | 'climate_ootd'>('fashion');
  // Modal for 4 Super Pillars Navigator
  const [selectedSuperPillarModal, setSelectedSuperPillarModal] = useState<number | null>(null);

  // Persistence: Topics Catalog (with saved additions from +5 Tải thêm)
  const [topics, setTopics] = useState<EncyclopediaTopicItem[]>(() => {
    try {
      const saved = localStorage.getItem('kotoba_encyclopedia_topics_v3');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [...initialEncyclopediaTopics, ...extraEncyclopediaTopics];
  });

  useEffect(() => {
    try {
      localStorage.setItem('kotoba_encyclopedia_topics_v3', JSON.stringify(topics));
    } catch {}
  }, [topics]);

  // Active section filter
  const [selectedSection, setSelectedSection] = useState<EncyclopediaSectionId | 'all'>(
    initialSectionId || 'all'
  );

  // Active topic inside articles
  const [activeTopicId, setActiveTopicId] = useState<string>(
    initialEncyclopediaTopics[0]?.id || 'enc_geo_01'
  );

  // Persistence: Learned and Starred Topics
  const [learnedTopicIds, setLearnedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kotoba_encyclopedia_learned_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [starredTopicIds, setStarredTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kotoba_encyclopedia_starred_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kotoba_encyclopedia_learned_v2', JSON.stringify(learnedTopicIds));
    } catch {}
  }, [learnedTopicIds]);

  useEffect(() => {
    try {
      localStorage.setItem('kotoba_encyclopedia_starred_v2', JSON.stringify(starredTopicIds));
    } catch {}
  }, [starredTopicIds]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'starred' | 'learned'>('all');
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mobile list/detail toggle
  const [mobileTab, setMobileTab] = useState<'list' | 'detail'>('list');

  // Flashcard Modal State
  const [isFlashcardOpen, setIsFlashcardOpen] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Load More Dropdown
  const [isLoadMoreDropdownOpen, setIsLoadMoreDropdownOpen] = useState<boolean>(false);
  const loadMoreDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown/modal on Escape key or click outside
  useEffect(() => {
    if (!isLoadMoreDropdownOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLoadMoreDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoadMoreDropdownOpen]);

  // Interactive 47 Prefectures State
  const [selectedPrefectureRegion, setSelectedPrefectureRegion] = useState<string>('all');
  const [selectedPrefectureId, setSelectedPrefectureId] = useState<string>('tokyo');
  const [prefectureSearchQuery, setPrefectureSearchQuery] = useState<string>('');

  // Interactive 14 History Epochs State
  const [selectedEpochId, setSelectedEpochId] = useState<string>('sengoku');

  // Interactive 4 Seasons Matsuri State
  const [selectedMatsuriSeason, setSelectedMatsuriSeason] = useState<'all' | 'spring' | 'summer' | 'autumn' | 'winter'>('all');

  // Interactive Trivia Quiz Arena State
  const [triviaQuestions, setTriviaQuestions] = useState<any[]>([]);
  const [triviaIndex, setTriviaIndex] = useState<number>(0);
  const [triviaScore, setTriviaScore] = useState<number>(0);
  const [selectedTriviaOption, setSelectedTriviaOption] = useState<number | null>(null);
  const [triviaAnswerChecked, setTriviaAnswerChecked] = useState<boolean>(false);
  const [triviaFinished, setTriviaFinished] = useState<boolean>(false);

  // Interactive In-Article Quiz answers map
  const [articleQuizAnswers, setArticleQuizAnswers] = useState<Record<string, number>>({});

  // Toast notifier
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Speak Japanese via speechService
  const handleSpeak = (text: string) => {
    speechService.speak(text, speechRate);
  };

  // Filtered topics for Articles view
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      if (selectedSection !== 'all' && t.sectionId !== selectedSection) return false;
      if (filterMode === 'starred' && !starredTopicIds.includes(t.id)) return false;
      if (filterMode === 'learned' && !learnedTopicIds.includes(t.id)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          t.title.toLowerCase().includes(q) ||
          t.jpTitle.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.detailedExplanation.toLowerCase().includes(q) ||
          t.vocabularyList.some((v) => v.word.includes(q) || v.meaning.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [topics, selectedSection, filterMode, starredTopicIds, learnedTopicIds, searchQuery]);

  // Active topic item
  const activeTopic = useMemo(() => {
    return (
      filteredTopics.find((t) => t.id === activeTopicId) ||
      filteredTopics[0] ||
      topics[0]
    );
  }, [filteredTopics, activeTopicId, topics]);

  const currentTopicIndex = useMemo(() => {
    return filteredTopics.findIndex((t) => t.id === activeTopic?.id);
  }, [filteredTopics, activeTopic]);

  // Stepper handlers
  const handleNextTopic = () => {
    if (filteredTopics.length <= 1) return;
    const nextIdx = (currentTopicIndex + 1) % filteredTopics.length;
    setActiveTopicId(filteredTopics[nextIdx].id);
    speechService.playSuccessSound();
  };

  const handlePrevTopic = () => {
    if (filteredTopics.length <= 1) return;
    const prevIdx = currentTopicIndex === 0 ? filteredTopics.length - 1 : currentTopicIndex - 1;
    setActiveTopicId(filteredTopics[prevIdx].id);
    speechService.playSuccessSound();
  };

  // Toggle Learned
  const toggleTopicLearned = (id: string) => {
    setLearnedTopicIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Đã bỏ đánh dấu hoàn thành.');
        return prev.filter((item) => item !== id);
      } else {
        speechService.playSuccessSound();
        showToast('🎉 Tuyệt vời! Đã ghi nhận hoàn thành chuyên đề vào tiến độ.');
        return [...prev, id];
      }
    });
  };

  // Toggle Starred
  const toggleTopicStarred = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setStarredTopicIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Đã xóa khỏi mục Yêu thích.');
        return prev.filter((item) => item !== id);
      } else {
        speechService.playSuccessSound();
        showToast('⭐ Đã lưu chuyên đề vào mục Yêu thích.');
        return [...prev, id];
      }
    });
  };

  // Handle +5 Load More Infinite Batch
  const handleLoadMoreFive = (specificSection?: EncyclopediaSectionId) => {
    const currentCount = topics.length;
    const nextBatch = getNextInfiniteEncyclopediaBatch(currentCount, 5, specificSection);

    setTopics((prev) => [...prev, ...nextBatch]);
    setIsLoadMoreDropdownOpen(false);
    speechService.playSuccessSound();
    showToast(
      `Đã tải thêm thành công +5 chuyên đề bách khoa mới! (Hiện có ${currentCount + 5} chuyên đề)`
    );
  };

  // Export Study Notes to Markdown
  const handleExportMarkdown = () => {
    if (!activeTopic) return;
    const md = `# 【BÁCH KHOA TOÀN THƯ NHẬT BẢN】${activeTopic.title}
Tiếng Nhật: ${activeTopic.jpTitle} (${activeTopic.hiragana} - ${activeTopic.romaji})
Cấp độ: JLPT ${activeTopic.level} · Chuyên đề: ${activeTopic.badge}

## 📖 Tóm Tắt Khái Quát
${activeTopic.summary}

## 🎯 Điểm Cốt Lõi Trọng Tâm (Key Takeaways)
${activeTopic.keyTakeaways.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}

## 🏛️ Mục Giải Thích Văn Hóa Chuyên Sâu
${activeTopic.detailedExplanation}

## 🌸 Triết Lý Tâm Hồn & Đúc Kết
${activeTopic.culturalPhilosophy}

## 💼 Lời Khuyên Thực Chiến Cho Người Việt Tại Nhật
${activeTopic.practicalAdvice}

## 📚 Bảng Từ Vựng Trọng Tâm
${activeTopic.vocabularyList.map((v) => `- **${v.word}** (${v.reading}) [${v.level}]: ${v.meaning}`).join('\n')}

## 💡 Bạn Có Biết? (Quick Fact)
${activeTopic.quickFact}
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `kotoba_encyclopedia_${activeTopic.id}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Đã xuất bài đọc "${activeTopic.title.slice(0, 30)}..." ra file Markdown!`);
  };

  // Copy Markdown
  const handleCopyStudyNotes = () => {
    if (!activeTopic) return;
    const md = `【BÁCH KHOA NHẬT BẢN】${activeTopic.title} (${activeTopic.jpTitle})
${activeTopic.summary}

Từ vựng trọng tâm:
${activeTopic.vocabularyList.map((v) => `• ${v.word} (${v.reading}): ${v.meaning}`).join('\n')}`;

    navigator.clipboard.writeText(md);
    showToast('Đã sao chép ghi chú vào clipboard!');
  };

  // Start Trivia Challenge
  const startTriviaChallenge = useCallback(() => {
    const pool = topics.filter((t) => t.quiz).map((t) => ({ ...t.quiz, topicTitle: t.title }));
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 10);
    setTriviaQuestions(shuffled);
    setTriviaIndex(0);
    setTriviaScore(0);
    setSelectedTriviaOption(null);
    setTriviaAnswerChecked(false);
    setTriviaFinished(false);
  }, [topics]);

  const handleSelectTriviaOption = (idx: number) => {
    if (triviaAnswerChecked) return;
    setSelectedTriviaOption(idx);
    setTriviaAnswerChecked(true);

    const q = triviaQuestions[triviaIndex];
    if (q && idx === q.correctIndex) {
      setTriviaScore((prev) => prev + 1);
      speechService.playSuccessSound();
    }
  };

  const handleNextTriviaQuestion = () => {
    if (triviaIndex < triviaQuestions.length - 1) {
      setTriviaIndex((prev) => prev + 1);
      setSelectedTriviaOption(null);
      setTriviaAnswerChecked(false);
    } else {
      setTriviaFinished(true);
    }
  };

  // Filtered 47 Prefectures
  const filteredPrefectures = useMemo(() => {
    return JAPAN_47_PREFECTURES.filter((p) => {
      if (selectedPrefectureRegion !== 'all' && p.regionId !== selectedPrefectureRegion) return false;
      if (prefectureSearchQuery.trim()) {
        const q = prefectureSearchQuery.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.jpName.includes(q) ||
          p.capital.toLowerCase().includes(q) ||
          p.foodSpecialty.toLowerCase().includes(q) ||
          p.landmark.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedPrefectureRegion, prefectureSearchQuery]);

  const activePrefecture = useMemo(() => {
    return (
      filteredPrefectures.find((p) => p.id === selectedPrefectureId) ||
      filteredPrefectures[0] ||
      JAPAN_47_PREFECTURES[0]
    );
  }, [filteredPrefectures, selectedPrefectureId]);

  // Filtered Matsuri Festivals
  const filteredMatsuri = useMemo(() => {
    if (selectedMatsuriSeason === 'all') return JAPAN_MATSURI_CALENDAR;
    return JAPAN_MATSURI_CALENDAR.filter((m) => m.season === selectedMatsuriSeason);
  }, [selectedMatsuriSeason]);

  // Selected History Epoch
  const activeEpoch = useMemo(() => {
    return JAPAN_14_EPOCHS.find((e) => e.id === selectedEpochId) || JAPAN_14_EPOCHS[8];
  }, [selectedEpochId]);

  const currentSectionMeta = useMemo(() => {
    if (selectedSection === 'all') return null;
    return ENCYCLOPEDIA_SECTIONS_META.find((s) => s.id === selectedSection);
  }, [selectedSection]);

  const progressPercent = Math.min(
    100,
    Math.round((learnedTopicIds.length / (topics.length || 1)) * 100)
  );

  return (
    <div className="space-y-6 text-slate-100 max-w-full pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 border border-emerald-500/50 text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-2xl backdrop-blur-md animate-in fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      {!isZenMode && (
        <header className="relative rounded-3xl bg-slate-950 border border-red-500/40 p-5 sm:p-7 shadow-2xl z-20">
          {/* Constrained background blur effects */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              {/* Quiet unboxed metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold text-red-300">
                <span className="text-red-400 flex items-center gap-1.5 font-bold">
                  <Flag className="w-3.5 h-3.5" />
                  PH8 · BÁCH KHOA TOÀN THƯ NHẬT BẢN
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300 font-jp">日本大百科全書</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  +5 Tải Thêm Vô Hạn
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3 flex-wrap">
                <span>Bách Khoa Toàn Thư Nhật Bản</span>
                <span className="text-xs md:text-sm font-jp px-2.5 py-1 bg-red-950/80 border border-red-500/40 rounded-lg text-red-300 font-normal">
                  日本百科全書
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Khám phá trọn vẹn 8 Trụ cột tri thức văn hóa, Bản đồ 47 tỉnh thành Todōfuken, Biên niên sử 14 thời kỳ từ Jomon đến Reiwa, Lịch lễ hội 4 mùa Matsuri và Đấu trường đố vui văn hóa.
              </p>

              {/* Progress and quick counts */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  47 Tỉnh Thành & 8 Vùng
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  14 Thời Kỳ Lịch Sử
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  <PartyPopper className="w-3.5 h-3.5 text-rose-400" />
                  Lễ Hội 4 Mùa Matsuri
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  <Trophy className="w-3.5 h-3.5 text-indigo-400" />
                  Đố Vui Tranh Tài
                </span>
              </div>

              {/* Learner Progress Bar */}
              <div className="pt-2 flex items-center gap-3 max-w-md">
                <div className="flex-1 bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-300 shrink-0">
                  Đã học: <strong className="text-amber-300">{learnedTopicIds.length}</strong>/{topics.length} ({progressPercent}%)
                </span>
              </div>
            </div>

            {/* Smart +5 Tải Thêm Action Card - Kho Tri Thức Bách Khoa Không Giới Hạn */}
            <div className="shrink-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-red-950/40 border-2 border-red-500/60 p-4 sm:p-5 rounded-3xl shadow-2xl shadow-red-950/50 backdrop-blur-xl relative ring-1 ring-red-400/40 w-full lg:w-auto min-w-[280px]">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-[11px] font-black tracking-wider uppercase text-red-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Kho Tri Thức Bách Khoa</span>
              </div>

              <div className="text-center space-y-0.5">
                <div className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
                  <span className="text-red-400 font-mono tracking-tight">{topics.length}</span>
                  <span className="text-slate-600 text-xl font-normal">/</span>
                  <span className="text-emerald-400 flex items-center gap-1.5 text-sm sm:text-base font-black">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Không Giới Hạn
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Bổ sung liên tục chuyên đề chuyên sâu</div>
              </div>

              {/* Big, eye-catching action button */}
              <button
                type="button"
                onClick={() => setIsLoadMoreDropdownOpen(true)}
                className="w-full px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] ring-2 ring-red-400/60"
              >
                <Plus className="w-5 h-5 stroke-[3]" />
                <span>+5 TẢI THÊM (CHỌN CHỦ ĐỀ CẦN NẠP)</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* 4 SIÊU TRỤ CỘT BÁCH KHOA VĂN HÓA & NGÔN NGỮ - ĐẠI TÔNG SƯ */}
      {!isZenMode && (
        <section className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                4 Siêu Trụ Cột Tri Thức Bách Khoa Toàn Thư Nhật Bản
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 font-bold">
                State-of-the-Art
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-jp">
              言語百科 · 縦社会心理 · 伝統信仰 · 現代生存学
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Trụ Cột 1 */}
            <button
              type="button"
              onClick={() => setSelectedSuperPillarModal(1)}
              className="text-left p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-indigo-500/30 hover:border-indigo-400 transition-all group hover:scale-[1.01] active:scale-[0.99] cursor-pointer space-y-1.5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  Siêu Trụ Cột 1
                </span>
                <span className="text-xs text-indigo-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
              <div className="font-bold text-sm text-white group-hover:text-indigo-200 transition">
                📜 Ngôn Ngữ Hào Quang & JLPT
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                Yojijukugo, Koji Seigo, Bẫy trợ từ & cấu trúc so sánh, Kanji N1, Homophones, Ngũ Thể Thư Đạo & Kansei Kotoba.
              </p>
            </button>

            {/* Trụ Cột 2 */}
            <button
              type="button"
              onClick={() => setSelectedSuperPillarModal(2)}
              className="text-left p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-400 transition-all group hover:scale-[1.01] active:scale-[0.99] cursor-pointer space-y-1.5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Siêu Trụ Cột 2
                </span>
                <span className="text-xs text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
              <div className="font-bold text-sm text-white group-hover:text-emerald-200 transition">
                🧠 Tâm Lý Học & Tate-Shakai
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                Tatemae/Honne, Hội chứng Amae (~te morau), Áp lực đồng đẳng, Keigo 5 cấp, Kankonsousai, Zoutou, Omotenashi & Kaigo.
              </p>
            </button>

            {/* Trụ Cột 3 */}
            <button
              type="button"
              onClick={() => setSelectedSuperPillarModal(3)}
              className="text-left p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 transition-all group hover:scale-[1.01] active:scale-[0.99] cursor-pointer space-y-1.5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Siêu Trụ Cột 3
                </span>
                <span className="text-xs text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
              <div className="font-bold text-sm text-white group-hover:text-amber-200 transition">
                ⛩️ Linh Hồn Nhật Bản & Di Sản
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                Shinto & Kotodama, Engimono, Wabi-Sabi, Trà đạo Chado, Kintsugi, Monozukuri, Bushido, Washoku, Noh/Kabuki & Waka.
              </p>
            </button>

            {/* Trụ Cột 4 */}
            <button
              type="button"
              onClick={() => setSelectedSuperPillarModal(4)}
              className="text-left p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-pink-500/30 hover:border-pink-400 transition-all group hover:scale-[1.01] active:scale-[0.99] cursor-pointer space-y-1.5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-pink-500/20 text-pink-300 border border-pink-500/40">
                  Siêu Trụ Cột 4
                </span>
                <span className="text-xs text-pink-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
              <div className="font-bold text-sm text-white group-hover:text-pink-200 transition">
                🌸 Đương Đại, Shoujo & Sinh Tồn
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                Subculture Otaku, Thời trang Gái Nhật & Namida-bukuro 3D, 47 Tỉnh, 14 Thời kỳ, Bản lĩnh Saigai (Jijo-Kyojo-Kojo).
              </p>
            </button>
          </div>
        </section>
      )}

      {/* 6 FLAGSHIP INTERACTIVE VIEW TABS */}
      {!isZenMode && (
        <section className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setActiveViewTab('articles')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold transition border ${
              activeViewTab === 'articles'
                ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Chuyên Đề Bách Khoa ({topics.length})</span>
          </button>

          <button
            onClick={() => setActiveViewTab('prefectures47')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold transition border ${
              activeViewTab === 'prefectures47'
                ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <span>Bản Đồ 47 Tỉnh Thành Todōfuken</span>
          </button>

          <button
            onClick={() => setActiveViewTab('history14')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold transition border ${
              activeViewTab === 'history14'
                ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            <Hourglass className="w-4 h-4 text-amber-400" />
            <span>Biên Niên Sử 14 Thời Kỳ Lịch Sử</span>
          </button>

          <button
            onClick={() => setActiveViewTab('matsuri4seasons')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold transition border ${
              activeViewTab === 'matsuri4seasons'
                ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            <PartyPopper className="w-4 h-4 text-rose-400" />
            <span>Lịch Lễ Hội 4 Mùa Matsuri</span>
          </button>

          <button
            onClick={() => {
              setActiveViewTab('trivia');
              startTriviaChallenge();
            }}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold transition border ${
              activeViewTab === 'trivia'
                ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>Đấu Trường Đố Vui Bách Khoa</span>
          </button>

          <button
            onClick={() => setActiveViewTab('fashion_shoujo')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold transition border ${
              activeViewTab === 'fashion_shoujo'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-400 shadow-md shadow-pink-600/30'
                : 'bg-slate-900/80 text-pink-300 hover:text-white border-pink-900/40'
            }`}
          >
            <Shirt className="w-4 h-4 text-pink-400" />
            <span>👗 Thời Trang Gái Nhật & Shoujo Studio</span>
            <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-pink-500/30 text-pink-200 border border-pink-400/40">
              Hot
            </span>
          </button>
        </section>
      )}

      {/* ====================================================================
          TAB 1: CHUYÊN ĐỀ BÁCH KHOA (ENCYCLOPEDIA ARTICLES)
         ==================================================================== */}
      {activeViewTab === 'articles' && (
        <div className="space-y-6">
          {/* Sub Toolbar: 8 Pillars Filter + Search Bar + Filters */}
          {!isZenMode && (
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
                {/* Search input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm địa lý, lịch sử, ẩm thực, phong tục, từ vựng..."
                    className="w-full pl-9 pr-8 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs md:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Status Filter buttons */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl text-xs">
                  <button
                    onClick={() => setFilterMode('all')}
                    className={`px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      filterMode === 'all'
                        ? 'bg-slate-800 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>Tất cả</span>
                    <span className="text-[10px] text-slate-400">({topics.length})</span>
                  </button>

                  <button
                    onClick={() => setFilterMode('starred')}
                    className={`px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      filterMode === 'starred'
                        ? 'bg-amber-950/80 border border-amber-600/60 text-amber-300 font-bold'
                        : 'text-slate-400 hover:text-amber-300'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Yêu thích ({starredTopicIds.length})</span>
                  </button>

                  <button
                    onClick={() => setFilterMode('learned')}
                    className={`px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      filterMode === 'learned'
                        ? 'bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 font-bold'
                        : 'text-slate-400 hover:text-emerald-300'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Đã học ({learnedTopicIds.length})</span>
                  </button>
                </div>

                {/* Highly Visible +5 Tải Thêm Button in Toolbar */}
                <button
                  type="button"
                  onClick={() => setIsLoadMoreDropdownOpen(true)}
                  className="px-3.5 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 shrink-0 transition-all hover:scale-105 active:scale-95 border border-red-400/40 cursor-pointer"
                  title="Bấm để chọn chủ đề bách khoa cần nạp thêm"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>+5 TẢI THÊM (CHỌN CHỦ ĐỀ)</span>
                </button>
              </div>

              {/* 8 Pillar Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <button
                  onClick={() => setSelectedSection('all')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 font-medium ${
                    selectedSection === 'all'
                      ? 'bg-red-600 border-red-500 text-white shadow-md font-semibold'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Tất Cả (8 Trụ Cột)</span>
                </button>

                {ENCYCLOPEDIA_SECTIONS_META.map((sec) => {
                  const isActive = selectedSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSection(sec.id)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 font-medium ${
                        isActive
                          ? `${sec.colorScheme.activeTab} border-transparent font-semibold shadow-sm`
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span>{sec.title.split(' ')[0]}</span>
                      <span>{sec.shortTitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Main 2-column Grid: Left Sidebar + Right Article Canvas */}
          <div className={`grid gap-6 items-start ${isZenMode ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 lg:grid-cols-12'}`}>
            {/* Left Topic Selector List */}
            {!isZenMode && (
              <aside className="lg:col-span-4 xl:col-span-4 space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
                  <span>Danh Sách ({filteredTopics.length} chuyên đề)</span>
                  {selectedSection !== 'all' && (
                    <span className="text-[10px] text-red-400 font-mono">
                      {currentSectionMeta?.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                  {filteredTopics.map((topic) => {
                    const isSelected = activeTopic.id === topic.id;
                    const isLearned = learnedTopicIds.includes(topic.id);
                    const isStarred = starredTopicIds.includes(topic.id);
                    const sectionMeta = ENCYCLOPEDIA_SECTIONS_META.find((s) => s.id === topic.sectionId);

                    return (
                      <div
                        key={topic.id}
                        onClick={() => setActiveTopicId(topic.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${
                          isSelected
                            ? 'bg-slate-800/95 border-red-500/80 shadow-lg shadow-red-500/10'
                            : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500 rounded-l" />
                        )}

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2 text-[10px] text-slate-400">
                            <div className="flex items-center gap-1.5 font-medium">
                              <span className="text-slate-300 font-semibold">{sectionMeta?.shortTitle || 'Bách Khoa'}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono text-indigo-300">JLPT {topic.level}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {isLearned && (
                                <span className="text-emerald-400 flex items-center gap-0.5 text-[10px] font-semibold">
                                  <CheckCircle2 className="w-2.5 h-2.5" />
                                  Đã học
                                </span>
                              )}

                              <button
                                onClick={(e) => toggleTopicStarred(topic.id, e)}
                                className="p-1 hover:text-amber-400 text-slate-500 transition-colors"
                                title={isStarred ? 'Bỏ yêu thích' : 'Lưu yêu thích'}
                              >
                                <Star
                                  className={`w-3.5 h-3.5 ${
                                    isStarred ? 'text-amber-400 fill-amber-400' : 'hover:text-amber-300'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-red-300 transition-colors line-clamp-2 leading-snug">
                            {topic.title}
                          </h4>

                          <div className="text-[11px] text-slate-400 font-jp line-clamp-1 flex items-center justify-between">
                            <span className="truncate pr-2">{topic.jpTitle}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeak(topic.jpTitle);
                              }}
                              className="p-1 hover:text-red-400 text-slate-400 transition-colors shrink-0"
                              title="Nghe phát âm tiếng Nhật"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </aside>
            )}

            {/* Right Detailed Reading Canvas */}
            <main className={`space-y-6 ${isZenMode ? 'w-full' : 'lg:col-span-8 xl:col-span-8'}`}>
              {activeTopic && (
                <article className="bg-slate-950 border border-slate-800/90 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-2xl space-y-6">
                  {/* Top Bar: Kicker + Actions */}
                  <div className="space-y-3 pb-5 border-b border-slate-800/80">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-slate-200">{activeTopic.badge}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-indigo-300 text-xs">JLPT {activeTopic.level}</span>
                      </div>

                      {/* Actions: Speed, Furigana, Flashcard, Star, Export, Zen */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Audio Speed Rate */}
                        <div className="flex items-center gap-0.5 bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[11px] font-mono">
                          <Gauge className="w-3 h-3 text-slate-400 ml-1.5" />
                          {[0.8, 1.0, 1.2].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => {
                                setSpeechRate(rate);
                                showToast(`Đổi tốc độ đọc ${rate}x`);
                              }}
                              className={`px-1.5 py-0.5 rounded font-bold ${
                                speechRate === rate
                                  ? 'bg-red-600 text-white'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>

                        {/* Furigana Toggle */}
                        <button
                          onClick={() => setShowFurigana(!showFurigana)}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border transition ${
                            showFurigana
                              ? 'bg-indigo-950 border-indigo-500/60 text-indigo-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="font-jp text-[11px]">あ</span>
                          <span className="hidden sm:inline">Furigana: {showFurigana ? 'Bật' : 'Tắt'}</span>
                        </button>

                        {/* Flashcard 3D Button */}
                        <button
                          onClick={() => {
                            setFlashcardIndex(0);
                            setIsCardFlipped(false);
                            setIsFlashcardOpen(true);
                          }}
                          className="px-2.5 py-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md transition"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Thẻ Ghi Nhớ ({activeTopic.vocabularyList.length})</span>
                        </button>

                        {/* Export Markdown */}
                        <button
                          onClick={handleExportMarkdown}
                          className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-slate-300 hover:text-white transition"
                          title="Tải bài học ra file Markdown"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        {/* Copy Summary */}
                        <button
                          onClick={handleCopyStudyNotes}
                          className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-slate-300 hover:text-white transition"
                          title="Sao chép tóm tắt"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Zen Mode Toggle */}
                        <button
                          onClick={() => setIsZenMode(!isZenMode)}
                          className={`p-1.5 rounded-lg border transition ${
                            isZenMode
                              ? 'bg-purple-950 border-purple-500 text-purple-300'
                              : 'bg-slate-900 border-slate-700/80 text-slate-400 hover:text-white'
                          }`}
                          title={isZenMode ? 'Thu nhỏ' : 'Toàn màn hình đọc'}
                        >
                          {isZenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                        </button>

                        {/* Mark Learned */}
                        <button
                          onClick={() => toggleTopicLearned(activeTopic.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition ${
                            learnedTopicIds.includes(activeTopic.id)
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{learnedTopicIds.includes(activeTopic.id) ? 'Đã học' : 'Đánh dấu học'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Stepper Bar: Prev - Index - Next */}
                    <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrevTopic}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Trước</span>
                        </button>
                        <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-amber-300 font-mono font-bold">
                          {currentTopicIndex + 1} / {filteredTopics.length}
                        </div>
                        <button
                          onClick={handleNextTopic}
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1 transition shadow-md"
                        >
                          <span>Tiếp theo</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsLoadMoreDropdownOpen(true)}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-red-900/30 transition hover:scale-105 active:scale-95 cursor-pointer border border-red-400/40"
                        title="Bấm để chọn chủ đề bách khoa cần nạp thêm"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>+5 Tải Thêm (Chọn chủ đề)</span>
                      </button>
                    </div>

                    {/* Title & Japanese Pronunciation Header */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                      {activeTopic.title}
                    </h2>

                    <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-base sm:text-xl font-bold text-red-400 font-jp flex items-center gap-2">
                          {showFurigana ? (
                            <ruby className="leading-loose">
                              {activeTopic.jpTitle}
                              <rt className="text-[10px] text-red-300 font-normal">{activeTopic.hiragana}</rt>
                            </ruby>
                          ) : (
                            <span>{activeTopic.jpTitle}</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 font-mono flex flex-wrap gap-x-4">
                          <span>Romaji: {activeTopic.romaji}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSpeak(activeTopic.jpTitle)}
                        className="p-2.5 bg-red-950/80 hover:bg-red-900 border border-red-700/60 rounded-xl text-red-300 hover:text-white flex items-center gap-2 transition shrink-0 shadow-md"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4 text-red-400" />
                        <span className="text-xs font-bold font-mono">{speechRate}x</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed">
                      {activeTopic.summary}
                    </p>
                  </div>

                  {/* Key Takeaways */}
                  <div className="space-y-3">
                    <h3 className="text-sm md:text-base font-bold text-slate-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Điểm Cốt Lõi Trọng Tâm (Key Takeaways)</span>
                    </h3>
                    <ul className="space-y-2">
                      {activeTopic.keyTakeaways.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs md:text-sm text-slate-300 flex items-start gap-2.5 p-2.5 bg-slate-900/50 border border-slate-800/80 rounded-xl"
                        >
                          <span className="w-5 h-5 rounded-full bg-red-950/80 border border-red-700/60 text-red-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deep Cultural Explanation */}
                  <div className="space-y-3 p-5 md:p-6 bg-slate-900/60 border border-red-500/30 rounded-2xl">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm md:text-base">
                      <BookOpen className="w-5 h-5" />
                      <span>MỤC GIẢI THÍCH VĂN HÓA CHUYÊN SÂU</span>
                    </div>
                    <div className="text-xs md:text-sm text-slate-200 leading-relaxed space-y-3">
                      <p>{activeTopic.detailedExplanation}</p>
                    </div>
                  </div>

                  {/* Cultural Philosophy & Practical Advice */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/70 border border-indigo-500/30 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs md:text-sm">
                        <Heart className="w-4 h-4 text-indigo-400" />
                        <span>Triết Lý Tâm Hồn & Bài Học Đúc Kết</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeTopic.culturalPhilosophy}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/70 border border-emerald-500/30 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs md:text-sm">
                        <Lightbulb className="w-4 h-4 text-emerald-400" />
                        <span>Lời Khuyên Cho Người Việt Tại Nhật</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeTopic.practicalAdvice}
                      </p>
                    </div>
                  </div>

                  {/* Vocabulary List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm md:text-base font-bold text-slate-200 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Bảng Từ Vựng & Thuật Ngữ Hán Tự Trọng Tâm</span>
                      </h3>
                      <button
                        onClick={() => {
                          setFlashcardIndex(0);
                          setIsCardFlipped(false);
                          setIsFlashcardOpen(true);
                        }}
                        className="text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Ôn Flashcard</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {activeTopic.vocabularyList.map((vocab, vIdx) => (
                        <div
                          key={vIdx}
                          className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-slate-700 transition flex flex-col justify-between gap-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-base font-bold text-white font-jp">
                              {showFurigana ? (
                                <ruby>
                                  {vocab.word}
                                  <rt className="text-[10px] text-red-300 font-normal">{vocab.reading}</rt>
                                </ruby>
                              ) : (
                                vocab.word
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono text-slate-400">
                                {vocab.level}
                              </span>
                              <button
                                onClick={() => handleSpeak(vocab.word)}
                                className="p-1 hover:text-red-400 text-slate-400 transition"
                                title="Nghe phát âm"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          {!showFurigana && (
                            <div className="text-[11px] text-red-400 font-jp">{vocab.reading}</div>
                          )}
                          <div className="text-xs text-slate-300">{vocab.meaning}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Fact Box */}
                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs md:text-sm">
                      <strong className="text-amber-300 font-bold">Bạn Có Biết? (Quick Fact)</strong>
                      <p className="text-slate-300 leading-relaxed">{activeTopic.quickFact}</p>
                    </div>
                  </div>

                  {/* In-Article Quiz */}
                  {activeTopic.quiz && (
                    <div className="p-5 md:p-6 bg-slate-900/90 border border-indigo-500/30 rounded-2xl space-y-4">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm md:text-base">
                        <HelpCircle className="w-5 h-5" />
                        <span>TRẮC NGHIỆM VĂN HÓA & TƯ DUY XÃ HỘI</span>
                      </div>
                      <p className="text-sm md:text-base font-semibold text-slate-100">
                        {activeTopic.quiz.question}
                      </p>

                      <div className="space-y-2">
                        {activeTopic.quiz.options.map((opt, optIdx) => {
                          const userChoice = articleQuizAnswers[activeTopic.id];
                          const isAnswered = userChoice !== undefined;
                          const isSelected = userChoice === optIdx;
                          const isCorrect = optIdx === activeTopic.quiz?.correctIndex;

                          let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white';
                          if (isAnswered) {
                            if (isSelected && isCorrect) {
                              btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                            } else if (isCorrect) {
                              btnStyle = 'bg-emerald-950/40 border-emerald-600/60 text-emerald-300';
                            } else {
                              btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isAnswered}
                              onClick={() => {
                                setArticleQuizAnswers((prev) => ({ ...prev, [activeTopic.id]: optIdx }));
                                if (isCorrect) speechService.playSuccessSound();
                              }}
                              className={`w-full p-3 rounded-xl border text-left text-xs md:text-sm transition flex items-center justify-between gap-3 ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                              {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {articleQuizAnswers[activeTopic.id] !== undefined && (
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs md:text-sm">
                          <div className="font-bold text-slate-200">
                            {articleQuizAnswers[activeTopic.id] === activeTopic.quiz.correctIndex ? (
                              <span className="text-emerald-400 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" /> Chính xác! Tuyệt vời.
                              </span>
                            ) : (
                              <span className="text-rose-400 flex items-center gap-1.5">
                                <XCircle className="w-4 h-4" /> Chưa chính xác.
                              </span>
                            )}
                          </div>
                          <p className="text-slate-300 leading-relaxed">{activeTopic.quiz.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              )}
            </main>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 2: BẢN ĐỒ 47 TỈNH THÀNH TODŌFUKEN (PREFECTURES INSPECTOR)
         ==================================================================== */}
      {activeViewTab === 'prefectures47' && (
        <div className="space-y-6">
          {/* Region Tabs & Prefecture Search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs flex-1">
              {JAPAN_8_REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedPrefectureRegion(r.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition border ${
                    selectedPrefectureRegion === r.id
                      ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {r.name} ({r.count})
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={prefectureSearchQuery}
                onChange={(e) => setPrefectureSearchQuery(e.target.value)}
                placeholder="Tìm tên tỉnh, thủ phủ, đặc sản..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Grid Layout: Left 47 Prefectures Chips + Right Detailed Prefecture Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Prefectures list */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 max-h-[700px] overflow-y-auto pr-1">
              {filteredPrefectures.map((pref) => {
                const isSelected = activePrefecture.id === pref.id;
                return (
                  <button
                    key={pref.id}
                    onClick={() => {
                      setSelectedPrefectureId(pref.id);
                      speechService.playSuccessSound();
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/30 text-white shadow-lg'
                        : 'bg-slate-900/70 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-white font-jp">{pref.jpName}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">{pref.regionName}</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mt-0.5">{pref.name}</div>
                      <div className="text-[11px] text-slate-500">{pref.capital}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Prefecture Dossier Card */}
            <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span className="font-bold text-emerald-400">{activePrefecture.regionName}</span>
                    <span aria-hidden="true">·</span>
                    <span>Thủ phủ: {activePrefecture.capital}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
                    <span>{activePrefecture.jpName}</span>
                    <span className="text-xl text-slate-300 font-normal">({activePrefecture.name})</span>
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{activePrefecture.romaji}</div>
                </div>

                <button
                  onClick={() => handleSpeak(activePrefecture.jpName)}
                  className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition self-start sm:self-center"
                  title="Nghe phát âm tên tỉnh"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Dialect Voice Card */}
              <div className="p-4 bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4" />
                    <span>Khẩu âm phương ngữ đặc trưng ({activePrefecture.name}):</span>
                  </div>
                  <div className="text-lg font-bold text-white font-jp">
                    {activePrefecture.greetingBen.phrase}
                  </div>
                  <div className="text-xs text-slate-300 font-jp">
                    {activePrefecture.greetingBen.reading} &rarr; "{activePrefecture.greetingBen.meaning}"
                  </div>
                  <div className="text-[11px] text-slate-500 italic">
                    {activePrefecture.greetingBen.note}
                  </div>
                </div>

                <button
                  onClick={() => handleSpeak(activePrefecture.greetingBen.phrase)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition shrink-0"
                >
                  Nghe Khẩu Âm
                </button>
              </div>

              {/* 3 Detail Metric Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1.5">
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                    <Flag className="w-3.5 h-3.5 text-red-400" />
                    <span>Nổi tiếng về</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{activePrefecture.famousFor}</p>
                </div>

                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1.5">
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5 text-orange-400" />
                    <span>Đặc sản ẩm thực</span>
                  </div>
                  <p className="text-xs text-amber-300 leading-relaxed">{activePrefecture.foodSpecialty}</p>
                </div>

                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1.5">
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Danh thắng di sản</span>
                  </div>
                  <p className="text-xs text-cyan-200 leading-relaxed">{activePrefecture.landmark}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 3: BIÊN NIÊN SỬ 14 THỜI KỲ (14 HISTORY EPOCHS TIMELINE)
         ==================================================================== */}
      {activeViewTab === 'history14' && (
        <div className="space-y-6">
          {/* Horizontal Epochs Timeline Track */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-thin">
            <div className="flex items-center gap-2 min-w-max">
              {JAPAN_14_EPOCHS.map((epoch, idx) => {
                const isSelected = activeEpoch.id === epoch.id;
                return (
                  <button
                    key={epoch.id}
                    onClick={() => {
                      setSelectedEpochId(epoch.id);
                      speechService.playSuccessSound();
                    }}
                    className={`px-3.5 py-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-400 font-bold shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 font-mono">#{idx + 1}</div>
                    <div className="text-xs font-bold whitespace-nowrap">{epoch.jpName}</div>
                    <div className="text-[10px] opacity-80 whitespace-nowrap">{epoch.name.split(' ')[2] || epoch.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Epoch Full Canvas */}
          <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span className="font-bold text-amber-400">{activeEpoch.periodYears}</span>
                  <span aria-hidden="true">·</span>
                  <span>Kinh đô: {activeEpoch.capital}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
                  <span>{activeEpoch.jpName}</span>
                  <span className="text-xl text-slate-300 font-normal">({activeEpoch.name})</span>
                </h3>
                <div className="text-xs text-amber-300 font-medium mt-1">{activeEpoch.badge}</div>
              </div>

              <button
                onClick={() => handleSpeak(activeEpoch.jpName)}
                className="p-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white shadow-md transition self-start sm:self-center"
                title="Nghe phát âm thời kỳ"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed">
              {activeEpoch.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  Nhân Vật Lịch Sử Tiêu Biểu
                </h4>
                <div className="space-y-1">
                  {activeEpoch.keyFigures.map((fig, i) => (
                    <div key={i} className="text-xs text-slate-200 font-medium">
                      • {fig}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Đột Phá Văn Hóa & Công Nghệ
                </h4>
                <div className="space-y-1">
                  {activeEpoch.breakthroughs.map((br, i) => (
                    <div key={i} className="text-xs text-slate-300 leading-relaxed">
                      • {br}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-600/40 rounded-2xl space-y-1.5 text-xs sm:text-sm">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Bài Học Lịch Sử & Triết Lý Đúc Kết:</span>
              </div>
              <p className="text-slate-200 italic leading-relaxed">{activeEpoch.historicalLesson}</p>
              <div className="text-slate-400 text-xs pt-1">
                Di sản biểu tượng: <strong className="text-slate-200">{activeEpoch.culturalRelic}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 4: LỊCH LỄ HỘI 4 MÙA (MATSURI CALENDAR)
         ==================================================================== */}
      {activeViewTab === 'matsuri4seasons' && (
        <div className="space-y-6">
          {/* Season Filter Selector */}
          <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-none text-xs">
            {[
              { id: 'all', name: 'Tất cả lễ hội (12 Matsuri)' },
              { id: 'spring', name: '🌸 Mùa Xuân (Haru)' },
              { id: 'summer', name: '🎆 Mùa Hạ (Natsu)' },
              { id: 'autumn', name: '🍁 Mùa Thu (Aki)' },
              { id: 'winter', name: '❄️ Mùa Đông (Fuyu)' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedMatsuriSeason(s.id as any)}
                className={`px-4 py-2 rounded-xl font-bold transition border ${
                  selectedMatsuriSeason === s.id
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Matsuri Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMatsuri.map((m) => (
              <div
                key={m.id}
                className="bg-slate-950 p-5 rounded-3xl border border-slate-800 hover:border-rose-500/50 transition flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-bold text-rose-400">{m.seasonNameVn}</span>
                    <span>{m.monthTime}</span>
                  </div>

                  <h4 className="text-lg font-black text-white">{m.name}</h4>
                  <div className="text-xs text-red-400 font-jp font-bold mt-0.5">{m.jpName}</div>
                  <div className="text-[11px] text-slate-500">{m.reading}</div>

                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{m.highlight}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                  <div className="text-slate-400">
                    Địa điểm: <span className="text-slate-200">{m.location}</span>
                  </div>
                  <div className="text-slate-400">
                    Món ngon lễ hội: <span className="text-amber-300">{m.specialFood}</span>
                  </div>
                  <div className="text-slate-400">
                    Đền/Chùa chính: <span className="text-emerald-300">{m.shrineOrTemple}</span>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleSpeak(m.jpName)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-300 hover:text-white border border-slate-800 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe tên lễ hội</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 5: ĐẤU TRƯỜNG ĐỐ VUI BÁCH KHOA (TRIVIA ARENA)
         ==================================================================== */}
      {activeViewTab === 'trivia' && (
        <div className="max-w-2xl mx-auto py-4">
          {!triviaFinished ? (
            triviaQuestions.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                  <span>
                    Câu hỏi <strong>{triviaIndex + 1}</strong> / {triviaQuestions.length}
                  </span>
                  <span className="text-emerald-400 font-bold">
                    Điểm số: {triviaScore} / {triviaQuestions.length}
                  </span>
                </div>

                <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 text-center shadow-xl">
                  <div className="text-xs text-amber-400 font-bold mb-2">
                    {triviaQuestions[triviaIndex].topicTitle}
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                    {triviaQuestions[triviaIndex].question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {triviaQuestions[triviaIndex].options.map((opt: string, idx: number) => {
                    const isCorrect = idx === triviaQuestions[triviaIndex].correctIndex;
                    const isSelected = selectedTriviaOption === idx;

                    let btnStyle = 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-200';
                    if (triviaAnswerChecked) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={triviaAnswerChecked}
                        onClick={() => handleSelectTriviaOption(idx)}
                        className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span className="text-xs sm:text-sm font-medium">{opt}</span>
                        {triviaAnswerChecked && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {triviaAnswerChecked && (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm space-y-1">
                      <div className="font-bold text-slate-200">
                        {selectedTriviaOption === triviaQuestions[triviaIndex].correctIndex ? (
                          <span className="text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Chính xác!
                          </span>
                        ) : (
                          <span className="text-rose-400 flex items-center gap-1.5">
                            <XCircle className="w-4 h-4" /> Chưa chính xác.
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {triviaQuestions[triviaIndex].explanation}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleNextTriviaQuestion}
                        className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition"
                      >
                        {triviaIndex < triviaQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem xếp hạng'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400">Đang khởi tạo câu hỏi đố vui...</div>
            )
          ) : (
            <div className="text-center py-10 bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white">Hoàn Thành Thử Thách Bách Khoa!</h3>

              <div className="text-4xl font-black text-amber-400 my-2">
                {triviaScore} / {triviaQuestions.length} Điểm
              </div>

              <div className="text-sm text-emerald-400 font-bold">
                {triviaScore >= 9
                  ? 'Danh hiệu: Bậc Thầy Bách Khoa Toàn Thư Nhật Bản (Nihon Tsu - 日本通)'
                  : triviaScore >= 6
                  ? 'Danh hiệu: Nhà Nghiên Cứu Văn Hóa Xứ Phù Tang'
                  : 'Danh hiệu: Người Khám Phá Nước Nhật Trẻ Tuổi'}
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={startTriviaChallenge}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-red-600 hover:bg-red-500 transition shadow-md flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Làm lại bộ đề mới
                </button>
                <button
                  onClick={() => setActiveViewTab('articles')}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
                >
                  Về mục chuyên đề
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================
          TAB 6: THỜI TRANG GÁI NHẬT & SHOUJO STYLE STUDIO
         ==================================================================== */}
      {activeViewTab === 'fashion_shoujo' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="relative rounded-3xl bg-gradient-to-r from-pink-950/70 via-slate-900 to-rose-950/60 border border-pink-500/40 p-5 sm:p-7 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-pink-300">
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300">
                    <Shirt className="w-3.5 h-3.5" />
                    SIÊU TRỤ CỘT 4 · TIỂU VĂN HÓA & PHONG CÁCH SỐNG
                  </span>
                  <span>·</span>
                  <span className="font-jp text-pink-200">原宿 · 渋谷 · 少女スタイル</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white flex items-center gap-3">
                  <span>👗 Thời Trang Gái Nhật & Shoujo Style Studio</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Trải nghiệm phòng thử đồ ảo 6 trường phái thời trang Harajuku/Shibuya (Shoujo, Jirai Kei, Ryousangata, Tenshi Kaiwai, Y2K Gyaru, Mei Mei), cẩm nang trang điểm bọng mắt 3D Namida-Bukuro và bí quyết phối đồ 4 mùa thích ứng khí hậu Việt Nam.
                </p>
              </div>

              {/* Sub-tab Switcher Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-pink-500/30">
                <button
                  type="button"
                  onClick={() => setFashionSubTab('fashion')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    fashionSubTab === 'fashion'
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Shirt className="w-3.5 h-3.5" />
                  <span>Phối Đồ Gái Nhật</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFashionSubTab('beauty')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    fashionSubTab === 'beauty'
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>3D Namida-Bukuro & Makeup</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFashionSubTab('climate_ootd')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    fashionSubTab === 'climate_ootd'
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cẩm Nang 4 Mùa & VN</span>
                </button>
              </div>
            </div>
          </div>

          {/* SubTab 1: Fashion Outfits */}
          {fashionSubTab === 'fashion' && (
            <div className="space-y-6">
              <JapaneseFashionGenZLab onOpenBeautyStudio={() => setFashionSubTab('beauty')} />
            </div>
          )}

          {/* SubTab 2: Beauty & Makeup Studio */}
          {fashionSubTab === 'beauty' && (
            <div className="space-y-6">
              <JapaneseBeautyMakeupStudio onOpenFashionStudio={() => setFashionSubTab('fashion')} />
            </div>
          )}

          {/* SubTab 3: 4-Season Climate & Vietnam OOTD Guide */}
          {fashionSubTab === 'climate_ootd' && (
            <div className="space-y-6">
              {/* Climate Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Mùa Xuân */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-pink-950/40 to-slate-900 border border-pink-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/40">
                      Mùa Xuân · 春 (Haru)
                    </span>
                    <span className="text-xs font-mono text-pink-300">12°C - 20°C</span>
                  </div>
                  <h4 className="font-bold text-white text-base">Sakura Pastel & Cardigan</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sắc hồng hoa anh đào, trắng kem, xanh mint. Layering nhẹ với cardigan dệt kim mỏng hoặc áo len trễ vai kết hợp chân váy xếp ly dáng dài.
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-pink-500/20 text-[11px] space-y-1">
                    <div className="text-pink-300 font-bold">🇻🇳 Thích ứng Việt Nam:</div>
                    <div className="text-slate-300">
                      Thời tiết nồm ẩm miền Bắc: chọn sợi dệt cotton thoáng khí, tránh nỉ dày dễ ẩm mốc; miền Nam chuyển sang cardigan vải lụa hoặc ren mỏng che nắng.
                    </div>
                  </div>
                </div>

                {/* Mùa Hạ */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                      Mùa Hạ · 夏 (Natsu)
                    </span>
                    <span className="text-xs font-mono text-cyan-300">26°C - 35°C</span>
                  </div>
                  <h4 className="font-bold text-white text-base">Yukata Cách Tân & Babydoll</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Trang phục đi lễ hội Matsuri, đầm babydoll vải linen hoặc cotton Nhật Bản siêu nhẹ, nón cói mỏng, túi đan lát canvas và kẹp tóc ngọc trai.
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-[11px] space-y-1">
                    <div className="text-cyan-300 font-bold">🇻🇳 Thích ứng Việt Nam:</div>
                    <div className="text-slate-300">
                      Cực kỳ hợp với mùa nắng Sài Gòn & hè Hà Nội; luôn mang áo khoác chống nắng UV Cut và xịt khoáng kiềm dầu giữ lớp nền trang điểm mochi.
                    </div>
                  </div>
                </div>

                {/* Mùa Thu */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                      Mùa Thu · 秋 (Aki)
                    </span>
                    <span className="text-xs font-mono text-amber-300">14°C - 22°C</span>
                  </div>
                  <h4 className="font-bold text-white text-base">Momiji Trench Coat & Blazer</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tone màu đất: nâu hạt dẻ, be cát, cam cháy và rêu ô liu. Phối áo thun cổ lọ mỏng bên trong, khoác blazer kẻ caro oversize hoặc trench coat dáng lửng.
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-amber-500/20 text-[11px] space-y-1">
                    <div className="text-amber-300 font-bold">🇻🇳 Thích ứng Việt Nam:</div>
                    <div className="text-slate-300">
                      Mùa đẹp nhất của thu Hà Nội & Đà Lạt. Kết hợp bốt da cổ thấp (ankle boots) tạo hiệu ứng thon dài chân thanh lịch chuẩn tạp chí Non-no.
                    </div>
                  </div>
                </div>

                {/* Mùa Đông */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40">
                      Mùa Đông · 冬 (Fuyu)
                    </span>
                    <span className="text-xs font-mono text-indigo-300">0°C - 10°C</span>
                  </div>
                  <h4 className="font-bold text-white text-base">Heattech Layering & Dạ Dáng Dài</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Nghệ thuật mặc ấm không cộm: Lớp 1 (Heattech mỏng giữ nhiệt) + Lớp 2 (Áo len cổ lọ hoặc nỉ chui đầu) + Lớp 3 (Áo dạ dáng dài hoặc phao lông vũ).
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-indigo-500/20 text-[11px] space-y-1">
                    <div className="text-indigo-300 font-bold">🇻🇳 Thích ứng Việt Nam:</div>
                    <div className="text-slate-300">
                      Đông miền Bắc rét buốt: thêm khăn len quàng to bản kiểu Nhật (Volume Scarf) tạo cảm giác khuôn mặt nhỏ nhắn (Kogao effect).
                    </div>
                  </div>
                </div>
              </div>

              {/* Japanese Fashion Collocations & Slang */}
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span>Thuật Ngữ Phối Đồ & Phong Cách Chuẩn Bản Xứ (Fashion Jargon)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-jp font-bold text-pink-300">着回し</span>
                      <span className="text-[11px] font-mono text-slate-400">Kimawashi</span>
                    </div>
                    <div className="text-xs font-semibold text-white">Nghệ thuật Mix & Match linh hoạt</div>
                    <p className="text-[11px] text-slate-400">
                      Chỉ với 5-7 món đồ cơ bản tạo ra hơn 20 outfit khác nhau suốt tuần mà không trùng lặp.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-jp font-bold text-pink-300">抜け感</span>
                      <span className="text-[11px] font-mono text-slate-400">Nukekan</span>
                    </div>
                    <div className="text-xs font-semibold text-white">Nét buông lơi tự nhiên</div>
                    <p className="text-[11px] text-slate-400">
                      Sự tinh tế khi không cài hết cúc áo, xắn nhẹ gấu tay hoặc để lộ xương quai xanh tạo vẻ thanh thoát.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-jp font-bold text-pink-300">こなれ感</span>
                      <span className="text-[11px] font-mono text-slate-400">Konarekan</span>
                    </div>
                    <div className="text-xs font-semibold text-white">Vẻ sành điệu làm chủ trang phục</div>
                    <p className="text-[11px] text-slate-400">
                      Trang phục mặc lên trông cực kỳ tự nhiên, vừa vặn như được may riêng, không gượng gạo.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-jp font-bold text-pink-300">高見え</span>
                      <span className="text-[11px] font-mono text-slate-400">Takamie</span>
                    </div>
                    <div className="text-xs font-semibold text-white">Trông sang xịn vượt tầm giá</div>
                    <p className="text-[11px] text-slate-400">
                      Bí quyết chọn chất vải và màu sắc (GU, Uniqlo, Shein) khiến người nhìn ngỡ hàng hiệu đắt tiền.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-jp font-bold text-pink-300">骨格診断</span>
                      <span className="text-[11px] font-mono text-slate-400">Kokkaku Shindan</span>
                    </div>
                    <div className="text-xs font-semibold text-white">Chẩn đoán khung xương cơ thể</div>
                    <p className="text-[11px] text-slate-400">
                      3 hệ khung xương phổ biến: Straight (Thẳng đẫy đà), Wave (Mềm mại lượn sóng), Natural (Góc cạnh tự nhiên).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-jp font-bold text-pink-300">涙袋メイク</span>
                      <span className="text-[11px] font-mono text-slate-400">Namidabukuro Meiku</span>
                    </div>
                    <div className="text-xs font-semibold text-white">Trang điểm bọng mắt 3D Aegyo-sal</div>
                    <p className="text-[11px] text-slate-400">
                      Tạo bọng mắt căng tròn bằng bút chì bóng sáng kết hợp phấn tạo khối bóng đổ nhẹ nhàng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================
          MODAL: 4 SIÊU TRỤ CỘT BÁCH KHOA TOÀN DIỆN VƯỢT CHUẨN
         ==================================================================== */}
      {selectedSuperPillarModal !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedSuperPillarModal(null);
          }}
        >
          <div className="relative w-full max-w-3xl bg-slate-950 border-2 border-amber-500/60 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 ring-4 ring-amber-500/20 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 text-white flex items-center justify-center shadow-lg font-black text-sm">
                  P{selectedSuperPillarModal}
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                    Bách Khoa Toàn Thư · Siêu Trụ Cột {selectedSuperPillarModal}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                    {selectedSuperPillarModal === 1 && '📜 Bách Khoa Ngôn Ngữ Hào Quang & Logic Đề Thi JLPT'}
                    {selectedSuperPillarModal === 2 && '🧠 Giải Mã Tâm Lý Học & Ma Trận Giao Tiếp Xã Hội (Tate-Shakai)'}
                    {selectedSuperPillarModal === 3 && '⛩️ Linh Hồn Nhật Bản - Di Sản, Nghệ Thuật & Tín Ngưỡng'}
                    {selectedSuperPillarModal === 4 && '🌸 Đương Đại, Tiểu Văn Hóa & Kỹ Năng Sinh Tồn Thực Chiến'}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSuperPillarModal(null)}
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content depending on Pillar */}
            {selectedSuperPillarModal === 1 && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                  <h4 className="font-bold text-indigo-300 text-sm">1. Bách Khoa Thành Ngữ & Điển Tích (Yojijukugo, Kotowaza & Koji Seigo)</h4>
                  <p>
                    Hệ thống hóa thành ngữ 4 chữ, điển tích từ thời Xuân Thu Chiến Quốc (Đào Lý Bất Ngôn, Tái Ông Thất Mã, Nhất Nhật Tam Thu, Họa Xà Thiêm Túc) đến tục ngữ dân gian Nhật Bản. Tích hợp audio chuẩn Tokyo, phân tích cấu trúc Hán tự và đối chiếu tương đương tục ngữ Việt Nam.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                  <h4 className="font-bold text-indigo-300 text-sm">2. Đấu Trường Ngữ Pháp & Bẫy Trợ Từ JLPT</h4>
                  <p>
                    Mổ xẻ 100% các cặp ngữ pháp đồng nghĩa dễ gây nhiễu trong đề thi JEES. Phân định triệt để các trợ từ hiểm hóc: は (chủ đề, so sánh đối lập) vs が (chủ ngữ thông tin mới, hiện tượng tự nhiên), に (thời điểm xác định, đích đến tĩnh) vs で (địa điểm hành động, phương tiện), まで (hành động liên tục kéo dài) vs までに (hạn chót hoàn thành).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                  <h4 className="font-bold text-indigo-300 text-sm">3. Hán Tự N1, Dị Thể Tự & Từ Tượng Thanh (Onomatopoeia)</h4>
                  <p>
                    Chinh phục các chữ Hán cao cấp và dị thể hiếm: 躊躇 (chần chừ), 忖度 (đoán ý người khác), 狡猾 (ranh mãnh). Giải mã bẫy đồng âm khác nghĩa: おさめる (収める: thu lại / 納める: nộp / 治める: trị / 修める: trau dồi) và はかる (計る: đo / 量る: cân / 測る: đong / 諮る: tham vấn / 図る: mưu đồ).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                  <h4 className="font-bold text-indigo-300 text-sm">4. Ngũ Thể Thư Đạo & Kansei Kotoba (Cảm Thức Ngôn Từ)</h4>
                  <p>
                    Lục Thư (Rokushu - 6 phép cấu tạo chữ Hán), 5 thư thể (Triện, Lệ, Khải, Hành, Thảo), nghệ thuật khoảng trống Yohaku. Thưởng thức các từ ngữ cảm xúc vi tế độc bản không thể dịch nguyên văn: Komorebi (nắng lọt kẽ lá), Ikigai (lý do thức dậy mỗi sớm), Yugen (vẻ u huyền sâu thẳm), Setsunai (nỗi buồn man mác ngọt ngào).
                  </p>
                </div>
              </div>
            )}

            {selectedSuperPillarModal === 2 && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                  <h4 className="font-bold text-emerald-300 text-sm">1. Tâm Lý Học Nhật Bản: Tatemae, Honne & Amae</h4>
                  <p>
                    Giải mã sự phân tách giữa bộ mặt xã hội (Tatemae) và tâm tư chân thật (Honne). Hội chứng nương tựa Amae là cội nguồn của mẫu câu nhờ vả `~te morau` và sự cảm kích `~te kurete arigatou`. Phân tích áp lực đồng đẳng (Douchou Atsuryoku), tục tẩy chay Murahachibu và bản năng đọc vị không khí (KY - Kuuki ga Yomenai).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                  <h4 className="font-bold text-emerald-300 text-sm">2. La Bàn Uchi-Soto & Ma Trận Kính Ngữ 5 Cấp Độ</h4>
                  <p>
                    Ranh giới phe mình (Uchi) và người ngoài (Soto): Nghiêm cấm tuyệt đối dùng Tôn kính ngữ cho sếp công ty mình khi nói chuyện với đối tác bên ngoài! Nắm vững 5 cấp bậc: Sonkeigo (Tôn kính), Kenjougo I (Khiêm nhường hướng đối tượng), Kenjougo II / Teichougo (Khiêm nhường lịch thiệp), Teineigo (Lịch sự desu/masu), Bikago (Mỹ từ ngữ gọt giũa).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                  <h4 className="font-bold text-emerald-300 text-sm">3. Lễ Nghi Đời Người (Kankonsousai) & Văn Hóa Zoutou / Omotenashi</h4>
                  <p>
                    Phong bì tiền mừng cưới (Shugi-bukuro): chọn tiền mới tinh, số tờ là số lẻ (3 man, 5 man, 7 man) để tránh phân chia chia cắt. Tiền viếng tang (Kouden): tiền cũ có nếp gấp, mực viết nhạt (Usuzumi) biểu lộ nước mắt làm nhạt mực. Nút thắt Mizuhiki: Musubikiri (buộc chặt một lần, không lặp lại) vs Cho-musubi (nơ bướm, dùng cho sự việc vui lặp lại). Văn hóa biếu quà Ochugen, Oseibo và lòng hiếu khách tận hiến Omotenashi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                  <h4 className="font-bold text-emerald-300 text-sm">4. Ngôn Ngữ Doanh Nghiệp & Chăm Sóc Người Cao Tuổi (Kaigo)</h4>
                  <p>
                    Kỷ luật Ho-Ren-So (Báo cáo - Liên lạc - Thảo luận), 5S (Seiri, Seiton, Seisou, Seiketsu, Shitsuke), nghi thức trao danh thiếp Meishi 45 độ. Tâm lý học lão khoa trong ngành Kaigo: Bảo vệ phẩm giá con người (Songen no hoji), ngôn ngữ chăm sóc nâng niu người bệnh (Kaigo-keigo) và tránh tuyệt đối ngôn ngữ trịch thượng (Kenzon).
                  </p>
                </div>
              </div>
            )}

            {selectedSuperPillarModal === 3 && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                  <h4 className="font-bold text-amber-300 text-sm">1. Thần Đạo Shinto & Linh Hồn Ngôn Từ (Kotodama)</h4>
                  <p>
                    Niềm tin vạn vật hữu linh vào Bát bách vạn thần (Yaoyorozu no Kami). Sức mạnh linh thiêng của lời nói Kotodama (nói lời lành mang lại phước báu, tránh lời kiêng kị Imikotoba). Các vật phẩm cát tường may mắn Engimono: búp bê Daruma kiên trì, mèo vẫy tài lộc Maneki-neko, bùa hộ mệnh Omamori và thế giới thần thoại Yōkai kỳ bí.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                  <h4 className="font-bold text-amber-300 text-sm">2. Triết Lý Wabi-Sabi, Trà Đạo Chado & Nghệ Thuật Kintsugi</h4>
                  <p>
                    Wabi-Sabi: Chiêm ngưỡng vẻ đẹp mộc mạc của sự bất toàn và vô thường. Trà đạo (Chado) với tinh thần Nhất kỳ nhất hội (Ichigo Ichie - mỗi cuộc gặp gỡ là duy nhất trong đời) và Tứ quy Hòa - Kính - Thanh - Tịch (Wa - Kei - Sei - Jaku). Nghệ thuật hàn gắn gốm vỡ bằng vàng ròng Kintsugi biến vết thương thành dấu ấn kiêu hãnh; tôn vinh tinh thần nghệ nhân thủ công Monozukuri.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                  <h4 className="font-bold text-amber-300 text-sm">3. Tinh Thần Võ Sĩ Đạo Bushido, Ẩm Thực Washoku & Sân Khấu</h4>
                  <p>
                    7 đức hạnh Võ sĩ đạo (Nghĩa, Dũng, Nhân, Lễ, Thành, Danh, Trung) cùng đức tính chịu đựng bền bỉ Gaman. Triết lý ẩm thực Washoku: Ngũ vị (ngọt, chua, cay, đắng, mặn), Ngũ sắc (trắng, đen, đỏ, vàng, xanh) và Ngũ pháp (sống, nướng, hầm, chiên, hấp). Phép tắc ngâm suối nước nóng Onsen/Sento. Nghệ thuật sân khấu cổ điển Noh và Kabuki với nhịp điệu chuyển động Jo-Ha-Kyu (Bắt đầu êm đềm - Tăng tốc bùng nổ - Kết thúc dứt khoát).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                  <h4 className="font-bold text-amber-300 text-sm">4. Thi Ca Cổ Điển Waka & Ogura Hyakunin Isshu</h4>
                  <p>
                    Vần thơ Tanka 31 âm tiết (5-7-5-7-7), các từ đệm gối đầu Makurakotoba, từ ngữ chỉ mùa Kigo. Bộ thi tập 100 bài thơ cổ của 100 nhà thơ Ogura Hyakunin Isshu và môn thể thao trí tuệ Kyogi Karuta; hòa cùng không khí lễ hội 4 mùa Matsuri tưng bừng khắp các vùng miền.
                  </p>
                </div>
              </div>
            )}

            {selectedSuperPillarModal === 4 && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-pink-950/40 border border-pink-500/30 space-y-2">
                  <h4 className="font-bold text-pink-300 text-sm">1. Tiểu Văn Hóa Otaku, Fandom & Gen Z Lingo</h4>
                  <p>
                    Vũ trụ Anime, văn hóa theo đuổi thần tượng (Oshi-katsu - 推し活), ngôn ngữ mạng Net-slang. Cảnh báo và phòng tránh lỗi giao tiếp hoang tưởng kiểu Chunibyou. Phân biệt ngữ âm sắc thái phương ngữ Kansai-ben hào sảng với các từ Anh-Nhật Wasei-Eigo dễ gây hiểu lầm.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-pink-950/40 border border-pink-500/30 space-y-2">
                  <h4 className="font-bold text-pink-300 text-sm">2. Thời Trang Gái Nhật & Shoujo Style Studio</h4>
                  <p>
                    Phòng thử đồ ảo 6 trường phái thời trang đình đám: Shoujo Style nữ tính ngọt ngào, Jirai Kei (Địa lôi hệ) huyền bí quyến rũ, Ryousangata (Lượng sản hình) tiểu thư thanh lịch, Tenshi Kaiwai (Thiên sứ giới) trong sáng tự do, Y2K Gyaru nổi loạn cá tính, Mei Mei aesthetic đáng yêu. Hướng dẫn trang điểm bọng mắt 3D Namida-Bukuro và cẩm nang OOTD 4 mùa thích ứng khí hậu Việt Nam.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-pink-950/40 border border-pink-500/30 space-y-2">
                  <h4 className="font-bold text-pink-300 text-sm">3. Địa Lý 47 Tỉnh Thành, 14 Thời Kỳ & Kinh Tế - Thể Thao</h4>
                  <p>
                    Bản đồ toàn diện 47 tỉnh thành Todōfuken chia theo 8 vùng; biên niên sử 14 thời kỳ từ Jomon đến Reiwa. Lịch sử giao thương Việt - Nhật qua thương cảng Hội An và Châu Ấn Thuyền (Shuinsen). Kỳ tích kinh tế Shinkansen, nền kinh tế bong bóng và tinh thần thể thao quật cường: Sumo truyền thống, giải bóng chày thanh xuân Koshien và giải chạy tiếp sức Hakone Ekiden.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-pink-950/40 border border-pink-500/30 space-y-2">
                  <h4 className="font-bold text-pink-300 text-sm">4. Xã Hội Đương Đại & Bản Lĩnh Sinh Tồn Đảo Quốc (Shimaguni)</h4>
                  <p>
                    Đối mặt với các vấn đề xã hội: già hóa dân số (Shoushikourei-ka), lối sống tự lập đơn thân Ohitorisama, người trẻ cô lập Hikikomori, ý nghĩa thiêng liêng của Lễ trưởng thành Seijin-shiki. Kỹ năng ứng phó thảm họa tự nhiên Saigai (động đất, sóng thần, bão lũ), sức mạnh gắn kết Kizuna, và mô thức sinh tồn 3 vòng kiềng: Tự cứu (Jijo) - Tương trợ láng giềng (Kyojo) - Công trợ cứu trợ nhà nước (Kojo).
                  </p>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Toàn bộ tri thức đã được đồng bộ hóa vào các bài học và bài kiểm tra tương tác.
              </span>
              <button
                type="button"
                onClick={() => setSelectedSuperPillarModal(null)}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition cursor-pointer"
              >
                Đã Rõ
              </button>
            </div>
          </div>
        </div>
      )}
      {isFlashcardOpen && activeTopic && activeTopic.vocabularyList[flashcardIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Thẻ Flashcard 3D Bách Khoa</span>
                    <span className="text-xs font-mono text-amber-300">
                      {flashcardIndex + 1} / {activeTopic.vocabularyList.length}
                    </span>
                  </h3>
                  <div className="text-xs text-slate-400">{activeTopic.title.slice(0, 35)}...</div>
                </div>
              </div>
              <button
                onClick={() => setIsFlashcardOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="cursor-pointer min-h-[260px] bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-xl select-none"
            >
              <div className="w-full flex items-center justify-between text-xs text-slate-400">
                <span>JLPT {activeTopic.vocabularyList[flashcardIndex].level}</span>
                <span>{isCardFlipped ? 'Mặt sau' : 'Mặt trước (Bấm lật)'}</span>
              </div>

              {!isCardFlipped ? (
                <div className="my-auto py-4">
                  <div className="text-4xl font-black text-white font-jp mb-2">
                    {activeTopic.vocabularyList[flashcardIndex].word}
                  </div>
                  <div className="text-base font-bold text-red-400 font-jp">
                    {activeTopic.vocabularyList[flashcardIndex].reading}
                  </div>
                </div>
              ) : (
                <div className="my-auto py-4">
                  <div className="text-xl font-bold text-emerald-400 mb-1">
                    {activeTopic.vocabularyList[flashcardIndex].meaning}
                  </div>
                  <div className="text-xs text-slate-400">
                    {activeTopic.vocabularyList[flashcardIndex].word} · {activeTopic.vocabularyList[flashcardIndex].reading}
                  </div>
                </div>
              )}

              <div className="text-[11px] text-slate-500">Chạm hoặc bấm Space để lật mặt thẻ</div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setIsCardFlipped(false);
                  setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : activeTopic.vocabularyList.length - 1));
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Thẻ trước
              </button>
              <button
                onClick={() => handleSpeak(activeTopic.vocabularyList[flashcardIndex].word)}
                className="p-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white"
                title="Phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsCardFlipped(false);
                  setFlashcardIndex((prev) => (prev < activeTopic.vocabularyList.length - 1 ? prev + 1 : 0));
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Thẻ sau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kho Tri Thức Bách Khoa Không Giới Hạn - Modal Chọn Chủ Đề Cần Nạp (+5) */}
      {isLoadMoreDropdownOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLoadMoreDropdownOpen(false);
          }}
        >
          <div
            ref={loadMoreDropdownRef}
            className="relative w-full max-w-2xl bg-slate-950 border-2 border-red-500/60 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 ring-4 ring-red-500/20 max-h-[90vh] overflow-y-auto animate-in zoom-in-95"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-red-600/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-500/40">
                      Kho Tri Thức Bách Khoa Không Giới Hạn
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {topics.length} / ∞ Chuyên đề
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                    Chọn Chủ Đề Cần Nạp (+5 Chuyên Đề Mới)
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLoadMoreDropdownOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                title="Đóng (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hãy chọn danh mục kiến thức bạn muốn tiếp thu. Hệ thống sẽ ngay lập tức nạp thêm <strong className="text-amber-400 font-bold">+5 chuyên đề độc bản mới</strong> kèm tóm tắt, từ vựng chuẩn JLPT, văn hóa thực chiến và triết lý sống Nhật Bản:
            </p>

            {/* General Batch Option */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleLoadMoreFive()}
                className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-red-950/60 via-slate-900 to-amber-950/40 border-2 border-red-500/50 hover:border-amber-400 hover:from-red-900/50 hover:to-amber-900/40 flex items-center justify-between transition-all group shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-amber-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                    +5
                  </div>
                  <div>
                    <div className="font-black text-sm sm:text-base text-white group-hover:text-amber-300 transition flex items-center gap-2">
                      <span>+5 Chuyên Đề Tổng Hợp Vượt Chuẩn</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-500/30 text-red-200 border border-red-400/40">
                        Khuyên dùng
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Nạp ngẫu nhiên bao quát toàn bộ 8 trụ cột văn hóa bách khoa toàn thư
                    </div>
                  </div>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-red-600 group-hover:bg-amber-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-md shrink-0">
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Nạp Ngay</span>
                </div>
              </button>

              {/* 8 Pillar Specific Sections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {ENCYCLOPEDIA_SECTIONS_META.map((meta) => (
                  <button
                    key={meta.id}
                    type="button"
                    onClick={() => handleLoadMoreFive(meta.id)}
                    className="text-left p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 flex items-center justify-between transition-all group hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl ${meta.colorScheme.bg} ${meta.colorScheme.text} border ${meta.colorScheme.border} flex items-center justify-center font-black text-xs shrink-0 mt-0.5`}>
                        +5
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition line-clamp-1">
                          {meta.title}
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {meta.badge}
                        </div>
                      </div>
                    </div>
                    <Plus className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer tip */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                Mọi chuyên đề được nạp đều lưu tự động vào trình duyệt vĩnh viễn.
              </span>
              <button
                type="button"
                onClick={() => setIsLoadMoreDropdownOpen(false)}
                className="text-xs font-semibold text-slate-400 hover:text-white underline cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
