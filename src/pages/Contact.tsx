import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Contact } from "@/components/landing/Contact";

const ContactPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Header />
    <main className="flex-1 pt-16 md:pt-20">
      <Contact />
    </main>
    <Footer />
  </div>
);

export default ContactPage;
