import { ArrowUpRight, Award, Target, Zap, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// External Google Form for initial registration. Replace with your real form URL.
const EXTERNAL_REGISTRATION_URL = "https://forms.gle/your-registration-form";

export const Careers = () => {
  return (
    <section id="careers" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
              Careers · Elite Recruitment
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary tracking-tight leading-[1.1]">
              Join the Elite 1% of Linguistic Experts.
            </h2>
            <p className="mt-6 text-lg text-slate-brand leading-relaxed">
              <span className="font-semibold text-primary">95% of applicants fail</span> our
              rigorous entry exam. We only hire the sharpest native speakers for
              high-pressure AI transcription projects.
            </p>
            <p className="mt-4 text-base text-slate-brand leading-relaxed">
              If you have a deep command of Tarifit or Moroccan Darija, exceptional attention
              to detail, and the discipline to perform under demanding production deadlines —
              we want to hear from you.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="xl" asChild>
                <a
                  href={EXTERNAL_REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now
                  <ExternalLink />
                </a>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/compliance">
                  Take the Qualification Test
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-xs text-slate-brand">
              Step 1: Register via the external form. Step 2: Read the
              guidelines. Step 3: Pass the transcription test.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, stat: "1%", label: "Acceptance rate" },
                { icon: Target, stat: "95%", label: "Eliminated at exam" },
                { icon: Zap, stat: "48h", label: "Test turnaround" },
                { icon: Award, stat: "Top tier", label: "Compensation" },
              ].map(({ icon: Icon, stat, label }, i) => (
                <div
                  key={label}
                  className={`p-6 md:p-8 rounded-2xl border border-border bg-card shadow-card-soft ${
                    i % 2 === 0 ? "md:translate-y-6" : ""
                  }`}
                >
                  <Icon size={24} className="text-primary mb-4" strokeWidth={1.75} />
                  <div className="font-display text-3xl font-bold text-primary">{stat}</div>
                  <div className="text-sm text-slate-brand mt-1">{label}</div>
                </div>
              ))}
            </div>
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/5 to-transparent rounded-3xl -z-10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
