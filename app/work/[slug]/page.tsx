import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import HmiStudy from "@/components/HmiStudy";
import RlStudy from "@/components/RlStudy";
import RoverSupportingWork from "@/components/RoverSupportingWork";
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
  const sections = rover ? [] : (role.sections ?? []);
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
                  <a className="nav-primary" href="#hmi">
                    01 / HMI
                  </a>
                  <a className="nav-child" href="#hmi-architecture">
                    Architecture
                  </a>
                  <a className="nav-child" href="#panel-layout">
                    Dwindle walkthrough
                  </a>
                  <a className="nav-child" href="#hmi-equations">
                    Equations
                  </a>
                  <a className="nav-child" href="#next-steps">
                    HMI next steps
                  </a>
                  <a className="nav-primary" href="#reinforcement-learning">
                    02 / Reinforcement learning
                  </a>
                  <a className="nav-child" href="#rl-simulation">
                    Building the simulation
                  </a>
                  <a className="nav-child" href="#rl-learning">
                    DAgger & workspace tuning
                  </a>
                  <a className="nav-child" href="#rl-residual">
                    Residual RL
                  </a>
                  <a className="nav-child" href="#rl-task-completion">
                    Task completion & results
                  </a>
                </>
              ) : null}
              {sections.map((s) => (
                <a href={`#${slugify(s.title)}`} key={s.title}>
                  {s.title}
                </a>
              ))}
              <a className={rover ? "nav-primary" : undefined} href="#contributions">
                {rover ? "03 / Supporting engineering" : "Contributions"}
              </a>
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
            {rover ? (
              <>
                <div className="rover-project-index" aria-label="Primary Rover projects">
                  <a href="#hmi">
                    <span className="label">01 / PROJECT OWNER</span>
                    <strong>Human–machine interface ↗</strong>
                    <p>A modular operator workspace, from bench debugging to rover-wide tools.</p>
                  </a>
                  <a href="#reinforcement-learning">
                    <span className="label">02 / PROJECT OWNER</span>
                    <strong>Reinforcement learning ↗</strong>
                    <p>
                      A custom arm simulation and learning pipeline for keyboard task completion.
                    </p>
                  </a>
                </div>
                <HmiStudy />
                <RlStudy />
                <RoverSupportingWork />
              </>
            ) : null}
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
            {!rover ? (
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
