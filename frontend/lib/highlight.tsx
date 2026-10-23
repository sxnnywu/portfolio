import { Fragment, type ReactNode } from "react";
import { color, emphasis } from "@/lib/tokens";

/** Renders {braced} metrics and phrases in blue ink, leaving the rest of the line as written. */
export function highlightMetrics(text: string): ReactNode {
  return text.split(/(\{[^}]+\})/).map((part, i) =>
    part.startsWith("{") && part.endsWith("}") ? (
      <em key={i} style={{ ...emphasis(), color: color.blueInk }}>
        {part.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
