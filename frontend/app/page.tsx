import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import Cloud from "@/components/Cloud";
import ContactSection from "@/components/ContactSection";
import Sun, { SunFilterDefs } from "@/components/Sun";
import SunEasterEgg from "@/components/SunEasterEgg";
import Logo from "@/components/Logo";
import Typed, { afterTyping, sequenceEnd } from "@/components/Typed";
import Bloom from "@/components/Bloom";
import StatBand from "@/components/StatBand";
import HeroRoles from "@/components/HeroRoles";
import HeroCTA from "@/components/HeroCTA";
import { education, heroHeadline, heroTagline, navRows } from "@/lib/data";
import {
  color,
  font,
  gradient,
  layout,
  skyTint,
  type,
} from "@/lib/tokens";

const blueItalic = { fontStyle: "italic", color: color.blueInk } as const;

function Hero() {
  return (
    <div
      data-sky
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 660,
        zIndex: 2,
        background: gradient.heroSky,
        transition: "background 1s ease",
      }}
    >
      <SunEasterEgg />
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
        data-hero-copy
        data-speed="0.55"
        data-fade="1"
        style={{
          position: "absolute",
          zIndex: 1,
          left: 0,
          right: 0,
          top: "36%",
          textAlign: "center",
          padding: "0 6vw",
          willChange: "transform, opacity",
        }}
      >
        <Typed text={heroHeadline} style={type.heroDisplay}>
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
        <Typed
          text={heroTagline}
          delay={sequenceEnd(heroHeadline.length)}
          style={{
            marginTop: 24,
            fontFamily: font.serif,
            fontWeight: 300,
            fontSize: "clamp(28px,3.2vw,42px)",
            lineHeight: 1.18,
            letterSpacing: "-.015em",
            color: color.inkDeepSky,
          }}
        >
          a <em>theatre kid</em> with a GitHub
        </Typed>
        <HeroRoles delay={sequenceEnd(heroHeadline.length, heroTagline.length)} />
        <div
          data-after-type
          style={{ marginTop: 32, ...afterTyping(heroHeadline.length, heroTagline.length) }}
        >
          <HeroCTA />
        </div>
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
        <span data-after-type style={afterTyping(heroHeadline.length, heroTagline.length)}>
          Scroll &darr;
        </span>
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
        style={{ width: "clamp(144px,14vw,168px)", margin: "0 auto 36px" }}
      >
        <figure
          style={{
            margin: 0,
            padding: "8px 8px 26px",
            background: "#fffdf6",
            borderRadius: 2,
            transform: "rotate(-5deg)",
            boxShadow:
              "0 1px 2px rgba(42,42,36,.12), 0 14px 28px -16px rgba(60,50,30,.32)",
          }}
        >
          <Image
            src="/assets/sunny-portrait.jpg"
            alt="Sunny Wu"
            width={747}
            height={887}
            sizes="(max-width: 1028px) 128px, (max-width: 1200px) 14vw, 152px"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </figure>
      </div>
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
        dragged me to, and have been finding excuses to{" "}
        <em style={blueItalic}>build things</em> ever since.
      </div>

      <div
        data-reveal
        style={{
          marginTop: 52,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 34,
          fontSize: "clamp(14px,1.2vw,16px)",
          lineHeight: 1.5,
          color: color.bodyAlt,
          textAlign: "left",
        }}
      >
        {education.map(({ program, school, logo }, i) => (
          <Fragment key={program}>
            {i > 0 && (
              <span data-education-divider style={{ width: 1, flex: "none", background: "rgba(42,42,36,.2)" }} />
            )}
            <span style={{ flex: "none", display: "flex", alignItems: "center", gap: 10 }}>
              <Logo src={logo} size={26} />
              <span>
                {program}
                <br />
                <span style={{ fontFamily: font.serif, fontStyle: "italic", color: color.muted }}>
                  {school}
                </span>
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
    <>
      <SunFilterDefs />
      <Hero />
      <Lede />
      <NavRows />
      <ContactSection />
    </>
  );
}
