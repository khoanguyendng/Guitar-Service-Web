"use client";

import { useState } from "react";
import { Star, Check, X, Trash2 } from "lucide-react";

interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  content_vi: string;
  content_en: string | null;
  is_approved: boolean;
  avatar_url?: string | null;
}

const DEMO: Testimonial[] = [
  { id: "t-001", customer_name: "Nguyễn Minh Tuấn", rating: 5, content_vi: "Tuyệt vời! Cây đàn Taylor của tôi giờ ngân hay hơn khi mới mua.", content_en: "Outstanding! My Taylor sounds better than when it was new.", is_approved: true },
  { id: "t-002", customer_name: "Trần Thu Hương",   rating: 5, content_vi: "Đã sửa pickup và điều chỉnh action cho chiếc Les Paul. Kết quả vượt ngoài mong đợi.", content_en: "Had the pickup replaced. The result exceeded all expectations.", is_approved: true },
  { id: "t-003", customer_name: "Lê Đức Anh",       rating: 5, content_vi: "Phục hồi hoàn toàn chiếc Martin vintage 50 năm tuổi. Họ đã làm điều không tưởng.", content_en: "Completely restored my 50-year-old vintage Martin.", is_approved: true },
  { id: "t-004", customer_name: "Phạm Quốc Dũng",   rating: 4, content_vi: "Service tốt, đúng hẹn. Cây đàn bass đã hết buzz sau khi mài fret.", content_en: "Good service, on time. Bass guitar no longer buzzes after fret levelling.", is_approved: false },
  { id: "t-005", customer_name: "Mai Thanh Liêm",   rating: 5, content_vi: "Rất hài lòng với dịch vụ setup cho cây Stratocaster của tôi.", content_en: null, is_approved: false },
];

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>(DEMO);
  const [tab, setTab]     = useState<"all" | "pending" | "approved">("all");

  const visible = tab === "all" ? items : tab === "pending" ? items.filter(i => !i.is_approved) : items.filter(i => i.is_approved);

  const approve = (id: string) => setItems(p => p.map(t => t.id === id ? { ...t, is_approved: true } : t));
  const reject  = (id: string) => setItems(p => p.map(t => t.id === id ? { ...t, is_approved: false } : t));
  const remove  = (id: string) => { if (confirm("Delete?")) setItems(p => p.filter(t => t.id !== id)); };

  const pending  = items.filter(i => !i.is_approved).length;
  const approved = items.filter(i => i.is_approved).length;

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8 pt-10 md:pt-0">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-1">Admin</p>
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-3xl text-foreground">Testimonials</h1>
          {pending > 0 && <span className="px-2.5 py-0.5 bg-amber-500/15 text-amber-700 border border-amber-500/30 text-[9px] font-mono rounded-full">{pending} pending</span>}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {([["all", `All (${items.length})`], ["pending", `Pending (${pending})`], ["approved", `Approved (${approved})`]] as const).map(([val, label]) => (
          <button key={val} onClick={() => setTab(val)} className={`px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors border-b-2 -mb-px ${tab === val ? "border-secondary text-secondary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visible.map((t) => (
          <div key={t.id} className={`border p-5 ${t.is_approved ? "border-border bg-background" : "border-amber-500/30 bg-amber-500/3"}`}>
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full border border-border bg-muted flex items-center justify-center shrink-0">
                <span className="font-heading text-sm font-bold text-secondary">{t.customer_name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-heading text-base text-foreground">{t.customer_name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? "fill-secondary text-secondary" : "text-border"}`} />
                    ))}
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase ${t.is_approved ? "text-emerald-600" : "text-amber-600"}`}>
                    {t.is_approved ? "● Approved" : "○ Pending"}
                  </span>
                </div>
                <p className="text-sm text-foreground mb-1">{t.content_vi}</p>
                {t.content_en && <p className="text-xs text-muted-foreground italic">{t.content_en}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!t.is_approved && (
                  <button onClick={() => approve(t.id)} className="w-8 h-8 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/20 transition-colors rounded">
                    <Check className="w-4 h-4" />
                  </button>
                )}
                {t.is_approved && (
                  <button onClick={() => reject(t.id)} className="w-8 h-8 flex items-center justify-center bg-amber-500/10 border border-amber-500/30 text-amber-600 hover:bg-amber-500/20 transition-colors rounded">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => remove(t.id)} className="w-8 h-8 flex items-center justify-center hover:bg-red-500/10 border border-transparent hover:border-red-500/30 text-muted-foreground/50 hover:text-red-500 transition-colors rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
