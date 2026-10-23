import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import teamDinner from "@/public/assets/story/blueprint/team-dinner.jpg";
import { color, font } from "@/lib/tokens";
import styles from "./BlueprintChapter.module.css";

interface BlueprintChapterProps {
  chapterRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
}

export default function BlueprintChapter({ chapterRef, galleryRef }: BlueprintChapterProps) {
  return (
    <article
      ref={chapterRef}
      data-blueprint-chapter
      className={styles.chapter}
      aria-labelledby="blueprint-chapter-heading"
      style={{
        "--blueprint-paper": color.paper,
        "--blueprint-body": color.body,
        "--blueprint-title": color.inkDeepSky,
        "--blueprint-blue": color.blueInk,
        "--blueprint-muted": color.muted,
        "--blueprint-serif": font.serif,
      } as CSSProperties}
    >
      <span className={styles.number} aria-hidden="true">09</span>
      <div className={styles.copy}>
        <h2 id="blueprint-chapter-heading">I kept building, this time as a <em>product manager.</em></h2>
        <p className={styles.intro}>I joined UW Blueprint to build <em>pro bono software</em> for nonprofits.</p>
        <p className={styles.listLabel}>That looked like:</p>
        <ul className={styles.work}>
          <li>Scoping the product through <em>12+ hours of client discovery</em>.</li>
          <li>Defining <em>13 core workflows</em> into technical requirements.</li>
          <li>Leading <em>10 engineers and designers</em> through <em>7 sprints</em>.</li>
        </ul>
        <p className={styles.closing}>We built an event management platform for a nonprofit serving <em>10k+ members</em>.</p>
      </div>
      <div ref={galleryRef} className={styles.gallery} data-blueprint-gallery>
        <figure className={`${styles.print} ${styles.dinnerPrint}`} data-blueprint-photo="team-dinner">
          <Image src={teamDinner} alt="The UW Blueprint team together outside Kinton Ramen" sizes="(max-width: 850px) 392px, 450px" loading="eager" />
        </figure>
      </div>
    </article>
  );
}
