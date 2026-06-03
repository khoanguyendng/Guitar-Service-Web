"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Link } from "@/lib/navigation";
import { PageHero } from "@/components/sections/PageHero";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

type DayStatus = "available" | "limited" | "full" | "closed" | "past";

const TIME_SLOTS = [
  { id: "am1", time: "09:00 – 10:00", label: "Morning" },
  { id: "am2", time: "10:00 – 11:00", label: "Morning" },
  { id: "am3", time: "11:00 – 12:00", label: "Morning" },
  { id: "pm1", time: "14:00 – 15:00", label: "Afternoon" },
  { id: "pm2", time: "15:00 – 16:00", label: "Afternoon" },
  { id: "pm3", time: "16:00 – 17:00", label: "Afternoon" },
];

// Demo: mark these calendar days as "full" or "limited"
const FULL_DAYS    = new Set([3, 7, 14, 19, 21]);
const LIMITED_DAYS = new Set([5, 10, 16, 23, 28]);
// Mark some time slots as taken on demo days
const TAKEN_SLOTS  = new Set(["am1", "am2", "pm1"]);

function getDayStatus(year: number, month: number, day: number, today: Date): DayStatus {
  const d = new Date(year, month, day);
  if (d < today) return "past";
  if (d.getDay() === 0) return "closed";
  if (FULL_DAYS.has(day)) return "full";
  if (LIMITED_DAYS.has(day)) return "limited";
  return "available";
}

export default function AvailabilityPage() {
  const t     = useTranslations("availability_page");
  const tb    = useTranslations("booking");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate,    setViewDate]    = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay    = new Date(year, month, 1).getDay();

  const selectedStatus = selectedDay ? getDayStatus(year, month, selectedDay, today) : null;

  const statusColor: Record<DayStatus, string> = {
    available: "bg-emerald-500/80",
    limited:   "bg-amber-500/80",
    full:      "bg-red-500/60",
    closed:    "bg-muted-foreground/20",
    past:      "",
  };

  const statusLabel: Record<DayStatus, string> = {
    available: t("available"),
    limited:   t("limited"),
    full:      t("full"),
    closed:    t("closed"),
    past:      "",
  };

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="border border-border bg-background p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setViewDate(new Date(year, month - 1, 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-muted border border-border rounded transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <span className="font-heading text-xl text-foreground">
                    {MONTH_NAMES[month]} {year}
                  </span>
                  <button
                    onClick={() => setViewDate(new Date(year, month + 1, 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-muted border border-border rounded transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 mb-2">
                  {DAY_NAMES.map(d => (
                    <div key={d} className="text-center font-mono text-[9px] tracking-wider uppercase text-muted-foreground/60 py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day    = i + 1;
                    const status = getDayStatus(year, month, day, today);
                    const isPast = status === "past";
                    const isSel  = selectedDay === day;
                    const isTod  = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();

                    return (
                      <button
                        key={day}
                        disabled={isPast || status === "closed"}
                        onClick={() => setSelectedDay(isSel ? null : day)}
                        className={`relative aspect-square flex flex-col items-center justify-center rounded transition-all duration-150 group
                          ${isSel ? "bg-primary text-primary-foreground" : ""}
                          ${!isPast && !isSel ? "hover:bg-muted" : ""}
                          ${isPast || status === "closed" ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                          ${isTod && !isSel ? "ring-1 ring-secondary" : ""}`}
                      >
                        <span className={`text-sm ${isSel ? "text-primary-foreground font-medium" : "text-foreground"}`}>
                          {day}
                        </span>
                        {!isPast && status !== "closed" && !isSel && (
                          <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${statusColor[status]}`} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-border">
                  {(["available", "limited", "full", "closed"] as DayStatus[]).map(s => (
                    <div key={s} className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${statusColor[s]}`} />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{statusLabel[s]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Time slots / CTA */}
            <div className="space-y-4">
              {selectedDay && selectedStatus && selectedStatus !== "closed" ? (
                <>
                  <div className="border border-secondary/30 bg-secondary/5 p-4">
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-secondary mb-1">Selected Date</p>
                    <p className="font-heading text-lg text-foreground">
                      {MONTH_NAMES[month]} {selectedDay}, {year}
                    </p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase rounded-full text-white ${statusColor[selectedStatus]}`}>
                      {statusLabel[selectedStatus]}
                    </span>
                  </div>

                  {selectedStatus !== "full" && (
                    <div className="border border-border bg-background p-4">
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Time Slots</p>
                      <div className="space-y-2">
                        {TIME_SLOTS.map(({ id, time, label }) => {
                          const taken = selectedStatus === "limited" && TAKEN_SLOTS.has(id);
                          return (
                            <div key={id} className={`flex items-center justify-between px-3 py-2.5 border ${taken ? "border-border opacity-40" : "border-border hover:border-secondary/40 cursor-pointer"} transition-colors`}>
                              <div>
                                <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground/60">{label}</p>
                                <p className="text-sm text-foreground">{time}</p>
                              </div>
                              {taken ? (
                                <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground/40">Booked</span>
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="border border-border bg-card p-6 text-center">
                  <CalendarDays className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">{t("select_date")}</p>
                </div>
              )}

              <Link
                href="/booking"
                className="block w-full text-center px-6 py-4 bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-mono tracking-[0.25em] uppercase transition-colors"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
