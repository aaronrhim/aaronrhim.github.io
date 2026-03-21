"use client";

import React from "react";
import { Experience, ExperienceLink } from "./ExperienceCard";
import { ExternalLink, Github, Globe, Linkedin, MapPin } from "lucide-react";
import Image from "next/image";
import { renderWithRedText } from "@/lib/formatting";
import { motion } from "framer-motion";

function Gallery({ images }: { images: string[] }) {
  // If only one image, simply display it static
  if (images.length <= 1) {
    const src = images[0];
    const isVideo = src?.endsWith('.mp4');
    
    return (
      <div className="w-full h-full relative">
         {isVideo ? (
            <video 
              src={src} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover object-[50%_25%]" 
            />
         ) : (
            <img src={src} alt="Gallery" className="w-full h-full object-cover" />
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {images.map((src, i) => {
          const isVideo = src.endsWith('.mp4');
          return (
            <div key={i} className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10 shrink-0">
              {isVideo ? (
                <video 
                  src={src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover object-[50%_25%]" 
                />
              ) : (
                <img loading="lazy" src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              )}
            </div>
          );
        })}
    </div>
  );
}

export default function ExperienceDetail({
  experience,
}: {
  experience: Experience;
}) {
  const links = experience.links || [];

  return (
    <div className="flex flex-col md:grid md:grid-cols-[1.5fr_1fr] h-full bg-card/95 backdrop-blur-xl border border-white/10 sm:rounded-2xl overflow-hidden">

      {/* LEFT COLUMN: Narrative & Details */}
      <div className="flex flex-col h-full overflow-y-auto p-4 sm:p-6 md:p-10 order-2 md:order-1 scrollbar-hide relative">
        
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 border-b border-white/10 pb-4 sm:pb-6">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                 <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/5 p-1.5 sm:p-2 border border-white/10">
                     <Image src={experience.badge} alt={experience.company} fill className="object-contain p-1.5 sm:p-2" />
                 </div>
                 <div>
                     <h2 className="text-xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-white glow-text">
                        {experience.company}
                     </h2>
                     {experience.location && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            <span>{experience.location}</span>
                        </div>
                     )}
                 </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                 <div className="text-base sm:text-xl font-medium text-white/90">
                    {experience.role}
                 </div>
                 <div className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold tracking-wide">
                    {experience.dates}
                 </div>
            </div>
            
            {/* Links row */}
            {links.length > 0 && (
                <div className="flex gap-3 mt-4">
                    {links.map((link, i) => (
                        <a 
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-medium text-white/70 hover:text-white"
                        >
                            {link.type === 'github' ? <Github className="w-3.5 h-3.5" /> : 
                             link.type === 'website' ? <Globe className="w-3.5 h-3.5" /> :
                             <ExternalLink className="w-3.5 h-3.5" />
                            }
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </div>

        {/* Short & Long Description */}
        <div className="prose prose-invert max-w-none mb-6 sm:mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">Overview</h4>
            <p className="text-base sm:text-lg leading-relaxed text-white/80">
                {experience.longDescription || experience.description}
            </p>
        </div>

        {/* Impact / Bullets */}
        <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 mb-4">Key Achievements & Impact</h4>
            <ul className="space-y-4">
                {experience.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground group">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2.5 group-hover:bg-primary group-hover:shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] transition-all"></span>
                        <div className="leading-relaxed">
                            {renderWithRedText(b)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Skills */}
        {experience.skills && (
             <div className="mt-auto pt-6 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 mb-3">Core Competencies</h4>
                <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-xs text-white/60 font-mono hover:bg-white/10 transition-colors">
                            {skill}
                        </span>
                    ))}
                </div>
             </div>
        )}

      </div>

      {/* RIGHT COLUMN: Gallery */}
      <div className="h-48 sm:h-64 md:h-full bg-black/40 relative overflow-hidden order-1 md:order-2 border-b md:border-b-0 md:border-l border-white/10">
         {experience.gallery && experience.gallery.length > 0 ? (
             <Gallery images={experience.gallery} />
         ) : (
             <div className="text-xs text-white/20 flex flex-col items-center justify-center h-full">
                  <Image src={experience.badge} alt="" width={64} height={64} className="opacity-20 grayscale mb-2" />
                  <span>No gallery images</span>
             </div>
         )}
      </div>

    </div>
  );
}
