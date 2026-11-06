import React from 'react';
import { Award, Star, Zap, CheckCircle2, RotateCcw, ArrowRight, Home, Sparkles, BookOpen } from 'lucide-react';
import { MISSION_2_BADGE, MISSION_2_CARDS } from '../data/mission2Data';
import { sound } from '../utils/audio';

interface Mission2CompletionProps {
  username: string;
  sortingAccuracy: number;
  totalAttempts: number;
  riddleScore: number;
  onRestartMission: () => void;
  onBackToDashboard: () => void;
  onGoToMission3Teaser: () => void;
}

export const Mission2Completion: React.FC<Mission2CompletionProps> = ({
  username,
  sortingAccuracy,
  totalAttempts,
  riddleScore,
  onRestartMission,
  onBackToDashboard,
  onGoToMission3Teaser,
}) => {
  const bendaItems = MISSION_2_CARDS.filter((c) => c.categoryType === 'benda');
  const takbendaItems = MISSION_2_CARDS.filter((c) => c.categoryType === 'takbenda');

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
      {/* Celebration Trophy Panel */}
      <div className="wood-panel rounded-3xl p-6 sm:p-8 border-4 border-[#D99A35] bg-gradient-to-br from-[#FFFBF2] via-[#FFF8EB] to-[#F7EBD2] shadow-2xl text-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D99A35]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-4">
          {/* Badge Image Highlight */}
          <div className="relative inline-block mx-auto">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-4 border-[#D99A35] shadow-2xl bg-white p-2">
              <img
                src={MISSION_2_BADGE.image}
                alt={MISSION_2_BADGE.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-[#527D65] border-2 border-white text-white font-black text-xs shadow-md flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>TERBUKA!</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#D99A35] flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D99A35]" />
              MISI 2 TUNTAS DENGAN SUKSES!
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#8C4B2D] mt-1 leading-tight">
              Selamat, Detektif {username}!
            </h1>
            <p className="text-xs sm:text-sm text-[#3B2011] font-bold mt-1">
              Kamu telah resmi meraih gelar &ldquo;Detektif Jenis Warisan Budaya Nusantara&rdquo;!
            </p>
          </div>

          {/* Reward Badges pill row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs sm:text-sm shadow-xs">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>+{MISSION_2_BADGE.starBonus} Bintang Budaya</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-xs sm:text-sm shadow-xs">
              <Zap className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span>+{MISSION_2_BADGE.xpBonus} XP Detektif</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#315B70]/10 border border-[#315B70]/30 text-[#315B70] font-black text-xs sm:text-sm shadow-xs">
              <Award className="w-4 h-4 text-[#315B70]" />
              <span>{MISSION_2_BADGE.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Investigation Stats & Summary Table */}
      <div className="wood-panel rounded-3xl p-6 border-3 border-[#8C4B2D] bg-[#FFFBF2] shadow-xl space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-[#8C4B2D]/20">
          <BookOpen className="w-5 h-5 text-[#8C4B2D]" />
          <h3 className="text-base font-black text-[#8C4B2D] uppercase tracking-wider">
            Laporan Hasil Penyelidikan Detektif
          </h3>
        </div>

        {/* Stats 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-[#F7EBD2] border border-[#8C4B2D]/20 text-center">
            <span className="text-xs font-bold text-[#8C4B2D]/80 block">Kartu Berhasil Dikelompokkan</span>
            <span className="text-2xl font-black text-[#8C4B2D] mt-1 block">10 / 10</span>
            <span className="text-[11px] font-semibold text-[#527D65]">100% Lengkap</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7EBD2] border border-[#8C4B2D]/20 text-center">
            <span className="text-xs font-bold text-[#8C4B2D]/80 block">Akurasi Percobaan Pertama</span>
            <span className="text-2xl font-black text-[#527D65] mt-1 block">
              {Math.round((sortingAccuracy / 10) * 100)}%
            </span>
            <span className="text-[11px] font-semibold text-[#8C4B2D]">
              {sortingAccuracy} dari 10 kartu tepat langsung
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7EBD2] border border-[#8C4B2D]/20 text-center">
            <span className="text-xs font-bold text-[#8C4B2D]/80 block">Tantangan Tebak Petunjuk</span>
            <span className="text-2xl font-black text-[#315B70] mt-1 block">
              {riddleScore} / 5
            </span>
            <span className="text-[11px] font-semibold text-[#315B70]">
              Teka-teki terjawab benar
            </span>
          </div>
        </div>

        {/* 2 Columns: Benda vs Takbenda classified collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Benda List */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border-2 border-emerald-300 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
              <span className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                5 Warisan Budaya Benda (Fisik)
              </span>
              <span className="text-xs font-black text-emerald-700">Teridentifikasi ✓</span>
            </div>
            <ul className="space-y-1.5 text-xs font-bold text-emerald-950">
              {bendaItems.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item.name}</span>
                  <span className="text-[10px] text-emerald-700/80 font-normal">
                    ({item.aspectSubtitle})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Takbenda List */}
          <div className="p-4 rounded-2xl bg-sky-50/60 border-2 border-sky-300 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-sky-200">
              <span className="text-xs font-black text-sky-950 uppercase tracking-wider">
                5 Warisan Budaya Takbenda (Tradisi & Seni)
              </span>
              <span className="text-xs font-black text-sky-700">Teridentifikasi ✓</span>
            </div>
            <ul className="space-y-1.5 text-xs font-bold text-sky-950">
              {takbendaItems.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{item.name}</span>
                  <span className="text-[10px] text-sky-700/80 font-normal">
                    ({item.aspectSubtitle})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cultu Mascot Speech Closing */}
        <div className="p-4 rounded-2xl bg-[#FFF8EB] border-2 border-[#D99A35] flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border-2 border-[#8C4B2D] bg-[#8C4B2D]">
            <img
              src="/src/assets/images/cultu_mascot_guide_1793969033044.jpg"
              alt="Cultu"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-[#8C4B2D]">
              Pesan Penting dari Sahabat Cultu:
            </span>
            <p className="text-xs sm:text-sm text-[#3B2011] font-semibold mt-0.5 leading-relaxed">
              &ldquo;Hebat sekali! Kini kamu memahami bahwa warisan budaya bangsa kita bukan hanya yang dapat disentuh dengan jemari tangan, tetapi juga jiwa kebersamaan, dongeng bijak, dan kepiawaian seni yang hidup di hati rakyat Indonesia! Teruslah menjaga keduanya ya!&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={() => {
            sound.playWoodClick();
            onRestartMission();
          }}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-[#F7EBD2] text-[#8C4B2D] border-2 border-[#8C4B2D]/30 text-xs sm:text-sm font-black transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-2 shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Misi 2</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              sound.playWoodClick();
              onBackToDashboard();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#F7EBD2] hover:bg-[#ebd8b7] text-[#8C4B2D] border-2 border-[#8C4B2D]/40 text-xs sm:text-sm font-black transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <button
            onClick={() => {
              sound.playSuccessChime();
              onGoToMission3Teaser();
            }}
            className="wood-button w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-transform"
          >
            <span>Lanjut Misi 3 (Pratinjau)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
