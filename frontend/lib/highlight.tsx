import { Fragment, type ReactNode } from "react";
import { color } from "@/lib/tokens";

/** Renders {braced} figures in blue ink, leaving the rest of the line as written. */
export function highlightMetrics(text: string): ReactNode {
  return text.split(/(\{[^}]+\})/).map((part, i) =>
    part.startsWith("{") && part.endsWith("}") ? (
      <span key={i} style={{ color: color.blueInk }}>
        {part.slice(1, -1)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
