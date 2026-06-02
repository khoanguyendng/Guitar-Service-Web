import { useTranslations } from "next-intl";
import { Sliders, Target, Music2, Sparkles } from "lucide-react";

const PILLARS = [
  { key: "action",      Icon: Sliders   },
  { key: "playability", Icon: Target    },
  { key: "tone",        Icon: Music2    },
  { key: "aesthetics",  Icon: Sparkles  },
] as const;

export function PhilosophySection() {
  const t = useTranslations("philosophy");

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(180,83,9,0.05),transparent)]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-secondary mb-10">
          — {t("badge")} —
        </p>

        {/* Quote */}
        <blockquote className="relative mb-10">
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 font-heading text-[9rem] leading-none text-secondary/10 select-none pointer-events-none">
            &ldquo;
          </span>
          <p className="font-heading text-2xl sm:text-3xl lg:text-[2.2rem] italic text-foreground/85 leading-[1.45] max-w-3xl mx-auto relative">
            {t("quote")}
          </p>
        </blockquote>

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary/50" />
          <span className="text-secondary text-sm">◆</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary/50" />
        </div>

        <p className="text-muted-foreground max-w-2xl mx-auto text-[15px] leading-relaxed mb-16">
          {t("description")}
        </p>

        {/* Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border">
          {PILLARS.map(({ key, Icon }, i) => (
            <div
              key={key}
              className="bg-background p-8 flex flex-col items-center gap-4 group hover:bg-card transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full border border-border group-hover:border-secondary/50 bg-background group-hover:bg-secondary/10 flex items-center justify-center transition-all duration-300">
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors duration-300" />
              </div>
              <div className="text-center">
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-secondary/50 mb-1.5">
                  0{i + 1}
                </div>
                <div className="font-heading text-lg text-foreground mb-1.5">
                  {t(key)}
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {t(`${key}_desc` as any)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
