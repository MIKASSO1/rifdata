import { MapPin, Mic, Languages as LangIcon, Sparkles, PlayCircle, Music } from "lucide-react";
import type { RegionData } from "@/data/regions";

interface RegionDashboardProps {
  region: RegionData;
}

export const RegionDashboard = ({ region }: RegionDashboardProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card-soft overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-navy text-white p-6 md:p-8">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold bg-white/10 backdrop-blur-sm px-2 py-1 rounded ring-1 ring-white/20">
          <LangIcon size={11} />
          {region.language.toUpperCase()}
        </div>
        <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold leading-tight">
          {region.name}
        </h2>
        <p className="mt-1 text-white/70 text-sm md:text-base" dir="rtl">
          {region.nameAr}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {region.cities.map((c) => (
            <span
              key={c}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/10 ring-1 ring-white/15"
            >
              <MapPin size={9} className="inline mr-1 -mt-0.5" />
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Video container */}
      <div className="p-6 md:p-8 border-b border-border">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold text-slate-brand mb-3">
          <PlayCircle size={12} />
          Field Documentary
        </div>
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted ring-1 ring-border">
          {region.videoUrl ? (
            <iframe
              src={region.videoUrl}
              title={`${region.name} field documentary`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-brand">
              <PlayCircle size={36} strokeWidth={1.2} className="opacity-40" />
              <p className="mt-2 text-xs font-medium">Video documentary — coming soon</p>
              <p className="text-[10px] opacity-70">YouTube embed slot ready</p>
            </div>
          )}
        </div>

        {region.audioSamples && region.audioSamples.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold text-slate-brand">
              <Music size={12} />
              Native Audio Samples
            </div>
            {region.audioSamples.map((s) => (
              <div key={s.url} className="flex items-center gap-3 p-2 rounded-lg bg-muted">
                <span className="text-xs font-medium text-foreground flex-1 truncate">{s.label}</span>
                <audio controls preload="none" src={s.url} className="h-8" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Linguistic data */}
      <div className="p-6 md:p-8 border-b border-border">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold text-slate-brand mb-4">
          <Mic size={12} />
          Linguistic Profile
        </div>
        <dl className="space-y-4">
          <Field label="Fluency Traits" value={region.fluency} />
          <Field label="Phonetics & Articulation" value={region.phonetics} />
          <Field label="Prosody & Melody" value={region.prosody} />
        </dl>
      </div>

      {/* Cultural data */}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold text-slate-brand mb-3">
          <Sparkles size={12} />
          Cultural Identity
        </div>
        <p className="text-sm md:text-[15px] text-foreground leading-relaxed">
          {region.culture}
        </p>
      </div>
    </div>
  );
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
      {label}
    </dt>
    <dd className="text-sm md:text-[15px] text-foreground leading-relaxed">{value}</dd>
  </div>
);
