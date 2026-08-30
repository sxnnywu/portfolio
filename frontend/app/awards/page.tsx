import CloudHeader from "@/components/CloudHeader";
import AwardItem from "@/components/AwardItem";
import { awards } from "@/lib/data";

export default function Awards() {
  return (
    <main>
      <CloudHeader />

      <div className="max-w-3xl mx-auto px-8 pb-24">
        <h1 className="font-display text-6xl text-indigo text-center mb-14 mt-10">awards</h1>

        <div className="space-y-16">
          {awards.map((section) => (
            <section key={section.category}>
              <h2 className="font-display text-4xl text-indigo text-center mb-8">
                {section.category}
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                {section.items.map((item, i) => (
                  <AwardItem key={i} {...item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
