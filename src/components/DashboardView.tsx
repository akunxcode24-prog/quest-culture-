import React from 'react';
import { UserProfile, Mission } from '../types';
import { CultuMascot } from './CultuMascot';
import { MissionCard } from './MissionCard';
import { Compass, Star, Zap, Award, Map, ArrowRight, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

interface DashboardViewProps {
  user: UserProfile;
  missions: Mission[];
  onSelectMission: (mission: Mission) => void;
  onNavigateToMap: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  missions,
  onSelectMission,
  onNavigateToMap,
}) => {
  const completedCount = user.completedMissions.length;
  const progressPercent = Math.round((completedCount / missions.length) * 100);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <section className="relative rounded-3xl overflow-hidden wood-panel p-5 sm:p-7 border-3 border-[#8C4B2D] shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#8C4B2D] text-white text-xs font-black tracking-wide uppercase">
                {user.levelTitle} · Tingkat {user.level}
              </span>
              <span className="text-xs font-bold text-[#8C4B2D]/70">
                ID Riset: <strong className="text-[#8C4B2D]">{user.anonymousId}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#8C4B2D] tracking-tight">
              Selamat datang, Petualang {user.username}!
            </h1>
            <p className="text-sm sm:text-base text-[#50301B] mt-1 font-semibold max-w-2xl">
              Nusantara memanggilmu! Pilih misi belajarmu, kumpulkan bintang, dan jadilah Penjaga Pusaka Budaya Indonesia.
            </p>
          </div>

          {/* Player Stats Capsule Strip */}
          <div className="w-full lg:w-auto flex items-center justify-around sm:justify-start gap-3 sm:gap-4 p-3.5 rounded-2xl bg-[#FFFBF2] border-2 border-[#8C4B2D]/25 shadow-xs">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-[#D99A35] font-black text-lg sm:text-xl">
                <Star className="w-5 h-5 fill-[#D99A35]" />
                <span className="tabular-nums">{user.stars}</span>
              </div>
              <span className="text-[11px] font-bold text-[#8C4B2D]/70 uppercase tracking-wider">Bintang</span>
            </div>

            <div className="h-8 w-px bg-[#8C4B2D]/20" />

            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-[#527D65] font-black text-lg sm:text-xl">
                <Zap className="w-5 h-5 fill-[#527D65]" />
                <span className="tabular-nums">{user.xp}</span>
              </div>
              <span className="text-[11px] font-bold text-[#8C4B2D]/70 uppercase tracking-wider">XP Budaya</span>
            </div>

            <div className="h-8 w-px bg-[#8C4B2D]/20" />

            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-[#315B70] font-black text-lg sm:text-xl">
                <Award className="w-5 h-5" />
                <span className="tabular-nums">{user.unlockedBadges.length}</span>
              </div>
              <span className="text-[11px] font-bold text-[#8C4B2D]/70 uppercase tracking-wider">Lencana</span>
            </div>
          </div>
        </div>

        {/* Adventure Progress Bar */}
        <div className="mt-5 pt-4 border-t border-[#8C4B2D]/20">
          <div className="flex items-center justify-between text-xs font-bold text-[#8C4B2D] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#D99A35]" />
              <span>Progres Ekspedisi Budaya Nusantara</span>
            </span>
            <span className="tabular-nums font-black">{progressPercent}% Selesai ({completedCount}/{missions.length} Misi)</span>
          </div>

          <div className="w-full h-3.5 rounded-full bg-[#E8D4B5] overflow-hidden p-0.5 border border-[#8C4B2D]/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#D99A35] to-[#527D65] transition-all duration-500"
              style={{ width: `${Math.max(8, progressPercent)}%` }}
            />
          </div>
        </div>
      </section>

      {/* Guide Cultu Mascot Feature */}
      <CultuMascot username={user.username} />

      {/* Map Teaser Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#315B70] to-[#1F3E4F] text-white p-5 sm:p-6 shadow-md border-3 border-[#D99A35]/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-left">
          <div className="w-14 h-14 rounded-2xl bg-[#D99A35] flex items-center justify-center text-white shrink-0 shadow-lg">
            <Map className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight text-[#F7EBD2]">
              Peta Petualangan Nusantara
            </h3>
            <p className="text-xs sm:text-sm text-[#F7EBD2]/85 font-medium mt-0.5">
              Jelajahi titik-titik pusaka budaya dari Sabang sampai Merauke secara interaktif.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playWoodClick();
            onNavigateToMap();
          }}
          className="wood-button px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-white flex items-center gap-2 uppercase tracking-wider shrink-0 cursor-pointer shadow-md"
        >
          <span>Buka Peta Kepulauan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* 4 Mission Cards Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#8C4B2D] tracking-tight">
              Misi CultureQuest
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#8C4B2D]/80">
              Selesaikan 4 misi beruntun untuk membuka gelar Duta Budaya Nusantara
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#527D65]">
            <ShieldCheck className="w-4 h-4" />
            <span>Kurikulum SD Merdeka Belajar</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onSelectMission={onSelectMission}
            />
          ))}
        </div>
      </section>

      {/* Cultural Wisdom Footer Banner */}
      <section className="p-4 rounded-2xl bg-[#FFFBF2] border-2 border-[#8C4B2D]/20 text-center">
        <p className="text-xs sm:text-sm font-bold text-[#8C4B2D] italic">
          "Bhinneka Tunggal Ika — Berbeda-beda tetapi tetap satu jua."
        </p>
        <p className="text-[11px] text-[#8C4B2D]/70 font-semibold mt-0.5">
          Mari lestarikan adat, rumah, musik, dan tradisi luhur bangsa dengan bangga!
        </p>
      </section>

    </div>
  );
};
