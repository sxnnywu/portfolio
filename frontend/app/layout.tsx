import type { Metadata } from "next";
import { Caveat, Newsreader, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ParallaxRoot from "@/components/ParallaxRoot";

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
        <div style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
          <Header />
          {children}
        </div>
        <ParallaxRoot />
      </body>
    </html>
  );
}
