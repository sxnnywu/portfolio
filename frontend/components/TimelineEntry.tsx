import Image from "next/image";

interface TimelineEntryProps {
  date: string;
  role: string;
  company: string;
  location: string;
  stats: string[];
  logo?: string;
  isLast?: boolean;
}

export default function TimelineEntry({
  date,
  role,
  company,
  location,
  stats,
  logo,
  isLast,
}: TimelineEntryProps) {
  return (
    <div className="flex gap-4">
      {/* Date */}
      <div className="w-40 text-right text-xs font-body text-indigo/70 pt-5 flex-shrink-0 leading-relaxed">
        {date}
      </div>

      {/* Line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-indigo mt-5 z-10 flex-shrink-0" />
        {!isLast && <div className="w-px bg-indigo/25 flex-1 mt-1 min-h-[40px]" />}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex-1 flex gap-4 items-start shadow-sm">
        {logo ? (
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={logo} alt={company} width={40} height={40} className="object-cover w-full h-full" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-indigo/10 flex items-center justify-center flex-shrink-0">
            <span className="text-indigo/40 text-sm font-body font-bold uppercase">
              {company[0]}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <span className="font-bold text-sm font-body">{role}</span>
            <span className="text-xs font-body text-indigo/60 text-right flex-shrink-0">
              {company} | {location}
            </span>
          </div>
          <ul className="mt-1.5 space-y-0.5">
            {stats.map((s, i) => (
              <li key={i} className="text-xs font-body text-indigo/70">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
