import { JLPTLevel } from '../types';

export type IdiomCategoryType = 'all' | 'kotowaza' | 'yojijukugo' | 'koji_seigo' | 'kanyouku';

export interface IdiomDialogueExample {
  speakerA: string;
  speakerAJp: string;
  speakerARomaji: string;
  speakerAVn: string;
  speakerB: string;
  speakerBJp: string;
  speakerBRomaji: string;
  speakerBVn: string;
}

export interface IllustratedIdiomItem {
  id: string;
  idiom: string; // Kanji / Script form
  reading: string; // Hiragana with furigana hints
  romaji: string;
  hanViet: string;
  type: 'kotowaza' | 'yojijukugo' | 'koji_seigo' | 'kanyouku';
  typeName: string; // Tục ngữ dân gian / Tứ tự thành ngữ / Điển tích điển cố / Quán dụng ngữ
  charCount: number; // Không giới hạn số chữ
  jlptLevel: JLPTLevel;
  theme: string; // Ý chí & Kiên trì, Ứng xử nhân sinh, Trí tuệ ngụ ngôn, v.v.
  literalMeaning: string; // Nghĩa đen cụ thể
  figurativeMeaning: string; // Nghĩa bóng / Hàm ý thâm thúy
  vietnameseEquivalent: string; // Thành ngữ / Tục ngữ tiếng Việt tương đương
  originStory: {
    title: string;
    sourceEra: string; // e.g. "Cổ tích dân gian Edo", "Trang Tử · Thu Thủy Thiên", "Chiến Quốc Sách", "Thiền Tông Nhật Bản", v.v.
    narrative: string; // Câu chuyện kể gốc chi tiết, sinh động, dễ nhớ
    moralTakeaway: string; // Bài học triết lý sâu xa
  };
  usageGuide: {
    context: string; // Khi nào nên dùng, dùng với ai
    tone: 'khen ngợi' | 'tự răn mình' | 'khuyên bảo' | 'phê bình nhẹ' | 'an ủi động viên';
    culturalNote: string; // Văn hóa giao tiếp của người Nhật khi dùng câu này
    dialogue: IdiomDialogueExample;
  };
  illustration: {
    themeColor: string; // Tailwind color class or hex
    badgeText: string;
    caption: string; // Lời đề họa thơ mộng
    svgScene:
      | 'frog_well'
      | 'monkey_tree'
      | 'cat_coin'
      | 'daruma_fall'
      | 'tiger_cave'
      | 'rain_earth'
      | 'dango_flower'
      | 'kobo_brush'
      | 'tanuki_skin'
      | 'demon_iron'
      | 'stone_three_years'
      | 'under_floor_hero'
      | 'sleeping_on_brushwood'
      | 'one_life_one_meeting'
      | 'dust_mountain'
      | 'horse_ear_prayer'
      | 'crane_voice'
      | 'chestnut_fire'
      | 'moon_suppon'
      | 'early_bird'
      | 'three_arrows'
      | 'botamochi_shelf'
      | 'lake_biwa_round'
      | 'laughing_gate'
      | 'yielding_win'
      | string;
  };
}

