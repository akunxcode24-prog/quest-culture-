import React, { useState } from 'react';
import { Volume2, VolumeX, Settings, Sparkles, Compass, AlertCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface LandingHeroProps {
  onStartAdventure: (username: string) => void;
  onOpenSettings: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartAdventure,
  onOpenSettings,
  isAudioMuted,
  onToggleAudio,
}) => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      sound.playWoodClick();
      setErrorMessage('Halo Petualang Cilik! Silakan masukkan nama panggilanmu dulu ya ✨');
      return;
    }
    sound.playSuccessChime();
    onStartAdventure(trimmed);
  };

  const handleQuickName = (name: string) => {
    sound.playWoodClick();
    setUsername(name);
    setErrorMessage('');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#3B2011] overflow-hidden flex flex-col justify-between selection:bg-[#D99A35] selection:text-white">
      {/* Background Hero Layer - High fidelity reference asset */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/Petualangan_Budaya_Indonesia_53102692.png"
          alt="CultureQuest - Petualangan Warisan Budaya Indonesia"
          className="w-full h-full object-cover object-center scale-[1.01]"
          referrerPolicy="no-referrer"
        />
        {/* Soft atmospheric gradient to ensure perfect legibility of bottom parchment on all screen ratios */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#201007]/80 via-[#201007]/40 to-transparent pointer-events-none" />
      </div>

      {/* Top Floating Controls Bar */}
      <header className="relative z-20 flex items-center justify-between p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* Left cultural pill indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A160C]/75 backdrop-blur-md border border-[#D99A35]/40 text-[#F7EBD2] text-xs sm:text-sm font-semibold shadow-lg">
          <Compass className="w-4 h-4 text-[#D99A35] animate-spin" style={{ animationDuration: '12s' }} />
          <span>Ekspedisi Budaya Nusantara</span>
          <span className="text-[#D99A35]/60">·</span>
          <span className="hidden sm:inline text-xs text-[#F7EBD2]/80">SD Kelas IV–VI</span>
        </div>

        {/* Right audio and settings action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sound.playWoodClick();
              onToggleAudio();
            }}
            title={isAudioMuted ? 'Nyalakan Musik & Suara' : 'Matikan Suara'}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#522915]/90 hover:bg-[#6D381D] active:scale-95 border-2 border-[#D99A35] flex items-center justify-center text-[#F7EBD2] shadow-xl transition-all cursor-pointer"
          >
            {isAudioMuted ? <VolumeX className="w-5 h-5 text-red-300" /> : <Volume2 className="w-5 h-5 text-[#F7EBD2]" />}
          </button>

          <button
            onClick={() => {
              sound.playWoodClick();
              onOpenSettings();
            }}
            title="Pengaturan Aplikasi"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#522915]/90 hover:bg-[#6D381D] active:scale-95 border-2 border-[#D99A35] flex items-center justify-center text-[#F7EBD2] shadow-xl transition-all cursor-pointer"
          >
            <Settings className="w-5 h-5 text-[#F7EBD2]" />
          </button>
        </div>
      </header>

      {/* Center Spacer to preserve the visual hero center (Characters, Borobudur, Title) */}
      <div className="flex-1 min-h-[30vh] sm:min-h-[42vh]" />

      {/* Bottom Center Interaction Deck: Parchment Box + Start Button */}
      <main className="relative z-20 w-full max-w-xl mx-auto px-4 pb-6 sm:pb-8">
        <div className="wood-panel rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-[#8C4B2D] relative overflow-hidden backdrop-blur-sm">
          {/* Subtle golden corner flourishes */}
          <div className="absolute top-1 left-2 text-[#D99A35] font-serif text-lg select-none opacity-40">❖</div>
          <div className="absolute top-1 right-2 text-[#D99A35] font-serif text-lg select-none opacity-40">❖</div>

          <div className="text-center mb-4">
            <h2 className="text-[#8C4B2D] font-extrabold text-lg sm:text-xl tracking-tight flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D99A35]" />
              <span>Daftarkan Nama Penjelajah</span>
              <Sparkles className="w-5 h-5 text-[#D99A35]" />
            </h2>
            <p className="text-xs sm:text-sm text-[#8C4B2D]/85 mt-1 font-medium">
              Ketik nama panggilanmu untuk memulai petualangan budaya nusantara!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <div
                className={`relative rounded-2xl transition-all duration-200 ${
                  isFocused
                    ? 'ring-4 ring-[#D99A35]/50 shadow-inner'
                    : 'shadow-md'
                }`}
              >
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  maxLength={25}
                  placeholder="Masukkan nama panggilanmu..."
                  className="w-full px-5 py-3.5 text-base sm:text-lg font-bold text-[#3B2011] placeholder-[#8C4B2D]/55 bg-[#FFFBF2] border-2 border-[#8C4B2D] rounded-2xl focus:outline-none text-center tracking-wide"
                  autoFocus
                />
              </div>

              {/* Friendly Error Message */}
              {errorMessage && (
                <div className="mt-2.5 p-2.5 bg-red-50 border border-red-300 rounded-xl flex items-center justify-center gap-2 text-red-800 text-xs sm:text-sm font-semibold animate-bounce">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Quick Suggestion Chips for Easy Elementary School Testing */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[11px] font-semibold text-[#8C4B2D]/70 mr-1">Contoh:</span>
              {['Budi', 'Siti', 'Dewi', 'Rian', 'Putu'].map((suggestedName) => (
                <button
                  key={suggestedName}
                  type="button"
                  onClick={() => handleQuickName(suggestedName)}
                  className="px-2.5 py-1 text-xs font-bold text-[#8C4B2D] bg-[#F4E3C1] hover:bg-[#EAD0A3] border border-[#8C4B2D]/40 rounded-lg cursor-pointer transition-colors active:scale-95"
                >
                  {suggestedName}
                </button>
              ))}
            </div>

            {/* Main Action Button: MULAI PETUALANGAN */}
            <button
              type="submit"
              className="wood-button w-full py-3.5 sm:py-4 px-6 rounded-2xl font-black text-white text-lg sm:text-xl tracking-wider uppercase flex items-center justify-center gap-3 cursor-pointer select-none group"
            >
              <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[11px] border-l-white ml-0.5" />
              </div>
              <span>MULAI PETUALANGAN</span>
            </button>
          </form>

          {/* Privacy Note for Children Safety */}
          <div className="mt-3.5 text-center">
            <p className="text-[11px] sm:text-xs text-[#8C4B2D]/75 font-medium">
              🔒 Aman untuk anak &middot; Tanpa password, email, atau data pribadi
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
