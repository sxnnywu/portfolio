import ContactSection from "@/components/ContactSection";
import SkyBand from "@/components/SkyBand";
import { awards } from "@/lib/data";
import { color, font, layout, rule } from "@/lib/tokens";

export const metadata = { title: "Awards — Sunny Wu" };

export default function Awards() {
  return (
    <>
      <SkyBand
        sublineLength={55}
        title="Awards" subline="Recognition is a lagging indicator, but it's a nice one" />

      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "90px 6vw 34px" }} />

      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "0 6vw 130px" }}>
        {awards.map(({ year, awards: entries }) => (
          <div
            key={year}
            data-reveal
            data-award-group
            style={{
              display: "grid",
              gridTemplateColumns: "110px 1fr",
              gap: 36,
              padding: "34px 0",
              borderTop: `1px solid ${rule.hairline}`,
            }}
          >
            <div
              style={{
                fontFamily: font.serif,
                fontWeight: 200,
                fontSize: 38,
                lineHeight: 1,
                color: "#c9c2b4",
              }}
            >
              {year}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {entries.map((award) => (
                <div key={`${award.title}-${award.issuer}`}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: font.serif,
                        fontSize: 22,
                        fontWeight: 300,
                        color: color.blueInk,
                      }}
                    >
                      {award.title}
                    </span>
                  </div>
                  <div style={{ marginTop: 3, fontSize: 13, color: color.muted }}>{award.issuer}</div>
                  {award.note && (
                    <div
                      style={{
                        marginTop: 6,
                        fontFamily: font.serif,
                        fontWeight: 300,
                        fontSize: 16.5,
                        lineHeight: 1.5,
                        color: color.body,
                        maxWidth: 620,
                      }}
                    >
                      {award.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ContactSection />
    </>
  );
}
