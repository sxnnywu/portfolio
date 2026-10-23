import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import waterloo from "@/public/assets/logos/waterloo.png";
import laurier from "@/public/assets/logos/laurier.png";
import { color, font, rule } from "@/lib/tokens";
import styles from "./UniversityChapter.module.css";

interface UniversityChapterProps {
  chapterRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
}

export default function UniversityChapter({ chapterRef, galleryRef }: UniversityChapterProps) {
  return (
    <article
      ref={chapterRef}
      data-university-chapter
      className={styles.chapter}
      aria-labelledby="university-chapter-heading"
      style={{
        "--university-paper": color.paper,
        "--university-body": color.body,
        "--university-title": color.inkDeepSky,
        "--university-blue": color.blueInk,
        "--university-muted": color.muted,
        "--university-rule": rule.hairlineLight,
        "--university-serif": font.serif,
      } as CSSProperties}
    >
      <span className={styles.number} aria-hidden="true">04</span>
      <div className={styles.copy}>
        <h2 id="university-chapter-heading">Suddenly, I had <em>another subject</em> I wanted to spend years learning.</h2>
        <p>So my university plans became a little more ambitious. I’m studying <em>computer science</em> at Waterloo and <em>business</em> at Lazaridis.</p>
      </div>
      <div ref={galleryRef} className={styles.gallery} data-university-gallery>
        <section className={`${styles.sheet} ${styles.csSheet}`} aria-label="Computer science at the University of Waterloo">
          <div className={styles.sheetHeader}>
            <Image src={waterloo} alt="" width={44} height={44} loading="eager" className={styles.logo} />
            <span className={styles.degree}>CS</span>
          </div>
          <h3>Computer science</h3>
          <p className={styles.school}>University of Waterloo</p>
        </section>
        <span className={styles.ampersand} aria-hidden="true">&amp;</span>
        <section className={`${styles.sheet} ${styles.bbaSheet}`} aria-label="Business administration at Lazaridis School of Business, Wilfrid Laurier University">
          <div className={styles.sheetHeader}>
            <Image src={laurier} alt="" width={44} height={44} loading="eager" className={styles.logo} />
            <span className={styles.degree}>BBA</span>
          </div>
          <h3>Business administration</h3>
          <p className={styles.school}>Lazaridis School of Business</p>
          <p className={styles.university}>Wilfrid Laurier University</p>
        </section>
      </div>
    </article>
  );
}
