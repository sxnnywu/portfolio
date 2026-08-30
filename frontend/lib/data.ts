export const socials = [
  { label: "Github", href: "https://github.com/sxnnywu" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/sunny-wu-dev/" },
  { label: "Email", href: "mailto:w.sunny0618@gmail.com" },
];

export const education = [
  { program: "Computer science", school: "University of Waterloo" },
  { program: "Business administration", school: "Lazaridis School of Business" },
];

export const stats = [
  { value: "4", label: "Hackathon wins" },
  { value: "8M+", label: "Community built" },
  { value: "1M+", label: "Views for 4 startups" },
  { value: "13k", label: "Followers" },
];

/** Tints deepen down the stack so the list leans into the contact sky. */
export const navRows = [
  { href: "/work", title: "Work", blurb: "11 roles across swe, product, growth and ops", tint: 0.1 },
  { href: "/projects", title: "Projects", blurb: "Things I build for fun", tint: 0.16 },
  { href: "/awards", title: "Awards", blurb: "4 hackathon wins", tint: 0.22 },
  { href: "/story", title: "Story", blurb: "Theatre kid who learned to build", tint: 0.28 },
];

export const disciplines = ["engineering", "product", "growth", "ops"] as const;
export type Discipline = (typeof disciplines)[number];

export interface Role {
  title: string;
  company: string;
  dates: string;
  location: string;
  tags: Discipline[];
  /** Braces mark the figures that print in blue ink. */
  bullets: string[];
}

export const roles: Role[] = [
  {
    title: "Co-Founder",
    company: "Oro",
    dates: "Jan 2026 - present",
    location: "Toronto",
    tags: ["engineering", "product", "growth", "ops"],
    bullets: [
      "{2,000+} downloads across app store and play store",
      "Gained {520k+} views across socials",
      "Featured at toronto fashion week, summer '26",
    ],
  },
  {
    title: "Campus Leader",
    company: "Notion",
    dates: "Aug 2026 - present",
    location: "Waterloo",
    tags: ["growth", "ops"],
    bullets: ["Scaling notion in waterloo"],
  },
  {
    title: "Software Engineer Intern",
    company: "Rocket",
    dates: "May - aug 2026",
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
    dates: "Apr - aug 2026",
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
    dates: "Mar - jun 2026",
    location: "Remote",
    tags: ["growth"],
    bullets: ["Wrote content reaching {370k+} impressions"],
  },
  {
    title: "Growth",
    company: "Polarity",
    dates: "Apr - may 2026",
    location: "Remote",
    tags: ["growth"],
    bullets: ["Wrote content reaching {200k+} impressions"],
  },
  {
    title: "Growth & Operations",
    company: "1851 Labs",
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
    dates: "Feb 2026",
    location: "Remote",
    tags: ["growth"],
    bullets: ["{40k+} impressions from a single post", "Top engagement across creators"],
  },
  {
    title: "Founder & Chief Executive Officer",
    company: "The Pink Stairs",
    dates: "Jun 2024 - dec 2025",
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
