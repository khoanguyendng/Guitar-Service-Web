import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { CalendarDays, ArrowRight } from "lucide-react";

export function BookingCtaSection() {
  const t = useTranslations("booking_cta");

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(180,83,9,0.07),transparent)]" />

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-14 h-14 border-l-2 border-t-2 border-secondary/20 hidden lg:block" />
      <div className="absolute top-8 right-8 w-14 h-14 border-r-2 border-t-2 border-secondary/20 hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-14 h-14 border-l-2 border-b-2 border-secondary/20 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-14 h-14 border-r-2 border-b-2 border-secondary/20 hidden lg:block" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-secondary mb-6">
          — {t("badge")} —
        </p>

        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
          {t("title")}
        </h2>

        <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed mb-12">
          {t("subtitle")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/booking"
            className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-primary hover:bg-primary/90 text-primary-foreground text-[11px] font-mono tracking-[0.25em] uppercase transition-all duration-300 overflow-hidden hover:shadow-[0_0_32px_rgba(217,119,6,0.4)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-700/0 via-amber-400/20 to-amber-700/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <CalendarDays className="w-4 h-4 relative" />
            <span className="relative">{t("cta_book")}</span>
            <ArrowRight className="w-3.5 h-3.5 relative group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-secondary/30 text-muted-foreground hover:border-secondary/60 hover:text-foreground text-[11px] font-mono tracking-[0.25em] uppercase transition-all duration-300"
          >
            {t("cta_services")}
          </Link>
        </div>

        {/* Trust strip */}
        <div className="mt-14 pt-10 border-t border-border flex items-center justify-center gap-10 sm:gap-16">
          {(["trust1", "trust2", "trust3"] as const).map((k) => {
            const text: string = t(k);
            const [value, ...labelParts] = text.split(" ");
            return (
              <div key={k} className="flex flex-col items-center gap-1">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-secondary">
                  {value}
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground/60 text-center">
                  {labelParts.join(" ")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
