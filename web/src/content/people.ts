// ─────────────────────────────────────────────────────────────────────────────
// PEOPLE — advisory panel and organizing committee (About page + home page).
//
// To add someone, copy an existing { ... } block, paste it where you want them
// to appear, and change the text. Photos go in public/images/advisors/ (or
// patrons/) — leave out `image` and an initials tile is shown instead.
// ─────────────────────────────────────────────────────────────────────────────

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
