import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

import Index from "./pages/Index.tsx";
import ServicesPage from "./pages/Services.tsx";
import { Quality } from "./pages/Quality.tsx"; // ← هادي اللي تبدلت

import ContactPage from "./pages/Contact.tsx";
import AboutPage from "./pages/About.tsx";
import GuidelinesPage from "./pages/Guidelines.tsx";
import TestPage from "./pages/Test.tsx";
import LanguagesPage from "./pages/Languages.tsx";
import CompliancePage from "./pages/Compliance.tsx";
import DataCrowdPage from "./pages/DataCrowd.tsx";
import DataCrowContributor from "./pages/DataCrowContributor.tsx";
import InsightsPage from "./pages/Insights.tsx";
import TechnicalGap from "./pages/insights/TechnicalGap.tsx"; // ← هادي جديدة
import RiffianLanguageStatus from "./pages/insights/RiffianLanguageStatus.tsx";
import LinguisticTranscriptionCriticalPhase from "./pages/insights/LinguisticTranscriptionCriticalPhase.tsx";
import CrackingLinguisticCodeRifData from "./pages/insights/CrackingLinguisticCodeRifData.tsx";
import WaitlistPage from "./pages/Waitlist.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ScrollRevealMount = () => {
  useScrollReveal();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollRevealMount />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/quality" element={<Quality />} /> {/* ← وهادي تبدلت */}
          {/* Careers removed */}

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/guidelines" element={<GuidelinesPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/languages" element={<LanguagesPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/data-crowd" element={<DataCrowdPage />} />
          <Route path="/data-crow" element={<DataCrowContributor />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/technical-gap-llms" element={<TechnicalGap />} /> {/* ← هادي جديدة */}
          <Route path="/insights/riffian-dialect-or-language" element={<RiffianLanguageStatus />} />
          <Route
            path="/insights/linguistic-transcription-critical-phase"
            element={<LinguisticTranscriptionCriticalPhase />}
          />

          <Route
            path="/insights/cracking-the-linguistic-code-rifdata"
            element={<CrackingLinguisticCodeRifData />}
          />

          <Route path="/waitlist" element={<WaitlistPage />} />

          {/* Careers removed (includes legacy /jobs alias) */}


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;