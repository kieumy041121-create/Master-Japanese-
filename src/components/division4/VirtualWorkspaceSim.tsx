import React, { useState } from 'react';
import { VirtualWorkspaceItem } from '../../types';
import { initialVirtualWorkspaceList } from '../../data/initialData';
import { QuizCard } from '../common/QuizCard';
import { speechService } from '../../services/speechService';
import { callGemini } from '../../services/geminiService';
import { Monitor, RefreshCw, Mail, Table, Send, Paperclip, Bold, Italic, CheckCircle2, Lightbulb } from 'lucide-react';

export const VirtualWorkspaceSim: React.FC = () => {
  const [tasks, setTasks] = useState<VirtualWorkspaceItem[]>(initialVirtualWorkspaceList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'outlook' | 'sheets'>('outlook');
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const currentItem = tasks[currentIndex % tasks.length];

  const handleLoadMoreInfinite = async () => {
    setIsLoadingMore(true);
    try {
      const prompt = `
Hãy tạo 1 nhiệm vụ văn phòng ảo doanh nghiệp Nhật Bản mới (Virtual Workspace simulation task).
Có thể là Soạn thảo email Outlook/Gmail theo quy chuẩn 【件名】 hoặc Bảng tính quản lý tiến độ/báo cáo doanh thu kiểu Excel/Google Sheets.
Kèm dữ liệu giả lập (mockWorkspaceData), các quy tắc định dạng tài liệu kiểu Nhật (japaneseFormattingRules) và 1 bài tập trắc nghiệm kiểm tra quy chuẩn trình bày tài liệu chuyên nghiệp với bẫy tư duy và mẹo nhớ.
Định dạng JSON như schema VirtualWorkspaceItem.
`;
      const res = await callGemini(prompt, 'Chỉ trả về JSON thuần.');
      const parsed = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim());
      setTasks((prev) => [...prev, parsed]);
      setCurrentIndex(tasks.length);
      speechService.playSuccessSound();
    } catch {
      // Fallback
      const fallbackTask: VirtualWorkspaceItem = {
        id: `vw_inf_${Date.now()}`,
        taskType: 'Bảng tính quản lý tiến độ Sheets/Excel',
        title: 'Bảng kiểm kê ngân sách chiến dịch Marketing Quý 4',
        mockWorkspaceData: {
          tableColumns: ['Mục chi tiêu (費目)', 'Ngân sách dự trù (予算)', 'Thực chi (実績)', 'Chênh lệch (差異)', 'Trạng thái (ステータス)'],
          tableRows: [
            { 'Mục chi tiêu (費目)': 'Quảng cáo số Google Ads', 'Ngân sách dự trù (予算)': '¥1,500,000', 'Thực chi (実績)': '¥1,420,000', 'Chênh lệch (差異)': '-¥80,000', 'Trạng thái (ステータス)': '● Đạt ngân sách' },
            { 'Mục chi tiêu (費目)': 'Sự kiện Offline Triển lãm', 'Ngân sách dự trù (予算)': '¥2,000,000', 'Thực chi (実績)': '¥2,150,000', 'Chênh lệch (差異)': '+¥150,000', 'Trạng thái (ステータス)': '▲ Vượt định mức' },
          ],
        },
        japaneseFormattingRules: [
          'Chữ số luôn căn lề phải (Right-aligned) và dùng dấu phẩy ngăn cách hàng nghìn (1,000,000) kèm ký hiệu tiền tệ ¥.',
          'Số âm trong báo cáo tài chính Nhật thường được ghi kèm dấu trừ (-¥80,000) hoặc đóng mở ngoặc đơn △¥80,000.',
        ],
        quiz: {
          id: `qvw_inf_${Date.now()}`,
          question: 'Quy chuẩn căn lề trong bảng tính Excel/Sheets kiểu doanh nghiệp Nhật Bản quy định như thế nào?',
          options: [
            { id: 'a', text: 'Chữ (Text) căn lề trái, Số liệu tiền bạc (Numbers) căn lề phải, Trạng thái căn chính giữa.', isCorrect: true },
            { id: 'b', text: 'Tất cả mọi thứ đều căn giữa cho đẹp mắt.', isCorrect: false },
            { id: 'c', text: 'Số liệu căn lề trái, chữ căn lề phải.', isCorrect: false },
            { id: 'd', text: 'Không căn lề, để mặc định.', isCorrect: false },
          ],
          correctExplanation: 'Quy tắc vàng của Excel công sở: Chữ căn trái, số căn phải (để các hàng đơn vị gióng thẳng hàng dọc thuận mắt kiểm toán).',
          trapAnalysis: 'Căn giữa các con số tiền tệ khiến việc đọc các số có độ dài khác nhau trở nên cực kỳ rối mắt.',
          mnemonicTip: 'Chữ bên Tả (Trái), Số bên Hữu (Phải)!',
        },
      };
      setTasks((prev) => [...prev, fallbackTask]);
      setCurrentIndex(tasks.length);
      setActiveTab('sheets');
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
            <span>Trình giả lập Giao diện "Văn phòng ảo" (Virtual Workspace)</span>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded flex items-center gap-1">
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              <span>Outlook / Gmail & Excel / Sheets</span>
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Mô phỏng chân thực quy chuẩn soạn thảo email 【件名】 và bảng tính báo cáo tiến độ theo chuẩn mực nghiêm ngặt của văn phòng Nhật.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('outlook')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'outlook' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Giao diện Email</span>
            </button>
            <button
              onClick={() => setActiveTab('sheets')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'sheets' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Giao diện Sheets</span>
            </button>
          </div>

          <button
            onClick={handleLoadMoreInfinite}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            title="Tải nạp thêm nhiệm vụ văn phòng mới"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMore ? 'animate-spin' : ''}`} />
            <span>Nhiệm vụ mới ({tasks.length})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Simulated Workspace UI */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-semibold text-cyan-400">{currentItem.title}</span>
              <span className="text-slate-500 font-mono">Bài {currentIndex + 1} / {tasks.length}</span>
            </div>

            {/* Simulated Desktop Window */}
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl font-mono text-xs">
              {/* Window Title Bar */}
              <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-400 text-[11px] font-sans ml-2">
                    {activeTab === 'outlook' ? 'Outlook Business Web - Soạn thảo thư mới' : 'Google Sheets - WSR_Dashboard.xlsx'}
                  </span>
                </div>
              </div>

              {activeTab === 'outlook' ? (
                /* Simulated Email Compose Window */
                <div className="p-4 space-y-3 font-sans text-xs">
                  <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                    <span className="text-slate-500 w-16">Tới (To):</span>
                    <span className="text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                      {currentItem.mockWorkspaceData.recipient || 'yamada.director@tokyo-biz.co.jp'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                    <span className="text-slate-500 w-16">Tiêu đề:</span>
                    <span className="text-white font-bold font-jp">
                      {currentItem.mockWorkspaceData.subject || '【進捗報告】システム開発状況について'}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-3 bg-slate-900/60 rounded-lg min-h-[160px] text-slate-200 leading-relaxed font-jp whitespace-pre-line text-xs md:text-sm">
                    {currentItem.mockWorkspaceData.bodyContent || '山田常務\n\nお疲れ様です。開発部のグエンです。\n進捗状況をご報告いたします。'}
                  </div>

                  {/* Simulated Action buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Bold className="w-3.5 h-3.5 cursor-pointer hover:text-slate-300" />
                      <Italic className="w-3.5 h-3.5 cursor-pointer hover:text-slate-300" />
                      <Paperclip className="w-3.5 h-3.5 cursor-pointer hover:text-slate-300" />
                    </div>
                    <button className="px-4 py-1.5 bg-cyan-600 text-white rounded font-medium flex items-center gap-1.5 cursor-pointer">
                      <Send className="w-3 h-3" />
                      <span>Gửi đi</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Simulated Google Sheets / Excel Table */
                <div className="p-4 space-y-3 font-sans text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-slate-800 text-[11px] md:text-xs">
                    <thead>
                      <tr className="bg-slate-900 text-slate-300">
                        {currentItem.mockWorkspaceData.tableColumns?.map((col, idx) => (
                          <th key={idx} className="p-2.5 border border-slate-800 font-semibold font-jp">
                            {col}
                          </th>
                        )) || (
                          <>
                            <th className="p-2 border border-slate-800">Khoản mục</th>
                            <th className="p-2 border border-slate-800">Kế hoạch</th>
                            <th className="p-2 border border-slate-800">Thực tế</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-jp text-slate-200">
                      {currentItem.mockWorkspaceData.tableRows?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/40">
                          {Object.values(row).map((val, cIdx) => (
                            <td
                              key={cIdx}
                              className={`p-2.5 border border-slate-800/80 ${
                                val.includes('¥') ? 'text-right font-mono' : ''
                              }`}
                            >
                              {val}
                            </td>
                          ))}
                        </tr>
                      )) || (
                        <tr>
                          <td className="p-2 border border-slate-800">Dữ liệu dự án</td>
                          <td className="p-2 border border-slate-800 text-right">¥1,000,000</td>
                          <td className="p-2 border border-slate-800 text-right">¥980,000</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Japanese Formatting Rules */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-cyan-400" />
                <span>Quy chuẩn trình bày tài liệu văn phòng Nhật Bản:</span>
              </div>
              <div className="space-y-1.5">
                {currentItem.japaneseFormattingRules.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-cyan-400 font-mono">▸</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + tasks.length) % tasks.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              ← Nhiệm vụ trước
            </button>
            <span className="font-mono">{currentIndex + 1} / {tasks.length}</span>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % tasks.length)}
              className="hover:text-slate-200 cursor-pointer"
            >
              Nhiệm vụ tiếp theo →
            </button>
          </div>
        </div>

        {/* Right: Workspace Quiz */}
        <div className="lg:col-span-5">
          <QuizCard
            quiz={currentItem.quiz}
            title="Trắc nghiệm quy chuẩn tài liệu văn phòng"
            onNext={() => setCurrentIndex((prev) => (prev + 1) % tasks.length)}
          />
        </div>
      </div>
    </div>
  );
};
