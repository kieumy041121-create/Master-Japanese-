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
  XCircle,
  HelpCircle,
  History,
  Layers,
  Scale,
  ShieldAlert,
  ArrowRight,
  Eye,
  ChevronLeft,
  ChevronRight,
  Plus,
  BookOpen,
} from 'lucide-react';

export interface ConfusingGrammarPair {
  id: string;
  patternA: string;
  patternB: string;
  level: JLPTLevel;
  title: string;
  coreDifference: string;
  patternADetails: {
    meaning: string;
    nuance: string;
    structure: string;
    triggerWords: string[];
    example: string;
    reading: string;
    translation: string;
  };
  patternBDetails: {
    meaning: string;
    nuance: string;
    structure: string;
    triggerWords: string[];
    example: string;
    reading: string;
    translation: string;
  };
  jeesTrapAnalysis: string;
  practiceQuestion: {
    sentence: string;
    blankTarget: string;
    correctPattern: 'A' | 'B';
    options: string[];
    explanation: string;
  };
}

const initialGrammarPairs: ConfusingGrammarPair[] = [
  {
    id: 'cgp_1',
    patternA: '〜わけではない',
    patternB: '〜わけがない',
    level: 'N3',
    title: 'Phủ định một phần vs Phủ định tuyệt đối',
    coreDifference: '〜わけではない phủ nhận một phần ("không hẳn là..."), còn 〜わけがない phủ định triệt để ("tuyệt đối không thể nào...").',
    patternADetails: {
      meaning: 'Không hẳn là, không có nghĩa là (Phủ định một phần)',
      nuance: 'Thừa nhận khả năng nhưng không hoàn toàn 100%. Mang sắc thái thanh minh nhẹ nhàng.',
      structure: 'V/A-i/A-na/N + わけではない',
      triggerWords: ['必ずしも (không nhất thiết)', 'すべて (tất cả)', '嫌いではない (không ghét)'],
      example: '日本語が話せないわけではないが、まだビジネスレベルには達していない。',
      reading: 'にほんごがはなせないわけではないが、まだビジネスレベルにはたっしていない。',
      translation: 'Không hẳn là tôi không nói được tiếng Nhật, nhưng vẫn chưa đạt tới mức dùng trong kinh doanh.',
    },
    patternBDetails: {
      meaning: 'Tuyệt đối không thể nào có chuyện... (Phủ định 100%)',
      nuance: 'Khẳng định dựa trên lý lẽ chắc nịch rằng điều đó là bất khả thi.',
      structure: 'V/A-i/A-na/N + わけがない (hoặc わけはない)',
      triggerWords: ['絶対に (tuyệt đối)', 'ありえない (không thể có)', 'そんなはずはない (không lý nào)'],
      example: '真面目な彼が、会社の機密データを外部に流出させるわけがない。',
      reading: 'まじめなかれが、かいしゃのきみつデータをがいぶにりゅうしゅつさせるわけがない。',
      translation: 'Một người nghiêm túc như anh ấy tuyệt đối không thể nào làm rò rỉ dữ liệu mật của công ty ra bên ngoài.',
    },
    jeesTrapAnalysis: 'Bẫy JEES: Đề thi thường đưa câu có phó từ 必ずしも (không nhất thiết) để gài thí sinh. Gặp 必ずしも -> Chọn ngay わけではない!',
    practiceQuestion: {
      sentence: '毎日勉強したからといって、試験に必ず合格できる（　　）。油断は禁物だ。',
      blankTarget: '〜わけではない',
      correctPattern: 'A',
      options: ['わけではない', 'わけがない', 'はずがない', 'わけにはいかない'],
      explanation: 'Trong câu có「からといって (cho dù là)」và「必ず (nhất thiết)」biểu thị phủ định một phần -> Chọn わけではない.',
    },
  },
  {
    id: 'cgp_2',
    patternA: '〜に関して (にかんして)',
    patternB: '〜に対して (にたいして)',
    level: 'N2',
    title: 'Về đề tài thông tin vs Hướng tới đối tượng tác động / Đối lập',
    coreDifference: '〜に関して dùng khi trình bày thông tin/nghiên cứu về một chủ đề. 〜に対して dùng cho hành động hướng đến đối tượng hoặc so sánh tương phản hai vế.',
    patternADetails: {
      meaning: 'Về vấn đề, liên quan đến (Phạm vi thông tin rộng)',
      nuance: 'Trịnh trọng hơn について, hay đi với động từ điều tra (調査), nghiên cứu (研究), thông báo (発表).',
      structure: 'N + に関して / に関する + N',
      triggerWords: ['調査', '研究', '発表', '意見', '質問'],
      example: '今回のシステム障害の原因に関して、現在専門チームが詳細を調査中です。',
      reading: 'こんかいのシステムしょうがいのげんいんにかんして、げんざいせんもんチームがしょうさいをちょうさちゅうです。',
      translation: 'Về nguyên nhân gây ra sự cố hệ thống lần này, hiện đội ngũ chuyên gia đang điều tra chi tiết.',
    },
    patternBDetails: {
      meaning: 'Đối với (hướng thái độ tới ai) / Trái ngược với (tương phản)',
      nuance: 'Chỉ thái độ trực tiếp (cảm ơn, xin lỗi, bất mãn) hoặc so sánh 2 đối tượng đối lập.',
      structure: 'N + に対して / に対する + N',
      triggerWords: ['厳しい', '感謝', '不満', '〜の一方で'],
      example: '店長はお客様に対しては丁寧だが、アルバイトに対してはとても厳しい。',
      reading: 'てんちょうはおきゃくさまにたいしてはていねいだが、アルバイトにたいしてはとてもきびしい。',
      translation: 'Cửa hàng trưởng đối với khách hàng thì rất lịch thiệp, nhưng đối với nhân viên làm thêm thì cực kỳ nghiêm khắc.',
    },
    jeesTrapAnalysis: 'Bẫy JEES: Nếu câu chứa thái độ cảm xúc (lịch thiệp, nghiêm khắc, khiếu nại) -> Bắt buộc dùng に対して, không thể dùng に関して!',
    practiceQuestion: {
      sentence: '若者の読書離れ（　　）アンケート調査を実施したところ、興味深い結果が得られた。',
      blankTarget: '〜に関して',
      correctPattern: 'A',
      options: ['に関して', 'に対して', 'にとって', 'を通じて'],
      explanation: 'Đi với khảo sát/nghiên cứu (アンケート調査) về một đề tài -> Chọn に関して.',
    },
  },
  {
    id: 'cgp_3',
    patternA: '〜つつある',
    patternB: '〜一方だ (いっぽうだ)',
    level: 'N2',
    title: 'Xu hướng dần dần tiến triển vs Xu hướng biến đổi cực đoan liên tục',
    coreDifference: '〜つつある mang tính trung tính, diễn tiến từ từ từng bước. 〜一方だ nhấn mạnh xu hướng biến đổi gia tăng không ngừng, thường mang chiều hướng tiêu cực hoặc lo ngại.',
    patternADetails: {
      meaning: 'Đang dần dần biến đổi theo thời gian (Tiến trình)',
      nuance: 'Trang trọng, báo chí, mô tả hiện tượng đang trong đà phục hồi hoặc biến chuyển chậm rãi.',
      structure: 'V-masu (bỏ masu) + つつある',
      triggerWords: ['景気', '回復', '改善', '変化'],
      example: '長引く不況から脱し、国内の景気は緩やかに回復しつつある。',
      reading: 'ながびくふきょうからだっし、こくないのけいきはゆるやかにかいふくしつつある。',
      translation: 'Thoát khỏi suy thoái kéo dài, tình hình kinh tế trong nước đang dần dần hồi phục chậm rãi.',
    },
    patternBDetails: {
      meaning: 'Càng ngày càng... theo một chiều hướng (Gia tăng cực đoan)',
      nuance: 'Nhấn mạnh sự mất cân bằng, không có dấu hiệu dừng lại, đa số là chiều hướng xấu (giá cả tăng, sức khỏe giảm).',
      structure: 'V-ru (thể từ điển biến đổi) + 一方だ',
      triggerWords: ['悪化する', '増える', '上がる', '下がる'],
      example: '少子高齢化が進み、地方都市の過疎化は深刻化する一方だ。',
      reading: 'しょうしこうれいかがすすみ、ちほうとしのかそかはしんこくかするいっぽうだ。',
      translation: 'Sinh ít già hóa gia tăng, tình trạng hoang hóa ở các đô thị địa phương ngày càng trở nên nghiêm trọng.',
    },
    jeesTrapAnalysis: 'Bẫy JEES: Chú ý liên kết ngữ pháp! 〜つつある đi với thể ます bỏ ます (回復しつつある), còn 〜一方だ đi với thể nguyên mẫu る (深刻化する一方だ).',
    practiceQuestion: {
      sentence: '円安の影響で輸入原材料の価格が上がり、会社の利益は減る（　　）。',
      blankTarget: '〜一方だ',
      correctPattern: 'B',
      options: ['一方だ', 'つつある', 'きりだ', 'ばかりだ'],
      explanation: 'Động từ thể từ điển「減る」kết hợp chiều hướng xấu liên tục -> Chọn 一方だ (減る一方だ).',
    },
  },
  {
    id: 'cgp_4',
    patternA: '〜によって',
    patternB: '〜を通じて (をつうじて)',
    level: 'N2',
    title: 'Phương tiện cụ thể / Nguyên nhân vs Cầu nối trung gian / Xuyên suốt thời gian',
    coreDifference: '〜によって chỉ phương pháp cụ thể hoặc nguyên nhân trực tiếp sinh ra kết quả. 〜を通じて chỉ cầu nối trung gian gián tiếp hoặc xuyên suốt một khoảng thời gian.',
    patternADetails: {
      meaning: 'Bằng cách, do nguyên nhân (Phương tiện, Tác nhân)',
      nuance: 'Tạo ra kết quả trực tiếp; cũng dùng trong câu bị động chỉ tác giả (〜によって作られた).',
      structure: 'N + によって / による + N',
      triggerWords: ['技術', '事故', '努力', '法律'],
      example: '最新のAI技術を活用することによって、業務効率を大幅に改善した。',
      reading: 'さいしんのAIぎじゅつをかつようすることによって、ぎょうむこうりつをおおはばにかいぜんした。',
      translation: 'Bằng cách ứng dụng công nghệ AI mới nhất, chúng tôi đã cải thiện đáng kể hiệu suất công việc.',
    },
    patternBDetails: {
      meaning: 'Thông qua (cầu nối gián tiếp) / Suốt cả (thời gian)',
      nuance: 'Người làm việc đó không trực tiếp mà qua một phương tiện truyền thông, người môi giới hoặc sự kiện.',
      structure: 'N + を通じて / を通して',
      triggerWords: ['友人', 'インターネット', '四季', '一年'],
      example: '知人の紹介を通じて、尊敬する経営者の方とお会いすることができた。',
      reading: 'ちじんのしょうかいをつうじて、そんけいするけいえいしゃのかたとおあいすることができた。',
      translation: 'Thông qua lời giới thiệu của người quen, tôi đã có cơ hội diện kiến vị giám đốc mà mình vô cùng kính trọng.',
    },
    jeesTrapAnalysis: 'Bẫy JEES: Nếu danh từ là khoảng thời gian (1 năm, 4 mùa, cả cuộc đời) -> Chắc chắn là を通じて (hoặc を通して), không thể dùng によって!',
    practiceQuestion: {
      sentence: 'ボランティア活動（　　）、かけがえのない仲間と出会うことができた。',
      blankTarget: '〜を通じて',
      correctPattern: 'B',
      options: ['を通じて', 'によって', 'にかけて', 'に応じて'],
      explanation: 'Xem hoạt động tình nguyện là chiếc cầu nối gián tiếp đem lại cơ duyên gặp gỡ -> Chọn を通じて.',
    },
  },
  {
    id: 'cgp_5',
    patternA: '〜に相違ない (にそういない)',
    patternB: '〜に違いない (にちがいない)',
    level: 'N1',
    title: 'Phán đoán trang trọng văn viết vs Phán đoán trực giác chắc chắn',
    coreDifference: 'Cả hai đều nghĩa "chắc chắn là", nhưng 〜に相違ない mang tính văn thư pháp lý, phán đoán dựa trên chứng cớ khách quan, còn 〜に違いない mang tính khẩu ngữ/phán đoán cá nhân.',
    patternADetails: {
      meaning: 'Chắc chắn là, không thể sai lệch (Văn bản pháp lý, trang trọng N1)',
      nuance: 'Dùng trong báo cáo chính thức, văn phong nghị luận, dựa trên tài liệu xác đáng.',
      structure: 'Thể thông thường (N/A-na bỏ da) + に相違ない',
      triggerWords: ['証拠', '犯人', '事実', '公式発表'],
      example: '現場に残された指紋から判断して、彼が犯人であることに相違ない。',
      reading: 'げんばにのこされたしもんからはんだんして、かれがはんにんであることにそういない。',
      translation: 'Phán đoán từ dấu vân tay còn lưu lại hiện trường, chắc chắn anh ta chính là thủ phạm không thể sai lệch.',
    },
    patternBDetails: {
      meaning: 'Chắc chắn là (Trực giác mạnh mẽ N3/N2)',
      nuance: 'Người nói có linh cảm hoặc suy đoán với độ tin cậy trên 90% trong sinh hoạt thường nhật.',
      structure: 'Thể thông thường (N/A-na bỏ da) + に違いない',
      triggerWords: ['絶対に', 'きっと', '疲れている', '喜ぶ'],
      example: '彼にあんな大きなプレゼントを渡したら、飛び跳ねて喜ぶに違いない。',
      reading: 'かれにあんなおおきなプレゼントをわたしたら、とびはねてよろこぶにちがいない。',
      translation: 'Nếu tặng anh ấy món quà lớn như thế, chắc chắn anh ấy sẽ nhảy cẫng lên vì vui sướng.',
    },
    jeesTrapAnalysis: 'Bẫy JEES N1: Khi văn bản là công văn, luận văn khoa học hay thông cáo cảnh sát -> に相違ない là phương án chuẩn.',
    practiceQuestion: {
      sentence: '確固たるデータが示す通り、この新薬が難病治療の突破口となるに（　　）。',
      blankTarget: '〜相違ない',
      correctPattern: 'A',
      options: ['相違ない', '違いない', 'かぎらない', 'すぎない'],
      explanation: 'Câu văn có「確固たるデータ (dữ liệu vững chắc)」trong bối cảnh y khoa trang trọng N1 -> Chọn 相違ない.',
    },
  },
];

