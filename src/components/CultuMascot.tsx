import React, { useState } from 'react';
import { Sparkles, RefreshCw, Volume2 } from 'lucide-react';
import { CULTU_DIALOGUES } from '../data/culturalData';
import { sound } from '../utils/audio';

interface CultuMascotProps {
  username: string;
}

export const CultuMascot: React.FC<CultuMascotProps> = ({ username }) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleNextTip = () => {
    sound.playWoodClick();
    setIsSpeaking(true);
    setDialogueIndex((prev) => (prev + 1) % CULTU_DIALOGUES.length);
    setTimeout(() => setIsSpeaking(false), 300);
  };

  const handleSpeakAloud = () => {
    sound.playSuccessChime();
    // Optional Web Speech API synthesis for Indonesian narration!
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = dialogueIndex === 0
        ? `Halo ${username}! Aku Cultu, burung Cendrawasih sahabat petualangmu. Siap menjelajahi indahnya budaya Nusantara hari ini?`
        : CULTU_DIALOGUES[dialogueIndex];
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentText =
    dialogueIndex === 0
      ? `Halo, Petualang ${username}! Aku Cultu, burung Cendrawasih sahabat petualangmu. Siap menjelajahi dan melestarikan budaya Nusantara hari ini?`
      : CULTU_DIALOGUES[dialogueIndex];

  return (
    <div className="wood-panel rounded-3xl p-4 sm:p-6 border-3 border-[#8C4B2D] shadow-md relative overflow-hidden flex flex-col md:flex-row items-center gap-4 sm:gap-6">
      {/* Mascot Avatar with Frame */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-3 border-[#D99A35] shadow-lg bg-[#FFFBF2] animate-float">
          <img
            src="/src/assets/images/cultu_mascot_guide_1793969033044.jpg"
            alt="Cultu - Pemandu Petualangan Budaya"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="mt-2 text-center">
          <span className="inline-block px-3 py-0.5 rounded-full bg-[#8C4B2D] text-[#F7EBD2] text-xs font-black tracking-wide shadow-xs uppercase">
            CULTU
          </span>
          <p className="text-[10px] font-bold text-[#8C4B2D]/75 mt-0.5">Pemandu Petualang</p>
        </div>
      </div>

      {/* Speech Bubble Deck */}
      <div className="flex-1 w-full text-left">
        <div className="relative bg-[#FFFBF2] border-2 border-[#8C4B2D]/40 rounded-2xl p-4 sm:p-5 shadow-xs">
          {/* Bubble tail indicator */}
          <div className="hidden md:block absolute -left-2.5 top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-[#8C4B2D]/40" />
          <div className="hidden md:block absolute -left-2 top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[9px] border-r-[#FFFBF2]" />

          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#D99A35] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#D99A35]" />
              <span>Kabar dari Sahabat Budaya</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSpeakAloud}
                title="Dengarkan Suara Cultu"
                className="p-1.5 rounded-lg bg-[#F7EBD2] hover:bg-[#EAD0A3] text-[#8C4B2D] border border-[#8C4B2D]/20 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dengar</span>
              </button>

              <button
                onClick={handleNextTip}
                title="Ganti Fakta Budaya Berikutnya"
                className="p-1.5 rounded-lg bg-[#F7EBD2] hover:bg-[#EAD0A3] text-[#8C4B2D] border border-[#8C4B2D]/20 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Fakta Lain</span>
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base font-semibold text-[#3B2011] leading-relaxed">
            "{currentText}"
          </p>
        </div>

        {/* Motivational Note */}
        <div className="mt-2.5 flex items-center justify-between text-xs text-[#8C4B2D]/80 font-bold px-1">
          <span>🎯 Kumpulkan bintang dari 4 misi seru di bawah ini!</span>
          <span className="text-[11px] text-[#527D65]">Tahap 1: Persiapan Ekspedisi</span>
        </div>
      </div>
    </div>
  );
};
