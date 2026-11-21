import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { KisetsukanItem } from '../../types/cultural';
import { initialKisetsukanList, extraKisetsukanList } from '../../data/culturalLearningDatabase';
import { speechService } from '../../services/speechService';
import {
  Sparkles,
  Volume2,
  Calendar,
  CloudSun,
  Flame,
  Wind,
  Snowflake,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Plus,
  RotateCcw,
  Search,
  Award,
  Layers,
  HelpCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const KisetsukanMatsuriLab: React.FC<Props> = ({ currentLevel }) => {
  const [list, setList] = useState<KisetsukanItem[]>(initialKisetsukanList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  // Filter list
  const filteredList = list.filter((item) => {
    const matchSeason = selectedSeason === 'all' || item.season.includes(selectedSeason);
    const q = searchQuery.toLowerCase();
    const matchSearch =
      item.term.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.sinoVietnamese.toLowerCase().includes(q) ||
      item.aestheticCategory.toLowerCase().includes(q);
    return matchSeason && matchSearch;
  });

  const currentItem = filteredList[currentIndex] || list[0];

  // Load more 5 items
  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraKisetsukanList.map((item, idx) => ({
        ...item,
        id: `ks_extra_${Date.now()}_${idx}`,
      }));
      setList((prev) => [...prev, ...nextBatch]);
      setExtraLoadedCount((prev) => prev + 5);
      setIsLoadingMore(false);
      speechService.playSuccessSound();
    }, 400);
  };

  const getSeasonIcon = (season: KisetsukanItem['season']) => {
    if (season.includes('Xuân')) return <CloudSun className="w-4 h-4 text-pink-400" />;
    if (season.includes('Hạ')) return <Flame className="w-4 h-4 text-amber-400" />;
    if (season.includes('Thu')) return <Wind className="w-4 h-4 text-orange-400" />;
    if (season.includes('Đông')) return <Snowflake className="w-4 h-4 text-cyan-400" />;
    return <Calendar className="w-4 h-4 text-emerald-400" />;
  };

  const getSeasonColor = (season: KisetsukanItem['season']) => {
    if (season.includes('Xuân')) return 'from-pink-950/30 border-pink-500/30 text-pink-300';
    if (season.includes('Hạ')) return 'from-amber-950/30 border-amber-500/30 text-amber-300';
    if (season.includes('Thu')) return 'from-orange-950/30 border-orange-500/30 text-orange-300';
    if (season.includes('Đông')) return 'from-cyan-950/30 border-cyan-500/30 text-cyan-300';
    return 'from-emerald-950/30 border-emerald-500/30 text-emerald-300';
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Tính năng Văn hóa 2/5
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} từ vựng & nghi thức 4 mùa
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Ngôn Ngữ 4 Mùa & Mỹ Học Tự Nhiên (季節感 & 祭り)</span>
              <Calendar className="w-5 h-5 text-pink-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Khám phá hệ thống từ ngữ độc bản gắn liền với 4 mùa, tín ngưỡng Thần đạo Shinto, lễ hội Matsuri và mỹ cảm Wabi-Sabi, Mono no Aware.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-pink-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingMore ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>Tải thêm +5 nét văn hóa 4 mùa</span>
              {extraLoadedCount > 0 && (
                <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
                  +{extraLoadedCount}
                </span>
              )}
            </button>

            <div className="p-1 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-1 text-xs">
              <button
                onClick={() => setActiveTab('card')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'card' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Thẻ tương tác
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'grid' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Danh mục ({filteredList.length})
              </button>
              <button
                onClick={() => {
                  setSelectedQuizAnswer(null);
                  setActiveTab('quiz');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Đố vui 4 mùa
              </button>
            </div>
          </div>
        </div>

        {/* Filters: Seasons & Search */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-slate-500 font-semibold mr-1">Mùa:</span>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'Xuân', label: '🌸 Xuân (春)' },
              { id: 'Hạ', label: '🌻 Hạ (夏)' },
              { id: 'Thu', label: '🍁 Thu (秋)' },
              { id: 'Đông', label: '❄️ Đông (冬)' },
              { id: 'Giao mùa', label: '🍃 Giao mùa' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSeason(s.id);
                  setCurrentIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg border font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  selectedSeason === s.id
                    ? 'bg-pink-600/30 border-pink-500 text-pink-200 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Tìm từ vựng, mỹ học, lễ hội..."
              className="w-full pl-8 pr-3 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: CARD VIEW */}
      {/* ======================================================== */}
      {activeTab === 'card' && currentItem && (
        <div className="space-y-4">
          {/* Card Carousel Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200">
                Mục #{currentIndex + 1} / {filteredList.length}
              </span>
              <span className="px-2 py-0.5 rounded-full border border-pink-500/30 text-pink-300 bg-pink-500/10 flex items-center gap-1 font-medium">
                {getSeasonIcon(currentItem.season)}
                <span>{currentItem.season}</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                {currentItem.aestheticCategory}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                  setSelectedQuizAnswer(null);
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Mục trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  setSelectedQuizAnswer(null);
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Mục tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Visual Presentation Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="text-3xl md:text-5xl font-bold font-jp text-white tracking-wide">
                    {currentItem.term}
                  </div>
                  <button
                    onClick={() => speechService.speak(currentItem.term)}
                    className="p-2 rounded-xl bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 transition-colors cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs md:text-sm">
                  <span className="text-pink-400 font-jp font-semibold">
                    {currentItem.reading}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-amber-400 font-semibold">
                    Hán Việt: {currentItem.sinoVietnamese}
                  </span>
                </div>

                <div className="text-sm md:text-base text-slate-200 font-medium pt-1">
                  {currentItem.meaning}
                </div>
              </div>

              {/* Associated Festival / Ritual */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:w-80 shrink-0 space-y-1.5">
                <div className="text-[11px] text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Nghi thức / Lễ hội đi kèm:</span>
                </div>
                <div className="text-xs text-slate-200 font-semibold">
                  {currentItem.festivalOrRitual}
                </div>
              </div>
            </div>

            {/* Context Sample Sentence */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Câu ví dụ ngữ cảnh chuẩn mực:</span>
                <button
                  onClick={() => speechService.speak(currentItem.sampleContext.sentence)}
                  className="text-pink-400 hover:text-pink-300 flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu</span>
                </button>
              </div>
              <div className="text-sm font-jp font-bold text-slate-100">
                {currentItem.sampleContext.sentence}
              </div>
              <div className="text-xs font-jp text-slate-400">
                {currentItem.sampleContext.reading}
              </div>
              <div className="text-xs text-pink-300/90 font-medium">
                → {currentItem.sampleContext.translation}
              </div>
            </div>

            {/* ======================================================== */}
            {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-pink-950/20 border border-pink-500/20 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-pink-400" />
                  <span>Mục Giải Mã Tầng Sâu Văn Hóa 4 Mùa & Tín Ngưỡng (Chưa hiểu vì sao người Nhật yêu mến nét đẹp này?)</span>
                </div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="px-3 py-1.5 rounded-lg bg-pink-600/20 border border-pink-500/40 text-xs text-pink-300 hover:bg-pink-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <span>{showDeepExplanation ? 'Thu gọn phân tích chi tiết' : '🌸 Bấm xem luận giải chi tiết & nghi thức Shinto'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                    <span>📜 Nguồn gốc Thần đạo Shinto & Lịch sử hình thành:</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {currentItem.culturalDeepDive.historicalRoots}
                  </p>
                </div>

                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>🌸 Vì sao người Nhật lại đặc biệt coi trọng:</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {currentItem.culturalDeepDive.whyJapaneseCare}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="text-slate-300 flex items-center gap-2">
                  <span className="font-semibold text-amber-300">📍 Cách trải nghiệm thực tế:</span>
                  <span className="text-slate-400">{currentItem.culturalDeepDive.howToExperience}</span>
                </div>

                <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-pink-300 font-mono">
                  "{currentItem.culturalDeepDive.proverbOrIdiom.japanese}"
                </div>
              </div>

              {/* PHẦN CHI TIẾT HƠN MỞ RỘNG */}
              {showDeepExplanation && (
                <div className="pt-4 border-t border-pink-500/20 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span>Cẩm Nang Mỹ Học Tự Nhiên & Nghi Thức Tâm Linh Chi Tiết</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Cột 1: Mỹ học 3 trụ cột */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-pink-300 flex items-center gap-1.5">
                        <span>🏯 3 Trụ cột Mỹ cảm Nhật Bản</span>
                      </div>
                      <ul className="text-slate-400 space-y-1.5 text-[11px] leading-relaxed">
                        <li>
                          <strong className="text-pink-200">Mono no Aware:</strong> Nỗi buồn man mác trước cái đẹp hữu hạn, hoa nở rồi tàn.
                        </li>
                        <li>
                          <strong className="text-amber-200">Wabi-Sabi:</strong> Tìm kiếm sự thanh tịnh trong những điều giản dị, không hoàn hảo.
                        </li>
                        <li>
                          <strong className="text-cyan-200">Yugen:</strong> Vẻ đẹp u huyền, bảng lảng ẩn hiện của sương trăng mờ ảo.
                        </li>
                      </ul>
                    </div>

                    {/* Cột 2: Nghi lễ đền Shinto */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                        <span>⛩️ Nghi thức viếng đền Shinto</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Quy tắc <strong>2 Cúi - 2 Vỗ tay - 1 Cúi (二礼二拍手一礼)</strong>:
                      </p>
                      <ol className="text-slate-400 space-y-1 text-[11px] list-decimal pl-4">
                        <li>Ném đồng 5 yên vào hòm công đức.</li>
                        <li>Cúi gập người 90 độ 2 lần.</li>
                        <li>Vỗ tay 2 lần ngang ngực, chắp tay khấn nguyện.</li>
                        <li>Cúi đầu sâu 1 lần sau cùng để kết lễ.</li>
                      </ol>
                    </div>

                    {/* Cột 3: Mỹ vị theo mùa (Shun) */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>🍱 Triết lý Mùa nào thức nấy (旬 - Shun)</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Người Nhật tin rằng ăn đúng nguyên liệu đạt độ tươi ngon đỉnh cao vào chính mùa của nó sẽ hấp thụ trọn vẹn sinh khí của đất trời, mang lại sự trường thọ và cân bằng âm dương.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: GRID OVERVIEW */}
      {/* ======================================================== */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-slate-900 border rounded-xl p-5 space-y-3 hover:border-pink-500/50 transition-all flex flex-col justify-between ${getSeasonColor(item.season)}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold flex items-center gap-1">
                    {getSeasonIcon(item.season)}
                    <span>{item.season}</span>
                  </span>
                  <button
                    onClick={() => speechService.speak(item.term)}
                    className="p-1 rounded text-slate-400 hover:text-pink-300 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-2xl font-bold font-jp text-white">
                  {item.term}
                </div>

                <div className="text-xs text-pink-300 font-jp">
                  {item.reading} • {item.sinoVietnamese}
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.meaning}
                </p>

                <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2 text-[11px] text-slate-400">
                  <span className="text-pink-400 font-semibold">Lễ hội: </span>
                  {item.festivalOrRitual}
                </div>
              </div>

              <button
                onClick={() => {
                  const targetIdx = filteredList.findIndex((it) => it.id === item.id);
                  if (targetIdx >= 0) setCurrentIndex(targetIdx);
                  setActiveTab('card');
                }}
                className="w-full mt-2 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-pink-300 hover:border-pink-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
              >
                <span>Chi tiết & giải mã văn hóa</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: QUIZ */}
      {/* ======================================================== */}
      {activeTab === 'quiz' && currentItem && (
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>Đố Vui Văn Hóa 4 Mùa & Tín Ngưỡng Shinto</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Câu {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="text-xs text-pink-400 font-semibold uppercase tracking-wider">
              Câu hỏi văn hóa:
            </div>
            <div className="text-sm font-medium text-slate-200">
              {currentItem.quiz.question}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentItem.quiz.options.map((opt, idx) => {
              const isSelected = selectedQuizAnswer === idx;
              const isCorrect = idx === currentItem.quiz.correctIndex;
              let style = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

              if (selectedQuizAnswer !== null) {
                if (isCorrect) {
                  style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected) {
                  style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (selectedQuizAnswer === null) {
                      setSelectedQuizAnswer(idx);
                      if (isCorrect) speechService.playSuccessSound();
                      else speechService.playErrorSound();
                    }
                  }}
                  disabled={selectedQuizAnswer !== null}
                  className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm transition-all cursor-pointer flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {selectedQuizAnswer !== null && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {selectedQuizAnswer !== null && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quiz Explanation */}
          {selectedQuizAnswer !== null && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Luận giải cội nguồn văn hóa:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentItem.quiz.explanation}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setSelectedQuizAnswer(null);
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  }}
                  className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Câu tiếp theo →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
