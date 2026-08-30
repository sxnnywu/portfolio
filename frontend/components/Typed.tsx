import type { CSSProperties, ReactNode } from "react";

const MS_PER_CHARACTER = 55;
const MAX_DURATION = 1200;

/**
 * Reveals text a character at a time by stepping a clip, so the element keeps
 * its final size throughout. Typing by appending to the DOM would shift a
 * centred line on every character and leave the hero empty on first paint.
 */
export default function Typed({
  length,
  delay = 0,
  style,
  children,
}: {
  length: number;
  delay?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const duration = Math.min(length * MS_PER_CHARACTER, MAX_DURATION);
  return (
    <div
      data-typed
      style={
        {
          ...style,
          "--type-steps": length,
          "--type-duration": `${duration}ms`,
          "--type-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
