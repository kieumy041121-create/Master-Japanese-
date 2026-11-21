import {
  ReadingTrapItem,
  SpeedReadingItem,
  OfficialDocumentItem,
} from '../types/readingJlptExtended';

// =====================================================================
// SUBMODULE 86: BÓC TÁCH BẪY LOGIC & LUẬN CỨ ĐỌC HIỂU N2-N1
// =====================================================================

export const initialReadingTrapsList: ReadingTrapItem[] = [
  {
    id: 'trap-01',
    level: 'N1',
    title: 'Bẫy Đảo Ngược Quan Hệ Nhân Quả (Causality Inversion Trap)',
    trapType: 'causality',
    trapTypeName: 'Đảo ngược Nhân - Quả',
    passageJapanese:
      '現代社会において、情報通信技術の進歩が個人の孤独感を深めていると論じられることが多い。しかし、注意深く観察すれば、孤独感に苛まれている人々が救いを求めてインターネット空間へと過度に没入しているという側面も看過できない。道具が人間を孤立させたのではなく、孤立した人間が道具を精神的な拠り所としているのではないだろうか。',
    passageVietnamese:
      'Trong xã hội hiện đại, thường có lập luận cho rằng sự tiến bộ của công nghệ thông tin viễn thông đang làm sâu sắc thêm nỗi cô đơn của cá nhân. Tuy nhiên, nếu quan sát kỹ, không thể bỏ qua khía cạnh rằng chính những con người đang bị nỗi cô đơn giằng xé mới đắm chìm quá mức vào không gian Internet để tìm kiếm sự cứu rỗi. Phải chăng không phải công cụ đã cô lập con người, mà chính con người cô lập đã coi công cụ như một điểm tựa tinh thần?',
    authorThesis: 'Công nghệ không phải nguyên nhân tạo ra sự cô lập; mà sự cô độc sẵn có thôi thúc con người tìm đến công nghệ.',
    distractorTrapAnalysis: {
      optionA: {
        text: '情報通信技術の急速な発展こそが、現代人を孤独へと追いやった元凶である。',
        isCorrect: false,
        explanation: 'BẪY TIỀN ĐỀ: Đây là luận điểm phổ biến mà tác giả nêu ra ở câu đầu chỉ để phản bác ở câu sau (しかし).',
      },
      optionB: {
        text: '孤独を抱える人々は、精神的救済を求めてネットに依存する傾向が見られる。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Khớp trọn vẹn với ý tác giả: "孤立した人間が道具を精神的な拠り所としているのではないだろうか".',
      },
      optionC: {
        text: '現代人はインターネットの利用を制限することで孤独から脱却できる。',
        isCorrect: false,
        explanation: 'BẪY SUY DIỄN QUÁ ĐÀ: Tác giả không hề đề xuất giải pháp cấm đoán hay cắt giảm Internet.',
      },
      optionD: {
        text: '孤独感は情報通信技術の進歩とは何の関係もない無関係な現象である。',
        isCorrect: false,
        explanation: 'BẪY CỰC ĐOAN: Tác giả thừa nhận hai điều có quan hệ, nhưng là quan hệ ngược lại chứ không phải hoàn toàn không liên quan.',
      },
    },
    keyMarkers: ['しかし (tuy nhiên - bẻ ngoặt)', '看過できない (không thể bỏ qua)', '～のではないだろうか (chẳng phải là... hay sao - quan điểm tác giả)'],
    strategicTip: 'Cấu trúc kinh điển N1/N2: [Ý kiến số đông] + しかし + [Thực tế ngầm] + のではないだろうか. Ý kiến thật sự của tác giả luôn nằm ở mệnh đề sau しかし và chốt lại bằng のではないか.',
    detailedAnalysis: 'Người ra đề JLPT N1 luôn cài cắm câu trả lời sai bằng cách trích nguyên văn câu đầu tiên của bài đọc. Thí sinh đọc lướt thấy từ vựng quen thuộc liền khoanh ngay mà không nhận ra tác giả viết câu đó là để bác bỏ. Cần bám chặt tín hiệu chuyển ý しかし.',
  },
  {
    id: 'trap-02',
    level: 'N2',
    title: 'Bẫy Khái Quát Hóa Tuyệt Đối (Overgeneralization Trap: すべて・必ず)',
    trapType: 'generalization',
    trapTypeName: 'Khái quát hóa quá mức',
    passageJapanese:
      '読書が思考力を育む有効な手段であることは疑いようがない。だが、活字を目で追う行為そのものが自動的に知性の向上を保証するわけではない。主体的な問いを持たずに漫然と活字を消費するだけの読書は、むしろ他者の思考の受動的な模倣に終始する危険性すら孕んでいる。真の思索は、文章の行間を疑い、自らと思索を交わす瞬間にこそ宿る。',
    passageVietnamese:
      'Việc đọc sách là một phương thức hữu hiệu để nuôi dưỡng năng lực tư duy là điều không thể nghi ngờ. Thế nhưng, bản thân hành vi đưa mắt dõi theo con chữ không tự động bảo đảm sự nâng cao của trí tuệ. Việc đọc sách một cách mơ hồ chỉ đơn thuần tiêu thụ mặt chữ mà không mang theo câu hỏi chủ động, thậm chí còn tiềm ẩn nguy cơ dừng lại ở sự bắt chước thụ động tư tưởng của người khác. Suy tư chân chính chỉ trú ngụ vào chính khoảnh khắc ta nghi vấn từng khoảng cách giữa các dòng chữ và đối thoại với chính mình.',
    authorThesis: 'Đọc sách thụ động không làm tăng trí tuệ; chỉ khi chủ động đặt câu hỏi và phản tư thì tư duy mới phát triển.',
    distractorTrapAnalysis: {
      optionA: {
        text: '本を多く読めば読むほど、誰でも必ず知性と論理的思考力が向上する。',
        isCorrect: false,
        explanation: 'BẪY TUYỆT ĐỐI HÓA (必ず・誰でも): Tác giả khẳng định rõ "自動的に知性の向上を保証するわけではない" (không tự động bảo đảm).',
      },
      optionB: {
        text: '他者の思考を真似る受動的な読書は、すべての読書の中で最も有害である。',
        isCorrect: false,
        explanation: 'BẪY CỰC ĐOAN (すべて・最も): Tác giả nói có nguy cơ (危険性を孕んでいる) chứ không dùng từ cực đoan nhất.',
      },
      optionC: {
        text: '自発的な問いを持ち、内容と対話しながら読むことで初めて真の思考力が培われる。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Diễn đạt lại hoàn hảo mệnh đề "主体的な問い... 自らと思索を交わす瞬間にこそ宿る".',
      },
      optionD: {
        text: '活字を目で追うことよりも、他者と議論を交わすことのほうが価値がある。',
        isCorrect: false,
        explanation: 'BẪY SO SÁNH NGOÀI PHẠM VI: Đoạn văn không hề đưa yếu tố "thảo luận với người khác" ra để so sánh hơn kém.',
      },
    },
    keyMarkers: ['～わけではない (không hẳn là - phủ định một phần)', 'むしろ (trái lại/thậm chí)', '～にこそ宿る (chính vào lúc... mới ngự trị)'],
    strategicTip: 'Trong các phương án có chứa từ tuyệt đối: 必ず (chắc chắn), すべて (tất cả), 決して...ない (tuyệt đối không), 最も (nhất), xác suất sai lên đến 85% trừ khi tác giả dùng chính xác từ đó trong bài.',
    detailedAnalysis: 'Thủ thuật phổ biến của bài thi N2 là đẩy nhận định có điều kiện của tác giả thành quy luật phổ quát tuyệt đối. Cụm từ "～わけではない" trong đề bài thường là chìa khóa phủ định những phương án cực đoan.',
  },
  {
    id: 'trap-03',
    level: 'N1',
    title: 'Bẫy Phân Biệt "Ý Kiến Tác Giả" vs "Dẫn Chứng Khách Quan"',
    trapType: 'author_vs_cite',
    trapTypeName: 'Ý kiến Tác giả vs Dẫn chứng viện dẫn',
    passageJapanese:
      'ある著名な経済学者は、「消費者が合理的な損得勘定のみに基づいて行動する」という古典的モデルを提唱した。しかし日々の買い物において、私たちがパッケージの色彩や店員の笑顔に心を動かされ、予定外の出費をしてしまうのは日常茶飯事である。理論が描く冷徹な人間像と、生身の人間の揺らぎに満ちた心理との間には、埋めがたい乖離が存在していると言わざるを得ない。',
    passageVietnamese:
      'Một nhà kinh tế học lỗi lạc từng đề xuất mô hình cổ điển rằng "người tiêu dùng hành động chỉ dựa trên sự tính toán thiệt hơn mang tính duy lý". Tuy nhiên trong việc mua sắm hằng ngày, việc chúng ta bị lay động bởi màu sắc bao bì hay nụ cười của nhân viên bán hàng rồi chi tiêu ngoài kế hoạch là chuyện diễn ra như cơm bữa. Ta buộc phải nói rằng giữa bức chân dung con người lạnh lùng mà lý thuyết phác họa và tâm lý đầy biến thiên của con người bằng xương bằng thịt, tồn tại một khoảng cách khó lòng san lấp.',
    authorThesis: 'Hành vi mua sắm thực tế của con người bị chi phối bởi tâm lý và cảm xúc, khác xa với lý thuyết duy lý cứng nhắc.',
    distractorTrapAnalysis: {
      optionA: {
        text: '消費者は常に合理的な計算に基づいて商品の購買決定を下している。',
        isCorrect: false,
        explanation: 'BẪY TRÍCH DẪN: Đây là quan điểm của nhà kinh tế học cổ điển được viện dẫn, hoàn toàn đối lập với quan điểm thật của tác giả.',
      },
      optionB: {
        text: '経済学の理論は、生身の人間の複雑な心理的要因を十分に捉えきれていない。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Khớp với câu kết "埋めがたい乖離が存在していると言わざるを得ない".',
      },
      optionC: {
        text: '店員の笑顔やパッケージデザインは、消費者の購買行動にほとんど影響を与えない。',
        isCorrect: false,
        explanation: 'BẪY PHỦ ĐỊNH TRÁI NGƯỢC: Tác giả nêu đây là yếu tố lay động tâm lý người mua.',
      },
      optionD: {
        text: '古典的な経済学モデルは、現代の市場経済においても極めて有効に機能している。',
        isCorrect: false,
        explanation: 'BẪY TRÁI Ý TÁC GIẢ: Tác giả chỉ ra lỗ hổng lớn của mô hình này trước tâm lý học hành vi.',
      },
    },
    keyMarkers: ['～と提唱した (đã đề xuất - quan điểm người khác)', '言わざるを得ない (buộc phải nói rằng - chốt hạ của tác giả)', '埋めがたい乖離 (khoảng cách khó bù đắp)'],
    strategicTip: 'Khi gặp cụm từ "～氏によると" (theo ông X) hay "～と論じられている" (được luận bàn rằng), hãy đánh dấu lại vì đó là TRÍCH DẪN KHÁCH QUAN, không phải lập trường tác giả. Hãy tìm mệnh đề sau "しかし" hoặc "～と言わざるを得ない".',
    detailedAnalysis: 'Câu hỏi JLPT: "筆者の考えと最も合致するものはどれか" (Điều nào phù hợp nhất với suy nghĩ của tác giả?). Đề thi thường lấy quan điểm của người được trích dẫn làm mồi nhử. Thí sinh phải bóc tách lớp ý kiến của người khác và định vị chính xác "chủ kiến của tác giả".',
  },
  {
    id: 'trap-04',
    level: 'N1',
    title: 'Bẫy Phủ Định Kép & Phủ Định Ẩn (Double Negative & Implicit Negation)',
    trapType: 'double_negative',
    trapTypeName: 'Phủ định kép & Phủ định ngầm',
    passageJapanese:
      '伝統工芸の保護を訴える声は高いが、過去の様式を寸分違わず複製し続けることだけが伝統の継承であるとは、私には到底思えない。時代ごとの新たな素材や技術との摩擦を恐れ、変化を拒絶する態度は、保護という美名のもとに文化の命脈を絶つ行為に他ならないのではないか。変革を伴わない保存など、真の継承とは言えないのである。',
    passageVietnamese:
      'Dù tiếng nói kêu gọi bảo tồn thủ công truyền thống rất lớn, nhưng với tôi, việc tiếp tục sao chép nguyên vẹn không sai một li phong cách của quá khứ tuyệt nhiên không thể coi là sự kế thừa truyền thống. Thái độ sợ hãi va chạm với vật liệu mới, công nghệ mới của từng thời đại mà khước từ biến đổi, chẳng phải không gì khác hơn là hành vi cắt đứt mạch sống của văn hóa dưới danh nghĩa mỹ miều là "bảo tồn" đó sao? Sự bảo tồn không đi kèm cải cách thì chẳng thể gọi là sự kế thừa chân chính.',
    authorThesis: 'Kế thừa truyền thống đích thực bắt buộc phải đi cùng sự cải cách và thích ứng linh hoạt với thời đại mới.',
    distractorTrapAnalysis: {
      optionA: {
        text: '過去の優れた様式を忠実に守り抜くことこそが、伝統文化の継承の真髄である。',
        isCorrect: false,
        explanation: 'BẪY PHỦ ĐỊNH NGƯỢC Ý: Tác giả khẳng định "複製し続けることだけが伝統の継承であるとは到底思えない".',
      },
      optionB: {
        text: '時代に合わせた変革や試行錯誤を取り入れることなしには、真の伝統継承はあり得ない。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Phủ định kép "変革を伴わない保存など、真の継承とは言えない" = Kế thừa thật phải có biến đổi.',
      },
      optionC: {
        text: '伝統工芸の保存活動は、技術革新を妨げるため全面的に見直されるべきである。',
        isCorrect: false,
        explanation: 'BẪY SUY DIỄN TIÊU CỰC CỰC ĐOAN: Tác giả không kêu gọi dẹp bỏ bảo tồn truyền thống.',
      },
      optionD: {
        text: '新しい素材の導入は、伝統工芸の本質的な価値を損なう危険性が極めて高い。',
        isCorrect: false,
        explanation: 'BẪY NGƯỢC Ý: Tác giả phê phán tư tưởng sợ hãi vật liệu mới.',
      },
    },
    keyMarkers: ['～とは到底思えない (tuyệt nhiên không nghĩ là)', '～に他ならないのではないか (chẳng phải chính là... hay sao)', '～を伴わない...など、～とは言えない (cái gì không đi kèm... thì không thể nói là...)'],
    strategicTip: 'Quy tắc vàng toán học trong đọc hiểu tiếng Nhật: "Phủ định của phủ định = Khẳng định mạnh mẽ". Cụm từ "AなしにはBはない" hoặc "Aを伴わないBはBと言えない" có nghĩa là: Để có B, BẮT BUỘC phải có A.',
    detailedAnalysis: 'Ngữ pháp N1 thường dùng chuỗi phủ định tầng bậc để tạo phong cách văn phong hàn lâm. Thí sinh cần giải mã chuỗi phủ định kép thành mệnh đề khẳng định đơn giản trước khi so sánh với 4 phương án trả lời.',
  },
  {
    id: 'trap-05',
    level: 'N2',
    title: 'Bẫy Giới Hạn Phạm Vi Tinh Vi (Subtle Scope & Restriction Trap)',
    trapType: 'subtle_restriction',
    trapTypeName: 'Bóp méo giới hạn điều kiện',
    passageJapanese:
      '近年、テレワークの普及により通勤ストレスが軽減されたと歓迎されている。確かに移動時間の削減は個人の可処分時間を増やしたが、それは自律的に業務を遂行できる熟練者に限られた恩恵である。業務の全体像を把握できていない新入社員にとっては、偶発的な対面対話の欠如が深刻な孤立感と業務習得の停滞を招いているという現実に目を向ける必要がある。',
    passageVietnamese:
      'Những năm gần đây, việc phổ cập làm việc từ xa (telework) được hoan nghênh vì giảm bớt áp lực di chuyển đi làm. Đúng là việc cắt giảm thời gian di chuyển đã gia tăng quỹ thời gian tự do cho cá nhân, nhưng đó chỉ là ân huệ giới hạn đối với những người thành thạo có khả năng tự chủ giải quyết công việc. Đối với các nhân viên mới chưa nắm được bức tranh tổng thể của công việc, chúng ta cần phải nhìn thẳng vào hiện thực rằng sự thiếu thốn các cuộc đối thoại trực tiếp ngẫu nhiên đang dẫn đến nỗi cô đơn sâu sắc và sự đình trệ trong việc tiếp thu nghiệp vụ.',
    authorThesis: 'Lợi ích của telework không mang tính phổ quát cho mọi đối tượng; với nhân viên mới nó gây trở ngại lớn.',
    distractorTrapAnalysis: {
      optionA: {
        text: 'テレワークはすべての従業員に対して業務効率の向上と時間的ゆとりをもたらした。',
        isCorrect: false,
        explanation: 'BẪY BỎ QUA GIỚI HẠN: Bài đọc nhấn mạnh "熟練者に限られた恩恵" (chỉ giới hạn ở người lành nghề).',
      },
      optionB: {
        text: '新入社員に対するテレワーク導入は、対面交流の減少により育成上の課題を抱えている。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Phản ánh trọn vẹn luận điểm giới hạn đối tượng của tác giả.',
      },
      optionC: {
        text: '自律的に仕事ができる熟練者であっても、テレワークによる精神的負担は増大している。',
        isCorrect: false,
        explanation: 'BẪY SAI ĐỐI TƯỢNG: Người lành nghề được hưởng lợi ("恩恵"), còn người chịu gánh nặng là nhân viên mới.',
      },
      optionD: {
        text: '通勤時間のストレスを無くすためには、企業は完全なテレワーク体制へ移行すべきである。',
        isCorrect: false,
        explanation: 'BẪY TRÁI HƯỚNG BÀI VIẾT: Tác giả cảnh báo mặt trái của telework chứ không thúc giục áp dụng 100%.',
      },
    },
    keyMarkers: ['～に限られた恩恵 (ân huệ chỉ giới hạn ở...)', '～にとって (đối với đối tượng X)', '～に目を向ける必要がある (cần hướng mắt vào)'],
    strategicTip: 'Đề thi N2 thường gài bẫy bằng cách mở rộng ân huệ của nhóm nhỏ thành của toàn thể công ty, hoặc gán ghép khó khăn của nhóm A sang nhóm B. Luôn khoanh tròn đối tượng (Ai được hưởng lợi, Ai gặp khó khăn).',
    detailedAnalysis: 'Kỹ thuật đọc hiểu quan trọng nhất: "Mapping đối tượng". Cần lập bảng nhẩm: Nhóm người lành nghề (熟練者) = Tiết kiệm thời gian, tự do; Nhóm nhân viên mới (新入社員) = Mất đối thoại trực tiếp, cô lập, chậm tiến bộ.',
  },
];

