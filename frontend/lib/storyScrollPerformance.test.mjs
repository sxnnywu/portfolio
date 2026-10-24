import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { createStoryFrameWriter } from "./storyFrameWriter.ts";
import { createStoryImagePreparer } from "./storyImagePreparation.ts";

// Keep the approved animation as the regression reference after this change lands.
const originalSource = readFileSync(new URL("./fixtures/storyScrollPaint.baseline.txt", import.meta.url), "utf8");
const currentSource = readFileSync(new URL("../components/ScrollStoryPreview.tsx", import.meta.url), "utf8");
const measurementSource = readFileSync(new URL("./storyMeasurements.ts", import.meta.url), "utf8");
const chapterNames = ["chapter", "pinkChapter", "hackathonChapter", "universityChapter", "creatorChapter", "growthChapter", "oroProjectChapter", "rocketChapter", "blueprintChapter", "eventHostingChapter", "launchpadChapter"];
const galleryNames = ["gallery", "pinkGallery", "hackathonGallery", "universityGallery", "creatorGallery", "growthGallery", "oroProjectGallery", "rocketGallery", "blueprintGallery", "eventHostingGallery", "launchpadGallery"];
const fields = ["page", "runway", "stage", "photo", "intro", "sun", ...chapterNames, ...galleryNames, "indexChapter", "contactContent"];
const clamp = (value) => Math.max(0, Math.min(1, value));
const ease = (value, start, end) => {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
};
const transpile = (source) => ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS } }).outputText;

function declaration(source, name) {
  const parsed = ts.createSourceFile("story.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let found;
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && node.name.getText(parsed) === name) found = node;
    ts.forEachChild(node, visit);
  };
  visit(parsed);
  assert.ok(found?.initializer, `Could not locate ${name} in the actual component`);
  return { text: found.initializer.getText(parsed), start: found.parent.parent.getStart(parsed) };
}

