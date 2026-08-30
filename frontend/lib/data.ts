export interface ExperienceEntry {
  id: number;
  date: string;
  role: string;
  company: string;
  location: string;
  stats: string[];
  logo?: string;
}

export interface Project {
  id: number;
  name: string;
  tags: string[];
  image?: string;
  rotation: number;
  github?: string;
}

export interface AwardEntry {
  name: string;
  institution: string;
  detail?: string;
  year: string;
}

export interface AwardSection {
  category: string;
  items: AwardEntry[];
}

export interface OrgEntry {
  id: number;
  name: string;
  role: string;
  dates: string;
  description: string;
  stats: string[];
  logo?: string;
}

export interface Feature {
  id: number;
  image?: string;
  title: string;
  rotation: number;
  link?: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: 1,
    date: "incoming may 2026",
    role: "software engineer intern",
    company: "rocket",
    location: "remote",
    stats: ["incoming :)"],
  },
  {
    id: 2,
    date: "apr 2025 – present",
    role: "founding creator",
    company: "polarity",
    location: "waterloo",
    stats: ["33k+ impressions"],
  },
  {
    id: 3,
    date: "apr 2025 – apr 2025",
    role: "growth operator",
    company: "1851 labs",
    location: "toronto",
    stats: ["500k+ users", "600k+ impressions"],
  },
  {
    id: 4,
    date: "mar 2025 – apr 2025",
    role: "growth fellow",
    company: "stan",
    location: "toronto",
    stats: ["$35M ARR", "300k+ impressions", "founding cohort"],
  },
  {
    id: 5,
    date: "feb 2024 – jun 2024",
    role: "data intern",
    company: "skans accountants",
    location: "markham",
    stats: ["15+ clients", "10+ corporate tax returns", "$2,000+ in client funds"],
  },
  {
    id: 6,
    date: "aug 2022 – mar 2024",
    role: "frontend supervisor",
    company: "vanspall's no frills",
    location: "markham",
    stats: ["20+ cashiers trained and supervised", "$2000+ theft prevented", "100 transactions/hour"],
  },
];

export const projects: Project[] = [
  { id: 1, name: "alicebot", tags: ["ai agents", "prediction markets"], rotation: -4 },
  { id: 2, name: "sort.it", tags: ["react", "typescript"], rotation: 3 },
  { id: 3, name: "breast tumor detector", tags: ["python", "ml"], rotation: -2 },
  { id: 4, name: "bonanza", tags: ["node", "react"], rotation: 5 },
  { id: 5, name: "ellmuright", tags: ["next.js", "typescript"], rotation: -3 },
  { id: 6, name: "ton_run", tags: ["solana", "web3"], rotation: 4 },
  { id: 7, name: "nomads", tags: ["travel", "react"], rotation: -5 },
  { id: 8, name: "choiceboard", tags: ["react", "accessibility"], rotation: 2 },
];

export const awards: AwardSection[] = [
  {
    category: "hackathon wins",
    items: [
      { name: "best use of polymarket", institution: "yhack", year: "2026" },
      { name: "best use of solana", institution: "hack canada", year: "2026" },
      { name: "finalist · snapchat top 10", institution: "hack the north", year: "2025" },
      { name: "top 4", institution: "engineers without borders", year: "2024" },
    ],
  },
  {
    category: "scholarships",
    items: [
      { name: "future leaders scholarship", institution: "ted rogers", year: "2025" },
      { name: "provincial scholar", institution: "loran foundation", year: "2025" },
      { name: "president's scholarship of distinction", institution: "university of waterloo", year: "2025" },
    ],
  },
  {
    category: "academic",
    items: [
      { name: "president's scholarship of distinction", institution: "university of waterloo", year: "2025" },
      { name: "computer science distinctive award", institution: "bur oak secondary school", year: "2025" },
      { name: "principal's award for future leadership", institution: "bur oak secondary school", year: "2025" },
      { name: "computer science distinctive award", institution: "bur oak secondary school", year: "2024" },
    ],
  },
  {
    category: "competitions",
    items: [
      { name: "tech micro-grant", institution: "dmz", year: "2025" },
      { name: "2nd place nationals", institution: "sage", year: "2025" },
      { name: "top 20 provincials", institution: "ontario cmc", year: "2024" },
    ],
  },
  {
    category: "theatre",
    items: [
      { name: "spirit of the festival", institution: "national theatre school", year: "2025" },
      { name: "spirit of the festival", institution: "national theatre school", year: "2024" },
      { name: "distinctive merit for commitment to the absurd", institution: "national theatre school", year: "2024" },
    ],
  },
];

export const communityMade: OrgEntry[] = [
  {
    id: 1,
    name: "the pink stairs",
    role: "founder & ceo | dept. of board of directors",
    dates: "jun 2024 – present",
    description: "global youth-led nonprofit advancing gender equity",
    stats: [
      "30+ girls in 20 countries",
      "17k+ followers",
      "assembled & donated 500+ care packages to domestic violence survivors",
    ],
  },
  {
    id: 2,
    name: "byte-sized coding",
    role: "founding author",
    dates: "jan 2024 – may 2024",
    description: "coding workbook for kids",
    stats: ["donated to students across 3+ continents", "200+ copies", "100+ hours"],
  },
];

export const communityJoined: OrgEntry[] = [
  {
    id: 1,
    name: "uw blueprint",
    role: "project manager",
    dates: "jan 2025 – present",
    description: "building software for small businesses + nonprofits",
    stats: ["500+ volunteers", "1000+ community hours"],
  },
  {
    id: 2,
    name: "ignition hacks",
    role: "director of development",
    dates: "oct 2025 – present",
    description: "student-led hackathon based in toronto",
    stats: ["50k+ hackers", "leading 4 engineers"],
  },
  {
    id: 3,
    name: "uw women in computer science",
    role: "committee",
    dates: "present",
    description: "@ uwaterloo promoting gender equity in tech",
    stats: ["hosted biweekly events exceeding listening goals by 30%"],
  },
  {
    id: 4,
    name: "mind4youth",
    role: "director of outreach",
    dates: "may 2025 – may 2025",
    description: "making youth mental health resources accessible",
    stats: ["$450k+ raised", "21% self-care products distributed", "25+ therapy sessions funded"],
  },
  {
    id: 5,
    name: "empowerio",
    role: "director of workshop",
    dates: "jan 2024 – jul 2024",
    description: "youth-led nonprofit creating stem opportunities for youth",
    stats: ["200+ attendees", "4+ chapters worldwide"],
  },
  {
    id: 6,
    name: "youth united project",
    role: "member",
    dates: "aug 2023 – oct 2023",
    description: "youth-led nonprofit making quality education accessible",
    stats: ["tutored students 1-on-1 globally"],
  },
];

export const features: Feature[] = [
  { id: 1, title: "climbing together: leading together", rotation: -6 },
  { id: 2, title: "innovation insider 09", rotation: 3 },
  { id: 3, title: "one of the largest youth-led nonprofits empowering women", rotation: -2 },
];

export const socials = [
  { label: "linkedin", href: "https://linkedin.com/in/sunnywuu" },
  { label: "github", href: "https://github.com/sunnywuu" },
  { label: "x", href: "https://x.com/sunnywuu" },
  { label: "resume", href: "/resume.pdf" },
  { label: "email", href: "mailto:w.sunny0618@gmail.com" },
];
