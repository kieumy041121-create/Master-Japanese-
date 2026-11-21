import React, { useState } from 'react';
import { LogisticsCrisisItem } from '../../types';
import { initialLogisticsList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini } from '../../services/geminiService';
import { Truck, AlertTriangle, RefreshCw, Volume2, ShieldAlert, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const ProjectLogisticsCrisis: React.FC = () => {
  const [logisticsList, setLogisticsList] = useState<LogisticsCrisisItem[]>(initialLogisticsList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentEventText, setCurrentEventText] = useState<string | null>(null);
  const [isGeneratingEvent, setIsGeneratingEvent] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const currentItem = logisticsList[currentIndex % logisticsList.length];

  // Button "Tải nạp thêm biến cố"
  const handleTriggerSuddenEvent = async () => {
    setIsGeneratingEvent(true);
    try {
      const prompt = `
Bạn là AI mô phỏng khủng hoảng hậu cần & quản trị dự án doanh nghiệp Nhật Bản.
Dự án: "${currentItem.projectName}".
Sự cố ban đầu: "${currentItem.scenario}".
Hãy sinh ra 1 BIẾN CỐ HẬU CẦN ĐỘT NGỘT (Sudden logistics breakdown) đe dọa trực tiếp tiến độ giao hàng hoặc uy tín công ty.
Kèm câu thoại khẩn cấp của đối tác hoặc sếp bằng tiếng Nhật và dịch nghĩa.
Trả về định dạng JSON:
{
  "event": "mô tả biến cố bất ngờ bằng tiếng Việt",
  "japanesePhrase": "câu thoại tình huống tiếng Nhật",
  "translation": "dịch nghĩa tiếng Việt"
}
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim());
      const eventMsg = `[BIẾN CỐ ĐỘT XUẤT]: ${parsed.event}\n👉 「${parsed.japanesePhrase}」(${parsed.translation})`;
      setCurrentEventText(eventMsg);
      speechService.speak(parsed.japanesePhrase);
    } catch {
      const fallbackEvent = currentItem.suddenEvents[Math.floor(Math.random() * currentItem.suddenEvents.length)];
      setCurrentEventText(`[BIẾN CỐ ĐỘT XUẤT]: ${fallbackEvent}`);
      speechService.playErrorSound();
    } finally {
      setIsGeneratingEvent(false);
    }
  };

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 1 ca khủng hoảng dự án & hậu cần (Logistics) công sở Nhật mới (ví dụ: đối tác cắt giảm 50% ngân sách phút chót, cả team bị ngộ độc thực phẩm trước ngày ra mắt, hoặc linh kiện nhập khẩu bị giữ ở hải quan Narita).
Kèm các bước xử lý ưu tiên (prioritySteps), mẫu câu tiếng Nhật đối ứng khủng hoảng và 1 bài trắc nghiệm với bẫy tư duy và mẹo nhớ.
Định dạng JSON như schema LogisticsCrisisItem.
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim());
      setLogisticsList((prev) => [...prev, parsed]);
      setCurrentIndex(logisticsList.length);
      setCurrentEventText(null);
      speechService.playSuccessSound();
    } catch {
      // Fallback
      const fallbackLog: LogisticsCrisisItem = {
        id: `log_inf_${Date.now()}`,
        projectName: 'Ra mắt Chuỗi Cửa hàng Trà sữa Kyoto tại Osaka',
        role: 'Điều phối Chuỗi Cung ứng & Vật tư',
        crisisType: 'Lỗi linh kiện nhập khẩu',
        scenario: 'Lô máy đóng nắp tự động nhập khẩu từ Đài Loan bị hải quan giữ lại do thiếu tem kiểm định an toàn điện PSE của Nhật. Cửa hàng dự kiến khai trương sau đúng 48 giờ nữa.',
        suddenEvents: [
          'Chủ nhà cho thuê mặt bằng dọa phạt hợp đồng nếu hoãn ngày khai mạc.',
          'KOL nổi tiếng đã nhận lời đến review đúng 10h sáng ngày khai trương.',
        ],
        prioritySteps: [
          { step: 1, action: 'Liên hệ khẩn cấp nhà phân phối máy đã có chứng chỉ PSE sẵn trong nước để thuê máy ngắn hạn.', rationale: 'Khai trương đúng giờ là danh dự của thương hiệu.' },
          { step: 2, action: 'Báo cáo sếp và gửi công văn giải trình với cơ quan hải quan xin giải tỏa nhanh.', rationale: 'Bảo đảm tính pháp lý lâu dài.' },
        ],
        japaneseCrisisPhrases: [
          { phrase: '緊急の事態につきまして、直ちにご報告申し上げます。', meaning: 'Xin phép được báo cáo khẩn cấp về sự cố vừa phát sinh ạ.', situation: 'Báo cáo ngay lúc nhận tin.' },
        ],
        quiz: {
          id: `qlog_inf_${Date.now()}`,
          question: 'Nguyên tắc bất di bất dịch khi xử lý đứt gãy hậu cần (Logistics) với đối tác Nhật là gì?',
          options: [
            { id: 'a', text: 'Tuyệt đối không hứa bừa về mốc thời gian nếu chưa nắm chắc 100%, luôn báo cáo tiến độ theo từng giờ.', isCorrect: true },
            { id: 'b', text: 'Hứa bừa là "10 phút nữa hàng tới" để khách yên tâm.', isCorrect: false },
            { id: 'c', text: 'Tắt máy không nghe điện thoại đối tác.', isCorrect: false },
            { id: 'd', text: 'Đổ hết lỗi cho thời tiết xấu.', isCorrect: false },
          ],
          correctExplanation: 'Người Nhật coi trọng chữ Tín. Hứa hẹn một mốc giờ không chắc chắn sẽ phá hủy hoàn toàn uy tín làm ăn.',
          trapAnalysis: 'Rất nhiều tân binh vì sợ bị mắng mà hứa đại "sắp xong rồi", dẫn tới hậu quả dây chuyền.',
          mnemonicTip: 'Không hứa ẩu, báo cáo tiến độ từng giờ một!',
        },
      };
      setLogisticsList((prev) => [...prev, fallbackLog]);
      setCurrentIndex(logisticsList.length);
      setCurrentEventText(null);
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
            <span>Mô phỏng Quản trị Dự án & Khủng hoảng Hậu cần (Logistics)</span>
            <span className="text-xs font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-rose-400" />
              <span>Project Crisis Management</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Vào vai điều phối dự án đối mặt sự cố đứt gãy hậu cần. Nhấn "Tải nạp thêm biến cố" để thử thách phản xạ quản trị rủi ro kiểu Nhật.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleTriggerSuddenEvent}
            disabled={isGeneratingEvent}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-lg text-xs font-semibold transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <AlertTriangle className={`w-3.5 h-3.5 ${isGeneratingEvent ? 'animate-spin' : ''}`} />
            <span>{isGeneratingEvent ? 'Đang tạo biến cố...' : 'Tải nạp thêm biến cố!'}</span>
          </button>

          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải nạp thêm ca dự án mới"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải nạp thêm ca ({logisticsList.length})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Project Situation & Sudden Event Alert */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Loại sự cố: {currentItem.crisisType}</span>
              </span>
              <span className="text-slate-500 font-mono">Dự án: {currentItem.projectName}</span>
            </div>

            <div>
              <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                Vai trò của bạn: {currentItem.role}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-1 leading-snug">
                Sự cố hậu cần tại {currentItem.projectName}
              </h3>
            </div>

            {/* Scenario Narrative */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 leading-relaxed">
              <span className="font-semibold text-slate-400">Bối cảnh khủng hoảng: </span>
              <span>{currentItem.scenario}</span>
            </div>

            {/* Sudden Event Banner */}
            {currentEventText && (
              <div className="bg-rose-950/30 border-2 border-rose-600/80 p-4 rounded-xl text-xs md:text-sm text-rose-200 space-y-1.5 animate-bounce-subtle">
                <div className="font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>CẢNH BÁO: BIẾN CỐ HẬU CẦN ĐỘT XUẤT!</span>
                </div>
                <p className="leading-relaxed whitespace-pre-line text-white font-medium">{currentEventText}</p>
              </div>
            )}

            {/* Priority Steps */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-semibold text-slate-300">
                Thứ tự các bước ưu tiên xử lý khủng hoảng (Risk Management):
              </div>
              <div className="space-y-2">
                {currentItem.prioritySteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-900/60 text-rose-300 flex items-center justify-center font-bold text-[11px] shrink-0">
                        {step.step}
                      </span>
                      <span className="font-semibold text-slate-100">{step.action}</span>
                    </div>
                    <p className="text-slate-400 pl-7 text-[11px] leading-relaxed">
                      Lý do: {step.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Japanese Crisis Phrases */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-indigo-300">
                Mẫu câu tiếng Nhật đối ứng khủng hoảng ngoại giao:
              </div>
              <div className="grid grid-cols-1 gap-2">
                {currentItem.japaneseCrisisPhrases.map((phrase, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-jp text-white">{phrase.phrase}</span>
                      <button
                        onClick={() => speechService.speak(phrase.phrase)}
                        className="text-slate-400 hover:text-indigo-300 cursor-pointer p-0.5"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-indigo-200/90">{phrase.meaning}</div>
                    <div className="text-[11px] text-slate-500">Tình huống: {phrase.situation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev - 1 + logisticsList.length) % logisticsList.length);
                setCurrentEventText(null);
              }}
              className="hover:text-slate-200 cursor-pointer"
            >
              ← Dự án trước
            </button>
            <span className="font-mono">{currentIndex + 1} / {logisticsList.length}</span>
            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev + 1) % logisticsList.length);
                setCurrentEventText(null);
              }}
              className="hover:text-slate-200 cursor-pointer"
            >
              Dự án tiếp theo →
            </button>
          </div>
        </div>

        {/* Right: Crisis Quiz */}
        <div className="lg:col-span-5">
          <QuizCard
            quiz={currentItem.quiz}
            title="Trắc nghiệm xử lý khủng hoảng hậu cần"
            onNext={() => {
              setCurrentIndex((prev) => (prev + 1) % logisticsList.length);
              setCurrentEventText(null);
            }}
          />
        </div>
      </div>
    </div>
  );
};
