import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import {
  Volume2,
  Headphones,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  MessageCircle,
  Users,
  Lightbulb,
  Zap,
  ArrowRight,
  Check,
  RotateCcw,
} from 'lucide-react';

interface TameguchiScenario {
  id: string;
  context: string;
  relationship: string;
  formalTeinei: string;
  tameguchiNatural: string;
  nuanceExplanation: string;
  keyGrammarParticles: string[];
  audioPlaybackSpeed: number;
  quiz: {
    prompt: string;
    targetContext: string;
    options: string[];
    correctIndex: number;
    feedback: string;
  };
}

const INITIAL_TAMEGUCHI: TameguchiScenario[] = [
  {
    id: 'tame_1',
    context: 'Rủ bạn cùng lớp đi ăn trưa sau giờ học',
    relationship: 'Bạn cùng lớp đại học / đồng nghiệp cùng lứa (同期)',
    formalTeinei: 'これから学食へお昼ご飯を食べに行きませんか。',
    tameguchiNatural: 'ねぇ、これから学食行かない？お腹すかない？',
    nuanceExplanation: 'Bỏ trợ từ へ, đổi đuôi rủ rê 〜ませんか thành 〜ない？ lên giọng nhẹ cuối câu. Thêm từ gọi mở đầu "ねぇ".',
    keyGrammarParticles: ['ねぇ (từ gọi)', '〜行かない？ (lên giọng rủ)', 'お腹すかない？'],
    audioPlaybackSpeed: 1.0,
    quiz: {
      prompt: 'Bạn muốn hỏi bạn thân xem tối nay có rảnh không để cùng đi xem phim:',
      targetContext: 'Chuyển "今晩お暇ですか。映画を見に行きませんか。" sang Tameguchi tự nhiên:',
      options: [
        '今晩暇ですか？映画見に行かないですか？',
        '今晩ひま？映画見に行かない？',
        '今晩暇でございますか？映画へ行きましょう。',
        '今晩は暇じゃないですか？映画を見ることです。',
      ],
      correctIndex: 1,
      feedback: 'Trong Tameguchi, tính từ bỏ です lên giọng (ひま？), và rủ rê dùng thể phủ định ngắn (行かない？).',
    },
  },
  {
    id: 'tame_2',
    context: 'Xác nhận lại chuyện đã quên mất hạn nộp báo cáo',
    relationship: 'Bạn học nhóm thân thiết',
    formalTeinei: 'レポートの締め切りは、明日でしたでしょうか。',
    tameguchiNatural: 'ね、レポートの締め切りって明日だっけ？',
    nuanceExplanation: 'Dùng 〜って thay cho trợ từ は, và đuôi 〜だっけ để xác nhận lại chuyện trong quá khứ mình chợt quên.',
    keyGrammarParticles: ['〜って (nhấn mạnh chủ đề thay は)', '〜だっけ？ (xác nhận trí nhớ)'],
    audioPlaybackSpeed: 1.05,
    quiz: {
      prompt: 'Hỏi bạn thân xem quán cà phê hôm nọ tên là gì:',
      targetContext: 'Chuyển "あのカフェの名前は何でしたでしょうか。" sang Tameguchi:',
      options: [
        'あのカフェの名前は何でしたっけ？',
        'あのカフェの名前って何だっけ？',
        'あのカフェの名前は何でしょうか？',
        'あのカフェの名前は何なのかしら？',
      ],
      correctIndex: 1,
      feedback: 'Cụm "名前って何だっけ？" là khẩu ngữ cực chuẩn giữa bạn bè khi quên tên một địa điểm.',
    },
  },
  {
    id: 'tame_3',
    context: 'Khuyên bạn bè nên nghỉ ngơi khi thấy bạn làm việc quá sức',
    relationship: 'Bạn thân / Đồng nghiệp thân thiết',
    formalTeinei: '顔色が悪いですから、今日は早く帰って休んだほうがいいですよ。',
    tameguchiNatural: '顔色やばいよ！今日はもう早く帰って休みなよ。',
    nuanceExplanation: 'Dùng やばい thay cho 顔色が悪い, và kết thúc bằng 〜なよ (cách khuyên nhủ dịu dàng, thân thiết hơn 〜ほうがいい).',
    keyGrammarParticles: ['やばいよ (từ cảm thán đời sống)', '〜なよ (khuyên nhủ thân mật)'],
    audioPlaybackSpeed: 1.0,
    quiz: {
      prompt: 'Khuyên bạn đừng cố quá sức kẻo ốm:',
      targetContext: 'Cách nói thân mật tự nhiên của "無理をしないでください":',
      options: [
        '無理しないでね！',
        '無理をなされないでください。',
        '無理はダメです。',
        '無理しないことでしょう。',
      ],
      correctIndex: 0,
      feedback: 'Dạng phủ định ngắn + ね (無理しないでね) vừa ấm áp vừa chuẩn khẩu ngữ bạn bè.',
    },
  },
];

