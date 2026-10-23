/** A bounded, interruptible glide for the long subpages. */
export function scrollToContact(target: HTMLElement, headerOffset: number): () => void {
  const from = window.scrollY;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const to = Math.min(maxScroll, Math.max(0, target.getBoundingClientRect().top + from - headerOffset));
  const distance = to - from;
  let frame = 0;

  const cancel = () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("pointerdown", cancel);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("popstate", cancel);
    window.removeEventListener("resize", cancel);
  };
  const finish = () => {
    cancel();
    target.focus({ preventScroll: true });
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Escape", "Tab"].includes(event.key)) cancel();
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(distance) < 2) {
    window.scrollTo({ top: to, behavior: "instant" });
    finish();
    return cancel;
  }

  // Long pages take at most 1.2 seconds; shorter trips still have room to settle.
  const duration = Math.min(1200, 650 + Math.abs(distance) * 0.08);
  const started = performance.now();
  const step = (now: number) => {
    const progress = Math.min(1, (now - started) / duration);
    const eased = progress < 0.5
      ? 4 * progress ** 3
      : 1 - (-2 * progress + 2) ** 3 / 2;
    // Each frame sets the native scroll position, which also drives the clouds.
    window.scrollTo({ top: from + distance * eased, behavior: "instant" });
    if (progress < 1) frame = window.requestAnimationFrame(step);
    else finish();
  };

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("pointerdown", cancel, { passive: true });
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("popstate", cancel);
  window.addEventListener("resize", cancel);
  frame = window.requestAnimationFrame(step);
  return cancel;
}
