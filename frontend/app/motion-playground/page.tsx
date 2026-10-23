import type { Metadata } from "next";
import ScrollStoryPreview from "@/components/ScrollStoryPreview";

export const metadata: Metadata = {
  title: "Scroll playground",
  robots: { index: false, follow: false },
};

export default function MotionPlaygroundPage() {
  return <ScrollStoryPreview />;
}
