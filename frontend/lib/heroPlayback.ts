const HOLD_MS = 3000;
const REVEAL_MS = 550;

/** Keep the hero's timer dormant whenever its text cannot be seen. */
export function startHeroPlayback({
  element,
  delay,
  mountedAt,
  advance,
}: {
  element: HTMLElement;
  delay: number;
  mountedAt: number;
  advance: () => void;
}) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hero = element.closest<HTMLElement>("[data-story-hero]");
  let inViewport = true;
  let playing = false;
  let disposed = false;
  let timer = 0;

  function canPlay() {
    return !disposed && !motion.matches && !document.hidden && inViewport
      && hero?.getAttribute("aria-hidden") !== "true";
  }

  function tick() {
    if (!canPlay()) {
      syncPlayback();
      return;
    }
    advance();
    timer = window.setTimeout(tick, HOLD_MS);
  }

  function syncPlayback() {
    const next = canPlay();
    if (next === playing) return;
    playing = next;
    window.clearTimeout(timer);
    if (!playing) return;

    // Give the first phrase its full reading time after the intro fades in.
    const remainingIntro = Math.max(0, mountedAt + delay + REVEAL_MS - performance.now());
    timer = window.setTimeout(tick, remainingIntro + HOLD_MS);
  }

  const intersection = new IntersectionObserver(([entry]) => {
    if (!entry) return;
    inViewport = entry.isIntersecting;
    syncPlayback();
  });
  intersection.observe(element);

  // The story fades the hero before it leaves the viewport. Its controller
  // already changes aria-hidden once at that boundary, so no scroll work is needed.
  const visibility = hero ? new MutationObserver(syncPlayback) : null;
  if (hero) visibility?.observe(hero, { attributes: true, attributeFilter: ["aria-hidden"] });

  motion.addEventListener("change", syncPlayback);
  document.addEventListener("visibilitychange", syncPlayback);
  syncPlayback();

  return () => {
    disposed = true;
    playing = false;
    window.clearTimeout(timer);
    intersection.disconnect();
    visibility?.disconnect();
    motion.removeEventListener("change", syncPlayback);
    document.removeEventListener("visibilitychange", syncPlayback);
  };
}
