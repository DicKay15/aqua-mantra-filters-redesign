import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/lib/site";

/** Required by `output: "export"`, which cannot serve a dynamic metadata route. */
export const dynamic = "force-static";

/** Routes are stored without a trailing slash, so match them that way. */
const priorityFor = (route: string) => {
  if (route === "/") return 1;
  if (route === "/products" || route.includes("water-filtration")) return 0.8;
  return 0.6;
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: new Date("2026-09-10"),
    changeFrequency: route.startsWith("/guides/") ? "monthly" : "weekly",
    priority: priorityFor(route),
  }));
}
