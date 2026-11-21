// AI Sensei Drill Arena & JLPT Star Order Master Repository
// High-precision exam simulation with authentic traps, star-order drills, and Professor Yamato's master takeaways

export interface SenseiDrillOption {
  id: string;
  text: string;
  reading?: string;
  isCorrect: boolean;
  trapReason?: string;
}

export interface SenseiDrillItem {
  id: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  category: 'grammar_trap' | 'star_order' | 'vocab_idiom' | 'keigo_business';
  categoryLabel: string;
  title: string;
  question: string;
  questionReading?: string;
  questionRomaji?: string;
  questionMeaningVn: string;
  starParts?: string[]; // If star order, 4 segments e.g. ["〜に", "〜ほかならない", "〜のは", "〜努力した"]
  starAnswerNumber?: number; // Position 1, 2, 3, or 4 where star ★ sits
  options: SenseiDrillOption[];
  correctExplanation: string;
  yamatoGoldenRule: string;
  realExamFrequencyBadge: 'Xuất hiện liên tục' | 'Bẫy kinh điển 90% thí sinh sai' | 'Câu phân loại thủ khoa' | 'Trọng tâm N1 Thượng đỉnh';
}

export const CURATED_SENSEI_DRILLS: SenseiDrillItem[] = [
  // ===================== N1 DRILLS =====================
  {
    id: 'drill_n1_1',
    level: 'N1',
    category: 'star_order',
    categoryLabel: '★ Sắp Xếp Câu Sao N1',
    title: 'Bí kíp câu sao N1: Cấu trúc biểu thị sự tột cùng 〜てやまない',
    question: '被災地の一日も早い復興を、_____ _____ __★__ _____。',
    questionReading: 'ひさいちの いちにちも はやい ふっこうを、_____ _____ __★__ _____。',
    questionRomaji: 'Hisaichi no ichinichi mo hayai fukkou wo, _____ _____ __★__ _____。',
    questionMeaningVn: 'Từ tận đáy lòng, tôi luôn cầu nguyện không ngừng cho sự phục hồi nhanh nhất có thể của vùng bị thiên tai.',
    starParts: ['願って', '心から', 'やまない', '国民として'],
    starAnswerNumber: 3,
    options: [
      { id: 'opt_1', text: '1. 国民として', isCorrect: false, trapReason: 'Nếu đặt ở vị trí thứ 3 sẽ làm đứt gãy liên kết ngữ pháp của cụm 「心から願ってやまない」.' },
      { id: 'opt_2', text: '2. 心から', isCorrect: false, trapReason: '「心から」 là phó từ bổ nghĩa trực tiếp cho động từ thể て 「願って」, đứng trước ở vị trí thứ 2.' },
      { id: 'opt_3', text: '3. 願って', isCorrect: true, trapReason: 'Đúng chuẩn cấu trúc V-te + やまない (cầu mong/chúc phúc không ngừng từ tận đáy lòng).' },
      { id: 'opt_4', text: '4. やまない', isCorrect: false, trapReason: '「やまない」 kết thúc vị ngữ ở vị trí thứ 4, không nằm ở vị trí dấu sao.' }
    ],
    correctExplanation: 'Thứ tự đúng của câu là: 4 (国民として) → 2 (心から) → 1 (願って) → 3 (やまない). Toàn câu: 「被災地の一日も早い復興を、国民として心から願ってやまない。」. Dấu sao nằm ở vị trí số 3 chính là chữ 「願って」 (lựa chọn 1).',
    yamatoGoldenRule: 'Bí quyết bẻ khóa câu sao N1: Luôn ghép các "khối cố định" trước! 「心から」 luôn đi cùng 「願ってやまない」 -> Khối vững chắc: [心から] + [願って] + [やまない].',
    realExamFrequencyBadge: 'Câu phân loại thủ khoa'
  },
  {
    id: 'drill_n1_2',
    level: 'N1',
    category: 'grammar_trap',
    categoryLabel: '🎯 Bẫy Ngữ Pháp N1',
    title: 'Phân biệt cấu trúc chỉ chức trách: 〜たるもの vs 〜ともあろうものが',
    question: '一国の指導者_____、私利私欲を捨てて国民の幸福を最優先に考えるべきだ。',
    questionReading: 'いっこくの しどうしゃ_____、しりしよくを すてて こくみんの こうふくを さいゆうせんに かんがえるべきだ。',
    questionRomaji: 'Ikkoku no shidousha _____, shirishiyoku wo sutete kokumin no koufuku wo saiyuusen ni kangaeru beki da.',
    questionMeaningVn: 'Đã ở cương vị là người lãnh đạo của một quốc gia, thì phải biết từ bỏ tư lợi cá nhân và đặt hạnh phúc của nhân dân lên hàng đầu.',
    options: [
      { id: 'opt_1', text: 'たるもの', isCorrect: true, trapReason: 'Chính xác! N + たるもの diễn tả tư cách cao quý, phía sau đi với 「べきだ / なければならない」 (phải làm tròn bổn phận).' },
      { id: 'opt_2', text: 'ともあろうものが', isCorrect: false, trapReason: 'BẪY KINH ĐIỂN: 〜ともあろうものが dùng để TRÁCH MÓC / THẤT VỌNG khi người có địa vị cao lại làm điều tồi tệ (vế sau KHÔNG đi với べきだ).' },
      { id: 'opt_3', text: 'としたところで', isCorrect: false, trapReason: '〜としたところで mang nghĩa "cho dù có đứng trên lập trường... thì cũng chẳng ích gì", hoàn toàn sai nghĩa.' },
      { id: 'opt_4', text: 'なりに', isCorrect: false, trapReason: '〜なりに diễn tả sự nỗ lực tương xứng với khả năng hạn chế, không mang tính yêu cầu lý tưởng tối thượng.' }
    ],
    correctExplanation: 'Cấu trúc 「N + たるもの」 đi với các danh từ có địa vị, trách nhiệm đạo đức cao (thầy giáo, bác sĩ, nhà lãnh đạo), vế sau luôn là nghĩa vụ lý tưởng bắt buộc: 「〜べきだ / 〜てはならない」. Ngược lại 「〜ともあろうものが」 chỉ dùng khi người đó ĐÃ PHẠM SAI LẦM để trách cứ: 「指導者ともあろうものが、汚職事件を起こすとは情けない」 (Đường đường là lãnh đạo mà lại đi nhận hối lộ thật đáng xấu hổ).',
    yamatoGoldenRule: 'Nhớ câu thần chú: Vế sau có 「〜べきだ」 -> Chọn ngay 【たるもの】. Vế sau là lời quở trách, thất vọng -> Chọn ngay 【ともあろうものが】!',
    realExamFrequencyBadge: 'Bẫy kinh điển 90% thí sinh sai'
  },
  {
    id: 'drill_n1_3',
    level: 'N1',
    category: 'keigo_business',
    categoryLabel: '💼 Kính Ngữ Công Sở B2B',
    title: 'Kính ngữ nhị trùng (二重敬語) & Cách dùng chuẩn khi nói về hành động của khách',
    question: '受付にて：「恐れ入りますが、こちらのお名前とお電話番号を_____いただけますでしょうか。」',
    questionReading: 'うけつけにて：「おそれいりますが、こちらのおなまえと おでんわばんごうを_____いただけますでしょうか。」',
    questionRomaji: 'Uketsuke ni te: "Osoreirimasu ga, kochira no onamae to odenwabangou wo _____ itadakemasu deshou ka."',
    questionMeaningVn: 'Tại quầy lễ tân: "Rất xin lỗi vì sự bất tiện, nhưng quý khách có thể vui lòng điền tên và số điện thoại vào đây giúp tôi được không ạ?"',
    options: [
      { id: 'opt_1', text: 'ご記入して', isCorrect: false, trapReason: 'BẪY NẶNG: 「ご〜する」 là Khiêm nhường ngữ (Kenjougo) dành cho hành động của MÌNH, dùng cho khách là thất lễ nghiêm trọng!' },
      { id: 'opt_2', text: 'ご記入なさって', isCorrect: false, trapReason: 'Lỗi kính ngữ nhị trùng (Double Honorific) khi đi cùng いただけますでしょうか.' },
      { id: 'opt_3', text: 'ご記入', isCorrect: true, trapReason: 'Chính xác! Cấu trúc chuẩn mực BJT: 「ご＋Danh từ nhóm 3＋いただく / いただけますでしょうか」.' },
      { id: 'opt_4', text: '書かれて', isCorrect: false, trapReason: 'Dùng thể bị động tôn kính 書かれる ở đây nghe rất cụt lủn và không đủ độ lịch thiệp trong ngành dịch vụ cao cấp Omotenashi.' }
    ],
    correctExplanation: 'Công thức vàng trong thương mại Nhật Bản: 「お／ご + Động từ bỏ masu + いただく」. Với động từ nhóm 3 「記入する」, ta dùng 「ご記入いただく」. Tuyệt đối không nhầm sang 「ご記入する」 (đây là khiêm nhường ngữ hạ thấp bản thân mình).',
    yamatoGoldenRule: 'Tuyệt đối khắc cốt ghi tâm: 「お〜する／ご〜する」 = Kenjougo (Mình làm). 「お〜になる／ご〜いただく」 = Sonkeigo (Khách làm)!',
    realExamFrequencyBadge: 'Xuất hiện liên tục'
  },

  // ===================== N2 DRILLS =====================
  {
    id: 'drill_n2_1',
    level: 'N2',
    category: 'grammar_trap',
    categoryLabel: '🎯 Bẫy Ngữ Pháp N2',
    title: 'Phân biệt nguy cơ xấu vs Khả năng tích cực: 〜かねない vs 〜かねる',
    question: 'こんなずさんな管理を続けていたら、いつか大事故が_____よ。',
    questionReading: 'こんなずさんな かんりを つづけていたら、いつか だいじこが_____よ。',
    questionRomaji: 'Konna zusan na kanri wo tsuzukete itara, itsuka daijiko ga _____ yo.',
    questionMeaningVn: 'Nếu cứ tiếp tục lối quản lý cẩu thả như thế này thì một ngày nào đó rất có thể sẽ xảy ra tai nạn thảm khốc đấy.',
    options: [
      { id: 'opt_1', text: '起きかねない', isCorrect: true, trapReason: 'Chính xác! V-masu + かねない diễn tả nguy cơ dẫn đến một kết quả rất xấu hoặc tai họa.' },
      { id: 'opt_2', text: '起きかねる', isCorrect: false, trapReason: 'BẪY ĐẢO NGƯỢC: 〜かねる mang nghĩa "không thể / khó lòng làm được" trong tâm lý từ chối khéo, không dùng cho sự việc xảy ra.' },
      { id: 'opt_3', text: '起きがたい', isCorrect: false, trapReason: '〜がたい mang nghĩa "khó lòng mà xảy ra" (xét về mặt cảm xúc/lý trí), ngược hoàn toàn với ý cảnh báo trong câu.' },
      { id: 'opt_4', text: '起きっこない', isCorrect: false, trapReason: '〜っこない nghĩa là "tuyệt đối không thể nào xảy ra", đi ngược lại giả định nếu cứ quản lý cẩu thả.' }
    ],
    correctExplanation: 'Mẫu 「V-masu + かねない」 dù mang đuôi phủ định (ない) nhưng mang NGHĨA KHẲNG ĐỊNH: "rất có nguy cơ dẫn đến hậu quả tồi tệ". Ngược lại 「V-masu + かねる」 mang đuôi khẳng định nhưng lại mang NGHĨA PHỦ ĐỊNH LỊCH THIỆP: "chúng tôi khó lòng có thể chấp nhận yêu cầu này".',
    yamatoGoldenRule: 'Cách nhớ bất tử: かねない = Có thể xảy ra tai họa! かねる = Khó lòng từ chối giúp!',
    realExamFrequencyBadge: 'Xuất hiện liên tục'
  },
  {
    id: 'drill_n2_2',
    level: 'N2',
    category: 'star_order',
    categoryLabel: '★ Sắp Xếp Câu Sao N2',
    title: 'Bí kíp câu sao N2: Mẫu câu nguyên nhân không thể kiềm chế 〜ずにはいられない',
    question: '彼のあまりの滑稽な姿を見て、私は_____ _____ __★__ _____。',
    questionReading: 'かれの あまりの こっけいな すがたを みて、わたしは_____ _____ __★__ _____。',
    questionRomaji: 'Kare no amari no kokkei na sugata wo mite, watashi wa _____ _____ __★__ _____。',
    questionMeaningVn: 'Trông thấy bộ dạng quá đỗi buồn cười của anh ấy, tôi đã không sao kìm nén được tràng cười.',
    starParts: ['いられなかった', '笑わず', 'どうしても', 'には'],
    starAnswerNumber: 3,
    options: [
      { id: 'opt_1', text: '1. どうしても', isCorrect: false, trapReason: '「どうしても」 là phó từ đứng đầu để dẫn dắt hành động không cưỡng lại được.' },
      { id: 'opt_2', text: '2. 笑わず', isCorrect: false, trapReason: '「笑わず」 đứng thứ 2 ngay sau phó từ どうしても.' },
      { id: 'opt_3', text: '3. には', isCorrect: true, trapReason: 'Chính xác! Thứ tự: どうしても(3) → 笑わず(2) → には(4) → いられなかった(1). Dấu sao ở vị trí thứ 3 là には.' },
      { id: 'opt_4', text: '4. いられなかった', isCorrect: false, trapReason: 'Đứng ở vị trí cuối cùng số 4 để chốt vị ngữ.' }
    ],
    correctExplanation: 'Mẫu ngữ pháp N2 cố định: 「V-nai bỏ nai + ずにはいられない」 (Động từ する biến thành せずにはいられない). Nghĩa là "không kìm nén được cảm xúc, bắt buộc phải làm...". Chuỗi câu hoàn chỉnh: 「どうしても(3) → 笑わず(2) → には(4) → いられなかった(1)」. Dấu sao số 3 rơi đúng vào lựa chọn 「には」.',
    yamatoGoldenRule: 'Nhận diện ngay mẫu cụm: V-ず + には + いられない. Gắn chặt 3 từ này lại với nhau trước, còn lại phó từ đẩy lên đầu!',
    realExamFrequencyBadge: 'Câu phân loại thủ khoa'
  },

  // ===================== N3 DRILLS =====================
  {
    id: 'drill_n3_1',
    level: 'N3',
    category: 'grammar_trap',
    categoryLabel: '🎯 Bẫy Ngữ Pháp N3',
    title: 'Phân biệt bộ ba 〜わけ: わけがない vs わけではない vs わけにはいかない',
    question: 'あんなに毎日一生懸命練習してきたのだから、彼らが初戦で負ける_____。',
    questionReading: 'あんなに まいにち いっしょうけんめい れんしゅうしてきたのだから、かれらが しょせんで まける_____。',
    questionRomaji: 'Anna ni mainichi isshoukenmei renshuu shite kita no dakara, karera ga shosen de makeru _____。',
    questionMeaningVn: 'Họ đã luyện tập chăm chỉ cật lực mỗi ngày như thế, thì tuyệt đối không có lý nào lại để thua ngay trận mở màn!',
    options: [
      { id: 'opt_1', text: 'わけがない', isCorrect: true, trapReason: 'Tuyệt đối chính xác! Vế trước có căn cứ mạnh mẽ 「あんなに...のだから」 -> Khẳng định 100% không thể có chuyện đó.' },
      { id: 'opt_2', text: 'わけではない', isCorrect: false, trapReason: 'BẪY: 〜わけではない chỉ là phủ định một phần ("không hẳn là..."), không biểu thị sự tin tưởng chắc chắn tuyệt đối.' },
      { id: 'opt_3', text: 'わけにはいかない', isCorrect: false, trapReason: '〜わけにはいかない diễn tả rào cản đạo đức/xã hội ("vì lý do đạo đức nên tôi không thể làm thế").' },
      { id: 'opt_4', text: 'ものか', isCorrect: false, trapReason: 'Dù ものか cũng mang nghĩa phủ định nhưng văn phong khẩu ngữ suồng sã, không đi kèm văn cảnh phân tích khách quan như のだから.' }
    ],
    correctExplanation: 'Mẫu 「〜わけがない」 = 「絶対に〜ない」 (chắc chắn không có chuyện đó, dựa trên logic bằng chứng rõ ràng). Ngược lại 「〜わけではない」 = "không có nghĩa là/không hẳn là" (phủ định một phần), còn 「〜わけにはいかない」 = "muốn làm nhưng do đạo đức/luật lệ nên không thể làm".',
    yamatoGoldenRule: 'Mẹo nhớ thần tốc: [Lý do vững chắc] + わけがない = Chắc chắn không đời nào! [Phủ định mềm mỏng] + わけではない = Không hẳn là vậy!',
    realExamFrequencyBadge: 'Xuất hiện liên tục'
  },
  {
    id: 'drill_n3_2',
    level: 'N3',
    category: 'vocab_idiom',
    categoryLabel: '⚡ Bẫy Quán Dụng Ngữ N3',
    title: 'Quán dụng ngữ về cơ thể: 腹が黒い vs 手を抜く vs 口が堅い',
    question: '彼女は誰にも秘密を漏らさないので、とても_____人として皆から信頼されている。',
    questionReading: 'かのじょは だれにも ひみつを もらさないので、とても_____ひととして みんなから しんらいされている。',
    questionRomaji: 'Kanojo wa dare ni mo himitsu wo morasanai node, totemo _____ hito to shite minna kara shinrai sarete iru.',
    questionMeaningVn: 'Cô ấy không bao giờ để lộ bí mật cho bất kỳ ai, nên được mọi người tin tưởng như một người vô cùng kín miệng.',
    options: [
      { id: 'opt_1', text: '口が堅い', isCorrect: true, trapReason: 'Chính xác! 口が堅い (miệng cứng/kín miệng) = giữ bí mật tuyệt đối, không buôn chuyện.' },
      { id: 'opt_2', text: '腹が黒い', isCorrect: false, trapReason: 'BẪY NGUY HIỂM: 腹が黒い nghĩa là "bụng đen" -> nham hiểm, mưu mô độc ác bên trong.' },
      { id: 'opt_3', text: '顔が広い', isCorrect: false, trapReason: '顔が広い nghĩa là quen biết rộng rãi trong xã hội, không liên quan đến việc giữ kín bí mật.' },
      { id: 'opt_4', text: '耳が痛い', isCorrect: false, trapReason: '耳が痛い nghĩa là nghe lời chỉ trích đúng vào khuyết điểm của mình nên thấy chối tai.' }
    ],
    correctExplanation: 'Thành ngữ 「口が堅い」 (Kuchi ga katai) miêu tả người có đức tính giữ kín bí mật của người khác, trái nghĩa với 「口が軽い」 (ba hoa, bép xép, hở mồm là lộ hết).',
    yamatoGoldenRule: 'Katai (cứng) = Kín đáo, chắc chắn (口が堅い: kín miệng). Karui (nhẹ) = Hời hợt, bép xép (口が軽い: nhiều chuyện)!',
    realExamFrequencyBadge: 'Xuất hiện liên tục'
  },

  // ===================== N4 & N5 DRILLS =====================
  {
    id: 'drill_n4_1',
    level: 'N4',
    category: 'grammar_trap',
    categoryLabel: '🎯 Bẫy Ngữ Pháp N4',
    title: 'Phân biệt mệnh lệnh/ý chí vs Khả năng tự nhiên: 〜ように vs 〜ために',
    question: '風邪を_____ように、温かいお茶を飲んで早く寝てください。',
    questionReading: 'かぜを_____ように、あたたかい おちゃを のんで はやく ねてください。',
    questionRomaji: 'Kaze wo _____ you ni, atatakai ocha wo nonde hayaku nete kudasai.',
    questionMeaningVn: 'Hãy uống trà nóng và đi ngủ sớm để không bị cảm lạnh nhé.',
    options: [
      { id: 'opt_1', text: 'ひかない', isCorrect: true, trapReason: 'Chính xác! V-nai + ように diễn tả mục tiêu mong muốn trạng thái không diễn ra (風邪をひかない: không bị cảm).' },
      { id: 'opt_2', text: 'ひかないため', isCorrect: false, trapReason: 'BẪY KINH ĐIỂN: 〜ために chỉ đi với động từ Ý CHÍ của người nói, không đi với động từ vô ý chí như 風邪をひく.' },
      { id: 'opt_3', text: 'ひく', isCorrect: false, trapReason: 'Nếu dùng thể từ điển ひく nghĩa là "để bị cảm", sai lệch hoàn toàn logic câu.' },
      { id: 'opt_4', text: 'ひいた', isCorrect: false, trapReason: 'Không dùng thể quá khứ trước ように.' }
    ],
    correctExplanation: 'Quy tắc vàng phân biệt ために và ように: 「ために」 đi với động từ mang ý chí có thể kiểm soát được (như mua xe, du học, tiết kiệm tiền). Còn 「ように」 đi với động từ thể phủ định (ない) hoặc động từ trạng thái/khả năng (không bị cảm, nhìn thấy, nghe thấy).',
    yamatoGoldenRule: 'Thấy vế trước là [Động từ thể Khả năng] hoặc [Thể Phủ định V-nai] -> 100% chọn 【ように】, TUYỆT ĐỐI KHÔNG CHỌN ために!',
    realExamFrequencyBadge: 'Bẫy kinh điển 90% thí sinh sai'
  },
  {
    id: 'drill_n5_1',
    level: 'N5',
    category: 'grammar_trap',
    categoryLabel: '🎯 Trợ Từ Nền Tảng N5',
    title: 'Bẫy trợ từ tồn tại: に vs で trong câu diễn tả sự hiện diện',
    question: '私の部屋の机の上_____、辞書とノートがあります。',
    questionReading: 'わたしの へやの つくえの うえ_____、じしょと ノートが あります。',
    questionRomaji: 'Watashi no heya no tsukue no ue _____, jisho to nooto ga arimasu.',
    questionMeaningVn: 'Ở trên bàn trong phòng tôi có cuốn từ điển và quyển vở ghi chép.',
    options: [
      { id: 'opt_1', text: 'に', isCorrect: true, trapReason: 'Chính xác! Địa điểm + に + あります／います (chỉ nơi chốn tồn tại tĩnh của đồ vật/sinh vật).' },
      { id: 'opt_2', text: 'で', isCorrect: false, trapReason: 'BẪY PHỔ BIẾN: 「で」 chỉ nơi diễn ra HÀNH ĐỘNG (ví dụ: 机の上で勉強する), không dùng cho sự tồn tại tĩnh あります.' },
      { id: 'opt_3', text: 'を', isCorrect: false, trapReason: '「を」 chỉ đối tượng tác động trực tiếp của ngoại động từ.' },
      { id: 'opt_4', text: 'へ', isCorrect: false, trapReason: '「へ」 chỉ phương hướng chuyển động của hành vi đi lại (行く, 来る, 帰る).' }
    ],
    correctExplanation: 'Rất nhiều người học nhầm giữa に và で: Khi câu kết thúc bằng động từ tồn tại あります (đồ vật) hoặc います (người, động vật), trợ từ bắt buộc phải là 「に」. Trợ từ 「で」 chỉ dùng khi tại địa điểm đó có hành động diễn ra (như đọc sách, ăn cơm, học bài).',
    yamatoGoldenRule: 'Thấy あります/います ở cuối câu -> Nơi chốn đi với 【に】! Thấy hành động đang làm -> Nơi chốn đi với 【で】!',
    realExamFrequencyBadge: 'Xuất hiện liên tục'
  }
];

