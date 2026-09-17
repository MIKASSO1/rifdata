// Layered Linguistic System for Morocco
// ============================================================
// PRIMARY LAYER  → 7 dialect zones color-coded as in the reference map.
// SECONDARY LAYER → each zone holds sub-accents (city / tribal nuance)
//                    with vocabulary, phonetic traits, and audio samples.
//
// Modular by design: adding a new sub-accent or zone updates the map,
// the modal, and the sidebar automatically — no layout changes needed.

import type { RegionId } from "./regions";

export type ZoneId =
  | "tachelhit"
  | "tamazight"
  | "tarifit"
  | "hassaniya"
  | "jebli"
  | "oriental-arabic"
  | "darija";

export interface SubAccent {
  id: string;
  name: string;
  territory: string;
  /** Distinctive lexical items. */
  vocabulary: { term: string; gloss: string }[];
  /** Phonetic / prosodic markers. */
  phonetics: string[];
  /** External audio sample URL (mp3). Placeholder allowed. */
  audioUrl?: string;
}

export interface DialectZone {
  id: ZoneId;
  name: string;
  nameAr: string;
  /** Reference-map colour. */
  color: string;
  /** Admin regions that visually carry this zone's colour. */
  regionIds: RegionId[];
  /** Short explanatory tagline. */
  tagline: string;
  /** Macro linguistic family. */
  family: "Amazigh" | "Arabic";
  subAccents: SubAccent[];
}

// --- Audio placeholders (royalty-free) -------------------------------------
const AUDIO = {
  a: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1718e295a4.mp3",
  b: "https://cdn.pixabay.com/download/audio/2022/10/30/audio_347111d654.mp3",
  c: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_d0c6ff1c6c.mp3",
  d: "https://cdn.pixabay.com/download/audio/2023/06/14/audio_45b8fbd6cb.mp3",
};

