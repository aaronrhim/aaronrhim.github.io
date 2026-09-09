import Container from "./Container";
import { LINKS, PROFILE } from "@/lib/content";

/**
 * al-folio's footer, in its sticky rather than fixed form.
 *
 * The theme ships a permanently docked 12px bar whose colours are inverted
 * against the page - a dark strip under the white site. That inversion is the
 * distinctive part and it is kept here, but as a block at the end of the
 * document rather than something pinned over the content: a fixed bar costs
 * 70px of every viewport forever to display a copyright line.
 */
export default function SiteFooter() {
  const year = new Date().getUTCFullYear();

  return (
    <footer className="bg-footer-bg text-footer-text mt-24">
      <Container className="py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-footer-link text-[1.05rem]">
              <span className="font-semibold">Aaron</span> <span className="font-light">Rhim</span>
            </p>
            <p className="mt-1 text-[0.8rem]">{PROFILE.location}</p>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.8rem]">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-footer-link hover:text-accent transition-colors duration-200 hover:no-underline"
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-[0.75rem] opacity-70">
          © {year} {PROFILE.name}. Built with Next.js, no analytics, no cookies.
        </p>
      </Container>
    </footer>
  );
}
