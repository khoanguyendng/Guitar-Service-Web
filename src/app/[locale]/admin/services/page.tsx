"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";

interface Service {
  id: string;
  name_en: string; name_vi: string;
  description_en: string; description_vi: string;
  price_from: number; price_to: number | null;
  duration_days: number;
  is_active: boolean;
  sort_order: number;
}

const DEMO_SERVICES: Service[] = [
  { id: "basic",        name_en: "Basic Setup",         name_vi: "Setup cơ bản",        description_en: "Action, intonation, string change, nut slot cleaning",          description_vi: "Action, intonation, thay dây, vệ sinh nut",                price_from: 350000, price_to: 500000,   duration_days: 2,  is_active: true, sort_order: 0 },
  { id: "full",         name_en: "Full Setup",          name_vi: "Setup tổng thể",       description_en: "Complete playability optimisation — all aspects",               description_vi: "Tối ưu toàn diện khả năng chơi",                           price_from: 700000, price_to: 1200000,  duration_days: 3,  is_active: true, sort_order: 1 },
  { id: "fret",         name_en: "Fret Levelling",      name_vi: "Mài fret",             description_en: "Fret crown, level, and polish for even playability",            description_vi: "Crown, mài phẳng và đánh bóng fret",                      price_from: 800000, price_to: 1500000,  duration_days: 5,  is_active: true, sort_order: 2 },
  { id: "nut",          name_en: "Nut Replacement",     name_vi: "Thay nut",             description_en: "Bone or TUSQ nut fitting and slot cutting",                    description_vi: "Lắp nut xương hoặc TUSQ",                                 price_from: 400000, price_to: 800000,   duration_days: 2,  is_active: true, sort_order: 3 },
  { id: "electronics",  name_en: "Electronics Repair",  name_vi: "Sửa điện tử",          description_en: "Pickup swap, wiring, jack and pot repair",                     description_vi: "Thay pickup, wiring, jack và pot",                        price_from: 300000, price_to: null,     duration_days: 2,  is_active: true, sort_order: 4 },
  { id: "restoration",  name_en: "Vintage Restoration", name_vi: "Phục hồi vintage",     description_en: "Complete restoration of vintage instruments",                   description_vi: "Phục hồi toàn bộ đàn cổ",                                price_from: 2000000,price_to: null,     duration_days: 21, is_active: true, sort_order: 5 },
  { id: "consult",      name_en: "Consultation",        name_vi: "Tư vấn",               description_en: "30-minute assessment and service recommendation",               description_vi: "Kiểm tra và tư vấn 30 phút",                             price_from: 150000, price_to: null,     duration_days: 0,  is_active: true, sort_order: 6 },
];

function formatVND(n: number) {
  return n.toLocaleString("vi-VN");
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>(DEMO_SERVICES);
  const [saving, setSaving]     = useState<string | null>(null);
  const [saved,  setSaved]      = useState<string | null>(null);

  const update = (id: string, key: keyof Service, val: any) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s));
  };

  const save = async (id: string) => {
    setSaving(id);
    try {
      const service = services.find(s => s.id === id);
      await fetch(`/api/admin/services/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      setSaved(id);
      setTimeout(() => setSaved(null), 2000);
    } catch { /* ignore */ }
    finally { setSaving(null); }
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      <div className="mb-8 pt-10 md:pt-0">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-1">Admin</p>
        <h1 className="font-heading text-3xl text-foreground">Services & Pricing</h1>
        <p className="text-xs text-muted-foreground/60 mt-1">Edit service details, pricing, and availability.</p>
      </div>

      <div className="space-y-4">
        {services.map((s) => (
          <div key={s.id} className="border border-border bg-background">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/20">
              <div className="flex items-center gap-3">
                <span className="font-heading text-base text-foreground">{s.name_en}</span>
                <span className="text-muted-foreground/50 text-sm">·</span>
                <span className="text-sm text-muted-foreground">{s.name_vi}</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => update(s.id, "is_active", !s.is_active)} className={`relative w-9 h-5 rounded-full transition-colors ${s.is_active ? "bg-primary" : "bg-muted-foreground/30"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${s.is_active ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
                <button onClick={() => save(s.id)} disabled={!!saving} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-[9px] font-mono tracking-[0.2em] uppercase transition-colors">
                  {saving === s.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  {saved === s.id ? "Saved!" : "Save"}
                </button>
              </div>
            </div>

            {/* Fields */}
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-1.5">Description EN</label>
                <textarea rows={2} value={s.description_en} onChange={e => update(s.id, "description_en", e.target.value)} className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-secondary/60 resize-none" />
              </div>
              <div>
                <label className="block font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-1.5">Description VI</label>
                <textarea rows={2} value={s.description_vi} onChange={e => update(s.id, "description_vi", e.target.value)} className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-secondary/60 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-1.5">Price From (VND)</label>
                  <input type="number" value={s.price_from} onChange={e => update(s.id, "price_from", +e.target.value)} className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-secondary/60" />
                </div>
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-1.5">Price To (blank = quote)</label>
                  <input type="number" value={s.price_to ?? ""} onChange={e => update(s.id, "price_to", e.target.value ? +e.target.value : null)} className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-secondary/60" />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-1.5">Duration (days)</label>
                <input type="number" min={0} value={s.duration_days} onChange={e => update(s.id, "duration_days", +e.target.value)} className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-secondary/60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
