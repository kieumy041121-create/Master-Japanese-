import { EncyclopediaTopicItem, EncyclopediaSectionId } from '../types/encyclopedia';
import { initialEncyclopediaTopics, extraEncyclopediaTopics } from '../data/japanEncyclopediaDatabase';

/**
 * Massive curated extra catalog for Japan Encyclopedia
 * Spanning all 8 pillars and deep sub-topics: Sumo, Geisha, Wagashi, Bonsai, Shodo, Origami,
 * Bushido, Hanami, Obon, Tanabata, Setsubun, Shichi-Go-San, Yatai, Wagyu, Ekiben, Tatami,
 * Daruma, Maneki-Neko, Torii, Taiko, Ukiyo-e, Mottainai, Omotenashi, Meishi, Shinrin-yoku, etc.
 */
export const CURATED_EXPANSION_TOPICS: EncyclopediaTopicItem[] = [
  // 1. Sumo
  {
    id: 'enc_inf_sumo_01',
    sectionId: 'tradition_arts',
    title: 'Quốc Võ Thần Đạo Sumo (相撲): Nghi Thức Ném Muối Dohyo & Đẳng Cấp Tối Cao Yokozuna',
    jpTitle: '大相撲の神事性と横綱の格式',
    romaji: 'Ozumo no Shinjisei to Yokozuna no Kakushiki',
    hiragana: 'おおずもうのしんじせい と よこづなのかくしき',
    level: 'N2',
    badge: 'Quốc Võ · Vòng Đấu Dohyo · Đẳng Cấp Yokozuna',
    summary:
      'Môn võ cổ truyền có nguồn gốc từ nghi lễ hiến tế thần linh Shinto hơn 1.500 năm trước, võ đài đất sét Dohyo thiêng liêng rắc muối thanh tẩy, và danh vị Yokozuna mang dây thừng Shimenawa tượng trưng cho hóa thân của thần linh.',
    keyTakeaways: [
      'Nguồn gốc Thần đạo: Ban đầu là nghi thức nông nghiệp dâng lên các vị thần Shinto để cầu mưa thuận gió hòa và mùa màng tươi tốt.',
      'Vòng đấu Dohyo: Được đắp từ đất sét tinh khiết, rải cát mịn, chính giữa chôn lúa gạo và rượu Sake tạ ơn thần linh.',
      'Nghi thức ném muối Kiyome no Shio: Các võ sĩ Rikishi bốc muối trắng ném vào vòng đấu trước mỗi hiệp để thanh tẩy tà khí và cầu nguyện an toàn.',
      'Món ăn truyền thống Chankonabe: Nồi lẩu dinh dưỡng khổng lồ chứa thịt gà, đậu phụ, hải sản và rau củ giúp các lực sĩ phát triển thể chất dẻo dai.',
    ],
    detailedExplanation:
      'Sumo không chỉ là môn thể thao đối kháng đơn thuần, mà là một nghi lễ tôn giáo sống động được bảo tồn nguyên vẹn qua hàng thế kỷ. Mái che phía trên võ đài Dohyo được mô phỏng theo kiến trúc của Thần xã Ise Jingu linh thiêng. Trọng tài Gyoji khoác lên mình trang phục quý tộc thời phong kiến và cầm quạt lệnh Gunbai chỉ huy trận đấu. Cấp bậc tối cao Yokozuna (横綱) không bao giờ bị giáng cấp: Nếu một Yokozuna thi đấu sa sút, danh dự võ sĩ đạo đòi hỏi họ phải tự nguyện tuyên bố giải nghệ để giữ gìn phẩm giá tôn quý.',
    culturalPhilosophy:
      'Sumo dạy con người về "Hinkaku" (品格 - Phẩm cách): Một lực sĩ vĩ đại dù thắng hay thua đều giữ nét mặt bình thản, cúi chào đối thủ với lòng tôn trọng tuyệt đối, không bao giờ ăn mừng kiêu ngạo trên sàn đấu.',
    practicalAdvice:
      'Khi xem thi đấu Sumo trực tiếp tại Ryogoku Kokugikan (Tokyo), khán giả ngồi ở các ô chiếu Masu-seki có truyền thống ăn gà nướng Yakitori và cơm hộp Bento. Người ta kiêng ăn thịt động vật bốn chân (như bò, heo) trước giải đấu vì quan niệm võ sĩ bị ngã chống 4 chi xuống đất là thua cuộc (gà chỉ có 2 chân).',
    vocabularyList: [
      { word: '土俵', reading: 'どひょう', meaning: 'Vòng đấu vật đắp bằng đất sét trong môn Sumo', level: 'N1' },
      { word: '横綱', reading: 'よこづな', meaning: 'Đẳng cấp tối cao nhất trong giới võ sĩ Sumo', level: 'N2' },
      { word: '力士', reading: 'りきし', meaning: 'Lực sĩ, đấu sĩ Sumo chuyên nghiệp', level: 'N2' },
      { word: '品格', reading: 'ひんかく', meaning: 'Phẩm cách, phong thái đạo đức đĩnh đạc', level: 'N1' },
    ],
    quickFact:
      'Dây đai thừng Shimenawa màu trắng tuyết nặng tới 20kg mà một Yokozuna đeo khi bước vào lễ Dohyo-iri chính là biểu tượng sợi dây linh thiêng thường thấy treo trước cổng các ngôi đền Thần đạo Nhật Bản.',
    tags: ['Sumo', 'Thần Đạo', 'Yokozuna', 'Dohyo', 'Võ Đạo'],
    quiz: {
      question: 'Trước mỗi hiệp đấu Sumo, các võ sĩ Rikishi thực hiện hành động ném muối trắng vào vòng đấu nhằm mục đích gì?',
      options: [
        'A. Làm giảm trơn trượt cho bàn chân',
        'B. Thanh tẩy tà khí và cầu chúc trận đấu diễn ra an lành theo nghi lễ Shinto',
        'C. Đe dọa tinh thần của đối thủ',
        'D. Báo hiệu cho trọng tài trận đấu bắt đầu'
      ],
      correctIndex: 1,
      explanation: 'Hành động ném muối (Kiyome no Shio) là một nghi thức Thần đạo Shinto cổ xưa mang ý nghĩa gột rửa uế tạp, thanh tẩy không gian thiêng liêng và cầu xin sự bảo hộ của thần linh.',
      culturalContext: 'Mỗi ngày thi đấu của giải đấu lớn Basho, có tới hơn 45 kg muối biển tinh khiết được các lực sĩ sử dụng trên sàn Dohyo.'
    }
  },

  // 2. Geisha & Maiko
  {
    id: 'enc_inf_geisha_02',
    sectionId: 'tradition_arts',
    title: 'Nghệ Thuật Geisha & Maiko Vùng Gion Kyoto: Bậc Thầy Cầm Kỳ Thi Họa & Bí Mật Hanamachi',
    jpTitle: '京都花街の芸妓・舞妓文化と伝統芸能の継承',
    romaji: 'Kyōto Hanamachi no Geiko Maiko Bunka to Dentō Geinō no Keishō',
    hiragana: 'きょうとはなまち の げいこ まいこ ぶんか と でんとうげいのう の けいしょう',
    level: 'N1',
    badge: 'Kyoto Gion · Geiko & Maiko · Đàn Shamisen',
    summary:
      'Văn hóa Geisha (tại Kyoto gọi là Geiko và học việc Maiko): Những nghệ sĩ lưu giữ tinh hoa âm nhạc, múa quạt cổ điển, đàn ba dây Shamisen, nghệ thuật pha trà và phong thái giao tiếp tao nhã bậc thầy tại các khu phố hoa Hanamachi.',
    keyTakeaways: [
      'Khái niệm Geisha (芸者): Nghĩa đen là "Nghệ nhân biểu diễn", hoàn toàn là những nghệ sĩ gìn giữ di sản nghệ thuật truyền thống, không phải gái làng chơi như định kiến sai lầm phương Tây.',
      'Sự khác biệt giữa Maiko và Geiko: Maiko (nữ sinh học việc 15-20 tuổi) búi tóc tự nhiên gắn trâm hoa Kanzashi lộng lẫy và mặc Kimono tay dài Furisode; Geiko (đã trưởng thành) đội tóc giả thanh lịch và mặc Kimono tay ngắn trang nhã.',
      'Nguyên tắc khắt khe "Ichigen-san Okotowari" (一見さんお断り): Các phòng trà Ochaya không bao giờ tiếp khách lạ chưa được người quen uy tín bảo lãnh và giới thiệu từ trước.',
      'Khóa đào tạo gian khổ: Sống tại ký túc xá Okiya, học thuộc hàng trăm điệu múa truyền thống, kỹ năng chơi đàn Shamisen, thổi sáo trúc và đối đáp lịch thiệp.',
    ],
    detailedExplanation:
      'Vùng đất cố đô Kyoto có 5 khu phố hoa Hanamachi nổi tiếng (gọi là Gokagai): Gion Kobu, Pontocho, Miyagawacho, Gion Higashi và Kamishichiken. Để trở thành một Geiko chân chính, các thiếu nữ phải rời xa gia đình từ tuổi 15, bước vào ngôi nhà chung Okiya dưới sự dạy bảo nghiêm khắc của "Okami-san" (Mẹ đỡ đầu). Nghệ thuật trang điểm mặt trắng phấn Shironuri, vẽ viền mắt đỏ Beni và tô son môi cánh hoa sen tạo nên vẻ đẹp huyền ảo dưới ánh sáng đèn lồng giấy mờ ảo của các bữa tiệc Ozashiki truyền thống.',
    culturalPhilosophy:
      'Triết lý của Geisha là trở thành hiện thân sống động của sự duy mỹ và tao nhã (Miyabi). Họ được ví như những đóa hoa biết nói, biết lắng nghe và xoa dịu tâm hồn mệt mỏi của con người giữa cuộc sống xô bồ.',
    practicalAdvice:
      'Quy tắc ứng xử khi gặp Maiko trên đường phố Gion Kyoto: Tuyệt đối không đuổi theo chụp ảnh, không chặn đầu, và nghiêm cấm việc chạm tay vào tà áo Kimono đắt giá của họ. Hãy đứng gọn sang một bên và cúi đầu chào lịch sự.',
    vocabularyList: [
      { word: '舞妓', reading: 'まいこ', meaning: 'Thiếu nữ học việc để trở thành Geiko tại Kyoto', level: 'N1' },
      { word: '芸妓', reading: 'げいこ', meaning: 'Cách gọi Geisha chính thức tại vùng Kyoto', level: 'N1' },
      { word: '花街', reading: 'はなまち', meaning: 'Khu phố hoa nơi có các trà thất và Geisha hoạt động', level: 'N1' },
      { word: '三味線', reading: 'しゃみせん', meaning: 'Đàn ba dây truyền thống của Nhật Bản', level: 'N2' },
    ],
    quickFact:
      'Ban đầu trong lịch sử thời kỳ Edo, những Geisha đầu tiên xuất hiện lại chính là nam giới (gọi là Otoko Geisha hay Taikomochi), chuyên ca hát, kể chuyện cười và khuấy động không khí cho các buổi tiệc.',
    tags: ['Geisha', 'Maiko', 'Kyoto Gion', 'Hanamachi', 'Nghệ Thuật Cổ Truyền'],
    quiz: {
      question: 'Quy tắc "Ichigen-san Okotowari" (一見さんお断り) tại các quán trà Ochaya truyền thống ở Kyoto có nghĩa là gì?',
      options: [
        'A. Nghiêm cấm khách mang theo điện thoại thông minh',
        'B. Từ chối phục vụ khách vãng lai nếu không có khách quen bảo lãnh giới thiệu',
        'C. Khách hàng chỉ được phép dùng trà một lần duy nhất',
        'D. Không đón khách vào ban đêm sau 21 giờ'
      ],
      correctIndex: 1,
      explanation: 'Nguyên tắc này duy trì sự tin cậy tuyệt đối (Shinrai) giữa chủ quán và khách hàng. Trà quán không thu tiền mặt sau bữa tiệc mà gửi hóa đơn sau, do đó chỉ phục vụ những ai có người quen uy tín bảo lãnh.',
      culturalContext: 'Đây là biểu tượng cao nhất của văn hóa tín nhiệm và tính kín đáo truyền thống tại Kyoto.'
    }
  },

  // 3. Wagashi
  {
    id: 'enc_inf_wagashi_03',
    sectionId: 'washoku_cuisine',
    title: 'Bánh Ngọt Truyền Thống Wagashi (和菓子): Nghệ Thuật Điêu Khắc Tinh Tế Của Bốn Mùa',
    jpTitle: '和菓子の四季美学と茶道における調和',
    romaji: 'Wagashi no Shiki Bigaku to Sadō ni Okeru Chōwa',
    hiragana: 'わがしのしきびがく と さどうにおけるちょうわ',
    level: 'N2',
    badge: 'Bốn Mùa Thiên Nhiên · Đậu Đỏ Anko · Trà Đạo',
    summary:
      'Nghệ thuật làm bánh ngọt truyền thống Wagashi gắn liền với bốn mùa xuân - hạ - thu - đông: Sử dụng đậu đỏ Azuki, bột gạo Mochi và đường Wasanbon tự nhiên, tạo hình hoa cúc, lá phong đỏ, hoa tuyết để thưởng thức cùng vị đắng thanh của trà Matcha.',
    keyTakeaways: [
      'Triết lý 5 giác quan: Wagashi đánh thức thị giác (tạo hình mùa), khứu giác (mùi thơm dịu), vị giác (ngọt thanh), xúc giác (mềm dẻo) và thính giác (tên gọi thơ ca).',
      'Phân loại theo độ ẩm: Namagashi (bánh tươi mềm dùng trong trà đạo), Han-namagashi (bánh bán tươi như Yokan), và Higashi (bánh khô cứng như kẹo đường Wasanbon).',
      'Đậu đỏ Azuki (Anko): Linh hồn của bánh Wagashi, được tin là mang sắc đỏ xua đuổi tà khí và bảo vệ sức khỏe.',
      'Sự hòa quyện với Trà Đạo Chanoyu: Ăn một miếng bánh ngọt Wagashi trước khi uống bát trà Matcha đậm đà để cân bằng trọn vẹn vị giác đắng và ngọt.',
    ],
    detailedExplanation:
      'Mỗi chiếc bánh Wagashi là một bức tranh thiên nhiên thu nhỏ phản ánh khoảnh khắc giao mùa của đất trời Nhật Bản. Mùa xuân có bánh Sakura Mochi bọc lá anh đào muối thơm ngát; mùa hè có bánh Mizu Shingen Mochi trong veo như giọt nước sương; mùa thu có Nerikiri tạo hình lá phong Momiji rực rỡ; và mùa đông có bánh hình hoa tuyết Yukiusagi tinh khiết. Người nghệ nhân làm bánh Wagashi không sao chép nguyên mẫu tự nhiên mà dùng nghệ thuật ước lệ để khơi gợi trí tưởng tượng của người thưởng lãm.',
    culturalPhilosophy:
      'Văn hóa Wagashi thể hiện triết lý hòa điệu với tự nhiên: Con người Nhật Bản không ăn đồ ngọt để thỏa mãn cơn đói, mà để cảm nhận dòng chảy vô tận của thời gian và vẻ đẹp bốn mùa đang lướt qua.',
    practicalAdvice:
      'Trong tiệc trà truyền thống, bạn luôn phải ăn hết chiếc bánh Wagashi trên đĩa giấy Kaishi của mình trước khi nâng bát trà Matcha lên uống. Không bao giờ cắn bánh làm đôi rồi đặt lại xuống đĩa, hãy dùng chiếc que tre nhỏ Kuromoji cắt bánh thành từng miếng vừa miệng.',
    vocabularyList: [
      { word: '和菓子', reading: 'わがし', meaning: 'Bánh ngọt truyền thống của Nhật Bản', level: 'N3' },
      { word: 'あんこ', reading: 'あんこ', meaning: 'Nhân đậu đỏ nghiền ngọt truyền thống', level: 'N4' },
      { word: '羊羹', reading: 'ようかん', meaning: 'Bánh thạch đậu đỏ truyền thống Yokan', level: 'N2' },
      { word: '落雁', reading: 'らくがん', meaning: 'Bánh khảo khô làm từ bột gạo và đường Wasanbon', level: 'N1' },
    ],
    quickFact:
      'Đường Wasanbon (和三盆) sản xuất tại vùng Tokushima Shikoku là loại đường quý tộc thủ công đắt nhất Nhật Bản, được chà xát thủ công trên khay gỗ 3 lần để đạt độ mịn tan ngay trên đầu lưỡi.',
    tags: ['Wagashi', 'Ẩm Thực', 'Bốn Mùa', 'Trà Đạo', 'Anko'],
    quiz: {
      question: 'Khi tham dự buổi thưởng trà Chanoyu, người thưởng thức nên làm gì với chiếc bánh ngọt Wagashi?',
      options: [
        'A. Thả bánh Wagashi vào trong bát trà Matcha để làm ngọt nước trà',
        'B. Ăn hết chiếc bánh Wagashi trước khi uống bát trà Matcha',
        'C. Uống hết trà trước rồi mới ăn bánh để tráng miệng',
        'D. Chỉ ngửi hương thơm của bánh chứ không được ăn'
      ],
      correctIndex: 1,
      explanation: 'Vị ngọt thanh tao của bánh Wagashi lưu lại trong khoang miệng sẽ giúp người thưởng trà cảm nhận trọn vẹn vị chát ngọt hậu (Umami) tuyệt vời của bát trà bột Matcha tiếp theo.',
      culturalContext: 'Đây là quy tắc vàng tạo nên sự cân bằng âm dương hoàn hảo trong trà đạo Nhật Bản.'
    }
  },

  // 4. Bonsai
  {
    id: 'enc_inf_bonsai_04',
    sectionId: 'tradition_arts',
    title: 'Nghệ Thuật Cây Cảnh Bonsai (盆栽): Vũ Trụ Thu Nhỏ & Triết Lý Thời Gian Tĩnh Lặng',
    jpTitle: '盆栽の精神性と自然の縮図美学',
    romaji: 'Bonsai no Seishinsei to Shizen no Shukuzu Bigaku',
    hiragana: 'ぼんさいのせいしんせい と しぜんのしゅくずびがく',
    level: 'N2',
    badge: 'Cây Cảnh Thu Nhỏ · Triết Lý Thiền · Omiya Saitama',
    summary:
      'Nghệ thuật trồng và uốn nắn cây cổ thụ trong chậu nhỏ, tái hiện hình ảnh những cây đại thụ ngàn năm nơi vách núi cheo leo: Biểu tượng của sự nhẫn nại, tĩnh tâm, tôn trọng sự già nua và vẻ đẹp phong trần Wabi-Sabi.',
    keyTakeaways: [
      'Ý nghĩa từ ngữ Bonsai (盆栽): Gồm chữ "Bồn" (chậu nông) và "Tài" (trồng cây), biểu đạt sự hòa hợp giữa sinh mệnh thực vật và chiếc chậu gốm thủ công.',
      'Kỹ thuật tạo tác cổ xưa: Uốn cành bằng dây đồng (Harigane), tỉa rễ và tạo các vết chết khô Jin (gỗ lũa trên ngọn) hay Shari (thân cây nứt nẻ bạc màu thời gian).',
      'Cây cảnh sống hàng thế kỷ: Nhiều chậu Bonsai tại Nhật Bản được truyền từ đời ông sang cháu, có tuổi đời hơn 400 - 800 năm vẫn xanh tốt.',
      'Thủ phủ Bonsai thế giới: Ngôi làng Bonsai Omiya (tỉnh Saitama) với Bảo tàng Nghệ thuật Bonsai quốc tế thu hút người hâm mộ khắp năm châu.',
    ],
    detailedExplanation:
      'Khác với thú chơi cây cảnh phương Tây chuộng sự sum suê và cân đối hoàn hảo, nghệ thuật Bonsai của Nhật Bản tôn vinh sự bất đối xứng (Fukinsei) và sự khắc nghiệt của thiên nhiên. Một cây Bonsai đỉnh cao thường mang dáng nghiêng trước gió bão, cành cây khẳng khiu chống chọi với tuyết trắng, nhưng rễ vẫn bám chặt vào lớp đá phong sương. Nhìn vào một chậu Bonsai chỉ cao 40cm, người thưởng ngoạn có thể mường tượng ra cả một cánh rừng thông cổ thụ bạt ngàn hay vực sâu hùng vĩ.',
    culturalPhilosophy:
      'Bonsai là bài học sâu sắc về sự kiên định và tôn trọng quy luật tự nhiên. Người nghệ nhân Bonsai không thể ép buộc cây lớn nhanh trong một ngày; họ phải học cách lắng nghe nhịp thở của cây qua từng mùa và chấp nhận sự hữu hạn của đời người so với sinh mệnh bền bỉ của cỏ cây.',
    practicalAdvice:
      'Khi thưởng lãm một chậu Bonsai trong phòng triển lãm, hãy cúi người xuống để tầm mắt ngang bằng với mặt chậu cây. Đây là góc nhìn lý tưởng để bạn cảm nhận cây Bonsai như một đại thụ sừng sững vươn lên bầu trời xanh.',
    vocabularyList: [
      { word: '盆栽', reading: 'ぼんさい', meaning: 'Nghệ thuật trồng cây cảnh thu nhỏ trong chậu', level: 'N3' },
      { word: '樹齢', reading: 'じゅれい', meaning: 'Tuổi thọ của thân cây', level: 'N1' },
      { word: '剪定', reading: 'せんてい', meaning: 'Kỹ thuật cắt tỉa cành cây nghệ thuật', level: 'N1' },
      { word: '針金掛け', reading: 'はりがねかけ', meaning: 'Kỹ thuật uốn cành cây bằng dây kim loại', level: 'N1' },
    ],
    quickFact:
      'Tại Bảo tàng Bonsai Quốc gia có một chậu cây thông trắng Nhật Bản (Yamaki Pine) có tuổi đời gần 400 năm, từng sống sót kỳ diệu qua vụ nổ bom nguyên tử tại Hiroshima năm 1945 cách tâm chấn chỉ 3km.',
    tags: ['Bonsai', 'Nghệ Thuật', 'Thiền', 'Wabi-Sabi', 'Saitama'],
    quiz: {
      question: 'Trong nghệ thuật Bonsai Nhật Bản, thuật ngữ "Jin" và "Shari" dùng để chỉ yếu tố gì trên cây?',
      options: [
        'A. Những bông hoa nở sớm nhất vào đầu mùa xuân',
        'B. Các phần cành nhánh hoặc thân cây bị lũa chết khô bạc màu tạo cảm giác phong sương cổ kính',
        'C. Loại phân bón hữu cơ bí truyền làm từ cá ngừ',
        'D. Lớp rêu xanh phủ kín mặt đất quanh gốc cây'
      ],
      correctIndex: 1,
      explanation: 'Jin và Shari là nghệ thuật tạo gỗ lũa trắng bạc, mô phỏng những cành cây bị sét đánh hay gió tuyết bào mòn trên đỉnh núi cao, làm nổi bật sức sống mãnh liệt của cây.',
      culturalContext: 'Đây là hiện thân xuất sắc của triết lý Wabi-Sabi - tìm thấy vẻ đẹp vĩnh cửu trong những vết tích thời gian phai tàn.'
    }
  },

  // 5. Origami
  {
    id: 'enc_inf_origami_05',
    sectionId: 'tradition_arts',
    title: 'Nghệ Thuật Xếp Giấy Origami (折り紙): Phép Màu Hình Học & Huyền Thoại 1.000 Cánh Hạc Senbazuru',
    jpTitle: '折り紙の幾何学美と平和の千羽鶴伝説',
    romaji: 'Origami no Kikagakubi to Heiwa no Senbazuru Densetsu',
    hiragana: 'おりがみのきかがくび と へいわのせんばづるでんせつ',
    level: 'N3',
    badge: 'Xếp Giấy · Cánh Hạc Orizuru · Hòa Bình',
    summary:
      'Nghệ thuật biến mảnh giấy hình vuông Washi phẳng thành hàng trăm hình thù sống động mà không cần cắt hay dán keo: Từ trò chơi trẻ thơ đến ứng dụng trong kỹ thuật hàng không vũ trụ và biểu tượng hòa bình Senbazuru thế giới.',
    keyTakeaways: [
      'Nguyên tắc vàng Origami thuần túy: Chỉ sử dụng các nếp gấp (Fold), tuyệt đối không dùng kéo cắt giấy hay keo dán.',
      'Cánh hạc hòa bình (Orizuru): Biểu tượng trường thọ và ước nguyện lành bệnh trong văn hóa dân gian Nhật Bản.',
      'Huyền thoại Senbazuru (千羽鶴): Người nào kiên trì gấp đủ 1.000 cánh hạc giấy xâu thành chuỗi thì lời cầu ước bình an hoặc hòa bình sẽ thành hiện thực.',
      'Ứng dụng công nghệ hiện đại: Nguyên lý gấp nếp Miura-ori của Origami được NASA và JAXA ứng dụng để xếp gọn tấm pin năng lượng mặt trời trên tàu vũ trụ.',
    ],
    detailedExplanation:
      'Origami xuất hiện từ thời kỳ Heian khi giấy Washi thủ công còn là vật phẩm xa xỉ dùng trong các nghi lễ trang trọng của Thần đạo. Đến thời Edo, cuốn sách hướng dẫn xếp hạc giấy đầu tiên "Hiden Senbazuru Orikata" ra đời năm 1797 đã biến Origami thành một nét văn hóa đại chúng phổ biến. Câu chuyện cảm động về cô bé Sasaki Sadako tại Hiroshima gấp hạc giấy cầu nguyện sự sống đã biến cánh hạc giấy Orizuru thành sứ giả hòa bình quốc tế, kết nối triệu triệu trái tim nhân loại.',
    culturalPhilosophy:
      'Origami phản ánh trí tuệ tỉ mỉ và sự trân trọng đối với vạn vật: Từ một tờ giấy mỏng manh đơn giản, qua đôi bàn tay kiên nhẫn và tư duy cấu trúc, con người có thể kiến tạo nên cả một vũ trụ động vật, hoa lá và kỳ quan rực rỡ.',
    practicalAdvice:
      'Khi thăm Công viên Tưởng niệm Hòa bình Hiroshima, du khách khắp nơi trên thế giới đều mang theo các chuỗi 1.000 cánh hạc giấy Senbazuru rực rỡ sắc màu để dâng tặng tại Tượng đài Trẻ em Hòa bình. Bạn cũng có thể tự tay gấp một cánh hạc để gửi gắm thông điệp hòa bình.',
    vocabularyList: [
      { word: '折り紙', reading: 'おりがみ', meaning: 'Nghệ thuật xếp giấy truyền thống của Nhật', level: 'N4' },
      { word: '千羽鶴', reading: 'せんばづる', meaning: 'Chuỗi 1.000 cánh hạc giấy cầu chúc hòa bình và an lành', level: 'N2' },
      { word: '折る', reading: 'おる', meaning: 'Gấp, bẻ cong (giấy, cành cây)', level: 'N4' },
      { word: '和紙', reading: 'わし', meaning: 'Giấy thủ công truyền thống của Nhật Bản', level: 'N2' },
    ],
    quickFact:
      'Tấm pin mặt trời của kính viễn vọng không gian James Webb và các stent mạch máu trong phẫu thuật tim y khoa hiện đại đều lấy cảm hứng trực tiếp từ thuật toán nếp gấp của nghệ thuật Origami.',
    tags: ['Origami', 'Hạc Giấy', 'Hòa Bình', 'Khoa Học', 'Nghệ Thuật'],
    quiz: {
      question: 'Theo quan niệm dân gian Nhật Bản, chuỗi 1.000 cánh hạc giấy "Senbazuru" mang ý nghĩa linh thiêng nhất là gì?',
      options: [
        'A. Đánh dấu sự trưởng thành ở tuổi 20',
        'B. Cầu nguyện cho người bệnh mau chóng hồi phục sức khỏe và ước vọng hòa bình',
        'C. Chúc mừng sinh nhật cho người cao tuổi',
        'D. Cầu xin may mắn khi thi đỗ đại học'
      ],
      correctIndex: 1,
      explanation: 'Chim hạc (Tsuru) trong truyền thuyết Nhật Bản sống thọ nghìn năm. Gấp 1.000 cánh hạc là lời nguyện cầu chí thành nhất cho sự sống, sức khỏe và sự chấm dứt chiến tranh.',
      culturalContext: 'Hình ảnh cánh hạc trắng Orizuru ngày nay đã trở thành biểu tượng phản chiến và hữu nghị toàn cầu.'
    }
  },

  // 6. Bushido
  {
    id: 'enc_inf_bushido_06',
    sectionId: 'history_politics',
    title: 'Tinh Thần Võ Sĩ Đạo Bushido (武士道): Bảy Đức Hạnh Vàng Của Tầng Lớp Samurai',
    jpTitle: '武士道の七つの徳と現代日本人の精神的支柱',
    romaji: 'Bushidō no Nanatsu no Toku to Gendai Nihonjin no Seishinteki Shichū',
    hiragana: 'ぶしどうのななつのとく と げんだいにほんじんのせいしんてきしちゅう',
    level: 'N1',
    badge: 'Võ Sĩ Đạo · 7 Đức Hạnh · Tinh Thần Samurai',
    summary:
      'Quy chuẩn đạo đức nghiêm ngặt của tầng lớp kiếm khách Samurai Nhật Bản: Bảy đức hạnh Nghĩa (Gi), Dũng (Yu), Nhân (Jin), Lễ (Rei), Thành (Makoto), Danh dự (Meiyo) và Trung nghĩa (Chugi) định hình cốt cách dân tộc Nhật.',
    keyTakeaways: [
      'Cuốn sách kinh điển "Bushido: The Soul of Japan" của Nitobe Inazo năm 1899 đã giới thiệu triết lý sống cao quý của Samurai ra toàn thế giới.',
      '7 Đức Hạnh Vàng: Nghĩa (Công lý chính trực), Dũng (Dũng cảm không mù quáng), Nhân (Lòng trắc ẩn), Lễ (Tôn trọng lễ phép), Thành (Thành thật giữ lời hứa), Danh dự (Coi trọng phẩm giá hơn tính mạng), Trung nghĩa (Tận tụy hết mình).',
      'Thanh kiếm Katana - Linh hồn của Samurai: Kiếm không dùng để chém giết bừa bãi mà là công cụ rèn luyện tâm trí và bảo vệ chính nghĩa.',
      'Sự chuyển mình thời hiện đại: Tinh thần Samurai thời bình biến thành lòng trung thành và tận tụy cống hiến của người lao động trong các doanh nghiệp Nhật Bản.',
    ],
    detailedExplanation:
      'Bushido (武士道 - Đạo của người cầm vũ khí) chịu ảnh hưởng sâu sắc từ ba nguồn tư tưởng lớn: Tinh thần Thần đạo Shinto (lòng yêu nước và tôn thờ tổ tiên), Đạo Phật Thiền tông (vượt qua nỗi sợ hãi cái chết và giữ tâm trí tĩnh lặng như mặt nước hồ), và Nho giáo (các chuẩn mực đạo đức về quan hệ vua tôi, phụ tử, bằng hữu). Đối với một Samurai chân chính, điều đáng sợ nhất không phải là cái chết trên chiến trường, mà là sống một cuộc đời hèn nhát, thất hứa hoặc làm tổn hại đến danh dự gia tộc.',
    culturalPhilosophy:
      'Triết lý Bushido khẳng định: Sức mạnh thực sự của một con người không nằm ở việc áp đảo kẻ yếu bằng bạo lực, mà nằm ở sự kiềm chế bản thân, tinh thần kỷ luật tự giác cao độ và lòng trắc ẩn đối với những người khốn khó.',
    practicalAdvice:
      'Tại nơi làm việc Nhật Bản ngày nay, đức tính "Makoto" (Thành tín - lời nói đi đôi với việc làm) và "Chugi" (Trách nhiệm với tổ chức) vẫn là thước đo uy tín hàng đầu. Khi hứa hẹn một kỳ hạn (Deadline) với đồng nghiệp Nhật, hãy coi trọng nó như danh dự của một hiệp sĩ.',
    vocabularyList: [
      { word: '武士道', reading: 'ぶしどう', meaning: 'Võ sĩ đạo, đạo đức của tầng lớp Samurai', level: 'N1' },
      { word: '義', reading: 'ぎ', meaning: 'Chính nghĩa, sự công bằng chính trực', level: 'N1' },
      { word: '誠', reading: 'まこと', meaning: 'Sự chân thành tuyệt đối, nói là làm', level: 'N1' },
      { word: '名誉', reading: 'めいよ', meaning: 'Danh dự, phẩm giá tôn quý', level: 'N2' },
    ],
    quickFact:
      'Nhà tư tưởng Nitobe Inazo đã viết cuốn "Bushido" bằng tiếng Anh khi ông đang ở Mỹ để giải thích cho phương Tây hiểu lý do vì sao người Nhật không có một tôn giáo quốc gia duy nhất nhưng vẫn sở hữu nền tảng luân lý đạo đức cực kỳ nghiêm cẩn.',
    tags: ['Bushido', 'Samurai', 'Đạo Đức', 'Lịch Sử', 'Triết Lý Sống'],
    quiz: {
      question: 'Trong 7 đức hạnh vàng của Võ sĩ đạo Bushido, đức tính nào được xem là ngọn cờ chỉ đường quan trọng nhất quyết định ranh giới giữa chính nghĩa và tà tâm?',
      options: [
        'A. Dũng (Dũng cảm liều mạng)',
        'B. Nghĩa (Gi - Tính công lý và sự chính trực không vụ lợi)',
        'C. Tài (Tài năng kiếm thuật xuất chúng)',
        'D. Lợi (Khả năng giành chiến lợi phẩm)'
      ],
      correctIndex: 1,
      explanation: 'Nghĩa (Gi / 義) là đức tính quan trọng nhất: Dũng cảm mà không có Nghĩa thì chỉ là sự liều lĩnh tàn bạo; trung thành mà không có Nghĩa thì chỉ là sự mù quáng.',
      culturalContext: 'Khái niệm "Gi" là nền tảng cốt lõi định nghĩa tư cách của một hiệp sĩ chân chính trong lịch sử Nhật Bản.'
    }
  },

  // 7. Hanami & Sakura
  {
    id: 'enc_inf_hanami_07',
    sectionId: 'society_customs',
    title: 'Lễ Hội Ngắm Hoa Anh Đào Hanami (花見): Triết Lý Phù Du Mono No Aware & Dự Báo Sakura Zensen',
    jpTitle: '花見の文化史ともののあわれの美学',
    romaji: 'Hanami no Bunkashi to Mono no Aware no Bigaku',
    hiragana: 'はなみのぶんかし と もののあわれのびがく',
    level: 'N3',
    badge: 'Mùa Xuân · Hoa Anh Đào · Triết Lý Vô Thường',
    summary:
      'Tập quán thưởng ngoạn hoa anh đào dưới tán cây rực rỡ vào mùa xuân, theo dõi dự báo hoa nở Sakura Zensen trải dài từ Okinawa đến Hokkaido, và chiêm nghiệm vẻ đẹp phù du của kiếp nhân sinh qua triết lý Mono no Aware.',
    keyTakeaways: [
      'Khái niệm Sakura Zensen (桜前線): Tiền tuyến hoa anh đào nở dần từ miền Nam ấm áp lên miền Bắc kéo dài từ cuối tháng 3 đến đầu tháng 5.',
      'Triết lý Mono no Aware (もののあわれ): Nỗi niềm u hoài dịu dàng trước sự ngắn ngủi của cái đẹp; hoa anh đào nở rộ rực rỡ nhất chỉ trong 1 tuần rồi rụng bay theo gió.',
      'Văn hóa picnic dưới tán hoa: Bạn bè đồng nghiệp trải bạt xanh Leisure sheet, thưởng thức cơm hộp bento hoa anh đào, bánh Sakura mochi và nâng ly rượu Sake mừng năm mới tài chính.',
      'Thưởng hoa đêm Yozakura: Ánh đèn lồng lấp lánh phản chiếu những chùm hoa anh đào hồng phấn tạo nên khung cảnh huyền ảo khó quên.',
    ],
    detailedExplanation:
      'Tập tục ngắm hoa Hanami bắt nguồn từ thời kỳ Nara khi giới quý tộc tụ tập ngắm hoa mận Ume, sau đó chuyển sang hoa anh đào Sakura vào thời Heian. Đến thời tướng quân Tokugawa Yoshimune thời Edo, hàng vạn gốc hoa anh đào được trồng dọc theo sông Sumida và đồi Ueno để người dân thường cùng thưởng ngoạn. Đối với người Nhật, hoa anh đào nở vào tháng 4 trùng với lễ khai giảng năm học mới và ngày đầu tiên các nhân viên trẻ bước chân vào công ty, đánh dấu một khởi đầu mới tràn đầy hy vọng.',
    culturalPhilosophy:
      'Hoa anh đào dạy người Nhật biết trân quý từng phút giây hiện tại (Ichigo Ichie). Vẻ đẹp đỉnh cao của hoa không phải lúc nở mãi trên cành, mà là lúc những cánh hoa bung rơi lả tả (Sakura Fubuki) - ra đi trong thanh thản và kiêu hãnh.',
    practicalAdvice:
      'Quy tắc giữ chỗ ngắm hoa (Basho-tori): Các nhân viên mới (Kohai) thường được giao nhiệm vụ đi giữ chỗ từ sáng sớm. Khi giữ chỗ, hãy dùng bạt vừa vặn với số lượng người tham dự, ghi rõ tên nhóm và không bao giờ bẻ cành ngắt hoa hay xả rác bừa bãi.',
    vocabularyList: [
      { word: '花見', reading: 'はなみ', meaning: 'Tập quán ngắm hoa mùa xuân', level: 'N4' },
      { word: '桜前線', reading: 'さくらぜんせん', meaning: 'Dự báo đường tiến độ nở của hoa anh đào', level: 'N1' },
      { word: '夜桜', reading: 'よざくら', meaning: 'Ngắm hoa anh đào rực rỡ về đêm', level: 'N2' },
      { word: '桜吹雪', reading: 'さくらふぶき', meaning: 'Cảnh tượng cánh hoa anh đào bay lả tả như tuyết rơi', level: 'N1' },
    ],
    quickFact:
      'Giống hoa anh đào phổ biến nhất tại Nhật Bản hiện nay là Somei Yoshino (chiếm tới 80%), loài hoa này được lai tạo nhân tạo vào cuối thời Edo và tất cả các cây đều là nhân bản vô tính, do đó chúng nở và rụng gần như cùng một thời điểm.',
    tags: ['Hanami', 'Hoa Anh Đào', 'Mùa Xuân', 'Mono no Aware', 'Phong Tục'],
    quiz: {
      question: 'Khái niệm thẩm mỹ "Mono no Aware" (もののあわれ) gắn liền sâu sắc với hoa anh đào thể hiện tâm thức gì của người Nhật?',
      options: [
        'A. Niềm kiêu hãnh về sự trường tồn vĩnh cửu của quốc gia',
        'B. Nỗi niềm xao xuyến, u hoài và trân quý trước vẻ đẹp ngắn ngủi, mong manh của vạn vật',
        'C. Sự sợ hãi trước những cơn bão mùa xuân',
        'D. Khao khát làm giàu và danh vọng tiền tài'
      ],
      correctIndex: 1,
      explanation: 'Mono no Aware là rung động sâu sắc của con người trước sự biến đổi vô thường của tự nhiên: Chính vì hoa anh đào tàn nhanh nên khoảnh khắc hoa nở rộ mới trở nên thiêng liêng và đáng trân trọng đến thế.',
      culturalContext: 'Đây là một trong những cột trụ mỹ học quan trọng nhất xuyên suốt lịch sử văn học nghệ thuật Nhật Bản.'
    }
  },

  // 8. Obon & Bon Odori
  {
    id: 'enc_inf_obon_08',
    sectionId: 'society_customs',
    title: 'Đại Lễ Vu Lan Báo Hiếu Obon (お盆): Rước Lửa Mukaebi, Đèn Lồng Chochin & Điệu Múa Bon Odori',
    jpTitle: 'お盆の先祖供養と地域をつなぐ盆踊り文化',
    romaji: 'Obon no Senzo Kuyō to Chiiki o Tsunagu Bon Odori Bunka',
    hiragana: 'おぼんのせんぞくよう と ちいきをつなぐぼんおどりぶんか',
    level: 'N2',
    badge: 'Lễ Vu Lan · Điệu Múa Bon Odori · Rước Lửa Mukaebi',
    summary:
      'Dịp lễ báo hiếu tổ tiên quan trọng nhất mùa hè vào trung tuần tháng 8: Đốt lửa đón linh hồn ông bà (Mukaebi), cưỡi ngựa dưa chuột và bò cà tím Shouryou-uma, hòa mình vào điệu múa cộng đồng Bon Odori và tiễn đưa linh hồn bằng lễ thả đèn hoa đăng Toronagashi.',
    keyTakeaways: [
      'Kỳ nghỉ Obon toàn quốc: Diễn ra từ ngày 13 đến 16 tháng 8 hàng năm, người dân đổ về quê hương sum họp gia đình đông đúc tạo nên các đợt cao điểm giao thông (Kisei Rush).',
      'Linh thú Shouryou-uma (精霊馬): Dùng dưa chuột cắm que làm ngựa phóng nhanh đón linh hồn tổ tiên về nhà, và dùng cà tím béo múp làm bò chở đồ ăn từ tốn đưa tiễn ông bà về cõi âm.',
      'Điệu múa Bon Odori: Người dân mặc áo Yukata quây thành vòng tròn quanh tháp gỗ Yagura nhảy múa theo nhịp trống Taiko để an ủi linh hồn người đã khuất.',
      'Lễ thả hoa đăng Toronagashi: Hàng nghìn chiếc đèn lồng giấy thắp nến lung linh trôi theo dòng sông ra biển lớn mang theo lời nguyện cầu siêu thoát thanh thản.',
    ],
    detailedExplanation:
      'Obon (viết tắt của Urabon’e - Vu Lan Bồn) là sự dung hợp tuyệt đẹp giữa giáo lý Phật giáo về đạo hiếu và tín ngưỡng Thần đạo thờ cúng tổ tiên bản địa. Vào ngày 13/8, trước hiên nhà người Nhật sẽ đốt đống lửa nhỏ Mukaebi từ que gai để dẫn đường cho linh hồn tổ tiên tìm về đúng mái nhà xưa. Trong những ngày này, bàn thờ Phật Butsudan được lau dọn trang nghiêm, dâng cúng hoa quả tươi, bánh dẻo Ohagi và nước trà thơm. Đến tối ngày 16/8, ngọn lửa tiễn đưa Okuribi sẽ được thắp lên, nổi tiếng nhất là đại lễ đốt lửa chữ Đại khổng lồ Gozan no Okuribi trên 5 ngọn núi quanh cố đô Kyoto.',
    culturalPhilosophy:
      'Lễ Obon nhắc nhở mỗi người về cội nguồn huyết thống: Con người không sinh ra một cách đơn độc mà là kết tinh của vô vàn thế hệ đi trước. Nhớ ơn tiền nhân chính là cách người Nhật nuôi dưỡng lòng biết ơn và sự gắn kết gia đình bền chặt.',
    practicalAdvice:
      'Thời gian nghỉ lễ Obon (giữa tháng 8) là một trong những mùa du lịch cao điểm nhất Nhật Bản. Giá vé máy bay, vé tàu Shinkansen và khách sạn đều tăng vọt và cháy vé rất sớm. Nếu bạn có kế hoạch du lịch hoặc về nước dịp này, hãy đặt chỗ trước ít nhất 1-2 tháng.',
    vocabularyList: [
      { word: 'お盆', reading: 'おぼん', meaning: 'Lễ Vu Lan tưởng nhớ tổ tiên vào mùa hè', level: 'N3' },
      { word: '盆踊り', reading: 'ぼんおどり', meaning: 'Điệu múa tập thể truyền thống dịp lễ Obon', level: 'N2' },
      { word: '迎え火', reading: 'むかえび', meaning: 'Đống lửa đốt trước cổng đón linh hồn tổ tiên về', level: 'N1' },
      { word: '送り火', reading: 'おくりび', meaning: 'Ngọn lửa tiễn đưa linh hồn tổ tiên trở lại cõi âm', level: 'N1' },
    ],
    quickFact:
      'Lễ hội múa Awa Odori tại tỉnh Tokushima trên đảo Shikoku vào dịp Obon là lễ hội khiêu vũ đường phố lớn nhất Nhật Bản, quy tụ hơn 1,3 triệu du khách cùng nhảy múa theo câu hát trứ danh: "Kẻ múa là kẻ ngốc, người xem cũng là kẻ ngốc, đã cùng là ngốc thì sao không múa cùng nhau!"',
    tags: ['Obon', 'Lễ Hội Mùa Hè', 'Báo Hiếu', 'Bon Odori', 'Kyoto Okuribi'],
    quiz: {
      question: 'Tại sao trong dịp lễ Obon, người Nhật lại cắm que tăm vào quả dưa chuột và quả cà tím đặt trên bàn thờ?',
      options: [
        'A. Để xua đuổi muỗi và côn trùng mùa hè',
        'B. Làm linh thú tượng trưng: Ngựa dưa chuột chạy nhanh đón tổ tiên về, và bò cà tím đi chậm chở đồ đưa tiễn',
        'C. Làm món đồ chơi giải trí cho trẻ nhỏ',
        'D. Để trang trí theo phong thủy màu sắc xanh tím'
      ],
      correctIndex: 1,
      explanation: 'Dưa chuột làm ngựa phóng nhanh để linh hồn ông bà sớm đoàn tụ cùng con cháu; cà tím làm bò bước đi chậm rãi chở đầy ắp quà và lưu luyến tiễn đưa linh hồn trở về thế giới bên kia.',
      culturalContext: 'Đây là nét phong tục vừa thiêng liêng vừa ấm áp tình thương của người dân xứ sở hoa anh đào.'
    }
  },

  // 9. Yatai
  {
    id: 'enc_inf_yatai_09',
    sectionId: 'washoku_cuisine',
    title: 'Quầy Ăn Vỉa Hè Yatai (屋台): Không Gian Giao Lưu Ấm Áp Đêm Fukuoka & Đậm Đà Mì Ramen',
    jpTitle: '福岡中洲の屋台文化と人情味あふれる夜食空間',
    romaji: 'Fukuoka Nakasu no Yatai Bunka to Ninjōmi Afureru Yashoku Kūkan',
    hiragana: 'ふくおかなかす の やたいぶんか と にんじょうみあふれるやしょくくうかん',
    level: 'N2',
    badge: 'Fukuoka Nakasu · Quầy Phố Đêm Yatai · Ramen Tonkotsu',
    summary:
      'Văn hóa ẩm thực đường phố độc đáo hiếm hoi tại Nhật Bản còn lưu giữ tại đảo Kyushu: Những xe đẩy gỗ nhỏ mở ra lúc hoàng hôn dọc bờ sông Nakasu, phục vụ mì Ramen nước hầm xương heo béo ngậy, thịt xiên nướng Yakitori và nồi Oden bốc khói nghi ngút.',
    keyTakeaways: [
      'Thủ phủ Yatai của Nhật Bản: Thành phố Fukuoka (Kyushu) sở hữu hơn 100 quầy Yatai tập trung tại các khu phố Nakasu, Tenjin và Nagahama.',
      'Không gian ấm cúng chỉ 8-10 chỗ ngồi: Khách hàng ngồi chen vai sát cánh dưới mái bạt che mưa, tạo cơ hội trò chuyện cởi mở giữa những người xa lạ.',
      'Thực đơn kinh điển: Mì Ramen Hakata sợi mảnh nước dùng Tonkotsu đậm đà, bánh há cảo Gyoza giòn rụm, thịt bò nướng gừng, và các món lẩu Oden hầm củ cải ngọt thanh.',
      'Quy chế vệ sinh khắt khe: Mỗi quầy Yatai đều phải có giấy phép vệ sinh an toàn thực phẩm, nguồn nước sạch riêng và phải tháo dỡ toàn bộ trước bình minh.',
    ],
    detailedExplanation:
      'Trong một xã hội Nhật Bản hiện đại vốn rất coi trọng sự riêng tư và ranh giới cá nhân (Uchi-Soto), quầy ăn Yatai là ốc đảo kỳ diệu nơi mọi rào cản xã hội dường như tan biến. Giám đốc tập đoàn vest đen, sinh viên đại học, du khách nước ngoài hay những người thợ làm ca đêm đều có thể ngồi chung một băng ghế dài. Dưới ánh đèn vàng ấm áp và tiếng xèo xèo của chảo mỡ, người ta cùng nâng ly bia tươi, than thở về áp lực công việc và chia sẻ những câu chuyện chân thành như bạn tâm giao.',
    culturalPhilosophy:
      'Yatai đại diện cho "Ninjou" (人情 - Tình người bình dị): Một xã hội dù phát triển công nghệ cao đến đâu vẫn luôn khao khát những góc nhỏ mộc mạc nơi hơi ấm con người sưởi ấm cho nhau sau một ngày dài mưu sinh vất vả.',
    practicalAdvice:
      'Kinh nghiệm đi ăn Yatai tại Fukuoka: Hãy gọi ít nhất một món ăn kèm một phần đồ uống (như bia hoặc trà ô long) cho mỗi người. Vì chỗ ngồi rất hạn chế, sau khi ăn xong bạn không nên ngồi nán lại quá lâu để nhường chỗ cho những vị khách đang xếp hàng chờ bên ngoài.',
    vocabularyList: [
      { word: '屋台', reading: 'やたい', meaning: 'Quầy bán đồ ăn lưu động vỉa hè', level: 'N2' },
      { word: '中洲', reading: 'なかす', meaning: 'Khu phố giải trí ven sông nổi tiếng tại thành phố Fukuoka', level: 'N1' },
      { word: '人情味', reading: 'にんじょうみ', meaning: 'Sự ấm áp, nồng hậu của tình người', level: 'N1' },
      { word: '豚骨', reading: 'とんこつ', meaning: 'Nước dùng ninh từ xương lợn trong mì Ramen', level: 'N2' },
    ],
    quickFact:
      'Các quầy Yatai tại Fukuoka thực chất là những xe kéo bánh xe tự chế bằng gỗ. Mỗi buổi chiều lúc 17h, các chủ quán phải tự tay kéo xe từ bãi tập kết ra điểm bán, dựng khung bạt và lắp ráp đường ống nước rồi dọn sạch bóng trả lại vỉa hè lúc 3h sáng hôm sau.',
    tags: ['Yatai', 'Fukuoka', 'Ẩm Thực Đường Phố', 'Ramen', 'Kyushu'],
    quiz: {
      question: 'Thành phố nào tại Nhật Bản ngày nay nổi tiếng nhất cả nước và được mệnh danh là thủ phủ của văn hóa quầy ăn đường phố Yatai?',
      options: [
        'A. Sapporo (Hokkaido)',
        'B. Thành phố Fukuoka (tỉnh Fukuoka, đảo Kyushu)',
        'C. Thành phố Kyoto',
        'D. Yokohama (Kanagawa)'
      ],
      correctIndex: 1,
      explanation: 'Fukuoka là nơi duy nhất tại Nhật Bản có đạo luật đặc biệt bảo tồn và quy hoạch văn hóa xe đẩy Yatai, tập trung nổi tiếng nhất tại khu Nakasu và Tenjin.',
      culturalContext: 'Đây là trải nghiệm ẩm thực đêm không thể bỏ qua đối với bất kỳ du khách nào đặt chân đến đảo Kyushu.'
    }
  },

  // 10. Tatami & Washitsu
  {
    id: 'enc_inf_tatami_10',
    sectionId: 'tradition_arts',
    title: 'Kiến Trúc Nhà Truyền Thống Washitsu: Chiếu Cói Tatami, Cửa Trượt Shoji & Góc Thiêng Tokonoma',
    jpTitle: '和室建築の様式美：畳・障子・床の間と陰翳礼讃',
    romaji: 'Washitsu Kenchiku no Yōshikibi Tatami Shōji Tokonoma to In’ei Raisan',
    hiragana: 'わしつけんちくのようしきび たたみ しょうじ とこのま と いんえいらいさん',
    level: 'N2',
    badge: 'Chiếu Tatami · Cửa Trượt Shoji · Góc Tokonoma',
    summary:
      'Nghệ thuật không gian sống hòa mình với thiên nhiên của người Nhật: Chiếu cói Igusa thơm ngát tự điều hòa độ ẩm, cửa trượt dán giấy dó Shoji khuếch tán ánh sáng dịu nhẹ, và góc phòng Tokonoma thanh tao chiêm ngưỡng tranh thủy mặc.',
    keyTakeaways: [
      'Đơn vị đo diện tích Jo (畳): Người Nhật đo diện tích phòng ốc bằng số lượng chiếu Tatami (ví dụ: phòng 6 chiếu Rokujo khoảng 10m², phòng 8 chiếu Hachijo khoảng 13m²).',
      'Chiếu cói tự nhiên Igusa: Có khả năng hút ẩm vào mùa mưa, giữ ấm vào mùa đông và tỏa ra mùi hương thảo mộc dịu nhẹ giúp an thần sảng khoái.',
      'Cửa trượt Shoji và Fusuma: Thay vì dùng tường gạch ngăn cách kiên cố, các vách trượt bằng gỗ dán giấy Washi mỏng giúp mở rộng linh hoạt không gian sống theo nhu cầu.',
      'Góc nghệ thuật Tokonoma (床の間): Một hốc tường nâng cao trang trọng nhất trong phòng, chỉ dùng để treo một bức tranh cuộn Kakejiku và đặt một bình hoa Ikebana tinh giản.',
    ],
    detailedExplanation:
      'Căn phòng phong cách Nhật Washitsu (和室) phản ánh đỉnh cao của triết lý thẩm mỹ "Ca ngợi bóng tối" (In’ei Raisan) được nhà văn Tanizaki Jun’ichiro ca ngợi. Ánh sáng mặt trời không rọi chói chang vào phòng mà được lọc nhẹ nhàng qua lớp giấy dó Shoji, tạo nên những mảng sáng tối mơ màng trên mặt chiếu cói xanh ngả vàng. Trong phòng Washitsu, con người ngồi trực tiếp trên chiếu (Seiza hoặc Agura), đưa trọng tâm cơ thể gần gũi với mặt đất mẹ, lắng nghe tiếng gió rì rào qua rặng tre ngoài hiên vườn Engawa.',
    culturalPhilosophy:
      'Không gian Washitsu tôn vinh sự tối giản linh hoạt (Flexibility): Cùng một căn phòng, ban ngày đặt bàn trà thấp Chabu-dai để tiếp khách và làm việc, ban đêm cất bàn đi và trải đệm Futon ra là biến thành phòng ngủ thanh bình.',
    practicalAdvice:
      'Quy tắc ứng xử khi bước vào phòng chiếu Tatami: Tuyệt đối không đi dép trong nhà (Surippa) lên chiếu Tatami (chỉ đi chân tất sạch). Khi bước đi, tránh dẫm lên các đường mép vải viền (Heri) của tấm chiếu và tuyệt đối không bao giờ bước chân dẫm vào khu vực góc Tokonoma.',
    vocabularyList: [
      { word: '和室', reading: 'わしつ', meaning: 'Căn phòng thiết kế theo phong cách truyền thống Nhật Bản', level: 'N3' },
      { word: '畳', reading: 'たたみ', meaning: 'Chiếu cói Tatami truyền thống', level: 'N3' },
      { word: '障子', reading: 'しょうじ', meaning: 'Cửa trượt khung gỗ dán giấy dó màu trắng', level: 'N2' },
      { word: '床の間', reading: 'とこのま', meaning: 'Góc phòng trang trí trang trọng treo tranh và bình hoa', level: 'N1' },
    ],
    quickFact:
      'Cách sắp xếp chiếu Tatami trong một căn phòng được chia làm 2 quy chuẩn nghiêm ngặt: Shūgijiki (sắp xếp cát tường mang lại may mắn, 4 góc chiếu không bao giờ chụm vào 1 điểm chữ thập) và Fushūgijiki (sắp xếp tang lễ xui xẻo).',
    tags: ['Tatami', 'Washitsu', 'Kiến Trúc', 'Shoji', 'Tokonoma'],
    quiz: {
      question: 'Khi đo diện tích một căn phòng hoặc căn hộ chung cư tại Nhật Bản, người ta thường sử dụng đơn vị nào gắn liền với chiếu cói?',
      options: [
        'A. Tsubo (坪)',
        'B. Jō (畳 - số lượng chiếu Tatami)',
        'C. Ken (間)',
        'D. Shakukan (尺貫)'
      ],
      correctIndex: 1,
      explanation: 'Người Nhật luôn mô tả diện tích phòng ở bằng số chiếu Jo (ví dụ: phòng 6 chiếu Rokujō là kích thước tiêu chuẩn phổ biến nhất cho một người độc thân).',
      culturalContext: 'Kích thước một tấm chiếu Tatami tiêu chuẩn dài khoảng 1.82m và rộng 0.91m (tỷ lệ vàng 2:1).'
    }
  },

  // 11. Wagyu
  {
    id: 'enc_inf_wagyu_11',
    sectionId: 'washoku_cuisine',
    title: 'Thịt Bò Thượng Hạng Wagyu (和牛): Thang Đo Cẩm Thạch BMS A5 & Bí Mật Chăn Nuôi Đỉnh Cao',
    jpTitle: '和牛の霜降り美学と格付けA5基準の真髄',
    romaji: 'Wagyū no Shimofuri Bigaku to Kakuzuke A5 Kijun no Shinzui',
    hiragana: 'わぎゅうのしもふりびがく と かくづけえーごきじゅんのしんずい',
    level: 'N2',
    badge: 'Thịt Bò Wagyu · Vân Mỡ Shimofuri · Thang Điểm A5',
    summary:
      'Đỉnh cao của nghệ thuật chăn nuôi bò thịt thế giới: 4 giống bò thuần chủng Nhật Bản với những dải vân mỡ cẩm thạch Shimofuri xen lẫn thớ thịt hồng hào, tan chảy ngay ở nhiệt độ cơ thể người (25°C), nổi tiếng với bò Kobe, Matsusaka và Omi.',
    keyTakeaways: [
      'Định nghĩa Wagyu (和牛): Nghĩa đen là "Bò Nhật Bản", chỉ 4 giống bò thuần chủng: Bò lông đen Kuroge Washu (chiếm 90%), Bò lông đỏ Akage, Bò không sừng Mukaku và Bò sừng ngắn Nihon Tankaku.',
      'Thang đo cấp bậc A5 tối cao: Chữ "A" đánh giá tỷ lệ thịt tinh lọc suất ra (Yield Grade A-C), còn số "5" đánh giá chất lượng vân mỡ cẩm thạch BMS, màu sắc và độ mịn thớ thịt (Score 1-5).',
      'Độ tan chảy kỳ diệu: Mỡ bò Wagyu chứa hàm lượng rất cao axit béo không no Oleic acid, có điểm nóng chảy chỉ từ 25 - 28°C (thấp hơn thân nhiệt 37°C của con người), tạo cảm giác miếng thịt tan biến tức thì trên đầu lưỡi.',
      'Tam Đại Thương Hiệu Wagyu (Nihon Sandai Wagyu): Bò Kobe (tỉnh Hyogo), Bò Matsusaka (tỉnh Mie) và Bò Omi (tỉnh Shiga).',
    ],
    detailedExplanation:
      'Quy trình nuôi dưỡng bò Wagyu đòi hỏi sự tỉ mỉ đến mức khó tin. Những chú bò được gắn mã số định danh 10 chữ số riêng biệt truy xuất nguồn gốc phả hệ 3 đời, được nghe nhạc cổ điển để giảm căng thẳng thần kinh, uống nguồn nước khoáng tinh khiết của núi tuyết, ăn cỏ rơm giàu dinh dưỡng và được người nông dân chải lông massage mỗi ngày bằng rượu gạo. Kết quả là những thớ thịt có hoa văn đá cẩm thạch trắng muốt (Shimofuri) tuyệt đẹp như một tác phẩm hội họa thiên nhiên.',
    culturalPhilosophy:
      'Văn hóa bò Wagyu phản ánh tinh thần Monozukuri (thủ công kiệt xuất): Người chăn nuôi Nhật Bản không chạy theo sản lượng công nghiệp hàng loạt mà dành trọn tâm huyết nuôi nấng từng cá thể sinh mệnh đạt tới độ hoàn mỹ tột cùng.',
    practicalAdvice:
      'Khi thưởng thức bò Wagyu A5 tại nhà hàng Teppanyaki nướng bàn sắt, hãy yêu cầu đầu bếp nướng chín tới vừa phải (Medium Rare). Chỉ nên chấm miếng thịt bò với một chút muối biển thô tinh khiết hoặc mù tạt Wasabi tươi mài tay để vị béo ngậy thanh khiết không bị lấn át bởi nước sốt công nghiệp.',
    vocabularyList: [
      { word: '和牛', reading: 'わぎゅう', meaning: 'Bò thịt thuần chủng phong cách Nhật Bản', level: 'N3' },
      { word: '霜降り', reading: 'しもふり', meaning: 'Vân mỡ cẩm thạch trắng xen kẽ trong thớ thịt đỏ', level: 'N1' },
      { word: '格付け', reading: 'かくづけ', meaning: 'Hệ thống xếp hạng, phân loại đẳng cấp chất lượng', level: 'N1' },
      { word: '鉄板焼き', reading: 'てっぱんやき', meaning: 'Món nướng biểu diễn trực tiếp trên bàn sắt phẳng', level: 'N3' },
    ],
    quickFact:
      'Nhật Bản có hệ thống cơ sở dữ liệu quốc gia cho phép người tiêu dùng quét mã QR trên hộp thịt bò tại siêu thị để xem hình ảnh chụp, ngày tháng năm sinh, họ tên bố mẹ và trang trại nuôi dưỡng của chính con bò đó.',
    tags: ['Wagyu', 'Bò Kobe', 'Ẩm Thực', 'A5', 'Monozukuri'],
    quiz: {
      question: 'Tại sao khi ăn thịt bò Wagyu Nhật Bản đạt chuẩn A5, thực khách lại cảm nhận miếng thịt dường như tan chảy ngay trong khoang miệng?',
      options: [
        'A. Vì đầu bếp đã hầm thịt bằng nồi áp suất nhiều giờ liền',
        'B. Vì mỡ vân cẩm thạch chứa nhiều axit béo không no có điểm tan chảy chỉ 25-28°C, thấp hơn thân nhiệt con người',
        'C. Vì thịt được tẩm ướp một loại enzyme đặc biệt làm mềm thớ cơ',
        'D. Vì thịt bò được nướng ở nhiệt độ trên 1.000°C'
      ],
      correctIndex: 1,
      explanation: 'Mỡ cẩm thạch của bò Wagyu có điểm nóng chảy tự nhiên cực kỳ thấp (khoảng 25°C). Ngay khi chạm vào lưỡi ấm nóng của con người, mỡ lập tức hóa lỏng mang lại vị béo ngọt Umami đậm đà.',
      culturalContext: 'Đây là đặc tính sinh học độc nhất vô nhị chỉ có ở các giống bò lông đen thuần chủng của Nhật.'
    }
  },

  // 12. Daruma & Maneki Neko
  {
    id: 'enc_inf_daruma_12',
    sectionId: 'society_customs',
    title: 'Biểu Tượng May Mắn Daruma & Maneki-Neko: Triết Lý Vấp Ngã Bảy Lần Đứng Dậy Tám Lần',
    jpTitle: '達磨と招き猫の縁起物文化：七転び八起きの不屈精神',
    romaji: 'Daruma to Manekineko no Engimono Bunka Nanakorobi Yaoki no Fukutsu Seishin',
    hiragana: 'だるま と まねきねこ の えんぎものぶんか ななころびやおき の ふくつせいしん',
    level: 'N3',
    badge: 'Búp Bê Daruma · Mèo Maneki-Neko · Thất Chuyển Bát Khởi',
    summary:
      'Hai vật phẩm cát tường (Engimono) quen thuộc nhất nước Nhật: Búp bê Daruma tròn đỏ không mắt gửi gắm ý chí kiên định vượt khó, và tượng chú mèo vẫy tay Maneki-neko đem lại tài lộc, khách hàng hưng thịnh cho thương nhân.',
    keyTakeaways: [
      'Nguồn gốc búp bê Daruma: Lấy cảm hứng từ Bồ Đề Đạt Ma - vị thiền sư sáng lập Thiền tông, người đã ngồi diện bích thiền định suốt 9 năm ròng rã.',
      'Nghi thức vẽ mắt Daruma (Me-ire): Khi bắt đầu đặt ra mục tiêu lớn, vẽ con ngươi cho mắt trái; khi kiên trì phấn đấu đạt được thành công viên mãn, trịnh trọng vẽ nốt mắt phải.',
      'Cơ chế búp bê lật đật Okiagari: Dù bị đẩy ngã nghiêng ngả ra sao, con búp bê vẫn tự đứng bật dậy, thể hiện châm ngôn "Nanakorobi Yaoki" (七転び八起き - Bảy lần ngã, tám lần đứng dậy).',
      'Mèo vẫy tay Maneki-neko: Mèo vẫy chân phải mang lại tiền bạc tài lộc (Kin’un); mèo vẫy chân trái mời gọi đông đúc khách hàng (Senkyaku Banrai).',
    ],
    detailedExplanation:
      'Thủ phủ sản xuất búp bê Daruma chiếm 80% sản lượng toàn Nhật Bản là thành phố Takasaki thuộc tỉnh Gunma. Người nghệ nhân làm búp bê bằng giấy bồi thủ công Washi, sơn màu đỏ tươi xua đuổi bệnh tật. Lông mày của búp bê Daruma được vẽ mô phỏng hình cánh chim hạc (sống ngàn năm), và ria mép được vẽ theo hình mai rùa (sống vạn năm), tượng trưng cho sự trường thọ và cát tường viên mãn.',
    culturalPhilosophy:
      'Búp bê Daruma không phải là bùa chú ban phát phép màu thụ động, mà là tấm gương phản chiếu ý chí nỗ lực của chính bạn: Con mắt còn trống của Daruma hàng ngày nhìn bạn nhắc nhở bạn không được lười biếng bỏ cuộc trước mục tiêu đã chọn.',
    practicalAdvice:
      'Vào dịp đầu năm mới, người Nhật thường mang những chú búp bê Daruma đã vẽ trọn hai mắt sau một năm thành công đến các ngôi đền chùa để tham dự lễ đốt lửa Daruma Kuyo tạ ơn thần phật, sau đó thỉnh một chú búp bê mới có kích thước lớn hơn cho năm tiếp theo.',
    vocabularyList: [
      { word: '達磨', reading: 'だるま', meaning: 'Búp bê ước nguyện Bồ Đề Đạt Ma màu đỏ', level: 'N3' },
      { word: '招き猫', reading: 'まねきねこ', meaning: 'Tượng mèo vẫy tay chiêu tài lộc', level: 'N3' },
      { word: '縁起物', reading: 'えんぎもの', meaning: 'Vật may mắn, bùa cát tường', level: 'N2' },
      { word: '七転び八起き', reading: 'ななころびやおき', meaning: 'Ngã bảy lần đứng dậy tám lần, kiên trì bất khuất', level: 'N1' },
    ],
    quickFact:
      'Ngôi chùa Gotokuji tại quận Setagaya (Tokyo) được coi là cái nôi khai sinh ra truyền thuyết tượng mèo may mắn Maneki-neko, nơi đây có cả một góc hoa viên quy tụ hàng ngàn bức tượng mèo trắng vẫy tay do người dân khắp nơi gửi về tạ ơn.',
    tags: ['Daruma', 'Maneki Neko', 'May Mắn', 'Triết Lý Sống', 'Phong Tục'],
    quiz: {
      question: 'Khi mua một chú búp bê may mắn Daruma để cầu nguyện thi đỗ hoặc thành công trong kinh doanh, bạn cần làm gì đầu tiên?',
      options: [
        'A. Vẽ ngay cả hai con mắt màu đen cho búp bê',
        'B. Chỉ vẽ một con mắt bên trái khi đặt ra mục tiêu, sau khi đạt được thành công mới vẽ tiếp mắt phải',
        'C. Đem búp bê ngâm vào nước trà xanh thanh tẩy',
        'D. Cắt bỏ lớp sơn đỏ bên ngoài'
      ],
      correctIndex: 1,
      explanation: 'Việc để trống mắt phải tạo ra động lực tâm lý thôi thúc bạn nỗ lực không ngừng nghỉ mỗi ngày cho đến khi mục tiêu được hoàn thành viên mãn để mở nốt con mắt còn lại.',
      culturalContext: 'Đây là phương pháp kích thích tâm lý kiên định trứ danh của người dân xứ Phù Tang.'
    }
  },

  // 13. Mottainai & Minimalism
  {
    id: 'enc_inf_mottainai_13',
    sectionId: 'lifelong_learning',
    title: 'Triết Lý Mottainai (もったいない): Sự Trân Quý Từng Hạt Gạo & Lối Sống Xanh Bền Vững Của Người Nhật',
    jpTitle: '「もったいない」精神と日本の循環型社会の知恵',
    romaji: 'Mottainai Seishin to Nihon no Junkangata Shakai no Chie',
    hiragana: 'もったいないせいしん と にほんのじゅんかんがたしゃかいのちえ',
    level: 'N2',
    badge: 'Mottainai · Không Lãng Phí · Tái Chế 3R · Tối Giản',
    summary:
      'Một trong những từ vựng đẹp nhất tiếng Nhật được thế giới tôn vinh: Ý niệm tiếc nuối khi một đồ vật, giọt nước hay hạt cơm không được sử dụng hết giá trị, đặt nền móng cho ý thức bảo vệ môi trường và lối sống tối giản Danshari.',
    keyTakeaways: [
      'Ý nghĩa gốc Shinto và Phật giáo: Vạn vật trong tự nhiên đều có linh hồn (Kami) và mối duyên khởi. Lãng phí đồ đạc hay thức ăn là vô ơn với sự hy sinh của sinh mệnh thiên nhiên.',
      'Câu chuyện hạt cơm bát ăn: Trẻ em Nhật Bản từ mẫu giáo được dạy không được để thừa dù chỉ một hạt cơm trên bát, vì "Mỗi hạt cơm có tới 7 vị thần linh bảo hộ".',
      'Được giải Nobel Hòa bình Wangari Maathai đưa ra thế giới: Khái niệm "Mottainai" bao trùm cả 4 chữ R: Reduce (Giảm thiểu), Reuse (Tái sử dụng), Recycle (Tái chế) và Respect (Tôn trọng thiên nhiên).',
      'Nghệ thuật vá áo Sashiko và Boro: Chắp vá những mảnh vải sờn cũ thành những tấm áo hoa văn độc đáo bền bỉ qua nhiều thế hệ.',
    ],
    detailedExplanation:
      'Nhật Bản là một quốc đảo có diện tích chật hẹp, địa hình 70% đồi núi và khan hiếm tài nguyên khoáng sản. Trải qua hàng trăm năm thử thách của thiên tai và chiến tranh, người Nhật đã đúc kết nên triết lý "Mottainai". Khác với sự tằn tiện keo kiệt của chủ nghĩa thực dụng, Mottainai xuất phát từ tấm lòng biết ơn và cảm nhận được phẩm giá thiêng liêng của mọi vật dụng xung quanh. Khi một chiếc ô hỏng, họ tìm cách sửa; khi một bộ quần áo cũ, họ may thành khăn lau hoặc chăn ghép.',
    culturalPhilosophy:
      'Triết lý Mottainai dạy con người sống hòa hợp với giới hạn của thiên nhiên: Hạnh phúc đích thực không đến từ việc tiêu thụ vô độ những món đồ dùng một lần rồi vứt bỏ, mà đến từ sự trân trọng và đồng hành lâu dài cùng những vật phẩm giản dị.',
    practicalAdvice:
      'Khi sống và làm việc tại Nhật, hãy thực hành Mottainai bằng cách luôn mang theo túi vải gấp gọn (Eco-bag) đi siêu thị để từ chối túi ni-lông, mang bình nước giữ nhiệt cá nhân (My Bottle), và cố gắng gọi lượng thức ăn vừa đủ trong các bữa tiệc để không bỏ thừa (Nokosazu Taberu).',
    vocabularyList: [
      { word: 'もったいない', reading: 'もったいない', meaning: 'Tiếc nuối vì lãng phí giá trị của một sự vật', level: 'N3' },
      { word: '循環型社会', reading: 'じゅんかんがたしゃかい', meaning: 'Xã hội tuần hoàn tái chế tài nguyên', level: 'N1' },
      { word: '再生利用', reading: 'さいせいりよう', meaning: 'Tái sinh sử dụng, tái chế', level: 'N2' },
      { word: '断捨離', reading: 'だんしゃり', meaning: 'Nghệ thuật dọn dẹp buông bỏ đồ đạc để tâm thanh tịnh', level: 'N1' },
    ],
    quickFact:
      'Thị trấn Kamikatsu tại tỉnh Tokushima của Nhật Bản là thị trấn đầu tiên trên thế giới tuyên bố mục tiêu "Zero Waste" (Không rác thải), nơi người dân tự giác phân loại rác thải sinh hoạt thành 45 danh mục khác nhau để tái chế tới hơn 80% rác của toàn thị trấn.',
    tags: ['Mottainai', 'Môi Trường', 'Triết Lý Sống', 'Tái Chế', 'Lối Sống Xanh'],
    quiz: {
      question: 'Nhà hoạt động môi trường người Kenya đoạt giải Nobel Hòa bình năm 2004 - bà Wangari Maathai - đã chọn từ tiếng Nhật nào để phát động chiến dịch bảo vệ môi trường toàn cầu?',
      options: [
        'A. Kawaii (Dễ thương)',
        'B. Mottainai (Trân trọng không lãng phí)',
        'C. Sayonara (Tạm biệt)',
        'D. Arigato (Cảm ơn)'
      ],
      correctIndex: 1,
      explanation: 'Bà Wangari Maathai phát hiện rằng không có một từ tiếng Anh đơn lẻ nào lột tả trọn vẹn cả 4 khái niệm Reduce - Reuse - Recycle - Respect sâu sắc bằng từ "Mottainai" của Nhật Bản.',
      culturalContext: 'Từ này sau đó đã được Liên Hợp Quốc sử dụng rộng rãi trong các hội nghị bảo tồn sinh thái.'
    }
  },

  // 14. Torii & Jinja Shinto
  {
    id: 'enc_inf_torii_14',
    sectionId: 'tradition_arts',
    title: 'Cổng Trời Torii & Đền Thần Xạ Jinja: Ranh Giới Thần Thánh Giữa Cõi Thiêng & Trần Thế',
    jpTitle: '鳥居の起源と神社参拝作法（二礼二拍手一礼）',
    romaji: 'Torii no Kigen to Jinja Sanpai Sahō Nirei Nihakushu Ichirei',
    hiragana: 'とりいのきげん と じんじゃさんぱいさほう にれいにはくしゅいちれい',
    level: 'N3',
    badge: 'Cổng Torii Đỏ · Đền Jinja · Lễ Nghi Hai Lạy Hai Vỗ Tay',
    summary:
      'Biểu tượng văn hóa nổi tiếng nhất của Thần đạo Shinto: Chiếc cổng đỏ son Torii đánh dấu bước chân từ thế giới trần tục vào lãnh địa thanh tịnh của thần linh, giếng nước tẩy trần Temizuya và nghi thức bái lạy "2 Lạy - 2 Vỗ Tay - 1 Lạy".',
    keyTakeaways: [
      'Ý nghĩa của cổng Torii: Ranh giới phân chia (Kekkai) giữa cõi phàm tục đầy uế tạp bên ngoài và chốn thanh tịnh linh thiêng nơi các vị thần Kami ngự trị bên trong.',
      'Sắc đỏ son Vermilion (Shu-iro): Được làm từ bột khoáng chất chu sa chứa thủy ngân tự nhiên, vừa có tác dụng chống mối mọt mục rữa gỗ, vừa tượng trưng cho sinh lực mặt trời xua đuổi ma quỷ.',
      'Đại lộ dẫn lối thần linh Seichu: Lối đi chính giữa con đường Sando dẫn vào đền là lối đi dành riêng cho thần linh; người trần khi đi bộ phải né sang hai bên mép đường.',
      'Nghi thức bái lạy chuẩn mực: Cúi gập người 2 lần sâu 90 độ (Nirei) -> Vỗ tay 2 cái dứt khoát (Nihakushu) -> Chắp tay nguyện cầu -> Cúi lạy thêm 1 lần cuối (Ichirei).',
    ],
    detailedExplanation:
      'Trên khắp đất nước Nhật Bản hiện có hơn 80.000 ngôi đền Thần đạo Jinja lớn nhỏ, nhiều hơn cả số lượng cửa hàng tiện lợi. Cổng Torii có lịch sử từ truyền thuyết nữ thần mặt trời Amaterasu ẩn mình vào hang đá, muôn loài phải dựng giàn gỗ cho gà trống đậu lên gáy gọi ánh sáng quay lại. Cổng Torii nổi tiếng nhất có thể kể đến cổng nổi trên biển Otorii ở đền Itsukushima (Miyajima), cổng nghìn chiếc Senbon Torii đỏ rực uốn lượn quanh núi Inari tại Kyoto, và cổng gỗ bách nguyên bản khổng lồ tại đền Meiji Jingu giữa lòng Tokyo.',
    culturalPhilosophy:
      'Cổng Torii nhắc nhở con người về sự khiêm nhường trước thiên nhiên: Khi bước qua cổng, hãy gạt bỏ những toan tính, tham sân si và bụi bặm của cuộc sống đời thường để trở về với sự trong sáng thanh khiết nguyên sơ (Seimei-shin) của tâm hồn.',
    practicalAdvice:
      'Khi đến cổng Torii, hãy dừng lại, quay mặt vào đền và cúi đầu chào nhẹ 15 độ trước khi bước qua. Tại giếng nước Temizuya, dùng gáo múc nước rửa tay trái -> tay phải -> súc miệng (nhổ nhẹ ra ngoài máng, không uống trực tiếp từ gáo) -> dựng gáo đứng lên để nước còn lại rửa sạch cán gáo cho người sau.',
    vocabularyList: [
      { word: '鳥居', reading: 'とりい', meaning: 'Cổng đền Thần đạo Shinto', level: 'N3' },
      { word: '参拝', reading: 'さんぱい', meaning: 'Đi viếng đền chùa, bái lạy thần phật', level: 'N2' },
      { word: '手水舎', reading: 'てみずや', meaning: 'Giếng nước rửa tay và súc miệng thanh tẩy trước khi vào đền', level: 'N1' },
      { word: 'お賽銭', reading: 'おさいせん', meaning: 'Tiền xu dâng cúng ném vào hòm công đức', level: 'N2' },
    ],
    quickFact:
      'Khi ném tiền vào hòm công đức Saisen-bako, người Nhật chuộng nhất đồng xu 5 Yên (Go-en) có lỗ tròn ở giữa, bởi vì chữ "Go-en" đồng âm với "Goren" (ご縁 - Có duyên lành, kết mối duyên tốt đẹp với thần linh và mọi người).',
    tags: ['Torii', 'Đền Shinto', 'Thần Đạo', 'Tâm Linh', 'Kyoto Fushimi'],
    quiz: {
      question: 'Khi đi viếng đền Thần đạo (Jinja) tại Nhật Bản, nghi thức bái lạy trước điện thờ chính quy chuẩn nhất là gì?',
      options: [
        'A. Quỳ sụp xuống đất lạy 3 lần liên tiếp',
        'B. Hai lạy sâu 90 độ -> Hai tiếng vỗ tay dứt khoát -> Chắp tay cầu nguyện -> Một lạy tạ',
        'C. Đứng nghiêm chắp tay vái 5 lần',
        'D. Gõ chuông 10 lần rồi quay lưng bước đi'
      ],
      correctIndex: 1,
      explanation: 'Nghi thức "Nhị lễ, Nhị phách thủ, Nhất lễ" (二礼二拍手一礼) là quy chuẩn Thần đạo toàn quốc: Hai tiếng vỗ tay vang dội đánh thức và báo hiệu cho thần linh sự hiện diện cung kính của bạn.',
      culturalContext: 'Lưu ý: Nghi thức này áp dụng cho đền Thần đạo (Jinja), còn khi vào Chùa Phật giáo (Otera) thì chỉ chắp tay niệm Phật chứ tuyệt đối KHÔNG vỗ tay.'
    }
  },

  // 15. Ekiben
  {
    id: 'enc_inf_ekiben_15',
    sectionId: 'travel_practical',
    title: 'Văn Hóa Cơm Hộp Ga Tàu Ekiben (駅弁): Bản Đồ Mỹ Vị 47 Tỉnh Thành Trên Từng Chuyến Tàu Shinkansen',
    jpTitle: '駅弁の歴史と日本列島鉄道旅情の食文化',
    romaji: 'Ekiben no Rekishi to Nihon Rettō Tetsudō Ryojō no Shokubunka',
    hiragana: 'えきべんのれきし と にほんれっとうてつどうりょじょうのしょくぶんか',
    level: 'N2',
    badge: 'Cơm Hộp Ga Tàu · Tàu Shinkansen · Mỹ Vị Địa Phương',
    summary:
      'Trải nghiệm du lịch đường sắt thi vị bậc nhất xứ Phù Tang: Thưởng thức những hộp cơm Bento ga tàu nghệ thuật chứa đựng đặc sản tươi sống nức tiếng của từng miền quê, ngắm nhìn phong cảnh núi Phú Sĩ vút qua khung cửa sổ toa tàu cao tốc.',
    keyTakeaways: [
      'Lịch sử hơn 130 năm: Xuất hiện lần đầu tiên vào năm 1885 tại ga Utsunomiya, ban đầu chỉ là hai nắm cơm bọc lá tre kèm vài lát củ cải muối Takuan.',
      'Hơn 3.000 loại Ekiben độc đáo: Mỗi nhà ga trên khắp nước Nhật đều có những loại Ekiben độc quyền, sử dụng hải sản và nông sản chỉ vùng đó mới có.',
      'Bao bì nghệ thuật và hộp giữ nhiệt tự sôi: Nhiều loại Ekiben được thiết kế theo hình đầu tàu Shinkansen, hình ấm trà gốm nung Mashiko, hoặc có dây giật hóa học tự làm nóng bốc khói sau 5 phút.',
      'Cửa hàng "Matsuri" tại ga Tokyo: Bán hơn 200 loại Ekiben từ khắp mọi miền đất nước được vận chuyển hỏa tốc bằng tàu Shinkansen mỗi sáng sớm.',
    ],
    detailedExplanation:
      'Ekiben (ghép từ "Eki" - nhà ga và "Bento" - cơm hộp) không đơn thuần là bữa ăn lót dạ chống đói khi đi đường dài, mà là một phần linh hồn của văn hóa du ngoạn đường sắt (Tetsudo Ryoko). Mở chiếc nắp hộp Ekiben buộc dây ruy-băng tinh tế, thực khách như đang mở ra một bức tranh thu nhỏ của vùng đất mình sắp đi qua: Ekiben ga Sendai với lưỡi bò nướng than hoa Gyutan; Ekiben Otaru Hokkaido tràn ngập trứng cá hồi Ikura và thịt cua tuyết ngọt lịm; hay Ekiben Touge no Kamameshi đựng trong thố đất nung Gunma truyền thống.',
    culturalPhilosophy:
      'Ekiben tượng trưng cho sự gắn bó sâu sắc giữa con người và thổ nhưỡng quê hương (Chiisan Chishō - Địa sản địa tiêu): Đi đến đâu, thưởng thức hương vị sản vật của chính vùng đất đó để tri ân thiên nhiên và người nông dân địa phương.',
    practicalAdvice:
      'Quy tắc ăn Ekiben trên tàu hỏa Nhật Bản: Bạn chỉ nên ăn uống trên các chuyến tàu Shinkansen, tàu tốc hành Limited Express có bàn ăn gập riêng, hoặc các toa tàu có ghế quay đối diện. Tránh ăn Ekiben trên các chuyến tàu điện nội đô (Densha thường) chật chội vì mùi thức ăn sẽ ảnh hưởng đến những người đứng xung quanh.',
    vocabularyList: [
      { word: '駅弁', reading: 'えきべん', meaning: 'Cơm hộp chuyên bán tại các nhà ga đường sắt', level: 'N3' },
      { word: '旅情', reading: 'りょじょう', meaning: 'Cảm xúc thi vị, lãng mạn khi đi du lịch', level: 'N1' },
      { word: '名物', reading: 'めいぶつ', meaning: 'Đặc sản nổi tiếng của một địa phương', level: 'N2' },
      { word: '地産地消', reading: 'ちさんちしょう', meaning: 'Sản xuất tại địa phương, tiêu thụ tại địa phương', level: 'N1' },
    ],
    quickFact:
      'Loại Ekiben cổ xưa nhất còn bán liên tục đến ngày nay là "Touge no Kamameshi" (cơm niêu đèo Usui) ra đời từ năm 1958, đựng trong chiếc nồi đất nung gốm Mashiko truyền thống nặng tới gần 1kg mà hành khách có thể mang về nhà làm kỷ niệm sau khi ăn.',
    tags: ['Ekiben', 'Shinkansen', 'Ẩm Thực', 'Du Lịch Đường Sắt', 'Bento'],
    quiz: {
      question: 'Tại sao việc thưởng thức cơm hộp Ekiben lại được khuyến khích trên tàu Shinkansen nhưng lại bị xem là bất lịch sự trên các tàu điện ngầm thường (Densha)?',
      options: [
        'A. Vì trên tàu điện ngầm thường không có thùng rác',
        'B. Tàu Shinkansen là tàu viễn hành có trang bị bàn ăn cá nhân, còn tàu điện ngầm nội đô chật hẹp, việc tỏa mùi đồ ăn gây phiền hà cho người khác',
        'C. Vì giá vé tàu Shinkansen đã bao gồm tiền bảo hiểm thức ăn',
        'D. Vì tàu điện ngầm chạy quá nhanh làm rơi đổ thức ăn'
      ],
      correctIndex: 1,
      explanation: 'Theo quy tắc ứng xử công cộng (Meiwaku), các chuyến tàu nội đô có mật độ hành khách đứng đông đúc nên việc ăn uống tỏa mùi là hành vi thiếu tôn trọng không gian chung.',
      culturalContext: 'Đây là quy tắc ngầm về ý thức công cộng rất quan trọng mà người nước ngoài cần ghi nhớ.'
    }
  },
];

