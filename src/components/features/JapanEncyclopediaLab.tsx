import React, { useState, useMemo } from 'react';
import { JLPTLevel } from '../../types';
import {
  EncyclopediaSectionId,
  EncyclopediaTopicItem,
} from '../../types/encyclopedia';
import {
  ENCYCLOPEDIA_SECTIONS_META,
  initialEncyclopediaTopics,
  extraEncyclopediaTopics,
} from '../../data/japanEncyclopediaDatabase';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import {
  MapPin,
  Shield,
  Flower2,
  Utensils,
  Users,
  Sparkles,
  Compass,
  GraduationCap,
  Search,
  Volume2,
  Bookmark,
  CheckCircle2,
  BookOpen,
  Info,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Layers,
  Award,
  Lightbulb,
  Heart,
  HelpCircle,
  X,
  Clock,
  Navigation,
} from 'lucide-react';

interface JapanEncyclopediaLabProps {
  currentLevel?: JLPTLevel;
  initialSectionId?: EncyclopediaSectionId;
}

const SECTION_ICONS: Record<EncyclopediaSectionId, React.ElementType> = {
  geography_admin: MapPin,
  history_politics: Shield,
  tradition_arts: Flower2,
  washoku_cuisine: Utensils,
  society_customs: Users,
  pop_culture: Sparkles,
  travel_practical: Compass,
  lifelong_learning: GraduationCap,
};

