import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const sponsors = [
  { abbr: "MIT", sub: "Research Lab", color: "#A31F34" },
  { abbr: "GAI", sub: "Global AI Corp", color: "#2563EB" },
  { abbr: "NLP", sub: "EuroNLP Initiative", color: "#059669" },
  { abbr: "OLF", sub: "OpenLang Foundation", color: "#7C3AED" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#0d0d0d] text-white/60">
      {/* CTA band */}
      <div
        className="border-b border-white/[0.07]"
        style={{ backgroundColor: "#F5F1EA", paddingTop: 48, paddingBottom: 48 }}
      >
        <div className="container">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="text-[10px] font-mono tracking-[0.28em] uppercase text-white/35 mb-4">
                Partner With Us
              </p>
              <h2 className="font-serif-display text-3xl md:text-5xl text-[#0A0E1A] leading-[1.1] tracking-[-0.02em]">
                The data gap is real.
                <br />
                <span className="italic text-[#2B6CFF]">Let's close it together.</span>
              </h2>
            </div>
            <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-end">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0A0E1A] text-white hover:bg-[1A1F2F] transition-colors text-sm font-medium"
              >
                Request a Dataset
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#0A0E1A]/15 text-[#0A0E1A]/80 text-sm font-medium hover:border-[#0A0E1A]/30 hover:text-[#0A0E1A] transition-all"
              >
                About RifData
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="container py-10" style={{ borderTop: "2px solid #1A1F2E" }}>
        <div className="grid md:grid-cols-12 gap-8 pb-8 md:gap-8 md:pb-8">
          {/* 1) Logo + Description + Social icons */}
          <div className="md:col-span-5">
            <img src="/about/LOGO.SVG.svg" alt="RifData" className="h-8 w-auto object-contain mb-5" />
            <p className="text-[13px] leading-[1.6] max-w-md text-white/50 font-light max-w-md">
              The first company in history to officially digitize Tarifit. We engineer AI training data for the
              Tarifit dialect across all its tribal variants — built on authentic local expertise
            </p>

            <div className="flex items-center gap-2.5 mt-7">
              <a
                href="https://linkedin.com/company/rifdata"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/45 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all duration-200"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://instagram.com/rifdata"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/45 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all duration-200"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* 2) COMPANY + LEGAL columns */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-white/90 font-semibold text-[10px] uppercase tracking-[0.22em] mb-4">Company</h4>
            <ul className="space-y-2.5 text-[13px]">
              {[
                ["About", "/about"],
                ["Languages", "/languages"],
                ["Quality", "/quality"],
                ["Data Crowd", "/data-crowd"],
                ["Insights", "/insights"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-white/45 hover:text-white/90 transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white/90 font-semibold text-[10px] uppercase tracking-[0.22em] mb-4">Legal</h4>
            <ul className="space-y-2 text-[13px]">
              {["GDPR Compliance", "Privacy Policy", "Terms of Service", "Data Processing"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/45 hover:text-white/90 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3) OFFICIAL PARTNERS & BACKERS */}
          <div className="md:col-span-12">
            <div className="border-t border-white/10 pt-8 mt-8">
              <p className="text-center text-[9px] font-bold uppercase tracking-[0.32em] text-white/20 mb-4">
                OFFICIAL PARTNERS &amp; BACKERS
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
                {sponsors.map((s) => (
                  <div
                    key={s.abbr}
                    className="flex items-center gap-2.5 opacity-25 hover:opacity-55 transition-opacity duration-300 cursor-default"
                  >
                    <div
                      className="h-7 w-7 rounded-md flex items-center justify-center shrink-0 text-[9px] font-black"
                      style={{
                        backgroundColor: s.color + "18",
                        border: `1px solid ${s.color}35`,
                        color: s.color,
                      }}
                    >
                      {s.abbr}
                    </div>
                    <span className="text-[11px] font-semibold text-white/80 whitespace-nowrap tracking-wide">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4) Copyright line */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row gap-4 items-center justify-between text-[11px] text-white/30">
              <div className="flex items-center gap-3">
                <span>© 2026 RifData Atlas.</span>
                <span className="text-white/15">·</span>
                <span>All Rights Reserved.</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/25">GDPR Compliant</span>
                <span className="text-white/15">·</span>
                <span className="text-white/25">ISO-aligned QA</span>
                <span className="text-white/15">·</span>
                <a
                  href="https://linkedin.com/company/rifdata"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-white/30 hover:text-white/70 transition-colors"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://instagram.com/rifdata"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/30 hover:text-white/70 transition-colors"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

