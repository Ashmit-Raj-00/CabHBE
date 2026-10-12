export const event = {
  shortName: "CABHBE-26",
  fullName:
    "2nd International Conference on Advancement of Biotechnology in Healthcare, Bioproducts and Environmental Research",
  edition: "2nd International Conference",
  dates: "10 – 12 December 2026",
  startDate: "2026-12-10T00:00:00",
  venue: "GIET University, Gunupur, Odisha",
  venueFull: "GIET University, Gunupur, Odisha – 765022, India",
  organizer: "Department of Biotechnology, GIET University",
  associate: "DBT-BIRAC E-YUVA Center",
  submissionEmail: "conferencebiotech@giet.edu",
  website: "https://www.gietu.com/cabhbe-2026",
  conveners: [
    { role: "Convener", name: "Dr. Manoja Das", detail: "Associate Professor, Department of Biotechnology; Chief Coordinator, BIRAC E-YUVA Center, GIET University, Gunupur" },
    { role: "Co-Convener", name: "Dr. B. Rabi Prasad", detail: "Associate Professor & HoD, Department of Biotechnology, GIET University, Gunupur" },
  ],
  whatsapp: ["+91 94377 71065", "+91 94374 39725"],
};

export const campusLocation = {
  latitude: 19.04861,
  longitude: 83.83306,
  mapsUrl: "https://www.google.com/maps?q=19.04861,83.83306",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=19.04861,83.83306",
  embedUrl: "https://www.google.com/maps?q=19.04861,83.83306&z=16&output=embed",
};

export const campusGallery = [
  { src: "/images/venue/auditorium-stage.jpg", alt: "Mega auditorium with stage and screen, red seating", caption: "Mega Auditorium — Main Stage" },
  { src: "/images/venue/auditorium-podium.jpg", alt: "Mega auditorium seating viewed from the podium", caption: "Mega Auditorium — Seating" },
  { src: "/images/venue/school-of-sciences.webp", alt: "School of Sciences building, yellow facade", caption: "School of Sciences" },
  { src: "/images/venue/academic-block.jpg", alt: "Academic block surrounded by flowering trees", caption: "Academic Block" },
  { src: "/images/venue/research-center.jpg", alt: "Research and Innovation Center building", caption: "Research & Innovation Center" },
  { src: "/images/venue/hostel-block.jpg", alt: "Aerial view of the student hostel block with hills in the background", caption: "Student Hostel Block" },
  { src: "/images/venue/academic-block-aerial.jpg", alt: "Aerial view of an academic building with hills in the background", caption: "Academic Block — Aerial View" },
  { src: "/images/venue/campus-temple.webp", alt: "Campus temple and gardens at sunset", caption: "Campus Temple & Gardens" },
  { src: "/images/venue/swimming-pool.jpeg", alt: "Students playing in the campus swimming pool", caption: "Swimming Pool" },
  { src: "/images/venue/expo-2018.jpg", alt: "Large EXPO 2018 lettering display outside a campus building", caption: "Campus Expo" },
  { src: "/images/venue/mba-department.jpg", alt: "MBA Department building with hills in the background", caption: "MBA Department" },
];

export const themes = [
  {
    slug: "healthcare",
    title: "Healthcare & Biomedical Technologies",
    short: "Healthcare & Biomedical",
    description:
      "Advances in diagnostics, therapeutics and biomedical innovation for human health.",
    image: "/images/themes/healthcare.webp",
    alt: "Researcher examining a sample under a microscope in a laboratory",
  },
  {
    slug: "agriculture",
    title: "Sustainable Agriculture",
    short: "Sustainable Agriculture",
    description:
      "Biotechnological solutions for resilient crops, soil health and food security.",
    image: "/images/themes/agriculture.webp",
    alt: "Grower harvesting spring onions among leafy crops inside a polytunnel",
  },
  {
    slug: "environmental",
    title: "Environmental Biotechnology",
    short: "Environmental Biotech",
    description:
      "Bioremediation, waste valorisation and technologies for a cleaner environment.",
    image: "/images/themes/environmental.webp",
    alt: "Gloved hand pipetting into a test tube holding a green plant cutting",
  },
];

