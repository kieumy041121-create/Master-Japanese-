import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { EconomySportsItem } from '../../types/cultural';
import { initialEconomySportsList, extraEconomySportsList } from '../../data/culturalLearningDatabasePart3';
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
  TrendingUp,
  Trophy,
  Cpu,
  Flame,
  ArrowRight,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const EconomySportsHub: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<EconomySportsItem[]>(initialEconomySportsList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [filterTopic, setFilterTopic] = useState<'all' | 'Kinh tế và Công nghiệp' | 'Thể thao'>('all');
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
      item.industryOrSportDomain.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraEconomySportsList.map((item, idx) => ({
        ...item,
        id: `es_extra_${Date.now()}_${idx}`,
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
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Chuyên sâu Chủ đề 9 & 10
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} công nghiệp & thể thao tinh thần
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Kinh Tế Công Nghiệp & Thể Thao Tinh Thần (経済・産業 & スポーツ魂)</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Giải mã kỳ tích Shinkansen, vật liệu bán dẫn, thời kỳ bong bóng kinh tế Baburu kết hợp với tinh thần thể thao quật cường: Sumo Thần đạo, Bóng chày Koshien rực lửa và chạy tiếp sức Hakone Ekiden.
            </p>
          </div>

          {/* Action buttons: Load +5 & Switch Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer disabled:opacity-50"
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
                  activeTab === 'card' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Thẻ tương tác
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'grid' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Bảng công thể
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Đố vui năng động
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
                filterTopic === 'all' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả ({list.length})
            </button>
            <button
              onClick={() => { setFilterTopic('Kinh tế và Công nghiệp'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                filterTopic === 'Kinh tế và Công nghiệp' ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3 h-3" /> (9) Kinh tế & Công nghiệp
            </button>
            <button
              onClick={() => { setFilterTopic('Thể thao'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                filterTopic === 'Thể thao' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Trophy className="w-3 h-3" /> (10) Thể thao
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo ngành nghề, môn thể thao, từ khóa..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
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
                    currentItem.topicType === 'Kinh tế và Công nghiệp'
                      ? 'bg-teal-950/80 text-teal-300 border-teal-500/40'
                      : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                  }`}>
                    {currentItem.topicType}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-800 text-emerald-300">
                    Lĩnh vực: {currentItem.industryOrSportDomain}
                  </span>
                  <span className="text-xs text-slate-400">
                    Mục {currentIndex + 1} / {filteredList.length}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <h2 className="text-2xl md:text-3xl font-extrabold font-jp text-emerald-100 tracking-tight">
                    {currentItem.japaneseTerm}
                  </h2>
                  <button
                    onClick={() => speechService.speak(currentItem.japaneseTerm.split('&')[0])}
                    className="p-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition cursor-pointer"
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

            {/* Summary & Story */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Tổng quan & Giá trị phát triển:</span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {currentItem.summary}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-teal-400" />
                  <span>Câu chuyện phát triển & Tinh thần thể thao:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentItem.culturalDeepDive.developmentStoryOrSpirit}
                </p>
              </div>
            </div>

            {/* Sample Phrase or Chant Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Mẫu câu khẩu hiệu & thuật ngữ đặc trưng:
                </span>
                <button
                  onClick={() => speechService.speak(currentItem.samplePhraseOrChant.japanese)}
                  className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition cursor-pointer"
                  title="Nghe câu khẩu hiệu"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold font-jp text-slate-100">
                  {currentItem.samplePhraseOrChant.japanese}
                </div>
                <div className="text-xs text-slate-400 font-jp">
                  {currentItem.samplePhraseOrChant.reading}
                </div>
                <div className="text-xs text-emerald-300 font-medium pt-1">
                  → {currentItem.samplePhraseOrChant.meaning}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/20 border border-emerald-500/20 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <span>Mục Giải Mã Chi Tiết Kinh Tế Công Nghiệp & Thể Thao Tinh Thần (Cho Người Chưa Hiểu Rõ)</span>
                </div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-xs text-emerald-300 hover:bg-emerald-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <span>{showDeepExplanation ? 'Thu gọn phân tích chi tiết' : '🚄 Bấm xem điểm độc đáo & bài học thực tế'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* 2 Cột lý thuyết cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>💎 Nét độc đáo chỉ có tại Nhật Bản:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.uniqueJapaneseAspects}
                  </p>
                </div>

                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-teal-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span>📈 Tác động kinh tế & Niềm say mê quốc dân:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.economicImpactOrNationalPassion}
                  </p>
                </div>
              </div>

              {/* Bài học đúc kết */}
              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/30">
                <span className="font-bold text-emerald-300">💡 Bài học đúc kết cho người học & làm việc: </span>
                {currentItem.culturalDeepDive.practicalTakeaway}
              </div>

              {/* PHẦN CHI TIẾT HƠN MỞ RỘNG */}
              {showDeepExplanation && (
                <div className="pt-4 border-t border-emerald-500/20 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Hồ Sơ Năng Lực Công Nghiệp & Tinh Thần Thể Thao Tối Thượng Nhật Bản</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Cột 1: Tinh thần Monozukuri */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                        <span>⚙️ 1. Triết lý Monozukuri đỉnh cao</span>
                      </div>
                      <ul className="text-slate-300 space-y-1 text-[11px] leading-relaxed">
                        <li>• Chế tác thủ công kết hợp công nghệ chính xác micromet.</li>
                        <li>• Không chấp nhận sai số dù là một phần triệu.</li>
                        <li>• Bền bỉ hàng chục năm không hỏng hóc, an toàn tuyệt đối cho người dùng.</li>
                      </ul>
                    </div>

                    {/* Cột 2: Văn hóa Thể thao Koshien & Ekiden */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-teal-300 flex items-center gap-1.5">
                        <span>⚾ 2. Tinh thần đồng đội vì tập thể</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Trong bóng chày hay Ekiden, thành tích của cá nhân luôn xếp sau danh dự của đội.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Khán giả Nhật cổ vũ văn minh: Dọn sạch rác trên khán đài trước khi ra về, dù thắng hay bại.
                      </p>
                    </div>

                    {/* Cột 3: Tinh thần võ đạo Rei */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>🥋 3. Khiêm nhường trước vinh quang</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Võ sĩ Sumo hay kiếm thủ Kendo khi thắng trận tuyệt đối không được giơ nắm đấm ăn mừng để tôn trọng nỗi buồn của đối thủ vừa ngã xuống.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Đạo lý "Rei ni hajimari, Rei ni owaru" là cốt cách của người quân tử.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Mini Quiz on Card */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
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
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                  item.topicType === 'Kinh tế và Công nghiệp'
                    ? 'bg-teal-950 text-teal-300 border-teal-500/30'
                    : 'bg-amber-950 text-amber-300 border-amber-500/30'
                }`}>
                  {item.topicType.split(' ')[0]}
                </span>
                <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
              </div>

              <div className="space-y-1">
                <div className="text-lg font-bold font-jp text-emerald-100 group-hover:text-emerald-300 transition-colors">
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

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-emerald-300/90 line-clamp-1 font-jp">
                ⚡ {item.samplePhraseOrChant.japanese}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-emerald-400 group-hover:underline flex items-center gap-1 font-semibold">
                  Xem chi tiết & giải mã <ArrowRight className="w-3 h-3" />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speechService.speak(item.japaneseTerm.split('&')[0]);
                  }}
                  className="p-1 hover:text-emerald-300"
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
                <span>Đố Vui Kinh Tế Công Nghiệp & Tinh Thần Thể Thao</span>
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Thử thách phản xạ kiến thức công nghệ, đường sắt, bán dẫn và tinh thần thể thao kiên cường của Nhật Bản.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400">
              Câu hỏi: {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          {currentItem && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
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
                  <div className="font-bold text-emerald-300">Giải thích chuyên sâu:</div>
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
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
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
