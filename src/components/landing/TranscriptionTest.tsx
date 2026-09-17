import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, CheckCircle2, XCircle, ArrowRight, Headphones, Languages, Timer, Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

// ============================================================================
// SUBMISSION ENDPOINT
// ----------------------------------------------------------------------------
// Replace this with your own Webhook URL (Zapier, Make, n8n, your backend, etc.)
// Results POSTed as JSON: { candidate, samples[], averageScore, passed, submittedAt }
// If left empty, the Submit button will display the JSON for manual collection.
// ============================================================================
const SUBMISSION_WEBHOOK_URL = "";

const QUALIFICATION_FORM_URL = "https://forms.gle/your-qualification-form";

type Sample = {
  id: number;
  language: "Tarifit" | "Moroccan Darija";
  reference: string;
  hint: string;
};

// Reference transcripts representing what the candidate hears.
// Browsers without the requested voice will fall back to default TTS;
// the test still measures transcription discipline.
const SAMPLES: Sample[] = [
  {
    id: 1,
    language: "Moroccan Darija",
    reference: "السلام عليكم، أنا فرحان باش نخدم معاكم في هاد المشروع الجديد",
    hint: "A short Darija greeting and intent statement.",
  },
  {
    id: 2,
    language: "Tarifit",
    reference: " azul fellawen, mamec tellam assa di taddart",
    hint: "A common Tarifit greeting (Latin transliteration accepted).",
  },
  {
    id: 3,
    language: "Moroccan Darija",
    reference: "غادي نمشي للسوق نشري الخبز والحليب من بعد نرجع للدار",
    hint: "Daily routine sentence with common nouns.",
  },
];

