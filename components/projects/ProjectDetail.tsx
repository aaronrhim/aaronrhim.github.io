"use client";

import React from "react";
import { ExternalLink, Github, Globe, Link as LinkIcon, Trophy } from "lucide-react";
import { Project, ProjectLink } from "./ProjectCard";

function GalleryItem({ src, index }: { src: string; index: number }) {
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md border shrink-0">
      <img loading="lazy" src={src} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
    </div>
  );
}

function DesktopGallery({ images }: { images: string[] }) {
  if (images.length <= 1) {
    return (
      <div className="w-full h-full relative">
        <img src={images[0]} alt="Gallery" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto p-4 space-y-4 scrollbar-hide">
      {images.map((src, i) => (
        <GalleryItem key={i} src={src} index={i} />
      ))}
    </div>
  );
}

export default function ProjectDetail({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {

  const links: ProjectLink[] = project.links || [];
  if (links.length === 0 && project.link && project.link !== "#") {
      links.push({ url: project.link, type: 'website', label: 'View Project' });
  }

  const handleLinkClick = (e: React.MouseEvent, link: ProjectLink) => {
      e.stopPropagation();
      window.open(link.url, '_blank');
  };

  const hasGallery = project.gallery && project.gallery.length > 0;

  // Layout for Compact (Card View) - PRESERVE ORIGINAL LAYOUT
  if (compact) {
    return (
    <div className="group flex flex-col overflow-hidden h-full p-4 bg-card border rounded-2xl">
      <div className="relative h-40 overflow-hidden flex-shrink-0 rounded-xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
      </div>

      <div className="flex-1 pt-4">
        <h3 className="text-ink mb-2 text-xl glow-text">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.slice(0,3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 meta rounded-md bg-secondary border">
                  {tag}
                </span>
              ))}
        </div>
      </div>
    </div>
    );
  }

  return (
    <>
      {/* ===== MOBILE LAYOUT: single column, no nested scroll ===== */}
      <div className="md:hidden bg-card min-h-full">

        <div className="p-4 sm:p-6">

          {/* Title & Links */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h3 className="text-ink tracking-tight text-2xl glow-text">
              {project.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {links.map((link, i) => (
                <button
                  key={i}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="group/link flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border hover:bg-muted transition-all"
                  title={link.label}
                >
                  {link.type === 'github' ? <Github className="w-4 h-4 text-ink-dim group-hover/link:text-amber" /> :
                   link.type === 'website' ? <Globe className="w-4 h-4 text-ink-dim group-hover/link:text-amber" /> :
                   <LinkIcon className="w-4 h-4 text-ink-dim group-hover/link:text-amber" />}
                  <span className="text-sm font-medium text-ink group-hover/link:text-amber">{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Achievement */}
          {project.achievements && (
            <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-amber/10 border border-amber/30 w-fit">
              <Trophy className="w-4 h-4 text-amber shrink-0" />
              <span className="text-sm font-medium text-amber">{project.achievements}</span>
            </div>
          )}

          {/* Description */}
          <div className="prose max-w-none text-ink/85 mb-6">
            <p className="text-base leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-secondary/60 border">
              <h4 className="eyebrow mb-4">Key Features</h4>
              <ul className="space-y-3">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink/85">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber mt-2 shrink-0" />
                    <span className="text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="mb-6">
            <h4 className="eyebrow mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-medium rounded-md bg-secondary text-ink border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery - inline at bottom */}
          {hasGallery && (
            <div className="pt-6 border-t">
              <h4 className="eyebrow mb-3">Gallery</h4>
              <div className="space-y-4">
                {project.gallery!.map((src, i) => (
                  <GalleryItem key={i} src={src} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT: two-column split (unchanged) ===== */}
      <div className="hidden md:grid md:grid-cols-[1.2fr_1fr] h-full bg-card border rounded-2xl overflow-hidden">

        {/* LEFT COLUMN: Content */}
        <div className="flex flex-col h-full overflow-y-auto p-10 scrollbar-hide">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h3 className="text-ink tracking-tight text-3xl md:text-4xl glow-text">
              {project.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              {links.map((link, i) => (
                <button
                  key={i}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="group/link flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border hover:bg-muted hover:border-border-strong transition-all"
                  title={link.label}
                >
                  {link.type === 'github' ? <Github className="w-4 h-4 text-ink-dim group-hover/link:text-amber" /> :
                   link.type === 'website' ? <Globe className="w-4 h-4 text-ink-dim group-hover/link:text-amber" /> :
                   <LinkIcon className="w-4 h-4 text-ink-dim group-hover/link:text-amber" />}
                  <span className="text-sm font-medium text-ink group-hover/link:text-amber">{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {project.achievements && (
            <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-amber/10 border border-amber/30 w-fit">
              <Trophy className="w-4 h-4 text-amber shrink-0" />
              <span className="text-sm font-medium text-amber">{project.achievements}</span>
            </div>
          )}

          <div className="prose prose-lg max-w-none text-ink/85 mb-8">
            <p className="leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {project.features && project.features.length > 0 && (
            <div className="mb-8 p-6 rounded-2xl bg-secondary/60 border">
              <h4 className="eyebrow mb-4">Key Features</h4>
              <ul className="space-y-3">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink/85">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber mt-2 shrink-0" />
                    <span className="text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto">
            <h4 className="eyebrow mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-medium rounded-md bg-secondary text-ink border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Gallery */}
        <div className="h-full bg-muted/60 relative overflow-hidden border-l">
          {hasGallery ? (
            <DesktopGallery images={project.gallery!} />
          ) : (
            <div className="w-full h-full relative">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
