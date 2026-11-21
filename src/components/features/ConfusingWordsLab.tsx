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
  HelpCircle,
  ArrowRight,
  BookOpen,
  Layers,
  Lightbulb,
  History,
  Check,
} from 'lucide-react';

export interface ConfusingWordItem {
  id: string;
  wordA: string;
  readingA: string;
  meaningA: string;
  nuanceA: string;
  exampleA: string;
  wordB: string;
  readingB: string;
  meaningB: string;
  nuanceB: string;
  exampleB: string;
  level: JLPTLevel;
  coreDifference: string;
  quizSentence: string;
  quizCorrectWord: string;
  quizExplanation: string;
}

const initialConfusingList: ConfusingWordItem[] = [
  {
    id: 'cw_1',
    wordA: '意外',
    readingA: 'いがい',
    meaningA: 'Bất ngờ, ngoài dự tính (trung tính/khách quan)',
    nuanceA: 'Dùng khi sự việc vượt ra ngoài suy nghĩ thông thường hoặc không ai lường trước.',
    exampleA: '意外な結果にみんな驚いた。(Mọi người kinh ngạc trước kết quả bất ngờ.)',
    wordB: '案外',
    readingB: 'あんがい',
    meaningB: 'Tưởng thế mà không phải thế, ngỡ là (chủ quan)',
    nuanceB: 'So sánh giữa kỳ vọng ban đầu và thực tế: Tưởng khó mà lại dễ, tưởng đắt mà lại rẻ.',
    exampleB: 'この試験は案外簡単だった。(Bài thi này ngỡ khó ai ngờ lại dễ.)',
    level: 'N2',
    coreDifference: '意外 = Hoàn toàn không ngờ tới; 案外 = Trái với phán đoán/dự tính ban đầu của bản thân.',
    quizSentence: '難しいと思っていたが、___ 早く終わった。',
    quizCorrectWord: '案外',
    quizExplanation: 'Có cụm đối lập "nghĩ là khó mà thực tế lại nhanh xong" -> dùng 案外 (trái với dự tính chủ quan).',
  },
  {
    id: 'cw_2',
    wordA: '必ず',
    readingA: 'かならず',
    meaningA: 'Chắc chắn, nhất định (quy luật khách quan / cam kết)',
    nuanceA: 'Quy luật tự nhiên (xuân qua hè tới), hoặc lời hứa/nguyên tắc bắt buộc 100%.',
    exampleA: '春になれば、必ず花が咲く。(Xuân đến thì hoa nhất định sẽ nở.)',
    wordB: 'ぜひ',
    readingB: 'ぜひ',
    meaningB: 'Nhất định, rất mong (nguyện vọng/lời mời)',
    nuanceB: 'Thể hiện ý chí chủ quan tha thiết, lời mời mọc (đi với ~たい, ~てください).',
    exampleB: 'ぜひ日本へ遊びに来てください。(Nhất định hãy ghé Nhật Bản chơi nhé.)',
    level: 'N3',
    coreDifference: '必ず đi với khẳng định quy luật / mệnh lệnh; ぜひ đi với nguyện vọng (~たい, ~てください).',
    quizSentence: '日本へ来たら、___ 私の家に寄ってください。',
    quizCorrectWord: 'ぜひ',
    quizExplanation: 'Câu có lời mời "...てください" -> bắt buộc dùng ぜひ để thể hiện lời mời tha thiết.',
  },
  {
    id: 'cw_3',
    wordA: '関心',
    readingA: 'かんしん',
    meaningA: 'Quan tâm, hứng thú (Interest)',
    nuanceA: 'Để tâm, chú ý muốn tìm hiểu về một chủ đề, lĩnh vực nào đó (đi với ~に/を持つ).',
    exampleA: '環境問題に強い関心を持っている。(Tôi có sự quan tâm sâu sắc tới vấn đề môi trường.)',
    wordB: '感心',
    readingB: 'かんしん',
    meaningB: 'Thán phục, khâm phục, ngưỡng mộ (Admiration)',
    nuanceB: 'Cảm phục trước hành động cao đẹp hoặc sự cố gắng nỗ lực của người khác.',
    exampleB: '彼の毎日の努力には感心する。(Tôi thực sự thán phục sự nỗ lực mỗi ngày của anh ấy.)',
    level: 'N2',
    coreDifference: '関心 (Bộ Môn - quan hệ) = Quan tâm tìm hiểu; 感心 (Bộ Tâm - cảm xúc) = Ngưỡng mộ, khâm phục.',
    quizSentence: '幼い子供が席を譲る姿を見て、深く ___ した。',
    quizCorrectWord: '感心',
    quizExplanation: 'Thấy em bé nhường ghế trên tàu khiến lòng ngưỡng mộ, cảm phục -> dùng 感心 (Bộ Tâm).',
  },
  {
    id: 'cw_4',
    wordA: '収める',
    readingA: 'おさめる',
    meaningA: 'Thu nạp, cất giữ, đạt được kết quả',
    nuanceA: 'Thu hoạch, đạt thắng lợi (成功を収める), hoặc cất đồ vào hộp/kho.',
    exampleA: '今回の大会で素晴らしい成果を収めた。(Đã đạt được thành quả tuyệt vời trong kỳ đại hội này.)',
    wordB: '納める',
    readingB: 'おさめる',
    meaningB: 'Nộp, đóng, giao nộp (nghĩa vụ tài chính/hàng hóa)',
    nuanceB: 'Nộp thuế (税金を納める), đóng học phí (授業料を納める), giao hàng (納品).',
    exampleB: '期限までに税金を納めなければならない。(Phải nộp thuế trước thời hạn.)',
    level: 'N1',
    coreDifference: '収める = Thu vào, gặt hái thành quả; 納める = Nộp ra, hoàn thành nghĩa vụ nộp tiền/hàng.',
    quizSentence: '今月末までに国民年金保険料を ___ ください。',
    quizCorrectWord: '納める',
    quizExplanation: 'Đóng tiền bảo hiểm lương hưu là nghĩa vụ nộp tiền -> dùng 納める.',
  },
  {
    id: 'cw_5',
    wordA: '開く',
    readingA: 'ひらく / あく',
    meaningA: 'Mở rộng ra 2 phía / Khai mạc, tổ chức',
    nuanceA: 'Mở sách, mở ô dù, mở mắt, tổ chức hội nghị (会議を開く), hoa nở.',
    exampleA: '本を開いて20ページを見てください。(Hãy mở sách xem trang 20.)',
    wordB: '開ける',
    readingB: 'あける',
    meaningB: 'Mở vật đang đóng kín (tha động từ)',
    nuanceB: 'Mở cửa sổ, mở nắp chai, mở hộp, mở khóa (tạo khe hở lưu thông).',
    exampleB: '窓を開けて部屋の空気を入れ替える。(Mở cửa sổ để đổi gió trong phòng.)',
    level: 'N4',
    coreDifference: '開く (ひらく) = Mở xòe góc độ, mở hội nghị; 開ける (あける) = Mở vật có nắp/cánh.',
    quizSentence: '来週、東京で国際会議を ___ 予定です。',
    quizCorrectWord: '開く',
    quizExplanation: 'Tổ chức hội nghị quốc tế dùng cụm cố định "会議を開く (ひらく)".',
  },
];

