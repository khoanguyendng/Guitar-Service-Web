"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/PageHero";

type FilterKey = "all" | "acoustic" | "electric" | "repair" | "classic";

interface GalleryItem {
  id: number;
  category: Exclude<FilterKey, "all">;
  caption: string;
  gradient: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    category: "acoustic",
    caption: "Taylor 814ce — Setup tổng thể & điều chỉnh intonation",
    gradient: "from-amber-900 via-amber-800 to-stone-900",
  },
  {
    id: 2,
    category: "electric",
    caption: "Fender Stratocaster — Thay pickup Seymour Duncan",
    gradient: "from-stone-900 via-amber-950 to-zinc-900",
  },
  {
    id: 3,
    category: "repair",
    caption: "Martin D-28 (1972) — Phục hồi bề mặt & thay nut",
    gradient: "from-amber-950 via-stone-800 to-amber-900",
  },
  {
    id: 4,
    category: "classic",
    caption: "Yamaha C40 — Thay dây nylon & điều chỉnh action",
    gradient: "from-stone-800 via-amber-900 to-stone-900",
  },
  {
    id: 5,
    category: "acoustic",
    caption: "Gibson J-45 — Sửa chữa vết nứt thân đàn",
    gradient: "from-amber-800 via-stone-900 to-amber-950",
  },
  {
    id: 6,
    category: "electric",
    caption: "Gibson Les Paul Standard — Wiring & pot replacement",
    gradient: "from-zinc-900 via-stone-800 to-amber-950",
  },
  {
    id: 7,
    category: "repair",
    caption: "Vintage Parlor Guitar (1960s) — Phục hồi toàn bộ",
    gradient: "from-amber-900 via-amber-950 to-stone-900",
  },
  {
    id: 8,
    category: "acoustic",
    caption: "Takamine GN93CE — Fret level & crown",
    gradient: "from-stone-900 via-amber-800 to-amber-900",
  },
  {
    id: 9,
    category: "repair",
    caption: "Epiphone Casino — Sửa headstock gãy",
    gradient: "from-amber-950 via-zinc-900 to-stone-800",
  },
  {
    id: 10,
    category: "classic",
    caption: "Ramirez Classical — Điều chỉnh action & saddle",
    gradient: "from-stone-800 via-stone-900 to-amber-900",
  },
  {
    id: 11,
    category: "acoustic",
    caption: "Seagull S6 — Setup mùa khô & dưỡng fingerboard",
    gradient: "from-amber-900 via-stone-800 to-amber-800",
  },
  {
    id: 12,
    category: "electric",
    caption: "PRS SE Custom 24 — Coil tap setup & tremolo setup",
    gradient: "from-zinc-900 via-amber-950 to-stone-900",
  },
];

const FILTER_LABELS: Record<FilterKey, string> = {
  all: "filter_all",
  acoustic: "filter_acoustic",
  electric: "filter_electric",
  repair: "filter_repair",
  classic: "filter_classic",
};

export default function GalleryPage() {
  const t = useTranslations("gallery_page");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredItems =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

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
                {t(FILTER_LABELS[key] as keyof ReturnType<typeof t>)}
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
              <div key={item.id} className="group relative aspect-[4/3] overflow-hidden border border-border">
                {/* Gradient placeholder simulating photo */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-105`}
                />

                {/* Decorative guitar body silhouette */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg viewBox="0 0 100 140" className="w-24 h-32 fill-amber-200">
                    <ellipse cx="50" cy="95" rx="28" ry="32" />
                    <ellipse cx="50" cy="55" rx="20" ry="22" />
                    <rect x="47" y="10" width="6" height="35" rx="2" />
                    <rect x="44" y="8" width="12" height="4" rx="1" />
                  </svg>
                </div>

                {/* Grain overlay */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                    backgroundSize: "150px 150px",
                  }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <span className="inline-block px-3 py-1 border border-amber-400/50 text-amber-400 text-[9px] font-mono tracking-[0.3em] uppercase mb-3">
                    {item.category}
                  </span>
                  <p className="text-amber-100/90 text-xs leading-relaxed font-light">
                    {item.caption}
                  </p>
                </div>

                {/* Category badge (always visible) */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm border border-amber-500/20 text-amber-400/80 text-[8px] font-mono tracking-widest uppercase">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-mono">
              Không có ảnh trong danh mục này.
            </div>
          )}
        </div>
      </section>

      {/* Before & After Hint */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="retro-divider mx-auto w-48 mb-8">
            <span className="text-secondary text-sm">◆</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
            — Trước & Sau —
          </p>
          <h3 className="font-heading text-2xl text-foreground mb-4">
            Sự biến đổi kỳ diệu
          </h3>
          <p className="text-muted-foreground leading-relaxed italic font-heading text-lg max-w-xl mx-auto">
            Mỗi cây đàn qua tay chúng tôi đều trải qua một hành trình hồi sinh. Từ cũ kỹ
            đến hoàn hảo — chúng tôi ghi lại từng bước biến đổi đó.
          </p>
          <p className="mt-4 text-xs font-mono text-muted-foreground/60 tracking-widest">
            Liên hệ để xem thêm hình ảnh trước & sau cho từng loại dịch vụ
          </p>
        </div>
      </section>
    </>
  );
}
