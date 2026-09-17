import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_FORM_URL = "https://forms.gle/your-contact-form";
const CONTACT_EMAIL = "contact@rifdata.com";
const CONTACT_PHONE = "+212 600 000 000";
const CONTACT_LOCATION = "Ajdir / Al Hoceima, Morocco";

export const Contact = () => {
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
                <a href={CONTACT_FORM_URL} target="_blank" rel="noopener noreferrer">
                  Request a Quote
                  <ArrowUpRight />
                </a>
              </Button>
              <Button variant="outlineLight" size="xl" asChild>
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail size={18} />
                  {CONTACT_EMAIL}
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
          </div>
        </div>
      </div>
    </section>
  );
};
