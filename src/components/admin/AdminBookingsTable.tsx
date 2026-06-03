"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BookingStatusBadge } from "./BookingStatusBadge";

type Status = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

export interface BookingRow {
  id:             string;
  name:           string;
  phone?:         string;
  email?:         string;
  service_type:   string;
  guitar_type?:   string;
  preferred_date: string;
  status:         Status;
  created_at:     string;
  description?:   string;
}

const SERVICE_LABELS: Record<string, string> = {
  basic:        "Basic Setup",
  full:         "Full Setup",
  setup:        "Setup",
  repair:       "Repair",
  fret:         "Fret Level",
  restoration:  "Restoration",
  electronics:  "Electronics",
  nut_saddle:   "Nut/Saddle",
  consult:      "Consultation",
  other:        "Other",
};

const STATUS_FILTERS = ["all", "pending", "confirmed", "in_progress", "completed", "cancelled"] as const;

interface Props {
  bookings: BookingRow[];
}

export function AdminBookingsTable({ bookings }: Props) {
  const [search, setSearch]       = useState("");
  const [statusFilter, setFilter] = useState<typeof STATUS_FILTERS[number]>("all");

  const filtered = bookings.filter((b) => {
    const matchSearch = !search || [b.name, b.email ?? "", b.phone ?? "", b.service_type]
      .some(v => v.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="border border-border bg-card">
      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <h2 className="font-heading text-lg text-foreground">Recent Bookings</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email..."
              className="w-full sm:w-52 pl-9 pr-4 py-2 border border-border bg-background text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary/60 transition-colors"
            />
          </div>
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={e => setFilter(e.target.value as typeof statusFilter)}
            className="border border-border bg-background px-3 py-2 text-xs font-mono tracking-wider uppercase text-muted-foreground focus:outline-none focus:border-secondary/60 cursor-pointer"
          >
            {STATUS_FILTERS.map(s => (
              <option key={s} value={s}>
                {s === "all" ? "All Statuses" : s.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["ID", "Customer", "Service", "Date", "Status"].map(col => (
                <th key={col} className="px-6 py-3 text-left text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-xs font-mono text-muted-foreground/50 tracking-widest">
                  NO BOOKINGS FOUND
                </td>
              </tr>
            ) : (
              filtered.map((b, i) => (
                <tr
                  key={b.id}
                  className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors ${i % 2 !== 0 ? "bg-muted/10" : ""}`}
                >
                  <td className="px-6 py-4 text-xs font-mono text-muted-foreground/70">
                    {b.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground font-medium">{b.name}</p>
                    {b.phone && <p className="text-xs text-muted-foreground mt-0.5">{b.phone}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{SERVICE_LABELS[b.service_type] ?? b.service_type}</p>
                    {b.guitar_type && <p className="text-xs text-muted-foreground/60 mt-0.5 capitalize">{b.guitar_type}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                    {b.preferred_date}
                  </td>
                  <td className="px-6 py-4">
                    <BookingStatusBadge bookingId={b.id} initialStatus={b.status as any} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-border">
        <p className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/50">
          {filtered.length} of {bookings.length} bookings
        </p>
      </div>
    </div>
  );
}
