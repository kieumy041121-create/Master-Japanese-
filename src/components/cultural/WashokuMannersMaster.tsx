import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { WashokuMannerItem } from '../../types/cultural';
import { initialWashokuMannerList, extraWashokuMannerList } from '../../data/culturalLearningDatabase';
import { speechService } from '../../services/speechService';
import {
  Sparkles,
  Volume2,
  UtensilsCrossed,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const WashokuMannersMaster: React.FC<Props> = ({ currentLevel }) => {
  const [list, setList] = useState<WashokuMannerItem[]>(initialWashokuMannerList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  // Filter list
  const filteredList = list.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.mannerTitle.toLowerCase().includes(q) ||
      item.japaneseTerm.toLowerCase().includes(q) ||
      item.dishOrOccasion.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  // Load more 5 items
  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraWashokuMannerList.map((item, idx) => ({
        ...item,
        id: `wm_extra_${Date.now()}_${idx}`,
      }));
      setList((prev) => [...prev, ...nextBatch]);
      setExtraLoadedCount((prev) => prev + 5);
      setIsLoadingMore(false);
      speechService.playSuccessSound();
    }, 400);
  };

  const getStatusBadge = (status: WashokuMannerItem['status']) => {
    switch (status) {
      case 'Đại kỵ phạm húy (Cấm kỵ)':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/50';
      case 'Quy tắc vàng bắt buộc':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/50';
      default:
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50';
    }
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
                Tính năng Văn hóa 3/5
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} nghi thức ẩm thực & đại kỵ
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Triết Lý Ẩm Thực Washoku & Nghi Thức Bàn Ăn (和食マナー)</span>
              <UtensilsCrossed className="w-5 h-5 text-amber-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Khám phá di sản phi vật thể Washoku qua triết lý tri ân sinh mệnh vạn vật, văn hóa quán nhậu Izakaya và các cấm kỵ dùng đũa tối thượng.
            </p>
          </div>

          {/* Action buttons */}
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
              <span>Tải thêm +5 nghi thức ẩm thực</span>
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
                Danh mục ({filteredList.length})
              </button>
              <button
                onClick={() => {
                  setSelectedQuizAnswer(null);
                  setActiveTab('quiz');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Thử thách bàn tiệc
              </button>
            </div>
          </div>
        </div>

        {/* Search filter bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Tìm nghi thức đũa, Izakaya, sushi, itadakimasu..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            🍱 Mẹo: Luôn đọc phần "Hậu quả nếu vi phạm" để không bị bỡ ngỡ khi đi ăn tiệc cùng người Nhật.
          </span>
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
                Nghi thức #{currentIndex + 1} / {filteredList.length}
              </span>
              <span className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${getStatusBadge(currentItem.status)}`}>
                {currentItem.status}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[10px]">
                {currentItem.dishOrOccasion}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                  setSelectedQuizAnswer(null);
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Nghi thức trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  setSelectedQuizAnswer(null);
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Nghi thức tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Presentation Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="text-2xl md:text-3xl font-bold font-jp text-white">
                    {currentItem.japaneseTerm}
                  </div>
                  <button
                    onClick={() => speechService.speak(currentItem.japaneseTerm)}
                    className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs font-jp text-amber-300/80">
                  {currentItem.reading}
                </div>

                <div className="text-base text-slate-200 font-semibold pt-1">
                  {currentItem.mannerTitle}
                </div>

                <p className="text-xs text-slate-400">
                  {currentItem.meaning}
                </p>
              </div>

              {/* Useful Phrases */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:w-80 shrink-0 space-y-2">
                <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                  Mẫu câu giao tiếp thực chiến:
                </div>
                <div className="space-y-2">
                  {currentItem.usefulPhrases.map((phrase, idx) => (
                    <div key={idx} className="space-y-0.5 text-xs border-b border-slate-800/60 pb-1.5 last:border-none last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-jp text-slate-200">{phrase.phrase}</span>
                        <button
                          onClick={() => speechService.speak(phrase.phrase)}
                          className="text-amber-400 hover:text-amber-300 p-0.5"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-400">{phrase.usageNote}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step-by-step Etiquette Guide */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Các bước thực hiện chuẩn mực:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {currentItem.culturalExplanation.correctEtiquetteSteps.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-slate-300 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ======================================================== */}
            {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-amber-950/20 border border-amber-500/20 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>Mục Giải Mã Tầng Sâu Triết Lý Ẩm Thực Washoku (Dành Cho Người Chưa Hiểu Rõ Văn Hóa)</span>
                </div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="px-3 py-1.5 rounded-lg bg-amber-600/20 border border-amber-500/40 text-xs text-amber-300 hover:bg-amber-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <span>{showDeepExplanation ? 'Thu gọn phân tích chi tiết' : '🍱 Bấm xem 10 đại kỵ dùng đũa & quy tắc Washoku'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>🙏 Ý nghĩa tâm linh & Triết lý sinh mệnh:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalExplanation.spiritualMeaning}
                  </p>
                </div>

                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-rose-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>⚠️ Hậu quả văn hóa nếu vô tình vi phạm:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalExplanation.whatHappensIfBroken}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">📜 Câu chuyện lịch sử: </span>
                {currentItem.culturalExplanation.historicalStory}
              </div>

              {/* PHẦN CHI TIẾT HƠN MỞ RỘNG */}
              {showDeepExplanation && (
                <div className="pt-4 border-t border-amber-500/20 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Bách Khoa Toàn Thư Nghi Thức Bàn Ăn Washoku Chi Tiết</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Cột 1: Bảng 5 đại kỵ đũa nguy hiểm nhất */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-rose-300 flex items-center gap-1.5">
                        <span>🥢 5 Đại kỵ dùng đũa tối thượng</span>
                      </div>
                      <ul className="text-slate-400 space-y-1 text-[11px] leading-relaxed">
                        <li>
                          <strong className="text-rose-300">1. Hashi-watashi (箸渡し):</strong> Chuyền đồ ăn đũa sang đũa (nghi thức nhặt tro cốt tang lễ).
                        </li>
                        <li>
                          <strong className="text-rose-300">2. Tsukitate-bashi (突き立て箸):</strong> Cắm đũa thẳng đứng vào bát cơm (cơm cúng người chết).
                        </li>
                        <li>
                          <strong className="text-rose-300">3. Yose-bashi (寄せ箸):</strong> Dùng đũa kéo đĩa đựng thức ăn về phía mình.
                        </li>
                        <li>
                          <strong className="text-rose-300">4. Namida-bashi (涙箸):</strong> Để nước sốt nhỏ giọt tong tỏng từ đầu đũa.
                        </li>
                        <li>
                          <strong className="text-rose-300">5. Sashi-bashi (刺し箸):</strong> Dùng đũa xiên thủng miếng thức ăn.
                        </li>
                      </ul>
                    </div>

                    {/* Cột 2: Triết lý Ichiju Sansai */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>🍚 Triết lý Một Canh Ba Món (一汁三菜)</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Quy tắc vàng bài trí mâm cơm chuẩn Nhật:
                      </p>
                      <ul className="text-slate-400 space-y-1 text-[11px]">
                        <li>• <strong>Bên trái:</strong> Bát cơm (Cơm là tinh hoa của đất mẹ, đặt gần tim nhất).</li>
                        <li>• <strong>Bên phải:</strong> Bát canh súp Miso.</li>
                        <li>• <strong>Phía trên:</strong> Món chính (cá, thịt) và 2 món phụ (rau dưa muối).</li>
                        <li>• <strong>Phía trước:</strong> Đôi đũa đặt nằm ngang trên thanh gác đũa, mũi đũa quay về bên trái.</li>
                      </ul>
                    </div>

                    {/* Cột 3: Văn hóa Izakaya */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                        <span>🍻 Nghệ thuật đi nhậu Izakaya</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        • Luôn để ý rót bia cho người ngồi cùng bàn (O-shaku), không tự rót cho mình.
                      </p>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        • Tỷ lệ vàng khi rót bia tươi: <strong>7 phần bia vàng và 3 phần bọt trắng</strong> để giữ kín hương thơm và ngăn khí gas bay hơi.
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
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-amber-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.dishOrOccasion}
                  </span>
                </div>

                <div className="text-xl font-bold font-jp text-white">
                  {item.japaneseTerm}
                </div>

                <div className="text-xs text-amber-400 font-semibold">
                  {item.mannerTitle}
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.meaning}
                </p>
              </div>

              <button
                onClick={() => {
                  const targetIdx = filteredList.findIndex((it) => it.id === item.id);
                  if (targetIdx >= 0) setCurrentIndex(targetIdx);
                  setActiveTab('card');
                }}
                className="w-full mt-2 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-amber-300 hover:border-amber-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
              >
                <span>Chi tiết & quy tắc chuẩn</span>
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
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>Thử Thách Nghi Thức Bàn Ăn Nhật Bản</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Câu {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
              Tình huống bàn tiệc:
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
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Giải thích quy tắc ẩm thực:</span>
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
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer transition-colors"
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
