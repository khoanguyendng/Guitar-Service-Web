import { useTranslations } from "next-intl";
import { Package, Search, Hammer, CheckCircle2 } from "lucide-react";

const ICONS = [Package, Search, Hammer, CheckCircle2];
const STEPS = ["step1", "step2", "step3", "step4"] as const;

export function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Dot-grid background */}
      <div className="absolute inset-0 opacity-[0.018]"
        style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Amber glow center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(180,83,9,0.05),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
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

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
          {/* Connecting line (lg only) */}
          <div className="hidden lg:block absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent z-0" />

          {STEPS.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <div key={step} className="relative flex flex-col items-center text-center group px-4">
                {/* Step badge */}
                <div className="relative z-10 mb-7">
                  {/* Outer ring */}
                  <div className="w-[6.5rem] h-[6.5rem] rounded-full border border-border group-hover:border-secondary/50 bg-background transition-all duration-300 flex items-center justify-center relative">
                    {/* Inner circle */}
                    <div className="w-16 h-16 rounded-full border border-border/50 group-hover:border-secondary/30 group-hover:bg-secondary/5 flex items-center justify-center transition-all duration-300">
                      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-secondary transition-colors duration-300" />
                    </div>
                    {/* Step number — top right */}
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center font-mono text-[10px] font-bold text-secondary">
                      {i + 1}
                    </span>
                  </div>
                </div>

                {/* Large number watermark */}
                <div className="relative mb-2">
                  <span className="font-heading font-black text-[4rem] leading-none text-border/25 select-none absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none">
                    {t(`${step}_num`)}
                  </span>
                  <h3 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors duration-300 relative pt-4">
                    {t(step)}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
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
