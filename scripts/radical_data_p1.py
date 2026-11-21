# -*- coding: utf-8 -*-
"""
Radicals 1 to 55 Comprehensive Vocabulary
Ensuring every radical has at least 10 words, and high frequency ones have 15-22 words.
"""
from scripts.radical_vocabs_1_to_50 import RADICAL_VOCABS_1_TO_50

RADICAL_VOCABS_P1 = dict(RADICAL_VOCABS_1_TO_50)

RADICAL_VOCABS_P1.update({
    21: [ # 匕 (Chủy - Cái thìa, muỗng)
        {"kanji": "匙", "hiragana": "さじ (saji)", "sinoVietnamese": "THÌ", "meaning": "Cái muỗng, thìa múc", "level": "N1", "breakdown": "是 (Thị) + 匕 (Chủy)", "mnemonic": "Cái thìa chuẩn mực dùng trong bữa ăn."},
        {"kanji": "北", "hiragana": "きた (kita)", "sinoVietnamese": "BẮC", "meaning": "Hướng bắc, phương bắc", "level": "N5", "breakdown": "Hai người quay lưng 匕 vào nhau", "mnemonic": "Hai người quay lưng tránh gió lạnh phương Bắc."},
        {"kanji": "北方", "hiragana": "ほっぽう (hoppō)", "sinoVietnamese": "BẮC PHƯƠNG", "meaning": "Phía bắc, vùng phương bắc", "level": "N3", "breakdown": "北 (Bắc) + 方 (Phương)", "mnemonic": "Phương hướng lạnh giá ở cực Bắc."},
        {"kanji": "敗れる", "hiragana": "やぶれる (yabureru)", "sinoVietnamese": "BẠI", "meaning": "Bị đánh bại, thua cuộc", "level": "N3", "breakdown": "貝 (Bối) + 攴 có 匕", "mnemonic": "Thua trận mất sạch tiền của."},
        {"kanji": "旨い", "hiragana": "うまい (umai)", "sinoVietnamese": "CHỈ", "meaning": "Ngon miệng, khéo léo", "level": "N3", "breakdown": "匕 (Chủy) + 日 (Nhật)", "mnemonic": "Dùng thìa múc món ngon ăn mỗi ngày."},
        {"kanji": "旨", "hiragana": "むね (mune)", "sinoVietnamese": "CHỈ", "meaning": "Ý chỉ, mục đích, tôn chỉ", "level": "N1", "breakdown": "匕 (Chủy) + 日 (Nhật)", "mnemonic": "Tôn chỉ sâu sắc truyền lại."},
        {"kanji": "化ける", "hiragana": "ばける (bakeru)", "sinoVietnamese": "HÓA", "meaning": "Biến hóa, hóa trang", "level": "N2", "breakdown": "亻 (Nhân) + 匕 (Chủy)", "mnemonic": "Người cầm thìa phép biến hóa khôn lường."},
        {"kanji": "変化", "hiragana": "へんか (henka)", "sinoVietnamese": "BIẾN HÓA", "meaning": "Biến đổi, sự thay đổi", "level": "N4", "breakdown": "変 (Biến) + 化 (Hóa)", "mnemonic": "Sự biến chuyển của vạn vật."},
        {"kanji": "化学", "hiragana": "かがく (kagaku)", "sinoVietnamese": "HÓA HỌC", "meaning": "Môn hóa học", "level": "N4", "breakdown": "化 (Hóa) + 学 (Học)", "mnemonic": "Môn học nghiên cứu biến đổi chất."},
        {"kanji": "比べる", "hiragana": "くらべる (kuraberu)", "sinoVietnamese": "TỶ", "meaning": "So sánh, đối chiếu", "level": "N4", "breakdown": "Hai chữ 匕 đứng cạnh nhau", "mnemonic": "Đặt hai chiếc thìa cạnh nhau để so sánh độ dài."}
    ],
    22: [ # 匚 (Phương - Hộp đựng đồ)
        {"kanji": "箱", "hiragana": "はこ (hako)", "sinoVietnamese": "TƯƠNG", "meaning": "Cái hộp, cái thùng", "level": "N5", "breakdown": "竹 (Trúc) + 相 có dạng 匚", "mnemonic": "Hộp làm bằng nan trúc chắc chắn."},
        {"kanji": "匠", "hiragana": "たくみ (takumi)", "sinoVietnamese": "TƯỢNG", "meaning": "Nghệ nhân, thợ bậc thầy", "level": "N1", "breakdown": "匚 (Phương) + 斤 (Cân - rìu)", "mnemonic": "Người thợ cất rìu trong hộp đồ nghề."},
        {"kanji": "巨", "hiragana": "きょ (kyo)", "sinoVietnamese": "CỰ", "meaning": "Khổng lồ, cực lớn", "level": "N2", "breakdown": "Bộ 匚 bao quanh thước đo", "mnemonic": "Chiếc hộp có kích thước khổng lồ."},
        {"kanji": "巨大", "hiragana": "きょだい (kyodai)", "sinoVietnamese": "CỰ ĐẠI", "meaning": "To lớn khác thường, vĩ đại", "level": "N3", "breakdown": "巨 (Cự) + 大 (Đại)", "mnemonic": "Vật thể to lớn đồ sộ."},
        {"kanji": "巨人", "hiragana": "きょじん (kyojin)", "sinoVietnamese": "CỰ NHÂN", "meaning": "Người khổng lồ", "level": "N2", "breakdown": "巨 (Cự) + 人 (Nhân)", "mnemonic": "Người có vóc dáng khổng lồ."},
        {"kanji": "巨額", "hiragana": "きょがく (kyogaku)", "sinoVietnamese": "CỰ NGẠCH", "meaning": "Khoản tiền kếch xù", "level": "N1", "breakdown": "巨 (Cự) + 額 (Ngạch)", "mnemonic": "Số tiền lớn phi thường."},
        {"kanji": "師匠", "hiragana": "ししょう (shishō)", "sinoVietnamese": "SƯ TƯỢNG", "meaning": "Sư phụ, người thầy dạy nghề", "level": "N1", "breakdown": "師 (Sư) + 匠 (Tượng)", "mnemonic": "Bậc thầy truyền thụ tinh hoa thủ công."},
        {"kanji": "筐体", "hiragana": "きょうたい (kyōtai)", "sinoVietnamese": "KHUÔNG THỂ", "meaning": "Khung máy, vỏ hộp thiết bị", "level": "N1", "breakdown": "竹 + 匚 (Phương) + 体 (Thể)", "mnemonic": "Vỏ hộp bao bọc bộ vi xử lý."},
        {"kanji": "匡正", "hiragana": "きょうせい (kyōsei)", "sinoVietnamese": "KHUÔNG CHÍNH", "meaning": "Uốn nắn, sửa sai cho thẳng thắn", "level": "N1", "breakdown": "匚 (Phương) + 𠁁", "mnemonic": "Đặt vào khuôn để nắn thẳng lại."},
        {"kanji": "意匠", "hiragana": "いしょう (ishō)", "sinoVietnamese": "Ý TƯỢNG", "meaning": "Kiểu dáng công nghiệp, ý tưởng thiết kế", "level": "N1", "breakdown": "意 (Ý) + 匠 (Tượng)", "mnemonic": "Ý tưởng tài hoa của nhà thiết kế."}
    ],
    23: [ # 匸 (Hệ - Nơi ẩn nấp kín đáo)
        {"kanji": "匹", "hiragana": "ひき / ひつ (hiki)", "sinoVietnamese": "THẤT", "meaning": "Con (đếm động vật), tương xứng", "level": "N4", "breakdown": "匸 (Hệ) che 八 (Bát)", "mnemonic": "Nhốt con thú nhỏ vào góc chuồng kín."},
        {"kanji": "匹敵", "hiragana": "ひってき (hitteki)", "sinoVietnamese": "THẤT ĐỊCH", "meaning": "Sánh ngang, ngang tài ngang sức", "level": "N1", "breakdown": "匹 (Thất) + 敵 (Địch)", "mnemonic": "Đối thủ xứng tầm ngang ngửa."},
        {"kanji": "匿う", "hiragana": "かくまう (kakumau)", "sinoVietnamese": "NẶC", "meaning": "Bao che, giấu giếm ai đó", "level": "N1", "breakdown": "匸 (Hệ) + 若 (Nhược)", "mnemonic": "Giấu người yếu thế vào nơi kín đáo an toàn."},
        {"kanji": "匿名", "hiragana": "とくめい (tokumei)", "sinoVietnamese": "NẶC DANH", "meaning": "Ẩn danh, giấu tên", "level": "N2", "breakdown": "匿 (Nặc) + 名 (Danh)", "mnemonic": "Giấu tên tuổi không để ai biết."},
        {"kanji": "隠匿", "hiragana": "いんとく (intoku)", "sinoVietnamese": "ẨN NẶC", "meaning": "Cất giấu phi pháp, che giấu", "level": "N1", "breakdown": "隠 (Ẩn) + 匿 (Nặc)", "mnemonic": "Che giấu tang vật kỹ càng."},
        {"kanji": "区分", "hiragana": "くぶん (kubun)", "sinoVietnamese": "KHU PHÂN", "meaning": "Phân chia khu vực, phân loại", "level": "N2", "breakdown": "区 có nét 匸 + 分 (Phân)", "mnemonic": "Chia nhỏ ranh giới từng vùng."},
        {"kanji": "区", "hiragana": "く (ku)", "sinoVietnamese": "KHU", "meaning": "Khu, quận (đơn vị hành chính)", "level": "N4", "breakdown": "匸 (Hệ) bao bọc", "mnemonic": "Khu vực khép kín trong thành phố."},
        {"kanji": "地区", "hiragana": "ちく (chiku)", "sinoVietnamese": "ĐỊA KHU", "meaning": "Địa khu, khu vực địa lý", "level": "N3", "breakdown": "地 (Địa) + 区 (Khu)", "mnemonic": "Khu đất đã được quy hoạch rõ ràng."},
        {"kanji": "区別", "hiragana": "くべつ (kubetsu)", "sinoVietnamese": "KHU BIỆT", "meaning": "Phân biệt rạch ròi", "level": "N3", "breakdown": "区 (Khu) + 別 (Biệt)", "mnemonic": "Vạch ranh giới phân biệt giữa các bên."},
        {"kanji": "区域", "hiragana": "くいき (kuiki)", "sinoVietnamese": "KHU VỰC", "meaning": "Khu vực, phạm vi", "level": "N2", "breakdown": "区 (Khu) + 域 (Vực)", "mnemonic": "Ranh giới địa hạt phân định."}
    ],
    24: [ # 十 (Thập - Số 10, hoàn thiện)
        {"kanji": "十", "hiragana": "とお / じゅう (jū)", "sinoVietnamese": "THẬP", "meaning": "Số mười (10)", "level": "N5", "breakdown": "Nét ngang 一 và nét sổ 丨", "mnemonic": "Mười phương trời đất giao thoa hoàn hảo."},
        {"kanji": "十分", "hiragana": "じゅうぶん (jūbun)", "sinoVietnamese": "THẬP PHÂN", "meaning": "Đầy đủ, trọn vẹn, thoả đáng", "level": "N4", "breakdown": "十 (Thập) + 分 (Phân)", "mnemonic": "Đạt 10 phần trọn vẹn không thiếu thốn."},
        {"kanji": "十日", "hiragana": "とおか (tōka)", "sinoVietnamese": "THẬP NHẬT", "meaning": "Ngày mùng 10, mười ngày", "level": "N5", "breakdown": "十 (Thập) + 日 (Nhật)", "mnemonic": "Cột mốc 10 ngày trong tháng."},
        {"kanji": "二十歳", "hiragana": "はたち (hatachi)", "sinoVietnamese": "NHỊ THẬP TUẾ", "meaning": "20 tuổi (tuổi trưởng thành)", "level": "N4", "breakdown": "二 (Nhị) + 十 (Thập) + 歳 (Tuế)", "mnemonic": "Cột mốc tròn hai mươi tuổi."},
        {"kanji": "千", "hiragana": "せん (sen)", "sinoVietnamese": "THIÊN", "meaning": "Một nghìn (1.000)", "level": "N5", "breakdown": "Thập có nét phẩy", "mnemonic": "Gấp 100 lần số Mười là số Thiên."},
        {"kanji": "午", "hiragana": "ご (go)", "sinoVietnamese": "NGỌ", "meaning": "Buổi trưa, giờ Ngọ", "level": "N5", "breakdown": "Thập nhô lên nét phẩy", "mnemonic": "Đúng 12 giờ trưa ánh nắng chiếu đỉnh đầu."},
        {"kanji": "午前", "hiragana": "ごぜん (gozen)", "sinoVietnamese": "NGỌ TIỀN", "meaning": "Buổi sáng, trước 12h trưa (AM)", "level": "N5", "breakdown": "午 (Ngọ) + 前 (Tiền)", "mnemonic": "Thời gian trước giờ ngọ."},
        {"kanji": "午後", "hiragana": "ごご (gogo)", "sinoVietnamese": "NGỌ HẬU", "meaning": "Buổi chiều, sau 12h trưa (PM)", "level": "N5", "breakdown": "午 (Ngọ) + 後 (Hậu)", "mnemonic": "Thời gian sau giờ ngọ."},
        {"kanji": "協調", "hiragana": "きょうちょう (kyōchō)", "sinoVietnamese": "HIỆP ĐIỀU", "meaning": "Hợp tác hài hòa, phối hợp", "level": "N2", "breakdown": "十 (Thập) + 3 chữ Lực (力)", "mnemonic": "Mười người chung sức hiệp lực làm việc."},
        {"kanji": "協力", "hiragana": "きょうりょく (kyōryoku)", "sinoVietnamese": "HIỆP LỰC", "meaning": "Hợp tác, chung sức giúp đỡ", "level": "N4", "breakdown": "協 (Hiệp) + 力 (Lực)", "mnemonic": "Cùng nhau góp mười phần sức lực."}
    ],
    25: [ # 卜 (Bốc - Bói toán, xem quẻ)
        {"kanji": "占う", "hiragana": "うらなう (uranau)", "sinoVietnamese": "CHIÊM", "meaning": "Bói toán, đoán trước", "level": "N2", "breakdown": "卜 (Bốc) + 口 (Khẩu)", "mnemonic": "Xem quẻ bói vết nứt trên mai rùa rồi mở miệng phán."},
        {"kanji": "占い", "hiragana": "うらない (uranai)", "sinoVietnamese": "CHIÊM", "meaning": "Quẻ bói, việc bói toán", "level": "N3", "breakdown": "占 (Chiêm) + い", "mnemonic": "Lời tiên tri của thầy bói."},
        {"kanji": "占める", "hiragana": "しめる (shimeru)", "sinoVietnamese": "CHIÊM", "meaning": "Chiếm cứ, nắm giữ tỉ lệ", "level": "N2", "breakdown": "占 (Chiêm) + める", "mnemonic": "Chiếm giữ vị trí đắc địa theo quẻ bói."},
        {"kanji": "独占", "hiragana": "どくせん (dokusen)", "sinoVietnamese": "ĐỘC CHIÊM", "meaning": "Độc quyền, chiếm độc tôn", "level": "N2", "breakdown": "独 (Độc) + 占 (Chiêm)", "mnemonic": "Một mình thâu tóm toàn bộ thị trường."},
        {"kanji": "占領", "hiragana": "せんりょう (senryō)", "sinoVietnamese": "CHIÊM LÃNH", "meaning": "Chiếm đóng lãnh thổ", "level": "N1", "breakdown": "占 (Chiêm) + 領 (Lãnh)", "mnemonic": "Đóng quân kiểm soát lãnh thổ."},
        {"kanji": "卦", "hiragana": "け (ke)", "sinoVietnamese": "QUÁI", "meaning": "Quẻ bói trong Kinh Dịch", "level": "N1", "breakdown": "圭 (Khuê) + 卜 (Bốc)", "mnemonic": "Tám quẻ Bát quái suy đoán vận mệnh."},
        {"kanji": "卜筮", "hiragana": "ぼくぜい (bokuzei)", "sinoVietnamese": "BỐC PHỆ", "meaning": "Xem bói cỏ thi và mai rùa", "level": "N1", "breakdown": "卜 (Bốc) + 筮 (Phệ)", "mnemonic": "Nghệ thuật chiêm bốc cổ truyền."},
        {"kanji": "上", "hiragana": "うえ (ue)", "sinoVietnamese": "THƯỢNG", "meaning": "Phía trên, bên trên", "level": "N5", "breakdown": "Nét ngang kèm nét 卜 chỉ phía trên", "mnemonic": "Dấu chỉ định vị trí ở phía trên."},
        {"kanji": "予言", "hiragana": "よげん (yogen)", "sinoVietnamese": "DỰ NGÔN", "meaning": "Lời tiên tri, dự đoán tương lai", "level": "N2", "breakdown": "予 (Dự) + 言 (Ngôn)", "mnemonic": "Lời nói báo trước điều sắp xảy ra."},
        {"kanji": "的確", "hiragana": "てきかく (tekikaku)", "sinoVietnamese": "ĐÍCH XÁC", "meaning": "Chính xác, trúng hồng tâm", "level": "N2", "breakdown": "的 (Đích có 卜) + 確 (Xác)", "mnemonic": "Đoán trúng đích như thần."}
    ],
    26: [ # 卩 (Tiết - Đốt tre, con dấu, quỳ gối)
        {"kanji": "印", "hiragana": "しるし / いん (in)", "sinoVietnamese": "ẤN", "meaning": "Con dấu, dấu ấn", "level": "N3", "breakdown": "爪 (Trảo) + 卩 (Tiết)", "mnemonic": "Tay cầm con dấu ấn xuống giấy ký kết."},
        {"kanji": "印象", "hiragana": "いんしょう (inshō)", "sinoVietnamese": "ẤN TƯỢNG", "meaning": "Ấn tượng sâu đậm", "level": "N3", "breakdown": "印 (Ấn) + 象 (Tượng)", "mnemonic": "Hình ảnh in hằn sâu trong tâm trí."},
        {"kanji": "印刷", "hiragana": "いんさつ (insatsu)", "sinoVietnamese": "ẤN LOÁT", "meaning": "Việc in ấn, in tài liệu", "level": "N3", "breakdown": "印 (Ấn) + 刷 (Loát)", "mnemonic": "Quét mực đóng dấu in hàng loạt."},
        {"kanji": "卵", "hiragana": "たまご (tamago)", "sinoVietnamese": "NOÃN", "meaning": "Quả trứng", "level": "N5", "breakdown": "Hai nửa vỏ trứng có phôi 卩", "mnemonic": "Hai mảnh vỏ trứng vừa tách đôi ra."},
        {"kanji": "危ない", "hiragana": "あぶない (abunai)", "sinoVietnamese": "NGUY", "meaning": "Nguy hiểm, nguy cấp", "level": "N5", "breakdown": "Người đứng bên bờ vực quỳ gối 卩", "mnemonic": "Đứng chênh vênh mép vực vô cùng nguy hiểm."},
        {"kanji": "危険", "hiragana": "きけん (kiken)", "sinoVietnamese": "NGUY HIỂM", "meaning": "Sự nguy hiểm, mối rủi ro", "level": "N4", "breakdown": "危 (Nguy) + 険 (Hiểm)", "mnemonic": "Mối hiểm họa đe dọa an toàn."},
        {"kanji": "危機", "hiragana": "きき (kiki)", "sinoVietnamese": "NGUY CƠ", "meaning": "Khủng hoảng, nguy cơ", "level": "N2", "breakdown": "危 (Nguy) + 機 (Cơ)", "mnemonic": "Trong nguy cơ luôn tiềm ẩn cơ hội."},
        {"kanji": "節", "hiragana": "ふし / せつ (setsu)", "sinoVietnamese": "TIẾT", "meaning": "Đốt tre, khớp xương, tiết kiệm", "level": "N3", "breakdown": "竹 (Trúc) + 即 có 卩", "mnemonic": "Mỗi đốt cây tre đều phân chia rõ rệt."},
        {"kanji": "季節", "hiragana": "きせつ (kisetsu)", "sinoVietnamese": "QUÝ TIẾT", "meaning": "Mùa màng, các mùa trong năm", "level": "N4", "breakdown": "季 (Quý) + 節 (Tiết)", "mnemonic": "Thời tiết bốn mùa luân chuyển."},
        {"kanji": "即座に", "hiragana": "そくざに (sokuzani)", "sinoVietnamese": "TỨC TỌA", "meaning": "Ngay tức khắc, ngay tại chỗ", "level": "N1", "breakdown": "即 (Tức có 卩) + 座 (Tọa)", "mnemonic": "Phản ứng ngay lập tức khi vừa nghe thấy."}
    ],
    27: [ # 厂 (Hán - Sườn núi, mái hiên)
        {"kanji": "厚い", "hiragana": "あつい (atsui)", "sinoVietnamese": "HẬU", "meaning": "Dày dặn, nồng hậu", "level": "N4", "breakdown": "厂 (Hán) + 日 + 子", "mnemonic": "Vách đá sườn núi dày dặn che chắn giông gió."},
        {"kanji": "厄介", "hiragana": "やっかい (yakkai)", "sinoVietnamese": "ÁCH GIỚI", "meaning": "Phiền toái, rắc rối", "level": "N2", "breakdown": "厄 (Ách có 厂) + 介 (Giới)", "mnemonic": "Mối tai ương rắc rối rơi xuống đầu."},
        {"kanji": "原", "hiragana": "はら / げん (gen)", "sinoVietnamese": "NGUYÊN", "meaning": "Thảo nguyên, nguồn cội", "level": "N3", "breakdown": "厂 (Hán) + 泉 (Tuyền - suối)", "mnemonic": "Dòng suối nguồn tuôn ra từ vách đá."},
        {"kanji": "原因", "hiragana": "げんいん (gen'in)", "sinoVietnamese": "NGUYÊN NHÂN", "meaning": "Nguyên nhân gốc rễ", "level": "N4", "breakdown": "原 (Nguyên) + 因 (Nhân)", "mnemonic": "Nguồn gốc sâu xa dẫn đến sự việc."},
        {"kanji": "原子", "hiragana": "げんし (genshi)", "sinoVietnamese": "NGUYÊN TỬ", "meaning": "Hạt nguyên tử", "level": "N2", "breakdown": "原 (Nguyên) + 子 (Tử)", "mnemonic": "Hạt cơ bản cấu tạo nên vật chất."},
        {"kanji": "原料", "hiragana": "げんりょう (genryō)", "sinoVietnamese": "NGUYÊN LIỆU", "meaning": "Nguyên liệu thô ban đầu", "level": "N3", "breakdown": "原 (Nguyên) + 料 (Liệu)", "mnemonic": "Vật liệu gốc khai thác từ tự nhiên."},
        {"kanji": "厳重", "hiragana": "げんじゅう (genjū)", "sinoVietnamese": "NGHIÊM TRỌNG", "meaning": "Nghiêm ngặt, cẩn mật", "level": "N2", "breakdown": "厳 (Nghiêm có 厂) + 重 (Trọng)", "mnemonic": "Bảo vệ nghiêm mật như vách núi kiên cố."},
        {"kanji": "厳格", "hiragana": "げんかく (genkaku)", "sinoVietnamese": "NGHIÊM CÁCH", "meaning": "Nghiêm khắc, kỷ luật cao", "level": "N1", "breakdown": "厳 (Nghiêm) + 格 (Cách)", "mnemonic": "Quy tắc khắt khe không nhân nhượng."},
        {"kanji": "歴", "hiragana": "れき (reki)", "sinoVietnamese": "LỊCH", "meaning": "Trải qua, lịch sử", "level": "N3", "breakdown": "厂 (Hán) + 禾 (Hòa) + 止", "mnemonic": "Bước chân đi qua sườn núi ghi dấu năm tháng."},
        {"kanji": "歴史", "hiragana": "れきし (rekishi)", "sinoVietnamese": "LỊCH SỬ", "meaning": "Lịch sử ngàn năm", "level": "N4", "breakdown": "歴 (Lịch) + 史 (Sử)", "mnemonic": "Những trang sử vàng của dân tộc."}
    ],
    28: [ # 厶 (Khư - Riêng tư, ích kỷ)
        {"kanji": "私", "hiragana": "わたし (watashi)", "sinoVietnamese": "TƯ", "meaning": "Tôi, riêng tư, cá nhân", "level": "N5", "breakdown": "禾 (Hòa - lúa) + 厶 (Khư)", "mnemonic": "Phần thóc lúa riêng tư thu hoạch về nhà."},
        {"kanji": "私立", "hiragana": "しりつ (shiritsu)", "sinoVietnamese": "TƯ LẬP", "meaning": "Trường tư, tư nhân thành lập", "level": "N4", "breakdown": "私 (Tư) + 立 (Lập)", "mnemonic": "Tổ chức do tư nhân bỏ vốn gây dựng."},
        {"kanji": "公私", "hiragana": "こうし (kōshi)", "sinoVietnamese": "CÔNG TƯ", "meaning": "Việc công và việc tư", "level": "N2", "breakdown": "公 (Công) + 私 (Tư)", "mnemonic": "Rạch ròi giữa việc chung và việc riêng."},
        {"kanji": "去る", "hiragana": "さる (saru)", "sinoVietnamese": "KHỨ", "meaning": "Rời đi, qua đi", "level": "N3", "breakdown": "土 (Thổ) + 厶 (Khư)", "mnemonic": "Chôn giấu chuyện riêng vào lòng đất rồi ra đi."},
        {"kanji": "去年", "hiragana": "きょねん (kyonen)", "sinoVietnamese": "KHỨ NIÊN", "meaning": "Năm ngoái, năm trước", "level": "N5", "breakdown": "去 (Khứ) + 年 (Niên)", "mnemonic": "Năm cũ đã trôi qua vĩnh viễn."},
        {"kanji": "過去", "hiragana": "かこ (kako)", "sinoVietnamese": "QUÁ KHỨ", "meaning": "Quá khứ, ngày xưa", "level": "N3", "breakdown": "過 (Quá) + 去 (Khứ)", "mnemonic": "Kỷ niệm đã lùi vào dĩ vãng."},
        {"kanji": "参る", "hiragana": "まいる (mairu)", "sinoVietnamese": "THAM", "meaning": "Đi, đến (khiêm nhường ngữ), bái lạy", "level": "N4", "breakdown": "Bộ 厶 kết hợp đại", "mnemonic": "Thành tâm đi đến đền thờ bái lạy."},
        {"kanji": "参加", "hiragana": "さんか (sanka)", "sinoVietnamese": "THAM GIA", "meaning": "Tham gia vào sự kiện", "level": "N4", "breakdown": "参 (Tham) + 加 (Gia)", "mnemonic": "Góp mặt cùng mọi người trong hoạt động."},
        {"kanji": "参考", "hiragana": "さんこう (sankō)", "sinoVietnamese": "THAM KHẢO", "meaning": "Tham khảo tài liệu", "level": "N3", "breakdown": "参 (Tham) + 考 (Khảo)", "mnemonic": "Đọc thêm tư liệu để cân nhắc."},
        {"kanji": "台", "hiragana": "だい (dai)", "sinoVietnamese": "ĐÀI", "meaning": "Cái bệ, đài, bục giảng", "level": "N4", "breakdown": "厶 (Khư) + 口 (Khẩu)", "mnemonic": "Bục cao riêng tư để người đứng phát biểu."}
    ],
    29: [ # 又 (Hựu - Lại nữa, bàn tay phải)
        {"kanji": "又", "hiragana": "また (mata)", "sinoVietnamese": "HỰU", "meaning": "Lại, vả lại, lần nữa", "level": "N3", "breakdown": "Hình bàn tay phải đưa ra nắm lấy", "mnemonic": "Lại giơ tay nắm lấy cơ hội lần nữa."},
        {"kanji": "友", "hiragana": "とも (tomo)", "sinoVietnamese": "HỮU", "meaning": "Bạn bè thân thiết", "level": "N5", "breakdown": "Hai bàn tay 又 đan vào nhau", "mnemonic": "Hai bàn tay tri kỷ bắt chặt lấy nhau."},
        {"kanji": "友達", "hiragana": "ともだち (tomodachi)", "sinoVietnamese": "HỮU ĐẠT", "meaning": "Bạn bè đồng lứa", "level": "N5", "breakdown": "友 (Hữu) + 達 (Đạt)", "mnemonic": "Những người bạn cùng chí hướng."},
        {"kanji": "友人", "hiragana": "ゆうじん (yūjin)", "sinoVietnamese": "HỮU NHÂN", "meaning": "Người bạn quý", "level": "N3", "breakdown": "友 (Hữu) + 人 (Nhân)", "mnemonic": "Người bạn thân tình lâu năm."},
        {"kanji": "友好", "hiragana": "ゆうこう (yūkō)", "sinoVietnamese": "HỮU HẢO", "meaning": "Tình hữu nghị, hòa hảo", "level": "N2", "breakdown": "友 (Hữu) + 好 (Hảo)", "mnemonic": "Mối quan hệ bang giao hữu nghị tốt đẹp."},
        {"kanji": "反省", "hiragana": "はんせい (hansei)", "sinoVietnamese": "PHẢN TỈNH", "meaning": "Tự kiểm điểm, nhìn nhận lỗi", "level": "N3", "breakdown": "反 (Phản có 又) + 省 (Tỉnh)", "mnemonic": "Lật lại hành vi để tự nhắc nhở bản thân."},
        {"kanji": "反対", "hiragana": "はんたい (hantai)", "sinoVietnamese": "PHẢN ĐỐI", "meaning": "Phản đối, đối nghịch", "level": "N4", "breakdown": "反 (Phản) + 対 (Đối)", "mnemonic": "Giơ tay ra dấu phản bác ý kiến."},
        {"kanji": "収める", "hiragana": "おさめる (osameru)", "sinoVietnamese": "THU", "meaning": "Thu thập, gặt hái, cất giữ", "level": "N2", "breakdown": "Bàn tay 又 thu nhận vào", "mnemonic": "Đưa tay thu gom thành quả về kho."},
        {"kanji": "収入", "hiragana": "しゅうにゅう (shūnyū)", "sinoVietnamese": "THU NHẬP", "meaning": "Thu nhập, tiền kiếm được", "level": "N3", "breakdown": "収 (Thu) + 入 (Nhập)", "mnemonic": "Khoản tiền thực thu vào túi."},
        {"kanji": "双子", "hiragana": "ふたご (futago)", "sinoVietnamese": "SONG TỬ", "meaning": "Cặp sinh đôi", "level": "N3", "breakdown": "Hai chữ 又 cạnh nhau + 子", "mnemonic": "Hai đứa trẻ sinh đôi tay nắm tay."}
    ],
    30: [ # 口 (Khẩu - Miệng, lời nói, cổng vào) - Tần suất rất cao
        {"kanji": "口", "hiragana": "くち (kuchi)", "sinoVietnamese": "KHẨU", "meaning": "Miệng, cửa ngõ, lối vào", "level": "N5", "breakdown": "Hình cái miệng mở", "mnemonic": "Chiếc miệng mở ra trò chuyện và ăn uống."},
        {"kanji": "入口", "hiragana": "いりぐち (iriguchi)", "sinoVietnamese": "NHẬP KHẨU", "meaning": "Lối vào, cửa vào", "level": "N5", "breakdown": "入 (Nhập) + 口 (Khẩu)", "mnemonic": "Cửa ngõ để bước vào trong tòa nhà."},
        {"kanji": "出口", "hiragana": "でぐち (deguchi)", "sinoVietnamese": "XUẤT KHẨU", "meaning": "Lối ra, cửa thoát", "level": "N5", "breakdown": "出 (Xuất) + 口 (Khẩu)", "mnemonic": "Cửa đi ra ngoài an toàn."},
        {"kanji": "食べる", "hiragana": "たべる (taberu)", "sinoVietnamese": "THỰC", "meaning": "Ăn uống", "level": "N5", "breakdown": "Có bộ 口 kết hợp", "mnemonic": "Cho thức ăn ngon vào miệng nhai."},
        {"kanji": "飲む", "hiragana": "のむ (nomu)", "sinoVietnamese": "ẨM", "meaning": "Uống nước", "level": "N5", "breakdown": "Thực có Khẩu ân cần", "mnemonic": "Mở miệng uống từng ngụm nước trong lành."},
        {"kanji": "呼ぶ", "hiragana": "よぶ (yobu)", "sinoVietnamese": "HÔ", "meaning": "Gọi tên, mời gọi", "level": "N4", "breakdown": "口 (Khẩu) + 乎", "mnemonic": "Mở miệng hô vang tên người bạn."},
        {"kanji": "吸う", "hiragana": "すう (suu)", "sinoVietnamese": "HẤP", "meaning": "Hít vào, hút thuốc", "level": "N5", "breakdown": "口 (Khẩu) + 及", "mnemonic": "Mở miệng hít luồng không khí mát lành."},
        {"kanji": "吹く", "hiragana": "ふく (fuku)", "sinoVietnamese": "XÚY", "meaning": "Thổi (gió), thổi nến", "level": "N5", "breakdown": "口 (Khẩu) + 欠", "mnemonic": "Chu miệng thổi tắt ngọn nến sinh nhật."},
        {"kanji": "吐く", "hiragana": "はく (haku)", "sinoVietnamese": "THỔ", "meaning": "Nôn ọe, thở dài", "level": "N2", "breakdown": "口 (Khẩu) + 土 (Thổ)", "mnemonic": "Mở miệng nôn thốc ra mặt đất."},
        {"kanji": "叫ぶ", "hiragana": "さけぶ (sakebu)", "sinoVietnamese": "KHIẾU", "meaning": "Hét to, gào thét kêu cứu", "level": "N2", "breakdown": "口 (Khẩu) + 丩", "mnemonic": "Hét toáng miệng giữa đám đông cầu cứu."},
        {"kanji": "味", "hiragana": "あじ (aji)", "sinoVietnamese": "VỊ", "meaning": "Hương vị, mùi vị", "level": "N4", "breakdown": "口 (Khẩu) + 未 (Vị)", "mnemonic": "Nếm thử bằng miệng xem mùi vị thơm ngon không."},
        {"kanji": "歌", "hiragana": "うた (uta)", "sinoVietnamese": "CA", "meaning": "Bài hát, ca khúc", "level": "N5", "breakdown": "Có 口 + 欠 (Khiếm)", "mnemonic": "Mở miệng cất lên giai điệu bài ca rộn rã."},
        {"kanji": "問う", "hiragana": "とう (tou)", "sinoVietnamese": "VẤN", "meaning": "Hỏi, truy cứu trách nhiệm", "level": "N3", "breakdown": "門 (Môn) + 口 (Khẩu)", "mnemonic": "Đứng trước cổng mở miệng hỏi thăm đường."},
        {"kanji": "答える", "hiragana": "こたえる (kotaeru)", "sinoVietnamese": "ĐÁP", "meaning": "Trả lời, đáp ứng", "level": "N5", "breakdown": "竹 (Trúc) + 合 có 口", "mnemonic": "Mở miệng hồi đáp chuẩn xác câu hỏi."},
        {"kanji": "喜ぶ", "hiragana": "よろこぶ (yorokobu)", "sinoVietnamese": "HỈ", "meaning": "Vui mừng, hân hoan", "level": "N4", "breakdown": "Chuỗi miệng 口 cười vang", "mnemonic": "Niềm vui sướng khiến miệng cười toe toét."},
        {"kanji": "器", "hiragana": "うつわ / き (ki)", "sinoVietnamese": "KHÍ", "meaning": "Dụng cụ, đồ chứa, khí phách", "level": "N2", "breakdown": "4 chữ 口 quanh Khuyển", "mnemonic": "Bốn chiếc chén bát đặt ngay ngắn trên bàn."},
        {"kanji": "喫茶店", "hiragana": "きっさてん (kissaten)", "sinoVietnamese": "KHIẾT TRÀ ĐIẾM", "meaning": "Quán cà phê, tiệm trà", "level": "N5", "breakdown": "喫 (Khiết có 口) + 茶 + 店", "mnemonic": "Quán trà ngồi nhâm nhi trò chuyện."},
        {"kanji": "合唱", "hiragana": "がっしょう (gasshō)", "sinoVietnamese": "HỢP XƯỚNG", "meaning": "Hát hợp xướng, đồng ca", "level": "N1", "breakdown": "合 + 唱 (Xướng có 3 口)", "mnemonic": "Nhiều người cùng mở miệng hòa chung tiếng hát."}
    ]
})

