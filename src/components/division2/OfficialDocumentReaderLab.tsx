import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { OfficialDocumentItem } from '../../types/readingJlptExtended';
import { initialOfficialDocsList, extraOfficialDocsList } from '../../data/readingJlptExtendedDatabase';
import {
  FileText,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PlusCircle,
  Sparkles,
  Building2,
  Calendar,
  AlertCircle,
  Search,
  BookMarked,
  Info,
} from 'lucide-react';

interface Props {
  currentLevel?: JLPTLevel;
}

export const OfficialDocumentReaderLab: React.FC<Props> = ({ currentLevel = 'N2' }) => {
  const [items, setItems] = useState<OfficialDocumentItem[]>(initialOfficialDocsList);
  const [extraLoaded, setExtraLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<OfficialDocumentItem>(initialOfficialDocsList[0]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLoadMore = () => {
    if (!extraLoaded) {
      setItems([...items, ...extraOfficialDocsList]);
      setExtraLoaded(true);
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedLevel === 'all') return true;
    return item.level === selectedLevel;
  });

  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    if (isAnswerRevealed) return;
    setUserAnswers({ ...userAnswers, [qIndex]: optIndex });
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5" />
              Chuyên Mục 88 · Đọc Hiểu & JLPT (PH2)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Đọc Hiểu Công Văn Hành Chính & Văn Bản Thực Tế
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30">
                Official Documents & Survival
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Làm chủ dạng bài tìm kiếm thông tin (情報検索) ăn điểm tuyệt đối trong JLPT N2-N1: Giải mã thông báo cắt điện tòa nhà, đơn xin miễn giảm thuế thị dân, thông cáo thu hồi sản phẩm nguy hiểm và quy chế rác thải.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={handleLoadMore}
              disabled={extraLoaded}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${
                extraLoaded
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-400/30 hover:shadow-blue-500/25'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              {extraLoaded ? 'Đã Tải Đủ 10 Văn Bản (+5 Đầy Đủ)' : 'Tải Thêm 5 Văn Bản (+5)'}
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 mr-2 uppercase tracking-wider">Cấp độ JLPT:</span>
          {['all', 'N1', 'N2'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedLevel === lvl
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
              }`}
            >
              {lvl === 'all' ? `Tất Cả (${items.length})` : `${lvl} (${items.filter((i) => i.level === lvl).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Document List & Document Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Danh mục công văn thực tế</span>
            <span className="font-mono text-blue-400">{filteredItems.length} văn bản</span>
          </div>
          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setUserAnswers({});
                    setIsAnswerRevealed(false);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-blue-950/70 border-blue-500/70 shadow-lg shadow-blue-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/40">
                      {item.level}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {item.documentTypeName}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1 font-mono text-blue-400 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {item.organization}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Realistic Document Canvas */}
        <div className="lg:col-span-8 space-y-6">
          {/* Authentic Paper Container */}
          <div className="bg-slate-900/95 border-2 border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl relative font-sans">
            {/* Stamp / Official Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b-2 border-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  Ngày ban hành: {selectedItem.documentHtmlSnippet.issuedDate}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  Cơ quan: <span className="text-slate-200">{selectedItem.organization}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakText(selectedItem.documentHtmlSnippet.mainBody)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold hover:bg-blue-900 transition-all"
                  title="Nghe phát âm công văn"
                >
                  <Volume2 className="w-4 h-4" />
                  Nghe Đọc Công Văn
                </button>
              </div>
            </div>

            {/* Document Title */}
            <div className="text-center my-4 py-2 border-y border-dashed border-slate-800">
              <h2 className="text-lg md:text-xl font-black text-white tracking-wide">
                {selectedItem.documentHtmlSnippet.heading}
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Kính gửi: {selectedItem.documentHtmlSnippet.targetAudience}
              </p>
            </div>

            {/* Main Body */}
            <div className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800 mb-5">
              {selectedItem.documentHtmlSnippet.mainBody}
            </div>

            {/* Bullet Points */}
            <div className="space-y-2 mb-5">
              <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                【Nội dung quy định chi tiết】:
              </h5>
              <div className="space-y-1.5">
                {selectedItem.documentHtmlSnippet.bulletPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs md:text-sm text-slate-100 font-mono"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>

            {/* Exemption & Notes (*注) */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1.5 mb-5">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Điều khoản miễn trừ & Lưu ý đặc biệt (*注 - Điểm thi JLPT):
              </div>
              {selectedItem.documentHtmlSnippet.exemptionsAndNotes.map((note, idx) => (
                <p key={idx} className="text-xs text-amber-200/90 leading-relaxed">
                  {note}
                </p>
              ))}
            </div>

            {/* Contact Inquiry */}
            <div className="text-xs text-slate-400 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span>Đầu mối liên hệ:</span>
              <span className="text-slate-300 font-mono font-medium">
                {selectedItem.documentHtmlSnippet.inquiryContact}
              </span>
            </div>
          </div>

          {/* Administrative Glossary */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookMarked className="w-4 h-4" />
              Thuật Ngữ Hành Chính & Công Quyền Cần Thuộc:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {selectedItem.glossary.map((g, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white font-serif">{g.term}</span>
                    <span className="text-xs text-cyan-400 font-mono">{g.reading}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{g.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Questions (JLPT Joho Kensaku Simulator) */}
          <div className="bg-slate-900/90 border border-blue-800/40 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-400" />
                Mô Phỏng Câu Hỏi Truy Tìm Thông Tin (情報検索):
              </h4>
              <button
                onClick={() => setIsAnswerRevealed(!isAnswerRevealed)}
                className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all"
              >
                {isAnswerRevealed ? 'Ẩn Lời Giải' : 'Kiểm Tra Đáp Án & Manh Mối'}
              </button>
            </div>

            <div className="space-y-5">
              {selectedItem.practicalQuestions.map((q, qIdx) => {
                const selectedOpt = userAnswers[qIdx];
                return (
                  <div key={qIdx} className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <p className="text-sm font-bold text-white leading-relaxed">
                      Câu {qIdx + 1}: {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        let optStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700';

                        if (isAnswerRevealed) {
                          if (optIdx === q.correctIndex) {
                            optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                          } else if (isChosen && optIdx !== q.correctIndex) {
                            optStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                          }
                        } else if (isChosen) {
                          optStyle = 'bg-blue-950 border-blue-500 text-blue-200';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectAnswer(qIdx, optIdx)}
                            className={`p-3 rounded-xl border text-xs md:text-sm cursor-pointer transition-all ${optStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                                {optIdx + 1}
                              </span>
                              <span>{opt}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {isAnswerRevealed && (
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-blue-800/60 text-xs text-slate-300 space-y-1.5">
                        <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Vị trí manh mối trong văn bản:
                        </div>
                        <p className="font-mono text-slate-200 bg-slate-950 p-2 rounded border border-slate-800">
                          {q.clueLocation}
                        </p>
                        <p className="text-slate-400 pt-1">
                          <span className="font-semibold text-slate-300">Phân tích: </span>
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-life Survival Guidance */}
          <div className="bg-gradient-to-r from-indigo-950/50 to-slate-900 border border-indigo-800/40 rounded-2xl p-5 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4" />
              Kinh Nghiệm Sinh Tồn & Hành Chính Tại Nhật:
            </div>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">{selectedItem.realLifeGuidance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
