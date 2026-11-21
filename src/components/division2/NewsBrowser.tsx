import React, { useState, useEffect, useMemo, useRef } from 'react';
import { NewsItem, JLPTLevel, NewsSentence } from '../../types';
import { enrichedNewsList, extraNewsDatabase } from '../../data/newsBrowserDatabase';
import { initialNewsList } from '../../data/initialData';
import { ALL_MEDIA_GROUPS } from '../../data/newsSourcesDirectory';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { srsVaultService } from '../../services/srsVaultService';
import { historyService, HistoryItem } from '../../services/historyService';
import {
  Newspaper,
  RefreshCw,
  Volume2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Lightbulb,
  History,
  Languages,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  BookOpen,
  SplitSquareVertical,
  Layers,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Globe,
  Radio,
  Share2,
  X,
  Info,
  Mic,
  MicOff,
  Activity,
  GitFork,
  Zap,
  TrendingUp,
  FileSearch,
  Check,
  Award,
  ShieldAlert,
  Plus,
} from 'lucide-react';

export interface NewsBrowserProps {
  onOpenAiSensei?: (
    query: string,
    tab?: 'chat' | 'vocab_assistant' | 'drill_arena' | 'exam_vault' | 'culture' | 'lectures' | 'clinic'
  ) => void;
}

