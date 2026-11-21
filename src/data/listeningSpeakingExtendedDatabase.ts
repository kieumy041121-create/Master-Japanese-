import {
  PhoneticReductionItem,
  AizuchiReflexItem,
  JlptChokkaiItem,
  IntonationNuanceItem,
  EmergencyDialogueItem,
} from '../types/listeningSpeakingExtended';

// =====================================================================
// SUBMODULE 89: LUYỆN NGHE NUỐT ÂM, BIẾN ÂM & ÂM LƯỚT (音変化・リダクション)
// =====================================================================

export const initialPhoneticReductionList: PhoneticReductionItem[] = [
  {
    id: 'phon-01',
    level: 'N2',
    ruleCategory: 'te_contract',
    ruleCategoryName: 'Co cụm đuôi V-てしまう ➔ ちゃう / じまう',
    standardForm: '忘れてしまいました (Wasurete shimaimashita)',
    reducedForm: '忘れちゃった / 忘れちゃいました (Wasurechatta)',
    phoneticRuleExplanation:
      'Âm "te shi" (てし) trong khẩu ngữ nhanh bị nuốt nguyên âm và phụ xát trở thành âm vòm hóa "cha" (ちゃ). Đối với âm đục "de shi" (でし) sẽ biến thành "ja" (じゃ) như: 飲んでしまった ➔ 飲んじゃった.',
    exampleSentenceStandard: '大事な書類を電車の中に置き忘れてしまいました。',
    exampleSentenceSpoken: '大事な書類、電車の中に置き忘れちゃった！どうしよう…',
    meaningVietnamese: 'Tôi lỡ để quên tập tài liệu quan trọng trong tàu điện mất rồi!',
    listeningTrap:
      'Thí sinh thường lúng túng khi nghe âm "ちゃった" vì tưởng là một động từ mới hoặc từ tượng thanh, không nhận ra bản chất của ngữ pháp hối tiếc / lỡ làm gì (～てしまう).',
    drillOptions: {
      promptAudioText: '雨が降ってきたから、傘買っちゃおうか。',
      options: [
        '雨が降ってきたから、傘を買ってしまいましょうか。',
        '雨が降ってきたから、傘を返しに行きましょうか。',
        '雨が降ってきたから、傘を借りておきましょうか。',
      ],
      correctIndex: 0,
      explanation: '買っちゃおうか = 買ってしまおうか (Hay là ta mua ô luôn đi).',
    },
    nativeUsageContext: 'Dùng cực kỳ phổ biến giữa bạn bè đồng nghiệp thân thiết và gia đình. Trong văn cảnh trịnh trọng với sếp thì phải dùng lại dạng đầy đủ "てしまいました".',
  },
  {
    id: 'phon-02',
    level: 'N2',
    ruleCategory: 'nakereba',
    ruleCategoryName: 'Lược giản điều kiện tiêu cực: なければ ➔ なきゃ / なくちゃ',
    standardForm: '行かなければなりません (Ikanakereba narimasen)',
    reducedForm: '行かなきゃ / 行かなくちゃ (Ikanakya / Ikanakucha)',
    phoneticRuleExplanation:
      'Cụm "nakereba" (なければ) bị nuốt âm rỗng "re" và âm điều kiện "ba", thu gọn thành "nakya" (なきゃ). Cụm "nakute wa" (なくては) rút gọn thành "nakucha" (なくちゃ). Đuôi "narimasen / dame" phía sau thường bị lược bỏ hoàn toàn.',
    exampleSentenceStandard: 'もう終電の時間ですから、そろそろ帰らなければなりません。',
    exampleSentenceSpoken: 'あ、もう終電だ！そろそろ帰らなきゃ！',
    meaningVietnamese: 'Ôi đã đến giờ tàu chuyến cuối rồi! Tôi phải về thôi!',
    listeningTrap:
      'Trong đề thi nghe Mondai 4 phản xạ tức thời, người Nhật chỉ nói lửng "～なきゃ" hoặc "～なくちゃ" rồi ngắt câu. Thí sinh không hiểu là câu mang nghĩa "bắt buộc phải làm gì".',
    drillOptions: {
      promptAudioText: '明日レポート提出だから、今日中に全部終わらせなきゃ！',
      options: [
        'Hôm nay không cần nộp báo cáo.',
        'Hôm nay bắt buộc phải hoàn thành xong toàn bộ báo cáo.',
        'Ngày mai sẽ bắt đầu viết báo cáo.',
      ],
      correctIndex: 1,
      explanation: '終わらせなきゃ = 終わらせなければならない (Bắt buộc phải làm xong).',
    },
    nativeUsageContext: 'Phụ nữ và trẻ em hay dùng "なくちゃ", thanh niên nam giới hay dùng "なきゃ". Đây là phản xạ bắt buộc khi biểu đạt sự cấp bách.',
  },
  {
    id: 'phon-03',
    level: 'N1',
    ruleCategory: 'toite',
    ruleCategoryName: 'Co cụm chuẩn bị trước: V-ておく ➔ とく / どく',
    standardForm: '予約しておいてください (Yoyaku shite oite kudasai)',
    reducedForm: '予約しといて (Yoyaku shitoite)',
    phoneticRuleExplanation:
      'Âm "te o" (てお) hợp nhất hai nguyên âm liên tiếp e + o tạo thành nguyên âm đơn lướt "to" (と). Khi động từ kết thúc bằng "de o" (でお) sẽ biến thành "do" (ど) như: 読んでおく ➔ 読んどく.',
    exampleSentenceStandard: '会議の前に資料をコピーしておいていただけますか。',
    exampleSentenceSpoken: '会議前に資料、人数分コピーしといてくれる？',
    meaningVietnamese: 'Cậu photo sẵn tài liệu theo số lượng người trước giờ họp hộ tớ được không?',
    listeningTrap:
      'Thí sinh hay nhầm lẫn "しといて" với "しておいて" vì âm trôi quá nhanh, không phân biệt được đó là hành động chuẩn bị trước (～ておく).',
    drillOptions: {
      promptAudioText: 'あらかじめ場所を確認しといたほうが安心だよ。',
      options: [
        'Xác nhận địa điểm sau khi đến nơi sẽ an tâm hơn.',
        'Nên kiểm tra trước địa điểm từ sớm để an tâm hơn.',
        'Không cần kiểm tra trước địa điểm.',
      ],
      correctIndex: 1,
      explanation: '確認しといた = 確認しておいた (Kiểm tra chuẩn bị trước).',
    },
    nativeUsageContext: 'Rất hay xuất hiện trong giao việc công sở cấp bậc ngang hàng hoặc cấp trên nhắc việc nhẹ cho cấp dưới.',
  },
  {
    id: 'phon-04',
    level: 'N1',
    ruleCategory: 'ranuki',
    ruleCategoryName: 'Hiện tượng nuốt chữ Ra trong khả năng (ら抜き言葉)',
    standardForm: '食べられる / 見られる (Taberareru / Mirareru)',
    reducedForm: '食べれる / 見れる (Tabereru / Mireru)',
    phoneticRuleExplanation:
      'Động từ nhóm 2 khi chia thể khả năng chuẩn quy tắc phải thêm "られる" (rareru). Tuy nhiên trong ngôn ngữ nói hiện đại, người Nhật có xu hướng triệt tiêu âm "ra" (ら) để tránh trùng lặp với thể bị động/kính ngữ, tạo thành "tabereru", "mireru", "koreru".',
    exampleSentenceStandard: '納豆は独特の匂いがありますが、あなたは食べられますか。',
    exampleSentenceSpoken: '納豆、匂い強いけど食べれる？',
    meaningVietnamese: 'Natto mùi hơi nồng nhưng bạn có ăn được không?',
    listeningTrap:
      'Trong văn bản chuẩn JLPT thì đây bị coi là lỗi ngữ pháp (nghiêm cấm dùng trong bài viết), nhưng trong bài thi nghe giao tiếp thực tế (Chokkai) thì người Nhật nói "食べれる" chiếm tới 80%.',
    drillOptions: {
      promptAudioText: '明日の打ち合わせ、10時から来れる？',
      options: [
        '明日10時の打ち合わせに来ることができますか。',
        '明日10時に誰かが来させられますか。',
        '明日10時に来ないでほしいですか。',
      ],
      correctIndex: 0,
      explanation: '来れる (koreru) là dạng Ranuki của 来られる (korareru) - Thể khả năng.',
    },
    nativeUsageContext: 'Cực kỳ phổ cập trong giới trẻ và truyền hình Nhật, nhưng không được viết trong thư từ trang trọng gửi khách hàng.',
  },
  {
    id: 'phon-05',
    level: 'N2',
    ruleCategory: 'n_assimilation',
    ruleCategoryName: 'Đồng hóa âm mũi N: のではないか ➔ んじゃないか / じゃん',
    standardForm: '行くのではないですか (Iku no dewa nai desu ka)',
    reducedForm: '行くんじゃない？ / 行くんじゃないですか (Ikun janai?)',
    phoneticRuleExplanation:
      'Trợ từ danh hóa "no" (の) biến thành âm mũi "n" (ん), và "dewa" (では) biến thành "ja" (じゃ). Dần dà "janai ka" rút gọn tối đa thành tiếng lóng "jan" (じゃん) ở đuôi câu khẳng định mang tính biểu cảm.',
    exampleSentenceStandard: 'そんな無理をしたら、体を壊してしまうのではないですか。',
    exampleSentenceSpoken: 'そんな無理したら体壊しちゃうんじゃない？少し休みなよ。',
    meaningVietnamese: 'Làm việc quá sức thế kia chẳng phải sẽ phá hủy sức khỏe sao? Nghỉ ngơi chút đi.',
    listeningTrap:
      'Thí sinh nghe chữ "Janai" tưởng là câu phủ định (Không đi), nhưng thực chất "～んじゃない？" là câu phỏng đoán khẳng định (Chẳng phải là... hay sao / Chắc là thế đấy).',
    drillOptions: {
      promptAudioText: '彼ならこの問題、すぐ解決できるんじゃない？',
      options: [
        'Anh ấy chắc chắn không thể giải quyết được vấn đề này.',
        'Tôi nghĩ chắc anh ấy có thể giải quyết được vấn đề này đấy.',
        'Anh ấy từ chối giải quyết vấn đề này.',
      ],
      correctIndex: 1,
      explanation: '～んじゃない？ = Phán đoán khẳng định mềm mỏng (Tôi nghĩ là có thể).',
    },
    nativeUsageContext: 'Trụ cột trong đối thoại đời thường Tokyo. Nắm vững điều này sẽ giúp nghe hiểu trọn vẹn ý đồ thật sự của người đối thoại.',
  },
];

