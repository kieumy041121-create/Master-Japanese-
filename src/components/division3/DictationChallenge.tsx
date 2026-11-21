import React, { useState } from 'react';
import { DictationItem, JLPTLevel } from '../../types';
import { initialDictationsList } from '../../data/initialData';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { Headphones, RefreshCw, Volume2, CheckCircle2, XCircle, Lightbulb, Play, Sparkles } from 'lucide-react';

interface DictationChallengeProps {
  currentLevel: JLPTLevel;
}

export const DictationChallenge: React.FC<DictationChallengeProps> = ({ currentLevel }) => {
  const [dictList, setDictList] = useState<DictationItem[]>(initialDictationsList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userTypedAnswer, setUserTypedAnswer] = useState<string>('');
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [selectedSpeed, setSelectedSpeed] = useState<number>(1.0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const currentItem = dictList[currentIndex % dictList.length];

  const handlePlayAudio = (rate: number = selectedSpeed) => {
    speechService.speak(currentItem.fullSentence, rate);
  };

  const handleCheckAnswer = () => {
    setHasChecked(true);
    const isCorrect = userTypedAnswer.trim().toLowerCase() === currentItem.missingWords.trim().toLowerCase() ||
      userTypedAnswer.trim() === currentItem.missingWords.split(' ')[0];
    if (isCorrect) {
      speechService.playSuccessSound();
    } else {
      speechService.playErrorSound();
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dictList.length);
    setUserTypedAnswer('');
    setHasChecked(false);
  };

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 1 câu thử thách chép chính tả (Dictation) cấp độ ${currentLevel} với hiện tượng nuốt âm, nối âm hoặc phương ngữ vùng miền (Tokyo, Kansai-ben hoặc Hakata-ben).
Kèm câu hoàn chỉnh, cách đọc, dịch nghĩa, câu đục lỗ (maskedSentence) có chỗ trống, từ còn thiếu (missingWords), hiện tượng ngữ âm (phoneticPhenomenon) và mẹo nghe quen tai.
Định dạng JSON:
{
  "id": "dict_${Date.now()}",
  "level": "${currentLevel}",
  "dialect": "Tokyo Tiêu chuẩn",
  "speedLevels": ["0.75x", "1.0x", "1.25x"],
  "fullSentence": "câu đầy đủ tiếng Nhật",
  "reading": "cách đọc hiragana",
  "translation": "dịch nghĩa tiếng Việt",
  "maskedSentence": "câu đục lỗ có chỗ trống ______",
  "missingWords": "từ điền vào chỗ trống",
  "phoneticPhenomenon": "hiện tượng nuốt âm hoặc nối âm",
  "listeningTip": "mẹo nghe bắt kịp âm"
}
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = safeExtractJson<DictationItem | null>(res, null);
      if (parsed && parsed.fullSentence) {
        setDictList((prev) => [parsed, ...prev]);
        setCurrentIndex(0);
        setUserTypedAnswer('');
        setHasChecked(false);
        speechService.playSuccessSound();
      } else {
        throw new Error('Dữ liệu JSON không hợp lệ');
      }
    } catch {
      // Fallback
      const fallbackDict: DictationItem = {
        id: `dict_inf_${Date.now()}`,
        level: currentLevel,
        dialect: 'Tokyo Tiêu chuẩn',
        speedLevels: ['0.75x', '1.0x', '1.25x'],
        fullSentence: 'やらなきゃいけないことが山積みだよ。',
        reading: 'やらなきゃいけないことがやまづみだよ。',
        translation: 'Việc phải làm chất đống như núi rồi đây này.',
        maskedSentence: 'やらなきゃ_______ことが山積みだよ。',
        missingWords: 'いけない',
        phoneticPhenomenon: 'Hiện tượng nói tắt:「やらなければいけない」bị rút ngắn thành「やらなきゃいけない」trong khẩu ngữ thường nhật.',
        listeningTip: 'Cụm「〜なきゃ」thay thế hoàn toàn cho「〜なければ」trong giao tiếp tốc độ cao.',
      };
      setDictList((prev) => [...prev, fallbackDict]);
      setCurrentIndex(dictList.length);
      setUserTypedAnswer('');
      setHasChecked(false);
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
            <span>Thử thách Chép chính tả (Dictation Loop N5-N1)</span>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
              Giải mã nuốt âm & Giọng vùng miền
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Phát ngẫu nhiên audio ở nhiều tốc độ (0.75x - 1.25x) và giọng địa phương (Tokyo, Kansai). Điền từ còn thiếu vào chỗ trống.
          </p>
        </div>

        <button
          onClick={handleLoadMoreInfinite}
          disabled={isLoadingMore}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
          title="Tải nạp thêm câu chép chính tả mới vô hạn"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
          <span>Tải nạp thêm audio ({dictList.length})</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
          {/* Card Top Details */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-indigo-400 font-mono">[{currentItem.level}]</span>
              <span>·</span>
              <span className="text-slate-300 font-jp">{currentItem.dialect}</span>
            </div>

            {/* Speed Buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 mr-1">Tốc độ:</span>
              {[0.75, 1.0, 1.25].map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    setSelectedSpeed(rate);
                    handlePlayAudio(rate);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer transition-colors ${
                    selectedSpeed === rate
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {/* Audio Trigger Stage */}
          <div className="text-center py-4 space-y-3">
            <button
              onClick={() => handlePlayAudio()}
              className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center mx-auto transition-transform hover:scale-105 shadow-xl shadow-indigo-950 cursor-pointer"
              title="Phát audio nghe câu"
            >
              <Volume2 className="w-7 h-7" />
            </button>
            <div className="text-xs text-slate-400">
              Bấm loa để nghe câu (hoặc chọn tốc độ 0.75x để nghe chậm)
            </div>
          </div>

          {/* Masked Sentence Display */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 text-center space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              --- Điền từ còn thiếu vào ô trống ---
            </div>
            <div className="text-lg md:text-xl font-bold font-jp text-white leading-relaxed">
              {currentItem.maskedSentence}
            </div>
          </div>

          {/* User Input Field */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={userTypedAnswer}
                onChange={(e) => setUserTypedAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                disabled={hasChecked}
                placeholder="Gõ từ còn thiếu (Kanji hoặc Hiragana)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-jp"
              />
              <button
                onClick={handleCheckAnswer}
                disabled={hasChecked || !userTypedAnswer.trim()}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-semibold rounded-xl transition-colors cursor-pointer disabled:opacity-50 shrink-0"
              >
                Kiểm tra
              </button>
            </div>
          </div>

          {/* Solution & Phonetic Phenomenon Breakdown */}
          {hasChecked && (
            <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs md:text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-300">Từ còn thiếu chính xác:</span>
                  <span className="text-base font-bold text-emerald-400 font-jp">
                    {currentItem.missingWords}
                  </span>
                </div>
                <div className="border-t border-slate-800/80 pt-2 text-slate-300">
                  <span className="font-bold font-jp text-white">Câu hoàn chỉnh: </span>
                  <span className="font-jp">{currentItem.fullSentence}</span>
                  <div className="text-xs text-slate-400 mt-0.5">Dịch: {currentItem.translation}</div>
                </div>
              </div>

              {/* Phonetic Phenomenon */}
              <div className="bg-indigo-950/20 border border-indigo-900/40 p-4 rounded-xl text-xs space-y-1.5 text-indigo-200">
                <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Giải mã hiện tượng nuốt âm / biến âm (Phonetics):</span>
                </div>
                <p className="leading-relaxed text-slate-300">{currentItem.phoneticPhenomenon}</p>
              </div>

              {/* Listening Tip */}
              <div className="bg-amber-950/20 border border-amber-900/30 p-3.5 rounded-xl text-xs text-amber-200/90 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300">Mẹo nghe quen tai: </span>
                  <span>{currentItem.listeningTip}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Câu tiếp theo →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
