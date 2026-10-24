import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { HOME_RELOAD_SCROLL_SCRIPT } from "./homeReloadScroll.ts";

function fixture({
  url = "https://www.sunny-wu.ca/",
  navigationType = "reload",
  readyState = "loading",
  restoration = "auto",
} = {}) {
  const location = new URL(url);
  const listeners = new Map();
  const frames = new Map();
  const scrolls = [];
  const restorationWrites = [];
  const replacements = [];
  const state = { __NA: true, __PRIVATE_NEXTJS_INTERNALS_TREE: { tree: ["", {}] }, custom: "keep" };
  let scrollY = 19000;
  let nextFrame = 1;
  let currentRestoration = restoration;
  const history = {
    state,
    get scrollRestoration() { return currentRestoration; },
    set scrollRestoration(value) {
      currentRestoration = value;
      restorationWrites.push(value);
    },
    replaceState(data, title, target) {
      replacements.push({ data, title, target });
      this.state = data;
      location.href = new URL(target, location.href).href;
    },
  };
  const window = {
    scrollTo(options) {
      scrollY = options.top;
      scrolls.push({ ...options });
    },
    addEventListener(name, callback, options = {}) {
      if (!listeners.has(name)) listeners.set(name, new Map());
      listeners.get(name).set(callback, options);
    },
    removeEventListener(name, callback) {
      const callbacks = listeners.get(name);
      callbacks?.delete(callback);
      if (callbacks?.size === 0) listeners.delete(name);
    },
  };
  const context = vm.createContext({
    window, location, history,
    document: { readyState },
    performance: { getEntriesByType: () => navigationType === null ? [] : [{ type: navigationType }] },
    requestAnimationFrame(callback) {
      const id = nextFrame++;
      frames.set(id, callback);
      return id;
    },
    cancelAnimationFrame(id) { frames.delete(id); },
  });
  vm.runInContext(HOME_RELOAD_SCROLL_SCRIPT, context);
  return {
    history, state, location, listeners, frames, scrolls, restorationWrites, replacements,
    get scrollY() { return scrollY; },
    set scrollY(value) { scrollY = value; },
    emit(name, event = {}) {
      for (const [callback, options] of [...(listeners.get(name) ?? [])]) {
        if (options.once) window.removeEventListener(name, callback);
        callback(event);
      }
    },
    flushFrames() {
      const pending = [...frames.values()];
      frames.clear();
      for (const callback of pending) callback();
    },
  };
}

test("homepage reload resets immediately, settles once, and restores native history behavior", () => {
  const page = fixture();
  assert.equal(page.scrollY, 0);
  assert.deepEqual(page.scrolls, [{ top: 0, left: 0, behavior: "instant" }]);
  assert.deepEqual(page.restorationWrites, ["manual"]);
  assert.equal(page.history.scrollRestoration, "manual");
  page.emit("pageshow", { persisted: false });
  assert.equal(page.frames.size, 1);
  page.flushFrames();
  assert.equal(page.scrolls.length, 2);
  assert.equal(page.history.scrollRestoration, "auto");
  assert.deepEqual(page.restorationWrites, ["manual", "auto"]);
  assert.equal(page.listeners.size, 0);
  assert.equal(page.frames.size, 0);
  page.scrollY = 1200;
  page.emit("pageshow", { persisted: false });
  page.flushFrames();
  assert.equal(page.scrollY, 1200);
  assert.equal(page.scrolls.length, 2);
});

