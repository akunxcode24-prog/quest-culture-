import React, { useState } from 'react';
import { Mission3ProgressRecord, ScenarioDecisionRecord } from '../types';
import { MISSION_3_BADGE, MISSION_3_SCENARIOS } from '../data/mission3Data';
import { Mission3TeacherModal } from './Mission3TeacherModal';
import { sound } from '../utils/audio';
import {
  Sparkles,
  Award,
  Star,
  Zap,
  Shield,
  RotateCcw,
  Compass,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Mission3CompletionProps {
  username: string;
  anonymousId: string;
  progressRecord: Mission3ProgressRecord;
  onRestartMission: () => void;
  onBackToDashboard: () => void;
  onGoToMission4?: () => void;
  onUpdateDecisions: (updatedDecisions: Record<string, ScenarioDecisionRecord>) => void;
}

export const Mission3Completion: React.FC<Mission3CompletionProps> = ({
  username,
  anonymousId,
  progressRecord,
  onRestartMission,
  onBackToDashboard,
  onGoToMission4,
  onUpdateDecisions,
}) => {
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [expandedScenarioId, setExpandedScenarioId] = useState<string | null>(
    MISSION_3_SCENARIOS[0].id
  );

  const decisionsList = Object.values(progressRecord.decisions);
  const totalOptionsExplored = decisionsList.reduce(
    (acc, d) => acc + (d.triedActionIds?.length || 1),
    0
  );
  const totalScore = decisionsList.reduce(
    (acc, d) => acc + (d.reasonScore || 0) + (d.reflectionScore || 0),
    0
  );
  const maxScore = MISSION_3_SCENARIOS.length * 4;

  const toggleAccordion = (id: string) => {
    sound.playWoodClick();
    setExpandedScenarioId(expandedScenarioId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Grand Celebration Hero Card with 3D Artwork */}
      <div className="wood-panel rounded-3xl overflow-hidden border-4 border-[#8C4B2D] shadow-2xl bg-[#FFFDF7]">
        
        {/* 3D Visual Completion Artwork Banner */}
        <div className="relative aspect-16/7 sm:aspect-16/6 w-full overflow-hidden bg-[#2D160A]">
          <img
            src="/src/assets/images/m3_guardian_completion_1793975189369.jpg"
            alt="Petualangan Selesai Penjaga Budaya"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C0E06] via-[#1C0E06]/40 to-transparent" />

          {/* Top floating badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-black/70 backdrop-blur-md text-white border border-[#D99A35]/50 shadow-md text-xs font-black">
            <Shield className="w-4 h-4 text-[#D99A35]" />
            <span>Misi 3 Tuntas &middot; Penjaga Warisan Budaya</span>
          </div>

          {/* Title & Wisdom Message Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white text-left">
            <span className="text-xs font-black text-[#D99A35] uppercase tracking-wider block mb-1">
              Petualangan Budaya Nusantara Berhasil!
            </span>
            <h1 className="text-2xl sm:text-3xl font-black drop-shadow-md leading-tight">
              Petualanganmu Selesai, {username}!
            </h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6 text-left">
          
          {/* Key Wisdom Message */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8EB] border-2 border-[#D99A35] shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-xs font-black text-[#8C4B2D] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#D99A35]" />
              <span>Pesan Luhur Budaya</span>
            </div>
            <p className="text-base sm:text-lg font-black text-[#8C4B2D] leading-snug">
              "Setiap tindakan memiliki arti. Budaya dapat terus dikenal jika kita mau belajar, berbagi, dan menjaganya bersama."
            </p>
            <p className="text-xs sm:text-sm text-[#50301B] font-semibold mt-1">
              Selamat! Kamu telah membuktikan bahwa siswa SD bisa menjadi garda terdepan pelestarian budaya tradisional, cerita rakyat, dan kebenaran sejarah di dunia digital.
            </p>
          </div>

          {/* Summary Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white border-2 border-[#8C4B2D]/20 text-center shadow-xs">
              <span className="text-[11px] font-bold text-[#8C4B2D]/70 uppercase">Skenario</span>
              <div className="text-xl font-black text-[#8C4B2D] mt-0.5">3 / 3</div>
              <span className="text-[10px] font-bold text-[#527D65]">Selesai Semua</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border-2 border-[#8C4B2D]/20 text-center shadow-xs">
              <span className="text-[11px] font-bold text-[#8C4B2D]/70 uppercase">Pilihan Dicoba</span>
              <div className="text-xl font-black text-[#315B70] mt-0.5">{totalOptionsExplored} Tindakan</div>
              <span className="text-[10px] font-bold text-[#315B70]">Eksplorasi Mendalam</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border-2 border-[#8C4B2D]/20 text-center shadow-xs">
              <span className="text-[11px] font-bold text-[#8C4B2D]/70 uppercase">Skor Penalaran</span>
              <div className="text-xl font-black text-[#527D65] mt-0.5">{totalScore} / {maxScore}</div>
              <span className="text-[10px] font-bold text-[#527D65]">Alasan & Refleksi</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border-2 border-[#8C4B2D]/20 text-center shadow-xs">
              <span className="text-[11px] font-bold text-[#8C4B2D]/70 uppercase">Lencana Baru</span>
              <div className="text-sm font-black text-[#D99A35] mt-1 line-clamp-1">Perisai Pusaka</div>
              <span className="text-[10px] font-bold text-amber-700">Telah Dibuka</span>
            </div>
          </div>

          {/* Reward Strip */}
          <div className="p-4 rounded-2xl bg-[#EAF5EF] border-2 border-[#527D65]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#527D65] flex items-center justify-center text-white shadow-md shrink-0">
                <Shield className="w-6 h-6 text-[#F7EBD2]" />
              </div>
              <div>
                <span className="text-[11px] font-black text-[#28573D] uppercase tracking-wider block">
                  Hadiah Kelulusan Misi 3
                </span>
                <h4 className="text-sm sm:text-base font-black text-[#1C3E2B]">
                  Lencana "{MISSION_3_BADGE.name}"
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#527D65]/30 text-xs font-black text-[#D99A35] shadow-xs">
                <Star className="w-4 h-4 fill-[#D99A35]" />
                <span>+{MISSION_3_BADGE.starBonus} Bintang</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#527D65]/30 text-xs font-black text-[#527D65] shadow-xs">
                <Zap className="w-4 h-4 fill-[#527D65]" />
                <span>+{MISSION_3_BADGE.xpBonus} XP</span>
              </div>
            </div>
          </div>

          {/* Student Decisions & Reflections Accordion Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-black text-[#8C4B2D] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#8C4B2D]" />
                <span>Rangkuman Pilihan & Refleksi Siswa</span>
              </h3>
              <span className="text-[11px] font-bold text-[#8C4B2D]/70">
                Klik kartu untuk melihat detail
              </span>
            </div>

            <div className="space-y-2.5">
              {MISSION_3_SCENARIOS.map((sc, idx) => {
                const dec = progressRecord.decisions[sc.id];
                const isExpanded = expandedScenarioId === sc.id;

                return (
                  <div
                    key={sc.id}
                    className="rounded-2xl border-2 border-[#8C4B2D]/20 bg-white overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(sc.id)}
                      className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 hover:bg-[#FDFBF7] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-[#8C4B2D]/10 text-[#8C4B2D] text-xs font-black flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-xs sm:text-sm font-black text-[#2A160A]">
                            {sc.title}
                          </div>
                          <div className="text-[11px] font-semibold text-[#8C4B2D]/80">
                            Pilihan: <strong>Tindakan {dec ? dec.chosenActionId : 'A'}</strong> &middot; {dec?.triedBothActions ? '✓ 2 Pilihan Dicoba' : '1 Pilihan Dicoba'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#527D65]/10 text-[#527D65]">
                          Skor {((dec?.reasonScore || 0) + (dec?.reflectionScore || 0))} / 4
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#8C4B2D]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#8C4B2D]" />
                        )}
                      </div>
                    </button>

                    {isExpanded && dec && (
                      <div className="p-4 border-t border-[#8C4B2D]/15 bg-[#FFFDF9] space-y-3 text-xs">
                        <div className="space-y-1">
                          <strong className="text-[#8C4B2D] font-bold">Alasan Pilihan ({dec.reasonType}):</strong>
                          <p className="bg-white p-2.5 rounded-xl border border-[#8C4B2D]/15 text-[#3B2011] italic font-semibold">
                            "{dec.reasonText}"
                          </p>
                          <div className="text-[10px] text-[#527D65] font-bold text-right">
                            Skor Alasan: {dec.reasonScore} / 2
                          </div>
                        </div>

                        <div className="space-y-1">
                          <strong className="text-[#527D65] font-bold">Refleksi Belajar:</strong>
                          <p className="bg-white p-2.5 rounded-xl border border-[#8C4B2D]/15 text-[#3B2011] italic font-semibold">
                            "{dec.reflectionText}"
                          </p>
                          <div className="text-[10px] text-[#527D65] font-bold text-right">
                            Skor Refleksi: {dec.reflectionScore} / 2
                          </div>
                        </div>

                        {dec.teacherFeedback && (
                          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900">
                            <span className="font-bold">Catatan Guru:</span> "{dec.teacherFeedback}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons Row */}
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
              <span>Lihat Hasil & Rapor Guru</span>
            </button>

            {/* Replay or Dashboard */}
            <div className="w-full sm:w-auto flex items-center gap-2.5">
              <button
                onClick={() => {
                  sound.playWoodClick();
                  onRestartMission();
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#8C4B2D]/15 hover:bg-[#8C4B2D]/25 text-xs font-black text-[#8C4B2D] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Misi</span>
              </button>

              {onGoToMission4 ? (
                <button
                  onClick={() => {
                    sound.playSuccessChime();
                    onGoToMission4();
                  }}
                  className="flex-1 sm:flex-none wood-button px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white flex items-center justify-center gap-2 cursor-pointer shadow-md uppercase tracking-wider"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Lanjut ke Misi 4</span>
                </button>
              ) : (
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
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Teacher Review Modal */}
      <Mission3TeacherModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        username={username}
        anonymousId={anonymousId}
        progressRecord={progressRecord}
        onUpdateDecisions={onUpdateDecisions}
      />

    </div>
  );
};
