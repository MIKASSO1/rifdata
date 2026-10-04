import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { PageShell } from "@/components/landing/PageShell";
import { AboutStory } from "@/components/landing/AboutStory";
import  Capabilities from "@/components/Capabilities"; // صحيح
import { Team } from "@/components/landing/Team";

const AboutPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Header />
    <main className="flex-1">
      <PageShell
        eyebrow="About · Who We Are"
        title={
          <>
            A specialized data partner for the{" "}
            <span className="text-white/60">world's most demanding</span> AI teams.
          </>
        }
        description="We are linguists, engineers, and operators turning North African voices into the highest-fidelity training data on the market."
      />
      <section className="border-b border-[#0a1e35]/15 bg-white">
        <div className="container py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#526276]">
                Executive Overview
              </p>
              <p className="mt-4 font-mono text-xs text-[#526276]">01 / 04</p>
            </div>
            <div className="lg:col-span-5">
              <h2 className="font-serif-display text-3xl leading-tight tracking-[-0.02em] text-[#0a1e35] md:text-4xl">
                A focused data infrastructure for Tarifit AI.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#526276] md:text-base">
                RifData develops production-ready language resources across the full data lifecycle, from original speech collection and expert review to structured technical delivery. our resources support AI development, linguistic research, and language-technology applications for Tarifit.
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-10 lg:justify-self-end">
              <Link
                to="/executive-overview"
                className="group inline-flex items-center gap-2 border-b-2 border-[#0a1e35] pb-2 text-sm font-semibold text-[#0a1e35] transition-colors hover:border-[#526276] hover:text-[#526276] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1e35] focus-visible:ring-offset-4"
              >
                Read the Executive Overview
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <AboutStory />
      <Capabilities />
      <Team />
    </main>
    <Footer />
  </div>
);

export default AboutPage;