test("fresh visits, history traversal, and subpages keep their original position and links", () => {
  for (const navigationType of ["navigate", "back_forward", null]) {
    for (const hash of ["", "#work", "#contact"]) {
      const page = fixture({ navigationType, url: `https://www.sunny-wu.ca/?ref=shared${hash}` });
      page.emit("pageshow", { persisted: navigationType === "back_forward" });
      page.flushFrames();
      assert.equal(page.scrollY, 19000);
      assert.equal(page.location.hash, hash);
      assert.equal(page.replacements.length, 0);
      assert.equal(page.restorationWrites.length, 0);
      assert.equal(page.listeners.size, 0);
      assert.equal(page.frames.size, 0);
      assert.equal(page.scrolls.length, 0);
    }
  }
  const subpage = fixture({ url: "https://www.sunny-wu.ca/work?ref=shared#contact" });
  assert.equal(subpage.scrollY, 19000);
  assert.equal(subpage.location.hash, "#contact");
  assert.equal(subpage.replacements.length, 0);
  assert.equal(subpage.restorationWrites.length, 0);
  assert.equal(subpage.listeners.size, 0);
});

test("refresh clears managed fragments while preserving the query and Next history state", () => {
  for (const hash of ["#work", "#contact"]) {
    const page = fixture({ url: `https://www.sunny-wu.ca/?ref=shared&preview=1${hash}` });
    assert.equal(page.location.href, "https://www.sunny-wu.ca/?ref=shared&preview=1");
    assert.equal(page.replacements.length, 1);
    assert.equal(page.replacements[0].data, page.state);
    assert.equal(page.history.state, page.state);
    assert.equal(page.replacements[0].target, "/?ref=shared&preview=1");
    assert.equal(page.scrollY, 0);
  }
  const otherAnchor = fixture({ url: "https://www.sunny-wu.ca/#another-anchor" });
  assert.equal(otherAnchor.location.hash, "#another-anchor");
  assert.equal(otherAnchor.scrolls.length, 0);
  assert.equal(otherAnchor.replacements.length, 0);
  assert.equal(otherAnchor.restorationWrites.length, 0);
});

test("input and navigation events cancel any queued reset and release restoration", () => {
  for (const event of ["pointerdown", "touchstart", "wheel", "keydown", "popstate", "hashchange", "pagehide"]) {
    const page = fixture();
    page.emit("pageshow", { persisted: false });
    assert.equal(page.frames.size, 1);
    page.scrollY = 987;
    if (event === "hashchange") page.location.hash = "#work";
    if (event === "popstate") page.location.pathname = "/work";
    page.emit(event);
    page.flushFrames();
    assert.equal(page.scrollY, 987, event);
    assert.equal(page.scrolls.length, 1, event);
    assert.equal(page.frames.size, 0, event);
    assert.equal(page.listeners.size, 0, event);
    assert.equal(page.history.scrollRestoration, "auto", event);
  }
  const earlyInput = fixture();
  earlyInput.emit("touchstart");
  earlyInput.scrollY = 456;
  earlyInput.emit("pageshow", { persisted: false });
  earlyInput.flushFrames();
  assert.equal(earlyInput.scrollY, 456);
  assert.equal(earlyInput.scrolls.length, 1);
  assert.equal(earlyInput.frames.size, 0);
});

test("a BFCache pageshow never forces another reset", () => {
  const page = fixture();
  page.scrollY = 17000;
  page.emit("pageshow", { persisted: true });
  page.flushFrames();
  assert.equal(page.scrollY, 17000);
  assert.equal(page.scrolls.length, 1);
  assert.equal(page.frames.size, 0);
  assert.equal(page.listeners.size, 0);
  assert.equal(page.history.scrollRestoration, "auto");
});

test("already-loaded documents still settle once and preserve the previous restoration setting", () => {
  const page = fixture({ readyState: "complete", restoration: "manual" });
  assert.equal(page.frames.size, 1);
  page.flushFrames();
  assert.equal(page.scrolls.length, 2);
  assert.equal(page.listeners.size, 0);
  assert.equal(page.history.scrollRestoration, "manual");
  const changedByAnotherOwner = fixture();
  changedByAnotherOwner.history.scrollRestoration = "auto";
  changedByAnotherOwner.emit("touchstart");
  assert.equal(changedByAnotherOwner.history.scrollRestoration, "auto");
});
