const BODY_PATH =
  "M121 64c20-1 39 12 47 30 8 17 6 39-5 54-11 16-31 25-50 22-19-2-36-16-42-34-6-17-2-38 11-51 10-11 25-20 39-21z";

const SCRATCHES = [
  { d: "M96 148c14-19 30-35 48-48", width: 3.4, opacity: 1 },
  { d: "M104 158c12-14 25-27 39-37", width: 2.6, opacity: 0.7 },
  { d: "M92 126c10-14 22-26 36-35", width: 2.2, opacity: 0.6 },
  { d: "M120 156c9-11 19-20 30-27", width: 2.8, opacity: 0.5 },
  { d: "M86 138c6-9 13-17 21-24", width: 2, opacity: 0.45 },
  { d: "M138 150c6-6 12-12 17-19", width: 2.2, opacity: 0.4 },
];

const RAYS = [
  "M120.0 44.0L120.0 -2.0",
  "M160.6 63.0L182.1 40.6",
  "M183.1 100.4L228.3 92.4",
  "M190.3 155.2L232.2 174.0",
  "M155.9 186.7L172.0 220.1",
  "M116.1 195.0L112.1 244.0",
  "M76.4 183.6L52.2 216.4",
  "M48.9 148.6L4.0 158.6",
  "M43.6 96.2L2.4 82.0",
  "M78.4 62.6L57.9 37.5",
  "M97.7 47.6L83.6 5.7",
  "M143.0 51.0L160.0 20.0",
];

/** Grain and wobble filter; rendered once and referenced by the sun group. */
export function SunFilterDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <filter id="sunTex" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.28"
            numOctaves="5"
            seed="11"
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, .6 .35 .25 0 -.32"
            result="g"
          />
          <feComposite in="SourceGraphic" in2="g" operator="out" result="sp" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="3"
            seed="4"
            result="t"
          />
          <feDisplacementMap
            in="sp"
            in2="t"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default function Sun({ size = 116 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }}>
      <svg viewBox="0 0 240 240" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-hidden>
        <g filter="url(#sunTex)">
          <path d={BODY_PATH} fill="#f7b500" />
          <path d={BODY_PATH} fill="none" stroke="#e09600" strokeWidth={5} opacity={0.5} />
          <g stroke="#ffe98a" strokeLinecap="round" fill="none" opacity={0.6}>
            {SCRATCHES.map((s) => (
              <path key={s.d} d={s.d} strokeWidth={s.width} opacity={s.opacity} />
            ))}
          </g>
          <g stroke="#f7b500" strokeWidth={6.5} strokeLinecap="round" fill="none">
            {RAYS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
