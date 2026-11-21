import { ThematicWord } from './types';

export type LoadMoreCategory = 'general' | 'advanced' | 'practical' | 'collocation';

// Topic-specific supplemental pools for the "+5 Tải thêm" feature
const BONUS_POOL_MAP: Record<string, Array<[string, string, string, string, string, 'N5' | 'N4' | 'N3' | 'N2' | 'N1', string, string]>> = {
  'topic-1-family': [
    ['長男 / 長女', 'ちょうなん / ちょうじょ', 'chounan / choujo', 'Trưởng nam / Trưởng nữ', 'Con trai trưởng / Con gái đầu lòng', 'N3', '長男として一家の責任をしっかりと背負う。', 'Gánh vác trọng trách gia đình với tư cách là con trai trưởng.'],
    ['次男 / 次女', 'じなん / じじょ', 'jinan / jijo', 'Thứ nam / Thứ nữ', 'Con trai thứ hai / Con gái thứ hai', 'N3', '兄と仲が良い活発な次男坊。', 'Cậu con trai thứ hai hoạt bát rất thân thiết với anh trai.'],
    ['末っ子', 'すえっこ', 'suekko', 'Mạt tử', 'Con út trong gia đình', 'N3', '家族みんなに可愛がられて育った末っ子。', 'Đứa con út lớn lên trong vòng tay yêu thương chiều chuộng của cả nhà.'],
    ['一人っ子', 'ひとりっこ', 'hitorikko', 'Nhất nhân tử', 'Con một, không có anh chị em', 'N3', '一人っ子だから自分の部屋を独り占めできた。', 'Vì là con một nên được sở hữu trọn vẹn cả căn phòng riêng.'],
    ['双子 / 三つ子', 'ふたご / みつご', 'futago / mitsugo', 'Song tử / Tam tử', 'Cặp sinh đôi / Sinh ba cùng trứng', 'N3', '顔も声もそっくりで見分けがつかない双子の兄弟。', 'Cặp anh em sinh đôi giống hệt nhau cả về gương mặt lẫn giọng nói.'],
    ['義理の父母', 'ぎりのふぼ', 'giri no fubo', 'Nghĩa lý phụ mẫu', 'Bố mẹ vợ / Bố mẹ chồng', 'N2', '結婚後に義理の父母と同居して親孝行をする。', 'Sống chung phụng dưỡng bố mẹ chồng sau khi kết hôn.'],
    ['親族 / 親類', 'しんぞく / しんるい', 'shinzoku / shinrui', 'Thân tộc / Thân loại', 'Bà con họ hàng xa gần', 'N3', 'お盆と正月に親族一同が集まって会食する。', 'Họ hàng gần xa sum họp ăn bữa cơm ấm cúng dịp lễ Obon và Tết.'],
    ['跡継ぎ / 後継者', 'あとつぎ / こうけいしゃ', 'atotsugi / koukeisha', 'Tích kế / Hậu kế giả', 'Người thừa kế / Nối nghiệp gia đình', 'N2', '老舗旅館の立派な跡継ぎとして修業に励む。', 'Chăm chỉ tu nghiệp để trở thành người nối nghiệp xứng đáng của lữ quán lâu đời.'],
    ['親孝行 / 親不孝', 'おやこうこう / おやふこう', 'oyakoukou / oyafukou', 'Thân hiếu hành / Thân bất hiếu', 'Lòng hiếu thảo / Sự bất hiếu với cha mẹ', 'N3', '初任給で両親を旅行に招待して親孝行をした。', 'Dùng tháng lương đầu tiên mời bố mẹ đi du lịch để báo hiếu.'],
    ['一家団欒', 'いっかだんらん', 'ikkadanran', 'Nhất gia đoàn loan', 'Gia đình sum họp đầm ấm bên nhau', 'N1', '週末の夜に一家団欒のひとときを心ゆくまで楽しむ。', 'Tận hưởng trọn vẹn những phút giây gia đình sum họp đầm ấm vào tối cuối tuần.']
  ],
  'topic-2-time': [
    ['一昨日 / 昨夜', 'おととい / ゆうべ', 'ototoi / yuube', 'Tạc dạ', 'Hôm kia / Đêm hôm qua', 'N5', '昨夜見た夢の続きが気になって仕方がない。', 'Cứ băn khoăn mãi về đoạn kết của giấc mơ đêm qua.'],
    ['明後日 / 明々後日', 'あさって / しあさって', 'asatte / shiasatte', 'Minh hậu nhật', 'Ngày mốt (hôm kia) / Ngày kìa', 'N4', '明後日の午前中に宅配便が届く予定です。', 'Dự kiến sáng ngày kia bưu phẩm chuyển phát nhanh sẽ tới.'],
    ['正午 / 白昼', 'しょうご / はくちゅう', 'shougo / hakuchuu', 'Chính ngọ / Bạch trú', 'Đúng 12 giờ trưa tròn / Ban ngày ban mặt', 'N3', '正午の時報に合わせて時計の針を合わせる。', 'Chỉnh kim đồng hồ đúng theo tín hiệu báo giờ 12 giờ trưa.'],
    ['夜更け / 深夜帯', 'よふけ / しんやたい', 'yofuke / shinyatai', 'Dạ canh / Thâm dạ đới', 'Đêm khuya thanh vắng', 'N3', '夜更けに窓の外から冷たい秋風が吹き込む。', 'Gió thu lạnh luốt thổi qua khung cửa sổ lúc đêm khuya thanh vắng.'],
    ['うるう年 / 閏年', 'うるうどし', 'uruudoshi', 'Nhuận niên', 'Năm nhuận có ngày 29 tháng 2', 'N2', '四年に一度巡ってくる2月29日のあるうるう年。', 'Năm nhuận 4 năm một lần mới xuất hiện ngày 29 tháng 2.'],
    ['四六時中', 'しろくじちゅう', 'shirokujichuu', 'Tứ lục thời trung', 'Suốt 24/24 giờ, ngày đêm không ngừng', 'N1', '試験前で四六時中教科書とにらめっこしている。', 'Trước kỳ thi cứ dán mắt vào sách giáo khoa suốt ngày đêm.'],
    ['光陰矢の如し', 'こういんやのごとし', 'kouin ya no gotoshi', 'Quang âm tiễn như', 'Thời gian thoi đưa tựa tên bay', 'N1', '光陰矢の如しで、あっという間に留学生活が終わった。', 'Thời gian trôi như thoi đưa, chớp mắt cuộc sống du học đã khép lại.']
  ],
  'topic-3-weather': [
    ['木枯らし', 'こがらし', 'kogarashi', 'Mộc khô', 'Gió đông đầu mùa xao xác lá rụng', 'N2', '木枯らしが吹きすさび冬の到来を告げる。', 'Gợn gió đầu đông xao xác báo hiệu mùa đông giá buốt đã về.'],
    ['春一番', 'はるいちばん', 'haruichiban', 'Xuân nhất phiên', 'Cơn gió ấm áp đầu xuân phương Nam', 'N2', '春一番が吹き荒れて気温が一気に上昇した。', 'Cơn gió ấm áp đầu xuân tràn về làm nền nhiệt tăng vọt.'],
    ['五月雨 / さみだれ', 'さみだれ', 'samidare', 'Ngũ nguyệt vũ', 'Cơn mưa rào đầu hạ tháng Năm âm lịch', 'N2', '五月雨を集めて早し最上川と詠んだ芭蕉の句。', 'Câu thơ haiku của Basho tả dòng sông Mogami cuồn cuộn nước mưa hạ.'],
    ['小春日和', 'こはるびより', 'koharubiyori', 'Tiểu xuân nhật hòa', 'Tiết trời ấm áp dễ chịu giữa đầu đông', 'N2', '穏やかな小春日和の午後に庭の手入れをする。', 'Tỉa tót cành hoa trong vườn vào một buổi chiều đầu đông ấm áp hiếm hoi.'],
    ['朝焼け / 夕焼け', 'あさやけ / ゆうやけ', 'asayake / yuuyake', 'Triều thiêu / Tịch thiêu', 'Ráng hồng bình minh / Ánh hoàng hôn đỏ rực', 'N3', '夕焼け空に富士山の美しいシルエットが浮かぶ。', 'Bóng núi Phú Sĩ hiện rõ uy nghiêm trên nền trời hoàng hôn rực rỡ.'],
    ['ゲリラ豪雨', 'げりらごうう', 'gerira gouu', 'Hào vũ', 'Mưa giông bất chợt cục bộ xối xả', 'N2', '都心を襲ったゲリラ豪雨で地下道が冠水した。', 'Trận mưa giông cục bộ trút nước xuống trung tâm làm hầm chui ngập sâu.']
  ],
  'topic-4-colors-shapes': [
    ['茜色 / 夕焼け色', 'あかねいろ', 'akaneiro', 'Thiến sắc', 'Sắc đỏ thắm của ráng chiều tà', 'N2', '茜色に染まる夕暮れの空を見上げて佇む。', 'Đứng lặng ngắm nhìn bầu trời chiều buông nhuộm màu đỏ thắm.'],
    ['山吹色', 'やまぶきいろ', 'yamabukiiro', 'Sơn xuy sắc', 'Màu vàng hoa Yamabuki rực rỡ', 'N2', '小判の輝きに例えられる鮮やかな山吹色。', 'Sắc vàng óng ả rực rỡ tựa như ánh sáng lấp lánh của đồng tiền vàng.'],
    ['萌黄色 / 若草色', 'もえぎいろ / わかくさいろ', 'moegiiro / wakakusairo', 'Manh hoàng sắc', 'Màu mầm non xanh mướt đầu xuân', 'N2', '早春の野山を彩る柔らかな萌黄色の若芽。', 'Những chồi non sắc xanh nõn nà điểm tô non nước đầu xuân.'],
    ['瑠璃色', 'るりいろ', 'ruriiro', 'Lưu ly sắc', 'Màu xanh ngọc lưu ly thẳm sâu', 'N2', '深海のように神秘的な輝きを放つ瑠璃色の宝石。', 'Viên ngọc màu xanh lưu ly tỏa ánh sáng huyền bí như lòng biển sâu.'],
    ['円柱 / 円錐', 'えんちゅう / えんすい', 'enchuu / ensui', 'Viên trụ / Viên trùy', 'Hình trụ tròn / Hình nón chóp nhọn', 'N2', '円柱状の頑丈なコンクリート橋脚を打ち込む。', 'Đổ khối trụ bê tông tròn kiên cố làm mố đỡ cho cây cầu lớn.']
  ],
  'topic-5-position-direction': [
    ['最寄り / 最寄駅', 'もより / もよりえき', 'moyori / moyorieki', 'Tối ký', 'Gần nhất / Nhà ga tàu gần nhất', 'N3', '最寄駅から徒歩わずか3分の好立地マンション。', 'Căn hộ chung cư ở vị trí đắc địa chỉ cách ga tàu gần nhất 3 phút đi bộ.'],
    ['対角線上', 'たいかくせんじょう', 'taikakusenjou', 'Đối giác tuyến thượng', 'Nằm trên đường chéo góc đối diện', 'N2', '部屋の対角線上に家具を配置して広がりを出す。', 'Bố trí nội thất chéo góc để tạo cảm giác không gian rộng rãi hơn.'],
    ['隣接 / 境目', 'りんせつ / さかいめ', 'rinsetsu / sakaime', 'Lân tiếp / Cảnh mục', 'Tiếp giáp liền kề / Ranh giới phân định', 'N2', '公園に隣接した静かで緑豊かな住環境。', 'Môi trường sống yên bình nhiều cây xanh nằm sát ngay công viên.'],
    ['真正面', 'ましょうめん', 'mashoumen', 'Chân chính diện', 'Đối diện thẳng ngay trước mặt', 'N3', '駅の改札を出た真正面に交番があります。', 'Đi qua cửa soát vé ga sẽ thấy ngay đồn công an nằm thẳng trước mặt.'],
    ['行き止まり', 'いきどまり', 'ikidomari', 'Hành chỉ', 'Đường cụt không có lối ra', 'N3', '路地を奥まで進んだが行き止まりで引き返した。', 'Đi sâu vào ngõ nhỏ nhưng gặp đường cụt nên đành quay lại.']
  ],
  'topic-6-emotions': [
    ['切ない / 哀愁', 'せつない / あいしゅう', 'setsunai / aishuu', 'Thiết / Ai sầu', 'Nỗi buồn da diết man mác ngậm ngùi', 'N2', '秋風に吹かれながら切ない思い出に浸る。', 'Gió thu heo hắt thổi gợi lại những kỷ niệm da diết ngậm ngùi.'],
    ['もどかしい / 歯がゆい', 'もどかしい / はがゆい', 'modokashii / hagayui', '', 'Bứt rứt bức bối vì chưa đạt như ý', 'N2', '言いたいことがうまく外国語で伝わらずもどかしい。', 'Cảm thấy bứt rứt bức bối khi không diễn đạt trôi chảy ý mình bằng ngoại ngữ.'],
    ['すがすがしい / 清々しい', 'すがすがしい', 'sugasugashii', 'Thanh thanh', 'Sảng khoái trong lành tinh khôi', 'N3', '早朝の高原で吸い込む清々しい空気。', 'Hít căng lồng ngực bầu không khí trong lành thanh khiết trên cao nguyên sớm mai.'],
    ['いたたまれない', 'いたたまれない', 'itatamarenai', '', 'Áy náy day dứt không thể ngồi yên', 'N1', '自分の不注意で迷惑をかけてしまいいたたまれない。', 'Cảm thấy day dứt áy náy khôn nguôi vì sơ suất của mình làm phiền mọi người.'],
    ['感無量', 'かんむりょう', 'kammuryou', 'Cảm vô lượng', 'Xúc động vô bờ bến trào dâng', 'N2', '長年の夢が結実した瞬間、感無量で涙があふれた。', 'Nước mắt xúc động nghẹn ngào tuôn rơi khoảnh khắc ước mơ bấy lâu thành hiện thực.']
  ],
  'topic-7-body-health': [
    ['倦怠感 / だるさ', 'けんたいかん', 'kentaikan', 'Quyện đãi cảm', 'Cảm giác mệt mỏi rã rời toàn thân', 'N2', '風邪の初期症状として激しい倦怠感を覚える。', 'Thấy toàn thân uể oải rã rời như triệu chứng đầu tiên của cảm cúm.'],
    ['動悸 / 息切れ', 'どうき / いきぎれ', 'douki / ikigire', 'Động quý / Tức thiết', 'Tim đập thình thịch / Hụt hơi thở dốc', 'N2', '階段を駆け上がると激しい動悸と息切れがする。', 'Chạy vội lên cầu thang khiến tim đập thình thịch và thở dốc hụt hơi.'],
    ['処方箋 / 調剤', 'しょほうせん / ちょうざい', 'shohousen / chouzai', 'Xử phương tiên / Điều tễ', 'Đơn thuốc bác sĩ / Bốc thuốc theo toa', 'N2', '病院の処方箋を持って調剤薬局で薬を受け取る。', 'Cầm đơn thuốc của bệnh viện ra nhà thuốc để nhận thuốc.'],
    ['免疫力向上', 'めんえきりょくこうじょう', 'men\'ekiryoku koujou', 'Miễn dịch lực', 'Nâng cao sức đề kháng hệ miễn dịch', 'N2', '規則正しい睡眠と発酵食品で免疫力を向上させる。', 'Nâng cao sức đề kháng bằng giấc ngủ điều độ và thực phẩm lên men.'],
    ['未病を防ぐ', 'みびょうをふせぐ', 'mibyou o fusegu', 'Vị bệnh', 'Phòng ngừa bệnh tật từ giai đoạn sớm', 'N1', '東洋医学の知恵を取り入れて未病を防ぐ。', 'Ứng dụng tri thức y học phương Đông để phòng ngừa bệnh từ sớm.']
  ],
  'topic-8-food': [
    ['隠し味', 'かくしあじ', 'kakushiaji', 'Ẩn vị', 'Gia vị bí mật nêm tạo độ đậm đà sâu lắng', 'N2', 'カレーにチョコレートを少量加えて隠し味にする。', 'Thêm một chút socola vào cà ri làm gia vị bí mật dậy mùi thơm.']
  ],
  'topic-15-office': [
    ['稟議書 / 決裁', 'りんぎしょ / けっさい', 'ringisho / kessai', 'Bẩm nghị thư / Quyết tài', 'Tờ trình phê duyệt nội bộ công ty', 'N1', '新規事業の予算獲得のため稟議書を起案して回覧。', 'Soạn tờ trình xin phê duyệt ngân sách cho dự án kinh doanh mới.'],
    ['根回しを欠かさない', 'ねまわしをかかさない', 'nemawashi o kakasanai', 'Căn hồi', 'Vận động ngầm dàn xếp hành lang trước', 'N1', '重要会議の前に主要役員への根回しを欠かさない。', 'Không quên bàn bạc vận động hành lang trước với các ủy viên chủ chốt.']
  ],
  'topic-23-tech-engineering': [
    ['超精密加工', 'ちょうせいみつかこう', 'chouseimitsukakou', 'Siêu tinh mật gia công', 'Gia công siêu chính xác cấp độ sub-micron', 'N1', '航空宇宙産業向けの超精密加工技術を開発。', 'Phát triển công nghệ gia công siêu chính xác cho ngành hàng không vũ trụ.'],
    ['分散型台帳', 'ぶんさんがただいちょう', 'bunsangatadaichou', 'Phân tán hình thai trướng', 'Sổ cái phân tán Blockchain bảo mật', 'N1', '改ざん不可能な分散型台帳技術で契約を記録。', 'Ghi lại hợp đồng bằng công nghệ sổ cái phân tán không thể giả mạo.'],
    ['予兆保全 / 予知保全', 'よちょうほぜん', 'yochouhozen', 'Dự triệu bảo toàn', 'Bảo trì dự đoán dựa trên cảm biến IoT', 'N2', 'AI振動解析でモーターの故障を予兆保全する。', 'Bảo trì dự đoán sự cố động cơ bằng phân tích độ rung dùng AI.']
  ],
  'topic-25-economy-law': [
    ['金融緩和政策', 'きんゆうかんわせいさく', 'kin\'yuukanwaseisaku', 'Kim dung hoãn hòa', 'Chính sách nới lỏng định lượng tiền tệ', 'N1', '景気刺激のため異次元の金融緩和を継続する。', 'Tiếp tục thực hiện chính sách nới lỏng tiền tệ đặc biệt để kích thích kinh tế.'],
    ['善管注意義務', 'ぜんかんちゅういぎむ', 'zenkanchuui gimu', 'Thiện quản chú ý', 'Nghĩa vụ chú ý của người quản lý mẫn cán', 'N1', '取締役として善管注意義務を果たし経営判断を行う。', 'Làm tròn trách nhiệm người quản lý mẫn cán khi đưa ra quyết sách kinh doanh.']
  ],
  'topic-jpt-mastery': [
    ['差配 / 配慮', 'さはい / はいりょ', 'sahai / hairyo', 'Sai phối / Phối lự', 'Sự sắp xếp phân công công việc / Sự quan tâm chu đáo', 'N1', '現場監督の巧みな差配により、工程の遅れを取り戻した。', 'Nhờ sự sắp xếp công việc khéo léo của quản đốc công trường, chúng tôi đã bù lại được tiến độ bị chậm.'],
    ['適宜', 'てきぎ', 'tekigi', 'Thích nghi', 'Tùy cơ ứng biến, linh hoạt tùy tình huống thực tế', 'N1', '各自の判断で適宜休憩を取りながら作業を進めてください。', 'Hãy tự giác linh hoạt sắp xếp thời gian nghỉ giải lao phù hợp trong quá trình làm việc.'],
    ['遺憾の意', 'いかんのい', 'ikan no i', 'Di hám chi ý', 'Bày tỏ sự đáng tiếc và xin lỗi sâu sắc', 'N1', '今回の情報流出事案に対し、経営陣一同深く遺憾の意を表明した。', 'Toàn thể ban lãnh đạo bày tỏ sự đáng tiếc sâu sắc đối với sự cố rò rỉ thông tin lần này.'],
    ['債務不履行', 'さいむふりこう', 'saimu furikou', 'Trái vụ bất lữ hành', 'Vi phạm nghĩa vụ trả nợ / Phá vỡ điều khoản hợp đồng', 'N1', '期日までに納品されず、重大な債務不履行として損害賠償を請求した。', 'Do không giao hàng đúng hạn, chúng tôi đã khởi kiện yêu cầu bồi thường thiệt hại vì vi phạm nghiêm trọng nghĩa vụ hợp đồng.'],
    ['不測の事態', 'ふそくのじたい', 'fusoku no jitai', 'Bất trắc chi sự thái', 'Tình huống bất trắc bất ngờ ngoài dự kiến', 'N1', '不測の事態に備えて、事業継続計画（BCP）を策定しておく。', 'Lập kế hoạch duy trì kinh doanh (BCP) để chủ động ứng phó với các tình huống bất trắc bất ngờ.'],
    ['善処する', 'ぜんしょする', 'zensho suru', 'Thiện xứ', 'Cố gắng xử lý thỏa đáng hết sức trong khả năng', 'N1', 'ご指摘いただきました懸念事項につきましては、至急善処いたします。', 'Về những điểm quan ngại mà quý vị đã chỉ ra, chúng tôi xin phép sẽ cố gắng xử lý thỏa đáng trong thời gian sớm nhất.'],
    ['遺漏のないよう', 'いろうのないよう', 'irou no nai you', 'Di lậu', 'Đảm bảo không để xảy ra bất kỳ sai sót hay sơ hở nào', 'N1', '契約書の条項を細部まで精査し、遺漏のないよう確認を徹底する。', 'Rà soát kỹ lưỡng chi tiết từng điều khoản của hợp đồng để đảm bảo tuyệt đối không có sơ hở thiếu sót.'],
    ['鋭意努力', 'えいいどりょく', 'eii doryoku', 'Nhuệ ý nỗ lực', 'Nỗ lực hết mình nhiệt tâm nhiệt huyết để đạt mục tiêu', 'N1', '一日も早い納期の前倒しに向けて、全社一丸となり鋭意努力いたします。', 'Toàn thể công ty đang đồng lòng nỗ lực hết mình hướng tới việc rút ngắn tiến độ bàn giao sớm nhất có thể.'],
    ['身の引き締まる思い', 'みのひきしまるおもい', 'mi no hikishimaru omoi', 'Thân', 'Cảm giác tinh thần trách nhiệm căng tràn và vô cùng nghiêm túc', 'N1', '重責ある大役を拝命し、身の引き締まる思いで職務に邁進いたします。', 'Được giao phó trọng trách lớn lao, tôi bước vào công việc với tinh thần trách nhiệm nghiêm túc và quyết tâm cao độ.'],
    ['根回しに奔走する', 'ねまわしにほんそうする', 'nemawashi ni honsou suru', 'Căn hồi bôn tẩu', 'Chạy đôn chạy đáo vận động hành lang trước cuộc họp', 'N1', '株主総会での議案通過に向けて、事前に根回しに奔走した。', 'Chạy đôn chạy đáo vận động hành lang trước cuộc họp đại hội cổ đông để nghị quyết được thuận lợi thông qua.'],
    ['後手後手に回る', 'ごてごてにまわる', 'gotegote ni mawaru', 'Hậu thủ', 'Bị động rơi vào thế chậm chân đối phó lúng túng', 'N1', '初動対応が遅れた結果、競合の攻勢に対して後手後手に回ってしまった。', 'Do phản ứng ban đầu chậm trễ nên chúng ta đã rơi vào thế bị động đi sau đối thủ cạnh tranh.'],
    ['背水の陣', 'はいすいのじん', 'haisui no jin', 'Bối thủy chi trận', 'Quyết tử không còn đường lui, dốc toàn lực một mất một còn', 'N1', '背水の陣の覚悟で臨んだ大型コンペで見事に受注を勝ち取った。', 'Với quyết tâm không còn đường lui, chúng tôi đã xuất sắc giành được gói thầu lớn trong cuộc đấu thầu cạnh tranh.'],
    ['青天の霹靂', 'せいてんのへきれき', 'seiten no hekireki', 'Thanh thiên tích lịch', 'Sét đánh giữa trời quang, tin dữ bất ngờ không báo trước', 'N1', '主要取引先の突然の経営破綻は、まさに青天の霹靂であった。', 'Việc đối tác khách hàng chủ chốt bất ngờ phá sản thực sự như tiếng sét đánh ngang tai giữa trời quang.'],
    ['口頭試問', 'こうとうしもん', 'koutou shimon', 'Khẩu đầu thí vấn', 'Vấn đáp phỏng vấn miệng chuyên sâu (bài thi JPT)', 'N1', '技術職の最終面接において、専門知識を問う厳格な口頭試問が行われた。', 'Trong vòng phỏng vấn cuối cùng của vị trí kỹ sư, bài thi vấn đáp chuyên môn nghiêm ngặt đã được tiến hành.']
  ]
};

