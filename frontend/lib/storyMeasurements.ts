/** Layout-space camera keyframe. Its path is independent of the current scroll transform. */
export interface StoryCameraFrame {
  p: number;
  x: number;
  y: number;
  z: number;
  r: number;
}

export interface StoryMeasurementElements {
  page: HTMLElement;
  runway: HTMLElement;
  stage: HTMLElement;
  photo: HTMLElement;
  intro: HTMLElement;
  sun: HTMLElement;
  chapter: HTMLElement;
  gallery: HTMLElement;
  pinkChapter: HTMLElement;
  pinkGallery: HTMLElement;
  hackathonChapter: HTMLElement;
  hackathonGallery: HTMLElement;
  universityChapter: HTMLElement;
  universityGallery: HTMLElement;
  creatorChapter: HTMLElement;
  creatorGallery: HTMLElement;
  growthChapter: HTMLElement;
  growthGallery: HTMLElement;
  oroProjectChapter: HTMLElement;
  oroProjectGallery: HTMLElement;
  rocketChapter: HTMLElement;
  rocketGallery: HTMLElement;
  blueprintChapter: HTMLElement;
  blueprintGallery: HTMLElement;
  eventHostingChapter: HTMLElement;
  eventHostingGallery: HTMLElement;
  launchpadChapter: HTMLElement;
  launchpadGallery: HTMLElement;
  indexChapter?: HTMLElement | null;
  contactContent?: HTMLElement | null;
}

export interface StoryMeasurementOptions {
  home: boolean;
  hasContact: boolean;
  linear: boolean;
}

