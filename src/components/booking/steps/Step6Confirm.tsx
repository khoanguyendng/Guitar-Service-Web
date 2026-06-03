"use client";

import { useTranslations } from "next-intl";
import { Pencil } from "lucide-react";
import type { BookingFormData } from "../BookingWizard";
import { StepNav } from "./StepNav";

interface Props {
  data:         BookingFormData;
  onBack:       () => void;
  onGoTo:       (step: number) => void;
  onSubmit:     () => void;
  isSubmitting: boolean;
  error:        string;
}

function Row({ label, value, onEdit }: { label: string; value: string; onEdit?: () => void }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-0">
      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground w-28 shrink-0">{label}</span>
      <span className="text-sm text-foreground flex-1 text-right">{value || "—"}</span>
      {onEdit && (
        <button onClick={onEdit} className="ml-3 w-6 h-6 flex items-center justify-center hover:text-secondary text-muted-foreground/50 transition-colors">
          <Pencil className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

export function Step6Confirm({ data, onBack, onGoTo, onSubmit, isSubmitting, error }: Props) {
  const t  = useTranslations("booking_wizard");
  const tp = useTranslations("price_list");

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-heading text-2xl text-foreground mb-1">{t("step6_title")}</h3>
        <p className="text-muted-foreground text-sm">{t("step6_subtitle")}</p>
      </div>

      <div className="space-y-4 mb-6">
        {/* Service */}
        <div className="border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-secondary">{t("service_section")}</p>
            <button onClick={() => onGoTo(1)} className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground/60 hover:text-secondary transition-colors flex items-center gap-1">
              <Pencil className="w-2.5 h-2.5" /> {t("edit")}
            </button>
          </div>
          <p className="font-heading text-lg text-foreground">{data.service_label || tp(`service_${data.service_type}` as any)}</p>
          <p className="font-heading text-sm text-secondary">{data.service_price}</p>
        </div>

        {/* Instrument */}
        <div className="border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-secondary">{t("instrument_section")}</p>
            <button onClick={() => onGoTo(2)} className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground/60 hover:text-secondary transition-colors flex items-center gap-1">
              <Pencil className="w-2.5 h-2.5" /> {t("edit")}
            </button>
          </div>
          <div className="space-y-0.5">
            <Row label="Type" value={data.guitar_type} />
            {data.brand && <Row label="Brand" value={data.brand} />}
            {data.model && <Row label="Model" value={data.model} />}
            <Row label="Condition" value={data.condition.replace("_", " ")} />
          </div>
        </div>

        {/* Schedule */}
        <div className="border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-secondary">{t("schedule_section")}</p>
            <button onClick={() => onGoTo(3)} className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground/60 hover:text-secondary transition-colors flex items-center gap-1">
              <Pencil className="w-2.5 h-2.5" /> {t("edit")}
            </button>
          </div>
          <Row label="Date" value={data.preferred_date} />
          <Row label="Time" value={data.time_slot.replace("_", " ")} />
        </div>

        {/* Contact */}
        <div className="border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-secondary">{t("contact_section")}</p>
            <button onClick={() => onGoTo(4)} className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground/60 hover:text-secondary transition-colors flex items-center gap-1">
              <Pencil className="w-2.5 h-2.5" /> {t("edit")}
            </button>
          </div>
          <Row label="Name"  value={data.name}  />
          <Row label="Phone" value={data.phone} />
          <Row label="Email" value={data.email} />
        </div>
      </div>

      {/* Photo indicator */}
      {data.photo_name && (
        <div className="mb-4 flex items-center gap-2 text-xs text-secondary/70">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase">Photo attached:</span>
          <span>{data.photo_name}</span>
        </div>
      )}

      <p className="text-xs text-muted-foreground/60 mb-5">{t("terms_note")}</p>

      {error && (
        <div className="mb-4 px-4 py-3 border border-destructive/40 bg-destructive/5 text-sm text-destructive">
          {error}
        </div>
      )}

      <StepNav
        onBack={onBack}
        onNext={onSubmit}
        nextLabel={t("submit")}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
