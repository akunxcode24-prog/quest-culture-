import React, { useState } from 'react';
import { Misi4Activity, Misi4HelperType, Mission1CardItem } from '../types';
import { MISI4_HELPERS, evaluateActionPlanRubric } from '../data/mission4Data';
import {
  GraduationCap,
  HeartHandshake,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Award,
  Edit3
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission4PlanBuilderProps {
  activity: Misi4Activity;
  culture: Mission1CardItem;
  initialHelper: Misi4HelperType | null;
  initialLearningGoal: string;
  onGenerateCard: (helper: Misi4HelperType, learningGoal: string) => void;
  onBack: () => void;
}

export const Mission4PlanBuilder: React.FC<Mission4PlanBuilderProps> = ({
  activity,
  culture,
  initialHelper,
  initialLearningGoal,
  onGenerateCard,
  onBack,
}) => {
  const [selectedHelper, setSelectedHelper] = useState<Misi4HelperType | null>(
    initialHelper || 'teman'
  );
  const [learningGoal, setLearningGoal] = useState<string>(
    initialLearningGoal || ''
  );

  const renderHelperIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-indigo-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      default:
        return <Users className="w-5 h-5 text-[#8C4B2D]" />;
    }
  };

  const handleApplyTemplate = (text: string) => {
    sound.playWoodClick();
    setLearningGoal(text);
  };

  // Live Rubric Scoring calculation
  const rubric = evaluateActionPlanRubric(
    activity.id,
    culture.id,
    selectedHelper || '',
    learningGoal
  );

  const isFormValid = selectedHelper !== null && learningGoal.trim().length >= 4;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !selectedHelper) return;

    sound.playSuccessChime();
    onGenerateCard(selectedHelper, learningGoal.trim());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FFFBF2] p-3.5 sm:p-4 rounded-2xl border-2 border-[#8C4B2D]/20 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playWoodClick();
              onBack();
            }}
            className="p-1.5 rounded-xl hover:bg-[#8C4B2D]/10 text-[#8C4B2D] border border-[#8C4B2D]/20 cursor-pointer"
            title="Kembali ke pilih budaya"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[11px] font-black text-[#D99A35] uppercase tracking-wider block">
              Tahap 3 dari 4: Meja Perencanaan
            </span>
            <h2 className="text-base sm:text-lg font-black text-[#8C4B2D] leading-tight">
              Susun Rencana Aksi Budayamu
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-bold text-[#527D65] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <Award className="w-4 h-4 text-[#527D65]" />
          <span>Skor Rubrik: <strong>{rubric.totalScore} / 6 Poin</strong></span>
        </div>
      </div>

      {/* Main Adventure Desk / Planning Board */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="wood-panel rounded-3xl p-5 sm:p-7 border-4 border-[#8C4B2D] shadow-xl bg-[#FFFDF7] space-y-6 text-left">
          
          {/* Section 1 & 2: Auto-filled cultural & activity summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Auto-filled 1: Budaya yang Dipilih */}
            <div className="p-4 rounded-2xl bg-[#FFF9ED] border-2 border-[#D99A35]/50 flex items-center gap-3.5 shadow-2xs">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#8C4B2D] shrink-0 bg-[#2D160A]">
                <img
                  src={culture.image}
                  alt={culture.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black text-[#D99A35] uppercase tracking-wider block">
                  1. Budaya Pilihanmu (Otomatis)
                </span>
                <h4 className="text-sm sm:text-base font-black text-[#2B170C] truncate">
                  {culture.name}
                </h4>
                <p className="text-xs text-[#8C4B2D] font-bold">
                  {culture.region} &middot; {culture.category}
                </p>
              </div>
            </div>

            {/* Auto-filled 2: Kegiatan yang Dipilih */}
            <div className="p-4 rounded-2xl bg-[#EAF5EF] border-2 border-[#527D65]/50 flex items-center gap-3.5 shadow-2xs">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#527D65] shrink-0 bg-[#2D160A]">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black text-[#527D65] uppercase tracking-wider block">
                  2. Kegiatan Pilihanmu (Otomatis)
                </span>
                <h4 className="text-sm sm:text-base font-black text-[#1F3D2E] truncate">
                  {activity.title}
                </h4>
                <p className="text-xs text-[#28573D] font-semibold line-clamp-1">
                  "{activity.description}"
                </p>
              </div>
            </div>

          </div>

          {/* Section 3: Siapa yang akan membantumu? */}
          <div className="space-y-3 pt-2">
            <div>
              <span className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider block">
                3. Pendamping Belajar
              </span>
              <h3 className="text-sm sm:text-base font-black text-[#2A170C] mt-0.5">
                Siapa yang akan membantumu melaksanakan rencana ini?
              </h3>
              <p className="text-xs text-[#61412A] font-semibold">
                Pilih salah satu teman atau pendamping terdekatmu:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MISI4_HELPERS.map((h) => {
                const isSelected = selectedHelper === h.id;

                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => {
                      sound.playWoodClick();
                      setSelectedHelper(h.id);
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-50/90 border-[#D99A35] ring-3 ring-[#D99A35]/50 shadow-md scale-102'
                        : 'bg-white border-[#8C4B2D]/20 hover:border-[#8C4B2D]/50 hover:bg-[#FFFDF9]'
                    }`}
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-[#8C4B2D]/10 flex items-center justify-center mb-2">
                        {renderHelperIcon(h.iconName)}
                      </div>
                      <div className="text-xs sm:text-sm font-black text-[#2B170C]">
                        {h.label}
                      </div>
                      <p className="text-[11px] text-[#55331C] font-semibold mt-1 leading-tight line-clamp-2">
                        {h.roleDescription}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#8C4B2D]/10 flex items-center justify-between text-[11px] font-bold">
                      <span className={isSelected ? 'text-emerald-700 font-black' : 'text-[#8C4B2D]/60'}>
                        {isSelected ? '✓ Dipilih' : 'Pilih'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Apa yang ingin kamu pelajari? */}
          <div className="space-y-3 pt-2">
            <div>
              <span className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider block">
                4. Pertanyaan Keingintahuanmu
              </span>
              <h3 className="text-sm sm:text-base font-black text-[#2A170C] mt-0.5">
                "Apa yang ingin kamu ketahui dari budaya tersebut?"
              </h3>
              <p className="text-xs text-[#61412A] font-semibold">
                Tuliskan satu kalimat pertanyaan atau rasa penasaranmu tentang <strong>{culture.name}</strong>:
              </p>
            </div>

            {/* Short Text Field */}
            <div className="space-y-2">
              <div className="relative">
                <textarea
                  rows={2}
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  placeholder={`Contoh: "Aku ingin tahu cerita di balik ${culture.name} dan bagaimana cara melestarikannya."`}
                  className="w-full p-3.5 rounded-2xl border-2 border-[#8C4B2D]/30 focus:border-[#527D65] focus:ring-3 focus:ring-[#527D65]/30 text-xs sm:text-sm font-semibold text-[#3B2011] outline-hidden bg-white shadow-inner"
                />
                <div className="absolute right-3 bottom-3 text-[10px] font-bold text-[#8C4B2D]/60">
                  {learningGoal.length} karakter
                </div>
              </div>

              {/* Template Suggestion Chips for SD Students */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8C4B2D]/80">
                  <Sparkles className="w-3.5 h-3.5 text-[#D99A35]" />
                  <span>Klik contoh kalimat untuk mengisi cepat:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    `Aku ingin tahu cerita di balik ${culture.name}.`,
                    `Aku ingin tahu cara memainkan atau mempraktikkan ${culture.name}.`,
                    `Aku ingin tahu makna dan sejarah dari ${culture.name}.`,
                    `Aku ingin mengenal tradisi daerah dari ${culture.region}.`,
                  ].map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleApplyTemplate(tpl)}
                      className="px-2.5 py-1 rounded-lg bg-[#8C4B2D]/10 hover:bg-[#8C4B2D]/20 text-[#8C4B2D] text-[11px] font-bold border border-[#8C4B2D]/25 transition-colors cursor-pointer text-left"
                    >
                      + "{tpl}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Rubric Feedback Live Strip */}
            <div className="p-3 rounded-2xl bg-[#FFF8EB] border border-[#D99A35]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D99A35] shrink-0" />
                <span className="font-bold text-[#8C4B2D]">Indikator Kualitas Rencana:</span>
                <span className="font-black text-[#527D65] bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                  {rubric.totalScore} / 6 Poin
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#8C4B2D]/80">
                {rubric.clarityFeedback}
              </span>
            </div>

          </div>

        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-[#FFFDF7] rounded-2xl border-2 border-[#8C4B2D]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playWoodClick();
              onBack();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-[#8C4B2D] hover:bg-[#8C4B2D]/10 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Pilih Budaya</span>
          </button>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
              isFormValid
                ? 'wood-button text-white cursor-pointer hover:scale-102'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-400'
            }`}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>TERBITKAN KARTU RENCANAKU</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

    </div>
  );
};
