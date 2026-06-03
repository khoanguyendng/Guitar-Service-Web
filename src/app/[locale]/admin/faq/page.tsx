"use client";

import { useState } from "react";
import { Plus, Trash2, Save, ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  id: string;
  question_en: string; question_vi: string;
  answer_en: string;   answer_vi: string;
  category: string;
  sort_order: number;
  is_active: boolean;
}

type Cat = "setup" | "booking" | "pricing" | "warranty";
const CATS: { key: Cat; label: string }[] = [
  { key: "setup",    label: "Setup & Service"      },
  { key: "booking",  label: "Booking & Scheduling" },
  { key: "pricing",  label: "Pricing & Payment"    },
  { key: "warranty", label: "Warranty & After-Service" },
];

const DEMO: FAQ[] = [
  { id: "f-001", category: "setup",    sort_order: 0, is_active: true, question_en: "How long does a full setup take?",    question_vi: "Setup tổng thể mất bao lâu?",         answer_en: "A basic setup takes 1–2 days. A full setup takes 2–3 days.",          answer_vi: "Setup cơ bản mất 1–2 ngày. Setup tổng thể mất 2–3 ngày." },
  { id: "f-002", category: "setup",    sort_order: 1, is_active: true, question_en: "What is included in a basic setup?",  question_vi: "Setup cơ bản bao gồm những gì?",      answer_en: "String replacement, action, intonation, nut cleaning.",               answer_vi: "Thay dây, chỉnh action, intonation, vệ sinh nut." },
  { id: "f-003", category: "booking",  sort_order: 0, is_active: true, question_en: "How do I book an appointment?",       question_vi: "Làm sao để đặt lịch?",                answer_en: "Book online, call, or message on Zalo/WhatsApp.",                     answer_vi: "Đặt online, gọi điện, hoặc nhắn Zalo/WhatsApp." },
  { id: "f-004", category: "pricing",  sort_order: 0, is_active: true, question_en: "How much does a full setup cost?",    question_vi: "Setup tổng thể giá bao nhiêu?",       answer_en: "700,000–1,200,000 VND depending on guitar type and condition.",        answer_vi: "700.000–1.200.000 VND tùy loại và tình trạng đàn." },
  { id: "f-005", category: "warranty", sort_order: 0, is_active: true, question_en: "What does the 30-day warranty cover?",question_vi: "Bảo hành 30 ngày bao gồm những gì?", answer_en: "Any change in playability directly caused by our work.",               answer_vi: "Mọi thay đổi về khả năng chơi xuất phát từ công việc của chúng tôi." },
];

const EMPTY = (cat: Cat): Omit<FAQ, "id"> => ({ category: cat, sort_order: 99, is_active: true, question_en: "", question_vi: "", answer_en: "", answer_vi: "" });

export default function FAQAdminPage() {
  const [items,     setItems]     = useState<FAQ[]>(DEMO);
  const [expanded,  setExpanded]  = useState<string | null>(null);
  const [addingCat, setAddingCat] = useState<Cat | null>(null);
  const [newItem,   setNewItem]   = useState<Omit<FAQ, "id"> | null>(null);

  const update = (id: string, key: keyof FAQ, val: any) =>
    setItems(p => p.map(f => f.id === id ? { ...f, [key]: val } : f));

  const remove = (id: string) => { if (confirm("Delete?")) setItems(p => p.filter(f => f.id !== id)); };

  const startAdd = (cat: Cat) => { setAddingCat(cat); setNewItem(EMPTY(cat)); };

  const saveNew = () => {
    if (!newItem) return;
    const id = `faq-${Date.now()}`;
    setItems(p => [...p, { ...newItem, id }]);
    setNewItem(null); setAddingCat(null);
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8 pt-10 md:pt-0">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-1">Admin</p>
        <h1 className="font-heading text-3xl text-foreground">FAQ Management</h1>
        <p className="text-xs text-muted-foreground/60 mt-1">{items.length} questions across {CATS.length} categories</p>
      </div>

      <div className="space-y-8">
        {CATS.map(({ key, label }) => {
          const catItems = items.filter(f => f.category === key);
          return (
            <div key={key}>
              <div className="flex items-center gap-4 mb-3">
                <h2 className="font-heading text-lg text-foreground">{label}</h2>
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/50">{catItems.length} items</span>
              </div>

              <div className="space-y-2">
                {catItems.map(faq => (
                  <div key={faq.id} className="border border-border bg-background">
                    <button
                      onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-muted/30 transition-colors"
                    >
                      <div>
                        <p className="text-sm text-foreground font-medium">{faq.question_en || "— untitled —"}</p>
                        <p className="text-xs text-muted-foreground/60">{faq.question_vi}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={e => { e.stopPropagation(); update(faq.id, "is_active", !faq.is_active); }}
                          className={`w-2 h-2 rounded-full transition-colors ${faq.is_active ? "bg-emerald-500" : "bg-muted-foreground/30"}`}
                        />
                        {expanded === faq.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </button>

                    {expanded === faq.id && (
                      <div className="border-t border-border p-5 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(["question_en", "question_vi", "answer_en", "answer_vi"] as const).map(k => (
                            <div key={k}>
                              <label className="block font-mono text-[8px] tracking-[0.25em] uppercase text-muted-foreground mb-1">{k.replace("_", " ")}</label>
                              <textarea rows={k.startsWith("answer") ? 3 : 2} value={faq[k]} onChange={e => update(faq.id, k, e.target.value)}
                                className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-secondary/60 resize-none"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <button onClick={() => remove(faq.id)} className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-widest uppercase text-red-500/60 hover:text-red-500 transition-colors">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-[9px] font-mono tracking-[0.2em] uppercase transition-colors">
                            <Save className="w-3 h-3" /> Save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add new */}
                {addingCat === key && newItem ? (
                  <div className="border border-secondary/40 bg-secondary/5 p-5 space-y-3">
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-secondary">New Question</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(["question_en", "question_vi", "answer_en", "answer_vi"] as const).map(k => (
                        <div key={k}>
                          <label className="block font-mono text-[8px] tracking-[0.25em] uppercase text-muted-foreground mb-1">{k.replace("_", " ")}</label>
                          <textarea rows={k.startsWith("answer") ? 3 : 2} value={(newItem as any)[k]} onChange={e => setNewItem(p => p ? { ...p, [k]: e.target.value } : p)}
                            className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-secondary/60 resize-none"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={saveNew} className="px-4 py-1.5 bg-primary text-primary-foreground text-[9px] font-mono tracking-[0.2em] uppercase">Add</button>
                      <button onClick={() => { setAddingCat(null); setNewItem(null); }} className="px-4 py-1.5 border border-border text-muted-foreground text-[9px] font-mono tracking-[0.2em] uppercase">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => startAdd(key)} className="w-full py-3 border border-dashed border-border hover:border-secondary/50 text-muted-foreground/50 hover:text-secondary transition-colors flex items-center justify-center gap-2 text-[9px] font-mono tracking-widest uppercase">
                    <Plus className="w-3.5 h-3.5" /> Add Question
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
