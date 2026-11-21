import React, { useState } from 'react';
import { KushonNegotiationItem } from '../../types';
import { initialKushonList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini } from '../../services/geminiService';
import { Handshake, RefreshCw, Volume2, ShieldCheck, Scale, Lightbulb } from 'lucide-react';

export const KushonNegotiation: React.FC = () => {
  const [kushonList, setKushonList] = useState<KushonNegotiationItem[]>(initialKushonList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const currentItem = kushonList[currentIndex % kushonList.length];

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 1 tình huống đàm phán B2B hóc búa với khách hàng/đối tác Nhật Bản mới (ví dụ: đòi thêm tính năng đắt tiền ngoài hợp đồng miễn phí, đòi bồi thường vô lý khi có chậm trễ khách quan, hoặc đòi hủy giao dịch).
Kèm danh sách các Từ đệm ngoại giao (Kushon-kotoba), chiến lược từ chối khéo (refusalStrategy), lời đáp ngoại giao mẫu (diplomaticResponse) và 1 bài trắc nghiệm chọn từ đệm chuẩn mực với bẫy tư duy và mẹo nhớ.
Định dạng JSON như schema KushonNegotiationItem.
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim());
      setKushonList((prev) => [...prev, parsed]);
      setCurrentIndex(kushonList.length);
      speechService.playSuccessSound();
    } catch {
      // Fallback
      const fallbackKush: KushonNegotiationItem = {
        id: `kush_inf_${Date.now()}`,
        partnerDemand: 'Khách hàng yêu cầu: "Tính năng này phải được làm thêm và bàn giao luôn trong tuần sau nhưng không được tính thêm bất kỳ chi phí nào".',
        conflictType: 'Yêu cầu tính năng ngoài hợp đồng',
        kushonKotobaList: [
          { phrase: 'せっかくのお申し出ではございますが、', reading: 'せっかくのおもうしでではございますが、', meaning: 'Dẫu biết là ý kiến hết sức thiện chí của quý ngài nhưng...', nuance: 'Khen ngợi thiện chí của khách trước khi từ chối.' },
          { phrase: 'あいにくではございますが、', reading: 'あいにくではございますが、', meaning: 'Thật không may thay là...', nuance: 'Đổ lỗi cho hoàn cảnh ngẫu nhiên khách quan.' },
        ],
        refusalStrategy: 'Khéo léo đưa ra ranh giới phạm vi công việc (Scope of Work). Không nói "không làm", mà nói "chúng tôi sẵn sàng hỗ trợ ở Giai đoạn 2 (Phase 2) với báo giá ưu đãi đặc biệt".',
        diplomaticResponse: '「せっかくのご提案ではございますが、あいにく現行のスコープ外となっており、即時の無償対応はいたしかねます。つきましては、次期フェーズの重要機能として優先的に開発を進める形はいかがでしょうか。」',
        quiz: {
          id: `qkush_inf_${Date.now()}`,
          question: 'Khi đối tác đòi hỏi thêm tính năng ngoài hợp đồng, cách ứng xử giữ vững hòa khí (Wa) và bảo vệ lợi ích công ty là gì?',
          options: [
            { id: 'a', text: 'Dùng từ đệm mềm dẻo, khẳng định sự trân trọng ý tưởng của khách nhưng khéo léo chuyển sang Phase 2 có tính phí ưu đãi.', isCorrect: true },
            { id: 'b', text: 'Cãi nhau to tiếng đòi xem hợp đồng.', isCorrect: false },
            { id: 'c', text: 'Nhận lời làm miễn phí tất cả dù cạn kiệt ngân sách.', isCorrect: false },
            { id: 'd', text: 'Lờ đi không phản hồi email khách hàng.', isCorrect: false },
          ],
          correctExplanation: 'Người Nhật luôn tôn trọng nguyên tắc "Nhường một bước để tiến hai bước": Tôn vinh đề xuất của khách nhưng khéo léo chốt sang giai đoạn kế tiếp.',
          trapAnalysis: 'Cả hai cực đoan (nhận lời miễn phí hết hoặc cãi vã căng thẳng) đều là thất bại trong quản trị B2B.',
          mnemonicTip: 'Hòa khí (和 - Wa) = Giữ thể diện cho khách + Bảo vệ ngân sách công ty!',
        },
      };
      setKushonList((prev) => [...prev, fallbackKush]);
      setCurrentIndex(kushonList.length);
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
            <span>Nghệ thuật Đàm phán B2B & Sử dụng "Từ đệm" (Kushon-kotoba)</span>
            <span className="text-xs font-mono text-purple-400 bg-purple-950/60 border border-purple-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Handshake className="w-3.5 h-3.5 text-purple-400" />
              <span>Kushon-kotoba · Giữ hòa khí (Wa)</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Rèn luyện kỹ năng từ chối khéo léo mà không bao giờ nói "Không" trực diện. Bảo vệ lợi ích doanh nghiệp nhưng vẫn giữ trọn vẹn thể diện đối tác.
          </p>
        </div>

        <button
          onClick={handleLoadMoreInfinite}
          disabled={isLoadingMore}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
          title="Tải nạp thêm tình huống đàm phán mới"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
          <span>Tải nạp thêm tình huống ({kushonList.length})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Partner Demand & Kushon-kotoba Arsenal */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-semibold text-purple-400">{currentItem.conflictType}</span>
              <span className="text-slate-500 font-mono">Tình huống {currentIndex + 1} / {kushonList.length}</span>
            </div>

            {/* Partner's Tough Demand */}
            <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl space-y-1.5">
              <div className="text-xs font-semibold text-rose-400">Yêu cầu cứng rắn từ đối tác:</div>
              <p className="text-sm md:text-base font-medium text-slate-100 leading-relaxed font-jp">
                "{currentItem.partnerDemand}"
              </p>
            </div>

            {/* Kushon-kotoba Weapon List */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Kho vũ khí "Từ đệm" (Kushon-kotoba gối đệm êm ái):</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {currentItem.kushonKotobaList.map((k, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-jp text-purple-300">{k.phrase}</span>
                      <button
                        onClick={() => speechService.speak(k.phrase)}
                        className="text-slate-400 hover:text-purple-300 cursor-pointer p-0.5"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-slate-200">{k.meaning}</div>
                    <div className="text-[11px] text-slate-400 italic">Sắc thái: {k.nuance}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Refusal Strategy */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Chiến lược phản hồi mềm dẻo (Trade-off Strategy):</span>
              </div>
              <p className="leading-relaxed">{currentItem.refusalStrategy}</p>
            </div>

            {/* Diplomatic Response Sample */}
            <div className="bg-purple-950/20 border border-purple-900/40 p-4 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-purple-300">Lời thoại đàm phán mẫu đỉnh cao:</span>
                <button
                  onClick={() => speechService.speak(currentItem.diplomaticResponse)}
                  className="text-slate-400 hover:text-purple-300 cursor-pointer p-0.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="font-jp text-slate-100 font-medium leading-relaxed">
                {currentItem.diplomaticResponse}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + kushonList.length) % kushonList.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              ← Tình huống trước
            </button>
            <span className="font-mono">{currentIndex + 1} / {kushonList.length}</span>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % kushonList.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              Tình huống tiếp theo →
            </button>
          </div>
        </div>

        {/* Right: Negotiation Quiz */}
        <div className="lg:col-span-5">
          <QuizCard
            quiz={currentItem.quiz}
            title="Trắc nghiệm nghệ thuật đàm phán Kushon"
            onNext={() => setCurrentIndex((prev) => (prev + 1) % kushonList.length)}
          />
        </div>
      </div>
    </div>
  );
};
