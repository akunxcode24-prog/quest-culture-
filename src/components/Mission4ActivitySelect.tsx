import React from 'react';
import { Misi4Activity, Misi4ActivityId } from '../types';
import { MISI4_ACTIVITIES } from '../data/mission4Data';
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Gamepad2, BookOpen, Home, Users, MessageCircleQuestion } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission4ActivitySelectProps {
  selectedActivityId: Misi4ActivityId | null;
  onSelectActivity: (id: Misi4ActivityId) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Mission4ActivitySelect: React.FC<Mission4ActivitySelectProps> = ({
  selectedActivityId,
  onSelectActivity,
  onNext,
  onBack,
}) => {
  const renderActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-[#8C4B2D]" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-[#8C4B2D]" />;
      case 'Home':
        return <Home className="w-5 h-5 text-[#8C4B2D]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#8C4B2D]" />;
      case 'MessageCircleQuestion':
        return <MessageCircleQuestion className="w-5 h-5 text-[#8C4B2D]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#8C4B2D]" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FFFBF2] p-3.5 sm:p-4 rounded-2xl border-2 border-[#8C4B2D]/20 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playWoodClick();
              onBack();
            }}
            className="p-1.5 rounded-xl hover:bg-[#8C4B2D]/10 text-[#8C4B2D] border border-[#8C4B2D]/20 cursor-pointer"
            title="Kembali ke pembuka"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[11px] font-black text-[#D99A35] uppercase tracking-wider block">
              Tahap 1 dari 4: Rencana Aksi
            </span>
            <h2 className="text-base sm:text-lg font-black text-[#8C4B2D] leading-tight">
              Pilih Kegiatan Nyata yang Ingin Kamu Lakukan
            </h2>
          </div>
        </div>

        <div className="text-xs font-bold text-[#8C4B2D]/80 self-end sm:self-auto bg-[#F7EBD2] px-3 py-1.5 rounded-xl border border-[#8C4B2D]/15">
          {selectedActivityId ? '✓ 1 Kegiatan Dipilih' : 'Pilih 1 Kegiatan di bawah'}
        </div>
      </div>

      {/* Intro Guidance Notice */}
      <div className="p-4 rounded-2xl bg-[#FFF8EB] border-2 border-[#D99A35]/40 text-left space-y-1">
        <p className="text-xs sm:text-sm text-[#462814] font-semibold leading-relaxed">
          Pilihlah satu kegiatan pelestarian budaya yang paling kamu minati. Kamu bisa mengajak teman, berbagi cerita dengan keluarga, atau belajar mengenali rumah adat nusantara!
        </p>
      </div>

      {/* 5 Activities Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {MISI4_ACTIVITIES.map((activity) => {
          const isSelected = selectedActivityId === activity.id;

          return (
            <div
              key={activity.id}
              onClick={() => {
                sound.playWoodClick();
                onSelectActivity(activity.id);
              }}
              className={`group relative rounded-3xl overflow-hidden border-3 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-50/90 border-[#D99A35] ring-4 ring-[#D99A35]/50 shadow-xl scale-102'
                  : 'bg-white border-[#8C4B2D]/25 hover:border-[#8C4B2D] hover:shadow-md'
              }`}
            >
              {/* Card Image 3D Semi-realistic */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#2D160A]/10">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isSelected ? 'scale-105' : 'group-hover:scale-103'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top order tag */}
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-black border border-white/20">
                  Kegiatan #{activity.orderNumber}
                </div>

                {/* Selected Check Pill */}
                {isSelected && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-lg animate-in zoom-in duration-200 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Dipilih</span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-xl bg-[#8C4B2D]/10 flex items-center justify-center shrink-0">
                      {renderActivityIcon(activity.iconName)}
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-[#2B170C] leading-snug">
                      {activity.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C3C24] font-semibold mt-2 leading-relaxed">
                    "{activity.description}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#8C4B2D]/15 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-emerald-700 font-black' : 'text-[#8C4B2D]/70'}>
                    {isSelected ? '✓ Kegiatan Terpilih' : 'Klik untuk Memilih'}
                  </span>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-[#8C4B2D]/10 text-[#8C4B2D] border-[#8C4B2D]/20'
                    }`}
                  >
                    {isSelected ? '✓' : activity.orderNumber}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 bg-[#FFFDF7] rounded-2xl border-2 border-[#8C4B2D]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-[#8C4B2D] font-bold text-left">
          {selectedActivityId ? (
            <span>
              Kegiatan terpilih siap dipasangkan dengan 1 dari 8 warisan budaya Nusantara!
            </span>
          ) : (
            <span className="text-amber-800">
              Silakan pilih salah satu dari 5 kegiatan di atas untuk melanjutkan.
            </span>
          )}
        </div>

        <button
          disabled={!selectedActivityId}
          onClick={() => {
            sound.playSuccessChime();
            onNext();
          }}
          className={`w-full sm:w-auto px-7 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
            selectedActivityId
              ? 'wood-button text-white cursor-pointer hover:scale-102'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-400'
          }`}
        >
          <span>Lanjutkan ke Tahap 2</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
