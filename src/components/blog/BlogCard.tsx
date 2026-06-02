import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
  locale: string;
  featured?: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  "setup-tips":   "Setup Tips",
  "technique":    "Technique",
  "gear-review":  "Gear Review",
  "guitar-type":  "Guitar Type",
  "news":         "News",
};

export function BlogCard({ post, locale, featured = false }: BlogCardProps) {
  const t = useTranslations("blog_page");
  const title   = locale === "vi" ? post.title_vi   : post.title_en;
  const excerpt = locale === "vi" ? post.excerpt_vi : post.excerpt_en;

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-border hover:border-secondary/40 transition-colors duration-300 overflow-hidden">
          {/* Gradient image */}
          <div className={`relative aspect-[16/9] lg:aspect-auto bg-gradient-to-br ${post.gradient} overflow-hidden`}>
            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
              <svg viewBox="0 0 100 140" className="w-32 h-44 fill-amber-200">
                <ellipse cx="50" cy="95" rx="28" ry="32" />
                <ellipse cx="50" cy="55" rx="20" ry="22" />
                <rect x="47" y="10" width="6" height="35" rx="2" />
                <rect x="44" y="8" width="12" height="4" rx="1" />
              </svg>
            </div>
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-[9px] font-mono tracking-[0.3em] uppercase">
                {t("featured")}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-10 flex flex-col justify-center bg-background">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 border border-secondary/30 text-secondary text-[9px] font-mono tracking-[0.3em] uppercase">
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/60">
                <Clock className="w-3 h-3" />
                {post.read_time} {t("min_read")}
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-foreground group-hover:text-primary transition-colors duration-300 mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 line-clamp-3">
              {excerpt}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-secondary border-b border-secondary/30 pb-0.5 w-fit group-hover:border-secondary transition-colors">
              {t("read_more")}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="border border-border hover:border-secondary/40 transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Gradient image */}
        <div className={`relative aspect-[16/9] bg-gradient-to-br ${post.gradient} overflow-hidden shrink-0`}>
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <svg viewBox="0 0 100 140" className="w-20 h-28 fill-amber-200">
              <ellipse cx="50" cy="95" rx="28" ry="32" />
              <ellipse cx="50" cy="55" rx="20" ry="22" />
              <rect x="47" y="10" width="6" height="35" rx="2" />
              <rect x="44" y="8" width="12" height="4" rx="1" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm text-amber-400/90 text-[8px] font-mono tracking-[0.25em] uppercase">
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1 bg-background">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono text-muted-foreground/50">
              {post.published_at}
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/50">
              <Clock className="w-3 h-3" />
              {post.read_time} {t("min_read")}
            </span>
          </div>
          <h3 className="font-heading text-lg text-foreground group-hover:text-primary transition-colors duration-300 mb-3 leading-snug line-clamp-2 flex-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-secondary mt-auto">
            {t("read_more")}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
