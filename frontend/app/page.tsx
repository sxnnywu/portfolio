import ContactSection from "@/components/ContactSection";
import ScrollStoryPreview from "@/components/ScrollStoryPreview";
import { color, emphasis } from "@/lib/tokens";

const contactAccent = { ...emphasis(), color: color.blueInk };

export default function Home() {
  return (
    <main>
      <ScrollStoryPreview home>
        <ContactSection
          immersive
          headline="All that scrolling, and we haven’t even met."
          subline={
            <>
              If you need someone who can <em style={contactAccent}>build the product</em> and{" "}
              <em style={contactAccent}>understand the people</em> using it, <em style={contactAccent}>let’s talk.</em>
            </>
          }
        />
      </ScrollStoryPreview>
    </main>
  );
}
