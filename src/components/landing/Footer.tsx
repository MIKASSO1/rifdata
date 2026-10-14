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

const companyLinks = [
  ["About", "/about"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
  ["Executive Overview", "/executive-overview"],
] as const;

const platformLinks = [
  ["Services", "/services"],
  ["Languages", "/languages"],
  ["Quality", "/quality"],
  ["Data Crowd", "/data-crowd"],
] as const;

const legalLinks = [
  ["Compliance", "/compliance"],
  ["Privacy Policy", "/compliance"],
  ["Terms of Service", "/compliance"],
  ["Data Processing", "/compliance"],
] as const;

export const Footer = () => {
  return (
    <footer className="bg-[#0A0E1A] text-white antialiased">
      {/* ── CTA band ── compact & balanced */}
      <div className="bg-[#F5F1EA] border-b border-[#0A0E1A]/10">
        <div className="container max-w-6xl py-10 md:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#0A0E1A]/50 mb-3">
                Partner With Us
              </p>
              <h2 className="font-serif-display text-[26px] md:text-[34px] leading-[1.15] tracking-[-0.02em] text-[#0A0E1A]">
                The data gap is real.{" "}
                <span className="italic text-[#2B6CFF]">Let&rsquo;s close it together.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0A0E1A] text-white text-sm font-medium hover:bg-[#1A2236] transition-colors min-h-[46px]"
              >
                Request a Dataset
                <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/about"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#0A0E1A]/15 text-[#0A0E1A] text-sm font-medium hover:border-[#0A0E1A]/35 hover:bg-[#0A0E1A]/[0.04] transition-all min-h-[46px]"
              >
                About RifData
                <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer ── organized 4-column grid */}
      <div className="container max-w-6xl pt-12 pb-8">
        <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-12">
          {/* Brand — logo + tagline + social */}
          <div className="sm:col-span-3 lg:col-span-5">
            <Link to="/" className="inline-block">
              <img src="/about/LOGO.SVG.svg" alt="RifData" className="h-8 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="mt-4 font-serif-display italic text-[15px] leading-relaxed text-white/85">
              The Digital Linguistic Infrastructure of the Rif
            </p>
            <p className="mt-3 text-[13px] leading-[1.7] text-white/45 font-light max-w-sm">
              AI training data for Tarifit across all its tribal variants — engineered with authentic local
              expertise.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <a
                href="https://linkedin.com/company/rifdata"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all duration-200"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://instagram.com/rifdata"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all duration-200"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Link columns — all three side by side in one row */}
          <nav aria-label="Platform" className="lg:col-span-2">
            <h4 className="text-white/90 font-sans font-semibold text-[11px] uppercase tracking-[0.2em] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-[13.5px]">
              {platformLinks.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-white/50 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h4 className="text-white/90 font-sans font-semibold text-[11px] uppercase tracking-[0.2em] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-[13.5px]">
              {companyLinks.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-white/50 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="lg:col-span-3">
            <h4 className="text-white/90 font-sans font-semibold text-[11px] uppercase tracking-[0.2em] mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-[13.5px]">
              {legalLinks.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-white/50 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── Partners strip ── single elegant hairline */}
        <div className="mt-10 border-t border-white/[0.08] pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-white/30">
              Official Partners &amp; Backers
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {sponsors.map((s) => (
                <div
                  key={s.abbr}
                  className="flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-default"
                >
                  <span
                    className="h-6 w-6 rounded-[6px] flex items-center justify-center text-[8px] font-black tracking-wide"
                    style={{
                      backgroundColor: s.color + "1A",
                      border: `1px solid ${s.color}40`,
                      color: s.color,
                    }}
                  >
                    {s.abbr}
                  </span>
                  <span className="text-[12px] font-medium text-white/70 tracking-wide whitespace-nowrap">
                    {s.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── compact legal line */}
        <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row gap-3 items-center justify-between text-[12px]">
          <p className="text-white/35 font-light tracking-wide">
            © 2026 RifData Atlas. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5 text-white/35">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              GDPR Compliant
            </span>
            <span className="text-white/15">·</span>
            <span>ISO-aligned QA</span>
            <span className="text-white/15">·</span>
            <Link to="/compliance" className="hover:text-white/70 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

