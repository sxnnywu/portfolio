"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { heroRoles } from "@/lib/data";
import { color } from "@/lib/tokens";

const HOLD_MS = 3000;
const REVEAL_MS = 550;

export default function HeroRoles({ delay }: { delay: number }) {
  const [rotation, setRotation] = useState<{ current: number; previous: number | null }>({
    current: 0,
    previous: null,
  });
  const mountedAt = useRef<number | null>(null);

  useEffect(() => {
    mountedAt.current ??= performance.now();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer = 0;

    function advance() {
      setRotation(({ current }) => ({ current: (current + 1) % heroRoles.length, previous: current }));
      timer = window.setTimeout(advance, HOLD_MS);
    }

    function syncPlayback() {
      window.clearTimeout(timer);
      if (motion.matches || document.hidden) return;

      // Give the first phrase its full reading time after the intro fades in.
      const remainingIntro = Math.max(0, (mountedAt.current ?? 0) + delay + REVEAL_MS - performance.now());
      timer = window.setTimeout(advance, remainingIntro + HOLD_MS);
    }

    syncPlayback();
    motion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      window.clearTimeout(timer);
      motion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [delay]);

  return (
    <div
      data-hero-roles
      data-after-type
      style={{
        "--after-delay": `${delay}ms`,
        marginTop: 12,
        fontSize: "clamp(16px,1.35vw,18px)",
        lineHeight: 1.5,
        color: color.skyInkLight,
      } as CSSProperties}
    >
      {/* Read the complete identity once, without announcing every rotation. */}
      <span className="oro-sr-only">Also {heroRoles.join(", ")}.</span>
      <span
        aria-hidden="true"
        style={{ display: "inline-grid", justifyItems: "center", gap: 3, verticalAlign: "top" }}
      >
        <span data-hero-role-prefix style={{ fontSize: 13, lineHeight: 1.4 }}>also...</span>
        <span
          data-hero-role-track
          style={{
            display: "inline-grid",
            justifyItems: "center",
            textAlign: "center",
            whiteSpace: "nowrap",
            color: color.blueInk,
          }}
        >
          {heroRoles.map((role, index) => (
            <span
              key={role}
              data-hero-role
              data-active={index === rotation.current}
              data-state={index === rotation.current ? "in" : index === rotation.previous ? "out" : "wait"}
            >
              {role}
            </span>
          ))}
        </span>
      </span>
    </div>
  );
}