export const JapanEncyclopediaLab: React.FC<JapanEncyclopediaLabProps> = ({
  currentLevel = 'N2',
  initialSectionId = 'geography_admin',
}) => {
  const [activeSection, setActiveSection] = useState<EncyclopediaSectionId | 'all'>(initialSectionId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [topicsList, setTopicsList] = useState<EncyclopediaTopicItem[]>(initialEncyclopediaTopics);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialEncyclopediaTopics[0].id);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeTabSubView, setActiveTabSubView] = useState<'explanation' | 'philosophy' | 'practical' | 'vocab'>('explanation');

  // Filter topics by section and search query
  const filteredTopics = useMemo(() => {
    return topicsList.filter((topic) => {
      if (activeSection !== 'all' && topic.sectionId !== activeSection) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = topic.title.toLowerCase().includes(q) || topic.jpTitle.toLowerCase().includes(q);
        const matchesRomaji = topic.romaji.toLowerCase().includes(q);
        const matchesTags = topic.tags.some((t) => t.toLowerCase().includes(q));
        const matchesText = topic.summary.toLowerCase().includes(q) || topic.detailedExplanation.toLowerCase().includes(q);
        return matchesTitle || matchesRomaji || matchesTags || matchesText;
      }
      return true;
    });
  }, [topicsList, activeSection, searchQuery]);

  // Current selected topic
  const activeTopic = useMemo(() => {
    return (
      filteredTopics.find((t) => t.id === selectedTopicId) ||
      filteredTopics[0] ||
      topicsList[0]
    );
  }, [filteredTopics, selectedTopicId, topicsList]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    speechService.playSuccessSound();
  };

  // Handle Load More (+5) Topics
  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      // Find unadded extra topics first
      const unaddedExtras = extraEncyclopediaTopics.filter(
        (ext) => !topicsList.some((t) => t.id === ext.id)
      );

      if (unaddedExtras.length > 0) {
        const nextBatch = unaddedExtras.slice(0, 5);
        setTopicsList((prev) => [...prev, ...nextBatch]);
        if (nextBatch.length > 0) {
          setSelectedTopicId(nextBatch[0].id);
        }
        speechService.playSuccessSound();
        showToast(`Đã nạp thêm ${nextBatch.length} chủ đề bách khoa chuyên sâu mới!`);
        return;
      }

      // If all pre-curated topics are loaded, generate 5 new topics via Gemini
      const prompt = `
Hãy đóng vai một chuyên gia bách khoa toàn thư Nhật Bản (Japan Encyclopedia), hãy biên soạn 5 chủ đề bách khoa mới cực kỳ sâu sắc, chuẩn xác về văn hóa, địa lý hoặc lịch sử Nhật Bản.
Mỗi chủ đề cần có định dạng JSON thuần mảng 5 phần tử EncyclopediaTopicItem:
- id: chuỗi id duy nhất (ví dụ enc_gemini_01)
- sectionId: "geography_admin" | "history_politics" | "tradition_arts" | "washoku_cuisine" | "society_customs" | "pop_culture" | "travel_practical" | "lifelong_learning"
- title: Tiêu đề tiếng Việt
- jpTitle: Tiêu đề tiếng Nhật có Kanji
- romaji: Cách đọc Romaji
- hiragana: Cách đọc Hiragana
- level: "N1" | "N2" | "N3"
- badge: Nhãn ngắn gọn
- summary: Tóm tắt 2 câu
- keyTakeaways: Mảng 4 ý chính
- detailedExplanation: Mục giải thích văn hóa chi tiết hơn (tối thiểu 150 từ)
- culturalPhilosophy: Ý nghĩa triết lý nhân sinh Nhật Bản
- practicalAdvice: Lời khuyên thực tế khi du lịch hoặc làm việc tại Nhật
- vocabularyList: Mảng 4 từ vựng [{ word, reading, meaning, level }]
- quickFact: 1 sự thật thú vị ít người biết
- tags: Mảng 4 thẻ từ khóa
Chỉ trả về JSON thuần mảng 5 phần tử.
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = safeExtractJson<EncyclopediaTopicItem[] | null>(res, null);

      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.filter((it) => it && it.title && it.jpTitle).slice(0, 5);
        if (valid5.length > 0) {
          setTopicsList((prev) => [...prev, ...valid5]);
          setSelectedTopicId(valid5[0].id);
          speechService.playSuccessSound();
          showToast('Đã tạo thành công 5 chủ đề bách khoa chuyên sâu mới!');
          return;
        }
      }
      throw new Error('Fallback duplicate');
    } catch {
      // Fallback: Clone existing items with new IDs
      const cloned = extraEncyclopediaTopics.map((it, idx) => ({
        ...it,
        id: `${it.id}_variant_${Date.now()}_${idx}`,
        title: `${it.title} (Chuyên sâu)`,
      }));
      setTopicsList((prev) => [...prev, ...cloned.slice(0, 5)]);
      speechService.playSuccessSound();
      showToast('Đã nạp thêm 5 chủ đề bách khoa từ kho lưu trữ quốc gia!');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const currentSectionMeta = ENCYCLOPEDIA_SECTIONS_META.find(
    (s) => s.id === activeSection
  ) || ENCYCLOPEDIA_SECTIONS_META[0];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-red-400 text-sm font-semibold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-red-950/70 to-slate-900 border border-red-800/40 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              PH8 · Bách Khoa Toàn Thư Nhật Bản (Japan Encyclopedia)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3 flex-wrap">
              Đại Từ Điển Bách Khoa Toàn Thư Nhật Bản
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono border border-red-500/30">
                8 Trụ Cột Tri Thức · 100% Thuần Nhật
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Cẩm nang bách khoa toàn thư đa chiều bao trùm: <strong className="text-white">Địa lý 8 vùng & 47 tỉnh thành</strong>, <strong className="text-amber-300">Biên niên sử 14 thời kỳ & Samurai</strong>, <strong className="text-rose-300">Thần đạo & Trà đạo</strong>, <strong className="text-orange-300">Ẩm thực Washoku</strong>, <strong className="text-cyan-300">Lễ hội Matsuri</strong>, <strong className="text-fuchsia-300">Pop Culture Anime/Ghibli</strong>, <strong className="text-indigo-300">Cẩm nang Shinkansen</strong> và <strong className="text-purple-300">Triết lý học suốt đời Kaizen - Ikigai</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center flex-wrap">
            <button
              onClick={handleLoadMoreInfinite}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold text-xs md:text-sm rounded-xl transition-all shadow-lg shadow-red-600/30 cursor-pointer disabled:opacity-50 shrink-0"
              title="Tải thêm 5 chủ đề bách khoa chuyên sâu mới (+5)"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              <span>{isLoadingMore ? 'Đang Tải Thêm...' : 'Tải Thêm (+5 Chủ Đề)'}</span>
            </button>
          </div>
        </div>

        {/* 8 Pillar Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-red-400" /> Chọn 1 Trong 8 Trụ Cột Bách Khoa:
            </span>
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Tìm Tokyo, Samurai, Shinto, Kaizen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-red-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {ENCYCLOPEDIA_SECTIONS_META.map((section) => {
              const Icon = SECTION_ICONS[section.id] || BookOpen;
              const isSelected = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    speechService.playSuccessSound();
                  }}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? `${section.colorScheme.activeTab} border-transparent font-bold`
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                  title={section.description}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{section.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Encyclopedia Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Topic Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-red-400" />
                Danh Sách Chủ Đề ({filteredTopics.length}):
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {currentSectionMeta.code}
              </span>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredTopics.map((topic) => {
                const isSelected = topic.id === activeTopic.id;
                const isBookmarked = bookmarkedIds.includes(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopicId(topic.id);
                      speechService.speak(topic.jpTitle);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-950/70 to-slate-900 border-red-500/80 shadow-md ring-1 ring-red-500/40'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-2">
                        {topic.title}
                      </h3>
                      {isBookmarked && (
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0 mt-0.5" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-jp text-red-300/90 truncate">
                      <span>{topic.jpTitle}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400 font-mono">
                        {topic.badge}
                      </span>
                      <span className="text-red-400 font-mono font-semibold">
                        JLPT {topic.level}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Pillar Info Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs space-y-2 shadow-lg">
            <div className="font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>Đặc trưng trụ cột {currentSectionMeta.shortTitle}:</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {currentSectionMeta.description}
            </p>
          </div>
        </div>

        {/* Right Side: Master Topic Article Viewer */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            {/* Header: Title, Kanji, Romaji, Audio & Bookmark */}
            <div className="space-y-3 pb-5 border-b border-slate-800">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-700/60 text-red-300 font-semibold font-mono">
                  {activeTopic.badge} · JLPT {activeTopic.level}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speechService.speak(`${activeTopic.jpTitle}. ${activeTopic.romaji}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950 border border-red-800/60 text-red-200 hover:bg-red-900 text-xs font-semibold cursor-pointer transition-colors"
                    title="Nghe phát âm chuẩn tiếng Nhật"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Phát Âm Chuẩn</span>
                  </button>

                  <button
                    onClick={() => toggleBookmark(activeTopic.id)}
                    className={`p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                      bookmarkedIds.includes(activeTopic.id)
                        ? 'bg-rose-950 border-rose-700 text-rose-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title="Lưu vào danh sách yêu thích"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        bookmarkedIds.includes(activeTopic.id) ? 'fill-rose-400 text-rose-400' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-white leading-snug">
                  {activeTopic.title}
                </h2>
                <div className="mt-2 flex items-center gap-3 text-sm md:text-base font-jp text-red-300 flex-wrap">
                  <span className="font-bold">{activeTopic.jpTitle}</span>
                  <span className="text-slate-400 text-xs font-mono">({activeTopic.hiragana})</span>
                  <span className="text-xs text-slate-500 font-mono italic">[{activeTopic.romaji}]</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                {activeTopic.summary}
              </p>
            </div>

            {/* Core Takeaways Cards */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Các Điểm Cốt Lõi Cần Nhớ (Key Takeaways):
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {activeTopic.keyTakeaways.map((takeaway, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5 text-xs md:text-sm text-slate-200"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-950 border border-red-700 text-red-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="leading-relaxed">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Points (e.g., 8 regions, periods, etc.) */}
            {activeTopic.interactivePoints && activeTopic.interactivePoints.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  Bản Đồ Phân Vùng & Chi Tiết Tương Tác:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeTopic.interactivePoints.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      onClick={() => speechService.speak(pt.label)}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-red-600/70 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-xs text-white group-hover:text-red-300 transition-colors">
                          {pt.label}
                        </span>
                        {pt.tag && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-slate-400 font-mono">
                            {pt.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deep-Dive Sub-Tabs (Detailed Cultural Explanation, Philosophy, Practical, Vocab) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-thin text-xs">
                <button
                  onClick={() => setActiveTabSubView('explanation')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTabSubView === 'explanation'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Mục Giải Thích Văn Hóa Chi Tiết</span>
                </button>

                <button
                  onClick={() => setActiveTabSubView('philosophy')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTabSubView === 'philosophy'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Triết Lý Tâm Hồn</span>
                </button>

                <button
                  onClick={() => setActiveTabSubView('practical')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTabSubView === 'practical'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Lời Khuyên Thực Chiến</span>
                </button>

                <button
                  onClick={() => setActiveTabSubView('vocab')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTabSubView === 'vocab'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Kho Từ Vựng JLPT ({activeTopic.vocabularyList.length})</span>
                </button>
              </div>

              {/* View 1: Detailed Cultural Explanation */}
              {activeTabSubView === 'explanation' && (
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs text-red-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" /> Kiến Thức Bách Khoa Chuyên Sâu:
                    </span>
                    <button
                      onClick={() => speechService.speak(activeTopic.detailedExplanation)}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe đọc tiếng Việt
                    </button>
                  </div>
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                    {activeTopic.detailedExplanation}
                  </p>
                </div>
              )}

              {/* View 2: Cultural Philosophy */}
              {activeTabSubView === 'philosophy' && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 to-slate-950 border border-amber-800/50 space-y-3 animate-fadeIn">
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" /> Triết Lý Nhân Sinh & Tâm Thức Nhật Bản:
                  </div>
                  <p className="text-sm md:text-base text-amber-100/90 leading-relaxed font-sans">
                    {activeTopic.culturalPhilosophy}
                  </p>
                </div>
              )}

              {/* View 3: Practical Advice */}
              {activeTabSubView === 'practical' && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-950 border border-emerald-800/50 space-y-3 animate-fadeIn">
                  <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4" /> Lời Khuyên Thực Chiến Khi Du Lịch / Sống Tại Nhật:
                  </div>
                  <p className="text-sm md:text-base text-emerald-100/90 leading-relaxed font-sans">
                    {activeTopic.practicalAdvice}
                  </p>
                </div>
              )}

              {/* View 4: Vocabulary Bank */}
              {activeTabSubView === 'vocab' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="text-xs text-slate-400 flex items-center justify-between">
                    <span>Nhấp vào từng từ vựng để nghe xướng âm tiếng Nhật chuẩn:</span>
                    <span className="font-mono text-indigo-400">{activeTopic.vocabularyList.length} từ</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeTopic.vocabularyList.map((v, vIdx) => (
                      <div
                        key={vIdx}
                        onClick={() => speechService.speak(v.word)}
                        className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-indigo-500/80 transition-all cursor-pointer space-y-1 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white group-hover:text-indigo-300 font-jp transition-colors">
                            {v.word}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-mono font-bold">
                            {v.level}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-indigo-400">
                          {v.reading}
                        </div>
                        <div className="text-xs text-slate-300 pt-0.5">
                          {v.meaning}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Fact Callout */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-slate-900 to-red-950/40 border border-red-900/50 flex items-start gap-3 text-xs md:text-sm">
              <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 uppercase tracking-wider block text-xs">
                  Sự thật thú vị (Quick Fact):
                </span>
                <p className="text-slate-200 mt-1 leading-relaxed">
                  {activeTopic.quickFact}
                </p>
              </div>
            </div>

            {/* Topic Tags */}
            <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-500 text-[11px]">Từ khóa:</span>
              {activeTopic.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 cursor-pointer text-[11px]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
