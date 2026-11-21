import React, { useState } from 'react';
import { SlangItem } from '../../types';
import { initialSlangList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { Flame, RefreshCw, Volume2, MessageSquare, Compass, Sparkles } from 'lucide-react';

export const SlangRadar: React.FC = () => {
  const [slangList, setSlangList] = useState<SlangItem[]>(initialSlangList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'radar' | 'quiz'>('radar');

  const currentSlang = slangList[currentIndex % slangList.length];

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy cào/sinh ra 1 từ lóng hoặc từ xu hướng mới nhất tại Nhật Bản (từ X/Twitter, TikTok, 2ch, hoặc từ lóng công sở Z-gen mới như Kaomoji, WKTK, W, Gachizei, Numaru, Kaomoji, Oshi, Kasuhara).
Kèm nguồn gốc, ngữ cảnh sử dụng, đoạn hội thoại mẫu tự nhiên 2 người và 1 câu hỏi trắc nghiệm đoán nghĩa với lời giải bóc tách và mẹo nhớ.
Định dạng JSON như schema SlangItem:
{
  "id": "s_${Date.now()}",
  "slang": "từ lóng",
  "reading": "cách đọc",
  "origin": "TikTok / X",
  "meaning": "nghĩa chi tiết",
  "contextUsage": "bối cảnh xã hội sử dụng",
  "sampleDialogue": [
    { "speaker": "A", "text": "câu tiếng Nhật", "translation": "dịch" },
    { "speaker": "B", "text": "câu tiếng Nhật", "translation": "dịch" }
  ],
  "quiz": {
    "id": "qs_${Date.now()}",
    "question": "câu hỏi trắc nghiệm cách dùng",
    "options": [
      { "id": "a", "text": "lựa chọn 1", "isCorrect": true },
      { "id": "b", "text": "lựa chọn 2", "isCorrect": false },
      { "id": "c", "text": "lựa chọn 3", "isCorrect": false },
      { "id": "d", "text": "lựa chọn 4", "isCorrect": false }
    ],
    "correctExplanation": "giải thích chi tiết",
    "trapAnalysis": "lỗi hay hiểu nhầm",
    "mnemonicTip": "mẹo nhớ nhanh"
  }
}
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần hợp lệ.');
      const parsed = safeExtractJson<SlangItem | null>(res, null);
      if (parsed && parsed.slang) {
        setSlangList((prev) => [parsed, ...prev]);
        setCurrentIndex(0);
        speechService.playSuccessSound();
      } else {
        throw new Error('Dữ liệu JSON không hợp lệ');
      }
    } catch {
      // Varied trending slang pool
      const slangPool: SlangItem[] = [
        {
          id: `s_inf_${Date.now()}_1`,
          slang: '蛙化現象 (Kaeru-ka Genshou)',
          reading: 'かえるかげんしょう',
          origin: 'TikTok / X Trending',
          meaning: 'Hiện tượng "vỡ mộng" đột ngột: đang thích một người bỗng dưng tụt cảm xúc vì một hành động vụng về nhỏ nhặt.',
          contextUsage: 'Phổ biến trong giới trẻ Gen Z Nhật khi hẹn hò, đối chiếu với cổ tích Hoàng tử Ếch bị đảo ngược.',
          sampleDialogue: [
            { speaker: 'A', text: '彼氏が財布出す時もたついて、なんか蛙化現象起きちゃった…。', translation: 'Lúc bạn trai rút ví lóng ngóng tự nhiên tớ bị tụt mood hoàn toàn...' },
            { speaker: 'B', text: 'えー！そんな些細なことで冷めちゃったの？！', translation: 'Hả! Chỉ vì chuyện nhỏ thế mà nguội lạnh luôn á?!' }
          ],
          quiz: {
            id: `qs_fb_${Date.now()}_1`,
            question: '「蛙化現象」phản ánh tâm lý nào của giới trẻ Nhật?',
            options: [
              { id: 'a', text: 'Cảm xúc yêu đương bị dập tắt đột ngột chỉ vì cử chỉ vụng về nhỏ của đối phương.', isCorrect: true },
              { id: 'b', text: 'Thích nuôi ếch làm thú cưng trong nhà.', isCorrect: false },
              { id: 'c', text: 'Biến thành hoàng tử sau một đêm.', isCorrect: false },
              { id: 'd', text: 'Bị bạn bè trêu chọc.', isCorrect: false }
            ],
            correctExplanation: 'Hiện tượng Kaeruka là từ khóa Top Trend ám chỉ cảm xúc tụt dốc không phanh.',
            trapAnalysis: 'Nhiều người dịch nghĩa đen là "hóa thành con ếch".',
            mnemonicTip: 'Hoàng tử biến lại thành ếch = Tụt cảm xúc vỡ mộng.'
          }
        },
        {
          id: `s_inf_${Date.now()}_2`,
          slang: '闇バイト (Yami Baito)',
          reading: 'やみばいと',
          origin: 'Thời sự NHK / Tin tức xã hội',
          meaning: 'Việc làm chui phi pháp qua mạng xã hội với thù lao cao ngất ngưởng nhưng chứa bẫy tội phạm nguy hiểm.',
          contextUsage: 'Chủ đề cảnh báo an ninh quốc gia nóng bỏng nhất năm 2024 tại Nhật Bản.',
          sampleDialogue: [
            { speaker: 'A', text: '「高額報酬！荷物を運ぶだけ」って求人、これ絶対に闇バイトだよ。', translation: '"Thù lao cao ngất! Chỉ cần chuyển gói hàng", tin tuyển dụng này chắc chắn là Yami Baito rồi.' },
            { speaker: 'B', text: '絶対に手を出したらダメ！一度関わったら脅されて抜け出せなくなるからね。', translation: 'Tuyệt đối đừng dính vào! Dính một lần là bị đe dọa không rút ra được đâu.' }
          ],
          quiz: {
            id: `qs_fb_${Date.now()}_2`,
            question: 'Đặc điểm nhận diện nguy hiểm của「闇バイト」là gì?',
            options: [
              { id: 'a', text: 'Hứa hẹn thù lao cao bất thường cho công việc đơn giản nhưng yêu cầu thông tin cá nhân và tài khoản.', isCorrect: true },
              { id: 'b', text: 'Làm việc ban đêm tại cửa hàng tiện lợi bình thường.', isCorrect: false },
              { id: 'c', text: 'Làm việc tại công ty nhà nước.', isCorrect: false },
              { id: 'd', text: 'Dạy học miễn phí cho trẻ em.', isCorrect: false }
            ],
            correctExplanation: 'Cảnh sát Nhật liên tục phát cảnh báo về các chiêu trò tuyển dụng Yami Baito lừa đảo.',
            trapAnalysis: 'Dễ nhầm với làm ca đêm (Yakin) hợp pháp.',
            mnemonicTip: 'Yami (Hắc ám) + Baito (Việc làm thêm) = Việc làm đen phi pháp.'
          }
        }
      ];

      const selected = slangPool[Math.floor(Math.random() * slangPool.length)];
      setSlangList((prev) => [selected, ...prev]);
      setCurrentIndex(0);
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>Radar Từ lóng & Tiếng Nhật Xu hướng</span>
            <span className="text-xs font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Flame className="w-3 h-3 text-rose-400" />
              <span>Trending X / 2ch / TikTok</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Cập nhật từ lóng công sở, văn hóa mạng và giới trẻ Z-gen Nhật Bản kèm trắc nghiệm đoán nghĩa thực tế.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'radar'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Radar ({slangList.length})
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Trắc nghiệm
            </button>
          </div>

          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Cào nạp thêm từ lóng mới vô hạn"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải nạp thêm</span>
          </button>
        </div>
      </div>

      {activeTab === 'radar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Slang Card */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-rose-400">{currentSlang.origin}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">Xu hướng cộng đồng</span>
                </div>
                <button
                  onClick={() => speechService.speak(currentSlang.slang)}
                  className="p-2 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                  title="Nghe phát âm chuẩn"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-black font-jp text-white tracking-wide">
                  {currentSlang.slang}
                </div>
                <div className="text-base text-rose-300 font-jp mt-1">
                  {currentSlang.reading}
                </div>
                <div className="text-base md:text-lg font-medium text-slate-200 mt-3">
                  {currentSlang.meaning}
                </div>
              </div>

              {/* Context Usage */}
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-1.5 text-xs md:text-sm">
                <div className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>Bối cảnh sử dụng:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{currentSlang.contextUsage}</p>
              </div>

              {/* Sample Dialogue */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Hội thoại thực chiến:</span>
                </div>
                <div className="space-y-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800/60 text-xs md:text-sm">
                  {currentSlang.sampleDialogue.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="font-bold text-rose-400 shrink-0">{line.speaker}:</span>
                      <div>
                        <div className="font-jp text-slate-100 font-medium">{line.text}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{line.translation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Slider control */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + slangList.length) % slangList.length)}
                className="hover:text-slate-200 cursor-pointer"
              >
                ← Từ trước
              </button>
              <span className="font-mono">{currentIndex + 1} / {slangList.length}</span>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % slangList.length)}
                className="hover:text-slate-200 cursor-pointer"
              >
                Từ tiếp theo →
              </button>
            </div>
          </div>

          {/* Right Column: Quiz */}
          <div className="lg:col-span-5">
            <QuizCard
              quiz={currentSlang.quiz}
              title={`Trắc nghiệm phản xạ từ lóng: ${currentSlang.slang}`}
              onNext={() => setCurrentIndex((prev) => (prev + 1) % slangList.length)}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <QuizCard
            quiz={currentSlang.quiz}
            title={`Trắc nghiệm đoán nghĩa từ lóng: ${currentSlang.slang}`}
            onNext={() => setCurrentIndex((prev) => (prev + 1) % slangList.length)}
            nextLabel="Chuyển sang từ lóng tiếp theo"
          />
        </div>
      )}
    </div>
  );
};
