"use client";

import React, { useRef, useEffect } from "react";
import { ExternalLink, Github, Globe, Link as LinkIcon, Trophy } from "lucide-react";
import { Project, ProjectLink } from "./ProjectCard";
// import { motion } from "framer-motion"; // Removed unused motion import related to gallery

function Gallery({ images }: { images: string[] }) {
  // If only one image, simply display it static
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
          <div key={i} className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10 shrink-0">
            <img loading="lazy" src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
    </div>
  );
}

export default function ProjectDetail({
  project,
  onView,
  onCode,
  viewClaimed = false,
  codeClaimed = false,
  compact = false,
}: {
  project: Project;
  onView?: (e: React.MouseEvent) => void;
  onCode?: (e: React.MouseEvent) => void;
  viewClaimed?: boolean;
  codeClaimed?: boolean;
  compact?: boolean;
}) {

  const links: ProjectLink[] = project.links || [];
  if (links.length === 0 && project.link && project.link !== "#") {
      links.push({ url: project.link, type: 'website', label: 'View Project' });
  }

  const handleLinkClick = (e: React.MouseEvent, link: ProjectLink) => {
      // Trigger rewards callbacks (which are passed from ProjectModal)
      // We pass the event but ProjectModal stops propagation and handles rewards.
      // Note: ProjectModal might also try to open project.link if we aren't careful.
      // But if we move to 'links', we assume project.link might be empty or we just double open?
      // To prevent double open: rely on ProjectModal ONLY for rewards.
      // But ProjectModal has the window.open logic hardcoded.
      
      if (link.type === 'website' && onView) {
           onView(e); // This triggers reward
      }
      if (link.type === 'github' && onCode) {
           onCode(e); // This triggers reward
      }

      // We open the link here to support specific link URLs
      // If ProjectModal also opens, it opens project.link. 
      // User should ensure project.link in JSON is empty if using links array, OR we strip it.
      window.open(link.url, '_blank');
  };

  // Layout for Compact (Card View) - PRESERVE ORIGINAL LAYOUT
  if (compact) {
    return (
    <div className="group flex flex-col overflow-hidden h-full p-4 bg-card/30 backdrop-blur-md border border-white/10 rounded-2xl">
      <div className="relative h-40 overflow-hidden flex-shrink-0 rounded-xl">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
      </div>

      <div className="flex-1 pt-4">
        <h3 className="font-bold text-foreground mb-2 text-xl glow-text">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.slice(0,3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
        </div>
      </div>
    </div>
    );
  }

  // Expanded Layout (Modal View) - SPLIT VIEW
  return (
    <div className="flex flex-col md:grid md:grid-cols-[1.2fr_1fr] h-full bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      
      {/* LEFT COLUMN: Content */}
      <div className="flex flex-col h-full overflow-y-auto p-6 md:p-10 order-2 md:order-1 scrollbar-hide">
        <div className="flex flex-wrap items-center gap-4 mb-4">
            <h3 className="font-bold text-foreground tracking-tight text-3xl md:text-4xl glow-text">
            {project.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-2">
                {links.map((link, i) => (
                    <button 
                        key={i}
                        onClick={(e) => handleLinkClick(e, link)}
                        className="group/link flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all"
                        title={link.label}
                    >
                        {link.type === 'github' ? <Github className="w-4 h-4 text-white/70 group-hover/link:text-primary" /> : 
                         link.type === 'website' ? <Globe className="w-4 h-4 text-white/70 group-hover/link:text-primary" /> :
                         <LinkIcon className="w-4 h-4 text-white/70 group-hover/link:text-primary" />
                        }
                        <span className="text-sm font-medium text-white/80 group-hover/link:text-primary">{link.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {project.achievements && (
          <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 w-fit">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-sm font-medium text-amber-300">{project.achievements}</span>
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none text-muted-foreground mb-8">
          <p className="leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>

        {project.features && project.features.length > 0 && (
          <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Key Features</h4>
            <ul className="space-y-3">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80">
                   <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                   <span className="text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white/5 text-white/90 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Gallery Carousel */}
      <div className="h-64 md:h-full bg-black/40 relative overflow-hidden order-1 md:order-2 border-b md:border-b-0 md:border-l border-white/10">
         {project.gallery && project.gallery.length > 0 ? (
             <Gallery images={project.gallery} />
         ) : (
             <div className="w-full h-full relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
             </div>
         )}
      </div>

    </div>
  );
}
