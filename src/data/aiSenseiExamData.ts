/**
 * Comprehensive Knowledge Base for AI Sensei:
 * - Exam Mastery Strategies (JLPT N5-N1, BJT, Tokutei Gino, Hoshi-mondai, Dokkai)
 * - Daily Spoken & Street Slang Vault (Tameguchi, Contractions, Cushion Kotoba)
 * - Keigo & Business Etiquette Quick Matrix
 * - Offline In-Depth Academic Heuristic Bank
 */

export interface ExamStrategyItem {
  id: string;
  category: 'Bài Sao ★' | 'Đọc Hiểu Dokkai' | 'Bẫy Ngữ Pháp' | 'Phân Bổ Giờ Thi' | 'Thương Mại BJT';
  title: string;
  targetLevel: 'N5-N4' | 'N3' | 'N2' | 'N1' | 'Mọi Cấp Độ';
  coreSecret: string;
  stepByStepGuide: string[];
  realExamExample: {
    question: string;
    choices: string[];
    correctOrder: string;
    explanation: string;
  };
  senseiMnemonicTip: string;
}

export interface DailySpokenItem {
  id: string;
  pattern: string;
  formalOrigin: string;
  category: 'Rút gọn khẩu ngữ' | 'Slang giới trẻ' | 'Từ đệm Cushion' | 'Ngữ điệu & Cảm thán';
  meaning: string;
  nuanceAndContext: string;
  realConversations: {
    speakerA: string;
    speakerB: string;
    situation: string;
  };
  culturalCaution: string;
}

export interface KeigoMatrixItem {
  verb: string;
  romaji: string;
  meaning: string;
  sonkeigo: string; // Tôn kính (khách hàng, sếp)
  kenjougo: string; // Khiêm nhường (mình, phe mình)
  teineigo: string; // Lịch sự chung
  businessExample: string;
  businessExampleRomaji?: string;
  businessExampleVn?: string;
  commonMistakeTrap: string;
}

export const EXAM_MASTERY_STRATEGIES: ExamStrategyItem[] = [
  {
    id: 'strat_hoshi_mondai',
    category: 'Bài Sao ★',
    title: 'Bí Kíp Bẻ Khóa Bài Điền Dấu Sao ★ (Hoshi-mondai - Quy Tắc Ghép Cặp 4 Bước)',
    targetLevel: 'Mọi Cấp Độ',
    coreSecret:
      'Dạng bài điền dấu sao ★ không bao giờ dịch từ trái sang phải, mà giải quyết bằng phương pháp "Bắt Cặp Bất Di Bất Dịch" (Pairing) và "Chốt Ngữ Pháp Vị Ngữ Cuối Câu" (Anchor).',
    stepByStepGuide: [
      'Bước 1 - Tìm điểm tựa ngữ pháp cuối câu: Nhìn vào từ/cụm từ nằm ngay sau dấu gạch thứ 4 để xác định xem phía trước nó bắt buộc phải là dạng động từ gì (V-ru, V-te, Danh từ + の, hay Thể thông thường).',
      'Bước 2 - Bắt cặp cố định 2-trong-4 phương án: Quét 4 đáp án cho sẵn, tìm xem có 2 đáp án nào bắt buộc phải dính liền với nhau theo công thức ngữ pháp (Ví dụ: [わけ] luôn đi liền trước [ではない], [〜て] đi với [たまらない], [に] đi với [対して]).',
      'Bước 3 - Khớp trợ từ với danh từ: Xem các trợ từ (を, に, で, は) trong 4 đáp án để nối với danh từ tương ứng đứng trước hoặc đứng sau.',
      'Bước 4 - Thử ráp 2 khối lại và chọn vị trí dấu sao: Khi 4 đáp án đã được gom thành 2 khối nhỏ (A-B và C-D), việc xếp trật tự câu hoàn chỉnh chỉ mất 5 giây.',
    ],
    realExamExample: {
      question: 'どんなに [ __ ] [ __ ] [ ★ ] [ __ ] あきらめない。',
      choices: ['1. 困難な', '2. としても', '3. 状況だ', '4. ことがあった'],
      correctOrder: '1 -> 3 -> 4 -> 2 (どんなに困難な状況だとしても、あきらめない)',
      explanation:
        'Cụm 「どんなに〜としても」(Dù cho tình huống có thế nào chăng nữa). [困難な] (Tính từ na) bổ nghĩa cho danh từ [状況だ] -> Khối (1-3). Tiếp theo [状況だ] đi với [としても] thành (1-3-2). Vị trí sao rơi vào đáp án 4 hoặc 2 tùy đề bài.',
    },
    senseiMnemonicTip:
      'Thần chú làm bài sao: "Đừng dịch mò - Hãy tìm cặp!". Cứ ghép được 1 cặp 2 số chắc chắn là bạn đã loại bỏ 75% sự mơ hồ.',
  },
  {
    id: 'strat_dokkai_signals',
    category: 'Đọc Hiểu Dokkai',
    title: 'Bí Quyết Bắt "Tín Hiệu Đảo Chiều" & "Tín Hiệu Chốt Ý Tác Giả" Trong Đọc Hiểu',
    targetLevel: 'N3',
    coreSecret:
      'Trong đề thi JLPT N3-N1, 80% câu trả lời đúng của bài đọc hiểu nằm ngay sau các Liên từ đảo chiều và ở câu cuối cùng chứa thể nhận định cá nhân của tác giả.',
    stepByStepGuide: [
      'Quy tắc 1 - Tín hiệu Đảo Chiều (Tuy nhiên...): Khi thấy 「しかし」(Shikashi), 「ところが」(Tokoroga), 「だが」(Daga), 「それに対して」(Sore ni taishite), hãy khoanh tròn ngay! Đoạn trước đó chỉ là "mồi nhử" nêu quan điểm số đông (Tatemae), quan điểm thật của tác giả luôn nằm ngay vế sau!',
      'Quy tắc 2 - Tín hiệu Tóm Lược Chốt Ý: Khi thấy 「つまり」(Tsumari), 「要するに」(Yousuru ni), 「このように」(Kono you ni), 「したがって」(Shitagatte) -> Đây chính là thông điệp cốt lõi bài viết.',
      'Quy tắc 3 - Nhận diện đuôi câu biểu thị ý kiến tác giả: Tác giả Nhật Bản hiếm khi nói "Tôi nghĩ là", họ thường dùng: 「〜のではないだろうか」(Chẳng phải là... sao?), 「〜べきである」(Cần phải...), 「〜にほかならない」(Chính là...). Đáp án thi JLPT luôn bám sát các đuôi câu này.',
    ],
    realExamExample: {
      question: 'Ý kiến chính của tác giả về sự phát triển của trí tuệ nhân tạo (AI) là gì?',
      choices: [
        'A. AI sẽ thay thế hoàn toàn con người trong tương lai',
        'B. AI mang lại nhiều tiện ích nhưng con người cần giữ vững giá trị nhân văn độc bản',
        'C. Không nên tiếp tục phát triển AI vì quá nguy hiểm',
        'D. AI chỉ phù hợp trong lĩnh vực tính toán khoa học',
      ],
      correctOrder: 'Chọn B (Nhờ câu văn chốt sau từ しかし: 「しかし、AIが進化しても、人間の心の温もりこそが不可欠なのではないだろうか」)',
      explanation:
        'Tác giả ban đầu ca ngợi AI làm được nhiều việc, nhưng sau chữ "Tuy nhiên" (しかし) mới đưa ra quan điểm thật: Trái tim con người là không thể thay thế.',
    },
    senseiMnemonicTip:
      'Đọc Dokkai không cần dịch từng từ vựng chuyên ngành hóc búa, hãy tập trung vào "Cột buồm liên từ" để biết dòng chảy tư duy của tác giả đang rẽ hướng nào!',
  },
  {
    id: 'strat_time_allocation',
    category: 'Phân Bổ Giờ Thi',
    title: 'Bảng Phân Bổ Thời Gian Thi JLPT "Vàng" Tránh Cháy Giờ Đọc Hiểu',
    targetLevel: 'Mọi Cấp Độ',
    coreSecret:
      'Sai lầm lớn nhất của thí sinh thi JLPT là mất quá nhiều thời gian vào 1-2 câu từ vựng/ngữ pháp khó, dẫn đến phần Đọc hiểu (chiếm 60 điểm) phải "khoanh bừa" vì hết giờ.',
    stepByStepGuide: [
      'JLPT N1 (110 phút Từ vựng - Ngữ pháp - Đọc hiểu): Tối đa 30-35 phút cho Kiến thức ngôn ngữ (Moji/Goi/Bunpou). Dành trọn vẹn 75-80 phút cho Đọc hiểu Dokkai!',
      'JLPT N2 (105 phút): Tối đa 30-32 phút cho Ngôn ngữ. Dành trọn 73-75 phút cho Đọc hiểu.',
      'JLPT N3 (Kiến thức ngôn ngữ 30p, Ngữ pháp & Đọc hiểu 70p): Phần Ngữ pháp làm trong 20 phút, dành 50 phút còn lại cho Đọc hiểu.',
      'Quy tắc 30 giây: Một câu từ vựng nếu sau 30 giây không nhớ ra thì đánh dấu sao vào đề thi, chọn tạm một đáp án cảm tính nhất rồi đi tiếp ngay. Tuyệt đối không dừng lại suy nghĩ quá 1 phút!',
    ],
    realExamExample: {
      question: 'Làm thế nào để xử lý bài Đọc hiểu Dài (Choubun) và Tìm kiếm thông tin (Jouhou Kensaku)?',
      choices: [
        '1. Đọc lướt câu hỏi trước để bắt từ khóa (Keywords)',
        '2. Bài tìm kiếm thông tin: Đọc phần Điều kiện đặc biệt ở chú thích trước',
        '3. Không đọc toàn bộ văn bản rồi mới đọc câu hỏi',
      ],
      correctOrder: 'Áp dụng đồng thời cả 3 mẹo trên',
      explanation:
        'Bài tìm kiếm thông tin (thông báo tuyển dụng, lịch trình tour) luôn có bẫy ở dòng chữ nhỏ có dấu ※ hoặc ghi chú cuối trang (Ví dụ: "Học sinh được giảm 20%", "Không áp dụng vào ngày thứ Bảy").',
    },
    senseiMnemonicTip:
      'Điểm liệt JLPT là 19/60 cho mỗi phân môn. Giữ vững kỷ luật thời gian là bạn đã nắm chắc 50% cơ hội đỗ!',
  },
];

export const EXTRA_EXAM_STRATEGIES: ExamStrategyItem[] = [
  {
    id: 'strat_n1_star_complex',
    category: 'Bài Sao ★',
    title: 'Bí Kíp Dấu Sao N1: Bẫy Mệnh Đề Chêm Lồng Ghép & Ngữ Pháp Thượng Đỉnh (〜んがため, 〜たるもの)',
    targetLevel: 'N1',
    coreSecret:
      'Ở cấp độ N1, câu hỏi dấu sao thường gài các mẫu ngữ pháp cổ mang tính văn viết cao hoặc chêm một mệnh đề trạng ngữ vào giữa để đánh lừa thị giác người thi.',
    stepByStepGuide: [
      'Bước 1: Tách rời thành phần phụ (trạng ngữ chỉ thời gian/địa điểm/mục đích) ra khỏi khung xương câu chính (S - O - V).',
      'Bước 2: Tìm "cặp bài trùng N1": [〜んがため] luôn đi liền trước [に / の], [〜たるもの] luôn nối trực tiếp sau Danh từ chỉ cương vị (親たるもの, 指導者たるもの).',
      'Bước 3: Nhận diện thể liên kết: V-bỏ masu + つつある, V-ru + にあたって, hoặc Futsuukei + からには.',
      'Bước 4: Khớp vị trí dấu sao bằng cách loại trừ các đáp án không thể đứng cuối câu.',
    ],
    realExamExample: {
      question: '一国の [ __ ] [ __ ] [ ★ ] [ __ ] 軽率な発言は許されない。',
      choices: ['1. たるもの', '2. その地位に', '3. ふさわしくない', '4. リーダー'],
      correctOrder: '4 -> 1 -> 2 -> 3 (一国のリーダーたるもの、その地位にふさわしくない軽率な発言は許されない)',
      explanation:
        'Danh từ chỉ cương vị [リーダー] đi liền với [たるもの] (Trên cương vị lãnh đạo). Tiếp theo [その地位にふさわしくない] bổ nghĩa cho [軽率な発言]. Dấu sao rơi vào vị trí số 2.',
    },
    senseiMnemonicTip:
      'Bí quyết N1: "Tìm danh từ cương vị để gắn với たるもの, tìm động từ ý chí để gắn với んがため!".',
  },
  {
    id: 'strat_choukai_mondai4_quick',
    category: 'Bẫy Ngữ Pháp',
    title: 'Bí Kíp Nghe Hiểu Choukai Mondai 4: Bắt Sóng Phản Xạ Nhanh & Lời Từ Chối Ngầm Nhã Nhặn',
    targetLevel: 'N2',
    coreSecret:
      'Mondai 4 là bài phản xạ tức thì (Sokutou). 70% các câu hỏi mời mọc hoặc nhờ vả sẽ nhận lại lời từ chối gián tiếp nhã nhặn (Cushion) thay vì đồng ý thô thiển.',
    stepByStepGuide: [
      'Quy tắc 1: Lắng nghe kỹ đuôi câu hỏi (Câu rủ rê 〜ませんか, câu nhờ vả 〜てもらえないか, hay câu xin phép 〜てもいいですか).',
      'Quy tắc 2: Nếu câu rủ rê, đáp án đúng thường mang tính ngập ngừng: 「あいにく先約がありまして」(Tiếc quá tôi lại có hẹn trước mất rồi), hoặc 「ちょっと今日は都合が悪くて...」.',
      'Quy tắc 3: Bẫy Tôn kính vs Khiêm nhường trong nghe hiểu: Đối phương hỏi "Tanaka-san có ở đó không?", cấm chọn câu trả lời có "いらっしゃいます" (vì Tanaka là người phe mình, phải chọn おります).',
    ],
    realExamExample: {
      question: 'Người A nói: 「もしよろしければ、この後の打ち上げ、一杯どうですか？」(Nếu tiện thì sau buổi này đi làm một ly nhé?)',
      choices: [
        '1. ええ、どうぞ飲んでください。(Sai ngữ cảnh)',
        '2. あいにく、これから別の予定が入っていまして... (Đúng! Lời từ chối lịch thiệp)',
        '3. はい、乾杯しましょう。(Chưa đến nơi đã chúc mừng - thiếu tự nhiên)',
      ],
      correctOrder: 'Chọn phương án 2',
      explanation:
        'Phương án 2 sử dụng đệm từ "あいにく" (tiếc là) và bỏ lửng câu với "〜て" là cách từ chối chuẩn mực cao nhất của người Nhật.',
    },
    senseiMnemonicTip:
      'Trong Choukai Mondai 4: Đuôi câu bỏ lửng "〜て..." hoặc "〜けど..." luôn là tín hiệu vàng của lời từ chối lịch sự!',
  },
  {
    id: 'strat_dokkai_hikaku_n2_n1',
    category: 'Đọc Hiểu Dokkai',
    title: 'Bí Kíp Đọc Hiểu So Sánh 2 Văn Bản (Sougou Rikai - Hikaku Dokkai) Trong 3 Phút',
    targetLevel: 'N1',
    coreSecret:
      'Bài so sánh 2 bài văn (Bài A và Bài B) luôn xoay quanh 2 câu hỏi: 1) Hai tác giả cùng đề cập đến vấn đề chung gì? 2) Điểm khác biệt mấu chốt về quan điểm giữa tác giả A và B là gì?',
    stepByStepGuide: [
      'Bước 1: KHÔNG đọc hết cả 2 bài một lúc! Đọc câu hỏi trước để xác định chủ đề so sánh.',
      'Bước 2: Đọc lướt bài A, gạch chân quan điểm của A (Tán thành hay Phản đối, Lý do cốt lõi là gì).',
      'Bước 3: Đọc lướt bài B, tìm xem tác giả B có dùng từ phản biện A không (Ví dụ: "Mặc dù A đúng nhưng...", hoặc "Khác với quan điểm truyền thống...").',
      'Bước 4: Soi chiếu bảng đối lập: Tác giả A nhấn mạnh [Tính hiệu quả], Tác giả B nhấn mạnh [Tính an toàn nhân văn].',
    ],
    realExamExample: {
      question: 'Về việc áp dụng trí tuệ nhân tạo (AI) trong giáo dục, hai tác giả A và B có điểm gì khác nhau?',
      choices: [
        '1. A ủng hộ áp dụng đại trà, B phản đối hoàn toàn việc dùng công nghệ',
        '2. Cả A và B đều thừa nhận tiện ích của AI, nhưng A chú trọng cá nhân hóa việc học còn B lo ngại học sinh mất tương tác xã hội',
        '3. A lo ngại bảo mật dữ liệu, B lo ngại chi phí đắt đỏ',
        '4. A và B có quan điểm hoàn toàn giống nhau',
      ],
      correctOrder: 'Chọn phương án 2',
      explanation:
        'Đề thi JLPT hiếm khi chọn cực đoan "phản đối hoàn toàn" (câu 1). Đáp án đúng thường cân bằng giữa thừa nhận tiện ích và nêu lên góc nhìn riêng biệt của từng tác giả.',
    },
    senseiMnemonicTip:
      'Thần chú so sánh: "Loại trừ ngay đáp án cực đoan - Chọn đáp án đối chiếu hai góc nhìn có tính biện chứng!".',
  },
  {
    id: 'strat_bjt_business_mail',
    category: 'Thương Mại BJT',
    title: 'Bí Kíp Kỳ Thi BJT & Thư Tín Thương Mại: Kết Cấu 5 Đoạn Chuẩn Mực Trong Email Doanh Nghiệp',
    targetLevel: 'Mọi Cấp Độ',
    coreSecret:
      'Trong giao dịch thương mại Nhật, một email đối tác bắt buộc tuân theo cấu trúc 5 bước: Người nhận -> Lời chào công ty -> Lý do gửi thư (Chủ đề chính) -> Nội dung chi tiết gạch đầu dòng -> Lời chúc kết thúc.',
    stepByStepGuide: [
      'Phần 1 - Đích danh người nhận: Tên công ty + Tên phòng ban + Chức vụ + Tên + 様 (Ví dụ: 株式会社ABC 営業部 部長 田中様).',
      'Phần 2 - Câu chào kinh điển: 「いつも大変お世話になっております。〇〇社の佐藤でございます。」',
      'Phần 3 - Nêu mục đích ngay dòng đầu: 「さて、本日は来月の新商品発表会についてご案内申し上げます。」',
      'Phần 4 - Chi tiết rõ ràng (Ki): Sử dụng 「記」 và danh sách gạch đầu dòng ngày giờ, địa điểm để đối tác nắm bắt trong 3 giây.',
      'Phần 5 - Lời kết chuẩn mực: 「ご多忙の折、恐縮ではございますが、何卒よろしくお願い申し上げます。」',
    ],
    realExamExample: {
      question: 'Khi gửi email báo giá cho khách hàng, câu kết thúc nào thể hiện sự lịch thiệp và mong đợi hồi âm đúng mực nhất?',
      choices: [
        '1. 返事を早くください。(Quá thô lỗ)',
        '2. ご検討のほど、よろしくお願い申し上げます。(Chuẩn mực thương mại B2B)',
        '3. お返事をお待ちしております。(Thân mật nội bộ, chưa đủ trang trọng B2B)',
      ],
      correctOrder: 'Chọn phương án 2',
      explanation:
        'Cụm từ 「ご検討のほど、よろしくお願い申し上げます」(Kính mong quý công ty xem xét cân nhắc) là công thức vàng trong mọi báo giá và hợp đồng B2B.',
    },
    senseiMnemonicTip:
      'Trong tiếng Nhật thương mại, thêm 「〜のほど」(No hodo) giúp làm mềm câu yêu cầu, thể hiện sự khiêm nhường đỉnh cao.',
  },
  {
    id: 'strat_kanji_onyomi_derivation',
    category: 'Bẫy Ngữ Pháp',
    title: 'Quy Tắc Vàng Chuyển Âm Hán Việt Sang On-yomi: Bẻ Khóa Cách Đọc 1.000 Kanji N1-N2',
    targetLevel: 'N1',
    coreSecret:
      'Tiếng Hán Việt và âm On tiếng Nhật có cùng tổ tiên ngữ âm thời Đường và Hán. Nắm vững 4 quy luật biến âm phụ âm đầu và âm cuối giúp bạn đoán đúng âm đọc Onyomi với độ chính xác trên 85%.',
    stepByStepGuide: [
      'Quy luật 1 - Âm cuối -NG/-NH -> Trường âm -OU / -EI: QUANG (KOU), ĐÔNG (TOU), TRUNG (CHUU), THANH (SEI), BÌNH (HEI).',
      'Quy luật 2 - Phụ âm đầu T- / Đ- -> Hàng Ta (Ta, Chi, Tsu, Te, To): TIẾN (SHIN/TSUI), TÂM (SHIN), ĐIỆN (DEN), ĐỊA (CHI/JI), ĐẢO (TOU).',
      'Quy luật 3 - Dấu nặng và dấu ngã/hỏi -> Âm ngắn hoặc Âm ngắt (Sokuon): BẤT (FUTSU/FU), THẤT (SHITSU), QUỐC (KOKU), LUẬT (RITSU).',
      'Quy luật 4 - Phụ âm B- / P- -> Hàng Ha/Ba: BIỂU (HYOU), BẠCH (HAKU), PHÁP (HOU), PHƯƠNG (HOU).',
    ],
    realExamExample: {
      question: 'Chữ Hán 「躊躇」(Trù Trừ) trong đề thi N1 đọc là gì?',
      choices: ['1. ちゅうちょ (Chuucho)', '2. とうちょ (Toucho)', '3. しゅうちょ (Shuucho)', '4. ちゅうち (Chuuchi)'],
      correctOrder: 'Chọn 1: ちゅうちょ (Chuucho - do TRÙ thuộc vần U/chuyển thành CHUU; TRỪ chuyển thành CHO)',
      explanation:
        'Dựa vào quy luật âm vần Hán Việt, thí sinh dù chưa gặp từ này trong sách cũng dễ dàng suy luận ra đáp án 1.',
    },
    senseiMnemonicTip:
      'Hán Việt có dấu nặng hay âm ngắt thì Onyomi sẽ ngắt (tsu/ku); có đuôi NG/NH thì Onyomi sẽ kéo dài (ou/ei)!',
  },
];

export const DAILY_SPOKEN_VAULT: DailySpokenItem[] = [
  {
    id: 'slang_chau_jau',
    pattern: '〜ちゃう / 〜じゃう',
    formalOrigin: '〜てしまう / 〜でしまう (Lỡ làm gì / Hoàn thành xong)',
    category: 'Rút gọn khẩu ngữ',
    meaning: 'Lỡ làm mất rồi, ăn hết sạch rồi, xong xuôi cả rồi',
    nuanceAndContext:
      'Cực kỳ phổ biến trong giao tiếp hàng ngày giữa bạn bè, người thân, trong Anime và phim ảnh. Biểu lộ cảm xúc tiếc nuối nhẹ hoặc làm xong một việc dứt khoát.',
    realConversations: {
      situation: 'Hai người bạn nói chuyện trong quán cà phê khi một người ăn hết đĩa bánh',
      speakerA: 'あれ？ケーキもう食べちゃったの？ (Ủa? Cậu ăn hết veo bánh rồi à?)',
      speakerB: 'ごめん！美味しすぎて全部食べちゃった！ (Xin lỗi nhé! Ngon quá nên tớ lỡ chén sạch mất rồi!)',
    },
    culturalCaution:
      'Chỉ dùng với bạn bè, đồng nghiệp thân thiết cùng trang lứa. Tuyệt đối không dùng 「食べちゃいました」 với sếp hoặc khách hàng; phải dùng câu chuẩn: 「食べてしまいました」 hoặc kính ngữ.',
  },
  {
    id: 'slang_toku_doku',
    pattern: '〜とく / 〜どく',
    formalOrigin: '〜ておく / 〜でおく (Làm sẵn trước việc gì đó)',
    category: 'Rút gọn khẩu ngữ',
    meaning: 'Để tớ làm sẵn cho, chuẩn bị trước nhé',
    nuanceAndContext:
      'Âm "te oku" được nói lướt nhanh thành "toku", "de oku" thành "doku". Dùng khi chuẩn bị trước tài liệu, đặt bàn trước, hoặc dặn dò người khác.',
    realConversations: {
      situation: 'Rủ nhau đi ăn trưa và một người xung phong đặt bàn trước',
      speakerA: '席、予約しとくね！ (Để tớ đặt bàn trước cho nhé!)',
      speakerB: 'ありがとう、助かる！ (Cảm ơn nhé, may quá!)',
    },
    culturalCaution:
      'Trong công sở khi nói với sếp, phải chuyển về: 「準備しておきます」(Chuẩn bị sẵn ạ).',
  },
  {
    id: 'slang_nakya_nakucha',
    pattern: '〜なきゃ / 〜なくちゃ',
    formalOrigin: '〜なければならない / 〜なくてはならない (Phải làm gì đó)',
    category: 'Rút gọn khẩu ngữ',
    meaning: 'Phải làm thôi, phải đi ngay đây',
    nuanceAndContext:
      'Người Nhật nói tắt bỏ hẳn đuôi "naranai/ikemasen", chỉ giữ lại "nakya" hoặc "nakucha" khi tự nhắc nhở bản thân hoặc thông báo với bạn bè.',
    realConversations: {
      situation: 'Nhìn đồng hồ thấy muộn giờ hẹn tàu điện',
      speakerA: 'もうこんな時間！早く行かなきゃ！ (Đã ngần này giờ rồi cơ à! Phải đi mau thôi!)',
      speakerB: '気をつけてね！ (Đi cẩn thận nhé!)',
    },
    culturalCaution:
      'Khi nói với cấp trên: Cấm nói 「行かなきゃ」. Phải nói: 「失礼いたします、そろそろ退出いたします」.',
  },
  {
    id: 'slang_kke',
    pattern: '〜っけ？',
    formalOrigin: '〜でしたっけ？ / 〜だったっけ？',
    category: 'Rút gọn khẩu ngữ',
    meaning: 'Hình như là... phải không nhỉ? (Hỏi lại điều mình nhớ láng máng)',
    nuanceAndContext:
      'Dùng khi người nói biết một thông tin trong quá khứ nhưng hiện tại đột nhiên quên mất hoặc không chắc chắn, cần người đối thoại xác nhận giùm.',
    realConversations: {
      situation: 'Hỏi lại tên đồng nghiệp mới gặp hôm qua',
      speakerA: '彼の名前、何だっけ？ (Tên anh ấy là gì ấy nhỉ?)',
      speakerB: '田中さんだよ。 (Anh Tanaka đó mà.)',
    },
    culturalCaution:
      'Có thể dùng lịch sự với sếp bằng dạng: 「〜でしたっけ？」 (Ví dụ: 「明日の会議は何時からでしたっけ？」), rất tự nhiên và gần gũi.',
  },
  {
    id: 'slang_yabai',
    pattern: 'やばい (Yabai)',
    formalOrigin: 'Khẩu ngữ thế hệ trẻ & đời sống hiện đại',
    category: 'Slang giới trẻ',
    meaning: 'Đa nghĩa: Nguy hiểm, chết dở HOẶC Đỉnh cao, ngon tuyệt vời, đẹp mê hồn',
    nuanceAndContext:
      'Từ vựng biến ảo số 1 tiếng Nhật! Ban đầu nghĩa là "nguy hiểm, sắp toi rồi" (tiêu cực), nhưng giới trẻ ngày nay dùng để khen ngợi mức độ tột cùng (tích cực).',
    realConversations: {
      situation: 'Ăn một bát ramen cực ngon ở quán nổi tiếng',
      speakerA: 'このラーメン、スープがやばい！ (Bát mì này nước dùng đỉnh chóp luôn!)',
      speakerB: '本当だ、美味しすぎる！ (Công nhận, ngon không tưởng!)',
    },
    culturalCaution:
      'Trong phỏng vấn xin việc (Shukatsu) hoặc thuyết trình B2B, tuyệt đối không thốt ra chữ "Yabai" vì sẽ bị đánh giá là thiếu vốn từ vựng học thuật.',
  },
  {
    id: 'slang_cushion_words',
    pattern: 'クッション言葉 (Từ Đệm Cushion)',
    formalOrigin: 'Văn hóa nói giảm nói tránh & nghệ thuật lịch thiệp Nhật',
    category: 'Từ đệm Cushion',
    meaning: 'Lớp đệm nhung làm dịu câu nói trước khi từ chối, nhờ vả hoặc góp ý',
    nuanceAndContext:
      'Người Nhật không bao giờ đi thẳng vào một yêu cầu khó hoặc lời từ chối thô bạo. Họ luôn đặt một "chiếc gối đệm" phía trước để đối phương không bị sốc tâm lý.',
    realConversations: {
      situation: 'Nhờ vả đối tác hoặc cấp trên kiểm tra tài liệu',
      speakerA: '恐れ入りますが、こちらの資料をご確認いただけますでしょうか。',
      speakerB: 'はい、承知いたしました。拝見します。',
    },
    culturalCaution:
      '4 câu đệm gối đầu giường: 「恐れ入りますが」(Xin thứ lỗi nhưng mà...), 「差し支えなければ」(Nếu tiện cho quý vị...), 「お忙しいところ恐縮ですが」(Biết là quý vị rất bận nhưng...), 「あいにくですが」(Thật chẳng may là...).',
  },
];

