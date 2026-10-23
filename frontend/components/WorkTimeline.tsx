"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { highlightMetrics } from "@/lib/highlight";
import { color, font, layout } from "@/lib/tokens";
import { disciplines, roleSlug, roles, type Discipline } from "@/lib/data";
import styles from "./WorkTimeline.module.css";

const FILTER_BASE = {
  fontFamily: font.sans,
  cursor: "pointer",
  padding: "7px 15px",
  borderRadius: 999,
  fontSize: 11,
  letterSpacing: ".16em",
  textTransform: "uppercase",
  transition: "background .2s ease, color .2s ease, border-color .2s ease",
} as const;

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        ...FILTER_BASE,
        border: `1px solid ${active ? "transparent" : "rgba(42,42,36,.18)"}`,
        background: active ? color.inkDeepSky : "transparent",
        color: active ? "#f6fafd" : color.bodyAlt,
      }}
    >
      {active && <span aria-hidden="true" style={{ marginRight: 6 }}>✓</span>}
      {label}
    </button>
  );
}

export default function WorkTimeline() {
  const [selected, setSelected] = useState<Set<Discipline>>(new Set());

  // Read once on mount rather than through useSearchParams, which would opt the
  // whole page out of static rendering. Deferred by a tick so the state change
  // lands after the effect rather than cascading a render inside it.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("discipline");
    if (!wanted || !(disciplines as readonly string[]).includes(wanted)) return;
    const id = setTimeout(() => setSelected(new Set([wanted as Discipline])), 0);
    return () => clearTimeout(id);
  }, []);

  const toggle = (tag: Discipline) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });

  // No selection means everything shows; otherwise a role needs any one of the picked disciplines.
  const visible = roles.filter(
    (role) => selected.size === 0 || role.tags.some((tag) => selected.has(tag)),
  );

  return (
    <>
      <div
        className="work-filters"
        style={{
          maxWidth: layout.maxWidth,
          margin: "0 auto",
          padding: "90px 6vw 34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div id="discipline-label" style={{ fontSize: 13, color: color.inkDeepSky }}>Filter by discipline</div>
          <div id="discipline-hint" style={{ marginTop: 4, fontSize: 12, color: color.skyInkLight }}>Choose one or more</div>
        </div>
        <div role="group" aria-labelledby="discipline-label" aria-describedby="discipline-hint" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <FilterButton
            label="All"
            active={selected.size === 0}
            onClick={() => setSelected(new Set())}
          />
          {disciplines.map((tag) => (
            <FilterButton
              key={tag}
              label={tag}
              active={selected.has(tag)}
              onClick={() => toggle(tag)}
            />
          ))}
        </div>
      </div>

      <div className="work-timeline" style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "0 6vw 120px" }}>
        <div
          data-filter-list
          key={[...selected].sort().join(",") || "all"}
          className={styles.list}
        >
          {visible.map((role) => (
            <article
              key={`${role.title}-${role.company}`}
              id={roleSlug(role.company)}
              aria-labelledby={`${roleSlug(role.company)}-title`}
              className={styles.role}
            >
              <div className={role.logos ? styles.logoStack : styles.logo} aria-hidden="true">
                {role.logos ? role.logos.map((src) => <Logo key={src} src={src} size={30} />)
                  : role.logo ? <Logo src={role.logo} size={48} /> : <span>{role.company[0]}</span>}
              </div>
              <div className={styles.details}>
                <h2 id={`${roleSlug(role.company)}-title`} className={styles.title}>{role.title}</h2>
                <p className={styles.company}>{role.company}</p>
                <p className={styles.meta}>{role.dates} <span aria-hidden="true">·</span> {role.location}</p>
                <ul id={`${roleSlug(role.company)}-bullets`} className={styles.bullets}>
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{highlightMetrics(bullet)}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
