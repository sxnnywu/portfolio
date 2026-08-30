"use client";

import { useEffect, useRef } from "react";
import { externalLinkProps } from "@/lib/links";
import { color, font } from "@/lib/tokens";
import type { ContentPhone } from "@/lib/data";

const REPLAY_PAUSE_MS = 900;

/** A phone shell playing one platform's screen recording, with its caption. */
export default function PhoneReel({ phone }: { phone: ContentPhone }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;

    // Left paused, the video shows its own poster frame, which is the fallback
    // both here and when autoplay is refused.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The muted attribute alone does not always set the property, and autoplay
    // is blocked without it.
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute("muted", "");

    const timers: number[] = [];
    const start = () => void el.play().catch(() => {});
    if (el.readyState >= 2) start();
    else el.addEventListener("loadeddata", start, { once: true });

    // A fade and a beat, so the restart reads as deliberate rather than a cut.
    const onEnded = () => {
      el.style.opacity = "0";
      timers.push(
        window.setTimeout(() => {
          el.currentTime = 0;
          void el.play().catch(() => {});
          el.style.opacity = "1";
        }, REPLAY_PAUSE_MS),
      );
    };
    el.addEventListener("ended", onEnded);

    // Two autoplaying videos are wasted work while the section is off screen.
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.1 },
    );
    seen.observe(el);

    return () => {
      el.removeEventListener("loadeddata", start);
      el.removeEventListener("ended", onEnded);
      timers.forEach(window.clearTimeout);
      seen.disconnect();
    };
  }, []);

  return (
    <div data-phone-block>
      <div data-phone style={{ transform: `rotate(${phone.rotate}deg)` }}>
        <div data-phone-slit aria-hidden />
        <div data-phone-screen>
          <video
            ref={video}
            src={phone.video}
            poster={phone.poster}
            preload="metadata"
            autoPlay
            muted
            playsInline
            aria-label={`${phone.platform} feed`}
          />
        </div>
      </div>

      <div data-phone-caption>
        <div data-phone-row>
          <span style={{ fontFamily: font.serif, fontWeight: 300, fontSize: 26, color: color.inkDeepSky }}>
            {phone.platform}
          </span>
          <span
            style={{
              fontFamily: font.script,
              fontWeight: 700,
              fontSize: 23,
              color: color.blueInk,
              whiteSpace: "nowrap",
            }}
          >
            {phone.count}
          </span>
        </div>
        <div style={{ fontFamily: font.serif, fontWeight: 300, fontSize: 18, color: "#4a463c" }}>
          {phone.topics}
        </div>
        {phone.profile && (
          <a href={phone.profile} {...externalLinkProps(phone.profile)} data-phone-link>
            See the profile &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