export const NewsBrowser: React.FC<NewsBrowserProps> = ({ onOpenAiSensei }) => {
  // Combine enriched database with existing initialNewsList
  const [allNewsItems, setAllNewsItems] = useState<NewsItem[]>(() => {
    const combined = [...enrichedNewsList];
    initialNewsList.forEach((item) => {
      if (!combined.some((c) => c.id === item.id)) {
        combined.push(item);
      }
    });
    return combined;
  });

  // Source Pillar Filter: 'all' | 7 groups
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('all');
  const [searchNewsKeyword, setSearchNewsKeyword] = useState<string>('');

  // Active Sub-View: 'reader' | 'shadowing' | 'kakikotoba' | 'breaking_gen' | 'custom_scanner'
  const [activeSubView, setActiveSubView] = useState<
    'reader' | 'shadowing' | 'kakikotoba' | 'breaking_gen' | 'custom_scanner'
  >('reader');

  // Directory Modal state
  const [isMediaDirectoryOpen, setIsMediaDirectoryOpen] = useState<boolean>(false);
  const [directorySearchQuery, setDirectorySearchQuery] = useState<string>('');
  const [selectedDirectoryTab, setSelectedDirectoryTab] = useState<string>('all');

  // Navigation index & history
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [newsHistory, setNewsHistory] = useState<HistoryItem[]>(() => historyService.getHistory('news'));

  // Reader Controls
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [showVietnamese, setShowVietnamese] = useState<boolean>(true);
  const [highlightVocabulary, setHighlightVocabulary] = useState<boolean>(true);
  const [highlightLevelFilter, setHighlightLevelFilter] = useState<'all' | JLPTLevel>('all');
  const [displayLayout, setDisplayLayout] = useState<'sentence_by_sentence' | 'full_bilingual'>('sentence_by_sentence');

  // Active hover/clicked word quick inspection sheet
  const [activeWordHover, setActiveWordHover] = useState<{
    word: string;
    reading: string;
    meaning: string;
    level: JLPTLevel;
  } | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Shadowing Studio state
  const [shadowingSpeed, setShadowingSpeed] = useState<number>(1.0);
  const [shadowingSentenceIndex, setShadowingSentenceIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechTranscript, setSpeechTranscript] = useState<string>('');
  const [shadowingScore, setShadowingScore] = useState<number | null>(null);

  // Custom Scanner state
  const [customInputText, setCustomInputText] = useState<string>('');
  const [isScanningCustom, setIsScanningCustom] = useState<boolean>(false);

  // Breaking News Generator state
  const [isGeneratingBreaking, setIsGeneratingBreaking] = useState<boolean>(false);
  const [selectedTopicTheme, setSelectedTopicTheme] = useState<string>('semiconductor');

  // Filtered news items
  const filteredNewsList = useMemo(() => {
    return allNewsItems.filter((item) => {
      if (selectedGroupFilter !== 'all') {
        const s = item.source.toLowerCase();
        if (selectedGroupFilter === 'group_x' && !s.includes('x') && !s.includes('twitter')) return false;
        if (selectedGroupFilter === 'group_vn' && !s.includes('vtv') && !s.includes('vietnam') && !s.includes('ttxvn') && !s.includes('báo')) return false;
        if (selectedGroupFilter === 'group_nhk_kyodo' && !s.includes('nhk') && !s.includes('kyodo') && !s.includes('jiji')) return false;
        if (selectedGroupFilter === 'group_big5_newspapers' && !s.includes('nikkei') && !s.includes('asahi') && !s.includes('mainichi') && !s.includes('yomiuri') && !s.includes('sankei')) return false;
        if (selectedGroupFilter === 'group_tech_biz_regional' && !s.includes('pr times') && !s.includes('itmedia') && !s.includes('tbs') && !s.includes('chunichi')) return false;
        if (selectedGroupFilter === 'group_intl_japanese' && !s.includes('reuters') && !s.includes('bloomberg') && !s.includes('ap') && !s.includes('wsj')) return false;
        if (selectedGroupFilter === 'group_culture_lifestyle_travel' && !s.includes('yahoo') && !s.includes('locobee') && !s.includes('nippon')) return false;
      }
      if (searchNewsKeyword.trim()) {
        const q = searchNewsKeyword.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q) || (item.titleVietnamese || '').toLowerCase().includes(q);
        const matchesText = item.fullText.toLowerCase().includes(q) || (item.vietnameseTranslation || '').toLowerCase().includes(q);
        const matchesSource = item.source.toLowerCase().includes(q);
        if (!matchesTitle && !matchesText && !matchesSource) return false;
      }
      return true;
    });
  }, [allNewsItems, selectedGroupFilter, searchNewsKeyword]);

  const currentNews = filteredNewsList[currentIndex % (filteredNewsList.length || 1)] || allNewsItems[0];

  // Auto reset index if filtered list changes
  useEffect(() => {
    setCurrentIndex(0);
    setShadowingSentenceIndex(0);
    setShadowingScore(null);
  }, [selectedGroupFilter, searchNewsKeyword]);

  // Track viewed news in history
  useEffect(() => {
    if (currentNews) {
      const updated = historyService.addItem('news', {
        id: currentNews.id,
        title: currentNews.title,
        subtitle: currentNews.summary?.slice(0, 40) + '...',
        level: currentNews.source,
      });
      setNewsHistory(updated);
    }
  }, [currentNews?.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getLevelColor = (level: JLPTLevel) => {
    switch (level) {
      case 'N1':
        return 'text-rose-300 bg-rose-950/70 border-rose-600/70 hover:bg-rose-900/80 shadow-rose-950/50';
      case 'N2':
        return 'text-amber-300 bg-amber-950/70 border-amber-600/70 hover:bg-amber-900/80 shadow-amber-950/50';
      case 'N3':
        return 'text-purple-300 bg-purple-950/70 border-purple-600/70 hover:bg-purple-900/80 shadow-purple-950/50';
      case 'N4':
        return 'text-cyan-300 bg-cyan-950/70 border-cyan-600/70 hover:bg-cyan-900/80 shadow-cyan-950/50';
      case 'N5':
        return 'text-emerald-300 bg-emerald-950/70 border-emerald-600/70 hover:bg-emerald-900/80 shadow-emerald-950/50';
      default:
        return 'text-slate-300 bg-slate-900 border-slate-700';
    }
  };

  const getLevelBadge = (level: JLPTLevel) => {
    switch (level) {
      case 'N1':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'N2':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'N3':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'N4':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'N5':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // Helper to render plain text with vocabulary highlighting
  const renderHighlightedPlainText = (text: string) => {
    if (!highlightVocabulary || !currentNews?.vocabularyTags || currentNews.vocabularyTags.length === 0) {
      return text;
    }
    const words = [...currentNews.vocabularyTags]
      .filter((vt) => highlightLevelFilter === 'all' || vt.level === highlightLevelFilter)
      .sort((a, b) => b.word.length - a.word.length);

    if (words.length === 0) return text;
    const regex = new RegExp(`(${words.map((w) => w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const match = words.find((w) => w.word === part);
      if (match) {
        return (
          <span
            key={i}
            onClick={() => {
              setActiveWordHover(match);
              speechService.speak(match.word);
            }}
            className={`inline-block px-1.5 py-0.5 mx-0.5 rounded border font-semibold cursor-pointer transition-all shadow-sm ${getLevelColor(
              match.level
            )}`}
            title={`[${match.level}] ${match.word} (${match.reading}): ${match.meaning}`}
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // Universal 1-Touch Bookmark for current article
  const isArticleBookmarked = useMemo(() => {
    return currentNews ? srsVaultService.isBookmarked(currentNews.title) : false;
  }, [currentNews]);

  const handleToggleArticleBookmark = () => {
    if (!currentNews) return;
    const bookmarked = srsVaultService.toggleBookmark({
      japanese: currentNews.title,
      reading: currentNews.source,
      vietnamese: currentNews.titleVietnamese || currentNews.summary,
      contextSentence: currentNews.fullText.slice(0, 150) + '...',
      contextTranslation: currentNews.vietnameseTranslation?.slice(0, 150) || currentNews.summary,
      level: 'N1',
      type: 'news',
      source: currentNews.source,
    });
    speechService.playSuccessSound();
    showToast(bookmarked ? 'Đã ghim bài báo vào Sổ tay Trí nhớ SRS!' : 'Đã bỏ ghim khỏi Sổ tay SRS.');
  };

  // Universal 1-Touch Bookmark for active word
  const handleBookmarkWord = (wordItem: { word: string; reading: string; meaning: string; level: JLPTLevel }) => {
    srsVaultService.addBookmark({
      japanese: wordItem.word,
      reading: wordItem.reading,
      vietnamese: wordItem.meaning,
      level: wordItem.level,
      type: 'vocab',
      contextSentence: currentNews?.sentences?.[0]?.japanese || currentNews.title,
      contextTranslation: currentNews?.sentences?.[0]?.vietnamese || currentNews.titleVietnamese || '',
      source: `Báo chí: ${currentNews.source}`,
    });
    speechService.playSuccessSound();
    showToast(`Đã lưu "${wordItem.word}" kèm câu ngữ cảnh vào Sổ tay SRS!`);
  };

  // 1. Tải thêm +3 Bản Tin Mới Toàn Diện
  const handleLoadPlus3News = async () => {
    setIsLoadingMore(true);
    try {
      const unaddedExtras = extraNewsDatabase.filter(
        (ext) => !allNewsItems.some((ex) => ex.id === ext.id)
      );
      if (unaddedExtras.length >= 3) {
        const next3 = unaddedExtras.slice(0, 3);
        setAllNewsItems((prev) => [...next3, ...prev]);
        setCurrentIndex(0);
        speechService.playSuccessSound();
        showToast('Đã nạp thêm 3 bản tin thời sự uy tín mới (+3)!');
        return;
      }
      // If extra items exhausted, fetch 3 via Gemini or recycle
      const prompt = `Hãy sinh ra đúng 3 bản tin thời sự Nhật Bản mới nhất theo chuẩn văn phong báo chí NHK/Nikkei. Trả về JSON thuần mảng 3 object NewsItem.`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 3 object.');
      const parsed = safeExtractJson<NewsItem[] | null>(res, null);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid3 = parsed.filter((it) => it && it.title).slice(0, 3);
        if (valid3.length > 0) {
          setAllNewsItems((prev) => [...valid3, ...prev]);
          setCurrentIndex(0);
          speechService.playSuccessSound();
          showToast('Đã tạo thành công 3 bản tin thời sự mới thời gian thực (+3)!');
          return;
        }
      }
      throw new Error('Fallback');
    } catch {
      const recycled = extraNewsDatabase.slice(0, 3).map((it, idx) => ({
        ...it,
        id: `${it.id}_copy_${Date.now()}_${idx}`,
        publishedAt: 'Vừa cập nhật (+3 Real-time update)',
      }));
      setAllNewsItems((prev) => [...recycled, ...prev]);
      setCurrentIndex(0);
      speechService.playSuccessSound();
      showToast('Đã nạp thêm 3 bản tin thời sự từ kho lưu trữ báo chí (+3)!');
    } finally {
      setIsLoadingMore(false);
    }
  };

  // 2. Thêm +3 Từ vựng trọng tâm N1/N2 vào bài báo hiện tại
  const handleAddPlus3Vocabulary = () => {
    if (!currentNews) return;
    const extraVocabs = [
      { word: '拍車をかける', reading: 'はくしゃをかける', meaning: 'Thúc đẩy, tạo đà gia tăng chóng mặt', level: 'N1' as JLPTLevel },
      { word: '難航する', reading: 'なんこうする', meaning: 'Gặp bế tắc, tiến triển trắc trở khó khăn', level: 'N1' as JLPTLevel },
      { word: '兆候', reading: 'ちょうこう', meaning: 'Dấu hiệu, điềm báo, triệu chứng biểu hiện', level: 'N2' as JLPTLevel },
      { word: '懸念', reading: 'けねん', meaning: 'Mối lo ngại, e ngại sâu sắc', level: 'N1' as JLPTLevel },
      { word: '踏み切る', reading: 'ふみきる', meaning: 'Quyết đoán dấn thân / đưa ra bước đi táo bạo', level: 'N2' as JLPTLevel },
      { word: '見通し', reading: 'みとおし', meaning: 'Viễn cảnh, tầm nhìn dự báo tương lai', level: 'N2' as JLPTLevel },
    ];
    const currentWords = new Set(currentNews.vocabularyTags.map((v) => v.word));
    const candidateVocabs = extraVocabs.filter((v) => !currentWords.has(v.word)).slice(0, 3);
    const added = candidateVocabs.length > 0 ? candidateVocabs : extraVocabs.slice(0, 3);

    currentNews.vocabularyTags = [...currentNews.vocabularyTags, ...added];
    setAllNewsItems([...allNewsItems]);
    speechService.playSuccessSound();
    showToast('Đã nạp thêm 3 từ vựng JLPT chuyên sâu vào bản tin (+3)!');
  };

  // 3. Thêm +3 Câu luyện phát thanh viên vào phòng Shadowing
  const handleAddPlus3ShadowingSentences = () => {
    if (!currentNews) return;
    const extraSentences: NewsSentence[] = [
      {
        japanese: '金融市場のボラティリティが高まる中、投資家は慎重な姿勢を崩していない。',
        vietnamese: 'Trong bối cảnh thị trường tài chính biến động mạnh, các nhà đầu tư vẫn giữ thái độ vô cùng thận trọng.',
        tokens: [
          { text: '金融市場', ruby: 'きんゆうしじょう', level: 'N2', meaning: 'thị trường tài chính' },
          { text: '慎重', ruby: 'しんちょう', level: 'N2', meaning: 'thận trọng' },
        ],
        keyGrammarOrVocab: '〜中（なか）: trong bối cảnh...',
      },
      {
        japanese: '新法案の施行を契機として、労働環境の是正に向けた動きが本格化しつつある。',
        vietnamese: 'Lấy việc thực thi dự luật mới làm cơ hội, các động thái hướng tới chấn chỉnh môi trường lao động đang dần đi vào thực chất.',
        tokens: [
          { text: '施行', ruby: 'しこう', level: 'N1', meaning: 'thực thi' },
          { text: '契機', ruby: 'けいき', level: 'N1', meaning: 'cơ hội biến cố' },
        ],
        keyGrammarOrVocab: '〜を契機として: nhân cơ hội, lấy mốc...',
      },
      {
        japanese: '各企業は生き残りを懸けて、生成AI技術の導入に拍車をかけている。',
        vietnamese: 'Các doanh nghiệp đang đặt cược sự sống còn để đẩy mạnh tối đa việc áp dụng công nghệ AI tạo sinh.',
        tokens: [
          { text: '生き残り', ruby: 'いきのこり', level: 'N2', meaning: 'sống còn' },
          { text: '拍車', ruby: 'はくしゃ', level: 'N1', meaning: 'thúc đẩy tăng tốc' },
        ],
        keyGrammarOrVocab: '〜に拍車をかける: tạo đà tăng tốc chóng mặt',
      },
    ];

    currentNews.sentences = [...(currentNews.sentences || []), ...extraSentences];
    setAllNewsItems([...allNewsItems]);
    speechService.playSuccessSound();
    showToast('Đã nạp thêm 3 câu luyện phát thanh viên mới vào phòng Shadowing (+3)!');
  };

  // 4. Mẫu câu phức Kakikotoba
  const [extraKakikotobaList, setExtraKakikotobaList] = useState<Array<{ pattern: string; meaning: string; sample: string; nuance: string }>>([
    {
      pattern: '〜を余儀なくされる',
      meaning: 'Bị buộc phải làm điều gì đó ngoài mong muốn',
      sample: '大雪の影響により、新幹線の運行は大幅な遅延を余儀なくされた。',
      nuance: 'Khách quan ép buộc, không có sự lựa chọn khác trong thời sự.',
    },
    {
      pattern: '〜を皮切りに',
      meaning: 'Khởi đầu với một sự kiện, sau đó hàng loạt sự việc tương tự nối tiếp',
      sample: '東京ドーム公演を皮切りに、全国ツアーがスタートした。',
      nuance: 'Mở màn cho một chuỗi hoạt động cùng quy mô.',
    },
    {
      pattern: '〜に至った',
      meaning: 'Đã đi đến kết cục / trạng thái nghiêm trọng',
      sample: '労使交渉が難航し、ついにストライキ決行に至った。',
      nuance: 'Chỉ kết quả diễn biến sau một quá trình gay cấn.',
    },
  ]);

  const handleAddPlus3KakikotobaPatterns = () => {
    const morePatterns = [
      {
        pattern: '〜を踏まえ',
        meaning: 'Dựa trên cơ sở / bối cảnh thực tế đã được xem xét kỹ',
        sample: '前回の反省を踏まえ、新たな危機管理マニュアルを策定した。',
        nuance: 'Quyết định chín chắn sau khi đúc rút kinh nghiệm.',
      },
      {
        pattern: '〜に先立ち',
        meaning: 'Trước thềm / chuẩn bị trước khi sự kiện lớn diễn ra',
        sample: 'サミット開幕に先立ち、外相会談が行われた。',
        nuance: 'Nghi lễ ngoại giao, hành động chuẩn bị trang trọng.',
      },
      {
        pattern: '〜を念頭に置いて',
        meaning: 'Đặt trong tâm trí / lưu ý tới đối tượng hoặc mục tiêu',
        sample: '将来的な海外展開を念頭に置いて、社内公用語を英語化した。',
        nuance: 'Định hướng chiến lược dài hạn.',
      },
    ];
    setExtraKakikotobaList((prev) => [...prev, ...morePatterns]);
    speechService.playSuccessSound();
    showToast('Đã nạp thêm 3 mẫu câu cú pháp Kakikotoba báo chí (+3)!');
  };

  // 5. Thêm +3 Bài báo mẫu tự chọn cho Custom Scanner
  const handleAddPlus3CustomSamples = () => {
    const samples = [
      'トヨタ自動車は、次世代全固体電池を搭載した電気自動車（EV）の実用化に向け、生産ラインの整備を前倒しすると発表した。航続距離の大幅な延伸と充電時間の短縮を実現し、世界市場での競争力を高める狙いがある。',
      '政府は物価高騰対策として、低所得世帯向け給付金の支給と電気・ガス料金の補助再開を閣議決定した。財源の確保や財政規律への影響を巡り、国会審議では与野党の激しい論戦が予想される。',
      '訪日外国人観光客（インバウンド）の消費額が過去最高を更新する一方、京都や富士山など一部の観光地では「オーバーツーリズム（観光公害）」への対策が喫緊の課題となっている。',
    ];
    const nextSample = samples[Math.floor(Math.random() * samples.length)];
    setCustomInputText(nextSample);
    speechService.playSuccessSound();
    showToast('Đã nạp thêm bài báo thời sự thực tế vào ô quét (+3)!');
  };

  // Generate Breaking News by Topic Theme
  const handleGenerateBreakingNews = async (themeKey: string) => {
    setIsGeneratingBreaking(true);
    const themePrompts: Record<string, string> = {
      semiconductor: 'Đột phá bán dẫn AI, nhà máy TSMC Kumamoto và chuỗi cung ứng công nghệ cao tại Nhật Bản',
      nikkei_yen: 'Thị trường tài chính Nikkei, biến động tỷ giá đồng Yên JPY và quyết định lãi suất của Ngân hàng Trung ương BOJ',
      x_trends: 'Xu hướng nổi cộm trên mạng xã hội X Nhật Bản, tiếng lóng giới trẻ Gen Z và hiện tượng xã hội Tokyo',
      tokutei_visa: 'Chính sách Visa Kỹ năng đặc định Tokutei Ginou 2, mở rộng lĩnh vực lao động và bảo hiểm cho người nước ngoài',
    };
    const topicDesc = themePrompts[themeKey] || themePrompts.semiconductor;

    const prompt = `
Bạn là Trưởng ban biên tập thời sự Nhật Bản của nhật báo Nikkei và đài NHK.
Hãy tạo 1 bản tin thời sự thời gian thực mới nhất về chủ đề: "${topicDesc}".
Yêu cầu văn phong chuẩn báo chí Kakikotoba:
1. title: Tiêu đề tiếng Nhật hấp dẫn, chuẩn mực
2. titleVietnamese: Dịch tiêu đề tiếng Việt
3. source: Thuộc nguồn báo uy tín phù hợp (Nikkei, NHK Easy, PR TIMES, Asahi Shimbun, hoặc X (Twitter))
4. publishedAt: "Vừa cập nhật (${new Date().toLocaleTimeString('vi-VN')})"
5. summary: Tóm tắt 1 câu tiếng Việt
6. fullText: Toàn văn tiếng Nhật 3-4 đoạn văn chuẩn báo chí
7. vietnameseTranslation: Bản dịch toàn văn tiếng Việt
8. sentences: Mảng 3-4 câu đối chiếu [{ japanese, vietnamese, tokens: [{ text, ruby, level: "N1"|"N2"|"N3", meaning }] }]
9. vocabularyTags: Mảng 4-6 từ vựng N1-N2 trong bài [{ word, reading, meaning, level: "N1"|"N2" }]
10. grammarNotes: Phân tích 1 mẫu ngữ pháp báo chí tiêu biểu (ví dụ: 〜に伴い, 〜を皮切りに, 〜に至った, 〜模様だ)
11. editorialSummary: { coreTakeaway: string, bulletPoints: [string, string, string], urgencyLevel: "Quan trọng"|"Đời sống"|"Xu hướng" }
12. culturalContextExplanation: { socialBackground: string, specializedTerms: [{ term, reading, meaning, nuance }], historicalOrPolicySignificance: string }
13. quiz: { question: string, options: [string, string, string, string], correctIndex: number, explanation: string }

Chỉ trả về JSON thuần hợp lệ cho 1 object NewsItem duy nhất, không markdown.
`;
    try {
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần NewsItem.');
      const parsed = safeExtractJson<NewsItem | null>(res, null);
      if (parsed && parsed.title && parsed.fullText) {
        const generatedItem: NewsItem = {
          ...parsed,
          id: `breaking_${Date.now()}`,
        };
        setAllNewsItems((prev) => [generatedItem, ...prev]);
        setCurrentIndex(0);
        setActiveSubView('reader');
        speechService.playSuccessSound();
        showToast('Đã phát hành bản tin thời sự thời gian thực thành công!');
        return;
      }
      throw new Error('Fallback extra');
    } catch {
      // Fallback: load an extra news item
      const extra = extraNewsDatabase[Math.floor(Math.random() * extraNewsDatabase.length)];
      if (extra) {
        const cloned: NewsItem = {
          ...extra,
          id: `breaking_fallback_${Date.now()}`,
          publishedAt: 'Vừa cập nhật (Breaking Archive)',
        };
        setAllNewsItems((prev) => [cloned, ...prev]);
        setCurrentIndex(0);
        setActiveSubView('reader');
        speechService.playSuccessSound();
        showToast('Đã nạp bản tin chuyên sâu từ kho lưu trữ thời sự!');
      }
    } finally {
      setIsGeneratingBreaking(false);
    }
  };

  // Custom NLP Article Scanner
  const handleScanCustomArticle = async () => {
    if (!customInputText.trim()) return;
    setIsScanningCustom(true);

    const prompt = `
Bạn là AI Kỹ sư Ngôn ngữ học & Khảo thí JLPT.
Người học dán văn bản báo chí / tin tức tiếng Nhật sau đây:
"""
${customInputText.slice(0, 1500)}
"""

Hãy thực hiện giải phẫu NLP báo chí 4 tầng toàn diện:
1. Gắn Furigana ngữ cảnh chuẩn 100% cho từng câu.
2. Bóc tách toàn bộ từ vựng theo khung JLPT (N1, N2, N3).
3. Tóm tắt điều hành 3 điểm cốt lõi (Bản chất sự kiện - Dư luận/Phản ứng - Tác động tương lai).
4. Sinh 1 câu hỏi Đọc hiểu Dokkai tương tác chuẩn JEES.

Trả về định dạng JSON thuần hợp lệ khớp với NewsItem:
{
  "id": "custom_scan_${Date.now()}",
  "title": "Tiêu đề tiếng Nhật tóm tắt",
  "titleVietnamese": "Tiêu đề tiếng Việt",
  "source": "Trạm Phân Tích Báo Chí Tự Chọn",
  "publishedAt": "Vừa quét (Custom Scan)",
  "summary": "Tóm tắt tiếng Việt 1 dòng",
  "fullText": "Toàn văn bài báo đã dán",
  "vietnameseTranslation": "Bản dịch tiếng Việt dễ hiểu",
  "sentences": [
    {
      "japanese": "câu tiếng Nhật",
      "vietnamese": "câu tiếng Việt",
      "tokens": [{ "text": "漢字", "ruby": "かんじ", "level": "N1", "meaning": "nghĩa" }]
    }
  ],
  "vocabularyTags": [
    { "word": "từ", "reading": "cách đọc", "meaning": "nghĩa", "level": "N1" }
  ],
  "grammarNotes": "Phân tích cấu trúc ngữ pháp câu phức báo chí xuất hiện trong bài",
  "editorialSummary": {
    "coreTakeaway": "Bản chất sự kiện",
    "bulletPoints": ["Điểm 1", "Điểm 2", "Điểm 3"],
    "urgencyLevel": "Quan trọng"
  },
  "culturalContextExplanation": {
    "socialBackground": "Bối cảnh xã hội Nhật",
    "specializedTerms": [],
    "historicalOrPolicySignificance": "Ý nghĩa chính sách"
  },
  "quiz": {
    "question": "Câu hỏi trắc nghiệm đọc hiểu",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "Giải thích vì sao đúng và bóc tách bẫy nhiễu"
  }
}
`;

    try {
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần NewsItem.');
      const parsed = safeExtractJson<NewsItem | null>(res, null);
      if (parsed && parsed.title) {
        setAllNewsItems((prev) => [parsed, ...prev]);
        setCurrentIndex(0);
        setActiveSubView('reader');
        speechService.playSuccessSound();
        showToast('AI đã giải phẫu văn bản tự chọn thành công!');
        return;
      }
      throw new Error('Parse error');
    } catch {
      showToast('Có lỗi khi phân tích văn bản. Vui lòng thử lại với đoạn văn ngắn hơn!');
    } finally {
      setIsScanningCustom(false);
    }
  };

  // Shadowing Microphone & Voice Match Scoring via Web Speech API
  const handleToggleVoiceRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast('Trình duyệt chưa hỗ trợ Web Speech Recognition. Hãy dùng Chrome/Edge!');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
        setSpeechTranscript('');
        setShadowingScore(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpeechTranscript(transcript);

        // Calculate simple string similarity with target sentence
        const targetSentence =
          currentNews?.sentences?.[shadowingSentenceIndex]?.japanese || currentNews.title;
        const cleanTarget = targetSentence.replace(/[、。！？\s]/g, '');
        const cleanTranscript = transcript.replace(/[、。！？\s]/g, '');

        let matchCount = 0;
        for (let i = 0; i < cleanTranscript.length; i++) {
          if (cleanTarget.includes(cleanTranscript[i])) {
            matchCount++;
          }
        }
        const score = Math.min(
          100,
          Math.max(40, Math.round((matchCount / Math.max(cleanTarget.length, cleanTranscript.length)) * 100) + 15)
        );
        setShadowingScore(score);

        if (score >= 80) {
          speechService.playSuccessSound();
        } else {
          speechService.playErrorSound();
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-indigo-400 text-sm font-semibold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-800/40 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
              Chuyên Mục 10 · Đọc Báo Thời Sự & Dokkai JLPT (PH2)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3 flex-wrap">
              Hệ Sinh Thái Báo Chí & Đọc Hiểu Thực Chiến Nhật Bản
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500/20 to-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                Live NLP & Shadowing Studio
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Bao trùm toàn diện thời sự từ <strong className="text-white">X (Twitter Trends)</strong>, <strong className="text-emerald-300">Đài NHK / Kyodo</strong>, <strong className="text-amber-300">Ngũ đại Nhật báo</strong> và báo chí quốc tế. Tích hợp <strong className="text-cyan-300">Phòng Shadowing Phát thanh viên</strong>, <strong className="text-indigo-300">Giải phẫu cú pháp Kakikotoba</strong>, và <strong className="text-rose-300">Máy quét bài báo tự chọn</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center flex-wrap">
            {/* Open Media Directory Button */}
            <button
              onClick={() => setIsMediaDirectoryOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-indigo-300 hover:text-white border border-indigo-700/60 font-semibold text-xs md:text-sm rounded-xl transition-all cursor-pointer shadow-md shrink-0"
              title="Xem danh bạ 7 nhóm nguồn tin tức với hơn 72 cơ quan báo chí chính thống"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Danh Bạ 7 Nhóm Nguồn (72+ Kênh)</span>
            </button>

            {/* Tải Thêm +3 Bản Tin Mới Button */}
            <button
              onClick={handleLoadPlus3News}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-black text-xs md:text-sm rounded-xl transition-all shadow-lg shadow-indigo-900/40 cursor-pointer disabled:opacity-50 shrink-0"
              title="Tải thêm 3 bản tin thời sự mới nhất (+3)"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              <span>{isLoadingMore ? 'Đang Nạp...' : 'Tải Thêm (+3 Bản Tin)'}</span>
            </button>

            {/* 1-Touch Universal Bookmark for current article */}
            <button
              onClick={handleToggleArticleBookmark}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs md:text-sm font-bold transition-all cursor-pointer shadow-md shrink-0 ${
                isArticleBookmarked
                  ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-amber-500/30 font-black'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Ghim bài báo này vào Sổ tay Trí nhớ SRS toàn web"
            >
              {isArticleBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isArticleBookmarked ? 'Đã Ghim SRS' : 'Ghim Sổ Tay SRS'}</span>
            </button>
          </div>
        </div>

        {/* 5 Super-Feature Sub-View Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setActiveSubView('reader')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubView === 'reader'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-300" />
            <span>📰 Đọc Báo Toàn Văn & Song Ngữ</span>
          </button>

          <button
            onClick={() => setActiveSubView('shadowing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubView === 'shadowing'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Mic className="w-4 h-4 text-emerald-400" />
            <span>🎙️ Studio Shadowing Phát Thanh Viên</span>
          </button>

          <button
            onClick={() => setActiveSubView('kakikotoba')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubView === 'kakikotoba'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <GitFork className="w-4 h-4 text-amber-400" />
            <span>🧠 Giải Phẫu Cú Pháp Kakikotoba</span>
          </button>

          <button
            onClick={() => setActiveSubView('breaking_gen')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubView === 'breaking_gen'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Zap className="w-4 h-4 text-rose-400" />
            <span>⚡ Tạo Tin Nóng AI Theo Điểm Nóng</span>
          </button>

          <button
            onClick={() => setActiveSubView('custom_scanner')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubView === 'custom_scanner'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <FileSearch className="w-4 h-4 text-purple-400" />
            <span>🔬 Quét Bài Báo Tự Chọn (Custom Scan)</span>
          </button>
        </div>

        {/* 7 Media Pillars Filter Bar (Visible in Reader mode) */}
        {activeSubView === 'reader' && (
          <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-indigo-400" /> Chọn Trụ Cột Nguồn Tin Báo Chí:
              </span>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Tìm tiêu đề, từ khóa, nguồn..."
                  value={searchNewsKeyword}
                  onChange={(e) => setSearchNewsKeyword(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
                {searchNewsKeyword && (
                  <button
                    onClick={() => setSearchNewsKeyword('')}
                    className="absolute right-2.5 top-2 text-slate-500 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              <button
                onClick={() => setSelectedGroupFilter('all')}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedGroupFilter === 'all'
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                Tất Cả ({allNewsItems.length} Tin)
              </button>

              {ALL_MEDIA_GROUPS.map((grp) => {
                const isSelected = selectedGroupFilter === grp.groupId;
                return (
                  <button
                    key={grp.groupId}
                    onClick={() => setSelectedGroupFilter(grp.groupId)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? `${grp.badgeBg} border-indigo-400 ring-2 ring-indigo-500/40 font-bold shadow-md`
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{grp.flag}</span>
                    <span>{grp.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* SUB-VIEW 1: SHADOWING STUDIO */}
      {activeSubView === 'shadowing' && (
        <div className="bg-slate-900 border border-emerald-800/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-emerald-400" />
                Phòng Luyện Phát Thanh Viên NHK (News Shadowing Studio)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Luyện nhại giọng theo phát thanh viên Tokyo: điều chỉnh tốc độ, bắt nhịp ngắt hơi, và chấm điểm phát âm bằng AI
              </p>
            </div>

            {/* Speed selector */}
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <span className="text-[11px] text-slate-400 px-2 font-mono">Tốc độ:</span>
              {[0.75, 1.0, 1.25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setShadowingSpeed(spd)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    shadowingSpeed === spd
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x {spd === 0.75 ? '(Chậm)' : spd === 1.0 ? '(Chuẩn)' : '(Thách thức)'}
                </button>
              ))}
            </div>
          </div>

          {/* Current Sentence Display for Shadowing */}
          {currentNews.sentences && currentNews.sentences.length > 0 ? (
            <div className="space-y-6">
              {/* Sentence selector bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
                <span>Chọn câu để luyện Shadowing:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddPlus3ShadowingSentences}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                    title="Nạp thêm 3 câu luyện phát thanh viên NHK (+3)"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+3 Câu Luyện Mới</span>
                  </button>
                  <span className="font-mono text-emerald-400">
                    Câu {shadowingSentenceIndex + 1} / {currentNews.sentences.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {currentNews.sentences.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setShadowingSentenceIndex(idx);
                      setShadowingScore(null);
                      setSpeechTranscript('');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      shadowingSentenceIndex === idx
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Câu {idx + 1}
                  </button>
                ))}
              </div>

              {/* Master Sentence Card */}
              {(() => {
                const s = currentNews.sentences[shadowingSentenceIndex];
                return (
                  <div className="p-6 md:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-6">
                    {/* Intonation & Waveform Visualization */}
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <Activity className="w-4 h-4 animate-pulse" /> Sóng Trọng Âm & Điểm Ngắt Nhịp (Intonation Pause):
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">Ký hiệu [/] là điểm lấy hơi</span>
                    </div>

                    {/* Sentence with Intonation Pause symbols */}
                    <div className="text-xl sm:text-2xl font-black font-jp text-white leading-loose tracking-wide">
                      {s.japanese.replace(/、/g, '、 / ').replace(/。/g, '。 // ')}
                    </div>

                    <div className="text-sm font-semibold text-emerald-300 font-sans italic bg-emerald-950/20 p-3 rounded-xl border border-emerald-900/40">
                      👉 {s.vietnamese}
                    </div>

                    {/* Interaction Buttons: Listen Model vs Record Voice */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => speechService.speak(s.japanese, shadowingSpeed)}
                        className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-950 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Nghe Mẫu Phát Thanh Viên ({shadowingSpeed}x)</span>
                      </button>

                      <button
                        onClick={handleToggleVoiceRecording}
                        className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all ${
                          isRecording
                            ? 'bg-rose-600 text-white animate-pulse shadow-rose-950'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950'
                        }`}
                      >
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        <span>{isRecording ? 'Đang Thu Âm (Nói ngay...)' : 'Bấm Mic & Nhại Giọng Lặp Lại'}</span>
                      </button>
                    </div>

                    {/* Speech Recognition Results & Score */}
                    {speechTranscript && (
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 animate-fadeIn">
                        <div className="text-xs text-slate-400 font-medium">Giọng nói bạn vừa phát âm:</div>
                        <div className="text-base font-jp text-slate-100 font-bold">
                          &quot;{speechTranscript}&quot;
                        </div>

                        {shadowingScore !== null && (
                          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-xs text-slate-300 font-semibold">Độ trùng khớp & Ngữ điệu:</span>
                            <span
                              className={`text-lg font-black font-mono px-3 py-1 rounded-xl ${
                                shadowingScore >= 80
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              }`}
                            >
                              {shadowingScore}% - {shadowingScore >= 80 ? 'Chuẩn Phát Thanh Viên!' : 'Khá tốt, hãy ngắt nhịp rõ hơn'}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">Bản tin này chưa chia câu chi tiết.</p>
          )}
        </div>
      )}

      {/* SUB-VIEW 2: KAKIKOTOBA ANATOMY */}
      {activeSubView === 'kakikotoba' && (
        <div className="bg-slate-900 border border-amber-800/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <GitFork className="w-5 h-5 text-amber-400" />
              Giải Phẫu Cú Pháp Kakikotoba & Sơ Đồ Cây Câu Báo Chí
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Bóc tách cấu trúc câu phức 3-5 dòng, giải mã hiện tượng triệt tiêu chủ ngữ (Zero-Anaphora) và liên từ thời sự kinh điển
            </p>
          </div>

          {/* Syntax Tree Diagram */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-amber-900/40 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <GitFork className="w-4 h-4" /> Sơ Đồ Cây Phân Rã Cú Pháp Câu Tiêu Biểu:
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-jp text-sm text-slate-200 leading-relaxed">
              「{currentNews.sentences?.[0]?.japanese || currentNews.title}」
            </div>

            {/* Tree Branch Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                  1. Chủ ngữ ẩn (Zero-Anaphora)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Báo chí Nhật thường triệt tiêu đại từ nhân xưng (Tôi, Chúng tôi, Người dân). Hành động mặc định thuộc về cơ quan hữu quan hoặc diễn biến khách quan của sự kiện.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  2. Danh từ hóa (名詞化)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thay vì dùng câu kết nối dài dòng, báo chí sử dụng thể liên tiến Renyoukei hoặc danh từ hóa liên hoàn để nén thông tin mật độ cao.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  3. Vị ngữ trung tâm (Dự báo / Phỏng đoán)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Văn phong báo chí luôn kết thúc bằng các đuôi khách quan như: <code>〜とみられる</code> (được nhận định là), <code>〜模様だ</code> (có vẻ như), <code>〜に至った</code> (đã đi đến chỗ).
                </p>
              </div>
            </div>
          </div>

          {/* Grammar Notes in Article */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase">
              <Lightbulb className="w-4 h-4 text-amber-400" /> Điểm Sáng Ngữ Pháp Thời Sự Trong Bài:
            </span>
            <p className="text-slate-200 leading-relaxed text-sm">{currentNews.grammarNotes}</p>
          </div>

          {/* Advanced Kakikotoba Pattern Arsenal with +3 Load Button */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-amber-900/40 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold text-amber-300 text-xs uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Kho Mẫu Câu Cú Pháp Báo Chí Kakikotoba ({extraKakikotobaList.length} mẫu):
              </span>
              <button
                onClick={handleAddPlus3KakikotobaPatterns}
                className="px-3 py-1.5 rounded-xl bg-amber-950 border border-amber-700/60 text-amber-300 hover:bg-amber-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                title="Tải thêm 3 mẫu câu cú pháp báo chí Kakikotoba (+3)"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+3 Mẫu Câu Phức Báo Chí</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {extraKakikotobaList.map((item, kIdx) => (
                <div key={kIdx} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-jp font-black text-amber-300 text-sm">{item.pattern}</span>
                    <button
                      onClick={() => speechService.speak(item.sample)}
                      className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                      title="Nghe câu ví dụ"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs font-semibold text-slate-200">👉 {item.meaning}</div>
                  <div className="text-xs font-jp text-slate-300 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
                    {item.sample}
                  </div>
                  <div className="text-[11px] text-amber-200/80 italic">💡 {item.nuance}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: BREAKING NEWS GENERATOR */}
      {activeSubView === 'breaking_gen' && (
        <div className="bg-slate-900 border border-rose-800/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-rose-400" />
                Động Cơ Sinh Bản Tin Thời Sự Nóng Hổi Thời Gian Thực
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Chọn chủ đề trọng điểm để AI tạo ngay bản tin chuẩn tòa soạn Nikkei / NHK kèm song ngữ, từ vựng và câu hỏi Dokkai
              </p>
            </div>
            <button
              onClick={handleLoadPlus3News}
              disabled={isLoadingMore}
              className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs flex items-center gap-1.5 shadow-lg shadow-rose-950 cursor-pointer disabled:opacity-50 shrink-0"
              title="Tạo tức thì 3 bản tin nóng AI thời gian thực (+3)"
            >
              <Plus className="w-4 h-4" />
              <span>{isLoadingMore ? 'Đang Tạo Tin...' : '+3 Bản Tin Nóng AI Tức Thì'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              {
                id: 'semiconductor',
                title: 'Bán Dẫn & Công Nghệ AI',
                jp: '半導体・AI革新',
                desc: 'TSMC Kumamoto, Softbank và chuỗi cung ứng công nghệ cao',
                color: 'border-cyan-500/60 bg-cyan-950/30 text-cyan-200',
              },
              {
                id: 'nikkei_yen',
                title: 'Nikkei & Tỷ Giá Đồng Yên',
                jp: '日経平均・円安動向',
                desc: 'Thị trường chứng khoán Tokyo, chính sách BOJ và giá cả sinh hoạt',
                color: 'border-amber-500/60 bg-amber-950/30 text-amber-200',
              },
              {
                id: 'x_trends',
                title: 'X Trends & Lóng Gen Z',
                jp: '日本のトレンド・若者言葉',
                desc: 'Chủ đề sốt dẻo Netizen Nhật đang tranh luận sôi nổi hôm nay',
                color: 'border-purple-500/60 bg-purple-950/30 text-purple-200',
              },
              {
                id: 'tokutei_visa',
                title: 'Visa Tokutei & Việc Làm',
                jp: '特定技能・在留資格',
                desc: 'Chính sách cư trú dài hạn, bảo hiểm và hỗ trợ nhân lực quốc tế',
                color: 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200',
              },
            ].map((theme) => (
              <div
                key={theme.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${theme.color}`}
              >
                <div>
                  <div className="text-xs font-mono font-bold">{theme.jp}</div>
                  <h3 className="font-black text-white text-base mt-1">{theme.title}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{theme.desc}</p>
                </div>

                <button
                  disabled={isGeneratingBreaking}
                  onClick={() => handleGenerateBreakingNews(theme.id)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isGeneratingBreaking ? 'Đang Tạo Tin...' : 'Sinh Bản Tin Nóng'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: CUSTOM ARTICLE NLP SCANNER */}
      {activeSubView === 'custom_scanner' && (
        <div className="bg-slate-900 border border-purple-800/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-purple-400" />
              Máy Quét Báo Chí Tự Chọn (Custom Article NLP Scanner)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Dán bất kỳ đoạn văn bản tiếng Nhật hoặc bài báo ngoài luồng (Yahoo News, Nikkei, NHK...) để AI gắn Furigana 100%, bôi màu từ vựng và tóm tắt
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
              <span>Dán văn bản tiếng Nhật cần phân tích:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddPlus3CustomSamples}
                  className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-700/60 text-purple-300 hover:bg-purple-900 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                  title="Nạp luân phiên bài báo thời sự thực tế khác nhau (+3)"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+3 Bài Báo Mẫu Tự Chọn</span>
                </button>
                <button
                  onClick={() =>
                    setCustomInputText(
                      '日銀は金融政策決定会合で、政策金利を現行の０・２５％程度から０・５％程度に引き上げることを決定した。利上げは今年３月にマイナス金利政策を解除して以来となる。歴史的な円安に伴う物価高への懸念が強まる中、追加利上げによって為替の安定を図る狙いがある。'
                    )
                  }
                  className="text-purple-400 hover:underline cursor-pointer text-[11px]"
                >
                  Mẫu Nikkei BOJ
                </button>
              </div>
            </div>

            <textarea
              rows={6}
              placeholder="Dán toàn văn bài báo tiếng Nhật vào đây..."
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm font-jp text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 leading-relaxed"
            />

            <button
              disabled={isScanningCustom || !customInputText.trim()}
              onClick={handleScanCustomArticle}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-xl shadow-purple-950 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <FileSearch className={`w-4 h-4 ${isScanningCustom ? 'animate-spin' : ''}`} />
              <span>{isScanningCustom ? 'AI Đang Giải Phẫu NLP Báo Chí...' : 'Bắt Đầu Giải Phẫu & Sinh Đề Dokkai'}</span>
            </button>
          </div>
        </div>
      )}

      {/* SUB-VIEW 0: MAIN ARTICLE VIEWER & DOKKAI ARENA */}
      {activeSubView === 'reader' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Article Viewer (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              {/* Metadata Header */}
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-700/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <Newspaper className="w-3 h-3 text-cyan-400" />
                    {currentNews.source}
                  </span>
                  <span>·</span>
                  <span className="font-mono text-slate-400">{currentNews.publishedAt}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speechService.speak(currentNews.fullText)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-950 border border-indigo-800/60 text-indigo-300 hover:bg-indigo-900 cursor-pointer text-xs transition-colors font-medium"
                    title="Nghe toàn bộ bản tin"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe Toàn Bài</span>
                  </button>
                </div>
              </div>

              {/* Title Block */}
              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-jp text-white leading-relaxed">
                  {showFurigana && currentNews.titleFurigana ? (
                    currentNews.titleFurigana.map((token, idx) => {
                      if (token.ruby) {
                        return (
                          <ruby key={idx} className="font-jp px-0.5 mx-0.5 rounded">
                            {token.text}
                            <rt className="text-[11px] text-indigo-300 font-mono select-none font-normal">
                              {token.ruby}
                            </rt>
                          </ruby>
                        );
                      }
                      return <span key={idx}>{token.text}</span>;
                    })
                  ) : (
                    renderHighlightedPlainText(currentNews.title)
                  )}
                </h2>

                {showVietnamese && (currentNews.titleVietnamese || currentNews.summary) && (
                  <div className="text-sm font-semibold text-emerald-300/95 leading-relaxed bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-xl flex items-start gap-2.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{currentNews.titleVietnamese || currentNews.summary}</span>
                  </div>
                )}

                {/* 3-Bullet Executive Editorial Summary */}
                {currentNews.editorialSummary && (
                  <div className="bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/60 border border-indigo-700/50 rounded-xl p-4 space-y-2.5 shadow-lg shadow-indigo-950/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
                          <Sparkles className="w-4 h-4 text-amber-300" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                          AI Tóm Tắt 3 Điểm Cốt Lõi (Executive Summary)
                        </span>
                      </div>
                      {currentNews.editorialSummary.urgencyLevel && (
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-200 border border-purple-600/50">
                          Mức độ: {currentNews.editorialSummary.urgencyLevel}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                      👉 {currentNews.editorialSummary.coreTakeaway}
                    </p>
                    {currentNews.editorialSummary.bulletPoints && (
                      <div className="space-y-1 pt-1.5 border-t border-slate-800/80">
                        {currentNews.editorialSummary.bulletPoints.map((bp, bIdx) => (
                          <div key={bIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                            <span className="text-indigo-400 font-bold">•</span>
                            <span>{bp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Main Content: Sentence-by-sentence vs Full view */}
              {displayLayout === 'sentence_by_sentence' && currentNews.sentences && currentNews.sentences.length > 0 ? (
                <div className="space-y-3.5">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between flex-wrap gap-2">
                    <span>Bản tin đối chiếu từng câu:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleAddPlus3ShadowingSentences}
                        className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-700/60 text-indigo-300 hover:bg-indigo-900 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                        title="Nạp thêm 3 câu song ngữ đối chiếu mới (+3)"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+3 Câu Song Ngữ Mới</span>
                      </button>
                      <span className="font-mono text-indigo-400">{currentNews.sentences.length} câu</span>
                    </div>
                  </div>

                  {currentNews.sentences.map((sent, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-base md:text-lg font-jp leading-loose text-slate-100 flex-1">
                          {showFurigana && sent.tokens && sent.tokens.length > 0 ? (
                            sent.tokens.map((tok, tIdx) => {
                              const isHighlighted =
                                highlightVocabulary &&
                                tok.level &&
                                (highlightLevelFilter === 'all' || tok.level === highlightLevelFilter);

                              if (tok.ruby) {
                                return (
                                  <ruby
                                    key={tIdx}
                                    onClick={() => {
                                      if (tok.level) {
                                        setActiveWordHover({
                                          word: tok.text,
                                          reading: tok.ruby || '',
                                          meaning: tok.meaning || '',
                                          level: tok.level,
                                        });
                                        speechService.speak(tok.text);
                                      }
                                    }}
                                    className={`font-jp px-1 py-0.5 mx-0.5 rounded transition-colors ${
                                      isHighlighted
                                        ? `${getLevelColor(tok.level!)} cursor-pointer font-bold inline-block`
                                        : ''
                                    }`}
                                  >
                                    {tok.text}
                                    <rt className="text-[11px] text-indigo-300 font-mono select-none font-normal">
                                      {tok.ruby}
                                    </rt>
                                  </ruby>
                                );
                              }
                              return (
                                <span
                                  key={tIdx}
                                  onClick={() => {
                                    if (tok.level) {
                                      setActiveWordHover({
                                        word: tok.text,
                                        reading: tok.ruby || '',
                                        meaning: tok.meaning || '',
                                        level: tok.level,
                                      });
                                      speechService.speak(tok.text);
                                    }
                                  }}
                                  className={
                                    isHighlighted
                                      ? `${getLevelColor(tok.level!)} font-bold px-1 py-0.5 mx-0.5 rounded cursor-pointer`
                                      : ''
                                  }
                                >
                                  {tok.text}
                                </span>
                              );
                            })
                          ) : (
                            renderHighlightedPlainText(sent.japanese)
                          )}
                        </div>

                        <button
                          onClick={() => speechService.speak(sent.japanese)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-indigo-300 shrink-0 cursor-pointer"
                          title="Nghe câu này"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {showVietnamese && (
                        <div className="pt-2 border-t border-slate-900 text-xs md:text-sm text-emerald-200/95 leading-relaxed font-sans italic bg-emerald-950/15 p-2.5 rounded-lg">
                          {sent.vietnamese}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-base md:text-lg font-jp leading-loose text-slate-100 p-5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                    {renderHighlightedPlainText(currentNews.fullText)}
                  </div>
                  {showVietnamese && (
                    <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/30 to-slate-950 border border-emerald-800/40 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        <span>Bản dịch tiếng Việt dễ hiểu toàn bài:</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed font-sans">
                        {currentNews.vietnameseTranslation || currentNews.summary}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Clicked / Hovered Word Detail Quick Sheet with Bookmark */}
              {activeWordHover && (
                <div className="bg-slate-950 border-2 border-indigo-500/70 p-4 rounded-xl text-xs space-y-2 animate-fadeIn shadow-2xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-white text-base md:text-lg font-jp">
                        {activeWordHover.word}
                      </span>
                      <span className="text-indigo-400 font-mono text-sm">
                        ({activeWordHover.reading})
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getLevelBadge(
                          activeWordHover.level
                        )}`}
                      >
                        JLPT {activeWordHover.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speechService.speak(activeWordHover.word)}
                        className="p-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleBookmarkWord(activeWordHover)}
                        className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 cursor-pointer"
                        title="Lưu vào Sổ tay SRS"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setActiveWordHover(null)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-slate-200 text-sm font-medium leading-relaxed">
                    <span className="text-slate-400 text-xs font-normal">Nghĩa tiếng Việt: </span>
                    {activeWordHover.meaning}
                  </div>
                  {onOpenAiSensei && (
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">⚡ Thao trường Dokkai thực chiến:</span>
                      <button
                        onClick={() => onOpenAiSensei(activeWordHover.word, 'vocab_assistant')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Bóc Tách 7 Tầng Bằng AI Sensei</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Core Vocabulary Cloud with +3 Vocab Button */}
              {currentNews.vocabularyTags && currentNews.vocabularyTags.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Từ Vựng Trọng Tâm Báo Chí ({currentNews.vocabularyTags.length} từ):
                    </span>
                    <button
                      onClick={handleAddPlus3Vocabulary}
                      className="px-2.5 py-1 rounded-lg bg-amber-950 border border-amber-700/60 text-amber-300 hover:bg-amber-900 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                      title="Nạp thêm 3 từ vựng N1/N2 chuyên sâu (+3)"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+3 Từ Vựng N1/N2</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentNews.vocabularyTags.map((vt, vIdx) => (
                      <span
                        key={vIdx}
                        onClick={() => {
                          setActiveWordHover(vt);
                          speechService.speak(vt.word);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-semibold cursor-pointer transition-all ${getLevelBadge(
                          vt.level
                        )} hover:scale-105`}
                      >
                        {vt.word} ({vt.reading})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Slider */}
              <div className="flex items-center justify-between text-xs text-slate-400 px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl shadow-md">
                <button
                  onClick={() => setCurrentIndex((prev) => (prev - 1 + filteredNewsList.length) % filteredNewsList.length)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white cursor-pointer transition-colors font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Bản tin trước</span>
                </button>
                <span className="font-mono font-bold text-indigo-300">
                  {currentIndex + 1} / {filteredNewsList.length}
                </span>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % filteredNewsList.length)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white cursor-pointer transition-colors font-medium"
                >
                  <span>Bản tin tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dokkai Quiz & 7 Pillars Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" /> Đấu Trường Dokkai Chuẩn JEES
              </span>
              <button
                onClick={handleLoadPlus3News}
                disabled={isLoadingMore}
                className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-700/60 text-indigo-300 hover:bg-indigo-900 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                title="Tải thêm bản tin và bộ câu hỏi Dokkai mới (+3)"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+3 Đề Dokkai Mới</span>
              </button>
            </div>
            <QuizCard
              quiz={currentNews.quiz}
              title="Đấu trường Đọc hiểu Dokkai chuẩn JEES"
              onNext={() => setCurrentIndex((prev) => (prev + 1) % filteredNewsList.length)}
            />

            {/* 7 Pillars Quick Overview */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-indigo-400" /> 7 Trụ Cột Nguồn Báo Chí Uy Tín:
                </span>
                <button
                  onClick={() => setIsMediaDirectoryOpen(true)}
                  className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Xem danh bạ ↗
                </button>
              </div>
              <div className="space-y-2">
                {ALL_MEDIA_GROUPS.map((grp) => (
                  <div
                    key={grp.groupId}
                    onClick={() => {
                      setSelectedGroupFilter(grp.groupId);
                      speechService.playSuccessSound();
                    }}
                    className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedGroupFilter === grp.groupId
                        ? `${grp.badgeBg} border-indigo-400 font-bold`
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{grp.flag}</span>
                      <span className="text-xs font-semibold">{grp.shortTitle}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {grp.outlets.length} kênh
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DIRECTORY OF 7 REPUTABLE MEDIA GROUPS (72+ CHANNELS) */}
      {isMediaDirectoryOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-slate-900 border border-indigo-800/60 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    Kho Nguồn Báo Chí Uy Tín Toàn Nước Nhật & Việt Nam
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      7 Trụ Cột Chính Thống
                    </span>
                  </h2>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Khám phá và truy cập trực tiếp các cơ quan thông tấn, ngũ đại nhật báo, tạp chí công nghệ & đài truyền hình đối ngoại.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMediaDirectoryOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
              {ALL_MEDIA_GROUPS.map((grp) => (
                <div key={grp.groupId} className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                    <span className="text-xl">{grp.flag}</span>
                    <h3 className="font-bold text-white text-sm sm:text-base">{grp.title}</h3>
                    <span className="text-xs text-slate-400 font-mono ml-auto">
                      {grp.outlets.length} kênh
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {grp.outlets.map((outlet) => (
                      <div
                        key={outlet.id}
                        className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-600/70 transition-all space-y-2 group flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                                {outlet.name}
                              </h4>
                              <div className="text-xs text-indigo-400 font-jp">{outlet.nativeName}</div>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                              {outlet.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">{outlet.description}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-500 truncate max-w-[200px]">
                            {outlet.url.replace('https://', '')}
                          </span>
                          <a
                            href={outlet.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                          >
                            <span>Truy cập trang gốc</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <span className="font-medium">
                Tip: Bạn có thể chọn trực tiếp bài báo của các nguồn này trên thanh lọc trụ cột ngoài màn hình chính!
              </span>
              <button
                onClick={() => setIsMediaDirectoryOpen(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold cursor-pointer"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
