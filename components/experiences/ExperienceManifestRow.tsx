"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Experience } from "./ExperienceCard";

export default function ExperienceManifestRow({
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
      className="group relative flex w-full cursor-pointer items-center gap-4 border-b px-2 py-4 text-left transition-colors duration-200 hover:bg-card sm:gap-6 sm:px-4 sm:py-5"
    >
      <span className="meta w-8 shrink-0 self-baseline pt-2">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="relative hidden h-10 w-10 shrink-0 overflow-hidden rounded-lg border bg-secondary p-1.5 sm:block">
        <Image
          src={experience.badge}
          alt={experience.company}
          fill
          className="object-contain p-1.5"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-serif text-xl leading-tight text-ink transition-colors duration-200 group-hover:text-amber sm:text-3xl">
          {experience.role}
        </span>
        <span className="mt-1 block text-sm text-ink-dim">
          {experience.company}
        </span>
        {experience.description && (
          <span className="mt-1 hidden max-w-xl text-sm leading-relaxed text-ink-dim line-clamp-1 sm:block">
            {experience.description}
          </span>
        )}
      </span>

      <span className="meta-caps hidden shrink-0 text-right md:block">
        {experience.dates}
      </span>

      <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-ink-dim opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-amber group-hover:opacity-100 sm:block" />

      {/* hover thumbnail plate */}
      {experience.thumbnail && (
        <span className="pointer-events-none absolute right-28 top-1/2 z-10 hidden h-24 w-40 -translate-y-1/2 rotate-[-3deg] scale-90 overflow-hidden rounded-lg border hairline opacity-0 shadow-lg transition-all duration-300 group-hover:rotate-2 group-hover:scale-100 group-hover:opacity-100 lg:block">
          <img
            src={experience.thumbnail}
            alt=""
            className="h-full w-full object-cover"
          />
        </span>
      )}
    </button>
  );
}
