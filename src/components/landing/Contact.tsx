import { useState } from "react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Check,
  Copy,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  QUOTE_RECIPIENT,
  validateQuoteForm,
  sendQuoteRequest,
  type QuoteFormData,
  type QuoteFormErrors,
} from "@/lib/quoteForm";

const CONTACT_EMAIL = QUOTE_RECIPIENT;
const CONTACT_PHONE = "+212 600 000 000";
const CONTACT_LOCATION = "Ajdir / Al Hoceima, Morocco";

const DATASET_TYPES = ["Custom Corpus", "Pilot Batch", "Ongoing Partnership"];

const EMPTY_FORM: QuoteFormData = {
  name: "",
  company: "",
  email: "",
  datasetType: DATASET_TYPES[0],
  message: "",
};

const SUCCESS_MESSAGE =
  "Thank you! Your request has been sent successfully. We'll reply to your work email within 24 hours.";

const FAILURE_MESSAGE =
  "Something went wrong. Please try again or contact us directly at info@rifdata.com";

const baseFieldClass =
  "w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 " +
  "focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-colors text-sm";

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<QuoteFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [failed, setFailed] = useState(false);

  const set = (key: keyof QuoteFormData) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
    setSucceeded(false);
    setFailed(false);
  };

  const fieldClass = (key: keyof QuoteFormData) =>
    [baseFieldClass, errors[key] ? "border-red-400/70 focus:ring-red-400/40 focus:border-red-400/70" : ""]
      .join(" ")
      .trim();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = CONTACT_EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSucceeded(false);
    setFailed(false);

    const validation = validateQuoteForm(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      await sendQuoteRequest(form);
      // Sent through EmailJS straight to info@rifdata.com — confirm and clear the form.
      setSucceeded(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      // EmailJS keys missing or network failure — show an error message and
      // keep the form data so the visitor can retry.
      console.error("Quote form EmailJS send failed:", err);
      setFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-subtle">
      <div className="container">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-hero text-white p-10 md:p-16 shadow-elegant relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wider uppercase mb-6">
              Contact
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
              Let's discuss your next dataset project.
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl">
              Whether you need a custom corpus, a pilot batch, or an ongoing data partnership —
              our team is ready to scope it with you.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href="#quote-form">
                  Request a Quote
                  <ArrowUpRight />
                </a>
              </Button>
              <Button variant="outlineLight" size="xl" asChild>
                <a href={`mailto:${CONTACT_EMAIL}`} onClick={copyEmail}>
                  {copied ? <Check size={18} /> : <Mail size={18} />}
                  {copied ? "Copied!" : CONTACT_EMAIL}
                  {!copied && <Copy size={15} className="opacity-60" />}
                </a>
              </Button>
            </div>

            <div className="mt-12 pt-10 border-t border-white/10 grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  text: CONTACT_EMAIL,
                  href: `mailto:${CONTACT_EMAIL}`,
                },
                {
                  icon: Phone,
                  title: "Phone",
                  text: CONTACT_PHONE,
                  href: `tel:${CONTACT_PHONE.replace(/\s+/g, "")}`,
                },
                {
                  icon: MapPin,
                  title: "Location",
                  text: CONTACT_LOCATION,
                },
              ].map(({ icon: Icon, title, text, href }) => (
                <div key={title} className="flex items-start gap-3">
                  <Icon size={20} className="text-white/70 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">{title}</div>
                    {href ? (
                      <a
                        href={href}
                        onClick={title === "Email" ? copyEmail : undefined}
                        className="text-sm text-white/70 hover:text-white transition-colors break-all"
                      >
                        {text}
                      </a>
                    ) : (
                      <div className="text-sm text-white/70">{text}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quote form */}
            <form
              id="quote-form"
              onSubmit={handleSubmit}
              noValidate
              className="mt-12 pt-10 border-t border-white/10 scroll-mt-24"
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                Request a Quote
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Fill in the details and we'll get back to you at your work email.
              </p>

              {succeeded && (
                <div
                  role="status"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-green-400/40 bg-green-500/15 px-4 py-3 text-sm text-green-200"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <span>{SUCCESS_MESSAGE}</span>
                </div>
              )}

              {failed && (
                <div
                  role="alert"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-500/15 px-4 py-3 text-sm text-red-200"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>{FAILURE_MESSAGE}</span>
                </div>
              )}

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="q-name" className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">
                    Name *
                  </label>
                  <input
                    id="q-name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    placeholder="Your full name"
                    aria-invalid={Boolean(errors.name)}
                    className={fieldClass("name")}
                  />
                  {errors.name && <p className="mt-2 text-xs text-red-300">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="q-company" className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">
                    Company *
                  </label>
                  <input
                    id="q-company"
                    name="company"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) => set("company")(e.target.value)}
                    placeholder="Organization / lab"
                    aria-invalid={Boolean(errors.company)}
                    className={fieldClass("company")}
                  />
                  {errors.company && <p className="mt-2 text-xs text-red-300">{errors.company}</p>}
                </div>
                <div>
                  <label htmlFor="q-email" className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">
                    Work Email *
                  </label>
                  <input
                    id="q-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    className={fieldClass("email")}
                  />
                  {errors.email ? (
                    <p className="mt-2 text-xs text-red-300">{errors.email}</p>
                  ) : (
                    <p className="mt-2 text-xs text-white/40">
                      Company email required — Gmail and Yahoo addresses are not accepted.
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="q-type" className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">
                    Dataset Type *
                  </label>
                  <select
                    id="q-type"
                    name="datasetType"
                    value={form.datasetType}
                    onChange={(e) => set("datasetType")(e.target.value)}
                    aria-invalid={Boolean(errors.datasetType)}
                    className={`${fieldClass("datasetType")} appearance-none [&>option]:text-[#0a0a0a]`}
                  >
                    {DATASET_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.datasetType && (
                    <p className="mt-2 text-xs text-red-300">{errors.datasetType}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="q-message" className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="q-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => set("message")(e.target.value)}
                    placeholder="Tell us about your use case, volume, timeline…"
                    aria-invalid={Boolean(errors.message)}
                    className={`${fieldClass("message")} resize-y`}
                  />
                  {errors.message && <p className="mt-2 text-xs text-red-300">{errors.message}</p>}
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="mt-6"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