export const extraPhoneticReductionList: PhoneticReductionItem[] = [
  {
    id: 'phon-06',
    level: 'N1',
    ruleCategory: 'te_contract',
    ruleCategoryName: 'Biến âm chỉ thị: てはいけない ➔ ちゃいけない / じゃだめ',
    standardForm: '諦めてはいけません (Akiramete wa ikemasen)',
    reducedForm: '諦めちゃだめ / 諦めちゃいけない (Akiramecha dame)',
    phoneticRuleExplanation: 'Cụm "te wa" (ては) biến thành "cha" (ちゃ); "de wa" (では) biến thành "ja" (じゃ). Cụm cấm chỉ rút gọn cực nhanh trong khẩu ngữ.',
    exampleSentenceStandard: 'ここで立ち止まってはいけません。前へ進みましょう。',
    exampleSentenceSpoken: 'ここで立ち止まっちゃだめだよ！最後まで走り切ろう！',
    meaningVietnamese: 'Không được dừng lại ở đây! Hãy chạy hết sức tới đích nào!',
    listeningTrap: 'Dễ nhầm với câu nói đùa vì âm "cha dame" nghe rất nhanh.',
    drillOptions: {
      promptAudioText: '秘密だから、誰にも言っちゃだめだよ。',
      options: [
        '誰にも言ってはいけません（禁止）。',
        '誰かに言っても構いません（許可）。',
        '誰かが言うはずがありません（推量）。',
      ],
      correctIndex: 0,
      explanation: '言っちゃだめ = 言ってはいけない (Tuyệt đối không được nói).',
    },
    nativeUsageContext: 'Khuyên bảo bạn bè hoặc người thân.',
  },
  {
    id: 'phon-07',
    level: 'N1',
    ruleCategory: 'renbin',
    ruleCategoryName: 'Biến âm nuốt nguyên âm lướt: という ➔ って / ていうか',
    standardForm: '山田さんという方 (Yamada-san to iu kata)',
    reducedForm: '山田さんっていう人 / ていうか (Yamada-san tte hito)',
    phoneticRuleExplanation: 'Cụm trích dẫn "to iu" (という) rút gọn thành âm ngắt xúc âm "tte" (って). Cụm chuyển chủ đề "to iu ka" thành "te iu ka" (mà đúng hơn là / nói cách khác là).',
    exampleSentenceStandard: '何と言いましたか。',
    exampleSentenceSpoken: 'え？今なんて言ったの？',
    meaningVietnamese: 'Hả? Cậu vừa nói cái gì cơ?',
    listeningTrap: 'Âm ngắt "って" xuất hiện với tần suất dày đặc khiến tai người học dễ bị rối nếu chỉ quen nghe băng đọc chậm.',
    drillOptions: {
      promptAudioText: '明日雨降るんだってさ。傘持っていこう。',
      options: [
        'Tôi nghe nói ngày mai trời sẽ mưa.',
        'Tôi chắc chắn ngày mai trời không mưa.',
        'Hôm qua trời đã mưa rất to.',
      ],
      correctIndex: 0,
      explanation: '～んだって = Nghe nói là (Truyền đạt thông tin).',
    },
    nativeUsageContext: 'Truyền tin tức, đồn thổi hoặc đính chính ý kiến bản thân.',
  },
  {
    id: 'phon-08',
    level: 'N2',
    ruleCategory: 'toite',
    ruleCategoryName: 'Biến âm thể sai khiến khẩu ngữ: させておく ➔ させとく',
    standardForm: '彼に連絡させておきます (Kare ni renraku sasete okimasu)',
    reducedForm: '彼に連絡させとくね (Kare ni renraku sasetoku ne)',
    phoneticRuleExplanation: 'Sai khiến "saseru" + "oku" ghép lại thành "sasetoku", biểu thị việc để yên cho ai làm việc gì hoặc giao phó trước.',
    exampleSentenceStandard: '念のため、担当者に確認させておきます。',
    exampleSentenceSpoken: '念のため、後で担当に確認させとくよ。',
    meaningVietnamese: 'Để cho chắc chắn, lát nữa tôi sẽ bảo người phụ trách kiểm tra lại trước nhé.',
    listeningTrap: 'Sự kết hợp giữa 2 thể ngữ pháp (Sai khiến + Hành động trước) khi bị co cụm âm rất khó nghe nếu không nắm quy tắc.',
    drillOptions: {
      promptAudioText: '今日は疲れただろうから、ゆっくり寝かせといてあげなよ。',
      options: [
        'Bắt anh ấy phải thức dậy ngay lập tức.',
        'Hãy cứ để yên cho anh ấy ngủ một giấc thật ngon đi.',
        'Đừng cho anh ấy ngủ.',
      ],
      correctIndex: 1,
      explanation: '寝かせといてあげる = Cứ để cho ngủ yên.',
    },
    nativeUsageContext: 'Cực kỳ tự nhiên trong giao tiếp công sở thân mật giữa các đồng nghiệp.',
  },
  {
    id: 'phon-09',
    level: 'N1',
    ruleCategory: 'te_contract',
    ruleCategoryName: 'Lược bỏ trợ từ cách âm tốc độ cao: を・が・は biến mất',
    standardForm: 'ご飯を食べる / お腹が痛い / それは本当ですか',
    reducedForm: 'ご飯食べる / お腹痛い / それ本当？',
    phoneticRuleExplanation: 'Trong giao tiếp đời thường nói nhanh, người Nhật lược bỏ tới 70% các trợ từ "o", "ga", "wa" khi ngữ nghĩa đã rõ ràng qua vị trí ngữ cảnh.',
    exampleSentenceStandard: 'この映画はもうご覧になりましたか。',
    exampleSentenceSpoken: 'この映画もう見た？めっちゃ面白いよ！',
    meaningVietnamese: 'Cậu đã xem phim này chưa? Hay cực kỳ luôn!',
    listeningTrap: 'Người học quá quen với việc phải nghe thấy trợ từ để xác định chủ ngữ - vị ngữ, khi người bản xứ nói nhanh bỏ trợ từ liền bị hụt hơi.',
    drillOptions: {
      promptAudioText: '鍵どこ置いたっけ？見当たらないんだけど。',
      options: [
        '鍵をどこに置きましたか（助詞省略）。',
        '鍵を買いましたか。',
        '鍵を壊しましたか。',
      ],
      correctIndex: 0,
      explanation: 'Lược bỏ trợ từ "o" và "ni": (鍵をどこに置いたっけ).',
    },
    nativeUsageContext: '100% người Nhật nói chuyện hằng ngày đều ứng dụng việc lược bỏ trợ từ này.',
  },
  {
    id: 'phon-10',
    level: 'N2',
    ruleCategory: 'nakereba',
    ruleCategoryName: 'Nuốt âm kính ngữ: ございます ➔ ございやす / ざいます',
    standardForm: 'ありがとうございます / おはようございます',
    reducedForm: 'あざっす / おざーす (Tiếng lóng) hoặc ありがとございます',
    phoneticRuleExplanation: 'Các lời chào hỏi lặp đi lặp lại hàng nghìn lần bị giản lược các phụ âm giữa, chỉ giữ lại phụ âm đầu và âm vang cuối.',
    exampleSentenceStandard: 'おはようございます、店長！',
    exampleSentenceSpoken: 'おざーす！今日もよろしくお願いします！',
    meaningVietnamese: 'Chào buổi sáng quản lý! Hôm nay lại nhờ anh giúp đỡ ạ!',
    listeningTrap: 'Sinh viên mới đi làm thêm (baito) ở cửa hàng tiện lợi hay quán ăn thường bị sốc vì không nghe ra lời chào của đàn anh.',
    drillOptions: {
      promptAudioText: 'お疲れっしたー！お先に失礼します！',
      options: [
        'お疲れ様でした（挨拶の短縮）。',
        '疲れていません。',
        '失礼なことをしました。',
      ],
      correctIndex: 0,
      explanation: 'お疲れっした = お疲れ様でした (Lời chào tan ca quen thuộc).',
    },
    nativeUsageContext: 'Văn hóa quán nhậu, công trường hoặc sinh viên làm thêm tại Nhật.',
  },
];

// =====================================================================
// SUBMODULE 90: PHẢN XẠ ỨNG KHẨU 3 GIÂY - AIZUCHI & ĐỆM TỪ TỰ NHIÊN
// =====================================================================

