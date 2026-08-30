"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives both parallax systems from one throttled scroll handler.
 * data-speed layers translate against absolute page scroll; data-local layers
 * translate against how far their [data-scene] has entered the viewport.
 * Offsets stay in the DOM rather than React state so scrolling cannot re-render.
 */
export default function ParallaxRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const layers = [...document.querySelectorAll<HTMLElement>("[data-speed]")].map(
      (el) => ({
        el,
        speed: parseFloat(el.dataset.speed!),
        fade: el.dataset.fade === "1",
      }),
    );
    const locals = [...document.querySelectorAll<HTMLElement>("[data-local]")].map(
      (el) => ({
        el,
        speed: parseFloat(el.dataset.local!),
        scene: (el.closest("[data-scene]") ?? el.parentElement) as HTMLElement,
      }),
    );

    const reset = () => {
      for (const { el } of layers) {
        el.style.transform = "";
        el.style.opacity = "";
      }
      for (const { el } of locals) el.style.transform = "";
    };

    let raf: number | null = null;
    const apply = () => {
      raf = null;
      const y = window.scrollY;
      const vh = window.innerHeight || 800;
      const fadeSpan = vh * (pathname === "/" ? 0.62 : 0.42);
      for (const { el, speed, fade } of layers) {
        el.style.transform = `translate3d(0, ${(-y * speed).toFixed(1)}px, 0)`;
        if (fade) el.style.opacity = Math.max(0, 1 - y / fadeSpan).toFixed(3);
      }
      for (const { el, speed, scene } of locals) {
        const progress = vh - scene.getBoundingClientRect().top;
        el.style.transform = `translate3d(0, ${(-progress * speed * 0.5).toFixed(1)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(apply);
    };

    const sync = () => {
      if (reduced.matches) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (raf !== null) cancelAnimationFrame(raf);
        raf = null;
        reset();
        return;
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      apply();
    };

    sync();
    reduced.addEventListener("change", sync);

    return () => {
      reduced.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
