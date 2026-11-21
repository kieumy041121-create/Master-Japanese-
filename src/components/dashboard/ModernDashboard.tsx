import React, { useState, useEffect } from 'react';
import { JLPTLevel, DivisionId } from '../../types';
import { DIVISIONS_META } from '../../data/curriculumStructure';
import { speechService } from '../../services/speechService';
import {
  BookOpen,
  GraduationCap,
  Headphones,
  Briefcase,
  Sparkles,
  Layers,
  Gamepad2,
  Landmark,
  Volume2,
  Calendar,
  Flame,
  ArrowRight,
  Search,
  Play,
  Compass,
  Zap,
  Award,
  Target,
  ShieldCheck,
  CheckCircle2,
  Shirt,
  Scan,
  Waves,
  MessageCircle,
  Feather,
} from 'lucide-react';
import { DailyKanjiChallenge } from './DailyKanjiChallenge';
import { DailyWisdomTrioSection } from '../daily/DailyWisdomTrioSection';
import { JapaneseIdiomShowcaseSection } from './JapaneseIdiomShowcaseSection';
import { OmnipotentKanjiGateway } from '../kanjiUniverse/OmnipotentKanjiGateway';
import type { WowWeaponId } from '../wow/WowWeaponsHubModal';
import type { OmniverseSanctuaryTab } from '../omniverse/OmniverseSanctuaryHub';
import { SanctuaryBentoGallery } from '../omniverse/SanctuaryBentoGallery';

interface ModernDashboardProps {
  currentLevel: JLPTLevel;
  onSetLevel: (level: JLPTLevel) => void;
  onSelectDivision: (divisionId: DivisionId, moduleId?: number) => void;
  onOpenAiSenseiWithQuery: (query?: string) => void;
  onOpenAiSenseiWithTab?: (query?: string, initialTab?: any) => void;
  onOpenQuickJump: () => void;
  onOpenGuide: () => void;
  onOpenSrsVault?: () => void;
  onOpenJlptSimulator?: () => void;
  onOpenWowHub?: (weaponId?: WowWeaponId) => void;
  onOpenKanjiUniverse?: (char?: string) => void;
  onOpenDailyNikki?: () => void;
  onOpenOmniverse?: (tab?: OmniverseSanctuaryTab) => void;
  isFastMode?: boolean;
  onToggleFastMode?: () => void;
}

const DIVISION_ICONS: Record<string, React.ElementType> = {
  vocab_kanji: BookOpen,
  jlpt_reading: GraduationCap,
  listening_speaking: Headphones,
  biz_culture: Briefcase,
  learner_boost: Sparkles,
  cultural_learning: Layers,
  edutainment_fun: Gamepad2,
  japan_encyclopedia: Landmark,
};

