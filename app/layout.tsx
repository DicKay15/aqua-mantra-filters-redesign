import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "./globals.css";
import "./v2.css";
import { Footer, Header } from "@/components/site/SiteChrome";
import { JsonLd } from "@/components/site/Blocks";
import { siteUrl } from "@/lib/site";

/** One switch at launch: it drives both this and app/robots.ts. */
const live = process.env.SITE_LIVE === "1";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Whole House Water Filtration | Aqua Mantra Filters",
  description: "Explore whole-house water filtration systems supplied and professionally installed across Perth, Sydney and Adelaide.",
  alternates: { canonical: "/" },
  openGraph: { title: "Whole House Water Filtration | Aqua Mantra Filters", description: "Whole-house filtration advice, professional installation and ongoing support across Perth, Sydney and Adelaide.", url: "/", siteName: "Aqua Mantra Filters", locale: "en_AU", type: "website", images: [{ url: "/images/installations/install-18.jpg", width: 675, height: 1200, alt: "An installed Aqua Mantra whole-house filtration enclosure with pressure gauges and copper pipework." }] },
  twitter: { card: "summary_large_image" },
  robots: live ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body>
        <Header />
        {children}
        <Footer />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "Aqua Mantra Filters", url: siteUrl, telephone: "+61450864647", email: "aquamantra25@gmail.com", areaServed: ["Perth", "Sydney", "Adelaide"] }} />
      </body>
    </html>
  );
}
