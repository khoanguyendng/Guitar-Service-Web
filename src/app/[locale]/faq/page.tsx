import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WarrantyBanner } from "@/components/sections/WarrantyBanner";

type FaqCat = "setup" | "booking" | "pricing" | "warranty";

const CATEGORIES: FaqCat[] = ["setup", "booking", "pricing", "warranty"];
const Q_COUNT = 4;

export default function FaqPage() {
  const t = useTranslations("faq");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CATEGORIES.flatMap((cat) =>
      Array.from({ length: Q_COUNT }, (_, i) => ({
        "@type": "Question",
        name: t(`${cat}_q${i + 1}` as any),
        acceptedAnswer: {
          "@type": "Answer",
          text: t(`${cat}_a${i + 1}` as any),
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-14">
            {CATEGORIES.map((cat) => (
              <div key={cat}>
                {/* Category heading */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-border" />
                  <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary whitespace-nowrap">
                    {t(`cat_${cat}` as any)}
                  </p>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {Array.from({ length: Q_COUNT }, (_, i) => (
                    <AccordionItem
                      key={i}
                      value={`${cat}-${i}`}
                      className="border border-border px-6 data-[state=open]:border-secondary/40 transition-colors"
                    >
                      <AccordionTrigger className="font-heading text-base text-foreground hover:text-primary hover:no-underline py-5 text-left">
                        {t(`${cat}_q${i + 1}` as any)}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-[15px] leading-relaxed pb-5">
                        {t(`${cat}_a${i + 1}` as any)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WarrantyBanner />
    </>
  );
}
