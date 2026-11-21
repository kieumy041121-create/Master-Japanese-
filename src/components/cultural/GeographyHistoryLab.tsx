import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { GeographyHistoryItem } from '../../types/cultural';
import { initialGeographyHistoryList, extraGeographyHistoryList } from '../../data/culturalLearningDatabasePart3';
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
  MapPin,
  Landmark,
  Compass,
  ArrowRight,
  HelpCircle,
  Scroll,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const GeographyHistoryLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<GeographyHistoryItem[]>(initialGeographyHistoryList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [filterTopic, setFilterTopic] = useState<'all' | 'Địa lý' | 'Lịch sử'>('all');
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
      item.geographicalOrHistoricalContext.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraGeographyHistoryList.map((item, idx) => ({
        ...item,
        id: `gh_extra_${Date.now()}_${idx}`,
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
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Chuyên sâu Chủ đề 1 & 2
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} mốc son & địa danh
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Địa Lý 47 Tỉnh & Dòng Chảy Lịch Sử Nhật Bản (地理 & 歴史)</span>
              <Compass className="w-5 h-5 text-amber-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Khám phá 47 Đô Đạo Phủ Huyện, các vùng địa lý đặc sắc từ Hokkaido đến Okinawa cùng các thời kỳ lịch sử hào hùng: Chiến Quốc Sengoku, Minh Trị Duy Tân, Heian và Kamakura.
            </p>
          </div>

          {/* Action buttons: Load +5 & Switch Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-amber-600/25 transition-all cursor-pointer disabled:opacity-50"
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
                  activeTab === 'card' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Thẻ tương tác
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'grid' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Bảng địa sử
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Đố vui phản xạ
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
                filterTopic === 'all' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả ({list.length})
            </button>
            <button
              onClick={() => { setFilterTopic('Địa lý'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                filterTopic === 'Địa lý' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <MapPin className="w-3 h-3" /> (1) Địa lý
            </button>
            <button
              onClick={() => { setFilterTopic('Lịch sử'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                filterTopic === 'Lịch sử' ? 'bg-orange-500/20 text-orange-300 font-bold border border-orange-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Landmark className="w-3 h-3" /> (2) Lịch sử
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tỉnh thành, thời kỳ, nhân vật..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
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
                    currentItem.topicType === 'Địa lý'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      : 'bg-orange-950/80 text-orange-300 border-orange-500/40'
                  }`}>
                    {currentItem.topicType}
                  </span>
                  {currentItem.sinoVietnamese && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-800 text-amber-300">
                      Hán Việt: {currentItem.sinoVietnamese}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">
                    Mục {currentIndex + 1} / {filteredList.length}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <h2 className="text-2xl md:text-3xl font-extrabold font-jp text-amber-100 tracking-tight">
                    {currentItem.japaneseTerm}
                  </h2>
                  <button
                    onClick={() => speechService.speak(currentItem.japaneseTerm.split('&')[0])}
                    className="p-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition cursor-pointer"
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

            {/* Context & Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Scroll className="w-4 h-4 text-amber-400" />
                  <span>Tổng quan & Ý nghĩa cốt lõi:</span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {currentItem.summary}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>Bối cảnh Địa lý / Niên đại Lịch sử:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentItem.geographicalOrHistoricalContext}
                </p>
              </div>
            </div>

            {/* Key Figures / Locations Badge list */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Địa danh nổi tiếng & Nhân vật biểu tượng:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {currentItem.culturalDeepDive.keyFiguresOrLocations.map((loc, lIdx) => (
                  <span
                    key={lIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-300"
                  >
                    📍 {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Phrase Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Mẫu câu ngữ cảnh & ngạn ngữ liên quan:
                </span>
                <button
                  onClick={() => speechService.speak(currentItem.samplePhrase.japanese)}
                  className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition cursor-pointer"
                  title="Nghe câu mẫu"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold font-jp text-slate-100">
                  {currentItem.samplePhrase.japanese}
                </div>
                <div className="text-xs text-slate-400 font-jp">
                  {currentItem.samplePhrase.reading}
                </div>
                <div className="text-xs text-amber-300 font-medium pt-1">
                  → {currentItem.samplePhrase.meaning}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-amber-950/20 border border-amber-500/20 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>Mục Giải Mã Chi Tiết Địa Lý & Dòng Chảy Lịch Sử (Cho Người Chưa Hiểu Rõ)</span>
                </div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="px-3 py-1.5 rounded-lg bg-amber-600/20 border border-amber-500/40 text-xs text-amber-300 hover:bg-amber-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <span>{showDeepExplanation ? 'Thu gọn phân tích chi tiết' : '🏯 Bấm xem sự thật lịch sử & phương ngữ thú vị'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* 2 Cột lý thuyết cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>📜 Tầm vóc lịch sử & Giá trị văn hóa:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.historicalSignificance}
                  </p>
                </div>

                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-orange-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span>💡 Sự thật thú vị ít người biết:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.interestingFacts}
                  </p>
                </div>
              </div>

              {/* Mối liên hệ với ngôn ngữ */}
              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 bg-amber-950/20 p-3 rounded-lg border border-amber-500/30">
                <span className="font-bold text-amber-300">🗣️ Mối liên hệ với ngôn ngữ & phương ngữ: </span>
                {currentItem.culturalDeepDive.languageConnection}
              </div>

              {/* PHẦN CHI TIẾT HƠN MỞ RỘNG */}
              {showDeepExplanation && (
                <div className="pt-4 border-t border-amber-500/20 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Bách Khoa Địa Lý 8 Vùng & Niên Biểu Lịch Sử Nhật Bản</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Cột 1: 8 Vùng Địa Lý */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>🗺️ 8 Vùng Địa lý lớn</span>
                      </div>
                      <ul className="text-slate-300 space-y-1 text-[11px] leading-relaxed">
                        <li>• <strong>Hokkaido:</strong> Vùng đất phía bắc, thủ phủ Sapporo.</li>
                        <li>• <strong>Tohoku:</strong> 6 tỉnh Đông Bắc, vựa lúa và tuyết trắng.</li>
                        <li>• <strong>Kanto:</strong> Vùng đô thị Tokyo, trung tâm kinh tế.</li>
                        <li>• <strong>Chubu:</strong> Núi Phú Sĩ, Nagoya và ngành chế tạo.</li>
                        <li>• <strong>Kansai:</strong> Kyoto, Osaka, Kobe nôi văn hóa cổ.</li>
                        <li>• <strong>Chugoku:</strong> Hiroshima, Okayama ven biển Seto.</li>
                        <li>• <strong>Shikoku:</strong> Hòn đảo tâm linh 88 ngôi chùa Ohenro.</li>
                        <li>• <strong>Kyushu & Okinawa:</strong> Miền nhiệt đới phía nam.</li>
                      </ul>
                    </div>

                    {/* Cột 2: Niên Biểu Lịch Sử Cốt Lõi */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-orange-300 flex items-center gap-1.5">
                        <span>⏳ Các mốc thời kỳ lịch sử</span>
                      </div>
                      <ul className="text-slate-300 space-y-1 text-[11px] leading-relaxed">
                        <li>• <strong>Jomon & Yayoi:</strong> Nông nghiệp lúa nước sơ khai.</li>
                        <li>• <strong>Nara & Heian (710-1185):</strong> Hoàng gia và văn hóa cung đình.</li>
                        <li>• <strong>Kamakura & Muromachi (1185-1573):</strong> Mạc phủ và Samurai.</li>
                        <li>• <strong>Sengoku (1467-1603):</strong> Nội chiến loạn lạc Chiến Quốc.</li>
                        <li>• <strong>Edo (1603-1868):</strong> Hòa bình 260 năm bế quan tỏa cảng.</li>
                        <li>• <strong>Minh Trị (1868):</strong> Mở cửa hiện đại hóa thần tốc.</li>
                      </ul>
                    </div>

                    {/* Cột 3: Bí quyết thi JLPT */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                        <span>🎯 Ứng dụng thi Dokkai & Nghe hiểu</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Các bài đọc hiểu JLPT N2-N1 rất hay đề cập đến sự đối lập địa lý Kanto vs Kansai, hoặc so sánh tư duy hiện đại hóa thời Minh Trị.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Nắm vững kiến thức nền địa lý - lịch sử sẽ giúp bạn đọc lướt và bắt trúng ý tác giả ngay từ đoạn mở bài.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Mini Quiz on Card */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-amber-400" />
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
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                  item.topicType === 'Địa lý'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                    : 'bg-orange-950 text-orange-300 border-orange-500/30'
                }`}>
                  {item.topicType}
                </span>
                <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
              </div>

              <div className="space-y-1">
                <div className="text-lg font-bold font-jp text-amber-100 group-hover:text-amber-300 transition-colors">
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

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-amber-300/90 line-clamp-1">
                📍 {item.geographicalOrHistoricalContext}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-amber-400 group-hover:underline flex items-center gap-1 font-semibold">
                  Xem chi tiết & giải mã <ArrowRight className="w-3 h-3" />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speechService.speak(item.japaneseTerm.split('&')[0]);
                  }}
                  className="p-1 hover:text-amber-300"
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
                <span>Đố Vui Phản Xạ Địa Lý & Lịch Sử Nhật Bản</span>
                <Sparkles className="w-5 h-5 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Luyện phản xạ kiến thức văn hóa, địa danh và nhân vật lịch sử quan trọng.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400">
              Câu hỏi: {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          {currentItem && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
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
                  <div className="font-bold text-amber-300">Giải thích chuyên sâu:</div>
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
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold cursor-pointer"
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
