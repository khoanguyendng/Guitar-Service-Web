import { useTranslations } from "next-intl";

const STATS = [
  { key: "years"        as const, labelKey: "years_label"        as const, accent: true  },
  { key: "guitars"      as const, labelKey: "guitars_label"      as const, accent: false },
  { key: "satisfaction" as const, labelKey: "satisfaction_label" as const, accent: false },
  { key: "masters"      as const, labelKey: "masters_label"      as const, accent: false },
];

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section className="py-24 sm:py-32 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-secondary mb-4">
              — {t("badge")} —
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground mb-3 leading-tight">
              {t("title")}
            </h2>
            <p className="font-heading text-xl italic text-muted-foreground mb-8">
              {t("subtitle")}
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
              <p>{t("description")}</p>
              <p>{t("description2")}</p>
            </div>

            {/* Vintage tape badge */}
            <div className="mt-10 inline-flex items-stretch gap-0 border border-border overflow-hidden">
              <div className="bg-primary px-5 py-3 flex items-center">
                <span className="font-heading text-2xl font-bold text-primary-foreground leading-none">2000</span>
              </div>
              <div className="px-5 py-3 flex flex-col justify-center bg-background">
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Established</p>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground/60">Hanoi · Vietnam</p>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-px bg-border">
            {STATS.map(({ key, labelKey, accent }) => (
              <div
                key={key}
                className={`relative flex flex-col items-center justify-center text-center p-10 sm:p-12 group transition-colors duration-300 overflow-hidden
                  ${accent
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-background hover:bg-primary/5"
                  }`}
              >
                {/* Subtle background number */}
                <span className={`absolute inset-0 flex items-center justify-center font-heading font-black text-[5rem] leading-none select-none pointer-events-none transition-opacity
                  ${accent ? "text-primary-foreground/5" : "text-border/30"}`}>
                  {t(key).replace(/[^0-9]/g, "") || "∞"}
                </span>

                <span className={`relative font-heading text-5xl sm:text-6xl font-bold leading-none mb-3 transition-colors
                  ${accent ? "text-primary-foreground" : "text-primary group-hover:text-secondary"}`}>
                  {t(key)}
                </span>
                <div className={`w-8 h-px mb-3 ${accent ? "bg-primary-foreground/30" : "bg-border"}`} />
                <span className={`text-[10px] font-mono tracking-[0.25em] uppercase
                  ${accent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {t(labelKey)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
