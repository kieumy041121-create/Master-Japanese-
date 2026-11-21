import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { KanjiFamilyTreeItem } from '../../types/vocabKanjiExtended';
import { initialFamilyTreeList, extraFamilyTreeList } from '../../data/vocabKanjiExtendedDatabase';
import {
  Volume2,
  GitFork,
  BookOpen,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Grid,
  CreditCard,
  GraduationCap,
  ArrowRight,
  Layers,
} from 'lucide-react';

interface KanjiFamilyTreeLabProps {
  currentLevel: JLPTLevel;
}

export const KanjiFamilyTreeLab: React.FC<KanjiFamilyTreeLabProps> = ({ currentLevel }) => {
  const [items, setItems] = useState<KanjiFamilyTreeItem[]>(initialFamilyTreeList);
  const [hasLoadedExtra, setHasLoadedExtra] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'grid' | 'quiz'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(true);

  // Quiz state
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const handleLoadExtra = () => {
    if (!hasLoadedExtra) {
      setItems((prev) => [...prev, ...extraFamilyTreeList]);
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
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.rootKanji.toLowerCase().includes(q) ||
      item.rootMeaning.toLowerCase().includes(q) ||
      item.phoneticCore.toLowerCase().includes(q) ||
      item.familyMembers.some(
        (m) =>
          m.kanji.toLowerCase().includes(q) ||
          m.hanViet.toLowerCase().includes(q) ||
          m.wordCompound.toLowerCase().includes(q) ||
          m.wordMeaning.toLowerCase().includes(q)
      )
    );
  });

  const activeItem = filteredItems[currentIndex] || filteredItems[0];

  return (
    <div className="space-y-6 animate-fadeIn text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-[#0c1827] border border-emerald-900/40 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                PH1 · CHUYÊN MỤC 83
              </span>
              <span className="text-xs text-slate-400">· Đột phá ghi nhớ chữ Hình Thanh</span>
              <span className="text-xs text-amber-300/80 font-mono px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/40">
                JLPT {currentLevel}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <span>Cây Phả Hệ Họ Chữ Hán Phái Sinh</span>
              <span className="text-base font-jp text-emerald-400 font-normal">形声文字・同系字樹</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Hơn 85% chữ Hán trong tiếng Nhật là chữ Hình Thanh (Keisei Moji). Bằng việc nắm bắt "Gốc chữ Biểu Âm" chung (Phonetic Core), bạn có thể xâu chuỗi và ghi nhớ một nhánh 6-10 chữ Hán cùng âm đọc Onyomi chỉ trong vài phút!
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-950/80 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('card')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Phả Hệ Gốc Chữ</span>
            </button>
            <button
              onClick={() => setActiveTab('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Toàn Cảnh Họ Chữ</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Thử Thách Nhận Diện</span>
            </button>
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-400">
            Hiển thị <strong className="text-white">{filteredItems.length} họ chữ Hán</strong> cốt lõi
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm gốc chữ (青, 寺, 包, 莫...)"
              className="pl-8 pr-3 py-1 bg-slate-900/90 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 w-52 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* VIEW 1: CARD VIEW (Cây Phả Hệ Chi Tiết) */}
      {activeTab === 'card' && activeItem && (
        <div className="space-y-4">
          {/* Navigator */}
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
            <span className="font-medium">
              Họ chữ {currentIndex + 1} / {filteredItems.length}: Gốc{' '}
              <strong className="text-emerald-300 font-jp text-sm">「{activeItem.rootKanji}」</strong>{' '}
              ({activeItem.rootMeaning})
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors cursor-pointer"
              >
                ‹ Họ chữ trước
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors cursor-pointer"
              >
                Họ chữ tiếp ›
              </button>
            </div>
          </div>

          <div className="bg-[#0b101f] border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl space-y-6">
            {/* Tree Root Card */}
            <div className="bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-800/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-3xl font-jp font-bold shadow-lg shadow-emerald-600/30">
                  {activeItem.rootKanji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      GỐC CHỮ BIỂU ÂM (PHONETIC ROOT)
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">
                      Âm đọc: {activeItem.rootOnyomi}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mt-1">
                    Gốc 「{activeItem.rootKanji}」: {activeItem.rootMeaning}
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Mẫu số chung âm đọc: <strong className="text-amber-300 font-mono">{activeItem.phoneticCore}</strong>
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
                  {activeItem.familyMembers.length} nhánh phái sinh
                </span>
              </div>
            </div>

            {/* Derived Branch Cards */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <GitFork className="w-4 h-4 text-emerald-400" />
                <span>Các Chữ Con Cháu Trong Họ (Cùng chung âm đọc {activeItem.phoneticCore}):</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {activeItem.familyMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 border border-slate-800 hover:border-emerald-600/70 rounded-xl p-4 transition-all hover:bg-slate-800/60 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Kanji + Radical Tag */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold font-jp text-white group-hover:text-emerald-300 transition-colors">
                            {member.kanji}
                          </span>
                          <div>
                            <div className="text-xs font-bold text-emerald-300">
                              {member.hanViet} <span className="text-[11px] font-mono text-slate-400">({member.onyomi})</span>
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Bộ: <span className="font-jp text-amber-300">{member.radical}</span> ({member.radicalMeaning})
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          {member.jlptLevel}
                        </span>
                      </div>

                      {/* Memory Story */}
                      <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/70 leading-relaxed my-2.5">
                        <span className="text-emerald-400 font-semibold">Mẹo nhớ: </span>
                        {member.memoryMnemonic}
                      </p>

                      {/* Vocabulary Compound */}
                      <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-jp font-bold text-white group-hover:text-emerald-300">
                            {member.wordCompound}
                          </span>
                          <span className="text-[11px] text-slate-400 ml-1.5">{member.wordReading}</span>
                          <div className="text-[11px] text-slate-400 mt-0.5">➔ {member.wordMeaning}</div>
                        </div>
                        <button
                          onClick={() => playJapaneseAudio(member.wordCompound)}
                          className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer"
                          title="Phát âm từ vựng"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Philosophy Toggle */}
            <div className="border border-emerald-950 bg-emerald-950/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowDetailedExplanation(!showDetailedExplanation)}
                className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-emerald-300 hover:text-white transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Triết Lý Phát Triển Của Nhóm Chữ Hình Thanh Này</span>
                </span>
                {showDetailedExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showDetailedExplanation && (
                <div className="p-4 pt-0 border-t border-emerald-900/30 text-xs text-slate-300 space-y-3 leading-relaxed">
                  <p>{activeItem.evolutionPhilosophy}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: GRID VIEW (Toàn cảnh họ chữ) */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#0b101f] border border-slate-800 hover:border-emerald-600/70 rounded-xl p-4 transition-all hover:bg-slate-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold font-jp text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      {item.rootKanji}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{item.rootMeaning}</h3>
                      <p className="text-[11px] text-slate-400 font-mono">Âm chung: {item.phoneticCore}</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono font-semibold">
                    {item.familyMembers.length} chữ con
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 my-3">
                  {item.familyMembers.map((m, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-md text-xs font-jp text-slate-200"
                    >
                      <strong className="text-white">{m.kanji}</strong> ({m.hanViet} · {m.onyomi})
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-500">Gốc phái sinh #{idx + 1}</span>
                <button
                  onClick={() => {
                    setCurrentIndex(filteredItems.findIndex((it) => it.id === item.id));
                    setActiveTab('card');
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Xem chi tiết họ <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: QUIZ TEST */}
      {activeTab === 'quiz' && (
        <div className="bg-[#0b101f] border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <span>Trắc Nghiệm Phản Xạ: Nhận Diện Gốc Chữ Biểu Âm</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Nhìn vào một chữ Hán lạ, bóc tách bộ thủ và xác định đúng âm Onyomi dựa theo gốc họ chữ Hán.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Điểm số:</span>
              <div className="text-lg font-bold text-emerald-400 font-mono">{quizScore} điểm</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item, qIdx) => {
              const testMember = item.familyMembers[1] || item.familyMembers[0];
              const userAnswer = quizAnswers[item.id];
              const options = [
                testMember.onyomi,
                testMember.onyomi === 'SEI' ? 'KEI' : 'HOU',
                testMember.onyomi === 'JI' ? 'SHI' : 'DOU',
                testMember.onyomi === 'KOU' ? 'TOU' : 'BOU',
              ].sort(() => 0.5 - Math.random());

              return (
                <div key={item.id} className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 font-bold">Thử thách #{qIdx + 1}</span>
                    <span className="text-xs text-slate-400 font-mono">JLPT {testMember.jlptLevel}</span>
                  </div>

                  <div className="text-center py-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                    <span className="text-3xl font-bold font-jp text-white">{testMember.kanji}</span>
                    <p className="text-xs text-slate-400 mt-1">
                      Hán Việt: {testMember.hanViet} · Bộ {testMember.radical} ({testMember.radicalMeaning})
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 font-medium">
                    Chữ 「{testMember.kanji}」 có chung gốc biểu âm với 「{item.rootKanji}」, vậy âm đọc Onyomi của nó là gì?
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {options.map((opt, optIdx) => {
                      const isCorrect = opt === testMember.onyomi;
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
                      <strong>Giải mã:</strong> Chữ {testMember.kanji} mang gốc {item.rootKanji} ({item.phoneticCore}) nên đọc là <strong>{testMember.onyomi}</strong> trong từ ghép {testMember.wordCompound} ({testMember.wordReading}).
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
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all cursor-pointer text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tải thêm 5 họ chữ Hán phái sinh (+5 Nạp thêm)</span>
          </button>
        </div>
      )}
      {hasLoadedExtra && (
        <div className="text-center text-xs text-slate-400 py-2">
          ✓ Đã nạp đầy đủ toàn bộ 10 họ chữ Hán phái sinh kinh điển N5-N1.
        </div>
      )}
    </div>
  );
};
