import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL, site } from "@/lib/site";

/**
 * Fonts are self-hosted (from @fontsource) instead of loaded from
 * fonts.googleapis.com at build time — no build/deploy dependency on a
 * third-party host, and no layout shift while Google Fonts loads.
 */
const serif = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Cormorant Garamond", "Georgia", "serif"],
});
const sans = localFont({
  src: [
    { path: "../fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/manrope-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/manrope-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/manrope-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["Manrope", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} | Best Beauty Salon in Lahore`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["best salon in Lahore", "beauty salon Lahore", "ladies salon Lahore", "bridal makeup Lahore", "hair salon Lahore"],
  authors: [{ name: "WordbitX", url: "https://www.wordbitxtech.com/" }],
  creator: "WordbitX",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/icon.svg" },
  other: { "geo.region": "PK-PB", "geo.placename": "Lahore", "geo.position": `${site.geo.lat};${site.geo.lng}`, ICBM: `${site.geo.lat}, ${site.geo.lng}` },
};
export const viewport: Viewport = { themeColor: "#fbf8f3", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
