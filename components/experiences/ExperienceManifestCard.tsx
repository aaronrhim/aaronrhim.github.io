"use client";

import Image from "next/image";
import { Experience } from "./ExperienceCard";

export default function ExperienceManifestCard({
  experience,
  index,
  onClick,
}: {
  experience: Experience;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full w-[280px] shrink-0 snap-start cursor-pointer flex-col rounded-xl border bg-card p-4 text-left transition-all duration-200 hover:border-border-strong hover:shadow-md sm:w-[330px]"
    >
      <span className="flex items-center justify-between">
        <span className="meta">{String(index + 1).padStart(2, "0")}</span>
        <span className="relative h-9 w-9 overflow-hidden rounded-lg border bg-secondary">
          <Image
            src={experience.badge}
            alt={experience.company}
            fill
            className="object-contain p-1.5"
          />
        </span>
      </span>

      {experience.thumbnail && (
        <span className="mt-3 block aspect-video w-full overflow-hidden rounded-lg border">
          <img
            src={experience.thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </span>
      )}

      <span className="mt-3 block font-serif text-xl leading-tight text-ink transition-colors duration-200 group-hover:text-amber sm:text-2xl">
        {experience.role}
      </span>
      <span className="mt-1 block text-sm text-ink-dim">
        {experience.company}
      </span>

      <span className="meta-caps mt-auto block pt-3">{experience.dates}</span>
    </button>
  );
}
