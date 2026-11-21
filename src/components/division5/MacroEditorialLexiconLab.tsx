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
  ArrowRight,
  TrendingUp,
  Newspaper,
  Lightbulb,
  Zap,
  Check,
} from 'lucide-react';

interface EditorialTerm {
  id: string;
  phraseJp: string;
  reading: string;
  literalMeaning: string;
  idiomaticMeaning: string;
  editorialCategory: 'Kinh tế vĩ mô' | 'Chính trị xã luận' | 'Thị trường cạnh tranh';
  newspaperSample: string;
  sampleVn: string;
  synonymOrContrast: string;
  quiz: {
    question: string;
    blankContext: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const INITIAL_EDITORIAL_TERMS: EditorialTerm[] = [
  {
    id: 'edit_1',
    phraseJp: '歯止めがかからない',
    reading: 'はどめが かからない (hadome ga kakaranai)',
    literalMeaning: 'Cái phanh xe (chèn bánh xe) không thể hãm lại được.',
    idiomaticMeaning: 'Đà suy giảm, lạm phát, đồng Yên mất giá hay suy thoái diễn ra không thể phanh lại / không kìm hãm nổi.',
    editorialCategory: 'Kinh tế vĩ mô',
    newspaperSample:
      '日米金利差の拡大を背景に急速な円安が進行しており、物価高騰と実質賃金の低下に歯止めがかからない深刻な事態に陥っている。',
    sampleVn:
      'Dưới sức ép chênh lệch lãi suất Mỹ - Nhật ngày càng nới rộng, đồng Yên đang trượt giá chóng mặt, đẩy nền kinh tế rơi vào tình cảnh nghiêm trọng khi đà bão giá và sụt giảm tiền lương thực tế không thể nào kìm hãm nổi.',
    synonymOrContrast: 'Đồng nghĩa: 歯止めがきかない, 歯止めをかける (dùng chủ động để hãm phanh).',
    quiz: {
      question: '少子化の加速による地方都市の人口減少に、（　　）が、早急な対策が求められる。',
      blankContext: 'Điền thành ngữ mang nghĩa "đà sụt giảm không thể phanh lại".',
      options: ['歯止めがかからない', '火を見るより明らかだ', '足元をすくわれる', '手をこまねいている'],
      correctIndex: 0,
      explanation: 'Thành ngữ báo chí kinh điển chỉ sự trượt dốc không phanh: 歯止めがかからない.',
    },
  },
  {
    id: 'edit_2',
    phraseJp: '岐路に立つ',
    reading: 'きろに たつ (kiro ni tatsu)',
    literalMeaning: 'Đứng tại ngã ba đường chia đôi lối đi.',
    idiomaticMeaning: 'Đứng trước thời khắc ngã rẽ định mệnh, quyết định sống còn của một quốc gia, nền kinh tế hay chính sách.',
    editorialCategory: 'Chính trị xã luận',
    newspaperSample:
      '急速に進む少子高齢化と財政赤字の累積により、我が国の社会保障制度は今まさに歴史的な岐路に立たされていると言えよう。',
    sampleVn:
      'Trước tình trạng già hóa dân số chóng mặt và nợ công tích tụ khổng lồ, hệ thống an sinh xã hội nước ta hiện đang đứng trước ngã ba đường mang tính bước ngoặt lịch sử.',
    synonymOrContrast: 'Gần nghĩa: 転換期を迎える (đón nhận thời kỳ bước ngoặt), 分水嶺に達する.',
    quiz: {
      question: '化石燃料から脱炭素エネルギーへの移行期において、エネルギー安全保障は重大な（　　）に立っている。',
      blankContext: 'Điền từ mang nghĩa "đứng trước ngã rẽ định mệnh".',
      options: ['岐路', '迷路', '旅路', '帰路'],
      correctIndex: 0,
      explanation: 'Đứng trước ngã rẽ định mệnh là 岐路に立つ (きろにたつ). 迷路 là mê cung; 帰路 là đường về.',
    },
  },
  {
    id: 'edit_3',
    phraseJp: '一石を投じる',
    reading: 'いっせきを とうじる (isseki o toujiru)',
    literalMeaning: 'Ném một hòn đá xuống mặt hồ phẳng lặng.',
    idiomaticMeaning: 'Dấy lên một làn sóng tranh luận sôi nổi, phá vỡ sự im lặng bằng một phát ngôn hoặc ý tưởng táo bạo.',
    editorialCategory: 'Chính trị xã luận',
    newspaperSample:
      '最高裁が下した今回の違憲判決は、長年議論が膠着していた選択的夫婦別姓制度の法制化に向けて大きな一石を投じた。',
    sampleVn:
      'Phán quyết vi hiến lần này từ Tòa án Tối cao đã ném một hòn đá làm dấy lên làn sóng tranh luận sâu rộng hướng tới việc luật hóa quy chế cho phép vợ chồng chọn giữ họ riêng.',
    synonymOrContrast: 'Gần nghĩa: 波紋を広げる (lan rộng làn sóng ảnh hưởng), 議論を巻き起こす.',
    quiz: {
      question: '若手起業家の大胆な提言は、前例踏襲主義に陥っていた業界全体に大きな（　　）を投じた。',
      blankContext: 'Điền từ trong thành ngữ "ném một hòn đá dấy lên tranh luận".',
      options: ['一石', '一撃', '一票', '一矢'],
      correctIndex: 0,
      explanation: 'Thành ngữ: 一石を投じる (いっせきをとうじる).',
    },
  },
];

const EXTRA_EDITORIAL_TERMS: EditorialTerm[] = [
  {
    id: 'edit_extra_1',
    phraseJp: '浮き彫りになる',
    reading: 'うきぼりに なる (ukibori ni naru)',
    literalMeaning: 'Nổi cộm lên rõ nét như hình tượng điêu khắc chạm nổi.',
    idiomaticMeaning: 'Một vấn đề tiềm ẩn, mâu thuẫn hay khuyết điểm bấy lâu nay bỗng bị phơi bày hiển hiện rõ rệt trước mắt.',
    editorialCategory: 'Chính trị xã luận',
    newspaperSample:
      '能登半島地震における物資補給の遅れは、過疎化が進む半島地域特有の交通インフラの脆弱性を残酷なまでに浮き彫りにした。',
    sampleVn:
      'Sự chậm trễ tiếp tế đồ cứu trợ trong trận động đất bán đảo Noto đã phơi bày một cách tàn nhẫn sự mong manh yếu ớt của hạ tầng giao thông tại các vùng bán đảo thưa thớt dân cư.',
    synonymOrContrast: 'Gần nghĩa: 露呈する (ろていする - lộ diện), 明らかになる.',
    quiz: {
      question: 'パンデミックの拡大は、医療従事者の慢性的な人手不足という構造的課題を（　　）にした。',
      blankContext: 'Điền từ mang nghĩa "phơi bày rõ rệt ra ánh sáng".',
      options: ['浮き彫り', '目白押し', '棚上げ', '空回り'],
      correctIndex: 0,
      explanation: 'Phơi bày vấn đề nổi cộm là 浮き彫りにする／浮き彫りになる (うきぼり).',
    },
  },
  {
    id: 'edit_extra_2',
    phraseJp: '淘汰される',
    reading: 'とうた される (touta sareru)',
    literalMeaning: 'Đãi cát lấy vàng, chọn lọc sinh tồn tự nhiên.',
    idiomaticMeaning: 'Bị đào thải, loại bỏ không thương tiếc theo quy luật cạnh tranh khốc liệt của thị trường.',
    editorialCategory: 'Thị trường cạnh tranh',
    newspaperSample:
      '生成AIの急速な普及に伴い、単なる定型業務に依存する企業やサービスは市場から容赦なく淘汰されていく運命にある。',
    sampleVn:
      'Cùng với sự bùng nổ của AI tạo sinh, các doanh nghiệp và dịch vụ chỉ dựa dẫm vào các công việc khuôn mẫu sẽ mang số phận bị đào thải không thương tiếc khỏi thương trường.',
    synonymOrContrast: 'Gần nghĩa: 自然淘汰 (chọn lọc tự nhiên), 排除される, 取り残される.',
    quiz: {
      question: '技術革新のスピードについていけない企業は、国際競争の荒波の中で自然と（　　）されていく。',
      blankContext: 'Điền từ mang nghĩa "bị đào thải theo quy luật cạnh tranh".',
      options: ['淘汰', '排斥', '追放', '駆逐'],
      correctIndex: 0,
      explanation: 'Đào thải thị trường luôn dùng chữ 淘汰される (とうたされる).',
    },
  },
  {
    id: 'edit_extra_3',
    phraseJp: 'しのぎを削る',
    reading: 'しのぎを けずる (shinogi o kezuru)',
    literalMeaning: 'Hai lưỡi kiếm gươm chạm vào nhau chém mòn cả sống gươm (Shinogi).',
    idiomaticMeaning: 'Cạnh tranh sống còn vô cùng khốc liệt, tranh đấu kịch liệt không khoan nhượng.',
    editorialCategory: 'Thị trường cạnh tranh',
    newspaperSample:
      '次世代半導体の微細化競争において、日米欧の主要メーカーは巨額の研究開発費を投じ、しのぎを削る熾烈な開発競争を展開している。',
    sampleVn:
      'Trong cuộc đua thu nhỏ bóng bán dẫn thế hệ mới, các nhà sản xuất hàng đầu Nhật - Mỹ - Âu đang rót vốn nghiên cứu khổng lồ, cạnh tranh khốc liệt sống còn để giành giật vị thế dẫn đầu.',
    synonymOrContrast: 'Gần nghĩa: 激しい火花を散らす, 熾烈な争い (しれつなあらそい).',
    quiz: {
      question: 'EV市場の覇権をめぐって、グローバル自動車大手が激しい（　　）を削っている。',
      blankContext: 'Điền từ trong thành ngữ "cạnh tranh gay gắt sống còn".',
      options: ['しのぎ', 'きっさき', 'やいば', 'つば'],
      correctIndex: 0,
      explanation: 'Thành ngữ: しのぎを削る (しのぎをけずる - mài mòn sống kiếm).',
    },
  },
  {
    id: 'edit_extra_4',
    phraseJp: '骨抜きにされる',
    reading: 'ほねぬきに される (honenuki ni sareru)',
    literalMeaning: 'Bị rút sạch xương (cá rút xương).',
    idiomaticMeaning: 'Một dự luật, kế hoạch cải cách bị sửa đổi, cắt xén đến mức mất sạch sức mạnh và tính hiệu lực thực chất.',
    editorialCategory: 'Chính trị xã luận',
    newspaperSample:
      '政治資金規正法の改正案は、与野党の妥協の末に肝心な使途公開基準が後退し、実質的に骨抜きにされたとの批判を免れない。',
    sampleVn:
      'Dự luật sửa đổi Luật quản lý quỹ chính trị sau những thỏa hiệp giữa các đảng phái đã thụt lùi tiêu chuẩn công khai chi tiêu, khó tránh khỏi làn sóng chỉ trích rằng dự luật đã bị rút ruột vô hiệu hóa trên thực tế.',
    synonymOrContrast: 'Gần nghĩa: 形骸化する (けいがいかする - chỉ còn cái vỏ hình thức).',
    quiz: {
      question: '業界団体の強い反対により、環境規制法案の核心部分は妥協を重ねた結果、（　　）にされてしまった。',
      blankContext: 'Điền từ mang nghĩa "bị rút ruột mất hết hiệu lực".',
      options: ['骨抜き', '腰砕け', '足踏み', '空振り'],
      correctIndex: 0,
      explanation: 'Bị rút ruột vô hiệu hóa là 骨抜きにされる (ほねぬきにされる).',
    },
  },
  {
    id: 'edit_extra_5',
    phraseJp: '暗雲が立ち込める',
    reading: "あんうんが たちこめる (an'un ga tachikomeru)",
    literalMeaning: 'Những đám mây đen kịt giăng kín bầu trời.',
    idiomaticMeaning: 'Những bóng đen u ám, điềm báo nguy cơ rủi ro đang bao phủ lên tương lai hay triển vọng phát triển.',
    editorialCategory: 'Kinh tế vĩ mô',
    newspaperSample:
      '世界的なインフレの長期化と地政学リスクの連鎖により、下半期の世界経済の先行きには濃い暗雲が立ち込めている。',
    sampleVn:
      'Trước tình trạng lạm phát toàn cầu kéo dài cùng chuỗi rủi ro địa chính trị chực chờ, triển vọng kinh tế thế giới nửa cuối năm đang bị mây đen u ám bủa vây.',
    synonymOrContrast: 'Gần nghĩa: 影を落とす (phủ bóng đen), 雲行きが怪しい.',
    quiz: {
      question: '不動産大手の経営破綻の連鎖により、同国の金融市場全体に짙い（　　）が立ち込めている。',
      blankContext: 'Điền từ mang nghĩa "mây đen u ám bao phủ".',
      options: ['暗雲', '黒煙', '濃霧', '雷雲'],
      correctIndex: 0,
      explanation: 'Thành ngữ: 暗雲が立ち込める (あんうんがたちこめる - mây đen giăng kín).',
    },
  },
];

interface Props {
  currentLevel: JLPTLevel;
}

export const MacroEditorialLexiconLab: React.FC<Props> = ({ currentLevel }) => {
  const [terms, setTerms] = useState<EditorialTerm[]>(INITIAL_EDITORIAL_TERMS);
  const [loadBatchCount, setLoadBatchCount] = useState<number>(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedTermId, setSelectedTermId] = useState<string>(INITIAL_EDITORIAL_TERMS[0].id);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleLoadMore = () => {
    const nextBatchNum = loadBatchCount + 1;
    const startIndex = ((nextBatchNum - 1) * 5) % EXTRA_EDITORIAL_TERMS.length;
    let batch = EXTRA_EDITORIAL_TERMS.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_EDITORIAL_TERMS.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextBatchNum}_${idx}`,
    }));

    setTerms((prev) => [...prev, ...uniqueBatch]);
    setLoadBatchCount(nextBatchNum);
    setNotice(`Đã nạp thêm 5 từ vựng & quán dụng ngữ xã luận vĩ mô đợt ${nextBatchNum}! (Tổng hiện có: ${terms.length + uniqueBatch.length} từ)`);
    speechService.playSuccessSound();
    setTimeout(() => setNotice(null), 4000);
  };

  const currentTerm = terms.find((t) => t.id === selectedTermId) || terms[0];

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-10">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1208] via-[#140e06] to-[#0c0803] border border-amber-600/30 p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="text-amber-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Newspaper className="w-4 h-4" />
                Phân Hệ 5 (PH5) · Đột Phá Luyện Thi N2-N1
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-jp">時事経済・論説社説語彙マスター</span>
              <span className="text-slate-600">·</span>
              <span className="text-cyan-400 font-semibold">Vốn từ chủ động báo Nikkei & Asahi N1</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Tinh Hoa Từ Vựng Vĩ Mô & Thời Sự Báo Giấy{' '}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                (Macroeconomics & Editorial Lexicon Lab)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nâng cấp vốn từ tiếng Nhật lên tầm cao phân tích chuyên sâu: Nắm bắt những quán dụng ngữ xuất hiện dày đặc trong bài xã luận (社説) và đọc hiểu trường văn N1 như 歯止めがかからない, 岐路に立つ, 浮き彫りになる, 一石を投じる, 淘汰される, 骨抜きにされる.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-xl border border-dashed border-amber-500/60 bg-amber-950/30 hover:bg-amber-950/60 text-amber-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-amber-400"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>+5 Tải thêm từ vựng xã luận</span>
              {loadBatchCount > 0 && (
                <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
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
        {terms.map((t, idx) => {
          const isSelected = t.id === selectedTermId;
          return (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTermId(t.id);
                setUserChoice(null);
                setShowResult(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 text-left ${
                isSelected
                  ? 'bg-amber-600 border-amber-400 text-slate-950 shadow-md shadow-amber-950/50'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-jp font-bold">
                <span>{t.phraseJp}</span>
              </div>
              <div className="text-[10px] opacity-75 font-mono">{t.editorialCategory}</div>
            </button>
          );
        })}
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Phrase Breakdown & Newspaper Excerpt */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40 uppercase font-bold">
                  {currentTerm.editorialCategory}
                </span>
                <h2 className="text-2xl font-extrabold text-amber-300 mt-1 font-jp">{currentTerm.phraseJp}</h2>
                <div className="text-xs font-mono text-slate-400">{currentTerm.reading}</div>
              </div>

              <button
                onClick={() => speechService.speak(currentTerm.newspaperSample)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 cursor-pointer"
                title="Nghe đọc trích đoạn báo chí"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Meanings */}
            <div className="space-y-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Nghĩa đen hình tượng:</span>
                <p>{currentTerm.literalMeaning}</p>
              </div>

              <div className="bg-amber-950/20 p-3.5 rounded-xl border border-amber-900/40 text-xs text-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Nghĩa thời sự xã luận:</span>
                <p className="leading-relaxed font-sans">{currentTerm.idiomaticMeaning}</p>
              </div>
            </div>

            {/* Authentic Newspaper Sample */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5 font-mono">
                <Newspaper className="w-3.5 h-3.5 text-amber-400" />
                <span>Trích đoạn xã luận thực tế (Nikkei / Asahi):</span>
              </span>
              <p className="text-xs sm:text-sm font-jp text-white leading-relaxed font-bold bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                "{currentTerm.newspaperSample}"
              </p>
              <p className="text-xs text-slate-400 italic font-sans">{currentTerm.sampleVn}</p>
            </div>

            {/* Synonym & Related Collocations */}
            <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-amber-400 font-semibold">Cụm từ liên đới: </span>
                {currentTerm.synonymOrContrast}
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Editorial Context Quiz */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1427] border border-amber-700/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Trắc Nghiệm Khẩu Khí Báo Chí N1
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">Điểm: {score}</span>
            </div>

            <p className="text-xs text-slate-300">
              Chọn cụm từ xã luận chuẩn mực nhất điền vào câu phân tích kinh tế:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs sm:text-sm font-jp font-bold text-white leading-relaxed bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                {currentTerm.quiz.question}
              </div>
              <div className="text-[11px] text-amber-300 italic bg-amber-950/40 p-2 rounded border border-amber-900/40">
                Yêu cầu: {currentTerm.quiz.blankContext}
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {currentTerm.quiz.options.map((opt, oIdx) => {
                  const isChosen = userChoice === oIdx;
                  const isCorrect = oIdx === currentTerm.quiz.correctIndex;

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
                      className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-jp text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showResult && isCorrect && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      {showResult && isChosen && !isCorrect && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {showResult && (
                <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                  <div
                    className={`text-xs font-bold flex items-center gap-1.5 ${
                      userChoice === currentTerm.quiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {userChoice === currentTerm.quiz.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Chính xác hoàn hảo! (+10 điểm)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Chưa chính xác! Xem giải mã:</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    {currentTerm.quiz.explanation}
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
