# -*- coding: utf-8 -*-
"""
Builder for Radicals 176 to 214
Every radical has at least 10 words, high frequency ones have 15-20 words.
"""
import json

data = {
    176: [ # 面 (Diện - Khuôn mặt, bề mặt, diện tích)
        {"kanji": "面", "hiragana": "めん (men) / おもて", "sinoVietnamese": "DIỆN", "meaning": "Khuôn mặt, bề mặt / mặt nạ kịch", "level": "N3", "breakdown": "面 (Diện)", "mnemonic": "Khuôn mặt người có đầy đủ trán mũi miệng viền mắt."},
        {"kanji": "面白い", "hiragana": "おもしろい (omoshiroi)", "sinoVietnamese": "DIỆN BẠCH", "meaning": "Thú vị, hấp dẫn", "level": "N5", "breakdown": "面 (Diện) + 白 (Bạch)", "mnemonic": "Nét mặt bừng sáng trắng lên vì điều thú vị vui nhộn."},
        {"kanji": "面接", "hiragana": "めんせつ (mensetsu)", "sinoVietnamese": "DIỆN TIẾP", "meaning": "Phỏng vấn trực tiếp", "level": "N3", "breakdown": "面 (Diện) + 接 (Tiếp)", "mnemonic": "Gặp mặt đối diện trực tiếp để trao đổi vấn đáp."},
        {"kanji": "面積", "hiragana": "めんせき (menseki)", "sinoVietnamese": "DIỆN TÍCH", "meaning": "Diện tích đất đai", "level": "N2", "breakdown": "面 (Diện) + 積 (Tích)", "mnemonic": "Tích số chiều dài và chiều rộng của một bề mặt."},
        {"kanji": "方面", "hiragana": "ほうめん (hōmen)", "sinoVietnamese": "PHƯƠNG DIỆN", "meaning": "Phương diện, hướng đi", "level": "N3", "breakdown": "方 (Phương) + 面 (Diện)", "mnemonic": "Một khía cạnh nhìn nhận hoặc hướng tàu xe di chuyển."},
        {"kanji": "正面", "hiragana": "しょうめん (shōmen)", "sinoVietnamese": "CHÍNH DIỆN", "meaning": "Chính diện, phía trước mặt", "level": "N2", "breakdown": "正 (Chính) + 面 (Diện)", "mnemonic": "Vị trí đối diện thẳng ngay trước tầm mắt."},
        {"kanji": "面倒", "hiragana": "めんどう (mendō)", "sinoVietnamese": "DIỆN ĐẢO", "meaning": "Phiền phức, chăm sóc chu đáo", "level": "N4", "breakdown": "面 (Diện) + 倒 (Đảo)", "mnemonic": "Mặt mày đảo lộn vì việc rắc rối phức tạp."},
        {"kanji": "画面", "hiragana": "がめん (gamen)", "sinoVietnamese": "HỌA DIỆN", "meaning": "Màn hình tivi điện thoại", "level": "N3", "breakdown": "画 (Họa) + 面 (Diện)", "mnemonic": "Bề mặt hiển thị hình ảnh phim ảnh sống động."},
        {"kanji": "対面", "hiragana": "たいめん (taimen)", "sinoVietnamese": "ĐỐI DIỆN", "meaning": "Đối mặt, chạm trán", "level": "N2", "breakdown": "対 (Đối) + 面 (Diện)", "mnemonic": "Hai người mặt đối mặt trò chuyện thẳng thắn."},
        {"kanji": "場面", "hiragana": "ばめん (bamen)", "sinoVietnamese": "TRƯỜNG DIỆN", "meaning": "Bối cảnh sân khấu, phân cảnh", "level": "N2", "breakdown": "場 (Trường) + 面 (Diện)", "mnemonic": "Khung cảnh diễn ra một màn kịch hoặc sự kiện."}
    ],
    177: [ # 革 (Cách - Tấm da thú thuộc, cải cách đổi mới)
        {"kanji": "革", "hiragana": "かわ (kawa)", "sinoVietnamese": "CÁCH", "meaning": "Da thuộc đã qua xử lý", "level": "N2", "breakdown": "革 (Cách)", "mnemonic": "Tấm da thú lột ra căng bốn góc hong khô thuộc da."},
        {"kanji": "改革", "hiragana": "かいかく (kaikaku)", "sinoVietnamese": "CẢI CÁCH", "meaning": "Cải cách thể chế", "level": "N2", "breakdown": "改 (Cải) + 革 (Cách)", "mnemonic": "Đổi mới triệt để như thuộc một tấm da mới."},
        {"kanji": "革命", "hiragana": "かくめい (kakumei)", "sinoVietnamese": "CÁCH MẠNG", "meaning": "Cách mạng lịch sử", "level": "N2", "breakdown": "革 (Cách) + 命 (Mệnh)", "mnemonic": "Thay đổi vận mệnh dân tộc bước sang trang sử mới."},
        {"kanji": "革靴", "hiragana": "かわぐつ (kawagutsu)", "sinoVietnamese": "CÁCH NGOA", "meaning": "Đôi giày da bóng loáng", "level": "N4", "breakdown": "革 (Cách) + 靴 (Ngoa - có 革)", "mnemonic": "Đôi giày đóng bằng da thuộc cao cấp bền đẹp."},
        {"kanji": "靴", "hiragana": "くつ (kutsu)", "sinoVietnamese": "NGOA", "meaning": "Giày dép đi chân", "level": "N5", "breakdown": "革 (Cách) + 化 (Hóa)", "mnemonic": "Miếng da thuộc biến hóa thành đôi giày ôm khít chân."},
        {"kanji": "鞄", "hiragana": "かばん (kaban)", "sinoVietnamese": "BẠC", "meaning": "Cặp da, túi xách", "level": "N5", "breakdown": "革 (Cách) + 包 (Bao)", "mnemonic": "Túi bọc bằng da dùng để đựng tài liệu sách vở."},
        {"kanji": "靴下", "hiragana": "くつした (kutsushita)", "sinoVietnamese": "NGOA HẠ", "meaning": "Tất chân, vớ đi trong giày", "level": "N5", "breakdown": "靴 (Ngoa) + 下 (Hạ)", "mnemonic": "Đôi tất ấm áp lót bên dưới chiếc giày da."},
        {"kanji": "皮革", "hiragana": "ひかく (hikaku)", "sinoVietnamese": "BÌ CÁCH", "meaning": "Ngành đồ da may mặc", "level": "N1", "breakdown": "皮 (Bì) + 革 (Cách)", "mnemonic": "Các chất liệu da thô và da đã thuộc công nghiệp."},
        {"kanji": "鞭", "hiragana": "むち (muchi)", "sinoVietnamese": "TIÊN", "meaning": "Roi da quất ngựa", "level": "N1", "breakdown": "革 (Cách) + 便 (Tiện)", "mnemonic": "Chiếc roi bện bằng da bò dẻo dai vút gió."},
        {"kanji": "革新", "hiragana": "かくしん (kakushin)", "sinoVietnamese": "CÁCH TÂN", "meaning": "Đổi mới canh tân", "level": "N1", "breakdown": "革 (Cách) + 新 (Tân)", "mnemonic": "Loại bỏ cái cũ kỹ đón nhận làn gió mới mẻ tiến bộ."}
    ],
    178: [ # 韋 (Vi - Miếng da thuộc mềm mại bao bọc, làm trái)
        {"kanji": "偉大", "hiragana": "いだい (idai)", "sinoVietnamese": "VĨ ĐẠI", "meaning": "Vĩ đại, xuất chúng", "level": "N2", "breakdown": "偉 (có 韋) + 大 (Đại)", "mnemonic": "Bậc vĩ nhân có nhân cách bao dung như tấm da lớn."},
        {"kanji": "違反", "hiragana": "いはん (ihan)", "sinoVietnamese": "VI PHẢN", "meaning": "Vi phạm quy tắc, pháp luật", "level": "N3", "breakdown": "違 (có 韋) + 反 (Phản)", "mnemonic": "Hành động sai lệch đi ngược lại quy định chung."},
        {"kanji": "違う", "hiragana": "ちがう (chigau)", "sinoVietnamese": "VI", "meaning": "Khác biệt, nhầm lẫn", "level": "N5", "breakdown": "辶 (Sước) + 韋 (Vi)", "mnemonic": "Bước đi sai hướng làm lệch với chuẩn mực."},
        {"kanji": "間違い", "hiragana": "まちがい (machigai)", "sinoVietnamese": "GIAN VI", "meaning": "Sai lầm, sơ suất", "level": "N4", "breakdown": "間 + 違い (Vi)", "mnemonic": "Lỗi lầm bất cẩn cần phải sửa đổi ngay ngắn."},
        {"kanji": "偉い", "hiragana": "えらい (erai)", "sinoVietnamese": "VĨ", "meaning": "Giỏi giang, đáng nể", "level": "N3", "breakdown": "偉 (có bộ 韋)", "mnemonic": "Người có công lao to lớn ai cũng khâm phục."},
        {"kanji": "違和感", "hiragana": "いわかん (iwakan)", "sinoVietnamese": "VI HÒA CẢM", "meaning": "Cảm giác gượng gạo, không tự nhiên", "level": "N1", "breakdown": "違 (Vi) + 和 (Hòa) + 感 (Cảm)", "mnemonic": "Cảm giác không ăn khớp có sự gợn khúc mắc."},
        {"kanji": "相違", "hiragana": "そうい (sōi)", "sinoVietnamese": "TƯƠNG VI", "meaning": "Khác nhau, bất đồng", "level": "N1", "breakdown": "相 (Tương) + 違 (Vi)", "mnemonic": "Có sự khác biệt rõ nét giữa hai bản tường trình."},
        {"kanji": "護衛", "hiragana": "ごえい (goei)", "sinoVietnamese": "HỘ VỆ", "meaning": "Bảo vệ hộ tống", "level": "N1", "breakdown": "護 (Hộ) + 衛 (Vệ - có gốc 韋)", "mnemonic": "Vòng bảo vệ nghiêm mật che chắn cho nguyên thủ."},
        {"kanji": "衛生", "hiragana": "えいせい (eisei)", "sinoVietnamese": "VỆ SINH", "meaning": "Vệ sinh sạch sẽ, phòng dịch", "level": "N2", "breakdown": "衛 (Vệ - có 韋) + 生 (Sinh)", "mnemonic": "Giữ gìn bảo vệ sức khỏe và môi trường sống trong lành."},
        {"kanji": "違法", "hiragana": "いほう (ihō)", "sinoVietnamese": "VI PHÁP", "meaning": "Trái pháp luật, phi pháp", "level": "N2", "breakdown": "違 (Vi) + 法 (Pháp)", "mnemonic": "Hành vi sai trái làm trái với quy định của hiến pháp."}
    ],
    179: [ # 韭 (Cửu - Bụi rau hẹ mọc trên luống đất)
        {"kanji": "韭", "hiragana": "にら (nira)", "sinoVietnamese": "CỬU", "meaning": "Cây rau hẹ xanh thơm", "level": "N2", "breakdown": "韭 (Cửu)", "mnemonic": "Bụi rau hẹ lá dẹt xanh mướt mọc từng khóm trên luống rau."},
        {"kanji": "韭炒め", "hiragana": "にらいため (niraitame)", "sinoVietnamese": "CỬU SAO", "meaning": "Món hẹ xào gan heo", "level": "N2", "breakdown": "韭 (Cửu) + 炒 (Sao - xào)", "mnemonic": "Món ăn xào thơm lừng bồi bổ sức khỏe của người Nhật."},
        {"kanji": "韭玉", "hiragana": "にらたま (niratama)", "sinoVietnamese": "CỬU NGỌC", "meaning": "Trứng rán rau hẹ", "level": "N2", "breakdown": "韭 (Cửu) + 玉 (Ngọc - trứng)", "mnemonic": "Món trứng chiên vàng xốp cùng rau hẹ xanh ngát thơm ngon."},
        {"kanji": "韭雑炊", "hiragana": "にらぞうすい (nirazōsui)", "sinoVietnamese": "CỬU TẠP THÔI", "meaning": "Cháo hẹ giải cảm", "level": "N1", "breakdown": "韭 (Cửu) + 雑炊 (Cháo thập cẩm)", "mnemonic": "Tô cháo nóng rắc đầy lá hẹ giúp toát mồ hôi giải cảm."},
        {"kanji": "韮の花", "hiragana": "にらのはな (niranohana)", "sinoVietnamese": "CỬU HOA", "meaning": "Hoa hẹ trắng nhỏ xinh", "level": "N1", "breakdown": "韮 (Cửu) + 花 (Hoa)", "mnemonic": "Những chùm hoa hẹ màu trắng li ti nở rộ cuối thu."},
        {"kanji": "韭菜", "hiragana": "きゅうさい (kyūsai)", "sinoVietnamese": "CỬU THÁI", "meaning": "Rau hẹ (tiếng Hán cổ)", "level": "N1", "breakdown": "韭 (Cửu) + 菜 (Thái)", "mnemonic": "Thứ rau gia vị thanh nhiệt trừ hàn giải độc."},
        {"kanji": "黄韮", "hiragana": "きにら (kinira)", "sinoVietnamese": "HOÀNG CỬU", "meaning": "Hẹ vàng cao cấp trồng bóng râm", "level": "N1", "breakdown": "黄 (Hoàng) + 韮 (Cửu)", "mnemonic": "Giống hẹ ủ bóng râm lá vàng mềm ngọt dịu đặc sản Okayama."},
        {"kanji": "花韮", "hiragana": "はなにら (hananira)", "sinoVietnamese": "HOA CỬU", "meaning": "Cây hẹ hoa cảnh", "level": "N1", "breakdown": "花 (Hoa) + 韮 (Cửu)", "mnemonic": "Cây hẹ cảnh nở hoa hình ngôi sao trắng muốt."},
        {"kanji": "韮饅頭", "hiragana": "にらまんじゅう (niramanjū)", "sinoVietnamese": "CỬU MÀN THẦU", "meaning": "Bánh bao nhân rau hẹ chiên giòn", "level": "N1", "breakdown": "韮 (Cửu) + 饅頭", "mnemonic": "Chiếc bánh há cảo nhân hẹ thơm nức cắn ngập miệng."},
        {"kanji": "韭根", "hiragana": "きゅうこん (kyūkon)", "sinoVietnamese": "CỬU CĂN", "meaning": "Rễ củ cây hẹ", "level": "N1", "breakdown": "韭 (Cửu) + 根 (Căn)", "mnemonic": "Phần củ rễ bám chặt trong lòng đất dùng làm vị thuốc đông y."}
    ],
    180: [ # 音 (Âm - Tiếng động, âm thanh vang vọng)
        {"kanji": "音", "hiragana": "おと (oto) / おん (on)", "sinoVietnamese": "ÂM", "meaning": "Âm thanh, tiếng động", "level": "N5", "breakdown": "立 (Lập) + 日 (Nhật)", "mnemonic": "Tiếng nói thốt lên từ vòm miệng vang vọng dưới ánh mặt trời."},
        {"kanji": "音楽", "hiragana": "おんがく (ongaku)", "sinoVietnamese": "ÂM LẠC", "meaning": "Âm nhạc giải trí", "level": "N5", "breakdown": "音 (Âm) + 楽 (Lạc)", "mnemonic": "Âm điệu du dương mang lại niềm vui sướng cho tâm hồn."},
        {"kanji": "発音", "hiragana": "はつおん (hatsuon)", "sinoVietnamese": "PHÁT ÂM", "meaning": "Phát âm tiếng nói", "level": "N4", "breakdown": "発 (Phát) + 音 (Âm)", "mnemonic": "Bật ra thanh âm chuẩn xác khi học ngoại ngữ."},
        {"kanji": "本音", "hiragana": "ほんね (honne)", "sinoVietnamese": "BỔN ÂM", "meaning": "Ý nghĩ thật lòng trong tâm", "level": "N2", "breakdown": "本 (Bổn) + 音 (Âm)", "mnemonic": "Tiếng lòng chân thật từ tận đáy dạ con người."},
        {"kanji": "暗記", "hiragana": "あんき (anki)", "sinoVietnamese": "ÁM KÝ", "meaning": "Học thuộc lòng", "level": "N3", "breakdown": "暗 (Ám - có 音) + 記 (Ký)", "mnemonic": "Nhẩm đi nhẩm lại trong bóng tối để ghi nhớ kiến thức."},
        {"kanji": "響く", "hiragana": "ひびく (hibiku)", "sinoVietnamese": "HƯỞNG", "meaning": "Vang vọng, ngân vang", "level": "N2", "breakdown": "郷 (Hương) + 音 (Âm)", "mnemonic": "Âm thanh tiếng chuông ngân vang khắp thôn xóm xa xôi."},
        {"kanji": "録音", "hiragana": "ろくおん (rokuon)", "sinoVietnamese": "LỤC ÂM", "meaning": "Ghi âm bài hát", "level": "N3", "breakdown": "録 (Lục) + 音 (Âm)", "mnemonic": "Lưu lại âm thanh vào băng đĩa nhạc."},
        {"kanji": "雑音", "hiragana": "ざつおん (zatsuon)", "sinoVietnamese": "TẠP ÂM", "meaning": "Tạp âm, tiếng ồn quấy rầy", "level": "N2", "breakdown": "雑 (Tạp) + 音 (Âm)", "mnemonic": "Tiếng ồn ào hỗn tạp gây khó chịu thính giác."},
        {"kanji": "音声", "hiragana": "おんせい (onsei)", "sinoVietnamese": "ÂM THANH", "meaning": "Âm thanh giọng nói", "level": "N2", "breakdown": "音 (Âm) + 声 (Thanh)", "mnemonic": "Thanh âm truyền tải thông tin qua micro đài phát thanh."},
        {"kanji": "音痴", "hiragana": "おんち (onchi)", "sinoVietnamese": "ÂM SI", "meaning": "Mù nhạc, hát lạc nhịp", "level": "N2", "breakdown": "音 (Âm) + 痴 (Si)", "mnemonic": "Người không phân biệt được cao độ nốt nhạc khi hát karaoke."}
    ],
    181: [ # 頁 (Hiệt - Trang sách, cái đầu và cổ người)
        {"kanji": "頭", "hiragana": "あたま (atama)", "sinoVietnamese": "ĐẦU", "meaning": "Cái đầu, đầu óc", "level": "N5", "breakdown": "豆 (Đậu) + 頁 (Hiệt)", "mnemonic": "Chiếc đầu tròn như hạt đậu nâng đỡ bởi cổ và gáy."},
        {"kanji": "頂上", "hiragana": "ちょうじょう (chōjō)", "sinoVietnamese": "ĐÍNH THƯỢNG", "meaning": "Đỉnh núi, tột đỉnh", "level": "N3", "breakdown": "頂 (Đính - có 頁) + 上 (Thượng)", "mnemonic": "Điểm cao nhất trên chóp đầu ngọn núi cao chót vót."},
        {"kanji": "顔", "hiragana": "かお (kao)", "sinoVietnamese": "NHAN", "meaning": "Khuôn mặt xinh đẹp", "level": "N5", "breakdown": "彦 (Ngạn) + 頁 (Hiệt)", "mnemonic": "Khuôn mặt rạng rỡ của chàng trai tài hoa khôi ngô."},
        {"kanji": "頼む", "hiragana": "たのむ (tanomu)", "sinoVietnamese": "LẠI", "meaning": "Nhờ vả, trông cậy", "level": "N5", "breakdown": "頼 (có bộ 頁)", "mnemonic": "Cúi đầu cậy nhờ vào sự giúp đỡ của bạn hữu."},
        {"kanji": "類", "hiragana": "るい (rui)", "sinoVietnamese": "LOẠI", "meaning": "Chủng loại, thể loại", "level": "N3", "breakdown": "米 + 犬 + 頁 (Hiệt)", "mnemonic": "Phân chia từng trang từng loại đồ vật rõ ràng."},
        {"kanji": "額", "hiragana": "ひたい (hitai) / がく (gaku)", "sinoVietnamese": "NGẠCH", "meaning": "Vầng trán / số tiền, kim ngạch", "level": "N2", "breakdown": "客 (Khách) + 頁 (Hiệt)", "mnemonic": "Vầng trán cao rộng của người khách quý ghé thăm."},
        {"kanji": "願う", "hiragana": "ねがう (negau)", "sinoVietnamese": "NGUYỆN", "meaning": "Cầu nguyện, ước mong", "level": "N4", "breakdown": "原 (Nguyên) + 頁 (Hiệt)", "mnemonic": "Cúi đầu thành tâm khấn nguyện trước trời cao."},
        {"kanji": "題名", "hiragana": "だいめい (daimei)", "sinoVietnamese": "ĐỀ DANH", "meaning": "Nhan đề cuốn sách, tiêu đề", "level": "N3", "breakdown": "題 (Đề - có 頁) + 名 (Danh)", "mnemonic": "Tên sách được in trang trọng ngay trang đầu tiên."},
        {"kanji": "頻繁", "hiragana": "ひんぱん (hinpan)", "sinoVietnamese": "TẦN PHỒN", "meaning": "Thường xuyên dồn dập", "level": "N1", "breakdown": "頻 (Tần - có 頁) + 繁 (Phồn)", "mnemonic": "Lật giở từng trang liên tiếp không ngừng nghỉ."},
        {"kanji": "ページ", "hiragana": "ぺーじ (pēji)", "sinoVietnamese": "HIỆT", "meaning": "Trang sách (chữ 頁 đọc là page)", "level": "N5", "breakdown": "頁 (Hiệt)", "mnemonic": "Từng trang sách mở ra chân trời tri thức bất tận."}
    ],
    182: [ # 風 (Phong - Cơn gió thổi bay vạt áo)
        {"kanji": "風", "hiragana": "かぜ (kaze)", "sinoVietnamese": "PHONG", "meaning": "Cơn gió mát lành", "level": "N5", "breakdown": "風 (Phong)", "mnemonic": "Gió luồn qua vách cửa làm côn trùng sâu bọ 虫 chuyển động."},
        {"kanji": "台風", "hiragana": "たいふう (taifū)", "sinoVietnamese": "ĐÀI PHONG", "meaning": "Cơn bão nhiệt đới", "level": "N4", "breakdown": "台 (Đài) + 風 (Phong)", "mnemonic": "Cơn bão lớn cuồng phong gầm rú ngoài biển khơi."},
        {"kanji": "お風呂", "hiragana": "おふろ (ofuro)", "sinoVietnamese": "PHONG LỮ", "meaning": "Bồn tắm nước nóng kiểu Nhật", "level": "N5", "breakdown": "風 (Phong) + 呂", "mnemonic": "Ngâm mình trong bồn nước nóng sảng khoái sau ngày dài."},
        {"kanji": "風邪", "hiragana": "かぜ (kaze)", "sinoVietnamese": "PHONG TÀ", "meaning": "Cảm cúm, trúng gió", "level": "N5", "breakdown": "風 (Phong) + 邪 (Tà)", "mnemonic": "Trúng phải luồng gió độc gây ốm đau sổ mũi."},
        {"kanji": "風景", "hiragana": "ふうけい (fūkei)", "sinoVietnamese": "PHONG CẢNH", "meaning": "Phong cảnh thiên nhiên", "level": "N3", "breakdown": "風 (Phong) + 景 (Cảnh)", "mnemonic": "Bức tranh sơn thủy hữu tình trong gió ngàn lộng lẫy."},
        {"kanji": "暴風", "hiragana": "ぼうふう (bōfū)", "sinoVietnamese": "BẠO PHONG", "meaning": "Cơn bão tố cuồng phong", "level": "N2", "breakdown": "暴 (Bạo) + 風 (Phong)", "mnemonic": "Gió bão gầm rít quật ngã cây cối trên đường đi."},
        {"kanji": "風俗", "hiragana": "ふうぞく (fūzoku)", "sinoVietnamese": "PHONG TỤC", "meaning": "Phong tục tập quán", "level": "N2", "breakdown": "風 (Phong) + 俗 (Tục)", "mnemonic": "Nếp sống và tập quán truyền thống của một vùng miền."},
        {"kanji": "和風", "hiragana": "わふう (wafū)", "sinoVietnamese": "HÒA PHONG", "meaning": "Phong cách truyền thống Nhật Bản", "level": "N2", "breakdown": "和 (Hòa) + 風 (Phong)", "mnemonic": "Nét đẹp tao nhã mang đậm tinh thần văn hóa Nhật Bản."},
        {"kanji": "洋風", "hiragana": "ようふう (yōfū)", "sinoVietnamese": "DƯƠNG PHONG", "meaning": "Phong cách phương Tây hiện đại", "level": "N2", "breakdown": "洋 (Dương) + 風 (Phong)", "mnemonic": "Thiết kế kiến trúc hiện đại mang hơi thở phương Tây."},
        {"kanji": "風波", "hiragana": "ふうは (fūha)", "sinoVietnamese": "PHONG BA", "meaning": "Sóng gió phong ba bão táp", "level": "N1", "breakdown": "風 (Phong) + 波 (Ba)", "mnemonic": "Sóng gió cuộc đời thử thách ý chí người quân tử."}
    ],
    183: [ # 飛 (Phi - Bay vút lên bầu trời)
        {"kanji": "飛ぶ", "hiragana": "とぶ (tobu)", "sinoVietnamese": "PHI", "meaning": "Bay lượn trên không", "level": "N5", "breakdown": "飛 (Phi)", "mnemonic": "Cánh chim dang rộng vỗ cánh bay vút vào mây xanh."},
        {"kanji": "飛行機", "hiragana": "ひこうき (hikōki)", "sinoVietnamese": "PHI HÀNH CƠ", "meaning": "Máy bay chở khách", "level": "N5", "breakdown": "飛 (Phi) + 行 (Hành) + 機 (Cơ)", "mnemonic": "Cỗ máy bay lượn đưa hành khách vượt đại dương."},
        {"kanji": "飛び出す", "hiragana": "とびだす (tobidasu)", "sinoVietnamese": "PHI XUẤT", "meaning": "Lao ra, nhảy vọt ra đường", "level": "N3", "breakdown": "飛 (Phi) + 出 (Xuất)", "mnemonic": "Bất ngờ phóng lao vọt ra ngoài gây nguy hiểm."},
        {"kanji": "飛行場", "hiragana": "ひこうじょう (hikōjō)", "sinoVietnamese": "PHI HÀNH TRƯỜNG", "meaning": "Sân bay cất hạ cánh", "level": "N4", "breakdown": "飛行 + 場 (Trường)", "mnemonic": "Bãi đỗ và đường băng đón trả các chuyến bay."},
        {"kanji": "飛躍", "hiragana": "ひやく (hiyaku)", "sinoVietnamese": "PHI DƯỢC", "meaning": "Bước nhảy vọt vượt bậc", "level": "N1", "breakdown": "飛 (Phi) + 躍 (Dược - nhảy)", "mnemonic": "Sự tiến bộ nhảy vọt ngoạn mục vươn tới tầm cao mới."},
        {"kanji": "飛び降りる", "hiragana": "とびおりる (tobioriru)", "sinoVietnamese": "PHI HÀNG", "meaning": "Nhảy từ trên cao xuống", "level": "N3", "breakdown": "飛 (Phi) + 降 (Hàng)", "mnemonic": "Bật nhảy từ trên cao tiếp đất an toàn."},
        {"kanji": "雄飛", "hiragana": "ゆうひ (yūhi)", "sinoVietnamese": "HÙNG PHI", "meaning": "Vươn mình tung cánh bay xa", "level": "N1", "breakdown": "雄 (Hùng) + 飛 (Phi)", "mnemonic": "Đại bàng dũng mãnh tung cánh lập nên nghiệp lớn."},
        {"kanji": "散飛", "hiragana": "さんぴ (sanpi)", "sinoVietnamese": "TẢN PHI", "meaning": "Bay tản mát muôn phương", "level": "N1", "breakdown": "散 (Tản) + 飛 (Phi)", "mnemonic": "Những mảnh vỡ bay tung tóe khắp mọi ngóc ngách."},
        {"kanji": "飛ばす", "hiragana": "とばす (tobasu)", "sinoVietnamese": "PHI", "meaning": "Làm cho bay lên / bỏ qua một đoạn", "level": "N3", "breakdown": "飛 (Phi)", "mnemonic": "Thả cánh diều bay lượn hoặc bỏ qua trang sách đọc nhanh."},
        {"kanji": "飛沫", "hiragana": "ひまつ (himatsu)", "sinoVietnamese": "PHI MẠT", "meaning": "Giọt bắn li ti, bọt nước bắn", "level": "N1", "breakdown": "飛 (Phi) + 沫 (Mạt)", "mnemonic": "Bọt sóng bắn tung tóe hoặc giọt bắn khi hắt hơi."}
    ],
    184: [ # 食 / 飠 (Thực - Ăn uống, lương thực đồ ăn)
        {"kanji": "食べる", "hiragana": "たべる (taberu)", "sinoVietnamese": "THỰC", "meaning": "Ăn cơm, ăn uống", "level": "N5", "breakdown": "食 (Thực)", "mnemonic": "Dưới mái nhà sum họp mọi người cùng thưởng thức bát cơm ngon."},
        {"kanji": "食事", "hiragana": "しょくじ (shokuji)", "sinoVietnamese": "THỰC SỰ", "meaning": "Bữa ăn uống hàng ngày", "level": "N4", "breakdown": "食 (Thực) + 事 (Sự)", "mnemonic": "Bữa cơm ấm cúng gắn kết các thành viên gia đình."},
        {"kanji": "食堂", "hiragana": "しょくどう (shokudō)", "sinoVietnamese": "THỰC ĐƯỜNG", "meaning": "Nhà ăn công ty, căng tin", "level": "N5", "breakdown": "食 (Thực) + 堂 (Đường)", "mnemonic": "Căn phòng rộng lớn phục vụ bữa trưa cho nhân viên."},
        {"kanji": "朝食", "hiragana": "ちょうしょく (chōshoku)", "sinoVietnamese": "TRIỀU THỰC", "meaning": "Bữa sáng dinh dưỡng", "level": "N4", "breakdown": "朝 (Triều) + 食 (Thực)", "mnemonic": "Bữa điểm tâm khởi đầu ngày mới ngập tràn năng lượng."},
        {"kanji": "昼食", "hiragana": "ちゅうしょく (chūshoku)", "sinoVietnamese": "TRÚ THỰC", "meaning": "Bữa trưa", "level": "N4", "breakdown": "昼 (Trú) + 食 (Thực)", "mnemonic": "Bữa cơm trưa nạp lại năng lượng sau giờ làm việc vất vả."},
        {"kanji": "夕食", "hiragana": "ゆうしょく (yūshoku)", "sinoVietnamese": "TỊCH THỰC", "meaning": "Bữa tối ấm cúng", "level": "N4", "breakdown": "夕 (Tịch) + 食 (Thực)", "mnemonic": "Bữa cơm chiều hoàng hôn quây quần bên người thân yêu."},
        {"kanji": "ご飯", "hiragana": "ごはん (gohan)", "sinoVietnamese": "PHẠN", "meaning": "Bát cơm trắng / bữa ăn", "level": "N5", "breakdown": "飠 (Thực) + 反 (Phản)", "mnemonic": "Hạt gạo trắng nấu chín thành bát cơm dẻo ngọt thơm lừng."},
        {"kanji": "館", "hiragana": "かん (kan)", "sinoVietnamese": "QUÁN", "meaning": "Tòa nhà, hội quán, bảo tàng", "level": "N4", "breakdown": "飠 (Thực) + 官 (Quan)", "mnemonic": "Nơi các vị quan lại nghỉ ngơi ăn uống thời xưa."},
        {"kanji": "飲む", "hiragana": "のむ (nomu)", "sinoVietnamese": "ẨM", "meaning": "Uống nước, uống trà", "level": "N5", "breakdown": "飠 (Thực) + 欠 (Khiếm)", "mnemonic": "Há to miệng nuốt từng ngụm nước mát giải cơn khát."},
        {"kanji": "飢餓", "hiragana": "きが (kiga)", "sinoVietnamese": "CƠ NGÃ", "meaning": "Nạn đói khát cùng cực", "level": "N1", "breakdown": "飢 (Cơ - có 飠) + 餓 (Ngã - có 飠)", "mnemonic": "Nỗi thống khổ thiếu thốn lương thực đe dọa sinh mạng."}
    ],
    185: [ # 首 (Thủ - Cái đầu, cổ, thủ lĩnh chỉ huy)
        {"kanji": "首", "hiragana": "くび (kubi)", "sinoVietnamese": "THỦ", "meaning": "Cổ họng / cái đầu", "level": "N4", "breakdown": "首 (Thủ)", "mnemonic": "Cái đầu với chỏm tóc và đôi mắt nhìn thẳng trên chiếc cổ."},
        {"kanji": "首相", "hiragana": "しゅしょう (shushō)", "sinoVietnamese": "THỦ TƯƠNG", "meaning": "Thủ tướng chính phủ", "level": "N3", "breakdown": "首 (Thủ) + 相 (Tương)", "mnemonic": "Người đứng đầu nội các lãnh đạo toàn bộ quốc gia."},
        {"kanji": "首都", "hiragana": "しゅと (shuto)", "sinoVietnamese": "THỦ ĐÔ", "meaning": "Thủ đô đất nước", "level": "N3", "breakdown": "首 (Thủ) + 都 (Đô)", "mnemonic": "Trái tim và trung tâm đầu não chính trị của một đất nước."},
        {"kanji": "手首", "hiragana": "てくび (tekubi)", "sinoVietnamese": "THỦ THỦ", "meaning": "Cổ tay mềm dẻo", "level": "N3", "breakdown": "手 (Thủ - tay) + 首 (Thủ - cổ)", "mnemonic": "Khớp nối cổ tay linh hoạt cử động bàn tay khéo léo."},
        {"kanji": "足首", "hiragana": "あしくび (ashikubi)", "sinoVietnamese": "TÚC THỦ", "meaning": "Cổ chân", "level": "N3", "breakdown": "足 (Túc) + 首 (Thủ)", "mnemonic": "Khớp cổ chân nâng đỡ những bước chạy bền bỉ."},
        {"kanji": "部首", "hiragana": "ぶしゅ (bushu)", "sinoVietnamese": "BỘ THỦ", "meaning": "Bộ thủ chữ Hán Hán tự", "level": "N2", "breakdown": "部 (Bộ) + 首 (Thủ)", "mnemonic": "Các thành phần gốc đứng đầu cấu tạo nên 214 bộ Hán tự."},
        {"kanji": "首長", "hiragana": "しゅちょう (shuchō)", "sinoVietnamese": "THỦ TRƯỞNG", "meaning": "Thủ trưởng, người đứng đầu địa phương", "level": "N1", "breakdown": "首 (Thủ) + 長 (Trưởng)", "mnemonic": "Người đứng đầu giữ vị trí then chốt ra quyết định."},
        {"kanji": "自首", "hiragana": "じしゅ (jishu)", "sinoVietnamese": "TỰ THỦ", "meaning": "Tự thú, đầu thú tại đồn cảnh sát", "level": "N1", "breakdown": "自 (Tự) + 首 (Thủ)", "mnemonic": "Tự mình cúi đầu nhận tội trước cơ quan công lý."},
        {"kanji": "首尾", "hiragana": "しゅび (shubi)", "sinoVietnamese": "THỦ VĨ", "meaning": "Đầu đuôi xuôi ngược, kết quả", "level": "N1", "breakdown": "首 (Thủ - đầu) + 尾 (Vĩ - đuôi)", "mnemonic": "Từ đầu đến cuối câu chuyện diễn ra thuận buồm xuôi gió."},
        {"kanji": "首飾り", "hiragana": "くびかざり (kubikazari)", "sinoVietnamese": "THỦ SỨC", "meaning": "Vòng đeo cổ lấp lánh", "level": "N2", "breakdown": "首 (Thủ) + 飾 (Sức)", "mnemonic": "Chiếc dây chuyền trang sức làm tôn nét duyên dáng vòm cổ."}
    ],
    186: [ # 香 (Hương - Mùi thơm thoang thoảng của lúa chín)
        {"kanji": "香る", "hiragana": "かおる (kaoru)", "sinoVietnamese": "HƯƠNG", "meaning": "Tỏa hương thơm ngát", "level": "N2", "breakdown": "禾 (Hòa - lúa) + 日 (Nhật - miệng thưởng thức)", "mnemonic": "Hạt lúa chín tỏa ra mùi hương ngọt ngào khắp xóm làng."},
        {"kanji": "香り", "hiragana": "かおり (kaori)", "sinoVietnamese": "HƯƠNG", "meaning": "Mùi hương, hương thơm", "level": "N3", "breakdown": "香 (Hương)", "mnemonic": "Hương thơm ngạt ngào của đóa hoa hồng trong sớm mai."},
        {"kanji": "香水", "hiragana": "こうすい (kōsui)", "sinoVietnamese": "HƯƠNG THỦY", "meaning": "Nước hoa cao cấp", "level": "N3", "breakdown": "香 (Hương) + 水 (Thủy)", "mnemonic": "Làn nước tinh chế chứa đựng hương thơm quyến rũ."},
        {"kanji": "香辛料", "hiragana": "こうしんりょう (kōshinryō)", "sinoVietnamese": "HƯƠNG TÂN LIỆU", "meaning": "Gia vị cay nồng thơm ngon", "level": "N2", "breakdown": "香 (Hương) + 辛 (Tân) + 料 (Liệu)", "mnemonic": "Gia vị làm bùng nổ hương sắc và vị cay của món ăn."},
        {"kanji": "線香", "hiragana": "せんこう (senkō)", "sinoVietnamese": "TUYẾN HƯƠNG", "meaning": "Nén nhang thắp bàn thờ", "level": "N2", "breakdown": "線 (Tuyến) + 香 (Hương)", "mnemonic": "Nén nhang thơm thành kính dâng lên tổ tiên thần linh."},
        {"kanji": "香港", "hiragana": "ほんこん (honkon)", "sinoVietnamese": "HƯƠNG CẢNG", "meaning": "Đặc khu Hong Kong sầm uất", "level": "N3", "breakdown": "香 (Hương) + 港 (Cảng)", "mnemonic": "Bến cảng thơm nức mùi trầm hương thời cổ đại."},
        {"kanji": "芳香", "hiragana": "ほうこう (hōkō)", "sinoVietnamese": "PHƯƠNG HƯƠNG", "meaning": "Hương thơm nồng nàn dịu ngọt", "level": "N1", "breakdown": "芳 (Phương) + 香 (Hương)", "mnemonic": "Mùi thơm dịu dàng thanh tao lan tỏa khắp không gian."},
        {"kanji": "焼香", "hiragana": "しょうこう (shōkō)", "sinoVietnamese": "THIÊU HƯƠNG", "meaning": "Thắp hương viếng tang lễ", "level": "N1", "breakdown": "焼 (Thiêu) + 香 (Hương)", "mnemonic": "Đốt nén hương thơm tiễn biệt người đã khuất."},
        {"kanji": "香気", "hiragana": "こうき (kōki)", "sinoVietnamese": "HƯƠNG KHÍ", "meaning": "Mùi hương thoảng đưa", "level": "N1", "breakdown": "香 (Hương) + 気 (Khí)", "mnemonic": "Luồng không khí thơm ngát đón gió xuân về."},
        {"kanji": "薫香", "hiragana": "くんこう (kunkō)", "sinoVietnamese": "HUÂN HƯƠNG", "meaning": "Xông trầm thơm lừng", "level": "N1", "breakdown": "薫 (Huân) + 香 (Hương)", "mnemonic": "Khói trầm hương thanh tịnh tẩy uế tâm hồn."}
    ],
    187: [ # 馬 (Mã - Con ngựa phi nước đại)
        {"kanji": "馬", "hiragana": "うま (uma)", "sinoVietnamese": "MÃ", "meaning": "Con ngựa dũng mãnh", "level": "N4", "breakdown": "馬 (Mã)", "mnemonic": "Hình dáng con ngựa có bờm dài, bốn chân phi nhanh như gió."},
        {"kanji": "乗馬", "hiragana": "じょうば (jōba)", "sinoVietnamese": "THỪA MÃ", "meaning": "Cưỡi ngựa thể thao", "level": "N2", "breakdown": "乗 (Thừa) + 馬 (Mã)", "mnemonic": "Ngồi vững chãi trên lưng ngựa phi nước đại trên thảo nguyên."},
        {"kanji": "競馬", "hiragana": "けいば (keiba)", "sinoVietnamese": "CẠNH MÃ", "meaning": "Đua ngựa kịch tính", "level": "N2", "breakdown": "競 (Cạnh) + 馬 (Mã)", "mnemonic": "Cuộc tranh tài tốc độ nghẹt thở giữa các chú ngựa chiến."},
        {"kanji": "駄目", "hiragana": "だめ (dame)", "sinoVietnamese": "ĐÀ MỤC", "meaning": "Không được, hỏng bét", "level": "N5", "breakdown": "駄 (Đà - có 馬) + 目 (Mục)", "mnemonic": "Ngựa chở quá tải không thể bước tiếp đành chịu thua."},
        {"kanji": "駅", "hiragana": "えき (eki)", "sinoVietnamese": "DỊCH", "meaning": "Nhà ga tàu điện", "level": "N5", "breakdown": "馬 (Mã) + 尺 (Xích)", "mnemonic": "Trạm dừng chân ngày xưa nơi đổi ngựa chạy thư tín."},
        {"kanji": "驚く", "hiragana": "おどろく (odoroku)", "sinoVietnamese": "KINH", "meaning": "Kinh ngạc, giật mình", "level": "N4", "breakdown": "敬 (Kính) + 馬 (Mã)", "mnemonic": "Con ngựa hoảng hốt hí vang lồng lộn giật mình."},
        {"kanji": "騎手", "hiragana": "きしゅ (kishu)", "sinoVietnamese": "KỴ THỦ", "meaning": "Tay nài ngựa cừ khôi", "level": "N1", "breakdown": "騎 (Kỵ - có 馬) + 手 (Thủ)", "mnemonic": "Vận động viên điều khiển ngựa đua tài ba điệu nghệ."},
        {"kanji": "騒ぐ", "hiragana": "さわぐ (sawagu)", "sinoVietnamese": "TAO", "meaning": "Làm ồn náo loạn", "level": "N4", "breakdown": "馬 (Mã) + 蚤 (Tảo)", "mnemonic": "Ngựa bị bọ chét cắn lồng lộn hí vang gây náo loạn."},
        {"kanji": "駆ける", "hiragana": "かける (kakeru)", "sinoVietnamese": "KHU", "meaning": "Chạy phi nhanh, phi nước đại", "level": "N2", "breakdown": "馬 (Mã) + 区 (Khu)", "mnemonic": "Chiến mã phi nước đại thần tốc qua các nẻo đường."},
        {"kanji": "駿馬", "hiragana": "しゅんば (shunba)", "sinoVietnamese": "TUẤN MÃ", "meaning": "Ngựa hay tuấn mã", "level": "N1", "breakdown": "駿 (Tuấn) + 馬 (Mã)", "mnemonic": "Con tuấn mã phi ngàn dặm không biết mệt mỏi."}
    ],
    188: [ # 骨 (Cốt - Khung xương cốt rắn chắc)
        {"kanji": "骨", "hiragana": "ほね (hone)", "sinoVietnamese": "CỐT", "meaning": "Khung xương cốt cơ thể", "level": "N3", "breakdown": "骨 (Cốt)", "mnemonic": "Khung xương nâng đỡ các thớ thịt ⺼ tạo nên hình hài vững chắc."},
        {"kanji": "骨折", "hiragana": "こっせつ (kossetsu)", "sinoVietnamese": "CỐT CHIẾT", "meaning": "Gãy xương chấn thương", "level": "N2", "breakdown": "骨 (Cốt) + 折 (Chiết - gãy)", "mnemonic": "Xương cốt bị rạn nứt gãy sau va đập mạnh."},
        {"kanji": "背骨", "hiragana": "せぼね (sebone)", "sinoVietnamese": "BỐI CỐT", "meaning": "Cột sống lưng rường cột", "level": "N2", "breakdown": "背 (Bối - lưng) + 骨 (Cốt)", "mnemonic": "Trục xương sống vững chãi giữ thẳng lưng người."},
        {"kanji": "軟骨", "hiragana": "なんこつ (nankotsu)", "sinoVietnamese": "NHUYỄN CỐT", "meaning": "Sụn giòn ngọt", "level": "N1", "breakdown": "軟 (Nhuyễn) + 骨 (Cốt)", "mnemonic": "Lớp sụn đàn hồi êm ái giữa các khớp xương."},
        {"kanji": "骨格", "hiragana": "こっかく (kokkaku)", "sinoVietnamese": "CỐT CÁCH", "meaning": "Bộ xương, khung sườn kết cấu", "level": "N1", "breakdown": "骨 (Cốt) + 格 (Cách)", "mnemonic": "Khung sườn cốt lõi định hình nên toàn bộ cơ thể."},
        {"kanji": "骨髄", "hiragana": "こつずい (kotsuzui)", "sinoVietnamese": "CỐT TỦY", "meaning": "Tủy xương sinh máu", "level": "N1", "breakdown": "骨 (Cốt) + 髄 (Tủy)", "mnemonic": "Tủy đỏ nằm sâu trong lòng ống xương sản sinh tế bào máu."},
        {"kanji": "白骨", "hiragana": "はっこつ (hakkotsu)", "sinoVietnamese": "BẠCH CỐT", "meaning": "Bộ xương trắng ngàn năm", "level": "N1", "breakdown": "白 (Bạch) + 骨 (Cốt)", "mnemonic": "Hài cốt bạc màu thời gian còn mãi với đất mẹ."},
        {"kanji": "骸骨", "hiragana": "がいこつ (gaikotsu)", "sinoVietnamese": "HÀI CỐT", "meaning": "Bộ xương người tiêu bản", "level": "N1", "breakdown": "骸 (Hài) + 骨 (Cốt)", "mnemonic": "Tiêu bản mô hình toàn bộ khung xương trong phòng thí nghiệm."},
        {"kanji": "気骨", "hiragana": "きこつ (kikotsu)", "sinoVietnamese": "KHÍ CỐT", "meaning": "Khí phách hiên ngang kiên cường", "level": "N1", "breakdown": "気 (Khí) + 骨 (Cốt)", "mnemonic": "Khí phách cứng cỏi không bao giờ chịu khuất phục."},
        {"kanji": "骨肉", "hiragana": "こつにく (kotsuniku)", "sinoVietnamese": "CỐT NHỤC", "meaning": "Máu mủ ruột thịt tình thân", "level": "N1", "breakdown": "骨 (Cốt) + 肉 (Nhục)", "mnemonic": "Tình ruột thịt sâu nặng như xương với thịt gắn liền."}
    ],
    189: [ # 高 (Cao - Lâu đài cao tầng, vươn cao chót vót)
        {"kanji": "高い", "hiragana": "たかい (takai)", "sinoVietnamese": "CAO", "meaning": "Cao ráo, đắt đỏ", "level": "N5", "breakdown": "高 (Cao)", "mnemonic": "Tòa tháp canh cao ngút ngàn với cổng lớn và đài quan sát."},
        {"kanji": "高校", "hiragana": "こうこう (kōkō)", "sinoVietnamese": "CAO HIỆU", "meaning": "Trường cấp 3, trung học phổ thông", "level": "N5", "breakdown": "高 (Cao) + 校 (Hiệu)", "mnemonic": "Bậc học phổ thông cao nhất trước ngưỡng cửa đại học."},
        {"kanji": "高校生", "hiragana": "こうこうせい (kōkōsei)", "sinoVietnamese": "CAO HIỆU SINH", "meaning": "Học sinh cấp 3 năng động", "level": "N5", "breakdown": "高校 + 生 (Sinh)", "mnemonic": "Những cô cậu học trò tuổi thanh xuân hồn nhiên."},
        {"kanji": "最高", "hiragana": "さいこう (saikō)", "sinoVietnamese": "TỐI CAO", "meaning": "Tuyệt vời nhất, đỉnh cao tột bực", "level": "N3", "breakdown": "最 (Tối) + 高 (Cao)", "mnemonic": "Chạm tới mức thang cao nhất không gì sánh bằng."},
        {"kanji": "高級", "hiragana": "こうきゅう (kōkyū)", "sinoVietnamese": "CAO CẤP", "meaning": "Cao cấp sang trọng", "level": "N3", "breakdown": "高 (Cao) + 級 (Cấp)", "mnemonic": "Hàng hóa dịch vụ chất lượng hảo hạng bậc nhất."},
        {"kanji": "円高", "hiragana": "えんだか (endaka)", "sinoVietnamese": "VIÊN CAO", "meaning": "Đồng Yên tăng giá mạnh", "level": "N2", "breakdown": "円 (Viên) + 高 (Cao)", "mnemonic": "Tỷ giá đồng Yên Nhật tăng vọt trên thị trường quốc tế."},
        {"kanji": "高層", "hiragana": "こうそう (kōsō)", "sinoVietnamese": "CAO TẦNG", "meaning": "Nhà chọc trời cao tầng", "level": "N2", "breakdown": "高 (Cao) + 層 (Tầng)", "mnemonic": "Tòa nhà chọc trời sừng sững vươn lên mây xanh."},
        {"kanji": "標高", "hiragana": "ひょうこう (hyōkō)", "sinoVietnamese": "TIÊU CAO", "meaning": "Độ cao so với mực nước biển", "level": "N2", "breakdown": "標 (Tiêu) + 高 (Cao)", "mnemonic": "Chỉ số chiều cao địa lý của một đỉnh núi."},
        {"kanji": "高尚", "hiragana": "こうしょう (kōshō)", "sinoVietnamese": "CAO THƯỢNG", "meaning": "Cao thượng tao nhã", "level": "N1", "breakdown": "高 (Cao) + 尚 (Thượng)", "mnemonic": "Tâm hồn trong sáng vị tha hướng tới những điều cao quý."},
        {"kanji": "高嶺の花", "hiragana": "たかねのはな (takanenohana)", "sinoVietnamese": "CAO LĨNH HOA", "meaning": "Hoa trên đỉnh núi (người quá xa vời khó với tới)", "level": "N1", "breakdown": "高嶺 (Cao lĩnh) + 花 (Hoa)", "mnemonic": "Bông hoa tuyệt mỹ trên đỉnh núi tuyết xa xôi không với tới."}
    ],
    190: [ # 髟 (Tiêu - Mái tóc dài buông xõa bay trong gió)
        {"kanji": "髪", "hiragana": "かみ (kami)", "sinoVietnamese": "PHÁT", "meaning": "Mái tóc bồng bềnh", "level": "N4", "breakdown": "髟 (Tiêu) + 友 (Hữu)", "mnemonic": "Mái tóc mượt mà buông xõa ngang vai nâng niu."},
        {"kanji": "白髪", "hiragana": "しらが (shiraga)", "sinoVietnamese": "BẠCH PHÁT", "meaning": "Mái tóc bạc phơ theo năm tháng", "level": "N2", "breakdown": "白 (Bạch) + 髪 (Phát - có 髟)", "mnemonic": "Mái tóc ngả màu sương gió bạc phơ của bậc cao niên."},
        {"kanji": "髭", "hiragana": "ひげ (hige)", "sinoVietnamese": "TÙ", "meaning": "Bộ râu mép, râu quai nón", "level": "N3", "breakdown": "髟 (Tiêu) + 此", "mnemonic": "Hàng ria mép rậm rạp làm tăng vẻ nam tính phong độ."},
        {"kanji": "金髪", "hiragana": "きんぱつ (kinpatsu)", "sinoVietnamese": "KIM PHÁT", "meaning": "Mái tóc vàng óng ánh", "level": "N2", "breakdown": "金 (Kim) + 髪 (Phát)", "mnemonic": "Mái tóc màu vàng óng ả tỏa sáng dưới ánh mặt trời."},
        {"kanji": "鬘", "hiragana": "かつら (katsura)", "sinoVietnamese": "MAN", "meaning": "Bộ tóc giả diễn viên", "level": "N1", "breakdown": "髟 (Tiêu) + 曼", "mnemonic": "Bộ tóc giả tinh xảo cho diễn viên kịch Kabuki biểu diễn."},
        {"kanji": "長髪", "hiragana": "ちょうはつ (chōhatsu)", "sinoVietnamese": "TRƯỜNG PHÁT", "meaning": "Mái tóc dài thướt tha", "level": "N2", "breakdown": "長 (Trường) + 髪 (Phát)", "mnemonic": "Mái tóc dài đen nhánh buông thõng dịu dàng."},
        {"kanji": "短髪", "hiragana": "たんぱつ (tanpatsu)", "sinoVietnamese": "ĐOẢN PHÁT", "meaning": "Mái tóc cắt ngắn cá tính", "level": "N2", "breakdown": "短 (Đoản) + 髪 (Phát)", "mnemonic": "Kiểu tóc ngắn gọn gàng năng động mát mẻ."},
        {"kanji": "理髪", "hiragana": "りはつ (rihatsu)", "sinoVietnamese": "LÝ PHÁT", "meaning": "Nghề cắt tóc cắt tỉa gội sấy", "level": "N1", "breakdown": "理 (Lý) + 髪 (Phát)", "mnemonic": "Tiệm cắt tóc chải chuốt làm đẹp cho mọi người."},
        {"kanji": "抜け毛", "hiragana": "ぬけげ (nukege)", "sinoVietnamese": "BẠT MAO", "meaning": "Tóc rụng", "level": "N2", "breakdown": "抜 + 毛 (liên đới bộ 髟)", "mnemonic": "Tóc rụng theo chu kỳ sinh học cần bổ sung dưỡng chất."},
        {"kanji": "毛髪", "hiragana": "もうはつ (mōhatsu)", "sinoVietnamese": "MAO PHÁT", "meaning": "Lông tóc trên cơ thể", "level": "N1", "breakdown": "毛 (Mao) + 髪 (Phát - có 髟)", "mnemonic": "Hệ thống lông và tóc bảo vệ bề mặt da đầu."}
    ],
    191: [ # 鬥 (Đấu - Đánh nhau giáp lá cà, hai tay vung binh khí)
        {"kanji": "闘う", "hiragana": "たたかう (tatakau)", "sinoVietnamese": "ĐẤU", "meaning": "Chiến đấu kiên cường chống bệnh tật", "level": "N3", "breakdown": "鬥 (Đấu) + 門", "mnemonic": "Hai dũng sĩ lao vào nhau quyết chiến giữ gìn chính nghĩa."},
        {"kanji": "戦闘", "hiragana": "せんとう (sentō)", "sinoVietnamese": "CHIẾN ĐẤU", "meaning": "Trận chiến đấu quyết liệt", "level": "N2", "breakdown": "戦 (Chiến) + 闘 (Đấu - có 鬥)", "mnemonic": "Cuộc giao tranh nảy lửa trên chiến trường khốc liệt."},
        {"kanji": "格闘", "hiragana": "かくとう (kakutō)", "sinoVietnamese": "CÁCH ĐẤU", "meaning": "Đấu võ vật lộn tay không", "level": "N1", "breakdown": "格 (Cách) + 闘 (Đấu)", "mnemonic": "Trận so tài quyền cước tay không giữa các võ sĩ."},
        {"kanji": "奮闘", "hiragana": "ふんとう (funtō)", "sinoVietnamese": "PHẤN ĐẤU", "meaning": "Phấn đấu nỗ lực hết mình", "level": "N2", "breakdown": "奮 (Phấn) + 闘 (Đấu)", "mnemonic": "Dốc hết tâm trí và nghị lực vượt qua mọi rào cản."},
        {"kanji": "闘志", "hiragana": "とうし (tōshi)", "sinoVietnamese": "ĐẤU CHÍ", "meaning": "Ý chí chiến đấu bất khuất", "level": "N1", "breakdown": "闘 (Đấu) + 志 (Chí)", "mnemonic": "Ngọn lửa quyết tâm rực cháy trong tim không hề run sợ."},
        {"kanji": "争闘", "hiragana": "そうとう (sōtō)", "sinoVietnamese": "TRANH ĐẤU", "meaning": "Tranh giành đấu đá quyền lực", "level": "N1", "breakdown": "争 (Tranh) + 闘 (Đấu)", "mnemonic": "Xung đột xâu xé giành giật quyền lợi địa vị."},
        {"kanji": "闘牛", "hiragana": "とうぎゅう (tōgyū)", "sinoVietnamese": "ĐẤU NGƯU", "meaning": "Môn đấu bò tót Tây Ban Nha", "level": "N1", "breakdown": "闘 (Đấu) + 牛 (Ngưu)", "mnemonic": "Vũ điệu dũng cảm của đấu sĩ đối đầu chú bò tót hung hãn."},
        {"kanji": "鬨", "hiragana": "とき (toki)", "sinoVietnamese": "HỐNG", "meaning": "Tiếng hò reo xung trận vang trời", "level": "N1", "breakdown": "鬥 (Đấu) + 共 (Cộng)", "mnemonic": "Hàng vạn binh sĩ cùng đồng thanh reo hò xung phong."},
        {"kanji": "闘病", "hiragana": "とうびょう (tōbyō)", "sinoVietnamese": "ĐẤU BỆNH", "meaning": "Chiến đấu chống lại bệnh tật", "level": "N1", "breakdown": "闘 (Đấu) + 病 (Bệnh)", "mnemonic": "Nghị lực kiên cường chiến thắng căn bệnh hiểm nghèo."},
        {"kanji": "闘争", "hiragana": "とうそう (tōsō)", "sinoVietnamese": "ĐẤU TRANH", "meaning": "Đấu tranh đòi quyền lợi", "level": "N1", "breakdown": "闘 (Đấu) + 争 (Tranh)", "mnemonic": "Cuộc đấu tranh bền bỉ vì quyền lợi người lao động."}
    ],
    192: [ # 鬯 (Sưởng - Hũ rượu nghệ thơm dâng tế thần linh)
        {"kanji": "鬱", "hiragana": "うつ (utsu)", "sinoVietnamese": "ÚC", "meaning": "U uất, trầm cảm, rừng cây um tùm", "level": "N1", "breakdown": "Chứa bộ 鬯 ở giữa", "mnemonic": "Nỗi u uất sâu kín như hũ rượu cất giữ giữa rừng rậm um tùm."},
        {"kanji": "鬱病", "hiragana": "うつびょう (utsubyō)", "sinoVietnamese": "ÚC BỆNH", "meaning": "Bệnh trầm cảm tâm lý", "level": "N1", "breakdown": "鬱 (Úc - có 鬯) + 病 (Bệnh)", "mnemonic": "Tâm trạng chìm trong u uất kéo dài cần điều trị tâm lý."},
        {"kanji": "陰鬱", "hiragana": "いんうつ (in'utsu)", "sinoVietnamese": "ÂM ÚC", "meaning": "U ám, buồn bã ủ rũ", "level": "N1", "breakdown": "陰 (Âm) + 鬱 (Úc)", "mnemonic": "Bầu trời ảm đạm phủ bóng đen lên tâm trạng."},
        {"kanji": "鬱憤", "hiragana": "うっぷん (uppun)", "sinoVietnamese": "ÚC PHẪN", "meaning": "Uất hận dồn nén trong lòng", "level": "N1", "breakdown": "鬱 (Úc) + 憤 (Phẫn)", "mnemonic": "Cơn phẫn uất kìm nén lâu ngày chực chờ bùng nổ."},
        {"kanji": "憂鬱", "hiragana": "ゆううつ (yūutsu)", "sinoVietnamese": "ƯU ÚC", "meaning": "Buồn rầu phiền muộn", "level": "N2", "breakdown": "憂 (Ưu) + 鬱 (Úc - có 鬯)", "mnemonic": "Tâm trạng nặng trĩu âu lo phiền muộn vì việc đời."},
        {"kanji": "鬱陶しい", "hiragana": "うっとうしい (uttōshii)", "sinoVietnamese": "ÚC ĐÀO", "meaning": "Bứt rứt, ngột ngạt khó chịu", "level": "N1", "breakdown": "鬱 (Úc) + 陶", "mnemonic": "Thời tiết oi bức ngột ngạt làm lòng dạ bứt rứt."},
        {"kanji": "鬯酒", "hiragana": "ちょうしゅ (chōshu)", "sinoVietnamese": "SƯỞNG TỬU", "meaning": "Rượu nghệ thơm cúng tế trời đất", "level": "N1", "breakdown": "鬯 (Sưởng) + 酒 (Tửu)", "mnemonic": "Hũ rượu quý dâng lên các vị thần linh ban phước lành."},
        {"kanji": "秬鬯", "hiragana": "きょちょう (kyochō)", "sinoVietnamese": "CỰ SƯỞNG", "meaning": "Rượu nấu từ kê đen thơm nức", "level": "N1", "breakdown": "秬 (Kê đen) + 鬯 (Sưởng)", "mnemonic": "Thức uống hoàng gia cúng tế tổ tiên thời cổ đại."},
        {"kanji": "鬱蒼", "hiragana": "うっそう (ussō)", "sinoVietnamese": "ÚC THƯƠNG", "meaning": "Cây cối um tùm rậm rạp", "level": "N1", "breakdown": "鬱 (Úc - có 鬯) + 蒼 (Thương)", "mnemonic": "Khu rừng nguyên sinh cây cối sum suê che khuất ánh mặt trời."},
        {"kanji": "鬱屈", "hiragana": "うっくつ (ukkutsu)", "sinoVietnamese": "ÚC KHUẤT", "meaning": "U uất tắc nghẽn tâm tư", "level": "N1", "breakdown": "鬱 (Úc) + 屈 (Khuất)", "mnemonic": "Nỗi u uất đè nặng không cách nào giải tỏa được."}
    ],
    193: [ # 鬲 (Cách - Nồi nấu ba chân rỗng, đồ gốm cổ)
        {"kanji": "隔てる", "hiragana": "へだてる (hedateru)", "sinoVietnamese": "CÁCH", "meaning": "Ngăn cách, chia tách", "level": "N2", "breakdown": "阝 (Phụ) + 鬲 (Cách)", "mnemonic": "Bức tường ngăn cách hai bên như vách nồi kiên cố."},
        {"kanji": "隔離", "hiragana": "かくり (kakuri)", "sinoVietnamese": "CÁCH LY", "meaning": "Cách ly y tế phòng dịch", "level": "N1", "breakdown": "隔 (Cách - có 鬲) + 離 (Ly)", "mnemonic": "Tách biệt bệnh nhân để bảo vệ an toàn cho cộng đồng."},
        {"kanji": "隔週", "hiragana": "かくしゅう (kakushū)", "sinoVietnamese": "CÁCH CHU", "meaning": "Cách một tuần một lần", "level": "N2", "breakdown": "隔 (Cách) + 週 (Chu)", "mnemonic": "Hoạt động diễn ra cách tuần đều đặn."},
        {"kanji": "隔月", "hiragana": "かくげつ (kakugetsu)", "sinoVietnamese": "CÁCH NGUYỆT", "meaning": "Cách một tháng một lần", "level": "N2", "breakdown": "隔 (Cách) + 月 (Nguyệt)", "mnemonic": "Hai tháng một kỳ phát hành tạp chí."},
        {"kanji": "融和", "hiragana": "ゆうわ (yūwa)", "sinoVietnamese": "DUNG HÒA", "meaning": "Hòa nhập gắn kết", "level": "N1", "breakdown": "融 (Dung - có 鬲) + 和 (Hòa)", "mnemonic": "Hòa tan vào nhau êm đẹp như nấu chung trong một nồi."},
        {"kanji": "融資", "hiragana": "ゆうし (yūshi)", "sinoVietnamese": "DUNG TƯ", "meaning": "Cấp vốn, cho vay vốn", "level": "N1", "breakdown": "融 (Dung - có 鬲) + 資 (Tư)", "mnemonic": "Dòng vốn lưu thông nuôi dưỡng các dự án kinh tế."},
        {"kanji": "融通", "hiragana": "ゆうずう (yūzū)", "sinoVietnamese": "DUNG THÔNG", "meaning": "Linh hoạt uyển chuyển", "level": "N1", "breakdown": "融 (Dung) + 通 (Thông)", "mnemonic": "Xử lý tình huống linh động không máy móc cứng nhắc."},
        {"kanji": "隔日", "hiragana": "かくじつ (kakujitsu)", "sinoVietnamese": "CÁCH NHẬT", "meaning": "Cách ngày một lần", "level": "N2", "breakdown": "隔 (Cách) + 日 (Nhật)", "mnemonic": "Uống thuốc hoặc luyện tập cách một ngày một lần."},
        {"kanji": "隔たり", "hiragana": "へだたり (hedatari)", "sinoVietnamese": "CÁCH", "meaning": "Khoảng cách cách biệt", "level": "N2", "breakdown": "隔 (Cách - có 鬲)", "mnemonic": "Khoảng cách ngăn cách thế hệ cần lắng nghe để thu hẹp."},
        {"kanji": "金融", "hiragana": "きんゆう (kin'yū)", "sinoVietnamese": "KIM DUNG", "meaning": "Tài chính ngân hàng", "level": "N2", "breakdown": "金 (Kim) + 融 (Dung - có 鬲)", "mnemonic": "Dòng chảy tiền tệ điều tiết toàn bộ nền kinh tế."}
    ],
    194: [ # 鬼 (Quỷ - Linh hồn, ma quỷ đầu to dị dạng)
        {"kanji": "鬼", "hiragana": "おに (oni)", "sinoVietnamese": "QUỶ", "meaning": "Con quỷ có sừng, hung dữ", "level": "N3", "breakdown": "鬼 (Quỷ)", "mnemonic": "Quái vật đầu to có sừng cầm chùy gai hung dữ."},
        {"kanji": "魅力", "hiragana": "みりょく (miryoku)", "sinoVietnamese": "MỊ LỰC", "meaning": "Sức quyến rũ mê hoặc", "level": "N3", "breakdown": "魅 (Mị - có 鬼) + 力 (Lực)", "mnemonic": "Sức hút ma mị khó cưỡng làm say đắm lòng người."},
        {"kanji": "鬼ごっこ", "hiragana": "おにごっこ (onigokko)", "sinoVietnamese": "QUỶ", "meaning": "Trò chơi đuổi bắt trốn tìm", "level": "N3", "breakdown": "鬼 (Quỷ) + ごっこ", "mnemonic": "Trò chơi con nít một người đóng quỷ đi bắt các bạn."},
        {"kanji": "吸血鬼", "hiragana": "きゅうけつき (kyūketsuki)", "sinoVietnamese": "HẤP HUYẾT QUỶ", "meaning": "Ma cà rồng hút máu", "level": "N2", "breakdown": "吸血 (Hút máu) + 鬼 (Quỷ)", "mnemonic": "Quái vật bóng đêm chuyên đi hút máu người."},
        {"kanji": "魂", "hiragana": "たましい (tamashii)", "sinoVietnamese": "HỒN", "meaning": "Linh hồn bất diệt", "level": "N2", "breakdown": "云 + 鬼 (Quỷ)", "mnemonic": "Linh hồn thanh cao bay lượn trên mây ngàn."},
        {"kanji": "魔術", "hiragana": "まじゅつ (majutsu)", "sinoVietnamese": "MA THUẬT", "meaning": "Ảo thuật, phép thuật ma quái", "level": "N2", "breakdown": "魔 (Ma - có 鬼) + 術 (Thuật)", "mnemonic": "Phép thuật biến hóa khôn lường đầy kỳ ảo."},
        {"kanji": "邪魔", "hiragana": "じゃま (jama)", "sinoVietnamese": "TÀ MA", "meaning": "Quấy rầy, cản trở", "level": "N4", "breakdown": "邪 (Tà) + 魔 (Ma - có 鬼)", "mnemonic": "Tà ma cản lối làm phiền toái công việc người khác."},
        {"kanji": "悪魔", "hiragana": "あくま (akuma)", "sinoVietnamese": "ÁC MA", "meaning": "Ác quỷ tàn ác", "level": "N2", "breakdown": "悪 (Ác) + 魔 (Ma - có 鬼)", "mnemonic": "Kẻ đại diện cho thế lực bóng tối tàn bạo độc ác."},
        {"kanji": "鬼才", "hiragana": "きさい (kisai)", "sinoVietnamese": "QUỶ TÀI", "meaning": "Tài năng xuất quỷ nhập thần", "level": "N1", "breakdown": "鬼 (Quỷ) + 才 (Tài)", "mnemonic": "Thiên tài có tư duy xuất chúng vượt xa người phàm."},
        {"kanji": "気迫", "hiragana": "きはく (kihaku)", "sinoVietnamese": "KHÍ PHÁCH", "meaning": "Khí thế áp đảo dũng mãnh", "level": "N1", "breakdown": "Chứa gốc chữ 魄 (có 鬼)", "mnemonic": "Khí phách ngút trời làm đối thủ kinh hồn bạt vía."}
    ],
    195: [ # 魚 (Ngư - Con cá bơi dưới nước có vây và vảy)
        {"kanji": "魚", "hiragana": "さかな (sakana) / うお (uo)", "sinoVietnamese": "NGƯ", "meaning": "Con cá bơi lội", "level": "N5", "breakdown": "魚 (Ngư)", "mnemonic": "Đầu cá, vảy cá và chiếc đuôi vẫy bơi tung tăng dưới làn nước."},
        {"kanji": "金魚", "hiragana": "きんぎょ (kingyo)", "sinoVietnamese": "KIM NGƯ", "meaning": "Cá vàng cảnh tung tăng", "level": "N4", "breakdown": "金 (Kim) + 魚 (Ngư)", "mnemonic": "Chú cá vàng óng ả bơi lội trong bể kính trong veo."},
        {"kanji": "魚屋", "hiragana": "さかなや (sakanaya)", "sinoVietnamese": "NGƯ ỐC", "meaning": "Cửa hàng bán hải sản tươi sống", "level": "N5", "breakdown": "魚 (Ngư) + 屋 (Ốc)", "mnemonic": "Sạp hàng bày bán cá tôm tươi ngon vừa cập bến."},
        {"kanji": "漁業", "hiragana": "ぎょぎょう (gyogyō)", "sinoVietnamese": "NGƯ NGHIỆP", "meaning": "Nghề đánh bắt hải sản", "level": "N3", "breakdown": "漁 (Ngư) + 業 (Nghiệp)", "mnemonic": "Ngư dân ra khơi đánh bắt cá tôm nuôi sống gia đình."},
        {"kanji": "鮮魚", "hiragana": "せんぎょ (sengyo)", "sinoVietnamese": "TIÊN NGƯ", "meaning": "Cá tươi ngon vừa bắt", "level": "N2", "breakdown": "鮮 (Tiên) + 魚 (Ngư)", "mnemonic": "Những mẻ cá tươi rói chuẩn bị cho món sashimi."},
        {"kanji": "鮭", "hiragana": "さけ (sake)", "sinoVietnamese": "KHUÊ", "meaning": "Cá hồi cam ngọt bùi", "level": "N3", "breakdown": "魚 (Ngư) + 圭 (Khuê)", "mnemonic": "Loài cá hồi vượt thác sinh sản thịt cam béo ngậy."},
        {"kanji": "鯨", "hiragana": "くじら (kujira)", "sinoVietnamese": "KÌNH", "meaning": "Cá voi khổng lồ đại dương", "level": "N2", "breakdown": "魚 (Ngư) + 京 (Kinh)", "mnemonic": "Loài sinh vật biển to lớn như tòa nhà kinh đô."},
        {"kanji": "鯛", "hiragana": "たい (tai)", "sinoVietnamese": "ĐIÊU", "meaning": "Cá tráp biển mang lại may mắn", "level": "N2", "breakdown": "魚 (Ngư) + 周 (Chu)", "mnemonic": "Cá tráp đỏ món ăn may mắn trong các bữa tiệc mừng của người Nhật."},
        {"kanji": "鮪", "hiragana": "まぐろ (maguro)", "sinoVietnamese": "VỊ", "meaning": "Cá ngừ đại dương hảo hạng", "level": "N2", "breakdown": "魚 (Ngư) + 有 (Hữu)", "mnemonic": "Cá ngừ béo ngậy món sushi được ưa chuộng nhất."},
        {"kanji": "人魚", "hiragana": "にんぎょ (ningyo)", "sinoVietnamese": "NHÂN NGƯ", "meaning": "Nàng tiên cá trong cổ tích", "level": "N2", "breakdown": "人 (Nhân) + 魚 (Ngư)", "mnemonic": "Nàng tiên cá xinh đẹp với chiếc đuôi cá vẫy lượn dưới biển sâu."}
    ],
    196: [ # 鳥 (Điểu - Con chim đuôi dài, có lông vũ và mỏ nhọn)
        {"kanji": "鳥", "hiragana": "とり (tori)", "sinoVietnamese": "ĐIỂU", "meaning": "Con chim, gia cầm", "level": "N5", "breakdown": "鳥 (Điểu)", "mnemonic": "Con chim có mắt tròn, mỏ nhọn và đuôi dài đậu trên cành."},
        {"kanji": "小鳥", "hiragana": "ことり (kotori)", "sinoVietnamese": "TIỂU ĐIỂU", "meaning": "Chú chim non ríu rít", "level": "N5", "breakdown": "小 (Tiểu) + 鳥 (Điểu)", "mnemonic": "Chim non hót líu lo chào đón bình minh sớm."},
        {"kanji": "白鳥", "hiragana": "はくちょう (hakuchō)", "sinoVietnamese": "BẠCH ĐIỂU", "meaning": "Thiên nga trắng thanh tao", "level": "N2", "breakdown": "白 (Bạch) + 鳥 (Điểu)", "mnemonic": "Chim thiên nga với bộ lông trắng muốt bơi trên mặt hồ êm đềm."},
        {"kanji": "鳴く", "hiragana": "なく (naku)", "sinoVietnamese": "MINH", "meaning": "Chim hót líu lo, thú kêu", "level": "N4", "breakdown": "口 (Khẩu) + 鳥 (Điểu)", "mnemonic": "Chú chim mở rộng chiếc mỏ cất tiếng hót véo von."},
        {"kanji": "焼鳥", "hiragana": "やきとり (yakitori)", "sinoVietnamese": "THIÊU ĐIỂU", "meaning": "Thịt gà xiên nướng thơm lừng", "level": "N4", "breakdown": "焼 (Thiêu) + 鳥 (Điểu)", "mnemonic": "Món gà nướng xiên que nức mũi nhậu cùng bia lạnh."},
        {"kanji": "野鳥", "hiragana": "やちょう (yachō)", "sinoVietnamese": "DÃ ĐIỂU", "meaning": "Chim hoang dã thiên nhiên", "level": "N2", "breakdown": "野 (Dã) + 鳥 (Điểu)", "mnemonic": "Các loài chim tự do bay lượn giữa núi rừng hoang sơ."},
        {"kanji": "鳩", "hiragana": "はと (hato)", "sinoVietnamese": "CÂU", "meaning": "Chim bồ câu hòa bình", "level": "N2", "breakdown": "九 (Cửu) + 鳥 (Điểu)", "mnemonic": "Cánh chim bồ câu trắng mang thông điệp hòa bình nhân loại."},
        {"kanji": "鴨", "hiragana": "かも (kamo)", "sinoVietnamese": "ÁP", "meaning": "Con vịt trời bơi lội", "level": "N2", "breakdown": "甲 (Giáp) + 鳥 (Điểu)", "mnemonic": "Đàn vịt trời rẽ nước bơi lặn kiếm mồi bên đầm sen."},
        {"kanji": "鶴", "hiragana": "つる (tsuru)", "sinoVietnamese": "HẠC", "meaning": "Chim hạc trắng trường thọ", "level": "N2", "breakdown": "隺 + 鳥 (Điểu)", "mnemonic": "Biểu tượng sống lâu trường thọ trong văn hóa Á Đông."},
        {"kanji": "烏", "hiragana": "からす (karasu)", "sinoVietnamese": "Ô", "meaning": "Con quạ đen thông minh", "level": "N2", "breakdown": "Biến thể từ chữ 鳥 (mắt đen tuyền)", "mnemonic": "Con quạ lông đen nhánh kêu quạ quạ trên ngọn cây cao."}
    ],
    197: [ # 鹵 (Lỗ - Vùng đất mặn ven biển, muối mỏ tự nhiên)
        {"kanji": "鹵獲", "hiragana": "ろかく (rokaku)", "sinoVietnamese": "LỖ HOẠCH", "meaning": "Tịch thu, thu gom chiến lợi phẩm", "level": "N1", "breakdown": "鹵 (Lỗ) + 獲 (Hoạch)", "mnemonic": "Tịch thu toàn bộ muối và chiến lợi phẩm của đối phương."},
        {"kanji": "塩分", "hiragana": "えんぶん (enbun)", "sinoVietnamese": "DIÊM PHÂN", "meaning": "Độ mặn hàm lượng muối", "level": "N2", "breakdown": "Chứa gốc nghĩa đất mặn 鹵", "mnemonic": "Hàm lượng muối mặn cần kiểm soát trong khẩu phần ăn."},
        {"kanji": "鹹水", "hiragana": "かんすい (kansui)", "sinoVietnamese": "HÀM THỦY", "meaning": "Nước muối kiềm làm mì ramen", "level": "N1", "breakdown": "鹹 (Hàm - chứa 鹵) + 水 (Thủy)", "mnemonic": "Nước khoáng mặn tạo độ dai giòn vàng óng cho sợi mì ramen."},
        {"kanji": "鹵莽", "hiragana": "ろもう (romō)", "sinoVietnamese": "LỖ MÃNG", "meaning": "Hấp tấp, cẩu thả sơ sài", "level": "N1", "breakdown": "鹵 (Lỗ) + 莽 (Mãng)", "mnemonic": "Làm việc hấp tấp cẩu thả làm hỏng việc lớn."},
        {"kanji": "岩塩", "hiragana": "がんえん (gan'en)", "sinoVietnamese": "NHAM DIÊM", "meaning": "Muối mỏ đá tự nhiên", "level": "N1", "breakdown": "岩 (Nham) + 塩 (Diêm - chứa 鹵)", "mnemonic": "Muối kết tinh thành khối đá sâu trong lòng núi."},
        {"kanji": "粗塩", "hiragana": "あらじお (arajio)", "sinoVietnamese": "THÔ DIÊM", "meaning": "Muối hạt thô nguyên chất", "level": "N2", "breakdown": "粗 (Thô) + 塩 (Diêm)", "mnemonic": "Muối hạt to phơi từ nước biển giữ trọn vị đậm đà."},
        {"kanji": "塩害", "hiragana": "えんがい (engai)", "sinoVietnamese": "DIÊM HẠI", "meaning": "Nhiễm mặn, gió muối làm rỉ sét", "level": "N1", "breakdown": "塩 (Diêm) + 害 (Hại)", "mnemonic": "Gió biển mặn làm hoen rỉ xe cộ và công trình ven biển."},
        {"kanji": "製塩", "hiragana": "せいえん (seien)", "sinoVietnamese": "CHẾ DIÊM", "meaning": "Nghề làm muối thủ công", "level": "N1", "breakdown": "製 (Chế) + 塩 (Diêm)", "mnemonic": "Nghề phơi nước biển trên đồng muối lấy hạt ngọc trắng."},
        {"kanji": "食塩", "hiragana": "しょくえん (shokuen)", "sinoVietnamese": "THỰC DIÊM", "meaning": "Muối ăn tinh khiết", "level": "N3", "breakdown": "食 (Thực) + 塩 (Diêm)", "mnemonic": "Muối ăn gia vị thiết yếu trong mọi bữa cơm gia đình."},
        {"kanji": "減塩", "hiragana": "げんえん (gen'en)", "sinoVietnamese": "GIẢM DIÊM", "meaning": "Giảm lượng muối bảo vệ tim mạch", "level": "N2", "breakdown": "減 (Giảm) + 塩 (Diêm)", "mnemonic": "Chế độ ăn nhạt giảm muối bảo vệ huyết áp an toàn."}
    ],
    198: [ # 鹿 (Lộc - Con hươu sao, nai sừng tấm)
        {"kanji": "鹿", "hiragana": "しか (shika)", "sinoVietnamese": "LỘC", "meaning": "Con hươu sao hiền lành", "level": "N3", "breakdown": "鹿 (Lộc)", "mnemonic": "Chú hươu có đôi gạc sừng xòe rộng và đôi chân chạy nhanh."},
        {"kanji": "馬鹿", "hiragana": "ばか (baka)", "sinoVietnamese": "MÃ LỘC", "meaning": "Ngốc nghếch, ngớ ngẩn (chỉ hươu bảo ngựa)", "level": "N5", "breakdown": "馬 (Mã) + 鹿 (Lộc)", "mnemonic": "Điển tích Triệu Cao chỉ hươu bảo ngựa lừa dối quân thần."},
        {"kanji": "鹿児島", "hiragana": "かごしま (kagoshima)", "sinoVietnamese": "LỘC NHI ĐẢO", "meaning": "Tỉnh Kagoshima miền nam Nhật Bản", "level": "N3", "breakdown": "鹿 (Lộc) + 児 (Nhi) + 島 (Đảo)", "mnemonic": "Vùng đất trù phú với thiên nhiên núi lửa hùng vĩ."},
        {"kanji": "鹿肉", "hiragana": "しかにく (shikaniku)", "sinoVietnamese": "LỘC NHỤC", "meaning": "Thịt hươu, thịt nai bổ dưỡng", "level": "N2", "breakdown": "鹿 (Lộc) + 肉 (Nhục)", "mnemonic": "Thịt thú rừng thơm ngọt giàu dinh dưỡng."},
        {"kanji": "鹿革", "hiragana": "しかがわ (shikagawa)", "sinoVietnamese": "LỘC CÁCH", "meaning": "Da hươu mềm mịn làm găng tay", "level": "N1", "breakdown": "鹿 (Lộc) + 革 (Cách)", "mnemonic": "Chất liệu da hươu dẻo dai chống trầy xước thượng hạng."},
        {"kanji": "鹿角", "hiragana": "ろっかく (rokkaku) / しかづの", "sinoVietnamese": "LỘC GIÁC", "meaning": "Gạc nai nhung hươu quý hiếm", "level": "N1", "breakdown": "鹿 (Lộc) + 角 (Giác)", "mnemonic": "Đôi sừng hươu quý làm vị thuốc bổ thượng hạng trong đông y."},
        {"kanji": "迷鹿", "hiragana": "めいろく (meiroku)", "sinoVietnamese": "MÊ LỘC", "meaning": "Hươu lạc lối trong rừng", "level": "N1", "breakdown": "迷 (Mê) + 鹿 (Lộc)", "mnemonic": "Chú hươu con ngơ ngác lạc bước giữa rừng sâu."},
        {"kanji": "麗しい", "hiragana": "うるわしい (uruwashii)", "sinoVietnamese": "LỆ", "meaning": "Diễm lệ tuyệt mỹ", "level": "N1", "breakdown": "Chứa bộ 鹿 trong 麗", "mnemonic": "Vẻ đẹp kiều diễm tuyệt trần như dáng hươu sao."},
        {"kanji": "塵", "hiragana": "ごみ (gomi) / ちり (chiri)", "sinoVietnamese": "TRẦN", "meaning": "Bụi trần, rác rưởi", "level": "N2", "breakdown": "鹿 (Lộc) + 土 (Thổ)", "mnemonic": "Đàn hươu chạy qua tung bụi đất mù mịt cả bầu trời."},
        {"kanji": "小鹿", "hiragana": "こじか (kojika)", "sinoVietnamese": "TIỂU LỘC", "meaning": "Chú hươu con Bambi ngây thơ", "level": "N3", "breakdown": "小 (Tiểu) + 鹿 (Lộc)", "mnemonic": "Chú nai con ngơ ngác sải những bước chân đầu đời."}
    ],
    199: [ # 麥 / 麦 (Mạch - Cây lúa mạch, lúa mì làm bánh)
        {"kanji": "麦", "hiragana": "むぎ (mugi)", "sinoVietnamese": "MẠCH", "meaning": "Cây lúa mạch, lúa mì", "level": "N3", "breakdown": "麦 (Mạch)", "mnemonic": "Cây lúa mạch có râu dài trĩu hạt đón bước chân người đi."},
        {"kanji": "小麦", "hiragana": "こむぎ (komugi)", "sinoVietnamese": "TIỂU MẠCH", "meaning": "Cây lúa mì xay bột", "level": "N2", "breakdown": "小 (Tiểu) + 麦 (Mạch)", "mnemonic": "Hạt lúa mì nguyên liệu xay thành bột mì làm bánh nướng."},
        {"kanji": "小麦粉", "hiragana": "こむぎこ (komugiko)", "sinoVietnamese": "TIỂU MẠCH PHẤN", "meaning": "Bột mì làm bánh", "level": "N3", "breakdown": "小麦 + 粉 (Phấn)", "mnemonic": "Bột mì trắng mịn làm bánh mì ramen tempura giòn rụm."},
        {"kanji": "麦茶", "hiragana": "むぎちゃ (mugicha)", "sinoVietnamese": "MẠCH TRÀ", "meaning": "Trà lúa mạch thanh nhiệt ngày hè", "level": "N3", "breakdown": "麦 (Mạch) + 茶 (Trà)", "mnemonic": "Thức uống giải nhiệt ngọt bùi thơm lừng mùa hè nước Nhật."},
        {"kanji": "大麦", "hiragana": "おおむぎ (ōmugi)", "sinoVietnamese": "ĐẠI MẠCH", "meaning": "Đại mạch nấu bia", "level": "N2", "breakdown": "大 (Đại) + 麦 (Mạch)", "mnemonic": "Hạt đại mạch ủ men nấu bia và cháo bổ dưỡng."},
        {"kanji": "麦酒", "hiragana": "ばくしゅ (bakushu) / ビール", "sinoVietnamese": "MẠCH TỬU", "meaning": "Rượu bia lúa mạch mát lạnh", "level": "N2", "breakdown": "麦 (Mạch) + 酒 (Tửu)", "mnemonic": "Bia vàng sủi bọt nấu từ mầm lúa mạch lên men hảo hạng."},
        {"kanji": "麦畑", "hiragana": "むぎばたけ (mugibatake)", "sinoVietnamese": "MẠCH HẠC", "meaning": "Cánh đồng lúa mì vàng óng", "level": "N2", "breakdown": "麦 (Mạch) + 畑 (Hạc - nương rẫy)", "mnemonic": "Cánh đồng lúa mì chín vàng rực dập dờn trong nắng chiều."},
        {"kanji": "ライ麦", "hiragana": "らいむぎ (raimugi)", "sinoVietnamese": "MẠCH", "meaning": "Lúa mạch đen làm bánh mì lứt", "level": "N2", "breakdown": "ライ + 麦 (Mạch)", "mnemonic": "Nguyên liệu làm bánh mì đen dinh dưỡng phong cách Bắc Âu."},
        {"kanji": "麦芽", "hiragana": "ばくが (bakuga)", "sinoVietnamese": "MẠCH NHA", "meaning": "Mầm lúa mạch, mạch nha ngọt ngào", "level": "N1", "breakdown": "麦 (Mạch) + 芽 (Nha - mầm)", "mnemonic": "Mầm lúa mạch ủ ngọt làm kẹo mạch nha dẻo quánh."},
        {"kanji": "麦わら帽子", "hiragana": "むぎわらぼうし", "sinoVietnamese": "MẠCH MÃO TỬ", "meaning": "Chiếc mũ rơm che nắng của Luffy", "level": "N3", "breakdown": "麦わら (Rơm lúa mì) + 帽子", "mnemonic": "Chiếc mũ đan bằng cọng rơm lúa mì che mát ngày hè rực rỡ."}
    ],
    200: [ # 麻 (Ma - Cây gai dầu dệt vải, làm tê dại)
        {"kanji": "麻", "hiragana": "あさ (asa)", "sinoVietnamese": "MA", "meaning": "Cây gai dầu, vải lanh gai", "level": "N2", "breakdown": "广 (Quảng - mái nhà) + 林 (hai cây gai hong khô)", "mnemonic": "Phơi những bó cây gai dầu dưới mái hiên để tách sợi dệt áo."},
        {"kanji": "麻酔", "hiragana": "ますい (masui)", "sinoVietnamese": "MA TÚY", "meaning": "Thuốc gây tê, gây mê phẫu thuật", "level": "N2", "breakdown": "麻 (Ma) + 酔 (Túy - say)", "mnemonic": "Làm tê liệt cảm giác đau đớn khi bác sĩ mổ phẫu thuật."},
        {"kanji": "麻痺", "hiragana": "まひ (mahi)", "sinoVietnamese": "MA TÝ", "meaning": "Tê liệt, mất cảm giác", "level": "N1", "breakdown": "麻 (Ma) + 痺 (Tý - tê)", "mnemonic": "Tay chân tê dại không cử động được sau đột quỵ."},
        {"kanji": "麻薬", "hiragana": "まやく (mayaku)", "sinoVietnamese": "MA DƯỢC", "meaning": "Chất ma túy cấm", "level": "N2", "breakdown": "麻 (Ma) + 薬 (Dược)", "mnemonic": "Chất kích thích gây nghiện độc hại pháp luật nghiêm cấm."},
        {"kanji": "麻婆豆腐", "hiragana": "まーぼーどうふ (mābōdōfu)", "sinoVietnamese": "MA BÀ ĐẬU HŨ", "meaning": "Món đậu phụ sốt cay Tứ Xuyên", "level": "N3", "breakdown": "麻 + 婆 + 豆腐", "mnemonic": "Món đậu phụ sốt ớt cay tê nồng nức danh của bà Ma."},
        {"kanji": "麻布", "hiragana": "あさぬの (asanuno)", "sinoVietnamese": "MA BỐ", "meaning": "Vải bố gai dầu thoáng mát", "level": "N2", "breakdown": "麻 (Ma) + 布 (Bố - vải)", "mnemonic": "Tấm vải dệt từ sợi gai thoáng khí thấm hút mồ hôi ngày hè."},
        {"kanji": "麻袋", "hiragana": "あさぶくろ (asabukuro)", "sinoVietnamese": "MA ĐẠI", "meaning": "Bao tải gai đựng cà phê", "level": "N2", "breakdown": "麻 (Ma) + 袋 (Đại - túi)", "mnemonic": "Bao tải bền chắc chuyên dùng đựng hạt cà phê xuất khẩu."},
        {"kanji": "摩天楼", "hiragana": "まてんろう (matenrō)", "sinoVietnamese": "MA THIÊN LÂU", "meaning": "Tòa nhà chọc trời sừng sững", "level": "N1", "breakdown": "摩 (có bộ 麻) + 天 (Thiên) + 楼 (Lâu)", "mnemonic": "Tòa tháp cao chạm tới mây trời thủ đô."},
        {"kanji": "蕁麻疹", "hiragana": "じんましん (jinmashin)", "sinoVietnamese": "TẦM MA CHẨN", "meaning": "Bệnh nổi mề đay ngứa ngáy", "level": "N1", "breakdown": "蕁 + 麻 (Ma) + 疹", "mnemonic": "Dị ứng nổi mẩn đỏ ngứa rát như chạm phải lá cây gai dại."},
        {"kanji": "麻糸", "hiragana": "あさいと (asaito)", "sinoVietnamese": "MA MỊCH", "meaning": "Sợi chỉ gai bền chắc", "level": "N2", "breakdown": "麻 (Ma) + 糸 (Mịch)", "mnemonic": "Cuộn chỉ bện từ xơ gai bền dai khâu vá giày dép."}
    ],
    201: [ # 黃 / 黄 (Hoàng - Màu vàng rực của đất mẹ màu mỡ)
        {"kanji": "黄色", "hiragana": "きいろ (kiiro)", "sinoVietnamese": "HOÀNG SẮC", "meaning": "Màu vàng tươi sáng", "level": "N5", "breakdown": "黄 (Hoàng) + 色 (Sắc)", "mnemonic": "Sắc vàng ấm áp của ánh nắng mùa thu rọi trên đồng lúa."},
        {"kanji": "黄色い", "hiragana": "きいろい (kiiroi)", "sinoVietnamese": "HOÀNG", "meaning": "Có màu vàng", "level": "N5", "breakdown": "黄 (Hoàng)", "mnemonic": "Đóa hoa cúc vàng rực rỡ đón gió heo may."},
        {"kanji": "黄身", "hiragana": "きみ (kimi)", "sinoVietnamese": "HOÀNG THÂN", "meaning": "Lòng đỏ trứng gà béo ngậy", "level": "N3", "breakdown": "黄 (Hoàng) + 身 (Thân)", "mnemonic": "Phần lòng đỏ thơm ngon giàu dinh dưỡng trong quả trứng."},
        {"kanji": "黄金", "hiragana": "おうごん (ōgon) / こがね", "sinoVietnamese": "HOÀNG KIM", "meaning": "Vàng ròng, thời hoàng kim thịnh vượng", "level": "N2", "breakdown": "黄 (Hoàng) + 金 (Kim)", "mnemonic": "Thứ kim loại quý hiếm ánh vàng rực rỡ vô giá."},
        {"kanji": "黄昏", "hiragana": "たそがれ (tasogare) / こうこん", "sinoVietnamese": "HOÀNG HÔN", "meaning": "Hoàng hôn buông xuống, chập choạng tối", "level": "N1", "breakdown": "黄 (Hoàng) + 昏 (Hôn)", "mnemonic": "Ánh nắng vàng nhạt dần nhường chỗ cho màn đêm buông xuống."},
        {"kanji": "黄砂", "hiragana": "こうさ (kōsa)", "sinoVietnamese": "HOÀNG SA", "meaning": "Cát vàng sa mạc bay trong gió", "level": "N2", "breakdown": "黄 (Hoàng) + 砂 (Sa)", "mnemonic": "Hiện tượng bão bụi cát vàng từ sa mạc bay sang bầu trời Nhật Bản."},
        {"kanji": "黄泉", "hiragana": "よみ (yomi) / こうせん", "sinoVietnamese": "HOÀNG TUYỀN", "meaning": "Suối vàng, cõi âm vĩnh hằng", "level": "N1", "breakdown": "黄 (Hoàng) + 泉 (Tuyền)", "mnemonic": "Dòng suối nơi chín suối thế giới của người đã khuất."},
        {"kanji": "卵黄", "hiragana": "らんおう (ran'ō)", "sinoVietnamese": "NOÃN HOÀNG", "meaning": "Lòng đỏ trứng (thuật ngữ khoa học)", "level": "N1", "breakdown": "卵 (Noãn) + 黄 (Hoàng)", "mnemonic": "Phần lòng đỏ của phôi trứng gia cầm."},
        {"kanji": "黄熱病", "hiragana": "おうねつびょう (ōnetsubyō)", "sinoVietnamese": "HOÀNG NHIỆT BỆNH", "meaning": "Bệnh sốt vàng da truyền nhiễm", "level": "N1", "breakdown": "黄 (Hoàng) + 熱 (Nhiệt) + 病 (Bệnh)", "mnemonic": "Bệnh truyền nhiễm do muỗi làm da chuyển sang sắc vàng."},
        {"kanji": "黄葉", "hiragana": "こうよう (kōyō) / もみじ", "sinoVietnamese": "HOÀNG DIỆP", "meaning": "Lá cây chuyển sang màu vàng thu", "level": "N2", "breakdown": "黄 (Hoàng) + 葉 (Diệp)", "mnemonic": "Rừng cây thay áo vàng rực rỡ đón mùa thu sang."}
    ],
    202: [ # 黍 (Thử - Cây kê hạt tròn dẻo quánh)
        {"kanji": "黍", "hiragana": "きび (kibi)", "sinoVietnamese": "THỬ", "meaning": "Cây kê hạt dẻo làm bánh", "level": "N2", "breakdown": "禾 (Hòa) + 氺 (nước dẻo quánh)", "mnemonic": "Giống ngũ cốc hạt tròn dẻo quánh nấu xôi làm bánh."},
        {"kanji": "黍団子", "hiragana": "きびだんご (kibidango)", "sinoVietnamese": "THỬ ĐOÀN TỬ", "meaning": "Bánh kê Momotaro thuần phục thú", "level": "N2", "breakdown": "黍 (Thử) + 団子 (Bánh nếp dango)", "mnemonic": "Bánh dango bột kê cậu bé Momotaro chia cho chó khỉ trĩ cùng đi diệt quỷ."},
        {"kanji": "黎明", "hiragana": "れいめい (reimei)", "sinoVietnamese": "LÊ MINH", "meaning": "Rạng đông, bình minh thời đại mới", "level": "N1", "breakdown": "黎 (Lê - chứa 黍) + 明 (Minh)", "mnemonic": "Khoảnh khắc ánh bình minh rạng rỡ xua tan bóng tối."},
        {"kanji": "黏土", "hiragana": "ねんど (nendo)", "sinoVietnamese": "NIÊM THỔ", "meaning": "Đất sét nặn đồ gốm", "level": "N2", "breakdown": "黏 (Niêm - có 黍) + 土 (Thổ)", "mnemonic": "Đất sét dẻo quánh như bột kê dùng để nhào nặn tượng gốm."},
        {"kanji": "黏膜", "hiragana": "ねんまく (nenmaku)", "sinoVietnamese": "NIÊM MẠC", "meaning": "Lớp niêm mạc ẩm bảo vệ", "level": "N1", "breakdown": "黏 (Niêm - có 黍) + 膜 (Mạc)", "mnemonic": "Lớp màng nhầy bảo vệ bề mặt bên trong khoang miệng dạ dày."},
        {"kanji": "黎民", "hiragana": "れいみん (reimin)", "sinoVietnamese": "LÊ DÂN", "meaning": "Muôn dân bá tánh", "level": "N1", "breakdown": "黎 (Lê - có 黍) + 民 (Dân)", "mnemonic": "Đông đảo quần chúng nhân dân cần cù lao động."},
        {"kanji": "黍畑", "hiragana": "きびばたけ (kibibatake)", "sinoVietnamese": "THỬ HẠC", "meaning": "Nương rẫy trồng cây kê", "level": "N2", "breakdown": "黍 (Thử) + 畑 (Hạc)", "mnemonic": "Mảnh nương rẫy trĩu những bông kê vàng hạt mẩy."},
        {"kanji": "黍餅", "hiragana": "きびもち (kibimochi)", "sinoVietnamese": "THỬ BÍNH", "meaning": "Bánh dày bột kê thơm dẻo", "level": "N2", "breakdown": "黍 (Thử) + 餅 (Bính - bánh dày)", "mnemonic": "Bánh mochi dẻo quánh làm từ gạo kê thơm lừng."},
        {"kanji": "黍米", "hiragana": "しょまい (shomai)", "sinoVietnamese": "THỬ MỄ", "meaning": "Hạt kê vàng", "level": "N1", "breakdown": "黍 (Thử) + 米 (Mễ)", "mnemonic": "Hạt kê tròn xoe như những viên ngọc vàng óng."},
        {"kanji": "黍離", "hiragana": "しょり (shori)", "sinoVietnamese": "THỬ LY", "meaning": "Nỗi thương cảm cảnh nước mất nhà tan", "level": "N1", "breakdown": "黍 (Thử) + 離 (Ly)", "mnemonic": "Điển tích ngắm ruộng kê xưa hoài niệm về thời hưng thịnh đã qua."}
    ],
    203: [ # 黑 / 黒 (Hắc - Màu đen tuyền khói bồ hóng ngọn lửa)
        {"kanji": "黒い", "hiragana": "くろい (kuroi)", "sinoVietnamese": "HẮC", "meaning": "Màu đen tuyền", "level": "N5", "breakdown": "黒 (Hắc)", "mnemonic": "Khói đen bốc lên từ ngọn lửa lò sưởi bám thành bồ hóng đen nhánh."},
        {"kanji": "黒板", "hiragana": "こくばん (kokuban)", "sinoVietnamese": "HẮC BẢN", "meaning": "Bảng đen lớp học", "level": "N4", "breakdown": "黒 (Hắc) + 板 (Bản - tấm bảng)", "mnemonic": "Tấm bảng đen nơi thầy cô viết phấn trắng giảng bài."},
        {"kanji": "暗黒", "hiragana": "あんこく (ankoku)", "sinoVietnamese": "ÁM HẮC", "meaning": "Bóng tối mịt mù, u tối", "level": "N2", "breakdown": "暗 (Ám) + 黒 (Hắc)", "mnemonic": "Màn đêm u tối không một tia sáng le lói."},
        {"kanji": "黒字", "hiragana": "くろじ (kuroji)", "sinoVietnamese": "HẮC TỰ", "meaning": "Lãi, thặng dư tài chính", "level": "N3", "breakdown": "黒 (Hắc) + 字 (Tự)", "mnemonic": "Dòng chữ viết bằng mực đen báo hiệu kinh doanh có lãi lớn."},
        {"kanji": "真っ黒", "hiragana": "まっくろ (makkuro)", "sinoVietnamese": "CHÂN HẮC", "meaning": "Đen kịt, đen nhánh", "level": "N3", "breakdown": "真 (Chân) + 黒 (Hắc)", "mnemonic": "Màu đen sẫm hoàn toàn như màn đêm không trăng sao."},
        {"kanji": "黙る", "hiragana": "だまる (damaru)", "sinoVietnamese": "MẶC", "meaning": "Im lặng không nói lời nào", "level": "N3", "breakdown": "黒 (Hắc) + 犬 (Khuyển)", "mnemonic": "Chú chó đen nằm im thin thít canh giữ ngôi nhà trong đêm."},
        {"kanji": "沈黙", "hiragana": "ちんもく (chinmoku)", "sinoVietnamese": "TRẦM MẶC", "meaning": "Trầm mặc, im lặng sâu sắc", "level": "N2", "breakdown": "沈 (Trầm) + 黙 (Mặc - có 黒)", "mnemonic": "Khoảng lặng thinh sâu lắng chứa đựng bao suy tư."},
        {"kanji": "黒海", "hiragana": "こっかい (kokkai)", "sinoVietnamese": "HẮC HẢI", "meaning": "Biển Đen (châu Âu)", "level": "N2", "breakdown": "黒 (Hắc) + 海 (Hải)", "mnemonic": "Vùng biển sâu thẳm ngăn cách châu Âu và châu Á."},
        {"kanji": "黒曜石", "hiragana": "こくようせき (kokuyōseki)", "sinoVietnamese": "HẮC DIỆU THẠCH", "meaning": "Đá vỏ chai thủy tinh đen bóng", "level": "N1", "breakdown": "黒 + 曜 + 石", "mnemonic": "Loại đá nham thạch núi lửa đen bóng sắc như dao mổ."},
        {"kanji": "白黒", "hiragana": "しろくろ (shirokuro)", "sinoVietnamese": "BẠCH HẮC", "meaning": "Trắng đen rõ ràng, đúng sai", "level": "N2", "breakdown": "白 (Bạch) + 黒 (Hắc)", "mnemonic": "Phân minh trắng đen rõ ràng không để mập mờ."}
    ],
    204: [ # 黹 (Chỉ - May vá, đường kim thêu thùa hoa văn)
        {"kanji": "刺繍", "hiragana": "ししゅう (shishū)", "sinoVietnamese": "THÍCH TÚ", "meaning": "Nghệ thuật thêu thùa gấm hoa", "level": "N1", "breakdown": "繡 (Tú - có bộ 黹)", "mnemonic": "Từng mũi kim luồn chỉ thêu nên bức tranh hoa gấm lộng lẫy."},
        {"kanji": "刺す", "hiragana": "さす (sasu)", "sinoVietnamese": "THÍCH", "meaning": "Đâm kim, chích thuốc, xâu chuỗi", "level": "N3", "breakdown": "liên quan may vá thêu thùa", "mnemonic": "Cây kim nhọn đâm xuyên qua lớp vải dệt thêu hoa."},
        {"kanji": "縫う", "hiragana": "ぬう (nuu)", "sinoVietnamese": "PHÙNG", "meaning": "Khâu vá quần áo", "level": "N2", "breakdown": "糸 (Mịch) + 逢 (liên đới bộ 黹)", "mnemonic": "Đưa đường kim mũi chỉ nối liền mảnh vải rách."},
        {"kanji": "織る", "hiragana": "おる (oru)", "sinoVietnamese": "CHỨC", "meaning": "Dệt vải tơ tằm", "level": "N2", "breakdown": "糸 + 戠", "mnemonic": "Khung cửi lách cách dệt nên tấm lụa mềm mại."},
        {"kanji": "黹文", "hiragana": "ちぶん (chibun)", "sinoVietnamese": "CHỈ VĂN", "meaning": "Hoa văn thêu tinh xảo", "level": "N1", "breakdown": "黹 (Chỉ) + 文 (Văn)", "mnemonic": "Họa tiết hoa văn thêu tay tỉ mỉ đối xứng trên vạt áo hoàng gia."},
        {"kanji": "縫製", "hiragana": "ほうせい (hōsei)", "sinoVietnamese": "PHÙNG CHẾ", "meaning": "Ngành may mặc trang phục", "level": "N1", "breakdown": "縫 (Phùng) + 製 (Chế)", "mnemonic": "Dây chuyền cắt may trang phục xuất khẩu chuẩn mực."},
        {"kanji": "針仕事", "hiragana": "はりしごと (harishigoto)", "sinoVietnamese": "CHÂM SỰ", "meaning": "Công việc khâu vá thêu thùa của phụ nữ", "level": "N2", "breakdown": "針 (Kim) + 仕事 (Công việc)", "mnemonic": "Ngồi bên cửa sổ tỉ mẩn khâu từng đường kim mũi chỉ."},
        {"kanji": "裁縫", "hiragana": "さいほう (saihō)", "sinoVietnamese": "TÀI PHÙNG", "meaning": "Cắt may y phục", "level": "N2", "breakdown": "裁 (Tài - cắt) + 縫 (Phùng - khâu)", "mnemonic": "Cắt vải theo số đo rồi may thành bộ đồ đẹp."},
        {"kanji": "錦繍", "hiragana": "きんしゅう (kinshū)", "sinoVietnamese": "CẨM TÚ", "meaning": "Gấm vóc thêu hoa rực rỡ non sông", "level": "N1", "breakdown": "錦 (Cẩm) + 繍 (Tú - có 黹)", "mnemonic": "Non sông gấm vóc tươi đẹp rực rỡ như một bức thêu hoa."},
        {"kanji": "繍工", "hiragana": "しゅうこう (shūkō)", "sinoVietnamese": "TÚ CÔNG", "meaning": "Thợ thêu thủ công lành nghề", "level": "N1", "breakdown": "繍 (Tú) + 工 (Công)", "mnemonic": "Bàn tay nghệ nhân thêu từng cánh hoa sống động như thật."}
    ],
    205: [ # 黽 (Mãnh - Con ếch mắt lồi, cố gắng nỗ lực)
        {"kanji": "勉学", "hiragana": "べんがく (bengaku)", "sinoVietnamese": "MIỄN HỌC", "meaning": "Chăm chỉ học tập, nỗ lực đèn sách", "level": "N3", "breakdown": "勉 (Miễn - chứa gốc 黽) + 学 (Học)", "mnemonic": "Dốc lòng kiên trì nỗ lực như chú ếch bật nhảy vượt khó khăn."},
        {"kanji": "勉強", "hiragana": "べんきょう (benkyō)", "sinoVietnamese": "MIỄN CƯỜNG", "meaning": "Học bài, giảm giá mua sắm", "level": "N5", "breakdown": "勉 (có 黽) + 強 (Cường)", "mnemonic": "Cố gắng nỗ lực rèn luyện để trở nên mạnh mẽ tài giỏi."},
        {"kanji": "勤勉", "hiragana": "きんべん (kinben)", "sinoVietnamese": "CẦN MIỄN", "meaning": "Cần cù chăm chỉ", "level": "N2", "breakdown": "勤 (Cần) + 勉 (Miễn - có 黽)", "mnemonic": "Đức tính siêng năng chịu thương chịu khó vươn lên."},
        {"kanji": "縄", "hiragana": "なわ (nawa)", "sinoVietnamese": "THẰNG", "meaning": "Sợi dây thừng bện chặt", "level": "N2", "breakdown": "糸 (Mịch) + 黽 (Mãnh)", "mnemonic": "Dây thừng bện chắc cuộn tròn như chú ếch nằm phục."},
        {"kanji": "縄文時代", "hiragana": "じょうもんじだい (jōmonjidai)", "sinoVietnamese": "THẰNG VĂN THỜI ĐẠI", "meaning": "Thời kỳ đồ gốm Jomon (dấu dây thừng)", "level": "N2", "breakdown": "縄 (Thằng - có 黽) + 文 + 時代", "mnemonic": "Thời kỳ cổ xưa nổi tiếng với đồ gốm hoa văn vặn thừng."},
        {"kanji": "一文縄", "hiragana": "いちもんなわ (ichimonnawa)", "sinoVietnamese": "NHẤT VĂN THẰNG", "meaning": "Sợi dây buộc tiền đồng thời xưa", "level": "N1", "breakdown": "一文 + 縄 (có 黽)", "mnemonic": "Xâu chuỗi tiền đồng xỏ qua sợi dây thừng chắc chắn."},
        {"kanji": "縄張り", "hiragana": "なわばり (nawabari)", "sinoVietnamese": "THẰNG TRƯƠNG", "meaning": "Lãnh thổ ranh giới, địa bàn", "level": "N1", "breakdown": "縄 (có 黽) + 張 (Trương)", "mnemonic": "Giăng dây thừng phân chia ranh giới địa bàn hoạt động."},
        {"kanji": "沖縄", "hiragana": "おきなわ (okinawa)", "sinoVietnamese": "TRÙNG THẰNG", "meaning": "Quần đảo Okinawa nhiệt đới", "level": "N3", "breakdown": "沖 (Trùng) + 縄 (Thằng - có 黽)", "mnemonic": "Chuỗi đảo ngọc xinh đẹp trải dài như sợi dây thừng giữa biển khơi."},
        {"kanji": "黽勉", "hiragana": "びんべん (binben)", "sinoVietnamese": "MÃNH MIỄN", "meaning": "Cần cù nỗ lực hết lòng", "level": "N1", "breakdown": "黽 (Mãnh) + 勉 (Miễn)", "mnemonic": "Hai chữ biểu trưng cho sự cố gắng kiên trì vượt bậc."},
        {"kanji": "蛙跳び", "hiragana": "かわずとび (kawazutobi)", "sinoVietnamese": "OA KHIÊU", "meaning": "Ếch nhảy cóc vượt chướng ngại", "level": "N1", "breakdown": "liên quan ý nghĩa tượng hình ếch 黽", "mnemonic": "Cú nhảy ngoạn mục của chú ếch vượt qua con lạch sâu."}
    ],
    206: [ # 鼎 (Đỉnh - Cái vạc ba chân linh thiêng uy nghiêm)
        {"kanji": "鼎立", "hiragana": "ていりつ (teiritsu)", "sinoVietnamese": "ĐỈNH LẬP", "meaning": "Thế chân vạc ba bên cân bằng", "level": "N1", "breakdown": "鼎 (Đỉnh) + 立 (Lập)", "mnemonic": "Thế cân bằng kiên cố chân vạc thời Tam Quốc phân tranh."},
        {"kanji": "三国鼎立", "hiragana": "さんごくていりつ (sangokuteiritsu)", "sinoVietnamese": "TAM QUỐC ĐỈNH LẬP", "meaning": "Thế ba nước chân vạc Ngụy Thục Ngô", "level": "N1", "breakdown": "三国 + 鼎立", "mnemonic": "Cục diện giằng co vững chãi của ba thế lực thời Tam Quốc."},
        {"kanji": "鼎談", "hiragana": "ていだん (teidan)", "sinoVietnamese": "ĐỈNH ĐÀM", "meaning": "Cuộc tọa đàm ba người thảo luận", "level": "N1", "breakdown": "鼎 (Đỉnh) + 談 (Đàm)", "mnemonic": "Ba chuyên gia cùng ngồi đàm đạo trao đổi ý kiến chuyên sâu."},
        {"kanji": "鼎", "hiragana": "かなえ (kanae)", "sinoVietnamese": "ĐỈNH", "meaning": "Cái đỉnh đồng ba chân cổ kính", "level": "N1", "breakdown": "鼎 (Đỉnh)", "mnemonic": "Chiếc đỉnh đồng uy nghiêm tượng trưng cho vương quyền và xã tắc."},
        {"kanji": "鐘鼎文", "hiragana": "しょうていぶん (shōteibun)", "sinoVietnamese": "CHUNG ĐỈNH VĂN", "meaning": "Văn tự khắc trên chuông và đỉnh đồng (Kim văn)", "level": "N1", "breakdown": "鐘 (Chung) + 鼎 (Đỉnh) + 文 (Văn)", "mnemonic": "Nét chữ cổ kính khắc sâu vào chuông và đỉnh đồng ngàn xưa."},
        {"kanji": "革鼎", "hiragana": "かくてい (kakutei)", "sinoVietnamese": "CÁCH ĐỈNH", "meaning": "Thay đổi triều đại chính quyền", "level": "N1", "breakdown": "革 (Cách) + 鼎 (Đỉnh)", "mnemonic": "Chuyển giao biểu tượng quyền lực đỉnh đồng lập vương triều mới."},
        {"kanji": "九鼎", "hiragana": "きゅうてい (kyūtei)", "sinoVietnamese": "CỬU ĐỈNH", "meaning": "Cửu đỉnh đúc chín châu thời vua Hạ Vũ", "level": "N1", "breakdown": "九 (Cửu) + 鼎 (Đỉnh)", "mnemonic": "Chín chiếc đỉnh đồng báu vật trấn quốc uy nghiêm."},
        {"kanji": "問鼎", "hiragana": "もんてい (montei)", "sinoVietnamese": "VẤN ĐỈNH", "meaning": "Hỏi thăm đỉnh nặng nhẹ (dòm ngó ngôi báu)", "level": "N1", "breakdown": "問 (Vấn) + 鼎 (Đỉnh)", "mnemonic": "Điển tích dòm ngó quyền lực tối cao của thiên hạ."},
        {"kanji": "鼎座", "hiragana": "ていざ (teiza)", "sinoVietnamese": "ĐỈNH TỌA", "meaning": "Chân đế đặt đỉnh vạc vững chãi", "level": "N1", "breakdown": "鼎 (Đỉnh) + 座 (Tọa)", "mnemonic": "Bệ đá kiên cố nâng đỡ chiếc đỉnh đồng linh thiêng."},
        {"kanji": "鼎鍋", "hiragana": "かなえなべ (kanaenabe)", "sinoVietnamese": "ĐỈNH OA", "meaning": "Nồi ba chân nấu yến tiệc", "level": "N1", "breakdown": "鼎 (Đỉnh) + 鍋 (Oa - nồi)", "mnemonic": "Chiếc vạc lớn đun sôi thức ăn trong đại lễ cung đình."}
    ],
    207: [ # 鼓 (Cổ - Cái trống đánh nhịp rộn ràng)
        {"kanji": "太鼓", "hiragana": "たいこ (taiko)", "sinoVietnamese": "THÁI CỔ", "meaning": "Trống Taiko truyền thống Nhật Bản", "level": "N3", "breakdown": "太 (Thái) + 鼓 (Cổ)", "mnemonic": "Tiếng trống hội vang dội hào hùng trong đêm hội Matsuri."},
        {"kanji": "鼓動", "hiragana": "こどう (kodō)", "sinoVietnamese": "CỔ ĐỘNG", "meaning": "Nhịp tim đập thình thịch", "level": "N2", "breakdown": "鼓 (Cổ) + 動 (Động)", "mnemonic": "Trái tim đập rộn ràng như tiếng trống giục giã trong lồng ngực."},
        {"kanji": "鼓舞", "hiragana": "こぶ (kobu)", "sinoVietnamese": "CỔ VŨ", "meaning": "Cổ vũ khích lệ tinh thần", "level": "N1", "breakdown": "鼓 (Cổ - trống) + 舞 (Vũ - múa)", "mnemonic": "Khua trống múa cờ tiếp thêm sức mạnh cho các chiến binh."},
        {"kanji": "腹鼓", "hiragana": "はらづつみ (harazutsumi)", "sinoVietnamese": "PHÚC CỔ", "meaning": "Vỗ bụng no nê thỏa mãn", "level": "N1", "breakdown": "腹 (Phúc - bụng) + 鼓 (Cổ)", "mnemonic": "Ăn một bữa no nê thỏa thuê rồi vỗ bụng như gõ trống."},
        {"kanji": "鼓膜", "hiragana": "こまく (komaku)", "sinoVietnamese": "CỔ MẠC", "meaning": "Màng nhĩ tai", "level": "N1", "breakdown": "鼓 (Cổ) + 膜 (Mạc)", "mnemonic": "Màng tai rung lên đón nhận sóng âm thanh như mặt trống."},
        {"kanji": "舌鼓", "hiragana": "したづつみ (shitazutsumi)", "sinoVietnamese": "THIỆT CỔ", "meaning": "Tặc lưỡi tấm tắc khen ngon", "level": "N1", "breakdown": "舌 (Thiệt) + 鼓 (Cổ)", "mnemonic": "Uốn lưỡi khen món ăn ngon miệng như gõ nhịp trống."},
        {"kanji": "小鼓", "hiragana": "こつづみ (kotsudzumi)", "sinoVietnamese": "TIỂU CỔ", "meaning": "Chiếc trống cơm nhỏ kẹp nách kịch Noh", "level": "N1", "breakdown": "小 (Tiểu) + 鼓 (Cổ)", "mnemonic": "Chiếc trống nhỏ người nghệ sĩ vỗ tay đệm nhịp kịch Noh."},
        {"kanji": "鼓手", "hiragana": "こしゅ (koshu)", "sinoVietnamese": "CỔ THỦ", "meaning": "Tay trống cừ khôi", "level": "N1", "breakdown": "鼓 (Cổ) + 手 (Thủ)", "mnemonic": "Người đánh trống giữ nhịp cho dàn nhạc giao hưởng."},
        {"kanji": "陣太鼓", "hiragana": "じんだいこ (jindaiko)", "sinoVietnamese": "TRẬN THÁI CỔ", "meaning": "Trống trận giục quân xung phong", "level": "N1", "breakdown": "陣 (Trận) + 太鼓", "mnemonic": "Tiếng trống lệnh thúc giục binh lính đồng loạt xung trận."},
        {"kanji": "一木鼓", "hiragana": "いちぼくこ (ichibokuko)", "sinoVietnamese": "NHẤT MỘC CỔ", "meaning": "Mõ gỗ gõ nhịp chùa", "level": "N1", "breakdown": "一木 + 鼓 (Cổ)", "mnemonic": "Mõ khoét từ thân cây nguyên khối gõ nhịp tụng kinh thanh tịnh."}
    ],
    208: [ # 鼠 (Thử - Con chuột nhỏ nhanh nhẹn, gặm nhấm)
        {"kanji": "鼠", "hiragana": "ねずみ (nezumi)", "sinoVietnamese": "THỬ", "meaning": "Con chuột nhắt, chuột cống", "level": "N3", "breakdown": "鼠 (Thử)", "mnemonic": "Chú chuột có đôi tai vểnh, râu dài và răng gặm nhấm đồ đạc."},
        {"kanji": "鼠色", "hiragana": "ねずみいろ (nezumiiro)", "sinoVietnamese": "THỬ SẮC", "meaning": "Màu xám lông chuột trang nhã", "level": "N2", "breakdown": "鼠 (Thử) + 色 (Sắc)", "mnemonic": "Tông màu xám tro nhẹ nhàng mộc mạc kiểu Nhật."},
        {"kanji": "鼠算", "hiragana": "ねずみざん (nezumizan)", "sinoVietnamese": "THỬ TOÁN", "meaning": "Cấp số nhân, đẻ nhanh như chuột", "level": "N1", "breakdown": "鼠 (Thử) + 算 (Toán)", "mnemonic": "Tốc độ sinh sôi nảy nở tăng theo cấp số nhân chóng mặt."},
        {"kanji": "齧歯類", "hiragana": "げっしるい (gesshirui)", "sinoVietnamese": "NGHIỆT XỈ LOẠI", "meaning": "Bộ gặm nhấm động vật", "level": "N1", "breakdown": "liên đới loài chuột 鼠", "mnemonic": "Các loài thú có hai chiếc răng cửa mọc dài suốt đời như chuột."},
        {"kanji": "二十日鼠", "hiragana": "はつかねずみ (hatsukanezumi)", "sinoVietnamese": "NHỊ THẬP NHẬT THỬ", "meaning": "Chuột bạch thí nghiệm", "level": "N1", "breakdown": "二十日 + 鼠", "mnemonic": "Chú chuột nhỏ màu trắng dùng trong nghiên cứu dược phẩm."},
        {"kanji": "鼠小僧", "hiragana": "ねずみこぞう (nezamikozō)", "sinoVietnamese": "THỬ TIỂU TĂNG", "meaning": "Nezumi Kozo (tướng cướp trượng nghĩa như Robin Hood)", "level": "N1", "breakdown": "鼠 + 小僧", "mnemonic": "Nhân vật hiệp trộm thoăn thoắt cướp của người giàu chia cho dân nghèo."},
        {"kanji": "鼠蹊部", "hiragana": "そけいぶ (sokeibu)", "sinoVietnamese": "THỬ KHÊ BỘ", "meaning": "Vùng bẹn háng cơ thể", "level": "N1", "breakdown": "鼠 + 蹊 + 部", "mnemonic": "Vùng nếp gấp khớp háng giải phẫu học cơ thể."},
        {"kanji": "白鼠", "hiragana": "しろねずみ (shironezumi)", "sinoVietnamese": "BẠCH THỬ", "meaning": "Chuột bạch cưng", "level": "N2", "breakdown": "白 (Bạch) + 鼠 (Thử)", "mnemonic": "Chú chuột cảnh có bộ lông trắng muốt và đôi mắt hồng."},
        {"kanji": "栗鼠", "hiragana": "りす (risu)", "sinoVietnamese": "LẬT THỬ", "meaning": "Con sóc đuôi xù ăn hạt dẻ", "level": "N2", "breakdown": "栗 (Lật - hạt dẻ) + 鼠 (Thử)", "mnemonic": "Chú sóc nhanh thoăn thoắt gặm hạt dẻ trên cành thông."},
        {"kanji": "鼬ごっこ", "hiragana": "いたちごっこ (itachigokko)", "sinoVietnamese": "THỬ DU", "meaning": "Vòng luẩn quẩn mèo đuổi chuột", "level": "N1", "breakdown": "Chứa nghĩa đuổi bắt chuột 鼠", "mnemonic": "Trò chơi luẩn quẩn không có hồi kết giải quyết được vấn đề."}
    ],
    209: [ # 鼻 (Tị - Chiếc mũi hít thở khí trời)
        {"kanji": "鼻", "hiragana": "はな (hana)", "sinoVietnamese": "TỊ", "meaning": "Cái mũi hít thở ngửi mùi", "level": "N5", "breakdown": "自 (Tự) + 畀", "mnemonic": "Chiếc mũi nằm ngay giữa khuôn mặt tự mình hít thở không khí trong lành."},
        {"kanji": "鼻水", "hiragana": "はなみず (hanamizu)", "sinoVietnamese": "TỊ THỦY", "meaning": "Nước mũi chảy khi cảm cúm", "level": "N4", "breakdown": "鼻 (Tị) + 水 (Thủy)", "mnemonic": "Nước mũi sụt sịt chảy ra mỗi khi trời trở lạnh."},
        {"kanji": "鼻声", "hiragana": "はなごえ (hanagoe)", "sinoVietnamese": "TỊ THANH", "meaning": "Giọng nghẹt mũi", "level": "N3", "breakdown": "鼻 (Tị) + 声 (Thanh)", "mnemonic": "Giọng nói ồm ồm nghẹt lại do tịt mũi lúc ốm."},
        {"kanji": "鼻血", "hiragana": "はなぢ (hanaji)", "sinoVietnamese": "TỊ HUYẾT", "meaning": "Chảy máu cam", "level": "N2", "breakdown": "鼻 (Tị) + 血 (Huyết)", "mnemonic": "Máu chảy ra từ niêm mạc mũi khi thời tiết quá hanh khô."},
        {"kanji": "耳鼻科", "hiragana": "じびか (jibika)", "sinoVietnamese": "NHĨ TỊ KHOA", "meaning": "Khoa tai mũi họng bệnh viện", "level": "N2", "breakdown": "耳 (Nhĩ) + 鼻 (Tị) + 科 (Khoa)", "mnemonic": "Khoa chuyên khám chữa các bệnh về tai và mũi họng."},
        {"kanji": "鼻歌", "hiragana": "はなうた (hanauta)", "sinoVietnamese": "TỊ CA", "meaning": "Tiếng hát ngâm nga trong mũi", "level": "N2", "breakdown": "鼻 (Tị) + 歌 (Ca)", "mnemonic": "Ngâm nga điệu nhạc vui vẻ yêu đời qua cánh mũi."},
        {"kanji": "鼻筋", "hiragana": "はなすじ (hanasuji)", "sinoVietnamese": "TỊ CÂN", "meaning": "Sống mũi dọc dừa cao thẳng", "level": "N1", "breakdown": "鼻 (Tị) + 筋 (Cân)", "mnemonic": "Sống mũi thanh tú cao vút làm bừng sáng cả khuôn mặt."},
        {"kanji": "鼻毛", "hiragana": "はなげ (hanage)", "sinoVietnamese": "TỊ MAO", "meaning": "Lông mũi lọc bụi", "level": "N2", "breakdown": "鼻 (Tị) + 毛 (Mao)", "mnemonic": "Lớp lông mao tự nhiên ngăn bụi bẩn lọt vào đường hô hấp."},
        {"kanji": "象鼻", "hiragana": "ぞうばな (zōbana)", "sinoVietnamese": "TƯỢNG TỊ", "meaning": "Chiếc vòi dài của chú voi", "level": "N1", "breakdown": "象 (Tượng) + 鼻 (Tị)", "mnemonic": "Chiếc mũi dài linh hoạt của chú voi có thể hút nước phun mưa."},
        {"kanji": "鼻息", "hiragana": "はないき (hanaiki)", "sinoVietnamese": "TỊ TỨC", "meaning": "Hơi thở phì phò qua mũi, khí thế hừng hực", "level": "N1", "breakdown": "鼻 (Tị) + 息 (Tức)", "mnemonic": "Thở hắt ra qua mũi thể hiện khí thế tự tin quyết tâm."}
    ],
    210: [ # 齊 / 斉 (Tề - Ngang bằng, tề chỉnh, ngay ngắn đều đặn)
        {"kanji": "一斉に", "hiragana": "いっせいに (isseini)", "sinoVietnamese": "NHẤT TỀ", "meaning": "Đồng loạt cùng một lúc", "level": "N3", "breakdown": "一 (Nhất) + 斉 (Tề)", "mnemonic": "Tất cả mọi người đồng loạt đứng dậy cùng một thời khắc."},
        {"kanji": "斉唱", "hiragana": "せいしょう (seishō)", "sinoVietnamese": "TỀ XƯỚNG", "meaning": "Cùng đồng thanh hát vang", "level": "N2", "breakdown": "斉 (Tề) + 唱 (Xướng)", "mnemonic": "Cả hội trường cùng cất cao giọng hòa chung bài hát."},
        {"kanji": "斉整", "hiragana": "せいせい (seisei)", "sinoVietnamese": "TỀ CHỈNH", "meaning": "Ngay ngắn, trật tự chỉnh tề", "level": "N1", "breakdown": "斉 (Tề) + 整 (Chỉnh)", "mnemonic": "Đội ngũ xếp hàng thẳng tắp chỉnh tề nghiêm trang."},
        {"kanji": "整斉", "hiragana": "せいせい (seisei)", "sinoVietnamese": "CHỈNH TỀ", "meaning": "Gọn gàng đâu ra đấy", "level": "N1", "breakdown": "整 (Chỉnh) + 斉 (Tề)", "mnemonic": "Đồ đạc xếp đặt gọn gàng ngăn nắp chuẩn mực."},
        {"kanji": "均斉", "hiragana": "きんせい (kinsei)", "sinoVietnamese": "QUÂN TỀ", "meaning": "Cân đối hài hòa tỷ lệ vàng", "level": "N1", "breakdown": "均 (Quân) + 斉 (Tề)", "mnemonic": "Bức tượng điêu khắc có tỷ lệ cân đối hoàn hảo tuyệt mỹ."},
        {"kanji": "斉家", "hiragana": "せいか (seika)", "sinoVietnamese": "TỀ GIA", "meaning": "Tề gia trị quốc, giữ yên ấm gia đình", "level": "N1", "breakdown": "斉 (Tề) + 家 (Gia)", "mnemonic": "Tu thân rồi tề gia giữ cho mái ấm trong ấm ngoài êm."},
        {"kanji": "斉天大聖", "hiragana": "せいてんたいせい (seitentaisei)", "sinoVietnamese": "TỀ THIÊN ĐẠI THÁNH", "meaning": "Tề Thiên Đại Thánh Tôn Ngộ Không", "level": "N1", "breakdown": "斉 (Tề) + 天 (Thiên) + 大聖", "mnemonic": "Danh xưng thần thánh sánh ngang trời đất của Tôn Ngộ Không."},
        {"kanji": "斉一", "hiragana": "せいいつ (seiitsu)", "sinoVietnamese": "TỀ NHẤT", "meaning": "Đồng nhất một thể", "level": "N1", "breakdown": "斉 (Tề) + 一 (Nhất)", "mnemonic": "Tiêu chuẩn hóa đồng bộ thống nhất mọi sản phẩm."},
        {"kanji": "斉美", "hiragana": "せいび (seibi)", "sinoVietnamese": "TỀ MỸ", "meaning": "Đều đẹp đẽ toàn bích", "level": "N1", "breakdown": "斉 (Tề) + 美 (Mỹ)", "mnemonic": "Mọi mặt đều đạt đến độ hoàn mỹ toàn vẹn."},
        {"kanji": "斉放", "hiragana": "せいほう (seihō)", "sinoVietnamese": "TỀ PHÓNG", "meaning": "Đồng loạt bắn pháo hoa", "level": "N1", "breakdown": "斉 (Tề) + 放 (Phóng)", "mnemonic": "Hàng ngàn quả pháo hoa đồng loạt phóng lên bầu trời đêm rực rỡ."}
    ],
    211: [ # 齒 / 歯 (Xỉ - Hàm răng trắng đều đặn, tuổi tác)
        {"kanji": "歯", "hiragana": "は (ha)", "sinoVietnamese": "XỈ", "meaning": "Hàm răng, chiếc răng", "level": "N5", "breakdown": "歯 (Xỉ)", "mnemonic": "Hàm răng trắng muốt đều tăm tắp trong vòm miệng 止."},
        {"kanji": "歯科", "hiragana": "しか (shika)", "sinoVietnamese": "XỈ KHOA", "meaning": "Nha khoa, phòng khám răng", "level": "N4", "breakdown": "歯 (Xỉ) + 科 (Khoa)", "mnemonic": "Nơi nha sĩ chăm sóc và điều trị các bệnh răng miệng."},
        {"kanji": "虫歯", "hiragana": "むしば (mushiba)", "sinoVietnamese": "TRÙNG XỈ", "meaning": "Chiếc răng sâu đau buốt", "level": "N4", "breakdown": "虫 (Trùng) + 歯 (Xỉ)", "mnemonic": "Vi khuẩn sâu răng gặm nhấm men răng làm nhức nhối."},
        {"kanji": "歯医者", "hiragana": "はいしゃ (haisha)", "sinoVietnamese": "XỈ Y GIẢ", "meaning": "Bác sĩ nha khoa", "level": "N5", "breakdown": "歯 (Xỉ) + 医者 (Y giả)", "mnemonic": "Bác sĩ tận tâm nhổ răng sâu và làm trắng răng."},
        {"kanji": "歯ブラシ", "hiragana": "はブラシ (haburashi)", "sinoVietnamese": "XỈ", "meaning": "Bàn chải đánh răng", "level": "N5", "breakdown": "歯 (Xỉ) + ブラシ", "mnemonic": "Bàn chải lông mềm chải sạch răng sau bữa ăn."},
        {"kanji": "歯車", "hiragana": "はぐるま (haguruma)", "sinoVietnamese": "XỈ XA", "meaning": "Bánh răng cưa máy móc", "level": "N2", "breakdown": "歯 (Xỉ) + 車 (Xa)", "mnemonic": "Bánh xe có các răng cưa ăn khớp truyền chuyển động."},
        {"kanji": "義歯", "hiragana": "ぎし (gishi)", "sinoVietnamese": "NGHĨA XỈ", "meaning": "Hàm răng giả tháo lắp", "level": "N1", "breakdown": "義 (Nghĩa) + 歯 (Xỉ)", "mnemonic": "Bộ răng giả thay thế cho người cao tuổi ăn nhai ngon miệng."},
        {"kanji": "乳歯", "hiragana": "にゅうし (nyūshi)", "sinoVietnamese": "NHŨ XỈ", "meaning": "Răng sữa của trẻ thơ", "level": "N1", "breakdown": "乳 (Nhũ - sữa) + 歯 (Xỉ)", "mnemonic": "Những chiếc răng sữa đầu đời của bé con mọc lên."},
        {"kanji": "永久歯", "hiragana": "えいきゅうし (eikyūshi)", "sinoVietnamese": "VĨNH CỬU XỈ", "meaning": "Răng vĩnh viễn trưởng thành", "level": "N1", "breakdown": "永久 + 歯 (Xỉ)", "mnemonic": "Bộ răng mọc thay thế tồn tại suốt cuộc đời con người."},
        {"kanji": "歯茎", "hiragana": "はぐき (haguki)", "sinoVietnamese": "XỈ HÀNH", "meaning": "Lợi răng, nướu răng hồng hào", "level": "N2", "breakdown": "歯 (Xỉ) + 茎 (Hành)", "mnemonic": "Nướu răng khỏe mạnh bám chắc lấy chân răng."}
    ],
    212: [ # 龍 / 竜 (Long - Con rồng bay lượn trên mây, biểu tượng vua chúa)
        {"kanji": "竜", "hiragana": "りゅう (ryū) / たつ (tatsu)", "sinoVietnamese": "LONG", "meaning": "Con rồng uy nghiêm, thần long", "level": "N3", "breakdown": "竜/龍 (Long)", "mnemonic": "Thần thú mình rắn có vảy, râu dài bay lượn giữa mây ngàn uy phong."},
        {"kanji": "恐竜", "hiragana": "きょうりゅう (kyōryū)", "sinoVietnamese": "KHỦNG LONG", "meaning": "Khủng long thời tiền sử", "level": "N3", "breakdown": "恐 (Khủng) + 竜 (Long)", "mnemonic": "Loài bò sát khổng lồ đáng sợ thống trị Trái Đất cổ xưa."},
        {"kanji": "竜巻", "hiragana": "たつまき (tatsumaki)", "sinoVietnamese": "LONG QUYỂN", "meaning": "Cơn lốc xoáy vòi rồng", "level": "N2", "breakdown": "竜 (Long) + 巻 (Quyển)", "mnemonic": "Cột gió xoáy cuộn tròn hút nước lên trời như rồng lấy nước."},
        {"kanji": "昇竜", "hiragana": "しょうりゅう (shōryū)", "sinoVietnamese": "THĂNG LONG", "meaning": "Rồng bay lên trời cao, Thăng Long", "level": "N1", "breakdown": "昇 (Thăng) + 竜 (Long)", "mnemonic": "Hình ảnh con rồng vàng bay vút lên bầu trời linh thiêng."},
        {"kanji": "登竜門", "hiragana": "とうりゅうもん (tōryūmon)", "sinoVietnamese": "ĐĂNG LONG MÔN", "meaning": "Cửa vũ môn cá chép hóa rồng", "level": "N1", "breakdown": "登 (Đăng) + 竜 (Long) + 門 (Môn)", "mnemonic": "Cửa ải thử thách vượt qua để đạt thành công vang dội."},
        {"kanji": "竜神", "hiragana": "りゅうじん (ryūjin)", "sinoVietnamese": "LONG THẦN", "meaning": "Long Vương cai quản đại dương", "level": "N1", "breakdown": "竜 (Long) + 神 (Thần)", "mnemonic": "Vị thần rồng cai quản muôn loài dưới thủy cung."},
        {"kanji": "竜宮城", "hiragana": "りゅうぐうじょう (ryūgūjō)", "sinoVietnamese": "LONG CUNG THÀNH", "meaning": "Thủy cung Long Vương trong truyện Urashima Taro", "level": "N2", "breakdown": "竜宮 + 城 (Thành)", "mnemonic": "Cung điện nguy nga lộng lẫy dưới đáy biển sâu thẳm."},
        {"kanji": "竜王", "hiragana": "りゅうおう (ryūō)", "sinoVietnamese": "LONG VƯƠNG", "meaning": "Quân xe phong cấp trong cờ Shogi / Long Vương", "level": "N1", "breakdown": "竜 (Long) + 王 (Vương)", "mnemonic": "Quân cờ mạnh nhất tung hoành trên bàn cờ tướng Nhật."},
        {"kanji": "画竜点睛", "hiragana": "がりょうてんせい (garyōtensei)", "sinoVietnamese": "HỌA LONG ĐIỂM TINH", "meaning": "Vẽ rồng điểm mắt (nét vẽ quyết định đỉnh cao)", "level": "N1", "breakdown": "画竜 (Vẽ rồng) + 点睛 (Chấm mắt)", "mnemonic": "Nét chấm phá hoàn thiện biến tác phẩm trở nên sống động như thật."},
        {"kanji": "竜骨", "hiragana": "りゅうこつ (ryūkotsu)", "sinoVietnamese": "LONG CỐT", "meaning": "Sống tàu đáy tàu thủy", "level": "N1", "breakdown": "竜 (Long) + 骨 (Cốt)", "mnemonic": "Trục xương sống đáy tàu vững chắc rẽ sóng vượt trùng khơi."}
    ],
    213: [ # 龜 / 亀 (Quy - Con rùa biển mai cứng, sống thọ ngàn năm)
        {"kanji": "亀", "hiragana": "かめ (kame)", "sinoVietnamese": "QUY", "meaning": "Con rùa mai cứng", "level": "N4", "breakdown": "亀 (Quy)", "mnemonic": "Chú rùa có chiếc mai cứng cáp và bốn chân chèo bơi lội dưới biển."},
        {"kanji": "ウミガメ", "hiragana": "うみがめ (umigame)", "sinoVietnamese": "HẢI QUY", "meaning": "Con rùa biển khổng lồ", "level": "N3", "breakdown": "海 (Hải) + 亀 (Quy)", "mnemonic": "Chú rùa biển vượt ngàn hải lý trở về bãi cát xưa đẻ trứng."},
        {"kanji": "亀裂", "hiragana": "きれつ (kiretsu)", "sinoVietnamese": "QUY LIỆT", "meaning": "Vết nứt nẻ rạn rỡ chân chim", "level": "N1", "breakdown": "亀 (Quy) + 裂 (Liệt - nứt)", "mnemonic": "Vết nứt nẻ chằng chịt trên tường như hoa văn mai rùa."},
        {"kanji": "亀甲", "hiragana": "きっこう (kikkō)", "sinoVietnamese": "QUY GIÁP", "meaning": "Mai rùa bói toán thời xưa", "level": "N1", "breakdown": "亀 (Quy) + 甲 (Giáp - mai)", "mnemonic": "Chiếc mai rùa nướng trên lửa để xem điềm lành dữ bói toán."},
        {"kanji": "亀鑑", "hiragana": "きかん (kikan)", "sinoVietnamese": "QUY GIÁM", "meaning": "Tấm gương sáng mẫu mực noi theo", "level": "N1", "breakdown": "亀 (Quy) + 鑑 (Giám - gương)", "mnemonic": "Tấm gương sáng ngời làm kim chỉ nam soi rọi hành động."},
        {"kanji": "亀齢", "hiragana": "きれい (kirei)", "sinoVietnamese": "QUY LINH", "meaning": "Tuổi thọ dài lâu như loài rùa", "level": "N1", "breakdown": "亀 (Quy) + 齢 (Linh - tuổi)", "mnemonic": "Lời chúc thọ bách niên giai lão trường thọ cùng trời đất."},
        {"kanji": "亀の子束子", "hiragana": "かめのこたわし (kamenokotawashi)", "sinoVietnamese": "QUY TỬ THÚC TỬ", "meaning": "Búi cọ rửa bát hình con rùa xơ dừa", "level": "N2", "breakdown": "亀の子 + 束子", "mnemonic": "Búi cọ xơ dừa hình con rùa chà sạch bong đáy nồi của người Nhật."},
        {"kanji": "亀甲墓", "hiragana": "かめこうばか (kamekōbaka)", "sinoVietnamese": "QUY GIÁP MỘ", "meaning": "Mộ hình mai rùa độc đáo ở Okinawa", "level": "N1", "breakdown": "亀甲 + 墓 (Mộ)", "mnemonic": "Lăng mộ truyền thống hình mai rùa vững chãi che chở tổ tiên."},
        {"kanji": "亀息", "hiragana": "きそく (kisoku)", "sinoVietnamese": "QUY TỨC", "meaning": "Hơi thở nhẹ sâu như rùa thở", "level": "N1", "breakdown": "亀 (Quy) + 息 (Tức)", "mnemonic": "Phương pháp thở tĩnh tâm dưỡng sinh sâu và chậm rãi."},
        {"kanji": "鶴亀", "hiragana": "つるかめ (tsurukame)", "sinoVietnamese": "HẠC QUY", "meaning": "Hạc và rùa biểu tượng trường thọ may mắn", "level": "N2", "breakdown": "鶴 (Hạc) + 亀 (Quy)", "mnemonic": "Cặp đôi biểu tượng phúc lộc thọ cát tường muôn đời."}
    ],
    214: [ # 龠 (Dược - Ống sáo trúc 3 lỗ cổ xưa hòa nhạc)
        {"kanji": "龠", "hiragana": "やく (yaku)", "sinoVietnamese": "DƯỢC", "meaning": "Ống sáo trúc ba lỗ cổ xưa, đơn vị đong lường", "level": "N1", "breakdown": "龠 (Dược)", "mnemonic": "Ống sáo bằng trúc có ba lỗ thổi phát ra âm điệu hòa nhã thanh tao."},
        {"kanji": "鑰匙", "hiragana": "やくし (yakushi) / かぎ", "sinoVietnamese": "DƯỢC THI", "meaning": "Chiếc chìa khóa mở cổng", "level": "N1", "breakdown": "鑰 (chứa 龠) + 匙 (Thi)", "mnemonic": "Chìa khóa tra vào ổ mở toang cánh cổng bí mật."},
        {"kanji": "管龠", "hiragana": "かんやく (kan'yaku)", "sinoVietnamese": "QUẢN DƯỢC", "meaning": "Các loại sáo trúc thổi hơi", "level": "N1", "breakdown": "管 (Quản - ống) + 龠 (Dược)", "mnemonic": "Bộ nhạc cụ sáo hơi cổ truyền trong dàn nhã nhạc cung đình."},
        {"kanji": "和龠", "hiragana": "わやく (wayaku)", "sinoVietnamese": "HÒA DƯỢC", "meaning": "Âm thanh sáo trúc du dương hòa hợp", "level": "N1", "breakdown": "和 (Hòa) + 龠 (Dược)", "mnemonic": "Tiếng sáo trúc hòa nhịp mang lại bầu không khí thanh bình."},
        {"kanji": "啓龠", "hiragana": "けいやく (keiyaku)", "sinoVietnamese": "KHẢI DƯỢC", "meaning": "Mở khóa then cài đón bình minh", "level": "N1", "breakdown": "啓 (Khải) + 龠 (Dược)", "mnemonic": "Mở chìa khóa then cổng đón ánh nắng ban mai rọi vào."},
        {"kanji": "龠舞", "hiragana": "やくぶ (yakubu)", "sinoVietnamese": "DƯỢC VŨ", "meaning": "Điệu múa cầm sáo trúc tế lễ", "level": "N1", "breakdown": "龠 (Dược) + 舞 (Vũ)", "mnemonic": "Điệu múa tay cầm sáo trúc uyển chuyển dâng tế trời đất."},
        {"kanji": "銅龠", "hiragana": "どうやく (dōyaku)", "sinoVietnamese": "ĐỒNG DƯỢC", "meaning": "Ống chuẩn đo lường đúc bằng đồng", "level": "N1", "breakdown": "銅 (Đồng) + 龠 (Dược)", "mnemonic": "Ống chuẩn đong hạt ngũ cốc bằng đồng thời xưa."},
        {"kanji": "尺龠", "hiragana": "しゃくやく (shakuyaku)", "sinoVietnamese": "XÍCH DƯỢC", "meaning": "Thước đo chiều dài và ống sáo định âm", "level": "N1", "breakdown": "尺 (Xích) + 龠 (Dược)", "mnemonic": "Quy chuẩn độ dài và âm thanh chuẩn mực của triều đình."},
        {"kanji": "鈴龠", "hiragana": "れいやく (reiyaku)", "sinoVietnamese": "LINH DƯỢC", "meaning": "Chuông và sáo trúc hòa tấu", "level": "N1", "breakdown": "鈴 (Linh) + 龠 (Dược)", "mnemonic": "Tiếng chuông ngân và tiếng sáo hòa quyện êm dịu."},
        {"kanji": "雅龠", "hiragana": "がやく (gayaku)", "sinoVietnamese": "NHÃ DƯỢC", "meaning": "Khúc sáo trúc nhã nhạc thanh cao", "level": "N1", "breakdown": "雅 (Nhã) + 龠 (Dược)", "mnemonic": "Giai điệu nhã nhạc cung đình thanh cao làm lắng đọng tâm can."}
    ]
}

# Write to scripts/radical_data_176_to_214.py
with open('scripts/radical_data_176_to_214.py', 'w', encoding='utf-8') as f:
    f.write("# -*- coding: utf-8 -*-\n")
    f.write('"""Radicals 176 to 214 Vocabularies"""\n')
    f.write("RADICAL_VOCABS_176_TO_214 = " + json.dumps(data, ensure_ascii=False, indent=2) + "\n")

print(f"Successfully generated radicals 176-214! Total radicals: {len(data)}")
for k in sorted(data.keys()):
    assert len(data[k]) >= 10
    print(f"Radical {k}: {len(data[k])} words")