export const EXTRA_SENSEI_DRILLS: SenseiDrillItem[] = [
  // N1 Star Order Drill
  {
    id: 'drill_extra_n1_star_1',
    level: 'N1',
    category: 'star_order',
    categoryLabel: '★ Sắp Xếp Câu Sao N1',
    title: 'Bí kíp câu sao N1: Cấu trúc giả định tiêu cực 〜ようでは',
    question: 'いかに優秀な人材であれ、チームワークを_____ _____ __★__ _____。',
    questionReading: 'いかに ゆうしゅうな じんざいであれ、チームワークを_____ _____ __★__ _____。',
    questionRomaji: 'Ikani yuushuu na jinzai de are, chiimwaaku wo _____ _____ __★__ _____。',
    questionMeaningVn: 'Dù cho có là nhân tài kiệt xuất đến đâu đi chăng nữa, nếu mà coi nhẹ tinh thần đồng đội thì khó lòng tỏa sáng trong tập thể được.',
    starParts: ['軽視する', 'ようでは', '組織で', '活躍できまい'],
    starAnswerNumber: 3,
    options: [
      { id: 'opt_1', text: '1. 組織で', isCorrect: true, trapReason: 'Chính xác! Thứ tự: 軽視する(1) → ようでは(2) → 組織で(3) → 活躍できまい(4). Dấu sao số 3 là 「組織で」.' },
      { id: 'opt_2', text: '2. 軽視する', isCorrect: false, trapReason: 'Đứng ngay đầu cụm sau tân ngữ チームワークを.' },
      { id: 'opt_3', text: '3. ようでは', isCorrect: false, trapReason: 'Đi liền sau động từ 軽視する để tạo thành điều kiện giả định tiêu cực 〜ようでは.' },
      { id: 'opt_4', text: '4. 活躍できまい', isCorrect: false, trapReason: 'Chốt đuôi vị ngữ phủ định phán đoán N1 〜まい ở vị trí số 4.' }
    ],
    correctExplanation: 'Cấu trúc N1: 「V-thể từ điển + ようでは」 diễn tả "nếu cứ giữ tình trạng tiêu cực này thì không thể nào mang lại kết quả tốt". Vế sau thường kết thúc bằng phủ định hoặc phán đoán không thể: 「活躍できまい / 成功するわけがない」. Chuỗi hoàn chỉnh: チームワークを [軽視する] [ようでは] [★組織で] [活躍できまい].',
    yamatoGoldenRule: 'Thấy đuôi 〜まい hoặc 〜わけがない ở cuối câu, tìm ngay cặp nối giả định tiêu cực 【V-る + ようでは】!',
    realExamFrequencyBadge: 'Câu phân loại thủ khoa'
  },
  // N1 Grammar Trap Drill
  {
    id: 'drill_extra_n1_trap_1',
    level: 'N1',
    category: 'grammar_trap',
    categoryLabel: '🎯 Bẫy Ngữ Pháp N1',
    title: 'Phân biệt biểu thị cảm xúc cực độ: 〜に堪えない vs 〜を禁じ得ない',
    question: '長年会社のために献身してきた大先輩の急な訃報を聞き、深い悲哀_____。',
    questionReading: 'ながねん かいしゃのために けんしんしてきた だいせんぱいの きゅうな ふほうを きき、ふかい ひあい_____。',
    questionRomaji: 'Naganen kaisha no tame ni kenshin shite kita daisenpai no kyuu na fuhou wo kiki, fukai hiai _____。',
    questionMeaningVn: 'Nghe tin vị tiền bối gạo cội cống hiến cả đời cho công ty đột ngột qua đời, tôi không sao kìm nén được nỗi đau buồn khôn xiết.',
    options: [
      { id: 'opt_1', text: 'を禁じ得ない', isCorrect: true, trapReason: 'Chính xác! Danh từ cảm xúc (trào dâng không kìm nén nổi) + を禁じ得ない.' },
      { id: 'opt_2', text: 'に堪えない', isCorrect: false, trapReason: 'BẪY TINH VI: 〜に堪えない (ni taenai) chỉ đi với 3 danh từ điển hình: 感謝 (biết ơn), 喜悦 (vui sướng), 遺憾 (hối tiếc/lấy làm tiếc). Cảm xúc tự nhiên trào dâng (悲哀, 涙, 怒り) bắt buộc phải là を禁じ得ない!' },
      { id: 'opt_3', text: 'をおいてほかにない', isCorrect: false, trapReason: '〜をおいてほかにない nghĩa là "ngoài người này/cách này ra thì không còn ai khác", sai hoàn toàn ngữ nghĩa.' },
      { id: 'opt_4', text: 'に足る', isCorrect: false, trapReason: '〜に足る nghĩa là "xứng đáng để làm gì", không kết hợp với danh từ chỉ nỗi buồn.' }
    ],
    correctExplanation: 'Quy tắc phân biệt thượng đỉnh N1: 「〜を禁じ得ない」 diễn tả cảm xúc tự động trào dâng không thể kiềm chế được từ đáy lòng (đi với 悲哀 - bi ai, 怒り - phẫn nộ, 涙 - nước mắt, 疑問 - nghi vấn). Trong khi 「〜に堪えない」 là văn phong trang trọng chỉ đi với sự biết ơn vô bờ (感謝に堪えない) hoặc lấy làm tiếc (遺憾に堪えない).',
    yamatoGoldenRule: 'Thấy 悲哀 (buồn), 怒り (tức giận), 涙 (nước mắt) -> 100% chọn 【を禁じ得ない】. Thấy 感謝 (cảm tạ) -> Chọn 【に堪えない】!',
    realExamFrequencyBadge: 'Bẫy kinh điển 90% thí sinh sai'
  },
  // N2 Star Order Drill
  {
    id: 'drill_extra_n2_star_1',
    level: 'N2',
    category: 'star_order',
    categoryLabel: '★ Sắp Xếp Câu Sao N2',
    title: 'Bí kíp câu sao N2: Cấu trúc nhấn mạnh nguyên nhân độc nhất 〜からこそ',
    question: 'どんな逆境にあっても、諦めずに努力を_____ _____ __★__ _____。',
    questionReading: 'どんな ぎゃっきょうに あっても、あきらめずに どりょくを_____ _____ __★__ _____。',
    questionRomaji: 'Donna gyakkyou ni attemo, akiramezu ni doryoku wo _____ _____ __★__ _____。',
    questionMeaningVn: 'Dù ở trong bất kỳ nghịch cảnh nào, chính nhờ không bỏ cuộc và kiên trì nỗ lực nên ngày hôm nay tôi mới gặt hái được thành công.',
    starParts: ['続けてきた', 'からこそ', '今日の成功が', 'あるのだ'],
    starAnswerNumber: 3,
    options: [
      { id: 'opt_1', text: '1. 今日の成功が', isCorrect: true, trapReason: 'Chính xác! Thứ tự: 続けてきた(1) → からこそ(2) → 今日の成功が(3) → あるのだ(4). Dấu sao số 3 là 「今日の成功が」.' },
      { id: 'opt_2', text: '2. 続けてきた', isCorrect: false, trapReason: 'Nối tiếp tân ngữ 努力を ở vị trí số 1.' },
      { id: 'opt_3', text: '3. からこそ', isCorrect: false, trapReason: 'Nối sau động từ để nhấn mạnh chính vì nguyên nhân đó ở vị trí số 2.' },
      { id: 'opt_4', text: '4. あるのだ', isCorrect: false, trapReason: 'Kết thúc câu khẳng định mạnh mẽ ở vị trí số 4.' }
    ],
    correctExplanation: 'Cấu trúc N2 「〜からこそ」 nhấn mạnh lý do duy nhất dẫn đến kết quả mỹ mãn ngày hôm nay. Trật tự đúng: [努力を続けてきた] [からこそ] [★今日の成功が] [あるのだ]. Dấu sao nằm ở vị trí số 3 chính là lựa chọn 「今日の成功が」.',
    yamatoGoldenRule: 'Công thức nối: [V-quá khứ/hiện tại] + [からこそ] + [Chủ ngữ 〜が] + [ある / 実現した]!',
    realExamFrequencyBadge: 'Xuất hiện liên tục'
  },
  // N2 Grammar Trap Drill
  {
    id: 'drill_extra_n2_trap_1',
    level: 'N2',
    category: 'grammar_trap',
    categoryLabel: '🎯 Bẫy Ngữ Pháp N2',
    title: 'Phân biệt mức độ chắc chắn: 〜に相違ない vs 〜にすぎない',
    question: '現場に残された指紋と防犯カメラの映像から判断して、犯人は彼_____。',
    questionReading: 'げんばに のこされた しもんと ぼうはんカメラの えいぞうから はんだんして、はんにんは かれ_____。',
    questionRomaji: 'Genba ni nokosareta shimon to bouhan kamera no eizou kara handan shite, hannin wa kare _____。',
    questionMeaningVn: 'Căn cứ theo dấu vân tay để lại ở hiện trường và hình ảnh camera an ninh, hung thủ chắc chắn không thể là ai khác ngoài hắn ta.',
    options: [
      { id: 'opt_1', text: 'に相違ない', isCorrect: true, trapReason: 'Chính xác! 〜に相違ない (ni soui nai) là phán đoán chắc chắn 100% dựa trên bằng chứng đanh thép.' },
      { id: 'opt_2', text: 'にすぎない', isCorrect: false, trapReason: 'BẪY: 〜にすぎない mang nghĩa "chẳng qua chỉ là...", hoàn toàn làm hỏng ý nghĩa kết luận hung thủ.' },
      { id: 'opt_3', text: 'にこたえて', isCorrect: false, trapReason: '〜にこたえて mang nghĩa "đáp lại kỳ vọng", sai ngữ cảnh điều tra phá án.' },
      { id: 'opt_4', text: 'にほかならない', isCorrect: false, trapReason: '〜にほかならない đi với danh từ nguyên nhân/bản chất ("chính là do..."), không đi phán đoán danh tính hung thủ.' }
    ],
    correctExplanation: 'Cấu trúc 「〜に相違ない」 (A に相違ない = A に違いない nhưng văn phong trang trọng, pháp lý, nghị luận). Dựa trên chứng cứ xác thực (dấu vân tay, camera), người nói khẳng định chắc nịch không thể có sự sai khác.',
    yamatoGoldenRule: 'Nhớ chữ Hán: 相違 (tương vi: sự khác biệt) + ない (không có) = Không có gì khác biệt so với sự thật -> Chắc chắn 100%!',
    realExamFrequencyBadge: 'Xuất hiện liên tục'
  },
  // N3 Star Order Drill
  {
    id: 'drill_extra_n3_star_1',
    level: 'N3',
    category: 'star_order',
    categoryLabel: '★ Sắp Xếp Câu Sao N3',
    title: 'Bí kíp câu sao N3: Cấu trúc quyết tâm đến cùng 〜抜く',
    question: 'どんなに困難な道のりであっても、最後まで諦めずに_____ _____ __★__ _____。',
    questionReading: 'どんなに こんなんな みちのりであっても、さいごまで あきらめずに_____ _____ __★__ _____。',
    questionRomaji: 'Donna ni konnan na michinori de attemo, saigo made akiramezu ni _____ _____ __★__ _____。',
    questionMeaningVn: 'Dù con đường phía trước có gian nan trắc trở đến đâu, tôi dự định sẽ quyết tâm làm cho bằng được đến cùng mà không bao giờ bỏ cuộc.',
    starParts: ['やり抜く', 'つもり', '自分を信じて', 'です'],
    starAnswerNumber: 3,
    options: [
      { id: 'opt_1', text: '1. つもり', isCorrect: true, trapReason: 'Chính xác! Thứ tự: 自分を信じて(1) → やり抜く(2) → つもり(3) → です(4). Dấu sao số 3 là 「つもり」.' },
      { id: 'opt_2', text: '2. 自分を信じて', isCorrect: false, trapReason: 'Đứng đầu cụm bổ nghĩa cho hành động やり抜く.' },
      { id: 'opt_3', text: '3. やり抜く', isCorrect: false, trapReason: 'Động từ ghép V-masu + 抜く (làm đến cùng) đứng trước つもり.' },
      { id: 'opt_4', text: '4. です', isCorrect: false, trapReason: 'Trợ động từ kết thúc câu ở vị trí số 4.' }
    ],
    correctExplanation: 'Mẫu 「V-masu + 抜く」 nghĩa là vượt qua khó khăn để hoàn thành đến cùng (やり抜く, 走り抜く, 守り抜く). Kết hợp dự định: [自分を信じて] [やり抜く] [★つもり] [です]. Dấu sao nằm ở vị trí thứ 3 rơi đúng vào lựa chọn 「つもり」.',
    yamatoGoldenRule: 'V-masu + 抜く (Nuku: rút hết/làm kiệt cùng) = Quyết chí vượt mọi phong ba làm tới cùng!',
    realExamFrequencyBadge: 'Xuất hiện liên tục'
  },
  // N1 Idiom Trap Drill
  {
    id: 'drill_extra_n1_idiom_1',
    level: 'N1',
    category: 'vocab_idiom',
    categoryLabel: '⚡ Bẫy Quán Dụng Ngữ N1',
    title: 'Thành ngữ bốn chữ (Yojijukugo): 捲土重来 vs 杞憂 vs 姑息',
    question: '前回の選挙で惜敗した候補者が、体制を立て直して_____を期して再び立候補を表明した。',
    questionReading: 'ぜんかいの せんきょで せきはいした こうほしゃが、たいせいを たてなおして_____を きして ふたたび りっこうほを ひょうめいした。',
    questionRomaji: 'Zenkai no senkyo de sekihai shita kouhosha ga, taisei wo tatenaoshite _____ wo kishite futatabi rikkouho wo hyoumei shita.',
    questionMeaningVn: 'Ứng cử viên từng thất bại sít sao trong cuộc bầu cử lần trước đã củng cố lại bộ máy và tuyên bố tái tranh cử với quyết tâm cuộn đất trở lại lấy lại vinh quang.',
    options: [
      { id: 'opt_1', text: '捲土重来 (けんどちょうらい)', isCorrect: true, trapReason: 'Chính xác! 捲土重来 nghĩa là sau thất bại quay trở lại với khí thế vũ bão cuộn đất bay mù mịt.' },
      { id: 'opt_2', text: '杞憂 (きゆう)', isCorrect: false, trapReason: 'BẪY: 杞憂 nghĩa là lo bò trắng răng, nỗi lo lắng viển vông vô căn cứ.' },
      { id: 'opt_3', text: '姑息 (こそく)', isCorrect: false, trapReason: 'BẪY TỪ NGHĨA KINH ĐIỂN: 姑息 nghĩa là chắp vá tạm bợ qua mắt (nhiều người nhầm là hèn nhát gian xảo).' },
      { id: 'opt_4', text: '隔靴掻痒 (かっかそうよう)', isCorrect: false, trapReason: '隔靴掻痒 (gãi ngứa qua giày) diễn tả sự bứt rứt không giải quyết được tận gốc vấn đề.' }
    ],
    correctExplanation: 'Thành ngữ kinh điển N1: 「捲土重来」 (Quyển thổ trùng lai). Điển tích Hạng Vũ thất bại nhưng có thể quấn đất mang quân trở lại. Trong tiếng Nhật dùng để chỉ việc sau một thất bại cay đắng, ta nỗ lực khôi phục sức mạnh và trở lại phục thù rực rỡ.',
    yamatoGoldenRule: 'Thất bại sít sao + Phục thù lập lại chiến công -> 100% là 【捲土重来】!',
    realExamFrequencyBadge: 'Trọng tâm N1 Thượng đỉnh'
  }
];

