import { ReactNode } from "react";

interface PageShellProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

export const PageShell = ({ eyebrow, title, description, children }: PageShellProps) => {
  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-gradient-hero text-white">
        <div className="container py-24 md:py-36">
          <div className="max-w-3xl reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">
                {eyebrow}
              </span>
            </div>
            <h1 className="font-serif-display text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>
      {children}
    </div>
  );
};
