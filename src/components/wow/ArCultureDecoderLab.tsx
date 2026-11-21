import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Scan,
  AlertTriangle,
  Sparkles,
  Volume2,
  Eye,
  ShieldAlert,
  RefreshCw,
  BookOpen,
  Plus,
} from 'lucide-react';
import {
  AR_PRESET_SCENES,
  ArPresetScene,
  ArDecodeResult,
  ArDecodedItem,
  analyzeArScene,
  loadMoreArPresets,
  loadMoreArItemsForScene,
} from '../../services/wowWeaponsService';
import { speechService } from '../../services/speechService';

export const ArCultureDecoderLab: React.FC = () => {
  const [presets, setPresets] = useState<ArPresetScene[]>(AR_PRESET_SCENES);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(AR_PRESET_SCENES[0].id);
  const [activeImageUrl, setActiveImageUrl] = useState<string>(AR_PRESET_SCENES[0].imageUrl);
  const [result, setResult] = useState<ArDecodeResult>(AR_PRESET_SCENES[0].result);
  const [selectedItemId, setSelectedItemId] = useState<string>(AR_PRESET_SCENES[0].result.items[0].id);
  const [customHint, setCustomHint] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isLoadingMorePresets, setIsLoadingMorePresets] = useState<boolean>(false);
  const [isLoadingMoreItems, setIsLoadingMoreItems] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Trình duyệt hiện tại không hỗ trợ Camera trực tiếp. Hãy tải ảnh lên hoặc chọn mẫu thực tế bên dưới.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      streamRef.current = stream;
      setCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }, 60);
    } catch {
      setCameraError('Không thể truy cập Camera (chưa cấp quyền hoặc không có thiết bị). Vui lòng tải ảnh thật từ máy hoặc dùng ảnh mẫu Tokyo.');
    }
  };

  const runVisionScanOnDataUrl = async (dataUrl: string) => {
    setIsScanning(true);
    setActiveImageUrl(dataUrl);
    setSelectedPresetId('custom');
    try {
      const decoded = await analyzeArScene(dataUrl, customHint);
      setResult(decoded);
      if (decoded.items[0]) {
        setSelectedItemId(decoded.items[0].id);
      }
      speechService.playSuccessSound();
    } finally {
      setIsScanning(false);
    }
  };

  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 800;
    canvas.height = video.videoHeight || 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    stopCamera();
    runVisionScanOnDataUrl(dataUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        runVisionScanOnDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (presetId: string) => {
    stopCamera();
    setCameraError(null);
    const found = presets.find((p) => p.id === presetId);
    if (!found) return;
    setSelectedPresetId(found.id);
    setActiveImageUrl(found.imageUrl);
    setResult(found.result);
    if (found.result.items[0]) {
      setSelectedItemId(found.result.items[0].id);
    }
  };

  const handleLoadMorePresets = async () => {
    if (isLoadingMorePresets) return;
    setIsLoadingMorePresets(true);
    try {
      const extra = await loadMoreArPresets(presets.map((p) => p.id));
      if (extra.length > 0) {
        setPresets((prev) => [...prev, ...extra]);
        const firstNew = extra[0];
        stopCamera();
        setSelectedPresetId(firstNew.id);
        setActiveImageUrl(firstNew.imageUrl);
        setResult(firstNew.result);
        if (firstNew.result.items[0]) setSelectedItemId(firstNew.result.items[0].id);
      }
    } finally {
      setIsLoadingMorePresets(false);
    }
  };

  const handleLoadMoreItems = async () => {
    if (isLoadingMoreItems) return;
    setIsLoadingMoreItems(true);
    try {
      const moreItems = await loadMoreArItemsForScene(
        result.sceneTitle,
        result.items.map((i) => i.japaneseText)
      );
      if (moreItems.length > 0) {
        setResult((prev) => ({
          ...prev,
          items: [...prev.items, ...moreItems],
        }));
        setSelectedItemId(moreItems[0].id);
      }
    } finally {
      setIsLoadingMoreItems(false);
    }
  };

  const handleReScanCurrentImage = async () => {
    // Convert current image URL (preset or uploaded) into canvas base64 and scan dynamically via Gemini Vision
    setIsScanning(true);
    try {
      if (activeImageUrl.startsWith('data:image')) {
        await runVisionScanOnDataUrl(activeImageUrl);
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 800;
        canvas.height = img.naturalHeight || 600;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const b64 = canvas.toDataURL('image/jpeg', 0.85);
          const decoded = await analyzeArScene(b64, customHint);
          setResult(decoded);
          if (decoded.items[0]) setSelectedItemId(decoded.items[0].id);
        }
        setIsScanning(false);
      };
      img.onerror = () => setIsScanning(false);
      img.src = activeImageUrl;
    } catch {
      setIsScanning(false);
    }
  };

  const activeItem: ArDecodedItem | undefined =
    result.items.find((i) => i.id === selectedItemId) || result.items[0];

  const trapCount = result.items.filter((i) => i.isTrap).length;

  return (
    <div className="space-y-4">
      {/* Top Interactive Controls Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-amber-400">
            VŨ KHÍ 01 · MẮT THẦN AR &amp; BÁCH KHOA QUÉT THỰC TẾ
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Giải Mã Ateji, Bẫy Tiền Bàn Otoushi &amp; Quy Tắc Ngầm Tại Nhật
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedPresetId === preset.id && !cameraActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
              }`}
            >
              {preset.label}
            </button>
          ))}

          <button
            onClick={handleLoadMorePresets}
            disabled={isLoadingMorePresets}
            className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap inline-flex items-center gap-1 bg-amber-950/50 hover:bg-amber-900/60 disabled:opacity-50 text-amber-300 border border-amber-500/40 cursor-pointer"
          >
            {isLoadingMorePresets ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            <span>Tải thêm 3 bối cảnh</span>
          </button>

          <button
            onClick={cameraActive ? stopCamera : startCamera}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap inline-flex items-center gap-1.5 cursor-pointer border ${
              cameraActive
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{cameraActive ? 'Tắt Camera' : 'Bật Camera AR'}</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Tải ảnh thực đơn / biển báo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {cameraError && (
        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-700/50 text-xs text-amber-200 flex items-center justify-between gap-3">
          <span>{cameraError}</span>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-semibold whitespace-nowrap cursor-pointer"
          >
            Chọn file ảnh
          </button>
        </div>
      )}

      {/* Two-Zone Simulation Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Zone (7 cols): AR Optical HUD Viewport */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            {cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Optical Reticle Overlay */}
                <div className="pointer-events-none absolute inset-6 border border-emerald-400/50 rounded-xl">
                  <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-emerald-400" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-emerald-400" />
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-emerald-400" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-emerald-400" />
                </div>
                <div className="absolute bottom-4 inset-x-0 flex justify-center">
                  <button
                    onClick={captureCameraFrame}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Scan className="w-4 h-4" />
                    <span>Chụp &amp; Quét X-Quang AR Ngay</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <img
                  src={activeImageUrl}
                  alt={result.sceneTitle}
                  className="w-full h-full object-cover"
                />
                {/* Subtle HUD Gradient Scrim for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

                {/* Interactive AR Hotspot Pins */}
                {result.items.map((item, idx) => {
                  const isSelected = activeItem?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedItemId(item.id);
                        speechService.speak(item.japaneseText);
                      }}
                      style={{ left: `${item.hotspotX}%`, top: `${item.hotspotY}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-lg flex items-center gap-1.5 border ${
                        item.isTrap
                          ? isSelected
                            ? 'bg-rose-500 text-white border-white scale-110 z-20'
                            : 'bg-rose-950/90 text-rose-200 border-rose-400 hover:scale-105 z-10'
                          : isSelected
                          ? 'bg-amber-400 text-slate-950 border-white scale-110 z-20'
                          : 'bg-slate-900/90 text-slate-100 border-slate-500 hover:border-amber-400 z-10'
                      }`}
                    >
                      <span className="font-mono text-[10px] tabular-nums">#{idx + 1}</span>
                      <span className="font-jp">{item.japaneseText}</span>
                      {item.isTrap && <AlertTriangle className="w-3 h-3 text-amber-300 shrink-0" />}
                    </button>
                  );
                })}

                {/* Scanning Loading Veil */}
                {isScanning && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-30">
                    <RefreshCw className="w-7 h-7 text-amber-400 animate-spin" />
                    <div className="text-sm font-bold text-white">
                      Mắt Thần Gemini Vision đang bóc tách Kanji, Ateji &amp; Bẫy chi phí...
                    </div>
                  </div>
                )}

                {/* Bottom Caption Inside Image Frame */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 bg-slate-950/85 border border-slate-800 rounded-xl px-3.5 py-2.5">
                  <div>
                    <div className="text-xs font-bold text-white">{result.sceneTitle}</div>
                    <div className="text-[11px] text-slate-400">
                      {result.sceneCategory} · {result.items.length} điểm giải mã ·{' '}
                      <span className={trapCount > 0 ? 'text-rose-400 font-semibold' : 'text-emerald-400'}>
                        {trapCount > 0 ? `${trapCount} cảnh báo bẫy cần lưu ý` : 'An toàn chi phí'}
                      </span>
                    </div>
                  </div>
                  {result.estimatedHiddenCostYen > 0 && (
                    <div className="text-right font-mono tabular-nums">
                      <div className="text-[10px] text-rose-300">Phí ngầm phát hiện</div>
                      <div className="text-sm font-bold text-rose-400">+¥{result.estimatedHiddenCostYen.toLocaleString()}</div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Optional Hint + Re-Scan AI Vision Trigger */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customHint}
              onChange={(e) => setCustomHint(e.target.value)}
              placeholder="Gợi ý thêm ngữ cảnh (VD: Quán nhậu ở Osaka lúc 23h, hoặc bùa cầu thi cử)..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={handleReScanCurrentImage}
              disabled={isScanning || cameraActive}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quét sâu bằng AI Vision</span>
            </button>
          </div>
        </div>

        {/* Right Zone (5 cols): Multi-Layer X-Ray Cultural Analysis */}
        <div className="lg:col-span-5 space-y-3">
          {/* Active Selected Hotspot Deep X-Ray */}
          {activeItem && (
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                activeItem.isTrap
                  ? 'bg-rose-950/25 border-rose-500/50'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[11px] font-mono text-slate-400">
                    ĐIỂM GIẢI MÃ ĐANG CHỌN · {activeItem.isTrap ? 'CẢNH BÁO BẪY THỰC TẾ' : 'TỪ VỰNG & VĂN HÓA'}
                  </div>
                  <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                    <span className="text-2xl font-bold text-white font-jp">{activeItem.japaneseText}</span>
                    <span className="text-sm text-amber-300 font-jp">{activeItem.furigana}</span>
                    <span className="text-xs text-slate-400 font-mono">({activeItem.romaji})</span>
                  </div>
                </div>
                <button
                  onClick={() => speechService.speak(activeItem.japaneseText)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 cursor-pointer shrink-0"
                  title="Phát âm chuẩn Tokyo"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm font-semibold text-emerald-300">
                {activeItem.vietnameseMeaning}
                {activeItem.priceYen && (
                  <span className="ml-2 font-mono text-amber-300 tabular-nums">· {activeItem.priceYen}</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-indigo-300">Giải phẫu Ateji / Hán tự: </span>
                {activeItem.atejiOrVariantNote}
              </div>

              {activeItem.trapWarning && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-xs text-rose-200 flex items-start gap-2 leading-relaxed">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{activeItem.trapWarning}</span>
                </div>
              )}
            </div>
          )}

          {/* Quick Selector List of All Decoded Items */}
          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Danh sách ký hiệu phát hiện ({result.items.length})</span>
              </div>
              <button
                onClick={handleLoadMoreItems}
                disabled={isLoadingMoreItems}
                className="px-2.5 py-1 rounded-md bg-amber-950/60 hover:bg-amber-900/60 disabled:opacity-50 text-amber-300 border border-amber-500/40 text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                {isLoadingMoreItems ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <Plus className="w-3 h-3" />
                )}
                <span>Tải thêm 3</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto scrollbar-thin pr-1">
              {result.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  className={`text-left px-3 py-2 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-between gap-2 border ${
                    activeItem?.id === item.id
                      ? 'bg-slate-800 border-amber-500/60 text-white'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="truncate">
                    <span className="font-jp font-bold">{item.japaneseText}</span>
                    <span className="text-slate-400 ml-2">— {item.vietnameseMeaning}</span>
                  </div>
                  {item.isTrap && (
                    <span className="text-[10px] font-bold text-rose-400 shrink-0">CẢNH BÁO</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cultural Deep Dive & Unspoken Rule */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 text-xs leading-relaxed">
            <div className="font-bold text-indigo-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Nguồn Gốc Văn Hóa &amp; Quy Tắc Bất Thành Văn</span>
            </div>
            <p className="text-slate-300">{result.culturalDeepDive}</p>
            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-700/40 text-amber-200">
              <span className="font-bold">Luật ngầm (Kuki wo yomu): </span>
              {result.unspokenRule}
            </div>

            {result.survivalPhrases.length > 0 && (
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <div className="font-bold text-emerald-300">Câu sinh tồn bỏ túi:</div>
                {result.survivalPhrases.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => speechService.speak(p.jp)}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/40 cursor-pointer flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-jp font-bold text-white">{p.jp}</div>
                      <div className="text-[11px] text-slate-400">{p.vi}</div>
                    </div>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