export const EXTRA_DAILY_SPOKEN: DailySpokenItem[] = [
  {
    id: 'slang_tteba_ttara',
    pattern: '〜ってば / 〜ったら',
    formalOrigin: '〜と言ったら / 〜と言っているでしょう (Đã bảo rồi mà / Nói bao nhiêu lần rồi)',
    category: 'Ngữ điệu & Cảm thán',
    meaning: 'Đã bảo là... mà! (bực bội nhắc lại) / Thật là... (cằn nhằn người thân)',
    nuanceAndContext:
      'Dùng khi đối phương lơ đễnh hoặc không chịu hiểu dù mình đã nhắc nhiều lần. Cực kỳ phổ biến trong gia đình, người thân, bạn bè thân thiết.',
    realConversations: {
      situation: 'Mẹ giục con trai dọn phòng học',
      speakerA: '早く部屋を片付けなさいってば！ (Đã bảo mau dọn phòng đi mà!)',
      speakerB: '今やろうと思ってたのにー！ (Con đang định dọn đây này!)',
    },
    culturalCaution:
      'Chỉ dùng với người thân thiết hoặc vai dưới. Cấm kỵ dùng với đối tác, sếp hoặc người lớn tuổi hơn.',
  },
  {
    id: 'slang_wakenee',
    pattern: 'わけない / わけねえ',
    formalOrigin: 'わけがありません / わけがない (Làm sao mà có chuyện đó được)',
    category: 'Rút gọn khẩu ngữ',
    meaning: 'Làm gì có chuyện đó!, Đời nào lại thế!',
    nuanceAndContext:
      'Khẩu ngữ rút gọn dứt khoát của わけがない. "Wakenee" là biến thể giọng nam bộc trực, phủ định hoàn toàn một nhận định vô căn cứ.',
    realConversations: {
      situation: 'Bạn bè trêu chọc việc thích thầm bạn học',
      speakerA: 'お前、あの子のこと好きなの？ (Cậu thích nhỏ đó đúng không?)',
      speakerB: 'そんなわけねえだろ！ただの友達だよ！ (Làm quái gì có chuyện đó! Bạn bè bình thường thôi!)',
    },
    culturalCaution:
      'Phủ định rất mạnh và suồng sã, chỉ nói trong hội bạn bè cùng lứa hoặc anh em thân thiết.',
  },
  {
    id: 'slang_tokorodatta',
    pattern: '〜ところだった',
    formalOrigin: '〜そうになりました (Suýt chút nữa thì...)',
    category: 'Rút gọn khẩu ngữ',
    meaning: 'Suýt nữa thì... (thoát nạn trong gang tấc)',
    nuanceAndContext:
      'Thường đi kèm với 「危うく」(ayauku) hoặc 「もう少しで」(mou sukoshi de) diễn tả một tình huống tai nạn, muộn giờ suýt xảy ra nhưng đã kịp thời ngăn chặn.',
    realConversations: {
      situation: 'Vừa nhảy kịp vào toa tàu trước khi đóng cửa',
      speakerA: '危ない！電車のドアに挟まれるところだった！ (Nguy hiểm quá! Suýt nữa thì bị kẹt vào cửa tàu!)',
      speakerB: 'セーフ！ギリギリ間に合って良かったね！ (An toàn rồi! May mà vừa kịp giây cuối!)',
    },
    culturalCaution:
      'Cấu trúc này tự nhiên ở mọi cấp độ giao tiếp, vừa là khẩu ngữ vừa là ngữ pháp N3 trọng tâm.',
  },
  {
    id: 'slang_tsuuka_teiuka',
    pattern: 'つーか / ていうか',
    formalOrigin: 'というか / と言いますか (Hay đúng hơn là / Mà nói thực ra thì)',
    category: 'Slang giới trẻ',
    meaning: 'Nói đúng hơn là, mà nói thực ra thì, hay đúng là...',
    nuanceAndContext:
      'Dùng khi muốn đính chính hoặc bổ sung góc nhìn chân thực hơn cho câu nói của người đối thoại. Cực kỳ phổ biến trong giới trẻ Nhật và phim ảnh.',
    realConversations: {
      situation: 'Nhận xét về thời tiết mùa hè oi ả ở Tokyo',
      speakerA: '今日、ちょっと暑くない？ (Hôm nay hơi nóng nhỉ?)',
      speakerB: 'つーか、蒸し暑すぎてサウナ状態じゃん！ (Đúng hơn là oi bức như lò xông hơi ấy chứ!)',
    },
    culturalCaution:
      'Mang tính khẩu ngữ đường phố. Trong công việc hoặc phỏng vấn, hãy dùng 「というか」 hoặc 「むしろ」.',
  },
  {
    id: 'slang_gachi_de',
    pattern: 'ガチで / ガチ勢',
    formalOrigin: '真剣に / 本気で (Nghiêm túc, thật sự 100%)',
    category: 'Slang giới trẻ',
    meaning: 'Thật sự luôn, nghiêm túc 100%, dân chuyên / dân cày cuốc thứ thiệt',
    nuanceAndContext:
      'Bắt nguồn từ võ sĩ Sumo (Gachinko - đấu thật không dàn xếp). Giới trẻ dùng ガチで tương đương 本気で để nhấn mạnh sự chân thật hoặc trình độ đỉnh cao.',
    realConversations: {
      situation: 'Khen ngợi bạn học thi đỗ JLPT N1 điểm tuyệt đối',
      speakerA: '彼、JLPT N1で満点取ったらしいよ！ (Nghe nói cậu ấy đạt điểm tuyệt đối N1 đó!)',
      speakerB: 'えっ、ガチで！？あの人はまさに日本語のガチ勢だね！ (Hả, thật luôn á!? Người đó đúng là cao thủ cày tiếng Nhật thứ thiệt!)',
    },
    culturalCaution:
      'Từ lóng cực thịnh hành trên mạng xã hội và trong đời sống giới trẻ hiện đại. Tránh dùng trong văn bản hành chính.',
  },
];

export const KEIGO_QUICK_MATRIX: KeigoMatrixItem[] = [
  {
    verb: '行く / 来る (Đi / Đến)',
    romaji: 'iku / kuru',
    meaning: 'Đi đến nơi nào đó / Đến đây',
    sonkeigo: 'いらっしゃる / おいでになる',
    kenjougo: '参る (まいる - Mairu)',
    teineigo: '行きます / 来ます',
    businessExample: '部長は明日、大阪へいらっしゃいます。私どもも明日現地へ参ります。',
    businessExampleRomaji: 'Buchou wa ashita, Oosaka he irasshaimasu. Watakushidomo mo ashita genchi he mairimasu.',
    businessExampleVn: 'Trưởng phòng ngày mai sẽ đến Osaka. Phía chúng tôi ngày mai cũng sẽ đến tận nơi.',
    commonMistakeTrap: 'Nói "Tôi đi" thành "いらっしゃいます" (Tự nâng bản thân lên - sai nghiêm trọng).',
  },
  {
    verb: 'いる (Ở lại / Có mặt)',
    romaji: 'iru',
    meaning: 'Có mặt tại một địa điểm (sinh vật sống)',
    sonkeigo: 'いらっしゃる / お見えになる',
    kenjougo: 'おる (Oru)',
    teineigo: 'います',
    businessExample: '社長はただいま会議室にいらっしゃいます。私は席におります。',
    businessExampleRomaji: 'Shachou wa tadaima kaigishitsu ni irasshaimasu. Watashi wa seki ni orimasu.',
    businessExampleVn: 'Giám đốc hiện đang ở trong phòng họp. Còn tôi đang có mặt ở bàn làm việc.',
    commonMistakeTrap: 'Dùng "おる" cho khách hàng. Nhớ: "おる" chỉ dùng cho bản thân và người phe mình.',
  },
  {
    verb: '言う (Nói)',
    romaji: 'iu',
    meaning: 'Nói, phát biểu ý kiến',
    sonkeigo: 'おっしゃる (Ossharu)',
    kenjougo: '申す (もうす - Mousu) / 申し上げる',
    teineigo: '言います',
    businessExample: 'お客様がおっしゃった通り、田中と申す者が担当いたします。',
    businessExampleRomaji: 'Okyakusama ga osshatta toori, Tanaka to mousu mono ga tantou itashimasu.',
    businessExampleVn: 'Đúng như quý khách đã nói, người tên là Tanaka bên chúng tôi sẽ chịu trách nhiệm phụ trách.',
    commonMistakeTrap: 'Nói "Tôi nói là" thành "私がおっしゃいました" -> Bị coi là tự kiêu.',
  },
  {
    verb: '食べる / 飲む (Ăn / Uống)',
    romaji: 'taberu / nomu',
    meaning: 'Ăn uống, thưởng thức mỹ vị',
    sonkeigo: '召し上がる (めしあがる - Meshiagaru)',
    kenjougo: 'いただく (Itadaku) / 頂戴する',
    teineigo: '食べます / 飲みます',
    businessExample: 'どうぞ温かいうちにお召し上がりください。では、遠慮なくいただきます。',
    businessExampleRomaji: 'Douzo atatakai uchi ni omeshagari kudasai. Dewa, enryo naku itadakimasu.',
    businessExampleVn: 'Xin mời quý vị dùng bữa khi còn đang nóng ạ. Vậy thì tôi xin phép không khách sáo dùng bữa.',
    commonMistakeTrap: 'Mời khách ăn lại nói "どうぞいただいてください" (Sai! Khách phải là 召し上がる).',
  },
  {
    verb: '見る (Xem / Nhìn)',
    romaji: 'miru',
    meaning: 'Nhìn ngắm, xem tài liệu, duyệt hồ sơ',
    sonkeigo: 'ご覧になる (ごらんになる - Goran ni naru)',
    kenjougo: '拝見する (はいけんする - Haiken suru)',
    teineigo: '見ます',
    businessExample: '添付の企画書をご覧いただけますでしょうか。後ほど拝見いたします。',
    businessExampleRomaji: 'Tenpu no kikakusho wo goran itadakemasu deshou ka. Nochi hodo haiken itashimasu.',
    businessExampleVn: 'Quý vị có thể xem qua bản kế hoạch đính kèm được không ạ? Tôi xin phép xem sau ạ.',
    commonMistakeTrap: 'Nói với khách "Tôi đã xem báo giá của quý vị" bằng "ご覧になりました" (Sai! Phải là 拝見しました).',
  },
  {
    verb: '知っている (Biết)',
    romaji: 'shitte iru',
    meaning: 'Biết, nắm rõ thông tin / một người nào đó',
    sonkeigo: 'ご存知です (ごぞんじです - Gozonji desu)',
    kenjougo: '存じております (Zonjite orimasu) / 存じ上げます',
    teineigo: '知っています',
    businessExample: 'その件はご存知でしょうか。はい、よく存じております。',
    businessExampleRomaji: 'Sono ken wa gozonji deshou ka. Hai, yoku zonjite orimasu.',
    businessExampleVn: 'Quý vị có biết sự việc đó không ạ? Vâng, tôi biết rất rõ sự việc đó ạ.',
    commonMistakeTrap: 'Nếu không biết: Khách hỏi thì đáp "存じません" hoặc "わかりかねます" (chứ không nói "知りません").',
  },
  {
    verb: 'する (Làm)',
    romaji: 'suru',
    meaning: 'Thực hiện hành động, làm việc',
    sonkeigo: 'なさる (Nasaru) / される',
    kenjougo: 'いたす (Itasu)',
    teineigo: 'します',
    businessExample: 'ゴルフはなさいますか？はい、休日に少しいたします。',
    businessExampleRomaji: 'Gorufu wa nasaimasu ka? Hai, kyuujitsu ni sukoshi itashimasu.',
    businessExampleVn: 'Quý ngài có chơi golf không ạ? Vâng, vào ngày nghỉ tôi có chơi một chút ạ.',
    commonMistakeTrap: 'Lỗi lạm dụng "〜させていただきます" liên tục khiến câu văn rườm rà thiếu dứt khoát.',
  },
];

export const EXTRA_KEIGO_MATRIX: KeigoMatrixItem[] = [
  {
    verb: '会う (Gặp)',
    romaji: 'au',
    meaning: 'Gặp gỡ đối tác, khách hàng, cấp trên',
    sonkeigo: 'お会いになる / ご面会になる',
    kenjougo: 'お目にかかる (Ome ni kakaru) / お会いする',
    teineigo: '会います',
    businessExample: '昨日、佐藤社長にお目にかかりました。来週、先生にお会いになりますか？',
    businessExampleRomaji: 'Kinou, Satou shachou ni ome ni kakarimashita. Raishuu, sensei ni oai ni narimasu ka?',
    businessExampleVn: 'Hôm qua tôi đã vinh hạnh được gặp giám đốc Sato. Tuần sau quý vị có đến gặp thầy giáo không ạ?',
    commonMistakeTrap: 'Nói "Tôi gặp quý khách" thành "お会いになられます" (Nhầm lẫn tôn kính thành khiêm nhường). Phải dùng "お目にかかる".',
  },
  {
    verb: '聞く / 訪ねる (Nghe / Hỏi / Thăm)',
    romaji: 'kiku / tazuneru',
    meaning: 'Lắng nghe ý kiến, đặt câu hỏi hoặc đến thăm văn phòng',
    sonkeigo: 'お聞きになる / お尋ねになる',
    kenjougo: '伺う (うかがう - Ukagau) / 拝聴する (Haikou suru)',
    teineigo: '聞きます / 尋ねます',
    businessExample: '明日の午前10時に貴社オフィスへ伺います。ご高見を拝聴できて光栄です。',
    businessExampleRomaji: 'Ashita no gozen jyuu-ji ni kisha ofisu he ukagaimasu. Gokouken wo haichou dekite kouei desu.',
    businessExampleVn: '10 giờ sáng mai tôi xin phép ghé thăm văn phòng quý công ty. Thật vinh hạnh khi được lắng nghe ý kiến cao kiến của quý ngài.',
    commonMistakeTrap: 'Dùng "伺う" cho hành động của khách ("Khách đến hỏi" -> sai, phải là "お客様がお尋ねになる").',
  },
  {
    verb: 'もらう (Nhận)',
    romaji: 'morau',
    meaning: 'Nhận tài liệu, quà tặng, ý kiến chỉ đạo',
    sonkeigo: 'お納めになる / お受け取りになる',
    kenjougo: 'いただく (Itadaku) / 頂戴する (Choudai suru)',
    teineigo: 'もらいます',
    businessExample: '結構なお品を頂戴し、誠にありがとうございます。',
    businessExampleRomaji: 'Kekkou na oshina wo choudai shi, makoto ni arigatou gozaimasu.',
    businessExampleVn: 'Tôi xin chân thành cảm ơn quý vị đã trao tặng cho tôi món quà tuyệt vời này.',
    commonMistakeTrap: 'Dùng "もらう" với sếp hoặc đối tác ("メールをもらいました" -> thô thiển, chuẩn mực phải là "メールを頂戴いたしました").',
  },
  {
    verb: '与える / 渡す (Cho / Tặng / Gửi trao)',
    romaji: 'ataeru / watasu',
    meaning: 'Gửi trao tài liệu, trao tặng quà lưu niệm cho đối tác',
    sonkeigo: 'くださる (Kudasaru) / お与えになる',
    kenjougo: '差し上げる (Sashiageru) / 進呈する',
    teineigo: 'あげます / 渡します',
    businessExample: '後ほど最新の製品カタログを差し上げます。部長が貴重な助言をくださいました。',
    businessExampleRomaji: 'Nochi hodo saishin no seihin katarogu wo sashiagemasu. Buchou ga kichou na jogen wo kudasaimashita.',
    businessExampleVn: 'Lát nữa tôi xin phép gửi tặng quý vị cuốn danh mục sản phẩm mới nhất. Trưởng phòng đã ban cho chúng tôi những lời khuyên vô cùng quý giá.',
    commonMistakeTrap: 'Nói với đối tác "Tôi sẽ cho ngài cái này" bằng "あげます" (nghe như cho trẻ con hoặc thú cưng). Phải dùng "差し上げます".',
  },
  {
    verb: '思う (Nghĩ / Cho rằng)',
    romaji: 'omou',
    meaning: 'Suy nghĩ, nhận định, đánh giá sự việc',
    sonkeigo: 'お思いになる / お考えになる',
    kenjougo: '存じる (Zonjiru) / 存じ上げる',
    teineigo: '思います',
    businessExample: 'そのように存じます。社長はどうお考えになりますでしょうか。',
    businessExampleRomaji: 'Sono you ni zonjimasu. Shachou wa dou okangae ni narimasu deshou ka.',
    businessExampleVn: 'Tôi cũng nghĩ như vậy ạ. Còn giám đốc nghĩ như thế nào về việc này ạ?',
    commonMistakeTrap: 'Nói "Tôi nghĩ như vậy" với sếp/đối tác mà dùng "思います" thì chỉ đạt mức giao tiếp thường, dùng "存じます" nâng tầm đẳng cấp BJT.',
  },
];

/**
 * Massive In-Depth Offline Topic Knowledge Bank for AI Sensei
 * Provides comprehensive, deep, and structured explanations when offline
 */
export const OFFLINE_ADVANCED_TOPIC_BANK: Record<string, string> = {
  // Wake quartet
  wake_quartet: `PHÂN BIỆT BỘ TỨ CẤU TRÚC 「わけ」(WAKE) TRỌNG TÂM JLPT N3-N2:
Cốt lõi nhận thức: 「わけ」(訳) nghĩa gốc là "Lý do, lẽ thường tình, đạo lý đương nhiên".

1. 「〜わけではない / 〜わけじゃない」(PHỦ ĐỊNH MỘT PHẦN):
   • Bản chất: "Không hẳn là...", "Không phải là hoàn toàn như vậy".
   • Dùng để đính chính sự hiểu lầm: Nhận một phần nhưng phủ nhận phần còn lại.
   • Công thức: Futsuukei + わけではない (Tính từ na + な / Danh từ + な/である)
   • Ví dụ: 日本料理が嫌いなわけではないが、納豆だけは食べられない。
     (Không hẳn là tôi ghét đồ ăn Nhật, chỉ là riêng món Natto thì tôi không ăn nổi).
   • Bẫy JLPT: Hay đi với các trạng từ 「必ずしも」(không nhất thiết), 「全部」(không phải tất cả).

2. 「〜わけがない / 〜わけはない」(PHỦ ĐỊNH TUYỆT ĐỐI 100%):
   • Bản chất: "Tuyệt đối không thể nào có chuyện...", "Lẽ nào lại như thế được!".
   • Người nói khẳng định dựa trên niềm tin hoặc bằng chứng vững chắc.
   • Đồng nghĩa cấp cao: 〜はずがない.
   • Ví dụ: あの真面目な彼がカンニングをするわけがない。
     (Người nghiêm túc như anh ấy tuyệt đối không đời nào lại quay cóp thi cử!).

3. 「〜わけにはいかない」(RÀNG BUỘC ĐẠO ĐỨC & TRÁCH NHIỆM XÃ HỘI):
   • Bản chất: "Về mặt tâm lý, đạo đức, quy tắc xã hội thì không thể làm được".
   • Rất muốn làm nhưng lương tâm hoặc hoàn cảnh không cho phép; hoặc không muốn làm nhưng vì trách nhiệm bắt buộc phải làm.
   • Ví dụ: 明日は大事な試験があるので、今夜はゲームをするわけにはいかない。
     (Ngày mai có kỳ thi quan trọng rồi, tối nay không thể cứ ngồi chơi game vô tư được).
   • Thể phủ định kép 「〜ないわけにはいかない」 = "Bắt buộc phải làm" (社長の命令だから、行かないわけにはいかない).

4. 「〜というわけだ」(TỔNG KẾT BẢN CHẤT / THẢO NÀO):
   • Bản chất: Giải thích nguyên nhân hoặc rút ra kết luận tất yếu từ những sự thật đã biết.
   • Ví dụ: 5人家族でケーキが5個ある。つまり、1人1個ずつ食べられるというわけだ。
     (Gia đình 5 người có 5 cái bánh. Tức là mỗi người được một cái theo lẽ đương nhiên).`,

  // Mono vs Koto vs Beki
  mono_vs_koto_vs_beki: `PHÂN BIỆT CÁC CẤU TRÚC N2: 「ものだ」 VS 「ことだ」 VS 「べきだ」
Cốt lõi: Quy luật tự nhiên / Cảm thán vs Lời khuyên răn trực tiếp vs Nghĩa vụ đạo đức.

1. 「〜ものだ」(MONO DA - 4 CÁCH DÙNG KINH ĐIỂN):
   • Nghĩa 1 - Chân lý tự nhiên, lẽ thường tình ở đời: 人の心は変わりやすいものだ (Lòng người vốn dĩ dễ đổi thay).
   • Nghĩa 2 - Hồi tưởng quá khứ sâu lắng (Đi với V-ta): 子供の頃、よくこの川で泳いだものだ (Hồi còn thơ bé, tôi thường hay bơi ở con sông này biết bao).
   • Nghĩa 3 - Cảm thán cao độ: 時間が経つのは本当に早いものですね (Thời gian trôi qua thật sự nhanh quá chừng!).
   • Nghĩa 4 - Lời khuyên chung về đạo lý phổ quát: 親の言うことは聞くものだ (Phận làm con cái thì nên lắng nghe lời cha mẹ).

2. 「〜ことだ」(KOTO DA - LỜI KHUYÊN CỤ THỂ):
   • Bản chất: "Cách tốt nhất là nên...", đưa ra giải pháp trực tiếp cho một vấn đề cụ thể của đối phương.
   • Công thức: V-ru / V-nai + ことだ
   • Ví dụ: 日本語が上手になりたいなら、毎日声を出して読むことだ。
     (Nếu muốn giỏi tiếng Nhật, cách tốt nhất là mỗi ngày hãy đọc to thành tiếng).

3. 「〜べきだ / 〜べきではない」(BEKI DA - NGHĨA VỤ ĐẠO ĐỨC BẮT BUỘC):
   • Bản chất: "Đương nhiên phải làm", "Có nghĩa vụ phải làm" dựa trên chuẩn mực đạo đức xã hội.
   • Chú ý: Động từ する có thể chia thành 「するべき」 hoặc 「すべき」.
   • Ví dụ: 約束は守るべきだ (Đã là lời hứa thì nhất định phải giữ gìn).
   • Bẫy JLPT: Tránh dùng 「べきだ」 trực tiếp với cấp trên vì mang sắc thái dạy đời.`,

  // Uchi ni vs Aida ni
  uchi_ni_vs_aida_ni: `PHÂN BIỆT THỜI GIAN: 「〜うちに」 VS 「〜あいだに」(JLPT N3)
Cốt lõi: Tranh thủ trước khi trạng thái thay đổi vs Khoảnh khắc hành động xen vào.

1. 「〜うちに」(UCHI NI - TRANH THỦ KẺO NGUỘI):
   • Bản chất: Tận dụng lúc trạng thái A còn đang tiếp diễn để làm B; nếu để trạng thái A trôi qua thì sẽ mất cơ hội hoặc gặp khó khăn.
   • Nghĩa 1 - Tranh thủ: 熱いうちに召し上がってください (Hãy tranh thủ ăn lúc thức ăn còn nóng hổi).
   • Nghĩa 2 - Biến đổi tự nhiên trong vô thức: 音楽を聴いているうちに、眠ってしまった (Trong lúc đang nghe nhạc, tôi đã thiếp đi lúc nào không hay).

2. 「〜あいだに」(AIDA NI - HÀNH ĐỘNG XEN VÀO KHOẢNG THỜI GIAN):
   • Phân biệt:
     • 「〜あいだ」(không có に): Cả vế trước và vế sau kéo dài liên tục song song (夏休みのあいだ、ずっと日本にいた - Suốt kỳ nghỉ hè tôi ở Nhật).
     • 「〜あいだに」(có に): Trong khoảng thời gian vế trước diễn ra liên tục, có một HÀNH ĐỘNG DỨT ĐIỂM của vế sau xen vào.
   • Ví dụ: 留守のあいだに、泥棒が入った (Trong lúc tôi vắng nhà, trộm đã lẻn vào).`,

  // Kiri vs Ppanashi vs Darake
  kiri_vs_ppanashi_vs_darake: `PHÂN BIỆT TIÊU CỰC N2: 「きり」 VS 「っぱなし」 VS 「だらけ」
Cốt lõi: Kể từ lần đó bặt vô âm tín vs Bỏ mặc trạng thái không dọn vs Bề mặt đầy rẫy vết bẩn.

1. 「〜きり」(V-ta + きり):
   • Bản chất: "Kể từ sau khi làm việc đó lần cuối thì trạng thái dừng hẳn lại, không có biến chuyển gì thêm".
   • Ví dụ: 彼は朝出かけたきり、夜になっても帰ってこない (Cậu ấy đi ra ngoài từ sáng sớm rồi bặt vô âm tín, đến đêm vẫn chưa về).

2. 「〜っぱなし」(V-masu bỏ masu + っぱなし):
   • Bản chất: "Cứ để nguyên trạng thái dở dang mà không chịu thu dọn, hoàn tất". Thể hiện thái độ trách móc, cẩu thả.
   • Ví dụ: ドアを開けっぱなしにしないでください (Đừng có mở toang cửa rồi bỏ mặc đấy không thèm đóng lại).
   • Ví dụ: 電気をつけっぱなしで寝てしまった (Để nguyên đèn sáng trưng rồi ngủ quên mất).

3. 「〜だらけ」(Danh từ + だらけ):
   • Bản chất: "Đầy rẫy, bám đầy trên bề mặt" những thứ dơ bẩn, lỗi sai, máu me, bùn đất (toàn những thứ mắt thấy khó chịu).
   • Ví dụ: このレポートは間違いだらけだ (Bản báo cáo này toàn lỗi sai là lỗi sai).
   • Ví dụ: 泥だらけの靴 (Đôi giày dính đầy bùn lầy).`,

  // Omoimasu vs Kangaemasu vs Omowaremasu
  omoimasu_vs_kangaemasu: `PHÂN BIỆT TƯ DUY: 「思う」(OMOU) VS 「考える」(KANGAERU) VS 「思われる」(OMOWAREMASU)
Cốt lõi: Trực giác cảm tính tức thì vs Suy luận logic có phương pháp vs Nhận định khách quan học thuật.

1. 「思う」(OMOU):
   • Bản chất: Cảm xúc, linh cảm, ý nghĩ tự nhiên nảy sinh trong đầu mà không cần phải vắt óc suy luận sâu xa.
   • Ví dụ: 明日は雨が降ると思う (Tôi cảm thấy ngày mai trời sẽ mưa).
   • Khi nói về ý định của bản thân: 「〜と思っています」(Tôi đang nung nấu ý định...).

2. 「考える」(KANGAERU):
   • Bản chất: Hoạt động trí óc logic, phân tích dữ liệu, cân nhắc thiệt hơn để tìm ra giải pháp hoặc kế hoạch.
   • Ví dụ: 問題の解決策を一晩中考えた (Tôi đã suy nghĩ tìm giải pháp cho vấn đề suốt cả đêm).

3. 「思われる」(OMOWAREMASU - THỂ TỰ NHIÊN / BỊ ĐỘNG N1):
   • Bản chất: "Được nhận định là...", "Dựa trên số liệu có thể suy luận rằng...".
   • Đây là cách diễn đạt tối thượng trong văn phong Luận văn học thuật, Đọc hiểu Dokkai JLPT N2-N1 và Báo cáo kinh tế, giúp câu văn khách quan, khiêm nhường, không mang tính áp đặt ý kiến cá nhân.
   • Ví dụ: 今後、市場はさらに拡大するものと思われる (Dự báo thị trường trong tương lai sẽ tiếp tục mở rộng).`,

  // Conditional Tetralogy (To vs Ba vs Tara vs Nara)
  conditional_tetralogy: `PHÂN BIỆT BỘ TỨ CÂU ĐIỀU KIỆN KINH ĐIỂN: 「〜と」 VS 「〜ば」 VS 「〜たら」 VS 「〜なら」
Cốt lõi nhận thức: Quy luật tự nhiên tất yếu vs Giả định logic vs Trình tự trước-sau vs Lời khuyên theo thông tin đối phương.

1. 「〜と」(TO - TỰ NHIÊN, TẤT YẾU, MÁY MÓC):
   • Bản chất: Cứ hễ làm A thì ĐƯƠNG NHIÊN 100% kết quả B sẽ tự động xảy ra (quy luật tự nhiên, vận hành thiết bị, chỉ đường).
   • CẤM DÙNG: Vế sau TUYỆT ĐỐI KHÔNG DÙNG ý chí, mệnh lệnh, rủ rê, nhờ vả (〜てください, 〜ましょう, 〜たい).
   • Ví dụ: このボタンを押すと、お湯が出ます (Hễ ấn nút này thì nước nóng sẽ chảy ra).
   • Ví dụ: 春になると、桜が咲く (Hễ mùa xuân đến thì hoa anh đào sẽ nở rộ).

2. 「〜ば」(BA - ĐIỀU KIỆN GIẢ ĐỊNH LOGIC & GIẢ THIẾT):
   • Bản chất: Đặt ra điều kiện cần: "Chỉ cần thỏa mãn A thì B sẽ thành hiện thực".
   • Vế sau nếu là động từ ý chí: Vế trước PHẢI là tính từ hoặc động từ trạng thái (không phải động từ hành động).
   • Ví dụ: 安ければ、買います (Nếu mà rẻ thì tôi sẽ mua).
   • Thành ngữ kinh điển: 「〜ば〜ほど」(Càng... thì càng...).

3. 「〜たら」(TARA - TRÌNH TỰ THỜI GIAN & PHẠM VI RỘNG NHẤT):
   • Bản chất: "Sau khi A xong xuôi dứt điểm thì làm B".
   • Đây là cấu trúc linh hoạt nhất trong giao tiếp đời thường: ĐƯỢC PHÉP dùng mệnh lệnh, nhờ vả, rủ rê ở vế sau!
   • Ví dụ: 東京に着いたら、電話してください (Sau khi đến Tokyo, hãy gọi điện thoại cho tôi nhé).
   • Phát hiện bất ngờ: Đang làm A thì bỗng nhận ra B (窓を開けたら、雪が降っていた - Vừa mở cửa sổ ra thì thấy tuyết đang rơi).

4. 「〜なら」(NARA - ĐƯA RA LỜI KHUYÊN DỰA TRÊN THÔNG TIN ĐỐI PHƯƠNG):
   • Bản chất: "Nếu như đúng là chuyện bạn vừa nói thì...", tiếp nhận thông tin từ người đối thoại để đưa ra đề xuất.
   • Đặc điểm vàng: Hành động ở vế sau có thể diễn ra TRƯỚC hành động ở vế trước!
   • Ví dụ: 日本へ行くなら、富士山に登ったほうがいいですよ (Nếu mà bạn dự định đi Nhật, thì nên leo núi Phú Sĩ nhé).`,

  // Conjecture Tetralogy (Sou da vs You da vs Rashii vs Mitai da)
  conjecture_tetralogy: `PHÂN BIỆT BỘ TỨ SUY ĐOÁN & TRUYỀN VĂN: 「そうだ」 VS 「ようだ」 VS 「らしい」 VS 「みたいだ」
Cốt lõi nhận thức: Phán đoán thị giác/nghe đồn vs Đánh giá 5 giác quan & ví von vs Thông tin gián tiếp tin cậy vs Khẩu ngữ đời thường.

1. 「〜そうだ」(SOU DA - 2 CÁCH DÙNG HOÀN TOÀN KHÁC NHAU):
   • Dạng 1 (TRUYỀN VĂN - Nghe nói là):
     - Công thức: Thể thông thường (Futsuukei) + そうだ.
     - Ví dụ: 明日は雨が降るそうだ (Nghe dự báo thời tiết nói ngày mai trời sẽ mưa).
   • Dạng 2 (THỊ GIÁC TRỰC QUAN - Trông có vẻ sắp):
     - Công thức: Động từ bỏ masu + そうだ / Tính từ bỏ i, na + そうだ.
     - Ví dụ: 雨が降りそうだ (Trời mây đen kịt, trông có vẻ sắp mưa đến nơi rồi).
     - Chú ý bất quy tắc: いい -> よさそうだ, ない -> なさそうだ.

2. 「〜ようだ」(YOU DA - PHÁN ĐOÁN CĂN CỨ VÀ VÍ VON):
   • Bản chất: Phán đoán chủ quan dựa trên cảm nhận của 5 giác quan (nghe thấy tiếng động, ngửi thấy mùi, nhìn thấy hiện trường).
   • Ví dụ: 誰もいないようだ (Nhà tắt đèn im ắng, dường như không có ai ở nhà).
   • Ví dụ so sánh ví von: 彼女は太陽のようだ (Cô ấy rạng rỡ tựa như ánh mặt trời).

3. 「〜らしい」(RASHII - THÔNG TIN ĐÁNG TIN CẬY & BẢN CHẤT CHUẨN MỰC):
   • Nghĩa 1 - Suy đoán dựa trên thông tin gián tiếp khách quan (tin tức, báo đài, lời kể người thứ ba).
     Ví dụ: 事故があったらしい (Hình như vừa có tai nạn xảy ra ở đằng kia thì phải).
   • Nghĩa 2 - Bản chất đích thực (Danh từ + らしい):
     Ví dụ: 男らしい (Rất ra dáng nam nhi), 春らしい日 (Một ngày đậm chất mùa xuân).

4. 「〜みたいだ」(MITAI DA - KHẨU NGỮ CỦA YOU DA):
   • Dùng phổ biến nhất trong giao tiếp đời thường, phim ảnh và khẩu ngữ.
   • Ví dụ: もう帰ったみたい (Hình như anh ấy đã về mất rồi).`,

  // Kaneru vs Kanenai
  kaneru_vs_kanenai: `BẪY NGỮ PHÁP N2 KINH ĐIỂN: 「〜かねる」 VS 「〜かねない」
Cốt lõi nhận thức: Từ chối lịch sự (Không thể) vs Cảnh báo hiểm họa (Rất có thể sẽ xảy ra hậu quả xấu).

1. 「〜かねる」(V-masu bỏ masu + かねる):
   • Bản chất: "Khó lòng mà làm được / Xin phép từ chối".
   • Mang sắc thái khiêm nhường, lịch sự tối thượng trong công sở và đàm phán thương mại.
   • Ví dụ: そのご提案には賛成しかねます (Về đề xuất đó của quý công ty, chúng tôi xin phép khó lòng tán thành được).
   • Ví dụ: 個人情報はお答えしかねます (Chúng tôi xin phép không thể trả lời về thông tin cá nhân).

2. 「〜かねない」(V-masu bỏ masu + かねない):
   • Bản chất: "Rất có thể sẽ dẫn đến hậu quả tai hại / Không chừng sẽ xảy ra nguy cơ lớn".
   • 100% VẾ SAU LÀ HẬU QUẢ TIÊU CỰC (tai nạn, đổ vỡ, phá sản, mất mạng).
   • Ví dụ: スピードを出しすぎると、大事故を起こしかねない (Nếu phóng xe quá tốc độ, rất có thể sẽ gây ra tai nạn thảm khốc).
   • Bẫy thi JLPT: Nhìn thấy đuôi phủ định 「〜ない」 nhưng thực chất mang nghĩa KHẲNG ĐỊNH ("Có nguy cơ cao").`,

  // Osore ga aru vs Gimi vs Gachi
  osore_ga_aru: `PHÂN BIỆT SẮC THÁI TIÊU CỰC N2: 「恐れがある」 VS 「気味」 VS 「がち」
1. 「〜恐れがある」(OSORE GA ARU - NGUY CƠ NGUY HIỂM LỚN):
   • Dùng trong văn phong báo chí, thời sự, cảnh báo thiên tai, dịch bệnh hoặc biến động kinh tế.
   • Ví dụ: 台風が上陸する恐れがあります (Có nguy cơ bão lớn sẽ đổ bộ vào đất liền).

2. 「〜気味」(GIMI - CÓ CHÚT CẢM GIÁC LÀ LẠ):
   • Diễn tả trạng thái sức khỏe hoặc tâm lý hiện tại hơi có triệu chứng gì đó nhẹ nhàng.
   • Ví dụ: 風邪気味 (Hơi có triệu chứng cảm mạo), 緊張気味 (Hơi có vẻ căng thẳng).

3. 「〜がち」(GACHI - KHUYNH HƯỚNG TẦN SUẤT CAO):
   • Diễn tả thói quen hoặc hiện tượng hay xảy ra, thường mang tính tiêu cực.
   • Ví dụ: 留守がち (Thường xuyên vắng nhà), 遠慮しがち (Hay có tính e ngại, giữ kẽ).`,

  // Dokoroka vs Bakarika vs Nomi narazu
  dokoroka_vs_bakarika: `PHÂN BIỆT TĂNG TIẾN N2: 「どころか」 VS 「ばかりか」 VS 「のみならず」
1. 「〜どころか」(DOKOROKA - ĐỪNG NÓI ĐẾN A, NGAY CẢ B CŨNG CHẲNG ĐƯỢC):
   • Phủ định cực đoan: Thực tế hoàn toàn trái ngược với kỳ vọng ban đầu.
   • Ví dụ: 貯金どころか、借金が増えている (Tiết kiệm đâu chẳng thấy, nợ nần ngày càng chồng chất thêm).

2. 「〜ばかりか」(BAKARIKA - KHÔNG CHỈ A MÀ NGAY CẢ B CŨNG...):
   • Tăng tiến mức độ: Đã có A rồi mà mức độ còn lan tỏa sang cả B (vượt ngoài dự tính).
   • Ví dụ: 彼は英語ばかりか、中国語も流暢に話せる (Anh ấy không chỉ tiếng Anh mà ngay cả tiếng Trung cũng nói lưu loát).

3. 「〜のみならず」(NOMI NARAZU - VĂN PHONG HỌC THUẬT TRANG TRỌNG):
   • Mang nghĩa tương đương 「ばかりか」 nhưng dùng trong báo cáo, diễn văn chính thức.
   • Ví dụ: 国内のみならず、海外でも高く評価されている (Được đánh giá cao không chỉ trong nước mà cả ở thị trường quốc tế).`,

  // Tsuujite vs Tooshite
  tsuujite_vs_tooshite: `PHÂN BIỆT TRUNG GIAN N2: 「を通じて」(TSUUJITE) VS 「を通して」(TOOSHITE)
Cả hai đều dịch là "Thông qua...", nhưng sắc thái chủ động và phạm vi thời gian khác biệt.

1. NGHĨA KHOẢNG THỜI GIAN (SUỐT CẢ MỘT KỲ):
   • 「〜を通じて」: Nhấn mạnh trạng thái diễn ra suốt xuyên suốt cả khoảng thời gian (四季を通じて - Suốt cả 4 mùa quanh năm).
   • 「〜を通して」: Thường dùng trong văn phong khẩu ngữ hơn (一年を通して).

2. NGHĨA PHƯƠNG TIỆN / TRUNG GIAN (THÔNG QUA AI / CÁI GÌ):
   • 「〜を通じて」: Trung gian mang tính khách quan, tự nhiên (インターネットを通じて知った - Tôi biết thông qua mạng internet).
   • 「〜を通して」: Người nói CHỦ ĐỘNG sử dụng trung gian đó để đạt được mục đích (友人を通して頼んだ - Nhờ vả thông qua người bạn).`,

  // Ni oite vs Ni okeru
  ni_oite_vs_ni_okeru: `PHÂN BIỆT NGỮ PHÁP N2: 「〜において」 VS 「〜における」
Cốt lõi nhận thức: Phó từ bổ nghĩa cho vị ngữ vs Định ngữ bổ nghĩa trực tiếp cho Danh từ.

1. 「〜において」(NI OITE + ĐỘNG TỪ / VỊ NGỮ):
   • Ý nghĩa: "Tại / Ở / Trong lĩnh vực..." (Dạng trang trọng của trợ từ で).
   • Đứng trước vị ngữ động từ để chỉ địa điểm, thời đại, bối cảnh diễn ra sự kiện.
   • Ví dụ: 現代社会において、情報セキュリティは不可欠だ (Trong xã hội hiện đại, an ninh thông tin là điều tất yếu).

2. 「〜における」(NI OKERU + DANH TỪ):
   • Ý nghĩa: "Tại / Ở..." nhưng ĐỨNG TRƯỚC DANH TỪ để bổ nghĩa cho danh từ đó (tương đương 〜での).
   • Công thức: Danh từ 1 + における + Danh từ 2
   • Ví dụ: 現代社会における情報セキュリティ (An ninh thông tin TRONG xã hội hiện đại).`,

  // Ni tomonatte series
  ni_tomonatte_series: `PHÂN BIỆT 4 MẪU BIẾN ĐỔI SONG HÀNH N2: NI TOMONATTE, NI SHITAGATTE, NI TSURETE, TO TOMONI
1. 「〜にともなって」(NI TOMONATTE):
   • Đi kèm với sự thay đổi quy mô lớn, có quan hệ nhân quả rõ ràng (kinh tế, xã hội, biến đổi khí hậu).
   • Ví dụ: 人口減少にともなって、労働力不足が深刻化している (Cùng với sự suy giảm dân số, tình trạng thiếu hụt lao động ngày càng trầm trọng).

2. 「〜にしたがって」(NI SHITAGATTE):
   • Sự biến đổi tỷ lệ thuận tự nhiên một chiều theo thời gian hoặc cấp độ (càng... càng...).
   • Ví dụ: 年齢を重ねるにしたがって、体力が衰える (Cùng với tuổi tác ngày một cao, thể lực cũng dần suy giảm).

3. 「〜につれて」(NI TSURETE):
   • Sự biến đổi tự nhiên đồng thời không phụ thuộc vào ý chí con người.
   • Ví dụ: 台風が近づくにつれて、風が強くなってきた (Càng gần bão đổ bộ, gió càng thổi mạnh).

4. 「〜とともに」(TO TOMONI):
   • Biến đổi diễn ra đồng thời cùng một lúc giữa 2 sự việc.
   • Ví dụ: 時代の変化とともに、価値観も変わる (Cùng với sự biến đổi của thời đại, các giá trị quan cũng đổi thay).`,
};

