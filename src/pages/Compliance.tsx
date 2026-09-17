import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import {
  ArrowRight,
  ScrollText,
  ShieldCheck,
  FileDown,
  Lock,
  Scale,
  Globe2,
  EyeOff,
  BookCheck,
  Award,
  Building2,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

type Clause = {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
};

const sectionOne: Clause[] = [
  {
    id: "ip",
    icon: Lock,
    title: "IP & Data Ownership",
    text: "I acknowledge and agree that all recordings, transcriptions, and data produced during the test or future projects are the sole and exclusive property of RifData. I waive all intellectual property rights and moral rights in favor of RifData and its global partners.",
  },
  {
    id: "usage",
    icon: Scale,
    title: "Usage Rights",
    text: "I grant RifData a perpetual, irrevocable, worldwide license to use my voice and linguistic data for AI training, research, and commercial purposes.",
  },
  {
    id: "legal",
    icon: Globe2,
    title: "Legal Capacity & Compliance",
    text: "I confirm that I am of legal working age (18+) and that my participation complies with international data privacy standards (GDPR-compliant processing).",
  },
  {
    id: "nda",
    icon: EyeOff,
    title: "Non-Disclosure (NDA)",
    text: "I commit to strict confidentiality. I will not record, share, or disclose any audio files, guidelines, or project details to any third party.",
  },
];

const sectionTwo: Clause[] = [
  {
    id: "manual",
    icon: BookCheck,
    title: "Manual Compliance",
    text: "I have downloaded and thoroughly read the RifData Test Guidelines Manual. I agree to follow every rule regarding Verbatim Transcription and Audio Recording standards.",
  },
  {
    id: "global",
    icon: Award,
    title: "Global Quality Alignment",
    text: "I understand that my work must align with international AI data requirements. Any deviation from the provided manual will result in immediate disqualification.",
  },
  {
    id: "hybrid",
    icon: Building2,
    title: "Hybrid Model Understanding",
    text: "I acknowledge RifData's hybrid operations. If based in Morocco, I am open to supervised in-person sessions. If abroad, I commit to maintaining laboratory-grade acoustic quality from my remote environment.",
  },
  {
    id: "antiai",
    icon: Bot,
    title: "Anti-AI Policy",
    text: "I pledge to perform all tasks manually. The use of automated transcription tools or AI assistance is strictly prohibited and will lead to a permanent ban.",
  },
];

const allIds = [...sectionOne, ...sectionTwo].map((c) => c.id);

const ClauseRow = ({
  clause,
  checked,
  onChange,
  index,
  locked = false,
  onLockedClick,
}: {
  clause: Clause;
  checked: boolean;
  onChange: (v: boolean) => void;
  index: string;
  locked?: boolean;
  onLockedClick?: () => void;
}) => {
  const Icon = clause.icon;
  return (
    <label
      htmlFor={`clause-${clause.id}`}
      onClick={(e) => {
        if (locked) {
          e.preventDefault();
          onLockedClick?.();
        }
      }}
      className={`group flex items-start gap-4 p-5 md:p-6 rounded-xl border transition-all ${
        locked
          ? "border-white/10 bg-white/[0.02] opacity-60 cursor-not-allowed"
          : checked
            ? "border-emerald-500/40 bg-emerald-500/5 cursor-pointer"
            : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer"
      }`}
    >
      <div
        className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          checked ? "bg-emerald-500/15 text-emerald-300" : "bg-white/5 text-white/70"
        }`}
      >
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
            {index}
          </span>
          <h4 className="font-display text-base md:text-lg font-bold text-white">
            {clause.title}
          </h4>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-amber-300/80">
            {locked && <Lock size={10} />}
            {locked ? "Locked" : "Required"}
          </span>
        </div>
        <p className="text-sm text-white/70 leading-relaxed">{clause.text}</p>
      </div>
      <Checkbox
        id={`clause-${clause.id}`}
        checked={checked}
        disabled={locked}
        onCheckedChange={(v) => onChange(v === true)}
        className="mt-1 border-white/40 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 data-[state=checked]:text-white"
      />
    </label>
  );
};

const CompliancePage = () => {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(allIds.map((id) => [id, false])),
  );

  const checkedCount = useMemo(
    () => Object.values(state).filter(Boolean).length,
    [state],
  );
  const total = allIds.length;
  const allChecked = checkedCount === total;

  const [manualDownloaded, setManualDownloaded] = useState(false);
  const lockedIds = new Set(["manual", "global"]);

  const setOne = (id: string) => (v: boolean) =>
    setState((prev) => ({ ...prev, [id]: v }));

  const notifyLocked = () =>
    toast.error("Please review the Manual Guidelines first to unlock compliance.", {
      description: "Click the 'Download Test Guidelines Manual' button at the top of the page.",
    });

  const handleDownloadManual = () => {
    setManualDownloaded(true);
    toast.success("Manual unlocked. You may now acknowledge the quality clauses.");
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Executive Hero */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, hsl(217 91% 25% / 0.55) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 -z-10 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="container max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70 mb-6">
              <ShieldCheck size={12} className="text-emerald-300" />
              Compliance Gateway · Step 2 of 3
            </div>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              The Path to the <span className="text-emerald-300">Elite 1%</span>.
              <br className="hidden md:block" />
              <span className="text-white/70 font-medium">
                Complete your compliance check to proceed.
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-2xl">
              This page is a mandatory legal and quality gateway between your
              registration and the qualification test. Every clause must be
              acknowledged. There are no exceptions.
            </p>

            {/* Progress */}
            <div className="mt-10 max-w-md">
              <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">
                <span>Compliance Progress</span>
                <span className="text-white">
                  {checkedCount} / {total}
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                  style={{ width: `${(checkedCount / total) * 100}%` }}
                />
              </div>
            </div>

            {/* Mandatory manual download — gateway for Section II */}
            <div className="mt-10 p-5 md:p-6 rounded-xl border border-amber-300/30 bg-amber-300/[0.06] flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-200/80 mb-1">
                  Step 1 · Mandatory
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  Download the Test Guidelines Manual
                </h3>
                <p className="text-sm text-white/60 mt-1">
                  The Quality Standards clauses below remain locked until you
                  download the manual.
                </p>
              </div>
              <a
                href="/RifData-Test-Guidelines-Manual.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownloadManual}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-colors shrink-0 ${
                  manualDownloaded
                    ? "bg-emerald-500/15 border border-emerald-400/40 text-emerald-200"
                    : "bg-amber-300 text-[#0A0F1C] hover:bg-amber-200"
                }`}
              >
                <FileDown size={16} />
                {manualDownloaded ? "Manual Downloaded ✓" : "Download Test Guidelines Manual"}
              </a>
            </div>
          </div>
        </section>

        {/* Section I */}
        <section className="py-16 md:py-20 border-b border-white/10">
          <div className="container max-w-4xl">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <ScrollText size={20} strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/50 mb-1">
                  Section I
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Legal & IP Consent
                </h2>
                <p className="mt-2 text-sm text-white/60 max-w-2xl">
                  Binding contractual acknowledgements regarding ownership,
                  licensing, legal capacity, and confidentiality.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {sectionOne.map((c, i) => (
                <ClauseRow
                  key={c.id}
                  clause={c}
                  checked={state[c.id]}
                  onChange={setOne(c.id)}
                  index={`I.${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section II */}
        <section className="py-16 md:py-20 border-b border-white/10">
          <div className="container max-w-4xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <ShieldCheck size={20} strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/50 mb-1">
                  Section II
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Quality Standards & Compliance
                </h2>
                <p className="mt-2 text-sm text-white/60 max-w-2xl">
                  Operational discipline aligned with international AI data
                  delivery requirements.
                </p>
              </div>
            </div>

            {!manualDownloaded && (
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-300/30 bg-amber-300/5 text-amber-200 text-xs font-semibold">
                <Lock size={12} />
                Locked — download the manual at the top of the page to unlock these clauses.
              </div>
            )}

            <div className="space-y-3">
              {sectionTwo.map((c, i) => (
                <ClauseRow
                  key={c.id}
                  clause={c}
                  checked={state[c.id]}
                  onChange={setOne(c.id)}
                  index={`II.${i + 1}`}
                  locked={lockedIds.has(c.id) && !manualDownloaded}
                  onLockedClick={notifyLocked}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final Gate */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10 text-center">
              <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/50 mb-3">
                Final Gateway
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                {allChecked
                  ? "All clauses acknowledged. You may proceed."
                  : "Acknowledge every clause to unlock the test."}
              </h3>
              <p className="mt-3 text-sm md:text-base text-white/60 max-w-xl mx-auto">
                {allChecked
                  ? "By proceeding, you confirm that your acceptance of the eight clauses above constitutes a binding agreement with RifData."
                  : `${total - checkedCount} mandatory acknowledgement${
                      total - checkedCount === 1 ? "" : "s"
                    } remaining.`}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="cta"
                  size="xl"
                  asChild={allChecked}
                  disabled={!allChecked}
                  className={!allChecked ? "opacity-50 cursor-not-allowed" : ""}
                >
                  {allChecked ? (
                    <Link to="/test">
                      Proceed to Qualification Test
                      <ArrowRight />
                    </Link>
                  ) : (
                    <span>
                      Proceed to Qualification Test
                      <ArrowRight />
                    </span>
                  )}
                </Button>
                <Button
                  variant="outlineLight"
                  size="xl"
                  asChild
                  className="border-white/20 text-white hover:bg-white hover:text-[#0A0F1C]"
                >
                  <Link to="/guidelines">Review Guidelines</Link>
                </Button>
              </div>

              <p className="mt-6 text-xs text-white/40">
                Direct link:{" "}
                <code className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                  /compliance
                </code>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CompliancePage;
