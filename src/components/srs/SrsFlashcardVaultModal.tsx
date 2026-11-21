import React, { useState, useEffect, useMemo } from 'react';
import { srsVaultService, SrsCardItem } from '../../services/srsVaultService';
import { speechService } from '../../services/speechService';
import {
  X,
  Sparkles,
  Volume2,
  RotateCw,
  BookMarked,
  Printer,
  Download,
  Calendar,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Brain,
  Layers,
  Search,
  Filter,
  Trash2,
  Plus,
  Flame,
  Award,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SrsFlashcardVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SrsFlashcardVaultModal: React.FC<SrsFlashcardVaultModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'review' | 'all_cards' | 'export' | 'analytics'>('review');
  const [cards, setCards] = useState<SrsCardItem[]>(() => srsVaultService.getAll());
  const [dueCards, setDueCards] = useState<SrsCardItem[]>(() => srsVaultService.getDueCards());
  const [currentDueIndex, setCurrentDueIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  // New card modal
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [newJapanese, setNewJapanese] = useState<string>('');
  const [newReading, setNewReading] = useState<string>('');
  const [newVietnamese, setNewVietnamese] = useState<string>('');
  const [newContext, setNewContext] = useState<string>('');
  const [newLevel, setNewLevel] = useState<'N1' | 'N2' | 'N3' | 'N4' | 'N5'>('N1');

  // Reload cards whenever window gets the custom event
  const refreshCards = () => {
    setCards(srsVaultService.getAll());
    setDueCards(srsVaultService.getDueCards());
  };

  useEffect(() => {
    const handleUpdate = () => refreshCards();
    window.addEventListener('kotoba_srs_updated', handleUpdate);
    return () => window.removeEventListener('kotoba_srs_updated', handleUpdate);
  }, []);

  useEffect(() => {
    if (isOpen) {
      refreshCards();
      setIsFlipped(false);
      setCurrentDueIndex(0);
    }
  }, [isOpen]);

  const currentDueCard = dueCards[currentDueIndex] || null;

  // Handle grading with SM-2
  const handleRateCard = (quality: number) => {
    if (!currentDueCard) return;
    srsVaultService.reviewCard(currentDueCard.id, quality);
    speechService.playSuccessSound();
    setIsFlipped(false);

    // Refresh due cards
    const updatedDue = srsVaultService.getDueCards();
    setDueCards(updatedDue);
    if (currentDueIndex >= updatedDue.length) {
      setCurrentDueIndex(0);
    }
  };

  // Filtered all cards
  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      if (filterType !== 'all' && c.type !== filterType) return false;
      if (filterLevel !== 'all' && c.level !== filterLevel) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.japanese.toLowerCase().includes(q) ||
          c.reading.toLowerCase().includes(q) ||
          c.vietnamese.toLowerCase().includes(q) ||
          c.contextSentence.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [cards, filterType, filterLevel, searchQuery]);

  // Export to Anki
  const handleDownloadAnki = () => {
    const content = srsVaultService.exportToAnkiTsv();
    const blob = new Blob([content], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kotoba_Infinity_Anki_Deck_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    speechService.playSuccessSound();
  };

  // Open 1-Page Cheat Sheet in new printable tab
  const handlePrintCheatSheet = () => {
    const html = srsVaultService.generateCheatSheetHtml();
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  // Add custom card
  const handleSaveCustomCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJapanese.trim() || !newVietnamese.trim()) return;
    srsVaultService.addBookmark({
      japanese: newJapanese.trim(),
      reading: newReading.trim(),
      vietnamese: newVietnamese.trim(),
      contextSentence: newContext.trim() || newJapanese.trim(),
      level: newLevel,
      type: 'vocab',
      source: 'Tự thêm vào Sổ tay',
    });
    setNewJapanese('');
    setNewReading('');
    setNewVietnamese('');
    setNewContext('');
    setIsAddingNew(false);
    refreshCards();
    speechService.playSuccessSound();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-indigo-700/60 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-inner">
              <Brain className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Sổ Tay Trí Nhớ SRS & Phòng Thẻ 3D
                </h2>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  SuperMemo SM-2 Active
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Ghim chặt kiến thức theo thuật toán Lặp lại Ngắt quãng (Spaced Repetition) & Điểm rơi Ebbinghaus
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'review'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Ôn Luyện Thẻ 3D</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                dueCards.length > 0 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
              }`}>
                {dueCards.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('all_cards')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'all_cards'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>Bách Khoa Sổ Tay ({cards.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'export'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Anki & Bí Kíp 1 Trang</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Chỉ Số Ebbinghaus</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddingNew(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-900/30 shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Thẻ Mới</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: 3D FLASHCARD REVIEW */}
          {activeTab === 'review' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {dueCards.length === 0 ? (
                <div className="p-10 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Xuất Sắc! Bạn Đã Hoàn Thành Toàn Bộ Thẻ Cần Ôn</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Thuật toán SM-2 đang bảo vệ trí nhớ dài hạn của bạn. Các thẻ tiếp theo sẽ tự động xuất hiện vào các điểm rơi 1-3-7-14 ngày.
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('all_cards')}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Duyệt Toàn Bộ Sổ Tay ({cards.length})
                    </button>
                  </div>
                </div>
              ) : currentDueCard ? (
                <div className="space-y-4">
                  {/* Progress & Card Index */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>Thẻ cần ôn hôm nay:</span>
                      <strong className="text-white">{currentDueIndex + 1} / {dueCards.length}</strong>
                    </span>
                    <span className="font-mono text-indigo-400">
                      Lần ôn thứ: {currentDueCard.repetition} · Khoảng cách: {currentDueCard.interval} ngày
                    </span>
                  </div>

                  {/* 3D Interactive Flip Card */}
                  <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="relative w-full h-[340px] cursor-pointer group"
                    style={{ perspective: '1200px' }}
                  >
                    <div
                      className={`relative w-full h-full rounded-3xl transition-transform duration-500 shadow-2xl border ${
                        isFlipped
                          ? 'border-emerald-500/60 [transform:rotateY(180deg)]'
                          : 'border-indigo-600/50 hover:border-indigo-400'
                      }`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* FRONT OF CARD */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 p-8 flex flex-col justify-between"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold uppercase">
                            {currentDueCard.type} · JLPT {currentDueCard.level}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speechService.speak(currentDueCard.japanese);
                            }}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white"
                            title="Nghe phát âm chuẩn Tokyo"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="text-center space-y-3">
                          <h2 className="text-4xl sm:text-5xl font-black font-jp text-white tracking-wider">
                            {currentDueCard.japanese}
                          </h2>
                          <p className="text-indigo-400 font-mono text-sm">
                            {currentDueCard.reading}
                          </p>
                        </div>

                        <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                          <RotateCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                          <span>Chạm vào thẻ để lật mặt sau xem nghĩa & câu ví dụ</span>
                        </div>
                      </div>

                      {/* BACK OF CARD */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-900 p-7 flex flex-col justify-between [transform:rotateY(180deg)]"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                          <span className="font-mono text-emerald-400 font-bold">
                            Nguồn: {currentDueCard.source}
                          </span>
                          <span className="text-slate-400">Hệ số EF: {currentDueCard.easeFactor}</span>
                        </div>

                        <div className="space-y-3">
                          <div className="text-xl font-bold text-emerald-300 leading-snug">
                            {currentDueCard.vietnamese}
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-900/50 space-y-1.5">
                            <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                              <span>Ngữ cảnh thực tế trong bài:</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speechService.speak(currentDueCard.contextSentence);
                                }}
                                className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <Volume2 className="w-3 h-3" /> Nghe câu
                              </button>
                            </div>
                            <p className="text-sm font-jp text-slate-100 italic leading-relaxed">
                              「{currentDueCard.contextSentence}」
                            </p>
                            <p className="text-xs text-emerald-300 font-sans">
                              👉 {currentDueCard.contextTranslation}
                            </p>
                          </div>
                        </div>

                        <div className="text-center text-[11px] text-slate-400">
                          Đánh giá trí nhớ bên dưới để lên lịch ôn tiếp theo
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rating Buttons based on SuperMemo SM-2 */}
                  {isFlipped && (
                    <div className="grid grid-cols-4 gap-2 pt-2 animate-fadeIn">
                      <button
                        onClick={() => handleRateCard(0)}
                        className="p-3 rounded-2xl bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-200 text-xs font-bold transition-all shadow-md flex flex-col items-center gap-1 cursor-pointer"
                      >
                        <span className="text-sm">❌ Quên</span>
                        <span className="text-[10px] opacity-75 font-mono">&lt; 1 ngày</span>
                      </button>

                      <button
                        onClick={() => handleRateCard(2)}
                        className="p-3 rounded-2xl bg-amber-950/80 hover:bg-amber-900 border border-amber-700/60 text-amber-200 text-xs font-bold transition-all shadow-md flex flex-col items-center gap-1 cursor-pointer"
                      >
                        <span className="text-sm">⚠️ Khó</span>
                        <span className="text-[10px] opacity-75 font-mono">1 ngày</span>
                      </button>

                      <button
                        onClick={() => handleRateCard(4)}
                        className="p-3 rounded-2xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-200 text-xs font-bold transition-all shadow-md flex flex-col items-center gap-1 cursor-pointer"
                      >
                        <span className="text-sm">👍 Nhớ Tốt</span>
                        <span className="text-[10px] opacity-75 font-mono">3 ngày</span>
                      </button>

                      <button
                        onClick={() => handleRateCard(5)}
                        className="p-3 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 text-xs font-bold transition-all shadow-md flex flex-col items-center gap-1 cursor-pointer"
                      >
                        <span className="text-sm">⚡ Rất Dễ</span>
                        <span className="text-[10px] opacity-75 font-mono">7+ ngày</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 2: ALL SAVED CARDS DIRECTORY */}
          {activeTab === 'all_cards' && (
            <div className="space-y-4">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Tìm mục từ, kanji, nghĩa, câu ví dụ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-xs rounded-xl px-3 py-2 text-slate-300 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Tất cả thể loại</option>
                    <option value="vocab">Từ vựng (Vocab)</option>
                    <option value="kanji">Hán tự (Kanji)</option>
                    <option value="grammar">Ngữ pháp</option>
                    <option value="idiom">Thành ngữ / Quán dụng ngữ</option>
                    <option value="email">Kính ngữ Email</option>
                  </select>

                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-xs rounded-xl px-3 py-2 text-slate-300 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Mọi cấp độ</option>
                    <option value="N1">JLPT N1</option>
                    <option value="N2">JLPT N2</option>
                    <option value="N3">JLPT N3</option>
                  </select>
                </div>
              </div>

              {/* Card List Table */}
              <div className="space-y-2">
                {filteredCards.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    Không tìm thấy mục từ nào khớp với bộ lọc.
                  </div>
                ) : (
                  filteredCards.map((card) => (
                    <div
                      key={card.id}
                      className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-700/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg font-black font-jp text-white">
                            {card.japanese}
                          </span>
                          <span className="text-xs text-indigo-400 font-mono">
                            ({card.reading})
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {card.level}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            · Cách nhau: {card.interval}d · Lặp: {card.repetition} lần
                          </span>
                        </div>
                        <p className="text-xs text-emerald-300 font-medium">
                          {card.vietnamese}
                        </p>
                        <p className="text-[11px] text-slate-400 italic font-jp">
                          「{card.contextSentence}」
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => speechService.speak(card.japanese)}
                          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                          title="Phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            srsVaultService.removeCard(card.id);
                            refreshCards();
                          }}
                          className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-500 hover:text-rose-400"
                          title="Xóa khỏi sổ tay"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ANKI EXPORT & CHEAT-SHEET */}
          {activeTab === 'export' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-800/50 space-y-4">
                <div className="flex items-center gap-3">
                  <Download className="w-6 h-6 text-indigo-400" />
                  <div>
                    <h3 className="text-base font-bold text-white">
                      1-Click Xuất Toàn Bộ Sang Anki (.txt / .tsv)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Tương thích 100% với Anki Desktop, AnkiDroid và AnkiMobile iOS. Tự động chia cột Front, Back, Ngữ cảnh và Tags.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadAnki}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Xuống File Anki Deck Ngay ({cards.length} Thẻ)</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-950 border border-emerald-800/50 space-y-4">
                <div className="flex items-center gap-3">
                  <Printer className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h3 className="text-base font-bold text-white">
                      In Bí Kíp 1 Trang PDF (Exam Cheat-Sheet)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Tạo trang in mật độ cao tối ưu khổ giấy A4, kẻ bảng rõ ràng kèm Furigana, ý nghĩa và câu thực tế để xem lại trước giờ vào phòng thi.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handlePrintCheatSheet}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Mở Trang In Bí Kíp A4 / Xuất PDF</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: EBBINGHAUS ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <div className="text-2xl font-black text-indigo-400 font-mono">{cards.length}</div>
                  <div className="text-[11px] text-slate-400">Tổng thẻ trong kho</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <div className="text-2xl font-black text-amber-400 font-mono">{dueCards.length}</div>
                  <div className="text-[11px] text-slate-400">Thẻ cần ôn hôm nay</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {cards.filter((c) => c.repetition >= 3).length}
                  </div>
                  <div className="text-[11px] text-slate-400">Đã ghim trí nhớ dài hạn</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <div className="text-2xl font-black text-cyan-400 font-mono">
                    {(
                      (cards.reduce((acc, c) => acc + c.easeFactor, 0) / (cards.length || 1)).toFixed(2)
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">Hệ số EF trung bình</div>
                </div>
              </div>

              {/* Ebbinghaus Curve Illustration */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Mô Hình Đường Quên Ebbinghaus & Lịch Lặp Lại SM-2
                </h4>
                <div className="h-36 w-full flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-800">
                  {[
                    { label: 'Ngày 0', rate: '100%', h: 'h-full', color: 'bg-emerald-500' },
                    { label: 'Ngày 1', rate: '58%', h: 'h-[58%]', color: 'bg-cyan-500' },
                    { label: 'Ngày 3', rate: '45%', h: 'h-[45%]', color: 'bg-indigo-500' },
                    { label: 'Ngày 7', rate: '35%', h: 'h-[35%]', color: 'bg-amber-500' },
                    { label: 'Ngày 14', rate: '28%', h: 'h-[28%]', color: 'bg-rose-500' },
                    { label: 'Sau SRS', rate: '94%', h: 'h-[94%]', color: 'bg-emerald-400' },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[10px] font-mono text-slate-400 font-bold">{bar.rate}</span>
                      <div className={`w-full rounded-t-lg transition-all ${bar.h} ${bar.color}`} />
                      <span className="text-[9px] text-slate-400 font-sans mt-1">{bar.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Não bộ con người quên 70% kiến thức mới sau 24-48 giờ nếu không kích hoạt hồi tưởng. Thuật toán SuperMemo SM-2 tự động can thiệp vào các mốc then chốt, ép não bộ biến trí nhớ ngắn hạn thành trí nhớ dài hạn vĩnh cửu.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <BookMarked className="w-3.5 h-3.5 text-indigo-400" />
            <span>Nút Bookmark 1-chạm phủ sóng toàn bộ hệ sinh thái</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
          >
            Đóng Sổ Tay
          </button>
        </div>
      </div>

      {/* MODAL: ADD CUSTOM CARD */}
      {isAddingNew && (
        <div className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-600/60 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                Thêm Mục Từ Mới Vào Sổ Tay Trí Nhớ
              </h3>
              <button onClick={() => setIsAddingNew(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomCard} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Mục từ tiếng Nhật / Chữ Hán (*):</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 躊躇 hoặc 一期一会"
                  value={newJapanese}
                  onChange={(e) => setNewJapanese(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-jp text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cách đọc Hiragana / Romaji:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: ちゅうちょ (chūcho)"
                  value={newReading}
                  onChange={(e) => setNewReading(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Ý nghĩa tiếng Việt (*):</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Do dự, ngập ngừng không quyết đoán"
                  value={newVietnamese}
                  onChange={(e) => setNewVietnamese(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Câu văn ngữ cảnh thực tế:</label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: 決断を躊躇している間に好機を逃した。"
                  value={newContext}
                  onChange={(e) => setNewContext(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-jp focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cấp độ JLPT:</label>
                <select
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="N1">JLPT N1 (Cao cấp tinh hoa)</option>
                  <option value="N2">JLPT N2 (Thương mại trung cao cấp)</option>
                  <option value="N3">JLPT N3 (Trung cấp giao tiếp)</option>
                  <option value="N4">JLPT N4 (Sơ trung cấp)</option>
                  <option value="N5">JLPT N5 (Khởi đầu)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl cursor-pointer shadow-lg shadow-emerald-900/30"
                >
                  Lưu Vào Sổ Tay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
