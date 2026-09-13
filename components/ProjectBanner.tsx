"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DecodeText from "./DecodeText";

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
  const [active, setActive] = useState(false);
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <Link
      href={href}
      aria-label={title}
      className="project-banner"
      onPointerEnter={(event) => event.pointerType === "mouse" && setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
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
      <Heading className="banner-title">
        <DecodeText text={title} active={active} />
      </Heading>
      <span className="banner-arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}
