import assert from "node:assert/strict";
import test from "node:test";
import { createStoryImagePreparer } from "./storyImagePreparation.ts";

function chapterSpy(imageCount = 2) {
  let queries = 0;
  const writes = [];
  const images = Array.from({ length: imageCount }, (_, index) => ({
    src: `/photo-${index}.jpg`,
    srcset: `/photo-${index}.jpg 100w, /photo-${index}@2x.jpg 200w`,
    width: 100,
    height: 75,
    sizes: "100px",
    set loading(value) { writes.push([index, value]); },
    decode() { throw new Error("next/image already handles decode; do not duplicate it"); },
  }));
  const element = {
    querySelectorAll(selector) {
      assert.equal(selector, "img");
      queries++;
      return images;
    },
  };
  return { element, writes, images, get queries() { return queries; } };
}

test("current and upcoming chapters prepare early; distant chapters keep native lazy loading", () => {
  const chapters = Array.from({ length: 5 }, () => chapterSpy());
  const originalImages = chapters.map(({ images }) => images.map(({ src, srcset, sizes, width, height }) => ({ src, srcset, sizes, width, height })));
  const preparer = createStoryImagePreparer(chapters.map(({ element }) => element));
  preparer.prepare(0);
  assert.deepEqual(chapters.map(({ writes }) => writes.length), [2, 2, 0, 0, 0]);
  preparer.prepare(1);
  assert.deepEqual(chapters.map(({ writes }) => writes.length), [2, 2, 2, 0, 0]);
  // No source or layout attribute is altered while promoting native loading.
  assert.deepEqual(chapters.map(({ images }) => images.map(({ src, srcset, sizes, width, height }) => ({ src, srcset, sizes, width, height }))), originalImages);
});

test("camera-visible images are prepared across jumps, with no repeated queries or writes", () => {
  const chapters = Array.from({ length: 5 }, () => chapterSpy());
  const preparer = createStoryImagePreparer(chapters.map(({ element }) => element));
  preparer.prepare(3, [chapters[2].element, chapters[3].element]);
  for (let i = 0; i < 10; i++) preparer.prepare(3, [chapters[2].element, chapters[3].element]);
  assert.deepEqual(chapters.map(({ writes }) => writes.length), [0, 0, 2, 2, 2]);
  assert.deepEqual(chapters.map(({ queries }) => queries), [1, 1, 1, 1, 1]);
  preparer.prepare(2, [chapters[1].element, chapters[2].element]);
  assert.deepEqual(chapters.map(({ writes }) => writes.length), [0, 2, 2, 2, 2]);
});

test("linear mode keeps native lazy loading, and cleanup stops future preparation", () => {
  const chapters = Array.from({ length: 3 }, () => chapterSpy());
  const elements = chapters.map(({ element }) => element);
  const preparer = createStoryImagePreparer(elements);
  preparer.prepare(0, elements, true);
  assert.ok(chapters.every(({ writes }) => writes.length === 0));
  preparer.prepare(0, [elements[0]]);
  assert.deepEqual(chapters.map(({ writes }) => writes.length), [2, 2, 0]);
  preparer.dispose();
  preparer.prepare(2, elements);
  assert.deepEqual(chapters.map(({ writes }) => writes.length), [2, 2, 0]);
});
