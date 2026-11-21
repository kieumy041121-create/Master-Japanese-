import React, { useEffect, useMemo, useState } from 'react';
import {
  Coffee,
  BookOpen,
  Disc3,
  Mail,
  Leaf,
  ArrowRight,
  Sparkles,
  Scale,
  X,
} from 'lucide-react';
import { getCurrentMicroSeason, getCurrentSolarTerm } from '../../services/japaneseCalendarEngine';
import { omniverseStorageService } from '../../services/omniverseStorageService';
import type { OmniverseSanctuaryTab } from './OmniverseSanctuaryHub';

export type SanctuaryMoodId = 'all' | 'kissaten' | 'bunko' | 'vinyl' | 'postoffice' | 'conservatory';

interface SanctuaryBentoGalleryProps {
  isDark?: boolean;
  compactHeader?: boolean;
  onEnterSanctuary: (tab: OmniverseSanctuaryTab) => void;
}

interface SanctuaryCardSpec {
  id: OmniverseSanctuaryTab;
  titleVi: string;
  titleJp: string;
  coreLine: string;
  skillLabel: string;
  wairoHex: string;
  wairoNameJp: string;
  watermarkKanji: string;
  moodLabel: string;
  icon: React.FC<{ className?: string }>;
  rowSpanClass: string;
  diffFromNikki: string;
  strongestSkill: string;
}

