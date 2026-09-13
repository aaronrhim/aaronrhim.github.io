import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "A rendering engine, computer vision, and five hackathon builds.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        lede="Things I’ve built to learn something, solve a problem, or see an idea through a hackathon."
      />
      <Container>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} level={2} />
          ))}
        </ul>
      </Container>
    </>
  );
}
