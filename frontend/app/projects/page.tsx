import ContactSection from "@/components/ContactSection";
import ProjectCard from "@/components/ProjectCard";
import SkyBand from "@/components/SkyBand";
import { projects } from "@/lib/data";
import { layout } from "@/lib/tokens";

export const metadata = { title: "Projects — Sunny Wu" };

const PAPER = [
  "#fffdf6",
  "#fdf6e6",
  "#fbf3e2",
  "#fffdf6",
  "#f7f4ea",
  "#fdf6e6",
  "#fffdf6",
  "#f8f3e6",
];
const ROTATION = [-1.6, 1.2, -0.8, 1.8, -1.9, 0.9, -1.2, 1.5];

export default function Projects() {
  return (
    <>
      <SkyBand
        sublineText={"What happens when you give me a weekend and a deadline"}
        title="Projects"
        subline="What happens when you give me a weekend and a deadline"
      />

      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "90px 6vw 34px" }} />

      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "0 6vw 130px" }}>
        {/* A grid, not CSS columns: columns fill top-to-bottom and would scramble the order. */}
        <div
          data-project-grid
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 26,
            alignItems: "start",
          }}
        >
          {projects.map((project, i) => (
            <div key={project.name} data-reveal>
              <ProjectCard
                project={project}
                paper={PAPER[i % PAPER.length]}
                rotation={ROTATION[i % ROTATION.length]}
              />
            </div>
          ))}
        </div>
      </div>

      <ContactSection />
    </>
  );
}
