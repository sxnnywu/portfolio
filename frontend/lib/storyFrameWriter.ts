/** Keep repeated scroll frames from invalidating the same DOM state again. */
export function createStoryFrameWriter() {
  const styles = new WeakMap<HTMLElement, Map<string, string>>();
  const attributes = new WeakMap<HTMLElement, Map<string, string>>();
  const inertValues = new WeakMap<HTMLElement, boolean>();

  return {
    style(element: HTMLElement, name: string, value: string | number): void {
      const next = String(value);
      let previous = styles.get(element);
      if (previous?.get(name) === next) return;
      element.style.setProperty(name, next);
      if (!previous) {
        previous = new Map();
        styles.set(element, previous);
      }
      previous.set(name, next);
    },

    attribute(element: HTMLElement, name: string, value: string | boolean): void {
      const next = String(value);
      let previous = attributes.get(element);
      if (previous?.get(name) === next) return;
      element.setAttribute(name, next);
      if (!previous) {
        previous = new Map();
        attributes.set(element, previous);
      }
      previous.set(name, next);
    },

    inert(element: HTMLElement, value: boolean): void {
      if (inertValues.get(element) === value) return;
      element.inert = value;
      inertValues.set(element, value);
    },
  };
}
