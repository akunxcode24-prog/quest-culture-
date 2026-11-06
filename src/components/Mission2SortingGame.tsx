import React, { useState } from 'react';
import { Box, Flame, CheckCircle2, RotateCcw, ArrowRight, ArrowLeft, HelpCircle, Sparkles, AlertCircle, Info, Eye } from 'lucide-react';
import { Mission2CardItem, CulturalAspectType } from '../types';
import { MISSION_2_CARDS } from '../data/mission2Data';
import { sound } from '../utils/audio';

interface Mission2SortingGameProps {
  onBackToLesson: () => void;
  onFinishSorting: (stats: { correctFirstTry: number; totalAttempts: number }) => void;
}

export const Mission2SortingGame: React.FC<Mission2SortingGameProps> = ({
  onBackToLesson,
  onFinishSorting,
}) => {
  // Placed cards tracking
  const [bendaCards, setBendaCards] = useState<Mission2CardItem[]>([]);
  const [takbendaCards, setTakbendaCards] = useState<Mission2CardItem[]>([]);
  const [unplacedCards, setUnplacedCards] = useState<Mission2CardItem[]>(MISSION_2_CARDS);

  // Interaction state
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [activeDropzone, setActiveDropzone] = useState<CulturalAspectType | null>(null);

  // Feedback state
  const [feedback, setFeedback] = useState<{
    card: Mission2CardItem;
    targetZone: CulturalAspectType;
    isCorrect: boolean;
    message: string;
    explanation: string;
  } | null>(null);

  // Inspect detail modal
  const [inspectedCard, setInspectedCard] = useState<Mission2CardItem | null>(null);

  // Statistics
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [mistakesByCard, setMistakesByCard] = useState<Record<string, number>>({});

  const handleDragStart = (e: React.DragEvent, card: Mission2CardItem) => {
    e.dataTransfer.setData('text/plain', card.id);
    setDraggedCardId(card.id);
  };

  const handleDragOver = (e: React.DragEvent, zone: CulturalAspectType) => {
    e.preventDefault();
    setActiveDropzone(zone);
  };

  const handleDragLeave = () => {
    setActiveDropzone(null);
  };

  const handleDrop = (e: React.DragEvent, targetZone: CulturalAspectType) => {
    e.preventDefault();
    setActiveDropzone(null);
    const cardId = e.dataTransfer.getData('text/plain') || draggedCardId;
    if (!cardId) return;
    const card = unplacedCards.find((c) => c.id === cardId);
    if (card) {
      processPlacement(card, targetZone);
    }
    setDraggedCardId(null);
  };

  const processPlacement = (card: Mission2CardItem, targetZone: CulturalAspectType) => {
    setTotalAttempts((prev) => prev + 1);

    const isCorrect = card.categoryType === targetZone;

    if (isCorrect) {
      sound.playSuccessChime();
      // Remove from unplaced
      setUnplacedCards((prev) => prev.filter((c) => c.id !== card.id));

      if (targetZone === 'benda') {
        setBendaCards((prev) => [...prev, card]);
      } else {
        setTakbendaCards((prev) => [...prev, card]);
      }

      setFeedback({
        card,
        targetZone,
        isCorrect: true,
        message: 'Tepat Sekali! Analisis Detektif Berhasil!',
        explanation: card.classificationReason,
      });

      setSelectedCardId(null);
    } else {
      sound.playErrorBuzz();
      setMistakesByCard((prev) => ({
        ...prev,
        [card.id]: (prev[card.id] || 0) + 1,
      }));

      setFeedback({
        card,
        targetZone,
        isCorrect: false,
        message: 'Ayo Selidiki Ulang!',
        explanation:
          targetZone === 'benda'
            ? `Kurang tepat. ${card.name} bukan benda fisik padat yang dapat dipegang semata, melainkan berupa ${card.aspectSubtitle.toLowerCase()}. Coba kelompokkan ke Warisan Takbenda ya!`
            : `Kurang tepat. ${card.name} memiliki wujud fisik nyata (${card.aspectSubtitle.toLowerCase()}) yang dapat disentuh. Coba kelompokkan ke Warisan Benda ya!`,
      });
    }
  };

  const handleResetGame = () => {
    sound.playWoodClick();
    setBendaCards([]);
    setTakbendaCards([]);
    setUnplacedCards(MISSION_2_CARDS);
    setSelectedCardId(null);
    setFeedback(null);
    setTotalAttempts(0);
    setMistakesByCard({});
  };

  const isAllClassified = unplacedCards.length === 0;

  const correctFirstTryCount = MISSION_2_CARDS.filter(
    (c) => !mistakesByCard[c.id] || mistakesByCard[c.id] === 0
  ).length;

  const selectedCard = unplacedCards.find((c) => c.id === selectedCardId);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Progress Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FFFBF2] border-2 border-[#8C4B2D]/30 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playWoodClick();
              onBackToLesson();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-[#8C4B2D] hover:bg-[#8C4B2D]/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Pelajari Materi Lagi</span>
          </button>
          <div className="h-6 w-px bg-[#8C4B2D]/20 hidden sm:block" />
          <span className="text-xs sm:text-sm font-black text-[#8C4B2D]">
            Kotak Investigasi Detektif
          </span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Progress counter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F7EBD2] border border-[#8C4B2D]/20 text-xs font-black text-[#8C4B2D]">
            <span>Kemajuan:</span>
            <span className="text-[#527D65]">{10 - unplacedCards.length}/10 Kartu</span>
          </div>

          <button
            onClick={handleResetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F7EBD2] text-[#8C4B2D] border border-[#8C4B2D]/30 text-xs font-bold transition-colors cursor-pointer active:scale-95 shadow-xs"
            title="Mulai Ulang Pengelompokan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Ulang</span>
          </button>
        </div>
      </div>

      {/* Two Dropzones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Dropzone 1: WARISAN BUDAYA BENDA */}
        <div
          onDragOver={(e) => handleDragOver(e, 'benda')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'benda')}
          className={`wood-panel rounded-3xl p-5 border-3 transition-all flex flex-col justify-between min-h-[300px] ${
            activeDropzone === 'benda'
              ? 'border-emerald-600 bg-emerald-50 ring-4 ring-emerald-300 scale-[1.01]'
              : 'border-[#527D65] bg-[#F7FAF8]'
          }`}
        >
          <div>
            {/* Header Dropzone */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#527D65]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#527D65] text-white flex items-center justify-center shadow-md">
                  <Box className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#2B4E3C] leading-none">
                    WARISAN BUDAYA BENDA
                  </h3>
                  <p className="text-[11px] text-[#527D65] font-bold mt-0.5">
                    Berwujud fisik nyata & dapat disentuh
                  </p>
                </div>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-xs">
                {bendaCards.length} / 5
              </div>
            </div>

            {/* Placed Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4">
              {bendaCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setInspectedCard(card)}
                  className="bg-white rounded-2xl p-2 border-2 border-emerald-400 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md hover:scale-[1.02] transition-transform animate-in zoom-in-95 duration-200"
                >
                  <div className="w-full h-20 rounded-xl overflow-hidden bg-stone-100 mb-1.5">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-black text-[#2B4E3C] line-clamp-1">
                    {card.name}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Benda Fisik</span>
                  </span>
                </div>
              ))}

              {bendaCards.length === 0 && (
                <div className="col-span-full py-10 flex flex-col items-center justify-center text-center text-[#527D65]/60 border-2 border-dashed border-[#527D65]/30 rounded-2xl">
                  <Box className="w-10 h-10 mb-2 opacity-50" />
                  <p className="text-xs font-bold">
                    Tarik kartu atau pilih kartu lalu klik &ldquo;Pindah ke Kotak Benda&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick touch target button for selected card */}
          {selectedCard && (
            <button
              onClick={() => processPlacement(selectedCard, 'benda')}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#527D65] hover:bg-[#436753] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-transform"
            >
              <Box className="w-4 h-4" />
              <span>Masukkan &ldquo;{selectedCard.name}&rdquo; ke Kotak Benda</span>
            </button>
          )}
        </div>

        {/* Dropzone 2: WARISAN BUDAYA TAKBENDA */}
        <div
          onDragOver={(e) => handleDragOver(e, 'takbenda')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'takbenda')}
          className={`wood-panel rounded-3xl p-5 border-3 transition-all flex flex-col justify-between min-h-[300px] ${
            activeDropzone === 'takbenda'
              ? 'border-sky-600 bg-sky-50 ring-4 ring-sky-300 scale-[1.01]'
              : 'border-[#315B70] bg-[#F7FAFC]'
          }`}
        >
          <div>
            {/* Header Dropzone */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#315B70]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#315B70] text-white flex items-center justify-center shadow-md">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#1E3B4B] leading-none">
                    WARISAN BUDAYA TAKBENDA
                  </h3>
                  <p className="text-[11px] text-[#315B70] font-bold mt-0.5">
                    Tradisi, seni pertunjukan, lisan & keahlian
                  </p>
                </div>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-900 font-black text-xs">
                {takbendaCards.length} / 5
              </div>
            </div>

            {/* Placed Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4">
              {takbendaCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setInspectedCard(card)}
                  className="bg-white rounded-2xl p-2 border-2 border-sky-400 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md hover:scale-[1.02] transition-transform animate-in zoom-in-95 duration-200"
                >
                  <div className="w-full h-20 rounded-xl overflow-hidden bg-stone-100 mb-1.5">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-black text-[#1E3B4B] line-clamp-1">
                    {card.name}
                  </span>
                  <span className="text-[10px] text-sky-700 font-bold flex items-center gap-0.5 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-sky-600" />
                    <span>Takbenda</span>
                  </span>
                </div>
              ))}

              {takbendaCards.length === 0 && (
                <div className="col-span-full py-10 flex flex-col items-center justify-center text-center text-[#315B70]/60 border-2 border-dashed border-[#315B70]/30 rounded-2xl">
                  <Flame className="w-10 h-10 mb-2 opacity-50" />
                  <p className="text-xs font-bold">
                    Tarik kartu atau pilih kartu lalu klik &ldquo;Pindah ke Kotak Takbenda&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick touch target button for selected card */}
          {selectedCard && (
            <button
              onClick={() => processPlacement(selectedCard, 'takbenda')}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#315B70] hover:bg-[#254656] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-transform"
            >
              <Flame className="w-4 h-4" />
              <span>Masukkan &ldquo;{selectedCard.name}&rdquo; ke Kotak Takbenda</span>
            </button>
          )}
        </div>
      </div>

      {/* Card Tray (Remaining Unplaced Cards) */}
      <div className="wood-panel rounded-3xl p-5 border-3 border-[#8C4B2D] bg-[#FFFBF2] shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#8C4B2D]/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#D99A35] animate-pulse" />
            <h4 className="text-sm font-black text-[#8C4B2D] uppercase tracking-wider">
              Baki Bukti Budaya Detektif ({unplacedCards.length} Kartu Tersisa)
            </h4>
          </div>
          <span className="text-xs text-[#8C4B2D]/80 font-bold">
            💡 Tips: Seret (drag) ke kotak di atas, atau klik kartu untuk memilih!
          </span>
        </div>

        {unplacedCards.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {unplacedCards.map((card) => {
              const isSelected = selectedCardId === card.id;
              return (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, card)}
                  onClick={() => {
                    sound.playWoodClick();
                    setSelectedCardId(isSelected ? null : card.id);
                  }}
                  className={`relative bg-white rounded-2xl p-2.5 border-2 transition-all cursor-grab active:cursor-grabbing select-none ${
                    isSelected
                      ? 'border-[#D99A35] ring-4 ring-[#D99A35]/30 shadow-lg scale-105'
                      : 'border-[#8C4B2D]/20 hover:border-[#8C4B2D] hover:shadow-md'
                  }`}
                >
                  <div className="w-full h-24 rounded-xl overflow-hidden bg-stone-100 mb-2 relative">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectedCard(card);
                      }}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/50 hover:bg-black/80 text-white cursor-pointer"
                      title="Lihat Petunjuk"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-xs font-black text-[#3B2011] line-clamp-1">
                      {card.name}
                    </span>
                    <span className="text-[10px] text-[#8C4B2D]/75 font-bold block mt-0.5 line-clamp-1">
                      {card.aspectSubtitle}
                    </span>
                  </div>

                  {/* Badge showing it has a dual counterpart */}
                  {card.pairedConceptGroup && (
                    <span className="absolute -top-1.5 -left-1.5 px-1.5 py-0.5 rounded-full bg-[#D99A35] text-white text-[9px] font-black shadow-xs">
                      Pair
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-6 text-center bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-black text-emerald-950">
                Luar Biasa! Semua 10 Kartu Berhasil Dikelompokkan!
              </h4>
              <p className="text-xs text-emerald-800 font-semibold mt-1">
                Kamu berhasil membedakan warisan budaya benda dan takbenda dengan tepat. Sekarang, saatnya tantangan teka-teki detektif!
              </p>
            </div>
            <button
              onClick={() => {
                sound.playSuccessChime();
                onFinishSorting({
                  correctFirstTry: correctFirstTryCount,
                  totalAttempts,
                });
              }}
              className="wood-button px-6 py-3 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-transform"
            >
              <span>LANJUT KE TANTANGAN TEBAK PETUNJUK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Immediate Placement Feedback Toast / Dialog */}
      {feedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="wood-panel w-full max-w-md rounded-3xl p-5 border-4 border-[#8C4B2D] bg-[#FFFBF2] shadow-2xl text-center space-y-4">
            <div
              className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg ${
                feedback.isCorrect ? 'bg-emerald-600' : 'bg-red-500'
              }`}
            >
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <AlertCircle className="w-8 h-8" />
              )}
            </div>

            <div>
              <h3
                className={`text-lg font-black ${
                  feedback.isCorrect ? 'text-emerald-900' : 'text-red-900'
                }`}
              >
                {feedback.message}
              </h3>
              <p className="text-xs text-[#8C4B2D] font-bold mt-1">
                {feedback.card.name} &middot; {feedback.card.aspectSubtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#3B2011] font-semibold leading-relaxed bg-[#F7EBD2] p-3 rounded-xl border border-[#8C4B2D]/20 text-left">
              💡 {feedback.explanation}
            </p>

            <button
              onClick={() => {
                sound.playWoodClick();
                setFeedback(null);
              }}
              className="wood-button w-full py-2.5 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider cursor-pointer active:scale-95"
            >
              {feedback.isCorrect ? 'Lanjut Investigasi' : 'Coba Lagi'}
            </button>
          </div>
        </div>
      )}

      {/* Inspect Card Modal */}
      {inspectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="wood-panel w-full max-w-md rounded-3xl p-5 border-4 border-[#8C4B2D] bg-[#FFFBF2] shadow-2xl space-y-3">
            <div className="w-full h-44 rounded-2xl overflow-hidden bg-stone-100 border-2 border-[#8C4B2D]/30">
              <img
                src={inspectedCard.image}
                alt={inspectedCard.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase text-[#8C4B2D]">
                  {inspectedCard.region} &middot; {inspectedCard.island}
                </span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                    inspectedCard.categoryType === 'benda'
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-sky-100 text-sky-900'
                  }`}
                >
                  {inspectedCard.categoryType === 'benda' ? 'Wujud Fisik' : 'Tradisi / Seni'}
                </span>
              </div>
              <h3 className="text-lg font-black text-[#3B2011] mt-0.5">
                {inspectedCard.name}
              </h3>
              <p className="text-xs text-[#8C4B2D] font-bold">
                {inspectedCard.aspectSubtitle}
              </p>
            </div>

            <p className="text-xs text-[#3B2011] font-semibold leading-relaxed">
              {inspectedCard.description}
            </p>

            <div className="p-2.5 rounded-xl bg-[#F7EBD2] border border-[#8C4B2D]/20 text-xs text-[#3B2011] font-medium">
              <span className="font-bold text-[#8C4B2D] block mb-0.5">Petunjuk Detektif:</span>
              {inspectedCard.physicalTraitOrPractice}
            </div>

            <button
              onClick={() => setInspectedCard(null)}
              className="wood-button w-full py-2.5 rounded-xl text-xs font-black text-white uppercase tracking-wider cursor-pointer active:scale-95"
            >
              Tutup Kartu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
