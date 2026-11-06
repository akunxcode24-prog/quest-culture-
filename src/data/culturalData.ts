import { Mission, CulturalItem, AchievementBadge, RegionCheckpoint } from '../types';

export const MISSIONS_DATA: Mission[] = [
  {
    id: 'misi-1',
    orderNumber: 1,
    title: 'Jelajah Warisan Nusantara',
    subtitle: 'Mengenal 8 Warisan Budaya Nusantara dari Berbagai Daerah',
    category: 'Eksplorasi Budaya',
    description: 'Indonesia memiliki beragam warisan budaya yang menarik untuk dikenal. Ayo, jelajahi berbagai daerah dan temukan kekayaan budaya Nusantara!',
    learningObjectives: [
      'Mengenal 8 warisan budaya Nusantara (Tari Saman, Rumah Gadang, Sangkuriang, Angklung, Wayang Kulit, Batik, Reog Ponorogo, Tongkonan).',
      'Mengetahui asal daerah dan letak geografisnya pada peta Indonesia.',
      'Memahami fungsi, kegunaan, dan nilai makna luhur warisan budaya bangsa.'
    ],
    keyTopics: ['Tari Saman & Rumah Gadang', 'Sangkuriang & Angklung', 'Wayang Kulit & Batik', 'Reog Ponorogo & Tongkonan'],
    image: '/assets/aistudio/Golden-Hour_Minangkabau_Village_Adventure_9a58bc89.png',
    status: 'available',
    requiredLevel: 1,
    estimatedMinutes: 15,
    starReward: 3,
    xpReward: 100,
    badgeReward: 'Lencana Penjelajah Budaya',
    color: '#8C4B2D'
  },
  {
    id: 'misi-2',
    orderNumber: 2,
    title: 'Detektif Jenis Warisan Budaya',
    subtitle: 'Menyelidiki Warisan Budaya Benda & Takbenda Dunia',
    category: 'Klasifikasi & Analisis',
    description: 'Pegang kaca pembesar petualangmu! Dalam misi ini, kamu bertugas menjadi detektif budaya yang membedakan warisan budaya berbentuk fisik (candi, naskah kuno) dan warisan takbenda (tari, dongeng, keterampilan membatik).',
    learningObjectives: [
      'Memahami konsep Warisan Budaya Benda (Tangible Cultural Heritage) seperti Candi Borobudur dan Prambanan.',
      'Memahami konsep Warisan Budaya Takbenda (Intangible Cultural Heritage) yang diakui UNESCO (Wayang, Keris, Batik).',
      'Mengelompokkan contoh-contoh kebudayaan ke dalam kategori yang tepat secara mandiri.'
    ],
    keyTopics: ['Warisan Benda (Tangible)', 'Warisan Takbenda (Intangible)', 'Warisan UNESCO Indonesia', 'Kaca Pembesar Detektif'],
    image: '/src/assets/images/pertunjukan_wayang_kulit_1793973887214.jpg',
    status: 'available',
    requiredLevel: 1,
    estimatedMinutes: 20,
    starReward: 3,
    xpReward: 120,
    badgeReward: 'Lencana Detektif UNESCO',
    color: '#315B70'
  },
  {
    id: 'misi-3',
    orderNumber: 3,
    title: 'Penjaga Warisan Budaya',
    subtitle: 'Permainan Cerita Interaktif: Pilihanmu Membawa Perubahan',
    category: 'Konservasi & Apresiasi',
    description: 'Yuk, bantu menjaga warisan budaya Indonesia! Pilih tindakanmu dan lihat bagaimana pilihanmu membawa perubahan.',
    learningObjectives: [
      'Menghidupkan kembali permainan tradisional (congklak) bersama teman sebaya.',
      'Melestarikan cerita rakyat nusantara melalui tradisi bertutur kepada keluarga dan teman.',
      'Menjadi penjaga budaya digital yang bijak dengan memeriksa kebenaran informasi sebelum membagikan.'
    ],
    keyTopics: ['Permainan Congklak', 'Cerita Rakyat Nusantara', 'Cek Informasi Budaya', 'Tunas Kesempatan Budaya'],
    image: '/src/assets/images/m3_guardian_completion_1793975189369.jpg',
    status: 'available',
    requiredLevel: 1,
    estimatedMinutes: 20,
    starReward: 3,
    xpReward: 150,
    badgeReward: 'Perisai Pusaka Nusantara',
    color: '#527D65'
  },
  {
    id: 'misi-4',
    orderNumber: 4,
    title: 'Aksi Kecil, Dampak Bermakna',
    subtitle: 'Menyusun Kartu Rencana Pelestarian Budaya Indonesia',
    category: 'Aksi Nyata & Proyek',
    description: 'Yuk, lakukan hal sederhana untuk mengenal dan menjaga budaya Indonesia! Pilih kegiatan, susun rencana aksimu, dan peroleh Kartu Rencana Pelestarian Budaya.',
    learningObjectives: [
      'Memilih 1 dari 5 kegiatan nyata pelestarian budaya sehari-hari.',
      'Menghubungkan kegiatan dengan salah satu dari 8 warisan budaya Nusantara Misi 1.',
      'Menyusun Kartu Rencana Aksi Budaya digital lengkap dengan pendamping dan rasa ingin tahu.'
    ],
    keyTopics: ['Bermain Tradisional', 'Bercerita Rakyat', 'Mengenal Rumah Adat', 'Kegiatan Budaya Sekolah', 'Bertanya Tradisi'],
    image: '/src/assets/images/mission_aksi_bermakna_1793969036434.jpg',
    status: 'available',
    requiredLevel: 1,
    estimatedMinutes: 15,
    starReward: 4,
    xpReward: 200,
    badgeReward: 'Duta Budaya Nusantara',
    color: '#D99A35'
  }
];