export const extraReadingTrapsList: ReadingTrapItem[] = [
  {
    id: 'trap-06',
    level: 'N1',
    title: 'Bẫy Ẩn Dụ & Nghĩa Biểu Trưng (Metaphor & Symbolic Implication)',
    trapType: 'author_vs_cite',
    trapTypeName: 'Ẩn dụ & Nghĩa biểu trưng',
    passageJapanese:
      '人間関係において「摩擦のない滑らかな滑走路」を求める若者が増えているという。衝突を嫌い、無難な相づちと表面的な同調で繕われた関係は、確かに一時的な安心感をもたらす。しかし、適度な摩擦抵抗のない地面の上では、車輪が空回りして前進できないのと同様に、魂の真のぶつかり合いを避けた関係性からは、真の連帯感も個人の精神的成熟も生まれ得ない。',
    passageVietnamese:
      'Người ta nói rằng ngày càng nhiều người trẻ tìm kiếm "một đường băng trơn tru không ma sát" trong các mối quan hệ nhân sinh. Mối quan hệ được ngụy trang bằng sự đồng tình hời hợt và những tiếng đệm vô thưởng vô phạt để tránh xung đột, quả thực đem lại cảm giác yên tâm nhất thời. Thế nhưng, cũng giống như việc trên một mặt đất thiếu lực ma sát thích hợp thì bánh xe sẽ quay trượt mà không thể tiến lên phía trước, từ những mối quan hệ né tránh sự va chạm chân thành của tâm hồn, chẳng thể nào nảy nở sự liên đới đích thực lẫn sự trưởng thành tinh thần của cá nhân.',
    authorThesis: 'Né tránh va chạm trong quan hệ xã hội chỉ đem lại bình yên giả tạo; va chạm tích cực mới thúc đẩy trưởng thành.',
    distractorTrapAnalysis: {
      optionA: {
        text: '対人関係における衝突は、精神的疲弊を招くためできる限り回避すべきである。',
        isCorrect: false,
        explanation: 'BẪY ĐIỀU TÁC GIẢ BÁC BỎ: Đây là xu hướng của giới trẻ mà tác giả phê phán.',
      },
      optionB: {
        text: '衝突や意見の相違を恐れずにぶつかり合う経験こそが、人間の精神的成熟を促す。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Giải mã thành công ẩn dụ lực ma sát (摩擦) = sự va chạm cọ xát cần thiết trong quan hệ.',
      },
      optionC: {
        text: '摩擦のない滑らかな人間関係を築く技術を若者に教育することが急務である。',
        isCorrect: false,
        explanation: 'BẪY TRÁI Ý HOÀN TOÀN.',
      },
      optionD: {
        text: '他者への表面的な同調は、組織の円滑な運営において最も効率的な態度である。',
        isCorrect: false,
        explanation: 'BẪY LẠC ĐỀ: Bài nói về sự gắn kết tâm hồn và trưởng thành cá nhân.',
      },
    },
    keyMarkers: ['確かに～しかし (Đúng là A... nhưng mà B)', '～と同様に (Cũng giống như - Ẩn dụ)', '～生まれ得ない (không thể sinh ra)'],
    strategicTip: 'Khi tác giả dùng hình tượng tự nhiên hoặc vật lý (đường băng, bánh xe quay trượt, ma sát), hãy tìm ngay mệnh đề ứng xạ với con người ở vế sau của câu so sánh.',
    detailedAnalysis: 'Ẩn dụ N1 là bài toán 2 vế: Vế A (Bánh xe cần ma sát để tiến lên) = Vế B (Con người cần cọ xát va chạm để trưởng thành). Câu trả lời đúng sẽ giải mã từ trừu tượng thành nghĩa hành vi thực tế.',
  },
  {
    id: 'trap-07',
    level: 'N2',
    title: 'Bẫy Thời Gian & Biến Thiên Trạng Thái (Timeline & State Shift Trap)',
    trapType: 'causality',
    trapTypeName: 'Biến thiên dòng thời gian (Quá khứ vs Hiện tại)',
    passageJapanese:
      'かつて地方都市の商店街は、単なる物品売買の場にとどまらず、地域住民の見守りや情報交換を担うコミュニティの核であった。しかし大型商業施設の進出や車社会の進展によってシャッター通りと化した今、その役割は急速に失われた。今日、衰退した商店街を再興しようとする試みにおいて重要なのは、過去の賑わいをそのまま再現することではなく、現代のニーズに即した新たな交流の場として再定義することである。',
    passageVietnamese:
      'Trước kia, các con phố mua sắm (shotengai) ở các đô thị địa phương không chỉ dừng lại ở nơi mua bán hàng hóa, mà từng là hạt nhân cộng đồng đảm nhiệm việc quan tâm bảo bọc cư dân và trao đổi thông tin. Nhưng giờ đây khi đã biến thành những con phố đóng cửa im lìm (shutter-dori) do sự thâm nhập của trung tâm thương mại lớn và xã hội ô tô, vai trò đó đã nhanh chóng mất đi. Ngày nay, trong nỗ lực phục hưng các phố mua sắm suy thoái, điều trọng yếu không phải là tái hiện nguyên xi sự nhộn nhịp trong quá khứ, mà là định nghĩa lại chúng như một không gian giao lưu mới mẻ thích ứng với nhu cầu hiện đại.',
    authorThesis: 'Hồi sinh phố mua sắm địa phương đòi hỏi tạo lập giá trị giao lưu kiểu mới phù hợp thời đại, chứ không phải hoài niệm quá khứ.',
    distractorTrapAnalysis: {
      optionA: {
        text: '地方の商店街を再生させるには、過去の活気ある物品売買の姿を忠実に復元すべきだ。',
        isCorrect: false,
        explanation: 'BẪY QUÁ KHỨ: Tác giả nhấn mạnh "過去の賑わいをそのまま再現することではなく" (không phải tái hiện quá khứ).',
      },
      optionB: {
        text: '現代における商店街の再興には、時代の要請に応じた新しい交流機能の創出が不可欠である。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: "現代のニーズに即した新たな交流の場として再定義すること".',
      },
      optionC: {
        text: '大型商業施設を撤退させることが、商店街のコミュニティ機能を回復させる唯一の道だ。',
        isCorrect: false,
        explanation: 'BẪY TIÊU CỰC VÀ TỰ Ý NÊU GIẢI PHÁP.',
      },
      optionD: {
        text: '商店街は物品の売買に特化すべきであり、地域交流を担う必要はない。',
        isCorrect: false,
        explanation: 'BẪY SAI HOÀN TOÀN VỚI TINH THẦN CỦA BÀI VIẾT.',
      },
    },
    keyMarkers: ['かつて (trước kia - trạng thái cũ)', '今 (bây giờ - trạng thái hiện tại)', '～ではなく...である (không phải A mà là B)'],
    strategicTip: 'Chú ý tương quan thời gian: かつて / 昔 (xưa) vs 今 / 今日 / 現在 (nay). Đề thi luôn dùng giải pháp của thời kỳ "xưa" để làm bẫy cho câu hỏi về "nhiệm vụ hiện nay".',
    detailedAnalysis: 'Dạng bài "A ではなく B である" (Không phải A mà là B). Luôn luôn ghi nhớ: Phương án nào nhắc lại vế A chắc chắn là bẫy. Đáp án đúng luôn nằm trọn ở vế B.',
  },
  {
    id: 'trap-08',
    level: 'N1',
    title: 'Bẫy Điều Kiện Tiên Quyết Bị Bỏ Sót (Prerequisite Clause Trap: のみ・条件)',
    trapType: 'subtle_restriction',
    trapTypeName: 'Điều kiện tiên quyết ngặt nghèo',
    passageJapanese:
      '人工知能（AI）による自動翻訳の精度は目覚ましい進歩を遂げた。しかし、異文化間の機微に富んだ交渉や文学的表現の翻訳において、AIの出力を無批判に信頼することは極めて危険である。文脈に埋め込まれた歴史的背景や話者の微妙な感情の揺らぎを汲み取る力において、人間の洞察力は今なお不可欠である。AIはあくまで補助具であり、それを統御する人間の高度なリテラシーが伴って初めて、その真価が発揮されるのだ。',
    passageVietnamese:
      'Độ chính xác của dịch thuật tự động bằng trí tuệ nhân tạo (AI) đã đạt được những bước tiến ngoạn mục. Tuy nhiên, trong các cuộc đàm phán đa văn hóa giàu tính tinh tế hay dịch thuật các biểu đạt văn học, việc tin tưởng mù quáng không phê phán các đầu ra của AI là vô cùng nguy hiểm. Về năng lực thấu cảm bối cảnh lịch sử chìm sâu trong văn cảnh hay dao động cảm xúc vi tế của người nói, sự thấu triệt của con người cho đến nay vẫn là không thể thay thế. AI rốt cuộc chỉ là công cụ hỗ trợ, và chỉ khi đi kèm với năng lực tri thức cao của con người nắm quyền điều phối, giá trị thực sự của nó mới được phát huy.',
    authorThesis: 'AI dịch thuật chỉ phát huy giá trị chân chính khi có sự giám sát và năng lực thấu cảm sâu sắc của con người.',
    distractorTrapAnalysis: {
      optionA: {
        text: 'AIの翻訳精度はすでに人間の洞察力を上回り、文化的な交渉にも十分対応できる。',
        isCorrect: false,
        explanation: 'BẪY SAI NGƯỢC THỰC TẾ TRONG BÀI.',
      },
      optionB: {
        text: '高度なリテラシーを備えた人間が適切に活用してこそ、AI翻訳は真の効果を発揮する。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: "それを統御する人間の高度なリテラシーが伴って初めて、その真価が発揮される".',
      },
      optionC: {
        text: 'AIの誤訳を防ぐためには、文学作品の翻訳にAIを使用することを一切禁止すべきだ。',
        isCorrect: false,
        explanation: 'BẪY CỰC ĐOAN (一切禁止).',
      },
      optionD: {
        text: '人間の洞察力は、技術の進歩とともにAIによって完全に代替される運命にある。',
        isCorrect: false,
        explanation: 'BẪY TIÊU CỰC KHÔNG CÓ TRONG BÀI.',
      },
    },
    keyMarkers: ['～て初めて (Chỉ sau khi... mới - Điều kiện tiên quyết)', '無批判に (không phê phán / mù quáng)', '今なお不可欠 (bây giờ vẫn không thể thiếu)'],
    strategicTip: 'Cấu trúc ngữ pháp "V-て初めて～" (Chỉ khi... mới thực sự...) là tín hiệu khẳng định điều kiện cốt lõi của tác giả. Mọi phương án bỏ qua điều kiện này đều là phương án nhiễu.',
    detailedAnalysis: 'Đọc hiểu N1 rất chuộng dạng câu hỏi "Điều kiện để AI phát huy giá trị là gì?". Người ra đề sẽ bẫy thí sinh bằng cách đưa ra câu khẳng định AI tự nó đã hoàn hảo.',
  },
  {
    id: 'trap-09',
    level: 'N2',
    title: 'Bẫy Đồng Nghĩa Mặt Chữ Nhưng Lệch Tông Giọng (Tone Mismatch Trap)',
    trapType: 'generalization',
    trapTypeName: 'Lệch tông giọng (Trang trọng vs Phê phán mỉa mai)',
    passageJapanese:
      '会議の場において、「波風を立てないこと」を最優先し、誰も反対意見を口にしない沈黙が支配することがある。一見すると全員一致の調和が保たれているように映るが、それは単なる思考停止に過ぎない。摩擦を恐れるあまり健全な批判を封じ込める組織は、予期せぬ危機の到来とともに脆くも崩壊する運命にある。真の協調とは、異なる意見を戦わせた先にある合意形成を指すはずだ。',
    passageVietnamese:
      'Trong các buổi họp, đôi khi sự im lặng thống trị khi việc "không tạo sóng gió" được đặt lên ưu tiên hàng đầu và không ai dám cất lời phản đối. Thoạt nhìn thì có vẻ như sự hòa hợp đồng thuận tuyệt đối đang được duy trì, nhưng đó chẳng qua chỉ là sự đình trệ tư duy. Một tổ chức vì quá sợ ma sát mà bóp nghẹt những phê bình lành mạnh, nắm chắc số phận sụp đổ một cách giòn tan khi khủng hoảng bất ngờ ập đến. Sự phối hợp chân chính ắt hẳn phải chỉ sự tạo dựng đồng thuận sau khi đã cho những ý kiến khác biệt cọ xát với nhau.',
    authorThesis: 'Im lặng dĩ hòa vi quý chỉ là sự tê liệt tư duy; tổ chức mạnh cần dám tranh luận phản biện lành mạnh.',
    distractorTrapAnalysis: {
      optionA: {
        text: '会議では意見の衝突を避けることで、組織の結束力を最大限に高めることができる。',
        isCorrect: false,
        explanation: 'BẪY TRÁI Ý TÁC GIẢ.',
      },
      optionB: {
        text: '表面的な調和を優先して異論を排除する組織は、環境変化や危機に対して非常に脆弱である。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: "脆くも崩壊する運命にある" = vô cùng yếu ớt mỏng manh trước khủng hoảng.',
      },
      optionC: {
        text: '反対意見を述べる社員は、組織の調和を乱す存在として排除されるべきである。',
        isCorrect: false,
        explanation: 'BẪY SAI NGƯỢC TINH THẦN.',
      },
      optionD: {
        text: '思考停止に陥らないためには、すべての会議で必ず多数決を採るべきである。',
        isCorrect: false,
        explanation: 'BẪY TỰ NÊU GIẢI PHÁP NGOẠI LAI (多数決 - bỏ phiếu đa số không được nhắc tới).',
      },
    },
    keyMarkers: ['～に過ぎない (chẳng qua chỉ là)', '一見すると～に見えるが (Thoạt nhìn trông có vẻ... nhưng thực chất)', '～はずだ (Ắt hẳn là - Niềm tin của tác giả)'],
    strategicTip: 'Công thức "一見 A に見えるが、実は B" (Thoạt nhìn tưởng là A, nhưng thực tế lại là B). Đề thi luôn dùng vẻ bề ngoài A để dụ thí sinh.',
    detailedAnalysis: 'Thủ thuật: Dùng từ "調和" (hòa hợp) có vẻ tích cực để đánh lừa, nhưng tác giả lại dùng "単なる思考停止" (chỉ là chết não/ngừng tư duy) để phê phán gay gắt.',
  },
  {
    id: 'trap-10',
    level: 'N1',
    title: 'Bẫy Trọng Tâm Luận Cứ Cuối Bài (End-of-Passage Thesis Shift)',
    trapType: 'author_vs_cite',
    trapTypeName: 'Trọng tâm chuyển dịch câu kết (Dẫn nhập ➔ Cốt lõi)',
    passageJapanese:
      '科学技術の発展は人間に計り知れない利便性をもたらし、かつては克服不可能と思われた疫病や飢餓の脅威を劇的に減少させた。この点において技術の恩恵を否定することは誰にもできない。しかし、私たちが真に問うべきは、手に入れたその膨大な力を「何のために、いかなる価値基準をもって行使するのか」という倫理的羅針盤の有無である。力そのものの肥大化に歓喜する一方で、精神の成熟が追いついていないとすれば、それは人類にとって最大の悲劇の幕開けとなりかねない。',
    passageVietnamese:
      'Sự phát triển của khoa học kỹ thuật đã đem lại cho con người sự tiện lợi khôn lường, giảm thiểu rõ rệt nguy cơ bệnh dịch và nạn đói vốn từng bị xem là không thể khắc phục. Về điểm này, không ai có thể phủ nhận ân huệ của công nghệ. Tuy nhiên, điều chúng ta thực sự cần chất vấn là liệu chúng ta có chiếc la bàn đạo đức để định hướng: "Sử dụng nguồn sức mạnh khổng lồ đã giành được đó vì mục đích gì, và mang theo hệ tiêu chuẩn giá trị nào?". Trong khi hoan hỉ trước sự phình to của bản thân sức mạnh, nếu sự trưởng thành về tinh thần không đuổi kịp, thì đó rất có thể sẽ trở thành khúc mở màn cho bi kịch lớn nhất của nhân loại.',
    authorThesis: 'Tiến bộ kỹ thuật phải song hành với chiếc la bàn đạo đức và sự trưởng thành tinh thần của nhân loại.',
    distractorTrapAnalysis: {
      optionA: {
        text: '科学技術の進歩は、飢餓や疫病を根絶するための唯一の解決策である。',
        isCorrect: false,
        explanation: 'BẪY ĐOẠN ĐẦU: Đoạn đầu chỉ là nền tảng dẫn nhập sự tiện lợi.',
      },
      optionB: {
        text: '技術の拡大に見合う倫理的判断力と精神の成熟を培うことが、現代の人類に強く求められている。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Phản ánh trọn vẹn câu hỏi lớn cuối bài: "倫理的羅針盤の有無... 精神の成熟".',
      },
      optionC: {
        text: '人類の精神的成熟を待つために、科学技術の研究開発は一時的に凍結されるべきだ。',
        isCorrect: false,
        explanation: 'BẪY TIÊU CỰC CỰC ĐOAN: Không tác giả nào kêu gọi đóng băng khoa học.',
      },
      optionD: {
        text: '倫理観の欠如した技術開発であっても、利便性が高ければ容認されるべきである。',
        isCorrect: false,
        explanation: 'BẪY TRÁI NGƯỢC HOÀN TOÀN.',
      },
    },
    keyMarkers: ['しかし、私たちが真に問うべきは (Thế nhưng điều chúng ta thực sự cần hỏi là - Điểm rơi trọng tâm)', '～かねない (có nguy cơ dẫn tới hậu quả xấu)'],
    strategicTip: 'Đoạn văn kiểu N1 thường dành 70% mở đầu ca ngợi hoặc nêu sự thật hiển nhiên. Đừng để bị ru ngủ! Trọng tâm thực sự luôn bùng nổ sau cụm từ: "しかし、私たちが真に問うべきは...".',
    detailedAnalysis: 'Dạng bài "Mở bài tích cực - Thân bài phản tỉnh - Kết bài cảnh báo". Câu hỏi cốt lõi của bài đọc luôn xoay quanh câu cảnh báo cuối cùng.',
  },
];

