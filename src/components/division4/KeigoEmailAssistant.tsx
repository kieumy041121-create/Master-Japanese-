import React, { useState } from 'react';
import { KeigoEmailItem } from '../../types';
import { initialKeigoEmailList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini } from '../../services/geminiService';
import { Mail, RefreshCw, Volume2, ShieldCheck, ArrowRight, Table, Lightbulb, ChevronLeft, ChevronRight, Plus, BookOpen, HeartHandshake } from 'lucide-react';

export const KeigoEmailAssistant: React.FC = () => {
  const [keigoList, setKeigoList] = useState<KeigoEmailItem[]>(initialKeigoEmailList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const currentItem = keigoList[currentIndex % keigoList.length];

  const handlePrevEmail = () => {
    setCurrentIndex((prev) => (prev - 1 + keigoList.length) % keigoList.length);
    speechService.playSuccessSound();
  };

  const handleNextEmail = () => {
    setCurrentIndex((prev) => (prev + 1) % keigoList.length);
    speechService.playSuccessSound();
  };

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 5 tình huống biến đổi Kính ngữ (Keigo) & Email công sở Nhật Bản theo schema KeigoEmailItem.
Định dạng JSON là một mảng gồm 5 phần tử:
[
  {
    "id": "keigo_${Date.now()}_1",
    "recipientRole": "Khách hàng đối tác (Soto)",
    "casualOrWrongVersion": "câu suồng sã hoặc sai",
    "problemAnalysis": "lý do sai",
    "correctSonkeigoOrKenjougo": "câu kính ngữ chuẩn mực",
    "transformationFormula": "công thức biến đổi",
    "quiz": {
      "id": "qkeigo_${Date.now()}_1",
      "question": "câu hỏi trắc nghiệm",
      "options": [
        { "id": "a", "text": "đáp án 1", "isCorrect": true },
        { "id": "b", "text": "đáp án 2", "isCorrect": false },
        { "id": "c", "text": "đáp án 3", "isCorrect": false },
        { "id": "d", "text": "đáp án 4", "isCorrect": false }
      ],
      "correctExplanation": "giải thích",
      "trapAnalysis": "bẫy tư duy",
      "mnemonicTip": "mẹo nhớ"
    }
  }
]
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần mảng 5 phần tử.');
      const parsed = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim());
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid5 = parsed.filter((it) => it && it.correctSonkeigoOrKenjougo).slice(0, 5);
        if (valid5.length > 0) {
          setKeigoList((prev) => [...prev, ...valid5]);
          setCurrentIndex(keigoList.length);
          speechService.playSuccessSound();
          return;
        }
      }
      throw new Error('Dùng 5 mẫu email chuẩn');
    } catch {
      // 5 High-Yield Authentic Workplace Keigo Email Patterns
      const timestamp = Date.now();
      const fiveKeigos: KeigoEmailItem[] = [
        {
          id: `keigo_5_${timestamp}_1`,
          recipientRole: 'Khách hàng đối tác (Soto) - Xin lịch hẹn phỏng vấn/gặp mặt',
          casualOrWrongVersion: '「来週の火曜日に会いたいです。空いていますか？」',
          problemAnalysis: 'Dùng từ「会いたい」và「空いていますか」quá sỗ sàng, coi thời gian của khách hàng như chuyện bông đùa.',
          correctSonkeigoOrKenjougo: '「来週火曜日の午後、恐れ入りますが、30分ほどお時間を頂戴できますでしょうか。」',
          transformationFormula: 'Muốn gặp xin thời gian -> お時間を頂戴できますでしょうか (Kenjougo)',
          quiz: {
            id: `qkeigo_${timestamp}_1`,
            question: 'Khi gửi email xin hẹn gặp đại diện công ty đối tác, cách diễn đạt nào thể hiện sự lịch thiệp tối đa?',
            options: [
              { id: 'a', text: '恐れ入りますが、30分ほどお時間を頂戴できますでしょうか。', isCorrect: true },
              { id: 'b', text: 'いつ会えますか？教えてください。', isCorrect: false },
              { id: 'c', text: '火曜日に来てください。', isCorrect: false },
              { id: 'd', text: '会う時間がありますか？', isCorrect: false },
            ],
            correctExplanation: 'Cụm「お時間を頂戴する」(Nhận được thời gian quý báu) là Khiêm nhường ngữ chuẩn mực nhất khi yêu cầu lịch hẹn với đối tác.',
            trapAnalysis: 'Nhiều bạn dùng "Jikan ga arimasuka" nghe như tra khảo đối phương rảnh hay bận.',
            mnemonicTip: 'Xin hẹn -> Dùng お時間を頂戴できますでしょうか!',
          },
        },
        {
          id: `keigo_5_${timestamp}_2`,
          recipientRole: 'Đối tác kinh doanh (Soto) - Thông báo gửi đính kèm file báo giá',
          casualOrWrongVersion: '「見積書をメールに付けました。見てください。」',
          problemAnalysis: 'Dùng「付けました」(Gắn vào) và「見てください」(Hãy xem đi) mang sắc thái ra lệnh cho đối tác.',
          correctSonkeigoOrKenjougo: '「お見積書を添付ファイルにてお送りいたしましたので、ご査収のほどよろしくお願い申し上げます。」',
          transformationFormula: 'Gửi kèm file -> 添付ファイルにてお送りいたしました + Xin vui lòng kiểm tra -> ご査収のほどお願い申し上げます',
          quiz: {
            id: `qkeigo_${timestamp}_2`,
            question: 'Khi đính kèm tập tin tài liệu quan trọng trong email doanh nghiệp, cụm từ vàng để nhờ đối tác kiểm tra là gì?',
            options: [
              { id: 'a', text: 'ご査収のほどよろしくお願い申し上げます。(Goshashū no hodo)', isCorrect: true },
              { id: 'b', text: '早く見てください。(Mau xem đi)', isCorrect: false },
              { id: 'c', text: 'チェックを命令します。(Lệnh cho kiểm tra)', isCorrect: false },
              { id: 'd', text: '確認してね。(Xác nhận nhé)', isCorrect: false },
            ],
            correctExplanation: '【ご査収】(ごさしゅう) có nghĩa là "Kiểm tra kỹ nội dung rồi tiếp nhận", là thuật ngữ kinh điển trong thư tín thương mại Nhật.',
            trapAnalysis: 'Dùng "Gokakunin kudasai" là được nhưng chưa đủ độ trang trọng bằng "Goshashū".',
            mnemonicTip: 'Gửi file đính kèm -> Goshashū no hodo!',
          },
        },
        {
          id: `keigo_5_${timestamp}_3`,
          recipientRole: 'Khách hàng đề nghị giảm giá (Soto) - Từ chối lịch sự',
          casualOrWrongVersion: '「その値引きは無理です。できません。」',
          problemAnalysis: 'Nói thẳng thừng「無理です / できません」(Không được / Bất khả thi) tạo cảm giác cụt ngủn, tuyệt tình, làm hỏng mối quan hệ làm ăn lâu dài.',
          correctSonkeigoOrKenjougo: '「大変心苦しい限りではございますが、ご要望に沿いかねる状況でございます。何卒ご容赦ください。」',
          transformationFormula: 'Đệm từ áy náy (Kushon Kotoba) -> 大変心苦しい限りではございますが + Từ chối nhẹ nhàng -> 〜いたしかねます / ご要望に沿いかねます',
          quiz: {
            id: `qkeigo_${timestamp}_3`,
            question: 'Nghệ thuật đệm từ giảm chấn (Kushon Kotoba) khi từ chối yêu cầu của khách hàng là gì?',
            options: [
              { id: 'a', text: '大変心苦しい限りではございますが、ご要望に沿いかねます。', isCorrect: true },
              { id: 'b', text: '無理なので諦めてください。', isCorrect: false },
              { id: 'c', text: '社長に聞いてみないとわかりません。', isCorrect: false },
              { id: 'd', text: '値引きは絶対に禁止です。', isCorrect: false },
            ],
            correctExplanation: 'Người Nhật không bao giờ nói chữ "Không" trực diện. Dùng「沿いかねる」(Khó lòng đáp ứng được) vừa mềm mại vừa dứt khoát lịch thiệp.',
            trapAnalysis: 'Bẫy nói thẳng "Dekimasen" khiến đối tác cảm thấy bị từ chối phũ phàng.',
            mnemonicTip: 'Từ chối êm ái: Tâm đắc Kokorogurushii & Soikanemasu!',
          },
        },
        {
          id: `keigo_5_${timestamp}_4`,
          recipientRole: 'Đối tác mới ký hợp đồng (Soto) - Lời chào mở đầu email',
          casualOrWrongVersion: '「こんにちは、お世話になってます。」',
          problemAnalysis: 'Lời chào suồng sã như bạn bè thân thiết, thiếu tính trang trọng của nghi lễ giao thương B2B.',
          correctSonkeigoOrKenjougo: '「平素は格別のご高配を賜り、厚く御礼申し上げます。貴社におかれましては益々ご隆盛のこととお慶び申し上げます。」',
          transformationFormula: 'Lời chào tiêu chuẩn đối tác ngoài -> 平素は格別のご高配を賜り、厚く御礼申し上げます',
          quiz: {
            id: `qkeigo_${timestamp}_4`,
            question: 'Câu mở đầu thư tín kinh doanh trang trọng nhất gửi tới công ty đối tác là gì?',
            options: [
              { id: 'a', text: '平素は格別のご高配を賜り、厚く御礼申し上げます。', isCorrect: true },
              { id: 'b', text: '久しぶりですね、元気ですか？', isCorrect: false },
              { id: 'c', text: 'お疲れ様でした！', isCorrect: false },
              { id: 'd', text: 'こんにちは、早速ですが本題に入ります。', isCorrect: false },
            ],
            correctExplanation: 'Cụm từ "Heiso wa kakubetsu no gokouhai wo tamawari..." là công thức chuẩn mực mở đầu mọi email hợp tác kinh doanh tại Nhật.',
            trapAnalysis: 'Rất nhiều người nhầm "Otsukaresama desu" (chỉ dùng nội bộ Uchi) đem gửi ra đối tác ngoài (Soto).',
            mnemonicTip: 'Đối tác ngoài: Luôn mở đầu bằng Osewa ni natte orimasu hoặc Heiso wa kakubetsu...!',
          },
        },
        {
          id: `keigo_5_${timestamp}_5`,
          recipientRole: 'Khách hàng chậm phản hồi (Soto) - Nhắc nhở tế nhị',
          casualOrWrongVersion: '「まだ返信がありません。早く返事をください。」',
          problemAnalysis: 'Hối thúc như đòi nợ「早く返事をください」là điều tối kỵ, bị coi là bất lịch sự nghiêm trọng.',
          correctSonkeigoOrKenjougo: '「ご多忙の折、大変恐縮ではございますが、○月○日までにご意向をお聞かせいただけますと幸甚に存じます。」',
          transformationFormula: 'Thông cảm sự bận rộn -> ご多忙の折、大変恐縮ではございますが + Xin ý kiến -> ご意向をお聞かせいただけますと幸甚に存じます (こうじんにぞんじます)',
          quiz: {
            id: `qkeigo_${timestamp}_5`,
            question: 'Khi muốn giục khách hàng trả lời email trước hạn chót, cách viết nào tinh tế nhất?',
            options: [
              { id: 'a', text: 'ご多忙中恐縮ですが、○日までにご返信いただけますと幸甚に存じます。', isCorrect: true },
              { id: 'b', text: '遅いので早く返信してください。', isCorrect: false },
              { id: 'c', text: '忘れていませんか？', isCorrect: false },
              { id: 'd', text: '返信しないと困ります。', isCorrect: false },
            ],
            correctExplanation: 'Cụm từ「幸甚に存じます」(Biết ơn sâu sắc) là tầng kính ngữ cao cấp nhất (Saikō-keigo) dùng khi nhờ vả đối tác quan trọng.',
            trapAnalysis: 'Giục giã thiếu chữ đệm khiến người Nhật cảm thấy bị xúc phạm lòng tự trọng.',
            mnemonicTip: 'Giục khéo léo: Bận rộn thông cảm + Koujin ni zonjimasu!',
          },
        },
      ];

      setKeigoList((prev) => [...prev, ...fiveKeigos]);
      setCurrentIndex(keigoList.length);
      speechService.playSuccessSound();
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>Trợ lý Luyện viết Kính ngữ (Keigo) & Email</span>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sonkeigo · Kenjougo · Uchi vs Soto</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Chuyển hóa email suồng sã thành thư tín thương mại chuẩn mực. Nắm vững ranh giới người trong nhà (Uchi) và đối tác ngoài (Soto).
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setShowCheatSheet(!showCheatSheet)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <Table className="w-3.5 h-3.5 text-indigo-400" />
            <span>{showCheatSheet ? 'Đóng bảng tra Keigo' : 'Bảng tra Keigo thần tốc'}</span>
          </button>

          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải nạp thêm mẫu email mới vô hạn"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Tải nạp thêm email ({keigoList.length})</span>
          </button>
        </div>
      </div>

      {/* Keigo Cheat Sheet Modal / Toggle Drawer */}
      {showCheatSheet && (
        <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-5 shadow-2xl space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Bảng biến đổi Kính ngữ thần tốc (Quy tắc Uchi / Soto)</span>
            </span>
            <span className="text-[11px] text-slate-400">Tôn kính = Nâng đối tác | Khiêm nhường = Hạ mình</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="py-2 px-3">Động từ gốc</th>
                  <th className="py-2 px-3 text-emerald-400">Tôn kính ngữ (Sonkeigo - Khách làm)</th>
                  <th className="py-2 px-3 text-indigo-400">Khiêm nhường ngữ (Kenjougo - Mình làm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-jp text-slate-200">
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-300">行く / 来る (Đi / Đến)</td>
                  <td className="py-2 px-3 text-emerald-300">いらっしゃる / おいでになる</td>
                  <td className="py-2 px-3 text-indigo-300">伺う (うかがう) / 参る (まいる)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-300">言う (Nói)</td>
                  <td className="py-2 px-3 text-emerald-300">おっしゃる</td>
                  <td className="py-2 px-3 text-indigo-300">申す (もうす) / 申し上げる</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-300">食べる / 飲む (Ăn / Uống)</td>
                  <td className="py-2 px-3 text-emerald-300">召し上がる (めしあがる)</td>
                  <td className="py-2 px-3 text-indigo-300">いただく / 頂戴する</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-300">見る (Xem / Nhìn)</td>
                  <td className="py-2 px-3 text-emerald-300">ご覧になる (ごらんになる)</td>
                  <td className="py-2 px-3 text-indigo-300">拝見する (はいけんする)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-slate-300">知る (Biết)</td>
                  <td className="py-2 px-3 text-emerald-300">ご存知です (ごぞんじです)</td>
                  <td className="py-2 px-3 text-indigo-300">存じております / 存じ上げます</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Email Transformation Stage */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-5">
            {/* Top Stepper Navigation Bar: [← Email trước] [X / Y] [Email tiếp theo →] + [➕ Tải thêm 5 cái] */}
            <div className="p-2.5 sm:p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevEmail}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Xem mẫu email trước đó"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Email trước</span>
                </button>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-400 font-bold">
                  {(currentIndex % keigoList.length) + 1} / {keigoList.length}
                </div>
                <button
                  onClick={handleNextEmail}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md shadow-indigo-900/30"
                  title="Xem mẫu email tiếp theo"
                >
                  <span>Email tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleLoadMoreInfinite}
                disabled={isLoadingMore}
                className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
                title="Tải nạp 5 mẫu email Kính ngữ mới"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Tải thêm 5 cái</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-semibold text-indigo-400">
                Đối tượng nhận: {currentItem.recipientRole}
              </span>
              <span className="text-slate-500 font-mono">Bài {currentIndex + 1} / {keigoList.length}</span>
            </div>

            {/* Casual / Flawed Version */}
            <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl space-y-1.5">
              <div className="text-xs font-semibold text-rose-400">Đoạn email gốc (Suồng sã / Sai quy chuẩn):</div>
              <div className="text-base font-jp text-slate-100 font-medium">
                {currentItem.casualOrWrongVersion}
              </div>
              <div className="text-xs text-rose-300/80 pt-1 border-t border-rose-900/30">
                Lỗi sai: {currentItem.problemAnalysis}
              </div>
            </div>

            {/* Correct Keigo Transformation */}
            <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">
                  Phiên bản Kính ngữ hoàn hảo:
                </span>
                <button
                  onClick={() => speechService.speak(currentItem.correctSonkeigoOrKenjougo)}
                  className="text-slate-400 hover:text-emerald-300 cursor-pointer p-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-base md:text-lg font-jp text-white font-bold leading-relaxed">
                {currentItem.correctSonkeigoOrKenjougo}
              </div>
            </div>

            {/* Transformation Formula */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 text-xs text-slate-300 font-mono">
              <div className="font-semibold text-indigo-300 font-sans">Công thức biến đổi:</div>
              <p className="whitespace-pre-line text-slate-300">{currentItem.transformationFormula}</p>
            </div>

            {/* MỤC GIẢI THÍCH CHUYÊN SÂU & NGUYÊN LÝ UCHI - SOTO */}
            <div className="p-4 bg-gradient-to-r from-indigo-950/40 via-slate-950 to-slate-900 border border-indigo-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Mục giải thích chuyên sâu & Nguyên lý Uchi - Soto trong thư tín</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-indigo-300 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Quy tắc Vàng Uchi - Soto:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Khi nói chuyện với người ngoài (Soto), dù sếp của bạn có là Giám đốc thì đối với đối tác, sếp bạn vẫn là người trong nhà (Uchi) và phải hạ mình xuống (dùng Khiêm nhường ngữ Kenjougo, gọi tên trần ví dụ "Yamada ga...").
                  </p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-emerald-300 font-semibold flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Nghệ thuật đệm từ Kushon Kotoba:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Trước khi nhờ vả, từ chối hoặc nhắc nhở, luôn lót một lớp đệm mềm (Kushon Kotoba) như「恐れ入りますが」「お手数をおかけいたしますが」để bảo vệ lòng tự tôn của người nhận thư.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Stepper Navigation Bar: [← Email trước] [X / Y] [Email tiếp theo →] + [➕ Tải thêm 5 cái] */}
            <div className="pt-4 border-t border-slate-800/80 p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevEmail}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Xem mẫu email trước đó"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Email trước</span>
                </button>
                <div className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-400 font-bold">
                  {(currentIndex % keigoList.length) + 1} / {keigoList.length}
                </div>
                <button
                  onClick={handleNextEmail}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md shadow-indigo-900/30"
                  title="Xem mẫu email tiếp theo"
                >
                  <span>Email tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleLoadMoreInfinite}
                disabled={isLoadingMore}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
                title="Tải nạp 5 mẫu email Kính ngữ mới"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Tải thêm 5 cái ({keigoList.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Quiz */}
        <div className="lg:col-span-5">
          <QuizCard
            quiz={currentItem.quiz}
            title="Trắc nghiệm biến đổi Kính ngữ"
            onNext={() => setCurrentIndex((prev) => (prev + 1) % keigoList.length)}
          />
        </div>
      </div>
    </div>
  );
};
