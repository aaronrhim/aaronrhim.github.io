"use client";

import type { ImageLoaderProps } from "next/image";

export default function imageLoader({ src, width }: ImageLoaderProps) {
  if (!src.startsWith("/images/") || !/\.(png|jpe?g)$/i.test(src)) return src;
  return `/optimized${src}.${width}.webp`;
}