export const importantDates = [
  { label: "Last date for Abstract Submission", date: "15 November 2026" },
  { label: "Notification of Acceptance", date: "20 November 2026" },
  { label: "Submission of Full Paper", date: "30 November 2026" },
  { label: "Last date for Early-Bird Registration", date: "30 November 2026" },
  { label: "Spot Registration", date: "Available at the venue" },
];

/** Early-bird fees apply through the end of this day. */
export const earlyBirdDeadline = { label: "30 November 2026", short: "30 Nov 2026", iso: "2026-11-30T23:59:59" };

export type FeeTier = {
  category: string;
  before: string;
  after: string;
  currency: "INR" | "USD";
};

export const feeTiers: FeeTier[] = [
  { category: "Academicians / Delegates", before: "2,500", after: "3,000", currency: "INR" },
  { category: "Research Scholar (Ph.D. / M.Tech. / M.Sc.)", before: "1,500", after: "2,000", currency: "INR" },
  { category: "Industry / R&D / Startup Organizations", before: "4,000", after: "5,000", currency: "INR" },
  { category: "Foreign Delegates", before: "300", after: "350", currency: "USD" },
  { category: "Members from Nepal, Bhutan, Sri Lanka and Bangladesh", before: "100", after: "150", currency: "USD" },
  { category: "Student (B.Tech. / B.Sc. / M.Sc. / M.Tech. / BE / Diploma)", before: "1,000", after: "1,200", currency: "INR" },
];

export const registrationCategories = feeTiers.map((f) => f.category);

export const submissionGuidelines = [
  "Submissions in the form of abstracts, short papers and full manuscripts are welcomed.",
  "Abstract should be between 250–300 words, Arial font, 12 pt, with single line spacing. Title should be in 14 pt Arial, bold.",
  "Author's names, affiliation, complete address (including email) are required, Arial font 12 pt.",
  "Underline the name of the presenting author.",
  "Abstracts should be sent by email to the Convener, Organizing Committee (conferencebiotech@giet.edu).",
  "All submitted papers will be peer-reviewed, and the selected full papers shall be published in the conference proceedings.",
  "It is the responsibility of the corresponding author to confirm that the work has not been presented or published earlier.",
  "Only registered participants are permitted to present.",
  "Dimensions of posters should not exceed 4 ft × 3 ft.",
];

export const bankDetails = {
  bankName: "State Bank of India",
  branch: "GIET University Campus",
  ifsc: "SBIN0017769",
  accountName: "Gandhi Institute of Engineering Technology",
  accountNumber: "38307594449",
};

export const conferenceAudience = [
  "Academic scientists",
  "Faculty members",
  "Research scholars",
  "Healthcare professionals",
  "Technologists",
  "Entrepreneurs & innovators",
  "Policymakers",
  "Environmental scientists",
  "Government representatives",
  "Students",
];

export const university = {
  stats: [
    { value: "2018", label: "Established by State Act" },
    { value: "~6,000", label: "Students on campus" },
    { value: "11,000+", label: "Graduates to date" },
    { value: "113", label: "Acre campus" },
  ],
  accreditations: ["UGC Recognized", "AICTE Approved", "NBA", "NAAC", "ICAR", "DSIR"],
  programs: [
    {
      level: "B.Tech — 13 programs",
      list: "Biotechnology, CSE, ECE, AME, EE, EEE, Mechanical, Civil and Chemical",
    },
    { level: "B.Sc.", list: "Agriculture, Nursing, Pharmacy and Physiotherapy" },
    {
      level: "M.Sc.",
      list: "Agriculture, Biotechnology, Chemistry, Physics, Mathematics and Life Sciences",
    },
    { level: "Research & professional", list: "M.Tech, MBA and Ph.D. across major disciplines" },
  ],
  innovation: [
    {
      name: "BIRAC E-YUVA Pre-incubation Centre",
      note: "Biotechnology pre-incubation, supported by BIRAC, Government of India",
    },
    { name: "ACIC GIET Incubator", note: "Supported by NITI Aayog" },
    { name: "IncubateX Innovations", note: "Innovation and incubation initiative" },
    {
      name: "MSME-supported IPFC",
      note: "GIETU also serves as a host institute for MSME-IDE programmes",
    },
  ],
};

export type Advisor = {
  name: string;
  detail: string;
  country: string;
  /** Portrait at /images/advisors/…; falls back to an initials tile when absent. */
  image?: string;
  /** Shown in the hover panel over the portrait. */
  bio?: string;
};

