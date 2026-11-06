import { Mission2CardItem, Mission2Riddle } from '../types';

export const MISSION_2_BADGE = {
  id: 'badge-detektif-budaya',
  name: 'Lencana Detektif Budaya',
  description: 'Berhasil mengelompokkan warisan budaya benda dan takbenda dengan tepat!',
  image: '/src/assets/images/badge_detektif_budaya_1793971905349.jpg',
  xpBonus: 120,
  starBonus: 3
};

export const MISSION_2_CARDS: Mission2CardItem[] = [
  {
    id: 'm2-rumah-gadang',
    name: 'Rumah Gadang',
    categoryType: 'benda',
    pairedConceptGroup: 'arsitektur',
    aspectSubtitle: 'Bangunan Fisik Tradisional',
    region: 'Sumatera Barat',
    island: 'Sumatera',
    image: '/src/assets/images/m2_rumah_gadang_minang_1793974568706.jpg',
    description: 'Rumah adat megah suku Minangkabau dengan atap gonjong melengkung seperti tanduk kerbau.',
    physicalTraitOrPractice: 'Wujud fisik berupa bangunan arsitektur kayu kokoh yang dapat dilihat, dimasuki, dan disentuh.',
    classificationReason: 'Termasuk Warisan Budaya Benda karena berwujud fisik nyata berupa bangunan tempat tinggal dan upacara adat.',
    funFact: 'Dirancang menggunakan sistem pasak kayu tanpa paku besi, menjadikannya fleksibel dan tahan gempa bumi!'
  },
  {
    id: 'm2-tari-saman',
    name: 'Tari Saman',
    categoryType: 'takbenda',
    pairedConceptGroup: 'seni-tutur',
    aspectSubtitle: 'Seni Pertunjukan Gerak Serempak',
    region: 'Gayo, Aceh',
    island: 'Sumatera',
    image: '/src/assets/images/card_tari_saman_1793969894457.jpg',
    description: 'Tarian kelompok dengan tepukan tangan ke dada dan paha berirama cepat yang diiringi syair pujian.',
    physicalTraitOrPractice: 'Bukan benda mati, melainkan aksi seni pertunjukan gerak tubuh dinamis dan kekompakan kelompok.',
    classificationReason: 'Termasuk Warisan Budaya Takbenda karena berupa seni pertunjukan, tradisi lisan, dan nilai kebersamaan yang diwariskan turun-temurun.',
    funFact: 'Telah diakui UNESCO pada tahun 2011 sebagai Warisan Budaya Takbenda yang Memerlukan Perlindungan Mendesak.'
  },
  {
    id: 'm2-cerita-sangkuriang',
    name: 'Cerita Rakyat Sangkuriang',
    categoryType: 'takbenda',
    pairedConceptGroup: 'seni-tutur',
    aspectSubtitle: 'Tradisi Lisan & Legenda',
    region: 'Jawa Barat',
    island: 'Jawa',
    image: '/src/assets/images/card_cerita_sangkuriang_1793970869779.jpg',
    description: 'Kisah legenda tentang Dayang Sumbi, Sangkuriang, dan asal mula terbentuknya Gunung Tangkuban Parahu.',
    physicalTraitOrPractice: 'Cerita rakyat lisan yang diceritakan oleh orang tua kepada anak-cucunya dari generasi ke generasi.',
    classificationReason: 'Termasuk Warisan Budaya Takbenda karena berwujud tradisi lisan, dongeng, dan pesan moral, bukan benda fisik padat.',
    funFact: 'Legenda ini mengandung nilai penting tentang pentingnya kejujuran, rasa hormat pada orang tua, dan pengendalian amarah.'
  },
  {
    id: 'm2-alat-angklung',
    name: 'Alat Musik Angklung',
    categoryType: 'benda',
    pairedConceptGroup: 'angklung',
    aspectSubtitle: 'Benda Fisik Tabung Bambu',
    region: 'Jawa Barat',
    island: 'Jawa',
    image: '/src/assets/images/card_alat_angklung_benda_1793971904228.jpg',
    description: 'Alat musik tradisional yang terbuat dari susunan bilah dan tabung bambu yang dirangkai pada rangka kayu.',
    physicalTraitOrPractice: 'Wujud fisik padat yang dapat dipegang tangannya, dilihat ukiran bambunya, dan disimpan di museum atau ruang musik.',
    classificationReason: 'Termasuk Warisan Budaya Benda karena merupakan perkakas atau instrumen fisik yang dibuat oleh pengrajin bambu.',
    funFact: 'Setiap bambu dipotong dengan ukuran tertentu untuk menghasilkan frekuensi tangga nada nada diatonis yang presisi!'
  },
  {
    id: 'm2-boneka-wayang',
    name: 'Boneka Wayang Kulit',
    categoryType: 'benda',
    pairedConceptGroup: 'wayang',
    aspectSubtitle: 'Karya Kriya Kulit Kerbau',
    region: 'Jawa Tengah & DI Yogyakarta',
    island: 'Jawa',
    image: '/src/assets/images/card_boneka_wayang_benda_1793971903791.jpg',
    description: 'Tokoh wayang pipih yang dipahat dari kulit kerbau dengan tangkai tanduk dan diwarnai dengan cat emas serta prada.',
    physicalTraitOrPractice: 'Wujud fisik berupa karya seni rupa tatah sungging yang dapat disentuh dan disimpan dalam kotak wayang (kothak).',
    classificationReason: 'Termasuk Warisan Budaya Benda karena berwujud fisik boneka kriya hasil ukiran dan pahatan tangan seniman.',
    funFact: 'Membuat satu boneka wayang kulit halus membutuhkan waktu berminggu-minggu ketelitian menatah lubang-lubang kecil rumit!'
  },
  {
    id: 'm2-pertunjukan-wayang',
    name: 'Pertunjukan Wayang Kulit',
    categoryType: 'takbenda',
    pairedConceptGroup: 'wayang',
    aspectSubtitle: 'Seni Teater Bayangan & Dalang',
    region: 'Jawa Tengah & DI Yogyakarta',
    island: 'Jawa',
    image: '/src/assets/images/m2_pertunjukan_wayang_kulit_1793974592386.jpg',
    description: 'Pagelaran teater bayangan semalam suntuk yang dimainkan oleh dalang dengan iringan gamelan dan sinden.',
    physicalTraitOrPractice: 'Keahlian mendongeng (sastra lisan), ilmu falsafah hidup, seni musik karawitan, dan pertunjukan teater.',
    classificationReason: 'Termasuk Warisan Budaya Takbenda karena merupakan seni pertunjukan, tradisi lisan, dan keahlian mendalang yang hidup.',
    funFact: 'Diakui UNESCO pada tahun 2003 sebagai Karya Agung Warisan Budaya Lisan dan Takbenda Kemanusiaan!'
  },
  {
    id: 'm2-kain-batik',
    name: 'Kain Batik Tradisional',
    categoryType: 'benda',
    pairedConceptGroup: 'batik',
    aspectSubtitle: 'Lembaran Kain Kriya Tekstil',
    region: 'Jawa (Solo, Yogya, Pekalongan)',
    island: 'Jawa',
    image: '/src/assets/images/card_kain_batik_benda_1793971904367.jpg',
    description: 'Lembaran kain mori atau sutra yang telah diwarnai dengan motif tradisional khas seperti Parang atau Kawung.',
    physicalTraitOrPractice: 'Wujud fisik kain tekstil yang dapat dilipat, dipakai sebagai pakaian, dipegang seratnya, dan dicuci.',
    classificationReason: 'Termasuk Warisan Budaya Benda karena berwujud fisik material lembaran kain karya tekstil tradisional.',
    funFact: 'Kain batik kuno yang dirawat baik bahkan bisa bertahan ratusan tahun disimpan di museum keraton!'
  },
  {
    id: 'm2-keterampilan-membatik',
    name: 'Keahlian Membatik Tulis',
    categoryType: 'takbenda',
    pairedConceptGroup: 'batik',
    aspectSubtitle: 'Kemahiran Kerajinan & Pengetahuan Lilin',
    region: 'Jawa',
    island: 'Jawa',
    image: '/src/assets/images/card_batik_jawa_1793970870335.jpg',
    description: 'Keahlian tangan meniup canting, meracik malam panas, menorehkan motif, serta memahami makna simbolis filosofinya.',
    physicalTraitOrPractice: 'Kemahiran kriya tradisional, kesabaran jiwa, dan pengetahuan ramuan pewarna alami yang tersimpan dalam ingatan perajin.',
    classificationReason: 'Termasuk Warisan Budaya Takbenda karena berupa pengetahuan, teknik kemahiran tangan, dan nilai filosofis seni membatik.',
    funFact: 'UNESCO mengakui Batik Indonesia pada 2009 karena teknik, simbolisme luhur, dan tradisi budayanya yang terus hidup!'
  },
  {
    id: 'm2-pertunjukan-reog',
    name: 'Seni Pertunjukan Reog',
    categoryType: 'takbenda',
    pairedConceptGroup: 'seni-tutur',
    aspectSubtitle: 'Seni Tari Tradisional Kolosal',
    region: 'Ponorogo, Jawa Timur',
    island: 'Jawa',
    image: '/src/assets/images/card_reog_ponorogo_1793970870101.jpg',
    description: 'Pertunjukan tari teatrikal penari berkepala harimau berhias bulu merak (Dadak Merak), Warok, dan Jathil.',
    physicalTraitOrPractice: 'Keahlian menari mengangkat topeng berat hanya dengan kekuatan gigi dan leher, iringan musik terompet, dan kekompakan.',
    classificationReason: 'Termasuk Warisan Budaya Takbenda karena merupakan ekspresi seni tari, ritual tradisi, dan atraksi seni panggung rakyat.',
    funFact: 'Topeng Dadak Merak beratnya bisa mencapai 50 kg dan digigit dengan gigi penari Singo Barong yang terlatih bertahun-tahun!'
  },
  {
    id: 'm2-rumah-tongkonan',
    name: 'Rumah Adat Tongkonan',
    categoryType: 'benda',
    pairedConceptGroup: 'arsitektur',
    aspectSubtitle: 'Bangunan Megah Arsitektur Kayu',
    region: 'Tana Toraja, Sulawesi Selatan',
    island: 'Sulawesi',
    image: '/src/assets/images/rumah_tongkonan_toraja_1793972850640.jpg',
    description: 'Rumah adat panggung khas suku Toraja dengan atap melengkung menjulang mirip perahu dan hiasan tanduk kerbau.',
    physicalTraitOrPractice: 'Wujud fisik berupa bangunan rumah panggung kayu ulin dengan ukiran warna merah, hitam, dan kuning.',
    classificationReason: 'Termasuk Warisan Budaya Benda karena berwujud fisik arsitektur bangunan tempat berkumpulnya keluarga marga.',
    funFact: 'Deretan tanduk kerbau yang dipasang di tiang depan bangunan melambangkan status dan kedermawanan keluarga dalam upacara adat Rambu Solo.'
  }
];

