import React, { useState, useEffect } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import { historyService, HistoryItem } from '../../services/historyService';
import { callGemini, safeExtractJson } from '../../services/geminiService';
import {
  Sparkles,
  RefreshCw,
  Search,
  Volume2,
  CheckCircle2,
  History,
  Smile,
  Zap,
  Activity,
  Heart,
  HelpCircle,
  Award,
} from 'lucide-react';

export interface OnomatopoeiaItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  category: 'emotion' | 'state' | 'movement' | 'sound';
  categoryLabel: string;
  visualEmoji: string;
  level: JLPTLevel;
  nuanceExplanation: string;
  exampleSentence: string;
  exampleReading: string;
  exampleMeaning: string;
  contextQuiz: {
    question: string;
    options: string[];
    correctWord: string;
    explanation: string;
  };
}

const initialOnomatopoeiaList: OnomatopoeiaItem[] = [
  {
    id: 'ono_1',
    word: 'ドキドキ',
    reading: 'どきどき',
    meaning: 'Tim đập thình thịch, hồi hộp, bồn chồn (lo lắng hoặc phấn khích)',
    category: 'emotion',
    categoryLabel: 'Tâm trạng & Cảm xúc (擬情語)',
    visualEmoji: '💓',
    level: 'N3',
    nuanceExplanation: 'Tiếng tim đập nhanh do căng thẳng trước kỳ thi hoặc khi đứng trước người mình thầm thương trộm nhớ.',
    exampleSentence: '面接室のドアをノックする瞬間、心臓がドキドキして息が詰まりそうだった。',
    exampleReading: 'めんせつしつのドアをノックするしゅんかん、しんぞうがどきどきしていきがつづまりそうだった。',
    exampleMeaning: 'Khoảnh khắc gõ cửa phòng phỏng vấn, tim tôi đập thình thịch như muốn nghẹt thở.',
    contextQuiz: {
      question: '試験の結果発表を見る前、緊張で胸が（　　）した。',
      options: ['ドキドキ', 'ワクワク', 'イライラ', 'ソワソワ'],
      correctWord: 'ドキドキ',
      explanation: 'Hồi hộp căng thẳng tim đập nhanh -> Dùng ドキドキ.',
    },
  },
  {
    id: 'ono_2',
    word: 'ワクワク',
    reading: 'わくわく',
    meaning: 'Háo hức, ngóng trông, phấn chấn mong chờ điều tuyệt vời sắp tới',
    category: 'emotion',
    categoryLabel: 'Tâm trạng & Cảm xúc (擬情語)',
    visualEmoji: '🤩',
    level: 'N3',
    nuanceExplanation: 'Khác với ドキドキ (có thể do lo âu), ワクワク 100% mang sắc thái tích cực, mong đợi niềm vui sướng.',
    exampleSentence: '明日から始まる日本への一人旅を想像するだけで、胸がワクワクする。',
    exampleReading: 'あしたからはじまるにほんへのひとりたびをそうぞうするだけで、むねがわくわくする。',
    exampleMeaning: 'Chỉ cần tưởng tượng đến chuyến du lịch một mình đến Nhật Bản bắt đầu từ ngày mai thôi là lòng tôi đã háo hức rộn ràng.',
    contextQuiz: {
      question: '待ちに待った推しのコンサート当日、朝から（　　）が止まらない。',
      options: ['ワクワク', 'ハラハラ', 'ウロウロ', 'ギリギリ'],
      correctWord: 'ワクワク',
      explanation: 'Mong chờ buổi biểu diễn thần tượng trong niềm vui sướng rạo rực -> Dùng ワクワク.',
    },
  },
  {
    id: 'ono_3',
    word: 'ギリギリ',
    reading: 'ぎりぎり',
    meaning: 'Sát nút, suýt soát, vừa khít trong gang tấc',
    category: 'state',
    categoryLabel: 'Trạng thái & Giới hạn (擬態語)',
    visualEmoji: '⏱️',
    level: 'N2',
    nuanceExplanation: 'Diễn tả thời gian, điểm số hoặc khoảng cách chỉ vừa đủ chạm ngưỡng mà không dư dả chút nào.',
    exampleSentence: '終電の発車ベルが鳴る中、ギリギリでドアに滑り込んだ。',
    exampleReading: 'しゅうでんのはっしゃベルがなるなか、ぎりぎりでドアにすべりこんだ。',
    exampleMeaning: 'Giữa tiếng chuông báo chuyến tàu cuối vang lên, tôi đã lách người vào cửa vừa kịp sát nút.',
    contextQuiz: {
      question: '合格ラインが90点のテストで、90点を取って（　　）セーフだった。',
      options: ['ギリギリ', 'ピカピカ', 'ペラペラ', 'バラバラ'],
      correctWord: 'ギリギリ',
      explanation: 'Vừa đúng điểm chuẩn trong gang tấc -> Dùng ギリギリセーフ.',
    },
  },
  {
    id: 'ono_4',
    word: 'ペラペラ',
    reading: 'ぺらぺら',
    meaning: 'Lưu loát, trôi chảy (ngoại ngữ) / Mỏng manh / Tiết lộ bí mật dễ dàng',
    category: 'movement',
    categoryLabel: 'Năng lực & Hành vi (擬態語)',
    visualEmoji: '🗣️',
    level: 'N3',
    nuanceExplanation: 'Thường dùng nhất để khen ngợi ai đó nói tiếng Nhật lưu loát bắn như gió (日本語がペラペラ).',
    exampleSentence: '彼は日本に住んでわずか2年だが、ネイティブ並みに日本語がペラペラだ。',
    exampleReading: 'かれはにほんにすんでわずかにねんだが、ネイティブなみににほんごがぺらぺらだ。',
    exampleMeaning: 'Anh ấy mới chỉ sống ở Nhật vỏn vẹn 2 năm nhưng đã bắn tiếng Nhật lưu loát ngang ngửa người bản xứ.',
    contextQuiz: {
      question: '留学から帰ってきた彼女は、英語が（　　）話せるようになっていた。',
      options: ['ペラペラ', 'ボロボロ', 'フラフラ', 'ベタベタ'],
      correctWord: 'ペラペラ',
      explanation: 'Nói ngoại ngữ trôi chảy lưu loát -> Dùng ペラペラ.',
    },
  },
  {
    id: 'ono_5',
    word: 'ピカピカ',
    reading: 'ぴかぴか',
    meaning: 'Sáng bóng, lấp lánh, mới tinh tươm',
    category: 'state',
    categoryLabel: 'Trạng thái vật chất (擬態語)',
    visualEmoji: '✨',
    level: 'N4',
    nuanceExplanation: 'Đồ vật được lau chùi sạch sẽ không một vết bụi hoặc học sinh mới bước vào lớp 1 (ピカピカの1年生).',
    exampleSentence: '休日を利用して部屋とキッチンを徹底的に掃除し、床をピカピカに磨き上げた。',
    exampleReading: 'きゅうじつをりようしてへやとキッチンをてっていてきにそうじし、ゆかをぴかぴかにみがきあげた。',
    exampleMeaning: 'Tận dụng ngày nghỉ dọn dẹp kỹ lưỡng căn phòng và gian bếp, tôi đã đánh bóng sàn nhà sáng loáng.',
    contextQuiz: {
      question: '新しい車を洗車してワックスをかけたら、（　　）に輝いた。',
      options: ['ピカピカ', 'モヤモヤ', 'バラバラ', 'ガタガタ'],
      correctWord: 'ピカピカ',
      explanation: 'Xe mới rửa lau bóng loáng -> Dùng ピカピカ.',
    },
  },
];

