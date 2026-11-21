import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  RADICALS_214_DATA,
  CONFUSING_RADICAL_PAIRS,
  JLPT_RADICAL_APPLICATIONS,
  RadicalItem,
  RadicalVocabApplication,
} from '../../data/radicals214Database';
import { speechService } from '../../services/speechService';
import {
  downloadRadicalCSV,
  downloadAllRadicalsCSV,
  downloadRadicalAnkiDeck,
  downloadAllRadicalsAnkiDeck,
  downloadRadicalJSON,
  downloadAllRadicalsJSON,
  parseImportVocabFile,
  formatVocabForClipboard,
} from '../../utils/radicalFileExporter';
import {
  Search,
  BookOpen,
  Layers,
  Sparkles,
  Volume2,
  HelpCircle,
  Award,
  ChevronRight,
  Filter,
  RotateCcw,
  Pencil,
  Check,
  Zap,
  Info,
  Download,
  Upload,
  FileText,
  FileSpreadsheet,
  Printer,
  Copy,
  Plus,
  Trash2,
  Star,
  X,
  ExternalLink,
  CheckCircle,
  FolderDown,
  FileCode,
} from 'lucide-react';

interface RadicalEncyclopediaProps {
  onSelectKanjiForCanvas?: (kanjiChar: string) => void;
}

