// Types for 5 New Advanced Corporate Culture Features (Submodules 77-81)

// 1. MEISHI KOUKAN & KHÁCH HÀNG (Trao đổi danh thiếp & Tiếp khách)
export interface MeishiExchangeItem {
  id: string;
  scenarioTitle: string; // VD: Trao danh thiếp đồng thời khi đối phương cũng chìa ra
  subCategory: 'Đổi danh thiếp' | 'Tiếp khách sảnh' | 'Bố trí trà nước' | 'Tiễn khách';
  keyJapanesePhrase: string; // VD: 頂戴いたします。〇〇の△△と申します
  reading: string;
  romaji: string;
  vietnameseMeaning: string;
  etiquetteRule: string; // Quy tắc ứng xử cốt lõi (vị trí tay, độ cao, cách giữ hộp danh thiếp)
  stepByStepAction: string[]; // Các bước tuần tự
  commonFauxPas: string; // Lỗi cấm kỵ (nhét túi quần, viết lên danh thiếp, che tên)
  culturalExplanation: string; // Giải thích chi tiết hơn: Tại sao xem danh thiếp như chính bản thân người đối diện
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 2. NOMIKAI & BÀN TIỆC DOANH NGHIỆP (Bàn rượu & Ngoại giao tiệc tùng)
export interface NomikaiEtiquetteItem {
  id: string;
  eventContext: string; // VD: Tiệc chào đón nhân viên mới (Shangeikai) hoặc Tiếp khách B2B
  japaneseTerm: string; // VD: 酌回り (Shakumawari), 駆けつけ一杯 (Kaketsuke Ippai)
  reading: string;
  romaji: string;
  vietnameseMeaning: string;
  servingPouringRules: string; // Quy tắc rót bia/rượu (cầm thân chai nhãn hướng lên, miệng ly thấp hơn)
  communicationTactics: string; // Cách mở lời, nghe sếp chia sẻ, nghệ thuật khen ngợi
  morningAfterEtiquette: string; // Nghi thức cảm ơn sáng hôm sau (昨晩はごちそうさまでした)
  culturalExplanation: string; // Giải thích chi tiết hơn: Nomikai là "Nomunication" - tháo bỏ vỏ bọc Tatemae
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 3. RINGISHO & NEMAWASHI (Trình ký & Vận động hành lang)
export interface RingishoNemawashiItem {
  id: string;
  decisionMakingTopic: string; // VD: Xin ngân sách mua phần mềm mới cho phòng ban
  nemawashiPhase: 'Chuẩn bị dữ liệu' | 'Tham vấn tiền trạm' | 'Soạn đơn Ringisho' | 'Đóng dấu Hanco';
  keyPersuasionPhrase: string; // VD: 事前にご相談させていただきたく存じます
  reading: string;
  romaji: string;
  vietnameseMeaning: string;
  processExecutionSteps: string[]; // Trình tự Nemawashi chuẩn xác
  hancoProtocol: string; // Quy tắc đóng dấu Hanco (dấu cấp dưới hơi nghiêng về phía sếp)
  pitfallWarning: string; // Cấm kỵ: Đưa ra quyết định đột ngột trong cuộc họp mà chưa Nemawashi
  culturalExplanation: string; // Giải thích chi tiết hơn: Tránh mất mặt (Mentsu), chia sẻ trách nhiệm tập thể
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 4. 5S - KAIZEN - HIYARI HATTO (Quản trị sản xuất & An toàn văn phòng)
export interface Kaizen5SHiyariItem {
  id: string;
  systemStandard: '5S Văn phòng' | 'Kaizen Cải tiến' | 'Hiyari Hatto' | 'Báo cáo A3';
  title: string; // VD: Báo cáo Suýt Gây Họa (ヒヤリ・ハット) trong dự án IT
  japaneseTerm: string;
  reading: string;
  vietnameseMeaning: string;
  operationalMethodology: string; // Phương pháp áp dụng thực tế
  realCaseExample: string; // Ví dụ tình huống tại công xưởng / văn phòng
  blamelessCulturePhilosophy: string; // Triết lý "Lỗi ở quy trình, không đổ lỗi con người"
  culturalExplanation: string; // Giải thích chi tiết hơn: Tỷ lệ tai nạn Heinrich 1:29:300 và bí quyết của Toyota
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// 5. GIAO TIẾP ĐA VĂN HÓA NHẬT - VIỆT (Cầu nối BrSE, Comtor & Nhân viên)
export interface NichietuBridgeItem {
  id: string;
  frictionPointTitle: string; // VD: Sự khác biệt về khái niệm "Đúng hạn (Deadline Genshu)"
  workplaceCategory: 'Xử lý Deadline' | 'Nhận chỉ thị & Kakunin' | 'Giải thích sự cố' | 'Nghỉ phép & Tăng ca';
  vietnamesePerspective: string; // Góc nhìn phản xạ của nhân sự Việt
  japaneseBossMindset: string; // Tâm lý và kỳ vọng thực sự của sếp Nhật
  recommendedBridgeAction: string; // Hành động đề xuất giúp đôi bên thông suốt
  modelDialogueJP: {
    staff: string;
    staffReading: string;
    bossResponse: string;
    analysis: string;
  };
  culturalExplanation: string; // Giải thích chi tiết hơn: Ranh giới giữa giải trình khách quan và lý do bao biện (Iiwake)
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}
