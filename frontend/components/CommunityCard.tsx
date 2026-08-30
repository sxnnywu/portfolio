import Image from "next/image";
import { OrgEntry } from "@/lib/data";

export default function CommunityCard({ name, role, dates, description, stats, logo }: OrgEntry) {
  return (
    <div className="flex gap-4 items-start py-5 border-b border-indigo/10 last:border-0">
      {logo ? (
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
          <Image src={logo} alt={name} width={56} height={56} className="object-cover w-full h-full" />
        </div>
      ) : (
        <div className="w-14 h-14 rounded-xl bg-indigo/10 flex items-center justify-center flex-shrink-0">
          <span className="text-indigo/30 text-lg font-body font-bold uppercase">{name[0]}</span>
        </div>
      )}
      <div>
        <p className="font-bold text-sm font-body">{name}</p>
        <p className="text-xs font-body text-indigo/60 mb-1">
          {role} · {dates}
        </p>
        <p className="text-xs font-body text-indigo/80 italic mb-1.5">{description}</p>
        <ul className="space-y-0.5">
          {stats.map((s, i) => (
            <li key={i} className="text-xs font-body text-indigo/70">
              · {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
