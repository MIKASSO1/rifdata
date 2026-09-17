import { useMemo } from "react";
import { PageShell } from "@/components/landing/PageShell";
import { ArrowRight, Volume2, Sparkles, MapPin, Languages as LangIcon, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

// Note: PageShell already handles header styling; this file focuses on the region brief content.


export type DialectMeta = {
  code: "RIF001" | "RIF002" | "RIF003" | "RIF004" | "RIF005" | "RIF006";
  title: string;
  color: string;
};

const SectionCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card-soft p-6 md:p-8">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold text-slate-brand mb-4">
        <span className="text-primary" aria-hidden="true">
          {icon}
        </span>
        {title}
      </div>
      <div className="text-slate-brand leading-relaxed text-[15px]">{children}</div>
    </div>
  );
};

export const RegionDetailPage = ({ meta }: { meta: DialectMeta }) => {
  const sections = useMemo(
    () => [
      {
        key: "overview",
        icon: <Sparkles size={14} />,
        title: "Overview",
        body: (
          <>
            {meta.title} is a linguistic region defined by consistent phonetic patterns and a recognizable cultural rhythm.
            In this version we use placeholder narrative content, but the layout is ready for production datasets.
          </>
        ),
      },
      {
        key: "geography",
        icon: <MapPin size={14} />,
        title: "Geography",
        body: (
          <>
            Spoken across a connected mountain corridor where communities exchange vocabulary,
            intonation habits, and shared oral traditions. The region boundary will be refined in
            Version 2 with SVG-driven highlighting.
          </>
        ),
      },
      {
        key: "culture",
        icon: <LanguagesIconPlaceholder />,
        title: "Culture",
        body: (
          <>
            A modern atlas view helps connect language to everyday life: markets, apprenticeship,
            and storytelling. Local identity remains central, especially in how speakers preserve
            heritage words.
          </>
        ),
      },
      {
        key: "traditions",
        icon: <BookOpen size={14} />,
        title: "Traditions",
        body: (
          <>
            Oral heritage shapes the way lines are phrased. Placeholder text here will later be
            populated with field notes on poetic genres, collective memory, and seasonal gatherings.
          </>
        ),
      },
      {
        key: "linguistic",
        icon: <LangIcon size={14} />,
        title: "Linguistic Features",
        body: (
          <>
            Typical markers include consistent segmental realizations and a stable melody contour.
            Version 2 can surface exact phoneme distributions and prosody metrics per sub-area.
          </>
        ),
      },
      {
        key: "sentences",
        icon: <ArrowRight size={14} />,
        title: "Example Sentences",
        body: (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-background/60 p-4">
                <div className="text-xs font-mono uppercase tracking-wider text-primary/70 mb-2">
                  Latin (Tarifit)
                </div>
                <div className="font-display text-[16px] text-foreground">Taryuft, mamek tellid?</div>
                <div className="mt-2 text-[13px] text-slate-brand">“How are you, friend?”</div>
              </div>
              <div className="rounded-xl border border-border bg-background/60 p-4">
                <div className="text-xs font-mono uppercase tracking-wider text-primary/70 mb-2">
                  Arabic (placeholder)
                </div>
                <div className="font-display text-[16px] text-foreground" dir="rtl" lang="ar">
                  أَزُول، كيف حالَك؟
                </div>
                <div className="mt-2 text-[13px] text-slate-brand">“Greetings and wellbeing.”</div>
              </div>
            </div>
          </>
        ),
      },
      {
        key: "audio",
        icon: <Volume2 size={14} />,
        title: "Audio Samples",
        body: (
          <>
            This page includes placeholders for audio tracks.
            Production will attach per-speaker clips and normalized transcripts.
          </>
        ),
      },
      {
        key: "future",
        icon: <Sparkles size={14} />,
        title: "Future Dialect Comparison",
        body: (
          <>
            Version 2 will compare this region against neighboring zones using standardized phonetic
            and prosody templates. The same layout will remain unchanged.
          </>
        ),
      },
    ],
    [meta.title],
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageShell
        eyebrow={`Explore · ${meta.code}`}
        title={
          <>
            <span className="font-serif-display italic" style={{ color: meta.color }}>
              {meta.title}
            </span>
            <br />
            <span className="text-white/60 font-display text-3xl md:text-5xl">
              Linguistic atlas brief
            </span>
          </>
        }
        description="Premium region pages with placeholder content. The design is ready for Version 2 upgrades."
      >
        <div />
      </PageShell>

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/5 border border-primary/15">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.color }} />
                <span className="text-xs uppercase tracking-[0.22em] font-semibold text-primary/70">
                  {meta.code}
                </span>
              </div>

              <Link
                to="/languages"
                className="text-sm font-semibold inline-flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
              >
                ← Back to Regions
              </Link>
            </div>

            <div className="grid gap-6">
              {sections.map((s) => (
                <SectionCard key={s.key} icon={s.icon} title={s.title}>
                  {s.body}
                </SectionCard>
              ))}
            </div>

            {/* Decorative quick next step */}
            <div className="mt-10 rounded-2xl border border-border bg-gradient-to-r from-primary/10 via-transparent to-transparent p-6 md:p-8">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold text-primary/70 mb-3">
                <Sparkles size={14} />
                Next
              </div>
              <div className="text-lg text-slate-brand leading-relaxed">
                In Version 2, the atlas map will become interactive. Replace card click with SVG region
                click without altering this layout.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const LanguagesIconPlaceholder = () => (
  <span aria-hidden="true" className="inline-flex items-center">
    <span className="w-2 h-2 rounded-full bg-primary mr-2" />
  </span>
);

