import React, { useState } from 'react';
import { Mission4ActionPlan } from '../types';
import { MISSION_4_BADGE } from '../data/mission4Data';
import { Mission4TeacherModal } from './Mission4TeacherModal';
import {
  Sparkles,
  Award,
  Star,
  Zap,
  CheckCircle2,
  MapPin,
  Users,
  Compass,
  FileText,
  Heart,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission4CompletionProps {
  username: string;
  anonymousId: string;
  plan: Mission4ActionPlan;
  onOpenCardView: () => void;
  onBackToDashboard: () => void;
  onUpdatePlan: (updatedPlan: Mission4ActionPlan) => void;
}

export const Mission4Completion: React.FC<Mission4CompletionProps> = ({
  username,
  anonymousId,
  plan,
  onOpenCardView,
  onBackToDashboard,
  onUpdatePlan,
}) => {
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Grand Finale Card */}
      <div className="wood-panel rounded-3xl overflow-hidden border-4 border-[#8C4B2D] shadow-2xl bg-[#FFFDF7]">
        
        {/* Visual Banner */}
        <div className="relative aspect-16/7 sm:aspect-16/6 w-full overflow-hidden bg-[#2D160A]">
          <img
            src="/src/assets/images/mission_aksi_bermakna_1793969036434.jpg"
            alt="Perayaan Akhir Budaya Indonesia"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C0E06] via-[#1C0E06]/40 to-transparent" />

          {/* Floating Pill */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-black/75 backdrop-blur-md text-white border border-[#D99A35]/50 shadow-md text-xs font-black">
            <Award className="w-4 h-4 text-[#D99A35]" />
            <span>Misi 4 Selesai &middot; Puncak Ekspedisi Nusantara</span>
          </div>

          {/* Title Header */}
          <div className="absolute bottom-4 left-4 right-4 text-white text-left">
            <span className="text-xs font-black text-[#D99A35] uppercase tracking-wider block mb-1">
              Selamat Petualang {username}!
            </span>
            <h1 className="text-xl sm:text-3xl font-black drop-shadow-md leading-tight">
              KAMU TELAH MENYELESAIKAN PETUALANGAN CULTUREQUEST!
            </h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6 text-left">
          
          {/* CULTU Farewell & Inspiration Message */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8EB] border-2 border-[#D99A35] shadow-xs flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#8C4B2D] shrink-0 bg-[#8C4B2D]/10">
              <img
                src="/src/assets/images/cultu_mascot_guide_1793969033044.jpg"
                alt="Cultu Pemandu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider">
                Pesan Terakhir dari CULTU:
              </span>
              <p className="text-sm sm:text-base font-black text-[#8C4B2D] leading-snug">
                "Terima kasih sudah mengenal dan belajar tentang budaya Indonesia. Ingat, menjaga budaya bisa dimulai dari hal-hal sederhana. Sampai jumpa di petualangan berikutnya!"
              </p>
              <p className="text-xs text-[#52341F] font-semibold mt-1">
                Kamu telah menyelesaikan 4 misi berturut-turut: menjelajahi 8 budaya nusantara, mengklasifikasikan warisan benda & takbenda, menjaga warisan dalam cerita interaktif, dan menyusun rencana aksi nyata!
              </p>
            </div>
          </div>

          {/* Summary Box of the Action Plan */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#8C4B2D]/20 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#8C4B2D]/15 pb-2">
              <h3 className="text-xs sm:text-sm font-black text-[#8C4B2D] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#8C4B2D]" />
                <span>Ringkasan Rencana Aksi Budayamu:</span>
              </h3>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Status: Tersimpan
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#8C4B2D]/10">
                <span className="text-[10px] font-bold text-[#8C4B2D]/70 uppercase">Kegiatan yang Dipilih:</span>
                <div className="font-black text-[#2B170C] mt-0.5">{plan.activityTitle}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#8C4B2D]/10">
                <span className="text-[10px] font-bold text-[#8C4B2D]/70 uppercase">Budaya yang Dipilih:</span>
                <div className="font-black text-[#2B170C] mt-0.5">{plan.culturalName} ({plan.culturalRegion})</div>
              </div>

              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#8C4B2D]/10">
                <span className="text-[10px] font-bold text-[#8C4B2D]/70 uppercase">Orang yang Membantu:</span>
                <div className="font-black text-[#527D65] mt-0.5">{plan.helperLabel}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#8C4B2D]/10">
                <span className="text-[10px] font-bold text-[#8C4B2D]/70 uppercase">Kode Peserta:</span>
                <div className="font-black text-[#8C4B2D] mt-0.5">{plan.participantCode}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FFF8EB] border border-[#D99A35]/30 text-xs">
              <span className="text-[10px] font-bold text-[#8C4B2D] uppercase block">Hal yang Ingin Dipelajari:</span>
              <p className="font-bold text-[#3B2011] mt-0.5 italic">
                "{plan.learningGoal}"
              </p>
            </div>
          </div>

          {/* Reward Strip */}
          <div className="p-4 rounded-2xl bg-[#EAF5EF] border-2 border-[#527D65]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#527D65] flex items-center justify-center text-white shadow-md shrink-0">
                <Award className="w-6 h-6 text-[#F7EBD2]" />
              </div>
              <div>
                <span className="text-[11px] font-black text-[#28573D] uppercase tracking-wider block">
                  Penghargaan Gelar Tertinggi
                </span>
                <h4 className="text-sm sm:text-base font-black text-[#1C3E2B]">
                  Lencana "{MISSION_4_BADGE.name}"
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#527D65]/30 text-xs font-black text-[#D99A35] shadow-xs">
                <Star className="w-4 h-4 fill-[#D99A35]" />
                <span>+{MISSION_4_BADGE.starBonus} Bintang</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#527D65]/30 text-xs font-black text-[#527D65] shadow-xs">
                <Zap className="w-4 h-4 fill-[#527D65]" />
                <span>+{MISSION_4_BADGE.xpBonus} XP</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="pt-4 border-t border-[#8C4B2D]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Teacher Dashboard Access */}
            <button
              onClick={() => {
                sound.playWoodClick();
                setIsTeacherModalOpen(true);
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7EBD2] text-xs font-black text-[#8C4B2D] border-2 border-[#8C4B2D] flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#8C4B2D]" />
              <span>Rapor Guru & Rubrik (Ekspor CSV)</span>
            </button>

            {/* View Card or Dashboard */}
            <div className="w-full sm:w-auto flex items-center gap-2.5">
              <button
                onClick={() => {
                  sound.playWoodClick();
                  onOpenCardView();
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#8C4B2D]/15 hover:bg-[#8C4B2D]/25 text-xs font-black text-[#8C4B2D] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Buka Kartu Rencana Aksi</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playSuccessChime();
                  onBackToDashboard();
                }}
                className="flex-1 sm:flex-none wood-button px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white flex items-center justify-center gap-2 cursor-pointer shadow-md uppercase tracking-wider"
              >
                <Compass className="w-4 h-4" />
                <span>Kembali ke Beranda</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Teacher Modal */}
      <Mission4TeacherModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        studentName={username}
        plan={plan}
        onUpdatePlan={onUpdatePlan}
      />

    </div>
  );
};
