import { Misi4Activity, Misi4Helper, Mission4ActionPlan, Mission4RubricScores, AchievementBadge } from '../types';
import { MISSION_1_ITEMS } from './mission1Data';

export const MISSION_4_BADGE: AchievementBadge & { starBonus: number; xpBonus: number } = {
  id: 'badge-duta-budaya',
  name: 'Duta Budaya Nusantara',
  description: 'Menyusun Rencana Aksi Budaya nyata dan menyelesaikan seluruh ekspedisi CultureQuest.',
  icon: 'Award',
  unlocked: true,
  progress: 1,
  maxProgress: 1,
  category: 'Pelestarian',
  starBonus: 4,
  xpBonus: 200,
};

export const MISI4_ACTIVITIES: Misi4Activity[] = [
  {
    id: 'bermain-permainan',
    orderNumber: 1,
    title: 'Bermain Permainan Tradisional',
    description: 'Ajak temanmu bermain permainan tradisional.',
    image: '/src/assets/images/m3_congklak_action_a_1793975122341.jpg',
    iconName: 'Gamepad2',
    suitableCategories: ['Alat Musik', 'Seni Pertunjukan', 'Permainan'],
  },
  {
    id: 'menceritakan-cerita',
    orderNumber: 2,
    title: 'Menceritakan Cerita Rakyat',
    description: 'Ceritakan kisah rakyat yang kamu ketahui kepada keluargamu.',
    image: '/src/assets/images/m3_folklore_action_a_1793975152414.jpg',
    iconName: 'BookOpen',
    suitableCategories: ['Cerita Rakyat', 'Seni Pertunjukan'],
  },
  {
    id: 'mengenal-rumah-adat',
    orderNumber: 3,
    title: 'Mengenal Rumah Adat',
    description: 'Cari tahu informasi tentang rumah adat dari sumber yang tepercaya.',
    image: '/src/assets/images/rumah_gadang_minangkabau_1793973885674.jpg',
    iconName: 'Home',
    suitableCategories: ['Rumah Adat'],
  },
  {
    id: 'mengajak-teman',
    orderNumber: 4,
    title: 'Mengajak Teman Mengikuti Kegiatan Budaya',
    description: 'Ajak temanmu ikut kegiatan budaya yang ada di sekolah.',
    image: '/src/assets/images/mission_aksi_bermakna_1793969036434.jpg',
    iconName: 'Users',
    suitableCategories: ['Alat Musik', 'Seni Pertunjukan', 'Kain Tradisional'],
  },
  {
    id: 'bertanya-tradisi',
    orderNumber: 5,
    title: 'Bertanya tentang Tradisi Daerah',
    description: 'Tanyakan tradisi daerah kepada anggota keluargamu.',
    image: '/src/assets/images/pertunjukan_wayang_kulit_1793973887214.jpg',
    iconName: 'MessageCircleQuestion',
    suitableCategories: ['Rumah Adat', 'Kain Tradisional', 'Seni Pertunjukan', 'Alat Musik', 'Cerita Rakyat'],
  },
];

export const MISI4_HELPERS: Misi4Helper[] = [
  {
    id: 'guru',
    label: 'Guru',
    roleDescription: 'Mendampingi belajar di kelas dan mencarikan buku rujukan budaya tepercaya.',
    iconName: 'GraduationCap',
  },
  {
    id: 'orang-tua',
    label: 'Orang Tua',
    roleDescription: 'Membimbing di rumah dan menceritakan adat istiadat keluarga.',
    iconName: 'HeartHandshake',
  },
  {
    id: 'teman',
    label: 'Teman',
    roleDescription: 'Bermain bersama, berlatih, dan saling berbagi semangat mencintai budaya.',
    iconName: 'Users',
  },
  {
    id: 'kakek-nenek',
    label: 'Kakek atau Nenek',
    roleDescription: 'Menuturkan kisah tempo dulu, dongeng nusantara, dan kearifan para leluhur.',
    iconName: 'Sparkles',
  },
];

/**
 * Provides helpful constructive pairing advice when an activity is paired with a specific culture,
 * ensuring students understand how to make their plan realistic and creative.
 */
export function getPairingAdvice(activityId: string, culturalCategory: string, culturalName: string): string | null {
  if (activityId === 'bermain-permainan') {
    if (culturalCategory === 'Rumah Adat') {
      return `💡 Tips Rencana Seru: Kamu bisa mengajak teman bermain tebak ciri-ciri ${culturalName} atau menyusun miniatur kreatifnya bersama!`;
    }
    if (culturalCategory === 'Kain Tradisional') {
      return `💡 Tips Rencana Seru: Kamu bisa membuat permainan kartu mencocokkan pola motif ${culturalName} bersama temanmu!`;
    }
    if (culturalCategory === 'Cerita Rakyat') {
      return `💡 Tips Rencana Seru: Kamu bisa bermain peran (drama tebak tokoh) dari kisah ${culturalName} bersama teman!`;
    }
  }

  if (activityId === 'menceritakan-cerita') {
    if (culturalCategory === 'Rumah Adat' || culturalCategory === 'Alat Musik' || culturalCategory === 'Kain Tradisional') {
      return `💡 Tips Rencana Seru: Ceritakan kisah asal-usul, mitos, atau makna filosofis di balik ${culturalName} kepada keluargamu!`;
    }
  }

  if (activityId === 'mengenal-rumah-adat' && culturalCategory !== 'Rumah Adat') {
    return `💡 Tips Rencana Seru: Selain mempelajari ${culturalName}, kamu juga bisa melihat bagaimana budaya ini digunakan dalam upacara di rumah adat daerah asalnya!`;
  }

  return null;
}

