"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { heroRoles } from "@/lib/data";
import { startHeroPlayback } from "@/lib/heroPlayback";
import { color } from "@/lib/tokens";

export default function HeroRoles({ delay }: { delay: number }) {
  const [rotation, setRotation] = useState<{ current: number; previous: number | null }>({
    current: 0,
    previous: null,
  });
  const mountedAt = useRef<number | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    mountedAt.current ??= performance.now();
    return startHeroPlayback({
      element: root.current,
      delay,
      mountedAt: mountedAt.current,
      advance() {
        setRotation(({ current }) => ({ current: (current + 1) % heroRoles.length, previous: current }));
      },
    });
  }, [delay]);

  return (
    <div
      ref={root}
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
