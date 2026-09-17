import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { PageShell } from "@/components/landing/PageShell";
import { Services } from "@/components/landing/Services";

const ServicesPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Header />
    <main className="flex-1">
      <PageShell
        eyebrow="Our Services"
        title={<>End-to-end pipeline for <span className="text-white/60">production-grade AI datasets.</span></>}
        description="From raw acoustic capture to validated, model-ready data — engineered for scale and built to satisfy the most demanding ML teams."
      />
      <Services />
    </main>
    <Footer />
  </div>
);

export default ServicesPage;
