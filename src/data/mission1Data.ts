import { Mission1CardItem, Mission1Challenge } from '../types';

export const MISSION_1_ITEMS: Mission1CardItem[] = [
  {
    id: 'm1-tari-saman',
    name: 'Tari Saman',
    region: 'Aceh',
    island: 'Pulau Sumatera',
    coordinates: { x: 12, y: 20 },
    category: 'Seni Pertunjukan',
    image: '/src/assets/images/card_tari_saman_1793969894457.jpg',
    shortDescription: 'Tari Saman dibawakan secara berkelompok dengan tepukan tangan dan gerakan badan yang serempak. Tarian ini berasal dari masyarakat Gayo di Aceh. Tari Saman mengajarkan nilai kekompakan dan kebersamaan.',
    functionUse: 'Sebagai media dakwah kebaikan, sarana penyambutan tamu kehormatan kenegaraan, serta perayaan hari-hari besar masyarakat Aceh.',
    culturalValue: 'Mencerminkan nilai kepatuhan, kekompakan, kerja sama tim yang sempurna, serta persaudaraan tulus tanpa memandang perbedaan derajat.',
    funFact: 'Tari Saman tidak diiringi alat musik apa pun! Musiknya tercipta murni dari tepukan tangan, dada, paha para penari, dan lantunan syair merdu. Diakui UNESCO sejak 2011.',
    sourceRef: 'Direktorat Warisan dan Diplomasi Budaya Kemendikbudristek RI & UNESCO Intangible Cultural Heritage (2011)',
    clue: 'Aku adalah tarian dari masyarakat Gayo di Aceh yang dilakukan secara berkelompok dengan gerakan serempak.'
  },
  {
    id: 'm1-rumah-gadang',
    name: 'Rumah Gadang',
    region: 'Sumatera Barat',
    island: 'Pulau Sumatera',
    coordinates: { x: 19, y: 46 },
    category: 'Rumah Adat',
    image: '/assets/aistudio/Golden-Hour_Minangkabau_Village_Adventure_9a58bc89.png',
    shortDescription: 'Rumah Gadang adalah rumah adat masyarakat Minangkabau dengan atap melengkung ke atas yang disebut gonjong. Rumah ini memiliki fungsi sosial dan adat bagi keluarga serta masyarakat Minangkabau. Bentuk dan penggunaannya berkaitan dengan nilai kebersamaan dan kehidupan adat.',
    functionUse: 'Sebagai tempat tinggal keluarga besar matrilineal, musyawarah adat keluarga, dan tempat pelaksanaan upacara sakral adat Minangkabau.',
    culturalValue: 'Melambangkan keselarasan hidup dengan alam, keagungan musyawarah mufakat, serta penghormatan tinggi kepada peran kaum perempuan.',
    funFact: 'Tiang-tiang kayunya bertumpu di atas batu ceper tanpa paku besi! Konstruksi lentur ini membuatnya tahan terhadap guncangan gempa bumi.',
    sourceRef: 'Buku IPAS Kelas V Kurikulum Merdeka & Balai Pelestarian Kebudayaan Wilayah III Sumatera Barat',
    clue: 'Aku adalah rumah adat Minangkabau dengan atap melengkung ke atas yang disebut gonjong.'
  },
  {
    id: 'm1-cerita-sangkuriang',
    name: 'Cerita Rakyat Sangkuriang',
    region: 'Jawa Barat',
    island: 'Pulau Jawa',
    coordinates: { x: 29, y: 70 },
    category: 'Cerita Rakyat',
    image: '/src/assets/images/card_cerita_sangkuriang_1793970869779.jpg',
    shortDescription: 'Sangkuriang adalah cerita rakyat atau legenda masyarakat Sunda dari Jawa Barat. Cerita ini berkaitan dengan legenda asal-usul Gunung Tangkuban Parahu dan diwariskan dari generasi ke generasi. Cerita ini dapat menjadi bahan refleksi tentang hubungan keluarga dan pengendalian diri.',
    functionUse: 'Sebagai tradisi lisan pengantar tidur, media pembelajaran moral di sekolah dan keluarga, serta warisan sastra daerah Sunda.',
    culturalValue: 'Mengajarkan pentingnya kejujuran, rasa hormat kepada orang tua, pengendalian emosi, dan kepatuhan pada nilai moral masyarakat.',
    funFact: 'Nama Gunung Tangkuban Parahu berarti "perahu yang tertelungkup", sesuai akhir cerita ketika perahu besar buatan Sangkuriang ditendang hingga terbalik!',
    sourceRef: 'Balai Bahasa Provinsi Jawa Barat & Warisan Budaya Takbenda (WBTb) Kemendikbudristek',
    clue: 'Aku adalah cerita rakyat masyarakat Sunda dari Jawa Barat yang mengisahkan asal-usul Gunung Tangkuban Parahu.'
  },
  {
    id: 'm1-angklung',
    name: 'Angklung',
    region: 'Jawa Barat',
    island: 'Pulau Jawa',
    coordinates: { x: 34, y: 78 },
    category: 'Alat Musik',
    image: '/src/assets/images/mission_aksi_bermakna_1793969036434.jpg',
    shortDescription: 'Angklung adalah alat musik tradisional dari bambu yang dibunyikan dengan cara digoyangkan. Alat musik ini berkaitan erat dengan masyarakat Sunda di Jawa Barat. Setiap angklung menghasilkan nada tertentu sehingga permainan bersama membutuhkan kekompakan.',
    functionUse: 'Dahulu dibunyikan untuk upacara panen padi menghormati Dewi Sri, kini dimainkan bersama dalam orkestra musik pendidikan sekolah.',
    culturalValue: 'Mengajarkan gotong royong dan toleransi—karena setiap angklung hanya memegang satu nada, lagu yang indah hanya tercipta jika semua orang saling bekerja sama.',
    funFact: 'Pernah memecahkan rekor dunia Guinness World Records dengan 15.000 peserta serentak memainkan angklung di Jakarta! Diakui UNESCO sejak 2010.',
    sourceRef: 'UNESCO Representative List of the Intangible Cultural Heritage of Humanity (2010)',
    clue: 'Aku adalah alat musik dari bambu yang dimainkan dengan cara digoyangkan.'
  },
  {
    id: 'm1-wayang-kulit',
    name: 'Wayang Kulit',
    region: 'Jawa Tengah',
    island: 'Pulau Jawa',
    coordinates: { x: 39, y: 72 },
    category: 'Seni Pertunjukan',
    image: '/src/assets/images/pertunjukan_wayang_kulit_1793973887214.jpg',
    shortDescription: 'Wayang kulit merupakan seni pertunjukan yang menggunakan boneka pipih dari kulit dan dimainkan oleh seorang dalang. Pertunjukan ini biasanya diiringi musik gamelan dan menyampaikan berbagai cerita serta pesan kehidupan. Pengetahuan dan keterampilan dalam pertunjukan wayang diwariskan dari generasi ke generasi.',
    functionUse: 'Media pendidikan budi pekerti, hiburan rakyat dalam perayaan desa, pelestarian cerita epos Nusantara, dan upacara ruwatan keselamatan.',
    culturalValue: 'Mengajarkan perjuangan antara kebaikan melawan kejahatan, kearifan memimpin, dan falsafah hidup berbudi luhur.',
    funFact: 'Seorang dalang sanggup mendongeng semalam suntuk (8 jam) tanpa henti dengan membawakan lebih dari 30 karakter suara yang berbeda! Diakui UNESCO sejak 2003.',
    sourceRef: 'UNESCO Masterpiece of the Oral and Intangible Heritage of Humanity (2003)',
    clue: 'Aku adalah seni pertunjukan boneka pipih dari kulit yang dimainkan oleh seorang dalang dengan iringan gamelan.'
  },
  {
    id: 'm1-batik',
    name: 'Batik',
    region: 'Jawa Tengah',
    island: 'Pulau Jawa',
    coordinates: { x: 44, y: 78 },
    category: 'Kain Tradisional',
    image: '/src/assets/images/card_batik_jawa_1793970870335.jpg',
    shortDescription: 'Batik merupakan kain bermotif yang dibuat melalui proses perintangan warna menggunakan malam atau lilin. Motif batik memiliki beragam bentuk dan dapat berkaitan dengan nilai serta tradisi masyarakat pembuatnya. Pengetahuan dan keterampilan membatik diwariskan melalui proses belajar dari generasi ke generasi.',
    functionUse: 'Sebagai busana adat upacara kenegaraan, pakaian harian kebanggaan, dan seragam sekolah yang melambangkan identitas nasional.',
    culturalValue: 'Mencerminkan ketekunan, ketelitian, kesabaran jiwa, serta doa dan harapan luhur yang tertuang dalam setiap goresan motifnya.',
    funFact: 'Batik Indonesia diakui UNESCO pada 2 Oktober 2009 sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi, yang kita peringati sebagai Hari Batik Nasional!',
    sourceRef: 'UNESCO Representative List of the Intangible Cultural Heritage of Humanity (2009) & Museum Batik Nasional',
    clue: 'Aku adalah kain bermotif yang dibuat melalui proses perintangan warna menggunakan malam atau lilin.'
  },
  {
    id: 'm1-reog-ponorogo',
    name: 'Reog Ponorogo',
    region: 'Jawa Timur',
    island: 'Pulau Jawa',
    coordinates: { x: 49, y: 74 },
    category: 'Seni Pertunjukan',
    image: '/src/assets/images/card_reog_ponorogo_1793970870101.jpg',
    shortDescription: 'Reog Ponorogo merupakan seni pertunjukan tradisional yang berasal dari Ponorogo, Jawa Timur. Salah satu ciri khasnya adalah Dadak Merak, yaitu properti pertunjukan besar berbentuk kepala singa yang dihiasi bulu merak, disertai unsur tari dan musik. Reog menjadi bagian penting dari identitas budaya masyarakat Ponorogo.',
    functionUse: 'Seni pertunjukan pesta rakyat, penyambutan tamu agung daerah, perayaan hari kemerdekaan, dan lambang kebanggaan masyarakat Ponorogo.',
    culturalValue: 'Melambangkan keberanian, ketangguhan fisik, kekompakan masyarakat, dan semangat kepahlawanan yang pantang menyerah.',
    funFact: 'Dadak Merak memiliki berat mencapai 50 kilogram, dan penarinya (Warok/Singobarong) mengangkat beban seberat itu hanya menggunakan kekuatan gigitan giginya!',
    sourceRef: 'Direktorat Perlindungan Kebudayaan Kemendikbudristek RI & Dinas Kebudayaan Pariwisata Pemuda dan Olahraga Kabupaten Ponorogo',
    clue: 'Aku adalah seni pertunjukan dari Ponorogo dengan ciri khas properti besar kepala singa berhias bulu merak yang disebut Dadak Merak.'
  },
  {
    id: 'm1-rumah-tongkonan',
    name: 'Rumah Tongkonan',
    region: 'Sulawesi Selatan',
    island: 'Pulau Sulawesi',
    coordinates: { x: 58, y: 53 },
    category: 'Rumah Adat',
    image: '/src/assets/images/rumah_tongkonan_toraja_1793972850640.jpg',
    shortDescription: 'Tongkonan adalah rumah adat masyarakat Toraja di Sulawesi Selatan dengan bentuk atap melengkung menyerupai perahu. Rumah ini memiliki fungsi sosial dan adat serta menjadi tempat berkumpul dan bermusyawarah keluarga. Tongkonan mencerminkan hubungan masyarakat Toraja dengan keluarga dan tradisinya.',
    functionUse: 'Pusat pertemuan rumpun keluarga besar adat Toraja, lumbung penyimpanan padi keluarga, dan lokasi pelaksanaan upacara adat Rambu Solo.',
    culturalValue: 'Menyatukan ikatan persaudaraan antargenerasi, menghormati jasa leluhur, serta melambangkan kepemimpinan yang adil dan berwibawa.',
    funFact: 'Di tiang utama depan rumah dipajang deretan tanduk kerbau bertumpuk. Semakin banyak tanduknya, semakin tinggi status upacara adat keluarga tersebut!',
    sourceRef: 'Balai Pelestarian Kebudayaan Wilayah XIX Sulawesi Selatan & Kementerian Pekerjaan Umum dan Perumahan Rakyat (PUPR)',
    clue: 'Aku adalah rumah adat masyarakat Toraja di Sulawesi Selatan dengan bentuk atap melengkung menyerupai perahu.'
  }
];

