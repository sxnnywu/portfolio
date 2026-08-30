import type { CSSProperties } from "react";

/** Hides the PNG's flat crop; must sit on the img itself, not a wrapper. */
const MASKS = {
  bottom: "linear-gradient(to bottom,#000 0%,#000 58%,rgba(0,0,0,.5) 82%,transparent 100%)",
  /** For clouds inside a clipped panel, which can be cut at either end. */
  both: "linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.5) 16%,#000 40%,#000 58%,rgba(0,0,0,.5) 82%,transparent 100%)",
} as const;

export type CloudProps = {
  height: number;
  opacity: number;
  flipped?: boolean;
  masked?: boolean;
  /** Fade both ends when the container clips top and bottom. */
  fade?: keyof typeof MASKS;
  style: CSSProperties;
};

export default function Cloud({
  height,
  opacity,
  flipped = false,
  masked = false,
  fade = "bottom",
  style,
}: CloudProps) {
  return (
    <img
      src="/assets/cloud-watercolour.png"
      alt=""
      aria-hidden
      style={{
        position: "absolute",
        height,
        opacity,
        ...(flipped ? { transform: "scaleX(-1)" } : null),
        ...(masked
          ? { WebkitMaskImage: MASKS[fade], maskImage: MASKS[fade] }
          : null),
        ...style,
      }}
    />
  );
}