export interface RootWordExpansion {
  word: string;
  reading: string;
  furigana?: string;
  romaji: string;
  hanViet?: string;
  meaning: string;
  relationType: 'Từ ghép' | 'Phái sinh' | 'Từ phái sinh' | 'Nghĩa bóng' | 'Quán dụng ngữ' | 'Thành ngữ' | 'Cụm từ đi kèm' | 'Từ đồng nghĩa' | string;
}

export interface DetailedVocabItem {
  id: string;
  word: string;
  reading: string;
  furigana: string;
  romaji: string;
  pitchAccent?: string; // 🎵 Trọng âm chuẩn Tokyo (Heiban [0], Atamadaka [1], Nakadaka [2], Odaka [3])
  hanViet: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'Thành ngữ' | 'Thương mại';
  partOfSpeech: string;
  category: 'Nghĩa Đen & Nghĩa Bóng' | 'Thành Ngữ Cơ Thể' | 'Giao Tiếp & Ẩn Dụ' | 'Công Sở & Đàm Phán' | 'Đề Thi & Bẫy Từ Vựng';
  kanjiAnatomy?: {
    radicals: string; // Bộ thủ cấu tạo
    onKunReadings: string; // Trọn bộ âm On / âm Kun
    etymologyMnemonic: string; // Mẹo nhớ chiết tự trực quan
  };
  literalMeaning: string;
  figurativeMeaning: string;
  simpleMeaning?: string; // 💡 Nghĩa đơn giản trực quan đầu tiên trong tiếng Việt (ngắn gọn, cô đọng, dễ hiểu ngay lập tức trong 3 giây)
  primaryMeaning?: string; // 📖 Nghĩa chi tiết / định nghĩa chuẩn mực ngôn ngữ học và ngữ cảnh sử dụng
  meaningPoints?: string[]; // 📑 Danh sách các lớp nét nghĩa chi tiết riêng biệt: ①, ②, ③...
  rootExpansion?: RootWordExpansion[]; // 🌳 Mở rộng trường từ vựng có gốc các từ ấy liên quan vào (áp dụng N5-N1)
  nuanceAndContext: string;
  examples: {
    type: 'literal' | 'figurative' | 'collocation' | 'core';
    label: string;
    japanese: string;
    reading: string;
    romaji: string;
    vietnamese: string;
  }[];
  relatedCollocations: string[];
  synonyms?: string[];
  antonyms?: string[];
  synonymComparison?: Array<{
    term: string;
    reading?: string;
    difference: string;
    example?: string;
  }>; // ⚖️ Bảng đối chiếu trực diện với từ đồng nghĩa / đồng âm dễ nhầm lẫn (vd: 変わる vs 代わる vs 換わる)
  threeSecondTakeaway?: string; // ⏳ Mẹo phản xạ ghi nhớ trong 3 giây
  senseiExplanation: string;
}

/**
 * Helper to safely extract or fallback the first simple meaning in Vietnamese
 */
export function getSimpleMeaning(item: {
  simpleMeaning?: string;
  primaryMeaning?: string;
  figurativeMeaning?: string;
  literalMeaning?: string;
}): string {
  if (item.simpleMeaning && item.simpleMeaning.trim()) {
    return item.simpleMeaning.trim();
  }
  const raw = item.primaryMeaning || item.figurativeMeaning || item.literalMeaning || '';
  if (!raw) return 'Nghĩa từ vựng';
  const clean = raw.replace(/^[0-9①②③④⑤\.\-\s]+/, '').split(/[\;\,。\n\(\)]/)[0].trim();
  return clean || raw.slice(0, 30);
}

/**
 * Helper to get or dynamically extract root word expansion items (Mở rộng trường từ vựng có gốc từ)
 * Guarantees that every vocab item from N5 to N1 always has a rich root network
 */
export function getRootExpansions(item: DetailedVocabItem): RootWordExpansion[] {
  if (item.rootExpansion && item.rootExpansion.length > 0) {
    return item.rootExpansion;
  }
  const results: RootWordExpansion[] = [];
  if (item.relatedCollocations && item.relatedCollocations.length > 0) {
    item.relatedCollocations.forEach((col) => {
      const match = col.match(/^([^\(\)]+)(?:\(([^-\)]+)(?:-\s*([^\)]+))?\))?/);
      if (match) {
        const word = match[1].trim();
        const readingOrRomaji = (match[2] || '').trim();
        const rawMeaning = (match[3] || col.split('-')[1] || '').replace(/[\(\)]/g, '').trim();
        results.push({
          word,
          reading: word,
          romaji: readingOrRomaji,
          meaning: rawMeaning || 'Mở rộng trường từ vựng cùng gốc',
          relationType: word.includes('を') || word.includes('が') || word.includes('に') ? 'Quán dụng ngữ' : 'Từ ghép'
        });
      }
    });
  }
  return results;
}