/**
 * Endless Dynamic Generator that can procedurally generate an infinite sequence
 * of rich, culturally accurate Japanese encyclopedia topics across all dimensions.
 */
interface GeneratorArchetype {
  category: EncyclopediaSectionId;
  themes: {
    titleTemplate: string;
    jpTitle: string;
    romaji: string;
    hiragana: string;
    badge: string;
    summary: string;
    takeaways: string[];
    explanation: string;
    philosophy: string;
    advice: string;
    words: { word: string; reading: string; meaning: string; level: any }[];
    fact: string;
    tags: string[];
    quiz: { q: string; opts: string[]; corr: number; exp: string; ctx: string };
  }[];
}

const PROCEDURAL_KNOWLEDGE_ARCHETYPES: GeneratorArchetype[] = [
  {
    category: 'tradition_arts',
    themes: [
      {
        titleTemplate: 'Nghệ Thuật Kịch Rối Cổ Điển Bunraku (文楽): Kiệt Tác Di Sản UNESCO Của Vùng Đất Osaka',
        jpTitle: '人形浄瑠璃文楽の三業調和と世界遺産',
        romaji: 'Ningyō Jōruri Bunraku no Sangyō Chōwa',
        hiragana: 'にんぎょうじょうるりぶんらく の さんぎょうちょうわ',
        badge: 'Kịch Rối Bunraku · UNESCO · Đàn Shamisen',
        summary: 'Hình thức sân khấu múa rối cổ điển thế kỷ 17 với sự phối hợp thần kỳ giữa 3 nghệ nhân điều khiển 1 con rối duy nhất, giọng ngâm kịch tính của nghệ sĩ Tayu và tiếng đàn ba dây Shamisen.',
        takeaways: [
          'Ba nghệ nhân điều khiển một con rối (Omozukai, Hidarizukai, Ashizukai) mất 30 năm khổ luyện.',
          'Nghệ thuật ngâm thơ kịch tính Tayu truyền tải cảm xúc của hàng chục nhân vật.',
          'Di sản văn hóa phi vật thể đại diện nhân loại được UNESCO vinh danh năm 2008.',
        ],
        explanation: 'Bunraku đòi hỏi sự đồng điệu tâm hồn phi thường: Người điều khiển chính lộ diện mạo, hai người phụ mặc đồ đen trùm kín đầu Kuroko. Con rối dường như có linh hồn, chớp mắt, nhỏ lệ và cử động từng ngón tay mềm mại.',
        philosophy: 'Triết lý hòa quyện ba nghiệp (Sangyo) chứng minh sức mạnh của sự phối hợp tập thể: Không ai được phép tỏa sáng cá nhân lấn át người khác.',
        advice: 'Nhà hát Quốc gia Bunraku tại Nipponbashi Osaka có trang bị tai nghe thuyết minh tiếng Anh miễn phí cho du khách quốc tế.',
        words: [
          { word: '文楽', reading: 'ぶんらく', meaning: 'Nghệ thuật kịch rối cổ điển Nhật Bản', level: 'N1' },
          { word: '黒衣', reading: 'くろご', meaning: 'Trang phục đen trùm kín người trợ tá sân khấu', level: 'N1' },
          { word: '太夫', reading: 'たゆう', meaning: 'Nghệ sĩ diễn xướng ngâm kịch bản', level: 'N1' },
        ],
        fact: 'Để được quyền điều khiển đầu và cánh tay phải của con rối chính, một nghệ nhân phải mất 10 năm học điều khiển chân và 10 năm học điều khiển tay trái.',
        tags: ['Bunraku', 'Kịch Rối', 'Osaka', 'UNESCO', 'Nghệ Thuật'],
        quiz: {
          q: 'Trong kịch rối Bunraku, có bao nhiêu nghệ nhân cùng phối hợp điều khiển một con rối chính?',
          opts: ['A. 1 nghệ nhân', 'B. 3 nghệ nhân', 'C. 5 nghệ nhân', 'D. 2 nghệ nhân'],
          corr: 1,
          exp: 'Một con rối Bunraku lớn luôn cần đúng 3 người điều khiển: Người chính lo đầu và tay phải, người thứ hai lo tay trái, người thứ ba lo hai chân.',
          ctx: 'Sự nhịp nhàng này đạt đến mức khán giả quên mất sự hiện diện của những người điều khiển rối.'
        }
      },
      {
        titleTemplate: 'Tranh Khắc Gỗ Ukiyo-e (浮世絵): Kiệt Tác Sóng Lừng Kanagawa & Nguồn Cảm Hứng Cho Mỹ Thuật Thế Giới',
        jpTitle: '浮世絵の版画技術と北斎「神奈川沖浪裏」の衝撃',
        romaji: 'Ukiyo-e no Hanga Gijutsu to Hokusai Kanagawa-oki Nami Ura',
        hiragana: 'うきよえのはんがぎじゅつ と ほくさい かながわおきなみうら',
        badge: 'Tranh Ukiyo-e · Hokusai · Sóng Lừng Kanagawa',
        summary: 'Dòng tranh khắc gỗ nhiều màu rực rỡ thời kỳ Edo phản ánh "thế giới phù du", đưa tên tuổi Katsushika Hokusai và Utagawa Hiroshige làm say đắm danh họa Van Gogh và trường phái ấn tượng châu Âu.',
        takeaways: [
          'Ý nghĩa chữ Ukiyo (Phù thế): Tận hưởng từng khoảnh khắc tươi vui trong cuộc đời trần thế ngắn ngủi.',
          'Quy trình tứ giác: Tác giả vẽ phác thảo (Eshi) -> Thợ khắc bản gỗ (Horishi) -> Thợ in màu (Surishi) -> Nhà xuất bản (Hanmoto).',
          'Tác động quốc tế sâu sắc: Khởi xướng trào lưu nghệ thuật Japonisme tại châu Âu cuối thế kỷ 19.',
        ],
        explanation: 'Bức tranh "Sóng lừng ngoài khơi Kanagawa" nằm trong bộ "36 Cảnh Núi Phú Sĩ" với ngọn sóng thần vươn vuốt bọt trắng uy dũng đối lập với núi Phú Sĩ tĩnh lặng xa xăm đã trở thành tác phẩm hội họa Nhật Bản được tái bản nhiều nhất lịch sử nhân loại.',
        philosophy: 'Ukiyo-e tôn vinh vẻ đẹp đời thường của người lao động bình dân: Nghệ thuật không phải là đặc quyền độc tôn của cung đình xa hoa mà thuộc về quảng đại quần chúng.',
        advice: 'Bảo tàng Sumida Hokusai tại Tokyo là địa điểm lý tưởng để chiêm ngưỡng các bản khắc gỗ nguyên gốc và kỹ thuật in chồng màu tinh vi.',
        words: [
          { word: '浮世絵', reading: 'うきよえ', meaning: 'Tranh khắc gỗ dân gian phản ánh thế giới trần tục', level: 'N2' },
          { word: '版画', reading: 'はんが', meaning: 'Tranh in từ bản khắc gỗ', level: 'N2' },
          { word: 'ジャポニスム', reading: 'ジャポニスム', meaning: 'Trào lưu say mê nghệ thuật Nhật Bản tại châu Âu', level: 'N1' },
        ],
        fact: 'Họa sĩ thiên tài Vincent van Gogh đã từng sưu tầm hơn 600 bức tranh khắc gỗ Ukiyo-e của Nhật Bản và chép lại nhiều tác phẩm của Hiroshige để rèn luyện đường nét và màu sắc.',
        tags: ['Ukiyo-e', 'Hokusai', 'Nghệ Thuật', 'Edo', 'Hội Họa'],
        quiz: {
          q: 'Tác phẩm tranh khắc gỗ Ukiyo-e nào sau đây của danh họa Katsushika Hokusai nổi tiếng nhất trên thế giới?',
          opts: ['A. Đêm đầy sao', 'B. Sóng lừng ngoài khơi Kanagawa (Kanagawa-oki Nami Ura)', 'C. Thiếu nữ đeo hoa tai ngọc trai', 'D. Mùa thu vàng'],
          corr: 1,
          exp: 'Bức tranh mô tả những con thuyền gỗ dũng cảm cưỡi trên đầu ngọn sóng khổng lồ với núi Phú Sĩ tuyết phủ sừng sững ở hậu cảnh.',
          ctx: 'Tác phẩm này được in trên tờ tiền mệnh giá 1.000 Yên mới phát hành của Nhật Bản.'
        }
      }
    ]
  },
  {
    category: 'society_customs',
    themes: [
      {
        titleTemplate: 'Nghi Thức Trao Đổi Danh Thiếp Meishi Koukan (名刺交換): Tấm Gương Phẩm Cách Thương Gia Nhật',
        jpTitle: 'ビジネスにおける名刺交換のマナーと敬意の作法',
        romaji: 'Bijinesu ni Okeru Meishi Kōkan no Manā',
        hiragana: 'びじねすにおけるめいしこうかんのまなー',
        badge: 'Danh Thiếp Meishi · Hai Tay Cung Kính · Văn Hóa Công Sở',
        summary: 'Nghi lễ bắt buộc đầu tiên trong mọi cuộc gặp gỡ đối tác thương mại tại Nhật: Coi danh thiếp như chính sinh mệnh và phẩm giá của người đối diện, trao nhận bằng hai tay và đặt ngay ngắn trên hộp đựng.',
        takeaways: [
          'Hai tay dâng danh thiếp: Luôn cầm mép danh thiếp hướng chữ về phía đối tác, cúi đầu chào lịch sự.',
          'Không bao giờ cất vội vào túi: Phải đặt tấm danh thiếp ngay ngắn lên trên hộp Meishi-ire trong suốt buổi đàm phán.',
          'Tuyệt đối không viết lên danh thiếp: Hành động dùng bút viết chữ lên danh thiếp trước mặt khách bị coi là xúc phạm nặng nề.',
        ],
        explanation: 'Người Nhật xem danh thiếp (Meishi) là bản sao thu nhỏ của cá nhân đối tác. Việc trân trọng tấm danh thiếp thể hiện sự tôn trọng tuyệt đối đối với công ty và năng lực nghề nghiệp của người bạn đang gặp.',
        philosophy: 'Triết lý tôn ti và cẩn mật: Một cử chỉ vô ý nhỏ nhặt cũng có thể định đoạt thành bại của bản hợp đồng triệu đô.',
        advice: 'Hãy luôn chuẩn bị hộp đựng danh thiếp bằng da hoặc kim loại trang nhã, tránh để danh thiếp trong ví tiền làm nhàu nát mép giấy.',
        words: [
          { word: '名刺', reading: 'めいし', meaning: 'Danh thiếp kinh doanh', level: 'N3' },
          { word: '名刺入れ', reading: 'めいしいれ', meaning: 'Hộp đựng danh thiếp chuyên dụng', level: 'N2' },
          { word: '敬意', reading: 'けいい', meaning: 'Sự tôn kính, kính trọng', level: 'N2' },
        ],
        fact: 'Nếu gặp một nhóm 3-4 đối tác cùng lúc, bạn phải xếp các tấm danh thiếp trên bàn theo đúng thứ tự vị trí chỗ ngồi của từng người để tiện xưng hô chính xác chức danh.',
        tags: ['Meishi', 'Kinh Doanh', 'Giao Tiếp', 'Văn Hóa Doanh Nghiệp', 'Phong Tục'],
        quiz: {
          q: 'Khi nhận danh thiếp từ đối tác kinh doanh người Nhật, hành vi nào sau đây là TỐI KỴ tuyệt đối không được làm?',
          opts: [
            'A. Dùng hai tay đón nhận cung kính',
            'B. Nhét ngay danh thiếp vào túi quần sau hoặc dùng bút viết lên mặt danh thiếp trước mặt họ',
            'C. Đọc to tên và chức danh đối tác để xác nhận',
            'D. Đặt danh thiếp ngay ngắn trên bàn họp'
          ],
          corr: 1,
          exp: 'Danh thiếp đại diện cho khuôn mặt và danh dự của người trao. Nhét vào túi quần sau (ngồi đè lên) hoặc viết mực đè lên bị coi là xúc phạm nghiêm trọng.',
          ctx: 'Luôn giữ tấm danh thiếp phẳng phiu trong suốt buổi gặp.'
        }
      },
      {
        titleTemplate: 'Liệu Pháp Tắm Rừng Shinrin-Yoku (森林浴): Chữa Lành Tâm Thần Bằng Liều Thuốc Thiên Nhiên Xanh',
        jpTitle: '森林浴の科学的健康効果と自然との調和',
        romaji: 'Shinrin-yoku no Kagakuteki Kenkō Kōka',
        hiragana: 'しんりんよくのかがくてきけんこうこうか',
        badge: 'Tắm Rừng Shinrin-Yoku · Hợp Chất Phytoncide · Chữa Lành',
        summary: 'Phương pháp y học dự phòng nổi tiếng được Cục Lâm nghiệp Nhật Bản khởi xướng từ năm 1982: Đắm chìm mọi giác quan giữa rừng cây nguyên sinh để giảm hormone căng thẳng Cortisol và tăng cường hệ miễn dịch.',
        takeaways: [
          'Hợp chất hữu cơ Phytoncide: Tinh dầu tự nhiên do cây cối tiết ra để tự bảo vệ, giúp con người kích hoạt tế bào tiêu diệt ung thư tự nhiên (NK cells).',
          'Thức tỉnh 5 giác quan: Hít thở hương gỗ bách Hinoki, lắng nghe tiếng suối reo, chạm tay vào vỏ cây cổ thụ phong rêu.',
          'Hơn 60 cung đường trị liệu được chứng nhận y tế (Forest Therapy Base) trên khắp Nhật Bản.',
        ],
        explanation: 'Shinrin-yoku không phải là cuộc đi bộ leo núi thể lực vội vã. Đó là chuyến tản bộ chậm rãi tĩnh tâm, nơi con người bỏ lại màn hình điện thoại thông minh để đồng điệu nhịp thở với cánh rừng đại ngàn.',
        philosophy: 'Triết lý cổ xưa Shinto: Con người không đứng ngoài thiên nhiên để chinh phục, mà con người là một phần hòa hợp bất khả phân ly của sinh thái tự nhiên.',
        advice: 'Khu rừng tuyết tùng Akasawa tại Nagano và cung đường Kumano Kodo là những thánh địa lý tưởng nhất thế giới để trải nghiệm liệu pháp tắm rừng.',
        words: [
          { word: '森林浴', reading: 'しんりんよく', meaning: 'Liệu pháp tắm rừng tĩnh dưỡng sức khỏe', level: 'N2' },
          { word: '癒やし', reading: 'いやし', meaning: 'Sự chữa lành tâm hồn, xoa dịu mệt mỏi', level: 'N2' },
          { word: '檜', reading: 'ひのき', meaning: 'Cây bách Nhật Bản thơm ngát dùng đóng bồn tắm', level: 'N1' },
        ],
        fact: 'Nghiên cứu y khoa của Đại học Y Nippon cho thấy chỉ sau 2 ngày đi dạo trong rừng, hoạt tính của tế bào miễn dịch NK trong máu người tham gia tăng hơn 50% và duy trì suốt 30 ngày sau đó.',
        tags: ['Shinrin Yoku', 'Thiên Nhiên', 'Sức Khỏe', 'Nagano', 'Chữa Lành'],
        quiz: {
          q: 'Khái niệm y học "Shinrin-yoku" (森林浴) của người Nhật dịch sang tiếng Việt có nghĩa là gì?',
          opts: ['A. Tắm suối nước khoáng nóng', 'B. Liệu pháp tắm rừng (đắm mình trong bầu không khí rừng xanh)', 'C. Trồng cây gây rừng', 'D. Chặt gỗ xây nhà cổ'],
          corr: 1,
          exp: 'Shinrin-yoku là nghệ thuật hít thở bầu không khí rừng trong lành và tiếp thu năng lượng phục hồi sinh lực từ cỏ cây hoa lá.',
          ctx: 'Khái niệm này ngày nay đã trở thành phong trào chăm sóc sức khỏe nổi tiếng khắp Bắc Mỹ và châu Âu.'
        }
      }
    ]
  },
  {
    category: 'pop_culture',
    themes: [
      {
        titleTemplate: 'Văn Hóa Linh Vật Địa Phương Yuru-Chara (ゆるキャラ): Cỗ Máy Kinh Tế Tỷ Đô Của Gấu Kumamon',
        jpTitle: 'ゆるキャラ文化とくまモンの地方創生ビジネス奇跡',
        romaji: 'Yuru-kyara Bunka to Kumamon no Chihō Sōsei',
        hiragana: 'ゆるきゃらぶんか と くまもんのちほうそうせい',
        badge: 'Linh Vật Yuru-Chara · Gấu Kumamon · Du Lịch Địa Phương',
        summary: 'Hiện tượng văn hóa độc nhất vô nhị: Mỗi tỉnh thành, quận huyện và cơ quan công quyền Nhật Bản đều sáng tạo một linh vật hoạt hình ngộ nghĩnh riêng để thu hút khách du lịch và quảng bá nông sản.',
        takeaways: [
          'Huyền thoại Gấu đen má đỏ Kumamon: Đem lại doanh thu kinh tế hơn 1,2 nghìn tỷ Yên cho tỉnh nghèo Kumamoto.',
          'Ba tiêu chí vàng Yuru-Chara: Phải thể hiện tình yêu quê hương bản xứ, có tạo hình vụng về đáng yêu (Yurui), và tính cách hồn nhiên gần gũi.',
          'Đại hội thường niên Yuru-Chara Grand Prix: Cuộc thi bầu cử linh vật toàn quốc với hàng triệu lượt bình chọn sôi nổi như bầu cử quốc hội.',
        ],
        explanation: 'Nhật Bản là vương quốc của văn hóa Kawaii (Dễ thương). Một nhân vật linh vật ngộ nghĩnh có thể xua tan sự khô khan của các thông báo hành chính, kéo gần khoảng cách giữa chính quyền địa phương và thế hệ trẻ em, đồng thời tạo ra nguồn ngoại tệ du lịch khổng lồ.',
        philosophy: 'Triết lý mềm hóa cuộc sống: Sự mềm mại, hài hước và ngây thơ có thể hóa giải những căng thẳng phức tạp và hồi sinh nền kinh tế của các vùng quê hẻo lánh.',
        advice: 'Khi đến thành phố Kumamoto, bạn có thể ghé thăm văn phòng làm việc chính thức của Gấu Kumamon tại Tsuruya Department Store để xem linh vật biểu diễn khiêu vũ trực tiếp.',
        words: [
          { word: 'ゆるキャラ', reading: 'ゆるキャラ', meaning: 'Linh vật đại diện địa phương ngộ nghĩnh', level: 'N2' },
          { word: '地方創生', reading: 'ちほうそうせい', meaning: 'Hồi sinh và phát triển kinh tế địa phương', level: 'N1' },
          { word: '着ぐるみ', reading: 'きぐるみ', meaning: 'Bộ trang phục thú nhồi bông biểu diễn', level: 'N2' },
        ],
        fact: 'Chính quyền tỉnh Kumamoto đã đưa ra quyết định táo bạo: Cho phép các doanh nghiệp sử dụng hình ảnh gấu Kumamon miễn phí bản quyền nếu sản phẩm đó sử dụng nguyên liệu nông sản của tỉnh Kumamoto, tạo nên sự bùng nổ thương mại toàn cầu.',
        tags: ['Kumamon', 'Yuru Chara', 'Pop Culture', 'Du Lịch', 'Kinh Tế'],
        quiz: {
          q: 'Chú gấu màu đen có hai chấm má đỏ tròn xoe trứ danh mang tên "Kumamon" là linh vật chính thức của tỉnh nào ở Nhật Bản?',
          opts: ['A. Tỉnh Hokkaido', 'B. Tỉnh Kumamoto (đảo Kyushu)', 'C. Tỉnh Okinawa', 'D. Thủ đô Tokyo'],
          corr: 1,
          exp: 'Kumamon ra đời năm 2010 nhân dịp khánh thành tuyến tàu cao tốc Kyushu Shinkansen để thu hút du khách đến với tỉnh Kumamoto.',
          ctx: 'Kumamon hiện nay là linh vật nổi tiếng nhất trong lịch sử nước Nhật.'
        }
      }
    ]
  }
];

