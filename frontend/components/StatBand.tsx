"use client";

import { useEffect, useRef, useState } from "react";
import { color, rule, type } from "@/lib/tokens";
import { stats } from "@/lib/data";

const UNIT_SCALE: Record<string, number> = { m: 1_000_000, k: 1_000 };

/**
 * "8M+" counts to eight million, not to eight. Animating the mantissa gave
 * "1M+" a single tick, so the run is over the real magnitude and each frame is
 * abbreviated back down for display.
 */
function parse(value: string) {
  const match = value.match(/^([\d.,]+)\s*([kKmM]?)(\+?)$/);
  if (!match) return { magnitude: 0, unit: "" };
  const base = Number(match[1].replace(/,/g, ""));
  const unit = match[2].toLowerCase();
  return { magnitude: base * (UNIT_SCALE[unit] ?? 1), unit };
}

/**
 * A single million only yields eleven tenths of a step, so figures below two
 * of their own unit roll in the unit beneath: 0k to 990k, landing on "1M+".
 */
function format(current: number, magnitude: number, unit: string) {
  const scale = UNIT_SCALE[unit];
  if (!scale) return String(Math.round(current));
  if (unit === "m" && magnitude < 2 * UNIT_SCALE.m) {
    return `${Math.round(current / UNIT_SCALE.k)}k`;
  }
  return `${(current / scale).toFixed(1)}${unit === "m" ? "M" : "k"}`;
}

const DURATION = 1400;

function Stat({ value, label }: { value: string; label: string }) {
  const { magnitude, unit } = parse(value);
  // Null renders the design's own string, which is also what the server sends.
  const [running, setRunning] = useState<number | null>(null);
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
        // Landing on null restores the exact "8M+" the design specifies.
        setRunning(t < 1 ? magnitude * (1 - Math.pow(1 - t, 3)) : null);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      setRunning(0);
      raf = requestAnimationFrame(step);
    };

    run();
    window.addEventListener("scroll", run, { passive: true });
    return () => {
      window.removeEventListener("scroll", run);
      cancelAnimationFrame(raf);
    };
  }, [magnitude]);

  return (
    <div ref={ref}>
      <div style={type.numeral}>
        {running === null ? value : format(running, magnitude, unit)}
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
