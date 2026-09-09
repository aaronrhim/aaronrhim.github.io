import Image from "next/image";
import type { Shot } from "@/lib/content";

/**
 * Images from the work, in a plain grid.
 *
 * Not a carousel and not a lightbox. Both add a JavaScript dependency and a
 * hidden state to a page whose entire job is to show three screenshots, and a
 * carousel actively hides two of them behind an interaction most readers never
 * perform.
 *
 * Every image gets a hairline and a fixed 4/3 box with `object-cover`, so a
 * mixed set of screenshots and phone photographs still lines up. `sizes` is set
 * honestly for a two-column grid inside a 930px container; without it Next
 * serves a full-width source for a 450px slot.
 *
 * Alt text comes from each `Shot`, not from the caller. A single string shared
 * across a set is what produced four images all announcing "UBC Rover".
 */
export default function Gallery({ images }: { images: Shot[] }) {
  if (images.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.map((shot) => (
        <li
          key={shot.src}
          className="border-rule bg-bg-raised relative aspect-[4/3] overflow-hidden border"
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 640px) 100vw, 450px"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
