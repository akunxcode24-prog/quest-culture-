import React from 'react';
import { Misi4ActivityId, Mission1CardItem } from '../types';
import { MISSION_1_ITEMS } from '../data/mission1Data';
import { MISI4_ACTIVITIES, getPairingAdvice } from '../data/mission4Data';
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, MapPin, Tag, Info } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission4CultureSelectProps {
  selectedActivityId: Misi4ActivityId;
  selectedCultureId: string | null;
  onSelectCulture: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Mission4CultureSelect: React.FC<Mission4CultureSelectProps> = ({
  selectedActivityId,
  selectedCultureId,
  onSelectCulture,
  onNext,
  onBack,
}) => {
  const chosenActivity = MISI4_ACTIVITIES.find((a) => a.id === selectedActivityId);
  const chosenCulture = MISSION_1_ITEMS.find((c) => c.id === selectedCultureId);

  const pairingAdvice = chosenCulture && chosenActivity
    ? getPairingAdvice(chosenActivity.id, chosenCulture.category, chosenCulture.name)
    : null;

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
            title="Kembali ke pilih kegiatan"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[11px] font-black text-[#D99A35] uppercase tracking-wider block">
              Tahap 2 dari 4: Rencana Aksi
            </span>
            <h2 className="text-base sm:text-lg font-black text-[#8C4B2D] leading-tight">
              Budaya apa yang ingin kamu kenal lebih dekat?
            </h2>
          </div>
        </div>

        {/* Selected Activity Indicator pill */}
        {chosenActivity && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#527D65]/10 border border-[#527D65]/30 text-xs font-bold text-[#2A523D] self-end sm:self-auto">
            <span>Kegiatan:</span>
            <strong>"{chosenActivity.title}"</strong>
          </div>
        )}
      </div>

      {/* Intro Guidance */}
      <div className="p-4 rounded-2xl bg-[#FFF8EB] border-2 border-[#D99A35]/40 text-left space-y-1">
        <p className="text-xs sm:text-sm text-[#462814] font-semibold leading-relaxed">
          Pilihlah salah satu dari 8 warisan budaya Nusantara yang telah kamu temukan di Misi 1. Pasangkan dengan kegiatan pilihanmu untuk membuat rencana aksi yang seru!
        </p>
      </div>

      {/* 8 Cultural Items Grid from Mission 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MISSION_1_ITEMS.map((item) => {
          const isSelected = selectedCultureId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => {
                sound.playWoodClick();
                onSelectCulture(item.id);
              }}
              className={`group relative rounded-3xl overflow-hidden border-3 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-50/90 border-[#D99A35] ring-4 ring-[#D99A35]/50 shadow-xl scale-102'
                  : 'bg-white border-[#8C4B2D]/25 hover:border-[#8C4B2D] hover:shadow-md'
              }`}
            >
              {/* Card Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#2D160A]/10">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isSelected ? 'scale-106' : 'group-hover:scale-104'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Region Tag */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-black border border-white/20 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D99A35]" />
                  <span>{item.region}</span>
                </div>

                {/* Selected Check Pill */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-[11px] font-black shadow-lg animate-in zoom-in duration-200 border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Dipilih</span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-[#D99A35] uppercase tracking-wider mb-1">
                    <Tag className="w-3 h-3" />
                    <span>{item.category}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-[#2B170C] leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-[#5C3C24] font-semibold mt-1 line-clamp-2 leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#8C4B2D]/15 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-emerald-700 font-black' : 'text-[#8C4B2D]/70'}>
                    {isSelected ? '✓ Budaya Terpilih' : 'Pilih Budaya Ini'}
                  </span>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-[#8C4B2D]/10 text-[#8C4B2D] border-[#8C4B2D]/20'
                    }`}
                  >
                    {isSelected ? '✓' : '+'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Constructive Pairing Advice (if needed) */}
      {pairingAdvice && (
        <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-400 text-left flex items-start gap-3 shadow-xs animate-in fade-in duration-200">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#4E2D17] font-semibold leading-relaxed">
            {pairingAdvice}
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 bg-[#FFFDF7] rounded-2xl border-2 border-[#8C4B2D]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-[#8C4B2D] font-bold text-left">
          {chosenCulture ? (
            <span>
              Budaya terpilih: <strong>{chosenCulture.name} ({chosenCulture.region})</strong>. Siap menyusun langkah aksimu!
            </span>
          ) : (
            <span className="text-amber-800">
              Silakan pilih salah satu dari 8 kartu budaya di atas.
            </span>
          )}
        </div>

        <button
          disabled={!selectedCultureId}
          onClick={() => {
            sound.playSuccessChime();
            onNext();
          }}
          className={`w-full sm:w-auto px-7 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
            selectedCultureId
              ? 'wood-button text-white cursor-pointer hover:scale-102'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-400'
          }`}
        >
          <span>Lanjutkan ke Tahap 3: Susun Rencana</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
