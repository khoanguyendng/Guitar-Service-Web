"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BookingFormData } from "../BookingWizard";
import { StepNav } from "./StepNav";

const TIME_SLOTS = ["morning", "afternoon", "flexible"] as const;

// Days blocked for demo (e.g. days 3, 7, 14, 21 of current month)
const DEMO_BLOCKED_DAYS = new Set([3, 7, 12, 14, 19, 21, 26]);

const MONTH_NAMES_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES_EN   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

interface Props {
  data:   BookingFormData;
  update: (f: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3DateTime({ data, update, onNext, onBack }: Props) {
  const t = useTranslations("booking_wizard");
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay    = new Date(year, month, 1).getDay(); // 0=Sun

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectDate = (day: number) => {
    const d = new Date(year, month, day);
    const iso = d.toISOString().split("T")[0];
    update({ preferred_date: iso });
  };

  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    const dow = d.getDay();
    if (d < today) return true;       // past
    if (dow === 0) return true;        // Sunday closed
    if (DEMO_BLOCKED_DAYS.has(day)) return true;
    return false;
  };

  const isSelected = (day: number) => {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return data.preferred_date === iso;
  };

  const isToday = (day: number) =>
    year === today.getFullYear() && month === today.getMonth() && day === today.getDate();

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-heading text-2xl text-foreground mb-1">{t("step3_title")}</h3>
        <p className="text-muted-foreground text-sm">{t("step3_subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="border border-border bg-background p-5">
          {/* Month header */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-colors">
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <span className="font-heading text-base text-foreground">
              {MONTH_NAMES_EN[month]} {year}
            </span>
            <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-colors">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_NAMES_EN.map(d => (
              <div key={d} className="text-center font-mono text-[9px] tracking-wider uppercase text-muted-foreground/60 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-px">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const disabled = isDisabled(day);
              const selected = isSelected(day);
              const today_ = isToday(day);
              return (
                <button
                  key={day}
                  onClick={() => !disabled && selectDate(day)}
                  disabled={disabled}
                  className={`
                    aspect-square flex items-center justify-center text-sm transition-all duration-150
                    ${selected ? "bg-primary text-primary-foreground font-medium" : ""}
                    ${today_ && !selected ? "ring-1 ring-secondary/60 text-secondary" : ""}
                    ${disabled ? "text-muted-foreground/25 cursor-not-allowed" : !selected ? "hover:bg-secondary/10 text-foreground cursor-pointer" : ""}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Booked / Closed</span>
            </div>
          </div>
        </div>

        {/* Time slot */}
        <div>
          <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            {t("time_label")}
          </label>
          <div className="space-y-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => update({ time_slot: slot })}
                className={`w-full text-left px-5 py-4 border transition-all duration-200 ${
                  data.time_slot === slot
                    ? "border-secondary bg-secondary/10"
                    : "border-border hover:border-secondary/40 bg-background"
                }`}
              >
                <p className={`font-heading text-base ${data.time_slot === slot ? "text-primary" : "text-foreground"}`}>
                  {t(`time_${slot}` as any)}
                </p>
              </button>
            ))}
          </div>

          {data.preferred_date && (
            <div className="mt-4 p-4 bg-secondary/5 border border-secondary/20">
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-secondary mb-1">Selected</p>
              <p className="font-heading text-base text-foreground">{data.preferred_date}</p>
            </div>
          )}
        </div>
      </div>

      <StepNav onNext={onNext} onBack={onBack} nextDisabled={!data.preferred_date} />
    </div>
  );
}
