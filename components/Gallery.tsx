import Image from "next/image";
import type { Shot } from "@/lib/content";

export default function Gallery({ images }: { images: Shot[] }) {
  if (!images.length) return null;
  return (
    <div className={`grid gap-6 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {images.map((shot) => (
        <figure key={shot.src}>
          <a
            href={shot.src}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-bg-raised border-rule relative block aspect-[4/3] overflow-hidden rounded-sm border"
            aria-label={`Open full image: ${shot.alt}`}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 640px) 95vw, 750px"
              className="object-contain"
            />
          </a>
          <figcaption className="label mt-3">{shot.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}
