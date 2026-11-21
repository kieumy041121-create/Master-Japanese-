import React, { useState } from 'react';
import { SenpaiQuestion } from '../../types';
import { initialSenpaiList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { UserCheck, RefreshCw, MessageSquare, Briefcase, Lightbulb, Send, Sparkles } from 'lucide-react';

export const SenpaiKouhaiForum: React.FC = () => {
  const [questions, setQuestions] = useState<SenpaiQuestion[]>(initialSenpaiList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userQuery, setUserQuery] = useState<string>('');
  const [isAskingSenpai, setIsAskingSenpai] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const currentItem = questions[currentIndex % questions.length];

  // Ask AI Senpai a brand new workplace query
  const handleAskSenpai = async () => {
    if (!userQuery.trim()) return;
    setIsAskingSenpai(true);
    try {
      const prompt = `
Bạn là AI Senpai 10 năm kinh nghiệm làm việc tại các tập đoàn lớn ở Tokyo.
Một Kouhai (hậu bối) vừa gửi câu hỏi hóc búa chốn công sở Nhật:
"${userQuery}"

Hãy đóng vai Senpai đưa ra lời khuyên cặn kẽ, ấm áp nhưng cực kỳ thực tế về văn hóa doanh nghiệp Nhật Bản.
Đồng thời tạo 1 quy tắc công sở cốt tử (workplaceRule) và 1 câu hỏi trắc nghiệm mô phỏng tình huống cho người học kiểm tra phản xạ với lời giải và mẹo nhớ.
Định dạng JSON:
{
  "id": "sp_${Date.now()}",
  "kouhaiQuery": "${userQuery}",
  "workContext": "Tình huống công sở",
  "senpaiAdvice": "lời khuyên tâm huyết của Senpai",
  "workplaceRule": "quy tắc vàng công sở",
  "quiz": {
    "id": "qsp_${Date.now()}",
    "question": "câu hỏi trắc nghiệm mô phỏng",
    "options": [
      { "id": "a", "text": "lựa chọn 1", "isCorrect": true },
      { "id": "b", "text": "lựa chọn 2", "isCorrect": false },
      { "id": "c", "text": "lựa chọn 3", "isCorrect": false },
      { "id": "d", "text": "lựa chọn 4", "isCorrect": false }
    ],
    "correctExplanation": "lời giải cặn kẽ",
    "trapAnalysis": "lỗi tân binh hay mắc",
    "mnemonicTip": "mẹo sinh tồn nơi công sở"
  }
}
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = safeExtractJson<SenpaiQuestion | null>(res, null);
      if (parsed && (parsed.kouhaiQuery || parsed.workContext)) {
        setQuestions((prev) => [parsed, ...prev]);
        setCurrentIndex(0);
        setUserQuery('');
        speechService.playSuccessSound();
      } else {
        throw new Error('Dữ liệu JSON không hợp lệ');
      }
    } catch {
      // Fallback
      speechService.playSuccessSound();
    } finally {
      setIsAskingSenpai(false);
    }
  };

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 1 ca tư vấn kinh nghiệm Senpai - Kouhai công sở Nhật điển hình (ví dụ: cách từ chối đi nhậu Nomikai khéo léo, cách xin nghỉ phép có lương Yukyu không làm sếp phật lòng, hay cách xử lý khi gửi nhầm email cho khách).
Kèm lời khuyên thực chiến, quy tắc vàng và trắc nghiệm mô phỏng.
Định dạng JSON như trên.
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = safeExtractJson<SenpaiQuestion | null>(res, null);
      if (parsed && (parsed.kouhaiQuery || parsed.workContext)) {
        setQuestions((prev) => [...prev, parsed]);
        setCurrentIndex(questions.length);
        speechService.playSuccessSound();
      } else {
        throw new Error('Dữ liệu không hợp lệ');
      }
    } catch {
      // Fallback
      const fallbackQ: SenpaiQuestion = {
        id: `sp_inf_${Date.now()}`,
        kouhaiQuery: 'Em muốn từ chối đi nhậu sau giờ làm (Nomikai) cùng sếp mà không bị coi là thiếu hòa đồng thì nên nói thế nào ạ?',
        workContext: 'Từ chối Nomikai khéo léo',
        senpaiAdvice: 'Đừng bao giờ nói thẳng "Em bận đi chơi" hay "Em không thích uống rượu". Hãy dùng công thức 3 bước:\n1. Tiếc nuối chân thành:「お誘いいただき、本当にありがとうございます！」\n2. Lý do bất khả kháng hợp lệ (học thêm, hẹn bác sĩ, gia đình):「あいにく本日は先約の通院がありまして…」\n3. Hẹn dịp khác:「またぜひ次回お声がけいただけますと嬉しいです！」',
        workplaceRule: 'Quy tắc "Cảm ơn -> Từ chối khéo léo -> Mở đường cho lần sau".',
        quiz: {
          id: `qsp_inf_${Date.now()}`,
          question: 'Cách từ chối lời mời nhậu của cấp trên khôn ngoan nhất là gì?',
          options: [
            { id: 'a', text: 'Cảm ơn lời mời, nêu lý do lịch hẹn trước bất khả kháng và hẹn dịp sau.', isCorrect: true },
            { id: 'b', text: 'Bảo sếp là em mệt mỏi với công ty lắm rồi.', isCorrect: false },
            { id: 'c', text: 'Đồng ý đi nhưng đến giờ thì trốn về không chào ai.', isCorrect: false },
            { id: 'd', text: 'Hỏi sếp nhậu có được tính tiền làm thêm giờ (Zangyo) không.', isCorrect: false },
          ],
          correctExplanation: 'Người Nhật rất nhạy cảm với việc bị từ chối trực diện. Khéo léo giữ thể diện cho người mời là tiêu chuẩn vàng.',
          trapAnalysis: 'Bỏ trốn không chào bị coi là vô trách nhiệm nghiêm trọng.',
          mnemonicTip: 'Từ chối mềm: Cảm ơn + Lý do khách quan + Hẹn lần sau!',
        },
      };
      setQuestions((prev) => [...prev, fallbackQ]);
      setCurrentIndex(questions.length);
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
            <span>Góc kết nối Senpai - Kouhai (AI Senpai)</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Diễn đàn giải đáp công sở Nhật</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Hỏi đáp những băn khoăn chốn công sở. AI Senpai lưu trữ vô hạn kinh nghiệm thực chiến và trắc nghiệm xử lý tình huống.
          </p>
        </div>

        <button
          onClick={handleLoadMoreInfinite}
          disabled={isLoadingMore}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
          title="Tải nạp thêm tình huống Senpai mới"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
          <span>Tải nạp thêm tình huống ({questions.length})</span>
        </button>
      </div>

      {/* Ask Senpai Input Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Hỏi AI Senpai về một băn khoăn công sở của bạn:</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskSenpai()}
            placeholder="Ví dụ: Em lỡ làm mất hóa đơn tiếp khách thì giải trình thế nào..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs md:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleAskSenpai}
            disabled={isAskingSenpai || !userQuery.trim()}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isAskingSenpai ? 'Senpai đang nghĩ...' : 'Hỏi Senpai'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Kouhai Query & Senpai Advice */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-5">
            {/* Kouhai Question */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Thắc mắc của Kouhai:</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                "{currentItem.kouhaiQuery}"
              </p>
              <div className="text-[11px] text-slate-500 mt-1">Bối cảnh: {currentItem.workContext}</div>
            </div>

            {/* Senpai Wisdom */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Lời khuyên từ Senpai kỳ cựu:</span>
              </div>
              <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {currentItem.senpaiAdvice}
              </div>
            </div>

            {/* Workplace Golden Rule */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-300" />
                <span>Quy tắc vàng chốn công sở Nhật:</span>
              </div>
              <p className="leading-relaxed font-medium text-slate-100">{currentItem.workplaceRule}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              ← Tình huống trước
            </button>
            <span className="font-mono">{currentIndex + 1} / {questions.length}</span>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % questions.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              Tình huống tiếp theo →
            </button>
          </div>
        </div>

        {/* Right: Simulation Quiz */}
        <div className="lg:col-span-5">
          <QuizCard
            quiz={currentItem.quiz}
            title="Trắc nghiệm phản xạ tình huống Senpai"
            onNext={() => setCurrentIndex((prev) => (prev + 1) % questions.length)}
          />
        </div>
      </div>
    </div>
  );
};
