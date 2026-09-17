import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    category: "AI DATA",
    title: "The Technical Gap: Why Global LLMs Fail at Low-Resource Languages",
    excerpt: "A technical deep-dive into the architectural blind spots that prevent LLMs from mastering dialects like Tarifit. It's not just data scarcity — it's phonetic flattening and cultural hallucinations.",
    date: "May 10, 2026",
    readTime: "5 min read",
    slug: "/insights/technical-gap-llms",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    category: "LINGUISTICS",
    title: "The Status of Riffian: Dialect or Distinct Language? A Linguistic Perspective",
    excerpt: "A linguistic perspective on mutual intelligibility, structural independence, and why Riffian should be treated as a distinct language.",
    date: "Jun 27, 2026",
    readTime: "6 min read",
    slug: "/insights/riffian-dialect-or-language",
    image: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    category: "SPEECH AI",
    title: "Why Linguistic Transcription is the Most Critical Phase in Audio Data Projects",
    excerpt: "Recording is only the first step. The real foundation is transcription and semantic annotation—turning raw sound into precise meaning.",
    date: "Jun 27, 2026",
    readTime: "5 min read",
    slug: "/insights/linguistic-transcription-critical-phase",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    category: "LANGUAGE ENGINEERING",
    title: "Cracking the Linguistic Code: How RifData Engineers AI Infrastructure for the Rif Region",
    excerpt: "Localization succeeds when the data captures Rifian sub-regional nuance, structural syntax, and cultural resonance—engineered with native expertise and signal-quality standards.",
    date: "Jun 27, 2026",
    readTime: "7 min read",
    slug: "/insights/cracking-the-linguistic-code-rifdata",
    image: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?w=1200&h=900&fit=crop&auto=format&dpr=2&q=80"
  },
];

export default function InsightsPage() {
  return (
    <main className="pt-32 pb-20 bg-[#f5f1ea] text-[#0a0a0a]">
      <div className="container">
        <div className="flex items-center gap-3 text-xs font-mono tracking-[0.22em] uppercase text-[#0a0a0a]/55 mb-10">
          <span className="w-6 h-px bg-[#0a0a0a]/30" />
          RifData Insights
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-20 md:mb-28">
          <h1 className="md:col-span-7 font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] font-medium">
            Technical essays.
            <br />
            <span className="italic text-[#0a0a0a]/45">
              From the field.
            </span>
          </h1>
          <p className="md:col-span-4 md:col-start-9 text-base md:text-lg text-[#0a0a0a]/65 leading-relaxed font-light">
            Deep dives on dialect data, annotation quality, and building production-grade AI for languages that don't have a billion speakers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={article.slug}
              className="group block bg-white border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/30 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={article.image}
                  loading="lazy"
                  decoding="async"
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallbacked) {
                      img.dataset.fallbacked = "true";
                      img.src = "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&h=900&fit=crop&auto=format&dpr=2&q=80";
                    }
                  }}
                />
              </div>
              
              <div className="p-8">
                <div className="text-xs font-mono tracking-[0.22em] uppercase text-[#0a0a0a]/45 mb-4">
                  {article.category}
                </div>
                
                <h2 className="font-serif-display text-2xl leading-tight tracking-[-0.01em] mb-4 group-hover:text-[#0a0a0a]/70 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-[#0a0a0a]/65 font-light leading-relaxed text-sm mb-6">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-[#0a0a0a]/10">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#0a0a0a]/45">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  
                  <ArrowRight size={16} className="text-[#0a0a0a]/40 group-hover:text-[#0a0a0a] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}