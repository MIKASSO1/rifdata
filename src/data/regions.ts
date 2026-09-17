// Modular registry of Moroccan regions with linguistic & cultural metadata.
// Add new regions here — the map and dashboard auto-update.
// To attach media in the future, just fill `videoUrl` (YouTube embed URL) or
// extend `audioSamples` with public/external audio links.

export type RegionId =
  | "tanger-tetouan-alhoceima"
  | "oriental"
  | "fes-meknes"
  | "rabat-sale-kenitra"
  | "beni-mellal-khenifra"
  | "casablanca-settat"
  | "marrakech-safi"
  | "draa-tafilalet"
  | "souss-massa"
  | "guelmim-oued-noun"
  | "laayoune-saguia"
  | "dakhla-oued-eddahab";

export interface RegionData {
  id: RegionId;
  name: string;
  nameAr: string;
  language: "Tarifit" | "Darija" | "Tachelhit" | "Tamazight" | "Hassaniya";
  cities: string[];
  /** YouTube embed URL (https://www.youtube.com/embed/VIDEO_ID) — leave empty until ready */
  videoUrl?: string;
  /** External audio URLs (mp3) — leave empty until ready */
  audioSamples?: { label: string; url: string }[];
  fluency: string;
  phonetics: string;
  prosody: string;
  culture: string;
  /** Legacy SVG path — no longer used since map switched to GeoJSON. */
  path?: string;
}

