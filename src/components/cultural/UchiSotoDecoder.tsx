import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { UchiSotoItem } from '../../types/cultural';
import { initialUchiSotoList, extraUchiSotoList } from '../../data/culturalLearningDatabasePart2';
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
  ShieldCheck,
  Search,
  Users,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  Compass,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const UchiSotoDecoder: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<UchiSotoItem[]>(initialUchiSotoList);
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
      item.contextTitle.toLowerCase().includes(q) ||
      item.correctKeigoSentence.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.relationType.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraUchiSotoList.map((item, idx) => ({
        ...item,
        id: `us_extra_${Date.now()}_${idx}`,
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
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Tính năng Chuyên sâu 6/10
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} tình huống thực tế
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Ranh Giới Uchi - Soto & Kính Ngữ Phân Tầng (内と外)</span>
              <Users className="w-5 h-5 text-cyan-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Làm chủ la bàn tâm lý Trong - Ngoài (Uchi - Soto): Tuyệt đối không dùng kính ngữ tôn sùng người phe mình (dù là Giám đốc hay Bố mẹ) trước mặt đối tác bên ngoài!
            </p>
          </div>

          {/* Action buttons: Load +5 & Switch Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-cyan-600/25 transition-all cursor-pointer disabled:opacity-50"
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
                  activeTab === 'card' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Thẻ tương tác
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'grid' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Bảng phân tầng
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Đố vui phản xạ
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
              placeholder="Tìm theo bối cảnh, câu kính ngữ, nhân vật, vai vế..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
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
            {/* Context & Roles */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                    {currentItem.relationType}
                  </span>
                  <span className="text-xs text-slate-400">
                    Mục {currentIndex + 1} / {filteredList.length}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white">
                  {currentItem.contextTitle}
                </h2>
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

            {/* Speaker & Target Person */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Vai người nói:</span>
                <span className="font-semibold text-slate-200">{currentItem.speakerRole}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Đối tượng được nói tới:</span>
                <span className="font-semibold text-cyan-300">{currentItem.targetPerson}</span>
              </div>
            </div>

            {/* Comparison Grid: Câu chuẩn mực vs Sai lầm tai hại */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box 1: Câu dùng chuẩn mực */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Cách dùng chuẩn mực Uchi-Soto:</span>
                  </div>
                  <button
                    onClick={() => speechService.speak(currentItem.correctKeigoSentence)}
                    className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition cursor-pointer"
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-base md:text-lg font-bold font-jp text-emerald-100">
                    {currentItem.correctKeigoSentence}
                  </div>
                  <div className="text-xs text-slate-400 font-jp">
                    {currentItem.reading}
                  </div>
                  <div className="text-xs text-emerald-300 font-medium pt-1">
                    → Ý nghĩa: {currentItem.meaning}
                  </div>
                </div>
              </div>

              {/* Box 2: Sai lầm tai hại */}
              <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Lỗi sai người ngoại quốc hay mắc:</span>
                  </div>
                  <button
                    onClick={() => speechService.speak(currentItem.commonMistakeSentence.split('（')[0])}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition cursor-pointer"
                    title="Nghe câu sai để nhận diện"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm md:text-base font-semibold font-jp text-rose-200">
                    {currentItem.commonMistakeSentence}
                  </div>
                  <p className="text-xs text-rose-300/90 leading-relaxed bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/50">
                    <strong>Giải thích nguyên do sai:</strong> {currentItem.mistakeExplanation}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Summary Rule */}
            <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-4 flex items-start gap-3">
              <Compass className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-cyan-300">Quy tắc vàng phân tầng: </span>
                <span className="text-slate-300">{currentItem.culturalDeepDive.keigoRuleSummary}</span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-cyan-950/20 border border-cyan-500/20 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <span>Mục Giải Mã Tầng Sâu Ranh Giới Uchi-Soto (Dành Cho Người Chưa Hiểu Rõ Văn Hóa)</span>
                </div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600/20 border border-cyan-500/40 text-xs text-cyan-300 hover:bg-cyan-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <span>{showDeepExplanation ? 'Thu gọn phân tích chi tiết' : '🔍 Bấm xem ma trận ranh giới & mẹo cứu nguy'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* 2 Cột lý thuyết cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span>🧠 Tâm lý ranh giới Trong (Uchi) vs Ngoài (Soto):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.psychologicalBoundary}
                  </p>
                </div>

                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>🏯 Cội nguồn chế độ gia tộc (Ie 制度) thời phong kiến:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.historicalOrigin}
                  </p>
                </div>
              </div>

              {/* Mẹo cứu nguy khi lỡ miệng */}
              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 bg-amber-950/20 p-3 rounded-lg border border-amber-500/30">
                <span className="font-bold text-amber-300">🚨 Mẹo cứu nguy ngoại giao nếu lỡ dùng nhầm tôn kính ngữ cho sếp: </span>
                {currentItem.culturalDeepDive.damageControlTip}
              </div>

              {/* PHẦN CHI TIẾT HƠN MỞ RỘNG */}
              {showDeepExplanation && (
                <div className="pt-4 border-t border-cyan-500/20 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Ma Trận Xưng Hô Tuyệt Đối Theo Cặp Đối Ngẫu Uchi - Soto</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Cột 1: Xưng hô Gia Đình */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                        <span>👨‍👩‍👧 1. Khi nói về Gia đình</span>
                      </div>
                      <ul className="text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
                        <li>• <strong>Bố:</strong> Người nhà mình là <span className="text-cyan-300 font-bold">父 (Chichi)</span>, nhà người khác là <span className="text-amber-300 font-bold">お父様 (Otousama)</span>.</li>
                        <li>• <strong>Mẹ:</strong> Người nhà mình là <span className="text-cyan-300 font-bold">母 (Haha)</span>, nhà người khác là <span className="text-amber-300 font-bold">お母様 (Okaasama)</span>.</li>
                        <li>• <strong>Chồng:</strong> Chồng mình là <span className="text-cyan-300 font-bold">夫 / 主人 (Otto / Shujin)</span>, chồng đối phương là <span className="text-amber-300 font-bold">ご主人様 (Goshujinsama)</span>.</li>
                        <li>• <strong>Vợ:</strong> Vợ mình là <span className="text-cyan-300 font-bold">妻 / 家内 (Tsuma / Kanai)</span>, vợ đối phương là <span className="text-amber-300 font-bold">奥様 (Okusama)</span>.</li>
                      </ul>
                    </div>

                    {/* Cột 2: Xưng hô Công Sở */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-blue-300 flex items-center gap-1.5">
                        <span>🏢 2. Khi nói về Công sở B2B</span>
                      </div>
                      <ul className="text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
                        <li>• Với người ngoài: Tổng Giám đốc công ty mình chỉ gọi là <span className="text-cyan-300 font-bold">"Yamada" (Họ trống không)</span>, tuyệt đối không gọi "Yamada Shachou" hay "Yamada-san".</li>
                        <li>• Công ty mình gọi là: <span className="text-cyan-300 font-bold">弊社 (Heisha) / わたくしども (Watakushidomo)</span>.</li>
                        <li>• Công ty đối tác gọi là: <span className="text-amber-300 font-bold">貴社 (Kisha - văn viết) / 御社 (Onsha - văn nói)</span>.</li>
                      </ul>
                    </div>

                    {/* Cột 3: Động từ Khiêm nhường */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                        <span>🗣️ 3. Động từ Uchi (Khiêm nhường)</span>
                      </div>
                      <ul className="text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
                        <li>• <strong>Đi/Đến:</strong> Mại rimasu (参ります).</li>
                        <li>• <strong>Ở/Có mặt:</strong> Orimasu (おります).</li>
                        <li>• <strong>Nói:</strong> Moushimasu (申します).</li>
                        <li>• <strong>Ăn/Uống:</strong> Itadakimasu (いただきます).</li>
                        <li>• <strong>Gặp:</strong> O-me ni kakarimasu (お目にかかります).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Mini Quiz on Card */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
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
      {/* MODE 2: GRID MATRIX VIEW */}
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
              className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {item.relationType.split(' ')[0]}
                </span>
                <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                  {item.contextTitle}
                </div>
                <div className="text-[11px] text-slate-400">
                  Đối tượng: <strong className="text-slate-300">{item.targetPerson}</strong>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1 text-xs">
                <div className="font-bold font-jp text-emerald-300 line-clamp-1">
                  ✓ {item.correctKeigoSentence}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1">
                  {item.meaning}
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-cyan-400 group-hover:underline flex items-center gap-1 font-semibold">
                  Xem chi tiết & giải mã <ArrowRight className="w-3 h-3" />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speechService.speak(item.correctKeigoSentence);
                  }}
                  className="p-1 hover:text-cyan-300"
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
                <span>Đố Vui Phản Xạ Kính Ngữ Uchi - Soto</span>
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Luyện phản xạ xưng hô chuẩn xác: Thăng cấp trực giác giao tiếp trong 3 giây.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              Câu hỏi: {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          {currentItem && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Bối cảnh: {currentItem.contextTitle}
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
                  <div className="font-bold text-cyan-300">Giải thích chuyên sâu:</div>
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
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
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
