"use client";

import { useTranslations } from "next-intl";
import type { BookingFormData } from "../BookingWizard";
import { StepNav } from "./StepNav";

interface Props {
  data:   BookingFormData;
  update: (f: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Contact({ data, update, onNext, onBack }: Props) {
  const t  = useTranslations("booking_wizard");
  const tb = useTranslations("booking");

  const isValid = data.name.length >= 2 && data.phone.length >= 9 && data.email.includes("@");

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-heading text-2xl text-foreground mb-1">{t("step4_title")}</h3>
        <p className="text-muted-foreground text-sm">{t("step4_subtitle")}</p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            {tb("name")} *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={e => update({ name: e.target.value })}
            placeholder="Nguyễn Văn A"
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary/60 transition-colors"
          />
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              {tb("phone")} *
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={e => update({ phone: e.target.value })}
              placeholder="0901 234 567"
              className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary/60 transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              {tb("email")} *
            </label>
            <input
              type="email"
              value={data.email}
              onChange={e => update({ email: e.target.value })}
              placeholder="your@email.com"
              className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary/60 transition-colors"
            />
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            {t("language_label")}
          </label>
          <div className="flex gap-3">
            {(["vi", "en"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => update({ language: lang })}
                className={`flex-1 py-3 border text-xs font-mono tracking-[0.2em] uppercase transition-all ${
                  data.language === lang
                    ? "border-secondary bg-secondary/10 text-secondary"
                    : "border-border text-muted-foreground hover:border-secondary/40"
                }`}
              >
                {t(lang === "vi" ? "lang_vi" : "lang_en")}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            {t("additional_notes")}
          </label>
          <textarea
            value={data.description}
            onChange={e => update({ description: e.target.value })}
            placeholder={t("notes_placeholder")}
            rows={3}
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary/60 transition-colors resize-none"
          />
        </div>
      </div>

      <StepNav onNext={onNext} onBack={onBack} nextDisabled={!isValid} />
    </div>
  );
}
