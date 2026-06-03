"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Link } from "@/lib/navigation";
import { blogPosts, type BlogCategory } from "@/lib/blog-data";
import { Save, ArrowLeft, Loader2 } from "lucide-react";

const CATEGORIES: BlogCategory[] = ["setup-tips", "technique", "gear-review", "guitar-type", "news"];

interface FormData {
  title_en: string; title_vi: string;
  excerpt_en: string; excerpt_vi: string;
  content_en: string; content_vi: string;
  category: BlogCategory;
  tags: string;
  read_time: number;
  is_published: boolean;
  is_featured: boolean;
}

const EMPTY: FormData = {
  title_en: "", title_vi: "", excerpt_en: "", excerpt_vi: "",
  content_en: "", content_vi: "", category: "setup-tips",
  tags: "", read_time: 5, is_published: false, is_featured: false,
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{label}</label>
      {children}
    </div>
  );
}

const INPUT = "w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:border-secondary/60 transition-colors";
const TEXTAREA = INPUT + " resize-none";

export default function BlogEditorPage() {
  const params    = useParams();
  const router    = useRouter();
  const id        = params.id as string;
  const isNew     = id === "new";

  const [data,    setData]    = useState<FormData>(EMPTY);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState("");
  const [tab,     setTab]     = useState<"en" | "vi">("en");

  useEffect(() => {
    if (!isNew) {
      const post = blogPosts.find(p => p.slug === id || p.slug === id);
      if (post) {
        setData({
          title_en: post.title_en, title_vi: post.title_vi,
          excerpt_en: post.excerpt_en, excerpt_vi: post.excerpt_vi,
          content_en: post.content_en.trim(), content_vi: post.content_vi.trim(),
          category: post.category, tags: post.tags.join(", "),
          read_time: post.read_time,
          is_published: true, is_featured: post.is_featured,
        });
      }
    }
  }, [id, isNew]);

  const update = (k: keyof FormData, v: any) => setData(p => ({ ...p, [k]: v }));

  const save = async () => {
    setSaving(true); setError("");
    try {
      const url    = isNew ? "/api/admin/blog" : `/api/admin/blog/${id}`;
      const method = isNew ? "POST" : "PATCH";
      const res    = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, tags: data.tags.split(",").map(t => t.trim()).filter(Boolean) }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      if (isNew) router.push("../blog");
    } catch {
      setError("Failed to save. Check your Supabase connection.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8 pt-10 md:pt-0">
        <Link href="/admin/blog" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary mb-0.5">Blog</p>
          <h1 className="font-heading text-2xl text-foreground">{isNew ? "New Post" : "Edit Post"}</h1>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {saved && <span className="text-emerald-600 text-xs font-mono">✓ Saved</span>}
          {error && <span className="text-red-500 text-xs">{error}</span>}
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-[10px] font-mono tracking-[0.2em] uppercase transition-colors"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save
          </button>
        </div>
      </div>

      {/* Meta row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-5 border border-border bg-card">
        <Field label="Category">
          <select value={data.category} onChange={e => update("category", e.target.value)} className={INPUT}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c.replace("-", " ")}</option>)}
          </select>
        </Field>
        <Field label="Read Time (min)">
          <input type="number" value={data.read_time} min={1} max={60} onChange={e => update("read_time", +e.target.value)} className={INPUT} />
        </Field>
        <Field label="Published">
          <div className="flex items-center gap-3 mt-3">
            <button onClick={() => update("is_published", !data.is_published)} className={`relative w-10 h-5 rounded-full transition-colors ${data.is_published ? "bg-primary" : "bg-border"}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${data.is_published ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
            <span className="text-xs text-muted-foreground">{data.is_published ? "Live" : "Draft"}</span>
          </div>
        </Field>
        <Field label="Featured">
          <div className="flex items-center gap-3 mt-3">
            <button onClick={() => update("is_featured", !data.is_featured)} className={`relative w-10 h-5 rounded-full transition-colors ${data.is_featured ? "bg-secondary" : "bg-border"}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${data.is_featured ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
            <span className="text-xs text-muted-foreground">{data.is_featured ? "Featured" : "Normal"}</span>
          </div>
        </Field>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <Field label="Tags (comma separated)">
          <input type="text" value={data.tags} onChange={e => update("tags", e.target.value)} placeholder="action, setup, fret" className={INPUT} />
        </Field>
      </div>

      {/* Language tabs */}
      <div className="flex gap-1 mb-4 border-b border-border">
        {(["en", "vi"] as const).map(l => (
          <button key={l} onClick={() => setTab(l)} className={`px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors border-b-2 -mb-px ${tab === l ? "border-secondary text-secondary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {l === "en" ? "English" : "Tiếng Việt"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <Field label={`Title (${tab.toUpperCase()})`}>
          <input
            type="text"
            value={tab === "en" ? data.title_en : data.title_vi}
            onChange={e => update(tab === "en" ? "title_en" : "title_vi", e.target.value)}
            placeholder={tab === "en" ? "The Complete Guide to Guitar Action" : "Hướng dẫn toàn diện về Action Guitar"}
            className={INPUT}
          />
        </Field>
        <Field label={`Excerpt (${tab.toUpperCase()})`}>
          <textarea
            rows={2}
            value={tab === "en" ? data.excerpt_en : data.excerpt_vi}
            onChange={e => update(tab === "en" ? "excerpt_en" : "excerpt_vi", e.target.value)}
            placeholder="Short summary shown in blog listing..."
            className={TEXTAREA}
          />
        </Field>
        <Field label={`Content HTML (${tab.toUpperCase()})`}>
          <textarea
            rows={16}
            value={tab === "en" ? data.content_en : data.content_vi}
            onChange={e => update(tab === "en" ? "content_en" : "content_vi", e.target.value)}
            placeholder="<h2>Section heading</h2><p>Content...</p>"
            className={TEXTAREA + " font-mono text-xs"}
          />
        </Field>
      </div>
    </div>
  );
}
