import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, ShieldCheck, GraduationCap, Globe2, ArrowRight, Headphones, X } from "lucide-react";
import dataCrowdHero from "@/assets/data-crowd-hero.jpg";
import dataCrowdWorkflow from "@/assets/data-crowd-workflow.jpg";
import { useState } from 'react'

const stats = [
  { icon: Users, value: "100%", label: "Work From Anywhere" },
  { icon: Headphones, value: "+500h", label: "Audio Collected" },
  { icon: GraduationCap, value: "—", label: "+95% Quality Threshold" },
  { icon: ShieldCheck, value: "Fair Pay", label: "Guaranteed" },
];

const principles = [
  {
    icon: ShieldCheck,
    title: "Vetted, Not Outsourced",
    description:
      "Every contributor passes our blind audio transcription test. No marketplace bidding, no anonymous workers — only named, accountable linguists.",
  },
  {
    icon: GraduationCap,
    title: "Trained, Not Crowdsourced",
    description:
      "Each transcriber completes a paid onboarding program covering our JSON schema, dialect conventions, and IPA basics before touching client data.",
  },
  {
    icon: Globe2,
    title: "Local, Not Remote-Only",
    description:
      "Our crowd lives in the Rif and across Morocco. Native speakers transcribing their own dialect — never approximated by outsiders.",
  },
];

export const DataCrowdPageBody = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <main className="flex-1">
        {/* Two-column hero */}
        <section className="relative pt-4 md:pt-8 pb-16 md:pb-24 bg-gradient-hero text-white">
          <div className="container grid lg:grid-cols-5 gap-10 lg:gap-12 items-stretch">

            {/* Left: الصورة 60% */}
            <div className="relative order-2 lg:order-1 lg:col-span-3 animate-fade-up min-h-[450px] lg:min-h-[550px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                <img
                  src={dataCrowdHero}
                  alt="Native Amazigh speaker recording voice data with audio waveforms and Tifinagh script"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/40 via-transparent to-transparent" />
              </div>

              <div className="hidden md:flex absolute -bottom-5 right-5 z-10 items-center gap-3 px-5 py-3 rounded-xl bg-background/95 backdrop-blur border-border shadow-card-soft">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-emerald-600" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-brand">Vetted Crowd</div>
                  <div className="font-display text-sm font-bold text-primary">200+ Native Linguists</div>
                </div>
              </div>
            </div>

            {/* Right: النص 40% */}
            <div className="order-1 lg:order-2 lg:col-span-2 animate-fade-up flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-white/15 bg-white/5 backdrop-blur-sm mb-6 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">
                  Data Crowd · Our Contributors
                </span>
              </div> <br /> 
                
              <h1 className="font-display text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-[1.15] tracking-tight">
                Are you a {""}
                <span className="bg-gradient-to-r from-cyan-300 via-white to-amber-200 bg-clip-text text-transparent">
                  native Rif dialect
                </span>
                {""} speaker?
              </h1> <br /> 
                
              <p className="font-display text-lg md:text-xl lg:text-2xl font-bold leading-[1.05] tracking-tight mt-4 bg-gradient-to-r from-cyan-300 via-white to-amber-200 bg-clip-text text-transparent">
                Join RifData and get paid for your voice recordings. See if you qualify below
              </p>
               <br /> <br /> 
              {/* الزر معدل: وسط + كيمشي ل /guidelines */}
              <div className="mt-8 flex justify-center">
                <Button variant="cta" size="xl" asChild>
                  <Link to="/guidelines">
                    Review Guidelines <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30 border-b border-border">
          <div className="container">
            <div className="mb-8">
              <div className="rounded-xl bg-navy-deep border-white/10 px-5 py-3 text-center">
                <p className="text-xs md:text-sm font-semibold tracking-wider uppercase text-white/90">
                  Secure • Legal • Exclusive License Available
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="p-6 md:p-8 rounded-2xl bg-card border-border shadow-card-soft text-center"
                >
                  <Icon size={22} className="text-emerald-600 mx-auto mb-3" strokeWidth={1.75} />
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary">
                    {value}
                  </div>
                  <div className="mt-1 text-xs md:text-sm text-slate-brand font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl mb-12">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
                How our crowd is different
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary tracking-tight leading-[1.1]">
                The opposite of a gig platform.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {principles.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="p-8 rounded-2xl bg-card border-border shadow-card-soft"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-primary" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary mb-2">
                    {title}
                  </h3>
                  <p className="text-slate-brand leading-relaxed">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-white">
              <div className="grid md:grid-cols-2 items-stretch">
                <div className="relative min-h-[240px] md:min-h-[320px]">
                  <img
                    src={dataCrowdWorkflow}
                    alt="Native linguist transcribing audio samples with professional precision"
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/60 md:to-primary/40" />
                </div>
                <div className="p-8 md:p-12 flex-col justify-center">
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    Want to join the crowd?
                  </h3>
                  <p className="mt-3 text-white/75 max-w-xl">
                    We hire native Tarifit speakers who can transcribe
                    with surgical precision. Start with our qualification test.
                  </p>
                  <div className="mt-6">
                    <Button variant="cta" size="xl" asChild>
                      <Link to="/compliance">
                        Apply Now
                        <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal بقى هنا إلا كنتي كتستعملو فبلاصة أخرى */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative max-w-2xl w-full bg-card border-border rounded-2xl shadow-2xl p-8 max-h-overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-brand hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">
              Recording Guidelines
            </h2>

            <div className="space-y-4 text-slate-brand">
              <p>1. Record in a quiet room with no background noise</p>
              <p>2. Use your phone microphone, speak clearly at normal volume</p>
              <p>3. Read each sentence exactly as written</p>
              <p>4. Keep each recording 3-5 seconds long</p>
              <p>5. Do 10 test recordings before starting</p>
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="cta" size="lg" onClick={() => setIsModalOpen(false)}>
                I Understand
              </Button>
              <Button variant="outline" size="lg" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
};

const DataCrowdPage = () => (
  <div className="min-h-screen bg-background flex-col">
    <Header />
    <DataCrowdPageBody />
    <Footer />
  </div>
);

export default DataCrowdPage;