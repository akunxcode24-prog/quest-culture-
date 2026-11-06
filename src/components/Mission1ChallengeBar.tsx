import React, { useState } from 'react';
import { Mission1Challenge } from '../types';
import { Target, HelpCircle, CheckCircle2, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission1ChallengeBarProps {
  currentChallenge: Mission1Challenge;
  challengeIndex: number;
  totalChallenges: number;
  feedbackState: { status: 'correct' | 'wrong' | null; message: string };
  onNextChallenge: () => void;
  isChallengeMode: boolean;
  onToggleChallengeMode: () => void;
}

export const Mission1ChallengeBar: React.FC<Mission1ChallengeBarProps> = ({
  currentChallenge,
  challengeIndex,
  totalChallenges,
  feedbackState,
  onNextChallenge,
  isChallengeMode,
  onToggleChallengeMode,
}) => {
  const [showHint, setShowHint] = useState(false);

  if (!isChallengeMode) {
    return (
      <div className="wood-panel rounded-2xl p-3.5 sm:p-4 border-2 border-[#8C4B2D]/40 flex items-center justify-between gap-4 bg-[#FFFBF2] text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#D99A35] text-white flex items-center justify-center shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-[#8C4B2D]">
              Mode Jelajah Bebas
            </h4>
            <p className="text-[11px] font-bold text-[#8C4B2D]/75">
              Klik titik mana pun pada peta untuk membuka dan mengoleksi 8 kartu budaya.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playWoodClick();
            onToggleChallengeMode();
          }}
          className="wood-button px-3.5 py-1.5 rounded-xl text-xs font-black text-white shrink-0 cursor-pointer shadow-xs"
        >
          Mainkan Tantangan Clue 🎯
        </button>
      </div>
    );
  }

  return (
    <div className="wood-panel rounded-2xl p-4 sm:p-5 border-3 border-[#D99A35] bg-[#FFF8EB] shadow-md text-left transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#8C4B2D] text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-[#D99A35]" />
            <span>Tantangan Temukan Budayanya!</span>
          </span>
          <span className="text-xs font-black text-[#8C4B2D] tabular-nums">
            Tantangan #{challengeIndex + 1} dari {totalChallenges}
          </span>
        </div>

        <button
          onClick={() => {
            sound.playWoodClick();
            onToggleChallengeMode();
          }}
          className="text-[11px] font-bold text-[#8C4B2D]/70 hover:text-[#8C4B2D] underline cursor-pointer"
        >
          Kembali ke Jelajah Bebas
        </button>
      </div>

      {/* Clue Question */}
      <div className="p-3 rounded-xl bg-[#FFFBF2] border-2 border-[#8C4B2D]/25">
        <p className="text-xs sm:text-base font-black text-[#8C4B2D] leading-snug">
          🧭 "{currentChallenge.clueText}"
        </p>
        <p className="text-[11px] font-semibold text-[#527D65] mt-1">
          👉 Klik titik lokasi yang tepat pada peta di bawah ini!
        </p>
      </div>

      {/* Hint Accordion */}
      {showHint && (
        <div className="mt-2.5 p-3 rounded-xl bg-[#F7EBD2] border border-[#D99A35] flex items-start gap-2 text-xs text-[#8C4B2D] font-bold animate-in fade-in">
          <HelpCircle className="w-4 h-4 text-[#D99A35] shrink-0 mt-0.5" />
          <span>{currentChallenge.hintText}</span>
        </div>
      )}

      {/* Feedback Alert */}
      {feedbackState.status === 'correct' && (
        <div className="mt-3 p-3 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-emerald-900 text-xs sm:text-sm font-bold flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{feedbackState.message}</span>
          </div>
          <button
            onClick={() => {
              sound.playSuccessChime();
              setShowHint(false);
              onNextChallenge();
            }}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center gap-1 hover:bg-emerald-700 cursor-pointer shrink-0"
          >
            <span>Tantangan Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {feedbackState.status === 'wrong' && (
        <div className="mt-3 p-3 rounded-xl bg-amber-50 border-2 border-amber-500 text-amber-950 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{feedbackState.message}</span>
        </div>
      )}

      {/* Helper Bar */}
      <div className="mt-3 flex items-center justify-between pt-1">
        <button
          onClick={() => {
            sound.playWoodClick();
            setShowHint(!showHint);
          }}
          className="text-xs font-bold text-[#8C4B2D] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#D99A35]" />
          <span>{showHint ? 'Sembunyikan Petunjuk' : 'Butuh Petunjuk Lokasi?'}</span>
        </button>

        <div className="flex items-center gap-1 text-[11px] font-bold text-[#527D65]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Berhadiah +⭐ Bintang Penjelajah</span>
        </div>
      </div>
    </div>
  );
};
