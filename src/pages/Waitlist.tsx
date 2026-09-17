import { Link } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft } from "lucide-react";

const WaitlistPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0d10] text-white/90">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-20 font-sans" style={{ marginTop: 80 }}>
        <div className="container max-w-2xl">
          <section className="border border-amber-400/20 bg-amber-400/[0.04] rounded-md p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center mx-auto mb-6">
              <Clock size={32} className="text-amber-300" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-mono mb-3">
              Waitlist · Native Speaker Required
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight leading-tight mb-6">
              Thank you for your interest in RifData Solutions.
            </h1>
            <p className="text-base md:text-lg text-white/75 leading-relaxed">
              Our Qualification Test is exclusively reserved for {" "}
              <span className="text-amber-300 font-semibold">native speakers</span> of
              Tarifit (Rifian). At this time, we are not accepting non-native applicants. Please check back later for future opportunities.
            </p>
            <div className="mt-10 flex justify-center">
              <Button variant="outlineLight" size="xl" asChild>
                <Link to="/">
                  <ArrowLeft /> Return Home
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WaitlistPage;
