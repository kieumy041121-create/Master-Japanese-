# -*- coding: utf-8 -*-
import json

# Generates authentic, high-quality vocabularies for radicals 81 to 140
RADICAL_VOCABS_81_140 = {
    81: [ # 比 (Tỷ - So sánh, liền kề)
        {"kanji": "比べる", "hiragana": "くらべる (kuraberu)", "sinoVietnamese": "TỶ", "meaning": "So sánh, đối chiếu", "level": "N4", "breakdown": "Hai chữ 匕 đứng kề nhau", "mnemonic": "Đặt hai chiếc thìa kề nhau để so sánh độ dài."},
        {"kanji": "比例", "hiragana": "ひれい (hirei)", "sinoVietnamese": "TỶ LỆ", "meaning": "Tỉ lệ thuận/nghịch", "level": "N2", "breakdown": "比 (Tỷ) + 例 (Lệ)", "mnemonic": "Tỉ lệ tăng trưởng tương ứng theo cấp số."},
        {"kanji": "比較", "hiragana": "ひかく (hikaku)", "sinoVietnamese": "TỶ KHẢO", "meaning": "So sánh, đối chiếu dữ liệu", "level": "N3", "breakdown": "比 (Tỷ) + 較 (Khảo)", "mnemonic": "Đặt hai phương án lên bàn cân so sánh thiệt hơn."},
        {"kanji": "比率", "hiragana": "ひりつ (hiritsu)", "sinoVietnamese": "TỶ SUẤT", "meaning": "Tỉ suất phần trăm", "level": "N2", "breakdown": "比 (Tỷ) + 率 (Suất)", "mnemonic": "Tỉ lệ phần trăm đỗ kỳ thi JLPT năm nay."},
        {"kanji": "対比", "hiragana": "たいひ (taihi)", "sinoVietnamese": "ĐỐI TỶ", "meaning": "Đối chiếu, tương phản", "level": "N1", "breakdown": "対 (Đối) + 比 (Tỷ)", "mnemonic": "Sự đối lập tương phản rõ rệt giữa hai gam màu."},
        {"kanji": "恵比寿", "hiragana": "えびす (ebisu)", "sinoVietnamese": "HUỆ TỶ THỌ", "meaning": "Thần Tài Ebisu, ga Ebisu Tokyo", "level": "N2", "breakdown": "恵 + 比 (Tỷ) + 寿", "mnemonic": "Vị thần may mắn tay cầm cần câu cá biển."},
        {"kanji": "皆", "hiragana": "みんな / みな (minna)", "sinoVietnamese": "GIAI", "meaning": "Mọi người, tất cả", "level": "N5", "breakdown": "Tỷ (so sánh) + Bạch (trắng)", "mnemonic": "Tất cả mọi người cùng chung một tấm lòng trong sáng."},
        {"kanji": "皆既日食", "hiragana": "かいきにっしょく (kaiki nisshoku)", "sinoVietnamese": "GIAI KÝ NHẬT THỰC", "meaning": "Hiện tượng nhật thực toàn phần", "level": "N1", "breakdown": "皆 (Giai) + 既 + 日食", "mnemonic": "Mặt trăng che khuất toàn bộ vầng mặt trời."},
        {"kanji": "匹敵", "hiragana": "ひってき (hitteki)", "sinoVietnamese": "THẤT ĐỊCH", "meaning": "Ngang tài ngang sức, sánh kịp", "level": "N1", "breakdown": "匹 (có dạng 比) + 敵", "mnemonic": "Hai đối thủ so tài ngang ngửa bất phân thắng bại."},
        {"kanji": "比重", "hiragana": "ひじゅう (hijū)", "sinoVietnamese": "TỶ TRỌNG", "meaning": "Tỉ trọng, tầm quan trọng", "level": "N2", "breakdown": "比 (Tỷ) + 重 (Trọng)", "mnemonic": "Tỉ trọng ngành công nghệ thông tin trong nền kinh tế."}
    ],
    82: [ # 毛 (Mao - Lông, sợi tơ, cọng tóc)
        {"kanji": "毛", "hiragana": "け (ke)", "sinoVietnamese": "MAO", "meaning": "Lông, sợi tóc, lông thú", "level": "N4", "breakdown": "Hình sợi lông tơ phất phơ", "mnemonic": "Những sợi lông tơ mềm mại giữ ấm cơ thể."},
        {"kanji": "毛布", "hiragana": "もうふ (mōfu)", "sinoVietnamese": "MAO BỐ", "meaning": "Chăn len ấm áp", "level": "N4", "breakdown": "毛 (Mao) + 布 (Bố - vải)", "mnemonic": "Tấm chăn len dày dặn sưởi ấm mùa đông lạnh giá."},
        {"kanji": "髪の毛", "hiragana": "かみのけ (kaminoke)", "sinoVietnamese": "PHÁT MAO", "meaning": "Sợi tóc, mái tóc", "level": "N4", "breakdown": "髪 (Phát) + の + 毛 (Mao)", "mnemonic": "Mái tóc đen nhánh mượt mà bay trong gió."},
        {"kanji": "羊毛", "hiragana": "ようもう (yōmō)", "sinoVietnamese": "DƯƠNG MAO", "meaning": "Lông cừu nguyên chất", "level": "N2", "breakdown": "羊 (Dương - cừu) + 毛 (Mao)", "mnemonic": "Lông cừu dệt nên những chiếc áo ấm tuyệt hảo."},
        {"kanji": "毛糸", "hiragana": "けいと (keito)", "sinoVietnamese": "MAO MỊCH", "meaning": "Len đan áo", "level": "N3", "breakdown": "毛 (Mao) + 糸 (Mịch - sợi)", "mnemonic": "Cuộn len sắc màu thoăn thoắt đan khăn tặng mẹ."},
        {"kanji": "毛皮", "hiragana": "けがわ (kegawa)", "sinoVietnamese": "MAO BÌ", "meaning": "Bộ da lông thú", "level": "N2", "breakdown": "毛 (Mao) + 皮 (Bì - da)", "mnemonic": "Tấm áo khoác da lông ấm áp của cư dân vùng tuyết."},
        {"kanji": "睫毛", "hiragana": "まつげ (matsuge)", "sinoVietnamese": "TIỆP MAO", "meaning": "Lông mi cong vút", "level": "N1", "breakdown": "Tiệp + 毛 (Mao)", "mnemonic": "Đôi hàng mi cong chớp nhẹ che chở mắt ngọc."},
        {"kanji": "眉毛", "hiragana": "まゆげ (mayuge)", "sinoVietnamese": "MI MAO", "meaning": "Lông mày lá liễu", "level": "N2", "breakdown": "眉 (Mi) + 毛 (Mao)", "mnemonic": "Đôi lông mày thanh tú toát lên vẻ thông tuệ."},
        {"kanji": "鳥の毛", "hiragana": "とりのけ (torinoke)", "sinoVietnamese": "ĐIỂU MAO", "meaning": "Lông chim tơ mịn", "level": "N4", "breakdown": "鳥 (Điểu) + 毛 (Mao)", "mnemonic": "Những chiếc lông vũ nhẹ tựa làn sương sớm."},
        {"kanji": "刷毛", "hiragana": "はけ (hake)", "sinoVietnamese": "LOÁT MAO", "meaning": "Cây chổi quét sơn, cọ vẽ", "level": "N1", "breakdown": "刷 (Loát) + 毛 (Mao)", "mnemonic": "Cây cọ lông mềm quét đều lớp vecni bóng loáng."}
    ],
    83: [ # 氏 (Thị - Dòng họ, quý tộc, dòng dõi)
        {"kanji": "氏名", "hiragana": "しめい (shimei)", "sinoVietnamese": "THỊ DANH", "meaning": "Họ và tên đầy đủ", "level": "N4", "breakdown": "氏 (Thị) + 名 (Danh)", "mnemonic": "Điền đầy đủ họ và tên vào tờ khai xin việc."},
        {"kanji": "摂津氏", "hiragana": "せっつし (settsushi)", "sinoVietnamese": "NHIẾP TÂN THỊ", "meaning": "Gia tộc họ Settsu quý tộc xưa", "level": "N1", "breakdown": "摂津 + 氏 (Thị)", "mnemonic": "Dòng tộc quyền quý thời kỳ Mạc phủ."},
        {"kanji": "民", "hiragana": "たみ / みん (min)", "sinoVietnamese": "DÂN", "meaning": "Người dân, bách tính", "level": "N4", "breakdown": "Hình con mắt bị chọc mù làm nô lệ, biến thể 氏", "mnemonic": "Toàn thể người dân chung tay xây dựng đất nước."},
        {"kanji": "国民", "hiragana": "こくみん (kokumin)", "sinoVietnamese": "QUỐC DÂN", "meaning": "Công dân quốc gia", "level": "N4", "breakdown": "国 (Quốc) + 民 (Dân có 氏)", "mnemonic": "Mỗi công dân đều có nghĩa vụ bảo vệ tổ quốc."},
        {"kanji": "市民", "hiragana": "しみん (shimin)", "sinoVietnamese": "THỊ DÂN", "meaning": "Cư dân thành phố", "level": "N4", "breakdown": "市 (Thị) + 民 (Dân)", "mnemonic": "Người dân đô thị cùng giữ gìn môi trường xanh."},
        {"kanji": "民主主義", "hiragana": "みんしゅしゅぎ (minshushugi)", "sinoVietnamese": "DÂN CHỦ CHỦ NGHĨA", "meaning": "Chủ nghĩa dân chủ", "level": "N2", "breakdown": "民 + 主 + 主義", "mnemonic": "Chế độ dân chủ quyền lực thuộc về nhân dân."},
        {"kanji": "氏", "hiragana": "し (shi)", "sinoVietnamese": "THỊ", "meaning": "Ông, bà (hậu tố xưng hô trang trọng)", "level": "N3", "breakdown": "氏 (Thị)", "mnemonic": "Lời xưng hô kính cẩn dành cho quý ông Tanaka."},
        {"kanji": "紙", "hiragana": "かみ (kami)", "sinoVietnamese": "CHỈ", "meaning": "Tờ giấy", "level": "N5", "breakdown": "Mịch (tơ) + 氏 (Thị)", "mnemonic": "Tờ giấy trắng mịn làm từ sợi thực vật ép phẳng."},
        {"kanji": "手紙", "hiragana": "てがみ (tegami)", "sinoVietnamese": "THỦ CHỈ", "meaning": "Bức thư tay chan chứa ân tình", "level": "N5", "breakdown": "手 (Thủ) + 紙 (Chỉ có 氏)", "mnemonic": "Gửi gắm nỗi nhớ nhung vào từng trang thư tay."},
        {"kanji": "婚氏", "hiragana": "こんし (konshi)", "sinoVietnamese": "HÔN THỊ", "meaning": "Họ sau khi kết hôn theo luật Nhật", "level": "N1", "breakdown": "婚 (Hôn) + 氏 (Thị)", "mnemonic": "Quy định đổi họ theo vợ hoặc chồng sau khi cưới."}
    ],
    84: [ # 气 (Khí - Không khí, hơi mây mờ)
        {"kanji": "気", "hiragana": "き / け (ki)", "sinoVietnamese": "KHÍ", "meaning": "Không khí, tinh thần, tâm trạng", "level": "N5", "breakdown": "气 (luồng khí) bao quanh Mễ", "mnemonic": "Hơi thở sinh khí nuôi dưỡng tinh thần con người."},
        {"kanji": "元気", "hiragana": "げんき (genki)", "sinoVietnamese": "NGUYÊN KHÍ", "meaning": "Khỏe mạnh, tràn đầy sinh lực", "level": "N5", "breakdown": "元 (Nguyên) + 気 (Khí)", "mnemonic": "Luôn giữ tinh thần lạc quan khỏe khoắn mỗi sớm mai."},
        {"kanji": "天気", "hiragana": "てんき (tenki)", "sinoVietnamese": "THIÊN KHÍ", "meaning": "Thời tiết bầu trời", "level": "N5", "breakdown": "天 (Thiên) + 気 (Khí)", "mnemonic": "Trời xanh mây trắng thời tiết thật trong lành."},
        {"kanji": "気持ち", "hiragana": "きもち (kimochi)", "sinoVietnamese": "KHÍ TRÌ", "meaning": "Tâm trạng, cảm giác sảng khoái", "level": "N4", "breakdown": "気 (Khí) + 持 (Trì)", "mnemonic": "Cảm giác dễ chịu khi đắm mình trong làn nước ấm."},
        {"kanji": "気をつける", "hiragana": "きをつける (ki o tsukeru)", "sinoVietnamese": "KHÍ", "meaning": "Cẩn thận, chú ý an toàn", "level": "N5", "breakdown": "気 (Khí) + 付ける", "mnemonic": "Tập trung tinh thần chú ý an toàn giao thông."},
        {"kanji": "空気", "hiragana": "くうき (kūki)", "sinoVietnamese": "KHÔNG KHÍ", "meaning": "Không khí hít thở", "level": "N4", "breakdown": "空 (Không) + 気 (Khí)", "mnemonic": "Hít thở bầu không khí mát lành của rừng thông."},
        {"kanji": "人気", "hiragana": "にんき (ninki)", "sinoVietnamese": "NHÂN KHÍ", "meaning": "Được yêu thích, mến mộ", "level": "N4", "breakdown": "人 (Nhân) + 気 (Khí)", "mnemonic": "Món ăn được thực khách vô cùng ưa chuộng."},
        {"kanji": "気分", "hiragana": "きぶん (kibun)", "sinoVietnamese": "KHÍ PHÂN", "meaning": "Tâm trạng, trạng thái sức khỏe", "level": "N4", "breakdown": "気 (Khí) + 分 (Phân)", "mnemonic": "Tâm trạng phấn chấn sẵn sàng cho thử thách mới."},
        {"kanji": "気候", "hiragana": "きこう (kikō)", "sinoVietnamese": "KHÍ HẬU", "meaning": "Khí hậu vùng miền", "level": "N3", "breakdown": "気 (Khí) + 候 (Hậu)", "mnemonic": "Khí hậu ôn hòa bốn mùa tươi đẹp."},
        {"kanji": "雰囲気", "hiragana": "ふんいき (fun'iki)", "sinoVietnamese": "PHÂN VI KHÍ", "meaning": "Bầu không khí, cảm quan môi trường", "level": "N3", "breakdown": "雰 + 囲 + 気 (Khí)", "mnemonic": "Bầu không khí trang nhã ấm cúng trong quán trà."}
    ],
    85: [ # 水 / 氵 (Thủy - Nước, sông hồ, chất lỏng) - Tần suất cực cao (22 từ)
        {"kanji": "水", "hiragana": "みず / すい (mizu)", "sinoVietnamese": "THỦY", "meaning": "Nước trong lành", "level": "N5", "breakdown": "Dòng nước chảy chính giữa bắn bọt hai bên", "mnemonic": "Nguồn nước trong mát duy trì sự sống cho muôn loài."},
        {"kanji": "水曜日", "hiragana": "すいようび (suiyōbi)", "sinoVietnamese": "THỦY DIỆU NHẬT", "meaning": "Thứ tư", "level": "N5", "breakdown": "水 + 曜日", "mnemonic": "Ngày thứ tư của sao Thủy dịu êm."},
        {"kanji": "海", "hiragana": "うみ / かい (umi)", "sinoVietnamese": "HẢI", "meaning": "Biển cả mênh mông", "level": "N5", "breakdown": "氵 (Thủy) + Mỗi", "mnemonic": "Mỗi giọt nước đều tìm đường xuôi về biển lớn."},
        {"kanji": "池", "hiragana": "いけ (ike)", "sinoVietnamese": "TRÌ", "meaning": "Ao nước, hồ cảnh", "level": "N4", "breakdown": "氵 (Thủy) + Dã", "mnemonic": "Ao nước trong veo đàn cá koi tung tăng bơi lội."},
        {"kanji": "洗う", "hiragana": "あらう (arau)", "sinoVietnamese": "TẨY", "meaning": "Rửa tay, giặt giũ đồ", "level": "N5", "breakdown": "氵 (Thủy) + Tiên", "mnemonic": "Rửa tay sạch sẽ bằng xà phòng trước bữa ăn."},
        {"kanji": "泳ぐ", "hiragana": "およぐ (oyogu)", "sinoVietnamese": "VỊNH", "meaning": "Bơi lội tung tăng", "level": "N5", "breakdown": "氵 (Thủy) + Vĩnh", "mnemonic": "Đắm mình bơi lội thỏa thích dưới làn nước mát."},
        {"kanji": "湖", "hiragana": "みずうみ / こ (mizuumi)", "sinoVietnamese": "HỒ", "meaning": "Hồ nước ngọt tĩnh lặng", "level": "N3", "breakdown": "氵 (Thủy) + Cổ + Nguyệt", "mnemonic": "Mặt hồ êm đềm in bóng vầng trăng nghìn năm."},
        {"kanji": "汗", "hiragana": "あせ (ase)", "sinoVietnamese": "HÃN", "meaning": "Mồ hôi chảy ròng ròng", "level": "N3", "breakdown": "氵 (Thủy) + Can", "mnemonic": "Mồ hôi ướt đẫm lưng áo sau buổi tập hăng say."},
        {"kanji": "涙", "hiragana": "なみだ (namida)", "sinoVietnamese": "LỆ", "meaning": "Giọt nước mắt xúc động", "level": "N3", "breakdown": "氵 (Thủy) + Lệ", "mnemonic": "Giọt nước mắt nghẹn ngào vì quá đỗi hạnh phúc."},
        {"kanji": "港", "hiragana": "みなと / こう (minato)", "sinoVietnamese": "CẢNG", "meaning": "Bến cảng tàu thuyền neo đậu", "level": "N4", "breakdown": "氵 (Thủy) + Hạng", "mnemonic": "Bến cảng sầm uất tàu thuyền ra vào tấp nập."},
        {"kanji": "空港", "hiragana": "くうこう (kūkō)", "sinoVietnamese": "KHÔNG CẢNG", "meaning": "Sân bay quốc tế", "level": "N4", "breakdown": "空 (Không) + 港 (Cảng có 氵)", "mnemonic": "Cảng hàng không hiện đại tấp nập du khách."},
        {"kanji": "お湯", "hiragana": "おゆ (oyu)", "sinoVietnamese": "THANG", "meaning": "Nước sôi, nước nóng ngâm bồn", "level": "N5", "breakdown": "お + 湯 (Thang có 氵)", "mnemonic": "Nước nóng onsen thư giãn sau ngày dài mệt mỏi."},
        {"kanji": "決める", "hiragana": "きめる (kimeru)", "sinoVietnamese": "QUYẾT", "meaning": "Quyết định dứt khoát", "level": "N4", "breakdown": "氵 (Thủy) + Quyết", "mnemonic": "Dòng nước chảy xiết đưa ra quyết định không do dự."},
        {"kanji": "泣く", "hiragana": "なく (naku)", "sinoVietnamese": "KHỐC", "meaning": "Khóc than, rơi lệ", "level": "N4", "breakdown": "氵 (Thủy) + Lập", "mnemonic": "Đứng khóc rấm rứt nước mắt rơi lã chã."},
        {"kanji": "注ぐ", "hiragana": "そそぐ / つぐ (sosogu)", "sinoVietnamese": "CHÚ", "meaning": "Rót trà, trút nước, dồn tâm huyết", "level": "N3", "breakdown": "氵 (Thủy) + Chủ", "mnemonic": "Cẩn thận rót nước trà thơm đãi khách quý."},
        {"kanji": "油", "hiragana": "あぶら / ゆ (abura)", "sinoVietnamese": "DU", "meaning": "Dầu ăn, xăng dầu", "level": "N4", "breakdown": "氵 (Thủy) + Do", "mnemonic": "Những giọt dầu thực vật vàng óng ánh trên chảo."},
        {"kanji": "治る", "hiragana": "なおる (naoru)", "sinoVietnamese": "TRỊ", "meaning": "Khỏi bệnh hoàn toàn", "level": "N4", "breakdown": "氵 (Thủy) + Đài", "mnemonic": "Uống nhiều nước ấm giúp cơn sốt nhanh chóng lành hẳn."},
        {"kanji": "浅い", "hiragana": "あさい (asai)", "sinoVietnamese": "THIỂN", "meaning": "Nông cạn, mặt nước nông", "level": "N3", "breakdown": "氵 (Thủy) + Tiễn", "mnemonic": "Dòng suối nước nông nhìn thấy rõ từng hòn sỏi."},
        {"kanji": "深い", "hiragana": "ふかい (fukai)", "sinoVietnamese": "THÂM", "meaning": "Sâu thẳm, sâu sắc", "level": "N4", "breakdown": "氵 (Thủy) + Thâm", "mnemonic": "Vực nước sâu thẳm ẩn chứa bao điều kỳ bí."},
        {"kanji": "清い", "hiragana": "きよい (kiyoi)", "sinoVietnamese": "THANH", "meaning": "Trong trẻo, thanh khiết", "level": "N2", "breakdown": "氵 (Thủy) + Thanh", "mnemonic": "Dòng suối thanh khiết ngọt lành tuôn chảy từ khe núi."},
        {"kanji": "渡る", "hiragana": "わたる (wataru)", "sinoVietnamese": "ĐỘ", "meaning": "Băng qua cầu, qua đường", "level": "N5", "breakdown": "氵 (Thủy) + Độ", "mnemonic": "Băng qua cây cầu bắc ngang dòng sông thơ mộng."},
        {"kanji": "消す", "hiragana": "けす (kesu)", "sinoVietnamese": "TIÊU", "meaning": "Tắt đèn, dập tắt lửa", "level": "N5", "breakdown": "氵 (Thủy) + Tiêu", "mnemonic": "Dùng nước dập tắt hoàn toàn tàn lửa."}
    ]
}
print('Finished 81-85!')
