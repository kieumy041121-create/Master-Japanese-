import { PracticalDocItem } from '../types';

export const masterPracticalSurvivalDocs: PracticalDocItem[] = [
  // 1. ATM Máy Rút/Chuyển Tiền Nhật Bản (Japan Post Bank / 7-Bank)
  {
    id: 'pdoc_atm_japan_post',
    docType: 'Màn hình ATM',
    title: 'Màn hình Giao dịch Chuyển khoản ATM Bưu điện Yucho Bank (ゆうちょ銀行 ATM画面)',
    mockVisualData: {
      'Tên máy (ATM名)': 'ゆうちょ銀行 キャッシュサービスコーナー',
      'Loại giao dịch (お取引内容)': 'ご送金（口座間振替・他行宛て振込）',
      'Bước hiện tại (操作手順)': 'ステップ3: 送金先口座番号および金額のご入力',
      'Phí dịch vụ ngoài giờ (手数料)': '時間外手数料 110円 (税込) / 他行宛 220円',
      'Cảnh báo an toàn (防犯警告)': '「還付金詐欺」や「電話でお金の話」にご注意ください！',
    },
    importantFields: [
      {
        label: 'Nút chuyển tiền (Furikomi)',
        japanese: 'お振込み / ご送金',
        explanation: 'Khác hoàn toàn với 引き出し (rút tiền) hay お預入れ (nộp tiền). Khi gửi tiền nhà hay trả tiền hàng phải bấm nút này.',
        locationTip: 'Nút lớn màu xanh lá góc trên bên phải màn hình chính.',
      },
      {
        label: 'Phí ngoài giờ',
        japanese: '時間外手数料',
        explanation: 'Sau 18:00 các ngày trong tuần và cả ngày Thứ Bảy/Chủ Nhật thường bị trừ 110円 đến 330円 cho mỗi lần ấn.',
        locationTip: 'Dòng chữ nhỏ màu vàng cam dưới chân màn hình.',
      },
      {
        label: 'Xác nhận tên người nhận',
        japanese: '受取人名義の確認',
        explanation: 'Bắt buộc kiểm tra kỹ tên Katakana của chủ nhà/đối tác trước khi bấm [確認] để tránh chuyển nhầm vào tài khoản ma.',
        locationTip: 'Khung viền nổi ở bước nhập cuối cùng.',
      },
    ],
    visualSimulation: {
      layoutType: 'atm_screen',
      serialNumber: 'JP-POST-ATM-SHINJUKU-#04',
      warningNoticeTop: '⚠️ 警察庁・金融庁 警告：ATMでの還付金手続きは絶対にありません！',
      stampSealText: '取扱店: ゆうちょ新宿支店 (01990)',
      visualSections: [
        {
          sectionTitle: 'Màn hình chính ATM - Lựa chọn loại giao dịch (お取引をお選びください)',
          accentColor: 'emerald',
          badgeText: 'Màn hình cảm ứng 15-inch',
          fields: [
            { label: 'Rút tiền mặt', keyJp: 'お引出し (Hikidashi)', value: 'Thẻ hoặc Sổ ngân hàng', isHighlighted: false },
            { label: 'Nộp tiền vào tài khoản', keyJp: 'お預入れ (Oazukere)', value: 'Nhận tiền giấy và tiền xu', isHighlighted: false },
            { label: 'Chuyển tiền / Gửi tiền nhà', keyJp: 'ご送金・お振込み (Go-soukin / Furikomi)', value: '★ NÚT BẮT BUỘC CHỌN KHI CHUYỂN TIỀN NHÀ', isHighlighted: true, warningBadge: 'CHỌN NÚT NÀY' },
            { label: 'Kiểm tra số dư', keyJp: '残高照会 (Zandaka Shoukai)', value: 'Miễn phí tra cứu', isHighlighted: false },
            { label: 'Cập nhật sổ', keyJp: '通帳記入 (Tsuuchou Kinyuu)', value: 'In lịch sử giao dịch', isHighlighted: false },
          ],
        },
        {
          sectionTitle: 'Bảng xác nhận người nhận & Chi phí (送金内容確認画面)',
          accentColor: 'indigo',
          badgeText: 'Bước kiểm tra chốt số tiền',
          fields: [
            { label: 'Ngân hàng đích', keyJp: '仕向・被仕向銀行', value: '三菱UFJ銀行 (Bank of Tokyo-Mitsubishi UFJ)' },
            { label: 'Tên người nhận (Katakana)', keyJp: 'お受取人名', value: 'カ）シンジュクフドウサン (Công ty BĐS Shinjuku)', isHighlighted: true },
            { label: 'Số tiền chuyển', keyJp: '送金金額', value: '¥65,000 (Tiền thuê nhà tháng 11)', isHighlighted: true },
            { label: 'Phí giao dịch', keyJp: '振込手数料', value: '¥220 (Người gửi chịu)', isHighlighted: false },
          ],
        },
      ],
    },
    administrativeGlossary: [
      {
        term: '振込 (ふりこみ - Furikomi)',
        reading: 'ふりこみ',
        meaning: 'Chuyển khoản liên ngân hàng',
        culturalAdministrativeReason: 'Từ vựng cốt lõi trong hệ thống ngân hàng Nhật. Khác với 振替 (Furikae - chỉ chuyển giữa hai tài khoản cùng một ngân hàng).',
      },
      {
        term: '名義人 (めいぎにん - Meiginin)',
        reading: 'めいぎにん',
        meaning: 'Tên chủ tài khoản pháp lý',
        culturalAdministrativeReason: 'Trong văn hóa tài chính Nhật, tên tài khoản bắt buộc phải viết bằng Katakana nửa chiều rộng (Half-width) hoặc Katakana chuẩn, không dùng Romaji.',
      },
      {
        term: '暗証番号 (あんしょうばんごう - Anshou Bangou)',
        reading: 'あんしょうばんごう',
        meaning: 'Mã PIN bảo mật gồm 4 chữ số',
        culturalAdministrativeReason: 'Nếu nhập sai liên tiếp 3 lần, thẻ ngân hàng sẽ bị ATM nuốt tại chỗ và khóa tài khoản để bảo vệ chủ thẻ khỏi tội phạm.',
      },
      {
        term: 'ご利用明細票 (ごりようめいさいひょう)',
        reading: 'ごりようめいさいひょう',
        meaning: 'Biên lai in kết quả giao dịch',
        culturalAdministrativeReason: 'Là bằng chứng pháp lý duy nhất chứng minh bạn đã chuyển tiền thành công trước khi chủ nhà ghi nhận vào tài khoản.',
      },
    ],
    survivalTraps: [
      {
        severity: 'critical',
        dangerTitle: 'Bẫy nuốt thẻ khi bấm sai mã PIN 3 lần (暗証番号相違)',
        penaltyOrLoss: 'Thẻ bị ATM giữ lại, phải chờ từ 3-7 ngày làm việc và đem hộ chiếu/thẻ lưu trú ra quầy giao dịch để xin cấp lại.',
        howToIdentify: 'Màn hình hiện cảnh báo: 「暗証番号が違います。お確かめのうえ再度ご入力ください」.',
        preventiveAdvice: 'Nếu quên mã PIN, dừng lại ngay ở lần nhập sai thứ 2. Ra quầy nhờ nhân viên hỗ trợ thay vì cố đoán bừa lần 3.',
      },
      {
        severity: 'high',
        dangerTitle: 'Bẫy trừ phí rút tiền ban đêm và ngày nghỉ (時間外手数料トラップ)',
        penaltyOrLoss: 'Mất oan từ 110円 đến 330円 cho mỗi lần rút. Rút 3 lần trong tháng coi như mất đứt 1 bát mì Ramen!',
        howToIdentify: 'Đồng hồ ATM hiển thị sau 18:00 hoặc rơi vào Thứ 7, Chủ Nhật và ngày lễ quốc gia (祝日).',
        preventiveAdvice: 'Luôn rút tiền mặt trước 18:00 ngày trong tuần hoặc tận dụng các ngân hàng miễn phí như Net Bank (Sony, Rakuten, Shinsei).',
      },
    ],
    threeSecondReflexTest: {
      scenarioTitle: 'Tình huống phản xạ 3 giây: Chuyển 65,000円 tiền nhà cho chủ căn hộ',
      situationPrompt: 'Bạn đang đứng trước máy ATM Yucho Bank với thẻ ngân hàng trong tay vào lúc 17:50 chiều. Hãy thực hiện đúng 3 thao tác bấm chuẩn xác để hoàn tất giao dịch an toàn!',
      actionSteps: [
        {
          stepNumber: 1,
          instruction: 'Nhét thẻ vào khe [カード挿入口] và chạm nút [ご送金・お振込み] màu xanh lá.',
          buttonOrTarget: 'Nút [ご送金・お振込み]',
          criticalRule: 'Tuyệt đối không chọn [お引出し] vì đó là rút tiền mặt ra tay.',
        },
        {
          stepNumber: 2,
          instruction: 'Nhập mã PIN 4 số và chọn [他行口座宛て] (Chuyển sang ngân hàng khác của chủ nhà).',
          buttonOrTarget: 'Bàn phím cảm ứng + Chọn ngân hàng MUFJ',
          criticalRule: 'Dùng tay che bàn phím cảm ứng để bảo vệ mật khẩu.',
        },
        {
          stepNumber: 3,
          instruction: 'Nhập số tiền 65000 + bấm nút [円], sau đó đối chiếu tên Katakana của chủ nhà và bấm [確認].',
          buttonOrTarget: 'Nút [確認] màu đỏ nổi bật',
          criticalRule: 'Bắt buộc nhận lấy tờ [ご利用明細票] để gửi ảnh chứng từ cho chủ nhà.',
        },
      ],
      expectedResult: 'Giao dịch thành công, tiền trừ vào tài khoản, ATM nhả thẻ + biên lai hợp lệ trong vòng 45 giây.',
    },
    quiz: {
      id: 'qpdoc_atm_01',
      question: 'Khi chuyển tiền thuê nhà bằng máy ATM tại Nhật Bản, thao tác nào dưới đây là NGUY HIỂM NHẤT và có thể dẫn đến việc mất tiền oan?',
      options: [
        { id: 'a', text: 'Bỏ qua bước kiểm tra tên Katakana của người nhận (受取人名義) mà bấm ngay nút [確認].', isCorrect: true },
        { id: 'b', text: 'Yêu cầu máy ATM in biên lai giao dịch (利用明細票).', isCorrect: false },
        { id: 'c', text: 'Chuyển tiền vào trước 15:00 để tiền nổi ngay trong ngày.', isCorrect: false },
        { id: 'd', text: 'Dùng thẻ ATM của chính mình để thực hiện giao dịch.', isCorrect: false },
      ],
      correctExplanation: 'Tại Nhật Bản, số tài khoản chỉ cần gõ sai 1 chữ số là tiền có thể bay sang tài khoản người lạ. Bước kiểm tra tên Katakana là rào chắn an toàn cuối cùng!',
      trapAnalysis: 'Rất nhiều du học sinh vì vội vàng đã bấm [確認] khi chưa đọc tên hiển thị, dẫn đến việc chuyển nhầm tiền và thủ tục hoàn lại (組戻し - Kumimodoshi) cực kỳ tốn phí và mất thời gian.',
      mnemonicTip: 'Nhìn chữ Katakana người nhận trước khi ấn nút xác nhận!',
    },
  },

  // 2. Thẻ Lưu Trú Ngoại Kiều (Zairyū Card 在留カード)
  {
    id: 'pdoc_zairyu_card_master',
    docType: 'Thẻ ngoại kiều',
    title: 'Thẻ Lưu Trú Ngoại Kiều Nhật Bản - Mặt Trước & Mặt Sau (在留カード 完全解剖)',
    mockVisualData: {
      'Số thẻ (在留カード番号)': 'AB12345678CD (Khắc chìm chống giả)',
      'Họ tên (氏名)': 'NGUYEN THI MAI',
      'Ngày sinh (生年月日)': '1999年08月25日',
      'Quốc tịch/Vùng lãnh thổ (国籍・地域)': 'ベトナム (VIETNAM)',
      'Tư cách lưu trú (在留資格)': '技術・人文知識・国際業務 (Kỹ sư / Nhân văn / Quốc tế)',
      'Thời hạn lưu trú (在留期間の満了日)': '2027年04月15日 ★ NGÀY CỐT TỬ',
      'Giới hạn lao động (就労制限の有無)': '在留資格に基づく就労活動のみ可能',
      'Mặt sau - Giấy phép làm thêm': '資格外活動許可: 1週28時間以内・風俗営業を除く',
    },
    importantFields: [
      {
        label: 'Thời hạn mãn hạn thẻ',
        japanese: '在留期間の満了日',
        explanation: 'Ngày hết hạn hiệu lực của visa. Quá ngày này 1 giây mà chưa nộp đơn gia hạn sẽ bị coi là cư trú bất hợp pháp (Overstay) và có nguy cơ bị trục xuất!',
        locationTip: 'Chính giữa thẻ, in bằng mực đỏ nổi bật dưới dòng tư cách lưu trú.',
      },
      {
        label: 'Tư cách lưu trú',
        japanese: '在留資格',
        explanation: 'Quyết định lĩnh vực chuyên môn bạn được phép làm việc có hưởng lương tại Nhật Bản.',
        locationTip: 'Dòng thứ ba dưới phần thông tin ngày sinh và giới tính.',
      },
      {
        label: 'Giấy phép hoạt động ngoài tư cách (Làm thêm 28h)',
        japanese: '資格外活動許可 (Shikakugai Katsudou Kyoka)',
        explanation: 'Dành cho Du học sinh hoặc người có visa gia đình. Bắt buộc có con dấu màu đen đóng ở mặt sau thẻ mới được làm part-time (Baito).',
        locationTip: 'Góc dưới bên trái ở MẶT SAU của thẻ lưu trú.',
      },
    ],
    visualSimulation: {
      layoutType: 'zairyu_card',
      serialNumber: 'CARD-NO: AB98765432CD',
      stampSealText: '出入国在留管理庁長官 (Cục Trưởng Cục Quản Lý Xuất Nhập Cảnh)',
      warningNoticeTop: '日本国 政府 出入国在留管理庁 (IMMIGRATION SERVICES AGENCY OF JAPAN)',
      visualSections: [
        {
          sectionTitle: 'Mặt trước thẻ lưu trú (表面 - Căn cước pháp lý cao nhất)',
          accentColor: 'blue',
          badgeText: 'Thẻ chip IC chống làm giả',
          fields: [
            { label: 'Họ và tên chữ in hoa', keyJp: '氏名 (Name)', value: 'NGUYEN THI MAI', isHighlighted: false },
            { label: 'Tư cách lưu trú hợp pháp', keyJp: '在留資格 (Status)', value: '技術・人文知識・国際業務', isHighlighted: true },
            { label: 'HẠN CHÓT LƯU TRÚ (HẾT HẠN)', keyJp: '在留期間の満了日', value: '2027年04月15日 (CẦN GIA HẠN TRƯỚC 3 THÁNG)', isHighlighted: true, warningBadge: 'CỰC KỲ NGUY HIỂM NẾU QUÊN' },
            { label: 'Địa chỉ cư trú đăng ký', keyJp: '住居地 (Address)', value: '東京都豊島区南池袋 3-12-8', isHighlighted: false },
            { label: 'Giới hạn ngành nghề lao động', keyJp: '就労制限の有無', value: '在留資格に基づく就労活動のみ可能', isHighlighted: false },
          ],
        },
        {
          sectionTitle: 'Mặt sau thẻ lưu trú (裏面 - Giấy phép làm thêm & Đổi địa chỉ)',
          accentColor: 'amber',
          badgeText: 'Con dấu cục Xuất nhập cảnh',
          fields: [
            { label: 'Quyền làm việc ngoài tư cách', keyJp: '資格外活動許可欄', value: '許可: 原則1週28時間以内・風俗営業等の従事を除く', isHighlighted: true },
            { label: 'Lịch sử thay đổi địa chỉ', keyJp: '住居地記載欄', value: 'Đóng dấu thị thực ủy ban quận Toyoshima', isHighlighted: false },
          ],
        },
      ],
    },
    administrativeGlossary: [
      {
        term: '在留期間の更新 (ざいりゅうきかんの こうしん)',
        reading: 'ざいりゅうきかんの こうしん',
        meaning: 'Thủ tục gia hạn thời hạn visa lưu trú',
        culturalAdministrativeReason: 'Cục Xuất nhập cảnh Nhật cho phép nộp đơn gia hạn trước ngày hết hạn đúng 3 tháng. Đừng bao giờ chờ đến tuần cuối mới nộp!',
      },
      {
        term: '資格外活動許可 (しかくがい かつどう きょか)',
        reading: 'しかくがい かつどう きょか',
        meaning: 'Giấy phép làm thêm ngoài phạm vi visa',
        culturalAdministrativeReason: 'Luật kiểm soát nhập cư Nhật Bản cấm tuyệt đối sinh viên đi làm khi chưa có dấu này. Vi phạm sẽ bị trục xuất ngay lập tức.',
      },
      {
        term: '不法残留 (ふほう ざんりゅう - Overstay)',
        reading: 'ふほう ざんりゅう',
        meaning: 'Cư trú bất hợp pháp do quá hạn visa',
        culturalAdministrativeReason: 'Bị xử lý hình sự, phạt tù hoặc phạt tiền lên đến 300 man yên và bị cấm nhập cảnh lại Nhật Bản trong 5 năm.',
      },
    ],
    survivalTraps: [
      {
        severity: 'critical',
        dangerTitle: 'Bẫy làm thêm quá 28 tiếng / tuần hoặc làm việc tại quán Bar/Karaoke đêm (風俗営業)',
        penaltyOrLoss: 'Bị Cục Xuất nhập cảnh từ chối gia hạn visa, hủy tư cách lưu trú và cưỡng chế hồi hương.',
        howToIdentify: 'Đọc kỹ dòng chữ nhỏ: 「風俗営業等の従事を除く」(Nghiêm cấm làm việc trong ngành giải trí đêm/kinh doanh kích dục).',
        preventiveAdvice: 'Dù quán bar, quán pub chỉ thuê bạn rửa bát hay dọn dẹp vệ sinh nhưng nếu quán đó có giấy phép Fuuzoku thì bạn vẫn vi phạm luật pháp!',
      },
      {
        severity: 'high',
        dangerTitle: 'Bẫy không khai báo đổi địa chỉ trong vòng 14 ngày (住居地変更届)',
        penaltyOrLoss: 'Phạt tiền hành chính lên đến 200,000円 và có thể bị hạ bậc thời hạn visa từ 3 năm xuống 1 năm.',
        howToIdentify: 'Khi chuyển nhà sang căn hộ mới, mặt sau thẻ chưa có dấu xác nhận của Shiyakusho/Kuyakusho mới.',
        preventiveAdvice: 'Trong vòng 14 ngày kể từ khi dọn đến nhà mới, phải đem thẻ đến Tòa thị chính nơi ở mới làm thủ tục Tennyuu-todoke.',
      },
    ],
    threeSecondReflexTest: {
      scenarioTitle: 'Tình huống phản xạ 3 giây: Kiểm tra quyền làm thêm khi phỏng vấn Baito',
      situationPrompt: 'Nhà tuyển dụng quán ăn yêu cầu bạn xuất trình thẻ lưu trú và hỏi: "Em có được phép làm 28 tiếng không?". Hãy chỉ ra đúng vị trí trên thẻ chứng minh điều đó!',
      actionSteps: [
        {
          stepNumber: 1,
          instruction: 'Lật ngay sang MẶT SAU của thẻ lưu trú (裏面).',
          buttonOrTarget: 'Góc dưới bên trái mặt sau',
          criticalRule: 'Mặt trước chỉ ghi tư cách chính, mặt sau mới ghi con dấu giấy phép làm thêm.',
        },
        {
          stepNumber: 2,
          instruction: 'Chỉ tay vào ô [資格外活動許可欄] và trỏ vào con dấu đen có dòng chữ 「1週28時間以内」.',
          buttonOrTarget: 'Con dấu đóng của Cục Xuất nhập cảnh',
          criticalRule: 'Nếu ô này để trống, tuyệt đối không được nhận việc đi làm.',
        },
        {
          stepNumber: 3,
          instruction: 'Nói to dõng dạc câu tiếng Nhật: 「資格外活動の許可をいただいておりますので、週28時間まで就労可能です」.',
          buttonOrTarget: 'Khẩu ngữ chuẩn công sở',
          criticalRule: 'Tạo sự tin cậy tuyệt đối với chủ quán người Nhật.',
        },
      ],
      expectedResult: 'Nhà tuyển dụng xác nhận đủ điều kiện pháp lý và ký hợp đồng làm thêm an toàn.',
    },
    quiz: {
      id: 'qpdoc_zairyu_01',
      question: 'Bạn sở hữu visa「技術・人文知識・国際業務」(Kỹ sư / Nhân văn) và muốn đi làm thêm phụ bếp tại một quán Izakaya vào buổi tối. Điều này có hợp pháp không?',
      options: [
        { id: 'a', text: 'Bất hợp pháp nếu chưa được Cục Xuất nhập cảnh cấp phép「資格外活動許可」dành riêng cho công việc này.', isCorrect: true },
        { id: 'b', text: 'Hoàn toàn hợp pháp vì visa lao động được làm mọi công việc có trả lương.', isCorrect: false },
        { id: 'c', text: 'Chỉ cần làm dưới 28 tiếng một tuần là tự do làm việc.', isCorrect: false },
        { id: 'd', text: 'Hợp pháp nếu công ty chính đồng ý bằng miệng.', isCorrect: false },
      ],
      correctExplanation: 'Visa lao động không tự động có quyền làm thêm việc chân tay như du học sinh. Muốn làm thêm khác ngành chuyên môn, bắt buộc phải làm đơn xin phép Cục XNC phê duyệt riêng!',
      trapAnalysis: 'Rất nhiều kỹ sư tưởng mình có visa lao động thì thoải mái đi làm thêm ngoài giờ ở quán ăn, dẫn đến việc bị điều tra trốn thuế và hủy visa khi gia hạn.',
      mnemonicTip: 'Visa kỹ sư = Chỉ làm đúng ngành nghề chuyên môn trong hợp đồng!',
    },
  },

  // 3. Hợp Đồng Thuê Nhà Nhật Bản (Chintai Shakuka Keiyakusho 賃貸借契約書)
  {
    id: 'pdoc_chintai_contract_master',
    docType: 'Hợp đồng thuê nhà',
    title: 'Hợp Đồng Thuê Căn Hộ Nhật Bản - Bóc Tách Chi Phí Ẩn (賃貸借契約書・重要事項説明書)',
    mockVisualData: {
      'Tên bất động sản (物件名)': 'レオパレス新宿ガーデン 203号室',
      'Tiền thuê hàng tháng (賃料)': '¥68,000 / tháng',
      'Phí quản lý / công cộng (共益費・管理費)': '¥5,000 / tháng',
      'Tiền cọc đảm bảo (敷金 - Shikikin)': '¥68,000 (1 tháng tiền nhà - có thể hoàn lại trừ phí dọn dẹp)',
      'Tiền lễ tặng chủ nhà (礼金 - Reikin)': '¥68,000 (1 tháng tiền nhà - MẤT ĐỨT KHÔNG HOÀN LẠI)',
      'Phí dọn dẹp vệ sinh khi trả phòng (退去時クリーニング費用)': '¥44,000 (Đã bao gồm thuế, trừ thẳng vào cọc)',
      'Phí đổi chìa khóa cửa (鍵交換費用)': '¥22,000 (Người thuê chịu lúc vào nhà)',
      'Thời hạn báo trả nhà (解約予告期間)': '退去の1ヶ月前までに書面にて通知すること',
    },
    importantFields: [
      {
        label: 'Tiền lễ (Reikin)',
        japanese: '礼金 (れいきん)',
        explanation: 'Tiền biếu tặng chủ nhà theo phong tục truyền thống sau thế chiến, KHÔNG BAO GIỜ ĐƯỢC HOÀN LẠI dù nhà không hư hỏng.',
        locationTip: 'Nằm ngay cạnh mục tiền cọc 敷金 trong bảng kê chi phí đầu vào.',
      },
      {
        label: 'Thời hạn báo hủy hợp đồng',
        japanese: '解約予告 (かいやく よこく)',
        explanation: 'Phải gửi đơn báo trước ít nhất 1 tháng (hoặc 2 tháng tùy hợp đồng). Nếu báo trễ, bạn sẽ phải đóng thêm nguyên 1 tháng tiền nhà dù đã chuyển đi!',
        locationTip: 'Điều khoản số 14 hoặc 15 trong phần hợp đồng chữ nhỏ.',
      },
      {
        label: 'Phí đền bù hủy trước hạn',
        japanese: '短期解約違約金 (たんき かいやく いやくきん)',
        explanation: 'Nếu dọn đi trước 1 năm (hoặc 2 năm), bạn sẽ bị phạt từ 1 đến 2 tháng tiền nhà.',
        locationTip: 'Mục lưu ý đặc biệt in chữ nghiêng màu xám đậm.',
      },
    ],
    visualSimulation: {
      layoutType: 'lease_contract',
      serialNumber: 'CONTRACT-NO: TOKYO-RE-2026-8819',
      stampSealText: '宅地建物取引業者 印 (Dấu Đỏ Mộc Pháp Lý Bất Động Sản)',
      warningNoticeTop: '宅地建物取引業法第35条に基づく重要事項説明書（賃貸）',
      visualSections: [
        {
          sectionTitle: 'Bảng chi phí đầu vào nhận nhà ban đầu (初期費用明細書)',
          accentColor: 'rose',
          badgeText: 'Các khoản tiền phải thanh toán',
          fields: [
            { label: 'Tiền cọc bảo chứng (Hoàn lại)', keyJp: '敷金 (Shikikin)', value: '1ヶ月分 (¥68,000) - Trừ phí phục hồi nguyên trạng', isHighlighted: false },
            { label: 'TIỀN LỄ BIẾU CHỦ NHÀ (MẤT TRẮNG)', keyJp: '礼金 (Reikin)', value: '1ヶ月分 (¥68,000) ★ MẤT ĐỨT KHÔNG HOÀN TRẢ', isHighlighted: true, warningBadge: 'BẪY TIỀN MẤT' },
            { label: 'Phí bảo hiểm cháy nổ 2 năm', keyJp: '火災保険料', value: '¥18,000 (Bắt buộc mua)', isHighlighted: false },
            { label: 'Phí công ty bảo lãnh thân nhân', keyJp: '保証会社初回保証料', value: '50% tiền nhà (¥36,500)', isHighlighted: false },
            { label: 'Phí khử khuẩn phòng / đổi khóa', keyJp: '鍵交換代・室内消毒代', value: '¥38,500 (Khoản có thể thương lượng)', isHighlighted: true },
          ],
        },
        {
          sectionTitle: 'Điều khoản trả phòng & Khôi phục nguyên trạng (退去及び原状回復義務)',
          accentColor: 'amber',
          badgeText: 'Điều khoản pháp lý phạt tiền',
          fields: [
            { label: 'Thời hạn gửi thông báo dọn đi', keyJp: '解約申入れ期間', value: '退去日の1ヶ月前 (Báo trước đúng 30 ngày bằng văn bản)', isHighlighted: true },
            { label: 'Phí phạt chuyển đi dưới 1 năm', keyJp: '短期解約違約金', value: '1年未満の解約は賃料1ヶ月分を支払うこと', isHighlighted: true, warningBadge: 'PHẠT 1 THÁNG TIỀN NHÀ' },
          ],
        },
      ],
    },
    administrativeGlossary: [
      {
        term: '原状回復 (げんじょう かいふく - Genjou Kaifuku)',
        reading: 'げんじょう かいふく',
        meaning: 'Nghĩa vụ khôi phục căn nhà về trạng thái ban đầu khi dọn đi',
        culturalAdministrativeReason: 'Luật Nhật quy định người thuê phải chịu chi phí sửa chữa vết xước do lỗi cố ý, nhưng hao mòn tự nhiên (như giấy dán tường phai màu do nắng) thì chủ nhà phải chịu.',
      },
      {
        term: '更新料 (こうしんりょう - Koushinryou)',
        reading: 'こうしんりょう',
        meaning: 'Phí gia hạn hợp đồng sau mỗi 2 năm thuê',
        culturalAdministrativeReason: 'Đặc thù của vùng Kanto (Tokyo): Cứ sau 2 năm thuê tiếp, người thuê phải đóng thêm 1 tháng tiền nhà tiền phí gia hạn.',
      },
    ],
    survivalTraps: [
      {
        severity: 'critical',
        dangerTitle: 'Bẫy bị trừ sạch tiền cọc vì giấy dán tường bị mốc hoặc thủng lỗ đóng đinh (壁紙の汚損)',
        penaltyOrLoss: 'Bị công ty quản lý gửi giấy đòi bồi thường từ 50,000円 đến 150,000円 khi trả phòng.',
        howToIdentify: 'Trong hợp đồng có dòng: 「画鋲・釘打ちは禁止、タバコのヤニ汚れは全額借主負担」.',
        preventiveAdvice: 'Không đóng đinh vào tường, không hút thuốc trong phòng, và ngày đầu nhận nhà phải chụp ảnh chi tiết mọi vết xước có sẵn gửi cho quản lý lưu vết!',
      },
    ],
    threeSecondReflexTest: {
      scenarioTitle: 'Tình huống phản xạ 3 giây: Muốn dọn đi vào ngày 31 tháng 3',
      situationPrompt: 'Bạn dự định chuyển sang chỗ ở mới vào ngày 31 tháng 3. Hãy xác định chính xác ngày chót bạn phải nộp đơn báo dọn nhà (解約通知) cho công ty quản lý!',
      actionSteps: [
        {
          stepNumber: 1,
          instruction: 'Kiểm tra điều khoản [解約予告] trong hợp đồng (ghi 1 tháng trước).',
          buttonOrTarget: 'Mục số 14 hợp đồng',
          criticalRule: 'Nếu ghi 2 tháng thì phải tính lùi 60 ngày.',
        },
        {
          stepNumber: 2,
          instruction: 'Tính lùi đúng 1 tháng: Ngày chót công ty quản lý phải NHẬN ĐƯỢC đơn là trước ngày 28 tháng 2.',
          buttonOrTarget: 'Gửi qua email hoặc thư bảo đảm',
          criticalRule: 'Ngày tính hiệu lực là ngày công ty nhận được đơn, không phải ngày bạn gửi đi.',
        },
        {
          stepNumber: 3,
          instruction: 'Gọi điện xác nhận: 「本日、解約通知書を送信いたしましたので、ご確認をお願いいたします」.',
          buttonOrTarget: 'Xác nhận bằng điện thoại',
          criticalRule: 'Tránh việc thất lạc email dẫn đến bị tính dôi thêm 1 tháng tiền nhà tháng 4.',
        },
      ],
      expectedResult: 'Hợp đồng chấm dứt đúng ngày 31/3 mà không phát sinh thêm bất kỳ đồng phí phạt nào.',
    },
    quiz: {
      id: 'qpdoc_chintai_01',
      question: 'Khoản tiền nào dưới đây trong hợp đồng thuê nhà tại Nhật Bản TUYỆT ĐỐI KHÔNG BAO GIỜ ĐƯỢC HOÀN LẠI khi bạn chuyển đi?',
      options: [
        { id: 'a', text: 'Tiền lễ (礼金 - Reikin).', isCorrect: true },
        { id: 'b', text: 'Tiền cọc đảm bảo (敷金 - Shikikin).', isCorrect: false },
        { id: 'c', text: 'Tiền thuê nhà trả trước tháng đầu tiên.', isCorrect: false },
        { id: 'd', text: 'Tiền đặt cọc giữ chỗ làm hồ sơ.', isCorrect: false },
      ],
      correctExplanation: 'Shikikin (敷金) là tiền cọc có thể lấy lại phần còn dư sau khi trừ phí dọn dẹp. Còn Reikin (礼金) là "tiền cảm ơn chủ nhà", mang tính cho không và mất trắng 100%!',
      trapAnalysis: 'Rất nhiều bạn trẻ nhầm lẫn giữa Shiki và Rei, tưởng rằng cả hai đều là tiền cọc lấy lại được khi dọn đi.',
      mnemonicTip: 'Lễ (礼) là biếu không - Cọc (敷) là giữ hộ!',
    },
  },

  // 4. Vé Tàu Cao Tốc Shinkansen (新幹線特急券・乗車券)
  {
    id: 'pdoc_shinkansen_ticket_master',
    docType: 'Vé Shinkansen',
    title: 'Vé Tàu Cao Tốc Shinkansen JR Shinkansen Ticket (新幹線指定席特急券・乗車券 一葉券)',
    mockVisualData: {
      'Tuyến tàu (列車名・号数)': 'のぞみ 45号 (Nozomi số 45)',
      'Hành trình (区間)': '東京 (Tokyo) ➔ 新大阪 (Shin-Osaka)',
      'Ngày giờ xuất phát (日時)': '2026年11月18日 14:30発 ➔ 17:00着',
      'Số hiệu toa và ghế (号車・座席)': '7号車 12番 E席 (Toa số 7 - Hàng 12 - Ghế E bên cửa sổ)',
      'Phân loại ghế (座席種別)': '指定席 (Ghế chỉ định đã đặt chỗ trước)',
      'Hạn chế hành lý lớn (特大荷物)': '特大荷物スペースつき座席 (Kèm khoang để vali cỡ lớn)',
      'Giá vé (金額)': '¥14,720 (Đã gộp vé tàu 乗車券 + vé tốc hành 特急券)',
    },
    importantFields: [
      {
        label: 'Số hiệu toa tàu',
        japanese: '号車 (ごうしゃ - Gousha)',
        explanation: 'Con số quyết định bạn phải đứng xếp hàng ở cửa lên toa nào trên ke ga. Nếu nhầm toa bạn sẽ phải chen lấn vác vali dọc thân tàu.',
        locationTip: 'In to ở chính giữa vé kèm chữ [号車].',
      },
      {
        label: 'Ghế chỉ định vs Ghế tự do',
        japanese: '指定席 (Shiteiseki) vs 自由席 (Jiyuuseki)',
        explanation: 'Ghế chỉ định có số ghế cụ thể đảm bảo có chỗ ngồi 100%. Ghế tự do (toa 1-3) giá rẻ hơn nhưng phải đến sớm tranh ghế, hết chỗ phải đứng suốt 2.5 tiếng!',
        locationTip: 'Chữ in đậm viền khung cạnh số toa.',
      },
      {
        label: 'Quy định vali cỡ đại',
        japanese: '特大荷物スペース (Tokudai Nimotsu)',
        explanation: 'Vali có tổng 3 chiều từ 160cm đến 250cm BẮT BUỘC phải đặt vé có kèm khoang hành lý này. Nếu mang lên chui sẽ bị phạt 1,000円 và bị nhân viên tàu tịch thu dời chỗ!',
        locationTip: 'Dòng ghi chú nhỏ phía dưới mã vạch.',
      },
    ],
    visualSimulation: {
      layoutType: 'shinkansen_ticket',
      serialNumber: 'JR-EAST-TKT-8849-0129',
      stampSealText: '入鋏済 (Đã kiểm vé qua cổng tự động)',
      barcodeOrMagnetic: '|||||| | |||||||| ||||| ||||||| |',
      visualSections: [
        {
          sectionTitle: 'Thông tin chuyến tàu & Vị trí chỗ ngồi (乗車票面)',
          accentColor: 'cyan',
          badgeText: 'Vé từ JR tự động Shinkansen',
          fields: [
            { label: 'Tên tàu & Số hiệu', keyJp: '列車名', value: 'のぞみ 45号 (Nozomi 45)', isHighlighted: true },
            { label: 'Ga đi ➔ Ga đến', keyJp: '区間', value: '東京都区内 ➔ 大阪市内 (Tokyo ➔ Osaka)', isHighlighted: false },
            { label: 'Giờ tàu chạy chính xác', keyJp: '発着時刻', value: '14:30発 ➔ 17:00着 (Tàu chạy đúng từng giây)', isHighlighted: true },
            { label: 'Toa số & Số ghế', keyJp: '号車・座席', value: '7号車 12番 E席 (Toa 7 - Ghế 12E bên cửa sổ ngắm núi Phú Sĩ)', isHighlighted: true, warningBadge: 'XẾP HÀNG ĐÚNG CỬA SỐ 7' },
          ],
        },
      ],
    },
    administrativeGlossary: [
      {
        term: '特大荷物スペースつき座席',
        reading: 'とくだいにもつ スペースつき ざせき',
        meaning: 'Ghế ngồi có quyền để hành lý kích thước lớn',
        culturalAdministrativeReason: 'Từ tháng 5/2020, đường sắt JR Tokaido áp dụng bắt buộc để đảm bảo lối thoát hiểm chống khủng bố và hỏa hoạn.',
      },
      {
        term: '乗り遅れ (のりおくれ - Noriokure)',
        reading: 'のりおくれ',
        meaning: 'Bị lỡ chuyến tàu do đến muộn',
        culturalAdministrativeReason: 'Nếu lỡ chuyến vé chỉ định, vé tốc hành đó sẽ bị hủy giá trị, bạn chỉ được phép chuyển sang ngồi ghế tự do (自由席) của chuyến tàu tiếp theo trong cùng ngày.',
      },
    ],
    survivalTraps: [
      {
        severity: 'high',
        dangerTitle: 'Bẫy đút 2 vé vào cổng soát vé tự động (2枚重ね投入トラップ)',
        penaltyOrLoss: 'Cổng từ réo chuông báo động đỏ và sập cửa chắn vì đút nhầm vé hoặc đút thiếu vé.',
        howToIdentify: 'Khi mua vé Shinkansen ở máy tự động, máy có thể nhả ra 2 vé rời: 1 vé 乗車券 (Vé thường) và 1 vé 特急券 (Vé tốc hành).',
        preventiveAdvice: 'Khi qua cổng soát vé Shinkansen, phải xếp chồng CẢ 2 VÉ LÊN NHAU rồi nhét cùng một lúc vào khe soát vé!',
      },
    ],
    threeSecondReflexTest: {
      scenarioTitle: 'Tình huống phản xạ 3 giây: Đứng đón tàu Shinkansen tại ga Tokyo',
      situationPrompt: 'Đồng hồ ga điểm 14:23 (còn 7 phút nữa tàu chạy). Cầm chiếc vé「7号車 12番 E席」trên tay, bạn phải phản xạ tìm đúng vị trí nào trên ke ga?',
      actionSteps: [
        {
          stepNumber: 1,
          instruction: 'Nhìn xuống vệt sơn dưới chân sàn ke ga hoặc bảng điện tử treo trên trần để tìm số [7号車 乗車口].',
          buttonOrTarget: 'Vệt sơn đánh dấu cửa toa số 7',
          criticalRule: 'Tuyệt đối không xếp hàng ở toa số 8 hay số 6.',
        },
        {
          stepNumber: 2,
          instruction: 'Xếp hàng sau vạch vàng, chờ hành khách trên tàu bước xuống hết sang hai bên rồi mới bước lên.',
          buttonOrTarget: 'Quy tắc văn hóa Shinkansen',
          criticalRule: 'Tàu chỉ dừng ở ga từ 1 đến 2 phút là đóng cửa khởi hành ngay.',
        },
        {
          stepNumber: 3,
          instruction: 'Bước vào toa 7, tìm số hàng 12 và ngồi vào ghế E (sát cửa sổ nhìn ra núi Phú Sĩ).',
          buttonOrTarget: 'Ghế 12E',
          criticalRule: 'Vali để trên giá hành lý phía trên đầu ghế an toàn.',
        },
      ],
      expectedResult: 'Lên tàu êm ru, an tọa đúng chỗ và tận hưởng chuyến đi 285 km/h.',
    },
    quiz: {
      id: 'qpdoc_shinkansen_01',
      question: 'Nếu chẳng may bạn đến ga muộn 3 phút và chuyến tàu Shinkansen ghi trên vé chỉ định (指定席) đã khởi hành mất, bạn phải xử lý như thế nào?',
      options: [
        { id: 'a', text: 'Vẫn được dùng chiếc vé đó để lên ngồi ở khoang Ghế tự do (自由席) của các chuyến tàu tiếp theo trong ngày.', isCorrect: true },
        { id: 'b', text: 'Vé bị hủy toàn bộ, bắt buộc phải bỏ tiền mua lại vé mới 100%.', isCorrect: false },
        { id: 'c', text: 'Được trả lại vé lấy lại 100% tiền mặt tại quầy vé.', isCorrect: false },
        { id: 'd', text: 'Được phép lên ngồi bất kỳ ghế chỉ định trống nào của chuyến tiếp theo.', isCorrect: false },
      ],
      correctExplanation: 'Quy định nhân văn của JR: Nếu trễ chuyến vé chỉ định, bạn không được đổi sang vé chỉ định khác nhưng vẫn được đi khoang tự do (自由席) của chuyến tàu sau trong cùng ngày mà không mất thêm phí!',
      trapAnalysis: 'Nhiều người tưởng vé bị hủy sạch nên vứt vé vào sọt rác và tốn thêm hơn 1 man yên mua lại vé mới.',
      mnemonicTip: 'Trễ tàu chỉ định -> Cứ cầm vé đó nhảy lên toa ghế tự do!',
    },
  },

  // 5. Hóa Đơn Điện Nước & Biên Lai Tiện Lợi (Public Utilities Bill)
  {
    id: 'pdoc_utility_gas_water_master',
    docType: 'Hóa đơn tiền điện/nước',
    title: 'Hóa Đơn Tiền Ga & Nước Tokyo Gas - Cảnh Báo Cắt Dịch Vụ (電気・ガス料金等請求書 払込票)',
    mockVisualData: {
      'Đơn vị phát hành (発行者)': '東京ガス株式会社 / 東京都水道局',
      'Số tiền yêu cầu thanh toán (ご請求金額)': '¥8,450 (Đã bao gồm thuế GTGT 10%)',
      'HẠN THANH TOÁN TIỀN (お支払期限日)': '2026年11月10日 ★ HẠN CUỐI CÙNG',
      'Ngày dự kiến cắt dịch vụ nếu trễ (供給停止予定日)': '2026年11月25日 (CẮT ĐIỆN / KHÓA GA)',
      'Địa điểm nộp (お支払場所)': 'コンビニエンスストア（セブン、ローソン、ファミマ）',
    },
    importantFields: [
      {
        label: 'Hạn nộp tiền tiêu chuẩn',
        japanese: 'お支払期限日 (おしはらい きげんび)',
        explanation: 'Ngày chốt sổ. Sau ngày này mã vạch tại cửa hàng tiện lợi có thể không quét được nữa.',
        locationTip: 'In chữ số đậm trong khung viền chữ nhật góc giữa hóa đơn.',
      },
      {
        label: 'Ngày ngắt cung cấp dịch vụ',
        japanese: '供給停止予告日 (きょうきゅう ていし よこくび)',
        explanation: 'Nếu để quá ngày này, nhân viên công ty sẽ đến tận nhà khóa van ga hoặc ngắt cầu dao điện từ xa!',
        locationTip: 'In chữ màu đỏ cảnh báo ở góc trái biên lai.',
      },
      {
        label: 'Mã vạch thanh toán Combini',
        japanese: 'バーコード (Barcode)',
        explanation: 'Gồm các vạch đen trắng dài ở đáy tờ giấy. Cấm làm ướt, làm nhàu hoặc xé rời đường răng cưa.',
        locationTip: 'Nằm ở phần cuống giấy có đường đục lỗ xé.',
      },
    ],
    visualSimulation: {
      layoutType: 'utility_bill',
      serialNumber: 'BARCODE: (91)90845012345678901234',
      stampSealText: '領収日付印 (Dấu Ngày Thu Tiền Của Cửa Hàng Tiện Lợi)',
      barcodeOrMagnetic: '||| |||| | |||||| |||| | |||||||| ||||||',
      warningNoticeTop: '⚠️ 督促状兼送電停止予告：期限までにお支払いがない場合、送電を停止いたします',
      visualSections: [
        {
          sectionTitle: 'Phiếu thanh toán kiêm biên nhận (払込取扱票)',
          accentColor: 'emerald',
          badgeText: 'Thanh toán quét mã tại Combini',
          fields: [
            { label: 'Số tiền thanh toán', keyJp: 'ご請求金額', value: '¥8,450 (円)', isHighlighted: true },
            { label: 'Hạn chót thanh toán an toàn', keyJp: 'お支払い期限', value: '2026年11月10日', isHighlighted: true },
            { label: 'Ngày dự kiến cắt điện/ga', keyJp: '供給停止日', value: '2026年11月25日 ★ NGUY CƠ BỊ CẮT ĐIỆN', isHighlighted: true, warningBadge: 'NGUY HIỂM' },
            { label: 'Khách hàng', keyJp: 'ご契約者名', value: 'グエン ヴァン アン 様', isHighlighted: false },
          ],
        },
      ],
    },
    administrativeGlossary: [
      {
        term: '督促状 (とくそくじょう - Tokusokujou)',
        reading: 'とくそくじょう',
        meaning: 'Thư giục giã đóng tiền / Giấy báo nợ gấp',
        culturalAdministrativeReason: 'Nếu bạn trễ hạn thanh toán lần 1, công ty sẽ gửi bức thư này có phong bì màu đỏ hoặc vàng cảnh báo biện pháp cưỡng chế.',
      },
      {
        term: '延滞利息 (えんたい りそく)',
        reading: 'えんたい りそく',
        meaning: 'Tiền lãi phạt do chậm nộp tiền',
        culturalAdministrativeReason: 'Tại Nhật, lãi phạt chậm nộp hóa đơn hoặc tiền thuế có thể lên tới 8.7% đến 14.6% một năm tính theo từng ngày trễ hạn.',
      },
    ],
    survivalTraps: [
      {
        severity: 'critical',
        dangerTitle: 'Bẫy tự ý xé rời đường răng cưa của phiếu thanh toán (ミシン目の切り離し)',
        penaltyOrLoss: 'Nhân viên cửa hàng tiện lợi từ chối nhận tiền, phải gọi điện lên tổng đài xin cấp lại hóa đơn mới rất phiền toái.',
        howToIdentify: 'Trên tờ giấy có dòng chữ nhỏ: 「切り離し無効」(Xé rời là vô hiệu lực).',
        preventiveAdvice: 'Cầm NGUYÊN VẸN cả tờ giấy A4 hoặc tờ bưu thiếp đưa cho nhân viên thu ngân. Họ sẽ tự xé và đóng dấu xác nhận đóng tiền.',
      },
    ],
    threeSecondReflexTest: {
      scenarioTitle: 'Tình huống phản xạ 3 giây: Thanh toán hóa đơn tại cửa hàng tiện lợi 7-Eleven',
      situationPrompt: 'Bạn cầm tờ hóa đơn tiền điện ra quầy thu ngân 7-Eleven. Hãy thực hiện đúng trình tự để nhận được bằng chứng đã nộp tiền hợp pháp!',
      actionSteps: [
        {
          stepNumber: 1,
          instruction: 'Cầm nguyên tờ giấy phẳng phiu đưa cho nhân viên thu ngân và nói: 「これをお願いします」(Làm ơn thanh toán giúp tôi cái này).',
          buttonOrTarget: 'Đưa thẳng tờ giấy nguyên vẹn',
          criticalRule: 'Không xé bất kỳ mép giấy nào.',
        },
        {
          stepNumber: 2,
          instruction: 'Nhìn màn hình cảm ứng phụ hướng về phía bạn, chạm vào nút [OK] màu xanh xác nhận thanh toán.',
          buttonOrTarget: 'Nút [OK] trên màn hình thu ngân',
          criticalRule: 'Chạm nút thì máy mới nhận tiền mặt.',
        },
        {
          stepNumber: 3,
          instruction: 'Nhận lại cuống phiếu có đóng dấu tròn đỏ chữ [領収日付印] kèm hóa đơn in nhiệt và cất kỹ vào ví.',
          buttonOrTarget: 'Cuống dấu đỏ',
          criticalRule: 'Dấu đỏ chứng minh tiền đã vào hệ thống, tránh việc bị đòi nợ nhầm.',
        },
      ],
      expectedResult: 'Hóa đơn đã được thanh toán xong xuôi trong 20 giây.',
    },
    quiz: {
      id: 'qpdoc_utility_01',
      question: 'Khi nhận được giấy báo tiền điện tiền nước có in dòng chữ「督促状」(Tokusokujou), bạn cần hiểu đây là loại giấy tờ gì?',
      options: [
        { id: 'a', text: 'Giấy báo thúc giục nộp nợ gấp vì đã quá hạn thanh toán lần đầu, sắp bị cắt dịch vụ.', isCorrect: true },
        { id: 'b', text: 'Giấy báo được giảm giá cước sử dụng vì dùng tiết kiệm.', isCorrect: false },
        { id: 'c', text: 'Biên lai xác nhận đã nộp tiền xong xuôi.', isCorrect: false },
        { id: 'd', text: 'Giấy quảng cáo gói cước mạng Internet mới.', isCorrect: false },
      ],
      correctExplanation: '督促状 (Đốc thúc trạng) là giấy đòi nợ gắt gao nhất trước khi cơ quan điện nước cử nhân viên xuống khóa van ngắt dịch vụ sinh hoạt!',
      trapAnalysis: 'Nhiều bạn du học sinh thấy chữ Hán phức tạp không thèm mở phong bì ra xem, dẫn đến việc đi làm về thấy nhà bị cắt nước, cắt điện giữa mùa đông lạnh giá.',
      mnemonicTip: 'Thấy chữ 督促 (Đốc thúc) = Chạy ngay ra Combini nộp tiền!',
    },
  },
];
