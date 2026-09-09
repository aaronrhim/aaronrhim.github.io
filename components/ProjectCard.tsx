import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

/**
 * al-folio's project card, with the one weakness of the original fixed.
 *
 * Kept: the whole card is a single link; it sits completely flat at rest and
 * lifts into a shadow on hover over 0.55s without moving; the title turns
 * accent on hover; nothing is ever underlined.
 *
 * Fixed: al-folio gives its card images no `aspect-ratio` and no `object-fit`
 * at all - just `width: 100%` and `height: auto` - so a grid of cards with
 * mismatched source ratios ends up with ragged internal alignment, held
 * together only by `h-100` equalising the outer heights. A fixed 16/10 box
 * with `object-cover` costs nothing and removes the raggedness.
 *
 * The blurb here is the five-or-six-word label from the type, not the body
 * copy. The card says where the link goes; the page behind it explains.
 */
export default function ProjectCard({
  project,
  level = 3,
}: {
  project: Project;
  /**
   * The card title's heading level.
   *
   * 3 under a section heading (the home page grid sits below <h2>Projects</h2>),
   * 2 where the grid is the page's only content and there is nothing between it
   * and the <h1>. Getting this from the caller is what stops /projects skipping
   * a level - the visual size is set explicitly either way, so this changes the
   * document outline and nothing else.
   */
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <li className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group card-lift flex h-full flex-col overflow-hidden hover:no-underline"
      >
        {project.cover ? (
          <div className="bg-bg-raised relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={project.cover}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 300px"
              className="object-cover"
            />
          </div>
        ) : (
          /* No image is a state, not a gap. The dotted ground at the same
             aspect ratio keeps the grid aligned and reads as deliberate. */
          <div className="bg-bg-raised grain aspect-[16/10] w-full" aria-hidden />
        )}

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-baseline justify-between gap-3">
            <Heading className="text-text group-hover:text-accent text-xl transition-colors duration-200">
              {project.title}
            </Heading>
            <span className="label figure shrink-0">{project.year}</span>
          </div>

          <p className="text-text-dim mt-2 text-[0.95rem] leading-relaxed font-light">
            {project.blurb}
          </p>

          {project.award ? <p className="label text-accent mt-3">{project.award}</p> : null}
        </div>
      </Link>
    </li>
  );
}
