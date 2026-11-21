import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import {
  Volume2,
  Sparkles,
  BookOpen,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  ArrowRightLeft,
  ArrowRight,
  Lightbulb,
  Zap,
  Check,
} from 'lucide-react';

interface ReversiblePair {
  id: string;
  kanjiA: string;
  readingA: string;
  hanVietA: string;
  meaningA: string;
  exampleA: string;
  kanjiB: string;
  readingB: string;
  hanVietB: string;
  meaningB: string;
  exampleB: string;
  linguisticLogic: string;
  quiz: {
    question: string;
    blankTarget: string;
    correctKanji: string;
    wrongKanji: string;
    explanation: string;
  };
}

const INITIAL_PAIRS: ReversiblePair[] = [
  {
    id: 'rev_1',
    kanjiA: '段階',
    readingA: 'だんかい (dankai)',
    hanVietA: 'ĐOẠN GIAI',
    meaningA: 'Giai đoạn, bước phát triển, thời kỳ tiến trình.',
    exampleA: 'プロジェクトは計画から実行の段階へと移行した。',
    kanjiB: '階段',
    readingB: 'かいだん (kaidan)',
    hanVietB: 'GIAI ĐOẠN',
    meaningB: 'Cầu thang bộ (bậc thang vật lý leo lên xuống).',
    exampleB: '健康のためにエレベーターを使わず階段を上る。',
    linguisticLogic: 'Chữ 階 (Giai) là bậc thang, 段 (Đoạn) là chặng chia nhỏ. Khi 段 đứng trước 階 (段階) mang nghĩa giai đoạn tiến trình; khi 階 đứng trước (階段) mang nghĩa bậc thang vật lý leo lên xuống.',
    quiz: {
      question: '新薬の開発は最終（　　）に入り、臨床試験の結果が待たれる。',
      blankTarget: 'Điền từ mang nghĩa "giai đoạn cuối cùng".',
      correctKanji: '段階',
      wrongKanji: '階段',
      explanation: 'Giai đoạn phát triển là 段階 (だんかい). 階段 (かいだん) là cầu thang leo bộ.',
    },
  },
  {
    id: 'rev_2',
    kanjiA: '科学',
    readingA: 'かがく (kagaku)',
    hanVietA: 'KHOA HỌC',
    meaningA: 'Khoa học tự nhiên, khoa học kỹ thuật, tri thức thực nghiệm.',
    exampleA: '最先端の科学技術が医療の現場を大きく変革している。',
    kanjiB: '学科',
    readingB: 'がっか (gakka)',
    hanVietB: 'HỌC KHOA',
    meaningB: 'Chuyên ngành học tập, khoa đào tạo trong trường đại học hoặc môn thi lý thuyết.',
    exampleB: '大学では工学部情報工学科を専攻した。',
    linguisticLogic: '科 (Khoa) là phân môn, 学 (Học) là nghiên cứu học thuật. 科学 là hệ thống học thuật duy lý phân khoa (Science); 学科 là phân khoa cụ thể của ngành học (Department/Subject).',
    quiz: {
      question: '運転免許の取得には、技能試験と（　　）試験の両方に合格する必要がある。',
      blankTarget: 'Điền từ mang nghĩa "môn thi lý thuyết".',
      correctKanji: '学科',
      wrongKanji: '科学',
      explanation: 'Môn thi lý thuyết/chuyên ngành là 学科試験 (がっかしけん). 科学 là khoa học tự nhiên.',
    },
  },
  {
    id: 'rev_3',
    kanjiA: '生産',
    readingA: 'せいさん (seisan)',
    hanVietA: 'SINH SẢN',
    meaningA: 'Sản xuất công nghiệp, chế tạo sản phẩm, gia công hàng hóa.',
    exampleA: '工場では新型EVバッテリーの大量生産体制が整った。',
    kanjiB: '産生',
    readingB: 'さんせい (sansei)',
    hanVietB: 'SẢN SINH',
    meaningB: 'Tạo sinh / sản sinh sinh học, cơ thể tự tiết ra hoặc vi khuẩn tổng hợp ra chất.',
    exampleB: '乳酸菌は腸内で有用な短鎖脂肪酸を産生する。',
    linguisticLogic: '生産 là sản xuất nhân tạo hàng hóa trong kinh tế công nghiệp; 産生 là thuật ngữ chuyên sâu y sinh, sinh học tế bào chỉ các phân tử hoặc kháng thể do tế bào sinh vật tự tiết ra.',
    quiz: {
      question: '半導体工場の稼働率が回復し、自動車の（　　）台数が過去最高を記録した。',
      blankTarget: 'Điền từ mang nghĩa "số lượng xe sản xuất".',
      correctKanji: '生産',
      wrongKanji: '産生',
      explanation: 'Sản xuất hàng hóa/ô tô dùng 生産 (せいさん). 産生 (さんせい) là thuật ngữ y sinh học (tế bào sản sinh kháng thể).',
    },
  },
  {
    id: 'rev_4',
    kanjiA: '現実',
    readingA: 'げんじつ (genjitsu)',
    hanVietA: 'HIỆN THỰC',
    meaningA: 'Hiện thực khách quan, thực tế cuộc sống (đối lập với mộng tưởng).',
    exampleA: '理想と現実の間には、依然として埋めがたい溝が存在する。',
    kanjiB: '実現',
    readingB: 'じつげん (jitsugen)',
    hanVietB: 'THỰC HIỆN',
    meaningB: 'Hiện thực hóa ước mơ, thực hiện kế hoạch, biến lý tưởng thành hiện thực.',
    exampleB: '幼い頃からの夢であった宇宙飛行士をついに実現させた。',
    linguisticLogic: '現実 là danh từ chỉ trạng thái thực tại khách quan; 実現 là động từ hành động biến cái vô hình thành cái hiện hữu cụ thể (thực hiện ước mơ, dự án).',
    quiz: {
      question: 'カーボンニュートラルの（　　）に向けて、各国が再生エネルギー導入を急いでいる。',
      blankTarget: 'Điền từ mang nghĩa "hiện thực hóa mục tiêu Net-Zero".',
      correctKanji: '実現',
      wrongKanji: '現実',
      explanation: 'Mục tiêu biến thành sự thật là 実現 (じつげん). 現実 là thực tại khách quan.',
    },
  },
  {
    id: 'rev_5',
    kanjiA: '平和',
    readingA: 'へいわ (heiwa)',
    hanVietA: 'BÌNH HÒA',
    meaningA: 'Hòa bình, thanh bình, không có chiến tranh xung đột (trạng thái an yên).',
    exampleA: '世界各地での紛争終結と恒久的な平和の確立を心から願う。',
    kanjiB: '和平',
    readingB: 'わへい (wahei)',
    hanVietB: 'HÒA BÌNH',
    meaningB: 'Hòa đàm, hiệp ước hòa giải, tiến trình hòa bình giữa hai quốc gia đối địch.',
    exampleB: '対立する両国が停戦協定を結び、和平交渉を開始した。',
    linguisticLogic: '平和 là trạng thái hòa bình xã hội; 和平 là thuật ngữ ngoại giao chỉ hành động đàm phán giải quyết chiến tranh (和平交渉 = đàm phán hòa bình, 和平条約 = hiệp ước hòa ước).',
    quiz: {
      question: '国際連合の仲介によって、両勢力の間で（　　）交渉のテーブルが設けられた。',
      blankTarget: 'Điền từ mang nghĩa "đàm phán hòa giải ngoại giao".',
      correctKanji: '和平',
      wrongKanji: '平和',
      explanation: 'Đàm phán hòa ước ngoại giao bắt buộc dùng 和平交渉 (わへいこうしょう). 平和 chỉ là trạng thái hòa bình chung.',
    },
  },
];