export const advisoryPanel: Advisor[] = [
  {
    name: "Dr. Sudhanshu Vrati",
    detail: "J C Bose National Fellow, Ex Director RCB, New Delhi",
    country: "India",
    image: "/images/advisors/vrati.webp",
    bio: "Molecular virologist and founding Executive Director of the Regional Centre for Biotechnology (2016–2023), where he is now Professor. His lab studies RNA virus replication — particularly Japanese encephalitis virus — and the development of viral vaccine candidates.",
  },
  {
    name: "Prof. Misri Gozan",
    detail: "Dept. of Chemical Engineering, Universitas Indonesia",
    country: "Indonesia",
    image: "/images/advisors/misri-gozan.webp",
  },
  {
    name: "Dr. Upendra Kumar Singh",
    detail: "Distinguished Scientist & Director General, Soldier Support System, DRDO, New Delhi",
    country: "India",
    image: "/images/advisors/upendra-singh.webp",
    bio: "Distinguished Scientist and Director General of DRDO's Soldier Support System cluster — the group covering the life-sciences side of defence research, from physiology and nutrition to protective systems and biomedical technology for the armed forces.",
  },
  {
    name: "Prof. (Dr.) Amit Chattopadhyay",
    detail: "Assoc. Prof., Applied Mathematics & Data Science, NCI, Dublin",
    country: "Ireland",
    image: "/images/advisors/chattopadhyay.webp",
    bio: "Interdisciplinary mathematician and data modeller at National College of Ireland, previously a senior academic at Aston University, UK. He applies stochastic modelling and AI-driven applied mathematics to problems from cardiovascular risk to supply chains and e-waste.",
  },
  {
    name: "Prof. (Dr.) Ashok Kumar",
    detail: "Dept. of Biological Sciences and Bioengineering, IIT Kanpur",
    country: "India",
    image: "/images/advisors/ashok-kumar.webp",
    bio: "Lalit Mohan Kapoor Endowed Chair Professor of Bioengineering at IIT Kanpur. His group develops cryogel biomaterials and smart polymers for cartilage, bone, skin and neural tissue engineering, including a bioartificial liver support system under pre-clinical evaluation.",
  },
  {
    name: "Prof. (Dr.) Nguyen Duc Hoang",
    detail: "Assoc. Prof., University of Science, Vietnam National University Ho Chi Minh City",
    country: "Vietnam",
    image: "/images/advisors/nguyen-duc-hoang.webp",
    bio: "Associate Professor at the University of Science, VNU Ho Chi Minh City, where he directs its biotechnology centre. Trained in Germany (DSc, University of Bayreuth), he works on bacterial genetics — Bacillus subtilis expression systems and recombinant protein production.",
  },
  {
    name: "Prof. (Dr.) Syamal Roy",
    detail: "IICB Kolkata & Ex VC CPB University, West Bengal",
    country: "India",
    image: "/images/advisors/syamal-roy.webp",
    bio: "ICMR Emeritus Scientist at CSIR-IICB, Kolkata, with post-doctoral training in cellular immunology at MIT. Decades of work on the immunobiology of leishmaniasis (kala-azar), including antimony drug resistance and how the parasite subverts host immunity.",
  },
  {
    name: "Prof. (Dr.) Chowdhury Rafiqul Ahsan",
    detail: "Department of Microbiology, University of Dhaka",
    country: "Bangladesh",
    image: "/images/advisors/ahsan.webp",
    bio: "Professor of Microbiology at the University of Dhaka since 2003, with a PhD from Hirosaki University, Japan. He has published over 100 papers, supervised around 100 postgraduate researchers, and served as President of the Bangladesh Society for Microbiologists.",
  },
  {
    name: "Prof. (Dr.) Chi-Wei Lan (John)",
    detail: "Dept. of Chem. Eng. & Mat. Sci., Yuan Ze University",
    country: "Taiwan",
    image: "/images/advisors/chi-wei-lan.webp",
    bio: "Professor of Chemical Engineering and Materials Science at Yuan Ze University, Taiwan, where he leads the Biorefinery & Bioprocess Engineering Laboratory. His work spans biomass conversion, hydrogen production from waste, and extraction of bioactive compounds.",
  },
  {
    name: "Prof. (Dr.) Chirashree Ghosh",
    detail: "Department of Envt. Studies, University of Delhi, New Delhi",
    country: "India",
    image: "/images/advisors/chirashree-ghosh.webp",
    bio: "Professor of Environmental Studies at the University of Delhi, working on environmental pollution and health. Her research covers bioaerosols and particulate matter, indoor air quality and its respiratory impacts, and urban climate mitigation.",
  },

];


