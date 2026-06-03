import { createAdminClient } from "@/lib/supabase/server";
import { AdminBookingsTable, type BookingRow } from "@/components/admin/AdminBookingsTable";
import { Link } from "@/lib/navigation";
import { Download } from "lucide-react";

const DEMO: BookingRow[] = [
  { id: "bk-001", name: "Nguyễn Minh Tuấn", phone: "0901 111 111", email: "tuan@example.com", service_type: "full",        guitar_type: "acoustic", preferred_date: "2026-06-10", status: "confirmed",   created_at: "2026-06-02T09:00:00Z" },
  { id: "bk-002", name: "Trần Thu Hương",   phone: "0902 222 222", email: "huong@example.com", service_type: "electronics", guitar_type: "electric", preferred_date: "2026-06-12", status: "pending",     created_at: "2026-06-02T10:30:00Z" },
  { id: "bk-003", name: "Lê Đức Anh",       phone: "0903 333 333", email: "anh@example.com",   service_type: "restoration", guitar_type: "acoustic", preferred_date: "2026-06-15", status: "completed",   created_at: "2026-06-01T14:00:00Z" },
  { id: "bk-004", name: "Phạm Văn Nam",     phone: "0904 444 444", email: "nam@example.com",   service_type: "repair",      guitar_type: "electric", preferred_date: "2026-06-08", status: "cancelled",   created_at: "2026-05-30T11:00:00Z" },
  { id: "bk-005", name: "Ngô Thị Lan",      phone: "0905 555 555", email: "lan@example.com",   service_type: "basic",       guitar_type: "classical",preferred_date: "2026-06-11", status: "in_progress", created_at: "2026-06-02T08:00:00Z" },
  { id: "bk-006", name: "Võ Hoàng Long",    phone: "0906 666 666", email: "long@example.com",  service_type: "fret",        guitar_type: "electric", preferred_date: "2026-06-18", status: "pending",     created_at: "2026-06-03T07:00:00Z" },
  { id: "bk-007", name: "Đinh Thị Mai",     phone: "0907 777 777", email: "mai@example.com",   service_type: "consult",     guitar_type: "acoustic", preferred_date: "2026-06-20", status: "confirmed",   created_at: "2026-06-03T08:30:00Z" },
];

export default async function BookingsPage() {
  let bookings: BookingRow[] = DEMO;
  let isDemo = true;

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = await createAdminClient();
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (!error && data?.length) { bookings = data as BookingRow[]; isDemo = false; }
    }
  } catch { /* demo */ }

  const pending   = bookings.filter(b => b.status === "pending").length;
  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const today = new Date().toISOString().split("T")[0];
  const todayCount = bookings.filter(b => b.preferred_date === today).length;

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8 pt-10 md:pt-0">
        <div>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-1">Admin</p>
          <h1 className="font-heading text-3xl text-foreground">Bookings</h1>
          {isDemo && <span className="inline-flex mt-2 px-3 py-1 border border-amber-500/30 bg-amber-500/5 text-amber-600 text-[10px] font-mono tracking-wide">◆ Demo data</span>}
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-border mb-6">
        {[
          { label: "Pending",   value: pending,   accent: true  },
          { label: "Confirmed", value: confirmed, accent: false },
          { label: "Today",     value: todayCount,accent: false },
        ].map(({ label, value, accent }) => (
          <div key={label} className="bg-background px-5 py-4">
            <p className={`font-heading text-3xl font-bold mb-0.5 ${accent ? "text-secondary" : "text-foreground"}`}>{value}</p>
            <p className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/60">{label}</p>
          </div>
        ))}
      </div>

      <AdminBookingsTable bookings={bookings} />
    </div>
  );
}
