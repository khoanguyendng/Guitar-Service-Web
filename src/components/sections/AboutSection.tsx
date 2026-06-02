import { useTranslations } from "next-intl";

const STATS = [
  { key: "years" as const, labelKey: "years_label" as const },
  { key: "guitars" as const, labelKey: "guitars_label" as const },
  { key: "satisfaction" as const, labelKey: "satisfaction_label" as const },
  { key: "masters" as const, labelKey: "masters_label" as const },
];

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section className="py-24 sm:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text side */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
              — {t("badge")} —
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-3 leading-tight">
              {t("title")}
            </h2>
            <p className="font-heading text-xl italic text-muted-foreground mb-8">
              {t("subtitle")}
            </p>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("description")}</p>
              <p>{t("description2")}</p>
            </div>

            {/* Vintage tape / badge */}
            <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 border border-border bg-background">
              <div className="w-px h-8 bg-secondary/40" />
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Established
                </p>
                <p className="font-heading text-2xl text-foreground">2000</p>
              </div>
              <div className="w-px h-8 bg-secondary/40" />
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Hanoi
                </p>
                <p className="font-heading text-2xl text-foreground">Vietnam</p>
              </div>
            </div>
          </div>

          {/* Stats side */}
          <div className="grid grid-cols-2 gap-px bg-border">
            {STATS.map(({ key, labelKey }) => (
              <div
                key={key}
                className="bg-background p-8 flex flex-col items-center justify-center text-center group hover:bg-primary/5 transition-colors"
              >
                <span className="font-heading text-5xl sm:text-6xl font-bold text-primary group-hover:text-secondary transition-colors leading-none mb-2">
                  {t(key)}
                </span>
                <div className="w-8 h-px bg-border my-3" />
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground">
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