export const initialAizuchiList: AizuchiReflexItem[] = [
  {
    id: 'aizu-01',
    level: 'N2',
    situationType: 'business_respect',
    situationTypeName: 'Ứng đáp với Cấp trên / Đối tác kinh doanh',
    speakerPrompt: '明日のプレゼン、先方の役員も同席することになったから、資料の最終確認を抜かりなく頼むよ。',
    speakerPromptTranslation: 'Buổi thuyết trình ngày mai các giám đốc bên phía đối tác cũng sẽ cùng tham dự, nên tôi nhờ cậu kiểm tra kỹ lưỡng bản tài liệu cuối cùng đấy nhé.',
    speakerContext: 'Trưởng phòng (Bucho) trực tiếp dặn dò bạn một việc quan trọng của dự án.',
    idealAizuchi: 'かしこまりました。直ちに再点検し、不備のないよう万全を期します。',
    idealRomaji: 'Kashikomarimashita. Tadachini saitenken shi, fubi no nai you banzen o kishimasu.',
    meaningAndEffect: 'Xác nhận mệnh lệnh một cách cung kính, cam kết kiểm tra ngay lập tức để cấp trên an tâm 100%.',
    options: [
      {
        phrase: 'なるほどですね！了解しました！',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'TỐI KỴ CÔNG SỞ: "Naruhodo" mang hàm ý bề trên đánh giá cấp dưới. Tuyệt đối không dùng "Naruhodo" hay "Ryokai" với sếp!',
      },
      {
        phrase: 'かしこまりました。直ちに再確認いたします。',
        isIdeal: true,
        nuanceScore: 'perfect',
        feedback: 'CHUẨN MỰC: "Kashikomarimashita" là đỉnh cao kính ngữ khi tiếp nhận chỉ thị từ cấp trên.',
      },
      {
        phrase: 'はい、わかりました。大丈夫だと思いますよ。',
        isIdeal: false,
        nuanceScore: 'acceptable',
        feedback: 'QUÁ BÌNH THƯỜNG: Đúng ngữ pháp nhưng thiếu sự trang trọng đối với một cuộc họp có ban giám đốc dự.',
      },
    ],
    socialTabooWarning: 'Lỗi chết người số 1 của người nước ngoài là nói "なるほど" (Naruhodo) với cấp trên hoặc khách hàng. Người Nhật sẽ đánh giá bạn là kẻ kiêu ngạo!',
    speechSample: 'かしこまりました。抜かりなく準備いたします。',
  },
  {
    id: 'aizu-02',
    level: 'N2',
    situationType: 'surprise',
    situationTypeName: 'Phản hồi khi nghe tin bất ngờ / gây sốc',
    speakerPrompt: '実はね、あの真面目な佐藤さん、来月で会社辞めて世界一周の旅に出るらしいよ。',
    speakerPromptTranslation: 'Thật ra ấy, cái anh Sato trông nghiêm túc thế mà nghe nói tháng sau nghỉ việc để đi du lịch vòng quanh thế giới đấy.',
    speakerContext: 'Đồng nghiệp thân thiết chia sẻ một thông tin gây kinh ngạc trong giờ nghỉ giải lao.',
    idealAizuchi: 'えっ、嘘でしょ！？あの佐藤さんが！？全然知らなかった…！',
    idealRomaji: 'E-, uso desho!? Ano Sato-san ga!? Zenzen shiranakatta...!',
    meaningAndEffect: 'Thể hiện sự ngạc nhiên tự nhiên, đồng điệu nhịp cảm xúc tạo sự hào hứng cho câu chuyện.',
    options: [
      {
        phrase: 'えっ、本当ですか！？あの佐藤さんがですか！？信じられない…！',
        isIdeal: true,
        nuanceScore: 'perfect',
        feedback: 'RẤT TỰ NHIÊN: Cân bằng hoàn hảo giữa sự kinh ngạc chân thành và lịch thiệp.',
      },
      {
        phrase: 'そうですか。世界一周はいいですね。',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'LẠNH LÙNG: Đối phương đang kể tin nóng mà bạn trả lời như người máy sẽ giết chết cuộc trò chuyện.',
      },
      {
        phrase: 'まじで！？嘘つけ！',
        isIdeal: false,
        nuanceScore: 'acceptable',
        feedback: 'HƠI THÔ LỖ: "Uso tsuke" (Mày nói láo) chỉ dùng giữa bạn cực thân cùng tuổi, dùng ở công ty dễ phản cảm.',
      },
    ],
    socialTabooWarning: 'Người Nhật rất chú trọng "リアクション" (Reaction). Khi nghe tin sốc mà không biểu lộ cảm xúc (Poker face), họ sẽ nghĩ bạn không lắng nghe hoặc thiếu thân thiện.',
    speechSample: 'ええっ！本当にですか！？まさか佐藤さんが…！',
  },
  {
    id: 'aizu-03',
    level: 'N1',
    situationType: 'sympathy',
    situationTypeName: 'Thấu cảm & Chia sẻ khi đối phương gặp khó khăn',
    speakerPrompt: '先月からずっと残業続きでさ、昨日の深夜もクライアントの急な仕様変更で終電逃しちゃって…本当に参ったよ。',
    speakerPromptTranslation: 'Từ tháng trước tới giờ ngày nào tớ cũng tăng ca liên miên, đêm qua khách hàng lại đổi yêu cầu gấp làm lỡ cả chuyến tàu cuối... Thật sự kiệt sức rồi.',
    speakerContext: 'Đồng nghiệp cùng dự án than thở về tình trạng kiệt sức và stress công việc.',
    idealAizuchi: 'それは本当に大変でしたね…お体は大丈夫ですか？私に手伝えることがあれば何でも言ってくださいね。',
    idealRomaji: 'Sore wa hontou ni taihen deshita ne... Okarada wa daijoubu desu ka? Watashi ni tetsudaeru koto ga areba nandemo itte kudasai ne.',
    meaningAndEffect: 'Xoa dịu mệt mỏi của đối phương bằng sự thấu hiểu chân thành (寄り添い), hỏi han sức khỏe và đề nghị tương trợ.',
    options: [
      {
        phrase: '大変でしたね。でも社会人なら残業は当たり前ですよ。',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'TỐI KỴ: Phán xét "ai cũng phải tăng ca" như tạt gáo nước lạnh vào mặt người đang kiệt sức.',
      },
      {
        phrase: 'うわぁ…それは大変でしたね。お体大丈夫ですか？無理なさらないでくださいね。',
        isIdeal: true,
        nuanceScore: 'perfect',
        feedback: 'TUYỆT VỜI: Thể hiện trọn vẹn tinh thần "Omoiyari" (chu đáo thấu cảm) của người Nhật.',
      },
      {
        phrase: '私も昨日忙しかったです！私の話も聞いてください！',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'CƯỚP LỜI: Khi người khác đang tâm sự, tuyệt đối không được giật micro để nói về bản thân mình.',
      },
    ],
    socialTabooWarning: 'Quy tắc "寄り添い" (Yorisoi): Khi đối phương than thở, họ cần sự đồng cảm chứ không cần bạn giảng đạo lý hay đưa ra lời khuyên logic.',
    speechSample: 'それは本当にお疲れ様でした…無理だけはしないでくださいね。',
  },
  {
    id: 'aizu-04',
    level: 'N1',
    situationType: 'thinking_filler',
    situationTypeName: 'Đệm từ giữ nhịp suy nghĩ khi bị hỏi bất ngờ',
    speakerPrompt: '今回のマーケティング戦略の弱点について、君はどう分析しているかね？率直な意見を聞かせてほしい。',
    speakerPromptTranslation: 'Về điểm yếu của chiến lược marketing lần này, cậu phân tích như thế nào? Cứ cho tôi nghe ý kiến thẳng thắn.',
    speakerContext: 'Tổng giám đốc bất ngờ hỏi quan điểm của bạn giữa phòng họp đông người.',
    idealAizuchi: 'そうですね…非常に多角的な視点が求められる重要な問いかと存じます。現時点で私が着目しておりますのは…',
    idealRomaji: 'Sou desu ne... Hijou ni takakuteki na shiten ga motomerareru juuyou na toi ka to zonjimasu. Genshiten de watashi ga chakumoku shite orimasu no wa...',
    meaningAndEffect: 'Câu đệm thông minh giúp câu giờ 3-5 giây để não bộ sắp xếp ý tứ mà vẫn giữ được thần thái đĩnh đạc, chuyên nghiệp.',
    options: [
      {
        phrase: 'えーっと…あのー…えーっと…何でしたっけ？',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'MẤT ĐIỂM NGHIÊM TRỌNG: "E-tto... Anoo..." kéo dài biểu lộ sự lúng túng và thiếu chuẩn bị.',
      },
      {
        phrase: 'そうですね、ご指摘の通り非常に重要な論点かと存じます。私見ではございますが…',
        isIdeal: true,
        nuanceScore: 'perfect',
        feedback: 'HOÀN HẢO: Khen câu hỏi hay của sếp, vừa khiêm tốn nêu "ý kiến cá nhân" (私見).',
      },
      {
        phrase: '特に何も思いつきません。',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'THIẾU TRÁCH NHIỆM: Tự nhận không nghĩ ra gì trong cuộc họp lớn sẽ làm mất uy tín cá nhân.',
      },
    ],
    socialTabooWarning: 'Thay vì ậm ừ "Etto...", hãy dùng cụm từ ma thuật của giới thương thuyết Nhật: "そうですね、非常に核心を突いたご質問かと存じます" (Dạ vâng, đây quả là câu hỏi đánh trúng vào trọng tâm vấn đề).',
    speechSample: 'そうですね…私見ではございますが、現時点では2点ございます。',
  },
  {
    id: 'aizu-05',
    level: 'N2',
    situationType: 'agreement',
    situationTypeName: 'Đồng thuận sâu sắc trong đàm phán hợp đồng',
    speakerPrompt: '短期的な利益よりも、双方が長く共栄できる信頼関係を構築することこそが、今回の提携の本質だと考えております。',
    speakerPromptTranslation: 'Chúng tôi tin rằng bản chất của sự hợp tác lần này là xây dựng mối quan hệ tin cậy để đôi bên cùng trường tồn phát triển, chứ không phải vì lợi nhuận ngắn hạn.',
    speakerContext: 'Đối tác doanh nghiệp trình bày triết lý hợp tác win-win.',
    idealAizuchi: '仰る通りでございます。弊社といたしましても、まさにその理念に深く共鳴しております。',
    idealRomaji: 'Ossharu toori de gozaimasu. Heisha to itashimashitemo, masa ni sono rinen ni fukaku kyoumei shite orimasu.',
    meaningAndEffect: 'Khẳng định sự nhất trí hoàn toàn ở tầm cao triết lý kinh doanh, gia cố lòng tin.',
    options: [
      {
        phrase: '私もそう思います。いいね！',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'QUÁ SUỒNG SÃ: "Ii ne" là lời tán dương bề trên dành cho cấp dưới, cấm kỵ trong đàm phán thương mại.',
      },
      {
        phrase: 'まさに仰る通りでございます。弊社も全く同感でございます。',
        isIdeal: true,
        nuanceScore: 'perfect',
        feedback: 'ĐẲNG CẤP THƯƠNG GIA: "Ossharu toori" là cách đồng thuận tôn kính chuẩn mực nhất.',
      },
      {
        phrase: 'はい、その通りだと思います。',
        isIdeal: false,
        nuanceScore: 'acceptable',
        feedback: 'TRUNG BÌNH: Đúng ngữ pháp nhưng chưa thể hiện được sự trang trọng mức độ cao của thương gia.',
      },
    ],
    socialTabooWarning: 'Thay thế chữ "その通り" (cấp trên nói với cấp dưới) bằng "仰る通りでございます" (cấp dưới nói với khách hàng/đối tác).',
    speechSample: 'まさに仰る通りでございます。深く賛同いたします。',
  },
];

