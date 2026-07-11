"use client";

import { useRouter } from "next/navigation";
import Section from "@/components/Section";
import { PROJECTS } from "@/lib/projects";
import { Project } from "@/components/projects/ProjectCard";
import ProjectManifestRow from "@/components/projects/ProjectManifestRow";

export default function FeaturedProjectsSection() {
  const router = useRouter();

  const handleProjectClick = (project: Project) => {
    router.push(`/projects?project=${project.id}`);
  };

  const highlighted = PROJECTS.filter((p) => p.highlight);

  return (
    <Section id="projects">
      <div className="flex items-end justify-between border-b pb-4">
        <div>
          <p className="meta-caps mb-2">Mission data · 02</p>
          <h2 className="text-2xl tracking-tight sm:text-4xl">
            Highlighted projects
          </h2>
        </div>
        <a
          href="/projects"
          className="meta-caps pb-1 transition-colors hover:text-amber"
        >
          Full index →
        </a>
      </div>

      <ul className="m-0 p-0">
        {highlighted.map((p, index) => (
          <li key={p.id} className="list-none">
            <ProjectManifestRow
              project={p as Project}
              index={index}
              onClick={() => handleProjectClick(p as Project)}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