// =====================================================================
// SUBMODULE 87: PHÒNG LUYỆN TỐC ĐỌC SKIMMING & SCANNING
// =====================================================================

export const initialSpeedReadingList: SpeedReadingItem[] = [
  {
    id: 'speed-01',
    level: 'N2',
    title: 'Thời Gian Bán Thải Tri Thức & Học Tập Suốt Đời',
    theme: 'Giáo dục & Xã hội học',
    wordCount: 380,
    recommendedTimeSec: 65,
    contentJapanese:
      '現代社会において知識の賞味期限は急速に短縮している。かつて大学で習得した専門知識は、数十年間にわたり職業人生を支える強固な土台となり得た。しかしデジタル技術の爆発的な進展に伴い、技術や情報の陳腐化するスピードはかつてない次元に達している。今日学んだ最先端のノウハウが、5年後には全く通用しなくなっていることも珍しくない。\n\nこうした急激な環境変化の中にあって、真に価値を持つのは「すでに蓄えた静的な知識の量」ではなく、「未知の領域に直面した際に自力で学び直す力」、すなわちアンラーニングと再学習の俊敏性に他ならない。過去の成功体験に固執してアップデートを怠る専門家よりも、自らの無知を率直に認め、貪欲に新たな知見を吸収し続けられる者こそが、これからの時代を生き抜く強靭さを獲得できるのである。',
    contentVietnamese:
      'Trong xã hội hiện đại, "hạn sử dụng" của tri thức đang co ngắn lại với tốc độ chóng mặt. Tri thức chuyên môn từng tiếp thu ở trường đại học trước kia có thể trở thành bệ đỡ vững chắc nâng niu sự nghiệp trong suốt nhiều thập kỷ. Thế nhưng cùng với sự phát triển bùng nổ của công nghệ kỹ thuật số, tốc độ lỗi thời của công nghệ và thông tin đã chạm đến một chiều kích chưa từng có tiền lệ. Những bí quyết tiên tiến nhất ta học được hôm nay, 5 năm sau đã hoàn toàn không còn ứng dụng được nữa cũng chẳng phải chuyện hiếm hoi.\n\nĐứng trước sự biến chuyển môi trường gấp gáp như vậy, thứ thực sự mang giá trị không phải là "lượng tri thức tĩnh đã tích lũy sẵn", mà chính là "năng lực tự mình học lại khi đối mặt với lĩnh vực hoàn toàn mới lạ" - tức là sự nhanh nhạy trong việc unlearning (gạt bỏ tri thức cũ) và tái học tập. So với một chuyên gia cố chấp bám víu vào thành công trong quá khứ mà lơ là việc cập nhật bản thân, thì chính người dũng cảm thừa nhận sự thiếu hiểu biết của mình và không ngừng khao khát hấp thụ các kiến giải mới mới là người giành được sức sống bền bỉ để sinh tồn trong thời đại phía trước.',
    corePivotSentence: '真に価値を持つのは「すでに蓄えた静的な知識の量」ではなく、「未知の領域に直面した際に自力で学び直す力」に他ならない。',
    pivotsAndConnectors: ['しかし (chuyển ngoặt)', 'こうした急激な環境変化の中にあって (đúc kết bối cảnh)', '～ではなく...に他ならない (khẳng định bản chất cốt lõi)', '～者こそが (chính người như vậy mới...)'],
    skimmingQuestions: [
      {
        question: 'Tác giả cho rằng yếu tố quan trọng nhất để tồn tại trong thời đại hiện nay là gì?',
        options: [
          'Tích lũy khối lượng tri thức tĩnh khổng lồ từ thời đại học.',
          'Năng lực tự gạt bỏ cái cũ và học hỏi lại khi đối mặt điều mới.',
          'Tận dụng triệt để những thành công đã đạt được trong quá khứ.',
          'Chờ đợi sự đào tạo định kỳ từ các doanh nghiệp lớn.',
        ],
        correctIndex: 1,
        explanation: 'Khớp trọn vẹn với câu chốt: "未知の領域に直面した際に自力で学び直す力、すなわちアンラーニングと再学習の俊敏性".',
      },
    ],
    scanningChallenge: {
      targetKeyword: 'アンラーニング',
      targetHint: 'Tìm từ mượn Katakana chỉ năng lực gạt bỏ kiến thức lỗi thời',
      answerContext: 'Đoạn 2: "すなわちアンラーニングと再学習の俊敏性に他ならない"',
    },
    techniqueExplanation:
      'Chiến thuật Skimming: Lướt nhanh qua đoạn 1 (chỉ là nêu bối cảnh tri thức nhanh lỗi thời). Dừng lại và tập trung đọc kỹ đoạn 2 ngay từ tín hiệu "こうした急激な環境変化の中にあって". Câu văn chứa cặp từ "AではなくBに他ならない" chính là nơi chứa 100% linh hồn của bài.',
  },
  {
    id: 'speed-02',
    level: 'N1',
    title: 'Nghịch Lý Của Sự Lựa Chọn Trong Kỷ Nguyên Số',
    theme: 'Tâm lý học hành vi',
    wordCount: 420,
    recommendedTimeSec: 70,
    contentJapanese:
      '選択肢の多様性は、一見すると個人の自由と幸福度を無制限に拡張するように思われる。近代社会は「選べる自由」を至高の価値として追求し、消費社会はその恩恵をあまねく人々に提供してきた。ネット通販を開けば無数の商品が並び、進路や働き方においても前例にとらわれない無数のルートが提示されている。\n\nところが心理学の実証研究が明らかにしたのは、過剰な選択肢がもたらす逆説的な麻痺状態であった。選択肢が一定の閾値を超えると、人間は決定を下すこと自体に過度な認知的負荷を感じ、選択の先延ばしや決断後の後悔に苛まれるようになる。「もっと良い選択があったのではないか」という疑念が、自らが下した決断への満足度を絶えず蝕み続けるのである。\n\n要するに、豊かさの指標と信じられてきた「無限の選択可能性」は、適切な枠組みや自己の基準を欠いた状態では、かえって人間を終わりのない比較と疲弊の檻へと閉じ込める装置になりかねないのだ。',
    contentVietnamese:
      'Sự đa dạng của các lựa chọn thoạt nhìn dường như mở rộng vô hạn sự tự do và mức độ hạnh phúc của cá nhân. Xã hội cận đại theo đuổi "sự tự do được lựa chọn" như một giá trị tối thượng, và xã hội tiêu dùng đã ban phát ân huệ đó cho khắp mọi người. Chỉ cần mở trang thương mại điện tử ra là vô số sản phẩm hiện lên, ngay cả trong con đường học vấn hay phong cách làm việc cũng có vô số lối đi không bị trói buộc bởi tiền lệ.\n\nThế nhưng điều mà các nghiên cứu thực nghiệm tâm lý học đã làm sáng tỏ lại là trạng thái tê liệt mang tính nghịch lý do sự dư thừa lựa chọn gây ra. Khi các lựa chọn vượt qua một ngưỡng nhất định, con người cảm thấy gánh nặng nhận thức quá tải đối với chính việc ra quyết định, dẫn đến trì hoãn chọn lựa hoặc bị giằng xé bởi cảm giác hối tiếc sau khi đã quyết định. Nỗi hoài nghi "Liệu có sự lựa chọn nào tốt hơn nữa không?" không ngừng gặm nhấm sự hài lòng đối với quyết định do chính mình đưa ra.\n\nTóm lại, "khả năng lựa chọn vô hạn" vốn được tin là chỉ số của sự sung túc, trong trạng thái thiếu vắng một khuôn khổ thích hợp hoặc thiếu tiêu chuẩn của bản thân, trái lại rất có thể trở thành cỗ máy giam hãm con người vào chiếc lồng so sánh và kiệt quệ không hồi kết.',
    corePivotSentence: '要するに、無限の選択可能性は、自己の基準を欠いた状態では人間を比較と疲弊の檻へと閉じ込める。',
    pivotsAndConnectors: ['一見すると～思われる (Thoạt nhìn tưởng chừng)', 'ところが (Thế nhưng - bẻ ngoặt sang thực nghiệm)', '要するに (Tóm lại - chốt hạ luận điểm cốt lõi)'],
    skimmingQuestions: [
      {
        question: 'Tại sao việc có quá nhiều lựa chọn lại khiến con người bất an và giảm mức độ hài lòng?',
        options: [
          'Vì chi phí mua sắm trong thời đại số tăng quá cao.',
          'Vì tâm lý luôn lo sợ vẫn còn lựa chọn khác tốt hơn quyết định hiện tại của mình.',
          'Vì công nghệ mạng xã hội làm giảm chất lượng sản phẩm.',
          'Vì con người thời nay không còn hứng thú với việc tự do mua sắm.',
        ],
        correctIndex: 1,
        explanation: 'Khớp với đoạn: "「もっと良い選択があったのではないか」という疑念が、決断への満足度を絶えず蝕み続ける".',
      },
    ],
    scanningChallenge: {
      targetKeyword: '認知的負荷',
      targetHint: 'Tìm thuật ngữ tâm lý học chỉ "gánh nặng nhận thức"',
      answerContext: 'Đoạn 2: "人間は決定を下すこと自体に過度な認知的負荷を感じ"',
    },
    techniqueExplanation:
      'Kỹ thuật Scanning: Khi câu hỏi hỏi về "Lý do bất an", mắt bạn phải lướt nhanh tìm các từ chỉ cảm xúc tiêu cực: 疲弊, 後悔, 疑念. Điểm hội tụ xuất hiện ngay sau từ chuyển tiếp "要するに" ở đầu đoạn cuối.',
  },
  {
    id: 'speed-03',
    level: 'N2',
    title: 'Giao Tiếp Phi Ngôn Ngữ & Sự Thấu Cảm Bối Cảnh',
    theme: 'Giao tiếp & Ngôn ngữ học',
    wordCount: 360,
    recommendedTimeSec: 60,
    contentJapanese:
      '人間が対話を行う際、言葉そのものが伝達する意味情報は全体のわずか一部に過ぎない。表情の微細な変化、視線の泳ぎ、声の抑揚、そして沈黙の長さといった「非言語的シグナル」こそが、発話者の真意を雄弁に物語っている。とりわけハイコンテクスト文化と称される日本社会においては、言語化された言葉の文字通りの意味よりも、その言葉が投げかけられた「文脈」や「空気」を読み取ることが円滑な意思疎通の決定打となる。\n\n例えば、「結構です」という短い一言であっても、語尾が上がれば好意的な受容を示し、語尾が低く切り詰められれば婉曲な拒絶を意味する。言葉の表面的な辞書的意味だけをなぞる機械的なリスニングでは、相手の真意を見誤り、予期せぬ誤解を生む危険性が極めて高い。真の傾聴とは、耳で音声を拾うことにとどまらず、五感を研ぎ澄まして相手の佇まい全体から発せられる微細な波長を受信する営みなのである。',
    contentVietnamese:
      'Khi con người tiến hành đối thoại, thông tin ngữ nghĩa mà bản thân ngôn từ truyền tải chỉ chiếm một phần nhỏ trong toàn bộ quá trình. Những tín hiệu phi ngôn ngữ như sự biến chuyển vi tế của nét mặt, sự chao đảo của ánh mắt, ngữ điệu giọng nói và độ dài của khoảng lặng mới chính là thứ kể câu chuyện về chân ý của người nói một cách hùng hồn nhất. Đặc biệt trong xã hội Nhật Bản vốn được mệnh danh là nền văn hóa ngữ cảnh cao (high context), việc đọc được "bối cảnh" và "bầu không khí" nơi lời nói được phát ra có ý nghĩa quyết định hơn nhiều so với việc chỉ hiểu nghĩa đen của câu từ được nói ra.\n\nChẳng hạn, dù cùng là một từ ngắn ngủi "Kekkou desu", nếu ngữ điệu đuôi câu nâng lên thì biểu thị sự tiếp nhận tích cực, còn nếu đuôi câu hạ thấp và ngắt gọn thì lại mang hàm ý từ chối khéo léo. Lối lắng nghe máy móc chỉ lần theo ý nghĩa từ điển bề mặt của ngôn từ tiềm ẩn nguy cơ cực lớn trong việc phán đoán sai chân ý của đối phương, gây ra những hiểu lầm ngoài dự tính. Lắng nghe chân chính không dừng lại ở việc dùng tai bắt lấy âm thanh, mà là một hoạt động mài sắc ngũ quan để tiếp nhận những bước sóng vi tế phát ra từ toàn bộ dáng vẻ của người đối diện.',
    corePivotSentence: '真の傾聴とは、耳で音声を拾うことにとどまらず、五感を研ぎ澄まして相手の佇まい全体から発せられる微細な波長を受信する営みである。',
    pivotsAndConnectors: ['わずか一部に過ぎない (chỉ là một phần nhỏ)', 'とりわけ (đặc biệt là)', '例えば (Ví dụ - minh họa cho luận điểm)', '真の傾聴とは (Khái niệm hóa chân thực)'],
    skimmingQuestions: [
      {
        question: 'Tác giả định nghĩa việc "lắng nghe chân chính" (真の傾聴) là như thế nào?',
        options: [
          'Chỉ cần tra cứu chuẩn xác nghĩa từ điển của mọi từ vựng đối phương nói.',
          'Ghi nhớ độ dài chính xác của từng khoảng lặng trong cuộc trò chuyện.',
          'Dùng toàn bộ giác quan để thấu cảm trọn vẹn tín hiệu phi ngôn ngữ và bối cảnh từ đối phương.',
          'Học thuộc mọi mẫu câu từ chối khéo léo trong tiếng Nhật.',
        ],
        correctIndex: 2,
        explanation: 'Khớp chính xác câu kết: "五感を研ぎ澄まして相手の佇まい全体から発せられる微細な波長を受信する営み".',
      },
    ],
    scanningChallenge: {
      targetKeyword: 'ハイコンテクスト文化',
      targetHint: 'Tìm khái niệm văn hóa miêu tả xã hội Nhật Bản',
      answerContext: 'Đoạn 1: "とりわけハイコンテクスト文化と称される日本社会においては"',
    },
    techniqueExplanation:
      'Nguyên tắc Skimming: Khi gặp chữ "例えば" (Ví dụ), bạn có thể lướt mắt cực nhanh qua ví dụ đó trong 3 giây để hiểu ý, sau đó dồn lực vào câu kết luận "真の～とは" để tìm ra định nghĩa then chốt của tác giả.',
  },
];

