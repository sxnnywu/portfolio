import type { CSSProperties, RefObject } from "react";
import { socials } from "@/lib/data";
import { externalLinkProps } from "@/lib/links";
import { color, font, pill } from "@/lib/tokens";
import styles from "./EndingChapter.module.css";

export default function EndingChapter({ chapterRef }: {
  chapterRef: RefObject<HTMLElement | null>;
}) {
  return (
    <section
      ref={chapterRef}
      data-ending-chapter
      aria-labelledby="ending-chapter-heading"
      className={styles.chapter}
      style={{
        "--ending-serif": font.serif,
        "--ending-sans": font.sans,
        "--ending-title": color.inkDeepSky,
        "--ending-body": color.body,
        "--ending-blue": color.blueInk,
      } as CSSProperties}
    >
      <div className={styles.composition}>
        <h2 id="ending-chapter-heading" className={styles.heading}>
          Whatever comes next, I want to build it with <em>people who care.</em>
        </h2>
        <p className={styles.description}>
          Currently growing{" "}
          <a href="https://askoro.now" {...externalLinkProps("https://askoro.now")}><em>oro</em></a>,{" "}
          keeping up with <em>2 degrees</em>, and finding somewhere exciting to work for <em>winter 2027.</em>
        </p>
        <div className={styles.buttonArrival}>
          <a
            data-ending-cta
            className={styles.button}
            href={socials[2].href}
            style={{
              ...pill.close,
              fontSize: "var(--ending-button-size, 13.5px)",
              padding: "var(--ending-button-padding, 14px 30px)",
            }}
          >
            Say hi <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