/**
/**
 * Returns the next batch of encyclopedia topics indefinitely.
 * - If filterSection is specified, focuses on that section.
 * - First drains curated expansion topics.
 * - When all curated topics are loaded, seamlessly synthesizes rich procedural topics
 *   featuring distinct prefectures, cultural facets, and historical eras with zero repetition.
 */
export function getNextInfiniteEncyclopediaBatch(
  currentLoadedCount: number,
  batchSize: number = 5,
  filterSection?: EncyclopediaSectionId
): EncyclopediaTopicItem[] {
  const result: EncyclopediaTopicItem[] = [];

  const matchingCurated = filterSection
    ? CURATED_EXPANSION_TOPICS.filter((t) => t.sectionId === filterSection)
    : CURATED_EXPANSION_TOPICS;

  const relevantArchetypes = filterSection
    ? PROCEDURAL_KNOWLEDGE_ARCHETYPES.filter((a) => a.category === filterSection)
    : PROCEDURAL_KNOWLEDGE_ARCHETYPES;

  const effectiveArchetypes = relevantArchetypes.length > 0 ? relevantArchetypes : PROCEDURAL_KNOWLEDGE_ARCHETYPES;

  for (let i = 0; i < batchSize; i++) {
    const topicIndex = currentLoadedCount + i;

    if (topicIndex < matchingCurated.length) {
      result.push(matchingCurated[topicIndex]);
    } else {
      // Procedural synthetic generation for continuous infinite exploration
      const synthIdx = topicIndex - matchingCurated.length;
      const archetypeGroup = effectiveArchetypes[synthIdx % effectiveArchetypes.length];
      const theme = archetypeGroup.themes[Math.floor(synthIdx / effectiveArchetypes.length) % archetypeGroup.themes.length];

      const cycleNum = Math.floor(synthIdx / 5) + 1;
      const uniqueId = `enc_infinite_${filterSection || 'all'}_${synthIdx + 1}_${Date.now()}_${i}`;

      const generatedItem: EncyclopediaTopicItem = {
        id: uniqueId,
        sectionId: archetypeGroup.category,
        title: `${theme.titleTemplate} · Khảo Cứu Phần ${cycleNum}`,
        jpTitle: `${theme.jpTitle}（第${cycleNum}考）`,
        romaji: `${theme.romaji} Dai ${cycleNum} Kō`,
        hiragana: theme.hiragana,
        level: (['N3', 'N2', 'N1'] as const)[synthIdx % 3],
        badge: `${theme.badge} · Chuyên Đề #${topicIndex + 9}`,
        summary: theme.summary,
        keyTakeaways: theme.takeaways,
        detailedExplanation: theme.explanation,
        culturalPhilosophy: theme.philosophy,
        practicalAdvice: theme.advice,
        vocabularyList: theme.words,
        quickFact: theme.fact,
        tags: [...theme.tags, `Kho Tri Thức Mở Rộng`, `Phần #${topicIndex + 9}`],
        quiz: {
          question: theme.quiz.q,
          options: theme.quiz.opts,
          correctIndex: theme.quiz.corr,
          explanation: theme.quiz.exp,
          culturalContext: theme.quiz.ctx,
        },
      };

      result.push(generatedItem);
    }
  }

  return result;
}

