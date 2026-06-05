import { createAdminClient } from "@/lib/supabase/server";
import { Mail, Clock, User } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
  subject?: string;
}

const DEMO: Message[] = [
  { id: "m-001", name: "Nguyễn Văn Bình", email: "binh@example.com", subject: "Booking Inquiry", message: "Tôi muốn biết thêm về dịch vụ setup đàn Gibson Les Paul của các bạn. Cụ thể là thời gian và chi phí.", status: "unread", created_at: "2026-06-03T08:00:00Z" },
  { id: "m-002", name: "Sarah Johnson",    email: "sarah@example.com", subject: "Service Question", message: "Hi, I have a vintage 1965 Fender Stratocaster that needs a full setup and fret level. Can you handle vintage instruments?", status: "read", created_at: "2026-06-02T14:30:00Z" },
  { id: "m-003", name: "Lê Quốc Hùng",   email: "hung@example.com", subject: "General",         message: "Cho tôi hỏi giờ làm việc và địa chỉ xưởng cụ thể ở đâu? Tôi ở quận Hoàng Mai.", status: "read", created_at: "2026-06-01T10:00:00Z" },
  { id: "m-004", name: "Trần Bảo Châu",   email: "chau@example.com", subject: "Booking Inquiry", message: "Đàn bass của tôi bị buzz ở một số fret từ 5 đến 9. Các bạn có thể kiểm tra và báo giá không?", status: "unread", created_at: "2026-06-03T06:45:00Z" },
];

export default async function MessagesPage() {
  let messages: Message[] = DEMO;
  let isDemo = true;

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = await createAdminClient();
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (!error && data?.length) { messages = data as Message[]; isDemo = false; }
    }
  } catch { /* demo */ }

  const unread = messages.filter(m => m.status === "unread").length;

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      <div className="mb-8 pt-10 md:pt-0">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-1">Admin</p>
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-3xl text-foreground">Messages</h1>
          {unread > 0 && (
            <span className="px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs font-mono rounded-full">
              {unread} new
            </span>
          )}
        </div>
        {isDemo && <span className="inline-flex mt-2 px-3 py-1 border border-amber-500/30 bg-amber-500/5 text-amber-600 text-[10px] font-mono tracking-wide">◆ Demo data</span>}
      </div>

      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`border bg-background p-5 transition-colors ${msg.status === "unread" ? "border-secondary/40 bg-secondary/3" : "border-border"}`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full border border-border bg-muted flex items-center justify-center shrink-0">
                <span className="font-heading text-sm font-bold text-secondary">
                  {msg.name.charAt(0)}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="font-heading text-base text-foreground">{msg.name}</span>
                  {msg.subject && (
                    <span className="px-2 py-0.5 border border-border text-[9px] font-mono tracking-widest uppercase text-muted-foreground">
                      {msg.subject}
                    </span>
                  )}
                  {msg.status === "unread" && (
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                  )}
                </div>

                <div className="flex items-center gap-4 mb-3 text-[10px] font-mono text-muted-foreground/60">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{msg.email}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(msg.created_at).toLocaleString()}</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{msg.message}</p>
              </div>

              {/* Reply */}
              <a
                href={`mailto:${msg.email}?subject=Re: Torigo`}
                className="shrink-0 px-4 py-2 border border-secondary/30 text-secondary text-[9px] font-mono tracking-[0.2em] uppercase hover:bg-secondary/10 transition-colors"
              >
                Reply
              </a>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-16 border border-dashed border-border">
            <Mail className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
