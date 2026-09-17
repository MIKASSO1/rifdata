import { Tags, Brain, Map, Languages, ShieldAlert, ArrowUpRight, Database, Target, Mic, Filter, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const specializations = [
  {
    id: "01",
    icon: Target,
    title: "Linguistic & Cultural Grounding",
    description:
      "Aligning model outputs with local cultural context to mitigate hallucinations. Resolving semantic variance in terms like 'descending' by mapping them to their Rif-specific denotation: downward movement toward the Mediterranean coast, or any sloped terrain.",
  },
  {
    id: "02",
    icon: Mic,
    title: "We Source, Not Scrape",
    description:
      "Native teams specialize in Riffian. We capture real voices on-site across the Rif with scripted prompts. Others scrape the web, we collect clean speech from the source.",
  },
  {
    id: "03",
    icon: MapPin,
    title: "Hyperlocal Tribal Segmentation",
    description:
      "Partitioning data into tribal and geographic variants covering all villages and cities across the Rif region. This fine-grained stratification equips speech models with targeted phonetic diversity, enabling robust performance in local dialects and speech recognition.",
  },
  {
    id: "04",
    icon: Languages,
    title: "Native Phonetic Transcription",
    description:
     "Letter by letter, sound by sound. We document Tarifit as it’s spoken, not as it’s written. Every `q`, `ð`, and `ɣ` gets its IPA so the AI speaks like a son of the Rif, not a translation bot.",
  },
  {
    id: "05",  
    icon: Filter,     
    title: "Error-Repetition Filtering",
    description:
      "Maximizing training compute efficiency through strict diversity constraints. Automated filters eliminate syntactic redundancy and repeated phrases, ensuring every megabyte delivers unique lexical density at lower optimization cost.",
  },
  {
    id: "06",
    icon: Database,
    code: "SAFE.MA",
    title: "Rif Data Ownership",  
    description:
      "We are a Moroccan linguistic data production company licensed by Moroccan authorities. All data is produced in the Moroccan Rif region. We protect user privacy and keep full legal control with our partners.",
  },
];

export const Services = () => {
  return (
    <section
      id="services"
      className="py-28 md:py-40 bg-[#0a0a0a] text-[#f5f1ea] relative overflow-hidden"
    >
      <div className="container">
        {/* Eyebrow */}
        <div className="reveal flex items-center gap-3 text-xs font-mono tracking-[0.22em] uppercase text-white/45 mb-10">
          <span className="w-6 h-px bg-white/30" />
          OUR CRAFT
        </div>

        {/* Headline split */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start mb-20 md:mb-28">
          <h2 className="reveal md:col-span-8 font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
            Voices that build
             <br />
             <span className="italic text-white/45">
               intelligent systems.
             </span>
           </h2>
             <p className="reveal md:col-span-4 text-base md:text-lg text-white/60 leading-relaxed font-light md:mt-2">
              MSA models break on Moroccan dialects, especially low-resource ones like Rifian.
              We engineer accent-specific NER and IPA, trained on native speech with constant field presence.
              Every utterance is tagged with full regional and social context by rural linguistics specialists.
              Result: research-grade data that pushes model performance to peak standards.
              For dialects global vendors struggle to access or replicate easily.
              <br /><br />
              The result: research-grade linguistic data for low-resource dialects that global vendors can't access.
         </p>
        </div>

        {/* Hairline-grid feature list */}
        <div className="border-t border-white/10">
          {specializations.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <article
                key={spec.id}
                className="reveal grid md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-b border-white/10 group"
              >
                <div className="md:col-span-2 flex items-center gap-4">
                  <span className="font-mono text-xs tracking-[0.22em] text-white/40">
                    {spec.id}
                  </span>
                  <Icon size={22} strokeWidth={1.4} className="text-white/70" />
                </div>
                <h3 className="md:col-span-5 font-serif-display text-2xl md:text-3xl leading-tight tracking-[-0.01em]">
                  {spec.title}
                </h3>
                <p className="md:col-span-4 text-base text-white/60 leading-relaxed font-light">
                  {spec.description}
                </p>
                <div className="md:col-span-1 flex md:justify-end items-start">
                  <span className="font-mono text-xs tracking-[0.22em] text-white/35">
                    {spec.code}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer CTA strip */}
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <span className="font-mono text-xs tracking-[0.22em] text-white/35 uppercase">
            // Capability Matrix · v3.0
          </span>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#f5f1ea] text-[#0a0a0a] text-sm font-medium hover:bg-white transition-colors"
          >
            Discuss Your Use Case
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};