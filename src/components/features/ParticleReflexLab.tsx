import React, { useState, useEffect } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import { historyService, HistoryItem } from '../../services/historyService';
import {
  Sparkles,
  RefreshCw,
  Volume2,
  CheckCircle2,
  XCircle,
  Timer,
  ArrowRight,
  HelpCircle,
  Zap,
  History,
  RotateCcw,
} from 'lucide-react';

export interface ParticleQuizItem {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  targetParticle: string;
  options: string[];
  level: JLPTLevel;
  translation: string;
  grammarRule: string;
  trapAnalysis: string;
}

const initialParticleList: ParticleQuizItem[] = [
  {
    id: 'pr_1',
    sentenceBefore: '田中さん',
    sentenceAfter: 'どこにいますか。',
    targetParticle: 'は',
    options: ['は', 'が', 'を', 'に'],
    level: 'N5',
    translation: 'Anh Tanaka đang ở đâu vậy?',
    grammarRule: 'Dùng「は」để nêu lên chủ đề câu hỏi (Chủ đề được đưa ra để hỏi han thông tin).',
    trapAnalysis: 'Bẫy「が」:「が」nhấn mạnh vào chính Tanaka (田中さんがいます), còn câu hỏi tìm vị trí của chủ đề dùng「は」.',
  },
  {
    id: 'pr_2',
    sentenceBefore: '図書館',
    sentenceAfter: '本を借りました。',
    targetParticle: 'で',
    options: ['で', 'に', 'へ', 'を'],
    level: 'N5',
    translation: 'Tôi đã mượn sách ở thư viện.',
    grammarRule: 'Dùng「で」chỉ địa điểm diễn ra hành động tích cực (mượn sách là hành động phát sinh).',
    trapAnalysis: 'Bẫy「に」:「に」chỉ dùng cho địa điểm tồn tại (ある/いる) hoặc đích đến của sự chuyển dời/gửi gắm.',
  },
  {
    id: 'pr_3',
    sentenceBefore: '友達',
    sentenceAfter: 'プレゼントをあげました。',
    targetParticle: 'に',
    options: ['に', 'で', 'を', 'へ'],
    level: 'N5',
    translation: 'Tôi đã tặng quà cho bạn.',
    grammarRule: 'Dùng「に」chỉ đối tượng tiếp nhận hành động (Người nhận quà).',
    trapAnalysis: 'Bẫy「で」:「で」không chỉ người tiếp nhận hành động cho/tặng (Ageru/Kureru).',
  },
  {
    id: 'pr_4',
    sentenceBefore: '父は毎朝6時',
    sentenceAfter: '起きます。',
    targetParticle: 'に',
    options: ['に', 'で', 'を', 'は'],
    level: 'N5',
    translation: 'Bố tôi thức dậy vào lúc 6 giờ mỗi sáng.',
    grammarRule: 'Dùng「に」đi sau mốc thời gian có con số cụ thể (6 giờ, ngày 15, thứ Hai).',
    trapAnalysis: 'Bẫy「で」: Mốc thời gian tuyệt đối không đi với「で」để chỉ thời điểm diễn ra.',
  },
  {
    id: 'pr_5',
    sentenceBefore: '雨',
    sentenceAfter: '降っています。',
    targetParticle: 'が',
    options: ['が', 'は', 'を', 'で'],
    level: 'N5',
    translation: 'Trời đang mưa.',
    grammarRule: 'Dùng「が」để miêu tả hiện tượng thiên nhiên hoặc sự việc đập vào mắt người nói khách quan.',
    trapAnalysis: 'Bẫy「は」: Hiện tượng tự nhiên khách quan (mưa, tuyết, hoa nở) bắt buộc dùng「が」chứ không dùng「は」.',
  },
  {
    id: 'pr_6',
    sentenceBefore: '彼女はピアノ',
    sentenceAfter: '上手に弾けます。',
    targetParticle: 'が',
    options: ['が', 'を', 'に', 'で'],
    level: 'N4',
    translation: 'Cô ấy có thể chơi đàn piano rất giỏi.',
    grammarRule: 'Thể khả năng (弾ける) tân ngữ của khả năng luôn đi với trợ từ「が」thay vì「を」.',
    trapAnalysis: 'Bẫy「を」: Trong động từ khả năng (Potential form), phần lớn trường hợp đối tượng đi với「が」.',
  },
  {
    id: 'pr_7',
    sentenceBefore: 'この道',
    sentenceAfter: 'まっすぐ歩いてください。',
    targetParticle: 'を',
    options: ['を', 'で', 'に', 'へ'],
    level: 'N4',
    translation: 'Hãy đi thẳng theo con đường này.',
    grammarRule: 'Dùng「を」đi với động từ chuyển động (歩く, 渡る, 飛ぶ) chỉ không gian mà hành động đi xuyên qua.',
    trapAnalysis: 'Bẫy「で」: Nhiều người nhầm đường là địa điểm diễn ra hành động, nhưng chuyển động xuyên qua không gian bắt buộc dùng「を」.',
  },
  {
    id: 'pr_8',
    sentenceBefore: '会議は午後2時',
    sentenceAfter: '始まります。',
    targetParticle: 'から',
    options: ['から', 'まで', 'に', 'で'],
    level: 'N4',
    translation: 'Cuộc họp sẽ bắt đầu từ lúc 2 giờ chiều.',
    grammarRule: 'Dùng「から」chỉ mốc khởi đầu của một sự kiện kéo dài.',
    trapAnalysis: 'Bẫy「に」: Nếu dùng「に」nghĩa là họp xong lúc 2h hoặc rơi trúng 2h; với động từ 始まる thì「から」chuẩn sắc thái hơn.',
  },
];