export const extraAizuchiList: AizuchiReflexItem[] = [
  {
    id: 'aizu-06',
    level: 'N1',
    situationType: 'business_respect',
    situationTypeName: 'Từ chối khéo lời mời nhậu của sếp',
    speakerPrompt: '今日の仕事終わり、久しぶりに駅前の一杯飲み屋で軽く飲んでいかないかい？',
    speakerPromptTranslation: 'Hôm nay xong việc, cậu có muốn tạt vào quán nhậu trước ga làm vài ly nhẹ nhàng không?',
    speakerContext: 'Sếp vui vẻ rủ bạn đi uống bia sau giờ làm việc, nhưng bạn đã có hẹn việc gia đình từ trước.',
    idealAizuchi: 'お誘いいただき大変光栄なのですが、あいにく先約がございまして…誠に申し訳ございません。ぜひ次回ご一緒させてください！',
    idealRomaji: 'Osasoi itadaki taihen kouei na no desu ga, ainiku sen\'yaku ga gozaimashite... Makoto ni moushiwake gozaimasen. Zehi jikai goissho sasete kudasai!',
    meaningAndEffect: 'Khen ngợi tấm lòng sếp ➔ Nêu lý do khó xử bằng từ đệm "あいにく" ➔ Hẹn lại dịp sau để không làm sếp mất mặt.',
    options: [
      {
        phrase: '嫌です。今日は家でゲームしたいので帰りまーす！',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'HỦY DIỆT QUAN HỆ: Nói thẳng thừng sẽ bị cô lập trong môi trường làm việc Nhật.',
      },
      {
        phrase: 'お声がけいただき恐縮です。あいにく外せない用事がありまして…次回はぜひお願いいたします！',
        isIdeal: true,
        nuanceScore: 'perfect',
        feedback: 'ĐẠT ĐIỂM TUYỆT ĐỐI: Giữ tròn đạo lý công sở Nhật.',
      },
      {
        phrase: '行けません。忙しいです。',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'CỘC LỐC.',
      },
    ],
    socialTabooWarning: 'Từ vựng vàng: "あいにく" (Thật không may là / Tiếc là) luôn là tấm khiên đệm êm ái nhất trước mọi lời từ chối.',
    speechSample: 'お誘い本当にありがとうございます。あいにく先約がございまして…',
  },
  {
    id: 'aizu-07',
    level: 'N2',
    situationType: 'sympathy',
    situationTypeName: 'Chia buồn khi nghe tin người thân đối phương ốm hoặc qua đời',
    speakerPrompt: '実は先週末、田舎の祖母が倒れて入院してしまってね…しばらく看病で有給をいただくかもしれないんだ。',
    speakerPromptTranslation: 'Thật ra cuối tuần rồi bà tớ ở quê ngã bệnh phải nhập viện... Chắc sắp tới tớ phải xin nghỉ phép ít hôm để chăm sóc bà.',
    speakerContext: 'Đồng nghiệp buồn bã chia sẻ biến cố gia đình.',
    idealAizuchi: 'それはご心配ですね…おばあさまのご容態はいかがですか？仕事のことは私たちがカバーしますので、どうぞお大事になさってください。',
    idealRomaji: 'Sore wa goshinpai desu ne... Obaasama no goroutai wa ikaga desu ka? Shigoto no koto wa watashitachi ga kaba- shimasu node, douzo odaiji ni nasatte kudasai.',
    meaningAndEffect: 'Đồng cảm nỗi lo lắng, chủ động nhận gánh đỡ việc để bạn mình yên tâm về quê.',
    options: [
      {
        phrase: 'それはご心配ですね…仕事は気にせず、おばあさまのおそばにいてあげてください。',
        isIdeal: true,
        nuanceScore: 'perfect',
        feedback: 'ẤM ÁP VÀ TINH TẾ.',
      },
      {
        phrase: 'へぇー、大変ですね。有給たくさん残ってますか？',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'VÔ DUYÊN: Hỏi về số ngày phép khi người ta đang lo lắng cho tính mạng người thân.',
      },
    ],
    socialTabooWarning: 'Cụm từ "ご心配ですね" (Chắc bạn lo lắng lắm) là câu mở đầu thấu cảm kinh điển.',
    speechSample: 'それはご心配ですね…どうぞお大事になさってください。',
  },
  {
    id: 'aizu-08',
    level: 'N1',
    situationType: 'surprise',
    situationTypeName: 'Tiếp nhận lời khen ngợi lớn từ khách hàng',
    speakerPrompt: '今回のシステム刷新、貴社の迅速なご対応のおかげで納期通りに稼働できました。本当に素晴らしいチームワークですね！',
    speakerPromptTranslation: 'Lần nâng cấp hệ thống này, nhờ sự hỗ trợ nhanh chóng của quý công ty mà đã vận hành đúng tiến độ. Tinh thần đồng đội của các bạn thật sự xuất sắc!',
    speakerContext: 'Khách hàng đối tác lớn nhiệt liệt khen ngợi dự án.',
    idealAizuchi: 'もったいないお言葉をいただき、身に余る光栄でございます。ひとえに皆様方の温かいご協力の賜物と、チーム一同心より深謝申し上げます。',
    idealRomaji: 'Mottainai okotoba o itadaki, mi ni amaru kouei de gozaimasu. Hitoeni minasama-gata no atatakai go-kyouryoku no tamamono to, chi-mu ichidou kokoro yori shinsha moushiagemasu.',
    meaningAndEffect: 'Khiêm nhường đón nhận lời khen và khéo léo quy công lao về sự phối hợp tuyệt vời của chính khách hàng.',
    options: [
      {
        phrase: '恐縮でございます。皆様の多大なるお力添えのおかげと、心より感謝申し上げます。',
        isIdeal: true,
        nuanceScore: 'perfect',
        feedback: 'ĐẲNG CẤP KHIÊM NHƯỜNG NHẬT BẢN.',
      },
      {
        phrase: 'はい！私たちが死ぬほど頑張ったからです！もっと褒めてください！',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'TỰ PHỤ KHOE KHOANG: Hoàn toàn xa lạ với văn hóa khiêm tốn của người Nhật.',
      },
    ],
    socialTabooWarning: 'Người Nhật luôn dùng mẫu "身に余る光栄" (Vinh dự vượt quá tầm của tôi) và "～の賜物" (Là quả ngọt từ sự giúp đỡ của quý vị) để hồi đáp lời khen.',
    speechSample: '温かいお言葉をいただき、身に余る光栄に存じます。',
  },
  {
    id: 'aizu-09',
    level: 'N2',
    situationType: 'agreement',
    situationTypeName: 'Đồng ý với quan điểm của bạn bè thân thiết',
    speakerPrompt: 'やっぱりさ、休みの日は家でゴロゴロ動画見てるのが一番の幸せだよねー。',
    speakerPromptTranslation: 'Nghĩ đi nghĩ lại thì ngày nghỉ cứ nằm ườn ở nhà cày video là hạnh phúc nhất đời nhỉ.',
    speakerContext: 'Trò chuyện vui vẻ tự nhiên giữa bạn bè.',
    idealAizuchi: 'それな！めっちゃわかる！何もしない贅沢って最高だよね（笑）',
    idealRomaji: 'Sore na! Meccha wakaru! Nani mo shinai zeitaku tte saikou da yo ne',
    meaningAndEffect: 'Dùng tiếng lóng "Sore na" thịnh hành để tạo sự gần gũi, đồng điệu tuyệt đối.',
    options: [
      {
        phrase: 'それな！分かりみが深すぎる！',
        isIdeal: true,
        nuanceScore: 'perfect',
        feedback: 'CHUẨN SLANG GIỚI TRẺ: Tạo không khí cực kỳ vui vẻ.',
      },
      {
        phrase: '貴殿の主張は論理的に妥当であると認めます。',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'QUÁ CỨNG NHẮC NHƯ ROBOT.',
      },
    ],
    socialTabooWarning: 'Phải linh hoạt: Với bạn bè nói "それな" (Chuẩn luôn), nhưng với sếp phải nói "おっしゃる通りです".',
    speechSample: 'それなー！ほんとそれ！',
  },
  {
    id: 'aizu-10',
    level: 'N1',
    situationType: 'thinking_filler',
    situationTypeName: 'Khen ngợi ý tưởng của người khác trước khi phản biện nhẹ',
    speakerPrompt: 'コスト削減のために、来期から社内の清掃業者を解約して、社員全員で毎朝30分掃除する案はどうでしょう？',
    speakerPromptTranslation: 'Để cắt giảm chi phí, từ kỳ tới ta chấm dứt hợp đồng với công ty vệ sinh, rồi toàn thể nhân viên mỗi sáng dành 30 phút dọn dẹp thì sao ạ?',
    speakerContext: 'Một đồng nghiệp đề xuất ý tưởng tiết kiệm nhưng có thể gây phản ứng tiêu cực.',
    idealAizuchi: 'コスト意識を徹底するという着眼点は非常に素晴らしいですね。その上で、社員の本業への集中や時間的コストの観点からも少し検討が必要かもしれません。',
    idealRomaji: 'Kosuto ishiki o tettei suru to iu chakuganten wa hijou ni subarashii desu ne. Sono ue de, shain no hongyou e no shuuchuu ya jikanteki kosuto no kanten kara mo sukoshi kentou ga hitsuyou kamoshiremasen.',
    meaningAndEffect: 'Nghệ thuật "Sandwich Feedback" của Nhật: Khen điểm tốt trước ➔ Dùng từ đệm "その上で" để gợi mở vấn đề mà không làm bẽ mặt người đề xuất.',
    options: [
      {
        phrase: 'なるほど、コスト削減の意識はとても大切ですね。ただ、業務効率の面も併せて考慮すべきかと存じます。',
        isIdeal: true,
        nuanceScore: 'perfect',
        feedback: 'PHẢN BIỆN ĐỈNH CAO KHÔNG MẤT LÒNG.',
      },
      {
        phrase: 'バカバカしい！社員は掃除するために給料もらってるんじゃないですよ！',
        isIdeal: false,
        nuanceScore: 'rude_or_awkward',
        feedback: 'TẤN CÔNG TRỰC DIỆN: Gây thù chuốc oán trong công ty.',
      },
    ],
    socialTabooWarning: 'Văn hóa Nhật không bao giờ nói "No" hay "Sai rồi" thẳng thừng. Hãy khen thiện chí trước rồi mới bàn giải pháp.',
    speechSample: '着眼点としては非常に面白いですね。その上で…',
  },
];

// =====================================================================
// SUBMODULE 91: PHÒNG LUYỆN NGHE ĐỀ JLPT CHUYÊN SÂU: MONDAI 4 & MONDAI 5
// =====================================================================

