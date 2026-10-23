import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import godseye from "@/public/assets/story/hackathons/godseye.jpg";
import slicefund from "@/public/assets/story/hackathons/slicefund.jpg";
import postIt from "@/public/assets/story/hackathons/post-it.jpg";
import { color, font, rule } from "@/lib/tokens";
import styles from "./HackathonChapter.module.css";

interface HackathonChapterProps {
  chapterRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
}

const projects = [
  {
    id: "godseye",
    name: "GodsEye",
    image: godseye,
    alt: "GodsEye prediction market analysis interface",
    description: "AI agents that debate prediction markets",
    award: "YHack · Best Use of Polymarket",
    href: "https://devpost.com/software/godseye-uwma5h",
  },
  {
    id: "slicefund",
    name: "Slicefund",
    image: slicefund,
    alt: "Slicefund prediction market interface",
    description: "ETFs for prediction markets",
    award: "Hack Canada · Best Use of Solana",
    href: "https://devpost.com/software/slicefund",
  },
  {
    id: "post-it",
    name: "Post-It",
    image: postIt,
    alt: "Post-It augmented reality sticky notes in a real-world setting",
    description: "AR sticky notes anchored to real places",
    award: "Hack the North · Top 32",
    href: "https://devpost.com/software/post-it-jrswqx",
  },
] as const;

export default function HackathonChapter({ chapterRef, galleryRef }: HackathonChapterProps) {
  return (
    <article
      ref={chapterRef}
      data-hackathon-chapter
      className={styles.chapter}
      aria-labelledby="hackathon-chapter-heading"
      style={{
        "--hack-paper": color.paper,
        "--hack-body": color.body,
        "--hack-title": color.inkDeepSky,
        "--hack-blue": color.blueInk,
        "--hack-muted": color.muted,
        "--hack-gold": color.goldInk,
        "--hack-rule": rule.hairlineLight,
        "--hack-serif": font.serif,
      } as CSSProperties}
    >
      <span className={styles.number} aria-hidden="true">03</span>
      <div className={styles.copy}>
        <h2 id="hackathon-chapter-heading">Then my friends dragged me to a <em>hackathon.</em></h2>
        <p>I didn’t know how to code. But I <em>fell in love with building</em>, and decided that was a pretty good reason to learn. Many weekends and a lot of learning later, I’ve picked up <em>three hackathon wins</em>.</p>
      </div>
      <div ref={galleryRef} className={styles.gallery} data-hackathon-gallery>
        {projects.map((project) => (
          <a
            key={project.id}
            data-hackathon-project={project.id}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.project}
            aria-label={`${project.name} on Devpost (opens in a new tab)`}
            aria-describedby={`hack-${project.id}-description hack-${project.id}-award`}
          >
            <div className={styles.chrome}>
              <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
              <span className={styles.projectName}>{project.name}</span>
              <span className={styles.externalArrow} aria-hidden="true">↗</span>
            </div>
            <Image
              src={project.image}
              alt={project.alt}
              sizes="(max-width: 850px) 340px, 420px"
              loading="eager"
              className={styles.screenshot}
            />
            <div className={styles.projectDetails}>
              <p id={`hack-${project.id}-description`}>{project.description}</p>
              <span id={`hack-${project.id}-award`} className={styles.award}>{project.award}</span>
            </div>
          </a>
        ))}
      </div>
    </article>
  );
}
