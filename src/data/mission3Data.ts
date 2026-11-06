import { Mission3Scenario, AchievementBadge } from '../types';

export const MISSION_3_BADGE: AchievementBadge & { starBonus: number; xpBonus: number } = {
  id: 'badge-penjaga-warisan',
  name: 'Perisai Pusaka Nusantara',
  description: 'Menyelesaikan 3 skenario simulasi Penjaga Warisan Budaya dengan penalaran bijak dan peduli pelestarian.',
  icon: 'Shield',
  unlocked: true,
  progress: 3,
  maxProgress: 3,
  category: 'Pelestarian',
  starBonus: 3,
  xpBonus: 150,
};

export const MISSION_3_SCENARIOS: Mission3Scenario[] = [
  {
    id: 'skenario-1-congklak',
    scenarioNumber: 1,
    topic: 'Permainan Tradisional',
    title: 'Permainan Congklak',
    subtitle: 'Menghidupkan Kembali Permainan Tradisional di Halaman Bermain',
    initialImage: '/src/assets/images/m3_congklak_initial_1793975121264.jpg',
    storyParagraphs: [
      'Dahulu, anak-anak di lingkunganmu sering bermain congklak bersama di sore hari.',
      'Namun, sekarang hanya sedikit anak yang bisa memainkannya karena lebih sering bermain gawai.',
      'Kamu ingin permainan ini dikenal kembali oleh teman-temanmu agar keceriaan dan kebersamaan tetap hidup.',
    ],
    options: {
      A: {
        id: 'A',
        title: 'Belajar bermain dan mengajak teman',
        description: 'Mempelajari cara memindahkan biji congklak, lalu mengundang teman-teman di sekitar rumah untuk bermain bersama di atas tikar.',
        badgeLabel: 'Aksi Aktif & Mengajak',
        imageResult: '/src/assets/images/m3_congklak_action_a_1793975122341.jpg',
        resultingSprout: 'berdaun',
        resultMessage: 'Hebat! Teman-temanmu mulai mengenal congklak. Dengan bermain bersama, permainan tradisional bisa terus dikenal.',
        cultuDialogue: 'Luar biasa! Ketika kamu mulai mengajak dan bermain bersama, halaman menjadi ramai dan menyenangkan. Teman-temanmu jadi tahu betapa asyiknya menyusun strategi biji congklak!',
        indicatorChangeText: 'Tunas tumbuh subur dan berdaun! Kesempatan pewarisan permainan tradisional meningkat karena ada praktik nyata antar-teman.',
      },
      B: {
        id: 'B',
        title: 'Membiarkannya karena dianggap ketinggalan zaman',
        description: 'Tidak mencoba belajar congklak dan membiarkan papan congklak tetap tergeletak sepi di halaman.',
        badgeLabel: 'Sikap Pasif',
        imageResult: '/src/assets/images/m3_congklak_action_b_1793975123436.jpg',
        resultingSprout: 'kecil',
        resultMessage: 'Permainan congklak belum dikenal oleh teman-temanmu. Menurutmu, apa yang bisa kamu lakukan agar permainan ini tetap dikenal?',
        cultuDialogue: 'Papan congklak masih terdiam di atas tikar. Teman-temanmu tetap melakukan kegiatan lain dan belum mengenal indahnya permainan tradisional ini.',
        indicatorChangeText: 'Tunas menjadi lebih kecil. Jika tidak ada yang memainkan, pengetahuan tentang permainan congklak perlahan pudar.',
      },
    },
    presetReasons: [
      {
        id: 'c1',
        text: 'Agar teman-teman mengenal permainan congklak.',
        iconType: 'users',
        defaultScore: 2,
      },
      {
        id: 'c2',
        text: 'Agar permainan tradisional tetap dimainkan.',
        iconType: 'sparkles',
        defaultScore: 2,
      },
      {
        id: 'c3',
        text: 'Agar bisa bermain bersama teman.',
        iconType: 'heart',
        defaultScore: 1,
      },
    ],
    reflectionPrompt: 'Apa yang kamu pelajari dari pilihanmu?',
    cultuReflectionTip: 'Pikirkan apa yang terjadi jika anak-anak Indonesia tidak ada lagi yang memainkan congklak, dan apa yang bisa kamu lakukan!',
  },
  {
    id: 'skenario-2-cerita-rakyat',
    scenarioNumber: 2,
    topic: 'Cerita Rakyat',
    title: 'Cerita yang Hampir Terlupakan',
    subtitle: 'Menyebarkan Kisah Nusantara yang Penuh Pesan Luhur',
    initialImage: '/src/assets/images/m3_folklore_initial_1793975151849.jpg',
    storyParagraphs: [
      'Banyak temanmu tidak lagi mengenal cerita rakyat dari daerahnya.',
      'Padahal, kamu baru saja membaca sebuah cerita nusantara yang sangat menarik dan sarat pesan kebaikan.',
      'Kamu ingin cerita itu dikenal oleh lebih banyak orang agar warisan tutur tidak hilang.',
    ],
    options: {
      A: {
        id: 'A',
        title: 'Menceritakannya kepada teman dan keluarga',
        description: 'Menceritakan kembali dongeng nusantara dengan ekspresi hidup saat waktu istirahat sekolah atau kumpul keluarga.',
        badgeLabel: 'Aksi Berbagi Kisah',
        imageResult: '/src/assets/images/m3_folklore_action_a_1793975152414.jpg',
        resultingSprout: 'berdaun',
        resultMessage: 'Senang sekali! Teman-temanmu mulai mengenal cerita tersebut. Cerita rakyat dapat terus dikenal jika kita mau membagikannya.',
        cultuDialogue: 'Wah, teman-temanmu mendengarkan dengan penuh kagum! Beberapa anak bahkan mulai ikut membaca buku cerita rakyat yang sama. Tradisi lisan kita terus mengalir!',
        indicatorChangeText: 'Tunas mekar berdaun hijau segar! Cerita rakyat tetap hidup dalam ingatan anak-anak melalui tutur kata yang dibagikan.',
      },
      B: {
        id: 'B',
        title: 'Menyimpannya sendiri',
        description: 'Menutup buku cerita dan hanya menikmatinya sendiri tanpa membagikan kisah seru tersebut kepada orang lain.',
        badgeLabel: 'Disimpan Sendiri',
        imageResult: '/src/assets/images/m3_folklore_action_b_1793975152548.jpg',
        resultingSprout: 'kecil',
        resultMessage: 'Cerita itu belum dikenal oleh teman-temanmu. Apa yang bisa kamu lakukan agar cerita rakyat tetap dikenal?',
        cultuDialogue: 'Kamu tahu cerita yang bagus itu, tetapi teman-teman di sekitarmu masih sibuk dengan aktivitas masing-masing tanpa mengenal kisah legenda daerah tersebut.',
        indicatorChangeText: 'Tunas menjadi lebih kecil. Bila kisah tidak diceritakan, generasi mendatang tidak akan mendengar nasihat berharga di dalamnya.',
      },
    },
    presetReasons: [
      {
        id: 'f1',
        text: 'Agar teman-teman mengenal cerita daerah.',
        iconType: 'book',
        defaultScore: 2,
      },
      {
        id: 'f2',
        text: 'Agar cerita rakyat tetap diceritakan.',
        iconType: 'sparkles',
        defaultScore: 2,
      },
      {
        id: 'f3',
        text: 'Agar bisa berbagi cerita dengan keluarga.',
        iconType: 'heart',
        defaultScore: 1,
      },
    ],
    reflectionPrompt: 'Apa yang kamu pelajari dari pilihanmu?',
    cultuReflectionTip: 'Cerita rakyat dulu diceritakan dari kakek-nenek ke orang tua kita. Bagaimana perasaanmu ketika menceritakan legenda nusantara?',
  },
  {
    id: 'skenario-3-informasi-pesan',
    scenarioNumber: 3,
    topic: 'Informasi di Grup Pesan',
    title: 'Periksa Sebelum Membagikan',
    subtitle: 'Menjaga Kebenaran Sejarah Budaya di Ruang Digital',
    initialImage: '/src/assets/images/m3_message_initial_1793975185229.jpg',
    storyParagraphs: [
      'Kamu menerima pesan tentang asal sebuah tradisi budaya Indonesia di ponselmu.',
      'Namun, penulisnya tidak jelas dan belum ada sumber atau buku sejarah yang dapat dipercaya.',
      'Temanmu mengajakmu langsung membagikan pesan itu ke grup lain tanpa mengecek kebenarannya.',
    ],
    options: {
      A: {
        id: 'A',
        title: 'Memeriksa informasi kepada guru atau sumber tepercaya',
        description: 'Bertanya kepada guru atau mencari keterangan di buku ensiklopedia budaya sebelum percaya atau meneruskan pesan.',
        badgeLabel: 'Kritis & Teliti',
        imageResult: '/src/assets/images/m3_message_action_a_1793975186824.jpg',
        resultingSprout: 'berdaun',
        resultMessage: 'Bagus! Kamu sudah memeriksa informasi terlebih dahulu. Dengan begitu, informasi tentang budaya dapat dibagikan dengan lebih tepat.',
        cultuDialogue: 'Sikap teladan! Guru bangga padamu karena berani memeriksa kebenaran. Menjaga budaya juga berarti menjaga agar cerita sejarahnya tidak diputarbalikkan!',
        indicatorChangeText: 'Tunas tumbuh berkilau dan berdaun lebat! Kebenaran sejarah budaya terlindungi dari kabar yang membingungkan.',
      },
      B: {
        id: 'B',
        title: 'Langsung membagikan pesan',
        description: 'Meneruskan pesan begitu saja tanpa memastikan kebenaran sumber atau asal-usul ceritanya.',
        badgeLabel: 'Terburu-buru Membagikan',
        imageResult: '/src/assets/images/m3_message_action_b_1793975188990.jpg',
        resultingSprout: 'kecil',
        resultMessage: 'Pesan tersebut belum jelas kebenarannya. Sebelum membagikan informasi budaya, sebaiknya kita memeriksa sumbernya terlebih dahulu.',
        cultuDialogue: 'Pesan sudah terkirim ke banyak teman, padahal ada tanda sumber belum jelas. Hal ini bisa membuat teman-teman salah memahami sejarah tradisi budaya kita.',
        indicatorChangeText: 'Tunas mengecil. Informasi yang keliru dapat mengaburkan makna luhur warisan budaya Indonesia.',
      },
    },
    presetReasons: [
      {
        id: 'm1',
        text: 'Agar informasi budaya tidak keliru.',
        iconType: 'shield',
        defaultScore: 2,
      },
      {
        id: 'm2',
        text: 'Agar orang lain menerima informasi yang benar.',
        iconType: 'check',
        defaultScore: 2,
      },
      {
        id: 'm3',
        text: 'Agar kita tidak mudah percaya pada pesan yang belum jelas.',
        iconType: 'sparkles',
        defaultScore: 1,
      },
    ],
    reflectionPrompt: 'Apa yang kamu pelajari dari pilihanmu?',
    cultuReflectionTip: 'Di era digital, mengapa kita harus hati-hati menyebarkan cerita tentang tradisi dan budaya bangsa?',
  },
];

