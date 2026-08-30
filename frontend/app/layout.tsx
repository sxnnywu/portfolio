import type { Metadata } from "next";
import { Caveat, Anonymous_Pro } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const anonymousPro = Anonymous_Pro({
  variable: "--font-anon",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Sunny Wu",
  description: "Computer science @ UWaterloo · business administration @ Laurier · builder, creator, community maker.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caveat.variable} ${anonymousPro.variable}`}>
      <body className="bg-cream text-indigo min-h-screen font-body antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
