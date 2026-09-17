import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function RiffianLanguageStatus() {
  return (
    <main className="pt-32 pb-20 bg-[#f5f1ea] text-[#0a0a0a]">
      <div className="container max-w-4xl">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.22em] uppercase text-[#0a0a0a]/55 hover:text-[#0a0a0a] mb-12 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Insights
        </Link>

        <div className="flex items-center gap-6 text-xs font-mono tracking-[0.22em] uppercase text-[#0a0a0a]/45 mb-8">
          <div className="flex items-center gap-2">
            <Calendar size={12} />
            <span>Jun 27, 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={12} />
            <span>6 min read</span>
          </div>
        </div>

        <h1 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] mb-6">
          The Status of Riffian: Dialect or Distinct Language?
          <span className="block italic text-[#0a0a0a]/45"> A Linguistic Perspective</span>
        </h1>

        <p className="text-xl md:text-2xl text-[#0a0a0a]/65 leading-relaxed font-light mb-16 pb-16 border-b border-[#0a0a0a]/10">
          The classification of Riffian within the Amazigh language family remains one of the most compelling debates in modern linguistics.
          A growing body of researchers, sociolinguists, and language technologists argue that Riffian meets the criteria of a distinct,
          independent language.
        </p>

        <article className="prose prose-lg max-w-none prose-headings:font-serif-display prose-headings:tracking-[-0.01em] prose-headings:text-[#0a0a0a] prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-p:text-[#0a0a0a]/75 prose-p:leading-relaxed prose-p:font-light prose-strong:text-[#0a0a0a] prose-strong:font-medium">
          <h2>1. The Metric of Mutual Intelligibility</h2>
          <p>
            In linguistics, the primary benchmark for distinguishing a language from a dialect is <strong>mutual intelligibility</strong>.
            Empirically, an average native Riffian speaker cannot fully comprehend a conversation in Tashelhit (Shilha/Soussia), capturing
            only scattered, isolated words. The barrier works in the opposite direction as well: Tashelhit speakers face the same difficulty
            when listening to Riffian.
          </p>
          <p>
            Under dialectological standards, this profound lack of mutual intelligibility strongly qualifies Riffian as an independent linguistic
            system rather than a mere regional dialect.
          </p>

          <h2>2. Shared Ancestry vs. Linguistic Independence</h2>
          <p>
            Relying solely on shared ancestral roots to deny Riffian its independent status is a methodological flaw. Consider the Romance
            language family: French and Spanish both descend from Vulgar Latin and share a massive lexical corpus.
            High-frequency words like <strong>dormir</strong>, <strong>farmacia</strong>, and <strong>agencia</strong> demonstrate immense lexical
            proximity—yet their status as two completely separate languages is globally unquestioned.
          </p>
          <p>
            A similar dynamic governs Germanic languages. German and Dutch maintain a noticeable degree of mutual intelligibility, yet they are
            structurally cataloged as separate national languages. This proves that lexical overlap or partial comprehension does not preclude
            linguistic independence.
          </p>

          <h2>3. Reevaluating the Amazigh Tree</h2>
          <p>
            This comparative analysis invites a fundamental question: if French and Spanish are recognized as independent languages despite their
            similarities, and if German and Dutch enjoy the same recognition despite partial mutual intelligibility, why are Riffian and Tashelhit
            classified differently—especially when mutual comprehension between their speakers is significantly lower?
          </p>
          <p>
            The objective is not to deny shared genetic and cultural bonds within the Amazigh macro-family. Rather, it is to assert that belonging
            to the same linguistic lineage does not reduce all its branches to regional dialects.
            Just as the Romance branch accommodates French, Spanish, and Italian as distinct languages, the Amazigh branch must be analyzed as a
            cluster of independent, sister languages.
          </p>

          <h2>4. Technical and Academic Implications</h2>
          <p>
            Advocating for the status of Riffian as a distinct language is far from sentimental or identity-driven. It is a scientifically grounded
            position based on empirical cognitive testing, lexical divergence, and the lived reality of its speakers.
          </p>
          <p>
            Ultimately, recognizing this independence is crucial—not only for academic accuracy, but also for building precise, culturally-aware
            language models and linguistic infrastructure in the era of global AI.
          </p>

          <h2>Conclusion</h2>
          <p>
            The debate is not about whether Amazigh languages are connected—they are. The debate is about <strong>how we measure linguistic systems</strong>.
            When mutual intelligibility and structural independence are taken seriously, Riffian stands as a language in its own right.
          </p>
        </article>

        <div className="mt-20 pt-12 border-t border-[#0a0a0a]/10">
          <div className="text-xs font-mono tracking-[0.22em] uppercase text-[#0a0a0a]/45 mb-4">Written by</div>
          <div className="font-serif-display text-2xl">RifData Team</div>
          <p className="text-[#0a0a0a]/65 font-light mt-2">
            Language technologists and linguists advancing evidence-based classification for North African languages.
          </p>
        </div>
      </div>
    </main>
  );
}

