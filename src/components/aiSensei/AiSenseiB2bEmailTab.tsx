import React, { useState } from 'react';
import {
  Mail,
  Sparkles,
  Shield,
  Copy,
  Check,
  Volume2,
  Send,
  HelpCircle,
  Award,
  Layers,
  Info
} from 'lucide-react';
import {
  BusinessEmailDrafterResult,
  draftBusinessEmailWithCushionKotoba
} from '../../services/aiSenseiSuperEnginesService';
import { speechService } from '../../services/speechService';

const SAMPLE_IDEAS = [
  {
    label: 'Xin dời deadline dự án',
    text: 'Muốn xin dời deadline dự án bàn giao mã nguồn 3 ngày vì sự cố kiểm thử của bên thứ 3, mong khách hàng thông cảm và không làm mất uy tín công ty.'
  },
  {
    label: 'Từ chối báo giá vượt ngân sách',
    text: 'Cảm ơn đối tác đã gửi báo giá, nhưng tổng chi phí vượt quá ngân sách quý này 20%, xin phép tạm gác lại hoặc đề xuất cắt bớt tính năng phụ để hạ giá.'
  },
  {
    label: 'Tạ lỗi gửi nhầm hóa đơn',
    text: 'Vô cùng xin lỗi khách hàng vì nhân viên kế toán gửi nhầm bản dự thảo hóa đơn có sai sót số tiền, xin thu hồi lại và gửi bản chuẩn xác ngay lập tức.'
  },
  {
    label: 'Đề xuất lịch họp hợp tác mới',
    text: 'Muốn mời giám đốc phía Nhật một buổi họp trực tuyến 30 phút vào tuần tới để giới thiệu giải pháp AI mới tiết kiệm 40% chi phí vận hành.'
  }
];

export const AiSenseiB2bEmailTab: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_IDEAS[0].text);
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftResult, setDraftResult] = useState<BusinessEmailDrafterResult | null>(null);
  const [activeTierIdx, setActiveTierIdx] = useState(1); // Standard B2B default
  const [copied, setCopied] = useState(false);

  const handleDraftEmail = async (customIdea?: string) => {
    const ideaToDraft = (customIdea || inputText).trim();
    if (!ideaToDraft || isDrafting) return;
    setIsDrafting(true);
    try {
      const res = await draftBusinessEmailWithCushionKotoba(ideaToDraft);
      setDraftResult(res);
      speechService.playSuccessSound();
    } finally {
      setIsDrafting(false);
    }
  };

  const handleCopyEmail = (body: string, subject: string) => {
    navigator.clipboard.writeText(`件名: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🏢</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Cỗ Máy Kiến Tạo Văn Bản B2B & Cushion Kotoba Drafter
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Chuyển hóa yêu cầu tiếng Việt thô thành Email doanh nghiệp chuẩn Nhật với 3 tầng sắc thái và bảng phân tích đệm từ bảo vệ thể diện (Kao).
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700/60 font-semibold shrink-0">
            Nghi Thức Thư Tín Tokyo B2B
          </span>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Tình huống thực tế:</span>
          {SAMPLE_IDEAS.map((idea, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setInputText(idea.text);
                handleDraftEmail(idea.text);
              }}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-amber-950/80 text-slate-300 hover:text-amber-200 border border-slate-700/60 hover:border-amber-600 transition-all cursor-pointer"
            >
              {idea.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
          <span>Ý định cần gửi qua email (nhập tiếng Việt hoặc ghi chú thô):</span>
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ví dụ: Xin lỗi khách hàng vì gửi nhầm hóa đơn, mong được gửi lại bản mới và bảo đảm không tái diễn..."
          rows={3}
          className="w-full p-4 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors leading-relaxed"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => handleDraftEmail()}
            disabled={!inputText.trim() || isDrafting}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-950 disabled:opacity-40 cursor-pointer"
          >
            {isDrafting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-200" />
                <span>Đang kiến tạo 3 bản email &amp; đệm từ...</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-amber-200" />
                <span>Kiến Tạo Email B2B Chuẩn Nhật</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Draft Result */}
      {draftResult && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Email Tiers Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Chọn 1 Trong 3 Phiên Bản Sắc Thái B2B:</span>
              </h4>
              <span className="text-xs text-slate-400 font-medium">
                {draftResult.emails[activeTierIdx].recommendedSituation}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {draftResult.emails.map((em, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTierIdx(idx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeTierIdx === idx
                      ? 'bg-amber-950/80 border-amber-500 text-white shadow-md shadow-amber-950/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold">{em.tierName}</div>
                  <div className="text-[11px] opacity-80 mt-1 line-clamp-1">{em.toneSummary}</div>
                </button>
              ))}
            </div>

            {/* Active Email Display */}
            {draftResult.emails[activeTierIdx] && (
              <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="text-xs font-bold text-amber-300 font-japanese">
                    件名: {draftResult.emails[activeTierIdx].subject}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speechService.speakJapanese(draftResult.emails[activeTierIdx].body)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                      title="Nghe đọc email"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyEmail(
                          draftResult.emails[activeTierIdx].body,
                          draftResult.emails[activeTierIdx].subject
                        )
                      }
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer flex items-center gap-1.5 text-xs"
                      title="Sao chép toàn bộ email"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Email Body */}
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 font-japanese text-xs sm:text-sm text-slate-100 whitespace-pre-wrap leading-relaxed">
                  {draftResult.emails[activeTierIdx].body}
                </div>

                {/* Vietnamese Meaning */}
                <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-slate-400 text-[11px]">Bản dịch tiếng Việt đối chiếu:</div>
                  <p className="leading-relaxed">{draftResult.emails[activeTierIdx].vietnameseMeaning}</p>
                </div>
              </div>
            )}
          </div>

          {/* Cushion Kotoba Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Bảng Phân Tích Đệm Từ Lịch Thiệp (Cushion Kotoba) Đã Sử Dụng</span>
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-semibold">
                Bảo Toàn Thể Diện (Kao)
              </span>
            </div>

            <div className="space-y-2.5">
              {draftResult.cushionKotobaTable.map((ck, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-950 rounded-xl border border-amber-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-amber-300 font-japanese">{ck.phrase}</span>
                      <span className="text-xs text-slate-400 font-mono">({ck.romaji})</span>
                      <button
                        type="button"
                        onClick={() => speechService.speakJapanese(ck.phrase)}
                        className="p-1 rounded text-amber-400 hover:bg-slate-800 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-slate-300">{ck.purpose}</div>
                  </div>

                  <div className="text-[11px] text-amber-200/90 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-900/40 shrink-0">
                    🛡️ {ck.faceProtectionFactor}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules & Yamato Takeaway */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Quy Tắc Thư Tín Doanh Nghiệp Cốt Lõi:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              {draftResult.b2bEtiquetteRules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-800 text-amber-300/90 leading-relaxed">
              {draftResult.yamatoAdvice}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
