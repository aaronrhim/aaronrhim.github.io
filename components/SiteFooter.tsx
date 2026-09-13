import Container from "./Container";
import FooterCat from "./FooterCat";
import { LINKS } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="bg-footer-bg text-footer-text mt-24">
      <Container className="flex items-end justify-between gap-6 py-8">
        <div className="flex flex-col gap-4">
          <nav aria-label="Contact" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {LINKS.filter((link) => link.label !== "Resume").map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-footer-link"
                {...(link.href.startsWith("https:")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-[0.75rem]">2026 Aaron Rhim</p>
        </div>
        <FooterCat />
      </Container>
    </footer>
  );
}
