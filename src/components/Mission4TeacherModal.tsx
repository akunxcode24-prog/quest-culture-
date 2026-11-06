import React, { useState } from 'react';
import { Mission4ActionPlan, Mission4RubricScores } from '../types';
import { exportActionPlanToCSV } from '../data/mission4Data';
import { X, Award, CheckCircle2, Save, Download, ShieldCheck, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission4TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  plan: Mission4ActionPlan;
  onUpdatePlan: (updatedPlan: Mission4ActionPlan) => void;
}

export const Mission4TeacherModal: React.FC<Mission4TeacherModalProps> = ({
  isOpen,
  onClose,
  studentName,
  plan,
  onUpdatePlan,
}) => {
  const [rubricScores, setRubricScores] = useState<Mission4RubricScores>(plan.rubricScores);
  const [teacherNotes, setTeacherNotes] = useState<string>(plan.teacherNotes || '');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleScoreChange = (field: 'completenessScore' | 'suitabilityScore' | 'clarityScore', value: number) => {
    sound.playWoodClick();
    const updated = {
      ...rubricScores,
      [field]: value,
    };
    updated.totalScore = updated.completenessScore + updated.suitabilityScore + updated.clarityScore;
    setRubricScores(updated);
  };

  const handleSave = () => {
    sound.playSuccessChime();
    const updatedPlan: Mission4ActionPlan = {
      ...plan,
      rubricScores,
      teacherNotes,
      updatedAt: new Date().toISOString(),
    };
    onUpdatePlan(updatedPlan);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleDownloadCSV = () => {
    sound.playWoodClick();
    exportActionPlanToCSV(plan, studentName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="wood-panel w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden border-4 border-[#8C4B2D] shadow-2xl flex flex-col bg-[#FFFDF7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#D99A35] via-[#C58420] to-[#8C4B2D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-amber-100">
                  Dashboard Evaluasi Guru &middot; Misi 4
                </span>
                <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-bold">
                  ID: {plan.participantCode}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-tight">
                Penilaian Rencana Aksi Budaya — {studentName}
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

        {/* Total Score Header Bar */}
        <div className="p-3 sm:p-4 bg-[#F7EBD2] border-b border-[#8C4B2D]/20 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#8C4B2D]">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D99A35]" />
            <span>
              Total Skor Rencana Aksi: <strong className="text-lg text-[#527D65]">{rubricScores.totalScore}</strong> / 6 Poin
            </span>
          </div>

          <button
            onClick={handleDownloadCSV}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-xs font-black text-[#8C4B2D] border border-[#8C4B2D]/30 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Laporan CSV</span>
          </button>
        </div>

        {/* Scrollable Rubric Review Details */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-left">
          
          {/* Plan Summary Inset */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#8C4B2D]/20 shadow-xs space-y-2 text-xs">
            <div className="font-black text-[#8C4B2D] uppercase tracking-wide">
              Ringkasan Isian Siswa:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#4A2D1A]">
              <div><strong>Budaya:</strong> {plan.culturalName} ({plan.culturalRegion} - {plan.culturalCategory})</div>
              <div><strong>Kegiatan:</strong> {plan.activityTitle}</div>
              <div><strong>Pendamping:</strong> {plan.helperLabel}</div>
              <div><strong>Status:</strong> {plan.isSaved ? 'Tersimpan di Profil' : 'Draf'}</div>
            </div>
            <div className="pt-2 border-t border-[#8C4B2D]/10">
              <strong className="text-[#8C4B2D]">Hal yang Ingin Dipelajari:</strong>
              <p className="mt-0.5 p-2 rounded-lg bg-[#FDFBF7] border border-[#8C4B2D]/15 font-semibold text-[#3B2011] italic">
                "{plan.learningGoal}"
              </p>
            </div>
          </div>

          {/* Rubric Criteria 1: Kelengkapan Isian */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#8C4B2D]/20 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black text-[#D99A35] uppercase tracking-wider block">
                  Aspek 1 (Skor 0–2)
                </span>
                <h4 className="text-sm font-black text-[#2B170C]">
                  1. Kelengkapan Isian
                </h4>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-[#8C4B2D]/70 mr-1">Skor Guru:</span>
                {[0, 1, 2].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleScoreChange('completenessScore', s)}
                    className={`w-7 h-7 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                      rubricScores.completenessScore === s
                        ? 'bg-[#527D65] text-white shadow-xs'
                        : 'bg-[#8C4B2D]/10 text-[#8C4B2D] hover:bg-[#8C4B2D]/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xs text-[#52331E] space-y-1 bg-[#FDFBF7] p-2.5 rounded-xl border border-[#8C4B2D]/10">
              <p>• <strong>Skor 0:</strong> Banyak isian kosong.</p>
              <p>• <strong>Skor 1:</strong> Sebagian isian terisi.</p>
              <p>• <strong>Skor 2:</strong> Seluruh isian (kegiatan, budaya, pendamping, pertanyaan) terisi lengkap.</p>
            </div>
          </div>

          {/* Rubric Criteria 2: Kesesuaian Kegiatan dengan Budaya */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#8C4B2D]/20 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black text-[#D99A35] uppercase tracking-wider block">
                  Aspek 2 (Skor 0–2)
                </span>
                <h4 className="text-sm font-black text-[#2B170C]">
                  2. Kesesuaian Kegiatan dengan Budaya
                </h4>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-[#8C4B2D]/70 mr-1">Skor Guru:</span>
                {[0, 1, 2].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleScoreChange('suitabilityScore', s)}
                    className={`w-7 h-7 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                      rubricScores.suitabilityScore === s
                        ? 'bg-[#527D65] text-white shadow-xs'
                        : 'bg-[#8C4B2D]/10 text-[#8C4B2D] hover:bg-[#8C4B2D]/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xs text-[#52331E] space-y-1 bg-[#FDFBF7] p-2.5 rounded-xl border border-[#8C4B2D]/10">
              <p>• <strong>Skor 0:</strong> Kegiatan tidak sesuai dengan budaya yang dipilih.</p>
              <p>• <strong>Skor 1:</strong> Kegiatan sebagian sesuai (dapat diterapkan secara kreatif).</p>
              <p>• <strong>Skor 2:</strong> Kegiatan sangat sesuai dan logis dengan karakteristik budaya terpilih.</p>
            </div>
          </div>

          {/* Rubric Criteria 3: Kejelasan Hal yang Ingin Dipelajari */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#8C4B2D]/20 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black text-[#D99A35] uppercase tracking-wider block">
                  Aspek 3 (Skor 0–2)
                </span>
                <h4 className="text-sm font-black text-[#2B170C]">
                  3. Kejelasan Hal yang Ingin Dipelajari
                </h4>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-[#8C4B2D]/70 mr-1">Skor Guru:</span>
                {[0, 1, 2].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleScoreChange('clarityScore', s)}
                    className={`w-7 h-7 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                      rubricScores.clarityScore === s
                        ? 'bg-[#527D65] text-white shadow-xs'
                        : 'bg-[#8C4B2D]/10 text-[#8C4B2D] hover:bg-[#8C4B2D]/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xs text-[#52331E] space-y-1 bg-[#FDFBF7] p-2.5 rounded-xl border border-[#8C4B2D]/10">
              <p>• <strong>Skor 0:</strong> Jawaban tidak jelas atau tidak diisi.</p>
              <p>• <strong>Skor 1:</strong> Jawaban masih umum tanpa kekhasan budaya.</p>
              <p>• <strong>Skor 2:</strong> Jawaban spesifik, bernalar kritis, dan berkaitan erat dengan budaya sasaran.</p>
            </div>
          </div>

          {/* Teacher Feedback Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#8C4B2D]">
              Catatan Apresiasi & Bimbingan Guru untuk Siswa (Opsional):
            </label>
            <textarea
              rows={2}
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              placeholder="Contoh: Rencana aksi sangat menarik dan melibatkan keluarga dengan baik!"
              className="w-full p-2.5 text-xs rounded-xl border border-[#8C4B2D]/30 bg-white text-[#3B2011]"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F7EBD2] border-t-2 border-[#8C4B2D]/20 flex items-center justify-between gap-3">
          {saveSuccess ? (
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Penyesuaian nilai guru berhasil disimpan!</span>
            </span>
          ) : (
            <span className="text-xs text-[#8C4B2D]/70 font-semibold">
              Skor dan catatan akan tersimpan pada profil petualang siswa.
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
              <span>Simpan Penilaian</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