export const ModernDashboard: React.FC<ModernDashboardProps> = ({
  currentLevel,
  onSetLevel,
  onSelectDivision,
  onOpenAiSenseiWithQuery,
  onOpenAiSenseiWithTab,
  onOpenQuickJump,
  onOpenGuide,
  onOpenSrsVault,
  onOpenJlptSimulator,
  onOpenWowHub,
  onOpenKanjiUniverse,
  onOpenDailyNikki,
  onOpenOmniverse,
  isFastMode = false,
  onToggleFastMode,
}) => {
  // Streak tracking in localStorage
  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kotoba_study_streak');
      return saved ? parseInt(saved, 10) : 7;
    } catch {
      return 7;
    }
  });

  const [hasCheckedInToday, setHasCheckedInToday] = useState<boolean>(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      return localStorage.getItem('kotoba_last_checkin') === today;
    } catch {
      return false;
    }
  });

  // Pronunciation practice input
  const [audioInputText, setAudioInputText] = useState<string>('お疲れ様でした');
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Quick Hotline question
  const [hotlineQuery, setHotlineQuery] = useState<string>('');

  // JLPT Countdown calculation
  const [daysToJlpt, setDaysToJlpt] = useState<number>(68);

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const julyTest = new Date(currentYear, 6, 5);
    const decTest = new Date(currentYear, 11, 6);

    let targetDate = julyTest;
    if (now > julyTest) targetDate = decTest;
    if (now > decTest) targetDate = new Date(currentYear + 1, 6, 5);

    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysToJlpt(diffDays > 0 ? diffDays : 68);
  }, []);

  const handleCheckIn = () => {
    if (hasCheckedInToday) return;
    const nextStreak = streakDays + 1;
    setStreakDays(nextStreak);
    setHasCheckedInToday(true);
    speechService.playSuccessSound();
    try {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem('kotoba_study_streak', nextStreak.toString());
      localStorage.setItem('kotoba_last_checkin', today);
    } catch (e) {
      console.warn(e);
    }
  };

  const handlePlayAudio = (text: string) => {
    setIsPlayingAudio(true);
    speechService.speak(text, speechRate);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1500);
  };

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* 1. Hero Command Station: Clean, Modern Obsidian & Indigo Presence */}
      <section className="relative rounded-2xl bg-gradient-to-br from-[#0c1322] via-[#090e1a] to-[#060913] border border-slate-800/80 p-5 sm:p-7 md:p-8 shadow-2xl">
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 space-y-6">
          {/* Top Row: Brand & Status Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="text-indigo-400 font-semibold tracking-wide">言葉無限 · KOTOBA INFINITY</span>
                <span>·</span>
                <span className="text-emerald-400 font-medium">102 Chuyên Mục Học Thuật</span>
                <span>·</span>
                <span className="text-amber-400">8 Trụ Cột Tri Thức</span>
                {onToggleFastMode && (
                  <>
                    <span>·</span>
                    <button
                      onClick={onToggleFastMode}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer border ${
                        isFastMode
                          ? 'bg-emerald-950/80 border-emerald-500/70 text-emerald-300 shadow-sm fast-mode-glow'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                      title="Bật/Tắt chế độ Siêu Tốc (Fast Mode)"
                    >
                      <Zap className={`w-3 h-3 ${isFastMode ? 'text-emerald-400 fill-emerald-400' : 'text-slate-400'}`} />
                      <span>{isFastMode ? 'Mode Nhanh: 120fps <5ms' : 'Bật Mode Nhanh'}</span>
                    </button>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Chinh Phục JLPT N5–N1 &{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-rose-400 bg-clip-text text-transparent">
                  Nghệ Thuật Ngôn Ngữ Nhật Bản
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-sans">
                Không gian nghiên cứu học thuật bậc cao: Khảo sát Hán tự đa chiều, phản xạ ngữ pháp chuyên sâu, mô phỏng buồng dịch cabin hội nghị và cố vấn độc quyền cùng Giáo sư AI Sensei.
              </p>
            </div>

            {/* Streak & Countdown Trackers */}
            <div className="w-full lg:w-auto shrink-0 flex flex-row lg:flex-col gap-2.5">
              {/* Streak Tracker */}
              <div className="flex-1 lg:flex-initial bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Flame className="w-4 h-4 fill-amber-400/20" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Chuỗi học</div>
                    <div className="text-sm font-bold text-white font-mono">{streakDays} ngày</div>
                  </div>
                </div>
                <button
                  onClick={handleCheckIn}
                  disabled={hasCheckedInToday}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    hasCheckedInToday
                      ? 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 cursor-default'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow'
                  }`}
                >
                  {hasCheckedInToday ? 'Đã điểm danh' : 'Điểm danh'}
                </button>
              </div>

              {/* JLPT Countdown */}
              <div className="flex-1 lg:flex-initial bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Kỳ thi JLPT</div>
                    <div className="text-sm font-bold text-rose-300 font-mono">Còn {daysToJlpt} ngày</div>
                  </div>
                </div>
                <div className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold border border-slate-700">
                  {currentLevel}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Flagship Feature Launchers: Clean, High-Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {/* Flagship 1: Cabin Interpreting */}
            <div
              onClick={() => onSelectDivision('listening_speaking', 102)}
              className="group p-4 rounded-xl bg-gradient-to-br from-amber-950/30 via-slate-900/90 to-slate-900 border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Headphones className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-amber-400">Module 102</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                Dịch Cabin Thượng Đỉnh
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Độ trễ Décalage, cắt câu Slicing, quy đổi số đếm và 10 kịch bản hội nghị thượng đỉnh.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Vào phòng cabin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Flagship 2: Thematic Vocab */}
            <div
              onClick={() => onSelectDivision('vocab_kanji', 113)}
              className="group p-4 rounded-xl bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Module 113</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Từ Vựng Theo Chủ Đề
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                25 Chủ đề lớn (&gt;100 từ/topic), Flashcard 3D, 7 chế độ học tập và nạp thêm vô hạn.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Khám phá 25 Topics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Flagship 3: Japan Encyclopedia */}
            <div
              onClick={() => onSelectDivision('japan_encyclopedia', 94)}
              className="group p-4 rounded-xl bg-gradient-to-br from-cyan-950/30 via-slate-900/90 to-slate-900 border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Landmark className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-cyan-400">PH8 · Đại Bản Đồ</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Bách Khoa Toàn Thư
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Bản đồ 47 Tỉnh thành Todōfuken, 14 Kỷ nguyên lịch sử, Lịch lễ hội Matsuri và Đố vui.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Khám phá Nhật Bản</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Flagship 4: AI Sensei */}
            <div
              onClick={() => onOpenAiSenseiWithQuery()}
              className="group p-4 rounded-xl bg-gradient-to-br from-purple-950/30 via-slate-900/90 to-slate-900 border border-purple-500/40 hover:border-purple-400 transition-all cursor-pointer shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-purple-400">GS. Yamato</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                AI Sensei Cố Vấn 24/7
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Giải thích cặn kẽ 5 tầng bản chất, bẫy đề thi JLPT N5–N1, khẩu ngữ đời sống & bí kíp thi cử.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-purple-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Hỏi Giáo sư ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Standalone Macro-Module Banner: Vũ Trụ Hán Tự & Cổng Tìm Kiếm Toàn Năng */}
          {onOpenKanjiUniverse && (
            <div className="rounded-xl border border-indigo-500/45 bg-slate-900/90 p-4 sm:p-5 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#070b14] border border-indigo-500/50 flex items-center justify-center text-2xl font-mincho font-bold text-indigo-300 shrink-0">
                    漢
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-indigo-300 font-mono">
                      <span>Phân hệ Độc lập (Alt+K)</span>
                      <span aria-hidden="true">·</span>
                      <span>Cổng Tìm Kiếm Toàn Năng 2,250+ Kanji</span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      Vũ Trụ Hán Tự Đa Chiều — Cổng Toàn Năng, Đồng Âm & Khảo Thí Áp Lực
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Tra vô hạn mọi định dạng (Kanji, Kana, Romaji, Hán Việt, Nghĩa Việt, X-Quang phân tách cả câu Nhật), Ma trận phân biệt Đồng âm JLPT, Soi 4 phông chữ & Ảnh đời thực Nhật Bản, Chiết tự 3 giây, Khảo thí 0.5s Flash & Đồng bộ FSRS.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                  {(['鬱', '語', '測', '会', '待'] as const).map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => onOpenKanjiUniverse(sample)}
                      className="w-9 h-9 rounded-lg bg-[#070b14] border border-slate-700 hover:border-indigo-400 text-base font-mincho font-bold text-white hover:text-indigo-300 transition-colors cursor-pointer"
                      title={`Mở nhanh chữ ${sample} trong Vũ Trụ Hán Tự`}
                    >
                      {sample}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => onOpenKanjiUniverse('鬱')}
                    className="ml-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                  >
                    <span>Vào Vũ Trụ Hán Tự</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <OmnipotentKanjiGateway
                variant="hero"
                onSelectTarget={(queryOrChar) => onOpenKanjiUniverse(queryOrChar)}
              />
            </div>
          )}

          {/* Standalone Macro-Module Launcher: Nhật Ký Mỗi Ngày (Daily Nikki) */}
          {onOpenDailyNikki && (
            <div className="rounded-xl border border-amber-500/35 bg-slate-900/90 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#070b14] border border-amber-500/45 flex items-center justify-center text-amber-300 shrink-0">
                  <Feather className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 font-mono">
                    <span>Phân hệ Nhật Ký Riêng Tư (Alt+N)</span>
                    <span aria-hidden="true">·</span>
                    <span>Chuyển ngữ Thấu cảm & Bóc tách Collocation</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Nhật Ký Mỗi Ngày (Daily Nikki) — Công tắc Furigana 0ms & Rương Báu FSRS
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Biến suy nghĩ tiếng Việt thường ngày thành văn phong tự sự Futsukei chuẩn bản xứ, ẩn/hiện Furigana 0 mili-giây không nhảy dòng, hỗ trợ nền Sepia Washi và lưu thẳng cụm từ đắt giá vào FSRS.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenDailyNikki}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer self-start md:self-center"
              >
                <span>Viết Nhật Ký Hôm Nay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Hero Sanctuary Hub: Asymmetric Bento Grid (2 Top 50/50 + 3 Bottom 33/33/33) */}
          {onOpenOmniverse && (
            <div className="pt-2">
              <SanctuaryBentoGallery
                isDark={true}
                compactHeader={true}
                onEnterSanctuary={(tab) => onOpenOmniverse(tab)}
              />
            </div>
          )}
        </div>
      </section>

      {/* 1.5. HỆ THỐNG 3 SIÊU TRỤ CỘT ĐỘT PHÁ CÔNG NGHỆ (SRS VAULT, JLPT SIMULATOR & NEWS SHADOWING) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-rose-950/60 border border-indigo-700/50 p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                Hệ Sinh Thái 3 Siêu Trụ Cột Đột Phá EdTech
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  State-of-the-Art
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Sổ tay trí nhớ dài hạn SM-2, Thao trường thi thật 180 điểm & Trình duyệt báo chí Live Shadowing
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Card 1: SRS Vault */}
          <div
            onClick={onOpenSrsVault}
            className="group p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/40 hover:border-indigo-400 transition-all cursor-pointer shadow-lg space-y-2.5 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                SM-2 & Anki
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
              Sổ Tay Trí Nhớ 3D & Anki (.apkg)
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              Bookmark 1-chạm toàn web, phòng lật thẻ 3D, tính toán điểm rơi Ebbinghaus (1-3-7-14 ngày) và xuất file Bí Kíp 1 Trang PDF.
            </p>
            <div className="pt-2 border-t border-slate-900 flex items-center gap-1 text-xs text-indigo-400 font-bold group-hover:translate-x-1 transition-transform">
              <span>Mở Sổ Tay SRS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: JLPT Simulator */}
          <div
            onClick={onOpenJlptSimulator}
            className="group p-4 rounded-2xl bg-slate-950/80 border border-rose-500/40 hover:border-rose-400 transition-all cursor-pointer shadow-lg space-y-2.5 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
                <Award className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                180 Scaled Score
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
              Thao Trường Thi Thật Chống Gian Lận
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              Áp lực đếm ngược JEES, Choukai một mạch không dừng, phiếu tô OMR ảo, báo động Điểm Liệt &lt;19 và Radar 6 trục năng lực.
            </p>
            <div className="pt-2 border-t border-slate-900 flex items-center gap-1 text-xs text-rose-400 font-bold group-hover:translate-x-1 transition-transform">
              <span>Vào Thao Trường Thi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Live News & Shadowing Studio */}
          <div
            onClick={() => onSelectDivision('jlpt_reading', 27)}
            className="group p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer shadow-lg space-y-2.5 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                <Headphones className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                Module 27 · NHK & Nikkei
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              Báo Chí Thời Sự & Shadowing Studio
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              Phát thanh viên NHK (0.75x-1.25x), giải phẫu cú pháp Kakikotoba, máy quét bài báo tự chọn và sinh tin tức AI theo điểm nóng.
            </p>
            <div className="pt-2 border-t border-slate-900 flex items-center gap-1 text-xs text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
              <span>Vào Đọc Báo & Shadowing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 1.6. BỘ 5 SIÊU VŨ KHÍ CÔNG NGHỆ TƯƠNG LAI (FUTURE LAB SUITE) */}
      {onOpenWowHub && (
        <section className="rounded-2xl bg-[#0b1120] border border-amber-500/40 p-5 sm:p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-mono text-amber-400">
                KIẾN TRÚC TƯƠNG LAI · 5 SIÊU VŨ KHÍ ĐỘT PHÁ ĐỘC QUYỀN
              </div>
              <h2 className="text-lg font-extrabold text-white mt-0.5">
                Trạm Thực Nghiệm AR Vision · Nhân Bản Giọng F0 · LINE KY · Baito POS · Tuyển Dụng JIS
              </h2>
            </div>
            <button
              onClick={() => onOpenWowHub('ar_vision')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
            >
              <span>Mở Toàn Bộ Future Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              {
                id: 'ar_vision' as WowWeaponId,
                code: 'Vũ khí 01 · Camera AR',
                title: 'Mắt Thần AR & Quét Thực Tế',
                desc: 'Quét Menu Izakaya Ateji, phát hiện bẫy Otoushi ¥550, biển báo ưu tiên & bùa Omamori.',
                icon: Scan,
                accent: 'text-amber-300 border-amber-500/40 hover:border-amber-400',
              },
              {
                id: 'voice_clone' as WowWeaponId,
                code: 'Vũ khí 02 · Audio F0',
                title: 'Nhân Bản Giọng & Pitch Tokyo',
                desc: 'Thu 3 câu tiếng Việt trích xuất âm sắc cá nhân, phát tiếng Nhật chuẩn Pitch bằng chính giọng bạn.',
                icon: Waves,
                accent: 'text-indigo-300 border-indigo-500/40 hover:border-indigo-400',
              },
              {
                id: 'line_genz' as WowWeaponId,
                code: 'Vũ khí 03 · LINE KY',
                title: 'Giả Lập LINE & Giải Mã Gen-Z',
                desc: 'Phá mã Teencode (草・りょ), Kaomoji, cảnh báo dấu chấm Maruhara & đọc ẩn ý sếp/crush.',
                icon: MessageCircle,
                accent: 'text-emerald-300 border-emerald-500/40 hover:border-emerald-400',
              },
              {
                id: 'baito_vr' as WowWeaponId,
                code: 'Vũ khí 04 · 3D & POS',
                title: 'Sinh Tồn Baito & Cúi Chào Ojigi',
                desc: 'Thu ngân Konbini POS, xếp chỗ Kamiza-Shimoza 3D & đo góc cúi chào 15°–30°–45° qua Webcam.',
                icon: Compass,
                accent: 'text-cyan-300 border-cyan-500/40 hover:border-cyan-400',
              },
              {
                id: 'rirekisho_hr' as WowWeaponId,
                code: 'Vũ khí 05 · Career HR',
                title: 'CV Rirekisho & Phòng Bẫy HR',
                desc: 'Kiến tạo Rirekisho JIS in PDF + Phỏng vấn khốc liệt soi giao tiếp mắt Camera.',
                icon: Briefcase,
                accent: 'text-rose-300 border-rose-500/40 hover:border-rose-400',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => onOpenWowHub(card.id)}
                  className={`group text-left p-4 rounded-xl bg-slate-950/90 border ${card.accent} transition-all cursor-pointer flex flex-col justify-between gap-2.5 hover:-translate-y-0.5`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] font-mono text-slate-400">{card.code}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">{card.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{card.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-900 flex items-center gap-1 text-xs font-bold">
                    <span>Kích hoạt ngay</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 2. CHUYÊN MỤC LUYỆN THI BJT - CHINH PHỤC ĐỈNH CAO J1+ TIẾNG NHẬT THƯƠNG MẠI */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0e172a] via-[#091122] to-[#060c18] border border-amber-500/40 p-5 sm:p-6 md:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  MỤC ĐẶC BIỆT MỚI TÍCH HỢP
                </span>
                <span className="text-xs text-slate-400 font-mono">BJT ビジネス日本語能力テスト</span>
                <span className="text-emerald-400 text-xs font-semibold">· Thang điểm 0 - 800 (Chuẩn J1+)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Luyện Thi BJT Chuyên Sâu ·{' '}
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                  20 Chuyên Mục Cực Kỳ Chuyên Sâu
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Hệ thống 20 chuyên mục bồi dưỡng toàn diện phục vụ mục đích đạt kết quả tối ưu của người thi (J1+ 600–800đ, J1 530–599đ), giải quyết rào cản kính ngữ đa tầng, đàm phán hợp đồng, văn bản Ringi, bóc tách bẫy nghe hiểu & 100 câu hỏi mô phỏng đề thi CBT có giải thích chi tiết.
              </p>
            </div>

            <button
              onClick={() => onSelectDivision('biz_culture', 115)}
              className="w-full lg:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Briefcase className="w-4 h-4 text-slate-950" />
              <span>Vào Luyện Thi BJT (20 Mục Chuyên Sâu)</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

          {/* Quick topic preview grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
            {[
              { id: 'bjt-01', title: '1. Kính ngữ tối thượng', desc: 'Sonkeigo & Kenjougo công sở' },
              { id: 'bjt-02', title: '2. Điện thoại & Tiếp khách', desc: '電話応対 & 来客マナー' },
              { id: 'bjt-03', title: '3. Soạn thảo Email', desc: 'Văn bản B2B chuẩn mực' },
              { id: 'bjt-04', title: '4. Đọc hiểu biểu đồ', desc: 'Thuyết trình số liệu kinh tế' },
              { id: 'bjt-07', title: '7. Trình ký Ringisho', desc: 'Quy trình phê duyệt nội bộ' },
              { id: 'bjt-20', title: '20. 100 Bộ đề CBT', desc: 'Mô phỏng thực chiến có đáp án' },
            ].map((topic) => (
              <div
                key={topic.id}
                onClick={() => onSelectDivision('biz_culture', 115)}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-amber-300 group-hover:text-amber-200 truncate">
                  {topic.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{topic.desc}</div>
              </div>
            ))}
          </div>

          {/* Bottom Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>20 Chuyên Mục Độc Quyền</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Phát Âm Tokyo Web Speech</span>
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Target className="w-3.5 h-3.5" />
                <span>Trắc Nghiệm Tương Tác & Giải Thích Chi Tiết</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
              <span className="text-slate-400">Mục tiêu:</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                J1+ (600–800)
              </span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                J1 (530–599)
              </span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                J2 (420–529)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ĐẠI BÁCH KHOA THÀNH NGỮ & TỤC NGỮ NHẬT BẢN · ĐIỂN TÍCH TRANH VẼ TAY (KHÔNG PHÂN BIỆT SỐ CHỮ) */}
      <JapaneseIdiomShowcaseSection
        onOpenIdiomHub={() => onSelectDivision('cultural_learning', 116)}
        onOpenAiSenseiWithQuery={onOpenAiSenseiWithQuery}
      />

      {/* 3. Interactive Daily Kanji Challenge: 5-Minute Timed Quiz */}
      <DailyKanjiChallenge
        currentLevel={currentLevel}
        onSetLevel={onSetLevel}
        onOpenAiSensei={onOpenAiSenseiWithQuery}
      />

      {/* 3. Daily Wisdom Trio: Hán Tự Hôm Nay + Ngữ Pháp Phản Xạ + Triết Lý Sống (Mỗi ngày 1 bài & Lịch sử lưu trữ ngày đã qua) */}
      <DailyWisdomTrioSection
        currentLevel={currentLevel}
        onSelectDivision={onSelectDivision}
        onOpenAiSenseiWithQuery={onOpenAiSenseiWithQuery}
      />

      {/* 4. Instant Japanese Voice Pronunciation Studio */}
      <section className="bg-[#090e1b] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">Phòng Luyện Phát Âm Tiếng Nhật Bản Địa</h2>
            </div>
            <p className="text-xs text-slate-400">
              Nhập từ vựng, kanji hoặc mẫu câu bất kỳ để nghe giọng đọc chuẩn Tokyo ngữ âm tự nhiên với tùy chỉnh tốc độ.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Tốc độ:</span>
            {[0.8, 1.0, 1.2].map((rate) => (
              <button
                key={rate}
                onClick={() => setSpeechRate(rate)}
                className={`px-2 py-1 rounded transition-all cursor-pointer ${
                  speechRate === rate
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={audioInputText}
            onChange={(e) => setAudioInputText(e.target.value)}
            placeholder="Nhập Kanji, Hiragana hoặc Romaji (VD: よろしくお願いいたします)..."
            className="w-full flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-jp"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handlePlayAudio(audioInputText);
            }}
          />
          <button
            onClick={() => handlePlayAudio(audioInputText)}
            disabled={!audioInputText.trim() || isPlayingAudio}
            className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isPlayingAudio ? 'Đang phát...' : 'Phát âm ngay'}</span>
          </button>
        </div>

        {/* Quick Sample Chips */}
        <div className="flex items-center gap-2 mt-3 flex-wrap text-xs text-slate-400">
          <span className="text-slate-400 text-[11px]">Mẫu phổ biến:</span>
          {[
            'お疲れ様です',
            'よろしくお願いします',
            '恐れ入りますが',
            'ご迷惑をおかけして申し訳ございません',
            '一期一会',
            '承知いたしました',
          ].map((sample) => (
            <button
              key={sample}
              onClick={() => {
                setAudioInputText(sample);
                handlePlayAudio(sample);
              }}
              className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded text-[11px] font-jp transition-colors cursor-pointer border border-slate-700/60"
            >
              {sample}
            </button>
          ))}
        </div>
      </section>

      {/* 4.5. BỘ TỨ SIÊU TRỤ CỘT BÁCH KHOA VĂN HÓA & NGÔN NGỮ - ĐẠI TÔNG SƯ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1322] via-[#080d19] to-[#040812] border-2 border-amber-500/40 p-5 sm:p-6 md:p-7 shadow-2xl">
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                  Đại Tông Sư · 4 Siêu Trụ Cột Bách Khoa
                </span>
                <span className="text-xs text-slate-400 font-jp">日本文化 · 言語 · 心理学</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Toàn Cảnh 4 Siêu Trụ Cột Tri Thức & Thực Chiến Nhật Bản
              </h2>
            </div>
            <button
              onClick={() => onSelectDivision('japan_encyclopedia', 94)}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
            >
              <span>Vào Bách Khoa Toàn Thư</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Super Pillar 1 */}
            <div
              onClick={() => onSelectDivision('learner_boost', 26)}
              className="group p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/40 hover:border-indigo-400 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                    Siêu Trụ Cột 1
                  </span>
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-indigo-200 transition">
                  📜 Ngôn Ngữ Hào Quang & JLPT
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                  Ngân hàng Yojijukugo, Koji Seigo từ Xuân Thu Chiến Quốc; Mổ xẻ bẫy trợ từ (wa vs ga, ni vs de, madeni); Kanji N1 & Dị thể hiếm; Ngũ Thể Thư Đạo & Kansei Kotoba.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Khám phá Trụ Cột 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Super Pillar 2 */}
            <div
              onClick={() => onSelectDivision('cultural_learning', 32)}
              className="group p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Siêu Trụ Cột 2
                  </span>
                  <Layers className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-200 transition">
                  🧠 Tâm Lý Học & Tate-Shakai
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                  Tatemae vs Honne; Hội chứng Amae (~te morau); Áp lực đồng đẳng & Murahachibu; Ma trận Kính ngữ 5 cấp & La bàn Uchi-Soto; Lễ nghi Kankonsousai, Zoutou & Kaigo.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Khám phá Trụ Cột 2</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Super Pillar 3 */}
            <div
              onClick={() => onSelectDivision('cultural_learning', 73)}
              className="group p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Siêu Trụ Cột 3
                  </span>
                  <Landmark className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-amber-200 transition">
                  ⛩️ Linh Hồn Nhật Bản & Di Sản
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                  Shinto & Kotodama (Yaoyorozu no Kami, Engimono, Yokai); Triết lý Wabi-Sabi, Trà đạo Chado & Kintsugi; Võ sĩ đạo Bushido, Washoku & Kịch nghệ Jo-Ha-Kyu; Waka Hyakunin Isshu.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Khám phá Trụ Cột 3</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Super Pillar 4 */}
            <div
              onClick={() => onSelectDivision('japan_encyclopedia', 94)}
              className="group p-4 rounded-2xl bg-slate-900/90 border border-pink-500/40 hover:border-pink-400 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-pink-500/20 text-pink-300 border border-pink-500/40">
                    Siêu Trụ Cột 4
                  </span>
                  <Shirt className="w-4 h-4 text-pink-400" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-pink-200 transition">
                  🌸 Đương Đại, Shoujo & Sinh Tồn
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                  Fandom Otaku & Oshi-katsu; Thời trang Gái Nhật & 3D Namida-bukuro Makeup Studio; 47 Tỉnh Todofuken, 14 Thời kỳ, Kỳ tích kinh tế & Kỹ năng sinh tồn Saigai (Jijo-Kyojo-Kojo).
                </p>
              </div>
              <div className="pt-2 text-[11px] font-semibold text-pink-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Khám phá Trụ Cột 4</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 8 Major Divisions Showcase (8 Trụ Cột Tri Thức PH1 - PH8) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              8 Đại Trụ Cột Tri Thức & 102 Phòng Nghiên Cứu Chuyên Sâu
            </h2>
            <p className="text-xs text-slate-400">
              Chọn bất kỳ phân hệ nào để bước vào không gian học tập và thực hành toàn diện.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIVISIONS_META.map((div) => {
            const Icon = DIVISION_ICONS[div.id] || BookOpen;

            return (
              <div
                key={div.id}
                onClick={() => onSelectDivision(div.id)}
                className="group relative bg-[#090e1b] border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer hover:shadow-xl hover:shadow-indigo-950/30 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${div.colorScheme.badgeBg || 'bg-slate-800'} flex items-center justify-center ${div.colorScheme.activeText}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                      {div.code}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
                    {div.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-3">
                    {div.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">
                    {div.badge}
                  </span>
                  <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Vào Lab</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. AI Sensei Hotline Direct Consultation Banner */}
      <section className="bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Giáo Sư AI Sensei Yamato Kenji
              </span>
              <span>·</span>
              <span className="text-[11px] text-emerald-400 font-mono">Trực tuyến 24/7</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Có câu hỏi tiếng Nhật, văn hóa hoặc bài tập khó cần giải đáp ngay?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Hỗ trợ mọi câu hỏi bằng Romaji, Hiragana, Katakana, Kanji và Tiếng Việt. Trả lời trực tiếp vào trọng tâm, phân tích bản chất ngôn ngữ và giải thích văn hóa chuyên sâu.
            </p>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-md space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={hotlineQuery}
                onChange={(e) => setHotlineQuery(e.target.value)}
                placeholder="Nhập câu hỏi (VD: arigatou gozaimasu vs gozaimashita)..."
                className="w-full bg-slate-900/90 border border-indigo-700/60 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && hotlineQuery.trim()) {
                    onOpenAiSenseiWithQuery(hotlineQuery.trim());
                    setHotlineQuery('');
                  }
                }}
              />
              <button
                onClick={() => {
                  if (hotlineQuery.trim()) {
                    onOpenAiSenseiWithQuery(hotlineQuery.trim());
                    setHotlineQuery('');
                  } else {
                    onOpenAiSenseiWithQuery();
                  }
                }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm rounded-xl shrink-0 cursor-pointer shadow-md transition-all"
              >
                Hỏi ngay
              </button>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-400">
              <span className="text-slate-400">Gợi ý:</span>
              <button
                onClick={() => onOpenAiSenseiWithQuery('Phân biệt cách dùng arimasu và imasu')}
                className="hover:text-indigo-300 underline cursor-pointer"
              >
                arimasu vs imasu
              </button>
              <span>·</span>
              <button
                onClick={() => onOpenAiSenseiWithQuery('Giải thích văn hóa Ojigi cúi chào')}
                className="hover:text-indigo-300 underline cursor-pointer"
              >
                Văn hóa Ojigi
              </button>
              <span>·</span>
              <button
                onClick={() => onOpenAiSenseiWithQuery('Giải thích văn hóa Trao Danh Thiếp Meishi')}
                className="hover:text-indigo-300 underline cursor-pointer"
              >
                Danh thiếp Meishi
              </button>
            </div>
          </div>
        </div>

        {/* 7 Siêu Phân Hệ AI Huấn Luyện Vượt Chuẩn (State-of-the-Art Launcher) */}
        <div className="mt-5 pt-4 border-t border-indigo-900/40 w-full space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              8 Siêu Phân Hệ AI Huấn Luyện Vượt Chuẩn (State-of-the-Art):
            </span>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">Phản xạ bản xứ Tokyo</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2">
            {[
              { id: 'context_collocation', icon: '🧭', title: 'Collocation Bối Cảnh', desc: '3 tầng +3 Đào sâu', border: 'hover:border-sky-500 hover:text-sky-300' },
              { id: 'voice_roleplay', icon: '🎙️', title: 'Khẩu Ngữ & TPO', desc: 'Đàm thoại <1s', border: 'hover:border-emerald-500 hover:text-emerald-300' },
              { id: 'smart_reader', icon: '📑', title: 'X-Quang Văn Bản', desc: 'Dokkai & Tatemae', border: 'hover:border-indigo-500 hover:text-indigo-300' },
              { id: 'b2b_email', icon: '🏢', title: 'Thư Tín B2B', desc: 'Cushion Kotoba', border: 'hover:border-amber-500 hover:text-amber-300' },
              { id: 'adaptive_jlpt', icon: '🎯', title: 'Lò Luyện JLPT', desc: 'Weakness X-Ray', border: 'hover:border-rose-500 hover:text-rose-300' },
              { id: 'kanji_mnemonic', icon: '🎨', title: 'Chiết Tự & Story', desc: 'Ký ức hình ảnh', border: 'hover:border-purple-500 hover:text-purple-300' },
              { id: 'pitch_coach', icon: '🎧', title: 'Ngữ Điệu Cao Độ', desc: 'Waveform Scorer', border: 'hover:border-teal-500 hover:text-teal-300' },
              { id: 'translation_lab', icon: '⚖️', title: 'Đối Chiếu Dịch', desc: 'Triết lý bản xứ', border: 'hover:border-blue-500 hover:text-blue-300' },
            ].map((engine) => (
              <button
                key={engine.id}
                type="button"
                onClick={() => (onOpenAiSenseiWithTab ? onOpenAiSenseiWithTab(undefined, engine.id) : onOpenAiSenseiWithQuery())}
                className={`p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-left transition-all cursor-pointer ${engine.border} shadow-sm flex flex-col justify-between`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{engine.icon}</span>
                  <span className="text-xs font-bold truncate">{engine.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">{engine.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
