/** The original grain, displacement and shadow are baked into a transparent texture. */
export default function Sun({ size = 116 }: { size?: number }) {
  return (
    <div
      data-sun
      style={{
        width: size,
        height: size,
        position: "relative",
        cursor: "pointer",
        pointerEvents: "auto",
        touchAction: "none",
        transition: "transform .5s cubic-bezier(.34,1.4,.5,1)",
      }}
    >
      {/* Keep the SVG wrapper used by the sun's click/drag interactions. */}
      <svg viewBox="0 0 240 240" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-hidden>
        <image href="/assets/decor/sun.webp" x={-48} y={-48} width={336} height={336} />
      </svg>
    </div>
  );
}
