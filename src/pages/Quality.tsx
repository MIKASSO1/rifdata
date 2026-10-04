import { Play, Pause, MapPin, ChevronDown, SlidersHorizontal, Folder, Lock, Mail, Building2, User, Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { JsonHighlight, MUTED_EDITOR_PALETTE } from "@/components/JsonHighlight";

// ─── MASTER PASSWORD — change here to rotate credentials ───────────────────
const MASTER_PASSWORD = "RifData_QA_2026";
// ────────────────────────────────────────────────────────────────────────────

type TierKey = "Standard" | "Balanced" | "Gold" | "Platinum";
type RegionKey = "Ayt_Waryaghel" | "Ibeqquyen" | "Iqerayen" | "Iznasen" | "Gzenaya";

interface FileAsset {
  fileNumber: string;
  latin: string;
  translation_en: string;
  snr: string;
  hz: number;
}

const REGIONAL_DATABASE: Record<RegionKey, { name: string; prefix: string; folder: string; files: FileAsset[] }> = {
  Ayt_Waryaghel: {
    name: "Central Rif (Ayt Waryaghel)",
    prefix: "RIF_WARY",
    folder: "Central_Rif",
    files: [
      { fileNumber: "000001", latin: "Amsawaeth n makhzin d taddart nnegh tamzwarut.", translation_en: "Communicating with the administration in our first village.", snr: "42.51 dB", hz: 48000 },
      { fileNumber: "000002", latin: "Thasriwth n wedrar tfejjej rdwahi n tmdint.", translation_en: "The mountain spring refreshes the outskirts of the city.", snr: "43.10 dB", hz: 48000 },
      { fileNumber: "000003", latin: "Imezwura nnegh d nniya g kul lecghal nsen.", translation_en: "Our ancestors were sincere in all of their deeds.", snr: "41.95 dB", hz: 44100 },
      { fileNumber: "000004", latin: "Abrid n tizi d azruy n wallen g uzemz n tywza.", translation_en: "The pass road is a vision of sight during harvesting season.", snr: "44.20 dB", hz: 48000 },
      { fileNumber: "000005", latin: "Arif haca d timuzgha d wawal n rfejra.", translation_en: "The Rif is nothing but identity and the word of dawn.", snr: "42.88 dB", hz: 48000 },
    ]
  },
  Ibeqquyen: {
    name: "Maritime Rif (Ibeqquyen)",
    prefix: "RIF_IBEQ",
    folder: "Maritime_Rif",
    files: [
      { fileNumber: "000001", latin: "Aman n rvenhar d ismvdvan g srayf n usirem.", translation_en: "The sea waters are cold on the shores of hope.", snr: "45.12 dB", hz: 48000 },
      { fileNumber: "000002", latin: "Rqyadh n tghanimt icemmar i thwiza n sray.", translation_en: "The bamboo yard supports the community gathering of the valley.", snr: "46.02 dB", hz: 48000 },
      { fileNumber: "000003", latin: "Imawdhan n ssahel ssnen i tmdhab n lmoj.", translation_en: "The coastal experts know the pathways of the waves.", snr: "44.80 dB", hz: 44100 },
      { fileNumber: "000004", latin: "Taziri tfejjej x ssahel n Cala Iris g jwayth.", translation_en: "The moonlight brightens the coast of Cala Iris at nights.", snr: "45.50 dB", hz: 48000 },
      { fileNumber: "000005", latin: "Ajnwi n wedrar d rrih n sbaheg n rbar.", translation_en: "The mountain breeze is the morning breath of the land.", snr: "46.15 dB", hz: 48000 },
    ]
  },
  Iqerayen: {
    name: "Eastern Sector (Iqer'ayen)",
    prefix: "RIF_IQER",
    folder: "Eastern_Sector",
    files: [
      { fileNumber: "000001", latin: "Ossinegh mokh dhas ghanegue ilhayat annegh nechnin.", translation_en: "I do not know how we will manage our lives, us.", snr: "42.15 dB", hz: 48000 },
      { fileNumber: "000002", latin: "Rmarfa n ssuq tbedda x lqqanun n tmdint.", translation_en: "The market trade stands on the regulations of the city.", snr: "41.85 dB", hz: 48000 },
      { fileNumber: "000003", latin: "Ayt rfejra kkan s uffasi n uzaf n ubrid.", translation_en: "The morning travelers went by the right side of the main road.", snr: "43.02 dB", hz: 44100 },
      { fileNumber: "000004", latin: "Iznayen ssqaren i tazzaniwn g thgmmi n tmusni.", translation_en: "The mentors teach children in the house of knowledge.", snr: "42.40 dB", hz: 48000 },
      { fileNumber: "000005", latin: "Thawmat d liser n tudert maci d rmal uha.", translation_en: "Brotherhood is the ease of life, not just wealth.", snr: "42.90 dB", hz: 48000 },
    ]
  },
  Iznasen: {
    name: "Eastern Hills (Iznasen)",
    prefix: "RIF_IZNA",
    folder: "Eastern_Hills",
    files: [
      { fileNumber: "000001", latin: "Mamekh tllid high am ddukl nnegh n zik.", translation_en: "How are you doing, our old friend.", snr: "43.70 dB", hz: 48000 },
      { fileNumber: "000002", latin: "Tazedwict n wedrar teqqim d rwerth n ijeddin.", translation_en: "The mountain heritage remained the legacy of grandfathers.", snr: "44.05 dB", hz: 48000 },
      { fileNumber: "000003", latin: "Lfecta n rfejna tsmuna ayt wedrar marra.", translation_en: "The spring festival gathered all mountain residents.", snr: "43.20 dB", hz: 44100 },
      { fileNumber: "000004", latin: "Aris n lrecni d afra n wulawen n tgmmi.", translation_en: "The trace of good work is the peace of household hearts.", snr: "44.55 dB", hz: 48000 },
      { fileNumber: "000005", latin: "Tiziri n wedrar tcecced x ijejdhan n sbahed.", translation_en: "The mountain moon shines upon the early morning birds.", snr: "43.90 dB", hz: 48000 },
    ]
  },
  Gzenaya: {
    name: "Southern Rif (Gzenaya)",
    prefix: "RIF_GZEN",
    folder: "Southern_Rif",
    files: [
      { fileNumber: "000001", latin: "Thariwin n zik kkant-tt d timaziwin g udrar.", translation_en: "The women of the old days were powerful in the mountains.", snr: "46.50 dB", hz: 48000 },
      { fileNumber: "000002", latin: "Ighzer n Aknoul isfejjej i tula n tgmmi nnegh.", translation_en: "The stream of Aknoul gives life to our valley fields.", snr: "45.90 dB", hz: 48000 },
      { fileNumber: "000003", latin: "Tammant n wedrar d ddwa i tndhfi n marra kfwn.", translation_en: "Mountain honey is a cure for all types of exhaustion.", snr: "46.22 dB", hz: 44100 },
      { fileNumber: "000004", latin: "Azzit n uzemmur d rrezeq imgharen x uzaf.", translation_en: "Olive oil is a great blessing upon the lands.", snr: "45.80 dB", hz: 48000 },
      { fileNumber: "000005", latin: "Tudert g wedrar d rreha n wallen d uffasi.", translation_en: "Life in the mountain is a comfort to the eyes and soul.", snr: "46.95 dB", hz: 48000 },
    ]
  }
};

const TIER_DATA = {
  Standard: { label: "Standard Tier", file_suffix: "standard.json", extra: `"annotation_depth": "Basic Transcription"` },
  Balanced: { label: "Balanced Tier", file_suffix: "balanced.json", extra: `"annotation_depth": "Balanced Translation Layer"` },
  Gold: {
    label: "Gold Tier",
    file_suffix: "gold.json",
    extra: `"annotation_depth": "Advanced Linguistic Analysis",
  "audio_quality_metrics": {
    "clipping_detected": false,
    "environment": "Anechoic Chamber Verified"
  }`
  },
  Platinum: {
    label: "Platinum Tier",
    file_suffix: "platinum.json",
    extra: `"annotation_depth": "Full Cognitive Provenance",
  "annotation_provenance": {
    "review_status": "triple_checked_approved",
    "annotator_id": "ANN_RIF_02"
  }`
  }
};

// ─── ACCESS GATEWAY ────────────────────────────────────────────────────────

function AccessGateway({ onAuthorized }: { onAuthorized: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordShake, setPasswordShake] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MASTER_PASSWORD) {
      onAuthorized();
    } else {
      setPasswordError(true);
      setPasswordShake(true);
      setTimeout(() => setPasswordShake(false), 600);
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !company.trim()) return;
    setRequestLoading(true);
    setTimeout(() => {
      setRequestLoading(false);
      setRequestSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#0a0a0a] flex flex-col pt-24 md:pt-32 pb-20">
      {/* Header badge */}
      <div className="mx-auto w-[min(960px,calc(100%-40px))] mb-12">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/45 mb-6">
          <Lock size={12} className="text-[#0a0a0a]/40" />
          Restricted Access · Quality Intelligence Portal
        </div>
        <h1 className="font-serif-display text-4xl md:text-6xl leading-[1.08] tracking-[-0.02em] text-[#0a0a0a] max-w-3xl">
          Proprietary Dataset<br />
          <span className="italic text-[#0a0a0a]/40">Quality Demonstration.</span>
        </h1>
        <p className="mt-5 text-base text-[#0a0a0a]/55 font-light max-w-xl leading-relaxed">
          This portal contains confidential linguistic deliverables and proprietary QA schemas.
          Access is restricted to authorized partners and verified institutional clients.
        </p>
      </div>

      {/* Two-column gateway */}
      <div className="mx-auto w-[min(960px,calc(100%-40px))] grid md:grid-cols-2 gap-6 md:gap-8">

        {/* ── Panel 1: Direct Password Access ── */}
        <div className="bg-white border border-[#0a0a0a]/8 rounded-2xl p-8 shadow-[0_4px_24px_-6px_rgba(10,10,10,0.08)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-[#0a0a0a] flex items-center justify-center">
              <Lock size={14} className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#0a0a0a]/40">Option A</p>
              <h2 className="text-base font-semibold text-[#0a0a0a]">Direct Password Access</h2>
            </div>
          </div>
          <p className="text-sm text-[#0a0a0a]/55 font-light mb-6 leading-relaxed">
            Enter your issued access key to unlock the full quality demonstration environment.
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
                placeholder="Enter access password"
                className={`w-full px-4 py-3 rounded-xl border text-sm font-mono bg-[#f5f1ea] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none transition-all pr-11
                  ${passwordError
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#0a0a0a]/12 focus:border-[#0a0a0a]/35"
                  }
                  ${passwordShake ? "animate-[shake_0.5s_ease-in-out]" : ""}
                `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/35 hover:text-[#0a0a0a]/70 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {passwordError && (
              <p className="text-xs text-red-500 font-mono">
                Invalid access key. Please verify and try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0a0a0a] text-white text-sm font-medium hover:bg-[#0a0a0a]/85 transition-all flex items-center justify-center gap-2 group"
            >
              Unlock Portal
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <style>{`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-6px); }
              40% { transform: translateX(6px); }
              60% { transform: translateX(-4px); }
              80% { transform: translateX(4px); }
            }
          `}</style>
        </div>

        {/* ── Panel 2: Request Institutional Access ── */}
        <div className="bg-white border border-[#0a0a0a]/8 rounded-2xl p-8 shadow-[0_4px_24px_-6px_rgba(10,10,10,0.08)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-[#f5f1ea] border border-[#0a0a0a]/10 flex items-center justify-center">
              <Mail size={14} className="text-[#0a0a0a]" />
            </div>
            <div>
              <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#0a0a0a]/55">Option B</p>
              <h2 className="text-base font-semibold text-[#0a0a0a]">Request Institutional Access</h2>
            </div>
          </div>
          <p className="text-sm text-[#0a0a0a]/75 font-light mb-6 leading-relaxed">
            New B2B clients — submit your details and we'll dispatch your access key within 2 hours.
          </p>

          {requestSubmitted ? (

            <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
              <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <CheckCircle2 size={22} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0a0a0a] mb-1">Request Submitted</p>
                <p className="text-xs text-[#0a0a0a]/55 font-light leading-relaxed max-w-[240px]">
                  Access request submitted. Our team will dispatch your access key to your corporate email within 2 hours.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRequestSubmit} className="space-y-3">
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#0a0a0a]/12 text-sm bg-[#f5f1ea] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none focus:border-[#0a0a0a]/35 transition-all"
                />
              </div>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#0a0a0a]/12 text-sm bg-[#f5f1ea] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none focus:border-[#0a0a0a]/35 transition-all"
                />
              </div>
              <div className="relative">
                <Building2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company Name"
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#0a0a0a]/12 text-sm bg-[#f5f1ea] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none focus:border-[#0a0a0a]/35 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={requestLoading}
                className="w-full py-3 rounded-xl border border-[#0a0a0a]/15 text-[#0a0a0a] text-sm font-medium hover:bg-[#0a0a0a]/5 hover:border-[#0a0a0a]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {requestLoading ? (
                  <span className="inline-block h-4 w-4 border-2 border-[#0a0a0a]/20 border-t-[#0a0a0a]/60 rounded-full animate-spin" />
                ) : (
                  <>
                    Submit Access Request
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom note */}
      <div className="mx-auto w-[min(960px,calc(100%-40px))] mt-10">
        <p className="text-[11px] font-mono text-[#0a0a0a]/55 tracking-wide">
          RifData Atlas · Proprietary Intelligence Portal · All access attempts are logged.
        </p>
      </div>
    </div>
  );
}


// ─── MAIN QUALITY PAGE ─────────────────────────────────────────────────────

// Auth is now handled by QualityGatewayModal in the Header before routing here.
export const Quality = () => <QualityContent />;

function QualityContent() {
  const [selectedTier, setSelectedTier] = useState<TierKey>("Gold");
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>("Ayt_Waryaghel");
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);

  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isUpdating, setIsUpdating] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const tryAutoPlayVideo = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {
        // Autoplay may be blocked; ignore.
      });
    }
  }, []);


  const currentRegionData = REGIONAL_DATABASE[selectedRegion];
  const currentFileAsset = currentRegionData.files[selectedFileIndex];

  const activeFileCode = `${currentRegionData.prefix}_${currentFileAsset.fileNumber}`;
  const audioSrc = `/rifdata/${currentRegionData.folder}/${activeFileCode}.wav`;

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 500);
    if (audioRef.current) {
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
    return () => clearTimeout(timer);
  }, [selectedRegion, selectedTier, selectedFileIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.log("Playback error:", err));
      setIsPlaying(true);
    }
  };

  const generateDynamicJson = () => {
    return `{
  "sample_id": "${activeFileCode}",
  "language_profile": {
    "language": "Riffian Tamazight (Tserifit)",
    "iso_639_3": "rif",
    "dialect_cluster": "${currentRegionData.name}"
  },
  ${TIER_DATA[selectedTier].extra},
  "transcriptions": {
    "text_latn_phonetic": "${currentFileAsset.latin}",
    "text_en_translation": "${currentFileAsset.translation_en}"
  },
  "audio_specs": {
    "file_path": "${audioSrc}",
    "sample_rate_hz": ${currentFileAsset.hz},
    "bit_depth": "24-bit",
    "measured_snr": "${currentFileAsset.snr}"
  }
}`;
  };

  return (
    <main className="min-h-screen bg-background text-foreground antialiased pt-12 md:pt-16">
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0.8; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent);
          box-shadow: 0 0 15px #3b82f6, 0 0 30px #60a5fa;
          animation: scan 0.5s ease-out forwards;
        }
      `}</style>

      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={() => { if (audioRef.current) setCurrentTime(audioRef.current.currentTime); }}
        onLoadedMetadata={() => { if (audioRef.current) setDuration(audioRef.current.duration); }}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* Hero */}
      <section className="mx-auto w-[min(1200px,calc(100%-40px))] pb-6 text-left">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft text-muted-foreground px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em]">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Interactive Quality Showcases
        </span>
        <h1 className="mt-4 text-[clamp(32px,4.5vw,56px)] font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          Inspect Real-Time <span className="text-primary font-serif italic font-normal">Linguistic Deliverables</span>
        </h1>
      </section>

      {/* Video Demo Section */}
      <section className="mx-auto w-[min(1200px,calc(100%-40px))] pb-10">
        <div className="rounded-3xl bg-[#f5f1ea] border border-[#0a0a0a]/8 p-6 md:p-10 shadow-sm">
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-3">
              <span className="w-4 h-px bg-slate-400" />
              Live Demo
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Dataset Precision in Action
            </h2>
          </div>
          <video
            ref={videoRef}
            className="w-full h-auto rounded-2xl border border-[#0a0a0a]/10 object-cover shadow-md"
            loop
            playsInline
            muted
            autoPlay
            preload="auto"
            onLoadedData={tryAutoPlayVideo}
            onCanPlay={tryAutoPlayVideo}
          >
            <source src="/videos/quality-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </div>
      </section>

      <section className="py-2">
        <div className="mx-auto w-[min(1200px,calc(100%-40px))]">

          <div className="bg-card border border-line rounded-[2rem] p-6 shadow-sm space-y-5 mb-6 bg-paper-soft/30">
            {/* TIER SELECTOR */}
            <div className="space-y-2.5 text-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground block">
                1. SELECT TIER
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                {(Object.keys(TIER_DATA) as TierKey[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTier(t)}
                    className={`rounded-full px-6 py-2 text-xs font-semibold tracking-wide transition-all duration-200 ${
                      selectedTier === t ? "bg-primary text-primary-foreground shadow-sm scale-105" : "bg-background text-muted-foreground border border-line hover:text-foreground"
                    }`}
                  >
                    {TIER_DATA[t].label}
                  </button>
                ))}
              </div>
            </div>

            {/* DROPDOWNS */}
            <div className="pt-4 border-t border-line/60 grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* REGIONAL FILTER */}
              <div className="space-y-2 relative">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  2. REGIONAL FILTER:
                </label>
                <button
                  onClick={() => { setIsRegionDropdownOpen(!isRegionDropdownOpen); setIsFileDropdownOpen(false); }}
                  className="w-full flex items-center justify-between bg-background border border-line rounded-xl px-4 py-3 text-sm font-medium hover:border-muted transition"
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    <span>Sector: <strong className="text-foreground">{currentRegionData.name}</strong></span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isRegionDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isRegionDropdownOpen && (
                  <div className="absolute top-[100%] left-0 w-full bg-card border border-line rounded-xl mt-1 shadow-xl z-30 overflow-hidden py-1">
                    {(Object.keys(REGIONAL_DATABASE) as RegionKey[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedRegion(key);
                          setSelectedFileIndex(0);
                          setIsRegionDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-paper-soft ${
                          selectedRegion === key ? "bg-primary/5 text-primary font-bold" : "text-foreground"
                        }`}
                      >
                        {REGIONAL_DATABASE[key].name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* FILES DROPDOWN */}
              <div className="space-y-2 relative">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  3. DYNAMIC FILES DROPDOWN (RESET TO 000001 PER SUBFOLDER):
                </label>
                <button
                  onClick={() => { setIsFileDropdownOpen(!isFileDropdownOpen); setIsRegionDropdownOpen(false); }}
                  className="w-full flex items-center justify-between bg-black text-white rounded-xl px-4 py-3 text-sm font-medium shadow-md transition"
                >
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-primary" />
                    <span>Active Target: <strong className="font-mono text-primary">{activeFileCode}.json</strong></span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isFileDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isFileDropdownOpen && (
                  <div className="absolute top-[100%] left-0 w-full bg-card border border-line rounded-xl mt-1 shadow-xl z-30 overflow-hidden py-1 max-h-60 overflow-y-auto">
                    {currentRegionData.files.map((file, idx) => (
                      <button
                        key={file.fileNumber}
                        onClick={() => { setSelectedFileIndex(idx); setIsFileDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-3 border-b border-line/40 last:border-0 transition hover:bg-paper-soft flex items-center justify-between ${
                          selectedFileIndex === idx ? "bg-primary/10 text-primary font-bold" : "text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Folder size={18} stroke="#d97706" fill="#fef08a" className="shrink-0" />
                          <div>
                            <span className="font-mono text-xs block opacity-70">rifdata/{currentRegionData.folder}/{currentRegionData.prefix}_{file.fileNumber}.json</span>
                            <span className="text-sm font-medium">Sample Asset {idx + 1}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Presentation Interface */}
          <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-sm relative">

            {isUpdating && (
              <>
                <div className="absolute inset-0 bg-primary/[0.03] dark:bg-primary/[0.05] z-40 pointer-events-none transition-all duration-150 animate-pulse" />
                <div className="animate-scan-line z-50" />
              </>
            )}

            <div className="grid lg:grid-cols-[0.95fr_1.2fr]">

              {/* Left Panel */}
              <div className="p-8 lg:p-10 flex flex-col justify-between border-b border-line lg:border-b-0 lg:border-r">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary mb-1">
                        {TIER_DATA[selectedTier].label} · Dynamic Subfolder Asset
                      </div>
                      <div className="font-display text-base text-muted-foreground leading-snug">
                        Target Folder Path: <strong className="text-foreground">/rifdata/{currentRegionData.folder}/</strong>
                      </div>
                    </div>
                    <span className="rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white font-mono">
                      WAV + JSON
                    </span>
                  </div>

                  <div className="rounded-2xl border border-line bg-gradient-to-b from-paper-soft to-paper p-5 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4 flex justify-between">
                      <span>AUDIO STREAM PREVIEW</span>
                      <span className="text-primary font-mono">SNR: {currentFileAsset.snr}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={togglePlay} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow transition hover:scale-105">
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                      </button>
                      <div className="w-full">
                        <div className="flex h-8 items-end gap-1 mb-2">
                          {[14, 22, 36, 28, 44, 30, 18, 24, 40, 56, 48, 34, 22, 18, 28, 42, 54, 46, 26, 14].map((h, i) => (
                            <span key={i} style={{ height: `${h}px` }} className={`w-full rounded-full transition-colors duration-300 ${isPlaying ? "bg-primary" : "bg-primary/30"}`} />
                          ))}
                        </div>
                        <div className="font-mono text-[11px] text-muted-foreground flex justify-between">
                          <span className="truncate max-w-[190px]">{activeFileCode}.wav</span>
                          <span>{Math.floor(currentTime)}s / {Math.floor(duration || 5)}s</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-line bg-gradient-to-b from-paper-soft to-paper p-5 space-y-4">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">PHONETIC TRANSCRIPT (LATIN)</div>
                      <p className="text-[15px] font-medium leading-[1.6]">{currentFileAsset.latin}</p>
                    </div>
                    <div className="pt-2 border-t border-line/60">
                      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">ENGLISH TRANSLATION</div>
                      <p className="text-[15px] leading-[1.6] text-foreground font-medium">{currentFileAsset.translation_en}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: JSON Terminal */}
              <div className="bg-black text-white flex flex-col max-h-[680px]">
                <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 text-xs text-white">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
                    <span className="h-3 w-3 rounded-full bg-[#06d6a0]" />
                  </div>
                  <span className="ml-3 font-mono text-[12px] text-white">{activeFileCode}.{TIER_DATA[selectedTier].file_suffix}</span>
                  <span className="ml-auto font-mono text-[11px] uppercase tracking-widest text-white/85">SYNCHRONIZED PATH</span>
                </div>

                <pre className="overflow-auto p-6 font-mono text-[13px] leading-[1.75] text-white/85 flex-1">
                  <JsonHighlight code={generateDynamicJson()} palette={MUTED_EDITOR_PALETTE} />
                </pre>
                <div className="flex justify-end px-6 py-3 border-t border-white/10">
                  <a
                    href="/quality"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 group"
                  >
                    View full quality schemas
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

// JSON syntax highlighting now lives in the shared component:
// src/components/JsonHighlight.tsx (default palette = VS Code Dark+).
