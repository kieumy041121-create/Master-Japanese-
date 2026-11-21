import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Wifi, WifiOff, X, CheckCircle2, Sparkles } from 'lucide-react';
import { speechService } from '../../services/speechService';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);

  useEffect(() => {
    // Check if already standalone PWA
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      speechService.playSuccessSound();
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If iOS or browser doesn't support automatic prompt, show guide
      setShowIosGuide(true);
      return;
    }
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        speechService.playSuccessSound();
      }
      setDeferredPrompt(null);
    } catch {
      setShowIosGuide(true);
    }
  };

  // If already installed or dismissed, only show offline status indicator if offline
  if (!isOnline) {
    return (
      <div className="bg-amber-500/20 border-b border-amber-500/40 px-4 py-1.5 text-center text-xs font-semibold text-amber-200 flex items-center justify-center gap-2">
        <WifiOff className="w-3.5 h-3.5 text-amber-400" />
        <span>Chế độ Ngoại Tuyến (Offline PWA): Đang sử dụng bộ nhớ đệm 57.000 từ vựng & âm thanh cục bộ</span>
      </div>
    );
  }

  if (isInstalled || isDismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-800/50 px-4 py-2 text-xs flex items-center justify-between gap-3 text-slate-200">
      <div className="flex items-center gap-2.5 overflow-hidden">
        <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
          <Smartphone className="w-4 h-4 text-cyan-300" />
        </div>
        <div className="truncate">
          <span className="font-bold text-white">Cài đặt ứng dụng PWA: </span>
          <span className="text-slate-300">
            Học tập mượt mà ngay cả khi mất sóng trên tàu điện ngầm hoặc máy bay
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-indigo-950 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Cài Đặt App</span>
        </button>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
          title="Bỏ qua"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* iOS Safari Guide Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-700/60 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-indigo-400" />
                Hướng Dẫn Cài Đặt PWA Lên Màn Hình
              </h3>
              <button onClick={() => setShowIosGuide(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-300">Trên iPhone / iPad (Safari):</div>
                <p>1. Bấm nút <strong>Chia sẻ (Share - biểu tượng hình vuông có mũi tên lên)</strong> ở thanh dưới trình duyệt.</p>
                <p>2. Cuộn xuống và chọn <strong>Thêm vào MH chính (Add to Home Screen)</strong>.</p>
                <p>3. Ứng dụng sẽ xuất hiện như một app độc lập với biểu tượng Hán tự 言 mạ vàng.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-300">Trên Máy Tính (Chrome / Edge):</div>
                <p>Bấm biểu tượng <strong>Cài đặt (Install)</strong> nằm bên phải thanh địa chỉ URL.</p>
              </div>
            </div>
            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl cursor-pointer"
            >
              Đã Hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