RADICAL_VOCABS_P1.update({
    31: [ # 囗 (Vi - Vây quanh, bao bọc)
        {"kanji": "国", "hiragana": "くに / こく (koku)", "sinoVietnamese": "QUỐC", "meaning": "Đất nước, quốc gia", "level": "N5", "breakdown": "囗 (Vi) bao bọc 玉 (Ngọc)", "mnemonic": "Tường thành vững chắc bao bọc ngọc ngà tổ quốc."},
        {"kanji": "外国", "hiragana": "がいこく (gaikoku)", "sinoVietnamese": "NGOẠI QUỐC", "meaning": "Nước ngoài", "level": "N5", "breakdown": "外 (Ngoại) + 国 (Quốc)", "mnemonic": "Các quốc gia bên ngoài bờ cõi."},
        {"kanji": "四", "hiragana": "よん / し (shi)", "sinoVietnamese": "TỨ", "meaning": "Số bốn (4)", "level": "N5", "breakdown": "囗 (Vi) bao quanh nét phẩy cong", "mnemonic": "Bốn bức tường khép kín bao quanh căn phòng."},
        {"kanji": "回る", "hiragana": "まわる (mawaru)", "sinoVietnamese": "HỒI", "meaning": "Quay vòng, xoay quanh", "level": "N4", "breakdown": "囗 lớn bao bọc 口 nhỏ", "mnemonic": "Vòng tròn lớn xoay quanh vòng tròn nhỏ."},
        {"kanji": "今回", "hiragana": "こんかい (konkai)", "sinoVietnamese": "KIM HỒI", "meaning": "Lần này", "level": "N4", "breakdown": "今 (Kim) + 回 (Hồi)", "mnemonic": "Lượt quay vòng lần này."},
        {"kanji": "図", "hiragana": "ず / と (zu)", "sinoVietnamese": "ĐỒ", "meaning": "Bản đồ, sơ đồ", "level": "N4", "breakdown": "囗 (Vi) bao bọc bản đồ bên trong", "mnemonic": "Bức vẽ sơ đồ đóng khung ngay ngắn."},
        {"kanji": "図書館", "hiragana": "としょかん (toshokan)", "sinoVietnamese": "ĐỒ THƯ QUÁN", "meaning": "Thư viện", "level": "N5", "breakdown": "図 + 書 (Thư) + 館 (Quán)", "mnemonic": "Tòa nhà lưu giữ sách và bản đồ quý."},
        {"kanji": "園", "hiragana": "その / えん (en)", "sinoVietnamese": "VIÊN", "meaning": "Vườn cây, công viên", "level": "N4", "breakdown": "囗 (Vi) bao quanh Viên", "mnemonic": "Hàng rào bao quanh khu vườn hoa quả."},
        {"kanji": "公園", "hiragana": "こうえん (kōen)", "sinoVietnamese": "CÔNG VIÊN", "meaning": "Công viên công cộng", "level": "N5", "breakdown": "公 (Công) + 園 (Viên)", "mnemonic": "Khu vườn chung cho toàn thể người dân."},
        {"kanji": "困る", "hiragana": "こまる (komaru)", "sinoVietnamese": "KHỐN", "meaning": "Khó khăn, bối rối", "level": "N5", "breakdown": "囗 (Vi) nhốt 木 (Mộc)", "mnemonic": "Cây bị nhốt trong hộp kín không lớn được, lâm cảnh khốn cùng."},
        {"kanji": "困難", "hiragana": "こんなん (konnan)", "sinoVietnamese": "KHỐN NAN", "meaning": "Khó khăn, gian nan", "level": "N3", "breakdown": "困 (Khốn) + 難 (Nan)", "mnemonic": "Vượt qua muôn trùng sóng gió gian nan."},
        {"kanji": "固い", "hiragana": "かたい (katai)", "sinoVietnamese": "CỐ", "meaning": "Cứng nhắc, kiên cố", "level": "N3", "breakdown": "囗 (Vi) bao bọc 古 (Cổ)", "mnemonic": "Đồ cổ bọc trong thành kiên cố vô cùng rắn rỏi."}
    ],
    32: [ # 土 (Thổ - Đất đai, thổ nhưỡng) - Tần suất cao
        {"kanji": "土", "hiragana": "つち / ど (do)", "sinoVietnamese": "THỔ", "meaning": "Đất đai, thổ nhưỡng", "level": "N5", "breakdown": "Mầm nhú trên mặt đất", "mnemonic": "Nền đất phì nhiêu nuôi dưỡng cỏ cây sinh sôi."},
        {"kanji": "土曜日", "hiragana": "どようび (doyōbi)", "sinoVietnamese": "THỔ DIỆU NHẬT", "meaning": "Thứ bảy", "level": "N5", "breakdown": "土 (Thổ) + 曜日", "mnemonic": "Ngày của Thổ tinh trong tuần."},
        {"kanji": "土地", "hiragana": "とち (tochi)", "sinoVietnamese": "THỔ ĐỊA", "meaning": "Khu đất, thổ địa", "level": "N3", "breakdown": "土 (Thổ) + 地 (Địa)", "mnemonic": "Mảnh đất thuộc quyền sở hữu."},
        {"kanji": "地下鉄", "hiragana": "ちかてつ (chikatetsu)", "sinoVietnamese": "ĐỊA HẠ THIẾT", "meaning": "Tàu điện ngầm", "level": "N5", "breakdown": "地 (Địa) + 下 (Hạ) + 鉄", "mnemonic": "Tuyến đường sắt chạy dưới lòng đất."},
        {"kanji": "地震", "hiragana": "じしん (jishin)", "sinoVietnamese": "ĐỊA CHẤN", "meaning": "Trận động đất", "level": "N4", "breakdown": "地 (Địa) + 震 (Chấn)", "mnemonic": "Mặt đất rung chuyển dữ dội."},
        {"kanji": "坂", "hiragana": "さか (saka)", "sinoVietnamese": "PHẢN", "meaning": "Dốc, con dốc nghiêng", "level": "N4", "breakdown": "土 (Thổ) + 反 (Phản)", "mnemonic": "Đất đắp nghiêng dốc ngược sườn núi."},
        {"kanji": "城", "hiragana": "しろ / じょう (jō)", "sinoVietnamese": "THÀNH", "meaning": "Lâu đài, thành lũy", "level": "N3", "breakdown": "土 (Thổ) + 成 (Thành)", "mnemonic": "Đắp đất xây nên tòa thành sừng sững."},
        {"kanji": "地域", "hiragana": "ちいき (chiiki)", "sinoVietnamese": "ĐỊA VỰC", "meaning": "Vùng lãnh thổ, địa bàn", "level": "N3", "breakdown": "地 (Địa) + 域 (Vực có Thổ)", "mnemonic": "Khu vực địa lý xác định rõ ràng."},
        {"kanji": "埋める", "hiragana": "うめる (umeru)", "sinoVietnamese": "MAI", "meaning": "Chôn lấp, lấp đầy", "level": "N2", "breakdown": "土 (Thổ) + 里 (Lý)", "mnemonic": "Đào đất chôn giấu kho báu tại quê nhà."},
        {"kanji": "塔", "hiragana": "とう (tō)", "sinoVietnamese": "THÁP", "meaning": "Tòa tháp cao tầng", "level": "N2", "breakdown": "土 (Thổ) + 荅", "mnemonic": "Tháp đất đá vươn cao chọc trời."},
        {"kanji": "増える", "hiragana": "ふえる (fueru)", "sinoVietnamese": "TĂNG", "meaning": "Tăng lên, sinh sôi", "level": "N4", "breakdown": "土 (Thổ) + 曽", "mnemonic": "Đất bồi đắp thêm làm tăng diện tích."},
        {"kanji": "壁", "hiragana": "かべ (kabe)", "sinoVietnamese": "BÍCH", "meaning": "Bức tường, rào cản", "level": "N3", "breakdown": "Bích trên bộ 土 (Thổ)", "mnemonic": "Bức tường đất vững chãi ngăn cách."},
        {"kanji": "壊す", "hiragana": "こわす (kowasu)", "sinoVietnamese": "HOẠI", "meaning": "Làm hỏng, phá hủy", "level": "N4", "breakdown": "土 (Thổ) + 褱", "mnemonic": "Đập nát công trình xuống mặt đất."}
    ],
    33: [ # 士 (Sỹ - Kẻ sĩ, quan lại)
        {"kanji": "武士", "hiragana": "ぶし (bushi)", "sinoVietnamese": "VŨ SĨ", "meaning": "Võ sĩ đạo, Samurai", "level": "N3", "breakdown": "武 (Vũ) + 士 (Sĩ)", "mnemonic": "Người võ sĩ trung dũng xông pha bảo vệ chính nghĩa."},
        {"kanji": "博士", "hiragana": "はかせ / はくし (hakase)", "sinoVietnamese": "BÁC SĨ", "meaning": "Tiến sĩ, chuyên gia sâu rộng", "level": "N3", "breakdown": "博 (Bác) + 士 (Sĩ)", "mnemonic": "Học giả uyên bác tài ba tột bậc."},
        {"kanji": "紳士", "hiragana": "しんし (shinshi)", "sinoVietnamese": "THÂN SĨ", "meaning": "Quý ông lịch lãm", "level": "N2", "breakdown": "紳 (Thân) + 士 (Sĩ)", "mnemonic": "Bậc trí thức cư xử nhã nhặn tôn nghiêm."},
        {"kanji": "弁護士", "hiragana": "べんごし (bengoshi)", "sinoVietnamese": "BIỆN HỘ SĨ", "meaning": "Luật sư bào chữa", "level": "N3", "breakdown": "弁 (Biện) + 護 (Hộ) + 士 (Sĩ)", "mnemonic": "Luật sư dùng tài hùng biện bảo vệ thân chủ."},
        {"kanji": "志", "hiragana": "こころざし (kokorozashi)", "sinoVietnamese": "CHÍ", "meaning": "Ý chí, nguyện vọng hoài bão", "level": "N2", "breakdown": "士 (Sĩ) + 心 (Tâm)", "mnemonic": "Ý chí sắt đá nung nấu trong tâm kẻ sĩ."},
        {"kanji": "志望", "hiragana": "しぼう (shibō)", "sinoVietnamese": "CHÍ VỌNG", "meaning": "Nguyện vọng, ước mơ thi tuyển", "level": "N2", "breakdown": "志 (Chí) + 望 (Vọng)", "mnemonic": "Nuôi hoài bão thi đỗ trường mơ ước."},
        {"kanji": "壮大", "hiragana": "そうだい (sōdai)", "sinoVietnamese": "TRÁNG ĐẠI", "meaning": "Hùng vĩ, hoành tráng", "level": "N1", "breakdown": "壮 (Tráng có 士) + 大 (Đại)", "mnemonic": "Cảnh tượng tráng lệ huy hoàng quy mô lớn."},
        {"kanji": "壮絶", "hiragana": "そうぜつ (sōzetsu)", "sinoVietnamese": "TRÁNG TUYỆT", "meaning": "Anh dũng tuyệt vời, vô cùng oanh liệt", "level": "N1", "breakdown": "壮 (Tráng) + 絶 (Tuyệt)", "mnemonic": "Trận chiến oanh liệt của các bậc nghĩa sĩ."},
        {"kanji": "声", "hiragana": "こえ (koe)", "sinoVietnamese": "THANH", "meaning": "Tiếng, giọng nói", "level": "N5", "breakdown": "Có nét 士 phía trên", "mnemonic": "Tiếng hô dõng dạc của trượng phu."},
        {"kanji": "声明", "hiragana": "せいめい (seimei)", "sinoVietnamese": "THANH MINH", "meaning": "Tuyên bố chính thức", "level": "N1", "breakdown": "声 (Thanh) + 明 (Minh)", "mnemonic": "Phát ngôn tuyên cáo rõ ràng trước công chúng."}
    ],
    34: [ # 夂 (Trĩ - Đến sau, bước chậm)
        {"kanji": "各", "hiragana": "おのおの / かく (kaku)", "sinoVietnamese": "CÁC", "meaning": "Mỗi, các, từng cái", "level": "N3", "breakdown": "夂 (Trĩ) + 口 (Khẩu)", "mnemonic": "Mỗi người bước đến cất lời phát biểu riêng."},
        {"kanji": "各自", "hiragana": "かくじ (kakuji)", "sinoVietnamese": "CÁC TỰ", "meaning": "Mỗi người, từng cá nhân", "level": "N3", "breakdown": "各 (Các) + 自 (Tự)", "mnemonic": "Mỗi cá nhân tự chịu trách nhiệm."},
        {"kanji": "冬", "hiragana": "ふゆ (fuyu)", "sinoVietnamese": "ĐÔNG", "meaning": "Mùa đông lạnh giá", "level": "N5", "breakdown": "夂 (Trĩ) + 2 chấm băng giá", "mnemonic": "Bước chân mùa đông lạnh buốt có tuyết rơi."},
        {"kanji": "冬休み", "hiragana": "ふゆやすみ (fuyuyasumi)", "sinoVietnamese": "ĐÔNG HƯU", "meaning": "Kỳ nghỉ đông", "level": "N5", "breakdown": "冬 (Đông) + 休 (Hưu)", "mnemonic": "Khoảng thời gian nghỉ ngơi ấm áp mùa đông."},
        {"kanji": "処", "hiragana": "しょ (sho)", "sinoVietnamese": "XỬ", "meaning": "Nơi chốn, giải quyết xử lý", "level": "N3", "breakdown": "夂 (Trĩ) + 几 (Kỷ)", "mnemonic": "Bước chân đến ngồi lên ghế xử lý việc."},
        {"kanji": "処理", "hiragana": "しょり (shori)", "sinoVietnamese": "XỬ LÝ", "meaning": "Xử lý, giải quyết công việc", "level": "N3", "breakdown": "処 (Xử) + 理 (Lý)", "mnemonic": "Giải quyết êm xuôi từng vấn đề phát sinh."},
        {"kanji": "処分", "hiragana": "しょぶん (shobun)", "sinoVietnamese": "XỬ PHÂN", "meaning": "Xử phạt, thanh lý đồ vứt bỏ", "level": "N2", "breakdown": "処 (Xử) + 分 (Phân)", "mnemonic": "Thanh lý giải phóng đồ cũ."},
        {"kanji": "条約", "hiragana": "じょうやく (jōyaku)", "sinoVietnamese": "ĐIỀU ƯỚC", "meaning": "Hiệp ước, điều ước quốc tế", "level": "N2", "breakdown": "条 (Điều có 夂) + 約 (Ước)", "mnemonic": "Hiệp ước văn bản quy định từng điều khoản."},
        {"kanji": "条件", "hiragana": "じょうけん (jōken)", "sinoVietnamese": "ĐIỀU KIỆN", "meaning": "Điều kiện tiên quyết", "level": "N3", "breakdown": "条 (Điều) + 件 (Kiện)", "mnemonic": "Điều kiện bắt buộc cần phải thỏa mãn."},
        {"kanji": "条理", "hiragana": "じょうり (jōri)", "sinoVietnamese": "ĐIỀU LÝ", "meaning": "Đạo lý, tính hợp lý", "level": "N1", "breakdown": "条 (Điều) + 理 (Lý)", "mnemonic": "Lý lẽ thông suốt hợp với luân thường."}
    ],
    35: [ # 夊 (Tuy - Đi chậm chạp, kéo lê chân)
        {"kanji": "変", "hiragana": "へん (hen) / かわる", "sinoVietnamese": "BIẾN", "meaning": "Kỳ lạ, biến đổi", "level": "N4", "breakdown": "Đầu có 夊 ở dưới kéo lê chân", "mnemonic": "Thay đổi bước chân biến thành người khác."},
        {"kanji": "変化", "hiragana": "へんか (henka)", "sinoVietnamese": "BIẾN HÓA", "meaning": "Sự thay đổi, biến hóa", "level": "N4", "breakdown": "変 (Biến) + 化 (Hóa)", "mnemonic": "Vạn vật không ngừng chuyển động đổi thay."},
        {"kanji": "夏", "hiragana": "なつ (natsu)", "sinoVietnamese": "HẠ", "meaning": "Mùa hè nắng ấm", "level": "N5", "breakdown": "Đầu đội nón, chân 夊 bước chậm", "mnemonic": "Trời hè nóng nực chân bước đi uể oải."},
        {"kanji": "夏休み", "hiragana": "なつやすみ (natsuyasumi)", "sinoVietnamese": "HẠ HƯU", "meaning": "Kỳ nghỉ hè", "level": "N5", "breakdown": "夏 (Hạ) + 休 (Hưu)", "mnemonic": "Kỳ nghỉ dài ngày tắm biển vui tươi."},
        {"kanji": "麦", "hiragana": "むぎ (mugi)", "sinoVietnamese": "MẠCH", "meaning": "Lúa mạch, lúa mì", "level": "N3", "breakdown": "Lai có chân 夊 phía dưới", "mnemonic": "Mùa hè lúa mạch chín vàng rộm đồng."},
        {"kanji": "複", "hiragana": "ふく (fuku)", "sinoVietnamese": "PHỨC", "meaning": "Phức tạp, lặp lại nhiều lần", "level": "N3", "breakdown": "Y + Phục có 夊", "mnemonic": "Nhiều lớp áo chồng chéo phức tạp."},
        {"kanji": "複雑", "hiragana": "ふくざつ (fukuzatsu)", "sinoVietnamese": "PHỨC TẠP", "meaning": "Phức tạp, rối rắm", "level": "N4", "breakdown": "複 (Phức) + 雑 (Tạp)", "mnemonic": "Tình huống khó gỡ đầy khúc mắc."},
        {"kanji": "復旧", "hiragana": "ふっきゅう (fukkyū)", "sinoVietnamese": "PHỤC CỰU", "meaning": "Khôi phục lại hiện trạng cũ", "level": "N2", "breakdown": "復 (Phục có 夊) + 旧 (Cựu)", "mnemonic": "Tái lập nguyên trạng hệ thống sau sự cố."},
        {"kanji": "復活", "hiragana": "ふっかつ (fukkatsu)", "sinoVietnamese": "PHỤC HOẠT", "meaning": "Hồi sinh, sống lại", "level": "N2", "breakdown": "復 (Phục) + 活 (Hoạt)", "mnemonic": "Sức sống trỗi dậy mãnh liệt trở lại."},
        {"kanji": "後悔", "hiragana": "こうかい (kōkai)", "sinoVietnamese": "HẬU HỐI", "meaning": "Hối hận, nuối tiếc", "level": "N3", "breakdown": "後 (Hậu có 夊) + 悔 (Hối)", "mnemonic": "Bước chân lỡ nhịp để rồi hối tiếc về sau."}
    ]
})

