import React from 'react';
import { MISSION_1_ITEMS } from '../data/mission1Data';
import { Award, Star, Zap, CheckCircle2, ArrowRight, Map, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission1CompletionProps {
  username: string;
  onBackToMapMisi: () => void;
  onNextMission2: () => void;
  onReplayMission: () => void;
}

export const Mission1Completion: React.FC<Mission1CompletionProps> = ({
  username,
  onBackToMapMisi,
  onNextMission2,
  onReplayMission,
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-400 text-left">
      
      {/* Main Celebration Banner */}
      <div className="wood-panel rounded-3xl p-6 sm:p-8 border-4 border-[#D99A35] shadow-2xl bg-[#FFFBF2] relative overflow-hidden text-center">
        
        {/* Subtle decorative confetti accents */}
        <div className="absolute top-2 left-3 text-2xl select-none opacity-40">✨</div>
        <div className="absolute top-2 right-3 text-2xl select-none opacity-40">🎉</div>

        {/* Badge Medal Showcase */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#D99A35] shadow-2xl p-1 bg-gradient-to-b from-[#FFF5DC] to-[#E7BF73] animate-bounce" style={{ animationDuration: '2.5s' }}>
            <img
              src="/src/assets/images/badge_penjelajah_budaya_1793969895795.jpg"
              alt="Lencana Penjelajah Budaya"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mt-3 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#527D65] text-white text-xs font-black uppercase tracking-wider shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Misi 1 Selesai dengan Sempurna!</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#8C4B2D] mt-2 tracking-tight">
            Selamat, {username}!
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#D99A35] mt-1">
            Kamu Resmi Dinobatkan sebagai "Penjelajah Budaya Nusantara" 🏅
          </p>
        </div>

        {/* Speech from CULTU */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#F7EBD2] border-2 border-[#8C4B2D]/30 flex flex-col sm:flex-row items-center gap-4 text-left shadow-xs">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#8C4B2D] shrink-0 bg-white">
            <img
              src="/src/assets/images/cultu_mascot_guide_1793969033044.jpg"
              alt="Cultu Pemandu"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-[#8C4B2D] tracking-wider block">
              Pesan Penghargaan Cultu
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#3B2011] mt-0.5 leading-relaxed">
              "Luar biasa, sahabatku! Kamu berhasil mengarungi peta kepulauan Indonesia dan mengumpulkan 8 pusaka budaya Nusantara. Perjalananmu adalah bukti nyata cinta pada warisan leluhur bangsa!"
            </p>
          </div>
        </div>

        {/* Journey Summary Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#FFF8EB] border border-[#8C4B2D]/20 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#527D65] tabular-nums">
              8 / 8
            </div>
            <div className="text-[11px] font-bold text-[#8C4B2D]/70 uppercase">Kartu Terkumpul</div>
          </div>
          <div className="border-x border-[#8C4B2D]/20">
            <div className="text-xl sm:text-2xl font-black text-[#D99A35] flex items-center justify-center gap-1 tabular-nums">
              <Star className="w-5 h-5 fill-[#D99A35]" />
              <span>+3</span>
            </div>
            <div className="text-[11px] font-bold text-[#8C4B2D]/70 uppercase">Bintang Didapat</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#315B70] flex items-center justify-center gap-1 tabular-nums">
              <Zap className="w-5 h-5 fill-[#315B70]" />
              <span>+100</span>
            </div>
            <div className="text-[11px] font-bold text-[#8C4B2D]/70 uppercase">XP Budaya</div>
          </div>
        </div>

        {/* 8 Discovered Heritage List */}
        <div className="mt-6 text-left">
          <h4 className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider mb-2.5">
            Ringkasan 8 Pusaka Budaya yang Telah Kamu Pelajari:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {MISSION_1_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-white border border-[#8C4B2D]/20 flex items-center gap-2 shadow-2xs"
              >
                <div className="w-6 h-6 rounded-lg bg-[#527D65] text-white flex items-center justify-center text-xs font-black shrink-0">
                  ✓
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-[#8C4B2D] truncate">{item.name}</div>
                  <div className="text-[10px] text-[#527D65] font-bold truncate">{item.region}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="mt-8 pt-6 border-t-2 border-[#8C4B2D]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                sound.playWoodClick();
                onReplayMission();
              }}
              className="px-4 py-3 rounded-2xl bg-[#8C4B2D]/10 hover:bg-[#8C4B2D]/20 text-[#8C4B2D] text-xs font-black flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Jelajah Ulang Peta</span>
            </button>

            <button
              onClick={() => {
                sound.playWoodClick();
                onBackToMapMisi();
              }}
              className="px-5 py-3 rounded-2xl bg-[#FFFBF2] hover:bg-[#F3E3C6] border-2 border-[#8C4B2D]/30 text-[#8C4B2D] text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Map className="w-4 h-4" />
              <span>KEMBALI KE PETA MISI</span>
            </button>
          </div>

          <button
            onClick={() => {
              sound.playSuccessChime();
              onNextMission2();
            }}
            className="wood-button px-6 py-3.5 sm:py-4 rounded-2xl text-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl w-full sm:w-auto group"
          >
            <span>LANJUT MISI 2</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