export const CURATED_ON_DEMAND_VOCAB_BANK: DetailedVocabItem[] = [
  {
    id: 'vocab_tegami',
    word: '手紙',
    reading: 'てがみ',
    furigana: '手紙[てがみ]',
    romaji: 'tegami',
    hanViet: 'THỦ CHỈ',
    level: 'N5',
    partOfSpeech: 'Danh từ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Bức thư, lá thư (văn bản viết tay hoặc in trên giấy, bỏ trong phong bì và gửi qua đường bưu điện hoặc trao tận tay người nhận).',
    figurativeMeaning: 'Biểu tượng của sự gắn kết tình cảm chân thành và ấm áp; nét chữ tay phản ánh tâm tư của người viết (tuyệt đối không có nghĩa xấu như làm ẩu; làm ẩu là 手を抜く).',
    simpleMeaning: 'Lá thư, bức thư',
    primaryMeaning: 'Lá thư, bức thư (văn bản viết trên giấy được gửi qua đường bưu điện hoặc trao tận tay; nghĩa chung bao quát mọi loại thư giấy truyền thống, không dùng cho thư điện tử E-mail).',
    meaningPoints: [
      '① Nghĩa chung: Bức thư, lá thư viết tay hoặc in trên giấy được gửi qua đường bưu điện hoặc trao tận tay người nhận',
      '② BẪY JLPT KINH ĐIỂN: 手紙 CHỈ DÙNG CHO THƯ GIẤY BƯU ĐIỆN. Thư điện tử trong tiếng Nhật bắt buộc phải dùng メール (meeru - Email), đề thi dùng 手紙 cho email là SAI HOÀN TOÀN!',
      '③ NGUỒN GỐC CHỮ HÁN: "Thủ chỉ" (手紙) tại Trung Quốc cổ có nghĩa là giấy viết tay; sang Nhật Bản thời Heian/Kamakura phát triển thành thư từ thăm hỏi trang trọng'
    ],
    rootExpansion: [
      {
        word: '手紙箱',
        reading: 'てがみばこ',
        furigana: '手紙[てがみ] 箱[ばこ]',
        romaji: 'tegamibako',
        meaning: 'Hộp đựng thư từ kỷ niệm',
        relationType: 'Từ ghép'
      },
      {
        word: '速達手紙',
        reading: 'そくたつてがみ',
        furigana: '速達[そくたつ] 手紙[てがみ]',
        romaji: 'sokutatsu tegami',
        meaning: 'Thư chuyển phát nhanh hỏa tốc',
        relationType: 'Từ ghép'
      },
      {
        word: '航空手紙',
        reading: 'こうくうてがみ',
        furigana: '航空[こうくう] 手紙[てがみ]',
        romaji: 'koukuu tegami',
        meaning: 'Thư gửi qua đường hàng không (Airmail)',
        relationType: 'Từ ghép'
      },
      {
        word: '絵手紙',
        reading: 'えてがみ',
        furigana: '絵手紙[えてがみ]',
        romaji: 'etegami',
        meaning: 'Bưu thiếp vẽ tranh kèm lời chúc ngắn truyền thống Nhật Bản',
        relationType: 'Từ ghép'
      },
      {
        word: '手紙を送る',
        reading: 'てがみをおくる',
        furigana: '手紙[てがみ]を 送[お]くる',
        romaji: 'tegami wo okuru',
        meaning: 'Gửi thư cho ai đó',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '手紙を受け取る',
        reading: 'てがみをうけとる',
        furigana: '手紙[てがみ]を 受[う]け 取[と]る',
        romaji: 'tegami wo uketoru',
        meaning: 'Nhận được thư từ',
        relationType: 'Quán dụng ngữ'
      }
    ],
    nuanceAndContext: 'CẢNH BÁO BẪY THI CỬ JLPT N5–N3: Người Việt thường có thói quen gọi chung email là "thư". Tuy nhiên trong tiếng Nhật, 手紙 chỉ dùng cho thư giấy truyền thống (kèm phong bì 封筒 và tem 切手). Thư điện tử bắt buộc phải là メール (E-mail).',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa thực tế (Viết thư tay)',
        japanese: '母の誕生日に、感謝の気持ちを込めて手書きの手紙を送った。',
        reading: 'ははのたんじょうびに、かんしゃのきもちをこめててがきにてがみをおくった。',
        romaji: 'Haha no tanjoubi ni, kansha no kimochi wo komete tegaki no tegami wo okutta.',
        vietnamese: 'Nhân ngày sinh nhật mẹ, tôi đã viết một lá thư tay chan chứa lòng biết ơn và gửi cho mẹ.'
      },
      {
        type: 'figurative',
        label: 'Sắc thái cảm xúc (Nét chữ tay)',
        japanese: '手紙はメールと違って、文字の筆跡から書き手の温もりや真心が伝わってくる。',
        reading: 'てがみはメールとちがって、もじのひっせきからかきてのぬくもりやまごころがつたわってくる。',
        romaji: 'Tegami wa meeru to chigatte, moji no hisseki kara kakite no nukumori ya magokoro ga tsutawatte kuru.',
        vietnamese: 'Lá thư khác với email ở chỗ: qua từng nét mực chữ viết tay, người đọc cảm nhận được hơi ấm và tấm lòng chân thành của người gửi.'
      }
    ],
    relatedCollocations: ['手紙を書く (tegami wo kaku - viết thư)', '手紙を出す (tegami wo dasu - gửi thư)', '手紙を受け取る (tegami wo uketoru - nhận thư)', '絵手紙 (etegami)'],
    synonyms: ['書簡 (shokan - thư từ trang trọng)', '書状 (shojou)', '便り (tayori - thư từ, tin tức)'],
    antonyms: ['電子メール (denshi meeru - thư điện tử E-mail)'],
    senseiExplanation: 'GS. Yamato nhấn mạnh: Tuyệt đối không nhầm 手紙 (tegami - lá thư) với các cụm từ khác có chữ Thủ như 手を抜く (làm ẩu) hay 手を打つ (kịp thời xử lý). Trong tiếng Nhật, 手紙 là biểu tượng thiêng liêng của sự kết nối chân thành!'
  },
  {
    id: 'vocab_tokei',
    word: '時計',
    reading: 'とけい',
    furigana: '時[と] 計[けい]',
    romaji: 'tokei',
    hanViet: 'THỜI KẾ',
    level: 'N5',
    partOfSpeech: 'Danh từ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Đồng hồ (thiết bị đo và hiển thị thời gian nói chung, bao gồm cả đồng hồ đeo tay, đồng hồ treo tường, để bàn lẫn đồng hồ báo thức).',
    figurativeMeaning: 'Nhịp điệu thời gian, sự chính xác đúng giờ chuẩn mực (thành ngữ thời gian sinh học: 腹時計 - đồng hồ sinh học dạ dày nhắc giờ ăn cơm).',
    simpleMeaning: 'Đồng hồ',
    primaryMeaning: 'Đồng hồ (nghĩa chung bao quát cả đồng hồ đeo tay 腕時計, đồng hồ treo tường 掛け時計, đồng hồ để bàn 置き時計, đồng hồ báo thức 目覚まし時計; không bó hẹp riêng một loại nào).',
    meaningPoints: [
      '① Nghĩa chung thượng vị (Hypernym): Chỉ mọi loại công cụ đo thời gian nói chung (không được dịch bó hẹp là đồng hồ đeo tay)',
      '② BẪY JLPT KINH ĐIỂN: Đồng hồ đeo tay trong tiếng Nhật bắt buộc phải có chữ "cổ tay" là 腕時計 (udedokei), đồng hồ treo tường là 掛け時計 (kakedokei)',
      '③ Ẩn dụ sinh học đời sống: 腹時計 (haradokei - "đồng hồ dạ dày", cảm giác đói cồn cào tự nhận biết đã đến giữa trưa)'
    ],
    rootExpansion: [
      {
        word: '腕時計',
        reading: 'うでどけい',
        furigana: '腕[うで] 時計[どけい]',
        romaji: 'udedokei',
        meaning: 'Đồng hồ đeo tay (chuyên biệt đeo ở cổ tay)',
        relationType: 'Từ ghép'
      },
      {
        word: '掛け時計',
        reading: 'かけどけい',
        furigana: '掛[か]け 時計[どけい]',
        romaji: 'kakedokei',
        meaning: 'Đồng hồ treo tường',
        relationType: 'Từ ghép'
      },
      {
        word: '置き時計',
        reading: 'おきどけい',
        furigana: '置[お]き 時計[どけい]',
        romaji: 'okidokei',
        meaning: 'Đồng hồ để bàn, kệ sách',
        relationType: 'Từ ghép'
      },
      {
        word: '目覚まし時計',
        reading: 'めざましどけい',
        furigana: '目覚[めざ]まし 時計[どけい]',
        romaji: 'mezamashidokei',
        meaning: 'Đồng hồ báo thức',
        relationType: 'Từ ghép'
      },
      {
        word: '腹時計',
        reading: 'はらどけい',
        furigana: '腹[はら] 時計[どけい]',
        romaji: 'haradokei',
        meaning: 'Đồng hồ dạ dày (cảm giác đói bụng tự biết giờ ăn)',
        relationType: 'Nghĩa bóng'
      },
      {
        word: '砂時計',
        reading: 'すなどけい',
        furigana: '砂時計[すなどけい]',
        romaji: 'sunadokei',
        meaning: 'Đồng hồ cát đo thời gian',
        relationType: 'Từ ghép'
      },
      {
        word: '時計回り',
        reading: 'とけいまわり',
        furigana: '時計[とけい] 回[まわ]り',
        romaji: 'tokeimawari',
        meaning: 'Thuận chiều kim đồng hồ',
        relationType: 'Phái sinh'
      }
    ],
    nuanceAndContext: 'BẪY THI CỬ & GIAO TIẾP THỰC TẾ: Trong tiếng Nhật, 時計 là "Thượng vị từ" (từ mang nghĩa chung bao quát) cho tất cả các thiết bị đo thời gian. Tuyệt đối không dịch bó hẹp 時計 thành "đồng hồ đeo tay", vì khi muốn chỉ rõ đồng hồ đeo tay, người Nhật bắt buộc dùng cụm 腕時計 (udedokei).',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa chung (Mọi thiết bị đo thời gian)',
        japanese: '部屋の壁には掛け時計があり、机の上には置き時計、腕には腕時計をつけている。すべて時計の仲間だ。',
        reading: 'へやのかべにはかけどけいがあり、つくえのうえにはおきどけい、うでにはうでどけいをつけている。すべてとけいのなかまだ。',
        romaji: 'Heya no kabe ni wa kakedokei ga ari, tsukue no ue ni wa okidokei, ude ni wa udedokei wo tsukete iru. Subete tokei no nakama da.',
        vietnamese: 'Trên tường phòng có đồng hồ treo tường, trên bàn có đồng hồ để bàn, trên tay đeo đồng hồ đeo tay. Tất cả đều thuộc họ đồng hồ.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Đồng hồ sinh học dạ dày)',
        japanese: '時計を見なくても、お腹が空いてきたので「私の腹時計」はもう正午を知らせている。',
        reading: 'とけいをみなくても、おなかがすいてきたので「わたしのはらどけい」はもうしょうごをしらせている。',
        romaji: 'Tokei wo minakutemo, onaka ga suite kita node 「watashi no haradokei」 wa mou shougo wo shirasete iru.',
        vietnamese: 'Chẳng cần nhìn đồng hồ, bụng bắt đầu sôi réo rắt báo hiệu "đồng hồ dạ dày" của tôi đã chỉ đúng giữa trưa.'
      }
    ],
    relatedCollocations: ['時計を見る (tokei wo miru - xem giờ)', '時計を合わせる (tokei wo awaseru - chỉnh giờ)', '腕時計 (udedokei)', '時計回り (tokeimawari)'],
    synonyms: ['クロック (clock - đồng hồ để bàn/treo tường)', 'ウォッチ (watch - đồng hồ đeo tay)'],
    antonyms: ['反時計回り (hantokeimawari - ngược chiều kim đồng hồ)'],
    senseiExplanation: 'Giáo sư Yamato phân tích: Bài thi JLPT N5-N3 cực kỳ hay gài bẫy những từ có tính bao quát (Hypernym). Nếu bạn dịch 時計 là "đồng hồ đeo tay" thì khi gặp câu hỏi về 掛け時計 (đồng hồ treo tường) bạn sẽ bị rối loạn tư duy. Hãy nhớ: 時計 là NGHĨA CHUNG BAO QUÁT.'
  },
  {
    id: 'vocab_kasa',
    word: '傘',
    reading: 'かさ',
    furigana: '傘[かさ]',
    romaji: 'kasa',
    hanViet: 'TẢN',
    level: 'N5',
    partOfSpeech: 'Danh từ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Dù, ô (vật dụng có tán bằng vải hoặc nylon có khung gập để che mưa hoặc che nắng nói chung).',
    figurativeMeaning: 'Sự che chở, bảo bọc; hoặc nằm dưới trướng, dưới quyền kiểm soát, bảo hộ của một tổ chức/thực thể quyền lực lớn (thành ngữ: 傘下 - sanka, 傘に入る - kasa ni hairu).',
    simpleMeaning: 'Dù, ô',
    primaryMeaning: 'Dù, ô (nghĩa chung bao quát cả dù che mưa 雨傘 lẫn dù che nắng 日傘; nghĩa bóng: nằm dưới trướng, dưới sự bảo hộ của tập đoàn lớn 傘下 - sanka; không bó hẹp riêng một loại).',
    meaningPoints: [
      '① Nghĩa chung thượng vị (Hypernym): Dù, ô nói chung (bao gồm cả dù che mưa 雨傘 lẫn dù che nắng 日傘, không bị giới hạn vào một loại)',
      '② Nghĩa bóng & Ẩn dụ kinh tế: 傘下 (dưới trướng, công ty con dưới trướng tập đoàn mẹ)',
      '③ Quán dụng ngữ thường gặp: 傘をさす (bung dù), 傘をたたむ (gập dù lại)'
    ],
    rootExpansion: [
      {
        word: '雨傘',
        reading: 'あまがさ',
        furigana: '雨傘[あまがさ]',
        romaji: 'amagasa',
        meaning: 'Cây dù chuyên đi mưa',
        relationType: 'Từ ghép'
      },
      {
        word: '日傘',
        reading: 'ひがさ',
        furigana: '日傘[ひがさ]',
        romaji: 'higasa',
        meaning: 'Cây dù che nắng (chống tia cực tím)',
        relationType: 'Từ ghép'
      },
      {
        word: '折りたたみ傘',
        reading: 'おりたたみがさ',
        furigana: '折[お]りたたみ 傘[がさ]',
        romaji: 'oritatamikasa',
        meaning: 'Cây dù gập nhỏ gọn bỏ trong túi xách',
        relationType: 'Từ ghép'
      },
      {
        word: '傘下',
        reading: 'さんか',
        furigana: '傘下[さんか]',
        romaji: 'sanka',
        meaning: 'Dưới trướng bảo hộ của tập đoàn mẹ (傘下に入る)',
        relationType: 'Nghĩa bóng'
      },
      {
        word: '置き傘',
        reading: 'おきがさ',
        furigana: '置[お]き 傘[がさ]',
        romaji: 'okigasa',
        meaning: 'Chiếc dù để sẵn ở trường/công ty phòng trời mưa',
        relationType: 'Phái sinh'
      },
      {
        word: '傘立て',
        reading: 'かさたて',
        furigana: '傘立[かさた]て',
        romaji: 'kasatate',
        meaning: 'Ống/giá cắm dù ở cửa ra vào',
        relationType: 'Từ ghép'
      },
      {
        word: '相合傘',
        reading: 'あいあいがさ',
        furigana: '相合傘[あいあいがさ]',
        romaji: 'aiaigasa',
        meaning: 'Đi chung một chiếc dù (biểu tượng lãng mạn tình yêu)',
        relationType: 'Quán dụng ngữ'
      }
    ],
    nuanceAndContext: 'BẪY THI CỬ & THỰC TẾ: 傘 là nghĩa chung bao quát. Nếu chỉ dịch "ô đi mưa" sẽ sai khi gặp 日傘 (dù đi nắng). Ngoài ra trong tin tức thời sự kinh tế JLPT N2-N1, 傘下 (dưới trướng tập đoàn mẹ) là ẩn dụ rất hay xuất hiện.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Che mưa nắng)',
        japanese: '雨が降ってきたので、鞄から折りたたみ傘を取り出してさした。',
        reading: 'あめがふってきたので、かばんからおりたたみがさをとりだしてさした。',
        romaji: 'Ame ga futte kita node, kaban kara oritatamikasa wo toridashite sashita.',
        vietnamese: 'Trời bắt đầu đổ mưa nên tôi đã lấy chiếc dù gấp từ trong cặp ra để che.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Dưới trướng bảo hộ)',
        japanese: 'その新興ベンチャー企業は、大手ITグループの傘下に入って事業を拡大した。',
        reading: 'そのしんこうベンチャーきぎょうは、おおてITグループのさんかにはいってじぎょうをかくだいした。',
        romaji: 'Sono shinkou benchaa kigyou wa, oote IT guruupu no sanka ni haitte jigyou wo kakudai shita.',
        vietnamese: 'Công ty khởi nghiệp non trẻ đó đã gia nhập dưới trướng của tập đoàn IT lớn để mở rộng quy mô kinh doanh.'
      }
    ],
    relatedCollocations: ['傘をさす (kasa wo sasu - che dù)', '傘下 (sanka - dưới trướng)', '日傘 (higasa - dù che nắng)', '置き傘 (okigasa - dù để sẵn ở công ty/trường)'],
    synonyms: ['雨具 (amagu - đồ đi mưa)', 'アンブレラ (umbrella)'],
    antonyms: ['雨ざらし (amazarashi - dãi dầu mưa gió không che chắn)'],
    senseiExplanation: 'Cây dù không chỉ bảo vệ thân thể khỏi ướt át giông bão, mà trong cấu trúc xã hội Nhật, "chiếc dù lớn" còn tượng trưng cho ô dù bảo bọc quyền lực và an sinh.'
  },
  {
    id: 'vocab_gakusei',
    word: '学生',
    reading: 'がくせい',
    furigana: '学[がく] 生[せい]',
    romaji: 'gakusei',
    hanViet: 'HỌC SINH',
    level: 'N5',
    partOfSpeech: 'Danh từ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Sinh viên, người theo học tại các trường đại học, cao đẳng hoặc trung cấp chuyên nghiệp.',
    figurativeMeaning: 'Người đang ở giai đoạn rèn luyện tri thức tuổi trẻ, chưa va chạm những toan tính thương trường (cụm từ: 学生気分 - tư duy ấu trĩ học trò chưa đủ độ chín chắn của người đi làm).',
    simpleMeaning: 'Sinh viên',
    primaryMeaning: 'Sinh viên (nghĩa chung chuẩn xác chỉ người theo học bậc đại học, cao đẳng, trung cấp; phân biệt triệt để với 生徒 là học sinh phổ thông cấp 2-3 và 児童 là học sinh tiểu học).',
    meaningPoints: [
      '① Phân biệt chuẩn xác ngôn ngữ học: 学生 (sinh viên đại học/cao đẳng), 生徒 (học sinh cấp 2-3), 児童 (học sinh tiểu học)',
      '② BẪY KINH ĐIỂN JLPT: Trong tiếng Việt "học sinh" chỉ học sinh phổ thông, nhưng chữ Hán 学生 (がくせい) trong tiếng Nhật CHỈ DÙNG CHO SINH VIÊN ĐẠI HỌC/CAO ĐẲNG',
      '③ Nghĩa bóng công sở: 学生気分 (tác phong sinh viên, chưa đủ chuyên nghiệp, thiếu trách nhiệm của người trưởng thành)'
    ],
    rootExpansion: [
      {
        word: '大学生',
        reading: 'だいがくせい',
        furigana: '大学[だいがく] 生[せい]',
        romaji: 'daigakusei',
        meaning: 'Sinh viên đại học chính quy',
        relationType: 'Từ ghép'
      },
      {
        word: '留学生',
        reading: 'りゅうがくせい',
        furigana: '留学[りゅうがく] 生[せい]',
        romaji: 'ryuugakusei',
        meaning: 'Du học sinh nước ngoài',
        relationType: 'Từ ghép'
      },
      {
        word: '大学院生',
        reading: 'だいがくいんせい',
        furigana: '大学院[だいがくいん] 生[せい]',
        romaji: 'daigakuinsei',
        meaning: 'Học viên cao học, thạc sĩ, nghiên cứu sinh tiến sĩ',
        relationType: 'Từ ghép'
      },
      {
        word: '学生証',
        reading: 'がくせいしょう',
        furigana: '学生[がくせい] 証[しょう]',
        romaji: 'gakuseishou',
        meaning: 'Thẻ sinh viên',
        relationType: 'Từ ghép'
      },
      {
        word: '学割 / 学生割引',
        reading: 'がくわり',
        furigana: '学割[がくわり]',
        romaji: 'gakuwari',
        meaning: 'Chế độ ưu đãi giảm giá vé tàu xe, dịch vụ cho học sinh sinh viên',
        relationType: 'Phái sinh'
      },
      {
        word: '学生時代',
        reading: 'がくせいじだい',
        furigana: '学生[がくせい] 時代[じだい]',
        romaji: 'gakusei jidai',
        meaning: 'Quãng đời sinh viên thanh xuân',
        relationType: 'Phái sinh'
      },
      {
        word: '学生気分',
        reading: 'がくせいきぶん',
        furigana: '学生[がくせい] 気分[きぶん]',
        romaji: 'gakusei kibun',
        meaning: 'Tác phong sinh viên thiếu chín chắn, vô tư quá mức nơi công sở',
        relationType: 'Nghĩa bóng'
      }
    ],
    nuanceAndContext: 'BẪY KINH ĐIỂN CỦA ĐỀ THI JLPT: Người Việt rất hay nhầm 学生 là "học sinh". Trong hệ thống giáo dục Nhật Bản, học sinh tiểu học là 児童 (Jidou), học sinh THCS và THPT là 生徒 (Seito), còn 学生 (Gakusei) CHỈ DÙNG CHO SINH VIÊN ĐẠI HỌC VÀ CAO ĐẲNG. Đề thi chọn 学生 cho học sinh tiểu học là SAI NGHIÊM TRỌNG!',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Sinh viên đại học)',
        japanese: '彼は東京大学で先端AI技術を専攻している優秀な学生だ。',
        reading: 'かれはとうきょうだいがくでせんたんAIぎじゅつをせんこうしているゆうしゅうながくせいだ。',
        romaji: 'Kare wa Toukyou Daigaku de sentan AI gijutsu wo senkou shite iru yuushuu na gakusei da.',
        vietnamese: 'Anh ấy là một sinh viên ưu tú đang theo học chuyên ngành công nghệ AI tiên tiến tại Đại học Tokyo.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Tác phong sinh viên thiếu chín chắn)',
        japanese: '入社してからも学生気分のままでいると、ビジネスの現場では通用しない。',
        reading: 'にゅうしゃしてからもがくせいきぶんのままでいると、ビジネスのげんばではつうようしない。',
        romaji: 'Nyuusha shite kara mo gakusei kibun no mama de iru to, bijinesu no gemba dewa tsuuyou shinai.',
        vietnamese: 'Sau khi vào công ty mà vẫn giữ nguyên thói quen tác phong sinh viên vô tư, thì không thể tồn tại nổi trong môi trường thương trường.'
      }
    ],
    relatedCollocations: ['学生証 (gakuseishou - thẻ sinh viên)', '学生気分 (gakusei kibun - tác phong sinh viên)', '留学生 (ryuugakusei - du học sinh)', '社会人 (shakaijin - người đi làm / người trưởng thành)'],
    synonyms: ['大学生 (daigakusei - sinh viên đại học)', '学徒 (gakuto)'],
    antonyms: ['社会人 (shakaijin - người đã đi làm, tự lập ngoài xã hội)'],
    senseiExplanation: 'Giáo sư Yamato lưu ý: Trong tiếng Nhật, người đang học đại học/cao đẳng mới là 学生, và khi tốt nghiệp họ bước sang thế giới của 社会人 (người của xã hội). Không được dịch nhầm thành học sinh phổ thông.'
  },
  {
    id: 'vocab_kaban',
    word: '鞄',
    reading: 'かばん',
    furigana: '鞄[かばん]',
    romaji: 'kaban',
    hanViet: 'BẠC (HOẶC CA BẢN)',
    level: 'N5',
    partOfSpeech: 'Danh từ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Cặp, túi (vật dụng bằng vải, da hoặc nylon có quai cầm dùng để chứa đựng tài liệu, sách vở, đồ dùng cá nhân nói chung).',
    figurativeMeaning: 'Vật bất ly thân gắn liền với hình tượng người đi làm (Shakaijin); nghĩa bóng "鞄持ち" (kabanmochi) chỉ người xách cặp theo sau sếp, người học việc thân cận hoặc trợ lý đắc lực.',
    simpleMeaning: 'Cặp, túi',
    primaryMeaning: 'Cặp, túi (nghĩa chung bao quát mọi vật dụng chứa đồ như cặp đi làm 通勤鞄, cặp đi học 通学鞄, cặp chống gù ランドセル, túi xách tay, va li du lịch; không bó hẹp riêng một loại).',
    meaningPoints: [
      '① Nghĩa chung thượng vị (Hypernym): Cặp, túi nói chung (không chỉ riêng túi xách nữ hay riêng cặp da nam mà bao hàm toàn bộ vật dụng chứa đồ có quai cầm)',
      '② BẪY JLPT: Khi muốn nói riêng túi xách tay thì dùng 手提げ鞄, cặp chống gù học sinh tiểu học là ランドセル, cặp đi làm là 通勤鞄',
      '③ Văn hóa công sở Nhật: 鞄持ち (kabanmochi - người tùy tùng xách cặp cho chính khách/giám đốc để học việc)'
    ],
    rootExpansion: [
      {
        word: '手提げ鞄',
        reading: 'てさげかばん',
        furigana: '手提[てさ]げ 鞄[かばん]',
        romaji: 'tesage kaban',
        meaning: 'Túi xách tay',
        relationType: 'Từ ghép'
      },
      {
        word: '通学鞄',
        reading: 'つうがくかばん',
        furigana: '通学[つうがく] 鞄[かばん]',
        romaji: 'tsuugaku kaban',
        meaning: 'Cặp sách đi học của học sinh sinh viên',
        relationType: 'Từ ghép'
      },
      {
        word: 'ランドセル',
        reading: 'ランドセル',
        furigana: 'ランドセル',
        romaji: 'randoseru',
        meaning: 'Cặp chống gù truyền thống của học sinh tiểu học Nhật',
        relationType: 'Phái sinh'
      },
      {
        word: '革鞄',
        reading: 'かわかばん',
        furigana: '革[かわ] 鞄[かばん]',
        romaji: 'kawakaban',
        meaning: 'Cặp túi bằng chất liệu da cao cấp',
        relationType: 'Từ ghép'
      },
      {
        word: '旅行鞄',
        reading: 'りょこうかばん',
        furigana: '旅行[りょこう] 鞄[かばん]',
        romaji: 'ryokou kaban',
        meaning: 'Va li, túi xách du lịch',
        relationType: 'Từ ghép'
      },
      {
        word: '鞄持ち',
        reading: 'かばんもち',
        furigana: '鞄[かばん] 持[も]ち',
        romaji: 'kabanmochi',
        meaning: 'Người xách cặp cho sếp, tùy tùng học việc thân cận',
        relationType: 'Nghĩa bóng'
      },
      {
        word: '鞄に詰める',
        reading: 'かばんにつめる',
        furigana: '鞄[かばん]に 詰[つ]める',
        romaji: 'kaban ni tsumeru',
        meaning: 'Nhồi nhét đầy đồ vào túi xách',
        relationType: 'Quán dụng ngữ'
      }
    ],
    nuanceAndContext: 'BẪY THI CỬ: 鞄 là nghĩa chung cho cặp sách, túi xách, va li. Không dịch bó hẹp chỉ riêng "túi xách nữ" hay riêng "cặp da nam". Trong văn hóa công sở, chiếc cặp da là biểu tượng của tinh thần kỷ luật của người đi làm.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Cặp túi hàng ngày)',
        japanese: '毎朝、ノートパソコンと筆記用具を鞄に入れて出勤している。',
        reading: 'まいあさ、ノートパソコンとひっきようぐをかばんにいれてしゅっきんしている。',
        romaji: 'Maiasa, nootopasokon to hikkiyougu wo kaban ni irete shukkin shite iru.',
        vietnamese: 'Mỗi sáng, tôi đều bỏ máy tính xách tay và đồ dùng viết vào cặp rồi đi làm.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Văn hóa công sở Kabanmochi)',
        japanese: '若手社員時代、社長の鞄持ちとして同行し、一流の商談作法を間近で学んだ。',
        reading: 'わかてしゃいんじだい、しゃちょうのかばんもちとしてどうこうし、いちりゅうのしょうだんさほうをまぢかでまなんだ。',
        romaji: 'Wakate shain jidai, shachou no kabanmochi toshite doukou shi, ichiryuu no shoudan sahou wo majika de mananda.',
        vietnamese: 'Thời còn là nhân viên trẻ, tôi đã tháp tùng làm người xách cặp cho giám đốc và học hỏi được tác phong đàm phán thương mại đỉnh cao ngay trước mắt.'
      }
    ],
    relatedCollocations: ['鞄を開ける (kaban wo akeru - mở cặp)', '鞄を持つ (kaban wo motsu - xách túi)', '鞄持ち (kabanmochi)'],
    synonyms: ['バッグ (baggu - túi xách)', 'カバン'],
    antonyms: ['手ぶら (tebura - tay không, không mang theo túi xách gì)'],
    senseiExplanation: 'Giáo sư Yamato phân tích: Cần ghi nhớ 鞄 là nghĩa chung bao hàm mọi loại cặp, túi, bọc hành lý. "Kabanmochi" (người xách cặp) xuất phát từ các chính trị gia và doanh nhân lớn của Nhật Bản; là vị trí học việc thân cận đáng tự hào.'
  },
  {
    id: 'vocab_haraguroi',
    word: '腹が黒い',
    reading: 'はらがくろい',
    furigana: '腹[はら]が 黒[くろ]い',
    romaji: 'hara ga kuroi',
    hanViet: 'PHÚC HẮC',
    level: 'N2',
    partOfSpeech: 'Tính từ đuôi い / Quán dụng ngữ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Bụng có màu đen, lục phủ ngũ tạng bên trong sẫm màu.',
    figurativeMeaning: 'Lòng dạ hiểm độc, nham hiểm, mưu mô xảo quyệt; bên ngoài tỏ vẻ tử tế tươi cười nhưng trong lòng luôn toan tính vụ lợi hoặc hãm hại người khác.',
    simpleMeaning: 'Lòng dạ nham hiểm',
    primaryMeaning: 'Tâm địa xấu xa, nham hiểm, mưu mô xảo quyệt; bên ngoài tỏ vẻ tử tế tươi cười nhưng thâm tâm luôn toan tính vụ lợi hoặc mưu hại người khác.',
    meaningPoints: [
      '① Tâm địa xảo quyệt, nham hiểm khó lường (Phúc hắc)',
      '② Khẩu phật tâm xà: Mặt ngoài hòa nhã lịch thiệp nhưng bên trong mưu tính hãm hại người khác',
      '③ Tính cách tiêu cực bị bài trừ trong môi trường làm việc tập thể Nhật Bản'
    ],
    rootExpansion: [
      {
        word: '腹黒い',
        reading: 'はらぐろい',
        furigana: '腹黒[はらぐろ]い',
        romaji: 'haraguroi',
        meaning: 'Nham hiểm, tâm địa đen tối xảo quyệt',
        relationType: 'Phái sinh'
      },
      {
        word: '腹を割る',
        reading: 'はらをわる',
        furigana: '腹[はら]を 割[わ]る',
        romaji: 'hara wo waru',
        meaning: 'Trải lòng thật, nói chuyện ruột gan không giấu giếm',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '腹が立つ',
        reading: 'はらがたつ',
        furigana: '腹[はら]が 立[た]つ',
        romaji: 'hara ga tatsu',
        meaning: 'Tức giận sôi máu, bực bội trong lòng',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '腹を決める',
        reading: 'はらをきめる',
        furigana: '腹[はら]を 決[き]める',
        romaji: 'hara wo kimeru',
        meaning: 'Hạ quyết tâm dứt khoát, chuẩn bị tinh thần đón nhận thử thách',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '太っ腹',
        reading: 'ふとっぱら',
        furigana: '太[ふと]っ 腹[ぱら]',
        romaji: 'futoppara',
        meaning: 'Hào phóng, đại lượng, rộng rãi',
        relationType: 'Nghĩa bóng'
      },
      {
        word: '腹八分目',
        reading: 'はらはちぶんめ',
        furigana: '腹八分目[はらはちぶんめ]',
        romaji: 'hara hachibunme',
        meaning: 'Ăn no tám phần mười (bí quyết dưỡng sinh sống thọ người Nhật)',
        relationType: 'Thành ngữ'
      }
    ],
    nuanceAndContext: 'Thường dùng để phán xét tính cách tiêu cực sau lưng một ai đó. Tuyệt đối không dùng trực tiếp trước mặt người đối diện hay cấp trên.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Hình tượng gốc)',
        japanese: '魚をさばいたら、内臓の膜が黒かった。',
        reading: 'さかなをさばいたら、ないぞうのまくがくろかった。',
        romaji: 'Sakana wo sabaitara, naizou no maku ga kurokatta.',
        vietnamese: 'Khi mổ cá ra thì thấy lớp màng nội tạng bên trong màu đen kịt.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Ứng dụng thực tế)',
        japanese: '彼はいつも笑顔で親切そうに見えるが、実は腹が黒い男だ。',
        reading: 'かれはいつもえがおでしんせつそうにみえるが、じつははらがくろいおとこだ。',
        romaji: 'Kare wa itsumo egao de shinsetsusou ni mieru ga, jitsu wa hara ga kuroi otoko da.',
        vietnamese: 'Anh ta lúc nào cũng tươi cười có vẻ tốt bụng, nhưng thực chất là một kẻ lòng dạ đen tối nham hiểm.'
      }
    ],
    relatedCollocations: ['腹黒い (haraguroi)', '腹を割る (hara wo waru - trải lòng thật)', '腹が立つ (hara ga tatsu - tức giận)'],
    synonyms: ['陰険 (inken - âm hiểm)', '悪だくみ (warudakumi - mưu toan xấu)'],
    antonyms: ['腹が白い (hara ga shiroi - tâm địa trong sáng)', '裏表がない (uraomote ga nai - trước sau như một)'],
    senseiExplanation: 'Người Nhật thời xưa tin rằng bụng (腹 - hara) chính là nơi ngự trị của tâm can, linh hồn và ý chí thật (Honne). Do đó khi bụng bị "đen" nghĩa là tâm tính đã bị ô uế, toan tính xấu xa.'
  },
  {
    id: 'vocab_kubi_ni_suru',
    word: '首にする',
    reading: 'くびにする',
    furigana: '首[くび]にする',
    romaji: 'kubi ni suru',
    hanViet: 'THỦ (TRẢM THỦ)',
    level: 'N3',
    partOfSpeech: 'Cụm động từ (Nhóm 3)',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Chém đầu, chặt đầu phạm nhân thời phong kiến.',
    figurativeMeaning: 'Sa thải, đuổi việc, tống khứ nhân viên ra khỏi công ty. Dạng bị động: 首になる (kubi ni naru - bị đuổi việc).',
    simpleMeaning: 'Đuổi việc',
    primaryMeaning: 'Sa thải, đuổi việc, cho thôi việc một nhân viên (khẩu ngữ trực diện; dạng bị động: 首になる - bị mất việc).',
    meaningPoints: [
      '① Chấm dứt hợp đồng lao động đột ngột hoặc đuổi việc do vi phạm, năng lực kém',
      '② Dạng tự thân/bị động 首になる (kubi ni naru) = "bị sa thải, bay màu"',
      '③ Văn phong khẩu ngữ công sở, phim ảnh (công văn trang trọng dùng 解雇する)'
    ],
    nuanceAndContext: 'Khẩu ngữ trực diện, sắc bén trong đời sống hàng ngày hoặc phim ảnh. Trong thông báo công văn trang trọng, người Nhật sẽ thay bằng 解雇する (kaiko suru) hoặc 契約解除 (keiyaku kaijo).',
    examples: [
      {
        type: 'literal',
        label: 'Nguồn gốc nghĩa đen',
        japanese: '戦国時代、武士は討ち取った敵の首を切り落とした。',
        reading: 'せんごくじだい、ぶしはうちとったてきのくびをきりおとした。',
        romaji: 'Sengoku jidai, bushi wa uchitotta teki no kubi wo kiriotoshita.',
        vietnamese: 'Thời Chiến Quốc, các samurai chém đầu kẻ địch đã tiêu diệt để lấy công lao.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Công sở đời thường)',
        japanese: '度重なる遅刻と勤務怠慢のせいで、彼はついに社長から首にされた。',
        reading: 'たびかさなるちこくときんむたいまんのせいで、かれはついにしゃちょうからくびにされた。',
        romaji: 'Tabikasanaru chikoku to kimmu taiman no sei de, kare wa tsui ni shachou kara kubi ni sareta.',
        vietnamese: 'Vì liên tục đi muộn và lười biếng bê trễ công việc, anh ấy cuối cùng đã bị giám đốc sa thải.'
      }
    ],
    relatedCollocations: ['首になる (kubi ni naru - bị đuổi việc)', '首が回らない (kubi ga mawaranai - nợ nần ngập đầu)', '首を長くして待つ (kubi wo nagaku shite matsu - dài cổ ngóng trông)'],
    synonyms: ['解雇する (kaiko suru)', 'お払い箱にする (oharaibako ni suru)'],
    antonyms: ['採用する (saiyou suru - tuyển dụng)', '雇う (yatou - thuê mướn)'],
    senseiExplanation: 'Xuất phát từ hình phạt chém đầu thời Edo: Mất đầu nghĩa là chấm dứt sinh mạng. Trong công sở hiện đại, mất việc làm đối với người trụ cột gia đình cũng nghiêm trọng như mất đi nguồn sống.'
  },
  {
    id: 'vocab_ashi_wo_hipparu',
    word: '足を引っ張る',
    reading: 'あしをひっぱる',
    furigana: '足[あし]を 引[ひ]っ 張[ぱ]る',
    romaji: 'ashi wo hipparu',
    hanViet: 'TÚC DẪN TRƯƠNG',
    level: 'N2',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Dùng tay nắm lấy chân ai đó kéo lại phía sau.',
    figurativeMeaning: 'Cản trở, ngáng đường, làm vướng chân gây trì trệ bước tiến của đồng đội hoặc tổ chức.',
    simpleMeaning: 'Ngáng đường, cản trở',
    primaryMeaning: 'Ngáng đường, cản trở bước tiến hoặc làm liên lụy đến thành tích chung của đồng đội, tập thể.',
    meaningPoints: [
      '① Gây trở ngại cho sự phát triển hoặc thành công của người khác',
      '② Tự trách mình làm vướng chân tập thể (チームの足を引っ張る)',
      '③ Rất hay xuất hiện trong dự án nhóm và thể thao đồng đội'
    ],
    nuanceAndContext: 'Dùng nhiều trong thể thao đồng đội, dự án công ty hoặc khi một cá nhân tự trách mình làm liên lụy đến kết quả chung của cả nhóm.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: '川で溺れそうになったとき、友人に足を引っ張られて助かった。',
        reading: 'かわでおぼれそうになったとき、ゆうじんにあしをひっぱられてたすかった。',
        romaji: 'Kawa de oboresou ni natta toki, yuujin ni ashi wo hippararete tasukatta.',
        vietnamese: 'Khi suýt bị đuối nước ở bờ sông, tôi được bạn nắm lấy chân kéo lại nên đã thoát nạn.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Làm việc nhóm)',
        japanese: 'チームの足を引っ張らないように、自分の担当業務は期日までに完璧に仕上げます。',
        reading: 'チームのあしをひっぱらないように、じぶんのたんとうぎょうむはきじつまでにかんぺきにしあげます。',
        romaji: 'Chiimu no ashi wo hipparanai you ni, jibun no tantou gyoumu wa kijitsu made ni kampeki ni shiagemasu.',
        vietnamese: 'Để không làm vướng chân gây cản trở cho cả đội, tôi sẽ hoàn thành xuất sắc công việc được giao trước hạn.'
      }
    ],
    relatedCollocations: ['足が出る (ashi ga deru - bội chi, thâm hụt)', '足がつく (ashi ga tsuku - bị lộ manh mối)'],
    synonyms: ['妨害する (bougai suru - cản trở)', '邪魔をする (jama wo suru)'],
    antonyms: ['後押しする (atooshi suru - hậu thuẫn, đẩy mạnh)', '協力する (kyouryoku suru)'],
    senseiExplanation: 'Hình tượng một người đang nỗ lực leo lên dốc cao nhưng bị người phía dưới nắm chân kéo giật lại, khiến cả tập thể có nguy cơ ngã theo.'
  },
  {
    id: 'vocab_kao_ga_hiroi',
    word: '顔が広い',
    reading: 'かおがひろい',
    furigana: '顔[かお]が 広[ひろ]い',
    romaji: 'kao ga hiroi',
    hanViet: 'NHAN QUẢNG',
    level: 'N3',
    partOfSpeech: 'Tính từ đuôi い / Quán dụng ngữ',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Khuôn mặt to lớn, có diện tích bề ngang rộng.',
    figurativeMeaning: 'Giao thiệp rộng, quen biết nhiều người có tầm ảnh hưởng trong xã hội, mối quan hệ bao quát.',
    simpleMeaning: 'Quen biết rộng',
    primaryMeaning: 'Có mối quan hệ xã hội sâu rộng, quen biết nhiều nhân vật có tầm ảnh hưởng trong giới kinh doanh hoặc xã hội.',
    meaningPoints: [
      '① Giao thiệp rộng rãi, có mạng lưới quan hệ phong phú (Jinmyaku)',
      '② Có tiếng nói, uy tín cao và được nhiều người nể trọng (顔が利く)',
      '③ Thường dùng như lời khen ngợi kỹ năng networking xuất sắc của đối tác'
    ],
    nuanceAndContext: 'Lời khen ngợi tích cực về năng lực kết nối (networking) và uy tín xã hội của một người trong công việc kinh doanh.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: '丸顔で額が大きい人は、顔が広く見える。',
        reading: 'まるがおでひたいがおおきいひとは、かおがひろくみえる。',
        romaji: 'Marugao de hitai ga ookii hito wa, kao ga hiroku mieru.',
        vietnamese: 'Người mặt tròn có vầng trán cao thì nhìn khuôn mặt trông khá to rộng.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Xã giao & Kinh doanh)',
        japanese: '田中部長は政財界に顔が広く、困ったときに頼りになる。',
        reading: 'たなかぶちょうはせいざいかいにかおがひろく、こまったときにたよりになる。',
        romaji: 'Tanaka buchou wa seizaikai ni kao ga hiroku, komatta toki ni tayori ni naru.',
        vietnamese: 'Trưởng phòng Tanaka quen biết rất rộng trong giới chính trị và kinh doanh, mỗi khi gặp khó khăn đều rất đáng tin cậy.'
      }
    ],
    relatedCollocations: ['顔をつぶす (kao wo tsubusu - làm mất mặt)', '顔が利く (kao ga kiku - có tiếng nói uy tín)', '顔を立てる (kao wo tateru - giữ thể diện)'],
    synonyms: ['人脈が豊富 (jinmyaku ga houfu - mạng lưới quan hệ phong phú)', '知己が多い (chiki ga ooi)'],
    antonyms: ['顔が狭い (ít dùng)', '世間知らず (seken shirazu - ngây thơ chưa biết việc đời)'],
    senseiExplanation: 'Người đi nhiều nơi, gặp gỡ nhiều người thì "khuôn mặt" của họ xuất hiện ở khắp mọi lĩnh vực, tạo cảm giác gương mặt họ lan tỏa rộng lớn trong xã hội.'
  },
  {
    id: 'vocab_te_wo_nuku',
    word: '手を抜く',
    reading: 'てをぬく',
    furigana: '手[て]を 抜[ぬ]く',
    romaji: 'te wo nuku',
    hanViet: 'THỦ BẠT',
    level: 'N2',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Rút tay ra khỏi một khe hở hoặc túi áo.',
    figurativeMeaning: 'Làm việc cẩu thả, qua loa tắc trách, bớt xén công đoạn cần thiết để tiết kiệm thời gian hoặc công sức.',
    simpleMeaning: 'Làm ẩu',
    primaryMeaning: 'Làm việc cẩu thả, bớt xén công đoạn, làm qua loa đối phó thiếu trách nhiệm.',
    meaningPoints: [
      '① Cắt xén quy trình chất lượng, làm ẩu để bớt tốn công sức',
      '② Trái ngược hoàn toàn với tinh thần Kaizen và Monozukuri của người Nhật',
      '③ Cụm từ hay gặp trong công sở: 手抜き工事 (thi công ẩu), 手を抜かずに (không được làm ẩu)'
    ],
    nuanceAndContext: 'Mang tính chỉ trích nghiêm khắc đối với tác phong làm việc, đặc biệt cấm kỵ trong văn hóa chất lượng (Monozukuri / Kaizen) của người Nhật.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: '寒かったので、ポケットから手を抜いて手袋をはめた。',
        reading: 'さむかったので、ポケットからてをぬいててぶくろをはめた。',
        romaji: 'Samukatta node, poketto kara te wo nuite tebukuro wo hameta.',
        vietnamese: 'Vì trời lạnh nên tôi rút tay ra khỏi túi áo để đeo găng tay vào.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Chất lượng công việc)',
        japanese: '見えない部分だからといって手を抜くと、後で必ず重大な欠陥につながる。',
        reading: 'みえないぶぶんだからといっててをぬくと、あとでかならずじゅうだいなけっかんにつながる。',
        romaji: 'Mienai bubun dakara to itte te wo nuku to, ato de kanarazu juudai na kekkan ni tsunagaru.',
        vietnamese: 'Dù là chi tiết không nhìn thấy được mà ta làm việc qua loa bớt xén thì sau này nhất định sẽ dẫn đến lỗi nghiêm trọng.'
      }
    ],
    relatedCollocations: ['手抜き工事 (tenuki kouji - công trình thi công ẩu, rút ruột)', '手を入れる (te wo ireru - chỉnh sửa hoàn thiện)'],
    synonyms: ['手を省く (te wo habuku)', 'いい加減にする (iikagen ni suru)', '怠慢 (taiman)'],
    antonyms: ['丹精を込める (tansei wo komeru - dồn hết tâm huyết)', '手塩にかける (teshio ni kakeru)'],
    senseiExplanation: 'Trong nghề mộc truyền thống Nhật, từng chiếc mộng nối cần nhiều bước đẽo gọt. "Rút bớt bàn tay" (bỏ qua một công đoạn then chốt) sẽ khiến cả căn nhà bị lung lay khi có động đất.'
  },
  {
    id: 'vocab_amai',
    word: '甘い',
    reading: 'あまい',
    furigana: '甘[あま]い',
    romaji: 'amai',
    hanViet: 'CAM (VỊ NGỌT)',
    level: 'N4',
    partOfSpeech: 'Tính từ đuôi い',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Vị ngọt của đường, mật ong hay bánh kẹo kẹo ngọt.',
    figurativeMeaning: '1. Ngây thơ, quá dễ dãi, chủ quan thiếu cảnh giác ("Nghĩ đời đơn giản quá"). 2. Nuông chiều con cái quá mức. 3. Đánh giá quá lỏng lẻo.',
    simpleMeaning: 'Ngọt; Ngây thơ',
    primaryMeaning: 'Có vị ngọt (vị giác); Suy nghĩ ngây thơ, chủ quan thiếu chín chắn; Nuông chiều dễ dãi; Đánh giá lỏng lẻo.',
    meaningPoints: [
      '① Vị ngọt của thực phẩm (mật ong, trái cây chín, bánh kẹo)',
      '② Suy nghĩ ngây thơ, chủ quan thiếu chín chắn (考えが甘い - Đánh giá mọi chuyện quá màu hồng)',
      '③ Nuông chiều, thiếu nghiêm khắc với người khác (子供に甘い - Chiều chuộng con cái quá mức)',
      '④ Dự toán lỏng lẻo, đánh giá thiếu khắt khe (見通しが甘い, 査定が甘い)'
    ],
    nuanceAndContext: 'Cực kỳ phổ biến trong đề thi JLPT N3-N2 ở phần tìm câu sử dụng đúng từ. Một từ quen thuộc cấp N5 nhưng mang hàm ý chỉ trích tư duy thiếu chín chắn.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Vị giác)',
        japanese: 'この完熟メロンは果汁たっぷりでとても甘い。',
        reading: 'このかんじゅくメロンはかじゅうたっぷりでとてもあまい。',
        romaji: 'Kono kanjuku meron wa kajyuu tappuri de totemo amai.',
        vietnamese: 'Quả dưa lưới chín mọng này chứa rất nhiều nước và có vị ngọt đậm đà.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Suy nghĩ ngây thơ, chủ quan)',
        japanese: '「試験前日に徹夜すれば合格できる」なんて、考えが甘いよ。',
        reading: '「しけんぜんじつにてつやすればごうかくできる」なんて、かんがえがあまいよ。',
        romaji: '「Shiken zenjitsu ni tetsuya sureba goukaku dekiru」 nante, kangae ga amai yo.',
        vietnamese: 'Nghĩ rằng "chỉ cần thức trắng đêm trước ngày thi là đỗ được" thì suy nghĩ của bạn quá ngây thơ chủ quan rồi đấy!'
      }
    ],
    relatedCollocations: ['考えが甘い (kangae ga amai - suy nghĩ ngây thơ)', '見通しが甘い (mitooshi ga amai - dự đoán quá màu hồng)', '子供に甘い (kodomo ni amai - chiều chuộng con)'],
    synonyms: ['楽観的すぎる (rakkanteki sugiru - quá lạc quan tếu)', '寛大すぎる (kandai sugiru)'],
    antonyms: ['辛い (karai - cay / gay gắt, khắt khe)', '厳しい (kibishii - nghiêm khắc)'],
    senseiExplanation: 'Cái ngọt ngào dễ chịu khiến con người mất đi sự đề phòng và kỷ luật. Vì vậy, "Amai" trong tư duy phản ánh trạng thái thiếu nghiêm khắc với bản thân.'
  },
  {
    id: 'vocab_shikii_ga_takai',
    word: '敷居が高い',
    reading: 'しきいがたかい',
    furigana: '敷居[しきい]が 高[たか]い',
    romaji: 'shikii ga takai',
    hanViet: 'PHU CƯ CAO',
    level: 'N1',
    partOfSpeech: 'Quán dụng ngữ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Thanh gỗ chắn ngang bậu cửa nhà truyền thống bị làm quá cao, khó bước qua.',
    figurativeMeaning: 'Cảm thấy e ngại, ngượng ngùng không dám bước chân đến nhà người quen vì cảm thấy có lỗi, hoặc lâu ngày chưa hồi đáp ơn huệ.',
    simpleMeaning: 'Áy náy, ngại đến',
    primaryMeaning: 'Cảm thấy áy náy, ngượng ngùng không dám bước chân đến nhà người quen do lâu ngày không liên lạc hoặc đã trót thất lễ.',
    meaningPoints: [
      '① Ngượng ngùng e ngại không dám đến thăm người từng giúp đỡ vì mặc cảm có lỗi hoặc lâu ngày vô tâm',
      '② BẪY JLPT N1: Người Nhật trẻ hay nhầm thành "sang trọng khó với tới", nhưng đề thi kiểm tra nghĩa áy náy thất lễ',
      '③ Phân biệt với 気後れする (kiokure suru - rụt rè thiếu tự tin)'
    ],
    nuanceAndContext: 'ĐÂY LÀ BẪY ĐỀ THI JLPT N1 & BJT KINH ĐIỂN! Người Nhật hiện đại hay dùng sai thành "quá sang trọng khó với tới", nhưng đề thi kiểm tra nghĩa chuẩn mực: E ngại vì mặc cảm có lỗi.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: '古い日本家屋は敷居が高く、お年寄りがつまずきやすい。',
        reading: 'ふるいにほんかおくはしきいが高く、おとしよりがつまずきやすい。',
        romaji: 'Furui nihon kaoku wa shikii ga takaku, otoshiyori ga tsumazukiyasui.',
        vietnamese: 'Những ngôi nhà truyền thống cổ của Nhật có bậu cửa khá cao, người cao tuổi rất dễ vấp ngã.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Chuẩn văn hóa truyền thống)',
        japanese: 'お世話になった恩師への連絡を何年も怠っていたので、今さらお宅に伺うのは敷居が高い。',
        reading: 'おせわになったおんしへのれんらくをなんねんもおこたっていたので、いまさらおたくにうかがうのはしきいがたかい。',
        romaji: 'Osewa ni natta onshi e no renraku wo nannen mo okotatte ita node, imasara otaku ni ukagau no wa shikii ga takai.',
        vietnamese: 'Vì đã nhiều năm không đoái hoài liên lạc với người thầy từng cưu mang mình, nên giờ này đến thăm nhà thầy tôi thấy ngượng ngùng e ngại vô cùng.'
      }
    ],
    relatedCollocations: ['敷居を跨ぐ (shikii wo matagu - bước qua bậu cửa)'],
    synonyms: ['気後れする (kiokure suru - cảm thấy rụt rè e thẹn)', '申し訳なくて行きづらい'],
    antonyms: ['気軽に行ける (kigaru ni ikeru - có thể thoải mái ghé qua)'],
    senseiExplanation: 'Bậu cửa là ranh giới giữa bên ngoài và không gian tôn nghiêm bên trong. Khi mình làm điều gì sai trái hay vô ơn với chủ nhà, bước chân qua ngưỡng cửa bỗng trở nên nặng nề như thể thanh gỗ đội cao lên ngàn thước.'
  },
  {
    id: 'vocab_kuuki_wo_yomu',
    word: '空気を読む',
    reading: 'くうきをよむ',
    furigana: '空気[くうき]を 読[よ]む',
    romaji: 'kuuki wo yomu',
    hanViet: 'KHÔNG KHÍ ĐỘC',
    level: 'N2',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Giao Tiếp & Ẩn Dụ',
    literalMeaning: 'Đọc khí quyển, đo lường các phân tử không khí trong phòng.',
    figurativeMeaning: 'Tinh tế nắm bắt bầu không khí, thấu hiểu tâm trạng tập thể mà không cần ai phải nói thành lời để có hành vi ứng xử tương thích.',
    simpleMeaning: 'Đọc vị tình huống',
    primaryMeaning: 'Nhanh nhạy nắm bắt bầu không khí và tâm trạng chung của tập thể mà không cần ai nói ra để ứng xử phù hợp.',
    meaningPoints: [
      '① Thấu hiểu bối cảnh và tâm lý ngầm của đối phương (Honne) để tránh phát ngôn bất cẩn',
      '② Tránh trở thành kẻ "KY" (Kuuki Yomenai - người vụng về phá hỏng bầu không khí)',
      '③ Kỹ năng sinh tồn then chốt trong công sở và đời sống cộng đồng Nhật'
    ],
    nuanceAndContext: 'Cốt lõi của văn hóa giao tiếp Nhật Bản. Người không biết đọc tình huống sẽ bị gắn mác "KY" (Kuuki Yomenai - Kẻ vụng về phá vỡ bầu không khí chung).',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Hình tượng văn hóa)',
        japanese: '気象観測員が大気中の空気の成分を測定した。',
        reading: 'きしょうかんそくいんがたいきちゅうのくうきのせいぶんをそくていした。',
        romaji: 'Kishou kansokuin ga taikichuu no kuuki no seibun wo sokutei shita.',
        vietnamese: 'Nhân viên quan trắc khí tượng đã đo đạc các thành phần trong bầu không khí.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Giao tiếp xã hội đỉnh cao)',
        japanese: '会議中、上司の機嫌が明らかに悪かったので、彼は空気を読んで提案を別の日に延期した。',
        reading: 'かいぎちゅう、じょうしのきげんがあきらかにわるかったので、かれはくうきをよんでていあんをべつのひにえんきした。',
        romaji: 'Kaigi chuu, joushi no kigen ga akiraka ni warukatta node, kare wa kuuki wo yonde teian wo betsu no hi ni enki shita.',
        vietnamese: 'Trong cuộc họp, nhận thấy tâm trạng sếp đang rất căng thẳng, anh ấy đã nhanh trí "đọc vị bầu không khí" và hoãn lời đề xuất sang ngày khác.'
      }
    ],
    relatedCollocations: ['空気が読めない (KY - kẻ vô duyên, không biết nhìn hoàn cảnh)', '空気を壊す (kuuki wo kowasu - phá hỏng bầu không khí)'],
    synonyms: ['場を弁える (ba wo wakimaeru - biết phép tắc tùy nơi chốn)', '気配り (kikubari)'],
    antonyms: ['KY (kuuki yomenai)', '場違いな発言 (bachigai na hatsugen - phát ngôn lạc lõng)'],
    senseiExplanation: 'Xã hội Nhật tôn sùng sự hài hòa (和 - Wa). Lời nói trực diện có thể làm rạn nứt hòa khí, nên người trưởng thành phải luyện tập kỹ năng "bắt sóng ngầm" từ nét mặt, hơi thở và ánh mắt của mọi người xung quanh.'
  },
  {
    id: 'vocab_nemawashi',
    word: '根回し',
    reading: 'ねまわし',
    furigana: '根[ね] 回[まわ]し',
    romaji: 'nemawashi',
    hanViet: 'CĂN HỒI',
    level: 'N2',
    partOfSpeech: 'Danh từ / Động từ nhóm 3 (根回しする)',
    category: 'Công Sở & Đàm Phán',
    literalMeaning: 'Đào xới và cắt tỉa bớt rễ xung quanh gốc cây lớn vài tháng trước khi bứng cây đi trồng ở nơi khác.',
    figurativeMeaning: 'Vận động ngầm, bàn bạc và thống nhất ý kiến trước với các bên liên quan để cuộc họp chính thức hoặc đàm phán hợp đồng diễn ra êm đẹp 100%.',
    simpleMeaning: 'Dàn xếp ngầm',
    primaryMeaning: 'Bàn bạc, thăm dò và thống nhất ý kiến trước với các bên liên quan để cuộc họp chính thức hoặc đàm phán hợp đồng diễn ra êm đẹp 100%.',
    meaningPoints: [
      '① Nghệ thuật dàn xếp trước trong văn hóa công sở Nhật (Tránh tranh cãi bất ngờ)',
      '② Tạo sự đồng thuận tuyệt đối (Nemawashi ga sumu) trước khi trình tờ trình Ringisho',
      '③ Kỹ năng sinh tồn sống còn cho bất kỳ ai làm việc trong doanh nghiệp Nhật'
    ],
    nuanceAndContext: 'Cốt lõi văn hóa kinh doanh Nhật Bản. Không bao giờ đưa ra đề xuất gây bất ngờ trong cuộc họp lớn mà chưa làm Nemawashi từ trước.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Nghề làm vườn)',
        japanese: '大木を移植する前に、半年かけて入念な根回しを行った。',
        reading: 'たいぼくをいしょくするまえに、はんとしかけてにゅうねんなねまわしをおこなった。',
        romaji: 'Taiboku wo ishoku suru mae ni, hantoshi kakete nyuunen na nemawashi wo okonatta.',
        vietnamese: 'Trước khi di dời cây đại thụ, người làm vườn đã mất nửa năm để tỉa rễ quanh gốc cây một cách cẩn thận.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Đàm phán hợp đồng)',
        japanese: '契約締結の稟議をスムーズに通すため、事前に各部署の部長へ根回しをしておいた。',
        reading: 'けいやくていけつのりんぎをスムーズにとおすため、じぜんにかくぶしょのぶちょうへねまわしをしておいた。',
        romaji: 'Keiyaku teiketsu no ringi wo sumuuzu ni toosu tame, jizen ni kakubusho no buchou e nemawashi wo shite oita.',
        vietnamese: 'Để tờ trình ký kết hợp đồng được thông qua suôn sẻ, tôi đã làm công tác vận động ngầm trước với trưởng phòng các bộ phận.'
      }
    ],
    relatedCollocations: ['根回しが済む (nemawashi ga sumu - đã dàn xếp xong)', '事前根回し (jizen nemawashi)'],
    synonyms: ['根回しをする', '事前交渉 (jizen koushou)', '下交渉 (shitakoushou)'],
    antonyms: ['不意打ち (fuiuchi - đánh úp bất ngờ)', 'ぶっつけ本番 (buttsuke homban)'],
    senseiExplanation: 'Cây cổ thụ nếu bứng đi đột ngột sẽ bị sốc mà chết; quyết định trong công ty nếu đưa ra đột ngột sẽ gặp phản kháng gay gắt. Nemawashi chính là nghệ thuật giúp dự án đâm chồi nảy lộc vững chãi.'
  },
  {
    id: 'vocab_hara_wo_waru',
    word: '腹を割る',
    reading: 'はらをわる',
    furigana: '腹[はら]を 割[わ]る',
    romaji: 'hara wo waru',
    hanViet: 'PHÚC CÁT',
    level: 'N2',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Công Sở & Đàm Phán',
    literalMeaning: 'Mổ xẻ, rạch phanh bụng ra để thấy rõ bên trong.',
    figurativeMeaning: 'Trải lòng thẳng thắn, bộc bạch toàn bộ suy nghĩ thật trong lòng (Honne), không giấu giếm toan tính trong đàm phán.',
    simpleMeaning: 'Nói thật lòng',
    primaryMeaning: 'Mở lòng, nói thật toàn bộ suy nghĩ trong lòng (Honne), không giấu giếm toan tính trong đàm phán hay giao tiếp.',
    meaningPoints: [
      '① Phá bỏ vỏ bọc khách sáo (Tatemae) để bày tỏ tiếng lòng chân thật (Honne)',
      '② Cụm từ kinh điển: 腹を割って話す (nói chuyện ruột gan, mở lòng tâm sự)',
      '③ Bước ngoặt quan trọng giúp tháo gỡ bế tắc trong đàm phán song phương'
    ],
    nuanceAndContext: 'Dùng khi hai bên muốn phá vỡ khoảng cách xã giao khách sáo để cùng nhau giải quyết bế tắc.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: '外科医が手術で患者の腹を割って病巣を取り除いた。',
        reading: 'げかいがしゅじゅつでかんじゃのはらをわってびょうそうをとりのぞいた。',
        romaji: 'Gekai ga shujutsu de kanja no hara wo watte byousou wo torinozoita.',
        vietnamese: 'Bác sĩ ngoại khoa mổ bụng bệnh nhân trong ca phẫu thuật để cắt bỏ ổ bệnh.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Đàm phán chân thành)',
        japanese: '双方が腹を割って本音で話し合えば、この契約交渉の対立も必ず解決できるはずだ。',
        reading: 'そうほうがはらをわってほんねではなしあえば、このけいやくこうしょうのたいりつもかならずかいけつできるはずだ。',
        romaji: 'Souhou ga hara wo waru tte honne de hanashiaeba, kono keiyaku koushou no tairitsu mo kanarazu kaiketsu dekiru hazu da.',
        vietnamese: 'Nếu cả hai bên cùng trải lòng bộc bạch thẳng thắn, mâu thuẫn trong cuộc đàm phán hợp đồng này nhất định sẽ được tháo gỡ.'
      }
    ],
    relatedCollocations: ['腹を割って話す (hara wo watte hanasu - nói chuyện ruột gan)', '腹の底 (hara no soko - đáy lòng)'],
    synonyms: ['本音を明かす (honne wo akasu)', '包み隠さず話す (tsutsumikakusazu hanasu)'],
    antonyms: ['腹を探る (hara wo saguru - thăm dò bụng dạ)', '腹に一物 (hara ni ichimotsu - bụng đầy mưu toan)'],
    senseiExplanation: 'Từ tục ngữ Seppuku (mổ bụng chứng minh sự trong sạch), người Nhật coi việc mở lòng "Hara wo waru" là mức độ chân thành cao nhất giữa những người đồng nghiệp hoặc đối tác tri kỷ.'
  },
  {
    id: 'vocab_te_wo_utsu',
    word: '手を打つ',
    reading: 'てをうつ',
    furigana: '手[て]を 打[う]つ',
    romaji: 'te wo utsu',
    hanViet: 'THỦ ĐẢ',
    level: 'N2',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Công Sở & Đàm Phán',
    literalMeaning: 'Vỗ hai bàn tay vào nhau phát ra tiếng bốp.',
    figurativeMeaning: '1. Đạt được thỏa thuận chung, chốt giao dịch đàm phán thành công. 2. Kịp thời đưa ra biện pháp ngăn chặn hậu quả xấu.',
    simpleMeaning: 'Kịp thời xử lý',
    primaryMeaning: '1. Nhanh chóng đưa ra biện pháp khắc phục sự cố trước khi quá muộn. 2. Đạt được thỏa thuận, chốt xong thương vụ.',
    meaningPoints: [
      '① Kịp thời ra tay ngăn chặn rủi ro hoặc khủng hoảng (対策を講じる)',
      '② Chốt thỏa thuận, vỗ tay ăn mừng thành công trong giao thương (手締め - Tejime)',
      '③ Tránh bị động trễ nải (早めに手を打つ)'
    ],
    nuanceAndContext: 'Trong kinh doanh: "Te wo utsu" là cử chỉ chốt đơn vỗ tay ăn mừng (Tejime); trong quản lý rủi ro: là hành động giải quyết sự cố thần tốc.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: '合図に合わせてパンと勢いよく手を打った。',
        reading: 'あいずにあわせてパンといきおいよくてをうった.',
        romaji: 'Aizu ni awasete pan to ikioiyoku te wo utta.',
        vietnamese: 'Theo hiệu lệnh, mọi người cùng vỗ tay thật mạnh phát ra tiếng kêu giòn giã.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Xử lý khủng hoảng & Chốt deal)',
        japanese: '問題が深刻化する前に、早急に手を打たなければ手遅れになる。',
        reading: 'もんだいがしんこくかするまえに、そうきゅうにてをうたなければておくれになる。',
        romaji: 'Mondai ga shinkokuka suru mae ni, soukyuu ni te wo utanakereba teokure ni naru.',
        vietnamese: 'Trước khi vấn đề trở nên nghiêm trọng, nếu ta không sớm ra tay xử lý thì sẽ quá muộn mất.'
      }
    ],
    relatedCollocations: ['手締め (tejime - nghi thức vỗ tay kết thúc hợp đồng)', '後手に回る (gote ni mawaru - bị chậm chân xử lý)'],
    synonyms: ['対策を講じる (taisaku wo koujiru - đề ra đối sách)', '妥結する (daketsu suru - thỏa hiệp ký kết)'],
    antonyms: ['手をこまねく (te wo komaneku - khoanh tay đứng nhìn)', '放任する (hounin suru)'],
    senseiExplanation: 'Ở Nhật Bản thời Edo, sau khi thương lượng giá cả xong xuôi, hai thương nhân sẽ vỗ tay theo nhịp (Ipponjime) trước sự chứng kiến của mọi người để xác nhận hợp đồng đã thành.'
  },
  {
    id: 'vocab_kugi_wo_sasu',
    word: '釘を刺す',
    reading: 'くぎをさす',
    furigana: '釘[くぎ]を 刺[さ]す',
    romaji: 'kugi wo sasu',
    hanViet: 'ĐINH THÍCH',
    level: 'N2',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Công Sở & Đàm Phán',
    literalMeaning: 'Dùng búa đóng đinh xuyên qua tấm gỗ để cố định.',
    figurativeMeaning: 'Cảnh cáo trước, dặn dò kỹ lưỡng để ngăn chặn đối phương thất hứa hoặc làm sai thỏa thuận ban đầu.',
    simpleMeaning: 'Dặn trước',
    primaryMeaning: 'Dặn dò kỹ lưỡng, nhắc đi nhắc lại để đối phương không thể quên lời hứa hoặc làm sai thỏa thuận.',
    meaningPoints: [
      '① Nhấn mạnh cam kết và răn đe trước để đối phương không làm trái (念を押す)',
      '② Cực kỳ phổ biến khi chốt điều khoản bảo mật hoặc thời hạn dự án',
      '③ Thể hiện sự cẩn trọng và chặt chẽ của phong cách làm việc Nhật Bản'
    ],
    nuanceAndContext: 'Dùng khi ký kết điều khoản phụ lục, nhắc nhở nhân viên về bảo mật hoặc thỏa thuận tiến độ giao hàng.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: '大工が椅子の脚にしっかりと釘を刺して固定した。',
        reading: 'だいくがいすのあしにしっかとくぎをさしてこていした。',
        romaji: 'Daiku ga isu no ashi ni shikkari to kugi wo sashite kotei shita.',
        vietnamese: 'Người thợ mộc đóng đinh chắc chắn vào chân ghế để cố định lại.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Đàm phán & Cam kết)',
        japanese: '納期遅延を防ぐため、取引先の担当者に「期日厳守」と釘を刺しておいた。',
        reading: 'のうきちえんをふせぐため、とりひきさきのたんとうしゃに「期日厳守」とくぎをさしておいた。',
        romaji: 'Nouki chien wo fusegu tame, torihikisaki no tantousha ni 「kijitsu genshu」 to kugi wo sashite oita.',
        vietnamese: 'Để tránh chậm trễ giao hàng, tôi đã dặn đi dặn lại nhân viên đối tác rằng "bắt buộc phải đúng hẹn".'
      }
    ],
    relatedCollocations: ['念を押す (nen wo osu - nhấn mạnh nhắc lại để chắc chắn)'],
    synonyms: ['戒める (imashimeru - răn đe)', '念押しする (nen\'oshi suru)'],
    antonyms: ['油断させる (yudan saseru - làm mất cảnh giác)'],
    senseiExplanation: 'Đóng một chiếc đinh vào lời hứa để nó không thể bị xê dịch hay lật lọng. Đây là cách người Nhật đảm bảo tính thực thi tuyệt đối của hợp đồng.'
  },
  {
    id: 'vocab_kumoyuki_ga_ayashii',
    word: '雲行きが怪しい',
    reading: 'くもゆきがあやしい',
    furigana: '雲行[くもゆ]きが 怪[あや]しい',
    romaji: 'kumoyuki ga ayashii',
    hanViet: 'VÂN HÀNH QUÁI',
    level: 'N2',
    partOfSpeech: 'Quán dụng ngữ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Mây đen vần vũ chuyển động trên bầu trời báo hiệu sắp có mưa giông bão táp.',
    figurativeMeaning: 'Tình hình diễn biến có dấu hiệu bất ổn, chiều hướng xấu đi, có nguy cơ xảy ra biến cố hoặc đổ vỡ thỏa thuận.',
    simpleMeaning: 'Có điềm xấu',
    primaryMeaning: 'Tình hình tiến triển bắt đầu có dấu hiệu xấu đi, chiều hướng bất an, nguy cơ xảy ra biến cố hoặc đổ vỡ thỏa thuận.',
    meaningPoints: [
      '① Dấu hiệu thời tiết giông bão sắp ập đến',
      '② Diễn biến đàm phán, dự án hoặc tình hình kinh tế có nguy cơ đổ vỡ',
      '③ Thường dùng để cảnh báo đồng nghiệp chuẩn bị phương án dự phòng'
    ],
    nuanceAndContext: 'Dùng cả khi nói về thời tiết thực tế lẫn khi đánh giá các cuộc đàm phán, dự án IT hoặc tình hình kinh tế thị trường.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Thời tiết)',
        japanese: '急に風が強くなり、西の空の雲行きが怪しくなってきた。',
        reading: 'きゅうにかぜがつよくなり、にしのそらのくもゆきがあやしくなってきた。',
        romaji: 'Kyuu ni kaze ga tsuyoku nari, nishi no sora no kumoyuki ga ayashiku natte kita.',
        vietnamese: 'Gió bỗng thổi mạnh và mây đen ở phía tây bắt đầu vần vũ đe dọa cơn mưa bão.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Dự án & Đàm phán)',
        japanese: '先方の態度が急変して、契約交渉の雲行きが怪しくなってきた。',
        reading: 'せんぽうのたいどがきゅうへんして、けいやくこうしょうのくもゆきがあやしくなってきた。',
        romaji: 'Sempou no taido ga kyuuhen shite, keiyaku koushou no kumoyuki ga ayashiku natte kita.',
        vietnamese: 'Thái độ của phía đối tác đột ngột thay đổi, khiến tiến trình đàm phán hợp đồng bắt đầu có dấu hiệu bất ổn.'
      }
    ],
    relatedCollocations: ['暗雲が立ち込める (an\'un ga tachikomeru - mây đen bao phủ)', '雲散霧消 (unsan mushou - tan biến như mây khói)'],
    synonyms: ['先行きが不安 (sakiyuki ga fuan - tương lai bất an)', '雲行きが悪い'],
    antonyms: ['雲一つない (kumo hitotsu nai - trời quang mây tạnh / suôn sẻ thuận lợi)'],
    senseiExplanation: 'Người Nhật sống ở xứ sở thường xuyên đối mặt bão táp và mưa mùa, vì thế khả năng nhìn thế mây để đoán biến cố đã trở thành phản xạ tư duy biểu tượng trong đời sống.'
  },
  {
    id: 'vocab_arashi_no_mae',
    word: '嵐の前の静けさ',
    reading: 'あらしのまえのしずけさ',
    furigana: '嵐[あらし]の 前[まえ]の 静[しず]けさ',
    romaji: 'arashi no mae no shizukesa',
    hanViet: 'LAM TIỀN TĨNH',
    level: 'N2',
    partOfSpeech: 'Cụm danh từ / Quán dụng ngữ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Sự tĩnh lặng kỳ lạ của gió và mây trước khi cơn bão nhiệt đới dữ dội đổ bộ.',
    figurativeMeaning: 'Khoảng thời gian yên ắng giả tạo trước khi một cuộc biến động lớn, xung đột gay gắt hoặc khủng hoảng bùng phát.',
    simpleMeaning: 'Yên ắng trước bão',
    primaryMeaning: 'Khoảng thời gian yên ắng giả tạo trước khi một cuộc biến động lớn, xung đột gay gắt hoặc khủng hoảng bùng phát dữ dội.',
    meaningPoints: [
      '① Sự tĩnh lặng dị thường của thiên nhiên trước khi bão đổ bộ',
      '② Bầu không khí im ắng đáng ngờ trước khi sếp nổi giận hoặc công ty gặp biến cố',
      '③ Lời nhắc nhở không bao giờ được lơ là mất cảnh giác'
    ],
    nuanceAndContext: 'Dùng khi cảnh báo đồng đội không được chủ quan trước sự yên ắng đáng ngờ trong công việc hoặc thị trường.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Thiên tai thời tiết)',
        japanese: '台風直前、海は不気味なほど凪いでおり、まさに嵐の前の静けさだった。',
        reading: 'たいふうちょくぜん、うみはぶきみなほどないでおり、まさにあらしのまえのしずけさだった。',
        romaji: 'Taifuu chokuzen, umi wa bukimi na hodo naide ori, masa ni arashi no mae no shizukesa datta.',
        vietnamese: 'Ngay trước cơn bão, mặt biển lặng sóng đến mức rợn người, đúng là sự tĩnh lặng trước cơn bão.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Khủng hoảng công sở)',
        japanese: '社長室が静まり返っているが、これは嵐の前の静けさに違いない。',
        reading: 'しゃちょうしつがしずまりかえっているが、これはあらしのまえのしずけさにちがいない。',
        romaji: 'Shachoushitsu ga shizumarikaette iru ga, kore wa arashi no mae no shizukesa ni chigainai.',
        vietnamese: 'Phòng giám đốc im ắng bất thường, nhưng đây chắc chắn là sự yên ắng trước cơn giông bão trút giận.'
      }
    ],
    relatedCollocations: ['波乱万丈 (haran banjou - muôn trùng sóng gió)', '雨降って地固まる (sau cơn mưa trời lại sáng)'],
    synonyms: ['不気味な沈黙 (bukimi na chimmoku)', '一触即発 (isshoku sokuhatsu - ngàn cân treo sợi tóc)'],
    antonyms: ['平穏無事 (heion buji - bình yên vô sự)'],
    senseiExplanation: 'Trước khi áp thấp nhiệt đới ập tới, áp suất không khí giảm mạnh làm gió tạm thời ngừng thổi. Người giàu kinh nghiệm sẽ không bao giờ lơ là trong khoảnh khắc này.'
  },
  {
    id: 'vocab_bagu_wo_tsubusu',
    word: 'バグを潰す',
    reading: 'バグをつぶす',
    furigana: 'バグを 潰[つぶ]す',
    romaji: 'bagu wo tsubusu',
    hanViet: 'HỘI (ĐÈ BẸP CON BỌ)',
    level: 'N2',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Công Sở & Đàm Phán',
    literalMeaning: 'Dùng ngón tay hoặc chiếc dép đè bẹp dí một con côn trùng gây hại.',
    figurativeMeaning: 'Khắc phục triệt để lỗi phần mềm, kiểm thử và fix sạch mọi lỗi code trong phát triển công nghệ thông tin (IT).',
    simpleMeaning: 'Diệt bug IT',
    primaryMeaning: 'Kiểm thử, truy vết và khắc phục triệt để các lỗi kỹ thuật phần mềm trong phát triển công nghệ thông tin (IT).',
    meaningPoints: [
      '① Tiêu diệt triệt để lỗi code trước ngày bàn giao sản phẩm',
      '② Thuật ngữ cửa miệng hàng ngày của các lập trình viên và QA/Tester Nhật Bản',
      '③ Thể hiện sự quyết liệt trong văn hóa kiểm soát chất lượng phần mềm'
    ],
    nuanceAndContext: 'Thuật ngữ cửa miệng hàng ngày của các kỹ sư IT người Nhật (Bagu tsubushi - Ứng dụng kiểm thử gỡ lỗi).',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: '壁を這っていた害虫をティッシュで包んで潰した。',
        reading: 'かべをはっていたがいちゅうをティッシュでつつんでつぶした。',
        romaji: 'Kabe wo hatte ita gaichuu wo tisshu de tsutsunde tsubushita.',
        vietnamese: 'Tôi dùng khăn giấy bọc lấy con côn trùng đang bò trên tường rồi bóp chết nó.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Kỹ thuật phần mềm IT)',
        japanese: 'リリース前夜、開発チーム総出で残った重大なバグを一つずつ潰していった。',
        reading: 'リリースぜんや、かいはつチームそうででのこったじゅうだいなバグをひとつずつつぶしていった。',
        romaji: 'Ririisu zen\'ya, kaihatsu chiimu soude de nokotta juudai na bagu wo hitotsu zutsu tsubushite itta.',
        vietnamese: 'Đêm trước ngày phát hành, cả đội ngũ phát triển cùng nhau dốc sức tiêu diệt từng con bug nghiêm trọng còn sót lại.'
      }
    ],
    relatedCollocations: ['バグ取り (bagu tori - gỡ lỗi)', 'デバッグ (debug)', 'バグ出し (bagu dashi - tìm lỗi)'],
    synonyms: ['不具合を修正する (fuguai wo shuusei suru)', 'デバッグ作業を行う'],
    antonyms: ['バグを放置する (bagu wo houchi suru - bỏ mặc lỗi)'],
    senseiExplanation: 'Từ "Bug" trong tiếng Anh vốn là con bọ mắc vào rơ-le máy tính năm 1947. Người Nhật mượn động từ 潰す (tsubusu - nghiền nát) để thể hiện tinh thần triệt tiêu lỗi đến tận gốc.'
  },
  {
    id: 'vocab_enjou_suru',
    word: '炎上する',
    reading: 'えんじょうする',
    furigana: '炎上[えんじょう]する',
    romaji: 'enjou suru',
    hanViet: 'VIÊM THƯỢNG',
    level: 'N2',
    partOfSpeech: 'Động từ nhóm 3 (Danh từ 炎上)',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Tòa nhà, lâu đài hoặc cánh rừng bốc cháy dữ dội ngọn lửa bốc cao lên trời.',
    figurativeMeaning: '1. Dự án phần mềm bị vỡ trận, chậm tiến độ nghiêm trọng đến mức khủng hoảng. 2. Bị bão mạng dư luận ném đá dữ dội trên mạng xã hội.',
    simpleMeaning: 'Bị bão mạng',
    primaryMeaning: '1. Dự án IT bị vỡ tiến độ nghiêm trọng dẫn đến khủng hoảng nhân sự. 2. Bị cộng đồng mạng ném đá chỉ trích gay gắt.',
    meaningPoints: [
      '① Dự án IT vỡ trận (炎上案件 - Enjou Anken) buộc phải dốc toàn lực dập lửa',
      '② Bão mạng xã hội (ネット炎上 - Netto Enjou) do phát ngôn hoặc hành vi phản cảm',
      '③ Từ vựng thời đại số cực kỳ phổ biến trong đời sống Nhật Bản'
    ],
    nuanceAndContext: 'Cực kỳ phổ biến trong xã hội hiện đại của Nhật Bản, cả trong giới IT lẫn truyền thông đại chúng.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: '落雷によって歴史ある寺院の本堂が一瞬にして炎上した。',
        reading: 'らくらいによってれきしあるじいんのほんどうがいっしゅんにしてえんじょうした。',
        romaji: 'Rakurai ni yotte rekishi aru jiin no hondou ga isshun ni shite enjou shita.',
        vietnamese: 'Do sét đánh, chính điện của ngôi chùa cổ kính đã bốc cháy dữ dội chỉ trong chớp mắt.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (IT vỡ tiến độ & Bão mạng)',
        japanese: '仕様変更が繰り返された結果、システム開発プロジェクトが炎上してしまった。',
        reading: 'しようへんこうがくりかえされたけっか、システムかいはつプロジェクトがえんじょうしてしまった。',
        romaji: 'Shiyou henkou ga kurikaesareta kekka, shisutemu kaihatsu purojekuto ga enjou shite shimatta.',
        vietnamese: 'Do khách hàng liên tục thay đổi yêu cầu, dự án phát triển hệ thống đã bị vỡ trận bùng nổ khủng hoảng.'
      }
    ],
    relatedCollocations: ['炎上案件 (enjou anken - dự án IT đang cháy, vỡ tiến độ)', 'ネット炎上 (netto enjou - bão mạng xã hội)'],
    synonyms: ['破綻する (hatan suru - đổ vỡ)', '批判が殺到する (hihan ga sattou suru)'],
    antonyms: ['鎮火する (chinka suru - dập tắt lửa / dập tắt khủng hoảng)'],
    senseiExplanation: 'Ngọn lửa một khi bùng cháy thì rất khó kiểm soát và thiêu rụi mọi thứ. Dự án IT "cháy" nghĩa là nhân sự phải làm việc thâu đêm suốt sáng để dập lửa.'
  },
  {
    id: 'vocab_saji_wo_nageru',
    word: 'さじを投げる',
    reading: 'さじをなげる',
    furigana: '匙[さじ]を 投[な]げる',
    romaji: 'saji wo nageru',
    hanViet: 'THÌ ĐẦU',
    level: 'N1',
    partOfSpeech: 'Cụm động từ (Nhóm 2)',
    category: 'Giao Tiếp & Ẩn Dụ',
    literalMeaning: 'Bác sĩ thời phong kiến buông tay vứt chiếc muỗng múc thuốc bột xuống đất.',
    figurativeMeaning: 'Bó tay bất lực, hết cách cứu vãn, đầu hàng từ bỏ hoàn toàn vì tình hình đã vô phương cứu chữa.',
    simpleMeaning: 'Bó tay đầu hàng',
    primaryMeaning: 'Bất lực từ bỏ hoàn toàn một vấn đề hoặc ca bệnh vì đã vượt quá khả năng cứu chữa hay giải quyết.',
    meaningPoints: [
      '① Thầy thuốc buông muỗng thuốc đầu hàng trước căn bệnh nan y',
      '② Bó tay bất lực trước một nhiệm vụ hoặc dự án bế tắc không lối thoát',
      '③ Thành ngữ cao cấp thường xuất hiện trong đề thi JLPT N1'
    ],
    nuanceAndContext: 'Dùng trong y tế lẫn đời sống công việc khi một dự án hoặc ca bệnh đã vượt quá khả năng xử lý.',
    examples: [
      {
        type: 'literal',
        label: 'Nguồn gốc y học cổ truyền',
        japanese: '昔の漢方医は、薬を調合する匙を投げ出して患者の死を告げた。',
        reading: 'むかしのかんぽういは、くすりをちょうごうするさじをなげだしてかんじゃのしをつげた。',
        romaji: 'Mukashi no kampoui wa, kusuri wo chougou suru saji wo nagedashite kanja no shi wo tsugeta.',
        vietnamese: 'Thầy thuốc Đông y thời xưa vứt chiếc muỗng dùng để pha chế thuốc bột xuống đất và báo hiệu bệnh nhân không qua khỏi.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Bất lực đầu hàng)',
        japanese: 'ベテランのエンジニアでさえさじを投げるほどの極めて複雑な難問だった。',
        reading: 'ベテランのエンジニアでさえさじをなげるほどのきわめてふくざつななんもんだった。',
        romaji: 'Beteran no enjinia de sae saji wo nageru hodo no kiwamete fukuzatsu na nammon datta.',
        vietnamese: 'Đó là một bài toán hóc búa cực kỳ phức tạp đến mức ngay cả những kỹ sư kỳ cựu cũng đành bó tay đầu hàng.'
      }
    ],
    relatedCollocations: ['白旗を上げる (shirohata wo ageru - giương cờ trắng đầu hàng)', '匙加減 (sajikagen - sự nêm nếm gia giảm)'],
    synonyms: ['諦める (akirameru - từ bỏ)', 'お手上げ (oteage - giơ tay đầu hàng)'],
    antonyms: ['最後まで粘る (saigo made nebaru - kiên trì bám trụ đến cùng)'],
    senseiExplanation: 'Chiếc muỗng (さじ - saji) là công cụ sinh mạng của lương y bốc thuốc. Khi thầy thuốc ném chiếc muỗng đi nghĩa là y thuật của trần thế đã bất lực.'
  },
  {
    id: 'vocab_ashimoto_wo_miru',
    word: '足元を見る',
    reading: 'あしもとをみる',
    furigana: '足元[あしもと]を 見[み]る',
    romaji: 'ashimoto wo miru',
    hanViet: 'TÚC NGUYÊN KIẾN',
    level: 'N2',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Công Sở & Đàm Phán',
    literalMeaning: 'Cúi xuống nhìn vào đôi chân, đôi dép rơm lấm bùn của khách bộ hành.',
    figurativeMeaning: 'Nắm thóp điểm yếu, sự túng quẫn hoặc thế bị động của đối phương để chèn ép, ép giá bất lợi trong đàm phán thương mại.',
    simpleMeaning: 'Nắm thóp ép giá',
    primaryMeaning: 'Nhìn thấu sự túng quẫn hoặc thế bị động của đối phương để chèn ép, đòi hỏi điều kiện có lợi cho mình trong đàm phán thương mại.',
    meaningPoints: [
      '① Bắt thóp đối phương đang ở thế yếu hoặc đang nôn nóng cần gấp',
      '② Ép giá, đòi hỏi điều kiện bất lợi trong đàm phán (足元を見られる - bị ép giá)',
      '③ Bài học cảnh giác sống còn: Không bao giờ để lộ sự sốt ruột trước đối tác'
    ],
    nuanceAndContext: 'Mang sắc thái tiêu cực trong kinh doanh. Cảnh báo không được để đối tác nhận ra điểm yếu về tài chính hay tiến độ của mình.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Thời Edo)',
        japanese: '宿場の駕籠かきは、旅人の泥だらけの足元を見て疲労度を測った。',
        reading: 'しゅくばのかごかきは、たびびとのどろだらけのあしもとをみてひろうどをはかった。',
        romaji: 'Shukuba no kagokaki wa, tabibito no dorodarake no ashimoto wo mite hiroudo wo hakatta.',
        vietnamese: 'Những người khiêng kiệu ở trạm dừng chân xưa nhìn vào đôi chân lấm bùn của người đi đường để đo lường mức độ kiệt sức.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Bị ép giá đàm phán)',
        japanese: '納期の遅れで焦っている弱みにつけ込まれ、取引先に足元を見られて値引きを強要された。',
        reading: 'のうきのおくれであせっているよわみにつけこまれ、とりひきさきにあしもとをみられてねびきをきょうようされた。',
        romaji: 'Nouki no okure de asette iru yowami ni tsukekomare, torihikisaki ni ashimoto wo mirarete nebiki wo kyouyou sareta.',
        vietnamese: 'Bị đối tác nắm thóp sự nôn nóng vì chậm tiến độ giao hàng, chúng tôi đã bị họ ép giá và bắt giảm giá thảm hại.'
      }
    ],
    relatedCollocations: ['足元を見られる (ashimoto wo mirareru - bị bắt thóp ép giá)', '足元につけ込む (ashimoto ni tsukekomu)'],
    synonyms: ['弱みにつけ込む (yowami ni tsukekomu - lợi dụng điểm yếu)', '足下をすくう (ashimoto wo sukuu)'],
    antonyms: ['対等に交渉する (taitō ni kōshō suru - đàm phán bình đẳng)'],
    senseiExplanation: 'Thời Edo, phu khiêng kiệu nhìn dép rơm rách nát của khách để biết khách không thể tự đi được nữa, từ đó thét giá cắt cổ. Trong đàm phán hợp đồng hiện đại, giấu được "sự sốt ruột" là bài học sống còn.'
  },
  {
    id: 'vocab_ame_futte',
    word: '雨降って地固まる',
    reading: 'あめふってじかたまる',
    furigana: '雨[あめ] 降[ふ]って 地[じ] 固[かた]まる',
    romaji: 'ame futte ji katamaru',
    hanViet: 'VŨ HÀNG ĐỊA CỐ',
    level: 'N2',
    partOfSpeech: 'Tục ngữ / Quán dụng ngữ',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Sau cơn mưa rào đổ xuống, nền đất cát lỏng lẻo sẽ được nén chặt và vững chắc hơn.',
    figurativeMeaning: 'Sau những tranh cãi, xung đột, khủng hoảng hoặc giông bão gian nan, mối quan hệ hoặc tổ chức lại càng gắn bó bền chặt và thấu hiểu nhau hơn ("sau cơn bĩ cực đến hồi thái lai").',
    simpleMeaning: 'Qua sóng gió càng bền',
    primaryMeaning: 'Sau những bất đồng, xung đột hay thử thách gian nan thì mối quan hệ hoặc tổ chức lại càng thấu hiểu, gắn bó và đoàn kết vững chắc hơn.',
    meaningPoints: [
      '① Sau cơn mưa cát bụi trôi đi, đất nền nén chặt vững chãi hơn',
      '② Tranh luận thẳng thắn chân thành giúp loại bỏ hoài nghi để hợp tác tốt hơn',
      '③ Thành ngữ tích cực dùng nhiều trong lễ cưới, tiệc mừng hoặc động viên đồng đội'
    ],
    nuanceAndContext: 'Thường dùng để động viên đồng nghiệp sau tranh cãi nảy lửa, hoặc làm lời chúc mừng trong lễ cưới, lễ ký kết vượt khó.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Thời tiết)',
        japanese: '大雨が降った後のグラウンドは、翌日になるとしっかりと地が固まっていた。',
        reading: 'おおあめがふったあとのグラウンドは、よくじつになるとしっかりとじがかたまっていた。',
        romaji: 'Ooame ga futta ato no guraundo wa, yokujitsu ni naru to shikkari to ji ga katamatte ita.',
        vietnamese: 'Mặt sân sau trận mưa lớn, đến ngày hôm sau đã được nén chặt lại rất vững vàng.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Gắn kết sau sóng gió)',
        japanese: 'プロジェクト初期に激しい意見の対立があったが、雨降って地固まるで、今では最高の結束力を誇るチームになった。',
        reading: 'プロジェクトしょきにはげらしいいけんのたいりつがあったが、あめふってじかたまる で、いまではさいこうのけっそくりょくをほこるチームになった。',
        romaji: 'Purojekuto shoki ni hageshii iken no tairitsu ga atta ga, ame futte ji katamaru de, ima dewa saikou no kessokuryoku wo hokoru chiimu ni natta.',
        vietnamese: 'Thời gian đầu dự án từng có những bất đồng quan điểm gay gắt, nhưng đúng là "sau mưa đất lại chặt hơn", giờ đây cả đội đã gắn kết vô cùng bền vững.'
      }
    ],
    relatedCollocations: ['雨降って地固まるの例え (ví dụ điển hình của sau mưa đất lại chặt)'],
    synonyms: ['災い転じて福となす (wazawai tenjite fuku to nasu - biến họa thành phúc)'],
    antonyms: ['亀裂が入る (kiretsu ga hairu - rạn nứt sâu sắc)'],
    senseiExplanation: 'Nước mưa cuốn trôi bụi bẩn và kéo các hạt đất dính chặt lại với nhau. Người Nhật tin rằng tranh cãi chân thành là bước đệm cần thiết để loại bỏ nghi ngờ và xây đắp niềm tin vững bền.'
  },
  {
    id: 'vocab_mune_wo_haru',
    word: '胸を張る',
    reading: 'むねをはる',
    furigana: '胸[むね]を 張[は]る',
    romaji: 'mune wo haru',
    hanViet: 'HUNG TRƯƠNG',
    level: 'N3',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Ưỡn ngực, mở rộng lồng ngực thẳng người về phía trước.',
    figurativeMeaning: 'Tự tin, ngẩng cao đầu hãnh diện, không hề e dè hay hổ thẹn vì bản thân đã dốc hết sức mình và làm điều đúng đắn.',
    simpleMeaning: 'Tự hào ngẩng cao đầu',
    primaryMeaning: 'Giữ phong thái tự tin, ngẩng cao đầu không hổ thẹn vì đã nỗ lực hết mình và làm điều đúng đắn.',
    meaningPoints: [
      '① Tư thế ưỡn ngực thẳng lưng thể hiện sự đàng hoàng, tự tin',
      '② Tâm lý không cắn rứt, không hổ thẹn trước mọi phán xét của xã hội',
      '③ Thường dùng để khích lệ người vừa trải qua kỳ thi hoặc dự án gian khổ'
    ],
    nuanceAndContext: 'Dùng để khen ngợi học trò sau kỳ thi JLPT, hoặc khuyên người đi phỏng vấn giữ phong thái tự tin vững vàng.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Tư thế cơ thể)',
        japanese: '深呼吸をしながら、大きく胸を張って背筋を伸ばした。',
        reading: 'しんこきゅうをしながら、おおきくむねをはってせすじをのばした。',
        romaji: 'Shinkokyuu wo shinagara, ookiku mune wo hatte sesuji wo nobashita.',
        vietnamese: 'Vừa hít thở sâu, tôi vừa ưỡn ngực thật lớn và duỗi thẳng sống lưng.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Tự hào hãnh diện)',
        japanese: '合格点には届かなかったかもしれないが、全力を尽くしたのだから胸を張って帰ろう。',
        reading: 'ごうかくてんにはとどかなかったかもしれないが、ぜんりょくをつくしたのだからむねをはってかえろう。',
        romaji: 'Goukakuten ni wa todokanakatta kamoshirenai ga, zenryoku wo tsukushita no dakara mune wo hatte kaerou.',
        vietnamese: 'Dù có thể chưa đạt điểm đỗ kỳ này, nhưng vì đã dốc hết tâm lực nên em hãy ngẩng cao đầu tự hào mà trở về.'
      }
    ],
    relatedCollocations: ['胸を張って生きる (mune wo hatte ikiru - sống tự tin ngẩng cao đầu)', '堂々と胸を張る (doudou to mune wo haru)'],
    synonyms: ['誇りに思う (hokori ni omou - tự hào)', '堂々とする (doudou to suru)'],
    antonyms: ['肩を落とす (kata wo otosu - sụp vai thất vọng)', '縮こまる (chijikomaru - co rúm nhút nhát)'],
    senseiExplanation: 'Cảm xúc và dáng điệu con người luôn gắn kết mật thiết. Khi tâm trí tràn ngập tự tôn chính trực, lồng ngực sẽ tự khắc mở rộng đón nhận mọi thử thách.'
  },
  {
    id: 'vocab_te_wo_yaku',
    word: '手を焼く',
    reading: 'てをやく',
    furigana: '手[て]を 焼[や]く',
    romaji: 'te wo yaku',
    hanViet: 'THỦ THIÊU',
    level: 'N2',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Bị bỏng rát tay do chạm vào vật dụng quá nóng.',
    figurativeMeaning: 'Gặp vô vàn rắc rối, đau đầu khổ sở vì không biết làm cách nào để giải quyết hoặc xử lý êm thỏa một vấn đề rắc rối hoặc đối tượng bướng bỉnh.',
    simpleMeaning: 'Đau đầu bó tay',
    primaryMeaning: 'Gặp nhiều phiền toái, đau đầu chật vật vì không biết làm cách nào để xử lý thỏa đáng một đối tượng bướng bỉnh hoặc vấn đề nan giải.',
    meaningPoints: [
      '① Bỏng tay do vật quá nóng, không giữ lâu mà cũng không bỏ ngay được',
      '② Bó tay trước cấp dưới ngỗ ngược hoặc khách hàng khó tính',
      '③ Cụm từ quen thuộc trong giao tiếp: 〜に手を焼いている (đang rất đau đầu vì...)'
    ],
    nuanceAndContext: 'Rất hay xuất hiện trong bài đọc hiểu và nghe hiểu JLPT N2/N1 khi nhân vật phàn nàn về công việc hoặc cấp dưới.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: '熱い鍋の取っ手を素手で触ってしまい、危うく手を焼くところだった。',
        reading: 'あついなべのとってをすででさわってしまい、あやうくてをやくところだった。',
        romaji: 'Atsui nabe no totte wo sude de sawatte shimai, ayauku te wo yaku tokoro datta.',
        vietnamese: 'Tôi lỡ tay chạm trần vào quai nồi nóng, suýt chút nữa là bị bỏng tay rồi.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Đau đầu xử lý)',
        japanese: '何回説明しても規則を守らない新入社員の扱いに、指導係の先輩はすっかり手を焼いている。',
        reading: 'なんかいせつめいしてもきそくをまもらないしんにゅうしゃいんのあつかいに、しどうがかりのせんぱいはすっかりてをやいている。',
        romaji: 'Nankai setsumei shitemo kisoku wo mamoranai shinnyuushain no atsukai ni, shidougakari no sempai wa sukkari te wo yaite iru.',
        vietnamese: 'Trước cách ứng xử của cậu nhân viên mới giải thích bao nhiêu lần vẫn vi phạm quy tắc, người tiền bối hướng dẫn hoàn toàn đau đầu bó tay.'
      }
    ],
    relatedCollocations: ['〜の扱いに手を焼く (atsukai ni te wo yaku - đau đầu xử lý)', '手に余る (te ni amaru - quá sức nắm giữ)'],
    synonyms: ['手こずる (tekozuru - vất vả chật vật)', 'もてあます (moteamasu - không kham nổi)'],
    antonyms: ['手玉に取る (tedama ni toru - xoay như chong chóng dễ dàng)', '朝飯前 (asameshimae - dễ như ăn cháo)'],
    senseiExplanation: 'Cầm hòn than hồng trên tay thì không thể giữ lâu mà cũng không biết ném vào đâu nếu không muốn làm cháy nhà. Đó chính là cảm giác "Te wo yaku".'
  },
  {
    id: 'vocab_hone_wo_oru',
    word: '骨を折る',
    reading: 'ほねをおる',
    furigana: '骨[ほね]を 折[お]る',
    romaji: 'hone wo oru',
    hanViet: 'CỐT CHIẾT',
    level: 'N2',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Giao Tiếp & Ẩn Dụ',
    literalMeaning: 'Bị bẻ gãy, chấn thương xương do tác động vật lý mạnh.',
    figurativeMeaning: 'Lao tâm khổ tứ, cống hiến hết tâm sức và mồ hôi nước mắt, chịu nhiều vất vả gian lao để giúp đỡ người khác hoặc hoàn thành công việc lớn lao.',
    simpleMeaning: 'Lao tâm khổ tứ',
    primaryMeaning: 'Chịu nhiều vất vả gian lao, dốc hết tâm lực và mồ hôi công sức để giúp đỡ người khác hoặc hoàn thành một trọng trách lớn.',
    meaningPoints: [
      '① Hy sinh cống hiến đến mức "gãy cả xương cốt"',
      '② Lời cảm ơn lịch sự trang trọng bậc nhất trong văn hóa Nhật (ご骨折り)',
      '③ Phân biệt với 骨折り損 (nhọc công vô ích, dã tràng xe cát)'
    ],
    nuanceAndContext: 'Thường dùng trong lời cảm ơn lịch thiệp: "ご骨折りいただき、心より感謝申し上げます" (Chân thành cảm ơn sự tận tụy khổ công của quý ngài).',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: 'スキー場で派手に転倒し、右足の骨を折って全治２か月の重傷を負った。',
        reading: 'スキーじょうではでにてんとうし、みぎあしのほねをおってぜんちにかげつのじゅうしょうをおった。',
        romaji: 'Sukii-jou de hade ni tentou shi, migiashi no hone wo otte zenchi nikagetsu no juushou wo otta.',
        vietnamese: 'Ngã mạnh ở khu trượt tuyết, anh ấy bị gãy xương chân phải và mất 2 tháng mới bình phục hoàn toàn.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Lao tâm khổ tứ cống hiến)',
        japanese: '両社の提携をまとめるために、間に入って骨を折ってくれた仲介者に深く感謝している。',
        reading: 'りょうしゃのていけいをつとめるために、あいだにはいってほねをおってくれたちゅうかいしゃにふかくかんしゃしている。',
        romaji: 'Ryousha no teikei wo matomeru tame ni, aida ni haitte hone wo otte kureta chuukaisha ni fukaku kansha shite iru.',
        vietnamese: 'Tôi vô cùng biết ơn vị môi giới đã đứng ra làm cầu nối và lao tâm khổ tứ để hợp tác giữa hai công ty đi đến thành công tốt đẹp.'
      }
    ],
    relatedCollocations: ['ご骨折り (gokotsuori - sự nhọc công của ai đó)', '骨折り損のくたびれ儲け (dã tràng xe cát, nhọc công vô ích)'],
    synonyms: ['苦労する (kurou suru - chịu cực khổ)', '尽力する (jinryoku suru - tận lực cống hiến)'],
    antonyms: ['手を抜く (te wo nuku - làm qua loa làm biếng)'],
    senseiExplanation: 'Xương là phần cốt lõi nâng đỡ thân thể. Dốc lòng đến mức "gãy cả xương" tượng trưng cho sự hy sinh tận tụy cao quý nhất trong chuẩn mực đạo đức người Nhật.'
  },
  {
    id: 'vocab_omoi',
    word: '重い',
    reading: 'おもい',
    furigana: '重[おも]い',
    romaji: 'omoi',
    hanViet: 'TRỌNG (NẶNG NỀ)',
    level: 'N4',
    partOfSpeech: 'Tính từ đuôi い',
    category: 'Nghĩa Đen & Nghĩa Bóng',
    literalMeaning: 'Vật có khối lượng lớn, sức nặng vật lý đáng kể (hòn đá to, hành lý nặng ký).',
    figurativeMeaning: '1. Tâm trạng u ám, nặng trĩu âu lo. 2. Trong tình cảm: Sự quan tâm quá mức, ghen tuông dồn dập, đòi hỏi đối phương quá nhiều khiến họ ngột ngạt khó thở ("重い女 / 重い男"). 3. Trách nhiệm nặng nề.',
    simpleMeaning: 'Nặng nề; Ngột ngạt',
    primaryMeaning: '1. Khối lượng vật lý nặng. 2. Tâm trạng u ám nặng trĩu. 3. Tình cảm kiểm soát, đòi hỏi quá mức khiến đối phương ngột ngạt khó thở. 4. Trách nhiệm nặng nề.',
    meaningPoints: [
      '① Khối lượng vật lý lớn, nặng ký (hành lý, đồ đạc)',
      '② Tâm lý u sầu, lòng nặng trĩu âu lo (気が重い - ki ga omoi)',
      '③ Tình cảm ngột ngạt trong tình yêu (重い女 / 重い男 - người yêu kiểm soát quá mức)',
      '④ Trách nhiệm nặng nề (責任が重い), Miệng nặng/kiệm lời (口が重い)'
    ],
    nuanceAndContext: 'Từ quen thuộc cấp N5 nhưng mang tầng nghĩa bóng tâm lý học vô cùng sâu sắc trong hẹn hò và xã hội Nhật Bản hiện đại.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Khối lượng vật lý)',
        japanese: 'スーツケースが重すぎて、階段を一人で運べない。',
        reading: 'スーツケースがおもすぎて、かいだんをひとりではこべない。',
        romaji: 'Suutsukeesu ga omosugite, kaidan wo hitori de hakobenai.',
        vietnamese: 'Chiếc vali quá nặng khiến tôi không thể một mình khuân lên cầu thang được.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Tâm lý & Tình cảm ngột ngạt)',
        japanese: '毎日何十通も連絡を要求する彼女の束縛は、彼にとって「重い」と感じられた。',
        reading: 'まいにちなんじゅっつうもれんらくをようきゅうするかのじょのそくばくは、かれにとって「おもい」とかんじられた。',
        romaji: 'Mainichi nanjuuttsuu mo renraku wo youkyuu suru kanojo no sokubaku wa, kare ni totte 「omoi」 to kanjirareta.',
        vietnamese: 'Sự kiểm soát bắt buộc phải nhắn tin hàng chục lần mỗi ngày của bạn gái khiến anh ấy cảm thấy tình cảm này quá "nặng nề ngột ngạt".'
      }
    ],
    relatedCollocations: ['重い女 / 重い男 (omoi onna / omoi otoko - người yêu kiểm soát ngột ngạt)', '気が重い (ki ga omoi - lòng nặng trĩu)', '口が重い (kuchi ga omoi - kiệm lời)', '責任が重い (sekinin ga omoi - trách nhiệm nặng nề)'],
    synonyms: ['息苦しい (ikigurushii - ngột ngạt)', '深刻な (shinkoku na - nghiêm trọng)'],
    antonyms: ['軽い (karui - nhẹ / cởi mở nhẹ nhàng)', '気が楽 (ki ga raku - thanh thản)'],
    senseiExplanation: 'Cái gì nặng đè lên người thì làm cơ thể kiệt sức; tình cảm mà gánh nặng kỳ vọng quá lớn sẽ bóp nghẹt tự do của người mình yêu. Người Nhật rất sợ cảm giác làm phiền (Meiwaku) nên đặc biệt nhạy cảm với chữ "Omoi" này.'
  },
  {
    id: 'vocab_me_wo_tsuburu',
    word: '目をつぶる',
    reading: 'めをつぶる',
    furigana: '目[め]をつぶる',
    romaji: 'me wo tsuburu',
    hanViet: 'MỤC (NHẮM MẮT)',
    level: 'N2',
    partOfSpeech: 'Cụm động từ (Nhóm 1)',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Khép chặt hai mí mắt lại, không nhìn ra thế giới xung quanh.',
    figurativeMeaning: 'Nhắm mắt làm ngơ, giả vờ như không thấy, tha thứ hoặc bỏ qua cho một lỗi lầm nhỏ, khuyết điểm hoặc sự cố tình làm trái quy định nhẹ.',
    simpleMeaning: 'Nhắm mắt làm ngơ',
    primaryMeaning: 'Giả vờ như không thấy, tha thứ và bỏ qua cho một lỗi lầm nhỏ hoặc khuyết điểm không quá nghiêm trọng nhằm giữ hòa khí.',
    meaningPoints: [
      '① Nhắm mắt thể chất (không nhìn thấy gì)',
      '② Nhắm mắt làm ngơ, tha thứ lỗi lầm nhỏ của cấp dưới hoặc đồng nghiệp (大目に見る)',
      '③ Ứng xử tinh tế trong văn hóa duy trì sự hòa thuận (Wa) của người Nhật'
    ],
    nuanceAndContext: 'Dùng trong quan hệ sếp - cấp dưới hoặc đối tác thân thiết: Khi một sai sót nhỏ xảy ra không gây hậu quả lớn, người ta chọn "nhắm mắt" để giữ hòa khí.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Cử động mí mắt)',
        japanese: 'まぶしい日差しを浴びて、思わず目をつぶった。',
        reading: 'まぶしいひざしをあびて、おもわずめをつぶった。',
        romaji: 'Mabushii hizashi wo abite, omowazu me wo tsubutta.',
        vietnamese: 'Bị ánh nắng chói chang chiếu thẳng vào mặt, tôi bất giác nhắm tịt mắt lại.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Nhắm mắt bỏ qua)',
        japanese: '新入社員の初めてのミスだから、今回だけは目をつぶることにしよう。',
        reading: 'しんにゅうしゃいんのはじめてのミスだから、こんかいだけはめをつぶることにしよう。',
        romaji: 'Shinnyuushain no hajimete no misu dakara, konkai dake wa me wo tsuburu koto ni shiyou.',
        vietnamese: 'Vì đây là lỗi đầu tiên của nhân viên mới, nên lần này chúng ta hãy nhắm mắt bỏ qua cho cậu ấy.'
      }
    ],
    relatedCollocations: ['大目に見る (oome ni miru - rộng lượng bỏ qua)', '目を瞑る (cách viết chữ Hán của me wo tsuburu)'],
    synonyms: ['見逃す (minogasu - bỏ qua, làm ngơ)', '不問に付す (fumon ni fusu - không truy cứu)'],
    antonyms: ['目を光らせる (me wo hikaraseru - soi mói cảnh giác)', '厳しく追及する (kibishiku tsuikyuu suru)'],
    senseiExplanation: 'Người Nhật chuộng sự hoàn hảo, nhưng trong ứng xử nhân sinh, họ hiểu đạo lý "Nước trong quá thì không có cá, người xét nét quá thì không có bạn". Biết lúc nào nên mở mắt và lúc nào nên "nhắm mắt" là đỉnh cao của sự thấu hiểu.'
  },
  {
    id: 'vocab_me_ga_nai',
    word: '目がない',
    reading: 'めがない',
    furigana: '目[め]がない',
    romaji: 'me ga nai',
    hanViet: 'MỤC VÔ (KHÔNG CÓ MẮT)',
    level: 'N3',
    partOfSpeech: 'Quán dụng ngữ',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Không có đôi mắt trên gương mặt, bị mù lòa không thể nhìn.',
    figurativeMeaning: '1. Cực kỳ say mê, mê mẩn cuồng nhiệt một món ăn hoặc sở thích đến mức mất khả năng phán đoán logic hay kiềm chế ("nghiện", "mê tít thò lò"). 2. Thiếu khả năng thẩm định.',
    simpleMeaning: 'Mê tít, nghiện',
    primaryMeaning: 'Quá say mê, đam mê cuồng nhiệt một món ăn hoặc sở thích đến mức mất khả năng kiềm chế hay phán đoán khách quan.',
    meaningPoints: [
      '① Mê mẩn tột độ món ăn/sở thích (甘いものに目がない - Cực mê đồ ngọt)',
      '② Thiếu mắt nhìn, không có khả năng thẩm định đánh giá chuẩn xác',
      '③ Thường xuyên xuất hiện trong phần bài thi từ vựng JLPT N3-N2'
    ],
    nuanceAndContext: 'Cực kỳ phổ biến trong đời sống: "甘いものに目がない" (Tôi cực kỳ mê đồ ngọt), "ラーメンに目がない" (Mê mì ramen). Rất hay thi trong JLPT N3-N2.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen',
        japanese: 'だるまの置物には、まだ両目が描かれていない。',
        reading: 'だるまのおきものには、まだりょうめがかかれていない。',
        romaji: 'Daruma no okimono ni wa, mada ryoume ga kakarete inai.',
        vietnamese: 'Trên bức tượng lật đật Daruma, hai con mắt vẫn chưa được vẽ vào.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Mê mẩn cuồng nhiệt)',
        japanese: '母は甘いスイーツに目がなくて、新作ケーキを見ると買わずにはいられない。',
        reading: 'はははあまいスイーツにめがなくて、しんさくケーキをみるとかわずにはいられない。',
        romaji: 'Haha wa amai suiitsu ni me ga nakute, shinsaku keeki wo miru to kawazu ni wa irarenai.',
        vietnamese: 'Mẹ tôi cực kỳ mê đồ ngọt, cứ hễ thấy loại bánh kem mới ra mắt là không thể kiềm chế được việc mua.'
      }
    ],
    relatedCollocations: ['〜に目がない (cực kỳ mê mẩn thứ gì)', '目利き (mekiki - người sành sỏi thẩm định)', '目が利く (me ga kiku - tinh mắt chọn đồ tốt)'],
    synonyms: ['大好物だ (daikoubutsu da - món khoái khẩu)', '夢中になる (muchuu ni naru - say sưa)'],
    antonyms: ['見向きもしない (mimuki mo shinai - chẳng thèm đoái hoài)', '無関心 (mukanchin)'],
    senseiExplanation: 'Khi quá say mê một thứ gì đó, đôi mắt bị che mờ, không còn nhìn thấy khuyết điểm hay cân nhắc giá cả nữa; người Nhật ví von người đó như thể "không còn đôi mắt tỉnh táo".'
  },
  {
    id: 'vocab_mimi_ga_itai',
    word: '耳が痛い',
    reading: 'みみがいたい',
    furigana: '耳[みみ]が 痛[いた]い',
    romaji: 'mimi ga itai',
    hanViet: 'NHĨ THỐNG',
    level: 'N2',
    partOfSpeech: 'Quán dụng ngữ',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Vành tai hoặc ống tai bị đau buốt do viêm nhiễm hoặc âm thanh chói tai.',
    figurativeMeaning: 'Lời thật mất lòng; cảm giác ngượng ngùng đau nhói trong lòng khi nghe người khác chỉ trích đúng điểm yếu hoặc sai lầm xác đáng của mình.',
    simpleMeaning: 'Lời thật mất lòng',
    primaryMeaning: 'Cảm thấy ngượng ngùng và đau lòng khi nghe người khác chỉ trích trúng phóc khuyết điểm hoặc sai lầm xác đáng của mình.',
    meaningPoints: [
      '① Bị chọc trúng chỗ đau, nghe lời phê bình đúng tim đen',
      '② Tương đương câu tục ngữ "Thuốc đắng dã tật, sự thật mất lòng"',
      '③ Thể hiện thái độ nghiêm túc tiếp thu lời khuyên của người có lòng tự trọng'
    ],
    rootExpansion: [
      {
        word: '耳を傾ける',
        reading: 'みみをかたむける',
        furigana: '耳[みみ]を 傾[かたむ]ける',
        romaji: 'mimi wo katamukeru',
        meaning: 'Lắng nghe chân thành, chăm chú tiếp thu ý kiến',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '耳が早い',
        reading: 'みみがはやい',
        furigana: '耳[みみ]が 早[はや]い',
        romaji: 'mimi ga hayai',
        meaning: 'Thính tai, nhanh nhạy nắm bắt tin tức thời sự',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '耳を疑う',
        reading: 'みみをうたがう',
        furigana: '耳[みみ]を 疑[うたが]う',
        romaji: 'mimi wo utagau',
        meaning: 'Không tin nổi vào tai mình vì quá đỗi kinh ngạc',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '小耳に挟む',
        reading: 'こみみにはさむ',
        furigana: '小耳[こみみ]に 挟[はさ]む',
        romaji: 'komimi ni hasamu',
        meaning: 'Tình cờ nghe lỏm được phong thanh tin đồn',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '初耳',
        reading: 'はつみみ',
        furigana: '初耳[はつみみ]',
        romaji: 'hatsumimi',
        meaning: 'Lần đầu tiên mới được nghe biết đến',
        relationType: 'Phái sinh'
      },
      {
        word: '耳を塞ぐ',
        reading: 'みみをふさぐ',
        furigana: '耳[みみ]を 塞[ふさ]ぐ',
        romaji: 'mimi wo fusagu',
        meaning: 'Bịt tai lại, trốn tránh không muốn nghe sự thật',
        relationType: 'Quán dụng ngữ'
      }
    ],
    nuanceAndContext: 'Dùng khi cấp trên, giáo viên hoặc bạn thân đưa ra lời nhận xét thẳng thắn, dù khó nghe nhưng hoàn toàn chính xác.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Viêm tai)',
        japanese: '中耳炎にかかってしまい、朝から右の耳が痛くてたまらない。',
        reading: 'ちゅうじえんにかかってしまい、あさからみぎのみみがいたくてたまらない。',
        romaji: 'Chuujien ni kakatte shimai, asa kara migi no mimi ga itakute tamaranai.',
        vietnamese: 'Tôi bị viêm tai giữa nên từ sáng đến giờ tai phải đau buốt không chịu nổi.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Lời phê bình thẳng thắn)',
        japanese: '先輩からの指摘は耳が痛い話ばかりだが、すべて自分の成長のために必要なことだ。',
        reading: 'せんぱいからのしてきはみみがいたいのはなしばかりだが、すべてじぶんのせいちょうのためにひつようなことだ。',
        romaji: 'Sempai kara no shiteki wa mimi ga itai hanashi bakari da ga, subete jibun no seichou no tame ni hitsuyou na koto da.',
        vietnamese: 'Những lời chỉ ra của tiền bối toàn là lời thật mất lòng nghe đau điếng, nhưng tất cả đều cần thiết cho sự trưởng thành của bản thân.'
      }
    ],
    relatedCollocations: ['耳が痛い忠告 (mimi ga itai chuukoku - lời khuyên chọc đúng chỗ nhột)', '耳を傾ける (mimi wo katamukeru - lắng nghe)'] ,
    synonyms: ['痛いところを突かれる (itai tokoro wo tsukareru - bị đâm trúng chỗ đau)', '図星を突かれる (đoán trúng tim đen)'],
    antonyms: ['耳に心地よい (mimi ni kokochiyoi - êm tai nịnh nọt)', '聞き流す (kikinagasu - bỏ ngoài tai)'],
    senseiExplanation: 'Lời nịnh hót thì êm tai như rót mật, nhưng chỉ có lời nói "làm đau tai" mới giúp con người thức tỉnh và hoàn thiện bản thân.'
  },
  {
    id: 'vocab_kubi_wo_nagaku',
    word: '首を長くする',
    reading: 'くびをながくする',
    furigana: '首[くび]を 長[なが]くする',
    romaji: 'kubi wo nagaku suru',
    hanViet: 'THỦ TRƯỜNG',
    level: 'N3',
    partOfSpeech: 'Cụm động từ (Nhóm 3)',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Vươn dài cái cổ ra hết mức có thể.',
    figurativeMeaning: 'Mòn mỏi ngóng trông, dài cổ chờ đợi điều gì đó với tâm trạng tha thiết, mong mỏi từng giây từng phút. Thường dùng dạng: 首を長くして待つ.',
    simpleMeaning: 'Dài cổ ngóng trông',
    primaryMeaning: 'Mòn mỏi ngóng trông, tha thiết mong đợi một sự việc, tin tức hoặc người nào đó xuất hiện với sự sốt ruột và kỳ vọng cao độ.',
    meaningPoints: [
      '① Kiễng chân vươn cổ ngóng chờ từng giây từng phút',
      '② Thường kết hợp ở dạng: 首を長くして待つ (dài cổ ngóng chờ)',
      '③ Dùng trong đời sống cá nhân, công sở khi ngóng kết quả, quà tặng, tin tức'
    ],
    rootExpansion: [
      {
        word: '首にする',
        reading: 'くびにする',
        furigana: '首[くび]にする',
        romaji: 'kubi ni suru',
        meaning: 'Sa thải, đuổi việc nhân viên',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '首になる',
        reading: 'くびになる',
        furigana: '首[くび]になる',
        romaji: 'kubi ni naru',
        meaning: 'Bị sa thải, bị mất việc làm',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '首が回らない',
        reading: 'くびがまわらない',
        furigana: '首[くび]が 回[まわ]らない',
        romaji: 'kubi ga mawaranai',
        meaning: 'Nợ nần ngập đầu, túng quẫn tài chính không xoay xở nổi',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '首をかしげる',
        reading: 'くびをかしげる',
        furigana: '首[くび]をかしげる',
        romaji: 'kubi wo kashigeru',
        meaning: 'Nghiêng đầu băn khoăn, nghi ngờ hoài nghi',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '首を突っ込む',
        reading: 'くびをつっこむ',
        furigana: '首[くび]を 突[つ]っ 込[こ]む',
        romaji: 'kubi wo tsukkomu',
        meaning: 'Xía mũi, can thiệp vào chuyện riêng của người khác',
        relationType: 'Quán dụng ngữ'
      }
    ],
    nuanceAndContext: 'Rất hay xuất hiện trong văn viết và giao tiếp thường nhật khi chờ đợi kết quả thi cử, bưu kiện, chuyến du lịch hoặc người thương phương xa.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Loài hươu cao cổ)',
        japanese: 'キリンは高い木の葉を食べるために、首を長く伸ばした。',
        reading: 'キリンはたかいきのはをたべるために、くびをながくのばした。',
        romaji: 'Kirin wa takai ki no ha wo taberu tame ni, kubi wo nagaku nobashita.',
        vietnamese: 'Con hươu cao cổ vươn dài cổ lên cao để ăn những chiếc lá cây trên ngọn.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Mòn mỏi ngóng chờ)',
        japanese: '合格発表の日を、家族みんなで首を長くして待っていた。',
        reading: 'ごうかくはっぴょうのひを、かぞくみんなでくびをながくしてまっていた。',
        romaji: 'Goukaku happyou no hi wo, kazoku minna de kubi wo nagaku shite matte ita.',
        vietnamese: 'Cả gia đình tôi ai nấy đều dài cổ ngóng trông từng ngày từng giờ kết quả công bố đỗ kỳ thi.'
      }
    ],
    relatedCollocations: ['首を長くして待つ (kubi wo nagaku shite matsu - dài cổ ngóng chờ)', '待ち焦がれる (machikogareru - mòn mỏi mong ngóng)'],
    synonyms: ['心待ちにする (kokoromachi ni suru - hồi hộp chờ đợi)', '今か今かと待つ'],
    antonyms: ['待ちくたびれる (machikutabireru - chờ đợi đến mệt mỏi chán chường)'],
    senseiExplanation: 'Khi ngóng người thân từ đằng xa trên con đường làng xưa, người ta thường kiễng chân và rướn cổ lên cao để nhìn xuyên qua đám đông. Từ đó hình thành nên thành ngữ "kéo dài cổ để đợi".'
  },
  {
    id: 'vocab_ashi_ga_bou',
    word: '足が棒になる',
    reading: 'あしがぼうになる',
    furigana: '足[あし]が 棒[ぼう]になる',
    romaji: 'ashi ga bou ni naru',
    hanViet: 'TÚC BỔNG',
    level: 'N3',
    partOfSpeech: 'Quán dụng ngữ',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Đôi chân biến thành một thanh gỗ thẳng đuột, cứng đờ không co gập lại được.',
    figurativeMeaning: 'Chân mỏi nhừ, mỏi rã rời, tê dại như hai khúc gỗ sau khi phải đi bộ hoặc đứng yên một chỗ quá lâu.',
    simpleMeaning: 'Chân mỏi nhừ',
    primaryMeaning: 'Đôi chân mệt mỏi cực độ, căng cứng và mất đi cảm giác linh hoạt sau thời gian dài đi bộ, leo núi hoặc đứng làm việc.',
    meaningPoints: [
      '① Chân căng cơ mỏi nhừ không nhấc lên nổi',
      '② Cảm giác chân như thanh gậy cứng nhắc mất độ đàn hồi',
      '③ Dùng sau khi đi bộ mua sắm, du lịch, đứng bán hàng hoặc leo núi cả ngày'
    ],
    nuanceAndContext: 'Cực kỳ phổ biến sau một ngày đi mua sắm, leo núi, công tác xa hoặc xếp hàng lễ hội tại Nhật Bản.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Hình tượng so sánh)',
        japanese: '案山子の足は、地面に突き刺さった一本の木の棒でできている。',
        reading: 'かかしのあしは、じめんにつきささったいっぽんのきのぼうでできている。',
        romaji: 'Kakashi no ashi wa, jimen ni tsukisasatta ippon no ki no bou de dekite iru.',
        vietnamese: 'Chân của con bù nhìn rơm được làm từ một thanh gậy gỗ cắm chặt xuống đất.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Mỏi rã rời)',
        japanese: '一日中ディズニーランドを歩き回ったので、足が棒になってしまった。',
        reading: 'いちにちじゅうディズニーランドをあるきまわったので、あしがぼうになってしまった。',
        romaji: 'Ichinichijuu Dizuniirando wo arukimawatta node, ashi ga bou ni natte shimatta.',
        vietnamese: 'Vì đi bộ suốt cả ngày quanh khu công viên Disneyland nên hai chân tôi đã mỏi nhừ như hai khúc gỗ.'
      }
    ],
    relatedCollocations: ['足を棒にして歩く (ashi wo bou ni shite aruku - đi mòn cả chân để tìm kiếm)'],
    synonyms: ['足が疲労困憊する (chân kiệt sức)', '足がくたくただ (chân rã rời)'],
    antonyms: ['足取りが軽い (ashidori ga karui - bước chân thoăn thoắt nhẹ nhàng)'],
    senseiExplanation: 'Cơ bắp khi tích tụ axit lactic sau chuyến hành hương dài ngày sẽ căng cứng và mất đi độ đàn hồi linh hoạt, giống hệt một thanh gậy (棒 - bō).'
  },
  {
    id: 'vocab_neko_no_te',
    word: '猫の手も借りたい',
    reading: 'ねこのてもかりたい',
    furigana: '猫[ねこ]の 手[て]も 借[か]りたい',
    romaji: 'neko no te mo karitai',
    hanViet: 'MIÊU THỦ TÁ (MUỐN MƯỢN CẢ TAY MÈO)',
    level: 'N5',
    partOfSpeech: 'Quán dụng ngữ',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Bận đến mức muốn mượn luôn cả bàn chân trước vụng về của loài mèo để phụ giúp công việc.',
    figurativeMeaning: 'Cực kỳ bận rộn, bận tối tăm mặt mũi, thiếu nhân lực nghiêm trọng đến mức ai giúp được gì cũng hoan nghênh dù chỉ là việc vặt.',
    simpleMeaning: 'Bận tối mắt',
    primaryMeaning: 'Tình trạng công việc dồn dập quá tải, thiếu nhân lực cấp bách đến độ bất kỳ sự trợ giúp nào (dù nhỏ bé, vụng về nhất) cũng vô cùng quý giá.',
    meaningPoints: [
      '① Biểu thị sự bận rộn cao điểm, thiếu người làm việc',
      '② Thường dùng vào mùa cao điểm (繁忙期) công sở, nhà hàng',
      '③ Cách nói dí dỏm, tạo sự thông cảm tự nhiên trong giao tiếp tiếng Nhật'
    ],
    rootExpansion: [
      {
        word: '猫舌',
        reading: 'ねこじた',
        furigana: '猫舌[ねこじた]',
        romaji: 'nekojita',
        meaning: 'Người sợ ăn đồ nóng, lưỡi mèo',
        relationType: 'Phái sinh'
      },
      {
        word: '猫背',
        reading: 'ねこぜ',
        furigana: '猫背[ねこぜ]',
        romaji: 'nekoze',
        meaning: 'Lưng gù như lưng mèo, dáng đi khom người',
        relationType: 'Phái sinh'
      },
      {
        word: '猫をかぶる',
        reading: 'ねこをかぶる',
        furigana: '猫[ねこ]をかぶる',
        romaji: 'neko wo kaburu',
        meaning: 'Giả nai, làm ra vẻ ngoan ngoãn hiền thục để che giấu tâm tính',
        relationType: 'Quán dụng ngữ'
      },
      {
        word: '猫に小判',
        reading: 'ねこにこばん',
        furigana: '猫[ねこ]に 小判[こばん]',
        romaji: 'neko ni koban',
        meaning: 'Đem vàng cho mèo, uổng phí giá trị với kẻ không biết quý',
        relationType: 'Thành ngữ'
      },
      {
        word: '借りてきた猫',
        reading: 'かりてきたねこ',
        furigana: '借[か]りてきた 猫[ねこ]',
        romaji: 'karitekita neko',
        meaning: 'Ngoan ngoãn, im phăng phắc một cách bất thường ở nơi lạ',
        relationType: 'Quán dụng ngữ'
      }
    ],
    nuanceAndContext: 'Thành ngữ kinh điển cấp độ sơ cấp N5 mà bất kỳ người học tiếng Nhật nào cũng yêu thích và bắt gặp trong giao tiếp hàng ngày.',
    examples: [
      {
        type: 'literal',
        label: 'Hình ảnh ngộ nghĩnh (Loài mèo)',
        japanese: '猫の前足を借りても、字を書くことも書類を整理することもできない。',
        reading: 'ねこのまえあしをかりても、じをかくこともしょるいをせいりすることもできない。',
        romaji: 'Neko no maeashi wo karitemo, ji wo kaku koto mo shorui wo seiri suru koto mo dekinai.',
        vietnamese: 'Dù có mượn được chân trước của chú mèo thì mèo cũng chẳng thể viết chữ hay sắp xếp giấy tờ được.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Bận rộn công sở)',
        japanese: '年末の繁忙期は猫の手も借りたいほど忙しく、休憩を取る暇すらない。',
        reading: 'ねんまつのはんぼうきはねこのてもかりたいほどいそがしく、きゅうけいをとるひますらない。',
        romaji: 'Nemmatsu no hambouki wa neko no te mo karitai hodo isogashiku, kyuukei wo toru hima sura nai.',
        vietnamese: 'Mùa cao điểm cuối năm bận tối mắt tối mũi muốn mượn cả tay mèo, đến thời gian nghỉ giải lao cũng chẳng có.'
      }
    ],
    relatedCollocations: ['猫の手も借りたい忙しさ (sự bận rộn đến mức muốn mượn tay mèo)', '手不足 (tebusoku - thiếu nhân lực)'],
    synonyms: ['多忙を極める (tabou wo kiwameru - bận rộn tột độ)', 'てんてこ舞い (tentekomai - quay cuồng bận rộn)'],
    antonyms: ['手持ち無沙汰 (temochibusata - rảnh rỗi không có việc làm)', '暇を持て余す (hima wo moteamasu)'],
    senseiExplanation: 'Mèo là loài thú cưng thích ngủ nướng và không làm việc đồng áng. Người nông dân thời xưa thốt lên muốn mượn bàn chân mèo để nói lên mức độ quá tải tột cùng của công việc thu hoạch.'
  },
  {
    id: 'vocab_atama_ga_itai',
    word: '頭が痛い',
    reading: 'あたまがいたい',
    furigana: '頭[あたま]が 痛[いた]い',
    romaji: 'atama ga itai',
    hanViet: 'ĐẦU THỐNG',
    level: 'N5',
    partOfSpeech: 'Quán dụng ngữ / Cụm tính từ',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Phần đầu bị đau nhức về mặt sinh học cơ thể (do cảm cúm, sốt, thiếu ngủ).',
    figurativeMeaning: 'Gặp vấn đề hóc búa nan giải, phiền não âu lo vì không tìm ra giải pháp tháo gỡ khó khăn trong đời sống hoặc công việc.',
    simpleMeaning: 'Đau đầu',
    primaryMeaning: 'Tâm trạng phiền não, lo âu sâu sắc trước một bài toán khó khăn, trách nhiệm nặng nề hoặc rắc rối chưa có hướng tháo gỡ.',
    meaningPoints: [
      '① Vừa có nghĩa vật lý (nhức đầu, cảm sốt), vừa có nghĩa ẩn dụ (đau đầu nan giải)',
      '② Rất thường dùng khi nói về bài toán tài chính, nhân sự, học hành, gia đình',
      '③ Thành ngữ họ hàng: 頭痛の種 (nguồn gốc gây nhức đầu)'
    ],
    nuanceAndContext: 'Dùng từ trình độ N5 để diễn đạt cả triệu chứng y tế lẫn nỗi trăn trở suy tư hàng ngày.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Cảm sốt)',
        japanese: '風邪を引いて熱があり、朝から頭がズキズキ痛い。',
        reading: 'かぜをひいてねつがあり、あさからあたまがズキズキいたい。',
        romaji: 'Kaze wo hiite netsu ga ari, asa kara atama ga zukizuki itai.',
        vietnamese: 'Tôi bị cảm sốt, từ sáng đến giờ đầu cứ đau nhức buốt từng cơn.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Vấn đề tài chính, công việc)',
        japanese: '来月の学費と家賃をどう工面するか、考えれば考えるほど頭が痛い問題だ。',
        reading: 'らいげつのがくひとやちんをどうくめんするか、かんがえればかんがえるほどあたまがいたいもんだいだ。',
        romaji: 'Raigetsu no gakuhi to yachin wo dou kumen suru ka, kangaereba kangaeru hodo atama ga itai mondai da.',
        vietnamese: 'Làm thế nào để xoay xở tiền học phí và tiền thuê nhà tháng tới, càng nghĩ càng là một vấn đề đau đầu nan giải.'
      }
    ],
    relatedCollocations: ['頭痛の種 (zutsuu no tane - căn nguyên gây đau đầu/rắc rối)', '頭を抱える (atama wo kakaeru - ôm đầu bế tắc)'],
    synonyms: ['悩みの種 (nayami no tane - nỗi bận tâm)', '頭を悩ます (atama wo nayamasu)'],
    antonyms: ['頭がすっきりする (đầu óc nhẹ nhõm sảng khoái)', '胸をなでおろす (thở phào nhẹ nhõm)'],
    senseiExplanation: 'Khi não bộ phải xử lý quá nhiều căng thẳng âu lo (stress), tuần hoàn máu căng thẳng tạo cảm giác đau đầu thực sự. Người Nhật dùng chính cảm giác đó để biểu đạt mọi bài toán cuộc đời.'
  },
  {
    id: 'vocab_ashi_ga_deru',
    word: '足が出る',
    reading: 'あしがでる',
    furigana: '足[あし]が 出[で]る',
    romaji: 'ashi ga deru',
    hanViet: 'TÚC XUẤT',
    level: 'N5',
    partOfSpeech: 'Quán dụng ngữ',
    category: 'Công Sở & Đàm Phán',
    literalMeaning: 'Bàn chân thò ra ngoài tấm chăn đắp khi ngủ vào mùa đông vì chăn quá ngắn.',
    figurativeMeaning: 'Chi tiêu vượt quá ngân sách dự kiến, bị thâm hụt tiền bạc hoặc bội chi trong dự án kinh doanh hay sinh hoạt gia đình.',
    simpleMeaning: 'Bội chi ngân sách, thâm hụt tiền bạc',
    primaryMeaning: 'Hiện tượng chi tiêu, phát sinh chi phí vượt khỏi hạn mức dự toán ban đầu, dẫn đến tình trạng thâm hụt tiền túi hoặc lỗ vốn.',
    meaningPoints: [
      '① Vượt quá dự toán ngân sách (予算オーバー)',
      '② Rơi vào tình trạng âm tiền/thâm hụt tài chính',
      '③ Dùng linh hoạt từ chi tiêu mua sắm cá nhân đến quyết toán dự án công ty'
    ],
    nuanceAndContext: 'Thành ngữ tài chính bỏ túi cực kỳ thiết thực cho người đi làm hoặc du học sinh kiểm soát ví tiền tại Nhật Bản.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Giấc ngủ mùa đông)',
        japanese: '布団が小さすぎて、寝ている間に足が出て冷えてしまった。',
        reading: 'ふとんがちいさすぎて、ねているあいだにあしがでてひえてしまった。',
        romaji: 'Futon ga chiisasugite, nete iru aida ni ashi ga dete hiete shimatta.',
        vietnamese: 'Tấm đệm quá ngắn nên trong lúc ngủ bàn chân tôi bị thò ra ngoài và lạnh cóng.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Bội chi ngân sách du lịch / dự án)',
        japanese: '旅行中に買い物をしすぎて、当初の予算から２万円も足が出てしまった。',
        reading: 'りょこうちゅうにかいものをしすぎて、とうしょのよさんからにまんえんもあしがでてしまった。',
        romaji: 'Ryokouchuu ni kaimono wo shisugite, tousho no yosan kara niman-en mo ashi ga dete shimatta.',
        vietnamese: 'Trong chuyến du lịch tôi lỡ mua sắm quá tay nên đã bị bội chi thâm hụt tới 2 vạn yên so với ngân sách ban đầu.'
      }
    ],
    relatedCollocations: ['予算から足が出る (yosan kara ashi ga deru - chi tiêu vượt ngân sách)', '赤字になる (akaji ni naru - bị lỗ)'],
    synonyms: ['予算オーバー (yosan oobaa - vượt ngân sách)', '赤字 (akaji)'],
    antonyms: ['黒字 (kuroji - thặng dư có lãi)', '予算内に収まる (nằm gọn trong ngân sách)'],
    senseiExplanation: 'Khi tấm chăn ngân sách không đủ che kín mọi khoản chi, phần "chân" sẽ bị lòi ra ngoài. Hình tượng ví von mộc mạc thời xưa đã trở thành thuật ngữ quản trị tài chính dí dỏm.'
  },
  {
    id: 'vocab_kosoku',
    word: '姑息',
    reading: 'こそく',
    furigana: '姑息[こそく]',
    romaji: 'kosoku',
    hanViet: 'CÔ TỨC',
    level: 'N1',
    partOfSpeech: 'Danh từ / Tính từ đuôi な',
    category: 'Đề Thi & Bẫy Từ Vựng',
    literalMeaning: '姑 là tạm thời (nhất thời), 息 là nghỉ ngơi, thở phào chốc lát.',
    figurativeMeaning: 'Biện pháp chắp vá tạm thời, giải pháp đối phó nhất thời không giải quyết tận gốc rễ vấn đề (BẪY JLPT N1: Người trẻ hay nhầm là hèn hạ, xảo quyệt). Thường dùng dạng: 姑息な手段 (kế sách đối phó tạm bợ).',
    simpleMeaning: 'Giải pháp đối phó tạm bợ, chắp vá nhất thời',
    primaryMeaning: 'Biện pháp tạm bợ, chắp vá trong chốc lát để đối phó tình thế trước mắt mà không giải quyết được căn nguyên gốc rễ của vấn đề.',
    meaningPoints: [
      '① BẪY ĐỀ THI JLPT N1 KINH ĐIỂN: Hơn 70% người Nhật trẻ nhầm thành "hèn hạ, bẩn thỉu (卑怯)", nhưng đáp án đúng thi JLPT N1 là "đối phó tạm thời (一時しのぎ)"',
      '② Nghĩa từ nguyên: 姑 (tạm thời) + 息 (thở phào) = Chỉ tạm nghỉ giải lao qua mắt tình thế',
      '③ Thường kết hợp: 姑息な手段 (kế sách chắp vá), 姑息な対応 (đối phó tạm thời)'
    ],
    nuanceAndContext: 'Cực kỳ hay xuất hiện trong phần chọn từ đồng nghĩa hoặc câu dùng đúng từ của kỳ thi JLPT N1. Nếu chọn nghĩa "hèn hạ xảo trá" là trúng bẫy điểm liệt ngay lập tức.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa từ nguyên (Tạm thở phào)',
        japanese: '問題の根本解決を後回しにして、姑息の安寧を貪るべきではない。',
        reading: 'もんだいのこんぽんかいけつをあとまわしにして、こそくのあんねいをむさぼるべきではない。',
        romaji: 'Mondai no kompon kaiketsu wo atomawashi ni shite, kosoku no annei wo musaboru beki dewa nai.',
        vietnamese: 'Không nên gác lại việc giải quyết gốc rễ vấn đề chỉ để tham lam chút bình yên chắp vá tạm thời.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng đề thi N1 (Kế sách chắp vá)',
        japanese: '数字をごまかしてその場をしのぐような姑息な手段を使っても、いずれ破綻するのは目に見えている。',
        reading: 'すうじをごまかしてそのばをしのぐようなこそくなしゅだんをつかっても、いずれはたんするのはめ にみえている。',
        romaji: 'Suuji wo gomakashite sono ba wo shinogu you na kosoku na shudan wo tsukattemo, izure hatan suru no wa me ni miete iru.',
        vietnamese: 'Dù có dùng thủ thuật chắp vá đối phó tạm bợ như xào nấu số liệu để qua mặt nhất thời, thì việc đổ vỡ sớm muộn cũng thấy rõ trước mắt.'
      }
    ],
    relatedCollocations: ['姑息な手段 (kosoku na shudan - thủ đoạn đối phó tạm thời)', '姑息療法 (kosoku ryouhou - liệu pháp xoa dịu triệu chứng tạm thời)'],
    synonyms: ['一時しのぎ (ichiji shinogi - giải pháp nhất thời)', 'その場しのぎ (sono ba shinogi)', '当座逃れ (touzanogare)'],
    antonyms: ['抜本的 (bapponteki - triệt để tận gốc)', '根本的解決 (komponteki kaiketsu)'],
    senseiExplanation: 'Giáo sư Yamato lưu ý: Trong bài thi JLPT N1, hễ thấy "姑息" thì tìm ngay phương án có chữ "一時しのぎ" hoặc "その場しのぎ" để khoanh đáp án đúng 100% trong 5 giây!'
  },
  {
    id: 'vocab_kiyuu',
    word: '杞憂',
    reading: 'きゆう',
    furigana: '杞憂[きゆう]',
    romaji: 'kiyuu',
    hanViet: 'KỈ ƯU',
    level: 'N1',
    partOfSpeech: 'Danh từ / Động từ nhóm 3 (杞憂に終わる)',
    category: 'Đề Thi & Bẫy Từ Vựng',
    literalMeaning: 'Điển tích thời Chiến Quốc: Người nước Kỉ (杞) suốt ngày lo sợ bầu trời sẽ sụp đổ đè chết mình.',
    figurativeMeaning: 'Nỗi lo hão huyền, sự lo âu thừa thãi vô căn cứ về những điều không có thật hoặc khó lòng xảy ra. Thường dùng dạng: 杞憂に終わる (kết thúc chỉ là nỗi lo hão).',
    simpleMeaning: 'Lo âu thừa thãi, nỗi lo hão huyền',
    primaryMeaning: 'Sự lo lắng thừa thãi, hoang mang vô căn cứ về những rủi ro hoặc biến cố viển vông không có thật trong thực tế.',
    meaningPoints: [
      '① Điển tích kinh điển: Người nước Kỉ sợ trời đất sụp đổ',
      '② Cụm từ bảo chứng trong đề thi N1: 杞憂に終わる (nỗi lo lắng hóa ra chỉ là hão huyền)',
      '③ Dùng để an ủi, giải tỏa áp lực tâm lý cho người thân hoặc đồng nghiệp'
    ],
    nuanceAndContext: 'Từ vựng sang trọng cấp cao thường gặp trong bài Đọc hiểu Dokkai N1 và bài phát biểu tổng kết dự án khi mọi sự đều bình an vô sự.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Điển tích cổ)',
        japanese: '古代中国の杞の国の人は、天が崩れ落ちてこないかと夜も眠れずに憂えたという。',
        reading: 'こだいちゅうごくのきのくにのひとは、てんがくずれおちてこないかとよるもねむれずにうれえたという。',
        romaji: 'Kodai chuugoku no ki no kuni no hito wa, ten ga kuzureochite konai ka to yoru mo nemurezu ni ureeta to iu.',
        vietnamese: 'Tương truyền người nước Kỉ thời Trung Quốc cổ đại đêm ngày mất ngủ vì âu lo không biết bầu trời có sụp đổ xuống hay không.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng thực tế (Dự án & Thi cử)',
        japanese: '台風で試験が中止になるのではないかと心配したが、結局は杞憂に終わって快晴となった。',
        reading: 'たいふうでしけんがちゅうしになるのではないかとしんぱいしたが、けっきょくはきゆうにおわってかいせいとなった。',
        romaji: 'Taifuu de shiken ga chuushi ni naru no dewa nai ka to shimpai shita ga, kekkyoku wa kiyuu ni owatte kaisei to natta.',
        vietnamese: 'Tôi từng nơm nớp lo kỳ thi sẽ bị hủy do bão, nhưng rốt cuộc mọi nỗi lo chỉ là hão huyền khi bầu trời lại hửng nắng trong xanh.'
      }
    ],
    relatedCollocations: ['杞憂に終わる (kiyuu ni owaru - kết thúc chỉ là nỗi lo hão)', '全くの杞憂 (mattaku no kiyuu - hoàn toàn chỉ là lo thừa)'],
    synonyms: ['取り越し苦労 (torikoshi gurou - lo bò trắng răng)', '余計な心配 (yokei na shimpai)'],
    antonyms: ['備えあれば憂いなし (sonae areba urei nashi - cẩn tắc vô ưu)', '的中する (tekichuu suru - trúng tim đen)'],
    senseiExplanation: 'Cảm xúc lo âu xuất phát từ trí tưởng tượng thái quá. Người đạt trình độ N1 biết phân biệt giữa "đề phòng rủi ro có tính toán (Kiki kanri)" và "nỗi lo hão vô ích (Kiyuu)".'
  },
  {
    id: 'vocab_kendo_chourai',
    word: '捲土重来',
    reading: 'けんどちょうらい',
    furigana: '捲土[けんど] 重来[ちょうらい]',
    romaji: 'kendo chourai',
    hanViet: 'QUYỂN THỔ TRÙNG LAI',
    level: 'N1',
    partOfSpeech: 'Thành ngữ 4 chữ (Yojijukugo)',
    category: 'Đề Thi & Bẫy Từ Vựng',
    literalMeaning: 'Cuộn tung cát bụi trên mặt đất (捲土) kéo quân quay trở lại (重来) với khí thế ngút trời.',
    figurativeMeaning: 'Thất bại nhưng không nản chí, dồn toàn tâm toàn lực tích lũy sức mạnh để quay trở lại phản công và giành chiến thắng rực rỡ hơn xưa.',
    simpleMeaning: 'Cuốn đất quay lại, làm lại mạnh mẽ hơn',
    primaryMeaning: 'Tinh thần kiên cường bất khuất, dốc sức tích lũy năng lực sau thất bại để quay trở lại phục thù và giành thắng lợi vang dội.',
    meaningPoints: [
      '① Thành ngữ 4 chữ tinh hoa N1: Thất bại tạm thời không khuất phục được ý chí người quân tử',
      '② Cụm từ chuyên dùng cho thí sinh thi lại JLPT quyết tâm đỗ N1 với điểm số thủ khoa',
      '③ Thường kết hợp: 捲土重来を期す (kendo chourai wo kisu - nung nấu ý chí cuốn đất quay lại)'
    ],
    nuanceAndContext: 'Thành ngữ truyền cảm hứng đỉnh cao của người Nhật. Rất hay xuất hiện trong văn học, thể thao và các bài xã luận báo chí kinh tế.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Chiến trận xưa)',
        japanese: '敗走した軍勢が猛烈な勢いで土煙を巻き上げながら、再び敵陣へと攻め寄せた。',
        reading: 'はいそうしたぐんぜいがもうれつないきおいでつちけむりをまきあげながら、ふたたびてきじんへとせめよせた。',
        romaji: 'Haisou shita gunzei ga mouretsu na ikioi de tsuchikemuri wo makiage nagara, futatabi tekijin e to semeyoseta.',
        vietnamese: 'Đoàn quân từng bại trận cuốn tung cát bụi mù mịt với khí thế mãnh liệt, một lần nữa tiến công áp sát vào sào huyệt quân địch.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Quyết tâm thi đỗ N1)',
        japanese: '昨年のJLPTでは悔し涙を呑んだが、捲土重来を期して猛勉強に励み、見事に満点で合格を果たした。',
        reading: 'さくねんのJLPTではくやしなみだをのんだが、けんどちょうらいをきしてもうべんきょうにはげみ、みごとにまんてんでごうかくをはたした。',
        romaji: 'Sakunen no JLPT dewa kuyashinamida wo nonda ga, kendo chourai wo kishite moubenkyou ni hagemi, migoto ni manten de goukaku wo hatashita.',
        vietnamese: 'Năm ngoái tôi từng ngậm ngùi nuốt nước mắt cay đắng khi trượt JLPT, nhưng với quyết tâm "cuốn đất làm lại", tôi đã dốc sức ôn luyện và xuất sắc đỗ thủ khoa điểm tuyệt đối.'
      }
    ],
    relatedCollocations: ['捲土重来を期す (nung nấu quyết tâm làm lại mạnh mẽ hơn)', '再起を図る (saiki wo hakaru - mưu cầu sự trỗi dậy)'],
    synonyms: ['臥薪嘗胆 (gashin shoutan - nếm mật nằm gai)', '名誉挽回 (meiyo bankai - lấy lại danh dự)'],
    antonyms: ['意気消沈 (iki shouchin - nhụt chí nản lòng)', '再起不能 (saiki funou - không thể gượng dậy)'],
    senseiExplanation: 'Người học tiếng Nhật chinh phục đỉnh cao N1 luôn cần tâm thái "捲土重来". Thất bại không phải là dấu chấm hết, mà là bước lùi chiến thuật để đà nhảy vọt xa hơn.'
  },
  {
    id: 'vocab_kakka_souyou',
    word: '隔靴掻痒',
    reading: 'かっかそうよう',
    furigana: '隔靴[かっか] 掻痒[そうよう]',
    romaji: 'kakka souyou',
    hanViet: 'CÁCH NGOA TAO DƯỠNG',
    level: 'N1',
    partOfSpeech: 'Thành ngữ 4 chữ (Yojijukugo)',
    category: 'Đề Thi & Bẫy Từ Vựng',
    literalMeaning: 'Bị ngứa chân nhưng lại thò tay gãi bên ngoài chiếc ủng da dày cộp (隔靴), không chạm tới chỗ ngứa.',
    figurativeMeaning: 'Cảm giác bứt rứt, bức bối khó chịu vì biện pháp đưa ra nửa vời, không gãi đúng chỗ ngứa hoặc ý kiến giải thích chưa đi thẳng vào bản chất cốt lõi.',
    simpleMeaning: 'Không gãi đúng chỗ ngứa, giải quyết nửa vời',
    primaryMeaning: 'Tình trạng giải quyết sự việc lưng chừng nửa vời, không chạm đúng vào cốt lõi vấn đề khiến người trong cuộc vô cùng bứt rứt khó chịu.',
    meaningPoints: [
      '① Thành ngữ 4 chữ biểu tượng cho sự bất lực khi giải pháp bị ngăn cách bởi lớp vỏ bọc bên ngoài',
      '② Dùng khi phê bình báo cáo lòng vòng không đi vào trọng tâm vấn đề',
      '③ Phản ánh tiêu chuẩn cao của người Nhật về tính triệt để (Tettei - 徹底)'
    ],
    nuanceAndContext: 'Dùng trong các bài nghị luận Dokkai N1 hoặc trong các cuộc họp kiểm điểm tiến độ khi sếp phàn nàn giải pháp chưa hiệu quả.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Gãi ngứa ngoài giày)',
        japanese: '長靴を履いたまま足の裏を掻いても、隔靴掻痒で痒みは一向に治まらない。',
        reading: 'ながぐつをはいたままあしのうらをかいても、かっかそうようでかゆみはいっこうにおさまらない。',
        romaji: 'Nagagutsu wo haita mama ashi no ura wo kaitemo, kakka souyou de kayumi wa ikkou ni osamaranai.',
        vietnamese: 'Vẫn xỏ đôi ủng dài mà thò tay gãi lòng bàn chân thì đúng là gãi ngứa ngoài giày, cơn ngứa chẳng hề thuyên giảm chút nào.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Phê bình báo cáo vòng vo)',
        japanese: '彼の提案は表面的な数字ばかりを並べており、問題の本質に切り込まない隔靴掻痒の感は否めない。',
        reading: 'かれのていあんはひょうめんてきなすうじばかりをならべており、もんだいのほんしつにきりこまないかっかそうようのかんはいなめない。',
        romaji: 'Kare no teian wa hyoumenteki na suuji bakari wo narabete ori, mondai no honshitsu ni kirikomanai kakka souyou no kan wa inamenai.',
        vietnamese: 'Bản đề xuất của anh ấy chỉ toàn liệt kê số liệu bề nổi, không thể phủ nhận cảm giác bứt rứt vì chẳng hề gãi trúng cốt lõi của vấn đề.'
      }
    ],
    relatedCollocations: ['隔靴掻痒の感 (cảm giác bứt rứt không gãi đúng chỗ ngứa)', '歯痒い (hayagui - bứt rứt nóng ruột)'],
    synonyms: ['もどかしい (modokashii - bứt rứt thiếu thỏa mãn)', '要領を得ない (youryou wo enai - không vào trọng tâm)'],
    antonyms: ['核心を突く (kakushin wo tsuku - đâm trúng trọng tâm)', '的を射る (mato wo iru - bắn trúng đích)'],
    senseiExplanation: 'Cảm giác khó chịu nhất trong học thuật là học nhiều mà không hiểu bản chất. GS. Yamato cam kết không bao giờ giải thích kiểu "隔靴掻痒", mà luôn mổ xẻ trực thấu gốc rễ!'
  },
  {
    id: 'vocab_mayu_wo_hisomeru',
    word: '眉をひそめる',
    reading: 'まゆをひそめる',
    furigana: '眉[まゆ]を ひそめる',
    romaji: 'mayu wo hisomeru',
    hanViet: 'MI TIÊU',
    level: 'N1',
    partOfSpeech: 'Quán dụng ngữ',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Co rút cơ mặt kéo hai hàng lông mày nhíu sát lại gần nhau.',
    figurativeMeaning: 'Nhíu mày cau mặt biểu thị sự bất bình, khó chịu, chê trách hoặc lo lắng sâu sắc trước một hành vi phản cảm hoặc hiện tượng đáng quan ngại.',
    simpleMeaning: 'Nhíu mày bất bình, không hài lòng',
    primaryMeaning: 'Hành động nhíu mày cau mặt thể hiện thái độ phản đối, chê trách, khó chịu hoặc bận tâm lo lắng trước hành vi khiếm nhã trong xã hội.',
    meaningPoints: [
      '① Phản xạ ngôn ngữ cơ thể tinh tế của người Nhật khi không tiện mở miệng chê trách trực tiếp',
      '② Rất thường xuất hiện trong đề thi Đọc hiểu và bài văn phê bình văn hóa xã hội N1',
      '③ Nhận biết sắc thái: Khi người Nhật đối diện nhíu mày, hãy tự giác dừng ngay hành vi'
    ],
    nuanceAndContext: 'Thành ngữ cơ thể cao cấp N1. Người Nhật rất ít khi lớn tiếng mắng mỏ ở nơi công cộng, thay vào đó họ "nhíu mày" để gửi tín hiệu cảnh cáo kín đáo.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (Nét mặt)',
        japanese: 'まぶしい日差しを手で遮りながら、彼は少し眉をひそめて空を見上げた。',
        reading: 'まぶしいひざしをてでさえぎりながら、かれはすこしまゆをひそめてそらをみあげた。',
        romaji: 'Mabushii hizashi wo te de saegiri nagara, kare wa sukoshi mayu wo hisomete sora wo miageta.',
        vietnamese: 'Vừa lấy tay che bớt ánh nắng chói chang, anh ấy vừa hơi nhíu mày ngước nhìn lên bầu trời.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Phê phán xã hội)',
        japanese: '電車内で大声で通話する若者のマナー違反に対して、周囲の乗客は皆眉をひそめていた。',
        reading: 'でんしゃないでおおごえでつうわするわかもののマナーいはんにたいして、しゅういのじょうきゃくはみなまゆをひそめていた。',
        romaji: 'Denshanai de oogoe de tsuuwa suru wakamono no manaa ihan ni taishite, shuui no joukyaku wa mina mayu wo hisomete ita.',
        vietnamese: 'Trước hành vi vô ý thức gọi điện thoại oang oang trên tàu điện của thanh niên nọ, các hành khách xung quanh ai nấy đều nhíu mày bất bình.'
      }
    ],
    relatedCollocations: ['眉をひそめる行為 (hành vi khiến người khác nhíu mày chê trách)', '顔をしかめる (kao wo shikameru - nhăn mặt)'],
    synonyms: ['不快感を示す (fukaikan wo shimesu - biểu thị sự khó chịu)', '白眼視する (hakuganshi suru)'],
    antonyms: ['目尻を下げる (mejiri wo sageru - cười tít mắt hài lòng)', '相好を崩す (sougou wo kuzusu)'],
    senseiExplanation: 'Cơ trán và lông mày là chiếc hàn thử biểu chân thực nhất của sự bất bình nội tâm. Đọc được nét nhíu mày của người Nhật là đỉnh cao của thuật "Kuuki wo yomu".'
  },
  {
    id: 'vocab_ashimoto_ni_mo_oyobanai',
    word: '足元にも及ばない',
    reading: 'あしもとにもおよばない',
    furigana: '足元[あしもと]にも 及[およ]ばない',
    romaji: 'ashimoto ni mo oyobanai',
    hanViet: 'TÚC NGUYÊN CẬP',
    level: 'N1',
    partOfSpeech: 'Quán dụng ngữ',
    category: 'Thành Ngữ Cơ Thể',
    literalMeaning: 'Chiều cao hoặc tầm với của bản thân thậm chí còn chưa chạm tới nổi mắt cá chân của đối phương.',
    figurativeMeaning: 'Thua xa hoàn toàn, không thể nào sánh bằng, kém cỏi hơn gấp bội về tài năng, tri thức, trình độ hoặc tầm vóc so với người đi trước.',
    simpleMeaning: 'Thua xa hoàn toàn, không thể nào sánh bằng',
    primaryMeaning: 'Thừa nhận sự chênh lệch to lớn về năng lực, tri thức hoặc đẳng cấp, bản thân còn thua kém rất xa so với đối phương.',
    meaningPoints: [
      '① Thành ngữ khiêm tốn tột bậc khi tự so sánh bản thân với bậc tiền bối kiệt xuất',
      '② Cụm từ hay gặp trong các bài phỏng vấn học giả và đề thi N1 phần ngữ dụng học',
      '③ Khẳng định khoảng cách đẳng cấp mà sự kiêu ngạo không thể khỏa lấp'
    ],
    nuanceAndContext: 'Dùng trong ngữ cảnh khiêm nhường biểu thị sự kính trọng đối với bậc thầy hoặc tiền bối trong ngành, không mang tính tự ti tiêu cực mà là sự tôn kính học thuật.',
    examples: [
      {
        type: 'literal',
        label: 'Nghĩa đen (So sánh chiều cao)',
        japanese: '見上げるほど巨大な仏像の前では、人間の背丈など足元にも及ばない。',
        reading: 'みあげるほどきょだいなぶつぞうのまえでは、にんげんのせたけなどあしもとにもおよばない。',
        romaji: 'Miageru hodo kyodai na butsuzou no mae dewa, ningen no setake nado ashimoto ni mo oyobanai.',
        vietnamese: 'Trước bức tượng Phật khổng lồ cao sừng sững, chiều cao của con người thậm chí còn chưa với tới nổi bàn chân của tượng.'
      },
      {
        type: 'figurative',
        label: 'Nghĩa bóng (Học vấn & Trình độ)',
        japanese: '先輩の圧倒的な日本語力と読解スピードには、私など足元にも及びません。',
        reading: 'せんぱいのおっとうてきなにほんごりょくとどっかいスピードには、わたしなどあしもとにもおよびません。',
        romaji: 'Sempai no attouteki na nihongoryoku to dokkai supiido ni wa, watashi nado ashimoto ni mo oyobimasen.',
        vietnamese: 'Trước năng lực tiếng Nhật áp đảo và tốc độ đọc hiểu thần sầu của tiền bối, một người như tôi thật sự còn thua xa vạn dặm.'
      }
    ],
    relatedCollocations: ['足元にも寄れない (không bén mảng lại gần nổi chân)'],
    synonyms: ['遠く及ばない (tooku oyobanai - còn xa mới tới)', '足下にも及ばない', '比較にならない (hikaku ni naranai - không thể so bì)'],
    antonyms: ['肩を並べる (kata wo naraberu - sánh vai ngang hàng)', '互角に渡り合う (gokaku ni watariau - ngang tài ngang sức)'],
    senseiExplanation: 'Cúi đầu trước sự uyên bác của người khác là khởi đầu của trí tuệ chân chính. Người đạt chuẩn N1 không tự mãn mà luôn nuôi dưỡng tinh thần học hỏi suốt đời.'
  }
];



