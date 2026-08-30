import Image from "next/image";

export default function CloudHeader() {
  return (
    <div className="w-full overflow-hidden -mt-1 pointer-events-none">
      <Image
        src="/assets/clouds.png"
        alt=""
        width={1440}
        height={200}
        className="w-full object-cover"
        priority
      />
    </div>
  );
}
