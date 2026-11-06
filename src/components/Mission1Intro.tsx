import React from 'react';
import { ArrowLeft, Compass, Sparkles, Map, BookOpen, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission1IntroProps {
  onStartExplore: () => void;
  onBackToDashboard: () => void;
  username: string;
  collectedCount: number;
}

export const Mission1Intro: React.FC<Mission1IntroProps> = ({
  onStartExplore,
  onBackToDashboard,
  username,
  collectedCount,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 text-left">
      {/* Top Back Action */}
      <button
        onClick={() => {
          sound.playWoodClick();
          onBackToDashboard();
        }}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#8C4B2D] hover:underline cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Kembali ke Dashboard Utama</span>
      </button>

      {/* Main Intro Card */}
      <div className="wood-panel rounded-3xl p-6 sm:p-8 border-4 border-[#8C4B2D] shadow-2xl relative overflow-hidden bg-[#FFFBF2]">
        
        {/* Top Header Tag */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8C4B2D] text-white text-xs font-black uppercase tracking-wider shadow-sm">
            <Compass className="w-4 h-4 text-[#D99A35] animate-spin" style={{ animationDuration: '10s' }} />
            <span>Misi 1 · Eksplorasi Budaya</span>
          </div>

          <div className="text-xs font-extrabold text-[#527D65] flex items-center gap-1.5 bg-[#527D65]/10 px-3 py-1 rounded-xl border border-[#527D65]/20">
            <Sparkles className="w-4 h-4" />
            <span>8 Kartu Budaya Menantimu</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-black text-[#8C4B2D] tracking-tight leading-tight">
          Jelajah Warisan Nusantara
        </h1>
        <p className="text-sm sm:text-base text-[#4A2D1B] font-semibold mt-2 leading-relaxed">
          "Indonesia memiliki beragam warisan budaya yang menarik untuk dikenal. Ayo, jelajahi berbagai daerah dan temukan kekayaan budaya Nusantara!"
        </p>

        {/* Hero Visual Image for Misi 1 */}
        <div className="mt-5 relative aspect-16/8 sm:aspect-16/7 w-full rounded-2xl overflow-hidden border-3 border-[#8C4B2D] shadow-inner bg-[#2D160A]">
          <img
            src="/assets/aistudio/Golden-Hour_Minangkabau_Village_Adventure_9a58bc89.png"
            alt="Petualangan Misi 1 Jelajah Warisan Nusantara"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md text-white text-xs font-black border border-white/20">
            <span>Eksplorasi Desa Adat Minangkabau &middot; Jelajah Budaya Nusantara</span>
          </div>
        </div>

        {/* Mascot CULTU Guide Dialogue Box */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#F7EBD2] border-2 border-[#D99A35] flex flex-col sm:flex-row items-center gap-4 sm:gap-5 shadow-sm">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#8C4B2D] shadow-md bg-white">
              <img
                src="/src/assets/images/cultu_mascot_guide_1793969033044.jpg"
                alt="Cultu Pemandu Budaya"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#8C4B2D] text-white text-[10px] font-black uppercase">
              CULTU
            </span>
          </div>

          <div className="flex-1 text-left">
            <div className="text-[11px] font-extrabold text-[#D99A35] uppercase tracking-wider mb-1">
              Pesan Pemandu Budaya
            </div>
            <p className="text-sm sm:text-base font-bold text-[#3B2011] leading-relaxed">
              "Halo, Penjelajah Budaya {username}! Tahukah kamu bahwa setiap daerah di Indonesia memiliki warisan budaya yang unik? Yuk, kita temukan dan kenali bersama!"
            </p>
          </div>
        </div>

        {/* Mission Objectives & Targets */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#FFF8EB] border border-[#8C4B2D]/20">
            <h3 className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <BookOpen className="w-4 h-4 text-[#8C4B2D]" />
              <span>Tujuan Pembelajaran Misi 1</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-[#3B2011] font-semibold">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#527D65] shrink-0 mt-0.5" />
                <span>Mengenal keberagaman warisan budaya dari berbagai pulau Nusantara.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#527D65] shrink-0 mt-0.5" />
                <span>Mengetahui asal daerah dan letak geografisnya di peta Indonesia.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#527D65] shrink-0 mt-0.5" />
                <span>Memahami fungsi, kegunaan, dan nilai makna luhur budaya.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF8EB] border border-[#8C4B2D]/20 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Map className="w-4 h-4 text-[#527D65]" />
                <span>Status Penjelajahanmu</span>
              </h3>
              <p className="text-xs font-bold text-[#3B2011] leading-relaxed">
                Kamu telah mengumpulkan <strong>{collectedCount} dari 8</strong> kartu budaya Nusantara.
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-[#8C4B2D]/15 flex items-center justify-between text-xs font-bold text-[#8C4B2D]">
              <span>Hadiah Selesai:</span>
              <span className="text-[#D99A35] font-black">Lencana Penjelajah Budaya + ⭐ 3 Bintang</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t-2 border-[#8C4B2D]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => {
              sound.playWoodClick();
              onBackToDashboard();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#8C4B2D]/10 hover:bg-[#8C4B2D]/20 text-[#8C4B2D] text-xs sm:text-sm font-black transition-colors cursor-pointer text-center"
          >
            Kembali ke Dashboard
          </button>

          <button
            onClick={() => {
              sound.playSuccessChime();
              onStartExplore();
            }}
            className="wood-button w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl text-white text-base sm:text-lg font-black uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer shadow-xl group"
          >
            <span>MULAI MENJELAJAH</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <Compass className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};
