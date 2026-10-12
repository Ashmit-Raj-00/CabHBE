// ─────────────────────────────────────────────────────────────────────────────
// EXPLORE — the "Explore the Region" page: heritage, tribal art, communities,
// nature and day trips around Gunupur.
//
// Edit the text between quotes. Images live in public/images/culture/.
// ─────────────────────────────────────────────────────────────────────────────

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
