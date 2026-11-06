import React, { useState } from 'react';
import { UserProfile, Mission2ProgressRecord } from '../types';
import { MISSION_2_BADGE, MISSION_2_CARDS } from '../data/mission2Data';
import { Mission2Intro } from './Mission2Intro';
import { Mission2Lesson } from './Mission2Lesson';
import { Mission2SortingGame } from './Mission2SortingGame';
import { Mission2RiddleChallenge } from './Mission2RiddleChallenge';
import { Mission2Completion } from './Mission2Completion';
import { sound } from '../utils/audio';

interface Mission2ViewProps {
  user: UserProfile;
  onBackToDashboard: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onGoToMission3Teaser: () => void;
}

export type Mission2Step = 'intro' | 'lesson' | 'sorting' | 'riddles' | 'completed';

export const Mission2View: React.FC<Mission2ViewProps> = ({
  user,
  onBackToDashboard,
  onUpdateUser,
  onGoToMission3Teaser,
}) => {
  const [currentStep, setCurrentStep] = useState<Mission2Step>('intro');
  const [sortingAccuracy, setSortingAccuracy] = useState<number>(10);
  const [totalAttempts, setTotalAttempts] = useState<number>(10);
  const [riddleScore, setRiddleScore] = useState<number>(5);

  const handleFinishSorting = (stats: { correctFirstTry: number; totalAttempts: number }) => {
    setSortingAccuracy(stats.correctFirstTry);
    setTotalAttempts(stats.totalAttempts);
    setCurrentStep('riddles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishRiddles = (score: number) => {
    setRiddleScore(score);

    // Save progress to User Profile
    const isFirstTime = !user.completedMissions.includes('misi-2');
    const newCompletedMissions = isFirstTime
      ? [...user.completedMissions, 'misi-2']
      : user.completedMissions;

    const newUnlockedBadges = user.unlockedBadges.includes(MISSION_2_BADGE.id)
      ? user.unlockedBadges
      : [...user.unlockedBadges, MISSION_2_BADGE.id];

    const progressRecord: Mission2ProgressRecord = {
      completed: true,
      completedAt: new Date().toISOString(),
      sortingAccuracy,
      totalAttempts,
      riddleScore: score,
      classifiedCardIds: MISSION_2_CARDS.map((c) => c.id),
    };

    const updatedUser: UserProfile = {
      ...user,
      stars: isFirstTime ? user.stars + MISSION_2_BADGE.starBonus : user.stars,
      xp: isFirstTime ? user.xp + MISSION_2_BADGE.xpBonus : user.xp,
      completedMissions: newCompletedMissions,
      unlockedBadges: newUnlockedBadges,
      misi2Progress: progressRecord,
    };

    onUpdateUser(updatedUser);
    sound.playSuccessChime();
    setCurrentStep('completed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartMission = () => {
    setCurrentStep('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full pb-10">
      {currentStep === 'intro' && (
        <Mission2Intro
          username={user.username}
          onStartMission={() => {
            setCurrentStep('lesson');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToDashboard={onBackToDashboard}
        />
      )}

      {currentStep === 'lesson' && (
        <Mission2Lesson
          onContinueToGame={() => {
            setCurrentStep('sorting');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToIntro={() => {
            setCurrentStep('intro');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentStep === 'sorting' && (
        <Mission2SortingGame
          onBackToLesson={() => {
            setCurrentStep('lesson');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onFinishSorting={handleFinishSorting}
        />
      )}

      {currentStep === 'riddles' && (
        <Mission2RiddleChallenge
          onBackToSorting={() => {
            setCurrentStep('sorting');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onFinishRiddles={handleFinishRiddles}
        />
      )}

      {currentStep === 'completed' && (
        <Mission2Completion
          username={user.username}
          sortingAccuracy={sortingAccuracy}
          totalAttempts={totalAttempts}
          riddleScore={riddleScore}
          onRestartMission={handleRestartMission}
          onBackToDashboard={onBackToDashboard}
          onGoToMission3Teaser={onGoToMission3Teaser}
        />
      )}
    </div>
  );
};
