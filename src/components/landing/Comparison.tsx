import { Check, Minus, X, Sparkles, Globe2 } from "lucide-react";

type Mark = boolean | "partial" | string;

const ROWS: { criteria: string; why: string; rif: Mark; gen: Mark }[] = [
  { criteria: "Full Specialization in Tarifit", rif: true, gen: false, why: "Built exclusively for Tarifit, while general providers operate across hundreds of languages." },
  { criteria: "Native Tarifit Speakers", rif: true, gen: "partial", why: "Native speakers + specialist reviewers. Quality varies with general providers per project." },
  { criteria: "Dialect Expertise", rif: true, gen: false, why: "Deep knowledge of Central, Eastern, Western, and Beni Znassen dialects." },
  { criteria: "Data Quality", rif: true, gen: "partial", why: "Specialization + multi-stage review for highest possible quality." },
  { criteria: "Resource Concentration", rif: true, gen: false, why: "100% of human and technical resources focused on one language." },
  { criteria: "Independent Packages per Dialect", rif: true, gen: false, why: "Separate packages for each dialect. Buy only what you need." },
  { criteria: "Clear Product Structure", rif: true, gen: false, why: "4 tiers: ASR → Standard → Gold → Platinum. Choose your quality level." },
  { criteria: "Advanced Linguistic Layers", rif: true, gen: "partial", why: "Morphological, syntactic, semantic, cultural, and inferential layers." },
  { criteria: "Custom Resource Production", rif: true, gen: true, why: "Both can. We deliver within a Tarifit-specialized framework." },
  { criteria: "Speed of Resource Development", rif: true, gen: "partial", why: "Full specialization accelerates development by ~30%." },
  { criteria: "Global Reach", rif: false, gen: true, why: "Focused presence in the Rif region. 100% of resources dedicated to Tarifit." },
  { criteria: "Number of Languages Supported", rif: "1", gen: "200+", why: "Depth vs Breadth. We go deep, they go wide." },
];

const COLS_MD = "md:grid-cols-[1.6fr_1fr_1fr]";
const RIF_BAND = "bg-emerald-400/[0.07] md:border-x md:border-emerald-400/15";

const MARK_STYLE = {
  rif: {
    yes: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/40",
    partial: "bg-amber-400/15 text-amber-300 ring-amber-400/40",
    no: "bg-rose-400/15 text-rose-300 ring-rose-400/40",
  },
  gen: {
    yes: "bg-emerald-400/10 text-emerald-200/70 ring-emerald-400/20",
    partial: "bg-amber-400/10 text-amber-200/60 ring-amber-400/20",
    no: "bg-rose-400/10 text-rose-200/50 ring-rose-400/20",
  },
} as const;

type MarkState = "yes" | "partial" | "no";

const MARK_LABEL: Record<MarkState, string> = {
  yes: "Yes",
  partial: "Partial",
  no: "No",
};

function MarkIcon({ state }: { state: MarkState }) {
  if (state === "yes") return <Check size={14} strokeWidth={3} />;
  if (state === "partial") return <Minus size={14} strokeWidth={3} />;
  return <X size={14} strokeWidth={3} />;
}

function markState(value: Mark): MarkState | null {
  if (value === "partial") return "partial";
  if (typeof value === "string") return null;
  return value ? "yes" : "no";
}

