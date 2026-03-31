"use client";

import React, { useState } from "react";
import { Experience, ExperienceSection } from "./ExperienceCard";
import { ExternalLink, Github, Globe, MapPin } from "lucide-react";
import Image from "next/image";
import { renderWithRedText } from "@/lib/formatting";
import { motion } from "framer-motion";
import ImageLightbox, { LightboxTrigger } from "@/components/ImageLightbox";

// ─── Simple Gallery Item ───────────────────────────────────────────────────────
function GalleryItem({ src, index, onOpen }: { src: string; index: number; onOpen: (s: string) => void }) {
  const isVideo = src.endsWith(".mp4");
  return (
    <LightboxTrigger src={src} onOpen={onOpen}>
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10 shrink-0">
        {isVideo ? (
          <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover object-[50%_25%]" />
        ) : (
          <img loading="lazy" src={src} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
        )}
      </div>
    </LightboxTrigger>
  );
}

// ─── Section media item ────────────────────────────────────────────────────────
function SectionMedia({ src, onOpen }: { src: string; onOpen: (s: string) => void }) {
  const isVideo = src.endsWith(".mp4");
  return (
    <LightboxTrigger src={src} onOpen={onOpen} className="w-full h-full">
      <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-xl">
        {isVideo ? (
          <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={src} alt="" className="w-full h-full object-cover" />
        )}
      </div>
    </LightboxTrigger>
  );
}

