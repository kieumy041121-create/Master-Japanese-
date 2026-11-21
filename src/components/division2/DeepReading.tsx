import React, { useState, useEffect } from 'react';
import { DeepReadingItem, JLPTLevel } from '../../types';
import { initialDeepReadingsList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { BookOpen, RefreshCw, Eye, EyeOff, Sparkles, Layers, Volume2, History, ChevronLeft, ChevronRight, Plus, HelpCircle, CheckCircle2 } from 'lucide-react';
import { historyService, HistoryItem } from '../../services/historyService';

interface DeepReadingProps {
  currentLevel: JLPTLevel;
}

export const DeepReading: React.FC<DeepReadingProps> = ({ currentLevel }) => {
  const [readingList, setReadingList] = useState<DeepReadingItem[]>(initialDeepReadingsList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [readingLevel, setReadingLevel] = useState<JLPTLevel>(currentLevel);
  const [readingHistory, setReadingHistory] = useState<HistoryItem[]>(() => historyService.getHistory('reading'));

  const currentArticle = readingList[currentIndex % readingList.length];
  const activeBreakdown = currentArticle.sentenceBreakdown[selectedSentenceIndex] || currentArticle.sentenceBreakdown[0];

  // Stepper handlers
  const handlePrevArticle = () => {
    setCurrentIndex((prev) => (prev - 1 + readingList.length) % readingList.length);
    setSelectedSentenceIndex(0);
    speechService.playSuccessSound();
  };

  const handleNextArticle = () => {
    setCurrentIndex((prev) => (prev + 1) % readingList.length);
    setSelectedSentenceIndex(0);
    speechService.playSuccessSound();
  };

  // Track viewed article in history
  useEffect(() => {
    if (currentArticle) {
      const updated = historyService.addItem('reading', {
        id: currentArticle.id,
        title: currentArticle.title,
        subtitle: currentArticle.translation?.slice(0, 40) + '...',
        level: currentArticle.level,
      });
      setReadingHistory(updated);
    }
  }, [currentArticle?.id]);

  // Infinite load additional reading passages: Loads 5 items each time (mỗi lần tải thêm 5 cái)
  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 5 bài đọc hiểu phân cấp tiếng Nhật trình độ ${readingLevel} (chủ đề công nghệ AI, kinh tế, văn hóa công sở Nhật Bản).
Mỗi bài kèm furigana, bản dịch nghĩa, bóc tách câu (S, P, modifiers, particles) và 1 bài tập trắc nghiệm đọc hiểu với bẫy logic JEES và mẹo dò tìm thông tin.
Định dạng JSON thuần là một mảng gồm 5 phần tử DeepReadingItem:
[
  {
    "id": "dr_${Date.now()}_1",
    "title": "tiêu đề bài đọc",
    "level": "${readingLevel}",
    "textWithFurigana": [{ "text": "漢字", "ruby": "かんじ" }],
    "plainText": "văn bản thuần",
    "translation": "bản dịch tiếng Việt",
    "sentenceBreakdown": [
      {
        "sentence": "câu tiếng Nhật",
        "subject": "chủ ngữ",
        "predicate": "vị ngữ",
        "modifiers": "thành phần phụ",
        "particlesExplanation": "giải thích trợ từ",
        "detailedTranslation": "dịch chi tiết"
      }
    ],
    "quiz": {
      "id": "qdr_${Date.now()}_1",
      "question": "câu hỏi trắc nghiệm",
      "options": [
        { "id": "a", "text": "đáp án 1", "isCorrect": true },
        { "id": "b", "text": "đáp án 2", "isCorrect": false },
        { "id": "c", "text": "đáp án 3", "isCorrect": false },
        { "id": "d", "text": "đáp án 4", "isCorrect": false }
      ],
      "correctExplanation": "lời giải",
      "trapAnalysis": "bẫy tư duy",
      "mnemonicTip": "mẹo scan"
    }
  }
]
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = safeExtractJson<DeepReadingItem[] | null>(res, null);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.filter((it) => it && it.title).slice(0, 5);
        if (valid5.length > 0) {
          setReadingList((prev) => [...valid5, ...prev]);
          setCurrentIndex(0);
          setSelectedSentenceIndex(0);
          speechService.playSuccessSound();
          return;
        }
      }
      throw new Error('Fallback 5 articles');
    } catch {
      // 5 High-Yield Fallback Readings
      const topics = [
        { title: '日本のロボット技術と介護現場', text: '日本では人手不足を補うため、介護ロボットの導入が進んでいる。', trans: 'Tại Nhật Bản, để bù đắp sự thiếu hụt nhân lực, việc áp dụng robot chăm sóc điều dưỡng đang được đẩy mạnh.' },
        { title: 'テレワーク普及による働き方の変化', text: 'デジタル化に伴い、通勤ラッシュの緩和と地方移住への関心が高まっている。', trans: 'Cùng với số hóa, tình trạng chen chúc giờ cao điểm giảm bớt và sự quan tâm đến việc chuyển về sống tại các địa phương tăng cao.' },
        { title: '伝統工芸の継承と次世代イノベーション', text: '伝統の技法に現代のデザインを取り入れることで、海外市場での需要を開拓している。', trans: 'Bằng cách đưa thiết kế hiện đại vào kỹ thuật thủ công truyền thống, họ đang khai phá nhu cầu tại thị trường nước ngoài.' },
        { title: '循環型社会を目指す企業のSDGs戦略', text: '廃棄物を資源として再利用するサーキュラーエコノミーが世界的な潮流となっている。', trans: 'Kinh tế tuần hoàn tái sử dụng rác thải làm tài nguyên đang trở thành xu hướng chủ đạo toàn cầu.' },
        { title: 'AIと共存する未来の教育モデル', text: '暗記中心の学習から、論理的思考力と創造性を育む実践的な教育へと転換が進む。', trans: 'Từ học thuộc lòng ghi nhớ máy móc, giáo dục đang chuyển trọng tâm sang rèn luyện tư duy logic và tính sáng tạo thực tế.' }
      ];

      const fiveReadings: DeepReadingItem[] = topics.map((top, idx) => ({
        id: `dr_inf_${Date.now()}_${idx + 1}`,
        title: top.title,
        level: readingLevel,
        textWithFurigana: [{ text: top.text }],
        plainText: top.text,
        translation: top.trans,
        sentenceBreakdown: [
          {
            sentence: top.text,
            subject: 'Chủ thể chính trong mệnh đề',
            predicate: 'Động từ chính vị ngữ',
            modifiers: 'Các trạng từ và bổ ngữ chỉ nguyên nhân, mục đích',
            particlesExplanation: 'Phân tích trợ từ cốt lõi trong câu',
            detailedTranslation: top.trans,
          },
        ],
        quiz: {
          id: `qdr_inf_${Date.now()}_${idx + 1}`,
          question: `Trọng tâm cốt lõi của bài đọc [${top.title}] là gì?`,
          options: [
            { id: 'a', text: top.trans, isCorrect: true },
            { id: 'b', text: 'Nội dung phụ không liên quan đến đề tài chính.', isCorrect: false },
            { id: 'c', text: 'Thông tin phủ định hoàn toàn bối cảnh bài viết.', isCorrect: false },
            { id: 'd', text: 'Chi tiết bên lề chỉ xuất hiện thoáng qua.', isCorrect: false },
          ],
          correctExplanation: 'Đáp án chuẩn bám sát toàn diện thông điệp trung tâm của bài viết.',
          trapAnalysis: 'Bẫy đọc lướt: Chú ý không nhầm lẫn giữa chi tiết ví dụ minh họa và luận điểm trung tâm.',
          mnemonicTip: 'Mẹo dò tìm: Luôn tìm câu mở đầu hoặc kết luận của đoạn văn để chốt ý chính.',
        },
      }));

      setReadingList((prev) => [...fiveReadings, ...prev]);
      setCurrentIndex(0);
      setSelectedSentenceIndex(0);
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>Đọc hiểu Phân cấp & Bóc tách Cấu trúc Vô hạn</span>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
              S-V-O & Phân tích Trợ từ
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Điều chỉnh linh hoạt cấp độ (N5-N1), bật tắt Furigana, mổ xẻ ngữ pháp chủ vị từng câu văn.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Furigana Toggle */}
          <button
            onClick={() => setShowFurigana(!showFurigana)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
              showFurigana
                ? 'bg-indigo-950/70 border-indigo-700/60 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {showFurigana ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showFurigana ? 'Furigana BẬT' : 'Furigana TẮT'}</span>
          </button>

          {/* Level Switcher */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setReadingLevel(lvl)}
                className={`px-2 py-1 rounded font-medium transition-colors cursor-pointer ${
                  readingLevel === lvl
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải thêm 5 bài đọc hiểu mới mỗi lần bấm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải thêm (+5 bài đọc)</span>
          </button>
        </div>
      </div>

      {/* Lịch sử bài đọc đã xem */}
      {readingHistory.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 text-indigo-400 shrink-0 font-semibold">
            <History className="w-3.5 h-3.5" />
            <span>Bài đã xem ({readingHistory.length}):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-0.5">
            {readingHistory.slice(0, 10).map((h) => {
              const articleIdx = readingList.findIndex((a) => a.id === h.id);
              return (
                <button
                  key={h.id}
                  onClick={() => {
                    if (articleIdx >= 0) {
                      setCurrentIndex(articleIdx);
                      setSelectedSentenceIndex(0);
                      speechService.playSuccessSound();
                    }
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition-all shrink-0 ${
                    currentArticle.id === h.id
                      ? 'bg-indigo-600 border-indigo-400 text-white font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                  title={h.subtitle}
                >
                  <span className="truncate max-w-[150px]">{h.title}</span>
                  {h.level && <span className="text-[9px] text-slate-400">[{h.level}]</span>}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              historyService.clearHistory('reading');
              setReadingHistory([]);
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 ml-auto shrink-0 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800"
            title="Xóa lịch sử bài đọc"
          >
            Xóa
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reading Passage & Furigana */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
            {/* Top Stepper Navigation Bar: [← Bài trước] [X / Y] [Bài tiếp theo →] + [➕ Tải thêm 5 bài đọc] */}
            <div className="p-2.5 sm:p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevArticle}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Xem bài đọc trước đó"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Bài trước</span>
                </button>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-400 font-bold">
                  {(currentIndex % readingList.length) + 1} / {readingList.length}
                </div>
                <button
                  onClick={handleNextArticle}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md shadow-indigo-900/30"
                  title="Xem bài đọc tiếp theo"
                >
                  <span>Bài tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleLoadMoreInfinite}
                disabled={isLoadingMore}
                className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
                title="Tải nạp tức thì 5 bài đọc hiểu mới"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Tải thêm 5 cái</span>
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-indigo-400">Trình độ {currentArticle.level}</span>
                <h3 className="text-lg md:text-xl font-bold text-white mt-0.5">
                  {currentArticle.title}
                </h3>
              </div>
              <button
                onClick={() => speechService.speak(currentArticle.plainText)}
                className="p-2 text-slate-400 hover:text-indigo-300 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Nghe đọc bài văn"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Main Interactive Japanese Text with Furigana */}
            <div className="text-base md:text-lg font-jp leading-loose text-slate-100 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              {showFurigana ? (
                <ruby className="leading-loose">
                  {currentArticle.textWithFurigana.map((token, idx) => (
                    <React.Fragment key={idx}>
                      {token.text}
                      {token.ruby && <rt className="text-indigo-400/90 text-[10px] select-none">{token.ruby}</rt>}
                    </React.Fragment>
                  ))}
                </ruby>
              ) : (
                <div className="leading-relaxed">{currentArticle.plainText}</div>
              )}
            </div>

            {/* Vietnamese Translation Accordion */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/70 text-xs md:text-sm text-slate-300 space-y-1">
              <div className="font-semibold text-slate-400">Bản dịch đối chiếu:</div>
              <p className="leading-relaxed">{currentArticle.translation}</p>
            </div>

            {/* MỤC GIẢI THÍCH CHUYÊN SÂU & PHÂN TÍCH BẪY JEES */}
            <div className="p-4 bg-gradient-to-r from-indigo-950/40 to-slate-950 border border-indigo-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Mục giải thích chuyên sâu & Phân tích bẫy đọc hiểu JEES</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-rose-400 font-semibold flex items-center gap-1">
                    <span>⚠️ Bẫy tư duy thường gặp:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentArticle.quiz?.trapAnalysis || 'Đề thi thường bẫy bằng cách thay đổi chủ thể hành động hoặc đảo ngược quan hệ nhân quả giữa hai vế câu.'}
                  </p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-amber-300 font-semibold flex items-center gap-1">
                    <span>💡 Mẹo dò tìm thông tin nhanh:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentArticle.quiz?.mnemonicTip || 'Chú ý các liên từ nghịch đảo (しかし, だが, ところが) - 90% luận điểm của tác giả nằm ngay sau liên từ nghịch đảo.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Sentence selector for deep breakdown */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Chọn câu để AI bóc tách Chủ - Vị & Trợ từ:</span>
                <span className="text-indigo-400 font-mono">
                  {selectedSentenceIndex + 1} / {currentArticle.sentenceBreakdown.length} câu
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentArticle.sentenceBreakdown.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSentenceIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors border ${
                      selectedSentenceIndex === idx
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Câu {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Syntactic Breakdown Display (S-V-O & Particles) */}
            {activeBreakdown && (
              <div className="bg-slate-950 border border-indigo-900/40 rounded-xl p-5 space-y-3.5 animate-fadeIn">
                <div className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Bóc tách cấu trúc câu:「{activeBreakdown.sentence}」</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="text-emerald-400 font-semibold">Chủ ngữ (Subject): </span>
                    <p className="text-slate-300 mt-0.5">{activeBreakdown.subject}</p>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="text-rose-400 font-semibold">Vị ngữ (Predicate): </span>
                    <p className="text-slate-300 mt-0.5">{activeBreakdown.predicate}</p>
                  </div>
                </div>

                {activeBreakdown.modifiers && (
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
                    <span className="text-amber-300 font-semibold">Thành phần định ngữ/bổ nghĩa: </span>
                    <p className="text-slate-300 mt-0.5">{activeBreakdown.modifiers}</p>
                  </div>
                )}

                <div className="bg-indigo-950/30 p-3 rounded-lg border border-indigo-900/30 text-xs space-y-1">
                  <span className="text-indigo-300 font-semibold">Giải mã vai trò Trợ từ (助詞): </span>
                  <p className="text-slate-300 leading-relaxed">{activeBreakdown.particlesExplanation}</p>
                </div>
              </div>
            )}

            {/* Bottom Stepper Navigation Bar: [← Bài trước] [X / Y] [Bài tiếp theo →] + [➕ Tải thêm 5 cái] */}
            <div className="pt-4 border-t border-slate-800/80 p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevArticle}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Xem bài đọc trước đó"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Bài trước</span>
                </button>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-400 font-bold">
                  {(currentIndex % readingList.length) + 1} / {readingList.length}
                </div>
                <button
                  onClick={handleNextArticle}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md shadow-indigo-900/30"
                  title="Xem bài đọc tiếp theo"
                >
                  <span>Bài tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleLoadMoreInfinite}
                disabled={isLoadingMore}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
                title="Tải nạp tức thì 5 bài đọc hiểu mới"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Tải thêm 5 cái ({readingList.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Comprehension Quiz */}
        <div className="lg:col-span-5">
          <QuizCard
            quiz={currentArticle.quiz}
            title={`Trắc nghiệm đọc hiểu JLPT [${currentArticle.level}]`}
            onNext={() => {
              setCurrentIndex((prev) => (prev + 1) % readingList.length);
              setSelectedSentenceIndex(0);
            }}
          />
        </div>
      </div>
    </div>
  );
};
