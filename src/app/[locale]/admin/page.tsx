import { createAdminClient } from "@/lib/supabase/server";

interface Booking {
  id: string;
  name: string;
  service_type: string;
  preferred_date: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
}

const DEMO_BOOKINGS: Booking[] = [
  {
    id: "bk-001",
    name: "Nguyễn Minh Tuấn",
    service_type: "setup",
    preferred_date: "2025-06-10",
    status: "confirmed",
    created_at: "2025-06-02T09:00:00Z",
  },
  {
    id: "bk-002",
    name: "Trần Thu Hương",
    service_type: "electronics",
    preferred_date: "2025-06-12",
    status: "pending",
    created_at: "2025-06-02T10:30:00Z",
  },
  {
    id: "bk-003",
    name: "Lê Đức Anh",
    service_type: "restoration",
    preferred_date: "2025-06-15",
    status: "completed",
    created_at: "2025-06-01T14:00:00Z",
  },
  {
    id: "bk-004",
    name: "Phạm Văn Nam",
    service_type: "repair",
    preferred_date: "2025-06-08",
    status: "cancelled",
    created_at: "2025-05-30T11:00:00Z",
  },
  {
    id: "bk-005",
    name: "Ngô Thị Lan",
    service_type: "setup",
    preferred_date: "2025-06-11",
    status: "pending",
    created_at: "2025-06-02T08:00:00Z",
  },
];

const STATUS_STYLES: Record<Booking["status"], string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-300 dark:border-amber-700",
  confirmed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-300 dark:border-green-700",
  completed: "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400 border border-gray-300 dark:border-gray-600",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-300 dark:border-red-700",
};

const STATUS_LABELS: Record<Booking["status"], string> = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

const SERVICE_LABELS: Record<string, string> = {
  setup: "Setup",
  repair: "Sửa chữa",
  fret: "Fret",
  restoration: "Phục hồi",
  electronics: "Điện tử",
  nut_saddle: "Nut/Saddle",
  other: "Khác",
};

export default async function AdminDashboard() {
  let bookings: Booking[] = DEMO_BOOKINGS;
  let isDemo = true;

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-supabase-url" &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const supabase = await createAdminClient();
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error && data) {
        bookings = data as Booking[];
        isDemo = false;
      }
    }
  } catch {
    // Supabase not configured — use demo data
  }

  const today = new Date().toISOString().split("T")[0];
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const todayBookings = bookings.filter((b) => b.preferred_date === today).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-2">
            — Quản trị —
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl text-foreground">
            Admin Dashboard
          </h1>
          {isDemo && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 border border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs font-mono tracking-wide">
              ◆ Demo mode — Supabase chưa được cấu hình
            </div>
          )}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border mb-10">
          <div className="bg-background p-8 border border-border">
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">
              Tổng đặt lịch
            </p>
            <p className="font-heading text-5xl font-bold text-foreground mb-1">
              {totalBookings}
            </p>
            <p className="text-xs font-mono text-muted-foreground">Tất cả thời gian</p>
          </div>
          <div className="bg-background p-8 border border-border">
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">
              Chờ xử lý
            </p>
            <p className="font-heading text-5xl font-bold text-secondary mb-1">
              {pendingBookings}
            </p>
            <p className="text-xs font-mono text-muted-foreground">Cần xác nhận</p>
          </div>
          <div className="bg-background p-8 border border-border">
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">
              Hôm nay
            </p>
            <p className="font-heading text-5xl font-bold text-foreground mb-1">
              {todayBookings}
            </p>
            <p className="text-xs font-mono text-muted-foreground">{today}</p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="border border-border bg-card">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-heading text-lg text-foreground">Đặt lịch gần đây</h2>
            <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
              {bookings.length} mục
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground">
                    Dịch vụ
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground">
                    Ngày hẹn
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, i) => (
                  <tr
                    key={booking.id}
                    className={`border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors ${
                      i % 2 === 0 ? "" : "bg-muted/10"
                    }`}
                  >
                    <td className="px-6 py-4 text-xs font-mono text-muted-foreground">
                      {booking.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {booking.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {SERVICE_LABELS[booking.service_type] ?? booking.service_type}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                      {booking.preferred_date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[10px] font-mono tracking-wide rounded-sm ${
                          STATUS_STYLES[booking.status]
                        }`}
                      >
                        {STATUS_LABELS[booking.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
