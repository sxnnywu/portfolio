import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import eventGathering from "@/public/assets/story/events/event-gathering.jpg";
import community from "@/public/assets/story/events/community.jpg";
import conversations from "@/public/assets/story/events/conversations.jpg";
import dj from "@/public/assets/story/events/dj.jpg";
import eventConversation from "@/public/assets/story/events/event-conversation.jpg";
import { color, font } from "@/lib/tokens";
import styles from "./EventHostingChapter.module.css";

interface EventHostingChapterProps {
  chapterRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
}

export default function EventHostingChapter({ chapterRef, galleryRef }: EventHostingChapterProps) {
  return (
    <article
      ref={chapterRef}
      data-event-hosting-chapter
      className={styles.chapter}
      aria-labelledby="event-hosting-chapter-heading"
      style={{
        "--event-paper": color.paper,
        "--event-body": color.body,
        "--event-title": color.inkDeepSky,
        "--event-blue": color.blueInk,
        "--event-muted": color.muted,
        "--event-serif": font.serif,
      } as CSSProperties}
    >
      <span className={styles.number} aria-hidden="true">10</span>
      <div className={styles.copy}>
        <h2 id="event-hosting-chapter-heading">Then I found another way to build community: <em>hosting events.</em></h2>
        <p className={styles.intro}>I hosted <em>two events</em> for Waterloo Tech Week.</p>
        <p className={styles.listLabel}>The results:</p>
        <ul className={styles.results}>
          <li><em>1,000+</em> signups</li>
          <li><em>$1,200+</em> in ticket sales</li>
          <li><em>7</em> sponsorships</li>
        </ul>
      </div>
      <div ref={galleryRef} className={styles.gallery} data-event-hosting-gallery>
        <figure className={`${styles.print} ${styles.firstPrint}`} data-event-photo="gathering">
          <Image src={eventGathering} alt="Attendees mingling beneath string lights at an outdoor event" sizes="(max-width: 850px) 280px, 340px" loading="eager" />
        </figure>
        <figure className={`${styles.print} ${styles.secondPrint}`} data-event-photo="community">
          <Image src={community} alt="Sunny speaking to a room full of event attendees" sizes="(max-width: 850px) 280px, 340px" loading="eager" />
        </figure>
        <figure className={`${styles.print} ${styles.thirdPrint}`} data-event-photo="conversations">
          <Image src={conversations} alt="Sunny chatting with guests at the event" sizes="(max-width: 850px) 280px, 340px" loading="eager" />
        </figure>
        <figure className={`${styles.print} ${styles.fourthPrint}`} data-event-photo="dj">
          <Image src={dj} alt="A DJ playing music at the event" sizes="(max-width: 850px) 280px, 340px" loading="eager" />
        </figure>
        <figure className={`${styles.print} ${styles.fifthPrint}`} data-event-photo="event-conversation">
          <Image src={eventConversation} alt="Sunny chatting with an attendee at a bar counter" sizes="(max-width: 850px) 190px, 220px" loading="eager" />
        </figure>
      </div>
    </article>
  );
}
