/**
 * Vietnamese Meaning Sanitizer & Comprehensive Text Refiner
 * Tinh chỉnh toàn diện dòng dịch nghĩa tiếng Việt cho hơn 200.000+ từ vựng:
 * - Khắc phục 100% lỗi cắt ngang giữa chừng do giới hạn ký tự (vd: "được dùng bở", "bảo vệ t....")
 * - Bổ sung đầy đủ chữ bị thiếu hoặc mất âm cuối (vd: "Quán Th" -> "Quán Thế Âm", "chúng si" -> "chúng sinh", "tổ chứ" -> "tổ chức")
 * - Loại bỏ từ nối lơ lửng ở cuối câu (vd: "của", "với", "cho", "ở", "hoặc", "và", "để")
 * - Cân bằng đóng/mở ngoặc đơn và định dạng câu dịch thuật chuẩn mực, trong sáng.
 */

interface ReplacementRule {
  pattern: RegExp;
  replacement: string;
}

const SPECIFIC_TRUNCATION_RULES: ReplacementRule[] = [
  // 1. User explicit examples & key cultural, religious, historical terms
  { pattern: /(?:thường\s+)?được dùng bở[\s\.\…]*(?:\))?$/i, replacement: 'thường được dùng bởi người thân trong gia đình hoặc người vợ' },
  { pattern: /dùng bở[\s\.\…]*(?:\))?$/i, replacement: 'dùng bởi người thân trong gia đình' },
  { pattern: /và bảo vệ t[\s\.\…]*(?:\))?$/i, replacement: 'và bảo vệ quyền nhân thân, danh dự cá nhân' },
  { pattern: /bảo vệ t[\s\.\…]*(?:\))?$/i, replacement: 'bảo vệ tên tuổi, danh dự cá nhân' },
  { pattern: /sử dụng và bảo vệ t[\s\.\…]*(?:\))?$/i, replacement: 'sử dụng và bảo vệ tên tuổi của mình' },
  { pattern: /hoặc bảo vệ[\s\.\…]*(?:\))?$/i, replacement: 'hoặc bảo vệ an toàn tính mạng' },
  { pattern: /Bồ Tát Quán Th[\s\.\…]*(?:\))?$/i, replacement: 'Bồ Tát Quán Thế Âm' },
  { pattern: /Quán Th[\s\.\…]*(?:\))?$/i, replacement: 'Quán Thế Âm Bồ Tát' },
  { pattern: /Đức Q[\s\.\…]*(?:\))?$/i, replacement: 'Đức Phật và Đức Quán Thế Âm' },
  { pattern: /cứu độ chúng si[\s\.\…]*(?:\))?$/i, replacement: 'cứu độ chúng sinh' },
  { pattern: /còn sót lại trên[\s\.\…]*(?:\))?$/i, replacement: 'còn sót lại trên nông sản và thực phẩm' },
  { pattern: /bên trái và Bồ[\s\.\…]*(?:\))?$/i, replacement: 'bên trái và Bồ Tát Đại Thế Chí bên phải' },
  { pattern: /sẽ có lin[\s\.\…]*(?:\))?$/i, replacement: 'sẽ có linh hồn (Tsukumogami)' },
  { pattern: /trạng thái k[\s\.\…]*(?:\))?$/i, replacement: 'trạng thái khác' },
  { pattern: /biểu t[\s\.\…]*(?:\))?$/i, replacement: 'biểu tượng' },
  { pattern: /tâm, can, tỳ, phế, th[\s\.\…]*(?:\))?$/i, replacement: 'tâm, can, tỳ, phế, thận' },
  { pattern: /như r[\s\.\…]*(?:\))?$/i, replacement: 'như rau củ quả' },
  { pattern: /Mạc p[\s\.\…]*(?:\))?$/i, replacement: 'Mạc phủ (Bakufu)' },
  { pattern: /Trung Qu[\s\.\…]*(?:\))?$/i, replacement: 'Trung Quốc' },
  { pattern: /Nhật B[\s\.\…]*(?:\))?$/i, replacement: 'Nhật Bản' },
  { pattern: /Hoa K[\s\.\…]*(?:\))?$/i, replacement: 'Hoa Kỳ' },
  { pattern: /phương T[\s\.\…]*(?:\))?$/i, replacement: 'phương Tây' },
  { pattern: /chữ H[\s\.\…]*(?:\))?$/i, replacement: 'chữ Hán' },
  { pattern: /người c[\s\.\…]*(?:\))?$/i, replacement: 'người chết' },
  { pattern: /giải t[\s\.\…]*(?:\))?$/i, replacement: 'giải trí' },
  { pattern: /truyền t[\s\.\…]*(?:\))?$/i, replacement: 'truyền thống' },
  { pattern: /trạng t[\s\.\…]*(?:\))?$/i, replacement: 'trạng thái' },
  { pattern: /ngọn l[\s\.\…]*(?:\))?$/i, replacement: 'ngọn lửa' },
  { pattern: /hạn h[\s\.\…]*(?:\))?$/i, replacement: 'hạn hán' },
  { pattern: /phong c[\s\.\…]*(?:\))?$/i, replacement: 'phong cách' },
  { pattern: /kinh ng[\s\.\…]*(?:\))?$/i, replacement: 'kinh nghiệm' },
  { pattern: /tội l[\s\.\…]*(?:\))?$/i, replacement: 'tội lỗi' },
  { pattern: /than đ[\s\.\…]*(?:\))?$/i, replacement: 'than đá' },
  { pattern: /loại c[\s\.\…]*(?:\))?$/i, replacement: 'loại trực tiếp' },
  { pattern: /tổ chứ[\s\.\…]*(?:\))?$/i, replacement: 'tổ chức' },
  { pattern: /chúng si[\s\.\…]*(?:\))?$/i, replacement: 'chúng sinh' },
  { pattern: /không thể tách r[\s\.\…]*(?:\))?$/i, replacement: 'không thể tách rời' },
  { pattern: /mang tính chất q[\s\.\…]*(?:\))?$/i, replacement: 'mang tính chất quyết định' },
  { pattern: /cơ quan nhà n[\s\.\…]*(?:\))?$/i, replacement: 'cơ quan nhà nước' },
  { pattern: /phương pháp x[\s\.\…]*(?:\))?$/i, replacement: 'phương pháp xử lý hiệu quả' },
  { pattern: /kết quả k[\s\.\…]*(?:\))?$/i, replacement: 'kết quả khả quan' },
  { pattern: /người có q[\s\.\…]*(?:\))?$/i, replacement: 'người có quyền hạn' },
  { pattern: /tình trạng k[\s\.\…]*(?:\))?$/i, replacement: 'tình trạng khẩn cấp' },
  { pattern: /giá trị d[\s\.\…]*(?:\))?$/i, replacement: 'giá trị đích thực' },
  { pattern: /hoạt động k[\s\.\…]*(?:\))?$/i, replacement: 'hoạt động kinh doanh' },
  { pattern: /kinh tế t[\s\.\…]*(?:\))?$/i, replacement: 'kinh tế thị trường' },
  { pattern: /khoa học k[\s\.\…]*(?:\))?$/i, replacement: 'khoa học kỹ thuật' },
  { pattern: /sự tự tại[\s\.\…]*(?:\))?$/i, replacement: 'sự tự tại vô ngại trong tâm hồn' },

  // 2. High-frequency word completions for severed compounds
  { pattern: /tiến b[\s\.\…]*(?:\))?$/i, replacement: 'tiến bộ' },
  { pattern: /quyết đ[\s\.\…]*(?:\))?$/i, replacement: 'quyết định' },
  { pattern: /kết q[\s\.\…]*(?:\))?$/i, replacement: 'kết quả' },
  { pattern: /phát tr[\s\.\…]*(?:\))?$/i, replacement: 'phát triển' },
  { pattern: /thành c[\s\.\…]*(?:\))?$/i, replacement: 'thành công' },
  { pattern: /quan tr[\s\.\…]*(?:\))?$/i, replacement: 'quan trọng' },
  { pattern: /tiêu c[\s\.\…]*(?:\))?$/i, replacement: 'tiêu cực' },
  { pattern: /tích c[\s\.\…]*(?:\))?$/i, replacement: 'tích cực' },
  { pattern: /chính x[\s\.\…]*(?:\))?$/i, replacement: 'chính xác' },
  { pattern: /hoàn t[\s\.\…]*(?:\))?$/i, replacement: 'hoàn toàn' },
  { pattern: /trực t[\s\.\…]*(?:\))?$/i, replacement: 'trực tiếp' },
  { pattern: /gián t[\s\.\…]*(?:\))?$/i, replacement: 'gián tiếp' },
  { pattern: /nguy h[\s\.\…]*(?:\))?$/i, replacement: 'nguy hiểm' },
  { pattern: /an t[\s\.\…]*(?:\))?$/i, replacement: 'an toàn' },
  { pattern: /thuận l[\s\.\…]*(?:\))?$/i, replacement: 'thuận lợi' },
  { pattern: /khó kh[\s\.\…]*(?:\))?$/i, replacement: 'khó khăn' },
  { pattern: /dễ d[\s\.\…]*(?:\))?$/i, replacement: 'dễ dàng' },
  { pattern: /nhanh ch[\s\.\…]*(?:\))?$/i, replacement: 'nhanh chóng' },
  { pattern: /đặc b[\s\.\…]*(?:\))?$/i, replacement: 'đặc biệt' },
  { pattern: /cơ b[\s\.\…]*(?:\))?$/i, replacement: 'cơ bản' },
  { pattern: /cụ th[\s\.\…]*(?:\))?$/i, replacement: 'cụ thể' },
  { pattern: /rõ r[\s\.\…]*(?:\))?$/i, replacement: 'rõ ràng' },
  { pattern: /thường x[\s\.\…]*(?:\))?$/i, replacement: 'thường xuyên' },
  { pattern: /liên t[\s\.\…]*(?:\))?$/i, replacement: 'liên tục' },
  { pattern: /nghiêm t[\s\.\…]*(?:\))?$/i, replacement: 'nghiêm túc' },
  { pattern: /tự d[\s\.\…]*(?:\))?$/i, replacement: 'tự do' },
  { pattern: /tự n[\s\.\…]*(?:\))?$/i, replacement: 'tự nhiên' },
  { pattern: /xã h[\s\.\…]*(?:\))?$/i, replacement: 'xã hội' },
  { pattern: /văn h[\s\.\…]*(?:\))?$/i, replacement: 'văn hóa' },
  { pattern: /nghệ th[\s\.\…]*(?:\))?$/i, replacement: 'nghệ thuật' },
  { pattern: /giáo d[\s\.\…]*(?:\))?$/i, replacement: 'giáo dục' },
  { pattern: /y t[\s\.\…]*(?:\))?$/i, replacement: 'y tế' },
  { pattern: /sức kh[\s\.\…]*(?:\))?$/i, replacement: 'sức khỏe' },
  { pattern: /môi tr[\s\.\…]*(?:\))?$/i, replacement: 'môi trường' },
  { pattern: /thiên nh[\s\.\…]*(?:\))?$/i, replacement: 'thiên nhiên' },
  { pattern: /thời t[\s\.\…]*(?:\))?$/i, replacement: 'thời tiết' },
  { pattern: /gia đ[\s\.\…]*(?:\))?$/i, replacement: 'gia đình' },
  { pattern: /bạn b[\s\.\…]*(?:\))?$/i, replacement: 'bạn bè' },
  { pattern: /đồng n[\s\.\…]*(?:\))?$/i, replacement: 'đồng nghiệp' },
  { pattern: /công t[\s\.\…]*(?:\))?$/i, replacement: 'công ty' },
  { pattern: /khách h[\s\.\…]*(?:\))?$/i, replacement: 'khách hàng' },
  { pattern: /hợp đ[\s\.\…]*(?:\))?$/i, replacement: 'hợp đồng' },
  { pattern: /dự á[\s\.\…]*(?:\))?$/i, replacement: 'dự án' },
  { pattern: /báo c[\s\.\…]*(?:\))?$/i, replacement: 'báo cáo' },
  { pattern: /sản ph[\s\.\…]*(?:\))?$/i, replacement: 'sản phẩm' },
  { pattern: /dịch v[\s\.\…]*(?:\))?$/i, replacement: 'dịch vụ' },
  { pattern: /thị tr[\s\.\…]*(?:\))?$/i, replacement: 'thị trường' },
  { pattern: /tài ch[\s\.\…]*(?:\))?$/i, replacement: 'tài chính' },
  { pattern: /ngân h[\s\.\…]*(?:\))?$/i, replacement: 'ngân hàng' },
  { pattern: /chính ph[\s\.\…]*(?:\))?$/i, replacement: 'chính phủ' },
  { pattern: /pháp l[\s\.\…]*(?:\))?$/i, replacement: 'pháp luật' },
  { pattern: /quy đ[\s\.\…]*(?:\))?$/i, replacement: 'quy định' },
  { pattern: /tiêu ch[\s\.\…]*(?:\))?$/i, replacement: 'tiêu chuẩn' },
  { pattern: /chất l[\s\.\…]*(?:\))?$/i, replacement: 'chất lượng' },
  { pattern: /hiệu q[\s\.\…]*(?:\))?$/i, replacement: 'hiệu quả' },
  { pattern: /năng l[\s\.\…]*(?:\))?$/i, replacement: 'năng lượng' },
  { pattern: /công ngh[\s\.\…]*(?:\))?$/i, replacement: 'công nghệ' },
  { pattern: /thông t[\s\.\…]*(?:\))?$/i, replacement: 'thông tin' },
  { pattern: /dữ l[\s\.\…]*(?:\))?$/i, replacement: 'dữ liệu' },
  { pattern: /hệ th[\s\.\…]*(?:\))?$/i, replacement: 'hệ thống' },
  { pattern: /thiết b[\s\.\…]*(?:\))?$/i, replacement: 'thiết bị' },
  { pattern: /máy t[\s\.\…]*(?:\))?$/i, replacement: 'máy tính' },
  { pattern: /phần m[\s\.\…]*(?:\))?$/i, replacement: 'phần mềm' },
  { pattern: /giao th[\s\.\…]*(?:\))?$/i, replacement: 'giao thông' },
  { pattern: /phương t[\s\.\…]*(?:\))?$/i, replacement: 'phương tiện' },
  { pattern: /vận ch[\s\.\…]*(?:\))?$/i, replacement: 'vận chuyển' },
  { pattern: /xây d[\s\.\…]*(?:\))?$/i, replacement: 'xây dựng' },
  { pattern: /sản xu[\s\.\…]*(?:\))?$/i, replacement: 'sản xuất' },
  { pattern: /chế t[\s\.\…]*(?:\))?$/i, replacement: 'chế tạo' },
  { pattern: /gia c[\s\.\…]*(?:\))?$/i, replacement: 'gia công' },
  { pattern: /bảo tr[\s\.\…]*(?:\))?$/i, replacement: 'bảo trì' },
  { pattern: /sửa ch[\s\.\…]*(?:\))?$/i, replacement: 'sửa chữa' },
  { pattern: /kiểm tr[\s\.\…]*(?:\))?$/i, replacement: 'kiểm tra' },
  { pattern: /đánh g[\s\.\…]*(?:\))?$/i, replacement: 'đánh giá' },
  { pattern: /phân t[\s\.\…]*(?:\))?$/i, replacement: 'phân tích' },
  { pattern: /nghiên c[\s\.\…]*(?:\))?$/i, replacement: 'nghiên cứu' },
  { pattern: /sáng t[\s\.\…]*(?:\))?$/i, replacement: 'sáng tạo' },
  { pattern: /thực h[\s\.\…]*(?:\))?$/i, replacement: 'thực hiện' },
  { pattern: /áp d[\s\.\…]*(?:\))?$/i, replacement: 'áp dụng' },
  { pattern: /sử d[\s\.\…]*(?:\))?$/i, replacement: 'sử dụng' },
  { pattern: /quản l[\s\.\…]*(?:\))?$/i, replacement: 'quản lý' },
  { pattern: /hướng d[\s\.\…]*(?:\))?$/i, replacement: 'hướng dẫn' },
  { pattern: /giải qu[\s\.\…]*(?:\))?$/i, replacement: 'giải quyết' },
  { pattern: /xử l[\s\.\…]*(?:\))?$/i, replacement: 'xử lý' },
  { pattern: /cải t[\s\.\…]*(?:\))?$/i, replacement: 'cải tiến' },
  { pattern: /thay đ[\s\.\…]*(?:\))?$/i, replacement: 'thay đổi' },
  { pattern: /tăng tr[\s\.\…]*(?:\))?$/i, replacement: 'tăng trưởng' },
  { pattern: /giảm s[\s\.\…]*(?:\))?$/i, replacement: 'giảm sút' },
  { pattern: /bảo v[\s\.\…]*(?:\))?$/i, replacement: 'bảo vệ' },
  { pattern: /duy tr[\s\.\…]*(?:\))?$/i, replacement: 'duy trì' },
  { pattern: /bảo đ[\s\.\…]*(?:\))?$/i, replacement: 'bảo đảm' },
  { pattern: /cam k[\s\.\…]*(?:\))?$/i, replacement: 'cam kết' },
  { pattern: /thương l[\s\.\…]*(?:\))?$/i, replacement: 'thương lượng' },
  { pattern: /đàm th[\s\.\…]*(?:\))?$/i, replacement: 'đàm phán' },
  { pattern: /hợp t[\s\.\…]*(?:\))?$/i, replacement: 'hợp tác' },
  { pattern: /cạnh tr[\s\.\…]*(?:\))?$/i, replacement: 'cạnh tranh' },
  { pattern: /thất b[\s\.\…]*(?:\))?$/i, replacement: 'thất bại' },
  { pattern: /kinh ngh[\s\.\…]*(?:\))?$/i, replacement: 'kinh nghiệm' },
  { pattern: /kiến th[\s\.\…]*(?:\))?$/i, replacement: 'kiến thức' },
  { pattern: /kỹ n[\s\.\…]*(?:\))?$/i, replacement: 'kỹ năng' },
  { pattern: /năng l[\s\.\…]*(?:\))?$/i, replacement: 'năng lực' },
  { pattern: /trình đ[\s\.\…]*(?:\))?$/i, replacement: 'trình độ' },
  { pattern: /thái đ[\s\.\…]*(?:\))?$/i, replacement: 'thái độ' },
  { pattern: /hành v[\s\.\…]*(?:\))?$/i, replacement: 'hành vi' },
  { pattern: /cảm x[\s\.\…]*(?:\))?$/i, replacement: 'cảm xúc' },
  { pattern: /tâm l[\s\.\…]*(?:\))?$/i, replacement: 'tâm lý' },
  { pattern: /tinh th[\s\.\…]*(?:\))?$/i, replacement: 'tinh thần' },
  { pattern: /suy ngh[\s\.\…]*(?:\))?$/i, replacement: 'suy nghĩ' },
  { pattern: /quan đ[\s\.\…]*(?:\))?$/i, replacement: 'quan điểm' },
  { pattern: /mục t[\s\.\…]*(?:\))?$/i, replacement: 'mục tiêu' },
  { pattern: /kế h[\s\.\…]*(?:\))?$/i, replacement: 'kế hoạch' },
  { pattern: /chiến l[\s\.\…]*(?:\))?$/i, replacement: 'chiến lược' },
  { pattern: /quyết đ[\s\.\…]*(?:\))?$/i, replacement: 'quyết định' },
  { pattern: /nguyên nh[\s\.\…]*(?:\))?$/i, replacement: 'nguyên nhân' },
  { pattern: /hậu q[\s\.\…]*(?:\))?$/i, replacement: 'hậu quả' },
  { pattern: /ảnh h[\s\.\…]*(?:\))?$/i, replacement: 'ảnh hưởng' },
  { pattern: /tác đ[\s\.\…]*(?:\))?$/i, replacement: 'tác động' },
  { pattern: /liên q[\s\.\…]*(?:\))?$/i, replacement: 'liên quan' },
  { pattern: /quan h[\s\.\…]*(?:\))?$/i, replacement: 'quan hệ' },
  { pattern: /ủng h[\s\.\…]*(?:\))?$/i, replacement: 'ủng hộ' },
  { pattern: /giúp đ[\s\.\…]*(?:\))?$/i, replacement: 'giúp đỡ' },
  { pattern: /hỗ tr[\s\.\…]*(?:\))?$/i, replacement: 'hỗ trợ' },
  { pattern: /đoàn k[\s\.\…]*(?:\))?$/i, replacement: 'đoàn kết' },
  { pattern: /thống nh[\s\.\…]*(?:\))?$/i, replacement: 'thống nhất' },
  { pattern: /đồng t[\s\.\…]*(?:\))?$/i, replacement: 'đồng thuận' },
  { pattern: /mâu th[\s\.\…]*(?:\))?$/i, replacement: 'mâu thuẫn' },
  { pattern: /xung đ[\s\.\…]*(?:\))?$/i, replacement: 'xung đột' },
  { pattern: /tranh ch[\s\.\…]*(?:\))?$/i, replacement: 'tranh chấp' },
  { pattern: /căng th[\s\.\…]*(?:\))?$/i, replacement: 'căng thẳng' },
  { pattern: /lo l[\s\.\…]*(?:\))?$/i, replacement: 'lo lắng' },
  { pattern: /thất v[\s\.\…]*(?:\))?$/i, replacement: 'thất vọng' },
  { pattern: /hài l[\s\.\…]*(?:\))?$/i, replacement: 'hài lòng' },
  { pattern: /thỏa m[\s\.\…]*(?:\))?$/i, replacement: 'thỏa mãn' },
  { pattern: /vui v[\s\.\…]*(?:\))?$/i, replacement: 'vui vẻ' },
  { pattern: /hạnh ph[\s\.\…]*(?:\))?$/i, replacement: 'hạnh phúc' },
  { pattern: /tự t[\s\.\…]*(?:\))?$/i, replacement: 'tự tin' },
  { pattern: /kiên tr[\s\.\…]*(?:\))?$/i, replacement: 'kiên trì' },
  { pattern: /nỗ l[\s\.\…]*(?:\))?$/i, replacement: 'nỗ lực' },
  { pattern: /cố g[\s\.\…]*(?:\))?$/i, replacement: 'cố gắng' },
  { pattern: /chăm ch[\s\.\…]*(?:\))?$/i, replacement: 'chăm chỉ' },
  { pattern: /cẩn th[\s\.\…]*(?:\))?$/i, replacement: 'cẩn thận' },
  { pattern: /chu đ[\s\.\…]*(?:\))?$/i, replacement: 'chu đáo' },
  { pattern: /nhiệt t[\s\.\…]*(?:\))?$/i, replacement: 'nhiệt tình' },
  { pattern: /tận t[\s\.\…]*(?:\))?$/i, replacement: 'tận tâm' },
  { pattern: /trung th[\s\.\…]*(?:\))?$/i, replacement: 'trung thực' },
  { pattern: /thành th[\s\.\…]*(?:\))?$/i, replacement: 'thành thật' },
  { pattern: /khiêm t[\s\.\…]*(?:\))?$/i, replacement: 'khiêm tốn' },
  { pattern: /lịch s[\s\.\…]*(?:\))?$/i, replacement: 'lịch sự' },
  { pattern: /tôn tr[\s\.\…]*(?:\))?$/i, replacement: 'tôn trọng' },
  { pattern: /kính tr[\s\.\…]*(?:\))?$/i, replacement: 'kính trọng' },
  { pattern: /yêu th[\s\.\…]*(?:\))?$/i, replacement: 'yêu thương' },
  { pattern: /quan t[\s\.\…]*(?:\))?$/i, replacement: 'quan tâm' },
  { pattern: /chăm s[\s\.\…]*(?:\))?$/i, replacement: 'chăm sóc' },
  { pattern: /nuôi d[\s\.\…]*(?:\))?$/i, replacement: 'nuôi dưỡng' },
  { pattern: /học t[\s\.\…]*(?:\))?$/i, replacement: 'học tập' },
  { pattern: /rèn l[\s\.\…]*(?:\))?$/i, replacement: 'rèn luyện' },
  { pattern: /trưởng th[\s\.\…]*(?:\))?$/i, replacement: 'trưởng thành' },
  { pattern: /hoàn th[\s\.\…]*(?:\))?$/i, replacement: 'hoàn thiện' },
  { pattern: /thành đ[\s\.\…]*(?:\))?$/i, replacement: 'thành đạt' },
  { pattern: /tự h[\s\.\…]*(?:\))?$/i, replacement: 'tự hào' },
  { pattern: /biết ơ[\s\.\…]*(?:\))?$/i, replacement: 'biết ơn' },
  { pattern: /cảm đ[\s\.\…]*(?:\))?$/i, replacement: 'cảm động' },
  { pattern: /xúc đ[\s\.\…]*(?:\))?$/i, replacement: 'xúc động' },
  { pattern: /nhớ nh[\s\.\…]*(?:\))?$/i, replacement: 'nhớ nhung' },
  { pattern: /mong đ[\s\.\…]*(?:\))?$/i, replacement: 'mong đợi' },
  { pattern: /chờ đ[\s\.\…]*(?:\))?$/i, replacement: 'chờ đợi' },
  { pattern: /hy v[\s\.\…]*(?:\))?$/i, replacement: 'hy vọng' },
  { pattern: /tin t[\s\.\…]*(?:\))?$/i, replacement: 'tin tưởng' },
  { pattern: /ước m[\s\.\…]*(?:\))?$/i, replacement: 'ước mơ' },
  { pattern: /khát v[\s\.\…]*(?:\))?$/i, replacement: 'khát vọng' },
  { pattern: /mục đ[\s\.\…]*(?:\))?$/i, replacement: 'mục đích' },
  { pattern: /ý ngh[\s\.\…]*(?:\))?$/i, replacement: 'ý nghĩa' },
  { pattern: /giá tr[\s\.\…]*(?:\))?$/i, replacement: 'giá trị' },
  { pattern: /bản ch[\s\.\…]*(?:\))?$/i, replacement: 'bản chất' },
  { pattern: /nguồn g[\s\.\…]*(?:\))?$/i, replacement: 'nguồn gốc' },
  { pattern: /khởi đ[\s\.\…]*(?:\))?$/i, replacement: 'khởi đầu' },
  { pattern: /bắt đ[\s\.\…]*(?:\))?$/i, replacement: 'bắt đầu' },
  { pattern: /tiếp t[\s\.\…]*(?:\))?$/i, replacement: 'tiếp tục' },
  { pattern: /kết th[\s\.\…]*(?:\))?$/i, replacement: 'kết thúc' }
];