function fixture(width, height, linear = false, includeEnding = false) {
  const log = [];
  const nodes = new Map();
  const make = (name, geometry = {}) => {
    const values = new Map();
    const attributes = new Map();
    let inert = false;
    const node = {
      name, values, attributes,
      childrenBySelector: {},
      parentElement: null,
      setAttribute(property, value) {
        attributes.set(property, String(value));
        log.push({ kind: "attribute", name, property, value: String(value) });
      },
      get inert() { return inert; },
      set inert(value) { inert = value; log.push({ kind: "inert", name, value }); },
      querySelectorAll(selector) { return this.childrenBySelector[selector] ?? []; },
      querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; },
      getBoundingClientRect() { log.push({ kind: "read", name }); return { top: 0 }; },
    };
    node.style = new Proxy({
      setProperty(property, value) {
        values.set(property, String(value));
        log.push({ kind: "style", name, property, value: String(value) });
      },
      getPropertyValue(property) { return values.get(property) ?? ""; },
    }, { set(target, property, value) { target.setProperty(property, value); return true; } });
    node.dataset = new Proxy({}, { set(_, property, value) {
      node.setAttribute(`data-${property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value);
      return true;
    } });
    for (const [key, value] of Object.entries({ offsetLeft: 20, offsetTop: 30, offsetWidth: 650, offsetHeight: 750, clientWidth: width, clientHeight: height, ...geometry })) {
      Object.defineProperty(node, key, { get() { log.push({ kind: "read", name, property: key }); return value; } });
    }
    nodes.set(name, node);
    return node;
  };
  const elements = Object.fromEntries(fields.map((name) => [name, make(name, {
    offsetWidth: galleryNames.includes(name) ? (width > 850 ? 650 : 480) : (width > 850 ? 1180 : 600),
    offsetHeight: name === "runway" ? height * (includeEnding ? 52 : 49.2) : galleryNames.includes(name) ? 450 : 820,
  })]));
  elements.endingChapter = includeEnding ? make("endingChapter", { offsetWidth: width > 850 ? 940 : 440, offsetHeight: 460 }) : null;
  for (const name of ["hero", "journey", "contactStage", "inner", "polaroid", "sky", "cue", "progress", "farClouds", "midClouds", "nearClouds", "wash", "story", "education", "backgroundSummary"]) elements[name] = make(name);
  elements.intro.firstElementChild = elements.inner;
  elements.photo.firstElementChild = elements.polaroid;
  for (const name of ["story", "education", "backgroundSummary"]) elements.intro.childrenBySelector[`.${name}`] = [elements[name]];
  for (const name of ["sky", "cue", "progress", "farClouds", "midClouds", "nearClouds"]) elements.page.childrenBySelector[`.${name}`] = [elements[name]];
  elements.page.childrenBySelector["[data-watercolour-wash]"] = [elements.wash];
  elements.hackathonGallery.childrenBySelector["[data-hackathon-project]"] = [0, 1, 2].map((index) => make(`project${index}`, { offsetLeft: index * 180, offsetTop: index * 200, offsetWidth: 390, offsetHeight: 300 }));
  elements.creatorGallery.childrenBySelector["[data-creator-profile]"] = [0, 1].map((index) => make(`profile${index}`, { offsetLeft: index * 240, offsetTop: index * 160, offsetWidth: 220, offsetHeight: 470 }));
  const rows = make("rows", { offsetHeight: 333 });
  const cards = [0, 1, 2].map((index) => make(`card${index}`, { offsetTop: index * 111, offsetHeight: 100, offsetWidth: 700 }));
  rows.childrenBySelector["[data-index-card]"] = cards;
  rows.lastElementChild = cards[2];
  elements.indexChapter.childrenBySelector["[data-index-rows]"] = [rows];
  const window = { scrollY: 0, getComputedStyle() { return { paddingTop: "80px", paddingBottom: "60px" }; } };
  const context = vm.createContext({ window, exports: {} });
  vm.runInContext(transpile(measurementSource), context);
  const measured = context.exports.measureStory(elements, { home: true, hasContact: true, linear });
  for (const name of chapterNames) elements[name].parentElement = elements.journey;
  if (elements.endingChapter) elements.endingChapter.parentElement = elements.journey;
  elements.polaroid.parentElement = elements.photo;
  elements.photo.parentElement = elements.inner;
  elements.inner.parentElement = elements.intro;
  for (const name of ["story", "education", "backgroundSummary"]) elements[name].parentElement = elements.inner;
  log.length = 0;
  return { elements, measured, window, log, nodes, remeasure: () => context.exports.measureStory(elements, { home: true, hasContact: true, linear }) };
}

function paintHarness(source, width, height, linear = false, includeEnding = false) {
  const result = fixture(width, height, linear, includeEnding);
  const camera = declaration(source, "cameraAt");
  const paint = declaration(source, "paint");
  const setup = source.includes("const writer = createStoryFrameWriter()")
    ? source.slice(declaration(source, "writer").start, camera.start)
    : "";
  const context = vm.createContext({
    ...result.elements, ...result.measured,
    window: result.window, home: true, hasContact: true,
    linear: { matches: linear }, frame: null,
    introBackground: Array(4), clamp, ease, createStoryFrameWriter, createStoryImagePreparer,
    styles: new Proxy({}, { get: (_, property) => property }),
  });
  vm.runInContext(transpile(`${setup}\nconst cameraAt = ${camera.text};\nconst paint = ${paint.text};`), context);
  result.paint = (units) => {
    result.window.scrollY = result.measured.start + result.measured.height * units;
    result.log.length = 0;
    vm.runInContext("paint()", context);
  };
  result.owners = (key) => setup ? vm.runInContext(`ownersFor(${JSON.stringify(key)})`, context) : [result.elements.page];
  return result;
}

function isRenderable(element) {
  for (let node = element; node; node = node.parentElement) {
    if (node.values.get("visibility") === "hidden" || node.values.get("opacity") === "0") return false;
  }
  return true;
}

test("animation values and camera match the approved baseline forward and backward", () => {
  for (const [width, height] of [[390, 844], [360, 640], [1440, 900], [2560, 1080]]) {
    const old = paintHarness(originalSource, width, height);
    const current = paintHarness(currentSource, width, height);
    const samples = Array.from({ length: 198 }, (_, index) => index * 0.25);
    for (const units of [...samples, ...samples.toReversed()]) {
      old.paint(units);
      current.paint(units);
      const baselineValues = [...old.elements.page.values].filter(([key]) => key !== "--wash-x" && key !== "--wash-y" && key !== "--wash-size" && key !== "--contact-cloud-height");
      assert.equal(baselineValues.length, 79);
      for (const [key, expected] of baselineValues) {
        const owners = current.owners(key);
        assert.ok(owners.length, `No owner for ${key}`);
        for (const owner of owners) {
          if (isRenderable(owner)) assert.equal(owner.values.get(key), expected, `${width}px at ${units}H: ${key} on ${owner.name}`);
        }
      }
      for (const property of ["transform", "opacity", "visibility"]) assert.equal(current.elements.journey.values.get(property), old.elements.journey.values.get(property), `Camera ${property} changed at ${units}H`);
      for (const name of ["hero", "intro", ...chapterNames, "indexChapter", "contactStage"]) {
        assert.deepEqual([...current.elements[name].attributes], [...old.elements[name].attributes], `Accessibility state changed on ${name} at ${units}H`);
        assert.equal(current.elements[name].inert, old.elements[name].inert, `Focus state changed on ${name} at ${units}H`);
      }
      assert.equal(current.log.some(({ kind, name }) => kind === "style" && name === "page"), false, "Per-frame CSS must not invalidate the root story element");
      assert.equal(current.log.some(({ kind }) => kind === "read"), false, "Painting must use cached geometry");
    }
  }
});

test("stationary frames write nothing; nearby moving frames update only changed styles", (context) => {
  const current = paintHarness(currentSource, 390, 844);
  const old = paintHarness(originalSource, 390, 844);
  current.paint(27.5);
  current.paint(27.5);
  assert.equal(current.log.length, 0, "An unchanged frame must not touch DOM state");
  old.paint(27.501);
  current.paint(27.501);
  const changedStyles = current.log.filter(({ kind }) => kind === "style");
  assert.ok(changedStyles.length > 0 && changedStyles.length <= 10, `Expected at most 10 changed styles, found ${changedStyles.length}`);
  assert.equal(current.log.some(({ kind }) => kind === "attribute" || kind === "inert"), false, "Accessibility only changes at state boundaries");
  assert.ok(old.log.filter(({ kind }) => kind === "style").length > 80, "The reference should demonstrate the old frame's write volume");
  context.diagnostic(`Mid-story frame: ${old.log.filter(({ kind }) => kind === "style").length} → ${changedStyles.length} style writes; zero ARIA/inert changes. Stationary frame: zero DOM writes.`);
});

test("current chapters and neighbors stay renderable while distant chapters are hidden", () => {
  const current = paintHarness(currentSource, 390, 844);
  current.paint(27.5);
  assert.equal(current.elements.growthChapter.values.get("visibility"), "inherit");
  assert.equal(current.elements.oroProjectChapter.values.get("visibility"), "inherit");
  assert.equal(current.elements.rocketChapter.values.get("visibility"), "inherit");
  assert.equal(current.elements.chapter.values.get("visibility"), "hidden");
  assert.equal(current.elements.launchpadChapter.values.get("visibility"), "hidden");
  assert.equal(current.elements.indexChapter.values.has("visibility"), false, "The index remains available for its keyboard navigation shortcut");
  const bounds = current.measured.chapterBounds[0];
  const camera = /translate\(([-\d.e+]+)px,([-\d.e+]+)px\)$/.exec(current.elements.journey.values.get("transform"));
  assert.ok(camera);
  bounds.x = -Number(camera[1]);
  bounds.y = -Number(camera[2]);
  current.paint(27.5);
  assert.equal(current.elements.chapter.values.get("visibility"), "inherit", "A distant chapter intersecting the viewport must remain visible");
  current.paint(0);
  assert.equal(current.elements.journey.values.get("visibility"), "hidden");
  assert.equal(current.elements.chapter.values.get("visibility"), "inherit", "Near chapters inherit the hidden journey rather than overriding it");
});

test("linear mode retains every chapter and the baseline animation state", () => {
  const current = paintHarness(currentSource, 844, 390, true);
  const old = paintHarness(originalSource, 844, 390, true);
  current.paint(18);
  old.paint(18);
  for (const name of chapterNames) assert.equal(current.elements[name].values.get("visibility"), "inherit");
  for (const [key, expected] of old.elements.page.values) {
    if (["--wash-x", "--wash-y", "--wash-size", "--contact-cloud-height"].includes(key)) continue;
    for (const owner of current.owners(key)) assert.equal(owner.values.get(key), expected, `${key} changed in linear mode`);
  }
  current.paint(18);
  assert.equal(current.log.length, 0);
});

test("layout measurement batches reads before writes and leaves unchanged positions alone", () => {
  const scene = fixture(390, 844);
  for (const name of chapterNames) scene.elements[name].style.setProperty("left", "");
  scene.log.length = 0;
  scene.remeasure();
  const firstWrite = scene.log.findIndex(({ kind }) => kind === "style");
  assert.ok(firstWrite > 0);
  assert.equal(scene.log.slice(firstWrite).some(({ kind }) => kind === "read"), false);
  scene.log.length = 0;
  scene.remeasure();
  assert.equal(scene.log.some(({ kind }) => kind === "style"), false);
});

test("resize bursts coalesce into one measured frame; ordinary scroll uses cached layout", () => {
  const callbacks = [];
  const events = [];
  const context = vm.createContext({
    frame: null, needsMeasurement: false,
    window: { requestAnimationFrame(callback) { callbacks.push(callback); return callbacks.length; } },
    measure() { events.push("measure"); },
    paint() { events.push("paint"); context.frame = null; },
  });
  vm.runInContext(transpile(["renderFrame", "schedule", "queueMeasurement"].map((name) => `const ${name} = ${declaration(currentSource, name).text};`).join("\n")), context);
  vm.runInContext("queueMeasurement(); queueMeasurement(); schedule(); queueMeasurement();", context);
  assert.equal(callbacks.length, 1);
  callbacks.shift()();
  assert.deepEqual(events, ["measure", "paint"]);
  events.length = 0;
  vm.runInContext("schedule(); schedule();", context);
  assert.equal(callbacks.length, 1);
  callbacks.shift()();
  assert.deepEqual(events, ["paint"]);
});

test("the new ending leaves the hero and every earlier chapter on their approved paths", () => {
  for (const [width, height] of [[390, 844], [360, 640], [1440, 900], [2560, 1080]]) {
    const old = paintHarness(originalSource, width, height);
    const current = paintHarness(currentSource, width, height, false, true);
    const samples = [...Array.from({ length: 172 }, (_, index) => index * 0.25), 42.8];
    for (const units of [...samples, ...samples.toReversed()]) {
      old.paint(units);
      current.paint(units);
      for (const [key, expected] of old.elements.page.values) {
        // The page is longer, so the progress bar intentionally measures a new total.
        if (["--progress", "--wash-x", "--wash-y", "--wash-size", "--contact-cloud-height"].includes(key)) continue;
        for (const owner of current.owners(key)) {
          if (isRenderable(owner)) assert.equal(owner.values.get(key), expected, `${width}px before ending at ${units}H: ${key}`);
        }
      }
      for (const property of ["transform", "opacity", "visibility"]) {
        assert.equal(current.elements.journey.values.get(property), old.elements.journey.values.get(property), `Earlier camera ${property} changed at ${units}H`);
      }
    }
    const legacy = paintHarness(currentSource, width, height);
    legacy.paint(42.8);
    assert.equal(legacy.elements.launchpadChapter.values.get("visibility"), "inherit", "Preview without the ending keeps Launchpad visible at its final camera stop");
  }
});

test("ending and index camera handoffs join continuously and preserve batched measurement", () => {
  const cameraKeys = ["x", "y", "z", "r"];
  const transformNumbers = (scene) => [...scene.elements.journey.values.get("transform").matchAll(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi)].map(([value]) => Number(value));
  for (const [width, height] of [[390, 844], [360, 640], [1440, 900], [2560, 1080]]) {
    const scene = paintHarness(currentSource, width, height, false, true);
    const { launchpadFrames, endingFrames, indexFrames } = scene.measured;
    for (const key of cameraKeys) {
      assert.equal(endingFrames[0][key], launchpadFrames.at(-1)[key], `Ending entrance changed ${key}`);
      assert.equal(indexFrames[0][key], endingFrames.at(-1)[key], `Index entrance changed ${key}`);
    }
    for (const boundary of [42.8, 45.6, 48.8, 51]) {
      scene.paint(boundary);
      const atBoundary = transformNumbers(scene);
      assert.ok(atBoundary.length > 0 && atBoundary.every(Number.isFinite));
      for (const units of [boundary - 0.0000001, boundary + 0.0000001]) {
        scene.paint(units);
        const nearby = transformNumbers(scene);
        assert.equal(nearby.length, atBoundary.length);
        nearby.forEach((value, index) => assert.ok(Math.abs(value - atBoundary[index]) < 0.005, `${width}px camera discontinuity at ${boundary}H`));
      }
    }
    assert.equal(scene.measured.chapterBounds[11].element, scene.elements.endingChapter);
    scene.elements.endingChapter.style.setProperty("left", "");
    scene.log.length = 0;
    scene.remeasure();
    const firstWrite = scene.log.findIndex(({ kind }) => kind === "style");
    assert.ok(firstWrite > 0);
    assert.equal(scene.log.slice(firstWrite).some(({ kind }) => kind === "read"), false, "The optional ending must not add reads after positioning begins");
    scene.log.length = 0;
    scene.remeasure();
    assert.equal(scene.log.some(({ kind }) => kind === "style"), false);
  }
});

test("ending copy and CTA reveal in sequence and reverse with native scroll", () => {
  for (const [width, height] of [[390, 844], [1440, 900]]) {
    const scene = paintHarness(currentSource, width, height, false, true);
    const ending = scene.elements.endingChapter;
    const value = (name) => Number(ending.values.get(`--ending-${name}`));
    scene.paint(42.8);
    assert.deepEqual([value("heading"), value("description"), value("button")], [0, 0, 0]);
    assert.equal(ending.values.has("visibility"), false, "The CTA must stay eligible for its keyboard focus shortcut");
    assert.equal(ending.inert, false);
    scene.paint(42.8 + 2.8 * 0.4);
    assert.ok(value("heading") > 0 && value("heading") < 1);
    assert.deepEqual([value("description"), value("button")], [0, 0]);
    scene.paint(42.8 + 2.8 * 0.58);
    assert.equal(value("heading"), 1);
    assert.ok(value("description") > 0 && value("description") < 1);
    assert.equal(value("button"), 0);
    scene.paint(42.8 + 2.8 * 0.7);
    assert.deepEqual([value("heading"), value("description")], [1, 1]);
    assert.ok(value("button") > 0 && value("button") < 1);
    scene.paint(42.8 + 2.8 * 0.84);
    assert.deepEqual([value("heading"), value("description"), value("button")], [1, 1, 1]);
    assert.equal(ending.attributes.get("aria-hidden"), "false");
    assert.equal(ending.inert, false);
    const samples = [42.8, 43.5, 44, 44.7, 45.32, 46, 47.2, 49, 51];
    const snapshots = new Map();
    for (const units of samples) {
      scene.paint(units);
      snapshots.set(units, { values: [...ending.values], attributes: [...ending.attributes], inert: ending.inert });
    }
    assert.equal(ending.inert, true, "The departed CTA leaves the tab order once the index takes over");
    for (const units of samples.toReversed()) {
      scene.paint(units);
      assert.deepEqual({ values: [...ending.values], attributes: [...ending.attributes], inert: ending.inert }, snapshots.get(units), `Reverse scroll changed ending state at ${units}H`);
    }
    scene.paint(42.8 + 2.8 * 0.55);
    assert.equal(scene.elements.launchpadChapter.values.get("--launchpad-departure"), "1", "Launchpad departs during the ending transition");
    assert.equal(value("departure"), 0, "Ending remains fully present before the index transition");
  }
});

test("ending frames use cached geometry and unchanged frames perform no DOM writes", () => {
  const scene = paintHarness(currentSource, 390, 844, false, true);
  const samples = [0, 27.5, 42.8, 43.5, 44.4, 45.32, 45.6, 46.5, 48.8, 50.5, 51];
  for (const units of [...samples, ...samples.toReversed()]) {
    scene.paint(units);
    assert.equal(scene.log.some(({ kind }) => kind === "read"), false, `Frame added layout reads at ${units}H`);
    assert.equal(scene.log.some(({ kind, name }) => kind === "style" && name === "page"), false);
    scene.paint(units);
    assert.equal(scene.log.length, 0, `Stationary ending frame touched DOM at ${units}H`);
  }
});

test("linear mode keeps the ending readable and its links available", () => {
  const scene = paintHarness(currentSource, 844, 390, true, true);
  scene.paint(18);
  const ending = scene.elements.endingChapter;
  assert.equal(ending.values.has("visibility"), false);
  for (const key of ["--ending-heading", "--ending-description", "--ending-button"]) assert.equal(ending.values.get(key), "1");
  assert.equal(ending.values.get("--ending-departure"), "0");
  assert.equal(ending.attributes.get("aria-hidden"), "false");
  assert.equal(ending.inert, false);
  assert.equal(ending.style.getPropertyValue("left"), "");
  assert.equal(ending.style.getPropertyValue("top"), "");
  assert.equal(scene.elements.launchpadChapter.values.get("--launchpad-departure"), "0");
  scene.paint(18);
  assert.equal(scene.log.length, 0);
});

test("ending keyboard navigation and hash jumps settle at the shifted native scroll stops", () => {
  const events = [];
  class FocusTarget {
    matches(selector) { return selector === "a:focus-visible"; }
    focus(options) { events.push(["focus", options.preventScroll]); }
  }
  const cta = new FocusTarget();
  const indexLink = new FocusTarget();
  const context = vm.createContext({
    Element: FocusTarget,
    home: true, hasContact: true, start: 120, height: 844,
    endingDuration: 2.8, indexStart: 45.6, contactStart: 48.8,
    linear: { matches: false }, frame: 9, needsMeasurement: true,
    endingChapter: { querySelector: (selector) => selector === "[data-ending-cta]" ? cta : null },
    indexChapter: { querySelector: (selector) => selector === "a" ? indexLink : null },
    contactStage: {},
    window: {
      location: { hash: "" },
      scrollTo(options) { events.push(["scroll", options.top, options.behavior]); },
      cancelAnimationFrame(id) { events.push(["cancel", id]); },
    },
    measure() { events.push(["measure"]); },
    paint() { events.push(["paint"]); context.frame = null; },
    schedule() { events.push(["schedule"]); },
  });
  const names = ["renderFrame", "visitEnding", "focusEnding", "bridgeEndingFocus", "visitIndex", "visitContact", "followHash"];
  vm.runInContext(transpile(names.map((name) => `const ${name} = ${declaration(currentSource, name).text};`).join("\n")), context);
  const assertJump = (expression, units) => {
    events.length = 0;
    context.frame = 9;
    context.needsMeasurement = true;
    vm.runInContext(expression, context);
    assert.ok(Math.abs(events[0][1] - (120 + 844 * units)) < 0.000001);
    assert.deepEqual([events[0][0], events[0][2]], ["scroll", "instant"]);
    assert.deepEqual(events.slice(1), [["cancel", 9], ["measure"], ["paint"]], "Keyboard/hash navigation flushes measurement before painting the settled stop");
  };
  assertJump("visitEnding()", 42.8 + 2.8 * 0.9);
  assertJump("visitIndex()", 45.6 + 3.2 * 0.93);
  assertJump("visitContact()", 48.8 + 2.2 * 0.98);
  context.window.location.hash = "#work";
  assertJump("followHash()", 45.6 + 3.2 * 0.93);
  context.window.location.hash = "#contact";
  assertJump("followHash()", 48.8 + 2.2 * 0.98);
  context.target = cta;
  assertJump("focusEnding({ target })", 42.8 + 2.8 * 0.9);
  events.length = 0;
  context.target = indexLink;
  context.preventDefault = () => events.push(["prevent"]);
  vm.runInContext('bridgeEndingFocus({ target, key: "Tab", shiftKey: true, preventDefault })', context);
  assert.equal(events[0][0], "prevent");
  assert.ok(Math.abs(events[1][1] - (120 + 844 * (42.8 + 2.8 * 0.9))) < 0.000001);
  assert.deepEqual(events.slice(2), [["paint"], ["focus", true]], "Reverse tab from the index restores the ending before focusing its CTA");
  events.length = 0;
  vm.runInContext('visitIndex("smooth")', context);
  assert.deepEqual(events.map(([kind]) => kind), ["scroll", "schedule"], "Pointer navigation keeps the native smooth camera journey");
  assert.equal(events[0][2], "smooth");
  events.length = 0;
  context.linear.matches = true;
  vm.runInContext('visitEnding(); visitIndex(); visitContact(); bridgeEndingFocus({ target, key: "Tab", shiftKey: true, preventDefault });', context);
  assert.deepEqual(events, [], "Linear mode leaves ordinary document scrolling and focus alone");
});
