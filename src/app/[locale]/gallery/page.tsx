"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";

type FilterKey = "all" | "acoustic" | "electric" | "repair" | "classic";

interface GalleryItem {
  id: number;
  category: Exclude<FilterKey, "all">;
  caption: string;
  gradient: string;
  beforeGradient?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1,  category: "acoustic", caption: "Taylor 814ce — Full setup & intonation adjustment", gradient: "from-amber-900 via-amber-800 to-stone-900", beforeGradient: "from-stone-700 via-stone-800 to-stone-900" },
  { id: 2,  category: "electric", caption: "Fender Stratocaster — Seymour Duncan pickup swap",  gradient: "from-stone-900 via-amber-950 to-zinc-900" },
  { id: 3,  category: "repair",   caption: "Martin D-28 (1972) — Surface restoration & nut replacement", gradient: "from-amber-950 via-stone-800 to-amber-900", beforeGradient: "from-stone-600 via-stone-700 to-stone-800" },
  { id: 4,  category: "classic",  caption: "Yamaha C40 — Nylon string change & action setup", gradient: "from-stone-800 via-amber-900 to-stone-900" },
  { id: 5,  category: "acoustic", caption: "Gibson J-45 — Body crack repair",                  gradient: "from-amber-800 via-stone-900 to-amber-950", beforeGradient: "from-stone-700 via-amber-950 to-stone-900" },
  { id: 6,  category: "electric", caption: "Gibson Les Paul Standard — Wiring & pot replacement", gradient: "from-zinc-900 via-stone-800 to-amber-950" },
  { id: 7,  category: "repair",   caption: "Vintage Parlor Guitar (1960s) — Full restoration",  gradient: "from-amber-900 via-amber-950 to-stone-900", beforeGradient: "from-stone-600 via-stone-700 to-stone-900" },
  { id: 8,  category: "acoustic", caption: "Takamine GN93CE — Fret level & crown",             gradient: "from-stone-900 via-amber-800 to-amber-900" },
  { id: 9,  category: "repair",   caption: "Epiphone Casino — Broken headstock repair",        gradient: "from-amber-950 via-zinc-900 to-stone-800" },
  { id: 10, category: "classic",  caption: "Ramirez Classical — Action & saddle adjustment",   gradient: "from-stone-800 via-stone-900 to-amber-900" },
  { id: 11, category: "acoustic", caption: "Seagull S6 — Dry season setup & fingerboard conditioning", gradient: "from-amber-900 via-stone-800 to-amber-800" },
  { id: 12, category: "electric", caption: "PRS SE Custom 24 — Coil tap & tremolo setup",     gradient: "from-zinc-900 via-amber-950 to-stone-900" },
];

type GalleryLabelKey = "filter_all" | "filter_acoustic" | "filter_electric" | "filter_repair" | "filter_classic";

const FILTER_LABELS: Record<FilterKey, GalleryLabelKey> = {
  all:      "filter_all",
  acoustic: "filter_acoustic",
  electric: "filter_electric",
  repair:   "filter_repair",
  classic:  "filter_classic",
};

function GradientPlaceholder({ gradient, caption }: { gradient: string; caption: string }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-0 opacity-10 flex items-center justify-center">
        <svg viewBox="0 0 100 140" className="w-20 h-28 fill-amber-200">
          <ellipse cx="50" cy="95" rx="28" ry="32" />
          <ellipse cx="50" cy="55" rx="20" ry="22" />
          <rect x="47" y="10" width="6" height="35" rx="2" />
          <rect x="44" y="8" width="12" height="4" rx="1" />
        </svg>
      </div>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "150px 150px" }} />
      <span className="sr-only">{caption}</span>
    </div>
  );
}

export default function GalleryPage() {
  const t = useTranslations("gallery_page");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeFilter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const beforeAfterItems = GALLERY_ITEMS.filter((i) => i.beforeGradient);

  return (
    <>
      <PageHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

      {/* Filter Tabs */}
      <section className="py-10 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {(Object.keys(FILTER_LABELS) as FilterKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-5 py-2 text-xs font-mono tracking-[0.2em] uppercase transition-all duration-200 border ${
                  activeFilter === key
                    ? "border-secondary bg-secondary/10 text-secondary"
                    : "border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground"
                }`}
              >
                {t(FILTER_LABELS[key])}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="group relative aspect-[4/3] overflow-hidden border border-border hover:border-secondary/40 transition-colors text-left"
              >
                <GradientPlaceholder gradient={item.gradient} caption={item.caption} />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center z-10">
                  <span className="inline-block px-3 py-1 border border-amber-400/50 text-amber-400 text-[9px] font-mono tracking-[0.3em] uppercase mb-3">
                    {item.category}
                  </span>
                  <p className="text-amber-100/90 text-xs leading-relaxed font-light">{item.caption}</p>
                  {item.beforeGradient && (
                    <span className="mt-3 text-[9px] font-mono tracking-[0.2em] uppercase text-amber-400/60">Before / After ↔</span>
                  )}
                </div>
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm border border-amber-500/20 text-amber-400/80 text-[8px] font-mono tracking-widest uppercase">
                    {item.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-mono text-xs tracking-widest">
              No items in this category.
            </div>
          )}
        </div>
      </section>

      {/* Before & After Section */}
      {beforeAfterItems.length > 0 && (
        <section className="py-20 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-secondary mb-4">
                — {t("before_after_badge")} —
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-3">
                {t("before_after_title")}
              </h2>
              <p className="text-muted-foreground text-[15px] max-w-lg mx-auto">
                {t("before_after_hint")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {beforeAfterItems.map((item) => (
                <div key={item.id} className="border border-border overflow-hidden">
                  <BeforeAfterSlider
                    beforeLabel="Before"
                    afterLabel="After"
                    className="aspect-[4/3]"
                    beforeContent={<GradientPlaceholder gradient={item.beforeGradient!} caption={item.caption} />}
                    afterContent={<GradientPlaceholder gradient={item.gradient} caption={item.caption} />}
                  />
                  <div className="px-4 py-3 bg-background border-t border-border">
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxItem.beforeGradient ? (
              <BeforeAfterSlider
                beforeLabel="Before"
                afterLabel="After"
                className="aspect-[4/3] w-full"
                beforeContent={<GradientPlaceholder gradient={lightboxItem.beforeGradient} caption={lightboxItem.caption} />}
                afterContent={<GradientPlaceholder gradient={lightboxItem.gradient} caption={lightboxItem.caption} />}
              />
            ) : (
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${lightboxItem.gradient}`}>
                <GradientPlaceholder gradient={lightboxItem.gradient} caption={lightboxItem.caption} />
              </div>
            )}
            <div className="mt-4 text-center">
              <span className="px-3 py-1 border border-amber-400/40 text-amber-400 text-[9px] font-mono tracking-[0.3em] uppercase mr-3">
                {lightboxItem.category}
              </span>
              <span className="text-amber-100/70 text-sm">{lightboxItem.caption}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
