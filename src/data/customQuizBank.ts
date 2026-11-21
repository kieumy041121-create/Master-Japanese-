import { CustomQuizQuestion } from '../types/quizGenerator';

export const CURATED_CUSTOM_QUIZ_BANK: CustomQuizQuestion[] = [
  // ==========================================
  // 1. 🈶 HÁN TỰ (KANJI)
  // ==========================================
  // N1 - Kanji Yomi
  {
    id: 'cq_k_n1_1',
    level: 'N1',
    format: 'kanji',
    subFormat: 'kanji_yomi',
    subFormatTitle: 'Hán tự · Cách đọc Hiragana (Kanji Yomi)',
    instruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
    content: 'この件に関して、彼は終始【曖昧】な態度を崩さなかった。',
    audioText: 'この件に関して、彼は終始曖昧な態度を崩さなかった。',
    options: ['あいまい', 'あいみょう', 'あいばい', 'あいみ'],
    correctIndex: 0,
    explanation: '【曖昧】(あいまい - Mơ hồ, mập mờ, không rõ ràng). Chữ 曖 (Ái) đọc âm On là あい, 昧 (Muội) đọc là まい.',
    grammarMnemonic: 'Ái Muội = Mơ hồ khó đoán -> Aimai.',
    sourceTag: 'Kho bản quyền JLPT N1',
  },
  {
    id: 'cq_k_n1_2',
    level: 'N1',
    format: 'kanji',
    subFormat: 'kanji_yomi',
    subFormatTitle: 'Hán tự · Cách đọc Hiragana (Kanji Yomi)',
    instruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
    content: '新制度の導入には、各方面への【配慮】が欠かせない。',
    audioText: '新制度の導入には、各方面への配慮が欠かせない。',
    options: ['はいりょ', 'はいろう', 'はいろ', 'はいれい'],
    correctIndex: 0,
    explanation: '【配慮】(はいりょ - Phối lự): Quan tâm, để ý, cân nhắc chu đáo đến cảm xúc hoặc quyền lợi người khác.',
    grammarMnemonic: 'Phối lự = Chia sẻ lo nghĩ -> Hairyo.',
    sourceTag: 'Kho bản quyền JLPT N1',
  },
  // N1 - Kanji Hyoki
  {
    id: 'cq_k_n1_3',
    level: 'N1',
    format: 'kanji',
    subFormat: 'kanji_hyoki',
    subFormatTitle: 'Hán tự · Chọn chữ Hán từ âm đọc (Kanji Hyoki)',
    instruction: '____の言葉を漢字で書くとき、最もよいものを、1・2・3・4から一つ選びなさい。',
    content: '過去の失敗に【しゅうちゃく】せず、前を向いて進むべきだ。',
    audioText: '過去の失敗にしゅうちゃくせず、前を向いて進むべきだ。',
    options: ['執着', '集着', '拾着', '執終'],
    correctIndex: 0,
    explanation: '【執着】(しゅうちゃく - Chấp trước): Bám chấp, vấn vương, khư khư không buông bỏ được.',
    grammarMnemonic: 'Chấp thủ + Trước ý = 執着 (Shuuchaku).',
    sourceTag: 'Kho bản quyền JLPT N1',
  },
  // N2 - Kanji Radicals & Similar Kanji
  {
    id: 'cq_k_n2_1',
    level: 'N2',
    format: 'kanji',
    subFormat: 'kanji_radicals',
    subFormatTitle: 'Hán tự · Nhận diện chữ Hán tương tự & Bộ thủ',
    instruction: '文中の（　）に入る最も適切な漢字の組み合わせを選びなさい。',
    content: '自然の（　）威に圧倒され、人間の無力さを（　）感した。',
    audioText: '自然のきいに圧倒され、人間の無力さを痛感した。',
    options: ['脅 / 痛', '脅 / 通', '脇 / 痛', '勢 / 痛'],
    correctIndex: 0,
    explanation: 'Từ 1: 【脅威】(きょうい - Hiếp uy): Mối đe dọa, bộ Nhục (Nguyệt) phía dưới. Từ 2: 【痛感】(つうかん - Thống cảm): Cảm nhận sâu sắc, bộ Nạch (Bệnh 疒).',
    grammarMnemonic: 'Hiếp (脅) có 3 lực trên 1 nguyệt; Thống (痛) có bộ nạch chỉ nỗi đau.',
    sourceTag: 'Kho bản quyền JLPT N2',
  },
  // N3 - Kanji Yomi
  {
    id: 'cq_k_n3_1',
    level: 'N3',
    format: 'kanji',
    subFormat: 'kanji_yomi',
    subFormatTitle: 'Hán tự · Cách đọc Hiragana (Kanji Yomi)',
    instruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
    content: '会議の開始時間を【延期】することになった。',
    audioText: '会議の開始時間を延期することになった。',
    options: ['えんき', 'えいき', 'ていき', 'えんご'],
    correctIndex: 0,
    explanation: '【延期】(えんき - Duyên kỳ): Hoãn lại, dời ngày. Chữ 延 đọc là えん, chữ 期 đọc là き.',
    grammarMnemonic: 'Duyên hạn kéo dài = Enki.',
    sourceTag: 'Kho bản quyền JLPT N3',
  },

  // ==========================================
  // 2. 📖 TỪ VỰNG & COLLOCATION
  // ==========================================
  // N1 - Particle Collocation (Cụm từ đi kèm trợ từ tự nhiên)
  {
    id: 'cq_v_n1_1',
    level: 'N1',
    format: 'vocab_collocation',
    subFormat: 'particle_collocation',
    subFormatTitle: 'Từ vựng & Collocation · Cụm từ đi kèm trợ từ tự nhiên',
    instruction: '文中の（　）に入れるのに最も自然な連語（コロケーション）を選びなさい。',
    content: '彼の丁寧な説明を聞いて、ようやく疑問が（　）。',
    audioText: '彼の丁寧な説明を聞いて、ようやく疑問が腑に落ちた。',
    options: ['腑に落ちた', '腹に収まった', '胸に刺さった', '頭を抱えた'],
    correctIndex: 0,
    explanation: 'Quán dụng ngữ N1: 【腑に落ちる】(ふにおちる - Phủ lạc): Thấu suốt, hiểu ra hoàn toàn, nút thắt trong lòng được gỡ bỏ.',
    grammarMnemonic: 'Phủ tạng nuốt trôi = Hoàn toàn thông suốt (Fu ni ochiru).',
    sourceTag: 'Kho Collocation Tự Nhiên N1',
  },
  // N1 - Fukugoudoushi (Từ ghép)
  {
    id: 'cq_v_n1_2',
    level: 'N1',
    format: 'vocab_collocation',
    subFormat: 'fukugoudoushi',
    subFormatTitle: 'Từ vựng & Collocation · Phân biệt từ ghép (Fukugoudoushi)',
    instruction: '（　）に入れるのに最もよい複合動詞を、1・2・3・4から一つ選びなさい。',
    content: '台風の接近に伴い、海岸には次々と高い波が（　）きた。',
    audioText: '台風の接近に伴い、海岸には次々と高い波が押し寄せてきた。',
    options: ['押し寄せて', '引き締めて', '駆け引きして', '乗り越えて'],
    correctIndex: 0,
    explanation: '【押し寄せる】(おしよせる - Áp Ký): Ồ ạt ùa tới, dồn dập kéo đến (thường dùng cho sóng lớn, đám đông, cảm xúc).',
    grammarMnemonic: 'Đẩy (押) + Tới gần (寄) = Ồ ạt ùa tới (Oshiyoseru).',
    sourceTag: 'Kho từ ghép Fukugoudoushi N1',
  },
  // N2 - Contextual Vocab
  {
    id: 'cq_v_n2_1',
    level: 'N2',
    format: 'vocab_collocation',
    subFormat: 'contextual_vocab',
    subFormatTitle: 'Từ vựng & Collocation · Điền từ hợp ngữ cảnh',
    instruction: '（　）に入れるのに最もよい言葉を、1・2・3・4から一つ選びなさい。',
    content: '今回のプロジェクトの成功は、チーム全員の協力の（　）だ。',
    audioText: '今回のプロジェクトの成功は、チーム全員の協力のたまものだ。',
    options: ['たまもの', 'あかし', 'なごり', 'きざし'],
    correctIndex: 0,
    explanation: '【賜物】(たまもの - Thao vật): Thành quả ngọt ngào, kết tinh quý báu từ sự nỗ lực cố gắng (thường đi với 努力・協力の賜物).',
    grammarMnemonic: 'Quà ban tặng từ trời đất/nỗ lực = Tamamono.',
    sourceTag: 'Kho bản quyền JLPT N2',
  },
  // N3 - Collocation with particle
  {
    id: 'cq_v_n3_1',
    level: 'N3',
    format: 'vocab_collocation',
    subFormat: 'particle_collocation',
    subFormatTitle: 'Từ vựng & Collocation · Cụm từ đi kèm trợ từ tự nhiên',
    instruction: '（　）に入る正しい助詞と動詞の組み合わせを選びなさい。',
    content: '隣の部屋から、何やら怪しい物音（　）。',
    audioText: '隣の部屋から、何やら怪しい物音がする。',
    options: ['がする', 'を見る', 'にする', 'を行う'],
    correctIndex: 0,
    explanation: 'Cụm diễn đạt cảm giác giác quan tự phát (âm thanh, mùi vị, điềm báo): 【〜がする】 (音がする, 匂いがする, 気がする).',
    grammarMnemonic: 'Giác quan cảm nhận tự nhiên dùng trợ từ が + する.',
    sourceTag: 'Kho bản quyền JLPT N3',
  },

  // ==========================================
  // 3. 🧩 NGỮ PHÁP & BÀI TẬP DẤU SAO (★)
  // ==========================================
  // N1 - Star Mondai
  {
    id: 'cq_g_n1_1',
    level: 'N1',
    format: 'grammar_star',
    subFormat: 'star_mondai',
    subFormatTitle: 'Ngữ pháp · Bài tập Dấu sao (Star Mondai ★)',
    instruction: '次の文の ★ に入る最もよいものを、1・2・3・4から一つ選びなさい。',
    content: 'どんなに技術が________  ________  ★  ________ 決して忘れてはならない。',
    audioText: 'どんなに技術が進歩しようとも、人間としての倫理観を決して忘れてはならない。',
    starTokens: ['進歩しようと', '倫理観を', '人間としての', 'も'],
    starTargetIndex: 2, // Vị trí thứ 3 là dấu sao
    options: ['1 (進歩しようと)', '4 (も)', '3 (人間としての)', '2 (倫理観を)'],
    correctIndex: 2, // '3 (人間としての)' nằm ở vị trí thứ 3
    explanation: 'Trật tự câu ghép hoàn chỉnh: どんなに技術が [1. 進歩しようと] [4. も] ★ [3. 人間としての] [2. 倫理観を] 決して忘れてはならない。\nCấu trúc: 〜ようとも (Dù có... đi chăng nữa). Dấu sao ★ rơi vào mảnh ghép số 3.',
    grammarMnemonic: '〜ようとも (dù có thế nào chăng nữa). Vị trí sao: Nhân gian đích (人間としての).',
    sourceTag: 'Bẫy Dấu Sao JLPT N1',
  },
  {
    id: 'cq_g_n1_2',
    level: 'N1',
    format: 'grammar_star',
    subFormat: 'star_mondai',
    subFormatTitle: 'Ngữ pháp · Bài tập Dấu sao (Star Mondai ★)',
    instruction: '次の文の ★ に入る最もよいものを、1・2・3・4から一つ選びなさい。',
    content: '彼ほどの________  ________  ★  ________ 誰も信じられなかった。',
    audioText: '彼ほどの実力者であれ、あのような初歩的なミスを犯すとは、誰も信じられなかった。',
    starTokens: ['あのような', 'ミスを犯すとは', '実力者であれ', '初歩的な'],
    starTargetIndex: 2,
    options: ['3 (実力者であれ)', '1 (あのような)', '4 (初歩的な)', '2 (ミスを犯すとは)'],
    correctIndex: 2, // '4 (初歩的な)' nằm ở vị trí thứ 3
    explanation: 'Trật tự câu ghép: 彼ほどの [3. 実力者であれ] [1. あのような] ★ [4. 初歩的な] [2. ミスを犯すとは] 誰も信じられなかった。\nCấu trúc: 〜であれ (Ngay cả là / Dù là... cỡ như anh ấy). Dấu sao ★ rơi vào mảnh ghép số 4.',
    grammarMnemonic: '〜であれ: Dù là ai chăng nữa. Vị trí sao: 初歩的な (Sơ bộ đích).',
    sourceTag: 'Bẫy Dấu Sao JLPT N1',
  },
  // N2 - Particle & Conjunction
  {
    id: 'cq_g_n2_1',
    level: 'N2',
    format: 'grammar_star',
    subFormat: 'particle_conjunction',
    subFormatTitle: 'Ngữ pháp · Trợ từ & Liên từ kết nối',
    instruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
    content: '新商品の発表会は、大勢の報道陣が見守る（　）、華やかに行われた。',
    audioText: '新商品の発表会は、大勢の報道陣が見守るなか、華やかに行われた。',
    options: ['なか', 'うえに', 'あげく', 'ばかりに'],
    correctIndex: 0,
    explanation: '【〜なか（の中で）】: Trong lúc/Dưới sự chứng kiến của (diễn tả bối cảnh đang diễn ra một sự việc trang trọng).',
    grammarMnemonic: 'Bối cảnh xung quanh đang diễn tiến: 〜なか.',
    sourceTag: 'Kho bản quyền JLPT N2',
  },

  // ==========================================
  // 4. 📄 ĐỌC HIỂU (DOKKAI STUDIO)
  // ==========================================
  // N1 - Dokkai Short Passage (Chủ ý tác giả)
  {
    id: 'cq_d_n1_1',
    level: 'N1',
    format: 'reading_dokkai',
    subFormat: 'short_passage',
    subFormatTitle: 'Đọc hiểu · Đoạn văn ngắn & Chủ ý tác giả',
    instruction: '次の文章を読んで、筆者の最も主張したいこととして適当なものを一つ選びなさい。',
    passage: `現代社会において「効率性」は絶対的な善とみなされがちである。無駄を省き、最小の時間で最大の成果を上げることが称賛される。しかし、文化や芸術、あるいは人間関係の深まりといったものは、往々にして「一見無駄に見える時間」の中にこそ宿るのではないだろうか。効率の追求の果てに私たちが失うものの重さに、今一度目を向ける必要がある。`,
    content: '筆者がこの文章で最も言いたいことは何か。',
    audioText: '現代社会において効率性は絶対的な善とみなされがちである。しかし、文化や芸術は一見無駄に見える時間の中にこそ宿る。',
    options: [
      '効率性の過度な追求によって、文化や人間関係の深みといった大切な価値が失われることを危惧している。',
      '現代社会では効率性を高めなければ、文化や芸術の発展は望めないということ。',
      '無駄な時間をすべて排除することこそが、豊かな人間関係を築くための唯一の道である。',
      '仕事においては常に効率を優先し、私生活でのみ芸術を楽しむべきだということ。'
    ],
    correctIndex: 0,
    explanation: 'Tác giả dùng cấu trúc chuyển ý "しかし" và câu hỏi tu từ "宿るのではないだろうか" để lật lại quan điểm xã hội coi trọng hiệu suất tuyệt đối, từ đó cảnh báo về việc đánh mất chiều sâu văn hóa và sự kết nối con người.',
    grammarMnemonic: 'Bẫy Dokkai: Quan sát từ nối "しかし" và câu kết thúc "目を向ける必要がある" để tóm bắt ý chính của tác giả.',
    sourceTag: 'Dokkai N1 · Bình Luận Văn Hóa Xã Hội',
  },
  // N2 - Dokkai Underlined Phrase
  {
    id: 'cq_d_n2_1',
    level: 'N2',
    format: 'reading_dokkai',
    subFormat: 'underlined_phrase',
    subFormatTitle: 'Đọc hiểu · Giải thích cụm từ gạch chân',
    instruction: '文章中の【下線部】が意味するものとして最も適切なものを一つ選びなさい。',
    passage: `言葉は時代とともに変化する生き物である。若者言葉や新しいスラングを「乱れ」として一蹴するのは容易だが、それは言語が社会の要請に応えて【自己更新を続けている証拠】とも言える。伝統を守ることと変化を受け入れることの調和が求められている。`,
    content: '文章中の「自己更新を続けている証拠」とはどのような意味か。',
    audioText: '言葉は時代とともに変化する生き物である。それは言語が社会の要請に応えて自己更新を続けている証拠とも言える。',
    options: [
      '言葉が時代や社会の変化に合わせて、自然と新しい形へと適応し進化しているということ。',
      '若者が古い言葉の文法規則を無視して勝手に壊しているということ。',
      '言葉の乱れを国語辞典の編纂者が強制的に正しているということ。',
      '伝統的な日本語だけが永遠に正しい姿を保ち続けているということ。'
    ],
    correctIndex: 0,
    explanation: 'Cụm "自己更新を続けている証拠" (bằng chứng cho việc liên tục tự đổi mới) biểu thị ngôn ngữ là thực thể sống, linh hoạt chuyển biến để thích ứng với nhu cầu xã hội đương thời.',
    grammarMnemonic: 'Câu hỏi gạch chân: Đọc câu liền trước và liền sau để tìm quan hệ đồng nghĩa hoặc giải thích.',
    sourceTag: 'Dokkai N2 · Ngôn Ngữ Học',
  },

  // ==========================================
  // 5. 🎧 NGHE HIỂU & PITCH ACCENT (CHOUKAI)
  // ==========================================
  // N1/N2 - Pitch Accent Pattern (Cao độ Tokyo)
  {
    id: 'cq_l_n1_1',
    level: 'N1',
    format: 'listening_pitch',
    subFormat: 'pitch_accent',
    subFormatTitle: 'Nghe hiểu & Pitch Accent · Phân biệt mẫu cao độ Tokyo',
    instruction: '音声を聞いて、次の単語の東京アクセント型（Pitch Accent）として正しいものを選びなさい。',
    content: '単語：【箸】（Đôi đũa ăn cơm）\n※ Hãy lắng nghe cao độ rơi ở âm tiết nào.',
    audioText: 'はし',
    pitchPattern: 'atamadaka',
    pitchNumber: 1,
    pitchDisplay: '① 頭高型 (Atamadaka) [H-L] -> は＼し',
    options: [
      '① 頭高型 (Atamadaka): Cao ở âm đầu [HA-shi] rồi rơi thấp xuống',
      '⓪ 平板型 (Heiban): Âm đầu thấp, các âm sau cao bằng phẳng [ha-SHI]',
      '② 尾高型 (Odaka): Thấp rồi cao, trợ từ đi sau rơi xuống thấp',
      '③ 中高型 (Nakadaka): Cao ở âm giữa'
    ],
    correctIndex: 0,
    explanation: 'Cặp từ phân biệt kinh điển của Tokyo Pitch Accent:\n- 箸 (Đôi đũa): ① [HA-shi] - Atamadaka (đầu cao rơi thấp).\n- 橋 (Cây cầu): ② [ha-SHI(ga)] - Odaka (âm sau cao, trợ từ rơi thấp).\n- 端 (Mép, rìa): ⓪ [ha-SHI] - Heiban (bằng phẳng).',
    grammarMnemonic: 'Bộ 3 Ha-shi: Đũa gắp trên cao (1 - Atamadaka), Cầu nối bắc ngang (2 - Odaka), Rìa mép bằng phẳng (0 - Heiban).',
    sourceTag: 'Pitch Accent Studio Tokyo',
  },
  {
    id: 'cq_l_n2_1',
    level: 'N2',
    format: 'listening_pitch',
    subFormat: 'pitch_accent',
    subFormatTitle: 'Nghe hiểu & Pitch Accent · Phân biệt mẫu cao độ Tokyo',
    instruction: '音声を聞いて、次の単語の東京アクセント型として正しいものを選びなさい。',
    content: '単語：【桜】（Hoa anh đào - さくら）',
    audioText: 'さくら',
    pitchPattern: 'heiban',
    pitchNumber: 0,
    pitchDisplay: '⓪ 平板型 (Heiban) [L-H-H] -> さ／くら',
    options: [
      '⓪ 平板型 (Heiban): Âm đầu thấp, các âm tiếp theo lên cao và giữ phẳng [sa-KU-RA]',
      '① 頭高型 (Atamadaka): Cao ở âm đầu rồi rơi thấp',
      '② 中高型 (Nakadaka): Cao ở âm thứ hai [sa-KU-ra]',
      '③ 尾高型 (Odaka): Rơi ở trợ từ đi sau'
    ],
    correctIndex: 0,
    explanation: '【桜】(さくら - Sakura) trong tiếng Nhật Tokyo chuẩn là mẫu ⓪ 平板型 (Heiban): Âm [sa] bắt đầu thấp, [ku-ra] lên cao và trợ từ phía sau như [ga, o, ni] vẫn giữ nguyên độ cao.',
    grammarMnemonic: 'Sakura: Cánh hoa bay là là bằng phẳng ⓪ Heiban.',
    sourceTag: 'Pitch Accent Studio Tokyo',
  },
  // N2 - Dialogue Reflex (Hội thoại đàm thoại tình huống)
  {
    id: 'cq_l_n2_2',
    level: 'N2',
    format: 'listening_pitch',
    subFormat: 'dialogue_reflex',
    subFormatTitle: 'Nghe hiểu · Hội thoại đàm thoại tình huống',
    instruction: '会話を聞いて、Bさんの最も自然な返答として適当なものを一つ選びなさい。',
    passage: `A社担当者:「本日のご提案、社内で持ち帰って前向きに検討させていただきます。」
Bさん（あなた）:「（　）」`,
    content: 'Bさんはこの後、何と答えるのがビジネスとして最も適切か。',
    audioText: '本日のご提案、社内で持ち帰って前向きに検討させていただきます。ありがとうございます。何卒よろしくお願い申し上げます。',
    options: [
      '恐れ入ります。良いお返事を心よりお待ち申し上げております。',
      'いいえ、どういたしまして。いつでも連絡してください。',
      'そうですか、ぜひ今すぐ決めていただけませんか。',
      'お疲れ様でした。では明日もう一度来ます。'
    ],
    correctIndex: 0,
    explanation: 'Khi đối tác nói "持ち帰って検討する" (mang về họp xem xét), câu đáp lễ kinh điển thể hiện thái độ khiêm nhường và tôn trọng là: "恐れ入ります。良いお返事を心よりお待ち申し上げております。"',
    grammarMnemonic: 'Đối tác nhận xem xét -> Đáp: 恐れ入ります、お待ち申し上げております.',
    sourceTag: 'Hội thoại thương mại Keigo',
  },

  // ==========================================
  // 6. 🌟 TỔNG HỢP ĐA DẠNG (MIXED STANDARD)
  // ==========================================
  // N1 - Mixed
  {
    id: 'cq_m_n1_1',
    level: 'N1',
    format: 'mixed',
    subFormat: 'mixed_standard',
    subFormatTitle: 'Tổng hợp · Bẫy phân biệt từ vựng N1',
    instruction: '（　）に入れるのに最もよい言葉を、1・2・3・4から一つ選びなさい。',
    content: '相手の弱みにつけこむような（　）やり方は、ビジネスにおいて決して許されない。',
    audioText: '相手の弱みにつけこむような姑息なやり方は、ビジネスにおいて決して許されない。',
    options: ['姑息な', '気兼ねな', '婉曲な', '希薄な',],
    correctIndex: 0,
    explanation: '【姑息】(こそく - Cô tức): Tạm bợ, láu cá chắp vá, chơi xỏ đối phương (bẫy đề thi kinh điển JLPT N1 hay hỏi về nghĩa chính xác).',
    grammarMnemonic: 'Cô tức = Biện pháp tạm thời, chắp vá, láu cá -> Kosoku.',
    sourceTag: 'Đề Thi Thật JLPT N1',
  },
  {
    id: 'cq_m_n1_2',
    level: 'N1',
    format: 'mixed',
    subFormat: 'mixed_standard',
    subFormatTitle: 'Tổng hợp · Ngữ pháp thượng đỉnh N1',
    instruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
    content: '恩師の突然の訃報を聞き、驚きと悲しみに（　）。',
    audioText: '恩師の突然の訃報を聞き、驚きと悲しみにたえない。',
    options: ['たえない', 'あたらない', 'やまない', 'かたくない'],
    correctIndex: 0,
    explanation: '【〜にたえない】(〜に堪えない): Không cầm được, không nén nổi cảm xúc dâng trào (thường đi với 悲しみ, 感謝, 遺憾に堪えない).',
    grammarMnemonic: 'Cảm xúc quá lớn không kìm nén nổi: にたえない (ni taenai).',
    sourceTag: 'Đề Thi Thật JLPT N1',
  },

  // N3/N4/N5 Essentials
  {
    id: 'cq_k_n4_1',
    level: 'N4',
    format: 'kanji',
    subFormat: 'kanji_yomi',
    subFormatTitle: 'Hán tự · Cách đọc Hiragana (N4)',
    instruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
    content: 'この工場では自動車を【生産】しています。',
    audioText: 'この工場では自動車をせいさんしています。',
    options: ['せいさん', 'しょうさん', 'せいざん', 'せいぞう'],
    correctIndex: 0,
    explanation: '【生産】(せいさん - Sinh sản): Sản xuất. Chữ 生 đọc âm On là せい, 産 đọc là さん.',
    grammarMnemonic: 'Sinh sản = Seisan.',
    sourceTag: 'Kho bản quyền JLPT N4',
  },
  {
    id: 'cq_v_n5_1',
    level: 'N5',
    format: 'vocab_collocation',
    subFormat: 'contextual_vocab',
    subFormatTitle: 'Từ vựng · Điền từ cơ bản (N5)',
    instruction: '（　）に入れるのに最もよい言葉を、1・2・3・4から一つ選びなさい。',
    content: '毎朝、公園を30分（　）します。',
    audioText: '毎朝、公園を30分散歩します。',
    options: ['散歩', '旅行', '見学', '運動'],
    correctIndex: 0,
    explanation: '【散歩】(さんぽ - Tản bộ): Đi dạo. Cụm từ 公園を散歩する (Đi dạo ở công viên).',
    grammarMnemonic: 'Tản bộ công viên = Sanpo.',
    sourceTag: 'Kho bản quyền JLPT N5',
  },

  // ==========================================
  // 6. 🏆 JPT CHUẨN QUỐC TẾ (THANG ĐIỂM 990)
  // ==========================================
  {
    id: 'jpt_q_err_1',
    level: 'N1',
    format: 'jpt_standard',
    subFormat: 'jpt_error_detection',
    subFormatTitle: 'JPT Part 5 · Tìm lỗi sai chính tả/ngữ pháp (誤文訂正)',
    instruction: '次の文の【A】・【B】・【C】・【D】のうち、文法または表現として誤っているものを一つ選びなさい。',
    content: '弊社では【A: 新製品の開発にあたり】、【B: 各部門から】意見を【C: 拝聴して】、最適な仕様を【D: 決定いたしました】。',
    options: [
      '【A】新製品の開発にあたり',
      '【B】各部門から',
      '【C】拝聴して (SAI)',
      '【D】決定いたしました'
    ],
    correctIndex: 2,
    explanation: 'Lỗi sai ở 【C: 拝聴して】. 【拝聴する】(はいちょうする) là Khiêm nhường ngữ I biểu thị sự kính trọng dành cho người ngoài/cấp trên khi mình lắng nghe. Nhưng ở đây đối tượng được lắng nghe là 「各部門」(các bộ phận trong nội bộ công ty mình - nhóm Uchi), do đó không được dùng Khiêm nhường ngữ tôn vinh nội bộ. Phải sửa thành 「意見を聞いて」 hoặc 「意見を集約して」.',
    grammarMnemonic: 'Bẫy JPT: Cấm dùng Khiêm nhường ngữ 拝聴/拝見 cho hành động giữa các thành viên nội bộ công ty mình!',
    sourceTag: 'Đề thi JPT Chuẩn Quốc Tế · Part 5 誤文訂正',
  },
  {
    id: 'jpt_q_err_2',
    level: 'N2',
    format: 'jpt_standard',
    subFormat: 'jpt_error_detection',
    subFormatTitle: 'JPT Part 5 · Tìm lỗi sai chính tả/ngữ pháp (誤文訂正)',
    instruction: '次の文の【A】・【B】・【C】・【D】のうち、文法または表現として誤っているものを一つ選びなさい。',
    content: '明日の午前10時【A: まで】に、会議室Aにて【B: 来期予算案の】承認を【C: 得るための】稟議書を【D: 提出してください】。',
    options: [
      '【A】まで (SAI)',
      '【B】来期予算案の',
      '【C】得るための',
      '【D】提出してください'
    ],
    correctIndex: 0,
    explanation: 'Lỗi sai ở 【A: まで】. Động từ đi kèm là 「提出する」(nộp - hành động dứt điểm, hạn chót), do đó bắt buộc phải dùng trợ từ hạn chót 「までに」. Nếu dùng 「まで」 thì đòi hỏi động từ kéo dài liên tục (như 待つ, 働く). Sửa thành: 「10時までに」.',
    grammarMnemonic: 'Nộp báo cáo, gửi email = Dứt điểm trước hạn chót -> Bắt buộc dùng までに!',
    sourceTag: 'Đề thi JPT Chuẩn Quốc Tế · Part 5 誤文訂正',
  },
  {
    id: 'jpt_q_gram_1',
    level: 'N1',
    format: 'jpt_standard',
    subFormat: 'jpt_context_grammar',
    subFormatTitle: 'JPT Part 6 · Ngữ pháp ngữ cảnh thương mại (空所補充)',
    instruction: '（　）に入れるのに最も適切な表現を、1・2・3・4から一つ選びなさい。',
    content: '厳しい経営環境に（　）、今年度の役員報酬を一律10％削減することを決定した。',
    options: ['鑑み', '省み', '見据え', '顧み'],
    correctIndex: 0,
    explanation: 'Đáp án đúng là 1. 【鑑み】(かんがみ - Căn cứ vào, đối chiếu suy xét từ thực tế). Mẫu cấu trúc N1: 「〜に鑑み」(N ni kangami - xét đến bối cảnh/tình hình). Các từ khác: 省みる (nhìn lại tự kiểm điểm bản thân), 顧みる (ngoái đầu nhìn lại quá khứ, đoái hoài).',
    grammarMnemonic: 'Căn cứ bối cảnh kinh doanh = 〜に鑑み (Kangami).',
    sourceTag: 'Đề thi JPT Chuẩn Quốc Tế · Part 6 空所補充',
  },
  {
    id: 'jpt_q_gram_2',
    level: 'N2',
    format: 'jpt_standard',
    subFormat: 'jpt_context_grammar',
    subFormatTitle: 'JPT Part 6 · Ngữ pháp ngữ cảnh thương mại (空所補充)',
    instruction: '（　）に入れるのに最も適切な表現を、1・2・3・4から一つ選びなさい。',
    content: '新製品の納期遅延につきまして、取引先の皆様に多大なご迷惑をおかけしましたことを、深く（　）。',
    options: [
      'お詫び申し上げます',
      'お詫びなさいます',
      'ご容赦させます',
      'お許しになります'
    ],
    correctIndex: 0,
    explanation: 'Đáp án đúng là 1. 【お詫び申し上げます】(Tôi xin thành thật gửi lời tạ lỗi sâu sắc). Đây là Khiêm nhường ngữ chuẩn mực nhất của người đại diện công ty khi xin lỗi khách hàng. Các phương án 2, 4 là Tôn kính ngữ (dùng cho hành động của khách), phương án 3 là thể sai khiến bất lịch sự.',
    grammarMnemonic: 'Tạ lỗi với khách hàng = 深くお詫び申し上げます.',
    sourceTag: 'Đề thi JPT Chuẩn Quốc Tế · Part 6 空所補充',
  },
  {
    id: 'jpt_q_read_1',
    level: 'N1',
    format: 'jpt_standard',
    subFormat: 'jpt_reading_biz',
    subFormatTitle: 'JPT Part 7 · Đọc hiểu tài liệu & Email thương mại',
    instruction: '次の社内通知を読み、質問に答えて最も適切なものを一つ選びなさい。',
    passage: `【社内通知：情報セキュリティ管理徹底のお願い】
全社員各位
昨今、他社において生成AIサービスへの機密データ誤送信による情報漏洩インシデントが多発しております。
つきましては、本日付で「外部AIツール利用に関する暫定ガイドライン」を施行いたします。
業務上の目的であっても、顧客個人情報、未公開財務データ、およびソースコードを外部パブリッククラウド型AIに入力することは、いかなる理由があっても厳禁といたします。
違反が認められた場合は、就業規則第45条に基づき懲戒処分の対象となりますので、各自徹底してください。`,
    content: 'この社内通知の主たる目的として最も合致しているものはどれか。',
    options: [
      '外部AIへの機密データ入力を厳禁とし、情報漏洩を防ぐため。',
      '就業規則第45条の改定について全社員の同意を得るため。',
      '生成AIツールの社内導入を推奨し、業務効率を向上させるため。',
      '他社で起きたインシデントの損害賠償額を周知するため。'
    ],
    correctIndex: 0,
    explanation: 'Đoạn văn nêu rõ: "顧客個人情報、未公開財務データ、およびソースコードを外部パブリッククラウド型AIに入力することは、いかなる理由があっても厳禁といたします" (Nghiêm cấm tuyệt đối việc nhập thông tin cá nhân khách hàng, dữ liệu tài chính chưa công bố và mã nguồn vào AI đám mây bên ngoài). Do đó mục đích chính là ngăn ngừa rò rỉ thông tin.',
    grammarMnemonic: 'BJT & JPT Đọc hiểu thông báo: Tìm câu chứa 「厳禁」「義務」「〜こと」 để chốt ý chính.',
    sourceTag: 'Đề thi JPT Chuẩn Quốc Tế · Part 7 読解実務',
  },
  {
    id: 'jpt_q_listen_1',
    level: 'N2',
    format: 'jpt_standard',
    subFormat: 'jpt_listening',
    subFormatTitle: 'JPT Part 1 · Phản xạ đàm thoại điện thoại & công sở',
    instruction: '取引先からの電話で、担当者が不在のとき、最も適切な返答を選びなさい。',
    content: '相手：「恐れ入りますが、営業部の佐藤様はいらっしゃいますでしょうか。」\nあなた：「あいにく佐藤は席を外しておりますが、（　）。」',
    audioText: 'あいにく佐藤は席を外しておりますが、戻り次第、こちらからお電話を差し上げましょうか。',
    options: [
      '戻り次第、こちらからお電話を差し上げましょうか。',
      '佐藤様に電話をさせますのでお待ちください。',
      '外出していらっしゃいますので、明日またお電話してください。',
      '後ほど私から佐藤様へ伝言を申し上げます。'
    ],
    correctIndex: 0,
    explanation: 'Đáp án đúng là 1: 「戻り次第、こちらからお電話を差し上げましょうか」(Ngay khi anh Sato về, chúng tôi xin phép gọi lại cho quý khách được không ạ?). Quy tắc công sở: Khi nói với người ngoài, không gọi sếp là "佐藤様" (phương án 2, 4 sai vì thêm 様 cho người nhà), phương án 3 thô lỗ và dùng kính ngữ sai.',
    grammarMnemonic: 'Quy tắc Uchi-Soto trên điện thoại: Không thêm -san/-sama vào tên người công ty mình trước mặt khách!',
    sourceTag: 'Đề thi JPT Chuẩn Quốc Tế · Part 1 聴解対話',
  }
];
