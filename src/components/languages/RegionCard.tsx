import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export type RegionCardColor = {
  indicator: string; // base color
  indicatorSoftBg: string; // background like color+18
  indicatorSoftBorder: string;
};

export interface RegionCardModel {
  code: string; // e.g. RIF001
  title: string;
  description: string;
  href: string;
  color: RegionCardColor;
}

export const RegionCard = ({ region }: { region: RegionCardModel }) => {
  return (
    <Link
      to={region.href}
      className="group relative h-full block rounded-[20px] border border-border bg-card shadow-card-soft overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      aria-label={`Explore ${region.title}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute -inset-12 blur-3xl"
          style={{ background: `${region.color.indicator}22` }}
        />
      </div>

      <div className="relative p-6 md:p-7">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span
              className="h-3.5 w-3.5 rounded-full shrink-0"
              style={{ background: region.color.indicator }}
            />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-primary/70">
              {region.code}
            </span>
          </div>
          <span
            className="text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded-full"
            style={{
              background: region.color.indicatorSoftBg,
              border: `1px solid ${region.color.indicatorSoftBorder}`,
              color: region.color.indicator,
            }}
          >
            Linguistic Region
          </span>
        </div>

        <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-primary leading-tight tracking-tight">
          {region.title}
        </h3>

        <p className="mt-4 text-[15px] leading-relaxed text-slate-brand">
          {region.description}
        </p>

        <div className="mt-7 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-primary/60">
            Explore
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary/90 transition-colors">
            Explore Region <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
};

