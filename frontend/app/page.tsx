import Link from "next/link";
import Bloom from "@/components/Bloom";
import ContactSection from "@/components/ContactSection";
import ScrollStoryPreview from "@/components/ScrollStoryPreview";
import { navRows } from "@/lib/data";
import { color, layout, skyTint, type } from "@/lib/tokens";

function NavRows() {
  return (
    <div
      id="work"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: layout.maxWidth,
        margin: "0 auto",
        padding: "130px 6vw 150px",
      }}
    >
      <div style={{ marginBottom: 24, fontSize: 16.5, color: color.muted }}>
        Want the longer version?
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {navRows.map(({ href, title, blurb, tint, bloom }) => (
          <Link
            key={href}
            data-reveal
            data-navrow
            href={href}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 30,
              padding: "30px 34px",
              borderRadius: 16,
              background: skyTint(tint),
              color: "inherit",
            }}
          >
            <Bloom color={bloom} />
            <span style={{ ...type.sectionTitle, position: "relative" }}>{title}</span>
            <span style={{ position: "relative", fontSize: 12.5, color: color.skyInkLight }}>
              {blurb}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <ScrollStoryPreview home />
      <NavRows />
      <ContactSection />
    </main>
  );
}
