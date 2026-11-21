import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, CornerDownLeft, Scan, CheckCircle2 } from 'lucide-react';
import {
  searchOmnipotentKanji,
  runOmnipotentSearchAudit,
  OmniSearchMatch,
  XRayKanjiChip,
} from '../../services/omnipotentSearchEngine';
import { preloadKanjiOmniverse } from '../../services/kanjiOmniverseEngine';

interface OmnipotentKanjiGatewayProps {
  variant?: 'header' | 'hero';
  currentQuery?: string;
  onSelectTarget: (
    queryOrChar: string,
    preferredTab?: 'all' | 'homophone' | 'multifont'
  ) => void;
  placeholder?: string;
  className?: string;
}

export const OmnipotentKanjiGateway: React.FC<OmnipotentKanjiGatewayProps> = ({
  variant = 'header',
  currentQuery,
  onSelectTarget,
  placeholder,
  className = '',
}) => {
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const response = useMemo(() => searchOmnipotentKanji(query, 10), [query]);
  const auditStatus = useMemo(() => runOmnipotentSearchAudit(), []);

  // Preload top candidate into Omniverse LRU cache during typing for 0ms routing
  useEffect(() => {
    const top = response.suggestions[0];
    if (top) {
      preloadKanjiOmniverse(top.redirectQuery || top.character);
    } else if (response.xrayChips[0]) {
      preloadKanjiOmniverse(response.xrayChips[0].character);
    }
  }, [response]);

  // Reset highlight index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Close dropdown on click outside
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const inferPreferredTab = (
    targetStr: string,
    match?: OmniSearchMatch
  ): 'all' | 'homophone' | 'multifont' | undefined => {
    if (match?.redirectQuery) {
      if (
        match.redirectQuery === 'hakaru' ||
        match.redirectQuery === 'au' ||
        match.redirectQuery === 'tsutomeru'
      ) {
        return 'homophone';
      }
      if (match.redirectQuery.includes('半額') || match.redirectQuery.includes('注意')) {
        return 'multifont';
      }
    }
    if (targetStr.includes('半額') || targetStr.includes('注意')) return 'multifont';
    return undefined;
  };

  const commitSelection = (
    targetQuery: string,
    match?: OmniSearchMatch
  ) => {
    const clean = targetQuery.trim();
    if (!clean) return;
    preloadKanjiOmniverse(clean);
    onSelectTarget(clean, inferPreferredTab(clean, match));
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  const handleSelectChip = (chip: XRayKanjiChip) => {
    preloadKanjiOmniverse(chip.character);
    onSelectTarget(chip.character);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const total = response.suggestions.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      if (total > 0) setActiveIndex((prev) => (prev + 1) % total);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIsOpen(true);
      if (total > 0) setActiveIndex((prev) => (prev - 1 + total) % total);
      return;
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const chosen = response.suggestions[activeIndex] || response.suggestions[0];
      if (chosen) {
        commitSelection(chosen.redirectQuery || chosen.character, chosen);
      } else if (response.xrayChips[0]) {
        handleSelectChip(response.xrayChips[0]);
      } else if (query.trim()) {
        commitSelection(query.trim());
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosen = response.suggestions[activeIndex] || response.suggestions[0];
    if (chosen) {
      commitSelection(chosen.redirectQuery || chosen.character, chosen);
    } else if (response.xrayChips[0]) {
      handleSelectChip(response.xrayChips[0]);
    } else if (query.trim()) {
      commitSelection(query.trim());
    }
  };

  const resolvedPlaceholder =
    placeholder ||
    (variant === 'hero'
      ? 'Tra bất kỳ: Kanji (鬱), Kana (ゆううつ), Romaji (yuuutsu), Hán Việt (Uất), Nghĩa (Trầm cảm) hoặc dán cả câu Nhật...'
      : 'Cổng Toàn Năng: Gõ 鬱, yuuutsu, Uất, Trầm cảm hoặc dán cả câu tiếng Nhật...');

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      className={`relative w-full ${className}`}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        <div className="relative flex-1 min-w-0">
          <Search
            className={`text-slate-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
              variant === 'hero' ? 'w-4 h-4 left-3.5' : 'w-4 h-4 left-3'
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={resolvedPlaceholder}
            aria-label="Cổng tìm kiếm Kanji toàn năng"
            aria-expanded={isOpen}
            className={`w-full bg-[#070b14] border text-white placeholder-slate-500 focus:outline-none transition-colors ${
              isOpen
                ? 'border-indigo-500 ring-1 ring-indigo-500/40'
                : 'border-slate-700/90 hover:border-slate-600'
            } ${
              variant === 'hero'
                ? 'rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm'
                : 'rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm'
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Xóa từ khóa tìm kiếm"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          type="submit"
          className={`rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            variant === 'hero' ? 'px-4 py-2.5 text-xs sm:text-sm' : 'px-3.5 py-2 text-xs'
          }`}
        >
          <span>{variant === 'hero' ? 'Mở Vũ Trụ' : 'Tra cứu'}</span>
          <CornerDownLeft className="w-3.5 h-3.5 opacity-80 hidden sm:inline" />
        </button>
      </form>

      {/* ZERO-LATENCY DROPDOWN + X-RAY SENTENCE PARSER */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-slate-700/90 bg-[#090e1a] shadow-2xl overflow-hidden"
        >
          {/* X-Ray Sentence Vision Section (auto-activates on multi-char Japanese sentences) */}
          {response.isSentenceXRay && response.xrayChips.length > 0 && (
            <div className="p-3.5 border-b border-slate-800 bg-[#0c1324] space-y-2.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-indigo-300 font-semibold">
                  <Scan className="w-3.5 h-3.5" />
                  <span>Tia X-Quang Phân Tách Câu</span>
                </div>
                <span className="font-mono tabular-nums text-[11px] text-slate-400">
                  {response.xrayChips.length} chữ Hán trích xuất tức thì
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {response.xrayChips.map((chip) => {
                  const isActiveChar = currentQuery === chip.character;
                  return (
                    <button
                      key={chip.character}
                      type="button"
                      onMouseEnter={() => preloadKanjiOmniverse(chip.character)}
                      onClick={() => handleSelectChip(chip)}
                      className={`px-2.5 py-1.5 rounded-lg border text-left transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
                        isActiveChar
                          ? 'bg-indigo-600/30 border-indigo-400 text-white'
                          : 'bg-[#070b14] border-slate-800 hover:border-indigo-500 text-slate-100'
                      }`}
                    >
                      <span className="text-lg font-mincho font-bold text-white leading-none">
                        {chip.character}
                      </span>
                      <span className="text-[11px] text-indigo-300 font-jp">{chip.furigana}</span>
                      <span className="text-[11px] font-semibold text-amber-300">
                        {chip.sinoVietnamese}
                      </span>
                      <span className="text-[11px] text-slate-400 hidden sm:inline max-w-[120px] truncate">
                        {chip.shortMeaning}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Auto-Suggest Results: Strict Zen [Kanji] + [Furigana] + [Hán Việt] + [Nghĩa ngắn] */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/70">
            {response.suggestions.length === 0 ? (
              <div className="p-5 text-center text-xs text-slate-400">
                Chưa khớp trực tiếp. Thử nhập chữ Hán (鬱), Kana (ゆううつ), Romaji (yuuutsu), Âm Hán Việt (Uất) hoặc nghĩa tiếng Việt (Trầm cảm).
              </div>
            ) : (
              response.suggestions.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={`${item.character}-${item.redirectQuery || idx}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => {
                      setActiveIndex(idx);
                      preloadKanjiOmniverse(item.redirectQuery || item.character);
                    }}
                    onClick={() => commitSelection(item.redirectQuery || item.character, item)}
                    className={`w-full px-4 py-2.5 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isSelected ? 'bg-indigo-950/50' : 'hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* [Kanji] */}
                      <span className="w-10 h-10 rounded-lg bg-[#070b14] border border-slate-800 flex items-center justify-center text-2xl font-mincho font-bold text-white shrink-0">
                        {item.character}
                      </span>

                      <div className="min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        {/* [Furigana] */}
                        <span className="text-xs font-jp text-indigo-300 font-medium">
                          {item.furigana}
                        </span>
                        <span className="text-slate-600" aria-hidden="true">·</span>
                        {/* [Âm Hán Việt] */}
                        <span className="text-xs font-bold text-amber-300 tracking-wide">
                          {item.sinoVietnamese}
                        </span>
                        <span className="text-slate-600" aria-hidden="true">·</span>
                        {/* [Nghĩa tiếng Việt siêu ngắn] */}
                        <span className="text-xs sm:text-sm text-slate-200 truncate">
                          {item.shortMeaning}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-[11px] font-mono tabular-nums text-slate-400">
                      <span className="hidden sm:inline">{item.categoryBadge}</span>
                      <span className="text-indigo-300 font-semibold">{item.level}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Quiet Single-Line Background Verification Footer */}
          <div className="px-4 py-2 bg-[#060911] border-t border-slate-800 flex items-center justify-between gap-2 text-[11px] font-mono tabular-nums text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 truncate">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>
                {auditStatus.totalIndexed.toLocaleString('en-US')}+ Joyo, Jinmeiyo & Hyougai · X-Quang tách câu · Nạp 0ms
              </span>
            </span>
            <span className="shrink-0 text-slate-500">
              {response.latencyMs.toFixed(1)}ms
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
