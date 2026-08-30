import { externalLinkProps } from "@/lib/links";
import { color, font, rule, skyTint } from "@/lib/tokens";
import type { Project } from "@/lib/data";

const AWARD_PAPER = "#fffaef";
const BASE_SHADOW =
  "0 1px 0 rgba(42,42,36,.1), 0 16px 30px -22px rgba(60,50,30,.55)";
const AWARD_SHADOW = `inset 0 0 0 1px rgba(196,157,58,.4), ${BASE_SHADOW}`;

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
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
      {children}
    </span>
  );
}

export default function ProjectCard({
  project,
  paper,
  rotation,
}: {
  project: Project;
  paper: string;
  rotation: number;
}) {
  const isAward = Boolean(project.award);
  // The tape strip counter-rotates against the card so it reads as stuck on afterwards.
  const tapeRotation = (rotation * -2.4).toFixed(1);
  const shownLinks = project.links.filter((link) => link.href);

  return (
    <div
      data-project-card
      {...(isAward ? { "data-award": "" } : null)}
      style={{
        position: "relative",
        padding: "30px 30px 26px",
        background: isAward ? AWARD_PAPER : paper,
        borderRadius: 3,
        ...(isAward ? { overflow: "hidden" } : null),
        boxShadow: isAward ? AWARD_SHADOW : BASE_SHADOW,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {isAward && (
        <div
          style={{
            position: "absolute",
            right: -42,
            top: 16,
            width: 150,
            transform: "rotate(45deg)",
            background: color.gold,
            color: AWARD_PAPER,
            textAlign: "center",
            padding: "5px 0",
            fontSize: 9.5,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            boxShadow: "0 2px 6px -2px rgba(120,90,20,.5)",
          }}
        >
          Winner
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: -11,
          transform: `translateX(-50%) rotate(${tapeRotation}deg)`,
          width: 86,
          height: 22,
          background: "rgba(196,222,240,.55)",
          boxShadow: "0 1px 3px rgba(60,80,110,.12)",
        }}
      />

      <div style={{ fontFamily: font.serif, fontStyle: "italic", fontSize: 14, color: color.mutedLight }}>
        {project.date}
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: font.serif,
          fontSize: 28,
          fontWeight: 300,
          lineHeight: 1.15,
          color: color.inkDeepSky,
        }}
      >
        {project.name}
      </div>
      {project.award && (
        <div
          style={{
            marginTop: 8,
            fontFamily: font.serif,
            fontStyle: "italic",
            fontSize: 14.5,
            lineHeight: 1.4,
            color: color.goldInk,
          }}
        >
          {project.award}
        </div>
      )}
      <div
        style={{
          marginTop: 11,
          fontFamily: font.serif,
          fontWeight: 300,
          fontSize: 17,
          lineHeight: 1.55,
          color: color.body,
        }}
      >
        {project.description}
      </div>

      <div
        style={{
          marginTop: 16,
          paddingTop: 14,
          borderTop: `1px dashed ${rule.hairlineDashed}`,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        {project.tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
        {project.moreTags ? <Chip>+{project.moreTags}</Chip> : null}
      </div>

      {shownLinks.length > 0 && (
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 18 }}>
          {shownLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...externalLinkProps(link.href!)}
              style={{
                fontSize: 13,
                color: color.blueInk,
                borderBottom: "1px solid rgba(38,53,168,.3)",
                paddingBottom: 1,
              }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
