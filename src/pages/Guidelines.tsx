import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, FileText } from "lucide-react";

const sections = [
  {
    number: "1.1",
    title: "The Golden Rule — Verbatim Fidelity",
    body: "Transcribe exactly what is said. Preserve hesitations, repetitions, and dialectal forms. Do not standardize, paraphrase, or 'correct' the speaker. The recording is the source of truth — your text must mirror it.",
  },
  {
    number: "1.2",
    title: "Tagging — Non-Verbal & Ambiguous Events",
    body: "Use the tag system for everything that is not a clean spoken word: [laughter], [cough], [pause], [music], [unintelligible], [noise]. Foreign code-switches must be marked with [fr: ...] or [en: ...]. Never invent words to fill an unintelligible gap.",
  },
  {
    number: "1.3",
    title: "Environment — Quiet, Honest, Manual",
    body: "Work in a quiet space with headphones. Listen to each clip twice before typing. The use of automated transcription tools, speech-to-text engines, or AI assistants of any kind is strictly forbidden and grounds for permanent disqualification.",
  },
];

const GuidelinesPage = () => {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#ece9e2]">
      <Header />
      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <div className="container max-w-3xl">
          {/* Paper sheet */}
          <article
            className="bg-[#fdfcf8] border border-black/5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25),0_8px_20px_-8px_rgba(0,0,0,0.15)] rounded-sm relative"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {/* Document header */}
            <header className="border-b border-black/10 px-8 md:px-16 py-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-black/60" strokeWidth={1.5} />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-black/50 font-sans font-semibold">
                    Internal Document
                  </div>
                  <div className="text-sm font-bold text-black tracking-tight">
                    RIFDATA QUALITY MANUAL v1.0
                  </div>
                </div>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-sans hidden sm:block">
                Confidential
              </div>
            </header>

            {/* Body */}
            <div className="px-8 md:px-16 py-12 md:py-16">
              <div className="text-[11px] uppercase tracking-[0.3em] text-black/50 font-sans font-semibold mb-4">
                Chapter 1 · Core Standards
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-black leading-[1.1] tracking-tight mb-6">
                The principles every<br />transcriber must respect.
              </h1>
              <p className="text-[15px] md:text-base text-black/70 leading-relaxed italic border-l-2 border-black/20 pl-5 mb-12">
                This manual defines the minimum quality bar for all RifData
                contributors. Read it carefully — your acknowledgement is binding,
                and forms the basis for the qualification test that follows.
              </p>

              <div className="space-y-12">
                {sections.map((s) => (
                  <section key={s.number}>
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-2xl font-bold text-black/30 tabular-nums">
                        {s.number}
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-snug">
                        {s.title}
                      </h2>
                    </div>
                    <p className="text-[15px] md:text-base text-black/75 leading-[1.8] pl-10">
                      {s.body}
                    </p>
                  </section>
                ))}
              </div>

              {/* Signature block */}
              <div className="mt-16 pt-8 border-t border-black/10">
                <label
                  htmlFor="ack"
                  className="flex items-start gap-4 p-5 border border-black/15 bg-black/[0.02] cursor-pointer hover:bg-black/[0.04] transition-colors rounded-sm"
                >
                  <Checkbox
                    id="ack"
                    checked={acknowledged}
                    onCheckedChange={(v) => setAcknowledged(v === true)}
                    className="mt-0.5 border-black/40 data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                  <span className="text-sm text-black leading-relaxed">
                    <span className="font-bold">Acknowledgement.</span> I have
                    read and understood the RifData Quality Manual v1.0 in its
                    entirety, and I commit to upholding every principle stated above.
                  </span>
                </label>

                <div className="mt-8 flex justify-end">
                  <Button
                    variant="navy"
                    size="xl"
                    asChild={acknowledged}
                    disabled={!acknowledged}
                    className="font-sans"
                  >
                    {acknowledged ? (
                      <Link to="/compliance">
                        I confirm reading the manual, proceed to Compliance
                        <ArrowRight />
                      </Link>
                    ) : (
                      <span>
                        I confirm reading the manual, proceed to Compliance
                        <ArrowRight />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-black/10 px-8 md:px-16 py-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-black/40 font-sans">
              <span>RifData · Quality Standards</span>
              <span>Page 1 / 1</span>
            </footer>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuidelinesPage;
