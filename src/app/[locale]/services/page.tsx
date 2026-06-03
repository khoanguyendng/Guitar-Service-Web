import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { PageHero } from "@/components/sections/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Settings, Wrench, Sparkles, Zap, ArrowRight } from "lucide-react";

const SERVICES = [
  { num: "01", icon: Settings, key: "setup" },
  { num: "02", icon: Wrench,   key: "repair" },
  { num: "03", icon: Sparkles, key: "restoration" },
  { num: "04", icon: Zap,      key: "electronics" },
] as const;

export default function ServicesPage() {
  const t    = useTranslations("services");
  const tFaq = useTranslations("faq");

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {SERVICES.map(({ num, icon: Icon, key }) => (
              <div
                key={num}
                className="group bg-background hover:bg-card transition-colors duration-300 p-10 flex flex-col"
              >
                {/* Number + Icon */}
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-7xl font-bold text-border leading-none select-none">
                    {num}
                  </span>
                  <div className="w-12 h-12 rounded-full border border-border group-hover:border-secondary/50 flex items-center justify-center group-hover:bg-secondary/10 transition-all duration-300">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </div>
                </div>

                <h2 className="font-heading text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                  {t(key)}
                </h2>
                <p className="text-muted-foreground leading-relaxed flex-1 text-base">
                  {t(`${key}_desc` as any)}
                </p>

                {/* Price + Duration */}
                <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-1">
                      {t("from")}
                    </p>
                    <p className="font-heading text-xl text-secondary">
                      {t(`${key}_price` as any)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-1">
                      {t("duration_label")}
                    </p>
                    <p className="font-mono text-sm text-foreground">
                      {t(`${key}_duration` as any)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="py-24 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
              — {tFaq("badge")} —
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-5">
              {tFaq("title")}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary/50" />
              <span className="text-secondary text-sm">◆</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary/50" />
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {(["setup_q1", "setup_q2", "booking_q1", "pricing_q1"] as const).map((qKey, i) => {
              const aKey = qKey.replace("_q", "_a") as any;
              return (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border bg-background px-6">
                  <AccordionTrigger className="font-heading text-left text-base hover:no-underline hover:text-secondary">
                    {tFaq(qKey)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {tFaq(aKey)}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="text-[10px] font-mono tracking-[0.2em] uppercase text-secondary border-b border-secondary/30 hover:border-secondary pb-0.5 transition-colors"
            >
              {tFaq("badge")} →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 bg-[#0a0603] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/40 via-transparent to-amber-950/40" />
        <div className="relative z-10 text-center px-4">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-500/70 mb-4">
            — {t("cta_badge")} —
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-amber-50 mb-6">
            {t("cta_title")}
          </h2>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_24px_rgba(217,119,6,0.4)]"
          >
            {t("cta_button")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
