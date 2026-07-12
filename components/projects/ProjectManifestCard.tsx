"use client";

import { Trophy } from "lucide-react";
import { Project } from "./ProjectCard";

export default function ProjectManifestCard({
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
      className="group flex h-full w-[280px] shrink-0 snap-start cursor-pointer flex-col rounded-xl border bg-card p-4 text-left transition-all duration-200 hover:border-border-strong hover:shadow-md sm:w-[330px]"
    >
      <span className="flex items-center justify-between">
        <span className="meta">{String(index + 1).padStart(2, "0")}</span>
        {project.achievements && (
          <span
            className="flex items-center gap-1.5 rounded-md border border-amber/30 bg-amber/10 px-2 py-0.5"
            title={project.achievements}
          >
            <Trophy className="h-3 w-3 text-amber" />
            <span className="meta-caps text-amber">Awarded</span>
          </span>
        )}
      </span>

      <span className="mt-3 block aspect-video w-full overflow-hidden rounded-lg border">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </span>

      <span className="mt-3 block font-serif text-xl leading-tight text-ink transition-colors duration-200 group-hover:text-amber sm:text-2xl">
        {project.title}
      </span>
      <span className="mt-1 block text-sm leading-relaxed text-ink-dim line-clamp-2">
        {project.description}
      </span>

      <span className="meta-caps mt-auto block truncate pt-3">{category}</span>
    </button>
  );
}
