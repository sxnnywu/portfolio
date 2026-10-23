import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import rocketTeam from "@/public/assets/story/rocket-team.jpg";
import { color, font } from "@/lib/tokens";
import styles from "./RocketChapter.module.css";

interface RocketChapterProps {
  chapterRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
}

export default function RocketChapter({ chapterRef, galleryRef }: RocketChapterProps) {
  return (
    <article
      ref={chapterRef}
      data-rocket-chapter
      className={styles.chapter}
      aria-labelledby="rocket-chapter-heading"
      style={{
        "--rocket-paper": color.paper,
        "--rocket-body": color.body,
        "--rocket-title": color.inkDeepSky,
        "--rocket-blue": color.blueInk,
        "--rocket-muted": color.muted,
        "--rocket-serif": font.serif,
      } as CSSProperties}
    >
      <span className={styles.number} aria-hidden="true">08</span>
      <div className={styles.copy}>
        <h2 id="rocket-chapter-heading">Next came a summer of <em>software engineering</em> at Rocket.</h2>
        <p className={styles.listLabel}>What I shipped:</p>
        <ul className={styles.results}>
          <li>An <em>AI skill registry</em> for <em>5,400+</em> engineers.</li>
          <li>An <em>AI workflow</em> cutting manual QA time by <em>75%</em>.</li>
          <li><em>Site performance improvements</em> reducing latency by <em>55%</em> for a site with <em>600k+</em> monthly visitors.</li>
        </ul>
      </div>
      <div ref={galleryRef} className={styles.gallery} data-rocket-gallery>
        <figure className={styles.print}>
          <Image src={rocketTeam} alt="Sunny with the Rocket team" sizes="(max-width: 850px) 410px, 490px" loading="eager" />
        </figure>
      </div>
    </article>
  );
}
