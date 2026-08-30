/** The hero's two typed lines. Shared so the like button can wait for them. */
export const heroHeadline = "Hey, I'm Sunny";
export const heroTagline = "An engineer who speaks business";

export const socials = [
  { label: "Github", href: "https://github.com/sxnnywu" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/sunny-wu-dev/" },
  { label: "Email", href: "mailto:w.sunny0618@gmail.com" },
];

export const education = [
  {
    program: "Computer science",
    school: "University of Waterloo",
    logo: "/assets/logos/waterloo.png",
  },
  {
    program: "Business administration",
    school: "Lazaridis School of Business",
    logo: "/assets/logos/laurier.png",
  },
];

export const stats: { value: string; label: string; href?: string }[] = [
  { value: "3", label: "Hackathon wins", href: "/projects" },
  { value: "8M+", label: "Community built", href: "/work#the-pink-stairs" },
  { value: "1M+", label: "Views for 4 startups", href: "/work?discipline=growth" },
  { value: "13k", label: "Followers", href: "/content" },
];

/** Anchor id for a role, so a stat can point at the entry it comes from. */
export const roleSlug = (company: string) =>
  company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Tints deepen down the stack so the list leans into the contact sky. */
export const navRows = [
  { href: "/work", title: "Work", blurb: "My lanyard collection", tint: 0.1, bloom: "rgba(150,190,225,.62)" },
  { href: "/projects", title: "Projects", blurb: "Silly little things I made", tint: 0.16, bloom: "rgba(238,224,190,.72)" },
  { href: "/awards", title: "Awards", blurb: "My mom's favourite page", tint: 0.22, bloom: "rgba(196,157,58,.34)" },
  { href: "/story", title: "Story", blurb: "Theatre kid who learned to build", tint: 0.28, bloom: "rgba(206,160,175,.46)" },
];

export const disciplines = ["engineering", "product", "growth", "ops"] as const;
export type Discipline = (typeof disciplines)[number];

export interface Role {
  title: string;
  company: string;
  dates: string;
  location: string;
  tags: Discipline[];
  /** Optional: entries without one simply show the company name. */
  logo?: string;
  /** Braces mark the figures that print in blue ink. */
  bullets: string[];
}

export const roles: Role[] = [
  {
    title: "Co-Founder",
    company: "Oro",
    logo: "/assets/logos/oro.png",
    dates: "Jan 2026 - Present",
    location: "Toronto",
    tags: ["engineering", "product", "growth", "ops"],
    bullets: [
      "{2,000+} downloads across app store and play store",
      "Gained {520k+} views across socials",
      "Featured at Toronto Fashion Week, summer '26",
    ],
  },
  {
    title: "Campus Leader",
    company: "Notion",
    logo: "/assets/logos/notion.png",
    dates: "Aug 2026 - Present",
    location: "Waterloo",
    tags: ["growth", "ops"],
    bullets: ["Scaling Notion in Waterloo by hosting events, building templates, and creating content"],
  },
  {
    title: "Software Engineer Intern",
    company: "Rocket",
    logo: "/assets/logos/rocket.png",
    dates: "May - Aug 2026",
    location: "Remote",
    tags: ["engineering", "product"],
    bullets: [
      "Built company-wide ai agent infrastructure - a serverless agent skill registry replacing the legacy marketplace",
      "Migrated production sites and content management systems onto a new design system",
    ],
  },
  {
    title: "Product Manager",
    company: "UW Blueprint",
    dates: "Apr - Aug 2026",
    location: "Waterloo",
    tags: ["product", "ops"],
    bullets: [
      "Led a team of {10} devs and designers",
      "Owned product on pro bono software for a nonprofit serving {10k+} community members",
    ],
  },
  {
    title: "Growth",
    company: "Stan",
    dates: "Mar - Jun 2026",
    location: "Remote",
    tags: ["growth"],
    bullets: ["Wrote content reaching {370k+} impressions"],
  },
  {
    title: "Growth",
    company: "Polarity",
    dates: "Apr - May 2026",
    location: "Remote",
    tags: ["growth"],
    bullets: ["Wrote content reaching {200k+} impressions"],
  },
  {
    title: "Growth & Operations",
    company: "1851 Labs",
    logo: "/assets/logos/labs1851.png",
    dates: "Apr 2026",
    location: "Toronto",
    tags: ["growth", "ops"],
    bullets: [
      "Scaled to {500k+} users",
      "Gained {550k+} impressions across 6 social channels",
      "Defined the brand narrative and standardised the hiring pipeline",
    ],
  },
  {
    title: "UGC Creator",
    company: "Jobright.ai",
    logo: "/assets/logos/jobright.png",
    dates: "Feb 2026",
    location: "Remote",
    tags: ["growth"],
    bullets: ["{40k+} impressions from a single post", "Top engagement across creators"],
  },
  {
    title: "Founder & Chief Executive Officer",
    company: "The Pink Stairs",
    logo: "/assets/logos/pinkstairs.png",
    dates: "Jun 2024 - Dec 2025",
    location: "Toronto",
    tags: ["growth", "ops"],
    bullets: [
      "Scaled to {8M+} girls across {26} countries",
      "Grew socials to {30M+} views and {11k+} followers",
      "Oversaw {300} volunteers",
      "Distributed {820} care packages to domestic violence survivors",
    ],
  },
];

export interface Project {
  name: string;
  date: string;
  /** Present only on hackathon winners, which get the gold sash and paper. */
  award?: string;
  description: string;
  tags: string[];
  /** Count of further tags the card summarises rather than lists. */
  moreTags?: number;
  links: { label: string; href?: string }[];
}

/** Newest first; the grid must preserve this order. */
export const projects: Project[] = [
  {
    name: "Reeled In",
    date: "Jul 2026",
    description:
      "A/B test your short-form content on a predictive model of the human brain.",
    tags: ["Data Visualization", "MongoDB"],
    moreTags: 1,
    links: [
      { label: "GitHub", href: "https://github.com/sxnnywu/reeled-in" },
      { label: "Devpost", href: "https://devpost.com/software/loopy-9ev74g" },
    ],
  },
  {
    name: "Autoblog",
    date: "May 2026",
    description:
      "Multi-agent orchestration (g-stack) to generate and post technical content for companies.",
    tags: ["AI Agents", "Next.js"],
    moreTags: 3,
    links: [
      { label: "Devpost", href: "https://devpost.com/software/gtmaestro" },
      { label: "GitHub", href: "https://github.com/sebtsang/gmaestro" },
    ],
  },
  {
    name: "Godseye",
    date: "Mar 2026",
    award: "Best use of Polymarket @ YHack",
    description:
      "Multi-agent swarm analysis on Polymarket events. Watch simulated societies, based on real people, debate the evidence, form alliances, and argue over the future of the market.",
    tags: ["AI Agents", "Multi-agent Systems"],
    moreTags: 2,
    links: [
      { label: "GitHub", href: "https://github.com/sxnnywu/godseye" },
      { label: "Devpost", href: "https://devpost.com/software/godseye-uwma5h" },
    ],
  },
  {
    name: "Slidefund",
    date: "Mar 2026",
    award: "Best use of Solana @ Hack Canada",
    description:
      "ETFs for prediction markets. Four agentic AI systems finding combinatorial arbitrages across Polymarket, Kalshi and Manifold.",
    tags: ["Agentic AI Development", "React.js"],
    moreTags: 3,
    links: [
      { label: "GitHub", href: "https://github.com/sxnnywu/slicefund" },
      { label: "Devpost", href: "https://devpost.com/software/slicefund" },
    ],
  },
  {
    name: "Post It",
    date: "Sep 2025",
    award: "Top 32 @ Hack the North · Top 10 @ HTN Snapchat",
    description:
      "An augmented reality app for Snapchat Spectacles that anchors digital sticky notes in real-world locations.",
    tags: ["TypeScript", "JavaScript"],
    moreTags: 1,
    links: [
      { label: "Demo Video" },
      { label: "Devpost", href: "https://devpost.com/software/post-it-jrswqx" },
    ],
  },
  {
    name: "MIND - Math in Nature's Design",
    date: "May - Dec 2024",
    description:
      "A math blog with 600+ readers, exploring how math is intertwined with everyday life.",
    tags: ["Canva"],
    links: [{ label: "Website", href: "https://mindmathblog.wordpress.com/" }],
  },
];

export interface Award {
  title: string;
  issuer: string;
  note?: string;
}

export const awards: { year: string; awards: Award[] }[] = [
  {
    year: "2026",
    awards: [
      { title: "Best Use of Prediction Markets", issuer: "YHack" },
      { title: "Best Use of Solana", issuer: "Hack Canada · Major League Hacking" },
    ],
  },
  {
    year: "2025",
    awards: [
      {
        title: "Best Speaker Award",
        issuer: "Wilfrid Laurier University",
        note: "Selected as a top speaker for the Cineplex Live Case Competition.",
      },
      { title: "Semi-finalist", issuer: "Hack the North", note: "Top 32 chosen from 1200+ hackers." },
      { title: "Snapchat Finalist", issuer: "Hack the North", note: "Top 10 chosen from 40+ teams." },
      {
        title: "Top 10 Finalist",
        issuer: "Fintech Nexus & ICUBE UTM",
        note: "Recognised as a top startup from 600+ global entries.",
      },
      {
        title: "Ted Roger's Future Leaders Scholarship",
        issuer: "Ted Roger's",
        note: "Awarded $26,800 for academic achievement by Canada's largest scholarship program.",
      },
      {
        title: "2025 Tech Micro-Grant",
        issuer: "DMZ x myBlueprint",
        note: "Granted $500 to build Nom Nom, a domestic safety app disguised as a bakery ordering app.",
      },
      { title: "Principal's Award for Future Leadership", issuer: "Bur Oak Secondary School" },
      { title: "President's Scholarship of Distinction", issuer: "University of Waterloo" },
      {
        title: "District Award: Spirit of the Festival",
        issuer: "National Theatre School",
        note: "Co-directed an award-winning play chosen to compete in the regional round of Dramafest, a national theatre competition.",
      },
    ],
  },
  {
    year: "2024",
    awards: [
      {
        title: "Provincial Scholarship",
        issuer: "Loran Scholars Foundation",
        note: "Top 1% of applicants in Canada to receive a national scholarship from the largest national scholars program.",
      },
      {
        title: "Gr11 Computer Science",
        issuer: "Bur Oak Secondary School",
        note: "Top score for Grade 11 Computer Science (99%).",
      },
      { title: "Science Unlimited Design Challenge, Top 3", issuer: "University of Toronto" },
      { title: "GoodWill Ambassador", issuer: "TedEd" },
      { title: "2nd Place Nationals", issuer: "SAGE" },
      { title: "Top 4", issuer: "Engineers Without Borders: Moral Code Hackathon" },
      {
        title: "District Award: Spirit of the Festival",
        issuer: "National Theatre School",
        note: "Co-directed an award-winning play for DramaFest.",
      },
      { title: "Top 30 Provincials", issuer: "Ontario CMC Tesseract Math Competition" },
    ],
  },
  {
    year: "2023",
    awards: [
      {
        title: "District Award: Distinctive Merit for Commitment to the Absurd",
        issuer: "National Theatre School",
        note: "Acted in an award-winning play for DramaFest.",
      },
    ],
  },
  {
    year: "2021",
    awards: [{ title: "Faith in Action Award", issuer: "St Julia Billiart Catholic School" }],
  },
  {
    year: "2019",
    awards: [{ title: "First Class Honours with Distinction", issuer: "Royal Conservatory of Music" }],
  },
];

/** Sunny's own writing; a blank line inside a paragraph renders as a break. */
export const story = [
  "I grew up in the performing arts - dance, singing, every asian instrument out there. It was common for me to skip school for shows.",
  "In high school I was throwing and directing plays. Storytelling was my thing. I figured I'd take that into business, use it to craft narratives, understand what makes people care.",
  "Then my best friends dragged me to a hackathon.\n\nI didn't even know how to code. I barely knew what a hackathon was. But something clicked that weekend. I loved that the only limit was how fast you could learn. There's something about building at 3am with people you just met, fueled by nothing but redbull and delusion. I kept going back and forcing myself to learn more each time. I was addicted.",
  "So when it came time to pick a path for university, I couldn't choose. Cs or business? I decided I wanted both. Waterloo's cs/bba. I locked in and got the offer.",
  "Then I started making content. That led to growth work at 4 startups - I got obsessed with how products spread and why people care.",
  "Around the same time I started building in public and posting about a side project: an ai stylist. It got so much attention that we turned it into a real company. That's Oro today.",
  "I recently wrapped up my first swe internship at Rocket. Now I'm growing Oro and hosting events in Waterloo - scaling Notion, and bringing value to the city's founder community through Sip & Scale. All these random threads actually weave together to become my strength.",
  "To be honest, I don't have much of my career figured out. I'm learning to navigate being a founder, builder, and creator all at once. Some days it feels scattered.",
];

/** Sits directly after the hackathon paragraph. */
export const storyAside = "(thank you Aishwarya Tandon, Anahat Chhatwal, Vrinda Joshi)";
export const storyAsideAfter = 3;

export interface StoryPhoto {
  src: string;
  alt: string;
  /** CSS aspect-ratio; the crop is object-fit: cover. */
  aspect: string;
  width: number;
  rotate: number;
  /** Negative, so prints after the first overlap the one before. */
  marginLeft?: number;
  caption?: string;
}

export interface StoryPhotoRow {
  /** Opening words of the paragraph this row follows, or "aside". */
  after: string;
  /** The theatre trio must not wrap. */
  nowrap?: boolean;
  photos: StoryPhoto[];
}

const photo = (name: string) => `/assets/story/${name}.jpg`;

export const storyPhotoRows: StoryPhotoRow[] = [
  {
    after: "In high school",
    nowrap: true,
    photos: [
      { src: photo("dance-kids"), alt: "Dance performance as a kid", aspect: "16/10", width: 252, rotate: -2.4, caption: "skipping school for shows" },
      { src: photo("backstage"), alt: "Backstage before a show", aspect: "3/4", width: 176, rotate: 3, marginLeft: -46, caption: "backstage, years later" },
      { src: photo("curtain-call"), alt: "Curtain call for a school play", aspect: "16/9", width: 248, rotate: 2, marginLeft: -52, caption: "curtain call" },
    ],
  },
  {
    after: "aside",
    photos: [
      { src: photo("hack-the-north"), alt: "Hack the North photobooth strip", aspect: "2/3", width: 158, rotate: -3.2, caption: "Hack the North '25" },
      { src: photo("uni-friends"), alt: "With friends on campus", aspect: "4/3", width: 238, rotate: 2.2, marginLeft: -30, caption: "the ones who dragged me there" },
    ],
  },
  {
    after: "Then I started making content",
    photos: [
      { src: photo("stan"), alt: "At the Stan office", aspect: "3/4", width: 180, rotate: 2.6, caption: "Stan" },
      { src: photo("polarity"), alt: "Group photo with the Polarity team", aspect: "4/3", width: 246, rotate: -2, marginLeft: -32, caption: "Polarity" },
    ],
  },
  {
    after: "Around the same time",
    photos: [
      { src: photo("fashion-art-toronto"), alt: "On the carpet at Fashion Week", aspect: "3/4", width: 196, rotate: 3, caption: "Fashion Week '26" },
    ],
  },
  {
    after: "I recently wrapped up",
    photos: [
      { src: photo("rocket-team"), alt: "With the Rocket team", aspect: "5/4", width: 262, rotate: -2, caption: "the Rocket team" },
      { src: photo("desk"), alt: "Working from the office", aspect: "3/4", width: 172, rotate: 3, marginLeft: -28, caption: "still building" },
    ],
  },
];

export const contentIntro =
  "I started posting to think out loud, and writing it down made me figure out what i believed, so here we are. I believe in two things: connection and mentorship. Posting got me both - mentors who answer my questions, students who now ask me theirs, and a long list of friends i'd never have met otherwise.";

export const contentAside = "(i still get nervous before hitting post)";

export interface ContentPhone {
  platform: string;
  count: string;
  topics: string;
  video: string;
  poster: string;
  /** Resting tilt in degrees; the pair lean away from each other. */
  rotate: number;
  /** Omitted until the real profile URL is known. */
  profile?: string;
}

export const contentPhones: ContentPhone[] = [
  {
    platform: "LinkedIn",
    count: "10.5k followers",
    topics: "student life, productivity, early career",
    video: "/assets/content/linkedin-scroll.mp4",
    poster: "/assets/content/linkedin-poster.jpg",
    rotate: -2,
    profile: "https://www.linkedin.com/in/sunny-wu-dev/",
  },
  {
    platform: "Instagram",
    count: "2.5k followers",
    topics: "fashion, gratitude & mindset, early career",
    video: "/assets/content/insta-scroll.mp4",
    poster: "/assets/content/insta-poster.jpg",
    rotate: 2.4,
    profile: "https://www.instagram.com/imsunnywu/",
  },
];

export interface ContentPost {
  hook: string;
  image: string;
  href: string;
  cta: string;
  /** LinkedIn shots crop from the left so the hook's first word survives. */
  objectPosition: string;
  rotate: number;
}

const LINKEDIN_POST = "https://www.linkedin.com/posts/sunny-wu-dev_";

export const contentPosts: ContentPost[] = [
  {
    hook: "I wasn't allowed to eat lunch until I practiced piano.",
    image: "post-piano",
    href: `${LINKEDIN_POST}i-wasnt-allowed-to-eat-lunch-until-i-practiced-activity-7356127507705643008-7Ucx`,
    cta: "read it",
    objectPosition: "left top",
    rotate: -2.6,
  },
  {
    hook: "Time is the only thing you steal without getting caught.",
    image: "post-time",
    href: `${LINKEDIN_POST}time-is-the-only-thing-you-steal-without-activity-7357379594850566144-yChT`,
    cta: "read it",
    objectPosition: "left top",
    rotate: 2.2,
  },
  {
    hook: "walked out of a brutal math quiz and straight into one of the prettiest sunsets",
    image: "post-sunset",
    href: `${LINKEDIN_POST}walked-out-of-a-brutal-math-quiz-and-straight-activity-7393145531688165376-1iB7`,
    cta: "read it",
    objectPosition: "left top",
    rotate: -1.6,
  },
  {
    hook: "i'm 19 today. (long post ahead, i'm sorry in advance)",
    image: "post-19",
    href: `${LINKEDIN_POST}im-19-today-long-post-ahead-im-sorry-activity-7473347813569941504-tM4P`,
    cta: "read it",
    objectPosition: "left top",
    rotate: 3,
  },
  {
    hook: "my net worth is $14 million.",
    image: "post-networth",
    href: `${LINKEDIN_POST}my-net-worth-is-14-million-i-ran-the-activity-7458737347828862977-G0pQ`,
    cta: "read it",
    objectPosition: "left top",
    rotate: -2.2,
  },
  {
    hook: "never hire a jack of all trades",
    image: "post-jack",
    href: `${LINKEDIN_POST}never-hire-a-jack-of-all-trades-if-you-activity-7488564097308082177-_udh`,
    cta: "read it",
    objectPosition: "left top",
    rotate: 1.8,
  },
  {
    hook: "i don't want to be impressive for my age.",
    image: "post-impressive",
    href: `${LINKEDIN_POST}i-dont-want-to-be-impressive-for-my-age-activity-7488926451539304448-QfB5`,
    cta: "read it",
    objectPosition: "left top",
    rotate: -3,
  },
  {
    hook: "just do the scary thing.",
    image: "ig-scary",
    href: "https://www.instagram.com/reel/DZAXpcMumqW/",
    cta: "watch it",
    objectPosition: "center top",
    rotate: 2.4,
  },
  {
    hook: "fits recently",
    image: "ig-fits",
    href: "https://www.instagram.com/p/Dcjs_3xmqB0/",
    cta: "watch it",
    objectPosition: "center top",
    rotate: -2,
  },
  {
    hook: "i get bored of everything",
    image: "ig-bored",
    href: "https://www.instagram.com/reel/DaIrDj5glqv/",
    cta: "watch it",
    objectPosition: "center top",
    rotate: 1.6,
  },
  {
    hook: "maxxing my stats at 19",
    image: "ig-maxxing",
    href: "https://www.instagram.com/reel/Dclhs01BGYg/",
    cta: "watch it",
    objectPosition: "center top",
    rotate: -2.8,
  },
];