/**
 * Automated Heuristic Scorer for Student Reasons (0 - 2 points)
 * Rubrik Penilaian:
 * Skor 0: Kosong / tidak berkaitan dengan budaya
 * Skor 1: Alasan umum (misal: "karena seru", "karena bagus", "suka")
 * Skor 2: Alasan menyebut akibat bagi budaya atau orang lain (misal: "agar teman-teman jadi tahu", "melestarikan budaya")
 */
export function evaluateReasonScore(text: string, defaultPresetScore?: number): { score: number; feedback: string } {
  if (defaultPresetScore !== undefined && defaultPresetScore >= 0) {
    return {
      score: defaultPresetScore,
      feedback: defaultPresetScore === 2
        ? 'Penalaran sangat baik: mengaitkan aksi dengan dampak budaya bagi orang lain.'
        : 'Penalaran umum yang baik: menunjukkan ketertarikan pada aktivitas bersama.',
    };
  }

  const clean = (text || '').trim().toLowerCase();
  if (clean.length < 3) {
    return {
      score: 0,
      feedback: 'Belum ada alasan yang terisi atau jawaban terlalu singkat.',
    };
  }

  // Keywords indicating Level 2: Cultural impact, community awareness, preservation, accuracy
  const level2Keywords = [
    'teman', 'tahu', 'kenal', 'lestari', 'budaya', 'tradisi', 'warisan',
    'punah', 'hilang', 'rusak', 'benar', 'keliru', 'sumber', 'guru',
    'sejarah', 'orang lain', 'generasi', 'bangsa', 'indonesia', 'keluarga',
    'paham', 'belajar bersama', 'menjaga', 'merawat', 'percaya', 'fakta'
  ];

  // Keywords indicating Level 1: General/vague reasons
  const level1Keywords = [
    'seru', 'bagus', 'suka', 'senang', 'ramai', 'lucu', 'asik', 'enak', 'biasa', 'keren'
  ];

  const hasLevel2 = level2Keywords.some((k) => clean.includes(k));
  if (hasLevel2) {
    return {
      score: 2,
      feedback: 'Hebat! Alasanmu menjelaskan dampak nyata bagi teman dan kelestarian budaya Indonesia.',
    };
  }

  const hasLevel1 = level1Keywords.some((k) => clean.includes(k)) || clean.length >= 8;
  if (hasLevel1) {
    return {
      score: 1,
      feedback: 'Bagus! Alasanmu menunjukkan antusiasme yang positif.',
    };
  }

  return {
    score: 0,
    feedback: 'Alasan belum cukup menggambarkan keterkaitannya dengan pembelajaran budaya.',
  };
}

