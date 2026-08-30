import { Fragment } from "react";
import Link from "next/link";
import Cloud from "@/components/Cloud";
import ContactSection from "@/components/ContactSection";
import Sun, { SunFilterDefs } from "@/components/Sun";
import Typed from "@/components/Typed";
import StatBand from "@/components/StatBand";
import { education, navRows } from "@/lib/data";
import {
  color,
  emphasis,
  font,
  gradient,
  layout,
  pill,
  skyTint,
  type,
} from "@/lib/tokens";

const blueItalic = { fontStyle: "italic", color: color.blueInk } as const;

function Hero() {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 660,
        zIndex: 2,
        background: gradient.heroSky,
      }}
    >
      <div data-decor data-speed="0.28" style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <Cloud height={150} opacity={0.4} style={{ left: -170, top: 24 }} />
        <Cloud height={112} opacity={0.28} flipped style={{ left: 96, top: 2 }} />
        <Cloud height={134} opacity={0.32} flipped style={{ right: -140, top: 110 }} />
        <Cloud height={104} opacity={0.22} style={{ right: 120, top: -30 }} />
      </div>

      <div data-decor data-speed="0.58" style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <Cloud height={196} opacity={0.72} style={{ left: -190, top: 120 }} />
        <Cloud height={150} opacity={0.5} flipped style={{ left: -60, top: 250 }} />
        <Cloud height={206} opacity={0.7} flipped style={{ right: -180, top: 168 }} />
        <Cloud height={156} opacity={0.48} style={{ right: -70, top: 298 }} />
      </div>

      <div
        data-decor
        data-speed="0.03"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "11%",
          display: "flex",
          justifyContent: "center",
          willChange: "transform",
        }}
      >
        <Sun />
      </div>

      <div
        data-speed="0.55"
        data-fade="1"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "36%",
          textAlign: "center",
          padding: "0 6vw",
          willChange: "transform, opacity",
        }}
      >
        <Typed length={"Hey, I'm Sunny".length} style={type.heroDisplay}>
          Hey, I&apos;m{" "}
          <span
            style={{
              fontFamily: font.script,
              fontWeight: 700,
              fontSize: "1.1em",
              color: color.blueInk,
            }}
          >
            Sunny
          </span>
        </Typed>
        <div
          style={{
            marginTop: 20,
            fontSize: "clamp(19px,1.8vw,25px)",
            color: color.skyInk,
          }}
        >
          An <span style={emphasis(1.18)}>engineer</span> who speaks{" "}
          <span style={emphasis(1.18)}>business</span>
        </div>
        <a href="#work" style={{ ...pill.hero, marginTop: 42 }}>
          See what I&apos;ve built &rarr;
        </a>
      </div>

      <div
        data-decor
        data-speed="0.92"
        style={{ position: "absolute", left: 0, right: 0, bottom: 64, height: 230, willChange: "transform" }}
      >
        <Cloud masked height={224} opacity={0.96} style={{ left: -200, bottom: -10 }} />
        <Cloud masked height={186} opacity={0.9} flipped style={{ left: -20, bottom: -52 }} />
        <Cloud masked height={212} opacity={0.94} style={{ left: 210, bottom: -74 }} />
        <Cloud masked height={184} opacity={0.9} flipped style={{ left: 440, bottom: -44 }} />
        <Cloud masked height={214} opacity={0.94} style={{ left: 640, bottom: -72 }} />
        <Cloud masked height={188} opacity={0.9} flipped style={{ left: 860, bottom: -40 }} />
        <Cloud masked height={220} opacity={0.96} style={{ right: -200, bottom: -12 }} />
      </div>

      <div
        data-speed="0.3"
        data-fade="1"
        style={{
          ...type.metaLabel,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 38,
          textAlign: "center",
          color: "#4a7091",
          willChange: "transform, opacity",
        }}
      >
        Scroll &darr;
      </div>
    </div>
  );
}

function Lede() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: layout.maxWidth,
        margin: "0 auto",
        padding: "200px 6vw 0",
        textAlign: "center",
      }}
    >
      <div
        data-reveal
        style={{
          fontFamily: font.serif,
          fontSize: "clamp(20px,2.2vw,28px)",
          fontWeight: 300,
          lineHeight: 1.62,
          color: color.body,
        }}
      >
        I grew up in the <em style={blueItalic}>performing arts</em>, learned to{" "}
        <em style={blueItalic}>code</em> at a <em style={blueItalic}>hackathon</em> my friends
        dragged me to, and now <em style={blueItalic}>storytelling</em> is the part of{" "}
        <em style={blueItalic}>engineering</em>{" "}
        I&apos;m best at.
      </div>

      <div
        data-reveal
        style={{
          marginTop: 52,
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 34,
          fontSize: "clamp(14px,1.2vw,16px)",
          lineHeight: 1.5,
          color: color.bodyAlt,
          textAlign: "left",
        }}
      >
        {education.map(({ program, school }, i) => (
          <Fragment key={program}>
            {i > 0 && <span style={{ width: 1, background: "rgba(42,42,36,.2)" }} />}
            <span style={{ flex: "none" }}>
              {program}
              <br />
              <span style={{ fontFamily: font.serif, fontStyle: "italic", color: color.muted }}>
                {school}
              </span>
            </span>
          </Fragment>
        ))}
      </div>

      <StatBand />
    </div>
  );
}

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
        So, what do you want to see?
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {navRows.map(({ href, title, blurb, tint }) => (
          <Link
            key={href}
            data-reveal
            href={href}
            style={{
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
            <span style={type.sectionTitle}>{title}</span>
            <span style={{ fontSize: 12.5, color: color.skyInkLight }}>{blurb}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SunFilterDefs />
      <Hero />
      <Lede />
      <NavRows />
      <ContactSection />
    </>
  );
}
