import React from 'react';
import { Shield, Sparkles, ArrowRight, ArrowLeft, Heart, CheckCircle2, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission3IntroProps {
  username: string;
  onStartMission: () => void;
  onBackToDashboard: () => void;
}

export const Mission3Intro: React.FC<Mission3IntroProps> = ({
  username,
  onStartMission,
  onBackToDashboard,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playWoodClick();
            onBackToDashboard();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white text-xs font-black text-[#8C4B2D] border border-[#8C4B2D]/20 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#527D65] text-white text-xs font-black">
          <Shield className="w-3.5 h-3.5" />
          <span>Misi 3: Penjaga Warisan Budaya</span>
        </div>
      </div>

      {/* Hero Mission Card */}
      <div className="wood-panel rounded-3xl p-6 sm:p-8 border-4 border-[#8C4B2D] shadow-xl relative overflow-hidden bg-[#FFFDF7]">
        
        {/* Decorative corner motif */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#D99A35]/20 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          
          {/* CULTU Guide Mascot Portrait */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-[#D99A35] shadow-lg bg-[#8C4B2D]/10">
              <img
                src="/src/assets/images/cultu_mascot_guide_1793969033044.jpg"
                alt="Cultu Pemandu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-xl bg-[#8C4B2D] text-white text-[11px] font-black border border-[#D99A35] shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D99A35]" />
              <span>Pemandu CULTU</span>
            </div>
          </div>

          {/* Dialogue Intro */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D99A35]/20 border border-[#D99A35]/40 text-[#8C4B2D] text-xs font-black uppercase tracking-wider">
              <span>Simulasi Cerita Interaktif</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#8C4B2D] leading-tight tracking-tight">
              Halo Petualang {username}! Siap Menjadi Penjaga Warisan Budaya?
            </h1>

            <p className="text-sm sm:text-base text-[#4A2E1B] font-semibold leading-relaxed">
              "Yuk, bantu menjaga warisan budaya Indonesia! Pilih tindakanmu dan lihat bagaimana setiap keputusanmu membawa perubahan."
            </p>

            <p className="text-xs sm:text-sm text-[#8C4B2D]/85 font-medium">
              Kamu akan menjelajahi <strong>3 skenario kehidupan sehari-hari</strong>: permainan congklak, cerita rakyat nusantara, dan pesan di ponsel. Saksikan langsung ilustrasi perubahannya bersama indikator tunas budaya!
            </p>
          </div>
        </div>

        {/* 3 Step Flow Feature Pills */}
        <div className="mt-8 pt-6 border-t border-[#8C4B2D]/20 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-[#FFF8EB] border border-[#D99A35]/40 text-left space-y-1">
            <div className="flex items-center gap-2 text-[#8C4B2D] font-black text-xs uppercase tracking-wide">
              <span className="w-5 h-5 rounded-full bg-[#8C4B2D] text-white text-[11px] flex items-center justify-center">1</span>
              <span>Pilih Tindakan</span>
            </div>
            <p className="text-xs text-[#52331E] font-medium leading-relaxed">
              Pilih antara Tindakan A atau B pada setiap tantangan warisan budaya.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#EAF5EF] border border-[#527D65]/40 text-left space-y-1">
            <div className="flex items-center gap-2 text-[#24523A] font-black text-xs uppercase tracking-wide">
              <span className="w-5 h-5 rounded-full bg-[#527D65] text-white text-[11px] flex items-center justify-center">2</span>
              <span>Lihat Akibatnya</span>
            </div>
            <p className="text-xs text-[#24523A] font-medium leading-relaxed">
              Saksikan perubahan suasana ilustrasi 3D dan pertumbuhan tunas budaya.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F0F5FA] border border-[#315B70]/40 text-left space-y-1">
            <div className="flex items-center gap-2 text-[#1E3B4B] font-black text-xs uppercase tracking-wide">
              <span className="w-5 h-5 rounded-full bg-[#315B70] text-white text-[11px] flex items-center justify-center">3</span>
              <span>Bandingkan & Refleksi</span>
            </div>
            <p className="text-xs text-[#1E3B4B] font-medium leading-relaxed">
              Bebas mencoba pilihan lainnya dan temukan hikmah berharga di setiap aksi.
            </p>
          </div>
        </div>

        {/* Special Kid Guidance Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-[#527D65]/10 border border-[#527D65]/30 flex items-start gap-3 text-left">
          <Heart className="w-5 h-5 text-[#527D65] shrink-0 mt-0.5" />
          <div className="text-xs text-[#284937] font-medium leading-relaxed">
            <strong className="font-bold text-[#1F3D2E]">Belajar Tanpa Rasa Takut Salah:</strong> Di CultureQuest, tidak ada pilihan yang membuatmu dihukum. Kamu bahkan dianjurkan mencoba kedua pilihan agar bisa memahami perbedaan dampaknya bagi budaya kita!
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              sound.playSuccessChime();
              onStartMission();
            }}
            className="wood-button w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm sm:text-base font-black text-white flex items-center justify-center gap-3 shadow-xl uppercase tracking-wider cursor-pointer group"
          >
            <span>Mulai Petualangan Misi 3</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
};
