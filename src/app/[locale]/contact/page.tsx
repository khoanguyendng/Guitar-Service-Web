import { useTranslations } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact_page");
  const tContact = useTranslations("contact");

  return (
    <>
      <Toaster richColors position="top-right" />
      <PageHero
        badge={t("hero_badge")}
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
      />

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Contact Info */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
                — {tContact("info_section")} —
              </p>
              <h2 className="font-heading text-2xl text-foreground mb-8">
                {tContact("info_title")}
              </h2>

              <div className="space-y-4">
                {/* Address */}
                <div className="border border-border bg-card p-5 flex gap-4">
                  <div className="w-8 h-8 border border-border flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
                      {tContact("address_label")}
                    </p>
                    <p className="text-sm text-foreground">{tContact("address")}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="border border-border bg-card p-5 flex gap-4">
                  <div className="w-8 h-8 border border-border flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
                      {tContact("phone_label")}
                    </p>
                    <a
                      href={`tel:${tContact("phone").replace(/\s/g, "")}`}
                      className="text-sm text-foreground hover:text-secondary transition-colors"
                    >
                      {tContact("phone")}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="border border-border bg-card p-5 flex gap-4">
                  <div className="w-8 h-8 border border-border flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
                      {tContact("email_label")}
                    </p>
                    <a
                      href={`mailto:${tContact("email")}`}
                      className="text-sm text-foreground hover:text-secondary transition-colors"
                    >
                      {tContact("email")}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="border border-border bg-card p-5 flex gap-4">
                  <div className="w-8 h-8 border border-border flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
                      {tContact("hours_label")}
                    </p>
                    <p className="text-sm text-foreground">{tContact("hours")}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{tContact("sunday_hours")}</p>
                  </div>
                </div>

                {/* Zalo + WhatsApp */}
                <div className="flex gap-3 pt-2">
                  <a
                    href="https://zalo.me/0901234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-secondary/40 bg-secondary/5 hover:bg-secondary/10 py-3 text-xs font-mono tracking-widest uppercase text-secondary transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {tContact("zalo")}
                  </a>
                  <a
                    href="https://wa.me/84901234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-border hover:border-secondary/40 hover:bg-secondary/5 py-3 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-secondary transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
                — {t("form_badge")} —
              </p>
              <h2 className="font-heading text-2xl text-foreground mb-8">
                {t("form_title")}
              </h2>
              <div className="border border-border bg-card p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-6 text-center">
            — {tContact("map_section")} —
          </p>
          <div className="relative h-64 sm:h-80 border border-border bg-muted overflow-hidden">
            {/* CSS grid lines */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Diagonal accent lines */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, hsl(var(--secondary)) 0, hsl(var(--secondary)) 1px, transparent 0, transparent 50%)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Center pin marker */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex flex-col items-center">
                {/* Pin */}
                <div className="w-8 h-8 bg-secondary rounded-full border-4 border-background flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4 text-secondary-foreground" />
                </div>
                {/* Pin shadow */}
                <div className="w-3 h-1 bg-black/30 rounded-full mt-0.5 blur-[1px]" />
                {/* Label */}
                <div className="mt-3 px-4 py-2 bg-background/95 border border-border shadow-md">
                  <p className="text-xs font-mono tracking-widest uppercase text-foreground whitespace-nowrap">
                    ◆ Our Location
                  </p>
                  <p className="text-[10px] text-muted-foreground text-center mt-0.5">
                    123 Phố Huế, Hà Nội
                  </p>
                </div>
              </div>
            </div>

            {/* Compass rose (decorative) */}
            <div className="absolute top-4 right-4 w-10 h-10 border border-border bg-background/80 flex items-center justify-center">
              <span className="text-xs font-mono text-muted-foreground font-bold">N</span>
            </div>
          </div>
          <p className="text-center text-xs font-mono text-muted-foreground mt-3 tracking-widest uppercase">
            Google Maps integration coming soon
          </p>
        </div>
      </section>
    </>
  );
}
