import { useTranslations } from "next-intl";
import { Zap, Music2, Waves, Music } from "lucide-react";

const INSTRUMENTS = [
  { key: "electric",   Icon: Zap,    accent: true  },
  { key: "acoustic",   Icon: Music2, accent: false },
  { key: "bass",       Icon: Waves,  accent: false },
  { key: "classical",  Icon: Music,  accent: false },
] as const;

export function InstrumentTypesSection() {
  const t = useTranslations("instruments");

  return (
    <section className="py-24 sm:py-32 bg-card overflow-hidden">
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
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTRUMENTS.map(({ key, Icon, accent }) => (
            <div
              key={key}
              className={`group relative p-8 border border-border hover:border-secondary/40 transition-all duration-300 overflow-hidden
                ${accent ? "bg-primary/5" : "bg-background"}`}
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Ghost number */}
              <span className="absolute -bottom-3 -right-2 font-heading font-black text-[5rem] leading-none text-border/30 select-none group-hover:text-secondary/10 transition-colors duration-300 pointer-events-none">
                0{INSTRUMENTS.findIndex(i => i.key === key) + 1}
              </span>

              {/* Icon */}
              <div
                className={`relative w-12 h-12 rounded-full border flex items-center justify-center mb-6 transition-all duration-300
                  ${accent
                    ? "border-secondary/50 bg-secondary/10 group-hover:bg-secondary/20"
                    : "border-border group-hover:border-secondary/50 group-hover:bg-secondary/10"}`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-300
                    ${accent ? "text-secondary" : "text-muted-foreground group-hover:text-secondary"}`}
                />
              </div>

              {/* Text */}
              <h3 className="relative font-heading text-xl text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                {t(key)}
              </h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">
                {t(`${key}_desc` as any)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
