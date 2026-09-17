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
      <AboutStory />
      <Capabilities />
      <Team />
    </main>
    <Footer />
  </div>
);

export default AboutPage;
