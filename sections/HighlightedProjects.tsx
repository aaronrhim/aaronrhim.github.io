"use client";

import { useRouter } from "next/navigation";
import Panel from "@/components/Panel";
import Section from "@/components/Section";
import { PROJECTS } from "@/lib/projects";
import ProjectCard, { Project } from "@/components/projects/ProjectCard";

export default function FeaturedProjectsSection() {
  const router = useRouter();

  const handleProjectClick = (project: Project) => {
    router.push(`/projects?project=${project.id}`);
  };

  return (
    <Section id="projects">
      <Panel title="Highlighted Projects">
        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.filter((p) => p.highlight).map((p, index) => (
            <div key={p.id} className="h-full">
              <ProjectCard project={p as Project} onClick={() => handleProjectClick(p as Project)} index={index} />
            </div>
          ))}
        </div>
      </Panel>
    </Section>
  );
}