export const CULTU_DIALOGUES = [
  "Halo! Aku Cultu, burung Cendrawasih sahabat petualangmu. Siap menjelajahi indahnya budaya Nusantara hari ini?",
  "Tahukah kamu? Indonesia memiliki lebih dari 1.340 suku bangsa dan 718 bahasa daerah yang luar biasa beragam!",
  "Candi Borobudur dibangun dari sekitar 2 juta balok batu vulkanik tanpa menggunakan semen, lho!",
  "Batik Indonesia telah diakui oleh UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi sejak 2009!",
  "Alat musik Sasando dari Nusa Tenggara Timur dimainkan dengan cara dipetik dan tabung resonansinya terbuat dari anyaman daun lontar!",
  "Rumah Gadang di Minangkabau dirancang tahan gempa dengan pasak kayu tanpa paku besi!"
];

export const REGION_CHECKPOINTS: RegionCheckpoint[] = [
  {
    id: 'sumatera',
    name: 'Sumatera',
    island: 'Pulau Sumatera',
    coordinates: { x: 18, y: 38 },
    culturalHighlight: 'Rumah Gadang & Tari Piring',
    missionConnection: 'Misi 1: Jelajah Warisan Nusantara',
    unlocked: true,
    trivia: 'Rumah Gadang memiliki atap berbentuk melengkung seperti tanduk kerbau (Gonjong) yang sangat megah.'
  },
  {
    id: 'jawa',
    name: 'Jawa & Madura',
    island: 'Pulau Jawa',
    coordinates: { x: 38, y: 72 },
    culturalHighlight: 'Candi Borobudur, Batik & Wayang Kulit',
    missionConnection: 'Misi 2: Detektif Jenis Warisan Budaya',
    unlocked: true,
    trivia: 'Wayang kulit adalah seni pertunjukan bayangan yang menggunakan kelir dan diiringi gamelan gending Jawa.'
  },
  {
    id: 'kalimantan',
    name: 'Kalimantan',
    island: 'Pulau Kalimantan',
    coordinates: { x: 44, y: 42 },
    culturalHighlight: 'Rumah Betang & Alat Musik Sape',
    missionConnection: 'Misi 1 & Misi 3',
    unlocked: true,
    trivia: 'Rumah Betang dihuni puluhan keluarga Dayak secara rukun, melambangkan nilai gotong royong dan kebersamaan.'
  },
  {
    id: 'sulawesi',
    name: 'Sulawesi',
    island: 'Pulau Sulawesi',
    coordinates: { x: 62, y: 46 },
    culturalHighlight: 'Tongkonan Toraja & Perahu Pinisi',
    missionConnection: 'Misi 1: Jelajah Warisan Nusantara',
    unlocked: true,
    trivia: 'Perahu Pinisi asal Bulukumba Sulawesi Selatan telah mengarungi samudra dunia sejak berabad-abad lampau.'
  },
  {
    id: 'bali-nt',
    name: 'Bali & Nusa Tenggara',
    island: 'Kepulauan Sunda Kecil',
    coordinates: { x: 55, y: 76 },
    culturalHighlight: 'Pura Ulun Danu & Alat Musik Sasando',
    missionConnection: 'Misi 3: Penjaga Warisan Budaya',
    unlocked: false,
    trivia: 'Sasando dari Pulau Rote NTT membutuhkan keahlian memetik dawai di balik daun lontar yang indah.'
  },
  {
    id: 'maluku-papua',
    name: 'Maluku & Papua',
    island: 'Indonesia Timur',
    coordinates: { x: 84, y: 52 },
    culturalHighlight: 'Rumah Honai, Tifa & Noken Tradisional',
    missionConnection: 'Misi 4: Aksi Kecil, Dampak Bermakna',
    unlocked: false,
    trivia: 'Noken adalah tas anyaman serat kulit kayu khas Papua yang juga masuk daftar Warisan Dunia UNESCO.'
  }
];

