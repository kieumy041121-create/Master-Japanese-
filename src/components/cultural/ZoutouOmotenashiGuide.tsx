import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { ZoutouOmotenashiItem } from '../../types/cultural';
import { initialZoutouList, extraZoutouList } from '../../data/culturalLearningDatabase';
import { speechService } from '../../services/speechService';
import {
  Sparkles,
  Volume2,
  Gift,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Plus,
  RotateCcw,
  Search,
  AlertTriangle,
  Heart,
  Ban,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const ZoutouOmotenashiGuide: React.FC<Props> = ({ currentLevel }) => {
  const [list, setList] = useState<ZoutouOmotenashiItem[]>(initialZoutouList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  // Filter list
  const filteredList = list.filter((item) => {
    const matchEvent = selectedEvent === 'all' || item.event.includes(selectedEvent);
    const q = searchQuery.toLowerCase();
    const matchSearch =
      item.ritualTitle.toLowerCase().includes(q) ||
      item.japaneseTerm.toLowerCase().includes(q) ||
      item.envelopeOrWrappingRule.toLowerCase().includes(q) ||
      item.event.toLowerCase().includes(q);
    return matchEvent && matchSearch;
  });

  const currentItem = filteredList[currentIndex] || list[0];

  // Load more 5 items
  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraZoutouList.map((item, idx) => ({
        ...item,
        id: `zt_extra_${Date.now()}_${idx}`,
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
                Tính năng Văn hóa 5/5
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} nghi thức quà tặng & lễ nghi
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Nghệ Thuật Quà Tặng, Lễ Nghi Giao Tế & Omotenashi (贈答・おもてなし)</span>
              <Gift className="w-5 h-5 text-rose-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Làm chủ văn hóa quà tặng Zoutou: quy tắc phong bì Noshi, nơ Mizuhiki, tiền mừng cưới số lẻ, tiền phúng viếng mực nhạt và tinh thần hiếu khách vô điều kiện Omotenashi.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-rose-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingMore ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>Tải thêm +5 nghi lễ quà tặng</span>
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
                Thẻ tương tác
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'grid' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
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
                  activeTab === 'quiz' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Đố vui quà tặng
              </button>
            </div>
          </div>
        </div>

        {/* Filter event pills & Search */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-slate-500 font-semibold mr-1">Dịp:</span>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'Omiyage', label: '🎁 Omiyage du lịch' },
              { id: 'Goshuugi', label: '💍 Tiền mừng cưới' },
              { id: 'Kouden', label: '🕊️ Tiền phúng viếng' },
              { id: 'Ochugen', label: '🍉 Quà Ochugen/Oseibo' },
              { id: 'Okaeshi', label: '🔄 Quy tắc đáp lễ' },
            ].map((ev) => (
              <button
                key={ev.id}
                onClick={() => {
                  setSelectedEvent(ev.id);
                  setCurrentIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg border font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  selectedEvent === ev.id
                    ? 'bg-rose-600/30 border-rose-500 text-rose-200 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {ev.label}
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
              placeholder="Tìm phong bì, Noshi, Mizuhiki..."
              className="w-full pl-8 pr-3 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
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
                Nghi lễ #{currentIndex + 1} / {filteredList.length}
              </span>
              <span className="px-2 py-0.5 rounded-full border border-rose-500/30 text-rose-300 bg-rose-500/10 font-medium">
                {currentItem.event}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                Ngân sách: {currentItem.budgetRange}
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

          {/* Presentation Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="text-2xl md:text-3xl font-bold font-jp text-white">
                    {currentItem.japaneseTerm}
                  </div>
                  <button
                    onClick={() => speechService.speak(currentItem.japaneseTerm)}
                    className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs font-jp text-rose-300/80">
                  {currentItem.reading}
                </div>

                <div className="text-base text-slate-200 font-semibold pt-1">
                  {currentItem.ritualTitle}
                </div>

                <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="font-semibold text-rose-400">Quy tắc phong bì / Bao bì Noshi: </span>
                  {currentItem.envelopeOrWrappingRule}
                </div>
              </div>

              {/* Recommended Greetings */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:w-80 shrink-0 space-y-2">
                <div className="text-[11px] text-rose-400 font-bold uppercase tracking-wider">
                  Mẫu câu trao quà & thiệp chúc:
                </div>
                <div className="space-y-2">
                  {currentItem.recommendedGreetings.map((greet, idx) => (
                    <div key={idx} className="space-y-1 text-xs border-b border-slate-800/60 pb-2 last:border-none last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-jp text-slate-100">{greet.japanese}</span>
                        <button
                          onClick={() => speechService.speak(greet.japanese)}
                          className="text-rose-400 hover:text-rose-300 p-0.5"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-400 font-jp">{greet.reading}</div>
                      <div className="text-[11px] text-rose-300/90 font-medium">→ {greet.meaning}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Taboo Items Alert Checklist */}
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 space-y-3">
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <Ban className="w-4 h-4 text-rose-400" />
                <span>Những vật phẩm & con số cấm kỵ tuyệt đối:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {currentItem.culturalDeepDive.tabooItemsOrNumbers.map((taboo, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-rose-900/50 text-slate-300 flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{taboo}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ======================================================== */}
            {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-rose-950/20 border border-rose-500/20 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-rose-400" />
                  <span>Mục Giải Mã Tầng Sâu Văn Hóa Quà Tặng & Omotenashi (Dành Cho Người Chưa Hiểu Rõ Văn Hóa)</span>
                </div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/20 border border-rose-500/40 text-xs text-rose-300 hover:bg-rose-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <span>{showDeepExplanation ? 'Thu gọn phân tích chi tiết' : '🎁 Bấm xem phân biệt nơ Mizuhiki & cẩm nang phong bì'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>⚖️ Quy luật đáp lễ (Quy tắc Han-gaeshi & Cán cân ân nghĩa):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.reciprocityLaw}
                  </p>
                </div>

                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>📦 Vì sao người Nhật KHÔNG BAO GIỜ bóc quà trước mặt người tặng:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.whyNeverOpenInFront}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 bg-rose-950/30 p-3 rounded-lg border border-rose-500/20">
                <span className="font-bold text-rose-300">✨ Tinh thần Omotenashi vô điều kiện: </span>
                {currentItem.culturalDeepDive.omotenashiPhilosophy}
              </div>

              {/* PHẦN CHI TIẾT HƠN MỞ RỘNG */}
              {showDeepExplanation && (
                <div className="pt-4 border-t border-rose-500/20 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Bách Khoa Phong Bì Noshi & Cẩm Nang Tiền Mừng Chi Tiết</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Cột 1: Nơ Mizuhiki */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-rose-300 flex items-center gap-1.5">
                        <span>🎀 Phân biệt nơ Mizuhiki sống còn</span>
                      </div>
                      <ul className="text-slate-400 space-y-1.5 text-[11px] leading-relaxed">
                        <li>
                          • <strong className="text-rose-200">Chousubi (蝶結び - Nơ bướm):</strong> Tháo mở buộc lại được, dùng cho dịp vui mong lặp lại (sinh con, đỗ đạt, thăng chức).
                        </li>
                        <li>
                          • <strong className="text-rose-200">Musubikiri (結び切り - Nơ thắt chết):</strong> Buộc chặt vĩnh viễn, CHỈ DÙNG 1 LẦN cho ĐÁM CƯỚI và TANG LỄ. Tuyệt đối cấm dùng nơ bướm cho đám cưới!
                        </li>
                      </ul>
                    </div>

                    {/* Cột 2: Bảng tra cứu tiền mừng cưới */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>💍 Định mức tiền mừng cưới Goshuugi</span>
                      </div>
                      <ul className="text-slate-400 space-y-1 text-[11px]">
                        <li>• <strong>Bạn bè / Đồng nghiệp:</strong> 3 man (30,000 yên).</li>
                        <li>• <strong>Sếp / Khách hàng VIP:</strong> 5 man (50,000 yên).</li>
                        <li>• <strong>Anh em / Họ hàng:</strong> 5 - 10 man.</li>
                        <li>• <em>Bắt buộc dùng số lẻ và tờ tiền mới tinh (Shin-satsu)!</em></li>
                      </ul>
                    </div>

                    {/* Cột 3: Tinh thần Omotenashi */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                        <span>🍵 Triết lý Omotenashi đỉnh cao</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        "Omote-ura nashi" (表裏なし) — Mặt trước mặt sau như một, tiếp đãi khách bằng tấm lòng thuần khiết nhất. Người phục vụ lường trước từng mong muốn nhỏ bé của khách để đáp ứng hoàn hảo trước khi khách kịp mở lời.
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
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-rose-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded border border-rose-500/30 text-rose-300 bg-rose-500/10 font-semibold">
                    {item.event}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.budgetRange}
                  </span>
                </div>

                <div className="text-xl font-bold font-jp text-white">
                  {item.japaneseTerm}
                </div>

                <div className="text-xs text-rose-400 font-semibold">
                  {item.ritualTitle}
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.envelopeOrWrappingRule}
                </p>
              </div>

              <button
                onClick={() => {
                  const targetIdx = filteredList.findIndex((it) => it.id === item.id);
                  if (targetIdx >= 0) setCurrentIndex(targetIdx);
                  setActiveTab('card');
                }}
                className="w-full mt-2 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-rose-300 hover:border-rose-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
              >
                <span>Chi tiết & quy tắc tặng</span>
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
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>Đố Vui Lễ Nghi Quà Tặng Zoutou Bunka</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Câu {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="text-xs text-rose-400 font-semibold uppercase tracking-wider">
              Nghi lễ văn hóa:
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
              <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Giải thích lễ nghi giao tế:</span>
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
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer transition-colors"
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
