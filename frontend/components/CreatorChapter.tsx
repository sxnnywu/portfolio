import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import { contentPhones } from "@/lib/data";
import { color, font } from "@/lib/tokens";
import styles from "./CreatorChapter.module.css";

interface CreatorChapterProps {
  chapterRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
}

export default function CreatorChapter({ chapterRef, galleryRef }: CreatorChapterProps) {
  return (
    <article
      ref={chapterRef}
      data-creator-chapter
      className={styles.chapter}
      aria-labelledby="creator-chapter-heading"
      style={{
        "--creator-paper": color.paper,
        "--creator-body": color.body,
        "--creator-title": color.inkDeepSky,
        "--creator-blue": color.blueInk,
        "--creator-muted": color.muted,
        "--creator-serif": font.serif,
      } as CSSProperties}
    >
      <span className={styles.number} aria-hidden="true">05</span>
      <div className={styles.copy}>
        <h2 id="creator-chapter-heading">Then I started thinking out loud on the <em>internet.</em></h2>
        <p>Apparently, two degrees weren’t enough to keep me busy. I took the storytelling <em>online</em>. I post about student life, careers, fashion to an audience of <em>15k followers</em>.</p>
      </div>
      <div ref={galleryRef} className={styles.gallery} data-creator-gallery>
        {contentPhones.map((phone, index) => phone.profile && (
          <a
            key={phone.platform}
            href={phone.profile}
            target="_blank"
            rel="noopener noreferrer"
            data-creator-profile={index}
            className={styles.profile}
            aria-label={`${phone.platform} profile (opens in a new tab)`}
            style={{ "--creator-tilt": `${phone.rotate}deg` } as CSSProperties}
          >
            <div className={styles.phone} aria-hidden="true">
              <div className={styles.slit} />
              <div className={styles.screen}>
                <Image
                  src={phone.screenshot.src}
                  alt=""
                  width={phone.screenshot.width}
                  height={phone.screenshot.height}
                  sizes="(max-width: 850px) 200px, 240px"
                  loading="lazy"
                />
              </div>
            </div>
            <span className={styles.platform}>{phone.platform} <span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
    </article>
  );
}
