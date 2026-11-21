import React, { useState, useEffect } from 'react';
import { AudioLensItem } from '../../types';
import { initialAudioLensList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  RefreshCw,
  Headphones,
  Film,
  FileText,
  Lightbulb,
} from 'lucide-react';

export const ContextualAudioLens: React.FC = () => {
  const [lensList, setLensList] = useState<AudioLensItem[]>(initialAudioLensList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playProgress, setPlayProgress] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const currentItem = lensList[currentIndex % lensList.length];

  // Play simulated clip with SpeechSynthesis & animated waveform progress
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      speechService.speak(currentItem.japaneseTranscript, playbackSpeed);
      const totalDuration = (currentItem.durationSec * 1000) / playbackSpeed;
      const step = 50;
      let elapsed = 0;

      timer = setInterval(() => {
        elapsed += step;
        const progress = Math.min((elapsed / totalDuration) * 100, 100);
        setPlayProgress(progress);
        if (progress >= 100) {
          setIsPlaying(false);
          setPlayProgress(0);
          clearInterval(timer);
        }
      }, step);
    } else {
      speechService.stop();
      setPlayProgress(0);
    }

    return () => {
      clearInterval(timer);
      speechService.stop();
    };
  }, [isPlaying, currentItem, playbackSpeed]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 1 tình huống đoạn cắt audio/video thực tế (5-10 giây) từ Podcast, Phim tài liệu hoặc Bản tin Nhật Bản.