/**
 * Rubrik Penilaian Rencana Aksi (Maks 6 Poin)
 * 1. Kelengkapan Isian (0-2)
 * 2. Kesesuaian Kegiatan dengan Budaya (0-2)
 * 3. Kejelasan Hal yang Ingin Dipelajari (0-2)
 */
export function evaluateActionPlanRubric(
  activityId: string,
  culturalId: string,
  helper: string,
  learningGoal: string
): Mission4RubricScores {
  const goalTrimmed = (learningGoal || '').trim();

  // 1. Kelengkapan Isian
  let completenessScore = 0;
  let completenessFeedback = 'Masih ada isian yang belum dipilih atau kosong.';
  if (activityId && culturalId && helper) {
    if (goalTrimmed.length >= 8) {
      completenessScore = 2;
      completenessFeedback = 'Seluruh isian rencana aksi terisi dengan lengkap dan baik.';
    } else if (goalTrimmed.length > 0) {
      completenessScore = 1;
      completenessFeedback = 'Sebagian isian terisi, namun hal yang ingin dipelajari masih sangat pendek.';
    }
  }

  // 2. Kesesuaian Kegiatan dengan Budaya
  const culturalItem = MISSION_1_ITEMS.find((c) => c.id === culturalId);
  const cat = culturalItem?.category || '';
  let suitabilityScore = 1;
  let suitabilityFeedback = 'Kegiatan cukup sesuai dan dapat dikembangkan dengan ide kreatif.';

  if (
    (activityId === 'mengenal-rumah-adat' && cat === 'Rumah Adat') ||
    (activityId === 'menceritakan-cerita' && cat === 'Cerita Rakyat') ||
    (activityId === 'bermain-permainan' && (culturalItem?.name.includes('Angklung') || culturalItem?.name.includes('Congklak') || cat === 'Seni Pertunjukan')) ||
    (activityId === 'mengajak-teman' && (cat === 'Alat Musik' || cat === 'Seni Pertunjukan' || cat === 'Kain Tradisional')) ||
    (activityId === 'bertanya-tradisi')
  ) {
    suitabilityScore = 2;
    suitabilityFeedback = 'Kegiatan sangat tepat dan selaras dengan karakteristik warisan budaya yang dipilih.';
  } else if (!activityId || !culturalId) {
    suitabilityScore = 0;
    suitabilityFeedback = 'Belum ada kombinasi kegiatan dan budaya yang dipilih.';
  }

  // 3. Kejelasan Hal yang Ingin Dipelajari
  let clarityScore = 0;
  let clarityFeedback = 'Pertanyaan atau hal yang ingin dipelajari belum jelas atau belum diisi.';
  const lowerGoal = goalTrimmed.toLowerCase();

  const culturalKeywords = [
    'tahu', 'cara', 'cerita', 'bagaimana', 'mengapa', 'sejarah', 'makna',
    'motif', 'membuat', 'mainkan', 'lagu', 'atap', 'gonjong', 'kayu',
    'ukir', 'filosofi', 'sumber', 'asal', 'bambu', 'tari', 'gerakan', 'tradisi'
  ];

  const hasSpecificKeyword = culturalKeywords.some((k) => lowerGoal.includes(k));

  if (goalTrimmed.length >= 10 && hasSpecificKeyword) {
    clarityScore = 2;
    clarityFeedback = 'Hal yang ingin dipelajari sangat spesifik, terarah, dan relevan dengan budaya sasaran.';
  } else if (goalTrimmed.length >= 5) {
    clarityScore = 1;
    clarityFeedback = 'Jawaban masih bersifat umum, namun sudah menunjukkan minat belajar.';
  }

  const totalScore = completenessScore + suitabilityScore + clarityScore;

  return {
    completenessScore,
    suitabilityScore,
    clarityScore,
    totalScore,
    completenessFeedback,
    suitabilityFeedback,
    clarityFeedback,
  };
}

/**
 * Generates and downloads a CSV export file for teacher/research review.
 */
export function exportActionPlanToCSV(plan: Mission4ActionPlan, studentName: string): void {
  const headers = [
    'Kode Peserta',
    'Nama Siswa',
    'Kegiatan Budaya',
    'Budaya Pilihan',
    'Asal Daerah',
    'Kategori Budaya',
    'Pendamping Belajar',
    'Hal Yang Ingin Dipelajari',
    'Skor Kelengkapan (0-2)',
    'Skor Kesesuaian (0-2)',
    'Skor Kejelasan (0-2)',
    'Total Skor Rubrik (0-6)',
    'Catatan Guru',
    'Status Rencana',
    'Waktu Disimpan',
  ];

  const escapeCSV = (val: string | number | undefined | null) => {
    const s = String(val ?? '').replace(/"/g, '""');
    return `"${s}"`;
  };

  const row = [
    escapeCSV(plan.participantCode),
    escapeCSV(studentName),
    escapeCSV(plan.activityTitle),
    escapeCSV(plan.culturalName),
    escapeCSV(plan.culturalRegion),
    escapeCSV(plan.culturalCategory),
    escapeCSV(plan.helperLabel),
    escapeCSV(plan.learningGoal),
    escapeCSV(plan.rubricScores.completenessScore),
    escapeCSV(plan.rubricScores.suitabilityScore),
    escapeCSV(plan.rubricScores.clarityScore),
    escapeCSV(plan.rubricScores.totalScore),
    escapeCSV(plan.teacherNotes || '-'),
    escapeCSV(plan.isSaved ? 'Tersimpan' : 'Draf'),
    escapeCSV(plan.createdAt || new Date().toISOString()),
  ];

  const csvContent = '\uFEFF' + [headers.join(','), row.join(',')].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `rencana_aksi_${plan.participantCode}_culturequest.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
