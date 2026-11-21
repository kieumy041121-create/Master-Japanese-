import React, { useState } from 'react';
import { SdgsCsrItem } from '../../types';
import { initialSdgsList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini } from '../../services/geminiService';
import { Globe, RefreshCw, Volume2, Award, FileSpreadsheet, Sparkles, BookOpen } from 'lucide-react';

export const SdgsCsrPlanner: React.FC = () => {
  const [sdgsList, setSdgsList] = useState<SdgsCsrItem[]>(initialSdgsList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const currentItem = sdgsList[currentIndex % sdgsList.length];

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 1 đề án lập kế hoạch SDGs & CSR doanh nghiệp Nhật Bản mới gắn liền với 1 trong 17 mục tiêu Phát triển bền vững của LHQ (ví dụ: Năng lượng sạch Goal 7, Bình đẳng giới nơi công sở Goal 5, hoặc Giảm thiểu rác thải nhựa đại dương Goal 14).
Kèm cấu trúc bản đề xuất (Kikakusho) 3 phần gửi Ban Giám đốc, từ vựng học thuật/kinh doanh chuyên ngành và 1 bài trắc nghiệm chọn thuật ngữ lập luận với bẫy tư duy và mẹo nhớ.
Định dạng JSON như schema SdgsCsrItem.
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim());
      setSdgsList((prev) => [...prev, parsed]);
      setCurrentIndex(sdgsList.length);
      speechService.playSuccessSound();
    } catch {
      // Fallback
      const fallbackSdg: SdgsCsrItem = {
        id: `sdg_inf_${Date.now()}`,
        businessCase: 'Chuyển đổi 100% điện năng nhà máy sản xuất sang năng lượng mặt trời áp mái',
        targetSdgsGoal: { number: 7, name: 'Năng lượng sạch với giá thành hợp lý (エネルギーをみんなに そしてクリーンに)', icon: '☀️' },
        proposalStructure: [
          { section: '1. Bối cảnh năng lượng', content: 'Chi phí điện công nghiệp tăng cao và cam kết Net-Zero 2050 của chính phủ Nhật.', keyKango: '再生可能エネルギー (Năng lượng tái tạo)' },
          { section: '2. Lộ trình thực thi', content: 'Lắp đặt hệ thống pin quang điện kết hợp lưu trữ pin lithium trong 18 tháng.', keyKango: '自家消費型太陽光発電 (Điện mặt trời tự tiêu thụ)' },
          { section: '3. Hiệu quả kinh tế & thương hiệu', content: 'Tiết kiệm 28 triệu Yên tiền điện mỗi năm, đạt chứng chỉ xanh RE100.', keyKango: '脱炭素経営 (Quản trị doanh nghiệp phi carbon)' },
        ],
        academicBizVocabulary: [
          { word: '再生可能エネルギー', reading: 'さいせいかのうえねるぎー', meaning: 'Năng lượng tái tạo' },
          { word: '脱炭素化', reading: 'だつたんそか', meaning: 'Phi carbon hóa (Decarbonization)' },
        ],
        quiz: {
          id: `qsdg_inf_${Date.now()}`,
          question: 'Thuật ngữ nào sau đây thể hiện mục tiêu không phát thải ròng khí nhà kính được các tập đoàn Nhật Bản coi trọng hàng đầu hiện nay?',
          options: [
            { id: 'a', text: 'カーボンニュートラル (Carbon Neutral - Trung hòa Carbon)', isCorrect: true },
            { id: 'b', text: 'プラスチックフリー (Plastic Free)', isCorrect: false },
            { id: 'c', text: 'テレワーク推進 (Đẩy mạnh làm từ xa)', isCorrect: false },
            { id: 'd', text: 'プレミアムフライデー (Thứ Sáu vui vẻ)', isCorrect: false },
          ],
          correctExplanation: 'Carbon Neutral là từ khóa cốt tử trong mọi báo cáo thường niên (Annual Report) và đề xuất SDGs của doanh nghiệp Nhật.',
          trapAnalysis: 'Đừng nhầm với các khẩu hiệu phong trào ngắn hạn.',
          mnemonicTip: 'Carbon Neutral = Trung hòa lượng phát thải khí nhà kính về số 0!',
        },
      };
      setSdgsList((prev) => [...prev, fallbackSdg]);
      setCurrentIndex(sdgsList.length);
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
            <span>Lập kế hoạch SDGs & Đóng góp Cộng đồng (CSR) Doanh nghiệp</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>17 Mục tiêu SDGs · Đề xuất Kikakusho</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Gắn kết hoạt động kinh doanh với 17 Mục tiêu Phát triển Bền vững (SDGs). Rèn luyện kỹ năng viết bản đề xuất (Kikakusho) thuyết phục Ban Giám đốc.
          </p>
        </div>

        <button
          onClick={handleLoadMoreInfinite}
          disabled={isLoadingMore}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
          title="Tải nạp thêm bài toán SDGs mới"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
          <span>Tải nạp thêm đề án ({sdgsList.length})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: SDGs Proposal Blueprint */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentItem.targetSdgsGoal.icon}</span>
                <div>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    SDGs Mục tiêu số {currentItem.targetSdgsGoal.number}
                  </span>
                  <div className="text-sm font-semibold text-white font-jp">
                    {currentItem.targetSdgsGoal.name}
                  </div>
                </div>
              </div>
              <span className="text-slate-500 font-mono text-xs">Đề án {currentIndex + 1} / {sdgsList.length}</span>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Đề tài dự án CSR / SDGs:
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mt-1 leading-snug">
                {currentItem.businessCase}
              </h3>
            </div>

            {/* Proposal 3-Part Structure */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-slate-300">
                Cấu trúc bản đề xuất (Kikakusho / Proposal Structure):
              </div>
              <div className="space-y-2.5">
                {currentItem.proposalStructure.map((part, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-300">{part.section}</span>
                      <span className="text-[11px] text-indigo-400/90 font-jp">{part.keyKango}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{part.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Biz Vocabulary */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Thuật ngữ học thuật & Kinh doanh bền vững cốt tử:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentItem.academicBizVocabulary.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold font-jp text-white">{v.word}</span>
                      <span className="text-slate-400 font-jp text-[11px] ml-1">({v.reading})</span>
                      <div className="text-indigo-200/90 text-[11px] mt-0.5">{v.meaning}</div>
                    </div>
                    <button
                      onClick={() => speechService.speak(v.word)}
                      className="text-slate-400 hover:text-indigo-300 cursor-pointer p-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + sdgsList.length) % sdgsList.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              ← Đề án trước
            </button>
            <span className="font-mono">{currentIndex + 1} / {sdgsList.length}</span>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % sdgsList.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              Đề án tiếp theo →
            </button>
          </div>
        </div>

        {/* Right: Quiz */}
        <div className="lg:col-span-5">
          <QuizCard
            quiz={currentItem.quiz}
            title="Trắc nghiệm thuật ngữ SDGs & Lập luận"
            onNext={() => setCurrentIndex((prev) => (prev + 1) % sdgsList.length)}
          />
        </div>
      </div>
    </div>
  );
};
