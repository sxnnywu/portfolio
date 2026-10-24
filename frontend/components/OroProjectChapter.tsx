import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import { color, font } from "@/lib/tokens";
import styles from "./OroProjectChapter.module.css";

interface OroProjectChapterProps {
  chapterRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
}

export default function OroProjectChapter({ chapterRef, galleryRef }: OroProjectChapterProps) {
  return (
    <article
      ref={chapterRef}
      data-oro-project-chapter
      className={styles.chapter}
      aria-labelledby="oro-project-chapter-heading"
      style={{
        "--oro-project-paper": color.paper,
        "--oro-project-body": color.body,
        "--oro-project-title": color.inkDeepSky,
        "--oro-project-blue": color.blueInk,
        "--oro-project-muted": color.muted,
        "--oro-project-serif": font.serif,
      } as CSSProperties}
    >
      <span className={styles.number} aria-hidden="true">07</span>
      <div className={styles.copy}>
        <h2 id="oro-project-chapter-heading">I thought an <em>AI stylist</em> would be fun to build.</h2>
        <p className={styles.intro}>With some friends, I started building <a className={styles.productLink} data-oro-project-link href="https://askoro.now" target="_blank" rel="noopener noreferrer">oro</a>.</p>
        <p className={styles.listLabel}>We built:</p>
        <ul className={styles.features}>
          <li>A <em>clothing segmentation system</em> to separate individual garments from photos.</li>
          <li>An <em>outfit recommendation system</em> using clothing attributes and embeddings.</li>
          <li>A <em>mobile app</em> that brought it all together.</li>
        </ul>
        <p className={styles.closing}>oro got <em>4,300+ downloads</em>.</p>
      </div>
      <div ref={galleryRef} className={styles.gallery} data-oro-project-gallery>
        <figure className={`${styles.print} ${styles.wardrobePrint}`} data-oro-project-screen="segmentation">
          <Image
            src="/assets/story/oro/clothing-extraction.png"
            alt="oro’s mobile app extracting an individual garment from an outfit photo"
            width={1237}
            height={2688}
            sizes="(max-width: 850px) 190px, 230px"
            loading="lazy"
            className={styles.screenshot}
          />
        </figure>
        <figure className={`${styles.print} ${styles.outfitsPrint}`} data-oro-project-screen="outfits">
          <Image
            src="/assets/story/oro/outfit-generation.png"
            alt="Outfit recommendations in oro’s mobile app"
            width={1237}
            height={2688}
            sizes="(max-width: 850px) 190px, 230px"
            loading="lazy"
            className={styles.screenshot}
          />
        </figure>
      </div>
    </article>
  );
}
