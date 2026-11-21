# -*- coding: utf-8 -*-
"""
Builder for Radicals 101 to 140
Every radical has at least 10 words, high frequency ones have 15-22 words.
"""
import json

data = {
    101: [ # 用 (Dụng - Sử dụng, công dụng)
        {"kanji": "用意", "hiragana": "ようい (yōi)", "sinoVietnamese": "DỤNG Ý", "meaning": "Chuẩn bị, sẵn sàng", "level": "N5", "breakdown": "用 (Dụng) + 意 (Ý)", "mnemonic": "Dùng ý nghĩ để chuẩn bị chu đáo trước mọi việc."},
        {"kanji": "利用", "hiragana": "りよう (riyō)", "sinoVietnamese": "LỢI DỤNG", "meaning": "Sử dụng, tận dụng", "level": "N4", "breakdown": "利 (Lợi) + 用 (Dụng)", "mnemonic": "Sử dụng những điều có lợi cho công việc."},
        {"kanji": "使用", "hiragana": "しよう (shiyō)", "sinoVietnamese": "SỬ DỤNG", "meaning": "Sử dụng, dùng đến", "level": "N3", "breakdown": "使 (Sử) + 用 (Dụng)", "mnemonic": "Sai khiến và sử dụng đồ vật hay nhân lực."},
        {"kanji": "作用", "hiragana": "さよう (sayō)", "sinoVietnamese": "TÁC DỤNG", "meaning": "Tác dụng, ảnh hưởng", "level": "N3", "breakdown": "作 (Tác) + 用 (Dụng)", "mnemonic": "Tạo ra công dụng và hiệu quả thực tế."},
        {"kanji": "信用", "hiragana": "しんよう (shin'yō)", "sinoVietnamese": "TÍN DỤNG", "meaning": "Lòng tin, tín nhiệm", "level": "N3", "breakdown": "信 (Tín) + 用 (Dụng)", "mnemonic": "Có lòng tin tưởng để trọng dụng giao phó."},
        {"kanji": "引用", "hiragana": "いんよう (in'yō)", "sinoVietnamese": "DẪN DỤNG", "meaning": "Trích dẫn tài liệu", "level": "N2", "breakdown": "引 (Dẫn) + 用 (Dụng)", "mnemonic": "Dẫn dắt và sử dụng câu từ của người khác."},
        {"kanji": "効用", "hiragana": "こうよう (kōyō)", "sinoVietnamese": "HIỆU DỤNG", "meaning": "Công hiệu, ích lợi", "level": "N2", "breakdown": "効 (Hiệu) + 用 (Dụng)", "mnemonic": "Hiệu quả và công dụng thực tế của đồ dùng."},
        {"kanji": "適用", "hiragana": "てきよう (tekiyō)", "sinoVietnamese": "THÍCH DỤNG", "meaning": "Áp dụng, ứng dụng", "level": "N1", "breakdown": "適 (Thích) + 用 (Dụng)", "mnemonic": "Thích hợp để đem vào áp dụng thực tế."},
        {"kanji": "費用", "hiragana": "ひよう (hiyō)", "sinoVietnamese": "PHÍ DỤNG", "meaning": "Chi phí, tổn phí", "level": "N3", "breakdown": "費 (Phí) + 用 (Dụng)", "mnemonic": "Tiền bạc chi phí dùng cho các mục đích."},
        {"kanji": "応用", "hiragana": "おうよう (ōyō)", "sinoVietnamese": "ỨNG DỤNG", "meaning": "Ứng dụng vào thực tiễn", "level": "N2", "breakdown": "応 (Ứng) + 用 (Dụng)", "mnemonic": "Ứng biến và áp dụng lý thuyết vào đời sống."},
        {"kanji": "軍用", "hiragana": "ぐんよう (gun'yō)", "sinoVietnamese": "QUÂN DỤNG", "meaning": "Dùng cho quân sự", "level": "N1", "breakdown": "軍 (Quân) + 用 (Dụng)", "mnemonic": "Đồ dùng trang bị cho quân đội."},
        {"kanji": "用事", "hiragana": "ようじ (yōji)", "sinoVietnamese": "DỤNG SỰ", "meaning": "Công việc bận, việc cần làm", "level": "N5", "breakdown": "用 (Dụng) + 事 (Sự)", "mnemonic": "Việc cần phải dùng thời gian để xử lý."}
    ],
    102: [ # 田 (Điền - Ruộng đồng)
        {"kanji": "田んぼ", "hiragana": "たんぼ (tanbo)", "sinoVietnamese": "ĐIỀN", "meaning": "Thửa ruộng lúa nước", "level": "N4", "breakdown": "田 (Điền)", "mnemonic": "Những ô ruộng vuông vắn màu mỡ trù phú."},
        {"kanji": "水田", "hiragana": "すいでん (suiden)", "sinoVietnamese": "THỦY ĐIỀN", "meaning": "Ruộng nước, ruộng lúa", "level": "N3", "breakdown": "水 (Thủy) + 田 (Điền)", "mnemonic": "Ruộng lúa có nguồn nước dồi dào chảy vào."},
        {"kanji": "油田", "hiragana": "ゆでん (yuden)", "sinoVietnamese": "DU ĐIỀN", "meaning": "Mỏ dầu, giếng dầu", "level": "N2", "breakdown": "油 (Du) + 田 (Điền)", "mnemonic": "Vùng đất trù phú khai thác vàng đen - dầu mỏ."},
        {"kanji": "田舎", "hiragana": "いなか (inaka)", "sinoVietnamese": "ĐIỀN XÁ", "meaning": "Quê hương, nông thôn", "level": "N4", "breakdown": "田 (Điền) + 舎 (Xá)", "mnemonic": "Những ngôi nhà mộc mạc bên cạnh cánh đồng quê."},
        {"kanji": "田畑", "hiragana": "たはた (tahata)", "sinoVietnamese": "ĐIỀN HẠC", "meaning": "Ruộng nương hoa màu", "level": "N2", "breakdown": "田 (Điền) + 畑 (Hạc - nương rẫy)", "mnemonic": "Bao gồm cả ruộng lúa nước và nương rẫy khô."},
        {"kanji": "田園", "hiragana": "でんえん (den'en)", "sinoVietnamese": "ĐIỀN VIÊN", "meaning": "Đồng ruộng vườn tược", "level": "N1", "breakdown": "田 (Điền) + 園 (Viên)", "mnemonic": "Khung cảnh vườn cây đồng ruộng thanh bình."},
        {"kanji": "新田", "hiragana": "しんでん (shinden)", "sinoVietnamese": "TÂN ĐIỀN", "meaning": "Ruộng mới khai hoang", "level": "N1", "breakdown": "新 (Tân) + 田 (Điền)", "mnemonic": "Mảnh ruộng mới được con người khai hoang trồng trọt."},
        {"kanji": "山田", "hiragana": "やまだ (yamada)", "sinoVietnamese": "SƠN ĐIỀN", "meaning": "Họ Yamada (Ruộng trên núi)", "level": "N5", "breakdown": "山 (Sơn) + 田 (Điền)", "mnemonic": "Họ phổ biến ở Nhật bắt nguồn từ thửa ruộng ven núi."},
        {"kanji": "塩田", "hiragana": "えんでん (enden)", "sinoVietnamese": "DIÊM ĐIỀN", "meaning": "Cánh đồng muối ven biển", "level": "N1", "breakdown": "塩 (Diêm) + 田 (Điền)", "mnemonic": "Ruộng trải nước biển phơi nắng lấy hạt muối trắng."},
        {"kanji": "苗代田", "hiragana": "なわしろだ (nawashiroda)", "sinoVietnamese": "MIÊU ĐẠI ĐIỀN", "meaning": "Ruộng ươm mạ non", "level": "N1", "breakdown": "苗 (Miêu) + 代 (Đại) + 田 (Điền)", "mnemonic": "Mảnh ruộng chuyên dùng để ươm những nhánh mạ non."}
    ],
    103: [ # 疋 (Thất / Sơ - Đơn vị đo vải, bàn chân)
        {"kanji": "疋", "hiragana": "ひき (hiki)", "sinoVietnamese": "THẤT", "meaning": "Cuộn vải, sấp vải", "level": "N1", "breakdown": "Bộ 疋 (Thất)", "mnemonic": "Cuộn vải dài đo bằng bước chân đi."},
        {"kanji": "一疋", "hiragana": "いっぴき (ippiki)", "sinoVietnamese": "NHẤT THẤT", "meaning": "Một cuộn vải dệt", "level": "N1", "breakdown": "一 (Nhất) + 疋 (Thất)", "mnemonic": "Một cuộn vải tơ tằm nguyên vẹn."},
        {"kanji": "疎通", "hiragana": "そつう (sotsū)", "sinoVietnamese": "SƠ THÔNG", "meaning": "Thông suốt, hiểu ý nhau", "level": "N1", "breakdown": "Chứa gốc chữ 疋 trong 疎 (Sơ)", "mnemonic": "Ý nghĩ thông suốt liền mạch không ngăn cách."},
        {"kanji": "疎遠", "hiragana": "そえん (soen)", "sinoVietnamese": "SƠ VIỄN", "meaning": "Xa cách, lạnh nhạt", "level": "N1", "breakdown": "Chứa gốc 疋 trong 疎 (Sơ) + 遠 (Viễn)", "mnemonic": "Khoảng cách bước chân ngày càng xa vời."},
        {"kanji": "楚々", "hiragana": "そそ (soso)", "sinoVietnamese": "SỞ SỞ", "meaning": "Thanh tú, duyên dáng", "level": "N1", "breakdown": "Chứa bộ 疋", "mnemonic": "Dáng vẻ thanh tao duyên dáng như lụa mềm."},
        {"kanji": "疎外", "hiragana": "そがい (sogai)", "sinoVietnamese": "SƠ NGOẠI", "meaning": "Xa lánh, tẩy chay", "level": "N1", "breakdown": "疎 (Sơ) + 外 (Ngoại)", "mnemonic": "Đẩy ra bên ngoài vòng bè bạn."},
        {"kanji": "疎開", "hiragana": "そかい (sokai)", "sinoVietnamese": "SƠ KHAI", "meaning": "Sơ tán, tản cư", "level": "N1", "breakdown": "疎 (Sơ) + 開 (Khai)", "mnemonic": "Di chuyển tản mát để tránh chiến tranh bom đạn."},
        {"kanji": "過疎", "hiragana": "かそ (kaso)", "sinoVietnamese": "QUÁ SƠ", "meaning": "Thưa thớt dân cư", "level": "N1", "breakdown": "過 (Quá) + 疎 (Sơ)", "mnemonic": "Dân số giảm sút quá mức ở vùng nông thôn."},
        {"kanji": "疎忽", "hiragana": "そこつ (sokotsu)", "sinoVietnamese": "SƠ HỐT", "meaning": "Sơ suất, bất cẩn", "level": "N1", "breakdown": "疎 (Sơ) + 忽 (Hốt)", "mnemonic": "Bất cẩn lơ là làm hỏng việc."},
        {"kanji": "基礎", "hiragana": "きそ (kiso)", "sinoVietnamese": "CƠ SỞ", "meaning": "Nền tảng căn bản", "level": "N2", "breakdown": "基 (Cơ) + 礎 (Sở - chứa 疋 và 石)", "mnemonic": "Hòn đá tảng vững vàng làm móng nhà."}
    ],
    104: [ # 疒 (Nạch - Bệnh tật, đau ốm)
        {"kanji": "病気", "hiragana": "びょうき (byōki)", "sinoVietnamese": "BỆNH KHÍ", "meaning": "Bệnh tật, ốm đau", "level": "N5", "breakdown": "病 (Bệnh - bộ 疒) + 気 (Khí)", "mnemonic": "Khí sắc suy yếu phải nằm trên giường bệnh."},
        {"kanji": "病院", "hiragana": "びょういん (byōin)", "sinoVietnamese": "BỆNH VIỆN", "meaning": "Bệnh viện", "level": "N5", "breakdown": "病 (Bệnh) + 院 (Viện)", "mnemonic": "Nơi các bác sĩ chữa trị cho bệnh nhân."},
        {"kanji": "痛み", "hiragana": "いたみ (itami)", "sinoVietnamese": "THỐNG", "meaning": "Cơn đau, sự đau đớn", "level": "N4", "breakdown": "痛 (Thống - bộ 疒)", "mnemonic": "Cơn đau đớn như bị tên bắn trúng khi nằm giường bệnh."},
        {"kanji": "疲労", "hiragana": "ひろう (hirō)", "sinoVietnamese": "BÌ LAO", "meaning": "Mệt mỏi kiệt sức", "level": "N2", "breakdown": "疲 (Bì - bộ 疒) + 労 (Lao)", "mnemonic": "Lao lực quá sức dẫn đến mỏi mệt kiệt quệ."},
        {"kanji": "症状", "hiragana": "しょうじょう (shōjō)", "sinoVietnamese": "CHỨNG TRẠNG", "meaning": "Triệu chứng bệnh tật", "level": "N2", "breakdown": "症 (Chứng - bộ 疒) + 状 (Trạng)", "mnemonic": "Tình trạng biểu hiện của căn bệnh."},
        {"kanji": "伝染病", "hiragana": "でんせんびょう (densenbyō)", "sinoVietnamese": "TRUYỀN NHIỄM BỆNH", "meaning": "Bệnh truyền nhiễm", "level": "N1", "breakdown": "伝 (Truyền) + 染 (Nhiễm) + 病 (Bệnh)", "mnemonic": "Bệnh lây lan từ người này sang người khác."},
        {"kanji": "痴呆", "hiragana": "ちほう (chihō)", "sinoVietnamese": "SI NGỐC", "meaning": "Chứng sa sút trí tuệ", "level": "N1", "breakdown": "痴 (Si - bộ 疒) + 呆 (Ngốc)", "mnemonic": "Bệnh suy giảm nhận thức ở người cao tuổi."},
        {"kanji": "痛覚", "hiragana": "つうかく (tsūkaku)", "sinoVietnamese": "THỐNG GIÁC", "meaning": "Cảm giác đau đớn", "level": "N1", "breakdown": "痛 (Thống) + 覚 (Giác)", "mnemonic": "Giác quan cảm nhận thấy sự đau đớn."},
        {"kanji": "疾患", "hiragana": "しっかん (shikkan)", "sinoVietnamese": "TẬT HOẠN", "meaning": "Căn bệnh, chứng tật", "level": "N1", "breakdown": "疾 (Tật - bộ 疒) + 患 (Hoạn)", "mnemonic": "Bệnh tật gây lo lắng phiền muộn."},
        {"kanji": "痒み", "hiragana": "かゆみ (kayumi)", "sinoVietnamese": "DƯƠNG", "meaning": "Cơn ngứa ngáy", "level": "N1", "breakdown": "痒 (Dương - bộ 疒)", "mnemonic": "Cảm giác ngứa ngáy khó chịu trên da."},
        {"kanji": "療養", "hiragana": "りょうよう (ryōyō)", "sinoVietnamese": "LIỆU DƯỠNG", "meaning": "Dưỡng bệnh, hồi phục", "level": "N1", "breakdown": "療 (Liệu - bộ 疒) + 養 (Dưỡng)", "mnemonic": "Chăm sóc tĩnh dưỡng để bệnh mau lành."},
        {"kanji": "疫病", "hiragana": "えきびょう (ekibyō)", "sinoVietnamese": "DỊCH BỆNH", "meaning": "Dịch bệnh bùng phát", "level": "N1", "breakdown": "疫 (Dịch - bộ 疒) + 病 (Bệnh)", "mnemonic": "Dịch bệnh lây lan khắp mọi nẻo đường."}
    ],
    105: [ # 癶 (Bát - Hai chân rẽ ra, bước đi ngược lại)
        {"kanji": "発車", "hiragana": "はっしゃ (hassha)", "sinoVietnamese": "PHÁT XA", "meaning": "Xe khởi hành lăn bánh", "level": "N4", "breakdown": "発 (Phát - bộ 癶) + 車 (Xa)", "mnemonic": "Xe chuyển động bánh lăn đi ra tiền tuyến."},
        {"kanji": "発表", "hiragana": "はっぴょう (happyō)", "sinoVietnamese": "PHÁT BIỂU", "meaning": "Phát biểu, công bố", "level": "N3", "breakdown": "発 (Phát) + 表 (Biểu)", "mnemonic": "Bộc lộ và công bố ý kiến trước mọi người."},
        {"kanji": "発見", "hiragana": "はっけん (hakken)", "sinoVietnamese": "PHÁT KIẾN", "meaning": "Tìm ra, phát hiện", "level": "N3", "breakdown": "発 (Phát) + 見 (Kiến)", "mnemonic": "Nhìn thấy và phát hiện ra điều mới mẻ."},
        {"kanji": "登る", "hiragana": "のぼる (noboru)", "sinoVietnamese": "ĐĂNG", "meaning": "Leo trèo, trèo lên núi", "level": "N5", "breakdown": "登 (Đăng - bộ 癶)", "mnemonic": "Hai chân bước nhịp nhàng trèo lên đỉnh núi."},
        {"kanji": "登山", "hiragana": "とざん (tozan)", "sinoVietnamese": "ĐĂNG SƠN", "meaning": "Việc leo núi", "level": "N3", "breakdown": "登 (Đăng) + 山 (Sơn)", "mnemonic": "Hành trình đôi chân chinh phục đỉnh cao."},
        {"kanji": "発展", "hiragana": "はってん (hatten)", "sinoVietnamese": "PHÁT TRIỂN", "meaning": "Phát triển thịnh vượng", "level": "N3", "breakdown": "発 (Phát) + 展 (Triển)", "mnemonic": "Mở rộng và tiến lên phía trước mạnh mẽ."},
        {"kanji": "発売", "hiragana": "はつばい (hatsubai)", "sinoVietnamese": "PHÁT MẠI", "meaning": "Phát hành, mở bán", "level": "N3", "breakdown": "発 (Phát) + 売 (Mại)", "mnemonic": "Đưa sản phẩm mới ra thị trường bày bán."},
        {"kanji": "登校", "hiragana": "とうこう (tōkō)", "sinoVietnamese": "ĐĂNG HIỆU", "meaning": "Đến trường đi học", "level": "N2", "breakdown": "登 (Đăng) + 校 (Hiệu)", "mnemonic": "Cất bước tới ngôi trường để học hỏi."},
        {"kanji": "発作", "hiragana": "ほっさ (hossa)", "sinoVietnamese": "PHÁT TÁC", "meaning": "Cơn phát tác bệnh", "level": "N1", "breakdown": "発 (Phát) + 作 (Tác)", "mnemonic": "Cơn đau đột ngột bộc phát trỗi dậy."},
        {"kanji": "登録", "hiragana": "とうろく (tōroku)", "sinoVietnamese": "ĐĂNG LỤC", "meaning": "Đăng ký danh tính", "level": "N3", "breakdown": "登 (Đăng) + 録 (Lục)", "mnemonic": "Ghi chép tên tuổi vào danh sách chính thức."}
    ],
    106: [ # 白 (Bạch - Màu trắng, trong sáng)
        {"kanji": "白い", "hiragana": "しろい (shiroi)", "sinoVietnamese": "BẠCH", "meaning": "Màu trắng tinh khiết", "level": "N5", "breakdown": "白 (Bạch)", "mnemonic": "Tia nắng mặt trời chiếu rọi hạt ngọc trắng ngần."},
        {"kanji": "明白", "hiragana": "めいはく (meihaku)", "sinoVietnamese": "MINH BẠCH", "meaning": "Rõ ràng, minh bạch", "level": "N2", "breakdown": "明 (Minh) + 白 (Bạch)", "mnemonic": "Sáng sủa và trong trắng, không có chút mập mờ."},
        {"kanji": "告白", "hiragana": "こくはく (kokuhaku)", "sinoVietnamese": "CÁO BẠCH", "meaning": "Tỏ tình, thú nhận thật lòng", "level": "N2", "breakdown": "告 (Cáo) + 白 (Bạch)", "mnemonic": "Bày tỏ nỗi lòng chân thật trong trắng với người thương."},
        {"kanji": "白鳥", "hiragana": "はくちょう (hakuchō)", "sinoVietnamese": "BẠCH ĐIỂU", "meaning": "Chim thiên nga trắng", "level": "N2", "breakdown": "白 (Bạch) + 鳥 (Điểu)", "mnemonic": "Loài chim có bộ lông trắng tinh khiết tuyệt đẹp."},
        {"kanji": "空白", "hiragana": "くうはく (kūhaku)", "sinoVietnamese": "KHÔNG BẠCH", "meaning": "Chỗ trống, khoảng trống", "level": "N2", "breakdown": "空 (Không) + 白 (Bạch)", "mnemonic": "Khoảng giấy trắng trống trơn chưa ghi chép."},
        {"kanji": "潔白", "hiragana": "けっぱく (keppaku)", "sinoVietnamese": "KHIẾT BẠCH", "meaning": "Trong sạch, vô tội", "level": "N1", "breakdown": "潔 (Khiết) + 白 (Bạch)", "mnemonic": "Tâm hồn trong sạch không vướng bụi trần."},
        {"kanji": "面白い", "hiragana": "おもしろい (omoshiroi)", "sinoVietnamese": "DIỆN BẠCH", "meaning": "Thú vị, hấp dẫn", "level": "N5", "breakdown": "面 (Diện) + 白 (Bạch)", "mnemonic": "Nét mặt sáng bừng lên vì điều thú vị vui nhộn."},
        {"kanji": "白紙", "hiragana": "はくし (hakushi)", "sinoVietnamese": "BẠCH CHỈ", "meaning": "Tờ giấy trắng tinh", "level": "N2", "breakdown": "白 (Bạch) + 紙 (Chỉ)", "mnemonic": "Trang giấy trắng chưa viết chữ nào."},
        {"kanji": "純白", "hiragana": "じゅんぱく (junpaku)", "sinoVietnamese": "THUẦN BẠCH", "meaning": "Trắng muốt tinh khôi", "level": "N1", "breakdown": "純 (Thuần) + 白 (Bạch)", "mnemonic": "Sắc trắng tinh khôi không chút pha tạp."},
        {"kanji": "白髪", "hiragana": "しらが (shiraga)", "sinoVietnamese": "BẠCH PHÁT", "meaning": "Mái tóc bạc phơ", "level": "N2", "breakdown": "白 (Bạch) + 髪 (Phát)", "mnemonic": "Mái tóc nhuộm màu sương gió bạc trắng."}
    ],
    107: [ # 皮 (Bì - Da, vỏ bọc)
        {"kanji": "皮", "hiragana": "かわ (kawa)", "sinoVietnamese": "BÌ", "meaning": "Làn da, vỏ quả", "level": "N3", "breakdown": "皮 (Bì)", "mnemonic": "Bàn tay lột tấm da thú bên ngoài."},
        {"kanji": "皮膚", "hiragana": "ひふ (hifu)", "sinoVietnamese": "BÌ PHU", "meaning": "Da người, làn da", "level": "N2", "breakdown": "皮 (Bì) + 膚 (Phu)", "mnemonic": "Lớp da bao bọc bên ngoài cơ thể con người."},
        {"kanji": "皮肉", "hiragana": "ひにく (hiniku)", "sinoVietnamese": "BÌ NHỤC", "meaning": "Châm chọc, mỉa mai", "level": "N2", "breakdown": "皮 (Bì) + 肉 (Nhục)", "mnemonic": "Chỉ chạm ngoài da thịt mà làm nhói lòng."},
        {"kanji": "毛皮", "hiragana": "けがわ (kegawa)", "sinoVietnamese": "MAO BÌ", "meaning": "Áo lông thú, da lông", "level": "N2", "breakdown": "毛 (Mao) + 皮 (Bì)", "mnemonic": "Tấm da thú có lớp lông ấm áp giữ nhiệt."},
        {"kanji": "剥皮", "hiragana": "はくひ (hakuhi)", "sinoVietnamese": "BÁC BÌ", "meaning": "Lột da, bóc vỏ cây", "level": "N1", "breakdown": "剥 (Bác) + 皮 (Bì)", "mnemonic": "Hành động bóc tách lớp vỏ bọc ngoài."},
        {"kanji": "波及", "hiragana": "はきゅう (hakyū)", "sinoVietnamese": "BA CẬP", "meaning": "Lan truyền ảnh hưởng", "level": "N1", "breakdown": "Chứa chữ 波 (có 皮)", "mnemonic": "Sóng gợn lan rộng khắp mặt nước."},
        {"kanji": "疲弊", "hiragana": "ひへい (hihei)", "sinoVietnamese": "BÌ TỆ", "meaning": "Kiệt quệ, suy thoái", "level": "N1", "breakdown": "Chứa chữ 疲 (có 皮)", "mnemonic": "Cơ thể rã rời da bọc xương kiệt quệ."},
        {"kanji": "表皮", "hiragana": "ひょうひ (hyōhi)", "sinoVietnamese": "BIỂU BÌ", "meaning": "Lớp biểu bì ngoài cùng", "level": "N1", "breakdown": "表 (Biểu) + 皮 (Bì)", "mnemonic": "Tầng da ngoài cùng bảo vệ cơ thể."},
        {"kanji": "皮革", "hiragana": "ひかく (hikaku)", "sinoVietnamese": "BÌ CÁCH", "meaning": "Đồ da thuộc thủ công", "level": "N1", "breakdown": "皮 (Bì) + 革 (Cách)", "mnemonic": "Da sống và da đã qua xử lý thuộc da."},
        {"kanji": "皮算用", "hiragana": "かわざんよう (kawazan'yō)", "sinoVietnamese": "BÌ TOÁN DỤNG", "meaning": "Tính cua trong lỗ, đếm da thú chưa săn", "level": "N1", "breakdown": "皮 (Bì) + 算用 (Toán dụng)", "mnemonic": "Thành ngữ tính tiền bán da khi thú còn trong rừng."}
    ],
    108: [ # 皿 (Mãnh - Bát đĩa, khay đồ)
        {"kanji": "お皿", "hiragana": "おさら (osara)", "sinoVietnamese": "MÃNH", "meaning": "Cái đĩa đựng thức ăn", "level": "N5", "breakdown": "皿 (Mãnh)", "mnemonic": "Chiếc đĩa đáy bằng có thành dựng lên."},
        {"kanji": "灰皿", "hiragana": "はいざら (haizara)", "sinoVietnamese": "HÔI MÃNH", "meaning": "Gạt tàn thuốc lá", "level": "N4", "breakdown": "灰 (Hôi - tro) + 皿 (Mãnh)", "mnemonic": "Chiếc đĩa chuyên dùng để đựng tàn thuốc lá."},
        {"kanji": "盆", "hiragana": "ぼん (bon)", "sinoVietnamese": "BỒN", "meaning": "Cái khay, mâm đựng / Lễ Vu Lan", "level": "N3", "breakdown": "分 (Phân) + 皿 (Mãnh)", "mnemonic": "Chiếc khay chia nhỏ đồ ăn đựng lên trên."},
        {"kanji": "盗難", "hiragana": "とうなん (tōnan)", "sinoVietnamese": "ĐẠO NAN", "meaning": "Vụ trộm cắp, tai họa mất cắp", "level": "N3", "breakdown": "盗 (Đạo - có bộ 皿) + 難 (Nan)", "mnemonic": "Kẻ trộm thèm khát nuốt nước bọt vét sạch bát đĩa đồ đạc."},
        {"kanji": "盛り皿", "hiragana": "もりざら (morizara)", "sinoVietnamese": "THỊNH MÃNH", "meaning": "Đĩa bày biện thức ăn lớn", "level": "N2", "breakdown": "盛 (Thịnh - có bộ 皿) + 皿 (Mãnh)", "mnemonic": "Đĩa lớn bày biện thức ăn thịnh soạn."},
        {"kanji": "大皿", "hiragana": "おおざら (ōzara)", "sinoVietnamese": "ĐẠI MÃNH", "meaning": "Đĩa cỡ lớn cho bàn tiệc", "level": "N3", "breakdown": "大 (Đại) + 皿 (Mãnh)", "mnemonic": "Chiếc đĩa có kích thước to rộng."},
        {"kanji": "小皿", "hiragana": "こざら (kozara)", "sinoVietnamese": "TIỂU MÃNH", "meaning": "Đĩa nhỏ chấm gia vị", "level": "N3", "breakdown": "小 (Tiểu) + 皿 (Mãnh)", "mnemonic": "Chiếc đĩa nhỏ xinh đựng nước chấm."},
        {"kanji": "取り皿", "hiragana": "とりざら (torizara)", "sinoVietnamese": "THỦ MÃNH", "meaning": "Đĩa chia phần ăn", "level": "N2", "breakdown": "取 (Thủ) + 皿 (Mãnh)", "mnemonic": "Đĩa dùng để gắp thức ăn chung về phần mình."},
        {"kanji": "皿洗い", "hiragana": "さらあらい (saraarai)", "sinoVietnamese": "MÃNH TẨY", "meaning": "Công việc rửa bát đĩa", "level": "N3", "breakdown": "皿 (Mãnh) + 洗 (Tẩy)", "mnemonic": "Rửa sạch dầu mỡ trên bát đĩa sau bữa ăn."},
        {"kanji": "塩皿", "hiragana": "しおざら (shiozara)", "sinoVietnamese": "DIÊM MÃNH", "meaning": "Đĩa đựng muối trắng cúng", "level": "N1", "breakdown": "塩 (Diêm) + 皿 (Mãnh)", "mnemonic": "Chiếc đĩa nhỏ đựng muối xua đuổi tà khí."}
    ],
    109: [ # 目 (Mục - Con mắt, cái nhìn)
        {"kanji": "目", "hiragana": "め (me)", "sinoVietnamese": "MỤC", "meaning": "Đôi mắt", "level": "N5", "breakdown": "目 (Mục)", "mnemonic": "Hình dáng đôi mắt tròn xoe mở to nhìn đời."},
        {"kanji": "目的", "hiragana": "もくてき (mokuteki)", "sinoVietnamese": "MỤC ĐÍCH", "meaning": "Mục đích, đích nhắm đến", "level": "N4", "breakdown": "目 (Mục) + 的 (Đích)", "mnemonic": "Tâm điểm mà đôi mắt luôn dõi theo hướng tới."},
        {"kanji": "目標", "hiragana": "もくひょう (mokuhyō)", "sinoVietnamese": "MỤC TIÊU", "meaning": "Mục tiêu phấn đấu", "level": "N3", "breakdown": "目 (Mục) + 標 (Tiêu)", "mnemonic": "Cột mốc đặt ra để mắt nhìn vào mà cố gắng."},
        {"kanji": "目覚まし", "hiragana": "めざまし (mezamashi)", "sinoVietnamese": "MỤC GIÁC", "meaning": "Chuông báo thức thức giấc", "level": "N4", "breakdown": "目 (Mục) + 覚 (Giác)", "mnemonic": "Đánh thức đôi mắt tỉnh dậy sau giấc ngủ say."},
        {"kanji": "注目", "hiragana": "ちゅうもく (chūmoku)", "sinoVietnamese": "CHÚ MỤC", "meaning": "Tập trung chú ý theo dõi", "level": "N3", "breakdown": "注 (Chú) + 目 (Mục)", "mnemonic": "Rót mọi ánh nhìn của mắt vào một điểm."},
        {"kanji": "科目", "hiragana": "かもく (kamoku)", "sinoVietnamese": "KHOA MỤC", "meaning": "Môn học, học phần", "level": "N3", "breakdown": "科 (Khoa) + 目 (Mục)", "mnemonic": "Từng mục kiến thức trong chương trình giảng dạy."},
        {"kanji": "着目", "hiragana": "ちゃくもく (chakumoku)", "sinoVietnamese": "TRƯỚC MỤC", "meaning": "Để mắt tới, chú trọng", "level": "N2", "breakdown": "着 (Trước) + 目 (Mục)", "mnemonic": "Dừng ánh mắt lại trên điểm mấu chốt."},
        {"kanji": "盲目", "hiragana": "もうもく (mōmoku)", "sinoVietnamese": "MANH MỤC", "meaning": "Mù quáng, mù lòa", "level": "N1", "breakdown": "盲 (Manh - có bộ 目) + 目 (Mục)", "mnemonic": "Mắt không nhìn thấy được ánh sáng chân lý."},
        {"kanji": "面目", "hiragana": "めんぼく (menboku)", "sinoVietnamese": "DIỆN MỤC", "meaning": "Thể diện, danh dự", "level": "N1", "breakdown": "面 (Diện) + 目 (Mục)", "mnemonic": "Mặt mũi và danh dự trước mắt bàn dân thiên hạ."},
        {"kanji": "目次", "hiragana": "もくじ (mokuji)", "sinoVietnamese": "MỤC THỨ", "meaning": "Mục lục cuốn sách", "level": "N3", "breakdown": "目 (Mục) + 次 (Thứ)", "mnemonic": "Thứ tự các mục được liệt kê rõ ràng đầu sách."}
    ],
    110: [ # 矛 (Mâu - Cây giáo nhọn)
        {"kanji": "矛盾", "hiragana": "むじゅん (mujun)", "sinoVietnamese": "MÂU THUẪN", "meaning": "Mâu thuẫn, trái ngược", "level": "N3", "breakdown": "矛 (Mâu - ngọn giáo) + 盾 (Thuẫn - cái khiên)", "mnemonic": "Ngọn giáo đâm thủng mọi khiên vs cái khiên đỡ mọi giáo."},
        {"kanji": "矛先", "hiragana": "ほこさき (hokosaki)", "sinoVietnamese": "MÂU TIÊN", "meaning": "Mũi giáo nhọn, mũi dùi công kích", "level": "N1", "breakdown": "矛 (Mâu) + 先 (Tiên)", "mnemonic": "Chĩa mũi giáo nhọn vào đối thủ công kích."},
        {"kanji": "務める", "hiragana": "つとめる (tsutomeru)", "sinoVietnamese": "VỤ", "meaning": "Đảm nhiệm nhiệm vụ", "level": "N3", "breakdown": "務 (chứa bộ 矛) + 力 (Lực)", "mnemonic": "Cầm giáo dốc sức làm tròn bổn phận."},
        {"kanji": "柔道", "hiragana": "じゅうどう (jūdō)", "sinoVietnamese": "NHU ĐẠO", "meaning": "Môn võ Judo", "level": "N3", "breakdown": "柔 (Nhu - chứa bộ 矛) + 道 (Đạo)", "mnemonic": "Mềm dẻo uốn nắn như cán giáo tre bền bỉ."},
        {"kanji": "義務", "hiragana": "ぎむ (gimu)", "sinoVietnamese": "NGHĨA VỤ", "meaning": "Nghĩa vụ, bổn phận", "level": "N3", "breakdown": "義 (Nghĩa) + 務 (Vụ - có bộ 矛)", "mnemonic": "Bổn phận chính đáng người lính cầm giáo giữ nước."},
        {"kanji": "事務所", "hiragana": "じむしょ (jimusho)", "sinoVietnamese": "SỰ VỤ SỞ", "meaning": "Văn phòng làm việc", "level": "N4", "breakdown": "事 (Sự) + 務 (Vụ) + 所 (Sở)", "mnemonic": "Nơi giải quyết mọi sự vụ công tác hành chính."},
        {"kanji": "公務員", "hiragana": "こうむいん (kōmuin)", "sinoVietnamese": "CÔNG VỤ VIÊN", "meaning": "Công chức nhà nước", "level": "N3", "breakdown": "公 (Công) + 務 (Vụ) + 員 (Viên)", "mnemonic": "Người đảm nhận công vụ phục vụ đất nước."},
        {"kanji": "柔軟", "hiragana": "じゅうなん (jūnan)", "sinoVietnamese": "NHU NHUYỄN", "meaning": "Linh hoạt, dẻo dai", "level": "N2", "breakdown": "柔 (Nhu - có 矛) + 軟 (Nhuyễn)", "mnemonic": "Dẻo dai mềm mại ứng phó mọi tình huống."},
        {"kanji": "財務", "hiragana": "ざいむ (zaimu)", "sinoVietnamese": "TÀI VỤ", "meaning": "Tài chính kế toán", "level": "N1", "breakdown": "財 (Tài) + 務 (Vụ)", "mnemonic": "Công việc quản lý dòng tiền tài chính."},
        {"kanji": "教務", "hiragana": "きょうむ (kyōmu)", "sinoVietnamese": "GIÁO VỤ", "meaning": "Công tác giáo vụ nhà trường", "level": "N1", "breakdown": "教 (Giáo) + 務 (Vụ)", "mnemonic": "Công tác quản lý việc dạy và học."}
    ],
    111: [ # 矢 (Thỉ - Mũi tên)
        {"kanji": "矢", "hiragana": "や (ya)", "sinoVietnamese": "THỈ", "meaning": "Mũi tên bay vút", "level": "N3", "breakdown": "矢 (Thỉ)", "mnemonic": "Mũi tên có đầu nhọn và lông vũ đuôi bay thẳng."},
        {"kanji": "弓矢", "hiragana": "ゆみや (yumiya)", "sinoVietnamese": "CUNG THỈ", "meaning": "Cung tên thiện xạ", "level": "N2", "breakdown": "弓 (Cung) + 矢 (Thỉ)", "mnemonic": "Cây cung kéo căng bắn mũi tên lao vút đi."},
        {"kanji": "矢印", "hiragana": "やじるし (yajirushi)", "sinoVietnamese": "THỈ ẤN", "meaning": "Dấu mũi tên chỉ hướng", "level": "N3", "breakdown": "矢 (Thỉ) + 印 (Ấn)", "mnemonic": "Ký hiệu hình mũi tên dẫn dắt phương hướng."},
        {"kanji": "知る", "hiragana": "しる (shiru)", "sinoVietnamese": "TRI", "meaning": "Biết, hiểu biết", "level": "N5", "breakdown": "矢 (Thỉ) + 口 (Khẩu)", "mnemonic": "Lời nói ra nhanh và chuẩn xác như mũi tên bắn."},
        {"kanji": "短い", "hiragana": "みじかい (mijikai)", "sinoVietnamese": "ĐOẢN", "meaning": "Ngắn ngủi", "level": "N5", "breakdown": "矢 (Thỉ) + 豆 (Đậu)", "mnemonic": "Mũi tên ngắn như hạt đậu."},
        {"kanji": "知識", "hiragana": "ちしき (chishiki)", "sinoVietnamese": "TRI THỨC", "meaning": "Tri thức, hiểu biết", "level": "N3", "breakdown": "知 (Tri) + 識 (Thức)", "mnemonic": "Kiến thức sâu rộng nhận biết mọi điều."},
        {"kanji": "短縮", "hiragana": "たんしゅく (tanshuku)", "sinoVietnamese": "ĐOẢN SÚC", "meaning": "Rút ngắn thời gian/khoảng cách", "level": "N2", "breakdown": "短 (Đoản) + 縮 (Súc)", "mnemonic": "Thu ngắn khoảng cách giúp tiết kiệm công sức."},
        {"kanji": "矯正", "hiragana": "きょうせい (kyōsei)", "sinoVietnamese": "KIỂU CHÍNH", "meaning": "Uốn nắn, chỉnh sửa ngay ngắn", "level": "N1", "breakdown": "矯 (Kiểu - có bộ 矢) + 正 (Chính)", "mnemonic": "Uốn cho thẳng thắn như mũi tên săn bắn."},
        {"kanji": "矢継ぎ早", "hiragana": "やつぎばや (yatsugibaya)", "sinoVietnamese": "THỈ KẾ TẢO", "meaning": "Dồn dập liên tiếp như mưa tên", "level": "N1", "breakdown": "矢 (Thỉ) + 継 (Kế) + 早 (Tảo)", "mnemonic": "Bắn tên liên hoàn không ngơi nghỉ."},
        {"kanji": "知人", "hiragana": "ちじん (chijin)", "sinoVietnamese": "TRI NHÂN", "meaning": "Người quen biết", "level": "N3", "breakdown": "知 (Tri) + 人 (Nhân)", "mnemonic": "Người mình quen mặt biết tên."}
    ],
    112: [ # 石 (Thạch - Hòn đá, đá tảng)
        {"kanji": "石", "hiragana": "いし (ishi)", "sinoVietnamese": "THẠCH", "meaning": "Hòn đá cuội, đá tảng", "level": "N5", "breakdown": "石 (Thạch)", "mnemonic": "Hòn đá rơi từ vách đá cheo leo xuống sườn núi."},
        {"kanji": "石油", "hiragana": "せきゆ (sekiyu)", "sinoVietnamese": "THẠCH DU", "meaning": "Dầu mỏ, dầu thô", "level": "N4", "breakdown": "石 (Thạch) + 油 (Du)", "mnemonic": "Thứ dầu quý giá khai thác từ tầng đá sâu."},
        {"kanji": "化石", "hiragana": "かせき (kaseki)", "sinoVietnamese": "HÓA THẠCH", "meaning": "Hóa thạch cổ sinh vật", "level": "N2", "breakdown": "化 (Hóa) + 石 (Thạch)", "mnemonic": "Xương sinh vật biến đổi ngàn năm thành đá cứng."},
        {"kanji": "磁石", "hiragana": "じしゃく (jishaku)", "sinoVietnamese": "TỪ THẠCH", "meaning": "Nam châm hút sắt", "level": "N2", "breakdown": "磁 (Từ) + 石 (Thạch)", "mnemonic": "Hòn đá có từ tính hút kim loại mạnh mẽ."},
        {"kanji": "宝石", "hiragana": "ほうせき (hōseki)", "sinoVietnamese": "BẢO THẠCH", "meaning": "Đá quý lấp lánh", "level": "N2", "breakdown": "宝 (Bảo) + 石 (Thạch)", "mnemonic": "Viên đá quý báu tỏa ánh hào quang."},
        {"kanji": "石炭", "hiragana": "せきたん (sekitan)", "sinoVietnamese": "THẠCH THAN", "meaning": "Than đá đốt nhiệt", "level": "N3", "breakdown": "石 (Thạch) + 炭 (Than)", "mnemonic": "Than đen như đá dùng làm chất đốt công nghiệp."},
        {"kanji": "石鹸", "hiragana": "せっけん (sekken)", "sinoVietnamese": "THẠCH KIỀM", "meaning": "Xà phòng bánh", "level": "N4", "breakdown": "石 (Thạch) + 鹸 (Kiềm)", "mnemonic": "Cục xà bông cứng như đá tắm sạch sẽ thơm tho."},
        {"kanji": "礎石", "hiragana": "そせき (soseki)", "sinoVietnamese": "SỞ THẠCH", "meaning": "Đá móng, nền tảng cốt lõi", "level": "N1", "breakdown": "礎 (Sở) + 石 (Thạch)", "mnemonic": "Tảng đá đặt nền móng dựng xây cơ đồ."},
        {"kanji": "投石", "hiragana": "とうせき (tōseki)", "sinoVietnamese": "ĐẦU THẠCH", "meaning": "Ném đá", "level": "N1", "breakdown": "投 (Đầu) + 石 (Thạch)", "mnemonic": "Ném những hòn đá bay về phía trước."},
        {"kanji": "墓石", "hiragana": "ぼせき (boseki)", "sinoVietnamese": "MỘ THẠCH", "meaning": "Bia mộ bằng đá", "level": "N1", "breakdown": "墓 (Mộ) + 石 (Thạch)", "mnemonic": "Tấm bia đá tưởng nhớ người đã khuất."}
    ],
    113: [ # 示 / 礻 (Thị / Kỳ - Bàn thờ, thần linh, chỉ bảo)
        {"kanji": "指示", "hiragana": "しじ (shiji)", "sinoVietnamese": "CHỈ THỊ", "meaning": "Chỉ thị, hướng dẫn", "level": "N3", "breakdown": "指 (Chỉ) + 示 (Thị)", "mnemonic": "Ngón tay chỉ dẫn bảo ban mệnh lệnh."},
        {"kanji": "示す", "hiragana": "しめす (shimesu)", "sinoVietnamese": "THỊ", "meaning": "Chỉ ra, biểu thị", "level": "N3", "breakdown": "示 (Thị)", "mnemonic": "Đưa ra dẫn chứng soi sáng chân lý."},
        {"kanji": "神社", "hiragana": "じんじゃ (jinja)", "sinoVietnamese": "THẦN XÃ", "meaning": "Đền thờ Thần đạo Shinto", "level": "N4", "breakdown": "神 (Thần - có 礻) + 社 (Xã - có 礻)", "mnemonic": "Nơi thờ phụng các vị thần linh che chở dân chúng."},
        {"kanji": "神様", "hiragana": "かみさま (kamisama)", "sinoVietnamese": "THẦN DẠNG", "meaning": "Thần linh, Thượng đế", "level": "N4", "breakdown": "神 (Thần) + 様 (Dạng)", "mnemonic": "Đấng thần linh tối cao ban phước lành."},
        {"kanji": "祈る", "hiragana": "いのる (inoru)", "sinoVietnamese": "KỲ", "meaning": "Cầu nguyện thành tâm", "level": "N4", "breakdown": "祈 (Kỳ - có 礻)", "mnemonic": "Đứng trước bàn thờ thần cầm rìu tế lễ cầu an."},
        {"kanji": "祝う", "hiragana": "いわう (iwau)", "sinoVietnamese": "CHÚC", "meaning": "Chúc mừng hân hoan", "level": "N4", "breakdown": "祝 (Chúc - có 礻)", "mnemonic": "Lời chúc phúc thành kính trước đấng thần linh."},
        {"kanji": "祭り", "hiragana": "まつり (matsuri)", "sinoVietnamese": "TẾ", "meaning": "Lễ hội dân gian", "level": "N4", "breakdown": "祭 (Tế - có 示)", "mnemonic": "Dâng lễ vật lên bàn thờ thần trong ngày hội tưng bừng."},
        {"kanji": "礼儀", "hiragana": "れいぎ (reigi)", "sinoVietnamese": "LỄ NGHI", "meaning": "Lễ nghi, phép tắc cư xử", "level": "N3", "breakdown": "礼 (Lễ - có 礻) + 儀 (Nghi)", "mnemonic": "Phép tắc cung kính khi đối diện bề trên."},
        {"kanji": "福祉", "hiragana": "ふくし (fukushi)", "sinoVietnamese": "PHÚC CHỈ", "meaning": "Phúc lợi xã hội", "level": "N2", "breakdown": "福 (Phúc - có 礻) + 祉 (Chỉ - có 礻)", "mnemonic": "Hồng ân may mắn thần ban cho muôn dân ấm no."},
        {"kanji": "禁煙", "hiragana": "きんえん (kin'en)", "sinoVietnamese": "CẤM YÊN", "meaning": "Cấm hút thuốc", "level": "N4", "breakdown": "禁 (Cấm - có 示) + 煙 (Yên)", "mnemonic": "Quy định linh thiêng nghiêm cấm khói thuốc độc hại."}
    ],
    114: [ # 禸 (Nhựu - Dấu chân dã thú dẫm trên đất)
        {"kanji": "獣脚", "hiragana": "じゅうきゃく (jūkyaku)", "sinoVietnamese": "THÚ CƯỚC", "meaning": "Chân thú móng vuốt", "level": "N1", "breakdown": "Chứa nghĩa vết chân thú 禸", "mnemonic": "Dấu chân móng vuốt thú rừng in sâu trên nền đất tuyết."},
        {"kanji": "離れる", "hiragana": "はなれる (hanareru)", "sinoVietnamese": "LY", "meaning": "Rời xa, tách rời", "level": "N4", "breakdown": "離 (Ly - có bộ 禸)", "mnemonic": "Con chim cất cánh để lại dấu chân thú xa dần."},
        {"kanji": "離婚", "hiragana": "りこん (rikon)", "sinoVietnamese": "LY HÔN", "meaning": "Ly hôn, chia tay", "level": "N3", "breakdown": "離 (Ly) + 婚 (Hôn)", "mnemonic": "Rời xa cuộc sống hôn nhân."},
        {"kanji": "距離", "hiragana": "きょり (kyori)", "sinoVietnamese": "CỰ LY", "meaning": "Khoảng cách cự ly", "level": "N2", "breakdown": "距 (Cự) + 離 (Ly)", "mnemonic": "Khoảng cách không gian ngăn cách đôi bên."},
        {"kanji": "隔離", "hiragana": "かくり (kakuri)", "sinoVietnamese": "CÁCH LY", "meaning": "Cách ly phòng ngừa", "level": "N1", "breakdown": "隔 (Cách) + 離 (Ly)", "mnemonic": "Tách biệt cách ly nguồn lây nhiễm."},
        {"kanji": "分離", "hiragana": "ぶんり (bunri)", "sinoVietnamese": "PHÂN LY", "meaning": "Phân chia, tách lọc", "level": "N2", "breakdown": "分 (Phân) + 離 (Ly)", "mnemonic": "Tách bạch các thành phần ra khỏi nhau."},
        {"kanji": "見離す", "hiragana": "みはなす (mihanasu)", "sinoVietnamese": "KIẾN LY", "meaning": "Bỏ rơi, quay lưng", "level": "N1", "breakdown": "見 (Kiến) + 離 (Ly)", "mnemonic": "Nhìn người khác rời xa mà bỏ mặc."},
        {"kanji": "離陸", "hiragana": "りりく (ririku)", "sinoVietnamese": "LY LỤC", "meaning": "Máy bay cất cánh rời mặt đất", "level": "N2", "breakdown": "離 (Ly) + 陸 (Lục)", "mnemonic": "Rời khỏi mặt đất bay vút lên bầu trời."},
        {"kanji": "離脱", "hiragana": "りだつ (ridatsu)", "sinoVietnamese": "LY THOÁT", "meaning": "Rút lui, ly khai khỏi tổ chức", "level": "N1", "breakdown": "離 (Ly) + 脱 (Thoát)", "mnemonic": "Rút lui thoát ra khỏi liên minh."},
        {"kanji": "乖離", "hiragana": "かいり (kairi)", "sinoVietnamese": "QUAI LY", "meaning": "Sai lệch, xa rời thực tế", "level": "N1", "breakdown": "乖 (Quai) + 離 (Ly)", "mnemonic": "Lệch lạc xa rời hẳn với thực tiễn khách quan."}
    ],
    115: [ # 禾 (Hòa - Cây lúa trĩu bông)
        {"kanji": "私", "hiragana": "わたし (watashi)", "sinoVietnamese": "TƯ", "meaning": "Tôi, bản thân", "level": "N5", "breakdown": "禾 (Hòa) + 厶 (Khư - riêng tư)", "mnemonic": "Lúa gạo thu hoạch về làm của riêng bản thân mình."},
        {"kanji": "秋", "hiragana": "あき (aki)", "sinoVietnamese": "THU", "meaning": "Mùa thu lá vàng", "level": "N5", "breakdown": "禾 (Hòa) + 火 (Hỏa)", "mnemonic": "Mùa lúa chín vàng ươm dưới nắng như ngọn lửa sưởi ấm."},
        {"kanji": "科学", "hiragana": "かがく (kagaku)", "sinoVietnamese": "KHOA HỌC", "meaning": "Khoa học kỹ thuật", "level": "N4", "breakdown": "科 (Khoa - có 禾) + 学 (Học)", "mnemonic": "Đong đếm từng nhánh lúa nghiên cứu thành tựu khoa học."},
        {"kanji": "科目", "hiragana": "かもく (kamoku)", "sinoVietnamese": "KHOA MỤC", "meaning": "Môn học giáo trình", "level": "N3", "breakdown": "科 (Khoa) + 目 (Mục)", "mnemonic": "Các phân môn chi tiết rõ ràng."},
        {"kanji": "季節", "hiragana": "きせつ (kisetsu)", "sinoVietnamese": "QUÝ TIẾT", "meaning": "Mùa màng trong năm", "level": "N4", "breakdown": "季 (Quý - có 禾) + 節 (Tiết)", "mnemonic": "Vụ mùa lúa nuôi sống con thơ suốt các mùa."},
        {"kanji": "税金", "hiragana": "ぜいきん (zeikin)", "sinoVietnamese": "THUẾ KIM", "meaning": "Tiền thuế nộp nhà nước", "level": "N3", "breakdown": "税 (Thuế - có 禾) + 金 (Kim)", "mnemonic": "Thời xưa nộp thuế bằng lúa gạo mùa màng."},
        {"kanji": "穀物", "hiragana": "こくもつ (kokumotsu)", "sinoVietnamese": "CỐC VẬT", "meaning": "Ngũ cốc lương thực", "level": "N2", "breakdown": "穀 (Cốc - có 禾) + 物 (Vật)", "mnemonic": "Hạt lúa gạo ngũ cốc nuôi sống muôn loài."},
        {"kanji": "移る", "hiragana": "うつる (utsuru)", "sinoVietnamese": "DI", "meaning": "Di chuyển, lây lan", "level": "N3", "breakdown": "移 (Di - có 禾)", "mnemonic": "Cấy chuyển từng nhánh lúa từ ruộng này sang ruộng khác."},
        {"kanji": "穏やか", "hiragana": "おだやか (odayaka)", "sinoVietnamese": "ỔN", "meaning": "Yên bình, ôn hòa", "level": "N2", "breakdown": "穏 (Ổn - có 禾)", "mnemonic": "Lúa thóc đầy bồ, cuộc sống yên bình ấm no."},
        {"kanji": "秘密", "hiragana": "ひみつ (himitsu)", "sinoVietnamese": "BÍ MẬT", "meaning": "Bí mật kín đáo", "level": "N3", "breakdown": "秘 (Bí - có 禾) + 密 (Mật)", "mnemonic": "Giấu kỹ giống lúa quý trong lòng sâu kín đáo."}
    ],
    116: [ # 穴 (Huyệt - Hang động, lỗ hổng)
        {"kanji": "穴", "hiragana": "あな (ana)", "sinoVietnamese": "HUYỆT", "meaning": "Hang hốc, lỗ thủng", "level": "N3", "breakdown": "穴 (Huyệt)", "mnemonic": "Cửa hang khoét sâu dưới mái che vách núi."},
        {"kanji": "空間", "hiragana": "くうかん (kūkan)", "sinoVietnamese": "KHÔNG GIAN", "meaning": "Không gian đa chiều", "level": "N3", "breakdown": "空 (Không - có 穴) + 間 (Gian)", "mnemonic": "Khoảng không bao la khoáng đạt vô tận."},
        {"kanji": "空気", "hiragana": "くうき (kūki)", "sinoVietnamese": "KHÔNG KHÍ", "meaning": "Không khí thở trong lành", "level": "N5", "breakdown": "空 (Không) + 気 (Khí)", "mnemonic": "Bầu không khí trong lành nuôi dưỡng sự sống."},
        {"kanji": "研究", "hiragana": "けんきゅう (kenkyū)", "sinoVietnamese": "NGHIÊN CỨU", "meaning": "Nghiên cứu khoa học", "level": "N5", "breakdown": "研 (Nghiên) + 究 (Cứu - có 穴)", "mnemonic": "Mài giũa đào sâu vào tận hang cùng ngõ hẻm tri thức."},
        {"kanji": "突く", "hiragana": "つく (tsuku)", "sinoVietnamese": "ĐỘT", "meaning": "Đâm thủng, chọc mạnh", "level": "N2", "breakdown": "突 (Đột - có 穴)", "mnemonic": "Con chó lao vọt ra từ miệng hang tấn công bất ngờ."},
        {"kanji": "突然", "hiragana": "とつぜん (totsuzen)", "sinoVietnamese": "ĐỘT NHIÊN", "meaning": "Đột nhiên, bất thình lình", "level": "N3", "breakdown": "突 (Đột) + 然 (Nhiên)", "mnemonic": "Bất ngờ xuất hiện như lao vút ra khỏi hang tối."},
        {"kanji": "洞穴", "hiragana": "ほらあな (horaana)", "sinoVietnamese": "ĐỖNG HUYỆT", "meaning": "Hang động hoang sơ", "level": "N1", "breakdown": "洞 (Đỗng) + 穴 (Huyệt)", "mnemonic": "Hang sâu hun hút trong lòng núi đá vôi."},
        {"kanji": "墓穴", "hiragana": "ぼけつ (boketsu)", "sinoVietnamese": "MỘ HUYỆT", "meaning": "Huyệt mộ chôn cất", "level": "N1", "breakdown": "墓 (Mộ) + 穴 (Huyệt)", "mnemonic": "Huyệt sâu đào dưới lòng đất an nghỉ vĩnh hằng."},
        {"kanji": "落とし穴", "hiragana": "おとしあな (otoshiana)", "sinoVietnamese": "LẠC HUYỆT", "meaning": "Cạm bẫy, hố sụp bất ngờ", "level": "N1", "breakdown": "落 (Lạc) + 穴 (Huyệt)", "mnemonic": "Chiếc hố nguy hiểm ngụy trang để giăng bẫy thú."},
        {"kanji": "窒息", "hiragana": "ちっそく (chissoku)", "sinoVietnamese": "TRÁI TỨC", "meaning": "Nghẹt thở, ngạt khí", "level": "N1", "breakdown": "窒 (Trái - có 穴) + 息 (Tức)", "mnemonic": "Bị bít kín trong hang hốc không còn không khí thở."}
    ],
    117: [ # 立 (Lập - Đứng thẳng, thiết lập)
        {"kanji": "立つ", "hiragana": "たつ (tatsu)", "sinoVietnamese": "LẬP", "meaning": "Đứng dậy, đứng thẳng", "level": "N5", "breakdown": "立 (Lập)", "mnemonic": "Con người đứng hiên ngang vững chãi hai chân trên mặt đất."},
        {"kanji": "独立", "hiragana": "どくりつ (dokuritsu)", "sinoVietnamese": "ĐỘC LẬP", "meaning": "Độc lập, tự chủ", "level": "N3", "breakdown": "独 (Độc) + 立 (Lập)", "mnemonic": "Tự mình đứng vững vàng không phụ thuộc vào ai."},
        {"kanji": "立派", "hiragana": "りっぱ (rippa)", "sinoVietnamese": "LẬP PHÁI", "meaning": "Hào nhoáng, đàng hoàng, tuyệt vời", "level": "N4", "breakdown": "立 (Lập) + 派 (Phái)", "mnemonic": "Tư thế hiên ngang đàng hoàng xứng bậc anh tài."},
        {"kanji": "設立", "hiragana": "せつりつ (setsuritsu)", "sinoVietnamese": "THIẾT LẬP", "meaning": "Thành lập công ty, tổ chức", "level": "N2", "breakdown": "設 (Thiết) + 立 (Lập)", "mnemonic": "Xây dựng và dựng nên tổ chức mới."},
        {"kanji": "国立", "hiragana": "こくりつ (kokuritsu)", "sinoVietnamese": "QUỐC LẬP", "meaning": "Thuộc quốc gia, công lập", "level": "N3", "breakdown": "国 (Quốc) + 立 (Lập)", "mnemonic": "Cơ sở do nhà nước xây dựng và điều hành."},
        {"kanji": "私立", "hiragana": "しりつ (shiritsu)", "sinoVietnamese": "TƯ LẬP", "meaning": "Dân lập, tư thục", "level": "N3", "breakdown": "私 (Tư) + 立 (Lập)", "mnemonic": "Trường lớp do tư nhân bỏ vốn gây dựng."},
        {"kanji": "成立", "hiragana": "せいりつ (seiritsu)", "sinoVietnamese": "THÀNH LẬP", "meaning": "Thành lập, thông qua hợp đồng", "level": "N2", "breakdown": "成 (Thành) + 立 (Lập)", "mnemonic": "Sự việc hoàn thành và chính thức có hiệu lực."},
        {"kanji": "対立", "hiragana": "たいりつ (tairitsu)", "sinoVietnamese": "ĐỐI LẬP", "meaning": "Đối đầu, bất đồng quan điểm", "level": "N2", "breakdown": "対 (Đối) + 立 (Lập)", "mnemonic": "Đứng đối diện nhau kịch liệt tranh luận."},
        {"kanji": "起立", "hiragana": "きりつ (kiritsu)", "sinoVietnamese": "KHỞI LẬP", "meaning": "Đứng dậy nghiêm trang chào", "level": "N2", "breakdown": "起 (Khởi) + 立 (Lập)", "mnemonic": "Cùng đồng loạt đứng dậy biểu thị lòng tôn trọng."},
        {"kanji": "目立つ", "hiragana": "めだつ (medatsu)", "sinoVietnamese": "MỤC LẬP", "meaning": "Nổi bật, đập vào mắt", "level": "N3", "breakdown": "目 (Mục) + 立 (Lập)", "mnemonic": "Nổi bật đứng sừng sững thu hút mọi ánh nhìn."}
    ],
    118: [ # 竹 / ⺮ (Trúc - Cây tre, cây trúc)
        {"kanji": "竹", "hiragana": "たけ (take)", "sinoVietnamese": "TRÚC", "meaning": "Cây tre, bụi trúc", "level": "N3", "breakdown": "竹 (Trúc)", "mnemonic": "Hai nhánh tre đung đưa với những phiến lá nhọn."},
        {"kanji": "笛", "hiragana": "ふえ (fue)", "sinoVietnamese": "ĐỊCH", "meaning": "Cây sáo trúc, tiếng còi", "level": "N2", "breakdown": "竹 (Trúc) + 由 (Do)", "mnemonic": "Ống tre khoét lỗ phát ra âm thanh du dương."},
        {"kanji": "筆", "hiragana": "ふで (fude)", "sinoVietnamese": "BÚT", "meaning": "Bút lông viết chữ nho", "level": "N2", "breakdown": "竹 (Trúc) + 聿 (Duật - tay cầm bút)", "mnemonic": "Cây bút làm bằng cán trúc gắn lông mềm mềm."},
        {"kanji": "答える", "hiragana": "こたえる (kotaeru)", "sinoVietnamese": "ĐÁP", "meaning": "Trả lời câu hỏi", "level": "N5", "breakdown": "竹 (Trúc) + 合 (Hợp)", "mnemonic": "Gieo quẻ thẻ tre xem ý trời rồi đối đáp rõ ràng."},
        {"kanji": "箱", "hiragana": "はこ (hako)", "sinoVietnamese": "TƯƠNG", "meaning": "Cái hộp, thùng chứa", "level": "N4", "breakdown": "竹 (Trúc) + 相 (Tương)", "mnemonic": "Chiếc hộp đan bằng cật tre chứa đựng đồ vật."},
        {"kanji": "笑う", "hiragana": "わらう (warau)", "sinoVietnamese": "TIẾU", "meaning": "Cười vui vẻ, mỉm cười", "level": "N5", "breakdown": "竹 (Trúc) + 夭 (Yêu)", "mnemonic": "Nghe tiếng tre xào xạc trong gió như tiếng cười rộn rã."},
        {"kanji": "簡単", "hiragana": "かんたん (kantan)", "sinoVietnamese": "GIẢN ĐƠN", "meaning": "Đơn giản, dễ dàng", "level": "N4", "breakdown": "簡 (Giản - có ⺮) + 単 (Đơn)", "mnemonic": "Thẻ tre biên chép ngắn gọn súc tích dễ hiểu."},
        {"kanji": "節約", "hiragana": "せつやく (setsuyaku)", "sinoVietnamese": "TIẾT ƯỚC", "meaning": "Tiết kiệm chi tiêu", "level": "N3", "breakdown": "節 (Tiết - có ⺮) + 約 (Ước)", "mnemonic": "Từng đốt tre ngay ngắn nhắc nhở chi tiêu có chừng mực."},
        {"kanji": "箸", "hiragana": "はし (hashi)", "sinoVietnamese": "TRỢ", "meaning": "Đôi đũa ăn cơm", "level": "N4", "breakdown": "竹 (Trúc) + 者 (Giả)", "mnemonic": "Đôi đũa vót bằng cật tre dùng trong bữa cơm."},
        {"kanji": "竹の子", "hiragana": "たけのこ (takenoko)", "sinoVietnamese": "TRÚC TỬ", "meaning": "Búp măng non ngọt giòn", "level": "N3", "breakdown": "竹 (Trúc) + 子 (Tử)", "mnemonic": "Búp măng con mọc lên từ gốc tre già sau mưa."}
    ],
    119: [ # 米 (Mễ - Hạt gạo, lúa miến)
        {"kanji": "米", "hiragana": "こめ (kome)", "sinoVietnamese": "MỄ", "meaning": "Hạt gạo trắng ngần", "level": "N4", "breakdown": "米 (Mễ)", "mnemonic": "Bốn hạt gạo tỏa đều quanh bông lúa."},
        {"kanji": "米国", "hiragana": "べいこく (beikoku)", "sinoVietnamese": "MỄ QUỐC", "meaning": "Nước Mỹ (Hoa Kỳ)", "level": "N3", "breakdown": "米 (Mễ) + 国 (Quốc)", "mnemonic": "Tên viết tắt của đất nước cờ hoa Hoa Kỳ."},
        {"kanji": "料理", "hiragana": "りょうり (ryōri)", "sinoVietnamese": "LIỆU LÝ", "meaning": "Món ăn, nấu nướng", "level": "N5", "breakdown": "料 (Liệu - có 米) + 理 (Lý)", "mnemonic": "Đong gạo và nguyên liệu nấu thành món ăn ngon miệng."},
        {"kanji": "玄米", "hiragana": "げんまい (genmai)", "sinoVietnamese": "HUYỀN MỄ", "meaning": "Gạo lứt dinh dưỡng", "level": "N2", "breakdown": "玄 (Huyền) + 米 (Mễ)", "mnemonic": "Hạt gạo giữ nguyên lớp vỏ cám sẫm màu bổ dưỡng."},
        {"kanji": "白米", "hiragana": "はくまい (hakumai)", "sinoVietnamese": "BẠCH MỄ", "meaning": "Gạo trắng xay xát kỹ", "level": "N2", "breakdown": "白 (Bạch) + 米 (Mễ)", "mnemonic": "Gạo đã được giã trắng muốt tinh khiết."},
        {"kanji": "精米", "hiragana": "せいまい (seimai)", "sinoVietnamese": "TINH MỄ", "meaning": "Xay xát hạt gạo tinh xảo", "level": "N1", "breakdown": "精 (Tinh - có 米) + 米 (Mễ)", "mnemonic": "Quá trình chà xát cho hạt gạo bóng bẩy."},
        {"kanji": "粉末", "hiragana": "ふんまつ (funmatsu)", "sinoVietnamese": "PHẤN MẠT", "meaning": "Bột mịn, dạng bột", "level": "N1", "breakdown": "粉 (Phấn - có 米) + 末 (Mạt)", "mnemonic": "Hạt gạo nghiền nát thành bột mịn nấu cháo."},
        {"kanji": "粗末", "hiragana": "そまつ (somatsu)", "sinoVietnamese": "THÔ MẠT", "meaning": "Sơ sài, đạm bạc / lãng phí", "level": "N2", "breakdown": "粗 (Thô - có 米) + 末 (Mạt)", "mnemonic": "Bữa cơm đạm bạc chỉ có gạo thô sơ."},
        {"kanji": "粒", "hiragana": "つぶ (tsubu)", "sinoVietnamese": "LẠP", "meaning": "Hạt nhỏ li ti", "level": "N2", "breakdown": "米 (Mễ) + 立 (Lập)", "mnemonic": "Từng hạt gạo đứng tách rời nhỏ nhắn."},
        {"kanji": "新米", "hiragana": "しんまい (shinmai)", "sinoVietnamese": "TÂN MỄ", "meaning": "Gạo mới đầu mùa / người mới vào nghề", "level": "N2", "breakdown": "新 (Tân) + 米 (Mễ)", "mnemonic": "Hạt gạo vụ mới thơm dẻo, cũng chỉ lính mới ngây thơ."}
    ],
    120: [ # 糸 / 糹 (Mịch - Sợi tơ tằm mềm mại)
        {"kanji": "糸", "hiragana": "いと (ito)", "sinoVietnamese": "MỊCH", "meaning": "Sợi chỉ, sợi tơ dệt", "level": "N4", "breakdown": "糸 (Mịch)", "mnemonic": "Cuộn tơ tằm thắt lại với những sợi chỉ buông dài."},
        {"kanji": "約束", "hiragana": "やくそく (yakusoku)", "sinoVietnamese": "ƯỚC THÚC", "meaning": "Lời hứa, cuộc hẹn", "level": "N5", "breakdown": "約 (Ước - có 糹) + 束 (Thúc)", "mnemonic": "Sợi chỉ thắt chặt kết nối niềm tin giao ước."},
        {"kanji": "結ぶ", "hiragana": "むすぶ (musubu)", "sinoVietnamese": "KẾT", "meaning": "Buộc lại, thắt nút, ký kết", "level": "N4", "breakdown": "結 (Kết - có 糹)", "mnemonic": "Buộc chặt các đầu dây tơ lại thành nút thắt bền chặt."},
        {"kanji": "結婚", "hiragana": "けっこん (kekkon)", "sinoVietnamese": "KẾT HÔN", "meaning": "Kết hôn, cưới hỏi", "level": "N5", "breakdown": "結 (Kết) + 婚 (Hôn)", "mnemonic": "Sợi tơ hồng buộc chặt hai con người xây dựng mái ấm."},
        {"kanji": "続く", "hiragana": "つづく (tsudzuku)", "sinoVietnamese": "TỤC", "meaning": "Tiếp tục liên tục", "level": "N4", "breakdown": "続 (Tục - có 糹)", "mnemonic": "Nối tiếp sợi chỉ dài không để đứt đoạn."},
        {"kanji": "経済", "hiragana": "けいざい (keizai)", "sinoVietnamese": "KINH TẾ", "meaning": "Kinh tế thị trường", "level": "N3", "breakdown": "経 (Kinh - có 糹) + 済 (Tế)", "mnemonic": "Đan dệt đường lối kinh bang tế thế cứu giúp dân lành."},
        {"kanji": "練習", "hiragana": "れんしゅう (renshū)", "sinoVietnamese": "LUYỆN TẬP", "meaning": "Luyện tập rèn giũa", "level": "N5", "breakdown": "練 (Luyện - có 糹) + 習 (Tập)", "mnemonic": "Nấu và luộc sợi tơ nhiều lần cho trắng mềm bền dai."},
        {"kanji": "紹介", "hiragana": "しょうかい (shōkai)", "sinoVietnamese": "THIỆU GIỚI", "meaning": "Giới thiệu làm quen", "level": "N4", "breakdown": "紹 (Thiệu - có 糹) + 介 (Giới)", "mnemonic": "Nối sợi dây giao lưu giữa hai con người."},
        {"kanji": "紙", "hiragana": "かみ (kami)", "sinoVietnamese": "CHỈ", "meaning": "Tờ giấy viết", "level": "N5", "breakdown": "糸 (Mịch) + 氏 (Thị)", "mnemonic": "Xưa làm giấy từ các sợi xơ tơ tằm ép mỏng."},
        {"kanji": "線", "hiragana": "せん (sen)", "sinoVietnamese": "TUYẾN", "meaning": "Tuyến đường, đường kẻ", "level": "N4", "breakdown": "糸 (Mịch) + 泉 (Tuyền)", "mnemonic": "Đường dây tơ dài uốn lượn như dòng suối trong vắt."}
    ],
    121: [ # 缶 (Phẫu - Đồ sành sứ, bình gốm đất nung)
        {"kanji": "缶", "hiragana": "かん (kan)", "sinoVietnamese": "PHẪU", "meaning": "Cái lon, hộp kim loại", "level": "N3", "breakdown": "缶 (Phẫu)", "mnemonic": "Chiếc bình đất nung có nắp đậy kín miệng."},
        {"kanji": "缶詰", "hiragana": "かんづめ (kanzume)", "sinoVietnamese": "PHẪU CẬT", "meaning": "Đồ hộp đóng kín", "level": "N2", "breakdown": "缶 (Phẫu) + 詰 (Cật)", "mnemonic": "Thức ăn đóng gói kín mít trong hộp kim loại."},
        {"kanji": "空き缶", "hiragana": "あきかん (akikan)", "sinoVietnamese": "KHÔNG PHẪU", "meaning": "Vỏ lon rỗng vứt rác", "level": "N3", "breakdown": "空 (Không) + 缶 (Phẫu)", "mnemonic": "Chiếc vỏ lon nước ngọt đã uống cạn kiệt."},
        {"kanji": "缶ビール", "hiragana": "かんビール (kanbīru)", "sinoVietnamese": "PHẪU BIA", "meaning": "Bia lon mát lạnh", "level": "N4", "breakdown": "缶 (Phẫu) + ビール", "mnemonic": "Bia đóng trong lon thiếc tiện lợi."},
        {"kanji": "陶缶", "hiragana": "とうかん (tōkan)", "sinoVietnamese": "ĐÀO PHẪU", "meaning": "Ống gốm thoát nước", "level": "N1", "breakdown": "陶 (Đào) + 缶 (Phẫu)", "mnemonic": "Ống làm bằng đất nung gốm sứ."},
        {"kanji": "瓦缶", "hiragana": "がかん (gakan)", "sinoVietnamese": "NGÕA PHẪU", "meaning": "Bình đất nung mộc mạc", "level": "N1", "breakdown": "瓦 (Ngõa) + 缶 (Phẫu)", "mnemonic": "Đồ sành đất nung mộc mạc dân dã."},
        {"kanji": "薬缶", "hiragana": "やかん (yakan)", "sinoVietnamese": "DƯỢC PHẪU", "meaning": "Ấm đun nước sôi", "level": "N2", "breakdown": "薬 (Dược) + 缶 (Phẫu)", "mnemonic": "Ấm sắc thuốc đất nung nay thành ấm kim loại đun nước."},
        {"kanji": "缶切", "hiragana": "かんきり (kankiri)", "sinoVietnamese": "PHẪU THIẾT", "meaning": "Dụng cụ khui hộp thiếc", "level": "N2", "breakdown": "缶 (Phẫu) + 切 (Thiết)", "mnemonic": "Lưỡi dao chuyên dùng để cắt nắp hộp đồ hộp."},
        {"kanji": "茶缶", "hiragana": "ちゃかん (chakan)", "sinoVietnamese": "TRÀ PHẪU", "meaning": "Hộp thiếc đựng trà khô", "level": "N1", "breakdown": "茶 (Trà) + 缶 (Phẫu)", "mnemonic": "Chiếc hộp đậy kín bảo quản lá trà thơm ngát."},
        {"kanji": "汽缶", "hiragana": "きかん (kikan)", "sinoVietnamese": "KHÍ PHẪU", "meaning": "Nồi súp-de nồi hơi", "level": "N1", "breakdown": "汽 (Khí) + 缶 (Phẫu)", "mnemonic": "Bình chứa áp suất tạo hơi nước chạy động cơ."}
    ],
    122: [ # 网 / 罒 (Võng - Cái lưới đánh cá)
        {"kanji": "網", "hiragana": "あみ (ami)", "sinoVietnamese": "VÕNG", "meaning": "Cái lưới mắt cá, mạng lưới", "level": "N2", "breakdown": "糸 (Mịch) + 罔 (Võng)", "mnemonic": "Tấm lưới bện bằng dây gai giăng bắt cá."},
        {"kanji": "通信網", "hiragana": "つうしんもう (tsūshinmō)", "sinoVietnamese": "THÔNG TIN VÕNG", "meaning": "Mạng lưới viễn thông", "level": "N2", "breakdown": "通信 (Thông tin) + 網 (Võng)", "mnemonic": "Mạng lưới kết nối thông tin đa phương thức."},
        {"kanji": "罪", "hiragana": "つみ (tsumi)", "sinoVietnamese": "TỘI", "meaning": "Tội lỗi, tội ác", "level": "N3", "breakdown": "罒 (Võng) + 非 (Phi)", "mnemonic": "Làm điều phi pháp nên bị sa vào lưới pháp luật."},
        {"kanji": "置く", "hiragana": "おく (oku)", "sinoVietnamese": "TRÍ", "meaning": "Đặt, để đồ vật", "level": "N5", "breakdown": "罒 (Võng) + 直 (Trực)", "mnemonic": "Thả lưới thẳng ngay ngắn cố định một chỗ."},
        {"kanji": "位置", "hiragana": "いち (ichi)", "sinoVietnamese": "VỊ TRÍ", "meaning": "Vị trí địa lý", "level": "N3", "breakdown": "位 (Vị) + 置 (Trí - có 罒)", "mnemonic": "Điểm định vị chính xác trên bản đồ."},
        {"kanji": "罰", "hiragana": "ばつ (batsu)", "sinoVietnamese": "PHẠT", "meaning": "Hình phạt trừng trị", "level": "N2", "breakdown": "罒 (Võng) + 言 (Ngôn) + 刂 (Đao)", "mnemonic": "Sa lưới pháp luật, bị tra xét và trừng trị bằng đao kiếm."},
        {"kanji": "処罰", "hiragana": "しょばつ (shobatsu)", "sinoVietnamese": "XỬ PHẠT", "meaning": "Xử phạt nghiêm minh", "level": "N1", "breakdown": "処 (Xử) + 罰 (Phạt - có 罒)", "mnemonic": "Áp dụng chế tài xử phạt người có tội."},
        {"kanji": "署名", "hiragana": "しょめい (shomei)", "sinoVietnamese": "THỰ DANH", "meaning": "Ký tên xác nhận", "level": "N2", "breakdown": "署 (Thự - có 罒) + 名 (Danh)", "mnemonic": "Đặt bút ký tên dưới sự giám sát của quan thự."},
        {"kanji": "金網", "hiragana": "かなあみ (kanaami)", "sinoVietnamese": "KIM VÕNG", "meaning": "Lưới thép rào chắn", "level": "N2", "breakdown": "金 (Kim) + 網 (Võng)", "mnemonic": "Hàng rào đan bằng dây thép gai kiên cố."},
        {"kanji": "配意", "hiragana": "はいい (haii)", "sinoVietnamese": "PHỐI Ý", "meaning": "Quan tâm chú ý", "level": "N1", "breakdown": "Chứa gốc nghĩa sắp đặt lưới 罒", "mnemonic": "Bủa lưới quan sát chu đáo từng chi tiết."}
    ],
    123: [ # 羊 (Dương - Con dê, cừu hiền lành)
        {"kanji": "羊", "hiragana": "ひつじ (hitsuji)", "sinoVietnamese": "DƯƠNG", "meaning": "Con cừu, con dê", "level": "N3", "breakdown": "羊 (Dương)", "mnemonic": "Con dê có hai sừng cong cong trên đầu và bộ lông dày."},
        {"kanji": "羊毛", "hiragana": "ようもう (yōmō)", "sinoVietnamese": "DƯƠNG MAO", "meaning": "Lông cừu dệt áo len", "level": "N3", "breakdown": "羊 (Dương) + 毛 (Mao)", "mnemonic": "Lông cừu mềm mại êm ái giữ ấm mùa đông."},
        {"kanji": "美しい", "hiragana": "うつくしい (utsukushii)", "sinoVietnamese": "MỸ", "meaning": "Đẹp đẽ, tuyệt mỹ", "level": "N4", "breakdown": "羊 (Dương) + 大 (Đại)", "mnemonic": "Con dê to béo hiến tế thần linh là biểu tượng của cái đẹp."},
        {"kanji": "美術", "hiragana": "びじゅつ (bijutsu)", "sinoVietnamese": "MỸ THUẬT", "meaning": "Mỹ thuật hội họa", "level": "N4", "breakdown": "美 (Mỹ) + 術 (Thuật)", "mnemonic": "Nghệ thuật tạo ra những tác phẩm hội họa tươi đẹp."},
        {"kanji": "群れ", "hiragana": "むれ (mure)", "sinoVietnamese": "QUẦN", "meaning": "Đàn, bầy đàn động vật", "level": "N2", "breakdown": "君 (Quân) + 羊 (Dương)", "mnemonic": "Đàn cừu đông đúc đi theo người chăn cừu dẫn dắt."},
        {"kanji": "義務", "hiragana": "ぎむ (gimu)", "sinoVietnamese": "NGHĨA VỤ", "meaning": "Nghĩa vụ thiêng liêng", "level": "N3", "breakdown": "義 (Nghĩa - có 羊) + 務 (Vụ)", "mnemonic": "Lẽ phải công chính trong sáng như con dê hiến tế."},
        {"kanji": "正義", "hiragana": "せいぎ (seigi)", "sinoVietnamese": "CHÍNH NGHĨA", "meaning": "Chính nghĩa, lẽ phải", "level": "N2", "breakdown": "正 (Chính) + 義 (Nghĩa - có 羊)", "mnemonic": "Hành động theo lẽ phải và sự công bằng."},
        {"kanji": "養う", "hiragana": "やしなう (yashinau)", "sinoVietnamese": "DƯỠNG", "meaning": "Nuôi nấng, phụng dưỡng", "level": "N2", "breakdown": "羊 (Dương) + 食 (Thực)", "mnemonic": "Cho ăn thịt cừu tẩm bổ nuôi con khôn lớn."},
        {"kanji": "鮮やか", "hiragana": "あざやか (azayaka)", "sinoVietnamese": "TIÊN", "meaning": "Tươi thắm, rực rỡ", "level": "N2", "breakdown": "魚 (Ngư) + 羊 (Dương)", "mnemonic": "Cá tươi và thịt cừu ngon tươi rói."},
        {"kanji": "善意", "hiragana": "ぜんい (zen'i)", "sinoVietnamese": "THIỆN Ý", "meaning": "Ý tốt, thiện chí", "level": "N2", "breakdown": "善 (Thiện - có 羊) + 意 (Ý)", "mnemonic": "Lòng tốt thanh tao thánh thiện như đức tính loài cừu."}
    ],
    124: [ # 羽 (Vũ - Đôi cánh lông chim)
        {"kanji": "羽", "hiragana": "はね (hane)", "sinoVietnamese": "VŨ", "meaning": "Lông vũ, cánh chim", "level": "N3", "breakdown": "羽 (Vũ)", "mnemonic": "Hai cánh chim xòe rộng với lớp lông vũ bay lượn."},
        {"kanji": "翼", "hiragana": "つばさ (tsubasa)", "sinoVietnamese": "DỰC", "meaning": "Đôi cánh dang rộng", "level": "N1", "breakdown": "異 (Dị) + 羽 (Vũ)", "mnemonic": "Đôi cánh khác biệt giúp chim bay vút lên bầu trời xanh."},
        {"kanji": "習う", "hiragana": "ならう (narau)", "sinoVietnamese": "TẬP", "meaning": "Học tập, rèn luyện", "level": "N5", "breakdown": "羽 (Vũ) + 白 (Bạch)", "mnemonic": "Chim non vỗ cánh trắng tập bay hàng ngày."},
        {"kanji": "練習", "hiragana": "れんしゅう (renshū)", "sinoVietnamese": "LUYỆN TẬP", "meaning": "Luyện tập chăm chỉ", "level": "N5", "breakdown": "練 (Luyện) + 習 (Tập - có 羽)", "mnemonic": "Tập luyện bền bỉ như chim non tập bay mỗi sớm."},
        {"kanji": "習慣", "hiragana": "しゅうかん (shūkan)", "sinoVietnamese": "TẬP QUÁN", "meaning": "Tập quán, thói quen", "level": "N4", "breakdown": "習 (Tập) + 慣 (Quán)", "mnemonic": "Thói quen được hình thành qua rèn luyện lâu ngày."},
        {"kanji": "翌日", "hiragana": "よくじつ (yokujitsu)", "sinoVietnamese": "DẬC NHẬT", "meaning": "Ngày hôm sau kế tiếp", "level": "N3", "breakdown": "翌 (Dực - có 羽) + 日 (Nhật)", "mnemonic": "Cánh chim bay đón ánh bình minh ngày mới."},
        {"kanji": "翻す", "hiragana": "ひるがえす (hirugaesu)", "sinoVietnamese": "PHIÊN", "meaning": "Phấp phới tung bay / đổi ý", "level": "N1", "breakdown": "番 (Phiên) + 羽 (Vũ)", "mnemonic": "Tung cánh chim chao lượn đổi hướng bay."},
        {"kanji": "羽毛", "hiragana": "うもう (umō)", "sinoVietnamese": "VŨ MAO", "meaning": "Lông vũ nhồi chăn áo ấm", "level": "N2", "breakdown": "羽 (Vũ) + 毛 (Mao)", "mnemonic": "Lớp lông chim siêu nhẹ giữ nhiệt mùa lạnh."},
        {"kanji": "翁", "hiragana": "おきな (okina)", "sinoVietnamese": "ÔNG", "meaning": "Ông lão râu tóc bạc phơ", "level": "N1", "breakdown": "公 (Công) + 羽 (Vũ)", "mnemonic": "Cụ già có chòm râu trắng mềm như lông vũ."},
        {"kanji": "羽織る", "hiragana": "はおる (haoru)", "sinoVietnamese": "VŨ CHỨC", "meaning": "Khoác hờ chiếc áo qua vai", "level": "N1", "breakdown": "羽 (Vũ) + 織 (Chức)", "mnemonic": "Khoác chiếc áo dệt nhẹ nhàng như đôi cánh chim."}
    ],
    125: [ # 老 (Lão - Người già râu tóc dài, chống gậy)
        {"kanji": "老人", "hiragana": "ろうじん (rōjin)", "sinoVietnamese": "LÃO NHÂN", "meaning": "Cụ già, người cao tuổi", "level": "N3", "breakdown": "老 (Lão) + 人 (Nhân)", "mnemonic": "Cụ già lưng còng tóc bạc chống gậy bước đi."},
        {"kanji": "老いる", "hiragana": "おいる (oiru)", "sinoVietnamese": "LÃO", "meaning": "Già đi theo năm tháng", "level": "N2", "breakdown": "老 (Lão)", "mnemonic": "Quy luật thời gian khiến con người dần già nua."},
        {"kanji": "敬老", "hiragana": "けいろう (keirō)", "sinoVietnamese": "KÍNH LÃO", "meaning": "Kính trọng người già", "level": "N2", "breakdown": "敬 (Kính) + 老 (Lão)", "mnemonic": "Tôn kính và phụng dưỡng các bậc cao niên."},
        {"kanji": "孝行", "hiragana": "こうこう (kōkō)", "sinoVietnamese": "HIẾU HÀNH", "meaning": "Hiếu thảo với cha mẹ", "level": "N1", "breakdown": "孝 (Hiếu - chứa 老) + 行 (Hành)", "mnemonic": "Đứa con cõng cha già trên lưng đi từng bước hiếu nghĩa."},
        {"kanji": "考慮", "hiragana": "こうりょ (kōryo)", "sinoVietnamese": "KHẢO LỰ", "meaning": "Suy xét, cân nhắc kỹ", "level": "N2", "breakdown": "考 (Khảo - chứa 老) + 慮 (Lự)", "mnemonic": "Người già suy nghĩ chín chắn trước sau thấu đáo."},
        {"kanji": "先生", "hiragana": "せんせい (sensei)", "sinoVietnamese": "TIÊN SINH", "meaning": "Thầy giáo, cô giáo", "level": "N5", "breakdown": "先 (Tiên) + 生 (Sinh)", "mnemonic": "Người sinh ra trước tích lũy kinh nghiệm dạy dỗ trò."},
        {"kanji": "老後", "hiragana": "ろうご (rōgo)", "sinoVietnamese": "LÃO HẬU", "meaning": "Tuổi già về sau", "level": "N2", "breakdown": "老 (Lão) + 後 (Hậu)", "mnemonic": "Những năm tháng an nhàn sau khi về hưu."},
        {"kanji": "不老", "hiragana": "ふろう (furō)", "sinoVietnamese": "BẤT LÃO", "meaning": "Trẻ mãi không già", "level": "N1", "breakdown": "不 (Bất) + 老 (Lão)", "mnemonic": "Ước nguyện sống lâu trẻ mãi cùng trời đất."},
        {"kanji": "老舗", "hiragana": "しにせ (shinise)", "sinoVietnamese": "LÃO PHỐ", "meaning": "Cửa tiệm lâu đời truyền thống", "level": "N1", "breakdown": "老 (Lão) + 舗 (Phố)", "mnemonic": "Cửa hàng gia truyền trải qua bao thế hệ uy tín."},
        {"kanji": "考古学", "hiragana": "こうこがく (kōkogaku)", "sinoVietnamese": "KHẢO CỔ HỌC", "meaning": "Ngành khảo cổ học", "level": "N1", "breakdown": "考 (Khảo - có 老) + 古 (Cổ) + 学 (Học)", "mnemonic": "Ngành khoa học đào bới nghiên cứu di tích ngàn xưa."}
    ],
    126: [ # 而 (Nhi - Râu quai nón, liên từ nối mà/và)
        {"kanji": "而して", "hiragana": "しかして (shikashite)", "sinoVietnamese": "NHI", "meaning": "Và rồi, sau đó thì", "level": "N1", "breakdown": "Bộ 而 (Nhi)", "mnemonic": "Chòm râu buông xuống nối dài các ý câu chuyện."},
        {"kanji": "而も", "hiragana": "しかも (shikamo)", "sinoVietnamese": "NHI", "meaning": "Hơn nữa, vả lại", "level": "N2", "breakdown": "Bộ 而 (Nhi)", "mnemonic": "Thêm vào đó một ý nghĩa mới liên kết."},
        {"kanji": "耐える", "hiragana": "たえる (taeru)", "sinoVietnamese": "NẠI", "meaning": "Nhẫn nại, chịu đựng", "level": "N2", "breakdown": "而 (Nhi) + 寸 (Thốn)", "mnemonic": "Cắn răng giữ chặt chòm râu nhẫn nhịn vượt qua gian khó."},
        {"kanji": "耐久", "hiragana": "たいきゅう (taikyū)", "sinoVietnamese": "NẠI CỬU", "meaning": "Bền bỉ, chịu lực lâu dài", "level": "N2", "breakdown": "耐 (Nại - có 而) + 久 (Cửu)", "mnemonic": "Khả năng chịu đựng bền bỉ thách thức thời gian."},
        {"kanji": "忍耐", "hiragana": "にんたい (nintai)", "sinoVietnamese": "NHẪN NẠI", "meaning": "Lòng kiên nhẫn nhẫn nại", "level": "N1", "breakdown": "忍 (Nhẫn) + 耐 (Nại - có 而)", "mnemonic": "Kiên cường nhẫn nại không lùi bước trước khó khăn."},
        {"kanji": "耐熱", "hiragana": "たいねつ (tainetsu)", "sinoVietnamese": "NẠI NHIỆT", "meaning": "Khả năng chịu nhiệt độ cao", "level": "N2", "breakdown": "耐 (Nại) + 熱 (Nhiệt)", "mnemonic": "Chất liệu không bị biến dạng khi gặp lửa nóng."},
        {"kanji": "耐火", "hiragana": "たいか (taika)", "sinoVietnamese": "NẠI HỎA", "meaning": "Chống cháy lan", "level": "N1", "breakdown": "耐 (Nại) + 火 (Hỏa)", "mnemonic": "Vật liệu chống cháy bảo vệ tòa nhà an toàn."},
        {"kanji": "耐震", "hiragana": "たいしん (taishin)", "sinoVietnamese": "NẠI CHẤN", "meaning": "Chống chịu động đất", "level": "N2", "breakdown": "耐 (Nại) + 震 (Chấn)", "mnemonic": "Thiết kế móng nhà chịu đựng rung lắc động đất vững vàng."},
        {"kanji": "端倪", "hiragana": "たんげい (tangei)", "sinoVietnamese": "ĐOAN NGHÊ", "meaning": "Manh mối, phỏng đoán", "level": "N1", "breakdown": "Chứa gốc chữ liên đới 而", "mnemonic": "Dò tìm từng đầu mối phỏng đoán chân tướng."},
        {"kanji": "須臾", "hiragana": "しゅゆ (shuyu)", "sinoVietnamese": "TU DU", "meaning": "Giây lát, thoáng chốc", "level": "N1", "breakdown": "須 (Tu - có 而) + 臾", "mnemonic": "Thời gian trôi qua nhanh như một sợi râu đung đưa."}
    ],
    127: [ # 耒 (Lỗi - Cái cày bừa xới đất nông nghiệp)
        {"kanji": "耕す", "hiragana": "たがやす (tagayasu)", "sinoVietnamese": "CANH", "meaning": "Cày bừa xới đất", "level": "N3", "breakdown": "耒 (Lỗi) + 井 (Tỉnh)", "mnemonic": "Cầm cái cày xới đất tơi xốp cạnh giếng nước."},
        {"kanji": "耕作", "hiragana": "こうさく (kōsaku)", "sinoVietnamese": "CANH TÁC", "meaning": "Canh tác nông nghiệp", "level": "N2", "breakdown": "耕 (Canh - có 耒) + 作 (Tác)", "mnemonic": "Cày cuốc làm đất trồng trọt hoa màu."},
        {"kanji": "農耕", "hiragana": "のうこう (nōkō)", "sinoVietnamese": "NÔNG CANH", "meaning": "Nghề nông canh tác", "level": "N1", "breakdown": "農 (Nông) + 耕 (Canh)", "mnemonic": "Nền văn minh nông nghiệp lấy cày cấy làm gốc."},
        {"kanji": "耕地", "hiragana": "こうち (kōchi)", "sinoVietnamese": "CANH ĐỊA", "meaning": "Đất canh tác nông nghiệp", "level": "N2", "breakdown": "耕 (Canh) + 地 (Địa)", "mnemonic": "Diện tích đất đai dùng cho sản xuất nông nghiệp."},
        {"kanji": "耗弱", "hiragana": "もうじゃく (mōjaku)", "sinoVietnamese": "HAO NHƯỢC", "meaning": "Suy kiệt, hao mòn sức lực", "level": "N1", "breakdown": "耗 (Hao - có 耒) + 弱 (Nhược)", "mnemonic": "Cày bừa vất vả hao tổn hết tâm lực."},
        {"kanji": "消耗", "hiragana": "しょうもう (shōmō)", "sinoVietnamese": "TIÊU HAO", "meaning": "Tiêu hao sức lực, tốn năng lượng", "level": "N2", "breakdown": "消 (Tiêu) + 耗 (Hao - có 耒)", "mnemonic": "Năng lượng bị hao mòn vơi cạn dần."},
        {"kanji": "心神耗弱", "hiragana": "しんしんもうじゃく (shinshinmōjaku)", "sinoVietnamese": "TÂM THẦN HAO NHƯỢC", "meaning": "Trạng thái tinh thần suy nhược", "level": "N1", "breakdown": "心神 + 耗弱 (có 耒)", "mnemonic": "Thuật ngữ pháp lý chỉ tinh thần bị suy giảm khả năng nhận thức."},
        {"kanji": "耘田", "hiragana": "うんでん (unden)", "sinoVietnamese": "VÂN ĐIỀN", "meaning": "Làm cỏ ruộng", "level": "N1", "breakdown": "耘 (Vân - có 耒) + 田 (Điền)", "mnemonic": "Dùng cày xới diệt cỏ dại bảo vệ lúa."},
        {"kanji": "耜", "hiragana": "すき (suki)", "sinoVietnamese": "TỰ", "meaning": "Lưỡi cày sắc bén", "level": "N1", "breakdown": "耒 (Lỗi) + 㠯", "mnemonic": "Lưỡi cày cắm sâu vào lòng đất phì nhiêu."},
        {"kanji": "耙", "hiragana": "まぐわ (maguwa)", "sinoVietnamese": "BÀ", "meaning": "Cái bừa san phẳng ruộng", "level": "N1", "breakdown": "耒 (Lỗi) + 巴", "mnemonic": "Dụng cụ bừa đất cho phẳng mịn trước khi cấy."}
    ],
    128: [ # 耳 (Nhĩ - Lỗ tai, lắng nghe)
        {"kanji": "耳", "hiragana": "みみ (mimi)", "sinoVietnamese": "NHĨ", "meaning": "Cái tai, lỗ tai", "level": "N5", "breakdown": "耳 (Nhĩ)", "mnemonic": "Hình dáng vành tai người lắng nghe âm thanh bốn phương."},
        {"kanji": "聞く", "hiragana": "きく (kiku)", "sinoVietnamese": "VĂN", "meaning": "Nghe thấy, hỏi han", "level": "N5", "breakdown": "門 (Môn) + 耳 (Nhĩ)", "mnemonic": "Ghé tai vào khe cửa lắng nghe tin tức."},
        {"kanji": "職業", "hiragana": "しょくぎょう (shokugyō)", "sinoVietnamese": "CHỨC NGHIỆP", "meaning": "Nghề nghiệp, công việc", "level": "N3", "breakdown": "職 (Chức - có 耳) + 業 (Nghiệp)", "mnemonic": "Người đi làm phải biết lắng nghe chỉ thị cấp trên."},
        {"kanji": "職人", "hiragana": "しょくにん (shokunin)", "sinoVietnamese": "CHỨC NHÂN", "meaning": "Thợ thủ công lành nghề", "level": "N2", "breakdown": "職 (Chức) + 人 (Nhân)", "mnemonic": "Nghệ nhân tinh tế lắng nghe từng chuyển động của tác phẩm."},
        {"kanji": "耳寄り", "hiragana": "みみより (mimiyori)", "sinoVietnamese": "NHĨ KÝ", "meaning": "Tin sốt dẻo, tin đáng nghe", "level": "N1", "breakdown": "耳 (Nhĩ) + 寄 (Ký)", "mnemonic": "Tin tức hấp dẫn khiến ai cũng muốn ghé tai vào nghe."},
        {"kanji": "耳障り", "hiragana": "みみざわり (mimizawari)", "sinoVietnamese": "NHĨ CHƯỚNG", "meaning": "Chói tai, khó chịu", "level": "N1", "breakdown": "耳 (Nhĩ) + 障 (Chướng)", "mnemonic": "Âm thanh ồn ào gây chướng tai gai mắt."},
        {"kanji": "恥ずかしい", "hiragana": "はずかしい (hazukashii)", "sinoVietnamese": "SỈ", "meaning": "Xấu hổ, ngượng ngùng đỏ mặt", "level": "N4", "breakdown": "耳 (Nhĩ) + 心 (Tâm)", "mnemonic": "Trong lòng xấu hổ khiến hai vành tai đỏ ửng lên."},
        {"kanji": "聡明", "hiragana": "そうめい (sōmei)", "sinoVietnamese": "THÔNG MINH", "meaning": "Thông minh, sáng suốt", "level": "N1", "breakdown": "聡 (Thông - có 耳) + 明 (Minh)", "mnemonic": "Tai thính mắt tinh nhạy bén hiểu thấu sự đời."},
        {"kanji": "耳栓", "hiragana": "みみせん (mimisen)", "sinoVietnamese": "NHĨ XUYÊN", "meaning": "Nút bịt tai chống ồn", "level": "N2", "breakdown": "耳 (Nhĩ) + 栓 (Xuyên - nút)", "mnemonic": "Nút bịt vào tai để ngăn tiếng ồn khi ngủ."},
        {"kanji": "初耳", "hiragana": "はつみみ (hatsumimi)", "sinoVietnamese": "SƠ NHĨ", "meaning": "Lần đầu tiên nghe thấy", "level": "N2", "breakdown": "初 (Sơ) + 耳 (Nhĩ)", "mnemonic": "Tin tức hoàn toàn mới lạ lần đầu lọt vào tai."}
    ],
    129: [ # 聿 (Duật - Cây bút lông cổ)
        {"kanji": "筆", "hiragana": "ふで (fude)", "sinoVietnamese": "BÚT", "meaning": "Cây bút lông mềm mại", "level": "N2", "breakdown": "竹 (Trúc) + 聿 (Duật)", "mnemonic": "Bàn tay cầm ống trúc làm bút chấm mực viết chữ."},
        {"kanji": "筆者", "hiragana": "ひっしゃ (hissha)", "sinoVietnamese": "BÚT GIẢ", "meaning": "Tác giả bài viết", "level": "N2", "breakdown": "筆 (Bút - có 聿) + 者 (Giả)", "mnemonic": "Người cầm bút sáng tác ra bài văn cuốn sách."},
        {"kanji": "鉛筆", "hiragana": "えんぴつ (enpitsu)", "sinoVietnamese": "DUYÊN BÚT", "meaning": "Bút chì", "level": "N5", "breakdown": "鉛 (Duyên - chì) + 筆 (Bút - có 聿)", "mnemonic": "Bút làm từ lõi chì than đen."},
        {"kanji": "万年筆", "hiragana": "まんねんひつ (mannenhitsu)", "sinoVietnamese": "VẠN NIÊN BÚT", "meaning": "Bút máy viết mực", "level": "N4", "breakdown": "万年 (Vạn niên) + 筆 (Bút)", "mnemonic": "Cây bút bền bỉ bơm mực dùng vạn năm không hỏng."},
        {"kanji": "筆記", "hiragana": "ひっき (hikki)", "sinoVietnamese": "BÚT KÝ", "meaning": "Thi viết, ghi chép tay", "level": "N3", "breakdown": "筆 (Bút) + 記 (Ký)", "mnemonic": "Dùng bút ghi chép bài thi cẩn thận."},
        {"kanji": "津々浦々", "hiragana": "つつうらうら (tsutsuuraura)", "sinoVietnamese": "TÂN PHỔ", "meaning": "Khắp mọi nẻo đường đất nước", "level": "N1", "breakdown": "Chứa chữ 津 (có cấu trúc liên đới)", "mnemonic": "Khắp mọi bến cảng thôn làng xa xôi."},
        {"kanji": "自筆", "hiragana": "じひつ (jihitsu)", "sinoVietnamese": "TỰ BÚT", "meaning": "Chính tay viết, bút tích", "level": "N1", "breakdown": "自 (Tự) + 筆 (Bút)", "mnemonic": "Tự tay mình cầm bút viết nên bức thư."},
        {"kanji": "執筆", "hiragana": "しっぴつ (shippitsu)", "sinoVietnamese": "CHẤP BÚT", "meaning": "Cầm bút viết sách", "level": "N1", "breakdown": "執 (Chấp) + 筆 (Bút)", "mnemonic": "Cầm bút dốc lòng viết tác phẩm tâm huyết."},
        {"kanji": "直筆", "hiragana": "じきひつ (jikihitsu)", "sinoVietnamese": "TRỰC BÚT", "meaning": "Bút tích viết tay trực tiếp", "level": "N1", "breakdown": "直 (Trực) + 筆 (Bút)", "mnemonic": "Nét chữ nguyên bản do chính tác giả hạ bút."},
        {"kanji": "代筆", "hiragana": "だいひつ (daihitsu)", "sinoVietnamese": "ĐẠI BÚT", "meaning": "Viết thay, chép hộ", "level": "N1", "breakdown": "代 (Đại) + 筆 (Bút)", "mnemonic": "Cầm bút viết hộ người không biết chữ."}
    ],
    130: [ # 肉 / ⺼ (Nhục - Thịt, cơ quan cơ thể)
        {"kanji": "肉", "hiragana": "にく (niku)", "sinoVietnamese": "NHỤC", "meaning": "Thịt tươi, đồ ăn thịt", "level": "N5", "breakdown": "肉 (Nhục)", "mnemonic": "Tảng thịt nạc có các thớ thịt đan xen nhau."},
        {"kanji": "牛肉", "hiragana": "ぎゅうにく (gyūniku)", "sinoVietnamese": "NGƯU NHỤC", "meaning": "Thịt bò giàu dinh dưỡng", "level": "N5", "breakdown": "牛 (Ngưu) + 肉 (Nhục)", "mnemonic": "Thịt thơm ngon từ chú bò khỏe mạnh."},
        {"kanji": "筋肉", "hiragana": "きんにく (kinniku)", "sinoVietnamese": "CÂN NHỤC", "meaning": "Cơ bắp cơ thể", "level": "N3", "breakdown": "筋 (Cân) + 肉 (Nhục)", "mnemonic": "Các múi cơ bắp săn chắc sau khi tập luyện."},
        {"kanji": "胃", "hiragana": "い (i)", "sinoVietnamese": "VỊ", "meaning": "Dạ dày tiêu hóa", "level": "N2", "breakdown": "田 (Điền) + ⺼ (Nhục)", "mnemonic": "Bộ phận như thửa ruộng chứa thịt và cơm tiêu hóa."},
        {"kanji": "肝臓", "hiragana": "かんぞう (kanzō)", "sinoVietnamese": "CAN TẠNG", "meaning": "Lá gan nội tạng", "level": "N1", "breakdown": "肝 (Can - có ⺼) + 臓 (Tạng - có ⺼)", "mnemonic": "Lá gan nội tạng cốt yếu trong cơ thể người."},
        {"kanji": "肺", "hiragana": "はい (hai)", "sinoVietnamese": "PHẾ", "meaning": "Lá phổi hô hấp", "level": "N1", "breakdown": "⺼ (Nhục) + 市 (Thị)", "mnemonic": "Lá phổi trao đổi khí duy trì sinh mệnh."},
        {"kanji": "脳", "hiragana": "のう (nō)", "sinoVietnamese": "NÃO", "meaning": "Bộ não tư duy", "level": "N2", "breakdown": "⺼ (Nhục) + 凶 + 巛", "mnemonic": "Bộ não trung tâm điều khiển suy nghĩ của con người."},
        {"kanji": "腕", "hiragana": "うで (ude)", "sinoVietnamese": "OÃN", "meaning": "Cánh tay khỏe khoắn", "level": "N3", "breakdown": "⺼ (Nhục) + 宛 (Uyển)", "mnemonic": "Cánh tay rắn rỏi gánh vác mọi trọng trách."},
        {"kanji": "胸", "hiragana": "むね (mune)", "sinoVietnamese": "HUNG", "meaning": "Lồng ngực, tấm lòng", "level": "N3", "breakdown": "⺼ (Nhục) + 匈 (Hung)", "mnemonic": "Lồng ngực đập phập phồng chứa đựng con tim."},
        {"kanji": "腰", "hiragana": "こし (koshi)", "sinoVietnamese": "YÊU", "meaning": "Thắt lưng, hông eo", "level": "N2", "breakdown": "⺼ (Nhục) + 要 (Yếu)", "mnemonic": "Vùng thắt lưng là điểm cốt yếu nâng đỡ cả cơ thể."}
    ],
    131: [ # 臣 (Thần - Bầy tôi, quan lại cúi đầu nhìn xuống)
        {"kanji": "大臣", "hiragana": "だいじん (daijin)", "sinoVietnamese": "ĐẠI THẦN", "meaning": "Bộ trưởng chính phủ", "level": "N3", "breakdown": "大 (Đại) + 臣 (Thần)", "mnemonic": "Vị quan lớn đứng đầu trông coi một bộ ngành quốc gia."},
        {"kanji": "総理大臣", "hiragana": "そうりだいじん (sōridaijin)", "sinoVietnamese": "TỔNG LÝ ĐẠI THẦN", "meaning": "Thủ tướng chính phủ", "level": "N3", "breakdown": "総理 (Tổng lý) + 大臣 (Đại thần)", "mnemonic": "Người đứng đầu nội các lãnh đạo đất nước."},
        {"kanji": "家臣", "hiragana": "かしん (kashin)", "sinoVietnamese": "GIA THẦN", "meaning": "Gia thần thân cận", "level": "N1", "breakdown": "家 (Gia) + 臣 (Thần)", "mnemonic": "Người bầy tôi trung thành phục vụ gia tộc nhiều đời."},
        {"kanji": "忠臣", "hiragana": "ちゅうしん (chūshin)", "sinoVietnamese": "TRUNG THẦN", "meaning": "Tôi trung ái quốc", "level": "N1", "breakdown": "忠 (Trung) + 臣 (Thần)", "mnemonic": "Vị quan trung nghĩa hết lòng vì nước vì dân."},
        {"kanji": "臣下", "hiragana": "しんか (shinka)", "sinoVietnamese": "THẦN HẠ", "meaning": "Bầy tôi bề dưới", "level": "N1", "breakdown": "臣 (Thần) + 下 (Hạ)", "mnemonic": "Kẻ dưới quyền phục tùng mệnh lệnh bề trên."},
        {"kanji": "蔵相", "hiragana": "ぞうしょう (zōshō)", "sinoVietnamese": "TÀNG TƯƠNG", "meaning": "Bộ trưởng tài chính", "level": "N1", "breakdown": "蔵 (chứa 臣)", "mnemonic": "Người quản lý kho tàng quốc gia."},
        {"kanji": "緊迫", "hiragana": "きんぱく (kinpaku)", "sinoVietnamese": "KHẨN BÁCH", "meaning": "Căng thẳng cấp bách", "level": "N1", "breakdown": "緊 (chứa 臣) + 迫 (Bách)", "mnemonic": "Tình thế khẩn trương quan thần họp bàn ứng phó."},
        {"kanji": "緊急", "hiragana": "きんきゅう (kinkyū)", "sinoVietnamese": "KHẨN CẤP", "meaning": "Khẩn cấp nguy nan", "level": "N3", "breakdown": "緊 (Khẩn - có 臣) + 急 (Cấp)", "mnemonic": "Tình trạng gấp gáp cần xử lý ngay lập tức."},
        {"kanji": "君臣", "hiragana": "くんしん (kunshin)", "sinoVietnamese": "QUÂN THẦN", "meaning": "Vua và bầy tôi", "level": "N1", "breakdown": "君 (Quân) + 臣 (Thần)", "mnemonic": "Quan hệ chính trực giữa vua và quần thần."},
        {"kanji": "重臣", "hiragana": "じゅうしん (jūshin)", "sinoVietnamese": "TRỌNG THẦN", "meaning": "Trọng thần rường cột", "level": "N1", "breakdown": "重 (Trọng) + 臣 (Thần)", "mnemonic": "Vị đại thần giữ trọng trách quan trọng trong triều đình."}
    ],
    132: [ # 自 (Tự - Tự mình, hình cái mũi chỉ vào bản thân)
        {"kanji": "自分", "hiragana": "じぶん (jibun)", "sinoVietnamese": "TỰ PHÂN", "meaning": "Bản thân mình", "level": "N5", "breakdown": "自 (Tự) + 分 (Phân)", "mnemonic": "Ngón tay chỉ vào mũi mình để khẳng định bản thân."},
        {"kanji": "自由", "hiragana": "じゆう (jiyū)", "sinoVietnamese": "TỰ DO", "meaning": "Tự do, thoải mái", "level": "N4", "breakdown": "自 (Tự) + 由 (Do)", "mnemonic": "Do chính bản thân mình tự quyết định hành động."},
        {"kanji": "自然", "hiragana": "しぜん (shizen)", "sinoVietnamese": "TỰ NHIÊN", "meaning": "Thiên nhiên trong lành", "level": "N4", "breakdown": "自 (Tự) + 然 (Nhiên)", "mnemonic": "Vạn vật tự thân vốn dĩ tồn tại hài hòa."},
        {"kanji": "自信", "hiragana": "じしん (jishin)", "sinoVietnamese": "TỰ TÍN", "meaning": "Tự tin vào bản thân", "level": "N3", "breakdown": "自 (Tự) + 信 (Tín)", "mnemonic": "Đặt niềm tin trọn vẹn vào năng lực của chính mình."},
        {"kanji": "自転車", "hiragana": "じてんしゃ (jitensha)", "sinoVietnamese": "TỰ CHUYỂN XA", "meaning": "Xe đạp", "level": "N5", "breakdown": "自 (Tự) + 転 (Chuyển) + 車 (Xa)", "mnemonic": "Chiếc xe tự dùng sức chân đạp bánh lăn tròn."},
        {"kanji": "自動車", "hiragana": "じどうしゃ (jidōsha)", "sinoVietnamese": "TỰ ĐỘNG XA", "meaning": "Xe hơi, ô tô", "level": "N5", "breakdown": "自 (Tự) + 動 (Động) + 車 (Xa)", "mnemonic": "Chiếc xe tự động nổ máy di chuyển."},
        {"kanji": "自首", "hiragana": "じしゅ (jishu)", "sinoVietnamese": "TỰ THỦ", "meaning": "Đầu thú nhận tội", "level": "N1", "breakdown": "自 (Tự) + 首 (Thủ)", "mnemonic": "Tự thân đến nộp mình trước cơ quan công lý."},
        {"kanji": "自覚", "hiragana": "じかく (jikaku)", "sinoVietnamese": "TỰ GIÁC", "meaning": "Tự giác, ý thức rõ", "level": "N2", "breakdown": "自 (Tự) + 覚 (Giác)", "mnemonic": "Tự bản thân nhận thức rõ bổn phận trách nhiệm."},
        {"kanji": "独自", "hiragana": "どくじ (dokuji)", "sinoVietnamese": "ĐỘC TỰ", "meaning": "Độc đáo, riêng biệt", "level": "N2", "breakdown": "独 (Độc) + 自 (Tự)", "mnemonic": "Nét đặc trưng riêng biệt chỉ bản thân mới có."},
        {"kanji": "自粛", "hiragana": "じしゅく (jishuku)", "sinoVietnamese": "TỰ TÚC", "meaning": "Tự kiềm chế, tự hạn chế ra ngoài", "level": "N1", "breakdown": "自 (Tự) + 粛 (Túc)", "mnemonic": "Tự giác kiềm chế hạn chế hoạt động vì cộng đồng."}
    ],
    133: [ # 至 (Chí - Đến nơi, tột cùng, mũi tên cắm xuống đất)
        {"kanji": "至る", "hiragana": "いたる (itaru)", "sinoVietnamese": "CHÍ", "meaning": "Đến, dẫn tới kết quả", "level": "N2", "breakdown": "至 (Chí)", "mnemonic": "Mũi tên bay thẳng cắm trúng đích đến cuối cùng."},
        {"kanji": "夏至", "hiragana": "げし (geshi)", "sinoVietnamese": "HẠ CHÍ", "meaning": "Tiết hạ chí (ngày dài nhất năm)", "level": "N1", "breakdown": "夏 (Hạ) + 至 (Chí)", "mnemonic": "Mùa hè lên tới đỉnh điểm ánh sáng chan hòa."},
        {"kanji": "冬至", "hiragana": "とうじ (tōji)", "sinoVietnamese": "ĐÔNG CHÍ", "meaning": "Tiết đông chí (đêm dài nhất năm)", "level": "N1", "breakdown": "冬 (Đông) + 至 (Chí)", "mnemonic": "Mùa đông lạnh giá chạm tới tột cùng bóng tối."},
        {"kanji": "至急", "hiragana": "しきゅう (shikyū)", "sinoVietnamese": "CHÍ CẤP", "meaning": "Hết sức khẩn cấp", "level": "N3", "breakdown": "至 (Chí) + 急 (Cấp)", "mnemonic": "Khẩn cấp đến tột cùng cần làm ngay không chậm trễ."},
        {"kanji": "今に至る", "hiragana": "いまにいたる (imaniitaru)", "sinoVietnamese": "KIM CHÍ", "meaning": "Cho đến tận ngày hôm nay", "level": "N2", "breakdown": "今 (Kim) + 至 (Chí)", "mnemonic": "Kéo dài từ quá khứ đến tận thời điểm hiện tại."},
        {"kanji": "必至", "hiragana": "ひっし (hisshi)", "sinoVietnamese": "TẤT CHÍ", "meaning": "Tất yếu sẽ xảy đến", "level": "N1", "breakdown": "必 (Tất) + 至 (Chí)", "mnemonic": "Điều tất nhiên không thể tránh khỏi sẽ diễn ra."},
        {"kanji": "至福", "hiragana": "しふく (shifuku)", "sinoVietnamese": "CHÍ PHÚC", "meaning": "Hạnh phúc tột cùng", "level": "N1", "breakdown": "至 (Chí) + 福 (Phúc)", "mnemonic": "Niềm hạnh phúc trọn vẹn không gì sánh bằng."},
        {"kanji": "至高", "hiragana": "しこう (shikō)", "sinoVietnamese": "CHÍ CAO", "meaning": "Tối cao, đỉnh cao tuyệt đối", "level": "N1", "breakdown": "至 (Chí) + 高 (Cao)", "mnemonic": "Vươn tới tầm cao tột đỉnh của nghệ thuật."},
        {"kanji": "至極", "hiragana": "しごく (shigoku)", "sinoVietnamese": "CHÍ CỰC", "meaning": "Hết mực, vô cùng, cực kỳ", "level": "N1", "breakdown": "至 (Chí) + 極 (Cực)", "mnemonic": "Đạt tới giới hạn tột cùng của cảm xúc."},
        {"kanji": "至上", "hiragana": "しじょう (shijō)", "sinoVietnamese": "CHÍ THƯỢNG", "meaning": "Trên hết, cao quý nhất", "level": "N1", "breakdown": "至 (Chí) + 上 (Thượng)", "mnemonic": "Mục tiêu tối thượng được đặt lên vị trí số một."}
    ],
    134: [ # 臼 (Cữu - Cái cối đá giã gạo)
        {"kanji": "臼", "hiragana": "うす (usu)", "sinoVietnamese": "CỮU", "meaning": "Cái cối đá, cối giã gạo", "level": "N1", "breakdown": "臼 (Cữu)", "mnemonic": "Chiếc cối đá có các vết răng cưa để giã nát hạt thóc."},
        {"kanji": "石臼", "hiragana": "いしうす (ishiusu)", "sinoVietnamese": "THẠCH CỮU", "meaning": "Cối xay bằng đá", "level": "N1", "breakdown": "石 (Thạch) + 臼 (Cữu)", "mnemonic": "Cối đá nặng trịch dùng để xay bột làm bánh."},
        {"kanji": "脱臼", "hiragana": "だっきゅう (dakkyū)", "sinoVietnamese": "THOÁT CỮU", "meaning": "Trật khớp xương", "level": "N1", "breakdown": "脱 (Thoát) + 臼 (Cữu)", "mnemonic": "Khớp xương trượt ra khỏi ổ cối chấn thương."},
        {"kanji": "挿す", "hiragana": "さす (sasu)", "sinoVietnamese": "SÁP", "meaning": "Cắm hoa, cài trâm", "level": "N2", "breakdown": "扌 (Thủ) + 臼 (Cữu) + 干", "mnemonic": "Bàn tay cắm chày vào cối như cài hoa vào lọ."},
        {"kanji": "毀損", "hiragana": "きそん (kison)", "sinoVietnamese": "HỦ TỔN", "meaning": "Phá hoại, làm tổn hại danh dự", "level": "N1", "breakdown": "毀 (Hủy - có 臼) + 損 (Tổn)", "mnemonic": "Đập vỡ tan cối làm tổn hại giá trị đồ vật."},
        {"kanji": "臼歯", "hiragana": "きゅうし (kyūshi)", "sinoVietnamese": "CỮU XỈ", "meaning": "Răng cối, răng hàm nghiền thức ăn", "level": "N1", "breakdown": "臼 (Cữu) + 歯 (Xỉ)", "mnemonic": "Chiếc răng hàm bằng phẳng nghiền nát cơm như cối giã."},
        {"kanji": "茶臼", "hiragana": "ちゃうす (chausu)", "sinoVietnamese": "TRÀ CỮU", "meaning": "Cối đá xay trà xanh Matcha", "level": "N1", "breakdown": "茶 (Trà) + 臼 (Cữu)", "mnemonic": "Cối đá tinh xảo xay lá trà khô thành bột matcha mịn."},
        {"kanji": "餅臼", "hiragana": "もちうす (mochiusu)", "sinoVietnamese": "BÍNH CỮU", "meaning": "Cối giã bánh dày Mochi ngày Tết", "level": "N1", "breakdown": "餅 (Bính) + 臼 (Cữu)", "mnemonic": "Chiếc cối gỗ lớn dùng để giã mochi dẻo quánh đón xuân."},
        {"kanji": "興奮", "hiragana": "こうふん (kōfun)", "sinoVietnamese": "HƯNG PHẤN", "meaning": "Hưng phấn hào hứng", "level": "N2", "breakdown": "興 (Hưng - chứa 臼) + 奮 (Phấn)", "mnemonic": "Bốn tay cùng nâng cối hò reo hào hứng."},
        {"kanji": "興味", "hiragana": "きょうみ (kyōmi)", "sinoVietnamese": "HƯNG VỊ", "meaning": "Hứng thú, quan tâm", "level": "N4", "breakdown": "興 (Hưng - có 臼) + 味 (Vị)", "mnemonic": "Cảm nhận được niềm say mê thích thú trong sự việc."}
    ],
    135: [ # 舌 (Thiệt - Cái lưỡi nếm vị)
        {"kanji": "舌", "hiragana": "した (shita)", "sinoVietnamese": "THIỆT", "meaning": "Cái lưỡi", "level": "N3", "breakdown": "舌 (Thiệt)", "mnemonic": "Chiếc lưỡi thò ra từ vòm miệng nếm các vị ngon ngọt."},
        {"kanji": "舌鼓", "hiragana": "したづつみ (shitazutsumi)", "sinoVietnamese": "THIỆT CỔ", "meaning": "Tặc lưỡi khen ngon, đánh chén", "level": "N1", "breakdown": "舌 (Thiệt) + 鼓 (Cổ - trống)", "mnemonic": "Lưỡi gõ như tiếng trống tấm tắc khen món ăn hảo hạng."},
        {"kanji": "毒舌", "hiragana": "どくぜつ (dokuzetsu)", "sinoVietnamese": "ĐỘC THIỆT", "meaning": "Miệng lưỡi độc địa cay nghiệt", "level": "N1", "breakdown": "毒 (Độc) + 舌 (Thiệt)", "mnemonic": "Lời nói cay độc tuôn ra từ đầu lưỡi làm tổn thương người khác."},
        {"kanji": "舌禍", "hiragana": "ぜっか (zekka)", "sinoVietnamese": "THIỆT HỌA", "meaning": "Họa từ miệng mà ra", "level": "N1", "breakdown": "舌 (Thiệt) + 禍 (Họa)", "mnemonic": "Tai vạ giáng xuống do chiếc lưỡi phát ngôn bừa bãi."},
        {"kanji": "話す", "hiragana": "はなす (hanasu)", "sinoVietnamese": "THOẠI", "meaning": "Nói chuyện, trò chuyện", "level": "N5", "breakdown": "言 (Ngôn) + 舌 (Thiệt)", "mnemonic": "Chiếc lưỡi uốn lượn thốt lên những lời nói tâm tình."},
        {"kanji": "乱れる", "hiragana": "みだれる (midareru)", "sinoVietnamese": "LOẠN", "meaning": "Hỗn loạn, rối bời", "level": "N2", "breakdown": "舌 (Thiệt) + 乚", "mnemonic": "Lời qua tiếng lại khua môi múa mép gây cảnh hỗn loạn."},
        {"kanji": "舌足らず", "hiragana": "したたらず (shitatarazu)", "sinoVietnamese": "THIỆT TÚC", "meaning": "Nói ngọng, diễn đạt chưa gãy gọn", "level": "N1", "breakdown": "舌 (Thiệt) + 足 (Túc)", "mnemonic": "Diễn đạt ấp úng chưa đủ ý như bị líu lưỡi."},
        {"kanji": "舌先", "hiragana": "したさき (shitasaki)", "sinoVietnamese": "THIỆT TIÊN", "meaning": "Đầu lưỡi", "level": "N1", "breakdown": "舌 (Thiệt) + 先 (Tiên)", "mnemonic": "Phần chóp đầu lưỡi nhạy cảm nếm vị ngọt."},
        {"kanji": "猫舌", "hiragana": "ねこじた (nekojita)", "sinoVietnamese": "MIÊU THIỆT", "meaning": "Lưỡi mèo (không ăn được đồ nóng)", "level": "N2", "breakdown": "猫 (Miêu) + 舌 (Thiệt)", "mnemonic": "Chiếc lưỡi sợ nóng như lưỡi loài mèo con."},
        {"kanji": "弁舌", "hiragana": "べんぜつ (benzetsu)", "sinoVietnamese": "BIỆN THIỆT", "meaning": "Tài hùng biện lưu loát", "level": "N1", "breakdown": "弁 (Biện) + 舌 (Thiệt)", "mnemonic": "Tài ăn nói hùng hồn khéo léo thuyết phục lòng người."}
    ],
    136: [ # 舛 (Suyễn - Sai lầm, hai bàn chân bước ngược hướng)
        {"kanji": "舞う", "hiragana": "まう (mau)", "sinoVietnamese": "VŨ", "meaning": "Múa lượn, khiêu vũ", "level": "N3", "breakdown": "舞 (chứa bộ 舛)", "mnemonic": "Đôi chân bước đảo nhịp nhàng theo điệu múa mê say."},
        {"kanji": "舞踏", "hiragana": "ぶとう (butō)", "sinoVietnamese": "VŨ ĐẠP", "meaning": "Vũ hội, khiêu vũ dạ tiệc", "level": "N1", "breakdown": "舞 (Vũ - có 舛) + 踏 (Đạp)", "mnemonic": "Đôi bàn chân dẫm nhịp nhàng xoay tròn trong điệu nhạc."},
        {"kanji": "歌舞伎", "hiragana": "かぶき (kabuki)", "sinoVietnamese": "CA VŨ KĨ", "meaning": "Kịch Kabuki truyền thống Nhật Bản", "level": "N2", "breakdown": "歌 (Ca) + 舞 (Vũ - có 舛) + 伎 (Kĩ)", "mnemonic": "Nghệ thuật ca múa kịch trường cổ truyền đặc sắc."},
        {"kanji": "舞台", "hiragana": "ぶたい (butai)", "sinoVietnamese": "VŨ ĐÀI", "meaning": "Sân khấu kịch, vũ đài", "level": "N3", "breakdown": "舞 (Vũ) + 台 (Đài)", "mnemonic": "Sân khấu tỏa sáng nơi người nghệ sĩ biểu diễn tài ba."},
        {"kanji": "見舞い", "hiragana": "みまい (mimai)", "sinoVietnamese": "KIẾN VŨ", "meaning": "Thăm hỏi người ốm đau", "level": "N4", "breakdown": "見 (Kiến) + 舞 (Vũ - có 舛)", "mnemonic": "Cất bước tới thăm hỏi người bệnh mong chóng bình phục."},
        {"kanji": "振る舞う", "hiragana": "ふるまう (furumau)", "sinoVietnamese": "CHẤN VŨ", "meaning": "Cư xử, thết đãi tiệc tùng", "level": "N1", "breakdown": "振 (Chấn) + 舞 (Vũ)", "mnemonic": "Cách hành xử hào sảng thết đãi bạn hữu chu đáo."},
        {"kanji": "傑作", "hiragana": "けっさく (kessaku)", "sinoVietnamese": "KIỆT TÁC", "meaning": "Kiệt tác đỉnh cao", "level": "N2", "breakdown": "Chứa kết cấu biến cách của 舛", "mnemonic": "Tác phẩm xuất sắc phi phàm vượt trội thời đại."},
        {"kanji": "舛目", "hiragana": "ますめ (masume)", "sinoVietnamese": "SUYỄN MỤC", "meaning": "Ô vuông chia lưới bàn cờ", "level": "N1", "breakdown": "舛 (Suyễn) + 目 (Mục)", "mnemonic": "Các ô đan chéo đối xứng ngay ngắn trên mặt bàn."},
        {"kanji": "舛形", "hiragana": "ますがた (masugata)", "sinoVietnamese": "SUYỄN HÌNH", "meaning": "Khu cửa thành chữ U phòng thủ", "level": "N1", "breakdown": "舛 (Suyễn) + 形 (Hình)", "mnemonic": "Cấu trúc cổng thành gấp khúc bẻ gãy đà công kích."},
        {"kanji": "舞い散る", "hiragana": "まいちる (maichiru)", "sinoVietnamese": "VŨ TẢN", "meaning": "Lá hoa bay lả tả trong gió", "level": "N1", "breakdown": "舞 (Vũ) + 散 (Tản)", "mnemonic": "Những cánh hoa anh đào bay lượn tản mát khắp trời."}
    ],
    137: [ # 舟 (Chu - Chiếc thuyền độc mộc)
        {"kanji": "舟", "hiragana": "ふね (fune)", "sinoVietnamese": "CHU", "meaning": "Chiếc thuyền nhỏ mộc mạc", "level": "N3", "breakdown": "舟 (Chu)", "mnemonic": "Chiếc thuyền độc mộc thon dài lướt nhẹ trên mặt nước."},
        {"kanji": "船", "hiragana": "ふね (fune)", "sinoVietnamese": "THUYỀN", "meaning": "Con tàu, con thuyền lớn", "level": "N4", "breakdown": "舟 (Chu) + 㕣 (Duyên)", "mnemonic": "Con thuyền lớn chở đầy hàng hóa xuôi dòng nước."},
        {"kanji": "船舶", "hiragana": "せんぱく (senpaku)", "sinoVietnamese": "THUYỀN BẠC", "meaning": "Tàu bè đường thủy", "level": "N1", "breakdown": "船 (Thuyền) + 舶 (Bạc - đều có 舟)", "mnemonic": "Đội tàu thuyền bè neo đậu tấp nập tại hải cảng."},
        {"kanji": "航空機", "hiragana": "こうくうき (kōkūki)", "sinoVietnamese": "HÀNG KHÔNG CƠ", "meaning": "Máy bay hàng không", "level": "N2", "breakdown": "航 (Hàng - có 舟) + 空 (Không) + 機 (Cơ)", "mnemonic": "Con thuyền bay lượn thám hiểm bầu trời bao la."},
        {"kanji": "航海", "hiragana": "こうかい (kōkai)", "sinoVietnamese": "HÀNG HẢI", "meaning": "Hành trình vượt đại dương", "level": "N2", "breakdown": "航 (Hàng - có 舟) + 海 (Hải)", "mnemonic": "Thuyền giương buồm vượt qua sóng to biển lớn."},
        {"kanji": "小舟", "hiragana": "こぶね (kobune)", "sinoVietnamese": "TIỂU CHU", "meaning": "Chiếc thuyền nan nhỏ bé", "level": "N2", "breakdown": "小 (Tiểu) + 舟 (Chu)", "mnemonic": "Thuyền nan nhỏ lững lờ trôi trên dòng sông quê."},
        {"kanji": "渡し舟", "hiragana": "わたしぶね (watashibune)", "sinoVietnamese": "ĐỘ CHU", "meaning": "Chuyến đò ngang qua sông", "level": "N2", "breakdown": "渡 (Độ) + 舟 (Chu)", "mnemonic": "Chiếc đò đưa đón khách qua lại đôi bờ bến nước."},
        {"kanji": "難破船", "hiragana": "なんぱせん (nanpasen)", "sinoVietnamese": "NAN PHÁ THUYỀN", "meaning": "Con tàu bị đắm vỡ chìm", "level": "N1", "breakdown": "難 (Nan) + 破 (Phá) + 船 (Thuyền)", "mnemonic": "Con tàu gặp nạn vỡ tan giữa tâm bão biển sâu."},
        {"kanji": "帆船", "hiragana": "はんせん (hansen)", "sinoVietnamese": "PHÀM THUYỀN", "meaning": "Thuyền buồm căng gió", "level": "N2", "breakdown": "帆 (Phàm - cánh buồm) + 船 (Thuyền)", "mnemonic": "Cánh buồm đón gió đẩy con thuyền lướt sóng ra khơi."},
        {"kanji": "舟歌", "hiragana": "ふなうた (funauta)", "sinoVietnamese": "CHU CA", "meaning": "Khúc hát chèo đò du dương", "level": "N1", "breakdown": "舟 (Chu) + 歌 (Ca)", "mnemonic": "Điệu hò sông nước vang vọng trong chiều êm ả."}
    ],
    138: [ # 艮 (Cấn - Quẻ Cấn, kiên định dừng lại, mắt nhìn chằm chằm)
        {"kanji": "良い", "hiragana": "よい (yoi)", "sinoVietnamese": "LƯƠNG", "meaning": "Tốt lành, tuyệt vời", "level": "N5", "breakdown": "良 (Lương - biến thể từ 艮)", "mnemonic": "Tấm lòng trong sáng lương thiện hướng về điều tốt."},
        {"kanji": "良好", "hiragana": "りょうこう (ryōkō)", "sinoVietnamese": "LƯƠNG HẢO", "meaning": "Tốt đẹp, tiến triển thuận lợi", "level": "N2", "breakdown": "良 (Lương) + 好 (Hảo)", "mnemonic": "Tình trạng sức khỏe và công việc tiến triển rất tốt."},
        {"kanji": "限る", "hiragana": "かぎる (kagiru)", "sinoVietnamese": "HẠN", "meaning": "Giới hạn, hạn chế", "level": "N3", "breakdown": "阝 (Phụ) + 艮 (Cấn)", "mnemonic": "Chân núi sừng sững làm giới hạn dừng bước."},
        {"kanji": "限界", "hiragana": "げんかい (genkai)", "sinoVietnamese": "HẠN GIỚI", "meaning": "Giới hạn tột cùng", "level": "N2", "breakdown": "限 (Hạn - có 艮) + 界 (Giới)", "mnemonic": "Ngưỡng chịu đựng tối đa của con người."},
        {"kanji": "根", "hiragana": "ね (ne)", "sinoVietnamese": "CĂN", "meaning": "Rễ cây bám chặt", "level": "N3", "breakdown": "木 (Mộc) + 艮 (Cấn)", "mnemonic": "Rễ cây cắm sâu bám chặt vào lòng đất kiên định."},
        {"kanji": "根本", "hiragana": "こんぽん (konpon)", "sinoVietnamese": "CĂN BẢN", "meaning": "Gốc rễ căn bản vấn đề", "level": "N2", "breakdown": "根 (Căn - có 艮) + 本 (Bản)", "mnemonic": "Nền tảng cốt lõi của mọi sự việc."},
        {"kanji": "眼痕", "hiragana": "がんこん (gankon)", "sinoVietnamese": "NHÃN NGÂN", "meaning": "Vết sẹo nơi khóe mắt", "level": "N1", "breakdown": "Chứa gốc chữ 痕 (có 艮)", "mnemonic": "Vết sẹo để lại dấu tích không thể xóa nhòa."},
        {"kanji": "退恨", "hiragana": "たいこん (taikon)", "sinoVietnamese": "THỐI HẬN", "meaning": "Oán hận ngấm ngầm", "level": "N1", "breakdown": "Chứa chữ 恨 (Hận - có 艮)", "mnemonic": "Nỗi căm phẫn găm sâu trong lòng không nguôi."},
        {"kanji": "銀", "hiragana": "ぎん (gin)", "sinoVietnamese": "NGÂN", "meaning": "Bạc, màu ánh bạc sáng", "level": "N4", "breakdown": "金 (Kim) + 艮 (Cấn)", "mnemonic": "Kim loại trắng lấp lánh dừng ánh nhìn mê hoặc."},
        {"kanji": "銀行", "hiragana": "ぎんこう (ginkō)", "sinoVietnamese": "NGÂN HÀNG", "meaning": "Ngân hàng tài chính", "level": "N5", "breakdown": "銀 (Ngân - có 艮) + 行 (Hành)", "mnemonic": "Nơi lưu thông tiền bạc tài chính của toàn xã hội."}
    ],
    139: [ # 色 (Sắc - Màu sắc, nét mặt, tình cảm)
        {"kanji": "色", "hiragana": "いろ (iro)", "sinoVietnamese": "SẮC", "meaning": "Màu sắc tươi tắn", "level": "N5", "breakdown": "色 (Sắc)", "mnemonic": "Hai người ôm lấy nhau bộc lộ sắc thái tình cảm đằm thắm."},
        {"kanji": "景色", "hiragana": "けしき (keshiki)", "sinoVietnamese": "CẢNH SẮC", "meaning": "Phong cảnh thiên nhiên", "level": "N4", "breakdown": "景 (Cảnh) + 色 (Sắc)", "mnemonic": "Cảnh tượng non nước hữu tình lung linh sắc màu."},
        {"kanji": "特色", "hiragana": "とくしょく (tokushoku)", "sinoVietnamese": "ĐẶC SẮC", "meaning": "Đặc sắc, điểm độc đáo", "level": "N2", "breakdown": "特 (Đặc) + 色 (Sắc)", "mnemonic": "Gam màu cá tính làm nổi bật nét riêng biệt."},
        {"kanji": "色々", "hiragana": "いろいろ (iroiro)", "sinoVietnamese": "SẮC SẮC", "meaning": "Nhiều loại, phong phú", "level": "N5", "breakdown": "色 (Sắc) lặp lại", "mnemonic": "Muôn vàn màu sắc rực rỡ phong phú đa dạng."},
        {"kanji": "茶色", "hiragana": "ちゃいろ (chairo)", "sinoVietnamese": "TRÀ SẮC", "meaning": "Màu nâu trà trầm ấm", "level": "N5", "breakdown": "茶 (Trà) + 色 (Sắc)", "mnemonic": "Màu nâu mộc mạc như màu nước trà xanh đậm."},
        {"kanji": "黄色", "hiragana": "きいろ (kiiro)", "sinoVietnamese": "HOÀNG SẮC", "meaning": "Màu vàng rực rỡ", "level": "N5", "breakdown": "黄 (Hoàng) + 色 (Sắc)", "mnemonic": "Sắc vàng tươi sáng của ánh nắng mặt trời."},
        {"kanji": "青色", "hiragana": "あおいろ (aoiro)", "sinoVietnamese": "THANH SẮC", "meaning": "Màu xanh da trời, xanh lam", "level": "N5", "breakdown": "青 (Thanh) + 色 (Sắc)", "mnemonic": "Màu xanh thanh bình của đại dương và bầu trời."},
        {"kanji": "黒色", "hiragana": "くろいろ (kuroiro)", "sinoVietnamese": "HẮC SẮC", "meaning": "Màu đen tuyền", "level": "N5", "breakdown": "黒 (Hắc) + 色 (Sắc)", "mnemonic": "Sắc đen huyền bí như đêm tối mịt mù."},
        {"kanji": "灰色", "hiragana": "はいいろ (haiiro)", "sinoVietnamese": "HÔI SẮC", "meaning": "Màu xám tro", "level": "N4", "breakdown": "灰 (Hôi) + 色 (Sắc)", "mnemonic": "Sắc xám tĩnh lặng như tàn tro bếp lửa."},
        {"kanji": "気色", "hiragana": "けしき (keshiki) / きしょく", "sinoVietnamese": "KHÍ SẮC", "meaning": "Sắc mặt, tâm trạng biểu hiện", "level": "N1", "breakdown": "気 (Khí) + 色 (Sắc)", "mnemonic": "Nét mặt và khí sắc bộc lộ rõ tâm tư bên trong."}
    ],
    140: [ # 艸 / 艹 (Thảo - Cỏ cây, thảo mộc hoa lá)
        {"kanji": "草", "hiragana": "くさ (kusa)", "sinoVietnamese": "THẢO", "meaning": "Cỏ xanh, ngọn cỏ", "level": "N4", "breakdown": "艹 (Thảo) + 早 (Tảo)", "mnemonic": "Những mầm cỏ non đâm chồi sớm mai đón sương sớm."},
        {"kanji": "花", "hiragana": "はな (hana)", "sinoVietnamese": "HOA", "meaning": "Bông hoa tươi thắm", "level": "N5", "breakdown": "艹 (Thảo) + 化 (Hóa)", "mnemonic": "Cây cỏ biến hóa nở ra những đóa hoa thơm ngát."},
        {"kanji": "お茶", "hiragana": "おちゃ (ocha)", "sinoVietnamese": "TRÀ", "meaning": "Trà xanh, chè", "level": "N5", "breakdown": "艹 (Thảo) + 人 + 木", "mnemonic": "Lá thảo mộc con người hái từ cành cây pha nước uống."},
        {"kanji": "薬", "hiragana": "くすり (kusuri)", "sinoVietnamese": "DƯỢC", "meaning": "Thuốc chữa bệnh", "level": "N4", "breakdown": "艹 (Thảo) + 楽 (Lạc)", "mnemonic": "Cỏ cây thảo dược giúp cơ thể khỏi bệnh vui vẻ trở lại."},
        {"kanji": "若い", "hiragana": "わかい (wakai)", "sinoVietnamese": "NHƯỢC", "meaning": "Trẻ trung, tươi trẻ", "level": "N5", "breakdown": "艹 (Thảo) + 右 (Hữu)", "mnemonic": "Sức sống tươi non dồi dào như ngọn cỏ mùa xuân."},
        {"kanji": "苦しい", "hiragana": "くるしい (kurushii)", "sinoVietnamese": "KHỔ", "meaning": "Đau khổ, đắng cay", "level": "N4", "breakdown": "艹 (Thảo) + 古 (Cổ)", "mnemonic": "Nếm ngọn cỏ đắng từ ngàn xưa đọng lại vị cay đắng."},
        {"kanji": "荷物", "hiragana": "にもつ (nimotsu)", "sinoVietnamese": "HÀ VẬT", "meaning": "Hành lý, đồ đạc mang theo", "level": "N5", "breakdown": "荷 (Hà - có 艹) + 物 (Vật)", "mnemonic": "Gánh nặng thảo mộc đồ đạc trên vai đường xa."},
        {"kanji": "英語", "hiragana": "えいご (eigo)", "sinoVietnamese": "ANH NGỮ", "meaning": "Tiếng Anh", "level": "N5", "breakdown": "英 (Anh - có 艹) + 語 (Ngữ)", "mnemonic": "Ngôn ngữ tinh hoa rực rỡ như hoa cỏ nước Anh."},
        {"kanji": "葉っぱ", "hiragana": "はっぱ (happa)", "sinoVietnamese": "DIỆP", "meaning": "Chiếc lá cây xanh tươi", "level": "N3", "breakdown": "葉 (Diệp - có 艹)", "mnemonic": "Những phiến lá non xanh rì xào xạc trong gió."},
        {"kanji": "菜園", "hiragana": "さいえん (saien)", "sinoVietnamese": "THÁI VIÊN", "meaning": "Vườn rau xanh mướt", "level": "N2", "breakdown": "菜 (Thái - có 艹) + 園 (Viên)", "mnemonic": "Mảnh vườn trồng đủ thứ rau củ tươi ngon."}
    ]
}

# Write to scripts/radical_data_101_to_140.py
with open('scripts/radical_data_101_to_140.py', 'w', encoding='utf-8') as f:
    f.write("# -*- coding: utf-8 -*-\n")
    f.write('"""Radicals 101 to 140 Vocabularies"""\n')
    f.write("RADICAL_VOCABS_101_TO_140 = " + json.dumps(data, ensure_ascii=False, indent=2) + "\n")

print(f"Successfully generated radicals 101-140! Total radicals: {len(data)}")
for k in sorted(data.keys()):
    assert len(data[k]) >= 10
    print(f"Radical {k}: {len(data[k])} words")
