import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Settings, Wrench, Sparkles, Zap, ArrowRight } from "lucide-react";

const ICONS = [Settings, Wrench, Sparkles, Zap];
const SERVICES = ["setup", "repair", "restoration", "electronics"] as const;
const PRICES  = ["setup_price", "repair_price", "restoration_price", "electronics_price"] as const;
const DURATIONS = ["1–2 ngày", "3–5 ngày", "2–4 tuần", "1–2 ngày"];

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-secondary mb-4">
            — {t("badge")} —
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground mb-5">
            {t("title")}
          </h2>
          <div className="flex items-center justify-center gap-4 my-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary/50" />
            <span className="text-secondary text-sm">◆</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary/50" />
          </div>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed italic font-heading text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border">
          {SERVICES.map((key, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={key}
                className="group relative flex flex-col p-8 border-r border-b border-border last:border-r-0 [&:nth-child(2)]:border-r-border sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r-border lg:[&:nth-child(4n)]:border-r-0 bg-background hover:bg-card transition-all duration-400 overflow-hidden"
              >
                {/* Amber hover accent — slides up from bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                {/* Giant watermark number */}
                <span className="absolute -top-2 -right-2 font-heading font-black text-[7rem] leading-none text-border/40 select-none group-hover:text-secondary/10 transition-colors duration-400">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="relative mb-8">
                  <div className="w-12 h-12 rounded-full border border-border group-hover:border-secondary/50 bg-background group-hover:bg-secondary/8 flex items-center justify-center transition-all duration-300">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors duration-300" />
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors duration-300 mb-3 relative">
                  {t(key)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 relative">
                  {t(`${key}_desc` as `${typeof key}_desc`)}
                </p>

                {/* Footer */}
                <div className="relative mt-7 pt-5 border-t border-border flex items-end justify-between">
                  <div>
                    <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-muted-foreground/60 mb-0.5">
                      {t("from")}
                    </p>
                    <p className="font-heading text-xl text-secondary">
                      {t(PRICES[i])}
                    </p>
                  </div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground/50 bg-muted px-2 py-1">
                    {DURATIONS[i]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 text-[11px] font-mono tracking-[0.2em] uppercase border-b border-primary/30 hover:border-primary pb-0.5 text-primary transition-all duration-200"
          >
            {t("view_all")}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