function MarkPill({ value, tone }: { value: Mark; tone: "rif" | "gen" }) {
  const state = markState(value);
  if (state === null) {
    return (
      <span
        className={`font-serif-display text-3xl md:text-4xl tracking-[-0.02em] ${
          tone === "rif" ? "text-emerald-300" : "text-white/45"
        }`}
      >
        {value}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 ring-1 ring-inset font-mono text-[11px] tracking-[0.12em] uppercase ${MARK_STYLE[tone][state]}`}
    >
      <MarkIcon state={state} />
      {MARK_LABEL[state]}
    </span>
  );
}

export const Comparison = () => {
  return (
    <section className="relative overflow-hidden py-28 md:py-40 bg-[#0a0a0a] text-[#f5f1ea]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(52,211,153,0.10),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="reveal flex justify-center items-center gap-3 text-[11px] font-mono tracking-[0.22em] uppercase text-[#f5f1ea]/50 mb-10">
          <span className="w-6 h-px bg-[#f5f1ea]/30" />
          Comparison
          <span className="w-6 h-px bg-[#f5f1ea]/30" />
        </div>

        {/* Headline */}
        <h2 className="reveal font-serif-display text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] font-medium mb-5 text-center">
          Specialist <span className="italic text-[#f5f1ea]/45">vs</span> Generalist
        </h2>
        <p className="reveal text-base md:text-lg text-[#f5f1ea]/60 leading-relaxed font-light max-w-2xl mx-auto mb-12 text-center">
          The difference between serving 200 languages and mastering one.
        </p>

        {/* Legend */}
        <div className="reveal flex flex-wrap justify-center items-center gap-x-7 gap-y-3 mb-12 text-[11px] font-mono tracking-[0.14em] uppercase text-[#f5f1ea]/50">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Full support
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Partial
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400" /> Not offered
          </span>
        </div>

        {/* Matrix card */}
        <div className="reveal rounded-3xl ring-1 ring-white/10 bg-white/[0.03] overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
          {/* Header */}
          <div className={`grid grid-cols-2 ${COLS_MD} border-b border-white/10 bg-white/[0.02]`}>
            <div className="hidden md:flex px-5 md:px-10 py-7 items-center font-mono text-[11px] tracking-[0.22em] uppercase text-[#f5f1ea]/45">
              Criteria
            </div>
            <div className={`${RIF_BAND} px-3 py-7 flex flex-col items-center justify-center gap-1.5 text-center`}>
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 text-[#0a0a0a] px-4 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase font-semibold shadow-lg shadow-emerald-500/25">
                <Sparkles size={13} strokeWidth={2.5} />
                RifData
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-300/70">
                The Specialist
              </span>
            </div>
            <div className="px-3 py-7 flex flex-col items-center justify-center gap-1.5 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 text-[#f5f1ea]/60 ring-1 ring-inset ring-white/10 px-4 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase">
                <Globe2 size={13} strokeWidth={2} />
                General Providers
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#f5f1ea]/35">
                The Generalist
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/[0.06]">
            {ROWS.map((row, i) => (
              <div
                key={row.criteria}
                className={`grid grid-cols-1 ${COLS_MD} group transition-colors duration-200 hover:bg-white/[0.03]`}
              >
                {/* Criteria */}
                <div className="px-5 md:px-10 py-6 md:py-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[#f5f1ea]/30 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-medium text-[#f5f1ea] text-[15px] md:text-base leading-snug">
                      {row.criteria}
                    </p>
                  </div>
                  <p className="mt-2 md:pl-8 text-[13px] text-[#f5f1ea]/45 font-light leading-relaxed">
                    {row.why}
                  </p>
                </div>

                {/* Indicators */}
                <div className="grid grid-cols-2 md:contents">
                  {/* RifData */}
                  <div className={`${RIF_BAND} flex flex-col justify-center items-center gap-2 px-2 py-5 md:py-7`}>
                    <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-300/70">
                      RifData
                    </span>
                    <MarkPill value={row.rif} tone="rif" />
                  </div>

                  {/* General */}
                  <div className="flex flex-col justify-center items-center gap-2 px-2 py-5 md:py-7">
                    <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-[#f5f1ea]/35">
                      General
                    </span>
                    <MarkPill value={row.gen} tone="gen" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          <div className="reveal rounded-2xl ring-1 ring-emerald-400/25 bg-emerald-400/[0.07] p-8 md:p-10">
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-emerald-300/80 mb-4">
              RifData · The Specialist
            </div>
            <p className="text-[#f5f1ea]/80 leading-relaxed font-light">
              Full specialization in Tarifit with native experts. Products
              designed specifically for this language and its dialects.
            </p>
          </div>
          <div className="reveal rounded-2xl ring-1 ring-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#f5f1ea]/45 mb-4">
              Global Providers · The Generalist
            </div>
            <p className="text-[#f5f1ea]/60 leading-relaxed font-light">
              Appen, TELUS Digital, OneForma, and CrowdGen offer scale, global
              reach, and large resources. Ideal for 200+ languages.
            </p>
          </div>
        </div>

        <p className="reveal mt-12 pt-8 border-t border-white/10 text-center text-[#f5f1ea]/60 font-light">
          Our goal: Produce linguistic resources with unmatched accuracy and
          depth for institutions that need professional Tarifit data.
        </p>
      </div>
    </section>
  );
};

export default Comparison;