/**
 * Automated Heuristic Scorer for Reflection (0 - 2 points)
 */
export function evaluateReflectionScore(text: string): { score: number; feedback: string } {
  const clean = (text || '').trim().toLowerCase();
  if (clean.length < 5) {
    return {
      score: 0,
      feedback: 'Refleksi belum diisi atau terlalu singkat.',
    };
  }

  const level2Keywords = [
    'budaya', 'teman', 'jaga', 'lestari', 'penting', 'belajar', 'mengajak',
    'berbagi', 'cerita', 'periksa', 'tanya', 'kebenaran', 'tradisi', 'warisan',
    'sama-sama', 'bersama', 'menghargai', 'bangga', 'indonesia', 'gotong royong'
  ];

  const level1Keywords = [
    'seru', 'tahu', 'baik', 'bisa', 'senang', 'harus', 'asik'
  ];

  const hasLevel2 = level2Keywords.some((k) => clean.includes(k)) && clean.length >= 10;
  if (hasLevel2) {
    return {
      score: 2,
      feedback: 'Refleksi mendalam! Kamu menyadari peranmu dalam merawat warisan budaya bangsa.',
    };
  }

  const hasLevel1 = level1Keywords.some((k) => clean.includes(k)) || clean.length >= 6;
  if (hasLevel1) {
    return {
      score: 1,
      feedback: 'Refleksi yang baik dan jujur tentang apa yang dialami.',
    };
  }

  return {
    score: 0,
    feedback: 'Refleksi belum cukup menjelaskan hikmah yang diperoleh.',
  };
}
