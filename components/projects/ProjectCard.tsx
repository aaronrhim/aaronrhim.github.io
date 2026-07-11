"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface ProjectLink {
  url: string;
  type: 'github' | 'website' | 'other';
  label: string; 
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string; // Standard link
  links?: ProjectLink[]; // Multiple custom links
  highlight?: boolean;
  gallery?: string[];
  extendingImages?: string[]; // Images that "pop out" of the card
  longDescription?: string;
  features?: string[];
  achievements?: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index?: number;
}

export default function ProjectCard({ project, onClick, index = 0 }: ProjectCardProps) {
  const isEven = index % 2 === 0; // Left side in 2-col grid
  
  return (
    <div className="relative group/card h-full" onClick={onClick}>
      {/* Extending Images - positioned behind or around the main card but creating depth */}
      
      {/* Floating/Extending Images (visible on hover or always, depending on design) */}
      {project.extendingImages && project.extendingImages.map((src, idx) => {
        // Calculate position based on card side (even/odd) and image index
        // Even (Left side cards): Extend LEFT
        // Odd (Right side cards): Extend RIGHT
        
        const sideStyle = isEven 
          ? { 
              left: idx === 0 ? "-20%" : "auto", 
              right: "auto",
              top: idx === 0 ? "20%" : "60%" 
            }
          : { 
              right: idx === 0 ? "-20%" : "auto", 
              left: "auto",
              top: idx === 0 ? "20%" : "60%"
            };
            
        // If it's the second image, maybe stagger it differently?
        // Let's keep it simple: First image pops out to the side.
        
        return (
         <motion.div
           key={`ext-${idx}`}
           className="absolute z-0 w-40 h-28 rounded-xl overflow-hidden border-2 hairline shadow-lg hidden md:block" // Increased size and border
           style={{
             ...sideStyle,
             // Ensure it's not covered by the card completely, but z-0 puts it behind z-10 card.
             // To make it more "visible", we move it further out (-40% instead of -20% perhaps?)
             [isEven ? 'left' : 'right']: "-30%", // Push it out more
           }}
           initial={{ opacity: 0, scale: 0.8, x: isEven ? 20 : -20 }}
           whileInView={{ opacity: 1, scale: 1, x: 0 }}
           whileHover={{ 
             scale: 1.1, 
             zIndex: 20, // Bring to front on hover? Or just pop out more?
             x: isEven ? -10 : 10 
            }}
           transition={{ delay: 0.2 + idx * 0.1 }}
         >
           <img src={src} alt="" className="w-full h-full object-cover" />
         </motion.div>
        );
      })}

      <motion.div
        className="relative z-10 h-full cursor-pointer overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:border-border-strong hover:shadow-md"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
      >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Arrow indicator */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-paper/80 backdrop-blur-md flex items-center justify-center border hairline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="w-6 h-6 text-amber" />
        </div>

        {/* Floating Tags over image */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 pr-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-paper/85 text-ink border backdrop-blur-md shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl text-ink mb-3 transition-colors group-hover:text-amber">
          {project.title}
        </h3>
        <p className="text-ink-dim text-sm leading-relaxed mb-4">
          {project.description}
        </p>
      </div>
    </motion.div>
    </div>
  );
}
