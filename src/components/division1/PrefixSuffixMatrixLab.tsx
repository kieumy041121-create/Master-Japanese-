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
  Filter,
  Lightbulb,
  Zap,
  Check,
  AlertCircle,
} from 'lucide-react';

interface AffixItem {
  id: string;
  affix: string;
  reading: string;
  type: 'prefix' | 'suffix';
  hanViet: string;
  meaning: string;
  rules: string;
  examples: {
    word: string;
    reading: string;
    meaning: string;
  }[];
  contrastNote?: string;
  quiz: {
    question: string;
    blankTarget: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const INITIAL_AFFIXES: AffixItem[] = [
  {
    id: 'affix_1',
    affix: '不〜',
    reading: 'ふ (fu)',
    type: 'prefix',
    hanViet: 'BẤT',
    meaning: 'Không, bất (chỉ sự phủ định trực tiếp về tính chất, trạng thái, thường tiêu cực hoặc thiếu thốn).',
    rules: 'Thường ghép với tính từ đuôi -na hoặc danh từ mang tính phẩm chất (khiếm khuyết).',
    examples: [
      { word: '不安', reading: 'ふあん', meaning: 'Bất an, lo lắng' },
      { word: '不景気', reading: 'ふけいき', meaning: 'Kinh tế suy thoái, ảm đạm' },
      { word: '不可能', reading: 'ふかのう', meaning: 'Bất khả thi, không thể' },
      { word: '不完全', reading: 'ふかんぜん', meaning: 'Bất toàn, chưa hoàn chỉnh' },
    ],
    contrastNote: 'Phân biệt 不 vs 非 vs 無 vs 未: 不 nhấn mạnh vào sự thiếu thốn phẩm chất; 非 là phi pháp/trái với luân thường; 無 là hoàn toàn không có; 未 là chưa tới thời điểm.',
    quiz: {
      question: '景気の悪化に伴い、新卒採用を見送る企業が増えて（　　）透明感が高まっている。',
      blankTarget: 'Điền tiền tố vào từ "___透明感" (cảm giác mờ mịt/không rõ ràng).',
      options: ['不', '非', '無', '未'],
      correctIndex: 0,
      explanation: 'Sự không minh bạch, mờ mịt dùng 不透明 (BẤT THẤU MINH). Không dùng 非 hay 無.',
    },
  },
  {
    id: 'affix_2',
    affix: '非〜',
    reading: 'ひ (hi)',
    type: 'prefix',
    hanViet: 'PHI',
    meaning: 'Phi, trái với quy tắc, phi thực tế, phi chính thức hoặc nằm ngoài phạm trù.',
    rules: 'Ghép với các danh từ chỉ chế độ, hệ thống, quy chuẩn luân lý.',
    examples: [
      { word: '非常識', reading: 'ひじょうしき', meaning: 'Phi thường thức, thiếu ý thức thường tình' },
      { word: '非公式', reading: 'ひこうしき', meaning: 'Phi chính thức (cuộc gặp không nghi lễ)' },
      { word: '非日常', reading: 'ひにちじょう', meaning: 'Khoảnh khắc ngoài đời thường (lễ hội, du lịch)' },
      { word: '非営利', reading: 'ひえいり', meaning: 'Phi lợi nhuận (tổ chức phi chính phủ NPO)' },
    ],
    contrastNote: 'Khác với 不 (chỉ trạng thái xấu), 非 mang nghĩa "nằm ngoài quy chuẩn thông thường" hoặc "trái ngược với khái niệm đối lập".',
    quiz: {
      question: '日米両首脳はホテルのラウンジで、（　　）公式な懇談を行い親密さをアピールした。',
      blankTarget: 'Điền tiền tố vào từ "___公式" (phi chính thức).',
      options: ['不', '非', '無', '未'],
      correctIndex: 1,
      explanation: 'Cuộc gặp phi chính thức / không theo nghi thức dùng 非公式 (PHI CÔNG THỨC).',
    },
  },
  {
    id: 'affix_3',
    affix: '無〜',
    reading: 'む / ぶ (mu / bu)',
    type: 'prefix',
    hanViet: 'VÔ',
    meaning: 'Vô, số 0 tròn trĩnh, hoàn toàn không có gì (vô trách nhiệm, vô căn cứ, miễn phí).',
    rules: 'Chỉ sự vắng bóng hoàn toàn của một đối tượng, thuộc tính hoặc chi phí.',
    examples: [
      { word: '無責任', reading: 'むせきにん', meaning: 'Vô trách nhiệm' },
      { word: '無関係', reading: 'むかんけい', meaning: 'Không liên quan, vô can' },
      { word: '無料', reading: 'むりょう', meaning: 'Miễn phí (không mất tiền)' },
      { word: '無関心', reading: 'むかんしん', meaning: 'Thờ ơ, dửng dưng không bận tâm' },
    ],
    contrastNote: 'Cực đoan hơn 不. 不関心 ít dùng, người Nhật dùng 無関心 (hoàn toàn không quan tâm).',
    quiz: {
      question: '選挙への（　　）関心が若者の間で広がり、投票率の低下が問題視されている。',
      blankTarget: 'Điền tiền tố vào từ "___関心" (thờ ơ chính trị).',
      options: ['不', '非', '無', '未'],
      correctIndex: 2,
      explanation: 'Sự dửng dưng, thờ ơ không bận tâm luôn là 無関心 (VÔ QUAN TÂM).',
    },
  },
  {
    id: 'affix_4',
    affix: '〜化',
    reading: 'か (ka)',
    type: 'suffix',
    hanViet: 'HÓA',
    meaning: '-hóa, chuyển biến trạng thái trở nên như thế nào đó.',
    rules: 'Ghép vào sau danh từ để biến thành quá trình thay đổi hoặc hành động cải biến.',
    examples: [
      { word: 'デジタル化', reading: 'デジたるか', meaning: 'Số hóa (Digitalization)' },
      { word: '実用化', reading: 'じつようか', meaning: 'Đưa vào ứng dụng thực tế' },
      { word: '少子高齢化', reading: 'しょうしこうれいか', meaning: 'Già hóa dân số và giảm sinh' },
      { word: '民営化', reading: 'みんえいか', meaning: 'Tư nhân hóa doanh nghiệp nhà nước' },
    ],
    contrastNote: 'Là một trong những hậu tố xuất hiện dày đặc nhất trong văn bản kinh tế và đề đọc hiểu N2-N1.',
    quiz: {
      question: '研究所で開発された新素材の早期（　　）化に向けて、民間企業との提携が進む。',
      blankTarget: 'Điền hậu tố vào "早期実用___" (ứng dụng vào đời sống).',
      options: ['化', '性', '的', '感'],
      correctIndex: 0,
      explanation: '実用化 (Thực dụng hóa) nghĩa là đưa vào sản xuất ứng dụng thực tế.',
    },
  },
  {
    id: 'affix_5',
    affix: '〜的',
    reading: 'てき (teki)',
    type: 'suffix',
    hanViet: 'ĐÍCH',
    meaning: 'Mang tính chất, có khuynh hướng (tương đương hậu tố -al, -ic, -ive trong tiếng Anh).',
    rules: 'Biến danh từ thành tính từ đuôi -na, bổ nghĩa cho danh từ phía sau bằng な.',
    examples: [
      { word: '圧倒的', reading: 'あっとうてき', meaning: 'Mang tính áp đảo hoàn toàn' },
      { word: '根本的', reading: 'こんぽんてき', meaning: 'Có tính chất căn bản, cốt lõi' },
      { word: '具体的', reading: 'ぐたいてき', meaning: 'Cụ thể, rõ ràng' },
      { word: '画期的', reading: 'かっきてき', meaning: 'Có tính bước ngoặt, mang tính lịch sử' },
    ],
    contrastNote: 'Khi đứng trước danh từ, luôn đi với な (VD: 画期的な技術). Khi làm phó từ thì đi với に (VD: 根本的に見直す).',
    quiz: {
      question: '今回の法改正は、労働環境を（　　）本的に改善するための第一歩である。',
      blankTarget: 'Điền từ ghép với "___本的" (căn bản/cốt lõi).',
      options: ['根', '基', '本', '原'],
      correctIndex: 0,
      explanation: '根本的 (Căn bản, cốt lõi) là từ vựng N1 cực kỳ phổ biến. 根本的に改善する nghĩa là cải thiện từ gốc rễ.',
    },
  },
];

const EXTRA_AFFIXES: AffixItem[] = [
  {
    id: 'affix_extra_1',
    affix: '未〜',
    reading: 'み (mi)',
    type: 'prefix',
    hanViet: 'VỊ',
    meaning: 'Chưa, vị lai (chưa đến thời điểm, chưa thực hiện nhưng có khả năng sẽ xảy ra).',
    rules: 'Chỉ giai đoạn trước khi một sự việc hoặc cột mốc được hoàn thành.',
    examples: [
      { word: '未解決', reading: 'みかいけつ', meaning: 'Chưa được giải quyết (vụ án, vấn đề)' },
      { word: '未成年', reading: 'みせいねん', meaning: 'Chưa thành niên (dưới 18 tuổi)' },
      { word: '未曾有', reading: 'みぞう', meaning: 'Chưa từng có trong lịch sử (chưa từng xảy ra)' },
      { word: '未定', reading: 'みてい', meaning: 'Chưa định đoạt, còn bỏ ngỏ' },
    ],
    contrastNote: 'Khác với 不 và 無, 未 hàm ý trong tương lai sự việc có thể sẽ hoàn tất.',
    quiz: {
      question: '東日本大震災は、我が国の近現代史上において（　　）曾有の大災害であった。',
      blankTarget: 'Điền tiền tố vào từ "___曾有" (chưa từng có).',
      options: ['不', '非', '無', '未'],
      correctIndex: 3,
      explanation: '未曾有 (みぞう - VỊ TẰNG HỮU) nghĩa là chưa từng có từ trước đến nay.',
    },
  },
  {
    id: 'affix_extra_2',
    affix: '〜性',
    reading: 'せい (sei)',
    type: 'suffix',
    hanViet: 'TÍNH',
    meaning: 'Thuộc tính, khả năng, xu hướng hoặc tiềm năng (tính khả thi, tính an toàn, tính bền vững).',
    rules: 'Ghép vào danh từ hoặc tính từ để tạo thành danh từ chỉ thuộc tính trừu tượng.',
    examples: [
      { word: '可能性', reading: 'かのうせい', meaning: 'Khả năng, tính khả thi' },
      { word: '持続可能性', reading: 'じぞくかのうせい', meaning: 'Tính bền vững (Sustainability)' },
      { word: '安全性', reading: 'あんぜんせい', meaning: 'Tính an toàn' },
      { word: '将来性', reading: 'しょうらいせい', meaning: 'Triển vọng tương lai' },
    ],
    contrastNote: 'Thường phân biệt với 〜感: 〜性 là đặc tính khách quan, còn 〜感 là cảm giác chủ quan của con người.',
    quiz: {
      question: '再生可能エネルギーの導入拡大は、地球環境の持続可能（　　）を担保する。',
      blankTarget: 'Điền hậu tố vào "持続可能___" (sustainability).',
      options: ['化', '性', '感', '的'],
      correctIndex: 1,
      explanation: '持続可能性 (Sustainability - Tính bền vững) là danh từ chuẩn.',
    },
  },
  {
    id: 'affix_extra_3',
    affix: '〜感',
    reading: 'かん (kan)',
    type: 'suffix',
    hanViet: 'CẢM',
    meaning: 'Cảm giác, tâm lý chủ quan hoặc bầu không khí cảm nhận được.',
    rules: 'Đi sau danh từ hoặc tính từ để biểu thị tâm trạng, ấn tượng người khác cảm nhận.',
    examples: [
      { word: '清潔感', reading: 'せいけつかん', meaning: 'Cảm giác sạch sẽ, tươm tất' },
      { word: '責任感', reading: 'せきにんかん', meaning: 'Ý thức tinh thần trách nhiệm' },
      { word: '危機感', reading: 'ききかん', meaning: 'Ý thức khủng hoảng, cảnh giác nguy cơ' },
      { word: '透明感', reading: 'とうめいかん', meaning: 'Vẻ đẹp trong trẻo, tinh khôi' },
    ],
    contrastNote: 'Ví dụ: 清潔 (sạch sẽ - tính chất) vs 清潔感 (ấn tượng sạch sẽ người ngoài nhìn vào).',
    quiz: {
      question: 'リーダーたる者、いかなる困難に直面しても強い責任（　　）を持たねばならない。',
      blankTarget: 'Điền hậu tố vào "責任___" (tinh thần trách nhiệm).',
      options: ['感', '性', '化', '視'],
      correctIndex: 0,
      explanation: '責任感 (Trách nhiệm cảm) nghĩa là tinh thần / ý thức trách nhiệm.',
    },
  },
  {
    id: 'affix_extra_4',
    affix: '〜風',
    reading: 'ふう (fuu)',
    type: 'suffix',
    hanViet: 'PHONG',
    meaning: 'Phong cách, kiểu dáng, mang hơi hướng (kiểu Nhật, phong cách phương Tây, giả bộ).',
    rules: 'Biến danh từ thành phong cách tương tự hoặc vẻ ngoài làm ra vẻ.',
    examples: [
      { word: '和風', reading: 'わふう', meaning: 'Phong cách Nhật Bản truyền thống' },
      { word: '欧米風', reading: 'おうべいふう', meaning: 'Hơi hướng Âu Mỹ' },
      { word: '学者風', reading: 'がくしゃふう', meaning: 'Dáng dấp học giả trí thức' },
      { word: '現代風', reading: 'げんだいふう', meaning: 'Phong cách thời hiện đại' },
    ],
    contrastNote: 'Thường phân biệt với 〜流 (trường phái thực thụ) và 〜調 (tông điệu/giai điệu).',
    quiz: {
      question: 'このレストランでは、地元の新鮮な野菜を使った（　　）風の創作料理が楽しめる。',
      blankTarget: 'Điền chữ ghép với "___風" (phong cách Nhật).',
      options: ['和', '日', '京', '本'],
      correctIndex: 0,
      explanation: '和風 (Hòa phong) là cách nói chuẩn mực chỉ phong cách kiểu Nhật.',
    },
  },
  {
    id: 'affix_extra_5',
    affix: '諸〜',
    reading: 'しょ (sho)',
    type: 'prefix',
    hanViet: 'CHƯ',
    meaning: 'Chư, nhiều, các loại (chư vị, nhiều vấn đề, các quốc gia, các loại chi phí).',
    rules: 'Đi trước danh từ chỉ số nhiều mang tính bao hàm và trang trọng.',
    examples: [
      { word: '諸問題', reading: 'しょもんだい', meaning: 'Các vấn đề nan giải phát sinh' },
      { word: '諸外国', reading: 'しょがいこく', meaning: 'Các quốc gia trên thế giới' },
      { word: '諸費用', reading: 'しょひよう', meaning: 'Các khoản phụ phí lặt vặt' },
      { word: '諸悪', reading: 'しょあく', meaning: 'Mọi tội ác (諸悪の根源 - nguồn cơn mọi tội lỗi)' },
    ],
    contrastNote: 'Khác với 各 (các - nhấn mạnh từng cái riêng lẻ), 諸 bao hàm tập hợp chung.',
    quiz: {
      question: '少子高齢化に伴って生じる（　　）問題に、国を挙げて立ち向かわねばならない。',
      blankTarget: 'Điền tiền tố vào từ "___問題" (các vấn đề phức hợp).',
      options: ['諸', '各', '全', '総'],
      correctIndex: 0,
      explanation: '諸問題 (Chư vấn đề) là thuật ngữ chuẩn để chỉ tập hợp nhiều vấn đề nảy sinh.',
    },
  },
];

interface Props {
  currentLevel: JLPTLevel;
}

export const PrefixSuffixMatrixLab: React.FC<Props> = ({ currentLevel }) => {
  const [affixes, setAffixes] = useState<AffixItem[]>(INITIAL_AFFIXES);
  const [loadBatchCount, setLoadBatchCount] = useState<number>(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | 'prefix' | 'suffix'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAffixId, setSelectedAffixId] = useState<string>(INITIAL_AFFIXES[0].id);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const handleLoadMore = () => {
    const nextBatchNum = loadBatchCount + 1;
    const startIndex = ((nextBatchNum - 1) * 5) % EXTRA_AFFIXES.length;
    let batch = EXTRA_AFFIXES.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_AFFIXES.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextBatchNum}_${idx}`,
    }));

    setAffixes((prev) => [...prev, ...uniqueBatch]);
    setLoadBatchCount(nextBatchNum);
    setNotice(`Đã nạp thêm 5 tiếp đầu ngữ & tiếp vĩ ngữ đợt ${nextBatchNum}! (Tổng hiện có: ${affixes.length + uniqueBatch.length} mục)`);
    speechService.playSuccessSound();
    setTimeout(() => setNotice(null), 4000);
  };

  const filteredAffixes = affixes.filter((a) => {
    if (typeFilter !== 'all' && a.type !== typeFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.affix.toLowerCase().includes(q) ||
      a.reading.toLowerCase().includes(q) ||
      a.hanViet.toLowerCase().includes(q) ||
      a.meaning.toLowerCase().includes(q) ||
      a.examples.some((ex) => ex.word.includes(q) || ex.meaning.toLowerCase().includes(q))
    );
  });

  const currentAffix = affixes.find((a) => a.id === selectedAffixId) || affixes[0];

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
              <span className="text-slate-300 font-jp">接頭辞・接尾辞マトリックス</span>
              <span className="text-slate-600">·</span>
              <span className="text-cyan-400 font-semibold">Chuyên đề Mondai 2 JLPT N2-N1</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Bậc Thầy Tiếp Đầu Ngữ & Tiếp Vĩ Ngữ{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-indigo-400 bg-clip-text text-transparent">
                (Prefix & Suffix Matrix Lab)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Giải quyết trọn vẹn dạng bài bẫy chọn tiền tố/hậu tố: Phân biệt 不・非・無・未, 〜化 vs 〜性 vs 〜感, các tiếp vĩ ngữ chỉ phong thái, dáng vẻ và tính chất trừu tượng trong văn phong Nhật Bản.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-xl border border-dashed border-indigo-500/60 bg-indigo-950/30 hover:bg-indigo-950/60 text-indigo-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-indigo-400"
            >
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>+5 Tải thêm tiền tố / hậu tố</span>
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

      {/* Controls: Type Filter & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                typeFilter === 'all' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất cả ({affixes.length})
            </button>
            <button
              onClick={() => setTypeFilter('prefix')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                typeFilter === 'prefix' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tiếp đầu ngữ (Prefix)
            </button>
            <button
              onClick={() => setTypeFilter('suffix')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                typeFilter === 'suffix' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tiếp vĩ ngữ (Suffix)
            </button>
          </div>
        </div>

        <div className="relative w-full sm:w-60">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tiền tố, hậu tố..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* List Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {filteredAffixes.map((item) => {
          const isSelected = item.id === selectedAffixId;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedAffixId(item.id);
                setUserChoice(null);
                setShowResult(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 text-left ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-900/40'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="font-jp text-sm font-bold text-amber-300">{item.affix}</div>
              <div className="text-[10px] text-slate-300 opacity-80">{item.reading} · {item.hanViet}</div>
            </button>
          );
        })}
      </div>

      {/* Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Rule Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold font-jp text-amber-300">{currentAffix.affix}</span>
                <span className="text-xs font-mono font-bold text-indigo-400">
                  {currentAffix.reading} ({currentAffix.hanViet})
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40 uppercase font-bold">
                  {currentAffix.type === 'prefix' ? 'Tiền tố (接頭辞)' : 'Hậu tố (接尾辞)'}
                </span>
              </div>

              <button
                onClick={() => speechService.speak(currentAffix.affix.replace(/[〜]/g, ''))}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-800 transition-colors cursor-pointer"
                title="Nghe phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Meaning & Rules */}
            <div className="space-y-2">
              <div className="text-xs text-slate-200 leading-relaxed">
                <span className="text-slate-400 font-semibold">Ý nghĩa cốt lõi: </span>
                {currentAffix.meaning}
              </div>
              <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                <span className="text-indigo-400 font-semibold">Quy tắc ghép từ: </span>
                {currentAffix.rules}
              </div>
            </div>

            {/* Contrast Note */}
            {currentAffix.contrastNote && (
              <div className="text-xs text-amber-200 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Bóc tách sắc thái: </span>
                  {currentAffix.contrastNote}
                </div>
              </div>
            )}

            {/* Examples Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Từ Vựng Thực Chiến Điển Hình:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentAffix.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 hover:border-indigo-500/30 transition-all flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="text-sm font-jp font-bold text-white">{ex.word}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{ex.reading}</div>
                      <div className="text-xs text-indigo-300 mt-1">{ex.meaning}</div>
                    </div>
                    <button
                      onClick={() => speechService.speak(ex.word)}
                      className="p-1 rounded-lg text-slate-500 hover:text-indigo-400 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Quiz Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1427] border border-indigo-700/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Trắc Nghiệm Ghép Tiền Tố / Hậu Tố
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">Điểm: {quizScore}</span>
            </div>

            <p className="text-xs text-slate-300">
              Chọn tiền tố hoặc hậu tố thích hợp nhất điền vào câu:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <p className="text-sm sm:text-base font-jp text-white font-bold leading-relaxed">
                {currentAffix.quiz.question}
              </p>
              <div className="text-[11px] text-indigo-300 italic bg-indigo-950/40 p-2 rounded border border-indigo-900/40">
                Gợi ý: {currentAffix.quiz.blankTarget}
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {currentAffix.quiz.options.map((opt, oIdx) => {
                  const isChosen = userChoice === oIdx;
                  const isCorrect = oIdx === currentAffix.quiz.correctIndex;

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
                          setQuizScore((prev) => prev + 10);
                          speechService.playSuccessSound();
                        }
                      }}
                      className={`p-3 rounded-xl border text-sm font-jp font-bold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
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
                      userChoice === currentAffix.quiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {userChoice === currentAffix.quiz.correctIndex ? (
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
                    {currentAffix.quiz.explanation}
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
