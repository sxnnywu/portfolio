import type { CSSProperties } from "react";

export const color = {
  paper: "#fdfaf1",
  ink: "#1a1a15",
  inkDeepSky: "#11283a",
  body: "#3d3a32",
  bodyAlt: "#4a463c",
  muted: "#8a8375",
  mutedLight: "#a8a094",
  blueInk: "#2635a8",
  skyInk: "#2b5170",
  skyInkLight: "#4a6a82",
  gold: "#c49d3a",
  goldInk: "#96762a",
} as const;

export const rule = {
  hairline: "rgba(42,42,36,.16)",
  hairlineLight: "rgba(42,42,36,.13)",
  statBand: "rgba(42,42,36,.18)",
} as const;

/** Sky-tint panel fill; alpha comes from the design's .10/.12/.16/.22/.28 scale. */
export const skyTint = (alpha: number) => `rgba(168,200,228,${alpha})`;

export const gradient = {
  heroSky:
    "linear-gradient(179deg,#a8cce9 0%,#c5dcee 24%,#dbe7f1 48%,#f2f2ec 72%,#fdfaf1 88%,#fdfaf1 100%)",
  bandSky:
    "linear-gradient(179deg,#a8cce9 0%,#c2daed 30%,#dde9f2 58%,#f2f2ec 80%,#fdfaf1 94%,#fdfaf1 100%)",
  contact: "linear-gradient(179deg,#fdfaf1 0%,#e9f1f7 42%,#cfe0ee 100%)",
} as const;

export const font = {
  serif: "var(--font-newsreader), serif",
  sans: "var(--font-schibsted), sans-serif",
  script: "var(--font-caveat), cursive",
} as const;

export const layout = {
  maxWidth: 1080,
  gutter: "6vw",
} as const;

export const type = {
  heroDisplay: {
    fontFamily: font.serif,
    fontWeight: 200,
    fontSize: "clamp(56px,7vw,104px)",
    lineHeight: 1.08,
    letterSpacing: "-.024em",
    color: color.inkDeepSky,
  },
  pageTitle: {
    fontFamily: font.serif,
    fontWeight: 200,
    fontSize: "clamp(46px,6vw,84px)",
    lineHeight: 1.05,
    letterSpacing: "-.024em",
    color: color.inkDeepSky,
  },
  sectionTitle: {
    fontFamily: font.serif,
    fontWeight: 300,
    fontSize: "clamp(26px,3vw,38px)",
    color: color.inkDeepSky,
  },
  numeral: {
    fontFamily: font.serif,
    fontWeight: 200,
    fontSize: "clamp(38px,4vw,52px)",
    lineHeight: 1,
    color: color.blueInk,
  },
  metaLabel: {
    fontFamily: font.serif,
    fontSize: 11,
    letterSpacing: ".26em",
    textTransform: "uppercase",
  },
} satisfies Record<string, CSSProperties>;

/** Serif-italic emphasis inside a sans line. */
export const emphasis = (size = 1.14): CSSProperties => ({
  fontFamily: font.serif,
  fontStyle: "italic",
  fontSize: `${size}em`,
});

export const pill = {
  hero: {
    display: "inline-block",
    padding: "14px 30px",
    borderRadius: 999,
    background: "rgba(255,255,255,.88)",
    color: color.inkDeepSky,
    fontSize: 13.5,
    boxShadow: "0 4px 12px -6px rgba(17,40,58,.28)",
  },
  close: {
    display: "inline-block",
    padding: "14px 30px",
    borderRadius: 999,
    background: color.inkDeepSky,
    color: "#f6fafd",
    fontSize: 13.5,
  },
} satisfies Record<string, CSSProperties>;
