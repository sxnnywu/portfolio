"use client";

import { useEffect, useState } from "react";
import { color, font } from "@/lib/tokens";

const LIKED_KEY = "sunny-liked";

export default function LikeButton() {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Both reads resolve together, after the effect body, so neither cascades a render.
    fetch("/api/likes")
      .then((res) => res.json())
      .then((data) => {
        setCount(typeof data.count === "number" ? data.count : null);
        try {
          setLiked(localStorage.getItem(LIKED_KEY) === "1");
        } catch {
          // Private mode can throw on access; the button still works, it just forgets.
        }
      })
      .catch(() => setCount(null));
  }, []);

  async function toggle() {
    if (count === null || busy) return;
    const adding = !liked;
    setBusy(true);
    setLiked(adding);
    setCount((current) => (current ?? 0) + (adding ? 1 : -1));
    try {
      if (adding) localStorage.setItem(LIKED_KEY, "1");
      else localStorage.removeItem(LIKED_KEY);
    } catch {}

    // Undoes the optimistic like. A rejected write still resolves the fetch, so
    // this has to run on any non-ok response, not only on a thrown error.
    const undo = (serverCount?: number) => {
      setCount((current) => serverCount ?? (current ?? 1) + (adding ? -1 : 1));
      setLiked(!adding);
      try {
        if (adding) localStorage.removeItem(LIKED_KEY);
        else localStorage.setItem(LIKED_KEY, "1");
      } catch {}
    };

    try {
      const res = await fetch("/api/likes", { method: adding ? "POST" : "DELETE" });
      const data = await res.json().catch(() => ({}));
      const serverCount = typeof data.count === "number" ? data.count : undefined;
      if (!res.ok) {
        undo(serverCount);
        return;
      }
      if (serverCount !== undefined) setCount(serverCount);
    } catch {
      undo();
    } finally {
      setBusy(false);
    }
  }

  // Nothing to show until the count loads, so the pill never flashes an empty state.
  if (count === null) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={liked}
      aria-label={liked ? `You liked this. ${count} likes. Click to undo` : `Like this site. ${count} likes so far`}
      data-like-button
      style={{
        // Bottom-right rather than centred: the hero's "Scroll" cue owns the centre.
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
      <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 20.7 4.3 13a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l1.2 1.2 1.2-1.2a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5z"
          fill={liked ? color.blueInk : "none"}
          stroke={color.blueInk}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
      {count.toLocaleString()}
    </button>
  );
}
