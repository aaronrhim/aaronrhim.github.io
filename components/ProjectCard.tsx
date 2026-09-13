import type { Project } from "@/lib/content";
import ProjectBanner from "./ProjectBanner";

export default function ProjectCard({ project, level = 3 }: { project: Project; level?: 2 | 3 }) {
  return (
    <li>
      <ProjectBanner
        href={`/projects/${project.slug}`}
        title={project.title}
        image={project.cover}
        level={level}
      />
    </li>
  );
}
