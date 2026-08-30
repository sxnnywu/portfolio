"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { color, font } from "@/lib/tokens";
import { heroHeadline, heroTagline } from "@/lib/data";
import { sequenceEnd } from "@/components/Typed";

const ROLL_MS = 1400;

/** How long the home hero takes to type both lines and settle its call to action. */
const HERO_INTRO_MS = sequenceEnd(heroHeadline.length, heroTagline.length) + 550;

/**
 * Module scope, so it survives client-side navigation but not a reload: the
 * count waits for the hero the first time you land, and never again while you
 * move around the site.
 */
let heroIntroSeen = false;

export default function LikeButton() {
  /** The real total. Null until it loads, and while it is null the button hides. */
  const [count, setCount] = useState<number | null>(null);
  /** What is on screen, which trails behind during the opening roll. */
  const [shown, setShown] = useState<number | null>(null);
  const [pulse, setPulse] = useState(0);
  const roll = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let timer = 0;

    // Only the home hero has an intro to wait for, and only on the first landing.
    const waitFor = pathname === "/" && !heroIntroSeen ? HERO_INTRO_MS : 0;
    heroIntroSeen = true;

    fetch("/api/likes")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || typeof data.count !== "number") {
          if (!cancelled) setCount(null);
          return;
        }
        const target = data.count;

        const reveal = () => {
          if (cancelled) return;
          setCount(target);

          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setShown(target);
            return;
          }

          const begin = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - begin) / ROLL_MS, 1);
            setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
            if (t < 1) roll.current = requestAnimationFrame(step);
          };
          setShown(0);
          roll.current = requestAnimationFrame(step);
        };

        // The count is already fetched; only the reveal waits.
        if (waitFor === 0) reveal();
        else timer = window.setTimeout(reveal, waitFor);
      })
      .catch(() => {
        if (!cancelled) setCount(null);
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnimationFrame(roll.current);
    };
  }, [pathname]);

  function click() {
    if (count === null) return;
    // A click during the opening roll ends it, so the number never runs backwards.
    cancelAnimationFrame(roll.current);

    const next = count + 1;
    setCount(next);
    setShown(next);
    setPulse((n) => n + 1);

    fetch("/api/likes", { method: "POST" })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        // Trust the server's total, which also corrects for any refused click.
        if (typeof data.count === "number") {
          setCount(data.count);
          setShown(data.count);
        } else if (!ok) {
          setCount((c) => (c ?? 1) - 1);
          setShown((c) => (c ?? 1) - 1);
        }
      })
      .catch(() => {
        setCount((c) => (c ?? 1) - 1);
        setShown((c) => (c ?? 1) - 1);
      });
  }

  if (count === null || shown === null) return null;

  return (
    <button
      type="button"
      onClick={click}
      aria-label={`Like this site. ${count} clicks so far`}
      data-like-button
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 18,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "9px 18px",
        borderRadius: 999,
        border: "1px solid rgba(42,42,36,.12)",
        background: "rgba(255,255,255,.9)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: color.inkDeepSky,
        fontFamily: font.sans,
        fontSize: 13,
        cursor: "pointer",
        boxShadow: "0 4px 14px -6px rgba(17,40,58,.35)",
        transition: "transform .25s ease, box-shadow .25s ease",
      }}
    >
      {/* Re-keyed on every click so the beat restarts even on rapid clicking. */}
      <svg key={pulse} data-like-heart width="15" height="15" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 20.7 4.3 13a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l1.2 1.2 1.2-1.2a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5z"
          fill={color.blueInk}
          stroke={color.blueInk}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
      {shown.toLocaleString()}
    </button>
  );
}
