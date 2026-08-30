import ContactSection from "@/components/ContactSection";
import PhoneReel from "@/components/PhoneReel";
import PostCarousel from "@/components/PostCarousel";
import SkyBand from "@/components/SkyBand";
import { contentAside, contentIntro, contentPhones } from "@/lib/data";
import { color, emphasis, font, layout } from "@/lib/tokens";

const SUBLINE = "I post the things i wish someone had told me at 17";

export const metadata = {
  title: "Content",
  description: "What I post on LinkedIn and Instagram, and the posts worth reading.",
};

export default function Content() {
  return (
    <>
      <SkyBand
        title="Content"
        sublineText={SUBLINE}
        subline={
          <>
            I post the things i wish someone had told me at <em style={emphasis(1.14)}>17</em>
          </>
        }
      />

      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "80px 6vw 0" }}>
        <p
          data-reveal
          style={{
            maxWidth: 640,
            margin: "0 auto",
            fontFamily: font.serif,
            fontWeight: 300,
            fontSize: 20,
            lineHeight: 1.72,
            color: color.body,
            textAlign: "center",
          }}
        >
          {contentIntro}
        </p>

        <div data-phone-row data-reveal>
          {contentPhones.map((phone) => (
            <PhoneReel key={phone.platform} phone={phone} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "104px 6vw 64px" }}>
        <p
          data-reveal
          style={{
            maxWidth: 620,
            margin: "0 auto",
            fontFamily: font.serif,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 19,
            color: color.muted,
            textAlign: "center",
          }}
        >
          {contentAside}
        </p>
      </div>

      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "0 6vw 130px" }}>
        <PostCarousel />
      </div>

      <ContactSection
        subline={
          <>
            Open to <em style={emphasis()}>brand deals</em>, <em style={emphasis()}>public speaking</em>,
            and anything else you&apos;ve got.
          </>
        }
      />
    </>
  );
}
