import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { ArtsLinguisticsItem } from '../../types/cultural';
import { initialArtsLinguisticsList, extraArtsLinguisticsList } from '../../data/culturalLearningDatabasePart3';
import { speechService } from '../../services/speechService';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  RotateCcw,
  Plus,
  Search,
  Palette,
  BookText,
  Languages,
  Music,
  ArrowRight,
  HelpCircle,
  Feather,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const ArtsLinguisticsMaster: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<ArtsLinguisticsItem[]>(initialArtsLinguisticsList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [filterTopic, setFilterTopic] = useState<'all' | 'Văn hóa - nghệ thuật' | 'Tiếng Nhật'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const matchesFilter = filterTopic === 'all' || item.topicType === filterTopic;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.japaneseTerm.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.artOrLanguageField.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraArtsLinguisticsList.map((item, idx) => ({
        ...item,
        id: `al_extra_${Date.now()}_${idx}`,
      }));

      setList((prev) => [...prev, ...nextBatch]);
      setExtraLoadedCount((prev) => prev + 5);
      setIsLoadingMore(false);
      speechService.playSuccessSound();
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Chuyên sâu Chủ đề 4 & 5
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} tác phẩm & cấu trúc ngôn ngữ
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Văn Hóa Nghệ Thuật & Ngôn Ngữ Học (芸術・文学・方言)</span>
              <Palette className="w-5 h-5 text-indigo-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Khám phá thơ Haiku (Basho), kiến trúc lâu đài cổ, âm nhạc J-Pop, hoạt hình Ghibli cùng những nét độc đáo trong ngôn ngữ học: Phương ngữ Kansai-ben và kho từ mượn Wasei-Eigo độc nhất vô nhị.
            </p>
          </div>

          {/* Action buttons: Load +5 & Switch Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingMore ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>Tải thêm +5 cái</span>
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
                  activeTab === 'card' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Thẻ nghệ thuật
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Bách khoa ngôn ngữ
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Đố vui mỹ học
              </button>
            </div>
          </div>
        </div>

        {/* Filter by Topic & Search */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">Lọc chủ đề:</span>
            <button
              onClick={() => { setFilterTopic('all'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                filterTopic === 'all' ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả ({list.length})
            </button>
            <button
              onClick={() => { setFilterTopic('Văn hóa - nghệ thuật'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                filterTopic === 'Văn hóa - nghệ thuật' ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3 h-3" /> (4) Văn hóa - nghệ thuật
            </button>
            <button
              onClick={() => { setFilterTopic('Tiếng Nhật'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                filterTopic === 'Tiếng Nhật' ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Languages className="w-3 h-3" /> (5) Tiếng Nhật
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tác phẩm, phương ngữ, thuật ngữ..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: INTERACTIVE CARD VIEW */}
      {/* ======================================================== */}
      {activeTab === 'card' && currentItem && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* Header of Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
                    currentItem.topicType === 'Văn hóa - nghệ thuật'
                      ? 'bg-purple-950/80 text-purple-300 border-purple-500/40'
                      : 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                  }`}>
                    {currentItem.topicType}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-800 text-indigo-300">
                    Lĩnh vực: {currentItem.artOrLanguageField}
                  </span>
                  <span className="text-xs text-slate-400">
                    Mục {currentIndex + 1} / {filteredList.length}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <h2 className="text-2xl md:text-3xl font-extrabold font-jp text-indigo-100 tracking-tight">
                    {currentItem.japaneseTerm}
                  </h2>
                  <button
                    onClick={() => speechService.speak(currentItem.japaneseTerm.split('&')[0])}
                    className="p-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs text-slate-400 font-jp">
                  {currentItem.reading}
                </div>
                <div className="text-sm font-semibold text-slate-200 pt-0.5">
                  {currentItem.title}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition cursor-pointer"
                  title="Trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition cursor-pointer"
                  title="Tiếp theo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Summary & Aesthetic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Feather className="w-4 h-4 text-indigo-400" />
                  <span>Tổng quan & Ý nghĩa nghệ thuật:</span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {currentItem.summary}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Mỹ học nghệ thuật / Nguồn gốc ngôn ngữ:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentItem.culturalDeepDive.artisticAestheticOrOrigin}
                </p>
              </div>
            </div>

            {/* Sample Art / Dialect Text Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Trích đoạn tác phẩm / Văn phong phương ngữ thực tế:
                </span>
                <button
                  onClick={() => speechService.speak(currentItem.sampleArtOrDialectText.originalText)}
                  className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition cursor-pointer"
                  title="Nghe câu thơ / câu thoại"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                <div className="text-base md:text-lg font-bold font-jp text-slate-100">
                  {currentItem.sampleArtOrDialectText.originalText}
                </div>
                <div className="text-xs text-slate-400 font-jp">
                  {currentItem.sampleArtOrDialectText.reading}
                </div>
                <div className="text-xs text-indigo-300 font-medium pt-1">
                  → {currentItem.sampleArtOrDialectText.vietnameseTranslation}
                </div>
                <div className="text-[11px] text-slate-400 italic pt-0.5">
                  Chuẩn mực / Đối chiếu: {currentItem.sampleArtOrDialectText.standardJapaneseOrMeaning}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-indigo-950/20 border border-indigo-500/20 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  <span>Mục Giải Mã Tầng Sâu Văn Hóa Nghệ Thuật & Ngôn Ngữ Học (Cho Người Chưa Hiểu Rõ)</span>
                </div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-xs text-indigo-300 hover:bg-indigo-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <span>{showDeepExplanation ? 'Thu gọn phân tích chi tiết' : '🎨 Bấm xem mỹ học tinh tế & bí quyết cảm thụ'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* 2 Cột lý thuyết cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>🌟 Tầm ảnh hưởng văn hóa đại chúng:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.modernInfluence}
                  </p>
                </div>

                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-purple-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>📚 Bí quyết học tập & Cảm thụ sâu sắc:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.studyGuideForLearners}
                  </p>
                </div>
              </div>

              {/* PHẦN CHI TIẾT HƠN MỞ RỘNG */}
              {showDeepExplanation && (
                <div className="pt-4 border-t border-indigo-500/20 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Cẩm Nang Thưởng Thức Nghệ Thuật & Bản Đồ Ngôn Ngữ Nhật Bản</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Cột 1: Mỹ học Yugen & Wabi */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                        <span>🌸 1. Bộ 3 khái niệm mỹ học Nhật</span>
                      </div>
                      <ul className="text-slate-300 space-y-1 text-[11px] leading-relaxed">
                        <li>• <strong>Wabi-Sabi:</strong> Vẻ đẹp mộc mạc, bất toàn và trường tồn theo thời gian.</li>
                        <li>• <strong>Yugen (U huyền):</strong> Vẻ đẹp huyền bí thâm sâu khó diễn tả bằng lời.</li>
                        <li>• <strong>Mono no Aware:</strong> Niềm xúc cảm thanh tao trước sự vô thường mong manh của hoa rơi tuyết tan.</li>
                      </ul>
                    </div>

                    {/* Cột 2: Phương ngữ & Ngôn ngữ học */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-purple-300 flex items-center gap-1.5">
                        <span>🗣️ 2. Đột phá nghe hiểu phương ngữ</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Người vùng Kansai hay kết thúc câu bằng "Nen", "Ya", "Hate".
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Người vùng Hakata (Kyushu) hay dùng "Batta", "To". Hiểu phương ngữ sẽ giúp bạn nghe hiểu 100% phim ảnh đời sống.
                      </p>
                    </div>

                    {/* Cột 3: Tác phẩm kinh điển */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-blue-300 flex items-center gap-1.5">
                        <span>📖 3. Tác phẩm nên đọc 1 lần trong đời</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • "Kokoro" của Natsume Soseki: Khám phá sự cô đơn và cảm giác tội lỗi của con người hiện đại.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • "Truyện Genji": Bức tranh cung đình tráng lệ bậc nhất phương Đông.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Mini Quiz on Card */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span>Thử thách phản xạ nhanh:</span>
              </div>
              <p className="text-xs font-semibold text-slate-200">
                {currentItem.quiz.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentItem.quiz.options.map((opt, oIdx) => {
                  const isSelected = selectedQuizAnswer === oIdx;
                  const isCorrect = oIdx === currentItem.quiz.correctIndex;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setSelectedQuizAnswer(oIdx);
                        if (isCorrect) {
                          speechService.playSuccessSound();
                        } else {
                          speechService.playErrorSound();
                        }
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedQuizAnswer === null
                          ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                          : isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                          : isSelected
                          ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                          : 'bg-slate-900/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] shrink-0 font-bold">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedQuizAnswer !== null && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2 animate-fadeIn ${
                    selectedQuizAnswer === currentItem.quiz.correctIndex
                      ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
                  }`}
                >
                  {selectedQuizAnswer === currentItem.quiz.correctIndex ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold">
                      {selectedQuizAnswer === currentItem.quiz.correctIndex
                        ? 'Chính xác!'
                        : 'Chưa chính xác!'}
                    </span>{' '}
                    {currentItem.quiz.explanation}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: GRID OVERVIEW */}
      {/* ======================================================== */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setActiveTab('card');
              }}
              className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                  item.topicType === 'Văn hóa - nghệ thuật'
                    ? 'bg-purple-950 text-purple-300 border-purple-500/30'
                    : 'bg-blue-950 text-blue-300 border-blue-500/30'
                }`}>
                  {item.artOrLanguageField}
                </span>
                <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
              </div>

              <div className="space-y-1">
                <div className="text-lg font-bold font-jp text-indigo-100 group-hover:text-indigo-300 transition-colors">
                  {item.japaneseTerm}
                </div>
                <div className="text-[11px] text-slate-400 font-jp">
                  {item.reading}
                </div>
                <div className="text-xs font-semibold text-slate-200 pt-0.5">
                  {item.title}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.summary}
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-indigo-300/90 line-clamp-1 font-jp">
                ✍️ {item.sampleArtOrDialectText.originalText}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-indigo-400 group-hover:underline flex items-center gap-1 font-semibold">
                  Xem chi tiết & giải mã <ArrowRight className="w-3 h-3" />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speechService.speak(item.japaneseTerm.split('&')[0]);
                  }}
                  className="p-1 hover:text-indigo-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 3: FULL QUIZ REFLEX TEST */}
      {/* ======================================================== */}
      {activeTab === 'quiz' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Đố Vui Văn Hóa Nghệ Thuật & Ngôn Ngữ Học</span>
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Thử thách kiến thức văn học, kiến trúc, phương ngữ và văn hóa đại chúng Nhật Bản.
              </p>
            </div>
            <span className="text-xs font-mono text-indigo-400">
              Câu hỏi: {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          {currentItem && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Chủ đề: {currentItem.title} ({currentItem.japaneseTerm})
                </span>
                <p className="text-sm font-semibold text-slate-100">
                  {currentItem.quiz.question}
                </p>
              </div>

              <div className="space-y-2.5">
                {currentItem.quiz.options.map((opt, oIdx) => {
                  const isSelected = selectedQuizAnswer === oIdx;
                  const isCorrect = oIdx === currentItem.quiz.correctIndex;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setSelectedQuizAnswer(oIdx);
                        if (isCorrect) {
                          speechService.playSuccessSound();
                        } else {
                          speechService.playErrorSound();
                        }
                      }}
                      className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        selectedQuizAnswer === null
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                          : isCorrect
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                          : isSelected
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : 'bg-slate-950/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="text-sm leading-snug">{opt}</span>
                      </div>
                      {selectedQuizAnswer !== null && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {selectedQuizAnswer !== null && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedQuizAnswer !== null && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5 animate-fadeIn">
                  <div className="font-bold text-indigo-300">Giải thích chuyên sâu:</div>
                  <p className="leading-relaxed">{currentItem.quiz.explanation}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    setSelectedQuizAnswer(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 cursor-pointer"
                >
                  ← Câu trước
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    setSelectedQuizAnswer(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
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
