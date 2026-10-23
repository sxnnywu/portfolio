"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { color, font } from "@/lib/tokens";
import { scrollToContact } from "@/lib/scrollToContact";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/awards", label: "Awards" },
  { href: "/content", label: "Content" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(false);
  const cancelContactScroll = useRef<(() => void) | null>(null);

  useEffect(() => () => cancelContactScroll.current?.(), [pathname]);

  const visitContact = (event: MouseEvent<HTMLAnchorElement>) => {
    // Home maps this link to its scroll-driven camera; let that handler own it.
    if (isHome || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById("contact");
    if (!target) return;
    event.preventDefault();
    cancelContactScroll.current?.();
    if (window.location.hash !== "#contact") window.history.pushState(null, "", "#contact");
    const headerBottom = event.currentTarget.closest("[data-site-header]")?.getBoundingClientRect().bottom ?? 80;
    cancelContactScroll.current = scrollToContact(target, headerBottom + 16);
  };

  useEffect(() => {
    const threshold = () => (isHome ? window.innerHeight * 0.7 : 140);
    const sync = () => setSolid(window.scrollY > threshold());
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [isHome]);

  // On Home the hero already says the name, so the brand only appears once the bar solidifies.
  const brandVisible = !isHome || solid;

  return (
    <div
      data-site-header
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "26px clamp(24px,6vw,80px) 16px",
        background: solid ? "rgba(253,250,241,.88)" : "rgba(253,250,241,0)",
        backdropFilter: solid ? "blur(10px)" : "none",
        WebkitBackdropFilter: solid ? "blur(10px)" : "none",
        borderBottom: `1px solid ${solid ? "rgba(42,42,36,.1)" : "rgba(42,42,36,0)"}`,
        transition:
          "background .35s ease, backdrop-filter .35s ease, border-color .35s ease",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: font.serif,
          fontSize: 19,
          fontWeight: 300,
          color: color.ink,
          opacity: brandVisible ? 1 : 0,
          pointerEvents: brandVisible ? "auto" : "none",
          transition: "opacity .35s ease",
        }}
      >
        Sunny Wu
      </Link>
      <div style={{ display: "flex", gap: "clamp(16px,2.2vw,30px)", fontSize: 13.5 }}>
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{ color: pathname === href ? color.ink : color.bodyAlt }}
          >
            {label}
          </Link>
        ))}
        <a href="#contact" onClick={visitContact} style={{ color: color.blueInk }}>
          Contact
        </a>
      </div>
    </div>
  );
}
