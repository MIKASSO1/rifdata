import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Pause,
  ArrowLeft,
  ArrowRight,
  Send,
  CheckCircle2,
  Activity,
  UserCircle2,
} from "lucide-react";

type Lang = "Tarifit" | "Darija";

type Sample = {
  id: number;
  code: string;
  language: Lang;
  reference: string;
  duration: number;
  audioUrl: string;
};

// Placeholder MP3 clips (short, royalty-free SoundHelix samples).
// These will be swapped for native Tarifit / Darija recordings later.
const PLACEHOLDER_AUDIO: string[] = Array.from({ length: 20 }, (_, i) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 16) + 1}.mp3`,
);

const TARIFIT_LINES = [
  "azul fellawen, mamec tellam assa",
  "qim da, ad as iniɣ awal",
  "ruḥ ɣer taddart, ad d ttaseɣ",
  "yelha lḥal assa di temdint",
  "ssneɣ ad ariɣ s tmaziɣt",
  "init-iyi mani tella tḥanut",
  "nettat tessen ad tehder taqbaylit",
  "wer ssineɣ ca, semḥ-iyi",
  "asegwas amaynu, ar tufat",
  "tameṭṭut-inu txeddem di sbiṭar",
  "ggureɣ ɣer lxedmet zik",
  "ad nemmel awal-nneɣ s leqraya",
  "yiwen wass ad nezzi ɣer Arif",
  "iruḥ baba-s s tmurt n Holanda",
  "tameṭṭut-nni teskar imensi yelhan",
  "ssemḥ-iyi, ur ufiɣ ca lewqet",
  "ɣef tmurt-inu, ttaruɣ izlan",
  "tira s tifinaɣ d ayla-nneɣ",
  "init-iyi mamec tetteddu lḥala",
  "ad nemyaru ass-a awal s lferḥ",
];

const DARIJA_LINES = [
  "السلام عليكم، كي داير اليوم",
  "غادي نمشي للسوق نشري الخبز",
  "واش عندك شي وقت دابا نهضرو",
  "الجو زوين بزاف اليوم في طنجة",
  "خويا جا من فرنسا ليلة الأمس",
  "بغيت نشرب أتاي مع النعناع",
  "هاد الكتاب مزيان بزاف، قراه",
  "الطوموبيل ديالي خاصها مكانيك",
  "ولدي تيقرا في الجامعة دابا",
  "نشوفو فالعشية إن شاء الله",
  "كنخدم في شركة ديال التكنولوجيا",
  "هاد الماكلة بنينة بزاف الله يعطيك الصحة",
  "غدا غادي نسافرو للرباط",
  "عندي موعد مع الطبيب نهار الخميس",
  "الدنيا كتبدل بسرعة في هاد الزمان",
  "خاصني نخلص الفاتورة قبل آخر الشهر",
  "الجار ديالنا راجل مزيان وعاقل",
  "الأطفال تيلعبو في الحديقة كل عشية",
  "كنحب نقرا الكتب في الليل قبل النعاس",
  "هاد المشروع غادي يبدا الشهر الجاي",
];

const buildSamples = (lang: Lang): Sample[] => {
  const lines = lang === "Tarifit" ? TARIFIT_LINES : DARIJA_LINES;
  return lines.map((reference, i) => ({
    id: i + 1,
    code: `S${String(i + 1).padStart(2, "0")}`,
    language: lang,
    reference,
    duration: 5 + ((i * 7) % 6),
    audioUrl: PLACEHOLDER_AUDIO[i],
  }));
};

const COUNTRIES = [
  "Morocco",
  "Algeria",
  "Tunisia",
  "Libya",
  "Spain",
  "France",
  "Belgium",
  "Netherlands",
  "Germany",
  "United Kingdom",
  "United States",
  "Canada",
  "Other",
];

const TestPage = () => {
  const navigate = useNavigate();

  // Phase: register -> test -> done
  const [phase, setPhase] = useState<"register" | "test" | "done">("register");

  // Candidate
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState<Lang | "">("");
  const [nativeSpeaker, setNativeSpeaker] = useState<"" | "Yes" | "No">("");

  // Test state
  const samples = useMemo(
    () => (language ? buildSamples(language) : []),
    [language],
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sample = samples[currentIdx];

  // Reset audio whenever the sample changes
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
  }, [currentIdx, sample?.audioUrl]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const canRegister =
    name.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    country.length > 0 &&
    (language === "Tarifit" || language === "Darija") &&
    (nativeSpeaker === "Yes" || nativeSpeaker === "No");

  const handleStartTest = () => {
    if (nativeSpeaker === "No") {
      navigate("/waitlist");
      return;
    }
    setPhase("test");
    setCurrentIdx(0);
    setCurrentAnswer("");
    setAllAnswers([]);
  };

  const handlePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
      return;
    }
    a.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  const handleTimeUpdate = () => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    setProgress(a.currentTime / a.duration);
    // Cap playback to 10 seconds per clip
    if (a.currentTime >= 10) {
      a.pause();
      setIsPlaying(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(1);
  };

  const handleSubmitSample = () => {
    if (currentAnswer.trim().length < 2) return;
    audioRef.current?.pause();
    setIsPlaying(false);
    const next = [...allAnswers, currentAnswer.trim()];
    setAllAnswers(next);
    if (currentIdx + 1 >= samples.length) {
      setPhase("done");
    } else {
      setCurrentIdx(currentIdx + 1);
      setCurrentAnswer("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0d10] text-white/90">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-20 font-sans" style={{ marginTop: 80 }}>
        <div className="container max-w-3xl">
          {/* Top bar */}
          <div className="mb-8 flex items-center justify-between text-xs">
            <Link
              to="/compliance"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors font-mono uppercase tracking-wider"
            >
              <ArrowLeft size={14} /> Back
            </Link>
            <div className="font-mono uppercase tracking-[0.25em] text-white/40">
              /test · qualification
            </div>
          </div>

          {/* PHASE 1 — Registration */}
          {phase === "register" && (
            <section className="border border-white/10 bg-white/[0.02] rounded-md p-6 md:p-10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono mb-3">
                Step 03 · Candidate Registration
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-2 flex items-center gap-3">
                <UserCircle2 className="text-cyan-300" /> Candidate Information
              </h1>
              <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-xl">
                Confirm your identity and target language. The qualification
                test content will be filtered to match your declared mother
                tongue.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
                    Full Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Yassine El Khattabi"
                    className="bg-black/30 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-0"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-black/30 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-0"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
                    Country of Residence
                  </label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="bg-black/30 border-white/10 text-white focus:ring-cyan-400/40 focus:ring-offset-0">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
                    Mother Tongue / Target Language
                  </label>
                  <Select
                    value={language}
                    onValueChange={(v) => setLanguage(v as Lang)}
                  >
                    <SelectTrigger className="bg-black/30 border-white/10 text-white focus:ring-cyan-400/40 focus:ring-offset-0">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tarifit">Rifian (Tarifit)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="mt-2 text-[11px] text-white/40 font-mono">
                    Test samples will be filtered to your selected language only.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
                    Are you a Native Speaker?
                  </label>
                  <Select
                    value={nativeSpeaker}
                    onValueChange={(v) => setNativeSpeaker(v as "Yes" | "No")}
                  >
                    <SelectTrigger className="bg-black/30 border-white/10 text-white focus:ring-cyan-400/40 focus:ring-offset-0">
                      <SelectValue placeholder="Select an answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes — I am a native speaker</SelectItem>
                      <SelectItem value="No">No — I am not a native speaker</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="mt-2 text-[11px] text-amber-300/70 font-mono">
                    Only native speakers may proceed. Non-natives will be added to a waitlist.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <Button
                  variant="emerald"
                  size="xl"
                  onClick={handleStartTest}
                  disabled={!canRegister}
                  className={!canRegister ? "opacity-50 cursor-not-allowed" : ""}
                >
                  {nativeSpeaker === "No" ? "Join Waitlist" : "Begin Qualification Test"} <ArrowRight />
                </Button>
              </div>
            </section>
          )}

          {/* PHASE 2 — Sequential Test */}
          {phase === "test" && sample && (
            <section>
              {/* Progress */}
              <div className="border border-white/10 bg-white/[0.02] rounded-md p-5 mb-6 sticky top-20 z-10 backdrop-blur">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Activity size={12} /> Progress · {language}
                  </span>
                  <span className="text-white">
                    {String(currentIdx + 1).padStart(2, "0")}
                    <span className="text-white/30"> / {samples.length}</span>
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
                    style={{
                      width: `${((currentIdx) / samples.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="border border-white/10 bg-white/[0.02] rounded-md p-6 md:p-10">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono mb-4">
                  Sample {sample.code} · {sample.duration}s · {sample.language}
                </div>

                <div className="flex flex-col items-center justify-center py-8 mb-6 border border-white/5 rounded-md bg-black/20">
                  <audio
                    ref={audioRef}
                    src={sample.audioUrl}
                    preload="auto"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleAudioEnded}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={handlePlay}
                    aria-label="Play sample"
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                      isPlaying
                        ? "bg-cyan-400 text-[#0b0d10] scale-105"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {isPlaying ? (
                      <Pause size={28} />
                    ) : (
                      <Play size={28} className="ml-1" />
                    )}
                  </button>
                  {/* Progress bar */}
                  <div className="mt-5 w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-150"
                      style={{ width: `${Math.min(progress * 100, 100)}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs font-mono uppercase tracking-wider text-white/40">
                    {isPlaying ? "Playing… (max 10s)" : "Click to play audio"}
                  </p>
                </div>

                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
                  Your Transcription
                </label>
                <Textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  onPaste={(e) => {
                    e.preventDefault();
                  }}
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  onDrop={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  dir="auto"
                  rows={4}
                  placeholder={
                    sample.language === "Tarifit"
                      ? "Type Tarifit (Latin / Tifinagh)…"
                      : "اكتب ما تسمعه…"
                  }
                  className="resize-none bg-black/30 border-white/10 text-white placeholder:text-white/30 font-mono text-base leading-relaxed focus-visible:ring-cyan-400/40 focus-visible:ring-offset-0"
                />

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/40">
                    {currentAnswer.trim().split(/\s+/).filter(Boolean).length}{" "}
                    words
                  </div>
                  <Button
                    variant="emerald"
                    size="xl"
                    onClick={handleSubmitSample}
                    disabled={currentAnswer.trim().length < 2}
                  >
                    {currentIdx + 1 === samples.length ? (
                      <>
                        <Send /> Submit Final Sample
                      </>
                    ) : (
                      <>
                        Submit & Next <ArrowRight />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* PHASE 3 — Completion */}
          {phase === "done" && (
            <section className="border border-emerald-400/20 bg-emerald-400/[0.04] rounded-md p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="text-emerald-300" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-emerald-300/70 font-mono mb-3">
                Test Complete · Submission Received
              </div>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto">
                You have reached the end of the test.
              </h2>
              <p className="mt-6 text-base md:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
                We confirm that your submission has been received by our{" "}
                <span className="text-emerald-300 font-semibold">
                  Recruitment Department
                </span>
                . We will contact you via your email if you pass with a{" "}
                <span className="text-emerald-300 font-semibold">
                  99% accuracy rate
                </span>
                .
              </p>

              <div className="mt-10 inline-flex flex-col sm:flex-row gap-3">
                <Button variant="outlineLight" size="xl" asChild>
                  <Link to="/">Return Home</Link>
                </Button>
                <Button variant="emerald" size="xl" asChild>
                  <Link to="/insights">
                    Read Insights <ArrowRight />
                  </Link>
                </Button>
              </div>

              <p className="mt-10 text-[11px] font-mono uppercase tracking-[0.25em] text-white/30">
                Candidate: {name} · {language} · {country}
              </p>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestPage;
