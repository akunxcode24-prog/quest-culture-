import React, { useState } from 'react';
import { Mission3ProgressRecord, ScenarioDecisionRecord } from '../types';
import { MISSION_3_SCENARIOS } from '../data/mission3Data';
import { X, Award, CheckCircle2, Save, User, ShieldCheck, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission3TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  anonymousId: string;
  progressRecord: Mission3ProgressRecord;
  onUpdateDecisions: (updatedDecisions: Record<string, ScenarioDecisionRecord>) => void;
}

export const Mission3TeacherModal: React.FC<Mission3TeacherModalProps> = ({
  isOpen,
  onClose,
  username,
  anonymousId,
  progressRecord,
  onUpdateDecisions,
}) => {
  const [decisions, setDecisions] = useState<Record<string, ScenarioDecisionRecord>>(
    progressRecord.decisions
  );
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const handleAdjustReasonScore = (scenarioId: string, score: number) => {
    sound.playWoodClick();
    setDecisions((prev) => ({
      ...prev,
      [scenarioId]: {
        ...prev[scenarioId],
        reasonScore: score,
      },
    }));
  };

  const handleAdjustReflectionScore = (scenarioId: string, score: number) => {
    sound.playWoodClick();
    setDecisions((prev) => ({
      ...prev,
      [scenarioId]: {
        ...prev[scenarioId],
        reflectionScore: score,
      },
    }));
  };

  const handleFeedbackChange = (scenarioId: string, text: string) => {
    setDecisions((prev) => ({
      ...prev,
      [scenarioId]: {
        ...prev[scenarioId],
        teacherFeedback: text,
      },
    }));
  };

  const handleSave = () => {
    sound.playSuccessChime();
    onUpdateDecisions(decisions);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      onClose();
    }, 1200);
  };

  // Calculate live adjusted total
  const adjustedTotal = Object.values(decisions).reduce(
    (acc, d) => acc + (d.reasonScore || 0) + (d.reflectionScore || 0),
    0
  );
  const maxPossible = MISSION_3_SCENARIOS.length * 4; // 2 pts for reason + 2 pts for reflection per scenario

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="wood-panel w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden border-4 border-[#8C4B2D] shadow-2xl flex flex-col bg-[#FFFDF7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#8C4B2D] to-[#6C341C] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D99A35] flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#F7EBD2]/80 uppercase">
                  Dashboard Evaluasi Guru
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  ID: {anonymousId}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-tight">
                Penilaian Penalaran Budaya — {username}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playWoodClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total Score Summary Bar */}
        <div className="p-3 sm:p-4 bg-[#F7EBD2] border-b border-[#8C4B2D]/20 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#8C4B2D]">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D99A35]" />
            <span>Total Skor Penalaran: <strong className="text-lg text-[#527D65]">{adjustedTotal}</strong> / {maxPossible} Poin</span>
          </div>
          <div className="text-[11px] font-semibold text-[#8C4B2D]/80">
            *Guru berhak menaikkan atau menyesuaikan skor berdasarkan pemahaman kontekstual siswa.
          </div>
        </div>

        {/* Scrollable Scenario Details */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-left">
          
          {/* Rubric Reference Box */}
          <div className="p-3.5 rounded-2xl bg-[#FFF8EB] border border-[#D99A35]/50 text-xs text-[#54341F] space-y-1">
            <div className="font-black text-[#8C4B2D] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#D99A35]" />
              <span>Pedoman Penilaian Rubrik SD (Skor 0–2):</span>
            </div>
            <p><strong>Skor 0:</strong> Tidak memberikan alasan / jawaban kosong / tidak terkait konteks budaya.</p>
            <p><strong>Skor 1:</strong> Alasan umum tanpa menyebut akibat bagi budaya/orang lain (contoh: "karena seru", "karena suka").</p>
            <p><strong>Skor 2:</strong> Alasan mengaitkan akibat/dampak nyata bagi kelestarian budaya, teman, atau akurasi informasi.</p>
          </div>

          {/* Scenarios Review Cards */}
          {MISSION_3_SCENARIOS.map((sc, index) => {
            const decision = decisions[sc.id] || {
              scenarioId: sc.id,
              scenarioTitle: sc.title,
              chosenActionId: 'A',
              triedActionIds: ['A'],
              triedBothActions: false,
              reasonType: 'preset',
              reasonText: sc.presetReasons[0].text,
              reasonScore: 2,
              reflectionText: 'Refleksi awal...',
              reflectionScore: 2,
              updatedAt: new Date().toISOString(),
            };

            return (
              <div
                key={sc.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#8C4B2D]/20 shadow-xs space-y-4"
              >
                {/* Scenario Header */}
                <div className="flex items-center justify-between border-b border-[#8C4B2D]/15 pb-2.5">
                  <div>
                    <span className="text-[11px] font-black text-[#8C4B2D] uppercase tracking-wider">
                      Skenario {index + 1}: {sc.topic}
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-[#2B170C]">
                      {sc.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                      Pilihan Akhir: <strong>{decision.chosenActionId}</strong>
                    </span>
                    {decision.triedBothActions && (
                      <span className="text-xs px-2 py-1 rounded-lg bg-blue-100 text-blue-800 font-bold border border-blue-300">
                        ✓ Mencoba 2 Pilihan
                      </span>
                    )}
                  </div>
                </div>

                {/* Question 1: Reason Review & Override */}
                <div className="space-y-2 bg-[#FDFBF7] p-3 rounded-xl border border-[#8C4B2D]/15">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#8C4B2D]">
                      1. Alasan Tindakan ({decision.reasonType === 'preset' ? 'Pilihan Bergambar' : 'Tulisan Sendiri'}):
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-bold text-[#8C4B2D]/70 mr-1">Skor Guru:</span>
                      {[0, 1, 2].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleAdjustReasonScore(sc.id, s)}
                          className={`w-6 h-6 rounded-md text-xs font-black transition-colors cursor-pointer ${
                            decision.reasonScore === s
                              ? 'bg-[#527D65] text-white shadow-xs'
                              : 'bg-[#8C4B2D]/10 text-[#8C4B2D] hover:bg-[#8C4B2D]/20'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#3B2011] bg-white p-2.5 rounded-lg border border-[#8C4B2D]/10 italic">
                    "{decision.reasonText || 'Tidak ada alasan'}"
                  </p>
                </div>

                {/* Question 2: Reflection Review & Override */}
                <div className="space-y-2 bg-[#FDFBF7] p-3 rounded-xl border border-[#8C4B2D]/15">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#527D65]">
                      2. Refleksi Siswa:
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-bold text-[#8C4B2D]/70 mr-1">Skor Guru:</span>
                      {[0, 1, 2].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleAdjustReflectionScore(sc.id, s)}
                          className={`w-6 h-6 rounded-md text-xs font-black transition-colors cursor-pointer ${
                            decision.reflectionScore === s
                              ? 'bg-[#527D65] text-white shadow-xs'
                              : 'bg-[#8C4B2D]/10 text-[#8C4B2D] hover:bg-[#8C4B2D]/20'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#3B2011] bg-white p-2.5 rounded-lg border border-[#8C4B2D]/10 italic">
                    "{decision.reflectionText || 'Belum diisi'}"
                  </p>
                </div>

                {/* Teacher Note Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#8C4B2D]/80">
                    Catatan Apresiasi / Bimbingan Guru (Opsional):
                  </label>
                  <input
                    type="text"
                    value={decision.teacherFeedback || ''}
                    onChange={(e) => handleFeedbackChange(sc.id, e.target.value)}
                    placeholder="Contoh: Sangat kritis dan memiliki kepedulian tinggi terhadap kelestarian dongeng!"
                    className="w-full p-2 text-xs rounded-lg border border-[#8C4B2D]/20 bg-[#FFFDF7] text-[#3B2011]"
                  />
                </div>
              </div>
            );
          })}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F7EBD2] border-t-2 border-[#8C4B2D]/20 flex items-center justify-between gap-3">
          {saveToast ? (
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Penyesuaian nilai guru berhasil disimpan!</span>
            </span>
          ) : (
            <span className="text-xs text-[#8C4B2D]/70 font-semibold">
              Perubahan nilai akan langsung tersimpan di profil siswa.
            </span>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playWoodClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#8C4B2D] hover:bg-[#8C4B2D]/10 cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={handleSave}
              className="wood-button px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white flex items-center gap-2 cursor-pointer shadow-md uppercase tracking-wider"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Penyesuaian</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
