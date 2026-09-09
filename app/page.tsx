import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Figures from "@/components/Figures";
import ProjectCard from "@/components/ProjectCard";
import Whisper from "@/components/Whisper";
import Em from "@/components/Em";
import { INTRO, LINKS, PROFILE, PROJECTS, ROLES } from "@/lib/content";

/**
 * The home page.
 *
 * Heading budget: one h1 and three h2s, all of them one word. Everything that
 * would otherwise have been a subheading is carried by a whisper label, a
 * ground step, or the card title itself doing double duty as the link.
 */
export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured);
  const current = ROLES.filter((r) => r.current);

  return (
    <>
      <Container className="pt-12 pb-16 sm:pt-16">
        {/**
         * al-folio's about hero is a genuine CSS float, not a two-column grid:
         * the portrait sits at 30% on the right and the bio TEXT WRAPS AROUND
         * it. That wrap is the whole character of the layout - a grid puts the
         * text in a fixed column beside the photo, which is a different and
         * colder thing.
         *
         * The float starts at `sm` and not before, which is al-folio's own
         * rule (`.profile { width: 100% }`, and only `30%` above 576px). A
         * float that survives to phone widths leaves roughly 200px of column
         * for the text, and a paragraph two or three words wide is worse than
         * no wrap at all.
         */}
        <div className="mb-7 w-full max-w-[240px] sm:float-right sm:mb-4 sm:ml-6 sm:w-[30%]">
          <Image
            src={PROFILE.portrait}
            alt={PROFILE.name}
            width={480}
            height={480}
            priority
            /* The source is a phone photograph in portrait orientation. A
               square crop biased to the top keeps the face centred instead of
               letting `object-cover` centre on the collar. */
            className="border-rule aspect-square w-full rounded border object-cover object-[50%_22%]"
          />
        </div>

        <h1
          className="rise text-5xl leading-[1.05] sm:text-6xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          <span className="font-semibold">Aaron</span> <span className="font-light">Rhim</span>
        </h1>

        <p
          className="rise text-text-dim mt-3 text-lg font-light"
          style={{ "--rise-delay": "70ms" } as React.CSSProperties}
        >
          {PROFILE.role}
        </p>

        <div
          className="rise measure mt-7 space-y-4"
          style={{ "--rise-delay": "140ms" } as React.CSSProperties}
        >
          {INTRO.map((para) => (
            <p key={para.slice(0, 24)} className="text-[1.05rem] leading-relaxed font-light">
              {para}
            </p>
          ))}
        </div>

        <ul
          className="rise mt-8 flex flex-wrap gap-x-5 gap-y-2"
          style={{ "--rise-delay": "210ms" } as React.CSSProperties}
        >
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="label hover:text-accent transition-colors duration-200 hover:no-underline"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* clear-both, because the float above is still in effect. Without it
            the figures grid would tuck itself alongside the portrait. */}
        <div className="clear-both" />
      </Container>

      {/**
       * The ground step, doing the work of a divider and a subheading at once.
       * The band owns its own padding so the colour change lands in empty
       * space rather than cutting across the grid inside it.
       */}
      {/* No aria-label. An earlier version named this band "Selected
          measurements", which existed only for assistive tech and matched no
          visible text - a name half the audience could not hear and the other
          half could not see. Four large numbers under the intro do not need
          announcing. */}
      <section className="raised border-rule border-y">
        <Container className="py-12 sm:py-14">
          <Figures />
        </Container>
      </section>

      <Container className="pt-14">
        <Whisper>Now</Whisper>
        <ul className="space-y-8">
          {current.map((role) => (
            <li key={role.slug}>
              <h3 className="text-2xl font-light">
                <Link
                  href={`/work/${role.slug}`}
                  className="text-text hover:text-accent transition-colors duration-200 hover:no-underline"
                >
                  {role.title}, {role.org}
                </Link>
              </h3>
              <p className="measure text-text-dim mt-2 leading-relaxed font-light">
                {role.summary}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/work" className="btn-ghost">
            All experience
          </Link>
        </p>
      </Container>

      <Container className="pt-16">
        <Whisper>Projects</Whisper>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/projects" className="btn-ghost">
            All projects
          </Link>
        </p>
      </Container>

      <Container className="pt-20">
        <p className="measure-tight text-2xl leading-snug font-light sm:text-3xl">
          I am looking for internships in <Em>robotics and machine learning</Em> for 2027.
        </p>
        <p className="mt-4">
          <a href={`mailto:${PROFILE.email}`} className="text-lg">
            {PROFILE.email}
          </a>
        </p>
      </Container>
    </>
  );
}