export const SanctuaryBentoGallery: React.FC<SanctuaryBentoGalleryProps> = ({
  isDark = true,
  compactHeader = false,
  onEnterSanctuary,
}) => {
  const [selectedMood, setSelectedMood] = useState<SanctuaryMoodId>('all');
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [liveCounts, setLiveCounts] = useState({
    personas: 3,
    bunko: 2,
    vinyl: 2,
    letters: 0,
    goshuin: 0,
  });

  const currentSekki = useMemo(() => getCurrentSolarTerm(new Date()), []);
  const currentKo = useMemo(() => getCurrentMicroSeason(new Date()), []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const state = await omniverseStorageService.loadState();
      if (!mounted) return;
      setLiveCounts({
        personas: Math.max(3, state.kissatenPersonas.length),
        bunko: Math.max(2, state.bunkoWorks.length),
        vinyl: Math.max(2, state.vinylTracks.length),
        letters: state.sealedLetters.length,
        goshuin: state.goshuinStamps.length,
      });
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Adaptive Kisetsu accent: blends Sakura #C77D8A with today's astronomical 72-Kō season
  const kisetsuColor = useMemo(() => {
    switch (currentKo.seasonTag) {
      case 'Xuân':
        return '#C77D8A'; // Sakura
      case 'Hạ':
        return '#5B8A72'; // Wakaba / Seiji
      case 'Thu':
        return '#C06C54'; // Momiji
      case 'Đông':
        return '#C77D8A'; // Tsubaki / Sakura warmth on deep winter
      default:
        return '#C77D8A';
    }
  }, [currentKo.seasonTag]);

  const cards: SanctuaryCardSpec[] = useMemo(
    () => [
      {
        id: 'kissaten',
        titleVi: 'Quán Cà Phê Đêm Khuya',
        titleJp: '夜の喫茶店 · Yoru no Kissaten',
        coreLine: 'Tán gẫu chậm 5 phút, rèn đệm lời Aizuchi & kính ngữ tự nhiên.',
        skillLabel: 'Hội thoại · Uchi/Soto',
        wairoHex: '#B47B44',
        wairoNameJp: '琥珀 Kohaku',
        watermarkKanji: '喫',
        moodLabel: 'Muốn trò chuyện nhẹ',
        icon: Coffee,
        rowSpanClass: 'lg:col-span-6',
        diffFromNikki: 'Nhật ký là độc thoại nội tâm; Quán Cà Phê là đối thoại 2 chiều với nhân vật bản xứ lưu ký ức.',
        strongestSkill: 'Phản xạ Aizuchi, Uchi/Soto & Ngữ dụng học',
      },
      {
        id: 'bunko',
        titleVi: 'Phòng Đọc Văn Học Tí Hon',
        titleJp: '文庫茶室 · Bunko Teahouse',
        coreLine: 'Thưởng thức tản văn 3 phút, tách câu dài dễ hiểu bằng X-Quang.',
        skillLabel: 'Đọc hiểu N4–N1',
        wairoHex: '#5B7A5E',
        wairoNameJp: '抹茶 Matcha',
        watermarkKanji: '文',
        moodLabel: 'Muốn đọc chậm',
        icon: BookOpen,
        rowSpanClass: 'lg:col-span-6',
        diffFromNikki: 'Thay vì tự viết, bạn đọc tinh hoa văn học cổ điển/hiện đại ở khổ giấy dọc Tategaki.',
        strongestSkill: 'Đọc hiểu câu phức N4–N1 & Mỹ học Nhật',
      },
      {
        id: 'vinyl',
        titleVi: 'Phòng Nghe Đĩa Than',
        titleJp: 'レコード歌詞室 · Vinyl Kashi',
        coreLine: 'Giải mã khẩu ngữ & cao độ từ lời nhạc J-Pop, Anime và thơ Tanka.',
        skillLabel: 'Nghe · Pitch Accent',
        wairoHex: '#384D70',
        wairoNameJp: '藍色 Ai-iro',
        watermarkKanji: '音',
        moodLabel: 'Muốn nghe nhạc',
        icon: Disc3,
        rowSpanClass: 'lg:col-span-4',
        diffFromNikki: 'Học qua nhịp điệu âm nhạc và đối chiếu giọng hát với trọng âm nói chuẩn Tokyo NHK.',
        strongestSkill: 'Nghe khẩu ngữ rút gọn & Cao độ Mora NHK',
      },
      {
        id: 'postoffice',
        titleVi: 'Hộp Thư Xuyên Thời Gian',
        titleJp: '時空の郵便局 · Bưu Cục Tĩnh Lặng',
        coreLine: 'Viết thư theo 24 tiết khí, gạt thanh chuyển đổi 3 tầng kính ngữ.',
        skillLabel: 'Viết thư · Keigo',
        wairoHex: '#A64444',
        wairoNameJp: '茜 Akane',
        watermarkKanji: '郵',
        moodLabel: 'Muốn luyện viết',
        icon: Mail,
        rowSpanClass: 'lg:col-span-4',
        diffFromNikki: 'Nhật ký viết tự sự Futsukei; Bưu Cục chuyên luyện thư tín 24 tiết khí & biến hình Keigo.',
        strongestSkill: 'Thư tín Business, Orei-jō & 3 tầng Kính ngữ',
      },
      {
        id: 'conservatory',
        titleVi: 'Bảo Tàng 72 Tiết Khí',
        titleJp: '歳時記 · Kigo Conservatory',
        coreLine: 'Ngắm 1 mỹ từ quý hiếm mỗi ngày và đóng dấu triện theo mùa.',
        skillLabel: 'Từ vựng · Từ nguyên',
        wairoHex: kisetsuColor,
        wairoNameJp: '季節 Kisetsu',
        watermarkKanji: '歳',
        moodLabel: 'Đang mệt, xem nhẹ 15 giây',
        icon: Leaf,
        rowSpanClass: 'lg:col-span-4',
        diffFromNikki: 'Không cần gõ chữ; chỉ ngắm 1 mỹ từ theo đồng hồ 72 hậu hôm nay và chạm nhẹ 15 giây.',
        strongestSkill: 'Từ vựng mỹ học, Từ nguyên Hán tự & Kotowaza',
      },
    ],
    [kisetsuColor]
  );

  const getLiveStatusLine = (id: OmniverseSanctuaryTab): string => {
    switch (id) {
      case 'kissaten':
        return `${liveCounts.personas}+ khách quen đang chờ · Không chấm điểm`;
      case 'bunko':
        return `${liveCounts.bunko}+ tuyệt phẩm Washi · Tategaki 0ms`;
      case 'vinyl':
        return `${liveCounts.vinyl}+ đĩa than & Tanka · Micro-Loop`;
      case 'postoffice':
        return `Tiết ${currentSekki.kanji} (${currentSekki.vietnamese})${liveCounts.letters > 0 ? ` · ${liveCounts.letters} thư đã niêm` : ''}`;
      case 'conservatory':
        return `Hậu ${currentKo.index}/72: ${currentKo.kanji}${liveCounts.goshuin > 0 ? ` · ${liveCounts.goshuin} dấu triện` : ''}`;
    }
  };

  const moodButtons: Array<{ id: SanctuaryMoodId; label: string; icon?: React.FC<{ className?: string }>; color?: string }> = [
    { id: 'all', label: 'Tất cả' },
    { id: 'kissaten', label: 'Muốn trò chuyện nhẹ', icon: Coffee, color: '#B47B44' },
    { id: 'bunko', label: 'Muốn đọc chậm', icon: BookOpen, color: '#5B7A5E' },
    { id: 'vinyl', label: 'Muốn nghe nhạc', icon: Disc3, color: '#384D70' },
    { id: 'postoffice', label: 'Muốn luyện viết', icon: Mail, color: '#A64444' },
    { id: 'conservatory', label: 'Đang mệt, xem nhẹ 15 giây', icon: Leaf, color: kisetsuColor },
  ];

  return (
    <section className="space-y-4 w-full overflow-x-clip">
      {/* Gallery Header + Quick Compare Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className={`text-[11px] font-mono tracking-wider uppercase ${isDark ? 'text-amber-300/80' : 'text-amber-900/80'}`}>
            五聖域 · NGŨ ĐẠI THÁNH ĐỊA THẨM THẤU VÔ CỰC
          </div>
          <h2
            className={`font-mincho font-bold tracking-tight mt-0.5 ${
              compactHeader ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
            } ${isDark ? 'text-stone-100' : 'text-stone-900'}`}
          >
            Khu Vườn Triển Lãm Văn Hóa &amp; Ngôn Ngữ Nhật Bản
          </h2>
        </div>

        <div className="relative self-start sm:self-end shrink-0">
          <button
            type="button"
            onClick={() => setShowCompare((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              showCompare
                ? isDark
                  ? 'bg-amber-500/20 border-amber-400/60 text-amber-200'
                  : 'bg-[#2c2520] border-[#2c2520] text-[#faf7f2]'
                : isDark
                ? 'bg-[#141923]/90 border-stone-700/80 text-stone-200 hover:border-stone-500'
                : 'bg-white/90 border-stone-300 text-stone-800 hover:border-stone-500'
            }`}
          >
            <Scale className="w-3.5 h-3.5 shrink-0" />
            <span>So sánh nhanh 5 không gian</span>
          </button>
        </div>
      </div>

      {/* Quick Compare Popover Panel (3 concise columns) */}
      {showCompare && (
        <div
          className={`rounded-2xl border p-4 sm:p-5 shadow-xl transition-all ${
            isDark
              ? 'bg-[#121721]/95 border-stone-700/90 text-stone-100'
              : 'bg-[#fdfaf3]/95 border-stone-300 text-stone-900'
          }`}
        >
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-500/20">
            <div>
              <h3 className="font-mincho text-base font-bold">Bảng Đối Chiếu 5 Thánh Địa · Hiểu Trong 1 Ánh Nhìn</h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                Mỗi phòng tách bạch hoàn toàn với Nhật Ký Mỗi Ngày để nuôi dưỡng một kỹ năng bản xứ riêng biệt
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowCompare(false)}
              className="p-1.5 rounded-lg opacity-70 hover:opacity-100 cursor-pointer"
              aria-label="Đóng bảng so sánh"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b ${isDark ? 'border-stone-800 text-stone-400' : 'border-stone-200 text-stone-600'}`}>
                  <th className="py-2 pr-4 font-semibold whitespace-nowrap">Tên Phòng</th>
                  <th className="py-2 pr-4 font-semibold">Khác Nhật Ký ở điểm nào?</th>
                  <th className="py-2 font-semibold whitespace-nowrap">Kỹ năng tăng mạnh nhất</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-stone-800/80' : 'divide-stone-200/80'}`}>
                {cards.map((c) => {
                  const Icon = c.icon;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => {
                        setShowCompare(false);
                        onEnterSanctuary(c.id);
                      }}
                      className={`cursor-pointer transition-colors ${
                        isDark ? 'hover:bg-stone-800/50' : 'hover:bg-stone-100/80'
                      }`}
                    >
                      <td className="py-2.5 pr-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-2 font-semibold">
                          <span
                            className="w-6 h-6 rounded-lg flex items-center justify-center text-white shrink-0"
                            style={{ backgroundColor: c.wairoHex }}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <span>{c.titleVi}</span>
                        </span>
                      </td>
                      <td className={`py-2.5 pr-4 leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                        {c.diffFromNikki}
                      </td>
                      <td className="py-2.5 font-semibold whitespace-nowrap" style={{ color: c.wairoHex }}>
                        {c.strongestSkill}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mood Compass Bar (La Bàn Chọn Phòng Theo Tâm Trạng) */}
      <div
        className={`rounded-2xl border px-3.5 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 ${
          isDark
            ? 'bg-[#121722]/85 border-stone-800/90'
            : 'bg-[#faf6ee]/90 border-stone-200/90'
        }`}
      >
        <span className={`text-xs font-medium shrink-0 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
          Hôm nay bạn đang muốn học theo tâm trạng nào?
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          {moodButtons.map((btn) => {
            const Icon = btn.icon;
            const active = selectedMood === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setSelectedMood(btn.id)}
                style={
                  active && btn.color
                    ? { backgroundColor: `${btn.color}26`, borderColor: `${btn.color}99` }
                    : undefined
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  active
                    ? btn.id === 'all'
                      ? isDark
                        ? 'bg-stone-100 text-stone-950 border-stone-100 font-semibold'
                        : 'bg-[#2c2520] text-[#faf7f2] border-[#2c2520] font-semibold'
                      : isDark
                      ? 'text-stone-100 font-semibold'
                      : 'text-stone-950 font-semibold'
                    : isDark
                    ? 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-100 hover:border-stone-700'
                    : 'bg-white/80 border-stone-200 text-stone-600 hover:text-stone-950 hover:border-stone-400'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Bento Grid: Top Row 2 Big Cards (50/50) + Bottom Row 3 Balanced Cards (33/33/33) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const isTopHeroCard = index < 2;
          const isSpotlighted = selectedMood !== 'all' && selectedMood === card.id;
          const isDimmed = selectedMood !== 'all' && selectedMood !== card.id;

          return (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              onClick={() => onEnterSanctuary(card.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onEnterSanctuary(card.id);
                }
              }}
              style={{
                borderColor: isSpotlighted
                  ? card.wairoHex
                  : isDark
                  ? `${card.wairoHex}48`
                  : `${card.wairoHex}42`,
                boxShadow: isSpotlighted
                  ? `0 18px 40px -16px ${card.wairoHex}66, 0 0 0 1.5px ${card.wairoHex}`
                  : undefined,
              }}
              className={`${card.rowSpanClass} group relative overflow-hidden rounded-3xl border backdrop-blur-md cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                isTopHeroCard ? 'p-5 sm:p-6 min-h-[218px]' : 'p-5 min-h-[214px]'
              } flex flex-col justify-between ${
                isDark
                  ? 'bg-[#141923]/88 hover:bg-[#171d29]/95 text-stone-100'
                  : 'bg-[#fcf9f3]/92 hover:bg-[#fffdf9] text-stone-900'
              } ${
                isSpotlighted
                  ? 'scale-[1.01] -translate-y-0.5 z-10'
                  : isDimmed
                  ? 'opacity-40 saturate-50 hover:opacity-80'
                  : 'hover:-translate-y-1 hover:shadow-xl'
              }`}
            >
              {/* Soft Wairo Ambient Wash */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.09] group-hover:opacity-[0.15] transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 88% 18%, ${card.wairoHex}, transparent 62%)`,
                }}
              />

              {/* Giant Calligraphic Kanji Watermark */}
              <div
                aria-hidden="true"
                className={`pointer-events-none select-none absolute -right-3 -bottom-5 font-mincho font-bold leading-none transition-transform duration-300 group-hover:scale-105 ${
                  isTopHeroCard ? 'text-[138px]' : 'text-[118px]'
                } ${isDark ? 'opacity-[0.075]' : 'opacity-[0.085]'}`}
                style={{ color: card.wairoHex }}
              >
                {card.watermarkKanji}
              </div>

              {/* TOP SECTION: Tier 1 (Bilingual Title) + Tier 2 (1-Line Core Value) */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0"
                      style={{ backgroundColor: card.wairoHex }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={`font-mincho font-bold tracking-tight leading-snug ${
                          isTopHeroCard ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                        }`}
                      >
                        {card.titleVi}
                      </h3>
                      <div
                        className="font-jp text-xs font-medium mt-0.5 truncate"
                        style={{ color: isDark ? '#d6d3d1' : '#57534e' }}
                      >
                        {card.titleJp}
                      </div>
                    </div>
                  </div>

                  {/* Subtle Wairo Swatch Label */}
                  <span
                    className={`hidden sm:inline-block font-jp text-[10px] font-semibold whitespace-nowrap shrink-0 mt-1 ${
                      isDark ? 'opacity-70' : 'opacity-75'
                    }`}
                    style={{ color: card.wairoHex }}
                  >
                    {card.wairoNameJp}
                  </span>
                </div>

                {/* Tier 2: Crisp 1-Line Core Value (<12 words) */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed font-medium max-w-md ${
                    isDark ? 'text-stone-200' : 'text-stone-700'
                  }`}
                >
                  {card.coreLine}
                </p>

                {/* Tier 3: Exactly 2 Visual Pills (Skill + Infinite +3 Badge) */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap"
                    style={{
                      backgroundColor: `${card.wairoHex}1c`,
                      borderColor: `${card.wairoHex}55`,
                      color: isDark ? '#f5f5f4' : '#1c1917',
                    }}
                  >
                    {card.skillLabel}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${
                      isDark
                        ? 'bg-stone-900/75 border-stone-700/80 text-amber-200'
                        : 'bg-white/85 border-stone-300/90 text-amber-900'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span>Mở rộng +3 vô hạn</span>
                  </span>
                </div>
              </div>

              {/* BOTTOM SECTION: Tier 4 (Live Signal + Wairo Action Button) */}
              <div
                className={`relative z-10 mt-5 pt-3 border-t flex items-center justify-between gap-3 ${
                  isDark ? 'border-stone-800/80' : 'border-stone-300/60'
                }`}
              >
                <span
                  className={`text-[11px] font-medium truncate tabular-nums ${
                    isDark ? 'text-stone-400' : 'text-stone-600'
                  }`}
                >
                  {getLiveStatusLine(card.id)}
                </span>

                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 shadow-xs"
                  style={{ backgroundColor: card.wairoHex }}
                >
                  <span>Bước vào</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
