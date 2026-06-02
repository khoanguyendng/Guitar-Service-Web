import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ShieldCheck } from "lucide-react";

export function WarrantyBanner() {
  const t = useTranslations("warranty");

  return (
    <div className="relative border-y border-secondary/20 bg-secondary/5 overflow-hidden">
      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 1px, transparent 12px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">

          {/* Icon + title */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-11 h-11 rounded-full border border-secondary/40 bg-secondary/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-secondary/70 mb-0.5">
                {t("badge")}
              </p>
              <p className="font-heading text-lg text-foreground leading-tight">
                {t("title")}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-10 bg-border shrink-0" />

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed text-center sm:text-left flex-1">
            {t("description")}
          </p>

          {/* CTA */}
          <Link
            href="/faq"
            className="shrink-0 text-[10px] font-mono tracking-[0.2em] uppercase text-secondary border-b border-secondary/30 hover:border-secondary pb-0.5 transition-colors whitespace-nowrap"
          >
            {t("learn_more")}
          </Link>
        </div>
      </div>
    </div>
  );
}
