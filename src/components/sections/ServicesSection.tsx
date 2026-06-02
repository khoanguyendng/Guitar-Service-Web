import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Settings, Wrench, Sparkles, Zap, ArrowRight } from "lucide-react";

const SERVICE_ICONS = [Settings, Wrench, Sparkles, Zap];

const SERVICES = [
  { key: "setup" as const, iconIdx: 0 },
  { key: "repair" as const, iconIdx: 1 },
  { key: "restoration" as const, iconIdx: 2 },
  { key: "electronics" as const, iconIdx: 3 },
];

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
            — {t("badge")} —
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-5">
            {t("title")}
          </h2>
          <div className="retro-divider mx-auto w-40 my-5">
            <span className="text-secondary text-sm">◆</span>
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed italic font-heading">
            {t("subtitle")}
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {SERVICES.map(({ key, iconIdx }, i) => {
            const Icon = SERVICE_ICONS[iconIdx];
            return (
              <div
                key={key}
                className="group bg-background hover:bg-card transition-colors duration-300 p-8 flex flex-col"
              >
                {/* Number + icon */}
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-5xl font-bold text-border leading-none select-none">
                    0{i + 1}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-border group-hover:border-secondary/50 flex items-center justify-center group-hover:bg-secondary/10 transition-all duration-300">
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {t(`${key}`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {t(`${key}_desc`)}
                </p>

                {/* Price */}
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                    {t("from")}
                  </span>
                  <span className="font-heading text-lg text-secondary">
                    {t(`${key}_price`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-[0.15em] uppercase text-primary border-b border-primary/30 hover:border-primary pb-0.5 transition-colors group"
          >
            {t("view_all")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
