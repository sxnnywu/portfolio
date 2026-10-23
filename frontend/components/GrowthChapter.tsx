import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import stan from "@/public/assets/story/stan.jpg";
import polarity from "@/public/assets/story/polarity.jpg";
import { color, font } from "@/lib/tokens";
import styles from "./GrowthChapter.module.css";

interface GrowthChapterProps {
  chapterRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
}

export default function GrowthChapter({ chapterRef, galleryRef }: GrowthChapterProps) {
  return (
    <article
      ref={chapterRef}
      data-growth-chapter
      className={styles.chapter}
      aria-labelledby="growth-chapter-heading"
      style={{
        "--growth-paper": color.paper,
        "--growth-body": color.body,
        "--growth-title": color.inkDeepSky,
        "--growth-blue": color.blueInk,
        "--growth-muted": color.muted,
        "--growth-serif": font.serif,
      } as CSSProperties}
    >
      <span className={styles.number} aria-hidden="true">06</span>
      <div className={styles.copy}>
        <h2 id="growth-chapter-heading">I started telling stories for <em>other people’s products.</em></h2>
        <p>I did <em>growth + content</em> for Notion, Stan, Polarity, and 1851 Labs, reaching <em>millions of views</em>. A lot of writing, editing, and experimenting for different kinds of products and audiences.</p>
      </div>
      <div ref={galleryRef} className={styles.gallery} data-growth-gallery>
        <figure className={`${styles.print} ${styles.stanPrint}`} data-growth-photo="stan">
          <Image
            src={stan}
            alt="Sunny standing beside the Stan office sign"
            sizes="(max-width: 850px) 230px, 260px"
            loading="eager"
          />
          <figcaption>Stan</figcaption>
        </figure>
        <figure className={`${styles.print} ${styles.polarityPrint}`} data-growth-photo="polarity">
          <Image
            src={polarity}
            alt="A group photo with the Polarity team"
            sizes="(max-width: 850px) 260px, 300px"
            loading="eager"
          />
          <figcaption>Polarity</figcaption>
        </figure>
      </div>
    </article>
  );
}
