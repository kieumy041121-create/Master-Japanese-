import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  TreePine,
  Eye,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Volume2,
  Copy,
  Check,
  Zap,
  BookOpen
} from 'lucide-react';
import {
  SmartDocumentXRayResult,
  analyzeSmartDocumentWithTatemae
} from '../../services/aiSenseiSuperEnginesService';
import { speechService } from '../../services/speechService';

const SAMPLE_DOCS = [
  {
    label: 'Đọc Hiểu Triết Học JLPT N1',
    text: '人間が自己の記憶を再構成する過程において、過去の出来事そのものを客観的に想起しているのではなく、現在の自己肯定感や他者との関係性を維持するために、無意識のうちに都合の良い物語へと書き換えているに過ぎないのではないか。十分な検証を経ずして「真実の記憶」と主張することの危うさは、まさにここにある。'
  },
  {
    label: 'Thông Tri Nhân Sự & Cắt Giảm Chi Phí (Tatemae Nikkei)',
    text: '弊社におきましては、今後の持続的な成長と事業ポートフォリオの最適化を鑑み、全社的な業務プロセスの抜本的見直しを実施することと相成りました。つきましては、次世代を担う組織体制構築の一環として、早期希望退職プログラムの導入を慎重に検討いたしました結果、現段階での公募に踏み切る所存でございます。'
  },
  {
    label: 'Điều Khoản Miễn Trừ Trách Nhiệm (Hợp Đồng B2B)',
    text: '天災地変、戦争、暴動その他当事者の責に帰すべからざる事由により本契約の履行が遅延または不能となった場合、当該当事者はその責を負わないものとし、相互に善処策を協議するものとする。'
  }
];

export const AiSenseiSmartReaderTab: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_DOCS[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [xrayResult, setXrayResult] = useState<SmartDocumentXRayResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRunXRay = async (customText?: string) => {
    const textToRun = (customText || inputText).trim();
    if (!textToRun || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const res = await analyzeSmartDocumentWithTatemae(textToRun);
      setXrayResult(res);
      speechService.playSuccessSound();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyResult = () => {
    if (!xrayResult) return;
    navigator.clipboard.writeText(
      `[TÓM TẮT DOKKAI & TATEMAE]\nLuận điểm cốt lõi: ${xrayResult.dokkaiLogicThesis.authorTrueThesis}\nẨn ý Honne: ${xrayResult.tatemaeVsHonneDeconstruction.honneUndercurrent}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📑</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Máy X-Quang Siêu Văn Bản & Tatemae Decoder
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Bóc tách Furigana ngữ cảnh, chặt đứt câu phức 5 dòng bằng sơ đồ cây (Syntax Tree) và lật tẩy ẩn ý Dokkai &amp; Tatemae của tác giả.
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-semibold shrink-0">
            Trị Dứt Điểm Trường Văn N1
          </span>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Văn bản mẫu:</span>
          {SAMPLE_DOCS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputText(sample.text);
                handleRunXRay(sample.text);
              }}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-indigo-950/80 text-slate-300 hover:text-indigo-200 border border-slate-700/60 hover:border-indigo-600 transition-all cursor-pointer"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Dán bất kỳ đoạn văn bản tiếng Nhật nào (bài đọc hiểu JLPT, báo kinh tế Nikkei, hợp đồng thương mại, email đối tác)..."
          rows={3}
          className="w-full p-4 bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors font-japanese leading-relaxed"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Độ dài: {inputText.length} ký tự</span>
          </div>

          <button
            type="button"
            onClick={() => handleRunXRay()}
            disabled={!inputText.trim() || isAnalyzing}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-indigo-950 disabled:opacity-40 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-indigo-200" />
                <span>Đang chụp X-Quang &amp; giải mã...</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-indigo-200" />
                <span>Bắt đầu Chụp X-Quang Văn Bản</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* X-Ray Results */}
      {xrayResult && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* 1. Context-Aware Furigana & Annotated Text */}
          <div className="bg-slate-900/90 border border-indigo-900/40 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>1. Văn Bản Đã Gắn Furigana Chuẩn Xác Theo Ngữ Cảnh</span>
              </h4>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => speechService.speakJapanese(inputText)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  title="Nghe đọc toàn văn"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyResult}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  title="Sao chép kết quả"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div
              className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-japanese text-sm sm:text-base leading-loose"
              dangerouslySetInnerHTML={{ __html: xrayResult.annotatedHtml }}
            />

            {/* Context Furigana Clarifications */}
            {xrayResult.contextFuriganaClarifications.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {xrayResult.contextFuriganaClarifications.map((item, i) => (
                  <div key={i} className="p-2.5 bg-indigo-950/40 border border-indigo-900/50 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-300 font-japanese">{item.word}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                        Đọc là: {item.selectedReading}
                      </span>
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Tránh nhầm với: <span className="text-rose-300 line-through">{item.alternativeReading}</span>
                    </div>
                    <div className="text-slate-300 text-[11px]">{item.reason}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Syntax Tree Diagram (Sơ đồ cây cú pháp) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <TreePine className="w-4 h-4 text-emerald-400" />
              <span>2. Sơ Đồ Cây Cú Pháp (Syntax Tree Deconstruction)</span>
            </h4>

            <div className="space-y-2.5">
              {xrayResult.syntaxTree.map((node, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-2.5"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-sky-300 font-semibold">
                        {node.clauseType}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{node.grammaticalRole}</span>
                    </div>
                    <div className="text-sm font-bold text-white font-japanese">{node.japanese}</div>
                    <div className="text-xs text-slate-300">{node.vietnamese}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Dokkai Thesis & Tatemae Decoder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Dokkai Logic */}
            <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Zap className="w-4 h-4" />
                <span>3A. Bóc Trần Luận Cứ Dokkai Thật Sự Của Tác Giả</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-900/40 space-y-2">
                <div className="text-xs font-bold text-amber-300">🎯 Luận điểm cốt lõi (True Thesis):</div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {xrayResult.dokkaiLogicThesis.authorTrueThesis}
                </p>
                {xrayResult.dokkaiLogicThesis.distractorArguments.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <span className="text-rose-400 font-semibold">Bẫy lừa người đọc: </span>
                    {xrayResult.dokkaiLogicThesis.distractorArguments.join('; ')}
                  </div>
                )}
              </div>
            </div>

            {/* Tatemae vs Honne */}
            <div className="bg-slate-900/90 border border-rose-900/40 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>3B. Giải Mã Lời Nói Bóng Gió (Tatemae vs Honne)</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-rose-900/40 space-y-2.5">
                <div className="text-xs text-slate-300">
                  <span className="text-sky-300 font-semibold">Vỏ bọc lịch thiệp (Tatemae): </span>
                  {xrayResult.tatemaeVsHonneDeconstruction.tatemaeSurface}
                </div>
                <div className="text-xs text-rose-300 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/40">
                  <span className="font-bold">Ẩn ý thật sự (Honne): </span>
                  {xrayResult.tatemaeVsHonneDeconstruction.honneUndercurrent}
                </div>
                <div className="text-[11px] text-slate-400">
                  {xrayResult.tatemaeVsHonneDeconstruction.culturalImplication}
                </div>
              </div>
            </div>
          </div>

          {/* Sensei Takeaway */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 flex items-start gap-2.5">
            <span className="text-lg">🎓</span>
            <div className="leading-relaxed">
              <span className="text-amber-400 font-semibold">Lời bình GS. Yamato: </span>
              {xrayResult.academicTakeaway}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
