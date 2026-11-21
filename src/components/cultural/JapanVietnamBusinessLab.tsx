import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { JapanVietnamBusinessItem } from '../../types/cultural';
import { initialJapanVietnamBusinessList, extraJapanVietnamBusinessList } from '../../data/culturalLearningDatabasePart3';
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
  Handshake,
  Building2,
  Briefcase,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Globe2,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const JapanVietnamBusinessLab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<JapanVietnamBusinessItem[]>(initialJapanVietnamBusinessList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [filterTopic, setFilterTopic] = useState<'all' | 'Quan hệ Nhật Bản - Việt Nam' | 'Doanh nghiệp Nhật Bản'>('all');
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
      item.corporateOrDiplomaticRole.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraJapanVietnamBusinessList.map((item, idx) => ({
        ...item,
        id: `jvb_extra_${Date.now()}_${idx}`,
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
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Chuyên sâu Chủ đề 6 & 7
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} bài học thực chiến
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Quan Hệ Nhật - Việt & Văn Hóa Doanh Nghiệp (日越関係 & 企業文化)</span>
              <Handshake className="w-5 h-5 text-rose-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Mối bang giao 400 năm từ Châu Ấn thuyền Hội An, phong trào Đông Du, viện trợ ODA đến các kỹ năng làm việc thực chiến: Ho-Ren-So, Ringisho, 5S, Kaizen và quy tắc trao đổi danh thiếp.
            </p>
          </div>

          {/* Action buttons: Load +5 & Switch Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-rose-600/25 transition-all cursor-pointer disabled:opacity-50"
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
                  activeTab === 'card' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Thẻ thực chiến
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'grid' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Ma trận doanh nghiệp
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Đố vui công sở
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
                filterTopic === 'all' ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả ({list.length})
            </button>
            <button
              onClick={() => { setFilterTopic('Quan hệ Nhật Bản - Việt Nam'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                filterTopic === 'Quan hệ Nhật Bản - Việt Nam' ? 'bg-red-500/20 text-red-300 font-bold border border-red-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe2 className="w-3 h-3" /> (6) Quan hệ Nhật - Việt
            </button>
            <button
              onClick={() => { setFilterTopic('Doanh nghiệp Nhật Bản'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                filterTopic === 'Doanh nghiệp Nhật Bản' ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3 h-3" /> (7) Doanh nghiệp Nhật
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo chủ đề, từ khóa doanh nghiệp..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500/50"
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
                    currentItem.topicType === 'Quan hệ Nhật Bản - Việt Nam'
                      ? 'bg-red-950/80 text-red-300 border-red-500/40'
                      : 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                  }`}>
                    {currentItem.topicType}
                  </span>
                  <span className="text-xs text-slate-400">
                    Mục {currentIndex + 1} / {filteredList.length}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <h2 className="text-2xl md:text-3xl font-extrabold font-jp text-rose-100 tracking-tight">
                    {currentItem.japaneseTerm}
                  </h2>
                  <button
                    onClick={() => speechService.speak(currentItem.japaneseTerm.split('&')[0])}
                    className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition cursor-pointer"
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

            {/* Summary & Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-rose-400" />
                  <span>Ý nghĩa & Tầm quan trọng:</span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {currentItem.summary}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Handshake className="w-4 h-4 text-red-400" />
                  <span>Vai trò ngoại giao / Nguyên tắc công sở:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentItem.corporateOrDiplomaticRole}
                </p>
              </div>
            </div>

            {/* Business Phrase Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Mẫu câu giao tiếp công sở & đàm phán ngoại giao chuẩn Nhật:
                </span>
                <button
                  onClick={() => speechService.speak(currentItem.businessPhrase.japanese)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition cursor-pointer"
                  title="Nghe câu mẫu"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold font-jp text-slate-100">
                  {currentItem.businessPhrase.japanese}
                </div>
                <div className="text-xs text-slate-400 font-jp">
                  {currentItem.businessPhrase.reading}
                </div>
                <div className="text-xs text-rose-300 font-medium pt-1">
                  → {currentItem.businessPhrase.meaning}
                </div>
                <div className="text-[11px] text-slate-400 italic pt-1">
                  💡 Ngữ cảnh sử dụng: {currentItem.businessPhrase.businessContext}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-rose-950/20 border border-rose-500/20 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-rose-400" />
                  <span>Mục Giải Mã Chi Tiết Hợp Tác Việt - Nhật & Văn Hóa Doanh Nghiệp (Cho Người Chưa Hiểu Rõ)</span>
                </div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/20 border border-rose-500/40 text-xs text-rose-300 hover:bg-rose-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <span>{showDeepExplanation ? 'Thu gọn phân tích chi tiết' : '💼 Bấm xem cạm bẫy hiểu lầm & bí quyết thành công'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* 2 Cột lý thuyết cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>🏛️ Cội nguồn lịch sử / Triết lý quản trị:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.historicalOrManagementRoots || currentItem.culturalDeepDive.historicalSignificance}
                  </p>
                </div>

                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>⚠️ Hiểu lầm người Việt Nam hay mắc phải:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.commonPitfalls}
                  </p>
                </div>
              </div>

              {/* Lời khuyên thành công vàng */}
              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/30">
                <span className="font-bold text-emerald-300">🌟 Lời khuyên vàng để thăng tiến & hợp tác thành công: </span>
                {currentItem.culturalDeepDive.goldenSuccessAdvice}
              </div>

              {/* PHẦN CHI TIẾT HƠN MỞ RỘNG */}
              {showDeepExplanation && (
                <div className="pt-4 border-t border-rose-500/20 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Cẩm Nang Nghi Thức Công Sở & Tác Phong Chuẩn Mực Doanh Nghiệp Nhật</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Cột 1: Ho-Ren-So Chuẩn */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-rose-300 flex items-center gap-1.5">
                        <span>🥬 1. Bí kíp Ho-Ren-So thần tốc</span>
                      </div>
                      <ul className="text-slate-300 space-y-1 text-[11px] leading-relaxed">
                        <li>• <strong>Houkoku (Báo cáo):</strong> Tin xấu báo trước tin tốt, báo cáo định kỳ không đợi sếp hỏi.</li>
                        <li>• <strong>Renraku (Liên lạc):</strong> Truyền đạt sự thật khách quan không thêm bớt cảm xúc cá nhân.</li>
                        <li>• <strong>Soudan (Thảo luận):</strong> Đưa ra 2-3 phương án kèm ưu nhược điểm trước khi xin sếp duyệt.</li>
                      </ul>
                    </div>

                    {/* Cột 2: Thứ bậc Kamiza - Shimoza */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>🪑 2. Vị trí ngồi Kamiza (Thượng tọa)</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • <strong>Trong phòng họp:</strong> Ghế trong cùng, xa cửa ra vào nhất là Kamiza (dành cho sếp lớn/khách hàng).
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • <strong>Trong thang máy:</strong> Vị trí gần bảng điều khiển nhất là Shimoza (người trẻ nhất đứng bấm nút và giữ cửa cho mọi người).
                      </p>
                    </div>

                    {/* Cột 3: Tinh thần Tri ân (On) */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-blue-300 flex items-center gap-1.5">
                        <span>🤝 3. Xây dựng niềm tin Shinrai</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Doanh nghiệp Nhật thà chịu lỗ một đơn hàng chứ không bao giờ giao trễ hẹn hay hạ thấp tiêu chuẩn chất lượng đã cam kết.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Chữ "Tín" tích lũy 10 năm có thể sụp đổ chỉ sau 1 lần trễ hẹn hay thất hứa.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Mini Quiz on Card */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-rose-400" />
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
              className="bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                  item.topicType === 'Quan hệ Nhật Bản - Việt Nam'
                    ? 'bg-red-950 text-red-300 border-red-500/30'
                    : 'bg-blue-950 text-blue-300 border-blue-500/30'
                }`}>
                  {item.topicType.split(' ')[0]}
                </span>
                <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
              </div>

              <div className="space-y-1">
                <div className="text-lg font-bold font-jp text-rose-100 group-hover:text-rose-300 transition-colors">
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

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-rose-300/90 line-clamp-1 font-jp">
                💼 {item.businessPhrase.japanese}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-rose-400 group-hover:underline flex items-center gap-1 font-semibold">
                  Xem chi tiết & giải mã <ArrowRight className="w-3 h-3" />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speechService.speak(item.japaneseTerm.split('&')[0]);
                  }}
                  className="p-1 hover:text-rose-300"
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
                <span>Đố Vui Quan Hệ Nhật - Việt & Văn Hóa Doanh Nghiệp</span>
                <Sparkles className="w-5 h-5 text-rose-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Kiểm tra kiến thức ngoại giao lịch sử và kỹ năng làm việc chuẩn tác phong công sở Nhật.
              </p>
            </div>
            <span className="text-xs font-mono text-rose-400">
              Câu hỏi: {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          {currentItem && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
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
                  <div className="font-bold text-rose-300">Giải thích chuyên sâu:</div>
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
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
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
