import Image from "next/image";
import { externalLinkProps } from "@/lib/links";
import { color, font } from "@/lib/tokens";
import type { ContentPhone } from "@/lib/data";

/** A phone shell displaying one platform's screenshot, with its caption. */
export default function PhoneReel({ phone }: { phone: ContentPhone }) {
  return (
    <div data-phone-block>
      <div data-phone style={{ transform: `rotate(${phone.rotate}deg)` }}>
        <div data-phone-slit aria-hidden />
        <div data-phone-screen>
          <Image
            src={phone.screenshot.src}
            alt={`${phone.platform} feed screenshot`}
            width={phone.screenshot.width}
            height={phone.screenshot.height}
            sizes="(max-width: 640px) 240px, 280px"
          />
        </div>
      </div>

      <div data-phone-caption>
        <div data-caption-row>
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
