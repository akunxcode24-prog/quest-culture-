import React, { useState } from 'react';
import { UserProfile, Misi4ActivityId, Misi4HelperType, Mission4ActionPlan, Mission4ProgressRecord } from '../types';
import { MISI4_ACTIVITIES, MISI4_HELPERS, MISSION_4_BADGE, evaluateActionPlanRubric, getPairingAdvice } from '../data/mission4Data';
import { MISSION_1_ITEMS } from '../data/mission1Data';
import { Mission4Intro } from './Mission4Intro';
import { Mission4ActivitySelect } from './Mission4ActivitySelect';
import { Mission4CultureSelect } from './Mission4CultureSelect';
import { Mission4PlanBuilder } from './Mission4PlanBuilder';
import { Mission4ActionCardView } from './Mission4ActionCardView';
import { Mission4Completion } from './Mission4Completion';
import { sound } from '../utils/audio';

interface Mission4ViewProps {
  user: UserProfile;
  onBackToDashboard: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export type Mission4Step = 'intro' | 'activity' | 'culture' | 'builder' | 'card' | 'completed';

export const Mission4View: React.FC<Mission4ViewProps> = ({
  user,
  onBackToDashboard,
  onUpdateUser,
}) => {
  const existingPlan = user.misi4Progress?.plan;

  const [currentStep, setCurrentStep] = useState<Mission4Step>(() => {
    if (user.misi4Progress?.completed) {
      return 'completed';
    }
    return 'intro';
  });

  // State for user's plan construction
  const [selectedActivityId, setSelectedActivityId] = useState<Misi4ActivityId | null>(
    existingPlan?.activityId || null
  );
  const [selectedCultureId, setSelectedCultureId] = useState<string | null>(
    existingPlan?.culturalId || null
  );
  const [selectedHelper, setSelectedHelper] = useState<Misi4HelperType | null>(
    existingPlan?.helper || null
  );
  const [learningGoal, setLearningGoal] = useState<string>(
    existingPlan?.learningGoal || ''
  );
  const [currentPlan, setCurrentPlan] = useState<Mission4ActionPlan | null>(
    existingPlan || null
  );

  // Active activity and culture models
  const chosenActivity = MISI4_ACTIVITIES.find((a) => a.id === selectedActivityId);
  const chosenCulture = MISSION_1_ITEMS.find((c) => c.id === selectedCultureId);

  // Transition handlers
  const handleStartBuilder = () => {
    setCurrentStep('activity');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectActivity = (id: Misi4ActivityId) => {
    setSelectedActivityId(id);
  };

  const handleNextToCulture = () => {
    setCurrentStep('culture');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCulture = (id: string) => {
    setSelectedCultureId(id);
  };

  const handleNextToBuilder = () => {
    setCurrentStep('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateCard = (helper: Misi4HelperType, goal: string) => {
    if (!chosenActivity || !chosenCulture) return;

    setSelectedHelper(helper);
    setLearningGoal(goal);

    const helperObj = MISI4_HELPERS.find((h) => h.id === helper);
    const rubricScores = evaluateActionPlanRubric(
      chosenActivity.id,
      chosenCulture.id,
      helper,
      goal
    );

    const advice = getPairingAdvice(chosenActivity.id, chosenCulture.category, chosenCulture.name) || undefined;

    const newPlan: Mission4ActionPlan = {
      participantCode: user.anonymousId,
      activityId: chosenActivity.id,
      activityTitle: chosenActivity.title,
      culturalId: chosenCulture.id,
      culturalName: chosenCulture.name,
      culturalRegion: chosenCulture.region,
      culturalCategory: chosenCulture.category,
      culturalImage: chosenCulture.image,
      helper,
      helperLabel: helperObj?.label || 'Teman',
      learningGoal: goal,
      pairingAdvice: advice,
      rubricScores,
      teacherNotes: existingPlan?.teacherNotes || '',
      isSaved: false,
      createdAt: existingPlan?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCurrentPlan(newPlan);
    setCurrentStep('card');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePlan = () => {
    if (!currentPlan) return;

    const savedPlan: Mission4ActionPlan = {
      ...currentPlan,
      isSaved: true,
      updatedAt: new Date().toISOString(),
    };

    setCurrentPlan(savedPlan);

    // Save to User Profile
    const isFirstTime = !user.completedMissions.includes('misi-4');
    const newCompletedMissions = isFirstTime
      ? [...user.completedMissions, 'misi-4']
      : user.completedMissions;

    const newUnlockedBadges = user.unlockedBadges.includes(MISSION_4_BADGE.id)
      ? user.unlockedBadges
      : [...user.unlockedBadges, MISSION_4_BADGE.id];

    const progressRecord: Mission4ProgressRecord = {
      completed: true,
      completedAt: new Date().toISOString(),
      plan: savedPlan,
      rubricScores: savedPlan.rubricScores,
    };

    const updatedUser: UserProfile = {
      ...user,
      stars: isFirstTime ? user.stars + MISSION_4_BADGE.starBonus : user.stars,
      xp: isFirstTime ? user.xp + MISSION_4_BADGE.xpBonus : user.xp,
      completedMissions: newCompletedMissions,
      unlockedBadges: newUnlockedBadges,
      misi4Progress: progressRecord,
    };

    onUpdateUser(updatedUser);
  };

  const handleUpdatePlanFromTeacher = (updatedPlan: Mission4ActionPlan) => {
    setCurrentPlan(updatedPlan);

    if (user.misi4Progress) {
      const updatedProgress: Mission4ProgressRecord = {
        ...user.misi4Progress,
        plan: updatedPlan,
        rubricScores: updatedPlan.rubricScores,
      };

      const updatedUser: UserProfile = {
        ...user,
        misi4Progress: updatedProgress,
      };

      onUpdateUser(updatedUser);
    }
  };

  return (
    <div className="w-full pb-10">
      {currentStep === 'intro' && (
        <Mission4Intro
          username={user.username}
          onStartBuilder={handleStartBuilder}
          onBackToDashboard={onBackToDashboard}
          hasExistingPlan={!!existingPlan}
          onViewExistingPlan={() => {
            if (existingPlan) {
              setCurrentPlan(existingPlan);
              setCurrentStep('card');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
      )}

      {currentStep === 'activity' && (
        <Mission4ActivitySelect
          selectedActivityId={selectedActivityId}
          onSelectActivity={handleSelectActivity}
          onNext={handleNextToCulture}
          onBack={() => {
            setCurrentStep('intro');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentStep === 'culture' && selectedActivityId && (
        <Mission4CultureSelect
          selectedActivityId={selectedActivityId}
          selectedCultureId={selectedCultureId}
          onSelectCulture={handleSelectCulture}
          onNext={handleNextToBuilder}
          onBack={() => {
            setCurrentStep('activity');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentStep === 'builder' && chosenActivity && chosenCulture && (
        <Mission4PlanBuilder
          activity={chosenActivity}
          culture={chosenCulture}
          initialHelper={selectedHelper}
          initialLearningGoal={learningGoal}
          onGenerateCard={handleGenerateCard}
          onBack={() => {
            setCurrentStep('culture');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentStep === 'card' && currentPlan && (
        <Mission4ActionCardView
          plan={currentPlan}
          studentName={user.username}
          onSavePlan={handleSavePlan}
          onEditPlan={() => {
            setCurrentStep('builder');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onCompleteToFinal={() => {
            setCurrentStep('completed');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToDashboard={onBackToDashboard}
        />
      )}

      {currentStep === 'completed' && currentPlan && (
        <Mission4Completion
          username={user.username}
          anonymousId={user.anonymousId}
          plan={currentPlan}
          onOpenCardView={() => {
            setCurrentStep('card');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToDashboard={onBackToDashboard}
          onUpdatePlan={handleUpdatePlanFromTeacher}
        />
      )}
    </div>
  );
};