export const ParticleReflexLab: React.FC<{ currentLevel: JLPTLevel }> = ({ currentLevel }) => {
  const [questions, setQuestions] = useState<ParticleQuizItem[]>(initialParticleList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedParticle, setSelectedParticle] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(20);
  const [score, setScore] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [levelFilter, setLevelFilter] = useState<JLPTLevel | 'ALL'>(currentLevel || 'ALL');
  const [history, setHistory] = useState<HistoryItem[]>(() => historyService.getHistory('grammar'));

  const filtered = questions.filter((q) => levelFilter === 'ALL' || q.level === levelFilter);
  const currentQ = filtered[currentIndex % (filtered.length || 1)] || questions[0];

  // Countdown reflex timer
  useEffect(() => {
    if (isAnswered) return;
    if (timerSeconds <= 0) {
      setIsAnswered(true);
      speechService.playIncorrectSound();
      return;
    }
    const timer = setInterval(() => {
      setTimerSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timerSeconds, isAnswered]);

  // History tracking
  useEffect(() => {
    if (currentQ) {
      const full = `${currentQ.sentenceBefore}【${currentQ.targetParticle}】${currentQ.sentenceAfter}`;
      const updated = historyService.addItem('grammar', {
        id: currentQ.id,
        title: full,
        subtitle: currentQ.grammarRule,
        level: currentQ.level,
      });
      setHistory(updated);
    }
  }, [currentQ?.id]);

  const handleSelect = (p: string) => {
    if (isAnswered) return;
    setSelectedParticle(p);
    setIsAnswered(true);
    if (p === currentQ.targetParticle) {
      setScore((s) => s + 10);
      speechService.playCorrectSound();
    } else {
      speechService.playIncorrectSound();
    }
  };

  const handleNextQuestion = () => {
    setSelectedParticle(null);
    setIsAnswered(false);
    setTimerSeconds(20);
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };

  // Load more 5 questions
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const targetLvl = levelFilter === 'ALL' ? currentLevel : levelFilter;
    try {
      const prompt = `
Hãy sinh ra 5 câu đố trắc nghiệm phản xạ trợ từ tiếng Nhật (は, が, を, に, で, へ, と, から, まで, より, だけ, しか, ばかり) cấp độ ${targetLvl}.
Định dạng JSON thuần là một mảng 5 phần tử ParticleQuizItem:
[
  {
    "id": "pr_${Date.now()}_1",
    "sentenceBefore": "đoạn trước trợ từ",
    "sentenceAfter": "đoạn sau trợ từ",
    "targetParticle": "trợ từ chính xác",
    "options": ["trợ từ đúng", "bẫy 1", "bẫy 2", "bẫy 3"],
    "level": "${targetLvl}",
    "translation": "dịch nghĩa tiếng Việt",
    "grammarRule": "quy tắc vì sao dùng trợ từ này",
    "trapAnalysis": "phân tích bẫy các trợ từ còn lại"
  }
]
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = safeExtractJson<ParticleQuizItem[] | null>(res, null);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.slice(0, 5);
        setQuestions((prev) => [...valid5, ...prev]);
        handleNextQuestion();
        speechService.playSuccessSound();
      } else {
        throw new Error('Lỗi dữ liệu');
      }
    } catch {
      // Fallback 5 questions
      const newFive: ParticleQuizItem[] = [
        {
          id: `pr_fb_${Date.now()}_1`,
          sentenceBefore: 'バス',
          sentenceAfter: '乗って会社に通っています。',
          targetParticle: 'に',
          options: ['に', 'で', 'を', 'へ'],
          level: 'N4',
          translation: 'Tôi lên xe buýt đi làm.',
          grammarRule: 'Động từ「乗る」(leo lên xe/tàu) luôn đi với trợ từ「に」chỉ phương tiện được bước lên.',
          trapAnalysis: 'Bẫy「で」:「バスで行く」(đi bằng xe buýt) thì dùng で, nhưng「乗る」bắt buộc dùng に.',
        },
        {
          id: `pr_fb_${Date.now()}_2`,
          sentenceBefore: '部屋',
          sentenceAfter: '入るときは靴を脱いでください。',
          targetParticle: 'に',
          options: ['に', 'を', 'で', 'へ'],
          level: 'N4',
          translation: 'Khi bước vào phòng hãy cởi giày ra.',
          grammarRule: 'Đích đến của sự thâm nhập vào trong (入る) đi với「に」.',
          trapAnalysis: 'Bẫy「を」:「出る」thì đi với を (rời khỏi phòng), còn「入る」đi với に (bước vào trong).',
        },
        {
          id: `pr_fb_${Date.now()}_3`,
          sentenceBefore: '昨日、新宿で友達',
          sentenceAfter: 'ばったり会いました。',
          targetParticle: 'に',
          options: ['に', 'と', 'を', 'で'],
          level: 'N3',
          translation: 'Hôm qua tôi tình cờ chạm mặt bạn ở Shinjuku.',
          grammarRule: 'Gặp gỡ một chiều hoặc tình cờ chạm trán (ばったり会う) ưu tiên dùng「に」.',
          trapAnalysis: 'Bẫy「と」:「と会う」thường dùng khi hai người có hẹn trước cùng đến gặp nhau.',
        },
        {
          id: `pr_fb_${Date.now()}_4`,
          sentenceBefore: 'この本は世界中',
          sentenceAfter: '読まれています。',
          targetParticle: 'で',
          options: ['で', 'に', 'を', 'は'],
          level: 'N3',
          translation: 'Cuốn sách này đang được đọc trên toàn thế giới.',
          grammarRule: 'Dùng「で」chỉ phạm vi diễn ra hành động (trên phạm vi toàn thế giới).',
          trapAnalysis: 'Bẫy「に」:「世界中に」dùng khi nói sách có mặt ở khắp thế giới (広まっている), còn hành động đọc dùng「で」.',
        },
        {
          id: `pr_fb_${Date.now()}_5`,
          sentenceBefore: '彼は怒りのあまり、言葉',
          sentenceAfter: '詰まった。',
          targetParticle: 'に',
          options: ['に', 'を', 'で', 'が'],
          level: 'N1',
          translation: 'Anh ấy giận quá đến mức nghẹn lời không nói nên lời.',
          grammarRule: 'Cụm thành ngữ cố định「言葉に詰まる」(nghẹn lời, ứ đọng không thốt ra được).',
          trapAnalysis: 'Bẫy「を」: Đây là tự động từ「詰まる」chứ không phải tha động từ.',
        },
      ];
      setQuestions((prev) => [...newFive, ...prev]);
      handleNextQuestion();
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  const fullSentence = `${currentQ.sentenceBefore}${isAnswered ? `【${currentQ.targetParticle}】` : '【 ___ 】'}${currentQ.sentenceAfter}`;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>Phòng Luyện Phản Xạ Trợ Từ Siêu Tốc</span>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Speed Reflex Drill</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Đập tan nỗi sợ trợ từ は, が, に, で, を, から, まで qua các câu đố phản xạ 20s · Giải thích lý do chọn trợ từ bản xứ.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Level Filter */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs">
            {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setLevelFilter(lvl);
                  handleNextQuestion();
                }}
                className={`px-2 py-0.5 rounded cursor-pointer font-bold ${
                  levelFilter === lvl ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải nạp thêm 5 câu đố trợ từ mới"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải thêm (+5 câu luyện trợ từ)</span>
          </button>
        </div>
      </div>

      {/* History Bar */}
      {history.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 text-indigo-400 shrink-0 font-semibold">
            <History className="w-3.5 h-3.5" />
            <span>Đã luyện ({history.length}):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-0.5">
            {history.slice(0, 10).map((h) => (
              <span
                key={h.id}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 text-xs font-jp shrink-0"
              >
                <span className="font-bold text-cyan-300">{h.title}</span>
                {h.level && <span className="text-[9px] text-slate-500">[{h.level}]</span>}
              </span>
            ))}
          </div>
          <button
            onClick={() => {
              historyService.clearHistory('grammar');
              setHistory([]);
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 ml-auto shrink-0 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800"
            title="Xóa lịch sử"
          >
            Xóa
          </button>
        </div>
      )}

      {/* Reflex Game Arena */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6 max-w-3xl mx-auto">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono font-bold">
              {currentQ.level}
            </span>
            <span className="text-slate-400">Câu {currentIndex + 1} / {filtered.length}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-mono">
              <span className="text-slate-400">Điểm:</span>
              <span className="font-bold text-emerald-400 text-sm">{score}</span>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-1 font-mono">
              <Timer className={`w-4 h-4 ${timerSeconds <= 5 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`} />
              <span className={`font-bold text-sm ${timerSeconds <= 5 ? 'text-rose-400 font-black' : 'text-slate-200'}`}>
                {timerSeconds}s
              </span>
            </div>
          </div>
        </div>

        {/* Cloze Sentence Box */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#090d16] border border-slate-800 text-center space-y-4 shadow-inner">
          <div className="text-2xl md:text-3xl font-jp font-bold text-white tracking-wide leading-relaxed flex flex-wrap items-center justify-center gap-2">
            <span>{currentQ.sentenceBefore}</span>
            <span
              className={`inline-flex items-center justify-center px-4 py-1 rounded-xl text-2xl font-bold min-w-[70px] border-2 ${
                isAnswered
                  ? selectedParticle === currentQ.targetParticle
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                    : 'bg-rose-950 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                  : 'bg-slate-900 border-dashed border-cyan-500/60 text-cyan-300 animate-pulse'
              }`}
            >
              {isAnswered ? currentQ.targetParticle : '?'}
            </span>
            <span>{currentQ.sentenceAfter}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => speechService.speak(`${currentQ.sentenceBefore} ${currentQ.targetParticle} ${currentQ.sentenceAfter}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Nghe câu hoàn chỉnh</span>
            </button>
            <span className="text-xs text-slate-400 italic">
              ({currentQ.translation})
            </span>
          </div>
        </div>

        {/* 4 Particle Option Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentQ.options.map((p) => {
            const isCorrect = p === currentQ.targetParticle;
            const isSelected = selectedParticle === p;
            let cls = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500 hover:bg-cyan-950/20';

            if (isAnswered) {
              if (isCorrect) {
                cls = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-lg';
              } else if (isSelected) {
                cls = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
              } else {
                cls = 'bg-slate-950 border-slate-800 text-slate-600 opacity-40';
              }
            }

            return (
              <button
                key={p}
                disabled={isAnswered}
                onClick={() => handleSelect(p)}
                className={`py-4 rounded-xl border text-xl md:text-2xl font-jp font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${cls}`}
              >
                <span>{p}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
              </button>
            );
          })}
        </div>

        {/* Explanation & Breakdown */}
        {isAnswered && (
          <div className="p-5 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-3 animate-fadeIn text-xs">
            <div className="flex items-start gap-2 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300">Quy tắc ngữ pháp: </strong>
                {currentQ.grammarRule}
              </div>
            </div>

            <div className="flex items-start gap-2 text-slate-300">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">Phân tích bẫy tư duy: </strong>
                {currentQ.trapAnalysis}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all cursor-pointer"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
