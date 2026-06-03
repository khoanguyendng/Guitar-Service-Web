"use client";

import { useTranslations } from "next-intl";
import { Settings, Wrench, Sparkles, Zap, MessageSquare, SlidersHorizontal } from "lucide-react";
import type { BookingFormData } from "../BookingWizard";
import { StepNav } from "./StepNav";

const SERVICES = [
  { key: "basic",        Icon: SlidersHorizontal, price: "350,000–500,000₫",   duration: "1–2 days"   },
  { key: "full",         Icon: Settings,           price: "700,000–1,200,000₫", duration: "2–3 days"   },
  { key: "fret",         Icon: Wrench,             price: "800,000–1,500,000₫", duration: "3–5 days"   },
  { key: "electronics",  Icon: Zap,                price: "From 300,000₫",      duration: "1–2 days"   },
  { key: "restoration",  Icon: Sparkles,           price: "From 2,000,000₫",    duration: "2–4 weeks"  },
  { key: "consult",      Icon: MessageSquare,      price: "150,000₫",           duration: "30 min"     },
] as const;

interface Props {
  data: BookingFormData;
  update: (f: Partial<BookingFormData>) => void;
  onNext: () => void;
}

export function Step1Service({ data, update, onNext }: Props) {
  const t  = useTranslations("booking_wizard");
  const tp = useTranslations("price_list");

  const select = (key: string, label: string, price: string) => {
    update({ service_type: key, service_label: label, service_price: price });
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-heading text-2xl text-foreground mb-1">{t("step1_title")}</h3>
        <p className="text-muted-foreground text-sm">{t("step1_subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {SERVICES.map(({ key, Icon, price, duration }) => {
          const label = tp(`service_${key}` as any);
          const selected = data.service_type === key;
          return (
            <button
              key={key}
              onClick={() => select(key, label, price)}
              className={`group relative text-left p-5 border transition-all duration-200 overflow-hidden flex items-start gap-4 ${
                selected
                  ? "border-secondary bg-secondary/10"
                  : "border-border hover:border-secondary/50 bg-background hover:bg-card"
              }`}
            >
              {/* Selected indicator */}
              {selected && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700" />
              )}

              <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                selected ? "border-secondary bg-secondary/20" : "border-border group-hover:border-secondary/40"
              }`}>
                <Icon className={`w-4 h-4 transition-colors ${selected ? "text-secondary" : "text-muted-foreground group-hover:text-secondary"}`} />
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-heading text-base mb-0.5 transition-colors ${selected ? "text-primary" : "text-foreground"}`}>
                  {label}
                </p>
                <p className={`font-heading text-sm ${selected ? "text-secondary" : "text-secondary/70"}`}>
                  {price}
                </p>
                <p className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/60 mt-1">
                  {duration}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <StepNav onNext={onNext} nextDisabled={!data.service_type} />
    </div>
  );
}