export const MISSION_2_RIDDLES: Mission2Riddle[] = [
  {
    id: 'riddle-1',
    clueText: 'Aku dibuat dari batang bambu pilihan, dapat kamu genggam dengan kedua tanganmu, dan berbunyi merdu saat digoyangkan. Apakah jenis warisan budayaku?',
    targetCategory: 'benda',
    options: [
      { id: 'opt-1a', label: 'Alat Musik Angklung', isCorrect: true, typeLabel: 'Warisan Budaya Benda' },
      { id: 'opt-1b', label: 'Lagu Daerah Bubuy Bulan', isCorrect: false, typeLabel: 'Warisan Budaya Takbenda' },
      { id: 'opt-1c', label: 'Tradisi Panen Padi', isCorrect: false, typeLabel: 'Warisan Budaya Takbenda' }
    ],
    explanation: 'Tepat sekali! Alat musik angklung adalah benda fisik padat yang dibuat dari bambu dan dapat disentuh langsung.'
  },
  {
    id: 'riddle-2',
    clueText: 'Aku dimainkan oleh seorang Dalang semalam suntuk di balik layar putih (kelir). Kamu dapat menikmati alur ceritanya dan mendengarkan suara gamelannya. Apakah jenis warisanku?',
    targetCategory: 'takbenda',
    options: [
      { id: 'opt-2a', label: 'Kotak Kayu Wayang', isCorrect: false, typeLabel: 'Warisan Budaya Benda' },
      { id: 'opt-2b', label: 'Seni Pertunjukan Wayang Kulit', isCorrect: true, typeLabel: 'Warisan Budaya Takbenda' },
      { id: 'opt-2c', label: 'Lampu Blencong Minyak', isCorrect: false, typeLabel: 'Warisan Budaya Benda' }
    ],
    explanation: 'Hebat! Pertunjukan wayang kulit adalah seni teater dan tradisi bertutur lisan, sehingga tergolong Warisan Budaya Takbenda.'
  },
  {
    id: 'riddle-3',
    clueText: 'Aku adalah keahlian jari jemari menorehkan cairan lilin panas menggunakan canting dengan penuh kesabaran dan penghayatan makna. Apakah jenis warisanku?',
    targetCategory: 'takbenda',
    options: [
      { id: 'opt-3a', label: 'Keahlian Membatik Tulis', isCorrect: true, typeLabel: 'Warisan Budaya Takbenda' },
      { id: 'opt-3b', label: 'Baju Kemeja Batik', isCorrect: false, typeLabel: 'Warisan Budaya Benda' },
      { id: 'opt-3c', label: 'Wajan Besi Kecil', isCorrect: false, typeLabel: 'Warisan Budaya Benda' }
    ],
    explanation: 'Benar! Keterampilan, teknik, dan pengetahuan membatik adalah kemampuan manusia yang diwariskan (Takbenda).'
  },
  {
    id: 'riddle-4',
    clueText: 'Aku adalah sehelai kain bermotif indah (seperti Mega Mendung atau Parang) yang dapat kamu lipat, sentuh serat halusnya, dan kenakan saat upacara bendera. Apakah jenis warisanku?',
    targetCategory: 'benda',
    options: [
      { id: 'opt-4a', label: 'Kain Batik Tradisional', isCorrect: true, typeLabel: 'Warisan Budaya Benda' },
      { id: 'opt-4b', label: 'Filosofi Motif Parang', isCorrect: false, typeLabel: 'Warisan Budaya Takbenda' },
      { id: 'opt-4c', label: 'Lagu Pengiring Batik', isCorrect: false, typeLabel: 'Warisan Budaya Takbenda' }
    ],
    explanation: 'Tepat! Kain batik adalah objek nyata berwujud lembaran kain kriya yang memiliki sifat fisik padat (Benda).'
  },
  {
    id: 'riddle-5',
    clueText: 'Aku adalah cerita rakyat yang dikisahkan turun-temurun oleh nenek moyang Sunda, menceritakan legenda asal-usul gunung berapi berbentuk perahu terbalik. Apakah jenis warisanku?',
    targetCategory: 'takbenda',
    options: [
      { id: 'opt-5a', label: 'Gunung Tangkuban Parahu', isCorrect: false, typeLabel: 'Warisan Alam (Bukan Budaya Manusia)' },
      { id: 'opt-5b', label: 'Cerita Rakyat Sangkuriang', isCorrect: true, typeLabel: 'Warisan Budaya Takbenda' },
      { id: 'opt-5c', label: 'Buku Cetak Dongeng Sekolah', isCorrect: false, typeLabel: 'Warisan Budaya Benda Modern' }
    ],
    explanation: 'Luar biasa! Cerita Sangkuriang adalah tradisi lisan dan sastra tutur yang diwariskan dari mulut ke mulut (Takbenda).'
  }
];

