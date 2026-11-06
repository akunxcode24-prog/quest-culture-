import React from 'react';
import { User, Volume2, VolumeX, Settings, Compass, Map, BookOpen, Award, Layers } from 'lucide-react';
import { sound } from '../utils/audio';

export type NavTab = 'beranda' | 'peta' | 'koleksi' | 'materi' | 'pencapaian';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  username: string;
  stars: number;
  xp: number;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onOpenSettings: () => void;
  onChangeProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  username,
  stars,
  xp,
  isAudioMuted,
  onToggleAudio,
  onOpenSettings,
  onChangeProfile,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Compass className="w-4 h-4" /> },
    { id: 'peta', label: 'Peta Misi', icon: <Map className="w-4 h-4" /> },
    { id: 'koleksi', label: 'Koleksi Budaya', icon: <Layers className="w-4 h-4" /> },
    { id: 'materi', label: 'Materi', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'pencapaian', label: 'Pencapaian', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#F7EBD2]/95 backdrop-blur-md border-b-2 border-[#8C4B2D]/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            sound.playWoodClick();
            onTabChange('beranda');
          }}
          className="flex items-center gap-2 text-left group cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-[#8C4B2D] border border-[#D99A35] flex items-center justify-center text-[#F7EBD2] shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-[#D99A35]" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-[#8C4B2D] group-hover:text-[#6a341b] transition-colors whitespace-nowrap">
              CultureQuest
            </span>
          </div>
        </button>

        {/* Zone 2: Clean 5 nav links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playWoodClick();
                  onTabChange(item.id);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#8C4B2D] text-white shadow-sm'
                    : 'text-[#8C4B2D]/85 hover:text-[#8C4B2D] hover:bg-[#8C4B2D]/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action & Student Profile Capsule */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Stats Pill */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#FFFBF2] border border-[#8C4B2D]/20 shadow-xs text-xs font-bold text-[#8C4B2D]">
            <div className="flex items-center gap-1 text-[#D99A35]" title="Jumlah Bintang Dikumpulkan">
              <span>⭐</span>
              <span className="tabular-nums text-[#8C4B2D]">{stars}</span>
            </div>
            <span className="text-[#8C4B2D]/30">|</span>
            <div className="flex items-center gap-1 text-[#527D65]" title="Pengalaman Penjelajah (XP)">
              <span>⚡</span>
              <span className="tabular-nums text-[#8C4B2D]">{xp} XP</span>
            </div>
          </div>

          {/* Student Profile & Switch */}
          <button
            onClick={() => {
              sound.playWoodClick();
              onChangeProfile();
            }}
            title="Klik untuk ganti petualang"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#8C4B2D]/10 hover:bg-[#8C4B2D]/15 border border-[#8C4B2D]/30 transition-colors text-xs font-extrabold text-[#8C4B2D] cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-[#8C4B2D] text-white flex items-center justify-center text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="max-w-[85px] sm:max-w-[120px] truncate">{username}</span>
          </button>

          {/* Audio toggle button */}
          <button
            onClick={() => {
              sound.playWoodClick();
              onToggleAudio();
            }}
            title={isAudioMuted ? 'Nyalakan Musik & Suara' : 'Matikan Suara'}
            className="w-9 h-9 rounded-xl bg-[#FFFBF2] hover:bg-[#F3E3C6] border border-[#8C4B2D]/25 flex items-center justify-center text-[#8C4B2D] transition-colors cursor-pointer"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-[#8C4B2D]" />}
          </button>

          {/* Settings modal button */}
          <button
            onClick={() => {
              sound.playWoodClick();
              onOpenSettings();
            }}
            title="Pengaturan"
            className="w-9 h-9 rounded-xl bg-[#FFFBF2] hover:bg-[#F3E3C6] border border-[#8C4B2D]/25 flex items-center justify-center text-[#8C4B2D] transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-[#8C4B2D]" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar for touchscreens */}
      <div className="lg:hidden flex items-center justify-around px-2 py-1.5 border-t border-[#8C4B2D]/15 bg-[#F7EBD2]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playWoodClick();
                onTabChange(item.id);
              }}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[11px] font-bold transition-colors ${
                isActive ? 'text-[#8C4B2D] bg-[#8C4B2D]/15' : 'text-[#8C4B2D]/60 hover:text-[#8C4B2D]'
              }`}
            >
              {item.icon}
              <span className="mt-0.5 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