export const initialJlptChokkaiList: JlptChokkaiItem[] = [
  {
    id: 'chokkai-01',
    level: 'N1',
    questionType: 'mondai4_instant_response',
    questionTypeName: 'Mondai 4: Phản xạ tức thời (即時応答)',
    title: 'Câu hỏi bẫy ngữ pháp: 敬語 và Thể sai khiến bị động',
    scenarioDescription: 'Người nữ nói một câu ngắn về việc nhờ vả công việc, thí sinh phải chọn câu hồi đáp phù hợp nhất trong 3 đáp án nghe được.',
    audioDialogueScript: [
      {
        speaker: '女の同僚',
        text: '部長、先ほどの企画書、私にお手伝いさせていただけないでしょうか。',
        translation: 'Thưa Trưởng phòng, bản kế hoạch lúc nãy, liệu có thể cho phép em được giúp một tay có được không ạ?',
      },
    ],
    questionAudioText: 'Người nghe (Trưởng phòng) nên trả lời thế nào?',
    questionTranslation: 'Chọn lời đáp phù hợp nhất của Trưởng phòng:',
    choices: [
      {
        index: 1,
        text: 'ええ、ぜひ手伝わせていただきます。',
        isCorrect: false,
        explanation: 'SAI: Dùng sai kính ngữ "手伝わせていただきます" (Để tôi xin phép giúp cậu) - Trưởng phòng không tự hạ mình giúp lại nhân viên bằng câu này.',
      },
      {
        index: 2,
        text: 'そうか？じゃあ、悪いけどこのデータ入力頼めるかい？',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Đồng ý tiếp nhận sự hỗ trợ của cấp dưới với thái độ lịch thiệp và giao việc cụ thể.',
      },
      {
        index: 3,
        text: 'いえ、手伝ってくださる必要はありませんよ。',
        isCorrect: false,
        explanation: 'SAI SẮC THÁI: Cách từ chối cộc lốc và dùng sai ngữ pháp tôn kính kudasaru trong ngữ cảnh này.',
      },
    ],
    keyCatchPhrase: '私にお手伝いさせていただけないでしょうか (Xin phép cho em được giúp)',
    listeningStrategy:
      'Nhận diện cấu trúc "Cho tôi được làm gì" (V-させていただけますか). Ai là người thực hiện hành động? Là NGƯỜI NÓI muốn làm. Vậy người nghe đồng ý thì phải giao việc chứ không dùng thể xin phép ngược lại.',
  },
  {
    id: 'chokkai-02',
    level: 'N2',
    questionType: 'mondai4_instant_response',
    questionTypeName: 'Mondai 4: Phản xạ tức thời (即時応答)',
    title: 'Câu hỏi quán dụng ngữ: Chân tay không ngơi nghỉ',
    scenarioDescription: 'Hội thoại ngắn giữa hai đồng nghiệp tại quầy lễ tân.',
    audioDialogueScript: [
      {
        speaker: '同僚',
        text: '今日のイベント、朝からずっと客がひっきりなしで、手が回らないよ！',
        translation: 'Sự kiện hôm nay khách đông nườm nượp từ sáng tới giờ, tớ xoay sở không kịp tay chân luôn!',
      },
    ],
    questionAudioText: 'Chọn câu đáp lại tự nhiên nhất:',
    questionTranslation: 'Người nghe nên đáp lại thế nào?',
    choices: [
      {
        index: 1,
        text: 'ほんと、手が痛くて大変だったね。',
        isCorrect: false,
        explanation: 'BẪY NGHĨA ĐEN: "手が回らない" là quán dụng ngữ chỉ "quá bận không xoay sở kịp", không phải đau tay thật.',
      },
      {
        index: 2,
        text: 'じゃあ、私が受付のフォローに入るよ。あと少し頑張ろう！',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Hiểu đúng nghĩa "bận không kịp trở tay" nên chủ động đến trợ giúp.',
      },
      {
        index: 3,
        text: 'そんなに手が回るなら、これもやっておいてよ。',
        isCorrect: false,
        explanation: 'BẪY PHỦ ĐỊNH: Người ta kêu không xoay sở kịp mà lại bảo xoay sở được.',
      },
    ],
    keyCatchPhrase: '手が回らない (てがまわらない - Không xoay sở kịp vì quá bận)',
    listeningStrategy:
      'Ghi nhớ quán dụng ngữ có chữ "手" (tay): 手が回らない (không xuể), 手を抜く (làm qua loa), 手が空く (rảnh tay), 手を打つ (đưa ra biện pháp xử lý).',
  },
  {
    id: 'chokkai-03',
    level: 'N1',
    questionType: 'mondai5_integrated_comprehension',
    questionTypeName: 'Mondai 5: Tổng hợp hiểu sâu (統合理解)',
    title: 'Chọn gói dịch vụ đám mây cho doanh nghiệp (クラウドプラン選定)',
    scenarioDescription: 'Bài nghe dài với 4 phương án (Gói A, B, C, D). Hai nhân viên công ty thảo luận điều kiện ngân sách, dung lượng lưu trữ và tính bảo mật.',
    audioDialogueScript: [
      {
        speaker: '案内役',
        text: 'ITコンサルタントによる4つのクラウドサーバー導入プランの説明をお聞きください。\nプランAは月額5万円で容量無制限ですが、海外サーバーのためセキュリティ認証に時間がかかります。\nプランBは月額8万円で国内サーバー、最高レベルの暗号化セキュリティですが、初期容量が1テラバイトに制限されます。\nプランCは月額12万円で国内サーバー、容量無制限、専任サポート付きですが予算オーバーの懸念があります。\nプランDは月額3万円の格安プランですが、バックアップ機能がありません。',
        translation: 'Hãy nghe tư vấn về 4 gói: Gói A 5 vạn/tháng dung lượng vô hạn nhưng server nước ngoài chứng chỉ bảo mật chậm. Gói B 8 vạn/tháng server trong nước bảo mật tối cao nhưng giới hạn 1TB. Gói C 12 vạn/tháng toàn diện nhưng đắt. Gói D 3 vạn giá rẻ nhưng không có backup.',
      },
      {
        speaker: '男性社員',
        text: 'うちの会社、顧客の個人情報を扱うから、セキュリティの国際認証と国内サーバー設置は絶対条件だよな。',
        translation: 'Công ty mình xử lý thông tin cá nhân khách hàng, nên chứng chỉ bảo mật quốc tế và đặt server trong nước là điều kiện tiên quyết bắt buộc rồi.',
      },
      {
        speaker: '女性社員',
        text: 'ええ。ただ、今期のIT予算は月額10万円以内と部長から釘を刺されているわ。容量は初年度は1テラバイトあれば十分よね。',
        translation: 'Đúng vậy. Tuy nhiên ngân sách IT quý này Trưởng phòng đã quán triệt là dưới 10 vạn Yên/tháng. Còn dung lượng năm đầu thì 1TB là quá đủ rồi.',
      },
    ],
    questionAudioText: '質問：この会社は最終的にどのプランを選択することになりますか。',
    questionTranslation: 'Câu hỏi: Cuối cùng công ty này sẽ chọn gói dịch vụ nào?',
    choices: [
      { index: 1, text: 'プランA', isCorrect: false, explanation: 'Loại vì là server nước ngoài, vi phạm điều kiện an toàn thông tin khách hàng.' },
      { index: 2, text: 'プランB', isCorrect: true, explanation: 'CHÍNH XÁC: Server trong nước, bảo mật cao cấp, giá 8 vạn (nằm trong hạn mức 10 vạn), dung lượng 1TB đáp ứng đủ nhu cầu năm đầu.' },
      { index: 3, text: 'プランC', isCorrect: false, explanation: 'Loại vì giá 12 vạn/tháng, vượt quá trần ngân sách 10 vạn của trưởng phòng.' },
      { index: 4, text: 'プランD', isCorrect: false, explanation: 'Loại vì không có sao lưu dữ liệu (backup).' },
    ],
    keyCatchPhrase: '国内サーバー絶対条件 ＋ 予算10万円以内 ➔ プランB',
    listeningStrategy:
      'Kỹ thuật ghi chú ma trận Mondai 5: Kẻ bảng 4 dòng A-B-C-D với các cột: Giá tiền, Bảo mật, Dung lượng. Khi nghe nhân vật nam/nữ gạch bỏ điều kiện nào thì lấy bút gạch chéo ngay phương án đó!',
  },
];

export const extraJlptChokkaiList: JlptChokkaiItem[] = [
  {
    id: 'chokkai-04',
    level: 'N2',
    questionType: 'mondai4_instant_response',
    questionTypeName: 'Mondai 4: Phản xạ tức thời (即時応答)',
    title: 'Phản xạ với câu xin lỗi khách sáo (恐れ入ります)',
    scenarioDescription: 'Hội thoại trong thang máy công ty đối tác.',
    audioDialogueScript: [
      {
        speaker: '取引先',
        text: 'わざわざ遠方まで足をお運びいただき、恐れ入ります。',
        translation: 'Quý vị đã không quản ngại đường sá xa xôi cất công tới tận đây, tôi thật là ngại quá ạ.',
      },
    ],
    questionAudioText: 'Chọn câu đáp lại chuẩn tắc ngoại giao nhất:',
    questionTranslation: 'Chọn lời đáp lại của bên khách tới thăm:',
    choices: [
      {
        index: 1,
        text: 'とんでもございません。こちらこそ、お時間をいただき感謝申し上げます。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: "Tondemo gozaimasen" (Dạ không có chi đâu ạ) kết hợp cảm ơn đối phương đã dành thời gian.',
      },
      {
        index: 2,
        text: 'ええ、本当に遠くて疲れ果てましたよ。',
        isCorrect: false,
        explanation: 'SAI: Đi than thở mệt mỏi với khách hàng.',
      },
      {
        index: 3,
        text: 'どういたしまして。また来てくださいね。',
        isCorrect: false,
        explanation: 'SAI VỊ THẾ: Khách đến thăm mà lại bảo đối tác "lần sau lại đến nữa nhé".',
      },
    ],
    keyCatchPhrase: '足をお運びいただき、恐れ入ります (Cảm ơn đã cất công đến thăm)',
    listeningStrategy: 'Khi người Nhật nói "恐れ入ります" hay "お手数をおかけします", câu phản xạ tức thời luôn là "とんでもございません / こちらこそ".',
  },
  {
    id: 'chokkai-05',
    level: 'N1',
    questionType: 'mondai4_instant_response',
    questionTypeName: 'Mondai 4: Phản xạ tức thời (即時応答)',
    title: 'Bẫy ngữ pháp: Phủ định ngầm (～ずにはいられない)',
    scenarioDescription: 'Cuộc trò chuyện giữa hai người bạn sau khi xem bộ phim cảm động.',
    audioDialogueScript: [
      {
        speaker: '友人',
        text: 'あの映画のラストシーン、誰もが涙を禁じ得なかったよね。',
        translation: 'Cảnh cuối của bộ phim đó, quả thực không ai có thể kìm được nước mắt cậu nhỉ.',
      },
    ],
    questionAudioText: 'Chọn phản hồi tự nhiên và đồng cảm nhất:',
    questionTranslation: 'Người bạn nên trả lời thế nào?',
    choices: [
      {
        index: 1,
        text: 'そうだね、みんな泣くのを我慢できたんだね。',
        isCorrect: false,
        explanation: 'SAI BẢN CHẤT: "涙を禁じ得ない" là "không thể kìm được nước mắt" = khóc nức nở, chứ không phải nhịn được khóc.',
      },
      {
        index: 2,
        text: '本当だね。劇場中からすすり泣きが聞こえてきて胸が熱くなったよ。',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Đồng tình với sự xúc động ngập tràn trong rạp.',
      },
      {
        index: 3,
        text: 'ええ、泣く人が一人もいなくて驚いたよ。',
        isCorrect: false,
        explanation: 'SAI NGƯỢC Ý HOÀN TOÀN.',
      },
    ],
    keyCatchPhrase: '涙を禁じ得ない (なみだをきんじえない - Không thể kìm được dòng lệ)',
    listeningStrategy: 'Cụm từ "～を禁じ得ない" là ngữ pháp N1 chỉ cảm xúc trào dâng không cách nào kìm nén được.',
  },
];

