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
import TheatreChapter from "@/components/TheatreChapter";
import PinkStairsChapter from "@/components/PinkStairsChapter";
import HackathonChapter from "@/components/HackathonChapter";
import UniversityChapter from "@/components/UniversityChapter";
import CreatorChapter from "@/components/CreatorChapter";
import GrowthChapter from "@/components/GrowthChapter";
import OroProjectChapter from "@/components/OroProjectChapter";
import RocketChapter from "@/components/RocketChapter";
import BlueprintChapter from "@/components/BlueprintChapter";
import EventHostingChapter from "@/components/EventHostingChapter";
import LaunchpadChapter from "@/components/LaunchpadChapter";
import JourneyIndex from "@/components/JourneyIndex";
import WatercolourWash from "@/components/WatercolourWash";
import { education, heroHeadline, heroTagline, introBackground } from "@/lib/data";
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
export default function ScrollStoryPreview({ home = false, children }: { home?: boolean; children?: ReactNode }) {
  const hasContact = home && Boolean(children);
  const pageRef = useRef<HTMLElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const pinkChapterRef = useRef<HTMLElement>(null);
  const pinkGalleryRef = useRef<HTMLDivElement>(null);
  const hackathonChapterRef = useRef<HTMLElement>(null);
  const hackathonGalleryRef = useRef<HTMLDivElement>(null);
  const universityChapterRef = useRef<HTMLElement>(null);
  const universityGalleryRef = useRef<HTMLDivElement>(null);
  const creatorChapterRef = useRef<HTMLElement>(null);
  const creatorGalleryRef = useRef<HTMLDivElement>(null);
  const growthChapterRef = useRef<HTMLElement>(null);
  const growthGalleryRef = useRef<HTMLDivElement>(null);
  const oroProjectChapterRef = useRef<HTMLElement>(null);
  const oroProjectGalleryRef = useRef<HTMLDivElement>(null);
  const rocketChapterRef = useRef<HTMLElement>(null);
  const rocketGalleryRef = useRef<HTMLDivElement>(null);
  const blueprintChapterRef = useRef<HTMLElement>(null);
  const blueprintGalleryRef = useRef<HTMLDivElement>(null);
  const eventHostingChapterRef = useRef<HTMLElement>(null);
  const eventHostingGalleryRef = useRef<HTMLDivElement>(null);
  const launchpadChapterRef = useRef<HTMLElement>(null);
  const launchpadGalleryRef = useRef<HTMLDivElement>(null);
  const indexChapterRef = useRef<HTMLElement>(null);
  const contactStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const runway = runwayRef.current;
    const stage = stageRef.current;
    const photo = photoRef.current;
    const intro = introRef.current;
    const hero = heroRef.current;
    const sun = sunRef.current;
    const journey = journeyRef.current;
    const chapter = chapterRef.current;
    const gallery = galleryRef.current;
    const pinkChapter = pinkChapterRef.current;
    const pinkGallery = pinkGalleryRef.current;
    const hackathonChapter = hackathonChapterRef.current;
    const hackathonGallery = hackathonGalleryRef.current;
    const universityChapter = universityChapterRef.current;
    const universityGallery = universityGalleryRef.current;
    const creatorChapter = creatorChapterRef.current;
    const creatorGallery = creatorGalleryRef.current;
    const growthChapter = growthChapterRef.current;
    const growthGallery = growthGalleryRef.current;
    const oroProjectChapter = oroProjectChapterRef.current;
    const oroProjectGallery = oroProjectGalleryRef.current;
    const rocketChapter = rocketChapterRef.current;
    const rocketGallery = rocketGalleryRef.current;
    const blueprintChapter = blueprintChapterRef.current;
    const blueprintGallery = blueprintGalleryRef.current;
    const eventHostingChapter = eventHostingChapterRef.current;
    const eventHostingGallery = eventHostingGalleryRef.current;
    const launchpadChapter = launchpadChapterRef.current;
    const launchpadGallery = launchpadGalleryRef.current;
    const indexChapter = indexChapterRef.current;
    const contactStage = contactStageRef.current;
    const contactContent = contactStage?.querySelector<HTMLElement>("[data-contact-content]");
    if (!page || !runway || !stage || !photo || !intro || !hero || !sun || !journey || !chapter || !gallery || !pinkChapter || !pinkGallery || !hackathonChapter || !hackathonGallery || !universityChapter || !universityGallery || !creatorChapter || !creatorGallery || !growthChapter || !growthGallery || !oroProjectChapter || !oroProjectGallery || !rocketChapter || !rocketGallery || !blueprintChapter || !blueprintGallery || !eventHostingChapter || !eventHostingGallery || !launchpadChapter || !launchpadGallery) return;

    const linear = window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 540px)");
    let frame: number | null = null;
    let start = 0;
    let travel = 1;
    let height = 1;
    let width = 1;
    let contactCloudHeight = 550;
    let photoCenter = 0;
    let introOverflow = 0;
    let sunEndX = 0;
    let sunEndY = 0;
    let chapterX = 1430;
    let cameraFrames: { p: number; x: number; y: number; z: number; r: number }[] = [];
    let pinkFrames: typeof cameraFrames = [];
    let hackathonFrames: typeof cameraFrames = [];
    let universityFrames: typeof cameraFrames = [];
    let creatorFrames: typeof cameraFrames = [];
    let growthFrames: typeof cameraFrames = [];
    let oroProjectFrames: typeof cameraFrames = [];
    let rocketFrames: typeof cameraFrames = [];
    let blueprintFrames: typeof cameraFrames = [];
    let eventHostingFrames: typeof cameraFrames = [];
    let launchpadFrames: typeof cameraFrames = [];
    let indexFrames: typeof cameraFrames = [];

    // Monotone cubic interpolation keeps the camera reversible, with no overshoot
    // or rotation during the reading segment.
    const cameraAt = (progress: number, points = cameraFrames) => {
      const keys = ["x", "y", "z", "r"] as const;
      const value = (index: number, key: typeof keys[number]) => key === "z" ? Math.log(points[index][key]) : points[index][key];
      const tangent = (index: number, key: typeof keys[number]) => {
        if (index === 0 || index === points.length - 1) return 0;
        const a = (value(index, key) - value(index - 1, key)) / (points[index].p - points[index - 1].p);
        const b = (value(index + 1, key) - value(index, key)) / (points[index + 1].p - points[index].p);
        return a * b <= 0 ? 0 : 2 * a * b / (a + b);
      };
      let index = points.findIndex((point, i) => i < points.length - 1 && progress >= point.p && progress <= points[i + 1].p);
      if (index < 0) index = points.length - 2;
      const span = points[index + 1].p - points[index].p;
      const t = clamp((progress - points[index].p) / span);
      const camera = { x: 0, y: 0, z: 1, r: 0 };
      for (const key of keys) {
        const result = (2 * t ** 3 - 3 * t ** 2 + 1) * value(index, key)
          + (t ** 3 - 2 * t ** 2 + t) * span * tangent(index, key)
          + (-2 * t ** 3 + 3 * t ** 2) * value(index + 1, key)
          + (t ** 3 - t ** 2) * span * tangent(index + 1, key);
        camera[key] = key === "z" ? Math.exp(result) : result;
      }
      return camera;
    };

    const paint = () => {
      frame = null;
      const still = linear.matches;
      const distance = Math.max(0, window.scrollY - start);
      // Keep the approved hero's original four viewport scroll distance.
      const p = clamp(distance / (height * 4));
      const q = still ? 1 : clamp((distance - height * 4) / (height * 2.8));
      const pinkProgress = still ? 1 : clamp((distance - height * 6.8) / (height * 3.6));
      const hackathonProgress = still ? 1 : clamp((distance - height * 10.4) / (height * 4));
      const universityProgress = still ? 1 : clamp((distance - height * 14.4) / (height * 3.2));
      const creatorProgress = still ? 1 : clamp((distance - height * 17.6) / (height * 4));
      const growthProgress = still ? 1 : clamp((distance - height * 21.6) / (height * 3.2));
      const oroProjectProgress = still ? 1 : clamp((distance - height * 24.8) / (height * 4));
      const rocketProgress = still ? 1 : clamp((distance - height * 28.8) / (height * 3.2));
      const blueprintProgress = still ? 1 : clamp((distance - height * 32) / (height * 3.6));
      const eventHostingProgress = still ? 1 : clamp((distance - height * 35.6) / (height * 3.6));
      const launchpadProgress = still ? 1 : clamp((distance - height * 39.2) / (height * 3.6));
      const indexProgress = home && indexChapter ? clamp((distance - height * 42.8) / (height * 3.2)) : 0;
      const indexOpen = still ? 1 : ease(indexProgress, 0.32, 0.86);
      const contactProgress = hasContact && !still ? clamp((distance - height * 46) / (height * 2.2)) : 0;
      const washDrift = still ? 0 : ease(contactProgress, 0.08, 0.72);
      const camera = still ? { x: 0, y: 0, z: 1, r: 0 }
        : indexProgress > 0 ? cameraAt(indexProgress, indexFrames)
        : launchpadProgress > 0 ? cameraAt(launchpadProgress, launchpadFrames)
        : eventHostingProgress > 0 ? cameraAt(eventHostingProgress, eventHostingFrames)
        : blueprintProgress > 0 ? cameraAt(blueprintProgress, blueprintFrames)
        : rocketProgress > 0 ? cameraAt(rocketProgress, rocketFrames)
        : oroProjectProgress > 0 ? cameraAt(oroProjectProgress, oroProjectFrames)
        : growthProgress > 0 ? cameraAt(growthProgress, growthFrames)
        : creatorProgress > 0 ? cameraAt(creatorProgress, creatorFrames)
        : universityProgress > 0 ? cameraAt(universityProgress, universityFrames)
        : hackathonProgress > 0 ? cameraAt(hackathonProgress, hackathonFrames)
        : pinkProgress > 0 ? cameraAt(pinkProgress, pinkFrames) : cameraAt(q);
      // Hold the settled index camera, then let its composition float away
      // while the pigment expands in screen space beneath it.
      camera.y += washDrift * height * 0.16 / camera.z;
      camera.z *= 1 - washDrift * 0.03;
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
      const introReadY = still ? 0 : introOverflow * (0.5 - ease(p, 0.64, 0.96));
      const educationReveal = still ? 1 : ease(p, 0.71, 0.83);
      const values: Record<string, string | number> = {
        "--progress": clamp(distance / travel),
        "--journey-x": `${-camera.x}px`,
        "--journey-y": `${-camera.y}px`,
        "--journey-scale": camera.z,
        "--journey-turn": `${camera.r}deg`,
        "--oro-download-progress": still ? 1 : ease(oroProjectProgress, 0.84, 0.94),
        "--event-photo-spread": still ? 1 : ease(eventHostingProgress, 0.08, 0.42),
        "--launchpad-photo-spread": still ? 1 : ease(launchpadProgress, 0.08, 0.42),
        "--launchpad-revenue": still ? 1 : ease(launchpadProgress, 0.76, 0.9),
        "--index-open": indexOpen,
        "--index-closed": 1 - indexOpen,
        "--index-heading": still ? 1 : ease(indexProgress, 0.3, 0.56),
        "--index-arrival": still ? 1 : ease(indexProgress, 0.08, 0.32),
        "--index-departure": still ? 0 : ease(indexProgress, 0.36, 0.7),
        "--index-wash": washDrift,
        "--wash-scale": 0.014 + ease(contactProgress, 0.02, 0.76) * 0.986,
        "--wash-pigment": ease(contactProgress, 0.015, 0.16),
        "--wash-flow": washDrift,
        "--wash-fill": ease(contactProgress, 0.64, 0.84),
        "--contact-cloud-travel": `${still ? 0 : contactCloudHeight * ease(contactProgress, 0.42, 1)}px`,
        "--contact-clouds": still ? 0.5 : ease(contactProgress, 0.5, 0.86),
        "--contact-heading": still ? 1 : ease(contactProgress, 0.57, 0.78),
        "--contact-subline": still ? 1 : ease(contactProgress, 0.64, 0.83),
        "--contact-button": still ? 1 : ease(contactProgress, 0.72, 0.9),
        "--contact-socials": still ? 1 : ease(contactProgress, 0.77, 0.95),
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
        "--sun-y": `${sunlight * (sunEndY + introReadY) - Math.sin(sunlight * Math.PI) * height * 0.05}px`,
        "--sun-turn": `${sunlight * 115}deg`,
        "--sun-scale": 1 - sunlight * 0.74,
        "--sun-opacity": still ? 1 : 1 - ease(q, 0, 0.22),
        "--photo-y": `${still ? 0 : (1 - arrival) * height * 0.85 + (1 - placement) * (height * 0.52 - photoCenter)}px`,
        "--photo-scale": 1.7 - placement * 0.7,
        "--photo-turn": `${10 - placement * 15}deg`,
        "--photo-opacity": arrival,
        "--photo-shadow": 0.35 + placement * 0.65,
        "--story-y": `${(1 - story) * 70}px`,
        "--intro-read-y": `${introReadY}px`,
        "--education-opacity": educationReveal,
        "--education-y": `${(1 - educationReveal) * 35}px`,
      };
      for (let i = 0; i < 3; i++) {
        values[`--clause-${i}`] = still ? 1 : ease(p, 0.48 + i * 0.065, 0.59 + i * 0.065);
        values[`--pink-result-${i}`] = still ? 1 : ease(pinkProgress, 0.63 + i * 0.07, 0.73 + i * 0.07);
        values[`--oro-result-${i}`] = still ? 1 : ease(oroProjectProgress, 0.63 + i * 0.07, 0.73 + i * 0.07);
        values[`--rocket-result-${i}`] = still ? 1 : ease(rocketProgress, 0.63 + i * 0.07, 0.73 + i * 0.07);
        values[`--event-result-${i}`] = still ? 1 : ease(eventHostingProgress, 0.63 + i * 0.07, 0.73 + i * 0.07);
      }
      for (let i = 0; i < 4; i++) {
        values[`--draw-${i}`] = still ? 1 : ease(p, 0.55 + i * 0.05, 0.64 + i * 0.05);
        values[`--index-label-${i}`] = still ? 1 : ease(indexProgress, 0.5 + i * 0.05, 0.64 + i * 0.05);
      }
      for (let i = 0; i < introBackground.length; i++) {
        values[`--background-item-${i}`] = still ? 1 : ease(p, 0.71 + i * 0.042, 0.78 + i * 0.042);
      }
      for (const [key, value] of Object.entries(values)) page.style.setProperty(key, String(value));
      journey.style.transform = `translate(${width / 2}px,${height / 2 + 25}px) scale(${camera.z}) rotate(${camera.r}deg) translate(${-camera.x}px,${-camera.y}px)`;
      journey.style.opacity = String(still ? 1 : 1 - ease(contactProgress, 0.12, 0.64));
      journey.style.visibility = still || distance > height * 3.9 ? "visible" : "hidden";
      // Hidden hero controls leave the keyboard order as the story takes over.
      hero.inert = !still && p > 0.245;
      hero.setAttribute("aria-hidden", String(!still && p > 0.245));
      intro.setAttribute("aria-hidden", String(!still && (p < 0.18 || q > 0.42)));
      chapter.setAttribute("aria-hidden", String(!still && (q < 0.16 || pinkProgress > 0.4)));
      pinkChapter.setAttribute("aria-hidden", String(!still && (pinkProgress < 0.14 || hackathonProgress > 0.3)));
      hackathonChapter.setAttribute("aria-hidden", String(!still && (hackathonProgress < 0.12 || universityProgress > 0.3)));
      hackathonChapter.inert = !still && (hackathonProgress < 0.12 || universityProgress > 0.3);
      universityChapter.setAttribute("aria-hidden", String(!still && (universityProgress < 0.14 || creatorProgress > 0.3)));
      creatorChapter.setAttribute("aria-hidden", String(!still && (creatorProgress < 0.12 || growthProgress > 0.3)));
      creatorChapter.inert = !still && (creatorProgress < 0.12 || growthProgress > 0.3);
      growthChapter.setAttribute("aria-hidden", String(!still && (growthProgress < 0.14 || oroProjectProgress > 0.3)));
      oroProjectChapter.setAttribute("aria-hidden", String(!still && (oroProjectProgress < 0.14 || rocketProgress > 0.3)));
      oroProjectChapter.inert = !still && (oroProjectProgress < 0.14 || rocketProgress > 0.3);
      rocketChapter.setAttribute("aria-hidden", String(!still && (rocketProgress < 0.14 || blueprintProgress > 0.3)));
      blueprintChapter.setAttribute("aria-hidden", String(!still && (blueprintProgress < 0.14 || eventHostingProgress > 0.3)));
      eventHostingChapter.setAttribute("aria-hidden", String(!still && (eventHostingProgress < 0.14 || launchpadProgress > 0.3)));
      launchpadChapter.setAttribute("aria-hidden", String(!still && (launchpadProgress < 0.14 || indexProgress > 0.6)));
      if (indexChapter) {
        indexChapter.setAttribute("aria-hidden", String(!still && (indexProgress < 0.3 || contactProgress > 0.6)));
        indexChapter.inert = !still && contactProgress > 0.6;
      }
      if (contactStage) {
        contactStage.dataset.contactVisible = String(still || contactProgress > 0.5);
        contactStage.dataset.contactActive = String(still || contactProgress > 0.84);
        contactStage.setAttribute("aria-hidden", String(!still && contactProgress < 0.57));
      }
    };
    const schedule = () => { if (frame === null) frame = window.requestAnimationFrame(paint); };
    const focusProject = (event: FocusEvent) => {
      const link = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-hackathon-project]") : null;
      if (!link || linear.matches || !link.matches(":focus-visible")) return;
      const index = [...hackathonGallery.querySelectorAll("[data-hackathon-project]")].indexOf(link);
      if (index < 0) return;
      // Keyboard focus visits the same native-scroll camera stops as the reader,
      // so tabbing never leaves a project link focused outside the clipped stage.
      window.scrollTo({ top: start + height * (10.4 + 4 * (0.24 + index * 0.17)), behavior: "instant" });
      schedule();
    };
    const focusCreatorProfile = (event: FocusEvent) => {
      const link = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-creator-profile]") : null;
      if (!link || linear.matches || !link.matches(":focus-visible")) return;
      const index = [...creatorGallery.querySelectorAll("[data-creator-profile]")].indexOf(link);
      if (index < 0) return;
      window.scrollTo({ top: start + height * (17.6 + 4 * (0.27 + index * 0.22)), behavior: "instant" });
      schedule();
    };
    const focusOroProject = (event: FocusEvent) => {
      const link = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-oro-project-link]") : null;
      if (!link || linear.matches || !link.matches(":focus-visible")) return;
      window.scrollTo({ top: start + height * (24.8 + 4 * 0.94), behavior: "instant" });
      schedule();
    };
    const visitIndex = (behavior: ScrollBehavior = "instant") => {
      if (!home || !indexChapter || linear.matches) return;
      window.scrollTo({ top: start + height * (42.8 + 3.2 * 0.93), behavior });
      // Settle the camera before the focused link is painted.
      if (behavior === "instant") {
        if (frame !== null) window.cancelAnimationFrame(frame);
        paint();
      } else schedule();
    };
    const visitContact = (behavior: ScrollBehavior = "instant") => {
      if (!hasContact || !contactStage || linear.matches) return;
      window.scrollTo({ top: start + height * (46 + 2.2 * 0.98), behavior });
      if (behavior === "instant") {
        if (frame !== null) window.cancelAnimationFrame(frame);
        paint();
      } else schedule();
    };
    const focusIndex = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.matches("a:focus-visible")) visitIndex();
    };
    const focusContact = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.matches("a:focus-visible")) visitContact();
    };
    const bridgeContactFocus = (event: KeyboardEvent) => {
      if (!hasContact || !indexChapter || !contactStage || linear.matches || event.key !== "Tab") return;
      const lastIndexLink = indexChapter.querySelector("[data-index-rows]")?.lastElementChild?.querySelector("a");
      const firstContactLink = contactStage.querySelector("a");
      if (!event.shiftKey && event.target === lastIndexLink) {
        event.preventDefault();
        visitContact();
        firstContactLink?.focus({ preventScroll: true });
      } else if (event.shiftKey && event.target === firstContactLink) {
        event.preventDefault();
        visitIndex();
        lastIndexLink?.focus({ preventScroll: true });
      }
    };
    const jumpToChapter = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || linear.matches) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href="#work"], a[href="#contact"]') : null;
      if (!home || !indexChapter || !link) return;
      const isContact = link.hash === "#contact";
      if (isContact && !hasContact) return;
      event.preventDefault();
      window.history.pushState(null, "", link.hash);
      // Native smooth scrolling still drives every intermediate camera position.
      if (isContact) visitContact("smooth");
      else visitIndex("smooth");
    };
    const followHash = () => {
      if (window.location.hash === "#work") visitIndex();
      else if (window.location.hash === "#contact") visitContact();
    };
    const measure = () => {
      start = runway.getBoundingClientRect().top + window.scrollY;
      travel = Math.max(1, runway.offsetHeight - stage.clientHeight);
      height = stage.clientHeight;
      width = stage.clientWidth;
      // Layout offsets stay independent of the camera transform when resizing.
      const inner = intro.firstElementChild as HTMLElement;
      const photoTop = inner.offsetTop + photo.offsetTop;
      const introStyle = window.getComputedStyle(intro);
      const introRoom = height - parseFloat(introStyle.paddingTop) - parseFloat(introStyle.paddingBottom);
      introOverflow = linear.matches ? 0 : Math.max(0, inner.offsetHeight - introRoom);
      photoCenter = photoTop + photo.offsetHeight / 2 + introOverflow / 2;
      sunEndX = inner.offsetLeft + photo.offsetLeft + photo.offsetWidth - width / 2 + 4;
      sunEndY = photoTop + 16 - sun.offsetTop - 58;
      chapterX = width > 850 ? 1430 : 800;
      chapter.style.left = linear.matches ? "" : `${chapterX}px`;
      const chapterWidth = chapter.offsetWidth;
      const chapterHeight = chapter.offsetHeight;
      const galleryX = chapterX - chapterWidth / 2 + gallery.offsetLeft + gallery.offsetWidth / 2;
      const galleryY = -chapterHeight / 2 + gallery.offsetTop + gallery.offsetHeight / 2;
      const room = height - (home ? 150 : 105);
      const photoFit = Math.min(width / (gallery.offsetWidth + 50), room / (gallery.offsetHeight + 40), 1.12);
      const readingFit = Math.min(width / (chapterWidth + (width > 850 ? 130 : 46)), room / (chapterHeight + 45), 1.06);
      cameraFrames = [
        { p: 0, x: 0, y: 0, z: 1, r: 0 },
        { p: 0.42, x: galleryX, y: galleryY, z: photoFit, r: 1.5 },
        { p: 0.70, x: chapterX, y: 0, z: readingFit, r: 0 },
        { p: 1, x: chapterX + 12, y: 5, z: readingFit, r: 0 },
      ];
      const pinkX = chapterX + (width > 850 ? 1530 : 940);
      const pinkY = width > 850 ? 210 : 90;
      pinkChapter.style.left = linear.matches ? "" : `${pinkX}px`;
      pinkChapter.style.top = linear.matches ? "" : `${pinkY}px`;
      const pinkWidth = pinkChapter.offsetWidth;
      const pinkHeight = pinkChapter.offsetHeight;
      const pinkGalleryX = pinkX - pinkWidth / 2 + pinkGallery.offsetLeft + pinkGallery.offsetWidth / 2;
      const pinkGalleryY = pinkY - pinkHeight / 2 + pinkGallery.offsetTop + pinkGallery.offsetHeight / 2;
      const pinkPhotoFit = Math.min(width / (pinkGallery.offsetWidth + 65), room / (pinkGallery.offsetHeight + 50), 1.12);
      const pinkWidthFit = Math.min(width / (pinkWidth + (width > 850 ? 130 : 46)), 1.06);
      // On shorter phones, move through the chapter vertically rather than
      // shrinking the copy to fit every photo and result into a single frame.
      const pinkReadingFit = width > 850 ? Math.min(pinkWidthFit, room / (pinkHeight + 45)) : pinkWidthFit;
      const readingOverflow = Math.max(0, pinkHeight - room / pinkReadingFit);
      pinkFrames = [
        { ...cameraFrames[cameraFrames.length - 1], p: 0 },
        { p: 0.40, x: pinkGalleryX, y: pinkGalleryY, z: pinkPhotoFit, r: -1.5 },
        { p: 0.65, x: pinkX, y: pinkY - readingOverflow / 2, z: pinkReadingFit, r: 0 },
        { p: 0.88, x: pinkX + 8, y: pinkY + readingOverflow / 2, z: pinkReadingFit, r: 0 },
        { p: 1, x: pinkX + 12, y: pinkY + readingOverflow / 2 + 5, z: pinkReadingFit, r: 0 },
      ];
      const hackathonX = pinkX + (width > 850 ? 1700 : 1100);
      const hackathonY = width > 850 ? -90 : 160;
      hackathonChapter.style.left = linear.matches ? "" : `${hackathonX}px`;
      hackathonChapter.style.top = linear.matches ? "" : `${hackathonY}px`;
      const hackathonWidth = hackathonChapter.offsetWidth;
      const hackathonHeight = hackathonChapter.offsetHeight;
      const hackathonGalleryX = hackathonX - hackathonWidth / 2 + hackathonGallery.offsetLeft;
      const hackathonGalleryY = hackathonY - hackathonHeight / 2 + hackathonGallery.offsetTop;
      const projectFrames = [...hackathonGallery.querySelectorAll<HTMLElement>("[data-hackathon-project]")].map((project, index) => ({
        p: 0.24 + index * 0.17,
        x: hackathonGalleryX + project.offsetLeft + project.offsetWidth / 2,
        y: hackathonGalleryY + project.offsetTop + project.offsetHeight / 2,
        z: Math.min(width / (project.offsetWidth + 65), room / (project.offsetHeight + 55), 1.35),
        r: 0,
      }));
      const hackathonWidthFit = Math.min(width / (hackathonWidth + (width > 850 ? 130 : 46)), 1.06);
      const hackathonReadingFit = width > 850 ? Math.min(hackathonWidthFit, room / (hackathonHeight + 45)) : hackathonWidthFit;
      const hackathonOverflow = Math.max(0, hackathonHeight - room / hackathonReadingFit);
      hackathonFrames = [
        { ...pinkFrames[pinkFrames.length - 1], p: 0 },
        ...projectFrames,
        { p: 0.76, x: hackathonX, y: hackathonY - hackathonOverflow / 2, z: hackathonReadingFit, r: 0 },
        { p: 0.94, x: hackathonX + 8, y: hackathonY + hackathonOverflow / 2, z: hackathonReadingFit, r: 0 },
        { p: 1, x: hackathonX + 12, y: hackathonY + hackathonOverflow / 2 + 5, z: hackathonReadingFit, r: 0 },
      ];
      const universityX = hackathonX + (width > 850 ? 1600 : 1050);
      const universityY = width > 850 ? 160 : 90;
      universityChapter.style.left = linear.matches ? "" : `${universityX}px`;
      universityChapter.style.top = linear.matches ? "" : `${universityY}px`;
      const universityWidth = universityChapter.offsetWidth;
      const universityHeight = universityChapter.offsetHeight;
      const universityGalleryX = universityX - universityWidth / 2 + universityGallery.offsetLeft + universityGallery.offsetWidth / 2;
      const universityGalleryY = universityY - universityHeight / 2 + universityGallery.offsetTop + universityGallery.offsetHeight / 2;
      const universityPhotoFit = Math.min(width / (universityGallery.offsetWidth + 65), room / (universityGallery.offsetHeight + 55), 1.12);
      const universityWidthFit = Math.min(width / (universityWidth + (width > 850 ? 130 : 46)), 1.06);
      const universityReadingFit = width > 850 ? Math.min(universityWidthFit, room / (universityHeight + 45)) : universityWidthFit;
      const universityOverflow = Math.max(0, universityHeight - room / universityReadingFit);
      universityFrames = [
        { ...hackathonFrames[hackathonFrames.length - 1], p: 0 },
        { p: 0.32, x: universityGalleryX, y: universityGalleryY, z: universityPhotoFit, r: 1.5 },
        { p: 0.66, x: universityX, y: universityY - universityOverflow / 2, z: universityReadingFit, r: 0 },
        { p: 0.91, x: universityX + 8, y: universityY + universityOverflow / 2, z: universityReadingFit, r: 0 },
        { p: 1, x: universityX + 12, y: universityY + universityOverflow / 2 + 5, z: universityReadingFit, r: 0 },
      ];
      const creatorX = universityX + (width > 850 ? 1650 : 1100);
      const creatorY = width > 850 ? -110 : 160;
      creatorChapter.style.left = linear.matches ? "" : `${creatorX}px`;
      creatorChapter.style.top = linear.matches ? "" : `${creatorY}px`;
      const creatorWidth = creatorChapter.offsetWidth;
      const creatorHeight = creatorChapter.offsetHeight;
      const creatorGalleryX = creatorX - creatorWidth / 2 + creatorGallery.offsetLeft;
      const creatorGalleryY = creatorY - creatorHeight / 2 + creatorGallery.offsetTop;
      const profileFrames = [...creatorGallery.querySelectorAll<HTMLElement>("[data-creator-profile]")].map((profile, index) => ({
        p: 0.27 + index * 0.22,
        x: creatorGalleryX + profile.offsetLeft + profile.offsetWidth / 2,
        y: creatorGalleryY + profile.offsetTop + profile.offsetHeight / 2,
        z: Math.min(width / (profile.offsetWidth + 65), room / (profile.offsetHeight + 55), 1.35),
        r: 0,
      }));
      const creatorWidthFit = Math.min(width / (creatorWidth + (width > 850 ? 130 : 46)), 1.06);
      const creatorReadingFit = width > 850 ? Math.min(creatorWidthFit, room / (creatorHeight + 45)) : creatorWidthFit;
      const creatorOverflow = Math.max(0, creatorHeight - room / creatorReadingFit);
      creatorFrames = [
        { ...universityFrames[universityFrames.length - 1], p: 0 },
        ...profileFrames,
        { p: 0.74, x: creatorX, y: creatorY - creatorOverflow / 2, z: creatorReadingFit, r: 0 },
        { p: 0.94, x: creatorX + 8, y: creatorY + creatorOverflow / 2, z: creatorReadingFit, r: 0 },
        { p: 1, x: creatorX + 12, y: creatorY + creatorOverflow / 2 + 5, z: creatorReadingFit, r: 0 },
      ];
      const growthX = creatorX + (width > 850 ? 1600 : 1050);
      const growthY = width > 850 ? 180 : 90;
      growthChapter.style.left = linear.matches ? "" : `${growthX}px`;
      growthChapter.style.top = linear.matches ? "" : `${growthY}px`;
      const growthWidth = growthChapter.offsetWidth;
      const growthHeight = growthChapter.offsetHeight;
      const growthGalleryX = growthX - growthWidth / 2 + growthGallery.offsetLeft + growthGallery.offsetWidth / 2;
      const growthGalleryY = growthY - growthHeight / 2 + growthGallery.offsetTop + growthGallery.offsetHeight / 2;
      const growthPhotoFit = Math.min(width / (growthGallery.offsetWidth + 65), room / (growthGallery.offsetHeight + 55), 1.12);
      const growthWidthFit = Math.min(width / (growthWidth + (width > 850 ? 130 : 46)), 1.06);
      const growthReadingFit = width > 850 ? Math.min(growthWidthFit, room / (growthHeight + 45)) : growthWidthFit;
      const growthOverflow = Math.max(0, growthHeight - room / growthReadingFit);
      growthFrames = [
        { ...creatorFrames[creatorFrames.length - 1], p: 0 },
        { p: 0.36, x: growthGalleryX, y: growthGalleryY, z: growthPhotoFit, r: -1.5 },
        { p: 0.68, x: growthX, y: growthY - growthOverflow / 2, z: growthReadingFit, r: 0 },
        { p: 0.92, x: growthX + 8, y: growthY + growthOverflow / 2, z: growthReadingFit, r: 0 },
        { p: 1, x: growthX + 12, y: growthY + growthOverflow / 2 + 5, z: growthReadingFit, r: 0 },
      ];
      const oroProjectX = growthX + (width > 850 ? 1700 : 1100);
      const oroProjectY = width > 850 ? -100 : 160;
      oroProjectChapter.style.left = linear.matches ? "" : `${oroProjectX}px`;
      oroProjectChapter.style.top = linear.matches ? "" : `${oroProjectY}px`;
      const oroProjectWidth = oroProjectChapter.offsetWidth;
      const oroProjectHeight = oroProjectChapter.offsetHeight;
      const oroProjectGalleryX = oroProjectX - oroProjectWidth / 2 + oroProjectGallery.offsetLeft + oroProjectGallery.offsetWidth / 2;
      const oroProjectGalleryY = oroProjectY - oroProjectHeight / 2 + oroProjectGallery.offsetTop + oroProjectGallery.offsetHeight / 2;
      const oroProjectPhotoFit = Math.min(width / (oroProjectGallery.offsetWidth + 65), room / (oroProjectGallery.offsetHeight + 55), 1.12);
      const oroProjectWidthFit = Math.min(width / (oroProjectWidth + (width > 850 ? 130 : 46)), 1.06);
      const oroProjectHeightFit = room / (oroProjectHeight + 45);
      // Keep the technical bullets readable on phones and shorter laptops by
      // moving down the complete chapter rather than scaling the copy away.
      const oroProjectReadingFit = width > 850 && oroProjectHeightFit >= 0.8
        ? Math.min(oroProjectWidthFit, oroProjectHeightFit) : oroProjectWidthFit;
      const oroProjectOverflow = Math.max(0, oroProjectHeight - room / oroProjectReadingFit);
      oroProjectFrames = [
        { ...growthFrames[growthFrames.length - 1], p: 0 },
        { p: 0.30, x: oroProjectGalleryX, y: oroProjectGalleryY, z: oroProjectPhotoFit, r: 1.5 },
        { p: 0.58, x: oroProjectX, y: oroProjectY - oroProjectOverflow / 2, z: oroProjectReadingFit, r: 0 },
        { p: 0.94, x: oroProjectX + 8, y: oroProjectY + oroProjectOverflow / 2, z: oroProjectReadingFit, r: 0 },
        { p: 1, x: oroProjectX + 12, y: oroProjectY + oroProjectOverflow / 2 + 5, z: oroProjectReadingFit, r: 0 },
      ];
      const rocketX = oroProjectX + (width > 850 ? 1700 : 1100);
      const rocketY = width > 850 ? 180 : 90;
      rocketChapter.style.left = linear.matches ? "" : `${rocketX}px`;
      rocketChapter.style.top = linear.matches ? "" : `${rocketY}px`;
      const rocketWidth = rocketChapter.offsetWidth;
      const rocketHeight = rocketChapter.offsetHeight;
      const rocketGalleryX = rocketX - rocketWidth / 2 + rocketGallery.offsetLeft + rocketGallery.offsetWidth / 2;
      const rocketGalleryY = rocketY - rocketHeight / 2 + rocketGallery.offsetTop + rocketGallery.offsetHeight / 2;
      const rocketPhotoFit = Math.min(width / (rocketGallery.offsetWidth + 65), room / (rocketGallery.offsetHeight + 55), 1.12);
      const rocketWidthFit = Math.min(width / (rocketWidth + (width > 850 ? 130 : 46)), 1.06);
      const rocketHeightFit = room / (rocketHeight + 45);
      const rocketReadingFit = width > 850 && rocketHeightFit >= 0.8
        ? Math.min(rocketWidthFit, rocketHeightFit) : rocketWidthFit;
      const rocketOverflow = Math.max(0, rocketHeight - room / rocketReadingFit);
      rocketFrames = [
        { ...oroProjectFrames[oroProjectFrames.length - 1], p: 0 },
        { p: 0.34, x: rocketGalleryX, y: rocketGalleryY, z: rocketPhotoFit, r: -1.5 },
        { p: 0.60, x: rocketX, y: rocketY - rocketOverflow / 2, z: rocketReadingFit, r: 0 },
        { p: 0.94, x: rocketX + 8, y: rocketY + rocketOverflow / 2, z: rocketReadingFit, r: 0 },
        { p: 1, x: rocketX + 12, y: rocketY + rocketOverflow / 2 + 5, z: rocketReadingFit, r: 0 },
      ];
      const blueprintX = rocketX + (width > 850 ? 1700 : 1100);
      const blueprintY = width > 850 ? -100 : 160;
      blueprintChapter.style.left = linear.matches ? "" : `${blueprintX}px`;
      blueprintChapter.style.top = linear.matches ? "" : `${blueprintY}px`;
      const blueprintWidth = blueprintChapter.offsetWidth;
      const blueprintHeight = blueprintChapter.offsetHeight;
      const blueprintGalleryX = blueprintX - blueprintWidth / 2 + blueprintGallery.offsetLeft + blueprintGallery.offsetWidth / 2;
      const blueprintGalleryY = blueprintY - blueprintHeight / 2 + blueprintGallery.offsetTop + blueprintGallery.offsetHeight / 2;
      const blueprintPhotoFit = Math.min(width / (blueprintGallery.offsetWidth + 65), room / (blueprintGallery.offsetHeight + 55), 1.12);
      const blueprintWidthFit = Math.min(width / (blueprintWidth + (width > 850 ? 130 : 46)), 1.06);
      const blueprintHeightFit = room / (blueprintHeight + 45);
      const blueprintReadingFit = width > 850 && blueprintHeightFit >= 0.8
        ? Math.min(blueprintWidthFit, blueprintHeightFit) : blueprintWidthFit;
      const blueprintOverflow = Math.max(0, blueprintHeight - room / blueprintReadingFit);
      blueprintFrames = [
        { ...rocketFrames[rocketFrames.length - 1], p: 0 },
        { p: 0.34, x: blueprintGalleryX, y: blueprintGalleryY, z: blueprintPhotoFit, r: -1.5 },
        { p: 0.64, x: blueprintX, y: blueprintY - blueprintOverflow / 2, z: blueprintReadingFit, r: 0 },
        { p: 0.94, x: blueprintX + 8, y: blueprintY + blueprintOverflow / 2, z: blueprintReadingFit, r: 0 },
        { p: 1, x: blueprintX + 12, y: blueprintY + blueprintOverflow / 2 + 5, z: blueprintReadingFit, r: 0 },
      ];
      const eventHostingX = blueprintX + (width > 850 ? 1700 : 1100);
      const eventHostingY = width > 850 ? 180 : 90;
      eventHostingChapter.style.left = linear.matches ? "" : `${eventHostingX}px`;
      eventHostingChapter.style.top = linear.matches ? "" : `${eventHostingY}px`;
      const eventHostingWidth = eventHostingChapter.offsetWidth;
      const eventHostingHeight = eventHostingChapter.offsetHeight;
      const eventHostingGalleryX = eventHostingX - eventHostingWidth / 2 + eventHostingGallery.offsetLeft + eventHostingGallery.offsetWidth / 2;
      const eventHostingGalleryY = eventHostingY - eventHostingHeight / 2 + eventHostingGallery.offsetTop + eventHostingGallery.offsetHeight / 2;
      const eventHostingPhotoFit = Math.min(width / (eventHostingGallery.offsetWidth + 65), room / (eventHostingGallery.offsetHeight + 55), 1.12);
      const eventHostingWidthFit = Math.min(width / (eventHostingWidth + (width > 850 ? 130 : 46)), 1.06);
      const eventHostingHeightFit = room / (eventHostingHeight + 45);
      const eventHostingReadingFit = width > 850 && eventHostingHeightFit >= 0.8
        ? Math.min(eventHostingWidthFit, eventHostingHeightFit) : eventHostingWidthFit;
      const eventHostingOverflow = Math.max(0, eventHostingHeight - room / eventHostingReadingFit);
      eventHostingFrames = [
        { ...blueprintFrames[blueprintFrames.length - 1], p: 0 },
        { p: 0.34, x: eventHostingGalleryX, y: eventHostingGalleryY, z: eventHostingPhotoFit, r: 1.5 },
        { p: 0.60, x: eventHostingX, y: eventHostingY - eventHostingOverflow / 2, z: eventHostingReadingFit, r: 0 },
        { p: 0.94, x: eventHostingX + 8, y: eventHostingY + eventHostingOverflow / 2, z: eventHostingReadingFit, r: 0 },
        { p: 1, x: eventHostingX + 12, y: eventHostingY + eventHostingOverflow / 2 + 5, z: eventHostingReadingFit, r: 0 },
      ];
      const launchpadX = eventHostingX + (width > 850 ? 1700 : 1100);
      const launchpadY = width > 850 ? -120 : 120;
      launchpadChapter.style.left = linear.matches ? "" : `${launchpadX}px`;
      launchpadChapter.style.top = linear.matches ? "" : `${launchpadY}px`;
      const launchpadWidth = launchpadChapter.offsetWidth;
      const launchpadHeight = launchpadChapter.offsetHeight;
      const launchpadGalleryX = launchpadX - launchpadWidth / 2 + launchpadGallery.offsetLeft + launchpadGallery.offsetWidth / 2;
      const launchpadGalleryY = launchpadY - launchpadHeight / 2 + launchpadGallery.offsetTop + launchpadGallery.offsetHeight / 2;
      const launchpadPhotoFit = Math.min(width / (launchpadGallery.offsetWidth + 65), room / (launchpadGallery.offsetHeight + 55), 1.12);
      const launchpadWidthFit = Math.min(width / (launchpadWidth + (width > 850 ? 130 : 46)), 1.06);
      const launchpadHeightFit = room / (launchpadHeight + 45);
      const launchpadReadingFit = width > 850 && launchpadHeightFit >= 0.8
        ? Math.min(launchpadWidthFit, launchpadHeightFit) : launchpadWidthFit;
      const launchpadOverflow = Math.max(0, launchpadHeight - room / launchpadReadingFit);
      launchpadFrames = [
        { ...eventHostingFrames[eventHostingFrames.length - 1], p: 0 },
        { p: 0.34, x: launchpadGalleryX, y: launchpadGalleryY, z: launchpadPhotoFit, r: -1.5 },
        { p: 0.62, x: launchpadX, y: launchpadY - launchpadOverflow / 2, z: launchpadReadingFit, r: 0 },
        { p: 0.94, x: launchpadX + 8, y: launchpadY + launchpadOverflow / 2, z: launchpadReadingFit, r: 0 },
        { p: 1, x: launchpadX + 12, y: launchpadY + launchpadOverflow / 2 + 5, z: launchpadReadingFit, r: 0 },
      ];
      if (home && indexChapter) {
        const exit = launchpadFrames[launchpadFrames.length - 1];
        const indexX = launchpadX + (width > 850 ? 1120 : 780);
        const indexY = exit.y + (width > 850 ? 360 : 200);
        indexChapter.style.left = linear.matches ? "" : `${indexX}px`;
        indexChapter.style.top = linear.matches ? "" : `${indexY}px`;
        const indexWidth = indexChapter.offsetWidth;
        const indexHeight = indexChapter.offsetHeight;
        const indexFit = Math.min(width / (indexWidth + (width > 850 ? 130 : 46)), room / (indexHeight + 40), 1);
        indexFrames = [
          { ...exit, p: 0 },
          { p: 0.23, x: exit.x + 140, y: exit.y + 60, z: Math.min(exit.z, indexFit) * 0.76, r: -1 },
          { p: 0.58, x: indexX - 80, y: indexY - 30, z: indexFit * 0.9, r: 1 },
          { p: 0.88, x: indexX, y: indexY, z: indexFit, r: 0 },
          { p: 1, x: indexX, y: indexY, z: indexFit, r: 0 },
        ];
        const rows = indexChapter.querySelector<HTMLElement>("[data-index-rows]");
        if (rows) {
          for (const [index, card] of [...rows.querySelectorAll<HTMLElement>("[data-index-card]")].entries()) {
            // Offsets ignore transforms, so resizing never measures a half-open stack.
            card.style.setProperty("--stack-y", `${rows.offsetHeight / 2 - card.offsetTop - card.offsetHeight / 2 + index * 4}px`);
          }
          const lastCard = rows.lastElementChild as HTMLElement | null;
          if (hasContact && lastCard) {
            // Derive the origin from the settled camera and layout offsets.
            // A resize during an earlier chapter must not move the ink's source.
            const x = width / 2 + (-indexWidth / 2 + rows.offsetLeft + lastCard.offsetLeft + lastCard.offsetWidth * 0.68) * indexFit;
            const y = height / 2 + 25 + (-indexHeight / 2 + rows.offsetTop + lastCard.offsetTop + lastCard.offsetHeight * 0.8) * indexFit;
            const radius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
            page.style.setProperty("--wash-x", `${x}px`);
            page.style.setProperty("--wash-y", `${y}px`);
            page.style.setProperty("--wash-size", `${radius * 3.6}px`);
          }
        }
      }
      if (contactContent) {
        const style = window.getComputedStyle(contactContent);
        // Preserve the old section's cloud canvas and vertical parallax, rather
        // than redistributing the artwork around the full-screen wash stage.
        contactCloudHeight = contactContent.offsetHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) + 310;
        page.style.setProperty("--contact-cloud-height", `${contactCloudHeight}px`);
      }
      schedule();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    resize.observe(intro);
    resize.observe(chapter);
    resize.observe(pinkChapter);
    resize.observe(hackathonChapter);
    resize.observe(universityChapter);
    resize.observe(creatorChapter);
    resize.observe(growthChapter);
    resize.observe(oroProjectChapter);
    resize.observe(rocketChapter);
    resize.observe(blueprintChapter);
    resize.observe(eventHostingChapter);
    resize.observe(launchpadChapter);
    if (indexChapter) resize.observe(indexChapter);
    if (contactContent) resize.observe(contactContent);
    if (intro.firstElementChild) resize.observe(intro.firstElementChild);
    measure();
    followHash();
    window.addEventListener("scroll", schedule, { passive: true });
    hackathonGallery.addEventListener("focusin", focusProject);
    creatorGallery.addEventListener("focusin", focusCreatorProfile);
    oroProjectChapter.addEventListener("focusin", focusOroProject);
    indexChapter?.addEventListener("focusin", focusIndex);
    contactStage?.addEventListener("focusin", focusContact);
    indexChapter?.addEventListener("keydown", bridgeContactFocus);
    contactStage?.addEventListener("keydown", bridgeContactFocus);
    document.addEventListener("click", jumpToChapter);
    window.addEventListener("hashchange", followHash);
    window.addEventListener("resize", measure);
    linear.addEventListener("change", measure);
    return () => {
      window.removeEventListener("scroll", schedule);
      hackathonGallery.removeEventListener("focusin", focusProject);
      creatorGallery.removeEventListener("focusin", focusCreatorProfile);
      oroProjectChapter.removeEventListener("focusin", focusOroProject);
      indexChapter?.removeEventListener("focusin", focusIndex);
      contactStage?.removeEventListener("focusin", focusContact);
      indexChapter?.removeEventListener("keydown", bridgeContactFocus);
      contactStage?.removeEventListener("keydown", bridgeContactFocus);
      document.removeEventListener("click", jumpToChapter);
      window.removeEventListener("hashchange", followHash);
      window.removeEventListener("resize", measure);
      linear.removeEventListener("change", measure);
      resize.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [home, hasContact]);

  return (
    <section ref={pageRef} className={`${styles.page} ${home ? styles.homepage : ""} ${hasContact ? styles.withContact : ""}`} data-scroll-story>
      {hasContact && <noscript>
        <style>{`
          .${styles.withContact} .${styles.runway} { height: auto; }
          .${styles.withContact} .${styles.stage} { position: relative; height: auto; padding-top: 100svh; }
          .${styles.contactStage} { position: relative; inset: auto; visibility: visible; pointer-events: auto; }
          .${styles.contactStage} #contact { height: auto; background: linear-gradient(179deg, #fdfaf1, #cfe0ee); }
          .${styles.contactStage} [data-contact-part] { opacity: 1; transform: none; }
          .${styles.contactStage} [data-contact-clouds] { opacity: .5; transform: none; }
        `}</style>
      </noscript>}
      <SunFilterDefs />
      {!home && <header className={styles.labBar}>
        <Link href="/" className={styles.backLink}>← Portfolio</Link>
        <span className={styles.label}>Scroll to unfold</span>
      </header>}
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
                <div data-after-type style={afterTyping(heroHeadline.length, heroTagline.length)}><HeroCTA preview={!home} /></div>
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
              <ul className={styles.backgroundSummary}>
                {introBackground.map((line, index) => (
                  <li key={line} style={{ "--background-item": `var(--background-item-${index}, 1)` } as CSSProperties}>
                    {line.split(/(\{[^}]+\})/g).map((part, partIndex) => (
                      part.startsWith("{") ? <em key={partIndex}>{part.slice(1, -1)}</em> : part
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div ref={journeyRef} className={styles.journeyWorld}>
            <TheatreChapter chapterRef={chapterRef} galleryRef={galleryRef} />
            <PinkStairsChapter chapterRef={pinkChapterRef} galleryRef={pinkGalleryRef} />
            <HackathonChapter chapterRef={hackathonChapterRef} galleryRef={hackathonGalleryRef} />
            <UniversityChapter chapterRef={universityChapterRef} galleryRef={universityGalleryRef} />
            <CreatorChapter chapterRef={creatorChapterRef} galleryRef={creatorGalleryRef} />
            <GrowthChapter chapterRef={growthChapterRef} galleryRef={growthGalleryRef} />
            <OroProjectChapter chapterRef={oroProjectChapterRef} galleryRef={oroProjectGalleryRef} />
            <RocketChapter chapterRef={rocketChapterRef} galleryRef={rocketGalleryRef} />
            <BlueprintChapter chapterRef={blueprintChapterRef} galleryRef={blueprintGalleryRef} />
            <EventHostingChapter chapterRef={eventHostingChapterRef} galleryRef={eventHostingGalleryRef} />
            <LaunchpadChapter chapterRef={launchpadChapterRef} galleryRef={launchpadGalleryRef} />
            {home && <JourneyIndex chapterRef={indexChapterRef} />}
          </div>
          {hasContact && <>
            <WatercolourWash />
            <div ref={contactStageRef} className={styles.contactStage} data-contact-stage>
              {children}
            </div>
          </>}
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
      {!home && <footer className={styles.end}>
        <h2 className={styles.endTitle}>End of preview</h2>
        <p className={styles.endText}>Scroll back to reverse it, or start again.</p>
        <button type="button" className={styles.replay} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>Replay ↑</button>
        <Link href="/" className={styles.homeLink}>Back to the portfolio</Link>
      </footer>}
      <div className={styles.progress} aria-hidden="true" />
    </section>
  );
}
