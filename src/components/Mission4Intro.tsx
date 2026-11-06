import React from 'react';
import { ArrowLeft, ArrowRight, Compass, Sparkles, HeartHandshake } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission4IntroProps {
  username: string;
  onStartBuilder: () => void;
  onBackToDashboard: () => void;
  hasExistingPlan?: boolean;
  onViewExistingPlan?: () => void;
}

export const Mission4Intro: React.FC<Mission4IntroProps> = ({
  username,
  onStartBuilder,
  onBackToDashboard,
  hasExistingPlan = false,
  onViewExistingPlan,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playWoodClick();
            onBackToDashboard();
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/80 hover:bg-white text-xs font-black text-[#8C4B2D] border border-[#8C4B2D]/20 transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D99A35] text-white text-xs font-black shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Misi 4: Puncak Ekspedisi CultureQuest</span>
        </div>
      </div>

      {/* Hero Welcome Card */}
      <div className="wood-panel rounded-3xl p-6 sm:p-8 border-4 border-[#8C4B2D] shadow-xl relative overflow-hidden bg-[#FFFDF7]">
        
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#D99A35]/25 via-[#527D65]/15 to-transparent rounded-bl-full pointer-events-none" />

        {/* Large 3D Illustration Area */}
        <div className="relative aspect-16/8 sm:aspect-16/7 w-full rounded-2xl overflow-hidden border-3 border-[#8C4B2D] shadow-inner mb-6 bg-[#2B170C]">
          <img
            src="/src/assets/images/mission_aksi_bermakna_1793969036434.jpg"
            alt="Anak-anak Indonesia melakukan aksi budaya bersama CULTU"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201007]/80 via-transparent to-black/20" />

          {/* Floating animated CULTU greeting pill */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-3 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 text-white shadow-lg animate-in slide-in-from-bottom-2 duration-500">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#D99A35] shrink-0 bg-white/10">
              <img
                src="/src/assets/images/cultu_mascot_guide_1793969033044.jpg"
                alt="CULTU Mascot"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-black text-[#D99A35] uppercase tracking-wider">
                Sahabat Budayamu CULTU
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">
                "Halo Petualang {username}! Bersama-sama, langkah kecil kita sangat bermakna."
              </div>
            </div>
          </div>
        </div>

        {/* Text Presentation */}
        <div className="text-center md:text-left space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D99A35]/20 border border-[#D99A35]/40 text-[#8C4B2D] text-xs font-black uppercase tracking-wider">
            <span>Rencana Pelestarian Budaya Siswa SD</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#8C4B2D] tracking-tight">
            AKSI KECIL, DAMPAK BERMAKNA
          </h1>

          <p className="text-base sm:text-lg text-[#3E2514] font-bold">
            "Yuk, lakukan hal sederhana untuk mengenal dan menjaga budaya Indonesia!"
          </p>

          <div className="p-4 rounded-2xl bg-[#FFF8EB] border-2 border-[#D99A35]/40 text-left space-y-1.5 shadow-xs">
            <p className="text-xs sm:text-sm text-[#4E2D17] font-semibold leading-relaxed">
              Petualanganmu hampir selesai! Sekarang, saatnya membuat rencana kecil untuk mengenal budaya Indonesia. Kamu akan memilih satu kegiatan nyata, memilih budaya favoritmu dari 8 pusaka Misi 1, menentukan pendamping belajar, dan menuliskan apa yang ingin kamu ketahui.
            </p>
            <p className="text-[11px] text-[#8C4B2D]/80 font-medium">
              ✨ Di akhir misi, kamu akan memperoleh <strong>Kartu Rencana Aksi Budaya</strong> digital sebagai kenang-kenangan petualanganmu!
            </p>
          </div>
        </div>

        {/* 4 Steps Visual Timeline */}
        <div className="mt-6 pt-5 border-t border-[#8C4B2D]/20 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
          <div className="p-3 rounded-xl bg-white border border-[#8C4B2D]/15 shadow-2xs">
            <span className="text-[10px] font-black text-[#D99A35] uppercase">Tahap 1</span>
            <div className="text-xs font-black text-[#8C4B2D] mt-0.5">Pilih Kegiatan</div>
            <p className="text-[10px] text-[#55331C] mt-0.5 font-medium">1 dari 5 aksi nyata sehari-hari</p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#8C4B2D]/15 shadow-2xs">
            <span className="text-[10px] font-black text-[#D99A35] uppercase">Tahap 2</span>
            <div className="text-xs font-black text-[#8C4B2D] mt-0.5">Pilih Budaya</div>
            <p className="text-[10px] text-[#55331C] mt-0.5 font-medium">1 dari 8 kartu pusaka Misi 1</p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#8C4B2D]/15 shadow-2xs">
            <span className="text-[10px] font-black text-[#D99A35] uppercase">Tahap 3</span>
            <div className="text-xs font-black text-[#8C4B2D] mt-0.5">Susun Rencana</div>
            <p className="text-[10px] text-[#55331C] mt-0.5 font-medium">Pilih pendamping & tulis hal dipelajari</p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#8C4B2D]/15 shadow-2xs">
            <span className="text-[10px] font-black text-[#D99A35] uppercase">Tahap 4</span>
            <div className="text-xs font-black text-[#8C4B2D] mt-0.5">Kartu Digital</div>
            <p className="text-[10px] text-[#55331C] mt-0.5 font-medium">Koleksi Kartu Rencana Aksi Budayaku</p>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {hasExistingPlan && onViewExistingPlan && (
            <button
              onClick={() => {
                sound.playWoodClick();
                onViewExistingPlan();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-[#F7EBD2] text-xs sm:text-sm font-black text-[#8C4B2D] border-2 border-[#8C4B2D] flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-transform active:scale-95"
            >
              <Compass className="w-4 h-4 text-[#8C4B2D]" />
              <span>Lihat Rencana Saya Sebelumnya</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playSuccessChime();
              onStartBuilder();
            }}
            className="wood-button w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm sm:text-base font-black text-white flex items-center justify-center gap-2.5 shadow-xl uppercase tracking-wider cursor-pointer group transition-transform active:scale-95"
          >
            <span>MULAI BUAT RENCANA</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
};
