"use client";

import { useTranslations } from "next-intl";
import type { BookingFormData } from "../BookingWizard";
import { StepNav } from "./StepNav";

const CONDITIONS = ["like_new", "good", "fair", "needs_work"] as const;

interface Props {
  data: BookingFormData;
  update: (f: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Instrument({ data, update, onNext, onBack }: Props) {
  const t  = useTranslations("booking_wizard");
  const tg = useTranslations("guitar_types");
  const ts = useTranslations("service_types");

  const GUITAR_TYPES = ["acoustic", "classical", "electric", "bass", "ukulele", "twelve_string", "other"] as const;

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-heading text-2xl text-foreground mb-1">{t("step2_title")}</h3>
        <p className="text-muted-foreground text-sm">{t("step2_subtitle")}</p>
      </div>

      <div className="space-y-5">
        {/* Guitar type */}
        <div>
          <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            {t("guitar_type_label")} *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {GUITAR_TYPES.map((key) => (
              <button
                key={key}
                onClick={() => update({ guitar_type: key })}
                className={`px-3 py-2.5 border text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                  data.guitar_type === key
                    ? "border-secondary bg-secondary/10 text-secondary"
                    : "border-border text-muted-foreground hover:border-secondary/40 hover:text-foreground"
                }`}
              >
                {tg(key)}
              </button>
            ))}
          </div>
        </div>

        {/* Brand + Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              {t("brand_label")}
            </label>
            <input
              type="text"
              value={data.brand}
              onChange={e => update({ brand: e.target.value })}
              placeholder={t("brand_placeholder")}
              className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary/60 transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              {t("model_label")}
            </label>
            <input
              type="text"
              value={data.model}
              onChange={e => update({ model: e.target.value })}
              placeholder={t("model_placeholder")}
              className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary/60 transition-colors"
            />
          </div>
        </div>

        {/* Condition */}
        <div>
          <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            {t("condition_label")}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CONDITIONS.map((c) => (
              <button
                key={c}
                onClick={() => update({ condition: c })}
                className={`px-3 py-2.5 border text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                  data.condition === c
                    ? "border-secondary bg-secondary/10 text-secondary"
                    : "border-border text-muted-foreground hover:border-secondary/40"
                }`}
              >
                {t(`condition_${c}` as any)}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            {t("condition_notes_label")}
          </label>
          <textarea
            value={data.condition_notes}
            onChange={e => update({ condition_notes: e.target.value })}
            placeholder={t("condition_notes_placeholder")}
            rows={3}
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary/60 transition-colors resize-none"
          />
        </div>
      </div>

      <StepNav onNext={onNext} onBack={onBack} nextDisabled={!data.guitar_type} />
    </div>
  );
}
