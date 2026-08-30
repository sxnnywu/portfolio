"use client";

import { useState } from "react";
import { highlightMetrics } from "@/lib/highlight";
import { color, font, layout, rule, skyTint } from "@/lib/tokens";
import { disciplines, roles, type Discipline } from "@/lib/data";

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
      {label}
    </button>
  );
}

export default function WorkTimeline() {
  const [selected, setSelected] = useState<Set<Discipline>>(new Set());

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
        style={{
          maxWidth: layout.maxWidth,
          margin: "0 auto",
          padding: "90px 6vw 34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
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

      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "0 6vw 120px" }}>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", paddingLeft: 34 }}>
          <div
            style={{
              position: "absolute",
              left: 5,
              top: 14,
              bottom: 14,
              width: 1,
              background: rule.statBand,
            }}
          />
          {visible.map((role, i) => (
            <div
              key={`${role.title}-${role.company}`}
              style={{
                position: "relative",
                padding: "0 0 46px",
                borderBottom: i === visible.length - 1 ? `1px solid ${rule.hairline}` : "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -34,
                  top: 6,
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: color.paper,
                  border: `1.5px solid ${color.blueInk}`,
                }}
              />
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: font.serif,
                    fontSize: "clamp(26px,2.8vw,34px)",
                    fontWeight: 300,
                    lineHeight: 1.2,
                    color: color.inkDeepSky,
                  }}
                >
                  {role.title}
                </span>
                <span
                  style={{
                    fontFamily: font.serif,
                    fontStyle: "italic",
                    fontSize: 23,
                    fontWeight: 300,
                    color: color.skyInkLight,
                  }}
                >
                  @&nbsp;{role.company}
                </span>
                <span
                  style={{
                    fontFamily: font.serif,
                    fontStyle: "italic",
                    fontSize: 16,
                    lineHeight: 1.5,
                    color: color.mutedLight,
                    marginLeft: "auto",
                    textAlign: "right",
                  }}
                >
                  {role.dates}
                  <br />
                  {role.location}
                </span>
              </div>

              <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 11px",
                      borderRadius: 999,
                      background: skyTint(0.28),
                      fontSize: 10.5,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: color.skyInkLight,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <ul
                style={{
                  margin: "14px 0 0",
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                  maxWidth: 620,
                }}
              >
                {role.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    style={{
                      fontFamily: font.serif,
                      fontWeight: 300,
                      fontSize: 18,
                      lineHeight: 1.55,
                      color: color.body,
                    }}
                  >
                    {highlightMetrics(bullet)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
