import { Search, Globe2, Headphones } from "lucide-react";

const PILLARS = [
  {
    icon: Search,
    title: "Expert linguistic auditing",
    body: "Rifian Language Specialists, not just data collectors. Our teams are locals who speak the dialect itself, and document it with its cultural context. Result: High-accuracy data you won't get from freelancers or scraping.",
  },
  {
    icon: Globe2,
    title: "Cultural immersion",
    body: "Our teams live in the regions they document. Every recording is tagged with the social and historical context behind the words — not just the words themselves. This gives AI models real-world accuracy that scraping can't match.",
  },
  {
    icon: Headphones,
    title: "High-fidelity collection",
    body: "48kHz lossless audio with full metadata. Ready for fine-tuning out of the box — no cleaning, no extra processing needed. Built to meet the quality bar of frontier AI labs from day one.",
  },
];

// ===== ICONS - ألوان جذابة بحال المواقع العالمية =====
const CheckIcon = ({ muted = false }: { muted?: boolean }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${muted ? 'bg-emerald-100' : 'bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/30'}`}>
    <svg className={`w-5 h-5 ${muted ? 'text-emerald-600' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const XIcon = ({ muted = false }: { muted?: boolean }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${muted ? 'bg-rose-100' : 'bg-gradient-to-br from-rose-400 to-red-500 shadow-lg shadow-rose-500/30'}`}>
    <svg className={`w-5 h-5 ${muted ? 'text-rose-600' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
);

const PartialIcon = ({ muted = false }: { muted?: boolean }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${muted ? 'bg-amber-100' : 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30'}`}>
    <svg className={`w-5 h-5 ${muted ? 'text-amber-600' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874.949-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  </div>
);

export default function Capabilities() {
  return (
    <section className="py-28 md:py-40 text-[#1a1a1a] border-t border-[#1a1a1a]/10 bg-[#f5f1ea]">

      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="reveal flex items-center gap-3 text-xs font-mono tracking-[0.22em] uppercase text-[#6a6a6a] mb-10">
          <span className="w-6 h-px bg-[#1a1a1a]/30" />
          THE RIFDATA CONSTITUTION
        </div>

        {/* Headline */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-20 md:mb-28">
          <h2 className="reveal md:col-span-7 font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] font-medium">
            Three pillars.
            <br />
            <span className="italic text-[#6a6a6a]">
              One standard for serious AI.
            </span>
          </h2>
          <p className="reveal md:col-span-4 md:col-start-9 text-base md:text-lg text-[#4a4a4a] leading-relaxed font-light">
            We exist to deliver the most accurate, ethical, and culturally-grounded
            speech datasets for the world's most demanding AI teams. These are the
            principles every dataset we ship is measured against.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-3 border-t border-[#1a1a1a]/10">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <article
              key={title}
              className={`reveal py-12 md:py-14 md:px-10 group transition-colors duration-300 hover:bg-[#ece8e0]/60 ${
                i > 0? "md:border-l border-[#1a1a1a]/10" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-xs tracking-[0.22em] text-[#6a6a6a]">
                  0{i + 1}
                </span>
                <Icon size={20} strokeWidth={1.5} className="text-[#4a4a4a] group-hover:text-[#1a1a1a] transition-colors" />
              </div>
              <h3 className="font-serif-display text-2xl md:text-3xl leading-tight tracking-[-0.01em]">
                {title}
              </h3>
              <p className="mt-5 text-[#4a4a4a] leading-relaxed text-sm font-light">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Quote + Video block */}
      <div className="max-w-7xl mx-auto px-6 mt-24 md:mt-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Quote */}
          <div className="reveal lg:col-span-3">
            <div className="w-8 h-px bg-[#1a1a1a]/20 mb-6" />
            <blockquote className="font-serif-display text-2xl md:text-3xl italic leading-[1.3] tracking-[-0.01em] text-[#1a1a1a]">
              "Languages aren't datasets. They're inheritances. We treat them
              with the precision of engineers and the respect of their speakers."
            </blockquote>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] font-mono text-[#6a6a6a]">
              — RifData
            </p>
          </div>

          {/* Video */}
          <div className="reveal lg:col-span-9">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#0a0a0a] shadow-[0_24px_80px_-20px_rgba(10,10,10,0.3)]">
              <video
                src="/videos/consent-process.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 font-mono text-xs tracking-[0.22em] uppercase text-white/60">
                Consent &amp; Collection Process
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PREMIUM COMPARISON SECTION - FINAL ===== */}
      <div className="max-w-5xl mx-auto px-6 mt-24 md:mt-32 border-t border-[#1a1a1a]/10 pt-24 md:pt-32">

        {/* Eyebrow */}
        <div className="reveal flex justify-center items-center gap-3 text-xs font-mono tracking-[0.22em] uppercase text-[#6a6a6a] mb-10">
          <span className="w-6 h-px bg-[#1a1a1a]/30" />
          COMPARISON
          <span className="w-6 h-px bg-[#1a1a1a]/30" />
        </div>

        {/* Headline */}
        <h2 className="reveal font-serif-display text-4xl md:text-5xl leading-[1.1] tracking-[-0.02em] font-medium mb-4 text-center">
          Specialist vs Generalist
        </h2>
        <p className="reveal text-lg text-[#4a4a4a] leading-relaxed font-light max-w-2xl mx-auto mb-16 text-center">
          The difference between serving 200 languages and mastering one.
        </p>

        {/* Premium Card Table */}
        <div className="reveal bg-white border-[#1a1a1a]/10 rounded-3xl shadow-[0_20px_80px_-30px_rgba(26,26,26,0.12)] overflow-hidden">
         
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-6 px-6 md:px-10 py-7 bg-[#0a0a0a] text-white">
            <div className="font-mono text-xs tracking-[0.22em] uppercase">Criteria</div>
            <div className="text-center font-mono text-xs tracking-[0.22em] uppercase">
              <span className="bg-white text-black px-4 py-1.5 rounded-lg font-semibold">RifData</span>
            </div>
            <div className="text-center font-mono text-xs tracking-[0.22em] uppercase text-white/60">
              General Providers
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#1a1a1a]/8">
            {[
              {criteria: "Full Specialization in Tarifit", rif: true, gen: false, why: "Built exclusively for Tarifit, while general providers operate across hundreds of languages."},
              {criteria: "Native Tarifit Speakers", rif: true, gen: "partial", why: "Native speakers + specialist reviewers. Quality varies with general providers per project."},
              {criteria: "Dialect Expertise", rif: true, gen: false, why: "Deep knowledge of Central, Eastern, Western, and Beni Znassen dialects."},
              {criteria: "Data Quality", rif: true, gen: "partial", why: "Specialization + multi-stage review for highest possible quality."},
              {criteria: "Resource Concentration", rif: true, gen: false, why: "100% of human and technical resources focused on one language."},
              {criteria: "Independent Packages per Dialect", rif: true, gen: false, why: "Separate packages for each dialect. Buy only what you need."},
              {criteria: "Clear Product Structure", rif: true, gen: false, why: "4 tiers: ASR → Standard → Gold → Platinum. Choose your quality level."},
              {criteria: "Advanced Linguistic Layers", rif: true, gen: "partial", why: "Morphological, syntactic, semantic, cultural, and inferential layers."},
              {criteria: "Custom Resource Production", rif: true, gen: true, why: "Both can. We deliver within a Tarifit-specialized framework."},
              {criteria: "Speed of Resource Development", rif: true, gen: "partial", why: "Full specialization accelerates development by ~30%."},
              {criteria: "Global Reach", rif: false, gen: true, why: "Focused presence in the Rif region. 100% of resources dedicated to Tarifit."},
              {criteria: "Number of Languages Supported", rif: "1", gen: "200+", why: "Depth vs Breadth. We go deep, they go wide."},
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 gap-6 px-6 md:px-10 py-8 hover:bg-[#f5f1ea] transition-colors duration-200">
               
                {/* Criteria */}
                <div>
                  <p className="font-medium text-[#1a1a1a] text-base mb-2">{row.criteria}</p>
                  <p className="text-sm text-[#6a6a6a] font-light leading-relaxed">{row.why}</p>
                </div>

                {/* RifData */}
                <div className="flex justify-center items-center pt-1 bg-emerald-50/40 rounded-xl">
                  {row.rif === true && <CheckIcon />}
                  {row.rif === false && <XIcon />}
                  {row.rif === "partial" && <PartialIcon />}
                  {typeof row.rif === "string" && <span className="font-mono text-sm font-semibold bg-[#1a1a1a] text-white px-4 py-1.5 rounded-lg">{row.rif}</span>}
                </div>

                {/* General */}
                <div className="flex justify-center items-center pt-1">
                  {row.gen === true && <CheckIcon muted />}
                  {row.gen === false && <XIcon muted />}
                  {row.gen === "partial" && <PartialIcon muted />}
                  {typeof row.gen === "string" && <span className="font-mono text-sm font-semibold text-[#6a6a6a] px-4 py-1.5">{row.gen}</span>}
                </div>

              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="px-6 md:px-10 py-12 bg-[#ece8e0] border-t border-[#1a1a1a]/10">
            <p className="font-serif-display text-2xl mb-4 text-center">The Bottom Line</p>
            <div className="grid md:grid-cols-2 gap-8 text-[#4a4a4a] font-light leading-relaxed max-w-4xl mx-auto">
              <div>
                <p className="font-semibold text-[#1a1a1a] mb-2">Global Providers</p>
                <p>Appen, TELUS Digital, OneForma, and CrowdGen offer scale, global reach, and large resources. Ideal for 200+ languages.</p>
              </div>
              <div>
                <p className="font-semibold text-[#1a1a1a] mb-2">RifData</p>
                <p>Full specialization in Tarifit with native experts. Products designed specifically for this language and its dialects.</p>
              </div>
            </div>
            <p className="mt-8 pt-6 border-t border-[#1a1a1a]/10 text-[#4a4a4a] text-center">
              Our goal: Produce linguistic resources with unmatched accuracy and depth for institutions that need professional Tarifit data.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}