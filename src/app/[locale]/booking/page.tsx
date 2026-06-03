import { useTranslations } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import { PageHero } from "@/components/sections/PageHero";
import { BookingForm } from "@/components/forms/BookingForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function BookingPage() {
  const t = useTranslations("booking");
  const tContact = useTranslations("contact");

  return (
    <>
      <Toaster richColors position="top-right" />
      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-2">
                  — {t("form_section")} —
                </p>
                <h2 className="font-heading text-2xl text-foreground">
                  {t("form_heading")}
                </h2>
              </div>
              <div className="border border-border bg-card p-8">
                <BookingForm />
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <div>
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
                  — {t("contact_section")} —
                </p>

                {/* Address */}
                <div className="border border-border bg-card p-5 mb-4 flex gap-4">
                  <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
                      {tContact("address_label")}
                    </p>
                    <p className="text-sm text-foreground">{tContact("address")}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="border border-border bg-card p-5 mb-4 flex gap-4">
                  <Phone className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
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
                <div className="border border-border bg-card p-5 mb-4 flex gap-4">
                  <Mail className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
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
                  <Clock className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">
                      {tContact("hours_label")}
                    </p>
                    <p className="text-sm text-foreground">{tContact("hours")}</p>
                  </div>
                </div>
              </div>

              {/* Turnaround note */}
              <div className="border border-secondary/30 bg-secondary/5 p-5">
                <p className="text-[10px] font-mono tracking-widest uppercase text-secondary mb-2">
                  ◆ {t("turnaround_title")}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("turnaround_text")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
