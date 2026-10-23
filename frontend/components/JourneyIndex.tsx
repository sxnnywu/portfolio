import type { CSSProperties, RefObject } from "react";
import Link from "next/link";
import Bloom from "@/components/Bloom";
import { navRows } from "@/lib/data";
import { color, skyTint, type } from "@/lib/tokens";
import styles from "./JourneyIndex.module.css";

export default function JourneyIndex({ chapterRef }: {
  chapterRef: RefObject<HTMLElement | null>;
}) {
  return (
    <nav
      ref={chapterRef}
      id="work"
      data-journey-index
      aria-labelledby="journey-index-heading"
      className={styles.chapter}
    >
      <h2 id="journey-index-heading" className={styles.heading} style={{ color: color.muted }}>
        Want the longer version?
      </h2>
      <div className={styles.rows} data-index-rows>
        {navRows.map(({ href, title, blurb, tint, bloom }, index) => (
          <div
            key={href}
            data-index-card
            className={styles.rowSlot}
            style={{
              zIndex: navRows.length - index,
              "--stack-x": `${[0, 12, -9, 7][index]}px`,
              "--stack-turn": `${[-5, 3, -2, 5][index]}deg`,
              "--label-progress": `var(--index-label-${index}, 1)`,
            } as CSSProperties}
          >
            <Link
              data-navrow
              href={href}
              className={styles.row}
              style={{ background: skyTint(tint), color: "inherit" }}
            >
              <Bloom color={bloom} />
              <span className={styles.label} style={{ ...type.sectionTitle, fontSize: "var(--index-title-size, clamp(26px, 3vw, 38px))" }}>{title}</span>
              <span className={styles.blurb} style={{ color: color.skyInkLight }}>{blurb}</span>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
