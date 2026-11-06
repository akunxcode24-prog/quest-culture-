import React, { useState } from 'react';
import { REGION_CHECKPOINTS } from '../data/culturalData';
import { RegionCheckpoint } from '../types';
import { MapPin, Compass, Sparkles, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { sound } from '../utils/audio';

interface MissionMapViewProps {
  onBackToHome: () => void;
}

export const MissionMapView: React.FC<MissionMapViewProps> = ({ onBackToHome }) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionCheckpoint>(REGION_CHECKPOINTS[0]);

  const handleSelectRegion = (region: RegionCheckpoint) => {
    sound.playWoodClick();
    setSelectedRegion(region);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <button
            onClick={() => {
              sound.playWoodClick();
              onBackToHome();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#8C4B2D] hover:underline mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-[#8C4B2D] tracking-tight flex items-center gap-2">
            <Compass className="w-7 h-7 text-[#D99A35]" />
            <span>Peta Petualangan Nusantara</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#8C4B2D]/80">
            Jelajahi titik-titik pos budaya Nusantara di tiap pulau besar Indonesia
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-bold text-[#8C4B2D] bg-[#FFFBF2] px-3.5 py-2 rounded-xl border border-[#8C4B2D]/20">
          <span className="flex items-center gap-1 text-[#527D65]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#527D65]" />
            <span>Pos Terbuka</span>
          </span>
          <span className="text-[#8C4B2D]/30">|</span>
          <span className="flex items-center gap-1 text-[#8C4B2D]/60">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8C4B2D]/40" />
            <span>Pos Lanjutan</span>
          </span>
        </div>
      </div>

      {/* Map Board Canvas Container */}
      <div className="wood-panel rounded-3xl p-4 sm:p-6 border-4 border-[#8C4B2D] shadow-xl relative overflow-hidden bg-[#EEDDC0]">
        
        {/* Ocean Background Texture */}
        <div className="relative w-full aspect-16/9 sm:aspect-21/9 min-h-[320px] rounded-2xl overflow-hidden bg-[#264E62] border-2 border-[#8C4B2D]/40 shadow-inner flex items-center justify-center">
          
          {/* Subtle Nautical Compass Rose in Ocean */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-20 pointer-events-none">
            <Compass className="w-24 h-24 sm:w-32 sm:h-32 text-amber-200" />
          </div>

          {/* SVG Outline Representation of Indonesian Archipelago */}
          <svg
            className="w-full h-full p-4 sm:p-8"
            viewBox="0 0 1000 450"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ocean Wave lines */}
            <path d="M 50 100 Q 150 120 250 100 T 450 100" stroke="#36667E" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4" />
            <path d="M 550 350 Q 650 370 750 350 T 950 350" stroke="#36667E" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4" />

            {/* Sumatera */}
            <path
              d="M 120 70 L 160 110 L 220 220 L 260 270 L 230 280 L 170 230 L 110 130 Z"
              fill="#527D65"
              stroke="#D99A35"
              strokeWidth="2"
              className="hover:fill-[#629277] transition-colors cursor-pointer"
              onClick={() => handleSelectRegion(REGION_CHECKPOINTS[0])}
            />
            {/* Jawa */}
            <path
              d="M 280 300 L 460 310 L 490 325 L 430 330 L 290 320 Z"
              fill="#527D65"
              stroke="#D99A35"
              strokeWidth="2"
              className="hover:fill-[#629277] transition-colors cursor-pointer"
              onClick={() => handleSelectRegion(REGION_CHECKPOINTS[1])}
            />
            {/* Kalimantan */}
            <path
              d="M 370 120 L 460 110 L 490 190 L 450 250 L 370 230 L 360 170 Z"
              fill="#527D65"
              stroke="#D99A35"
              strokeWidth="2"
              className="hover:fill-[#629277] transition-colors cursor-pointer"
              onClick={() => handleSelectRegion(REGION_CHECKPOINTS[2])}
            />
            {/* Sulawesi */}
            <path
              d="M 550 130 L 610 140 L 580 180 L 620 210 L 590 270 L 560 240 L 560 180 Z"
              fill="#527D65"
              stroke="#D99A35"
              strokeWidth="2"
              className="hover:fill-[#629277] transition-colors cursor-pointer"
              onClick={() => handleSelectRegion(REGION_CHECKPOINTS[3])}
            />
            {/* Bali & Nusa Tenggara */}
            <path
              d="M 505 325 L 525 325 L 550 335 L 610 340 L 650 345 L 600 350 L 510 335 Z"
              fill="#8C6E52"
              stroke="#D99A35"
              strokeWidth="2"
              className="hover:fill-[#9E7D5E] transition-colors cursor-pointer"
              onClick={() => handleSelectRegion(REGION_CHECKPOINTS[4])}
            />
            {/* Maluku */}
            <ellipse cx="710" cy="190" rx="20" ry="30" fill="#8C6E52" stroke="#D99A35" strokeWidth="1.5" />
            <ellipse cx="730" cy="240" rx="18" ry="25" fill="#8C6E52" stroke="#D99A35" strokeWidth="1.5" />
            {/* Papua */}
            <path
              d="M 770 180 L 870 190 L 930 250 L 920 320 L 840 310 L 790 270 L 760 220 Z"
              fill="#8C6E52"
              stroke="#D99A35"
              strokeWidth="2"
              className="hover:fill-[#9E7D5E] transition-colors cursor-pointer"
              onClick={() => handleSelectRegion(REGION_CHECKPOINTS[5])}
            />
          </svg>

          {/* Interactive HTML Map Pins on Top */}
          {REGION_CHECKPOINTS.map((region) => {
            const isSelected = selectedRegion.id === region.id;
            return (
              <button
                key={region.id}
                onClick={() => handleSelectRegion(region)}
                style={{
                  left: `${region.coordinates.x}%`,
                  top: `${region.coordinates.y}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform duration-200 ${
                  isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
              >
                <div
                  className={`relative flex items-center justify-center p-2 rounded-2xl border-2 shadow-xl ${
                    isSelected
                      ? 'bg-[#D99A35] border-white text-white ring-4 ring-[#D99A35]/50'
                      : region.unlocked
                      ? 'bg-[#527D65] border-[#F7EBD2] text-[#F7EBD2]'
                      : 'bg-[#8C4B2D]/80 border-[#D99A35] text-amber-200'
                  }`}
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  
                  {/* Pin Label Tooltip */}
                  <div className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-0.5 rounded-lg bg-[#201007]/90 text-white text-[11px] font-black whitespace-nowrap border border-[#D99A35]/40 shadow-md">
                    {region.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Region Detailed Drawer / Card */}
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-[#FFFBF2] border-2 border-[#8C4B2D]/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#8C4B2D] text-white text-[11px] font-black uppercase">
                {selectedRegion.island}
              </span>
              {selectedRegion.unlocked ? (
                <span className="flex items-center gap-1 text-xs font-bold text-[#527D65]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pos Ekspedisi Terbuka</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-bold text-[#8C4B2D]/70">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Terbuka pada Level 2</span>
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-black text-[#8C4B2D]">
              Pusaka Budaya: {selectedRegion.culturalHighlight}
            </h3>

            <p className="text-xs sm:text-sm text-[#4A2D1B] font-medium leading-relaxed max-w-3xl">
              💡 {selectedRegion.trivia}
            </p>
          </div>

          <div className="shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-[#F7EBD2] border border-[#8C4B2D]/20 text-xs font-extrabold text-[#8C4B2D] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D99A35]" />
              <span>{selectedRegion.missionConnection}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
