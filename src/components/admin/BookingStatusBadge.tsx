"use client";

import { useState } from "react";

const STATUS_OPTIONS = ["pending", "confirmed", "in_progress", "completed", "cancelled"] as const;
type Status = typeof STATUS_OPTIONS[number];

const STATUS_STYLES: Record<Status, string> = {
  pending:     "bg-amber-500/15 text-amber-700 border-amber-500/30",
  confirmed:   "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  in_progress: "bg-blue-500/15 text-blue-700 border-blue-500/30",
  completed:   "bg-muted text-muted-foreground border-border",
  cancelled:   "bg-red-500/15 text-red-700 border-red-500/30",
};

const STATUS_LABELS: Record<Status, string> = {
  pending:     "Pending",
  confirmed:   "Confirmed",
  in_progress: "In Progress",
  completed:   "Completed",
  cancelled:   "Cancelled",
};

interface Props {
  bookingId:     string;
  initialStatus: Status;
}

export function BookingStatusBadge({ bookingId, initialStatus }: Props) {
  const [status,  setStatus]  = useState<Status>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [open,    setOpen]    = useState(false);

  const update = async (next: Status) => {
    if (next === status) { setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ status: next }),
      });
      if (res.ok) setStatus(next);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className={`px-2.5 py-1 border text-[9px] font-mono tracking-[0.2em] uppercase transition-colors ${STATUS_STYLES[status]} ${loading ? "opacity-60" : "hover:opacity-80"}`}
      >
        {loading ? "…" : STATUS_LABELS[status]}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 z-20 bg-background border border-border shadow-lg min-w-[140px]">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => update(s)}
                className={`w-full text-left px-3 py-2.5 text-[10px] font-mono tracking-[0.15em] uppercase transition-colors hover:bg-muted ${s === status ? "text-secondary" : "text-muted-foreground"}`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
