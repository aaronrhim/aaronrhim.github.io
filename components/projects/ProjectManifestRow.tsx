"use client";

import { ArrowUpRight, Trophy } from "lucide-react";
import { Project } from "./ProjectCard";

export default function ProjectManifestRow({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const category = project.tags.slice(0, 2).join(" · ");

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex w-full cursor-pointer items-baseline gap-4 border-b px-2 py-4 text-left transition-colors duration-200 hover:bg-card sm:gap-6 sm:px-4 sm:py-5"
    >
      <span className="meta w-8 shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-serif text-xl leading-tight text-ink transition-colors duration-200 group-hover:text-amber sm:text-3xl">
          {project.title}
        </span>
        <span className="mt-1 block max-w-xl text-sm leading-relaxed text-ink-dim line-clamp-1">
          {project.description}
        </span>
      </span>

      {project.achievements && (
        <span
          className="flex shrink-0 items-center gap-1.5 self-center rounded-md border border-amber/30 bg-amber/10 px-2 py-1"
          title={project.achievements}
        >
          <Trophy className="h-3.5 w-3.5 text-amber" />
          <span className="meta-caps hidden text-amber sm:inline">Awarded</span>
        </span>
      )}

      <span className="meta-caps hidden max-w-[190px] shrink-0 self-center truncate text-right md:block">
        {category}
      </span>

      <ArrowUpRight className="hidden h-5 w-5 shrink-0 self-center text-ink-dim opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-amber group-hover:opacity-100 sm:block" />

      {/* hover thumbnail plate */}
      <span className="pointer-events-none absolute right-28 top-1/2 z-10 hidden h-24 w-40 -translate-y-1/2 rotate-[-3deg] scale-90 overflow-hidden rounded-lg border hairline opacity-0 shadow-lg transition-all duration-300 group-hover:rotate-2 group-hover:scale-100 group-hover:opacity-100 lg:block">
        <img src={project.image} alt="" className="h-full w-full object-cover" />
      </span>
    </button>
  );
}
