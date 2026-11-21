import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { OnsenSentoItem } from '../../types/cultural';
import { initialOnsenSentoList, extraOnsenSentoList } from '../../data/culturalLearningDatabasePart2';
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
  Droplets,
  Waves,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const OnsenSentoEtiquette: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<OnsenSentoItem[]>(initialOnsenSentoList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.ruleTitle.toLowerCase().includes(q) ||
      item.japaneseTerm.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.severity.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraOnsenSentoList.map((item, idx) => ({
        ...item,
        id: `os_extra_${Date.now()}_${idx}`,
      }));

      setList((prev) => [...prev, ...nextBatch]);
      setExtraLoadedCount((prev) => prev + 5);
      setIsLoadingMore(false);
      speechService.playSuccessSound();
    }, 400);
  };

  const getSeverityBadge = (severity: OnsenSentoItem['severity']) => {
    switch (severity) {
      case 'Quy tắc bắt buộc tối thượng':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/40';
      case 'Nghi thức thanh tẩy':
        return 'bg-sky-950/80 text-sky-300 border-sky-500/40';
      case 'Trải nghiệm phong cách':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Tính năng Chuyên sâu 8/10
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} quy tắc & nghi thức
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Nghi Thức Onsen & Nhà Tắm Công Cộng Sento (温泉 & 銭湯)</span>
              <Waves className="w-5 h-5 text-sky-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Trải nghiệm triết lý "Hadaka no Tsukiai" (Giao tiếp trần trụi không khoảng cách địa vị): Quy trình tắm 7 bước vàng, nghi thức tẩy trần Misogi và cách ứng xử chuẩn mực.
            </p>
          </div>

          {/* Action buttons: Load +5 & Switch Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-sky-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingMore ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>Tải thêm +5 quy tắc</span>
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
                  activeTab === 'card' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Thẻ nghi thức
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'grid' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Bảng 7 bước
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Đố vui Onsen
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo quy tắc, bước tắm, từ tiếng Nhật..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
            />
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Khớp: <strong>{filteredList.length}</strong> / {list.length} mục
          </span>
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
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${getSeverityBadge(currentItem.severity)}`}>
                    {currentItem.severity}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-800 text-sky-300">
                    Bước {currentItem.sevenStepFlowNumber} / 7
                  </span>
                  <span className="text-xs text-slate-400">
                    Mục {currentIndex + 1} / {filteredList.length}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <h2 className="text-2xl font-bold font-jp text-white">
                    {currentItem.japaneseTerm}
                  </h2>
                  <button
                    onClick={() => speechService.speak(currentItem.japaneseTerm)}
                    className="p-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 transition cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-slate-400 font-jp">
                  {currentItem.reading}
                </div>
                <div className="text-sm font-semibold text-sky-300 pt-0.5">
                  {currentItem.ruleTitle}
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

            {/* Meaning & Practical Dialogue */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-sky-400" />
                  <span>Ý nghĩa & Hướng dẫn thực hiện:</span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {currentItem.meaning}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-teal-400" />
                    <span>Hội thoại thực tế tại Onsen:</span>
                  </div>
                  <button
                    onClick={() => speechService.speak(currentItem.practicalDialogue.line)}
                    className="p-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 transition cursor-pointer"
                    title="Nghe câu thoại"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[11px] text-slate-400">
                  Tình huống: <strong>{currentItem.practicalDialogue.situation}</strong>
                </div>
                <div className="text-sm font-bold font-jp text-teal-200">
                  {currentItem.practicalDialogue.line}
                </div>
                <div className="text-xs text-slate-400 font-jp">
                  {currentItem.practicalDialogue.reading}
                </div>
                <div className="text-xs text-teal-300 pt-0.5">
                  → {currentItem.practicalDialogue.meaning}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-sky-950/20 border border-sky-500/20 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-sky-400" />
                  <span>Mục Giải Mã Tầng Sâu Văn Hóa Onsen (Dành Cho Người Chưa Hiểu Rõ Văn Hóa)</span>
                </div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="px-3 py-1.5 rounded-lg bg-sky-600/20 border border-sky-500/40 text-xs text-sky-300 hover:bg-sky-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <span>{showDeepExplanation ? 'Thu gọn phân tích chi tiết' : '♨️ Bấm xem triết lý Hadaka no Tsukiai & quy tắc hình xăm'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* 2 Cột lý thuyết cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <span>🤝 Triết lý "Hadaka no Tsukiai" (Giao lưu trần trụi):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.hadakaNoTsukiaiMeaning}
                  </p>
                </div>

                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>⛩️ Nghi thức tẩy trần Misogi trong Thần đạo:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.shintoPurificationRoots}
                  </p>
                </div>
              </div>

              {/* Tranh cãi hình xăm & Hướng dẫn khoáng chất */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-rose-950/20 border border-rose-500/30 p-3 rounded-lg text-slate-300">
                  <span className="font-bold text-rose-300">🐉 Vì sao Onsen kiêng kỵ hình xăm: </span>
                  {currentItem.culturalDeepDive.tattooCultureControversy}
                </div>
                <div className="bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-lg text-slate-300">
                  <span className="font-bold text-emerald-300">🥛 Tác dụng khoáng chất & sữa Meiji: </span>
                  {currentItem.culturalDeepDive.mineralBenefitsGuide}
                </div>
              </div>

              {/* PHẦN CHI TIẾT HƠN MỞ RỘNG */}
              {showDeepExplanation && (
                <div className="pt-4 border-t border-sky-500/20 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span>Cẩm Nang 7 Bước Tắm Suối Nước Nóng Chuẩn Người Bản Xứ</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Cột 1: Bước 1 đến 3 */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-sky-300 flex items-center gap-1.5">
                        <span>🧼 1. Trước khi ngâm bồn</span>
                      </div>
                      <ul className="text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
                        <li>• <strong>Bước 1 - Cởi đồ:</strong> Bỏ toàn bộ y phục vào giỏ/tủ khóa. Chỉ mang khăn nhỏ Tenugui.</li>
                        <li>• <strong>Bước 2 - Kakeyu (Xối nước):</strong> Múc nước ấm dội từ bàn chân lên ngực để tim làm quen nhiệt độ.</li>
                        <li>• <strong>Bước 3 - Tắm sạch xà phòng:</strong> Ngồi trên ghế nhỏ kỳ cọ cơ thể thật sạch trước khi bước xuống bồn.</li>
                      </ul>
                    </div>

                    {/* Cột 2: Bước 4 và 5 */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-teal-300 flex items-center gap-1.5">
                        <span>♨️ 2. Trong khi ngâm mình</span>
                      </div>
                      <ul className="text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
                        <li>• <strong>Bước 4 - Xuống nước từ tốn:</strong> Không nhảy ùm, không bơi lội, không té nước.</li>
                        <li>• <strong>Bước 5 - Khăn đội đầu:</strong> Tuyệt đối không để khăn nhỏ nhúng vào nước bồn tắm (gấp khăn đặt trên đỉnh đầu).</li>
                        <li>• <strong>Thời gian lý tưởng:</strong> Mỗi lần ngâm 10-15 phút, tránh say nước nóng (Yu-atari).</li>
                      </ul>
                    </div>

                    {/* Cột 3: Bước 6 và 7 */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                        <span>🥛 3. Sau khi kết thúc</span>
                      </div>
                      <ul className="text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
                        <li>• <strong>Bước 6 - Lau khô người:</strong> Vắt ráo khăn nhỏ, lau sạch nước trước khi bước chân vào phòng thay đồ.</li>
                        <li>• <strong>Bước 7 - Uống sữa lạnh:</strong> Thưởng thức một chai sữa tươi hoặc sữa cà phê Meiji lạnh tại máy bán hàng tự động để cân bằng nhiệt cơ thể.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Mini Quiz on Card */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-sky-400" />
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
              className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getSeverityBadge(item.severity)}`}>
                  {item.severity}
                </span>
                <span className="text-slate-500 text-[10px]">Bước {item.sevenStepFlowNumber}/7</span>
              </div>

              <div className="space-y-1">
                <div className="text-lg font-bold font-jp text-sky-100 group-hover:text-sky-300 transition-colors">
                  {item.japaneseTerm}
                </div>
                <div className="text-[11px] text-slate-400 font-jp">
                  {item.reading}
                </div>
                <div className="text-xs font-semibold text-slate-200 pt-0.5">
                  {item.ruleTitle}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.meaning}
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-teal-300/90 line-clamp-1 font-jp">
                💬 {item.practicalDialogue.line}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-sky-400 group-hover:underline flex items-center gap-1 font-semibold">
                  Xem chi tiết nghi thức <ArrowRight className="w-3 h-3" />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speechService.speak(item.japaneseTerm);
                  }}
                  className="p-1 hover:text-sky-300"
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
                <span>Đố Vui Nghi Thức Suối Nước Nóng Onsen & Sento</span>
                <Sparkles className="w-5 h-5 text-sky-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Thử thách chuẩn mực hành vi: Đảm bảo bạn tự tin bước vào mọi Onsen truyền thống tại Nhật Bản.
              </p>
            </div>
            <span className="text-xs font-mono text-sky-400">
              Câu hỏi: {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          {currentItem && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Quy tắc: {currentItem.ruleTitle} ({currentItem.japaneseTerm})
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
                  <div className="font-bold text-sky-300">Giải thích chuyên sâu:</div>
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
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold cursor-pointer"
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
