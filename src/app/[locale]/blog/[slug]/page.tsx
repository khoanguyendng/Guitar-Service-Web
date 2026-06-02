import { notFound } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";
import { BlogCard } from "@/components/blog/BlogCard";
import { Clock, ArrowLeft, Calendar } from "lucide-react";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: locale === "vi" ? post.title_vi : post.title_en,
    description: locale === "vi" ? post.excerpt_vi : post.excerpt_en,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  "setup-tips":  "Setup Tips",
  "technique":   "Technique",
  "gear-review": "Gear Review",
  "guitar-type": "Guitar Type",
  "news":        "News",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations("blog_page");

  const title   = locale === "vi" ? post.title_vi   : post.title_en;
  const content = locale === "vi" ? post.content_vi : post.content_en;

  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "Guitar Service" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${post.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(0,0,0,0.5),transparent)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-amber-400/70 hover:text-amber-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" />
            {t("back_to_blog")}
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 border border-amber-400/40 text-amber-400 text-[9px] font-mono tracking-[0.3em] uppercase">
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-amber-50 leading-tight mb-6">
            {title}
          </h1>
          <div className="flex items-center gap-5 text-amber-200/50 text-[11px] font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.published_at}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.read_time} {t("min_read")}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-stone dark:prose-invert max-w-none
              prose-headings:font-heading prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-[15px]
              prose-li:text-muted-foreground prose-li:text-[15px]
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
              prose-ol:text-muted-foreground prose-ul:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-secondary mb-8 text-center">
              — {t("related")} —
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