export const CULTURAL_ITEMS: CulturalItem[] = [
  {
    id: 'item-1',
    name: 'Rumah Gadang',
    category: 'Rumah Adat',
    region: 'Sumatera Barat',
    island: 'Sumatera',
    shortDescription: 'Rumah panggung megah suku Minangkabau dengan atap runcing menyerupai tanduk kerbau.',
    funFact: 'Tiang-tiang kayunya bertumpu pada batu ceper sehingga fleksibel dan tahan terhadap guncangan gempa bumi!',
    iconName: 'Home',
    badge: 'Arsitektur Khas'
  },
  {
    id: 'item-2',
    name: 'Candi Borobudur',
    category: 'Seni Pertunjukan', // Warisan Cagar Budaya
    region: 'Magelang, Jawa Tengah',
    island: 'Jawa',
    shortDescription: 'Candi Buddha terbesar di dunia yang dibangun pada masa Dinasti Syailendra abad ke-8.',
    funFact: 'Memiliki 2.672 panel relief dan 504 arca stupa Buddha yang diukir dengan detail luar biasa.',
    iconName: 'Landmark',
    badge: 'Warisan Benda Dunia'
  },
  {
    id: 'item-3',
    name: 'Angklung Bambu',
    category: 'Alat Musik',
    region: 'Jawa Barat',
    island: 'Jawa',
    shortDescription: 'Alat musik multitonal dari bambu yang dibunyikan dengan cara digoyangkan.',
    funFact: 'Satu angklung menghasilkan satu nada nada diatonis, sehingga untuk memainkan lagu butuh kerja sama seluruh siswa!',
    iconName: 'Music',
    badge: 'UNESCO Takbenda'
  },
  {
    id: 'item-4',
    name: 'Rumah Tongkonan',
    category: 'Rumah Adat',
    region: 'Tana Toraja, Sulawesi Selatan',
    island: 'Sulawesi',
    shortDescription: 'Rumah adat adat dengan atap melengkung menyerupai perahu serta deretan tanduk kerbau di bagian depan.',
    funFact: 'Jumlah tanduk kerbau yang dipajang di tiang depan menunjukkan status dan kemuliaan upacara adat keluarga pemiliknya.',
    iconName: 'Home',
    badge: 'Kearifan Lokal'
  },
  {
    id: 'item-5',
    name: 'Kain Tenun Ikat Sikka',
    category: 'Pakaian Adat',
    region: 'Flores, Nusa Tenggara Timur',
    island: 'Bali & Nusa Tenggara',
    shortDescription: 'Kain tenun tradisional penuh motif flora, fauna, dan simbol sakral yang diwarnai bahan alami.',
    funFact: 'Pewarna kain tenun ini diambil dari daun tarum untuk warna biru dan akar mengkudu untuk warna merah kecokelatan.',
    iconName: 'Sparkles',
    badge: 'Pustaka Kriya'
  },
  {
    id: 'item-6',
    name: 'Rumah Honai',
    category: 'Rumah Adat',
    region: 'Lembah Baliem, Papua',
    island: 'Maluku & Papua',
    shortDescription: 'Rumah bundar beratap jerami/alang-alang tanpa jendela untuk menghangatkan suhu di pegunungan dingin.',
    funFact: 'Bentuk atap bulat berguna untuk menahan hembusan angin kencang serta mengurangi dinginnya udara malam.',
    iconName: 'Home',
    badge: 'Pusaka Rimba'
  },
  {
    id: 'item-7',
    name: 'Tari Saman',
    category: 'Seni Pertunjukan',
    region: 'Gayo, Aceh',
    island: 'Sumatera',
    shortDescription: 'Tarian tepuk dada dan tangan serempak berkecepatan tinggi yang sarat pesan persatuan dan keagamaan.',
    funFact: 'Tari Saman tidak diiringi alat musik, melainkan hanya nyanyian syair dan tepukan tangan penarinya sendiri!',
    iconName: 'Flame',
    badge: 'Warisan UNESCO'
  },
  {
    id: 'item-8',
    name: 'Rendang Daging',
    category: 'Kuliner Tradisional',
    region: 'Minangkabau, Sumatera Barat',
    island: 'Sumatera',
    shortDescription: 'Masakan daging sapi kaya rempah yang dimasak perlahan berjam-jam hingga kuah santan mengering dan gelap.',
    funFact: 'Rendang dinobatkan sebagai salah satu makanan terlezat di dunia dan bisa bertahan berbulan-bulan tanpa bahan pengawet.',
    iconName: 'Utensils',
    badge: 'Kuliner Legenda'
  }
];

