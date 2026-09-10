import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * One flag controls indexing for the whole site.
 *
 * While this is a stakeholder review build it stays off, and the site is closed
 * to crawlers. At launch, set SITE_LIVE=1 in the deploy environment: that is the
 * only change needed here. The matching `robots: { index: false }` metadata
 * lives in app/layout.tsx and reads the same variable, so the two cannot
 * disagree.
 */
const live = process.env.SITE_LIVE === "1";

/** Required by `output: "export"`, which cannot serve a dynamic metadata route. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: live ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