export interface StoryChapterBounds {
  element: HTMLElement;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface StoryMeasurements {
  chapterBounds: StoryChapterBounds[];
  start: number;
  travel: number;
  height: number;
  width: number;
  contactCloudHeight: number;
  photoCenter: number;
  introOverflow: number;
  sunEndX: number;
  sunEndY: number;
  cameraFrames: StoryCameraFrame[];
  pinkFrames: StoryCameraFrame[];
  hackathonFrames: StoryCameraFrame[];
  universityFrames: StoryCameraFrame[];
  creatorFrames: StoryCameraFrame[];
  growthFrames: StoryCameraFrame[];
  oroProjectFrames: StoryCameraFrame[];
  rocketFrames: StoryCameraFrame[];
  blueprintFrames: StoryCameraFrame[];
  eventHostingFrames: StoryCameraFrame[];
  launchpadFrames: StoryCameraFrame[];
  indexFrames: StoryCameraFrame[];
}

interface LayoutBox {
  offsetLeft: number;
  offsetTop: number;
  offsetWidth: number;
  offsetHeight: number;
}

/**
 * Measure the full composition only when its layout changes. Every DOM read is
 * collected before the first style write, so positioning one chapter cannot
 * force another synchronous layout while measuring the next chapter.
 */
export function measureStory(
  elements: StoryMeasurementElements,
  { home, hasContact, linear }: StoryMeasurementOptions,
): StoryMeasurements {
  const {
    page,
    runway,
    stage,
    photo,
    intro,
    sun,
    chapter,
    gallery,
    pinkChapter,
    pinkGallery,
    hackathonChapter,
    hackathonGallery,
    universityChapter,
    universityGallery,
    creatorChapter,
    creatorGallery,
    growthChapter,
    growthGallery,
    oroProjectChapter,
    oroProjectGallery,
    rocketChapter,
    rocketGallery,
    blueprintChapter,
    blueprintGallery,
    eventHostingChapter,
    eventHostingGallery,
    launchpadChapter,
    launchpadGallery,
    indexChapter,
    contactContent,
  } = elements;
  const inner = intro.firstElementChild as HTMLElement;
  const projects = [...hackathonGallery.querySelectorAll<HTMLElement>("[data-hackathon-project]")];
  const profiles = [...creatorGallery.querySelectorAll<HTMLElement>("[data-creator-profile]")];
  const rows = home ? indexChapter?.querySelector<HTMLElement>("[data-index-rows]") : null;
  const cards = rows ? [...rows.querySelectorAll<HTMLElement>("[data-index-card]")] : [];
  const lastCard = rows?.lastElementChild as HTMLElement | null;
  const runwayTop = runway.getBoundingClientRect().top + window.scrollY;
  const stageHeight = stage.clientHeight;
  const stageWidth = stage.clientWidth;
  const introStyle = window.getComputedStyle(intro);
  const introPaddingTop = parseFloat(introStyle.paddingTop);
  const introPaddingBottom = parseFloat(introStyle.paddingBottom);
  const contactStyle = contactContent ? window.getComputedStyle(contactContent) : null;
  const contactPaddingTop = contactStyle ? parseFloat(contactStyle.paddingTop) : 0;
  const contactPaddingBottom = contactStyle ? parseFloat(contactStyle.paddingBottom) : 0;
  const boxes = new Map<HTMLElement, LayoutBox>();
  const measuredElements = new Set([
    runway, photo, sun, chapter, gallery, pinkChapter, pinkGallery,
    hackathonChapter, hackathonGallery, universityChapter, universityGallery,
    creatorChapter, creatorGallery, growthChapter, growthGallery,
    oroProjectChapter, oroProjectGallery, rocketChapter, rocketGallery,
    blueprintChapter, blueprintGallery, eventHostingChapter, eventHostingGallery,
    launchpadChapter, launchpadGallery, indexChapter, contactContent,
    inner, ...projects, ...profiles, rows, ...cards, lastCard,
  ]);
  for (const element of measuredElements) {
    if (!element) continue;
    boxes.set(element, {
      offsetLeft: element.offsetLeft,
      offsetTop: element.offsetTop,
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
    });
  }
  const box = (element: HTMLElement) => boxes.get(element)!;
  const chapterBounds: StoryChapterBounds[] = [];
  const writes: { element: HTMLElement; property: string; value: string }[] = [];
  const setStyle = (element: HTMLElement, property: string, value: string) => {
    writes.push({ element, property, value });
  };
  let contactCloudHeight = 550;
  let indexFrames: StoryCameraFrame[] = [];
  const start = runwayTop;
  const travel = Math.max(1, box(runway).offsetHeight - stageHeight);
  const height = stageHeight;
  const width = stageWidth;
  // Layout offsets stay independent of the camera transform when resizing.
  const photoTop = box(inner).offsetTop + box(photo).offsetTop;
  const introRoom = height - introPaddingTop - introPaddingBottom;
  const introOverflow = linear ? 0 : Math.max(0, box(inner).offsetHeight - introRoom);
  const photoCenter = photoTop + box(photo).offsetHeight / 2 + introOverflow / 2;
  const sunEndX = box(inner).offsetLeft + box(photo).offsetLeft + box(photo).offsetWidth - width / 2 + 4;
  const sunEndY = photoTop + 16 - box(sun).offsetTop - 58;
  const chapterX = width > 850 ? 1430 : 800;
  setStyle(chapter, "left", linear ? "" : `${chapterX}px`);
  const chapterWidth = box(chapter).offsetWidth;
  const chapterHeight = box(chapter).offsetHeight;
  chapterBounds.push({ element: chapter, x: chapterX, y: 0, width: chapterWidth, height: chapterHeight });
  const galleryX = chapterX - chapterWidth / 2 + box(gallery).offsetLeft + box(gallery).offsetWidth / 2;
  const galleryY = -chapterHeight / 2 + box(gallery).offsetTop + box(gallery).offsetHeight / 2;
  const room = height - (home ? 150 : 105);
  const photoFit = Math.min(width / (box(gallery).offsetWidth + 50), room / (box(gallery).offsetHeight + 40), 1.12);
  const readingFit = Math.min(width / (chapterWidth + (width > 850 ? 130 : 46)), room / (chapterHeight + 45), 1.06);
  const cameraFrames = [
    { p: 0, x: 0, y: 0, z: 1, r: 0 },
    { p: 0.42, x: galleryX, y: galleryY, z: photoFit, r: 1.5 },
    { p: 0.70, x: chapterX, y: 0, z: readingFit, r: 0 },
    { p: 1, x: chapterX + 12, y: 5, z: readingFit, r: 0 },
  ];
  const pinkX = chapterX + (width > 850 ? 1530 : 940);
  const pinkY = width > 850 ? 210 : 90;
  setStyle(pinkChapter, "left", linear ? "" : `${pinkX}px`);
  setStyle(pinkChapter, "top", linear ? "" : `${pinkY}px`);
  const pinkWidth = box(pinkChapter).offsetWidth;
  const pinkHeight = box(pinkChapter).offsetHeight;
  chapterBounds.push({ element: pinkChapter, x: pinkX, y: pinkY, width: pinkWidth, height: pinkHeight });
  const pinkGalleryX = pinkX - pinkWidth / 2 + box(pinkGallery).offsetLeft + box(pinkGallery).offsetWidth / 2;
  const pinkGalleryY = pinkY - pinkHeight / 2 + box(pinkGallery).offsetTop + box(pinkGallery).offsetHeight / 2;
  const pinkPhotoFit = Math.min(width / (box(pinkGallery).offsetWidth + 65), room / (box(pinkGallery).offsetHeight + 50), 1.12);
  const pinkWidthFit = Math.min(width / (pinkWidth + (width > 850 ? 130 : 46)), 1.06);
  // On shorter phones, move through the chapter vertically rather than
  // shrinking the copy to fit every photo and result into a single frame.
  const pinkReadingFit = width > 850 ? Math.min(pinkWidthFit, room / (pinkHeight + 45)) : pinkWidthFit;
  const readingOverflow = Math.max(0, pinkHeight - room / pinkReadingFit);
  const pinkFrames = [
    { ...cameraFrames[cameraFrames.length - 1], p: 0 },
    { p: 0.40, x: pinkGalleryX, y: pinkGalleryY, z: pinkPhotoFit, r: -1.5 },
    { p: 0.65, x: pinkX, y: pinkY - readingOverflow / 2, z: pinkReadingFit, r: 0 },
    { p: 0.88, x: pinkX + 8, y: pinkY + readingOverflow / 2, z: pinkReadingFit, r: 0 },
    { p: 1, x: pinkX + 12, y: pinkY + readingOverflow / 2 + 5, z: pinkReadingFit, r: 0 },
  ];
  const hackathonX = pinkX + (width > 850 ? 1700 : 1100);
  const hackathonY = width > 850 ? -90 : 160;
  setStyle(hackathonChapter, "left", linear ? "" : `${hackathonX}px`);
  setStyle(hackathonChapter, "top", linear ? "" : `${hackathonY}px`);
  const hackathonWidth = box(hackathonChapter).offsetWidth;
  const hackathonHeight = box(hackathonChapter).offsetHeight;
  chapterBounds.push({ element: hackathonChapter, x: hackathonX, y: hackathonY, width: hackathonWidth, height: hackathonHeight });
  const hackathonGalleryX = hackathonX - hackathonWidth / 2 + box(hackathonGallery).offsetLeft;
  const hackathonGalleryY = hackathonY - hackathonHeight / 2 + box(hackathonGallery).offsetTop;
  const projectFrames = projects.map((project, index) => ({
    p: 0.24 + index * 0.17,
    x: hackathonGalleryX + box(project).offsetLeft + box(project).offsetWidth / 2,
    y: hackathonGalleryY + box(project).offsetTop + box(project).offsetHeight / 2,
    z: Math.min(width / (box(project).offsetWidth + 65), room / (box(project).offsetHeight + 55), 1.35),
    r: 0,
  }));
  const hackathonWidthFit = Math.min(width / (hackathonWidth + (width > 850 ? 130 : 46)), 1.06);
  const hackathonReadingFit = width > 850 ? Math.min(hackathonWidthFit, room / (hackathonHeight + 45)) : hackathonWidthFit;
  const hackathonOverflow = Math.max(0, hackathonHeight - room / hackathonReadingFit);
  const hackathonFrames = [
    { ...pinkFrames[pinkFrames.length - 1], p: 0 },
    ...projectFrames,
    { p: 0.76, x: hackathonX, y: hackathonY - hackathonOverflow / 2, z: hackathonReadingFit, r: 0 },
    { p: 0.94, x: hackathonX + 8, y: hackathonY + hackathonOverflow / 2, z: hackathonReadingFit, r: 0 },
    { p: 1, x: hackathonX + 12, y: hackathonY + hackathonOverflow / 2 + 5, z: hackathonReadingFit, r: 0 },
  ];
  const universityX = hackathonX + (width > 850 ? 1600 : 1050);
  const universityY = width > 850 ? 160 : 90;
  setStyle(universityChapter, "left", linear ? "" : `${universityX}px`);
  setStyle(universityChapter, "top", linear ? "" : `${universityY}px`);
  const universityWidth = box(universityChapter).offsetWidth;
  const universityHeight = box(universityChapter).offsetHeight;
  chapterBounds.push({ element: universityChapter, x: universityX, y: universityY, width: universityWidth, height: universityHeight });
  const universityGalleryX = universityX - universityWidth / 2 + box(universityGallery).offsetLeft + box(universityGallery).offsetWidth / 2;
  const universityGalleryY = universityY - universityHeight / 2 + box(universityGallery).offsetTop + box(universityGallery).offsetHeight / 2;
  const universityPhotoFit = Math.min(width / (box(universityGallery).offsetWidth + 65), room / (box(universityGallery).offsetHeight + 55), 1.12);
  const universityWidthFit = Math.min(width / (universityWidth + (width > 850 ? 130 : 46)), 1.06);
  const universityReadingFit = width > 850 ? Math.min(universityWidthFit, room / (universityHeight + 45)) : universityWidthFit;
  const universityOverflow = Math.max(0, universityHeight - room / universityReadingFit);
  const universityFrames = [
    { ...hackathonFrames[hackathonFrames.length - 1], p: 0 },
    { p: 0.32, x: universityGalleryX, y: universityGalleryY, z: universityPhotoFit, r: 1.5 },
    { p: 0.66, x: universityX, y: universityY - universityOverflow / 2, z: universityReadingFit, r: 0 },
    { p: 0.91, x: universityX + 8, y: universityY + universityOverflow / 2, z: universityReadingFit, r: 0 },
    { p: 1, x: universityX + 12, y: universityY + universityOverflow / 2 + 5, z: universityReadingFit, r: 0 },
  ];
  const creatorX = universityX + (width > 850 ? 1650 : 1100);
  const creatorY = width > 850 ? -110 : 160;
  setStyle(creatorChapter, "left", linear ? "" : `${creatorX}px`);
  setStyle(creatorChapter, "top", linear ? "" : `${creatorY}px`);
  const creatorWidth = box(creatorChapter).offsetWidth;
  const creatorHeight = box(creatorChapter).offsetHeight;
  chapterBounds.push({ element: creatorChapter, x: creatorX, y: creatorY, width: creatorWidth, height: creatorHeight });
  const creatorGalleryX = creatorX - creatorWidth / 2 + box(creatorGallery).offsetLeft;
  const creatorGalleryY = creatorY - creatorHeight / 2 + box(creatorGallery).offsetTop;
  const profileFrames = profiles.map((profile, index) => ({
    p: 0.27 + index * 0.22,
    x: creatorGalleryX + box(profile).offsetLeft + box(profile).offsetWidth / 2,
    y: creatorGalleryY + box(profile).offsetTop + box(profile).offsetHeight / 2,
    z: Math.min(width / (box(profile).offsetWidth + 65), room / (box(profile).offsetHeight + 55), 1.35),
    r: 0,
  }));
  const creatorWidthFit = Math.min(width / (creatorWidth + (width > 850 ? 130 : 46)), 1.06);
  const creatorReadingFit = width > 850 ? Math.min(creatorWidthFit, room / (creatorHeight + 45)) : creatorWidthFit;
  const creatorOverflow = Math.max(0, creatorHeight - room / creatorReadingFit);
  const creatorFrames = [
    { ...universityFrames[universityFrames.length - 1], p: 0 },
    ...profileFrames,
    { p: 0.74, x: creatorX, y: creatorY - creatorOverflow / 2, z: creatorReadingFit, r: 0 },
    { p: 0.94, x: creatorX + 8, y: creatorY + creatorOverflow / 2, z: creatorReadingFit, r: 0 },
    { p: 1, x: creatorX + 12, y: creatorY + creatorOverflow / 2 + 5, z: creatorReadingFit, r: 0 },
  ];
  const growthX = creatorX + (width > 850 ? 1600 : 1050);
  const growthY = width > 850 ? 180 : 90;
  setStyle(growthChapter, "left", linear ? "" : `${growthX}px`);
  setStyle(growthChapter, "top", linear ? "" : `${growthY}px`);
  const growthWidth = box(growthChapter).offsetWidth;
  const growthHeight = box(growthChapter).offsetHeight;
  chapterBounds.push({ element: growthChapter, x: growthX, y: growthY, width: growthWidth, height: growthHeight });
  const growthGalleryX = growthX - growthWidth / 2 + box(growthGallery).offsetLeft + box(growthGallery).offsetWidth / 2;
  const growthGalleryY = growthY - growthHeight / 2 + box(growthGallery).offsetTop + box(growthGallery).offsetHeight / 2;
  const growthPhotoFit = Math.min(width / (box(growthGallery).offsetWidth + 65), room / (box(growthGallery).offsetHeight + 55), 1.12);
  const growthWidthFit = Math.min(width / (growthWidth + (width > 850 ? 130 : 46)), 1.06);
  const growthReadingFit = width > 850 ? Math.min(growthWidthFit, room / (growthHeight + 45)) : growthWidthFit;
  const growthOverflow = Math.max(0, growthHeight - room / growthReadingFit);
  const growthFrames = [
    { ...creatorFrames[creatorFrames.length - 1], p: 0 },
    { p: 0.36, x: growthGalleryX, y: growthGalleryY, z: growthPhotoFit, r: -1.5 },
    { p: 0.68, x: growthX, y: growthY - growthOverflow / 2, z: growthReadingFit, r: 0 },
    { p: 0.92, x: growthX + 8, y: growthY + growthOverflow / 2, z: growthReadingFit, r: 0 },
    { p: 1, x: growthX + 12, y: growthY + growthOverflow / 2 + 5, z: growthReadingFit, r: 0 },
  ];
  const oroProjectX = growthX + (width > 850 ? 1700 : 1100);
  const oroProjectY = width > 850 ? -100 : 160;
  setStyle(oroProjectChapter, "left", linear ? "" : `${oroProjectX}px`);
  setStyle(oroProjectChapter, "top", linear ? "" : `${oroProjectY}px`);
  const oroProjectWidth = box(oroProjectChapter).offsetWidth;
  const oroProjectHeight = box(oroProjectChapter).offsetHeight;
  chapterBounds.push({ element: oroProjectChapter, x: oroProjectX, y: oroProjectY, width: oroProjectWidth, height: oroProjectHeight });
  const oroProjectGalleryX = oroProjectX - oroProjectWidth / 2 + box(oroProjectGallery).offsetLeft + box(oroProjectGallery).offsetWidth / 2;
  const oroProjectGalleryY = oroProjectY - oroProjectHeight / 2 + box(oroProjectGallery).offsetTop + box(oroProjectGallery).offsetHeight / 2;
  const oroProjectPhotoFit = Math.min(width / (box(oroProjectGallery).offsetWidth + 65), room / (box(oroProjectGallery).offsetHeight + 55), 1.12);
  const oroProjectWidthFit = Math.min(width / (oroProjectWidth + (width > 850 ? 130 : 46)), 1.06);
  const oroProjectHeightFit = room / (oroProjectHeight + 45);
  // Keep the technical bullets readable on phones and shorter laptops by
  // moving down the complete chapter rather than scaling the copy away.
  const oroProjectReadingFit = width > 850 && oroProjectHeightFit >= 0.8
    ? Math.min(oroProjectWidthFit, oroProjectHeightFit) : oroProjectWidthFit;
  const oroProjectOverflow = Math.max(0, oroProjectHeight - room / oroProjectReadingFit);
  const oroProjectFrames = [
    { ...growthFrames[growthFrames.length - 1], p: 0 },
    { p: 0.30, x: oroProjectGalleryX, y: oroProjectGalleryY, z: oroProjectPhotoFit, r: 1.5 },
    { p: 0.58, x: oroProjectX, y: oroProjectY - oroProjectOverflow / 2, z: oroProjectReadingFit, r: 0 },
    { p: 0.94, x: oroProjectX + 8, y: oroProjectY + oroProjectOverflow / 2, z: oroProjectReadingFit, r: 0 },
    { p: 1, x: oroProjectX + 12, y: oroProjectY + oroProjectOverflow / 2 + 5, z: oroProjectReadingFit, r: 0 },
  ];
  const rocketX = oroProjectX + (width > 850 ? 1700 : 1100);
  const rocketY = width > 850 ? 180 : 90;
  setStyle(rocketChapter, "left", linear ? "" : `${rocketX}px`);
  setStyle(rocketChapter, "top", linear ? "" : `${rocketY}px`);
  const rocketWidth = box(rocketChapter).offsetWidth;
  const rocketHeight = box(rocketChapter).offsetHeight;
  chapterBounds.push({ element: rocketChapter, x: rocketX, y: rocketY, width: rocketWidth, height: rocketHeight });
  const rocketGalleryX = rocketX - rocketWidth / 2 + box(rocketGallery).offsetLeft + box(rocketGallery).offsetWidth / 2;
  const rocketGalleryY = rocketY - rocketHeight / 2 + box(rocketGallery).offsetTop + box(rocketGallery).offsetHeight / 2;
  const rocketPhotoFit = Math.min(width / (box(rocketGallery).offsetWidth + 65), room / (box(rocketGallery).offsetHeight + 55), 1.12);
  const rocketWidthFit = Math.min(width / (rocketWidth + (width > 850 ? 130 : 46)), 1.06);
  const rocketHeightFit = room / (rocketHeight + 45);
  const rocketReadingFit = width > 850 && rocketHeightFit >= 0.8
    ? Math.min(rocketWidthFit, rocketHeightFit) : rocketWidthFit;
  const rocketOverflow = Math.max(0, rocketHeight - room / rocketReadingFit);
  const rocketFrames = [
    { ...oroProjectFrames[oroProjectFrames.length - 1], p: 0 },
    { p: 0.34, x: rocketGalleryX, y: rocketGalleryY, z: rocketPhotoFit, r: -1.5 },
    { p: 0.60, x: rocketX, y: rocketY - rocketOverflow / 2, z: rocketReadingFit, r: 0 },
    { p: 0.94, x: rocketX + 8, y: rocketY + rocketOverflow / 2, z: rocketReadingFit, r: 0 },
    { p: 1, x: rocketX + 12, y: rocketY + rocketOverflow / 2 + 5, z: rocketReadingFit, r: 0 },
  ];
  const blueprintX = rocketX + (width > 850 ? 1700 : 1100);
  const blueprintY = width > 850 ? -100 : 160;
  setStyle(blueprintChapter, "left", linear ? "" : `${blueprintX}px`);
  setStyle(blueprintChapter, "top", linear ? "" : `${blueprintY}px`);
  const blueprintWidth = box(blueprintChapter).offsetWidth;
  const blueprintHeight = box(blueprintChapter).offsetHeight;
  chapterBounds.push({ element: blueprintChapter, x: blueprintX, y: blueprintY, width: blueprintWidth, height: blueprintHeight });
  const blueprintGalleryX = blueprintX - blueprintWidth / 2 + box(blueprintGallery).offsetLeft + box(blueprintGallery).offsetWidth / 2;
  const blueprintGalleryY = blueprintY - blueprintHeight / 2 + box(blueprintGallery).offsetTop + box(blueprintGallery).offsetHeight / 2;
  const blueprintPhotoFit = Math.min(width / (box(blueprintGallery).offsetWidth + 65), room / (box(blueprintGallery).offsetHeight + 55), 1.12);
  const blueprintWidthFit = Math.min(width / (blueprintWidth + (width > 850 ? 130 : 46)), 1.06);
  const blueprintHeightFit = room / (blueprintHeight + 45);
  const blueprintReadingFit = width > 850 && blueprintHeightFit >= 0.8
    ? Math.min(blueprintWidthFit, blueprintHeightFit) : blueprintWidthFit;
  const blueprintOverflow = Math.max(0, blueprintHeight - room / blueprintReadingFit);
  const blueprintFrames = [
    { ...rocketFrames[rocketFrames.length - 1], p: 0 },
    { p: 0.34, x: blueprintGalleryX, y: blueprintGalleryY, z: blueprintPhotoFit, r: -1.5 },
    { p: 0.64, x: blueprintX, y: blueprintY - blueprintOverflow / 2, z: blueprintReadingFit, r: 0 },
    { p: 0.94, x: blueprintX + 8, y: blueprintY + blueprintOverflow / 2, z: blueprintReadingFit, r: 0 },
    { p: 1, x: blueprintX + 12, y: blueprintY + blueprintOverflow / 2 + 5, z: blueprintReadingFit, r: 0 },
  ];
  const eventHostingX = blueprintX + (width > 850 ? 1700 : 1100);
  const eventHostingY = width > 850 ? 180 : 90;
  setStyle(eventHostingChapter, "left", linear ? "" : `${eventHostingX}px`);
  setStyle(eventHostingChapter, "top", linear ? "" : `${eventHostingY}px`);
  const eventHostingWidth = box(eventHostingChapter).offsetWidth;
  const eventHostingHeight = box(eventHostingChapter).offsetHeight;
  chapterBounds.push({ element: eventHostingChapter, x: eventHostingX, y: eventHostingY, width: eventHostingWidth, height: eventHostingHeight });
  const eventHostingGalleryX = eventHostingX - eventHostingWidth / 2 + box(eventHostingGallery).offsetLeft + box(eventHostingGallery).offsetWidth / 2;
  const eventHostingGalleryY = eventHostingY - eventHostingHeight / 2 + box(eventHostingGallery).offsetTop + box(eventHostingGallery).offsetHeight / 2;
  const eventHostingPhotoFit = Math.min(width / (box(eventHostingGallery).offsetWidth + 65), room / (box(eventHostingGallery).offsetHeight + 55), 1.12);
  const eventHostingWidthFit = Math.min(width / (eventHostingWidth + (width > 850 ? 130 : 46)), 1.06);
  const eventHostingHeightFit = room / (eventHostingHeight + 45);
  const eventHostingReadingFit = width > 850 && eventHostingHeightFit >= 0.8
    ? Math.min(eventHostingWidthFit, eventHostingHeightFit) : eventHostingWidthFit;
  const eventHostingOverflow = Math.max(0, eventHostingHeight - room / eventHostingReadingFit);
  const eventHostingFrames = [
    { ...blueprintFrames[blueprintFrames.length - 1], p: 0 },
    { p: 0.34, x: eventHostingGalleryX, y: eventHostingGalleryY, z: eventHostingPhotoFit, r: 1.5 },
    { p: 0.60, x: eventHostingX, y: eventHostingY - eventHostingOverflow / 2, z: eventHostingReadingFit, r: 0 },
    { p: 0.94, x: eventHostingX + 8, y: eventHostingY + eventHostingOverflow / 2, z: eventHostingReadingFit, r: 0 },
    { p: 1, x: eventHostingX + 12, y: eventHostingY + eventHostingOverflow / 2 + 5, z: eventHostingReadingFit, r: 0 },
  ];
  const launchpadX = eventHostingX + (width > 850 ? 1700 : 1100);
  const launchpadY = width > 850 ? -120 : 120;
  setStyle(launchpadChapter, "left", linear ? "" : `${launchpadX}px`);
  setStyle(launchpadChapter, "top", linear ? "" : `${launchpadY}px`);
  const launchpadWidth = box(launchpadChapter).offsetWidth;
  const launchpadHeight = box(launchpadChapter).offsetHeight;
  chapterBounds.push({ element: launchpadChapter, x: launchpadX, y: launchpadY, width: launchpadWidth, height: launchpadHeight });
  const launchpadGalleryX = launchpadX - launchpadWidth / 2 + box(launchpadGallery).offsetLeft + box(launchpadGallery).offsetWidth / 2;
  const launchpadGalleryY = launchpadY - launchpadHeight / 2 + box(launchpadGallery).offsetTop + box(launchpadGallery).offsetHeight / 2;
  const launchpadPhotoFit = Math.min(width / (box(launchpadGallery).offsetWidth + 65), room / (box(launchpadGallery).offsetHeight + 55), 1.12);
  const launchpadWidthFit = Math.min(width / (launchpadWidth + (width > 850 ? 130 : 46)), 1.06);
  const launchpadHeightFit = room / (launchpadHeight + 45);
  const launchpadReadingFit = width > 850 && launchpadHeightFit >= 0.8
    ? Math.min(launchpadWidthFit, launchpadHeightFit) : launchpadWidthFit;
  const launchpadOverflow = Math.max(0, launchpadHeight - room / launchpadReadingFit);
  const launchpadFrames = [
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
    setStyle(indexChapter, "left", linear ? "" : `${indexX}px`);
    setStyle(indexChapter, "top", linear ? "" : `${indexY}px`);
    const indexWidth = box(indexChapter).offsetWidth;
    const indexHeight = box(indexChapter).offsetHeight;
    chapterBounds.push({ element: indexChapter, x: indexX, y: indexY, width: indexWidth, height: indexHeight });
    const indexFit = Math.min(width / (indexWidth + (width > 850 ? 130 : 46)), room / (indexHeight + 40), 1);
    indexFrames = [
      { ...exit, p: 0 },
      { p: 0.23, x: exit.x + 140, y: exit.y + 60, z: Math.min(exit.z, indexFit) * 0.76, r: -1 },
      { p: 0.58, x: indexX - 80, y: indexY - 30, z: indexFit * 0.9, r: 1 },
      { p: 0.88, x: indexX, y: indexY, z: indexFit, r: 0 },
      { p: 1, x: indexX, y: indexY, z: indexFit, r: 0 },
    ];
    if (rows) {
      for (const [index, card] of cards.entries()) {
        // Offsets ignore transforms, so resizing never measures a half-open stack.
        setStyle(card, "--stack-y", `${box(rows).offsetHeight / 2 - box(card).offsetTop - box(card).offsetHeight / 2 + index * 4}px`);
      }
      if (hasContact && lastCard) {
        // Derive the origin from the settled camera and layout offsets.
        // A resize during an earlier chapter must not move the ink's source.
        const x = width / 2 + (-indexWidth / 2 + box(rows).offsetLeft + box(lastCard).offsetLeft + box(lastCard).offsetWidth * 0.68) * indexFit;
        const y = height / 2 + 25 + (-indexHeight / 2 + box(rows).offsetTop + box(lastCard).offsetTop + box(lastCard).offsetHeight * 0.8) * indexFit;
        const radius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
        setStyle(page, "--wash-x", `${x}px`);
        setStyle(page, "--wash-y", `${y}px`);
        setStyle(page, "--wash-size", `${radius * 3.6}px`);
      }
    }
  }
  if (contactContent) {
    // Preserve the old section's cloud canvas and vertical parallax, rather
    // than redistributing the artwork around the full-screen wash stage.
    contactCloudHeight = box(contactContent).offsetHeight - contactPaddingTop - contactPaddingBottom + 310;
    setStyle(page, "--contact-cloud-height", `${contactCloudHeight}px`);
  }

  // Read existing inline values together, then commit only changed positions.
  // Repeated ResizeObserver notifications therefore cannot invalidate layout.
  const changedWrites = writes.filter(({ element, property, value }) =>
    element.style.getPropertyValue(property) !== value,
  );
  for (const { element, property, value } of changedWrites) {
    element.style.setProperty(property, value);
  }
  return {
    chapterBounds,
    start,
    travel,
    height,
    width,
    contactCloudHeight,
    photoCenter,
    introOverflow,
    sunEndX,
    sunEndY,
    cameraFrames,
    pinkFrames,
    hackathonFrames,
    universityFrames,
    creatorFrames,
    growthFrames,
    oroProjectFrames,
    rocketFrames,
    blueprintFrames,
    eventHostingFrames,
    launchpadFrames,
    indexFrames,
  };
}
