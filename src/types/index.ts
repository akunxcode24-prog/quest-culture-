export interface UserProfile {
  username: string;
  anonymousId: string;
  joinedAt: string;
  level: number;
  levelTitle: string;
  xp: number;
  stars: number;
  completedMissions: string[];
  unlockedBadges: string[];
  collectedCardsMisi1?: string[];
  misi2Progress?: Mission2ProgressRecord;
  misi3Progress?: Mission3ProgressRecord;
  misi4Progress?: Mission4ProgressRecord;
}

export type Misi4ActivityId =
  | 'bermain-permainan'
  | 'menceritakan-cerita'
  | 'mengenal-rumah-adat'
  | 'mengajak-teman'
  | 'bertanya-tradisi';

export interface Misi4Activity {
  id: Misi4ActivityId;
  orderNumber: number;
  title: string;
  description: string;
  image: string;
  iconName: string;
  suitableCategories: string[];
}

export type Misi4HelperType = 'guru' | 'orang-tua' | 'teman' | 'kakek-nenek';

export interface Misi4Helper {
  id: Misi4HelperType;
  label: string;
  roleDescription: string;
  iconName: string;
}

export interface Mission4RubricScores {
  completenessScore: number; // 0 - 2
  suitabilityScore: number;  // 0 - 2
  clarityScore: number;      // 0 - 2
  totalScore: number;        // max 6
  completenessFeedback: string;
  suitabilityFeedback: string;
  clarityFeedback: string;
}

export interface Mission4ActionPlan {
  participantCode: string;
  activityId: Misi4ActivityId;
  activityTitle: string;
  culturalId: string;
  culturalName: string;
  culturalRegion: string;
  culturalCategory: string;
  culturalImage: string;
  helper: Misi4HelperType;
  helperLabel: string;
  learningGoal: string;
  pairingAdvice?: string;
  rubricScores: Mission4RubricScores;
  teacherNotes?: string;
  isSaved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Mission4ProgressRecord {
  completed: boolean;
  completedAt?: string;
  plan: Mission4ActionPlan;
  rubricScores: Mission4RubricScores;
}

export type SproutStage = 'kecil' | 'sedang' | 'berdaun';

export interface ScenarioActionOption {
  id: 'A' | 'B';
  title: string;
  description: string;
  badgeLabel: string;
  imageResult: string;
  resultingSprout: SproutStage;
  resultMessage: string;
  cultuDialogue: string;
  indicatorChangeText: string;
}

export interface ScenarioReasonOption {
  id: string;
  text: string;
  iconType: 'group' | 'sparkles' | 'book' | 'shield' | 'heart' | 'users' | 'check';
  defaultScore: number;
}

export interface Mission3Scenario {
  id: string;
  scenarioNumber: number;
  topic: string;
  title: string;
  subtitle: string;
  initialImage: string;
  storyParagraphs: string[];
  options: {
    A: ScenarioActionOption;
    B: ScenarioActionOption;
  };
  presetReasons: ScenarioReasonOption[];
  reflectionPrompt: string;
  cultuReflectionTip: string;
}

export interface ScenarioDecisionRecord {
  scenarioId: string;
  scenarioTitle: string;
  chosenActionId: 'A' | 'B';
  triedActionIds: ('A' | 'B')[];
  triedBothActions: boolean;
  reasonType: 'preset' | 'custom';
  reasonText: string;
  reasonScore: number; // 0, 1, or 2
  reflectionText: string;
  reflectionScore: number; // 0, 1, or 2
  teacherFeedback?: string;
  updatedAt: string;
}

export interface Mission3ProgressRecord {
  completed: boolean;
  completedAt?: string;
  scenariosCompleted: number;
  totalOptionsTried: number;
  totalReasoningScore: number;
  maxPossibleScore: number;
  decisions: Record<string, ScenarioDecisionRecord>;
}

export type CulturalAspectType = 'benda' | 'takbenda';

export interface Mission2CardItem {
  id: string;
  name: string;
  categoryType: CulturalAspectType;
  pairedConceptGroup?: 'angklung' | 'batik' | 'wayang' | 'arsitektur' | 'seni-tutur';
  aspectSubtitle: string;
  region: string;
  island: string;
  image: string;
  description: string;
  physicalTraitOrPractice: string;
  classificationReason: string;
  funFact: string;
}

export interface Mission2Riddle {
  id: string;
  clueText: string;
  targetCategory: CulturalAspectType;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    typeLabel: string;
  }[];
  explanation: string;
}

export interface Mission2ProgressRecord {
  completed: boolean;
  completedAt?: string;
  sortingAccuracy: number;
  totalAttempts: number;
  riddleScore: number;
  classifiedCardIds: string[];
}

export interface Mission1CardItem {
  id: string;
  name: string;
  region: string;
  island: string;
  coordinates: { x: number; y: number };
  image: string;
  shortDescription: string;
  functionUse: string;
  culturalValue: string;
  funFact: string;
  clue: string;
  sourceRef?: string;
  category: 'Rumah Adat' | 'Seni Pertunjukan' | 'Cerita Rakyat' | 'Senjata Tradisional' | 'Alat Musik' | 'Kain Tradisional';
}

export interface Mission1Challenge {
  id: string;
  targetCardId: string;
  clueText: string;
  hintText: string;
  correctExplanation: string;
}


export interface Mission {
  id: string;
  orderNumber: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  learningObjectives: string[];
  keyTopics: string[];
  image: string;
  status: 'available' | 'in_progress' | 'locked';
  requiredLevel: number;
  estimatedMinutes: number;
  starReward: number;
  xpReward: number;
  badgeReward: string;
  color: string;
}

export interface CulturalItem {
  id: string;
  name: string;
  category: 'Rumah Adat' | 'Pakaian Adat' | 'Alat Musik' | 'Seni Pertunjukan' | 'Kuliner Tradisional';
  region: string;
  island: 'Sumatera' | 'Jawa' | 'Kalimantan' | 'Sulawesi' | 'Bali & Nusa Tenggara' | 'Maluku & Papua';
  shortDescription: string;
  funFact: string;
  iconName: string;
  badge: string;
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  category: 'Eksplorasi' | 'Pengetahuan' | 'Pelestarian' | 'Spesial';
}

export interface RegionCheckpoint {
  id: string;
  name: string;
  island: string;
  coordinates: { x: number; y: number }; // percentage on map
  culturalHighlight: string;
  missionConnection: string;
  unlocked: boolean;
  trivia: string;
}
