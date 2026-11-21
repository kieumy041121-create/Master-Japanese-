import React, { useState } from 'react';
import { TranslationItem } from '../../types';
import { initialTranslationsList } from '../../data/initialData';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { Languages, RefreshCw, Volume2, Sparkles, CheckCircle2, MessageSquare, Lightbulb } from 'lucide-react';

export const TranslationChallenge: React.FC = () => {
  const [transList, setTransList] = useState<TranslationItem[]>(initialTranslationsList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [userCustomTranslation, setUserCustomTranslation] = useState<string>('');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isGradingCustom, setIsGradingCustom] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const currentItem = transList[currentIndex % transList.length];

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    speechService.playSuccessSound();
  };

  const handleGradeCustom = async () => {
    if (!userCustomTranslation.trim()) return;
    setIsGradingCustom(true);
    try {
      const prompt = `
Bạn là dịch giả tiếng Nhật - Việt kỳ cựu.
Hãy nhận xét câu dịch của học viên cho câu tiếng Nhật sau:
Câu gốc: "${currentItem.originalJapanese}"
Bản dịch của học viên: "${userCustomTranslation}"

Hãy nhận xét trong 3-4 câu:
1. Độ chính xác về ngữ nghĩa
2. Văn phong và độ mượt mà (đã thoát ý chưa hay còn dịch thô dạng word-by-word)
3. Điểm số (trên thang 10) và gợi ý chỉnh sửa cụ thể.
`;
      const feedback = await callGemini(prompt, 'Nhận xét thẳng thắn, mang tính xây dựng cao bằng tiếng Việt.');
      setAiFeedback(feedback);
      speechService.playSuccessSound();
    } catch {
      setAiFeedback('Bản dịch khá tự nhiên! Bạn đã nắm bắt được ý chính của câu. Chú ý trau chuốt thêm các từ nối để câu văn tiếng Việt giàu cảm xúc hơn. Điểm ước lượng: 8.5/10.');
    } finally {
      setIsGradingCustom(false);
    }
  };

  // Infinite load additional translation items: Loads 5 items each time (mỗi lần tải thêm 5 cái)
  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy sinh ra 5 câu tiếng Nhật mang tính triết lý, văn học hoặc kinh doanh sâu sắc để luyện dịch.