const EXTRA_TAMEGUCHI: TameguchiScenario[] = [
  {
    id: 'tame_extra_1',
    context: 'Bày tỏ sự đồng tình mạnh mẽ và ngạc nhiên trước một tin đồn',
    relationship: 'Bạn thân cùng lớp',
    formalTeinei: '本当にそうですね。信じられません。',
    tameguchiNatural: 'それな！まじで信じらんないんだけど！',
    nuanceExplanation: '「それな！」 là từ lóng thần thánh của giới trẻ biểu thị sự đồng cảm 100%. 信じられない được nuốt âm thành 信じらんない.',
    keyGrammarParticles: ['それな！ (đồng cảm tuyệt đối)', 'まじで (thực sự)', '信じらんない (nuốt âm)'],
    audioPlaybackSpeed: 1.1,
    quiz: {
      prompt: 'Bạn muốn đồng tình ngay lập tức với ý kiến của bạn thân:',
      targetContext: 'Cách người trẻ Tokyo đồng cảm "Tôi cũng nghĩ y hệt như bạn!":',
      options: ['私にとっても同じです。', 'それな！', 'その通りでございます。', '賛成いたします。'],
      correctIndex: 1,
      feedback: '「それな！」 là câu cửa miệng số 1 của người bản xứ khi muốn nói "Chuẩn luôn / Tao cũng thấy thế!".',
    },
  },
  {
    id: 'tame_extra_2',
    context: 'Hỏi bạn đang làm gì đấy qua tin nhắn LINE',
    relationship: 'Bạn bè thân / Người yêu',
    formalTeinei: '今何をしているところですか。',
    tameguchiNatural: '今何してんのー？暇してたら通話しない？',
    nuanceExplanation: 'している được rút gọn thành してんの. Thêm đuôi kéo dài ー mang lại cảm giác gần gũi trên mạng xã hội.',
    keyGrammarParticles: ['〜てんの？ (rút gọn của 〜ているの？)', '暇してたら (nếu rảnh)'],
    audioPlaybackSpeed: 1.0,
    quiz: {
      prompt: 'Nhắn tin hỏi bạn đang ăn cơm ở đâu:',
      targetContext: 'Cách nhắn ngắn gọn tự nhiên nhất:',
      options: [
        'どこで食べていますか？',
        'どこで食べてんの？',
        'いずこで食事中でしょうか？',
        'どこで食べるのですか？',
      ],
      correctIndex: 1,
      feedback: 'Rút gọn 〜てんの？ là âm thanh tự nhiên nhất mà người Nhật dùng hàng ngày trên LINE/Instagram.',
    },
  },
  {
    id: 'tame_extra_3',
    context: 'Trấn an bạn khi thấy bạn lo lắng về bài thuyết trình',
    relationship: 'Bạn cùng nhóm thuyết trình',
    formalTeinei: '絶対に大丈夫ですから、心配しないでください。',
    tameguchiNatural: '大丈夫、絶対いけるって！あんだけ練習したんだから！',
    nuanceExplanation: 'Dùng 〜って để khẳng định truyền niềm tin, và rút gọn あんなに thành あんだけ để nhấn mạnh công sức.',
    keyGrammarParticles: ['絶対いけるって！ (chắc chắn làm được mà)', 'あんだけ (ngần ấy công sức)'],
    audioPlaybackSpeed: 1.05,
    quiz: {
      prompt: 'Cổ vũ bạn thi đậu phỏng vấn:',
      targetContext: 'Cách cổ vũ thân mật mang tính khích lệ cao:',
      options: [
        '受かるといいですね。',
        '絶対いけるって！自信持って！',
        '合格することを祈念いたします。',
        '頑張ってください。',
      ],
      correctIndex: 1,
      feedback: '「絶対いけるって！」 là lời động viên số 1 mang tính đồng đội khắng khít.',
    },
  },
  {
    id: 'tame_extra_4',
    context: 'Hỏi bạn có biết quán trà sữa mới mở gần ga không',
    relationship: 'Bạn gái thân',
    formalTeinei: '駅前に新しくできたタピオカ屋を知っていますか。',
    tameguchiNatural: '駅前に新しくできたカフェ、知ってる？もう行った？',
    nuanceExplanation: '知っていますか chuyển thành 知ってる？ (bỏ い và trợ từ を), lên giọng cao ở cuối.',
    keyGrammarParticles: ['知ってる？ (rút gọn của 知っていますか)', 'もう行った？'],
    audioPlaybackSpeed: 1.0,
    quiz: {
      prompt: 'Hỏi bạn đã xem tập anime mới ra tối qua chưa:',
      targetContext: 'Cách hỏi bạn bè tự nhiên:',
      options: [
        '昨日のアニメ見ましたか？',
        '昨日のアニメもう見た？',
        '昨夜のアニメをご覧になりましたか？',
        '昨日のアニメを見るべきでしたか？',
      ],
      correctIndex: 1,
      feedback: '「もう見た？」 là câu hỏi chuẩn xác, nhanh và gãy gọn.',
    },
  },
  {
    id: 'tame_extra_5',
    context: 'Từ chối lời rủ đi chơi một cách khéo léo vì đã có hẹn trước',
    relationship: 'Bạn học cùng câu lạc bộ',
    formalTeinei: 'せっかく誘っていただいたのに申し訳ありませんが、先約があります。',
    tameguchiNatural: 'あー誘ってくれてありがと！でもその日、先約入っちゃってて…また誘って！',
    nuanceExplanation: 'Cảm ơn trước (誘ってくれてありがと), dùng 入っちゃってて (lỡ có hẹn mất rồi), và hẹn dịp sau (また誘って!).',
    keyGrammarParticles: ['〜てくれてありがと', '入っちゃってて (lỡ vướng hẹn)', 'また誘って！'],
    audioPlaybackSpeed: 1.0,
    quiz: {
      prompt: 'Từ chối lời rủ uống cà phê mà vẫn giữ được tình bạn khăng khít:',
      targetContext: 'Cách trả lời chuẩn mực thân mật:',
      options: [
        '行きません。用事があります。',
        'あーごめん！今日バイト入ってて無理なんだ…また今度声かけて！',
        'ご遠慮申し上げます。',
        '無理です。お断りします。',
      ],
      correctIndex: 1,
      feedback: 'Cấu trúc "Xin lỗi + Lý do bận + Hẹn dịp tới" là công thức vàng giữ gìn tình bạn của người Nhật.',
    },
  },
];

