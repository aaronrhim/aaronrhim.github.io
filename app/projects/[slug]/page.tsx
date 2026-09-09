import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import { PROJECTS } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.blurb };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      {/* No lede. `blurb` is the label from the card the reader just clicked, and a
          label is not a lede - repeating it here restates the title twice before
          the body has said anything. */}
      <PageHeader title={project.title} />

      <Container>
        <dl className="border-rule flex flex-wrap gap-x-10 gap-y-4 border-y py-5">
          <div>
            <dt className="label">Year</dt>
            <dd className="figure mt-1 text-[0.95rem]">{project.year}</dd>
          </div>
          {project.award ? (
            <div>
              <dt className="label">Award</dt>
              <dd className="text-accent mt-1 font-light">{project.award}</dd>
            </div>
          ) : null}
        </dl>

        <p className="measure mt-8 text-[1.05rem] leading-relaxed font-light">{project.body}</p>

        <div className="mt-8">
          <p className="label" id="stack-label">
            Stack
          </p>
          <ul aria-labelledby="stack-label" className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="border-rule label border px-2 py-1">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {project.links.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost"
              >
                {l.label}
              </a>
            ))}
          </div>
        ) : null}
      </Container>

      {/* No heading over the gallery. It is the last block on the page, it is
          unmistakably a grid of pictures, and it follows a paragraph that has
          already said what the project is - the word "Images" over it is the
          reflex this site is trying not to have. */}
      {project.images?.length ? (
        <Container className="pt-14">
          <Gallery images={project.images} />
        </Container>
      ) : null}

      <Container className="pt-16">
        <Link href="/projects" className="btn-ghost">
          All projects
        </Link>
      </Container>
    </>
  );
}
