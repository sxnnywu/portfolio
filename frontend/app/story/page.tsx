import { Fragment } from "react";
import ContactSection from "@/components/ContactSection";
import SkyBand from "@/components/SkyBand";
import StoryPhotos from "@/components/StoryPhotos";
import { story, storyAside, storyAsideAfter, storyPhotoRows } from "@/lib/data";
import { color, emphasis, font, layout } from "@/lib/tokens";

export const metadata = { title: "Story", description: "How a theatre kid ended up writing software." };

export default function Story() {
  return (
    <>
      <SkyBand
        sublineText={"How a theatre kid ended up writing software"}
        title="Story"
        subline={
          <>
            How a theatre kid ended up writing <span style={emphasis()}>software</span>
          </>
        }
      />

      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "90px 6vw 34px" }} />

      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: "0 6vw 130px" }}>
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          {story.map((paragraph, i) => (
            <Fragment key={paragraph.slice(0, 40)}>
              <div
                data-reveal
                style={{
                  fontFamily: font.serif,
                  fontWeight: 300,
                  fontSize: 21,
                  lineHeight: 1.72,
                  color: color.body,
                }}
              >
                {paragraph.split("\n\n").map((block, j) => (
                  <Fragment key={j}>
                    {j > 0 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                    {block}
                  </Fragment>
                ))}
              </div>
              {/* Rows sit between paragraphs, keyed to the words a paragraph opens with. */}
              {storyPhotoRows
                .filter((row) => row.after !== "aside" && paragraph.startsWith(row.after))
                .map((row) => (
                  <StoryPhotos key={row.after} row={row} />
                ))}
              {i + 1 === storyAsideAfter && (
                <>
                  <div
                    style={{
                      fontFamily: font.serif,
                      fontStyle: "italic",
                      fontSize: 16,
                      color: color.mutedLight,
                    }}
                  >
                    {storyAside}
                  </div>
                  {storyPhotoRows
                    .filter((row) => row.after === "aside")
                    .map((row) => (
                      <StoryPhotos key={row.after} row={row} />
                    ))}
                </>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <ContactSection />
    </>
  );
}