export const MISSION_2_LESSON_CONTENT = {
  benda: {
    title: 'Warisan Budaya Benda (Tangible)',
    subtitle: 'Warisan Berwujud Fisik & Dapat Disentuh',
    definition: 'Warisan Budaya Benda adalah peninggalan kebudayaan buatan manusia di masa lalu yang memiliki bentuk fisik nyata (material), dapat dilihat dengan mata kepala, dapat disentuh dengan tangan, serta dapat dipindahkan atau berupa bangunan tetap.',
    characteristics: [
      'Memiliki wujud fisik dan massa (dapat dipegang, diraba permukaannya, diukur dimensinya).',
      'Terdiri dari bangunan, candi, rumah adat, perkakas senjata, kriya kain, arca, atau naskah lontar.',
      'Dapat disimpan dalam museum, dilindungi sebagai cagar budaya di lokasi aslinya, atau dipakai langsung.'
    ],
    examples: [
      'Rumah Gadang (arsitektur kayu Sumatera Barat)',
      'Boneka Wayang Kulit (pahatan kulit kerbau)',
      'Alat Musik Angklung (bambu fisik)',
      'Kain Batik Tradisional (tekstil)',
      'Rumah Tongkonan (arsitektur Toraja)'
    ]
  },
  takbenda: {
    title: 'Warisan Budaya Takbenda (Intangible)',
    subtitle: 'Warisan Berupa Tradisi, Seni, & Nilai Luhur',
    definition: 'Warisan Budaya Takbenda adalah segala praktik, representasi, ekspresi, pengetahuan, atau keterampilan yang diakui oleh suatu masyarakat sebagai bagian dari warisan kebudayaan mereka, yang diwariskan dari generasi ke generasi.',
    characteristics: [
      'Tidak memiliki wujud benda mati permanen semata, melainkan berupa tindakan, keahlian, atau proses hidup.',
      'Meliputi tradisi lisan, seni pertunjukan, adat istiadat, ritual perayaan, dan kemahiran kriya tradisional.',
      'Terus dipelajari, dipraktikkan, dan dijaga agar tidak terlupakan di masa depan.'
    ],
    examples: [
      'Tari Saman (gerak dinamis dan tepuk irama Gayo)',
      'Cerita Rakyat Sangkuriang (sastra lisan Jawa Barat)',
      'Seni Pertunjukan Wayang Kulit (teater bayangan & keahlian dalang)',
      'Keahlian Membatik Tulis (teknik mencanting & makna filosofis)',
      'Pertunjukan Reog Ponorogo (seni panggung dan atraksi tari)'
    ]
  },
  dualAspect: {
    title: 'Satu Budaya, Bisa Memiliki Dua Aspek!',
    description: 'Banyak warisan kebudayaan Indonesia yang sangat istimewa karena memiliki dimensi Benda dan Takbenda sekaligus!',
    pairs: [
      {
        name: 'Angklung',
        benda: 'Alat musik bilah tabung bambu yang dibuat oleh perajin.',
        takbenda: 'Keahlian bermain harmoni bersama, nilai gotong royong, dan tradisi musik bambunya.'
      },
      {
        name: 'Batik',
        benda: 'Lembaran kain bermotif yang telah selesai diwarnai dan dapat dipakai.',
        takbenda: 'Kemahiran menggores canting dengan malam, pengetahuan ramuan warna, dan makna simbolik setiap motif.'
      },
      {
        name: 'Wayang Kulit',
        benda: 'Boneka wayang pipih berbahan kulit kerbau dengan tangkai tanduk dan sunggingan warna.',
        takbenda: 'Pertunjukan teater bayangan semalam suntuk, suara sastra tutur dalang, dan nilai filsafat budayanya.'
      }
    ]
  }
};
