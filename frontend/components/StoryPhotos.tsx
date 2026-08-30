import type { CSSProperties } from "react";
import type { StoryPhoto, StoryPhotoRow } from "@/lib/data";

/** A print pinned to the page: paper, pushpin, photo, caption. */
function Print({ photo }: { photo: StoryPhoto }) {
  return (
    <div
      data-print
      style={
        {
          "--print-w": `${photo.width}px`,
          "--print-ml": `${photo.marginLeft ?? 0}px`,
          "--print-rot": `${photo.rotate}deg`,
          aspectRatio: undefined,
        } as CSSProperties
      }
    >
      <span data-pin aria-hidden />
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        style={{ aspectRatio: photo.aspect }}
      />
      {photo.caption && <figcaption data-print-caption>{photo.caption}</figcaption>}
    </div>
  );
}

export default function StoryPhotos({ row }: { row: StoryPhotoRow }) {
  return (
    // The reveal goes on the row, not the prints: it animates transform, which
    // would otherwise replace each print's rotation.
    <figure data-reveal data-print-row {...(row.nowrap ? { "data-nowrap": "" } : null)}>
      {row.photos.map((photo) => (
        <Print key={photo.src} photo={photo} />
      ))}
    </figure>
  );
}
