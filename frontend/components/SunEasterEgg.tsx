"use client";

import { useEffect } from "react";

const NOTES = [
  "hey :)",
  "hi again",
  "ok you're curious",
  "that tickles!",
  "ok we're friends now",
  "try double clicking me",
  "my work is down there",
  "go read my story",
  "rise and grind",
  "this button does nothing",
  "hope your day's good",
  "drink some water",
  "you should get in touch at this point",
  "try dragging me down",
  "thanks for staying this long :)",
];

const SUNSET =
  "linear-gradient(179deg,#f6c777 0%,#f2a86e 28%,#e88f7a 52%,#f3cdb6 78%,#fdfaf1 94%,#fdfaf1 100%)";

const STORAGE_KEY = "sunny-golden-hour";
const BURST_MS = 520;
const FACE_MS = 1500;
const NUDGE_MS = 430;
const NOTE_FADE_MS = 2800;
const NOTE_REMOVE_MS = 3400;
const COMMIT_ABOVE = 0.45;
const DRAG_SLOP = 5;

/** Click for a note, double click to wink, drag down for golden hour. */
export default function SunEasterEgg() {
  useEffect(() => {
    const sun = document.querySelector<HTMLElement>("[data-sun]");
    const sky = document.querySelector<HTMLElement>("[data-sky]");
    if (!sun || !sky) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const art = sun.querySelector<SVGSVGElement>("svg");
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    // First child, so the clouds still paint over the sunset.
    const overlay = document.createElement("div");
    overlay.style.cssText = `position:absolute; inset:0; opacity:0; pointer-events:none; background:${SUNSET};`;
    sky.insertBefore(overlay, sky.firstChild);

    // A low sun sits under the clouds and the hero copy, which would swallow the drag.
    const clouds = [...sky.querySelectorAll<HTMLImageElement>("img")];
    clouds.forEach((im) => {
      im.style.pointerEvents = "none";
    });
    const copy = sky.querySelector<HTMLElement>("[data-fade]");
    const copyLinks = copy ? [...copy.querySelectorAll("a")] : [];
    if (copy) {
      copy.style.pointerEvents = "none";
      copyLinks.forEach((a) => {
        a.style.pointerEvents = "auto";
      });
    }
    const layer = sun.parentElement;
    if (layer) layer.style.zIndex = "6";
    sun.style.zIndex = "7";

    if (art) {
      art.style.transition = reduce
        ? "none"
        : "transform .5s cubic-bezier(.34,1.4,.5,1), opacity .5s ease";
    }

    const span = () => Math.max(260, sky.offsetHeight * 0.62);

    let golden = 0;
    let live = 0;
    let dragging = false;
    let moved = false;
    let startY = 0;
    let startX = 0;
    let noteIndex = 0;
    let burst = 0;
    let burstTimer = 0;

    const paint = (p: number, animate: boolean) => {
      const t = animate && !reduce ? ".7s" : "0s";
      overlay.style.transition = `opacity ${t} ease`;
      overlay.style.opacity = p.toFixed(3);
      sun.style.transition = `transform ${t} cubic-bezier(.34,1.2,.5,1), filter .5s ease`;
      sun.style.transform = `translateY(${(p * span()).toFixed(1)}px) scale(${(1 + p * 0.1).toFixed(3)})`;
      // Dim the art, never the wrapper, because the note lives in the wrapper.
      if (art) art.style.opacity = (1 - p * 0.28).toFixed(3);
      sun.style.filter =
        p > 0.04
          ? `saturate(${(1 + p * 0.34).toFixed(2)}) hue-rotate(${(-16 * p).toFixed(1)}deg)`
          : "none";
      clouds.forEach((im) => {
        im.style.transition = `filter ${t} ease`;
        im.style.filter =
          p > 0.04
            ? `sepia(${(0.42 * p).toFixed(2)}) saturate(${(1 + 0.5 * p).toFixed(2)}) hue-rotate(${(-20 * p).toFixed(1)}deg)`
            : "none";
      });
    };

    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        golden = 1;
        live = 1;
        paint(1, false);
      }
    } catch {
      // Storage blocked; golden hour simply does not persist.
    }

    const clearNote = () => sun.querySelector("[data-sun-note]")?.remove();

    const nudge = (transform: string) => {
      if (!art || reduce) return;
      art.style.transform = transform;
      later(() => {
        art.style.transform = "none";
      }, NUDGE_MS);
    };

    const facePart = (attr: string) => {
      const part = document.createElement("div");
      part.setAttribute(attr, "");
      return part;
    };

    const wink = () => {
      clearNote();
      if (sun.querySelector("[data-sun-face]")) return;
      const face = document.createElement("div");
      face.setAttribute("data-sun-face", "");
      face.append(facePart("data-sun-eye"), facePart("data-sun-wink"), facePart("data-sun-smile"));
      sun.appendChild(face);
      if (art && !reduce) art.style.transform = "rotate(-9deg) scale(1.07)";
      later(() => {
        face.remove();
        if (art && !reduce) art.style.transform = "none";
      }, FACE_MS);
    };

    const onClick = () => {
      // A drag must not also fire a note.
      if (moved) {
        moved = false;
        return;
      }
      burst += 1;
      window.clearTimeout(burstTimer);
      burstTimer = window.setTimeout(() => {
        burst = 0;
      }, BURST_MS);
      if (burst >= 2) {
        wink();
        return;
      }
      clearNote();
      const note = document.createElement("div");
      note.setAttribute("data-sun-note", "");
      note.textContent = NOTES[noteIndex % NOTES.length];
      noteIndex += 1;
      sun.appendChild(note);
      nudge("rotate(7deg) scale(1.06)");
      later(() => {
        note.style.transition = "opacity .5s ease";
        note.style.opacity = "0";
      }, NOTE_FADE_MS);
      later(() => note.remove(), NOTE_REMOVE_MS);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      live = golden;
      startY = e.clientY;
      startX = e.clientX;
      clearNote();
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dy = e.clientY - startY;
      if (Math.abs(dy) > DRAG_SLOP || Math.abs(e.clientX - startX) > DRAG_SLOP) moved = true;
      live = Math.max(0, Math.min(1, golden + dy / span()));
      paint(live, false);
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      golden = live > COMMIT_ABOVE ? 1 : 0;
      paint(golden, true);
      try {
        localStorage.setItem(STORAGE_KEY, golden ? "1" : "0");
      } catch {
        // Storage blocked; golden hour simply does not persist.
      }
    };

    sun.addEventListener("click", onClick);
    sun.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      sun.removeEventListener("click", onClick);
      sun.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      timers.forEach(window.clearTimeout);
      window.clearTimeout(burstTimer);
      overlay.remove();
      clearNote();
      sun.querySelector("[data-sun-face]")?.remove();
      // Only the properties this effect set, so React's own inline styles survive.
      ["z-index", "transform", "filter", "transition"].forEach((k) =>
        sun.style.removeProperty(k),
      );
      ["transition", "transform", "opacity"].forEach((k) => art?.style.removeProperty(k));
      if (layer) layer.style.removeProperty("z-index");
      if (copy) copy.style.removeProperty("pointer-events");
      copyLinks.forEach((a) => a.style.removeProperty("pointer-events"));
      clouds.forEach((im) => {
        im.style.removeProperty("pointer-events");
        im.style.removeProperty("filter");
        im.style.removeProperty("transition");
      });
    };
  }, []);

  return null;
}
