import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play, Square, Sparkles, Layers, Box, Flame, ArrowRight, ArrowLeft } from 'lucide-react';
import { MISSION_2_LESSON_CONTENT } from '../data/mission2Data';
import { sound } from '../utils/audio';

interface Mission2LessonProps {
  onContinueToGame: () => void;
  onBackToIntro: () => void;
}

export const Mission2Lesson: React.FC<Mission2LessonProps> = ({
  onContinueToGame,
  onBackToIntro,
}) => {
  const [activeTab, setActiveTab] = useState<'semua' | 'benda' | 'takbenda' | 'dua-aspek'>('semua');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const fullLessonScript = `Materi Detektif Jenis Warisan Budaya.
Pertama, Warisan Budaya Benda atau Tangible Cultural Heritage.
Warisan budaya benda adalah warisan yang memiliki bentuk fisik nyata, dapat dilihat dan disentuh dengan tangan. Contohnya: bangunan candi, rumah adat seperti Rumah Gadang dan Tongkonan, senjata tradisional, alat musik bambu angklung fisik, lembaran kain batik, serta boneka wayang kulit.

Kedua, Warisan Budaya Takbenda atau Intangible Cultural Heritage.
Warisan budaya takbenda tidak berupa benda mati semata, melainkan berupa tradisi, keahlian, seni pertunjukan, atau dongeng yang diwariskan secara lisan turun-temurun. Contohnya: Tari Saman dari Aceh, Cerita Rakyat Sangkuriang dari Jawa Barat, seni pertunjukan wayang kulit semalam suntuk, dan keahlian membatik tulis menggunakan canting.

Ketiga, fakta seru detektif: Satu budaya bisa memiliki dua aspek sekaligus!
Contohnya Angklung: alat musik bambunya adalah warisan benda, sedangkan tradisi memainkannya secara bersama-sama adalah warisan takbenda.
Batik: kain batiknya adalah benda fisik, sedangkan keahlian menorehkan lilin malam dan filosofinya adalah warisan takbenda.
Wayang Kulit: boneka kulit kerbaunya adalah warisan benda, sedangkan seni mendongeng dalang adalah warisan takbenda.`;

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Perangkat Anda tidak mendukung fitur audio suara otomatis.');
      return;
    }

    if (isPausedAudio) {
      window.speechSynthesis.resume();
      setIsPausedAudio(false);
      setIsPlayingAudio(true);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(fullLessonScript);
    utterance.lang = 'id-ID';
    utterance.rate = speechRate;
    utterance.pitch = 1.05;

    // Pick Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('ID'));
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setIsPausedAudio(false);
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePauseAudio = () => {
    if ('speechSynthesis' in window && isPlayingAudio) {
      window.speechSynthesis.pause();
      setIsPausedAudio(true);
      setIsPlayingAudio(false);
    }
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Bar with Audio Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FFFBF2] border-2 border-[#8C4B2D]/30 shadow-sm">
        <button
          onClick={() => {
            handleStopAudio();
            sound.playWoodClick();
            onBackToIntro();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-[#8C4B2D] hover:bg-[#8C4B2D]/10 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Pembuka</span>
        </button>

        {/* Audio Player Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-[#F7EBD2] px-3 py-1.5 rounded-xl border border-[#8C4B2D]/20 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#8C4B2D] mr-1">
            <Volume2 className="w-4 h-4 text-[#D99A35]" />
            <span>Audio Penjelasan:</span>
          </div>

          {!isPlayingAudio && !isPausedAudio ? (
            <button
              onClick={handlePlayAudio}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#527D65] hover:bg-[#436753] text-white text-xs font-black transition-colors cursor-pointer active:scale-95 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Dengarkan Materi</span>
            </button>
          ) : isPlayingAudio ? (
            <button
              onClick={handlePauseAudio}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#D99A35] hover:bg-[#c48728] text-white text-xs font-black transition-colors cursor-pointer active:scale-95 shadow-xs"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Jeda</span>
            </button>
          ) : (
            <button
              onClick={handlePlayAudio}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#527D65] hover:bg-[#436753] text-white text-xs font-black transition-colors cursor-pointer active:scale-95 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Lanjut</span>
            </button>
          )}

          {(isPlayingAudio || isPausedAudio) && (
            <button
              onClick={handleStopAudio}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#8C4B2D] hover:bg-[#723a20] text-white text-xs font-black transition-colors cursor-pointer active:scale-95 shadow-xs"
              title="Hentikan Audio"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>
          )}

          {/* Speed selector */}
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#8C4B2D] pl-1 border-l border-[#8C4B2D]/20">
            <span>Kecepatan:</span>
            {[0.8, 1.0, 1.2].map((spd) => (
              <button
                key={spd}
                onClick={() => {
                  setSpeechRate(spd);
                  if (isPlayingAudio) {
                    handleStopAudio();
                  }
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-black cursor-pointer ${
                  speechRate === spd
                    ? 'bg-[#8C4B2D] text-white'
                    : 'bg-white text-[#8C4B2D] hover:bg-[#8C4B2D]/10'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Segment Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => {
            sound.playWoodClick();
            setActiveTab('semua');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'semua'
              ? 'bg-[#8C4B2D] text-white shadow-md'
              : 'bg-[#FFFBF2] text-[#8C4B2D] border border-[#8C4B2D]/20 hover:bg-[#F7EBD2]'
          }`}
        >
          Semua Materi
        </button>
        <button
          onClick={() => {
            sound.playWoodClick();
            setActiveTab('benda');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'benda'
              ? 'bg-[#527D65] text-white shadow-md'
              : 'bg-[#FFFBF2] text-[#527D65] border border-[#527D65]/30 hover:bg-[#F7EBD2]'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>Warisan Benda (Tangible)</span>
        </button>
        <button
          onClick={() => {
            sound.playWoodClick();
            setActiveTab('takbenda');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'takbenda'
              ? 'bg-[#315B70] text-white shadow-md'
              : 'bg-[#FFFBF2] text-[#315B70] border border-[#315B70]/30 hover:bg-[#F7EBD2]'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Warisan Takbenda (Intangible)</span>
        </button>
        <button
          onClick={() => {
            sound.playWoodClick();
            setActiveTab('dua-aspek');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'dua-aspek'
              ? 'bg-[#D99A35] text-white shadow-md'
              : 'bg-[#FFFBF2] text-[#D99A35] border border-[#D99A35]/40 hover:bg-[#F7EBD2]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Satu Budaya, 2 Aspek!</span>
        </button>
      </div>

      {/* Main Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tangible Card */}
        {(activeTab === 'semua' || activeTab === 'benda') && (
          <div className="wood-panel rounded-3xl p-6 border-3 border-[#527D65] bg-[#FCFDF9] shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#527D65] text-white flex items-center justify-center shadow-md">
                  <Box className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-[#527D65] uppercase tracking-wider">
                    Kategori Fisik
                  </span>
                  <h3 className="text-xl font-black text-[#2B4E3C]">
                    {MISSION_2_LESSON_CONTENT.benda.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#2B4E3C] font-semibold leading-relaxed bg-[#527D65]/10 p-3.5 rounded-2xl border border-[#527D65]/20">
                {MISSION_2_LESSON_CONTENT.benda.definition}
              </p>

              <div>
                <h4 className="text-xs font-black text-[#527D65] uppercase tracking-wider mb-2">
                  Ciri-Ciri Khas Warisan Benda:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#2B4E3C]">
                  {MISSION_2_LESSON_CONTENT.benda.characteristics.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#527D65] font-black">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-black text-[#527D65] uppercase tracking-wider mb-2">
                  Contoh Warisan Benda:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {MISSION_2_LESSON_CONTENT.benda.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#527D65]/20 flex items-center justify-between text-xs text-[#527D65] font-black">
              <span>Bisa dilihat dan disentuh langsung</span>
              <span>🔍 Wujud Material</span>
            </div>
          </div>
        )}

        {/* Intangible Card */}
        {(activeTab === 'semua' || activeTab === 'takbenda') && (
          <div className="wood-panel rounded-3xl p-6 border-3 border-[#315B70] bg-[#F7FBFC] shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#315B70] text-white flex items-center justify-center shadow-md">
                  <Flame className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-[#315B70] uppercase tracking-wider">
                    Kategori Tradisi & Jiwa
                  </span>
                  <h3 className="text-xl font-black text-[#1E3B4B]">
                    {MISSION_2_LESSON_CONTENT.takbenda.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#1E3B4B] font-semibold leading-relaxed bg-[#315B70]/10 p-3.5 rounded-2xl border border-[#315B70]/20">
                {MISSION_2_LESSON_CONTENT.takbenda.definition}
              </p>

              <div>
                <h4 className="text-xs font-black text-[#315B70] uppercase tracking-wider mb-2">
                  Ciri-Ciri Khas Warisan Takbenda:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#1E3B4B]">
                  {MISSION_2_LESSON_CONTENT.takbenda.characteristics.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#315B70] font-black">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-black text-[#315B70] uppercase tracking-wider mb-2">
                  Contoh Warisan Takbenda:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {MISSION_2_LESSON_CONTENT.takbenda.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 text-xs font-bold"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#315B70]/20 flex items-center justify-between text-xs text-[#315B70] font-black">
              <span>Hidup dalam ingatan dan keahlian masyarakat</span>
              <span>✨ Tradisi & Nilai</span>
            </div>
          </div>
        )}
      </div>

      {/* Dual Aspect Special Section */}
      {(activeTab === 'semua' || activeTab === 'dua-aspek') && (
        <div className="wood-panel rounded-3xl p-6 sm:p-7 border-3 border-[#D99A35] bg-gradient-to-r from-[#FFFBF2] via-[#FFF8EB] to-[#FFF3DC] shadow-lg space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#D99A35] text-white flex items-center justify-center font-black">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase text-[#8C4B2D] tracking-wider">
                Konsep Tingkat Lanjut Detektif
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#8C4B2D]">
                {MISSION_2_LESSON_CONTENT.dualAspect.title}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#3B2011] font-semibold leading-relaxed">
            {MISSION_2_LESSON_CONTENT.dualAspect.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {MISSION_2_LESSON_CONTENT.dualAspect.pairs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border-2 border-[#D99A35]/40 shadow-sm space-y-3"
              >
                <div className="text-center pb-2 border-b border-[#D99A35]/30">
                  <span className="text-sm font-black text-[#8C4B2D]">{item.name}</span>
                </div>

                <div className="space-y-1.5">
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] font-black uppercase text-emerald-800 block">
                      Sebagai Warisan Benda:
                    </span>
                    <p className="text-xs text-emerald-950 font-medium mt-0.5 leading-snug">
                      {item.benda}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-sky-50 border border-sky-200">
                    <span className="text-[10px] font-black uppercase text-sky-800 block">
                      Sebagai Warisan Takbenda:
                    </span>
                    <p className="text-xs text-sky-950 font-medium mt-0.5 leading-snug">
                      {item.takbenda}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#FFFBF2] border-2 border-[#8C4B2D]/20 shadow-md">
        <div className="text-center sm:text-left">
          <p className="text-xs sm:text-sm font-bold text-[#8C4B2D]">
            Sudah paham perbedaannya? Sekarang saatnya uji keahlian detektifmu!
          </p>
          <p className="text-[11px] text-[#3B2011]/70 font-medium">
            Tersedia 10 kartu budaya untuk kamu kelompokkan ke dalam 2 kotak detektif.
          </p>
        </div>

        <button
          onClick={() => {
            handleStopAudio();
            sound.playSuccessChime();
            onContinueToGame();
          }}
          className="wood-button w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-transform"
        >
          <span>MASUK KE KOTAK DETEKTIF</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
