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
    <section className="py-24 sm:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ nameKey, guitarKey, contentKey, rating }) => (
            <div
              key={nameKey}
              className="relative bg-background border border-border p-8 flex flex-col group hover:border-secondary/40 transition-all duration-300 hover:shadow-md"
            >
              {/* Big quote mark */}
              <span
                className="absolute -top-4 left-6 font-heading text-7xl text-secondary/20 leading-none select-none group-hover:text-secondary/30 transition-colors"
                aria-hidden
              >
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed italic flex-1 text-sm">
                {t(contentKey)}
              </p>

              {/* Divider */}
              <div className="my-5 h-px bg-border" />

              {/* Author */}
              <div>
                <p className="font-heading text-base text-foreground">
                  {t(nameKey)}
                </p>
                <p className="font-mono text-[11px] tracking-widest uppercase text-secondary/70 mt-0.5">
                  {t(guitarKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
