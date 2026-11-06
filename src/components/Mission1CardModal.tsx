import React, { useState, useEffect, useRef } from 'react';
import { Mission1CardItem } from '../types';
import {
  X,
  Check,
  ArrowRight,
  Sparkles,
  MapPin,
  Layers,
  Heart,
  Lightbulb,
  Volume2,
  Pause,
  Play,
  RotateCcw,
  Square,
  AlertCircle,
  BookOpen,
  ZoomIn,
  Maximize2
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission1CardModalProps {
  item: Mission1CardItem | null;
  isCollected: boolean;
  onClose: () => void;
  onCollectCard: (itemId: string) => void;
  onNextItem: () => void;
}

type AudioState = 'idle' | 'playing' | 'paused';
type SpeedRate = 0.8 | 1.0 | 1.2;

export const Mission1CardModal: React.FC<Mission1CardModalProps> = ({
  item,
  isCollected,
  onClose,
  onCollectCard,
  onNextItem,
}) => {
  const [justCollectedAnim, setJustCollectedAnim] = useState(false);
  const [audioState, setAudioState] = useState<AudioState>('idle');
  const [speedRate, setSpeedRate] = useState<SpeedRate>(1.0);
  const [speechWarning, setSpeechWarning] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop any speech when item changes or modal unmounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAudioState('idle');
    setSpeechWarning(null);
    setIsLightboxOpen(false);

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [item?.id]);

  if (!item) return null;

  const constructFullScript = () => {
    return `${item.name}. Berasal dari ${item.region}. ${item.shortDescription} Fungsi dan kegunaan: ${item.functionUse} Nilai dan makna budaya: ${item.culturalValue} Fakta menarik: ${item.funFact}`;
  };

  const handleStartAudio = (rate: number = speedRate) => {
    sound.playWoodClick();
    if (!('speechSynthesis' in window)) {
      setSpeechWarning('Browser perangkatmu belum mendukung fitur suara otomatis. Silakan baca teks materi di bawah ya ✨');
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const text = constructFullScript();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = rate;

      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('ID') || v.name.includes('Indonesian'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      utterance.onstart = () => {
        setAudioState('playing');
        setSpeechWarning(null);
      };

      utterance.onend = () => {
        setAudioState('idle');
      };

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          setAudioState('idle');
          setSpeechWarning('Audio tidak dapat diputar pada perangkat ini. Kamu tetap dapat membaca teks di bawah.');
        } else {
          setAudioState('idle');
        }
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      setSpeechWarning('Fitur audio tidak tersedia pada browser ini.');
    }
  };

  const handlePauseAudio = () => {
    sound.playWoodClick();
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setAudioState('paused');
    }
  };

  const handleResumeAudio = () => {
    sound.playWoodClick();
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setAudioState('playing');
    } else {
      handleStartAudio(speedRate);
    }
  };

  const handleStopAudio = () => {
    sound.playWoodClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAudioState('idle');
  };

  const handleReplayAudio = () => {
    handleStopAudio();
    setTimeout(() => {
      handleStartAudio(speedRate);
    }, 100);
  };

  const handleChangeSpeed = (newSpeed: SpeedRate) => {
    sound.playWoodClick();
    setSpeedRate(newSpeed);
    if (audioState === 'playing') {
      handleStopAudio();
      setTimeout(() => {
        handleStartAudio(newSpeed);
      }, 100);
    }
  };

  const handleCollect = () => {
    if (isCollected) return;
    sound.playSuccessChime();
    setJustCollectedAnim(true);
    onCollectCard(item.id);
    setTimeout(() => {
      setJustCollectedAnim(false);
    }, 1200);
  };

  const handleClose = () => {
    handleStopAudio();
    sound.playWoodClick();
    onClose();
  };

  const handleNext = () => {
    handleStopAudio();
    sound.playWoodClick();
    onNextItem();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
        <div
          className="wood-panel w-full max-w-3xl max-h-[94vh] rounded-3xl overflow-hidden border-4 border-[#8C4B2D] shadow-2xl flex flex-col bg-[#FFFBF2] text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Modal Navigation Header */}
          <div className="px-4 py-3 bg-[#F7EBD2] border-b-2 border-[#8C4B2D]/20 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#8C4B2D] text-white text-xs font-black uppercase tracking-wider shadow-xs">
                {item.category}
              </span>
              <span className="text-xs font-bold text-[#8C4B2D]/70 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#527D65]" />
                <span>{item.region} ({item.island})</span>
              </span>
            </div>

            <button
              onClick={handleClose}
              title="Tutup Kartu"
              className="w-9 h-9 rounded-full bg-[#8C4B2D]/10 hover:bg-[#8C4B2D]/20 text-[#8C4B2D] flex items-center justify-center border border-[#8C4B2D]/20 transition-transform active:scale-90 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Main Card Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-left flex-1">
            
            {/* 1. GAMBAR BUDAYA BERUKURAN BESAR (ELEMEN UTAMA, OBJECT-FIT: CONTAIN, TIDAK TERPOTONG) */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-[#2D1B10] border-3 border-[#8C4B2D]/40 shadow-inner group flex items-center justify-center min-h-[220px] sm:min-h-[300px] md:min-h-[360px] p-2 sm:p-3">
              {/* Textured backing */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D99A35_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              <img
                src={item.image}
                alt={item.name}
                onClick={() => {
                  sound.playWoodClick();
                  setIsLightboxOpen(true);
                }}
                className="w-full h-full max-h-[360px] sm:max-h-[420px] object-contain rounded-xl drop-shadow-xl cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />

              {/* Zoom Action Badge Button */}
              <button
                type="button"
                onClick={() => {
                  sound.playWoodClick();
                  setIsLightboxOpen(true);
                }}
                title="Klik untuk melihat gambar dalam ukuran penuh"
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black/90 text-white text-xs font-bold border border-white/30 shadow-lg flex items-center gap-1.5 transition-all cursor-pointer group-hover:scale-105 backdrop-blur-xs"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#D99A35]" />
                <span className="hidden sm:inline">Perbesar Gambar</span>
                <span className="sm:hidden">Perbesar</span>
              </button>
            </div>

            {/* 2. NAMA BUDAYA DAN ASAL DAERAH */}
            <div className="pt-1">
              <div className="flex items-center gap-2 text-xs font-black text-[#527D65] uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4 text-[#527D65]" />
                <span>Asal: {item.region} &middot; {item.island}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#8C4B2D] tracking-tight leading-snug">
                {item.name}
              </h2>
            </div>

            {/* 3. TOMBOL DENGARKAN MATERI & KONTROL AUDIO */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F7EBD2] border-2 border-[#D99A35] shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Audio Action Button */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {audioState === 'idle' && (
                    <button
                      type="button"
                      onClick={() => handleStartAudio(speedRate)}
                      className="wood-button w-full sm:w-auto px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-md group"
                    >
                      <Volume2 className="w-4 h-4 text-white group-hover:scale-115 transition-transform" />
                      <span>DENGARKAN MATERI</span>
                    </button>
                  )}

                  {audioState === 'playing' && (
                    <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                      <button
                        type="button"
                        onClick={handlePauseAudio}
                        className="px-4 py-2 rounded-xl bg-[#D99A35] hover:bg-[#c38626] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Pause className="w-3.5 h-3.5" />
                        <span>JEDA</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleStopAudio}
                        className="px-3 py-2 rounded-xl bg-[#8C4B2D]/20 hover:bg-[#8C4B2D]/30 text-[#8C4B2D] text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>BERHENTI</span>
                      </button>

                      {/* Equalizer animation */}
                      <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-100/90 border border-emerald-400 text-emerald-800 text-[11px] font-bold">
                        <span className="w-1.5 h-3.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-4 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-3 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span className="ml-1 hidden sm:inline">Sedang Membacakan...</span>
                      </div>
                    </div>
                  )}

                  {audioState === 'paused' && (
                    <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                      <button
                        type="button"
                        onClick={handleResumeAudio}
                        className="px-3.5 py-2 rounded-xl bg-[#527D65] hover:bg-[#436752] text-white text-xs font-black uppercase flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>LANJUTKAN</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleReplayAudio}
                        className="px-3 py-2 rounded-xl bg-[#D99A35] hover:bg-[#c38626] text-white text-xs font-black uppercase flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>ULANGI</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleStopAudio}
                        className="px-3 py-2 rounded-xl bg-[#8C4B2D]/20 hover:bg-[#8C4B2D]/30 text-[#8C4B2D] text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>BERHENTI</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Speed Controls */}
                <div className="flex items-center gap-1 text-xs font-bold text-[#8C4B2D] self-end sm:self-center">
                  <span className="text-[11px] text-[#8C4B2D]/75 mr-1">Kecepatan:</span>
                  {([0.8, 1.0, 1.2] as SpeedRate[]).map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => handleChangeSpeed(rate)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-black transition-colors cursor-pointer ${
                        speedRate === rate
                          ? 'bg-[#8C4B2D] text-white shadow-xs'
                          : 'bg-[#FFFBF2] text-[#8C4B2D] border border-[#8C4B2D]/25 hover:bg-[#EEDBC0]'
                      }`}
                    >
                      {rate === 0.8 ? 'Lambat' : rate === 1.0 ? 'Normal' : 'Cepat'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Warning if speech unavailable */}
              {speechWarning && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{speechWarning}</span>
                </div>
              )}
            </div>

            {/* 4. PENJELASAN UTAMA (DESKRIPSI 2-3 KALIMAT) */}
            <div className="p-4 rounded-2xl bg-[#FFF8EB] border-2 border-[#8C4B2D]/20 shadow-xs">
              <h3 className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#8C4B2D]" />
                <span>Penjelasan Utama</span>
              </h3>
              <p className="text-sm sm:text-base text-[#3B2011] font-semibold leading-relaxed">
                {item.shortDescription}
              </p>
            </div>

            {/* 5 & 6. FUNGSI DAN KEGUNAAN + NILAI DAN MAKNA BUDAYA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Fungsi dan Kegunaan */}
              <div className="p-4 rounded-2xl bg-[#FFFBF2] border-2 border-[#8C4B2D]/20 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#8C4B2D] uppercase tracking-wider mb-1.5">
                  <Layers className="w-4 h-4 text-[#8C4B2D]" />
                  <span>Fungsi dan Kegunaan</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4A2D1B] font-medium leading-relaxed">
                  {item.functionUse}
                </p>
              </div>

              {/* Nilai dan Makna Budaya */}
              <div className="p-4 rounded-2xl bg-[#FFFBF2] border-2 border-[#8C4B2D]/20 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#527D65] uppercase tracking-wider mb-1.5">
                  <Heart className="w-4 h-4 text-[#527D65]" />
                  <span>Nilai dan Makna Budaya</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4A2D1B] font-medium leading-relaxed">
                  {item.culturalValue}
                </p>
              </div>
            </div>

            {/* 7. FAKTA MENARIK */}
            <div className="p-4 rounded-2xl bg-[#F7EBD2] border-2 border-[#D99A35] flex items-start gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-[#D99A35] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-[#8C4B2D] uppercase tracking-wider block">
                  Fakta Menarik
                </span>
                <p className="text-xs sm:text-sm text-[#3B2011] font-bold mt-0.5 leading-relaxed">
                  {item.funFact}
                </p>
              </div>
            </div>

            {/* Sumber Informasi Resmi */}
            {item.sourceRef && (
              <div className="p-3 rounded-xl bg-[#8C4B2D]/5 border border-[#8C4B2D]/15 flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-[#8C4B2D]/70 shrink-0 mt-0.5" />
                <div className="text-[11px] text-[#8C4B2D]/85 font-medium leading-snug">
                  <span className="font-bold text-[#8C4B2D]">Sumber Terverifikasi:</span> {item.sourceRef}
                </div>
              </div>
            )}

            {/* Animasi perayaan kumpulkan kartu */}
            {justCollectedAnim && (
              <div className="p-3 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-black text-xs sm:text-sm flex items-center justify-center gap-2 animate-bounce">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Kartu Berhasil Disimpan ke Album Budayamu! ⭐</span>
              </div>
            )}

          </div>

          {/* 8. TOMBOL KUMPULKAN KARTU DAN NAVIGASI */}
          <div className="p-4 bg-[#F7EBD2] border-t-2 border-[#8C4B2D]/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {/* Tombol Kumpulkan Kartu */}
            {isCollected ? (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#527D65] text-white text-xs sm:text-sm font-black shadow-xs">
                <Check className="w-4 h-4" />
                <span>Sudah Masuk Koleksi</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleCollect}
                className="wood-button px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md group"
              >
                <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                <span>KUMPULKAN KARTU</span>
              </button>
            )}

            {/* Tombol Navigasi: Budaya Berikutnya & Kembali ke Peta */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-[#8C4B2D]/15 hover:bg-[#8C4B2D]/25 text-[#8C4B2D] text-xs sm:text-sm font-black flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Budaya Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-xl bg-[#FFFBF2] hover:bg-[#F3E3C6] border border-[#8C4B2D]/30 text-[#8C4B2D] text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                Kembali ke Peta
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. LIGHTBOX / FULLSCREEN PREVIEW SAAT GAMBAR DIKLIK */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => {
            sound.playWoodClick();
            setIsLightboxOpen(false);
          }}
        >
          {/* Top Lightbox Header */}
          <div
            className="w-full max-w-5xl mx-auto flex items-center justify-between gap-4 text-white py-2 px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-xs font-bold text-[#D99A35] uppercase tracking-wider">
                Pratinjau Gambar Utuh &middot; {item.category}
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-[#F7EBD2] tracking-tight">
                {item.name} &mdash; {item.region}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playWoodClick();
                setIsLightboxOpen(false);
              }}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-bold flex items-center gap-2 border border-white/30 transition-all cursor-pointer active:scale-95 shadow-md"
            >
              <X className="w-4 h-4" />
              <span>Tutup Pratinjau</span>
            </button>
          </div>

          {/* Center Showcase Fullscreen Image */}
          <div
            className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item.image}
              alt={item.name}
              className="max-h-[80vh] max-w-[95vw] w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-[#D99A35]/50 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Bottom helper footnote */}
          <div className="w-full text-center text-xs text-[#F7EBD2]/75 font-semibold py-1">
            Tekan tombol "Tutup Pratinjau" atau ketuk di luar gambar untuk kembali ke kartu informasi.
          </div>
        </div>
      )}
    </>
  );
};
