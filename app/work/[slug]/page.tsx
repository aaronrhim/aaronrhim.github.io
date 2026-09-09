import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import { ROLES } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

/** Section anchors, so a long work page can be linked to a specific piece. */
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) return {};
  return { title: `${role.title}, ${role.org}`, description: role.summary };
}

export default async function RolePage({ params }: Params) {
  const { slug } = await params;
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) notFound();

  return (
    <>
      <PageHeader title={`${role.title}, ${role.org}`} lede={role.summary} />

      <Container>
        {/* The facts strip. Mono key/value pairs rather than four labelled
            subsections - this is data, and data gets a label, not a heading. */}
        <dl className="border-rule flex flex-wrap gap-x-10 gap-y-4 border-y py-5">
          <div>
            <dt className="label">Organisation</dt>
            <dd className="mt-1 font-light">{role.org}</dd>
          </div>
          <div>
            <dt className="label">Dates</dt>
            <dd className="figure mt-1 text-[0.95rem]">{role.dates}</dd>
          </div>
          <div>
            <dt className="label">Where</dt>
            <dd className="mt-1 font-light">{role.location}</dd>
          </div>
        </dl>

        <ul className="mt-10 space-y-3">
          {role.bullets.map((b) => (
            <li key={b} className="measure relative pl-5 leading-relaxed font-light">
              <span className="bg-rule-strong absolute top-[0.7em] left-0 h-px w-3" aria-hidden />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <p className="label" id="stack-label">
            Stack
          </p>
          <ul aria-labelledby="stack-label" className="mt-2 flex flex-wrap gap-2">
            {role.stack.map((s) => (
              <li key={s} className="border-rule label border px-2 py-1">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {role.links.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {role.links.map((l) => (
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

      {role.sections?.length ? (
        <Container className="pt-16">
          {/**
           * Long-form sections DO get real headings, and this is the one place
           * on the site where a heading per block is correct: each one marks a
           * distinct piece of work with its own several hundred words under it.
           * The rule being followed is not "never use a subheading", it is
           * "a heading must earn its place by having something substantial
           * beneath it". Four paragraphs qualifies. A three-item list does not.
           */}
          <div className="space-y-12">
            {role.sections.map((section) => (
              <section key={section.title} id={slugify(section.title)}>
                <h2 className="text-2xl font-light">{section.title}</h2>
                <p className="measure mt-4 leading-relaxed font-light">{section.body}</p>
                {section.images?.length ? (
                  <div className="mt-6">
                    <Gallery images={section.images} />
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      ) : null}

      {role.images?.length ? (
        <Container className="pt-16">
          <Gallery images={role.images} />
        </Container>
      ) : null}

      <Container className="pt-16">
        <Link href="/work" className="btn-ghost">
          All experience
        </Link>
      </Container>
    </>
  );
}
