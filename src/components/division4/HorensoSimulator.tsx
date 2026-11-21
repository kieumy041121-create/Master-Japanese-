import React, { useState } from 'react';
import { HorensoScenario } from '../../types';
import { initialHorensoList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini } from '../../services/geminiService';
import { Workflow, RefreshCw, AlertOctagon, CheckCircle2, Lightbulb, UserX, ChevronLeft, ChevronRight, Plus, BookOpen, ShieldAlert } from 'lucide-react';

export const HorensoSimulator: React.FC = () => {
  const [scenarios, setScenarios] = useState<HorensoScenario[]>(initialHorensoList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const currentItem = scenarios[currentIndex % scenarios.length];

  const handlePrevScenario = () => {
    setCurrentIndex((prev) => (prev - 1 + scenarios.length) % scenarios.length);
    speechService.playSuccessSound();
  };

  const handleNextScenario = () => {
    setCurrentIndex((prev) => (prev + 1) % scenarios.length);
    speechService.playSuccessSound();
  };

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 5 kịch bản vi phạm quy trình Hō-Ren-Sō (Báo cáo - Liên lạc - Bàn bạc) kinh điển nơi công sở Nhật Bản.
Định dạng JSON là một mảng gồm 5 phần tử theo schema HorensoScenario:
[
  {
    "id": "hr_${Date.now()}_1",
    "title": "tiêu đề tình huống",
    "violationType": "Hōkoku (Báo cáo muộn/sai)",
    "scenarioNarrative": "câu chuyện xảy ra",
    "bossReaction": "phản ứng của sếp",
    "properProtocol": "quy trình chuẩn",
    "goldenRuleTip": "mẹo vàng",
    "quiz": {
      "id": "qhr_${Date.now()}_1",
      "question": "câu hỏi trắc nghiệm",
      "options": [
        { "id": "a", "text": "đáp án 1", "isCorrect": true },
        { "id": "b", "text": "đáp án 2", "isCorrect": false },
        { "id": "c", "text": "đáp án 3", "isCorrect": false },
        { "id": "d", "text": "đáp án 4", "isCorrect": false }
      ],
      "correctExplanation": "giải thích",
      "trapAnalysis": "bẫy tư duy",
      "mnemonicTip": "mẹo nhớ"
    }
  }
]
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim());
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.filter((it) => it && it.title).slice(0, 5);
        if (valid5.length > 0) {
          setScenarios((prev) => [...prev, ...valid5]);
          setCurrentIndex(scenarios.length);
          speechService.playSuccessSound();
          return;
        }
      }
      throw new Error('Dùng bộ 5 tình huống mẫu');
    } catch {
      // 5 High-Yield Authentic Workplace Ho-Ren-So Fallback Scenarios
      const timestamp = Date.now();
      const fiveScenarios: HorensoScenario[] = [
        {
          id: `hr_5_${timestamp}_1`,
          title: 'Bàn bạc (Sōdan) biến thành đùn đẩy trách nhiệm',
          violationType: 'Sōdan (Không chuẩn bị phương án)',
          scenarioNarrative: 'Khi dự án gặp trục trặc kỹ thuật, bạn chạy đến hỏi sếp: "Trưởng phòng ơi, hệ thống bị lỗi rồi, bây giờ phải làm sao ạ?". Sếp chau mày khó chịu vì bạn không hề suy nghĩ phương án giải quyết mà chỉ ném vấn đề cho sếp.',
          bossReaction: 'Sếp nghiêm nghị: "Cậu đến hỏi ý kiến (Sōdan) hay là đang bắt tôi làm thay phần việc của cậu vậy? Đâu là các phương án cậu đã nghĩ ra?".',
          properProtocol: 'Quy tắc Sōdan chuẩn: Luôn mang theo ít nhất 2 phương án (Plan A & Plan B) kèm ưu/nhược điểm khi xin ý kiến sếp.',
          goldenRuleTip: 'Đừng hỏi "Phải làm sao?", hãy hỏi "Em dự định xử lý theo hướng A vì..., sếp thấy có ổn không ạ?".',
          quiz: {
            id: `qhr_${timestamp}_1`,
            question: 'Nguyên tắc bất di bất dịch khi đến Bàn bạc (Sōdan) với cấp trên là gì?',
            options: [
              { id: 'a', text: 'Tự mình chuẩn bị sẵn ít nhất 2 giải pháp đề xuất kèm đánh giá ưu nhược điểm.', isCorrect: true },
              { id: 'b', text: 'Chờ sếp tự tìm cách giải quyết.', isCorrect: false },
              { id: 'c', text: 'Đổ lỗi cho khách hàng khó tính.', isCorrect: false },
              { id: 'd', text: 'Im lặng tự xử lý không nói với ai.', isCorrect: false },
            ],
            correctExplanation: 'Cấp dưới không phải người chỉ biết ném vấn đề cho sếp, mà phải đóng vai trò người đề xuất giải pháp để sếp ra quyết định cuối cùng.',
            trapAnalysis: 'Tân binh hay nhầm Sōdan với việc xin chỉ đạo từng bước một.',
            mnemonicTip: 'Sōdan = Đưa đề xuất, không đưa câu hỏi bỏ lửng!',
          },
        },
        {
          id: `hr_5_${timestamp}_2`,
          title: 'Giấu tin xấu (Bad News First) vì sợ bị khiển trách',
          violationType: 'Hōkoku (Báo cáo muộn tin xấu)',
          scenarioNarrative: 'Bạn phát hiện tài liệu in gửi khách hàng bị sai số liệu lúc 10h sáng. Vì sợ bị mắng, bạn giấu giếm tự sửa cho đến 17h chiều mới báo cáo sếp khi đối tác gọi điện phàn nàn.',
          bossReaction: 'Sếp tức giận đập bàn: "Tại sao phát hiện từ 10h mà đến tận bây giờ mới nói? Nếu cậu báo ngay từ sáng thì chúng ta đã kịp thu hồi trước khi gửi đi rồi!".',
          properProtocol: 'Quy tắc Bad News First: Tin xấu phải báo cáo đầu tiên trong vòng 15 phút, tin mừng có thể để sau.',
          goldenRuleTip: 'Báo cáo tin xấu nhanh = Thể hiện trách nhiệm; Giấu tin xấu = Mất hoàn toàn chữ Tín!',
          quiz: {
            id: `qhr_${timestamp}_2`,
            question: 'Khi phát hiện sự cố sai sót trong công việc, thứ tự ưu tiên báo cáo là gì?',
            options: [
              { id: 'a', text: 'Báo cáo sếp ngay lập tức trong vòng 15 phút (Bad News First).', isCorrect: true },
              { id: 'b', text: 'Giấu kín tự tìm cách xử lý, nếu không được mới nói.', isCorrect: false },
              { id: 'c', text: 'Chờ đến buổi họp tổng kết cuối tuần.', isCorrect: false },
              { id: 'd', text: 'Đổ lỗi cho đồng nghiệp làm cùng khâu.', isCorrect: false },
            ],
            correctExplanation: 'Quy tắc bất thành văn của doanh nghiệp Nhật: "Yoi shirase wa keshite isoganai, warui shirase koso ichiban ni" (Tin tốt không vội, tin xấu phải số một).',
            trapAnalysis: 'Tâm lý sợ bị phạt khiến hậu quả lan rộng gấp 10 lần.',
            mnemonicTip: 'Tin xấu báo ngay, giải nguy tức thì!',
          },
        },
        {
          id: `hr_5_${timestamp}_3`,
          title: 'Nhắn tin LINE xin nghỉ ốm thay vì gọi điện thoại trực tiếp',
          violationType: 'Renraku (Chọn sai kênh liên lạc)',
          scenarioNarrative: 'Sáng dậy bị sốt 39 độ, 8h30 bạn gửi 1 tin nhắn LINE cho sếp: "Hôm nay em ốm nên xin phép nghỉ ạ" rồi tắt máy đi ngủ.',
          bossReaction: 'Sếp thất vọng: "Nghỉ ốm đột xuất mà chỉ nhắn tin nhắn rác thế à? Ai sẽ bàn giao việc gấp trong ngày hôm nay cho khách hàng?".',
          properProtocol: 'Quy tắc nghỉ khẩn cấp: Gọi điện thoại trực tiếp trước giờ làm việc 15-30 phút, báo tình trạng sức khỏe và bàn giao công việc dở dang.',
          goldenRuleTip: 'Nhắn tin không đảm bảo sếp đã nhận được thông tin. Gọi điện thoại = Trực tiếp & Chắc chắn!',
          quiz: {
            id: `qhr_${timestamp}_3`,
            question: 'Cách xử lý chuẩn mực nhất khi thức dậy bị ốm đột xuất không thể đi làm là gì?',
            options: [
              { id: 'a', text: 'Gọi điện thoại trực tiếp cho sếp trước giờ làm việc, báo cáo tình trạng và bàn giao đầu việc gấp.', isCorrect: true },
              { id: 'b', text: 'Nhắn một tin nhắn chat rồi tắt chuông đi ngủ.', isCorrect: false },
              { id: 'c', text: 'Nhờ bạn cùng phòng gọi điện hộ.', isCorrect: false },
              { id: 'd', text: 'Đến công ty xin về giữa giờ.', isCorrect: false },
            ],
            correctExplanation: 'Gọi điện thoại giúp sếp xác nhận được giọng nói thật sự của bạn và kịp thời phân công người thay thế xử lý các công việc gấp trong ngày.',
            trapAnalysis: 'GenZ thường ngại gọi điện thoại (Denwa-kyofusho), nhưng công sở Nhật coi trọng cuộc gọi hơn tin nhắn.',
            mnemonicTip: 'Ốm gấp -> Nhấc máy gọi ngay!',
          },
        },
        {
          id: `hr_5_${timestamp}_4`,
          title: 'Bỏ qua Báo cáo tiến độ trung gian (Chūkan Hōkoku)',
          violationType: 'Hōkoku (Thiếu báo cáo giai đoạn)',
          scenarioNarrative: 'Sếp giao làm bản kế hoạch trong 2 tuần. Bạn cặm cụi làm 1 mình không hé răng nói gì. Đến hạn chót nộp bài, sếp xem qua và bảo "Ý tưởng này lệch hoàn toàn so với mục tiêu ban đầu, phải làm lại từ đầu".',
          bossReaction: 'Sếp thở dài: "Cậu làm suốt 2 tuần mà không báo cáo tiến độ trung gian cho tôi lấy 1 lần? Nếu cậu cho tôi xem bản phác thảo sau 3 ngày thì đã không lãng phí 2 tuần vô ích!".',
          properProtocol: 'Quy tắc 20-50-80: Báo cáo khi hoàn thành 20% (khung sườn), 50% (nội dung chính) và 80% (hoàn thiện chi tiết).',
          goldenRuleTip: 'Báo cáo trung gian (Chūkan Hōkoku) là phao cứu sinh ngăn ngừa lệch hướng dự án!',
          quiz: {
            id: `qhr_${timestamp}_4`,
            question: 'Khi được giao một nhiệm vụ kéo dài nhiều tuần, bạn nên báo cáo tiến độ như thế nào?',
            options: [
              { id: 'a', text: 'Thực hiện Báo cáo trung gian định kỳ (khi đạt 20%, 50%) để sếp kiểm tra độ chuẩn xác hướng đi.', isCorrect: true },
              { id: 'b', text: 'Đợi đến ngày cuối cùng làm xong 100% mới đưa cho sếp xem.', isCorrect: false },
              { id: 'c', text: 'Chờ sếp đến bàn hỏi thì mới trả lời.', isCorrect: false },
              { id: 'd', text: 'Chỉ báo cáo khi gặp lỗi kỹ thuật không sửa được.', isCorrect: false },
            ],
            correctExplanation: 'Báo cáo giai đoạn giúp sếp nắm bắt tiến độ và kịp thời nắn chỉnh nếu có sai lệch, tránh lãng phí thời gian của cả đội ngũ.',
            trapAnalysis: 'Nhiều người nghĩ "Chưa xong hoàn hảo thì không dám đem khoe sếp" - đây là sai lầm chết người trong doanh nghiệp Nhật.',
            mnemonicTip: 'Chūkan Hōkoku: Báo cáo từng chặng, an toàn về đích!',
          },
        },
        {
          id: `hr_5_${timestamp}_5`,
          title: 'Bàn bạc vượt cấp (Ette-kōdō) bỏ qua sếp trực tiếp',
          violationType: 'Sōdan (Vượt cấp tổ chức)',
          scenarioNarrative: 'Có ý tưởng cải tiến quy trình kho bãi, thay vì bàn bạc với Tổ trưởng của mình, bạn chạy thẳng lên phòng Giám đốc điều hành để trình bày đề xuất.',
          bossReaction: 'Tổ trưởng giận đỏ mặt: "Tôi là người quản lý trực tiếp chịu trách nhiệm về cậu mà cậu lại vượt mặt tôi đi báo cáo Giám đốc? Cậu coi thường tổ chức này à?".',
          properProtocol: 'Quy tắc tôn trọng chuỗi mệnh lệnh (Chain of Command): Luôn bàn bạc với sếp trực tiếp (Chokusetsu Joushi) trước khi đưa lên cấp cao hơn.',
          goldenRuleTip: 'Không bao giờ vượt cấp trong công sở Nhật. Muốn lên cấp cao hơn, hãy đi cùng sếp trực tiếp!',
          quiz: {
            id: `qhr_${timestamp}_5`,
            question: 'Tại sao việc "Báo cáo vượt cấp" (Ette-kōdō) bị coi là điều tối kỵ trong văn hóa doanh nghiệp Nhật?',
            options: [
              { id: 'a', text: 'Phá vỡ trật tự thứ bậc, khiến sếp trực tiếp bị mất mặt và mất kiểm soát phạm vi trách nhiệm.', isCorrect: true },
              { id: 'b', text: 'Vì giám đốc không biết tiếng Nhật.', isCorrect: false },
              { id: 'c', text: 'Vì công ty không cho phép có ý tưởng mới.', isCorrect: false },
              { id: 'd', text: 'Vì tốn tiền in tài liệu đề xuất.', isCorrect: false },
            ],
            correctExplanation: 'Chuỗi chỉ huy trong công ty Nhật dựa trên niềm tin và sự phân công trách nhiệm rõ ràng. Vượt cấp là hành vi thể hiện sự bất trung và thiếu tôn trọng với người quản lý trực tiếp.',
            trapAnalysis: 'Tây phương khuyến khích flat hierarchy, nhưng Nhật Bản bảo vệ tôn ti trật tự chuỗi trách nhiệm.',
            mnemonicTip: 'Tuân thủ chuỗi lệnh: Trực tiếp trước, cấp trên sau!',
          },
        },
      ];

      setScenarios((prev) => [...prev, ...fiveScenarios]);
      setCurrentIndex(scenarios.length);
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
            <span>Kho Xử lý Tình huống Ho-Ren-So Vô tận</span>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Workflow className="w-3.5 h-3.5 text-amber-400" />
              <span>Hōkoku · Renraku · Sōdan</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Liên tục sinh ra các kịch bản báo cáo sai quy chuẩn. Mổ xẻ tâm lý sếp Nhật và áp dụng nghệ thuật Báo cáo - Liên lạc - Bàn bạc chuẩn xác.
          </p>
        </div>

        <button
          onClick={handleLoadMoreInfinite}
          disabled={isLoadingMore}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
          title="Tải nạp thêm kịch bản Ho-Ren-So mới"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
          <span>Tải nạp thêm tình huống ({scenarios.length})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Scenario & Protocol */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-5">
            {/* Top Stepper Navigation Bar: [← Kịch bản trước] [X / Y] [Kịch bản tiếp theo →] + [➕ Tải thêm 5 cái] */}
            <div className="p-2.5 sm:p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevScenario}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Xem kịch bản trước đó"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Kịch bản trước</span>
                </button>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-400 font-bold">
                  {(currentIndex % scenarios.length) + 1} / {scenarios.length}
                </div>
                <button
                  onClick={handleNextScenario}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md shadow-amber-900/30"
                  title="Xem kịch bản tiếp theo"
                >
                  <span>Kịch bản tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleLoadMoreInfinite}
                disabled={isLoadingMore}
                className="px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
                title="Tải nạp 5 kịch bản Ho-Ren-So mới"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Tải thêm 5 cái</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>Lỗi vi phạm: {currentItem.violationType}</span>
              </span>
              <span className="text-slate-500 font-mono">Tình huống {currentIndex + 1} / {scenarios.length}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
              {currentItem.title}
            </h3>

            {/* Narrative Scenario */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 leading-relaxed space-y-1.5">
              <div className="font-semibold text-slate-400">Diễn biến sự việc:</div>
              <p>{currentItem.scenarioNarrative}</p>
            </div>

            {/* Boss Reaction */}
            <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl text-xs md:text-sm text-rose-200 space-y-1">
              <div className="font-semibold text-rose-400 flex items-center gap-1.5">
                <UserX className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Phản ứng thực tế của cấp trên:</span>
              </div>
              <p className="leading-relaxed font-jp">{currentItem.bossReaction}</p>
            </div>

            {/* Proper Protocol */}
            <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl text-xs md:text-sm text-emerald-200 space-y-1">
              <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Quy trình chuẩn mực cần thực hiện (Proper Protocol):</span>
              </div>
              <p className="leading-relaxed text-slate-200">{currentItem.properProtocol}</p>
            </div>

            {/* Golden Rule Tip */}
            <div className="bg-amber-950/20 border border-amber-900/30 p-3.5 rounded-xl text-xs text-amber-200/90 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Quy tắc vàng Ho-Ren-So: </span>
                <span>{currentItem.goldenRuleTip}</span>
              </div>
            </div>
            {/* MỤC GIẢI THÍCH CHUYÊN SÂU & TÂM LÝ HỌC QUẢN TRỊ */}
            <div className="p-4 bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-900 border border-amber-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Mục giải thích chuyên sâu & Tâm lý học quản trị công sở Nhật</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-amber-300 font-semibold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tâm lý học cấp trên Nhật:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Sếp Nhật ghét nhất trạng thái "bất an vì không biết dự án đang ra sao". Ho-Ren-So không nhằm mục đích kiểm soát độc tài, mà là cơ chế chia sẻ gánh nặng rủi ro pháp lý và danh tiếng cho tập thể.
                  </p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Nghệ thuật Sōdan (2 Phương Án):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Khi trình bày Plan A và Plan B, luôn nêu rõ: "Em nghiêng về Plan A hơn vì tiết kiệm 30% thời gian, xin ý kiến đánh giá của sếp". Sếp sẽ cảm nhận được tư duy chủ động và năng lực tự giải quyết của bạn.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Stepper Navigation Bar: [← Kịch bản trước] [X / Y] [Kịch bản tiếp theo →] + [➕ Tải thêm 5 cái] */}
            <div className="pt-4 border-t border-slate-800/80 p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevScenario}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Xem kịch bản trước đó"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Kịch bản trước</span>
                </button>
                <div className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-400 font-bold">
                  {(currentIndex % scenarios.length) + 1} / {scenarios.length}
                </div>
                <button
                  onClick={handleNextScenario}
                  className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md shadow-amber-900/30"
                  title="Xem kịch bản tiếp theo"
                >
                  <span>Kịch bản tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleLoadMoreInfinite}
                disabled={isLoadingMore}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
                title="Tải nạp 5 kịch bản Ho-Ren-So mới"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Tải thêm 5 cái ({scenarios.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Quiz */}
        <div className="lg:col-span-5">
          <QuizCard
            quiz={currentItem.quiz}
            title="Trắc nghiệm bắt lỗi Ho-Ren-So"
            onNext={() => setCurrentIndex((prev) => (prev + 1) % scenarios.length)}
          />
        </div>
      </div>
    </div>
  );
};
