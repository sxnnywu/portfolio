import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import planning from "@/public/assets/story/pink-stairs-planning.jpg";
import carePackages from "@/public/assets/story/pink-stairs-care-packages.jpg";
import community from "@/public/assets/story/pink-stairs-community.jpg";
import { color, font } from "@/lib/tokens";
import styles from "./PinkStairsChapter.module.css";

interface PinkStairsChapterProps {
  chapterRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
}

export default function PinkStairsChapter({ chapterRef, galleryRef }: PinkStairsChapterProps) {
  return (
    <article
      ref={chapterRef}
      data-pink-stairs-chapter
      className={styles.chapter}
      aria-labelledby="pink-stairs-chapter-heading"
      style={{
        "--pink-paper": color.paper,
        "--pink-body": color.body,
        "--pink-title": color.inkDeepSky,
        "--pink-blue": color.blueInk,
        "--pink-muted": color.muted,
        "--pink-serif": font.serif,
      } as CSSProperties}
    >
      <span className={styles.number} aria-hidden="true">02</span>
      <div ref={galleryRef} className={styles.gallery}>
        <figure className={`${styles.print} ${styles.planningPrint}`}>
          <Image
            src={planning}
            alt="Sunny and a colleague collaborating at a table"
            sizes="(max-width: 850px) 300px, 420px"
            loading="eager"
          />
        </figure>
        <figure className={`${styles.print} ${styles.carePrint}`}>
          <Image
            src={carePackages}
            alt="Handwritten notes and scrunchies laid out for care packages"
            sizes="(max-width: 850px) 148px, 225px"
            loading="eager"
          />
        </figure>
        <figure className={`${styles.print} ${styles.communityPrint}`}>
          <Image
            src={community}
            alt="Sunny and the team speaking with visitors at The Pink Stairs table"
            sizes="(max-width: 850px) 160px, 220px"
            loading="eager"
          />
        </figure>
      </div>
      <div className={styles.copy}>
        <h2 id="pink-stairs-chapter-heading">I wanted to see more girls <em>running things.</em></h2>
        <p className={styles.description}>So I founded The Pink Stairs, a <em>feminist nonprofit</em>. I handled <em>everything</em> from content to volunteer operations.</p>
        <p className={styles.resultsLabel}>The results:</p>
        <ul className={styles.results}>
          <li>Grew our channels to <em>30M+ views</em></li>
          <li>Hired <em>300</em> volunteers across <em>26 countries</em></li>
          <li>Distributed <em>820</em> care packages to domestic violence survivors</li>
        </ul>
      </div>
    </article>
  );
}
