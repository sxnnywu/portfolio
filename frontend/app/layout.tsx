import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Sunny Wu",
  description: "An engineer who speaks business.",
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
      </body>
    </html>
  );
}