const EXTRA_PAIRS: ReversiblePair[] = [
  {
    id: 'rev_extra_1',
    kanjiA: '黄金',
    readingA: 'おうごん / こがね (ougon)',
    hanVietA: 'HOÀNG KIM',
    meaningA: 'Vàng ròng quý giá, thời kỳ hoàng kim rực rỡ.',
    exampleA: '1980年代は日本経済が世界を席巻した黄金時代であった。',
    kanjiB: '金黄',
    readingB: 'きんこう (kinkou)',
    hanVietB: 'KIM HOÀNG',
    meaningB: 'Sắc vàng óng ả của lúa chín, ánh sáng hoàng hôn vàng ánh.',
    exampleB: '秋の夕暮れ、実った稲穂が一面に金黄色の輝きを放つ。',
    linguisticLogic: '黄金 là danh từ chỉ vàng ròng hoặc thời kỳ hoàng kim; 金黄 là tính từ chỉ sắc màu vàng ánh óng ả (kim hoàng sắc).',
    quiz: {
      question: '古代エジプトのツタンカーメン王の棺は、純度の高い（　　）で作られている。',
      blankTarget: 'Điền từ chỉ vàng ròng kim loại quý.',
      correctKanji: '黄金',
      wrongKanji: '金黄',
      explanation: 'Vàng ròng kim loại quý hoặc thời kỳ hoàng kim dùng 黄金 (おうごん).',
    },
  },
  {
    id: 'rev_extra_2',
    kanjiA: '制限',
    readingA: 'せいげん (seigen)',
    hanVietA: 'CHẾ HẠN',
    meaningA: 'Hạn chế, giới hạn quy định pháp lý (tốc độ, số lượng, quyền hạn).',
    exampleA: '高速道路では安全のために最高速度が時速100キロに制限されている。',
    kanjiB: '限界',
    readingB: 'げんかい (genkai)',
    hanVietB: 'HẠN GIỚI',
    meaningB: 'Giới hạn tận cùng của năng lực, sức chịu đựng thể xác hoặc tâm lý.',
    exampleB: '連日の徹夜作業で、体力的にも精神的にも限界に達した。',
    linguisticLogic: 'Chữ 限 đứng trước hay sau thể hiện đối tượng: 制限 là quy chế rào cản nhân tạo đặt ra; 限界 là ngưỡng tới hạn tự nhiên của con người hay sự vật.',
    quiz: {
      question: 'マラソン選手は苦痛に耐え、自らの肉体の（　　）に挑み続けた。',
      blankTarget: 'Điền từ chỉ giới hạn cùng cực sức lực thể chất.',
      correctKanji: '限界',
      wrongKanji: '制限',
      explanation: 'Giới hạn ngưỡng chịu đựng bản thân là 限界 (げんかい). 制限 là hạn chế theo luật định.',
    },
  },
  {
    id: 'rev_extra_3',
    kanjiA: '運命',
    readingA: 'うんめい (unmei)',
    hanVietA: 'VẬN MỆNH',
    meaningA: 'Vận mệnh, định mệnh số phận con người do trời định.',
    exampleA: '偶然の出会いが、その後の二人の運命を大きく変えることとなった。',
    kanjiB: '命運',
    readingB: 'めいうん (meiun)',
    hanVietB: 'MỆNH VẬN',
    meaningB: 'Sự sống còn, vận số sinh tử của một tổ chức, quốc gia hoặc doanh nghiệp.',
    exampleB: '新製品の成否が、会社全体の命運を左右する重大局面に差しかかった。',
    linguisticLogic: '運命 thường dùng cho số phận cá nhân; 命運 là thành bại sinh tồn của tập thể, tập đoàn hoặc quốc gia (VD: 会社の命運をかける = đặt cược sự sống còn của công ty).',
    quiz: {
      question: '今回の大型買収案件は、グループ全体の存続と（　　）を握る一大事業だ。',
      blankTarget: 'Điền từ chỉ sự sống còn, vận số của tập đoàn.',
      correctKanji: '命運',
      wrongKanji: '運命',
      explanation: 'Vận số sống còn của công ty/tập thể dùng 命運 (めいうん). 運命 dùng cho số phận con người.',
    },
  },
  {
    id: 'rev_extra_4',
    kanjiA: '相互',
    readingA: 'そうご (sougo)',
    hanVietA: 'TƯƠNG HỖ',
    meaningA: 'Tương hỗ, qua lại hai chiều giữa các bên (hợp tác, tôn trọng, tin cậy).',
    exampleA: '異文化理解においては、お互いの価値観を相互に尊重する姿勢が不可欠だ。',
    kanjiB: '互角',
    readingB: 'ごかく (gokaku)',
    hanVietB: 'HỖ GIÁC',
    meaningB: 'Ngang tài ngang sức, cân tài cân sức không phân thắng bại trong trận đấu.',
    exampleB: '決勝戦では両チームが互角の熱戦を繰り広げ、延長戦へともつれ込んだ。',
    linguisticLogic: '相 (tương) là cùng nhau, 互 (hỗ) là qua lại lẫn nhau. 相互 là tính tương hỗ; 互角 là sừng hươu bằng nhau (ngang tài ngang sức).',
    quiz: {
      question: '日越両国の友好関係を深めるには、（　　）理解と経済交流の推進が重要である。',
      blankTarget: 'Điền từ mang nghĩa "thấu hiểu lẫn nhau hai chiều".',
      correctKanji: '相互',
      wrongKanji: '互角',
      explanation: 'Thấu hiểu lẫn nhau là 相互理解 (そうごりかい). 互角 là ngang tài ngang sức.',
    },
  },
  {
    id: 'rev_extra_5',
    kanjiA: '情熱',
    readingA: 'じょうねつ (jounetsu)',
    hanVietA: 'TÌNH NHIỆT',
    meaningA: 'Nhiệt huyết, ngọn lửa đam mê cháy bỏng trong tim.',
    exampleA: '彼は教育改革に対して誰よりも熱い情熱を注ぎ続けている。',
    kanjiB: '熱情',
    readingB: 'ねつじょう (netsujou)',
    hanVietB: 'NHIỆT TÌNH',
    meaningB: 'Tình cảm nồng nàn mãnh liệt, ngập tràn cảm xúc yêu đương hoặc sùng kính.',
    exampleB: '若き芸術家は溢れんばかりの熱情を絵筆に込めてキャンバスに向かった。',
    linguisticLogic: '情熱 nhấn mạnh vào ý chí kiên định cống hiến cho công việc, sự nghiệp; 熱情 thiên về xúc cảm dâng trào nồng nàn trong nghệ thuật hoặc tình cảm.',
    quiz: {
      question: '未知の深海生物の生態を解明するため、研究者は生涯の（　　）を傾けた。',
      blankTarget: 'Điền từ mang nghĩa cống hiến nhiệt huyết cả đời.',
      correctKanji: '情熱',
      wrongKanji: '熱情',
      explanation: 'Dồn hết nhiệt huyết cho sự nghiệp dùng 情熱を傾ける (じょうねつをかたむける).',
    },
  },
];