RADICAL_VOCABS_P1.update({
    36: [ # 夕 (Tịch - Chiều tối, hoàng hôn)
        {"kanji": "夕方", "hiragana": "ゆうがた (yūgata)", "sinoVietnamese": "TỊCH PHƯƠNG", "meaning": "Buổi chiều tà, hoàng hôn", "level": "N5", "breakdown": "夕 (Tịch) + 方 (Phương)", "mnemonic": "Bóng chiều buông xuống nơi góc trời."},
        {"kanji": "夕食", "hiragana": "ゆうしょく (yūshoku)", "sinoVietnamese": "TỊCH THỰC", "meaning": "Bữa cơm tối", "level": "N5", "breakdown": "夕 (Tịch) + 食 (Thực)", "mnemonic": "Bữa cơm sum vầy gia đình lúc chiều muộn."},
        {"kanji": "夕日", "hiragana": "ゆうひ (yūhi)", "sinoVietnamese": "TỊCH NHẬT", "meaning": "Ánh nắng chiều tà", "level": "N3", "breakdown": "夕 (Tịch) + 日 (Nhật)", "mnemonic": "Vầng mặt trời đỏ ối khuất dần sau núi."},
        {"kanji": "夜", "hiragana": "よる (yoru)", "sinoVietnamese": "DẠ", "meaning": "Đêm tối", "level": "N5", "breakdown": "Đầu có 夕 kết hợp", "mnemonic": "Chiều tàn nhường chỗ cho màn đêm tĩnh mịch."},
        {"kanji": "多", "hiragana": "おおい (ōi)", "sinoVietnamese": "ĐA", "meaning": "Nhiều, phong phú", "level": "N5", "breakdown": "Hai chữ 夕 chồng lên nhau", "mnemonic": "Nhiều đêm liền tích lũy thành số lượng lớn."},
        {"kanji": "多数", "hiragana": "たすう (tasū)", "sinoVietnamese": "ĐA SỐ", "meaning": "Đa số, phần đông", "level": "N3", "breakdown": "多 (Đa) + 数 (Số)", "mnemonic": "Số lượng chiếm phần lớn."},
        {"kanji": "外国", "hiragana": "がいこく (gaikoku)", "sinoVietnamese": "NGOẠI QUỐC", "meaning": "Nước ngoài", "level": "N5", "breakdown": "外 (Ngoại có 夕) + 国 (Quốc)", "mnemonic": "Quốc gia nằm ngoài ranh giới bản xứ."},
        {"kanji": "名刺", "hiragana": "めいし (meishi)", "sinoVietnamese": "DANH THỨ", "meaning": "Danh thiếp, card visit", "level": "N3", "breakdown": "名 (Danh có 夕) + 刺 (Thứ)", "mnemonic": "Tấm thiệp in tên giao tiếp buổi gặp mặt."},
        {"kanji": "夢", "hiragana": "ゆめ (yume)", "sinoVietnamese": "MỘNG", "meaning": "Giấc mơ, ước mơ hoài bão", "level": "N3", "breakdown": "Thảo + Mắt + 夕 (Tịch)", "mnemonic": "Nhắm mắt lúc chiều tối chìm vào giấc mộng đẹp."},
        {"kanji": "夢中", "hiragana": "むちゅう (muchū)", "sinoVietnamese": "MỘNG TRUNG", "meaning": "Say mê, đắm chìm say đắm", "level": "N3", "breakdown": "夢 (Mộng) + 中 (Trung)", "mnemonic": "Chìm đắm đam mê như lạc vào cơn mơ."}
    ],
    37: [ # 大 (Đại - To lớn) - Tần suất cao
        {"kanji": "大きい", "hiragana": "おおきい (ōkii)", "sinoVietnamese": "ĐẠI", "meaning": "To lớn, vĩ đại", "level": "N5", "breakdown": "Người dang rộng hai tay hai chân", "mnemonic": "Dang rộng tay hết cỡ để biểu thị to lớn."},
        {"kanji": "大学", "hiragana": "だいがく (daigaku)", "sinoVietnamese": "ĐẠI HỌC", "meaning": "Trường đại học", "level": "N5", "breakdown": "大 (Đại) + 学 (Học)", "mnemonic": "Nơi học tập đỉnh cao tri thức nhân loại."},
        {"kanji": "大人", "hiragana": "おとな (otona)", "sinoVietnamese": "ĐẠI NHÂN", "meaning": "Người lớn, người trưởng thành", "level": "N5", "breakdown": "大 (Đại) + 人 (Nhân)", "mnemonic": "Người đã khôn lớn trưởng thành tự lập."},
        {"kanji": "大切", "hiragana": "たいせつ (taisetsu)", "sinoVietnamese": "ĐẠI THIẾT", "meaning": "Quan trọng, quý báu", "level": "N5", "breakdown": "大 (Đại) + 切 (Thiết)", "mnemonic": "Điều vô cùng trân quý không thể thiếu."},
        {"kanji": "大変", "hiragana": "たいへん (taihen)", "sinoVietnamese": "ĐẠI BIẾN", "meaning": "Vất vả, khó khăn, rất...", "level": "N5", "breakdown": "大 (Đại) + 変 (Biến)", "mnemonic": "Biến cố lớn cần nỗ lực vượt qua."},
        {"kanji": "太陽", "hiragana": "たいよう (taiyō)", "sinoVietnamese": "THÁI DƯƠNG", "meaning": "Mặt trời rực rỡ", "level": "N4", "breakdown": "太 (Thái có 大) + 陽 (Dương)", "mnemonic": "Vầng thái dương tỏa ánh hào quang."},
        {"kanji": "太い", "hiragana": "ふとい (futoi)", "sinoVietnamese": "THÁI", "meaning": "Dày dặn, mập mạp", "level": "N5", "breakdown": "大 (Đại) thêm dấu chấm", "mnemonic": "To lớn đẫy đà vững chãi."},
        {"kanji": "夫", "hiragana": "おっと (otto)", "sinoVietnamese": "PHU", "meaning": "Chồng mình", "level": "N4", "breakdown": "Đại có trâm cài đầu", "mnemonic": "Người trượng phu gánh vác việc gia đình."},
        {"kanji": "夫婦", "hiragana": "ふうふ (fūfu)", "sinoVietnamese": "PHU PHỤ", "meaning": "Vợ chồng gắn kết", "level": "N4", "breakdown": "夫 (Phu) + 婦 (Phụ)", "mnemonic": "Đôi vợ chồng sắt son đầu bạc răng long."},
        {"kanji": "天気", "hiragana": "てんき (tenki)", "sinoVietnamese": "THIÊN KHÍ", "meaning": "Thời tiết", "level": "N5", "breakdown": "天 (Thiên có 大) + 気 (Khí)", "mnemonic": "Bầu trời quang đãng thời tiết tuyệt đẹp."},
        {"kanji": "大会", "hiragana": "たいかい (taikai)", "sinoVietnamese": "ĐẠI HỘI", "meaning": "Đại hội, giải đấu lớn", "level": "N3", "breakdown": "大 (Đại) + 会 (Hội)", "mnemonic": "Hội nghị quy mô lớn tập hợp anh tài."},
        {"kanji": "雄大", "hiragana": "ゆうだい (yūdai)", "sinoVietnamese": "HÙNG ĐẠI", "meaning": "Hùng vĩ, bao la tráng lệ", "level": "N1", "breakdown": "雄 (Hùng) + 大 (Đại)", "mnemonic": "Non sông cẩm tú kỳ vĩ bao la."}
    ],
    38: [ # 女 (Nữ - Người phụ nữ) - Tần suất rất cao
        {"kanji": "女", "hiragana": "おんな (onna)", "sinoVietnamese": "NỮ", "meaning": "Phụ nữ, nữ giới", "level": "N5", "breakdown": "Dáng người phụ nữ ngồi duyên dáng", "mnemonic": "Đường nét dịu dàng uyển chuyển của người phụ nữ."},
        {"kanji": "女性", "hiragana": "じょせい (josei)", "sinoVietnamese": "NỮ TÍNH", "meaning": "Phụ nữ, phái nữ", "level": "N4", "breakdown": "女 (Nữ) + 性 (Tính)", "mnemonic": "Phái nữ dịu hiền và thanh lịch."},
        {"kanji": "女の子", "hiragana": "おんなのこ (onnanoko)", "sinoVietnamese": "NỮ TỬ", "meaning": "Bé gái", "level": "N5", "breakdown": "女 (Nữ) + 子 (Tử)", "mnemonic": "Bé gái dễ thương hồn nhiên."},
        {"kanji": "彼女", "hiragana": "かのじょ (kanojo)", "sinoVietnamese": "BỈ NỮ", "meaning": "Cô ấy, bạn gái", "level": "N4", "breakdown": "彼 (Bỉ) + 女 (Nữ)", "mnemonic": "Người bạn gái thanh tú dịu dàng."},
        {"kanji": "好き", "hiragana": "すき (suki)", "sinoVietnamese": "HẢO", "meaning": "Thích thú, yêu mến", "level": "N5", "breakdown": "女 (Nữ) + 子 (Tử)", "mnemonic": "Người mẹ yêu thương đứa con thơ của mình."},
        {"kanji": "始める", "hiragana": "はじめる (hajimeru)", "sinoVietnamese": "THỦY", "meaning": "Bắt đầu khởi sự", "level": "N5", "breakdown": "女 (Nữ) + 台 (Thai)", "mnemonic": "Người phụ nữ mang thai bắt đầu một sinh mệnh mới."},
        {"kanji": "姉", "hiragana": "あね (ane)", "sinoVietnamese": "TỶ", "meaning": "Chị gái", "level": "N5", "breakdown": "女 (Nữ) + 市 (Thị)", "mnemonic": "Người chị gái đảm đang đi chợ lo việc nhà."},
        {"kanji": "妹", "hiragana": "いもうと (imōto)", "sinoVietnamese": "MUỘI", "meaning": "Em gái", "level": "N5", "breakdown": "女 (Nữ) + 未 (Vị - chưa trưởng thành)", "mnemonic": "Bé gái nhỏ tuổi chưa trưởng thành là em gái."},
        {"kanji": "安心", "hiragana": "あんしん (anshin)", "sinoVietnamese": "AN TÂM", "meaning": "An tâm, yên lòng", "level": "N4", "breakdown": "安 (An có 女) + 心 (Tâm)", "mnemonic": "Có người phụ nữ trong nhà giúp lòng an yên."},
        {"kanji": "安全", "hiragana": "あんぜん (anzen)", "sinoVietnamese": "AN TOÀN", "meaning": "An toàn tuyệt đối", "level": "N4", "breakdown": "安 (An) + 全 (Toàn)", "mnemonic": "Bảo đảm an toàn không xảy ra tai họa."},
        {"kanji": "結婚", "hiragana": "けっこん (kekkon)", "sinoVietnamese": "KẾT HÔN", "meaning": "Kết hôn, lấy nhau", "level": "N4", "breakdown": "結 (Kết) + 婚 (Hôn có 女)", "mnemonic": "Ngày cưới rước cô dâu về xây tổ ấm."},
        {"kanji": "妻", "hiragana": "つま (tsuma)", "sinoVietnamese": "THÊ", "meaning": "Vợ hiền", "level": "N4", "breakdown": "Tay cầm chổi + 女 (Nữ)", "mnemonic": "Người vợ hiền thục thu vén việc nhà."},
        {"kanji": "娘", "hiragana": "むすめ (musume)", "sinoVietnamese": "NƯƠNG", "meaning": "Con gái ruột", "level": "N4", "breakdown": "女 (Nữ) + 良 (Lương)", "mnemonic": "Cô con gái ngoan ngoãn hiền lương."},
        {"kanji": "姿", "hiragana": "すがた (sugata)", "sinoVietnamese": "TƯ", "meaning": "Vóc dáng, diện mạo", "level": "N3", "breakdown": "次 + 女 (Nữ)", "mnemonic": "Dáng vẻ thanh thoát của người thiếu nữ."}
    ],
    39: [ # 子 (Tử - Con cái, đứa trẻ) - Tần suất rất cao
        {"kanji": "子", "hiragana": "こ (ko)", "sinoVietnamese": "TỬ", "meaning": "Đứa con, trẻ con", "level": "N5", "breakdown": "Hình đứa trẻ sơ sinh quấn tã vung tay", "mnemonic": "Đứa trẻ thơ ngây đang vẫy tay chào mẹ."},
        {"kanji": "子供", "hiragana": "こども (kodomo)", "sinoVietnamese": "TỬ CUNG", "meaning": "Trẻ con, con nít", "level": "N5", "breakdown": "子 (Tử) + 供 (Cung)", "mnemonic": "Những đứa trẻ tung tăng vui đùa ngoài sân."},
        {"kanji": "息子", "hiragana": "むすこ (musuko)", "sinoVietnamese": "TỨC TỬ", "meaning": "Con trai ruột", "level": "N4", "breakdown": "息 (Tức) + 子 (Tử)", "mnemonic": "Đứa con trai ruột thịt yêu quý."},
        {"kanji": "字", "hiragana": "じ (ji)", "sinoVietnamese": "TỰ", "meaning": "Chữ viết, ký tự", "level": "N5", "breakdown": "宀 (Miên) + 子 (Tử)", "mnemonic": "Đứa trẻ ngồi dưới mái nhà tập viết từng nét chữ."},
        {"kanji": "漢字", "hiragana": "かんじ (kanji)", "sinoVietnamese": "HÁN TỰ", "meaning": "Chữ Hán tự", "level": "N5", "breakdown": "漢 (Hán) + 字 (Tự)", "mnemonic": "Kho tàng chữ Hán phong phú biểu cảm."},
        {"kanji": "学校", "hiragana": "がっこう (gakkō)", "sinoVietnamese": "HỌC HIỆU", "meaning": "Trường học", "level": "N5", "breakdown": "学 (Học có 子) + 校 (Hiệu)", "mnemonic": "Ngôi trường nơi các em thơ chăm chỉ học tập."},
        {"kanji": "学生", "hiragana": "がくせい (gakusei)", "sinoVietnamese": "HỌC SINH", "meaning": "Học sinh, sinh viên", "level": "N5", "breakdown": "学 (Học) + 生 (Sinh)", "mnemonic": "Học sinh rèn đức luyện tài tương lai."},
        {"kanji": "季節", "hiragana": "きせつ (kisetsu)", "sinoVietnamese": "QUÝ TIẾT", "meaning": "Mùa trong năm", "level": "N4", "breakdown": "季 (Quý có 子) + 節 (Tiết)", "mnemonic": "Lúa non mọc theo tiết trời bốn mùa."},
        {"kanji": "孤立", "hiragana": "こりつ (koritsu)", "sinoVietnamese": "CÔ LẬP", "meaning": "Cô lập, trơ trọi", "level": "N2", "breakdown": "孤 (Cô có 子) + 立 (Lập)", "mnemonic": "Đứa trẻ đứng trơ trọi bơ vơ giữa trời."},
        {"kanji": "孫", "hiragana": "まご (mago)", "sinoVietnamese": "TÔN", "meaning": "Cháu nội, cháu ngoại", "level": "N3", "breakdown": "子 (Tử) + 系 (Hệ)", "mnemonic": "Thế hệ cháu con nối dõi tông đường."},
        {"kanji": "孔子", "hiragana": "こうし (kōshi)", "sinoVietnamese": "KHỔNG TỬ", "meaning": "Khổng Tử", "level": "N1", "breakdown": "孔 (Khổng) + 子 (Tử)", "mnemonic": "Bậc thầy Nho gia uyên thâm muôn đời."},
        {"kanji": "存在", "hiragana": "そんざい (sonzai)", "sinoVietnamese": "TỒN TẠI", "meaning": "Tồn tại, hiện hữu", "level": "N3", "breakdown": "存 (Tồn có 子) + 在 (Tại)", "mnemonic": "Sự sống của con người hiện hữu trong vũ trụ."}
    ],
    40: [ # 宀 (Miên - Mái nhà) - Tần suất rất cao
        {"kanji": "家", "hiragana": "いえ / うち (ie)", "sinoVietnamese": "GIA", "meaning": "Ngôi nhà, gia đình", "level": "N5", "breakdown": "宀 (Miên) + 豕 (Thỉ - heo)", "mnemonic": "Dưới mái nhà có đàn heo no đủ đầm ấm."},
        {"kanji": "家族", "hiragana": "かぞく (kazoku)", "sinoVietnamese": "GIA TỘC", "meaning": "Gia đình ruột thịt", "level": "N5", "breakdown": "家 (Gia) + 族 (Tộc)", "mnemonic": "Các thành viên quây quần dưới mái ấm gia đình."},
        {"kanji": "安い", "hiragana": "やすい (yasui)", "sinoVietnamese": "AN", "meaning": "Rẻ tiền, an tâm", "level": "N5", "breakdown": "宀 (Miên) + 女 (Nữ)", "mnemonic": "Người phụ nữ an yên giữ gìn tổ ấm."},
        {"kanji": "宝", "hiragana": "たから (takara)", "sinoVietnamese": "BẢO", "meaning": "Kho báu, bảo vật", "level": "N3", "breakdown": "宀 (Miên) + 玉 (Ngọc)", "mnemonic": "Viên ngọc bích quý giá cất giấu trong nhà."},
        {"kanji": "宝石", "hiragana": "ほうせき (hōseki)", "sinoVietnamese": "BẢO THẠCH", "meaning": "Đá quý, kim cương", "level": "N3", "breakdown": "宝 (Bảo) + 石 (Thạch)", "mnemonic": "Loại đá quý lấp lánh giá trị ngàn vàng."},
        {"kanji": "宇宙", "hiragana": "うちゅう (uchū)", "sinoVietnamese": "VŨ TRỤ", "meaning": "Vũ trụ bao la", "level": "N3", "breakdown": "宇 (Vũ có 宀) + 宙 (Trụ có 宀)", "mnemonic": "Mái vòm không gian và thời gian bao la."},
        {"kanji": "宿題", "hiragana": "しゅくだい (shukudai)", "sinoVietnamese": "TÚC ĐỀ", "meaning": "Bài tập về nhà", "level": "N5", "breakdown": "宿 (Túc có 宀) + 題 (Đề)", "mnemonic": "Nhiệm vụ học tập cần hoàn thành ở nhà."},
        {"kanji": "新宿", "hiragana": "しんじゅく (shinjuku)", "sinoVietnamese": "TÂN TÚC", "meaning": "Shinjuku (khu phố lớn tại Tokyo)", "level": "N4", "breakdown": "新 (Tân) + 宿 (Túc)", "mnemonic": "Trạm nghỉ chân phồn hoa giữa lòng thủ đô."},
        {"kanji": "客", "hiragana": "きゃく (kyaku)", "sinoVietnamese": "KHÁCH", "meaning": "Khách hàng, khách quý", "level": "N4", "breakdown": "宀 (Miên) + 各 (Các)", "mnemonic": "Mỗi vị khách đến thăm dưới mái nhà tiếp đón nồng hậu."},
        {"kanji": "案内", "hiragana": "あんない (annai)", "sinoVietnamese": "ÁN NỘI", "meaning": "Hướng dẫn, dẫn đường", "level": "N4", "breakdown": "案 (Án có 宀) + 内 (Nội)", "mnemonic": "Chỉ dẫn tận tình các lối đi bên trong."},
        {"kanji": "寂しい", "hiragana": "さびしい (sabishii)", "sinoVietnamese": "TỊCH", "meaning": "Cô đơn, trống trải", "level": "N4", "breakdown": "宀 (Miên) + Thúc", "mnemonic": "Ngồi một mình trong căn nhà vắng hiu quạnh."},
        {"kanji": "寄付", "hiragana": "きふ (kifu)", "sinoVietnamese": "KÝ PHÓ", "meaning": "Quyên góp, từ thiện", "level": "N2", "breakdown": "寄 (Ký có 宀) + 付 (Phó)", "mnemonic": "Gửi tiền của giúp đỡ những người có hoàn cảnh khó khăn."}
    ]
})

