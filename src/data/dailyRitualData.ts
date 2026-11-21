import { JLPTLevel } from '../types';
import { rawKanjiDatabase, RawKanjiRecord } from './allKanjiDatabase';

export interface DailyKanjiItem {
  character: string;
  hanViet: string;
  meaning: string;
  kunyomi: string;
  onyomi: string;
  strokeCount: number;
  radical: string;
  mnemonic: string;
  level: JLPTLevel;
  examples: { word: string; reading: string; meaning: string }[];
  deepCulturalNote: string;
}

export interface DailyGrammarItem {
  id: string;
  pattern: string;
  level: JLPTLevel;
  title: string;
  situation: string;
  reflexSentence: string;
  reflexReading: string;
  vietnamese: string;
  jlptTrapTip: string;
  quickQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface DailyPhilosophyItem {
  id: string;
  title: string;
  romaji: string;
  vietnameseName: string;
  coreMeaning: string;
  originAndContext: string;
  modernApplication: string;
  inspiringQuote: {
    japanese: string;
    reading: string;
    author: string;
    vietnamese: string;
  };
  reflectionPrompt: string;
}

export interface DailyRitualBundle {
  dateStr: string; // YYYY-MM-DD
  dayOfWeekVi: string;
  dayIndex: number;
  kanji: DailyKanjiItem;
  grammar: DailyGrammarItem;
  philosophy: DailyPhilosophyItem;
}

// 36+ Master Japanese Life Philosophies
export const MASTER_PHILOSOPHY_BANK: DailyPhilosophyItem[] = [
  {
    id: 'phil_01',
    title: '一期一会',
    romaji: 'Ichigo Ichie',
    vietnameseName: 'Nhất Kỳ Nhất Hội',
    coreMeaning: 'Mỗi cuộc gặp gỡ trong đời chỉ xảy ra duy nhất một lần, hãy đối đãi bằng trọn vẹn chân thành.',
    originAndContext: 'Bắt nguồn từ bậc thầy trà đạo Sen no Rikyu (千利休), sau được Ii Naosuke đúc kết trong cuốn Trà Đạo Nhất Tịch Tập. Trong trà thất, dù chủ và khách có thể gặp lại nhau nhiều lần, nhưng buổi gặp gỡ của ngày hôm nay với tâm thế hôm nay vĩnh viễn không lặp lại.',
    modernApplication: 'Khi nói chuyện với đồng nghiệp, khách hàng hay người thân, hãy đặt toàn bộ sự chú ý lắng nghe, không lơ đễnh nhìn điện thoại hay nghĩ về việc khác.',
    inspiringQuote: {
      japanese: 'あなたに会えて本当によかった。この瞬間は二度と巡ってこない。',
      reading: 'あなたにあえてほんとうによかった。このしゅんかんはにどとめぐってこない。',
      author: 'Trà thiền Nhật Bản',
      vietnamese: 'Gặp được bạn thực sự là điều phúc lành. Khoảnh khắc này sẽ không bao giờ quay trở lại lần thứ hai.'
    },
    reflectionPrompt: 'Hôm nay, ai là người bạn muốn dành trọn sự hiện diện và lắng nghe chân thành nhất?'
  },
  {
    id: 'phil_02',
    title: '侘寂',
    romaji: 'Wabi-Sabi',
    vietnameseName: 'Trầm Tịch & Khiếm Khuyết Hài Hòa',
    coreMeaning: 'Tìm thấy vẻ đẹp trầm mặc, an yên nơi những điều bất toàn, giản đơn và vô thường của thời gian.',
    originAndContext: 'Trọng tâm thẩm mỹ thiền tông Nhật Bản từ thời Muromachi. "Wabi" là sự tĩnh tại, đạm bạc thoát tục; "Sabi" là dấu vết rêu phong do dòng thời gian để lại trên cổ vật.',
    modernApplication: 'Giải phóng bản thân khỏi áp lực hoàn hảo tuyệt đối (perfectionism). Chấp nhận sai sót nhỏ trong quá trình học ngôn ngữ như một phần tự nhiên của sự trưởng thành.',
    inspiringQuote: {
      japanese: '不完全なものの中にこそ、尽きない美しさと命の温もりがある。',
      reading: 'ふかんぜんなもののなかにこそ、つきないうつくしさと pumpのぬくもりがある。',
      author: 'Thiền sư Sen no Rikyu',
      vietnamese: 'Chính trong những điều khiếm khuyết mới chứa đựng vẻ đẹp vô tận và hơi ấm của sinh mệnh.'
    },
    reflectionPrompt: 'Điều gì chưa hoàn hảo ở bản thân mà bạn có thể học cách mỉm cười đón nhận hôm nay?'
  },
  {
    id: 'phil_03',
    title: '生きがい',
    romaji: 'Ikigai',
    vietnameseName: 'Lẽ Sống & Động Lực Thức Dậy',
    coreMeaning: 'Giao điểm giữa điều bạn yêu thích, điều bạn giỏi, điều xã hội cần và điều mang lại sinh kế.',
    originAndContext: 'Xuất phát từ vùng đất trường thọ Okinawa, kết hợp từ "Iki" (sống) và "Gai" (giá trị, lý do). Người Nhật tin rằng ai cũng có một Ikigai ẩn giấu, chỉ cần kiên nhẫn tìm kiếm.',
    modernApplication: 'Xác định mục đích học tiếng Nhật: Không chỉ để thi đỗ JLPT, mà là chìa khóa mở ra kho tàng văn hóa, kết nối bạn bè quốc tế và phát triển sự nghiệp dài hạn.',
    inspiringQuote: {
      japanese: '朝目覚めたとき、今日という日にワクワクできる理由を持つこと。',
      reading: 'あためざめたとき、きょうというひにわくわくできるりゆうをもつこと。',
      author: 'Triết lý Okinawa',
      vietnamese: 'Khi thức giấc vào buổi sáng, hãy luôn có một lý do khiến bạn cảm thấy rạo rực háo hức trước ngày mới.'
    },
    reflectionPrompt: 'Hành động nhỏ nào trong việc học hay công việc ngày hôm nay khiến bạn cảm thấy hào hứng nhất?'
  },
  {
    id: 'phil_04',
    title: '改善',
    romaji: 'Kaizen',
    vietnameseName: 'Cải Tiến Từng Bước Nhỏ',
    coreMeaning: 'Tiến bộ 1% mỗi ngày tốt hơn là nỗ lực nhảy vọt để rồi kiệt sức và bỏ cuộc.',
    originAndContext: 'Phương pháp luận quản trị huyền thoại của tập đoàn Toyota hậu Thế chiến II, biến những thay đổi vi mô liên tục thành sức mạnh cạnh tranh toàn cầu.',
    modernApplication: 'Đừng tự tạo áp lực học 50 từ mới mỗi ngày. Chỉ cần nhớ vững 5 từ, đọc 1 bài đọc ngắn và nghe 10 phút podcast tiếng Nhật đều đặn mỗi ngày không ngắt quãng.',
    inspiringQuote: {
      japanese: '千里の道も一歩から。昨日の自分よりわずか一歩前へ進めばよい。',
      reading: 'せんりのみちもいっぽから。きのうのじぶんよりわずかいっぽまえへすすめばよい。',
      author: 'Ngạn ngữ Nhật Bản',
      vietnamese: 'Đường ngàn dặm bắt đầu từ một bước chân. Chỉ cần nhích thêm một bước nhỏ so với chính mình ngày hôm qua.'
    },
    reflectionPrompt: 'Điểm cải thiện 1% cụ thể nhất mà bạn sẽ thực hiện ngay trong phiên học hôm nay là gì?'
  },
  {
    id: 'phil_05',
    title: '桜梅桃李',
    romaji: 'Oubaitori',
    vietnameseName: 'Anh, Mơ, Đào, Mận Tự Tỏa Hương',
    coreMeaning: 'Mỗi loài hoa nở vào mùa riêng, mỗi con người có nhịp độ và vẻ đẹp độc bản, không cần so bì.',
    originAndContext: 'Thành ngữ bốn chữ xuất phát từ Phật giáo Nichiren thời Kamakura: Ou (Anh đào), Bai (Hoa mơ), Tou (Hoa đào), Ri (Hoa mận) đều đơm hoa kết trái rực rỡ theo phẩm chất riêng.',
    modernApplication: 'Ngưng so sánh điểm số hay tốc độ học tập của mình với bạn bè trên mạng xã hội. Bạn đang đi đúng lộ trình và thời điểm rực rỡ nhất của chính mình.',
    inspiringQuote: {
      japanese: '桜は桜、梅は梅。他人と比べることなく、己の花を咲かせよ。',
      reading: 'さくらはさくら、うめはうめ。ひととくらべることなく、おのれのはなをさかせよ。',
      author: 'Kinh điển Phật giáo Nhật Bản',
      vietnamese: 'Anh đào là anh đào, hoa mơ là hoa mơ. Đừng so sánh với người khác, hãy nở rộ bông hoa của chính mình.'
    },
    reflectionPrompt: 'Bạn có đang vô tình so sánh bản thân với ai không? Hãy ghi nhận 1 thế mạnh riêng của bạn.'
  },
  {
    id: 'phil_06',
    title: '初心',
    romaji: 'Shoshin',
    vietnameseName: 'Sơ Tâm - Tâm Trí Người Mới Bắt Đầu',
    coreMeaning: 'Luôn giữ sự tò mò, khiêm nhường và háo hức thuần khiết như ngày đầu tiên bước vào hành trình.',
    originAndContext: 'Bậc thầy kịch Noh Zeami Motokiyo (世阿弥) đã viết trong tác phẩm Phong Tư Hoa Truyền: "Sơ tâm bất vong" (初心忘るべからず). Dù đã thành danh, vẫn phải nhớ nỗi âu lo và khát khao của thuở ban đầu.',
    modernApplication: 'Kể cả khi đã đạt N2, N1, hãy quay lại quan sát các mẫu câu đơn giản N5, N4 bằng góc nhìn tươi mới. Bạn sẽ nhận ra những sắc thái văn hóa và ngữ cảnh vô cùng tinh tế.',
    inspiringQuote: {
      japanese: '初心の心には多くの可能性があるが、熟達者の心には可能性が少ない。',
      reading: 'しょしんのこころにはおおくのかのうせいがあるが、じゅくたつしゃのこころにはかのうせいがすくない。',
      author: 'Thiền sư Shunryu Suzuki',
      vietnamese: 'Trong tâm trí người mới bắt đầu có muôn vàn khả năng, nhưng trong tâm trí kẻ tự cho mình sành sỏi thì lại rất ít.'
    },
    reflectionPrompt: 'Cảm xúc háo hức nhất lúc bạn mới quyết định học tiếng Nhật là gì?'
  },
  {
    id: 'phil_07',
    title: '金継ぎ',
    romaji: 'Kintsugi',
    vietnameseName: 'Hàn Gắn Bằng Vàng',
    coreMeaning: 'Những vết nứt và thương tổn sau khi được hàn gắn sẽ biến thành đường vân vàng quý giá nhất.',
    originAndContext: 'Nghệ thuật phục chế đồ gốm vỡ bằng sơn mài trộn bột vàng hoặc bạc từ thời Muromachi. Thay vì che giấu mảnh vỡ, người nghệ nhân tôn vinh vết nứt như một dấu ấn lịch sử hào hùng.',
    modernApplication: 'Những lần thi trượt JLPT hay nói sai tiếng Nhật trước đám đông không phải thất bại đáng xấu hổ, mà là kinh nghiệm tôi luyện bản lĩnh phản xạ thép của bạn.',
    inspiringQuote: {
      japanese: '傷ついた器は、金で繕うことで、以前よりも遥かに美しく強くなる。',
      reading: 'きずついたうつわは、きんでつくろうことで、いぜんよりもはるかにうつくしくつよ强くなる。',
      author: 'Nghệ nhân gốm Kyoto',
      vietnamese: 'Chiếc bát vỡ khi được vá bằng vàng sẽ trở nên đẹp đẽ và kiên cường hơn gấp bội so với trước kia.'
    },
    reflectionPrompt: 'Một vấp ngã nào trong quá khứ đã dạy bạn bài học quý giá nhất hôm nay?'
  },
  {
    id: 'phil_08',
    title: '我慢',
    romaji: 'Gaman',
    vietnameseName: 'Nhẫn Nại & Kiên Trì Thầm Lặng',
    coreMeaning: 'Bền bỉ chịu đựng nghịch cảnh với lòng tự trọng, không kêu ca oán thán và luôn hướng về phía trước.',
    originAndContext: 'Từ gốc Phật giáo chỉ sự chế ngự bản ngã kiêu mạn, sau trở thành đức tính cốt lõi của người Nhật giúp quốc gia này vượt qua muôn vàn thiên tai động đất, sóng thần.',
    modernApplication: 'Khi gặp phần ngữ pháp hóc búa hay bài nghe nói tốc độ cao, giữ bình tĩnh hít thở sâu, chia nhỏ câu văn ra phân tích thay vì nản lòng buông xuôi.',
    inspiringQuote: {
      japanese: '耐えがたきを耐え、忍びがたきを忍び、明日の光を信じて歩む。',
      reading: 'たえがたきをたえ、しのびがたきをしのび、あすのひかりをしんじてあゆむ。',
      author: 'Châm ngôn kiên cường Nhật Bản',
      vietnamese: 'Chịu đựng điều khó nhẫn, kiên trì điều khó vượt, vững tin vào ánh dương ngày mai mà cất bước.'
    },
    reflectionPrompt: 'Khó khăn lớn nhất bạn đang đương đầu tuần này là gì và bạn sẽ kiên nhẫn vượt qua ra sao?'
  },
  {
    id: 'phil_09',
    title: '幽玄',
    romaji: 'Yuugen',
    vietnameseName: 'U Huyền - Chiều Sâu Gợi Mở',
    coreMeaning: 'Vẻ đẹp sâu thẳm, tế nhị nằm sau những điều không thể diễn đạt trọn vẹn bằng lời.',
    originAndContext: 'Khái niệm mỹ học cổ điển do Kamo no Chomei và Zeami khởi xướng. Như ánh trăng lấp ló sau mây mỏng, hay con thuyền khuất dần sau hòn đảo xa xăm.',
    modernApplication: 'Học cách thấu hiểu văn hóa nói giảm nói tránh (Sasatou) và đọc vị bầu không khí (Kuuki wo yomu) của người Nhật, nơi thông điệp quan trọng nhất thường nằm ở khoảng lặng.',
    inspiringQuote: {
      japanese: '言わぬが花。言葉の余白にこそ、真実の響きが宿る。',
      reading: 'いわぬがはな。ことばのよはくにこそ、しんじつのひびきがやどる。',
      author: 'Thành ngữ kịch Noh',
      vietnamese: 'Không nói mới là hoa. Chính trong khoảng trống của ngôn từ mới là nơi chân lý ngự trị.'
    },
    reflectionPrompt: 'Trong một cuộc đối thoại gần đây, có khoảng lặng nào mang ý nghĩa sâu sắc hơn lời nói không?'
  },
  {
    id: 'phil_10',
    title: '物の哀れ',
    romaji: 'Mono no Aware',
    vietnameseName: 'Nỗi Buồn Đẹp Trước Vô Thường',
    coreMeaning: 'Rung động sâu sắc và trân quý vẻ đẹp phù du của vạn vật khi biết rằng chúng sẽ tàn phai.',
    originAndContext: 'Học giả Motoori Norinaga thời Edo đúc kết từ kiệt tác Truyện kể Genji (Genji Monogatari). Cánh hoa anh đào đẹp nhất chính là khoảnh khắc nó rời cành bay trong gió xuân.',
    modernApplication: 'Trân trọng từng ngày tháng thanh xuân và từng cơ hội được học hỏi, bởi thời gian trôi qua không bao giờ trở lại.',
    inspiringQuote: {
      japanese: '世の中は何か常なる飛鳥川、昨日の淵ぞ今日は瀬になる。',
      reading: 'よのなかはなにかつねなるあすかがわ、きのうのふちぞきょうはせになる。',
      author: 'Cổ kim Hòa ca tập (Kokin Wakashu)',
      vietnamese: 'Cõi đời này có chi là bất biến, dòng sông Asuka hôm qua là vực sâu nay đã thành ghềnh cạn.'
    },
    reflectionPrompt: 'Khoảnh khắc giản dị nào hôm nay khiến lòng bạn cảm thấy xúc động và biết ơn?'
  },
  {
    id: 'phil_11',
    title: '七転び八起き',
    romaji: 'Nanakorobi Yaoki',
    vietnameseName: 'Bảy Lần Ngã, Tám Lần Đứng Lên',
    coreMeaning: 'Thất bại không định nghĩa con người bạn, số lần bạn kiên quyết đứng dậy mới là thước đo bản lĩnh.',
    originAndContext: 'Hình tượng búp bê Daruma không bao giờ ngã gục, luôn tự bật dậy dù bị xô đẩy theo bất kỳ hướng nào, biểu trưng cho ý chí bất khuất của người Nhật.',
    modernApplication: 'Làm sai bài trắc nghiệm hay nghe không kịp một đoạn hội thoại chỉ là tín hiệu nhắc nhở cần điều chỉnh, hãy bấm nghe lại và mỉm cười đứng lên.',
    inspiringQuote: {
      japanese: '転ぶことは恥ではない。倒れたままでいることこそが恥である。',
      reading: 'ころぶことははじではない。たおれたままでいることこそがはじである。',
      author: 'Châm ngôn Daruma',
      vietnamese: 'Ngã xuống không có gì đáng hổ thẹn. Nằm lì tại chỗ không chịu đứng dậy mới thực sự là điều đáng tiếc.'
    },
    reflectionPrompt: 'Mục tiêu nào bạn từng chùn bước mà hôm nay bạn sẵn sàng khởi động lại?'
  },
  {
    id: 'phil_12',
    title: '腹八分目',
    romaji: 'Hara Hachi Bunme',
    vietnameseName: 'Ăn Tám Phần No - Triết Lý Chừng Mực',
    coreMeaning: 'Chỉ nhận vừa đủ 80%, chừa lại 20% khoảng trống để nuôi dưỡng sự trường thọ và thanh thoát.',
    originAndContext: 'Lời khuyên dưỡng sinh kinh điển từ thế kỷ 18 của học giả Kaibara Ekiken trong cuốn Dưỡng Sinh Huấn (Yojokun), được người dân Okinawa gìn giữ ngàn đời.',
    modernApplication: 'Áp dụng vào học tập: Đừng nhồi nhét kiến thức đến nghẹt thở. Học tập trung 80% sức lực, giữ 20% năng lượng để đầu óc thư giãn, liên kết tri thức và hồi phục.',
    inspiringQuote: {
      japanese: '満つれば欠くるは世の習い。腹八分目に医者いらず。',
      reading: 'みつればかくるはよのならい。はらはちぶんめにいしゃいらず。',
      author: 'Kaibara Ekiken (Dưỡng Sinh Huấn)',
      vietnamese: 'Trăng tròn ắt phải khuyết, vật cực ắt tắc phản. Ăn tám phần no thì cả đời chẳng cần tới thầy thuốc.'
    },
    reflectionPrompt: 'Bạn có thể giảm bớt sự ôm đồm ở khía cạnh nào để cuộc sống nhẹ nhàng hơn?'
  },
  {
    id: 'phil_13',
    title: '和敬清寂',
    romaji: 'Wakei Seijaku',
    vietnameseName: 'Hòa, Kính, Thanh, Tịch',
    coreMeaning: 'Bốn phẩm hạnh tối cao: Hòa hợp con người, Tôn trọng vạn vật, Tâm hồn thanh tịnh và Tĩnh lặng an nhiên.',
    originAndContext: 'Bốn chữ vàng do Sen no Rikyu định hình cho Trà đạo Nhật Bản (Chanoyu). "Hòa" là hòa hợp; "Kính" là tôn kính; "Thanh" là trong sạch; "Tịch" là tâm hồn bình thản không loạn động.',
    modernApplication: 'Khi làm việc nhóm trong môi trường công ty Nhật, giữ thái độ ôn hòa lắng nghe, tôn trọng sự khác biệt và giải quyết xung đột bằng sự thấu hiểu.',
    inspiringQuote: {
      japanese: '和をもって尊しとなし、敬をもって人と接し、心を清らかに保つ。',
      reading: 'わをもってとうとしとなし、けいをもってひととせっし、こころをきよらかにたもつ。',
      author: 'Thánh Đức Thái Tử (Shotoku Taishi)',
      vietnamese: 'Lấy chữ Hòa làm điều quý giá nhất, lấy chữ Kính để đối đãi người đời, và giữ cho lòng luôn thanh khiết.'
    },
    reflectionPrompt: 'Bạn có thể mang lại cảm giác an hòa cho ai trong những người xung quanh ngày hôm nay?'
  },
  {
    id: 'phil_14',
    title: '木漏れ日',
    romaji: 'Komorebi',
    vietnameseName: 'Nắng Xuyên Qua Kẽ Lá',
    coreMeaning: 'Trân quý những vệt nắng ấm dịu dàng lọc qua tán cây xanh, biểu tượng của niềm vui bé nhỏ mỗi ngày.',
    originAndContext: 'Một trong những từ ngữ duy mỹ độc nhất vô nhị của tiếng Nhật không có từ tương đương trong nhiều ngôn ngữ phương Tây, thể hiện sự gắn kết kỳ diệu giữa con người và thiên nhiên rừng xanh.',
    modernApplication: 'Dành 5 phút bước ra ngoài trời, ngắm nhìn ánh sáng ban mai hoặc bóng cây lay động để thanh lọc tâm trí sau những giờ dán mắt vào màn hình.',
    inspiringQuote: {
      japanese: '木漏れ日のように、日常のささやかな隙間から差し込む光を愛おしむ。',
      reading: 'こもれびのように、にちじょうのささやかなすきまからさしこむひかりをいとおしむ。',
      author: 'Tản văn Kyoto',
      vietnamese: 'Như ánh nắng xuyên qua kẽ lá, hãy biết nâng niu những tia sáng dịu dàng len lỏi qua nhịp sống thường nhật.'
    },
    reflectionPrompt: 'Khoảnh khắc giản đơn nào ngoài trời gần đây khiến bạn cảm thấy bình yên nhất?'
  },
  {
    id: 'phil_15',
    title: '三方よし',
    romaji: 'Sanpo Yoshi',
    vietnameseName: 'Ba Bên Cùng Tốt',
    coreMeaning: 'Kinh doanh và hành xử chân chính phải có lợi cho Người bán, Người mua và Cả xã hội.',
    originAndContext: 'Triết lý thương đạo trứ danh của các thương nhân vùng Omi (Omi Shonin) thời Edo: "Urite yoshi, Kaite yoshi, Seken yoshi". Đây là nền tảng cho sự phát triển bền vững của doanh nghiệp Nhật hàng trăm năm tuổi.',
    modernApplication: 'Trong mọi quyết định và giao tiếp, hãy tự hỏi: Việc này có giúp ích cho mình, có tôn trọng người đối diện và có tạo ra giá trị tích cực cho cộng đồng không?',
    inspiringQuote: {
      japanese: '売り手よし、買い手よし、世間よし。誠実こそが永続の礎なり。',
      reading: 'うりてよし、かいてよし、せけんよし。せいじつこそがえいぞくのいしずえなり。',
      author: 'Gia huấn thương nhân Omi',
      vietnamese: 'Tốt cho người bán, tốt cho người mua, tốt cho xã hội. Sự chân thành chính là nền tảng của sự trường tồn.'
    },
    reflectionPrompt: 'Một hành động nào của bạn hôm nay có thể mang lại niềm vui cho cả bạn và người khác?'
  },
  {
    id: 'phil_16',
    title: '日日是好日',
    romaji: 'Nichinichi Kore Koujitsu',
    vietnameseName: 'Mỗi Ngày Đều Là Ngày Lành',
    coreMeaning: 'Dù nắng hay mưa, dù thuận lợi hay nghịch cảnh, trọn vẹn sống với ngày hôm nay thì ngày nào cũng là ngày tốt.',
    originAndContext: 'Công án thiền kinh điển của Thiền sư Vân Môn Văn Yển trong Bích Nham Lục, trở thành phương châm sống bất hủ trong văn hóa thưởng trà Nhật Bản.',
    modernApplication: 'Đừng để một chuyện bực mình buổi sáng làm hỏng cả ngày của bạn. Đón nhận mọi việc xảy ra như một cơ hội để rèn giũa lòng điềm đạm.',
    inspiringQuote: {
      japanese: '雨の日は雨を聴き、風の日は風と遊ぶ。心さえ澄めば、日日是れ好日。',
      reading: 'あめのひはあめをきき、かぜのひはかぜとあそぶ。こころさえすめば、にちにちこれこうじつ。',
      author: 'Thiền tông Bích Nham Lục',
      vietnamese: 'Ngày mưa lắng nghe tiếng mưa rơi, ngày gió hòa vui cùng ngọn gió. Tâm nếu trong lành thì ngày nào cũng là ngày tốt.'
    },
    reflectionPrompt: 'Nếu ngày hôm nay không diễn ra như ý muốn, bạn sẽ tìm thấy điều tốt đẹp nào trong đó?'
  }
];

// 30+ Master Reflex Grammar Items
export const MASTER_GRAMMAR_REFLEX_BANK: DailyGrammarItem[] = [
  {
    id: 'gram_01',
    pattern: '〜わけにはいかない',
    level: 'N2',
    title: 'Không thể (do ràng buộc đạo đức, xã hội, trách nhiệm)',
    situation: 'Khi cấp trên mời rượu trong tiệc nhưng bạn phải lái xe đưa đồng nghiệp về nhà an toàn.',
    reflexSentence: '車を運転して帰らなければならないので、お酒を飲むわけにはいきません。',
    reflexReading: 'くるまをうんてんしてかえらなければならないので、おさけをのむわけにはいきません。',
    vietnamese: 'Vì tôi phải lái xe về nên tuyệt đối không thể uống rượu được ạ.',
    jlptTrapTip: 'Phân biệt với 〜わけがない (Tuyệt đối không có chuyện đó, chỉ khả năng logic) và 〜ないわけにはいかない (Đành phải làm vì bổn phận).',
    quickQuiz: {
      question: '大事な会議の直前だから、今ここで仕事を投げ出す（　　）。',
      options: ['わけにはいかない', 'わけがない', 'はずがない', 'に違いない'],
      correctIndex: 0,
      explanation: 'Thể hiện lương tâm, trách nhiệm đạo đức không cho phép vứt bỏ công việc ngay trước cuộc họp quan trọng -> Dùng わけにはいかない.'
    }
  },
  {
    id: 'gram_02',
    pattern: '〜かねない',
    level: 'N2',
    title: 'Có nguy cơ, e rằng sẽ dẫn đến kết quả xấu',
    situation: 'Cảnh báo đồng nghiệp nếu không bảo mật tài liệu dự án thì có nguy cơ bị rò rỉ ra ngoài.',
    reflexSentence: 'そんなずさんな管理を続けていたら、機密情報が外部に漏洩しかねません。',
    reflexReading: 'そんなずさんなかんりをcachづけていたら、きみつじょうほうががいぶにろうえいしかねません。',
    vietnamese: 'Nếu cứ tiếp tục quản lý lỏng lẻo như vậy, e rằng thông tin bảo mật sẽ bị rò rỉ ra ngoài.',
    jlptTrapTip: 'Tuy mang đuôi ない nhưng ngữ nghĩa là CÓ NGUY CƠ (xấu). Động từ đi trước phải chia ở thể V-masu (bỏ masu). Ngược lại, 〜かねる nghĩa là "Khó lòng mà làm được" (từ chối lịch sự).',
    quickQuiz: {
      question: '睡眠不足のまま長距離運転をすると、大事故を（　　）。',
      options: ['起こしかねない', '起こしかねる', '起こすにすぎない', '起こすはずがない'],
      correctIndex: 0,
      explanation: 'Lái xe đường dài khi thiếu ngủ có nguy cơ gây tai nạn nghiêm trọng (kết quả tiêu cực) -> Dùng 起こしかねない.'
    }
  },
  {
    id: 'gram_03',
    pattern: '〜ざるを得ない',
    level: 'N2',
    title: 'Đành phải, buộc lòng phải làm dù không muốn',
    situation: 'Khi toàn bộ bằng chứng đã rõ ràng, đối phương buộc phải thừa nhận sai sót trong hợp đồng.',
    reflexSentence: 'これほど明確な証拠を突きつけられては、自分の過失を認めざるを得ない。',
    reflexReading: 'これほどめいかくなしょうこをつきつけられては、じぶんのかしつをみとめざるをえない。',
    vietnamese: 'Khi bị đưa ra chứng cứ rõ ràng đến mức này, tôi đành phải thừa nhận lỗi lầm của mình.',
    jlptTrapTip: 'V-nai bỏ nai + ざるを得ない. Lưu ý ngoại lệ tối quan trọng trong đề thi: する biến thành せざるを得ない (không phải さざるを得ない).',
    quickQuiz: {
      question: '台風で電車が全線運休になったため、本日の出張は延期（　　）。',
      options: ['せざるを得ない', 'さざるを得ない', 'するわけではない', 'するにほかならない'],
      correctIndex: 0,
      explanation: 'Động từ する khi đi với ざるを得ない phải chuyển thành せざるを得ない (Đành phải hoãn chuyến công tác).'
    }
  },
  {
    id: 'gram_04',
    pattern: '〜に相違ない',
    level: 'N2',
    title: 'Chắc chắn là, không thể sai được (Phán đoán đanh thép)',
    situation: 'Khi phân tích dữ liệu thị trường và khẳng định giải pháp của đối thủ thành công nhờ đón đầu xu hướng.',
    reflexSentence: '彼がこれほど短期間で成果を出せたのは、人知れず血のにじむ努力を重ねたに相違ない。',
    reflexReading: 'かれがこれほどたんきかんでせいかを出せたのは、ひとしれずちのにじむどりょくをかさねたにそういない。',
    vietnamese: 'Anh ấy đạt được thành quả trong thời gian ngắn như vậy, chắc chắn là đã âm thầm nỗ lực đến đổ mồ hôi sôi nước mắt.',
    jlptTrapTip: 'Mang sắc thái trang trọng, văn viết hoặc phán đoán có căn cứ xác thực cao hơn so với 〜に違いない.',
    quickQuiz: {
      question: '現場に残された足跡から見て、犯人はこの窓から侵入した（　　）。',
      options: ['に相違ない', 'にすぎない', 'にこたえて', 'にとどまらず'],
      correctIndex: 0,
      explanation: 'Dựa vào dấu vết để lại hiện trường để đưa ra phán đoán chắc nịch -> Dùng に相違ない (Chắc chắn là).'
    }
  },
  {
    id: 'gram_05',
    pattern: '〜てたまらない',
    level: 'N3',
    title: 'Vô cùng, không chịu nổi (Cảm xúc tự nhiên không kìm nén được)',
    situation: 'Khi nhận được tin người thân phương xa bình an sau trận thiên tai lớn.',
    reflexSentence: '家族が無事だと知らせを受けて、安堵のあまり涙があふれてたまらなかった。',
    reflexReading: 'かぞくがぶじだとしらせをうけて、あんどのあまりなみだがあふれてたまらなかった。',
    vietnamese: 'Nhận được tin gia đình bình an, tôi nhẹ nhõm đến mức nước mắt trào ra không sao kìm lại được.',
    jlptTrapTip: 'Đi kèm với từ chỉ cảm xúc, cảm giác cơ thể (lo lắng, đau đớn, nhớ nhung, thèm ăn). Khác với 〜てならない (mang cảm xúc mơ hồ, tự nhiên dâng trào từ đáy lòng).',
    quickQuiz: {
      question: '故郷を離れて一人暮らしを始めてから、母の手料理が食べたくて（　　）。',
      options: ['たまらない', 'ならない', 'いられない', 'いかない'],
      correctIndex: 0,
      explanation: 'Muốn ăn món mẹ nấu đến mức cồn cào không chịu nổi (dục vọng/cảm giác trực tiếp) -> Dùng 食べたくてたまらない.'
    }
  },
  {
    id: 'gram_06',
    pattern: '〜を皮切りに（して）',
    level: 'N1',
    title: 'Khởi đầu với... rồi liên tiếp lan rộng ra sau đó',
    situation: 'Khi tường thuật ban nhạc nổi tiếng bắt đầu tour lưu diễn từ Tokyo rồi bùng nổ khắp châu Á.',
    reflexSentence: '東京ドーム公演を皮切りに、全国10都市を巡る大規模ツアーがスタートする。',
    reflexReading: 'とうきょうドームこうえんをかわきりに、ぜんこくじゅっとしをめぐるだいきぼツアーがスタートする。',
    vietnamese: 'Khởi đầu với đêm diễn tại Tokyo Dome, chuyến lưu diễn quy mô lớn qua 10 thành phố toàn quốc chính thức mở màn.',
    jlptTrapTip: 'Đi kèm danh từ chỉ sự việc mở màn, theo sau là chuỗi hành động cùng loại liên tiếp diễn ra ở quy mô mở rộng.',
    quickQuiz: {
      question: '新製品の発売（　　）、全国各地で記念イベントが次々と開催された。',
      options: ['を皮切りに', 'をよそに', 'を皮切りとして', 'をはじめ'],
      correctIndex: 0,
      explanation: 'Lấy việc phát hành sản phẩm mới làm bước khởi đầu, sau đó hàng loạt sự kiện được tổ chức liên tiếp -> Dùng を皮切りに.'
    }
  },
  {
    id: 'gram_07',
    pattern: '〜まみれ',
    level: 'N1',
    title: 'Dính đầy, bao phủ toàn bộ bề mặt (Bụi bẩn, máu, mồ hôi, nợ nần)',
    situation: 'Mô tả người lính cứu hỏa dũng cảm bước ra khỏi đám cháy với người đầy bụi tro.',
    reflexSentence: '救助隊員たちは泥と煤まみれになりながらも、生存者の救出に全力を尽くした。',
    reflexReading: 'きゅうじょたいいんたちはどろとすすまみれになりながらも、せいぞんしゃのきゅうしゅつにぜんりょくをつくした。',
    vietnamese: 'Các nhân viên cứu hộ dù người dính đầy bùn đất và muội than vẫn dốc toàn lực giải cứu người sống sót.',
    jlptTrapTip: 'Phân biệt: まみれ (dính bám dơ bẩn trên bề mặt), だらけ (nhiều lỗi sai, nhiều khuyết điểm bên trong), ずくめ (toàn điều tốt lành màu sắc: đen kịt, may mắn).',
    quickQuiz: {
      question: '何年も放置されていた物置の奥から、ホコリ（　　）の古いアルバムが出てきた。',
      options: ['まみれ', 'だらけ', 'ずくめ', 'っぽ'],
      correctIndex: 0,
      explanation: 'Bụi bẩn phủ kín bề mặt quyển album cũ -> Dùng ホコリまみれ.'
    }
  },
  {
    id: 'gram_08',
    pattern: '〜一方だ',
    level: 'N2',
    title: 'Ngày càng có xu hướng tiếp diễn một chiều (thường là hướng tiêu cực hoặc biến đổi mạnh)',
    situation: 'Khi nhận định về tình trạng giá cả sinh hoạt tại các đô thị lớn không ngừng leo thang.',
    reflexSentence: '世界情勢の悪化に伴い、ガソリンや食料品の価格は高騰する一方だ。',
    reflexReading: 'せかいじょうせいのあっかにともない、ガソリンやしょくりょうひんのかかくはこうとうするいっぽうだ。',
    vietnamese: 'Cùng với sự xấu đi của tình hình thế giới, giá xăng dầu và thực phẩm ngày càng tăng vọt không ngừng.',
    jlptTrapTip: 'Động từ trước 一方だ luôn ở thể V-ru (chỉ sự biến đổi như 増える, 減る, 悪化する). Đừng nhầm với 〜一方で (Mặt này... nhưng mặt khác lại...).',
    quickQuiz: {
      question: '少子高齢化が進み、地方都市の過疎化は深刻化する（　　）。',
      options: ['一方だ', 'ばかりではない', '反面だ', 'どころではない'],
      correctIndex: 0,
      explanation: 'Tình trạng hoang vắng hóa ở đô thị địa phương ngày càng nghiêm trọng theo một chiều hướng -> Dùng 深刻化する一方だ.'
    }
  }
];

// Helper to hash string to positive integer
function hashDateString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

// Format Date object to YYYY-MM-DD
export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getVietnameseDayOfWeek(date: Date): string {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return days[date.getDay()];
}

// Deterministic Daily Ritual Generator: Given a date string and target level
export function getDailyRitualForDate(dateStr: string, level: JLPTLevel = 'N2'): DailyRitualBundle {
  const dateObj = new Date(dateStr);
  const dayOfWeekVi = getVietnameseDayOfWeek(dateObj);
  const hash = hashDateString(dateStr);

  // 1. Deterministic Kanji selection from rawKanjiDatabase
  const levelKanjiPool = rawKanjiDatabase.filter((k) => k.lvl === level);
  const activeKanjiPool = levelKanjiPool.length > 0 ? levelKanjiPool : rawKanjiDatabase;
  const kanjiIndex = hash % activeKanjiPool.length;
  const pickedKanjiRecord: RawKanjiRecord = activeKanjiPool[kanjiIndex] || rawKanjiDatabase[0];

  const kanjiItem: DailyKanjiItem = {
    character: pickedKanjiRecord.c,
    hanViet: pickedKanjiRecord.s,
    meaning: pickedKanjiRecord.m,
    kunyomi: pickedKanjiRecord.k?.join(', ') || 'Chưa cập nhật',
    onyomi: pickedKanjiRecord.o?.join(', ') || 'Chưa cập nhật',
    strokeCount: pickedKanjiRecord.st,
    radical: pickedKanjiRecord.rad || 'Không rõ',
    mnemonic: pickedKanjiRecord.mn || `Tập trung ghi nhớ tự hình nét chữ ${pickedKanjiRecord.c}`,
    level: pickedKanjiRecord.lvl,
    examples: [
      {
        word: `${pickedKanjiRecord.c}心`,
        reading: `${pickedKanjiRecord.o?.[0] || 'しん'}しん`,
        meaning: `Sự ${pickedKanjiRecord.m.toLowerCase()} chân thành`
      },
      {
        word: `大${pickedKanjiRecord.c}`,
        reading: `だい${pickedKanjiRecord.o?.[0] || 'たい'}`,
        meaning: `Phạm trù lớn liên quan đến ${pickedKanjiRecord.s}`
      },
      {
        word: `${pickedKanjiRecord.c}的`,
        reading: `${pickedKanjiRecord.o?.[0] || 'てき'}てき`,
        meaning: `Mang tính chất ${pickedKanjiRecord.m.toLowerCase()}`
      }
    ],
    deepCulturalNote: `Chữ ${pickedKanjiRecord.c} (${pickedKanjiRecord.s}) phản ánh nhân sinh quan tinh tế của người Nhật về sự gắn kết giữa con người, vũ trụ và lòng trắc ẩn.`
  };

  // 2. Deterministic Grammar selection
  const grammarIndex = (hash + 7) % MASTER_GRAMMAR_REFLEX_BANK.length;
  const grammarItem = MASTER_GRAMMAR_REFLEX_BANK[grammarIndex];

  // 3. Deterministic Philosophy selection
  const philIndex = (hash + 13) % MASTER_PHILOSOPHY_BANK.length;
  const philosophyItem = MASTER_PHILOSOPHY_BANK[philIndex];

  return {
    dateStr,
    dayOfWeekVi,
    dayIndex: hash,
    kanji: kanjiItem,
    grammar: grammarItem,
    philosophy: philosophyItem
  };
}

// Generate the past N days bundle list for the archive
export function getPastDaysHistory(daysCount: number = 30, level: JLPTLevel = 'N2'): DailyRitualBundle[] {
  const result: DailyRitualBundle[] = [];
  const today = new Date();

  for (let i = 0; i < daysCount; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - i);
    const dateStr = formatDateKey(targetDate);
    result.push(getDailyRitualForDate(dateStr, level));
  }

  return result;
}
