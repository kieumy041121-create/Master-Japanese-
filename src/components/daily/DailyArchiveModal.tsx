import React, { useState, useMemo } from 'react';
import { JLPTLevel } from '../../types';
import {
  DailyRitualBundle,
  getPastDaysHistory,
  formatDateKey
} from '../../data/dailyRitualData';
import { dailyRitualStorage } from '../../services/dailyRitualStorage';
import { speechService } from '../../services/speechService';
import {
  X,
  Calendar,
  CheckCircle2,
  Bookmark,
  Search,
  ArrowRight,
  Flame,
  Volume2,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';

interface DailyArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: JLPTLevel;
  selectedDateStr: string;
  onSelectDate: (dateStr: string) => void;
  onOpenAiSensei?: (query?: string) => void;
}

export const DailyArchiveModal: React.FC<DailyArchiveModalProps> = ({
  isOpen,
  onClose,
  currentLevel,
  selectedDateStr,
  onSelectDate,
  onOpenAiSensei
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'completed' | 'bookmarked'>('all');
  const [daysCount, setDaysCount] = useState<number>(30);

  // Generate past days list
  const historyList = useMemo(() => {
    return getPastDaysHistory(daysCount, currentLevel);
  }, [daysCount, currentLevel]);

  // Load completion and bookmarks data
  const completedDates = useMemo(() => {
    return new Set(dailyRitualStorage.getCompletedDates());
  }, [isOpen]);

  const bookmarks = useMemo(() => {
    return dailyRitualStorage.getBookmarks();
  }, [isOpen]);

  const bookmarkedDateSet = useMemo(() => {
    return new Set(bookmarks.map((b) => b.dateStr));
  }, [bookmarks]);

  // Filtered list
  const filteredList = useMemo(() => {
    return historyList.filter((bundle) => {
      // 1. Filter type
      if (filterType === 'completed' && !completedDates.has(bundle.dateStr)) {
        return false;
      }
      if (filterType === 'bookmarked' && !bookmarkedDateSet.has(bundle.dateStr)) {
        return false;
      }

      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchKanji =
          bundle.kanji.character.toLowerCase().includes(q) ||
          bundle.kanji.hanViet.toLowerCase().includes(q) ||
          bundle.kanji.meaning.toLowerCase().includes(q);
        const matchGrammar =
          bundle.grammar.pattern.toLowerCase().includes(q) ||
          bundle.grammar.title.toLowerCase().includes(q) ||
          bundle.grammar.vietnamese.toLowerCase().includes(q);
        const matchPhil =
          bundle.philosophy.title.toLowerCase().includes(q) ||
          bundle.philosophy.vietnameseName.toLowerCase().includes(q) ||
          bundle.philosophy.coreMeaning.toLowerCase().includes(q);
        const matchDate = bundle.dateStr.includes(q);

        return matchKanji || matchGrammar || matchPhil || matchDate;
      }

      return true;
    });
  }, [historyList, filterType, searchQuery, completedDates, bookmarkedDateSet]);

  if (!isOpen) return null;

  const todayStr = formatDateKey(new Date());

  const handlePickDate = (dateStr: string) => {
    onSelectDate(dateStr);
    onClose();
  };

  const handlePlayAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speechService.speak(text, 1.0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#090e1b] border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Lịch Sử Tri Thức Hằng Ngày
                </h2>
                <span className="text-xs text-slate-400 font-jp">日々のアーカイブ</span>
              </div>
              <p className="text-xs text-slate-400">
                Ôn tập lại Hán tự, Ngữ pháp phản xạ & Triết lý sống của tất cả các ngày đã qua
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search, Filters, Stats */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo chữ Hán, ngữ pháp, triết lý, ngày (2026-10)..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
              }`}
            >
              Tất cả ({historyList.length})
            </button>
            <button
              onClick={() => setFilterType('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                filterType === 'completed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Đã xong ({completedDates.size})</span>
            </button>
            <button
              onClick={() => setFilterType('bookmarked')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                filterType === 'bookmarked'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Yêu thích ({bookmarks.length})</span>
            </button>
          </div>
        </div>

        {/* History Cards Timeline List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-slate-800/50">
          {filteredList.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Calendar className="w-8 h-8 mx-auto text-slate-600" />
              <div className="text-sm font-semibold text-white">Không tìm thấy ngày học phù hợp</div>
              <p className="text-xs text-slate-500">
                Thử thay đổi từ khóa tìm kiếm hoặc bỏ bớt bộ lọc để xem toàn bộ lịch sử.
              </p>
            </div>
          ) : (
            filteredList.map((bundle) => {
              const isToday = bundle.dateStr === todayStr;
              const isSelected = bundle.dateStr === selectedDateStr;
              const isDone = completedDates.has(bundle.dateStr);
              const isMarked = bookmarkedDateSet.has(bundle.dateStr);

              return (
                <div
                  key={bundle.dateStr}
                  onClick={() => handlePickDate(bundle.dateStr)}
                  className={`pt-3 first:pt-0 group cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-950/20 -mx-2 px-3 py-3 rounded-xl border border-indigo-500/30'
                      : 'hover:bg-slate-900/50 -mx-2 px-3 py-2.5 rounded-xl'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Date info & Badge */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex flex-col items-center justify-center text-center shrink-0">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">
                          {bundle.dateStr.slice(5, 7)}月
                        </span>
                        <span className="text-sm font-bold text-white font-mono leading-none">
                          {bundle.dateStr.slice(8, 10)}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {bundle.dayOfWeekVi}, {bundle.dateStr}
                          </span>
                          {isToday && (
                            <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/40">
                              Hôm nay
                            </span>
                          )}
                          {isDone && (
                            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                              <CheckCircle2 className="w-3 h-3" /> Đã học
                            </span>
                          )}
                          {isMarked && (
                            <span className="text-[10px] text-amber-400 flex items-center gap-1 font-mono">
                              <Bookmark className="w-3 h-3 fill-amber-400" /> Đã lưu
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2">
                          <span className="text-amber-300 font-jp font-bold">
                            {bundle.kanji.character} ({bundle.kanji.hanViet})
                          </span>
                          <span>·</span>
                          <span className="text-rose-300 font-mono">
                            {bundle.grammar.pattern}
                          </span>
                          <span>·</span>
                          <span className="text-purple-300 font-jp">
                            {bundle.philosophy.title}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Preview Chips */}
                    <div className="flex items-center gap-2 sm:self-center">
                      <button
                        onClick={(e) => handlePlayAudio(bundle.kanji.character, e)}
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        title="Nghe Hán tự"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-xs text-indigo-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        <span>Học ngày này</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>Hiển thị {filteredList.length} ngày trong kho lưu trữ</span>
            {daysCount < 90 && (
              <button
                onClick={() => setDaysCount((prev) => prev + 30)}
                className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                Tải thêm 30 ngày trước nữa
              </button>
            )}
          </div>

          <button
            onClick={() => handlePickDate(todayStr)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors cursor-pointer"
          >
            Quay về ngày hôm nay
          </button>
        </div>
      </div>
    </div>
  );
};
