"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Cloud from "@/components/Cloud";
import HeroCTA from "@/components/HeroCTA";
import { color, font, pill } from "@/lib/tokens";
import styles from "./ButtonPlayground.module.css";

const demos = [
  { id: "squishy", number: "04", title: "Squishy cloud", description: "A little pull. A very satisfying squish." },
  { id: "sparks", number: "06", title: "Little sparks", description: "An arrow with a little extra enthusiasm." },
  { id: "cloud", number: "07", title: "Passing cloud", description: "Just a small cloud passing through." },
  { id: "flourish", number: "08", title: "Handwritten flourish", description: "A quick scribble, for emphasis." },
  { id: "doodle", number: "02", title: "Doodle arrow", description: "A hand-drawn nudge in the right direction." },
] as const;

type Demo = (typeof demos)[number];

function Arrow({ variant }: { variant: Demo["id"] }) {
  return (
    <span className={styles.arrowSlot} aria-hidden="true">
      <svg className={styles.arrow} width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {variant === "doodle" && (
        <svg className={styles.doodleArrow} width="45" height="24" viewBox="0 0 45 24" fill="none">
          <path className={styles.doodleStem} pathLength="1" d="M2 13c8 2.5 14-3 22-2.5 6 .4 11 1.2 17-.5" />
          <path className={styles.doodleTip} pathLength="1" d="m33 4 9 6-8 8" />
        </svg>
      )}
    </span>
  );
}

function Decorations({ variant }: { variant: Demo["id"] }) {
  if (variant === "sparks") {
    return (
      <svg className={styles.sparks} width="54" height="52" viewBox="0 0 54 52" fill="none" aria-hidden="true">
        <path className={styles.sparkOne} pathLength="1" d="m13 20 3-10" />
        <path className={styles.sparkTwo} pathLength="1" d="m23 26 12-5" />
        <path className={styles.sparkThree} pathLength="1" d="m24 36 11 4" />
      </svg>
    );
  }
  if (variant === "cloud") {
    return (
      <span className={styles.cloudWindow} aria-hidden="true">
        <span className={styles.passingCloud}>
          <Cloud height={78} opacity={0.95} masked style={{ left: 0, top: 0, maxWidth: "none" }} />
        </span>
      </span>
    );
  }
  return null;
}

function DemoCard({ demo }: { demo: Demo }) {
  const [playing, setPlaying] = useState(false);
  const [replaying, setReplaying] = useState(false);
  const [run, setRun] = useState(0);
  const button = useRef<HTMLButtonElement>(null);
  const hovered = useRef(false);
  const replayTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (replayTimer.current !== null) window.clearTimeout(replayTimer.current);
  }, []);

  function resetPull() {
    button.current?.style.setProperty("--pull-x", "0px");
    button.current?.style.setProperty("--pull-y", "0px");
    button.current?.style.setProperty("--pull-tilt", "0deg");
  }

  function followsPointer(event: PointerEvent<HTMLButtonElement>) {
    return event.pointerType !== "touch"
      && window.matchMedia("(hover: hover) and (pointer: fine)").matches
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function enter(event: PointerEvent<HTMLButtonElement>) {
    if (!followsPointer(event)) return;
    hovered.current = true;
    setPlaying(true);
    move(event);
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    if (demo.id !== "squishy" || !followsPointer(event)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    event.currentTarget.style.setProperty("--pull-x", `${x * 9}px`);
    event.currentTarget.style.setProperty("--pull-y", `${y * 4}px`);
    event.currentTarget.style.setProperty("--pull-tilt", `${x * 1.2}deg`);
  }

  function leave() {
    hovered.current = false;
    resetPull();
    if (!replaying) setPlaying(false);
  }

  function replay() {
    if (replayTimer.current !== null) window.clearTimeout(replayTimer.current);
    resetPull();
    setRun((value) => value + 1);
    setPlaying(true);
    setReplaying(true);
    replayTimer.current = window.setTimeout(() => {
      setReplaying(false);
      setPlaying(hovered.current);
    }, 1750);
  }

  return (
    <article className={styles.card} data-button-demo={demo.id}>
      <header>
        <span className={styles.number}>{demo.number}</span>
        <h2 className={styles.title}>{demo.title}</h2>
      </header>
      <div className={styles.stage}>
        <button
          ref={button}
          type="button"
          className={styles.button}
          data-variant={demo.id}
          data-playing={playing}
          data-replaying={replaying}
          aria-label={`Preview ${demo.title}: See what I've built`}
          onPointerEnter={enter}
          onPointerMove={move}
          onPointerLeave={leave}
          onPointerCancel={leave}
          onClick={replay}
          style={{ padding: pill.hero.padding, borderRadius: pill.hero.borderRadius, fontSize: pill.hero.fontSize }}
        >
          <span className={styles.surface} key={`surface-${run}`} aria-hidden="true" />
          <Decorations key={`decoration-${run}`} variant={demo.id} />
          <span className={styles.label} key={`label-${run}`}>
            See what I&apos;ve{" "}
            <span className={styles.built}>
              built
              {demo.id === "flourish" && (
                <svg className={styles.flourish} width="42" height="10" viewBox="0 0 42 10" fill="none" aria-hidden="true">
                  <path pathLength="1" d="M2 5.5c9-4 24-4.7 36-2.6C28 3.2 15 5.1 8 7c11-2 23-2.9 32-1.7" />
                </svg>
              )}
            </span>
            {" "}<Arrow variant={demo.id} />
          </span>
        </button>
      </div>
      <footer className={styles.footer}>
        <p className={styles.description}>{demo.description}</p>
        <button type="button" className={styles.replay} onClick={replay} aria-label={`Replay ${demo.title}`}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3.1 5.2A5.5 5.5 0 1 1 2.5 9M3 1.8v3.8h3.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Replay
        </button>
      </footer>
    </article>
  );
}

function CombinedDemo() {
  const [replay, setReplay] = useState(0);

  return (
    <article className={styles.card} data-button-demo="combined">
      <header>
        <span className={styles.number}>02 + 04</span>
        <h2 className={styles.title}>Squishy doodle</h2>
      </header>
      <div className={styles.stage}>
        <HeroCTA preview replay={replay} />
      </div>
      <footer className={styles.footer}>
        <p className={styles.description}>A soft squish and a hand-drawn nudge.</p>
        <button
          type="button"
          className={styles.replay}
          onClick={() => setReplay((value) => value + 1)}
          aria-label="Replay Squishy doodle"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3.1 5.2A5.5 5.5 0 1 1 2.5 9M3 1.8v3.8h3.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Replay
        </button>
      </footer>
    </article>
  );
}

/** Standalone, non-navigating samples for the button preview route. */
export default function ButtonPlayground() {
  return (
    <div
      className={styles.grid}
      style={{
        "--demo-ink": color.inkDeepSky,
        "--demo-blue": color.blueInk,
        "--demo-sky": color.skyInk,
        "--demo-muted": color.skyInkLight,
        "--demo-gold": color.gold,
        "--demo-font-sans": font.sans,
        "--demo-font-serif": font.serif,
        "--demo-pill-background": pill.hero.background,
        "--demo-pill-shadow": pill.hero.boxShadow,
      } as CSSProperties}
    >
      {demos.map((demo) => <DemoCard key={demo.id} demo={demo} />)}
      <CombinedDemo />
    </div>
  );
}
