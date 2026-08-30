"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Polaroid from "@/components/Polaroid";
import HobbiesModal from "@/components/HobbiesModal";
import { socials } from "@/lib/data";

const coolThings = [
  { caption: "i scaled my nonprofit to 30+ girls in 20 countries", rotation: -3 },
  { caption: "i grew my startup's waitlist to 12k+ signups", rotation: 2 },
  { caption: "i drive 200k+ impressions for a consumer startup ($20M ARR)", rotation: -2 },
];

const moreLinks = [
  { label: "work experience", href: "/experience" },
  { label: "awards", href: "/awards" },
  { label: "projects", href: "/projects" },
  { label: "features", href: "/features" },
  { label: "community", href: "/community" },
  { label: "hobbies", href: null },
];

export default function Home() {
  const [hobbiesOpen, setHobbiesOpen] = useState(false);

  return (
    <main className="max-w-3xl mx-auto px-8 pb-24">
      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-12 pb-6">
        <Image src="/assets/sun.png" alt="sun" width={96} height={96} className="mb-5" />
        <h1 className="font-display text-7xl text-indigo mb-3">hey, i&apos;m Sunny</h1>
        <p className="font-body text-sm text-indigo/70 leading-relaxed">
          computer science @ uwaterloo<br />
          business administration @ laurier
        </p>
      </section>

      {/* About */}
      <section className="flex gap-12 items-start py-10">
        <div className="flex-1">
          <h2 className="font-display text-5xl text-indigo mb-1">i like big ideas</h2>
          <p className="font-body text-sm text-indigo/50 italic mb-5">... and the terror of trying them.</p>
          <ul className="font-body text-sm space-y-1.5 mb-5 text-indigo/80">
            <li className="flex items-center gap-2">
              <Image src="/assets/bee.png" alt="" width={16} height={16} />
              <span><strong>focus:</strong> software, product, growth</span>
            </li>
            <li className="flex items-center gap-2">
              <Image src="/assets/butterfly.png" alt="" width={16} height={16} />
              <span><strong>now:</strong> travel, polarity</span>
            </li>
            <li className="flex items-center gap-2">
              <Image src="/assets/stars.png" alt="" width={16} height={16} />
              <span><strong>past:</strong> stan, polarity, 1851 labs</span>
            </li>
          </ul>
          <div className="flex gap-4 flex-wrap text-sm font-body mb-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-indigo underline hover:opacity-60 transition-opacity"
              >
                {s.label}
              </a>
            ))}
          </div>
          <p className="font-body text-sm text-indigo/80">
            currently building{" "}
            <a
              href="https://buildingoro.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-60 transition-opacity"
            >
              oro
            </a>{" "}
            (ask me about it)
          </p>
        </div>

        <div className="relative flex-shrink-0 mt-2">
          <div className="w-44 h-44 rounded-full overflow-hidden ring-4 ring-white shadow-md">
            <Image
              src="/assets/sunny_headshot.jpg"
              alt="Sunny Wu"
              width={176}
              height={176}
              className="object-cover w-full h-full"
            />
          </div>
          <Image
            src="/assets/sunflower.png"
            alt=""
            width={72}
            height={72}
            className="absolute -bottom-6 -right-8 pointer-events-none"
          />
        </div>
      </section>

      {/* Cool things */}
      <section className="py-14 text-center">
        <h2 className="font-display text-5xl text-indigo mb-10">some cool things about me</h2>
        <div className="flex justify-center gap-8 flex-wrap items-start">
          {coolThings.map((item, i) => (
            <Polaroid
              key={i}
              caption={item.caption}
              rotation={item.rotation}
              className="w-44"
            />
          ))}
        </div>
      </section>

      {/* More about me */}
      <section className="py-8">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-display text-5xl text-indigo">more about me:</h2>
          <Image src="/assets/smiley.png" alt="" width={36} height={36} />
        </div>
        <div className="grid grid-cols-2 gap-x-20 gap-y-3 max-w-xs">
          {moreLinks.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="font-body text-sm text-indigo underline hover:opacity-60 transition-opacity"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => setHobbiesOpen(true)}
                className="font-body text-sm text-indigo underline hover:opacity-60 transition-opacity text-left"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </section>

      {/* Let's chat */}
      <section className="py-16 text-center">
        <h2 className="font-display text-6xl text-indigo mb-6">let&apos;s chat!</h2>
        <div className="flex justify-center gap-5 flex-wrap">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="font-body text-sm text-indigo underline hover:opacity-60 transition-opacity"
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>

      {hobbiesOpen && <HobbiesModal onClose={() => setHobbiesOpen(false)} />}
    </main>
  );
}