export const OnomatopoeiaMaster: React.FC<{ currentLevel: JLPTLevel }> = ({ currentLevel }) => {
  const [list, setList] = useState<OnomatopoeiaItem[]>(initialOnomatopoeiaList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'emotion' | 'state' | 'movement' | 'sound'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(() =>
    historyService.getHistory('onomatopoeia')
  );

  const currentItem = list[currentIndex % list.length] || list[0];

  // Track viewed item in history
  useEffect(() => {
    if (currentItem) {
      const updated = historyService.addItem('onomatopoeia', {
        id: currentItem.id,
        title: `${currentItem.visualEmoji} ${currentItem.word}`,
        subtitle: currentItem.meaning.slice(0, 35) + '...',
        level: currentItem.level,
      });
      setHistoryItems(updated);
    }
  }, [currentItem?.id]);

  // Load More +5 Onomatopoeia Items
  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo thêm 5 từ tượng thanh / tượng hình (Onomatopoeia - オノマトペ) tiếng Nhật tần suất xuất hiện cao trong JLPT (${currentLevel} hoặc N3-N1) và giao tiếp hằng ngày.
Định dạng JSON thuần là một mảng 5 phần tử OnomatopoeiaItem:
[
  {
    "id": "ono_${Date.now()}_1",
    "word": "từ katakana/hiragana (vd: イライラ)",
    "reading": "hiragana",
    "meaning": "nghĩa tiếng Việt",
    "category": "emotion", // 'emotion' | 'state' | 'movement' | 'sound'
    "categoryLabel": "nhãn phân loại",
    "visualEmoji": "emoji liên tưởng trực quan (vd: 😤)",
    "level": "${currentLevel}",
    "nuanceExplanation": "giải thích sắc thái tinh tế",
    "exampleSentence": "câu ví dụ tiếng Nhật",
    "exampleReading": "phiên âm hiragana",
    "exampleMeaning": "dịch nghĩa tiếng Việt",
    "contextQuiz": {
      "question": "câu hỏi điền từ trong ngoặc",
      "options": ["A", "B", "C", "D"],
      "correctWord": "từ đúng",
      "explanation": "lời giải"
    }
  }
]
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = safeExtractJson<OnomatopoeiaItem[] | null>(res, null);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.filter((it) => it && it.word).slice(0, 5);
        if (valid5.length > 0) {
          setList((prev) => [...valid5, ...prev]);
          setCurrentIndex(0);
          speechService.playSuccessSound();
          return;
        }
      }
      throw new Error('Dùng 5 từ fallback');
    } catch {
      // 5 Curated High-Yield Fallbacks
      const fallbackOnos: OnomatopoeiaItem[] = [
        {
          id: `ono_fall_${Date.now()}_1`,
          word: 'イライラ',
          reading: 'いらいら',
          meaning: 'Bực bội, sốt ruột, nóng mũi khó chịu',
          category: 'emotion',
          categoryLabel: 'Tâm trạng & Cảm xúc (擬情語)',
          visualEmoji: '😤',
          level: 'N3',
          nuanceExplanation: 'Tâm trạng mất kiên nhẫn khi sự việc không như ý, xe buýt đến muộn hoặc máy tính bị đơ.',
          exampleSentence: '渋滞に巻き込まれて動かず、運転手はイライラを募らせていた。',
          exampleReading: 'じゅうたいにまきこまれてうごかず、うんてんしゅはいらいらをつのらせていた。',
          exampleMeaning: 'Bị kẹt cứng trong vụ tắc đường không nhúc nhích được, tài xế ngày càng bực bội sốt ruột.',
          contextQuiz: {
            question: 'ネットの読み込みが遅すぎて、（　　）が募る。',
            options: ['イライラ', 'ウキウキ', 'サラサラ', 'ツルツル'],
            correctWord: 'イライラ',
            explanation: 'Mạng load chậm gây bực mình sốt ruột -> Dùng イライラ.',
          },
        },
        {
          id: `ono_fall_${Date.now()}_2`,
          word: 'バラバラ',
          reading: 'ばらばら',
          meaning: 'Rời rạc, tan tác, không đồng nhất / Lộp độp (tiếng mưa)',
          category: 'state',
          categoryLabel: 'Trạng thái vật chất (擬態語)',
          visualEmoji: '🧩',
          level: 'N3',
          nuanceExplanation: 'Ý kiến của các thành viên không thống nhất mỗi người một phách, hoặc đồ vật rơi vỡ tung tóe.',
          exampleSentence: '会議で意見がバラバラに対立し、結論を出すことができなかった。',
          exampleReading: 'かいぎでいけんがばらばらにたいりつし、けつろんをだすことができなかった。',
          exampleMeaning: 'Tại cuộc họp các ý kiến rời rạc đối lập nhau nên không thể đưa ra kết luận.',
          contextQuiz: {
            question: 'チーム全員の意見が（　　）で、方針がまとまらない。',
            options: ['バラバラ', 'ペラペラ', 'ベタベタ', 'ドキドキ'],
            correctWord: 'バラバラ',
            explanation: 'Ý kiến rời rạc không ăn khớp -> Dùng バラバラ.',
          },
        },
        {
          id: `ono_fall_${Date.now()}_3`,
          word: 'サラサラ',
          reading: 'さらさら',
          meaning: 'Mượt mà óng ả (tóc) / Róc rách (nước suối) / Khô ráo',
          category: 'state',
          categoryLabel: 'Trạng thái & Âm thanh (擬態語)',
          visualEmoji: '💇‍♀️',
          level: 'N2',
          nuanceExplanation: 'Cảm giác chạm vào mái tóc suôn mượt không bết dính, hoặc dòng suối chảy êm đềm róc rách.',
          exampleSentence: 'トリートメントを変えたら、髪の毛が指通りよくサラサラになった。',
          exampleReading: 'トリートメントをかえたら、かみのけがゆびどおりよくさらさらになった。',
          exampleMeaning: 'Sau khi đổi loại dầu xả ủ tóc, mái tóc tôi đã trở nên suôn mượt luồn tay vào rất thích.',
          contextQuiz: {
            question: '春の小川が（　　）と心地よい音を立てて流れている。',
            options: ['サラサラ', 'ガタガタ', 'ネバネバ', 'ボロボロ'],
            correctWord: 'サラサラ',
            explanation: 'Nước suối chảy êm róc rách -> Dùng サラサラ.',
          },
        },
        {
          id: `ono_fall_${Date.now()}_4`,
          word: 'ウロウロ',
          reading: 'うろうろ',
          meaning: 'Đi lòng vòng, lảng vảng không mục đích (do lạc đường hoặc mờ ám)',
          category: 'movement',
          categoryLabel: 'Chuyển động hành vi (擬態語)',
          visualEmoji: '🚶‍♂️',
          level: 'N2',
          nuanceExplanation: 'Người đi qua đi lại một khu vực vì không biết đường hoặc kẻ khả nghi lởn vởn quanh nhà.',
          exampleSentence: '道に迷ってしまい、同じ住宅街を30分もウロウロ歩き回っていた。',
          exampleReading: 'みちにまよってしまい、おなじじゅうたくがいをさんじゅっぷんもうろうろあるきまわっていた。',
          exampleMeaning: 'Bị lạc đường nên tôi đã đi lòng vòng quanh cùng một khu dân cư suốt 30 phút.',
          contextQuiz: {
            question: '見慣れない不審な人物が、近所を（　　）歩き回っている。',
            options: ['ウロウロ', 'ピカピカ', 'ワクワク', 'ハラハラ'],
            correctWord: 'ウロウロ',
            explanation: 'Lảng vảng đi lại quanh quẩn -> Dùng ウロウロ.',
          },
        },
        {
          id: `ono_fall_${Date.now()}_5`,
          word: 'ボロボロ',
          reading: 'ぼろぼろ',
          meaning: 'Rách rưới, tơi tả, kiệt sức tàn tạ / Nước mắt rơi lã chã',
          category: 'state',
          categoryLabel: 'Trạng thái & Cảm xúc (擬態語)',
          visualEmoji: '🥀',
          level: 'N3',
          nuanceExplanation: 'Quần áo cũ rách nát, hoặc trạng thái tinh thần kiệt quệ sau chuỗi ngày làm việc quá sức.',
          exampleSentence: '連日の残業と徹夜続きで、心身ともにボロボロの状態だった。',
          exampleReading: 'れんじつのざんぎょうとてつやづづきで、しんしんともにぼろぼろのじょうたいだった。',
          exampleMeaning: 'Sau chuỗi ngày tăng ca và thức trắng đêm liên tiếp, cả thể xác lẫn tinh thần tôi đều tơi tả rã rời.',
          contextQuiz: {
            question: '長年使い続けた辞書の表紙が、すっかり（　　）になってしまった。',
            options: ['ボロボロ', 'ツルツル', 'サラサラ', 'キラキラ'],
            correctWord: 'ボロボロ',
            explanation: 'Bìa từ điển cũ rách tả tơi theo năm tháng -> Dùng ボロボロ.',
          },
        },
      ];

      setList((prev) => [...fallbackOnos, ...prev]);
      setCurrentIndex(0);
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  const filteredList = list.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    if (!matchCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.word.includes(q) ||
      item.reading.includes(q) ||
      item.meaning.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <span className="font-display">Phòng Thí Nghiệm Từ Tượng Thanh & Tượng Hình</span>
              <span className="text-xs font-mono text-purple-400 bg-purple-950/60 border border-purple-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Onomatopoeia オノマトペ Lab</span>
              </span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Chinh phục Mondai 1/2 JLPT & Giao tiếp tự nhiên như người bản xứ. Hình ảnh liên tưởng emoji sinh động, audio chuẩn Tokyo & Thử thách đoán từ theo ngữ cảnh.
          </p>
        </div>

        {/* Load More +5 Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải thêm 5 từ tượng thanh/hình mới mỗi lần bấm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải nạp thêm (+5 Từ tượng thanh / hình)</span>
          </button>
        </div>
      </div>

      {/* Viewed History Ribbon */}
      {historyItems.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 text-purple-400 shrink-0 font-semibold">
            <History className="w-3.5 h-3.5" />
            <span>Đã xem ({historyItems.length}):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-0.5">
            {historyItems.slice(0, 12).map((h) => {
              const idx = list.findIndex((it) => it.id === h.id);
              return (
                <button
                  key={h.id}
                  onClick={() => {
                    if (idx >= 0) {
                      setCurrentIndex(idx);
                      setQuizAnswer(null);
                      speechService.playSuccessSound();
                    }
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition-all shrink-0 ${
                    currentItem.id === h.id
                      ? 'bg-purple-600 border-purple-400 text-white font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                  title={h.subtitle}
                >
                  <span className="font-jp font-bold text-purple-200">{h.title}</span>
                  {h.level && <span className="text-[9px] text-slate-400">[{h.level}]</span>}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              historyService.clearHistory('onomatopoeia');
              setHistoryItems([]);
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 ml-auto shrink-0 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800"
            title="Xóa lịch sử từ tượng thanh"
          >
            Xóa
          </button>
        </div>
      )}

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'emotion', label: 'Cảm xúc (ドキドキ)', icon: Heart },
            { id: 'state', label: 'Trạng thái (ピカピカ)', icon: Sparkles },
            { id: 'movement', label: 'Hành vi (ウロウロ)', icon: Activity },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 border ${
                activeCategory === cat.id
                  ? 'bg-purple-600 border-purple-500 text-white shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm từ (vd: ドキドキ, sát nút)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Interactive Main Spotlight Card & Quiz */}
      {currentItem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visual Flash Spotlight */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Huge Emoji Badge */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-950/70 to-slate-950 border border-purple-700/50 flex items-center justify-center text-3xl shadow-inner shrink-0">
                  {currentItem.visualEmoji}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                      {currentItem.level}
                    </span>
                    <span className="text-xs font-medium text-slate-400">{currentItem.categoryLabel}</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold font-jp text-slate-100 tracking-wider">
                    {currentItem.word}
                  </div>
                  <div className="text-xs font-jp text-slate-400">({currentItem.reading})</div>
                </div>
              </div>

              <button
                onClick={() => speechService.speak(currentItem.word)}
                className="p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-all cursor-pointer shadow-md shrink-0"
                title="Nghe phát âm chuẩn Tokyo"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Meaning & Nuance */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Ý nghĩa tiếng Việt:
              </div>
              <div className="text-sm md:text-base font-semibold text-slate-100">
                {currentItem.meaning}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
                {currentItem.nuanceExplanation}
              </p>
            </div>

            {/* Example in Context */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Câu ví dụ hội thoại tự nhiên:
                </span>
                <button
                  onClick={() => speechService.speak(currentItem.exampleSentence)}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu</span>
                </button>
              </div>
              <div className="text-sm font-jp text-slate-100 font-medium leading-relaxed">
                {currentItem.exampleSentence}
              </div>
              <div className="text-xs font-jp text-slate-400">{currentItem.exampleReading}</div>
              <div className="text-xs text-slate-300 italic pt-1 border-t border-slate-800/80">
                {currentItem.exampleMeaning}
              </div>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
                  setQuizAnswer(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
              >
                ← Từ trước
              </button>
              <span className="text-xs text-slate-400 font-mono">
                {((currentIndex % list.length) + 1)} / {list.length}
              </span>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev + 1) % list.length);
                  setQuizAnswer(null);
                }}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Từ kế tiếp →
              </button>
            </div>
          </div>

          {/* Right: Quick Context Quiz */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs">
                  <Award className="w-4 h-4" />
                  <span>Thử Thách Đoán Từ Đúng Ngữ Cảnh</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                <div className="text-xs text-slate-400 mb-1">Điền từ tượng thanh thích hợp vào chỗ trống:</div>
                <div className="text-sm md:text-base font-jp font-medium text-slate-100 leading-relaxed">
                  {currentItem.contextQuiz.question}
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2.5">
                {currentItem.contextQuiz.options.map((opt) => {
                  const isCorrect = opt === currentItem.contextQuiz.correctWord;
                  const isSelected = quizAnswer === opt;
                  let style = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

                  if (quizAnswer !== null) {
                    if (isCorrect) {
                      style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected) {
                      style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        if (quizAnswer === null) {
                          setQuizAnswer(opt);
                          if (isCorrect) speechService.playSuccessSound();
                          else speechService.playErrorSound();
                        }
                      }}
                      disabled={quizAnswer !== null}
                      className={`p-3 rounded-xl border text-sm font-jp font-bold transition-all cursor-pointer ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {quizAnswer !== null && (
                <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs space-y-2 animate-fadeIn">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đáp án chuẩn: {currentItem.contextQuiz.correctWord}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{currentItem.contextQuiz.explanation}</p>
                </div>
              )}
            </div>

            {/* Quick Strip */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Kho từ tượng thanh sẵn sàng ({filteredList.length}):
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto pr-1">
                {filteredList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      const idx = list.findIndex((it) => it.id === item.id);
                      if (idx >= 0) setCurrentIndex(idx);
                      setQuizAnswer(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-jp transition-colors cursor-pointer flex items-center gap-1 ${
                      item.id === currentItem.id
                        ? 'bg-purple-600 border-purple-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{item.visualEmoji}</span>
                    <span>{item.word}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
