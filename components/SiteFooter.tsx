import Container from "./Container";
import FooterCat from "./FooterCat";

export default function SiteFooter() {
  return (
    <footer className="bg-footer-bg text-footer-text mt-24">
      <Container className="flex items-end justify-between gap-6 py-8">
        <p className="text-[0.75rem]">2026 Aaron Rhim</p>
        <FooterCat />
      </Container>
    </footer>
  );
}
