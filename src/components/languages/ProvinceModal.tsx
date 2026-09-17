import { useEffect, useRef } from "react";
import { X, MapPin, Users, Maximize2, Languages as LangIcon } from "lucide-react";
import referenceMapImg from "@/assets/morocco-reference-map.jpg";

interface ProvinceModalProps {
  open: boolean;
  province: string | null;
  onClose: () => void;
}

// Lightweight placeholder dataset — keeps the modal fully populated
// regardless of which province is clicked.
const FALLBACK = {
  population: "—",
  area: "—",
  dialect: "Darija / Amazigh",
  arabicName: "",
  blurb:
    "Detailed linguistic, demographic, and cultural metadata for this province will be wired in from the dataset in the next iteration.",
  blurbAr:
    "سيتم ربط البيانات اللغوية والديموغرافية والثقافية التفصيلية لهذا الإقليم من قاعدة البيانات في المرحلة القادمة.",
};

export const ProvinceModal = ({ open, province, onClose }: ProvinceModalProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // ESC to close + lock body scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !province) return null;

  // Click outside (backdrop) closes the modal.
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onMouseDown={onBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in"
      style={{
        background:
          "radial-gradient(ellipse at center, hsl(211 100% 6% / 0.65), hsl(211 100% 4% / 0.85))",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="province-modal-title"
    >
      <div
        ref={dialogRef}
        className="glass-dark relative w-full max-w-5xl rounded-[20px] overflow-hidden text-white shadow-elegant"
        style={{ maxHeight: "calc(100vh - 4rem)" }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center transition ring-1 ring-white/15"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-[1.05fr_1fr] max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* LEFT — Reference Map image side-panel */}
          <div className="p-5 md:p-7">
            <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/60 mb-3 flex items-center gap-2">
              <MapPin size={12} />
              Reference Map
            </div>

            <div
              className="relative w-full overflow-hidden ring-1 ring-white/10"
              style={{
                borderRadius: 12,
                aspectRatio: "4 / 5",
                background: "hsl(211 100% 8%)",
              }}
            >
              <img
                src={referenceMapImg}
                alt={`Reference map highlighting ${province}`}
                loading="lazy"
                width={1024}
                height={1280}
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[hsl(211_100%_6%/.55)] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-white/85">
                <span className="bg-black/40 backdrop-blur px-2 py-1 rounded">
                  Morocco · Atlas reference
                </span>
                <span className="bg-black/40 backdrop-blur px-2 py-1 rounded">
                  1 : 6 000 000
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Province details */}
          <div className="p-6 md:p-9 border-t md:border-t-0 md:border-l border-white/10">
            <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-emerald-300/90 mb-3">
              Province Brief
            </div>

            <h2
              id="province-modal-title"
              className="font-serif-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight"
            >
              {province}
            </h2>
            {FALLBACK.arabicName && (
              <p
                dir="rtl"
                lang="ar"
                className="font-arabic text-2xl md:text-3xl text-white/85 mt-2"
              >
                {FALLBACK.arabicName}
              </p>
            )}

            {/* Data rows — bold labels, RTL-aware */}
            <dl className="mt-7 space-y-3.5">
              <DataRow
                icon={<Users size={14} />}
                label="Population"
                value={FALLBACK.population}
              />
              <DataRow
                icon={<Maximize2 size={14} />}
                label="Area"
                value={FALLBACK.area}
              />
              <DataRow
                icon={<LangIcon size={14} />}
                label="Dialect"
                value={FALLBACK.dialect}
              />
            </dl>

            {/* English blurb */}
            <p className="mt-7 text-[15px] leading-relaxed text-white/75">
              {FALLBACK.blurb}
            </p>

            {/* Arabic blurb — full RTL support */}
            <p
              dir="rtl"
              lang="ar"
              className="mt-4 font-arabic text-[15px] leading-loose text-white/70 border-t border-white/10 pt-4"
            >
              {FALLBACK.blurbAr}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-[hsl(var(--primary))] hover:bg-white/90 transition"
              >
                Close
              </button>
              <span className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 text-white/70 ring-1 ring-white/10">
                Click outside or press ESC to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between gap-4 py-2.5 border-b border-white/10 last:border-b-0">
    <dt className="flex items-center gap-2 text-[13px] font-bold tracking-wide text-white/90 uppercase">
      <span className="text-emerald-300/90">{icon}</span>
      {label}
    </dt>
    <dd className="text-[15px] font-semibold text-white/80">{value}</dd>
  </div>
);