export type CommitteeGroup = {
  title: string;
  members: { name: string; role?: string; image?: string; bio?: string }[];
};

export const committee: CommitteeGroup[] = [
  {
    title: "Chief Patrons",
    members: [
      { name: "Prof. (Dr.) Satya Prakash Panda", role: "President, GIET University, Gunupur" },
      { name: "Prof. (Dr.) Chandra Dhwaj Panda", role: "Vice President, GIET University, Gunupur" },
      { name: "Prof. (Dr.) Jagadish Panda", role: "Director General, GIET University, Gunupur" },
    ],
  },
  {
    title: "Conference Chair",
    members: [{ name: "Prof. (Dr.) Goutam Ghosh", role: "Vice Chancellor, GIET University" }],
  },
  {
    title: "Patrons",
    members: [
      { name: "Prof. (Dr.) N. V. J. Rao", role: "Registrar, GIET University, Gunupur", image: "/images/patrons/nvj-rao.webp" },
      { name: "Prof. (Dr.) A. V. N. L. Sharma", role: "Pro VC, Material Science, GIET University", image: "/images/patrons/avnl-sharma.webp" },
      { name: "Prof. (Dr.) Balakrushna Tripathy", role: "Pro VC, Computer Science, GIET University", image: "/images/patrons/bk-tripathy.webp" },
    ],
  },
  {
    title: "Convener & Co-Convener",
    members: [
      { name: "Dr. Manoja Das", role: "Convener — Associate Professor, Dept. of Biotechnology; Chief Coordinator, BIRAC E-YUVA Center" },
      { name: "Dr. B. Rabi Prasad", role: "Co-Convener — Associate Prof. & HoD, Dept. of Biotechnology" },
    ],
  },
  {
    title: "Organizing Secretary",
    members: [{ name: "Dr. Sudipta Maity", role: "Organizing Secretary — Coordinator, DBT-BIRAC E-YUVA Centre" }],
  },
  {
    title: "Organizing Committee",
    members: [
      { name: "Dr. Namita Panigrahi", role: "Asst. Prof., School of Science" },
      { name: "Dr. Y. Aparna", role: "Ast. Prof., Dept. of Biotechnology" },
      { name: "Mrs. Ghanistha Prusty", role: "Asst. Prof., Dept. of Life Science" },
      { name: "Dr. Jitendra Kumar Sahoo", role: "Assistant Prof., Dept. of Chemistry" },
      { name: "Dr. N. Jagannatham", role: "Assistant Prof., Dept. of Mathematics" },
      { name: "Dr. Hari Shankar Mohanty", role: "Assistant Prof., Dept. of Physics" },
      { name: "Ms. Anjali Panigrahi", role: "Research Associate, Dept. of Biotechnology" },
      { name: "Mr. J. Santosh Kumar", role: "Ast. Prof., Dept. of Biotechnology" },
    ],
  },
  {
    title: "Conference Advisory Committee",
    members: advisoryPanel.map((a) => ({
      name: a.name,
      role: `${a.detail}, ${a.country}`,
      image: a.image,
      bio: a.bio,
    })),
  },
];

export const trustBadges = [
  "NAAC Accredited",
  "AICTE Approved",
  "UGC Recognized",
  "DBT-BIRAC E-YUVA Center",
  "Peer-Reviewed Proceedings",
];

export const accommodation = {
  onCampus: "Delegates can stay in the university's student hostel blocks, made available at ₹600 to ₹800 per day on a first-come-first-served basis. Simple, comfortable rooms, right on campus.",
  offCampus: "Participants may also opt for hotel accommodation in Gunupur (low budget: ₹1,000 – ₹1,200 per day) — contact the Organizing Secretary to arrange it.",
};

export const heritageHighlights = [
  "Home to 50+ Tribal Communities",
  "Sacred Niyamgiri Hills",
  "World-Renowned Soura Art",
  "GI-Tagged Niyamgiri Turmeric",
  "Eastern Ghats Biodiversity",
  "Rich Tribal Heritage",
  "Unique Flora & Fauna",
  "Famous Tumba Craft",
  "Ancient Tribal Traditions",
  "Untouched Natural Beauty",
];

