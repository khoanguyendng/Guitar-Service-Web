import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

export function ContactSection() {
  const t = useTranslations("contact");

  const info = [
    { icon: MapPin, label: t("address_label"), value: t("address") },
    { icon: Phone, label: t("phone_label"), value: t("phone") },
    { icon: Mail, label: t("email_label"), value: t("email") },
    { icon: Clock, label: t("hours_label"), value: t("hours") },
  ];

  return (
    <section className="py-24 sm:py-32 bg-foreground dark:bg-background text-background dark:text-foreground relative overflow-hidden">
      {/* Decorative background lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, currentColor, currentColor 1px, transparent 1px, transparent 60px)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: heading + CTA */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-50 mb-4">
              — {t("badge")} —
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl mb-4 leading-tight">
              {t("title")}
            </h2>
            <p className="text-sm italic font-heading opacity-60 mb-10">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary/90 text-background text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 group"
              >
                {t("cta")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? ""}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-current/20 hover:border-current/40 text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300"
              >
                {t("zalo")}
              </a>
            </div>
          </div>

          {/* Right: contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {info.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col gap-2 p-5 border border-current/10 hover:border-current/20 transition-colors">
                <div className="flex items-center gap-2 opacity-50">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase">{label}</span>
                </div>
                <p className="text-sm leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
