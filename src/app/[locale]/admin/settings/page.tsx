"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";

const SECTIONS = [
  {
    title: "Business Info",
    fields: [
      { key: "site_name",    label: "Business Name",    type: "text",  placeholder: "Guitar Service" },
      { key: "tagline_en",   label: "Tagline EN",        type: "text",  placeholder: "Reviving sound — Preserving passion" },
      { key: "tagline_vi",   label: "Tagline VI",        type: "text",  placeholder: "Hồi sinh âm thanh — Gìn giữ đam mê" },
      { key: "founded_year", label: "Founded Year",      type: "text",  placeholder: "2000" },
      { key: "address",      label: "Address",           type: "text",  placeholder: "123 Phố Huế, Hai Bà Trưng, Hà Nội" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { key: "phone",       label: "Phone Number",  type: "text", placeholder: "0901 234 567" },
      { key: "email",       label: "Email",         type: "email",placeholder: "hello@guitarservice.vn" },
      { key: "whatsapp",    label: "WhatsApp",       type: "text", placeholder: "+84901234567" },
      { key: "zalo_phone",  label: "Zalo Phone",    type: "text", placeholder: "0901234567" },
    ],
  },
  {
    title: "Business Hours",
    fields: [
      { key: "hours_en", label: "Hours EN", type: "text", placeholder: "Mon – Sat: 9:00 AM – 6:00 PM" },
      { key: "hours_vi", label: "Hours VI", type: "text", placeholder: "Thứ 2 – Thứ 7: 9:00 – 18:00" },
    ],
  },
  {
    title: "SEO",
    fields: [
      { key: "meta_title_en",       label: "Meta Title EN",       type: "text",  placeholder: "Guitar Service Hanoi — Expert Guitar Setup & Repair" },
      { key: "meta_title_vi",       label: "Meta Title VI",       type: "text",  placeholder: "Guitar Service Hà Nội — Setup & Sửa Chữa Guitar" },
      { key: "meta_description_en", label: "Meta Description EN", type: "textarea", placeholder: "Professional guitar setup and repair in Hanoi, Vietnam..." },
      { key: "meta_description_vi", label: "Meta Description VI", type: "textarea", placeholder: "Dịch vụ setup và sửa chữa guitar chuyên nghiệp tại Hà Nội..." },
    ],
  },
] as const;

const DEFAULTS: Record<string, string> = {
  site_name:          "Guitar Service",
  tagline_en:         "Reviving sound — Preserving passion",
  tagline_vi:         "Hồi sinh âm thanh — Gìn giữ đam mê",
  founded_year:       "2000",
  address:            "123 Phố Huế, Hai Bà Trưng, Hà Nội",
  phone:              "0901 234 567",
  email:              "hello@guitarservice.vn",
  whatsapp:           "+84901234567",
  zalo_phone:         "0901234567",
  hours_en:           "Mon – Sat: 9:00 AM – 6:00 PM",
  hours_vi:           "Thứ 2 – Thứ 7: 9:00 – 18:00",
  meta_title_en:      "",
  meta_title_vi:      "",
  meta_description_en:"",
  meta_description_vi:"",
};

export default function SettingsAdminPage() {
  const [values,  setValues]  = useState<Record<string, string>>(DEFAULTS);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState("");

  const set = (k: string, v: string) => setValues(p => ({ ...p, [k]: v }));

  const save = async () => {
    setSaving(true); setError("");
    try {
      const pairs = Object.entries(values).map(([key, value_en]) => ({ key, value_en }));
      const res = await fetch("/api/admin/settings", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: pairs }),
      });
      if (!res.ok) throw new Error();
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save. Check Supabase connection.");
    } finally { setSaving(false); }
  };

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-8 pt-10 md:pt-0">
        <div>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-1">Admin</p>
          <h1 className="font-heading text-3xl text-foreground">Site Settings</h1>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-emerald-600 text-xs font-mono">✓ Saved</span>}
          {error && <span className="text-red-500 text-xs max-w-[180px]">{error}</span>}
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-[10px] font-mono tracking-[0.2em] uppercase transition-colors"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save All
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {SECTIONS.map(({ title, fields }) => (
          <div key={title} className="border border-border bg-background">
            <div className="px-5 py-3 border-b border-border bg-muted/20">
              <h2 className="font-heading text-base text-foreground">{title}</h2>
            </div>
            <div className="p-5 space-y-4">
              {fields.map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-1.5">{label}</label>
                  {type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={values[key] ?? ""}
                      onChange={e => set(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-secondary/60 resize-none transition-colors"
                    />
                  ) : (
                    <input
                      type={type}
                      value={values[key] ?? ""}
                      onChange={e => set(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-secondary/60 transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
