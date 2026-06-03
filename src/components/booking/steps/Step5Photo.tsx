"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Upload, X, ImageIcon } from "lucide-react";
import type { BookingFormData } from "../BookingWizard";
import { StepNav } from "./StepNav";

interface Props {
  data:   BookingFormData;
  update: (f: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step5Photo({ data, update, onNext, onBack }: Props) {
  const t    = useTranslations("booking_wizard");
  const ref  = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.match(/image\/(jpeg|jpg|png|heic)/i)) return;
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      update({ photo_name: file.name, photo_base64: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clear = () => update({ photo_name: undefined, photo_base64: undefined });

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-heading text-2xl text-foreground mb-1">{t("step5_title")}</h3>
        <p className="text-muted-foreground text-sm">{t("step5_subtitle")}</p>
      </div>

      {data.photo_base64 ? (
        <div className="relative border border-secondary/40 bg-secondary/5 p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 border border-border overflow-hidden shrink-0">
              <img src={data.photo_base64} alt="Guitar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-secondary mb-0.5">{t("photo_added")}</p>
              <p className="text-sm text-foreground truncate">{data.photo_name}</p>
            </div>
            <button onClick={clear} className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <button
            onClick={() => ref.current?.click()}
            className="mt-3 text-[10px] font-mono tracking-[0.2em] uppercase text-secondary/70 hover:text-secondary transition-colors"
          >
            {t("change_photo")}
          </button>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => ref.current?.click()}
          className="border-2 border-dashed border-border hover:border-secondary/50 bg-background hover:bg-card transition-all duration-200 p-12 text-center cursor-pointer mb-6 group"
        >
          <div className="w-12 h-12 rounded-full border border-border group-hover:border-secondary/50 flex items-center justify-center mx-auto mb-4 transition-colors">
            <ImageIcon className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">{t("upload_label")}</p>
          <p className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50">{t("upload_hint")}</p>
        </div>
      )}

      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/heic"
        onChange={onInput}
        className="hidden"
      />

      <StepNav onNext={onNext} onBack={onBack} onSkip={!data.photo_base64 ? onNext : undefined} />
    </div>
  );
}
