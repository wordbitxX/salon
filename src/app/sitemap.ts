import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { services } from "@/lib/services";
import { posts } from "@/lib/blog";
import { locations } from "@/lib/locations";
import { staff } from "@/lib/staff";
import { landings } from "@/lib/landing";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["", "/about", "/services", "/bridal", "/our-team", "/gallery", "/offers", "/packages", "/booking", "/contact", "/blog", "/faq", "/privacy-policy", "/terms"];
  return [
    ...statics.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: (p === "" ? "weekly" : "monthly") as "weekly" | "monthly", priority: p === "" ? 1 : p === "/booking" || p === "/services" ? 0.9 : 0.7 })),
    ...landings.map((l) => ({ url: `${SITE_URL}/${l.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...services.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...staff.map((s) => ({ url: `${SITE_URL}/our-team/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...locations.map((l) => ({ url: `${SITE_URL}/locations/${l.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
