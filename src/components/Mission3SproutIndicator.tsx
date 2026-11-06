import React from 'react';
import { SproutStage } from '../types';
import { Sparkles, Info } from 'lucide-react';

interface Mission3SproutIndicatorProps {
  stage: SproutStage;
  changeNote?: string;
  showEducationalNote?: boolean;
}

export const Mission3SproutIndicator: React.FC<Mission3SproutIndicatorProps> = ({
  stage,
  changeNote,
  showEducationalNote = true,
}) => {
  const getStageConfig = () => {
    switch (stage) {
      case 'berdaun':
        return {
          title: 'Tunas Berdaun Rimbun',
          statusText: 'Kesempatan Pewarisan Budaya Meningkat!',
          pillClass: 'bg-emerald-600 text-white border-emerald-400',
          containerBorder: 'border-emerald-500 bg-emerald-50/90 ring-4 ring-emerald-200/60',
          stemHeight: 'h-16',
          leafCount: 4,
          glowColor: 'from-emerald-400 to-amber-300',
          iconDescription: 'Tunas bertumbuh subur dengan daun hijau cerah & bunga emas mekar',
        };
      case 'kecil':
        return {
          title: 'Tunas Kecil',
          statusText: 'Kesempatan Pewarisan Budaya Menurun',
          pillClass: 'bg-amber-700 text-white border-amber-500',
          containerBorder: 'border-amber-600/70 bg-amber-50/90 ring-2 ring-amber-300/40',
          stemHeight: 'h-8',
          leafCount: 1,
          glowColor: 'from-amber-200 to-stone-200',
          iconDescription: 'Tunas muda berukuran kecil yang membutuhkan perhatian agar tidak layu',
        };
      case 'sedang':
      default:
        return {
          title: 'Tunas Sedang',
          statusText: 'Kondisi Awal / Menunggu Pilihanmu',
          pillClass: 'bg-[#527D65] text-white border-[#8C4B2D]/30',
          containerBorder: 'border-[#527D65] bg-[#F7EBD2]/80 ring-2 ring-[#527D65]/20',
          stemHeight: 'h-12',
          leafCount: 2,
          glowColor: 'from-emerald-200 to-amber-100',
          iconDescription: 'Tunas seimbang siap tumbuh seiring tindakan nyata pelestarianmu',
        };
    }
  };

  const config = getStageConfig();

  return (
    <div className={`rounded-2xl p-3 sm:p-4 border-2 transition-all duration-500 shadow-md ${config.containerBorder}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Animated Plant Visual + Label */}
        <div className="flex items-center gap-3.5">
          {/* Plant Terrarium Pod */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-[#FFFDF8] to-[#EADBBA] border-2 border-[#8C4B2D]/40 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
            {/* Background sun ray halo */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${config.glowColor} opacity-40 transition-opacity duration-700`} />
            
            {/* Ground Soil Mound */}
            <div className="absolute -bottom-2 inset-x-0 h-6 bg-[#6B3E26] rounded-t-full border-t border-[#8C4B2D]/60" />

            {/* SVG Interactive Sprout */}
            <svg
              className="relative z-10 w-12 h-14 sm:w-14 sm:h-16 transition-all duration-700"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stem */}
              {stage === 'kecil' && (
                <path
                  d="M32 50 Q32 38 31 34"
                  stroke="#5A8A4A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              )}
              {stage === 'sedang' && (
                <path
                  d="M32 50 Q33 34 32 24"
                  stroke="#4E8C3B"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              )}
              {stage === 'berdaun' && (
                <path
                  d="M32 50 Q33 28 32 16"
                  stroke="#3B8A28"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              )}

              {/* Leaves */}
              {stage === 'kecil' && (
                <g className="animate-in fade-in zoom-in duration-300">
                  <path
                    d="M31 34 Q38 30 36 24 Q30 25 31 34 Z"
                    fill="#7BB661"
                    stroke="#437730"
                    strokeWidth="1.2"
                  />
                </g>
              )}

              {stage === 'sedang' && (
                <g className="animate-in fade-in zoom-in duration-400">
                  {/* Left leaf */}
                  <path
                    d="M32 30 Q22 24 23 16 Q31 18 32 30 Z"
                    fill="#66AA48"
                    stroke="#387724"
                    strokeWidth="1.3"
                  />
                  {/* Right leaf */}
                  <path
                    d="M32 26 Q42 20 41 12 Q33 14 32 26 Z"
                    fill="#7EC75C"
                    stroke="#387724"
                    strokeWidth="1.3"
                  />
                </g>
              )}

              {stage === 'berdaun' && (
                <g className="animate-in fade-in zoom-in duration-500">
                  {/* Bottom pair */}
                  <path
                    d="M32 34 Q18 30 20 20 Q30 22 32 34 Z"
                    fill="#4DA330"
                    stroke="#2D6B1B"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M32 30 Q46 26 44 16 Q34 18 32 30 Z"
                    fill="#5CB93B"
                    stroke="#2D6B1B"
                    strokeWidth="1.4"
                  />
                  {/* Top crown pair */}
                  <path
                    d="M32 20 Q24 10 28 4 Q33 8 32 20 Z"
                    fill="#72CF4C"
                    stroke="#2D6B1B"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M32 18 Q40 8 36 2 Q31 6 32 18 Z"
                    fill="#8BE362"
                    stroke="#2D6B1B"
                    strokeWidth="1.4"
                  />
                  {/* Golden flower blossom bud on top */}
                  <circle cx="32" cy="4" r="3.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
                </g>
              )}
            </svg>

            {/* Sparkle sparkles badge when blooming */}
            {stage === 'berdaun' && (
              <div className="absolute top-1 right-1 animate-bounce text-amber-500">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* Text Title & Indicator Meaning */}
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider">
                Indikator: Kesempatan Pewarisan Budaya
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border shadow-xs ${config.pillClass}`}>
                {config.title}
              </span>
            </div>
            <p className="text-sm font-extrabold text-[#3B2011] mt-0.5">
              {config.statusText}
            </p>
            {changeNote && (
              <p className="text-xs font-semibold text-[#8C4B2D] mt-0.5 max-w-md">
                🌱 {changeNote}
              </p>
            )}
          </div>
        </div>

        {/* Right: Stage Step Dots */}
        <div className="flex items-center gap-1.5 self-center sm:self-auto px-3 py-1.5 rounded-xl bg-white/70 border border-[#8C4B2D]/20">
          <div className="flex items-center gap-1 text-[11px] font-black text-[#8C4B2D]">
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                stage === 'kecil' ? 'bg-amber-600 scale-125' : 'bg-[#8C4B2D]/20'
              }`}
              title="Tunas Kecil"
            />
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                stage === 'sedang' ? 'bg-[#527D65] scale-125' : 'bg-[#8C4B2D]/20'
              }`}
              title="Tunas Sedang"
            />
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                stage === 'berdaun' ? 'bg-emerald-500 scale-125' : 'bg-[#8C4B2D]/20'
              }`}
              title="Tunas Berdaun"
            />
          </div>
        </div>
      </div>

      {/* Educational context footnote */}
      {showEducationalNote && (
        <div className="mt-2.5 pt-2 border-t border-[#8C4B2D]/15 flex items-center gap-1.5 text-[11px] text-[#8C4B2D]/80 font-medium">
          <Info className="w-3.5 h-3.5 shrink-0 text-[#8C4B2D]/70" />
          <span>
            <em>Catatan: Indikator ini menggambarkan kondisi dalam cerita simulasi, bukan ukuran nyata kelestarian budaya Indonesia.</em>
          </span>
        </div>
      )}
    </div>
  );
};
