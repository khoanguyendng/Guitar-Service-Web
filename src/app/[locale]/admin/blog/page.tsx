import { createAdminClient } from "@/lib/supabase/server";
import { Link } from "@/lib/navigation";
import { blogPosts } from "@/lib/blog-data";
import { Plus, Pencil, Eye, Clock } from "lucide-react";

interface DBPost {
  id: string;
  slug: string;
  title_en: string;
  title_vi: string;
  category: string;
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  read_time: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  "setup-tips":  "bg-amber-500/15 text-amber-700 border-amber-500/30",
  "technique":   "bg-blue-500/15 text-blue-700 border-blue-500/30",
  "gear-review": "bg-purple-500/15 text-purple-700 border-purple-500/30",
  "guitar-type": "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  "news":        "bg-stone-500/15 text-stone-600 border-stone-500/30",
};

export default async function BlogAdminPage() {
  let posts: DBPost[] = blogPosts.map(p => ({
    id: p.slug,
    slug: p.slug,
    title_en: p.title_en,
    title_vi: p.title_vi,
    category: p.category,
    is_published: true,
    is_featured: p.is_featured,
    published_at: p.published_at,
    read_time: p.read_time,
  }));
  let fromDB = false;

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = await createAdminClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title_en, title_vi, category, is_published, is_featured, published_at, read_time")
        .order("created_at", { ascending: false });
      if (!error && data?.length) { posts = data as DBPost[]; fromDB = true; }
    }
  } catch { /* static fallback */ }

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-8 pt-10 md:pt-0">
        <div>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-1">Admin</p>
          <h1 className="font-heading text-3xl text-foreground">Blog Posts</h1>
          {!fromDB && <span className="inline-flex mt-2 px-3 py-1 border border-amber-500/30 bg-amber-500/5 text-amber-600 text-[10px] font-mono tracking-wide">◆ Static data — run Phase 2 migration to enable DB</span>}
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-mono tracking-[0.2em] uppercase transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> New Post
        </Link>
      </div>

      <div className="border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Title", "Category", "Status", "Published", ""].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[9px] font-mono tracking-[0.25em] uppercase text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr key={post.id} className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors ${i % 2 !== 0 ? "bg-muted/10" : ""}`}>
                <td className="px-5 py-4">
                  <p className="font-heading text-sm text-foreground">{post.title_en}</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">{post.title_vi}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-0.5 border text-[9px] font-mono tracking-wider uppercase ${CATEGORY_COLORS[post.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                    {post.category.replace("-", " ")}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase ${post.is_published ? "text-emerald-600" : "text-muted-foreground/50"}`}>
                    {post.is_published ? "● Published" : "○ Draft"}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs font-mono text-muted-foreground/60">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString() : "—"}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/blog/${post.slug}`} className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded border border-transparent hover:border-border transition-colors">
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                    </Link>
                    <Link href={`/admin/blog/${post.id}`} className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded border border-transparent hover:border-border transition-colors">
                      <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
