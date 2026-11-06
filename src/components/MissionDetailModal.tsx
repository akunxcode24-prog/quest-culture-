import React, { useState } from 'react';
import { Mission } from '../types';
import { X, Star, Zap, Award, CheckCircle2, Lock, Sparkles, BookOpen, Clock } from 'lucide-react';
import { sound } from '../utils/audio';

interface MissionDetailModalProps {
  mission: Mission | null;
  onClose: () => void;
  onCompletePreview?: (missionId: string) => void;
  onStartMission1?: () => void;
  onStartMission2?: () => void;
  onStartMission3?: () => void;
  onStartMission4?: () => void;
}

export const MissionDetailModal: React.FC<MissionDetailModalProps> = ({
  mission,
  onClose,
  onCompletePreview,
  onStartMission1,
  onStartMission2,
  onStartMission3,
  onStartMission4,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);

  if (!mission) return null;

  const isLocked = mission.status === 'locked';

  // Interactive teaser question for kids to test their knowledge right away
  const sampleTeaserQuestions: Record<string, { q: string; options: string[]; answer: number; explanation: string }> = {
    'misi-1': {
      q: 'Rumah adat khas Minangkabau yang memiliki atap melengkung menyerupai tanduk kerbau bernama...',
      options: ['Rumah Joglo', 'Rumah Gadang', 'Rumah Honai', 'Rumah Tongkonan'],
      answer: 1,
      explanation: 'Hebat! Rumah Gadang berasal dari Sumatera Barat dan atapnya disebut Gonjong.'
    },
    'misi-2': {
      q: 'Manakah di bawah ini yang termasuk contoh Warisan Budaya Takbenda (Intangible)?',
      options: ['Candi Borobudur', 'Benteng Vredeburg', 'Seni Pertunjukan Wayang Kulit', 'Prasasti Ciaruteun'],
      answer: 2,
      explanation: 'Tepat sekali! Wayang kulit adalah seni pertunjukan dan keahlian mendongeng yang tidak berwujud bangunan fisik.'
    },
    'misi-3': {
      q: 'Mengapa kita perlu menjaga dan melestarikan budaya tradisional Indonesia?',
      options: [
        'Agar tidak diklaim bangsa lain dan tetap dikenal generasi masa depan',
        'Supaya kita tidak perlu belajar hal-hal modern',
        'Karena tradisi lama tidak boleh berubah sama sekali',
        'Hanya untuk tontonan turis asing'
      ],
      answer: 0,
      explanation: 'Benar! Menjaga warisan budaya adalah wujud rasa bangga dan identitas bangsa yang harus diteruskan.'
    },
    'misi-4': {
      q: 'Aksi nyata sederhana apa yang bisa kamu lakukan sebagai siswa SD untuk mencintai budaya Indonesia?',
      options: [
        'Bangga memakai baju batik ke sekolah dan menyanyikan lagu daerah',
        'Menolak berteman dengan teman dari suku lain',
        'Hanya menyukai budaya luar negeri',
        'Mencoret-coret dinding candi bersejarah'
      ],
      answer: 0,
      explanation: 'Luar biasa! Mengenakan batik dan menghormati keberagaman teman adalah aksi nyata pahlawan budaya cilik!'
    }
  };

  const currentTeaser = sampleTeaserQuestions[mission.id];

  const handleSelectOption = (idx: number) => {
    sound.playWoodClick();
    setSelectedAnswer(idx);
    setShowAnswerFeedback(true);
    if (idx === currentTeaser.answer) {
      sound.playSuccessChime();
      if (onCompletePreview) {
        onCompletePreview(mission.id);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="wood-panel w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden border-4 border-[#8C4B2D] shadow-2xl flex flex-col bg-[#FFFBF2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar with Image Preview */}
        <div className="relative aspect-16/7 sm:aspect-16/6 w-full overflow-hidden bg-[#8C4B2D]">
          <img
            src={mission.image}
            alt={mission.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C180C] via-[#2C180C]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => {
              sound.playWoodClick();
              onClose();
            }}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-transform active:scale-90 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Scrim */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D99A35] uppercase mb-1">
              <span>MISI {mission.orderNumber}</span>
              <span>·</span>
              <span>{mission.category}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-md">
              {mission.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-left">
          {/* Subtitle & Description */}
          <div>
            <p className="text-sm font-bold text-[#8C4B2D]">
              {mission.subtitle}
            </p>
            <p className="text-sm text-[#3B2011] mt-2 leading-relaxed font-medium">
              {mission.description}
            </p>
          </div>

          {/* Mission Stats / Rewards Bar */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F7EBD2] border border-[#8C4B2D]/20 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-[#8C4B2D]/70">Bintang</span>
              <span className="text-sm font-black text-[#D99A35] flex items-center gap-1 mt-0.5">
                <Star className="w-4 h-4 fill-[#D99A35]" />
                <span>+{mission.starReward} Bintang</span>
              </span>
            </div>
            <div className="flex flex-col items-center border-x border-[#8C4B2D]/20">
              <span className="text-[11px] font-bold text-[#8C4B2D]/70">Pengalaman</span>
              <span className="text-sm font-black text-[#527D65] flex items-center gap-1 mt-0.5">
                <Zap className="w-4 h-4 fill-[#527D65]" />
                <span>+{mission.xpReward} XP</span>
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-[#8C4B2D]/70">Waktu Belajar</span>
              <span className="text-sm font-black text-[#315B70] flex items-center gap-1 mt-0.5">
                <Clock className="w-4 h-4" />
                <span>~{mission.estimatedMinutes} Menit</span>
              </span>
            </div>
          </div>

          {/* Learning Objectives */}
          <div>
            <h4 className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
              <BookOpen className="w-4 h-4 text-[#8C4B2D]" />
              <span>Target Pembelajaran</span>
            </h4>
            <ul className="space-y-2">
              {mission.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#3B2011] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#527D65] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Topics Unboxed */}
          <div>
            <h4 className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider mb-2">
              Topik Pembelajaran
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {mission.keyTopics.map((topic, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#8C4B2D]/10 text-[#8C4B2D] text-xs font-bold"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Mini Teaser Quiz */}
          {currentTeaser && (
            <div className="p-4 rounded-2xl bg-[#FFF8EB] border-2 border-[#D99A35] relative">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#8C4B2D] uppercase mb-2">
                <Sparkles className="w-4 h-4 text-[#D99A35]" />
                <span>Uji Tantangan Detektif Budaya (Pratinjau)</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#3B2011] mb-3">
                {currentTeaser.q}
              </p>

              <div className="space-y-2">
                {currentTeaser.options.map((opt, idx) => {
                  const isChosen = selectedAnswer === idx;
                  const isCorrect = idx === currentTeaser.answer;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isChosen
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400'
                            : 'bg-red-50 border-red-500 text-red-900 ring-2 ring-red-400'
                          : 'bg-white border-[#8C4B2D]/30 hover:border-[#8C4B2D] text-[#3B2011]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {showAnswerFeedback && isChosen && (
                          <span className="text-xs font-black">
                            {isCorrect ? '✅ Benar!' : '❌ Coba Lagi'}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showAnswerFeedback && selectedAnswer !== null && (
                <p className="text-xs font-bold text-[#8C4B2D] mt-2.5 bg-[#F7EBD2] p-2 rounded-lg">
                  💡 {currentTeaser.explanation}
                </p>
              )}
            </div>
          )}

          {/* Notice for Stage 1 */}
          <div className="p-3 rounded-xl bg-[#527D65]/10 border border-[#527D65]/30 flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-[#527D65] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-black text-[#527D65]">
                Ekspedisi CultureQuest — Tahap 1
              </p>
              <p className="text-xs text-[#2B4E3C] mt-0.5 font-medium leading-relaxed">
                Kartu dan deskripsi misi telah siap! Modul interaktif menyeluruh untuk Misi ini (simulasi, kuis bertingkat, dan teka-teki budaya) akan diaktifkan pada pengembangan Tahap berikutnya.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-[#F7EBD2] border-t-2 border-[#8C4B2D]/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C4B2D]">
            <Award className="w-4 h-4 text-[#D99A35]" />
            <span>Hadiah: {mission.badgeReward}</span>
          </div>

          <div className="flex items-center gap-2">
            {mission.id === 'misi-1' && onStartMission1 ? (
              <button
                onClick={() => {
                  sound.playSuccessChime();
                  onClose();
                  onStartMission1();
                }}
                className="wood-button px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider cursor-pointer shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>MULAI JELAJAH MISI 1</span>
              </button>
            ) : mission.id === 'misi-2' && onStartMission2 ? (
              <button
                onClick={() => {
                  sound.playSuccessChime();
                  onClose();
                  onStartMission2();
                }}
                className="wood-button px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider cursor-pointer shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>MULAI DETEKTIF MISI 2</span>
              </button>
            ) : mission.id === 'misi-3' && onStartMission3 ? (
              <button
                onClick={() => {
                  sound.playSuccessChime();
                  onClose();
                  onStartMission3();
                }}
                className="wood-button px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider cursor-pointer shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>MULAI PENJAGA MISI 3</span>
              </button>
            ) : mission.id === 'misi-4' && onStartMission4 ? (
              <button
                onClick={() => {
                  sound.playSuccessChime();
                  onClose();
                  onStartMission4();
                }}
                className="wood-button px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider cursor-pointer shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>MULAI RENCANA MISI 4</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playWoodClick();
                  onClose();
                }}
                className="wood-button px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider cursor-pointer"
              >
                {isLocked ? 'Tutup Info' : 'Siap Berpetualang!'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
