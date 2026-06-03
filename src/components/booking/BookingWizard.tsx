"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Step1Service }   from "./steps/Step1Service";
import { Step2Instrument } from "./steps/Step2Instrument";
import { Step3DateTime }  from "./steps/Step3DateTime";
import { Step4Contact }   from "./steps/Step4Contact";
import { Step5Photo }     from "./steps/Step5Photo";
import { Step6Confirm }   from "./steps/Step6Confirm";

export interface BookingFormData {
  service_type:     string;
  service_label:    string;
  service_price:    string;
  guitar_type:      string;
  brand:            string;
  model:            string;
  condition:        string;
  condition_notes:  string;
  preferred_date:   string;
  time_slot:        string;
  name:             string;
  phone:            string;
  email:            string;
  language:         string;
  description:      string;
  photo_name?:      string;
  photo_base64?:    string;
}

const INITIAL: BookingFormData = {
  service_type: "", service_label: "", service_price: "",
  guitar_type: "", brand: "", model: "",
  condition: "good", condition_notes: "",
  preferred_date: "", time_slot: "flexible",
  name: "", phone: "", email: "", language: "vi",
  description: "",
};

const TOTAL = 6;

const STEP_KEYS = ["service", "instrument", "datetime", "contact", "photo", "confirm"];

export function BookingWizard() {
  const t    = useTranslations("booking_wizard");
  const locale = useLocale();
  const [step, setStep]           = useState(1);
  const [data, setData]           = useState<BookingFormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState("");

  const update = (fields: Partial<BookingFormData>) =>
    setData(prev => ({ ...prev, ...fields }));

  const next = () => setStep(s => Math.min(s + 1, TOTAL));
  const back = () => setStep(s => Math.max(s - 1, 1));
  const goTo = (n: number) => setStep(n);

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        name:           data.name,
        phone:          data.phone,
        email:          data.email,
        service_type:   data.service_type,
        guitar_type:    data.guitar_type,
        preferred_date: data.preferred_date,
        description:    JSON.stringify({
          service_label: data.service_label,
          brand:         data.brand,
          model:         data.model,
          condition:     data.condition,
          time_slot:     data.time_slot,
          language:      data.language,
          notes:         data.description,
          condition_notes: data.condition_notes,
        }),
      };
      const res = await fetch(`/${locale}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "error");
      }
      setSubmitted(true);
    } catch {
      setError(t("error_generic"));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-heading text-3xl text-foreground mb-3">{t("success_title")}</h2>
        <p className="text-muted-foreground text-[15px] max-w-sm mx-auto mb-8 leading-relaxed">
          {t("success_desc")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-xs font-mono tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
        >
          {t("success_back")} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            {t("step_label")} {step} {t("of_label")} {TOTAL}
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary">
            {t(`step${step}_title`)}
          </p>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: TOTAL }, (_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 transition-colors duration-300 ${
                i + 1 < step
                  ? "bg-primary"
                  : i + 1 === step
                  ? "bg-primary/60"
                  : "bg-border"
              }`}
            />
          ))}
        </div>
        {/* Step labels */}
        <div className="hidden sm:flex justify-between mt-2">
          {STEP_KEYS.map((key, i) => (
            <span
              key={key}
              className={`font-mono text-[8px] tracking-[0.2em] uppercase transition-colors ${
                i + 1 === step ? "text-secondary" : i + 1 < step ? "text-primary/60" : "text-border"
              }`}
            >
              {t(`step_${key}`)}
            </span>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="min-h-[420px]">
        {step === 1 && <Step1Service data={data} update={update} onNext={next} />}
        {step === 2 && <Step2Instrument data={data} update={update} onNext={next} onBack={back} />}
        {step === 3 && <Step3DateTime data={data} update={update} onNext={next} onBack={back} />}
        {step === 4 && <Step4Contact data={data} update={update} onNext={next} onBack={back} />}
        {step === 5 && <Step5Photo data={data} update={update} onNext={next} onBack={back} />}
        {step === 6 && (
          <Step6Confirm
            data={data}
            onBack={back}
            onGoTo={goTo}
            onSubmit={submit}
            isSubmitting={submitting}
            error={error}
          />
        )}
      </div>
    </div>
  );
}
