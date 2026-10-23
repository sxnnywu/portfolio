"use client";

import { useEffect, useRef } from "react";

/**
 * A wash of colour that spreads from wherever the cursor entered the card.
 * Listens on the parent so the layer itself can stay pointer-transparent, and
 * writes the position straight to CSS variables rather than through state,
 * which would re-render the row on every mouse move.
 */
export default function Bloom({ color }: { color: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const card = el?.parentElement;
    if (!el || !card) return;

    const track = (event: MouseEvent) => {
      const box = card.getBoundingClientRect();
      // Journey rows can sit inside a scaled camera; CSS uses local pixels.
      const x = (event.clientX - box.left) * card.offsetWidth / Math.max(1, box.width);
      const y = (event.clientY - box.top) * card.offsetHeight / Math.max(1, box.height);
      el.style.setProperty("--bx", `${x}px`);
      el.style.setProperty("--by", `${y}px`);
    };

    card.addEventListener("mouseenter", track);
    card.addEventListener("mousemove", track);
    return () => {
      card.removeEventListener("mouseenter", track);
      card.removeEventListener("mousemove", track);
    };
  }, []);

  return <span data-bloom ref={ref} style={{ ["--bloom" as string]: color }} />;
}
