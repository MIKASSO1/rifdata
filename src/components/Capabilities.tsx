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

    </section>
  );
}