// ─── Mobile Section Row ────────────────────────────────────────────────────────
function MobileSectionRow({ section, images, onOpen }: { section: ExperienceSection; images: string[]; onOpen: (s: string) => void }) {
  return (
    <div>
      {images.length > 0 && (
        <div className={`grid gap-2 mb-3 ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="aspect-video rounded-lg overflow-hidden border border-white/10 shadow-md"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <SectionMedia src={src} onOpen={onOpen} />
            </motion.div>
          ))}
        </div>
      )}
      <div className="border-l-2 border-primary/20 pl-4 hover:border-primary/50 transition-colors">
        <h5 className="text-sm font-semibold text-white/90 mb-1">{section.title}</h5>
        <p className="text-sm leading-relaxed text-muted-foreground">{section.body}</p>
      </div>
    </div>
  );
}

// ─── Compact image grid — adapts to count, fixed max height, overflow badge ───
function SectionImageGrid({
  images,
  onOpen,
  tilt = 0,
}: {
  images: string[];
  onOpen: (s: string) => void;
  tilt?: number;
}) {
  const MAX = 4;
  const visible = images.slice(0, MAX);
  const overflow = images.length - MAX;
  const count = visible.length;

  const Cell = ({ src, className, badge }: { src: string; className?: string; badge?: boolean }) => {
    const isVideo = src.endsWith(".mp4");
    return (
      <LightboxTrigger src={src} onOpen={onOpen} className={`relative rounded-lg overflow-hidden border border-white/10 shadow-md ${className ?? ""}`}>
        {isVideo ? (
          <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={src} alt="" className="w-full h-full object-cover" />
        )}
        {badge && overflow > 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-base">+{overflow}</span>
          </div>
        )}
      </LightboxTrigger>
    );
  };

  if (count === 1) return (
    <div style={{ transform: `rotate(${tilt}deg)` }} className="h-36 xl:h-44">
      <Cell src={visible[0]} className="w-full h-full" />
    </div>
  );

  if (count === 2) return (
    <div style={{ transform: `rotate(${tilt}deg)` }} className="flex flex-col gap-1.5">
      <div className="h-[76px] xl:h-[88px]"><Cell src={visible[0]} className="w-full h-full" /></div>
      <div className="h-[76px] xl:h-[88px]"><Cell src={visible[1]} className="w-full h-full" badge /></div>
    </div>
  );

  if (count === 3) return (
    <div style={{ transform: `rotate(${tilt}deg)` }} className="flex flex-col gap-1.5">
      <div className="h-[88px] xl:h-[100px]"><Cell src={visible[0]} className="w-full h-full" /></div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="h-[60px] xl:h-[68px]"><Cell src={visible[1]} className="w-full h-full" /></div>
        <div className="h-[60px] xl:h-[68px]"><Cell src={visible[2]} className="w-full h-full" badge /></div>
      </div>
    </div>
  );

  // 4+: 2×2 grid
  return (
    <div style={{ transform: `rotate(${tilt}deg)` }} className="grid grid-cols-2 gap-1.5">
      {visible.map((src, i) => (
        <div key={i} className="h-[72px] xl:h-[80px]">
          <Cell src={src} className="w-full h-full" badge={i === 3} />
        </div>
      ))}
    </div>
  );
}

// ─── Desktop Section Row — text + images side by side (no overflow needed) ────
function DesktopSectionRow({
  section,
  images,
  index,
  onOpen,
}: {
  section: ExperienceSection;
  images: string[];
  index: number;
  onOpen: (s: string) => void;
}) {
  const isLeft = index % 2 === 0;
  const hasImages = images.length > 0;

  const textBlock = (
    <motion.div
      className="border-l-2 border-primary/20 pl-5 hover:border-primary/60 transition-colors duration-300 group flex-1 min-w-0"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <h5 className="text-base font-semibold text-white/90 mb-2 group-hover:text-primary transition-colors">
        {section.title}
      </h5>
      <p className="text-sm leading-relaxed text-muted-foreground">{section.body}</p>
    </motion.div>
  );

  const imageBlock = hasImages ? (
    <motion.div
      className="flex-shrink-0 w-44 xl:w-52"
      initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionImageGrid images={images} onOpen={onOpen} tilt={isLeft ? 1.5 : -1.5} />
    </motion.div>
  ) : null;

  return (
    <div className={`flex gap-5 items-start ${!isLeft ? "flex-row-reverse" : ""}`}>
      {textBlock}
      {imageBlock}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ExperienceDetail({ experience }: { experience: Experience }) {
  const links = experience.links || [];
  const hasSections = !!(experience.sections && experience.sections.length > 0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      {/* ====================================================
          MOBILE LAYOUT
          ==================================================== */}
      <div className="md:hidden bg-card/95 backdrop-blur-xl min-h-full">
        <div className="p-4 sm:p-6">

          {/* Header */}
          <div className="mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-12 h-12 rounded-xl bg-white/5 p-1.5 border border-white/10">
                <Image src={experience.badge} alt={experience.company} fill className="object-contain p-1.5" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-white glow-text">
                  {experience.company}
                </h2>
                {experience.location && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" /><span>{experience.location}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-base font-medium text-white/90">{experience.role}</div>
              <div className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide">
                {experience.dates}
              </div>
            </div>
            {links.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {links.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-medium text-white/70">
                    {link.type === "github" ? <Github className="w-3.5 h-3.5" /> : link.type === "website" ? <Globe className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Overview */}
          <div className="prose prose-invert max-w-none mb-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">Overview</h4>
            <p className="text-base leading-relaxed text-white/80">{experience.longDescription || experience.description}</p>
          </div>

          {/* Bullets */}
          {experience.bullets.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 mb-4">Key Achievements &amp; Impact</h4>
              <ul className="space-y-3">
                {experience.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-white/70 mt-[0.4rem] flex-shrink-0" />
                    <div className="leading-relaxed text-sm">{renderWithRedText(b)}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Deep Dives */}
          {hasSections && (
            <div className="mb-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 mb-4">Deep Dives</h4>
              <div className="space-y-6">
                {experience.sections!.map((s, i) => (
                  <MobileSectionRow key={i} section={s} images={s.images ?? []} onOpen={setLightboxSrc} />
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {experience.skills && (
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 mb-3">Core Competencies</h4>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-xs text-white/60 font-mono">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ====================================================
          DESKTOP LAYOUT
          
          Design: single scrollable column, no overflow-x.
          Each "Deep Dive" section has its text + associated images
          side by side in a flex row — images are NEXT TO the text,
          not on top of it, alternating sides each section.
          No horizontal overflow at all.
          ==================================================== */}
      <div className="hidden md:block h-full bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
          <div className="px-10 xl:px-14 py-10">

            {/* Header */}
            <div className="mb-8 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-xl bg-white/5 p-2 border border-white/10">
                  <Image src={experience.badge} alt={experience.company} fill className="object-contain p-2" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-white glow-text">
                    {experience.company}
                  </h2>
                  {experience.location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" /><span>{experience.location}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-xl font-medium text-white/90">{experience.role}</div>
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide">{experience.dates}</div>
              </div>
              {links.length > 0 && (
                <div className="flex gap-3 mt-4">
                  {links.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-medium text-white/70 hover:text-white">
                      {link.type === "github" ? <Github className="w-3.5 h-3.5" /> : link.type === "website" ? <Globe className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <motion.div className="prose prose-invert max-w-none mb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">Overview</h4>
              <p className="text-lg leading-relaxed text-white/80">{experience.longDescription || experience.description}</p>
            </motion.div>

            {/* Bullets */}
            {experience.bullets.length > 0 && (
              <motion.div className="mb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 mb-4">Key Achievements &amp; Impact</h4>
                <ul className="space-y-4">
                  {experience.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-white/70 mt-[0.4rem] flex-shrink-0" />
                      <div className="leading-relaxed">{renderWithRedText(b)}</div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* ── Deep Dives: text + images side by side per section ── */}
            {hasSections && (
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 mb-6">Deep Dives</h4>
                <div className="space-y-10">
                  {experience.sections!.map((s, i) => (
                    <DesktopSectionRow
                      key={i}
                      section={s}
                      images={s.images ?? []}
                      index={i}
                      onOpen={setLightboxSrc}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {experience.skills && (
              <motion.div className="pt-6 border-t border-white/10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 mb-3">Core Competencies</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-xs text-white/60 font-mono hover:bg-white/10 transition-colors">{skill}</span>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  );
}
