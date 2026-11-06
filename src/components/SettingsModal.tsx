import React, { useState } from 'react';
import { X, Volume2, VolumeX, Music, RotateCcw, User, Info, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onResetUser: () => void;
  currentUsername: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isAudioMuted,
  onToggleAudio,
  onResetUser,
  currentUsername,
}) => {
  const [bgmActive, setBgmActive] = useState(sound.isBgmActive());
  const [volume, setVolume] = useState(sound.getVolume() * 100);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleToggleBgm = () => {
    sound.playWoodClick();
    const state = sound.toggleBgm();
    setBgmActive(state);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    sound.setVolume(val / 100);
    sound.playWoodClick();
  };

  const handleConfirmReset = () => {
    sound.playWoodClick();
    setConfirmReset(false);
    onResetUser();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="wood-panel w-full max-w-md rounded-3xl p-5 sm:p-6 border-4 border-[#8C4B2D] shadow-2xl bg-[#FFFBF2] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#8C4B2D]/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#8C4B2D] text-white flex items-center justify-center">
              ⚙️
            </div>
            <h3 className="text-lg font-black text-[#8C4B2D]">Pengaturan Petualangan</h3>
          </div>
          <button
            onClick={() => {
              sound.playWoodClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#8C4B2D]/10 hover:bg-[#8C4B2D]/20 text-[#8C4B2D] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options Body */}
        <div className="py-4 space-y-4">
          
          {/* Audio Master Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F7EBD2] border border-[#8C4B2D]/20">
            <div className="flex items-center gap-3">
              {isAudioMuted ? <VolumeX className="w-5 h-5 text-red-600" /> : <Volume2 className="w-5 h-5 text-[#8C4B2D]" />}
              <div>
                <span className="text-xs sm:text-sm font-black text-[#8C4B2D] block">Efek Suara Kayu & Bel</span>
                <span className="text-[11px] font-semibold text-[#8C4B2D]/70">Suara klik dan bel gamelan</span>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playWoodClick();
                onToggleAudio();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                !isAudioMuted ? 'bg-[#527D65] text-white' : 'bg-[#8C4B2D]/20 text-[#8C4B2D]'
              }`}
            >
              {!isAudioMuted ? 'Aktif' : 'Mati'}
            </button>
          </div>

          {/* Gamelan Melodic Ambiance Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F7EBD2] border border-[#8C4B2D]/20">
            <div className="flex items-center gap-3">
              <Music className="w-5 h-5 text-[#D99A35]" />
              <div>
                <span className="text-xs sm:text-sm font-black text-[#8C4B2D] block">Melodi Gamelan Santai</span>
                <span className="text-[11px] font-semibold text-[#8C4B2D]/70">Alunan nada slendro nusantara</span>
              </div>
            </div>
            <button
              onClick={handleToggleBgm}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                bgmActive ? 'bg-[#D99A35] text-white' : 'bg-[#8C4B2D]/20 text-[#8C4B2D]'
              }`}
            >
              {bgmActive ? 'Berputar' : 'Putar'}
            </button>
          </div>

          {/* Volume Slider */}
          <div className="p-3 rounded-2xl bg-[#F7EBD2] border border-[#8C4B2D]/20 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#8C4B2D]">
              <span>Kekuatan Suara</span>
              <span className="tabular-nums font-black">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#8C4B2D] cursor-pointer"
            />
          </div>

          {/* User Account / Switch Profile */}
          <div className="p-3 rounded-2xl bg-[#F7EBD2] border border-[#8C4B2D]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-[#8C4B2D]" />
                <div>
                  <span className="text-xs font-bold text-[#8C4B2D]/70 block">Penjelajah Aktif:</span>
                  <span className="text-sm font-black text-[#8C4B2D]">{currentUsername || 'Belum terdaftar'}</span>
                </div>
              </div>

              {!confirmReset ? (
                <button
                  onClick={() => {
                    sound.playWoodClick();
                    setConfirmReset(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#8C4B2D]/15 hover:bg-[#8C4B2D]/25 text-[#8C4B2D] text-xs font-black flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ganti Nama</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleConfirmReset}
                    className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-red-700 cursor-pointer"
                  >
                    <Check className="w-3 h-3" />
                    <span>Ya, Ganti</span>
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Curriculum Info Note */}
          <div className="p-3 rounded-xl bg-[#527D65]/10 border border-[#527D65]/30 flex items-start gap-2 text-xs text-[#2B4E3C] font-semibold">
            <Info className="w-4 h-4 text-[#527D65] shrink-0 mt-0.5" />
            <p>
              CultureQuest dirancang untuk siswa SD kelas IV–VI dengan materi kebudayaan Nusantara Indonesia.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#8C4B2D]/20 text-center">
          <button
            onClick={() => {
              sound.playWoodClick();
              onClose();
            }}
            className="wood-button w-full py-2.5 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider cursor-pointer"
          >
            Tutup Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
};
