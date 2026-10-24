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

function fixture(width, height, linear = false) {
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
    offsetHeight: name === "runway" ? height * 49.2 : galleryNames.includes(name) ? 450 : 820,
  })]));
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
  elements.polaroid.parentElement = elements.photo;
  elements.photo.parentElement = elements.inner;
  elements.inner.parentElement = elements.intro;
  for (const name of ["story", "education", "backgroundSummary"]) elements[name].parentElement = elements.inner;
  log.length = 0;
  return { elements, measured, window, log, nodes, remeasure: () => context.exports.measureStory(elements, { home: true, hasContact: true, linear }) };
}

function paintHarness(source, width, height, linear = false) {
  const result = fixture(width, height, linear);
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
