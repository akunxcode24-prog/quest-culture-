import React, { useState } from 'react';
import { Sparkles, HelpCircle, CheckCircle2, XCircle, ArrowRight, ArrowLeft, Award, Lightbulb } from 'lucide-react';
import { MISSION_2_RIDDLES } from '../data/mission2Data';
import { sound } from '../utils/audio';

interface Mission2RiddleChallengeProps {
  onBackToSorting: () => void;
  onFinishRiddles: (score: number) => void;
}

export const Mission2RiddleChallenge: React.FC<Mission2RiddleChallengeProps> = ({
  onBackToSorting,
  onFinishRiddles,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentRiddle = MISSION_2_RIDDLES[currentIndex];
  const isLastRiddle = currentIndex === MISSION_2_RIDDLES.length - 1;

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    sound.playWoodClick();
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isSubmitted) return;

    const chosenOption = currentRiddle.options.find((o) => o.id === selectedOptionId);
    if (!chosenOption) return;

    setIsSubmitted(true);

    if (chosenOption.isCorrect) {
      sound.playSuccessChime();
      setScore((prev) => prev + 1);
    } else {
      sound.playErrorBuzz();
    }
  };

  const handleNextRiddle = () => {
    sound.playWoodClick();
    if (isLastRiddle) {
      onFinishRiddles(score);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
    }
  };

  const chosenOption = currentRiddle.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FFFBF2] border-2 border-[#8C4B2D]/30 shadow-sm">
        <button
          onClick={() => {
            sound.playWoodClick();
            onBackToSorting();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-[#8C4B2D] hover:bg-[#8C4B2D]/10 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Kotak Investigasi</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F7EBD2] border border-[#8C4B2D]/20 text-xs font-black text-[#8C4B2D]">
          <HelpCircle className="w-4 h-4 text-[#D99A35]" />
          <span>Petunjuk {currentIndex + 1} dari {MISSION_2_RIDDLES.length}</span>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-2">
        {MISSION_2_RIDDLES.map((_, idx) => (
          <div
            key={idx}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-8 bg-[#D99A35]'
                : idx < currentIndex
                ? 'w-2.5 bg-[#527D65]'
                : 'w-2.5 bg-[#8C4B2D]/20'
            }`}
          />
        ))}
      </div>

      {/* Riddle Card */}
      <div className="wood-panel rounded-3xl p-6 sm:p-8 border-4 border-[#8C4B2D] bg-[#FFFBF2] shadow-xl space-y-5">
        <div className="flex items-center gap-2.5 text-xs font-black uppercase text-[#D99A35] tracking-wider">
          <Sparkles className="w-4 h-4 text-[#D99A35]" />
          <span>Tebak Dari Petunjuk &middot; Tantangan Detektif</span>
        </div>

        {/* Clue Prompt */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF8EB] to-[#F5E6CA] border-2 border-[#D99A35] shadow-inner space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8C4B2D]">
            <Lightbulb className="w-4 h-4 text-[#D99A35]" />
            <span>Misteri Warisan Budaya #{currentIndex + 1}:</span>
          </div>
          <p className="text-base sm:text-lg font-black text-[#3B2011] leading-relaxed">
            &ldquo;{currentRiddle.clueText}&rdquo;
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 pt-2">
          {currentRiddle.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const showCorrect = isSubmitted && option.isCorrect;
            const showWrong = isSubmitted && isSelected && !option.isCorrect;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option.id)}
                disabled={isSubmitted}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                  showCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                    : showWrong
                    ? 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-300'
                    : isSelected
                    ? 'bg-[#FFF8EB] border-[#D99A35] ring-2 ring-[#D99A35]/40 text-[#3B2011]'
                    : 'bg-white border-[#8C4B2D]/20 hover:border-[#8C4B2D] text-[#3B2011]'
                }`}
              >
                <div>
                  <span className="text-sm sm:text-base font-black block">
                    {option.label}
                  </span>
                  <span className="text-xs font-semibold text-[#8C4B2D]/80 mt-0.5 block">
                    {option.typeLabel}
                  </span>
                </div>

                <div>
                  {showCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  )}
                  {showWrong && (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                  {!isSubmitted && (
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all ${
                        isSelected
                          ? 'border-[#D99A35] bg-[#D99A35]'
                          : 'border-[#8C4B2D]/30'
                      }`}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation upon submit */}
        {isSubmitted && (
          <div
            className={`p-4 rounded-2xl border-2 text-xs sm:text-sm font-semibold leading-relaxed animate-in fade-in duration-200 ${
              chosenOption?.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <span className="font-black block mb-1">
              {chosenOption?.isCorrect ? '✅ Analisis Detektif Tepat!' : '💡 Catatan Detektif:'}
            </span>
            <p>{currentRiddle.explanation}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-2 flex justify-end">
          {!isSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOptionId}
              className={`wood-button px-6 py-3 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider cursor-pointer shadow-md transition-all ${
                !selectedOptionId ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
              }`}
            >
              KIRIM JAWABAN
            </button>
          ) : (
            <button
              onClick={handleNextRiddle}
              className="wood-button px-6 py-3 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider cursor-pointer shadow-md active:scale-95 flex items-center gap-2"
            >
              <span>{isLastRiddle ? 'LIHAT HASIL MISI DETEKTIF' : 'PETUNJUK BERIKUTNYA'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