// Coordinates are stylised — they form a recognisable Morocco outline at viewBox 0 0 500 600.
export const REGIONS: RegionData[] = [
  {
    id: "tanger-tetouan-alhoceima",
    name: "Tanger-Tétouan-Al Hoceïma",
    nameAr: "طنجة ـ تطوان ـ الحسيمة",
    language: "Tarifit",
    cities: ["Tanger", "Tétouan", "Al Hoceima", "Chefchaouen"],
    fluency:
      "Tarifit dominates eastward (Al Hoceima, Nador-adjacent), with a Jebli Darija continuum westward. Bilingual code-switching with Spanish is routine.",
    phonetics:
      "Strong uvular /q/, retained /ʕ/, frequent spirantisation of stops (b→β, t→θ). Tarifit shows characteristic /r/→/ɾ/ tap and vowel reduction.",
    prosody:
      "Falling declarative contour, sharp interrogative rise on the penultimate syllable. Jebli speech features melodic, sing-song cadence.",
    culture:
      "Gateway between Africa and Europe. Andalusi heritage in Tétouan, Riffian-Berber pride in Al Hoceima, and Jebli mountain traditions in Chefchaouen.",
    path: "M150,40 L240,30 L290,55 L300,95 L260,115 L210,110 L160,95 L130,70 Z",
  },
  {
    id: "oriental",
    name: "L'Oriental",
    nameAr: "الجهة الشرقية",
    language: "Tarifit",
    cities: ["Oujda", "Nador", "Berkane", "Driouch"],
    fluency:
      "Eastern Tarifit (Iqar'iyyen, Aith Tuzin) coexists with Oujdi Darija. Heavy Algerian-French lexical borrowing near the border.",
    phonetics:
      "Distinct /tʃ/ realisation, palatalised /k/→/tʃ/ in Tarifit. Oujdi Darija preserves /q/ and short vowels more conservatively than Atlantic Darija.",
    prosody:
      "Flatter intonation than western dialects; emphatic stress on lexical roots. Tarifit shows pitch-accent on syllabic /r̩/.",
    culture:
      "Trade crossroads with Algeria. Strong Riffian identity in Nador and Driouch; Bedouin-influenced poetic traditions in the Oujda plains.",
    path: "M300,95 L400,80 L430,140 L410,200 L340,210 L300,170 L290,120 Z",
  },
  {
    id: "fes-meknes",
    name: "Fès-Meknès",
    nameAr: "فاس ـ مكناس",
    language: "Darija",
    cities: ["Fès", "Meknès", "Taza", "Sefrou"],
    fluency:
      "Old urban Fassi Darija — historically prestigious, conservative. Tamazight (Zayane, Senhaja) spoken in surrounding mountains.",
    phonetics:
      "Iconic Fassi /q/→/ʔ/ glottal stop in old families. Pharyngealisation softer than rural variants. Imāla (raising of /aː/→/eː/) preserved.",
    prosody:
      "Refined, almost legato delivery. Marked phrase-final lengthening; a slow tempo associated with cultivated speech.",
    culture:
      "Spiritual and intellectual capital of Morocco. Al-Qarawiyyin university (859 AD), Andalusi music, master artisans, and Sufi brotherhoods.",
    path: "M260,115 L340,130 L350,180 L300,200 L250,180 L240,140 Z",
  },
  {
    id: "rabat-sale-kenitra",
    name: "Rabat-Salé-Kénitra",
    nameAr: "الرباط ـ سلا ـ القنيطرة",
    language: "Darija",
    cities: ["Rabat", "Salé", "Kénitra", "Khémisset"],
    fluency:
      "Standardised 'koine' Darija — the modern lingua franca of media and administration. French code-switching is intense in white-collar registers.",
    phonetics:
      "Neutralised /q/ retained, lenition of intervocalic stops, clear vowel inventory. Considered the 'reference' accent for ASR baselines.",
    prosody:
      "Even, measured rhythm. Question intonation rises on the final syllable rather than the penult, distinguishing it from Fassi.",
    culture:
      "Administrative capital, diplomatic hub. Blend of imperial heritage (Chellah, Kasbah des Oudayas) and contemporary cosmopolitanism.",
    path: "M180,140 L250,140 L260,180 L220,210 L170,190 Z",
  },
  {
    id: "beni-mellal-khenifra",
    name: "Béni Mellal-Khénifra",
    nameAr: "بني ملال ـ خنيفرة",
    language: "Tamazight",
    cities: ["Béni Mellal", "Khénifra", "Khouribga", "Azilal"],
    fluency:
      "Central Atlas Tamazight (Tamazight of the Middle Atlas) is dominant in highlands; rural Darija on the Tadla plain. Strong code-switching.",
    phonetics:
      "Affricated /ts/, /dz/. Tamazight tense consonants (geminates with phonemic length). Darija here keeps /q/ uniformly.",
    prosody:
      "Pitch contour on Tamazight verbal stems (state vs. perfect). Darija prosody is brisker, with shorter intonational phrases.",
    culture:
      "Heart of the Middle Atlas — Zayane and Aït Sokhmane Berber confederations. Ahidous group dance and improvised izlan poetry.",
    path: "M220,210 L300,200 L320,260 L260,275 L210,250 Z",
  },
  {
    id: "casablanca-settat",
    name: "Casablanca-Settat",
    nameAr: "الدار البيضاء ـ سطات",
    language: "Darija",
    cities: ["Casablanca", "Settat", "Mohammedia", "El Jadida"],
    fluency:
      "Casablancan Darija — the most exported variety through media, music, and digital content. Heavily influenced by French and increasingly English.",
    phonetics:
      "Fast tempo, strong vowel reduction in unstressed syllables. /q/ preserved. Lenition of /d/→/ð/ in casual speech.",
    prosody:
      "Urban staccato rhythm; rapid turn-taking. Pragmatic markers ('safi', 'wakha', 'zaama') carry distinct intonational contours.",
    culture:
      "Economic capital. Birthplace of Nayda movement, Moroccan rap, and contemporary cinema. Atlantic identity shaped by trade and migration.",
    path: "M140,200 L220,210 L230,260 L160,265 L120,235 Z",
  },
  {
    id: "marrakech-safi",
    name: "Marrakech-Safi",
    nameAr: "مراكش ـ آسفي",
    language: "Tachelhit",
    cities: ["Marrakech", "Safi", "Essaouira", "Youssoufia"],
    fluency:
      "Marrakchi Darija in the city; Tachelhit (Soussi Berber) dominant in the Haouz countryside and toward the High Atlas foothills.",
    phonetics:
      "Marrakchi /q/ kept; characteristic 'sing-song' lilt. Tachelhit features rich consonant clusters and contrastive labialisation /kʷ/, /gʷ/.",
    prosody:
      "Marked melodic contour; vocatives lengthen significantly. Tachelhit poetry uses fixed metric patterns (timnadin).",
    culture:
      "Imperial city, Jemaa el-Fna oral heritage (UNESCO). Halqa storytelling, Gnawa spirituality, and Berber market traditions.",
    path: "M120,235 L230,260 L250,310 L180,330 L100,300 Z",
  },
  {
    id: "draa-tafilalet",
    name: "Drâa-Tafilalet",
    nameAr: "درعة ـ تافيلالت",
    language: "Tamazight",
    cities: ["Errachidia", "Ouarzazate", "Midelt", "Tinghir"],
    fluency:
      "Tamazight (Aït Atta, Aït Hadiddou) and Hassani-tinged southern Darija. Saharan oasis communities preserve Judeo-Berber lexical traces.",
    phonetics:
      "Strong emphatic consonants, retention of archaic Berber phonemes. Saharan vowel system shows /a/-fronting.",
    prosody:
      "Slow, declarative pacing. Berber poetic forms (timdyazin) dominate; oral epic tradition with steady metrical chant.",
    culture:
      "Pre-Saharan oases, Aït Ben Haddou kasbah, Erg Chebbi dunes. Aït Atta confederation and ancestral Tafilalet caravan heritage.",
    path: "M250,310 L370,260 L400,330 L340,400 L260,380 Z",
  },
  {
    id: "souss-massa",
    name: "Souss-Massa",
    nameAr: "سوس ـ ماسة",
    language: "Tachelhit",
    cities: ["Agadir", "Inezgane", "Taroudant", "Tiznit"],
    fluency:
      "Tachelhit (Soussi) is the majority L1 — one of the most vital Berber varieties. Soussi Darija coexists in coastal urban centres.",
    phonetics:
      "Tachelhit phonotactics permit consonant-only words (e.g. tkkst). Pharyngeal /ʕ/, ejective-like emphatics, contrastive vowel length.",
    prosody:
      "Distinctive iambic stress; Soussi 'amarg' poetic genre uses fixed melodic templates with precise prosodic units.",
    culture:
      "Argan oil heartland, Anti-Atlas identity. Rwais musical tradition, Agadir's reconstruction modernity, deep maritime-Berber synthesis.",
    path: "M100,300 L250,310 L260,380 L180,420 L80,360 Z",
  },
  {
    id: "guelmim-oued-noun",
    name: "Guelmim-Oued Noun",
    nameAr: "كلميم ـ واد نون",
    language: "Hassaniya",
    cities: ["Guelmim", "Tan-Tan", "Sidi Ifni", "Assa"],
    fluency:
      "Transition zone between Tachelhit and Hassaniya Arabic. Hassaniya gains ground southward; bilingual nomadic communities dominate.",
    phonetics:
      "Hassaniya preserves classical /q/→/g/, interdentals /θ ð/, and full case-vowel echoes — closer to old Bedouin Arabic than to Darija.",
    prosody:
      "Slow desert cadence; long vowel realisation. Tbraa women's poetry uses concise two-line metric forms with subtle melodic glides.",
    culture:
      "'Gateway to the Sahara' — Saharan Hassani heritage, camel caravans, Moussem of Tan-Tan (UNESCO intangible heritage).",
    path: "M80,360 L260,380 L240,440 L100,430 Z",
  },
  {
    id: "laayoune-saguia",
    name: "Laâyoune-Sakia El Hamra",
    nameAr: "العيون ـ الساقية الحمراء",
    language: "Hassaniya",
    cities: ["Laâyoune", "Boujdour", "Tarfaya", "Es-Semara"],
    fluency:
      "Hassaniya Arabic — pure Saharan dialect of Beni Hassan tribes. Distinct from northern Darija in lexicon, morphology, and phonology.",
    phonetics:
      "Classical /q/→/g/, retained interdentals, full vowel inventory. Strong pharyngealisation; rhythmic gemination.",
    prosody:
      "Long melismatic phrases; recitation-like declarative tone. Talaa and gaf poetic genres impose strict metric/melodic patterns.",
    culture:
      "Saharan provinces — tents (khaima), camel pastoralism, Hassani sung poetry, and Moussem festivals celebrating tribal genealogy.",
    path: "M100,430 L240,440 L220,500 L80,490 Z",
  },
  {
    id: "dakhla-oued-eddahab",
    name: "Dakhla-Oued Ed-Dahab",
    nameAr: "الداخلة ـ وادي الذهب",
    language: "Hassaniya",
    cities: ["Dakhla", "Aousserd"],
    fluency:
      "Hassaniya Arabic, with sub-Saharan multilingual contact (Wolof, French) at the southern frontier. Highly conservative dialect features.",
    phonetics:
      "Identical Beni Hassan substrate as Laâyoune. Coastal speech shows slight tempo acceleration; inland Aousserd speech is the most archaic.",
    prosody:
      "Wide pitch range in narrative speech; ceremonial chant prosody for genealogical recitation (nasab).",
    culture:
      "Atlantic Sahara, lagoons of Dakhla, fishing economy, and trans-Saharan trade memory linking Morocco to Mauritania and West Africa.",
    path: "M80,490 L220,500 L200,570 L70,560 Z",
  },
];
