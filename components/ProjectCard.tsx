import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

export default function ProjectCard({ project, level = 3 }: { project: Project; level?: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <li className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group card-lift flex h-full flex-col overflow-hidden hover:no-underline"
      >
        <div className="bg-bg-raised relative aspect-[16/9] overflow-hidden border-b border-rule">
          {project.cover ? (
            <Image
              src={project.cover}
              alt=""
              fill
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 48vw, 540px"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.025]"
            />
          ) : (
            <div className="grain flex h-full items-center justify-center">
              <span className="figure text-accent text-5xl" aria-hidden>
                {"{ … }"}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="label mb-3 flex justify-between gap-3">
            <span>{project.stack.slice(0, 2).join(" / ")}</span>
            <span>{project.year}</span>
          </div>
          <Heading className="text-text flex justify-between gap-4 text-2xl">
            {project.title}
            <span className="text-accent text-xl" aria-hidden>
              ↗
            </span>
          </Heading>
          <p className="text-text-dim mt-3 text-sm leading-relaxed">{project.blurb}</p>
          {project.award ? <p className="text-accent mt-4 text-xs">↳ {project.award}</p> : null}
        </div>
      </Link>
    </li>
  );
}