Chứa 1 từ khóa/ngữ cảnh văn hóa cốt tử của Nhật (như 相槌, 社交辞令, 忖度, 敬語, 空気を読む).
Kèm transcript bóc băng tiếng Nhật, bản dịch tiếng Việt, lời giải thích từ khóa, mẹo nghe bắt từ khóa và 1 bài tập trắc nghiệm nghe hiểu tình huống kèm bẫy logic JEES và mẹo nhớ.
Định dạng JSON:
{
  "id": "al_${Date.now()}",
  "keyword": "từ khóa chính",
  "durationSec": 8,
  "sourceType": "Podcast",
  "title": "tiêu đề đoạn cắt",
  "japaneseTranscript": "toàn bộ đoạn hội thoại tiếng Nhật 5-10s",
  "vietnameseTranscript": "bản dịch tiếng Việt",
  "keyTimestamp": "00:02 - 00:06",
  "keywordExplanation": "giải thích ý nghĩa",
  "listeningTip": "mẹo nghe bắt từ",
  "quiz": {
    "id": "qal_${Date.now()}",
    "question": "câu hỏi trắc nghiệm nghe hiểu tình huống",
    "options": [
      { "id": "a", "text": "lựa chọn 1", "isCorrect": true },
      { "id": "b", "text": "lựa chọn 2", "isCorrect": false },
      { "id": "c", "text": "lựa chọn 3", "isCorrect": false },
      { "id": "d", "text": "lựa chọn 4", "isCorrect": false }
    ],
    "correctExplanation": "lời giải bóc băng chi tiết",
    "trapAnalysis": "bẫy âm thanh dễ nghe nhầm",
    "mnemonicTip": "mẹo bắt từ khóa quyết định"
  }
}
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = safeExtractJson<AudioLensItem | null>(res, null);
      if (parsed && parsed.keyword) {
        setLensList((prev) => [parsed, ...prev]);
        setCurrentIndex(0);
        speechService.playSuccessSound();
      } else {
        throw new Error('Dữ liệu JSON không hợp lệ');
      }
    } catch {
      // Fallback lens item
      const fallbackLens: AudioLensItem = {
        id: `al_inf_${Date.now()}`,
        keyword: '空気を読む (Kuuki wo Yomu)',
        durationSec: 7,
        sourceType: 'Bản tin',
        title: 'Bản tin: Văn hóa "Đọc bầu không khí" nơi công sở',
        japaneseTranscript: '「そんなこと、言わなくても空気読めよ」と先輩に叱られ、新入社員が戸惑うケースが相次いでいます。',
        vietnameseTranscript: 'Tình trạng nhân viên mới hoang mang vì bị tiền bối mắng: "Chuyện như thế không cần nói cũng phải tự biết đọc bầu không khí chứ" đang liên tục xảy ra.',
        keyTimestamp: '00:02 - 00:05',
        keywordExplanation: 'Đọc bầu không khí: Tự hiểu ngầm ý đồ người khác mà không cần họ phải nói thẳng ra.',
        listeningTip: 'Chú ý ngữ khí gằn giọng của cụm từ「空気読めよ」ở thể mệnh lệnh suồng sã.',
        quiz: {
          id: `qal_inf_${Date.now()}`,
          question: 'Lời phê bình「空気読めよ (Hãy đọc bầu không khí đi)」ngụ ý điều gì?',
          options: [
            { id: 'a', text: 'Phải tinh tế tự quan sát và phán đoán tình hình xung quanh, đừng chờ đợi người khác nhắc nhở.', isCorrect: true },
            { id: 'b', text: 'Bật máy đo nồng độ oxy trong phòng.', isCorrect: false },
            { id: 'c', text: 'Mở hết tất cả cửa sổ cho thoáng khí.', isCorrect: false },
            { id: 'd', text: 'Hít thở thật sâu trước khi nói chuyện.', isCorrect: false },
          ],
          correctExplanation: 'Kuuki wo Yomu là kỹ năng sinh tồn tối thượng ở Nhật: Hiểu ngầm quy tắc bất thành văn.',
          trapAnalysis: 'Người học dễ hiểu theo nghĩa đen là "đọc không khí vật lý".',
          mnemonicTip: 'Không khí (空気) ở đây là "sắc mặt và tâm lý đám đông"!',
        },
      };
      setLensList((prev) => [...prev, fallbackLens]);
      setCurrentIndex(lensList.length);
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
            <span>Kính lúp Âm thanh Thực tế</span>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Headphones className="w-3 h-3 text-cyan-400" />
              <span>Contextual Audio Lens · 5-10s</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Tra cứu từ vựng qua đoạn cắt 5-10 giây từ video/podcast thực tế. Bóc băng transcript và luyện bắt từ khóa.
          </p>
        </div>

        <button
          onClick={handleLoadMoreInfinite}
          disabled={isLoadingMore}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
          title="Tải nạp thêm đoạn cắt video/audio mới vô hạn"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
          <span>Tải nạp thêm ngữ cảnh ({lensList.length})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Simulated Audio / Video Player */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            {/* Player Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-800/60 text-cyan-400">
                  <Film className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-300">{currentItem.title}</div>
                  <div className="text-[11px] text-slate-500">Nguồn: {currentItem.sourceType} · {currentItem.durationSec} giây</div>
                </div>
              </div>

              {/* Speed Controller */}
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setPlaybackSpeed(0.8)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${playbackSpeed === 0.8 ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  0.8x
                </button>
                <button
                  onClick={() => setPlaybackSpeed(1.0)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${playbackSpeed === 1.0 ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  1.0x
                </button>
                <button
                  onClick={() => setPlaybackSpeed(1.2)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${playbackSpeed === 1.2 ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  1.2x
                </button>
              </div>
            </div>

            {/* Simulated Animated Waveform Display */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              {/* Keyword highlight */}
              <div className="flex items-center justify-between z-10 text-xs">
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  <span>Từ khóa bắt tai:</span>
                  <span className="text-white bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded font-jp">
                    {currentItem.keyword}
                  </span>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">{currentItem.keyTimestamp}</span>
              </div>

              {/* Waveform graphic bars */}
              <div className="flex items-center justify-between gap-1 h-14 my-auto z-10">
                {Array.from({ length: 36 }).map((_, i) => {
                  const isActive = (i / 36) * 100 <= playProgress;
                  // Organic pseudo heights
                  const h = Math.sin(i * 0.4) * 18 + 24;
                  return (
                    <div
                      key={i}
                      style={{ height: `${h}px` }}
                      className={`flex-1 rounded-full transition-all duration-100 ${
                        isActive
                          ? 'bg-gradient-to-t from-cyan-500 to-indigo-400 shadow-sm'
                          : isPlaying
                          ? 'bg-slate-700 animate-pulse'
                          : 'bg-slate-800'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden z-10">
                <div
                  className="bg-cyan-400 h-full transition-all duration-75"
                  style={{ width: `${playProgress}%` }}
                />
              </div>
            </div>

            {/* Play / Pause Controls */}
            <div className="flex items-center justify-center gap-4 pt-1">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-lg shadow-cyan-950 cursor-pointer"
                title={isPlaying ? 'Dừng phát' : 'Nghe đoạn cắt audio'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
            </div>

            {/* Transcript Breakdown (Bóc băng) */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Bóc băng chi tiết (Transcript):</span>
              </div>
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2">
                <div className="text-sm md:text-base font-jp text-slate-100 font-medium leading-relaxed">
                  {currentItem.japaneseTranscript}
                </div>
                <div className="text-xs text-slate-400 border-t border-slate-800/60 pt-2">
                  {currentItem.vietnameseTranscript}
                </div>
              </div>
            </div>

            {/* Listening Tip */}
            <div className="bg-cyan-950/20 border border-cyan-900/30 p-3.5 rounded-xl text-xs text-cyan-200/90 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-cyan-300">Mẹo nghe bắt từ khóa: </span>
                <span>{currentItem.listeningTip}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + lensList.length) % lensList.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              ← Ngữ cảnh trước
            </button>
            <span className="font-mono">{currentIndex + 1} / {lensList.length}</span>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % lensList.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              Ngữ cảnh sau →
            </button>
          </div>
        </div>

        {/* Right Listening Quiz */}
        <div className="lg:col-span-5">
          <QuizCard
            quiz={currentItem.quiz}
            title={`Trắc nghiệm nghe hiểu: ${currentItem.keyword}`}
            onNext={() => setCurrentIndex((prev) => (prev + 1) % lensList.length)}
          />
        </div>
      </div>
    </div>
  );
};
