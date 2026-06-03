"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  onNext?:       () => void;
  onBack?:       () => void;
  onSkip?:       () => void;
  nextDisabled?: boolean;
  nextLabel?:    string;
  isSubmitting?: boolean;
}

export function StepNav({ onNext, onBack, onSkip, nextDisabled, nextLabel, isSubmitting }: Props) {
  const t = useTranslations("booking_wizard");

  return (
    <div className="flex items-center justify-between pt-6 border-t border-border">
      <div>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t("back")}
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {onSkip && (
          <button
            onClick={onSkip}
            className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            {t("skip")}
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            disabled={nextDisabled || isSubmitting}
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground text-[10px] font-mono tracking-[0.2em] uppercase transition-colors"
          >
            {isSubmitting ? t("submitting") : (nextLabel ?? t("next"))}
            {!isSubmitting && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
}
