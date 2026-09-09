import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="label figure">404</p>
      <h1 className="mt-3 text-4xl font-light sm:text-5xl">That page does not exist</h1>
      <p className="measure text-text-dim mt-4 leading-relaxed font-light">
        The link may be out of date, or the page may have moved.
      </p>
      <p className="mt-8">
        <Link href="/" className="btn-ghost">
          Go home
        </Link>
      </p>
    </Container>
  );
}
