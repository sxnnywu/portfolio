import CloudHeader from "@/components/CloudHeader";
import { features } from "@/lib/data";

export default function Features() {
  return (
    <main>
      <CloudHeader />

      <div className="max-w-3xl mx-auto px-8 pb-24">
        <h1 className="font-display text-6xl text-indigo text-center mb-14 mt-10">features</h1>

        {/* Scattered card layout */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white shadow-md w-64 aspect-[3/4] rounded-sm overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ transform: `rotate(${feature.rotation}deg)` }}
            >
              {feature.image ? (
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-indigo/10 flex items-end p-4">
                  <p className="font-body text-xs text-indigo/60 leading-tight">{feature.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
