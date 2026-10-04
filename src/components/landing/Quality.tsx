import { Waves, VolumeX, Ban, CheckCircle2, FileJson, Layers, ShieldCheck, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { JsonHighlight } from "@/components/JsonHighlight";

const standards = [
  {
    icon: Waves,
    spec: "48kHz / 24-bit",
    title: "Studio-Level WAV",
    description: "Every file delivered in uncompressed 48kHz/24-bit WAV — the broadcast and ML production standard."
  },
  {
    icon: VolumeX,
    spec: "Zero noise floor",
    title: "Pristine acoustics",
    description: "Recordings captured in acoustically treated rooms with sub-30dB ambient noise floor policy."
  },
  {
    icon: Ban,
    spec: "No post-processing",
    title: "Strictly untouched",
    description: "No noise reduction, no compression, no EQ. We deliver raw signal so your models learn the truth."
  },
];

const verificationStages = [
  { step: "01", icon: Eye, title: "Native linguist review", description: "Each transcription is first checked by a native Tarifit or Darija linguist for spelling, dialect accuracy, and contextual fidelity." },
  { step: "02", icon: Layers, title: "Cross-annotator agreement", description: "A second independent annotator re-transcribes the same audio. We measure inter-annotator agreement (IAA) and resolve every conflict." },
  { step: "03", icon: ShieldCheck, title: "Senior QA sign-off", description: "A senior QA lead audits a stratified sample of every batch. Nothing ships until it clears the 99%+ accuracy threshold." },
];

/**
 * Sample payload shown in the "Delivery format" terminal.
 * Rendered with VS Code Dark+ colors by <JsonHighlight />.
 */
const deliverySample = `{
  "sample_id": "RIF_HOC_CENTRAL_000031",
  "language": "Tarifit",
  "dialect": "Central Rif",
  "region": "Al Hoceima",
  "transcription": {
    "text_rlts": "Ma Anahwa Gha Rmoyyi Nigh Anrah Gha Woghzar",
    "translation_ar": "هل سننزل إلى الميناء أم سنذهب إلى الوادي",
    "translation_en": "Are we going down to the harbor or going to the valley?"
  },
  "morphology": {
    "tokens": ["Ma","Anahwa","Gha","Rmoyyi","Nigh","Anrah","Gha","Woghzar"]
  },
  "syntax": {
    "sentence_type": "Alternative question",
    "subject": "Implicit",
    "predicate": "Anrah",
    "objects": ["Rmoyyi","Woghzar"]
  },
  "semantic_context": {
    "geographical_expression": true,
    "cultural_context": "Mountain-to-coast movement."
  },
  "quality_status": "human_verified"
}`;

export const Quality = () => {
  return (
    <section id="quality" className="py-28 md:py-40 bg-[#f5f1ea] text-[#0a0a0a]">
      <div className="container">
        {/* Eyebrow */}
        <div className="reveal flex items-center gap-3 text-[11px] font-mono tracking-[0.22em] uppercase text-[#0a0a0a]/55 mb-10">
          <span className="w-6 h-px bg-[#0a0a0a]/30" />
          The 0.1% error shield
        </div>

        {/* Headline */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-20 md:mb-28">
          <h2 className="reveal md:col-span-7 font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] font-medium">
            Quality is not a feature.
            <br />
            <span className="italic text-[#0a0a0a]/45">
              It's the entire product.
            </span>
          </h2>
          <p className="reveal md:col-span-4 md:col-start-9 text-base md:text-lg text-[#0a0a0a]/65 leading-relaxed font-light">
            When billion-parameter models depend on your data, "good enough" is
            a liability. We engineer for zero error tolerance — at every layer.
          </p>
        </div>

        {/* Audio standards — hairline grid */}
        <div className="grid md:grid-cols-3 border-t border-[#0a0a0a]/10 mb-24 md:mb-32">
          {standards.map((std, i) => {
            const Icon = std.icon;
            return (
              <div
                key={std.title}
                className={`reveal py-12 md:py-14 md:px-10 ${i > 0? "md:border-l border-[#0a0a0a]/10" : ""}`}
              >
                <Icon size={22} strokeWidth={1.4} className="text-[#0a0a0a]/70 mb-8" />
                <div className="font-serif-display text-3xl md:text-4xl tracking-[-0.01em]">{std.spec}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.22em] font-mono text-[#0a0a0a]/45">
                  {std.title}
                </div>
                <p className="mt-6 text-[#0a0a0a]/65 leading-relaxed font-light text-[15px]">
                  {std.description}
                </p>

                {/* الرابط الأزرق غير للبلوك الثالث */}
                {std.spec === "No post-processing" && (
                  <Link
                    to="/quality-samples"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-mono text-xs mt-6 transition-colors group"
                  >
                    <span>// LISTEN RAW SAMPLE →</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Verification stages */}
        <div className="reveal flex items-center gap-3 text-[11px] font-mono tracking-[0.22em] uppercase text-[#0a0a0a]/55 mb-8">
          <span className="w-6 h-px bg-[#0a0a0a]/30" />
          Multi-stage verification
        </div>
        <h3 className="reveal font-serif-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-16 max-w-3xl">
          Three independent reviews.{" "}
          <span className="italic text-[#0a0a0a]/45">One verdict: ship-ready.</span>
        </h3>

        <div className="grid md:grid-cols-3 border-t border-[#0a0a0a]/10 mb-24 md:mb-32">
          {verificationStages.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className={`reveal py-12 md:py-14 md:px-10 ${i > 0? "md:border-l border-[#0a0a0a]/10" : ""}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[11px] tracking-[0.22em] text-[#0a0a0a]/45">
                    STAGE {s.step}
                  </span>
                  <Icon size={20} strokeWidth={1.4} className="text-[#0a0a0a]/70" />
                </div>
                <h4 className="font-serif-display text-2xl md:text-3xl leading-tight tracking-[-0.01em]">{s.title}</h4>
                <p className="mt-5 text-[#0a0a0a]/65 leading-relaxed font-light text-[15px]">{s.description}</p>
              </div>
            );
          })}
        </div>

        {/* JSON delivery split */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal">
            <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.22em] uppercase text-[#0a0a0a]/55 mb-8">
              <FileJson size={14} className="text-[#0a0a0a]/60" />
              Delivery format
            </div>
            <h3 className="font-serif-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
              Structured JSON.{" "}
              <span className="italic text-[#0a0a0a]/45">AI-ready out of the box.</span>
            </h3>
            <p className="mt-6 text-[#0a0a0a]/65 leading-relaxed font-light max-w-lg">
              Every transcription is delivered in a strict, schema-validated
              JSON format — timestamps, speaker IDs, dialect tags, confidence
              scores, and IPA when requested. Plug it directly into your
              training pipeline.
            </p>
            <ul className="mt-8 space-y-3 text-[15px] text-[#0a0a0a]/70 font-light">
              {[
                "Timestamped utterance segments (ms-precision)",
                "Speaker diarization & dialect labels",
                "Optional IPA phonetic layer",
                "JSON Schema published & versioned",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#0a0a0a]/55 mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <div className="rounded-2xl bg-[#0a0a0a] text-[#f5f1ea] p-6 md:p-8 font-mono text-[12px] md:text-[13px] leading-relaxed overflow-x-auto">
              <div className="flex items-center gap-2 mb-5 text-white/40 text-[10px] tracking-[0.22em] uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                transcript.json
              </div>
<pre className="whitespace-pre">
                <JsonHighlight code={deliverySample} />
              </pre>
            </div>
            <div className="flex justify-end pt-3 pr-1">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // Open the same quality gateway modal as the header button
                  const evt = new CustomEvent("rifdata:open-quality-gateway");
                  window.dispatchEvent(evt);
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 group"
              >
                json view high-quality schemas
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          </div>
        {/* Footer stats — hairline */}
        <div className="mt-24 md:mt-32 pt-12 border-t border-[#0a0a0a]/10 grid md:grid-cols-4 gap-10 md:gap-6 mb-16 justify-center text-center">
          {[
            ["100%", "Native speakers"],
            ["3-Stage", "QA pipeline"],
            ["GDPR", "Compliant by design"],
            ["24/7", "Project monitoring"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="font-serif-display text-3xl md:text-4xl tracking-[-0.01em]">{value}</div>
              <div className="mt-2 text-xs text-[#0a0a0a]/55 font-light">{label}</div>
            </div>
          ))}
        </div>

        {/* الزر اللي كيدي للصفحة الكاملة */}
        <div className="reveal text-center pt-8 border-t border-[#0a0a0a]/10">
          <button
            type="button"
            onClick={() => {
              const evt = new CustomEvent("rifdata:open-quality-gateway");
              window.dispatchEvent(evt);
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0a0a0a] text-[#f5f1ea] font-mono text-xs tracking-[0.22em] uppercase hover:bg-[#0a0a0a]/90 transition-colors"
          >
            View Full 8-Stage Process
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};