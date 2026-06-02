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

const SERVICE_DURATIONS = ["1–2 ngày", "3–5 ngày", "2–4 tuần", "2–3 ngày"];

export default function ServicesPage() {
  const t = useTranslations("services");
  const tFaq = useTranslations("faq");

  const serviceItems = [
    {
      num: "01",
      icon: Settings,
      name: t("setup"),
      desc: t("setup_desc"),
      price: t("setup_price"),
      duration: SERVICE_DURATIONS[0],
    },
    {
      num: "02",
      icon: Wrench,
      name: t("repair"),
      desc: t("repair_desc"),
      price: t("repair_price"),
      duration: SERVICE_DURATIONS[1],
    },
    {
      num: "03",
      icon: Sparkles,
      name: t("restoration"),
      desc: t("restoration_desc"),
      price: t("restoration_price"),
      duration: SERVICE_DURATIONS[2],
    },
    {
      num: "04",
      icon: Zap,
      name: t("electronics"),
      desc: t("electronics_desc"),
      price: t("electronics_price"),
      duration: SERVICE_DURATIONS[3],
    },
  ];

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
            {serviceItems.map(({ num, icon: Icon, name, desc, price, duration }) => (
              <div
                key={num}
                className="group bg-background hover:bg-card transition-colors duration-300 p-10 flex flex-col"
              >
                {/* Number + Icon Row */}
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-7xl font-bold text-border leading-none select-none">
                    {num}
                  </span>
                  <div className="w-12 h-12 rounded-full border border-border group-hover:border-secondary/50 flex items-center justify-center group-hover:bg-secondary/10 transition-all duration-300">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h2 className="font-heading text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                  {name}
                </h2>
                <p className="text-muted-foreground leading-relaxed flex-1 text-base">
                  {desc}
                </p>

                {/* Price + Duration Row */}
                <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-1">
                      {t("from")}
                    </p>
                    <p className="font-heading text-xl text-secondary">{price}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-1">
                      Thời gian
                    </p>
                    <p className="font-mono text-sm text-foreground">{duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
              — {tFaq("badge")} —
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-5">
              {tFaq("title")}
            </h2>
            <div className="retro-divider mx-auto w-40">
              <span className="text-secondary text-sm">◆</span>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1" className="border border-border bg-background px-6">
              <AccordionTrigger className="font-heading text-left text-base hover:no-underline hover:text-secondary">
                {tFaq("q1")}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {tFaq("a1")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-border bg-background px-6">
              <AccordionTrigger className="font-heading text-left text-base hover:no-underline hover:text-secondary">
                {tFaq("q2")}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {tFaq("a2")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-border bg-background px-6">
              <AccordionTrigger className="font-heading text-left text-base hover:no-underline hover:text-secondary">
                {tFaq("q3")}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {tFaq("a3")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border border-border bg-background px-6">
              <AccordionTrigger className="font-heading text-left text-base hover:no-underline hover:text-secondary">
                {tFaq("q4")}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {tFaq("a4")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 bg-[#0a0603] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/40 via-transparent to-amber-950/40" />
        <div className="relative z-10 text-center px-4">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-500/70 mb-4">
            — Sẵn sàng bắt đầu —
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-amber-50 mb-6">
            Đặt lịch dịch vụ ngay hôm nay
          </h2>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_24px_rgba(217,119,6,0.4)]"
          >
            Đặt lịch ngay
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