export const ConfusingWordsLab: React.FC<{ currentLevel: JLPTLevel }> = ({ currentLevel }) => {
  const [list, setList] = useState<ConfusingWordItem[]>(initialConfusingList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [levelFilter, setLevelFilter] = useState<JLPTLevel | 'ALL'>(currentLevel || 'ALL');
  const [history, setHistory] = useState<HistoryItem[]>(() => historyService.getHistory('vocab'));

  const filteredList = list.filter((it) => levelFilter === 'ALL' || it.level === levelFilter);
  const currentItem = filteredList[currentIndex % (filteredList.length || 1)] || list[0];

  // Record viewed item
  useEffect(() => {
    if (currentItem) {
      const updated = historyService.addItem('vocab', {
        id: currentItem.id,
        title: `${currentItem.wordA} vs ${currentItem.wordB}`,
        subtitle: currentItem.coreDifference,
        level: currentItem.level,
      });
      setHistory(updated);
    }
  }, [currentItem?.id]);

  // Load more 5 items
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const targetLvl = levelFilter === 'ALL' ? currentLevel : levelFilter;
    try {
      const prompt = `
Hãy biên soạn 5 cặp từ vựng tiếng Nhật dễ nhầm lẫn (cặp từ đồng âm khác nghĩa, hoặc từ có sắc thái tương đồng dễ dính bẫy thi) cấp độ ${targetLvl}.
Định dạng JSON thuần là một mảng gồm 5 phần tử ConfusingWordItem:
[
  {
    "id": "cw_${Date.now()}_1",
    "wordA": "Từ A",
    "readingA": "cách đọc A",
    "meaningA": "nghĩa và sắc thái A",
    "nuanceA": "chi tiết ngữ cảnh A",
    "exampleA": "ví dụ tiếng Nhật câu A kèm dịch",
    "wordB": "Từ B",
    "readingB": "cách đọc B",
    "meaningB": "nghĩa và sắc thái B",
    "nuanceB": "chi tiết ngữ cảnh B",
    "exampleB": "ví dụ tiếng Nhật câu B kèm dịch",
    "level": "${targetLvl}",
    "coreDifference": "câu chốt phân biệt cốt lõi 1 câu",
    "quizSentence": "câu hỏi điền từ có chỗ trống ___",
    "quizCorrectWord": "Từ đúng (A hoặc B)",
    "quizExplanation": "lời giải chi tiết vì sao chọn từ này"
  }
]
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = safeExtractJson<ConfusingWordItem[] | null>(res, null);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.slice(0, 5);
        setList((prev) => [...valid5, ...prev]);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
        speechService.playSuccessSound();
      } else {
        throw new Error('Dữ liệu không hợp lệ');
      }
    } catch {
      // Fallback 5 items
      const newFive: ConfusingWordItem[] = [
        {
          id: `cw_fallback_${Date.now()}_1`,
          wordA: 'おそらく',
          readingA: 'おそらく',
          meaningA: 'Có lẽ, e rằng (xác suất cao ~80%, thường có nỗi lo)',
          nuanceA: 'Suy đoán khách quan dựa trên căn cứ, hay đi với mẫu ~だろう / ~に違いない.',
          exampleA: 'おそらく明日は雨が降るだろう。(Có lẽ ngày mai trời sẽ mưa.)',
          wordB: 'たぶん',
          readingB: 'たぶん',
          meaningB: 'Có lẽ (văn nói thông thường ~50-60%)',
          nuanceB: 'Dự đoán thông tục trong giao tiếp hàng ngày không cần căn cứ sâu.',
          exampleB: 'たぶん彼は来ないと思う。(Có lẽ anh ấy không đến đâu.)',
          level: 'N2',
          coreDifference: 'おそらく = Trang trọng, độ chắc chắn cao hơn, hay đi kèm lo ngại; たぶん = Giao tiếp tự nhiên.',
          quizSentence: '空が急に暗くなってきた。___ 嵐が来るだろう。',
          quizCorrectWord: 'おそらく',
          quizExplanation: 'Có hiện tượng mây đen cụ thể và có đuôi "~だろう" trang trọng -> dùng おそらく.',
        },
        {
          id: `cw_fallback_${Date.now()}_2`,
          wordA: '訪ねる',
          readingA: 'たずねる',
          meaningA: 'Thăm, ghé thăm (người hoặc địa điểm)',
          nuanceA: 'Đến tận nơi gặp ai đó hoặc du lịch danh lam thắng cảnh.',
          exampleA: '恩師の家を訪ねて近況を報告した。(Tôi đến thăm nhà thầy giáo cũ báo cáo tình hình.)',
          wordB: '尋ねる',
          readingB: 'たずねる',
          meaningB: 'Hỏi thăm, tra cứu, chất vấn',
          nuanceB: 'Đưa ra câu hỏi về đường đi, thông tin, nguyên nhân (Hán tự TẦM có bộ Khẩu).',
          exampleB: '交番で駅への道を尋ねた。(Tôi ghé đồn cảnh sát hỏi đường đến nhà ga.)',
          level: 'N3',
          coreDifference: '訪ねる (Phóng) = Đến thăm nơi chốn/người; 尋ねる (Tầm - có bộ Khẩu 口) = Mở miệng hỏi thông tin.',
          quizSentence: '道に迷ったので、通りかかりの人に道を ___ た。',
          quizCorrectWord: '尋ねる',
          quizExplanation: 'Hỏi đường người đi qua (dùng lời nói để hỏi) -> dùng chữ TẦM 尋ねる.',
        },
        {
          id: `cw_fallback_${Date.now()}_3`,
          wordA: '効く',
          readingA: 'きく',
          meaningA: 'Có tác dụng, có hiệu lực, phát huy tính năng',
          nuanceA: 'Thuốc phát huy tác dụng (薬が効く), phanh xe ăn (ブレーキが効く).',
          exampleA: 'この風邪薬は本当によく効く。(Thuốc cảm này thực sự rất hiệu nghiệm.)',
          wordB: '利く',
          readingB: 'きく',
          meaningB: 'Khéo léo, linh hoạt, xoay xở tốt',
          nuanceB: 'Khả năng cơ thể hoặc sự linh hoạt (口が利く - khéo ăn nói, 機転が利く - nhanh trí).',
          exampleB: '彼はどんな状況でも機転が利く。(Anh ấy trong tình huống nào cũng ứng biến nhanh trí.)',
          level: 'N1',
          coreDifference: '効く (Hiệu) = Tác dụng của thuốc/chức năng; 利く (Lợi) = Năng lực, sự nhạy bén, khéo léo.',
          quizSentence: '頭痛がひどいので、早く薬が ___ ほしい。',
          quizCorrectWord: '効く',
          quizExplanation: 'Thuốc giảm đau phát huy tác dụng dập tắt cơn đau đầu -> dùng chữ HIỆU 効く.',
        },
        {
          id: `cw_fallback_${Date.now()}_4`,
          wordA: 'あえて',
          readingA: 'あえて',
          meaningA: 'Dám, can đảm làm điều khó khăn',
          nuanceA: 'Biết trước sẽ khó khăn, nguy hiểm hoặc bị phản đối nhưng vẫn quyết tâm làm.',
          exampleA: '批判を恐れず、あえて厳しい意見を言った。(Không sợ chỉ trích, tôi dám nói thẳng ý kiến khắt khe.)',
          wordB: 'わざわざ',
          readingB: 'わざわざ',
          meaningB: 'Cất công, nhọc công',
          nuanceB: 'Bỏ nhiều công sức, thời gian đặc biệt để làm việc gì đó cho người khác.',
          exampleB: 'わざわざ遠くからお越しいただき、ありがとうございます。(Cảm ơn quý khách đã cất công từ xa đến.)',
          level: 'N1',
          coreDifference: 'あえて = Dám đương đầu thử thách/rủi ro; わざわざ = Bỏ công nhọc sức làm điều chu đáo.',
          quizSentence: '危険だと分かっていたが、___ その道を選んだ。',
          quizCorrectWord: 'あえて',
          quizExplanation: 'Biết rõ nguy hiểm mà vẫn can đảm bước vào -> dùng あえて.',
        },
        {
          id: `cw_fallback_${Date.now()}_5`,
          wordA: '十分',
          readingA: 'じゅうぶん',
          meaningA: 'Đầy đủ, sung túc (về lượng hoặc chất)',
          nuanceA: 'Không còn thiếu thốn, thỏa mãn nhu cầu (十分な睡眠 - ngủ đủ giấc).',
          exampleA: '試験の準備は十分に整った。(Sự chuẩn bị cho kỳ thi đã hoàn toàn đầy đủ.)',
          wordB: '充分',
          readingB: 'じゅうぶん',
          meaningB: 'Thỏa đáng, chan chứa cảm xúc/tinh thần',
          nuanceB: 'Thiên về thỏa mãn về mặt tâm lý, cảm giác hoặc sự hài lòng (充分に楽しんだ).',
          exampleB: '休みの日を充分に満喫した。(Tôi đã tận hưởng trọn vẹn ngày nghỉ lễ.)',
          level: 'N2',
          coreDifference: '十分 = Đủ về số lượng/vật chất; 充分 = Đủ đầy về cảm xúc, tinh thần thỏa nguyện.',
          quizSentence: '栄養を ___ に摂って、体調を整えてください。',
          quizCorrectWord: '十分',
          quizExplanation: 'Hấp thụ dinh dưỡng cụ thể đo đếm được -> dùng chữ 十 trong 十分.',
        },
      ];
      setList((prev) => [...newFive, ...prev]);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSelectQuiz = (ans: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(ans);
    setIsAnswerSubmitted(true);
    if (ans === currentItem.quizCorrectWord) {
      speechService.playCorrectSound();
    } else {
      speechService.playIncorrectSound();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>Kho Cặp Từ & Đảo Ngữ Dễ Nhầm Lẫn JLPT</span>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
              Nuance Master N5 - N1
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Phân biệt triệt để các cặp từ đồng âm, đồng nghĩa hay dính bẫy đề thi thật · Bóc tách sắc thái và câu hỏi trắc nghiệm.
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
                  setCurrentIndex(0);
                  setSelectedAnswer(null);
                  setIsAnswerSubmitted(false);
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải nạp thêm 5 cặp từ dễ nhầm lẫn mới"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải thêm (+5 cặp từ)</span>
          </button>
        </div>
      </div>

      {/* Viewed History Bar */}
      {history.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 text-indigo-400 shrink-0 font-semibold">
            <History className="w-3.5 h-3.5" />
            <span>Đã xem ({history.length}):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-0.5">
            {history.slice(0, 10).map((h) => {
              const matchedIdx = list.findIndex((it) => it.id === h.id);
              return (
                <button
                  key={h.id}
                  onClick={() => {
                    if (matchedIdx >= 0) {
                      setCurrentIndex(matchedIdx);
                      setSelectedAnswer(null);
                      setIsAnswerSubmitted(false);
                      speechService.playSuccessSound();
                    }
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition-all shrink-0 ${
                    currentItem.id === h.id
                      ? 'bg-amber-600 border-amber-400 text-white font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                  title={h.subtitle}
                >
                  <span className="font-jp font-bold text-amber-200">{h.title}</span>
                  {h.level && <span className="text-[9px] text-slate-400">[{h.level}]</span>}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              historyService.clearHistory('vocab');
              setHistory([]);
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 ml-auto shrink-0 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800"
            title="Xóa lịch sử"
          >
            Xóa
          </button>
        </div>
      )}

      {/* Main Comparison Card Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        {/* Word A Card */}
        <div className="bg-slate-900/90 border-2 border-indigo-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold bg-indigo-950/80 px-2.5 py-0.5 rounded border border-indigo-800/50">
                Từ thứ nhất · {currentItem.level}
              </span>
              <button
                onClick={() => speechService.speak(currentItem.wordA)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Nghe phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="text-3xl font-bold font-jp text-white flex items-baseline gap-2">
                <span>{currentItem.wordA}</span>
                <span className="text-sm font-jp font-normal text-indigo-300">【{currentItem.readingA}】</span>
              </div>
              <p className="text-sm font-semibold text-slate-200 mt-1">
                {currentItem.meaningA}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
              <div className="font-bold text-indigo-300">Sắc thái bản xứ:</div>
              <p className="text-slate-300 leading-relaxed">{currentItem.nuanceA}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/30 space-y-1 text-xs">
            <div className="font-bold text-indigo-200">Ví dụ câu:</div>
            <p className="font-jp text-slate-100">{currentItem.exampleA}</p>
          </div>
        </div>

        {/* Word B Card */}
        <div className="bg-slate-900/90 border-2 border-amber-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800/50">
                Từ thứ hai · {currentItem.level}
              </span>
              <button
                onClick={() => speechService.speak(currentItem.wordB)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Nghe phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="text-3xl font-bold font-jp text-white flex items-baseline gap-2">
                <span>{currentItem.wordB}</span>
                <span className="text-sm font-jp font-normal text-amber-300">【{currentItem.readingB}】</span>
              </div>
              <p className="text-sm font-semibold text-slate-200 mt-1">
                {currentItem.meaningB}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
              <div className="font-bold text-amber-300">Sắc thái bản xứ:</div>
              <p className="text-slate-300 leading-relaxed">{currentItem.nuanceB}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 space-y-1 text-xs">
            <div className="font-bold text-amber-200">Ví dụ câu:</div>
            <p className="font-jp text-slate-100">{currentItem.exampleB}</p>
          </div>
        </div>
      </div>

      {/* Core Difference Banner */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-amber-950/40 border border-indigo-800/40 rounded-2xl p-4 text-xs md:text-sm flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300 mr-1.5">Quy tắc phân biệt 1 câu:</span>
          <span className="text-slate-200 font-medium">{currentItem.coreDifference}</span>
        </div>
      </div>

      {/* Interactive Quick Quiz */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>Thử thách phản xạ phân biệt: Điền từ chính xác</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {currentIndex + 1} / {filteredList.length} cặp
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-base md:text-lg font-jp font-semibold text-white">
          {currentItem.quizSentence}
        </div>

        {/* 2 Options Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {[currentItem.wordA, currentItem.wordB].map((opt) => {
            const isCorrect = opt === currentItem.quizCorrectWord;
            const isSelected = selectedAnswer === opt;
            let btnClass = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850';

            if (isAnswerSubmitted) {
              if (isCorrect) {
                btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
              } else if (isSelected) {
                btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
              } else {
                btnClass = 'bg-slate-950 border-slate-800 text-slate-500 opacity-50';
              }
            }

            return (
              <button
                key={opt}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectQuiz(opt)}
                className={`p-3.5 rounded-xl border text-base font-bold font-jp transition-all cursor-pointer flex items-center justify-center gap-2 ${btnClass}`}
              >
                <span>{opt}</span>
                {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next Navigation */}
        {isAnswerSubmitted && (
          <div className="p-4 rounded-xl bg-slate-950/90 border border-indigo-900/50 space-y-3 animate-fadeIn">
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-indigo-300">Giải thích chi tiết: </strong>
              {currentItem.quizExplanation}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSelectedAnswer(null);
                  setIsAnswerSubmitted(false);
                  setCurrentIndex((prev) => (prev + 1) % filteredList.length);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-md transition-all"
              >
                <span>Chuyển sang cặp từ tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
