import React, { useState } from 'react';
import { JapanTruthItem } from '../../types';
import { initialJapanTruthList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { MapPin, RefreshCw, BookOpen, Sparkles, Compass } from 'lucide-react';

export const JapanTruthRoadmap: React.FC = () => {
  const [truthList, setTruthList] = useState<JapanTruthItem[]>(initialJapanTruthList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'article' | 'quiz'>('article');

  const currentItem = truthList[currentIndex % truthList.length];

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy viết 1 bài "Sự thật Nhật Bản" (Japan Truth / Trivia văn hóa ngầm) liên kết với 1 điểm ngữ pháp hoặc chữ Hán JLPT (ví dụ: tại sao người Nhật không tip tiền boa, tại sao người Nhật ăn mì xì xụp, tại sao nhà vệ sinh có nút phát tiếng xả nước Otohime, tại sao không cắm đũa lên bát cơm).
Kèm câu chuyện sâu sắc, Fun fact thú vị và 1 bài trắc nghiệm mini kiểm tra lại kiến thức với lời giải chi tiết và mẹo nhớ.
Định dạng JSON:
{
  "id": "jt_${Date.now()}",
  "title": "Tiêu đề bài viết",
  "japaneseTheme": "chủ đề tiếng Nhật",
  "category": "Văn hóa xã hội",
  "linkedGrammarOrKanji": "điểm kiến thức JLPT liên kết",
  "content": "bài viết sâu sắc bóc tách tâm lý người Nhật 3-4 câu",
  "funFact": "sự thật thú vị ít người biết",
  "recheckQuiz": {
    "id": "qjt_${Date.now()}",
    "question": "câu hỏi trắc nghiệm mini",
    "options": [
      { "id": "a", "text": "lựa chọn 1", "isCorrect": true },
      { "id": "b", "text": "lựa chọn 2", "isCorrect": false },
      { "id": "c", "text": "lựa chọn 3", "isCorrect": false },
      { "id": "d", "text": "lựa chọn 4", "isCorrect": false }
    ],
    "correctExplanation": "lời giải bóc tách",
    "trapAnalysis": "cạm bẫy hiểu lầm",
    "mnemonicTip": "mẹo nhớ nhanh"
  }
}
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = safeExtractJson<JapanTruthItem | null>(res, null);
      if (parsed && parsed.title) {
        setTruthList((prev) => [parsed, ...prev]);
        setCurrentIndex(0);
        speechService.playSuccessSound();
      } else {
        throw new Error('Dữ liệu JSON không hợp lệ');
      }
    } catch {
      // Fallback Japan Truth
      const fallbackTruth: JapanTruthItem = {
        id: `jt_inf_${Date.now()}`,
        title: 'Tại sao người Nhật tuyệt đối không nhận tiền Boa (Tip)?',
        japaneseTheme: 'チップの不文律 (Quy tắc bất thành văn về tiền tip)',
        category: 'Tâm lý người Nhật',
        linkedGrammarOrKanji: 'おもてなし (Omotenashi) & 余計 (Dư thừa)',
        content: 'Ở các nước phương Tây, tiền tip thể hiện sự hài lòng của khách. Nhưng tại Nhật, phí phục vụ tận tâm đã được tính trọn vẹn trong giá niêm yết theo tinh thần Omotenashi. Nếu bạn để lại tiền boa trên bàn, nhân viên sẽ hốt hoảng cầm tiền chạy theo trả lại vì tưởng bạn bỏ quên tiền!',
        funFact: 'Hành động tip còn có thể bị xem là coi thường chủ quán, ngụ ý rằng "chủ trả lương không đủ nên tôi phải bố thí thêm"!',
        recheckQuiz: {
          id: `qjt_inf_${Date.now()}`,
          question: 'Khi ăn xong tại nhà hàng Nhật Bản, hành động nào chuẩn mực nhất để cảm ơn người nấu?',
          options: [
            { id: 'a', text: 'Chắp tay cúi đầu nói「ごちそうさまでした」và thanh toán đúng số tiền trên hóa đơn.', isCorrect: true },
            { id: 'b', text: 'Kẹp tờ 1,000 Yên dưới đáy đĩa làm tiền tip.', isCorrect: false },
            { id: 'c', text: 'Ôm chặt đầu bếp để cảm ơn.', isCorrect: false },
            { id: 'd', text: 'Xin giảm giá vì ăn hết sạch đồ ăn.', isCorrect: false },
          ],
          correctExplanation: 'Người Nhật nhận lời cảm ơn bằng tấm lòng và ngôn từ trang trọng chứ không nhận tiền tip riêng.',
          trapAnalysis: 'Khách du lịch thường để lại tiền boa khiến nhân viên phải chạy đuổi theo ngoài đường rất vất vả.',
          mnemonicTip: 'Gochisousama là tiền boa vô giá nhất!',
        },
      };
      setTruthList((prev) => [...prev, fallbackTruth]);
      setCurrentIndex(truthList.length);
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
            <span>Lộ trình JLPT Liên kết "Sự thật Nhật Bản"</span>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
              Vá lỗ hổng kiến thức qua văn hóa sâu sắc
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Gắn kết các cấu trúc ngữ pháp và chữ Hán JLPT vào những bí mật văn hóa đời sống thực tế để ghi nhớ vĩnh viễn.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('article')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'article' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bài viết ({truthList.length})
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'quiz' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mini Quiz kiểm tra
            </button>
          </div>

          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Đọc thêm bài Sự thật Nhật Bản mới"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải nạp thêm</span>
          </button>
        </div>
      </div>

      {activeTab === 'article' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Article Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                <span className="text-amber-400 font-semibold">{currentItem.category}</span>
                <span className="bg-slate-800 px-2.5 py-0.5 rounded text-indigo-300 font-jp">
                  Liên kết: {currentItem.linkedGrammarOrKanji}
                </span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                  {currentItem.title}
                </h3>
                <div className="text-xs text-slate-400 font-jp mt-1">
                  Chủ đề: {currentItem.japaneseTheme}
                </div>
              </div>

              <div className="text-sm md:text-base text-slate-200 leading-relaxed space-y-3">
                <p>{currentItem.content}</p>
              </div>

              {/* Fun fact box */}
              <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4 space-y-1.5">
                <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Sự thật thú vị (Fun Fact):</span>
                </div>
                <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed">
                  {currentItem.funFact}
                </p>
              </div>
            </div>

            {/* Slider */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + truthList.length) % truthList.length)}
                className="hover:text-slate-200 cursor-pointer"
              >
                ← Bài trước
              </button>
              <span className="font-mono">{currentIndex + 1} / {truthList.length}</span>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % truthList.length)}
                className="hover:text-slate-200 cursor-pointer"
              >
                Bài sau →
              </button>
            </div>
          </div>

          {/* Right Mini Quiz */}
          <div className="lg:col-span-5">
            <QuizCard
              quiz={currentItem.recheckQuiz}
              title={`Mini Quiz: ${currentItem.japaneseTheme}`}
              onNext={() => setCurrentIndex((prev) => (prev + 1) % truthList.length)}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <QuizCard
            quiz={currentItem.recheckQuiz}
            title={`Mini Quiz kiểm tra lại lỗ hổng: ${currentItem.title}`}
            onNext={() => setCurrentIndex((prev) => (prev + 1) % truthList.length)}
            nextLabel="Chuyển sang bài đọc tiếp theo"
          />
        </div>
      )}
    </div>
  );
};
