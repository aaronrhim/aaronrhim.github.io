"use client";

import { useState } from "react";
import Section from "@/components/Section";
import { PROJECTS } from "@/lib/projects";
import { Project } from "@/components/projects/ProjectCard";
import ProjectManifestCard from "@/components/projects/ProjectManifestCard";
import ProjectModal from "@/components/projects/ProjectModal";

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section id="projects">
      <div className="flex items-end justify-between border-b pb-4">
        <div>
          <p className="meta-caps mb-2">Mission data · 02</p>
          <h2 className="text-2xl tracking-tight sm:text-4xl">Projects</h2>
        </div>
        <span className="meta pb-1">
          {String(PROJECTS.length).padStart(2, "0")} ENTRIES · SCROLL →
        </span>
      </div>

      <div className="-mx-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:-mx-6">
        <ul className="m-0 flex items-stretch gap-4 p-0 px-2 py-6 sm:px-6">
          {PROJECTS.map((p, index) => (
            <li key={p.id} className="flex list-none">
              <ProjectManifestCard
                project={p as Project}
                index={index}
                onClick={() => setSelected(p as Project)}
              />
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
