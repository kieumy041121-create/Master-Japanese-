import React, { useState } from 'react';
import { DivisionId } from '../../types';
import {
  HelpCircle,
  X,
  BookOpen,
  MapPin,
  Sparkles,
  Gauge,
  Volume2,
  Copy,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Compass,
  Search,
  RotateCw,
  Flag,
  Keyboard,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToModule: (divisionId: DivisionId, moduleId: number) => void;
}

export const UserGuideModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onNavigateToModule,
}) => {
  const [activeTab, setActiveTab] = useState<'muc1' | 'navigation' | 'flashcard' | 'audio' | 'shortcuts' | 'fastmode'>('muc1');

  if (!isOpen) return null;

  const goToVocabMaster = () => {
    onNavigateToModule('vocab_kanji', 1);
    onClose();
  };

  const goToEncyclopedia = () => {
    onNavigateToModule('japan_encyclopedia', 94);
    onClose();
  };

  const goToFashionStudio = () => {
    onNavigateToModule('cultural_learning', 40);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0b1020] border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-white flex items-center gap-2">
                <span>Hướng Dẫn Sử Dụng & Định Vị Mục 1</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-normal">
                  Kotoba Infinity
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Tìm kiếm vị trí "Mục 1" và làm chủ toàn bộ tính năng cao cấp của hệ sinh thái 101 Labs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors shrink-0"
            title="Đóng hướng dẫn (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs inside Guide */}
        <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none text-xs shrink-0">
          <button
            onClick={() => setActiveTab('muc1')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'muc1'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>📍 Mục 1 Nằm Ở Đâu?</span>
          </button>

          <button
            onClick={() => setActiveTab('navigation')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'navigation'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>8 Phân Hệ & 101 Labs</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcard')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'flashcard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thẻ Flashcard 3D</span>
          </button>

          <button
            onClick={() => setActiveTab('audio')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'audio'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Tốc Độ 3 Nấc & Furigana</span>
          </button>

          <button
            onClick={() => setActiveTab('shortcuts')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'shortcuts'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>Phím Tắt Tiện Dụng</span>
          </button>

          <button
            onClick={() => setActiveTab('fastmode')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'fastmode'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                : 'text-emerald-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>⚡ Mode Nhanh Siêu Tốc</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-200 text-xs sm:text-sm leading-relaxed">
          {/* TAB 1: MỤC 1 NẰM Ở ĐÂU */}
          {activeTab === 'muc1' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/40 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm sm:text-base">
                  <MapPin className="w-5 h-5 text-red-400 shrink-0" />
                  <span>ĐỊNH VỊ CHÍNH XÁC "MỤC 1" TRÊN TOÀN HỆ THỐNG</span>
                </div>
                <p className="text-slate-300">
                  Tùy theo nhu cầu của bạn, "Mục 1" có 2 vị trí quan trọng nhất:
                </p>
              </div>

              {/* Position A: Chuyên mục 1 (VocabMaster) */}
              <div className="p-4 sm:p-5 bg-slate-900/80 border border-indigo-500/40 rounded-2xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-base font-bold text-white">
                      Chuyên Mục 01: VocabMaster (Từ Vựng Cốt Lõi N5 - N1)
                    </h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono">
                    Thuộc Phân hệ PH1
                  </span>
                </div>

                <p className="text-slate-300 text-xs">
                  • <strong>Vị trí trên giao diện:</strong> Nhấp vào tab <strong>"PH1: Từ Vựng"</strong> trên thanh điều hướng đầu trang. Chuyên mục đầu tiên chính là <strong>01 VocabMaster</strong>.
                  <br />
                  • <strong>Nội dung:</strong> Hơn 10.000 từ vựng cốt lõi phân bổ theo 5 cấp độ JLPT, thuật toán lặp lại ngắt quãng SRS, trắc nghiệm 4 lựa chọn kèm bóc tách chữ Hán và mẹo nhớ trực quan.
                </p>

                <button
                  onClick={goToVocabMaster}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/30 active:scale-95"
                >
                  <span>Mở Ngay Chuyên Mục 01 (VocabMaster)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Position B: Thẻ Ghi Nhớ Flashcard 3D trong Bách Khoa Toàn Thư (PH8) */}
              <div className="p-4 sm:p-5 bg-slate-900/80 border border-amber-500/40 rounded-2xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-base font-bold text-white">
                      Tính Năng "1. Bộ Thẻ Ghi Nhớ Flashcard 3D" (Bách Khoa Toàn Thư)
                    </h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-mono">
                    Thuộc Phân hệ PH8
                  </span>
                </div>

                <p className="text-slate-300 text-xs">
                  • <strong>Vị trí trên giao diện:</strong> Vào tab <strong>"PH8: Bách Khoa"</strong>. Khi mở bất kỳ chuyên đề văn hóa nào (như <em>Địa Lý 8 Vùng, Samurai, Washoku...</em>), hãy nhìn vào <strong>thanh công cụ trên đầu bài đọc</strong>. Bạn sẽ thấy nút màu cam nổi bật: <strong className="text-amber-300">"Thẻ Ghi Nhớ (X)"</strong>.
                  <br />
                  • <strong>Hoặc:</strong> Cuộn xuống mục <em>"Bảng Từ Vựng & Thuật Ngữ Hán Tự Trọng Tâm"</em> và bấm nút <strong className="text-amber-300">"Ôn thẻ Flashcard"</strong>.
                </p>

                <button
                  onClick={goToEncyclopedia}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-600/30 active:scale-95"
                >
                  <span>Mở Bách Khoa Toàn Thư Nhật Bản (PH8)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Position C: Thời Trang Gái Nhật & Shoujo Style (PH6) */}
              <div className="p-4 sm:p-5 bg-slate-900/80 border border-rose-500/40 rounded-2xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Thời Trang Gái Nhật & Studio Làm Đẹp Makeup (PH6)</span>
                      <span className="text-[10px] bg-rose-500/30 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/40">NEW</span>
                    </h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 font-mono">
                    Thuộc Phân hệ PH6 (Chuyên đề 40)
                  </span>
                </div>

                <p className="text-slate-300 text-xs">
                  • <strong>Vị trí trên giao diện:</strong> Chọn tab <strong>"PH6: Văn Hóa"</strong> rồi chọn chuyên đề <strong>"40. Thời Trang Gái Nhật, Làm Đẹp Makeup & Văn Hóa Otaku"</strong> (hoặc nhấn phím tắt <code className="text-rose-400 bg-slate-950 px-1 py-0.5 rounded">Ctrl + K</code> gõ <em>"làm đẹp"</em> hoặc <em>"makeup"</em>).
                  <br />
                  • <strong>Nội dung:</strong> Gồm 2 studio chuyên sâu riêng biệt: <em>(1) Studio Thời Trang & Phòng Thử Đồ Mix & Match Ảo</em> và <em>(2) Studio Làm Đẹp & Makeup</em> (6 layouts búp bê & TikTok Mei Mei, bóc tách 5 vùng mặt & bọng mắt 3D Namida-bukuro, quy trình dưỡng da Mochi-hada 4 bước, từ điển thuật ngữ J-Beauty kèm audio).
                </p>

                <button
                  onClick={goToFashionStudio}
                  className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-600/30 active:scale-95"
                >
                  <span>Mở Ngay Thời Trang Gái Nhật & Shoujo Style (PH6)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: 8 PHÂN HỆ & 101 LABS */}
          {activeTab === 'navigation' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Cấu Trúc 8 Phân Hệ Lớn (101 Chuyên Đề Thực Chiến)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-indigo-400">PH1: Từ Vựng & Hán Tự (1 - 10)</div>
                  <p className="text-slate-400">VocabMaster, KanjiStudio, SlangRadar, Âm Hán Việt, Gia phả Kanji...</p>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-blue-400">PH2: Đọc Hiểu & JLPT (11 - 20)</div>
                  <p className="text-slate-400">Đề thi thật PastPapers, AI Exam, Đọc sâu, Báo chí song ngữ, Bẫy đọc hiểu...</p>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-emerald-400">PH3: Nghe Nói & Phản Xạ (21 - 30)</div>
                  <p className="text-slate-400">Pitch Shadowing, Thư viện Audio thực địa, Phản xạ Aizuchi, Hội thoại khẩn cấp...</p>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-amber-400">PH4: Doanh Nghiệp & Keigo (77 - 80, 31 - 35)</div>
                  <p className="text-slate-400">Email thương mại, Báo cáo Hou-Ren-So, Trao danh thiếp Meishi, Đàm phán Kushon...</p>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-amber-400">PH5: Đột Phá N2 - N1 (62 - 66, 81 - 85)</div>
                  <p className="text-slate-400">Thành ngữ 4 chữ Yojijukugo, Ngữ pháp Bungo cổ, Ma trận trợ từ, Đọc lướt Dokkai...</p>
                </div>
                <div className="p-3 bg-slate-900 border border-rose-500/40 rounded-xl space-y-1 bg-rose-950/20">
                  <div className="font-bold text-rose-400 flex items-center justify-between">
                    <span>PH6: Văn Hóa & Tâm Lý Học (36 - 51, 67 - 76)</span>
                    <span className="text-[10px] bg-rose-500/30 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/40 font-mono">Mới: Thời Trang Gái Nhật</span>
                  </div>
                  <p className="text-slate-300">Shoujo Style, Jirai Kei, Ryousangata, Phối đồ & Makeup GenZ, Trà đạo, Omotenashi, Uchi-Soto...</p>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-pink-400">PH7: Nihon Edutainment (86 - 95)</div>
                  <p className="text-slate-400">Chơi chữ Dajare, Tiếng lóng GenZ, Anime Lingo, Đố vui Nazonazo, Nối từ Shiritori...</p>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-red-400">PH8: Bách Khoa Toàn Thư (96 - 103)</div>
                  <p className="text-slate-400">Địa lý 8 vùng, Lịch sử 14 thời kỳ, Văn hóa Samurai, Ẩm thực Washoku UNESCO...</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs">
                <span>Cách chuyển nhanh nhất giữa 101 chuyên mục:</span>
                <span className="font-mono text-indigo-400 font-bold bg-slate-900 px-2 py-1 rounded border border-slate-700">
                  Bấm phím Ctrl + K (hoặc gõ dấu /)
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: THẺ FLASHCARD 3D */}
          {activeTab === 'flashcard' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Cách Sử Dụng Bộ Thẻ Ghi Nhớ Flashcard 3D Chuyên Sâu</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <strong className="text-white block">Mở bộ thẻ:</strong>
                    Nhấp vào nút <strong className="text-amber-400">"Thẻ Ghi Nhớ"</strong> trên thanh công cụ của bài đọc Bách Khoa Toàn Thư.
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <strong className="text-white block">Lật thẻ xem nghĩa (Flip 3D):</strong>
                    Nhấp chuột vào tấm thẻ hoặc ấn <strong>Phím Cách (Spacebar)</strong> trên bàn phím để lật mặt sau xem giải nghĩa tiếng Việt chi tiết.
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <strong className="text-white block">Chuyển thẻ:</strong>
                    Nhấp nút "Trước" / "Kế tiếp" hoặc ấn <strong>Mũi tên Trái (←) / Phải (→)</strong> trên bàn phím. Nhấp icon xáo trộn để đảo ngẫu nhiên.
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0">4</div>
                  <div>
                    <strong className="text-white block">Đánh dấu đã thuộc lòng:</strong>
                    Bấm nút <strong className="text-emerald-400">"Đánh Dấu Đã Thuộc"</strong> để ghi nhớ tiến độ, giúp bạn theo dõi từ vựng đã vững chắc.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TỐC ĐỘ 3 NẤC & FURIGANA */}
          {activeTab === 'audio' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span>Hướng Dẫn Chỉnh Tốc Độ Phát Âm & Furigana</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-red-400" />
                    <span>Bộ điều chỉnh tốc độ đọc (0.8x · 1.0x · 1.2x):</span>
                  </div>
                  <p className="text-slate-300">
                    Nằm ngay trên thanh công cụ của bài đọc Bách Khoa Toàn Thư. Chọn <strong>0.8x</strong> để nghe chậm từng âm tiết khi mới bắt đầu, <strong>1.0x</strong> cho tốc độ người Tokyo bản xứ, hoặc <strong>1.2x</strong> để luyện phản xạ Shadowing. Lựa chọn được tự động lưu lại cho các lần học sau!
                  </p>
                </div>

                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="font-jp text-indigo-400 font-bold text-sm">あ</span>
                    <span>Công tắc Furigana (Ruby Mode):</span>
                  </div>
                  <p className="text-slate-300">
                    Nhấp nút <strong>"Furigana: Bật / Tắt"</strong> để ẩn hoặc hiện phiên âm cách đọc chữ Hán trên đầu từ vựng. Khi mới học, hãy bật để đọc dễ dàng; khi đã quen, hãy tắt đi để rèn luyện trí nhớ mặt chữ Hán tự!
                  </p>
                </div>

                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Copy className="w-4 h-4 text-indigo-400" />
                    <span>Xuất ghi chú học tập 1-chạm (Markdown):</span>
                  </div>
                  <p className="text-slate-300">
                    Nhấp biểu tượng <strong>Sao chép</strong> ở đầu bài để copy toàn bộ nội dung tóm tắt, điểm trọng tâm, bảng từ vựng và mẹo văn hóa chuẩn định dạng Markdown, sẵn sàng dán ngay vào Notion, Obsidian hoặc Anki.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PHÍM TẮT TIỆN DỤNG */}
          {activeTab === 'shortcuts' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-indigo-400" />
                <span>Bảng Phím Tắt Tối Ưu Tốc Độ Thao Tác</span>
              </h3>

              <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 text-xs">
                <div className="p-3 flex items-center justify-between">
                  <span className="text-slate-300">Mở Tìm kiếm nhanh 101 Chuyên mục</span>
                  <kbd className="px-2 py-1 bg-slate-800 text-indigo-300 rounded border border-slate-700 font-mono font-bold">
                    Ctrl + K (hoặc gõ /)
                  </kbd>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <span className="text-slate-300">Lật thẻ Flashcard 3D (Mặt trước / Mặt sau)</span>
                  <kbd className="px-2 py-1 bg-slate-800 text-amber-300 rounded border border-slate-700 font-mono font-bold">
                    Phím Space (Cách)
                  </kbd>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <span className="text-slate-300">Chuyển thẻ Flashcard tiếp theo</span>
                  <kbd className="px-2 py-1 bg-slate-800 text-emerald-300 rounded border border-slate-700 font-mono font-bold">
                    Phím Mũi tên Phải (→)
                  </kbd>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <span className="text-slate-300">Quay lại thẻ Flashcard trước đó</span>
                  <kbd className="px-2 py-1 bg-slate-800 text-emerald-300 rounded border border-slate-700 font-mono font-bold">
                    Phím Mũi tên Trái (←)
                  </kbd>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <span className="text-slate-300">Đóng cửa sổ hướng dẫn / popup Flashcard</span>
                  <kbd className="px-2 py-1 bg-slate-800 text-slate-400 rounded border border-slate-700 font-mono font-bold">
                    Phím Esc
                  </kbd>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MODE NHANH SIÊU TỐC */}
          {activeTab === 'fastmode' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Hướng Dẫn & Đặc Điểm "⚡ Mode Nhanh (Fast Mode 120fps)"</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/40 rounded-xl space-y-2">
                  <div className="font-bold text-amber-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Cách bật / tắt Mode Nhanh 1-Chạm:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Người học có thể bật hoặc tắt chế độ bất kỳ lúc nào tại:
                    <br />
                    • <strong>Nút "⚡ Mode Nhanh"</strong> nằm ngay trên thanh điều hướng đầu trang (Header).
                    <br />
                    • Hoặc <strong>Huy hiệu trạng thái</strong> ở góc phải đầu trang chủ Dashboard.
                    <br />
                    <em>(Hệ thống tự động lưu lựa chọn này vào bộ nhớ trình duyệt cho mọi phiên học tiếp theo)</em>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1.5">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Phản Hồi UI Tức Thì & 120 FPS</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Triệt tiêu độ trễ render chuyển động, tắt các lớp mờ nền (backdrop blur) nặng nề của GPU, phản hồi nhấp chuột tức thì dưới 1ms.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1.5">
                    <div className="font-bold text-indigo-400 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Phát Âm Tiếng Nhật Tự Nhiên 1.15x</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Tự động nâng tốc độ phát âm chuẩn người Tokyo lên 1.15x vừa vặn, dứt khoát, đồng thời bảo vệ phát âm không bị ngắt quãng giữa chừng.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1.5">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tra Cứu Tức Thì &lt;5ms</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Kích hoạt kho từ vựng và tri thức heuristic nạp sẵn cho các chủ đề kinh điển, trả lời ngay lập tức không cần chờ mạng hay AI tạo mới.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1.5">
                    <div className="font-bold text-sky-400 flex items-center gap-1.5">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Tiết Kiệm Pin & Mát Máy</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Tối ưu hoàn hảo cho cả điện thoại di động và máy tính cấu hình văn phòng, giúp kéo dài thời lượng pin khi học tập liên tục.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Học tiếng Nhật không giới hạn · Chinh phục JLPT N5 đến N1</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToVocabMaster}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Đi đến Mục 1 (VocabMaster)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
