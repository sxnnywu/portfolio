/**
 * Start the next chapter's image work before the camera gets there.
 *
 * next/image already decodes each image asynchronously in its load handler, so
 * promoting native lazy loading is enough to prepare it without a second decode
 * job. Sources, responsive sizes and intrinsic dimensions stay untouched.
 */
export function createStoryImagePreparer(chapters: readonly HTMLElement[]) {
  // Discover images once, outside the scroll frame. Promoted chapters stay ready
  // when the reader reverses direction; responsive source changes stay native.
  const imagesByChapter = new Map(chapters.map((chapter) => [chapter, [...chapter.querySelectorAll<HTMLImageElement>("img")]]));
  const prepared = new Set<HTMLElement>();
  let disposed = false;

  const prepareChapter = (chapter: HTMLElement | undefined) => {
    if (!chapter || prepared.has(chapter)) return;
    const images = imagesByChapter.get(chapter);
    if (!images) return;
    prepared.add(chapter);
    for (const image of images) image.loading = "eager";
  };

  return {
    prepare(currentIndex: number, visibleChapters: Iterable<HTMLElement> = [], linear = false): void {
      // The linear/reduced-motion page uses ordinary native lazy loading, rather
      // than making every chapter eager just because all chapters are visible.
      if (disposed || linear) return;
      prepareChapter(chapters[currentIndex]);
      prepareChapter(chapters[currentIndex + 1]);
      for (const chapter of visibleChapters) prepareChapter(chapter);
    },

    dispose(): void {
      disposed = true;
      imagesByChapter.clear();
      prepared.clear();
    },
  };
}
