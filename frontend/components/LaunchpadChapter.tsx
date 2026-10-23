import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import moment from "@/public/assets/story/launchpad/moment.jpg";
import lodge from "@/public/assets/story/launchpad/lodge.jpg";
import selfie from "@/public/assets/story/launchpad/selfie.jpg";
import { color, font } from "@/lib/tokens";
import styles from "./LaunchpadChapter.module.css";

interface LaunchpadChapterProps {
  chapterRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
}

export default function LaunchpadChapter({ chapterRef, galleryRef }: LaunchpadChapterProps) {
  return (
    <article
      ref={chapterRef}
      data-launchpad-chapter
      className={styles.chapter}
      aria-labelledby="launchpad-chapter-heading"
      style={{
        "--launchpad-paper": color.paper,
        "--launchpad-body": color.body,
        "--launchpad-title": color.inkDeepSky,
        "--launchpad-blue": color.blueInk,
        "--launchpad-muted": color.muted,
        "--launchpad-serif": font.serif,
      } as CSSProperties}
    >
      <span className={styles.number} aria-hidden="true">11</span>
      <div className={styles.copy}>
        <h2 id="launchpad-chapter-heading">Then I took oro on a <em>startup reality show.</em></h2>
        <p className={styles.description}>I spent <em>two weeks</em> at Stan Launchpad rebuilding, launching, and monetizing <em>oro on iMessage</em>, and competing for a <em>$100k prize</em>.</p>
        <p className={styles.revenue}>oro generated <em>$1,800 in revenue</em>.</p>
      </div>
      <div ref={galleryRef} className={styles.gallery} data-launchpad-gallery>
        <figure className={`${styles.print} ${styles.momentPrint}`} data-launchpad-photo="moment">
          <Image src={moment} alt="Sunny with another contestant at the Stan Launchpad lodge" sizes="(max-width: 850px) 250px, 300px" loading="eager" />
        </figure>
        <figure className={`${styles.print} ${styles.lodgePrint}`} data-launchpad-photo="lodge">
          <Image src={lodge} alt="A photo from the Stan Launchpad lodge" sizes="(max-width: 850px) 190px, 230px" loading="eager" />
        </figure>
        <figure className={`${styles.print} ${styles.groupPrint}`} data-launchpad-photo="group">
          <div className={styles.groupWindow}>
            <Image src="/assets/story/launchpad/group.jpg" alt="A group photo at Stan Launchpad" width={1920} height={1440} unoptimized loading="eager" />
          </div>
        </figure>
        <figure className={`${styles.print} ${styles.selfiePrint}`} data-launchpad-photo="selfie">
          <Image src={selfie} alt="A selfie from Stan Launchpad" sizes="(max-width: 850px) 180px, 210px" loading="eager" />
        </figure>
      </div>
    </article>
  );
}
