import type { NextConfig } from "next";

// `vinext dev` drives local development; `STATIC_EXPORT=1 next build` produces the
// deployable static site. Keeping the export behind a flag means the dev server
// and the Cloudflare build do not fight over the same config.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport
    ? {
        output: "export" as const,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
