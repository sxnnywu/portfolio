import type { CSSProperties, ReactNode } from "react";

const MS_PER_CHARACTER = 85;
const MAX_DURATION = 1100;

/** Shared so whatever waits on the typing cannot drift out of sync with it. */
export function typingDuration(length: number) {
  return Math.min(length * MS_PER_CHARACTER, MAX_DURATION);
}

/** Gap between the last character landing and the rest of the hero arriving. */
export const SETTLE_MS = 100;

/** Total time for a run of titles typed one after another. */
export function sequenceEnd(...lengths: number[]) {
  return lengths.reduce((total, length) => total + typingDuration(length) + SETTLE_MS, 0);
}

/** Style that holds an element back until the given sequence has finished. */
export function afterTyping(...lengths: number[]) {
  return { "--after-delay": `${sequenceEnd(...lengths)}ms` } as CSSProperties;
}

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
  const duration = typingDuration(length);
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
