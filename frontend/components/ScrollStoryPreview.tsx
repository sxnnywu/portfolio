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
import { createStoryFrameWriter } from "@/lib/storyFrameWriter";
import { measureStory, type StoryMeasurements } from "@/lib/storyMeasurements";
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
    let needsMeasurement = false;
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
    let chapterBounds: StoryMeasurements["chapterBounds"] = [];
    const writer = createStoryFrameWriter();
    const chapters = [chapter, pinkChapter, hackathonChapter, universityChapter, creatorChapter, growthChapter, oroProjectChapter, rocketChapter, blueprintChapter, eventHostingChapter, launchpadChapter];
    const chapterElements = new Set(chapters);
    const chapterStarts = [4, 6.8, 10.4, 14.4, 17.6, 21.6, 24.8, 28.8, 32, 35.6, 39.2, 42.8];
    const visibleChapters = new Set<HTMLElement>();
    const inner = intro.firstElementChild as HTMLElement;
    const sky = page.querySelector<HTMLElement>(`.${styles.sky}`);
    const cue = page.querySelector<HTMLElement>(`.${styles.cue}`);
    const progressBar = page.querySelector<HTMLElement>(`.${styles.progress}`);
    const farClouds = page.querySelector<HTMLElement>(`.${styles.farClouds}`);
    const midClouds = page.querySelector<HTMLElement>(`.${styles.midClouds}`);
    const nearClouds = page.querySelector<HTMLElement>(`.${styles.nearClouds}`);
    const wash = page.querySelector<HTMLElement>("[data-watercolour-wash]");
    const polaroid = photo.firstElementChild as HTMLElement;
    const story = intro.querySelector<HTMLElement>(`.${styles.story}`);
    const schools = intro.querySelector<HTMLElement>(`.${styles.education}`);
    const background = intro.querySelector<HTMLElement>(`.${styles.backgroundSummary}`);
    const introElements = new Set([intro, inner, polaroid, story, schools, background]);
    const propertyOwners = new Map<string, HTMLElement[]>();
    const ownersFor = (key: string): HTMLElement[] => {
      const cached = propertyOwners.get(key);
      if (cached) return cached;
      let owner: HTMLElement | null = null;
      if (key === "--progress") owner = progressBar;
      else if (key.startsWith("--journey-")) owner = intro;
      else if (key.startsWith("--pink-")) owner = pinkChapter;
      else if (key.startsWith("--oro-")) owner = oroProjectChapter;
      else if (key.startsWith("--rocket-")) owner = rocketChapter;
      else if (key.startsWith("--event-")) owner = eventHostingChapter;
      else if (key.startsWith("--launchpad-")) owner = launchpadChapter;
      else if (key === "--index-departure") owner = launchpadChapter;
      else if (key.startsWith("--index-")) owner = indexChapter;
      else if (key.startsWith("--wash-")) owner = wash;
      else if (key.startsWith("--contact-")) owner = contactStage;
      else if (key.startsWith("--sky-")) owner = sky;
      else if (key.startsWith("--hero-")) owner = hero;
      else if (key.startsWith("--cue-")) owner = cue;
      else if (key.startsWith("--far-")) owner = farClouds;
      else if (key.startsWith("--mid-")) owner = midClouds;
      else if (key.startsWith("--near-")) owner = nearClouds;
      else if (key.startsWith("--sun-")) owner = sun;
      else if (key.startsWith("--photo-")) owner = polaroid;
      else if (key.startsWith("--story-") || key.startsWith("--clause-") || key.startsWith("--draw-")) owner = story;
      else if (key === "--intro-read-y") owner = inner;
      else if (key.startsWith("--education-")) owner = schools;
      else if (key.startsWith("--background-item-")) owner = background;
      const owners = key === "--cloud-opacity"
        ? [farClouds, midClouds, nearClouds].filter((element): element is HTMLElement => element !== null)
        : owner ? [owner] : [];
      propertyOwners.set(key, owners);
      return owners;
    };

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
      const units = distance / height;
      writer.style(hero, "visibility", still || units < 4 ? "inherit" : "hidden");
      let currentChapter = 0;
      for (let i = 1; i < chapterStarts.length; i++) {
        if (units >= chapterStarts[i]) currentChapter = i;
      }
      // Keep neighbors ready before a transition. A conservative cached viewport
      // also preserves wide-screen views and overflowing polaroid edges.
      const angle = camera.r * Math.PI / 180;
      const halfWidth = (Math.abs(Math.cos(angle)) * width + Math.abs(Math.sin(angle)) * height) / (2 * camera.z) + 320;
      const halfHeight = (Math.abs(Math.sin(angle)) * width + Math.abs(Math.cos(angle)) * height) / (2 * camera.z) + 320;
      const introInView = Math.abs(camera.x) <= halfWidth + width / 2
        && Math.abs(camera.y) <= halfHeight + (height + introOverflow) / 2;
      const introVisible = still || units < 6.8 || introInView;
      writer.style(intro, "visibility", introVisible ? "inherit" : "hidden");
      visibleChapters.clear();
      for (const [index, element] of chapters.entries()) {
        const bounds = chapterBounds[index];
        const inView = bounds && Math.abs(bounds.x - camera.x) <= halfWidth + bounds.width / 2
          && Math.abs(bounds.y - camera.y) <= halfHeight + bounds.height / 2;
        if (still || Math.abs(index - currentChapter) <= 1 || inView) visibleChapters.add(element);
        // Inherit respects the world's initial hidden state; explicit visible
        // would let chapters show through while the hero is still on screen.
        writer.style(element, "visibility", visibleChapters.has(element) ? "inherit" : "hidden");
      }
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
      for (const [key, value] of Object.entries(values)) {
        for (const owner of ownersFor(key)) {
          if (chapterElements.has(owner) && !visibleChapters.has(owner)) continue;
          if (introElements.has(owner) && !introVisible) continue;
          writer.style(owner, key, value);
        }
      }
      writer.style(journey, "transform", `translate(${width / 2}px,${height / 2 + 25}px) scale(${camera.z}) rotate(${camera.r}deg) translate(${-camera.x}px,${-camera.y}px)`);
      writer.style(journey, "opacity", still ? 1 : 1 - ease(contactProgress, 0.12, 0.64));
      writer.style(journey, "visibility", still || distance > height * 3.9 ? "visible" : "hidden");
      // Hidden hero controls leave the keyboard order as the story takes over.
      writer.inert(hero, !still && p > 0.245);
      writer.attribute(hero, "aria-hidden", !still && p > 0.245);
      writer.attribute(intro, "aria-hidden", !still && (p < 0.18 || q > 0.42));
      writer.attribute(chapter, "aria-hidden", !still && (q < 0.16 || pinkProgress > 0.4));
      writer.attribute(pinkChapter, "aria-hidden", !still && (pinkProgress < 0.14 || hackathonProgress > 0.3));
      writer.attribute(hackathonChapter, "aria-hidden", !still && (hackathonProgress < 0.12 || universityProgress > 0.3));
      writer.inert(hackathonChapter, !still && (hackathonProgress < 0.12 || universityProgress > 0.3));
      writer.attribute(universityChapter, "aria-hidden", !still && (universityProgress < 0.14 || creatorProgress > 0.3));
      writer.attribute(creatorChapter, "aria-hidden", !still && (creatorProgress < 0.12 || growthProgress > 0.3));
      writer.inert(creatorChapter, !still && (creatorProgress < 0.12 || growthProgress > 0.3));
      writer.attribute(growthChapter, "aria-hidden", !still && (growthProgress < 0.14 || oroProjectProgress > 0.3));
      writer.attribute(oroProjectChapter, "aria-hidden", !still && (oroProjectProgress < 0.14 || rocketProgress > 0.3));
      writer.inert(oroProjectChapter, !still && (oroProjectProgress < 0.14 || rocketProgress > 0.3));
      writer.attribute(rocketChapter, "aria-hidden", !still && (rocketProgress < 0.14 || blueprintProgress > 0.3));
      writer.attribute(blueprintChapter, "aria-hidden", !still && (blueprintProgress < 0.14 || eventHostingProgress > 0.3));
      writer.attribute(eventHostingChapter, "aria-hidden", !still && (eventHostingProgress < 0.14 || launchpadProgress > 0.3));
      writer.attribute(launchpadChapter, "aria-hidden", !still && (launchpadProgress < 0.14 || indexProgress > 0.6));
      if (indexChapter) {
        writer.attribute(indexChapter, "aria-hidden", !still && (indexProgress < 0.3 || contactProgress > 0.6));
        writer.inert(indexChapter, !still && contactProgress > 0.6);
      }
      if (contactStage) {
        writer.attribute(contactStage, "data-contact-visible", still || contactProgress > 0.5);
        writer.attribute(contactStage, "data-contact-active", still || contactProgress > 0.84);
        writer.attribute(contactStage, "aria-hidden", !still && contactProgress < 0.57);
      }
    };
    const renderFrame = () => {
      if (needsMeasurement) {
        needsMeasurement = false;
        measure();
      }
      paint();
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(renderFrame);
    };
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
        renderFrame();
      } else schedule();
    };
    const visitContact = (behavior: ScrollBehavior = "instant") => {
      if (!hasContact || !contactStage || linear.matches) return;
      window.scrollTo({ top: start + height * (46 + 2.2 * 0.98), behavior });
      if (behavior === "instant") {
        if (frame !== null) window.cancelAnimationFrame(frame);
        renderFrame();
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
      ({ start, travel, height, width, contactCloudHeight, photoCenter, introOverflow,
        sunEndX, sunEndY, cameraFrames, pinkFrames, hackathonFrames, universityFrames,
        creatorFrames, growthFrames, oroProjectFrames, rocketFrames, blueprintFrames,
        eventHostingFrames, launchpadFrames, indexFrames, chapterBounds } = measureStory({
          page, runway, stage, photo, intro, sun, chapter, gallery, pinkChapter, pinkGallery,
          hackathonChapter, hackathonGallery, universityChapter, universityGallery,
          creatorChapter, creatorGallery, growthChapter, growthGallery, oroProjectChapter,
          oroProjectGallery, rocketChapter, rocketGallery, blueprintChapter, blueprintGallery,
          eventHostingChapter, eventHostingGallery, launchpadChapter, launchpadGallery,
          indexChapter, contactContent,
        }, { home, hasContact, linear: linear.matches }));
    };
    const queueMeasurement = () => {
      needsMeasurement = true;
      schedule();
    };
    // Observe actual layout changes. Mobile browser chrome can resize the visual
    // viewport without changing this stable svh stage, so it needs no remeasure.
    const resize = new ResizeObserver(queueMeasurement);
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
    schedule();
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
    linear.addEventListener("change", queueMeasurement);
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
      linear.removeEventListener("change", queueMeasurement);
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
