import React, { useState, useEffect, useMemo } from 'react';
import {
  DetailedVocabItem,
  CURATED_ON_DEMAND_VOCAB_BANK,
  getSimpleMeaning,
  getRootExpansions,
  RootWordExpansion,
} from '../../data/aiSenseiExamData';
import {
  requestVocabularyOnDemand,
  appendMoreVocabularyOnDemand,
  parseUserVocabPrompt,
  retrieveJapaneseByVietnameseConcept,
  ReverseConceptRetrievalResult,
  enrichDetailedVocabItem,
} from '../../services/aiSenseiService';
import {
  hiraganaToRomaji,
  sentenceHiraganaToRomaji,
  katakanaToHiragana,
  isGenericMetaSentence,
  generateAuthenticWordExamples,
} from '../../data/japaneseMasterDictionary';
import { speechService } from '../../services/speechService';
import { JLPTLevel } from '../../types';
import {
  Search,
  Sparkles,
  Volume2,
  Copy,
  Check,
  Bookmark,
  MessageSquare,
  BookOpen,
  Lightbulb,
  RotateCcw,
  PlusCircle,
  Award,
  Layers,
  X,
  RefreshCw,
  GitBranch,
  ExternalLink,
  Compass,
  AlertTriangle,
  Zap,
  Scale,
} from 'lucide-react';

interface Props {
  currentLevel: JLPTLevel;
  initialTopic?: string;
  initialLookupMode?: 'dual_metaphor' | 'core_meaning' | 'concept_retrieval';
  onOpenChatWithQuery: (query: string) => void;
}

/**
 * Ruby Furigana Component: Renders Japanese Kanji with Hiragana ruby text
 * Support format: Kanji[furigana], e.g., 腹[はら]が 黒[くろ]い
 * Proportioned with small, crisp, beautiful font hierarchy
 */
const RubyFurigana: React.FC<{ furiganaText?: string; fallbackWord: string }> = ({
  furiganaText,
  fallbackWord,
}) => {
  const text = furiganaText || fallbackWord;

  // Split by regex: text with [ruby]
  const regex = /([^\[\]\s]+)\[([^\]]+)\]/g;
  const segments: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push(
        <span key={`txt_${lastIndex}`} className="text-white">
          {text.slice(lastIndex, match.index)}
        </span>
      );
    }
    const kanji = match[1];
    const ruby = match[2];
    segments.push(
      <ruby key={`rb_${match.index}`} className="mx-0.5 inline-flex flex-col items-center">
        <rt className="text-[10px] sm:text-[11px] font-jp font-medium text-purple-300 select-none leading-none mb-0.5 tracking-normal">
          {ruby}
        </rt>
        <span className="text-white leading-tight font-bold font-mincho">{kanji}</span>
      </ruby>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push(
      <span key={`txt_${lastIndex}`} className="text-white font-mincho">
        {text.slice(lastIndex)}
      </span>
    );
  }

  if (segments.length === 0) {
    return <span className="text-white font-mincho">{fallbackWord}</span>;
  }

  return <span className="inline-flex flex-wrap items-baseline gap-0.5">{segments}</span>;
};