// =====================================================================
// SUBMODULE 92: BẬC THẦY NGỮ ĐIỆU CẢM XÚC & NGHĨA NGẦM
// =====================================================================

export const initialIntonationList: IntonationNuanceItem[] = [
  {
    id: 'into-01',
    level: 'N2',
    targetPhrase: 'いいです (Ii desu)',
    romaji: 'Ii desu',
    literalMeaning: 'Nghĩa mặt chữ: Tốt / Được',
    contrastA: {
      pitchContour: 'rising',
      contourLabel: 'Lên giọng ở cuối câu (↗)',
      realMeaning: 'Đồng ý / Chấp thuận hồ hởi ("Vâng, được đấy ạ! / Cứ làm thế đi ạ")',
      toneMood: 'Tươi vui, cởi mở, khuyến khích',
      exampleContext: 'Khi ai đó mời bạn một tách trà ngon hoặc đề xuất một ý tưởng hay.',
      spokenSentence: 'お茶のおかわり、いかがですか？ ➔ あ、いいですね！いただきます！↗',
    },
    contrastB: {
      pitchContour: 'falling',
      contourLabel: 'Hạ giọng dứt khoát ở cuối (↘)',
      realMeaning: 'Từ chối dứt khoát nhưng lịch sự ("Thôi đủ rồi / Không cần đâu ạ")',
      toneMood: 'Khách khí, dứt khoát, giữ khoảng cách',
      exampleContext: 'Khi nhân viên thu ngân hỏi bạn có muốn lấy thêm túi nilon hay hóa đơn không.',
      spokenSentence: 'レジ袋はお付けしますか？ ➔ あ、結構です、いいです。↘',
    },
    subtleClues: [
      'Âm "I-" kéo dài nhẹ và vút lên ở "su↗" = Đồng ý nhận.',
      'Âm ngắt ngắn, dứt khoát ở chữ "su↘" kèm theo cái lắc đầu nhẹ = Từ chối.',
    ],
    testScenario: {
      scenarioAudio: '「追加のご注文はいかがでしょうか」「あ、もういいです↘」',
      scenarioTranslation: 'Phục vụ bàn: "Quý khách có muốn gọi thêm món gì nữa không ạ?" - Khách: "A, mou ii desu↘"',
      question: 'Khách hàng có muốn gọi thêm món ăn không?',
      options: ['Có, khách muốn xem thêm thực đơn.', 'Không, khách từ chối gọi thêm vì đã đủ rồi.'],
      correctIndex: 1,
      explanation: 'Hạ giọng "もういいです↘" mang nghĩa từ chối: Tôi no rồi / Không cần thêm món nữa.',
    },
    culturalInsight:
      'Từ "いいです" là bẫy nguy hiểm nhất trong đời sống thường nhật tại Nhật. Người nước ngoài nói "いいです" mà nở nụ cười lên giọng sẽ bị người Nhật hiểu là đồng ý lấy thêm đồ.',
  },
  {
    id: 'into-02',
    level: 'N2',
    targetPhrase: '大丈夫です (Daijoubu desu)',
    romaji: 'Daijoubu desu',
    literalMeaning: 'Nghĩa mặt chữ: Đại trượng phu / Ổn / Không sao',
    contrastA: {
      pitchContour: 'rising',
      contourLabel: 'Hỏi han hoặc Khẳng định tự tin (↗)',
      realMeaning: 'Khẳng định "Tôi hoàn toàn ổn / Mọi việc vẫn trong tầm kiểm soát!"',
      toneMood: 'Tích cực, trấn an đối phương',
      exampleContext: 'Khi sếp lo lắng hỏi dự án khó thế cậu kham nổi không.',
      spokenSentence: '納期まで間に合いそうかい？ ➔ はい！大丈夫です！任せてください！↗',
    },
    contrastB: {
      pitchContour: 'flat',
      contourLabel: 'Thanh điệu bằng phẳng, hơi lùi lại (―)',
      realMeaning: 'Từ chối tế nhị ("Tôi tự lo được, không cần anh bận tâm / Thôi khỏi ạ")',
      toneMood: 'Giữ kẽ, từ chối sự giúp đỡ',
      exampleContext: 'Khi người lạ ngỏ ý muốn xách hộ hành lý nặng.',
      spokenSentence: 'お荷物お持ちしましょうか？ ➔ あ、大丈夫です…ありがとうございます。―',
    },
    subtleClues: [
      'Đi kèm nụ cười tươi và mắt sáng = Trấn an tự tin.',
      'Đi kèm xua tay nhẹ và lùi người lại = Từ chối khéo.',
    ],
    testScenario: {
      scenarioAudio: '「風邪薬、買ってきてあげようか？」「ううん、大丈夫―。寝てれば治るから」',
      scenarioTranslation: 'Bạn: "Tớ đi mua thuốc cảm hộ cậu nhé?" - Trả lời: "Uun, daijoubu―. Nằm ngủ là khỏi thôi"',
      question: 'Người nói có muốn nhờ mua thuốc cảm không?',
      options: ['Có, muốn bạn mua thuốc ngay.', 'Không, từ chối khéo vì nghĩ tự nghỉ ngơi là khỏi.'],
      correctIndex: 1,
      explanation: 'Âm giọng ngang bằng phẳng kèm câu giải thích đằng sau biểu thị sự từ chối không muốn làm phiền đối phương.',
    },
    culturalInsight:
      'Thế hệ trẻ Nhật Bản ngày nay sử dụng "大丈夫です" thay cho "いりません" (Tôi không cần) tới 90% trường hợp để tránh từ chối quá trực diện gây tổn thương người khác.',
  },
  {
    id: 'into-03',
    level: 'N1',
    targetPhrase: 'そうですか (Sou desu ka)',
    romaji: 'Sou desu ka',
    literalMeaning: 'Nghĩa mặt chữ: Thế à / Vậy sao',
    contrastA: {
      pitchContour: 'rising',
      contourLabel: 'Lên giọng vút ở âm Ka (↗)',
      realMeaning: 'Nghi vấn / Bất ngờ / Muốn đối phương kể tiếp ("Thật thế á!? Chưa nghe bao giờ!")',
      toneMood: 'Tò mò, hào hứng, ngạc nhiên',
      exampleContext: 'Khi nghe một phát hiện khoa học mới lạ.',
      spokenSentence: 'これ、全部AIで作った画像なんですよ。 ➔ ええっ、そうですか！？本物の写真に見えますね！↗',
    },
    contrastB: {
      pitchContour: 'falling',
      contourLabel: 'Hạ giọng trầm xuống ở âm Ka (↘)',
      realMeaning: 'Tiếp nhận thông tin / Chấm dứt bàn luận / Bất lực ("Ra là vậy... thế thì đành chịu")',
      toneMood: 'Thất vọng nhẹ, trầm lắng, kết thúc hội thoại',
      exampleContext: 'Khi hỏi mượn tài liệu mà đối phương báo đã vứt đi mất rồi.',
      spokenSentence: 'あの本、昨日処分しちゃったんだ。 ➔ ああ…そうですか…残念です。↘',
    },
    subtleClues: [
      'Âm Ka cao vút và mắt mở to = Tò mò chất vấn.',
      'Âm Ka rơi thẳng xuống đáy giọng = Thừa nhận sự thật và chuẩn bị đổi chủ đề.',
    ],
    testScenario: {
      scenarioAudio: '「申し訳ありません、本日のチケットは完売いたしました」「…そうですか↘。わかりました」',
      scenarioTranslation: 'Nhân viên: "Thành thật xin lỗi, vé hôm nay đã bán hết sạch rồi ạ" - Khách: "...Sou desu ka↘. Tôi hiểu rồi"',
      question: 'Tâm trạng của vị khách lúc này là gì?',
      options: ['Hào hứng ngạc nhiên vì vé bán chạy.', 'Thất vọng chấp nhận thực tế là không mua được vé.'],
      correctIndex: 1,
      explanation: 'Ngữ điệu hạ giọng "そうですか↘" biểu thị sự chấp nhận kết quả đáng tiếc.',
    },
    culturalInsight:
      'Biết cách chuyển điệu "そうですか" là chìa khóa điều khiển nhịp đàm thoại của người Nhật: muốn người ta kể tiếp thì lên giọng, muốn kết thúc buổi nói chuyện thì hạ giọng trầm.',
  },
];

