import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  Users,
  Camera,
  CheckCircle2,
  XCircle,
  Volume2,
  Compass,
  RotateCcw,
  Plus,
  RefreshCw,
} from 'lucide-react';
import {
  KONBINI_ORDERS,
  KonbiniCustomerOrder,
  SEATING_SCENARIOS,
  SeatingScenario,
  OJIGI_PRACTICE_SCENARIOS,
  OjigiPracticeScenario,
  evaluateOjigiAngle,
  loadMoreKonbiniOrders,
  loadMoreSeatingScenarios,
  loadMoreOjigiScenarios,
} from '../../services/wowWeaponsService';
import { speechService } from '../../services/speechService';

type BaitoSubTab = 'konbini_pos' | 'kamiza_3d' | 'webcam_ojigi';

export const BaitoVrCultureLab: React.FC = () => {
  const [subTab, setSubTab] = useState<BaitoSubTab>('konbini_pos');

  /* --- MODULE A: KONBINI POS STATE --- */
  const [orders, setOrders] = useState<KonbiniCustomerOrder[]>(KONBINI_ORDERS);
  const [isLoadingMoreOrders, setIsLoadingMoreOrders] = useState<boolean>(false);
  const [orderIdx, setOrderIdx] = useState<number>(0);
  const [selectedAgeBtn, setSelectedAgeBtn] = useState<string | null>(null);
  const [posStepIdx, setPosStepIdx] = useState<number>(0);
  const [posLog, setPosLog] = useState<string[]>([
    'Khách bước vào quầy thu ngân! Trước hết hãy nhìn ngoại hình khách và bấm nút phân loại Nhóm Tuổi (客層ボタン) trên máy POS.',
  ]);
  const [posScore, setPosScore] = useState<number>(100);
  const [posCompleted, setPosCompleted] = useState<boolean>(false);

  const activeOrder = orders[orderIdx] || orders[0];
  const ageButtons = ['男·10代', '男·20代', '男·50代', '女·10代', '女·30代', '女·50代'];
  const totalYen = activeOrder.items.reduce((s, item) => s + item.price, 0);

  const activeStep = activeOrder.requiredKeigoSteps[posStepIdx];

  const shuffledStepOptions = useMemo(() => {
    if (!activeStep) return [];
    const list = [
      { text: activeStep.correctPhraseJp, isCorrect: true },
      ...activeStep.distractorPhrasesJp.map((d) => ({ text: d, isCorrect: false })),
    ];
    // Deterministic order flip based on step index + orderIdx so user still reads carefully
    return (posStepIdx + orderIdx) % 2 === 0 ? list : [list[1], list[0], list[2]].filter(Boolean);
  }, [activeStep, posStepIdx, orderIdx]);

  const handleSelectAgeBracket = (btn: string) => {
    setSelectedAgeBtn(btn);
    if (btn === activeOrder.ageGroupCode) {
      speechService.playSuccessSound();
      setPosLog((prev) => [
        ...prev,
        `Chuẩn POS (${btn})! Bây giờ hãy chọn câu Baito-keigo đúng cho Bước 1.`,
      ]);
    } else {
      speechService.playErrorSound();
      setPosScore((s) => Math.max(0, s - 10));
      setPosLog((prev) => [
        ...prev,
        `Lệch nhóm tuổi! Khách này thuộc nhóm ${activeOrder.ageGroupCode} (bấm sai bị trừ 10đ thống kê cửa hàng).`,
      ]);
    }
  };

  const handleSelectKeigoOption = (phrase: string, isCorrect: boolean) => {
    speechService.speak(phrase);
    if (isCorrect) {
      speechService.playSuccessSound();
      if (posStepIdx < activeOrder.requiredKeigoSteps.length - 1) {
        const nextIdx = posStepIdx + 1;
        setPosStepIdx(nextIdx);
        setPosLog((prev) => [...prev, `Khách hài lòng gật đầu! Chuyển sang bước ${nextIdx + 1}.`]);
      } else {
        setPosCompleted(true);
        setPosLog((prev) => [
          ...prev,
          `HOÀN TẤT ĐƠN HÀNG! Khách nói: "${activeOrder.customerDialogueJp}" và ra về vui vẻ.`,
        ]);
      }
    } else {
      speechService.playErrorSound();
      setPosScore((s) => Math.max(0, s - 15));
      setPosLog((prev) => [
        ...prev,
        `Sai Baito-Keigo! Câu "${phrase}" bị coi là nói trống không hoặc sai kính ngữ thu ngân Nhật.`,
      ]);
    }
  };

  const handleSwitchKonbiniOrder = (nextIdx: number) => {
    setOrderIdx(nextIdx);
    setSelectedAgeBtn(null);
    setPosStepIdx(0);
    setPosScore(100);
    setPosCompleted(false);
    setPosLog(['Ca trực mới bắt đầu! Hãy kiểm tra khách và bấm nút phân loại tuổi (客層) trên màn hình POS.']);
  };

  const handleLoadMoreOrders = async () => {
    if (isLoadingMoreOrders) return;
    setIsLoadingMoreOrders(true);
    try {
      const more = await loadMoreKonbiniOrders(orders.map((o) => o.id));
      if (more.length > 0) {
        const nextIdx = orders.length;
        setOrders((prev) => [...prev, ...more]);
        setOrderIdx(nextIdx);
        setSelectedAgeBtn(null);
        setPosStepIdx(0);
        setPosScore(100);
        setPosCompleted(false);
        setPosLog(['Đã nạp thêm 3 vị khách mới! Hãy kiểm tra khách và bấm nút phân loại tuổi trên màn hình POS.']);
      }
    } finally {
      setIsLoadingMoreOrders(false);
    }
  };

  /* --- MODULE B: KAMIZA / SHIMOZA 3D SEATING STATE --- */
  const [seatingScenarios, setSeatingScenarios] = useState<SeatingScenario[]>(SEATING_SCENARIOS);
  const [isLoadingMoreSeating, setIsLoadingMoreSeating] = useState<boolean>(false);
  const [seatingIdx, setSeatingIdx] = useState<number>(0);
  const [roleToAssign, setRoleToAssign] = useState<'vip' | 'me_junior'>('vip');
  const [assignedSeats, setAssignedSeats] = useState<Record<string, 'vip' | 'me_junior'>>({});
  const [seatFeedback, setSeatFeedback] = useState<string>(
    'Chọn vai trò "Khách VIP" hoặc "Bạn (Nhân viên mới)" rồi nhấp vào từng ghế trên bản đồ 3D bên trái.'
  );

  const activeSeating = seatingScenarios[seatingIdx] || seatingScenarios[0];

  const handleLoadMoreSeating = async () => {
    if (isLoadingMoreSeating) return;
    setIsLoadingMoreSeating(true);
    try {
      const more = await loadMoreSeatingScenarios(seatingScenarios.map((s) => s.id));
      if (more.length > 0) {
        const nextIdx = seatingScenarios.length;
        setSeatingScenarios((prev) => [...prev, ...more]);
        setSeatingIdx(nextIdx);
        setAssignedSeats({});
      }
    } finally {
      setIsLoadingMoreSeating(false);
    }
  };

  const handleSeatClick = (slotId: string) => {
    const slot = activeSeating.slots.find((s) => s.id === slotId);
    if (!slot) return;
    setAssignedSeats((prev) => ({ ...prev, [slotId]: roleToAssign }));

    const isRight = slot.correctRole === roleToAssign;
    if (isRight) {
      speechService.playSuccessSound();
      setSeatFeedback(`CHÍNH XÁC (${slot.label}): ${slot.explanation}`);
    } else {
      speechService.playErrorSound();
      setSeatFeedback(`CẨN THẬN LỖI THẤT LỄ (${slot.label}): ${slot.explanation}`);
    }
  };

  /* --- MODULE C: LIVE WEBCAM OJIGI BOW ANGLE GRADER --- */
  const [ojigiScenarios, setOjigiScenarios] = useState<OjigiPracticeScenario[]>(OJIGI_PRACTICE_SCENARIOS);
  const [selectedOjigiScenarioId, setSelectedOjigiScenarioId] = useState<string>(OJIGI_PRACTICE_SCENARIOS[0].id);
  const [isLoadingMoreOjigi, setIsLoadingMoreOjigi] = useState<boolean>(false);
  const [targetBow, setTargetBow] = useState<'eshaku_15' | 'keirei_30' | 'saikeirei_45'>('keirei_30');

  const handleLoadMoreOjigi = async () => {
    if (isLoadingMoreOjigi) return;
    setIsLoadingMoreOjigi(true);
    try {
      const more = await loadMoreOjigiScenarios(ojigiScenarios.map((o) => o.id));
      if (more.length > 0) {
        setOjigiScenarios((prev) => [...prev, ...more]);
        setSelectedOjigiScenarioId(more[0].id);
        setTargetBow(more[0].targetType);
      }
    } finally {
      setIsLoadingMoreOjigi(false);
    }
  };
  const [bowAngleDeg, setBowAngleDeg] = useState<number>(30);
  const [webcamOn, setWebcamOn] = useState<boolean>(false);
  const [webcamMsg, setWebcamMsg] = useState<string | null>(null);
  const [baselineTorsoY, setBaselineTorsoY] = useState<number | null>(null);
  const ojigiVideoRef = useRef<HTMLVideoElement | null>(null);
  const ojigiStreamRef = useRef<MediaStream | null>(null);
  const ojigiTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (ojigiTimerRef.current) window.clearInterval(ojigiTimerRef.current);
      if (ojigiStreamRef.current) {
        ojigiStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const stopOjigiCam = () => {
    if (ojigiTimerRef.current) window.clearInterval(ojigiTimerRef.current);
    if (ojigiStreamRef.current) {
      ojigiStreamRef.current.getTracks().forEach((t) => t.stop());
      ojigiStreamRef.current = null;
    }
    setWebcamOn(false);
  };

  const startOjigiCam = async () => {
    setWebcamMsg(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setWebcamMsg('Trình duyệt không hỗ trợ Webcam. Hãy dùng thước đo độ nghiêng mô phỏng 3D bên dưới.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      ojigiStreamRef.current = stream;
      setWebcamOn(true);

      setTimeout(() => {
        if (!ojigiVideoRef.current) return;
        ojigiVideoRef.current.srcObject = stream;
        ojigiVideoRef.current.play().catch(() => {});

        // Brightness-weighted vertical head/torso center tracker on real webcam frames
        const probeCanvas = document.createElement('canvas');
        probeCanvas.width = 96;
        probeCanvas.height = 72;
        const pCtx = probeCanvas.getContext('2d');
        let localBaseline: number | null = null;

        ojigiTimerRef.current = window.setInterval(() => {
          if (!ojigiVideoRef.current || !pCtx || ojigiVideoRef.current.readyState < 2) return;
          pCtx.drawImage(ojigiVideoRef.current, 0, 0, 96, 72);
          const frame = pCtx.getImageData(0, 0, 96, 72).data;

          // Compute upper-center brightness/mass Y coordinate in central strip
          let weightSum = 0;
          let yWeighted = 0;
          for (let y = 6; y < 66; y++) {
            for (let x = 28; x < 68; x++) {
              const i = (y * 96 + x) * 4;
              const luma = (frame[i] + frame[i + 1] + frame[i + 2]) / 3;
              // Darker hair/head/shirt silhouette difference weighted gently
              const mass = Math.max(1, 255 - luma);
              weightSum += mass;
              yWeighted += y * mass;
            }
          }
          const centerY = weightSum > 0 ? yWeighted / weightSum : 32;
          if (localBaseline === null) {
            localBaseline = centerY;
            setBaselineTorsoY(centerY);
          }
          // Vertical drop downward when bowing forward correlates smoothly to 0°–55°
          const drop = Math.max(0, centerY - localBaseline);
          const estimatedDeg = Math.min(55, Math.max(0, Math.round(drop * 3.8)));
          setBowAngleDeg(estimatedDeg);
        }, 180);
      }, 80);
    } catch {
      setWebcamMsg('Không có quyền Webcam. Bạn vẫn có thể kéo thước đo góc cúi chào thực tế 0°–55° để luyện tập chuẩn xác.');
    }
  };

  const bowEval = evaluateOjigiAngle(bowAngleDeg, targetBow);

  return (
    <div className="space-y-4">
      {/* Header + 3 Sub-Module Switchers */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-cyan-400">
            VŨ KHÍ 04 · TRẠM HUẤN LUYỆN SINH TỒN BAITO &amp; VĂN HÓA 3D
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Máy Tính Tiền Konbini POS, Bản Đồ Thượng Tọa Kamiza &amp; Cảm Biến Cúi Chào Ojigi
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSubTab('konbini_pos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer border whitespace-nowrap ${
              subTab === 'konbini_pos'
                ? 'bg-cyan-600 text-white border-cyan-500'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Thu ngân Konbini POS</span>
          </button>

          <button
            onClick={() => setSubTab('kamiza_3d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer border whitespace-nowrap ${
              subTab === 'kamiza_3d'
                ? 'bg-cyan-600 text-white border-cyan-500'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Thượng Tọa 3D (Kamiza)</span>
          </button>

          <button
            onClick={() => setSubTab('webcam_ojigi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer border whitespace-nowrap ${
              subTab === 'webcam_ojigi'
                ? 'bg-cyan-600 text-white border-cyan-500'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Đo góc Cúi chào Ojigi</span>
          </button>
        </div>
      </div>

      {/* === SUB-TAB 1: KONBINI POS SIMULATOR === */}
      {subTab === 'konbini_pos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 6 cols: Authentic POS Register Terminal */}
          <div className="lg:col-span-6 p-4 rounded-2xl bg-[#0a101d] border border-slate-700 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-[11px] font-mono text-emerald-400">KOTOBA-MART · MÀN HÌNH POS TỰ ĐỘNG</div>
                <div className="text-sm font-bold text-white">{activeOrder.customerLabel}</div>
                <div className="text-xs text-slate-400">{activeOrder.customerMood}</div>
              </div>
              <div className="text-right font-mono tabular-nums">
                <div className="text-[10px] text-slate-400">Điểm Baito</div>
                <div className="text-lg font-bold text-emerald-400">{posScore}/100</div>
              </div>
            </div>

            {/* Scanned Receipt Screen */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-500 border-b border-slate-800 pb-1">
                <span>MẶT HÀNG QUÉT MÃ VẠCH</span>
                <span>ĐƠN GIÁ</span>
              </div>
              {activeOrder.items.map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-2 text-slate-200">
                  <div>
                    <div className="font-jp font-bold">{item.nameJp}</div>
                    <div className="text-[11px] text-slate-400 font-sans">
                      {item.nameVi}
                      {item.needsWarming && ' · [CẦN HỎI HÂM NÓNG]'}
                      {item.isAgeRestricted && ' · [CẦN XÁC NHẬN >=20 TUỔI]'}
                    </div>
                  </div>
                  <span className="tabular-nums font-bold text-amber-300">¥{item.price}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white tabular-nums">
                <span>TỔNG CỘNG ({activeOrder.paymentMethod})</span>
                <span className="text-emerald-400">¥{totalYen}</span>
              </div>
            </div>

            {/* POS Customer Age-Bracket Keypad (客層キー) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-300">
                Bước POS Bắt Buộc: Chạm nút Phân Loại Khách (客層ボタン) trước khi tính tiền
              </div>
              <div className="grid grid-cols-3 gap-2">
                {ageButtons.map((btn) => {
                  const isPicked = selectedAgeBtn === btn;
                  const isRight = btn === activeOrder.ageGroupCode;
                  return (
                    <button
                      key={btn}
                      onClick={() => handleSelectAgeBracket(btn)}
                      className={`py-2 px-2 rounded-lg text-xs font-jp font-bold border cursor-pointer transition-all ${
                        isPicked
                          ? isRight
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-rose-600 text-white border-rose-400'
                          : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-cyan-500'
                      }`}
                    >
                      {btn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Switch Customer Order */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
              <div className="flex flex-wrap gap-1.5">
                {orders.map((o, i) => (
                  <button
                    key={o.id}
                    onClick={() => handleSwitchKonbiniOrder(i)}
                    className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer border ${
                      orderIdx === i
                        ? 'bg-cyan-600 text-white border-cyan-500'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    Khách #{i + 1}
                  </button>
                ))}
                <button
                  onClick={handleLoadMoreOrders}
                  disabled={isLoadingMoreOrders}
                  className="px-2.5 py-1 rounded text-xs font-bold bg-cyan-950/60 hover:bg-cyan-900/60 disabled:opacity-50 text-cyan-300 border border-cyan-500/40 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  {isLoadingMoreOrders ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                  <span>Tải thêm 3 khách</span>
                </button>
              </div>
              <button
                onClick={() => handleSwitchKonbiniOrder(orderIdx)}
                className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Chơi lại ca này</span>
              </button>
            </div>
          </div>

          {/* Right 6 cols: Interactive Baito-Keigo Dialogue */}
          <div className="lg:col-span-6 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300">
                  PHẢN XẠ BAITO-KEIGO ({posCompleted ? 'HOÀN THÀNH' : `BƯỚC ${posStepIdx + 1}/${activeOrder.requiredKeigoSteps.length}`})
                </span>
                <button
                  onClick={() => speechService.speak(activeOrder.customerDialogueJp)}
                  className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Nghe yêu cầu khách</span>
                </button>
              </div>

              {!posCompleted && activeStep ? (
                <div className="space-y-2.5">
                  <div className="text-sm font-bold text-white">{activeStep.promptVi}</div>
                  <div className="space-y-2">
                    {shuffledStepOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectKeigoOption(opt.text, opt.isCorrect)}
                        className="w-full text-left p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/60 transition-all cursor-pointer font-jp text-sm text-slate-100"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Xuất sắc! Bạn đã xử lý trọn vẹn quy trình thu ngân Konbini Nhật Bản.</span>
                  </div>
                  <p className="text-xs text-slate-300 font-jp">Khách: &ldquo;{activeOrder.customerDialogueJp}&rdquo;</p>
                </div>
              )}
            </div>

            {/* Live POS Feedback Log */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-300">Nhật ký Quản lý Cửa hàng (Tenchou Monitor):</div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto scrollbar-thin">
                {posLog.map((entry, i) => (
                  <div key={i} className="text-xs text-slate-300 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === SUB-TAB 2: 3D KAMIZA / SHIMOZA SEATING MAP === */}
      {subTab === 'kamiza_3d' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 cols: Perspective 3D Seating Blueprint */}
          <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {seatingScenarios.map((sc, i) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSeatingIdx(i);
                      setAssignedSeats({});
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                      seatingIdx === i
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-950 text-slate-300 border-slate-800'
                    }`}
                  >
                    {sc.title}
                  </button>
                ))}
                <button
                  onClick={handleLoadMoreSeating}
                  disabled={isLoadingMoreSeating}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-950/60 hover:bg-indigo-900/60 disabled:opacity-50 text-indigo-300 border border-indigo-500/40 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  {isLoadingMoreSeating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>Tải thêm 3 phòng 3D</span>
                </button>
              </div>
              <span className="text-[11px] text-amber-300 font-mono">{activeSeating.landmarkHint}</span>
            </div>

            {/* Interactive 3D Room Canvas */}
            <div className="relative h-80 w-full rounded-2xl bg-gradient-to-b from-slate-950 via-[#0e1729] to-slate-950 border border-slate-800 overflow-hidden perspective-1000">
              {/* Architectural Desk / Car Outline */}
              <div
                className="absolute inset-x-16 top-16 bottom-16 rounded-2xl border-2 border-indigo-500/30 bg-indigo-950/20 flex items-center justify-center"
                style={{ transform: 'rotateX(18deg)' }}
              >
                <span className="text-xs font-mono text-indigo-300/60">
                  {activeSeating.id === 'boardroom' ? 'BÀN HỌP CHÍNH · ĐỐI TÁC & CHỦ NHÀ' : 'KHOANG XE TAXI (TAY LÁI PHẢI)'}
                </span>
              </div>

              {/* Door Indicator */}
              <div className="absolute bottom-2 right-4 px-2.5 py-1 rounded bg-rose-950/70 border border-rose-500/40 text-[10px] font-mono text-rose-300">
                {activeSeating.id === 'boardroom' ? 'CỬA RA VÀO (Shimoza)' : 'VỊ TRÍ LÁI XE (Trên-Phải)'}
              </div>

              {/* Clickable Seat Hotspots */}
              {activeSeating.slots.map((slot) => {
                const picked = assignedSeats[slot.id];
                const isCorrect = picked && picked === slot.correctRole;
                return (
                  <button
                    key={slot.id}
                    onClick={() => handleSeatClick(slot.id)}
                    style={{ left: `${slot.xPercent}%`, top: `${slot.yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-lg ${
                      picked
                        ? isCorrect
                          ? 'bg-emerald-600 text-white border-emerald-300'
                          : 'bg-rose-600 text-white border-rose-300'
                        : 'bg-slate-800/95 hover:bg-slate-700 text-slate-100 border-slate-600'
                    }`}
                  >
                    <div>{slot.label.split(' (')[0]}</div>
                    {picked && (
                      <div className="text-[10px] font-mono mt-0.5">
                        {picked === 'vip' ? 'VIP' : 'Nhân viên mới'} {isCorrect ? '✓' : '✗'}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 5 cols: Role Selector & Feedback */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>Chọn người cần sắp xếp chỗ ngồi:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setRoleToAssign('vip')}
                  className={`p-3 rounded-xl border text-left cursor-pointer ${
                    roleToAssign === 'vip'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold">Khách VIP / Sếp lớn</div>
                  <div className="text-[11px] opacity-80 mt-0.5">Cần đặt vào Thượng tọa (Kamiza)</div>
                </button>
                <button
                  onClick={() => setRoleToAssign('me_junior')}
                  className={`p-3 rounded-xl border text-left cursor-pointer ${
                    roleToAssign === 'me_junior'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                      : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold">Bạn (Nhân viên mới)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">Phải ngồi Hạ tọa (Shimoza)</div>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-2">
              <div className="font-bold text-amber-300">Giải mã lễ nghi Thượng tọa - Hạ tọa:</div>
              <p>{seatFeedback}</p>
            </div>
          </div>
        </div>
      )}

      {/* === SUB-TAB 3: WEBCAM AI OJIGI BOW ANGLE GRADER === */}
      {subTab === 'webcam_ojigi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 cols: Live Webcam Feed + Protractor HUD */}
          <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold text-white">
                MÁY ĐO GÓC CÚI CHÀO OJIGI THỜI GIAN THỰC
              </div>
              <button
                onClick={webcamOn ? stopOjigiCam : startOjigiCam}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                  webcamOn ? 'bg-rose-600 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{webcamOn ? 'Tắt Webcam đo góc' : 'Bật Webcam AI đo độ nghiêng'}</span>
              </button>
            </div>

            {webcamMsg && (
              <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-700/50 text-xs text-amber-200">
                {webcamMsg}
              </div>
            )}

            <div className="relative h-72 w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
              {webcamOn ? (
                <video
                  ref={ojigiVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              ) : (
                /* 3D Silhouette Protractor Visualization */
                <div className="flex flex-col items-center justify-center gap-3">
                  <svg viewBox="0 0 220 180" className="w-60 h-44">
                    {/* Reference vertical line */}
                    <line x1="90" y1="150" x2="90" y2="25" stroke="#334155" strokeDasharray="4 4" strokeWidth="2" />
                    {/* Target angle guide */}
                    <line
                      x1="90"
                      y1="145"
                      x2={90 + Math.sin(((targetBow === 'eshaku_15' ? 15 : targetBow === 'keirei_30' ? 30 : 45) * Math.PI) / 180) * 95}
                      y2={145 - Math.cos(((targetBow === 'eshaku_15' ? 15 : targetBow === 'keirei_30' ? 30 : 45) * Math.PI) / 180) * 95}
                      stroke="#10b981"
                      strokeDasharray="3 3"
                      strokeWidth="2"
                    />
                    {/* Live Torso & Head Spine */}
                    <g transform={`rotate(${bowAngleDeg}, 90, 145)`}>
                      <line x1="90" y1="145" x2="90" y2="62" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
                      <circle cx="90" cy="44" r="14" fill="#38bdf8" />
                    </g>
                    <circle cx="90" cy="145" r="5" fill="#f59e0b" />
                    <text x="120" y="155" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                      Trục hông chuẩn Nhật
                    </text>
                  </svg>
                  <div className="text-xs text-slate-400">
                    Đứng trước Webcam hoặc kéo thanh thước đo để kiểm tra góc cúi chào thẳng lưng
                  </div>
                </div>
              )}

              {/* Live Protractor Readout Overlay */}
              <div className="absolute top-3 left-3 px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-700 font-mono tabular-nums">
                <div className="text-[10px] text-slate-400">GÓC ĐO HIỆN TẠI</div>
                <div className={`text-2xl font-bold ${bowEval.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {bowAngleDeg}°
                </div>
              </div>
              {webcamOn && baselineTorsoY !== null && (
                <button
                  onClick={() => setBaselineTorsoY(null)}
                  className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-[11px] text-slate-200 cursor-pointer"
                >
                  Đặt lại tư thế đứng thẳng
                </button>
              )}
            </div>

            {/* Calibration Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400 font-mono tabular-nums">
                <span>Đứng thẳng (0°)</span>
                <span className="text-cyan-300 font-bold">Góc nghiêng lưng: {bowAngleDeg}°</span>
                <span>Cúi sâu (55°)</span>
              </div>
              <input
                type="range"
                min={0}
                max={55}
                value={bowAngleDeg}
                onChange={(e) => setBowAngleDeg(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Right 5 cols: Target Standard & AI Verdict */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
              <div className="text-xs font-bold text-slate-300">Chọn cấp độ Cúi chào chuẩn Nhật:</div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'eshaku_15' as const, title: '15° · Eshaku (会釈)', desc: 'Chào xã giao hành lang, lướt qua sếp/đồng nghiệp' },
                  { id: 'keirei_30' as const, title: '30° · Keirei (敬礼)', desc: 'Chào chuẩn phỏng vấn, tiếp đón đối tác phòng họp' },
                  { id: 'saikeirei_45' as const, title: '45° · Saikeirei (最敬礼)', desc: 'Cúi tạ lỗi sâu sắc (Shazai), cảm tạ đặc biệt' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setTargetBow(lvl.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer ${
                      targetBow === lvl.id
                        ? 'bg-cyan-600/20 border-cyan-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold">{lvl.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{lvl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                bowEval.passed ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-amber-950/30 border-amber-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  {bowEval.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-400" />
                  )}
                  <span>{bowEval.verdict}</span>
                </div>
                <span className="font-mono text-sm font-bold text-emerald-300 tabular-nums">
                  {bowEval.accuracyPercent}%
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{bowEval.detail}</p>
            </div>

            {/* Real-World Ojigi Situations + Load More 3 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-cyan-300">
                  Tình huống thực chiến ({ojigiScenarios.length})
                </span>
                <button
                  onClick={handleLoadMoreOjigi}
                  disabled={isLoadingMoreOjigi}
                  className="px-2.5 py-1 rounded-md bg-cyan-950/60 hover:bg-cyan-900/60 disabled:opacity-50 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  {isLoadingMoreOjigi ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                  <span>Tải thêm 3 tình huống</span>
                </button>
              </div>
              <div className="space-y-1.5 max-h-44 overflow-y-auto scrollbar-thin pr-1">
                {ojigiScenarios.map((sc) => (
                  <div
                    key={sc.id}
                    onClick={() => {
                      setSelectedOjigiScenarioId(sc.id);
                      setTargetBow(sc.targetType);
                      speechService.speak(sc.spokenPhraseJp);
                    }}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedOjigiScenarioId === sc.id
                        ? 'bg-cyan-950/40 border-cyan-500/60 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between gap-2">
                      <span>{sc.situationTitle}</span>
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{sc.contextDetail}</div>
                    <div className="text-[11px] font-jp text-cyan-300 mt-1">{sc.spokenPhraseJp}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