export const extraSpeedReadingList: SpeedReadingItem[] = [
  {
    id: 'speed-04',
    level: 'N1',
    title: 'Sự Tiêu Biến Của Khoảng Lặng Trống Trải (Boredom & Creativity)',
    theme: 'Triết học công nghệ',
    wordCount: 440,
    recommendedTimeSec: 75,
    contentJapanese:
      'スマートフォンの普及は、私たちの日常から「手持ち無沙汰な空白時間」を徹底的に駆逐した。電車の待ち時間、エレベーターの中、信号待ちのわずか数十秒ですら、私たちは無意識にポケットから端末を取り出し、際限なく更新されるタイムラインに視線を注ぎ込む。この退屈からの即時的な救済は、一見すると人生の時間の最大効率化を達成したかのように錯覚させる。\n\nしかし、精神史を振り返れば、人間が独創的な閃きや深い内省へと至る跳躍台となったのは、他ならぬ「耐え難い退屈」と「何もしない空白の時間」であった。精神が外部からの刺激によって飽和している状態では、無意識の深層においてアイデア同士が偶発的に結びつく余白が存在しない。退屈とは無為な浪費ではなく、脳が自律的に内部対話を起動させるための不可欠な触媒だったのである。\n\n常時接続の利便性と引き換えに、私たちが失いつつあるもの――それは、自己の魂の深淵と静かに向き合う孤独の特権に他ならない。',
    contentVietnamese:
      'Sự phổ cập của điện thoại thông minh đã tiêu diệt hoàn toàn "khoảng thời gian trống rỗng buồn tay buồn chân" khỏi cuộc sống thường nhật của chúng ta. Thời gian chờ tàu, trong thang máy, hay chỉ vài chục giây chờ đèn đỏ, chúng ta đều vô thức rút thiết bị ra khỏi túi và dán mắt vào bảng tin cập nhật vô tận. Sự cứu rỗi tức thì khỏi nỗi buồn chán này thoạt nhìn tạo ảo tưởng như thể chúng ta đã đạt được sự tối đa hóa hiệu suất thời gian của đời người.\n\nThế nhưng nhìn lại lịch sử tinh thần nhân loại, bệ phóng đưa con người đến những lóe sáng độc đáo và sự phản tư sâu sắc lại chẳng phải cái gì khác ngoài "nỗi buồn chán không thể chịu nổi" và "khoảng thời gian trống rỗng không làm gì cả". Trong trạng thái tâm trí bị bão hòa bởi các kích thích từ bên ngoài, hoàn toàn không tồn tại khoảng trống để các ý tưởng tình cờ kết nối với nhau nơi tầng sâu vô thức. Nỗi buồn chán không phải là sự lãng phí vô bổ, mà là chất xúc tác thiết yếu để não bộ khởi động quá trình nội đối thoại tự chủ.\n\nThứ mà chúng ta đang đánh mất để đổi lấy sự tiện lợi của việc kết nối liên tục 24/7 - không gì khác chính là đặc quyền của sự cô độc để tĩnh lặng đối diện với chiều sâu tâm hồn của chính mình.',
    corePivotSentence: '退屈とは無為な浪費ではなく、脳が自律的に内部対話を起動させるための不可欠な触媒である。',
    pivotsAndConnectors: ['しかし、精神史を振り返れば (đối sánh lịch sử)', '～ではなく...触媒だったのである (khẳng định bản chất)', '～に他ならない (chính là, không gì khác ngoài)'],
    skimmingQuestions: [
      {
        question: 'Theo bài viết, giá trị tích cực sâu sắc của "nỗi buồn chán và khoảng lặng" là gì?',
        options: [
          'Giúp con người tăng thời gian lướt mạng xã hội mà không thấy mệt mỏi.',
          'Là chất xúc tác không thể thiếu để kích hoạt đối thoại nội tâm và sự sáng tạo độc đáo.',
          'Giúp con người hoàn thành các mục tiêu công việc với năng suất cao hơn.',
          'Tạo điều kiện để con người kết nối với nhiều người lạ trên Internet.',
        ],
        correctIndex: 1,
        explanation: 'Khớp hoàn toàn với câu: "退屈とは無為な浪費ではなく、脳が自律的に内部対話を起動させるための不可欠な触媒だったのである".',
      },
    ],
    scanningChallenge: {
      targetKeyword: '内部対話',
      targetHint: 'Tìm cụm từ Hán tự chỉ cuộc đối thoại bên trong tâm trí',
      answerContext: 'Đoạn 2: "脳が自律的に内部対話を起動させるための不可欠な触媒"',
    },
    techniqueExplanation:
      'Kỹ thuật: Nhận diện cấu trúc "Ảo tưởng ban đầu (錯覚させる) ➔ Sự thật sâu sắc sau しかし". Tác giả phê phán việc lấp đầy smartphone để tôn vinh khoảng lặng sáng tạo.',
  },
  {
    id: 'speed-05',
    level: 'N2',
    title: 'Nghệ Thuật Cắt Tỉa Trong Tư Duy & Cuộc Sống',
    theme: 'Lối sống & Triết lý tối giản',
    wordCount: 370,
    recommendedTimeSec: 62,
    contentJapanese:
      '庭師が樹木を育てる際、最も神経を注ぐのは枝を増やすことではなく、余分な枝を大胆に切り落とす「剪定（せんてい）」の作業である。光を遮り養分を奪い合う不要な枝を払って初めて、幹に十分な陽光が届き、見事な花や果実が実を結ぶ。この自然界の摂理は、情報過多に喘ぐ現代人の生き方にもそのまま当てはまる。\n\n私たちは日々、「何かを足すこと」ばかりに躍起になっている。新しいスキルの習得、人脈の拡大、持ち物の増大――加算の論理に囚われた生活は、やがて心身のキャパシティを超え、本質的な集中力を奪い去る。今求められているのは、人生における「剪定の勇気」である。真に大切なごく少数の事柄にエネルギーを注ぎ込むために、重要でない雑多な事象を意識的に手放すこと。引き算の思考こそが、濁った日常を澄み切ったものへと変容させる決定打となるのである。',
    contentVietnamese:
      'Khi người làm vườn chăm sóc cây cối, việc họ dồn nhiều tâm sức nhất không phải là làm cho cành cây mọc nhiều thêm, mà là thao tác "cắt tỉa (sentei)" - mạnh dạn chặt bỏ những cành thừa. Chỉ sau khi dọn sạch những cành cản trở ánh sáng và tranh giành chất dinh dưỡng, ánh nắng ấm áp mới chạm được tới thân cây và hoa trái rực rỡ mới kết tinh. Quy luật của giới tự nhiên này hoàn toàn ứng nghiệm vào cách sống của con người hiện đại đang thở dốc vì ngộ độc thông tin.\n\nChúng ta mỗi ngày đều chỉ cuống cuồng vào việc "cộng thêm thứ gì đó". Tiếp thu kỹ năng mới, mở rộng mối quan hệ, tăng thêm của cải sở hữu - lối sống bị giam cầm trong logic của phép cộng rốt cuộc sẽ vượt quá sức chứa tâm trí và cướp đi sự tập trung mang tính bản chất. Thứ đang được đòi hỏi hiện nay chính là "lòng dũng cảm cắt tỉa" trong cuộc đời. Để dồn năng lượng vào một số lượng rất ít ỏi những việc thực sự quan trọng, ta cần phải chủ động buông bỏ những chuyện tạp nham không quan trọng. Tư duy của phép trừ mới chính là đòn quyết định biến đổi cuộc sống thường nhật vẩn đục trở nên trong trẻo.',
    corePivotSentence: '真に大切なごく少数の事柄にエネルギーを注ぎ込むために、引き算の思考こそが決定打となる。',
    pivotsAndConnectors: ['～ではなく...剪定の作業である (phương pháp cốt lõi)', '今求められているのは (Thứ đang được đòi hỏi lúc này)', '引き算の思考こそが (Chính tư duy phép trừ)'],
    skimmingQuestions: [
      {
        question: 'Tác giả mượn hình ảnh "cắt tỉa cành cây" để nhắn nhủ điều gì trong lối sống?',
        options: [
          'Mỗi người nên học nghề làm vườn để gần gũi hơn với thiên nhiên.',
          'Phải liên tục bổ sung và tích lũy thật nhiều kỹ năng, của cải.',
          'Cần có dũng khí buông bỏ điều tạp nham (phép trừ) để tập trung vào điều cốt lõi.',
          'Không nên giao tiếp với bất kỳ ai để giữ cho tâm hồn thanh tịnh.',
        ],
        correctIndex: 2,
        explanation: 'Khớp với đoạn kết: "真に大切なごく少数の事柄にエネルギーを注ぎ込むために... 引き算の思考こそが".',
      },
    ],
    scanningChallenge: {
      targetKeyword: '引き算の思考',
      targetHint: 'Tìm cụm từ đối lập với logic phép cộng (加算の論理)',
      answerContext: 'Câu kết: "引き算の思考こそが、濁った日常を澄み切ったものへと変容させる決定打となる"',
    },
    techniqueExplanation:
      'Quy tắc đối xứng: "Phép cộng (加算の論理 - cướp đi tập trung)" đối nghịch với "Phép trừ (引き算の思考 - thanh lọc tâm trí)". Nắm bắt cặp đối lập giúp giải đề chỉ trong 30 giây.',
  },
];

