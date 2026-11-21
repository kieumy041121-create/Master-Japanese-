import React, { useState } from 'react';
import { PracticalDocItem } from '../../types';
import { masterPracticalSurvivalDocs } from '../../data/practicalReadingDatabase';
import { initialPracticalDocsList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import {
  FileText,
  RefreshCw,
  CreditCard,
  Receipt,
  Building,
  Compass,
  Sparkles,
  AlertTriangle,
  Zap,
  BookOpen,
  Volume2,
  CheckCircle2,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Eye,
  Crosshair,
  BadgeAlert,
  Info,
} from 'lucide-react';

export interface PracticalReadingProps {
  onOpenAiSensei?: (query: string, tab?: 'chat' | 'vocab_assistant' | 'drill_arena' | 'exam_vault' | 'culture' | 'lectures' | 'clinic') => void;
}

export const PracticalReading: React.FC<PracticalReadingProps> = ({ onOpenAiSensei }) => {
  // Combine master database with existing initial list
  const [docList, setDocList] = useState<PracticalDocItem[]>(() => {
    const list = [...masterPracticalSurvivalDocs];
    initialPracticalDocsList.forEach((item) => {
      if (!list.some((it) => it.id === item.id)) {
        list.push(item);
      }
    });
    return list;
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'visual_sim' | 'administrative_glossary' | 'survival_traps' | 'three_second_test'>('visual_sim');

  const filteredDocs = docList.filter((doc) => {
    if (selectedFilter === 'all') return true;
    return doc.docType.includes(selectedFilter) || doc.title.includes(selectedFilter);
  });

  const currentDoc = filteredDocs[currentIndex % (filteredDocs.length || 1)] || docList[0];

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Bạn là "Chuyên gia Cố vấn Sinh tồn & Pháp lý Nhật Bản".
Hãy tạo 1 tài liệu đọc hiểu thực dụng mới toanh (Đúng chuẩn thực chiến 100%: Hóa đơn Gas/Điện, Hợp đồng thuê nhà, Thẻ ngoại kiều, Màn hình ATM, Vé Shinkansen, hoặc Phiếu thuế thị dân Juminzei).
Bắt buộc có đủ 4 trụ cột:
1. visualSimulation: Bố cục trực quan (vị trí con dấu, mã vạch, các ô điền, cảnh báo)
2. administrativeGlossary: Thuật ngữ hành chính & kính ngữ đặc thù
3. survivalTraps: Cảnh báo bẫy sinh tồn & rủi ro mất tiền thực tế
4. threeSecondReflexTest: Bài test hành động phản xạ 3 giây
5. quiz: 1 câu hỏi trắc nghiệm thực chiến
Trả về JSON chuẩn 1 object PracticalDocItem.
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần 1 object PracticalDocItem.');
      const parsed = safeExtractJson<PracticalDocItem | null>(res, null);
      if (parsed && parsed.title) {
        setDocList((prev) => [parsed, ...prev]);
        setCurrentIndex(0);
        speechService.playSuccessSound();
      } else {
        throw new Error('Dữ liệu JSON không hợp lệ');
      }
    } catch {
      // Fallback: recycle existing docs with fresh timestamp
      const recycled: PracticalDocItem = {
        ...masterPracticalSurvivalDocs[(docList.length) % masterPracticalSurvivalDocs.length],
        id: `pdoc_extra_${Date.now()}`,
        title: `${masterPracticalSurvivalDocs[(docList.length) % masterPracticalSurvivalDocs.length].title} (Bản Mới Cập Nhật)`,
      };
      setDocList((prev) => [...prev, recycled]);
      setCurrentIndex(docList.length);
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  const getDocTypeIcon = (docType: string) => {
    if (docType.includes('ATM')) return <CreditCard className="w-4 h-4 text-emerald-400" />;
    if (docType.includes('Thẻ')) return <ShieldAlert className="w-4 h-4 text-blue-400" />;
    if (docType.includes('Hợp đồng')) return <Building className="w-4 h-4 text-rose-400" />;
    if (docType.includes('Vé')) return <Zap className="w-4 h-4 text-cyan-400" />;
    return <Receipt className="w-4 h-4 text-amber-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chuyên Mục 11 · Thao Trường Sinh Tồn & Đọc Hiểu Thực Chiến Nhật Bản</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Góc Đọc Hiểu Thực Dụng: Đời Sống & Doanh Nghiệp
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                100% Giấy Tờ Đời Thực
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Xóa nhòa khoảng cách giữa học trên sách và cuộc sống tại Nhật: Bóc tách bố cục thực tế hóa đơn điện nước, hợp đồng thuê nhà, thẻ lưu trú, cây ATM và vé tàu Shinkansen. Huấn luyện nhận diện bẫy sinh tồn và phản xạ 3 giây không cần ai trợ giúp.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center shrink-0">
            <button
              onClick={handleLoadMoreInfinite}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/30 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
              <span>Tải Nạp Thêm Tài Liệu ({docList.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-800/80 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 mr-2 uppercase tracking-wider">Loại tài liệu:</span>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'ATM', label: '🏧 Màn hình ATM' },
            { id: 'Thẻ ngoại kiều', label: '🪪 Thẻ lưu trú' },
            { id: 'Hợp đồng', label: '📑 Hợp đồng thuê nhà' },
            { id: 'Shinkansen', label: '🚅 Vé Shinkansen' },
            { id: 'Hóa đơn', label: '🧾 Hóa đơn tiền điện/nước' },
          ].map((flt) => (
            <button
              key={flt.id}
              onClick={() => {
                setSelectedFilter(flt.id);
                setCurrentIndex(0);
                speechService.playSuccessSound();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === flt.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Simulated Document & 4 Pillars (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl space-y-5">
            {/* Document Header & Type Badge */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-slate-800 border border-slate-700">
                  {getDocTypeIcon(currentDoc.docType)}
                </span>
                <span className="font-bold text-emerald-400 uppercase tracking-wide">
                  {currentDoc.docType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-mono">Tài liệu số {currentIndex + 1} / {filteredDocs.length}</span>
                <button
                  onClick={() => speechService.speak(currentDoc.title)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Nghe phát âm tiêu đề"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white font-sans leading-snug">
              {currentDoc.title}
            </h3>

            {/* 4 Pillars Tab Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('visual_sim')}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'visual_sim'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>1. Bố Cục Thật</span>
              </button>

              <button
                onClick={() => setActiveTab('administrative_glossary')}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'administrative_glossary'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>2. Thuật Ngữ</span>
              </button>

              <button
                onClick={() => setActiveTab('survival_traps')}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'survival_traps'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>3. Bẫy Sinh Tồn</span>
              </button>

              <button
                onClick={() => setActiveTab('three_second_test')}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'three_second_test'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>4. Phản Xạ 3 Giây</span>
              </button>
            </div>

            {/* TAB 1: VISUAL LAYOUT SIMULATION (Trụ cột 1) */}
            {activeTab === 'visual_sim' && (
              <div className="space-y-4">
                {/* Simulated Document Paper / Screen Box */}
                <div className="bg-slate-950 border-2 border-slate-700/80 rounded-xl p-5 shadow-inner space-y-4 relative overflow-hidden font-mono">
                  {/* Top Warning Banner / Serial Number */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400 flex-wrap gap-2">
                    <span className="text-amber-400 font-bold">
                      {currentDoc.visualSimulation?.warningNoticeTop || '--- [ TÀI LIỆU CHÍNH THỨC / MẪU THỰC TẾ NHẬT BẢN ] ---'}
                    </span>
                    {currentDoc.visualSimulation?.serialNumber && (
                      <span className="text-slate-500 font-mono text-[10px]">
                        {currentDoc.visualSimulation.serialNumber}
                      </span>
                    )}
                  </div>

                  {/* Visual Simulation Sections */}
                  {currentDoc.visualSimulation?.visualSections && currentDoc.visualSimulation.visualSections.length > 0 ? (
                    currentDoc.visualSimulation.visualSections.map((sec, sIdx) => (
                      <div key={sIdx} className="space-y-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800/80">
                        <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
                          <span className="font-bold text-slate-200 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            {sec.sectionTitle}
                          </span>
                          {sec.badgeText && (
                            <span className="text-[10px] text-emerald-300 font-semibold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60">
                              {sec.badgeText}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {sec.fields.map((f, fIdx) => (
                            <div
                              key={fIdx}
                              className={`p-2.5 rounded-lg border transition-all ${
                                f.isHighlighted
                                  ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30'
                                  : 'bg-slate-950/70 border-slate-800/80'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans mb-1">
                                <span>{f.label} ({f.keyJp}):</span>
                                {f.warningBadge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800">
                                    {f.warningBadge}
                                  </span>
                                )}
                              </div>
                              <div className="text-slate-100 font-bold font-jp text-xs sm:text-sm leading-snug">
                                {f.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    /* Fallback to mockVisualData */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {Object.entries(currentDoc.mockVisualData).map(([key, val], idx) => (
                        <div key={idx} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                          <div className="text-slate-400 text-[11px] font-sans">{key}:</div>
                          <div className="text-slate-100 font-bold font-jp mt-0.5 text-sm">{val}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stamp Seal / Barcode Bottom Area */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
                    {currentDoc.visualSimulation?.stampSealText && (
                      <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[11px] border border-rose-800/60 px-2 py-0.5 rounded bg-rose-950/40">
                        <span>【印】</span>
                        <span>{currentDoc.visualSimulation.stampSealText}</span>
                      </div>
                    )}
                    {currentDoc.visualSimulation?.barcodeOrMagnetic && (
                      <div className="font-mono text-slate-500 text-xs tracking-widest">
                        {currentDoc.visualSimulation.barcodeOrMagnetic}
                      </div>
                    )}
                  </div>
                </div>

                {/* Mẹo Khoanh Vùng Thông Tin Cốt Tử */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-emerald-400" />
                    <span>Mẹo Định Vị Vị Trí Mắt Cần Nhìn Để Lấy Thông Tin Nhanh:</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {currentDoc.importantFields.map((f, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1 hover:border-emerald-600/50 transition-colors"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span className="font-bold text-emerald-300 font-jp text-sm">
                            {f.japanese} ({f.label})
                          </span>
                          <span className="text-amber-400 font-semibold text-[11px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                            📍 {f.locationTip}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-sans">{f.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ADMINISTRATIVE GLOSSARY & KEIGO (Trụ cột 2) */}
            {activeTab === 'administrative_glossary' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>Giải Mã Ngôn Ngữ Hành Chính, Kính Ngữ & Chữ Hán Viết Tắt:</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Chuẩn ngữ cảnh cơ quan & máy móc</span>
                </div>

                {currentDoc.administrativeGlossary && currentDoc.administrativeGlossary.length > 0 ? (
                  <div className="space-y-2.5">
                    {currentDoc.administrativeGlossary.map((term, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 hover:border-cyan-600/50 transition-all"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-1.5 pb-1 border-b border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-white font-jp">{term.term}</span>
                            <span className="text-xs text-cyan-300 font-mono">({term.reading})</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => speechService.speak(term.term)}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            {onOpenAiSensei && (
                              <button
                                onClick={() => onOpenAiSensei(term.term, 'vocab_assistant')}
                                className="px-2 py-0.5 rounded bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 text-[10px] font-bold flex items-center gap-1"
                              >
                                <Sparkles className="w-3 h-3 text-amber-300" />
                                <span>Hỏi Sensei</span>
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-slate-200 font-medium">
                          👉 <strong className="text-emerald-400 font-sans">Nghĩa:</strong> {term.meaning}
                        </div>
                        <div className="text-xs text-slate-400 leading-relaxed font-sans bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                          <strong className="text-amber-300">Tại sao người Nhật dùng từ này:</strong> {term.culturalAdministrativeReason}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                    Chưa có danh mục thuật ngữ hành chính chi tiết cho tài liệu này. Hãy nhấn nút &quot;Tải Nạp Thêm Tài Liệu&quot; để trải nghiệm bộ tài liệu chuẩn!
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SURVIVAL TRAPS & RISKS (Trụ cột 3) */}
            {activeTab === 'survival_traps' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Cảnh Báo &quot;Bẫy Sinh Tồn&quot; &amp; Rủi Ro Mất Tiền / Pháp Lý:</span>
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono font-bold">Kỹ năng sinh tồn sống còn</span>
                </div>

                {currentDoc.survivalTraps && currentDoc.survivalTraps.length > 0 ? (
                  <div className="space-y-3">
                    {currentDoc.survivalTraps.map((trap, trIdx) => (
                      <div
                        key={trIdx}
                        className="p-4 rounded-xl bg-gradient-to-br from-rose-950/40 via-slate-950 to-slate-950 border-2 border-rose-800/60 space-y-2.5 shadow-lg shadow-rose-950/20"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-rose-900/40">
                          <div className="flex items-center gap-2">
                            <span className="p-1 rounded bg-rose-900/80 text-rose-200 text-xs font-bold uppercase">
                              {trap.severity === 'critical' ? '🚨 Cực Kỳ Nguy Hiểm' : '⚠️ Rủi Ro Cao'}
                            </span>
                            <h4 className="text-sm font-bold text-white">{trap.dangerTitle}</h4>
                          </div>
                        </div>

                        <div className="text-xs space-y-1.5 font-sans">
                          <div className="text-rose-300 font-semibold">
                            💸 Hậu quả / Mất mát: <span className="text-slate-200 font-normal">{trap.penaltyOrLoss}</span>
                          </div>
                          <div className="text-amber-300 font-semibold">
                            🔍 Cách nhận biết bẫy: <span className="text-slate-200 font-normal">{trap.howToIdentify}</span>
                          </div>
                          <div className="text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                            🛡️ Lời khuyên vàng tự vệ: <span className="text-slate-100 font-normal leading-relaxed">{trap.preventiveAdvice}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                    Chưa có dữ liệu cảnh báo bẫy riêng cho mẫu này.
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: 3-SECOND ACTION REFLEX TEST (Trụ cột 4) */}
            {activeTab === 'three_second_test' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Crosshair className="w-4 h-4 text-amber-400" />
                    <span>Mô Phỏng Tình Huống Phản Xạ 3 Giây (Action Reflex Test):</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono font-bold">Thao trường thực chiến</span>
                </div>

                {currentDoc.threeSecondReflexTest ? (
                  <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/30 via-slate-950 to-indigo-950/30 border border-amber-700/50 space-y-3.5">
                    <div className="space-y-1 pb-2 border-b border-slate-800">
                      <h4 className="text-sm font-bold text-amber-200 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        {currentDoc.threeSecondReflexTest.scenarioTitle}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {currentDoc.threeSecondReflexTest.situationPrompt}
                      </p>
                    </div>

                    {/* Step-by-Step Action Pipeline */}
                    <div className="space-y-2.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Trình tự thao tác chuẩn xác cần phản xạ:
                      </div>
                      {currentDoc.threeSecondReflexTest.actionSteps.map((step, stIdx) => (
                        <div
                          key={stIdx}
                          className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-3 hover:border-amber-600/50 transition-colors"
                        >
                          <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            {step.stepNumber}
                          </span>
                          <div className="space-y-1 text-xs flex-1">
                            <div className="text-white font-medium leading-relaxed font-sans">
                              {step.instruction}
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-1">
                              <span className="text-amber-300 font-semibold font-mono">
                                Mục tiêu chạm: {step.buttonOrTarget}
                              </span>
                              <span className="text-rose-300 font-semibold font-sans">
                                ⚠️ {step.criticalRule}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-xs text-emerald-200 font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Kết quả chuẩn: {currentDoc.threeSecondReflexTest.expectedResult}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                    Chưa có bài test phản xạ 3 giây cho mẫu này.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl shadow-md">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + filteredDocs.length) % filteredDocs.length)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white cursor-pointer transition-colors font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Tài liệu trước</span>
            </button>
            <span className="font-mono font-bold text-emerald-300">
              {currentIndex + 1} / {filteredDocs.length}
            </span>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % filteredDocs.length)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white cursor-pointer transition-colors font-medium"
            >
              <span>Tài liệu tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Quiz & Real-Life Action Test (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <QuizCard
            quiz={currentDoc.quiz}
            title={`Trắc nghiệm thực chiến: ${currentDoc.docType}`}
            onNext={() => setCurrentIndex((prev) => (prev + 1) % filteredDocs.length)}
          />

          {/* Survival Quick Summary Widget */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl text-xs space-y-3 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                Bộ Quy Tắc Sinh Tồn Pháp Lý:
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">Quy chuẩn Nhật Bản</span>
            </div>
            <div className="space-y-2 text-slate-300 leading-relaxed text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
                <span className="text-emerald-400 font-bold">1.</span>
                <span>Luôn giữ lại cuống hóa đơn có đóng dấu tròn đỏ [領収日付印] ít nhất 5 năm để phục vụ hoàn thuế hoặc đối soát.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span>Thẻ ngoại kiều phải luôn mang theo bên người (ngay cả khi chỉ chạy ra mua chai nước). Không mang theo bị cảnh sát phạt tới 200,000円.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span>Hợp đồng thuê nhà: Chụp ảnh hiện trạng mọi vết trầy xước lúc nhận nhà để khi trả nhà không bị trừ sạch tiền cọc Shikikin.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
