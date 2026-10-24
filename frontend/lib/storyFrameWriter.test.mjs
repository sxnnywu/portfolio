import assert from "node:assert/strict";
import test from "node:test";
import { createStoryFrameWriter } from "./storyFrameWriter.ts";

function elementSpy() {
  const writes = { styles: [], attributes: [], inert: [] };
  const element = {
    style: { setProperty: (...args) => writes.styles.push(args) },
    setAttribute: (...args) => writes.attributes.push(args),
    get inert() { throw new Error("Animation updates must not read DOM state"); },
    set inert(value) { writes.inert.push(value); },
  };
  return { element, writes };
}

test("unchanged frames skip writes while changed and reversed values still apply", () => {
  const writer = createStoryFrameWriter();
  const { element, writes } = elementSpy();
  writer.style(element, "--progress", 0);
  writer.style(element, "--progress", "0");
  writer.style(element, "--progress", 0.5);
  writer.style(element, "--progress", 0.5);
  writer.style(element, "--progress", 0);
  assert.deepEqual(writes.styles, [["--progress", "0"], ["--progress", "0.5"], ["--progress", "0"]]);
});

test("styles are cached separately for each property and element", () => {
  const writer = createStoryFrameWriter();
  const first = elementSpy();
  const second = elementSpy();
  for (const { element } of [first, second]) {
    writer.style(element, "opacity", 1);
    writer.style(element, "--opacity", 1);
    writer.style(element, "opacity", 1);
  }
  assert.deepEqual(first.writes.styles, [["opacity", "1"], ["--opacity", "1"]]);
  assert.deepEqual(second.writes.styles, first.writes.styles);
});

test("ARIA state writes include false and only change on boundaries", () => {
  const writer = createStoryFrameWriter();
  const { element, writes } = elementSpy();
  writer.attribute(element, "aria-hidden", false);
  writer.attribute(element, "aria-hidden", "false");
  writer.attribute(element, "aria-hidden", true);
  writer.attribute(element, "aria-hidden", true);
  writer.attribute(element, "aria-hidden", false);
  writer.attribute(element, "data-visible", false);
  assert.deepEqual(writes.attributes, [["aria-hidden", "false"], ["aria-hidden", "true"], ["aria-hidden", "false"], ["data-visible", "false"]]);
});

test("inert writes include the initial false without reading DOM state", () => {
  const writer = createStoryFrameWriter();
  const first = elementSpy();
  const second = elementSpy();
  writer.inert(first.element, false);
  writer.inert(first.element, false);
  writer.inert(first.element, true);
  writer.inert(first.element, true);
  writer.inert(first.element, false);
  writer.inert(second.element, false);
  assert.deepEqual(first.writes.inert, [false, true, false]);
  assert.deepEqual(second.writes.inert, [false]);
});
