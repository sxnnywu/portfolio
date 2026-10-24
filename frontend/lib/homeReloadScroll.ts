// Run directly in <head>: waiting for hydration lets mobile scroll restoration
// paint a later chapter first. Only a full homepage reload restarts the story.
export const HOME_RELOAD_SCROLL_SCRIPT = String.raw`(function () {
  var navigation = performance.getEntriesByType("navigation")[0];
  if (location.pathname !== "/" || !navigation || navigation.type !== "reload") return;
  if (location.hash && location.hash !== "#work" && location.hash !== "#contact") return;

  var previous = history.scrollRestoration;
  history.scrollRestoration = "manual";
  // Header links leave these fragments in the address bar. Refresh restarts;
  // following a fresh deep link still uses the story's existing hash handler.
  if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
  var finished = false;
  var frame = 0;
  var cancelEvents = ["pointerdown", "touchstart", "wheel", "keydown", "popstate", "hashchange", "pagehide"];

  function cleanup() {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(frame);
    window.removeEventListener("pageshow", settle);
    cancelEvents.forEach(function (name) { window.removeEventListener(name, cleanup); });
    if (history.scrollRestoration === "manual") history.scrollRestoration = previous;
  }
  function reset() {
    if (!finished && location.pathname === "/" && !location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }
  function settle(event) {
    if (event && event.persisted) return cleanup();
    frame = requestAnimationFrame(function () { reset(); cleanup(); });
  }

  cancelEvents.forEach(function (name) { window.addEventListener(name, cleanup, { passive: true }); });
  window.addEventListener("pageshow", settle, { once: true });
  reset();
  if (document.readyState === "complete") settle();
})();`;
