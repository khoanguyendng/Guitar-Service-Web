import { useTranslations } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import { PageHero } from "@/components/sections/PageHero";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Link } from "@/lib/navigation";
import { CalendarDays, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function BookingPage() {
  const t       = useTranslations("booking");
  const tContact = useTranslations("contact");

  return (
    <>
      <Toaster richColors position="top-right" />
      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Wizard */}
            <div className="lg:col-span-3">
              <div className="border border-border bg-card p-8">
                <BookingWizard />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">
              {/* Availability link */}
              <Link
                href="/booking/availability"
                className="group flex items-center gap-4 border border-secondary/30 bg-secondary/5 hover:bg-secondary/10 p-5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-secondary/40 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-secondary mb-0.5">
                    Check Availability
                  </p>
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                    View open appointment slots →
                  </p>
                </div>
              </Link>

              {/* Contact info */}
              {[
                { Icon: MapPin,  label: tContact("address_label"), value: tContact("address") },
                { Icon: Phone,   label: tContact("phone_label"),   value: tContact("phone")   },
                { Icon: Mail,    label: tContact("email_label"),   value: tContact("email")   },
                { Icon: Clock,   label: tContact("hours_label"),   value: tContact("hours")   },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="border border-border bg-card p-5 flex gap-4">
                  <Icon className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-1">{label}</p>
                    <p className="text-sm text-foreground">{value}</p>
                  </div>
                </div>
              ))}

              {/* Turnaround */}
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
