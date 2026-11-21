import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { OtakuSubcultureItem } from '../../types/cultural';
import { initialOtakuSubcultureList, extraOtakuSubcultureList } from '../../data/culturalLearningDatabasePart2';
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
  Tv,
  Heart,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  SmilePlus,
  Crown,
  Palette,
} from 'lucide-react';
import { JapaneseFashionGenZLab } from './JapaneseFashionGenZLab';
import { JapaneseBeautyMakeupStudio } from './JapaneseBeautyMakeupStudio';
import { GenZFunFeaturesHub } from './GenZFunFeaturesHub';

interface Props {
  currentLevel?: JLPTLevel;
}

export const OtakuSubcultureHub: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<OtakuSubcultureItem[]>(initialOtakuSubcultureList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeepExplanation, setShowDeepExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'fashion' | 'beauty' | 'arcade' | 'card' | 'grid' | 'quiz'>('fashion');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [extraLoadedCount, setExtraLoadedCount] = useState(0);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const filteredList = list.filter((item) => {
    const q = searchQuery.toLowerCase();
    const meaningText = item.meaning || item.definition || '';
    return (
      item.subcultureTerm.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      meaningText.toLowerCase().includes(q) ||
      item.originCommunity.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraOtakuSubcultureList.map((item, idx) => ({
        ...item,
        id: `ot_extra_${Date.now()}_${idx}`,
      }));

      setList((prev) => [...prev, ...nextBatch]);
      setExtraLoadedCount((prev) => prev + 5);
      setIsLoadingMore(false);
      speechService.playSuccessSound();
    }, 400);
  };

  const getCommunityBadge = (community: OtakuSubcultureItem['originCommunity']) => {
    switch (community) {
      case 'Idol / J-Pop':
        return 'bg-pink-950/80 text-pink-300 border-pink-500/40';
      case 'Anime / Manga':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40';
      case 'Game / VTuber':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/40';
      case 'Cosplay / Comiket':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
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
                Tính năng Chuyên sâu 9/10
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} từ lóng & văn hóa Subculture
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Văn Hóa Otaku, Oshi-katsu & Subculture (推し活 & サブカル)</span>
              <Heart className="w-5 h-5 text-pink-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Giải mã vũ trụ từ lóng anime, idol, manga và net slang của giới trẻ Nhật: Phân biệt rõ cách dùng tự nhiên ngoài đời thực vs những câu thoại quá đà cần tránh (Chunibyou).
            </p>
          </div>

          {/* Action buttons: Load +5 & Switch Tabs */}
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
              <span>Tải thêm +5 từ lóng</span>
              {extraLoadedCount > 0 && (
                <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
                  +{extraLoadedCount}
                </span>
              )}
            </button>

            <div className="p-1 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-1 text-xs overflow-x-auto">
              <button
                onClick={() => setActiveTab('fashion')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'fashion'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/30'
                    : 'text-pink-300 hover:text-white hover:bg-pink-950/40'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-pink-400" />
                <span>Thời Trang Gái Nhật & Shoujo Style</span>
              </button>
              <button
                onClick={() => setActiveTab('beauty')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'beauty'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/30'
                    : 'text-rose-300 hover:text-white hover:bg-rose-950/40'
                }`}
              >
                <Palette className="w-3.5 h-3.5 text-rose-400" />
                <span>💄 Làm Đẹp & Makeup (Studio)</span>
              </button>
              <button
                onClick={() => setActiveTab('arcade')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'arcade'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-purple-300 hover:text-white hover:bg-purple-950/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>🎮 10 Trải Nghiệm Vui & Hữu Ích</span>
              </button>
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
                Từ điển Net slang
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Đố vui Bắt Trend
              </button>
            </div>
          </div>
        </div>

        {/* Search bar for Net slang (shown only when in card, grid, quiz tabs) */}
        {activeTab !== 'fashion' && activeTab !== 'beauty' && activeTab !== 'arcade' && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo từ khóa (推し, 尊い, 沼...), ý nghĩa, cộng đồng..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500/50"
              />
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Khớp: <strong>{filteredList.length}</strong> / {list.length} mục
            </span>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODE 0: THỜI TRANG GÁI NHẬT & SHOUJO STYLE (YÊU CẦU ĐẶC BIỆT) */}
      {/* ======================================================== */}
      {activeTab === 'fashion' && (
        <JapaneseFashionGenZLab
          currentLevel={_currentLevel}
          onOpenBeautyStudio={() => setActiveTab('beauty')}
          onOpenFunArcade={() => setActiveTab('arcade')}
        />
      )}

      {/* ======================================================== */}
      {/* MODE 0.5: LÀM ĐẸP & MAKEUP STUDIO (TAB RIÊNG CHUYÊN SÂU HOÀN HẢO) */}
      {/* ======================================================== */}
      {activeTab === 'beauty' && (
        <JapaneseBeautyMakeupStudio
          onOpenFashionStudio={() => setActiveTab('fashion')}
          onOpenFunArcade={() => setActiveTab('arcade')}
        />
      )}

      {/* ======================================================== */}
      {/* MODE 0.8: 10 TÍNH NĂNG TỰ ĐỀ XUẤT HỮU ÍCH & VUI VẺ */}
      {/* ======================================================== */}
      {activeTab === 'arcade' && (
        <GenZFunFeaturesHub
          onBackToCultureHub={() => setActiveTab('fashion')}
          onOpenFashionStudio={() => setActiveTab('fashion')}
          onOpenBeautyStudio={() => setActiveTab('beauty')}
        />
      )}

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
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${getCommunityBadge(currentItem.originCommunity)}`}>
                    {currentItem.originCommunity}
                  </span>
                  {currentItem.sinoVietnamese && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-800 text-pink-300">
                      Hán Việt: {currentItem.sinoVietnamese}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">
                    Mục {currentIndex + 1} / {filteredList.length}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <h2 className="text-2xl md:text-3xl font-extrabold font-jp text-pink-100 tracking-tight">
                    {currentItem.subcultureTerm}
                  </h2>
                  <button
                    onClick={() => speechService.speak(currentItem.subcultureTerm)}
                    className="p-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 transition cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs text-slate-400 font-jp">
                  {currentItem.reading}
                </div>
                <div className="text-sm font-semibold text-slate-200 pt-0.5">
                  {currentItem.meaning || currentItem.definition}
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

            {/* Warning: Anime vs Real Life */}
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-rose-300">Cảnh báo đời thực (Anime vs Real Life): </span>
                <span className="text-slate-200 leading-relaxed">{currentItem.animeVsRealLifeWarning}</span>
              </div>
            </div>

            {/* Sample Dialogue */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Tv className="w-4 h-4 text-pink-400" />
                  <span>Mẫu đối thoại Otaku thực tế:</span>
                </div>
                <button
                  onClick={() => speechService.speak(`${currentItem.sampleDialogue.lineA}. ${currentItem.sampleDialogue.lineB}`)}
                  className="p-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 transition cursor-pointer"
                  title="Nghe trọn vẹn đối thoại"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1">
                  <div className="font-semibold text-slate-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-pink-600/30 text-pink-300 flex items-center justify-center font-bold text-[10px]">A</span>
                    <span className="font-jp text-slate-100 font-bold">{currentItem.sampleDialogue.lineA}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1">
                  <div className="font-semibold text-slate-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-[10px]">B</span>
                    <span className="font-jp text-slate-100 font-bold">{currentItem.sampleDialogue.lineB}</span>
                  </div>
                </div>

                <div className="text-[11px] text-pink-300 pt-1 italic">
                  💡 Nhận định: {currentItem.sampleDialogue.interpretation}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-pink-950/20 border border-pink-500/20 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-pink-400" />
                  <span>Mục Giải Mã Tầng Sâu Văn Hóa Subculture (Dành Cho Người Chưa Hiểu Rõ Văn Hóa)</span>
                </div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="px-3 py-1.5 rounded-lg bg-pink-600/20 border border-pink-500/40 text-xs text-pink-300 hover:bg-pink-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <span>{showDeepExplanation ? 'Thu gọn phân tích chi tiết' : '💖 Bấm xem tâm lý Ibasho & kinh tế Oshi-katsu'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* 2 Cột lý thuyết cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                    <span>🏡 Tâm lý "Chốn dung thân an toàn" (Ibasho 居場所):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.ibashoPsychology}
                  </p>
                </div>

                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-purple-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>🗾 Phong tục hành hương thánh địa Anime (Seichi Junrei):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalDeepDive.sacredPilgrimageCustom}
                  </p>
                </div>
              </div>

              {/* Tác động kinh tế & Cách dùng an toàn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-lg text-slate-300">
                  <span className="font-bold text-amber-300">💰 Tác động kinh tế ngàn tỷ yên: </span>
                  {currentItem.culturalDeepDive.economicImpact}
                </div>
                <div className="bg-pink-950/20 border border-pink-500/30 p-3 rounded-lg text-slate-300">
                  <span className="font-bold text-pink-300">✨ Cách ứng dụng thời thượng: </span>
                  {currentItem.culturalDeepDive.safeUsageInModernJapan}
                </div>
              </div>

              {/* PHẦN CHI TIẾT HƠN MỞ RỘNG */}
              {showDeepExplanation && (
                <div className="pt-4 border-t border-pink-500/20 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span>Cẩm Nang Từ Lóng & Trend Subculture Hiện Đại Nhật Bản</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Cột 1: Oshi-katsu */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-pink-300 flex items-center gap-1.5">
                        <span>💖 1. Vũ trụ "Đu Idol" (Oshi)</span>
                      </div>
                      <ul className="text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
                        <li>• <strong>推し (Oshi):</strong> Nhân vật hoặc thần tượng mình yêu mến, ủng hộ hết lòng.</li>
                        <li>• <strong>推し活 (Oshi-katsu):</strong> Toàn bộ hoạt động mua goods, đi concert, chụp ảnh cùng standee của Oshi.</li>
                        <li>• <strong>尊い (Toutoi):</strong> Cảm xúc tôn sùng tột đỉnh trước sự dễ thương hay vẻ đẹp của Oshi.</li>
                      </ul>
                    </div>

                    {/* Cột 2: Net Slang giới trẻ */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                        <span>💬 2. Ngôn ngữ mạng Internet (Net slang)</span>
                      </div>
                      <ul className="text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
                        <li>• <strong>草 (Kusa) / www:</strong> Cười bể bụng (chữ w viết tắt của Warai, nhìn giống thảm cỏ "Kusa").</li>
                        <li>• <strong>沼 (Numa - Đầm lầy):</strong> Đam mê một sở thích đến mức lún sâu không thể dứt ra được.</li>
                        <li>• <strong>わかりみ (Wakarimi):</strong> Đồng cảm sâu sắc, cực kỳ thấu hiểu ý của bạn.</li>
                      </ul>
                    </div>

                    {/* Cột 3: Hội chứng Chunibyou */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>⚠️ 3. Tránh hội chứng Chunibyou</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • <strong>中二病 (Chunibyou):</strong> Ảo tưởng mình có siêu năng lực hoặc bắt chước phong cách anime hắc ám.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • <strong>Lời khuyên:</strong> Không dùng đại từ "Ore-sama", "Kisama", "Omae" hay các câu thề thốt đao to búa lớn khi giao tiếp đời thường.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Mini Quiz on Card */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-pink-400" />
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
              className="bg-slate-900/90 border border-slate-800 hover:border-pink-500/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getCommunityBadge(item.originCommunity)}`}>
                  {item.originCommunity}
                </span>
                <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
              </div>

              <div className="space-y-1">
                <div className="text-xl font-bold font-jp text-pink-100 group-hover:text-pink-300 transition-colors">
                  {item.subcultureTerm}
                </div>
                <div className="text-[11px] text-slate-400 font-jp">
                  {item.reading}
                </div>
                <div className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
                  {item.meaning || item.definition}
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-rose-300/90 line-clamp-1">
                ⚠️ {item.animeVsRealLifeWarning}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-pink-400 group-hover:underline flex items-center gap-1 font-semibold">
                  Xem đối thoại mẫu <ArrowRight className="w-3 h-3" />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speechService.speak(item.subcultureTerm);
                  }}
                  className="p-1 hover:text-pink-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Load More 5 button inside Grid tab */}
          <div className="col-span-full pt-4 flex justify-center">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-pink-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingMore ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>Tải thêm +5 từ lóng ({list.length} từ hiện có)</span>
            </button>
          </div>
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
                <span>Đố Vui Bắt Trend Subculture & Tiếng Lóng Giới Trẻ</span>
                <Sparkles className="w-5 h-5 text-pink-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Thử thách mức độ bắt trend văn hóa hiện đại Nhật Bản: Bạn có phải là chuyên gia Subculture?
              </p>
            </div>
            <span className="text-xs font-mono text-pink-400">
              Câu hỏi: {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          {currentItem && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                  Thuật ngữ: {currentItem.subcultureTerm} ({currentItem.reading})
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
                  <div className="font-bold text-pink-300">Giải thích chuyên sâu:</div>
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
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold cursor-pointer"
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
