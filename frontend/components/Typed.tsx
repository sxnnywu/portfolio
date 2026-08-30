import { Children, cloneElement, isValidElement, type CSSProperties, type ReactNode } from "react";

const MS_PER_CHARACTER = 85;
const MAX_DURATION = 1400;

export function typingDuration(length: number) {
  return Math.min(length * MS_PER_CHARACTER, MAX_DURATION);
}

/** Gap between the last character landing and whatever was waiting on it. */
export const SETTLE_MS = 100;

export function sequenceEnd(...lengths: number[]) {
  return lengths.reduce((total, length) => total + typingDuration(length) + SETTLE_MS, 0);
}

export function afterTyping(...lengths: number[]) {
  return { "--after-delay": `${sequenceEnd(...lengths)}ms` } as CSSProperties;
}

/**
 * Wraps every character in its own span, keeping any markup around it intact,
 * and hands each one the moment it should appear.
 */
function typeCharacters(node: ReactNode, state: { index: number }, step: number, start: number): ReactNode {
  if (typeof node === "string") {
    return [...node].map((character) => {
      const delay = start + state.index++ * step;
      return (
        <span
          key={delay}
          className="oro-ch"
          style={{ animationDelay: `${delay}ms` } as CSSProperties}
        >
          {character}
        </span>
      );
    });
  }
  if (Array.isArray(node)) {
    return Children.map(node, (child) => typeCharacters(child, state, step, start));
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return cloneElement(node, undefined, typeCharacters(node.props.children, state, step, start));
  }
  return node;
}

/**
 * Types text out one whole character at a time. Every character is in the DOM
 * from the start and only its visibility flips, so the line never reflows and
 * a centred heading cannot shift. `text` is the plain-text copy, used for the
 * timing and for the accessible name; `children` carries the styled version.
 */
export default function Typed({
  text,
  delay = 0,
  style,
  children,
}: {
  text: string;
  delay?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const length = text.length;
  const step = typingDuration(length) / length;

  return (
    <div style={{ ...style, "--type-step": `${step}ms` } as CSSProperties}>
      <span className="oro-sr-only">{text}</span>
      <span aria-hidden="true" data-typed>
        {typeCharacters(children, { index: 0 }, step, delay)}
      </span>
    </div>
  );
}
