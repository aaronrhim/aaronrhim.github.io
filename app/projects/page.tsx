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
        lede="Eight of them. Five had a deadline at the end and three of those placed."
      />
      <Container>
        {/* One flat grid, deliberately not split into "featured" and "other".
            A grid divided into two labelled halves needs two subheadings to
            explain a distinction the reader did not ask about, and it quietly
            tells them which half is the disappointing one. */}
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} level={2} />
          ))}
        </ul>
      </Container>
    </>
  );
}
