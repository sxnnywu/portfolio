import Image from "next/image";
import CloudHeader from "@/components/CloudHeader";
import TimelineEntry from "@/components/TimelineEntry";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <main>
      <CloudHeader />

      <div className="max-w-2xl mx-auto px-8 pb-24 relative">
        {/* Lemon decoration */}
        <Image
          src="/assets/lemon.png"
          alt=""
          width={110}
          height={110}
          className="absolute right-0 top-64 pointer-events-none"
        />

        <h1 className="font-display text-6xl text-indigo text-center mb-6 mt-10">experience</h1>

        <div className="text-center mb-12">
          <a
            href="/resume.pdf"
            target="_blank"
            className="font-body text-sm text-indigo underline hover:opacity-60 transition-opacity"
          >
            download resume
          </a>
        </div>

        {/* Timeline */}
        <div>
          {experience.map((entry, i) => (
            <TimelineEntry
              key={entry.id}
              date={entry.date}
              role={entry.role}
              company={entry.company}
              location={entry.location}
              stats={entry.stats}
              logo={entry.logo}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