export const ILLUSTRATED_JAPANESE_IDIOMS: IllustratedIdiomItem[] = [
  {
    id: 'idiom_1',
    idiom: '井の中の蛙大海を知らず',
    reading: 'い の なか の かわず たいかい を しらず',
    romaji: 'I no naka no kawazu taikai wo shirazu',
    hanViet: 'TỈNH CHI TRUNG OOA ĐẠI HẢI BẤT TRI',
    type: 'koji_seigo',
    typeName: 'Điển tích điển cố (8 chữ)',
    charCount: 8,
    jlptLevel: 'N3',
    theme: 'Trí tuệ ngụ ngôn',
    literalMeaning: 'Con ếch sống dưới đáy giếng cạn thì chẳng thể nào biết được sự mênh mông của biển cả.',
    figurativeMeaning: 'Ám chỉ người có tầm nhìn hạn hẹp, kiến thức nông cạn nhưng lại tự mãn, chỉ nhìn sự việc qua góc nhìn nhỏ bé của bản thân.',
    vietnameseEquivalent: 'Ếch ngồi đáy giếng / Coi trời bằng vung',
    originStory: {
      title: 'Điển tích Chú ếch giếng cạn & Rùa biển Đông Hải',
      sourceEra: 'Trang Tử · Thiên Thu Thủy (Nam Hoa Kinh)',
      narrative:
        'Một chú ếch sống vui sướng trong cái giếng cạn sụp mép. Chú tự hào nhảy nhót trên bờ gạch, bơi lội ngâm mình trong bùn nước và khoe khoang với một con rùa biển lớn từ biển Đông Hải đến ghé thăm: "Ngươi hãy nhìn xem, trong cái giếng này ta là chúa tể, không loài nào tự do sung sướng bằng ta!". Rùa biển mỉm cười bèn kể cho ếch nghe về Đông Hải: Biển rộng ngàn dặm không kể xiết, sâu muôn trượng không thể đo, dù gặp đại hạn mười năm nước không cạn, lũ lụt chín năm nước không dâng. Nghe xong sự bao la vô tận ấy, chú ếch kinh ngạc đến mức câm lặng, nhận ra khoảng trời tròn xoe trên miệng giếng bấy lâu nay của mình quá đỗi nhỏ bé.',
      moralTakeaway:
        'Biển học vô bờ, thế giới bao la. Càng học hỏi nhiều càng nhận ra mình nhỏ bé, giữ tâm thế khiêm nhường học hỏi suốt đời.',
    },
    usageGuide: {
      context: 'Dùng để tự răn bản thân không được tự cao, hoặc khuyên nhủ ai đó hãy bước ra thế giới rộng lớn để mở rộng tầm mắt.',
      tone: 'tự răn mình',
      culturalNote:
        'Người Nhật sau này đã sáng tác thêm vế sau đầy chất thơ cho câu thành ngữ này: 「されど空の深さ（青さ）を知る」 (Dẫu không biết biển khơi nhưng nó lại thấu hiểu trọn vẹn độ sâu thẳm của bầu trời xanh), mang ý nghĩa tôn trọng người chuyên tâm sâu sắc vào một lĩnh vực duy nhất.',
      dialogue: {
        speakerA: 'Tanaka',
        speakerAJp: '社内コンテストで優勝したからって、もう勉強しなくていいと思っていませんか？',
        speakerARomaji: 'Shanai kontesuto de yuushou shita kara tte, mou benkyou shinakute ii to omotte imasen ka?',
        speakerAVn: 'Chỉ vì đạt giải nhất cuộc thi nội bộ công ty mà cậu nghĩ mình không cần học thêm nữa sao?',
        speakerB: 'Kenji',
        speakerBJp: 'ご指摘ありがとうございます。まさに「井の中の蛙大海を知らず」でした。世界基準を目指して精進します。',
        speakerBRomaji: 'Goshiteki arigatou gozaimasu. Masa ni "i no naka no kawazu taikai wo shirazu" deshita. Sekai kijun wo mezashite shoujin shimasu.',
        speakerBVn: 'Cảm ơn anh đã nhắc nhở! Đúng là em đã mắc bẫy ếch ngồi đáy giếng rồi. Em sẽ nỗ lực hướng tới tiêu chuẩn toàn cầu.',
      },
    },
    illustration: {
      themeColor: 'emerald',
      badgeText: 'Ngụ ngôn kinh điển',
      caption: 'Đáy giếng rêu phong ngước nhìn một góc trời xanh',
      svgScene: 'frog_well',
    },
  },
  {
    id: 'idiom_2',
    idiom: '猿も木から落ちる',
    reading: 'さる も き から おちる',
    romaji: 'Saru mo ki kara ochiru',
    hanViet: 'VIÊN MỘC TỰ LẠC',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (5 chữ)',
    charCount: 5,
    jlptLevel: 'N4',
    theme: 'Ứng xử nhân sinh',
    literalMeaning: 'Ngay cả loài khỉ leo trèo giỏi nhất cũng có lúc trượt chân ngã khỏi cành cây.',
    figurativeMeaning: 'Dù là bậc thầy, chuyên gia lão luyện trong nghề đến đâu thì cũng có lúc sơ suất hoặc phạm sai lầm bất ngờ. Nhân vô thập toàn.',
    vietnameseEquivalent: 'Thợ may ăn giẻ rách / Cao nhân tất hữu sơ suất / Bậc thầy cũng có lúc sảy tay',
    originStory: {
      title: 'Giai thoại loài linh trưởng rừng tuyết Edo',
      sourceEra: 'Tục ngữ dân gian Nhật Bản lưu truyền từ thời Muromachi',
      narrative:
        'Ở Nhật Bản từ thời xa xưa, loài khỉ đuôi đỏ tuyết (Nihonzaru) được coi là biểu tượng của sự nhanh nhẹn, khéo léo tuyệt đỉnh khi đu cành trên các vách núi hiểm trở. Dân làng thấy chúng thoăn thoắt chuyền cành trong sương mù tuyết trắng mà không hề trượt chân. Thế nhưng vào một buổi sáng băng giá, một chú khỉ đầu đàn dày dặn kinh nghiệm nhất vì quá tự tin búng người bắt cành phủ tuyết mềm đã trượt tay ngã nhào xuống bụi cỏ. Dân gian từ đó đúc kết nên câu tục ngữ để nhắc nhở con người: Sự khéo léo bẩm sinh và kinh nghiệm lâu năm không đồng nghĩa với sự bất khả chiến bại.',
      moralTakeaway:
        'Cẩn tắc vô áy náy. Khi càng giỏi giang và thành công, ta càng phải cẩn trọng từng chi tiết nhỏ nhất vì sơ suất thường xuất hiện từ sự chủ quan.',
    },
    usageGuide: {
      context: 'Dùng để an ủi một chuyên gia hoặc đồng nghiệp vừa mắc lỗi ngoài ý muốn, hoặc dùng để tự bào chữa một cách dí dỏm khi mình sơ suất.',
      tone: 'an ủi động viên',
      culturalNote:
        'Có hai câu thành ngữ đồng nghĩa rất phổ biến: 「弘法にも筆の誤り」(Kobo Daishi cũng có lúc viết sai nét) và 「河童の川流れ」(Thần nước Kappa cũng có ngày bị nước cuốn trôi).',
      dialogue: {
        speakerA: 'Yuki',
        speakerAJp: 'ベテランの佐藤部長がプレゼンの資料を忘れるなんて、信じられませんね。',
        speakerARomaji: 'Beteran no Satou-buchou ga purezen no shiryou wo wasureru nante, shinjiraremasen ne.',
        speakerAVn: 'Thật khó tin khi một người dày dạn như Trưởng phòng Sato lại quên mang tài liệu thuyết trình.',
        speakerB: 'Mai',
        speakerBJp: '「猿も木から落ちる」と言いますからね。誰にでもミスはありますよ。',
        speakerBRomaji: '"Saru mo ki kara ochiru" to iimasu kara ne. Dare ni demo misu wa arimasu yo.',
        speakerBVn: 'Người xưa bảo "khỉ cũng có lúc ngã cây" mà. Ai trên đời cũng có lúc sơ suất thôi cậu à.',
      },
    },
    illustration: {
      themeColor: 'amber',
      badgeText: 'Nhân vô thập toàn',
      caption: 'Cành thông chao nghiêng giữa rừng lá đỏ mùa thu',
      svgScene: 'monkey_tree',
    },
  },
  {
    id: 'idiom_3',
    idiom: '七転び八起き',
    reading: 'ななころび やおき',
    romaji: 'Nanakorobi yaoki',
    hanViet: 'THẤT CHUYỂN BÁT KHỞI',
    type: 'yojijukugo',
    typeName: 'Tứ tự thành ngữ (4 chữ)',
    charCount: 4,
    jlptLevel: 'N3',
    theme: 'Ý chí & Kiên trì',
    literalMeaning: 'Ngã xuống bảy lần thì nhất định phải đứng dậy tám lần.',
    figurativeMeaning: 'Ý chí kiên cường bất khuất, tinh thần quật khởi trước nghịch cảnh cuộc đời. Dù nếm trải bao thất bại đắng cay vẫn không gục ngã mà tiếp tục tiến lên.',
    vietnameseEquivalent: 'Thất bại là mẹ thành công / Ngã bảy lần đứng dậy tám lần',
    originStory: {
      title: 'Huyền thoại Búp bê Daruma & Bồ Đề Đạt Ma ngồi thiền',
      sourceEra: 'Triết lý Bồ Đề Đạt Ma (Bodicitta) & Nghệ thuật tạo hình Búp bê Okiagari-koboshi thời Edo',
      narrative:
        'Thành ngữ này gắn liền với hình tượng Thiền sư Bồ Đề Đạt Ma ngồi thiền diện bích 9 năm ròng tại chùa Thiếu Lâm. Do ngồi thiền bất động qua năm tháng, tay chân ngài dường như teo biến nhưng ý chí giác ngộ vẫn vững như bàn thạch. Người Nhật từ đó chế tác ra búp bê Daruma không chân không tay, phần đáy gắn chì nặng. Dù bạn có đẩy ngã sang hướng nào, búp bê cũng tự động bật dậy ngay lập tức. Số 8 tượng trưng cho việc: Bạn sinh ra trên đời đã đứng sẵn (lần 1), sau đó ngã 7 lần thì phải đứng dậy đủ 7 lần nữa, tổng cộng là 8 lần đứng hiên ngang.',
      moralTakeaway:
        'Thước đo giá trị của một người không phải là số lần họ chưa từng vấp ngã, mà là tốc độ và sự kiên trì đứng dậy sau mỗi lần thất bại.',
    },
    usageGuide: {
      context: 'Dùng để khích lệ bản thân và người khác khi đối mặt với kỳ thi khó khăn, khởi nghiệp thử thách hoặc phục hồi sau nghịch cảnh.',
      tone: 'khen ngợi',
      culturalNote:
        'Vào dịp năm mới ở Nhật, người ta thường mua búp bê Daruma chưa vẽ mắt. Khi ước một mục tiêu lớn, họ vẽ con mắt bên trái. Khi mục tiêu hoàn thành sau ngàn lần nỗ lực, họ mới vẽ nốt con mắt bên phải.',
      dialogue: {
        speakerA: 'Kaito',
        speakerAJp: 'JLPT N1 trượt hai lần rồi, tớ thấy nản lòng quá cậu ạ.',
        speakerARomaji: 'JLPT N1 tsuite futatabi ochite, mou nankai mo kujikesou da yo.',
        speakerAVn: 'Tớ thi trượt JLPT N1 hai lần rồi, cảm thấy nản lòng muốn bỏ cuộc quá.',
        speakerB: 'Haruto',
        speakerBJp: '諦めるな！「七転び八起き」の精神で、三度目の正直を掴み取ろう！',
        speakerBRomaji: 'Akirameru na! "Nanakorobi yaoki" no seishin de, sandome no shoujiki wo tsukamitorou!',
        speakerBVn: 'Đừng bỏ cuộc! Hãy phát huy tinh thần "Ngã bảy lần đứng dậy tám lần", lần thứ ba nhất định sẽ thành công rực rỡ!',
      },
    },
    illustration: {
      themeColor: 'rose',
      badgeText: 'Ý chí bất khuất',
      caption: 'Búp bê Daruma sơn đỏ nghiêng mình rồi lại bật dậy kiên cường',
      svgScene: 'daruma_fall',
    },
  },
  {
    id: 'idiom_4',
    idiom: '猫に小判',
    reading: 'ねこ に こばん',
    romaji: 'Neko ni koban',
    hanViet: 'MIÊU NHỊ TIỂU PHÁN',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (4 chữ)',
    charCount: 4,
    jlptLevel: 'N3',
    theme: 'Trí tuệ ngụ ngôn',
    literalMeaning: 'Đưa đồng tiền vàng Koban quý giá cho con mèo xem.',
    figurativeMeaning: 'Trao đồ quý giá, lời khuyên thông thái hoặc cơ hội ngàn vàng cho kẻ không có khả năng hiểu biết hoặc không biết trân trọng giá trị đích thực.',
    vietnameseEquivalent: 'Đàn gảy tai trâu / Mua trâu vẽ bóng / Ném ngọc trước mũi lợn',
    originStory: {
      title: 'Đồng tiền vàng Koban thời Mạc phủ Tokugawa',
      sourceEra: 'Tục ngữ dân gian thời kỳ Edo (Thế kỷ 17)',
      narrative:
        'Thời Edo, "Koban" (tiểu phán) là đồng tiền đúc bằng vàng ròng hình bầu dục, có giá trị cực kỳ lớn, một đồng có thể nuôi sống một gia đình thường dân suốt cả tháng. Thế nhưng nếu bạn ném đồng Koban vàng óng ả ấy trước mặt một chú mèo tam thể, chú mèo chỉ ngửi ngửi một cái rồi thản nhiên quay lưng bỏ đi. Với con mèo, một con cá khô héo hon còn có giá trị hơn cả mười thỏi vàng ròng chói lọi.',
      moralTakeaway:
        'Giá trị của sự vật chỉ thực sự tỏa sáng khi nó nằm trong tay người có tri thức, sự thấu hiểu và lòng trân trọng.',
    },
    usageGuide: {
      context: 'Dùng để phê bình việc lãng phí tài nguyên cao cấp cho người không biết dùng, hoặc tự trào khi mình được tặng món quà quá sang trọng mà bản thân không rành.',
      tone: 'phê bình nhẹ',
      culturalNote:
        'Hình tượng chú mèo thần tài Maneki Neko cầm đồng Koban sáng lấp lánh xuất phát từ câu tục ngữ này nhưng được biến tấu mang ý nghĩa may mắn tài lộc.',
      dialogue: {
        speakerA: 'Hoa',
        speakerAJp: 'Tớ vừa mua máy pha cà phê chuyên nghiệp 50 triệu nhưng toàn để xó bụi bặm.',
        speakerARomaji: 'Watashi wa gojuuman-en no puro-shiyou koohii mashin wo katta kedo, zutto houki shiteru.',
        speakerAVn: 'Tớ vừa mua máy pha cà phê chuyên nghiệp 50 triệu nhưng toàn để xó bám bụi.',
        speakerB: 'Linh',
        speakerBJp: '初心者なのにそんな高価な機械を買うなんて、まさに「猫に小判」ね！',
        speakerBRomaji: 'Shoshinsha nano ni sonna kouka na kikai wo kau nante, masa ni "neko ni koban" ne!',
        speakerBVn: 'Người mới nhập môn mà sắm đồ đắt tiền thế đúng là "ném tiền vàng cho mèo" rồi cậu ơi!',
      },
    },
    illustration: {
      themeColor: 'yellow',
      badgeText: 'Trí tuệ ngụ ngôn',
      caption: 'Chú mèo tam thể thản nhiên bên thỏi vàng Koban lấp lánh',
      svgScene: 'cat_coin',
    },
  },
  {
    id: 'idiom_5',
    idiom: '一期一会',
    reading: 'いちご いちえ',
    romaji: 'Ichigo ichie',
    hanViet: 'NHẤT KỲ NHẤT HỘI',
    type: 'yojijukugo',
    typeName: 'Tứ tự thành ngữ (4 chữ)',
    charCount: 4,
    jlptLevel: 'N2',
    theme: 'Cơ duyên & Tình cảm',
    literalMeaning: 'Trong cả một đời người chỉ có duy nhất một lần gặp gỡ này.',
    figurativeMeaning: 'Hãy đối đãi với mỗi cuộc gặp gỡ, mỗi phút giây bên cạnh người khác bằng tất cả sự chân thành, kính cẩn và trân quý, bởi vì khoảnh khắc ấy sẽ không bao giờ lặp lại lần thứ hai trong đời.',
    vietnameseEquivalent: 'Đời người chỉ gặp một lần / Cơ duyên ngàn năm có một',
    originStory: {
      title: 'Triết lý Trà đạo của Trà thánh Sen no Rikyu & Ii Naosuke',
      sourceEra: 'Trà đạo thời Chiến Quốc & Tác phẩm Trà Thang Nhất Tịch Thoại của Ii Naosuke',
      narrative:
        'Vào thời Chiến Quốc đầy biến động và loạn lạc, các võ sĩ Samurai sáng nay còn cùng nhau nâng chén trà nhưng chiều tối có thể ngã xuống trên chiến trường. Đại sư Trà thánh Sen no Rikyu đã răn dạy học trò: Khi chủ và khách bước vào phòng trà bốn chiếu rưỡi, dù ngày mai họ có gặp lại nhau thì tâm trạng, thời tiết, dòng nước pha trà và ngọn gió hôm nay cũng vĩnh viễn không quay trở lại. Hãy pha chén trà như thể đó là cơ hội duy nhất trong kiếp người để chiêu đãi người tri kỷ.',
      moralTakeaway:
        'Hiện tại là món quà thiêng liêng nhất. Sống trọn vẹn trong từng giây phút và biết ơn từng nhân duyên bước qua cuộc đời mình.',
    },
    usageGuide: {
      context: 'Dùng trong lễ tiệc, lời chào tạm biệt khách quý, triết lý kinh doanh ngành dịch vụ nhà hàng khách sạn (Omotenashi), hoặc tự nhủ trân trọng cuộc sống.',
      tone: 'khen ngợi',
      culturalNote:
        'Đây là một trong những thành ngữ được treo phổ biến nhất trong phòng trà (Chashitsu) và võ đường Karate, Kendo trên khắp nước Nhật.',
      dialogue: {
        speakerA: 'Mai',
        speakerAJp: '今日出会った旅先の方々、皆さん本当に親切にしてくれました。',
        speakerARomaji: 'Kyou deatta tabisaki no katagata, minasan hontou ni shinsetsu ni shite kuremashita.',
        speakerAVn: 'Những người bản xứ tớ gặp gỡ trong chuyến đi hôm nay ai nấy đều đối xử với tớ vô cùng tử tế và ấm áp.',
        speakerB: 'Sensei',
        speakerBJp: 'それが「一期一会」の心ですね。その温もりを大切に心に刻みなさい。',
        speakerBRomaji: 'Sore ga "ichigo ichie" no kokoro desu ne. Sono nukumori wo taisetsu ni kokoro ni kizaminasai.',
        speakerBVn: 'Đó chính là tinh thần "Nhất kỳ nhất hội" đấy em. Hãy trân quý và khắc sâu hơi ấm chân thành ấy vào tim.',
      },
    },
    illustration: {
      themeColor: 'purple',
      badgeText: 'Triết đạo ngàn năm',
      caption: 'Khói trà nghi ngút bên nhành hoa cúc trong tịnh thất Zen',
      svgScene: 'one_life_one_meeting',
    },
  },
  {
    id: 'idiom_6',
    idiom: '虎穴に入らずんば虎子を得ず',
    reading: 'こけつ に いらずんば こじ を えず',
    romaji: 'Koketsu ni irazumba koji wo ezu',
    hanViet: 'HỔ HUYỆT BẤT NHẬP HỔ TỬ BẤT ĐẮC',
    type: 'koji_seigo',
    typeName: 'Điển tích điển cố (12 chữ)',
    charCount: 12,
    jlptLevel: 'N1',
    theme: 'Ý chí & Kiên trì',
    literalMeaning: 'Nếu không dám dấn thân bước vào hang hùm thì làm sao có thể bắt được cọp con.',
    figurativeMeaning: 'Muốn gặt hái thành tựu vĩ đại hoặc chiến thắng phi thường thì buộc phải dũng cảm đương đầu với hiểm nguy, chấp nhận rủi ro và thử thách lớn.',
    vietnameseEquivalent: 'Không vào hang cọp sao bắt được cọp con / Liều ăn nhiều',
    originStory: {
      title: 'Hành động quả cảm của danh tướng Ban Siêu Tây Vực',
      sourceEra: 'Hậu Hán Thư · Ban Siêu Liệt Truyện (Đông Hán)',
      narrative:
        'Danh tướng Ban Siêu dẫn một đoàn sứ giả chỉ có 36 người sang nước Thiện Thiện ở Tây Vực. Ban đầu vua Thiện Thiện tiếp đãi nồng hậu, nhưng vài ngày sau đột ngột trở nên lạnh nhạt vì có đoàn sứ giả hung hãn của giặc Hung Nô kéo tới gây áp lực. Đứng trước tình thế ngàn cân treo sợi tóc, Ban Siêu triệu tập 36 thuộc hạ trong đêm và nói: "Không vào hang cọp sao bắt được cọp con. Đêm nay chúng ta hãy dùng lửa tập kích đốt trại quân Hung Nô, nếu không tất cả sẽ bị giết!". Nhờ tinh thần quả cảm ấy, 36 tráng sĩ đã đánh tan hàng trăm quân giặc, khiến vua Thiện Thiện quy phục triều đình.',
      moralTakeaway:
        'Sự nghiệp lớn luôn đi liền với rủi ro lớn. Người thành công là người có bản lĩnh vượt qua vùng an toàn để nắm bắt vận mệnh.',
    },
    usageGuide: {
      context: 'Dùng trong các quyết định kinh doanh táo bạo, đầu tư dự án mới hoặc khích lệ tinh thần dám nghĩ dám làm.',
      tone: 'khen ngợi',
      culturalNote:
        'Cấu trúc 「〜ずんば〜ず」(zumba... zu) là cấu trúc cổ biểu thị điều kiện giả định "Nếu không... thì không thể...", thường xuất hiện trong đề thi JLPT N1 đọc hiểu.',
      dialogue: {
        speakerA: 'Giám đốc',
        speakerAJp: '新市場への進出はリスクが高すぎると役員会で反対意見が出ています。',
        speakerARomaji: 'Shin-shijou e no shinshutsu wa risuku ga takasugiru to yakuinkai de hantai iken ga dete imasu.',
        speakerAVn: 'Hội đồng quản trị đang phản đối vì cho rằng thâm nhập thị trường mới tiềm ẩn rủi ro quá lớn.',
        speakerB: 'Tổng giám đốc',
        speakerBJp: '「虎穴に入らずんば虎子を得ず」だ。リスクを恐れていては我が社の成長はない！',
        speakerBRomaji: '"Koketsu ni irazumba koji wo ezu" da. Risuku wo osorete ite wa wagasha no seichou wa nai!',
        speakerBVn: 'Không vào hang cọp sao bắt được cọp con! Nếu cứ sợ rủi ro thì công ty chúng ta sẽ mãi dậm chân tại chỗ!',
      },
    },
    illustration: {
      themeColor: 'orange',
      badgeText: 'Dũng khí phi thường',
      caption: 'Hang hùm sâu thẳm giữa ánh trăng đại ngàn',
      svgScene: 'tiger_cave',
    },
  },
  {
    id: 'idiom_7',
    idiom: '雨降って地固まる',
    reading: 'あめ ふって じ かたまる',
    romaji: 'Ame futte ji katamaru',
    hanViet: 'VŨ GIÁNG ĐỊA CỐ',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (7 chữ)',
    charCount: 7,
    jlptLevel: 'N3',
    theme: 'Ứng xử nhân sinh',
    literalMeaning: 'Cơn mưa rào trút xuống làm cho nền đất cát trở nên nén chặt và vững chắc hơn trước.',
    figurativeMeaning: 'Sau khi trải qua xung đột, cãi vã hoặc nghịch cảnh giông bão, các mối quan hệ giữa con người lại càng thấu hiểu, gắn bó khăng khít và bền chặt hơn.',
    vietnameseEquivalent: 'Sau cơn mưa trời lại sáng / Trong cái rủi có cái may / Hết cơn bĩ cực đến hồi thái lai',
    originStory: {
      title: 'Triết lý xây dựng nền móng nhà cổ Nhật Bản',
      sourceEra: 'Tục ngữ nghề thợ xây & nông nghiệp truyền thống Nhật Bản',
      narrative:
        'Thời xưa khi người Nhật đào móng dựng cột nhà gỗ truyền thống (Minka), nền đất xốp thường dễ sụt lún. Các bậc thợ cả nhận thấy khi một cơn mưa rào lớn ập xuống cuốn trôi bùn nhão, hạt đất li ti lấp đầy kẽ hở, khi nắng lên nền đất ấy trở nên cứng như đá tảng. Dân gian mượn hình tượng tự nhiên này để răn dạy con cháu trong hôn nhân và tình bạn: Đừng sợ những bất đồng ý kiến, vì chính sau những cuộc tranh luận thẳng thắn, tình cảm đôi bên mới loại bỏ được sự gượng gạo Tatemae để đến với tiếng lòng chân thật Honne.',
      moralTakeaway:
        'Khủng hoảng là cơ hội để thanh lọc và củng cố niềm tin. Đừng sợ thử thách vì nó chính là chất keo tôi luyện nên sự vững bền.',
    },
    usageGuide: {
      context: 'Thường được dùng trong bài phát biểu đám cưới (lời chúc phúc vợ chồng vượt qua bất đồng), hoặc sau khi giải quyết xong xích mích giữa bạn bè, đồng nghiệp.',
      tone: 'an ủi động viên',
      culturalNote:
        'Trong các bài phát biểu tại tiệc cưới Nhật Bản, cụm từ này là lời chúc kinh điển của chủ hôn dành cho cô dâu chú rể.',
      dialogue: {
        speakerA: 'Ken',
        speakerAJp: '昨日あんなに激しくケンカしたのに、今日は二人が笑顔で肩を組んでるよ。',
        speakerARomaji: 'Kinou anna ni hageshiku kenka shita no ni, kyou wa futari ga egao de kata wo kunde ru yo.',
        speakerAVn: 'Hôm qua hai người họ cãi nhau nảy lửa thế mà hôm nay đã lại tươi cười khoác vai nhau rồi kìa.',
        speakerB: 'An',
        speakerBJp: '本音をぶつけ合えたからね。「雨降って地固まる」というわけさ。',
        speakerBRomaji: 'Honne wo butsukeaeta kara ne. "Ame futte ji katamaru" to iu wake sa.',
        speakerBVn: 'Nhờ vậy mà họ mới bộc bạch hết ruột gan đấy. Đúng là "sau cơn mưa trời lại sáng, đất thêm vững chắc" mà.',
      },
    },
    illustration: {
      themeColor: 'blue',
      badgeText: 'Hòa giải gắn kết',
      caption: 'Hạt mưa tí tách rơi trên nền sỏi đất thắm đượm màu xanh',
      svgScene: 'rain_earth',
    },
  },
  {
    id: 'idiom_8',
    idiom: '花より団子',
    reading: 'はな より だんご',
    romaji: 'Hana yori dango',
    hanViet: 'HOA NHĨ ĐOÀN TỬ',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (4 chữ)',
    charCount: 4,
    jlptLevel: 'N4',
    theme: 'Trí tuệ ngụ ngôn',
    literalMeaning: 'Thích ăn bánh trôi nếp Dango hơn là đứng ngắm hoa anh đào nở.',
    figurativeMeaning: 'Coi trọng giá trị thực tế, thiết thực (cơm áo gạo tiền, cái ăn cái bụng) hơn là vẻ đẹp hào nhoáng, lãng mạn bên ngoài. Lối sống thực tế, không chuộng hình thức suông.',
    vietnameseEquivalent: 'Thực tế hơn lãng mạn / Có thực mới vực được đạo',
    originStory: {
      title: 'Phong tục ngắm hoa Hanami thời kỳ Edo',
      sourceEra: 'Văn hóa ngắm hoa thời Edo (Tác phẩm Hán dịch tục ngữ ký)',
      narrative:
        'Vào thời Edo, Mạc phủ khuyến khích người dân đi ngắm hoa anh đào Hanami ở Ueno và Asakusa để giải tỏa căng thẳng. Rất nhiều tài tử giai nhân ăn vận lộng lẫy đứng thưởng hoa làm thơ phong nhã. Nhưng với những người dân lao động bình dân, niềm vui lớn nhất khi trải bạt dưới tán hoa không phải là nhìn cánh hoa rơi, mà là cùng gia đình thưởng thức những xiên bánh dango 3 màu dẻo thơm ngọt lịm quét tương ngọt. Câu nói dí dỏm "Hana yori dango" ra đời từ đó, vừa tự trào vừa khẳng định chân lý ngàn đời: Bụng có no thì tâm hồn mới thảnh thơi thưởng cảnh.',
      moralTakeaway:
        'Cái đẹp tinh thần cần đi đôi với sự đủ đầy vật chất. Biết cân bằng giữa lý tưởng lãng mạn và cuộc sống thực tế.',
    },
    usageGuide: {
      context: 'Dùng để đùa vui khi ai đó mải ăn uống tại một sự kiện sang trọng, hoặc tự trào sở thích thực tế của bản thân.',
      tone: 'phê bình nhẹ',
      culturalNote:
        'Xiên bánh Dango ba màu (Hanami Dango) tượng trưng cho mùa xuân: Hồng (hoa đào), Trắng (tuyết mùa đông tan) và Xanh (chồi non xanh mướt của mùa hạ sắp tới).',
      dialogue: {
        speakerA: 'Akiko',
        speakerAJp: '桜の木の下でポエムを詠むなんてロマンチックですね！',
        speakerARomaji: 'Sakura no ki no shita de poemu wo yomu nante romanchikku desu ne!',
        speakerAVn: 'Đứng dưới tán hoa anh đào ngâm thơ lãng mạn quá cậu nhỉ!',
        speakerB: 'Takeshi',
        speakerBJp: '僕は詩よりお重のお弁当に夢中だよ。まさに「花より団子」だね！',
        speakerBRomaji: 'Boku wa shi yori ojuu no obentou ni muchuu da yo. Masa ni "hana yori dango" da ne!',
        speakerBVn: 'Tớ thì chỉ mải mê ngắm hộp cơm bento đầy ắp gà rán thôi. Đúng là "có thực mới vực được đạo" mà!',
      },
    },
    illustration: {
      themeColor: 'pink',
      badgeText: 'Ẩm thực & Đời sống',
      caption: 'Xiên bánh Dango ba màu thơm dẻo dưới làn mưa hoa anh đào',
      svgScene: 'dango_flower',
    },
  },
  {
    id: 'idiom_9',
    idiom: '弘法筆を選ばず',
    reading: 'こうぼう ふで を えらばず',
    romaji: 'Koubou fude wo erabazu',
    hanViet: 'HOẰNG PHÁP BÚT BẤT TUYỂN',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (6 chữ)',
    charCount: 6,
    jlptLevel: 'N2',
    theme: 'Học tập & Rèn luyện',
    literalMeaning: 'Đại sư Hoằng Pháp (Kobo Daishi) viết thư pháp không bao giờ kén chọn cây bút.',
    figurativeMeaning: 'Người đã đạt tới đỉnh cao thực tài thì dù sử dụng bất kỳ công cụ bình thường nào cũng có thể tạo ra kiệt tác. Đừng đổ lỗi cho hoàn cảnh hay công cụ khi bản thân chưa đủ giỏi.',
    vietnameseEquivalent: 'Thợ giỏi không đổ lỗi cho dụng cụ / Khéo tay hay nghề',
    originStory: {
      title: 'Huyền thoại Thư pháp của Thiền sư Không Hải (Kūkai)',
      sourceEra: 'Giai thoại thời Heian về Đại sư Kobo Daishi (Không Hải)',
      narrative:
        'Thiền sư Không Hải (pháp hiệu Hoằng Pháp Đại Sư) là một trong "Tam Bút" vĩ đại nhất lịch sử thư pháp Nhật Bản. Tương truyền Thiên hoàng Saga từng nhờ ngài viết đại tự trên cổng đền lớn. Khi người hầu mang đến những cây bút lông cũ kỹ cùn rỉ, các quan lại lo sợ ngài sẽ từ chối. Nhưng ngài mỉm cười cầm lấy cây bút thô ráp nhất, vung tay thoăn thoắt tạo nên những nét chữ rồng bay phượng múa khiến muôn người thán phục. Ngài dạy rằng: Cái đẹp của chữ nằm ở nội lực của người cầm bút, không nằm ở lông thỏ hay cán ngà.',
      moralTakeaway:
        'Nâng cao thực lực nội tại thay vì phụ thuộc vào thiết bị đắt tiền. Chuyên môn sâu sắc sẽ biến công cụ tầm thường thành kỳ tích.',
    },
    usageGuide: {
      context: 'Dùng để khen ngợi kỹ năng điêu luyện của người khác, hoặc nhắc nhở bản thân ngừng đổ lỗi cho thiết bị khi kết quả chưa tốt.',
      tone: 'khen ngợi',
      culturalNote:
        'Cũng có câu tục ngữ ngược lại đầy tính nhân văn: 「弘法にも筆の誤り」(Kobo Daishi cũng có lúc sảy tay viết nhầm nét) để an ủi khi người giỏi mắc sai sót.',
      dialogue: {
        speakerA: 'Học viên',
        speakerAJp: '先生、もっと高いプロ用の包丁を買わないと、魚が綺麗に捌けません。',
        speakerARomaji: 'Sensei, motto takai puro-shiyou no houchou wo kawanai to, sakana ga kirei ni sabakemasen.',
        speakerAVn: 'Thầy ơi, chắc em phải mua con dao làm bếp đắt tiền chuyên nghiệp thì mới thái cá đẹp được ạ.',
        speakerB: 'Bếp trưởng',
        speakerBJp: '「弘法筆を選ばず」だぞ。道具のせいにする前に、まずは刃筋の通し方を身につけなさい。',
        speakerBRomaji: '"Koubou fude wo erabazu" da zo. Dougu no sei ni suru mae ni, mazu wa hasuji no tooshikata wo mi ni tsukenasai.',
        speakerBVn: 'Thợ giỏi không kén dụng cụ đâu con! Trước khi đổ lỗi cho dao, hãy luyện chuẩn đường cắt của cổ tay đã!',
      },
    },
    illustration: {
      themeColor: 'indigo',
      badgeText: 'Nghệ thuật đỉnh cao',
      caption: 'Bút lông mực tàu vung nét chữ bay bổng trên giấy xuyến chỉ',
      svgScene: 'kobo_brush',
    },
  },
  {
    id: 'idiom_10',
    idiom: '捕らぬ狸の皮算用',
    reading: 'とらぬ たぬき の かわざんよう',
    romaji: 'Toranu tanuki no kawazanyou',
    hanViet: 'BỐ BẤT THƯ KI DIỆC TOÁN DỤNG',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (9 chữ)',
    charCount: 9,
    jlptLevel: 'N2',
    theme: 'Cảnh báo & Răn mình',
    literalMeaning: 'Chưa bẫy được con lửng (Tanuki) mà đã ngồi tính xem bán bộ da của nó được bao nhiêu tiền.',
    figurativeMeaning: 'Vội vàng tính toán lợi nhuận, chia phần thưởng khi sự việc còn chưa thành, tương lai chưa có gì chắc chắn. Sự lạc quan tếu, ảo tưởng hão huyền.',
    vietnameseEquivalent: 'Chưa đỗ ông nghè đã đe hàng tổng / Đếm cua trong lỗ',
    originStory: {
      title: 'Câu chuyện người thợ săn và bộ lông gấu mèo Tanuki',
      sourceEra: 'Truyện ngụ ngôn dân gian Nhật Bản thời Edo',
      narrative:
        'Xưa kia ở vùng núi tuyết, lông của loài gấu mèo Tanuki rất dày và ấm, được thương lái thành thị mua với giá cao để may áo choàng quý tộc. Một người thợ săn nghèo nhìn thấy bóng dáng chú Tanuki thoắt ẩn thoắt hiện trong lùm cây. Chưa kịp giương cung bắn, anh ta đã ngồi mơ mộng: "Nếu bắt được con này, bán da lấy 10 ryo vàng, ta sẽ mua gạo, cất nhà ngói, cưới vợ đẹp!". Trong lúc anh ta mải mê lẩm bẩm tính toán thì chú Tanuki tinh quái đã lẳng lặng chuồn mất dạng từ lúc nào.',
      moralTakeaway:
        'Hãy tập trung làm tốt từng bước ở hiện tại trước khi mơ mộng thành quả. Hành động cụ thể có giá trị hơn ngàn kế hoạch trên giấy.',
    },
    usageGuide: {
      context: 'Dùng để cảnh báo người khác đừng vội ăn mừng hoặc chi tiêu số tiền chưa thực sự cầm trên tay.',
      tone: 'phê bình nhẹ',
      culturalNote:
        'Người Nhật thường nói tắt câu này thành một từ ngắn gọn rất phổ biến: 「皮算用」(Kawazanyou - Tính toán da thú, nghĩa là tính cua trong lỗ).',
      dialogue: {
        speakerA: 'Tú',
        speakerAJp: 'Nếu dự án này thắng thầu, tớ sẽ trích thưởng mua ngay chiếc xe mui trần!',
        speakerARomaji: 'Kono purojekuto ga juuchuu dekitara, boonasu de oopunkaa wo kau n da!',
        speakerAVn: 'Nếu dự án này mà thắng thầu, tớ sẽ trích thưởng tậu ngay chiếc xe mui trần đi chơi!',
        speakerB: 'Minh',
        speakerBJp: 'まだ提案書を出したばかりだよ。「捕らぬ狸の皮算用」にならないように、まずはプレゼンに集中しよう。',
        speakerBRomaji: 'Mada teiansho wo dashita bakari da yo. "Toranu tanuki no kawazanyou" ni naranai you ni, mazu wa purezen ni shuuchuu shiyou.',
        speakerBVn: 'Còn chưa nộp xong bản chào thầu mà cậu ơi! Đừng "đếm cua trong lỗ", hãy tập trung thuyết trình cho thật tốt đã.',
      },
    },
    illustration: {
      themeColor: 'teal',
      badgeText: 'Cảnh tỉnh ngụ ngôn',
      caption: 'Chú Tanuki tinh quái biến hình bên chum rượu lá sen',
      svgScene: 'tanuki_skin',
    },
  },
  {
    id: 'idiom_11',
    idiom: '鬼に金棒',
    reading: 'おに に かなぼう',
    romaji: 'Oni ni kanabou',
    hanViet: 'QUỶ NHỊ KIM BỔNG',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (4 chữ)',
    charCount: 4,
    jlptLevel: 'N3',
    theme: 'Sức mạnh & Hợp tác',
    literalMeaning: 'Trao thêm cây gậy sắt đinh nhọn cho quỷ dữ Oni vốn dĩ đã vô cùng khỏe mạnh.',
    figurativeMeaning: 'Kẻ mạnh, người tài vốn đã xuất chúng lại được trang bị thêm công cụ đắc lực hoặc đồng đội xuất sắc, trở nên vô địch bất khả chiến bại.',
    vietnameseEquivalent: 'Hổ mọc thêm cánh / Như rồng thêm vây',
    originStory: {
      title: 'Hình tượng yêu quái Oni trong thần thoại dân gian Nhật Bản',
      sourceEra: 'Thần thoại dân gian truyền miệng và kịch Noh / Kyogen',
      narrative:
        'Trong truyền thuyết văn hóa dân gian Nhật Bản, loài quỷ Oni thường có thân hình khổng lồ, da đỏ như lửa, sừng nhọn trên đầu và sức mạnh bạt núi ngăn sông. Tuy nhiên, hình ảnh đáng sợ nhất của Oni trong tâm thức người Nhật là khi trên tay quỷ cầm cây trượng sắt bọc gai nhọn (Kanabou). Vốn dĩ tay không đã chẳng ai địch nổi, nay có thêm gậy sắt thì hoàn toàn bất khả xâm phạm. Câu thành ngữ xuất hiện từ thời Muromachi nhằm ca ngợi sự kết hợp giữa nền tảng thực lực và phương tiện bổ trợ tối ưu.',
      moralTakeaway:
        'Tìm kiếm những công cụ tiên tiến và người đồng hành lý tưởng để nhân bội sức mạnh sẵn có của bản thân.',
    },
    usageGuide: {
      context: 'Dùng để khen ngợi khi một đội nhóm đón nhận nhân tài mới, hoặc một chuyên gia được cấp phần mềm/công cụ tối tân.',
      tone: 'khen ngợi',
      culturalNote:
        'Ngày lễ xua quỷ Setsubun đầu tháng 2 hằng năm ở Nhật có phong tục rải hạt đậu nành nướng và hô vang: 「鬼は外、福は内」(Quỷ xéo ra ngoài, Phúc lành vào trong!).',
      dialogue: {
        speakerA: 'Trưởng nhóm',
        speakerAJp: 'AI lập trình viên cao cấp vừa gia nhập đội dự án của chúng ta rồi!',
        speakerARomaji: 'AI puroguramaa no supejiarisuto ga wagateemu ni kanyuu shite kureta yo!',
        speakerAVn: 'Chuyên gia lập trình AI hàng đầu vừa đồng ý gia nhập đội dự án của chúng ta rồi!',
        speakerB: 'Kỹ sư',
        speakerBJp: '素晴らしいですね！うちのエースチームに彼が加われば、まさに「鬼に金棒」です！',
        speakerBRomaji: 'Subarashii desu ne! Uchi no eesu teemu ni kare ga kuwawareba, masa ni "oni ni kanabou" desu!',
        speakerBVn: 'Tuyệt vời quá! Đội ngũ tinh nhuệ của mình mà có thêm anh ấy thì đúng là "hổ mọc thêm cánh"!',
      },
    },
    illustration: {
      themeColor: 'red',
      badgeText: 'Sức mạnh vô song',
      caption: 'Quỷ Oni sừng nhọn vung trượng sắt sấm sét giữa ngàn mây',
      svgScene: 'demon_iron',
    },
  },
  {
    id: 'idiom_12',
    idiom: '石の上にも三年',
    reading: 'いし の うえ に も さんねん',
    romaji: 'Ishi no ue ni mo sannen',
    hanViet: 'THẠCH CHI THƯỢNG NHỊ TAM NIÊN',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (7 chữ)',
    charCount: 7,
    jlptLevel: 'N3',
    theme: 'Ý chí & Kiên trì',
    literalMeaning: 'Dù là tảng đá lạnh ngắt như băng tuyết, nếu kiên trì ngồi lên đó 3 năm thì đá cũng phải ấm lên.',
    figurativeMeaning: 'Dù hoàn cảnh có khắc nghiệt và khó khăn đến đâu, chỉ cần kiên nhẫn nhẫn nại, kiên trì theo đuổi không ngừng nghỉ thì cuối cùng nhất định sẽ gặt hái quả ngọt thành công.',
    vietnameseEquivalent: 'Có công mài sắt có ngày nên kim / Nước chảy đá mòn',
    originStory: {
      title: 'Tích Thiền tọa của Bồ Đề Đạt Ma trên mỏm đá Tung Sơn',
      sourceEra: 'Thiền học Nhật Bản thời kỳ Kamakura (Thế kỷ 13)',
      narrative:
        'Thành ngữ bắt nguồn từ giai thoại đại sư Đạt Ma ngồi thiền tịnh tâm trên tảng đá lạnh băng ở núi Tung Sơn suốt chín năm ròng rã. Khi mới ngồi, tảng đá mùa đông lạnh buốt thấu xương khiến bất cứ ai cũng muốn bỏ cuộc. Nhưng nhờ hơi ấm cơ thể và ý chí kiên định phi thường không rời mỏm đá dù một tấc, phiến đá lạnh băng giá kia dần dà được sưởi ấm hoàn toàn. Số "3 năm" trong văn hóa phương Đông là con số biểu trưng cho một chu kỳ đủ dài để biến đổi về chất.',
      moralTakeaway:
        'Sự nghiệp vĩ đại đòi hỏi thời gian ủ men. Đừng nôn nóng muốn thấy kết quả sau một sớm một chiều; kiên nhẫn chính là tài năng tối thượng.',
    },
    usageGuide: {
      context: 'Khuyên nhủ sinh viên mới ra trường hoặc nhân viên mới vào công ty hãy kiên trì học việc ít nhất 3 năm trước khi tính chuyện chuyển việc.',
      tone: 'khuyên bảo',
      culturalNote:
        'Ở Nhật Bản, các công ty truyền thống rất coi trọng mốc 3 năm đầu đời của nhân viên mới (Shinsotsu) như một thước đo lòng trung thành và tính kiên định.',
      dialogue: {
        speakerA: 'Học việc',
        speakerAJp: 'Làm nghề gốm truyền thống cực khổ quá, suốt ngày nhào đất mà chưa được nặn sản phẩm.',
        speakerARomaji: 'Tougei no shugyou wa tsurasugiru, zutto tsuchi-kone bakari de sakuhin ga tsukurenai.',
        speakerAVn: 'Học nghề gốm cực khổ quá, suốt ngày chỉ được nhào đất chứ chưa được nặn sản phẩm nào.',
        speakerB: 'Nghệ nhân',
        speakerBJp: '「石の上にも三年」だ。基礎を怠る者に本物の器は作れんぞ。',
        speakerBRomaji: '"Ishi no ue ni mo sannen" da. Kiso wo okotaru mono ni hommono no utsuwa wa tsukuren zo.',
        speakerBVn: '"Có công mài sắt có ngày nên kim". Kẻ xem nhẹ những việc cơ bản nhẫn nại thì muôn đời không tạo ra đồ gốm kiệt tác được.',
      },
    },
    illustration: {
      themeColor: 'cyan',
      badgeText: 'Kiên nhẫn tôi luyện',
      caption: 'Thiền sư tọa thiền trên mỏm đá phủ tuyết trắng tĩnh lặng',
      svgScene: 'stone_three_years',
    },
  },
  {
    id: 'idiom_13',
    idiom: '縁の下の力持ち',
    reading: 'えん の した の ちからもち',
    romaji: 'En no shita no chikaramochi',
    hanViet: 'DUYÊN CHI HẠ CHI LỰC TRÌ',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (7 chữ)',
    charCount: 7,
    jlptLevel: 'N2',
    theme: 'Đức tính hy sinh',
    literalMeaning: 'Người có sức mạnh gánh đỡ kiên cố dưới gầm sàn nhà.',
    figurativeMeaning: 'Người hùng thầm lặng đóng góp công sức to lớn, âm thầm hy sinh và cống hiến ở hậu trường mà không hề đòi hỏi được vinh danh hay khen thưởng trước đám đông.',
    vietnameseEquivalent: 'Người hùng thầm lặng / Cột trụ sau cánh gà',
    originStory: {
      title: 'Kiến trúc nhà rường truyền thống Engawa của Nhật Bản',
      sourceEra: 'Kỹ thuật mộc truyền thống Miya-daiku thời Edo',
      narrative:
        'Trong những ngôi nhà gỗ cổ của người Nhật, luôn có một hành lang bao quanh bằng gỗ bóng loáng gọi là Engawa (Hiên nhà). Khách đến chơi nhà chỉ ngắm nhìn vẻ đẹp tao nhã của chiếc hiên lát gỗ sạch sẽ. Thế nhưng ít ai biết rằng dưới gầm sàn tăm tối bụi bặm ấy, có những chiếc cột gỗ lim chắc nịch ngày đêm oằn mình nâng đỡ sức nặng của cả ngôi nhà và những bước chân người qua lại. Nếu không có những chiếc cột âm thầm chịu đựng ấy, cả công trình nguy nga sẽ sụp đổ.',
      moralTakeaway:
        'Tôn trọng và biết ơn những người đang thầm lặng làm việc phía sau hậu trường để giữ cho tập thể vận hành trơn tru.',
    },
    usageGuide: {
      context: 'Dùng để tri ân đội ngũ hậu cần (IT, vệ sinh, kế toán, biên tập) trong một sự kiện hoặc dự án lớn.',
      tone: 'khen ngợi',
      culturalNote:
        'Văn hóa doanh nghiệp Nhật Bản cực kỳ tôn kính những "En no shita no chikaramochi" vì đó là hiện thân của đức tính xả thân vì tập thể.',
      dialogue: {
        speakerA: 'MC sự kiện',
        speakerAJp: 'Hội nghị thành công tốt đẹp là nhờ các diễn giả nổi tiếng.',
        speakerARomaji: 'Kaiken ga seikou shita no wa yuumei na supiikaa no okage da ne.',
        speakerAVn: 'Hội nghị quốc tế thành công rực rỡ là nhờ tài năng của các diễn giả nổi tiếng.',
        speakerB: 'Trưởng ban tổ chức',
        speakerBJp: '徹夜で機材を調整してくれた音響チームこそ、まさに「縁の下の力持ち」だよ。心から感謝したい。',
        speakerBRomaji: 'Tetsuya de kizai wo chousei shite kureta onkyou teemu koso, masa ni "en no shita no chikaramochi" da yo. Kokoro kara kansha shitai.',
        speakerBVn: 'Đội ngũ kỹ thuật âm thanh thức trắng đêm chỉnh máy móc mới chính là những "người hùng thầm lặng". Ta phải cảm ơn họ chân thành nhất.',
      },
    },
    illustration: {
      themeColor: 'amber',
      badgeText: 'Cống hiến vô danh',
      caption: 'Trụ gỗ lim vững vàng dưới mái hiên lá phong mùa đổ bóng',
      svgScene: 'under_floor_hero',
    },
  },
  {
    id: 'idiom_14',
    idiom: '臥薪嘗胆',
    reading: 'がしん しょうたん',
    romaji: 'Gashin shoutan',
    hanViet: 'NGỌA TÂN THƯỜNG ĐẢM',
    type: 'yojijukugo',
    typeName: 'Tứ tự thành ngữ (4 chữ)',
    charCount: 4,
    jlptLevel: 'N1',
    theme: 'Ý chí & Kiên trì',
    literalMeaning: 'Nằm ngủ trên đống cành gai nhọn (ngọa tân) và nếm mật đắng (thường đảm).',
    figurativeMeaning: 'Chấp nhận chịu đựng muôn vàn gian khổ, nhẫn nhục chịu đựng nghịch cảnh để nuôi dưỡng ý chí sắt đá, quyết tâm phục thù hoặc hoàn thành đại nghiệp vẻ vang.',
    vietnameseEquivalent: 'Nằm gai nếm mật / Nuôi chí lớn chờ thời cơ',
    originStory: {
      title: 'Cuộc chiến Ngô - Việt tranh bá thời Xuân Thu',
      sourceEra: 'Sử Ký Tư Mã Thiên · Việt Vương Câu Tiễn Thế Gia',
      narrative:
        'Vua nước Ngô là Phù Sai vì muốn báo thù cho cha nên đêm đêm nằm ngủ trên đống cành gai nhọn (ngọa tân), sai quân lính mỗi sáng hô to: "Phù Sai, ngươi đã quên thù cha chưa?". Sau khi đánh bại nước Việt, vua Việt là Câu Tiễn bị bắt làm tù binh chịu muôn vàn sỉ nhục. Khi được tha về, Câu Tiễn treo một túi mật đắng cạnh chỗ ngồi, mỗi bữa ăn đều nếm vị đắng ngắt (thường đảm) để tự răn mình không bao giờ quên nỗi nhục bại trận. Sau 20 năm kiên trì nuôi quân tích thảo, Câu Tiễn đã khôi phục giang sơn.',
      moralTakeaway:
        'Nỗi đau và sự thất bại hôm nay chính là chất đốt tôi luyện nên ý chí thép để bạn bứt phá đỉnh cao ngày mai.',
    },
    usageGuide: {
      context: 'Dùng khi miêu tả quá trình nỗ lực phi thường vượt qua giai đoạn tăm tối để tái thiết sự nghiệp hoặc đỗ đạt kỳ thi đỉnh cao.',
      tone: 'khen ngợi',
      culturalNote:
        'Khẩu hiệu này từng được toàn thể nhân dân Nhật Bản dùng làm động lực tự cường tái thiết đất nước thời kỳ Minh Trị duy tân.',
      dialogue: {
        speakerA: 'Báo chí',
        speakerAJp: 'Làm thế nào công ty anh từ bờ vực phá sản 5 năm trước nay đã trở thành tập đoàn công nghệ dẫn đầu?',
        speakerARomaji: 'Douyatte go-nen mae no hasan sunzen kara riidingu kanpanii ni nareta no desu ka?',
        speakerAVn: 'Làm thế nào công ty anh từ bờ vực phá sản 5 năm trước nay đã trở thành tập đoàn dẫn đầu?',
        speakerB: 'CEO',
        speakerBJp: '全社員で「臥薪嘗胆」の日々を耐え抜いた結果です。苦難こそが我が社の原動力でした。',
        speakerBRomaji: 'Zen-shain de "gashin shoutan" no hibi wo taenuita kekka desu. Kunan koso ga wagasha no gendouryoku deshita.',
        speakerBVn: 'Đó là kết quả của chuỗi ngày toàn thể nhân viên cùng nhau "nằm gai nếm mật". Chính nghịch cảnh là nhiên liệu đưa chúng tôi đi tới đích.',
      },
    },
    illustration: {
      themeColor: 'violet',
      badgeText: 'Nuôi chí phục hưng',
      caption: 'Ngọn đuốc bập bùng soi bóng túi mật đắng trên tường thành',
      svgScene: 'sleeping_on_brushwood',
    },
  },
  {
    id: 'idiom_15',
    idiom: '塵も積もれば山となる',
    reading: 'ちり も つもれば やま と なる',
    romaji: 'Chiri mo tsumoreba yama to naru',
    hanViet: 'TRẦN DI TÍCH TẮC SƠN ĐÍCH THÀNH',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (8 chữ)',
    charCount: 8,
    jlptLevel: 'N3',
    theme: 'Học tập & Rèn luyện',
    literalMeaning: 'Từng hạt bụi nhỏ li ti nếu tích tụ ngày qua ngày cũng có thể chất cao thành ngọn núi lớn.',
    figurativeMeaning: 'Dù là việc nhỏ bé, nỗ lực ít ỏi hay số tiền tiết kiệm cỏn con, nếu duy trì đều đặn kiên trì mỗi ngày thì theo thời gian sẽ tạo nên thành tựu vĩ đại khổng lồ.',
    vietnameseEquivalent: 'Tích tiểu thành đại / Góp gió thành bão / Kiến tha lâu cũng đầy tổ',
    originStory: {
      title: 'Triết lý Kinh Phật Đại Trí Độ Luận',
      sourceEra: 'Tác phẩm Phật giáo Đại Trí Độ Luận dịch sang tiếng Nhật cổ',
      narrative:
        'Trong Kinh Phật cổ có dạy: Giọt nước tuy nhỏ, rơi mãi cũng làm đầy chum lớn. Hạt bụi bay lơ lửng mắt thường khó thấy, nhưng qua triệu năm phong hóa tụ hội lại trở thành ngọn núi Phú Sĩ hùng vĩ. Người xưa mượn quy luật của tạo hóa để răn dạy người đời về sức mạnh của thói quen vi mô (Micro-habits): Đừng coi thường những hành động nhỏ, và đừng xem thường những tích lũy hằng ngày.',
      moralTakeaway:
        'Kỷ luật hàng ngày tạo nên kỳ tích cả đời. Mỗi ngày học thêm 5 từ vựng, một năm bạn đã sở hữu gần 2.000 vốn từ vựng cao cấp.',
    },
    usageGuide: {
      context: 'Dùng để động viên việc học ngoại ngữ hằng ngày, tiết kiệm tiền bạc hoặc kiên trì luyện tập thể dục thể thao.',
      tone: 'khuyên bảo',
      culturalNote:
        'Câu nói này là tôn chỉ của ứng dụng học tập Kotoba: Mỗi ngày mở app 10 phút, kiến thức tiếng Nhật của bạn sẽ vươn cao như núi.',
      dialogue: {
        speakerA: 'Học sinh',
        speakerAJp: 'Mỗi ngày tớ chỉ học có 10 chữ Kanji thôi, không biết bao giờ mới giỏi được.',
        speakerARomaji: 'Mainichi jukko no kanji shika benkyou shite nai kara, itsu jouzu ni naru ka wakaranai yo.',
        speakerAVn: 'Mỗi ngày tớ chỉ học có 10 chữ Kanji thôi, không biết đến bao giờ mới giỏi được.',
        speakerB: 'Thầy giáo',
        speakerBJp: '「塵も積もれば山となる」だよ。1年続ければ3000文字以上マスターできるぞ！',
        speakerBRomaji: '"Chiri mo tsumoreba yama to naru" da yo. Ichinen tsuzukereba sanzenn-moji ijou masutaa dekiru zo!',
        speakerBVn: '"Tích tiểu thành đại" con à! Cứ kiên trì 1 năm, con sẽ làm chủ hơn 3.000 chữ Hán mà chính con cũng không ngờ tới!',
      },
    },
    illustration: {
      themeColor: 'emerald',
      badgeText: 'Sức mạnh tích lũy',
      caption: 'Ngọn núi Phú Sĩ tuyết phủ soi bóng mặt hồ tĩnh lặng',
      svgScene: 'dust_mountain',
    },
  },
  {
    id: 'idiom_16',
    idiom: '馬の耳に念仏',
    reading: 'うま の みみ に ねんぶつ',
    romaji: 'Uma no mimi ni nembutsu',
    hanViet: 'MÃ CHI NHĨ NHỊ NIỆM PHẬT',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (5 chữ)',
    charCount: 5,
    jlptLevel: 'N3',
    theme: 'Trí tuệ ngụ ngôn',
    literalMeaning: 'Đứng tụng kinh Phật A Di Đà truyền dạy đạo lý vào tai con ngựa.',
    figurativeMeaning: 'Khuyên bảo, giảng giải đạo lý tốt đẹp cho kẻ ngoan cố, không chịu lắng nghe, nói bao nhiêu cũng vô ích như gió thoảng qua tai.',
    vietnameseEquivalent: 'Đàn gảy tai trâu / Nước đổ đầu vịt / Nước đổ lá khoai',
    originStory: {
      title: 'Tích tăng sư tụng niệm cứu độ chúng sinh thời Heian',
      sourceEra: 'Văn học dân gian Phật giáo thời Heian (Tập truyện Uji Shui Monogatari)',
      narrative:
        'Lời kinh Phật (Nembutsu) là âm thanh thiêng liêng nhất hướng con người tới cõi Niết Bàn an lạc. Một vị hòa thượng nhân từ thấy con ngựa kéo xe mệt mỏi bên đường bèn dừng lại, chắp tay thành kính tụng một bài kinh siêu độ cho linh hồn chú ngựa được thanh tịnh. Thế nhưng con ngựa chỉ vẫy vẫy cái tai đuổi ruồi, rồi lại cúi đầu gặm cỏ rơm ven đường. Dân gian bật cười trước sự cọc cạch ấy và đúc kết thành câu nói về sự vô ích khi cố giảng đạo lý cho kẻ không tiếp thu.',
      moralTakeaway:
        'Lời khuyên chỉ có giá trị với người sẵn sàng lắng nghe. Chọn đúng đối tượng để trao gửi tâm huyết và thời gian.',
    },
    usageGuide: {
      context: 'Dùng khi than thở việc khuyên bảo một người cứng đầu không chịu sửa đổi thói quen xấu.',
      tone: 'phê bình nhẹ',
      culturalNote:
        'Có câu thành ngữ đồng nghĩa thú vị khác: 「犬に論語」(Đọc sách Luận Ngữ cho chó nghe).',
      dialogue: {
        speakerA: 'Mẹ',
        speakerAJp: 'いくらゲームをやめなさいと言っても、あの子は勉強を始めないのよ。',
        speakerARomaji: 'Ikura geemu wo yamenasai to ittemo, ano ko wa benkyou wo hajimenai no yo.',
        speakerAVn: 'Tôi có khuyên bảo thế nào thì thằng bé vẫn cắm mặt vào chơi game, chẳng chịu học hành gì cả.',
        speakerB: 'Bố',
        speakerBJp: '「馬の耳に念仏」だな。言葉で言うより、まずWi-Fiを切るしかないか。',
        speakerBRomaji: '"Uma no mimi ni nembutsu" da na. Kotoba de iu yori, mazu wa Wi-Fi wo kiru shikanai ka.',
        speakerBVn: 'Đúng là "nước đổ đầu vịt" rồi! Nói bằng lời vô ích, có khi phải tắt luôn Wi-Fi thôi bà nó à.',
      },
    },
    illustration: {
      themeColor: 'slate',
      badgeText: 'Ngụ ngôn dân gian',
      caption: 'Chú ngựa thản nhiên gặm cỏ dưới mái chùa cổ rêu phong',
      svgScene: 'horse_ear_prayer',
    },
  },
];

