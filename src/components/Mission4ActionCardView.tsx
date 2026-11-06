import React, { useState } from 'react';
import { Mission4ActionPlan } from '../types';
import { exportActionPlanToCSV } from '../data/mission4Data';
import {
  Sparkles,
  Download,
  CheckCircle2,
  MapPin,
  Users,
  Compass,
  Edit,
  Info,
  Calendar,
  Share2,
  Heart
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission4ActionCardViewProps {
  plan: Mission4ActionPlan;
  studentName: string;
  onSavePlan: () => void;
  onEditPlan: () => void;
  onCompleteToFinal: () => void;
  onBackToDashboard: () => void;
}

export const Mission4ActionCardView: React.FC<Mission4ActionCardViewProps> = ({
  plan,
  studentName,
  onSavePlan,
  onEditPlan,
  onCompleteToFinal,
  onBackToDashboard,
}) => {
  const [hasSaved, setHasSaved] = useState<boolean>(plan.isSaved);
  const [showSaveToast, setShowSaveToast] = useState<boolean>(false);

  const handleSave = () => {
    sound.playSuccessChime();
    setHasSaved(true);
    onSavePlan();
    setShowSaveToast(true);
    setTimeout(() => {
      setShowSaveToast(false);
    }, 3000);
  };

  const handleDownloadCSV = () => {
    sound.playWoodClick();
    exportActionPlanToCSV(plan, studentName);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-400">
      
      {/* Top Banner Message */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#FFF8EB] border-3 border-[#D99A35] text-left shadow-md flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#8C4B2D] shrink-0 bg-[#8C4B2D]/10">
          <img
            src="/src/assets/images/cultu_mascot_guide_1793969033044.jpg"
            alt="CULTU Mascot"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-black text-[#D99A35] uppercase tracking-wider">
            Apresiasi CULTU
          </span>
          <h2 className="text-base sm:text-lg font-black text-[#8C4B2D] leading-snug">
            "Hebat! Kamu sudah membuat rencana untuk mengenal budaya Indonesia. Langkah kecilmu bisa menjadi awal yang bermakna."
          </h2>
          <p className="text-xs text-[#52341F] font-semibold">
            Simpan kartumu atau unduh dokumen rencanamu untuk dibagikan kepada guru dan orang tua di rumah!
          </p>
        </div>
      </div>

      {/* THE COLLECTIBLE ACTION PLAN CARD (Tahap 4) */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-[#8C4B2D] shadow-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FDF8EE] to-[#F5E8CE] p-5 sm:p-7 text-left">
        
        {/* Indonesian Batik Traditional Corner Accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#D99A35] rounded-tl-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#D99A35] rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#D99A35] rounded-bl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#D99A35] rounded-br-2xl pointer-events-none" />

        {/* Card Header Tag Strip */}
        <div className="flex items-center justify-between border-b-2 border-[#8C4B2D]/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#D99A35] animate-pulse" />
            <h1 className="text-sm sm:text-base font-black text-[#8C4B2D] tracking-wider uppercase">
              RENCANA AKSI BUDAYAKU
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-[#8C4B2D] text-white text-[11px] font-black uppercase tracking-wider">
              ID: {plan.participantCode}
            </span>
          </div>
        </div>

        {/* Card Body Grid */}
        <div className="space-y-4">
          
          {/* Main 16:9 Cultural Artwork */}
          <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border-3 border-[#8C4B2D] shadow-inner bg-[#2D160A]">
            <img
              src={plan.culturalImage}
              alt={plan.culturalName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

            {/* Cultural Name & Region on Scrim */}
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#D99A35] uppercase mb-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{plan.culturalRegion} &middot; {plan.culturalCategory}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black drop-shadow-md leading-tight">
                {plan.culturalName}
              </h3>
            </div>

            {/* Small CULTU Companion in Top-Right */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-[#D99A35]" />
              <span>Pendamping CULTU</span>
            </div>
          </div>

          {/* Action Plan Details Inset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Box 1: Kegiatan yang Dipilih */}
            <div className="p-3.5 rounded-2xl bg-white/90 border border-[#8C4B2D]/20 shadow-2xs">
              <span className="text-[10px] font-black text-[#8C4B2D]/70 uppercase tracking-wider block">
                Kegiatan yang Dipilih:
              </span>
              <div className="text-xs sm:text-sm font-black text-[#2B170C] mt-0.5">
                {plan.activityTitle}
              </div>
            </div>

            {/* Box 2: Orang yang Membantu */}
            <div className="p-3.5 rounded-2xl bg-white/90 border border-[#8C4B2D]/20 shadow-2xs">
              <span className="text-[10px] font-black text-[#8C4B2D]/70 uppercase tracking-wider block">
                Orang yang Membantu:
              </span>
              <div className="text-xs sm:text-sm font-black text-[#527D65] mt-0.5 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#527D65]" />
                <span>{plan.helperLabel}</span>
              </div>
            </div>

          </div>

          {/* Box 3: Hal yang Ingin Dipelajari */}
          <div className="p-4 rounded-2xl bg-white/90 border-2 border-[#8C4B2D]/20 shadow-2xs space-y-1">
            <span className="text-[10px] font-black text-[#8C4B2D] uppercase tracking-wider block">
              Hal yang Ingin Dipelajari:
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#3B2011] italic leading-relaxed">
              "{plan.learningGoal}"
            </p>
          </div>

          {/* Educational Note (Rencana, bukan klaim tindakan selesai) */}
          <div className="p-3 rounded-xl bg-[#8C4B2D]/5 border border-[#8C4B2D]/15 flex items-start gap-2 text-[11px] text-[#694025] font-medium leading-relaxed">
            <Info className="w-4 h-4 text-[#8C4B2D] shrink-0 mt-0.5" />
            <span>
              <strong>Catatan Belajar:</strong> Kartu ini berisi rencana sederhana yang telah kamu susun untuk mengenal budaya Indonesia. Laksanakan rencana ini bersama keluarga atau temanmu dengan gembira!
            </span>
          </div>

        </div>

        {/* Card Footer Stamp */}
        <div className="mt-4 pt-3 border-t-2 border-[#8C4B2D]/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-[#8C4B2D]/75">
          <div className="flex items-center gap-2">
            <span>Petualang: <strong className="text-[#8C4B2D]">{studentName}</strong></span>
            <span>&middot;</span>
            <span>Status: <strong className={hasSaved ? 'text-emerald-700' : 'text-amber-700'}>{hasSaved ? '✓ Tersimpan' : 'Belum Disimpan'}</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>CultureQuest 2026</span>
          </div>
        </div>

      </div>

      {/* Save Notification Toast */}
      {showSaveToast && (
        <div className="p-3 rounded-2xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>Rencana Aksi Budayamu berhasil disimpan pada profil petualang!</span>
        </div>
      )}

      {/* Interactive Action Buttons */}
      <div className="p-4 bg-[#FFFDF7] rounded-3xl border-2 border-[#8C4B2D]/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        
        {/* Left: Edit & CSV Export */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              sound.playWoodClick();
              onEditPlan();
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7EBD2] text-xs font-black text-[#8C4B2D] border border-[#8C4B2D]/30 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Ubah Rencana</span>
          </button>

          <button
            onClick={handleDownloadCSV}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7EBD2] text-xs font-black text-[#315B70] border border-[#315B70]/30 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            title="Unduh file CSV untuk laporan tugas sekolah"
          >
            <Download className="w-3.5 h-3.5 text-[#315B70]" />
            <span>Ekspor CSV</span>
          </button>
        </div>

        {/* Right: Primary Save & Next */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {!hasSaved ? (
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#527D65] hover:bg-[#436b54] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>SIMPAN RENCANAKU</span>
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playSuccessChime();
                onCompleteToFinal();
              }}
              className="flex-1 sm:flex-none wood-button px-7 py-3 rounded-xl text-xs sm:text-sm font-black text-white flex items-center justify-center gap-2 shadow-md uppercase tracking-wider cursor-pointer transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>LIHAT HASIL AKHIR EKSPEDISI</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playWoodClick();
              onBackToDashboard();
            }}
            className="px-4 py-2.5 rounded-xl bg-[#8C4B2D]/10 hover:bg-[#8C4B2D]/20 text-[#8C4B2D] text-xs font-black cursor-pointer"
          >
            Peta Petualangan
          </button>
        </div>

      </div>

    </div>
  );
};
