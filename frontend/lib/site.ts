/** Canonical origin. Shared so metadata, the sitemap and robots cannot disagree. */
export const SITE_URL = "https://www.sunny-wu.ca";

/** Every route, most important first; drives the sitemap. */
export const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/work", priority: 0.9 },
  { path: "/projects", priority: 0.9 },
  { path: "/story", priority: 0.7 },
  { path: "/awards", priority: 0.6 },
] as const;
