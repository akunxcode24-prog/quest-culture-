import React, { useState } from 'react';
import { MISSION_1_ITEMS, MISSION_1_CHALLENGES } from '../data/mission1Data';
import { Mission1CardItem, UserProfile } from '../types';
import { Mission1Intro } from './Mission1Intro';
import { Mission1CardModal } from './Mission1CardModal';
import { Mission1CollectionAlbum } from './Mission1CollectionAlbum';
import { Mission1ChallengeBar } from './Mission1ChallengeBar';
import { Mission1Completion } from './Mission1Completion';
import { ArrowLeft, Compass, Award, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface Mission1ViewProps {
  user: UserProfile;
  onBackToDashboard: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onGoToMission2Teaser: () => void;
}

export const Mission1View: React.FC<Mission1ViewProps> = ({
  user,
  onBackToDashboard,
  onUpdateUser,
  onGoToMission2Teaser,
}) => {
  // If user already collected all cards, they can choose to view map, intro, or completion
  const [subStage, setSubStage] = useState<'intro' | 'map' | 'completed'>('intro');
  const [selectedCard, setSelectedCard] = useState<Mission1CardItem | null>(null);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);

  // Challenge mode state
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeFeedback, setChallengeFeedback] = useState<{ status: 'correct' | 'wrong' | null; message: string }>({
    status: null,
    message: '',
  });

  const collectedCardIds = user.collectedCardsMisi1 || [];
  const totalCards = MISSION_1_ITEMS.length;
  const isAllCollected = collectedCardIds.length === totalCards;

  // Handle collecting a card
  const handleCollectCard = (cardId: string) => {
    if (collectedCardIds.includes(cardId)) return;

    const newCollected = [...collectedCardIds, cardId];
    const willCompleteAll = newCollected.length === totalCards;

    const updatedUser: UserProfile = {
      ...user,
      collectedCardsMisi1: newCollected,
      stars: user.stars + 1,
      xp: user.xp + 25,
      // If all 8 collected, mark Misi 1 as completed and award the special badge!
      completedMissions: willCompleteAll && !user.completedMissions.includes('misi-1')
        ? [...user.completedMissions, 'misi-1']
        : user.completedMissions,
      unlockedBadges: willCompleteAll && !user.unlockedBadges.includes('badge-penjelajah-budaya')
        ? [...user.unlockedBadges, 'badge-penjelajah-budaya']
        : user.unlockedBadges,
    };

    onUpdateUser(updatedUser);

    if (willCompleteAll) {
      sound.playBadgeChime();
      setTimeout(() => {
        setSelectedCard(null);
        setSubStage('completed');
      }, 1000);
    }
  };

  // Handle clicking a map point
  const handlePointClick = (item: Mission1CardItem) => {
    sound.playWoodClick();

    if (isChallengeMode) {
      const currentChallenge = MISSION_1_CHALLENGES[currentChallengeIndex];
      if (item.id === currentChallenge.targetCardId) {
        sound.playSuccessChime();
        setChallengeFeedback({
          status: 'correct',
          message: currentChallenge.correctExplanation,
        });
        // Auto collect if not collected yet
        handleCollectCard(item.id);
      } else {
        sound.playWoodClick();
        setChallengeFeedback({
          status: 'wrong',
          message: `Belum tepat! Kamu mengeklik ${item.name} (${item.region}). ${currentChallenge.hintText}`,
        });
      }
    }

    // Always open the card modal so student learns the culture!
    setSelectedCard(item);
  };

  // Next item in sequence for easy navigation
  const handleNextItem = () => {
    if (!selectedCard) return;
    const currentIndex = MISSION_1_ITEMS.findIndex((it) => it.id === selectedCard.id);
    const nextIndex = (currentIndex + 1) % MISSION_1_ITEMS.length;
    setSelectedCard(MISSION_1_ITEMS[nextIndex]);
  };

  // Next challenge in challenge mode
  const handleNextChallenge = () => {
    setChallengeFeedback({ status: null, message: '' });
    setCurrentChallengeIndex((prev) => (prev + 1) % MISSION_1_CHALLENGES.length);
  };

  // Render Sub-Stages
  if (subStage === 'intro') {
    return (
      <Mission1Intro
        onStartExplore={() => setSubStage('map')}
        onBackToDashboard={onBackToDashboard}
        username={user.username}
        collectedCount={collectedCardIds.length}
      />
    );
  }

  if (subStage === 'completed') {
    return (
      <Mission1Completion
        username={user.username}
        onBackToMapMisi={() => setSubStage('map')}
        onNextMission2={onGoToMission2Teaser}
        onReplayMission={() => {
          setSubStage('map');
          setIsChallengeMode(true);
        }}
      />
    );
  }

  // Active Map View
  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-left">
        <div>
          <button
            onClick={() => {
              sound.playWoodClick();
              onBackToDashboard();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#8C4B2D] hover:underline mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard Utama</span>
          </button>
          
          <h1 className="text-xl sm:text-2xl font-black text-[#8C4B2D] tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#D99A35]" />
            <span>Peta Jelajah Warisan Nusantara</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#8C4B2D]/80">
            Klik 8 titik lokasi di peta untuk mengenal dan mengoleksi kartu warisan budaya
          </p>
        </div>

        {/* Action Capsules */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          {/* Album Button */}
          <button
            onClick={() => {
              sound.playWoodClick();
              setIsAlbumOpen(true);
            }}
            className="px-3.5 py-2 rounded-2xl bg-[#FFFBF2] hover:bg-[#F3E3C6] border-2 border-[#8C4B2D]/30 text-xs font-black text-[#8C4B2D] flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Award className="w-4 h-4 text-[#D99A35]" />
            <span>Album Kartu ({collectedCardIds.length}/8)</span>
          </button>

          {/* Victory Page Button if already collected all */}
          {isAllCollected && (
            <button
              onClick={() => {
                sound.playBadgeChime();
                setSubStage('completed');
              }}
              className="wood-button px-3.5 py-2 rounded-2xl text-xs font-black text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Halaman Lencana</span>
            </button>
          )}
        </div>
      </div>

      {/* Clue Challenge Activity Bar ("Temukan Budayanya!") */}
      <Mission1ChallengeBar
        currentChallenge={MISSION_1_CHALLENGES[currentChallengeIndex]}
        challengeIndex={currentChallengeIndex}
        totalChallenges={MISSION_1_CHALLENGES.length}
        feedbackState={challengeFeedback}
        onNextChallenge={handleNextChallenge}
        isChallengeMode={isChallengeMode}
        onToggleChallengeMode={() => {
          setIsChallengeMode(!isChallengeMode);
          setChallengeFeedback({ status: null, message: '' });
        }}
      />

      {/* Interactive Indonesian Archipelago Map */}
      <div className="wood-panel rounded-3xl p-3 sm:p-5 border-4 border-[#8C4B2D] shadow-xl relative overflow-hidden bg-[#EEDDC0]">
        
        {/* Ocean Background Canvas */}
        <div className="relative w-full aspect-16/10 sm:aspect-21/10 min-h-[360px] sm:min-h-[460px] rounded-2xl overflow-hidden bg-[#244A5D] border-2 border-[#8C4B2D]/40 shadow-inner flex items-center justify-center select-none">
          
          {/* Compass Rose Watermark */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-20 pointer-events-none">
            <Compass className="w-24 h-24 sm:w-36 sm:h-36 text-amber-100" />
          </div>

          {/* Map Title Plaque in Corner */}
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-[#1C3644]/80 backdrop-blur-md text-[#F7EBD2] text-[11px] font-black border border-[#D99A35]/30 pointer-events-none z-10">
            Nusantara · 8 Titik Budaya
          </div>

          {/* SVG Map of Indonesia */}
          <svg
            className="w-full h-full p-2 sm:p-6"
            viewBox="0 0 1000 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wave accents */}
            <path d="M 40 120 Q 140 140 240 120 T 440 120" stroke="#37667E" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.3" />
            <path d="M 520 380 Q 620 400 720 380 T 920 380" stroke="#37667E" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.3" />

            {/* Sumatera */}
            <path
              d="M 110 50 L 160 110 L 220 220 L 260 280 L 230 290 L 170 230 L 100 130 Z"
              fill="#527D65"
              stroke="#D99A35"
              strokeWidth="2.5"
              className="opacity-95"
            />
            {/* Jawa */}
            <path
              d="M 280 330 L 480 340 L 500 355 L 430 360 L 290 350 Z"
              fill="#527D65"
              stroke="#D99A35"
              strokeWidth="2.5"
              className="opacity-95"
            />
            {/* Kalimantan */}
            <path
              d="M 370 140 L 470 130 L 500 210 L 460 270 L 370 250 L 360 190 Z"
              fill="#436B55"
              stroke="#D99A35"
              strokeWidth="2"
              className="opacity-90"
            />
            {/* Sulawesi */}
            <path
              d="M 550 150 L 610 160 L 580 200 L 630 230 L 590 300 L 560 260 L 560 200 Z"
              fill="#527D65"
              stroke="#D99A35"
              strokeWidth="2.5"
              className="opacity-95"
            />
            {/* Bali & Lombok & Sumbawa & Flores / NTT */}
            <path
              d="M 515 355 L 535 355 L 565 365 L 630 370 L 670 375 L 610 385 L 520 365 Z"
              fill="#527D65"
              stroke="#D99A35"
              strokeWidth="2.5"
              className="opacity-95"
            />
            {/* Maluku */}
            <ellipse cx="710" cy="210" rx="18" ry="28" fill="#436B55" stroke="#D99A35" strokeWidth="1.5" />
            <ellipse cx="735" cy="260" rx="16" ry="22" fill="#436B55" stroke="#D99A35" strokeWidth="1.5" />
            {/* Papua */}
            <path
              d="M 770 200 L 870 210 L 940 270 L 930 340 L 850 330 L 800 290 L 760 240 Z"
              fill="#436B55"
              stroke="#D99A35"
              strokeWidth="2"
              className="opacity-90"
            />
          </svg>

          {/* 8 Cultural Points on the Map */}
          {MISSION_1_ITEMS.map((item) => {
            const isFound = collectedCardIds.includes(item.id);
            const isTargetClue = isChallengeMode && MISSION_1_CHALLENGES[currentChallengeIndex].targetCardId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handlePointClick(item)}
                style={{
                  left: `${item.coordinates.x}%`,
                  top: `${item.coordinates.y}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-200 z-20 ${
                  isTargetClue ? 'scale-125 animate-pulse' : 'hover:scale-115'
                }`}
              >
                {/* Pin Head */}
                <div
                  className={`relative flex items-center justify-center p-2 rounded-2xl border-2 shadow-2xl transition-all ${
                    isFound
                      ? 'bg-[#527D65] border-white text-white'
                      : 'bg-[#D99A35] border-[#FFFBF2] text-[#3B2011] animate-bounce'
                  } ${isTargetClue ? 'ring-4 ring-amber-300' : ''}`}
                  style={{ animationDuration: isFound ? '0s' : '2.5s' }}
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />

                  {/* Collected Mini Checkmark Badge */}
                  {isFound && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-400 text-[#1C3644] flex items-center justify-center text-[10px] font-black border border-white">
                      ✓
                    </div>
                  )}

                  {/* Hover or Visible Tooltip Label */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-1 rounded-xl bg-[#2A150A]/90 text-white text-[10px] sm:text-[11px] font-black whitespace-nowrap border border-[#D99A35]/50 shadow-lg pointer-events-none group-hover:scale-105 transition-transform flex items-center gap-1">
                    <span>{item.name}</span>
                    <span className="text-[#D99A35]">·</span>
                    <span className="text-[#F7EBD2]/80">{item.region}</span>
                  </div>
                </div>
              </button>
            );
          })}

        </div>

        {/* Bottom Status bar */}
        <div className="mt-4 p-3.5 rounded-2xl bg-[#FFFBF2] border border-[#8C4B2D]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-bold text-[#8C4B2D]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#527D65]" />
            <span>Progres Misi 1: <strong>{collectedCardIds.length} dari 8</strong> budaya telah ditemukan ({Math.round((collectedCardIds.length / 8) * 100)}%)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#527D65]">
              {isAllCollected ? '🎉 Semua kartu lengkap!' : '🌟 Terus jelajahi hingga 8/8 kartu'}
            </span>
          </div>
        </div>

      </div>

      {/* Card Info Modal */}
      <Mission1CardModal
        item={selectedCard}
        isCollected={selectedCard ? collectedCardIds.includes(selectedCard.id) : false}
        onClose={() => setSelectedCard(null)}
        onCollectCard={handleCollectCard}
        onNextItem={handleNextItem}
      />

      {/* Collection Album Drawer */}
      <Mission1CollectionAlbum
        isOpen={isAlbumOpen}
        onClose={() => setIsAlbumOpen(false)}
        collectedCardIds={collectedCardIds}
        onSelectCard={(item) => {
          setIsAlbumOpen(false);
          setSelectedCard(item);
        }}
        onFinishMission={() => {
          setIsAlbumOpen(false);
          setSubStage('completed');
        }}
      />

    </div>
  );
};
