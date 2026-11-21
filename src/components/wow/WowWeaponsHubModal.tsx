import React, { useState, useEffect } from 'react';
import {
  X,
  Scan,
  Waves,
  MessageCircle,
  Compass,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { ArCultureDecoderLab } from './ArCultureDecoderLab';
import { VoiceClonePitchLab } from './VoiceClonePitchLab';
import { LineGenZHackerLab } from './LineGenZHackerLab';
import { BaitoVrCultureLab } from './BaitoVrCultureLab';
import { RirekishoInterviewLab } from './RirekishoInterviewLab';

export type WowWeaponId = 'ar_vision' | 'voice_clone' | 'line_genz' | 'baito_vr' | 'rirekisho_hr';

interface WowWeaponsHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWeapon?: WowWeaponId;
}

const WEAPON_TABS: {
  id: WowWeaponId;
  shortLabel: string;
  subtitle: string;
  icon: React.ElementType;
}[] = [
  {
    id: 'ar_vision',
    shortLabel: '1. Mắt Thần AR',
    subtitle: 'Quét Menu & Bẫy Otoushi',
    icon: Scan,
  },
  {
    id: 'voice_clone',
    shortLabel: '2. Nhân Bản Giọng',
    subtitle: 'Clone giọng & Pitch Tokyo',
    icon: Waves,
  },
  {
    id: 'line_genz',
    shortLabel: '3. LINE & Gen-Z',
    subtitle: 'KY, Slang & Maruhara',
    icon: MessageCircle,
  },
  {
    id: 'baito_vr',
    shortLabel: '4. Baito & Văn Hóa 3D',
    subtitle: 'Konbini POS, Kamiza & Ojigi',
    icon: Compass,
  },
  {
    id: 'rirekisho_hr',
    shortLabel: '5. CV JIS & Phỏng Vấn',
    subtitle: 'Rirekisho & Bẫy HR Nhật',
    icon: Briefcase,
  },
];

export const WowWeaponsHubModal: React.FC<WowWeaponsHubModalProps> = ({
  isOpen,
  onClose,
  initialWeapon = 'ar_vision',
}) => {
  const [activeWeapon, setActiveWeapon] = useState<WowWeaponId>(initialWeapon);

  useEffect(() => {
    if (isOpen && initialWeapon) {
      setActiveWeapon(initialWeapon);
    }
  }, [isOpen, initialWeapon]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-7xl my-auto rounded-2xl bg-[#070b14] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Modal Header + Weapon Switcher */}
        <div className="bg-[#0b1120] border-b border-slate-800 px-4 sm:px-6 py-3.5 flex flex-col xl:flex-row xl:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-indigo-600/30 border border-amber-500/40 flex items-center justify-center text-amber-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  TRUNG TÂM 5 SIÊU VŨ KHÍ TƯƠNG LAI · FUTURE LAB SUITE
                </h2>
                <p className="text-[11px] text-slate-400">
                  Công nghệ AR Vision · Nhân bản Âm sắc F0 · Phá mã LINE KY · Mô phỏng Konbini POS/Ojigi · Tuyển dụng Tokyo
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="xl:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              aria-label="Đóng trung tâm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 xl:pb-0">
            {WEAPON_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeWeapon === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveWeapon(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-left transition-all cursor-pointer border whitespace-nowrap flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                      : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs font-bold">{tab.shortLabel}</span>
                </button>
              );
            })}

            <button
              onClick={onClose}
              className="hidden xl:flex ml-2 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              title="Đóng Future Lab"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Weapon Content Stage */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin">
          {activeWeapon === 'ar_vision' && <ArCultureDecoderLab />}
          {activeWeapon === 'voice_clone' && <VoiceClonePitchLab />}
          {activeWeapon === 'line_genz' && <LineGenZHackerLab />}
          {activeWeapon === 'baito_vr' && <BaitoVrCultureLab />}
          {activeWeapon === 'rirekisho_hr' && <RirekishoInterviewLab />}
        </div>
      </div>
    </div>
  );
};
