import Image from "next/image";
import Link from "next/link";

export default function ProjectBanner({
  href,
  title,
  image,
  level = 3,
}: {
  href: string;
  title: string;
  image?: string;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <Link href={href} aria-label={title} className="project-banner">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 95vw, 540px"
          className="object-cover"
        />
      )}
      {image && <span className="banner-scrim" aria-hidden />}
      <Heading className="banner-title">{title}</Heading>
      <span className="banner-arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}
