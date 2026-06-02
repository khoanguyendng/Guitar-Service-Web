import { useTranslations } from "next-intl";
import { Package, Search, Hammer, CheckCircle2 } from "lucide-react";

const ICONS = [Package, Search, Hammer, CheckCircle2];
const STEPS = ["step1", "step2", "step3", "step4"] as const;

export function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Retro background decoration */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
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

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-border" />

          {STEPS.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <div key={step} className="relative flex flex-col items-center text-center">
                {/* Number badge */}
                <div className="relative mb-6 z-10">
                  <div className="w-24 h-24 rounded-full border-2 border-border bg-background flex items-center justify-center group hover:border-secondary/60 transition-colors">
                    <span className="font-heading text-3xl text-muted-foreground/30 absolute top-2 right-4 leading-none select-none">
                      {t(`${step}_num`)}
                    </span>
                    <Icon className="w-7 h-7 text-secondary/70" />
                  </div>
                </div>

                <h3 className="font-heading text-xl text-foreground mb-3">
                  {t(step)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                  {t(`${step}_desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
