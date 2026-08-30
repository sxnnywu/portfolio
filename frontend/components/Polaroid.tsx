import Image from "next/image";

interface PolaroidProps {
  src?: string;
  alt?: string;
  caption?: string;
  tags?: string[];
  rotation?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function Polaroid({
  src,
  alt = "",
  caption,
  tags,
  rotation = 0,
  className = "",
  children,
}: PolaroidProps) {
  return (
    <div
      className={`bg-white p-2.5 pb-6 shadow-md inline-block transition-all duration-300 hover:scale-105 cursor-default ${className}`}
      style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "center" }}
    >
      <div className="relative w-full aspect-square overflow-hidden bg-indigo/10">
        {src && (
          <Image src={src} alt={alt} fill className="object-cover" />
        )}
      </div>
      {caption && (
        <p className="text-center text-xs font-body text-indigo mt-3 leading-tight px-1">
          {caption}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-body text-indigo/60">
              {tag}
            </span>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
