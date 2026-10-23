"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { color, font, pill } from "@/lib/tokens";
import styles from "./HeroCTA.module.css";

type CTAElement = HTMLAnchorElement | HTMLButtonElement;
type Contact = { id: number; x: number; y: number; touch: boolean };

export type HeroCTAProps = {
  /** Preview uses a button, with the same effects and no navigation. */
  preview?: boolean;
  /** Increment to replay both selected effects in the playground. */
  replay?: number;
};

export default function HeroCTA({ preview = false, replay = 0 }: HeroCTAProps) {
  const target = useRef<CTAElement | null>(null);
  const contact = useRef<Contact | null>(null);
  const cancelNextClick = useRef(false);
  const tapTimer = useRef<number | null>(null);
  const previewTimer = useRef<number | null>(null);
  const previousReplay = useRef(replay);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [tapActive, setTapActive] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [gesture, setGesture] = useState(false);
  const [run, setRun] = useState(0);

  function resetPull() {
    target.current?.style.setProperty("--pull-x", "0px");
    target.current?.style.setProperty("--pull-y", "0px");
    target.current?.style.setProperty("--pull-tilt", "0deg");
  }

  const replayPreview = useCallback(() => {
    if (previewTimer.current !== null) window.clearTimeout(previewTimer.current);
    setGesture(false);
    setRun((value) => value + 1);
    setPreviewPlaying(true);
    previewTimer.current = window.setTimeout(() => setPreviewPlaying(false), 1750);
  }, []);

  useEffect(() => {
    if (!preview || previousReplay.current === replay) return;
    previousReplay.current = replay;
    const frame = window.requestAnimationFrame(replayPreview);
    return () => window.cancelAnimationFrame(frame);
  }, [preview, replay, replayPreview]);

  useEffect(() => () => {
    if (tapTimer.current !== null) window.clearTimeout(tapTimer.current);
    if (previewTimer.current !== null) window.clearTimeout(previewTimer.current);
  }, []);

  function finePointer(event: PointerEvent<CTAElement>) {
    return event.pointerType !== "touch"
      && window.matchMedia("(hover: hover) and (pointer: fine)").matches
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function enter(event: PointerEvent<CTAElement>) {
    if (!finePointer(event)) return;
    setGesture(false);
    setHovered(true);
    move(event);
  }

  function cancelGesture() {
    cancelNextClick.current = true;
    setGesture(true);
    setPressed(false);
    setTapActive(false);
    setHovered(false);
    if (tapTimer.current !== null) window.clearTimeout(tapTimer.current);
    resetPull();
  }

  function move(event: PointerEvent<CTAElement>) {
    const down = contact.current;
    if (down?.touch && down.id === event.pointerId) {
      // Stop immediately when the finger becomes a pan, before pointercancel.
      if (Math.hypot(event.clientX - down.x, event.clientY - down.y) > 9) cancelGesture();
      return;
    }
    if (!finePointer(event)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    event.currentTarget.style.setProperty("--pull-x", `${x * 9}px`);
    event.currentTarget.style.setProperty("--pull-y", `${y * 4}px`);
    event.currentTarget.style.setProperty("--pull-tilt", `${x * 1.2}deg`);
  }

  function down(event: PointerEvent<CTAElement>) {
    if (event.button !== 0) return;
    if (tapTimer.current !== null) window.clearTimeout(tapTimer.current);
    cancelNextClick.current = false;
    contact.current = { id: event.pointerId, x: event.clientX, y: event.clientY, touch: event.pointerType !== "mouse" };
    setGesture(false);
    setPressed(true);
    if (contact.current.touch) {
      setTapActive(true);
      setRun((value) => value + 1);
    }
  }

  function up(event: PointerEvent<CTAElement>) {
    const down = contact.current;
    if (!down || down.id !== event.pointerId) return;
    contact.current = null;
    setPressed(false);
    if (down.touch && !cancelNextClick.current) {
      // Navigation stays native; the drawing can finish during smooth scroll.
      tapTimer.current = window.setTimeout(() => setTapActive(false), 800);
    }
  }

  function leave() {
    setHovered(false);
    setPressed(false);
    resetPull();
    if (contact.current?.touch) cancelGesture();
    contact.current = null;
  }

  function cancel() {
    cancelGesture();
    contact.current = null;
  }

  function focus(event: FocusEvent<CTAElement>) {
    const keyboardFocus = event.currentTarget.matches(":focus-visible");
    setFocused(keyboardFocus);
    if (keyboardFocus) {
      cancelNextClick.current = false;
      setGesture(false);
    }
  }

  function keyDown(event: KeyboardEvent<CTAElement>) {
    if (event.key === "Enter" || event.key === " ") {
      cancelNextClick.current = false;
      setGesture(false);
    }
  }

  function click(event: MouseEvent<CTAElement>) {
    if (cancelNextClick.current && event.detail !== 0) {
      event.preventDefault();
      return;
    }
    if (preview) replayPreview();
  }

  const props = {
    ref: (element: CTAElement | null) => { target.current = element; },
    className: styles.cta,
    "data-hero-cta": true,
    "data-active": hovered || focused || tapActive || previewPlaying,
    "data-pressed": pressed,
    "data-gesture": gesture,
    "data-replaying": previewPlaying,
    "aria-label": "See what I've built",
    onPointerEnter: enter,
    onPointerMove: move,
    onPointerLeave: leave,
    onPointerDown: down,
    onPointerUp: up,
    onPointerCancel: cancel,
    onFocus: focus,
    onBlur: () => setFocused(false),
    onKeyDown: keyDown,
    onClick: click,
    style: {
      padding: pill.hero.padding,
      borderRadius: pill.hero.borderRadius,
      fontSize: pill.hero.fontSize,
      fontFamily: font.sans,
      pointerEvents: "auto",
      "--cta-ink": color.inkDeepSky,
      "--cta-blue": color.blueInk,
      "--cta-background": pill.hero.background,
      "--cta-shadow": pill.hero.boxShadow,
    } as CSSProperties,
  };

  const content = (
    <>
      <span className={styles.surface} key={`surface-${run}`} aria-hidden="true" />
      <span className={styles.label}>
        See what I&apos;ve built{" "}
        <span className={styles.arrowSlot} key={`arrow-${run}`} aria-hidden="true">
          <svg className={styles.arrow} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className={styles.doodleArrow} width="45" height="24" viewBox="0 0 45 24" fill="none">
            <path className={styles.doodleStem} pathLength="1" d="M2 13c8 2.5 14-3 22-2.5 6 .4 11 1.2 17-.5" />
            <path className={styles.doodleTip} pathLength="1" d="m33 4 9 6-8 8" />
          </svg>
        </span>
      </span>
    </>
  );

  return preview ? <button {...props} type="button">{content}</button> : <a {...props} href="#work">{content}</a>;
}
