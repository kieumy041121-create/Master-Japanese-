import React, { useState } from 'react';
import { CorporateCrisisItem } from '../../types';
import { initialCrisisList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini } from '../../services/geminiService';
import { ShieldAlert, RefreshCw, Car, Users, Building2, CreditCard, Sparkles, Lightbulb } from 'lucide-react';

export const CorporateCrisisGuide: React.FC = () => {
  const [crisisList, setCrisisList] = useState<CorporateCrisisItem[]>(initialCrisisList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const currentItem = crisisList[currentIndex % crisisList.length];

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 1 tình huống quy tắc ngầm văn hóa hoặc xử lý khủng hoảng doanh nghiệp Nhật Bản (ví dụ: Thứ bậc chỗ ngồi trong Thang máy Kamiza/Shimoza, Thứ bậc bàn họp hội nghị, Cúi chào Ojigi 15-30-45 độ, hoặc Nghi thức xin lỗi Shazai gập đầu chạm trán khi gặp sự cố).
Kèm sơ đồ giải thích không gian (spatialRules), hành động chuẩn mực, mẹo ghi nhớ bằng quy tắc hình học hoặc thứ bậc và 1 bài trắc nghiệm tình huống trực quan với bẫy tư duy và mẹo nhớ.
Định dạng JSON:
{
  "id": "cr_${Date.now()}",
  "title": "Tiêu đề quy tắc ngầm",
  "category": "Vị trí ngồi (Kamiza/Shimoza)",
  "diagramType": "elevator",
  "scenario": "mô tả tình huống",
  "correctAction": "hành động chuẩn xác",
  "spatialRules": ["quy tắc vị trí 1", "quy tắc vị trí 2"],
  "mnemonicRule": "mẹo hình học / quy tắc bàn tay",
  "quiz": {
    "id": "qcr_${Date.now()}",
    "question": "câu hỏi trắc nghiệm kiểm tra phản xạ quy tắc ngầm",
    "options": [
      { "id": "a", "text": "lựa chọn 1", "isCorrect": true },
      { "id": "b", "text": "lựa chọn 2", "isCorrect": false },
      { "id": "c", "text": "lựa chọn 3", "isCorrect": false },
      { "id": "d", "text": "lựa chọn 4", "isCorrect": false }
    ],
    "correctExplanation": "lời giải cặn kẽ",
    "trapAnalysis": "bẫy tư duy tân binh hay mắc",
    "mnemonicTip": "mẹo nhớ nhanh quy tắc hình học"
  }
}
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim());
      setCrisisList((prev) => [...prev, parsed]);
      setCurrentIndex(crisisList.length);
      speechService.playSuccessSound();
    } catch {
      // Fallback
      const fallbackCrisis: CorporateCrisisItem = {
        id: `cr_inf_${Date.now()}`,
        title: 'Vị trí Thượng vị (Kamiza) và Hạ vị (Shimoza) trong Thang máy',
        category: 'Vị trí ngồi (Kamiza/Shimoza)',
        diagramType: 'elevator',
        scenario: 'Bạn cùng các lãnh đạo đối tác bước vào thang máy của tòa nhà văn phòng. Ai là người bấm nút và đứng ở đâu?',
        correctAction: 'Bạn là người có cấp bậc thấp nhất -> BẮT BUỘC bước vào trước để giữ nút mở cửa, đứng ngay bảng điều khiển nút bấm (Shimoza).',
        spatialRules: [
          'Thượng vị 1 (Kamiza cao quý nhất): Góc trong cùng bên phải (tính từ cửa nhìn vào, tránh gió lùa và an toàn nhất). Dành cho Khách hàng lớn tuổi nhất.',
          'Thượng vị 2: Góc trong cùng bên trái.',
          'Hạ vị (Shimoza): Đứng ngay sát bảng điều khiển nút bấm cạnh cửa để bấm tầng, giữ cửa và cúi đầu chào tiễn khách ra ngoài trước.',
        ],
        mnemonicRule: 'Quy tắc ngón tay: "Người bấm nút là người phục vụ (Shimoza)"!',
        quiz: {
          id: `qcr_inf_${Date.now()}`,
          question: 'Khi cùng khách hàng bước vào thang máy, bạn (cấp dưới) phải làm gì đầu tiên?',
          options: [
            { id: 'a', text: 'Bước vào trước, giữ nút mở cửa (開) để khách thong thả bước vào, sau đó đứng sát bảng điều khiển bấm tầng.', isCorrect: true },
            { id: 'b', text: 'Chạy tót vào góc trong cùng đứng dựa lưng vào gương bấm điện thoại.', isCorrect: false },
            { id: 'c', text: 'Đứng chặn ngay giữa cửa không cho ai vào.', isCorrect: false },
            { id: 'd', text: 'Bấm nút đóng cửa ngay khi bản thân vừa bước vào.', isCorrect: false },
          ],
          correctExplanation: 'Người có vai vế thấp nhất phải đảm nhận vai trò "người điều khiển thang máy" để phục vụ các bậc tiền bối an toàn.',
          trapAnalysis: 'Nhiều người nghĩ nhường khách vào trước là lịch sự, nhưng nếu khách vào trước mà không ai giữ cửa thì cánh cửa có thể kẹp trúng khách!',
          mnemonicTip: 'Vào trước giữ cửa -> Bấm tầng -> Mời khách!',
        },
      };
      setCrisisList((prev) => [...prev, fallbackCrisis]);
      setCurrentIndex(crisisList.length);
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
            <span>Sổ tay Văn hóa & Xử lý Khủng hoảng Doanh nghiệp</span>
            <span className="text-xs font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Quy tắc ngầm Kamiza / Shimoza & Meishi</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Quy chuẩn ngầm chốn công sở: trao danh thiếp, vị trí ghế ngồi taxi, phòng họp, thang máy, cúi chào Ojigi giúp bạn đạt độ tinh tế và chuyên nghiệp tuyệt đối.
          </p>
        </div>

        <button
          onClick={handleLoadMoreInfinite}
          disabled={isLoadingMore}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
          title="Tải nạp thêm quy tắc ngầm mới"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
          <span>Tải nạp thêm quy tắc ({crisisList.length})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Spatial Visualizer & Rules */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-semibold text-rose-400">{currentItem.category}</span>
              <span className="text-slate-500 font-mono">Quy chuẩn {currentIndex + 1} / {crisisList.length}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
              {currentItem.title}
            </h3>

            {/* Scenario Description */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 leading-relaxed">
              <span className="font-semibold text-indigo-300">Tình huống thực tế: </span>
              <span>{currentItem.scenario}</span>
            </div>

            {/* Simulated Visual Spatial Diagram Box */}
            <div className="bg-slate-950 p-5 rounded-2xl border-2 border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>SƠ ĐỒ THỨ BẬC KHÔNG GIAN:</span>
                <span className="text-rose-400 font-mono text-[11px]">Kamiza (Thượng) vs Shimoza (Hạ)</span>
              </div>

              {/* Graphic Representation based on type */}
              {currentItem.diagramType === 'taxi' ? (
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Car className="w-4 h-4 text-indigo-400" />
                    <span>Mặt trước xe (Đầu xe)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center text-xs">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">
                      [Tài xế lái xe]
                    </div>
                    <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-800 text-rose-200 font-bold">
                      Ghế 4: BẠN (Hạ vị - Shimoza)
                    </div>
                  </div>
                  <div className="text-center text-[10px] text-slate-500">--- Hàng ghế sau ---</div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 bg-emerald-950/50 rounded-lg border border-emerald-600 text-emerald-200 font-bold">
                      Ghế 1: KHÁCH HÀNG (Kamiza số 1)
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">
                      Ghế 3: Giữa (Hạ vị sau)
                    </div>
                    <div className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-700 text-indigo-200 font-bold">
                      Ghế 2: TRƯỞNG PHÒNG (Kamiza số 2)
                    </div>
                  </div>
                </div>
              ) : currentItem.diagramType === 'elevator' ? (
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-center text-xs">
                    <div className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-700 text-indigo-200 font-bold">
                      Kamiza 2: Góc trong trái
                    </div>
                    <div className="p-3 bg-emerald-950/50 rounded-lg border border-emerald-600 text-emerald-200 font-bold">
                      Kamiza 1: Góc trong phải (Vị trí cao quý nhất)
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center text-xs">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">
                      Gần cửa trái
                    </div>
                    <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-800 text-rose-200 font-bold">
                      BẠN: Bảng bấm nút (Shimoza)
                    </div>
                  </div>
                  <div className="text-center text-[11px] text-slate-500 font-sans">
                    [ CỬA RA VÀO THANG MÁY ]
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="text-emerald-400 font-bold flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Nghi thức trao nhận danh thiếp (Meishi Koukan)</span>
                  </div>
                  <p className="text-slate-300">Hạ thấp danh thiếp của mình dưới danh thiếp đối tác. Giữ hai tay tại 2 góc mép dưới.</p>
                </div>
              )}
            </div>

            {/* Spatial Rules list */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">Các quy tắc vị trí cụ thể:</div>
              <div className="space-y-1.5">
                {currentItem.spatialRules.map((rule: string, idx: number) => (
                  <div key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60">
                    <span className="text-rose-400 font-mono shrink-0">▸</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mnemonic Rule */}
            <div className="bg-amber-950/20 border border-amber-900/30 p-3.5 rounded-xl text-xs text-amber-200/90 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Mẹo nhớ bằng quy tắc hình học: </span>
                <span>{currentItem.mnemonicRule}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + crisisList.length) % crisisList.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              ← Quy tắc trước
            </button>
            <span className="font-mono">{currentIndex + 1} / {crisisList.length}</span>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % crisisList.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              Quy tắc tiếp theo →
            </button>
          </div>
        </div>

        {/* Right: Quiz */}
        <div className="lg:col-span-5">
          <QuizCard
            quiz={currentItem.quiz}
            title="Trắc nghiệm phản xạ quy tắc ngầm"
            onNext={() => setCurrentIndex((prev) => (prev + 1) % crisisList.length)}
          />
        </div>
      </div>
    </div>
  );
};
