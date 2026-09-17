'use client';

import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect } from 'react';

const stats = [
  { value: "150+", label: "Speech Variants\nMapped" },
  { value: "48kHz", label: "Lossless\nAudio" },
  { value: "100%", label: "Native\nSpeakers" },
  { value: "11+", label: "Regions\nCovered" },
];

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative pt-20 md:pt-28 pb-24 md:pb-36 bg-[#f5f1ea] text-[#0a0a0a] overflow-hidden">

      <div className="mx-auto max-w-7xl px-6 relative">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 font-mono tracking-[0.22em] uppercase text-[11px] text-[#0a0a0a]/50">
          <span className="w-6 h-px bg-[#0a0a0a]/30" />
          Morocco's Premier AI Data Partner for Tarifit
          <span className="ml-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#0a0a0a]/15 bg-[#0a0a0a]/[0.04] text-[#0a0a0a]/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Collection
          </span>
        </div>

        {/* Headline - طلعناه للفوق */}
        <h1 className="font-serif-display max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[1.07] tracking-[-0.02em] mt-4 md:mt-6">
          Engineering Multi-Layer
          <br />
          <span className="italic text-[#0a0a0a]/45">
           AI Training Data
          </span>
          <br />
           for the Riffian Language
        </h1>

        {/* Sub-paragraph + Map */}
        <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-10 md:gap-16 items-center">

          {/* Map */}
          <div className="md:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#0a0a0a]/8 shadow-[0_8px_40px_-12px_rgba(10,10,10,0.18)]">
              <img
                src="/videos/morocco-map.png"
                alt="Languages of Rif Map"
                loading="lazy"
                className="w-full h-auto"
              />
              {/* Map overlay badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0a]/75 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-[10px] font-mono tracking-[0.18em] uppercase">13 Dialect Zones</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-6 space-y-5">
            <p className="text-base md:text-lg leading-[1.75] text-[#0a0a0a]/65 font-light">
              We have{" "}
              <a href="/languages" className="text-[#2B6CFF] font-medium underline-offset-3 decoration-[#2B6CFF]/25 hover:decoration-[#2B6CFF]/60 transition-all">
                documented over 13 distinct Rifian speech variants,
              </a>{" "}
              with exclusive global focus on the Tarifit dialect.
            </p>
            <p className="text-base md:text-lg leading-[1.75] text-[#0a0a0a]/65 font-light">
              The only team in the world specializing in world-class, premium native-validated{" "}
              <em>Rifian datasets for conversational AI</em>.
            </p>
            <p className="text-base md:text-lg leading-[1.75] text-[#0a0a0a]/65 font-light">
              We build intelligent linguistic infrastructure that trains AI on semantic context, cultural nuance, and micro-variations distinguishing speakers within the same sub-region — like{" "}
              <span className="font-semibold text-[#0a0a0a]">Bni Waryaghel</span>{" "}
              and areas across the Moroccan Rif.
            </p>
            <p className="text-sm font-mono tracking-wide text-[#0a0a0a]/50 border-l-2 border-[#0a0a0a]/15 pl-4 italic">
              Every sample validated by native speakers for 99%+ geographic &amp; contextual accuracy.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#0a0a0a] text-white text-sm font-medium hover:bg-[#0a0a0a]/85 transition-all shadow-[0_4px_24px_-6px_rgba(10,10,10,0.4)]"
          >
            Request Dataset
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="/quality"
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full border-[#0a0a0a]/18 text-[#0a0a0a] text-sm font-medium hover:bg-[#0a0a0a]/5 hover:border-[#0a0a0a]/30 transition-all"
          >
            Our QA Process
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Divider */}
        <div className="mt-20 md:mt-24 h-px bg-gradient-to-r from-transparent via-[#0a0a0a]/15 to-transparent" />

        {/* Stats + Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mt-14 md:mt-16">

          {/* Stats */}
          <div className="lg:col-span-3 flex flex-col justify-center gap-0">
            {stats.map((s, i) => (
              <div
                key={s.value}
                className={`py-6 flex items-center gap-6 ${i < stats.length - 1? "border-b border-[#0a0a0a]/8" : ""}`}
              >
                <div className="font-serif-display text-3xl md:text-4xl tracking-tight font-medium min-w-[80px]">
                  {s.value}
                </div>
                <div className="text-xs text-[#0a0a0a]/50 font-light leading-tight whitespace-pre-line">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Video */}
          <div className="lg:col-span-9 relative h-[380px] lg:h-[500px] bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-[0_24px_80px_-20px_rgba(10,10,10,0.35)]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover opacity-90"
              loop
              playsInline
              muted
              preload="auto"
            >
              <source src="/videos/demo.mp4" type="video/mp4" />
            </video>
            {/* Video gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent pointer-events-none" />
            {/* Bottom-left label */}
            <div className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.22em] uppercase text-white/60">
              Field Collection · Rif Region, Morocco
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};