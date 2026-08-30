"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades [data-reveal] elements up as they enter view.
 * Driven by scroll position rather than IntersectionObserver so the first
 * screenful reveals synchronously on mount and nothing can stay stranded
 * hidden if an observer callback never arrives.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = new Set(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );
    if (targets.size === 0) return;

    const revealAll = () => {
      for (const el of targets) el.classList.add("is-visible");
      targets.clear();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return;
    }

    const check = () => {
      const limit = window.innerHeight * 0.92;
      for (const el of [...targets]) {
        if (el.getBoundingClientRect().top >= limit) continue;
        // Siblings cascade rather than landing all at once.
        const siblings = [...(el.parentElement?.children ?? [])].filter((n) =>
          (n as HTMLElement).hasAttribute("data-reveal"),
        );
        el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 6) * 60}ms`;
        el.classList.add("is-visible");
        targets.delete(el);
      }
      if (targets.size === 0) stop();
    };

    const stop = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return stop;
  }, [pathname]);

  return null;
}
