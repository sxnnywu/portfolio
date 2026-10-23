import type { Metadata } from "next";
import Link from "next/link";
import ButtonPlayground from "@/components/ButtonPlayground";
import Cloud from "@/components/Cloud";
import { color, font, gradient, layout } from "@/lib/tokens";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Button playground",
  robots: { index: false, follow: false },
};

export default function ButtonPlaygroundPage() {
  return (
    <main className={styles.page} style={{ background: gradient.heroSky }}>
      <div aria-hidden="true" data-decor className={styles.clouds}>
        <Cloud height={170} opacity={0.32} masked style={{ left: -130, top: 90 }} />
        <Cloud height={210} opacity={0.3} masked flipped style={{ right: -160, top: 200 }} />
      </div>
      <div className={styles.content} style={{ maxWidth: layout.maxWidth }}>
        <header className={styles.heading}>
          <p className={styles.eyebrow} style={{ color: color.skyInkLight }}>
            Hover, click, repeat.
          </p>
          <h1 style={{ fontFamily: font.serif, color: color.inkDeepSky }}>
            A little button <em>playground.</em>
          </h1>
          <p className={styles.intro} style={{ color: color.skyInk }}>
            Hover to try them, or tap Replay. Your combo is 02 + 04.
          </p>
        </header>
        <ButtonPlayground />
        <footer id="contact" className={styles.footer}>
          <Link href="/" style={{ color: color.skyInk }}>← Back to the portfolio</Link>
        </footer>
      </div>
    </main>
  );
}