export const extraIntonationList: IntonationNuanceItem[] = [
  {
    id: 'into-04',
    level: 'N1',
    targetPhrase: '結構です (Kekkou desu)',
    romaji: 'Kekkou desu',
    literalMeaning: 'Nghĩa mặt chữ: Tốt đẹp / Khá là',
    contrastA: {
      pitchContour: 'rising',
      contourLabel: 'Tươi vui ấm áp (↗)',
      realMeaning: 'Khen ngợi ("Rất tuyệt vời! / Khá là hay đấy!")',
      toneMood: 'Tán thưởng',
      exampleContext: 'Giáo viên duyệt bài luận của học sinh.',
      spokenSentence: 'この企画、内容がよく練られていて結構ですね！↗',
    },
    contrastB: {
      pitchContour: 'falling',
      contourLabel: 'Lạnh lùng ngắt gọn (↘)',
      realMeaning: 'Từ chối lạnh lùng ("Không cần nữa / Dừng lại đi")',
      toneMood: 'Khước từ dứt khoát',
      exampleContext: 'Từ chối người tiếp thị bảo hiểm ngoài cửa.',
      spokenSentence: '保険の見直しはいかが… ➔ いえ、もう結構です！↘',
    },
    subtleClues: ['Khen ngợi thì kéo dài âm "Kekkou ne↗", từ chối thì ngắt cụt "Kekkou desu!↘"'],
    testScenario: {
      scenarioAudio: '「レシートをお入れしますか」「いえ、結構です↘」',
      scenarioTranslation: 'Thu ngân: "Cho hóa đơn vào túi nhé?" - Khách: "Ie, kekkou desu↘"',
      question: 'Khách hàng có lấy hóa đơn không?',
      options: ['Có, khách muốn cất hóa đơn.', 'Không, khách từ chối lấy hóa đơn.'],
      correctIndex: 1,
      explanation: 'Từ chối lấy hóa đơn.',
    },
    culturalInsight: 'Kekkou desu nếu nói không cẩn thận rất dễ mang lại cảm giác thô lỗ, cộc lốc.',
  },
  {
    id: 'into-05',
    level: 'N2',
    targetPhrase: 'ちょっと… (Chotto...)',
    romaji: 'Chotto...',
    literalMeaning: 'Nghĩa mặt chữ: Một chút / Một ít',
    contrastA: {
      pitchContour: 'rising',
      contourLabel: 'Âm thanh nhanh, gọi người (↗)',
      realMeaning: 'Gọi ai đó ("Này cậu ơi / Cho tôi hỏi chút")',
      toneMood: 'Thu hút sự chú ý',
      exampleContext: 'Gọi đồng nghiệp lại xem văn bản.',
      spokenSentence: '田中さん、ちょっといい？↗ このデータ見てほしいんだけど。',
    },
    contrastB: {
      pitchContour: 'prolonged',
      contourLabel: 'Kéo dài lửng lơ rồi im lặng (～～…)',
      realMeaning: 'Từ chối tế nhị ("Khó cho tôi quá / Điều đó hơi bất tiện...")',
      toneMood: 'Khó xử, ngập ngừng, từ chối',
      exampleContext: 'Khi bị rủ đi chơi vào ngày bận rộn.',
      spokenSentence: '今週末、飲みに行かない？ ➔ 今週末は…ちょっと用事があって…～～',
    },
    subtleClues: ['Kéo dài âm đuôi và bỏ lửng câu = 100% là từ chối lịch sự kiểu Nhật.'],
    testScenario: {
      scenarioAudio: '「明日引越し手伝ってくれない？」「明日はちょっと…予定が…」',
      scenarioTranslation: 'Bạn: "Mai sang dọn nhà hộ tớ nhé?" - Trả lời: "Ashita wa chotto... yotei ga..."',
      question: 'Người được nhờ có sang giúp dọn nhà được không?',
      options: ['Được, người đó sẽ tranh thủ sang một chút.', 'Không, người đó khéo léo từ chối vì bận việc.'],
      correctIndex: 1,
      explanation: 'Câu nói lửng "ちょっと…" là cách từ chối quốc dân của người Nhật.',
    },
    culturalInsight: 'Không bao giờ ép người Nhật nói nốt câu khi họ đã thốt ra chữ "ちょっと…", vì đó là ranh giới từ chối tế nhị cao nhất.',
  },
];

// =====================================================================
// SUBMODULE 93: MÔ PHỎNG TÌNH HUỐNG KHẨN CẤP & ĐỜI SỐNG SINH TỒN
// =====================================================================

export const initialEmergencyList: EmergencyDialogueItem[] = [
  {
    id: 'emer-01',
    level: 'N2',
    category: 'dial_119_ambulance',
    categoryName: 'Gọi Cứu Thương / Cứu Hỏa (119番通報)',
    emergencyTitle: 'Gọi xe cấp cứu khi có người bất tỉnh đột ngột',
    situationBrief: 'Tại phòng trọ hoặc trên đường phố, bạn phát hiện một người bạn ngã quỵ, bất tỉnh nhân sự, thở dốc. Bạn phải bấm số 119.',
    crucialKeywords: [
      { japanese: '救急です', romaji: 'Kyuukyuu desu', vietnamese: 'Cần xe cấp cứu (phân biệt với Hỏa hoạn)' },
      { japanese: '意識がありません', romaji: 'Ishiki ga arimasen', vietnamese: 'Không có ý thức / Hôn mê' },
      { japanese: '住所・目印', romaji: 'Juusho / Mejirushi', vietnamese: 'Địa chỉ cụ thể và vật mốc nhận diện' },
      { japanese: '呼吸をしています', romaji: 'Kokyuu o shiteimasu', vietnamese: 'Còn thở hay đã ngưng thở' },
    ],
    branchingSteps: [
      {
        stepIndex: 1,
        officialAudioPrompt: '119番消防署です。火事ですか、救急ですか？',
        officialPromptTranslation: 'Tổng đài 119 sở cứu hỏa xin nghe. Xin cho biết là Cháy hay Cấp cứu?',
        userChoiceOptions: [
          {
            userSpokenText: '救急です！友達が突然倒れて、意識がありません！',
            isStandardSurvival: true,
            consequenceFeedback: 'CHUẨN XÁC: Nêu ngay từ khóa "救急です" và trạng thái hôn mê.',
            responseFromOfficial: '救急ですね、落ち着いてください。場所はどこですか？市町村から住所をお願いします。',
          },
          {
            userSpokenText: '助けてください！大変です！早く来てください！',
            isStandardSurvival: false,
            consequenceFeedback: 'MẤT BÌNH TĨNH: La hét hoảng loạn không cho tổng đài biết là cháy nhà hay người ốm sẽ làm chậm tiến độ điều động xe.',
            responseFromOfficial: '落ち着いて！火事ですか、救急ですか！？まずどちらか答えてください！',
          },
        ],
      },
      {
        stepIndex: 2,
        officialAudioPrompt: '場所はどちらですか？住所を教えてください。近くに目印はありますか？',
        officialPromptTranslation: 'Địa chỉ ở đâu ạ? Xin đọc địa chỉ. Xung quanh có vật mốc nhận diện nào không?',
        userChoiceOptions: [
          {
            userSpokenText: '東京都新宿区高田馬場2丁目15番地のサクラハイツ201号室です。1階にセブンイレブンがあります。',
            isStandardSurvival: true,
            consequenceFeedback: 'XUẤT SẮC: Đọc từ Tỉnh/Quận/Phường/Số nhà/Tên tòa nhà/Số phòng + Vật mốc nhận diện (Cửa hàng tiện lợi tầng 1).',
            responseFromOfficial: '新宿区高田馬場2丁目15番地サクラハイツ201号、1階のセブンイレブンですね。救急車を直ちに向かわせました。倒れている方の年齢と呼吸の有無を教えてください。',
          },
          {
            userSpokenText: '私の部屋です！アパートの2階です！',
            isStandardSurvival: false,
            consequenceFeedback: 'NGUY HIỂM TÍNH MẠNG: Nói "phòng của tôi" thì xe cứu thương ở Tokyo không tài nào biết đường đến!',
            responseFromOfficial: '住所がわからないと救急車が出動できません！郵便物や電柱に書いてある住所を見てください！',
          },
        ],
      },
    ],
    survivalChecklist: [
      'Ghi nhớ số nhà viết trên bảng điện của cột điện (電柱) hoặc trên phong bì thư nếu quên địa chỉ nhà trọ.',
      'Khi xe cứu thương hú còi gần tới, hãy cử một người chạy xuống đường vẫy tay dẫn đường.',
      'Xe cấp cứu tại Nhật Bản được nhà nước tài trợ MIỄN PHÍ tiền xe, chỉ trả viện phí tại bệnh viện.',
    ],
    japanLegalSystemNote:
      'Quy trình gọi 119 tại Nhật Bản luôn tuân thủ nghiêm ngặt 3 bước: 1. Khẳng định Hỏa hoạn (火事) hay Cấp cứu (救急) ➔ 2. Báo Địa chỉ chính xác ➔ 3. Mô tả triệu chứng nạn nhân.',
  },
  {
    id: 'emer-02',
    level: 'N2',
    category: 'jr_lost_found',
    categoryName: 'Thất lạc hành lý trên tàu điện JR (忘れ物・遺失物)',
    emergencyTitle: 'Khai báo rơi ví tiền và hộ chiếu trên tàu Shinkansen / Yamanote',
    situationBrief: 'Vừa bước xuống ga Shinjuku, bạn bàng hoàng nhận ra mình đã để quên chiếc ba lô chứa hộ chiếu, ví tiền và visa trên ghế ngồi toa tàu.',
    crucialKeywords: [
      { japanese: '落とし物・忘れ物', romaji: 'Otoshimono / Wasuremono', vietnamese: 'Đồ thất lạc / Đồ để quên' },
      { japanese: '乗車区間・時刻', romaji: 'Jousha kukan / Jikoku', vietnamese: 'Chặng đường đi và giờ lên/xuống tàu' },
      { japanese: '何両目・座席番号', romaji: 'Nanryoume / Zaseki bangou', vietnamese: 'Toa số mấy, vị trí ghế ngồi nào' },
      { japanese: '特徴・色・形状', romaji: 'Tokuchou / Iro / Keijou', vietnamese: 'Đặc điểm nhận diện, màu sắc, hình dáng' },
    ],
    branchingSteps: [
      {
        stepIndex: 1,
        officialAudioPrompt: 'JRお忘れ物承り所です。どのようなお忘れ物でしょうか？',
        officialPromptTranslation: 'Văn phòng tiếp nhận đồ thất lạc JR xin nghe. Quý khách để quên đồ gì ạ?',
        userChoiceOptions: [
          {
            userSpokenText: '黒いリュックサックです。中にパスポートと財布が入っています。先ほど14時15分に新宿に着いた山手線の車内です。',
            isStandardSurvival: true,
            consequenceFeedback: 'RẤT ĐẦY ĐỦ: Báo màu sắc (đen), loại vật dụng (balo), đồ bên trong (hộ chiếu, ví), thời gian và chuyến tàu cụ thể.',
            responseFromOfficial: '14時15分新宿着の山手線外回りですね。乗られていたのは前寄りの車両ですか？棚の上でしょうか、座席でしょうか？',
          },
          {
            userSpokenText: 'バッグを忘れました！探してください！',
            isStandardSurvival: false,
            consequenceFeedback: 'QUÁ MƠ HỒ: Mỗi ngày JR nhặt được hàng vạn chiếc túi, không có thông tin giờ tàu và màu sắc thì không thể tra cứu hệ thống.',
            responseFromOfficial: 'どの路線の、何時頃の電車でしょうか？バッグの色や特徴を詳しく教えていただけますか？',
          },
        ],
      },
      {
        stepIndex: 2,
        officialAudioPrompt: '何両目のどのあたりに乗られていましたか？座席の上か、網棚の上か覚えていますか？',
        officialPromptTranslation: 'Quý khách ngồi ở khoảng toa xe thứ mấy? Có nhớ để trên ghế hay trên giá để đồ không?',
        userChoiceOptions: [
          {
            userSpokenText: '前から4両目のドア付近の座席で、網棚の上に載せました。リュックに青いキーホルダーが付いています。',
            isStandardSurvival: true,
            consequenceFeedback: 'TUYỆT VỜI: Chi tiết móc chìa khóa màu xanh (青いキーホルダー) là dấu hiệu nhận biết độc nhất vô nhị để xác minh chính chủ.',
            responseFromOfficial: '承知いたしました。終点の駅で車内点検を行いますので、見つかり次第ご連絡いたします。お名前とお電話番号をお願いします。',
          },
        ],
      },
    ],
    survivalChecklist: [
      'Ghi nhớ số hiệu toa xe (ví dụ: 号車 4) in trên mặt sàn ga tàu nơi bạn bước vào.',
      'Xác suất tìm lại đồ để quên trên tàu điện Nhật Bản lên tới hơn 90% nếu cung cấp đủ thông tin giờ tàu.',
      'Sau vài ngày, đồ thất lạc sẽ được JR chuyển giao cho Đồn cảnh sát (Koban / 警察署) lưu giữ.',
    ],
    japanLegalSystemNote:
      'Mạng lưới đường sắt Nhật Bản có hệ thống cơ sở dữ liệu đồ thất lạc tập trung liên kết giữa các nhà ga. Khai báo càng chi tiết đặc điểm riêng thì hệ thống quét tìm kiếm càng nhanh.',
  },
  {
    id: 'emer-03',
    level: 'N1',
    category: 'dial_110_police',
    categoryName: 'Báo Cảnh Sát Khẩn Cấp 110 (110番警察通報)',
    emergencyTitle: 'Báo cảnh sát khi bị trộm đột nhập hoặc quấy rối rình rập',
    situationBrief: 'Đêm khuya đi bộ về nhà trọ, bạn phát hiện một kẻ lạ mặt đi theo sau suốt quãng đường dài và đang cố tình áp sát hành lang nhà.',
    crucialKeywords: [
      { japanese: '事件です', romaji: 'Jiken desu', vietnamese: 'Có vụ việc / Vụ án hình sự' },
      { japanese: 'つきまとい・ストーカー', romaji: 'Tsukimatoi / Suto-ka-', vietnamese: 'Kẻ rình rập, theo dõi bám đuôi' },
      { japanese: '不審者', romaji: 'Fushinsha', vietnamese: 'Đối tượng khả nghi' },
      { japanese: '身の危険を感じています', romaji: 'Mi no kiken o kanjiteimasu', vietnamese: 'Tôi đang cảm thấy nguy hiểm tới tính mạng' },
    ],
    branchingSteps: [
      {
        stepIndex: 1,
        officialAudioPrompt: '110番警察です。事件ですか、事故ですか？',
        officialPromptTranslation: 'Tổng đài 110 cảnh sát xin nghe. Xin hỏi là Vụ việc hình sự hay Tai nạn giao thông?',
        userChoiceOptions: [
          {
            userSpokenText: '事件です！不審な男に後をつけられていて、今アパートの階段の下に男がいます！身の危険を感じています！',
            isStandardSurvival: true,
            consequenceFeedback: 'CHUẨN XÁC: Định danh "事件です" (Vụ việc) + Báo ngay mối đe dọa trực diện.',
            responseFromOfficial: '事件ですね。ご自身は安全な場所に鍵をかけて隠れていますか？現在地を教えてください！パトカーを急行させます！',
          },
        ],
      },
    ],
    survivalChecklist: [
      'Nếu đang đi ngoài đường, hãy chạy ngay vào Cửa hàng tiện lợi (Konbini) sáng đèn và hô to nhờ nhân viên hỗ trợ.',
      'Tổng đài 110 Nhật Bản có dịch vụ thông dịch 3 bên đa ngôn ngữ (tiếng Anh, Trung, Việt).',
    ],
    japanLegalSystemNote:
      'Hành vi bám đuôi theo dõi ở Nhật Bản bị xử lý cực kỳ nghiêm khắc theo Luật chống rình rập (ストーカー規制法). Cảnh sát sẽ lập tức điều động xe tuần tra (Patoka) có còi ưu tiên.',
  },
];

