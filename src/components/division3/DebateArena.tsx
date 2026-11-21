import React, { useState } from 'react';
import { DebateTopic } from '../../types';
import { initialDebateTopics } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { MessageSquareCode, RefreshCw, Volume2, ShieldCheck, Sparkles, Scale, BookOpen } from 'lucide-react';

export const DebateArena: React.FC = () => {
  const [topics, setTopics] = useState<DebateTopic[]>(initialDebateTopics);
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);
  const [currentStanceIndex, setCurrentStanceIndex] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'arena' | 'quiz'>('arena');

  const currentTopic = topics[currentTopicIndex % topics.length];
  const currentPerspective = currentTopic.perspectives[currentStanceIndex % currentTopic.perspectives.length] || currentTopic.perspectives[0];

  // Button "Tải nạp thêm góc nhìn" (AI switches stance or creates new perspective)
  const handleLoadMorePerspective = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Bạn là AI phản biện sắc sảo các vấn đề xã hội Nhật Bản.
Chủ đề hiện tại: "${currentTopic.title}".
Hãy sinh ra 1 GÓC NHÌN MỚI (ví dụ: Góc nhìn của Chuyên gia kinh tế nước ngoài, Góc nhìn Người cao tuổi, hoặc Góc nhìn Gen Z châm biếm).
Kèm luận điểm sắc bén (argument), 2 luận cứ phản bác then chốt (keyCounterPoints) và 2 từ nối tranh luận tiếng Nhật cao cấp (usefulTransitionWords) kèm cách dùng.
Định dạng JSON:
{
  "stance": "Góc nhìn Doanh nghiệp nước ngoài",
  "argument": "luận điểm tiếng Việt sâu sắc",
  "keyCounterPoints": ["phản bác 1", "phản bác 2"],
  "usefulTransitionWords": [
    { "word": "そうは言うものの、", "meaning": "Dẫu nói là vậy nhưng,", "usageRule": "chuyển ý phản biện" },
    { "word": "根本的な問題は、", "meaning": "Vấn đề căn bản ở đây là,", "usageRule": "xoáy sâu vào bản chất" }
  ]
}
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = safeExtractJson<any | null>(res, null);

      if (parsed && parsed.argument) {
        const updatedTopics = [...topics];
        updatedTopics[currentTopicIndex % topics.length].perspectives.push(parsed);
        setTopics(updatedTopics);
        setCurrentStanceIndex(updatedTopics[currentTopicIndex % topics.length].perspectives.length - 1);
        speechService.playSuccessSound();
      } else {
        throw new Error('Dữ liệu JSON không hợp lệ');
      }
    } catch {
      // Rotate stance
      setCurrentStanceIndex((prev) => (prev + 1) % currentTopic.perspectives.length);
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
            <span>Phòng Tranh biện AI (Debate Arena)</span>
            <span className="text-xs font-mono text-purple-400 bg-purple-950/60 border border-purple-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-purple-400" />
              <span>Đa chiều góc nhìn xã hội Nhật</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            "Tải nạp thêm góc nhìn" để AI đổi vai phản biện. Chọn luận điểm phản bác sắc bén và học nghệ thuật dùng từ nối câu giờ khi cãi lý.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('arena')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'arena' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Võ đài tranh biện
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'quiz' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Trắc nghiệm phản bác
            </button>
          </div>

          <button
            onClick={handleLoadMorePerspective}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="AI đổi vai phản biện góc nhìn mới"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải nạp thêm góc nhìn</span>
          </button>
        </div>
      </div>

      {activeTab === 'arena' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Debate Stage */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                <span className="font-semibold text-purple-400">{currentTopic.category}</span>
                <span className="text-slate-500 font-mono">
                  Góc nhìn {currentStanceIndex + 1} / {currentTopic.perspectives.length}
                </span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                  {currentTopic.title}
                </h3>
              </div>

              {/* Active Stance Card */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-purple-900/50 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-purple-900/50 border border-purple-700/60 text-purple-200 text-xs font-semibold">
                    Thái độ: {currentPerspective.stance}
                  </span>
                  <button
                    onClick={() => speechService.speak(currentPerspective.argument)}
                    className="text-slate-400 hover:text-purple-300 cursor-pointer p-1"
                    title="Nghe AI đọc luận điểm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-sm md:text-base text-slate-200 leading-relaxed">
                  {currentPerspective.argument}
                </div>

                {/* Key Counter Points */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <div className="text-xs font-semibold text-slate-400">Luận cứ cốt tử:</div>
                  {currentPerspective.keyCounterPoints.map((cp, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-purple-400 font-mono">▸</span>
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transition Words Guide (Từ nối câu giờ & Đảo ngược) */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>Vũ khí từ nối (Liên từ câu giờ & Phản đòn khi tranh biện):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentPerspective.usefulTransitionWords.map((tw, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-purple-300 font-jp">{tw.word}</span>
                        <button
                          onClick={() => speechService.speak(tw.word)}
                          className="text-slate-500 hover:text-purple-300 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-slate-300">{tw.meaning}</div>
                      <div className="text-[11px] text-slate-500">{tw.usageRule}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Topic Switcher */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <button
                onClick={() => {
                  setCurrentTopicIndex((prev) => (prev - 1 + topics.length) % topics.length);
                  setCurrentStanceIndex(0);
                }}
                className="hover:text-slate-200 cursor-pointer"
              >
                ← Chuyên đề trước
              </button>
              <span className="font-mono">{currentTopicIndex + 1} / {topics.length}</span>
              <button
                onClick={() => {
                  setCurrentTopicIndex((prev) => (prev + 1) % topics.length);
                  setCurrentStanceIndex(0);
                }}
                className="hover:text-slate-200 cursor-pointer"
              >
                Chuyên đề tiếp theo →
              </button>
            </div>
          </div>

          {/* Right: Quiz */}
          <div className="lg:col-span-5">
            <QuizCard
              quiz={currentTopic.quiz}
              title="Trắc nghiệm chọn luận điểm phản bác"
              onNext={() => {
                setCurrentTopicIndex((prev) => (prev + 1) % topics.length);
                setCurrentStanceIndex(0);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <QuizCard
            quiz={currentTopic.quiz}
            title={`Trắc nghiệm phản biện: ${currentTopic.title}`}
            onNext={() => {
              setCurrentTopicIndex((prev) => (prev + 1) % topics.length);
              setCurrentStanceIndex(0);
            }}
            nextLabel="Chuyển sang chuyên đề tiếp theo"
          />
        </div>
      )}
    </div>
  );
};
