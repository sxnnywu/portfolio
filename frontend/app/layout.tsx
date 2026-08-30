import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/site";
import { Caveat, Newsreader, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ParallaxRoot from "@/components/ParallaxRoot";
import ScrollReveal from "@/components/ScrollReveal";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const DESCRIPTION = "An engineer who speaks business. Computer science at Waterloo, business at Laurier, building Oro.";

export const metadata: Metadata = {
  // Required for the OG image to resolve to an absolute URL when shared.
  metadataBase: new URL(SITE_URL),
  title: { default: "Sunny Wu", template: "%s — Sunny Wu" },
  description: DESCRIPTION,
  openGraph: {
    title: "Sunny Wu",
    description: DESCRIPTION,
    url: "/",
    siteName: "Sunny Wu",
    type: "website",
    locale: "en_CA",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Hey, I'm Sunny — an engineer who speaks business" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunny Wu",
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${schibsted.variable} ${caveat.variable}`}
    >
      <body>
        <noscript>
          {/* Without JS nothing can add .is-visible, so opt out of the reveal entirely. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <div style={{ position: "relative", width: "100%" }}>
          <Header />
          {children}
        </div>
        <ParallaxRoot />
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  );
}