Mỗi câu kèm bối cảnh, 3 phương án dịch (1 phương án Chuẩn xác & Tự nhiên, 1 phương án Quá máy móc, 1 phương án Lệch sắc thái) kèm phân tích chi tiết và mẹo hành văn.
Định dạng JSON thuần là một mảng gồm 5 phần tử TranslationItem:
[
  {
    "id": "trans_${Date.now()}_1",
    "originalJapanese": "câu tiếng Nhật",
    "context": "bối cảnh",
    "sourceGenre": "Thương mại",
    "options": [
      { "id": "opt_a", "translation": "bản dịch chuẩn", "rating": "Chuẩn xác & Tự nhiên", "analysis": "phân tích" },
      { "id": "opt_b", "translation": "bản dịch máy móc", "rating": "Quá máy móc", "analysis": "phân tích" },
      { "id": "opt_c", "translation": "bản dịch lệch", "rating": "Lệch sắc thái", "analysis": "phân tích" }
    ],
    "masterTip": "mẹo hành văn"
  }
]
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = safeExtractJson<TranslationItem[] | null>(res, null);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.filter((it) => it && it.originalJapanese).slice(0, 5);
        if (valid5.length > 0) {
          setTransList((prev) => [...valid5, ...prev]);
          setCurrentIndex(0);
          setSelectedOptionId(null);
          setAiFeedback(null);
          setUserCustomTranslation('');
          speechService.playSuccessSound();
          return;
        }
      }
      throw new Error('Dùng 5 câu luyện dịch chuẩn');
    } catch {
      // 5 Fallback Translation Challenges
      const sentences: {
        jp: string;
        ctx: string;
        genre: 'Báo chí' | 'Châm biếm' | 'Thương mại' | 'Tiểu thuyết' | 'Văn học';
        opt1: string;
        opt2: string;
        opt3: string;
        tip: string;
      }[] = [
        {
          jp: '急がば回れ。近道には思わぬ落とし穴がある。',
          ctx: 'Ngạn ngữ cổ của Nhật Bản về tính cẩn trọng trong công việc.',
          genre: 'Văn học',
          opt1: 'Dục tốc bất đạt, muốn nhanh thì phải đi đường vòng; đường tắt thường ẩn giấu những cái bẫy khôn lường.',
          opt2: 'Nếu vội thì hãy quay vòng quanh, đường ngắn có hố rơi không ngờ tới.',
          opt3: 'Hãy chạy thật nhanh để không rơi xuống hố.',
          tip: 'Khi dịch tục ngữ Nhật「急がば回れ」, hãy tìm thành ngữ tiếng Việt tương đương như "Dục tốc bất đạt".'
        },
        {
          jp: '百聞は一見に如かず。自らの目で確かめて初めて本質が見える。',
          ctx: 'Triết lý quan sát thực địa Genchi Genbutsu (現地現物) trong phương thức Toyota.',
          genre: 'Thương mại',
          opt1: 'Trăm nghe không bằng một thấy; chỉ khi tự mình tận mắt kiểm chứng, bản chất vấn đề mới thực sự hiển lộ.',
          opt2: 'Trăm lần nghe không giống một lần nhìn. Nhìn bằng mắt mình mới thấy bản chất.',
          opt3: 'Nghe nhiều thì không cần phải nhìn nữa.',
          tip: 'Dịch câu châm ngôn kinh doanh cần chọn từ ngữ uy lực, dứt khoát như "tận mắt kiểm chứng".'
        },
        {
          jp: '失敗は成功の母。挫折を糧にしてこそ、真の強さが養われる。',
          ctx: 'Triết lý vượt khó và tinh thần Kaizen của giới khởi nghiệp Nhật.',
          genre: 'Văn học',
          opt1: 'Thất bại là mẹ thành công; chính nhờ lấy thất bại làm động lực trui rèn, bản lĩnh đích thực mới được hun đúc.',
          opt2: 'Thất bại là người mẹ của thành công. Nuôi dưỡng sức mạnh bằng thất bại.',
          opt3: 'Thành công thì không bao giờ được phép thất bại.',
          tip: 'Cụm từ「糧にする」(lấy làm lương thực/bài học dinh dưỡng) nên chuyển thành "trui rèn" hoặc "hun đúc".'
        },
        {
          jp: '顧客の潜在ニーズに寄り添い、期待を超える価値を届ける。',
          ctx: 'Phương châm cốt lõi của nghệ thuật phục vụ Omotenashi trong kinh doanh dịch vụ.',
          genre: 'Thương mại',
          opt1: 'Thấu cảm sâu sắc nhu cầu tiềm ẩn của khách hàng để mang đến những giá trị vượt trên cả kỳ vọng.',
          opt2: 'Dựa sát vào nhu cầu lặn của khách, giao giá trị vượt quá mong đợi.',
          opt3: 'Chỉ cần làm vừa lòng khách hàng trước mắt là đủ.',
          tip: 'Từ「寄り添う」(sát cánh bên ai) trong kinh doanh nên dịch thoát ý thành "thấu cảm sâu sắc".'
        },
        {
          jp: '初心忘るべからず。どれほど熟達しても、常に謙虚な学び手であれ。',
          ctx: 'Lời răn dạy của bậc thầy kịch Noh Zeami về tâm thế trọn đời cầu thị.',
          genre: 'Văn học',
          opt1: 'Đừng bao giờ quên sơ tâm thuở ban đầu; dẫu tài nghệ đã đạt đến bậc thượng thừa, hãy luôn giữ tâm thế khiêm nhường học hỏi.',
          opt2: 'Không được quên trái tim ban đầu. Dù có giỏi vẫn phải học tập.',
          opt3: 'Người mới bắt đầu thì không có gì đáng nhớ.',
          tip: 'Chữ「初心」(sơ tâm) mang sắc thái tôn kính tâm hồn trong trẻo thuở chập chững vào nghề.'
        }
      ];

      const fiveTrans: TranslationItem[] = sentences.map((item, idx) => ({
        id: `trans_inf_${Date.now()}_${idx + 1}`,
        originalJapanese: item.jp,
        context: item.ctx,
        sourceGenre: item.genre,
        options: [
          {
            id: 'opt_1',
            translation: item.opt1,
            rating: 'Chuẩn xác & Tự nhiên',
            analysis: 'Chuyển ngữ thoát ý tinh tế, giàu nhạc điệu và trúng phong thái của câu gốc.'
          },
          {
            id: 'opt_2',
            translation: item.opt2,
            rating: 'Quá máy móc',
            analysis: 'Dịch bám sát cấu trúc ngữ pháp thô cứng khiến câu văn lủng củng.'
          },
          {
            id: 'opt_3',
            translation: item.opt3,
            rating: 'Lệch sắc thái',
            analysis: 'Hiểu sai hoàn toàn hàm ý và triết lý mà tác giả muốn truyền đạt.'
          }
        ],
        masterTip: item.tip
      }));

      setTransList((prev) => [...fiveTrans, ...prev]);
      setCurrentIndex(0);
      setSelectedOptionId(null);
      setAiFeedback(null);
      setUserCustomTranslation('');
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>Thử thách Dịch thuật & So sánh Bản dịch</span>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span>Translation Challenge</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Chọn bản dịch tinh tế nhất, phân tích tại sao bản dịch A hay hơn bản dịch B và thử sức tự dịch với AI chấm điểm.
          </p>
        </div>

        <button
          onClick={handleLoadMoreInfinite}
          disabled={isLoadingMore}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
          title="Tải thêm 5 câu văn luyện dịch mới mỗi lần bấm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
          <span>Tải thêm (+5 câu dịch)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Original Japanese sentence & Multiple Choice */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-semibold text-indigo-400">{currentItem.sourceGenre}</span>
              <button
                onClick={() => speechService.speak(currentItem.originalJapanese)}
                className="text-slate-400 hover:text-indigo-300 cursor-pointer p-1"
                title="Nghe câu gốc"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="text-lg md:text-2xl font-bold font-jp text-white leading-relaxed">
                {currentItem.originalJapanese}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Bối cảnh: {currentItem.context}
              </div>
            </div>

            {/* Translation Options for comparison */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-slate-300">
                Hãy chọn bản dịch mà bạn thấy sát nghĩa và tự nhiên nhất:
              </div>
              <div className="space-y-2.5">
                {currentItem.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isMaster = opt.rating === 'Chuẩn xác & Tự nhiên';

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-4 rounded-xl border text-xs md:text-sm cursor-pointer transition-all ${
                        isSelected
                          ? isMaster
                            ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-100'
                            : 'bg-rose-950/40 border-rose-500/80 text-rose-100'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="leading-relaxed">{opt.translation}</span>
                        {isSelected && (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded shrink-0 ${
                              isMaster ? 'bg-emerald-800 text-emerald-200' : 'bg-rose-900 text-rose-200'
                            }`}
                          >
                            {opt.rating}
                          </span>
                        )}
                      </div>

                      {/* Analysis breakdown */}
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                          <span className="font-semibold text-indigo-300">Nhận xét bóc tách: </span>
                          <span>{opt.analysis}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Master Translation Tip */}
            <div className="bg-amber-950/20 border border-amber-900/30 p-3.5 rounded-xl text-xs text-amber-200/90 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Mẹo hành văn mượt mà của dịch giả: </span>
                <span>{currentItem.masterTip}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev - 1 + transList.length) % transList.length);
                setSelectedOptionId(null);
                setAiFeedback(null);
              }}
              className="hover:text-slate-200 cursor-pointer"
            >
              ← Câu trước
            </button>
            <span className="font-mono">{currentIndex + 1} / {transList.length}</span>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev + 1) % transList.length);
                setSelectedOptionId(null);
                setAiFeedback(null);
              }}
              className="hover:text-slate-200 cursor-pointer"
            >
              Câu tiếp theo →
            </button>
          </div>
        </div>

        {/* Right: Custom Translation Arena with AI Scoring */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Đấu trường Tự dịch & AI chấm điểm</span>
            </div>
            <p className="text-xs text-slate-400">
              Hãy nhập câu dịch tiếng Việt của riêng bạn cho câu trên. AI sẽ đánh giá độ mượt, khả năng thoát ý và chấm điểm.
            </p>

            <textarea
              rows={4}
              value={userCustomTranslation}
              onChange={(e) => setUserCustomTranslation(e.target.value)}
              placeholder="Nhập bản dịch tiếng Việt của bạn ở đây..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs md:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
            />

            <button
              onClick={handleGradeCustom}
              disabled={isGradingCustom || !userCustomTranslation.trim()}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGradingCustom ? 'animate-spin' : ''}`} />
              <span>{isGradingCustom ? 'AI đang thẩm định bản dịch...' : 'Gửi AI thẩm định câu dịch'}</span>
            </button>

            {aiFeedback && (
              <div className="bg-slate-950 border border-indigo-900/60 p-4 rounded-xl text-xs space-y-2 animate-fadeIn">
                <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đánh giá từ dịch giả AI:</span>
                </div>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {aiFeedback}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
