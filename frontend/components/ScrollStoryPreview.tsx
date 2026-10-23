"use client";

import { Fragment, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Cloud from "@/components/Cloud";
import HeroCTA from "@/components/HeroCTA";
import HeroRoles from "@/components/HeroRoles";
import Logo from "@/components/Logo";
import Sun, { SunFilterDefs } from "@/components/Sun";
import Typed, { afterTyping, sequenceEnd } from "@/components/Typed";
import { education, heroHeadline, heroTagline } from "@/lib/data";
import styles from "./ScrollStoryPreview.module.css";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number, start: number, end: number) => {
  const p = clamp((value - start) / (end - start));
  return p * p * (3 - 2 * p);
};

function Accent({ index, children }: { index: number; children: ReactNode }) {
  return (
    <em className={styles.accent} style={{ "--draw": `var(--draw-${index},0)` } as CSSProperties}>
      {children}
      <svg className={styles.underline} viewBox="0 0 120 10" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 6C31 2 73 3 118 4.5" />
      </svg>
    </em>
  );
}

/** One native scroll position advances the entire pinned composition. */
export default function ScrollStoryPreview() {
  const pageRef = useRef<HTMLElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const runway = runwayRef.current;
    const stage = stageRef.current;
    const photo = photoRef.current;
    const intro = introRef.current;
    const hero = heroRef.current;
    const sun = sunRef.current;
    if (!page || !runway || !stage || !photo || !intro || !hero || !sun) return;

    const linear = window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 540px)");
    let frame: number | null = null;
    let start = 0;
    let travel = 1;
    let height = 1;
    let width = 1;
    let photoCenter = 0;
    let sunEndX = 0;
    let sunEndY = 0;

    const paint = () => {
      frame = null;
      const p = clamp((window.scrollY - start) / travel);
      const still = linear.matches;
      const leave = still ? 0 : ease(p, 0.015, 0.25);
      // One diagonal path and speed curve, with no handoff between cloud phases.
      const cloudTravel = still ? 0 : ease(p, 0, 0.4);
      const farTravel = cloudTravel * Math.max(300, height * 0.75);
      const midTravel = cloudTravel * Math.max(520, height * 0.85);
      const nearTravel = cloudTravel * (height + 350);
      const arrival = still ? 1 : ease(p, 0.16, 0.34);
      const placement = still ? 1 : ease(p, 0.36, 0.57);
      const sunlight = still ? 0 : ease(p, 0.04, 0.6);
      const story = still ? 1 : ease(p, 0.44, 0.73);
      const education = still ? 1 : ease(p, 0.71, 0.83);
      const values: Record<string, string | number> = {
        "--progress": p,
        "--sky-opacity": still ? 1 : 1 - ease(p, 0.12, 0.55),
        "--hero-y": `${-leave * height * 0.32}px`,
        "--hero-scale": 1 - leave * 0.07,
        "--hero-opacity": still ? 1 : 1 - ease(p, 0.065, 0.245),
        "--hero-blur": `${leave * 3}px`,
        "--cue-opacity": still ? 0 : 1 - ease(p, 0.005, 0.085),
        "--cloud-opacity": still ? 0.4 : 1 - ease(p, 0.36, 0.55),
        "--far-x": `${-farTravel * 0.18}px`,
        "--far-y": `${-farTravel}px`,
        "--mid-x": `${-midTravel * 0.18}px`,
        "--mid-y": `${-midTravel}px`,
        "--near-x": `${-nearTravel * 0.18}px`,
        "--near-y": `${90 - nearTravel}px`,
        "--sun-x": `${sunlight * sunEndX + Math.sin(sunlight * Math.PI) * width * 0.19}px`,
        "--sun-y": `${sunlight * sunEndY - Math.sin(sunlight * Math.PI) * height * 0.05}px`,
        "--sun-turn": `${sunlight * 115}deg`,
        "--sun-scale": 1 - sunlight * 0.74,
        "--sun-opacity": 1,
        "--photo-y": `${still ? 0 : (1 - arrival) * height * 0.85 + (1 - placement) * (height * 0.52 - photoCenter)}px`,
        "--photo-scale": 1.7 - placement * 0.7,
        "--photo-turn": `${10 - placement * 15}deg`,
        "--photo-opacity": arrival,
        "--photo-shadow": 0.35 + placement * 0.65,
        "--story-y": `${(1 - story) * 70}px`,
        "--education-opacity": education,
        "--education-y": `${(1 - education) * 35}px`,
      };
      for (let i = 0; i < 3; i++) {
        values[`--clause-${i}`] = still ? 1 : ease(p, 0.48 + i * 0.065, 0.59 + i * 0.065);
      }
      for (let i = 0; i < 4; i++) {
        values[`--draw-${i}`] = still ? 1 : ease(p, 0.55 + i * 0.05, 0.64 + i * 0.05);
      }
      for (const [key, value] of Object.entries(values)) page.style.setProperty(key, String(value));
      // Hidden hero controls leave the keyboard order as the story takes over.
      hero.inert = !still && p > 0.245;
      hero.setAttribute("aria-hidden", String(!still && p > 0.245));
      intro.setAttribute("aria-hidden", String(!still && p < 0.18));
    };
    const schedule = () => { if (frame === null) frame = window.requestAnimationFrame(paint); };
    const measure = () => {
      const stageBox = stage.getBoundingClientRect();
      const photoBox = photo.getBoundingClientRect();
      start = runway.getBoundingClientRect().top + window.scrollY;
      travel = Math.max(1, runway.offsetHeight - stage.clientHeight);
      height = stage.clientHeight;
      width = stage.clientWidth;
      photoCenter = photoBox.top - stageBox.top + photoBox.height / 2;
      sunEndX = photoBox.right - stageBox.left - width / 2 + 4;
      sunEndY = photoBox.top - stageBox.top + 16 - sun.offsetTop - 58;
      schedule();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    resize.observe(intro);
    if (intro.firstElementChild) resize.observe(intro.firstElementChild);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    linear.addEventListener("change", measure);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      linear.removeEventListener("change", measure);
      resize.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main ref={pageRef} className={styles.page} data-scroll-story>
      <SunFilterDefs />
      <header className={styles.labBar}>
        <Link href="/" className={styles.backLink}>← Portfolio</Link>
        <span className={styles.label}>Scroll to unfold</span>
      </header>
      <div ref={runwayRef} className={styles.runway}>
        <div ref={stageRef} className={styles.stage}>
          <div className={styles.sky} aria-hidden="true" />
          <div className={styles.farClouds} aria-hidden="true">
            <div className={styles.cloudLeft}>
              <Cloud height={150} opacity={0.4} style={{ left: -170, top: 24 }} />
              <Cloud height={112} opacity={0.28} flipped style={{ left: 96, top: 2 }} />
            </div>
            <div className={styles.cloudRight}>
              <Cloud height={134} opacity={0.32} flipped style={{ right: -140, top: 110 }} />
              <Cloud height={104} opacity={0.22} style={{ right: 120, top: -30 }} />
            </div>
          </div>
          <div className={styles.midClouds} aria-hidden="true">
            <div className={styles.cloudLeft}>
              <Cloud height={196} opacity={0.72} style={{ left: -190, top: 120 }} />
              <Cloud height={150} opacity={0.5} flipped style={{ left: -60, top: 250 }} />
            </div>
            <div className={styles.cloudRight}>
              <Cloud height={206} opacity={0.7} flipped style={{ right: -180, top: 168 }} />
              <Cloud height={156} opacity={0.48} style={{ right: -70, top: 298 }} />
            </div>
          </div>
          <div className={styles.heroAnchor}>
            <div ref={heroRef} className={styles.heroCopy}>
              <Typed as="h1" className={styles.greeting} text={heroHeadline}>
                Hey, I&apos;m <span className={styles.signature}>Sunny</span>
              </Typed>
              <Typed as="p" className={styles.tagline} text={heroTagline} delay={sequenceEnd(heroHeadline.length)}>
                a <em>theatre kid</em> with a <a href="https://github.com/sxnnywu" target="_blank" rel="noopener noreferrer" className={styles.githubLink}>GitHub</a>
              </Typed>
              <div className={styles.roles}><HeroRoles delay={sequenceEnd(heroHeadline.length, heroTagline.length)} /></div>
              <div className={styles.cta}>
                <div data-after-type style={afterTyping(heroHeadline.length, heroTagline.length)}><HeroCTA preview /></div>
              </div>
            </div>
          </div>
          <div ref={introRef} className={styles.introComposition}>
            <div className={styles.introInner}>
              <div ref={photoRef} className={styles.photoAnchor}>
                <figure className={styles.polaroid}>
                  <div className={styles.photoWindow}>
                    <Image className={styles.portrait} src="/assets/sunny-portrait.jpg" alt="Sunny Wu" width={747} height={887} sizes="280px" />
                  </div>
                </figure>
              </div>
              <p className={styles.story}>
                <span className={styles.clause} style={{ "--clause": "var(--clause-0,0)" } as CSSProperties}>I grew up in the <Accent index={0}>performing arts</Accent>, </span>
                <span className={styles.clause} style={{ "--clause": "var(--clause-1,0)" } as CSSProperties}>learned to <Accent index={1}>code</Accent> at a <Accent index={2}>hackathon</Accent> my friends dragged me to, </span>
                <span className={styles.clause} style={{ "--clause": "var(--clause-2,0)" } as CSSProperties}>and have been finding excuses to <Accent index={3}>build things</Accent> ever since.</span>
              </p>
              <div className={styles.education}>
                {education.map(({ program, school, logo }, index) => (
                  <Fragment key={program}>
                    {index > 0 && <span className={styles.divider} aria-hidden="true" />}
                    <span className={styles.school}><Logo src={logo} size={26} /><span>{program}<br /><em>{school}</em></span></span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.nearClouds} aria-hidden="true">
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
          <div ref={sunRef} className={styles.sun} aria-hidden="true"><Sun /></div>
          <span className={styles.cue}>
            <span data-after-type style={afterTyping(heroHeadline.length, heroTagline.length)}>Scroll to unfold ↓</span>
          </span>
        </div>
      </div>
      <footer className={styles.end}>
        <h2 className={styles.endTitle}>End of preview</h2>
        <p className={styles.endText}>Scroll back to reverse it, or start again.</p>
        <button type="button" className={styles.replay} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>Replay ↑</button>
        <Link href="/" className={styles.homeLink}>Back to the portfolio</Link>
      </footer>
      <div className={styles.progress} aria-hidden="true" />
    </main>
  );
}
