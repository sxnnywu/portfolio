import Image from "next/image";
import { AwardEntry } from "@/lib/data";

export default function AwardItem({ name, institution, year }: AwardEntry) {
  return (
    <div className="flex flex-col items-center text-center w-32">
      <Image src="/assets/trophy.png" alt="trophy" width={52} height={52} className="mb-2" />
      <span className="text-xs font-body font-bold text-indigo leading-tight">{institution}</span>
      <span className="text-xs font-body text-indigo/70 leading-tight mt-0.5">{name}</span>
      <span className="text-xs font-body text-indigo/50 mt-0.5">{year}</span>
    </div>
  );
}
