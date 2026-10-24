import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("./heroPlayback.ts", import.meta.url), "utf8");
const transpile = (text) => ts.transpileModule(text, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
}).outputText;

function fixture({ hiddenHero = false, standalone = false, reduced = false } = {}) {
  let now = 0;
  let nextTimer = 1;
  let advances = 0;
  const timers = new Map();
  const eventTarget = (properties = {}) => ({
    ...properties,
    listeners: new Map(),
    addEventListener(name, callback) { this.listeners.set(name, callback); },
    removeEventListener(name) { this.listeners.delete(name); },
    emit(name) { this.listeners.get(name)?.(); },
  });
  const motion = eventTarget({ matches: reduced });
  const document = eventTarget({ hidden: false });
  const hero = { hidden: hiddenHero, getAttribute: () => hero.hidden ? "true" : "false" };
  const element = { closest: () => standalone ? null : hero };
  const observers = [];
  const mutations = [];
  class IntersectionObserver {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe(target) { assert.equal(target, element); }
    disconnect() { this.disconnected = true; }
    emit(isIntersecting) { this.callback([{ isIntersecting }]); }
  }
  class MutationObserver {
    constructor(callback) { this.callback = callback; mutations.push(this); }
    observe(target, options) {
      assert.equal(target, hero);
      assert.equal(options.attributeFilter.join(), "aria-hidden");
    }
    disconnect() { this.disconnected = true; }
  }
  const context = vm.createContext({
    exports: {}, document, IntersectionObserver, MutationObserver,
    performance: { now: () => now },
    window: {
      matchMedia: () => motion,
      setTimeout(callback, delay) {
        const id = nextTimer++;
        timers.set(id, { callback, at: now + delay });
        return id;
      },
      clearTimeout(id) { timers.delete(id); },
    },
  });
  vm.runInContext(transpile(source), context);
  const dispose = context.exports.startHeroPlayback({
    element, delay: 1000, mountedAt: 0, advance: () => advances++,
  });
  return {
    motion, document, observers, mutations, timers, dispose,
    get advances() { return advances; },
    until(time) {
      for (;;) {
        const next = [...timers].sort(([, a], [, b]) => a.at - b.at)[0];
        if (!next || next[1].at > time) break;
        now = next[1].at;
        timers.delete(next[0]);
        next[1].callback();
      }
      now = time;
    },
    hideHero(hidden) { hero.hidden = hidden; mutations[0]?.callback(); },
  };
}

test("visible playback preserves intro delay and three-second reading time", () => {
  const page = fixture();
  page.until(1000);
  page.observers[0].emit(true);
  page.until(4549);
  assert.equal(page.advances, 0);
  page.until(4550);
  assert.equal(page.advances, 1);
  page.until(7550);
  assert.equal(page.advances, 2);
  assert.equal(page.timers.size, 1);
  page.dispose();
});

test("the story's hidden hero stops all timers even while intersecting", () => {
  const page = fixture();
  page.until(500);
  page.hideHero(true);
  assert.equal(page.timers.size, 0);
  page.until(20000);
  assert.equal(page.advances, 0);
  page.hideHero(false);
  page.until(22999);
  assert.equal(page.advances, 0);
  page.until(23000);
  assert.equal(page.advances, 1);
  page.dispose();
});

test("intersection also suspends standalone heroes and resumes their current phrase", () => {
  const page = fixture({ standalone: true });
  assert.equal(page.mutations.length, 0);
  page.until(4550);
  page.observers[0].emit(false);
  assert.equal(page.timers.size, 0);
  page.until(15000);
  assert.equal(page.advances, 1);
  page.observers[0].emit(true);
  page.until(18000);
  assert.equal(page.advances, 2);
  page.dispose();
});

test("hidden tabs, reduced motion, and cleanup leave no background timer", () => {
  const page = fixture({ hiddenHero: true });
  assert.equal(page.timers.size, 0);
  page.hideHero(false);
  page.document.hidden = true;
  page.document.emit("visibilitychange");
  assert.equal(page.timers.size, 0);
  page.motion.matches = true;
  page.document.hidden = false;
  page.document.emit("visibilitychange");
  assert.equal(page.timers.size, 0);
  page.motion.matches = false;
  page.motion.emit("change");
  assert.equal(page.timers.size, 1);
  page.dispose();
  assert.equal(page.timers.size, 0);
  assert.equal(page.document.listeners.size, 0);
  assert.equal(page.motion.listeners.size, 0);
  assert.ok(page.observers[0].disconnected);
  assert.ok(page.mutations[0].disconnected);
  page.observers[0].emit(true);
  page.until(100000);
  assert.equal(page.timers.size, 0);
  assert.equal(page.advances, 0);
});

test("pages without parallax layers register no global scroll machinery", () => {
  const effects = [];
  const context = vm.createContext({
    exports: {},
    require(name) {
      if (name === "react") return { useEffect: (effect) => effects.push(effect) };
      if (name === "next/navigation") return { usePathname: () => "/" };
      throw new Error(`Unexpected module: ${name}`);
    },
    document: { querySelectorAll: () => [] },
    window: new Proxy({}, { get() { throw new Error("Empty parallax pages must not subscribe or schedule"); } }),
  });
  const parallax = readFileSync(new URL("../components/ParallaxRoot.tsx", import.meta.url), "utf8");
  vm.runInContext(transpile(parallax), context);
  context.exports.default();
  assert.equal(effects.length, 1);
  assert.equal(effects[0](), undefined);
});
