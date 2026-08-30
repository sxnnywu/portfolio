import CloudHeader from "@/components/CloudHeader";
import Polaroid from "@/components/Polaroid";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <main>
      <CloudHeader />

      <div className="max-w-4xl mx-auto px-8 pb-24">
        <h1 className="font-display text-6xl text-indigo text-center mb-4 mt-10">projects</h1>

        <div className="text-center mb-14">
          <a
            href="https://github.com/sunnywuu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-indigo underline hover:opacity-60 transition-opacity"
          >
            sunny&apos;s github
          </a>
        </div>

        {/* Scattered polaroid layout */}
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                marginTop: project.id % 2 === 0 ? "24px" : "0px",
              }}
            >
              <Polaroid
                src={project.image}
                alt={project.name}
                rotation={project.rotation}
                className="w-44"
              >
                <div className="mt-2 text-center">
                  <p className="font-body text-sm font-bold text-indigo">{project.name}</p>
                  <div className="flex flex-wrap gap-1 justify-center mt-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-body text-indigo/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Polaroid>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
