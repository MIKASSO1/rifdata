import { ReactNode } from "react";

interface PageShellProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

export const PageShell = ({ eyebrow, title, description, children }: PageShellProps) => {
  return (
    <div className="pt-16 md:pt-24 overflow-x-clip">
      <section className="bg-gradient-hero text-white">
        <div className="container py-14 sm:py-24 md:py-36 w-full min-w-0">
          <div className="max-w-3xl reveal min-w-0">
            <div className="inline-flex max-w-full items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-white/80 uppercase break-words">
                {eyebrow}
              </span>
            </div>
            <h1 className="font-serif-display text-[1.9rem] leading-[1.12] sm:text-4xl md:text-6xl font-semibold sm:leading-[1.05] tracking-tight text-balance break-words">
              {title}
            </h1>
            {description && (
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed break-words">
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
