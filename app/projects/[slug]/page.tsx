import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import { PROJECTS } from "@/lib/content";
import { PROJECT_NOTES } from "@/lib/project-notes";

type Params = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.blurb } : {};
}
export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  if (!project) notFound();
  const notes = PROJECT_NOTES[slug] ?? [];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const images = project.images?.length
    ? project.images
    : project.cover
      ? [{ src: project.cover, alt: `${project.title} project view` }]
      : [];
  return (
    <>
      <Container className="pt-9">
        <Link href="/projects" className="label">
          ← All projects
        </Link>
      </Container>
      <PageHeader title={project.title} lede={project.body} />
      <Container>
        <div className="border-rule mb-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-y py-5">
          <span className="label">{project.year}</span>
          {project.award ? <span className="text-accent text-sm">↳ {project.award}</span> : null}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span className="tag" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="case-layout">
          <aside className="case-nav">
            <p className="label mb-3">IN THIS PROJECT</p>
            <nav aria-label="Project sections">
              {notes.map((note, i) => (
                <a href={`#note-${i}`} key={note.title}>
                  {note.title}
                </a>
              ))}
              {images.length ? <a href="#project-images">In pictures</a> : null}
            </nav>
            <div className="border-rule mt-5 border-t pt-3">
              {project.links.map((l) => (
                <a href={l.url} key={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </div>
          </aside>
          <div>
            {images.length ? (
              <div id="project-images" className="mb-12">
                <Gallery images={[images[0]]} />
              </div>
            ) : null}
            {notes.map((note, i) => (
              <section className="case-section" id={`note-${i}`} key={note.title}>
                <p className="label mb-3">0{i + 1}</p>
                <h2>{note.title}</h2>
                <p className="text-text-dim">{note.body}</p>
              </section>
            ))}
            {images.length > 1 ? (
              <section className="case-section">
                <h2>In pictures</h2>
                <Gallery images={images.slice(1)} />
              </section>
            ) : null}
          </div>
        </div>
        <div className="section-heading mt-12">
          <Link href="/projects" className="text-sm">
            ← All projects
          </Link>
          <Link href={`/projects/${next.slug}`} className="text-right">
            <span className="label block mb-2">NEXT PROJECT</span>
            {next.title} →
          </Link>
        </div>
      </Container>
    </>
  );
}
