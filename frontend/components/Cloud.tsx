import type { CSSProperties } from "react";

/** Hides the PNG's flat bottom crop; must sit on the img itself, not a wrapper. */
const bottomMask =
  "linear-gradient(to bottom,#000 0%,#000 58%,rgba(0,0,0,.5) 82%,transparent 100%)";

export type CloudProps = {
  height: number;
  opacity: number;
  flipped?: boolean;
  masked?: boolean;
  style: CSSProperties;
};

export default function Cloud({
  height,
  opacity,
  flipped = false,
  masked = false,
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
          ? { WebkitMaskImage: bottomMask, maskImage: bottomMask }
          : null),
        ...style,
      }}
    />
  );
}