export type ArtForm = {
  slug: string;
  name: string;
  community: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  facts: { label: string; value: string }[];
};

export const artForms: ArtForm[] = [
  {
    slug: "idital",
    name: "Idital",
    community: "Lanjia Saura",
    tagline: "Wall painting as prayer",
    description:
      "An idital is not decoration. Painted in white rice paste on an earth-red wall, it is commissioned through a shaman to heal an illness, honour the dead or thank a harvest — then left to weather away.",
    image: "/images/culture/saura-wall-painting.webp",
    alt: "Saura idital wall painting in white on a terracotta mud wall, showing rows of figures, animals and a tree inside a woven border, with two clay pots hanging in front",
    facts: [
      { label: "Made with", value: "Rice paste on ochre-washed mud wall" },
      { label: "Motifs", value: "Stick figures, horses, sun and moon, tree of life" },
      { label: "Recognition", value: "GI-tagged tribal art of Odisha" },
      { label: "See it near", value: "Saura villages around Puttasingi" },
    ],
  },
  {
    slug: "kapdaganda",
    name: "Kapdaganda",
    community: "Dongria Kondh",
    tagline: "The hills, embroidered",
    description:
      "Unmarried Dongria girls embroider these coarse cotton shawls by hand in green, yellow and red. The rows of triangles are Niyamgiri itself; the finished shawl is given to a brother or a beloved.",
    image: "/images/culture/kapdaganda-shawl.webp",
    alt: "Close-up of a Dongria Kondh kapdaganda shawl — bands of red, orange and green triangles hand-embroidered on coarse cream cotton",
    facts: [
      { label: "Made with", value: "Hand embroidery on handwoven cotton" },
      { label: "Motifs", value: "Triangles for hills, lines for streams" },
      { label: "Recognition", value: "GI-tagged craft" },
      { label: "See it near", value: "Niyamgiri slopes and weekly haats" },
    ],
  },
  {
    slug: "tumba",
    name: "Tumba",
    community: "Kondh & Saura households",
    tagline: "A gourd treated as a canvas",
    description:
      "A bottle gourd, dried and hollowed, becomes a water flask, a seed store, a measure. The surface is scored and burnt into bands of dots, triangles and zigzags — an everyday object given a maker's signature.",
    image: "/images/culture/tumba-gourd-lamp.webp",
    alt: "A dried bottle gourd worked into a hanging lamp, its surface pierced with concentric rings and floral dot patterns",
    facts: [
      { label: "Made with", value: "Dried bottle gourd, burnt and etched line work" },
      { label: "Used as", value: "Water, seed and liquor vessels; now lamps and décor" },
      { label: "Motifs", value: "Dot bands, chevrons, concentric arcs" },
      { label: "See it near", value: "Village markets across Rayagada" },
    ],
  },
  {
    slug: "adornment",
    name: "Beadwork & Brass",
    community: "Dongria Kondh",
    tagline: "Identity, worn",
    description:
      "A Dongria woman's adornment is readable: brass neck rings, layered strands of glass beads, and a crown of hairpins that doubles as a working comb. Pieces are gathered one at a time, never bought as a set.",
    image: "/images/culture/dongria-adornment.webp",
    alt: "Portrait of a tribal woman wearing stacked neck rings, layered bead necklaces, twin nose rings and a row of hairpins",
    facts: [
      { label: "Made with", value: "Brass, aluminium and glass beads" },
      { label: "Meaning", value: "Marks age, kinship and marital status" },
      { label: "Worn", value: "Daily — not only for festivals" },
      { label: "See it near", value: "Chatikona and Bisamcuttack markets" },
    ],
  },
];

export const craftInUse = [
  {
    image: "/images/culture/tumba-gourds-drying.webp",
    alt: "A woman seated on the ground behind heaps of dried bottle gourds of many shapes, outside a village house",
    caption: "Gourds drying before they are cut",
    note: "Every flask starts as a season's crop, sorted by shape for what it will become.",
  },
  {
    image: "/images/culture/gourd-instrument.webp",
    alt: "A tribal woman in bead necklaces and heavy metal neck rings playing a long wind instrument made from a gourd",
    caption: "The gourd as an instrument",
    note: "The same plant gives the vessel, the lamp and the horn played at village festivals.",
  },
  {
    image: "/images/culture/saura-motif-textile.webp",
    alt: "Cream handloom textile printed with rows of Saura-style figures, animals and coloured triangular bunting along the border",
    caption: "Saura motifs on handloom",
    note: "Wall figures have moved onto cloth, keeping weavers and painters working together.",
  },
];