let generatorCounter = 1000;

export function generateMoreThematicWords(
  topicId: string,
  currentTotalWords: number,
  count: number = 5,
  category: LoadMoreCategory = 'general'
): ThematicWord[] {
  const newWords: ThematicWord[] = [];
  const bonusList = BONUS_POOL_MAP[topicId] || [];

  const bonusIndex = Math.max(0, currentTotalWords - 100);

  for (let i = 0; i < count; i++) {
    const itemIndex = bonusIndex + i;
    generatorCounter++;

    if (category === 'general' && itemIndex < bonusList.length) {
      const [word, reading, romaji, sino, mean, level, exJp, exVn] = bonusList[itemIndex];
      newWords.push({
        id: `${topicId}-extra-${generatorCounter}`,
        word,
        reading,
        romaji,
        sinoVietnamese: sino || undefined,
        meaningVn: mean,
        level,
        exampleJp: exJp,
        exampleVn: exVn
      });
    } else {
      const genericBonus = generateDynamicContextualWord(topicId, itemIndex + 1, category);
      newWords.push({
        id: `${topicId}-${category}-${generatorCounter}`,
        ...genericBonus
      });
    }
  }

  return newWords;
}

function generateDynamicContextualWord(
  topicId: string,
  seq: number,
  category: LoadMoreCategory
): Omit<ThematicWord, 'id'> {
  // If requesting Collocations
  if (category === 'collocation') {
    const collocations = [
      { w: '息がぴったり合う', r: 'いきがぴったりあう', rom: 'iki ga pittari au', sino: 'Hợp ý tuyệt đối', m: 'Phối hợp vô cùng ăn ý nhịp nhàng', lvl: 'N2' as const, jp: '長年のコンビで息がぴったり合った見事な連携。', vn: 'Cặp đôi ăn ý lâu năm phối hợp vô cùng nhịp nhàng ăn khớp.' },
      { w: '腕を振るう', r: 'うでをふるう', rom: 'ude o furuu', sino: 'Uyển chấn', m: 'Trổ hết tài năng / Nấu nướng hết mình', lvl: 'N2' as const, jp: '大事なお客さんのために台所で腕を振るう。', vn: 'Trổ tài bếp núc hết mình trong gian bếp vì vị khách quý.' },
      { w: '足元を見る', r: 'あしもとをみる', rom: 'ashimoto o miru', sino: 'Túc hạ', m: 'Lợi dụng điểm yếu người khác để ép giá', lvl: 'N1' as const, jp: '足元を見られて法外な取引価格を要求された。', vn: 'Bị nắm thóp điểm yếu nên bị đòi giá giao dịch trên trời.' },
      { w: '機転を利かせる', r: 'きてんをきかせる', rom: 'kiten o kikaseru', sino: 'Cơ chuyển lợi', m: 'Lanh trí ứng biến khéo léo đúng lúc', lvl: 'N1' as const, jp: 'トラブルの場でも機転を利かせてその場を収める。', vn: 'Nhanh trí ứng biến tài tình để ổn định tình thế khi có sự cố.' },
      { w: '折り合いをつける', r: 'おりあいをつける', rom: 'oriai o tsukeru', sino: 'Chiết hợp', m: 'Thỏa hiệp tìm tiếng nói chung hai bên', lvl: 'N1' as const, jp: '厳しい交渉の末に双方で折り合いをつけた。', vn: 'Sau hồi đàm phán cam go, hai bên đã tìm được tiếng nói chung thỏa hiệp.' }
    ];
    const picked = collocations[(seq - 1) % collocations.length];
    return {
      word: picked.w,
      reading: picked.r,
      romaji: picked.rom,
      sinoVietnamese: picked.sino,
      meaningVn: picked.m,
      level: picked.lvl,
      exampleJp: picked.jp,
      exampleVn: picked.vn
    };
  }

  // If requesting Advanced N2-N1
  if (category === 'advanced' || topicId.includes('tech') || topicId.includes('economy') || topicId.includes('law')) {
    const advList = [
      { w: '一念発起', r: 'いちねんほっき', rom: 'ichinenhokki', sino: 'Nhất niệm phát khởi', m: 'Hạ quyết tâm lớn lao để thay đổi vận mệnh', lvl: 'N1' as const, jp: '一念発起して日本語最上級試験に挑む。', vn: 'Hạ quyết tâm lớn dùi mài kinh sử chinh phục kỳ thi tiếng Nhật cấp cao nhất.' },
      { w: '切磋琢磨', r: 'せっさたくま', rom: 'sessatakuma', sino: 'Thiết tha trác ma', m: 'Cùng nhau học hỏi rèn giũa mài sắc ý chí', lvl: 'N1' as const, jp: '良きライバルと切磋琢磨して実力を磨き上げる。', vn: 'Cùng bạn đồng hành rèn giũa mài sắc năng lực từng ngày.' },
      { w: '臨機応変', r: 'りんきおうへん', rom: 'rinkiouhen', sino: 'Lâm cơ ứng biến', m: 'Ứng biến linh hoạt tùy cơ tình thế', lvl: 'N2' as const, jp: '予期せぬ突発事故にも臨機応変に沈着に対処する。', vn: 'Ứng biến linh hoạt và bình tĩnh xử lý trước mọi sự cố bất ngờ.' },
      { w: '温故知新', r: 'おんこちしん', rom: 'onkochishin', sino: 'Ôn cố tri tân', m: 'Ôn lại chuyện xưa để thấu suốt điều mới', lvl: 'N1' as const, jp: '先人の知恵を学び温故知新の精神で革新を生み出す。', vn: 'Học hỏi trí tuệ tiền nhân và đổi mới sáng tạo trên tinh thần ôn cố tri tân.' },
      { w: '起死回生', r: 'きしかいせい', rom: 'kishikaisei', sino: 'Khởi tử hồi sinh', m: 'Lội ngược dòng ngoạn mục xoay chuyển bại thành thắng', lvl: 'N1' as const, jp: '起死回生の一手で見事に業績をV字回復させた。', vn: 'Cú nước đi lội ngược dòng thần kỳ giúp phục hồi kinh doanh hình chữ V rực rỡ.' }
    ];
    const picked = advList[(seq - 1) % advList.length];
    return {
      word: picked.w,
      reading: picked.r,
      romaji: picked.rom,
      sinoVietnamese: picked.sino,
      meaningVn: picked.m,
      level: picked.lvl,
      exampleJp: picked.jp,
      exampleVn: picked.vn
    };
  }

  // Practical Everyday N5-N3
  const practicalList = [
    { w: 'こだわりを持つ', r: 'こだわりをもつ', rom: 'kodawari o motsu', sino: 'Đặc thù ý chí', m: 'Có tiêu chuẩn khắt khe, cầu toàn trong công việc', lvl: 'N3' as const, jp: '素材選びから調理法に至るまで職人のこだわりを持つ。', vn: 'Người thợ giữ trọn sự cầu toàn tỉ mỉ từ khâu chọn nguyên liệu đến chế biến.' },
    { w: '気兼ねなく話す', r: 'きがねなくはなす', rom: 'kiganenaku hanasu', sino: 'Khí kiêm', m: 'Nói chuyện thoải mái tự nhiên không e dè', lvl: 'N3' as const, jp: '何でも気兼ねなく話せる気さくな仲間たち。', vn: 'Những người bạn cởi mở có thể thoải mái sẻ chia mọi chuyện không chút e ngại.' },
    { w: '手際が良い', r: 'てぎわがよい', rom: 'tegiwa ga yoi', sino: 'Thủ tế lương', m: 'Thao tác nhanh nhẹn, tháo vát khéo léo', lvl: 'N3' as const, jp: '手際よく料理の下ごしらえを済ませるベテラン主婦。', vn: 'Người nội trợ kỳ cựu thoăn thoắt chuẩn bị nguyên liệu nhanh gọn nhẹ nhàng.' },
    { w: 'おもてなしの心', r: 'おもてなしのこころ', rom: 'omotenashi no kokoro', sino: 'Tâm hiếu khách', m: 'Tinh thần hiếu khách tận tâm chuẩn mực Nhật', lvl: 'N3' as const, jp: '日本の伝統的なおもてなしの心で外国人観光客を迎える。', vn: 'Đón tiếp du khách quốc tế bằng cả tấm lòng hiếu khách tận tụy truyền thống Nhật.' },
    { w: '段取り八分', r: 'だんどりはちぶ', rom: 'dandori hachibu', sino: 'Đoạn thủ bát phân', m: 'Chuẩn bị chu đáo là nắm chắc 80% thành công', lvl: 'N2' as const, jp: '段取り八分の精神で事前準備を完璧に整える。', vn: 'Chuẩn bị trước thật hoàn hảo theo triết lý chu tất nắm chắc 8 phần thành công.' }
  ];
  const picked = practicalList[(seq - 1) % practicalList.length];
  return {
    word: picked.w,
    reading: picked.r,
    romaji: picked.rom,
    sinoVietnamese: picked.sino,
    meaningVn: picked.m,
    level: picked.lvl,
    exampleJp: picked.jp,
    exampleVn: picked.vn
  };
}
