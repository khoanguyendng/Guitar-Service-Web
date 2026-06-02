import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { nameKey: "t1_name", guitarKey: "t1_guitar", contentKey: "t1_content", rating: 5 },
  { nameKey: "t2_name", guitarKey: "t2_guitar", contentKey: "t2_content", rating: 5 },
  { nameKey: "t3_name", guitarKey: "t3_guitar", contentKey: "t3_content", rating: 5 },
] as const;

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="relative py-24 sm:py-32 bg-foreground dark:bg-[#0d0803] overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 1px, transparent 12px)" }} />
      {/* Amber glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(180,83,9,0.12),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-amber-500/70 mb-4">
            — {t("badge")} —
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-background dark:text-amber-50/90 mb-5">
            {t("title")}
          </h2>
          <div className="flex items-center justify-center gap-4 my-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/40" />
            <span className="text-amber-600/60 text-sm">◆</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/40" />
          </div>
          <p className="text-background/50 dark:text-amber-100/40 max-w-md mx-auto italic font-heading text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map(({ nameKey, guitarKey, contentKey, rating }, i) => (
            <div
              key={nameKey}
              className="group relative bg-background/8 dark:bg-amber-950/20 border border-background/10 dark:border-amber-800/20 backdrop-blur-sm p-8 flex flex-col hover:bg-background/12 dark:hover:bg-amber-950/30 hover:border-background/20 dark:hover:border-amber-700/30 transition-all duration-300"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Giant quote mark */}
              <div className="absolute -top-5 left-6">
                <span className="font-heading text-[6rem] leading-none text-amber-500/30 group-hover:text-amber-500/45 transition-colors duration-300 select-none">
                  &ldquo;
                </span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5 mt-4">
                {Array.from({ length: rating }).map((_, si) => (
                  <Star key={si} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-background/75 dark:text-amber-100/70 leading-relaxed italic flex-1 text-[15px]">
                {t(contentKey)}
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-background/10 dark:bg-amber-800/20" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-background/15 dark:border-amber-700/30 bg-background/8 flex items-center justify-center shrink-0">
                  <span className="font-heading text-sm font-bold text-amber-400">
                    {t(nameKey).charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-[15px] text-background/90 dark:text-amber-50/80">
                    {t(nameKey)}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-amber-500/60 mt-0.5">
                    {t(guitarKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
