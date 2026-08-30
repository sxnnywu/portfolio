"use client";

import { useRef } from "react";
import { externalLinkProps } from "@/lib/links";
import { color, font, type } from "@/lib/tokens";
import { cardTilts, contentPosts } from "@/lib/data";

const CARD_WIDTH = 258;
const CARD_GAP = 26;
const CARDS_PER_STEP = 2;

/** Featured posts as pinned snapshots on a swipeable rail. */
export default function PostCarousel() {
  const rail = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    rail.current?.scrollBy({
      left: direction * (CARD_WIDTH + CARD_GAP) * CARDS_PER_STEP,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div data-rail-head>
        <span style={type.sectionTitle}>my highlights</span>
        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" data-rail-arrow aria-label="Previous posts" onClick={() => scrollBy(-1)}>
            &larr;
          </button>
          <button type="button" data-rail-arrow aria-label="Next posts" onClick={() => scrollBy(1)}>
            &rarr;
          </button>
        </div>
      </div>

      <div data-rail ref={rail}>
        {contentPosts.map((post, slot) => (
          <a
            key={post.image}
            href={post.href}
            {...externalLinkProps(post.href)}
            data-post-card
            style={{ ["--post-rot" as string]: `${cardTilts[slot % cardTilts.length]}deg` }}
          >
            <span data-pin aria-hidden />
            <span data-post-well>
              <img
                src={`/assets/content/${post.image}.jpg`}
                alt=""
                loading="lazy"
                style={{ objectPosition: post.objectPosition }}
              />
            </span>
            <span data-post-hook>{post.hook}</span>
            <span
              style={{
                fontFamily: font.script,
                fontWeight: 700,
                fontSize: 16,
                color: color.blueInk,
              }}
            >
              {post.cta} &rarr;
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
