# -*- coding: utf-8 -*-
"""
Builder for Radicals 141 to 175
Every radical has at least 10 words, high frequency ones have 15-20 words.
"""
import json

data = {
    141: [ # 虍 (Hổ - Con hổ vằn hung dữ)
        {"kanji": "虎", "hiragana": "とら (tora)", "sinoVietnamese": "HỔ", "meaning": "Con hổ chúa sơn lâm", "level": "N3", "breakdown": "虎 (Hổ)", "mnemonic": "Chúa sơn lâm có bộ lông vằn và tiếng gầm vang dội."},
        {"kanji": "虐待", "hiragana": "ぎゃくたい (gyakutai)", "sinoVietnamese": "NGƯỢC ĐÃI", "meaning": "Ngược đãi tàn nhẫn", "level": "N1", "breakdown": "虐 (Ngược - có 虍) + 待 (Đãi)", "mnemonic": "Hành vi tàn bạo xé xác như vuốt cọp dữ."},
        {"kanji": "虚偽", "hiragana": "きょぎ (kyogi)", "sinoVietnamese": "HƯ NGỤY", "meaning": "Giả dối dối trá", "level": "N1", "breakdown": "虚 (Hư - có 虍) + 偽 (Ngụy)", "mnemonic": "Lời nói rỗng tuếch lừa mị như vẽ cọp giấy."},
        {"kanji": "虜", "hiragana": "とりこ (toriko)", "sinoVietnamese": "LỖ", "meaning": "Tù binh / say đắm lòng người", "level": "N1", "breakdown": "虍 (Hổ) + 男 (Nam)", "mnemonic": "Bị vuốt cọp bắt giữ làm tù binh giam cầm."},
        {"kanji": "虚弱", "hiragana": "きょじゃく (kyojaku)", "sinoVietnamese": "HƯ NHƯỢC", "meaning": "Yếu đuối gầy còm", "level": "N1", "breakdown": "虚 (Hư) + 弱 (Nhược)", "mnemonic": "Sức khỏe suy kiệt khí lực tiêu tán."},
        {"kanji": "謙虚", "hiragana": "けんきょ (kenkyo)", "sinoVietnamese": "KHIÊM HƯ", "meaning": "Khiêm tốn nhã nhặn", "level": "N2", "breakdown": "謙 (Khiêm) + 虚 (Hư)", "mnemonic": "Để lòng mình trống rỗng sẵn sàng học hỏi mọi người."},
        {"kanji": "劇", "hiragana": "げき (geki)", "sinoVietnamese": "KỊCH", "meaning": "Vở kịch sân khấu / kịch liệt", "level": "N3", "breakdown": "虍 (Hổ) + 豕 (Thỉ) + 刂 (Đao)", "mnemonic": "Cọp và lợn rừng giao chiến quyết liệt như màn kịch."},
        {"kanji": "劇的", "hiragana": "げきてき (gekiteki)", "sinoVietnamese": "KỊCH ĐÍCH", "meaning": "Kịch tính bất ngờ", "level": "N1", "breakdown": "劇 (Kịch) + 的 (Đích)", "mnemonic": "Tình huống đảo ngược đầy hồi hộp bất ngờ."},
        {"kanji": "虎口", "hiragana": "ここう (kokō)", "sinoVietnamese": "HỔ KHẨU", "meaning": "Miệng cọp, hang hùm hiểm nguy", "level": "N1", "breakdown": "虎 (Hổ) + 口 (Khẩu)", "mnemonic": "Cửa ải sinh tử ngàn cân treo sợi tóc."},
        {"kanji": "暴虐", "hiragana": "ぼうぎゃく (bōgyaku)", "sinoVietnamese": "BẠO NGƯỢC", "meaning": "Tàn bạo độc ác", "level": "N1", "breakdown": "暴 (Bạo) + 虐 (Ngược)", "mnemonic": "Sự hung tàn bạo ngược của kẻ độc tài."}
    ],
    142: [ # 虫 (Trùng - Sâu bọ, côn trùng)
        {"kanji": "虫", "hiragana": "むし (mushi)", "sinoVietnamese": "TRÙNG", "meaning": "Côn trùng, sâu bọ", "level": "N4", "breakdown": "虫 (Trùng)", "mnemonic": "Con sâu nhỏ uốn mình bò trên phiến lá xanh."},
        {"kanji": "昆虫", "hiragana": "こんちゅう (konchū)", "sinoVietnamese": "CÔN TRÙNG", "meaning": "Các loài côn trùng", "level": "N2", "breakdown": "昆 (Côn) + 虫 (Trùng)", "mnemonic": "Thế giới các loài côn trùng nhiều chân đa dạng."},
        {"kanji": "蚊", "hiragana": "か (ka)", "sinoVietnamese": "VĂN", "meaning": "Con muỗi vo ve", "level": "N3", "breakdown": "虫 (Trùng) + 文 (Văn)", "mnemonic": "Con côn trùng bay phát ra tiếng vo ve như đọc văn."},
        {"kanji": "蛇", "hiragana": "へび (hebi)", "sinoVietnamese": "XÀ", "meaning": "Con rắn trườn bò", "level": "N3", "breakdown": "虫 (Trùng) + 它 (Tha)", "mnemonic": "Loài bò sát không chân trườn mình dưới bụi cỏ."},
        {"kanji": "蛍", "hiragana": "ほたる (hotaru)", "sinoVietnamese": "HUỲNH", "meaning": "Con đom đóm lập lòe", "level": "N2", "breakdown": "虫 (Trùng) + 爫", "mnemonic": "Con trùng nhỏ phát ra ánh sáng lung linh trong đêm."},
        {"kanji": "蜂", "hiragana": "はち (hachi)", "sinoVietnamese": "PHONG", "meaning": "Con ong chăm chỉ", "level": "N2", "breakdown": "虫 (Trùng) + 夆 (Phùng)", "mnemonic": "Đàn ong bay đi tìm hoa hút mật ngọt."},
        {"kanji": "蝶", "hiragana": "ちょう (chō)", "sinoVietnamese": "ĐIỆP", "meaning": "Con bươm bướm rực rỡ", "level": "N2", "breakdown": "虫 (Trùng) + 枼 (Diệp)", "mnemonic": "Cánh bướm bay dập dờn như chiếc lá lượn trên cành."},
        {"kanji": "害虫", "hiragana": "がいちゅう (gaichū)", "sinoVietnamese": "HẠI TRÙNG", "meaning": "Côn trùng gây hại mùa màng", "level": "N2", "breakdown": "害 (Hại) + 虫 (Trùng)", "mnemonic": "Sâu bọ cắn phá hoa màu của nhà nông."},
        {"kanji": "虫歯", "hiragana": "むしば (mushiba)", "sinoVietnamese": "TRÙNG XỈ", "meaning": "Răng sâu bị hỏng", "level": "N4", "breakdown": "虫 (Trùng) + 歯 (Xỉ)", "mnemonic": "Vi khuẩn gặm nhấm làm răng đau nhức."},
        {"kanji": "蜘蛛", "hiragana": "くも (kumo)", "sinoVietnamese": "TRI THƯ", "meaning": "Con nhện giăng tơ", "level": "N1", "breakdown": "虫 (Trùng) + 知 + 朱", "mnemonic": "Loài côn trùng giăng mạng lưới tơ bẫy mồi."}
    ],
    143: [ # 血 (Huyết - Máu chảy trong huyết quản)
        {"kanji": "血", "hiragana": "ち (chi)", "sinoVietnamese": "HUYẾT", "meaning": "Máu đỏ", "level": "N4", "breakdown": "血 (Huyết)", "mnemonic": "Giọt máu đỏ rơi vào chiếc đĩa tế thần 皿."},
        {"kanji": "血管", "hiragana": "けっかん (kekkan)", "sinoVietnamese": "HUYẾT QUẢN", "meaning": "Mạch máu, mạch dẫn", "level": "N2", "breakdown": "血 (Huyết) + 管 (Quản)", "mnemonic": "Hệ thống ống dẫn máu nuôi sống toàn bộ cơ thể."},
        {"kanji": "輸血", "hiragana": "ゆけつ (yuketsu)", "sinoVietnamese": "THÂU HUYẾT", "meaning": "Truyền máu cứu người", "level": "N2", "breakdown": "輸 (Thâu) + 血 (Huyết)", "mnemonic": "Chuyển máu tương thích cứu chữa bệnh nhân."},
        {"kanji": "流血", "hiragana": "りゅうけつ (ryūketsu)", "sinoVietnamese": "LƯU HUYẾT", "meaning": "Chảy máu, đổ máu chiến tranh", "level": "N1", "breakdown": "流 (Lưu) + 血 (Huyết)", "mnemonic": "Dòng máu đỏ tuôn rơi trong xung đột."},
        {"kanji": "冷血", "hiragana": "れいけつ (reiketsu)", "sinoVietnamese": "LÃNH HUYẾT", "meaning": "Máu lạnh vô tình", "level": "N1", "breakdown": "冷 (Lãnh) + 血 (Huyết)", "mnemonic": "Trái tim băng giá không chút lòng trắc ẩn."},
        {"kanji": "血圧", "hiragana": "けつあつ (ketsuatsu)", "sinoVietnamese": "HUYẾT ÁP", "meaning": "Huyết áp tim mạch", "level": "N2", "breakdown": "血 (Huyết) + 圧 (Áp)", "mnemonic": "Áp lực dòng máu chảy qua thành mạch."},
        {"kanji": "鼻血", "hiragana": "はなぢ (hanaji)", "sinoVietnamese": "TỊ HUYẾT", "meaning": "Chảy máu cam", "level": "N2", "breakdown": "鼻 (Tị) + 血 (Huyết)", "mnemonic": "Máu chảy ra từ khóe mũi khi nóng trong người."},
        {"kanji": "血筋", "hiragana": "ちすじ (chisuji)", "sinoVietnamese": "HUYẾT CÂN", "meaning": "Dòng máu huyết thống", "level": "N1", "breakdown": "血 (Huyết) + 筋 (Cân)", "mnemonic": "Dòng máu tổ tiên lưu truyền qua bao đời con cháu."},
        {"kanji": "採血", "hiragana": "さいけつ (saiketsu)", "sinoVietnamese": "THẢI HUYẾT", "meaning": "Lấy mẫu máu xét nghiệm", "level": "N1", "breakdown": "採 (Thải) + 血 (Huyết)", "mnemonic": "Rút một lượng máu nhỏ để kiểm tra sức khỏe."},
        {"kanji": "熱血", "hiragana": "ねっけつ (nekketsu)", "sinoVietnamese": "NHIỆT HUYẾT", "meaning": "Nhiệt huyết sục sôi", "level": "N1", "breakdown": "熱 (Nhiệt) + 血 (Huyết)", "mnemonic": "Dòng máu sôi sục ngập tràn đam mê cống hiến."}
    ],
    144: [ # 行 (Hành - Đi lại, thực hiện, ngã tư đường)
        {"kanji": "行く", "hiragana": "いく (iku)", "sinoVietnamese": "HÀNH", "meaning": "Đi đến, bước đi", "level": "N5", "breakdown": "行 (Hành)", "mnemonic": "Con người bước qua ngã tư đường rộng thênh thang."},
        {"kanji": "旅行", "hiragana": "りょこう (ryokō)", "sinoVietnamese": "LỮ HÀNH", "meaning": "Du lịch, chuyến đi", "level": "N5", "breakdown": "旅 (Lữ) + 行 (Hành)", "mnemonic": "Chuyến đi xa khám phá những vùng đất mới lạ."},
        {"kanji": "行動", "hiragana": "こうどう (kōdō)", "sinoVietnamese": "HÀNH ĐỘNG", "meaning": "Hành động thực tế", "level": "N3", "breakdown": "行 (Hành) + 動 (Động)", "mnemonic": "Biến suy nghĩ thành việc làm cụ thể."},
        {"kanji": "銀行", "hiragana": "ぎんこう (ginkō)", "sinoVietnamese": "NGÂN HÀNG", "meaning": "Ngân hàng", "level": "N5", "breakdown": "銀 (Ngân) + 行 (Hàng)", "mnemonic": "Nơi các thương gia giao dịch vàng bạc tấp nập."},
        {"kanji": "行列", "hiragana": "ぎょうれつ (gyōretsu)", "sinoVietnamese": "HÀNH LIỆT", "meaning": "Hàng người xếp hàng dài", "level": "N2", "breakdown": "行 (Hành) + 列 (Liệt)", "mnemonic": "Dòng người trật tự nối đuôi nhau đợi đến lượt."},
        {"kanji": "行儀", "hiragana": "ぎょうぎ (gyōgi)", "sinoVietnamese": "HÀNH NGHI", "meaning": "Phép tắc lễ nghi cư xử", "level": "N2", "breakdown": "行 (Hành) + 儀 (Nghi)", "mnemonic": "Cử chỉ tao nhã đúng chuẩn mực gia phong."},
        {"kanji": "飛行機", "hiragana": "ひこうき (hikōki)", "sinoVietnamese": "PHI HÀNH CƠ", "meaning": "Máy bay", "level": "N5", "breakdown": "飛 (Phi) + 行 (Hành) + 機 (Cơ)", "mnemonic": "Chiếc máy bay lượn trên bầu trời xanh thẳm."},
        {"kanji": "行事", "hiragana": "ぎょうじ (gyōji)", "sinoVietnamese": "HÀNH SỰ", "meaning": "Sự kiện, lễ hội tổ chức", "level": "N3", "breakdown": "行 (Hành) + 事 (Sự)", "mnemonic": "Các hoạt động phong trào được tổ chức trong năm."},
        {"kanji": "運行", "hiragana": "うんこう (unkō)", "sinoVietnamese": "VẬN HÀNH", "meaning": "Vận hành tàu xe đúng giờ", "level": "N2", "breakdown": "運 (Vận) + 行 (Hành)", "mnemonic": "Lịch trình tàu điện chuyển động an toàn thông suốt."},
        {"kanji": "実行", "hiragana": "じっこう (jikkō)", "sinoVietnamese": "THỰC HÀNH", "meaning": "Thực hiện cam kết", "level": "N2", "breakdown": "実 (Thực) + 行 (Hành)", "mnemonic": "Bắt tay vào thực thi kế hoạch đã đề ra."}
    ],
    145: [ # 衣 / 衤 (Y - Áo quần, trang phục)
        {"kanji": "衣服", "hiragana": "いふく (ifuku)", "sinoVietnamese": "Y PHỤC", "meaning": "Quần áo may mặc", "level": "N3", "breakdown": "衣 (Y) + 服 (Phục)", "mnemonic": "Trang phục chỉnh tề khoác lên người giữ ấm và làm đẹp."},
        {"kanji": "衣類", "hiragana": "いるい (irui)", "sinoVietnamese": "Y LOẠI", "meaning": "Các loại trang phục", "level": "N2", "breakdown": "衣 (Y) + 類 (Loại)", "mnemonic": "Tất cả các chủng loại quần áo dệt may."},
        {"kanji": "初め", "hiragana": "はじめ (hajime)", "sinoVietnamese": "SƠ", "meaning": "Khởi đầu, ban đầu", "level": "N5", "breakdown": "衤 (Y) + 刀 (Đao)", "mnemonic": "Hạ nhát kéo đầu tiên cắt vải may chiếc áo mới."},
        {"kanji": "被る", "hiragana": "かぶる (kaburu)", "sinoVietnamese": "BỊ", "meaning": "Đội mũ, trùm đầu / gánh chịu", "level": "N3", "breakdown": "被 (có 衤)", "mnemonic": "Trùm tấm áo qua đầu để che mưa nắng."},
        {"kanji": "被害", "hiragana": "ひがい (higai)", "sinoVietnamese": "BỊ HẠI", "meaning": "Thiệt hại sau thiên tai", "level": "N3", "breakdown": "被 (Bị - có 衤) + 害 (Hại)", "mnemonic": "Gánh chịu tổn thất do tai ương ập tới."},
        {"kanji": "複雑", "hiragana": "ふくざつ (fukuzatsu)", "sinoVietnamese": "PHỨC TẠP", "meaning": "Phức tạp, rắc rối", "level": "N4", "breakdown": "複 (Phức - có 衤) + 雑 (Tạp)", "mnemonic": "Nhiều lớp áo chồng chéo đan xen phức tạp."},
        {"kanji": "補修", "hiragana": "ほしゅう (hoshū)", "sinoVietnamese": "BỔ TU", "meaning": "Sửa chữa, tu bổ", "level": "N1", "breakdown": "補 (Bổ - có 衤) + 修 (Tu)", "mnemonic": "Vá lại mảnh áo rách cho lành lặn đẹp đẽ."},
        {"kanji": "裕福", "hiragana": "ゆうふく (yūfuku)", "sinoVietnamese": "DỤ PHÚC", "meaning": "Giàu sang ấm no", "level": "N1", "breakdown": "裕 (Dụ - có 衤) + 福 (Phúc)", "mnemonic": "Áo quần sung túc lụa là ấm no cả đời."},
        {"kanji": "袖", "hiragana": "そで (sode)", "sinoVietnamese": "TỤ", "meaning": "Ống tay áo kimono", "level": "N2", "breakdown": "衤 (Y) + 由 (Do)", "mnemonic": "Phần ống tay áo buông dài thướt tha."},
        {"kanji": "襟", "hiragana": "えり (eri)", "sinoVietnamese": "KHÂM", "meaning": "Cổ áo sơ mi", "level": "N2", "breakdown": "衤 (Y) + 禁 (Cấm)", "mnemonic": "Cổ áo ôm sát vòng cổ trang nhã lịch thiệp."}
    ],
    146: [ # 襾 / 覀 (Á - Che đậy nắp, phía Tây trời lặn)
        {"kanji": "西", "hiragana": "にし (nishi)", "sinoVietnamese": "TÂY", "meaning": "Phương tây mặt trời lặn", "level": "N5", "breakdown": "西 (Tây)", "mnemonic": "Mặt trời lặn sau tổ chim ở phương Tây."},
        {"kanji": "要る", "hiragana": "いる (iru)", "sinoVietnamese": "YẾU", "meaning": "Cần thiết", "level": "N5", "breakdown": "覀 (Á) + 女 (Nữ)", "mnemonic": "Phụ nữ thắt lưng che khăn là điều cốt yếu."},
        {"kanji": "重要", "hiragana": "じゅうよう (jūyō)", "sinoVietnamese": "TRỌNG YẾU", "meaning": "Quan trọng, cốt lõi", "level": "N3", "breakdown": "重 (Trọng) + 要 (Yếu)", "mnemonic": "Vấn đề mấu chốt quyết định thành bại."},
        {"kanji": "西洋", "hiragana": "せいよう (seiyō)", "sinoVietnamese": "TÂY DƯƠNG", "meaning": "Phương Tây Âu Mỹ", "level": "N4", "breakdown": "西 (Tây) + 洋 (Dương)", "mnemonic": "Các quốc gia bên bờ đại dương phía Tây."},
        {"kanji": "覆う", "hiragana": "おおう (ōʊ)", "sinoVietnamese": "PHÚC", "meaning": "Bao phủ, che trùm", "level": "N2", "breakdown": "覀 (Á) + 復 (Phục)", "mnemonic": "Cái nắp đậy che phủ kín toàn bộ đồ vật bên dưới."},
        {"kanji": "覆折", "hiragana": "ふくせつ (fukusetsu)", "sinoVietnamese": "PHÚC CHIẾT", "meaning": "Lật đổ đỗ vỡ", "level": "N1", "breakdown": "覆 (Phúc - có 覀) + 折 (Chiết)", "mnemonic": "Chiếc xe lật úp giữa chặng đường gian nan."},
        {"kanji": "要求", "hiragana": "ようきゅう (yōkyū)", "sinoVietnamese": "YÊU CẦU", "meaning": "Đòi hỏi, yêu cầu", "level": "N3", "breakdown": "要 (Yếu) + 求 (Cầu)", "mnemonic": "Đưa ra đòi hỏi thiết yếu cần đáp ứng."},
        {"kanji": "要約", "hiragana": "ようやく (yōyaku)", "sinoVietnamese": "YẾU ƯỚC", "meaning": "Tóm tắt đại ý", "level": "N2", "breakdown": "要 (Yếu) + 約 (Ước)", "mnemonic": "Tóm lược những ý chính cốt lõi ngắn gọn."},
        {"kanji": "転覆", "hiragana": "てんぷく (tenpuku)", "sinoVietnamese": "CHUYỂN PHÚC", "meaning": "Lật nhào, chìm tàu", "level": "N1", "breakdown": "転 (Chuyển) + 覆 (Phúc)", "mnemonic": "Con tàu bị sóng đánh lật úp đáy lên trời."},
        {"kanji": "西暦", "hiragana": "せいれき (seireki)", "sinoVietnamese": "TÂY LỊCH", "meaning": "Dương lịch quốc tế", "level": "N2", "breakdown": "西 (Tây) + 暦 (Lịch)", "mnemonic": "Lịch tính năm theo phương thức phương Tây."}
    ],
    147: [ # 見 (Kiến - Nhìn ngắm, kiến thức)
        {"kanji": "見る", "hiragana": "みる (miru)", "sinoVietnamese": "KIẾN", "meaning": "Nhìn, xem, trông thấy", "level": "N5", "breakdown": "目 (Mục) + 儿 (Nhi - đôi chân)", "mnemonic": "Đôi mắt đứng trên đôi chân quan sát vạn vật."},
        {"kanji": "意見", "hiragana": "いけん (iken)", "sinoVietnamese": "Ý KIẾN", "meaning": "Ý kiến đóng góp", "level": "N4", "breakdown": "意 (Ý) + 見 (Kiến)", "mnemonic": "Góc nhìn và quan điểm của bản thân về sự việc."},
        {"kanji": "見学", "hiragana": "けんがく (kengaku)", "sinoVietnamese": "KIẾN HỌC", "meaning": "Tham quan học hỏi thực tế", "level": "N4", "breakdown": "見 (Kiến) + 学 (Học)", "mnemonic": "Đi tận nơi tận mắt chứng kiến để tiếp thu tri thức."},
        {"kanji": "発見", "hiragana": "はっけん (hakken)", "sinoVietnamese": "PHÁT KIẾN", "meaning": "Phát hiện ra điều mới", "level": "N3", "breakdown": "発 (Phát) + 見 (Kiến)", "mnemonic": "Tìm thấy và nhìn ra những chân trời mới."},
        {"kanji": "拝見", "hiragana": "はいけん (haiken)", "sinoVietnamese": "BÁI KIẾN", "meaning": "Kính cẩn xem qua (khiêm nhường)", "level": "N3", "breakdown": "拝 (Bái) + 見 (Kiến)", "mnemonic": "Cúi đầu kính cẩn chiêm ngưỡng tài liệu của cấp trên."},
        {"kanji": "偏見", "hiragana": "へんけん (henken)", "sinoVietnamese": "THIÊN KIẾN", "meaning": "Định kiến hẹp hòi", "level": "N1", "breakdown": "偏 (Thiên) + 見 (Kiến)", "mnemonic": "Ánh nhìn lệch lạc phiến diện một chiều."},
        {"kanji": "見事", "hiragana": "みごと (migoto)", "sinoVietnamese": "KIẾN SỰ", "meaning": "Tuyệt vời, ngoạn mục", "level": "N3", "breakdown": "見 (Kiến) + 事 (Sự)", "mnemonic": "Thành quả tuyệt mỹ ai nhìn vào cũng ngợi khen."},
        {"kanji": "見解", "hiragana": "けんかい (kenkai)", "sinoVietnamese": "KIẾN GIẢI", "meaning": "Quan điểm phân tích", "level": "N2", "breakdown": "見 (Kiến) + 解 (Giải)", "mnemonic": "Góc nhìn thấu đáo giải mã rõ nguyên nhân."},
        {"kanji": "予見", "hiragana": "よけん (yoken)", "sinoVietnamese": "DỰ KIẾN", "meaning": "Dự đoán trước tương lai", "level": "N1", "breakdown": "予 (Dự) + 見 (Kiến)", "mnemonic": "Nhìn thấy trước những viễn cảnh sắp xảy ra."},
        {"kanji": "一見", "hiragana": "いっけん (ikken)", "sinoVietnamese": "NHẤT KIẾN", "meaning": "Thoạt nhìn qua, ngắm nhìn một lần", "level": "N2", "breakdown": "一 (Nhất) + 見 (Kiến)", "mnemonic": "Chỉ vừa liếc mắt nhìn qua đã nhận ra ngay."}
    ],
    148: [ # 角 (Giác - Chiếc sừng thú nhọn, góc cạnh)
        {"kanji": "角", "hiragana": "かど (kado) / つの (tsuno)", "sinoVietnamese": "GIÁC", "meaning": "Góc đường / sừng hươu", "level": "N4", "breakdown": "角 (Giác)", "mnemonic": "Chiếc sừng cong nhọn trên đầu con thú."},
        {"kanji": "方角", "hiragana": "ほうがく (hōgaku)", "sinoVietnamese": "PHƯƠNG GIÁC", "meaning": "Phương hướng la bàn", "level": "N3", "breakdown": "方 (Phương) + 角 (Giác)", "mnemonic": "Góc quay của kim chỉ nam xác định phương hướng."},
        {"kanji": "三角形", "hiragana": "さんかっけい (sankakkei)", "sinoVietnamese": "TAM GIÁC HÌNH", "meaning": "Hình tam giác ba cạnh", "level": "N3", "breakdown": "三 (Tam) + 角 (Giác) + 形 (Hình)", "mnemonic": "Hình học khép kín có ba đỉnh nhọn."},
        {"kanji": "角度", "hiragana": "かくど (kakudo)", "sinoVietnamese": "GIÁC ĐỘ", "meaning": "Góc độ, góc nhìn", "level": "N3", "breakdown": "角 (Giác) + 度 (Độ)", "mnemonic": "Độ mở của hai đường thẳng hoặc góc nhìn nhận sự việc."},
        {"kanji": "四角い", "hiragana": "しかくい (shikakui)", "sinoVietnamese": "TỨ GIÁC", "meaning": "Vuông vắn, có bốn góc", "level": "N5", "breakdown": "四 (Tứ) + 角 (Giác)", "mnemonic": "Chiếc hộp vuông vức vát bốn góc ngay ngắn."},
        {"kanji": "視角", "hiragana": "しかく (shikaku)", "sinoVietnamese": "THỊ GIÁC", "meaning": "Góc nhìn quan sát", "level": "N1", "breakdown": "視 (Thị) + 角 (Giác)", "mnemonic": "Góc độ mà mắt ta quan sát toàn cảnh sự vật."},
        {"kanji": "街角", "hiragana": "まちかど (machikado)", "sinoVietnamese": "NHAI GIÁC", "meaning": "Góc phố rẽ lối", "level": "N2", "breakdown": "街 (Nhai) + 角 (Giác)", "mnemonic": "Góc rẽ nơi con phố đông đúc người qua lại."},
        {"kanji": "角突き合わせる", "hiragana": "つのつきあわせる", "sinoVietnamese": "GIÁC ĐỘT HỢP", "meaning": "Húc sừng vào nhau, đối đầu nảy lửa", "level": "N1", "breakdown": "角 (Giác) + 突 (Đột)", "mnemonic": "Hai con trâu mộng chọi sừng không ai nhường ai."},
        {"kanji": "直角", "hiragana": "ちょっかく (chokkaku)", "sinoVietnamese": "TRỰC GIÁC", "meaning": "Góc vuông 90 độ", "level": "N2", "breakdown": "直 (Trực) + 角 (Giác)", "mnemonic": "Góc vuông thẳng tắp chuẩn xác trong hình học."},
        {"kanji": "一角", "hiragana": "いっかく (ikkaku)", "sinoVietnamese": "NHẤT GIÁC", "meaning": "Một góc, một phần", "level": "N1", "breakdown": "一 (Nhất) + 角 (Giác)", "mnemonic": "Chiếm một góc nhỏ trong tổng thể bức tranh."}
    ],
    149: [ # 言 (Ngôn - Lời nói, ngôn ngữ)
        {"kanji": "言う", "hiragana": "いう (iu)", "sinoVietnamese": "NGÔN", "meaning": "Nói, phát biểu", "level": "N5", "breakdown": "言 (Ngôn)", "mnemonic": "Những làn sóng âm thanh phát ra từ vòm miệng truyền đi thông điệp."},
        {"kanji": "言葉", "hiragana": "ことば (kotoba)", "sinoVietnamese": "NGÔN DIỆP", "meaning": "Từ ngữ, tiếng nói", "level": "N5", "breakdown": "言 (Ngôn) + 葉 (Diệp)", "mnemonic": "Lời nói đơm hoa kết trái như những chiếc lá xanh tươi."},
        {"kanji": "言語", "hiragana": "げんご (gengo)", "sinoVietnamese": "NGÔN NGỮ", "meaning": "Ngôn ngữ giao tiếp", "level": "N3", "breakdown": "言 (Ngôn) + 語 (Ngữ)", "mnemonic": "Hệ thống tiếng nói giao lưu của loài người."},
        {"kanji": "説明", "hiragana": "せつめい (setsumei)", "sinoVietnamese": "THUYẾT MINH", "meaning": "Giải thích, thuyết minh", "level": "N4", "breakdown": "説 (Thuyết - có 言) + 明 (Minh)", "mnemonic": "Dùng lời nói sáng tỏ làm rõ mọi khúc mắc."},
        {"kanji": "計画", "hiragana": "けいかく (keikaku)", "sinoVietnamese": "KẾ HOẠCH", "meaning": "Kế hoạch định hướng", "level": "N4", "breakdown": "計 (Kế - có 言) + 画 (Họa)", "mnemonic": "Bàn thảo và tính toán đường đi nước bước cẩn thận."},
        {"kanji": "話す", "hiragana": "はなす (hanasu)", "sinoVietnamese": "THOẠI", "meaning": "Nói chuyện tâm sự", "level": "N5", "breakdown": "話 (Thoại - có 言)", "mnemonic": "Dùng lưỡi thốt lên lời nói chân thành sẻ chia."},
        {"kanji": "許す", "hiragana": "ゆるす (yurusu)", "sinoVietnamese": "HỨA", "meaning": "Tha thứ, cho phép", "level": "N3", "breakdown": "許 (Hứa - có 言)", "mnemonic": "Nói lời bao dung tha thứ lỗi lầm cho nhau."},
        {"kanji": "記録", "hiragana": "きろく (kiroku)", "sinoVietnamese": "KÝ LỤC", "meaning": "Ghi chép, kỷ lục", "level": "N3", "breakdown": "記 (Ký - có 言) + 録 (Lục)", "mnemonic": "Dùng lời văn ghi lại những cột mốc đáng nhớ."},
        {"kanji": "証拠", "hiragana": "しょうこ (shōko)", "sinoVietnamese": "CHỨNG CỨ", "meaning": "Bằng chứng xác thực", "level": "N2", "breakdown": "証 (Chứng - có 言) + 拠 (Cứ)", "mnemonic": "Lời nói và văn bản có căn cứ xác thực minh bạch."},
        {"kanji": "誠実", "hiragana": "せいじつ (seijitsu)", "sinoVietnamese": "THÀNH THỰC", "meaning": "Chân thành, thật thà", "level": "N2", "breakdown": "誠 (Thành - có 言) + 実 (Thực)", "mnemonic": "Lời nói xuất phát từ đáy lòng chân thật trọn vẹn."}
    ],
    150: [ # 谷 (Cốc - Thung lũng sâu, khe núi nước chảy)
        {"kanji": "谷", "hiragana": "たに (tani)", "sinoVietnamese": "CỐC", "meaning": "Thung lũng giữa hai vách núi", "level": "N3", "breakdown": "谷 (Cốc)", "mnemonic": "Hai dòng nước từ vách núi rẽ ra đổ vào miệng thung lũng sâu."},
        {"kanji": "渓谷", "hiragana": "けいこく (keikoku)", "sinoVietnamese": "KHÊ CỐC", "meaning": "Hẻm vực, khe suối sâu", "level": "N1", "breakdown": "渓 (Khê) + 谷 (Cốc)", "mnemonic": "Khe suối trong vắt uốn lượn giữa hẻm núi cheo leo."},
        {"kanji": "谷間", "hiragana": "たにま (tanima)", "sinoVietnamese": "CỐC GIAN", "meaning": "Khoảng cách thung lũng, vùng trũng", "level": "N2", "breakdown": "谷 (Cốc) + 間 (Gian)", "mnemonic": "Vùng đất lọt thỏm giữa các rặng núi cao."},
        {"kanji": "渋谷", "hiragana": "しぶや (shibuya)", "sinoVietnamese": "SÁP CỐC", "meaning": "Quận Shibuya sầm uất ở Tokyo", "level": "N4", "breakdown": "渋 (Sáp) + 谷 (Cốc)", "mnemonic": "Khu phố nổi tiếng Nhật Bản nằm trong một vùng trũng thung lũng."},
        {"kanji": "谷底", "hiragana": "たにぞこ (tanizoko)", "sinoVietnamese": "CỐC ĐỂ", "meaning": "Đáy vực sâu thẳm", "level": "N2", "breakdown": "谷 (Cốc) + 底 (Để)", "mnemonic": "Nơi sâu nhất dưới đáy vực thẳm âm u."},
        {"kanji": "深谷", "hiragana": "しんこく (shinkoku)", "sinoVietnamese": "THÂM CỐC", "meaning": "Thung lũng sâu thẳm hiểm trở", "level": "N1", "breakdown": "深 (Thâm) + 谷 (Cốc)", "mnemonic": "Hẻm núi sâu hun hút ít người qua lại."},
        {"kanji": "山谷", "hiragana": "さんこく (sankoku) / やまたに", "sinoVietnamese": "SƠN CỐC", "meaning": "Núi đồi và thung lũng trùng điệp", "level": "N1", "breakdown": "山 (Sơn) + 谷 (Cốc)", "mnemonic": "Địa hình trập trùng hết đồi núi lại tới vực sâu."},
        {"kanji": "幽谷", "hiragana": "ゆうこく (yūkoku)", "sinoVietnamese": "U CỐC", "meaning": "Hẻm núi u tịch tịch mịch", "level": "N1", "breakdown": "幽 (U) + 谷 (Cốc)", "mnemonic": "Thung lũng thanh vắng tĩnh mịch chim hót ríu rít."},
        {"kanji": "谷川", "hiragana": "たにがわ (tanigawa)", "sinoVietnamese": "CỐC XUYÊN", "meaning": "Dòng suối chảy qua thung lũng", "level": "N2", "breakdown": "谷 (Cốc) + 川 (Xuyên)", "mnemonic": "Con suối nước trong leo lẻo róc rách chảy giữa thung lũng."},
        {"kanji": "波谷", "hiragana": "はこく (hakoku)", "sinoVietnamese": "BA CỐC", "meaning": "Đáy sóng biển (vật lý)", "level": "N1", "breakdown": "波 (Ba) + 谷 (Cốc)", "mnemonic": "Điểm trũng thấp nhất của một chu kỳ sóng nước."}
    ],
    151: [ # 豆 (Đậu - Hạt đậu, cái chén tế chân cao)
        {"kanji": "豆", "hiragana": "まめ (mame)", "sinoVietnamese": "ĐẬU", "meaning": "Hạt đậu béo bùi", "level": "N3", "breakdown": "豆 (Đậu)", "mnemonic": "Hạt đậu tròn xinh đặt trong chiếc chén tế chân cao."},
        {"kanji": "大豆", "hiragana": "だいず (daizu)", "sinoVietnamese": "ĐẠI ĐẬU", "meaning": "Đậu nành giàu đạm", "level": "N3", "breakdown": "大 (Đại) + 豆 (Đậu)", "mnemonic": "Hạt đậu tương nguyên liệu làm đậu phụ miso."},
        {"kanji": "豆腐", "hiragana": "とうふ (tōfu)", "sinoVietnamese": "ĐẬU HŨ", "meaning": "Đậu phụ mềm mát", "level": "N4", "breakdown": "豆 (Đậu) + 腐 (Hũ)", "mnemonic": "Đậu nành lên men ép thành miếng đậu trắng mịn."},
        {"kanji": "小豆", "hiragana": "あずき (azuki)", "sinoVietnamese": "TIỂU ĐẬU", "meaning": "Đậu đỏ nấu chè", "level": "N2", "breakdown": "小 (Tiểu) + 豆 (Đậu)", "mnemonic": "Hạt đậu đỏ ngọt ngào nấu xôi bánh truyền thống."},
        {"kanji": "短大", "hiragana": "たんだい (tandai)", "sinoVietnamese": "ĐOẢN ĐẠI", "meaning": "Trường cao đẳng", "level": "N2", "breakdown": "短 (có 豆) + 大 (Đại)", "mnemonic": "Khóa học đại học rút ngắn thời gian."},
        {"kanji": "頭", "hiragana": "あたま (atama)", "sinoVietnamese": "ĐẦU", "meaning": "Cái đầu, trí não", "level": "N5", "breakdown": "豆 (Đậu) + 頁 (Hiệt)", "mnemonic": "Cái đầu tròn tròn như hạt đậu trên cổ người."},
        {"kanji": "納豆", "hiragana": "なっとう (nattō)", "sinoVietnamese": "NẠP ĐẬU", "meaning": "Món đậu nành lên men Natto", "level": "N3", "breakdown": "納 (Nạp) + 豆 (Đậu)", "mnemonic": "Món ăn truyền thống giàu dinh dưỡng của người Nhật."},
        {"kanji": "豆乳", "hiragana": "とうにゅう (tōnyū)", "sinoVietnamese": "ĐẬU NHŨ", "meaning": "Sữa đậu nành", "level": "N2", "breakdown": "豆 (Đậu) + 乳 (Nhũ)", "mnemonic": "Sữa béo ngậy vắt từ những hạt đậu nành thơm ngon."},
        {"kanji": "枝豆", "hiragana": "えだまめ (edamame)", "sinoVietnamese": "CHI ĐẬU", "meaning": "Đậu nành luộc cả cành nhắm bia", "level": "N2", "breakdown": "枝 (Chi - cành) + 豆 (Đậu)", "mnemonic": "Cả chùm quả đậu non luộc muối ngọt mát."},
        {"kanji": "豊か", "hiragana": "ゆたか (yutaka)", "sinoVietnamese": "PHONG", "meaning": "Trù phú phong phú", "level": "N3", "breakdown": "曲 + 豆 (Đậu)", "mnemonic": "Chén tế chất đầy hạt đậu biểu trưng cho sự trù phú."}
    ],
    152: [ # 豕 (Thỉ - Con lợn, heo béo tốt)
        {"kanji": "豚", "hiragana": "ぶた (buta)", "sinoVietnamese": "ĐỒN", "meaning": "Con lợn, con heo", "level": "N4", "breakdown": "⺼ (Nhục) + 豕 (Thỉ)", "mnemonic": "Thịt con lợn béo núc ních trong chuồng trại."},
        {"kanji": "豚肉", "hiragana": "ぶたにく (butaniku)", "sinoVietnamese": "ĐỒN NHỤC", "meaning": "Thịt lợn, thịt heo", "level": "N5", "breakdown": "豚 (Đồn) + 肉 (Nhục)", "mnemonic": "Thức ăn thịt lợn phổ biến trong bữa cơm gia đình."},
        {"kanji": "家", "hiragana": "いえ (ie)", "sinoVietnamese": "GIA", "meaning": "Ngôi nhà ấm cúng", "level": "N5", "breakdown": "宀 (Miên - mái nhà) + 豕 (Thỉ - con lợn)", "mnemonic": "Dưới mái nhà có nuôi lợn tượng trưng cho gia đình ấm no."},
        {"kanji": "家族", "hiragana": "かぞく (kazoku)", "sinoVietnamese": "GIA TỘC", "meaning": "Gia đình yêu thương", "level": "N5", "breakdown": "家 (Gia - có 豕) + 族 (Tộc)", "mnemonic": "Các thành viên sum họp quây quần bên mái nhà."},
        {"kanji": "象", "hiragana": "ぞう (zō)", "sinoVietnamese": "TƯỢNG", "meaning": "Con voi to lớn", "level": "N3", "breakdown": "Chứa kết cấu biến thể của 豕", "mnemonic": "Con voi vòi dài thân to như chú heo khổng lồ."},
        {"kanji": "豪快", "hiragana": "ごうかい (gōkai)", "sinoVietnamese": "HÀO KHOÁI", "meaning": "Hào sảng, sảng khoái", "level": "N1", "breakdown": "豪 (Hào - có 豕) + 快 (Khoái)", "mnemonic": "Người anh hào dũng mãnh khí phách hiên ngang."},
        {"kanji": "豪華", "hiragana": "ごうか (gōka)", "sinoVietnamese": "HÀO HOA", "meaning": "Xa hoa lộng lẫy", "level": "N3", "breakdown": "豪 (Hào - có 豕) + 華 (Hoa)", "mnemonic": "Cơ ngơi tráng lệ bề thế bậc nhất."},
        {"kanji": "猪", "hiragana": "いのしし (inoshishi)", "sinoVietnamese": "TRƯ", "meaning": "Con lợn rừng hung dữ", "level": "N2", "breakdown": "犭 (Khuyển) + 者 (chứa nghĩa 豕)", "mnemonic": "Lợn rừng có nanh nhọn ủi đất trong rừng thẳm."},
        {"kanji": "逐次", "hiragana": "ちくじ (chikuji)", "sinoVietnamese": "TRỤC THỨ", "meaning": "Lần lượt nối tiếp nhau", "level": "N1", "breakdown": "辶 (Sước) + 豕 (Thỉ)", "mnemonic": "Đuổi theo đàn lợn lần lượt từng con một."},
        {"kanji": "豚汁", "hiragana": "とんじる (tonjiru)", "sinoVietnamese": "ĐỒN TRẤP", "meaning": "Súp canh thịt heo rau củ kiểu Nhật", "level": "N2", "breakdown": "豚 (Đồn) + 汁 (Trấp - canh)", "mnemonic": "Món canh nóng hổi nấu từ thịt heo và củ cải mùa đông."}
    ],
    153: [ # 豸 (Trĩ - Loài dã thú bò sát lưng dài)
        {"kanji": "猫", "hiragana": "ねこ (neko)", "sinoVietnamese": "MIÊU", "meaning": "Con mèo đáng yêu", "level": "N5", "breakdown": "豸/犭 + 苗 (Miêu)", "mnemonic": "Chú mèo kêu meo meo bắt chuột ngoài ruộng mạ."},
        {"kanji": "豹", "hiragana": "ひょう (hyō)", "sinoVietnamese": "BÁO", "meaning": "Con báo gấm săn mồi", "level": "N1", "breakdown": "豸 (Trĩ) + 勺 (Chước)", "mnemonic": "Loài thú săn mồi chạy nhanh như gió có đốm hoa."},
        {"kanji": "貌", "hiragana": "ぼう (bō)", "sinoVietnamese": "MẠO", "meaning": "Diện mạo, dáng vẻ bên ngoài", "level": "N1", "breakdown": "豸 (Trĩ) + 皃 (Mạo)", "mnemonic": "Dáng vẻ thần thái toát ra từ khuôn mặt."},
        {"kanji": "容貌", "hiragana": "ようぼう (yōbō)", "sinoVietnamese": "DUNG MẠO", "meaning": "Dung mạo, nét mặt", "level": "N1", "breakdown": "容 (Dung) + 貌 (Mạo - có 豸)", "mnemonic": "Đường nét khuôn mặt thanh tú đoan trang."},
        {"kanji": "全貌", "hiragana": "ぜんぼう (zenbō)", "sinoVietnamese": "TOÀN MẠO", "meaning": "Toàn cảnh, diện mạo tổng thể", "level": "N1", "breakdown": "全 (Toàn) + 貌 (Mạo - có 豸)", "mnemonic": "Bức tranh toàn cảnh được phơi bày rõ nét."},
        {"kanji": "変貌", "hiragana": "へんぼう (henbō)", "sinoVietnamese": "BIẾN MẠO", "meaning": "Thay đổi diện mạo ngoạn mục", "level": "N1", "breakdown": "変 (Biến) + 貌 (Mạo)", "mnemonic": "Lột xác thay đổi hoàn toàn hình ảnh cũ."},
        {"kanji": "豺狼", "hiragana": "さいろう (sairō)", "sinoVietnamese": "SÀI LANG", "meaning": "Chó sói lang sói độc ác", "level": "N1", "breakdown": "豺 (Sài - có 豸) + 狼 (Lang)", "mnemonic": "Kẻ tâm địa độc ác nham hiểm như loài sói dữ."},
        {"kanji": "貂", "hiragana": "てん (ten)", "sinoVietnamese": "ĐIÊU", "meaning": "Chồn macten lông quý", "level": "N1", "breakdown": "豸 (Trĩ) + 召 (Triệu)", "mnemonic": "Loài chồn tuyết nhỏ có bộ lông ấm áp vô giá."},
        {"kanji": "愛猫", "hiragana": "あいびょう (aibyō)", "sinoVietnamese": "ÁI MIÊU", "meaning": "Mèo cưng được yêu chiều", "level": "N1", "breakdown": "愛 (Ái) + 猫 (Miêu - có gốc 豸)", "mnemonic": "Chú mèo con được gia chủ nâng niu chăm sóc."},
        {"kanji": "美貌", "hiragana": "びぼう (bibō)", "sinoVietnamese": "MỸ MẠO", "meaning": "Nhan sắc xinh đẹp tuyệt trần", "level": "N1", "breakdown": "美 (Mỹ) + 貌 (Mạo - có 豸)", "mnemonic": "Dung mạo diễm lệ làm say đắm lòng người."}
    ],
    154: [ # 貝 (Bối - Con sò biển, tiền tệ thời xưa)
        {"kanji": "貝", "hiragana": "かい (kai)", "sinoVietnamese": "BỐI", "meaning": "Con sò, vỏ ốc biển", "level": "N3", "breakdown": "貝 (Bối)", "mnemonic": "Chiếc vỏ sò biển ngày xưa dùng làm tiền trao đổi hàng hóa."},
        {"kanji": "買う", "hiragana": "かう (kau)", "sinoVietnamese": "MÃI", "meaning": "Mua sắm đồ đạc", "level": "N5", "breakdown": "買 (có bộ 貝)", "mnemonic": "Dùng vỏ sò tiền tệ để đổi lấy vật dụng cần thiết."},
        {"kanji": "財産", "hiragana": "ざいさん (zaisan)", "sinoVietnamese": "TÀI SẢN", "meaning": "Tài sản của cải", "level": "N3", "breakdown": "財 (Tài - có 貝) + 産 (Sản)", "mnemonic": "Tiền của tích lũy được trong đời."},
        {"kanji": "貧しい", "hiragana": "まずしい (mazushii)", "sinoVietnamese": "BẦN", "meaning": "Nghèo khó, bần hàn", "level": "N3", "breakdown": "分 (Phân) + 貝 (Bối)", "mnemonic": "Tiền bạc vỏ sò bị chia năm xẻ bảy nên hóa nghèo."},
        {"kanji": "貯金", "hiragana": "ちょきん (chokin)", "sinoVietnamese": "TRỮ KIM", "meaning": "Tiết kiệm tiền bạc", "level": "N4", "breakdown": "貯 (Trữ - có 貝) + 金 (Kim)", "mnemonic": "Tích trữ từng đồng bạc vào hũ tiết kiệm."},
        {"kanji": "貴族", "hiragana": "きぞく (kizoku)", "sinoVietnamese": "QUÝ TỘC", "meaning": "Tầng lớp quý tộc danh giá", "level": "N2", "breakdown": "貴 (Quý - có 貝) + 族 (Tộc)", "mnemonic": "Gia tộc giàu có danh giá nắm giữ nhiều tiền của."},
        {"kanji": "負ける", "hiragana": "まける (makeru)", "sinoVietnamese": "PHỤ", "meaning": "Thua trận, giảm giá", "level": "N4", "breakdown": "負 (Phụ - có 貝)", "mnemonic": "Gánh nặng tiền bạc đè trĩu vai nhận phần thua thiệt."},
        {"kanji": "責任", "hiragana": "せきにん (sekinin)", "sinoVietnamese": "TRÁCH NHIỆM", "meaning": "Trách nhiệm bổn phận", "level": "N3", "breakdown": "責 (Trách - có 貝) + 任 (Nhiệm)", "mnemonic": "Bổn phận gánh vác đền bù khi làm sai việc."},
        {"kanji": "貨幣", "hiragana": "かへい (kahei)", "sinoVietnamese": "HÓA TỆ", "meaning": "Tiền tệ lưu thông", "level": "N1", "breakdown": "貨 (Hóa - có 貝) + 幣 (Tệ)", "mnemonic": "Đồng tiền trao đổi buôn bán trong nền kinh tế."},
        {"kanji": "貿易", "hiragana": "ぼうえき (bōeki)", "sinoVietnamese": "MẬU DỊCH", "meaning": "Mậu dịch, thương mại quốc tế", "level": "N3", "breakdown": "貿 (Mậu - có 貝) + 易 (Dịch)", "mnemonic": "Trao đổi hàng hóa và tiền tệ giữa các quốc gia."}
    ],
    155: [ # 赤 (Xích - Màu đỏ rực của ngọn lửa bùng cháy)
        {"kanji": "赤い", "hiragana": "あかい (akai)", "sinoVietnamese": "XÍCH", "meaning": "Màu đỏ rực rỡ", "level": "N5", "breakdown": "赤 (Xích)", "mnemonic": "Ngọn lửa bốc cháy bập bùng trên đống đất màu đỏ."},
        {"kanji": "赤ちゃん", "hiragana": "あかちゃん (akachan)", "sinoVietnamese": "XÍCH", "meaning": "Em bé sơ sinh đỏ hỏn", "level": "N4", "breakdown": "赤 (Xích) + ちゃん", "mnemonic": "Bé con mới sinh làn da hồng hào đỏ hỏn đáng yêu."},
        {"kanji": "赤道", "hiragana": "せきどう (sekidō)", "sinoVietnamese": "XÍCH ĐẠO", "meaning": "Đường xích đạo Trái Đất", "level": "N2", "breakdown": "赤 (Xích) + 道 (Đạo)", "mnemonic": "Vành đai nóng đỏ bao quanh chia đôi địa cầu."},
        {"kanji": "赤字", "hiragana": "あかじ (akaji)", "sinoVietnamese": "XÍCH TỰ", "meaning": "Thâm hụt tài chính, thua lỗ", "level": "N3", "breakdown": "赤 (Xích) + 字 (Tự)", "mnemonic": "Dòng số viết bằng mực đỏ báo hiệu kinh doanh thua lỗ."},
        {"kanji": "真赤", "hiragana": "まっか (makka)", "sinoVietnamese": "CHÂN XÍCH", "meaning": "Đỏ bừng, đỏ au", "level": "N3", "breakdown": "真 (Chân) + 赤 (Xích)", "mnemonic": "Khuôn mặt xấu hổ đỏ bừng như quả gấc chín."},
        {"kanji": "赫々", "hiragana": "かっかく (kakkaku)", "sinoVietnamese": "HÁCH HÁCH", "meaning": "Lẫy lừng, chói lọi", "level": "N1", "breakdown": "Hai chữ 赤 ghép lại thành 赫", "mnemonic": "Ánh lửa đỏ rực rỡ lẫy lừng vang danh thiên hạ."},
        {"kanji": "赤外線", "hiragana": "せきがいせん (sekigaisen)", "sinoVietnamese": "XÍCH NGOẠI TUYẾN", "meaning": "Tia hồng ngoại", "level": "N1", "breakdown": "赤 (Xích) + 外 (Ngoại) + 線 (Tuyến)", "mnemonic": "Tia sáng nằm ngoài vùng quang phổ ánh sáng đỏ."},
        {"kanji": "赤信号", "hiragana": "あかしんごう (akashingō)", "sinoVietnamese": "XÍCH TÍN HIỆU", "meaning": "Đèn đỏ giao thông", "level": "N4", "breakdown": "赤 (Xích) + 信号 (Tín hiệu)", "mnemonic": "Đèn tín hiệu đỏ báo hiệu phương tiện dừng lại."},
        {"kanji": "赤恥", "hiragana": "あかはじ (akahaji)", "sinoVietnamese": "XÍCH SỈ", "meaning": "Xấu hổ tột cùng đỏ mặt", "level": "N1", "breakdown": "赤 (Xích) + 恥 (Sỉ)", "mnemonic": "Ngượng ngùng đến nỗi đỏ ửng cả hai tai và mặt."},
        {"kanji": "赤十字", "hiragana": "せきじゅうじ (sekijūji)", "sinoVietnamese": "XÍCH THẬP TỰ", "meaning": "Hội Chữ thập đỏ nhân đạo", "level": "N2", "breakdown": "赤 (Xích) + 十 (Thập) + 字 (Tự)", "mnemonic": "Biểu tượng chữ thập đỏ cứu trợ nhân đạo quốc tế."}
    ],
    156: [ # 走 (Tẩu - Chạy nhảy, cất bước nhanh)
        {"kanji": "走る", "hiragana": "はしる (hashiru)", "sinoVietnamese": "TẨU", "meaning": "Chạy bộ, chạy nhanh", "level": "N5", "breakdown": "走 (Tẩu)", "mnemonic": "Người vung hai tay đôi chân thoăn thoắt sải bước chạy."},
        {"kanji": "疾走", "hiragana": "しっそう (shissō)", "sinoVietnamese": "TẬT TẨU", "meaning": "Phóng nhanh như gió", "level": "N1", "breakdown": "疾 (Tật - nhanh) + 走 (Tẩu)", "mnemonic": "Chạy lao nhanh vun vút như mũi tên bay."},
        {"kanji": "逃走", "hiragana": "とうそう (tōsō)", "sinoVietnamese": "ĐÀO TẨU", "meaning": "Bỏ trốn, tẩu thoát", "level": "N2", "breakdown": "逃 (Đào) + 走 (Tẩu)", "mnemonic": "Tháo chạy thoát khỏi hiện trường nguy hiểm."},
        {"kanji": "暴走", "hiragana": "ぼうそう (bōsō)", "sinoVietnamese": "BẠO TẨU", "meaning": "Phóng bạt mạng, mất kiểm soát", "level": "N2", "breakdown": "暴 (Bạo) + 走 (Tẩu)", "mnemonic": "Lao đi điên cuồng mất lái gây nguy hiểm."},
        {"kanji": "ご馳走", "hiragana": "ごちそう (gochisō)", "sinoVietnamese": "TRÌ TẨU", "meaning": "Bữa tiệc thịnh soạn, chiêu đãi", "level": "N5", "breakdown": "馳 (Trì) + 走 (Tẩu)", "mnemonic": "Chủ nhà chạy đôn chạy đáo chuẩn bị tiệc thịnh soạn thết khách."},
        {"kanji": "師走", "hiragana": "しわす (shiwasu)", "sinoVietnamese": "SƯ TẨU", "meaning": "Tháng Chạp âm lịch (tháng 12)", "level": "N1", "breakdown": "師 (Sư - thầy) + 走 (Tẩu)", "mnemonic": "Tháng cuối năm bận rộn đến mức các vị thầy cũng phải chạy đôn đáo."},
        {"kanji": "奔走", "hiragana": "ほんそう (honsō)", "sinoVietnamese": "BÔN TẨU", "meaning": "Bôn ba ngược xuôi lo việc", "level": "N1", "breakdown": "奔 (Bôn) + 走 (Tẩu)", "mnemonic": "Chạy ngược chạy xuôi không quản mệt nhọc giải quyết vấn đề."},
        {"kanji": "徒走", "hiragana": "とそう (tosō)", "sinoVietnamese": "ĐỒ TẨU", "meaning": "Chạy bộ thể thao", "level": "N1", "breakdown": "徒 (Đồ) + 走 (Tẩu)", "mnemonic": "Đôi chân trần sải bước rèn luyện thể lực."},
        {"kanji": "走路", "hiragana": "そうろ (sōro)", "sinoVietnamese": "TẨU LỘ", "meaning": "Đường chạy điền kinh, đường băng", "level": "N2", "breakdown": "走 (Tẩu) + 路 (Lộ)", "mnemonic": "Làn đường chuyên dụng dành cho vận động viên điền kinh."},
        {"kanji": "力走", "hiragana": "りきそう (rikisō)", "sinoVietnamese": "LỰC TẨU", "meaning": "Dốc sức chạy về đích", "level": "N1", "breakdown": "力 (Lực) + 走 (Tẩu)", "mnemonic": "Vắt kiệt sức lực chạy hết tốc lực về vạch đích."}
    ],
    157: [ # 足 / 𧾷 (Túc - Bàn chân, đầy đủ trọn vẹn)
        {"kanji": "足", "hiragana": "あし (ashi)", "sinoVietnamese": "TÚC", "meaning": "Bàn chân, cẳng chân", "level": "N5", "breakdown": "足 (Túc)", "mnemonic": "Cẳng chân vững chãi nâng đỡ toàn bộ thân hình."},
        {"kanji": "足りる", "hiragana": "たりる (tariru)", "sinoVietnamese": "TÚC", "meaning": "Đầy đủ, trọn vẹn", "level": "N4", "breakdown": "足 (Túc)", "mnemonic": "Bước chân tới đích trọn vẹn không còn thiếu thốn."},
        {"kanji": "遠足", "hiragana": "えんそく (ensoku)", "sinoVietnamese": "VIỄN TÚC", "meaning": "Dã ngoại, chuyến đi bộ xa", "level": "N4", "breakdown": "遠 (Viễn) + 足 (Túc)", "mnemonic": "Chuyến đi bộ cùng bè bạn ra ngoại ô hóng gió."},
        {"kanji": "満足", "hiragana": "まんぞく (manzoku)", "sinoVietnamese": "MÃN TÚC", "meaning": "Thỏa mãn, hài lòng", "level": "N3", "breakdown": "満 (Mãn) + 足 (Túc)", "mnemonic": "Hài lòng trọn vẹn với những gì mình đạt được."},
        {"kanji": "踏む", "hiragana": "ふむ (fumu)", "sinoVietnamese": "ĐẠP", "meaning": "Dẫm lên, đạp chân", "level": "N3", "breakdown": "𧾷 (Túc) + 沓", "mnemonic": "Đặt bàn chân dẫm mạnh xuống mặt đất."},
        {"kanji": "踊る", "hiragana": "おどる (odoru)", "sinoVietnamese": "DŨNG", "meaning": "Nhảy múa rộn ràng", "level": "N4", "breakdown": "𧾷 (Túc) + 勇 (Dũng)", "mnemonic": "Đôi chân nhún nhảy dũng cảm theo nhịp điệu rộn rã."},
        {"kanji": "跳ぶ", "hiragana": "とぶ (tobu)", "sinoVietnamese": "KHIÊU", "meaning": "Bật nhảy cao lên", "level": "N3", "breakdown": "𧾷 (Túc) + 兆 (Triệu)", "mnemonic": "Dùng sức đôi chân bật nhảy qua xà ngang."},
        {"kanji": "足跡", "hiragana": "あしあと (ashiato)", "sinoVietnamese": "TÚC TÍCH", "meaning": "Dấu chân in trên cát tuyết", "level": "N2", "breakdown": "足 (Túc) + 跡 (Tích)", "mnemonic": "Vết tích bàn chân để lại sau mỗi bước đi."},
        {"kanji": "裸足", "hiragana": "はだし (hadashi)", "sinoVietnamese": "LỎA TÚC", "meaning": "Chân trần không mang giày", "level": "N2", "breakdown": "裸 (Lỏa) + 足 (Túc)", "mnemonic": "Đôi chân trần mát rượi dạo bước trên bãi cát mềm."},
        {"kanji": "蹴る", "hiragana": "ける (keru)", "sinoVietnamese": "XÚC", "meaning": "Đá bóng, sút mạnh", "level": "N2", "breakdown": "𧾷 (Túc) + 就 (Tựu)", "mnemonic": "Vung chân sút tung quả bóng vào khung thành đối phương."}
    ],
    158: [ # 身 (Thân - Thân thể người phụ nữ mang thai)
        {"kanji": "身", "hiragana": "み (mi)", "sinoVietnamese": "THÂN", "meaning": "Bản thân, mình", "level": "N3", "breakdown": "身 (Thân)", "mnemonic": "Dáng hình người phụ nữ bụng mang dạ chửa thiêng liêng."},
        {"kanji": "身長", "hiragana": "しんちょう (shinchō)", "sinoVietnamese": "THÂN TRƯỜNG", "meaning": "Chiều cao cơ thể", "level": "N3", "breakdown": "身 (Thân) + 長 (Trường)", "mnemonic": "Số đo chiều dài từ đầu đến gót chân."},
        {"kanji": "独身", "hiragana": "どくしん (dokushin)", "sinoVietnamese": "ĐỘC THÂN", "meaning": "Độc thân, chưa lập gia đình", "level": "N4", "breakdown": "独 (Độc) + 身 (Thân)", "mnemonic": "Một mình một bóng tự do tự tại sống."},
        {"kanji": "出身", "hiragana": "しゅっしん (shusshin)", "sinoVietnamese": "XUẤT THÂN", "meaning": "Xuất thân từ quê quán", "level": "N4", "breakdown": "出 (Xuất) + 身 (Thân)", "mnemonic": "Nơi chôn rau cắt rốn sinh ra bản thân mình."},
        {"kanji": "自身", "hiragana": "じしん (jishin)", "sinoVietnamese": "TỰ THÂN", "meaning": "Bản thân mình", "level": "N3", "breakdown": "自 (Tự) + 身 (Thân)", "mnemonic": "Chính bản thân mình tự chịu trách nhiệm."},
        {"kanji": "中身", "hiragana": "なかみ (nakami)", "sinoVietnamese": "TRUNG THÂN", "meaning": "Ruột, phần bên trong", "level": "N3", "breakdown": "中 (Trung) + 身 (Thân)", "mnemonic": "Nội dung giá trị thực chất bên trong chiếc hộp."},
        {"kanji": "刺身", "hiragana": "さしみ (sashimi)", "sinoVietnamese": "THÍCH THÂN", "meaning": "Món cá sống Sashimi", "level": "N4", "breakdown": "刺 (Thích) + 身 (Thân)", "mnemonic": "Miếng thịt cá tươi rói cắt lát chấm mù tạt wasabi."},
        {"kanji": "身近", "hiragana": "みぢか (mijika)", "sinoVietnamese": "THÂN CẬN", "meaning": "Gần gũi ngay bên mình", "level": "N2", "breakdown": "身 (Thân) + 近 (Cận)", "mnemonic": "Những sự việc quen thuộc diễn ra ngay quanh ta."},
        {"kanji": "身分", "hiragana": "みぶん (mibun)", "sinoVietnamese": "THÂN PHÂN", "meaning": "Địa vị xã hội, thân phận", "level": "N3", "breakdown": "身 (Thân) + 分 (Phân)", "mnemonic": "Vị thế đứng của một người trong cộng đồng."},
        {"kanji": "献身", "hiragana": "けんしん (kenshin)", "sinoVietnamese": "HIẾN THÂN", "meaning": "Cống hiến hết mình", "level": "N1", "breakdown": "献 (Hiến) + 身 (Thân)", "mnemonic": "Dâng hiến trọn vẹn cả thân thể và tâm sức cho lý tưởng."}
    ],
    159: [ # 車 (Xa - Xe cộ, bánh xe lăn)
        {"kanji": "車", "hiragana": "くるま (kuruma)", "sinoVietnamese": "XA", "meaning": "Xe hơi, xe cộ", "level": "N5", "breakdown": "車 (Xa)", "mnemonic": "Chiếc xe cổ nhìn từ trên xuống có hai bánh và trục lăn."},
        {"kanji": "電車", "hiragana": "でんしゃ (densha)", "sinoVietnamese": "ĐIỆN XA", "meaning": "Tàu điện chạy đường ray", "level": "N5", "breakdown": "電 (Điện) + 車 (Xa)", "mnemonic": "Đoàn tàu chạy bằng năng lượng điện cao thế vùn vụt."},
        {"kanji": "自動車", "hiragana": "じどうしゃ (jidōsha)", "sinoVietnamese": "TỰ ĐỘNG XA", "meaning": "Xe ô tô tự hành", "level": "N5", "breakdown": "自 (Tự) + 動 (Động) + 車 (Xa)", "mnemonic": "Phương tiện giao thông 4 bánh di chuyển linh hoạt."},
        {"kanji": "自転車", "hiragana": "じてんしゃ (jitensha)", "sinoVietnamese": "TỰ CHUYỂN XA", "meaning": "Xe đạp", "level": "N5", "breakdown": "自 (Tự) + 転 (Chuyển) + 車 (Xa)", "mnemonic": "Chiếc xe tự xoay chuyển bằng lực đạp của hai chân."},
        {"kanji": "輪", "hiragana": "わ (wa)", "sinoVietnamese": "LUÂN", "meaning": "Vòng tròn, bánh xe", "level": "N2", "breakdown": "車 (Xa) + 侖 (Luân)", "mnemonic": "Bánh xe tròn quay tít trên mọi nẻo đường."},
        {"kanji": "駐車", "hiragana": "ちゅうしゃ (chūsha)", "sinoVietnamese": "TRÚ XA", "meaning": "Đỗ xe vào bãi", "level": "N3", "breakdown": "駐 (Trú) + 車 (Xa)", "mnemonic": "Dừng xe đậu ngay ngắn trong bãi đỗ xe."},
        {"kanji": "軌道", "hiragana": "きどう (kidō)", "sinoVietnamese": "QUỸ ĐẠO", "meaning": "Quỹ đạo chuyển động, đường ray", "level": "N1", "breakdown": "軌 (Quỹ - có 車) + 道 (Đạo)", "mnemonic": "Lối mòn vệt bánh xe lăn trên đường ray cố định."},
        {"kanji": "輸送", "hiragana": "ゆそう (yusō)", "sinoVietnamese": "THÂU TỐNG", "meaning": "Vận chuyển hàng hóa", "level": "N2", "breakdown": "輸 (Thâu - có 車) + 送 (Tống)", "mnemonic": "Dùng đoàn xe chuyên chở hàng đi khắp đất nước."},
        {"kanji": "車輪", "hiragana": "しゃりん (sharin)", "sinoVietnamese": "XA LUÂN", "meaning": "Bánh xe lăn tròn", "level": "N2", "breakdown": "車 (Xa) + 輪 (Luân)", "mnemonic": "Vành bánh xe cao su quay đều trên xa lộ."},
        {"kanji": "軟弱", "hiragana": "なんじゃく (nanjaku)", "sinoVietnamese": "NHUYỄN NHƯỢC", "meaning": "Yếu ớt, mềm yếu", "level": "N1", "breakdown": "軟 (Nhuyễn - có 車) + 弱 (Nhược)", "mnemonic": "Chiếc xe đệm da êm ái quá mức làm con người mềm yếu."}
    ],
    160: [ # 辛 (Tân - Vị cay, gian truân cực khổ)
        {"kanji": "辛い", "hiragana": "からい (karai) / つらい (tsurai)", "sinoVietnamese": "TÂN", "meaning": "Vị cay xè / đau khổ vất vả", "level": "N5", "breakdown": "辛 (Tân)", "mnemonic": "Cây kim xăm hình tội nhân gây cảm giác đau đớn cay đắng."},
        {"kanji": "辛抱", "hiragana": "しんぼう (shinbō)", "sinoVietnamese": "TÂN BÃO", "meaning": "Kiên nhẫn nhẫn nhịn chịu đựng", "level": "N2", "breakdown": "辛 (Tân) + 抱 (Bão)", "mnemonic": "Ôm nỗi gian nan vào lòng cắn răng nhẫn nại vượt qua."},
        {"kanji": "香辛料", "hiragana": "こうしんりょう (kōshinryō)", "sinoVietnamese": "HƯƠNG TÂN LIỆU", "meaning": "Gia vị cay nồng", "level": "N2", "breakdown": "香 (Hương) + 辛 (Tân) + 料 (Liệu)", "mnemonic": "Các loại hạt tiêu ớt cay làm dậy mùi thơm món ăn."},
        {"kanji": "辛苦", "hiragana": "しんく (shinku)", "sinoVietnamese": "TÂN KHỔ", "meaning": "Gian truân cay đắng", "level": "N1", "breakdown": "辛 (Tân) + 苦 (Khổ)", "mnemonic": "Trải qua bao thăng trầm đắng cay của cuộc đời."},
        {"kanji": "幸", "hiragana": "しあわせ (shiawase)", "sinoVietnamese": "HẠNH", "meaning": "Hạnh phúc may mắn", "level": "N4", "breakdown": "Biến thể từ bộ 辛", "mnemonic": "Thoát khỏi gông cùm trừng phạt là điều hạnh phúc nhất."},
        {"kanji": "辟易", "hiragana": "へきえき (hekieki)", "sinoVietnamese": "TÍCH DỊCH", "meaning": "Ngán ngẩm, chùn bước phát ớn", "level": "N1", "breakdown": "辟 (chứa 辛) + 易", "mnemonic": "Quá đỗi mệt mỏi chán ngán muốn thoái lui."},
        {"kanji": "激辛", "hiragana": "げきから (gekikara)", "sinoVietnamese": "KÍCH TÂN", "meaning": "Siêu cay xé lưỡi", "level": "N2", "breakdown": "激 (Kích) + 辛 (Tân)", "mnemonic": "Vị cay mãnh liệt bốc hỏa vòm họng."},
        {"kanji": "辛口", "hiragana": "からくち (karakuchi)", "sinoVietnamese": "TÂN KHẨU", "meaning": "Vị cay nồng / lời nhận xét cay độc gắt gao", "level": "N2", "breakdown": "辛 (Tân) + 口 (Khẩu)", "mnemonic": "Rượu có vị chát cay hoặc lời bình luận thẳng thừng gai góc."},
        {"kanji": "辛勝", "hiragana": "しんしょう (shinshō)", "sinoVietnamese": "TÂN THẮNG", "meaning": "Chiến thắng nhọc nhằn sát nút", "level": "N1", "breakdown": "辛 (Tân) + 勝 (Thắng)", "mnemonic": "Giành được phần thắng sau trận đấu vô cùng gian nan."},
        {"kanji": "辛酸", "hiragana": "しんさん (shinsan)", "sinoVietnamese": "TÂN TOAN", "meaning": "Nếm mùi cay đắng chua chát", "level": "N1", "breakdown": "辛 (Tân) + 酸 (Toan - chua)", "mnemonic": "Nếm đủ mùi cay đắng của sóng gió phong ba."}
    ],
    161: [ # 辰 (Thần - Sao Thần, thời gian sớm mai, con rồng)
        {"kanji": "農民", "hiragana": "のうみん (nōmin)", "sinoVietnamese": "NÔNG DÂN", "meaning": "Người nông dân hiền lành", "level": "N3", "breakdown": "農 (Nông - có 辰) + 民 (Dân)", "mnemonic": "Người nông dân ra đồng cày cấy từ sáng sớm tinh mơ."},
        {"kanji": "農業", "hiragana": "のうぎょう (nōgyō)", "sinoVietnamese": "NÔNG NGHIỆP", "meaning": "Ngành sản xuất nông nghiệp", "level": "N4", "breakdown": "農 (Nông - có 辰) + 業 (Nghiệp)", "mnemonic": "Nghề làm ruộng phụ thuộc vào thiên thời mùa màng."},
        {"kanji": "農村", "hiragana": "のうそん (nōson)", "sinoVietnamese": "NÔNG THÔN", "meaning": "Làng quê nông thôn thanh bình", "level": "N3", "breakdown": "農 (Nông) + 村 (Thôn)", "mnemonic": "Thôn xóm bao quanh bởi những cánh đồng lúa xanh ngát."},
        {"kanji": "辰年", "hiragana": "たつどし (tatsudoshi)", "sinoVietnamese": "THẦN NIÊN", "meaning": "Năm Thìn (năm con Rồng)", "level": "N2", "breakdown": "辰 (Thần) + 年 (Niên)", "mnemonic": "Năm con Rồng mang lại may mắn và uy quyền."},
        {"kanji": "北辰", "hiragana": "ほくしん (hokushin)", "sinoVietnamese": "BẮC THẦN", "meaning": "Sao Bắc Cực dẫn đường", "level": "N1", "breakdown": "北 (Bắc) + 辰 (Thần)", "mnemonic": "Ngôi sao sáng cố định phương Bắc dẫn lối người đi biển."},
        {"kanji": "震える", "hiragana": "ふるえる (furueru)", "sinoVietnamese": "CHẤN", "meaning": "Rung rinh, run rẩy vì sợ", "level": "N3", "breakdown": "雨 (Vũ) + 辰 (Thần)", "mnemonic": "Sấm sét rền vang ban sớm khiến mặt đất rung chuyển."},
        {"kanji": "地震", "hiragana": "じしん (jishin)", "sinoVietnamese": "ĐỊA CHẤN", "meaning": "Trận động đất", "level": "N4", "breakdown": "地 (Địa) + 震 (Chấn - có 辰)", "mnemonic": "Mặt đất rung lắc dữ dội chao đảo nhà cửa."},
        {"kanji": "農薬", "hiragana": "のうやく (nōyaku)", "sinoVietnamese": "NÔNG DƯỢC", "meaning": "Thuốc trừ sâu bảo vệ thực vật", "level": "N2", "breakdown": "農 (Nông) + 薬 (Dược)", "mnemonic": "Thuốc bảo vệ mùa màng khỏi sâu bệnh phá hoại."},
        {"kanji": "震度", "hiragana": "しんど (shindo)", "sinoVietnamese": "CHẤN ĐỘ", "meaning": "Cấp độ rung chấn động đất", "level": "N2", "breakdown": "震 (Chấn) + 度 (Độ)", "mnemonic": "Thang đo cường độ chấn động tại từng khu vực."},
        {"kanji": "振興", "hiragana": "しんこう (shinkō)", "sinoVietnamese": "CHẤN HƯNG", "meaning": "Chấn hưng phát triển kinh tế", "level": "N1", "breakdown": "振 (Chấn - có 辰) + 興 (Hưng)", "mnemonic": "Vực dậy và phát triển hưng thịnh trở lại."}
    ],
    162: [ # 辵 / 辶 (Sước - Bước đi trên con đường, tiến tới)
        {"kanji": "道", "hiragana": "みち (michi)", "sinoVietnamese": "ĐẠO", "meaning": "Con đường, đạo lý", "level": "N5", "breakdown": "辶 (Sước) + 首 (Thủ)", "mnemonic": "Mang theo cái đầu dẫn dắt bước đi trên con đường đúng đắn."},
        {"kanji": "近い", "hiragana": "ちかい (chikai)", "sinoVietnamese": "CẬN", "meaning": "Gần gũi", "level": "N5", "breakdown": "辶 (Sước) + 斤 (Cân)", "mnemonic": "Chỉ bước vài bước bằng độ dài cây rìu là tới nơi."},
        {"kanji": "遠い", "hiragana": "とおい (tōi)", "sinoVietnamese": "VIỄN", "meaning": "Xa xôi", "level": "N5", "breakdown": "辶 (Sước) + 袁 (Viên)", "mnemonic": "Mặc áo dài cất bước đi nghìn dặm xa xôi."},
        {"kanji": "進む", "hiragana": "すすむ (susumu)", "sinoVietnamese": "TIẾN", "meaning": "Tiến lên phía trước", "level": "N4", "breakdown": "辶 (Sước) + 隹 (Chuy - chim)", "mnemonic": "Như cánh chim sải cánh tiến lên phía trước không ngừng."},
        {"kanji": "送る", "hiragana": "おくる (okuru)", "sinoVietnamese": "TỐNG", "meaning": "Gửi đồ, tiễn đưa", "level": "N5", "breakdown": "辶 (Sước) + 关", "mnemonic": "Cất bước tiễn bạn bè lên đường thượng lộ bình an."},
        {"kanji": "通る", "hiragana": "とおる (tōru)", "sinoVietnamese": "THÔNG", "meaning": "Đi qua, thông suốt", "level": "N4", "breakdown": "辶 (Sước) + 甬", "mnemonic": "Bước chân lưu thông thuận lợi qua mọi nẻo đường."},
        {"kanji": "運ぶ", "hiragana": "はこぶ (hakobu)", "sinoVietnamese": "VẬN", "meaning": "Vận chuyển, mang vác", "level": "N4", "breakdown": "辶 (Sước) + 軍 (Quân)", "mnemonic": "Đoàn quân bước đi chở nặng quân lương ra tiền tuyến."},
        {"kanji": "速い", "hiragana": "はやい (hayai)", "sinoVietnamese": "TỐC", "meaning": "Nhanh nhẹn, tốc độ", "level": "N4", "breakdown": "辶 (Sước) + 束 (Thúc)", "mnemonic": "Bó chặt hành lý bước thoăn thoắt với tốc độ thần tốc."},
        {"kanji": "遅い", "hiragana": "おそい (osoi)", "sinoVietnamese": "TRÌ", "meaning": "Chậm chạp, muộn màng", "level": "N5", "breakdown": "辶 (Sước) + 犀 (Tê)", "mnemonic": "Bước đi ì ạch nặng nề như con tê giác rừng."},
        {"kanji": "返す", "hiragana": "かえす (kaesu)", "sinoVietnamese": "PHẢN", "meaning": "Trả lại, quay về", "level": "N5", "breakdown": "辶 (Sước) + 反 (Phản)", "mnemonic": "Quay gót bước trở lại nơi chốn ban đầu."}
    ],
    163: [ # 邑 / 阝 (Ấp - Làng xóm, đô thị bên phải)
        {"kanji": "部屋", "hiragana": "へや (heya)", "sinoVietnamese": "BỘ ỐC", "meaning": "Căn phòng ngủ", "level": "N5", "breakdown": "部 (Bộ - có 阝) + 屋 (Ốc)", "mnemonic": "Từng gian phòng được chia cắt ngăn nắp dưới mái nhà."},
        {"kanji": "都市", "hiragana": "とし (toshi)", "sinoVietnamese": "ĐÔ THỊ", "meaning": "Đô thị sầm uất", "level": "N3", "breakdown": "都 (Đô - có 阝) + 市 (Thị)", "mnemonic": "Nơi tập trung muôn dân quần tụ phồn vinh."},
        {"kanji": "京都", "hiragana": "きょうと (kyōto)", "sinoVietnamese": "KINH ĐÔ", "meaning": "Cố đô Kyoto thanh bình", "level": "N5", "breakdown": "京 (Kinh) + 都 (Đô - có 阝)", "mnemonic": "Cố đô cổ kính ngàn năm văn hiến của đất nước Phù Tang."},
        {"kanji": "郵送", "hiragana": "ゆうそう (yūsō)", "sinoVietnamese": "BƯU TỐNG", "meaning": "Gửi bưu điện", "level": "N3", "breakdown": "郵 (Bưu - có 阝) + 送 (Tống)", "mnemonic": "Chuyển thư từ bưu phẩm giữa các ấp thôn làng."},
        {"kanji": "郷里", "hiragana": "きょうり (kyōri)", "sinoVietnamese": "HƯƠNG LÝ", "meaning": "Quê cha đất tổ", "level": "N1", "breakdown": "郷 (Hương - có 阝) + 里 (Lý)", "mnemonic": "Làng quê nơi cội nguồn sinh dưỡng thân thương."},
        {"kanji": "郊外", "hiragana": "こうがい (kōgai)", "sinoVietnamese": "GIAO NGOẠI", "meaning": "Vùng ngoại ô thoáng đãng", "level": "N3", "breakdown": "郊 (Giao - có 阝) + 外 (Ngoại)", "mnemonic": "Khu vực ven rìa tiếp giáp giữa làng xóm và thiên nhiên."},
        {"kanji": "邪悪", "hiragana": "じゃあく (jaaku)", "sinoVietnamese": "TÀ ÁC", "meaning": "Tà ác hiểm độc", "level": "N1", "breakdown": "邪 (Tà - có 阝) + 悪 (Ác)", "mnemonic": "Tư tưởng lệch lạc tà mị gây hại cho nhân dân."},
        {"kanji": "郡", "hiragana": "ぐん (gun)", "sinoVietnamese": "QUẬN", "meaning": "Quận, huyện nông thôn", "level": "N1", "breakdown": "君 (Quân) + 阝 (Ấp)", "mnemonic": "Đơn vị hành chính tập hợp nhiều làng xã dưới quyền quản lý."},
        {"kanji": "那覇", "hiragana": "なは (naha)", "sinoVietnamese": "NA BÁ", "meaning": "Thành phố Naha (Okinawa)", "level": "N2", "breakdown": "那 (Na - có 阝) + 覇 (Bá)", "mnemonic": "Thủ phủ xinh đẹp của quần đảo nhiệt đới Okinawa."},
        {"kanji": "邸宅", "hiragana": "ていたく (teitaku)", "sinoVietnamese": "ĐỂ TRẠCH", "meaning": "Dinh thự sang trọng", "level": "N1", "breakdown": "邸 (Để - có 阝) + 宅 (Trạch)", "mnemonic": "Ngôi biệt thự bề thế lộng lẫy nơi góc phố."}
    ],
    164: [ # 酉 (Dậu - Bình rượu, quá trình lên men)
        {"kanji": "お酒", "hiragana": "おさけ (osake)", "sinoVietnamese": "TỬU", "meaning": "Rượu Sake truyền thống", "level": "N5", "breakdown": "氵 (Thủy) + 酉 (Dậu)", "mnemonic": "Nước gạo ủ lên men trong hũ rượu thơm lừng cay nồng."},
        {"kanji": "配達", "hiragana": "はいたつ (haitatsu)", "sinoVietnamese": "PHỐI ĐẠT", "meaning": "Giao hàng tận nơi", "level": "N4", "breakdown": "配 (Phối - có 酉) + 達 (Đạt)", "mnemonic": "Phân chia từng vò rượu giao tận tay người thưởng thức."},
        {"kanji": "酸素", "hiragana": "さんそ (sanso)", "sinoVietnamese": "TOAN TỐ", "meaning": "Khí oxy duy trì sự sống", "level": "N2", "breakdown": "酸 (Toan - có 酉) + 素 (Tố)", "mnemonic": "Khí nuôi dưỡng quá trình lên men và hô hấp."},
        {"kanji": "酷い", "hiragana": "ひどい (hidoi)", "sinoVietnamese": "KHỐC", "meaning": "Tồi tệ, tàn nhẫn", "level": "N4", "breakdown": "酷 (Khốc - có 酉)", "mnemonic": "Rượu ủ quá đậm đặc đến cay đắng nồng nặc."},
        {"kanji": "酢", "hiragana": "す (su)", "sinoVietnamese": "TỐ", "meaning": "Giấm ăn chua dịu", "level": "N2", "breakdown": "酉 (Dậu) + 乍", "mnemonic": "Rượu lên men lâu ngày hóa thành giấm chua nấu ăn."},
        {"kanji": "酔う", "hiragana": "よう (yō)", "sinoVietnamese": "TÚY", "meaning": "Say xỉn, say xe", "level": "N3", "breakdown": "酉 (Dậu) + 卒", "mnemonic": "Uống cạn bình rượu say mèm bước thấp bước cao."},
        {"kanji": "酵母", "hiragana": "こうぼ (kōbo)", "sinoVietnamese": "DIẾU MẪU", "meaning": "Men vi sinh làm bánh mỳ", "level": "N1", "breakdown": "酵 (Diếu - có 酉) + 母 (Mẫu)", "mnemonic": "Vi sinh vật mẹ nuôi dưỡng hạt men nở xốp."},
        {"kanji": "醸造", "hiragana": "じょうぞう (jōzō)", "sinoVietnamese": "NHƯỠNG TẠO", "meaning": "Ủ rượu bia, ủ tương lên men", "level": "N1", "breakdown": "醸 (Nhưỡng - có 酉) + 造 (Tạo)", "mnemonic": "Kỹ thuật ủ lên men truyền thống tạo nên quốc tửu."},
        {"kanji": "酪農", "hiragana": "らくのう (rakunō)", "sinoVietnamese": "LẠC NÔNG", "meaning": "Nghề chăn nuôi lấy sữa", "level": "N1", "breakdown": "酪 (Lạc - có 酉) + 農 (Nông)", "mnemonic": "Nông nghiệp sản xuất sữa tươi bơ phô mai lên men."},
        {"kanji": "醜い", "hiragana": "みにくい (minikui)", "sinoVietnamese": "XÚ", "meaning": "Xấu xí, khó coi", "level": "N1", "breakdown": "酉 (Dậu) + 鬼 (Quỷ)", "mnemonic": "Say rượu mặt mũi biến dạng hung dữ như mặt quỷ."}
    ],
    165: [ # 釆 (Biện - Phân biệt, móng vuốt thú in dấu)
        {"kanji": "悉く", "hiragana": "ことごとく (kotogotoku)", "sinoVietnamese": "TẤT", "meaning": "Tất cả, toàn bộ không sót một ai", "level": "N1", "breakdown": "釆 (Biện) + 心 (Tâm)", "mnemonic": "Quan sát dấu chân và đặt trọn tâm trí thấu hiểu toàn bộ."},
        {"kanji": "番", "hiragana": "ばん (ban)", "sinoVietnamese": "PHIÊN", "meaning": "Số thứ tự, phiên trực", "level": "N5", "breakdown": "釆 (Biện) + 田 (Điền)", "mnemonic": "Phân chia từng ô ruộng đánh dấu số thứ tự canh tác."},
        {"kanji": "番組", "hiragana": "ばんぐみ (bangumi)", "sinoVietnamese": "PHIÊN TỔ", "meaning": "Chương trình truyền hình", "level": "N4", "breakdown": "番 (Phiên) + 組 (Tổ)", "mnemonic": "Lịch phát sóng các tiết mục được sắp xếp theo phiên kíp."},
        {"kanji": "一番", "hiragana": "いちばん (ichiban)", "sinoVietnamese": "NHẤT PHIÊN", "meaning": "Số một, nhất, tuyệt nhất", "level": "N5", "breakdown": "一 (Nhất) + 番 (Phiên)", "mnemonic": "Đứng đầu bảng danh sách không ai sánh bằng."},
        {"kanji": "交番", "hiragana": "こうばん (kōban)", "sinoVietnamese": "GIAO PHIÊN", "meaning": "Đồn cảnh sát góc phố", "level": "N5", "breakdown": "交 (Giao) + 番 (Phiên)", "mnemonic": "Nơi các cảnh sát luân phiên túc trực giữ gìn trị an."},
        {"kanji": "順番", "hiragana": "じゅんばん (junban)", "sinoVietnamese": "THUẬN PHIÊN", "meaning": "Thứ tự xếp hàng", "level": "N3", "breakdown": "順 (Thuận) + 番 (Phiên)", "mnemonic": "Tuân thủ đúng lượt đi theo trật tự trước sau."},
        {"kanji": "留守番", "hiragana": "るすばん (rusuban)", "sinoVietnamese": "LƯU THỦ PHIÊN", "meaning": "Trông nhà khi vắng người", "level": "N3", "breakdown": "留守 + 番 (Phiên)", "mnemonic": "Nhận phiên trực giữ nhà bảo vệ tài sản an toàn."},
        {"kanji": "審判", "hiragana": "しんぱん (shinpan)", "sinoVietnamese": "THẨM PHÁN", "meaning": "Trọng tài, phán quyết", "level": "N2", "breakdown": "審 (Thẩm) + 判 (Phán - có nguồn gốc phân biệt)", "mnemonic": "Quan sát móng vuốt phân biệt rõ đúng sai công minh."},
        {"kanji": "当番", "hiragana": "とうばん (tōban)", "sinoVietnamese": "ĐƯƠNG PHIÊN", "meaning": "Người đến lượt trực nhật", "level": "N2", "breakdown": "当 (Đương) + 番 (Phiên)", "mnemonic": "Đến phiên mình chịu trách nhiệm làm nhiệm vụ."},
        {"kanji": "背番号", "hiragana": "せばんごう (sebangō)", "sinoVietnamese": "BỐI PHIÊN HIỆU", "meaning": "Số áo vận động viên sau lưng", "level": "N2", "breakdown": "背 (Bối) + 番号 (Phiên hiệu)", "mnemonic": "Con số in sau lưng giúp nhận diện cầu thủ trên sân."}
    ],
    166: [ # 里 (Lý - Dặm đường, làng quê điền thổ)
        {"kanji": "里", "hiragana": "さと (sato)", "sinoVietnamese": "LÝ", "meaning": "Làng quê, quê ngoại", "level": "N3", "breakdown": "田 (Điền) + 土 (Thổ)", "mnemonic": "Đất đai và ruộng nương trù phú hình thành nên thôn làng."},
        {"kanji": "里帰り", "hiragana": "さとがえり (satogaeri)", "sinoVietnamese": "LÝ QUY", "meaning": "Về thăm quê mẹ, về nhà mẹ đẻ", "level": "N2", "breakdown": "里 (Lý) + 帰 (Quy)", "mnemonic": "Người con gái lấy chồng trở về thăm lại mái ấm làng xưa."},
        {"kanji": "重い", "hiragana": "おもい (omoi)", "sinoVietnamese": "TRỌNG", "meaning": "Nặng trĩu, nghiêm trọng", "level": "N5", "breakdown": "chứa bộ 里", "mnemonic": "Gánh nặng cả dặm đường dài đè trĩu đôi vai."},
        {"kanji": "野原", "hiragana": "のはら (nohara)", "sinoVietnamese": "DÃ NGUYÊN", "meaning": "Cánh đồng hoang bao la", "level": "N3", "breakdown": "野 (Dã - có 里) + 原 (Nguyên)", "mnemonic": "Cánh đồng thênh thang trải dài ngút ngàn tầm mắt."},
        {"kanji": "野菜", "hiragana": "やさい (yasai)", "sinoVietnamese": "DÃ THÁI", "meaning": "Rau củ tươi xanh", "level": "N5", "breakdown": "野 (Dã - có 里) + 菜 (Thái)", "mnemonic": "Rau xanh hái từ nương đồng tươi non mát lành."},
        {"kanji": "理由", "hiragana": "りゆう (riyū)", "sinoVietnamese": "LÝ DO", "meaning": "Nguyên nhân lý do", "level": "N4", "breakdown": "理 (Lý - có 里) + 由 (Do)", "mnemonic": "Đạo lý sáng tỏ như quy luật phân chia đất đai."},
        {"kanji": "料理", "hiragana": "りょうり (ryōri)", "sinoVietnamese": "LIỆU LÝ", "meaning": "Nấu ăn, món ăn ngon", "level": "N5", "breakdown": "料 (Liệu) + 理 (Lý - có 里)", "mnemonic": "Nghệ thuật điều hòa nguyên liệu tạo hương vị mỹ vị."},
        {"kanji": "万里の長城", "hiragana": "ばんりのちょうじょう", "sinoVietnamese": "VẠN LÝ TRƯỜNG THÀNH", "meaning": "Vạn Lý Trường Thành kỳ vĩ", "level": "N1", "breakdown": "万 + 里 (Lý) + 長城", "mnemonic": "Bức tường thành kiên cố vắt ngang vạn dặm non sông."},
        {"kanji": "里程標", "hiragana": "りていひょう (riteihyō)", "sinoVietnamese": "LÝ TRÌNH TIÊU", "meaning": "Cột mốc cây số bên đường", "level": "N1", "breakdown": "里 (Lý) + 程 + 標", "mnemonic": "Cột mốc báo hiệu số dặm đường đã vượt qua."},
        {"kanji": "里心", "hiragana": "さとごころ (satogokoro)", "sinoVietnamese": "LÝ TÂM", "meaning": "Nỗi nhớ quê hương da diết", "level": "N1", "breakdown": "里 (Lý) + 心 (Tâm)", "mnemonic": "Nỗi niềm nhớ da diết về làng quê mẹ thân thương."}
    ],
    167: [ # 金 / 釒 (Kim - Kim loại, vàng bạc, tiền của)
        {"kanji": "お金", "hiragana": "おかね (okane)", "sinoVietnamese": "KIM", "meaning": "Tiền bạc tiêu dùng", "level": "N5", "breakdown": "金 (Kim)", "mnemonic": "Đất ủ vàng ròng quý giá phát sáng hào quang rực rỡ."},
        {"kanji": "鉄", "hiragana": "てつ (tetsu)", "sinoVietnamese": "THIẾT", "meaning": "Sắt thép kiên cố", "level": "N3", "breakdown": "釒 (Kim) + 失", "mnemonic": "Kim loại cứng rắn làm nên khung nhà đường ray."},
        {"kanji": "銀", "hiragana": "ぎん (gin)", "sinoVietnamese": "NGÂN", "meaning": "Bạc trắng sáng", "level": "N4", "breakdown": "釒 (Kim) + 艮 (Cấn)", "mnemonic": "Ánh kim loại bạc sáng chói dừng mắt nhìn."},
        {"kanji": "銅", "hiragana": "どう (dō)", "sinoVietnamese": "ĐỒNG", "meaning": "Đồng đỏ đúc chuông", "level": "N2", "breakdown": "釒 (Kim) + 同 (Đồng)", "mnemonic": "Kim loại màu đỏ đúc nên chuông đồng uy nghiêm."},
        {"kanji": "鉛筆", "hiragana": "えんぴつ (enpitsu)", "sinoVietnamese": "DUYÊN BÚT", "meaning": "Bút chì viết", "level": "N5", "breakdown": "鉛 (Duyên - có 釒) + 筆 (Bút)", "mnemonic": "Bút làm từ kim loại chì và than vẽ."},
        {"kanji": "針", "hiragana": "はり (hari)", "sinoVietnamese": "CHÂM", "meaning": "Cây kim may, mũi kim", "level": "N3", "breakdown": "釒 (Kim) + 十 (Thập)", "mnemonic": "Cây kim thép nhỏ nhọn tinh xảo luồn chỉ vá áo."},
        {"kanji": "鏡", "hiragana": "かがみ (kagami)", "sinoVietnamese": "KÍNH", "meaning": "Tấm gương soi mặt", "level": "N3", "breakdown": "釒 (Kim) + 竟 (Cánh)", "mnemonic": "Tấm đồng mài bóng loáng soi rõ từng sợi tóc chân tơ."},
        {"kanji": "録音", "hiragana": "ろくおん (rokuon)", "sinoVietnamese": "LỤC ÂM", "meaning": "Ghi âm giọng nói", "level": "N3", "breakdown": "録 (Lục - có 釒) + 音 (Âm)", "mnemonic": "Khắc âm thanh vào đĩa kim loại lưu giữ ngàn năm."},
        {"kanji": "鍋", "hiragana": "なべ (nabe)", "sinoVietnamese": "OA", "meaning": "Cái nồi nấu lẩu", "level": "N2", "breakdown": "釒 (Kim) + 咼", "mnemonic": "Chiếc nồi kim loại đun sôi món lẩu thơm lừng ngày đông."},
        {"kanji": "鋭い", "hiragana": "するどい (surudoi)", "sinoVietnamese": "NHUỆ", "meaning": "Sắc bén, nhạy bén", "level": "N2", "breakdown": "釒 (Kim) + 兌 (Đoái)", "mnemonic": "Lưỡi gươm kim loại sắc bén chém sắt như chém bùn."}
    ],
    168: [ # 長 (Trường - Dài, thủ lĩnh, trường bối)
        {"kanji": "長い", "hiragana": "ながい (nagai)", "sinoVietnamese": "TRƯỜNG", "meaning": "Dài thượt, dài lâu", "level": "N5", "breakdown": "長 (Trường)", "mnemonic": "Mái tóc người già buông dài chấm đất theo năm tháng."},
        {"kanji": "社長", "hiragana": "しゃちょう (shachō)", "sinoVietnamese": "XÃ TRƯỞNG", "meaning": "Giám đốc công ty", "level": "N5", "breakdown": "社 (Xã) + 長 (Trưởng)", "mnemonic": "Người đứng đầu chèo lái toàn bộ công ty."},
        {"kanji": "校長", "hiragana": "こうちょう (kōchō)", "sinoVietnamese": "HIỆU TRƯỞNG", "meaning": "Hiệu trưởng trường học", "level": "N4", "breakdown": "校 (Hiệu) + 長 (Trưởng)", "mnemonic": "Thầy giáo mẫu mực đứng đầu ngôi trường học tập."},
        {"kanji": "成長", "hiragana": "せいちょう (seichō)", "sinoVietnamese": "THÀNH TRƯỞNG", "meaning": "Trưởng thành, lớn lên", "level": "N3", "breakdown": "成 (Thành) + 長 (Trưởng)", "mnemonic": "Cây non lớn dần thành cây cổ thụ vững chãi."},
        {"kanji": "身長", "hiragana": "しんちょう (shinchō)", "sinoVietnamese": "THÂN TRƯỜNG", "meaning": "Chiều cao cơ thể", "level": "N3", "breakdown": "身 (Thân) + 長 (Trường)", "mnemonic": "Độ dài thân thể đo từ gót tới đỉnh đầu."},
        {"kanji": "特長", "hiragana": "とくちょう (tokuchō)", "sinoVietnamese": "ĐẶC TRƯỜNG", "meaning": "Điểm mạnh nổi trội", "level": "N2", "breakdown": "特 (Đặc) + 長 (Trường)", "mnemonic": "Ưu điểm vượt trội hơn hẳn so với người khác."},
        {"kanji": "長所", "hiragana": "ちょうしょ (chōsho)", "sinoVietnamese": "TRƯỜNG SỞ", "meaning": "Sở trường, điểm mạnh", "level": "N3", "breakdown": "長 (Trường) + 所 (Sở)", "mnemonic": "Năng khiếu và sở trường thế mạnh của bản thân."},
        {"kanji": "長男", "hiragana": "ちょうなん (chōnan)", "sinoVietnamese": "TRƯỞNG NAM", "meaning": "Con trai cả trưởng gia", "level": "N3", "breakdown": "長 (Trưởng) + 男 (Nam)", "mnemonic": "Người con trai lớn gánh vác việc gia đình."},
        {"kanji": "長寿", "hiragana": "ちょうじゅ (chōju)", "sinoVietnamese": "TRƯỜNG THỌ", "meaning": "Sống lâu trường thọ", "level": "N1", "breakdown": "長 (Trường) + 寿 (Thọ)", "mnemonic": "Tuổi thọ dồi dào an hưởng phúc lành bách niên giai lão."},
        {"kanji": "議長", "hiragana": "ぎちょう (gichō)", "sinoVietnamese": "NGHỊ TRƯỞNG", "meaning": "Chủ tịch quốc hội/phiên họp", "level": "N1", "breakdown": "議 (Nghị) + 長 (Trưởng)", "mnemonic": "Người điều phối chủ trì các phiên họp nghị sự quan trọng."}
    ],
    169: [ # 門 (Môn - Hai cánh cổng khép mở)
        {"kanji": "門", "hiragana": "もん (mon)", "sinoVietnamese": "MÔN", "meaning": "Cánh cổng ra vào", "level": "N4", "breakdown": "門 (Môn)", "mnemonic": "Hai cánh cổng lớn mở rộng chào đón khách phương xa."},
        {"kanji": "専門", "hiragana": "せんもん (senmon)", "sinoVietnamese": "CHUYÊN MÔN", "meaning": "Chuyên môn nghiên cứu", "level": "N4", "breakdown": "専 (Chuyên) + 門 (Môn)", "mnemonic": "Cánh cổng bước vào lĩnh vực kiến thức sâu rộng."},
        {"kanji": "開く", "hiragana": "あく (aku) / ひらく (hiraku)", "sinoVietnamese": "KHAI", "meaning": "Mở cổng, khai mạc", "level": "N5", "breakdown": "門 (Môn) + 开", "mnemonic": "Hai tay đẩy then cài mở toang hai cánh cửa đón gió."},
        {"kanji": "閉める", "hiragana": "しめる (shimeru)", "sinoVietnamese": "BẾ", "meaning": "Đóng cửa lại", "level": "N5", "breakdown": "門 (Môn) + 才", "mnemonic": "Khép chặt cánh cổng then cài cẩn thận trước khi ngủ."},
        {"kanji": "聞く", "hiragana": "きく (kiku)", "sinoVietnamese": "VĂN", "meaning": "Nghe thấy, hỏi thăm", "level": "N5", "breakdown": "門 (Môn) + 耳 (Nhĩ)", "mnemonic": "Ghé vành tai vào khe cửa lắng nghe tiếng chim ca."},
        {"kanji": "間", "hiragana": "あいだ (aida) / かん (kan)", "sinoVietnamese": "GIAN", "meaning": "Khoảng cách, thời gian", "level": "N5", "breakdown": "門 (Môn) + 日 (Nhật)", "mnemonic": "Ánh mặt trời lọt qua khe hở giữa hai cánh cổng."},
        {"kanji": "校門", "hiragana": "こうもん (kōmon)", "sinoVietnamese": "HIỆU MÔN", "meaning": "Cổng trường học", "level": "N3", "breakdown": "校 (Hiệu) + 門 (Môn)", "mnemonic": "Cổng trường ríu rít tiếng cười đùa của học sinh."},
        {"kanji": "関門", "hiragana": "かんもん (kanmon)", "sinoVietnamese": "QUAN MÔN", "meaning": "Cửa ải hiểm trở", "level": "N1", "breakdown": "関 (Quan) + 門 (Môn)", "mnemonic": "Trạm kiểm soát chốt chặn biên ải nghiêm ngặt."},
        {"kanji": "門限", "hiragana": "もんげん (mongen)", "sinoVietnamese": "MÔN HẠN", "meaning": "Giờ giới nghiêm đóng cổng", "level": "N2", "breakdown": "門 (Môn) + 限 (Hạn)", "mnemonic": "Quy định giờ giấc phải về nhà trước khi khóa cổng."},
        {"kanji": "閉鎖", "hiragana": "へいさ (heisa)", "sinoVietnamese": "BẾ TỎA", "meaning": "Phong tỏa, đóng cửa cách ly", "level": "N1", "breakdown": "閉 (Bế - có 門) + 鎖 (Tỏa - khóa)", "mnemonic": "Khóa xích chặt cánh cửa cách ly hoàn toàn."}
    ],
    170: [ # 阜 / 阝 (Phụ - Gò đất cao, đồi núi bên trái)
        {"kanji": "階段", "hiragana": "かいだん (kaidan)", "sinoVietnamese": "GIAI ĐOẠN", "meaning": "Bậc cầu thang", "level": "N4", "breakdown": "階 (Giai - có 阝) + 段 (Đoạn)", "mnemonic": "Từng bậc thang đất xếp tầng tầng lớp lớp leo lên đồi."},
        {"kanji": "防ぐ", "hiragana": "ふせぐ (fusegu)", "sinoVietnamese": "PHÒNG", "meaning": "Phòng thủ, ngăn chặn", "level": "N3", "breakdown": "阝 (Phụ) + 方 (Phương)", "mnemonic": "Đắp bờ đê gò đất vững chắc ngăn nước lũ dâng."},
        {"kanji": "降る", "hiragana": "ふる (furu)", "sinoVietnamese": "GIÁNG", "meaning": "Mưa rơi, tuyết rơi xuống", "level": "N5", "breakdown": "阝 (Phụ) + 夅", "mnemonic": "Những giọt mưa từ trên trời rơi xuống sườn đồi."},
        {"kanji": "陽気", "hiragana": "ようき (yōki)", "sinoVietnamese": "DƯƠNG KHÍ", "meaning": "Ấm áp, vui tươi hoạt bát", "level": "N2", "breakdown": "陽 (Dương - có 阝) + 気 (Khí)", "mnemonic": "Sườn đồi đón ánh nắng mặt trời rực rỡ tươi vui."},
        {"kanji": "陰気", "hiragana": "いんき (inki)", "sinoVietnamese": "ÂM KHÍ", "meaning": "U ám, ảm đạm", "level": "N1", "breakdown": "陰 (Âm - có 阝) + 気 (Khí)", "mnemonic": "Mặt khuất sau sườn đồi luôn ẩm ướt thiếu ánh sáng."},
        {"kanji": "陸地", "hiragana": "りくち (rikuchi)", "sinoVietnamese": "LỤC ĐỊA", "meaning": "Đất liền, lục địa bao la", "level": "N2", "breakdown": "陸 (Lục - có 阝) + 地 (Địa)", "mnemonic": "Dải đất bằng phẳng cao ráo nổi trên mặt biển."},
        {"kanji": "限界", "hiragana": "げんかい (genkai)", "sinoVietnamese": "HẠN GIỚI", "meaning": "Giới hạn tột cùng", "level": "N2", "breakdown": "限 (Hạn - có 阝) + 界 (Giới)", "mnemonic": "Gò đồi dựng sừng sững làm giới hạn ranh giới đất đai."},
        {"kanji": "陣地", "hiragana": "じんち (jinchi)", "sinoVietnamese": "TRẬN ĐỊA", "meaning": "Trận địa đóng quân", "level": "N1", "breakdown": "陣 (Trận - có 阝) + 地 (Địa)", "mnemonic": "Quân đội chọn gò đất cao để dàn trận thế phòng thủ."},
        {"kanji": "障子", "hiragana": "しょうじ (shōji)", "sinoVietnamese": "CHƯỚNG TỬ", "meaning": "Cửa lùa giấy shoji truyền thống", "level": "N2", "breakdown": "障 (Chướng - có 阝) + 子", "mnemonic": "Vách ngăn che chắn gió lạnh lùa vào phòng."},
        {"kanji": "隆起", "hiragana": "りゅうき (ryūki)", "sinoVietnamese": "LONG KHỞI", "meaning": "Trồi lên, nhô cao mặt đất", "level": "N1", "breakdown": "隆 (Long - có 阝) + 起 (Khởi)", "mnemonic": "Vỏ trái đất đùn lên tạo thành những gò đồi mới."}
    ],
    171: [ # 隶 (Đãi - Kịp, với tay với bắt)
        {"kanji": "逮", "hiragana": "たい (tai)", "sinoVietnamese": "ĐÃI", "meaning": "Đuổi kịp, bắt kịp", "level": "N2", "breakdown": "辶 (Sước) + 隶 (Đãi)", "mnemonic": "Chạy vội đuổi theo vươn tay tóm bắt lấy kẻ trộm."},
        {"kanji": "逮捕", "hiragana": "たいほ (taiho)", "sinoVietnamese": "ĐÃI BỘ", "meaning": "Bắt giữ tội phạm", "level": "N2", "breakdown": "逮 (Đãi - có 隶) + 捕 (Bộ)", "mnemonic": "Cảnh sát đuổi theo tra tay vào còng bắt giữ tội phạm."},
        {"kanji": "逮捕状", "hiragana": "たいほじょう (taihojō)", "sinoVietnamese": "ĐÃI BỘ TRẠNG", "meaning": "Lệnh bắt giữ của tòa án", "level": "N1", "breakdown": "逮捕 + 状 (Trạng)", "mnemonic": "Văn bản lệnh bắt giữ chính thức theo luật pháp."},
        {"kanji": "兼ねる", "hiragana": "かねる (kaneru)", "sinoVietnamese": "KIÊM", "meaning": "Kiêm nhiệm nhiều việc", "level": "N2", "breakdown": "chứa gốc 隶 kết hợp", "mnemonic": "Một tay với nắm hai bó lúa kiêm hai nhiệm vụ."},
        {"kanji": "兼任", "hiragana": "けんにん (kennin)", "sinoVietnamese": "KIÊM NHIỆM", "meaning": "Kiêm nhiệm chức vụ", "level": "N1", "breakdown": "兼 (Kiêm) + 任 (Nhiệm)", "mnemonic": "Đồng thời đảm nhận nhiều trọng trách cùng lúc."},
        {"kanji": "謙遜", "hiragana": "けんそん (kenson)", "sinoVietnamese": "KHIÊM TỐN", "meaning": "Khiêm nhường từ tốn", "level": "N2", "breakdown": "謙 (Khiêm) + 遜 (Tốn)", "mnemonic": "Nói năng nhún nhường không tự cao tự đại."},
        {"kanji": "嫌い", "hiragana": "きらい (kirai)", "sinoVietnamese": "HIỀM", "meaning": "Ghét bỏ, không thích", "level": "N5", "breakdown": "女 (Nữ) + 兼 (Kiêm)", "mnemonic": "Bày tỏ thái độ ghét bỏ rõ ràng."},
        {"kanji": "機嫌", "hiragana": "きげん (kigen)", "sinoVietnamese": "CƠ HIỀM", "meaning": "Tâm trạng, sắc mặt vui buồn", "level": "N3", "breakdown": "機 (Cơ) + 嫌 (Hiềm)", "mnemonic": "Trạng thái cảm xúc vui vẻ hay cáu kỉnh trong ngày."},
        {"kanji": "嫌悪", "hiragana": "けんお (ken'o)", "sinoVietnamese": "HIỀM ÁC", "meaning": "Căm ghét kinh tởm", "level": "N1", "breakdown": "嫌 (Hiềm) + 悪 (Ác)", "mnemonic": "Cảm giác chán ghét tột cùng muốn xa lánh."},
        {"kanji": "兼備", "hiragana": "けんび (kenbi)", "sinoVietnamese": "KIÊM BỊ", "meaning": "Có đủ cả đôi đường (tài đức kiêm toàn)", "level": "N1", "breakdown": "兼 (Kiêm) + 備 (Bị)", "mnemonic": "Sở hữu trọn vẹn cả tài năng lẫn phẩm hạnh cao quý."}
    ],
    172: [ # 隹 (Chuy - Con chim đuôi ngắn, đậu trên cành)
        {"kanji": "集まる", "hiragana": "あつまる (atsumaru)", "sinoVietnamese": "TẬP", "meaning": "Tập hợp, quây quần", "level": "N4", "breakdown": "隹 (Chuy) + 木 (Mộc)", "mnemonic": "Đàn chim ríu rít đậu tụ tập trên cành cây xanh."},
        {"kanji": "進む", "hiragana": "すすむ (susumu)", "sinoVietnamese": "TIẾN", "meaning": "Tiến lên phía trước", "level": "N4", "breakdown": "辶 (Sước) + 隹 (Chuy)", "mnemonic": "Cất cánh bay thẳng tiến về chân trời phía trước."},
        {"kanji": "雀", "hiragana": "すずめ (suzume)", "sinoVietnamese": "TƯỚC", "meaning": "Chim sẻ nâu nhỏ bé", "level": "N2", "breakdown": "小 (Tiểu) + 隹 (Chuy)", "mnemonic": "Chú chim nhỏ ríu rít nhảy nhót trên sân thóc."},
        {"kanji": "雄", "hiragana": "おす (osu) / ゆう (yū)", "sinoVietnamese": "HÙNG", "meaning": "Con đực / anh hùng dũng mãnh", "level": "N1", "breakdown": "厷 + 隹 (Chuy)", "mnemonic": "Chim trống dang rộng đôi cánh thể hiện sức mạnh."},
        {"kanji": "雌", "hiragana": "めす (mesu) / し (shi)", "sinoVietnamese": "THƯ", "meaning": "Con cái / giống cái hiền hòa", "level": "N1", "breakdown": "止 + 隹 (Chuy)", "mnemonic": "Chim mái ấp trứng dịu dàng trong tổ ấm."},
        {"kanji": "雇う", "hiragana": "やとう (yatou)", "sinoVietnamese": "CỐ", "meaning": "Thuê mướn nhân công", "level": "N3", "breakdown": "戸 (Hộ) + 隹 (Chuy)", "mnemonic": "Mở cửa đón người vào nhà làm việc trả công."},
        {"kanji": "難しい", "hiragana": "むずかしい (muzukashii)", "sinoVietnamese": "NAN", "meaning": "Khó khăn trở ngại", "level": "N5", "breakdown": "革 + 隹 (Chuy)", "mnemonic": "Bắt chim chuy giữa rừng gai rậm rạp thật vô cùng khó."},
        {"kanji": "離れる", "hiragana": "はなれる (hanareru)", "sinoVietnamese": "LY", "meaning": "Rời xa, tách rời", "level": "N4", "breakdown": "离 + 隹 (Chuy)", "mnemonic": "Đôi cánh chim rời tổ bay xa ngút ngàn dặm."},
        {"kanji": "誰", "hiragana": "だれ (dare)", "sinoVietnamese": "THÙY", "meaning": "Ai, người nào", "level": "N5", "breakdown": "言 (Ngôn) + 隹 (Chuy)", "mnemonic": "Lời nói thắc mắc hỏi xem ai đang cất tiếng như chim hót."},
        {"kanji": "雑音", "hiragana": "ざつおん (zatsuon)", "sinoVietnamese": "TẠP ÂM", "meaning": "Tiếng ồn nhiễu loạn", "level": "N2", "breakdown": "雑 (Tạp - có 隹) + 音 (Âm)", "mnemonic": "Nhiều âm thanh lẫn lộn như tiếng đàn chim cùng hót inh ỏi."}
    ],
    173: [ # 雨 (Vũ - Cơn mưa từ mây trên trời rơi xuống)
        {"kanji": "雨", "hiragana": "あめ (ame)", "sinoVietnamese": "VŨ", "meaning": "Cơn mưa rào mát rượi", "level": "N5", "breakdown": "雨 (Vũ)", "mnemonic": "Bốn giọt nước mưa rơi xuống từ đám mây trên bầu trời."},
        {"kanji": "雪", "hiragana": "ゆき (yuki)", "sinoVietnamese": "TUYẾT", "meaning": "Tuyết trắng rơi", "level": "N5", "breakdown": "雨 (Vũ) + 彐", "mnemonic": "Bông tuyết trắng rơi xuống như có bàn tay quét dọn."},
        {"kanji": "雲", "hiragana": "くも (kumo)", "sinoVietnamese": "VÂN", "meaning": "Đám mây bồng bềnh", "level": "N3", "breakdown": "雨 (Vũ) + 云 (Vân)", "mnemonic": "Hơi nước ngưng tụ thành mây bồng bềnh chuẩn bị làm mưa."},
        {"kanji": "雷", "hiragana": "かみなり (kaminari)", "sinoVietnamese": "LÔI", "meaning": "Sấm sét nổ vang", "level": "N2", "breakdown": "雨 (Vũ) + 田 (Điền)", "mnemonic": "Tia chớp sấm rền đánh xuống thửa ruộng lúc trời mưa."},
        {"kanji": "電車", "hiragana": "でんしゃ (densha)", "sinoVietnamese": "ĐIỆN XA", "meaning": "Tàu điện chạy nhanh", "level": "N5", "breakdown": "電 (Điện - có 雨) + 車 (Xa)", "mnemonic": "Năng lượng điện như tia chớp vận hành đoàn tàu vùn vụt."},
        {"kanji": "電話", "hiragana": "でんわ (denwa)", "sinoVietnamese": "ĐIỆN THOẠI", "meaning": "Điện thoại liên lạc", "level": "N5", "breakdown": "電 (Điện - có 雨) + 話 (Thoại)", "mnemonic": "Nói chuyện xuyên khoảng cách qua dây dẫn điện."},
        {"kanji": "霧", "hiragana": "きり (kiri)", "sinoVietnamese": "VỤ", "meaning": "Sương mù giăng kín lối", "level": "N1", "breakdown": "雨 (Vũ) + 務 (Vụ)", "mnemonic": "Màn sương dày đặc giăng mờ ảo khắp sườn đồi sớm mai."},
        {"kanji": "霜", "hiragana": "しも (shimo)", "sinoVietnamese": "SƯƠNG", "meaning": "Sương muối lạnh cóng", "level": "N1", "breakdown": "雨 (Vũ) + 相 (Tương)", "mnemonic": "Hạt sương đọng thành băng mỏng trắng xóa trên ngọn cỏ."},
        {"kanji": "梅雨", "hiragana": "つゆ (tsuyu) / ばいう", "sinoVietnamese": "MAI VŨ", "meaning": "Mùa mưa dầm đầu hạ ở Nhật", "level": "N3", "breakdown": "梅 (Mai) + 雨 (Vũ)", "mnemonic": "Những ngày mưa rả rích đúng mùa quả mơ chín mọng."},
        {"kanji": "豪雨", "hiragana": "ごうう (gōʊ)", "sinoVietnamese": "HÀO VŨ", "meaning": "Mưa xối xả, mưa to dữ dội", "level": "N2", "breakdown": "豪 (Hào) + 雨 (Vũ)", "mnemonic": "Cơn mưa trút nước ào ạt gây ngập lụt khắp đường phố."}
    ],
    174: [ # 青 (Thanh - Màu xanh biếc của chồi non và bầu trời)
        {"kanji": "青い", "hiragana": "あおい (aoi)", "sinoVietnamese": "THANH", "meaning": "Màu xanh da trời, xanh biếc", "level": "N5", "breakdown": "青 (Thanh)", "mnemonic": "Mầm cây xanh non vươn lên đón ánh sáng giếng trời."},
        {"kanji": "青年", "hiragana": "せいねん (seinen)", "sinoVietnamese": "THANH NIÊN", "meaning": "Thanh niên, tuổi trẻ", "level": "N3", "breakdown": "青 (Thanh) + 年 (Niên)", "mnemonic": "Những tháng năm rực rỡ nhiệt huyết tươi xanh của đời người."},
        {"kanji": "青春", "hiragana": "せいしゅん (seishun)", "sinoVietnamese": "THANH XUÂN", "meaning": "Thanh xuân tươi đẹp", "level": "N2", "breakdown": "青 (Thanh) + 春 (Xuân)", "mnemonic": "Mùa xuân xanh mát ngập tràn hoài bão và ước mơ."},
        {"kanji": "晴天", "hiragana": "せいてん (seiten)", "sinoVietnamese": "TÌNH THIÊN", "meaning": "Trời trong xanh quang đãng", "level": "N2", "breakdown": "晴 (Tình - có 青) + 天 (Thiên)", "mnemonic": "Mặt trời chiếu sáng bầu trời xanh trong vắt không một gợn mây."},
        {"kanji": "清掃", "hiragana": "せいそう (seisō)", "sinoVietnamese": "THANH TÁO", "meaning": "Quét dọn vệ sinh sạch sẽ", "level": "N3", "breakdown": "清 (Thanh - có 青) + 掃 (Táo)", "mnemonic": "Dùng dòng nước trong xanh rửa sạch mọi bụi bẩn."},
        {"kanji": "精神", "hiragana": "せいしん (seishin)", "sinoVietnamese": "TINH THẦN", "meaning": "Tinh thần, ý chí kiên định", "level": "N3", "breakdown": "精 (Tinh - có 青) + 神 (Thần)", "mnemonic": "Ý chí trong sáng kiên định dẫn lối thành công."},
        {"kanji": "静か", "hiragana": "しずか (shizuka)", "sinoVietnamese": "TĨNH", "meaning": "Yên tĩnh, tĩnh lặng", "level": "N5", "breakdown": "青 (Thanh) + 争 (Tranh)", "mnemonic": "Trời xanh không tranh đua giữ trọn bầu không gian yên ắng."},
        {"kanji": "青空", "hiragana": "あおぞら (aozora)", "sinoVietnamese": "THANH KHÔNG", "meaning": "Bầu trời xanh trong vắt", "level": "N3", "breakdown": "青 (Thanh) + 空 (Không)", "mnemonic": "Vòm trời xanh ngắt trải rộng không một bóng mây."},
        {"kanji": "青信号", "hiragana": "あおしんごう (aoshingō)", "sinoVietnamese": "THANH TÍN HIỆU", "meaning": "Đèn xanh giao thông", "level": "N4", "breakdown": "青 (Thanh) + 信号 (Tín hiệu)", "mnemonic": "Tín hiệu đèn xanh cho phép xe cộ lưu thông an toàn."},
        {"kanji": "精密", "hiragana": "せいみつ (seimitsu)", "sinoVietnamese": "TINH MẬT", "meaning": "Chính xác tinh vi", "level": "N1", "breakdown": "精 (Tinh) + 密 (Mật)", "mnemonic": "Thiết bị đo lường cực kỳ tinh xảo và chuẩn xác."}
    ],
    175: [ # 非 (Phi - Sai trái, đôi cánh chim quay lưng ngược nhau)
        {"kanji": "非常に", "hiragana": "ひじょうに (hijōni)", "sinoVietnamese": "PHI THƯỜNG", "meaning": "Vô cùng, cực kỳ khác thường", "level": "N4", "breakdown": "非 (Phi) + 常 (Thường)", "mnemonic": "Vượt trên mức bình thường muôn phần."},
        {"kanji": "是非", "hiragana": "ぜひ (zehi)", "sinoVietnamese": "THỊ PHI", "meaning": "Nhất định / lẽ đúng sai", "level": "N4", "breakdown": "是 (Thị - đúng) + 非 (Phi - sai)", "mnemonic": "Phân định điều phải trái đúng sai trắng đen rõ ràng."},
        {"kanji": "非常口", "hiragana": "ひじょうぐち (hijōguchi)", "sinoVietnamese": "PHI THƯỜNG KHẨU", "meaning": "Cửa thoát hiểm khẩn cấp", "level": "N3", "breakdown": "非常 + 口 (Khẩu)", "mnemonic": "Lối thoát hiểm dùng khi xảy ra hỏa hoạn bất thường."},
        {"kanji": "非難", "hiragana": "ひなん (hinan)", "sinoVietnamese": "PHI NAN", "meaning": "Chỉ trích, phê phán", "level": "N2", "breakdown": "非 (Phi) + 難 (Nan)", "mnemonic": "Chỉ ra những việc làm sai trái để phê bình uốn nắn."},
        {"kanji": "非行", "hiragana": "ひこう (hikō)", "sinoVietnamese": "PHI HÀNH", "meaning": "Hành vi sai trái ngỗ nghịch", "level": "N1", "breakdown": "非 (Phi) + 行 (Hành)", "mnemonic": "Lạc lối phạm vào những việc làm trái pháp luật đạo đức."},
        {"kanji": "罪", "hiragana": "つみ (tsumi)", "sinoVietnamese": "TỘI", "meaning": "Tội lỗi, phạm tội", "level": "N3", "breakdown": "罒 (Võng) + 非 (Phi)", "mnemonic": "Làm điều sai trái phi pháp thì sa vào lưới công lý."},
        {"kanji": "悲しい", "hiragana": "かなしい (kanashii)", "sinoVietnamese": "BI", "meaning": "Buồn bã đau xót", "level": "N5", "breakdown": "非 (Phi) + 心 (Tâm)", "mnemonic": "Trong lòng đau xót khi nhìn thấy cảnh chia lìa ngang trái."},
        {"kanji": "非公開", "hiragana": "ひこうかい (hikōkai)", "sinoVietnamese": "PHI CÔNG KHAI", "meaning": "Kín đáo, không công khai", "level": "N2", "breakdown": "非 (Phi) + 公開 (Công khai)", "mnemonic": "Giữ kín bí mật không để lộ ra ngoài công chúng."},
        {"kanji": "非凡", "hiragana": "ひぼん (hibon)", "sinoVietnamese": "PHI PHÀM", "meaning": "Phi phàm, xuất chúng khác thường", "level": "N1", "breakdown": "非 (Phi) + 凡 (Phàm)", "mnemonic": "Tài năng xuất chúng không phải là người phàm tục."},
        {"kanji": "拒絶", "hiragana": "きょぜつ (kyozetsu)", "sinoVietnamese": "CỰ TUYỆT", "meaning": "Khước từ cự tuyệt dứt khoát", "level": "N1", "breakdown": "Chứa gốc nghĩa phủ định phi", "mnemonic": "Lắc đầu từ chối dứt khoát không chấp thuận đề nghị."}
    ]
}

# Write to scripts/radical_data_141_to_175.py
with open('scripts/radical_data_141_to_175.py', 'w', encoding='utf-8') as f:
    f.write("# -*- coding: utf-8 -*-\n")
    f.write('"""Radicals 141 to 175 Vocabularies"""\n')
    f.write("RADICAL_VOCABS_141_TO_175 = " + json.dumps(data, ensure_ascii=False, indent=2) + "\n")

print(f"Successfully generated radicals 141-175! Total radicals: {len(data)}")
for k in sorted(data.keys()):
    assert len(data[k]) >= 10
    print(f"Radical {k}: {len(data[k])} words")
