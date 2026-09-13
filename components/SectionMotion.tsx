"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Adapted from the Rover site’s shared Reveal observer and transition timings.
export default function SectionMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main section:not(.hero), main .project-banner, main .study-subsection"
      )
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          if (entry.boundingClientRect.top < 0) node.dataset.instant = "true";
          node.dataset.revealed = "true";
          observer.unobserve(node);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.88) return;
      node.dataset.reveal = node.matches(".study-subsection") ? "fade" : "up";
      observer.observe(node);
    });
    return () => {
      observer.disconnect();
      nodes.forEach((node) => {
        delete node.dataset.reveal;
        delete node.dataset.revealed;
        delete node.dataset.instant;
      });
    };
  }, [pathname]);
  return null;
}
