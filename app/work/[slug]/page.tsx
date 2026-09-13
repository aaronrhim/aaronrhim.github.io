import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import HmiStudy from "@/components/HmiStudy";
import { ROLES } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };
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
  return role ? { title: `${role.title}, ${role.org}`, description: role.summary } : {};
}
export default async function RolePage({ params }: Params) {
  const { slug } = await params;
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) notFound();
  const rover = slug === "ubc-rover";
  const sections =
    role.sections?.filter((s) => !rover || s.title !== "The interface the drivers actually use") ??
    [];
  return (
    <>
      <Container className="pt-9">
        <Link href="/work" className="label">
          ← All experience
        </Link>
      </Container>
      <PageHeader title={role.org} lede={role.summary} />
      <Container>
        <dl className="border-rule mb-10 flex flex-wrap gap-x-12 gap-y-4 border-y py-5">
          <div>
            <dt className="label">ROLE</dt>
            <dd className="mt-2 text-sm">{role.title}</dd>
          </div>
          <div>
            <dt className="label">WHEN</dt>
            <dd className="mt-2 text-sm">{role.dates}</dd>
          </div>
          <div>
            <dt className="label">WHERE</dt>
            <dd className="mt-2 text-sm">{role.location}</dd>
          </div>
        </dl>
        <div className="case-layout">
          <aside className="case-nav">
            <p className="label mb-3">BUILD NOTES</p>
            <nav aria-label="Experience sections">
              {rover ? (
                <>
                  <a href="#hmi">Human–machine interface</a>
                  <a href="#panel-layout">Interactive panel layout</a>
                </>
              ) : null}
              {sections.map((s) => (
                <a href={`#${slugify(s.title)}`} key={s.title}>
                  {s.title}
                </a>
              ))}
              <a href="#contributions">Contributions</a>
              {rover ? <a href="#next-steps">Next steps</a> : null}
            </nav>
            <div className="border-rule mt-5 border-t pt-3">
              {role.links.map((l) => (
                <a href={l.url} key={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </div>
          </aside>
          <div>
            {rover ? <HmiStudy /> : null}
            {sections.map((section) => (
              <section className="case-section" key={section.title} id={slugify(section.title)}>
                <h2>{section.title}</h2>
                {section.body.split("\n\n").map((p) => (
                  <p className="text-text-dim" key={p.slice(0, 40)}>
                    {p}
                  </p>
                ))}
                {section.images?.length ? (
                  <div className="mt-7">
                    <Gallery images={section.images} />
                  </div>
                ) : null}
              </section>
            ))}
            <section id="contributions" className="case-section">
              <h2>Contributions at a glance</h2>
              <ul className="text-text-dim list-disc space-y-3 pl-5 text-sm leading-relaxed">
                {role.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {role.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </section>
            {rover ? (
              <section id="next-steps" className="case-section">
                <h2>Still on my list</h2>
                <p className="text-text-dim">
                  There’s more I want to bring into the HMI. These are future tasks:
                </p>
                <ul className="text-text-dim mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed">
                  <li>CAN firmware for power-distribution and lighting telemetry.</li>
                  <li>More science sensor telemetry and a visual roadmap.</li>
                  <li>
                    A more reliable digital twin and more intuitive inverse kinematic controls.
                  </li>
                  <li>SLAM visualisation for the operator.</li>
                  <li>Better panel management using binary space partitioning.</li>
                </ul>
              </section>
            ) : null}
            {role.images?.length ? <Gallery images={role.images} /> : null}
          </div>
        </div>
        <div className="border-rule mt-16 border-t pt-6">
          <Link href="/work" className="text-sm">
            ← All experience
          </Link>
        </div>
      </Container>
    </>
  );
}
