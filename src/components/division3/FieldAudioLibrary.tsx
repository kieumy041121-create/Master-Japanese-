import React, { useState } from 'react';
import { FieldAudioItem } from '../../types';
import { initialFieldAudioList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { Radio, RefreshCw, Volume2, ShieldAlert, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export const FieldAudioLibrary: React.FC = () => {
  const [audioList, setAudioList] = useState<FieldAudioItem[]>(initialFieldAudioList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlayingNoise, setIsPlayingNoise] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const currentItem = audioList[currentIndex % audioList.length];

  const handlePlayAudioWithNoise = () => {
    // Play ambient noise burst matching environment
    const env = currentItem.environment.toLowerCase();
    if (env.includes('ga') || env.includes('shinjuku')) {
      speechService.playAmbientBurst('station');
    } else if (env.includes('siêu thị') || env.includes('donki')) {
      speechService.playAmbientBurst('supermarket');
    } else {
      speechService.playAmbientBurst('izakaya');
    }

    // Speak announcement
    speechService.speak(currentItem.transcript, 1.05);
    setIsPlayingNoise(true);
    setTimeout(() => setIsPlayingNoise(false), 5000);
  };

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 1 tình huống nghe âm thanh hiện trường nhiều tạp âm tại Nhật (như: Quán nhậu Izakaya náo nhiệt tiếng cụng ly, Siêu thị Don Quijote nhạc dồn dập, Tiếng loa phát thanh bão lũ hoặc Ngã tư Shibuya tiếng xe cộ).
Kèm nội dung bóc băng, các từ khóa cốt tử (Filtered tokens), mẹo lọc tạp âm thực tế và 1 bài trắc nghiệm chuẩn đề thi JLPT với lời giải bóc tách và mẹo bắt từ khóa quyết định.
Định dạng JSON:
{
  "id": "fa_${Date.now()}",
  "title": "tiêu đề âm thanh hiện trường",
  "environment": "Quán Izakaya",
  "ambientNoiseDesc": "tiếng ồn nền cụ thể",
  "transcript": "nội dung phát thanh tiếng Nhật",
  "filteredKeyTokens": ["Từ 1", "Từ 2"],
  "noiseFilterTip": "mẹo lọc tạp âm",
  "quiz": {
    "id": "qfa_${Date.now()}",
    "question": "câu hỏi trắc nghiệm nghe hiểu giữa tiếng ồn",
    "options": [
      { "id": "a", "text": "lựa chọn 1", "isCorrect": true },
      { "id": "b", "text": "lựa chọn 2", "isCorrect": false },
      { "id": "c", "text": "lựa chọn 3", "isCorrect": false },
      { "id": "d", "text": "lựa chọn 4", "isCorrect": false }
    ],
    "correctExplanation": "lời giải cặn kẽ",
    "trapAnalysis": "bẫy nghe nhầm số hoặc phủ định",
    "mnemonicTip": "mẹo bắt từ khóa quyết định"
  }
}
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = safeExtractJson<FieldAudioItem | null>(res, null);
      if (parsed && parsed.title) {
        setAudioList((prev) => [parsed, ...prev]);
        setCurrentIndex(0);
        speechService.playSuccessSound();
      } else {
        throw new Error('Dữ liệu JSON không hợp lệ');
      }
    } catch {
      // Fallback field audio
      const fallbackField: FieldAudioItem = {
        id: `fa_inf_${Date.now()}`,
        title: 'Lời mời chào giảm giá giờ chót tại Siêu thị Don Quijote',
        environment: 'Siêu thị Donki',
        ambientNoiseDesc: 'Tiếng nhạc Donki Donki xập xình, tiếng khách hàng chen lấn, tiếng bíp mã vạch liên hồi.',
        transcript: 'お客様にお知らせいたします！ただいま鮮魚コーナーにおきまして、本日限りの半額タイムセールを開始いたしました！お見逃しのないようご利用ください！',
        filteredKeyTokens: ['鮮魚コーナー (Quầy hải sản tươi)', '半額 (Giảm 50%)', 'タイムセール (Giờ vàng giảm giá)'],
        noiseFilterTip: 'Giữa tiếng nhạc ồn ào của siêu thị, hãy chú ý các từ chỉ tỷ lệ giảm giá: 半額 (nửa giá), 3割引き (giảm 30%) và tên quầy hàng.',
        quiz: {
          id: `qfa_inf_${Date.now()}`,
          question: 'Theo loa thông báo của siêu thị, quầy hàng nào đang có chương trình giảm giá nửa giá (半額)?',
          options: [
            { id: 'a', text: 'Quầy cá và hải sản tươi sống (鮮魚コーナー).', isCorrect: true },
            { id: 'b', text: 'Quầy đồ gia dụng điện tử.', isCorrect: false },
            { id: 'c', text: 'Quầy quần áo trẻ em.', isCorrect: false },
            { id: 'd', text: 'Quầy rượu ngoại.', isCorrect: false },
          ],
          correctExplanation: 'Từ khóa then chốt là「鮮魚コーナー」(quầy thủy hải sản tươi). Chữ 鮮 (Tươi) ghép với 魚 (Cá).',
          trapAnalysis: 'Bẫy tiếng ồn: Tiếng nhạc to có thể làm át đi từ 鮮魚, người nghe chỉ nghe được mỗi từ 半額 mà không rõ mua món gì.',
          mnemonicTip: 'Bắt cặp: [Tên quầy hàng] + [Tỷ lệ giảm giá]!',
        },
      };
      setAudioList((prev) => [...prev, fallbackField]);
      setCurrentIndex(audioList.length);
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
            <span>Thư viện Nghe "Âm thanh hiện trường"</span>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span>Mô phỏng tạp âm đời thực</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Luyện nghe trong điều kiện nhiễu ồn thực tế: ga tàu, siêu thị, quán nhậu Izakaya. Rèn kỹ năng lọc tạp âm bắt từ khóa sống còn.
          </p>
        </div>

        <button
          onClick={handleLoadMoreInfinite}
          disabled={isLoadingMore}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
          title="Tải nạp thêm audio tạp âm mới vô hạn"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
          <span>Tải nạp thêm hiện trường ({audioList.length})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Field Player */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-semibold text-amber-400">{currentItem.environment}</span>
                <h3 className="text-lg md:text-xl font-bold text-white mt-0.5">
                  {currentItem.title}
                </h3>
              </div>
            </div>

            {/* Simulated Noise Generator Indicator */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Môi trường tạp âm nền:</span>
              </div>
              <p className="text-xs text-slate-300 italic">{currentItem.ambientNoiseDesc}</p>
            </div>

            {/* Play Button with Noise Synthesis */}
            <div className="pt-2 text-center space-y-3">
              <button
                onClick={handlePlayAudioWithNoise}
                className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg cursor-pointer ${
                  isPlayingNoise
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                <span>{isPlayingNoise ? 'Đang phát kèm tạp âm hiện trường...' : 'Bấm để nghe thông báo có tạp âm'}</span>
              </button>
              <div className="text-[11px] text-slate-500">
                (Âm thanh mô phỏng tiếng ồn nền ga tàu/siêu thị/quán xá kết hợp giọng phát thanh viên)
              </div>
            </div>

            {/* Filtered Key Tokens */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-amber-400" />
                <span>Từ khóa quyết định (Key tokens cần lọc bắt):</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentItem.filteredKeyTokens.map((token, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs font-jp font-medium"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>

            {/* Noise Filter Tip */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-indigo-300">Chiến lược lọc tạp âm:</div>
              <p className="leading-relaxed">{currentItem.noiseFilterTip}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + audioList.length) % audioList.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              ← Hiện trường trước
            </button>
            <span className="font-mono">{currentIndex + 1} / {audioList.length}</span>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % audioList.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              Hiện trường sau →
            </button>
          </div>
        </div>

        {/* Right: Quiz */}
        <div className="lg:col-span-5">
          <QuizCard
            quiz={currentItem.quiz}
            title={`Trắc nghiệm nghe hiện trường: ${currentItem.environment}`}
            onNext={() => setCurrentIndex((prev) => (prev + 1) % audioList.length)}
          />
        </div>
      </div>
    </div>
  );
};