export const BADGES_DATA: AchievementBadge[] = [
  {
    id: 'badge-penjelajah-budaya',
    name: 'Penjelajah Budaya',
    description: 'Menemukan dan mengoleksi seluruh 8 kartu pusaka pada Misi 1 Jelajah Warisan Nusantara.',
    icon: 'Compass',
    unlocked: false,
    progress: 0,
    maxProgress: 8,
    category: 'Eksplorasi'
  },
  {
    id: 'badge-detektif-budaya',
    name: 'Lencana Detektif Budaya',
    description: 'Berhasil mengelompokkan warisan budaya benda dan takbenda pada Misi 2.',
    icon: 'Search',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'Pengetahuan'
  },
  {
    id: 'badge-penjaga-warisan',
    name: 'Perisai Pusaka Nusantara',
    description: 'Menyelesaikan 3 skenario simulasi Penjaga Warisan Budaya dengan penalaran bijak dan peduli pelestarian.',
    icon: 'Shield',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: 'Pelestarian'
  },
  {
    id: 'badge-1',
    name: 'Penjelajah Pemula',
    description: 'Berhasil mendaftar dan memulai langkah pertama di CultureQuest.',
    icon: 'Compass',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    category: 'Eksplorasi'
  },
  {
    id: 'badge-2',
    name: 'Sahabat Cultu',
    description: 'Mendengarkan 3 tips budaya dari pemandu Cultu.',
    icon: 'MessageCircle',
    unlocked: true,
    progress: 3,
    maxProgress: 3,
    category: 'Spesial'
  },
  {
    id: 'badge-3',
    name: 'Pakar Peta Nusantara',
    description: 'Melihat semua titik budaya kepulauan di Peta Misi.',
    icon: 'MapPin',
    unlocked: false,
    progress: 4,
    maxProgress: 6,
    category: 'Eksplorasi'
  },
  {
    id: 'badge-4',
    name: 'Detektif UNESCO',
    description: 'Mengetahui perbedaan warisan budaya benda dan takbenda.',
    icon: 'Search',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'Pengetahuan'
  },
  {
    id: 'badge-5',
    name: 'Pelindung Candi',
    description: 'Mempelajari cara menjaga situs bersejarah dari kerusakan.',
    icon: 'Shield',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'Pelestarian'
  },
  {
    id: 'badge-6',
    name: 'Pemain Angklung Cilik',
    description: 'Mengetahui nilai kerja sama dalam musik bambu tradisional.',
    icon: 'Music',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'Aksi Nyata' as unknown as 'Pelestarian'
  },
  {
    id: 'badge-duta-budaya',
    name: 'Duta Budaya Nusantara',
    description: 'Menyusun Rencana Aksi Budaya nyata dan menyelesaikan seluruh ekspedisi CultureQuest.',
    icon: 'Award',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'Pelestarian'
  }
];

export const LEARNING_SUMMARY = [
  {
    title: 'Apa itu Warisan Budaya?',
    content: 'Warisan budaya adalah segala hal berharga yang diwariskan oleh nenek moyang kita secara turun-temurun, seperti bangunan candi, kain batik, lagu daerah, cerita rakyat, hingga nilai luhur gotong royong.',
    icon: 'BookOpen'
  },
  {
    title: 'Warisan Benda vs Takbenda',
    content: 'Warisan Benda (Tangible) dapat disentuh dan dilihat fisiknya (seperti candi, keris, senjata tradisional). Sedangkan Warisan Takbenda (Intangible) berupa ide, keahlian, ritual adat, tarian, atau bahasa daerah.',
    icon: 'Layers'
  },
  {
    title: 'Mengapa Budaya Indonesia Sangat Beragam?',
    content: 'Karena Indonesia merupakan negara kepulauan terbesar di dunia dengan letak geografis yang strategis, memiliki lebih dari 17.000 pulau yang masing-masing melahirkan adat istiadat khas.',
    icon: 'Globe'
  },
  {
    title: 'Bagaimana Cara Kita Melestarikannya?',
    content: 'Cukup dengan langkah sederhana: bangga memakai pakaian adat/batik, mempelajari alat musik tradisional, tidak merusak situs bersejarah, dan menghormati kebiasaan teman yang berbeda suku.',
    icon: 'HeartHandshake'
  }
];