// =====================================================================
// SUBMODULE 88: ĐỌC HIỂU CÔNG VĂN HÀNH CHÍNH & VĂN BẢN THỰC TẾ
// =====================================================================

export const initialOfficialDocsList: OfficialDocumentItem[] = [
  {
    id: 'doc-01',
    level: 'N2',
    title: 'Thông Báo Bảo Dưỡng Hệ Thống Điện & Cắt Điện Định Kỳ Chung Cư',
    documentType: 'apartment_rule',
    documentTypeName: 'Thông báo Ban Quản lý Chung cư',
    organization: 'パークサイド芝浦 管理組合・ライフコミュニティ管理事務所',
    documentHtmlSnippet: {
      heading: '電気設備定期点検に伴う全館停電のお知らせ',
      issuedDate: '令和6年11月10日',
      targetAudience: 'ご入居者各位',
      mainBody:
        '日頃よりマンション管理業務にご理解とご協力を賜り、厚く御礼申し上げます。さて、電気事業法第42条に基づく法定点検のため、下記日時にて全館停電を伴う電気設備の精密検査を実施いたします。停電時間中はエレベーター、オートロック、給水ポンプ等の共用設備および各住戸内の電気設備が一切ご使用いただけなくなります。',
      bulletPoints: [
        '【点検日時】：令和6年11月26日（火） 10:00 ～ 14:00 （※雨天決行）',
        '【対象範囲】：本マンション全棟（共用部分および全住戸専有部分）',
        '【断水について】：給水ポンプ停止に伴い、同時間帯はトイレを含め給水設備も使用不可となります。',
        '【エレベーター】：9:50～14:10の間は完全停止いたします。階段をご利用ください。',
      ],
      exemptionsAndNotes: [
        '※パソコン等の精密電子機器は、停電前に必ず主電源を切り、コンセントを抜いてください。',
        '※自動ドアは開放状態で固定されますが、防犯のため施錠は各自確実に実施願います。',
        '※生命維持装置等の医療機器をご使用中の方は、至急管理事務所まで事前にお申し出ください。',
      ],
      inquiryContact: 'ライフコミュニティ芝浦管理センター（担当：佐藤） TEL: 03-XXXX-8821',
    },
    glossary: [
      { term: '法定点検', reading: 'ほうていてんけん', meaning: 'Kiểm tra định kỳ bắt buộc theo luật định' },
      { term: '全館停電', reading: 'ぜんかんていでん', meaning: 'Cắt điện toàn bộ tòa nhà' },
      { term: '給水ポンプ', reading: 'きゅうすいポンプ', meaning: 'Máy bơm cấp nước sinh hoạt' },
      { term: '雨天決行', reading: 'うてんけっこう', meaning: 'Vẫn tiến hành kể cả trời mưa' },
      { term: '専有部分', reading: 'せんゆうぶぶん', meaning: 'Phần diện tích thuộc sở hữu riêng của từng căn hộ' },
    ],
    practicalQuestions: [
      {
        question: 'Vào lúc 11:30 sáng ngày 26 tháng 11, cư dân có thể sử dụng nước để nấu ăn hoặc đi vệ sinh không?',
        options: [
          'Có thể, vì việc cắt điện không ảnh hưởng đến hệ thống cấp nước thành phố.',
          'Không thể, vì máy bơm ngưng hoạt động kéo theo việc mất nước toàn bộ.',
          'Có thể nếu dùng nước tích trữ trong bể riêng của căn hộ.',
          'Chỉ những căn hộ từ tầng 1 đến tầng 3 mới sử dụng được.',
        ],
        correctIndex: 1,
        clueLocation: 'Mục 【断水について】: "給水ポンプ停止に伴い、同時間帯はトイレを含め給水設備も使用不可"',
        explanation: 'Thông báo nêu rõ máy bơm nước chạy bằng điện, khi cắt điện thì hệ thống nước (kể cả bồn cầu) cũng ngưng hoạt động hoàn toàn.',
      },
      {
        question: 'Cư dân cần làm gì đối với các thiết bị vi tính, điện tử trước khi bắt đầu cúp điện?',
        options: [
          'Cứ để chế độ Sleep (ngủ) để sau khi có điện máy tự bật lại.',
          'Báo cáo cho ban quản lý tòa nhà kiểm tra hộ.',
          'Tắt hẳn nguồn điện chính và rút phích cắm ra khỏi ổ cắm tường.',
          'Đem toàn bộ thiết bị gửi tạm ở phòng quản lý.',
        ],
        correctIndex: 2,
        clueLocation: 'Mục dấu hoa thị: "パソコン等の精密電子機器は、停電前に必ず主電源を切り、コンセントを抜いてください"',
        explanation: 'Khi đóng điện trở lại có thể gây xung điện (surge) làm cháy linh kiện, nên quy định bắt buộc là tắt nguồn và rút phích cắm.',
      },
    ],
    realLifeGuidance:
      'Tại Nhật Bản, các đợt cúp điện kiểm tra chung cư thường làm mất luôn nước sinh hoạt vì các bể ngầm dùng bơm điện đẩy lên nóc. Do đó, kinh nghiệm sống là trước giờ cắt điện phải xả nước đầy bồn tắm để dội toilet và chuẩn bị sẵn bình nước uống.',
    culturalAdministrativeContext:
      'Luật điện lực Nhật Bản (電気事業法) quy định kiểm tra định kỳ cực kỳ nghiêm ngặt nhằm phòng chống chập cháy hỏa hoạn. Các thông báo kiểu này luôn dùng mẫu câu chuẩn kính ngữ trang trọng (深く御礼申し上げます, お申し出ください).',
  },
  {
    id: 'doc-02',
    level: 'N1',
    title: 'Hướng Dẫn Nộp Đơn Miễn Giảm Thuế Thị Dân & Bảo Hiểm Y Tế Quốc Dân',
    documentType: 'tax_insurance',
    documentTypeName: 'Công văn Hướng dẫn Chi cục Thuế & Tòa thị chính',
    organization: '新宿区役所 保険年金課 資格賦課係・課税課',
    documentHtmlSnippet: {
      heading: '国民健康保険料および住民税の減免申請手続きのご案内',
      issuedDate: '令和6年6月1日',
      targetAudience: '前年中の所得が基準額以下の方、または特別な事情により納付が困難な世帯',
      mainBody:
        '倒産・解雇・雇い止め等の非自発的失業、または長期療養等による大幅な収入減少により、国民健康保険料および住民税の納付が著しく困難と認められる世帯を対象に、申請に基づく減免制度を実施しております。減免の適用には一定の審査基準があり、納期限後の申請は原則として遡及適用されませんので、必ず納期限前にご相談ください。',
      bulletPoints: [
        '【対象要件①：非自発的失業】：雇用保険受給資格者証の離職理由コードが「11, 12, 21, 22, 23, 31, 32, 33, 34」のいずれかに該当する方。',
        '【対象要件②：所得減少】：本年の見込み総所得金額が前年比で50%以上減少すると見込まれ、かつ控除対象外所得が一定基準以下であること。',
        '【申請必要書類】：①減免申請書、②本人確認書類（在留カード等）、③雇用保険受給資格者証または退職証明書、④収入減少を証明する直近3ヶ月分の給与明細書。',
        '【申請窓口】：区役所本庁舎2階 保険年金課（郵送申請可、納期限当日消印有効）。',
      ],
      exemptionsAndNotes: [
        '※自己都合退職（離職理由コード40番台）による失業は、特別な療養事由を除き「非自発的失業」の減免対象外となります。',
        '※未納の保険料がある場合、分割納付相談を同時に実施いたしますので、納付書を破棄せず窓口までご持参ください。',
        '※虚偽の申告により不当に減免を受けた場合は、減免の取り消しおよび追徴金が課されることがあります。',
      ],
      inquiryContact: '新宿区役所 代表 03-3209-1111（内線：2451 保険賦課担当）',
    },
    glossary: [
      { term: '減免', reading: 'げんめん', meaning: 'Miễn giảm (thuế hoặc phí bảo hiểm)' },
      { term: '非自発的失業', reading: 'ひじはつてきしつぎょう', meaning: 'Thất nghiệp không tự nguyện (sa thải, công ty phá sản, hết hạn hợp đồng)' },
      { term: '雇い止め', reading: 'やといどめ', meaning: 'Không gia hạn hợp đồng lao động' },
      { term: '遡及適用', reading: 'そきゅうてきよう', meaning: 'Áp dụng hồi tố (áp dụng lùi lại thời gian trước đó)' },
      { term: '消印有効', reading: 'けしいんゆうこう', meaning: 'Có hiệu lực căn cứ theo dấu bưu điện ngày gửi' },
    ],
    practicalQuestions: [
      {
        question: 'Anh Nam chủ động nộp đơn xin nghỉ việc vì muốn chuyển ngành (tự nguyện thôi việc). Anh có thuộc diện được giảm theo diện "thất nghiệp không tự nguyện" không?',
        options: [
          'Được giảm tự động vì đang không có thu nhập.',
          'Không được giảm theo diện này, trừ khi có lý do chữa bệnh đặc biệt được công nhận.',
          'Được giảm 50% nếu gửi hồ sơ qua đường bưu điện.',
          'Chỉ cần xuất trình thẻ lưu trú là được giảm ngay.',
        ],
        correctIndex: 1,
        clueLocation: 'Mục Lưu ý (*注): "自己都合退職（離職理由コード40番台）による失業は、特別な療養事由を除き「非自発的失業」の減免対象外"',
        explanation: 'Từ chức vì lý do cá nhân (自己都合) sẽ có mã bảo hiểm đầu 40 và không thuộc diện miễn giảm thất nghiệp không tự nguyện.',
      },
      {
        question: 'Quy định nào sau đây là ĐÚNG về thời hạn nộp đơn xin miễn giảm?',
        options: [
          'Có thể nộp bất cứ lúc nào và sẽ được trừ lùi tiền thuế của các tháng trước.',
          'Phải đến nộp trực tiếp tại tầng 2, không chấp nhận gửi thư qua bưu điện.',
          'Phải nộp trước hạn chót đóng thuế ghi trên giấy báo nợ, quá hạn sẽ không được áp dụng hồi tố.',
          'Chỉ nhận đơn vào ngày đầu tiên của mỗi quý.',
        ],
        correctIndex: 2,
        clueLocation: 'Đoạn văn chính: "納期限後の申請は原則として遡及適用されませんので、必ず納期限前にご相談ください"',
        explanation: 'Quy tắc hành chính Nhật: Không áp dụng hồi tố sau hạn nộp (納期限後の申請は原則として遡及適用されません). Phải nộp trước khi hết hạn trên hóa đơn thuế.',
      },
    ],
    realLifeGuidance:
      'Rất nhiều bạn du học sinh và kỹ sư sau khi nghỉ việc không biết làm thủ tục "減免" (Genmen), dẫn đến bị gửi giấy đòi nợ bảo hiểm vài chục vạn Yên kèm nguy cơ trượt visa chuyển đổi. Ngay khi nghỉ việc không tự nguyện, hãy cầm "雇用保険受給資格者証" ra quận xin giảm ngay.',
    culturalAdministrativeContext:
      'Hệ thống an sinh Nhật Bản vận hành trên nguyên tắc "tự khai báo" (申請主義). Nếu bạn gặp khó khăn mà im lặng không xin, nhà nước mặc định bạn đủ khả năng chi trả. Cụm từ "消印有効" (dấu bưu điện có hiệu lực) là kiến thức thực tế sống còn.',
  },
  {
    id: 'doc-03',
    level: 'N2',
    title: 'Thu Hồi Sản Phẩm & Cảnh Báo An Toàn Thiết Bị Gia Dụng',
    documentType: 'recall_safety',
    documentTypeName: 'Thông cáo Báo chí Thu hồi Sản phẩm Khẩn cấp',
    organization: '東洋電器産業株式会社 品質保証本部',
    documentHtmlSnippet: {
      heading: '電気ファンヒーター（型番：TH-2200シリーズ）自主回収および無償交換のお詫びとお知らせ',
      issuedDate: '2024年12月5日',
      targetAudience: 'お客様各位',
      mainBody:
        '平素は弊社製品をご愛用いただき、誠にありがとうございます。この度、弊社が2022年9月から2024年1月にかけて製造いたしました電気ファンヒーター「TH-2200」および「TH-2200B」におきまして、内部ヒーターユニットの一部配線不良により、極めて稀ではございますが、長時間の連続使用時に発煙および発火に至る恐れがあることが判明いたしました。',
      bulletPoints: [
        '【対象製品】：電気ファンヒーター「TH-2200」「TH-2200B」（製造番号：22A0001～24A9999）',
        '【事故状況】：これまでに物損事故が2件報告されております（人的被害は発生しておりません）。',
        '【対応方法】：直ちに使用を中止いただき、電源プラグをコンセントから抜いて保管をお願いいたします。',
        '【回収・交換手順】：無償にて改良型製品との交換、または購入代金の全額返金を実施いたします。',
      ],
      exemptionsAndNotes: [
        '※型番および製造番号は、製品本体底面の定格銘板ラベルをご確認ください。',
        '※外箱やレシートを紛失された場合でも、対象製品本体が確認できれば無償交換の対象となります。',
        '※類似型番の「TH-3000シリーズ」は配線構造が異なるため、回収の対象ではございません。',
      ],
      inquiryContact: 'お客様リコール特別フリーダイヤル 0120-XXX-990（受付時間：土日祝日を除く 9:00～18:00）',
    },
    glossary: [
      { term: '自主回収', reading: 'じしゅかいしゅう', meaning: 'Tự nguyện thu hồi (Recall sản phẩm)' },
      { term: '無償交換', reading: 'むしょうこうかん', meaning: 'Đổi mới miễn phí không mất tiền' },
      { term: '発熱・発火', reading: 'はつねつ・はっか', meaning: 'Phát nhiệt và bốc cháy' },
      { term: '銘板ラベル', reading: 'めいばんラベル', meaning: 'Tem thông số kỹ thuật in dán trên sản phẩm' },
      { term: 'フリーダイヤル', reading: 'フリーダイヤル', meaning: 'Đường dây nóng miễn cước gọi (đầu số 0120)' },
    ],
    practicalQuestions: [
      {
        question: 'Khách hàng lỡ vứt mất hóa đơn mua hàng và vỏ hộp thì có được đổi máy mới không?',
        options: [
          'Không được đổi, bắt buộc phải có hóa đơn gốc từ siêu thị điện máy.',
          'Vẫn được đổi miễn phí, miễn là xác nhận được đúng thân máy thuộc diện thu hồi.',
          'Phải trả 50% chi phí bồi thường nếu không còn vỏ hộp.',
          'Chỉ được hoàn tiền chứ không được đổi sản phẩm mới.',
        ],
        correctIndex: 1,
        clueLocation: 'Mục (*注): "外箱やレシートを紛失された場合でも、対象製品本体が確認できれば無償交換の対象となります"',
        explanation: 'Quy định thu hồi an toàn tại Nhật không phụ thuộc vào hóa đơn hay hộp; chỉ cần đúng mã sản phẩm trên tem thân máy là được bảo hộ đổi trả.',
      },
    ],
    realLifeGuidance:
      'Khi mua đồ điện gia dụng tại Nhật (nhất là đồ sưởi ấm mùa đông), hãy chú ý các thông báo "お詫びとお知らせ" (Xin lỗi và Thông báo) dán ở siêu thị hoặc gửi thư nếu đã đăng ký thẻ thành viên. Các đầu số 0120 là số gọi hoàn toàn miễn phí cước.',
    culturalAdministrativeContext:
      'Văn hóa doanh nghiệp Nhật Bản đặt danh dự và an toàn người tiêu dùng lên hàng đầu. Các thông báo lỗi luôn dùng cấu trúc: Lời xin lỗi sâu sắc ➔ Nguyên nhân kỹ thuật khách quan ➔ Khẳng định cam kết khắc phục triệt để không tính phí.',
  },
];