export const ZONES: DialectZone[] = [
  // 1) Tachelhit (Orange) — Souss / Western High Atlas / Anti-Atlas
  {
    id: "tachelhit",
    name: "Tachelhit",
    nameAr: "تاشلحيت",
    color: "#1e3a8a", // dark blue (Tachelhit)
    family: "Amazigh",
    regionIds: ["souss-massa", "marrakech-safi"],
    tagline: "Soussi Berber of the Anti-Atlas, Souss plain, and western High Atlas.",
    subAccents: [
      {
        id: "soussi-agadir",
        name: "Soussi (Agadir / Inezgane)",
        territory: "Souss plain · coastal Tachelhit",
        vocabulary: [
          { term: "manik", gloss: "how" },
          { term: "afulki", gloss: "beautiful" },
          { term: "tagant", gloss: "forest" },
        ],
        phonetics: [
          "Consonant-only words permitted (e.g. tkkst).",
          "Contrastive labialisation /kʷ/, /gʷ/.",
          "Iambic stress with rich gemination.",
        ],
        audioUrl: AUDIO.a,
      },
      {
        id: "tiznit-antiatlas",
        name: "Tiznit / Anti-Atlas",
        territory: "Anti-Atlas highlands",
        vocabulary: [
          { term: "tamazirt", gloss: "homeland / village" },
          { term: "argan", gloss: "argan (tree/oil)" },
        ],
        phonetics: [
          "Conservative pharyngeals.",
          "Clear vowel-length contrast.",
          "Slower amarg poetic cadence.",
        ],
        audioUrl: AUDIO.b,
      },
      {
        id: "haouz-tachelhit",
        name: "Haouz Tachelhit",
        territory: "Marrakech foothills · High Atlas",
        vocabulary: [
          { term: "adrar", gloss: "mountain" },
          { term: "asif", gloss: "river" },
        ],
        phonetics: [
          "Heavier spirantisation contact with Marrakchi Darija.",
          "Distinct High-Atlas tonal lift on vocatives.",
        ],
        audioUrl: AUDIO.c,
      },
    ],
  },

  // 2) Tamazight (Yellow) — Middle Atlas / Drâa-Tafilalet
  {
    id: "tamazight",
    name: "Tamazight",
    nameAr: "تامازيغت",
    color: "#fde68a", // soft yellow (Tamazight / Atlas)
    family: "Amazigh",
    regionIds: ["beni-mellal-khenifra", "draa-tafilalet"],
    tagline: "Central Atlas Tamazight — Zayane, Aït Atta, Aït Hadiddou.",
    subAccents: [
      {
        id: "zayane-khenifra",
        name: "Zayane (Khénifra)",
        territory: "Middle Atlas core",
        vocabulary: [
          { term: "ahidous", gloss: "communal group dance" },
          { term: "izlan", gloss: "improvised sung poetry" },
        ],
        phonetics: [
          "Affricates /ts/, /dz/.",
          "Phonemic gemination on tense consonants.",
          "Pitch contour distinguishes state vs. perfect.",
        ],
        audioUrl: AUDIO.d,
      },
      {
        id: "ait-atta-tafilalet",
        name: "Aït Atta (Tafilalet)",
        territory: "Pre-Saharan oases",
        vocabulary: [
          { term: "igherm", gloss: "fortified granary" },
          { term: "tighremt", gloss: "kasbah / tower-house" },
        ],
        phonetics: [
          "Archaic Berber phonemes preserved.",
          "Steady metrical chant prosody.",
          "/a/-fronting in Saharan vowel system.",
        ],
        audioUrl: AUDIO.a,
      },
    ],
  },

  // 3) Tarifit (Blue) — Northern Rif & Oriental
  {
    id: "tarifit",
    name: "Tarifit",
    nameAr: "تاريفيت",
    color: "#16a34a", // green (Tarifit)
    family: "Amazigh",
    regionIds: [], // overlay drawn over Oriental + TTH (see notes)
    tagline: "Riffian Berber — central Rif to the eastern Oriental.",
    subAccents: [
      {
        id: "alhoceima-waryaghar",
        name: "Al Hoceima · Aith Waryaghar",
        territory: "Central Rif",
        vocabulary: [
          { term: "azul", gloss: "hello" },
          { term: "tameṭṭuṭ", gloss: "woman" },
        ],
        phonetics: [
          "Tap /ɾ/ and syllabic /r̩/ pitch-accent.",
          "Spirantisation b→β, t→θ, d→ð.",
          "Reduced vowel system /a i u/.",
        ],
        audioUrl: AUDIO.a,
      },
      {
        id: "nador-iqariyyen",
        name: "Nador · Iqar'iyyen",
        territory: "Eastern Rif",
        vocabulary: [
          { term: "macca", gloss: "food" },
          { term: "thaddarth", gloss: "house" },
        ],
        phonetics: [
          "Palatalisation /k/→/tʃ/, /g/→/dʒ/.",
          "Spanish lexical contact preserved.",
        ],
        audioUrl: AUDIO.b,
      },
      {
        id: "driouch-aithtuzin",
        name: "Driouch · Aith Tuzin",
        territory: "Eastern Rif inland",
        vocabulary: [
          { term: "agellid", gloss: "king / chief" },
          { term: "iẓuran", gloss: "roots / ancestry" },
        ],
        phonetics: [
          "Sharp emphatic clause-final rise.",
          "Conservative consonant inventory.",
        ],
        audioUrl: AUDIO.c,
      },
    ],
  },

  // 4) Hassaniya (Light Yellow) — Saharan provinces
  {
    id: "hassaniya",
    name: "Hassaniya",
    nameAr: "الحسانية",
    color: "#ec4899", // pink (Hassaniya)
    family: "Arabic",
    regionIds: ["guelmim-oued-noun", "laayoune-saguia", "dakhla-oued-eddahab"],
    tagline: "Bedouin Arabic of the Beni Hassan — Tan-Tan to Lagouira.",
    subAccents: [
      {
        id: "guelmim-tantan",
        name: "Guelmim / Tan-Tan",
        territory: "Gateway to the Sahara",
        vocabulary: [
          { term: "lebla", gloss: "open desert" },
          { term: "khaima", gloss: "tent" },
        ],
        phonetics: [
          "Classical /q/ → /g/.",
          "Interdentals /θ ð/ retained.",
          "Long vowel realisation.",
        ],
        audioUrl: AUDIO.d,
      },
      {
        id: "laayoune-saguia",
        name: "Laâyoune · Sakia El Hamra",
        territory: "Saharan capital",
        vocabulary: [
          { term: "talaa", gloss: "epic / verse genre" },
          { term: "gaf", gloss: "short poetic form" },
        ],
        phonetics: [
          "Strong pharyngealisation.",
          "Rhythmic gemination, melismatic phrasing.",
        ],
        audioUrl: AUDIO.a,
      },
      {
        id: "dakhla-aousserd",
        name: "Dakhla / Aousserd",
        territory: "Atlantic Sahara",
        vocabulary: [
          { term: "nasab", gloss: "genealogy / lineage" },
          { term: "lebḥar", gloss: "the sea" },
        ],
        phonetics: [
          "Most archaic Beni Hassan substrate.",
          "Wide narrative pitch range.",
        ],
        audioUrl: AUDIO.b,
      },
    ],
  },

  // 5) Jebli (Light Green) — Western Rif foothills
  {
    id: "jebli",
    name: "Jebli (Mountain Arabic)",
    nameAr: "الدارجة الجبلية",
    color: "#bbf7d0", // pale green (Jebli mountain Arabic)
    family: "Arabic",
    regionIds: ["tanger-tetouan-alhoceima"],
    tagline: "Mountain Arabic of the western Rif — Tangier, Tétouan, Chefchaouen.",
    subAccents: [
      {
        id: "tangier-tetouan",
        name: "Tangier / Tétouan",
        territory: "Strait of Gibraltar urban Jebli",
        vocabulary: [
          { term: "wa hsen", gloss: "okay / fine" },
          { term: "halba", gloss: "a lot" },
        ],
        phonetics: [
          "Conservative /q/.",
          "Frequent imāla (/aː/→/eː/).",
          "Spirantisation b→β, t→θ.",
        ],
        audioUrl: AUDIO.c,
      },
      {
        id: "chefchaouen",
        name: "Chefchaouen",
        territory: "Blue mountain town · pure Jebli",
        vocabulary: [
          { term: "azṛu", gloss: "rock" },
          { term: "lḥuma", gloss: "neighbourhood" },
        ],
        phonetics: [
          "Marked sing-song lilt.",
          "Question rise on penultimate syllable.",
          "Soft pharyngeals.",
        ],
        audioUrl: AUDIO.d,
      },
      {
        id: "taounate",
        name: "Taounate / Ouazzane",
        territory: "Inner Rif foothills",
        vocabulary: [
          { term: "bezzaf", gloss: "very much" },
          { term: "shwiya", gloss: "a little" },
        ],
        phonetics: [
          "Gentle phrase-final lengthening.",
          "Sufi recitation cadence in Ouazzane.",
        ],
        audioUrl: AUDIO.a,
      },
    ],
  },

  // 6) Oriental Arabic (Dark Green) — Oujda plains
  {
    id: "oriental-arabic",
    name: "Oriental Arabic",
    nameAr: "دارجة الشرق",
    color: "#eab308", // yellow (Eastern Moroccan Arabic / Oujdi)
    family: "Arabic",
    regionIds: [], // overlaid on Oriental admin region (shared with Tarifit)
    tagline: "Oujdi Darija — eastern plains, Algerian-border continuum.",
    subAccents: [
      {
        id: "oujda",
        name: "Oujda",
        territory: "Eastern capital · Algerian frontier",
        vocabulary: [
          { term: "wesh", gloss: "what (Algerian-influenced)" },
          { term: "ḍṛuk", gloss: "now" },
        ],
        phonetics: [
          "/q/ preserved.",
          "Heavy Algerian-French lexical borrowing.",
          "Flatter intonation than Atlantic Darija.",
        ],
        audioUrl: AUDIO.b,
      },
      {
        id: "berkane",
        name: "Berkane / Beni Znassen",
        territory: "Eastern foothills",
        vocabulary: [
          { term: "lletshin", gloss: "oranges" },
          { term: "fellaḥ", gloss: "farmer" },
        ],
        phonetics: [
          "Bedouin-influenced rhythm.",
          "Emphatic stress on lexical roots.",
        ],
        audioUrl: AUDIO.c,
      },
    ],
  },

  // 7) Standard Darija (Green) — Atlantic urban koine
  {
    id: "darija",
    name: "Standard Darija",
    nameAr: "الدارجة المغربية",
    color: "#f5e6c8", // beige (Western Moroccan Arabic)
    family: "Arabic",
    regionIds: ["fes-meknes", "rabat-sale-kenitra", "casablanca-settat"],
    tagline: "Atlantic koine — Fès, Rabat, Casablanca, plus Marrakech & Abda nuances.",
    subAccents: [
      {
        id: "fassi",
        name: "Fassi (Fès)",
        territory: "Old urban Fès",
        vocabulary: [
          { term: "shwiya", gloss: "a little" },
          { term: "ʔaal", gloss: "he said (with glottal /q/→/ʔ/)" },
        ],
        phonetics: [
          "Iconic /q/→/ʔ/ glottal stop.",
          "Imāla preserved.",
          "Refined, almost legato delivery.",
        ],
        audioUrl: AUDIO.d,
      },
      {
        id: "rbati",
        name: "Rbati (Rabat-Salé)",
        territory: "Capital koine",
        vocabulary: [
          { term: "daba", gloss: "now" },
          { term: "safi", gloss: "enough / done" },
        ],
        phonetics: [
          "Reference accent for ASR.",
          "Rise on final syllable for questions.",
        ],
        audioUrl: AUDIO.a,
      },
      {
        id: "casawi",
        name: "Casawi (Casablanca)",
        territory: "Economic capital",
        vocabulary: [
          { term: "wakha", gloss: "okay" },
          { term: "zaama", gloss: "supposedly" },
        ],
        phonetics: [
          "Fast tempo, strong vowel reduction.",
          "Urban staccato rhythm.",
        ],
        audioUrl: AUDIO.b,
      },
      {
        id: "marrakchi",
        name: "Marrakchi (Marrakech)",
        territory: "Imperial south",
        vocabulary: [
          { term: "drari", gloss: "the kids / guys" },
          { term: "meskin", gloss: "poor / dear" },
        ],
        phonetics: [
          "Distinct sing-song lilt.",
          "Vocative lengthening.",
          "Halqa-storyteller cadence.",
        ],
        audioUrl: AUDIO.c,
      },
      {
        id: "abda-safi",
        name: "Abda / Safi",
        territory: "Atlantic coast — Doukkala-Abda continuum",
        vocabulary: [
          { term: "ʕiyyel", gloss: "child" },
          { term: "ḥuta", gloss: "fish" },
        ],
        phonetics: [
          "Rural Atlantic Darija — slower than Casawi.",
          "Conservative /q/.",
          "Maritime lexicon distinct from inland Marrakchi.",
        ],
        audioUrl: AUDIO.d,
      },
    ],
  },
];

/** Map: regionId → primary zone painted on that region. */
export const REGION_TO_ZONE: Record<string, ZoneId> = ZONES.reduce(
  (acc, z) => {
    z.regionIds.forEach((rid) => {
      acc[rid] = z.id;
    });
    return acc;
  },
  {} as Record<string, ZoneId>,
);

/** Overlay zones — drawn on top of base regions to honour the reference map. */
export const OVERLAY_ZONES: { zoneId: ZoneId; regionIds: RegionId[] }[] = [
  // Tarifit blue overlay across the northern Rif strip & eastern Oriental.
  { zoneId: "tarifit", regionIds: ["tanger-tetouan-alhoceima", "oriental"] },
  // Oriental dark-green Arabic enclave on the Oujda plains.
  { zoneId: "oriental-arabic", regionIds: ["oriental"] },
];

export const getZone = (id: ZoneId): DialectZone | undefined =>
  ZONES.find((z) => z.id === id);
