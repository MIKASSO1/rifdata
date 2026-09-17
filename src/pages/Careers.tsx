import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { PageShell } from "@/components/landing/PageShell";
import { Careers } from "@/components/landing/Careers";

const CareersPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Header />
    <main className="flex-1">
      <PageShell
        eyebrow="Careers · Elite Recruitment"
        title={<>Join the <span className="text-white/60">Elite 1%</span> of Linguistic Experts.</>}
        description="We hire only the sharpest native speakers of Tarifit and Moroccan Darija for high-pressure AI transcription work."
      />
      <Careers />
    </main>
    <Footer />
  </div>
);

export default CareersPage;
