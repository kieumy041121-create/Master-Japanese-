import React, { useState } from 'react';
import { ContextItem } from '../../types';
import { initialContextList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { Layers, RefreshCw, Volume2, Search, ArrowRight, ShieldCheck, Smile, BookOpen } from 'lucide-react';

export const ContextGenerator: React.FC = () => {
  const [contextList, setContextList] = useState<ContextItem[]>(initialContextList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'matrix' | 'quiz'>('matrix');

  const currentItem = contextList[currentIndex % contextList.length];

  const handleGenerateWord = async (customWord?: string) => {
    const target = customWord || searchWord || '見る';
    setIsGenerating(true);

    try {
      const prompt = `
Hãy sinh ra 3 câu ví dụ đa chiều cho từ vựng tiếng Nhật: "${target}" ở 3 sắc thái:
1. Tôn kính ngữ (Keigo/Business - gửi khách hàng, đối tác, sếp lớn)
2. Suồng sã (Casual/Slang - bạn thân, giới trẻ)
3. Báo chí (Editorial/Formal - thời sự, phóng sự, văn viết trang trọng)

Kèm 1 bài tập trắc nghiệm chọn sắc thái chuẩn cho một tình huống cụ thể, kèm lời giải bóc tách tại sao chọn đáp án đó và mẹo nhớ văn phong.
Trả về định dạng JSON thuần:
{
  "id": "ctx_${Date.now()}",
  "targetWord": "${target}",
  "reading": "cách đọc hiragana",
  "meaning": "nghĩa cơ bản",
  "nuances": {
    "keigo": { "sentence": "câu tiếng Nhật", "translation": "dịch", "note": "ghi chú kính ngữ" },
    "casual": { "sentence": "câu tiếng Nhật", "translation": "dịch", "note": "ghi chú suồng sã" },
    "editorial": { "sentence": "câu tiếng Nhật", "translation": "dịch", "note": "ghi chú văn phong báo chí" }
  },
  "quiz": {
    "id": "qctx_${Date.now()}",
    "question": "câu hỏi trắc nghiệm chọn câu đúng văn phong cho tình huống",
    "options": [
      { "id": "a", "text": "lựa chọn 1", "isCorrect": true },
      { "id": "b", "text": "lựa chọn 2", "isCorrect": false },
      { "id": "c", "text": "lựa chọn 3", "isCorrect": false },
      { "id": "d", "text": "lựa chọn 4", "isCorrect": false }
    ],
    "correctExplanation": "phân tích kỹ lý do chọn đáp án",
    "trapAnalysis": "bẫy dùng từ sai ngữ cảnh",
    "mnemonicTip": "mẹo nhớ nhanh văn phong"
  }
}
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần hợp lệ.');
      const parsed = safeExtractJson<ContextItem | null>(res, null);
      if (parsed && parsed.targetWord) {
        setContextList((prev) => [parsed, ...prev]);
        setCurrentIndex(0);
        setSearchWord('');
        speechService.playSuccessSound();
      } else {
        throw new Error('Dữ liệu JSON không hợp lệ');
      }
    } catch {
      // Fallback context item
      const fallbackItem: ContextItem = {
        id: `ctx_inf_${Date.now()}`,
        targetWord: target,
        reading: target === '見る' ? 'みる' : 'きく',
        meaning: 'Quan sát, nhìn, xem xét',
        nuances: {
          keigo: {
            sentence: '部長、こちらの企画書をぜひご覧になってください。',
            translation: 'Thưa Trưởng phòng, xin ngài vui lòng xem qua bản kế hoạch này ạ.',
            note: 'Dùng Tôn kính ngữ (Sonkeigo)「ご覧になる」cho hành động xem của cấp trên.',
          },
          casual: {
            sentence: 'おい、あれ見てみろよ！めっちゃやばいぞ。',
            translation: 'Ê nhìn cái kia kìa mày! Đỉnh chóp luôn.',
            note: 'Thể mệnh lệnh thân mật「見てみろ」dùng giữa bạn bè.',
          },
          editorial: {
            sentence: '専門家は今回の為替変動を注視している。',
            translation: 'Các chuyên gia đang dõi theo sát sao biến động tỷ giá hối đoái lần này.',
            note: 'Văn phong báo chí dùng từ Hán Việt「注視する (ちゅうしする - Chú thị)」để diễn đạt việc quan sát sâu sắc.',
          },
        },
        quiz: {
          id: `qctx_inf_${Date.now()}`,
          question: `Khi viết báo cáo phân tích kinh tế trên báo chí, nên dùng từ nào thay thế cho「見る」?`,
          options: [
            { id: 'a', text: '注視する / 観察する', isCorrect: true },
            { id: 'b', text: 'ご覧になる', isCorrect: false },
            { id: 'c', text: '見まくる', isCorrect: false },
            { id: 'd', text: '見ちゃった', isCorrect: false },
          ],
          correctExplanation: 'Báo chí và văn luận sử dụng từ vựng Hán trang trọng mang tính khách quan như 注視する.',
          trapAnalysis: 'ご覧になる là ngôn ngữ hội thoại kính ngữ, không dùng cho bản tin ngôi thứ 3.',
          mnemonicTip: 'Báo chí = Dùng chữ Hán (Kango); Tiếp khách = Dùng Kính ngữ (Keigo).',
        },
      };
      setContextList((prev) => [...prev, fallbackItem]);
      setCurrentIndex(contextList.length);
      speechService.playSuccessSound();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>Trình tạo Ngữ cảnh Đa chiều AI</span>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
              3 Sắc thái: Kính ngữ · Suồng sã · Báo chí
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Tra một từ vựng và nhấn "Tải nạp thêm", AI sinh ra vô hạn ngữ cảnh tương ứng và bài trắc nghiệm chọn văn phong.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'matrix' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ma trận 3 sắc thái
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'quiz' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Trắc nghiệm văn phong
            </button>
          </div>
        </div>
      </div>

      {/* Tra cứu từ vựng bất kỳ */}
      <div className="flex flex-col sm:flex-row gap-2 max-w-2xl">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateWord()}
            placeholder="Nhập từ vựng tiếng Nhật muốn tạo ngữ cảnh (VD: 言う, 待つ, 飲む)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-3.5 pr-10 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
        </div>
        <button
          onClick={() => handleGenerateWord()}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'AI đang sinh ngữ cảnh...' : 'Tải nạp thêm ngữ cảnh'}</span>
        </button>
      </div>

      {activeTab === 'matrix' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main 3 Nuances Deck */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-xs text-slate-400">Từ mục tiêu:</div>
                  <div className="text-3xl font-black font-jp text-white">
                    {currentItem.targetWord}
                  </div>
                  <div className="text-xs text-indigo-400 font-jp mt-0.5">
                    {currentItem.reading} · {currentItem.meaning}
                  </div>
                </div>

                <button
                  onClick={() => speechService.speak(currentItem.targetWord)}
                  className="p-2 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                  title="Nghe phát âm từ khóa"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* 3 Nuance Rows */}
              <div className="space-y-3.5">
                {/* 1. Keigo */}
                <div className="bg-slate-950/70 border border-indigo-900/40 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      <span>1. Tôn kính ngữ (Keigo / Thương mại)</span>
                    </span>
                    <button
                      onClick={() => speechService.speak(currentItem.nuances.keigo.sentence)}
                      className="text-slate-400 hover:text-indigo-300 cursor-pointer p-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-sm md:text-base font-jp text-slate-100 font-medium">
                    {currentItem.nuances.keigo.sentence}
                  </div>
                  <div className="text-xs text-slate-400">{currentItem.nuances.keigo.translation}</div>
                  <div className="text-[11px] text-indigo-400/80 bg-indigo-950/30 p-2 rounded border border-indigo-900/30">
                    {currentItem.nuances.keigo.note}
                  </div>
                </div>

                {/* 2. Casual */}
                <div className="bg-slate-950/70 border border-emerald-900/40 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                      <Smile className="w-4 h-4 text-emerald-400" />
                      <span>2. Suồng sã (Casual / Bạn bè)</span>
                    </span>
                    <button
                      onClick={() => speechService.speak(currentItem.nuances.casual.sentence)}
                      className="text-slate-400 hover:text-emerald-300 cursor-pointer p-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-sm md:text-base font-jp text-slate-100 font-medium">
                    {currentItem.nuances.casual.sentence}
                  </div>
                  <div className="text-xs text-slate-400">{currentItem.nuances.casual.translation}</div>
                  <div className="text-[11px] text-emerald-400/80 bg-emerald-950/30 p-2 rounded border border-emerald-900/30">
                    {currentItem.nuances.casual.note}
                  </div>
                </div>

                {/* 3. Editorial */}
                <div className="bg-slate-950/70 border border-amber-900/40 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>3. Báo chí (Editorial / Luận văn)</span>
                    </span>
                    <button
                      onClick={() => speechService.speak(currentItem.nuances.editorial.sentence)}
                      className="text-slate-400 hover:text-amber-300 cursor-pointer p-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-sm md:text-base font-jp text-slate-100 font-medium">
                    {currentItem.nuances.editorial.sentence}
                  </div>
                  <div className="text-xs text-slate-400">{currentItem.nuances.editorial.translation}</div>
                  <div className="text-[11px] text-amber-400/80 bg-amber-950/30 p-2 rounded border border-amber-900/30">
                    {currentItem.nuances.editorial.note}
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + contextList.length) % contextList.length)}
                className="hover:text-slate-200 cursor-pointer"
              >
                ← Từ trước
              </button>
              <span className="font-mono">{currentIndex + 1} / {contextList.length}</span>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % contextList.length)}
                className="hover:text-slate-200 cursor-pointer"
              >
                Từ tiếp theo →
              </button>
            </div>
          </div>

          {/* Right Column: Quiz */}
          <div className="lg:col-span-5">
            <QuizCard
              quiz={currentItem.quiz}
              title={`Trắc nghiệm chọn sắc thái:「${currentItem.targetWord}」`}
              onNext={() => setCurrentIndex((prev) => (prev + 1) % contextList.length)}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <QuizCard
            quiz={currentItem.quiz}
            title={`Trắc nghiệm văn phong và sắc thái:「${currentItem.targetWord}」`}
            onNext={() => setCurrentIndex((prev) => (prev + 1) % contextList.length)}
            nextLabel="Chuyển sang từ tiếp theo"
          />
        </div>
      )}
    </div>
  );
};
