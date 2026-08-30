/** Small square mark set beside a name; the name itself carries the meaning. */
export default function Logo({ src, size = 18 }: { src: string; size?: number }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        flex: "none",
        borderRadius: 4,
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}