// Normalize Arabic & Latin text for fair comparison
const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "") // Arabic diacritics
    .replace(/[إأآا]/g, "ا")
    .replace(/[ىي]/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const wordAccuracy = (ref: string, ans: string) => {
  const r = normalize(ref).split(" ").filter(Boolean);
  const a = normalize(ans).split(" ").filter(Boolean);
  if (r.length === 0) return 0;
  const aSet = new Set(a);
  const matched = r.filter((w) => aSet.has(w)).length;
  return Math.round((matched / r.length) * 100);
};

export const TranscriptionTest = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(SAMPLES.map(() => ""));
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState<boolean[]>(SAMPLES.map(() => false));
  const [submitted, setSubmitted] = useState(false);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [sendState, setSendState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [sendMessage, setSendMessage] = useState("");
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const sample = SAMPLES[step];
  const isLast = step === SAMPLES.length - 1;
  const progress = ((step + (submitted ? 1 : 0)) / SAMPLES.length) * 100;

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  const handlePlay = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(sample.reference);
    u.lang = sample.language === "Moroccan Darija" ? "ar-MA" : "ar";
    u.rate = 0.95;
    u.onend = () => {
      setPlaying(false);
      setPlayed((p) => p.map((v, i) => (i === step ? true : v)));
    };
    u.onerror = () => setPlaying(false);
    utterRef.current = u;
    window.speechSynthesis.speak(u);
    setPlaying(true);
  };

  const handlePause = () => {
    window.speechSynthesis?.cancel();
    setPlaying(false);
  };

  const handleNext = () => {
    if (isLast) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStep((s) => s + 1);
      window.speechSynthesis?.cancel();
      setPlaying(false);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers(SAMPLES.map(() => ""));
    setPlayed(SAMPLES.map(() => false));
    setSubmitted(false);
    setCandidateName("");
    setCandidateEmail("");
    setSendState("idle");
    setSendMessage("");
    window.speechSynthesis?.cancel();
  };

  const handleSubmitResults = async () => {
    const payload = {
      candidate: {
        name: candidateName.trim(),
        email: candidateEmail.trim(),
      },
      samples: SAMPLES.map((s, i) => ({
        id: s.id,
        language: s.language,
        reference: s.reference,
        answer: answers[i],
        score: wordAccuracy(s.reference, answers[i]),
      })),
      averageScore: Math.round(
        SAMPLES.map((s, i) => wordAccuracy(s.reference, answers[i]))
          .reduce((a, b) => a + b, 0) / SAMPLES.length,
      ),
      passed:
        Math.round(
          SAMPLES.map((s, i) => wordAccuracy(s.reference, answers[i]))
            .reduce((a, b) => a + b, 0) / SAMPLES.length,
        ) >= 80,
      submittedAt: new Date().toISOString(),
      source: "rifdata-transcription-test",
    };

    setSendState("sending");
    setSendMessage("");

    // No webhook configured → copy JSON to clipboard for manual collection
    if (!SUBMISSION_WEBHOOK_URL) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
        setSendState("success");
        setSendMessage(
          "No webhook is configured yet — your results were copied to clipboard. Paste them into your collection channel, or set SUBMISSION_WEBHOOK_URL in TranscriptionTest.tsx.",
        );
      } catch {
        setSendState("error");
        setSendMessage(
          "Could not copy to clipboard. Configure SUBMISSION_WEBHOOK_URL in TranscriptionTest.tsx to send results automatically.",
        );
      }
      return;
    }

    try {
      const res = await fetch(SUBMISSION_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSendState("success");
      setSendMessage("Your results have been submitted successfully.");
    } catch (err) {
      setSendState("error");
      setSendMessage(
        `Submission failed: ${err instanceof Error ? err.message : "network error"}. Please try again.`,
      );
    }
  };

  const scores = SAMPLES.map((s, i) => wordAccuracy(s.reference, answers[i]));
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const passed = avg >= 80;

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card shadow-card-soft p-8 md:p-12">
        <div className="flex items-start gap-4 mb-8">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${
              passed ? "bg-emerald-500/10" : "bg-red-500/10"
            }`}
          >
            {passed ? (
              <CheckCircle2 size={28} className="text-emerald-600" />
            ) : (
              <XCircle size={28} className="text-red-600" />
            )}
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-brand">
              Result · Self-assessment
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mt-1">
              {passed
                ? "Strong performance — you may proceed."
                : "Below threshold — review and try again."}
            </h3>
            <p className="mt-2 text-slate-brand">
              Average word-level accuracy:{" "}
              <span className="font-bold text-primary">{avg}%</span> · Pass mark: 80%
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {SAMPLES.map((s, i) => (
            <div key={s.id} className="p-5 rounded-xl border border-border bg-muted/40">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs uppercase tracking-wider font-semibold text-slate-brand">
                  Sample {i + 1} · {s.language}
                </div>
                <div
                  className={`text-sm font-bold ${
                    scores[i] >= 80 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {scores[i]}%
                </div>
              </div>
              <div className="text-sm space-y-2">
                <div>
                  <span className="text-slate-brand">Reference:</span>{" "}
                  <span className="text-primary font-medium" dir="auto">{s.reference}</span>
                </div>
                <div>
                  <span className="text-slate-brand">Your answer:</span>{" "}
                  <span className="text-foreground" dir="auto">
                    {answers[i] || <em className="text-slate-brand/60">— empty —</em>}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Candidate identity + Submit destination */}
        <div className="rounded-xl border border-border bg-muted/30 p-5 md:p-6 mb-6">
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-brand mb-3">
            Submit your results
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1.5">
                Full name
              </label>
              <Input
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g. Yassine El Amrani"
                disabled={sendState === "sending" || sendState === "success"}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary mb-1.5">
                Email
              </label>
              <Input
                type="email"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={sendState === "sending" || sendState === "success"}
              />
            </div>
          </div>

          {sendState === "success" && (
            <div className="mt-4 flex items-start gap-2 text-sm text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              <span>{sendMessage || "Your results have been submitted."}</span>
            </div>
          )}
          {sendState === "error" && (
            <div className="mt-4 flex items-start gap-2 text-sm text-red-700 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{sendMessage || "Submission failed. Please try again."}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="navy"
            size="xl"
            onClick={handleSubmitResults}
            disabled={
              sendState === "sending" ||
              sendState === "success" ||
              candidateName.trim().length < 2 ||
              !/^\S+@\S+\.\S+$/.test(candidateEmail)
            }
          >
            {sendState === "sending" ? (
              <>
                <Loader2 className="animate-spin" />
                Sending…
              </>
            ) : sendState === "success" ? (
              <>
                <CheckCircle2 />
                Results Submitted
              </>
            ) : (
              <>
                <Send />
                Submit Test Results
              </>
            )}
          </Button>

          {passed && sendState === "success" && (
            <Button variant="outline" size="xl" asChild>
              <a href={QUALIFICATION_FORM_URL} target="_blank" rel="noopener noreferrer">
                Open Application Form
                <ArrowRight />
              </a>
            </Button>
          )}

          <Button variant="ghost" size="xl" onClick={reset}>
            <RotateCcw />
            Retake the Test
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-card-soft p-4 sm:p-6 md:p-10">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs uppercase tracking-wider font-semibold text-slate-brand">
          Sample {step + 1} of {SAMPLES.length}
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/5 px-2.5 py-1 rounded-full">
          <Languages size={12} />
          {sample.language}
        </div>
      </div>
      <Progress value={progress} className="h-1.5 mb-8" />

      <div className="bg-muted/40 border border-border rounded-xl p-6 md:p-8 mb-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={playing ? handlePause : handlePlay}
            className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
            aria-label={playing ? "Pause audio" : "Play audio"}
          >
            {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Headphones size={14} />
              Listen to the audio sample
            </div>
            <div className="text-xs text-slate-brand mt-1">
              {sample.hint} · You may replay as needed.
            </div>
          </div>
          {played[step] && (
            <div className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
              <CheckCircle2 size={14} /> Played
            </div>
          )}
        </div>
      </div>

      <label className="block text-sm font-semibold text-primary mb-2">
        Type the transcription exactly as you hear it
      </label>
      <Textarea
        value={answers[step]}
        onChange={(e) =>
          setAnswers((a) => a.map((v, i) => (i === step ? e.target.value : v)))
        }
        placeholder={
          sample.language === "Tarifit"
            ? "Tarifit — Latin transliteration or Tifinagh accepted…"
            : "اكتب ما تسمعه بالضبط…"
        }
        dir="auto"
        rows={5}
        className="resize-none text-lg md:text-xl leading-relaxed py-4"
      />

      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-brand">
        <Timer size={12} />
        Aim for word-perfect accuracy. Punctuation is not graded.
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setStep((s) => Math.max(0, s - 1));
            window.speechSynthesis?.cancel();
            setPlaying(false);
          }}
          disabled={step === 0}
        >
          Previous
        </Button>
        <Button
          variant="navy"
          size="lg"
          onClick={handleNext}
          disabled={!played[step] || answers[step].trim().length < 3}
        >
          {isLast ? "Submit Test" : "Next Sample"}
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
