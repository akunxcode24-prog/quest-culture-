import React from 'react';
import { UserProfile } from '../types';
import { BADGES_DATA } from '../data/culturalData';
import { Award, Star, Zap, Compass, CheckCircle2, Lock } from 'lucide-react';
import { sound } from '../utils/audio';

interface AchievementsViewProps {
  user: UserProfile;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ user }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#8C4B2D] tracking-tight flex items-center gap-2">
          <Award className="w-7 h-7 text-[#D99A35]" />
          <span>Lencana & Pencapaian Petualang</span>
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-[#8C4B2D]/80">
          Bukti keberhasilan penjelajahan budaya siswa di CultureQuest
        </p>
      </div>

      {/* Explorer Trophy Banner */}
      <div className="wood-panel rounded-3xl p-5 sm:p-6 border-3 border-[#8C4B2D] shadow-md flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#D99A35] to-[#8C4B2D] flex items-center justify-center text-white text-3xl shadow-lg border-2 border-white/50">
            🏆
          </div>
          <div>
            <span className="text-xs font-black text-[#D99A35] uppercase tracking-wider">
              Tingkat Petualang
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#8C4B2D]">
              {user.levelTitle}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#4A2D1B]/85 mt-0.5">
              Telah mengumpulkan {user.stars} Bintang dan {user.xp} XP Budaya
            </p>
          </div>
        </div>

        {/* Three KPI Boxes */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="p-3 rounded-2xl bg-[#FFFBF2] border border-[#8C4B2D]/20 text-center">
            <Star className="w-5 h-5 text-[#D99A35] mx-auto fill-[#D99A35]" />
            <div className="text-lg font-black text-[#8C4B2D] tabular-nums mt-1">{user.stars}</div>
            <div className="text-[10px] font-bold text-[#8C4B2D]/70 uppercase">Bintang</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#FFFBF2] border border-[#8C4B2D]/20 text-center">
            <Zap className="w-5 h-5 text-[#527D65] mx-auto fill-[#527D65]" />
            <div className="text-lg font-black text-[#8C4B2D] tabular-nums mt-1">{user.xp}</div>
            <div className="text-[10px] font-bold text-[#8C4B2D]/70 uppercase">XP</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#FFFBF2] border border-[#8C4B2D]/20 text-center">
            <Award className="w-5 h-5 text-[#315B70] mx-auto" />
            <div className="text-lg font-black text-[#8C4B2D] tabular-nums mt-1">{user.unlockedBadges.length}</div>
            <div className="text-[10px] font-bold text-[#8C4B2D]/70 uppercase">Lencana</div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div>
        <h3 className="text-lg font-black text-[#8C4B2D] mb-3 flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#8C4B2D]" />
          <span>Daftar Lencana Budaya Nusantara</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES_DATA.map((badge) => {
            const isUnlocked = user.unlockedBadges.includes(badge.id) || badge.unlocked;
            return (
              <div
                key={badge.id}
                onClick={() => sound.playWoodClick()}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isUnlocked
                    ? 'wood-panel border-[#8C4B2D] shadow-sm'
                    : 'bg-[#EFE4CF]/60 border-[#8C4B2D]/20 opacity-75'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border overflow-hidden ${
                      isUnlocked
                        ? 'bg-[#D99A35] text-white border-white/50 shadow-md text-xl'
                        : 'bg-[#8C4B2D]/15 text-[#8C4B2D]/50 border-transparent text-xl'
                    }`}
                  >
                    {isUnlocked ? (
                      badge.id === 'badge-penjelajah-budaya' ? (
                        <img
                          src="/src/assets/images/badge_penjelajah_budaya_1793969895795.jpg"
                          alt="Lencana Penjelajah Budaya"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : badge.id === 'badge-detektif-budaya' ? (
                        <img
                          src="/src/assets/images/badge_detektif_budaya_1793971905349.jpg"
                          alt="Lencana Detektif Budaya"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : badge.id === 'badge-penjaga-warisan' ? (
                        <img
                          src="/src/assets/images/mission_penjaga_warisan_1793969035388.jpg"
                          alt="Lencana Perisai Pusaka Nusantara"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : badge.id === 'badge-duta-budaya' ? (
                        <img
                          src="/src/assets/images/mission_aksi_bermakna_1793969036434.jpg"
                          alt="Lencana Duta Budaya Nusantara"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        '🏅'
                      )
                    ) : (
                      '🔒'
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-black uppercase text-[#D99A35]">
                        {badge.category}
                      </span>
                      {isUnlocked ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#527D65]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Terbuka</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#8C4B2D]/50">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Terkunci</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-black text-[#8C4B2D] truncate mt-0.5">
                      {badge.name}
                    </h4>
                    <p className="text-xs text-[#4A2D1B]/80 font-medium mt-1 leading-snug">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
