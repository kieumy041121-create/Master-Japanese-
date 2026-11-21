export interface JapanPrefectureItem {
  id: string;
  name: string;
  jpName: string;
  romaji: string;
  capital: string;
  regionId: string;
  regionName: string;
  famousFor: string;
  foodSpecialty: string;
  landmark: string;
  greetingBen: {
    phrase: string;
    reading: string;
    meaning: string;
    note: string;
  };
}

export const JAPAN_47_PREFECTURES: JapanPrefectureItem[] = [
  // 1. HOKKAIDO (1)
  {
    id: 'hokkaido',
    name: 'Hokkaido',
    jpName: '北海道',
    romaji: 'Hokkaidō',
    capital: 'Sapporo (札幌)',
    regionId: 'hokkaido',
    regionName: 'Hokkaido',
    famousFor: 'Tuyết trắng tuyết phủ, nông nghiệp bò sữa, lễ hội tuyết Sapporo Yuki Matsuri',
    foodSpecialty: 'Cua tuyết Hokkai, mì Miso Ramen, dưa lưới Yubari, bơ ngô',
    landmark: 'Tháp truyền hình Sapporo, Kênh đào Otaru, Cánh đồng hoa Furano',
    greetingBen: {
      phrase: 'なまら美味い！',
      reading: 'なまらうまい (Namara umai!)',
      meaning: 'Ngon cực kỳ / Siêu ngon! (Namara = rất)',
      note: 'Hokkaido-ben đặc trưng phương Bắc'
    }
  },

  // 2. TOHOKU (6)
  {
    id: 'aomori',
    name: 'Aomori',
    jpName: '青森県',
    romaji: 'Aomori-ken',
    capital: 'Aomori (青森)',
    regionId: 'tohoku',
    regionName: 'Tohoku',
    famousFor: 'Lễ hội rước lồng đèn khổng lồ Nebuta Matsuri, sản lượng táo số 1 Nhật Bản',
    foodSpecialty: 'Táo Aomori, canh cá ngừ tuyết Towada, sò điệp nướng miso',
    landmark: 'Lâu đài Hirosaki, Hồ Towada, Dãy núi Shirakami Sanchi',
    greetingBen: {
      phrase: 'まいね',
      reading: 'まいね (Maine)',
      meaning: 'Không được / Đừng làm thế (Tsugaru-ben)',
      note: 'Phương ngữ Tsugaru đậm chất Đông Bắc'
    }
  },
  {
    id: 'iwate',
    name: 'Iwate',
    jpName: '岩手県',
    romaji: 'Iwate-ken',
    capital: 'Morioka (盛岡)',
    regionId: 'tohoku',
    regionName: 'Tohoku',
    famousFor: 'Đồ sắt thủ công Nambu Tekki, mì Wanko Soba thách đấu, di sản Hiraizumi',
    foodSpecialty: 'Mì Wanko Soba, thịt bò Maesawa, mì Reimen Morioka',
    landmark: 'Chùa Vàng Chuson-ji (Hiraizumi), Nham thạch Genbikei',
    greetingBen: {
      phrase: 'おでってくなんせ',
      reading: 'おでってくなんせ (Odette kunanse)',
      meaning: 'Xin mời quý khách ghé chơi!',
      note: 'Câu chào hiếu khách Nanbu-ben'
    }
  },
  {
    id: 'miyagi',
    name: 'Miyagi',
    jpName: '宮城県',
    romaji: 'Miyagi-ken',
    capital: 'Sendai (仙台)',
    regionId: 'tohoku',
    regionName: 'Tohoku',
    famousFor: 'Lãnh chúa rồng một mắt Date Masamune, Lễ hội thất tịch Sendai Tanabata',
    foodSpecialty: 'Lưỡi bò nướng Gyutan Sendai, chè đậu xanh Zunda Mochi, hàu Matsushima',
    landmark: 'Vịnh Matsushima (Tam đại danh thắng Nhật Bản), Tượng Date Masamune tại Aoba',
    greetingBen: {
      phrase: 'いずい',
      reading: 'いずい (Izui)',
      meaning: 'Cảm giác cồm cộm, vướng víu khó chịu khó tả',
      note: 'Từ địa phương Miyagi-ben rất nổi tiếng'
    }
  },
  {
    id: 'akita',
    name: 'Akita',
    jpName: '秋田県',
    romaji: 'Akita-ken',
    capital: 'Akita (秋田)',
    regionId: 'tohoku',
    regionName: 'Tohoku',
    famousFor: 'Giống chó Akita Inu trung thành, các thiếu nữ Akita Bijin, Lễ Kanto Matsuri',
    foodSpecialty: 'Lẩu cơm cuộn Kiritanpo, mì Inaniwa Udon, dưa muối hun khói Iburigakko',
    landmark: 'Hồ Tazawa sâu nhất Nhật Bản, Suối nước nóng Nyuto Onsen',
    greetingBen: {
      phrase: 'おべだふり',
      reading: 'おべだふり (Obedafuri)',
      meaning: 'Giả vờ như cái gì cũng biết (Tỏ ra thông thái)',
      note: 'Phương ngữ Akita-ben dí dỏm'
    }
  },
  {
    id: 'yamagata',
    name: 'Yamagata',
    jpName: '山形県',
    romaji: 'Yamagata-ken',
    capital: 'Yamagata (山形)',
    regionId: 'tohoku',
    regionName: 'Tohoku',
    famousFor: 'Vương quốc quả anh đào Sakuranbo, quái vật tuyết rừng Zao Juhyo',
    foodSpecialty: 'Thịt bò Yonezawa Gyū, quả anh đào Sato Nishiki, lẩu Imoni khoai sọ',
    landmark: 'Chùa núi Yamadera (Risshaku-ji), Suối nước nóng cổ kính Ginzan Onsen',
    greetingBen: {
      phrase: 'んだず',
      reading: 'んだず (Ndazu)',
      meaning: 'Đúng như vậy đấy! (Đồng tình tuyệt đối)',
      note: 'Yamagata-ben thân thiện, mộc mạc'
    }
  },
  {
    id: 'fukushima',
    name: 'Fukushima',
    jpName: '福島県',
    romaji: 'Fukushima-ken',
    capital: 'Fukushima (福島)',
    regionId: 'tohoku',
    regionName: 'Tohoku',
    famousFor: 'Tinh thần võ sĩ Aizu Samurai, Lâu đài Tsuruga mái ngói đỏ, vương quốc đào',
    foodSpecialty: 'Mì Kitakata Ramen, quả đào Fukushima, rượu Sake Aizu trứ danh',
    landmark: 'Lâu đài Tsuruga (Aizuwakamatsu), Hồ Inawashiro, Làng cổ Ouchi-juku',
    greetingBen: {
      phrase: 'さすけねぇ',
      reading: 'さすけねぇ (Sasukenee)',
      meaning: 'Không sao đâu, đừng lo lắng gì cả!',
      note: 'Fukushima-ben ấm áp, bao dung'
    }
  },

  // 3. KANTO (7)
  {
    id: 'tokyo',
    name: 'Tokyo',
    jpName: '東京都',
    romaji: 'Tōkyō-to',
    capital: 'Shinjuku (新宿)',
    regionId: 'kanto',
    regionName: 'Kanto',
    famousFor: 'Thủ đô siêu đô thị sầm uất nhất thế giới, giao điểm truyền thống Edo & công nghệ',
    foodSpecialty: 'Edo-mae Nigiri Sushi, mì Soba Edo, lẩu Monjayaki Tsukishima, Tokyo Banana',
    landmark: 'Giao lộ Shibuya, Chùa Asakusa Senso-ji, Tháp Tokyo Skytree, Hoàng cung Kokyo',
    greetingBen: {
      phrase: 'お疲れ様でした！',
      reading: 'おつかれさまでした (Otsukaresama deshita!)',
      meaning: 'Anh/chị đã vất vả rồi! (Chuẩn mực toàn quốc)',
      note: 'Tiếng chuẩn Tokyo Hyojungo công sở'
    }
  },
  {
    id: 'kanagawa',
    name: 'Kanagawa',
    jpName: '神奈川県',
    romaji: 'Kanagawa-ken',
    capital: 'Yokohama (横浜)',
    regionId: 'kanto',
    regionName: 'Kanto',
    famousFor: 'Cố đô Mạc phủ Kamakura, cảng quốc tế Yokohama hiện đại, suối khoáng Hakone',
    foodSpecialty: 'Bánh bao xíu mại Shiumai Kiyoken, lẩu bò Gyunabe, cá trích cơm Shirasudon',
    landmark: 'Đại Phật Kamakura Kotoku-in, Phố người Hoa Chukagai, Suối nước nóng Hakone',
    greetingBen: {
      phrase: 'だべ？',
      reading: 'だべ？ (Dabe?)',
      meaning: 'Đúng không nào? / Có phải vậy không? (Kanagawa-ben)',
      note: 'Khẩu ngữ Shonan / Kanagawa phổ biến'
    }
  },
  {
    id: 'chiba',
    name: 'Chiba',
    jpName: '千葉県',
    romaji: 'Chiba-ken',
    capital: 'Chiba (千葉)',
    regionId: 'kanto',
    regionName: 'Kanto',
    famousFor: 'Cửa ngõ sân bay quốc tế Narita, Tokyo Disneyland, bán đảo Boso bờ biển đẹp',
    foodSpecialty: 'Đậu phộng lạc Boso Rakukasei, cá bơn mè kinki, hải sản bờ biển Kujukuri',
    landmark: 'Tokyo Disney Resort, Chùa Naritasan Shinsho-ji, Ngọn đồi Nokogiriyama',
    greetingBen: {
      phrase: 'あんがと',
      reading: 'あんがと (Angato)',
      meaning: 'Cảm ơn nhé! (Dạng rút gọn thân mật Boso-ben)',
      note: 'Phương ngữ Boso miền biển Chiba'
    }
  },
  {
    id: 'saitama',
    name: 'Saitama',
    jpName: '埼玉県',
    romaji: 'Saitama-ken',
    capital: 'Saitama (さいたま)',
    regionId: 'kanto',
    regionName: 'Kanto',
    famousFor: 'Thị trấn cổ thời Edo "Tiểu Edo Kawagoe", làng cây cảnh Bonsai Omiya',
    foodSpecialty: 'Lươn nướng Unagi Urawa, bánh gạo Soka Senbei, mì Chichibu Soba',
    landmark: 'Phố nhà kho cổ Kawagoe Kurazukuri, Thung lũng Nagatoro Chichibu',
    greetingBen: {
      phrase: 'そうなん？',
      reading: 'そうなん？ (Sounan?)',
      meaning: 'Thế á? Thật vậy sao?',
      note: 'Khẩu ngữ giới trẻ vùng Kanto / Saitama'
    }
  },
  {
    id: 'ibaraki',
    name: 'Ibaraki',
    jpName: '茨城県',
    romaji: 'Ibaraki-ken',
    capital: 'Mito (水戸)',
    regionId: 'kanto',
    regionName: 'Kanto',
    famousFor: 'Đậu tương lên men Mito Natto, vườn hoa đồi xanh Kairakuen, Thành phố khoa học Tsukuba',
    foodSpecialty: 'Mito Natto trứ danh, lẩu cá chày Anko-nabe, dưa lưới Ibaraki',
    landmark: 'Vườn Kairakuen (Tam đại danh viên), Thác nước Fukuroda, Công viên Hitachi Seaside',
    greetingBen: {
      phrase: 'なんだっぺ',
      reading: 'なんだっぺ (Nandappe)',
      meaning: 'Cái gì thế nhỉ? / Chuyện gì vậy ta?',
      note: 'Ibaraki-ben cực kỳ đặc trưng với đuôi "ppe"'
    }
  },
  {
    id: 'tochigi',
    name: 'Tochigi',
    jpName: '栃木県',
    romaji: 'Tochigi-ken',
    capital: 'Utsunomiya (宇都宮)',
    regionId: 'kanto',
    regionName: 'Kanto',
    famousFor: 'Quần thể đền chùa lăng mộ Tokugawa Ieyasu tại Nikko, thủ phủ há cảo Gyoza',
    foodSpecialty: 'Há cảo Gyoza Utsunomiya, dâu tây Tochiotome ngọt lịm, váng đậu Yuba Nikko',
    landmark: 'Đền Nikko Toshogu (UNESCO), Thác nước Kegon, Hồ Chuzenji',
    greetingBen: {
      phrase: 'だいじ？',
      reading: 'だいじ？ (Daiji?)',
      meaning: 'Bạn có sao không? Ổn chứ? (Tochigi-ben dùng Daiji = Daijoubu)',
      note: 'Người Tochigi hỏi thăm sức khỏe bằng "Daiji?"'
    }
  },
  {
    id: 'gunma',
    name: 'Gunma',
    jpName: '群馬県',
    romaji: 'Gunma-ken',
    capital: 'Maebashi (前橋)',
    regionId: 'kanto',
    regionName: 'Kanto',
    famousFor: 'Suối khoáng nóng số 1 Nhật Kusatsu Onsen, búp bê may mắn cầu nguyện Daruma',
    foodSpecialty: 'Khoai nưa Konnyaku, mì bản rộng Himokawa Udon, thịt lợn Joshu Mugibuta',
    landmark: 'Khu suối khoáng Kusatsu Yubatake, Nhà máy tơ tằm Tomioka (UNESCO)',
    greetingBen: {
      phrase: 'そうだんべぇ',
      reading: 'そうだんべぇ (Soudanbee)',
      meaning: 'Đúng là như thế rồi còn gì!',
      note: 'Joushuu-ben (Gunma) với âm đuôi "nbee"'
    }
  },

  // 4. CHUBU (9)
  {
    id: 'aichi',
    name: 'Aichi',
    jpName: '愛知県',
    romaji: 'Aichi-ken',
    capital: 'Nagoya (名古屋)',
    regionId: 'chubu',
    regionName: 'Chubu',
    famousFor: 'Thủ phủ chế tạo ô tô toàn cầu Toyota, Lâu đài cá kình vàng Kinshachi Nagoya',
    foodSpecialty: 'Cơm lươn nướng 3 cách Hitsumabushi, gà rán Tebasaki, mì Kishimen Miso',
    landmark: 'Lâu đài Nagoya, Bảo tàng Công nghệ Toyota, Làng gốm Tokoname',
    greetingBen: {
      phrase: 'どえりゃあ美味いがね！',
      reading: 'どえりゃあうまいがね！ (Doeryaa umai gane!)',
      meaning: 'Ngon khủng khiếp luôn đó nha! (Doeryaa = cực kỳ)',
      note: 'Nagoya-ben trứ danh miền Trung'
    }
  },
  {
    id: 'shizuoka',
    name: 'Shizuoka',
    jpName: '静岡県',
    romaji: 'Shizuoka-ken',
    capital: 'Shizuoka (静岡)',
    regionId: 'chubu',
    regionName: 'Chubu',
    famousFor: 'Núi Phú Sĩ linh thiêng (Fuji-san), sản lượng trà xanh số 1 nước Nhật, mô hình Tamiya',
    foodSpecialty: 'Trà xanh Shizuoka, cá ngừ cảng Yaizu, mì xào Fujinomiya Yakisoba, lươn hồ Hamana',
    landmark: 'Núi Phú Sĩ (Đỉnh núi cao nhất Nhật 3776m), Rừng thông Miho no Matsubara',
    greetingBen: {
      phrase: 'いいら？',
      reading: 'いいら？ (Iira?)',
      meaning: 'Tuyệt vời đúng không nào? / Đẹp nhỉ?',
      note: 'Shizuoka-ben êm dịu, dễ mến'
    }
  },
  {
    id: 'nagano',
    name: 'Nagano',
    jpName: '長野県',
    romaji: 'Nagano-ken',
    capital: 'Nagano (長野)',
    regionId: 'chubu',
    regionName: 'Chubu',
    famousFor: 'Nóc nhà Nhật Bản dãy Alps, tỉnh có tuổi thọ cao nhất nước Nhật, táo Shinshu',
    foodSpecialty: 'Mì Shinshu Soba, bánh bao nướng Oyaki, táo Nagano, tương Miso Shinshu',
    landmark: 'Lâu đài quạ đen Matsumoto (Quốc bảo), Chùa Zenko-ji, Công viên khỉ tắm tuyết Jigokudani',
    greetingBen: {
      phrase: 'ずくを出せ',
      reading: 'ずくをだせ (Zuku o dase)',
      meaning: 'Hãy cố gắng dốc hết sức lên! (Zuku = nhiệt huyết, nghị lực)',
      note: 'Shinshu-ben truyền cảm hứng'
    }
  },
  {
    id: 'niigata',
    name: 'Niigata',
    jpName: '新潟県',
    romaji: 'Niigata-ken',
    capital: 'Niigata (新潟)',
    regionId: 'chubu',
    regionName: 'Chubu',
    famousFor: 'Vương quốc gạo thơm Koshihikari số 1, rượu Sake tuyết hảo hạng, xứ tuyết Yukiguni',
    foodSpecialty: 'Gạo Koshihikari Uonuma, rượu Sake Niigata, cá thu hồi béo tuyết Sake-bushi',
    landmark: 'Đảo vàng Sado Kinzan, Thung lũng tuyết Echigo Yuzawa, Ruộng bậc thang Hoshitoge',
    greetingBen: {
      phrase: 'なじらね？',
      reading: 'なじらね？ (Najirane?)',
      meaning: 'Dạo này thế nào rồi? Khỏe không? (Thăm hỏi thân tình)',
      note: 'Echigo-ben ngọt ngào vùng tuyết'
    }
  },
  {
    id: 'gifu',
    name: 'Gifu',
    jpName: '岐阜県',
    romaji: 'Gifu-ken',
    capital: 'Gifu (岐阜)',
    regionId: 'chubu',
    regionName: 'Chubu',
    famousFor: 'Làng cổ tích mái tranh dốc Shirakawa-go (UNESCO), nghệ thuật rèn kiếm katana Seki',
    foodSpecialty: 'Thịt bò Hida Wagyu hảo hạng, cá hương nướng Ayu trên sông Nagara, bánh Hoba Miso',
    landmark: 'Làng cổ Shirakawa-go, Phố cổ Takayama Sanmachi, Lâu đài Gifu trên đỉnh núi Kinkazan',
    greetingBen: {
      phrase: 'おんさい',
      reading: 'おんさい (Onsai)',
      meaning: 'Mời bạn ghé qua nhà chơi nhé!',
      note: 'Hida-Mino-ben ấm cúng vùng cao nguyên'
    }
  },
  {
    id: 'ishikawa',
    name: 'Ishikawa',
    jpName: '石川県',
    romaji: 'Ishikawa-ken',
    capital: 'Kanazawa (金沢)',
    regionId: 'chubu',
    regionName: 'Chubu',
    famousFor: 'Nghệ thuật dát vàng lá Hakuichi (chiếm 99% toàn Nhật), khu vườn Kenrokuen, cố đô Kanazawa',
    foodSpecialty: 'Cua tuyết Kano-gani, kem dát vàng lá nguyên miếng, cơm hải sản Kaisendon Omicho',
    landmark: 'Vườn Kenrokuen (Tam đại danh viên), Khu phố Geisha Higashi Chaya, Lâu đài Kanazawa',
    greetingBen: {
      phrase: 'しましま',
      reading: 'しましま (Shimashima)',
      meaning: 'Xin mời làm đi ạ / Cứ tự nhiên nhé!',
      note: 'Kanazawa-ben quý tộc, thanh nhã'
    }
  },
  {
    id: 'toyama',
    name: 'Toyama',
    jpName: '富山県',
    romaji: 'Toyama-ken',
    capital: 'Toyama (富山)',
    regionId: 'chubu',
    regionName: 'Chubu',
    famousFor: 'Cung đường tuyết vách băng cao ngất Tateyama Kurobe Alpine, mực phát quang Hotaruika',
    foodSpecialty: 'Sushi cá hồi đóng hộp Masuzushi, mực đom đóm phát quang, tôm trắng Shiroebi',
    landmark: 'Bức tường tuyết Tateyama Yuki no Otani, Đập nước khổng lồ Kurobe Dam, Vịnh Toyama',
    greetingBen: {
      phrase: 'きのどくな',
      reading: 'きのどくな (Kinodokuna)',
      meaning: 'Cảm ơn bạn rất nhiều! (Dùng thay Arigatou với lòng biết ơn sâu)',
      note: 'Toyama-ben mang nét độc đáo văn hóa Phật giáo'
    }
  },
  {
    id: 'fukui',
    name: 'Fukui',
    jpName: '福井県',
    romaji: 'Fukui-ken',
    capital: 'Fukui (福井)',
    regionId: 'chubu',
    regionName: 'Chubu',
    famousFor: 'Kinh đô hóa thạch khủng long, 95% gọng kính mắt Nhật Bản làm tại Sabae, cua Echizen',
    foodSpecialty: 'Cua hoàng đế Echizen-gani, mì soba mài củ cải Oroshi Soba, tương cà ri Fukui',
    landmark: 'Vách đá gợn sóng Tojinbo, Chùa tổ Thiền phái Soto Eihei-ji, Bảo tàng Khủng long Fukui',
    greetingBen: {
      phrase: 'ほやほや',
      reading: 'ほやほや (Hoya hoya)',
      meaning: 'Đúng rồi, đúng thế đó! (Tán thành nồng nhiệt)',
      note: 'Fukui-ben với ngữ điệu ngân dài êm ái'
    }
  },
  {
    id: 'yamanashi',
    name: 'Yamanashi',
    jpName: '山梨県',
    romaji: 'Yamanashi-ken',
    capital: 'Kofu (甲府)',
    regionId: 'chubu',
    regionName: 'Chubu',
    famousFor: 'Chân núi Phú Sĩ ngút ngàn, vương quốc nho và rượu vang Koshu Wine, thủ phủ Takeda Shingen',
    foodSpecialty: 'Mì dẹt hầm bí đỏ Houtou, rượu vang Koshu Wine, quả đào trắng Yamanashi',
    landmark: 'Ngũ hồ Phú Sĩ (Kawaguchiko, Yamanakako...), Chùa Chureito Pagoda nhìn ra Phú Sĩ',
    greetingBen: {
      phrase: 'てっ！',
      reading: 'てっ！ (Te!)',
      meaning: 'Ôi trời đất ơi! (Thán từ ngạc nhiên tột độ)',
      note: 'Koshu-ben (Yamanashi) cực kỳ ngộ nghĩnh'
    }
  },

  // 5. KANSAI (7)
  {
    id: 'osaka',
    name: 'Osaka',
    jpName: '大阪府',
    romaji: 'Ōsaka-fu',
    capital: 'Osaka (大阪)',
    regionId: 'kansai',
    regionName: 'Kansai',
    famousFor: 'Nhà bếp thiên hạ Tenka no Daidokoro, văn hóa hài hước Manzai, đại đô thị giao thương',
    foodSpecialty: 'Bánh bạch tuộc Takoyaki, bánh xèo Okonomiyaki, xiên que lăn bột Kushikatsu',
    landmark: 'Lâu đài Osaka Castle, Khu phố đêm Dotonbori Glico Man, Tòa nhà Abeno Harukas',
    greetingBen: {
      phrase: 'まいど！おおきに！',
      reading: 'まいど！おおきに！ (Maido! Ookini!)',
      meaning: 'Chào anh/chị quen! Xin cảm ơn quý khách rất nhiều!',
      note: 'Kansai-ben thương nhân Osaka nổi tiếng nhất thế giới'
    }
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    jpName: '京都府',
    romaji: 'Kyōto-fu',
    capital: 'Kyoto (京都)',
    regionId: 'kansai',
    regionName: 'Kansai',
    famousFor: 'Cố đô ngàn năm của Nhật Bản, cái nôi của trà đạo, mỹ học Zen và văn hóa Geisha',
    foodSpecialty: 'Yudofu đậu phụ hầm thanh đạm, trà xanh Matcha Uji, củ cải ngâm Senmaizuke',
    landmark: 'Chùa Vàng Kinkaku-ji, Đền ngàn cổng đỏ Fushimi Inari, Rừng trúc Arashiyama',
    greetingBen: {
      phrase: 'おいでやす',
      reading: 'おいでやす (Oideyasu)',
      meaning: 'Kính chào quý khách đã đến chơi (Lời chào thanh tao cố đô)',
      note: 'Kyo-kotoba (Kyoto) tao nhã, chuẩn mực lễ nghi'
    }
  },
  {
    id: 'hyogo',
    name: 'Hyogo',
    jpName: '兵庫県',
    romaji: 'Hyōgo-ken',
    capital: 'Kobe (神戸)',
    regionId: 'kansai',
    regionName: 'Kansai',
    famousFor: 'Thịt bò Kobe trứ danh thế giới, Lâu đài Hạc trắng Himeji (UNESCO), cảng biển Kobe sầm uất',
    foodSpecialty: 'Thịt bò Kobe Beef vân cẩm thạch, bánh mì phong cách Âu Kobe Bakery, rượu Sake Nada',
    landmark: 'Lâu đài Himeji (Quốc bảo di sản thế giới), Tháp cảng Kobe Port Tower, Suối nước nóng Arima',
    greetingBen: {
      phrase: '知っとぉ？',
      reading: 'しっとぉ？ (Shittoo?)',
      meaning: 'Bạn có biết điều đó chưa? (Hỏi han nhẹ nhàng)',
      note: 'Kobe-ben nhẹ nhàng pha trộn Kansai hiện đại'
    }
  },
  {
    id: 'nara',
    name: 'Nara',
    jpName: '奈良県',
    romaji: 'Nara-ken',
    capital: 'Nara (奈良)',
    regionId: 'kansai',
    regionName: 'Kansai',
    famousFor: 'Cố đô Heijo-kyo cổ kính hơn cả Kyoto, bầy hươu tự do thân thiện, Đại Phật Todai-ji',
    foodSpecialty: 'Sushi gói lá hồng Kaki no Ha Zushi, mì sợi chỉ Miwa Somen, chè trà Chagayu',
    landmark: 'Công viên hươu Nara Park, Chùa Todai-ji (Công trình gỗ lớn nhất thế giới), Chùa Horyu-ji',
    greetingBen: {
      phrase: 'あかんわ',
      reading: 'あかんわ (Akan wa)',
      meaning: 'Không ổn rồi / Hỏng bét rồi (Kansai kinh điển)',
      note: 'Nara-ben mang nét trầm lắng của đất Phật'
    }
  },
  {
    id: 'shiga',
    name: 'Shiga',
    jpName: '滋賀県',
    romaji: 'Shiga-ken',
    capital: 'Otsu (大津)',
    regionId: 'kansai',
    regionName: 'Kansai',
    famousFor: 'Hồ nước ngọt lớn nhất Nhật Bản Biwako, Lâu đài Quốc bảo Hikone, bò Omi Beef',
    foodSpecialty: 'Thịt bò Omi Wagyu, cá chép lên men Funazushi (ông tổ của sushi), bánh gối Omi',
    landmark: 'Hồ Biwa, Lâu đài Hikone (Quốc bảo còn nguyên vẹn), Chùa Enryaku-ji trên núi Hiei',
    greetingBen: {
      phrase: 'ほな行こか',
      reading: 'ほないこか (Hona iko ka)',
      meaning: 'Nào, thế thì chúng ta cùng xuất phát thôi!',
      note: 'Omi-ben gần gũi với vùng hồ nước'
    }
  },
  {
    id: 'mie',
    name: 'Mie',
    jpName: '三重県',
    romaji: 'Mie-ken',
    capital: 'Tsu (津)',
    regionId: 'kansai',
    regionName: 'Kansai',
    famousFor: 'Thánh địa Thần đạo Ise Jingu thờ Nữ thần Mặt Trời Amaterasu, ninja Iga, ngọc trai Mikimoto',
    foodSpecialty: 'Bò Matsusaka Beef đỉnh cao, tôm hùm Ise Ebi, mì sợi dày Ise Udon',
    landmark: 'Đền Ise Jingu (Ngôi đền thiêng liêng nhất nước Nhật), Làng Ninja Iga Ryu, Vịnh ngọc trai Ago',
    greetingBen: {
      phrase: 'おいない',
      reading: 'おいない (Oinai)',
      meaning: 'Chào mừng bạn đã đến với vùng đất linh thiêng!',
      note: 'Ise-ben đón tiếp khách hành hương'
    }
  },
  {
    id: 'wakayama',
    name: 'Wakayama',
    jpName: '和歌山県',
    romaji: 'Wakayama-ken',
    capital: 'Wakayama (和歌山)',
    regionId: 'kansai',
    regionName: 'Kansai',
    famousFor: 'Con đường hành hương linh thiêng Kumano Kodo (UNESCO), núi thiền Koyasan, quả mơ ngâm Umeboshi',
    foodSpecialty: 'Mơ ngâm Nanko Ume muối đỏ, quýt ngọt Kishu Mikan, mì Ramen Wakayama nước tương hầm xương',
    landmark: 'Thánh địa Phật giáo Mật tông Núi Koya (Koyasan), Đường mòn Kumano Kodo, Thác nước Nachi',
    greetingBen: {
      phrase: 'わい',
      reading: 'わい (Wai)',
      meaning: 'Tôi / Bản thân tôi (Đại từ nhân xưng xưng hô thân mật)',
      note: 'Kishu-ben phóng khoáng phương Nam'
    }
  },

  // 6. CHUGOKU (5)
  {
    id: 'hiroshima',
    name: 'Hiroshima',
    jpName: '広島県',
    romaji: 'Hiroshima-ken',
    capital: 'Hiroshima (広島)',
    regionId: 'chugoku',
    regionName: 'Chugoku',
    famousFor: 'Cổng Torii nổi trên mặt biển đảo Miyajima, Thành phố Hòa bình thế giới, bánh xèo xếp lớp',
    foodSpecialty: 'Bánh xèo Hiroshima-style Okonomiyaki (xếp lớp sợi mì), hàu nướng béo ngậy, bánh Momiji Manju',
    landmark: 'Đền Itsukushima (UNESCO với cổng Torii đỏ rực giữa biển), Công viên Tưởng niệm Hòa bình Genbaku Dome',
    greetingBen: {
      phrase: 'たいぎぃ',
      reading: 'たいぎぃ (Taigii)',
      meaning: 'Mệt mỏi, phiền phức, ngại làm quá đi mất',
      note: 'Hiroshima-ben độc đáo không lẫn vào đâu được'
    }
  },
  {
    id: 'okayama',
    name: 'Okayama',
    jpName: '岡山県',
    romaji: 'Okayama-ken',
    capital: 'Okayama (岡山)',
    regionId: 'chugoku',
    regionName: 'Chugoku',
    famousFor: 'Vương quốc Ánh nắng (Hare no Kuni), quê hương chàng Momotaro Cậu bé Quả Đào, vải bò Jeans Kojima',
    foodSpecialty: 'Đào trắng Hakuto mọng nước, nho mẫu đơn Shine Muscat, cơm hộp hải sản Barazushi',
    landmark: 'Vườn Korakuen (Tam đại danh viên), Khu phố cổ kênh đào Kurashiki Bikan, Lâu đài quạ đen Okayama',
    greetingBen: {
      phrase: 'ぼっけぇ',
      reading: 'ぼっけぇ (Bokkee)',
      meaning: 'Rất / Cực kỳ / Vô cùng (Bokkee umai = Rất ngon)',
      note: 'Okayama-ben với từ "bokkee" nổi tiếng'
    }
  },
  {
    id: 'yamaguchi',
    name: 'Yamaguchi',
    jpName: '山口県',
    romaji: 'Yamaguchi-ken',
    capital: 'Yamaguchi (山口)',
    regionId: 'chugoku',
    regionName: 'Chugoku',
    famousFor: 'Cái nôi sinh ra nhiều Thủ tướng Nhật nhất, cây cầu gỗ 5 nhịp Kintaikyo, cá nóc Fugu trứ danh',
    foodSpecialty: 'Cá nóc Fugu Shimonoseki cắt mỏng hoa cúc, mì ngói nướng Kawara Soba, rượu Sake Dassai',
    landmark: 'Cầu gỗ uốn lượn Kintaikyo (Iwakuni), Đền Motonosumi 123 cổng đỏ sát vách biển, Cầu Tsunoshima',
    greetingBen: {
      phrase: 'ぶちええ',
      reading: 'ぶちええ (Buchi ee)',
      meaning: 'Tuyệt vời vô cùng! / Cực kỳ tốt! (Buchi = Rất)',
      note: 'Yamaguchi-ben với từ nhấn mạnh "Buchi"'
    }
  },
  {
    id: 'tottori',
    name: 'Tottori',
    jpName: '鳥取県',
    romaji: 'Tottori-ken',
    capital: 'Tottori (鳥取)',
    regionId: 'chugoku',
    regionName: 'Chugoku',
    famousFor: 'Đồi cát sa mạc duy nhất Nhật Bản Tottori Sakyu, quê hương tác giả Thám tử lừng danh Conan',
    foodSpecialty: 'Cua hoàng đế Matsuba-gani, quả lê thế kỷ 20 Nijisseiki Nashi, mì thịt bò gân',
    landmark: 'Đồi cát Tottori Sakyu cưỡi lạc đà, Bảo tàng Cát Sand Museum, Bảo tàng Conan Gosho Aoyama',
    greetingBen: {
      phrase: 'だらず',
      reading: 'だらず (Darazu)',
      meaning: 'Đồ ngốc nghếch dở hơi (Trêu đùa thân thiết)',
      note: 'Tottori-ben miền duyên hải Tây Bắc'
    }
  },
  {
    id: 'shimane',
    name: 'Shimane',
    jpName: '島根県',
    romaji: 'Shimane-ken',
    capital: 'Matsue (松江)',
    regionId: 'chugoku',
    regionName: 'Chugoku',
    famousFor: 'Vùng đất của các vị thần (Kamigami no Kuni), ngôi đền xe duyên số 1 Izumo Taisha',
    foodSpecialty: 'Mì kiều mạch Izumo Soba 3 tầng, ngao nước lợ hồ Shinji Shijimi, thịt bò Shimane Wagyu',
    landmark: 'Đền Izumo Taisha (Nơi hội tụ vạn vị thần linh tháng 10 âm lịch), Lâu đài Matsue (Quốc bảo)',
    greetingBen: {
      phrase: 'だんだん',
      reading: 'だんだん (Dandan)',
      meaning: 'Xin cảm ơn anh/chị rất nhiều! (Izumo-ben)',
      note: 'Từ cảm ơn "Dandan" nổi tiếng toàn quốc'
    }
  },

  // 7. SHIKOKU (4)
  {
    id: 'kagawa',
    name: 'Kagawa',
    jpName: '香川県',
    romaji: 'Kagawa-ken',
    capital: 'Takamatsu (高松)',
    regionId: 'shikoku',
    regionName: 'Shikoku',
    famousFor: 'Vương quốc mì sợi Sanuki Udon trứ danh số 1 nước Nhật, đảo nghệ thuật Setouchi Naoshima',
    foodSpecialty: 'Mì Sanuki Udon dai giòn sần sật, đùi gà nướng giòn Honetsukidori, quả ô-liu đảo Shodoshima',
    landmark: 'Vườn Ritsurin (Danh thắng tuyệt mỹ), Đền thờ Konpira-san leo 1.368 bậc thang, Đảo Naoshima',
    greetingBen: {
      phrase: 'なんがでっきょんな',
      reading: 'なんがでっきょんな (Nanga dekkyonna)',
      meaning: 'Dạo này đang làm trò gì đấy? Có gì mới không?',
      note: 'Sanuki-ben (Kagawa) cực kỳ hóm hỉnh'
    }
  },
  {
    id: 'ehime',
    name: 'Ehime',
    jpName: '愛媛県',
    romaji: 'Ehime-ken',
    capital: 'Matsuyama (松山)',
    regionId: 'shikoku',
    regionName: 'Shikoku',
    famousFor: 'Suối nước nóng cổ nhất Nhật 3.000 năm Dogo Onsen, vương quốc cam quýt Mikan mọng nước',
    foodSpecialty: 'Cơm cá tráp biển Tai-meshi béo ngậy, quýt ngọt Iyokan/Mikan, khăn bông cao cấp Imabari Towel',
    landmark: 'Nhà tắm cổ Dogo Onsen Honkan (Nguyên mẫu Spirited Away), Lâu đài Matsuyama, Cầu đạp xe Shimanami Kaido',
    greetingBen: {
      phrase: 'だんだん',
      reading: 'だんだん (Dandan)',
      meaning: 'Cảm ơn bạn nhiều nhé (Tương tự vùng lân cận)',
      note: 'Iyo-ben (Ehime) dịu dàng, trìu mến'
    }
  },
  {
    id: 'tokushima',
    name: 'Tokushima',
    jpName: '徳島県',
    romaji: 'Tokushima-ken',
    capital: 'Tokushima (徳島)',
    regionId: 'shikoku',
    regionName: 'Shikoku',
    famousFor: 'Điệu nhảy cuồng nhiệt 400 năm Awa Odori "Kẻ nhảy là ngốc, kẻ đứng xem cũng là ngốc", xoáy nước Naruto',
    foodSpecialty: 'Mì Tokushima Ramen chan trứng sống béo ngậy, gà thả vườn Awa Odori Jidori, chanh quả Sudachi',
    landmark: 'Vòng xoáy nước khổng lồ Naruto Uzushio, Thung lũng hoang sơ Iya với cầu dây leo Kazurabashi',
    greetingBen: {
      phrase: 'やっとさー！',
      reading: 'やっとさー！ (Yattosaa!)',
      meaning: 'Hô vang khẩu hiệu phấn khích trong lễ hội nhảy múa Awa Odori!',
      note: 'Tiếng hô bất hủ của lễ hội Awa Odori'
    }
  },
  {
    id: 'kochi',
    name: 'Kochi',
    jpName: '高知県',
    romaji: 'Kōchi-ken',
    capital: 'Kochi (高知)',
    regionId: 'shikoku',
    regionName: 'Shikoku',
    famousFor: 'Quê hương người anh hùng đổi mới Minh Trị Sakamoto Ryoma, lễ hội nhảy múa hiện đại Yosakoi',
    foodSpecialty: 'Cá ngừ vằn nướng rơm rực lửa Katsuo no Tataki, gà chọi Shamo nướng, rượu Sake cay nồng',
    landmark: 'Bãi biển Katsurahama với tượng đài Sakamoto Ryoma, Lâu đài Kochi Castle, Dòng sông trong vắt Shimanto',
    greetingBen: {
      phrase: 'こじゃんと',
      reading: 'こじゃんと (Kojanto)',
      meaning: 'Hết sức mình / Tới bến luôn (Kojanto ganbaru = Nỗ lực hết sức)',
      note: 'Tosa-ben hào sảng của vùng đất Kochi'
    }
  },

  // 8. KYUSHU & OKINAWA (8)
  {
    id: 'fukuoka',
    name: 'Fukuoka',
    jpName: '福岡県',
    romaji: 'Fukuoka-ken',
    capital: 'Fukuoka (Hakata 福岡)',
    regionId: 'kyushu',
    regionName: 'Kyushu - Okinawa',
    famousFor: 'Cửa ngõ châu Á, văn hóa quán ăn vỉa hè Yatai ven sông rực sáng, thành phố khởi nghiệp',
    foodSpecialty: 'Mì Hakata Tonkotsu Ramen xương hầm đậm đà, trứng cá tuyết cay Mentaiko, lẩu lòng bò Motsunabe',
    landmark: 'Dãy quán ăn vỉa hè Yatai Nakasu, Đền học vấn Dazaifu Tenmangu, Tháp Fukuoka Tower',
    greetingBen: {
      phrase: 'バリ好いとうよ！',
      reading: 'ばりすいとうよ！ (Bari suitou yo!)',
      meaning: 'Tôi cực kỳ thích/yêu bạn đó nha! (Bari = Rất)',
      note: 'Hakata-ben đứng đầu bảng xếp hạng phương ngữ dễ thương nhất nước Nhật'
    }
  },
  {
    id: 'nagasaki',
    name: 'Nagasaki',
    jpName: '長崎県',
    romaji: 'Nagasaki-ken',
    capital: 'Nagasaki (長崎)',
    regionId: 'kyushu',
    regionName: 'Kyushu - Okinawa',
    famousFor: 'Cửa ngõ giao thương phương Tây duy nhất thời bế quan tỏa cảng Dejima, đêm pháo hoa rực rỡ',
    foodSpecialty: 'Mì hải sản Champon Nagasaki, mì giòn Sara Udon, bánh bông lan mật ong Castella',
    landmark: 'Công viên Hòa bình Nagasaki Heiwa Koen, Đảo chiến hạm hoang tàn Gunkanjima, Vườn Glover Garden',
    greetingBen: {
      phrase: 'すいとっと',
      reading: 'すいとっと (Suitotto)',
      meaning: 'Mình đang thích/yêu người đó đấy!',
      note: 'Nagasaki-ben ngọt ngào miền duyên hải'
    }
  },
  {
    id: 'kumamoto',
    name: 'Kumamoto',
    jpName: '熊本県',
    romaji: 'Kumamoto-ken',
    capital: 'Kumamoto (熊本)',
    regionId: 'kyushu',
    regionName: 'Kyushu - Okinawa',
    famousFor: 'Linh vật nổi tiếng toàn cầu Gấu đen má đỏ Kumamon, Lâu đài kiên cố bất khả xâm phạm Kumamoto',
    foodSpecialty: 'Thịt ngựa sống mỏng Basashi, củ sen nhồi mù tạt Karashi Renkon, mì tỏi nướng Kumamoto Ramen',
    landmark: 'Lâu đài Kumamoto Castle, Miệng núi lửa khổng lồ Aso Nakadake, Vườn cổ Suizenji Jojuen',
    greetingBen: {
      phrase: 'わさもん',
      reading: 'わさもん (Wasamon)',
      meaning: 'Người luôn say mê chạy theo những thứ mới mẻ, cấp tiến',
      note: 'Higo-ben (Kumamoto) mô tả tính cách cởi mở'
    }
  },
  {
    id: 'oita',
    name: 'Oita',
    jpName: '大分県',
    romaji: 'Ōita-ken',
    capital: 'Oita (大分)',
    regionId: 'kyushu',
    regionName: 'Kyushu - Okinawa',
    famousFor: 'Thủ phủ suối khoáng nóng số 1 Nhật Bản về lưu lượng "Suối nước nóng Onsen Ken", Beppu & Yufuin',
    foodSpecialty: 'Gà rán giòn Toriten, chanh dẹt Kabosu chua thơm, bò Bungo Wagyu nướng đá',
    landmark: 'Khu 7 địa ngục suối khoáng nóng Beppu Jigoku Meguri, Phố lữ quán cổ Yufuin Yunotsubo Kaido',
    greetingBen: {
      phrase: 'いっちょんわからん',
      reading: 'いっちょんわからん (Icchon wakaran)',
      meaning: 'Chẳng hiểu cái gì hết trơn hết trọi luôn!',
      note: 'Oita-ben với ngữ điệu độc đáo'
    }
  },
  {
    id: 'saga',
    name: 'Saga',
    jpName: '佐賀県',
    romaji: 'Saga-ken',
    capital: 'Saga (佐賀)',
    regionId: 'kyushu',
    regionName: 'Kyushu - Okinawa',
    famousFor: 'Cái nôi đồ gốm sứ tinh hoa Arita-yaki & Imari-yaki hơn 400 năm, lễ hội khinh khí cầu quốc tế',
    foodSpecialty: 'Thịt bò Saga Wagyu vân mỡ tuyệt hảo, mực nang trong suốt Yobuko Ika, rong biển Saga Nori',
    landmark: 'Thị trấn lò gốm cổ Arita, Di tích kinh đô cổ thời Yayoi Yoshinogari, Chợ cá Yobuko Morning Market',
    greetingBen: {
      phrase: 'がばい',
      reading: 'がばい (Gabai)',
      meaning: 'Vô cùng / Rất nhiều (Gabai Sugoi = Quá sức phi thường)',
      note: 'Saga-ben nổi tiếng qua cuốn sách "Người bà tài giỏi vùng Saga"'
    }
  },
  {
    id: 'miyazaki',
    name: 'Miyazaki',
    jpName: '宮崎県',
    romaji: 'Miyazaki-ken',
    capital: 'Miyazaki (宮崎)',
    regionId: 'kyushu',
    regionName: 'Kyushu - Okinawa',
    famousFor: 'Khí hậu nhiệt đới nắng ấm quanh năm, vùng đất huyền thoại Thần thoại Thiên hoàng đầu tiên',
    foodSpecialty: 'Gà chiên sốt giấm chua ngọt sốt trứng Nanban, thịt bò Miyazaki Beef vô địch Nhật Bản, xoài Taiyo no Tamago',
    landmark: 'Hẻm núi thiêng Takachiho Gorge chèo thuyền ngắm thác, Đền Udo Jingu trong hang đá ven biển',
    greetingBen: {
      phrase: 'てげてげ',
      reading: 'てげてげ (Tegetege)',
      meaning: 'Vừa phải thôi, túc tắc thôi, đừng quá căng thẳng nha',
      note: 'Miyazaki-ben thể hiện tinh thần sống an nhiên nắng ấm'
    }
  },
  {
    id: 'kagoshima',
    name: 'Kagoshima',
    jpName: '鹿児島県',
    romaji: 'Kagoshima-ken',
    capital: 'Kagoshima (鹿児島)',
    regionId: 'kyushu',
    regionName: 'Kyushu - Okinawa',
    famousFor: 'Núi lửa phun tro hoạt động Sakurajima, quê hương thủ lĩnh võ sĩ Saigo Takamori "Người Samurai cuối cùng"',
    foodSpecialty: 'Thịt heo đen Kurobuta nướng than, rượu khoai nồng nàn Imo Shochu, chả cá chiên Satsuma-age',
    landmark: 'Núi lửa Sakurajima bốc khói giữa vịnh, Tắm cát nóng bờ biển Ibusuki Sand Bath, Đảo rừng cổ Yakushima',
    greetingBen: {
      phrase: 'チェスト！',
      reading: 'ちぇすと！ (Chesuto!)',
      meaning: 'Tiếng thét xông trận dũng mãnh của các kiếm sĩ Jigen-ryu Satsuma Samurai!',
      note: 'Satsuma-ben khí phách anh hùng bất khuất'
    }
  },
  {
    id: 'okinawa',
    name: 'Okinawa',
    jpName: '沖縄県',
    romaji: 'Okinawa-ken',
    capital: 'Naha (那覇)',
    regionId: 'kyushu',
    regionName: 'Kyushu - Okinawa',
    famousFor: 'Di sản Vương quốc Ryukyu, hòn đảo trường thọ thiên đường biển san hô xanh ngọc, đàn Sanshin',
    foodSpecialty: 'Mướp đắng xào trứng đậu phụ Goya Champuru, mì Okinawa Soba sườn heo, rượu gạo Awamori, đường đen Kokuto',
    landmark: 'Lâu đài hoàng gia Shuri Castle (UNESCO), Thủy cung Churaumi Aquarium khổng lồ, Đảo ngọc Ishigaki',
    greetingBen: {
      phrase: 'はいさい！ (Nam) / はいたい！ (Nữ)',
      reading: 'はいさい / はいたい (Haisai / Haitai!)',
      meaning: 'Xin chào mọi người! (Lời chào vui vẻ đảo ngọc Okinawa)',
      note: 'Ngôn ngữ vương quốc đảo Ryukyu-go độc đáo'
    }
  }
];