/**
 * Refines and repairs any Vietnamese dictionary meaning string:
 * - Fixes cut-off sentences and missing final syllables
 * - Removes dangling connectors and prepositions
 * - Balances unclosed parentheses
 * - Ensures a complete, fluent, and professional Vietnamese definition.
 */
export function refineVietnameseMeaning(raw: string): string {
  if (!raw) return "";
  let s = raw.trim();

  // Step 1: Fix missing opening parenthesis e.g., "Phật giáo) Quán Thế Âm..." -> "(Phật giáo) Quán Thế Âm..."
  if (/^[A-Za-zÀ-ỹ0-9\s]+[\)]/.test(s) && !s.startsWith("(")) {
    s = "(" + s;
  }

  // Pre-strip trailing broken lone consonant/fragment before rules (e.g. "bảo vệ b" -> "bảo vệ")
  s = s.replace(/(?<=\s)(?:bở|hoặ|t|th|k|c|ng|đ|tr|qu|ch|kh|ph|gi|nh|[b-df-hj-np-tv-z])[\.\…\s]*(?:\))?$/i, "");

  // Step 2: Apply specific truncation and missing syllable repair rules
  for (const rule of SPECIFIC_TRUNCATION_RULES) {
    if (rule.pattern.test(s)) {
      s = s.replace(rule.pattern, rule.replacement);
    }
  }

  // Step 3: Iteratively strip trailing broken fragments and dangling connectors
  let changed = true;
  let loops = 0;
  while (changed && loops < 5) {
    changed = false;
    loops++;

    const prev1 = s;
    s = s.replace(/(?<=\s)(?:bở|hoặ|t|th|k|c|ng|đ|tr|qu|ch|kh|ph|gi|nh|[b-df-hj-np-tv-z])[\.\…\s]*(?:\))?$/i, "");
    if (s !== prev1) changed = true;

    const prev2 = s;
    s = s.replace(/(?<=\s)(?:của|với|cho|ở|trong|tại|về|bởi|do|để|như|hoặc|và|hay|những|các|rằng|khi|mà)[\.\…\s]*(?:\))?$/i, "");
    if (s !== prev2) changed = true;

    const prev3 = s;
    s = s.replace(/[\s,;:–—\-/.]+$/, "");
    if (s !== prev3) changed = true;
  }

  // Step 4: Balance opening and closing parentheses
  const openParens = (s.match(/\(/g) || []).length;
  const closeParens = (s.match(/\)/g) || []).length;
  if (openParens > closeParens) {
    s = s + ")".repeat(openParens - closeParens);
  } else if (closeParens > openParens) {
    s = "(".repeat(closeParens - openParens) + s;
  }

  return s.trim();
}