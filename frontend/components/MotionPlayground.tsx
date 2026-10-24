"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Cloud from "@/components/Cloud";
import HeroCTA from "@/components/HeroCTA";
import HeroRoles from "@/components/HeroRoles";
import Logo from "@/components/Logo";
import Sun from "@/components/Sun";
import { education } from "@/lib/data";
import { gradient } from "@/lib/tokens";
import styles from "./MotionPlayground.module.css";

const studies = [
  { id: "clouds", name: "Clouds part", description: "The foreground opens like a curtain, making room for the story." },
  { id: "landing", name: "The polaroid lands", description: "A little drift, a gentle turn, then the photo settles onto the page." },
  { id: "ink", name: "Follow the ink", description: "Your scroll draws a handwritten path from the sky to the photo." },
  { id: "sun", name: "The sun takes a journey", description: "The sun follows you down, becoming a little signature beside the print." },
  { id: "develop", name: "The photo develops", description: "A pale photograph slowly develops its colour and contrast." },
  { id: "annotate", name: "The story gets annotated", description: "Blue ink underlines the key moments as you scroll through the sentence." },
  { id: "camera", name: "A gentle camera pullback", description: "The sky recedes and its layers spread, opening up the space below." },
  { id: "combined", name: "The combined sequence", description: "Clouds clear, the photo lands, then the story gains its blue annotations." },
] as const;

type StudyId = (typeof studies)[number]["id"];
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const phase = (value: number, from: number, to: number) => {
  const p = clamp((value - from) / (to - from));
  return p * p * (3 - 2 * p);
};

function Accent({ index, children }: { index: number; children: ReactNode }) {
  return (
    <em className={styles.accent} style={{ "--accent": `var(--accent-${index})` } as CSSProperties}>
      {children}
      <svg className={styles.underline} viewBox="0 0 120 10" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M2 6C31 2 73 3 118 4.5" />
      </svg>
    </em>
  );
}