// Kho dự trữ thành ngữ mở rộng nạp theo từng cụm +3
export const ADDITIONAL_EXPANDABLE_IDIOMS: IllustratedIdiomItem[] = [
  {
    id: 'idiom_17',
    idiom: '鶴の一声',
    reading: 'つる の ひとこえ',
    romaji: 'Tsuru no hitokoe',
    hanViet: 'HẠC CHI NHẤT THANH',
    type: 'kotowaza',
    typeName: 'Tục ngữ quyền uy (5 chữ)',
    charCount: 5,
    jlptLevel: 'N2',
    theme: 'Ứng xử & Lãnh đạo',
    literalMeaning: 'Giữa tiếng ríu rít xôn xao của bầy chim nhỏ, chỉ một tiếng hạc kêu vang trời cất lên là tất cả đều nín bặt.',
    figurativeMeaning: 'Quyết định dứt khoát mang tính quyền lực tối cao của người đứng đầu giải quyết triệt để cuộc tranh cãi bế tắc kéo dài.',
    vietnameseEquivalent: 'Một lời định đoạt / Lời vàng thước ngọc / Lời nói của bậc tối thượng',
    originStory: {
      title: 'Tiếng kêu của thần điểu hạc trắng chốn cung đình Heian',
      sourceEra: 'Văn hóa quý tộc & Lịch sử phong kiến Nhật Bản',
      narrative:
        'Chim hạc (Tancho-zuru) là loài linh điểu thiêng liêng biểu tượng của sự tôn quý và trường thọ của đất nước mặt trời mọc. Cổ họng hạc dài và thanh quản cấu tạo đặc biệt giúp tiếng kêu của nó vang vọng xuyên qua tầng mây đến hàng cây số. Khi đàn chim sẻ, quạ đang ồn ào tranh ăn náo loạn, chỉ cần chim hạc cất tiếng kêu cao vút uy dũng từ trên cao, tất cả loài chim lập tức im lặng quy phục.',
      moralTakeaway:
        'Trong một tập thể, khi ý kiến phân tán không thể thống nhất, vai trò quyết đoán và tầm nhìn của người lãnh đạo là chìa khóa then chốt đưa tổ chức tiến lên.',
    },
    usageGuide: {
      context: 'Dùng trong môi trường công sở, chính trị hoặc cuộc họp khi sếp tổng đưa ra phán quyết dứt điểm.',
      tone: 'khen ngợi',
      culturalNote:
        'Trong văn hóa doanh nghiệp Nhật, Nemawashi (vận động hành lang) chuẩn bị kỹ càng trước khi xin "Tsuru no hitokoe" của Giám đốc.',
      dialogue: {
        speakerA: 'Trưởng nhóm',
        speakerAJp: '新商品のデザイン、A案とB案で3時間も揉めて結論が出ませんね。',
        speakerARomaji: 'Shinshouhin no dezain, A-an to B-an de sanjikan mo momete ketsuron ga demasen ne.',
        speakerAVn: 'Thiết kế sản phẩm mới, phe chọn phương án A và B tranh cãi nảy lửa suốt 3 tiếng vẫn chưa chốt được.',
        speakerB: 'Phó phòng',
        speakerBJp: '結局、社長の「鶴の一声」でA案で行くことに決まりましたよ。',
        speakerBRomaji: 'Kekkyoku, shachou no "tsuru no hitokoe" de A-an de iku koto ni kimarimashita yo.',
        speakerBVn: 'Rốt cuộc nhờ "tiếng nói định đoạt" của Tổng giám đốc mà mọi người đã nhất trí chốt phương án A rồi đấy.',
      },
    },
    illustration: {
      themeColor: 'rose',
      badgeText: 'Uy quyền lãnh đạo',
      caption: 'Bạch hạc vươn cánh cất tiếng vang rền xé toang vầng mây đỏ',
      svgScene: 'crane_voice',
    },
  },
  {
    id: 'idiom_18',
    idiom: '火中の栗を拾う',
    reading: 'かちゅう の くり を ひろう',
    romaji: 'Kachuu no kuri wo hirou',
    hanViet: 'HỎA TRUNG CHI LẬT THẬP',
    type: 'kanyouku',
    typeName: 'Quán dụng ngữ ngụ ngôn (7 chữ)',
    charCount: 7,
    jlptLevel: 'N1',
    theme: 'Trí tuệ ngụ ngôn',
    literalMeaning: 'Thò tay vào giữa đống than hồng đỏ rực để nhặt hạt dẻ nướng.',
    figurativeMeaning: 'Bị kẻ gian xảo lợi dụng, xúi giục liều mạng gánh chịu rủi ro nguy hiểm tột cùng chỉ để mang lại lợi ích cho kẻ khác.',
    vietnameseEquivalent: 'Hứng đạn hộ người / Làm mồi cho kẻ khác / Rước họa vào thân',
    originStory: {
      title: 'Ngụ ngôn chú khỉ ranh mãnh và con mèo ngây thơ',
      sourceEra: 'Ngụ ngôn Jean de La Fontaine (Du nhập Nhật Bản thời Edo)',
      narrative:
        'Khỉ và mèo ngồi sưởi ấm bên bếp than hồng đang nướng hạt dẻ thơm lừng. Khỉ rất thèm ăn nhưng sợ bỏng tay, bèn ngon ngọt tâng bốc: "Mèo ơi, móng vuốt của bạn vừa khéo léo lại dũng cảm, bạn thò chân gắp hạt dẻ ra đây chúng mình cùng chia nhau nhé!". Mèo tin lời thò chân vào bới than, móng bị cháy sém đau đớn. Mỗi khi mèo bới được một hạt dẻ ra ngoài, khỉ ta lập tức bóc ăn sạch. Đến khi chủ nhà bước vào, mèo bị ăn đòn còn bụng vẫn đói meo.',
      moralTakeaway:
        'Cảnh giác trước những lời tâng bốc đường mật. Đừng mù quáng dấn thân vào nguy hiểm nếu đó chỉ là mưu đồ trục lợi của kẻ xúi giục.',
    },
    usageGuide: {
      context: 'Dùng để cảnh báo bạn bè hoặc đồng nghiệp không nên nhận lời gánh trách nhiệm thay người khác trong việc nguy hiểm.',
      tone: 'khuyên bảo',
      culturalNote:
        'Người Nhật hiện đại đôi khi dùng câu này với sắc thái tích cực: tự nguyện gánh vác việc khó khăn ít ai dám nhận để cứu nguy cho tập thể.',
      dialogue: {
        speakerA: 'Yamada',
        speakerAJp: '他部署の失敗プロジェクトの責任者、誰も引き受けないから僕が立候補しようかな。',
        speakerARomaji: 'Tabusho no shippai purojekuto no sekininsha, daremo hikiukenai kara boku ga rikkouho shiyou ka na.',
        speakerAVn: 'Dự án thất bại của phòng ban khác không ai dám đứng ra chịu trách nhiệm, hay là tôi xung phong nhận việc nhé?',
        speakerB: 'Suzuki',
        speakerBJp: 'やめなさい！それはまさに「火中の栗を拾う」ようなものだよ。自分が犠牲になるだけだ。',
        speakerBRomaji: 'Yamenasai! Sore wa masa ni "kachuu no kuri wo hirou" you na mono da yo. Jibun ga gisei ni naru dake da.',
        speakerBVn: 'Dừng lại ngay! Làm thế chẳng khác nào "gắp hạt dẻ trong lửa" hộ người khác, cậu sẽ chỉ biến mình thành bia đỡ đạn thôi!',
      },
    },
    illustration: {
      themeColor: 'amber',
      badgeText: 'Ngụ ngôn cảnh giác',
      caption: 'Hạt dẻ thơm lừng giữa đống than hồng rực lửa',
      svgScene: 'chestnut_fire',
    },
  },
  {
    id: 'idiom_19',
    idiom: '月とスッポン',
    reading: 'つき と すっぽん',
    romaji: 'Tsuki to suppon',
    hanViet: 'NGUYỆT DỮ MIẾT',
    type: 'kotowaza',
    typeName: 'Tục ngữ dân gian (6 chữ)',
    charCount: 6,
    jlptLevel: 'N3',
    theme: 'Ứng xử nhân sinh',
    literalMeaning: 'Cùng có hình tròn mâm xôi, nhưng một đằng là vầng trăng thanh cao ngời sáng trên trời, một đằng là con ba ba mai tròn lấm lem bùn ao.',
    figurativeMeaning: 'Khác biệt một trời một vực về phẩm chất, khí chất, đẳng cấp hoặc giá trị dù bề ngoài có vài nét tương đồng.',
    vietnameseEquivalent: 'Một trời một vực / Đũa mốc chòi mâm son / Cỏ may sánh với cây tùng',
    originStory: {
      title: 'Tục ngữ so sánh dí dỏm thời Edo',
      sourceEra: 'Văn học dân gian thời Edo (Đầu thế kỷ 18)',
      narrative:
        'Người xưa ở Edo trong những đêm ngắm trăng rằm tháng Tám (Tsukimi) thường vui đùa so sánh những vật thể có hình tròn: Vầng trăng tròn vành vạnh dát vàng trên đỉnh trời cao thăm thẳm và chiếc mai con ba ba (Suppon) tròn trĩnh sống ẩn mình dưới lớp bùn lầy đáy hồ. Cả hai đều tròn, nhưng một bên thanh cao không tì vết, một bên bùn đen bao phủ, khoảng cách xa nhau vạn dặm.',
      moralTakeaway:
        'Nhìn nhận sự việc cần thấu suốt bản chất bên trong, không để sự tương đồng giả tạo về hình thức bên ngoài đánh lừa mắt nhìn.',
    },
    usageGuide: {
      context: 'Dùng khi so sánh sự chênh lệch quá lớn về kỹ năng, tài năng, chất lượng giữa hai đối tượng.',
      tone: 'phê bình nhẹ',
      culturalNote:
        'Tránh dùng so sánh trực tiếp trước mặt người khác vì có thể gây tổn thương; thường dùng khi tự so mình với bậc cao nhân để khiêm tốn.',
      dialogue: {
        speakerA: 'Tân binh',
        speakerAJp: '先輩のプレゼン、素晴らしかったです！僕の発表と同じテーマなのに全然違いますね。',
        speakerARomaji: 'Senpai no purezen, subarashikatta desu! Boku no happyou to onaji teema na no ni zenzen chigaimasu ne.',
        speakerAVn: 'Bài thuyết trình của tiền bối xuất sắc quá! Cùng một đề tài mà so với bài của em thì khác nhau hoàn toàn.',
        speakerB: 'Tiền bối',
        speakerBJp: '経験の差だよ。でも「月とスッポン」なんて謙遜しないで、次の発表も自信を持って！',
        speakerBRomaji: 'Keiken no sa da yo. Demo "tsuki to suppon" nante kenson shinaide, tsugi no happyou mo jishin wo motte!',
        speakerBVn: 'Chỉ là do kinh nghiệm nhiều hơn thôi mà. Đừng khiêm tốn tự nhận là "một trời một vực" thế, bài tới cứ tự tin lên nhé!',
      },
    },
    illustration: {
      themeColor: 'cyan',
      badgeText: 'So sánh tương phản',
      caption: 'Trăng rằm soi bóng hồ nước bên chú ba ba trầm mặc',
      svgScene: 'moon_suppon',
    },
  },
  {
    id: 'idiom_20',
    idiom: '早起きは三文の徳',
    reading: 'はやおき は さんもん の とく',
    romaji: 'Hayaoki wa sanmon no toku',
    hanViet: 'TẢO KHỞI TAM VĂN CHI ĐỨC',
    type: 'kotowaza',
    typeName: 'Tục ngữ dưỡng tâm (8 chữ)',
    charCount: 8,
    jlptLevel: 'N4',
    theme: 'Ý chí & Thói quen',
    literalMeaning: 'Thức dậy sớm vào ban sớm thì dù ít dù nhiều cũng kiếm thêm được ba đồng xu Sanmon.',
    figurativeMeaning: 'Thói quen thức dậy sớm đem lại vô vàn lợi ích quý báu cho sức khỏe dẻo dai, trí tuệ minh mẫn và hiệu quả công việc.',
    vietnameseEquivalent: 'Dậy sớm để thành công / Chim dậy sớm bắt được sâu / Thức khuya dậy sớm mới nên con người',
    originStory: {
      title: 'Tục lệ quét tuyết đền thờ Nara thời kỳ Edo',
      sourceEra: 'Lịch sử dân gian vùng Nara - Edo (Thế kỷ 17)',
      narrative:
        'Vào thời Edo tại vùng đất cổ Nara, loài hươu được tôn kính như sứ giả của thần linh. Luật thời đó quy định nếu sáng ra phát hiện hươu chết trước cửa nhà ai thì gia chủ phải chịu nộp phạt ba đồng xu tiền đồng (Sanmon). Vì thế, người dân rủ nhau dậy thật sớm từ tờ mờ sáng để quét dọn đường ngõ, nhờ dậy sớm mà tránh được tai bay vạ gió, lại hít thở khí trời trong lành sảng khoái và làm xong việc trước khi mặt trời lên.',
      moralTakeaway:
        'Kỷ luật tự giác làm chủ thời gian buổi sáng là gốc rễ của một cuộc đời khỏe mạnh, sung túc và bình an.',
    },
    usageGuide: {
      context: 'Dùng khi động viên nhau rèn luyện thói quen dậy sớm tập thể dục, học ngoại ngữ, đọc sách.',
      tone: 'khuyên bảo',
      culturalNote:
        'Tại Nhật Bản có phong trào Asa-katsu (朝活 - Hoạt động buổi sáng) rất thịnh hành, bắt nguồn chính từ triết lý câu thành ngữ này.',
      dialogue: {
        speakerA: 'Học viên',
        speakerAJp: '毎朝5時に起きてJLPT N1の単語を30分勉強することに決めました！',
        speakerARomaji: 'Maiasa goji ni okite JLPT N1 no tango wo sanjuppun benkyou suru koto ni kimemashita!',
        speakerAVn: 'Em đã quyết tâm mỗi sáng thức dậy lúc 5 giờ để học 30 phút từ vựng JLPT N1 rồi thầy ạ!',
        speakerB: 'Giáo viên',
        speakerBJp: '素晴らしい決断ですね。「早起きは三文の徳」、朝の集中力は夜の3倍に匹敵しますよ。',
        speakerBRomaji: 'Subarashii ketsudan desu ne. "Hayaoki wa sanmon no toku", asa no shuuchuuryoku wa yoru no sanbai ni hitteki shimasu yo.',
        speakerBVn: 'Quyết định tuyệt vời lắm! "Dậy sớm gom được ba xu lợi ích", sự tập trung buổi sáng tương đương gấp 3 lần học buổi tối đấy.',
      },
    },
    illustration: {
      themeColor: 'amber',
      badgeText: 'Kỷ luật buổi sáng',
      caption: 'Bình minh đỏ rực chiếu rọi ba đồng xu đồng lấp lánh',
      svgScene: 'early_bird',
    },
  },
  {
    id: 'idiom_21',
    idiom: '三本の矢',
    reading: 'さんぼん の や',
    romaji: 'Sanbon no ya',
    hanViet: 'TAM BẢN CHI TIẾN',
    type: 'koji_seigo',
    typeName: 'Điển tích Chiến Quốc (4 chữ)',
    charCount: 4,
    jlptLevel: 'N3',
    theme: 'Đoàn kết & Đồng lòng',
    literalMeaning: 'Một mũi tên đơn lẻ thì dễ dàng bẻ gãy, nhưng gộp ba mũi tên lại thành bó thì sức người không thể bẻ gãy.',
    figurativeMeaning: 'Sức mạnh kỳ diệu của tinh thần đoàn kết, anh em đồng lòng hiệp lực sẽ tạo nên bức tường thành kiên cố chiến thắng mọi hiểm nguy.',
    vietnameseEquivalent: 'Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao / Bó đũa đoàn kết',
    originStory: {
      title: 'Lời trăn trối di huấn của lãnh chúa Mōri Motonari',
      sourceEra: 'Thời kỳ Chiến Quốc Nhật Bản (Sengoku Jidai - 1571)',
      narrative:
        'Lãnh chúa vùng Chugoku là Mōri Motonari nằm trên giường bệnh, gọi ba người con trai ruột (Takamoto, Motoharu, Takakage) đến bên giường. Ông đưa cho mỗi người một mũi tên và bảo bẻ gãy. Cả ba dễ dàng bẻ gãy gãy đôi. Tiếp đó, ông lấy ba mũi tên bó chặt lại bằng sợi dây đỏ và bảo các con bẻ thử. Dù dốc hết sức bình sinh, không ai có thể làm cong được bó tên. Ông ân cần dặn: "Gia tộc Mōri muốn trường tồn giữa thời loạn lạc, ba anh em con phải yêu thương đùm bọc, đồng lòng như bó ba mũi tên này".',
      moralTakeaway:
        'Đơn độc thì mong manh dễ tổn thương, gắn kết kề vai sát cánh thì không giông bão nào có thể quật ngã.',
    },
    usageGuide: {
      context: 'Dùng khi kêu gọi tinh thần đồng đội trong công ty, đội nhóm khởi nghiệp hoặc gia đình tương trợ.',
      tone: 'khen ngợi',
      culturalNote:
        'Chính sách kinh tế Abenomics nổi tiếng của Nhật Bản trước đây cũng dùng ẩn dụ "Ba mũi tên" bắt nguồn từ chính điển tích này.',
      dialogue: {
        speakerA: 'Founder',
        speakerAJp: '大手競合企業が参入してきて、うちのスタートアップは生き残れるでしょうか。',
        speakerARomaji: 'Oote kyougou kigyou ga sannyuu shite kite, uchi no sutaatoappu wa ikinokoreru deshou ka.',
        speakerAVn: 'Tập đoàn đối thủ khổng lồ vừa nhảy vào thị trường, startup của chúng ta liệu có trụ vững nổi không anh?',
        speakerB: 'Co-founder',
        speakerBJp: '僕たち3人の創業者には「三本の矢」の絆がある。一致団結して敏捷に動けば必ず勝機はある！',
        speakerBRomaji: 'Bokutachi sannin no sougyousha ni wa "sanbon no ya" no kizuna ga aru. Itchi danketsu shite binshou ni ugokeba kanarazu shouki wa aru!',
        speakerBVn: 'Ba người sáng lập chúng ta có sự gắn kết bền vững của "bó ba mũi tên". Chỉ cần đoàn kết và nhanh nhạy, ắt sẽ giành thắng lợi!',
      },
    },
    illustration: {
      themeColor: 'blue',
      badgeText: 'Sức mạnh đoàn kết',
      caption: 'Bó ba mũi tên thắt dây đỏ kiên cố trước sấm chớp thời cuộc',
      svgScene: 'three_arrows',
    },
  },
  {
    id: 'idiom_22',
    idiom: '棚から牡丹餅',
    reading: 'たな から ぼたもち',
    romaji: 'Tana kara botamochi',
    hanViet: 'BẰNG TỰ MẪU ĐAN BÍNH',
    type: 'kotowaza',
    typeName: 'Tục ngữ ngụ ngôn (7 chữ)',
    charCount: 7,
    jlptLevel: 'N3',
    theme: 'Vận may & Cơ duyên',
    literalMeaning: 'Đang nằm nghỉ thảnh thơi dưới giá để đồ thì một chiếc bánh nếp ngọt ngào Botamochi rơi trúng ngay vào miệng.',
    figurativeMeaning: 'Vận may cực lớn hoặc cơ hội tuyệt vời bất ngờ rơi trúng đầu mà bản thân không hề tốn một chút công sức nào.',
    vietnameseEquivalent: 'Sung rụng vào mồm / Mèo mù vớ cá rán / Trúng quả đậm bất ngờ',
    originStory: {
      title: 'Món bánh nếp quý giá ngày tiết thanh minh thời Edo',
      sourceEra: 'Ẩm thực dân gian thời kỳ Edo',
      narrative:
        'Botamochi là món bánh nếp bọc lớp đậu đỏ ngọt bùi, vốn là thức quà xa xỉ chỉ được thưởng thức vào dịp lễ hội chuyển mùa Ohigan. Người nghèo thời xưa nằm ngước nhìn lên giá bếp (Tana) thơm ngát, thầm ước ao giá như chiếc bánh ngọt lành kia tự lăn rơi xuống đúng vào miệng mình mà không cần làm lụng. Từ ước mơ vui tươi ấy đã sinh ra câu tục ngữ hóm hỉnh chỉ vận may từ trên trời rơi xuống.',
      moralTakeaway:
        'Vận may bất ngờ là điều đáng mừng, nhưng không thể sống cả đời mà chỉ biết trông chờ sung rụng mà không chịu gieo trồng.',
    },
    usageGuide: {
      context: 'Dùng khi trúng số, bỗng nhiên nhận được mối làm ăn hời hoặc món quà bất ngờ mà mình không lường trước.',
      tone: 'khen ngợi',
      culturalNote:
        'Người Nhật thường nói tắt câu này thành 「タナボタ」(Tanabota) trong ngôn ngữ giao tiếp hằng ngày.',
      dialogue: {
        speakerA: 'Hải',
        speakerAJp: '営業活動もしていないのに、大口クライアントから突然問い合わせが来たよ！',
        speakerARomaji: 'Eigyou katsudou mo shite inai no ni, ooguchi kuraianto kara totsuzen toiawase ga kita yo!',
        speakerAVn: 'Tớ chưa kịp đi chào hàng mà một khách hàng lớn bỗng dưng chủ động liên hệ đặt hàng này cậu!',
        speakerB: 'Mai',
        speakerBJp: 'すごい！まさに「棚から牡丹餅」ね。でもこの幸運を逃さないよう、丁寧に対応しよう！',
        speakerBRomaji: 'Sugoi! Masa ni "tana kara botamochi" ne. Demo kono kouun wo nogasanai you, teinei ni taiou shiyou!',
        speakerBVn: 'Tuyệt vời quá! Đúng là "sung rụng trúng mồm" luôn. Nhưng để không vuột mất vận may này, chúng mình phải tiếp đón chu đáo nhé!',
      },
    },
    illustration: {
      themeColor: 'purple',
      badgeText: 'Vận may kỳ ngộ',
      caption: 'Bánh nếp đậu đỏ ngọt ngào rơi nhẹ từ chiếc giá gỗ cổ truyền',
      svgScene: 'botamochi_shelf',
    },
  },
];

