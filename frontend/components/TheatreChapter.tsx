import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import curtainCall from "@/public/assets/story/curtain-call.jpg";
import danceKids from "@/public/assets/story/dance-kids.jpg";
import backstage from "@/public/assets/story/backstage.jpg";
import { color, font } from "@/lib/tokens";
import styles from "./TheatreChapter.module.css";

interface TheatreChapterProps {
  chapterRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
}

export default function TheatreChapter({ chapterRef, galleryRef }: TheatreChapterProps) {
  return (
    <article
      ref={chapterRef}
      data-theatre-chapter
      className={styles.chapter}
      aria-labelledby="theatre-chapter-heading"
      style={{
        "--theatre-paper": color.paper,
        "--theatre-body": color.body,
        "--theatre-title": color.inkDeepSky,
        "--theatre-blue": color.blueInk,
        "--theatre-muted": color.muted,
        "--theatre-serif": font.serif,
      } as CSSProperties}
    >
      <span className={styles.number} aria-hidden="true">01</span>
      <div ref={galleryRef} className={styles.gallery}>
        <figure className={`${styles.print} ${styles.mainPrint}`}>
          <Image src={curtainCall} alt="Sunny and the cast taking a curtain call for a school play" sizes="(max-width: 850px) 340px, 440px" />
        </figure>
        <figure className={`${styles.print} ${styles.childhoodPrint}`}>
          <Image src={danceKids} alt="Sunny performing in a childhood dance show" sizes="(max-width: 850px) 150px, 199px" />
        </figure>
        <figure className={`${styles.print} ${styles.backstagePrint}`}>
          <Image src={backstage} alt="Backstage before a performance" sizes="(max-width: 850px) 151px, 216px" />
        </figure>
      </div>
      <div className={styles.copy}>
        <h2 id="theatre-chapter-heading">I grew up on <em>stage.</em></h2>
        <p>Dance, singing, and just about every Asian instrument. <em>Missing school for shows</em> was pretty normal; by high school, I was <em>directing plays.</em></p>
        <p className={styles.business}>I thought I’d build a career in <em>business</em> around what I loved and did well: <em>storytelling.</em></p>
      </div>
    </article>
  );
}
