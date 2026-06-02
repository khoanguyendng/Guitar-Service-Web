"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { PageHero } from "@/components/sections/PageHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts, type BlogCategory } from "@/lib/blog-data";

type FilterKey = "all" | BlogCategory;

const FILTERS: FilterKey[] = [
  "all",
  "setup-tips",
  "technique",
  "gear-review",
  "guitar-type",
  "news",
];

const FILTER_KEYS: Record<FilterKey, string> = {
  "all":          "filter_all",
  "setup-tips":   "filter_setup_tips",
  "technique":    "filter_technique",
  "gear-review":  "filter_gear_review",
  "guitar-type":  "filter_guitar_type",
  "news":         "filter_news",
};

export default function BlogPage() {
  const t = useTranslations("blog_page");
  const locale = useLocale();
  const [active, setActive] = useState<FilterKey>("all");

  const featured = blogPosts.find((p) => p.is_featured);
  const filtered = active === "all"
    ? blogPosts.filter((p) => !p.is_featured)
    : blogPosts.filter((p) => p.category === active && !p.is_featured);

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Filter bar */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {FILTERS.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`px-5 py-2 text-xs font-mono tracking-[0.2em] uppercase transition-all duration-200 border ${
                  active === key
                    ? "border-secondary bg-secondary/10 text-secondary"
                    : "border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground"
                }`}
              >
                {t(FILTER_KEYS[key] as any)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Featured post */}
          {active === "all" && featured && (
            <BlogCard post={featured} locale={locale} featured />
          )}

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-muted-foreground/50">
                {t("no_posts")}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
