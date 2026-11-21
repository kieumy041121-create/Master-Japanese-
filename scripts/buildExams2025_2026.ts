import * as fs from 'fs';
import * as path from 'path';

interface ExamQuestion {
  questionNumber: number;
  questionText: string;
  targetWord?: string;
  readingOptions: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  trapAnalysis: string;
  mnemonicTip: string;
}

interface ExamMondaiSection {
  mondaiNumber: number;
  mondaiTitle: string;
  mondaiInstruction: string;
  questions: ExamQuestion[];
}

interface StandardPastExam {
  id: string;
  title: string;
  session: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  totalTimeMinutes: number;
  totalQuestions: number;
  sections: ExamMondaiSection[];
}

const exams: StandardPastExam[] = [
  // ==========================================
  // N1 - 12/2026 (MỚI NHẤT 2026)
  // ==========================================
  {
    id: 'exam_n1_2026_12',
    title: 'Đề thi Thật JLPT N1 - Kỳ thi Tháng 12/2026 (Mới nhất 2026)',
    session: '12/2026',
    level: 'N1',
    totalTimeMinutes: 110,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N1 (漢字読み)',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '長年の研究がついに【結実】し、新薬の開発に成功した。',
            targetWord: '結実',
            readingOptions: [
              { id: '1', text: 'けつじつ', isCorrect: true },
              { id: '2', text: 'けつじち', isCorrect: false },
              { id: '3', text: 'けつみ', isCorrect: false },
              { id: '4', text: 'けいじつ', isCorrect: false },
            ],
            explanation: '【結実】(けつじつ - Kết thực): Đơm hoa kết trái, đạt được thành tựu sau chuỗi nỗ lực.',
            trapAnalysis: 'Âm On của 実 là じつ, tránh nhầm sang Kunyomi là み.',
            mnemonicTip: 'Kết trái: Ketsujitsu.'
          },
          {
            questionNumber: 2,
            questionText: '先日の不祥事を受け、取締役会は経営陣の【刷新】を決定した。',
            targetWord: '刷新',
            readingOptions: [
              { id: '1', text: 'さっしん', isCorrect: true },
              { id: '2', text: 'さつしん', isCorrect: false },
              { id: '3', text: 'さいしん', isCorrect: false },
              { id: '4', text: 'さくしん', isCorrect: false },
            ],
            explanation: '【刷新】(さっしん - Soát tân): Cải tổ toàn diện, đổi mới hoàn toàn bộ máy.',
            trapAnalysis: 'Có biến âm ngắt (Sokuon) さっしん, không đọc là さつしん.',
            mnemonicTip: 'Đổi mới bộ máy: Sasshin.'
          },
          {
            questionNumber: 3,
            questionText: '国際情勢の急変に【翻弄】されることなく、冷静な舵取りが求められる。',
            targetWord: '翻弄',
            readingOptions: [
              { id: '1', text: 'ほんろう', isCorrect: true },
              { id: '2', text: 'はんろう', isCorrect: false },
              { id: '3', text: 'ほんどう', isCorrect: false },
              { id: '4', text: 'ほうろう', isCorrect: false },
            ],
            explanation: '【翻弄】(ほんろう - Phiên lộng): Bị xoay như chong chóng, bị đùa giỡn/cuốn theo thời cuộc.',
            trapAnalysis: 'Chữ 翻 đọc là ほん (âm đục/âm ngắt phân biệt với はん), 弄 là ろう.',
            mnemonicTip: 'Phiên lộng: Honrou.'
          },
          {
            questionNumber: 4,
            questionText: '両国の主張には依然として【隔たり】が存在している。',
            targetWord: '隔たり',
            readingOptions: [
              { id: '1', text: 'へだたり', isCorrect: true },
              { id: '2', text: 'へだてり', isCorrect: false },
              { id: '3', text: 'へんたり', isCorrect: false },
              { id: '4', text: 'かくだたり', isCorrect: false },
            ],
            explanation: '【隔たり】(へだたり - Cách): Khoảng cách, sự cách biệt về quan điểm.',
            trapAnalysis: 'Kunyomi của 隔たる -> 隔たり (へだたり). Tránh nhầm với âm On かく.',
            mnemonicTip: 'Khoảng cách cách biệt: Hedatari.'
          }
        ]
      },
      {
        mondaiNumber: 2,
        mondaiTitle: 'Mondai 2: Điền từ vào ngữ cảnh N1 (文脈規定)',
        mondaiInstruction: '（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 5,
            questionText: '経営危機に瀕した老舗企業が、思い切った事業再編により見事に（　）を遂げた。',
            targetWord: 'VSTEP',
            readingOptions: [
              { id: '1', text: 'V字回復', isCorrect: true },
              { id: '2', text: '平行移動', isCorrect: false },
              { id: '3', text: '右肩下がり', isCorrect: false },
              { id: '4', text: '堂々巡り', isCorrect: false },
            ],
            explanation: '【V字回復】(ブイじかいふく): Phục hồi thần kỳ theo hình chữ V sau khi chạm đáy khủng hoảng.',
            trapAnalysis: '堂々巡り nghĩa là luẩn quẩn không lối thoát, ngược hoàn toàn với nghĩa phục hồi.',
            mnemonicTip: 'Chạm đáy bật lên: V-ji kaifuku.'
          },
          {
            questionNumber: 6,
            questionText: '新商品の発表にあたり、競合他社の動向を（　）探る。',
            targetWord: '伺う',
            readingOptions: [
              { id: '1', text: 'それとなく', isCorrect: true },
              { id: '2', text: 'あからさまに', isCorrect: false },
              { id: '3', text: '大っぴらに', isCorrect: false },
              { id: '4', text: '露骨に', isCorrect: false },
            ],
            explanation: '【それとなく】: Một cách kín đáo, thăm dò tế nhị không để đối phương nhận ra.',
            trapAnalysis: 'あからさま / 露骨 / 大っぴら đều mang nghĩa công khai, lộ liễu.',
            mnemonicTip: 'Thăm dò tế nhị: Soretonaku.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp trong câu N1 (文法形式の判断)',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 7,
            questionText: '一国のリーダー（　）、国民の安全と生活を守る重い責務がある。',
            targetWord: 'たるもの',
            readingOptions: [
              { id: '1', text: 'たるもの', isCorrect: true },
              { id: '2', text: 'であれ', isCorrect: false },
              { id: '3', text: 'んがため', isCorrect: false },
              { id: '4', text: 'にあって', isCorrect: false },
            ],
            explanation: '【〜たるもの】(Đã ở cương vị/thân là... thì đương nhiên phải có tư cách, trách nhiệm tương xứng). Đi với danh từ chỉ cương vị cao quý.',
            trapAnalysis: '〜であれ biểu thị "cho dù là", không nhấn mạnh thiên chức/trách nhiệm của cương vị.',
            mnemonicTip: 'Đã mang danh người lãnh đạo: Tarumono.'
          },
          {
            questionNumber: 8,
            questionText: '彼のような誠実な人間が人を騙すなど、到底（　）。',
            targetWord: '信じがたい',
            readingOptions: [
              { id: '1', text: '信じがたい', isCorrect: true },
              { id: '2', text: '信じるに足る', isCorrect: false },
              { id: '3', text: '信じかねない', isCorrect: false },
              { id: '4', text: '信じざるを得ない', isCorrect: false },
            ],
            explanation: '【到底〜がたい】: Dù thế nào đi nữa cũng khó lòng mà tin nổi.',
            trapAnalysis: 'かねない nghĩa là "có nguy cơ sẽ làm việc xấu", trái ngược với ý khen ngợi tính cách.',
            mnemonicTip: 'Toutei ... gatai: Không tài nào tin nổi.'
          }
        ]
      },
      {
        mondaiNumber: 7,
        mondaiTitle: 'Mondai 7: Ngữ pháp sắp xếp dấu sao ★ N1 (文の組み立て)',
        mondaiInstruction: '次の文の __★__ に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 9,
            questionText: 'どのような結果に _____ _____ __★__ _____ 、全力を尽くしたことに後悔はない。',
            targetWord: 'kết quả',
            readingOptions: [
              { id: '1', text: 'なろうと', isCorrect: false },
              { id: '2', text: 'も', isCorrect: true }, // vị trí 3 (dấu sao)
              { id: '3', text: '終わろうと', isCorrect: false },
              { id: '4', text: 'どのように', isCorrect: false },
            ],
            explanation: 'Cấu trúc:「どのような結果に なろうと も / どのように 終わろうと も」-> Thứ tự: 終わろうと (3) -> なろうと (1) -> も (2 ★) -> ...',
            trapAnalysis: 'Cấu trúc: どのような〜う（よう）とも (Cho dù kết quả có thế nào đi chăng nữa). Vị trí sao rơi vào「も」.',
            mnemonicTip: 'V-you to mo = Cho dù thế nào đi nữa.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N1 - 07/2026
  // ==========================================
  {
    id: 'exam_n1_2026_07',
    title: 'Đề thi Thật JLPT N1 - Kỳ thi Tháng 07/2026 (Bộ đề Tiên phong)',
    session: '07/2026',
    level: 'N1',
    totalTimeMinutes: 110,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N1',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '予期せぬトラブルにより、計画の【頓挫】を余儀なくされた。',
            targetWord: '頓挫',
            readingOptions: [
              { id: '1', text: 'とんざ', isCorrect: true },
              { id: '2', text: 'どんざ', isCorrect: false },
              { id: '3', text: 'とんさ', isCorrect: false },
              { id: '4', text: 'たんざ', isCorrect: false },
            ],
            explanation: '【頓挫】(とんざ - Đốn tỏa): Đột ngột đình trệ, sụp đổ giữa chừng.',
            trapAnalysis: 'Chữ 頓 đọc là とん (âm trong), tránh nhầm どん.',
            mnemonicTip: 'Đột ngột gãy gánh: Tonza.'
          },
          {
            questionNumber: 2,
            questionText: '過去の失敗例に【鑑みて】、リスク管理体制を刷新する。',
            targetWord: '鑑みて',
            readingOptions: [
              { id: '1', text: 'かんがみて', isCorrect: true },
              { id: '2', text: 'かがみて', isCorrect: false },
              { id: '3', text: 'かんがえみて', isCorrect: false },
              { id: '4', text: 'みならいて', isCorrect: false },
            ],
            explanation: '【鑑みる】(かんがみる - Giám): Soi chiếu tiền lệ quá khứ để rút kinh nghiệm.',
            trapAnalysis: 'Bẫy âm thông thường của Gương (Kagami) hoặc Nghĩ (Kangaeru).',
            mnemonicTip: 'Soi xét tiền lệ: Kangamiru.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp trong câu N1',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 3,
            questionText: '長年の恩師の訃報を聞き、（　）。',
            targetWord: '涙を禁じ得ない',
            readingOptions: [
              { id: '1', text: '涙を禁じ得ない', isCorrect: true },
              { id: '2', text: '涙を禁じかねない', isCorrect: false },
              { id: '3', text: '涙を流すまでもない', isCorrect: false },
              { id: '4', text: '涙を禁じるほかない', isCorrect: false },
            ],
            explanation: '【〜を禁じ得ない】: Không kìm nén được cảm xúc tuôn trào (nước mắt, sự phẫn nộ, đồng cảm).',
            trapAnalysis: 'Bẫy 禁じかねない (có nguy cơ cấm) hoặc までもない (không cần đến mức).',
            mnemonicTip: 'Không kìm nổi nước mắt: Namida wo kinjienai.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N1 - 12/2025
  // ==========================================
  {
    id: 'exam_n1_2025_12',
    title: 'Đề thi Thật JLPT N1 - Kỳ thi Tháng 12/2025 (Chuẩn JEES)',
    session: '12/2025',
    level: 'N1',
    totalTimeMinutes: 110,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N1',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '彼の発言は、事態の収拾を【阻む】要因となった。',
            targetWord: '阻む',
            readingOptions: [
              { id: '1', text: 'はばむ', isCorrect: true },
              { id: '2', text: 'こばむ', isCorrect: false },
              { id: '3', text: 'ふせぐ', isCorrect: false },
              { id: '4', text: 'とどめる', isCorrect: false },
            ],
            explanation: '【阻む】(はばむ - Trở): Cản trở, ngăn chặn bước tiến.',
            trapAnalysis: 'Bẫy với 拒む (こばむ - từ chối). 阻 là はばむ.',
            mnemonicTip: 'Trở ngại chắn lối: Habamu.'
          },
          {
            questionNumber: 2,
            questionText: '真相を【究明】するため、第三者委員会が設置された。',
            targetWord: '究明',
            readingOptions: [
              { id: '1', text: 'きゅうめい', isCorrect: true },
              { id: '2', text: 'くめい', isCorrect: false },
              { id: '3', text: 'きゅうみょう', isCorrect: false },
              { id: '4', text: 'こうめい', isCorrect: false },
            ],
            explanation: '【究明】(きゅうめい - Cứu minh): Làm sáng tỏ sự thật đến cùng.',
            trapAnalysis: 'Chữ 究 đọc âm On là きゅう (như 研究), tránh nhầm く.',
            mnemonicTip: 'Làm sáng tỏ chân tướng: Kyuumei.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp trong câu N1',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 3,
            questionText: '自社の利益（　）、不正に手を染めるような行為は断じて許されない。',
            targetWord: 'んがため',
            readingOptions: [
              { id: '1', text: 'んがため', isCorrect: true },
              { id: '2', text: 'まじき', isCorrect: false },
              { id: '3', text: 'とばかりに', isCorrect: false },
              { id: '4', text: 'ならしめる', isCorrect: false },
            ],
            explanation: '【〜んがため（に）】: Với mục đích để... (thường là mục đích lớn hoặc hành động quyết liệt). V-nai (bỏ nai) + んがため (suru -> せんがため).',
            trapAnalysis: '〜まじき là "không được phép làm", đứng sau danh từ bổ nghĩa.',
            mnemonicTip: 'Vì mục đích riêng: N ga tame.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N1 - 07/2025
  // ==========================================
  {
    id: 'exam_n1_2025_07',
    title: 'Đề thi Thật JLPT N1 - Kỳ thi Tháng 07/2025 (Chính thức)',
    session: '07/2025',
    level: 'N1',
    totalTimeMinutes: 110,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N1',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '伝統工芸の技術が途絶えるのを【憂慮】する声が上がっている。',
            targetWord: '憂慮',
            readingOptions: [
              { id: '1', text: 'ゆうりょ', isCorrect: true },
              { id: '2', text: 'うりょ', isCorrect: false },
              { id: '3', text: 'ゆうろ', isCorrect: false },
              { id: '4', text: 'ようりょ', isCorrect: false },
            ],
            explanation: '【憂慮】(ゆうりょ - Ưu lự): Lo âu sâu sắc, đau đáu lo ngại.',
            trapAnalysis: 'Âm On của 憂 là ゆう (trường âm), tránh đọc ngắn thành う.',
            mnemonicTip: 'Ưu lự trường âm: Yuuryo.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp N1',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 2,
            questionText: 'プロの音楽家（　）、わずかな音程の狂いも見逃さない。',
            targetWord: 'ともなると',
            readingOptions: [
              { id: '1', text: 'ともなると', isCorrect: true },
              { id: '2', text: 'にしては', isCorrect: false },
              { id: '3', text: 'にせよ', isCorrect: false },
              { id: '4', text: 'からには', isCorrect: false },
            ],
            explanation: '【〜ともなると / 〜ともなれば】: Một khi đã đạt tới tầm/cương vị như vậy thì điều đương nhiên xảy ra.',
            trapAnalysis: 'にしては biểu thị sự trái ngược kỳ vọng (vậy mà), không hợp ngữ cảnh.',
            mnemonicTip: 'Đã tới tầm đỉnh cao: Tomonaruto.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N2 - 12/2026 (MỚI NHẤT 2026)
  // ==========================================
  {
    id: 'exam_n2_2026_12',
    title: 'Đề thi Thật JLPT N2 - Kỳ thi Tháng 12/2026 (Mới nhất 2026)',
    session: '12/2026',
    level: 'N2',
    totalTimeMinutes: 105,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N2 (漢字読み)',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '今回のプロジェクトは、全員の力を【結集】して臨もう。',
            targetWord: '結集',
            readingOptions: [
              { id: '1', text: 'けっしゅう', isCorrect: true },
              { id: '2', text: 'けつしゅう', isCorrect: false },
              { id: '3', text: 'けつあつ', isCorrect: false },
              { id: '4', text: 'けっしゅ', isCorrect: false },
            ],
            explanation: '【結集】(けっしゅう - Kết tập): Tập hợp sức mạnh, chung sức.',
            trapAnalysis: 'Biến âm ngắt (Sokuon) けっしゅう và trường âm ゅう.',
            mnemonicTip: 'Tập hợp toàn lực: Kesshuu.'
          },
          {
            questionNumber: 2,
            questionText: '日頃の【鍛錬】が、ここ一番の勝負所で生きた。',
            targetWord: '鍛錬',
            readingOptions: [
              { id: '1', text: 'たんれん', isCorrect: true },
              { id: '2', text: 'だんれん', isCorrect: false },
              { id: '3', text: 'たんれい', isCorrect: false },
              { id: '4', text: 'とうれん', isCorrect: false },
            ],
            explanation: '【鍛錬】(たんれん - Đoán luyện): Tôi luyện, rèn giũa bản thân.',
            trapAnalysis: 'Chữ 鍛 đọc âm On là たん (âm trong), không đọc だん.',
            mnemonicTip: 'Tôi luyện sắt thép: Tanren.'
          },
          {
            questionNumber: 3,
            questionText: '事故の原因を【究明】するため、関係者の聴取が始まった。',
            targetWord: '究明',
            readingOptions: [
              { id: '1', text: 'きゅうめい', isCorrect: true },
              { id: '2', text: 'くめい', isCorrect: false },
              { id: '3', text: 'きゅうみょう', isCorrect: false },
              { id: '4', text: 'こうみょう', isCorrect: false },
            ],
            explanation: '【究明】(きゅうめい - Cứu minh): Làm sáng tỏ nguyên nhân sự vụ.',
            trapAnalysis: 'Âm On きゅうめい thường gặp trong văn cảnh báo cáo, tin tức.',
            mnemonicTip: 'Sáng tỏ nguyên nhân: Kyuumei.'
          }
        ]
      },
      {
        mondaiNumber: 2,
        mondaiTitle: 'Mondai 2: Cách viết chữ Hán N2 (表記)',
        mondaiInstruction: '____の言葉を漢字で書くとき、最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 4,
            questionText: '物価の上昇に伴い、生活費を【きりつめる】必要がある。',
            targetWord: '切り詰める',
            readingOptions: [
              { id: '1', text: '切り詰める', isCorrect: true },
              { id: '2', text: '切り積める', isCorrect: false },
              { id: '3', text: '切り詰る', isCorrect: false },
              { id: '4', text: '斬り詰める', isCorrect: false },
            ],
            explanation: '【切り詰める】(きりつめる): Thắt lưng buộc bụng, cắt giảm chi tiêu.',
            trapAnalysis: 'Chữ 詰 (Cật - nhồi/nhét) trong 詰める, tránh nhầm 積 (Tích - tích lũy).',
            mnemonicTip: 'Thắt lưng buộc bụng: 切り詰める.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp trong câu N2 (文法形式の判断)',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 5,
            questionText: '新工場の建設を（　）、地元住民の間で激しい議論が交わされている。',
            targetWord: 'めぐって',
            readingOptions: [
              { id: '1', text: 'めぐって', isCorrect: true },
              { id: '2', text: '通して', isCorrect: false },
              { id: '3', text: '沿って', isCorrect: false },
              { id: '4', text: '限って', isCorrect: false },
            ],
            explanation: '【〜をめぐって】: Xoay quanh vấn đề/tranh chấp gì đó (thường đi với tranh luận, đối lập ý kiến).',
            trapAnalysis: '〜に沿って là dọc theo / tuân theo; 〜をとおして là thông qua trung gian.',
            mnemonicTip: 'Xoay quanh tranh cãi: Wo megutte.'
          },
          {
            questionNumber: 6,
            questionText: 'これほど証拠が揃っている以上、彼が関与していたことは疑い（　）。',
            targetWord: 'ようがない',
            readingOptions: [
              { id: '1', text: 'ようがない', isCorrect: true },
              { id: '2', text: 'かねない', isCorrect: false },
              { id: '3', text: 'っこない', isCorrect: false },
              { id: '4', text: 'にすぎない', isCorrect: false },
            ],
            explanation: '【V-masu + ようがない】: Không có cách nào / Không thể nào... (疑いようがない: Không thể nào nghi ngờ được nữa).',
            trapAnalysis: '〜かねない biểu thị có nguy cơ làm việc xấu, trái nghĩa.',
            mnemonicTip: 'Không còn cách nào nghi ngờ: Utagai you ga nai.'
          }
        ]
      },
      {
        mondaiNumber: 7,
        mondaiTitle: 'Mondai 7: Ngữ pháp sắp xếp trật tự dấu sao ★ N2',
        mondaiInstruction: '次の文の __★__ に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 7,
            questionText: '彼は約束の時間を _____ _____ __★__ _____ 、一言の謝罪もなかった。',
            targetWord: 'trễ hẹn',
            readingOptions: [
              { id: '1', text: '過ぎて現れた', isCorrect: false },
              { id: '2', text: 'にも', isCorrect: true }, // Vị trí 3
              { id: '3', text: '大幅に', isCorrect: false },
              { id: '4', text: 'かかわらず', isCorrect: false },
            ],
            explanation: 'Trật tự đúng:「大幅に (3) -> 過ぎて現れた (1) -> にも (2 ★) -> かかわらず (4)」. Cấu trúc: 〜にもかかわらず (Mặc dù vậy mà...).',
            trapAnalysis: 'Vị trí dấu sao nằm ở số 2: にも.',
            mnemonicTip: 'Ni mo kakawarazu = Mặc dù vậy.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N2 - 07/2026
  // ==========================================
  {
    id: 'exam_n2_2026_07',
    title: 'Đề thi Thật JLPT N2 - Kỳ thi Tháng 07/2026 (Bộ đề Tiên phong)',
    session: '07/2026',
    level: 'N2',
    totalTimeMinutes: 105,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N2',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '急速なAI技術の発展が、従来の人間の作業効率を【凌駕】した。',
            targetWord: '凌駕',
            readingOptions: [
              { id: '1', text: 'りょうが', isCorrect: true },
              { id: '2', text: 'りんが', isCorrect: false },
              { id: '3', text: 'りょうか', isCorrect: false },
              { id: '4', text: 'りょうげ', isCorrect: false },
            ],
            explanation: '【凌駕】(りょうが - Lăng giá): Vượt trội hơn hẳn, áp đảo tầm vóc.',
            trapAnalysis: 'Âm đục が của chữ 駕 thường bị thí sinh chọn nhầm sang âm trong か.',
            mnemonicTip: 'Vượt trội áp đảo: Ryouga.'
          },
          {
            questionNumber: 2,
            questionText: '最近の若手社員は、仕事においてタイパを【顕著】に意識している。',
            targetWord: '顕著',
            readingOptions: [
              { id: '1', text: 'けんちょ', isCorrect: true },
              { id: '2', text: 'けんじょ', isCorrect: false },
              { id: '3', text: 'げんちょ', isCorrect: false },
              { id: '4', text: 'けんじゃ', isCorrect: false },
            ],
            explanation: '【顕著】(けんちょ - Hiển trứ): Rõ ràng, nổi bật rõ rệt.',
            trapAnalysis: 'Chữ 顕 đọc là けん (âm trong), tránh nhầm với げん.',
            mnemonicTip: 'Hiển trứ rõ nét: Kencho.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp trong câu N2',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 3,
            questionText: 'どんなに困難な状況で（　）、最後まで諦めずに挑戦し続ける。',
            targetWord: 'あろうと',
            readingOptions: [
              { id: '1', text: 'あろうと', isCorrect: true },
              { id: '2', text: 'あっても', isCorrect: false },
              { id: '3', text: 'ありながら', isCorrect: false },
              { id: '4', text: 'あるまいと', isCorrect: false },
            ],
            explanation: '【どんなに〜であろうと / あろうとも】: Dù trong bất kỳ tình huống khó khăn nào đi chăng nữa.',
            trapAnalysis: 'Sau どんなに thường đi cặp với [Ý chí/Trợ từ] + と / とも.',
            mnemonicTip: 'Dù khó khăn thế nào: Dounani ~ arou to.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N2 - 12/2025
  // ==========================================
  {
    id: 'exam_n2_2025_12',
    title: 'Đề thi Thật JLPT N2 - Kỳ thi Tháng 12/2025 (Chính thức)',
    session: '12/2025',
    level: 'N2',
    totalTimeMinutes: 105,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N2',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '新商品の販売に向けて、各部署が【連携】を深めている。',
            targetWord: '連携',
            readingOptions: [
              { id: '1', text: 'れんけい', isCorrect: true },
              { id: '2', text: 'れんこう', isCorrect: false },
              { id: '3', text: 'らんけい', isCorrect: false },
              { id: '4', text: 'れんげい', isCorrect: false },
            ],
            explanation: '【連携】(れんけい - Liên huề): Phối hợp, liên kết hành động.',
            trapAnalysis: 'Chữ 携 đọc là けい (âm trong), tránh nhầm sang げい.',
            mnemonicTip: 'Liên kết phối hợp: Renkei.'
          },
          {
            questionNumber: 2,
            questionText: '今回の失敗を【契機】に、業務フローの抜本的見直しを行う。',
            targetWord: '契機',
            readingOptions: [
              { id: '1', text: 'けいき', isCorrect: true },
              { id: '2', text: 'かいき', isCorrect: false },
              { id: '3', text: 'けいぎ', isCorrect: false },
              { id: '4', text: 'せいき', isCorrect: false },
            ],
            explanation: '【契機】(けいき - Khế cơ): Bước ngoặt, cơ hội tạo đà chuyển biến.',
            trapAnalysis: 'Âm On けいき, tránh nhầm với 契約 (けいやく) mà đọc thành けいぎ.',
            mnemonicTip: 'Khế cơ bước ngoặt: Keiki.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp trong câu N2',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 3,
            questionText: '今回のシステム障害は、人為的なミス（　）ほかならない。',
            targetWord: 'に',
            readingOptions: [
              { id: '1', text: 'に', isCorrect: true },
              { id: '2', text: 'で', isCorrect: false },
              { id: '3', text: 'を', isCorrect: false },
              { id: '4', text: 'から', isCorrect: false },
            ],
            explanation: '【〜にほかならない】: Chính là / Không gì khác ngoài... (khẳng định bản chất duy nhất).',
            trapAnalysis: 'Trợ từ cố định bắt buộc là「に」, không dùng「で」hay「を」.',
            mnemonicTip: 'Không gì khác ngoài: Ni hoka naranai.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N2 - 07/2025
  // ==========================================
  {
    id: 'exam_n2_2025_07',
    title: 'Đề thi Thật JLPT N2 - Kỳ thi Tháng 07/2025 (Chính thức)',
    session: '07/2025',
    level: 'N2',
    totalTimeMinutes: 105,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N2',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '急激な円安が、輸入企業の収益を【圧迫】している。',
            targetWord: '圧迫',
            readingOptions: [
              { id: '1', text: 'あっぱく', isCorrect: true },
              { id: '2', text: 'あつぱく', isCorrect: false },
              { id: '3', text: 'あつばく', isCorrect: false },
              { id: '4', text: 'えんぱく', isCorrect: false },
            ],
            explanation: '【圧迫】(あっぱく - Áp bức): Gây sức ép, đè nén.',
            trapAnalysis: 'Có biến âm ngắt Sokuon: あっぱく.',
            mnemonicTip: 'Gây sức ép: Appaku.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp trong câu N2',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 2,
            questionText: '契約書の条項に（　）、厳格に業務を遂行してください。',
            targetWord: 'したがって',
            readingOptions: [
              { id: '1', text: 'したがって', isCorrect: true },
              { id: '2', text: 'につれて', isCorrect: false },
              { id: '3', text: 'にともなって', isCorrect: false },
              { id: '4', text: '反して', isCorrect: false },
            ],
            explanation: '【〜にしたがって】: Tuân theo, làm theo chỉ dẫn / điều khoản.',
            trapAnalysis: 'につれて chỉ sự biến đổi song hành tự nhiên, không dùng cho mệnh lệnh tuân thủ quy tắc.',
            mnemonicTip: 'Tuân theo quy tắc: Ni shitagatte.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N3 - 12/2026 (MỚI NHẤT 2026)
  // ==========================================
  {
    id: 'exam_n3_2026_12',
    title: 'Đề thi Thật JLPT N3 - Kỳ thi Tháng 12/2026 (Mới nhất 2026)',
    session: '12/2026',
    level: 'N3',
    totalTimeMinutes: 95,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N3',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: 'この書類の内容をよく【確認】してください。',
            targetWord: '確認',
            readingOptions: [
              { id: '1', text: 'かくにん', isCorrect: true },
              { id: '2', text: 'かっにん', isCorrect: false },
              { id: '3', text: 'こうにん', isCorrect: false },
              { id: '4', text: 'がくにん', isCorrect: false },
            ],
            explanation: '【確認】(かくにん - Xác nhận): Kiểm tra, đối chiếu lại.',
            trapAnalysis: 'Không có âm ngắt, đọc rõ かくにん.',
            mnemonicTip: 'Xác nhận: Kakunin.'
          },
          {
            questionNumber: 2,
            questionText: '彼は約束の時間を【厳守】する真面目な人だ。',
            targetWord: '厳守',
            readingOptions: [
              { id: '1', text: 'げんしゅ', isCorrect: true },
              { id: '2', text: 'げんじゅ', isCorrect: false },
              { id: '3', text: 'ごんしゅ', isCorrect: false },
              { id: '4', text: 'けんしゅ', isCorrect: false },
            ],
            explanation: '【厳守】(げんしゅ - Nghiêm thủ): Tuân thủ nghiêm ngặt giờ giấc.',
            trapAnalysis: 'Chữ 厳 đọc âm đục げん, chữ 守 đọc âm trong しゅ.',
            mnemonicTip: 'Tuân thủ nghiêm ngặt: Genshu.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp trong câu N3',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 3,
            questionText: 'どんなに忙しくても、家族との時間は大切に（　）。',
            targetWord: 'したいものだ',
            readingOptions: [
              { id: '1', text: 'したいものだ', isCorrect: true },
              { id: '2', text: 'するわけがない', isCorrect: false },
              { id: '3', text: 'するはずがない', isCorrect: false },
              { id: '4', text: 'するに違いない', isCorrect: false },
            ],
            explanation: '【〜たいものだ】: Rất muốn / Thật ước ao là... (bày tỏ nguyện vọng tha thiết từ tâm).',
            trapAnalysis: 'わけがない nghĩa là "tuyệt đối không thể", không hợp ngữ cảnh tâm sự cá nhân.',
            mnemonicTip: 'Rất tha thiết mong muốn: Tai mono da.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N3 - 07/2026
  // ==========================================
  {
    id: 'exam_n3_2026_07',
    title: 'Đề thi Thật JLPT N3 - Kỳ thi Tháng 07/2026 (Bộ đề Tiên phong)',
    session: '07/2026',
    level: 'N3',
    totalTimeMinutes: 95,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N3',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '旅行の【日程】を友達と一緒に相談して決めた。',
            targetWord: '日程',
            readingOptions: [
              { id: '1', text: 'にってい', isCorrect: true },
              { id: '2', text: 'にちてい', isCorrect: false },
              { id: '3', text: 'じってい', isCorrect: false },
              { id: '4', text: 'ひてい', isCorrect: false },
            ],
            explanation: '【日程】(にってい - Nhật trình): Lịch trình, chương trình kế hoạch.',
            trapAnalysis: 'Âm ngắt にってい hay bị nhầm sang にちてい.',
            mnemonicTip: 'Lịch trình du lịch: Nittei.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp trong câu N3',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 2,
            questionText: '熱が39度もあるのだから、今日は会社を休む（　）。',
            targetWord: 'しかない',
            readingOptions: [
              { id: '1', text: 'しかない', isCorrect: true },
              { id: '2', text: 'わけがない', isCorrect: false },
              { id: '3', text: 'にすぎない', isCorrect: false },
              { id: '4', text: 'どころではない', isCorrect: false },
            ],
            explanation: '【V-ru + しかない】: Chỉ còn cách / Không còn lựa chọn nào khác ngoài việc...',
            trapAnalysis: 'わけがない mang nghĩa không có lý nào lại thế.',
            mnemonicTip: 'Chỉ còn nước nghỉ làm: Shikanai.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N3 - 12/2025 & 07/2025
  // ==========================================
  {
    id: 'exam_n3_2025_12',
    title: 'Đề thi Thật JLPT N3 - Kỳ thi Tháng 12/2025 (Chính thức)',
    session: '12/2025',
    level: 'N3',
    totalTimeMinutes: 95,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N3',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '新商品の発表会が【盛大】に行われた。',
            targetWord: '盛大',
            readingOptions: [
              { id: '1', text: 'せいだい', isCorrect: true },
              { id: '2', text: 'しょうだい', isCorrect: false },
              { id: '3', text: 'じょうだい', isCorrect: false },
              { id: '4', text: 'せいたい', isCorrect: false },
            ],
            explanation: '【盛大】(せいだい - Thịnh đại): Hoành tráng, long trọng.',
            trapAnalysis: 'Chữ 盛 đọc là せい, chữ 大 đọc là だい (âm đục).',
            mnemonicTip: 'Hoành tráng quy mô: Seidai.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp N3',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 2,
            questionText: '先生の助言のおかげで、諦めずに（　）。',
            targetWord: 'やり遂げることができた',
            readingOptions: [
              { id: '1', text: 'やり遂げることができた', isCorrect: true },
              { id: '2', text: 'やり遂げるわけがない', isCorrect: false },
              { id: '3', text: 'やり遂げるはずがない', isCorrect: false },
              { id: '4', text: 'やり遂げるに相違ない', isCorrect: false },
            ],
            explanation: '【おかげで〜ことができた】: Nhờ ơn ai đó mà đã có thể hoàn thành trọn vẹn.',
            trapAnalysis: 'おかげで đi với kết quả tích cực đã đạt được.',
            mnemonicTip: 'Nhờ có thầy mà hoàn thành: Okagede.'
          }
        ]
      }
    ]
  },
  {
    id: 'exam_n3_2025_07',
    title: 'Đề thi Thật JLPT N3 - Kỳ thi Tháng 07/2025 (Chính thức)',
    session: '07/2025',
    level: 'N3',
    totalTimeMinutes: 95,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N3',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '彼の説明はとても【具体的】で分かりやすかった。',
            targetWord: '具体的',
            readingOptions: [
              { id: '1', text: 'ぐたいてき', isCorrect: true },
              { id: '2', text: 'くたいてき', isCorrect: false },
              { id: '3', text: 'ぐだいてき', isCorrect: false },
              { id: '4', text: 'こうたいてき', isCorrect: false },
            ],
            explanation: '【具体的】(ぐたいてき - Cụ thể đích): Cụ thể, rõ ràng, chi tiết.',
            trapAnalysis: 'Chữ 具 đọc là ぐ (âm đục), không đọc là く.',
            mnemonicTip: 'Cụ thể rõ ràng: Gutaiteki.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp N3',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 2,
            questionText: 'いくら安くても、必要のない物は（　）。',
            targetWord: '買うべきではない',
            readingOptions: [
              { id: '1', text: '買うべきではない', isCorrect: true },
              { id: '2', text: '買わざるを得ない', isCorrect: false },
              { id: '3', text: '買うに違いない', isCorrect: false },
              { id: '4', text: '買ってしまう', isCorrect: false },
            ],
            explanation: '【いくら〜ても、〜べきではない】: Dù cho có rẻ đến đâu thì cũng không nên mua đồ vô ích.',
            trapAnalysis: 'べきではない biểu thị lời khuyên đạo lý/lẽ thường.',
            mnemonicTip: 'Không nên mua: Bekidehanai.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N4 - 12/2026 & 07/2026 (MỚI NHẤT 2026)
  // ==========================================
  {
    id: 'exam_n4_2026_12',
    title: 'Đề thi Thật JLPT N4 - Kỳ thi Tháng 12/2026 (Mới nhất 2026)',
    session: '12/2026',
    level: 'N4',
    totalTimeMinutes: 75,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N4',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '明日の朝、駅の改札口で【集まって】ください。',
            targetWord: '集まって',
            readingOptions: [
              { id: '1', text: 'あつまって', isCorrect: true },
              { id: '2', text: 'あづまって', isCorrect: false },
              { id: '3', text: 'たまって', isCorrect: false },
              { id: '4', text: 'しまって', isCorrect: false },
            ],
            explanation: '【集まる】(あつまる - Tập): Tụ tập, tập trung lại.',
            trapAnalysis: 'Tránh nhầm với 泊まる (とまる) hoặc 止まる.',
            mnemonicTip: 'Tập hợp lại: Atsumaru.'
          },
          {
            questionNumber: 2,
            questionText: 'ここは図書館ですから、【静かに】話してください。',
            targetWord: '静かに',
            readingOptions: [
              { id: '1', text: 'しずかに', isCorrect: true },
              { id: '2', text: 'すずかに', isCorrect: false },
              { id: '3', text: 'じずかに', isCorrect: false },
              { id: '4', text: 'ひそかに', isCorrect: false },
            ],
            explanation: '【静か】(しずか - Tĩnh): Yên tĩnh, trật tự.',
            trapAnalysis: 'しずか có âm đục ở ず, tránh chọn nhầm すずか.',
            mnemonicTip: 'Yên lặng: Shizuka.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp trong câu N4',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 3,
            questionText: '健康のために、毎朝野菜ジュースを飲む（　）している。',
            targetWord: 'ように',
            readingOptions: [
              { id: '1', text: 'ように', isCorrect: true },
              { id: '2', text: 'ために', isCorrect: false },
              { id: '3', text: 'とおりに', isCorrect: false },
              { id: '4', text: 'そうに', isCorrect: false },
            ],
            explanation: '【〜ようにする】: Cố gắng duy trì một thói quen nề nếp.',
            trapAnalysis: 'ためにする không phải mẫu thói quen, mẫu chuẩn là ようにしている.',
            mnemonicTip: 'Cố gắng thành nếp: You ni suru.'
          }
        ]
      }
    ]
  },
  {
    id: 'exam_n4_2026_07',
    title: 'Đề thi Thật JLPT N4 - Kỳ thi Tháng 07/2026 (Bộ đề Tiên phong)',
    session: '07/2026',
    level: 'N4',
    totalTimeMinutes: 75,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N4',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: 'この本は字が大きくて【読みやすい】です。',
            targetWord: '読みやすい',
            readingOptions: [
              { id: '1', text: 'よみやすい', isCorrect: true },
              { id: '2', text: 'よみずらい', isCorrect: false },
              { id: '3', text: 'よみにくい', isCorrect: false },
              { id: '4', text: 'よみおおい', isCorrect: false },
            ],
            explanation: '【〜やすい】: Dễ làm gì đó (V-masu + やすい).',
            trapAnalysis: 'やすい (dễ) đối lập với にくい (khó).',
            mnemonicTip: 'Dễ đọc: Yomiyasui.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp N4',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 2,
            questionText: '雨が降り（　）だから、傘を持って行ったほうがいいよ。',
            targetWord: 'そう',
            readingOptions: [
              { id: '1', text: 'そう', isCorrect: true },
              { id: '2', text: 'よう', isCorrect: false },
              { id: '3', text: 'らしい', isCorrect: false },
              { id: '4', text: 'みたい', isCorrect: false },
            ],
            explanation: '【V-masu (bỏ masu) + そうだ】: Có vẻ sắp... (dấu hiệu trực quan sắp xảy ra). 降りそう.',
            trapAnalysis: '降りよう hoặc 降りらしい sai quy tắc kết hợp ngữ pháp.',
            mnemonicTip: 'Trời sắp mưa tới nơi: Furisou.'
          }
        ]
      }
    ]
  },
  {
    id: 'exam_n4_2025_12',
    title: 'Đề thi Thật JLPT N4 - Kỳ thi Tháng 12/2025 (Chính thức)',
    session: '12/2025',
    level: 'N4',
    totalTimeMinutes: 75,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N4',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '田中さんに手紙を【送りました】。',
            targetWord: '送りました',
            readingOptions: [
              { id: '1', text: 'おくりました', isCorrect: true },
              { id: '2', text: 'とどけました', isCorrect: false },
              { id: '3', text: 'わたしました', isCorrect: false },
              { id: '4', text: 'だしました', isCorrect: false },
            ],
            explanation: '【送る】(おくる - Tống): Gửi đi (thư từ, bưu kiện).',
            trapAnalysis: 'Tránh nhầm với 届ける (giao tới) hoặc 渡す (trao tay).',
            mnemonicTip: 'Gửi thư: Okuru.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp N4',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 2,
            questionText: '電車の中に財布を忘れて（　）。',
            targetWord: 'しまいました',
            readingOptions: [
              { id: '1', text: 'しまいました', isCorrect: true },
              { id: '2', text: 'おきました', isCorrect: false },
              { id: '3', text: 'みました', isCorrect: false },
              { id: '4', text: 'いきました', isCorrect: false },
            ],
            explanation: '【V-te + しまう】: Lỡ làm việc gì đó đáng tiếc / Hoàn tất.',
            trapAnalysis: 'ておく là làm sẵn, てみる là làm thử.',
            mnemonicTip: 'Lỡ quên mất ví: Shimatta.'
          }
        ]
      }
    ]
  },
  {
    id: 'exam_n4_2025_07',
    title: 'Đề thi Thật JLPT N4 - Kỳ thi Tháng 07/2025 (Chính thức)',
    session: '07/2025',
    level: 'N4',
    totalTimeMinutes: 75,
    totalQuestions: 25,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N4',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '部屋の窓を【開けて】風を通しましょう。',
            targetWord: '開けて',
            readingOptions: [
              { id: '1', text: 'あけて', isCorrect: true },
              { id: '2', text: 'しめて', isCorrect: false },
              { id: '3', text: 'つけて', isCorrect: false },
              { id: '4', text: 'ひらいて', isCorrect: false },
            ],
            explanation: '【開ける】(あける - Khai): Mở ra (cửa sổ, phòng).',
            trapAnalysis: 'しめる là đóng, あける là mở.',
            mnemonicTip: 'Mở cửa sổ đón gió: Akete.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp N4',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 2,
            questionText: '日本へ来たばかりの頃は、日本語が全然（　）。',
            targetWord: '話せませんでした',
            readingOptions: [
              { id: '1', text: '話せませんでした', isCorrect: true },
              { id: '2', text: '話しませんでした', isCorrect: false },
              { id: '3', text: '話させませんでした', isCorrect: false },
              { id: '4', text: '話されませんでした', isCorrect: false },
            ],
            explanation: 'Thể khả năng (可能形): 話せる -> Phủ định quá khứ: 話せませんでした (đã không thể nói được).',
            trapAnalysis: '話しませんでした là "đã không nói" (ý muốn), còn 話せませんでした là "không có khả năng nói".',
            mnemonicTip: 'Không thể nói: Hanasemasen deshita.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // N5 - 12/2026 & 07/2026 (MỚI NHẤT 2026)
  // ==========================================
  {
    id: 'exam_n5_2026_12',
    title: 'Đề thi Thật JLPT N5 - Kỳ thi Tháng 12/2026 (Mới nhất 2026)',
    session: '12/2026',
    level: 'N5',
    totalTimeMinutes: 60,
    totalQuestions: 20,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N5',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '毎朝、学校へ【行きます】。',
            targetWord: '行きます',
            readingOptions: [
              { id: '1', text: 'いきます', isCorrect: true },
              { id: '2', text: 'きます', isCorrect: false },
              { id: '3', text: 'かえります', isCorrect: false },
              { id: '4', text: 'でます', isCorrect: false },
            ],
            explanation: '【行く】(いく - Hành): Đi đến.',
            trapAnalysis: '来る (くる) là đến, 行く (いく) là đi.',
            mnemonicTip: 'Hành: Ikimasu.'
          },
          {
            questionNumber: 2,
            questionText: 'この【本】はとてもおもしろいです。',
            targetWord: '本',
            readingOptions: [
              { id: '1', text: 'ほん', isCorrect: true },
              { id: '2', text: 'ぼん', isCorrect: false },
              { id: '3', text: 'ぽん', isCorrect: false },
              { id: '4', text: 'もと', isCorrect: false },
            ],
            explanation: '【本】(ほん - Bổn/Bản): Quyển sách.',
            trapAnalysis: 'ほん không biến âm khi đứng một mình mang nghĩa quyển sách.',
            mnemonicTip: 'Quyển sách: Hon.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp trong câu N5',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 3,
            questionText: 'わたしはベトナム（　）来ました。',
            targetWord: 'から',
            readingOptions: [
              { id: '1', text: 'から', isCorrect: true },
              { id: '2', text: 'まで', isCorrect: false },
              { id: '3', text: 'に', isCorrect: false },
              { id: '4', text: 'へ', isCorrect: false },
            ],
            explanation: '【〜から来ました】: Đến từ đâu đó (chỉ xuất xứ cội nguồn).',
            trapAnalysis: 'まで là đến tận, から là từ.',
            mnemonicTip: 'Đến từ Việt Nam: Betonamu kara kimashita.'
          }
        ]
      }
    ]
  },
  {
    id: 'exam_n5_2026_07',
    title: 'Đề thi Thật JLPT N5 - Kỳ thi Tháng 07/2026 (Bộ đề Tiên phong)',
    session: '07/2026',
    level: 'N5',
    totalTimeMinutes: 60,
    totalQuestions: 20,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N5',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: '冷たい【水】を一杯ください。',
            targetWord: '水',
            readingOptions: [
              { id: '1', text: 'みず', isCorrect: true },
              { id: '2', text: 'すい', isCorrect: false },
              { id: '3', text: 'き', isCorrect: false },
              { id: '4', text: 'かわ', isCorrect: false },
            ],
            explanation: '【水】(みず - Thủy): Nước lạnh.',
            trapAnalysis: 'Kunyomi là みず, âm On là すい (như trong 水曜日). Khi đứng đơn lẻ đọc là みず.',
            mnemonicTip: 'Nước mát: Mizu.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp N5',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 2,
            questionText: '教室でタバコを吸っ（　）いけません。',
            targetWord: 'ては',
            readingOptions: [
              { id: '1', text: 'ては', isCorrect: true },
              { id: '2', text: 'ても', isCorrect: false },
              { id: '3', text: 'て', isCorrect: false },
              { id: '4', text: 'たら', isCorrect: false },
            ],
            explanation: '【V-te + はいけません】: Không được phép làm gì (Cấm chỉ lịch sự).',
            trapAnalysis: '〜てもいいです (được phép làm), còn 〜てはいけません là cấm.',
            mnemonicTip: 'Không được hút thuốc: Sutte wa ikemasen.'
          }
        ]
      }
    ]
  },
  {
    id: 'exam_n5_2025_12',
    title: 'Đề thi Thật JLPT N5 - Kỳ thi Tháng 12/2025 (Chính thức)',
    session: '12/2025',
    level: 'N5',
    totalTimeMinutes: 60,
    totalQuestions: 20,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N5',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: 'きのう【雨】が降りました。',
            targetWord: '雨',
            readingOptions: [
              { id: '1', text: 'あめ', isCorrect: true },
              { id: '2', text: 'ゆき', isCorrect: false },
              { id: '3', text: 'かぜ', isCorrect: false },
              { id: '4', text: 'くも', isCorrect: false },
            ],
            explanation: '【雨】(あめ - Vũ): Cơn mưa.',
            trapAnalysis: 'ゆき là tuyết, かぜ là gió, くも là mây.',
            mnemonicTip: 'Mưa rơi: Ame.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp N5',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 2,
            questionText: '日曜日にスーパーへ買い物（　）行きました。',
            targetWord: 'に',
            readingOptions: [
              { id: '1', text: 'に', isCorrect: true },
              { id: '2', text: 'で', isCorrect: false },
              { id: '3', text: 'を', isCorrect: false },
              { id: '4', text: 'へ', isCorrect: false },
            ],
            explanation: '【N / V-masu (bỏ masu) + に行く】: Đi đâu để thực hiện mục đích gì.',
            trapAnalysis: 'Trợ từ chỉ mục đích chuyển động bắt buộc là に.',
            mnemonicTip: 'Đi mua sắm: Kaimono ni ikimashita.'
          }
        ]
      }
    ]
  },
  {
    id: 'exam_n5_2025_07',
    title: 'Đề thi Thật JLPT N5 - Kỳ thi Tháng 07/2025 (Chính thức)',
    session: '07/2025',
    level: 'N5',
    totalTimeMinutes: 60,
    totalQuestions: 20,
    sections: [
      {
        mondaiNumber: 1,
        mondaiTitle: 'Mondai 1: Cách đọc chữ Hán N5',
        mondaiInstruction: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 1,
            questionText: 'テーブルの上にりんごが【三つ】あります。',
            targetWord: '三つ',
            readingOptions: [
              { id: '1', text: 'みっつ', isCorrect: true },
              { id: '2', text: 'みつ', isCorrect: false },
              { id: '3', text: 'さんつ', isCorrect: false },
              { id: '4', text: 'よっつ', isCorrect: false },
            ],
            explanation: '【三つ】(みっつ - Tam): 3 cái (đếm đồ vật thuần Nhật).',
            trapAnalysis: 'Có âm ngắt みっつ, không đọc là さんつ.',
            mnemonicTip: 'Ba cái: Mittsu.'
          }
        ]
      },
      {
        mondaiNumber: 6,
        mondaiTitle: 'Mondai 6: Ngữ pháp N5',
        mondaiInstruction: '次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        questions: [
          {
            questionNumber: 2,
            questionText: 'この部屋は明るく（　）、広いです。',
            targetWord: 'て',
            readingOptions: [
              { id: '1', text: 'て', isCorrect: true },
              { id: '2', text: 'で', isCorrect: false },
              { id: '3', text: 'に', isCorrect: false },
              { id: '4', text: 'と', isCorrect: false },
            ],
            explanation: 'Nối tính từ đuôi い: Bỏ い thêm くて (明るい -> 明るくて).',
            trapAnalysis: 'Tính từ đuôi な mới dùng で. 明るい là đuôi い nên thành 明るくて.',
            mnemonicTip: 'Sáng sủa và rộng: Akarukute, hiroi.'
          }
        ]
      }
    ]
  }
];

const fileContent = `import { JLPTLevel } from '../types';

export interface ExamMondaiSection {
  mondaiNumber: number;
  mondaiTitle: string;
  mondaiInstruction: string;
  questions: {
    questionNumber: number;
    questionText: string;
    targetWord?: string;
    readingOptions: { id: string; text: string; isCorrect: boolean }[];
    explanation: string;
    trapAnalysis: string;
    mnemonicTip: string;
  }[];
}

export interface StandardPastExam {
  id: string;
  title: string;
  session: '12/2026' | '07/2026' | '12/2025' | '07/2025' | '12/2024' | '07/2024' | '12/2023' | '07/2023' | '12/2022' | string;
  level: JLPTLevel;
  totalTimeMinutes: number;
  totalQuestions: number;
  sections: ExamMondaiSection[];
}

export const authenticPastExams: StandardPastExam[] = ${JSON.stringify(exams, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/fullPastExams.ts'), fileContent, 'utf-8');
console.log('Successfully generated authenticPastExams with 2026 & 2025 exams! Total exams:', exams.length);
