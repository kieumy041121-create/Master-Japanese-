import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { TatemaeHonneItem } from '../../types/cultural';
import { initialTatemaeHonneList, extraTatemaeHonneList } from '../../data/culturalLearningDatabase';
import { speechService } from '../../services/speechService';
import {
  Sparkles,
  Volume2,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  AlertTriangle,
  RotateCcw,
  Plus,
  ShieldCheck,
  Search,
  MessageSquareQuote,
  Eye,
  Smile,
  Layers,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const TatemaeHonneDecoder: React.FC<Props> = ({ currentLevel }) => {
  const [list, setList] = useState<TatemaeHonneItem[]>(initialTatemaeHonneList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  // Filter list by search query
  const filteredList = list.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.tatemaeSentence.toLowerCase().includes(q) ||
      item.tatemaeMeaning.toLowerCase().includes(q) ||
      item.honneTruth.toLowerCase().includes(q) ||
      item.situation.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  // Function to load 5 more items
  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      // Pick 5 from extra list or duplicate with new IDs
      const nextBatch = extraTatemaeHonneList.map((item, idx) => ({
        ...item,
        id: `th_extra_${Date.now()}_${idx}`,
      }));

      setList((prev) => [...prev, ...nextBatch]);
      setExtraLoadedCount((prev) => prev + 5);
      setIsLoadingMore(false);
      speechService.playSuccessSound();
    }, 400);
  };

  const getNuanceBadge = (nuance: TatemaeHonneItem['nuanceLevel']) => {
    switch (nuance) {
      case 'Báo động nguy hiểm (Kyoto style)':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/50';
      case 'Từ chối khéo léo':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/50';
      case 'Cảnh báo chấn chỉnh':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/50';
      default:
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50';
    }
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
                Tính năng Văn hóa 1/5
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} tình huống thực tế
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Đọc Vị Lời Nói Thật: 建前 (Tatemae) vs 本音 (Honne)</span>
              <Smile className="w-5 h-5 text-indigo-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Giải mã tầng sâu nghệ thuật giao tiếp ẩn dụ, nụ cười xã giao và sự thật trần trụi đằng sau những câu nói lịch thiệp của người Nhật.
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
              <span>Tải thêm +5 tình huống</span>
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
                Thẻ tương tác
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Xem danh sách ({filteredList.length})
              </button>
              <button
                onClick={() => {
                  setSelectedQuizAnswer(null);
                  setActiveTab('quiz');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Thử thách phản xạ
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
              placeholder="Tìm câu nói, tình huống, Kyoto, từ chối khéo..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            💡 Mẹo: Nhấn vào nút "Giải thích văn hóa" để hiểu rõ vì sao người Nhật không nói thẳng.
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: INTERACTIVE DUAL CARD (TATEMAE VS HONNE) */}
      {/* ======================================================== */}
      {activeTab === 'card' && currentItem && (
        <div className="space-y-4">
          {/* Card Carousel Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200">
                Tình huống #{currentIndex + 1} / {filteredList.length}
              </span>
              <span className={`px-2 py-0.5 rounded-full border text-[11px] font-medium ${getNuanceBadge(currentItem.nuanceLevel)}`}>
                {currentItem.nuanceLevel}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono font-bold text-[10px]">
                {currentItem.level}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                  setSelectedQuizAnswer(null);
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Tình huống trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  setSelectedQuizAnswer(null);
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Tình huống tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Scenario Banner */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex items-start gap-3">
            <MessageSquareQuote className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Bối cảnh: {currentItem.speaker}
              </div>
              <div className="text-sm text-slate-200 font-medium">
                {currentItem.situation}
              </div>
            </div>
          </div>

          {/* Split Deck: Tatemae (Bên ngoài) vs Honne (Sự thật bên trong) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TATEMAE (Vẻ ngoài lịch thiệp) */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/30 rounded-2xl p-6 space-y-4 shadow-lg relative">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Smile className="w-4 h-4" />
                  <span>Lời nói xã giao bên ngoài (建前 - Tatemae)</span>
                </div>
                <button
                  onClick={() => speechService.speak(currentItem.tatemaeSentence)}
                  className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors cursor-pointer"
                  title="Phát âm giọng Nhật bản xứ"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold font-jp text-white leading-snug">
                  {currentItem.tatemaeSentence}
                </div>
                <div className="text-xs font-jp text-indigo-300/80">
                  {currentItem.tatemaeReading}
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Nghĩa đen thông thường:</div>
                <div className="text-xs text-slate-200 font-medium">
                  "{currentItem.tatemaeMeaning}"
                </div>
              </div>
            </div>

            {/* HONNE (Sự thật trần trụi) */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/40 border border-rose-500/40 rounded-2xl p-6 space-y-4 shadow-lg relative">
              <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <Eye className="w-4 h-4" />
                  <span>Ý tứ thực sự bên trong (本音 - Honne)</span>
                </div>
                <span className="text-[11px] font-mono text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  Đọc vị chuẩn xác
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-lg md:text-xl font-bold text-rose-200 leading-relaxed">
                  {currentItem.honneTruth}
                </div>
              </div>

              <div className="bg-rose-950/30 border border-rose-900/50 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] text-rose-300 font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Cảnh báo bẫy người nước ngoài:</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  {currentItem.culturalBackground.gaijinTrap}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
          {/* ======================================================== */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>Mục Giải Thích Văn Hóa Chuyên Sâu (Dành Cho Người Chưa Hiểu Rõ Văn Hóa Nhật)</span>
              </div>
              <button
                onClick={() => setShowExplanationModal(!showExplanationModal)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-xs text-indigo-300 hover:bg-indigo-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
              >
                <span>{showExplanationModal ? 'Thu gọn phân tích chi tiết' : '📖 Bấm xem luận giải chi tiết & cẩm nang ứng xử'}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showExplanationModal ? 'rotate-90' : ''}`} />
              </button>
            </div>

            {/* Core Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="font-semibold text-indigo-300 flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>📜 Cội nguồn lịch sử & Bối cảnh hình thành:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {currentItem.culturalBackground.origin}
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="font-semibold text-amber-300 flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>🧠 Tâm lý học người Nhật (Chủ nghĩa Hòa 和 & Tránh xung đột):</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {currentItem.culturalBackground.psychology}
                </p>
              </div>
            </div>

            {/* Safe Response Guide (Mẫu câu đáp lại an toàn & thông minh) */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Mẫu câu đáp lại an toàn & thông minh chuẩn 100%:</span>
                </div>
                <button
                  onClick={() => speechService.speak(currentItem.culturalBackground.safeResponse.sentence)}
                  className="p-1 rounded text-emerald-300 hover:text-emerald-200 cursor-pointer"
                  title="Nghe mẫu câu an toàn"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-sm font-jp font-bold text-emerald-200">
                {currentItem.culturalBackground.safeResponse.sentence}
              </div>
              <div className="text-xs font-jp text-emerald-400/80">
                {currentItem.culturalBackground.safeResponse.reading}
              </div>
              <div className="text-xs text-slate-300 font-medium">
                → {currentItem.culturalBackground.safeResponse.meaning}
              </div>
            </div>

            {/* ================================================================ */}
            {/* PHẦN CHI TIẾT HƠN (KHI BẤM XEM LUẬN GIẢI HOẶC MẶC ĐỊNH MỞ RỘNG) */}
            {/* ================================================================ */}
            {showExplanationModal && (
              <div className="pt-4 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Phân Tích Chi Tiết Đa Chiều & Cẩm Nang Thực Chiến Bản Xứ</span>
                </div>

                {/* 3-Column Detailed Analysis Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Cột 1: So sánh vùng miền (Tokyo vs Kyoto vs Osaka) */}
                  <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="font-bold text-purple-300 flex items-center gap-1.5">
                      <span>🗺️ Khác biệt vùng miền</span>
                    </div>
                    <ul className="text-slate-400 space-y-1.5 text-[11px] leading-relaxed">
                      <li>
                        <strong className="text-purple-200">Kyoto:</strong> Thâm sâu, ẩn dụ bậc thầy. Lời khen hay lời mời thường là tín hiệu ngược lại để giữ thể diện tuyệt đối.
                      </li>
                      <li>
                        <strong className="text-indigo-200">Tokyo:</strong> Giữ khoảng cách chuẩn mực, khách sáo lạnh lùng, ít khi bộc lộ cảm xúc tiêu cực ra mặt.
                      </li>
                      <li>
                        <strong className="text-amber-200">Osaka (Kansai):</strong> Thẳng thắn hơn, coi trọng sự chân thành, hài hước và thích nói đùa để giảm bớt căng thẳng.
                      </li>
                    </ul>
                  </div>

                  {/* Cột 2: Bảng Do's & Don'ts */}
                  <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <span>⚖️ Do's & Don'ts (Nên & Không nên)</span>
                    </div>
                    <div className="space-y-1 text-[11px]">
                      <div className="text-emerald-400 font-semibold">✓ NÊN LÀM:</div>
                      <p className="text-slate-400">
                        Quan sát ánh mắt và cử chỉ ngập ngừng (gãi đầu, nhìn đồng hồ). Tự giác nhún nhường và rút lui trong êm đẹp.
                      </p>
                      <div className="text-rose-400 font-semibold pt-1">✕ TUYỆT ĐỐI TRÁNH:</div>
                      <p className="text-slate-400">
                        Hiểu theo nghĩa đen rồi gặng hỏi dồn dập ngày giờ cụ thể, hoặc bắt đối phương phải giải thích lý do từ chối.
                      </p>
                    </div>
                  </div>

                  {/* Cột 3: Kịch bản cứu nguy & Từ đệm Kushon-kotoba */}
                  <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <span>🛡️ Kịch bản cứu nguy (Damage Control)</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Nếu lỡ nói hớ hoặc nhận ra mình đang làm phiền, hãy dùng ngay từ đệm cứu nguy:
                    </p>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 font-jp text-[11px] text-amber-200">
                      「お忙しいところ恐縮ですが…」
                    </div>
                    <p className="text-slate-500 text-[10px]">
                      (Em biết anh/chị đang bận rộn nhưng em xin mạn phép làm phiền...)
                    </p>
                  </div>
                </div>

                {/* Cultural Psychology Deep-Dive Paragraph */}
                <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-indigo-300">
                    💡 Tại sao người Nhật không bao giờ nói "Không" (いいえ) trực diện?
                  </div>
                  <p className="leading-relaxed text-slate-400">
                    Trong triết học Nhật Bản, từ chối thẳng thừng bị ví như một "nhát dao cảm xúc" cắt đứt bầu không khí hòa thuận (Wa 和). Người Nhật coi việc tạo ra thế "cùng thắng" (win-win) hoặc ít nhất là "giữ gìn lòng tự trọng cho đối phương" là thước đo của một người có học thức cao. Bởi vậy, họ chọn cách làm mờ câu trả lời bằng những từ như <em>ちょっと (chotto)</em>, <em>難しい (muzukashii)</em> hoặc <em>検討します (kentou shimasu)</em> để người nghe tự hiểu và tự rút lui một cách thanh lịch.
                  </p>
                </div>
              </div>
            )}
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
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getNuanceBadge(item.nuanceLevel)}`}>
                    {item.nuanceLevel}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.level}
                  </span>
                </div>

                <div className="text-xs text-slate-400 line-clamp-1">
                  {item.situation}
                </div>

                <div className="text-lg font-bold font-jp text-white">
                  {item.tatemaeSentence}
                </div>

                <div className="text-xs text-slate-400">
                  Nghĩa đen: "{item.tatemaeMeaning}"
                </div>

                <div className="bg-rose-950/30 border border-rose-900/40 rounded-lg p-2.5 text-xs text-rose-200">
                  <span className="font-semibold text-rose-300">Ý thật: </span>
                  {item.honneTruth}
                </div>
              </div>

              <button
                onClick={() => {
                  const targetIdx = filteredList.findIndex((it) => it.id === item.id);
                  if (targetIdx >= 0) setCurrentIndex(targetIdx);
                  setActiveTab('card');
                }}
                className="w-full mt-2 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-indigo-300 hover:border-indigo-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
              >
                <span>Xem chi tiết & giải mã văn hóa</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: QUIZ TEST */}
      {/* ======================================================== */}
      {activeTab === 'quiz' && currentItem && (
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>Thử Thách Đọc Vị Lời Nói Thật Tatemae</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Câu {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
              Tình huống:
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
                <span>Giải thích cội nguồn văn hóa:</span>
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
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Tình huống tiếp theo →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