export const extraEmergencyList: EmergencyDialogueItem[] = [
  {
    id: 'emer-04',
    level: 'N2',
    category: 'hospital_triage',
    categoryName: 'Khám Cấp Cứu Ban Đêm / Ngày Nghỉ (夜間休日診療)',
    emergencyTitle: 'Mô tả triệu chứng sốt cao co giật hoặc đau bụng dữ dội tại quầy cấp cứu',
    situationBrief: 'Vào tối chủ nhật các phòng khám đóng cửa, bạn bị đau bụng quằn quại phía bên phải kèm sốt 39 độ, nghi ngờ đau ruột thừa.',
    crucialKeywords: [
      { japanese: '激痛が走る', romaji: 'Gekitsuu ga hashiru', vietnamese: 'Cơn đau dữ dội nhói lên' },
      { japanese: '盲腸・虫垂炎', romaji: 'Mouchou / Chuusuien', vietnamese: 'Đau ruột thừa' },
      { japanese: '保険証を持参しました', romaji: 'Hokenshou o jisan shimashita', vietnamese: 'Đã mang theo thẻ bảo hiểm y tế' },
      { japanese: 'アレルギー歴', romaji: 'Arerugi- reki', vietnamese: 'Tiền sử dị ứng thuốc' },
    ],
    branchingSteps: [
      {
        stepIndex: 1,
        officialAudioPrompt: '夜間救急外来受付です。今夜はどうなさいましたか？',
        officialPromptTranslation: 'Quầy tiếp nhận cấp cứu ban đêm xin nghe. Tối nay anh/chị có triệu chứng gì thế nào ạ?',
        userChoiceOptions: [
          {
            userSpokenText: '2時間前から右下腹部に激痛があって、熱も39度あります。歩くのも辛い状態です。',
            isStandardSurvival: true,
            consequenceFeedback: 'CHUẨN: Mô tả vị trí (hạ sườn phải), thời gian phát bệnh (2 tiếng trước), nhiệt độ sốt.',
            responseFromOfficial: '右下腹部ですね。虫垂炎の疑いがあります。保険証をお預かりして、すぐ当直医のバイタル検査に案内します。',
          },
        ],
      },
    ],
    survivalChecklist: [
      'Luôn mang theo Thẻ bảo hiểm y tế (健康保険証) và Thẻ lưu trú (在留カード).',
      'Nếu không biết bệnh viện nào mở cửa đêm nay, hãy gọi số #7119 (Đường dây nóng tư vấn cấp cứu Tokyo).',
    ],
    japanLegalSystemNote:
      'Tại Nhật, đi khám cấp cứu đêm không có bảo hiểm y tế có thể bị tính phí cọc ban đầu từ 2 đến 5 vạn Yên.',
  },
  {
    id: 'emer-05',
    level: 'N1',
    category: 'earthquake_typhoon',
    categoryName: 'Ứng Phó Động Đất Khẩn Cấp (緊急地震速報)',
    emergencyTitle: 'Xử lý tình huống khi chuông báo động đất vang lên trên điện thoại',
    situationBrief: 'Điện thoại đồng loạt hú chuông cảnh báo khẩn cấp: "Động đất mạnh sắp tới trong 10 giây".',
    crucialKeywords: [
      { japanese: '揺れに備えてください', romaji: 'Yure ni sonaete kudasai', vietnamese: 'Hãy chuẩn bị đón nhận rung lắc' },
      { japanese: '頭部を保護する', romaji: 'Toubu o hogo suru', vietnamese: 'Bảo vệ phần đầu' },
      { japanese: '火の始末', romaji: 'Hi no shimatsu', vietnamese: 'Tắt nguồn lửa ngay nếu an toàn' },
    ],
    branchingSteps: [
      {
        stepIndex: 1,
        officialAudioPrompt: '（緊急地震速報チャイム）強い揺れに警戒してください！エリア：関東地方。',
        officialPromptTranslation: '(Chuông báo động đất khẩn cấp) Cảnh báo rung lắc dữ dội! Khu vực: Kanto.',
        userChoiceOptions: [
          {
            userSpokenText: '机の下に潜って頭を守り、揺れが収まるまで脚をしっかり掴んで待機する！',
            isStandardSurvival: true,
            consequenceFeedback: 'HÀNH ĐỘNG SINH TỒN VÀNG: Chui ngay xuống gầm bàn, bảo vệ đầu, giữ chặt chân bàn.',
            responseFromOfficial: '揺れが収まりました。火の元を確認し、ドアを開けて避難経路を確保してください。',
          },
        ],
      },
    ],
    survivalChecklist: [
      'Không bao giờ dùng thang máy sau động đất.',
      'Mở hé cửa ra vào để phòng trường hợp khung cửa bị méo mó kẹt cứng không thoát ra được.',
    ],
    japanLegalSystemNote:
      'Nhật Bản có hệ thống cảnh báo sớm địa chấn (EEW) phát hiện sóng P để gửi tin nhắn cảnh báo vài giây trước khi sóng S gây phá hủy ập tới.',
  },
];