export type Community = {
  name: string;
  language: string;
  where: string;
  known: string;
};

export const communities: Community[] = [
  {
    name: "Dongria Kondh",
    language: "Kuvi",
    where: "Niyamgiri slopes, Rayagada & Kalahandi",
    known: "Hill horticulturists who raise pineapple, jackfruit, orange, ginger and turmeric in forest gardens. Their village-referendum defence of Niyamgiri against bauxite mining is known worldwide.",
  },
  {
    name: "Lanjia Saura",
    language: "Sora",
    where: "Uplands around Gunupur & Gajapati",
    known: "Among the oldest communities recorded in Indian texts. Masters of terraced hill cultivation, and the painters of idital murals made by shaman-artists rather than for sale.",
  },
  {
    name: "Kutia Kondh",
    language: "Kui",
    where: "Belghar and the Kalahandi uplands",
    known: "Millet farmers working steep slopes, with a rich oral tradition of origin songs. Older women carry distinctive facial tattoos marking lineage and passage into adulthood.",
  },
  {
    name: "Paraja, Jhodia & others",
    language: "Desia Odia, Kui and more",
    where: "Across Rayagada and Koraput",
    known: "Odisha is home to 62 Scheduled Tribes — 13 of them classed as Particularly Vulnerable Tribal Groups — more than any other state in India.",
  },
];

export const natureNotes = [
  {
    title: "The Eastern Ghats",
    body: "An older, broken hill system that predates the Himalaya, holding sal, bamboo and pockets of semi-evergreen forest.",
  },
  {
    title: "Niyamgiri",
    body: "A range rising above 1,500 m whose perennial streams feed the Vamsadhara and Nagavali rivers running past Gunupur.",
  },
  {
    title: "Hill gardens",
    body: "Dongria plots interplant pineapple, jackfruit, orange, ginger and turmeric under forest canopy — farming without clearing.",
  },
  {
    title: "Wildlife",
    body: "Elephant herds, sloth bear, leopard, giant squirrel and hornbills are recorded across the range's forest belts.",
  },
];

export type DayTrip = {
  place: string;
  distance: string;
  time: string;
  note: string;
};

export const dayTrips: DayTrip[] = [
  { place: "Vamsadhara riverfront, Gunupur", distance: "~5 km", time: "15 min", note: "Evening walk by the river the town grew around" },
  { place: "Puttasingi & the Saura uplands", distance: "~40 km", time: "~1.5 hrs", note: "Terraced hillsides and painted village walls" },
  { place: "Rayagada & Majhighariani Temple", distance: "~65 km", time: "~1.5 hrs", note: "District town, temple and craft shops" },
  { place: "Bisamcuttack & Niyamgiri foothills", distance: "~80 km", time: "~2 hrs", note: "The gateway to the Dongria hills" },
  { place: "Chatikona haat & waterfall", distance: "~95 km", time: "~2.5 hrs", note: "Weekly market where the hills come down to trade" },
  { place: "Chandragiri Tibetan settlement", distance: "~100 km", time: "~3 hrs", note: "Monastery and momo stalls in the Gajapati hills" },
  { place: "Taptapani hot springs", distance: "~140 km", time: "~3.5 hrs", note: "Sulphur springs in a forest reserve" },
  { place: "Deomali, Odisha's highest peak", distance: "~210 km", time: "~5 hrs", note: "A full day out — best as an overnight" },
];

export const visitingNotes = [
  "Ask before photographing anyone. A weekly haat is a workplace, not a backdrop.",
  "Buy directly from makers where you can, and pay the price asked without bargaining it down.",
  "Hilltops, groves and stones are living shrines. Go with someone local who can tell you where not to walk.",
  "Please don't hand sweets, pens or money to children — it turns a village into a stop on a route.",
  "A few areas need prior permission. Plan any trip beyond the town through the Organizing Secretary.",
];
