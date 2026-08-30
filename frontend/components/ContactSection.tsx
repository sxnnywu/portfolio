import type { ReactNode } from "react";
import Cloud from "@/components/Cloud";
import { socials } from "@/lib/data";
import { externalLinkProps } from "@/lib/links";
import { color, emphasis, font, gradient, pill } from "@/lib/tokens";

const CONTACT_TOP_FADE = "linear-gradient(to bottom, transparent 0px, #000 110px)";

export default function ContactSection({ subline }: { subline?: ReactNode }) {
  return (
    <div
      id="contact"
      data-scene
      style={{
        position: "relative",
        overflow: "hidden",
        background: gradient.contact,
        // Parallax slides the clouds an arbitrary distance past this panel's top
        // edge, so no fixed mask on an image can guarantee the clip lands where
        // it is transparent. Fading the boundary itself does. This costs nothing
        // visually: the gradient's first stop is the page background exactly.
        WebkitMaskImage: CONTACT_TOP_FADE,
        maskImage: CONTACT_TOP_FADE,
      }}
    >
      <div data-decor data-local="0.34" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 260, willChange: "transform" }}>
        <Cloud masked height={196} opacity={0.5} style={{ left: -210, top: 56 }} />
        <Cloud masked height={202} opacity={0.5} flipped style={{ right: -190, top: 88 }} />
      </div>
      <div data-decor data-local="0.5" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 240, willChange: "transform" }}>
        <Cloud masked height={210} opacity={0.5} style={{ left: -200, bottom: -70 }} />
        <Cloud masked height={216} opacity={0.5} flipped style={{ right: -190, bottom: -84 }} />
      </div>
      <div data-decor data-local="0.96" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 240, willChange: "transform" }}>
        <Cloud masked height={180} opacity={0.62} flipped style={{ left: -120, bottom: -116 }} />
        <Cloud masked height={146} opacity={0.42} style={{ left: 96, bottom: -146 }} />
        <Cloud masked height={186} opacity={0.62} style={{ right: -104, bottom: -124 }} />
        <Cloud masked height={150} opacity={0.42} flipped style={{ right: 110, bottom: -150 }} />
      </div>
      <div data-decor data-local="0.72" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 260, willChange: "transform" }}>
        <Cloud masked height={158} opacity={0.42} flipped style={{ left: 100, top: -34 }} />
        <Cloud masked height={150} opacity={0.4} style={{ right: 110, top: -48 }} />
        <Cloud masked height={132} opacity={0.3} flipped style={{ left: "44%", top: -70 }} />
      </div>

      <div
        data-local="0.16"
        style={{ position: "relative", padding: "150px 6vw 160px", textAlign: "center", willChange: "transform" }}
      >
        <div
          style={{
            fontFamily: font.serif,
            fontWeight: 200,
            fontSize: "clamp(38px,4.6vw,60px)",
            lineHeight: 1.1,
            letterSpacing: "-.022em",
            color: color.inkDeepSky,
          }}
        >
          If you&apos;ve read this far, say something ;)
        </div>
        <div style={{ marginTop: 16, fontSize: 15.5, color: color.skyInk }}>
          {subline ?? (
            <>
              Open to <em style={emphasis()}>product</em> and <em style={emphasis()}>engineering</em> roles,
              and being convinced otherwise. Always up for <em style={emphasis()}>side quests</em>.
            </>
          )}
        </div>
        <a href={socials[2].href} style={{ ...pill.close, marginTop: 34 }}>
          Say hi &rarr;
        </a>
        <div
          style={{
            marginTop: 44,
            display: "flex",
            justifyContent: "center",
            gap: 26,
            fontSize: 12.5,
            color: "#3f6480",
          }}
        >
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              {...externalLinkProps(href)}
              style={{ color: "#3f6480" }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
