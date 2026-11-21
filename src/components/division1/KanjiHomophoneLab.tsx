import React, { useState } from 'react';
import { JLPTLevel } from '../../types';
import { speechService } from '../../services/speechService';
import {
  Volume2,
  BookOpen,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  ArrowRight,
  Zap,
  AlertTriangle,
  Lightbulb,
  Check,
} from 'lucide-react';

interface HomophoneGroup {
  id: string;
  reading: string;
  readingType: 'kun' | 'on';
  coreConcept: string;
  items: {
    kanji: string;
    hanViet: string;
    nuance: string;
    commonCollocations: string[];
    jlptTrap: string;
    exampleJp: string;
    exampleVn: string;
  }[];
  quiz: {
    sentence: string;
    blankMeaning: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const INITIAL_HOMOPHONES: HomophoneGroup[] = [
  {
    id: 'homo_1',
    reading: 'おさめる (osameru)',
    readingType: 'kun',
    coreConcept: 'Bốn chữ Hán mang âm Osameru: Nộp, Thu nạp, Cai trị, Tu dưỡng',
    items: [
      {
        kanji: '納める',
        hanViet: 'NẠP',
        nuance: 'Nộp (tiền thuế, hội phí), giao hàng hóa theo đơn hoặc cất giữ vào kho/hộp.',
        commonCollocations: ['税金を納める (nộp thuế)', '会費を納める (đóng hội phí)', '注文品を納める (giao hàng)'],
        jlptTrap: 'Hay bị bẫy nhầm với 治める khi nói về nộp phạt hoặc nộp thuế.',
        exampleJp: '期限までに住民税を納めなければなりません。',
        exampleVn: 'Bạn phải nộp thuế thị dân trước thời hạn quy định.',
      },
      {
        kanji: '収める',
        hanViet: 'THU',
        nuance: 'Thu được kết quả, thu nạp vào túi, gặt hái thành công, kiềm chế (cơn giận).',
        commonCollocations: ['成功を収める (gặt hái thành công)', '成果を収める (thu được thành quả)', '怒りを収める (nguôi giận)'],
        jlptTrap: 'Chuyên dùng cho các danh từ trừu tượng như thành quả, thắng lợi.',
        exampleJp: '若手研究チームが国際学会で素晴らしい成果を収めた。',
        exampleVn: 'Nhóm nghiên cứu trẻ đã gặt hái thành quả tuyệt vời tại hội nghị quốc tế.',
      },
      {
        kanji: '治める',
        hanViet: 'TRỊ',
        nuance: 'Cai trị đất nước, dẹp yên sự hỗn loạn, trị bệnh, giải quyết xung đột.',
        commonCollocations: ['国を治める (trị nước)', '争いを治める (dẹp yên tranh chấp)', '混乱を治める (ổn định hỗn loạn)'],
        jlptTrap: 'Chỉ dùng khi chủ ngữ là người lãnh đạo hoặc hành động mang tính an dân, dẹp loạn.',
        exampleJp: '名君として知られる指導者が長期にわたり国を平和に治めた。',
        exampleVn: 'Vị lãnh đạo được ca ngợi là minh quân đã trị vì đất nước thanh bình trong thời gian dài.',
      },
      {
        kanji: '修める',
        hanViet: 'TU',
        nuance: 'Tu dưỡng đạo đức, trau dồi học vấn, hoàn thành khóa học chuyên môn.',
        commonCollocations: ['学問を修める (trau dồi học vấn)', '身を修める (tu thân)', '学科を修める (hoàn tất môn học)'],
        jlptTrap: 'Gắn liền với học hành, tu thân tích đức.',
        exampleJp: '大学院で経済学の修士課程を修め、金融界に進んだ。',
        exampleVn: 'Sau khi hoàn thành chương trình thạc sĩ kinh tế tại trường cao học, anh ấy bước vào ngành tài chính.',
      },
    ],
    quiz: {
      sentence: '長年の努力が実を結び、プロジェクトは見事に大きな成功を（　　）た。',
      blankMeaning: 'Điền chữ Hán Osameru thích hợp mang nghĩa gặt hái thành công.',
      options: ['納め', '収め', '治め', '修め'],
      correctIndex: 1,
      explanation: 'Gặt hái thành công/thành quả luôn đi với động từ 収める (THU). 納める là nộp thuế/tiền; 治める là trị nước; 修める là tu thân/học vấn.',
    },
  },
  {
    id: 'homo_2',
    reading: 'はかる (hakaru)',
    readingType: 'kun',
    coreConcept: 'Năm chữ Hán mang âm Hakaru: Cân đo, Tính toán, Dự mưu, Âm mưu',
    items: [
      {
        kanji: '測る',
        hanViet: 'TRẮC',
        nuance: 'Đo chiều dài, chiều cao, độ sâu, diện tích, cự ly vật lý (có thước đo).',
        commonCollocations: ['長さを測る (đo chiều dài)', '深さを測る (đo độ sâu)', '体温を測る (đo nhiệt độ cơ thể)'],
        jlptTrap: 'Bộ Thủy (氵) liên tưởng đến đo mực nước, độ sâu.',
        exampleJp: 'レーザー機器を用いて建物の高さをミリ単位で正確に測る。',
        exampleVn: 'Dùng thiết bị laser để đo chính xác chiều cao tòa nhà đến từng milimet.',
      },
      {
        kanji: '量る',
        hanViet: 'LƯỢNG',
        nuance: 'Cân trọng lượng, dung tích, thể tích chất lỏng hoặc suy đoán lòng người.',
        commonCollocations: ['重さを量る (cân trọng lượng)', '体重を量る (cân cân nặng)', '真意を推し量る (đoán thực ý)'],
        jlptTrap: 'Bộ Trọng (重) bên trong nói về cân nặng khối lượng.',
        exampleJp: '精密な電子天秤を使って化学薬品の粉末を0.1グラム単位で量る。',
        exampleVn: 'Dùng cân điện tử chính xác để cân bột hóa chất theo từng 0,1 gram.',
      },
      {
        kanji: '計る',
        hanViet: 'KẾ',
        nuance: 'Đo thời gian, tính toán số liệu, đếm giờ, lên kế hoạch giờ giấc.',
        commonCollocations: ['時間を計る (bấm giờ)', 'タイミングを計る (canh thời cơ)', 'スピードを計る (đo tốc độ)'],
        jlptTrap: 'Bộ Ngôn (言) + Thập (十) liên quan đến con số và thời gian.',
        exampleJp: 'ストップウォッチで100メートル走のタイムを厳密に計る。',
        exampleVn: 'Bấm giờ chạy 100m bằng đồng hồ bấm giờ một cách chuẩn xác.',
      },
      {
        kanji: '図る',
        hanViet: 'ĐỒ',
        nuance: 'Lên kế hoạch mưu cầu giải pháp, hướng tới mục tiêu tốt đẹp.',
        commonCollocations: ['解決を図る (tìm cách giải quyết)', '便宜を図る (tạo điều kiện thuận lợi)', '再起を図る (mưu cầu vực dậy)'],
        jlptTrap: 'Luôn đi với nghĩa mưu cầu mục tiêu tích cực (解決を図る, 連携を図る).',
        exampleJp: '両社は技術提携を通じてコスト削減と業務効率化を図る方針だ。',
        exampleVn: 'Hai công ty dự định đẩy mạnh cắt giảm chi phí và tối ưu hiệu suất thông qua hợp tác công nghệ.',
      },
    ],
    quiz: {
      sentence: '政府は中小企業の経営基盤を強化するため、資金繰りの円滑化を（　　）方針を発表した。',
      blankMeaning: 'Điền chữ Hán Hakaru mang nghĩa mưu cầu/hướng tới giải pháp.',
      options: ['測る', '量る', '計る', '図る'],
      correctIndex: 3,
      explanation: 'Cụm từ 円滑化を図る (hướng tới làm cho trôi chảy/mưu cầu thuận lợi) bắt buộc dùng chữ 図 (ĐỒ trong kế hoạch/ý đồ).',
    },
  },
  {
    id: 'homo_3',
    reading: 'たいしょう (taishou)',
    readingType: 'on',
    coreConcept: 'Bộ ba từ Hán đồng âm Onyomi: Đối tượng vs Đối chiếu vs Đối xứng',
    items: [
      {
        kanji: '対象',
        hanViet: 'ĐỐI TƯỢNG',
        nuance: 'Đối tượng được nhắm tới của một hành động, chính sách, nghiên cứu.',
        commonCollocations: ['調査の対象 (đối tượng khảo sát)', '対象者 (người thuộc diện)', '課税対象 (đối tượng chịu thuế)'],
        jlptTrap: 'Chữ 象 (Tượng trong hiện tượng, hình tượng).',
        exampleJp: '今回の給付金は、市内に居住する子育て世帯を対象として支給される。',
        exampleVn: 'Khoản trợ cấp lần này được chi trả hướng tới đối tượng là các hộ gia đình nuôi con nhỏ đang sinh sống trong thành phố.',
      },
      {
        kanji: '対照',
        hanViet: 'ĐỐI CHIẾU',
        nuance: 'Sự so sánh tương phản rõ rệt giữa hai sự vật hoặc đối chiếu văn bản.',
        commonCollocations: ['対照的な二人 (hai người trái ngược nhau)', '原文と対照する (đối chiếu nguyên bản)', '鮮やかな対照 (sự tương phản rõ nét)'],
        jlptTrap: 'Chữ 照 (Chiếu trong chiếu sáng, đối chiếu). Hay dùng cụm 〜と対照的に.',
        exampleJp: '兄が社交的で饒舌な性格であるのとは対照的に、弟は物静かで思慮深い。',
        exampleVn: 'Trái ngược rõ rệt với người anh hòa đồng hoạt ngôn, người em lại trầm lặng và sâu sắc.',
      },
      {
        kanji: '対称',
        hanViet: 'ĐỐI XỨNG',
        nuance: 'Đối xứng hình học (đối xứng trục, đối xứng tâm, cân đối hai bên).',
        commonCollocations: ['線対称 (đối xứng trục)', '点対称 (đối xứng tâm)', '左右対称 (cân xứng trái phải)'],
        jlptTrap: 'Chữ 称 (Xưng trong cân xứng, đối xưng).',
        exampleJp: '京都の伝統的な寺院建築は、左右対称の美しい均整美を誇っている。',
        exampleVn: 'Kiến trúc chùa chiền truyền thống Kyoto tự hào sở hữu vẻ đẹp cân đối đối xứng trái phải tuyệt mỹ.',
      },
    ],
    quiz: {
      sentence: 'アンケートの（　　）となった1000名のうち、8割が新制度に賛成と回答した。',
      blankMeaning: 'Điền từ Taishou mang nghĩa đối tượng khảo sát.',
      options: ['対象', '対照', '対称', '隊商'],
      correctIndex: 0,
      explanation: 'Đối tượng khảo sát/nghiên cứu bắt buộc viết bằng chữ 対象 (ĐỐI TƯỢNG). Đối chiếu dùng 対照, đối xứng hình học dùng 对称.',
    },
  },
];

const EXTRA_HOMOPHONES: HomophoneGroup[] = [
  {
    id: 'homo_extra_1',
    reading: 'あやまる (ayamaru)',
    readingType: 'kun',
    coreConcept: 'Tạ lỗi xin lỗi (謝る) vs Sai lầm phán đoán chệch hướng (誤る)',
    items: [
      {
        kanji: '謝る',
        hanViet: 'TẠ',
        nuance: 'Xin lỗi, cúi đầu tạ lỗi người khác vì khuyết điểm hay làm phiền.',
        commonCollocations: ['素直に謝る (thành khẩn xin lỗi)', '頭を下げて謝る (cúi đầu nhận lỗi)'],
        jlptTrap: 'Bộ Ngôn (言) + Xạ (射), nói lời xin lỗi.',
        exampleJp: '過ちを素直に認めて心から謝ることが、信頼回復の第一歩だ。',
        exampleVn: 'Thành thật thừa nhận sai sót và xin lỗi tận đáy lòng là bước đầu tiên để lấy lại lòng tin.',
      },
      {
        kanji: '誤る',
        hanViet: 'NGỘ',
        nuance: 'Sai lầm trong nhận định, đi chệch hướng, lạc lối cuộc đời.',
        commonCollocations: ['判断を誤る (sai lầm phán đoán)', '進路を誤る (chọn sai đường đi)', '使い方を誤る (dùng sai mục đích)'],
        jlptTrap: 'Chữ Ngộ trong sai lầm (誤解, 誤算).',
        exampleJp: '一瞬の判断を誤ったばかりに、長年築き上げた事業が大打撃を受けた。',
        exampleVn: 'Chỉ vì một phán đoán sai lầm trong tích tắc mà sự nghiệp gầy dựng bao năm chịu tổn thất nặng nề.',
      },
    ],
    quiz: {
      sentence: '経営陣が市場動向の見極めを（　　）った結果、巨額の赤字を計上した。',
      blankMeaning: 'Điền chữ Hán Ayamaru mang nghĩa phán đoán sai lầm.',
      options: ['謝', '誤', '過', '悟'],
      correctIndex: 1,
      explanation: 'Sai lầm trong phán đoán/nhận định luôn dùng chữ 誤 (NGỘ - 誤る). 謝る mang nghĩa nói lời xin lỗi.',
    },
  },
  {
    id: 'homo_extra_2',
    reading: 'かえる (kaeru)',
    readingType: 'kun',
    coreConcept: 'Biến đổi (変える) vs Đổi chác thay thế (代える・換える・替える)',
    items: [
      {
        kanji: '変える',
        hanViet: 'BIẾN',
        nuance: 'Thay đổi bản chất, trạng thái, màu sắc, thái độ hoặc diện mạo.',
        commonCollocations: ['態度を変える (đổi thái độ)', '方針を変える (đổi phương châm)', '色を変える (đổi màu)'],
        jlptTrap: 'Dùng khi trạng thái của chính sự vật đó bị biến chất.',
        exampleJp: '時代の変化に合わせて、従来の古いビジネスモデルを抜本的に変える。',
        exampleVn: 'Cần thay đổi triệt để mô hình kinh doanh cũ kỹ cho thích ứng với thời đại.',
      },
      {
        kanji: '代える',
        hanViet: 'ĐẠI',
        nuance: 'Thay mặt người khác, lấy thứ khác làm đại diện thay thế.',
        commonCollocations: ['言葉に代える (thay cho lời nói)', '父に代わって (thay mặt bố)', '何物にも代えがたい (không gì đánh đổi được)'],
        jlptTrap: 'Xuất hiện thường xuyên trong cụm 何物にも代えがたい (quý báu vô song).',
        exampleJp: '長年の友情は何物にも代えがたい人生の宝物である。',
        exampleVn: 'Tình bạn lâu năm là báu vật cuộc đời không gì có thể đánh đổi được.',
      },
      {
        kanji: '換える',
        hanViet: 'HOÁN',
        nuance: 'Đổi chác ngang giá trị (đổi ngoại tệ, đổi lấy tiền mặt, thông gió).',
        commonCollocations: ['空気を換える (đổi gió/thông gió)', '円をドルに換える (đổi Yên ra USD)', '換気する (thông gió)'],
        jlptTrap: 'Bộ Thủ (扌) liên quan đến trao đổi hiện vật ngang giá.',
        exampleJp: '空港の窓口で余った日本円をベトナムドンに換えた。',
        exampleVn: 'Tại quầy ở sân bay, tôi đã đổi số tiền Yên Nhật còn thừa sang tiền Đồng Việt Nam.',
      },
      {
        kanji: '替える',
        hanViet: 'THẾ',
        nuance: 'Thay mới cái cũ hỏng bằng cái mới (thay pin, thay trang phục, đổi chỗ ngồi).',
        commonCollocations: ['電池を替える (thay pin)', '服を着替える (thay quần áo)', '席を替える (đổi chỗ ngồi)'],
        jlptTrap: 'Dùng khi thay thế đồ vật hết hạn, đổi mới luân phiên.',
        exampleJp: 'リモコンの反応が悪くなったので、新しい乾電池に取り替えた。',
        exampleVn: 'Điều khiển bắt đầu chập chờn nên tôi đã thay pin mới.',
      },
    ],
    quiz: {
      sentence: '健康は何物にも（　　）がたい大切な財産であることを忘れてはならない。',
      blankMeaning: 'Điền chữ Hán Kaeru trong thành ngữ "không gì đánh đổi được".',
      options: ['変え', '代え', '換え', '替え'],
      correctIndex: 1,
      explanation: 'Cụm thành ngữ kinh điển 何物にも代えがたい (vô giá/không gì thay thế được) bắt buộc dùng chữ 代 (ĐẠI).',
    },
  },
  {
    id: 'homo_extra_3',
    reading: 'そうぞう (souzou)',
    readingType: 'on',
    coreConcept: 'Sáng tạo tạo sinh (創造) vs Tưởng tượng hình dung (想像)',
    items: [
      {
        kanji: '創造',
        hanViet: 'SÁNG TẠO',
        nuance: 'Tạo ra cái mới mẻ chưa từng có trong lịch sử (nghệ thuật, công nghệ, thế giới).',
        commonCollocations: ['新しい価値を創造する (sáng tạo giá trị mới)', '天地創造 (khai thiên lập địa)', '創造力 (sức sáng tạo)'],
        jlptTrap: 'Chữ 創 (Sáng) mang tính làm ra cái thực tế mới tinh.',
        exampleJp: '人工知能技術を活用して、今までにない斬新なビジネスモデルを創造する。',
        exampleVn: 'Tận dụng AI để sáng tạo nên mô hình kinh doanh đột phá chưa từng có.',
      },
      {
        kanji: '想像',
        hanViet: 'TƯỞNG TƯỢNG',
        nuance: 'Hình dung, mường tượng trong tâm trí sự việc chưa thấy hoặc tương lai.',
        commonCollocations: ['想像を超える (vượt xa trí tưởng tượng)', '想像がつく (có thể hình dung ra)', '想像力 (trí tưởng tượng)'],
        jlptTrap: 'Chữ 想 (Tưởng) là suy nghĩ trong tâm trí não bộ.',
        exampleJp: '現地の被害状況は、ニュース報道で見ていた我々の想像をはるかに超えていた。',
        exampleVn: 'Thiệt hại thực tế tại hiện trường đã vượt xa sức tưởng tượng của chúng tôi qua bản tin.',
      },
    ],
    quiz: {
      sentence: '次世代エネルギーの開発は、人類の未来を（　　）するための最優先課題だ。',
      blankMeaning: 'Điền từ Souzou mang nghĩa kiến tạo/sáng tạo tương lai.',
      options: ['創造', '想像', '壮図', '送致'],
      correctIndex: 0,
      explanation: 'Kiến tạo/sáng tạo tương lai mới phải dùng 創造 (SÁNG TẠO). 想像 chỉ là mường tượng trong đầu.',
    },
  },
  {
    id: 'homo_extra_4',
    reading: 'ことなる (kotonaru) & わける (wakeru)',
    readingType: 'kun',
    coreConcept: 'Phân biệt (別れる・分かれる) & Sai khác (異なる)',
    items: [
      {
        kanji: '別れる',
        hanViet: 'BIỆT',
        nuance: 'Chia tay người yêu, từ biệt bạn bè, ly biệt cách xa con người.',
        commonCollocations: ['恋人と別れる (chia tay người yêu)', '駅で別れる (từ biệt ở ga)', '死別する (tử biệt)'],
        jlptTrap: 'Chữ Biệt gắn liền với sự xa rời tình cảm hoặc thể xác con người.',
        exampleJp: '留学のために空港で家族と涙ながらに別れた日のことを今も覚えている。',
        exampleVn: 'Tôi vẫn nhớ như in ngày rơi nước mắt chia tay gia đình tại sân bay để đi du học.',
      },
      {
        kanji: '分かれる',
        hanViet: 'PHÂN',
        nuance: 'Phân nhánh ngã rẽ (đoạn đường), chia rẽ ý kiến bất đồng, phân tổ đội.',
        commonCollocations: ['道が二つに分かれる (đường rẽ làm đôi)', '意見が分かれる (ý kiến chia rẽ)', 'グループに分かれる (chia nhóm)'],
        jlptTrap: 'Chữ Phân gắn liền với việc chia nhỏ từ một tổng thể.',
        exampleJp: '法案の採決を巡って、与党内でも賛否両論の意見が真っ二つに分かれた。',
        exampleVn: 'Xoay quanh việc bỏ phiếu thông qua dự luật, ý kiến ủng hộ và phản đối trong đảng cầm quyền đã chia rẽ làm đôi.',
      },
    ],
    quiz: {
      sentence: '新工場の建設予定地を巡って、住民の間で賛成派と反対派に意見が（　　）ている。',
      blankMeaning: 'Điền chữ Hán Wakareru mang nghĩa ý kiến chia rẽ.',
      options: ['別れ', '分かれ', '解れ', '判れ'],
      correctIndex: 1,
      explanation: 'Ý kiến chia rẽ phân luồng luôn dùng chữ 分 (PHÂN - 分かれる). 別れる là chia tay con người.',
    },
  },
  {
    id: 'homo_extra_5',
    reading: 'しめる (shimeru)',
    readingType: 'kun',
    coreConcept: 'Đóng lại (閉める) vs Buộc chặt (締める) vs Chiếm lĩnh (占める)',
    items: [
      {
        kanji: '閉める',
        hanViet: 'BẾ',
        nuance: 'Đóng cửa sổ, đóng nắp hộp, khép lại lối đi vật lý.',
        commonCollocations: ['ドアを閉める (đóng cửa)', '店を閉める (đóng tiệm)', '蓋を閉める (đậy nắp)'],
        jlptTrap: 'Phản nghĩa của 開ける.',
        exampleJp: '冷房の効率を保つため、部屋を出る際は必ずドアを閉めてください。',
        exampleVn: 'Để duy trì hiệu quả máy lạnh, vui lòng luôn đóng cửa khi ra khỏi phòng.',
      },
      {
        kanji: '締める',
        hanViet: 'ĐẾ',
        nuance: 'Thắt cà vạt, siết ốc vít, ký kết hợp đồng, chốt sổ sách kế toán.',
        commonCollocations: ['ネクタイを締める (thắt cà vạt)', '契約を締結する (ký hợp đồng)', 'シートベルトを締める (cài dây an toàn)'],
        jlptTrap: 'Bộ Mịch (糸) liên quan đến dây buộc siết chặt.',
        exampleJp: '安全のため、走行中は座席のシートベルトをしっかりと締めてください。',
        exampleVn: 'Vì an toàn, xin vui lòng cài chặt dây an toàn trong suốt hành trình.',
      },
      {
        kanji: '占める',
        hanViet: 'CHIÊM',
        nuance: 'Chiếm tỷ lệ thị phần, giữ vị trí quan trọng, chiếm đóng lãnh thổ.',
        commonCollocations: ['過半数を占める (chiếm đa số)', '市場の3割を占める (chiếm 30% thị phần)', '優位を占める (chiếm ưu thế)'],
        jlptTrap: 'Chữ Chiêm trong chiếm lĩnh, thị phần (シェアを占める).',
        exampleJp: '同社のスマートフォンは国内市場で40パーセント以上のシェアを占めている。',
        exampleVn: 'Điện thoại của hãng này chiếm hơn 40% thị phần tại thị trường nội địa.',
      },
    ],
    quiz: {
      sentence: '今年度の上半期売上高において、海外市場からの収益が全体の6割を（　　）た。',
      blankMeaning: 'Điền chữ Hán Shimeru mang nghĩa chiếm 60% tổng doanh thu.',
      options: ['閉め', '締め', '占め', '標め'],
      correctIndex: 2,
      explanation: 'Chiếm tỷ lệ phần trăm luôn đi với chữ 占 (CHIÊM - 占める). 閉める là đóng cửa; 締める là thắt chặt/ký kết.',
    },
  },
];

interface Props {
  currentLevel: JLPTLevel;
}

export const KanjiHomophoneLab: React.FC<Props> = ({ currentLevel }) => {
  const [homophones, setHomophones] = useState<HomophoneGroup[]>(INITIAL_HOMOPHONES);
  const [loadBatchCount, setLoadBatchCount] = useState<number>(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGroupId, setSelectedGroupId] = useState<string>(INITIAL_HOMOPHONES[0].id);
  const [userQuizChoice, setUserQuizChoice] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const handleLoadMore = () => {
    const nextBatchNum = loadBatchCount + 1;
    const startIndex = ((nextBatchNum - 1) * 5) % EXTRA_HOMOPHONES.length;
    let batch = EXTRA_HOMOPHONES.slice(startIndex, startIndex + 5);
    if (batch.length < 5) {
      batch = [...batch, ...EXTRA_HOMOPHONES.slice(0, 5 - batch.length)];
    }

    const uniqueBatch = batch.map((item, idx) => ({
      ...item,
      id: `${item.id}_batch_${nextBatchNum}_${idx}`,
    }));

    setHomophones((prev) => [...prev, ...uniqueBatch]);
    setLoadBatchCount(nextBatchNum);
    setNotice(`Đã nạp thêm 5 nhóm Hán tự đồng âm khác nghĩa đợt ${nextBatchNum}! (Tổng hiện có: ${homophones.length + uniqueBatch.length} nhóm)`);
    speechService.playSuccessSound();
    setTimeout(() => setNotice(null), 4000);
  };

  const filteredGroups = homophones.filter(
    (g) =>
      g.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.coreConcept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.items.some(
        (it) =>
          it.kanji.includes(searchQuery) ||
          it.hanViet.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.nuance.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const currentGroup = homophones.find((g) => g.id === selectedGroupId) || homophones[0];

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
              <span className="text-slate-300 font-jp">同音異義語・同訓異字マスター</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400 font-semibold">Tử huyệt đề thi JLPT N3-N1</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Phòng Phân Biệt Hán Tự Đồng Âm Khác Nghĩa{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-indigo-400 bg-clip-text text-transparent">
                (Kanji Homophone & Homonym Lab)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Giải mã triệt để các cặp chữ Hán cùng âm đọc (おさめる, はかる, かえる, たいしょう...) nhưng nghĩa và bối cảnh hoàn toàn trái ngược. Nắm vững bẫy logic câu hỏi 文字・語彙 và viết mail chuẩn xác.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-xl border border-dashed border-indigo-500/60 bg-indigo-950/30 hover:bg-indigo-950/60 text-indigo-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-indigo-400"
            >
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>+5 Tải thêm Hán tự đồng âm</span>
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

      {/* Ribbon Selector & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Horizontal Scroll Ribbon of Groups */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin flex-1">
          {filteredGroups.map((grp) => {
            const isSelected = grp.id === selectedGroupId;
            return (
              <button
                key={grp.id}
                onClick={() => {
                  setSelectedGroupId(grp.id);
                  setUserQuizChoice(null);
                  setShowQuizResult(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 text-left ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-900/40'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="font-mono text-xs">{grp.reading}</div>
                <div className="text-[10px] text-slate-300 opacity-80 truncate max-w-[140px]">{grp.items.map((i) => i.kanji).join(' · ')}</div>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-60 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo âm đọc, Hán Việt..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Detailed Kanji Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40 uppercase font-bold">
                  {currentGroup.readingType === 'kun' ? 'Kunyomi (Âm thuần Nhật)' : 'Onyomi (Âm Hán Nhật)'}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1 font-jp">{currentGroup.reading}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{currentGroup.coreConcept}</p>
              </div>

              <button
                onClick={() => speechService.speak(currentGroup.reading)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-800 transition-colors cursor-pointer"
                title="Nghe phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Kanji Breakdown List */}
            <div className="space-y-4">
              {currentGroup.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-jp text-amber-300">{item.kanji}</span>
                      <span className="text-xs font-mono font-bold text-indigo-400">({item.hanViet})</span>
                    </div>

                    <button
                      onClick={() => speechService.speak(item.exampleJp)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer bg-slate-900 px-2 py-1 rounded-lg border border-slate-800"
                    >
                      <Volume2 className="w-3 h-3 text-indigo-400" />
                      <span>Nghe câu mẫu</span>
                    </button>
                  </div>

                  {/* Nuance */}
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    <span className="text-slate-400 font-semibold">Bản chất: </span>
                    {item.nuance}
                  </p>

                  {/* Collocations */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Cụm từ hay gặp:</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {item.commonCollocations.map((col, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[11px] font-jp bg-slate-900 px-2 py-0.5 rounded text-slate-300 border border-slate-800"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* JLPT Trap */}
                  <div className="text-[11px] text-rose-300 bg-rose-950/30 p-2.5 rounded-lg border border-rose-800/30 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Bẫy đề thi: </span>
                      {item.jlptTrap}
                    </div>
                  </div>

                  {/* Example Sentence */}
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 space-y-0.5">
                    <p className="text-xs text-slate-200 font-jp">{item.exampleJp}</p>
                    <p className="text-[11px] text-slate-400 italic">{item.exampleVn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Rapid Test Challenge */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c1427] border border-indigo-700/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Trắc Nghiệm Bẫy Chữ Hán
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">Điểm: {quizScore}</span>
            </div>

            <p className="text-xs text-slate-300">
              Chọn chữ Hán chính xác điền vào ô trống theo đúng ngữ cảnh câu:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <p className="text-sm sm:text-base font-jp text-white font-bold leading-relaxed">
                {currentGroup.quiz.sentence}
              </p>
              <div className="text-[11px] text-indigo-300 font-sans italic bg-indigo-950/40 p-2 rounded border border-indigo-900/40">
                Gợi ý: {currentGroup.quiz.blankMeaning}
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {currentGroup.quiz.options.map((opt, oIdx) => {
                  const isChosen = userQuizChoice === oIdx;
                  const isCorrect = oIdx === currentGroup.quiz.correctIndex;

                  let btnStyle = 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800';
                  if (showQuizResult) {
                    if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                    else if (isChosen) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                    else btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-50';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={showQuizResult}
                      onClick={() => {
                        setUserQuizChoice(oIdx);
                        setShowQuizResult(true);
                        if (isCorrect) {
                          setQuizScore((prev) => prev + 10);
                          speechService.playSuccessSound();
                        }
                      }}
                      className={`p-3 rounded-xl border text-sm font-jp font-bold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showQuizResult && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                      {showQuizResult && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showQuizResult && (
                <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                  <div
                    className={`text-xs font-bold flex items-center gap-1.5 ${
                      userQuizChoice === currentGroup.quiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {userQuizChoice === currentGroup.quiz.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Chính xác! (+10 điểm)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Chưa chính xác! Hãy đọc giải mã bên dưới:</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    {currentGroup.quiz.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Tips Box */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="font-bold text-amber-300 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Mẹo nhớ nhanh chữ Hán đồng âm:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Hãy chú ý tới <strong className="text-slate-200">bộ thủ cấu tạo</strong>: Bộ Thủy (氵) thường liên quan đến đo lường chất lỏng (測る); Bộ Mịch (糸) liên quan đến dây buộc ràng buộc (締める); Bộ Ngôn (言) là nói năng thưa thốt (謝る).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
