import { Linkedin, Mail } from "lucide-react";
import ceo from "@/assets/team/ceo.png";
import coo from "@/assets/team/coo.jpg";
import cto from "@/assets/team/cto.jpg";
import linguistics from "@/assets/team/linguistics.jpg";
import qa from "@/assets/team/qa.jpg";
import operations from "@/assets/team/operations.jpg";
import sales from "@/assets/team/sales.jpg";
import marketing from "@/assets/team/marketing.jpg";

type Member = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

// Pyramid structure:
// Tier 1 — CEO (1)
// Tier 2 — COO + CTO (2 — deputy & assistant to the CEO)
// Tier 3 — Department heads (5)
const tier1: Member[] = [
  {
    name: "Kamal Hohoud",
    role: "Ceo Of RifData",
    bio: "20+ years bridging North African talent with global tech enterprises.",
    image: ceo,
  },
];

const tier2: Member[] = [
  {
    name: "Salma Bouazzaoui",
    role: "Chief Operating Officer",
    bio: "Scales high-precision data pipelines for Fortune 500 AI labs.",
    image: coo,
  },
  {
    name: "Karim Amrani",
    role: "Chief Technology Officer",
    bio: "Architect of our 48kHz capture & validation infrastructure.",
    image: cto,
  },
];

const tier3: Member[] = [
  {
    name: "Imane Aaboubi",
    role: "Head of Linguistics",
    bio: "PhD in Amazigh phonology. Curator of our Tarifit & Darija lexicons.",
    image: linguistics,
  },
  {
    name: "Mehdi Bennani",
    role: "Head of Quality Assurance",
    bio: "Enforces our 0% error shield across every shipped dataset.",
    image: qa,
  },
  {
    name: "Nadia Cherkaoui",
    role: "Head of Operations",
    bio: "Orchestrates 200+ contributors across remote field locations.",
    image: operations,
  },
  {
    name: "Othmane Idrissi",
    role: "Head of Sales",
    bio: "Trusted partner to AI procurement teams in the US, EU, and APAC.",
    image: sales,
  },
  {
    name: "Rachid El Fassi",
    role: "Head of Marketing",
    bio: "Builds RifData's voice across global AI conferences and media.",
    image: marketing,
  },
];

const Card = ({ m, size = "md" }: { m: Member; size?: "lg" | "md" | "sm" }) => {
  const widths = {
    lg: "w-full max-w-[300px]",
    md: "w-full max-w-[260px]",
    sm: "w-full max-w-[230px]",
  } as const;

  return (
    <article
      className={`group relative bg-card border border-border rounded-2xl overflow-hidden shadow-card-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${widths[size]} mx-auto`}
    >
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={m.image}
          alt={`${m.name}, ${m.role} at RifData Solutions`}
          loading="lazy"
          width={640}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-primary leading-tight">
          {m.name}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-wider font-semibold text-slate-brand">
          {m.role}
        </p>
        <p className="mt-3 text-sm text-slate-brand leading-relaxed">{m.bio}</p>
        <div className="mt-4 flex gap-3">
          <a
            href="#"
            aria-label={`${m.name} on LinkedIn`}
            className="text-slate-brand hover:text-primary transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="#"
            aria-label={`Email ${m.name}`}
            className="text-slate-brand hover:text-primary transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </article>
  );
};

export const Team = () => {
  return (
    <section className="py-24 md:py-36 bg-background">
      <div className="container">
        <div className="max-w-2xl mb-20">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
            Leadership
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary tracking-tight leading-[1.1]">
            The minds behind the data.
          </h2>
          <p className="mt-5 text-lg text-slate-brand leading-relaxed">
            A senior team of operators, linguists, and engineers — united by one
            standard: production-grade data, every single time.
          </p>
        </div>

        {/* Pyramid */}
        <div className="relative">
          {/* Tier 1 — CEO */}
          <div className="flex justify-center">
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <div className="mb-3 text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-primary/70">
                Executive
              </div>
              <Card m={tier1[0]} size="lg" />
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center my-10 md:my-14">
            <div className="h-10 w-px bg-border" />
          </div>

          {/* Tier 2 — Deputy & Assistant */}
          <div>
            <div className="mb-6 text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-primary/70">
              Office of the CEO
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
              {tier2.map((m) => (
                <Card key={m.name} m={m} size="md" />
              ))}
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center my-10 md:my-14">
            <div className="h-10 w-px bg-border" />
          </div>

          {/* Tier 3 — Department Heads */}
          <div>
            <div className="mb-6 text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-primary/70">
              Department Heads
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
              {tier3.map((m) => (
                <Card key={m.name} m={m} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
