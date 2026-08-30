import type { ReactNode } from "react";
import Cloud from "@/components/Cloud";
import Typed from "@/components/Typed";
import { color, font, gradient, type } from "@/lib/tokens";

/** The watercolour strip every inner page opens with. */
export default function SkyBand({
  title,
  subline,
}: {
  title: string;
  subline: ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        height: "42vh",
        minHeight: 340,
        overflow: "hidden",
        background: gradient.bandSky,
      }}
    >
      <div data-decor data-speed="0.28" style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <Cloud masked height={140} opacity={0.36} style={{ left: -160, top: -20 }} />
        <Cloud masked height={108} opacity={0.24} flipped style={{ right: 110, top: -44 }} />
      </div>
      <div data-decor data-speed="0.58" style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <Cloud masked height={176} opacity={0.62} style={{ left: -190, top: 70 }} />
        <Cloud masked height={186} opacity={0.6} flipped style={{ right: -180, top: 96 }} />
      </div>
      <div
        data-decor
        data-speed="0.92"
        style={{ position: "absolute", left: 0, right: 0, bottom: 20, height: 200, willChange: "transform" }}
      >
        <Cloud masked height={200} opacity={0.94} style={{ left: -200, bottom: -30 }} />
        <Cloud masked height={166} opacity={0.88} flipped style={{ left: 120, bottom: -64 }} />
        <Cloud masked height={194} opacity={0.92} style={{ left: 400, bottom: -34 }} />
        <Cloud masked height={198} opacity={0.94} flipped style={{ right: -180, bottom: -26 }} />
      </div>
      <div
        data-speed="0.4"
        data-fade="1"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "44%",
          textAlign: "center",
          padding: "0 6vw",
          willChange: "transform, opacity",
        }}
      >
        <Typed length={title.length} style={type.pageTitle}>
          {title}
        </Typed>
        <div
          style={{
            marginTop: 14,
            fontFamily: font.sans,
            fontSize: "clamp(15px,1.4vw,17px)",
            color: color.skyInk,
          }}
        >
          {subline}
        </div>
      </div>
    </div>
  );
}
