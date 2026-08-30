"use client";

import { useEffect, useRef, useState } from "react";
import { color, rule, type } from "@/lib/tokens";
import { stats } from "@/lib/data";

/** Splits "8M+" into 8 and "M+" so only the figure animates. */
function parse(value: string) {
  const match = value.match(/^([\d.,]+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1].replace(/,/g, "")), suffix: match[2] };
}

const DURATION = 1100;

function Stat({ value, label }: { value: string; label: string }) {
  const { target, suffix } = parse(value);
  // Renders the final figure first so the server and client markup agree.
  const [shown, setShown] = useState(target);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;

    const run = () => {
      const box = el.getBoundingClientRect();
      if (started || box.top >= window.innerHeight * 0.85) return;
      started = true;
      window.removeEventListener("scroll", run);
      const begin = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - begin) / DURATION, 1);
        setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      setShown(0);
      raf = requestAnimationFrame(step);
    };

    run();
    window.addEventListener("scroll", run, { passive: true });
    return () => {
      window.removeEventListener("scroll", run);
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <div ref={ref}>
      <div style={type.numeral}>
        {shown}
        {suffix}
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: color.muted }}>{label}</div>
    </div>
  );
}

export default function StatBand() {
  return (
    <div
      data-stat-band
      data-reveal
      style={{
        marginTop: 76,
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 26,
        padding: "34px 0",
        borderTop: `1px solid ${rule.statBand}`,
        borderBottom: `1px solid ${rule.statBand}`,
      }}
    >
      {stats.map((stat) => (
        <Stat key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
}
