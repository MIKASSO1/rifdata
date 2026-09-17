import { useRef, useState } from "react";
import { Play, Pause, Volume2, FlaskConical } from "lucide-react";

// Modular accent matrix — add new accents/phrases without touching layout.
interface AccentSample {
  id: string;
  label: string;
  region: string;
  /** External MP3 URL — placeholder uses a public sample for the demo. */
  url: string;
}

const PHRASE = {
  tarifit: "Azul fellawen, mamec tellid?",
  arabic: "أَزُول فَلَّاوَن، مَامَكْ تَلِّيدْ؟",
  tifinagh: "ⴰⵣⵓⵍ ⴼⴻⵍⵍⴰⵡⴻⵏ, ⵎⴰⵎⴻⵛ ⵜⴻⵍⵍⵉⴷ?",
  english: "“Hello everyone, how are you?”",
};

const SAMPLES: AccentSample[] = [
  {
    id: "alhoceima",
    label: "Al Hoceima Accent",
    region: "Central Rif · Aith Waryaghar",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1718e295a4.mp3",
  },
  {
    id: "nador",
    label: "Nador Accent",
    region: "Eastern Rif · Iqar'iyyen",
    url: "https://cdn.pixabay.com/download/audio/2022/10/30/audio_347111d654.mp3",
  },
  {
    id: "driouch",
    label: "Driouch Accent",
    region: "Eastern Rif · Aith Tuzin",
    url: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_d0c6ff1c6c.mp3",
  },
];

export const AccentLab = () => {
  const [active, setActive] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = (s: AccentSample) => {
    if (!audioRef.current) return;
    if (active === s.id) {
      audioRef.current.pause();
      setActive(null);
      return;
    }
    audioRef.current.src = s.url;
    audioRef.current.play().catch(() => {});
    setActive(s.id);
  };

  return (
    <section className="py-20 md:py-28 bg-muted/30 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
            <FlaskConical size={12} />
            RifData Accent Lab
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary tracking-tight leading-[1.1]">
            Compare phonetics across the Rif.
          </h2>
          <p className="mt-5 text-lg text-slate-brand leading-relaxed">
            One sentence, three native deliveries. Hear how a single Riffian
            phrase shifts in articulation and prosody between Al Hoceima, Nador,
            and Driouch.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Phrase card with three scripts */}
          <div className="bg-card rounded-2xl border border-border shadow-card-soft p-7 md:p-9">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-brand mb-4">
              Phrase Documentation
            </div>

            <ScriptRow label="Tifinagh" value={PHRASE.tifinagh} />
            <ScriptRow label="Arabic" value={PHRASE.arabic} dir="rtl" />
            <ScriptRow label="Latin (Tarifit)" value={PHRASE.tarifit} italic />

            <div className="mt-6 pt-5 border-t border-border">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-brand mb-1.5">
                English Gloss
              </div>
              <p className="text-foreground">{PHRASE.english}</p>
            </div>
          </div>

          {/* Audio matrix */}
          <div className="bg-card rounded-2xl border border-border shadow-card-soft p-7 md:p-9">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-brand mb-4 flex items-center gap-2">
              <Volume2 size={12} />
              Audio Matrix
            </div>

            <div className="space-y-3">
              {SAMPLES.map((s) => {
                const isActive = active === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => toggle(s)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                      isActive
                        ? "border-primary bg-primary/5 shadow-card-soft"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {isActive ? (
                        <Pause size={18} />
                      ) : (
                        <Play size={18} className="ml-0.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-base font-bold text-primary">
                        {s.label}
                      </div>
                      <div className="text-xs text-slate-brand truncate">
                        {s.region}
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
                        Playing
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-[11px] text-slate-brand leading-relaxed">
              Audio samples are illustrative placeholders. Production deliveries
              ship with field-recorded native speakers per cluster.
            </p>

            <audio
              ref={audioRef}
              onEnded={() => setActive(null)}
              preload="none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ScriptRow = ({
  label,
  value,
  dir,
  italic,
}: {
  label: string;
  value: string;
  dir?: "rtl" | "ltr";
  italic?: boolean;
}) => (
  <div className="py-3 border-b border-border last:border-b-0">
    <div className="text-[10px] uppercase tracking-wider font-semibold text-primary/60 mb-1">
      {label}
    </div>
    <p
      dir={dir}
      className={`font-display text-xl md:text-2xl text-foreground leading-snug ${
        italic ? "italic" : ""
      }`}
    >
      {value}
    </p>
  </div>
);
