import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";

const BASE_URL = "https://torigo.com";
const LOCALES = ["en", "vi"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "",            priority: 1.0,  changeFreq: "weekly"  },
    { path: "/about",      priority: 0.8,  changeFreq: "monthly" },
    { path: "/services",   priority: 0.9,  changeFreq: "monthly" },
    { path: "/gallery",    priority: 0.8,  changeFreq: "monthly" },
    { path: "/booking",    priority: 0.9,  changeFreq: "monthly" },
    { path: "/contact",    priority: 0.7,  changeFreq: "monthly" },
    { path: "/price-list", priority: 0.85, changeFreq: "monthly" },
    { path: "/faq",        priority: 0.75, changeFreq: "monthly" },
    { path: "/blog",       priority: 0.8,  changeFreq: "weekly"  },
  ] as const;

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap(({ path, priority, changeFreq }) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: changeFreq,
      priority,
    }))
  );

  const blogEntries: MetadataRoute.Sitemap = blogPosts.flatMap((post) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly" as const,
      priority: post.is_featured ? 0.7 : 0.6,
    }))
  );

  return [...staticEntries, ...blogEntries];
}
