import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/PageHero";
import { WarrantyBanner } from "@/components/sections/WarrantyBanner";
import { Link } from "@/lib/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";

const SERVICES = [
  "basic",
  "full",
  "fret",
  "nut",
  "electronics",
  "brace",
  "consult",
] as const;

export default function PriceListPage() {
  const t = useTranslations("price_list");

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Price Table */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Desktop table */}
          <div className="hidden md:block border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-card border-b border-border">
                  {(["col_service", "col_desc", "col_duration", "col_price", "col_warranty"] as const).map((col) => (
                    <th
                      key={col}
                      className="px-6 py-4 text-left font-mono text-[9px] tracking-[0.3em] uppercase text-secondary"
                    >
                      {t(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((key, i) => (
                  <tr
                    key={key}
                    className={`border-b border-border last:border-0 hover:bg-card transition-colors group ${
                      i % 2 === 0 ? "bg-background" : "bg-background/50"
                    }`}
                  >
                    <td className="px-6 py-5">
                      <span className="font-heading text-base text-foreground group-hover:text-primary transition-colors">
                        {t(`service_${key}` as any)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-muted-foreground leading-relaxed max-w-xs">
                      {t(`service_${key}_desc` as any)}
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 bg-muted px-2 py-1 whitespace-nowrap">
                        {t(`service_${key}_duration` as any)}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-heading text-base text-secondary whitespace-nowrap">
                        {t(`service_${key}_price` as any)}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`font-mono text-[10px] tracking-wider ${
                          t(`service_${key}_warranty` as any) === t("warranty_na") || t(`service_${key}_warranty` as any) === "—"
                            ? "text-muted-foreground/40"
                            : "text-secondary/80"
                        }`}
                      >
                        {t(`service_${key}_warranty` as any)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {SERVICES.map((key) => (
              <div key={key} className="border border-border p-6 bg-background">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-lg text-foreground">
                    {t(`service_${key}` as any)}
                  </h3>
                  <span className="font-heading text-lg text-secondary ml-4 shrink-0">
                    {t(`service_${key}_price` as any)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {t(`service_${key}_desc` as any)}
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50 bg-muted px-2 py-0.5">
                    {t(`service_${key}_duration` as any)}
                  </span>
                  <span className="font-mono text-[9px] text-secondary/70">
                    {t(`service_${key}_warranty` as any)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="mt-6 text-xs text-muted-foreground/60 font-mono tracking-wide text-center italic">
            * {t("note")}
          </p>
        </div>
      </section>

      {/* Warranty section */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 rounded-full border border-secondary/40 bg-secondary/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-5 h-5 text-secondary" />
          </div>
          <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-secondary mb-4">
            — {t("warranty_section_title")} —
          </p>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xl mx-auto mb-8">
            {t("warranty_section_desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground text-[11px] font-mono tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-[0_0_24px_rgba(217,119,6,0.4)]"
            >
              {t("cta_book")}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-secondary/30 text-muted-foreground hover:border-secondary/60 hover:text-foreground text-[11px] font-mono tracking-[0.25em] uppercase transition-all duration-300"
            >
              {t("cta_faq")}
            </Link>
          </div>
        </div>
      </section>

      <WarrantyBanner />
    </>
  );
}