interface Props {
  currentLevel: JLPTLevel;
}

export const ReversibleKanjiLab: React.FC<Props> = ({ currentLevel }) => {
  const [pairs, setPairs] = useState<ReversiblePair[]>(INITIAL_PAIRS);
  const [loadBatchCount, setLoadBatchCount] = useState<number>(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPairId, setSelectedPairId] = useState<string>(INITIAL_PAIRS[0].id);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleLoadMore = () => {
    const nextBatchNum = loadBatchCount + 1;
    const startIndex = ((nextBatchNum - 1) * 5) % EXTRA_PAIRS.length;
    let batch = EXTRA_PAIRS.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_PAIRS.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextBatchNum}_${idx}`,
    }));

    setPairs((prev) => [...prev, ...uniqueBatch]);
    setLoadBatchCount(nextBatchNum);
    setNotice(`Đã nạp thêm 5 cặp Hán tự đảo ngược thứ tự đợt ${nextBatchNum}! (Tổng hiện có: ${pairs.length + uniqueBatch.length} cặp)`);
    speechService.playSuccessSound();
    setTimeout(() => setNotice(null), 4000);
  };

  const filteredPairs = pairs.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.kanjiA.includes(q) ||
      p.kanjiB.includes(q) ||
      p.readingA.toLowerCase().includes(q) ||
      p.readingB.toLowerCase().includes(q) ||
      p.meaningA.toLowerCase().includes(q) ||
      p.meaningB.toLowerCase().includes(q)
    );
  });

  const currentPair = pairs.find((p) => p.id === selectedPairId) || pairs[0];

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-10">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1427] via-[#090d18] to-[#060810] border border-indigo-600/30 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="text-indigo-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Phân Hệ 1 (PH1) · Từ Vựng & Hán Tự Chuyên Sâu
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-jp">左右反転熟語マスター</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400 font-semibold">Tử huyệt ngữ nghĩa Hán tự N2-N1</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Đấu Trường Đảo Ngược Hán Tự{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-indigo-400 bg-clip-text text-transparent">
                (Reversible Kanji Jukugo Lab)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Khám phá bí mật cấu trúc ngữ pháp chữ Hán: Chỉ cần đảo ngược vị trí hai chữ Hán (段階 vs 階段, 科学 vs 学科, 生産 vs 産生, 現実 vs 実現, 平和 vs 和平), sắc thái và ngữ nghĩa sẽ biến đổi ngoạn mục.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-xl border border-dashed border-indigo-500/60 bg-indigo-950/30 hover:bg-indigo-950/60 text-indigo-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-indigo-400"
            >
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>+5 Tải thêm cặp Hán tự đảo</span>
              {loadBatchCount > 0 && (
                <span className="text-[10px] bg-indigo-500 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
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

      {/* Search & Ribbon */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin flex-1">
          {filteredPairs.map((p) => {
            const isSelected = p.id === selectedPairId;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPairId(p.id);
                  setUserChoice(null);
                  setShowResult(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 text-left ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-900/40'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-jp font-bold text-amber-300">
                  <span>{p.kanjiA}</span>
                  <ArrowRightLeft className="w-3 h-3 text-slate-400" />
                  <span>{p.kanjiB}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">{p.readingA.split(' ')[0]} / {p.readingB.split(' ')[0]}</div>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-60 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm cặp chữ Hán đảo..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Main Dual Card Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Dual Cards & Linguistic Logic */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card A */}
            <div className="bg-[#080d19] border border-indigo-500/40 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold uppercase">
                  Dạng A: {currentPair.hanVietA}
                </span>
                <button
                  onClick={() => speechService.speak(currentPair.kanjiA)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-400 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-3xl font-extrabold font-jp text-white">{currentPair.kanjiA}</div>
              <div className="text-xs font-mono text-indigo-400 font-bold">{currentPair.readingA}</div>

              <p className="text-xs text-slate-200 leading-relaxed">{currentPair.meaningA}</p>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Ví dụ thực tế:</span>
                <p className="text-xs font-jp text-slate-200">{currentPair.exampleA}</p>
              </div>
            </div>

            {/* Card B */}
            <div className="bg-[#080d19] border border-amber-500/40 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold uppercase">
                  Dạng B: {currentPair.hanVietB}
                </span>
                <button
                  onClick={() => speechService.speak(currentPair.kanjiB)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-3xl font-extrabold font-jp text-amber-300">{currentPair.kanjiB}</div>
              <div className="text-xs font-mono text-amber-400 font-bold">{currentPair.readingB}</div>

              <p className="text-xs text-slate-200 leading-relaxed">{currentPair.meaningB}</p>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Ví dụ thực tế:</span>
                <p className="text-xs font-jp text-slate-200">{currentPair.exampleB}</p>
              </div>
            </div>
          </div>

          {/* Linguistic Logic Box */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Logic Cấu Trúc Ngữ Pháp Chữ Hán Của Cặp Từ Này:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentPair.linguisticLogic}</p>
          </div>
        </div>

        {/* Right 5 Cols: Rapid Pair Quiz */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1427] border border-indigo-700/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Trắc Nghiệm Phân Biệt Cặp Từ Đảo
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">Điểm: {quizScore}</span>
            </div>

            <p className="text-xs text-slate-300">
              Chọn từ Hán tự có thứ tự đúng với ngữ cảnh câu văn:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <p className="text-sm sm:text-base font-jp text-white font-bold leading-relaxed">
                {currentPair.quiz.question}
              </p>
              <div className="text-[11px] text-indigo-300 italic bg-indigo-950/40 p-2 rounded border border-indigo-900/40">
                Gợi ý: {currentPair.quiz.blankTarget}
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {[currentPair.quiz.correctKanji, currentPair.quiz.wrongKanji].map((opt, oIdx) => {
                  const isChosen = userChoice === opt;
                  const isCorrect = opt === currentPair.quiz.correctKanji;

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
                        setUserChoice(opt);
                        setShowResult(true);
                        if (isCorrect) {
                          setQuizScore((prev) => prev + 10);
                          speechService.playSuccessSound();
                        }
                      }}
                      className={`p-3.5 rounded-xl border text-base font-jp font-bold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showResult && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                      {showResult && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Result & Explanation */}
              {showResult && (
                <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                  <div
                    className={`text-xs font-bold flex items-center gap-1.5 ${
                      userChoice === currentPair.quiz.correctKanji ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {userChoice === currentPair.quiz.correctKanji ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Chính xác! (+10 điểm)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Chưa chính xác! Xem giải thích:</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    {currentPair.quiz.explanation}
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
