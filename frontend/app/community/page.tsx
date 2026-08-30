import CloudHeader from "@/components/CloudHeader";
import CommunityCard from "@/components/CommunityCard";
import { communityMade, communityJoined } from "@/lib/data";

export default function Community() {
  return (
    <main>
      <CloudHeader />

      <div className="max-w-2xl mx-auto px-8 pb-24">
        <h1 className="font-display text-6xl text-indigo text-center mb-14 mt-10">community</h1>

        <section className="mb-14">
          <h2 className="font-display text-4xl text-indigo text-center mb-8">what i&apos;ve made</h2>
          <div>
            {communityMade.map((org) => (
              <CommunityCard key={org.id} {...org} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-4xl text-indigo text-center mb-8">what i&apos;ve joined</h2>
          <div>
            {communityJoined.map((org) => (
              <CommunityCard key={org.id} {...org} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
