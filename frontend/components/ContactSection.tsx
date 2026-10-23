import Cloud from "@/components/Cloud";
import { socials } from "@/lib/data";
import { externalLinkProps } from "@/lib/links";
import { color, emphasis, font, gradient, pill } from "@/lib/tokens";
import styles from "./ContactSection.module.css";

const CONTACT_TOP_FADE = "linear-gradient(to bottom, transparent 0px, #000 110px)";
const contactAccent = { ...emphasis(), color: color.blueInk };

export default function ContactSection({ immersive = false }: {
  immersive?: boolean;
}) {
  return (
    <section
      id="contact"
      aria-label="Contact"
      tabIndex={-1}
      data-scene={immersive ? undefined : true}
      className={`${styles.section} ${immersive ? styles.immersive : ""}`}
      style={{
        background: immersive ? undefined : gradient.contact,
        // Parallax slides the clouds an arbitrary distance past this panel's top
        // edge, so no fixed mask on an image can guarantee the clip lands where
        // it is transparent. Fading the boundary itself does. This costs nothing
        // visually: the gradient's first stop is the page background exactly.
        WebkitMaskImage: immersive ? undefined : CONTACT_TOP_FADE,
        maskImage: immersive ? undefined : CONTACT_TOP_FADE,
      }}
    >
      <div className={styles.cloudCanvas} aria-hidden="true">
      <div data-decor data-contact-clouds="top" data-local={immersive ? undefined : "0.34"} className={styles.cloudGroup} style={{ position: "absolute", left: 0, right: 0, top: 0, height: 260 }}>
        <Cloud masked height={196} opacity={0.5} style={{ left: -210, top: 56 }} />
        <Cloud masked height={202} opacity={0.5} flipped style={{ right: -190, top: 88 }} />
      </div>
      <div data-decor data-contact-clouds="bottom" data-local={immersive ? undefined : "0.5"} className={styles.cloudGroup} style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 240 }}>
        <Cloud masked height={210} opacity={0.5} style={{ left: -200, bottom: -70 }} />
        <Cloud masked height={216} opacity={0.5} flipped style={{ right: -190, bottom: -84 }} />
      </div>
      <div data-decor data-contact-clouds="near" data-local={immersive ? undefined : "0.96"} className={styles.cloudGroup} style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 240 }}>
        <Cloud masked height={180} opacity={0.62} flipped style={{ left: -120, bottom: -116 }} />
        <Cloud masked height={146} opacity={0.42} style={{ left: 96, bottom: -146 }} />
        <Cloud masked height={186} opacity={0.62} style={{ right: -104, bottom: -124 }} />
        <Cloud masked height={150} opacity={0.42} flipped style={{ right: 110, bottom: -150 }} />
      </div>
      <div data-decor data-contact-clouds="far" data-local={immersive ? undefined : "0.72"} className={styles.cloudGroup} style={{ position: "absolute", left: 0, right: 0, top: 0, height: 260 }}>
        <Cloud masked height={158} opacity={0.42} flipped style={{ left: 100, top: -34 }} />
        <Cloud masked height={150} opacity={0.4} style={{ right: 110, top: -48 }} />
        <Cloud masked height={132} opacity={0.3} flipped style={{ left: "44%", top: -70 }} />
      </div>
      </div>

      <div
        data-contact-content
        data-local={immersive ? undefined : "0.16"}
        className={styles.content}
      >
        <div
          data-contact-part="heading"
          className={styles.heading}
          style={{
            fontFamily: font.serif,
            fontWeight: 200,
            lineHeight: 1.1,
            letterSpacing: "-.022em",
            color: color.inkDeepSky,
          }}
        >
          All that scrolling, and we haven’t even met.
        </div>
        <div data-contact-part="subline" className={styles.subline} style={{ color: color.skyInk }}>
          If you need someone who can <em style={contactAccent}>build the product</em> and{" "}
          <em style={contactAccent}>understand the people</em> using it, <em style={contactAccent}>let’s talk.</em>
        </div>
        <a data-contact-part="button" className={styles.button} href={socials[2].href} style={pill.close}>
          Say hi &rarr;
        </a>
        <div
          data-contact-part="socials"
          className={styles.socials}
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
    </section>
  );
}