// Helper: Lấy 3 câu thành ngữ tiếp theo từ kho dự trữ hoặc tự động sinh batch mới
export function getNextIdiomsBatch(currentLoadedIds: string[], count: number = 3): IllustratedIdiomItem[] {
  const remaining = ADDITIONAL_EXPANDABLE_IDIOMS.filter(
    (item) => !currentLoadedIds.includes(item.id)
  );

  if (remaining.length >= count) {
    return remaining.slice(0, count);
  }

  // Nếu đã nạp hết kho tĩnh, sinh tiếp các câu thành ngữ kinh điển phong phú
  const generatedBatch: IllustratedIdiomItem[] = [];
  const startIdx = currentLoadedIds.length + 1;

  const backupCatalogue = [
    {
      idiom: '急がば回れ',
      reading: 'いそがば まわれ',
      romaji: 'Isogaba maware',
      hanViet: 'CẤP TẤT HỒI',
      type: 'kotowaza' as const,
      typeName: 'Tục ngữ ngụ ngôn (5 chữ)',
      charCount: 5,
      jlptLevel: 'N4' as const,
      theme: 'Trí tuệ xử thế',
      literal: 'Đang vội vượt hồ Biwa sang Kyoto, chèo thuyền tắt qua sóng to gió lớn dễ chìm, đi đường bộ vòng quanh hồ lại nhanh và an toàn hơn.',
      fig: 'Đứng trước việc hệ trọng, đi theo lộ trình vững chắc tuy có vẻ chậm nhưng chắc chắn đến đích hơn là đốt cháy giai đoạn để rồi thất bại.',
      vn: 'Dục tốc bất đạt / Muốn nhanh thì phải từ từ / Chậm mà chắc',
      title: 'Bài thơ bến thuyền Yabase trên hồ Biwa',
      era: 'Thơ Waka của văn nhân Sogi thế kỷ 15',
      scene: 'lake_biwa_round' as const,
    },
    {
      idiom: '笑う門には福来る',
      reading: 'わらう かど に は ふく きたる',
      romaji: 'Warau kado ni wa fuku kitaru',
      hanViet: 'TIẾU MÔN PHÚC LAI',
      type: 'kotowaza' as const,
      typeName: 'Tục ngữ cát tường (8 chữ)',
      charCount: 8,
      jlptLevel: 'N4' as const,
      theme: 'Lạc quan & Phúc đức',
      literal: 'Cửa nhà nào luôn tràn ngập tiếng cười giòn giã thì may mắn, tài lộc ắt tự động gõ cửa tìm đến.',
      fig: 'Thái độ sống vui tươi lạc quan chính là nam châm thu hút năng lượng lành, xua tan hoạn nạn và mang lại thịnh vượng bền lâu.',
      vn: 'Một nụ cười bằng mười thang thuốc bổ / Hòa khí sinh tài / Cười rạng rỡ đón phúc',
      title: 'Trò chơi bài dân gian Karuta ngày đầu năm mới',
      era: 'Dân gian thời kỳ Edo Nhật Bản',
      scene: 'laughing_gate' as const,
    },
    {
      idiom: '負けるが勝ち',
      reading: 'まける が かち',
      romaji: 'Makeru ga kachi',
      hanViet: 'PHỤ TỨC THẮNG',
      type: 'kotowaza' as const,
      typeName: 'Tục ngữ triết lý (5 chữ)',
      charCount: 5,
      jlptLevel: 'N3' as const,
      theme: 'Ứng xử & Nhẫn nhịn',
      literal: 'Chấp nhận nhường nhịn chịu thua cuộc cãi vã nhỏ trước mắt để giữ gìn hòa khí và thắng lợi đại cục về sau.',
      fig: 'Lấy nhu thắng cương, không hơn thua tiểu tiết để bảo toàn nội lực và thu hoạch thành quả lâu dài.',
      vn: 'Lùi một bước trời cao biển rộng / Một điều nhịn, chín điều lành',
      title: 'Triết lý Nhu thuật Jujutsu và Thiền đạo Samurai',
      era: 'Võ sĩ đạo thời kỳ Kamakura - Muromachi',
      scene: 'yielding_win' as const,
    },
  ];

  for (let i = 0; i < count; i++) {
    const template = backupCatalogue[i % backupCatalogue.length];
    const uniqueId = `idiom_dyn_${startIdx + i}`;
    generatedBatch.push({
      id: uniqueId,
      idiom: template.idiom,
      reading: template.reading,
      romaji: template.romaji,
      hanViet: template.hanViet,
      type: template.type,
      typeName: template.typeName,
      charCount: template.charCount,
      jlptLevel: template.jlptLevel,
      theme: template.theme,
      literalMeaning: template.literal,
      figurativeMeaning: template.fig,
      vietnameseEquivalent: template.vn,
      originStory: {
        title: template.title,
        sourceEra: template.era,
        narrative: `Tích cổ lưu truyền qua nhiều thế hệ về triết lý ${template.idiom}, nhắc nhở con người luôn giữ vững tâm sáng và trí tuệ sâu sắc giữa dòng đời biến đổi.`,
        moralTakeaway: 'Bài học nhân sinh trường cửu: Trí tuệ xử thế chân chính nằm ở sự bình thản, kiên trì và khiêm nhường.',
      },
      usageGuide: {
        context: 'Dùng trong giao tiếp lịch thiệp khi động viên nhau vượt qua nghịch cảnh.',
        tone: 'khuyên bảo',
        culturalNote: 'Thành ngữ được người Nhật vô cùng yêu chuộng trong đời sống và văn hóa công sở.',
        dialogue: {
          speakerA: 'Yamashita',
          speakerAJp: `困難に直面したときこそ、「${template.idiom}」の精神を大切にしましょう。`,
          speakerARomaji: `Konnan ni chokumen shita toki koso, "${template.romaji}" no seishin wo taisetsu ni shimashou.`,
          speakerAVn: `Chính những lúc đối mặt với khó khăn, chúng ta càng phải quý trọng tinh thần của câu "${template.vn}".`,
          speakerB: 'Kobayashi',
          speakerBJp: 'おっしゃる通りですね！焦らず前向きに一歩ずつ進んでいきます。',
          speakerBRomaji: 'Ossharu toori desu ne! Aserazu maemuki ni ippozutsu susunde ikimasu.',
          speakerBVn: 'Đúng như lời anh nói! Em sẽ không nóng vội mà kiên định tiến bước từng bước một.',
        },
      },
      illustration: {
        themeColor: 'amber',
        badgeText: 'Trí tuệ dân gian',
        caption: `Minh họa thủ công truyền tải đạo lý thâm trầm của câu "${template.idiom}"`,
        svgScene: template.scene,
      },
    });
  }

  return generatedBatch;
}

