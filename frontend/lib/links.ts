/** Anchor props that send off-site links to a new tab; in-page and mailto links stay put. */
export function externalLinkProps(href: string) {
  return href.startsWith("http")
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}
