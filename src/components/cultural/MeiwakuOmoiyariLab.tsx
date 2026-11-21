import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { MeiwakuOmoiyariItem } from '../../types/cultural';
import { initialMeiwakuList, extraMeiwakuList } from '../../data/culturalLearningDatabase';
import { speechService } from '../../services/speechService';
import {
  Sparkles,
  Volume2,
  Users,
  Compass,
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
  AlertTriangle,
  HeartHandshake,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const MeiwakuOmoiyariLab: React.FC<Props> = ({ currentLevel }) => {
  const [list, setList] = useState<MeiwakuOmoiyariItem[]>(initialMeiwakuList);
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
      item.conceptName.toLowerCase().includes(q) ||
      item.sinoVietnamese.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      item.realLifeDilemma.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  // Load more 5 items
  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraMeiwakuList.map((item, idx) => ({
        ...item,
        id: `mw_extra_${Date.now()}_${idx}`,
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
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Tính năng Văn hóa 4/5
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Số lượng: {list.length} quy chuẩn ứng xử xã hội
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Chuẩn Mực Ứng Xử, Đọc Bầu Không Khí & Lòng Chu Đáo (迷惑・空気・思いやり)</span>
              <Compass className="w-5 h-5 text-teal-400" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Thấu hiểu tư duy cốt lõi định hình nhân cách người Nhật: quy tắc vàng "Không làm phiền" (Meiwaku), văn hóa xấu hổ (Haji), đọc vị tình thế (KY) và thấu cảm thầm lặng (Omoiyari).
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-teal-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingMore ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>Tải thêm +5 tình huống ứng xử</span>
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
                  activeTab === 'card' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tình huống thực tế
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'grid' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tổng hợp ({filteredList.length})
              </button>
              <button
                onClick={() => {
                  setSelectedQuizAnswer(null);
                  setActiveTab('quiz');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Trắc nghiệm ứng xử
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
              placeholder="Tìm meiwaku, đọc bầu không khí, omoiyari, tàu điện..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            🤝 Mẹo: Đọc phần "Lời khuyên sinh tồn" để tránh bị mang tiếng là "KY" khi sống tại Nhật.
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
                Chuẩn mực #{currentIndex + 1} / {filteredList.length}
              </span>
              <span className="px-2 py-0.5 rounded-full border border-teal-500/30 text-teal-300 bg-teal-500/10 font-medium">
                {currentItem.sinoVietnamese}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                  setSelectedQuizAnswer(null);
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Chuẩn mực trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                  setSelectedQuizAnswer(null);
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Chuẩn mực tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="text-2xl md:text-4xl font-bold font-jp text-white">
                    {currentItem.conceptName}
                  </div>
                  <button
                    onClick={() => speechService.speak(currentItem.conceptName)}
                    className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition-colors cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs font-jp text-teal-300/80">
                  {currentItem.reading}
                </div>

                <div className="text-sm text-slate-200 font-medium leading-relaxed pt-1">
                  {currentItem.definition}
                </div>
              </div>

              {/* Japanese Mindset Widget */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:w-80 shrink-0 space-y-1.5">
                <div className="text-[11px] text-teal-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Cách người Nhật suy nghĩ:</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  {currentItem.japaneseMindset}
                </div>
              </div>
            </div>

            {/* Dilemma Simulator */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 space-y-3">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Tình huống nan giải trong đời thực:</span>
              </div>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                {currentItem.realLifeDilemma}
              </p>
            </div>

            {/* Simulated Dialogue */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="text-[11px] text-teal-400 font-bold uppercase tracking-wider">
                Mô phỏng hội thoại điển hình:
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-semibold">{currentItem.dialogueSimulation.roleA}:</div>
                  <div className="text-slate-200 font-jp font-medium">{currentItem.dialogueSimulation.lineA}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-500/30 space-y-1">
                  <div className="text-teal-300 font-semibold">{currentItem.dialogueSimulation.roleB}:</div>
                  <div className="text-teal-100 font-jp font-medium">{currentItem.dialogueSimulation.lineB}</div>
                </div>
                <div className="text-[11px] text-slate-400 italic pt-1">
                  💡 Nhận định: {currentItem.dialogueSimulation.interpretation}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* MỤC GIẢI THÍCH KHI NGƯỜI HỌC CHƯA HIỂU RÕ VỀ VĂN HÓA ĐÓ */}
            {/* ======================================================== */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-teal-950/20 border border-teal-500/20 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-teal-400" />
                  <span>Mục Giải Mã Tầng Sâu Xã Hội Học Nhật Bản (Dành Cho Người Chưa Hiểu Rõ Văn Hóa)</span>
                </div>
                <button
                  onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600/20 border border-teal-500/40 text-xs text-teal-300 hover:bg-teal-600/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <span>{showDeepExplanation ? 'Thu gọn phân tích chi tiết' : '🧭 Bấm xem hình phạt Mura-hachibu & cẩm nang KY'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span>🌾 Bối cảnh làng xã lúa nước & Sự phụ thuộc cộng đồng:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalExplanation.socialContractOrigin}
                  </p>
                </div>

                <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>🎭 "Văn hóa Xấu hổ" (Haji) vs "Văn hóa Tội lỗi" (Guilt):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentItem.culturalExplanation.shameCultureAnalysis}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 bg-teal-950/30 p-3 rounded-lg border border-teal-500/20">
                <span className="font-bold text-teal-300">💡 Lời khuyên vàng để người nước ngoài không bị cô lập: </span>
                {currentItem.culturalExplanation.foreignerSurvivalAdvice}
              </div>

              {/* PHẦN CHI TIẾT HƠN MỞ RỘNG */}
              {showDeepExplanation && (
                <div className="pt-4 border-t border-teal-500/20 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>Luận Giải Xã Hội Học & Cẩm Nang Hội Nhập Toàn Diện</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Cột 1: Mura-hachibu */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-rose-300 flex items-center gap-1.5">
                        <span>🏚️ Nguồn gốc nỗi sợ Mura-hachibu</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Thời Edo, người vi phạm quy ước làng sẽ bị cắt đứt 8/10 mối liên hệ xã hội (chỉ cứu viện khi có hỏa hoạn và tang ma). Nỗi ám ảnh bị tập thể ruồng bỏ này là nguồn gốc sâu xa khiến người Nhật luôn thận trọng tối đa để "không làm phiền" (Meiwaku).
                      </p>
                    </div>

                    {/* Cột 2: Cẩm nang tàu điện & chung cư */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-teal-300 flex items-center gap-1.5">
                        <span>🚇 3 Quy tắc vàng không làm phiền</span>
                      </div>
                      <ul className="text-slate-400 space-y-1 text-[11px] leading-relaxed">
                        <li>• <strong>Trên tàu điện:</strong> Đeo balo trước ngực, tuyệt đối không nghe điện thoại dù là việc gấp.</li>
                        <li>• <strong>Tại chung cư (Mansion):</strong> Đi nhẹ chân, không giặt đồ hoặc hút bụi sau 21h.</li>
                        <li>• <strong>Phân loại rác:</strong> Rửa sạch chai nhựa PET, bóc vỏ nhãn và vứt đúng ngày quy định.</li>
                      </ul>
                    </div>

                    {/* Cột 3: Kỹ năng đọc bầu không khí (KY) */}
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>👁️ 3 Cấp độ đọc bầu không khí (KY)</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        • Cấp 1: Nhận diện khoảng lặng ngập ngừng của người đối thoại.
                      </p>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        • Cấp 2: Quan sát ánh mắt và cử chỉ ngôn ngữ cơ thể.
                      </p>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        • Cấp 3: Chủ động hỗ trợ việc chung trước khi có ai lên tiếng yêu cầu.
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
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-teal-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded border border-teal-500/30 text-teal-300 bg-teal-500/10 font-semibold">
                    {item.sinoVietnamese}
                  </span>
                  <button
                    onClick={() => speechService.speak(item.conceptName)}
                    className="p-1 rounded text-slate-400 hover:text-teal-300 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-xl font-bold font-jp text-white">
                  {item.conceptName}
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.definition}
                </p>

                <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2 text-[11px] text-slate-400 line-clamp-2">
                  <span className="text-amber-400 font-semibold">Tình huống: </span>
                  {item.realLifeDilemma}
                </div>
              </div>

              <button
                onClick={() => {
                  const targetIdx = filteredList.findIndex((it) => it.id === item.id);
                  if (targetIdx >= 0) setCurrentIndex(targetIdx);
                  setActiveTab('card');
                }}
                className="w-full mt-2 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-teal-300 hover:border-teal-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
              >
                <span>Xem chi tiết & giải mã văn hóa</span>
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
            <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>Thử Thách Chuẩn Mực Ứng Xử Xã Hội Nhật</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Câu {currentIndex + 1} / {filteredList.length}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
              Tình huống xã hội:
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
              <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Giải thích chuẩn mực ứng xử:</span>
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
                  className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold cursor-pointer transition-colors"
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
