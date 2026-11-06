import React, { useState, useEffect } from 'react';
import { Mission3Scenario, ScenarioDecisionRecord, SproutStage } from '../types';
import { Mission3SproutIndicator } from './Mission3SproutIndicator';
import { evaluateReasonScore, evaluateReflectionScore } from '../data/mission3Data';
import { sound } from '../utils/audio';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  MessageCircle,
  HelpCircle,
  CheckCircle,
  CheckCircle2,
  Users,
  BookOpen,
  Shield,
  Heart,
  Edit3,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';

interface Mission3ScenarioCardProps {
  scenario: Mission3Scenario;
  scenarioIndex: number;
  totalScenarios: number;
  existingRecord?: ScenarioDecisionRecord;
  onSaveAndNext: (record: ScenarioDecisionRecord) => void;
  onPreviousScenario?: () => void;
}

export const Mission3ScenarioCard: React.FC<Mission3ScenarioCardProps> = ({
  scenario,
  scenarioIndex,
  totalScenarios,
  existingRecord,
  onSaveAndNext,
  onPreviousScenario,
}) => {
  // Current state of student interaction for this scenario
  const [selectedActionId, setSelectedActionId] = useState<'A' | 'B' | null>(
    existingRecord ? existingRecord.chosenActionId : null
  );
  const [triedActionIds, setTriedActionIds] = useState<('A' | 'B')[]>(
    existingRecord ? existingRecord.triedActionIds : []
  );
  const [reasonMode, setReasonMode] = useState<'preset' | 'custom'>(
    existingRecord?.reasonType || 'preset'
  );
  const [selectedPresetReasonId, setSelectedPresetReasonId] = useState<string | null>(() => {
    if (existingRecord?.reasonType === 'preset') {
      const match = scenario.presetReasons.find((r) => r.text === existingRecord.reasonText);
      return match ? match.id : scenario.presetReasons[0].id;
    }
    return scenario.presetReasons[0].id;
  });
  const [customReasonText, setCustomReasonText] = useState<string>(
    existingRecord?.reasonType === 'custom' ? existingRecord.reasonText : ''
  );
  const [reflectionText, setReflectionText] = useState<string>(
    existingRecord?.reflectionText || ''
  );
  const [showTeacherRubric, setShowTeacherRubric] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Sprout indicator stage: starts at 'sedang', then reflects chosen action
  const currentSproutStage: SproutStage = selectedActionId
    ? scenario.options[selectedActionId].resultingSprout
    : 'sedang';

  // Current active illustration to display
  const activeImage = selectedActionId
    ? scenario.options[selectedActionId].imageResult
    : scenario.initialImage;

  // Active option details if selected
  const activeOption = selectedActionId ? scenario.options[selectedActionId] : null;

  // Calculate live reasoning score
  const selectedPresetObj = scenario.presetReasons.find((r) => r.id === selectedPresetReasonId);
  const currentReasonText = reasonMode === 'preset'
    ? (selectedPresetObj?.text || '')
    : customReasonText;

  const reasonEvaluation = evaluateReasonScore(
    currentReasonText,
    reasonMode === 'preset' ? selectedPresetObj?.defaultScore : undefined
  );

  const reflectionEvaluation = evaluateReflectionScore(reflectionText);

  // Check if student has tried both choices
  const hasTriedBoth = triedActionIds.includes('A') && triedActionIds.includes('B');

  const handleSelectAction = (actionId: 'A' | 'B') => {
    sound.playWoodClick();
    setIsTransitioning(true);

    if (actionId === 'A') {
      sound.playSproutGrow();
    } else {
      sound.playSproutShrink();
    }

    setTimeout(() => {
      setSelectedActionId(actionId);
      setTriedActionIds((prev) => (prev.includes(actionId) ? prev : [...prev, actionId]));
      setIsTransitioning(false);
    }, 250);
  };

  const handleTryOtherAction = () => {
    if (!selectedActionId) return;
    const otherId: 'A' | 'B' = selectedActionId === 'A' ? 'B' : 'A';
    handleSelectAction(otherId);
  };

  const handleApplyWordChip = (word: string) => {
    sound.playWoodClick();
    setReflectionText((prev) => {
      if (!prev) return word;
      if (prev.endsWith(' ') || prev.endsWith('.')) return `${prev}${word}`;
      return `${prev}, ${word}`;
    });
  };

  const handleSaveAndProceed = () => {
    if (!selectedActionId) return;

    sound.playSuccessChime();

    const record: ScenarioDecisionRecord = {
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      chosenActionId: selectedActionId,
      triedActionIds: triedActionIds.length > 0 ? triedActionIds : [selectedActionId],
      triedBothActions: hasTriedBoth,
      reasonType: reasonMode,
      reasonText: currentReasonText,
      reasonScore: reasonEvaluation.score,
      reflectionText: reflectionText.trim() || 'Saya belajar bahwa menjaga warisan budaya harus dimulai dari diri sendiri dan dilakukan bersama teman.',
      reflectionScore: reflectionEvaluation.score || 1,
      teacherFeedback: existingRecord?.teacherFeedback,
      updatedAt: new Date().toISOString(),
    };

    onSaveAndNext(record);
  };

  const renderReasonIcon = (iconType: string) => {
    switch (iconType) {
      case 'users':
        return <Users className="w-4 h-4 text-emerald-600" />;
      case 'book':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-amber-600" />;
      case 'heart':
        return <Heart className="w-4 h-4 text-rose-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Scenario Progress Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FFFBF2] p-3 sm:p-4 rounded-2xl border-2 border-[#8C4B2D]/20 shadow-xs">
        <div className="flex items-center gap-2">
          {onPreviousScenario && scenarioIndex > 0 && (
            <button
              onClick={() => {
                sound.playWoodClick();
                onPreviousScenario();
              }}
              className="p-1.5 rounded-xl hover:bg-[#8C4B2D]/10 text-[#8C4B2D] border border-[#8C4B2D]/20 cursor-pointer"
              title="Ke skenario sebelumnya"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8C4B2D] text-white text-[11px] font-black uppercase tracking-wider">
                Skenario {scenario.scenarioNumber} dari {totalScenarios}
              </span>
              <span className="text-xs font-bold text-[#8C4B2D]/70 hidden sm:inline">
                {scenario.topic}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-[#8C4B2D] mt-0.5">
              {scenario.title}
            </h2>
          </div>
        </div>

        {/* Multi-step progress dots */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {[...Array(totalScenarios)].map((_, i) => (
            <div
              key={i}
              className={`w-7 h-2.5 rounded-full transition-all duration-300 ${
                i === scenarioIndex
                  ? 'bg-[#D99A35] w-10 ring-2 ring-[#D99A35]/30'
                  : i < scenarioIndex
                  ? 'bg-[#527D65]'
                  : 'bg-[#8C4B2D]/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Interactive Stage Panel */}
      <div className="wood-panel rounded-3xl p-4 sm:p-6 border-3 sm:border-4 border-[#8C4B2D] shadow-xl bg-[#FFFDF7] space-y-6">
        
        {/* BIG 16:9 3D Illustration Viewport */}
        <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#2B170C] to-[#150A05] border-3 border-[#8C4B2D] shadow-inner group">
          
          {/* Main Visual Image (Preserves complete illustration with object-contain & beautiful atmospheric backdrop) */}
          <div
            className={`w-full h-full relative transition-all duration-500 ${
              isTransitioning ? 'opacity-40 scale-98 blur-xs' : 'opacity-100 scale-100 blur-0'
            }`}
          >
            {/* Ambient Blurred Backdrop for Cinematic Glow */}
            <img
              src={activeImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-md opacity-35 scale-110 pointer-events-none"
            />

            {/* Crisp 3D Illustration (Contained & Uncropped) */}
            <img
              src={activeImage}
              alt={scenario.title}
              className="relative z-10 w-full h-full object-contain mx-auto transition-transform duration-700 select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Animated Atmospheric Ambient Layer (Gentle leaf particles & warm sunlight sheen) */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

            {/* Subtle animated floating motes/leaves */}
            <div className="absolute top-4 left-6 text-emerald-300/60 animate-bounce duration-1000 text-xs">
              🍃
            </div>
            <div className="absolute bottom-6 right-8 text-amber-200/50 animate-pulse text-xs">
              ✨
            </div>

            {/* Active scene badge in top-left */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md text-white text-xs font-black border border-white/20 shadow-md flex items-center gap-1.5">
                {selectedActionId ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Hasil: Pilihan {selectedActionId}</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-3.5 h-3.5 text-[#D99A35]" />
                    <span>Situasi Awal — Memerlukan Tindakanmu</span>
                  </>
                )}
              </span>

              {hasTriedBoth && (
                <span className="px-2.5 py-1 rounded-xl bg-[#527D65]/90 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-200" />
                  <span>2 Pilihan Telah Dicoba</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scenario Story Narrative (3–4 Sentences, Kid-friendly) */}
        <div className="bg-[#FFF8EB] p-4 sm:p-5 rounded-2xl border-2 border-[#D99A35]/40 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-[#8C4B2D] uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#8C4B2D]" />
            <span>Kisah Cerita Budaya</span>
          </div>
          <div className="space-y-1.5 text-sm sm:text-base text-[#3E2413] font-semibold leading-relaxed">
            {scenario.storyParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* 2 Action Choice Cards (Pilihan A & Pilihan B) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-[#8C4B2D] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D99A35]" />
              <span>Pilih Tindakanmu:</span>
            </h3>
            <span className="text-[11px] font-bold text-[#8C4B2D]/70">
              {selectedActionId ? 'Klik tindakan lain untuk membandingkan akibatnya' : 'Pilih salah satu untuk melihat perubahannya'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* OPTION A CARD */}
            <div
              onClick={() => handleSelectAction('A')}
              className={`p-4 sm:p-5 rounded-2xl border-3 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                selectedActionId === 'A'
                  ? 'bg-emerald-50 border-emerald-600 ring-4 ring-emerald-300/60 shadow-lg scale-101'
                  : 'bg-white border-[#8C4B2D]/30 hover:border-[#8C4B2D] hover:shadow-md'
              }`}
            >
              {triedActionIds.includes('A') && (
                <div className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>Pernah Dicoba</span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    A
                  </span>
                  <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">
                    {scenario.options.A.badgeLabel}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-[#2A170C] leading-snug">
                  {scenario.options.A.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#503522] mt-1.5 leading-relaxed font-medium">
                  {scenario.options.A.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#8C4B2D]/15 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>{selectedActionId === 'A' ? '✓ Tindakan Terpilih' : 'Pilih Tindakan A'}</span>
                <ChevronRight className="w-4 h-4 text-emerald-700" />
              </div>
            </div>

            {/* OPTION B CARD */}
            <div
              onClick={() => handleSelectAction('B')}
              className={`p-4 sm:p-5 rounded-2xl border-3 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                selectedActionId === 'B'
                  ? 'bg-amber-50 border-amber-600 ring-4 ring-amber-300/60 shadow-lg scale-101'
                  : 'bg-white border-[#8C4B2D]/30 hover:border-[#8C4B2D] hover:shadow-md'
              }`}
            >
              {triedActionIds.includes('B') && (
                <div className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-amber-600" />
                  <span>Pernah Dicoba</span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-xl bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    B
                  </span>
                  <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                    {scenario.options.B.badgeLabel}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-[#2A170C] leading-snug">
                  {scenario.options.B.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#503522] mt-1.5 leading-relaxed font-medium">
                  {scenario.options.B.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#8C4B2D]/15 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>{selectedActionId === 'B' ? '✓ Tindakan Terpilih' : 'Pilih Tindakan B'}</span>
                <ChevronRight className="w-4 h-4 text-amber-700" />
              </div>
            </div>

          </div>
        </div>

        {/* Visual Sprout Indicator for Cultural Opportunity */}
        <Mission3SproutIndicator
          stage={currentSproutStage}
          changeNote={activeOption ? activeOption.indicatorChangeText : 'Pilih tindakan A atau B untuk melihat pengaruhnya pada tunas kesempatan pewarisan budaya.'}
        />

        {/* RESULTS & DIALOGUE SECTION (Active after selection) */}
        {activeOption && (
          <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-bottom-3 duration-300">
            
            {/* CULTU Mascot Reaction & Lesson Message */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF9ED] border-2 border-[#D99A35] flex items-start gap-4 text-left shadow-sm">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-[#8C4B2D] shrink-0 bg-[#8C4B2D]/10">
                <img
                  src="/src/assets/images/cultu_mascot_guide_1793969033044.jpg"
                  alt="Cultu"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider">
                    Pesan CULTU
                  </span>
                  <span className="text-[11px] font-bold text-[#8C4B2D]/70">
                    Akibat Pilihan {selectedActionId}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-black text-[#8C4B2D] leading-snug">
                  "{activeOption.resultMessage}"
                </p>
                <p className="text-xs sm:text-sm text-[#4E2D17] font-semibold leading-relaxed">
                  {activeOption.cultuDialogue}
                </p>
              </div>
            </div>

            {/* Prominent "Coba Pilihan Lain" Button */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFDF7] border-2 border-dashed border-[#8C4B2D]/35">
              <div className="text-left text-xs text-[#52331E] font-semibold">
                <strong className="font-bold text-[#8C4B2D]">Ingin membandingkan suasana cerita?</strong>
                <p className="text-[11px] text-[#8C4B2D]/75">
                  Kamu bisa mencoba pilihan lain untuk melihat akibat yang berbeda tanpa kehilangan skormu!
                </p>
              </div>

              <button
                onClick={handleTryOtherAction}
                className="wood-button-secondary px-4 py-2 rounded-xl text-xs font-black text-white shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Coba Pilihan {selectedActionId === 'A' ? 'B' : 'A'}</span>
              </button>
            </div>

            {/* QUESTION 1: REASON SELECTION & ENTRY */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#8C4B2D]/25 text-left space-y-4">
              <div>
                <span className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider">
                  Alasan Pilihan Siswa
                </span>
                <h4 className="text-sm sm:text-base font-black text-[#2B170C] mt-0.5">
                  "Mengapa kamu memilih tindakan tersebut?"
                </h4>
                <p className="text-xs text-[#63432D] font-medium mt-0.5">
                  Pilih salah satu alasan bergambar di bawah, atau tuliskan alasan dengan kata-katamu sendiri:
                </p>
              </div>

              {/* Mode Toggle: Preset vs Custom */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playWoodClick();
                    setReasonMode('preset');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    reasonMode === 'preset'
                      ? 'bg-[#8C4B2D] text-white shadow-xs'
                      : 'bg-[#8C4B2D]/10 text-[#8C4B2D] hover:bg-[#8C4B2D]/20'
                  }`}
                >
                  Pilihan Alasan Bergambar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playWoodClick();
                    setReasonMode('custom');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    reasonMode === 'custom'
                      ? 'bg-[#8C4B2D] text-white shadow-xs'
                      : 'bg-[#8C4B2D]/10 text-[#8C4B2D] hover:bg-[#8C4B2D]/20'
                  }`}
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Tulis Alasan Sendiri</span>
                </button>
              </div>

              {/* 3 Preset Reason Cards */}
              {reasonMode === 'preset' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {scenario.presetReasons.map((preset) => {
                    const isChosen = selectedPresetReasonId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          sound.playWoodClick();
                          setSelectedPresetReasonId(preset.id);
                        }}
                        className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isChosen
                            ? 'bg-[#FFF8EB] border-[#D99A35] ring-2 ring-[#D99A35]/50 shadow-xs'
                            : 'bg-white border-[#8C4B2D]/20 hover:border-[#8C4B2D]/50'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#8C4B2D]/10 flex items-center justify-center shrink-0 mt-0.5">
                            {renderReasonIcon(preset.iconType)}
                          </div>
                          <span className="text-xs font-bold text-[#3B2011] leading-snug">
                            {preset.text}
                          </span>
                        </div>
                        <div className="mt-2 text-right">
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                              isChosen ? 'bg-[#D99A35] text-white' : 'text-[#8C4B2D]/50'
                            }`}
                          >
                            {isChosen ? '✓ Dipilih' : 'Pilih'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Custom Reason Input */
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={customReasonText}
                    onChange={(e) => setCustomReasonText(e.target.value)}
                    placeholder="Tuliskan 1 kalimat alasanmu memilih tindakan tersebut..."
                    className="w-full p-3 rounded-xl border-2 border-[#8C4B2D]/30 focus:border-[#8C4B2D] focus:ring-2 focus:ring-[#D99A35]/40 text-xs sm:text-sm font-semibold text-[#3B2011] outline-hidden bg-[#FFFDF7]"
                  />
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#8C4B2D]/70">
                    <span>Contoh: "Saya memilih ini agar warisan budaya tidak punah dan teman-teman ikut belajar."</span>
                    <span>{customReasonText.length} karakter</span>
                  </div>
                </div>
              )}

              {/* Reasoning Live Assessment Badge */}
              <div className="p-2.5 rounded-xl bg-[#F7EBD2]/70 border border-[#8C4B2D]/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D99A35]" />
                  <span className="font-bold text-[#8C4B2D]">Penalaran Alasan:</span>
                  <span className="font-black text-[#527D65] bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                    Skor {reasonEvaluation.score} / 2
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#8C4B2D]/80 truncate max-w-xs">
                  {reasonEvaluation.feedback}
                </span>
              </div>
            </div>

            {/* QUESTION 2: REFLECTION */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#8C4B2D]/25 text-left space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#8C4B2D] shrink-0 bg-[#8C4B2D]/10">
                  <img
                    src="/src/assets/images/cultu_mascot_guide_1793969033044.jpg"
                    alt="Cultu Refleksi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs font-black text-[#527D65] uppercase tracking-wider">
                    Refleksi Diri
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-[#2B170C] leading-snug">
                    "Apa yang kamu pelajari dari pilihanmu?"
                  </h4>
                  <p className="text-xs text-[#70492E] font-medium mt-0.5">
                    💡 {scenario.cultuReflectionTip}
                  </p>
                </div>
              </div>

              {/* Reflection Input Field */}
              <textarea
                rows={3}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Tuliskan pelajaran atau hikmah yang kamu dapatkan di sini (misal: pentingnya mengajak teman, tidak mudah percaya kabar burung)..."
                className="w-full p-3.5 rounded-xl border-2 border-[#8C4B2D]/30 focus:border-[#527D65] focus:ring-2 focus:ring-[#527D65]/40 text-xs sm:text-sm font-semibold text-[#3B2011] outline-hidden bg-[#FFFDF7]"
              />

              {/* Quick Word Helper Chips for Kids */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-[#8C4B2D]/70 mr-1">Bantuan Kata:</span>
                {[
                  'Menjaga budaya',
                  'Mengajak teman',
                  'Periksa sumber dulu',
                  'Bermain bersama',
                  'Bangga tradisi nusantara',
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyWordChip(chip)}
                    className="px-2.5 py-1 rounded-lg bg-[#527D65]/10 hover:bg-[#527D65]/20 text-[#2C523F] text-[11px] font-bold border border-[#527D65]/30 cursor-pointer transition-colors"
                  >
                    + {chip}
                  </button>
                ))}
              </div>

              {/* Reflection Score Badge */}
              <div className="p-2.5 rounded-xl bg-[#EAF5EF] border border-[#527D65]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#527D65]" />
                  <span className="font-bold text-[#2C523F]">Penalaran Refleksi:</span>
                  <span className="font-black text-[#2C523F] bg-white px-2 py-0.5 rounded-md border border-[#527D65]/30">
                    Skor {reflectionEvaluation.score} / 2
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#2C523F]/85 truncate max-w-xs">
                  {reflectionEvaluation.feedback}
                </span>
              </div>
            </div>

            {/* Teacher Rubric Inspection Accordion Toggle */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowTeacherRubric(!showTeacherRubric)}
                className="text-[11px] font-bold text-[#8C4B2D]/80 hover:text-[#8C4B2D] underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showTeacherRubric ? 'Sembunyikan Rubrik Penilaian Guru' : 'Lihat Rubrik Penilaian Guru (Skor 0–2)'}</span>
              </button>

              {showTeacherRubric && (
                <div className="mt-2 p-3.5 rounded-xl bg-[#FFFBF2] border border-[#8C4B2D]/30 text-left text-xs space-y-2 animate-in fade-in">
                  <div className="font-black text-[#8C4B2D]">Rubrik Penalaran Misi 3 (Rentang Skor 0–2):</div>
                  <ul className="space-y-1 text-[#50321F] font-medium">
                    <li><strong>Skor 0:</strong> Tidak memberikan alasan/refleksi atau jawaban tidak berkaitan dengan budaya.</li>
                    <li><strong>Skor 1:</strong> Alasan umum tanpa menyebut dampak budaya (contoh: "karena seru", "karena suka", "bagus").</li>
                    <li><strong>Skor 2:</strong> Alasan menyebut akibat/dampak bagi kelestarian budaya atau orang lain (contoh: "agar teman-teman jadi tahu", "menjaga agar cerita tidak punah").</li>
                  </ul>
                  <p className="text-[11px] text-[#8C4B2D]/70 italic">
                    *Guru dapat memeriksa dan menyesuaikan skor ini pada laporan akhir siswa.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Proceed Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#8C4B2D]/20">
              <div className="text-xs text-[#8C4B2D] font-bold text-left">
                <span>Total Pilihan Dicoba: <strong>{triedActionIds.length} dari 2</strong></span>
                {!hasTriedBoth && (
                  <span className="text-[#8C4B2D]/70 block sm:inline sm:ml-2">
                    (Disarankan mencoba pilihan lain untuk belajar lebih banyak!)
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleSaveAndProceed}
                className="wood-button w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{scenarioIndex === totalScenarios - 1 ? 'Selesaikan Misi 3' : 'Lanjut ke Skenario Berikutnya'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
