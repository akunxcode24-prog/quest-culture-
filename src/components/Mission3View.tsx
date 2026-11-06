import React, { useState } from 'react';
import { UserProfile, ScenarioDecisionRecord, Mission3ProgressRecord } from '../types';
import { MISSION_3_SCENARIOS, MISSION_3_BADGE } from '../data/mission3Data';
import { Mission3Intro } from './Mission3Intro';
import { Mission3ScenarioCard } from './Mission3ScenarioCard';
import { Mission3Completion } from './Mission3Completion';
import { sound } from '../utils/audio';

interface Mission3ViewProps {
  user: UserProfile;
  onBackToDashboard: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onGoToMission4Teaser?: () => void;
}

export type Mission3Step = 'intro' | 'scenarios' | 'completed';

export const Mission3View: React.FC<Mission3ViewProps> = ({
  user,
  onBackToDashboard,
  onUpdateUser,
  onGoToMission4Teaser,
}) => {
  const [currentStep, setCurrentStep] = useState<Mission3Step>(() => {
    if (user.misi3Progress?.completed) {
      return 'completed';
    }
    return 'intro';
  });

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [decisions, setDecisions] = useState<Record<string, ScenarioDecisionRecord>>(() => {
    return user.misi3Progress?.decisions || {};
  });

  const currentScenario = MISSION_3_SCENARIOS[currentScenarioIndex];

  const handleStartMission = () => {
    setCurrentStep('scenarios');
    setCurrentScenarioIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveScenarioDecision = (record: ScenarioDecisionRecord) => {
    const updatedDecisions = {
      ...decisions,
      [record.scenarioId]: record,
    };
    setDecisions(updatedDecisions);

    if (currentScenarioIndex < MISSION_3_SCENARIOS.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // All 3 scenarios completed!
      finishMission3(updatedDecisions);
    }
  };

  const finishMission3 = (finalDecisions: Record<string, ScenarioDecisionRecord>) => {
    const isFirstTime = !user.completedMissions.includes('misi-3');
    const newCompletedMissions = isFirstTime
      ? [...user.completedMissions, 'misi-3']
      : user.completedMissions;

    const newUnlockedBadges = user.unlockedBadges.includes(MISSION_3_BADGE.id)
      ? user.unlockedBadges
      : [...user.unlockedBadges, MISSION_3_BADGE.id];

    const decisionList = Object.values(finalDecisions);
    const totalScore = decisionList.reduce(
      (acc, d) => acc + (d.reasonScore || 0) + (d.reflectionScore || 0),
      0
    );
    const totalOptionsTried = decisionList.reduce(
      (acc, d) => acc + (d.triedActionIds?.length || 1),
      0
    );

    const progressRecord: Mission3ProgressRecord = {
      completed: true,
      completedAt: new Date().toISOString(),
      scenariosCompleted: MISSION_3_SCENARIOS.length,
      totalOptionsTried,
      totalReasoningScore: totalScore,
      maxPossibleScore: MISSION_3_SCENARIOS.length * 4,
      decisions: finalDecisions,
    };

    const updatedUser: UserProfile = {
      ...user,
      stars: isFirstTime ? user.stars + MISSION_3_BADGE.starBonus : user.stars,
      xp: isFirstTime ? user.xp + MISSION_3_BADGE.xpBonus : user.xp,
      completedMissions: newCompletedMissions,
      unlockedBadges: newUnlockedBadges,
      misi3Progress: progressRecord,
    };

    onUpdateUser(updatedUser);
    sound.playBadgeChime();
    setCurrentStep('completed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateDecisionsFromTeacher = (
    updatedDecisions: Record<string, ScenarioDecisionRecord>
  ) => {
    setDecisions(updatedDecisions);

    const decisionList = Object.values(updatedDecisions);
    const totalScore = decisionList.reduce(
      (acc, d) => acc + (d.reasonScore || 0) + (d.reflectionScore || 0),
      0
    );

    if (user.misi3Progress) {
      const updatedProgress: Mission3ProgressRecord = {
        ...user.misi3Progress,
        totalReasoningScore: totalScore,
        decisions: updatedDecisions,
      };

      const updatedUser: UserProfile = {
        ...user,
        misi3Progress: updatedProgress,
      };

      onUpdateUser(updatedUser);
    }
  };

  const handleRestartMission = () => {
    setCurrentScenarioIndex(0);
    setCurrentStep('scenarios');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full pb-10">
      {currentStep === 'intro' && (
        <Mission3Intro
          username={user.username}
          onStartMission={handleStartMission}
          onBackToDashboard={onBackToDashboard}
        />
      )}

      {currentStep === 'scenarios' && currentScenario && (
        <Mission3ScenarioCard
          key={currentScenario.id}
          scenario={currentScenario}
          scenarioIndex={currentScenarioIndex}
          totalScenarios={MISSION_3_SCENARIOS.length}
          existingRecord={decisions[currentScenario.id]}
          onSaveAndNext={handleSaveScenarioDecision}
          onPreviousScenario={
            currentScenarioIndex > 0
              ? () => {
                  setCurrentScenarioIndex((prev) => prev - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              : undefined
          }
        />
      )}

      {currentStep === 'completed' && (
        <Mission3Completion
          username={user.username}
          anonymousId={user.anonymousId}
          progressRecord={
            user.misi3Progress || {
              completed: true,
              scenariosCompleted: 3,
              totalOptionsTried: 6,
              totalReasoningScore: 12,
              maxPossibleScore: 12,
              decisions,
            }
          }
          onRestartMission={handleRestartMission}
          onBackToDashboard={onBackToDashboard}
          onGoToMission4={onGoToMission4Teaser}
          onUpdateDecisions={handleUpdateDecisionsFromTeacher}
        />
      )}
    </div>
  );
};