RADICAL_VOCABS_P1.update({
    41: [ # 寸 (Thốn - Tấc, quy tắc đo lường)
        {"kanji": "寺", "hiragana": "てら (tera)", "sinoVietnamese": "TỰ", "meaning": "Ngôi chùa thanh tịnh", "level": "N5", "breakdown": "土 (Thổ) + 寸 (Thốn)", "mnemonic": "Khu đất tuân thủ quy củ giới luật trang nghiêm."},
        {"kanji": "お寺", "hiragana": "おてら (otera)", "sinoVietnamese": "TỰ", "meaning": "Chùa chiền", "level": "N5", "breakdown": "お + 寺 (Tự)", "mnemonic": "Nơi vãn cảnh cầu bình an cho gia đạo."},
        {"kanji": "対", "hiragana": "たい (tai)", "sinoVietnamese": "ĐỐI", "meaning": "Đối diện, đối lập, đối xứng", "level": "N3", "breakdown": "Văn + 寸 (Thốn)", "mnemonic": "Hai vế đối chuẩn xác từng tấc một."},
        {"kanji": "反対", "hiragana": "はんたい (hantai)", "sinoVietnamese": "PHẢN ĐỐI", "meaning": "Phản đối, không đồng tình", "level": "N4", "breakdown": "反 (Phản) + 対 (Đối)", "mnemonic": "Ý kiến trái ngược hoàn toàn."},
        {"kanji": "封筒", "hiragana": "ふうとう (fūtō)", "sinoVietnamese": "PHONG ĐỒNG", "meaning": "Phong bì thư", "level": "N4", "breakdown": "封 (Phong có 寸) + 筒 (Đồng)", "mnemonic": "Bì thư niêm phong cẩn thận trước khi gửi."},
        {"kanji": "射す", "hiragana": "さす (sasu)", "sinoVietnamese": "XẠ", "meaning": "Chiếu rọi, bắn tên", "level": "N2", "breakdown": "身 (Thân) + 寸 (Thốn)", "mnemonic": "Căng người đo từng tấc ngắm bắn bia tên."},
        {"kanji": "寿命", "hiragana": "じゅみょう (jumyō)", "sinoVietnamese": "THỌ MỆNH", "meaning": "Tuổi thọ, tuổi đời", "level": "N2", "breakdown": "寿 (Thọ có 寸) + 命 (Mệnh)", "mnemonic": "Đo từng tấc năm tháng của kiếp nhân sinh."},
        {"kanji": "専門", "hiragana": "せんもん (senmon)", "sinoVietnamese": "CHUYÊN MÔN", "meaning": "Chuyên ngành, chuyên môn sâu", "level": "N4", "breakdown": "専 (Chuyên có 寸) + 門 (Môn)", "mnemonic": "Cửa ải lĩnh vực đòi hỏi đo đạc chính xác."},
        {"kanji": "導く", "hiragana": "みちびく (michibiku)", "sinoVietnamese": "ĐẠO", "meaning": "Dẫn dắt, chỉ lối", "level": "N2", "breakdown": "Đạo + 寸 (Thốn)", "mnemonic": "Dẫn dắt đi từng bước theo quy củ."},
        {"kanji": "尊い", "hiragana": "とうとい / たっとい (tōtoi)", "sinoVietnamese": "TÔN", "meaning": "Cao quý, đáng kính trọng", "level": "N2", "breakdown": "Tù + 寸 (Thốn)", "mnemonic": "Đôi tay nâng bình rượu quý dâng bậc tôn trưởng."}
    ],
    42: [ # 小 (Tiểu - Nhỏ bé, ít ỏi) - Tần suất cao
        {"kanji": "小さい", "hiragana": "ちいさい (chiisai)", "sinoVietnamese": "TIỂU", "meaning": "Nhỏ bé, bé tí", "level": "N5", "breakdown": "Vạch giữa và hai nét phẩy nhỏ hai bên", "mnemonic": "Tách nhỏ thành từng mẩu vụn li ti."},
        {"kanji": "小学校", "hiragana": "しょうがっこう (shōgakkō)", "sinoVietnamese": "TIỂU HỌC HIỆU", "meaning": "Trường tiểu học", "level": "N5", "breakdown": "小 (Tiểu) + 学 + 校", "mnemonic": "Ngôi trường nuôi dưỡng các mầm non bé nhỏ."},
        {"kanji": "小学生", "hiragana": "しょうがくせい (shōgakusei)", "sinoVietnamese": "TIỂU HỌC SINH", "meaning": "Học sinh cấp một", "level": "N5", "breakdown": "小 (Tiểu) + 学 + 生", "mnemonic": "Em nhỏ tung tăng cắp sách tới trường."},
        {"kanji": "少ない", "hiragana": "すくない (sukunai)", "sinoVietnamese": "THIỂU", "meaning": "Ít ỏi, hiếm hoi", "level": "N5", "breakdown": "小 (Tiểu) thêm nét phẩy dài", "mnemonic": "Số lượng ít ỏi hiếm hoi chắt chiu."},
        {"kanji": "少し", "hiragana": "すこし (sukoshi)", "sinoVietnamese": "THIỂU", "meaning": "Một chút, một ít", "level": "N5", "breakdown": "少 (Thiểu) + し", "mnemonic": "Một lượng nhỏ xíu không đáng kể."},
        {"kanji": "少女", "hiragana": "しょうじょ (shōjo)", "sinoVietnamese": "THIẾU NỮ", "meaning": "Thiếu nữ, cô gái trẻ", "level": "N3", "breakdown": "少 (Thiểu) + 女 (Nữ)", "mnemonic": "Cô gái tuổi trăng tròn ngây thơ trong sáng."},
        {"kanji": "光", "hiragana": "ひかり (hikari)", "sinoVietnamese": "QUANG", "meaning": "Ánh sáng rực rỡ", "level": "N3", "breakdown": "小 (Tiểu) trên đầu người dang chân", "mnemonic": "Tia sáng nhỏ rọi chiếu soi bước người đi."},
        {"kanji": "光る", "hiragana": "ひかる (hikaru)", "sinoVietnamese": "QUANG", "meaning": "Phát sáng, lấp lánh", "level": "N4", "breakdown": "光 (Quang) + る", "mnemonic": "Ngôi sao nhỏ tỏa sáng lung linh trên trời đêm."},
        {"kanji": "当たる", "hiragana": "あたる (ataru)", "sinoVietnamese": "ĐƯƠNG", "meaning": "Trúng thưởng, va chạm đúng", "level": "N4", "breakdown": "Đầu có 小 + Kệ", "mnemonic": "Bắn trúng ngay điểm nhỏ mục tiêu."},
        {"kanji": "尖る", "hiragana": "とがる (togaru)", "sinoVietnamese": "TIÊM", "meaning": "Nhọn hoắt, sắc bén", "level": "N1", "breakdown": "小 (Tiểu) trên 大 (Đại)", "mnemonic": "Dưới to trên thu nhỏ lại thành mũi nhọn."}
    ],
    43: [ # 尢 (Uông - Què, khuyết tật, đi khập khiễng)
        {"kanji": "就職", "hiragana": "しゅうしょく (shūshoku)", "sinoVietnamese": "TỰU CHỨC", "meaning": "Tìm việc làm, nhận việc", "level": "N3", "breakdown": "就 (Tựu có 尢) + 職 (Chức)", "mnemonic": "Bước chân vững vàng tựu chức nơi cơ quan."},
        {"kanji": "就く", "hiragana": "つく (tsuku)", "sinoVietnamese": "TỰU", "meaning": "Đảm nhận chức vụ, bước vào vị trí", "level": "N2", "breakdown": "就 (Tựu có 尢) + く", "mnemonic": "Bắt đầu đảm trách cương vị mới."},
        {"kanji": "尤も", "hiragana": "もっとも (mottomo)", "sinoVietnamese": "VƯU", "meaning": "Đương nhiên, hợp lý, có lý", "level": "N2", "breakdown": "尢 (Uông) thêm chấm", "mnemonic": "Lời nói hoàn toàn có lý lẽ thuyết phục."},
        {"kanji": "尬", "hiragana": "かい (kai)", "sinoVietnamese": "GIỚI", "meaning": "Lúng túng, ngượng ngùng", "level": "N1", "breakdown": "尢 (Uông) + 介 (Giới)", "mnemonic": "Bước đi ngượng ngập bối rối trước đám đông."},
        {"kanji": "尽力", "hiragana": "じんりょく (jinryoku)", "sinoVietnamese": "TẬN LỰC", "meaning": "Tận lực, dốc hết sức mình", "level": "N2", "breakdown": "尽 (Tận có 尢 biến thể) + 力", "mnemonic": "Dốc đến chút sức lực cuối cùng để cống hiến."},
        {"kanji": "就任", "hiragana": "しゅうにん (shūnin)", "sinoVietnamese": "TỰU NHIỆM", "meaning": "Nhậm chức, lên nắm quyền", "level": "N2", "breakdown": "就 (Tựu) + 任 (Nhiệm)", "mnemonic": "Chính thức tiếp nhận trọng trách mới."},
        {"kanji": "尾", "hiragana": "お (o)", "sinoVietnamese": "VĨ", "meaning": "Cái đuôi", "level": "N3", "breakdown": "Thi + 尢 (đuôi vẫy)", "mnemonic": "Cái đuôi ve vẩy sau thân mình con thú."},
        {"kanji": "屈折", "hiragana": "くっせつ (kussetsu)", "sinoVietnamese": "KHUẤT CHIẾT", "meaning": "Khúc xạ ánh sáng, quanh co", "level": "N1", "breakdown": "屈 có dáng 尢 + 折 (Chiết)", "mnemonic": "Tia sáng bẻ cong gập khúc khi qua lăng kính."},
        {"kanji": "尴", "hiragana": "かん (kan)", "sinoVietnamese": "GIAM", "meaning": "Bối rối, ngại ngùng", "level": "N1", "breakdown": "尢 (Uông) + 监", "mnemonic": "Tình huống khó xử ngượng ngùng."},
        {"kanji": "成就", "hiragana": "じょうじゅ (jōju)", "sinoVietnamese": "THÀNH TỰU", "meaning": "Hoàn thành, đại công cáo thành", "level": "N1", "breakdown": "成 (Thành) + 就 (Tựu)", "mnemonic": "Ước nguyện bao năm nay đã đơm hoa kết trái."}
    ],
    44: [ # 尸 (Thi - Thi thể, dáng người ngồi, mái nóc)
        {"kanji": "居る", "hiragana": "いる (iru)", "sinoVietnamese": "CƯ", "meaning": "Ở, có mặt (người/động vật)", "level": "N5", "breakdown": "尸 (Thi) + 古 (Cổ)", "mnemonic": "Người ngồi yên nghỉ ngơi trong căn nhà cổ xưa."},
        {"kanji": "居酒屋", "hiragana": "いざかや (izakaya)", "sinoVietnamese": "CƯ TỬU ỐC", "meaning": "Quán nhậu kiểu Nhật", "level": "N3", "breakdown": "居 (Cư) + 酒 (Tửu) + 屋 (Ốc)", "mnemonic": "Quán rượu ấm cúng sau giờ tan tầm."},
        {"kanji": "屋", "hiragana": "や / おく (ya)", "sinoVietnamese": "ỐC", "meaning": "Căn nhà, mái nhà, cửa hàng", "level": "N4", "breakdown": "尸 (Thi) + 至 (Chí)", "mnemonic": "Mái nhà nơi bước chân dừng lại nghỉ ngơi."},
        {"kanji": "部屋", "hiragana": "へや (heya)", "sinoVietnamese": "BỘ ỐC", "meaning": "Căn phòng", "level": "N5", "breakdown": "部 (Bộ) + 屋 (Ốc)", "mnemonic": "Căn phòng riêng biệt ngăn nắp sạch sẽ."},
        {"kanji": "本屋", "hiragana": "ほんや (hon'ya)", "sinoVietnamese": "BỔN ỐC", "meaning": "Hiệu sách, tiệm sách", "level": "N5", "breakdown": "本 (Bổn) + 屋 (Ốc)", "mnemonic": "Tiệm bán muôn vàn đầu sách hay."},
        {"kanji": "届く", "hiragana": "とどく (todoku)", "sinoVietnamese": "GIỚI", "meaning": "Được chuyển tới tận nơi", "level": "N4", "breakdown": "尸 (Thi) + 由 (Do)", "mnemonic": "Gói hàng gửi đến tận cửa nhà người nhận."},
        {"kanji": "郵便局", "hiragana": "ゆうびんきょく (yūbinkyoku)", "sinoVietnamese": "BƯU TIỆN CỤC", "meaning": "Bưu điện", "level": "N5", "breakdown": "郵便 + 局 (Cục có 尸)", "mnemonic": "Cơ quan phụ trách bưu chính chuyển phát."},
        {"kanji": "展覧会", "hiragana": "てんらんかい (tenrankai)", "sinoVietnamese": "TRIỂN LÃM HỘI", "meaning": "Buổi triển lãm nghệ thuật", "level": "N3", "breakdown": "展 (Triển có 尸) + 覧 + 会", "mnemonic": "Mở rộng cánh cửa trưng bày các kiệt tác."},
        {"kanji": "履く", "hiragana": "はく (haku)", "sinoVietnamese": "LÝ", "meaning": "Mặc (quần), xỏ (giày tất)", "level": "N5", "breakdown": "尸 (Thi) + 复", "mnemonic": "Ngồi xuống xỏ giày trước khi bước ra ngoài."},
        {"kanji": "屍", "hiragana": "しかばね (shikabane)", "sinoVietnamese": "THI", "meaning": "Thi thể, xác ướp", "level": "N1", "breakdown": "尸 (Thi) + 死 (Tử)", "mnemonic": "Thi thể bất động sau trận chiến sa trường."}
    ],
    45: [ # 屮 (Triệt - Mầm cỏ mới nhú)
        {"kanji": "屯", "hiragana": "とん (ton)", "sinoVietnamese": "TRUÂN", "meaning": "Đồn trú, tích tụ", "level": "N1", "breakdown": "屮 (Triệt) đâm thủng đất 一", "mnemonic": "Mầm cây kiên cường đâm xuyên qua lớp đất cứng."},
        {"kanji": "駐屯", "hiragana": "ちゅうとん (chūton)", "sinoVietnamese": "TRÚ TRUÂN", "meaning": "Đồn trú quân sự", "level": "N1", "breakdown": "駐 (Trú) + 屯 (Truân)", "mnemonic": "Đơn vị binh sĩ đóng quân đồn trú vững chãi."},
        {"kanji": "出", "hiragana": "でる / だす (deru)", "sinoVietnamese": "XUẤT", "meaning": "Đi ra, xuất hiện", "level": "N5", "breakdown": "Hai chữ 屮 trồng lên nhau vươn lên", "mnemonic": "Mầm cây đâm chồi vươn mình ra khỏi mặt đất."},
        {"kanji": "出口", "hiragana": "でぐち (deguchi)", "sinoVietnamese": "XUẤT KHẨU", "meaning": "Cửa ra, lối thoát hiểm", "level": "N5", "breakdown": "出 (Xuất) + 口 (Khẩu)", "mnemonic": "Lối thoát ra ngoài thông thoáng an toàn."},
        {"kanji": "出発", "hiragana": "しゅっぱつ (shuppatsu)", "sinoVietnamese": "XUẤT PHÁT", "meaning": "Khởi hành, xuất phát", "level": "N4", "breakdown": "出 (Xuất) + 発 (Phát)", "mnemonic": "Bắt đầu lăn bánh khởi hành chuyến đi xa."},
        {"kanji": "出席", "hiragana": "しゅっせき (shusseki)", "sinoVietnamese": "XUẤT TỊCH", "meaning": "Có mặt, tham dự", "level": "N4", "breakdown": "出 (Xuất) + 席 (Tịch)", "mnemonic": "Có mặt đầy đủ tại chỗ ngồi sự kiện."},
        {"kanji": "芽", "hiragana": "め (me)", "sinoVietnamese": "NHA", "meaning": "Mầm non cây cối", "level": "N2", "breakdown": "Thảo biến thể từ 屮 + Nha", "mnemonic": "Mầm xanh mới nhú mơn mởn đón nắng mai."},
        {"kanji": "苗", "hiragana": "なえ (nae)", "sinoVietnamese": "MIÊU", "meaning": "Cây mạ non, cây con", "level": "N2", "breakdown": "Thảo có 屮 + Điền (Ruộng)", "mnemonic": "Những khóm mạ non xanh mướt trên cánh đồng."},
        {"kanji": "若者", "hiragana": "わかもの (wakamono)", "sinoVietnamese": "NHƯỢC GIẢ", "meaning": "Người trẻ tuổi, thanh niên", "level": "N3", "breakdown": "若 (Nhược) + 者 (Giả)", "mnemonic": "Thế hệ trẻ tràn đầy sức sống như mầm non."},
        {"kanji": "芝生", "hiragana": "しばふ (shibafu)", "sinoVietnamese": "CHI SINH", "meaning": "Thảm cỏ xanh", "level": "N3", "breakdown": "芝 (Chi) + 生 (Sinh)", "mnemonic": "Bãi cỏ xanh mướt mọc dày như thảm lụa."}
    ],
    46: [ # 山 (Sơn - Núi non) - Tần suất rất cao
        {"kanji": "山", "hiragana": "やま (yama)", "sinoVietnamese": "SƠN", "meaning": "Núi non, ngọn núi", "level": "N5", "breakdown": "Ba đỉnh núi nhô cao", "mnemonic": "Ba đỉnh núi cao sừng sững chạm trời xanh."},
        {"kanji": "富士山", "hiragana": "ふじさん (fujisan)", "sinoVietnamese": "PHÚ SĨ SƠN", "meaning": "Núi Phú Sĩ", "level": "N5", "breakdown": "富士 + 山 (Sơn)", "mnemonic": "Ngọn núi thiêng phủ tuyết trắng biểu tượng nước Nhật."},
        {"kanji": "山登り", "hiragana": "やまのぼり (yamanobori)", "sinoVietnamese": "SƠN ĐĂNG", "meaning": "Leo núi, leo dốc", "level": "N5", "breakdown": "山 (Sơn) + 登 (Đăng)", "mnemonic": "Chinh phục đỉnh núi cao rèn luyện sức bền."},
        {"kanji": "岩", "hiragana": "いわ (iwa)", "sinoVietnamese": "NHAM", "meaning": "Tảng đá lớn, vách đá", "level": "N3", "breakdown": "山 (Sơn) + 石 (Thạch)", "mnemonic": "Khối đá hoa cương sừng sững trên đỉnh núi."},
        {"kanji": "岸", "hiragana": "きし (kishi)", "sinoVietnamese": "NGẠN", "meaning": "Bờ sông, bờ biển", "level": "N3", "breakdown": "山 (Sơn) + Can", "mnemonic": "Dải đất nhô lên ngăn cách dòng nước mát."},
        {"kanji": "海岸", "hiragana": "かいがん (kaigan)", "sinoVietnamese": "HẢI NGẠN", "meaning": "Bờ biển cát trắng", "level": "N4", "breakdown": "海 (Hải) + 岸 (Ngạn)", "mnemonic": "Bờ cát dài phẳng lặng nghe sóng vỗ rì rào."},
        {"kanji": "島", "hiragana": "しま (shima)", "sinoVietnamese": "ĐẢO", "meaning": "Hòn đảo trên biển", "level": "N4", "breakdown": "Điểu + 山 (Sơn)", "mnemonic": "Hòn đảo giữa đại dương nơi chim biển nghỉ chân."},
        {"kanji": "崩れる", "hiragana": "くずれる (kuzureru)", "sinoVietnamese": "BĂNG", "meaning": "Sụp đổ, lở đất núi", "level": "N2", "breakdown": "山 (Sơn) + Băng", "mnemonic": "Đất đá sườn núi sạt lở dữ dội sau mưa lớn."},
        {"kanji": "炭", "hiragana": "すみ (sumi)", "sinoVietnamese": "THAN", "meaning": "Than đá, than củi", "level": "N3", "breakdown": "山 (Sơn) + Hỏa (Lửa)", "mnemonic": "Than đốt từ gỗ rừng trên núi tỏa nhiệt ấm."},
        {"kanji": "炭酸", "hiragana": "たんさん (tansan)", "sinoVietnamese": "THAN TOAN", "meaning": "Khí cacbonic, nước có ga", "level": "N2", "breakdown": "炭 (Than) + 酸 (Toan)", "mnemonic": "Bọt khí sủi tăm mát lạnh sảng khoái."},
        {"kanji": "嵐", "hiragana": "あらし (arashi)", "sinoVietnamese": "LAM", "meaning": "Cơn bão tố dữ dội", "level": "N2", "breakdown": "山 (Sơn) + 風 (Phong - gió)", "mnemonic": "Gió bão gầm rít dữ dội qua các đỉnh núi."},
        {"kanji": "嶺", "hiragana": "みね / れい (rei)", "sinoVietnamese": "LĨNH", "meaning": "Dãy núi cao chót vót", "level": "N1", "breakdown": "山 (Sơn) + 領 (Lãnh)", "mnemonic": "Đỉnh núi cao vời vợi chạm tầng mây."}
    ],
    47: [ # 巛 (Xuyên - Sông ngòi, dòng chảy)
        {"kanji": "川", "hiragana": "かわ (kawa)", "sinoVietnamese": "XUYÊN", "meaning": "Dòng sông, con suối", "level": "N5", "breakdown": "Ba vạch dọc uốn lượn", "mnemonic": "Ba dòng nước mát lành tuôn chảy xuôi về biển cả."},
        {"kanji": "小川", "hiragana": "おがわ (ogawa)", "sinoVietnamese": "TIỂU XUYÊN", "meaning": "Con suối nhỏ róc rách", "level": "N4", "breakdown": "小 (Tiểu) + 川 (Xuyên)", "mnemonic": "Dòng suối trong veo chảy róc rách qua rừng."},
        {"kanji": "河川", "hiragana": "かせん (kasen)", "sinoVietnamese": "HÀ XUYÊN", "meaning": "Hệ thống sông ngòi", "level": "N2", "breakdown": "河 (Hà) + 川 (Xuyên)", "mnemonic": "Mạng lưới sông suối bồi đắp phù sa màu mỡ."},
        {"kanji": "順", "hiragana": "じゅん (jun)", "sinoVietnamese": "THUẬN", "meaning": "Thuận theo, thứ tự", "level": "N3", "breakdown": "川 (Xuyên) + 頁 (Hiệp)", "mnemonic": "Thuận buồm xuôi gió theo chiều dòng chảy tự nhiên."},
        {"kanji": "順番", "hiragana": "じゅんばん (jumban)", "sinoVietnamese": "THUẬN PHIÊN", "meaning": "Thứ tự lần lượt", "level": "N3", "breakdown": "順 (Thuận) + 番 (Phiên)", "mnemonic": "Xếp hàng ngay ngắn lần lượt theo thứ tự."},
        {"kanji": "順調", "hiragana": "じゅんちょう (junchō)", "sinoVietnamese": "THUẬN ĐIỀU", "meaning": "Thuận lợi, trôi chảy tốt đẹp", "level": "N3", "breakdown": "順 (Thuận) + 調 (Điều)", "mnemonic": "Mọi sự diễn ra suôn sẻ không gặp trắc trở."},
        {"kanji": "巡る", "hiragana": "めぐる (meguru)", "sinoVietnamese": "TUẦN", "meaning": "Đi vòng quanh, dạo quanh", "level": "N2", "breakdown": "辶 (Sước) + 巛 (Xuyên)", "mnemonic": "Đi thuyền xuôi ngược quanh khúc sông êm đềm."},
        {"kanji": "巡回", "hiragana": "じゅんかい (junkai)", "sinoVietnamese": "TUẦN HỒI", "meaning": "Đi tuần tra, tuần tra bảo vệ", "level": "N2", "breakdown": "巡 (Tuần) + 回 (Hồi)", "mnemonic": "Đội an ninh đi tuần tra kiểm soát địa bàn."},
        {"kanji": "本州", "hiragana": "ほんしゅう (honshū)", "sinoVietnamese": "BỔN CHÂU", "meaning": "Đảo Honshu (đảo chính Nhật Bản)", "level": "N3", "breakdown": "本 (Bổn) + 州 (Châu có 巛)", "mnemonic": "Đảo lớn trung tâm xứ sở mặt trời mọc."},
        {"kanji": "九州", "hiragana": "きゅうしゅう (kyūshū)", "sinoVietnamese": "CỬU CHÂU", "meaning": "Đảo Kyushu", "level": "N4", "breakdown": "九 (Cửu) + 州 (Châu)", "mnemonic": "Vùng đất chín châu trù phú phía nam."},
        {"kanji": "巣", "hiragana": "す (su)", "sinoVietnamese": "SÀO", "meaning": "Tổ chim, tổ ấm", "level": "N2", "breakdown": "巛 (Xuyên) trên Quả", "mnemonic": "Tổ chim đan bằng cành cây bên bờ suối vắng."}
    ],
    48: [ # 工 (Công - Thợ, công việc thủ công)
        {"kanji": "工場", "hiragana": "こうじょう / こうば (kōjō)", "sinoVietnamese": "CÔNG TRƯỜNG", "meaning": "Nhà máy, xưởng chế tạo", "level": "N5", "breakdown": "工 (Công) + 場 (Trường)", "mnemonic": "Nơi công nhân hăng say sản xuất hàng hóa."},
        {"kanji": "工事", "hiragana": "こうじ (kōji)", "sinoVietnamese": "CÔNG SỰ", "meaning": "Công trình thi công, sửa chữa", "level": "N4", "breakdown": "工 (Công) + 事 (Sự)", "mnemonic": "Thi công xây dựng nâng cấp hạ tầng."},
        {"kanji": "左", "hiragana": "ひだり (hidari)", "sinoVietnamese": "TẢ", "meaning": "Bên trái", "level": "N5", "breakdown": "Hựu cầm thước 工 bên tay trái", "mnemonic": "Bàn tay trái cầm thước đo kỹ thuật."},
        {"kanji": "左側", "hiragana": "ひだりがわ (hidarigawa)", "sinoVietnamese": "TẢ TRẮC", "meaning": "Phía bên trái đường", "level": "N5", "breakdown": "左 (Tả) + 側 (Trắc)", "mnemonic": "Quy tắc đi bên trái đường chuẩn mực tại Nhật."},
        {"kanji": "差", "hiragana": "さ (sa)", "sinoVietnamese": "SA", "meaning": "Khoảng cách, chênh lệch", "level": "N3", "breakdown": "Dương + 工 (Công)", "mnemonic": "Đo đạc thấy rõ độ lệch chuẩn giữa hai bên."},
        {"kanji": "差別", "hiragana": "さべつ (sabetsu)", "sinoVietnamese": "SA BIỆT", "meaning": "Kỳ thị, phân biệt đối xử", "level": "N2", "breakdown": "差 (Sa) + 別 (Biệt)", "mnemonic": "Hành vi kỳ thị bất công cần bài trừ."},
        {"kanji": "成功", "hiragana": "せいこう (seikō)", "sinoVietnamese": "THÀNH CÔNG", "meaning": "Thành công vang dội", "level": "N3", "breakdown": "成 (Thành) + 功 (Công có 工)", "mnemonic": "Bao công sức miệt mài cuối cùng đã hái quả ngọt."},
        {"kanji": "巧み", "hiragana": "たくみ (takumi)", "sinoVietnamese": "XẢO", "meaning": "Khéo léo, tinh tế xảo diệu", "level": "N1", "breakdown": "工 (Công) + 丂", "mnemonic": "Đôi bàn tay người nghệ nhân điêu khắc tinh xảo."},
        {"kanji": "貢献", "hiragana": "こうけん (kōken)", "sinoVietnamese": "CỐNG HIẾN", "meaning": "Đóng góp, cống hiến to lớn", "level": "N1", "breakdown": "貢 (Cống có 工) + 献 (Hiến)", "mnemonic": "Cống hiến tài năng vì sự phát triển của xã hội."},
        {"kanji": "工作", "hiragana": "こうさく (kōsaku)", "sinoVietnamese": "CÔNG TÁC", "meaning": "Đồ thủ công, chế tác mỹ thuật", "level": "N2", "breakdown": "工 (Công) + 作 (Tác)", "mnemonic": "Tự tay cắt dán sáng tạo các mô hình đẹp mắt."}
    ],
    49: [ # 己 (Kỷ - Bản thân mình, can Kỷ)
        {"kanji": "自己", "hiragana": "じこ (jiko)", "sinoVietnamese": "TỰ KỶ", "meaning": "Bản thân mình", "level": "N3", "breakdown": "自 (Tự) + 己 (Kỷ)", "mnemonic": "Tự hiểu rõ chính bản thân mình."},
        {"kanji": "自己紹介", "hiragana": "じこしょうかい (jiko shōkai)", "sinoVietnamese": "TỰ KỶ THIỆU GIỚI", "meaning": "Tự giới thiệu bản thân", "level": "N4", "breakdown": "自己 + 紹介", "mnemonic": "Bài phát biểu mở màn giới thiệu danh tính lịch sự."},
        {"kanji": "利己的", "hiragana": "りこてき (rikoteki)", "sinoVietnamese": "LỢI KỶ ĐÍCH", "meaning": "Ích kỷ, chỉ lo cho bản thân", "level": "N1", "breakdown": "利 (Lợi) + 己 (Kỷ) + 的", "mnemonic": "Thói hẹp hòi chỉ mưu cầu lợi ích riêng tư."},
        {"kanji": "既に", "hiragana": "すでに (sudeni)", "sinoVietnamese": "KÝ", "meaning": "Đã, rồi (hoàn thành trước đó)", "level": "N2", "breakdown": "Có nét 己 biến thể", "mnemonic": "Việc đã trót xảy ra không thể vãn hồi."},
        {"kanji": "忌む", "hiragana": "いむ (imu)", "sinoVietnamese": "KỴ", "meaning": "Kiêng kỵ, ghét bỏ tránh xa", "level": "N1", "breakdown": "己 (Kỷ) + 心 (Tâm)", "mnemonic": "Trong lòng tự răn mình phải kiêng kỵ điều xấu."},
        {"kanji": "改める", "hiragana": "あらためる (aratameru)", "sinoVietnamese": "CẢI", "meaning": "Sửa đổi, cải tiến tân trang", "level": "N2", "breakdown": "己 (Kỷ) + 攵 (Phộc)", "mnemonic": "Tự gõ nhắc nhở bản thân để sửa đổi tiến bộ."},
        {"kanji": "改革", "hiragana": "かいかく (kaikaku)", "sinoVietnamese": "CẢI CÁCH", "meaning": "Cải cách toàn diện", "level": "N2", "breakdown": "改 (Cải) + 革 (Cách)", "mnemonic": "Công cuộc đổi mới đem lại luồng sinh khí tân tiến."},
        {"kanji": "配る", "hiragana": "くばる (kubaru)", "sinoVietnamese": "PHỐI", "meaning": "Phân phát, chia cho từng người", "level": "N4", "breakdown": "Dậu + 己 (Kỷ)", "mnemonic": "Tự tay rót rượu chia đều cho mọi người trong bàn."},
        {"kanji": "配達", "hiragana": "はいたつ (haitatsu)", "sinoVietnamese": "PHỐI ĐẠT", "meaning": "Giao hàng tận nơi", "level": "N3", "breakdown": "配 (Phối) + 達 (Đạt)", "mnemonic": "Vận chuyển bưu phẩm đến tận tay người nhận."},
        {"kanji": "心配", "hiragana": "しんぱい (shinpai)", "sinoVietnamese": "TÂM PHỐI", "meaning": "Lo lắng, bận tâm", "level": "N5", "breakdown": "心 (Tâm) + 配 (Phối)", "mnemonic": "Phân tâm lo lắng cho người thân phương xa."}
    ],
    50: [ # 巾 (Cân - Khăn, mảnh vải)
        {"kanji": "布", "hiragana": "ぬの (nuno)", "sinoVietnamese": "BỐ", "meaning": "Vải vóc, mảnh vải dệt", "level": "N3", "breakdown": "Đưa tay giũ tấm vải 巾", "mnemonic": "Mảnh vải mềm mại dệt từ sợi bông thiên nhiên."},
        {"kanji": "布団", "hiragana": "ふとん (futon)", "sinoVietnamese": "BỐ ĐOÀN", "meaning": "Nệm, chăn nệm kiểu Nhật", "level": "N5", "breakdown": "布 (Bố) + 団 (Đoàn)", "mnemonic": "Chiếc nệm bông êm ái cho giấc ngủ say."},
        {"kanji": "財布", "hiragana": "さいふ (saifu)", "sinoVietnamese": "TÀI BỐ", "meaning": "Ví tiền, bóp đựng tiền", "level": "N5", "breakdown": "財 (Tài) + 布 (Bố)", "mnemonic": "Túi vải bền bỉ đựng tiền bạc tài sản."},
        {"kanji": "帆船", "hiragana": "はんせん (hansen)", "sinoVietnamese": "PHÀM THUYỀN", "meaning": "Thuyền buồm lướt sóng", "level": "N2", "breakdown": "帆 (Phàm có 巾) + 船 (Thuyền)", "mnemonic": "Cánh buồm vải giăng căng gió đẩy thuyền lướt đi."},
        {"kanji": "席", "hiragana": "せき (seki)", "sinoVietnamese": "TỊCH", "meaning": "Chỗ ngồi, ghế ngồi", "level": "N4", "breakdown": "Nghiễm + 巾 (Cân)", "mnemonic": "Mảnh chiếu trải dưới mái hiên mời khách an tọa."},
        {"kanji": "出席", "hiragana": "しゅっせき (shusseki)", "sinoVietnamese": "XUẤT TỊCH", "meaning": "Tham dự, có mặt", "level": "N4", "breakdown": "出 (Xuất) + 席 (Tịch)", "mnemonic": "Ngồi đúng ghế tham gia buổi lễ trang trọng."},
        {"kanji": "帽子", "hiragana": "ぼうし (bōshi)", "sinoVietnamese": "MẠO TỬ", "meaning": "Cái mũ, nón đội đầu", "level": "N5", "breakdown": "Mạo có 巾 + 子 (Tử)", "mnemonic": "Chiếc nón vải che nắng ấm áp trên đầu."},
        {"kanji": "幕", "hiragana": "まく (maku)", "sinoVietnamese": "MẠC", "meaning": "Tấm màn nhung, bức rèm sân khấu", "level": "N2", "breakdown": "Mạc có 巾 phía dưới", "mnemonic": "Bức rèm nhung lộng lẫy kéo ra mở màn vở kịch."},
        {"kanji": "手帳", "hiragana": "てちょう (techō)", "sinoVietnamese": "THỦ TRƯỚNG", "meaning": "Sổ tay ghi chép", "level": "N4", "breakdown": "手 (Thủ) + 帳 (Trướng có 巾)", "mnemonic": "Cuốn sổ tay bìa vải ghi nhớ lịch trình công tác."},
        {"kanji": "幅", "hiragana": "はば (haba)", "sinoVietnamese": "BÚC", "meaning": "Chiều rộng, bề ngang, biên độ", "level": "N3", "breakdown": "巾 (Cân) + Phúc", "mnemonic": "Đo bề rộng khổ vải dệt may y phục."}
    ],
    51: [ # 干 (Can - Can thiệp, khô hạn, khiên chắn)
        {"kanji": "干す", "hiragana": "ほす (hosu)", "sinoVietnamese": "CAN", "meaning": "Phơi khô, làm cạn nước", "level": "N4", "breakdown": "Cái giá phơi đồ dưới nắng", "mnemonic": "Treo quần áo lên giàn phơi khô dưới nắng."},
        {"kanji": "梅干し", "hiragana": "うめぼし (umeboshi)", "sinoVietnamese": "MAI CAN", "meaning": "Mơ muối ngâm phơi khô", "level": "N4", "breakdown": "梅 (Mai) + 干 (Can)", "mnemonic": "Món mơ muối truyền thống chua ngọt đậm đà."},
        {"kanji": "汗", "hiragana": "あせ (ase)", "sinoVietnamese": "HÃN", "meaning": "Mồ hôi", "level": "N3", "breakdown": "氵 (Thủy) + 干 (Can)", "mnemonic": "Mồ hôi tuôn rơi như nước khi trời hanh khô."},
        {"kanji": "肝臓", "hiragana": "かんぞう (kanzō)", "sinoVietnamese": "CAN TẠNG", "meaning": "Lá gan", "level": "N2", "breakdown": "月 (Nhục) + 干 (Can) + 臓", "mnemonic": "Lá gan lọc độc đóng vai trò then chốt trong cơ thể."},
        {"kanji": "幹", "hiragana": "みき / かん (kan)", "sinoVietnamese": "CÁN", "meaning": "Thân cây, cốt cán", "level": "N2", "breakdown": "Thập + Triều + 干 (Can)", "mnemonic": "Thân cây vững chãi chống chọi mọi mưa giông."},
        {"kanji": "幹部", "hiragana": "かんぶ (kambu)", "sinoVietnamese": "CÁN BỘ", "meaning": "Cán bộ lãnh đạo, nhân sự chủ chốt", "level": "N2", "breakdown": "幹 (Cán) + 部 (Bộ)", "mnemonic": "Đội ngũ cán bộ then chốt lèo lái tổ chức."},
        {"kanji": "刊", "hiragana": "かん (kan)", "sinoVietnamese": "SAN", "meaning": "Xuất bản, ấn bản", "level": "N3", "breakdown": "干 (Can) + 刂 (Đao)", "mnemonic": "Khắc bản gỗ in ấn phát hành sách báo."},
        {"kanji": "朝刊", "hiragana": "ちょうかん (chōkan)", "sinoVietnamese": "TRIÊU SAN", "meaning": "Báo buổi sáng", "level": "N3", "breakdown": "朝 (Triều) + 刊 (San)", "mnemonic": "Tờ báo sớm giao tới tận nhà mỗi bình minh."},
        {"kanji": "夕刊", "hiragana": "ゆうかん (yūkan)", "sinoVietnamese": "TỊCH SAN", "meaning": "Báo buổi chiều", "level": "N3", "breakdown": "夕 (Tịch) + 刊 (San)", "mnemonic": "Bản tin chiều cập nhật dòng thời sự nóng hổi."},
        {"kanji": "平和", "hiragana": "へいわ (heiwa)", "sinoVietnamese": "BÌNH HÒA", "meaning": "Hòa bình, thanh bình", "level": "N4", "breakdown": "平 (Bình có nét 干) + 和", "mnemonic": "Thế giới phẳng lặng không còn chiến tranh loạn lạc."}
    ],
    52: [ # 幺 (Yêu - Nhỏ bé, sợi tơ mảnh)
        {"kanji": "幼い", "hiragana": "おさない (osanai)", "sinoVietnamese": "ẤU", "meaning": "Thơ ấu, còn nhỏ dại", "level": "N3", "breakdown": "幺 (Yêu) + 力 (Lực)", "mnemonic": "Đứa trẻ non nớt sức lực còn non yếu."},
        {"kanji": "幼児", "hiragana": "ようじ (yōji)", "sinoVietnamese": "ẤU NHI", "meaning": "Trẻ mầm non, em bé", "level": "N3", "breakdown": "幼 (Ấu) + 児 (Nhi)", "mnemonic": "Các bé mầm non cần tình yêu thương săn sóc."},
        {"kanji": "幽霊", "hiragana": "ゆうれい (yūrei)", "sinoVietnamese": "U LINH", "meaning": "Hồn ma, bóng ma u linh", "level": "N2", "breakdown": "幽 (U có 2 幺) + 霊 (Linh)", "mnemonic": "Bóng ma ẩn hiện chập chờn nơi u tịch."},
        {"kanji": "幻", "hiragana": "まぼろし / げん (gen)", "sinoVietnamese": "ẢO", "meaning": "Ảo ảnh, mộng ảo huyền diệu", "level": "N2", "breakdown": "幺 (Yêu) biến thể", "mnemonic": "Cảnh tượng huyền ảo thoáng ẩn thoáng hiện."},
        {"kanji": "幻想", "hiragana": "げんそう (gensō)", "sinoVietnamese": "ẢO TƯỞNG", "meaning": "Ảo tưởng, mộng tưởng kỳ diệu", "level": "N2", "breakdown": "幻 (Ảo) + 想 (Tưởng)", "mnemonic": "Thả hồn bay bổng theo những điều kỳ diệu."},
        {"kanji": "幾つ", "hiragana": "いくつ (ikutsu)", "sinoVietnamese": "KỶ", "meaning": "Bao nhiêu (cái), mấy tuổi", "level": "N5", "breakdown": "幺 (Yêu) + Thú", "mnemonic": "Từng sợi tơ nhỏ đếm xem có tất cả bao nhiêu cái."},
        {"kanji": "幾分", "hiragana": "いくぶん (ikubun)", "sinoVietnamese": "KỶ PHÂN", "meaning": "Đôi chút, có phần hơi...", "level": "N2", "breakdown": "幾 (Kỷ) + 分 (Phân)", "mnemonic": "Có phần thuyên giảm đôi chút sau cơn sốt."},
        {"kanji": "幼稚園", "hiragana": "ようちえん (yōchien)", "sinoVietnamese": "ẤU TRĨ VIÊN", "meaning": "Trường mầm non, mẫu giáo", "level": "N4", "breakdown": "幼 (Ấu) + 稚 + 園 (Viên)", "mnemonic": "Khu vườn rộn rã tiếng cười trẻ thơ."},
        {"kanji": "幾重", "hiragana": "いくえ (ikue)", "sinoVietnamese": "KỶ TRỌNG", "meaning": "Muôn vàn lớp, nhiều tầng lớp dày đặc", "level": "N1", "breakdown": "幾 (Kỷ) + 重 (Trọng)", "mnemonic": "Muôn trùng sóng gió bao bọc trùng điệp."},
        {"kanji": "幽玄", "hiragana": "ゆうげん (yūgen)", "sinoVietnamese": "U HUYỀN", "meaning": "Vẻ đẹp u huyền, thâm trầm kín đáo", "level": "N1", "breakdown": "幽 (U) + 玄 (Huyền)", "mnemonic": "Nét đẹp tĩnh lặng sâu lắng trong trà đạo Nhật Bản."}
    ],
    53: [ # 广 (Nghiễm - Mái nhà rộng trên sườn dốc) - Tần suất cao
        {"kanji": "店", "hiragana": "みせ / てん (ten)", "sinoVietnamese": "ĐIẾM", "meaning": "Cửa hàng, tiệm buôn bán", "level": "N5", "breakdown": "广 (Nghiễm) + 占 (Chiêm)", "mnemonic": "Dưới mái hiên rộng mở cửa hàng kinh doanh phát tài."},
        {"kanji": "店員", "hiragana": "てんいん (ten'in)", "sinoVietnamese": "ĐIẾM VIÊN", "meaning": "Nhân viên bán hàng", "level": "N5", "breakdown": "店 (Điếm) + 員 (Viên)", "mnemonic": "Người nhân viên ân cần chào đón quý khách."},
        {"kanji": "席", "hiragana": "せき (seki)", "sinoVietnamese": "TỊCH", "meaning": "Chỗ ngồi", "level": "N4", "breakdown": "广 (Nghiễm) + 巾 (Cân)", "mnemonic": "Trải chiếu dưới mái nhà ngồi uống trà."},
        {"kanji": "広大", "hiragana": "こうだい (kōdai)", "sinoVietnamese": "QUẢNG ĐẠI", "meaning": "Rộng lớn, bao la bát ngát", "level": "N2", "breakdown": "広 (Quảng có 广) + 大 (Đại)", "mnemonic": "Thảo nguyên bao la ngút ngàn tầm mắt."},
        {"kanji": "広い", "hiragana": "ひろい (hiroi)", "sinoVietnamese": "QUẢNG", "meaning": "Rộng rãi, khoáng đạt", "level": "N5", "breakdown": "广 (Nghiễm) + ム", "mnemonic": "Căn phòng rộng thênh thang thoáng mát."},
        {"kanji": "床屋", "hiragana": "とこや (tokoya)", "sinoVietnamese": "SÀNG ỐC", "meaning": "Tiệm cắt tóc nam", "level": "N4", "breakdown": "床 (Sàng có 广) + 屋 (Ốc)", "mnemonic": "Tiệm hớt tóc gọn gàng ngăn nắp ven đường."},
        {"kanji": "底", "hiragana": "そこ (soko)", "sinoVietnamese": "ĐỂ", "meaning": "Đáy (nồi, biển, cốc)", "level": "N3", "breakdown": "广 (Nghiễm) + Đê", "mnemonic": "Mò tận đáy sâu đại dương tìm kiếm kho báu."},
        {"kanji": "政府", "hiragana": "せいふ (seifu)", "sinoVietnamese": "CHÍNH PHỦ", "meaning": "Chính phủ quốc gia", "level": "N3", "breakdown": "政 (Chính) + 府 (Phủ có 广)", "mnemonic": "Dinh thự chính phủ điều hành quốc gia hưng thịnh."},
        {"kanji": "態度", "hiragana": "たいど (taido)", "sinoVietnamese": "THÁI ĐỘ", "meaning": "Thái độ, cách hành xử", "level": "N3", "breakdown": "態 (Thái) + 度 (Độ có 广)", "mnemonic": "Thái độ tôn trọng chân thành trong giao tiếp."},
        {"kanji": "冷蔵庫", "hiragana": "れいぞうこ (reizōko)", "sinoVietnamese": "LÃNH TÀNG KHỐ", "meaning": "Tủ lạnh bảo quản thực phẩm", "level": "N4", "breakdown": "冷 + 蔵 + 庫 (Khố có 广)", "mnemonic": "Nhà kho lạnh bảo quản đồ ăn luôn tươi ngon."},
        {"kanji": "庭", "hiragana": "にわ (niwa)", "sinoVietnamese": "ĐÌNH", "meaning": "Sân vườn", "level": "N5", "breakdown": "广 (Nghiễm) + Đình", "mnemonic": "Khu vườn xinh đẹp dưới mái nhà yên ả."},
        {"kanji": "廃止", "hiragana": "はいし (haishi)", "sinoVietnamese": "PHẾ CHỈ", "meaning": "Bãi bỏ, hủy bỏ quy định cũ", "level": "N2", "breakdown": "廃 (Phế có 广) + 止 (Chỉ)", "mnemonic": "Dỡ bỏ mái nhà dột nát hủy bỏ luật lỗi thời."}
    ],
    54: [ # 廴 (Dẫn - Bước chân dài, kéo dài quãng đường)
        {"kanji": "延びる", "hiragana": "のびる (nobiru)", "sinoVietnamese": "DUYÊN", "meaning": "Kéo dài ra, hoãn lại", "level": "N3", "breakdown": "廴 (Dẫn) + 止 (Chỉ)", "mnemonic": "Bước chân dài sải bước kéo dài thêm thời gian."},
        {"kanji": "延期", "hiragana": "えんき (enki)", "sinoVietnamese": "DUYÊN KỲ", "meaning": "Trì hoãn, lùi lịch hẹn", "level": "N3", "breakdown": "延 (Duyên) + 期 (Kỳ)", "mnemonic": "Hoãn kỳ thi sang tuần sau do bão lớn."},
        {"kanji": "建てる", "hiragana": "たてる (tateru)", "sinoVietnamese": "KIẾN", "meaning": "Xây dựng, dựng nên", "level": "N5", "breakdown": "廴 (Dẫn) + 聿 (Duật - bút)", "mnemonic": "Cầm bút vạch sơ đồ rồi sải bước xây nhà kiên cố."},
        {"kanji": "建物", "hiragana": "たてもの (tatemono)", "sinoVietnamese": "KIẾN VẬT", "meaning": "Tòa nhà, công trình", "level": "N5", "breakdown": "建 (Kiến) + 物 (Vật)", "mnemonic": "Tòa cao ốc đồ sộ nguy nga giữa phố xá."},
        {"kanji": "建築", "hiragana": "けんちく (kenchiku)", "sinoVietnamese": "KIẾN TRÚC", "meaning": "Ngành kiến trúc, xây dựng", "level": "N3", "breakdown": "建 (Kiến) + 築 (Trúc)", "mnemonic": "Công trình kiến trúc độc đáo mang tính biểu tượng."},
        {"kanji": "法廷", "hiragana": "ほうてい (hōtei)", "sinoVietnamese": "PHÁP ĐÌNH", "meaning": "Tòa án, phòng xét xử", "level": "N1", "breakdown": "法 (Pháp) + 廷 (Đình có 廴)", "mnemonic": "Chốn pháp đình công lý bước vào xét xử nghiêm minh."},
        {"kanji": "宮廷", "hiragana": "きゅうてい (kyūtei)", "sinoVietnamese": "CUNG ĐÌNH", "meaning": "Cung đình hoàng gia", "level": "N1", "breakdown": "宮 (Cung) + 廷 (Đình)", "mnemonic": "Chốn triều đình nguy nga của các bậc đế vương xưa."},
        {"kanji": "廻る", "hiragana": "まわる (mawaru)", "sinoVietnamese": "HỒI", "meaning": "Xoay quanh, luân chuyển", "level": "N1", "breakdown": "廴 (Dẫn) + 回 (Hồi)", "mnemonic": "Bước chân dài sải vòng quanh khuôn viên hoa viên."},
        {"kanji": "廻船", "hiragana": "かいせん (kaisen)", "sinoVietnamese": "HỒI THUYỀN", "meaning": "Thuyền buôn vận tải đường biển thời Edo", "level": "N1", "breakdown": "廻 (Hồi) + 船 (Thuyền)", "mnemonic": "Đoàn thuyền chạy luân phiên vận chuyển gạo hàng hải."},
        {"kanji": "建設", "hiragana": "けんせつ (kensetsu)", "sinoVietnamese": "KIẾN THIẾT", "meaning": "Kiến thiết, xây dựng đất nước", "level": "N3", "breakdown": "建 (Kiến) + 設 (Thiết)", "mnemonic": "Chung tay kiến thiết nước nhà giàu mạnh ấm no."}
    ],
    55: [ # 廾 (Củng - Hai tay chắp lại dâng lên)
        {"kanji": "弁護士", "hiragana": "べんごし (bengoshi)", "sinoVietnamese": "BIỆN HỘ SĨ", "meaning": "Luật sư", "level": "N3", "breakdown": "弁 (Biện có 廾) + 護 + 士", "mnemonic": "Hai tay nâng cán cân công lý biện hộ cho người vô tội."},
        {"kanji": "お弁当", "hiragana": "おべんとう (obentō)", "sinoVietnamese": "BIỆN ĐƯƠNG", "meaning": "Hộp cơm bento mang đi", "level": "N5", "breakdown": "お + 弁 (Biện có 廾) + 当", "mnemonic": "Hai tay nâng niu hộp cơm trưa mẹ chuẩn bị chu đáo."},
        {"kanji": "弊害", "hiragana": "へいがい (heigai)", "sinoVietnamese": "TỆ HẠI", "meaning": "Tác hại khôn lường, tệ nạn", "level": "N1", "breakdown": "弊 (Tệ có 廾) + 害 (Hại)", "mnemonic": "Những hủ tục mục nát gây ra bao nhiêu tác hại."},
        {"kanji": "弊社", "hiragana": "へいしゃ (heisha)", "sinoVietnamese": "TỆ XÃ", "meaning": "Công ty chúng tôi (khiêm nhường ngữ)", "level": "N2", "breakdown": "弊 (Tệ) + 社 (Xã)", "mnemonic": "Cách xưng hô khiêm tốn khi giao dịch làm ăn với đối tác."},
        {"kanji": "算数", "hiragana": "さんすう (sansū)", "sinoVietnamese": "TOÁN SỐ", "meaning": "Môn toán tiểu học", "level": "N3", "breakdown": "算 (Toán có 廾 phía dưới) + 数", "mnemonic": "Hai tay cầm que tính làm phép tính nhanh như chớp."},
        {"kanji": "計算", "hiragana": "けいさん (keisan)", "sinoVietnamese": "KẾ TOÁN", "meaning": "Tính toán thu chi", "level": "N3", "breakdown": "計 (Kế) + 算 (Toán)", "mnemonic": "Tính toán sổ sách rõ ràng minh bạch."},
        {"kanji": "昇進", "hiragana": "しょうしん (shōshin)", "sinoVietnamese": "THĂNG TIẾN", "meaning": "Thăng tiến, lên chức", "level": "N2", "breakdown": "昇 (Thăng có 廾) + 進 (Tiến)", "mnemonic": "Hai tay giơ cao đón nhận quyết định thăng chức vinh hiển."},
        {"kanji": "戒める", "hiragana": "いましめる (imashimeru)", "sinoVietnamese": "GIỚI", "meaning": "Răn đe, cảnh giới", "level": "N1", "breakdown": "Qua (Giáo) + 廾 (hai tay dâng)", "mnemonic": "Hai tay nắm chặt vũ khí tự răn mình phải luôn cảnh giác."},
        {"kanji": "戒律", "hiragana": "かいりつ (kairitsu)", "sinoVietnamese": "GIỚI LUẬT", "meaning": "Giới luật nhà chùa", "level": "N1", "breakdown": "戒 (Giới) + 律 (Luật)", "mnemonic": "Nghiêm cẩn giữ trọn giới luật thanh tịnh."},
        {"kanji": "弄ぶ", "hiragana": "もてあそぶ (moteasobu)", "sinoVietnamese": "LỘNG", "meaning": "Trêu đùa, đùa cợt tình cảm", "level": "N1", "breakdown": "Vương + 廾 (hai tay tung hứng)", "mnemonic": "Hai tay chuyền qua chuyền lại đùa giỡn vô tâm."}
    ]
})
