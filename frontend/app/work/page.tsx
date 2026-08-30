import ContactSection from "@/components/ContactSection";
import SkyBand from "@/components/SkyBand";
import WorkTimeline from "@/components/WorkTimeline";
import { emphasis } from "@/lib/tokens";

export const metadata = { title: "Work — Sunny Wu" };

export default function Work() {
  return (
    <>
      <SkyBand
        sublineText={"I've been the technical person in business rooms and the business person in technical ones"}
        title="Work"
        subline={
          <>
            I&apos;ve been the <span style={emphasis()}>technical</span> person in business rooms
            and the <span style={emphasis()}>business</span> person in technical ones
          </>
        }
      />
      <WorkTimeline />
      <ContactSection />
    </>
  );
}
