import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: new URL(route, siteUrl).toString(), lastModified: new Date("2026-09-10"), changeFrequency: route.startsWith("/guides/") ? "monthly" : "weekly", priority: route === "/" ? 1 : route.includes("water-filtration") || route === "/products/" ? 0.8 : 0.6 }));
}

