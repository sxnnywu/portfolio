import ContactSection from "@/components/ContactSection";
import SkyBand from "@/components/SkyBand";
import WorkTimeline from "@/components/WorkTimeline";

export const metadata = { title: "Work", description: "Roles across software engineering, product, growth and operations." };

export default function Work() {
  return (
    <div className="work-page">
      <SkyBand title="Work" />
      <WorkTimeline />
      <ContactSection />
    </div>
  );
}
