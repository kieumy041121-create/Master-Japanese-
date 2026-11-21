import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Video,
  Sparkles,
  Volume2,
  Copy,
  Check,
  Printer,
  ShieldAlert,
  Eye,
  Mic,
  Plus,
  RefreshCw,
} from 'lucide-react';
import {
  RirekishoDraft,
  INTERVIEW_TRAP_QUESTIONS,
  InterviewTrapQuestion,
  EXTRA_CV_INDUSTRY_TEMPLATES,
  CvIndustryTemplate,
  buildRirekishoFromVietnamese,
  evaluateInterviewResponse,
  loadMoreCvIndustryTemplates,
  loadMoreInterviewTrapQuestions,
} from '../../services/wowWeaponsService';
import { speechService } from '../../services/speechService';

export const RirekishoInterviewLab: React.FC = () => {
  const [subMode, setSubMode] = useState<'rirekisho' | 'mensetsu'>('rirekisho');

  /* === PART A: JIS RIREKISHO BUILDER === */
  const [cvTemplates, setCvTemplates] = useState<CvIndustryTemplate[]>([
    {
      id: 'cv-default',
      label: 'Lập trình viên Web',
      fullName: 'NGUYEN VAN MINH',
      birthYear: '1998',
      targetCompany: 'BrSE / Kỹ sư Cầu nối IT tại Tokyo',
      experienceVi: '3 năm làm lập trình viên Web React/Node.js, phối hợp team 6 người giao dự án đúng hạn cho khách hàng.',
      strengthsVi: 'Chịu khó, cẩn thận chi tiết, biết báo cáo tiến độ sớm khi gặp rủi ro và ham học hỏi tiếng Nhật N2.',
    },
  ]);
  const [isLoadingMoreCvTemplates, setIsLoadingMoreCvTemplates] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('NGUYEN VAN MINH');
  const [birthYear, setBirthYear] = useState<string>('1998');
  const [targetCompany, setTargetCompany] = useState<string>('BrSE / Kỹ sư Cầu nối IT tại Tokyo');
  const [experienceVi, setExperienceVi] = useState<string>(
    '3 năm làm lập trình viên Web React/Node.js, phối hợp team 6 người giao dự án đúng hạn cho khách hàng.'
  );
  const [strengthsVi, setStrengthsVi] = useState<string>(
    'Chịu khó, cẩn thận chi tiết, biết báo cáo tiến độ sớm khi gặp rủi ro và ham học hỏi tiếng Nhật N2.'
  );
  const [isGeneratingCv, setIsGeneratingCv] = useState<boolean>(false);
  const [cvDraft, setCvDraft] = useState<RirekishoDraft | null>(null);
  const [copiedCv, setCopiedCv] = useState<boolean>(false);

  const handleGenerateRirekisho = async () => {
    setIsGeneratingCv(true);
    try {
      const draft = await buildRirekishoFromVietnamese({
        fullName,
        birthYear,
        targetCompany,
        experienceVi,
        strengthsVi,
      });
      setCvDraft(draft);
      speechService.playSuccessSound();
    } finally {
      setIsGeneratingCv(false);
    }
  };

  const handleCopyCv = () => {
    if (!cvDraft) return;
    const text = `【履歴書・職務経歴書】\n氏名: ${cvDraft.fullNameKanjiOrRomaji} (${cvDraft.fullNameKatakana})\n生年: ${cvDraft.eraBirthDate}\n志望職種: ${cvDraft.targetPositionJp}\n\n■ 志望動機\n${cvDraft.shibouDoukiJp}\n\n■ 自己PR\n${cvDraft.jikoPrJp}\n\n■ 主な実績\n${cvDraft.workHighlightsJp.join('\n')}`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedCv(true);
    setTimeout(() => setCopiedCv(false), 2000);
  };

  /* === PART B: ASSHUKU MENSETSU (HARDCORE INTERVIEW ROOM) === */
  const [trapQuestions, setTrapQuestions] = useState<InterviewTrapQuestion[]>(INTERVIEW_TRAP_QUESTIONS);
  const [isLoadingMoreQuestions, setIsLoadingMoreQuestions] = useState<boolean>(false);
  const [qIdx, setQIdx] = useState<number>(0);
  const [candidateAnswer, setCandidateAnswer] = useState<string>('');
  const [isEvaluatingAns, setIsEvaluatingAns] = useState<boolean>(false);
  const [interviewEval, setInterviewEval] = useState<{
    hrPassProbability: number;
    honneVerdictVi: string;
    tatemaeFeedbackJp: string;
    polishedAnswerJp: string;
    polishedAnswerVi: string;
  } | null>(null);

  const [camActive, setCamActive] = useState<boolean>(false);
  const [camNote, setCamNote] = useState<string | null>(null);
  const [eyeContactScore, setEyeContactScore] = useState<number>(84);
  const [lightingOk, setLightingOk] = useState<boolean>(true);
  const [postureStable, setPostureStable] = useState<boolean>(true);

  const camVideoRef = useRef<HTMLVideoElement | null>(null);
  const camStreamRef = useRef<MediaStream | null>(null);
  const camMonitorRef = useRef<number | null>(null);

  const activeQ = trapQuestions[qIdx] || trapQuestions[0];

  const handleLoadMoreCvTemplates = async () => {
    if (isLoadingMoreCvTemplates) return;
    setIsLoadingMoreCvTemplates(true);
    try {
      const more = await loadMoreCvIndustryTemplates(cvTemplates.map((t) => t.id));
      if (more.length > 0) {
        setCvTemplates((prev) => [...prev, ...more]);
        const picked = more[0];
        setFullName(picked.fullName);
        setBirthYear(picked.birthYear);
        setTargetCompany(picked.targetCompany);
        setExperienceVi(picked.experienceVi);
        setStrengthsVi(picked.strengthsVi);
      }
    } finally {
      setIsLoadingMoreCvTemplates(false);
    }
  };

  const handleLoadMoreQuestions = async () => {
    if (isLoadingMoreQuestions) return;
    setIsLoadingMoreQuestions(true);
    try {
      const more = await loadMoreInterviewTrapQuestions(trapQuestions.map((q) => q.id));
      if (more.length > 0) {
        const nextIdx = trapQuestions.length;
        setTrapQuestions((prev) => [...prev, ...more]);
        setQIdx(nextIdx);
        setInterviewEval(null);
      }
    } finally {
      setIsLoadingMoreQuestions(false);
    }
  };

  useEffect(() => {
    return () => {
      if (camMonitorRef.current) window.clearInterval(camMonitorRef.current);
      if (camStreamRef.current) camStreamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const stopInterviewCam = () => {
    if (camMonitorRef.current) window.clearInterval(camMonitorRef.current);
    if (camStreamRef.current) {
      camStreamRef.current.getTracks().forEach((t) => t.stop());
      camStreamRef.current = null;
    }
    setCamActive(false);
  };

  const startInterviewCam = async () => {
    setCamNote(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCamNote('Trình duyệt không hỗ trợ Webcam. Chế độ chấm nội dung phỏng vấn vẫn hoạt động đầy đủ.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      camStreamRef.current = stream;
      setCamActive(true);
      setTimeout(() => {
        if (!camVideoRef.current) return;
        camVideoRef.current.srcObject = stream;
        camVideoRef.current.play().catch(() => {});

        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 48;
        const ctx = c.getContext('2d');
        let prevCenter = 32;

        camMonitorRef.current = window.setInterval(() => {
          if (!camVideoRef.current || !ctx || camVideoRef.current.readyState < 2) return;
          ctx.drawImage(camVideoRef.current, 0, 0, 64, 48);
          const data = ctx.getImageData(0, 0, 64, 48).data;
          let sumLuma = 0;
          let xWeighted = 0;
          let weightSum = 0;
          for (let y = 8; y < 40; y++) {
            for (let x = 12; x < 52; x++) {
              const idx = (y * 64 + x) * 4;
              const luma = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
              sumLuma += luma;
              const w = Math.max(1, 220 - Math.abs(luma - 135));
              weightSum += w;
              xWeighted += x * w;
            }
          }
          const avgLuma = sumLuma / (32 * 40);
          const centerX = weightSum > 0 ? xWeighted / weightSum : 32;
          const motionDelta = Math.abs(centerX - prevCenter);
          prevCenter = centerX;

          setLightingOk(avgLuma > 55);
          setPostureStable(motionDelta < 2.2);
          const centerOffset = Math.abs(centerX - 32);
          setEyeContactScore(Math.max(55, Math.min(98, Math.round(96 - centerOffset * 2.5 - motionDelta * 4))));
        }, 500);
      }, 80);
    } catch {
      setCamNote('Chưa được cấp quyền Camera. Bạn vẫn có thể gõ hoặc dùng giọng nói trả lời câu hỏi bẫy HR!');
    }
  };

  const handleEvaluateInterview = async () => {
    if (!candidateAnswer.trim()) return;
    setIsEvaluatingAns(true);
    try {
      const res = await evaluateInterviewResponse(activeQ, candidateAnswer, {
        eyeContactScore,
        lightingOk,
        postureStable,
      });
      setInterviewEval(res);
      speechService.speak(res.tatemaeFeedbackJp);
    } finally {
      setIsEvaluatingAns(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-rose-400">
            VŨ KHÍ 05 · KIẾN TẠO HỒ SƠ JIS RIREKISHO &amp; PHỎNG VẤN KHỐC LIỆT (ASSHUKU MENSETSU)
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Chuyển Hóa Kinh Nghiệm Việt Sang Văn Phong Nhân Sự Tokyo &amp; Phá Bẫy HR
          </h3>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSubMode('rirekisho')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer border whitespace-nowrap ${
              subMode === 'rirekisho'
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-slate-900 text-slate-300 border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Kiến tạo CV Rirekisho JIS</span>
          </button>

          <button
            onClick={() => setSubMode('mensetsu')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer border whitespace-nowrap ${
              subMode === 'mensetsu'
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-slate-900 text-slate-300 border-slate-800'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Phòng Phỏng Vấn Khốc Liệt</span>
          </button>
        </div>
      </div>

      {/* === MODE A: JIS RIREKISHO & SHOKUMUKEIREKISHO === */}
      {subMode === 'rirekisho' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 5 cols: Vietnamese Rough Input */}
          <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-bold text-rose-300">
                Nhập thông tin thô tiếng Việt (AI chuẩn hóa J1+):
              </div>
              <button
                onClick={handleLoadMoreCvTemplates}
                disabled={isLoadingMoreCvTemplates}
                className="px-2.5 py-1 rounded-md bg-rose-950/60 hover:bg-rose-900/60 disabled:opacity-50 text-rose-300 border border-rose-500/40 text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                {isLoadingMoreCvTemplates ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                <span>Tải thêm 3 mẫu ngành</span>
              </button>
            </div>

            {cvTemplates.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {cvTemplates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => {
                      setFullName(tpl.fullName);
                      setBirthYear(tpl.birthYear);
                      setTargetCompany(tpl.targetCompany);
                      setExperienceVi(tpl.experienceVi);
                      setStrengthsVi(tpl.strengthsVi);
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[11px] text-slate-200 cursor-pointer"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Họ và Tên</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Năm sinh (Quy đổi Niên hiệu)</label>
                <input
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Vị trí / Doanh nghiệp mục tiêu</label>
              <input
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Kinh nghiệm &amp; Thành tựu (tiếng Việt thô)</label>
              <textarea
                rows={3}
                value={experienceVi}
                onChange={(e) => setExperienceVi(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Điểm mạnh &amp; Tư duy nghề nghiệp</label>
              <textarea
                rows={2}
                value={strengthsVi}
                onChange={(e) => setStrengthsVi(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              onClick={handleGenerateRirekisho}
              disabled={isGeneratingCv}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGeneratingCv ? 'Đang kiến tạo Rirekisho chuẩn Nhật...' : 'Kiến Tạo Rirekisho & Shibou Douki Chuẩn JIS'}</span>
            </button>
          </div>

          {/* Right 7 cols: Authentic JIS Rirekisho Sheet Output */}
          <div className="lg:col-span-7">
            {cvDraft ? (
              <div className="p-5 rounded-2xl bg-[#f8fafc] text-slate-900 border border-slate-300 shadow-2xl space-y-4">
                <div className="flex items-start justify-between border-b-2 border-slate-800 pb-3">
                  <div>
                    <h4 className="text-lg font-extrabold font-jp tracking-widest">履 歴 書 (RIREKISHO JIS)</h4>
                    <div className="text-xs text-slate-600 font-jp mt-0.5">
                      フリガナ: {cvDraft.fullNameKatakana} · {cvDraft.eraBirthDate}
                    </div>
                    <div className="text-base font-bold mt-1">{cvDraft.fullNameKanjiOrRomaji}</div>
                  </div>
                  <div className="flex items-center gap-2 no-print">
                    <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold font-mono tabular-nums">
                      HR Pass: {cvDraft.hrScorePrediction}%
                    </span>
                    <button
                      onClick={handleCopyCv}
                      className="px-2.5 py-1.5 rounded bg-slate-800 text-white text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCv ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCv ? 'Đã chép' : 'Chép'}</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-2.5 py-1.5 rounded bg-indigo-600 text-white text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>In PDF</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-300 bg-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-jp text-slate-700">志望動機 (Động cơ ứng tuyển)</span>
                    <button
                      onClick={() => speechService.speak(cvDraft.shibouDoukiJp)}
                      className="text-xs text-indigo-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe
                    </button>
                  </div>
                  <p className="text-sm font-jp leading-relaxed text-slate-900">{cvDraft.shibouDoukiJp}</p>
                  <p className="text-xs text-slate-600 italic">{cvDraft.shibouDoukiVi}</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-300 bg-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-jp text-slate-700">自己PR (Tự giới thiệu thế mạnh)</span>
                    <button
                      onClick={() => speechService.speak(cvDraft.jikoPrJp)}
                      className="text-xs text-indigo-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe
                    </button>
                  </div>
                  <p className="text-sm font-jp leading-relaxed text-slate-900">{cvDraft.jikoPrJp}</p>
                  <p className="text-xs text-slate-600 italic">{cvDraft.jikoPrVi}</p>
                </div>

                <div className="p-3 rounded-lg border border-indigo-200 bg-indigo-50 text-xs text-indigo-950 space-y-1">
                  <div className="font-bold">Ghi chú tối ưu hóa cho HR Nhật Bản:</div>
                  {cvDraft.hrOptimizationNotes.map((n, i) => (
                    <div key={i}>• {n}</div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[380px] rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 flex flex-col items-center justify-center p-8 text-center space-y-2">
                <FileText className="w-10 h-10 text-slate-500" />
                <div className="text-sm font-bold text-slate-200">
                  Bảng xem trước Rirekisho (履歴書) chuẩn Nhật
                </div>
                <p className="text-xs text-slate-400 max-w-md">
                  Điền thông tin tiếng Việt ở cột trái rồi nhấn &ldquo;Kiến Tạo Rirekisho&rdquo;. Hệ thống tự động quy đổi niên hiệu Nhật, viết Động cơ ứng tuyển (Shibou Douki) và Tự PR lồng từ khóa Kaizen · Hourensou.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* === MODE B: HARDCORE ASSHUKU MENSETSU ROOM === */}
      {subMode === 'mensetsu' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 5 cols: Candidate Webcam Confidence & Eye Contact Monitor */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-rose-400" />
                  <span>Gương Thần Thái &amp; Giao Tiếp Mắt HR</span>
                </span>
                <button
                  onClick={camActive ? stopInterviewCam : startInterviewCam}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                    camActive ? 'bg-rose-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {camActive ? 'Tắt Camera' : 'Bật Camera Chấm Phong Thái'}
                </button>
              </div>

              {camNote && (
                <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-700/50 text-[11px] text-amber-200">
                  {camNote}
                </div>
              )}

              <div className="relative h-56 w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                {camActive ? (
                  <video
                    ref={camVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                ) : (
                  <div className="text-center px-6 space-y-1.5">
                    <Video className="w-8 h-8 text-slate-600 mx-auto" />
                    <div className="text-xs text-slate-400">
                      Bật Camera để AI đo độ ổn định tư thế, ánh sáng khuôn mặt và điểm giao tiếp mắt với Hội đồng Nhật Bản.
                    </div>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 bg-slate-950/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] font-mono tabular-nums">
                  <span className="text-emerald-300">Ánh nhìn: {eyeContactScore}%</span>
                  <span className={lightingOk ? 'text-cyan-300' : 'text-amber-300'}>
                    Ánh sáng: {lightingOk ? 'Rõ' : 'Hơi tối'}
                  </span>
                  <span className={postureStable ? 'text-emerald-300' : 'text-rose-300'}>
                    Tư thế: {postureStable ? 'Vững' : 'Hơi lắc'}
                  </span>
                </div>
              </div>
            </div>

            {/* Psychological Trap Cheat-Card */}
            <div className="p-4 rounded-2xl bg-rose-950/25 border border-rose-700/40 space-y-2 text-xs">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Giải mã Bẫy Tâm Lý câu hỏi này:</span>
              </div>
              <p className="text-slate-200 leading-relaxed">{activeQ.psychologicalTrap}</p>
              <div className="pt-2 border-t border-rose-800/40 text-emerald-200">
                <span className="font-bold">Chiến thuật phá bẫy: </span>
                {activeQ.winningStrategyVi}
              </div>
            </div>
          </div>

          {/* Right 7 cols: Trap Question Selector + Answer Evaluator */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {trapQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setQIdx(idx);
                    setInterviewEval(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border whitespace-nowrap ${
                    qIdx === idx
                      ? 'bg-rose-600 text-white border-rose-500'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  Câu bẫy #{idx + 1}
                </button>
              ))}
              <button
                onClick={handleLoadMoreQuestions}
                disabled={isLoadingMoreQuestions}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-950/60 hover:bg-rose-900/60 disabled:opacity-50 text-rose-300 border border-rose-500/40 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                {isLoadingMoreQuestions ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                <span>Tải thêm 3 câu bẫy HR</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[11px] font-mono text-rose-400">HỘI ĐỒNG GIÁM KHẢO NHẬT BẢN HỎI:</div>
                  <div className="text-lg font-bold text-white font-jp mt-1">{activeQ.hrQuestionJp}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{activeQ.hrQuestionRomaji}</div>
                  <div className="text-xs text-amber-200 mt-1">{activeQ.hrQuestionVi}</div>
                </div>
                <button
                  onClick={() => speechService.speak(activeQ.hrQuestionJp)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 cursor-pointer shrink-0"
                  title="Nghe giám khảo hỏi"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <textarea
                rows={3}
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder="Nhập câu trả lời phỏng vấn của bạn (bằng tiếng Nhật hoặc tiếng Việt để AI soi lỗi & nâng cấp)..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => setCandidateAnswer(activeQ.sampleStarAnswerJp)}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Điền mẫu trả lời chuẩn STAR</span>
                </button>

                <button
                  onClick={handleEvaluateInterview}
                  disabled={!candidateAnswer.trim() || isEvaluatingAns}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isEvaluatingAns ? 'Hội đồng đang chấm...' : 'Nộp câu trả lời cho Hội đồng HR'}</span>
                </button>
              </div>
            </div>

            {interviewEval && (
              <div className="p-4 rounded-2xl bg-slate-900/95 border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300">KẾT QUẢ THẨM ĐỊNH HỘI ĐỒNG NHẬT</span>
                  <span className="font-mono text-sm font-bold text-white tabular-nums">
                    Tỷ lệ đậu: {interviewEval.hrPassProbability}%
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{interviewEval.honneVerdictVi}</p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-300">Phiên bản nâng cấp chuẩn N1 (J1+):</span>
                    <button
                      onClick={() => speechService.speak(interviewEval.polishedAnswerJp)}
                      className="text-xs text-indigo-300 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe
                    </button>
                  </div>
                  <div className="text-sm font-jp text-white leading-relaxed">{interviewEval.polishedAnswerJp}</div>
                  <div className="text-xs text-slate-400">{interviewEval.polishedAnswerVi}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