export const MISSION_1_CHALLENGES: Mission1Challenge[] = [
  {
    id: 'chal-1',
    targetCardId: 'm1-tari-saman',
    clueText: 'Aku adalah tarian dari masyarakat Gayo di Aceh yang dilakukan secara berkelompok dengan gerakan serempak.',
    hintText: 'Petunjuk: Lihat pulau Sumatera bagian paling utara (Aceh). Tarian ini ditarikan sambil duduk bersimpuh rapi!',
    correctExplanation: 'Hebat! Tari Saman dari Aceh terkenal dengan tepukan tangan dan gerakan badan yang serempak serta mengajarkan kekompakan.'
  },
  {
    id: 'chal-2',
    targetCardId: 'm1-rumah-gadang',
    clueText: 'Aku adalah rumah adat Minangkabau dengan atap melengkung ke atas yang disebut gonjong.',
    hintText: 'Petunjuk: Lihat wilayah Sumatera Barat. Atapnya melengkung ke atas seperti tanduk kerbau!',
    correctExplanation: 'Tepat sekali! Rumah Gadang berasal dari Sumatera Barat dan atap gonjongnya melambangkan nilai kebersamaan adat Minangkabau.'
  },
  {
    id: 'chal-3',
    targetCardId: 'm1-cerita-sangkuriang',
    clueText: 'Aku adalah cerita rakyat masyarakat Sunda dari Jawa Barat yang mengisahkan asal-usul Gunung Tangkuban Parahu.',
    hintText: 'Petunjuk: Cari di bagian barat pulau Jawa. Cerita ini diwariskan dari generasi ke generasi tentang perahu tertelungkup!',
    correctExplanation: 'Luar biasa! Cerita Sangkuriang adalah legenda asal-usul Gunung Tangkuban Parahu yang menjadi bahan refleksi keluarga.'
  },
  {
    id: 'chal-4',
    targetCardId: 'm1-angklung',
    clueText: 'Aku adalah alat musik dari bambu yang dimainkan dengan cara digoyangkan.',
    hintText: 'Petunjuk: Periksa wilayah Jawa Barat. Alat musik bambu ini membutuhkan kekompakan banyak orang untuk menghasilkan melodi indah!',
    correctExplanation: 'Keren! Angklung adalah alat musik bambu khas Sunda Jawa Barat yang telah diakui UNESCO.'
  },
  {
    id: 'chal-5',
    targetCardId: 'm1-wayang-kulit',
    clueText: 'Aku adalah seni pertunjukan yang menggunakan boneka pipih dari kulit dan dimainkan oleh seorang dalang.',
    hintText: 'Petunjuk: Cari di wilayah Jawa Tengah. Pertunjukan ini diiringi musik gamelan dan menyampaikan pesan kehidupan!',
    correctExplanation: 'Mantap! Wayang Kulit dimainkan dalang di balik kelir dan mengajarkan nilai budi pekerti luhur.'
  },
  {
    id: 'chal-6',
    targetCardId: 'm1-batik',
    clueText: 'Aku adalah kain bermotif yang dibuat melalui proses perintangan warna menggunakan malam atau lilin.',
    hintText: 'Petunjuk: Cari di Jawa Tengah. Keterampilan membuat kain bermotif ini telah diwariskan turun-temurun!',
    correctExplanation: 'Benar! Batik adalah kain bermotif khas Indonesia yang proses pembuatannya menggunakan canting dan malam panas.'
  },
  {
    id: 'chal-7',
    targetCardId: 'm1-reog-ponorogo',
    clueText: 'Aku adalah seni pertunjukan dari Ponorogo dengan ciri khas properti pertunjukan besar berbentuk kepala singa berhias bulu merak (Dadak Merak).',
    hintText: 'Petunjuk: Cari di bagian timur pulau Jawa (Jawa Timur). Properti pertunjukannya sangat megah dan diangkat dengan gigi!',
    correctExplanation: 'Sempurna! Reog Ponorogo dari Jawa Timur memiliki properti Dadak Merak megah dan menjadi identitas budaya masyarakat Ponorogo.'
  },
  {
    id: 'chal-8',
    targetCardId: 'm1-rumah-tongkonan',
    clueText: 'Aku adalah rumah adat masyarakat Toraja di Sulawesi Selatan dengan bentuk atap melengkung menyerupai perahu.',
    hintText: 'Petunjuk: Jelajahi pulau Sulawesi di Tana Toraja. Rumah ini menjadi tempat berkumpul dan bermusyawarah keluarga besar!',
    correctExplanation: 'Luar biasa! Tongkonan adalah rumah adat suku Toraja yang melambangkan ikatan kekeluargaan dan tradisi leluhur.'
  }
];
