import React, { useState } from 'react';
import {
  Scale,
  Sparkles,
  BookOpen,
  Volume2,
  Copy,
  Check,
  Zap,
  Globe,
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';
import {
  ContrastiveTranslationResult,
  analyzeContrastiveTranslation
} from '../../services/aiSenseiSuperEnginesService';
import { speechService } from '../../services/speechService';

const SAMPLE_TEXTS = [
  {
    label: 'Cảm ơn và mong được hợp tác tiếp',
    text: 'Tôi rất cảm ơn anh vì đã hỗ trợ tôi rất nhiệt tình trong dự án vừa rồi, tôi hy vọng chúng ta sẽ sớm có cơ hội làm việc lại với nhau trong tương lai.'
  },
  {
    label: 'Từ chối lời mời khéo léo',
    text: 'Thực lòng tôi rất muốn tham gia buổi tiệc tối nay cùng mọi người, nhưng vì tôi đã có hẹn trước với gia đình từ tuần trước nên tôi không thể đi được.'
  },
  {
    label: 'Giải thích nguyên nhân chậm trễ',
    text: 'Chúng tôi nhận trách nhiệm về việc hệ thống bị gián đoạn, nguyên nhân là do kỹ sư của chúng tôi đã cập nhật phần mềm mà chưa kiểm tra kỹ lưỡng.'
  }
];

export const AiSenseiTranslationLabTab: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_TEXTS[0].text);
  const [sourceLang, setSourceLang] = useState<'vi' | 'ja'>('vi');
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<ContrastiveTranslationResult | null>(null);
  const [copiedType, setCopiedType] = useState<'literal' | 'native' | null>(null);

  const handleTranslate = async (customText?: string) => {
    const textToRun = (customText || inputText).trim();
    if (!textToRun || isTranslating) return;
    setIsTranslating(true);
    try {
      const res = await analyzeContrastiveTranslation(textToRun, sourceLang);
      setResult(res);
      speechService.playSuccessSound();
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = (text: string, type: 'literal' | 'native') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-blue-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">⚖️</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Phòng Thí Nghiệm Đối Chiếu Dịch Thuật (Contrastive Studio)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Nâng tầm tư duy biên/phiên dịch. Đối chiếu song song Bản Sát Nghĩa vs Bản Thoát Ý và phân tích triết lý ngôn ngữ Nhật Bản.
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-700/60 font-semibold shrink-0">
            Biên / Phiên Dịch Tinh Hoa
          </span>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Mẫu đối chiếu kinh điển:</span>
          {SAMPLE_TEXTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputText(sample.text);
                handleTranslate(sample.text);
              }}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-950/80 text-blue-200 border border-slate-700/60 hover:border-blue-600 transition-all cursor-pointer"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <span>Văn bản cần phân tích đối chiếu:</span>
          </label>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setSourceLang('vi')}
              className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                sourceLang === 'vi' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              Tiếng Việt ➔ Nhật
            </button>
            <button
              type="button"
              onClick={() => setSourceLang('ja')}
              className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                sourceLang === 'ja' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              Tiếng Nhật ➔ Việt
            </button>
          </div>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập đoạn văn cần đối chiếu dịch thuật..."
          rows={3}
          className="w-full p-4 bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors leading-relaxed"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => handleTranslate()}
            disabled={!inputText.trim() || isTranslating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-950 disabled:opacity-40 cursor-pointer"
          >
            {isTranslating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-blue-200" />
                <span>Đang phân tích đối chiếu 2 tầng...</span>
              </>
            ) : (
              <>
                <Scale className="w-4 h-4 text-blue-200" />
                <span>Thực Thi Đối Chiếu Dịch Thuật</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Contrastive Output */}
      {result && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Dual Translation Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 1. Literal Translation (Sát nghĩa) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2 text-slate-300 font-bold text-xs sm:text-sm">
                  <span className="text-base">⚙️</span>
                  <span>1. Bản Sát Nghĩa (Literal Translation)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => speechService.speakJapanese(result.literalTranslation.text)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(result.literalTranslation.text, 'literal')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    {copiedType === 'literal' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm font-japanese text-slate-200 leading-relaxed">
                {result.literalTranslation.text}
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 text-xs space-y-1.5">
                <div className="text-[11px] text-slate-400 font-semibold">Bóc tách xương sống cú pháp:</div>
                <p className="text-slate-300 leading-relaxed">{result.literalTranslation.anatomicalBreakdown}</p>
                <div className="text-rose-400/90 text-[11px] pt-1 border-t border-slate-800">
                  ⚠️ Hạn chế: {result.literalTranslation.structuralLimitation}
                </div>
              </div>
            </div>

            {/* 2. Native Localization (Thoát ý bản xứ) */}
            <div className="bg-slate-900/90 border border-blue-900/50 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2 text-blue-300 font-bold text-xs sm:text-sm">
                  <span className="text-base">✨</span>
                  <span>2. Bản Thoát Ý Bản Xứ (Native Localization)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                    100% Native
                  </span>
                  <button
                    type="button"
                    onClick={() => speechService.speakJapanese(result.nativeLocalization.text)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(result.nativeLocalization.text, 'native')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 cursor-pointer"
                  >
                    {copiedType === 'native' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-blue-900/40 text-xs sm:text-sm font-japanese text-white font-semibold leading-relaxed">
                {result.nativeLocalization.text}
              </div>

              <div className="p-3 bg-blue-950/30 rounded-xl border border-blue-900/40 text-xs space-y-1">
                <div className="text-[11px] text-blue-300 font-semibold">Sắc thái văn chương / Báo chí tinh tế:</div>
                <p className="text-slate-200 leading-relaxed">{result.nativeLocalization.literaryNuance}</p>
              </div>
            </div>
          </div>

          {/* Linguistic Philosophy Essay */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Bài Luận Triết Lý Ngôn Ngữ Học Đối Chiếu (Linguistic Philosophy)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="font-bold text-indigo-300">Triết lý Bị động (〜られる):</div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {result.linguisticPhilosophyEssay.passiveVoiceLogic}
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="font-bold text-teal-300">Lược bỏ Đại từ nhân xưng:</div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {result.linguisticPhilosophyEssay.pronounOmissionReason}
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="font-bold text-amber-300">Khoảng cách tâm lý (Cushion):</div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {result.linguisticPhilosophyEssay.psychologicalDistance}
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-300 border-t border-slate-800 leading-relaxed">
              {result.professionalTranslatorNotes}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
