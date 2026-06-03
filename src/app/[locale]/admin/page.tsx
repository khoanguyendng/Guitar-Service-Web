import { createAdminClient } from "@/lib/supabase/server";
import { AdminBookingsTable, type BookingRow } from "@/components/admin/AdminBookingsTable";

const DEMO_BOOKINGS: BookingRow[] = [
  { id: "bk-001-demo", name: "Nguyễn Minh Tuấn", phone: "0901 111 111", email: "tuan@example.com", service_type: "full",        guitar_type: "acoustic", preferred_date: "2026-06-10", status: "confirmed",   created_at: "2026-06-02T09:00:00Z" },
  { id: "bk-002-demo", name: "Trần Thu Hương",   phone: "0902 222 222", email: "huong@example.com", service_type: "electronics",  guitar_type: "electric", preferred_date: "2026-06-12", status: "pending",     created_at: "2026-06-02T10:30:00Z" },
  { id: "bk-003-demo", name: "Lê Đức Anh",       phone: "0903 333 333", email: "anh@example.com",   service_type: "restoration",  guitar_type: "acoustic", preferred_date: "2026-06-15", status: "completed",   created_at: "2026-06-01T14:00:00Z" },
  { id: "bk-004-demo", name: "Phạm Văn Nam",     phone: "0904 444 444", email: "nam@example.com",   service_type: "repair",       guitar_type: "electric", preferred_date: "2026-06-08", status: "cancelled",   created_at: "2026-05-30T11:00:00Z" },
  { id: "bk-005-demo", name: "Ngô Thị Lan",      phone: "0905 555 555", email: "lan@example.com",   service_type: "basic",        guitar_type: "classical",preferred_date: "2026-06-11", status: "in_progress", created_at: "2026-06-02T08:00:00Z" },
];

export default async function AdminDashboard() {
  let bookings: BookingRow[] = DEMO_BOOKINGS;
  let isDemo = true;

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const supabase = await createAdminClient();
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && data?.length) {
        bookings = data as BookingRow[];
        isDemo = false;
      }
    }
  } catch {
    // Supabase not configured — show demo data
  }

  const today          = new Date().toISOString().split("T")[0];
  const total          = bookings.length;
  const pending        = bookings.filter(b => b.status === "pending").length;
  const todayCount     = bookings.filter(b => b.preferred_date === today).length;
  const inProgress     = bookings.filter(b => b.status === "in_progress").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-2">
            — Admin —
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl text-foreground mb-2">
            Dashboard
          </h1>
          {isDemo && (
            <span className="inline-flex items-center gap-2 px-3 py-1 border border-amber-500/30 bg-amber-500/5 text-amber-600 text-xs font-mono tracking-wide">
              ◆ Demo mode — connect Supabase to see live data
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border mb-10">
          {[
            { label: "Total",       value: total,      sub: "all time"     },
            { label: "Pending",     value: pending,    sub: "needs action", accent: true },
            { label: "In Progress", value: inProgress, sub: "in workshop"  },
            { label: "Today",       value: todayCount, sub: today          },
          ].map(({ label, value, sub, accent }) => (
            <div key={label} className="bg-background p-7 border border-border">
              <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">{label}</p>
              <p className={`font-heading text-5xl font-bold mb-1 ${accent ? "text-secondary" : "text-foreground"}`}>
                {value}
              </p>
              <p className="text-xs font-mono text-muted-foreground/60">{sub}</p>
            </div>
          ))}
        </div>

        {/* Bookings Table with search + filter + interactive status */}
        <AdminBookingsTable bookings={bookings} />
      </div>
    </div>
  );
}
