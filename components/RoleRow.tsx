import Image from "next/image";
import Link from "next/link";
import type { Role } from "@/lib/content";

/**
 * An experience entry, built on al-folio's CV row rather than as a card.
 *
 * al-folio puts dates in a narrow left column pulled 15px into the gutter, so
 * the timeline reads down the left edge and the prose keeps one consistent
 * left margin. That is kept. What is dropped is the dark red uppercase pill
 * badge it wraps them in - a filled red chip is the loudest thing on the
 * entire theme and it is spent on a date, which is the least interesting fact
 * in the entry. Mono at 12px in the dim colour says the same thing quietly.
 *
 * The row is not a card and has no border: entries are separated by the
 * hairline between them, which is al-folio's `.post-list li` treatment. A list
 * of three bordered boxes reads as three unrelated things.
 */
export default function RoleRow({ role, level = 2 }: { role: Role; level?: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <li className="border-rule border-b py-8 first:pt-0 last:border-b-0">
      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
        <div className="sm:pt-1">
          <p className="label figure">{role.dates}</p>
          {role.current ? (
            <p className="label text-accent mt-1 flex items-center gap-1.5">
              <span className="bg-accent inline-block h-1.5 w-1.5 rounded-full" aria-hidden />
              Current
            </p>
          ) : null}
        </div>

        <div>
          <div className="flex items-start gap-3">
            {role.logo ? (
              <Image
                src={role.logo}
                alt=""
                width={28}
                height={28}
                className="mt-1 h-7 w-7 shrink-0 object-contain"
              />
            ) : null}
            <div>
              <Heading className="text-xl">
                <Link
                  href={`/work/${role.slug}`}
                  className="text-text hover:text-accent transition-colors duration-200 hover:no-underline"
                >
                  {role.title}, <span className="text-text-dim">{role.org}</span>
                </Link>
              </Heading>
            </div>
          </div>

          <p className="measure text-text mt-4 leading-relaxed font-light">{role.summary}</p>

          <ul className="mt-4 space-y-2">
            {role.bullets.slice(0, 3).map((b) => (
              <li
                key={b}
                className="measure text-text-dim relative pl-4 text-[0.95rem] leading-relaxed font-light"
              >
                <span
                  className="bg-rule-strong absolute top-[0.65em] left-0 h-px w-2"
                  aria-hidden
                />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href={`/work/${role.slug}`} className="btn-ghost">
              Read more
            </Link>
            {role.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer noopener"
                className="label hover:text-accent transition-colors duration-200 hover:no-underline"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
