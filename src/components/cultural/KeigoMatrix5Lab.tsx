import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { KeigoMatrix5Item } from '../../types/cultural';
import { initialKeigoMatrix5List, extraKeigoMatrix5List } from '../../data/culturalLearningDatabasePart4';
import { speechService } from '../../services/speechService';
import {
  ShieldAlert,
  Volume2,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  RotateCcw,
  Plus,
  Search,
  Scale,
  Building,
  HelpCircle,
  Info,
  Lightbulb,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const KeigoMatrix5Lab: React.FC<Props> = ({ currentLevel: _currentLevel }) => {
  const [list, setList] = useState<KeigoMatrix5Item[]>(initialKeigoMatrix5List);
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
      item.verbBase.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.sonkeigo.toLowerCase().includes(q) ||
      item.kenjougo1.toLowerCase().includes(q) ||
      item.kenjougo2Teichougo.toLowerCase().includes(q) ||
      item.baitoKeigoTrap.toLowerCase().includes(q)
    );
  });

  const currentItem = filteredList[currentIndex] || list[0];

  const handleLoadMoreFive = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextBatch = extraKeigoMatrix5List.map((item, idx) => ({
        ...item,
        id: `${item.id}_more_${extraLoadedCount + 1}_${idx}`,
      }));
      setList((prev) => [...prev, ...nextBatch]);
      setExtraLoadedCount((prev) => prev + 1);
      setIsLoadingMore(false);
    }, 350);
  };

  const handleSpeak = (text: string) => {
    speechService.speak(text);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-purple-950/40 p-6 sm:p-8 border border-indigo-900/40 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
              <Scale className="w-3.5 h-3.5" />
              Tâm Lý Học Thứ Bậc & Đẳng Cấp Kính Ngữ
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              48. Ma Trận Kính Ngữ 5 Bậc & Xã Hội Dọc Tate-shakai
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Phân định tuyệt đối giữa Tôn kính (Sonkeigo), Khiêm nhường 1 (Kenjougo I), Đinh trọng (Teichougo II),
              Lịch sự (Teineigo) và Mỹ từ (Bikago). Vạch trần bẫy sai lầm Baito-keigo của nhân viên quán ăn.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLoadMoreFive}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-indigo-900/30 transition-all border border-indigo-400/30 disabled:opacity-50"
            >
              <Plus className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              {isLoadingMore ? 'Đang nạp...' : 'Tải thêm 5 cái (+5)'}
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-300">
              Tổng động từ: <span className="font-bold text-indigo-400">{list.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'card'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            Ma Trận Biến Đổi 5 Bậc (Card View)
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'grid'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            Bảng Đối Chiếu Ma Trận (Grid View)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'quiz'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            Trắc Nghiệm Phản Xạ Kính Ngữ & Bẫy Baito-keigo
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
        <div className="text-xs text-slate-400 font-medium pl-1 hidden sm:block">
          Tra cứu nhanh động từ, dạng kính ngữ hoặc bẫy lạm dụng:
        </div>
        <div className="relative flex-1 sm:max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo động từ gốc (行く, 食べる...), tôn kính ngữ, khiêm nhường ngữ..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60"
          />
        </div>
      </div>

      {/* Content */}
      {filteredList.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
          Không tìm thấy động từ hoặc dạng kính ngữ phù hợp.
        </div>
      ) : activeTab === 'card' ? (
        /* CARD VIEW: 5-TIER MATRIX VISUALIZER */
        <div className="space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Header controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-black text-white">
                  {currentItem.verbBase}
                </span>
                <span className="text-xs text-slate-400">({currentItem.reading})</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  {currentItem.meaning}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 mr-2">
                  {currentIndex + 1} / {filteredList.length}
                </span>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    setShowDeepExplanation(false);
                    setSelectedQuizAnswer(null);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 5-TIER VISUAL MATRIX */}
            <div className="space-y-3.5">
              {/* 1. Tôn kính ngữ (Sonkeigo) */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      1. Tôn Kính Ngữ (尊敬語 - Sonkeigo)
                    </div>
                    <div className="text-xs text-slate-400">
                      Nâng hành động của đối phương / khách hàng lên cao
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <span className="text-base sm:text-lg font-bold text-emerald-200">
                    {currentItem.sonkeigo}
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.sonkeigo)}
                    className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/40 transition-colors"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 2. Khiêm nhường ngữ 1 (Kenjougo I) */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <ArrowDownRight className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      2. Khiêm Nhường Ngữ I (謙譲語I - Kenjougo I)
                    </div>
                    <div className="text-xs text-slate-400">
                      Hạ mình / hành động phe mình hướng đến đối phương
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <span className="text-base sm:text-lg font-bold text-blue-200">
                    {currentItem.kenjougo1}
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.kenjougo1)}
                    className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 transition-colors"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3. Khiêm nhường ngữ 2 / Đinh trọng ngữ (Teichougo) */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                      3. Đinh Trọng Ngữ (丁重語 - Teichougo / Kenjougo II)
                    </div>
                    <div className="text-xs text-slate-400">
                      Hạ mình một cách lịch sự trang trọng trước người nghe
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <span className="text-base sm:text-lg font-bold text-purple-200">
                    {currentItem.kenjougo2Teichougo}
                  </span>
                  <button
                    onClick={() => handleSpeak(currentItem.kenjougo2Teichougo)}
                    className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 transition-colors"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 4 & 5. Lịch sự & Mỹ từ (Teineigo & Bikago) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-300 uppercase">
                      4. Lịch Sự (丁寧語 - Teineigo)
                    </div>
                    <div className="text-xs text-slate-500">Dạng ~masu / ~desu căn bản</div>
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-slate-200">
                    {currentItem.teineigo}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-300 uppercase">
                      5. Mỹ Từ (美化語 - Bikago)
                    </div>
                    <div className="text-xs text-slate-500">Thêm tiền tố o- / go- tao nhã</div>
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-pink-300">
                    {currentItem.bikago}
                  </span>
                </div>
              </div>

              {/* BAITO KEIGO TRAP ALERT */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 text-slate-300 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-rose-400 font-bold mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                  Bẫy Kính Ngữ Lạm Dụng Phổ Biến (Baito-keigo / Conbini-keigo Cần Tránh):
                </div>
                <p className="leading-relaxed text-slate-300">
                  {currentItem.baitoKeigoTrap}
                </p>
              </div>
            </div>

            {/* Toggle Deep Explanation */}
            <div className="mt-6">
              <button
                onClick={() => setShowDeepExplanation(!showDeepExplanation)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs sm:text-sm font-semibold transition-all"
              >
                <BookOpen className="w-4 h-4" />
                {showDeepExplanation
                  ? 'Thu gọn mục phân tích xã hội học & tâm lý Tate-shakai'
                  : 'Xem mục giải thích chi tiết: Căn nguyên Xã hội dọc (Tate-shakai), Từ đệm Kushon-kotoba & Ví dụ phòng họp'}
              </button>
            </div>

            {/* EXPANDABLE DEEP SECTION */}
            {showDeepExplanation && (
              <div className="mt-8 pt-6 border-t border-indigo-900/40 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
                  <Info className="w-5 h-5" />
                  Mục Giải Thích Văn Hóa & Tâm Lý Học Giao Tiếp Chuyên Sâu
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                      <Scale className="w-4 h-4" /> Căn nguyên &quot;Xã hội dọc&quot; (Tate-shakai - GS. Nakane Chie):
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {currentItem.culturalDeepDive.tateShakaiOrigin}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4" /> Cặp từ đệm làm mềm lời nói (Kushon-kotoba):
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {currentItem.culturalDeepDive.kushonKotobaPair}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" /> Mẹo cứu nguy ngoại giao công sở khi lỡ nói sai kính ngữ:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {currentItem.culturalDeepDive.crisisAvoidanceTip}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                      <Building className="w-4 h-4" /> Ví dụ thực chiến trong phòng họp ban giám đốc:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {currentItem.culturalDeepDive.executiveMeetingExample}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : activeTab === 'grid' ? (
        /* GRID VIEW */
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Động từ gốc</th>
                <th className="p-3.5 text-emerald-400">Tôn kính ngữ</th>
                <th className="p-3.5 text-blue-400">Khiêm nhường I</th>
                <th className="p-3.5 text-purple-400">Đinh trọng II</th>
                <th className="p-3.5">Lịch sự</th>
                <th className="p-3.5 text-rose-400">Bẫy Baito-keigo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredList.map((item, idx) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setActiveTab('card');
                  }}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="p-3.5 font-bold text-white whitespace-nowrap">
                    {item.verbBase} <span className="text-xs text-slate-400 font-normal">({item.meaning})</span>
                  </td>
                  <td className="p-3.5 text-emerald-300 font-medium whitespace-nowrap">{item.sonkeigo}</td>
                  <td className="p-3.5 text-blue-300 font-medium whitespace-nowrap">{item.kenjougo1}</td>
                  <td className="p-3.5 text-purple-300 font-medium whitespace-nowrap">{item.kenjougo2Teichougo}</td>
                  <td className="p-3.5 text-slate-300 whitespace-nowrap">{item.teineigo}</td>
                  <td className="p-3.5 text-rose-300/90 text-xs line-clamp-1 max-w-xs">{item.baitoKeigoTrap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* QUIZ VIEW */
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
              <HelpCircle className="w-5 h-5" />
              Trắc Nghiệm Phản Xạ Kính Ngữ ({currentIndex + 1} / {filteredList.length})
            </div>
            <button
              onClick={() => setSelectedQuizAnswer(null)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Làm lại câu này
            </button>
          </div>

          <div className="space-y-4">
            <div className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {currentItem.quiz.question}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentItem.quiz.options.map((option, optIdx) => {
                const isSelected = selectedQuizAnswer === optIdx;
                const isCorrect = optIdx === currentItem.quiz.correctIndex;
                let btnStyle = 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-200';

                if (selectedQuizAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500/70 text-emerald-200 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/60 border-rose-500/70 text-rose-200';
                  } else {
                    btnStyle = 'opacity-40 bg-slate-900 border-slate-800 text-slate-500';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={selectedQuizAnswer !== null}
                    onClick={() => setSelectedQuizAnswer(optIdx)}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed flex-1">{option}</span>
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
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/50 text-slate-300 text-xs sm:text-sm animate-fadeIn leading-relaxed">
                <span className="font-bold text-indigo-300 block mb-1">
                  {selectedQuizAnswer === currentItem.quiz.correctIndex ? 'Chính xác!' : 'Giải thích đáp án chuẩn:'}
                </span>
                {currentItem.quiz.explanation}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition-colors"
            >
              Động từ trước
            </button>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                setSelectedQuizAnswer(null);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Động từ tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