export const ConfusingGrammarLab: React.FC<{ currentLevel: JLPTLevel }> = ({ currentLevel }) => {
  const [list, setList] = useState<ConfusingGrammarPair[]>(initialGrammarPairs);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [userSelectedPattern, setUserSelectedPattern] = useState<'A' | 'B' | null>(null);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(() =>
    historyService.getHistory('confusing_grammar')
  );

  const currentPair = list[currentIndex % list.length] || list[0];

  // Track viewed grammar pair in history
  useEffect(() => {
    if (currentPair) {
      const updated = historyService.addItem('confusing_grammar', {
        id: currentPair.id,
        title: `${currentPair.patternA} vs ${currentPair.patternB}`,
        subtitle: currentPair.title,
        level: currentPair.level,
      });
      setHistoryItems(updated);
    }
  }, [currentPair?.id]);

  // Load More +5 Confusing Grammar Pairs
  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo thêm 5 Cặp ngữ pháp tiếng Nhật đồng nghĩa hoặc cực kỳ dễ gây nhầm lẫn/bẫy thí sinh trong đề thi JLPT (${currentLevel} hoặc N1/N2/N3).
Định dạng JSON thuần là một mảng 5 phần tử ConfusingGrammarPair:
[
  {
    "id": "cgp_${Date.now()}_1",
    "patternA": "mẫu A",
    "patternB": "mẫu B",
    "level": "${currentLevel}",
    "title": "Chủ đề phân biệt",
    "coreDifference": "Khác biệt cốt lõi tóm gọn trong 1 câu",
    "patternADetails": {
      "meaning": "Ý nghĩa A",
      "nuance": "Sắc thái A",
      "structure": "Cấu trúc A",
      "triggerWords": ["từ khóa 1", "từ khóa 2"],
      "example": "câu ví dụ tiếng Nhật A",
      "reading": "phiên âm hiragana câu A",
      "translation": "dịch nghĩa tiếng Việt câu A"
    },
    "patternBDetails": {
      "meaning": "Ý nghĩa B",
      "nuance": "Sắc thái B",
      "structure": "Cấu trúc B",
      "triggerWords": ["từ khóa 1", "từ khóa 2"],
      "example": "câu ví dụ tiếng Nhật B",
      "reading": "phiên âm hiragana câu B",
      "translation": "dịch nghĩa tiếng Việt câu B"
    },
    "jeesTrapAnalysis": "Phân tích bẫy đề thi JEES hay ra",
    "practiceQuestion": {
      "sentence": "câu hỏi trắc nghiệm tiếng Nhật",
      "blankTarget": "đáp án",
      "correctPattern": "A",
      "options": ["A", "B", "C", "D"],
      "explanation": "giải thích vì sao chọn"
    }
  }
]
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = safeExtractJson<ConfusingGrammarPair[] | null>(res, null);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.filter((it) => it && it.patternA && it.patternB).slice(0, 5);
        if (valid5.length > 0) {
          setList((prev) => [...valid5, ...prev]);
          setCurrentIndex(0);
          speechService.playSuccessSound();
          return;
        }
      }
      throw new Error('Dùng fallback 5 cặp ngữ pháp');
    } catch {
      // 5 Curated High-Yield Fallback Pairs
      const fallbackPairs: ConfusingGrammarPair[] = [
        {
          id: `cgp_fall_${Date.now()}_1`,
          patternA: '〜まい',
          patternB: '〜ものか (もんか)',
          level: 'N1',
          title: 'Quyết tâm không làm (Văn viết N1) vs Phủ định mạnh mẽ (Khẩu ngữ)',
          coreDifference: '〜まい thể hiện ý chí quyết không làm nữa hoặc suy đoán phủ định trong văn trang trọng. 〜ものか là phủ định tuyệt đối biểu lộ cảm xúc bức xúc trong khẩu ngữ.',
          patternADetails: {
            meaning: 'Quyết không làm nữa / Chắc không... (Văn viết trang trọng)',
            nuance: 'Ý chí kiên quyết tự hứa với bản thân sẽ từ bỏ hoặc không lặp lại sai lầm.',
            structure: 'V-ru (Nhóm 1) / V-masu bỏ masu (Nhóm 2, 3) + まい',
            triggerWords: ['二度と', '決して', '言うまい'],
            example: 'あのような屈辱的な思いは、二度とするまいと心に固く誓った。',
            reading: 'あのようなくつじょくてきなおもいは、にどとするまいとこころにかたくちかった。',
            translation: 'Tôi đã thề chắc nịch trong lòng rằng quyết sẽ không bao giờ để bản thân phải chịu cảm giác nhục nhã như thế thêm lần thứ hai.',
          },
          patternBDetails: {
            meaning: 'Tuyệt đối không thèm... / Làm gì có chuyện đó! (Khẩu ngữ cảm thán)',
            nuance: 'Phủ định gay gắt kèm cảm xúc giận dỗi hoặc bất mãn.',
            structure: 'Thể thông thường + ものか',
            triggerWords: ['二度と行くか', '負けるもんか'],
            example: 'あんな失礼な態度を取る店には、二度と行くものか。',
            reading: 'あんなしつれいなたいどをとるみせには、にどといくものか。',
            translation: 'Cái quán phục vụ với thái độ bất lịch sự như thế thì tôi tuyệt đối không bao giờ thèm bước chân đến lần thứ hai đâu!',
          },
          jeesTrapAnalysis: 'Bẫy JEES: Đi với「と誓った (thề rằng)」-> Bắt buộc là 〜まい. Đi trong câu hội thoại suồng sã -> 〜ものか.',
          practiceQuestion: {
            sentence: 'どんなに困難な壁にぶつかっても、途中で諦める（　　）と自分を奮い立たせた。',
            blankTarget: '〜まい',
            correctPattern: 'A',
            options: ['まい', 'ものか', 'わけがない', 'はずがない'],
            explanation: 'Ý chí tự nhủ với bản thân「と自分を奮い立たせた」-> Dùng まい.',
          },
        },
        {
          id: `cgp_fall_${Date.now()}_2`,
          patternA: '〜以上は (いじょうは)',
          patternB: '〜からには',
          level: 'N2',
          title: 'Một khi đã... thì phải (Trách nhiệm đạo đức vs Quyết tâm cá nhân)',
          coreDifference: 'Cả hai đều mang nghĩa "Một khi đã... thì đương nhiên phải...", nhưng 〜以上は nghiêng về nghĩa vụ/trách nhiệm xã hội hiển nhiên, còn 〜からには nghiêng về ý chí/quyết tâm mãnh liệt của bản thân.',
          patternADetails: {
            meaning: 'Một khi đã... thì đương nhiên (Nghĩa vụ, chuẩn mực xã hội)',
            nuance: 'Vế sau thường là câu chỉ nghĩa vụ, bổn phận (〜べきだ, 〜なければならない).',
            structure: 'Thể thông thường (V/A/Nである) + 以上は',
            triggerWords: ['契約を結んだ', '引き受けた', '大人である'],
            example: '契約書にサインした以上は、規則を厳守しなければなりません。',
            reading: 'けいやくしょにサインしたいじょうは、きそくをげんしゅしなければなりません。',
            translation: 'Một khi đã đặt bút ký vào hợp đồng thì bạn có nghĩa vụ phải tuân thủ nghiêm ngặt các điều khoản quy định.',
          },
          patternBDetails: {
            meaning: 'Một khi đã... thì nhất định sẽ (Quyết chí, khát khao)',
            nuance: 'Vế sau là ý chí, mong muốn cá nhân (〜たい, 〜つもりだ, 〜てみせる).',
            structure: 'Thể thông thường (V/Nである) + からには',
            triggerWords: ['挑戦する', '目指す', '優勝する'],
            example: 'JLPT N1を受験するからには、満点合格を目指して全力を尽くす。',
            reading: 'JLPT N1をじゅけんするからには、まんてんごうかくをめざしてぜんりょくをつくす。',
            translation: 'Một khi đã bước vào kỳ thi JLPT N1, tôi sẽ dốc toàn lực nhắm tới mục tiêu đỗ điểm tối đa.',
          },
          jeesTrapAnalysis: 'Bẫy JEES: Nhìn vế sau câu! Vế sau có「〜てみせる (sẽ làm cho xem)」thì chọn からには; vế sau có「〜べきだ (nên/phải)」thì chọn 以上は.',
          practiceQuestion: {
            sentence: 'プロジェクトのリーダーを引き受けた（　　）、最後まで責任を持ってやり遂げるべきだ。',
            blankTarget: '〜以上は',
            correctPattern: 'A',
            options: ['以上は', 'からには', 'ものの', 'うえは'],
            explanation: 'Vế sau là bổn phận trách nhiệm「〜べきだ」-> Chọn 以上は.',
          },
        },
        {
          id: `cgp_fall_${Date.now()}_3`,
          patternA: '〜にほかならない',
          patternB: '〜にすぎない',
          level: 'N2',
          title: 'Chính xác là vì... (Khẳng định duy nhất) vs Chẳng qua chỉ là... (Hạ thấp mức độ)',
          coreDifference: '〜にほかならない khẳng định tuyệt đối đó là lý do duy nhất ("không gì khác chính là"). 〜にすぎない hạ thấp tầm quan trọng ("chẳng qua chỉ là, không hơn không kém").',
          patternADetails: {
            meaning: 'Chính là, không gì khác ngoài (Khẳng định lý do độc tôn)',
            nuance: 'Trang trọng, nhấn mạnh nguyên nhân cốt lõi làm nên thành công.',
            structure: 'N + にほかならない',
            triggerWords: ['努力の結果', '愛', '熱意'],
            example: '彼がコンテストで優勝できたのは、日々の地道な努力の賜物にほかならない。',
            reading: 'かれがコンテストでゆうしょうできたのは、ひびのじみちなどりょくのたまものにほかならない。',
            translation: 'Việc anh ấy giành giải quán quân trong cuộc thi chính là thành quả từ sự nỗ lực bền bỉ mỗi ngày, không gì khác.',
          },
          patternBDetails: {
            meaning: 'Chẳng qua chỉ là, chỉ dừng lại ở mức (Hạ thấp)',
            nuance: 'Nhấn mạnh sự việc không đáng kể, không nghiêm trọng như người ta tưởng.',
            structure: 'Thể thông thường + にすぎない',
            triggerWords: ['一因', '噂', '言い訳'],
            example: '今回の成功は偶然の幸運にすぎず、実力がついたわけではない。',
            reading: 'こんかいのせいこうはぐうぜんのこううんにすぎず、じつりょくがついたわけではない。',
            translation: 'Thành công lần này chẳng qua chỉ là may mắn ngẫu nhiên, chứ không hẳn là do thực lực bản thân.',
          },
          jeesTrapAnalysis: 'Bẫy JEES: Nếu câu mang tính khen ngợi, khẳng định nguyên nhân lớn lao -> にほかならない. Nếu mang tính khiêm tốn, coi nhẹ -> にすぎない.',
          practiceQuestion: {
            sentence: '親が子供を厳しく叱るのは、子供の将来を深く案じる親心（　　）。',
            blankTarget: '〜にほかならない',
            correctPattern: 'A',
            options: ['にほかならない', 'にすぎない', 'に限らない', '相違ない'],
            explanation: 'Khẳng định tình yêu thương của cha mẹ là nguyên nhân duy nhất -> Chọn にほかならない.',
          },
        },
        {
          id: `cgp_fall_${Date.now()}_4`,
          patternA: '〜ものがある',
          patternB: '〜ことか',
          level: 'N2',
          title: 'Có cảm giác thật là... (Đánh giá khách quan) vs Biết bao nhiêu! (Cảm thán chủ quan)',
          coreDifference: '〜ものがある dùng nhận xét về tính chất của sự việc ("có cái gì đó rất..."). 〜ことか đi kèm từ để hỏi biểu thị sự cảm thán tột cùng ("biết bao nhiêu!").',
          patternADetails: {
            meaning: 'Có cái gì đó thật là... (Có cảm giác sâu sắc)',
            nuance: 'Dùng khi người nói nhìn nhận một phẩm chất chạm đến tâm can.',
            structure: 'A-i / A-na + な / V-ru + ものがある',
            triggerWords: ['感慨深い', '見るべき', '惜しい'],
            example: '彼のひたむきな努力の軌跡には、胸を打つものがある。',
            reading: 'かれのひたむきなどりょくのきせきには、むねをうつものがある。',
            translation: 'Trong chặng đường nỗ lực hết mình của anh ấy, có điều gì đó thực sự làm lay động lòng người.',
          },
          patternBDetails: {
            meaning: 'Biết bao nhiêu! (Cảm thán cực độ)',
            nuance: 'Luôn đi kèm phó từ cảm thán「どんなに (biết bao)」「どれほど (dường nào)」.',
            structure: 'どんなに / どれほど + V/A + ことか',
            triggerWords: ['どんなに', 'どれほど', '何度'],
            example: '異国の地で一人暮らしを始めた頃、家族の温もりがどんなに恋しかったことか。',
            reading: 'いこくのちでひとりぐらしをはじめたころ、かぞくのぬくもりがどんなにこいしかったことか。',
            translation: 'Thuở mới bắt đầu cuộc sống một mình nơi đất khách quê người, tôi đã nhung nhớ hơi ấm gia đình biết bao nhiêu!',
          },
          jeesTrapAnalysis: 'Bẫy JEES: Nhìn đầu câu! Nếu có どんなに / どれほど / 何度 -> Chắc chắn đuôi câu kết thúc bằng ことか!',
          practiceQuestion: {
            sentence: '病気の子供を看病する母親の姿には、涙を誘う（　　）。',
            blankTarget: '〜ものがある',
            correctPattern: 'A',
            options: ['ものがある', 'ことか', 'わけだ', 'ところだ'],
            explanation: 'Không có từ cảm thán ở đầu, mô tả cảm xúc đánh giá「涙を誘う (gợi nước mắt)」-> Chọn ものがある.',
          },
        },
        {
          id: `cgp_fall_${Date.now()}_5`,
          patternA: '〜を通して (をとおして)',
          patternB: '〜を契機に (をけいきに)',
          level: 'N1',
          title: 'Qua trung gian trải nghiệm vs Nhân cơ hội / Cột mốc làm xoay chuyển tình thế',
          coreDifference: '〜を通して là phương tiện/cầu nối trải nghiệm. 〜を契機に là cú hích, sự kiện bước ngoặt kích hoạt một sự thay đổi lớn sau đó.',
          patternADetails: {
            meaning: 'Thông qua (cầu nối trải nghiệm)',
            nuance: 'Diễn tả phương tiện để tiếp cận kiến thức hoặc mối quan hệ.',
            structure: 'N + を通して',
            triggerWords: ['ボランティア', '読書', '留学'],
            example: '日本での留学生活を通して、異文化への理解が深まった。',
            reading: 'にほんでのりゅうがくせいかつをとおして、いぶんかへのりかいがふかまった。',
            translation: 'Thông qua đời sống du học tại Nhật Bản, sự thấu hiểu đối với văn hóa khác biệt đã trở nên sâu sắc hơn.',
          },
          patternBDetails: {
            meaning: 'Lấy mốc đó làm bước ngoặt (Cú hích thay đổi)',
            nuance: 'Một sự kiện mang tính lịch sử hoặc biến cố kích hoạt hành động lớn.',
            structure: 'N + を契機に / を契機として',
            triggerWords: ['法改正', '創業100周年', '病気'],
            example: '大病を患ったことを契機に、健康管理に対する意識を根本から改めた。',
            reading: 'たいびょうをわずらったことをけいきに、けんこうかんりにたいするいしきをこんぽんからあらためた。',
            translation: 'Lấy biến cố mắc trọng bệnh làm bước ngoặt, tôi đã thay đổi tận gốc rễ nhận thức về việc quản lý sức khỏe.',
          },
          jeesTrapAnalysis: 'Bẫy JEES: Nếu câu chứa sự chuyển biến mang tính bước ngoặt (改めた, 始めた, 発足した) -> Thường chọn を契機に.',
          practiceQuestion: {
            sentence: '新社長の就任（　　）、我が社は大規模な組織改革に踏み切った。',
            blankTarget: '〜を契機に',
            correctPattern: 'B',
            options: ['を契機に', 'を通して', 'に沿って', 'を皮切りに'],
            explanation: 'Sự kiện tân giám đốc nhậm chức kích hoạt cải cách tổ chức quy mô lớn -> Chọn を契機に.',
          },
        },
      ];

      setList((prev) => [...fallbackPairs, ...prev]);
      setCurrentIndex(0);
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  const filteredList = list.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.patternA.includes(q) ||
      item.patternB.includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.coreDifference.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <span className="font-display">Đấu Trường Bắt Bẫy Ngữ Pháp Đồng Nghĩa</span>
              <span className="text-xs font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-rose-400" />
                <span>Synonymous Grammar Battle</span>
              </span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Mổ xẻ 100% các cặp cấu trúc gây nhức nhối nhất trong JLPT. Bảng đối chiếu sắc thái, dấu hiệu nhận diện trong đề thi & Phân tích bẫy logic JEES.
          </p>
        </div>

        {/* Load More +5 Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải thêm 5 cặp ngữ pháp bẫy mới mỗi lần bấm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải nạp thêm (+5 Cặp ngữ pháp bẫy)</span>
          </button>
        </div>
      </div>

      {/* Viewed History Ribbon */}
      {historyItems.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 text-rose-400 shrink-0 font-semibold">
            <History className="w-3.5 h-3.5" />
            <span>Đã xem ({historyItems.length}):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-0.5">
            {historyItems.slice(0, 10).map((h) => {
              const idx = list.findIndex((it) => it.id === h.id);
              return (
                <button
                  key={h.id}
                  onClick={() => {
                    if (idx >= 0) {
                      setCurrentIndex(idx);
                      setUserSelectedPattern(null);
                      speechService.playSuccessSound();
                    }
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition-all shrink-0 ${
                    currentPair.id === h.id
                      ? 'bg-rose-600 border-rose-400 text-white font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                  title={h.subtitle}
                >
                  <span className="font-jp font-bold text-rose-200">{h.title}</span>
                  {h.level && <span className="text-[9px] text-slate-400">[{h.level}]</span>}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              historyService.clearHistory('confusing_grammar');
              setHistoryItems([]);
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 ml-auto shrink-0 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800"
            title="Xóa lịch sử ngữ pháp"
          >
            Xóa
          </button>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
          <span className="text-slate-500">Đang hiển thị:</span>
          <span className="font-mono text-rose-400 font-bold">{currentIndex + 1} / {list.length} cặp cấu trúc</span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm ngữ pháp (vd: わけではない, に関して)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Main Comparison Matrix */}
      {currentPair && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                    {currentPair.level}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{currentPair.title}</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3 font-jp">
                  <span className="text-rose-400">{currentPair.patternA}</span>
                  <span className="text-slate-500 text-lg font-sans">VS</span>
                  <span className="text-indigo-400">{currentPair.patternB}</span>
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
                    setUserSelectedPattern(null);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer transition-colors"
                >
                  ← Cặp trước
                </button>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev + 1) % list.length);
                    setUserSelectedPattern(null);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cặp kế tiếp →
                </button>
              </div>
            </div>

            {/* Core Difference Callout */}
            <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-200 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-400">Khác biệt cốt lõi: </span>
                <span>{currentPair.coreDifference}</span>
              </div>
            </div>
          </div>

          {/* 2-Column Battle Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Pattern A */}
            <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-5 space-y-4 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="text-xl font-bold font-jp text-rose-300">{currentPair.patternA}</div>
                <button
                  onClick={() => speechService.speak(currentPair.patternADetails.example)}
                  className="p-1.5 text-slate-400 hover:text-rose-300 rounded cursor-pointer"
                  title="Nghe câu ví dụ A"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Ý nghĩa:</div>
                  <div className="text-slate-200 font-medium text-sm mt-0.5">{currentPair.patternADetails.meaning}</div>
                </div>

                <div>
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Sắc thái & Ngữ cảnh:</div>
                  <div className="text-slate-300 mt-0.5 leading-relaxed">{currentPair.patternADetails.nuance}</div>
                </div>

                <div>
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Cấu trúc kết hợp:</div>
                  <div className="bg-slate-950 p-2 rounded-lg font-mono text-rose-200 border border-slate-800 mt-0.5">
                    {currentPair.patternADetails.structure}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Từ khóa nhận diện trong đề thi:</div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {currentPair.patternADetails.triggerWords.map((w) => (
                      <span key={w} className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/60 font-jp text-[11px]">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="text-slate-400 font-semibold text-[10px] uppercase">Câu ví dụ thực tế:</div>
                  <div className="font-jp text-slate-100 text-sm font-medium">{currentPair.patternADetails.example}</div>
                  <div className="font-jp text-slate-400 text-[11px]">{currentPair.patternADetails.reading}</div>
                  <div className="text-slate-300 text-xs italic pt-1 border-t border-slate-800/80">
                    {currentPair.patternADetails.translation}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Pattern B */}
            <div className="bg-slate-900 border border-indigo-900/40 rounded-2xl p-5 space-y-4 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="text-xl font-bold font-jp text-indigo-300">{currentPair.patternB}</div>
                <button
                  onClick={() => speechService.speak(currentPair.patternBDetails.example)}
                  className="p-1.5 text-slate-400 hover:text-indigo-300 rounded cursor-pointer"
                  title="Nghe câu ví dụ B"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Ý nghĩa:</div>
                  <div className="text-slate-200 font-medium text-sm mt-0.5">{currentPair.patternBDetails.meaning}</div>
                </div>

                <div>
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Sắc thái & Ngữ cảnh:</div>
                  <div className="text-slate-300 mt-0.5 leading-relaxed">{currentPair.patternBDetails.nuance}</div>
                </div>

                <div>
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Cấu trúc kết hợp:</div>
                  <div className="bg-slate-950 p-2 rounded-lg font-mono text-indigo-200 border border-slate-800 mt-0.5">
                    {currentPair.patternBDetails.structure}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Từ khóa nhận diện trong đề thi:</div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {currentPair.patternBDetails.triggerWords.map((w) => (
                      <span key={w} className="px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/60 font-jp text-[11px]">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="text-slate-400 font-semibold text-[10px] uppercase">Câu ví dụ thực tế:</div>
                  <div className="font-jp text-slate-100 text-sm font-medium">{currentPair.patternBDetails.example}</div>
                  <div className="font-jp text-slate-400 text-[11px]">{currentPair.patternBDetails.reading}</div>
                  <div className="text-slate-300 text-xs italic pt-1 border-t border-slate-800/80">
                    {currentPair.patternBDetails.translation}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* JEES Trap Warning */}
          <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-amber-300 uppercase tracking-wider">Cảnh báo bẫy logic từ Ban đề thi JEES:</div>
              <p className="text-slate-300 leading-relaxed">{currentPair.jeesTrapAnalysis}</p>
            </div>
          </div>

          {/* Battle Practice Question */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-rose-400" />
              <span>Thực chiến Bắt Bẫy: Chọn phương án chính xác nhất</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
              <div className="text-sm md:text-base font-jp font-medium text-slate-100">
                {currentPair.practiceQuestion.sentence}
              </div>
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentPair.practiceQuestion.options.map((opt, idx) => {
                const isCorrect = opt.includes(currentPair.practiceQuestion.blankTarget.replace('〜', ''));
                const isSelected = userSelectedPattern === (idx === 0 ? 'A' : 'B');

                let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                if (userSelectedPattern !== null) {
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
                      if (userSelectedPattern === null) {
                        setUserSelectedPattern(idx === 0 ? 'A' : 'B');
                        if (isCorrect) speechService.playSuccessSound();
                        else speechService.playErrorSound();
                      }
                    }}
                    disabled={userSelectedPattern !== null}
                    className={`p-3 rounded-xl border text-xs font-jp font-medium transition-all cursor-pointer flex items-center justify-between ${style}`}
                  >
                    <span>{idx + 1}. {opt}</span>
                    {userSelectedPattern !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {userSelectedPattern !== null && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs space-y-2 animate-fadeIn">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Giải thích chi tiết:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{currentPair.practiceQuestion.explanation}</p>
              </div>
            )}

            {/* MỤC GIẢI THÍCH CHUYÊN SÂU & CHIẾN LƯỢC BẪY JEES */}
            <div className="p-4 bg-gradient-to-r from-rose-950/40 via-slate-950 to-indigo-950/40 border border-rose-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-rose-400" />
                <span>Mục giải thích chuyên sâu & Phân tích bẫy tư duy JEES</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-rose-400 font-semibold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Dấu hiệu nhận biết trong đề thi thật:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{currentPair.jeesTrapAnalysis}</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-amber-300 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bản chất tâm lý học nhận thức:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{currentPair.coreDifference}</p>
                </div>
              </div>
            </div>

            {/* Bottom Stepper Navigation Bar: [← Cặp trước] [X / Y] [Cặp kế tiếp →] + [➕ Tải thêm 5 cái] */}
            <div className="pt-4 border-t border-slate-800/80 p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
                    setUserSelectedPattern(null);
                    speechService.playSuccessSound();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Xem cặp ngữ pháp trước đó"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Cặp trước</span>
                </button>
                <div className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-rose-400 font-bold">
                  {currentIndex + 1} / {list.length}
                </div>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => (prev + 1) % list.length);
                    setUserSelectedPattern(null);
                    speechService.playSuccessSound();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md shadow-rose-900/30"
                  title="Xem cặp ngữ pháp kế tiếp"
                >
                  <span>Cặp kế tiếp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleLoadMoreInfinite}
                disabled={isLoadingMore}
                className="px-4 py-2 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
                title="Tải thêm 5 cặp ngữ pháp bẫy mới"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Tải thêm 5 cái ({list.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