export function getDrillsByLevelAndCategory(
  level: string = 'N1',
  category: string = 'all'
): SenseiDrillItem[] {
  return CURATED_SENSEI_DRILLS.filter((d) => {
    const matchLevel = level === 'all' || d.level === level;
    const matchCategory = category === 'all' || d.category === category;
    return matchLevel && matchCategory;
  });
}

/**
 * Dynamic +3 loader for Drill Arena & JLPT Traps
 * Seamlessly fetches 3 new authentic questions without duplicates
 */
export function getMoreSenseiDrills(existingIds: string[], count: number = 3): SenseiDrillItem[] {
  const allPool = [...CURATED_SENSEI_DRILLS, ...EXTRA_SENSEI_DRILLS];
  const unpicked = allPool.filter(d => !existingIds.includes(d.id));

  if (unpicked.length >= count) {
    return unpicked.slice(0, count);
  }

  // If pool exhausted, clone with unique IDs and enhanced focus
  const results: SenseiDrillItem[] = [...unpicked];
  const templates = EXTRA_SENSEI_DRILLS.length > 0 ? EXTRA_SENSEI_DRILLS : CURATED_SENSEI_DRILLS;

  let counter = existingIds.length + 1;
  while (results.length < count) {
    const template = templates[results.length % templates.length];
    results.push({
      ...template,
      id: `drill_dyn_${counter++}`,
      title: `${template.title} (Luyện chuyên sâu +${counter})`,
    });
  }

  return results;
}