export const AiSenseiVocabAssistantTab: React.FC<Props> = ({
  currentLevel,
  initialTopic,
  initialLookupMode,
  onOpenChatWithQuery,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialTopic || '');
  const [lookupMode, setLookupMode] = useState<'dual_metaphor' | 'core_meaning' | 'concept_retrieval'>(
    initialLookupMode || 'dual_metaphor'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('Tất cả bộ phận');
  const [selectedCount, setSelectedCount] = useState<number>(5);
  const [vocabList, setVocabList] = useState<DetailedVocabItem[]>(() =>
    CURATED_ON_DEMAND_VOCAB_BANK.map(enrichDetailedVocabItem)
  );
  const [conceptResult, setConceptResult] = useState<ReverseConceptRetrievalResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string>('Tổng hợp từ vựng chuyên sâu');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('sensei_bookmarked_vocab');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Standard Categories specified by user requirement
  const categories = [
    'Tất cả',
    '⭐ Đã lưu yêu thích',
    'Nghĩa Đen & Nghĩa Bóng',
    'Thành Ngữ Cơ Thể',
    'Giao Tiếp & Ẩn Dụ Đời Sống',
    'Công Sở & Đàm Phán Thương Mại',
    'Đề Thi & Bẫy Từ Vựng JLPT N5–N1',
  ];

  // JLPT Level filters from N5 to N1
  const jlptLevels = [
    { label: 'Tất Cả Cấp Độ (N5–N1)', key: 'ALL' },
    { label: 'JLPT N1 (Bậc Thượng Đỉnh)', key: 'N1' },
    { label: 'JLPT N2', key: 'N2' },
    { label: 'JLPT N3', key: 'N3' },
    { label: 'JLPT N4', key: 'N4' },
    { label: 'JLPT N5', key: 'N5' },
  ];

  // Specific Body Parts sub-filters
  const bodyPartFilters = [
    { label: 'Tất cả bộ phận', key: 'all' },
    { label: 'Bụng (腹)', key: '腹' },
    { label: 'Đầu / Cổ (首)', key: '首' },
    { label: 'Chân (足)', key: '足' },
    { label: 'Mặt (顔)', key: '顔' },
    { label: 'Tay (手)', key: '手' },
    { label: 'Mắt (目)', key: '目' },
    { label: 'Tai (耳)', key: '耳' },
    { label: 'Ngực (胸)', key: '胸' },
    { label: 'Xương (骨)', key: '骨' },
  ];

  // Real-time intent detection for the user input
  const liveIntent = useMemo(() => {
    return parseUserVocabPrompt(searchQuery);
  }, [searchQuery]);

  // Initial trigger if initialTopic or initialLookupMode passed
  useEffect(() => {
    if (initialLookupMode) {
      setLookupMode(initialLookupMode);
      if (initialLookupMode === 'concept_retrieval' && !conceptResult && !initialTopic) {
        handleSearchOrGenerate('Cảm giác áy náy, ngại ngùng khi làm phiền người khác', undefined, 'concept_retrieval');
      }
    }
  }, [initialLookupMode]);

  useEffect(() => {
    if (initialTopic && initialTopic.trim()) {
      setSearchQuery(initialTopic);
      handleSearchOrGenerate(initialTopic, undefined, initialLookupMode);
    }
  }, [initialTopic]);

  const handleSearchOrGenerate = async (
    queryToUse?: string,
    countOverride?: number,
    modeOverride?: 'dual_metaphor' | 'core_meaning' | 'concept_retrieval'
  ) => {
    const rawQ = (queryToUse !== undefined ? queryToUse : searchQuery).trim();
    const count = countOverride || selectedCount;
    const mode = modeOverride || lookupMode;

    setIsLoading(true);
    try {
      if (mode === 'concept_retrieval') {
        const conceptQuery = rawQ || 'Cảm giác áy náy, ngại ngùng khi làm phiền người khác';
        setActiveTopic(`Truy xuất: ${conceptQuery}`);
        const res = await retrieveJapaneseByVietnameseConcept(conceptQuery);
        setConceptResult(res);
        speechService.playSuccessSound();
        return;
      }

      const parsed = parseUserVocabPrompt(rawQ);
      const effectiveTopic = parsed.cleanTopic || (rawQ ? rawQ : 'Tổng hợp từ vựng chuyên sâu');
      setActiveTopic(effectiveTopic);

      // Auto-reset category & level filters on direct search so that search results are visible immediately
      if (rawQ) {
        setSelectedCategory('Tất cả');
        setSelectedBodyPart('Tất cả bộ phận');
        setSelectedLevel('ALL');
      }

      const results = await requestVocabularyOnDemand(rawQ, currentLevel, count, mode);
      setVocabList(results);
      speechService.playSuccessSound();
    } catch (e) {
      console.warn('[AI Sensei Vocab] error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    if (lookupMode === 'concept_retrieval') {
      setConceptResult(null);
      setActiveTopic('Tìm từ vựng tiếng Nhật qua định nghĩa tiếng Việt');
      return;
    }
    setActiveTopic('Tổng hợp từ vựng chuyên sâu');
    setSelectedCategory('Tất cả');
    setSelectedLevel('ALL');
    setSelectedBodyPart('Tất cả bộ phận');
    setVocabList(CURATED_ON_DEMAND_VOCAB_BANK.map(enrichDetailedVocabItem));
    speechService.playSuccessSound();
  };

  const handleLoadMore = async () => {
    if (isLoadingMore || lookupMode === 'concept_retrieval') return;
    setIsLoadingMore(true);
    try {
      const existingWords = vocabList.map((item) => item.word);
      const primaryWord = vocabList[0]?.word || activeTopic || searchQuery;
      const newItems = await appendMoreVocabularyOnDemand(
        primaryWord,
        existingWords,
        currentLevel,
        5,
        lookupMode
      );
      if (newItems.length > 0) {
        setVocabList((prev) => [...prev, ...newItems]);
        speechService.playSuccessSound();
      }
    } catch (e) {
      console.warn('[AI Sensei Vocab] load more error:', e);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleCopy = (item: DetailedVocabItem) => {
    const isCore = lookupMode === 'core_meaning';
    const rootExpansions = getRootExpansions(item);
    const rootExpText =
      rootExpansions.length > 0
        ? `• 3. Trường từ vựng mở rộng từ gốc:\n${rootExpansions
            .map((r) => `  - ${r.word} (${r.reading} - ${r.romaji}) [${r.relationType}]: ${r.meaning}`)
            .join('\n')}`
        : '';
    const anatomyText = item.kanjiAnatomy
      ? `• Giải phẫu Hán tự: ${item.kanjiAnatomy.onKunReadings} | ${item.kanjiAnatomy.radicals} | Chiết tự: ${item.kanjiAnatomy.etymologyMnemonic}`
      : '';
    const synCompText =
      item.synonymComparison && item.synonymComparison.length > 0
        ? `• Đối chiếu đồng nghĩa/đồng âm:\n${item.synonymComparison.map((s) => `  - ${s.term}${s.reading ? ` (${s.reading})` : ''}: ${s.difference}`).join('\n')}`
        : '';

    const textToCopy = isCore
      ? `【${item.word}】(${item.reading} - ${item.romaji}) [${item.hanViet}]${item.pitchAccent ? ` · Pitch: ${item.pitchAccent}` : ''}
• Cấp độ: JLPT ${item.level} · Từ loại: ${item.partOfSpeech}
${anatomyText}
• 1. Nghĩa đơn giản (Tiếng Việt): ${getSimpleMeaning(item)}
• 2. Nghĩa chi tiết (Từ điển chuẩn): ${item.primaryMeaning || item.figurativeMeaning || item.literalMeaning}
${item.meaningPoints ? item.meaningPoints.map((pt) => `  ${pt}`).join('\n') : ''}
${rootExpText}
${synCompText}
• 4. Sắc thái & Ngữ cảnh: ${item.nuanceAndContext}
• 5. Ví dụ 1: ${item.examples[0]?.japanese || ''} (${item.examples[0]?.romaji || sentenceHiraganaToRomaji(item.examples[0]?.reading || '')}) ➔ ${item.examples[0]?.vietnamese || ''}
• 5. Ví dụ 2: ${(item.examples[1] || item.examples[0])?.japanese || ''} (${(item.examples[1] || item.examples[0])?.romaji || sentenceHiraganaToRomaji((item.examples[1] || item.examples[0])?.reading || '')}) ➔ ${(item.examples[1] || item.examples[0])?.vietnamese || ''}
• Cụm từ liên quan: ${item.relatedCollocations.join(', ')}
• Lời bình học thuật GS. Yamato: "${item.senseiExplanation}"
${item.threeSecondTakeaway ? `• ⏳ ${item.threeSecondTakeaway}` : ''}`
      : `【${item.word}】(${item.reading} - ${item.romaji}) [${item.hanViet}]${item.pitchAccent ? ` · Pitch: ${item.pitchAccent}` : ''}
• Cấp độ: JLPT ${item.level} · Từ loại: ${item.partOfSpeech}
${anatomyText}
• 1. Nghĩa đơn giản: ${getSimpleMeaning(item)}
• Furigana: ${item.furigana}
• 2A. Nghĩa đen: ${item.literalMeaning}
• 2B. Nghĩa bóng & Ẩn dụ: ${item.figurativeMeaning}
${rootExpText}
${synCompText}
• 4. Sắc thái & Ngữ cảnh: ${item.nuanceAndContext}
• Ví dụ nghĩa đen: ${item.examples[0]?.japanese || ''} (${item.examples[0]?.romaji || sentenceHiraganaToRomaji(item.examples[0]?.reading || '')}) ➔ ${item.examples[0]?.vietnamese || ''}
• Ví dụ nghĩa bóng: ${(item.examples[1] || item.examples[0])?.japanese || ''} (${(item.examples[1] || item.examples[0])?.romaji || sentenceHiraganaToRomaji((item.examples[1] || item.examples[0])?.reading || '')}) ➔ ${(item.examples[1] || item.examples[0])?.vietnamese || ''}
• Cụm từ liên quan: ${item.relatedCollocations.join(', ')}
• Lời bình học thuật GS. Yamato: "${item.senseiExplanation}"
${item.threeSecondTakeaway ? `• ⏳ ${item.threeSecondTakeaway}` : ''}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleBookmark = (id: string) => {
    const next = new Set(bookmarkedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      speechService.playSuccessSound();
    }
    setBookmarkedIds(next);
    try {
      localStorage.setItem('sensei_bookmarked_vocab', JSON.stringify(Array.from(next)));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSpeak = (text: string) => {
    const clean = text.replace(/\[[^\]]+\]/g, '').replace(/[（()）]/g, '').trim();
    speechService.speak(clean, 1.0);
  };

  // Filter items by category, body parts or bookmarks
  const filteredList = useMemo(() => {
    let list = vocabList;

    if (selectedCategory === '⭐ Đã lưu yêu thích') {
      list = list.filter((item) => bookmarkedIds.has(item.id));
    } else if (selectedCategory === 'Nghĩa Đen & Nghĩa Bóng') {
      list = list.filter((item) => item.category === 'Nghĩa Đen & Nghĩa Bóng');
    } else if (selectedCategory === 'Thành Ngữ Cơ Thể') {
      list = list.filter(
        (item) =>
          item.category === 'Thành Ngữ Cơ Thể' ||
          /[腹首足顔手目耳胸骨]/.test(item.word)
      );
    } else if (selectedCategory === 'Giao Tiếp & Ẩn Dụ Đời Sống') {
      list = list.filter((item) => item.category === 'Giao Tiếp & Ẩn Dụ');
    } else if (selectedCategory === 'Công Sở & Đàm Phán Thương Mại') {
      list = list.filter((item) => item.category === 'Công Sở & Đàm Phán');
    } else if (selectedCategory === 'Đề Thi & Bẫy Từ Vựng JLPT N5–N1') {
      list = list.filter(
        (item) =>
          item.category === 'Đề Thi & Bẫy Từ Vựng' ||
          item.level === 'N1' ||
          item.level === 'N2'
      );
    }

    // Apply sub body part filter if active
    if (selectedBodyPart !== 'Tất cả bộ phận') {
      list = list.filter(
        (item) =>
          item.word.includes(selectedBodyPart) ||
          item.reading.includes(selectedBodyPart)
      );
    }

    // Apply JLPT level filter if active (N5 - N1)
    if (selectedLevel !== 'ALL') {
      list = list.filter((item) => item.level === selectedLevel);
    }

    return list;
  }, [vocabList, selectedCategory, selectedLevel, selectedBodyPart, bookmarkedIds]);

  // Conversational & Analytical Sample Prompts covering all user examples and high-yield N1 items
  const samplePrompts = [
    { label: '⏰ 時計 (Đồng hồ - Nghĩa chung)', query: '時計' },
    { label: '☂️ 傘 (Dù, ô - Nghĩa chung)', query: '傘' },
    { label: '🎒 鞄 (Cặp, túi - Nghĩa chung)', query: '鞄' },
    { label: '🎓 学生 (Sinh viên - Chuẩn JLPT)', query: '学生' },
    { label: '✉️ 手紙 (Lá thư, bức thư - Chuẩn JLPT)', query: '手紙' },
    { label: '👑 N1: 敷居が高い (Bẫy N1 e ngại)', query: '敷居が高い' },
    { label: '👑 N1: 姑息 (Bẫy N1 đối phó tạm bợ)', query: '姑息' },
    { label: '👑 N1: 杞憂 (Kỉ ưu - lo hão)', query: '杞憂' },
    { label: '👑 N1: 捲土重来 (Làm lại mạnh mẽ hơn)', query: '捲土重来' },
    { label: '👑 N1: 眉をひそめる (Nhíu mày bất bình)', query: '眉をひそめる' },
    { label: '👑 N1: 隔靴掻痒 (Giải quyết nửa vời)', query: '隔靴掻痒' },
    { label: '5 từ bẫy đề thi N1', query: 'cho tôi 5 từ vựng về bẫy đề thi JLPT N1' },
    { label: '甘い (Nghĩa bóng Amai)', query: 'nghĩa bóng từ amai' },
    { label: '腹が黒い (Lòng dạ nham hiểm)', query: '腹が黒い' },
    { label: '首にする (Sa thải)', query: '首にする' },
    { label: '重い (Omoi - tình cảm nặng nề)', query: 'nghĩa bóng từ omoi' },
    { label: 'Từ vựng IT & Bug', query: 'từ vựng IT' },
    { label: 'Quán dụng ngữ về mắt (目)', query: 'quán dụng ngữ về mắt' },
    { label: 'Thành ngữ bộ phận cơ thể', query: 'thành ngữ bộ phận cơ thể' },
    { label: '5 từ đàm phán hợp đồng', query: 'cho tôi 5 từ vựng về đàm phán hợp đồng' },
    { label: '5 từ thời tiết giông bão', query: 'cho tôi 5 từ vựng về thời tiết giông bão' },
    { label: '5 từ cảm xúc giấu kín Honne', query: 'cho tôi 5 từ vựng về cảm xúc giấu kín Honne' },
    { label: '5 từ y tế bệnh viện', query: 'cho tôi 5 từ vựng về y tế bệnh viện' },
  ];

  const conceptSamplePrompts = [
    { label: '😓 Áy náy khi làm phiền người khác', query: 'Cảm giác áy náy, ngại ngùng khi làm phiền người khác' },
    { label: '✨ Tinh tế, biết đọc không khí', query: 'Sự tinh tế, biết đọc không khí và quan tâm trước người khác' },
    { label: '🤷 Bó tay hết cách cứu vãn', query: 'Bó tay chịu thua, hết sạch cách xoay xở' },
    { label: '🧠 Vắt óc suy nghĩ giải pháp', query: 'Vắt óc suy nghĩ tìm cách giải quyết vấn đề' },
    { label: '🎭 Thảo mai, sống hai mặt', query: 'Giả tạo, thảo mai, bằng mặt không bằng lòng' },
    { label: '🗣️ Nói quá, làm lố thêm mắm muối', query: 'Làm quá, phóng đại sự việc thêm mắm dặm muối' },
    { label: '🤝 Khách sáo, giữ kẽ xa cách', query: 'Khách sáo, giữ kẽ như người xa lạ' },
    { label: '⏳ Chần chừ do dự không dám bước', query: 'Chần chừ, do dự lưỡng lự chưa dám quyết định' },
    { label: '😢 Hối hận muộn màng đã lỡ', query: 'Hối hận muộn màng khi mọi chuyện đã lỡ rồi' },
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#060a14] p-2 sm:p-3 gap-2.5 lg:gap-3.5 min-h-0 h-full">
      {/* ========================================================
          CỘT TRÁI (1 BÊN TRA CỨU): BẢNG ĐIỀU KHIỂN & BỘ LỌC TOÀN DIỆN
          Thiết kế gọn gàng, bề ngang vừa vặn, không choáng chỗ
          ======================================================== */}
      <div className="w-full lg:w-[290px] xl:w-[320px] shrink-0 flex flex-col space-y-3 bg-slate-900/95 border border-indigo-900/50 rounded-xl p-3 sm:p-3.5 shadow-xl overflow-y-auto scrollbar-thin">
        {/* Header Title & Badge */}
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/80">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center shadow-sm shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Bảng Tra Cứu Từ Vựng</span>
              <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/40 font-semibold">
                AI Sensei
              </span>
            </h4>
            <p className="text-[10px] text-slate-400 truncate">
              5D Từ điển · Nghĩa Đen/Bóng · Nghĩa Việt → Nhật
            </p>
          </div>
        </div>

        {/* PHÂN HỆ: BỘ CHUYỂN 3 CHẾ ĐỘ TRA CỨU */}
        <div className="space-y-1.5 p-2 rounded-xl bg-purple-950/25 border border-purple-800/40">
          <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300 flex items-center justify-between">
            <span>Chế Độ Tra Cứu</span>
            <span className="text-[10px] text-slate-400 font-normal">3 công cụ chuyên sâu</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => {
                setLookupMode('dual_metaphor');
                handleSearchOrGenerate(undefined, undefined, 'dual_metaphor');
              }}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex flex-col items-center text-center gap-0.5 ${
                lookupMode === 'dual_metaphor'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-950'
                  : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-purple-200" />
                <span>Đa Tầng</span>
              </span>
              <span className="text-[10px] opacity-80 font-normal">Đen & Bóng đối chiếu</span>
            </button>

            <button
              onClick={() => {
                setLookupMode('core_meaning');
                handleSearchOrGenerate(undefined, undefined, 'core_meaning');
              }}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex flex-col items-center text-center gap-0.5 ${
                lookupMode === 'core_meaning'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-md shadow-cyan-950'
                  : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-cyan-200" />
                <span>Nghĩa Riêng</span>
              </span>
              <span className="text-[10px] opacity-80 font-normal">Từ điển chuẩn xác</span>
            </button>
          </div>

          <button
            onClick={() => {
              setLookupMode('concept_retrieval');
              if (!conceptResult) {
                const defaultConcept = searchQuery.trim() || 'Cảm giác áy náy, ngại ngùng khi làm phiền người khác';
                if (!searchQuery.trim()) setSearchQuery(defaultConcept);
                handleSearchOrGenerate(defaultConcept, undefined, 'concept_retrieval');
              }
            }}
            className={`w-full px-2.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-between gap-2 ${
              lookupMode === 'concept_retrieval'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-md shadow-emerald-950'
                : 'bg-slate-950 text-emerald-300 hover:text-white hover:bg-slate-800 border border-emerald-800/50'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span>🔍 Tìm Từ Từ Nghĩa Việt</span>
            </span>
            <span className="text-[10px] opacity-85 font-mono">4 Bước Bản Xứ</span>
          </button>
        </div>

        {/* Khung tìm kiếm & Nút Phân Tích */}
        <div className="space-y-1.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchOrGenerate()}
              placeholder={
                lookupMode === 'concept_retrieval'
                  ? 'Mô tả định nghĩa tiếng Việt (vd: áy náy khi làm phiền...)'
                  : 'Gõ chữ Hán, Romaji, amai, 腹が黒い, IT...'
              }
              className="w-full pl-8 pr-8 py-2 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={handleResetSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                title="Xóa trắng"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => handleSearchOrGenerate()}
            disabled={isLoading}
            className={`w-full py-2 px-3 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50 ${
              lookupMode === 'concept_retrieval'
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500'
            }`}
          >
            {isLoading ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin text-purple-200" />
                <span>{lookupMode === 'concept_retrieval' ? 'Đang định vị 4 bước...' : 'Sensei đang phân tích...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                <span>
                  {lookupMode === 'concept_retrieval'
                    ? '🧭 Truy Xuất Từ Bản Xứ 4 Bước'
                    : '⚡ Phân Tích Bằng AI Sensei'}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Live Intent Recognition Badge - ONLY shown when user explicitly asks for generating N vocabulary items */}
        {liveIntent.isVocabRequest && liveIntent.cleanTopic && (
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-purple-950/50 border border-purple-700/60 text-xs text-purple-200 animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div className="min-w-0">
              <span className="font-semibold text-purple-300 block text-[11px]">Sensei nhận diện:</span>
              <span className="text-white text-[11px] block truncate">
                Tạo <strong className="text-amber-300">{liveIntent.count || selectedCount} từ</strong> về{' '}
                <strong className="text-cyan-300">"{liveIntent.cleanTopic}"</strong>
              </span>
            </div>
          </div>
        )}

        {/* Trạng thái tra cứu hiện tại & Nút Xóa bộ lọc */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between px-2.5 py-1 rounded-xl bg-indigo-950/50 border border-indigo-800/40 text-xs">
            <span className="text-slate-300 text-[11px] truncate">
              Đang tra: <strong className="text-cyan-300 font-medium">"{activeTopic}"</strong>
            </span>
            <button
              onClick={handleResetSearch}
              className="text-[11px] text-indigo-300 hover:text-white flex items-center gap-1 shrink-0 ml-1.5 cursor-pointer font-medium"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Xem tất cả</span>
            </button>
          </div>
        )}

        {/* Cấp độ JLPT (N5 - N1) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3 text-emerald-400" />
              <span>Cấp Độ JLPT (N5–N1)</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {filteredList.length} từ
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {jlptLevels.map((lvl) => (
              <button
                key={lvl.key}
                onClick={() => setSelectedLevel(lvl.key)}
                className={`px-1.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${
                  selectedLevel === lvl.key
                    ? lvl.key === 'N1'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-extrabold shadow-sm ring-1 ring-amber-300'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-sm'
                    : lvl.key === 'N1'
                    ? 'bg-slate-950 text-amber-300/90 hover:text-amber-200 hover:bg-slate-800 border border-amber-900/40 font-bold'
                    : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {lvl.key === 'ALL' ? 'Tất cả' : lvl.key === 'N1' ? '👑 N1' : lvl.key}
              </button>
            ))}
          </div>
        </div>

        {/* Chủ đề & Phân loại chính */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3 h-3 text-indigo-400" />
            <span>Chủ Đề Phân Loại</span>
          </span>
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
            {categories.map((cat) => {
              const isSavedTab = cat === '⭐ Đã lưu yêu thích';
              const countLabel = isSavedTab
                ? `(${bookmarkedIds.size})`
                : cat === 'Tất cả'
                ? `(${vocabList.length})`
                : '';

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedBodyPart('Tất cả bộ phận');
                  }}
                  className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-between text-left ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  {countLabel && <span className="opacity-80 font-mono text-[10px] ml-1.5 shrink-0">{countLabel}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-bar: Body Parts Filter (nếu chọn Thành Ngữ Cơ Thể) */}
        {selectedCategory === 'Thành Ngữ Cơ Thể' && (
          <div className="space-y-1 p-2 bg-slate-950/90 border border-slate-800 rounded-xl animate-fadeIn">
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block">
              Bộ phận cơ thể:
            </span>
            <div className="flex flex-wrap gap-1">
              {bodyPartFilters.map((part) => (
                <button
                  key={part.key}
                  onClick={() => setSelectedBodyPart(part.key === 'all' ? 'Tất cả bộ phận' : part.key)}
                  className={`px-1.5 py-0.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
                    (part.key === 'all' && selectedBodyPart === 'Tất cả bộ phận') ||
                    selectedBodyPart === part.key
                      ? 'bg-indigo-600 text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800 bg-slate-900 border border-slate-800'
                  }`}
                >
                  {part.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Số lượng từ muốn tạo */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
            Số Lượng Từ Phân Tích:
          </span>
          <div className="grid grid-cols-4 gap-1">
            {[3, 5, 8, 10].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setSelectedCount(num);
                  if (searchQuery.trim()) {
                    handleSearchOrGenerate(undefined, num);
                  }
                }}
                className={`py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  selectedCount === num
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white bg-slate-950 border border-slate-800'
                }`}
              >
                {num} {num === 5 ? '★' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Từ Khóa Mẫu Gợi Ý */}
        <div className="space-y-1 pt-0.5">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
            {lookupMode === 'concept_retrieval' ? 'Gợi Ý Định Nghĩa Tiếng Việt:' : 'Gợi Ý Tra Nhanh:'}
          </span>
          <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto pr-1 scrollbar-thin">
            {(lookupMode === 'concept_retrieval' ? conceptSamplePrompts : samplePrompts).map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(p.query);
                  handleSearchOrGenerate(p.query);
                }}
                disabled={isLoading}
                className={`px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-300 transition-colors cursor-pointer disabled:opacity-50 text-left ${
                  lookupMode === 'concept_retrieval'
                    ? 'hover:bg-emerald-950/80 hover:border-emerald-600/50 hover:text-emerald-200'
                    : 'hover:bg-purple-950/80 hover:border-purple-600/50 hover:text-purple-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================
          CỘT PHẢI (1 BÊN HIỆN KẾT QUẢ): BÓC TÁCH CHUYÊN SÂU
          ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 sm:p-4 shadow-xl overflow-hidden">
        {/* Results Toolbar / Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Kết quả:</span>
            <span className="text-xs font-bold text-cyan-300 px-2 py-0.5 rounded-lg bg-cyan-950/60 border border-cyan-800/40 truncate max-w-[200px] sm:max-w-xs">
              {activeTopic}
            </span>
            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-semibold">
              {lookupMode === 'concept_retrieval'
                ? `${conceptResult?.recommendedWords?.length || 0} ứng viên`
                : `${filteredList.length} từ`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {/* Quick Mode Toggle in Top Bar */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg">
              <button
                onClick={() => setLookupMode('dual_metaphor')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  lookupMode === 'dual_metaphor'
                    ? 'bg-purple-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Bóc tách cả 2 tầng: Nghĩa đen và Nghĩa bóng"
              >
                <Layers className="w-3 h-3" />
                <span>Nghĩa Đen & Bóng</span>
              </button>
              <button
                onClick={() => setLookupMode('core_meaning')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  lookupMode === 'core_meaning'
                    ? 'bg-cyan-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Tra cứu định nghĩa riêng của từ mà không kèm nghĩa đen nghĩa bóng"
              >
                <BookOpen className="w-3 h-3" />
                <span>Nghĩa Riêng</span>
              </button>
              <button
                onClick={() => {
                  setLookupMode('concept_retrieval');
                  if (!conceptResult) {
                    const defaultConcept = searchQuery.trim() || 'Cảm giác áy náy, ngại ngùng khi làm phiền người khác';
                    handleSearchOrGenerate(defaultConcept, undefined, 'concept_retrieval');
                  }
                }}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  lookupMode === 'concept_retrieval'
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-emerald-300'
                }`}
                title="Tìm từ vựng tiếng Nhật thông qua định nghĩa tiếng Việt theo 4 bước"
              >
                <Compass className="w-3 h-3" />
                <span>Việt → Nhật</span>
              </button>
            </div>

            {selectedLevel !== 'ALL' && lookupMode !== 'concept_retrieval' && (
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-bold font-mono text-[11px]">
                {selectedLevel}
              </span>
            )}
            <button
              onClick={handleResetSearch}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Làm mới lại danh sách"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable list of Cards OR 4-Step Concept Retrieval View */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 sm:pr-1.5 scrollbar-thin">
          {lookupMode === 'concept_retrieval' ? (
            !conceptResult ? (
              <div className="text-center py-12 space-y-3 bg-slate-900/40 border border-emerald-800/40 rounded-xl px-4">
                <Compass className="w-9 h-9 mx-auto text-emerald-400" />
                <div className="text-sm font-bold text-white">
                  Bậc Thầy Truy Xuất Ngôn Ngữ Bản Xứ (Định Nghĩa Tiếng Việt → Tiếng Nhật)
                </div>
                <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                  Nhập một cảm xúc, tình huống hoặc khái niệm tiếng Việt khó diễn đạt (vd: "áy náy khi làm phiền", "tinh tế đọc không khí", "bằng mặt không bằng lòng"). Sensei sẽ truy xuất theo 4 bước: Định vị sắc thái TPO, Giải phẫu Hán tự/Pitch Accent, Collocation bản xứ và Cảnh báo Khác biệt Tư duy!
                </p>
                <button
                  onClick={() => handleSearchOrGenerate('Cảm giác áy náy, ngại ngùng khi làm phiền người khác', undefined, 'concept_retrieval')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-lg"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Thử ngay ví dụ: "Áy náy khi làm phiền"</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 pb-4 animate-fadeIn">
                {/* BƯỚC 4 HIGHLIGHT: CẢNH BÁO KHÁC BIỆT TƯ DUY & TƯƠNG ĐƯƠNG 1-1 */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-950/70 via-slate-900/95 to-rose-950/60 border border-amber-500/60 shadow-lg space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Bước 4 · Cảnh Báo "Khác Biệt Tư Duy" (Chống Tiếng Nhật Bồi)</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        conceptResult.hasExact1to1Equivalent
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50'
                          : 'bg-rose-950/80 text-rose-300 border-rose-600/50'
                      }`}
                    >
                      {conceptResult.hasExact1to1Equivalent
                        ? '✓ Có khái niệm tương đương gần 1-1'
                        : '✕ Không có từ dịch thô 1-1'}
                    </span>
                  </div>
                  {conceptResult.nativeConceptualWayVi && (
                    <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
                      🧭 <strong className="text-amber-300">Cách người Nhật tư duy:</strong> {conceptResult.nativeConceptualWayVi}
                    </p>
                  )}
                  <p className="text-xs text-slate-200 leading-relaxed border-t border-amber-800/40 pt-2">
                    {conceptResult.culturalMindsetWarning}
                  </p>
                </div>

                {/* BƯỚC 1 - 3: TOP 2-3 TỪ VỰNG PHÂN LOẠI SẮC THÁI */}
                <div className="space-y-3">
                  {conceptResult.recommendedWords.map((cw, cwIdx) => {
                    const regColor = cw.registerCategory.includes('Formal')
                      ? 'bg-purple-950/90 text-purple-200 border-purple-500/50'
                      : cw.registerCategory.includes('Casual')
                      ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
                      : cw.registerCategory.includes('Slang')
                      ? 'bg-amber-950/90 text-amber-200 border-amber-500/50'
                      : 'bg-cyan-950/90 text-cyan-200 border-cyan-500/50';

                    return (
                      <div
                        key={cwIdx}
                        className="bg-slate-900/95 border border-emerald-800/50 hover:border-emerald-500/70 rounded-xl p-3.5 sm:p-4 shadow-lg space-y-3 transition-all"
                      >
                        {/* Bước 1: Semantic Pinpointing Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50 font-bold">
                                Ứng viên #{cwIdx + 1}
                              </span>
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${regColor}`}>
                                Bước 1 · {cw.registerCategory}
                              </span>
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                                🎵 Pitch: {cw.pitchAccent}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-baseline gap-2.5 pt-1">
                              <span className="text-xl sm:text-2xl font-bold font-mincho text-white">
                                {cw.word}
                              </span>
                              <span className="text-sm sm:text-base font-jp font-bold text-indigo-300">
                                【{cw.reading}】
                              </span>
                              <span className="text-xs font-mono italic text-purple-300">
                                {cw.romaji}
                              </span>
                              {cw.hanViet && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-200 border border-indigo-700/50 font-bold">
                                  {cw.hanViet}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleSpeak(cw.word)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600/30 text-emerald-400 hover:text-white transition-colors cursor-pointer"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setLookupMode('dual_metaphor');
                                setSearchQuery(cw.word);
                                handleSearchOrGenerate(cw.word, undefined, 'dual_metaphor');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-purple-900/70 hover:bg-purple-800 border border-purple-700/60 text-purple-200 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              title="Chuyển sang thẻ giải phẫu 5 chiều chi tiết"
                            >
                              <Layers className="w-3 h-3" />
                              <span>Phân tích 5 chiều</span>
                            </button>
                            <button
                              onClick={() =>
                                onOpenChatWithQuery(
                                  `Sensei hãy phân tích sâu sắc thái TPO và ví dụ thực chiến của từ 「${cw.word} (${cw.reading})」 cho khái niệm "${conceptResult.vietnameseConcept}"`
                                )
                              }
                              className="px-2.5 py-1 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 border border-indigo-700/60 text-indigo-200 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>Hỏi Sensei</span>
                            </button>
                          </div>
                        </div>

                        {/* Bước 2: Giải phẫu từ vựng cốt lõi */}
                        <div className="p-2.5 rounded-xl bg-slate-950/90 border border-indigo-900/50 space-y-1 text-xs">
                          <div className="font-bold text-indigo-300 uppercase tracking-wider text-[11px]">
                            🔬 Bước 2 · Giải Phẫu Từ Vựng & Bộ Thủ Chiết Tự:
                          </div>
                          {cw.onKunReadings && (
                            <div className="text-slate-300 font-mono text-[11px]">
                              <span className="text-indigo-400 font-semibold">Âm On/Kun:</span> {cw.onKunReadings}
                            </div>
                          )}
                          <div className="text-slate-200 leading-relaxed">
                            {cw.kanjiRadicalBreakdown}
                          </div>
                        </div>

                        {/* Bước 3: Khớp nối Collocation & Câu ví dụ sống động */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          <div className="p-3 rounded-xl bg-slate-950/95 border border-cyan-800/40 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                                🔗 Bước 3A · Collocation Cố Định
                              </span>
                              <button
                                onClick={() => handleSpeak(cw.contextualCollocation.phrase)}
                                className="p-1 rounded bg-slate-800 hover:bg-cyan-900 text-cyan-300 cursor-pointer"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-sm font-bold text-white font-jp">
                              {cw.contextualCollocation.phrase}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {cw.contextualCollocation.reading} · <span className="italic text-purple-300">{cw.contextualCollocation.romaji}</span>
                            </div>
                            <div className="text-xs text-emerald-300 font-medium pt-1 border-t border-slate-800">
                              👉 {cw.contextualCollocation.vietnamese}
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-950/95 border border-emerald-800/40 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                                💬 Bước 3B · Câu Ví Dụ Bản Xứ Sống Động
                              </span>
                              <button
                                onClick={() => handleSpeak(cw.livingExample.japanese)}
                                className="p-1 rounded bg-slate-800 hover:bg-emerald-900 text-emerald-300 cursor-pointer"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-sm font-bold text-white font-jp leading-relaxed">
                              {cw.livingExample.japanese}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {cw.livingExample.reading} · <span className="italic text-purple-300">{cw.livingExample.romaji}</span>
                            </div>
                            <div className="text-xs text-slate-100 font-medium pt-1 border-t border-slate-800">
                              🇻🇳 {cw.livingExample.vietnamese}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Lời khuyên văn hóa của GS. Yamato */}
                {conceptResult.senseiCulturalAdvice && (
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-700/50 text-xs space-y-1">
                    <div className="font-bold text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Đúc Kết Văn Hóa & Giao Tiếp TPO Từ GS. Yamato Kenji:</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed pl-5">
                      {conceptResult.senseiCulturalAdvice}
                    </p>
                  </div>
                )}
              </div>
            )
          ) : filteredList.length === 0 ? (
            <div className="text-center py-12 space-y-2.5 bg-slate-900/40 border border-slate-800 rounded-xl">
              <BookOpen className="w-8 h-8 mx-auto text-slate-600" />
              <div className="text-xs sm:text-sm font-bold text-white">Chưa có kết quả từ vựng phù hợp</div>
              <p className="text-xs text-slate-400 max-w-md mx-auto px-4">
                {selectedCategory === '⭐ Đã lưu yêu thích'
                  ? 'Bạn chưa đánh dấu lưu từ vựng nào. Hãy nhấn biểu tượng bookmark ở góc phải mỗi thẻ từ để lưu vào sổ từ vựng cá nhân!'
                  : 'Hãy gõ từ khóa hoặc câu yêu cầu "cho tôi ... từ vựng về..." và nhấn "⚡ Phân Tích Bằng AI Sensei" để bóc tách cặn kẽ.'}
              </p>
              <button
                onClick={handleResetSearch}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Xem lại toàn bộ kho từ vựng</span>
              </button>
            </div>
          ) : (
            <>
              {filteredList.map((item, index) => {
                const isBookmarked = bookmarkedIds.has(item.id);
                const isCopied = copiedId === item.id;

                return (
                  <div
                    key={item.id}
                    className="bg-slate-900/95 border border-indigo-900/50 hover:border-indigo-600/60 rounded-xl p-3 sm:p-4 shadow-lg transition-all space-y-3 animate-fadeIn"
                  >
                    {/* TẦNG 1: Tự hình, Ký âm, Phiên âm Chuẩn & Meta Badges (Font nhỏ gọn vừa tầm mắt) */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                            #{index + 1}
                          </span>

                          {/* Kanji / Từ gốc (Sắc nét, thanh lịch, phông Mincho chuẩn Nhật) */}
                          <div className="text-lg sm:text-xl md:text-2xl font-bold font-mincho tracking-wide text-white py-0.5">
                            <RubyFurigana furiganaText={item.furigana} fallbackWord={item.word} />
                          </div>

                          {/* Cách đọc Hiragana / Katakana */}
                          <span className="text-sm sm:text-base font-jp text-indigo-300 font-bold">
                            【{item.reading}】
                          </span>

                          {/* Âm Hán Việt */}
                          {item.hanViet && (
                            <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-200 border border-indigo-700/50 font-bold tracking-wide">
                              {item.hanViet}
                            </span>
                          )}

                          {/* Romaji chuẩn Hepburn */}
                          <span className="text-[11px] sm:text-xs font-mono text-purple-300 italic font-medium">
                            {item.romaji}
                          </span>
                        </div>

                        {/* Meta badges: Cấp độ JLPT N5-N1, Từ loại, Pitch Accent, Phân loại */}
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 font-bold font-mono">
                            JLPT {item.level}
                          </span>
                          {item.pitchAccent && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-700/40 font-mono font-semibold">
                              🎵 {item.pitchAccent}
                            </span>
                          )}
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-300 font-medium">{item.partOfSpeech}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-amber-300 font-medium">{item.category}</span>
                        </div>
                      </div>

                      {/* Tiện ích Tương tác: Nghe phát âm, Sao chép, Lưu sổ từ, Hỏi Sensei */}
                      <div className="flex items-center gap-1.5 shrink-0 pt-0.5 sm:pt-0">
                        <button
                          onClick={() => handleSpeak(item.word)}
                          className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-indigo-600/30 text-indigo-400 hover:text-white transition-colors cursor-pointer"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopy(item)}
                          className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title="Sao chép thẻ từ"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleToggleBookmark(item.id)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isBookmarked
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                              : 'bg-slate-800/90 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                          title={isBookmarked ? 'Bỏ lưu yêu thích' : 'Lưu vào sổ từ vựng cá nhân'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                        </button>
                        <button
                          onClick={() =>
                            onOpenChatWithQuery(
                              lookupMode === 'core_meaning'
                                ? `Sensei hãy giải thích cặn kẽ hơn về các nét nghĩa chuyên sâu và bài tập ứng dụng của từ: "${item.word} (${item.reading})"`
                                : `Sensei hãy phân tích cặn kẽ hơn về bẫy thi JLPT, bài tập trắc nghiệm và nguồn gốc của từ: "${item.word} (${item.reading})"`
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 border border-indigo-700/60 text-indigo-200 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                          title="Hỏi sâu hơn trong Chat"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Hỏi Sensei</span>
                        </button>
                      </div>
                    </div>

                    {/* ========================================================
                        TẦNG 1 NGHĨA: HIỂN THỊ "NGHĨA CHUNG (TIẾNG VIỆT)" ĐẦU TIÊN
                        Khung viền ngọc bích Emerald nổi bật, huy hiệu “💡 1. Nghĩa Chung Cô Đọng (Tiếng Việt) · Chuẩn Ngữ Học & Thi Cử”
                        Định dạng siêu cô đọng 1–3 từ, phản ánh nghĩa chung bao quát bản chất gốc
                        ======================================================== */}
                    <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900/95 to-teal-950/90 border-2 border-emerald-500/70 rounded-xl p-3 sm:p-3.5 shadow-lg shadow-emerald-950/40 relative overflow-hidden ring-1 ring-emerald-500/30">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                      
                      {/* Huy hiệu đỉnh cao theo đúng yêu cầu */}
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                          </span>
                          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-300">
                            💡 1. Nghĩa Đơn Giản (Tiếng Việt) · Cô đọng nhất
                          </span>
                        </div>
                        <span className="text-[10px] bg-emerald-900/80 border border-emerald-500/50 text-emerald-200 px-2 py-0.5 rounded-full font-semibold shrink-0">
                          Siêu cô đọng 1–3 từ
                        </span>
                      </div>

                      {/* Nghĩa cô đọng nhất trực diện nắm bắt bản chất chỉ trong 3 giây */}
                      <div className="text-xl font-black text-emerald-200 leading-snug tracking-wide drop-shadow">
                        {getSimpleMeaning(item)}
                      </div>

                      {/* Nghĩa tiếng Việt mở rộng/bổ sung giải thích phạm vi bao hàm */}
                      {item.primaryMeaning && item.primaryMeaning.trim() !== getSimpleMeaning(item).trim() && (
                        <div className="text-xs text-emerald-300/90 mt-1.5 pt-1.5 border-t border-emerald-800/40 flex items-start gap-1 font-sans">
                          <span className="text-emerald-400 font-semibold shrink-0">↳ Mở rộng chi tiết:</span>
                          <span className="text-slate-300 leading-relaxed font-normal">{item.primaryMeaning}</span>
                        </div>
                      )}
                    </div>

                    {/* BÁCH KHOA HÁN TỰ 5 CHIỀU: BỘ THỦ, ÂM ON/KUN & CHIẾT TỰ */}
                    {item.kanjiAnatomy && (
                      <div className="bg-slate-950/85 border border-indigo-800/40 rounded-xl p-2.5 sm:p-3 space-y-1.5 text-xs">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                          <span>🔬 Giải Phẫu Hán Tự: Âm On/Kun · Bộ Thủ · Chiết Tự</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                          <div className="bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono">
                            <span className="text-cyan-400 font-bold">On/Kun: </span>
                            {item.kanjiAnatomy.onKunReadings}
                          </div>
                          <div className="bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200">
                            <span className="text-purple-400 font-bold">Bộ thủ: </span>
                            {item.kanjiAnatomy.radicals}
                          </div>
                        </div>
                        <div className="text-[11px] text-amber-100/90 pl-1">
                          <span className="text-amber-400 font-bold">Mẹo chiết tự: </span>
                          {item.kanjiAnatomy.etymologyMnemonic}
                        </div>
                      </div>
                    )}

                    {/* ========================================================
                        TẦNG 2: PHÂN BIỆT RÕ RÀNG 2 CHẾ ĐỘ HIỂN THỊ THEO YÊU CẦU:
                        1. CHẾ ĐỘ NGHĨA RIÊNG CỐT LÕI (Từ điển chuẩn, KHÔNG đi kèm nghĩa đen/bóng)
                        2. CHẾ ĐỘ ĐA TẦNG (Nghĩa Đen vs Nghĩa Bóng đối chiếu)
                        ======================================================== */}
                    {lookupMode === 'core_meaning' ? (
                      /* CHẾ ĐỘ 1: TRA NGHĨA RIÊNG CỐT LÕI (Từ điển chuẩn Koujien / Daijirin) */
                      <div className="bg-slate-950/90 border border-cyan-800/40 rounded-xl p-2.5 sm:p-3 space-y-2 shadow-inner">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                              📖 2. Nghĩa Chi Tiết & Ngữ Cảnh Ứng Dụng
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Từ điển chuẩn Koujien
                          </span>
                        </div>

                        {/* Định nghĩa chi tiết chính */}
                        <p className="text-xs sm:text-sm text-cyan-50 leading-relaxed font-sans font-medium">
                          {item.primaryMeaning || item.figurativeMeaning || item.literalMeaning}
                        </p>

                        {/* Các nét nghĩa chi tiết bóc tách nếu có */}
                        {item.meaningPoints && item.meaningPoints.length > 0 && (
                          <div className="pt-2 space-y-1.5 border-t border-slate-800/80">
                            <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
                              Các nét nghĩa bóc tách chuyên sâu:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {item.meaningPoints.map((pt, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="text-xs text-slate-200 bg-slate-900/90 border border-slate-800/80 px-2.5 py-1.5 rounded-lg flex items-start gap-1.5 hover:border-cyan-700/50 transition-colors"
                                >
                                  <span className="text-cyan-400 font-mono text-[11px] shrink-0 font-bold">•</span>
                                  <span className="leading-snug">{pt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* CHẾ ĐỘ 2: ĐA TẦNG ĐỐI CHIẾU NGHĨA ĐEN & NGHĨA BÓNG */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
                        {/* Nghĩa Đen (Literal Meaning) */}
                        <div className="bg-slate-950/90 border border-cyan-800/40 rounded-xl p-2.5 sm:p-3 space-y-1 shadow-inner">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                              🔹 2A. Nghĩa Đen (Literal Meaning)
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
                            {item.literalMeaning || 'Nghĩa biểu vật cơ học nguyên bản.'}
                          </p>
                        </div>

                        {/* Nghĩa Bóng / Ẩn Dụ (Figurative / Metaphor) */}
                        <div className="bg-slate-950/90 border border-amber-800/40 rounded-xl p-2.5 sm:p-3 space-y-1 shadow-inner">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                              🔸 2B. Nghĩa Bóng & Ẩn Dụ (Figurative)
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-sans font-medium">
                            {item.figurativeMeaning || 'Nghĩa chuyển hóa sâu sắc trong đời sống.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ========================================================
                        TẦNG 3: MỞ RỘNG TRƯỜNG TỪ VỰNG CÓ GỐC CÁC TỪ ẤY LIÊN QUAN VÀO (ÁP DỤNG MỌI CẤP ĐỘ N5–N1)
                        Trường từ vựng mở rộng: Họ từ ghép, từ phái sinh, quán dụng ngữ có gốc căn tố / chữ Hán
                        ======================================================== */}
                    {(() => {
                      const rootExpansions = getRootExpansions(item);
                      if (!rootExpansions || rootExpansions.length === 0) return null;

                      return (
                        <div className="bg-gradient-to-r from-purple-950/40 via-slate-950/80 to-indigo-950/40 border border-purple-800/40 rounded-xl p-3 sm:p-3.5 space-y-2.5 shadow-md shadow-purple-950/20">
                          {/* Header Mở Rộng Trường Từ Vựng Gốc */}
                          <div className="flex items-center justify-between flex-wrap gap-1.5 pb-1.5 border-b border-purple-900/40">
                            <div className="flex items-center gap-1.5">
                              <GitBranch className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-purple-300">
                                🌳 3. Mở Rộng Trường Từ Vựng Cùng Gốc
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-purple-300/80 font-mono">
                                Gốc từ: <strong className="text-white font-jp">{item.word}</strong>
                              </span>
                              <span className="text-[10px] bg-purple-950/80 text-purple-200 border border-purple-700/50 px-2 py-0.5 rounded-full font-bold">
                                {rootExpansions.length} từ mở rộng
                              </span>
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-300 font-medium leading-relaxed">
                            Mạng lưới từ vựng phát triển từ gốc căn tố / chữ Hán của từ:
                          </div>

                          {/* Grid Danh Sách Từ Mở Rộng Cùng Gốc */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {rootExpansions.map((rw, rIdx) => {
                              const badgeStyle =
                                rw.relationType === 'Từ ghép'
                                  ? 'bg-cyan-950/90 text-cyan-300 border-cyan-700/50'
                                  : rw.relationType === 'Phái sinh'
                                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700/50'
                                  : rw.relationType === 'Nghĩa bóng'
                                  ? 'bg-amber-950/90 text-amber-300 border-amber-700/50'
                                  : rw.relationType === 'Thành ngữ'
                                  ? 'bg-rose-950/90 text-rose-300 border-rose-700/50'
                                  : 'bg-purple-950/90 text-purple-300 border-purple-700/50';

                              return (
                                <div
                                  key={rIdx}
                                  className="bg-slate-900/80 border border-slate-800 hover:border-purple-600/60 rounded-xl p-2.5 flex flex-col justify-between transition-all hover:shadow-md hover:shadow-purple-950/30 group"
                                >
                                  <div>
                                    {/* Tag & Action Buttons */}
                                    <div className="flex items-center justify-between mb-1.5 gap-1">
                                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${badgeStyle}`}>
                                        {rw.relationType || 'Cùng gốc'}
                                      </span>

                                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                        <button
                                          onClick={() => handleSpeak(rw.word)}
                                          className="p-1 rounded bg-slate-800 hover:bg-purple-900 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                          title={`Nghe phát âm: ${rw.word}`}
                                        >
                                          <Volume2 className="w-3 h-3 text-purple-300" />
                                        </button>
                                        <button
                                          onClick={() => {
                                            setSearchQuery(rw.word);
                                            handleSearchOrGenerate(rw.word);
                                          }}
                                          className="p-1 rounded bg-slate-800 hover:bg-cyan-900 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                          title={`Tra cứu sâu từ: ${rw.word}`}
                                        >
                                          <Search className="w-3 h-3 text-cyan-300" />
                                        </button>
                                        <button
                                          onClick={() => onOpenChatWithQuery(`Sensei ơi, hãy phân tích chuyên sâu cho em từ vựng "${rw.word}" (${rw.reading} - nghĩa: ${rw.meaning}) phát triển từ gốc "${item.word}" nhé!`)}
                                          className="p-1 rounded bg-slate-800 hover:bg-indigo-900 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                          title="Hỏi Sensei về từ này"
                                        >
                                          <MessageSquare className="w-3 h-3 text-indigo-300" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Japanese Word & Reading */}
                                    <div className="text-sm font-bold text-white font-jp mb-0.5">
                                      <RubyFurigana furiganaText={rw.furigana} fallbackWord={rw.word} />
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-mono">
                                      {rw.reading} · <span className="italic text-purple-300">{rw.romaji}</span>
                                    </div>
                                  </div>

                                  {/* Vietnamese Meaning */}
                                  <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-[11px] text-slate-200 font-sans font-medium leading-snug">
                                    👉 <span className="text-emerald-300 font-semibold">{rw.meaning}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}

                    {/* TẦNG 4: Sắc thái Văn hóa & Ngữ cảnh Sử dụng (Nuance & Register) */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5 text-xs text-slate-200 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-indigo-300 text-xs">
                        <Lightbulb className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>4. Sắc thái văn hóa & Ngữ cảnh sử dụng:</span>
                      </div>
                      <p className="leading-relaxed text-slate-300 pl-5 text-xs">
                        {item.nuanceAndContext}
                      </p>
                    </div>

                    {/* TẦNG 5: Ví Dụ Minh Họa (Có nút Audio chuẩn, Romaji và Tiếng Việt) */}
                    {item.examples && item.examples.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                            <span>5. Cặp ví dụ minh họa đối chiếu Nghĩa Đen & Nghĩa Bóng:</span>
                          </div>
                          <span className="text-[10px] text-emerald-300/90 font-mono bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full font-semibold">
                            🛡️ Bộ Lọc Ngữ Cảnh Bản Xứ · 0% Chắp Vá
                          </span>
                        </div>

                        <div className={`grid gap-2.5 ${lookupMode === 'core_meaning' && item.examples.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                          {item.examples.slice(0, 2).map((ex, exIdx) => {
                            const isMetaVn = isGenericMetaSentence(ex.vietnamese);
                            const isMetaJp = isGenericMetaSentence(ex.japanese);
                            const safeJp = (ex.japanese || '').trim();
                            const safeReading = (ex.reading || '').trim();
                            const safeRomaji = (ex.romaji || '').trim();

                            // Ensure the example actually contains the keyword being studied
                            const wordStem = item.word.length > 1 ? item.word.slice(0, item.word.length - 1) : item.word;
                            const containsKeyword =
                              !item.word ||
                              item.word === '単語' ||
                              Boolean(
                                safeJp &&
                                  (safeJp.includes(item.word) ||
                                    (item.reading && safeJp.includes(item.reading)) ||
                                    safeJp.includes(wordStem))
                              );

                            // Check if Romaji is corrupted (contains Kanji, is empty, is just 1-2 words for a long sentence, or equals parent word)
                            const parentRom = (item.romaji || hiraganaToRomaji(katakanaToHiragana(item.reading || ''))).toLowerCase();
                            const isRomajiBad =
                              !safeRomaji ||
                              /[\u4e00-\u9faf]/.test(safeRomaji) ||
                              (safeJp.length > 8 && safeRomaji.split(/\s+/).length <= 2) ||
                              (parentRom && safeRomaji.toLowerCase() === parentRom);

                            // Check if reading is corrupted (contains Kanji, is empty, is just 1 word for a long sentence, or equals parent reading)
                            const isReadingBad =
                              !safeReading ||
                              /[\u4e00-\u9faf]/.test(safeReading) ||
                              (safeJp.length > 8 && safeReading.length <= 4) ||
                              (item.reading && safeReading === item.reading);

                            let finalJp = safeJp;
                            let finalReading = safeReading;
                            let finalRomaji = safeRomaji;
                            let finalVn = ex.vietnamese;

                            if (isMetaVn || isMetaJp || !finalVn || !finalJp || !containsKeyword || (isRomajiBad && isReadingBad)) {
                              const authentic = generateAuthenticWordExamples(item.word, item.reading, getSimpleMeaning(item), item.partOfSpeech);
                              const fallback = authentic[exIdx] || authentic[0];
                              finalJp = fallback.japanese;
                              finalReading = fallback.reading;
                              finalRomaji = fallback.romaji;
                              finalVn = fallback.vietnamese;
                            } else if (isRomajiBad && !isReadingBad) {
                              finalRomaji = sentenceHiraganaToRomaji(finalReading);
                            }

                            // Strict Literal vs Figurative Badge
                            const isLiteral = ex.type === 'literal' || exIdx === 0;
                            const badgeLabel = isLiteral
                              ? 'Ví dụ nghĩa đen (Literal)'
                              : 'Ví dụ nghĩa bóng & Ẩn dụ (Figurative)';

                            return (
                              <div
                                key={exIdx}
                                className="bg-slate-950/95 border border-slate-800/90 hover:border-indigo-600/50 rounded-xl p-3 sm:p-3.5 space-y-2 flex flex-col justify-between shadow-sm transition-all"
                              >
                                <div className="space-y-1.5">
                                  {/* Badge & Audio button */}
                                  <div className="flex items-center justify-between text-xs">
                                    <span
                                      className={`font-semibold px-2 py-0.5 rounded-md text-[10px] tracking-wide ${
                                        isLiteral
                                          ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-800/60'
                                          : 'bg-amber-950/90 text-amber-300 border border-amber-800/60'
                                      }`}
                                    >
                                      {badgeLabel}
                                    </span>
                                    <button
                                      onClick={() => handleSpeak(finalJp)}
                                      className="px-2.5 py-1 rounded-lg bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-800/50 text-indigo-200 hover:text-white flex items-center gap-1.5 text-[11px] cursor-pointer transition-colors"
                                      title="Nghe phát âm chuẩn câu ví dụ"
                                    >
                                      <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                                      <span>Nghe câu</span>
                                    </button>
                                  </div>

                                  {/* Japanese sentence */}
                                  <div className="text-sm sm:text-base font-bold text-white font-jp leading-relaxed pt-0.5">
                                    {finalJp}
                                  </div>

                                  {/* Hiragana reading line (if distinct from Kanji text) */}
                                  {finalReading && finalReading !== finalJp && (
                                    <div className="text-[11px] text-slate-400 font-mono leading-tight">
                                      <span className="text-slate-400 font-semibold">Kana:</span> {finalReading}
                                    </div>
                                  )}

                                  {/* Romaji block */}
                                  <div className="text-[11px] sm:text-xs text-purple-200 font-mono bg-purple-950/35 border border-purple-800/40 px-2.5 py-1.5 rounded-lg flex items-baseline gap-1.5">
                                    <span className="text-[10px] uppercase font-bold text-purple-400 shrink-0 tracking-wider">🔤 Romaji:</span>
                                    <span className="italic font-medium">{finalRomaji}</span>
                                  </div>
                                </div>

                                {/* Vietnamese meaning block */}
                                <div className="text-xs sm:text-sm text-emerald-200 font-sans leading-relaxed pt-2 border-t border-slate-800/80 font-medium flex items-start gap-1.5">
                                  <span className="text-emerald-400 font-bold shrink-0">🇻🇳 Dịch nghĩa:</span>
                                  <span className="text-slate-100">{finalVn}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* TẦNG 6: Cụm Từ Liên Quan, Quán Dụng Ngữ (Collocations), Synonyms & Antonyms */}
                    <div className="space-y-1.5 pt-0.5">
                      {item.relatedCollocations && item.relatedCollocations.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="text-[11px] font-semibold text-slate-400">
                            6. Quán dụng ngữ liên quan:
                          </span>
                          {item.relatedCollocations.map((col, cIdx) => (
                            <span
                              key={cIdx}
                              onClick={() => handleSpeak(col.split('(')[0].trim())}
                              className="px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-jp cursor-pointer transition-colors text-xs font-medium"
                              title="Bấm để nghe phát âm"
                            >
                              {col}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Đồng nghĩa & Trái nghĩa nếu có */}
                      {((item.synonyms && item.synonyms.length > 0) ||
                        (item.antonyms && item.antonyms.length > 0)) && (
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-0.5">
                          {item.synonyms && item.synonyms.length > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] text-emerald-400 font-semibold">Đồng nghĩa:</span>
                              {item.synonyms.map((syn, sIdx) => (
                                <span
                                  key={sIdx}
                                  onClick={() => handleSpeak(syn.split('(')[0].trim())}
                                  className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 text-[11px] font-jp cursor-pointer hover:bg-emerald-900/80"
                                  title="Bấm để nghe phát âm"
                                >
                                  {syn}
                                </span>
                              ))}
                            </div>
                          )}
                          {item.antonyms && item.antonyms.length > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] text-rose-400 font-semibold">Trái nghĩa:</span>
                              {item.antonyms.map((ant, aIdx) => (
                                <span
                                  key={aIdx}
                                  onClick={() => handleSpeak(ant.split('(')[0].trim())}
                                  className="px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40 text-[11px] font-jp cursor-pointer hover:bg-rose-900/80"
                                  title="Bấm để nghe phát âm"
                                >
                                  {ant}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* BẢNG ĐỐI CHIẾU TỪ ĐỒNG NGHĨA / ĐỒNG ÂM DỄ NHẦM LẪN */}
                    {item.synonymComparison && item.synonymComparison.length > 0 && (
                      <div className="bg-slate-950/80 border border-amber-800/40 rounded-xl p-2.5 sm:p-3 space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px] uppercase tracking-wider">
                          <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Bảng Đối Chiếu Từ Đồng Nghĩa / Đồng Âm Dễ Nhầm Lẫn:</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.synonymComparison.map((sc, scIdx) => (
                            <div
                              key={scIdx}
                              className="bg-slate-900/90 border border-slate-800 rounded-lg p-2 space-y-0.5"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-white font-jp">
                                  {sc.term} {sc.reading ? <span className="text-indigo-300 font-normal">({sc.reading})</span> : null}
                                </span>
                                <button
                                  onClick={() => handleSpeak(sc.term)}
                                  className="p-0.5 rounded text-slate-400 hover:text-white cursor-pointer"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="text-[11px] text-slate-300 leading-snug">{sc.difference}</div>
                              {sc.example && (
                                <div className="text-[10px] text-emerald-300/90 font-jp pt-0.5">{sc.example}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TẦNG 7: Lời Bình Học Thuật Của GS. Yamato & Mẹo Phản Xạ 3 Giây */}
                    {(item.senseiExplanation || item.threeSecondTakeaway) && (
                      <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs space-y-2">
                        {item.senseiExplanation && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-purple-300 text-xs">
                              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span>7. Lời Bình Học Thuật Của GS. Yamato (Academic Takeaway):</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed pl-5 font-sans text-xs">
                              "{item.senseiExplanation}"
                            </p>
                          </div>
                        )}
                        {item.threeSecondTakeaway && (
                          <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-700/40 text-amber-200 text-[11px] flex items-start gap-1.5 font-medium">
                            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{item.threeSecondTakeaway}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Infinite Loader: Tải thêm 5 từ nữa */}
              <div className="pt-1 pb-4 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-purple-950/60 border border-purple-800/40 hover:border-purple-600 text-purple-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isLoadingMore ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin text-purple-300" />
                      <span>Sensei đang tải thêm 5 từ mới...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-3.5 h-3.5 text-purple-300" />
                      <span>+ Tải thêm 5 từ nữa về "{activeTopic}"</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