export const extraOfficialDocsList: OfficialDocumentItem[] = [
  {
    id: 'doc-04',
    level: 'N1',
    title: 'Quy Chế Phân Loại Rác Tái Chế & Rác Thô Đại Cỡ Lớn (Sodai Gomi)',
    documentType: 'city_notice',
    documentTypeName: 'Quy chế Môi trường Tòa thị chính',
    organization: '世田谷区 清掃リサイクル課・粗大ごみ受付センター',
    documentHtmlSnippet: {
      heading: '粗大ごみの正しい排出方法および事前申込制に関する重要なお知らせ',
      issuedDate: '令和6年4月1日',
      targetAudience: '区民各位および区内事業者',
      mainBody:
        '粗大ごみ（一辺の長さがおおむね30cmを超える家具・寝具・家電製品等）の排出は、有料・事前申込制となっております。通常の資源・ごみ収集場所へ無断で放置することは不法投棄とみなされ、廃棄物処理法違反として処罰の対象となりますので固くお断りいたします。必ず事前に「粗大ごみ受付センター」へお申し込みの上、所定の処理券を貼付して指定場所にお出しください。',
      bulletPoints: [
        '【対象品目の目安】：一辺が30cmを超えるもの（タンス、机、布団、自転車、衣装ケース等）。',
        '【処理券の購入】：区内のコンビニエンスストアまたは取扱所にて「有料粗大ごみ処理券（A券200円・B券300円）」を購入してください。',
        '【排出時間・場所】：収集日当日の朝8:00までに、自宅前または指定の集合住宅集積所へ排出。',
        '【リサイクル家電の除外】：エアコン、テレビ、冷蔵庫・冷凍庫、洗濯機・衣類乾燥機は家電リサイクル法対象品のため区では収集できません。',
      ],
      exemptionsAndNotes: [
        '※事業活動に伴って排出された粗大ごみは、区の収集対象外です。産業廃棄物処理業者へ委託してください。',
        '※処理券には「受付番号」または「氏名」を油性ペンで明記の上、品物1点ごとに見えやすい位置に貼り付けてください。',
        '※一度購入された処理券は、原則として払い戻し（還付）できませんのでご注意ください。',
      ],
      inquiryContact: '世田谷区粗大ごみ受付センター（インターネット受付24時間可、電話：03-5715-XXXX）',
    },
    glossary: [
      { term: '粗大ごみ', reading: 'そだいごみ', meaning: 'Rác thô đại cỡ lớn (trên 30cm)' },
      { term: '不法投棄', reading: 'ふほうとうき', meaning: 'Vứt rác trái phép (hành vi vi phạm hình sự)' },
      { term: '処理券', reading: 'しょりけん', meaning: 'Tem đóng tiền xử lý rác (mua ở Konbini dán lên đồ)' },
      { term: '排出', reading: 'はいしゅつ', meaning: 'Mang rác ra vị trí tập kết' },
      { term: '家電リサイクル法', reading: 'かでんリサイクルほう', meaning: 'Luật tái chế 4 loại điện máy gia dụng' },
    ],
    practicalQuestions: [
      {
        question: 'Muốn vứt một chiếc tủ lạnh hỏng thì có dán tem Sodai Gomi của quận rồi để ra trước nhà không?',
        options: [
          'Được, chỉ cần mua tem loại B dán vào là nhân viên vệ sinh sẽ chở đi.',
          'Không được, vì tủ lạnh thuộc diện Luật tái chế 4 thiết bị điện máy, quận không thu gom dạng Sodai Gomi thông thường.',
          'Được, nếu dọn nhà vào sáng sớm trước 8 giờ.',
          'Chỉ được nếu đập nhỏ tủ lạnh thành các mảnh dưới 30cm.',
        ],
        correctIndex: 1,
        clueLocation: 'Mục 【リサイクル家電の除外】: "エアコン、テレビ、冷蔵庫・冷凍庫、洗濯機は区では収集できません"',
        explanation: '4 loại máy gia dụng lớn (Tủ lạnh, Máy giặt, Tivi, Điều hòa) tại Nhật KHÔNG THUỘC rác cồng kềnh thành phố mà phải trả phí xử lý riêng theo luật tái chế.',
      },
    ],
    realLifeGuidance:
      'Tội "Vứt rác trái phép" (不法投棄) ở Nhật có thể bị phạt tù tới 5 năm hoặc phạt tiền tới 10 triệu Yên. Khi chuyển nhà, phải đăng ký Sodai Gomi trước ít nhất 2-3 tuần, nếu không đến ngày bay về nước sẽ không kịp vứt nệm hay bàn ghế.',
    culturalAdministrativeContext:
      'Quy chế phân loại rác phản ánh tinh thần trách nhiệm tập thể cao độ của người Nhật. Đọc hiểu dạng bài này trong JLPT vừa kiểm tra từ vựng hành chính, vừa là cẩm nang sinh tồn thiết thực.',
  },
  {
    id: 'doc-05',
    level: 'N2',
    title: 'Cẩm Nang Hành Động Khi Động Đất & Bản Đồ Sơ Tán Khẩn Cấp',
    documentType: 'disaster_guide',
    documentTypeName: 'Hướng dẫn Phòng chống Thiên tai Phòng cháy',
    organization: '東京都 防災安全課・消防庁',
    documentHtmlSnippet: {
      heading: '首都直下地震に備える！地域防災マップと一時避難所のご案内',
      issuedDate: '令和6年9月1日（防災の日）',
      targetAudience: '地域住民・在勤者・在学者各位',
      mainBody:
        '大地震が発生した際、最も重要なのは「自らの命を自ら守る（自助）」と「地域で助け合う（共助）」の連携です。揺れを感じたらまずは頭部を保護し、揺れが収まるまで安全な場所で待機してください。慌てて屋外に飛び出すと、落下物等により負傷する恐れがあります。火災が発生した場合は、初期消火に努めるとともに、延焼の危険がある場合は速やかに指定の避難場所へ移動してください。',
      bulletPoints: [
        '【発災直後の3行動】：①姿勢を低くする（Drop）、②頭を守る（Cover）、③動かない（Hold on）。',
        '【避難時の注意】：ブレーカーを必ず落とし、ガスの元栓を閉める（通電火災の防止）。',
        '【避難場所の区分】：一時集合場所（近隣の公園など） ➔ 広域避難場所（大規模火災から身を守る大規模施設）。',
        '【連絡手段】：災害用伝言ダイヤル「171」または各社災害用伝言板を活用し、一般音声通話を控える。',
      ],
      exemptionsAndNotes: [
        '※自動車での避難は緊急車両の通行妨害となるため、原則として禁止されています（徒歩避難の徹底）。',
        '※避難所へのペット同伴は、原則としてケージ飼育等のルールに従っていただきます。',
      ],
      inquiryContact: '東京都防災情報ポータル（多言語対応） www.bousai.metro.tokyo.lg.jp',
    },
    glossary: [
      { term: '通電火災', reading: 'つうでんかさい', meaning: 'Hỏa hoạn do có điện trở lại sau động đất làm chập các dây dẫn bị đứt' },
      { term: '自助・共助', reading: 'じじょ・きょうじょ', meaning: 'Tự cứu mình và tương trợ cộng đồng' },
      { term: 'ブレーカーを落とす', reading: 'ブレーカーをおとす', meaning: 'Gạt cầu dao ngắt điện tổng' },
      { term: '災害用伝言ダイヤル 171', reading: 'さいがいようでんごんだいやる', meaning: 'Tổng đài hộp thư thoại khẩn cấp khi thảm họa' },
    ],
    practicalQuestions: [
      {
        question: 'Tại sao khi sơ tán rời khỏi nhà sau động đất, bắt buộc phải gạt cầu dao ngắt điện tổng (ブレーカーを落とす)?',
        options: [
          'Để tiết kiệm tiền điện cho công ty điện lực.',
          'Để phòng ngừa hỏa hoạn bùng phát khi mạng lưới điện được khôi phục trở lại (通電火災).',
          'Để các thiết bị điện tự động sạc đầy pin.',
          'Để báo hiệu cho đội cứu hộ biết nhà không còn người.',
        ],
        correctIndex: 1,
        clueLocation: 'Mục 【避難時の注意】: "ブレーカーを必ず落とし、ガスの元栓を閉める（通電火災の防止）"',
        explanation: 'Hơn 60% các vụ cháy sau động đất ở Nhật là "cháy do cấp điện trở lại" khi dây điện bị đè rách tiếp xúc với vật liệu dễ cháy.',
      },
    ],
    realLifeGuidance:
      'Nhớ con số sinh tử: 171 (Tổng đài tin nhắn thoại thảm họa). Khi đường truyền điện thoại tê liệt, chỉ cần gọi 171 để ghi âm lời nhắn "Tôi đang an toàn ở địa chỉ X" để người thân khắp thế giới nhập số điện thoại nghe được.',
    culturalAdministrativeContext:
      'Nhật Bản là quốc gia thiên tai số một thế giới. Đọc hiểu các văn bản này là yêu cầu bắt buộc trong đề thi N2/N1 để đảm bảo sinh viên quốc tế có năng lực tự cứu nạn và hòa nhập cộng đồng.',
  },
];
