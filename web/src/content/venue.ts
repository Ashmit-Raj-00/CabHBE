// ─────────────────────────────────────────────────────────────────────────────
// VENUE — map location, campus photo gallery, accommodation and university
// facts (Venue & Travel and About pages).
//
// Gallery photos live in public/images/venue/. To add one, copy a { src, alt,
// caption } line and point `src` at the new file.
// ─────────────────────────────────────────────────────────────────────────────

// Accommodation rates — also used in the FAQ on the Contact page.
const hostelRate = "₹600 – ₹800";
const hotelRate = "₹1,000 – ₹1,200";

export const accommodation = {
  hostelRate,
  hotelRate,
  onCampus: `Delegates can stay in the university's student hostel blocks, made available at ${hostelRate} per day on a first-come-first-served basis. Simple, comfortable rooms, right on campus.`,
  offCampus: `Participants may also opt for hotel accommodation in Gunupur (low budget: ${hotelRate} per day) — contact the Organizing Secretary to arrange it.`,
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