export const RadicalEncyclopedia: React.FC<RadicalEncyclopediaProps> = ({ onSelectKanjiForCanvas }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStrokeFilter, setSelectedStrokeFilter] = useState<number | 'ALL'>('ALL');
  const [activeViewMode, setActiveViewMode] = useState<
    'grid' | 'file_center' | 'flashcard3col' | 'confusing_pairs' | 'jlpt_applications'
  >('grid');
  const [selectedRadical, setSelectedRadical] = useState<RadicalItem>(RADICALS_214_DATA[8]); // Default: Bộ Nhân 人 (STT 9)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Bộ lọc cấp độ từ vựng trong bộ thủ đang chọn
  const [vocabLevelFilter, setVocabLevelFilter] = useState<'ALL' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('ALL');
  const [vocabSearchQuery, setVocabSearchQuery] = useState<string>('');

  // Dropdown xuất file và modal
  const [showExportDropdown, setShowExportDropdown] = useState<boolean>(false);
  const [showAddVocabModal, setShowAddVocabModal] = useState<boolean>(false);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // File preview tab trong Trung Tâm File
  const [fileCenterPreviewFormat, setFileCenterPreviewFormat] = useState<'csv' | 'anki' | 'json'>('csv');

  // Quản lý từ vựng tự thêm từ người học (lưu trữ localStorage)
  const [customVocabsMap, setCustomVocabsMap] = useState<Record<number, RadicalVocabApplication[]>>(() => {
    try {
      const saved = localStorage.getItem('kotoba_radical_custom_vocabs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Từ vựng được đánh dấu sao (Favorite vocabs)
  const [starredVocabs, setStarredVocabs] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('kotoba_radical_fav_vocabs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Form state cho Thêm từ vựng mới
  const [newVocabKanji, setNewVocabKanji] = useState<string>('');
  const [newVocabHiragana, setNewVocabHiragana] = useState<string>('');
  const [newVocabHánViệt, setNewVocabHánViệt] = useState<string>('');
  const [newVocabMeaning, setNewVocabMeaning] = useState<string>('');
  const [newVocabLevel, setNewVocabLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');
  const [newVocabBreakdown, setNewVocabBreakdown] = useState<string>('');
  const [newVocabMnemonic, setNewVocabMnemonic] = useState<string>('');

  // Import file ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Lưu customVocabsMap vào localStorage khi thay đổi
  useEffect(() => {
    try {
      localStorage.setItem('kotoba_radical_custom_vocabs', JSON.stringify(customVocabsMap));
    } catch (e) {
      console.warn('Could not save custom vocabs to localStorage:', e);
    }
  }, [customVocabsMap]);

  // Lưu starredVocabs vào localStorage khi thay đổi
  useEffect(() => {
    try {
      localStorage.setItem('kotoba_radical_fav_vocabs', JSON.stringify(starredVocabs));
    } catch (e) {
      console.warn('Could not save starred vocabs to localStorage:', e);
    }
  }, [starredVocabs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Flashcard flipped states for 3-column study
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCardFlip = (stt: number) => {
    setFlippedCards((prev) => ({ ...prev, [stt]: !prev[stt] }));
  };

  // Từ vựng đi kèm hiện tại của bộ thủ đang chọn (gốc + tự thêm)
  const currentCombinedVocabs = useMemo(() => {
    const defaultList = selectedRadical.relatedVocab || [];
    const customList = customVocabsMap[selectedRadical.stt] || [];
    return [...defaultList, ...customList];
  }, [selectedRadical, customVocabsMap]);

  // Từ vựng đã lọc theo cấp độ và tìm kiếm
  const currentFilteredVocabs = useMemo(() => {
    return currentCombinedVocabs.filter((v) => {
      if (vocabLevelFilter !== 'ALL' && v.level !== vocabLevelFilter) {
        return false;
      }
      if (!vocabSearchQuery.trim()) return true;
      const q = vocabSearchQuery.toLowerCase().trim();
      return (
        v.kanji.includes(q) ||
        v.hiragana.toLowerCase().includes(q) ||
        v.sinoVietnamese.toLowerCase().includes(q) ||
        v.meaning.toLowerCase().includes(q) ||
        v.breakdown.toLowerCase().includes(q) ||
        v.mnemonic.toLowerCase().includes(q)
      );
    });
  }, [currentCombinedVocabs, vocabLevelFilter, vocabSearchQuery]);

  // Filtered radicals cho danh sách bên trái
  const filteredRadicals = useMemo(() => {
    return RADICALS_214_DATA.filter((r) => {
      // Stroke filter
      if (selectedStrokeFilter !== 'ALL' && r.strokeCount !== selectedStrokeFilter) {
        return false;
      }
      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const combined = [...r.relatedVocab, ...(customVocabsMap[r.stt] || [])];
      return (
        r.radical.includes(q) ||
        (r.variants && r.variants.some((v) => v.includes(q))) ||
        r.name.toLowerCase().includes(q) ||
        r.meaning.toLowerCase().includes(q) ||
        r.mnemonic.toLowerCase().includes(q) ||
        combined.some(
          (v) =>
            v.kanji.includes(q) ||
            v.sinoVietnamese.toLowerCase().includes(q) ||
            v.meaning.toLowerCase().includes(q)
        )
      );
    });
  }, [selectedStrokeFilter, searchQuery, customVocabsMap]);

  const handlePlayVoice = (text: string) => {
    speechService.speak(text);
  };

  const handleSelectRadical = (rad: RadicalItem) => {
    setSelectedRadical(rad);
    handlePlayVoice(rad.radical);
  };

  // Toggle bookmark từ vựng
  const handleToggleStarVocab = (kanji: string) => {
    setStarredVocabs((prev) => {
      const next = { ...prev, [kanji]: !prev[kanji] };
      showToast(next[kanji] ? `Đã lưu chữ【${kanji}】vào Sổ tay từ vựng!` : `Đã bỏ lưu chữ【${kanji}】`);
      return next;
    });
  };

  // Sao chép danh sách từ vựng vào Clipboard
  const handleCopyVocabList = () => {
    const text = formatVocabForClipboard(selectedRadical, currentCombinedVocabs);
    navigator.clipboard.writeText(text);
    showToast(`Đã sao chép toàn bộ ${currentCombinedVocabs.length} từ vựng bộ【${selectedRadical.name}】vào Clipboard!`);
  };

  // Thêm từ vựng mới cho bộ thủ
  const handleAddCustomVocab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVocabKanji.trim() || !newVocabMeaning.trim()) {
      showToast('Vui lòng nhập Chữ Hán và Nghĩa tiếng Việt!');
      return;
    }

    const newVocab: RadicalVocabApplication = {
      kanji: newVocabKanji.trim(),
      hiragana: newVocabHiragana.trim() || newVocabKanji.trim(),
      sinoVietnamese: newVocabHánViệt.trim() || selectedRadical.name.toUpperCase(),
      meaning: newVocabMeaning.trim(),
      level: newVocabLevel,
      breakdown: newVocabBreakdown.trim() || `Bộ ${selectedRadical.name} (${selectedRadical.radical})`,
      mnemonic: newVocabMnemonic.trim() || `Gắn với bộ thủ ${selectedRadical.name} (${selectedRadical.meaning}).`,
    };

    setCustomVocabsMap((prev) => {
      const existing = prev[selectedRadical.stt] || [];
      return {
        ...prev,
        [selectedRadical.stt]: [newVocab, ...existing],
      };
    });

    // Reset form
    setNewVocabKanji('');
    setNewVocabHiragana('');
    setNewVocabHánViệt('');
    setNewVocabMeaning('');
    setNewVocabBreakdown('');
    setNewVocabMnemonic('');
    setShowAddVocabModal(false);
    showToast(`Đã thêm từ vựng mới【${newVocab.kanji}】vào Bộ ${selectedRadical.name}!`);
  };

  // Xóa từ vựng tự thêm
  const handleDeleteCustomVocab = (kanjiToDelete: string) => {
    setCustomVocabsMap((prev) => {
      const existing = prev[selectedRadical.stt] || [];
      const filtered = existing.filter((v) => v.kanji !== kanjiToDelete);
      return {
        ...prev,
        [selectedRadical.stt]: filtered,
      };
    });
    showToast(`Đã xóa từ【${kanjiToDelete}】khỏi danh sách cá nhân.`);
  };

  // Xử lý nạp file (Import)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const imported = parseImportVocabFile(text, file.name);
        setCustomVocabsMap((prev) => {
          const existing = prev[selectedRadical.stt] || [];
          return {
            ...prev,
            [selectedRadical.stt]: [...imported, ...existing],
          };
        });
        showToast(`Nhập file thành công! Đã thêm ${imported.length} từ vựng vào Bộ ${selectedRadical.name}.`);
        setShowImportModal(false);
      } catch (err: any) {
        showToast(err.message || 'Lỗi khi đọc file. Vui lòng kiểm tra định dạng.');
      }
    };
    reader.readAsText(file, 'utf-8');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // In phiếu học tập (Print Sheet)
  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce border border-cyan-400">
          <Zap className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-800/60 rounded-2xl p-6 shadow-xl space-y-4 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-black font-mincho text-cyan-300">214</span>
              <h2 className="text-xl md:text-2xl font-bold text-white font-display">
                Bảng 214 Bộ Thủ Hán Tự & Danh Sách Từ Vựng Đi Kèm
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700/60 font-mono">
                Tích hợp File CSV · Anki · In A4
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Tích hợp trọn vẹn tài liệu Bộ Thủ: Ký tự, biến thể, Tên Hán Việt, Nghĩa, Mẹo nhớ tượng hình và danh sách từ vựng JLPT N5–N1 ứng dụng trực tiếp từ từng bộ thủ. Hỗ trợ xuất/nhập file Excel, Anki Flashcard và in phiếu học tập.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-950/80 border border-slate-800 rounded-xl text-xs overflow-x-auto self-start md:self-auto shrink-0 scrollbar-none">
            <button
              onClick={() => setActiveViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeViewMode === 'grid'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tra Cứu & Từ Vựng</span>
            </button>

            <button
              onClick={() => setActiveViewMode('file_center')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeViewMode === 'file_center'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderDown className="w-3.5 h-3.5 text-emerald-300" />
              <span>Quản Lý File & Xuất Anki</span>
            </button>

            <button
              onClick={() => setActiveViewMode('flashcard3col')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeViewMode === 'flashcard3col'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Thẻ Lật 3 Cột</span>
            </button>

            <button
              onClick={() => setActiveViewMode('confusing_pairs')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeViewMode === 'confusing_pairs'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Mẹo Tránh Nhầm Lẫn</span>
            </button>

            <button
              onClick={() => setActiveViewMode('jlpt_applications')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeViewMode === 'jlpt_applications'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-indigo-300" />
              <span>Từ Vựng JLPT (N5-N1)</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Stroke Selector */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full scrollbar-thin">
            <span className="text-slate-400 font-mono px-2 shrink-0">Nét:</span>
            <button
              onClick={() => setSelectedStrokeFilter('ALL')}
              className={`px-2 py-1 rounded-lg font-mono font-bold transition-colors cursor-pointer shrink-0 ${
                selectedStrokeFilter === 'ALL'
                  ? 'bg-cyan-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất cả (214)
            </button>
            {Array.from({ length: 17 }, (_, i) => i + 1).map((strokes) => {
              const count = RADICALS_214_DATA.filter((r) => r.strokeCount === strokes).length;
              return (
                <button
                  key={strokes}
                  onClick={() => setSelectedStrokeFilter(strokes)}
                  className={`px-2 py-1 rounded-lg font-mono font-medium transition-colors cursor-pointer shrink-0 ${
                    selectedStrokeFilter === strokes
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title={`${strokes} nét (${count} bộ)`}
                >
                  {strokes}N
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bộ thủ, âm Hán, nghĩa, từ vựng..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CHẾ ĐỘ 1: BẢNG TRA CỨU TOÀN DIỆN & TỪ VỰNG ĐI KÈM */}
      {/* ======================================================== */}
      {activeViewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CỘT TRÁI: DANH SÁCH 214 BỘ THỦ */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Danh sách Bộ Thủ: ({filteredRadicals.length} / 214)</span>
              </span>
              <span className="text-[11px] text-slate-400">Bấm bộ thủ để xem từ vựng đi kèm ➔</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-[640px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              {filteredRadicals.map((rad) => {
                const isSelected = rad.stt === selectedRadical.stt;
                const totalVocabCount = rad.relatedVocab.length + (customVocabsMap[rad.stt]?.length || 0);
                return (
                  <button
                    key={rad.stt}
                    onClick={() => handleSelectRadical(rad)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer relative flex flex-col items-center justify-between min-h-[96px] group ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-950 to-slate-900 border-cyan-500 text-white shadow-lg shadow-cyan-950/50 scale-102 ring-1 ring-cyan-500'
                        : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-500">
                      <span>#{rad.stt}</span>
                      <span className="text-cyan-400/80">{totalVocabCount} từ</span>
                    </div>

                    <div className="text-2xl font-mincho font-bold text-cyan-200 group-hover:scale-110 transition-transform">
                      {rad.radical}
                    </div>

                    <div className="w-full space-y-0.5">
                      <div className="text-[11px] font-bold text-amber-300 truncate w-full leading-tight">
                        {rad.name}
                      </div>
                      <div className="text-[9px] text-slate-400 truncate w-full" title={rad.meaning}>
                        {rad.meaning}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CỘT PHẢI: CHI TIẾT BỘ THỦ ĐANG CHỌN & DANH SÁCH TỪ VỰNG ĐI KÈM */}
          <div className="lg:col-span-6 space-y-5">
            {/* Thẻ Chi Tiết Bộ Thủ & Menu File */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800/50 font-bold">
                    Bộ #{selectedRadical.stt} · {selectedRadical.strokeCount} Nét
                  </span>
                  <button
                    onClick={() => handlePlayVoice(selectedRadical.radical)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors cursor-pointer"
                    title="Nghe phát âm bộ thủ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* FILE ACTION BUTTONS & EXPORT DROPDOWN */}
                <div className="flex items-center gap-1.5 relative">
                  {/* Nút Xuất File */}
                  <div className="relative">
                    <button
                      onClick={() => setShowExportDropdown((prev) => !prev)}
                      className="px-2.5 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/60 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                      title="Xuất file danh sách từ vựng bộ thủ"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Xuất File</span>
                    </button>

                    {showExportDropdown && (
                      <div className="absolute right-0 top-full mt-1.5 w-60 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-40 space-y-1">
                        <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
                          Tải File Bộ【{selectedRadical.name}】
                        </div>
                        <button
                          onClick={() => {
                            downloadRadicalCSV(selectedRadical, customVocabsMap[selectedRadical.stt]);
                            setShowExportDropdown(false);
                            showToast(`Đã tải xuống file CSV Excel từ vựng Bộ ${selectedRadical.name}!`);
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-cyan-950/60 text-slate-200 hover:text-cyan-300 flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                          <div>
                            <div className="font-semibold">Tải File Excel (.csv)</div>
                            <div className="text-[10px] text-slate-400">Chuẩn UTF-8 BOM tiếng Nhật/Việt</div>
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            downloadRadicalAnkiDeck(selectedRadical, customVocabsMap[selectedRadical.stt]);
                            setShowExportDropdown(false);
                            showToast(`Đã tải xuống file Thẻ Anki Bộ ${selectedRadical.name}!`);
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-cyan-950/60 text-slate-200 hover:text-cyan-300 flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Layers className="w-4 h-4 text-purple-400" />
                          <div>
                            <div className="font-semibold">Tải Thẻ Anki Flashcards (.txt)</div>
                            <div className="text-[10px] text-slate-400">Nhập trực tiếp vào App Anki</div>
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            downloadRadicalJSON(selectedRadical, customVocabsMap[selectedRadical.stt]);
                            setShowExportDropdown(false);
                            showToast(`Đã tải xuống file JSON Bộ ${selectedRadical.name}!`);
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-cyan-950/60 text-slate-200 hover:text-cyan-300 flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <FileCode className="w-4 h-4 text-amber-400" />
                          <div>
                            <div className="font-semibold">Tải Dữ Liệu JSON (.json)</div>
                            <div className="text-[10px] text-slate-400">Sao lưu & tích hợp phần mềm</div>
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            setShowExportDropdown(false);
                            setShowPrintModal(true);
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-cyan-950/60 text-slate-200 hover:text-cyan-300 flex items-center gap-2 cursor-pointer transition-colors border-t border-slate-800/80"
                        >
                          <Printer className="w-4 h-4 text-cyan-400" />
                          <div>
                            <div className="font-semibold">In Phiếu Học Tập (PDF A4)</div>
                            <div className="text-[10px] text-slate-400">Phiếu Genkoyoshi & Từ vựng</div>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Nút Nhập File (Import) */}
                  <button
                    onClick={() => setShowImportModal(true)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                    title="Nạp thêm file từ vựng riêng (.json, .csv)"
                  >
                    <Upload className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="hidden sm:inline">Nhập File</span>
                  </button>

                  {/* Nút Thêm Từ */}
                  <button
                    onClick={() => setShowAddVocabModal(true)}
                    className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                    title="Thêm từ vựng mới vào bộ thủ này"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Thêm từ</span>
                  </button>

                  {/* Nút Copy */}
                  <button
                    onClick={handleCopyVocabList}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Sao chép toàn bộ từ vựng vào Clipboard"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Character Banner */}
              <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-950 to-indigo-950 border-2 border-cyan-600 flex items-center justify-center text-4xl font-mincho font-bold text-cyan-200 shadow-md shrink-0">
                  {selectedRadical.radical}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                    <span>Bộ {selectedRadical.name}</span>
                    {selectedRadical.variants && (
                      <span className="text-xs text-amber-300 font-mono bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                        Biến thể: {selectedRadical.variants.join(', ')}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    Nghĩa cốt lõi: <strong className="text-cyan-300">{selectedRadical.meaning}</strong>
                  </div>
                </div>
              </div>

              {/* Mẹo Nhớ Tượng Hình / Liên Tưởng */}
              <div className="p-4 bg-amber-950/40 border border-amber-900/50 rounded-xl space-y-1.5 text-amber-100">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mẹo nhớ đơn giản (Tượng hình / Liên tưởng):</span>
                </div>
                <p className="text-xs md:text-sm leading-relaxed text-amber-100 font-medium">
                  {selectedRadical.mnemonic}
                </p>
              </div>

              {/* DANH SÁCH TỪ VỰNG ĐI KÈM BỘ THỦ */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>
                      Từ vựng đi kèm ({currentCombinedVocabs.length} từ · hiển thị {currentFilteredVocabs.length})
                    </span>
                  </h4>

                  {/* Level Filter Segmented Control */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px] font-mono self-start sm:self-auto">
                    {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setVocabLevelFilter(lvl)}
                        className={`px-1.5 py-0.5 rounded font-bold cursor-pointer transition-colors ${
                          vocabLevelFilter === lvl
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {lvl === 'ALL' ? 'Tất cả' : lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-search box for this radical's vocabulary */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={vocabSearchQuery}
                    onChange={(e) => setVocabSearchQuery(e.target.value)}
                    placeholder={`Tìm từ trong bộ ${selectedRadical.name} (Kanji, Romaji, Hán Việt, Nghĩa)...`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  {vocabSearchQuery && (
                    <button
                      onClick={() => setVocabSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* List of Vocabularies */}
                {currentFilteredVocabs.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                    <div>Chưa có từ vựng phù hợp với bộ lọc.</div>
                    <button
                      onClick={() => setShowAddVocabModal(true)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm từ vựng đầu tiên cho bộ này</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                    {currentFilteredVocabs.map((voc, idx) => {
                      const isStarred = !!starredVocabs[voc.kanji];
                      const isCustom = (customVocabsMap[selectedRadical.stt] || []).some(
                        (c) => c.kanji === voc.kanji
                      );

                      return (
                        <div
                          key={idx}
                          className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/90 hover:border-emerald-600/60 space-y-1.5 transition-all shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold font-jp text-indigo-300">{voc.kanji}</span>
                              <span className="text-xs text-slate-300 font-jp">({voc.hiragana})</span>
                              <span className="text-[10px] font-mono text-amber-300 font-bold">
                                [{voc.sinoVietnamese}]
                              </span>
                              {isCustom && (
                                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                                  Tự nạp
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                                {voc.level}
                              </span>

                              {/* Nghe phát âm */}
                              <button
                                onClick={() => handlePlayVoice(voc.kanji)}
                                className="p-1 rounded text-slate-400 hover:text-emerald-300 cursor-pointer transition-colors"
                                title="Nghe phát âm"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Đánh dấu sao */}
                              <button
                                onClick={() => handleToggleStarVocab(voc.kanji)}
                                className={`p-1 rounded cursor-pointer transition-colors ${
                                  isStarred
                                    ? 'text-amber-400'
                                    : 'text-slate-500 hover:text-amber-400'
                                }`}
                                title={isStarred ? 'Bỏ lưu' : 'Lưu từ vào sổ tay'}
                              >
                                <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-400' : ''}`} />
                              </button>

                              {/* Luyện viết trên Canvas */}
                              {onSelectKanjiForCanvas && (
                                <button
                                  onClick={() => {
                                    onSelectKanjiForCanvas(voc.kanji[0]);
                                    showToast(`Đã đưa chữ【${voc.kanji[0]}】lên bảng Canvas Luyện Viết!`);
                                  }}
                                  className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                                  title="Luyện viết chữ này trên Canvas"
                                >
                                  <Pencil className="w-3 h-3" />
                                </button>
                              )}

                              {/* Xóa nếu là từ tự nạp */}
                              {isCustom && (
                                <button
                                  onClick={() => handleDeleteCustomVocab(voc.kanji)}
                                  className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 cursor-pointer"
                                  title="Xóa từ tự thêm này"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="text-xs text-slate-200">
                            ➔ <strong className="text-white">{voc.meaning}</strong>
                          </div>

                          <div className="text-[11px] bg-slate-900/60 p-2 rounded-lg border border-slate-800/70 text-slate-300 space-y-0.5">
                            <div className="text-[10px] text-cyan-400 font-semibold">
                              Cấu thành: {voc.breakdown}
                            </div>
                            <div className="text-[10px] text-slate-400 italic">Mẹo: {voc.mnemonic}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CHẾ ĐỘ 2: TRUNG TÂM FILE & XUẤT ANKI / EXCEL / IN A4 */}
      {/* ======================================================== */}
      {activeViewMode === 'file_center' && (
        <div className="space-y-6">
          {/* Card giới thiệu & Hành động nhanh trọn bộ */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FolderDown className="w-5 h-5 text-emerald-400" />
                  <span>Trung Tâm Quản Lý & Xuất File Dữ Liệu Bộ Thủ Hán Tự</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tải xuống trọn bộ 214 Bộ Thủ hoặc từng bộ thủ theo các định dạng tiêu chuẩn quốc tế: Excel CSV (UTF-8 BOM), Anki Flashcards Deck, JSON, và Phiếu in A4.
                </p>
              </div>

              {/* Nút Tải Nhanh Trọn Bộ 214 */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    downloadAllRadicalsCSV(RADICALS_214_DATA, customVocabsMap);
                    showToast('Đang tải xuống File CSV Trọn bộ 214 Bộ Thủ & Toàn bộ từ vựng JLPT!');
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-950/40"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Tải Full 214 CSV (Excel)</span>
                </button>

                <button
                  onClick={() => {
                    downloadAllRadicalsAnkiDeck(RADICALS_214_DATA, customVocabsMap);
                    showToast('Đang tải xuống Deck Thẻ Anki Trọn bộ 214 Bộ Thủ & Toàn bộ từ vựng!');
                  }}
                  className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-purple-950/40"
                >
                  <Layers className="w-4 h-4" />
                  <span>Tải Full Deck Anki (.txt)</span>
                </button>

                <button
                  onClick={() => {
                    downloadAllRadicalsJSON(RADICALS_214_DATA, customVocabsMap);
                    showToast('Đang tải xuống File JSON Data trọn bộ!');
                  }}
                  className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-950/40"
                >
                  <FileCode className="w-4 h-4" />
                  <span>Tải Full JSON Data</span>
                </button>
              </div>
            </div>

            {/* Chi tiết file của Bộ thủ đang chọn */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: Excel CSV */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Định dạng CSV / Excel</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Đã chèn ký hiệu <code className="text-emerald-300 font-mono">\uFEFF</code> để Microsoft Excel và Google Sheets tự động nhận diện bảng mã UTF-8, không bị lỗi font tiếng Nhật hay tiếng Việt có dấu.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Bộ #{selectedRadical.stt}: {currentCombinedVocabs.length} từ
                  </span>
                  <button
                    onClick={() => {
                      downloadRadicalCSV(selectedRadical, customVocabsMap[selectedRadical.stt]);
                      showToast(`Đã tải file CSV Bộ ${selectedRadical.name}!`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold hover:bg-emerald-900 cursor-pointer"
                  >
                    Tải File Này
                  </button>
                </div>
              </div>

              {/* Box 2: Anki Deck */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Layers className="w-4 h-4" />
                  <span>Thẻ Flashcards Anki</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thiết kế sẵn 3 trường: Mặt trước (Chữ Hán), Mặt sau (Furigana, Hán Việt, Nghĩa, Triết tự, Mẹo nhớ), Thẻ Tag JLPT. Nhập trực tiếp vào Anki chỉ với 1 click.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Sẵn sàng cho Anki Mobile & PC
                  </span>
                  <button
                    onClick={() => {
                      downloadRadicalAnkiDeck(selectedRadical, customVocabsMap[selectedRadical.stt]);
                      showToast(`Đã tải file Anki Bộ ${selectedRadical.name}!`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-purple-950 text-purple-300 border border-purple-800 text-xs font-semibold hover:bg-purple-900 cursor-pointer"
                  >
                    Tải Deck Này
                  </button>
                </div>
              </div>

              {/* Box 3: In Phiếu Học Tập A4 */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Printer className="w-4 h-4" />
                  <span>Phiếu Học Tập & Luyện Viết</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In trực tiếp ra khổ giấy A4 hoặc lưu thành file PDF với bảng ô ly Genkoyoshi kẻ mờ để tập viết chữ, bảng từ vựng đi kèm và cột ghi nhớ cá nhân.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Chuẩn A4 ngang/dọc</span>
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-semibold hover:bg-cyan-900 cursor-pointer"
                  >
                    Xem & In Phiếu
                  </button>
                </div>
              </div>
            </div>

            {/* Bảng xem trước dữ liệu file (Preview Table) */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Xem trước nội dung File: Bộ #{selectedRadical.stt}【{selectedRadical.radical}】· Bộ {selectedRadical.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono">
                    <button
                      onClick={() => setFileCenterPreviewFormat('csv')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        fileCenterPreviewFormat === 'csv'
                          ? 'bg-cyan-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Bảng CSV
                    </button>
                    <button
                      onClick={() => setFileCenterPreviewFormat('anki')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        fileCenterPreviewFormat === 'anki'
                          ? 'bg-purple-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Xem Thẻ Anki
                    </button>
                    <button
                      onClick={() => setFileCenterPreviewFormat('json')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        fileCenterPreviewFormat === 'json'
                          ? 'bg-amber-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Dữ liệu JSON
                    </button>
                  </div>

                  <button
                    onClick={handleCopyVocabList}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </button>
                </div>
              </div>

              {/* Nội dung Preview */}
              {fileCenterPreviewFormat === 'csv' && (
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                        <th className="p-2.5">Chữ Hán</th>
                        <th className="p-2.5">Cách đọc Hiragana</th>
                        <th className="p-2.5">Âm Hán Việt</th>
                        <th className="p-2.5">JLPT</th>
                        <th className="p-2.5">Nghĩa tiếng Việt</th>
                        <th className="p-2.5">Cấu thành triết tự</th>
                        <th className="p-2.5">Mẹo nhớ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
                      {currentCombinedVocabs.map((v, i) => (
                        <tr key={i} className="hover:bg-slate-800/40">
                          <td className="p-2.5 font-bold font-jp text-indigo-300 text-base">{v.kanji}</td>
                          <td className="p-2.5 font-jp text-slate-300">{v.hiragana}</td>
                          <td className="p-2.5 font-mono text-amber-300 font-bold">{v.sinoVietnamese}</td>
                          <td className="p-2.5 font-mono">
                            <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                              {v.level}
                            </span>
                          </td>
                          <td className="p-2.5 text-slate-200">{v.meaning}</td>
                          <td className="p-2.5 text-slate-400 text-[11px]">{v.breakdown}</td>
                          <td className="p-2.5 text-amber-200/90 text-[11px] italic">{v.mnemonic}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {fileCenterPreviewFormat === 'anki' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                  {currentCombinedVocabs.map((v, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
                        <span className="text-[10px] font-mono text-purple-400">Card #{i + 1}</span>
                        <span className="text-[9px] font-mono px-1.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                          Tag: JLPT_{v.level}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg text-center font-jp text-2xl font-bold text-white">
                        {v.kanji}
                      </div>
                      <div className="space-y-1 text-[11px] text-slate-300">
                        <div>
                          <strong>Furigana:</strong> {v.hiragana} [{v.sinoVietnamese}]
                        </div>
                        <div>
                          <strong>Nghĩa:</strong> <span className="text-white font-semibold">{v.meaning}</span>
                        </div>
                        <div className="text-slate-400">
                          <strong>Triết tự:</strong> {v.breakdown}
                        </div>
                        <div className="text-amber-300/90 italic">
                          💡 {v.mnemonic}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {fileCenterPreviewFormat === 'json' && (
                <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 max-h-[360px] overflow-y-auto scrollbar-thin">
                  {JSON.stringify(
                    {
                      radicalStt: selectedRadical.stt,
                      radicalName: selectedRadical.name,
                      radicalChar: selectedRadical.radical,
                      strokeCount: selectedRadical.strokeCount,
                      meaning: selectedRadical.meaning,
                      mnemonic: selectedRadical.mnemonic,
                      vocabCount: currentCombinedVocabs.length,
                      relatedVocab: currentCombinedVocabs,
                    },
                    null,
                    2
                  )}
                </pre>
              )}
            </div>

            {/* Hướng dẫn nhập File vào Anki & Excel */}
            <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-900/50 space-y-2 text-xs text-indigo-200">
              <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                <span>Hướng Dẫn Sử Dụng File:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>
                  <strong>Nhập vào Anki:</strong> Mở Anki trên máy tính ➔ Chọn menu <code className="text-indigo-300">File ➔ Import</code> ➔ Chọn file <code className="text-indigo-300">.txt</code> vừa tải ➔ Chọn trường phân cách là Tab ➔ Bấm Import.
                </li>
                <li>
                  <strong>Mở bằng Microsoft Excel:</strong> Bấm đúp vào file <code className="text-indigo-300">.csv</code> vừa tải. File đã tích hợp sẵn mã UTF-8 BOM chống vỡ tiếng Nhật và dấu tiếng Việt 100%.
                </li>
                <li>
                  <strong>In khổ giấy A4:</strong> Sử dụng nút "In Phiếu Học Tập" ➔ Trình duyệt sẽ mở hộp thoại in ➔ Chọn máy in hoặc chọn mục "Save as PDF" để xuất file PDF bài học.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CHẾ ĐỘ 3: THẺ LẬT FLASHCARD 3 CỘT (TỐI ƯU HỌC NHANH) */}
      {/* ======================================================== */}
      {activeViewMode === 'flashcard3col' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <span>Thẻ Lật 3 Cột Chuẩn Tài Liệu (Flashcard Bộ Thủ)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cột 1: Mặt trước (Ký tự & Biến thể) · Cột 2: Mặt sau (Tên Hán Việt – Nghĩa – Số nét) · Cột 3: Mẹo nhớ tượng hình.
              </p>
            </div>
            <div className="text-xs font-mono text-purple-300 bg-purple-950/80 px-3 py-1 rounded-lg border border-purple-800/50">
              {filteredRadicals.length} thẻ
            </div>
          </div>

          {/* Bảng dạng 3 Cột lật thẻ */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="p-3 w-16 text-center">STT</th>
                  <th className="p-3 w-28 text-center">Cột 1: Mặt trước (Bộ thủ)</th>
                  <th className="p-3 w-48">Cột 2: Mặt sau (Tên – Nghĩa – Nét)</th>
                  <th className="p-3">Cột 3: Ghi chú (Mẹo nhớ tượng hình & triết tự)</th>
                  <th className="p-3 w-28 text-center">Âm thanh / Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredRadicals.map((rad) => {
                  const isFlipped = !!flippedCards[rad.stt];
                  return (
                    <tr
                      key={rad.stt}
                      onClick={() => toggleCardFlip(rad.stt)}
                      className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                        isFlipped ? 'bg-purple-950/20' : ''
                      }`}
                    >
                      <td className="p-3 text-center font-mono text-slate-500 font-bold">
                        #{rad.stt}
                      </td>

                      {/* Cột 1: Mặt trước */}
                      <td className="p-3 text-center">
                        <div className="text-3xl font-mincho font-bold text-cyan-200">
                          {rad.radical}
                        </div>
                        {rad.variants && (
                          <div className="text-[10px] text-amber-300 font-mono mt-0.5">
                            ({rad.variants.join(', ')})
                          </div>
                        )}
                      </td>

                      {/* Cột 2: Mặt sau */}
                      <td className="p-3">
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>Bộ {rad.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {rad.strokeCount} nét
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 font-medium mt-0.5">
                          Nghĩa: <strong className="text-cyan-300">{rad.meaning}</strong>
                        </div>
                      </td>

                      {/* Cột 3: Ghi chú Mẹo nhớ */}
                      <td className="p-3">
                        <div className="text-xs text-amber-100 font-medium leading-relaxed bg-amber-950/30 p-2.5 rounded-xl border border-amber-900/40">
                          {rad.mnemonic}
                        </div>
                      </td>

                      {/* Thao tác */}
                      <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handlePlayVoice(rad.radical)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRadical(rad);
                              setActiveViewMode('grid');
                            }}
                            className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/50 transition-colors cursor-pointer text-[10px] font-bold"
                            title="Xem từ vựng đi kèm"
                          >
                            Từ vựng
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CHẾ ĐỘ 4: MẸO PHÂN BIỆT NHANH CÁC BỘ THỦ DỄ NHẦM LẪN NHẤT */}
      {/* ======================================================== */}
      {activeViewMode === 'confusing_pairs' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-4xl mx-auto">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Mẹo Phân Biệt Nhanh Các Bộ Thủ Dễ Nhầm Lẫn Nhất (Trang 37 Tài Liệu)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Khắc phục triệt để các cặp chữ/bộ thủ có nét tương đồng khiến người học hay nhầm lẫn nhất trong các kỳ thi JLPT.
            </p>
          </div>

          <div className="space-y-4">
            {CONFUSING_RADICAL_PAIRS.map((pair, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-600/50 transition-all space-y-3.5 shadow-md"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <span className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                    <span>💡 {pair.title}</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    Cặp #{idx + 1}
                  </span>
                </div>

                {/* 2 Khối Đối Chiếu Trực Quan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Khối 1 */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-3xl font-mincho font-bold text-cyan-200 shrink-0">
                      {pair.item1.radical}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white">{pair.item1.name}</div>
                      <div className="text-[11px] text-slate-300">Nghĩa: {pair.item1.meaning}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{pair.item1.strokes} nét</div>
                    </div>
                  </div>

                  {/* Khối 2 */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-3xl font-mincho font-bold text-rose-200 shrink-0">
                      {pair.item2.radical}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white">{pair.item2.name}</div>
                      <div className="text-[11px] text-slate-300">Nghĩa: {pair.item2.meaning}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{pair.item2.strokes} nét</div>
                    </div>
                  </div>
                </div>

                {/* Quy Tắc Phân Biệt Sâu Sắc */}
                <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-900/50 text-amber-100 text-xs space-y-1">
                  <div className="font-bold text-amber-300">🔍 Câu thần chú phân biệt:</div>
                  <p className="leading-relaxed font-medium">{pair.distinctionRule}</p>
                </div>

                <div className="text-[11px] text-slate-400 italic">
                  ➔ Mẹo nhớ nhanh: <strong className="text-slate-200">{pair.visualTip}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CHẾ ĐỘ 5: PHẦN 2 - HỆ THỐNG TỪ VỰNG JLPT (N5 - N1) ỨNG DỤNG TỪ BỘ THỦ */}
      {/* ======================================================== */}
      {activeViewMode === 'jlpt_applications' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-4xl mx-auto">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <span>Phần 2: Hệ Thống Từ Vựng JLPT (N5 – N1) Ứng Dụng Từ Bộ Thủ</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Trích xuất chuẩn xác từ tài liệu: Phân tích các chữ Hán và từ ghép thực chiến qua bộ thủ cấu thành.
            </p>
          </div>

          {/* Phân nhóm theo 3 cấp bậc */}
          {(['N5', 'N3', 'N1'] as const).map((tierKey) => {
            const tierTitle =
              tierKey === 'N5'
                ? '🟢 Nhóm Sơ Cấp (JLPT N5 – N4)'
                : tierKey === 'N3'
                ? '🟡 Nhóm Trung Cấp (JLPT N3 – N2)'
                : '🔴 Nhóm Cao Cấp (JLPT N1)';

            const tierVocabs = JLPT_RADICAL_APPLICATIONS.filter((v) => {
              if (tierKey === 'N5') return v.level === 'N5' || v.level === 'N4';
              if (tierKey === 'N3') return v.level === 'N3' || v.level === 'N2';
              return v.level === 'N1';
            });

            return (
              <div key={tierKey} className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span>{tierTitle}</span>
                  <span className="text-xs text-slate-400 font-mono">{tierVocabs.length} từ vựng</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {tierVocabs.map((v, i) => (
                    <div
                      key={i}
                      className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-600/60 transition-all shadow-md group"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/70 pb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl font-bold font-jp text-indigo-200">{v.kanji}</span>
                          <div>
                            <div className="text-xs text-slate-300 font-jp">({v.hiragana})</div>
                            <div className="text-[10px] font-mono text-amber-300 font-bold">[{v.sinoVietnamese}]</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">
                            {v.level}
                          </span>
                          <button
                            onClick={() => handlePlayVoice(v.kanji)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          {onSelectKanjiForCanvas && (
                            <button
                              onClick={() => {
                                onSelectKanjiForCanvas(v.kanji[0]);
                                showToast(`Đã đưa chữ【${v.kanji[0]}】lên Canvas Luyện Viết!`);
                              }}
                              className="p-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/50 cursor-pointer"
                              title="Luyện viết chữ này trên Canvas"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-slate-200">
                        Nghĩa: <strong className="text-white">{v.meaning}</strong>
                      </div>

                      <div className="p-2.5 bg-slate-900/70 rounded-lg border border-slate-800 space-y-1 text-xs">
                        <div className="text-[11px] text-cyan-300 font-semibold flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          <span>Bộ thủ cấu thành: {v.breakdown}</span>
                        </div>
                        <div className="text-slate-300 text-[11px] leading-relaxed">
                          💡 Mẹo nhớ: {v.mnemonic}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: THÊM TỪ VỰNG MỚI CHO BỘ THỦ */}
      {/* ======================================================== */}
      {showAddVocabModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 no-print">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Thêm Từ Vựng Đi Kèm Cho Bộ #{selectedRadical.stt}【{selectedRadical.radical}】· Bộ {selectedRadical.name}
                </h3>
              </div>
              <button
                onClick={() => setShowAddVocabModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomVocab} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Chữ Hán (Kanji) *</label>
                  <input
                    type="text"
                    required
                    value={newVocabKanji}
                    onChange={(e) => setNewVocabKanji(e.target.value)}
                    placeholder="VD: 休, 林, 語..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-jp text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Cách đọc Hiragana</label>
                  <input
                    type="text"
                    value={newVocabHiragana}
                    onChange={(e) => setNewVocabHiragana(e.target.value)}
                    placeholder="VD: やすむ (yasumu)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-jp focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Âm Hán Việt</label>
                  <input
                    type="text"
                    value={newVocabHánViệt}
                    onChange={(e) => setNewVocabHánViệt(e.target.value)}
                    placeholder="VD: HƯU, LÂM, NGÔN..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white uppercase focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Cấp độ JLPT</label>
                  <select
                    value={newVocabLevel}
                    onChange={(e) => setNewVocabLevel(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="N5">JLPT N5 (Sơ cấp)</option>
                    <option value="N4">JLPT N4 (Sơ cấp)</option>
                    <option value="N3">JLPT N3 (Trung cấp)</option>
                    <option value="N2">JLPT N2 (Trung cấp)</option>
                    <option value="N1">JLPT N1 (Cao cấp)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nghĩa tiếng Việt *</label>
                <input
                  type="text"
                  required
                  value={newVocabMeaning}
                  onChange={(e) => setNewVocabMeaning(e.target.value)}
                  placeholder="VD: Nghỉ ngơi, vắng mặt..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Cấu thành triết tự</label>
                <input
                  type="text"
                  value={newVocabBreakdown}
                  onChange={(e) => setNewVocabBreakdown(e.target.value)}
                  placeholder={`VD: ${selectedRadical.radical} (${selectedRadical.name}) + ...`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Mẹo nhớ liên tưởng</label>
                <textarea
                  rows={2}
                  value={newVocabMnemonic}
                  onChange={(e) => setNewVocabMnemonic(e.target.value)}
                  placeholder="VD: Người đứng tựa vào cây để nghỉ ngơi..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddVocabModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer shadow-lg shadow-emerald-950/50 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu Từ Vựng</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: NHẬP FILE TỪ VỰNG (IMPORT JSON / CSV) */}
      {/* ======================================================== */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 no-print">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  Nhập File Từ Vựng Vào Bộ #{selectedRadical.stt}
                </h3>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed">
                Bạn có thể nạp thêm danh sách từ vựng từ máy tính dưới dạng file <strong className="text-indigo-300">.json</strong> hoặc <strong className="text-emerald-300">.csv</strong>. Dữ liệu sẽ tự động được gộp vào Bộ <span className="text-amber-300 font-bold">{selectedRadical.name}</span>.
              </p>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-all space-y-2"
              >
                <Upload className="w-8 h-8 text-indigo-400 mx-auto" />
                <div className="font-semibold text-white">Chọn hoặc Kéo Thả File Vào Đây</div>
                <div className="text-[11px] text-slate-400">Hỗ trợ các file .json, .csv, .txt (TSV)</div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="font-bold text-slate-300">Định dạng file CSV hỗ trợ:</div>
                <div>Kanji, Hiragana, Hán Việt, Nghĩa, Cấp độ, Cấu thành, Mẹo nhớ</div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: IN PHIẾU HỌC TẬP & LUYỆN VIẾT A4 (PRINT SHEET) */}
      {/* ======================================================== */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl p-6 space-y-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto scrollbar-thin">
            {/* Header điều khiển (Không in) */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 no-print">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  Xem Trước & In Phiếu Học Tập A4 · Bộ #{selectedRadical.stt}【{selectedRadical.radical}】
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTriggerPrint}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-950/50"
                >
                  <Printer className="w-4 h-4" />
                  <span>In Ngay / Lưu PDF</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="text-slate-400 hover:text-white p-2 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* BẢN IN THỰC TẾ (Sẽ hiển thị trên giấy A4 hoặc file PDF) */}
            <div className="bg-white text-black p-8 rounded-xl shadow-lg space-y-6 print-page font-sans">
              {/* Header phiếu */}
              <div className="border-b-2 border-black pb-4 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold tracking-tight uppercase">
                    KOTOBA INFINITY · PHIẾU HỌC TẬP 214 BỘ THỦ HÁN TỰ
                  </h1>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Tài liệu chuẩn mực phân tích bộ thủ, ô ly luyện viết và danh sách từ vựng ứng dụng JLPT
                  </p>
                </div>
                <div className="text-right text-xs font-mono">
                  <div className="font-bold text-base">BỘ THỦ #{String(selectedRadical.stt).padStart(3, '0')}</div>
                  <div className="text-gray-500">{selectedRadical.strokeCount} nét viết</div>
                </div>
              </div>

              {/* Khung Thông Tin Bộ Thủ & Ô Ly Viết Tay */}
              <div className="grid grid-cols-12 gap-4 border border-black p-4 rounded-lg bg-gray-50">
                <div className="col-span-3 flex flex-col items-center justify-center border-r border-gray-300 pr-4">
                  <div className="text-5xl font-mincho font-black text-black">
                    {selectedRadical.radical}
                  </div>
                  <div className="text-sm font-bold mt-1">Bộ {selectedRadical.name}</div>
                  {selectedRadical.variants && (
                    <div className="text-xs text-gray-600 font-mono mt-0.5">
                      Biến thể: {selectedRadical.variants.join(', ')}
                    </div>
                  )}
                </div>

                <div className="col-span-9 space-y-2 pl-2 text-xs">
                  <div>
                    <strong>Ý nghĩa cốt lõi:</strong> {selectedRadical.meaning}
                  </div>
                  <div>
                    <strong>Mẹo nhớ tượng hình:</strong> {selectedRadical.mnemonic}
                  </div>

                  {/* Hàng Ô Ly Genkoyoshi Tập Viết Bộ Thủ */}
                  <div className="pt-2">
                    <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">
                      Ô ly luyện viết tay bộ thủ:
                    </div>
                    <div className="flex gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 border border-gray-400 relative flex items-center justify-center bg-white"
                        >
                          <div className="absolute inset-0 border-t border-gray-200 top-1/2 -translate-y-1/2 border-dashed"></div>
                          <div className="absolute inset-0 border-l border-gray-200 left-1/2 -translate-x-1/2 border-dashed"></div>
                          {i === 0 && (
                            <span className="text-xl font-mincho text-gray-300 font-bold select-none">
                              {selectedRadical.radical}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bảng Danh Sách Từ Vựng Đi Kèm Bộ Thủ */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-1 flex justify-between">
                  <span>DANH SÁCH TỪ VỰNG ĐI KÈM BỘ THỦ ({currentCombinedVocabs.length} TỪ)</span>
                  <span className="font-normal text-gray-600">Trọng tâm thi JLPT N5 - N1</span>
                </h3>

                <table className="w-full text-left text-xs border border-black border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-black text-[10px] uppercase font-bold">
                      <th className="p-2 border-r border-black w-10 text-center">STT</th>
                      <th className="p-2 border-r border-black w-24 text-center">Chữ Hán</th>
                      <th className="p-2 border-r border-black w-28">Cách đọc (Furigana)</th>
                      <th className="p-2 border-r border-black w-24">Âm Hán Việt</th>
                      <th className="p-2 border-r border-black w-14 text-center">Cấp độ</th>
                      <th className="p-2 border-r border-black">Nghĩa tiếng Việt</th>
                      <th className="p-2">Cấu thành & Mẹo nhớ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {currentCombinedVocabs.map((v, idx) => (
                      <tr key={idx} className="border-b border-gray-300">
                        <td className="p-2 border-r border-black text-center font-mono">{idx + 1}</td>
                        <td className="p-2 border-r border-black text-center font-mincho text-base font-bold">
                          {v.kanji}
                        </td>
                        <td className="p-2 border-r border-black font-jp">{v.hiragana}</td>
                        <td className="p-2 border-r border-black font-bold font-mono">{v.sinoVietnamese}</td>
                        <td className="p-2 border-r border-black text-center font-mono font-bold">{v.level}</td>
                        <td className="p-2 border-r border-black font-semibold">{v.meaning}</td>
                        <td className="p-2 text-[11px]">
                          <div><strong>Cấu thành:</strong> {v.breakdown}</div>
                          <div className="text-gray-600 italic"><strong>Mẹo:</strong> {v.mnemonic}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Phần ghi chú của người học */}
              <div className="pt-2 border-t border-gray-300 text-xs text-gray-600 flex justify-between items-center">
                <div>Kotoba Infinity 言葉無限 · Bản quyền tài liệu học tập bộ thủ</div>
                <div>Ngày in: {new Date().toLocaleDateString('vi-VN')} · Chữ ký học viên: ....................</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
