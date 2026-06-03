"use client";

import { useState } from "react";
import { Star, Trash2, Plus, Upload } from "lucide-react";

interface GalleryItem {
  id: string | number;
  image_url?: string;
  caption_en: string | null;
  caption_vi?: string | null;
  category: string;
  is_featured: boolean;
  sort_order: number;
  gradient?: string;
}

const DEMO_ITEMS: GalleryItem[] = [
  { id: 1, caption_en: "Taylor 814ce — Full setup & intonation", caption_vi: "Taylor 814ce — Setup tổng thể", category: "acoustic", is_featured: true,  sort_order: 0, gradient: "from-amber-900 via-amber-800 to-stone-900" },
  { id: 2, caption_en: "Fender Stratocaster — Pickup swap",     caption_vi: "Fender Strat — Thay pickup",    category: "electric", is_featured: false, sort_order: 1, gradient: "from-stone-900 via-amber-950 to-zinc-900" },
  { id: 3, caption_en: "Martin D-28 (1972) — Restoration",      caption_vi: "Martin D-28 — Phục hồi",       category: "repair",   is_featured: true,  sort_order: 2, gradient: "from-amber-950 via-stone-800 to-amber-900" },
  { id: 4, caption_en: "Yamaha C40 — Nylon setup",              caption_vi: "Yamaha C40 — Setup nylon",     category: "classic",  is_featured: false, sort_order: 3, gradient: "from-stone-800 via-amber-900 to-stone-900" },
  { id: 5, caption_en: "Gibson J-45 — Body crack repair",       caption_vi: "Gibson J-45 — Vá nứt",        category: "repair",   is_featured: false, sort_order: 4, gradient: "from-amber-800 via-stone-900 to-amber-950" },
  { id: 6, caption_en: "Gibson Les Paul — Wiring & pots",       caption_vi: "Les Paul — Wiring & pot",      category: "electric", is_featured: false, sort_order: 5, gradient: "from-zinc-900 via-stone-800 to-amber-950" },
];

const CATEGORIES = ["all", "acoustic", "electric", "repair", "classic"] as const;

export default function GalleryAdminPage() {
  const [items, setItems]   = useState<GalleryItem[]>(DEMO_ITEMS);
  const [filter, setFilter] = useState<typeof CATEGORIES[number]>("all");

  const filtered = filter === "all" ? items : items.filter(i => i.category === filter);

  const toggleFeatured = (id: string | number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, is_featured: !i.is_featured } : i));
  };

  const deleteItem = (id: string | number) => {
    if (!confirm("Delete this gallery item?")) return;
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-8 pt-10 md:pt-0">
        <div>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-1">Admin</p>
          <h1 className="font-heading text-3xl text-foreground">Gallery</h1>
          <p className="text-xs text-muted-foreground/60 mt-1 font-mono">
            {items.filter(i => i.is_featured).length} featured · {items.length} total
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-mono tracking-[0.2em] uppercase transition-colors">
          <Upload className="w-3.5 h-3.5" /> Upload Photo
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-4 py-1.5 border text-[9px] font-mono tracking-[0.2em] uppercase transition-colors ${filter === c ? "border-secondary bg-secondary/10 text-secondary" : "border-border text-muted-foreground hover:border-secondary/40"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="group relative border border-border overflow-hidden bg-background">
            {/* Image / Gradient preview */}
            <div className={`aspect-[4/3] relative ${item.image_url ? "" : `bg-gradient-to-br ${item.gradient ?? "from-stone-800 to-stone-900"}`}`}>
              {item.image_url && <img src={item.image_url} alt={item.caption_en ?? ""} className="w-full h-full object-cover" />}
              {/* Actions overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button onClick={() => toggleFeatured(item.id)} title="Toggle featured" className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${item.is_featured ? "bg-amber-500 text-white" : "bg-white/20 text-white hover:bg-amber-500"}`}>
                  <Star className="w-4 h-4" fill={item.is_featured ? "currentColor" : "none"} />
                </button>
                <button onClick={() => deleteItem(item.id)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-red-500 text-white flex items-center justify-center transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {/* Featured badge */}
              {item.is_featured && (
                <div className="absolute top-2 left-2">
                  <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[8px] font-mono tracking-wider uppercase">Featured</span>
                </div>
              )}
              {/* Category badge */}
              <div className="absolute top-2 right-2">
                <span className="px-1.5 py-0.5 bg-black/50 text-amber-400/80 text-[8px] font-mono tracking-wider uppercase">{item.category}</span>
              </div>
            </div>

            {/* Caption editor */}
            <div className="p-3">
              <input
                type="text"
                defaultValue={item.caption_en ?? ""}
                placeholder="Caption (EN)"
                className="w-full text-xs text-foreground bg-transparent border-b border-border focus:outline-none focus:border-secondary py-1 mb-1 placeholder:text-muted-foreground/40"
              />
              <input
                type="text"
                defaultValue={item.caption_vi ?? ""}
                placeholder="Caption (VI)"
                className="w-full text-xs text-muted-foreground bg-transparent border-b border-border focus:outline-none focus:border-secondary py-1 placeholder:text-muted-foreground/40"
              />
            </div>
          </div>
        ))}

        {/* Add placeholder */}
        <div className="aspect-[4/3] border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-secondary/50 transition-colors group">
          <Plus className="w-6 h-6 text-muted-foreground/40 group-hover:text-secondary transition-colors" />
          <p className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground/40 group-hover:text-secondary transition-colors">Add Photo</p>
        </div>
      </div>
    </div>
  );
}