/** An isolated, full-size comparison. Scroll values never enter React state. */
export default function MotionPlayground() {
  const [selected, setSelected] = useState(0);
  const root = useRef<HTMLElement>(null);
  const hero = useRef<HTMLElement>(null);
  const sun = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLParagraphElement>(null);
  const active = studies[selected];

  useEffect(() => {
    const page = root.current;
    const sky = hero.current;
    const print = photo.current;
    const paragraph = story.current;
    if (!page || !sky || !print || !paragraph) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;
    const mode: StudyId = active.id;
    const paint = () => {
      frame = null;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const height = sky.offsetHeight;
      const heroProgress = y / height;
      const photoBox = print.getBoundingClientRect();
      const photoProgress = phase((vh - photoBox.top) / vh, 0.12, 0.68);
      const storyProgress = phase((vh - paragraph.getBoundingClientRect().top) / vh, 0.3, 0.78);
      const moving = !reduce.matches;
      const opening = moving && (mode === "clouds" || mode === "combined" || mode === "camera");
      const landing = moving && (mode === "landing" || mode === "combined");
      const developing = moving && mode === "develop";
      const inking = moving && mode === "ink";
      const travelling = moving && mode === "sun";
      const camera = moving && mode === "camera";
      const spread = opening ? phase(heroProgress, 0.06, 1.05) : 0;
      const retreat = camera ? phase(heroProgress, 0, 0.92) : 0;
      const sunArrival = Math.max(height * 0.65, photoBox.top + y - vh * 0.36);
      const sunProgress = travelling ? phase(y, 0, sunArrival) : 0;
      const sunTargetY = photoBox.top + y + 24 - (sun.current?.offsetTop ?? height * 0.11) - 58;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const values: Record<string, number | string> = {
        "--progress": clamp(y / maxScroll),
        "--hero-y": `${moving ? -y * (camera ? 0.22 : 0.12) : 0}px`,
        "--hero-opacity": moving ? 1 - phase(heroProgress, 0.34, 0.92) : 1,
        "--far-x": spread * Math.min(90, vw * 0.09),
        "--far-y": moving ? -Math.min(y, height * 1.3) * 0.06 : 0,
        "--mid-x": spread * Math.min(160, vw * 0.18),
        "--mid-y": moving ? -Math.min(y, height * 1.3) * 0.12 : 0,
        "--near-x": spread * Math.min(310, vw * 0.42),
        "--near-y": moving ? -Math.min(y, height * 1.3) * 0.2 : 0,
        "--sky-scale": 1 - retreat * 0.1,
        "--sun-x": sunProgress * (print.offsetWidth * 0.7 + 25),
        "--sun-y": travelling ? sunProgress * sunTargetY + Math.sin(sunProgress * Math.PI) * 42 : 0,
        "--sun-turn": `${sunProgress * 85}deg`,
        "--sun-scale": 1 - sunProgress * 0.58,
        "--sun-opacity": 1,
        "--photo-y": `${landing ? (1 - photoProgress) * 58 : 0}px`,
        "--photo-turn": `${landing ? -15 + photoProgress * 10 : -5}deg`,
        "--photo-scale": landing ? 0.94 + photoProgress * 0.06 : 1,
        "--photo-opacity": developing ? 0.16 + photoProgress * 0.84 : 1,
        "--photo-saturation": developing ? 0.12 + photoProgress * 0.88 : 1,
        "--photo-contrast": developing ? 0.5 + photoProgress * 0.5 : 1,
        "--paper-shadow": landing || developing ? 0.4 + photoProgress * 0.6 : 1,
        "--ink-dash": inking ? 1 - phase(heroProgress, 0.18, 1.05) : 1,
        "--ink-opacity": inking ? 1 : 0,
      };
      for (let i = 0; i < 4; i++) {
        values[`--accent-${i}`] = moving && (mode === "annotate" || mode === "combined")
          ? phase(storyProgress, i * 0.19, i * 0.19 + 0.38) : 0;
      }
      const pixels = new Set(["--far-x", "--far-y", "--mid-x", "--mid-y", "--near-x", "--near-y", "--sun-x", "--sun-y"]);
      for (const [key, value] of Object.entries(values)) {
        page.style.setProperty(key, pixels.has(key) ? `${value}px` : String(value));
      }
    };
    const schedule = () => { if (frame === null) frame = window.requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [active.id]);

  function choose(index: number) {
    setSelected((index + studies.length) % studies.length);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <main ref={root} className={styles.page} data-motion-playground data-mode={active.id}>
      <header className={styles.toolbar}>
        <Link href="/" className={styles.backLink}>← Portfolio</Link>
        <div className={styles.chooser}>
          <label htmlFor="motion-option" className={styles.stepLabel}>
            Scroll studies · {String(selected + 1).padStart(2, "0")} / 08
          </label>
          <button type="button" className={styles.nextButton} aria-label="Previous motion idea" onClick={() => choose(selected - 1)}>←</button>
          <select id="motion-option" className={styles.select} value={selected} onChange={(event) => choose(Number(event.target.value))}>
            {studies.map((study, index) => <option key={study.id} value={index}>{String(index + 1).padStart(2, "0")} · {study.name}</option>)}
          </select>
          <button type="button" className={styles.nextButton} aria-label="Next motion idea" onClick={() => choose(selected + 1)}>→</button>
        </div>
        <div className={styles.titlePanel} aria-live="polite">
          <p className={styles.modeName}>{active.name}</p>
          <p className={styles.modeDescription}>{active.description}</p>
        </div>
        <div className={styles.progress} aria-hidden="true"><div className={styles.progressFill} /></div>
      </header>

      <section ref={hero} className={styles.hero} style={{ background: gradient.heroSky }} aria-label="Hero preview">
        <div className={styles.atmosphere} aria-hidden="true">
          <div className={styles.farClouds}>
            <div className={styles.cloudLeft}>
              <Cloud height={150} opacity={0.4} style={{ left: -170, top: 24 }} />
              <Cloud height={112} opacity={0.28} flipped style={{ left: 96, top: 2 }} />
            </div>
            <div className={styles.cloudRight}>
              <Cloud height={134} opacity={0.32} flipped style={{ right: -140, top: 110 }} />
              <Cloud height={104} opacity={0.22} style={{ right: 120, top: -30 }} />
            </div>
          </div>
          <div className={styles.midClouds}>
            <div className={styles.cloudLeft}>
              <Cloud height={196} opacity={0.72} style={{ left: -190, top: 120 }} />
              <Cloud height={150} opacity={0.5} flipped style={{ left: -60, top: 250 }} />
            </div>
            <div className={styles.cloudRight}>
              <Cloud height={206} opacity={0.7} flipped style={{ right: -180, top: 168 }} />
              <Cloud height={156} opacity={0.48} style={{ right: -70, top: 298 }} />
            </div>
          </div>
          <div className={styles.nearClouds}>
            <div className={styles.cloudLeft}>
              <Cloud masked height={224} opacity={0.96} style={{ left: -200, bottom: -10 }} />
              <Cloud masked height={186} opacity={0.9} flipped style={{ left: -20, bottom: -52 }} />
              <Cloud masked height={212} opacity={0.94} style={{ left: 210, bottom: -74 }} />
            </div>
            <div className={styles.cloudRight}>
              <Cloud masked height={220} opacity={0.96} flipped style={{ right: -200, bottom: -12 }} />
              <Cloud masked height={188} opacity={0.9} style={{ right: -20, bottom: -40 }} />
              <Cloud masked height={214} opacity={0.94} flipped style={{ right: 210, bottom: -72 }} />
            </div>
          </div>
        </div>
        <div ref={sun} className={styles.sun} aria-hidden="true"><Sun /></div>
        <div className={styles.heroCopy}>
          <h1 className={styles.greeting}>Hey, I&apos;m <span className={styles.signature}>Sunny</span></h1>
          <p className={styles.tagline}>a <em>theatre kid</em> with a GitHub</p>
          <div className={styles.roles}><HeroRoles delay={0} /></div>
          <div className={styles.cta}><HeroCTA preview /></div>
        </div>
        <a href="#motion-intro" className={styles.scrollCue}>Scroll to explore ↓ <span className={styles.hint}>Back up to rewind</span></a>
      </section>

      <section id="motion-intro" className={styles.intro} aria-label="Introduction preview">
        <svg className={styles.trail} viewBox="0 0 220 260" fill="none" aria-hidden="true">
          <path className={styles.trailPath} pathLength="1" d="M110 6C110 48 166 48 164 78C162 110 68 102 65 134C62 173 119 160 113 197C111 214 108 228 108 242M102 232L108 242L117 234" />
        </svg>
        <div ref={photo} className={styles.photoWrap}>
          <figure className={styles.polaroid}>
            <Image className={styles.portrait} src="/assets/sunny-portrait.jpg" alt="Sunny Wu" width={747} height={887} sizes="152px" />
          </figure>
        </div>
        <p ref={story} className={styles.story}>
          I grew up in the <Accent index={0}>performing arts</Accent>, learned to <Accent index={1}>code</Accent> at a <Accent index={2}>hackathon</Accent> my friends dragged me to, and have been finding excuses to <Accent index={3}>build things</Accent> ever since.
        </p>
        <div className={styles.education}>
          {education.map(({ program, school, logo }, index) => (
            <Fragment key={program}>
              {index > 0 && <span className={styles.divider} aria-hidden="true" />}
              <span className={styles.school}><Logo src={logo} size={26} /><span>{program}<br /><em>{school}</em></span></span>
            </Fragment>
          ))}
        </div>
      </section>
      <footer className={styles.end}>
        <p className={styles.comparisonNote}>That&apos;s the transition. Try another idea above, or rewind this one.</p>
        <button type="button" className={styles.restartButton} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to start ↑</button>
        <button type="button" className={styles.restartButton} style={{ marginLeft: 12 }} onClick={() => choose(selected + 1)}>Next idea →</button>
      </footer>
    </main>
  );
}
