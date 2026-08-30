import CloudHeader from "@/components/CloudHeader";
import { socials } from "@/lib/data";

export default function Contact() {
  return (
    <main>
      <CloudHeader />

      <div className="max-w-xl mx-auto px-8 pb-24">
        <h1 className="font-display text-6xl text-indigo text-center mb-6 mt-10">contact</h1>

        <div className="flex justify-center gap-5 flex-wrap mb-12">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="font-body text-sm text-indigo underline hover:opacity-60 transition-opacity"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <p className="font-body text-sm text-indigo mb-4">email me directly!</p>
          <textarea
            placeholder="start typing..."
            rows={6}
            className="w-full bg-cream border border-indigo/20 rounded-xl px-4 py-3 font-body text-sm text-indigo placeholder:text-indigo/30 resize-none focus:outline-none focus:border-indigo/50 transition-colors"
          />
          <div className="flex justify-center mt-4">
            <button className="bg-blue text-white font-body text-sm px-10 py-2 rounded-full hover:opacity-80 transition-opacity">
              send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
