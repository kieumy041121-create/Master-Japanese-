import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { SinoVietnameseRuleItem } from '../../types/vocabKanjiExtended';
import { initialSinoRulesList, extraSinoRulesList } from '../../data/vocabKanjiExtendedDatabase';
import {
  Volume2,
  BookOpen,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Grid,
  CreditCard,
  GraduationCap,
  ArrowRight,
  Zap,
} from 'lucide-react';

interface SinoVietnameseOnyomiLabProps {
  currentLevel: JLPTLevel;
}

export const SinoVietnameseOnyomiLab: React.FC<SinoVietnameseOnyomiLabProps> = ({ currentLevel }) => {
  const [items, setItems] = useState<SinoVietnameseRuleItem[]>(initialSinoRulesList);
  const [hasLoadedExtra, setHasLoadedExtra] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'initial_consonant' | 'rime_ending' | 'tone_voicing'>('all');

  // Quiz state
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const handleLoadExtra = () => {
    if (!hasLoadedExtra) {
      setItems((prev) => [...prev, ...extraSinoRulesList]);
      setHasLoadedExtra(true);
    }
  };

  const playJapaneseAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[（(].*?[）)]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredItems = items.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.initialOrRime.toLowerCase().includes(q) ||
      item.ruleFormula.toLowerCase().includes(q) ||
      item.vietnameseExamples.some((ex) => ex.toLowerCase().includes(q)) ||
      item.japaneseKanjiExamples.some(
        (ex) =>
          ex.kanji.toLowerCase().includes(q) ||
          ex.hanViet.toLowerCase().includes(q) ||
          ex.onyomi.toLowerCase().includes(q) ||
          ex.sampleWord.toLowerCase().includes(q)
      )
    );
  });

  const activeItem = filteredItems[currentIndex] || filteredItems[0];

  return (
    <div className="space-y-6 animate-fadeIn text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-[#0c1427] border border-indigo-900/40 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/80">
                PH1 · CHUYÊN MỤC 82
              </span>
              <span className="text-xs text-slate-400">· Siêu năng lực người học Việt Nam</span>
              <span className="text-xs text-amber-300/80 font-mono px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/40">
                JLPT {currentLevel}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <span>Ma Trận Chuyển Âm Hán - Việt & Onyomi</span>
              <span className="text-base font-jp text-indigo-400 font-normal">音読み・漢越対照音則</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Giải mã 10 quy luật chuyển dịch ngữ âm từ tiếng Hán trung đại sang âm Onyomi tiếng Nhật. Nắm vững quy tắc âm đầu, âm đuôi và thanh điệu giúp bạn suy đoán chính xác tới 95% cách đọc của hàng ngàn chữ Hán mà không cần tra từ điển!
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-950/80 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('card')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Thẻ Quy Tắc</span>
            </button>
            <button
              onClick={() => setActiveTab('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Ma Trận Lưới</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Phòng Thử Thách</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-medium">Lọc theo quy luật:</span>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Tất cả ({items.length})
            </button>
            <button
              onClick={() => setCategoryFilter('initial_consonant')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                categoryFilter === 'initial_consonant'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Âm đầu (B/P, TH/S, C/K, Đ/T...)
            </button>
            <button
              onClick={() => setCategoryFilter('rime_ending')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                categoryFilter === 'rime_ending'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Vần & Âm đuôi (-NG, -T, -C, -INH...)
            </button>
            <button
              onClick={() => setCategoryFilter('tone_voicing')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                categoryFilter === 'tone_voicing'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Thanh điệu & Âm đục (Tenten/っ)
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm chữ Hán, âm đọc, quy tắc..."
              className="pl-8 pr-3 py-1 bg-slate-900/90 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 w-52 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* VIEW 1: CARD VIEW (Thẻ Học Chuyên Sâu) */}
      {activeTab === 'card' && activeItem && (
        <div className="space-y-4">
          {/* Card Navigation Navigator */}
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
            <span className="font-medium">
              Quy luật {currentIndex + 1} / {filteredItems.length}:{' '}
              <strong className="text-white">{activeItem.initialOrRime}</strong>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors cursor-pointer"
              >
                ‹ Quy luật trước
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors cursor-pointer"
              >
                Quy luật tiếp ›
              </button>
            </div>
          </div>

          <div className="bg-[#0b101f] border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl space-y-6">
            {/* Top Rule Formulation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                  Công Thức Chuyển Đổi Nòng Cốt
                </span>
                <h2 className="text-lg md:text-xl font-bold text-white mt-1">
                  {activeItem.ruleFormula}
                </h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {activeItem.ruleDescription}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-block px-3 py-1 bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs font-semibold rounded-full">
                  Độ tin cậy: {activeItem.accuracyRate}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">Trọng tâm: JLPT {activeItem.jlptLevel}+</p>
              </div>
            </div>

            {/* Vietnamese Examples Array */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Các chữ Hán - Việt tiêu biểu tuân theo quy tắc này:</span>
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {activeItem.vietnameseExamples.map((ex, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-800/90 text-indigo-200 rounded-md font-medium border border-slate-700/60">
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Kanji & Word Examples Grid */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
                <span>Minh Họa Chữ Hán & Từ Ghép Trong Đề Thi JLPT:</span>
                <span className="text-xs font-normal text-slate-400">Nhấp loa để nghe giọng đọc chuẩn Nhật</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeItem.japaneseKanjiExamples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 border border-slate-800 hover:border-indigo-600/60 rounded-xl p-3.5 transition-all hover:bg-slate-800/60 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold font-jp text-white group-hover:text-indigo-300 transition-colors">
                          {ex.kanji}
                        </span>
                        <div>
                          <span className="text-xs text-amber-300 font-semibold">{ex.hanViet}</span>
                          <span className="text-xs text-slate-400 ml-1.5 font-mono">({ex.onyomi})</span>
                        </div>
                      </div>
                      <button
                        onClick={() => playJapaneseAudio(ex.sampleWord)}
                        className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-indigo-600 rounded-lg transition-colors cursor-pointer"
                        title="Nghe phát âm từ ghép"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-xs space-y-0.5">
                      <div className="font-jp font-semibold text-indigo-300">
                        {ex.sampleWord} <span className="text-[11px] font-normal text-slate-400">{ex.sampleReading}</span>
                      </div>
                      <div className="text-slate-300 text-[11px]">
                        ➔ {ex.sampleMeaning}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Linguistic & Cultural Explanation Toggle */}
            <div className="border border-indigo-950 bg-indigo-950/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowDetailedExplanation(!showDetailedExplanation)}
                className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-indigo-300 hover:text-white transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Mục Giải Thích Chi Tiết Hơn (Cơ Sở Ngôn Ngữ Học Lịch Sử & Mẹo Nhớ Siêu Tốc)</span>
                </span>
                {showDetailedExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showDetailedExplanation && (
                <div className="p-4 pt-0 border-t border-indigo-900/30 text-xs text-slate-300 space-y-3 leading-relaxed">
                  <p>{activeItem.deepExplanation}</p>
                  <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-amber-200">
                    <strong className="text-amber-300">💡 Mẹo Ghi Nhớ Nhanh: </strong>
                    {activeItem.mnemonicTip}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: GRID VIEW (Bảng Ma Trận Tổng Quan) */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#0b101f] border border-slate-800 hover:border-indigo-600/60 rounded-xl p-4 transition-all hover:bg-slate-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/60">
                    Quy tắc #{idx + 1}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold">{item.accuracyRate}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{item.ruleFormula}</h3>
                <p className="text-xs text-slate-400 mb-3">{item.ruleDescription}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">Ví dụ Hán tự tiêu biểu:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.japaneseKanjiExamples.slice(0, 4).map((ex, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-800/90 rounded text-slate-200 font-mono text-[11px]">
                        {ex.kanji} ({ex.hanViet} ➔ {ex.onyomi})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="text-amber-300/80 font-mono">JLPT {item.jlptLevel}</span>
                <button
                  onClick={() => {
                    setCurrentIndex(filteredItems.findIndex((it) => it.id === item.id));
                    setActiveTab('card');
                  }}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Xem chi tiết <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: QUIZ TEST (Phòng Thử Thách Phản Xạ Chuyển Âm) */}
      {activeTab === 'quiz' && (
        <div className="bg-[#0b101f] border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                <span>Trắc Nghiệm Phản Xạ: Dự Đoán Onyomi Qua Hán - Việt</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Vận dụng các quy luật chuyển âm đã học để đoán đúng cách đọc Onyomi của các chữ Hán N3-N1.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Điểm số:</span>
              <div className="text-lg font-bold text-emerald-400 font-mono">{quizScore} điểm</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item, qIdx) => {
              const mainEx = item.japaneseKanjiExamples[0];
              const userAnswer = quizAnswers[item.id];
              const options = [
                mainEx.onyomi,
                mainEx.onyomi === 'HO' ? 'BO' : mainEx.onyomi === 'SHIN' ? 'KIN' : 'TAI',
                mainEx.onyomi === 'KOU' ? 'TOU' : 'SHOU',
                mainEx.onyomi === 'SEI' ? 'KEI' : 'MEI',
              ].sort(() => 0.5 - Math.random());

              return (
                <div key={item.id} className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-indigo-400 font-bold">Câu hỏi #{qIdx + 1}</span>
                    <span className="text-xs text-slate-400">Hán Việt: {mainEx.hanViet}</span>
                  </div>

                  <div className="text-center py-2 bg-slate-950/60 rounded-lg border border-slate-800">
                    <span className="text-3xl font-bold font-jp text-white">{mainEx.kanji}</span>
                    <p className="text-xs text-slate-400 mt-1">Từ ghép: {mainEx.sampleWord} ({mainEx.sampleMeaning})</p>
                  </div>

                  <p className="text-xs text-slate-300 font-medium">
                    Theo quy tắc, âm Onyomi của chữ 「{mainEx.kanji}」 là gì?
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {options.map((opt, optIdx) => {
                      const isCorrect = opt === mainEx.onyomi;
                      const isSelected = userAnswer === optIdx;

                      let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700';
                      if (userAnswer !== undefined) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950 border-emerald-600 text-emerald-300 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-950 border-rose-600 text-rose-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={userAnswer !== undefined}
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, [item.id]: optIdx }));
                            if (isCorrect) setQuizScore((prev) => prev + 10);
                          }}
                          className={`p-2 rounded-lg border transition-all cursor-pointer font-mono font-semibold ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {userAnswer !== undefined && (
                    <div className="text-[11px] text-slate-300 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                      <strong>Giải thích:</strong> Chữ {mainEx.kanji} ({mainEx.hanViet}) theo {item.ruleFormula} nên đọc là <strong>{mainEx.onyomi}</strong>.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Button Tải thêm 5 cái (+5) */}
      {!hasLoadedExtra && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleLoadExtra}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tải thêm 5 quy luật nâng cao (+5 Nạp thêm)</span>
          </button>
        </div>
      )}
      {hasLoadedExtra && (
        <div className="text-center text-xs text-slate-400 py-2">
          ✓ Đã nạp đầy đủ toàn bộ 10 quy luật chuyển âm Hán - Việt sang Onyomi.
        </div>
      )}
    </div>
  );
};
