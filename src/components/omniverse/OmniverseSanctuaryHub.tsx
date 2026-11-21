import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Coffee,
  BookOpen,
  Disc3,
  Mail,
  Leaf,
  Moon,
  Sun,
  Download,
  Upload,
  Bookmark,
  Headphones,
  VolumeX,
  LayoutGrid,
} from 'lucide-react';
import { YoruNoKissatenView } from './YoruNoKissatenView';
import { BunkoTeahouseView } from './BunkoTeahouseView';
import { VinylKashiStudioView } from './VinylKashiStudioView';
import { TimeCapsulePostOfficeView } from './TimeCapsulePostOfficeView';
import { KigoConservatoryView } from './KigoConservatoryView';
import { SanctuaryBentoGallery } from './SanctuaryBentoGallery';
import { omniverseStorageService } from '../../services/omniverseStorageService';
import { SpatialAudioState, spatialAudioEngine } from '../../services/spatialAudioEngine';
import { speechService } from '../../services/speechService';

export type OmniverseSanctuaryTab = 'kissaten' | 'bunko' | 'vinyl' | 'postoffice' | 'conservatory';
export type OmniverseInitialView = 'hub' | OmniverseSanctuaryTab;

interface OmniverseSanctuaryHubProps {
  initialView?: OmniverseInitialView;
  srsDueCount: number;
  onOpenSrsVault: () => void;
  onSrsUpdated: () => void;
  onClose: () => void;
}

const SANCTUARY_SWITCHER_ITEMS: Array<{
  id: OmniverseSanctuaryTab;
  label: string;
  kanji: string;
  wairoHex: string;
  icon: React.FC<{ className?: string }>;
}> = [
  { id: 'kissaten', label: 'Cà Phê Đêm', kanji: '喫', wairoHex: '#B47B44', icon: Coffee },
  { id: 'bunko', label: 'Phòng Đọc', kanji: '文', wairoHex: '#5B7A5E', icon: BookOpen },
  { id: 'vinyl', label: 'Đĩa Than', kanji: '音', wairoHex: '#384D70', icon: Disc3 },
  { id: 'postoffice', label: 'Bưu Cục', kanji: '郵', wairoHex: '#A64444', icon: Mail },
  { id: 'conservatory', label: '72 Tiết Khí', kanji: '歳', wairoHex: '#C77D8A', icon: Leaf },
];

