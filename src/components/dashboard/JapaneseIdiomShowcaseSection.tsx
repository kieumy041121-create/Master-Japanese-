import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Scroll,
  Palette,
  Compass,
  CheckCircle2,
  Quote,
  Feather,
  Plus,
} from 'lucide-react';
import { speechService } from '../../services/speechService';
import {
  ILLUSTRATED_JAPANESE_IDIOMS,
  IllustratedIdiomItem,
  getNextIdiomsBatch,
} from '../../data/japaneseIdiomsIllustratedData';
import { HandDrawnIdiomArt } from '../idioms/HandDrawnIdiomArt';

interface JapaneseIdiomShowcaseSectionProps {
  onOpenIdiomHub: () => void;
  onOpenAiSenseiWithQuery: (query?: string) => void;
}

export const JapaneseIdiomShowcaseSection: React.FC<JapaneseIdiomShowcaseSectionProps> = ({
  onOpenIdiomHub,
  onOpenAiSenseiWithQuery,
}) => {
  const [featuredList, setFeaturedList] = useState<IllustratedIdiomItem[]>(
    ILLUSTRATED_JAPANESE_IDIOMS.slice(0, 6)
  );
  const [selectedId, setSelectedId] = useState<string>('idiom_1');
  const [speaking, setSpeaking] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentIdiom: IllustratedIdiomItem =
    featuredList.find((item: IllustratedIdiomItem) => item.id === selectedId) ||
    featuredList[0] ||
    ILLUSTRATED_JAPANESE_IDIOMS[0];

  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if (speaking) return;
    setSpeaking(true);
    speechService.speak(text, 0.95);
    setTimeout(() => {
      setSpeaking(false);
    }, 1800);
  };

  const handleAddThreeIdioms = () => {
    const currentIds = featuredList.map((i) => i.id);
    const newThree = getNextIdiomsBatch(currentIds, 3);
    setFeaturedList((prev) => [...prev, ...newThree]);

    // Select the first of the 3 new idioms immediately so user sees the change
    if (newThree.length > 0) {
      setSelectedId(newThree[0].id);
    }

    speechService.playSuccessSound();

    const names = newThree.map((i) => i.idiom).join('、');
    setToastMessage(`Đã nạp thêm +3 thành ngữ mới: ${names}! Tổng danh sách: ${featuredList.length + 3} câu.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#120d1c] via-[#0d1020] to-[#080d1a] border-2 border-amber-500/50 p-5 sm:p-7 md:p-8 shadow-2xl">
      {/* Decorative Traditional Japanese Background Glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Traditional Japanese Seal Stamp Watermark */}
      <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full border border-amber-500/10 flex items-center justify-center font-serif text-amber-500/5 text-8xl pointer-events-none select-none">
        雅
      </div>

      <div className="relative z-10 space-y-6">
        {/* Top Header Badge & Navigation CTA */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1.5 shadow-sm">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                MỤC LỚN ĐẶC BIỆT TRANG CHỦ · TRANH VẼ TAY & ĐIỂN TÍCH
              </span>
              <span className="text-xs text-rose-300 font-mono">ことわざ · 四字熟語 · 故事成語</span>
              <span className="text-amber-200/80 text-xs font-semibold">
                · Không phân biệt số chữ ({currentIdiom.charCount} chữ · Độ dài tự do)
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Đại Bách Khoa Thành Ngữ Nhật Bản</span>
              <span className="text-sm sm:text-base font-normal font-serif text-amber-400/90 px-2.5 py-0.5 rounded-md bg-amber-950/60 border border-amber-700/40">
                絵で楽しむ日本のことわざ
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Giải thích sâu 1 câu thành ngữ Nhật Bản không phân biệt số chữ (từ 4 chữ Yojijukugo, 5-8 chữ tục ngữ dân gian Kotowaza, đến 12 chữ điển tích Koji Seigo): <strong className="text-amber-300">Nghĩa đen & nghĩa bóng</strong>, <strong className="text-rose-300">Chuyện gốc ngụ ngôn</strong>, <strong className="text-cyan-300">Tranh vẽ tay dễ hiểu</strong>, <strong className="text-emerald-300">Ngữ cảnh đối thoại thực tế</strong> và đối chiếu tương đương tục ngữ Việt Nam.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full lg:w-auto">
            {/* +3 Button for Idioms */}
            <button
              onClick={handleAddThreeIdioms}
              className="px-4 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/40"
              title="Nạp thêm 3 thành ngữ mới kèm đầy đủ nghĩa đen bóng, chuyện gốc điển tích, tranh vẽ tay và ví dụ có tiếng Việt"
            >
              <Plus className="w-4 h-4 text-emerald-200 stroke-[3]" />
              <span>+3 Nạp Thêm Thành Ngữ</span>
            </button>

            <button
              onClick={onOpenIdiomHub}
              className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Scroll className="w-4 h-4 text-slate-950" />
              <span>Mở Toàn Bộ Đại Bách Khoa Tranh Vẽ</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

        {/* Dynamic Toast Feedback when +3 is clicked */}
        {toastMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-xs text-emerald-400 hover:text-white underline cursor-pointer shrink-0"
            >
              Đóng
            </button>
          </div>
        )}

        {/* Quick Horizontal Selector: Switch between featured idioms */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Chọn nhanh thành ngữ để xem ngay tại Trang Chủ ({featuredList.length} câu):
              </span>
              <button
                onClick={handleAddThreeIdioms}
                className="px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>+3 câu</span>
              </button>
            </div>
            <span className="font-mono text-amber-400/90">
              Đang xem: {currentIdiom.charCount} chữ Hán/Kana
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {featuredList.map((item: IllustratedIdiomItem) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-950/70 to-slate-900 border-amber-400 shadow-md shadow-amber-500/20 ring-1 ring-amber-400/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1 font-mono">
                    <span
                      className={`px-1.5 py-0.2 rounded font-bold ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.charCount} chữ
                    </span>
                    <span className="text-slate-400">{item.jlptLevel}</span>
                  </div>
                  <div
                    className={`font-serif text-xs font-bold truncate ${
                      isSelected ? 'text-amber-200' : 'text-slate-200 group-hover:text-amber-300'
                    }`}
                  >
                    {item.idiom}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {item.hanViet}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Showcase Display: Split 2-column Hand-Drawn Art + Deep Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
          {/* Left Column (5 Cols): Hand-Drawn Art Display & Visual Wisdom */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#0f1422] to-slate-950 border border-amber-500/30 p-4 sm:p-5 relative shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold inline-flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  Tranh vẽ minh họa dân gian
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {currentIdiom.illustration.badgeText}
                </span>
              </div>

              {/* Hand-Drawn SVG Visual */}
              <div className="w-full flex items-center justify-center p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 shadow-inner">
                <HandDrawnIdiomArt
                  scene={currentIdiom.illustration.svgScene}
                  className="w-full h-56 sm:h-64"
                />
              </div>

              {/* Caption Under Art */}
              <p className="text-xs text-amber-200/90 italic text-center font-serif leading-relaxed px-2">
                &ldquo;{currentIdiom.illustration.caption}&rdquo;
              </p>
            </div>

            {/* Quick Vietnamese Equivalent Footer */}
            <div className="mt-4 pt-3 border-t border-slate-800/90 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">Thành ngữ tương đương:</span>
                <span className="text-white font-bold bg-rose-950/50 border border-rose-800/50 px-2 py-0.5 rounded text-xs">
                  {currentIdiom.vietnameseEquivalent}
                </span>
              </div>
              <button
                onClick={(e) => handleSpeak(e, currentIdiom.idiom)}
                className="p-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0"
                title="Nghe phát âm chuẩn Tokyo"
              >
                <Volume2 className={`w-3.5 h-3.5 ${speaking ? 'animate-bounce text-amber-300' : ''}`} />
                <span>Nghe</span>
              </button>
            </div>
          </div>

          {/* Right Column (7 Cols): The 4 Pillars of Knowledge (Meaning, Origin Story, Usage) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#0e1320] to-slate-950 border border-slate-800 p-5 sm:p-6 shadow-lg">
            <div className="space-y-4">
              {/* Idiom Japanese Big Text + Reading + Han Viet */}
              <div className="space-y-1.5 pb-3 border-b border-slate-800">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    {currentIdiom.typeName}
                  </span>
                  <span className="text-slate-400 font-mono">
                    Độ dài: <strong className="text-white">{currentIdiom.charCount} chữ</strong>
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-cyan-400 font-mono">Âm Hán Việt: <strong>{currentIdiom.hanViet}</strong></span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide">
                    {currentIdiom.idiom}
                  </div>
                  <button
                    onClick={(e) => handleSpeak(e, currentIdiom.idiom)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>{currentIdiom.reading}</span>
                  </button>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Romaji: <span className="text-slate-300 italic">{currentIdiom.romaji}</span>
                </div>
              </div>

              {/* 1. NGHĨA ĐEN & NGHĨA BÓNG */}
              <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Quote className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ý NGHĨA CHI TIẾT (NGHĨA ĐEN & NGHĨA BÓNG)</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                  <p className="text-slate-300">
                    <strong className="text-amber-200">Nghĩa đen:</strong> {currentIdiom.literalMeaning}
                  </p>
                  <p className="text-white font-medium">
                    <strong className="text-rose-300">Nghĩa bóng (Ý nghĩa sâu xa):</strong>{' '}
                    {currentIdiom.figurativeMeaning}
                  </p>
                </div>
              </div>

              {/* 2. CHUYỆN GỐC / ĐIỂN TÍCH LỊCH SỬ / NGỤ NGÔN */}
              <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-rose-400" />
                    <span>CHUYỆN GỐC & ĐIỂN TÍCH: {currentIdiom.originStory.title}</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    Nguồn gốc: {currentIdiom.originStory.sourceEra}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{currentIdiom.originStory.narrative}&rdquo;
                </p>
                <div className="text-xs text-amber-300/90 font-medium pt-1 flex items-start gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Đạo lý rút ra:</strong> {currentIdiom.originStory.moralTakeaway}
                  </span>
                </div>
              </div>

              {/* 3. CÁCH DÙNG TRONG THỰC TẾ & HỘI THOẠI */}
              <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CÁCH DÙNG & HỘI THOẠI THỰC TẾ</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-cyan-200">Ngữ cảnh:</strong> {currentIdiom.usageGuide.context} (
                  <span className="text-amber-300 italic">{currentIdiom.usageGuide.tone}</span>)
                </p>

                {/* Practical Dialogue Snippet */}
                <div className="bg-[#0b101c] p-2.5 rounded-lg border border-slate-800 space-y-1.5 font-serif text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-white font-medium">
                      <span className="text-amber-400 font-sans font-bold">{currentIdiom.usageGuide.dialogue.speakerA}: </span>
                      {currentIdiom.usageGuide.dialogue.speakerAJp}
                    </div>
                    <button
                      onClick={(e) => handleSpeak(e, currentIdiom.usageGuide.dialogue.speakerAJp)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer shrink-0"
                      title="Nghe câu thoại A"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-emerald-300 font-sans font-semibold text-xs">
                    → Dịch: {currentIdiom.usageGuide.dialogue.speakerAVn}
                  </div>

                  <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-800/60">
                    <div className="text-white font-medium">
                      <span className="text-cyan-400 font-sans font-bold">{currentIdiom.usageGuide.dialogue.speakerB}: </span>
                      {currentIdiom.usageGuide.dialogue.speakerBJp}
                    </div>
                    <button
                      onClick={(e) => handleSpeak(e, currentIdiom.usageGuide.dialogue.speakerBJp)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer shrink-0"
                      title="Nghe câu thoại B"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-emerald-300 font-sans font-semibold text-xs">
                    → Dịch: {currentIdiom.usageGuide.dialogue.speakerBVn}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Open full studio or Ask AI Sensei */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Không phân biệt số chữ (4, 5, 7, 8, 9, 12 chữ)
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-amber-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Tranh vẽ tay Ukiyo-e sắc nét
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAiSenseiWithQuery(`Giải thích sâu thành ngữ ${currentIdiom.idiom} (${currentIdiom.hanViet})`)}
                  className="px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-700/50 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Hỏi AI Sensei</span>
                </button>
                <button
                  onClick={onOpenIdiomHub}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow"
                >
                  <span>Xem Toàn Bộ 16+ Thành Ngữ & Trắc Nghiệm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
