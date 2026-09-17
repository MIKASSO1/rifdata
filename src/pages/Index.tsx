import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Quality } from "@/components/landing/Quality";
import { Footer } from "@/components/landing/Footer";
import Capabilities from "@/components/Capabilities";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f5f1ea]">
      <Header />
      <main>
        <Hero />
        <Capabilities />
        <Services />
        <Quality />
        
      </main>
      <Footer />
    </div>
  );
};

export default Index;