interface Props {
  currentLevel: JLPTLevel;
}

export const TameguchiReflexLab: React.FC<Props> = ({ currentLevel }) => {
  const [scenarios, setScenarios] = useState<TameguchiScenario[]>(INITIAL_TAMEGUCHI);
  const [loadBatchCount, setLoadBatchCount] = useState<number>(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(INITIAL_TAMEGUCHI[0].id);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleLoadMore = () => {
    const nextBatchNum = loadBatchCount + 1;
    const startIndex = ((nextBatchNum - 1) * 5) % EXTRA_TAMEGUCHI.length;
    let batch = EXTRA_TAMEGUCHI.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_TAMEGUCHI.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextBatchNum}_${idx}`,
    }));

    setScenarios((prev) => [...prev, ...uniqueBatch]);
    setLoadBatchCount(nextBatchNum);
    setNotice(`Đã nạp thêm 5 tình huống phản xạ Tameguchi đợt ${nextBatchNum}! (Tổng hiện có: ${scenarios.length + uniqueBatch.length} bài)`);
    speechService.playSuccessSound();
    setTimeout(() => setNotice(null), 4000);
  };

  const currentScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-10">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c132c] via-[#091024] to-[#060a16] border border-blue-600/30 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="text-blue-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Headphones className="w-4 h-4" />
                Phân Hệ 3 (PH3) · Lab Nghe Nói & Phản Xạ Thực Chiến
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-jp">タメ口・親友会話リフレックス</span>
              <span className="text-slate-600">·</span>
              <span className="text-cyan-400 font-semibold">Chuyển hóa tiếng Nhật robot sang giọng nói tự nhiên</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Phòng Luyện Nghe Phản Xạ Tiếng Nhật Thân Mật{' '}
              <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
                (Tameguchi & Peer Reflex Lab)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Thoát khỏi cách nói cứng nhắc kiểu sách giáo khoa: Luyện nghe và phản xạ trơn tru tiếng Nhật thân mật Tameguchi giữa bạn bè, người yêu, đồng nghiệp cùng lứa (同期) với đầy đủ trợ từ tình thái (じゃん, っけ, てんの, それな!).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-xl border border-dashed border-blue-500/60 bg-blue-950/30 hover:bg-blue-950/60 text-blue-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-blue-400"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              <span>+5 Tải thêm tình huống Tameguchi</span>
              {loadBatchCount > 0 && (
                <span className="text-[10px] bg-blue-500 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
                  +{loadBatchCount * 5}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      {notice && (
        <div className="bg-emerald-950/60 border border-emerald-700/60 text-emerald-200 text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-emerald-400 hover:text-white cursor-pointer text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Ribbon Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {scenarios.map((sc, idx) => {
          const isSelected = sc.id === selectedScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioId(sc.id);
                setUserChoice(null);
                setShowResult(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 text-left ${
                isSelected
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md shadow-blue-950/50'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate max-w-[180px]">Bài #{idx + 1}: {sc.context}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Contrast & Audio Simulation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Formal vs Tameguchi Contrast */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/40 uppercase font-bold">
                  Quan hệ: {currentScenario.relationship}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-1.5">
                  Bối cảnh: {currentScenario.context}
                </h2>
              </div>

              <button
                onClick={() => speechService.speak(currentScenario.tameguchiNatural, currentScenario.audioPlaybackSpeed)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-900/40 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe giọng thật</span>
              </button>
            </div>

            {/* Teineigo vs Tameguchi Comparison Box */}
            <div className="space-y-3">
              {/* Box 1: Teineigo */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  Cách nói sách vở chuẩn mực (丁寧語 / Khá cứng nhắc với bạn thân):
                </span>
                <p className="text-sm font-jp text-slate-300">{currentScenario.formalTeinei}</p>
              </div>

              {/* Box 2: Tameguchi Natural */}
              <div className="bg-blue-950/30 p-4 rounded-xl border border-blue-500/50 space-y-2 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-blue-400 uppercase font-bold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    Khẩu ngữ Tameguchi tự nhiên bản xứ (タメ口):
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Tốc độ {currentScenario.audioPlaybackSpeed}x</span>
                </div>
                <p className="text-base sm:text-lg font-jp font-bold text-amber-300 leading-relaxed">
                  "{currentScenario.tameguchiNatural}"
                </p>
              </div>
            </div>

            {/* Grammar Nuance */}
            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Bí quyết chuyển hóa ngữ điệu & hạt ngữ pháp:</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentScenario.nuanceExplanation}</p>

              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {currentScenario.keyGrammarParticles.map((pt, pIdx) => (
                  <span
                    key={pIdx}
                    className="text-[11px] font-jp font-bold bg-slate-950 px-2.5 py-0.5 rounded text-blue-300 border border-slate-800"
                  >
                    {pt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Peer Conversation Quiz */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1427] border border-blue-700/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Thử Thách Phản Xạ Tameguchi
                </h3>
              </div>
              <span className="text-xs font-mono text-blue-400 font-bold">Điểm: {score}</span>
            </div>

            <p className="text-xs text-slate-300">
              Chọn câu nói tự nhiên nhất để đối đáp với bạn bè trong tình huống sau:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs sm:text-sm font-sans font-bold text-white leading-relaxed bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                {currentScenario.quiz.prompt}
              </div>
              <div className="text-[11px] text-blue-300 italic bg-blue-950/40 p-2 rounded border border-blue-900/40">
                Yêu cầu: {currentScenario.quiz.targetContext}
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {currentScenario.quiz.options.map((opt, oIdx) => {
                  const isChosen = userChoice === oIdx;
                  const isCorrect = oIdx === currentScenario.quiz.correctIndex;

                  let btnStyle = 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800';
                  if (showResult) {
                    if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                    else if (isChosen) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                    else btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-50';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={showResult}
                      onClick={() => {
                        setUserChoice(oIdx);
                        setShowResult(true);
                        if (isCorrect) {
                          setScore((prev) => prev + 10);
                          speechService.playSuccessSound();
                        }
                      }}
                      className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-jp text-left transition-all cursor-pointer flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="font-mono text-slate-400 shrink-0 mt-0.5">[{oIdx + 1}]</span>
                      <span className="flex-1 leading-snug">{opt}</span>
                      {showResult && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                      {showResult && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {showResult && (
                <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                  <div
                    className={`text-xs font-bold flex items-center gap-1.5 ${
                      userChoice === currentScenario.quiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {userChoice === currentScenario.quiz.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Phản xạ cực kỳ tự nhiên! (+10 điểm)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Chưa đúng âm điệu bạn bè! Xem giải mã:</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    {currentScenario.quiz.feedback}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
