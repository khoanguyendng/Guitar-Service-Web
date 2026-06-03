import { createAdminClient } from "@/lib/supabase/server";
import { AdminBookingsTable, type BookingRow } from "@/components/admin/AdminBookingsTable";
import { Link } from "@/lib/navigation";
import { Calendar, MessageSquare, FileText, Image, Star, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

const DEMO_BOOKINGS: BookingRow[] = [
  { id: "bk-001-demo", name: "Nguyễn Minh Tuấn", phone: "0901 111 111", email: "tuan@example.com", service_type: "full",       guitar_type: "acoustic", preferred_date: "2026-06-10", status: "confirmed",   created_at: "2026-06-02T09:00:00Z" },
  { id: "bk-002-demo", name: "Trần Thu Hương",   phone: "0902 222 222", email: "huong@example.com",service_type: "electronics", guitar_type: "electric", preferred_date: "2026-06-12", status: "pending",     created_at: "2026-06-02T10:30:00Z" },
  { id: "bk-003-demo", name: "Lê Đức Anh",       phone: "0903 333 333", email: "anh@example.com",  service_type: "restoration",guitar_type: "acoustic", preferred_date: "2026-06-15", status: "completed",   created_at: "2026-06-01T14:00:00Z" },
  { id: "bk-004-demo", name: "Phạm Văn Nam",     phone: "0904 444 444", email: "nam@example.com",  service_type: "repair",     guitar_type: "electric", preferred_date: "2026-06-08", status: "cancelled",   created_at: "2026-05-30T11:00:00Z" },
  { id: "bk-005-demo", name: "Ngô Thị Lan",      phone: "0905 555 555", email: "lan@example.com",  service_type: "basic",      guitar_type: "classical",preferred_date: "2026-06-11", status: "in_progress", created_at: "2026-06-02T08:00:00Z" },
];

async function getStats() {
  let bookings: BookingRow[] = DEMO_BOOKINGS;
  let isDemo = true;
  let messageCount = 0;
  let galleryCount = 0;

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = await createAdminClient();
      const [bRes, mRes, gRes] = await Promise.allSettled([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(50),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
        supabase.from("gallery").select("id", { count: "exact", head: true }),
      ]);
      if (bRes.status === "fulfilled" && !bRes.value.error && bRes.value.data?.length) {
        bookings = bRes.value.data as BookingRow[];
        isDemo = false;
      }
      if (mRes.status === "fulfilled") messageCount = mRes.value.count ?? 0;
      if (gRes.status === "fulfilled") galleryCount = gRes.value.count ?? 0;
    }
  } catch { /* demo mode */ }

  const today   = new Date().toISOString().split("T")[0];
  const pending = bookings.filter(b => b.status === "pending").length;
  const inProg  = bookings.filter(b => b.status === "in_progress").length;

  return { bookings, isDemo, pending, inProg, messageCount, galleryCount, today };
}

export default async function AdminDashboard() {
  const { bookings, isDemo, pending, inProg, messageCount, galleryCount, today } = await getStats();

  const QUICK = [
    { label: "New Messages",    value: messageCount,       icon: MessageSquare, href: "/admin/messages"    },
    { label: "Blog Posts",      value: blogPosts.length,   icon: FileText,      href: "/admin/blog"        },
    { label: "Gallery Items",   value: galleryCount || 12, icon: Image,         href: "/admin/gallery"     },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 pt-10 md:pt-0">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-1">Admin</p>
        <h1 className="font-heading text-3xl text-foreground">Dashboard</h1>
        {isDemo && (
          <span className="inline-flex mt-2 px-3 py-1 border border-amber-500/30 bg-amber-500/5 text-amber-600 text-[10px] font-mono tracking-wide">
            ◆ Demo mode — connect Supabase to see live data
          </span>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-8">
        {[
          { label: "Total Bookings",  value: bookings.length, sub: "all time",     accent: false },
          { label: "Pending",         value: pending,         sub: "awaiting action", accent: true  },
          { label: "In Progress",     value: inProg,          sub: "in workshop",  accent: false },
          { label: "Today",           value: bookings.filter(b => b.preferred_date === today).length, sub: today, accent: false },
        ].map(({ label, value, sub, accent }) => (
          <div key={label} className="bg-background p-6 border border-border">
            <p className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground mb-2">{label}</p>
            <p className={`font-heading text-4xl font-bold mb-1 ${accent ? "text-secondary" : "text-foreground"}`}>{value}</p>
            <p className="text-[10px] font-mono text-muted-foreground/60">{sub}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {QUICK.map(({ label, value, icon: Icon, href }) => (
          <Link key={href} href={href} className="group flex items-center gap-4 p-5 border border-border hover:border-secondary/40 bg-background hover:bg-card transition-all duration-200">
            <div className="w-10 h-10 rounded-full border border-border group-hover:border-secondary/40 flex items-center justify-center shrink-0 transition-colors">
              <Icon className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
            </div>
            <div className="flex-1">
              <p className="font-heading text-lg text-foreground">{value}</p>
              <p className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/60">{label}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>

      {/* Bookings table */}
      <AdminBookingsTable bookings={bookings} />
    </div>
  );
}