export const OmniverseSanctuaryHub: React.FC<OmniverseSanctuaryHubProps> = ({
  initialView = 'hub',
  srsDueCount,
  onOpenSrsVault,
  onSrsUpdated,
  onClose,
}) => {
  const [currentView, setCurrentView] = useState<OmniverseInitialView>(initialView);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [audioState, setAudioState] = useState<SpatialAudioState>(spatialAudioEngine.getState());
  const [backupStatus, setBackupStatus] = useState<string | null>(null);
  const [remountKey, setRemountKey] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView]);

  useEffect(() => {
    const unsub = spatialAudioEngine.subscribe(setAudioState);
    return () => {
      unsub();
      spatialAudioEngine.stopAll();
      speechService.stop();
    };
  }, []);

  const handleSelectRoom = (tab: OmniverseSanctuaryTab) => {
    speechService.stop();
    setCurrentView(tab);
    if (audioState.isPlaying) {
      spatialAudioEngine.applyScenePreset(tab);
    }
  };

  const handleBackToHub = () => {
    speechService.stop();
    setCurrentView('hub');
  };

  const handleExportMainichi = async () => {
    const json = await omniverseStorageService.exportMainichiBundle();
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const dateStamp = new Date().toISOString().slice(0, 10);
    a.download = `kotoba-sanctuaries-${dateStamp}.mainichi.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBackupStatus('Đã xuất tệp sao lưu .mainichi.json thành công.');
    window.setTimeout(() => setBackupStatus(null), 4500);
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const res = await omniverseStorageService.importMainichiBundle(text);
      setBackupStatus(res.message);
      if (res.ok) {
        setRemountKey((k) => k + 1);
      }
    } catch {
      setBackupStatus('Không thể đọc tệp đã chọn.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      window.setTimeout(() => setBackupStatus(null), 5500);
    }
  };

  const isHub = currentView === 'hub';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 overflow-x-clip ${
        isDark ? 'bg-[#0d1016] text-stone-100' : 'bg-[#f4efe5] text-stone-900'
      }`}
    >
      {/* Ultra-Sleek Floating Sanctuary Switcher & Controls Bar */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors ${
          isDark
            ? 'bg-[#0d1016]/90 border-stone-800/90'
            : 'bg-[#f4efe5]/90 border-stone-300/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-5 h-15 flex items-center justify-between gap-2">
          {/* Left: Return to Home or ← Sảnh Chính */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={isHub ? onClose : handleBackToHub}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isDark
                  ? 'border-stone-800 bg-stone-900/90 text-stone-200 hover:bg-stone-800'
                  : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-100'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>{isHub ? 'Trang Chủ' : 'Sảnh Chính'}</span>
            </button>

            {!isHub && (
              <button
                type="button"
                onClick={onClose}
                className={`hidden md:inline-flex items-center px-2.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isDark ? 'text-stone-400 hover:text-stone-100' : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                Trang Chủ
              </button>
            )}
          </div>

          {/* Center: 0ms Floating Sanctuary Switcher (5 Wairo Room Icons) */}
          <nav
            aria-label="Chuyển nhanh 5 Thánh địa"
            className={`flex items-center gap-1 rounded-2xl border p-1 overflow-x-auto no-scrollbar ${
              isDark
                ? 'bg-[#121722]/90 border-stone-800/90'
                : 'bg-white/80 border-stone-300/80'
            }`}
          >
            <button
              type="button"
              onClick={handleBackToHub}
              title="Sảnh Triển Lãm Chính"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isHub
                  ? isDark
                    ? 'bg-stone-100 text-stone-950'
                    : 'bg-[#2c2520] text-[#faf7f2]'
                  : isDark
                  ? 'text-stone-400 hover:text-stone-100'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline">Sảnh</span>
            </button>

            {SANCTUARY_SWITCHER_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectRoom(item.id)}
                  title={`${item.label} (${item.kanji})`}
                  style={
                    isActive
                      ? { backgroundColor: item.wairoHex, color: '#ffffff' }
                      : undefined
                  }
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'shadow-sm'
                      : isDark
                      ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/70'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="md:hidden font-mincho">{item.kanji}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Spatial Audio, Washi/Dark Toggle, .mainichi.json Backup, FSRS */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                if (!audioState.isPlaying) {
                  spatialAudioEngine.applyScenePreset(isHub ? 'kissaten' : currentView);
                }
                spatialAudioEngine.togglePlay();
              }}
              title={audioState.isPlaying ? 'Tắt âm thanh không gian Zen' : 'Bật âm thanh không gian Zen'}
              className={`p-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                audioState.isPlaying
                  ? isDark
                    ? 'border-amber-500/50 bg-amber-500/20 text-amber-200'
                    : 'border-amber-700 bg-amber-800 text-amber-50'
                  : isDark
                  ? 'border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-800'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
              }`}
            >
              {audioState.isPlaying ? <Headphones className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setIsDark((d) => !d)}
              title={isDark ? 'Chuyển sang Giấy Washi ấm' : 'Chuyển sang Tĩnh Đêm'}
              className={`p-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                isDark
                  ? 'border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-800'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleExportMainichi}
              title="Xuất sao lưu .mainichi.json"
              className={`hidden sm:inline-flex p-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                isDark
                  ? 'border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-800'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Nhập khôi phục .mainichi.json"
              className={`hidden sm:inline-flex p-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                isDark
                  ? 'border-stone-800 bg-stone-900 text-stone-300 hover:bg-stone-800'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.mainichi.json"
              onChange={handleImportFile}
              className="hidden"
            />

            <button
              type="button"
              onClick={onOpenSrsVault}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isDark
                  ? 'border-emerald-700/50 bg-emerald-900/35 text-emerald-200 hover:bg-emerald-900/55'
                  : 'border-emerald-700/30 bg-emerald-800 text-emerald-50 hover:bg-emerald-900'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">FSRS</span>
              <span className="font-mono tabular-nums">{srsDueCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stage: Hero Sanctuary Bento Hub OR Active 65/35 Room */}
      <main className="max-w-7xl mx-auto px-3 sm:px-5 py-6">
        {backupStatus && (
          <div
            className={`mb-4 rounded-xl border px-4 py-2.5 text-xs ${
              isDark
                ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                : 'bg-emerald-50 border-emerald-300 text-emerald-900'
            }`}
          >
            {backupStatus}
          </div>
        )}

        <div key={`${currentView}_${remountKey}`}>
          {isHub && (
            <SanctuaryBentoGallery
              isDark={isDark}
              onEnterSanctuary={handleSelectRoom}
            />
          )}
          {currentView === 'kissaten' && (
            <YoruNoKissatenView isDark={isDark} onSrsUpdated={onSrsUpdated} />
          )}
          {currentView === 'bunko' && (
            <BunkoTeahouseView isDark={isDark} onSrsUpdated={onSrsUpdated} />
          )}
          {currentView === 'vinyl' && (
            <VinylKashiStudioView isDark={isDark} onSrsUpdated={onSrsUpdated} />
          )}
          {currentView === 'postoffice' && (
            <TimeCapsulePostOfficeView isDark={isDark} onSrsUpdated={onSrsUpdated} />
          )}
          {currentView === 'conservatory' && (
            <KigoConservatoryView isDark={isDark} onSrsUpdated={onSrsUpdated} />
          )}
        </div>
      </main>
    </div>
  );
};
