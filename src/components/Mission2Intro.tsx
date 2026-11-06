import React from 'react';
import { ArrowLeft, Sparkles, BookOpen, Search, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission2IntroProps {
  username: string;
  onStartMission: () => void;
  onBackToDashboard: () => void;
}

export const Mission2Intro: React.FC<Mission2IntroProps> = ({
  username,
  onStartMission,
  onBackToDashboard,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playWoodClick();
            onBackToDashboard();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFF8EB] border-2 border-[#8C4B2D]/30 text-[#8C4B2D] font-bold text-xs sm:text-sm hover:border-[#8C4B2D] transition-colors cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#315B70]/10 border border-[#315B70]/30 text-[#315B70] text-xs font-black">
          <Search className="w-3.5 h-3.5" />
          <span>MISI 2 &middot; DETEKTIF BUDAYA</span>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="wood-panel rounded-3xl p-6 sm:p-8 border-4 border-[#8C4B2D] shadow-xl relative overflow-hidden bg-gradient-to-br from-[#FFFBF2] via-[#FBF2DF] to-[#F5E6CA]">
        {/* Decorative corner motifs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D99A35]/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#315B70]/20 via-transparent to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Mascot / Detective visual */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative group">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-4 border-[#8C4B2D] shadow-2xl bg-[#8C4B2D] p-1.5">
                <img
                  src="/src/assets/images/cultu_mascot_guide_1793969033044.jpg"
                  alt="Cultu Pemandu Detektif"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Detective badge floating pin */}
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-2xl bg-[#315B70] border-3 border-[#D99A35] shadow-lg flex items-center justify-center p-1">
                <img
                  src="/src/assets/images/badge_detektif_budaya_1793971905349.jpg"
                  alt="Lencana Detektif"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              {/* Detective magnifying glass pill */}
              <div className="absolute -top-3 -left-3 px-3 py-1 rounded-full bg-[#D99A35] border-2 border-[#8C4B2D] text-white font-black text-[11px] shadow-md flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-white" />
                <span>Kaca Pembesar</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs font-black uppercase tracking-wider text-[#8C4B2D] bg-[#8C4B2D]/10 px-3 py-1 rounded-full">
                CULTU &middot; Kawan Petualang
              </span>
            </div>
          </div>

          {/* Dialog & Briefing */}
          <div className="md:col-span-7 space-y-4 text-left">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#D99A35] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D99A35]" />
                Petualangan Klasifikasi Budaya
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#8C4B2D] mt-1 leading-tight drop-shadow-xs">
                Detektif Jenis Warisan Budaya
              </h1>
            </div>

            {/* Cultu speech balloon */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-[#FFFBF2] border-2 border-[#D99A35] shadow-md">
              <div className="absolute -left-2 top-6 w-4 h-4 bg-[#FFFBF2] border-l-2 border-b-2 border-[#D99A35] rotate-45 hidden md:block" />
              <p className="text-sm sm:text-base text-[#3B2011] font-bold leading-relaxed">
                &ldquo;Halo Penjelajah Budaya, <span className="text-[#8C4B2D]">{username}</span>!
                Ternyata warisan budaya Nusantara kita memiliki jenis yang berbeda, lho!
                Ada yang memiliki bentuk fisik nyata dan bisa kita sentuh. Ada pula yang diwariskan melalui tradisi, pengetahuan, pertunjukan, atau kebiasaan masyarakat.
                Ayo, bantu aku menyelidiki dan mengelompokkannya dengan tepat!&rdquo;
              </p>
            </div>

            {/* Objectives brief checklist */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Misi Detektif yang Harus Kamu Selesaikan:
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#3B2011] font-semibold">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#527D65] shrink-0 mt-0.5" />
                  <span>Pelajari perbedaan Warisan Budaya Benda dan Warisan Budaya Takbenda.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#527D65] shrink-0 mt-0.5" />
                  <span>Pahami fakta seru: Satu budaya (seperti Batik, Angklung, Wayang) bisa memiliki dua aspek sekaligus!</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#527D65] shrink-0 mt-0.5" />
                  <span>Kelompokkan 10 Kartu Budaya ke dalam kotak klasifikasi yang tepat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#527D65] shrink-0 mt-0.5" />
                  <span>Pecahkan 5 teka-teki petunjuk visual untuk meraih <strong>Lencana Detektif Budaya</strong>!</span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  sound.playSuccessChime();
                  onStartMission();
                }}
                className="wood-button w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-105 active:scale-95 transition-transform cursor-pointer"
              >
                <Search className="w-5 h-5 text-white" />
                <span>MULAI MISI DETEKTIF</span>
              </button>

              <span className="text-xs font-bold text-[#8C4B2D]/70">
                Hadiah: +3 Bintang &middot; +120 XP &middot; Lencana Detektif
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
