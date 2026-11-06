import React from 'react';
import { Mission } from '../types';
import { Lock, ArrowRight, Star, Zap, Award } from 'lucide-react';
import { sound } from '../utils/audio';

interface MissionCardProps {
  mission: Mission;
  onSelectMission: (mission: Mission) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, onSelectMission }) => {
  const isLocked = mission.status === 'locked';

  const handleClick = () => {
    sound.playWoodClick();
    onSelectMission(mission);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative rounded-3xl overflow-hidden border-3 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isLocked
          ? 'bg-[#F0E4CE] border-[#8C4B2D]/30 opacity-90 hover:opacity-100 hover:border-[#8C4B2D]/60'
          : 'bg-[#FFFBF2] border-[#8C4B2D] shadow-lg hover:-translate-y-1 hover:shadow-2xl'
      }`}
    >
      {/* Card Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#8C4B2D]/10">
        <img
          src={mission.image}
          alt={mission.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isLocked ? 'grayscale-[35%] group-hover:scale-102' : 'group-hover:scale-105'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Top Floating Order Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#2A160C]/85 backdrop-blur-md text-white text-xs font-black shadow-md border border-[#D99A35]/40">
          <span className="text-[#D99A35]">MISI {mission.orderNumber}</span>
          <span className="text-white/40">·</span>
          <span className="text-[11px] font-medium text-[#F7EBD2]">{mission.category}</span>
        </div>

        {/* Locked Overlay or Star Tag */}
        <div className="absolute top-3 right-3">
          {isLocked ? (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md text-amber-200 text-xs font-bold border border-amber-300/40">
              <Lock className="w-3.5 h-3.5" />
              <span>Terkunci</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#527D65] text-white text-xs font-black shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>Tersedia</span>
            </div>
          )}
        </div>

        {/* Gradient Scrim for crisp text separation */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#8C4B2D] group-hover:text-[#6c351b] transition-colors leading-snug">
            {mission.title}
          </h3>
          <p className="text-xs text-[#8C4B2D]/80 font-bold mt-1 line-clamp-1">
            {mission.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-[#4A2D1B]/85 mt-2.5 line-clamp-3 leading-relaxed font-medium">
            {mission.description}
          </p>
        </div>

        {/* Bottom Reward Metadata + Action Affordance */}
        <div className="mt-4 pt-3.5 border-t border-[#8C4B2D]/15 flex items-center justify-between gap-2">
          {/* Unboxed Rewards Metadata */}
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#8C4B2D]/90">
            <span className="flex items-center gap-1 text-[#D99A35]">
              <Star className="w-3.5 h-3.5 fill-[#D99A35]" />
              <span>+{mission.starReward}</span>
            </span>
            <span className="text-[#8C4B2D]/40">·</span>
            <span className="flex items-center gap-1 text-[#527D65]">
              <Zap className="w-3.5 h-3.5 fill-[#527D65]" />
              <span>+{mission.xpReward} XP</span>
            </span>
            <span className="text-[#8C4B2D]/40">·</span>
            <span className="flex items-center gap-1 text-[#315B70]" title={mission.badgeReward}>
              <Award className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Interactive Button */}
          <button
            type="button"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              isLocked
                ? 'bg-[#8C4B2D]/15 text-[#8C4B2D] hover:bg-[#8C4B2D]/25'
                : 'bg-[#D99A35] text-white hover:bg-[#c08426] shadow-xs group-hover:scale-105'
            }`}
          >
            <span>{isLocked ? 'Lihat Info' : 'Buka Misi'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
