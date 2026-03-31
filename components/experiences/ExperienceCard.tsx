"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";

export interface ExperienceLink {
  url: string;
  type: 'github' | 'website' | 'other';
  label: string; 
}

export interface ExperienceSection {
  title: string;
  body: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  dates: string;
  description?: string;
  longDescription?: string;
  badge: string;
  thumbnail?: string;
  extendingImages?: string[];
  bullets: string[];
  sections?: ExperienceSection[];
  gallery?: string[];
  skills?: string[];
  links?: ExperienceLink[];
  location?: string;
}

interface ExperienceCardProps {
  experience: Experience;
  onClick: () => void;
  index: number;
}

export default function ExperienceCard({ experience, onClick, index }: ExperienceCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      style={{ zIndex: 40 - index }}
      className="group relative w-full cursor-pointer h-full hover:!z-50 transition-all duration-300"
    >
      {/* Extending Images - Distributed Left and Right */}
      {experience.extendingImages && experience.extendingImages.map((src, idx) => {
        
        const isLeft = idx % 2 === 0;
        
        const sideStyle: React.CSSProperties = isLeft
          ? { 
              left: "-18%", // Visible but behind
              right: "auto",
              top: 10 + (idx * 5) + "%", // Stagger vertical slightly
              transform: "rotate(-3deg)"
            }
          : { 
              right: "-18%", // Visible but behind
              left: "auto",
              top: 10 + (idx * 5) + "%",
              transform: "rotate(3deg)"
            };
            
        return (
         <motion.div
           key={`ext-${idx}`}
           className="absolute z-0 w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden border-4 border-white/5 shadow-2xl hidden md:block transition-all duration-500"
           style={sideStyle}
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           whileHover={{ 
             scale: 1.05, 
             zIndex: 0, 
             rotate: isLeft ? -6 : 6
            }}
         >
           <img src={src} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
         </motion.div>
        );
      })}

      <div className="relative z-10 w-full overflow-hidden rounded-xl border border-white/10 bg-card/10 p-0 backdrop-blur-sm transition-all duration-300 hover:bg-card/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">

        <div className={`flex flex-col md:flex-row min-h-[200px] md:min-h-[250px] ${!isEven ? 'md:flex-row-reverse' : ''}`}>

            {/* Thumbnail Section */}
            <div className="relative w-full md:w-[40%] h-36 sm:h-48 md:h-auto overflow-hidden group-hover:brightness-110 transition-all duration-500">
                {experience.thumbnail ? (
                    <Image 
                        src={experience.thumbnail} 
                        alt={experience.company} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <Image src={experience.badge} alt="" width={64} height={64} className="opacity-20 grayscale" />
                    </div>
                )}
                {/* Gradient overlay for text legibility if needed, or style transition */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-transparent" />
                <div className={`absolute inset-0 pointer-events-none md:bg-gradient-to-r ${isEven ? 'from-transparent to-[#0a0a0a]/80' : 'from-[#0a0a0a]/80 to-transparent'} opacity-0 md:opacity-100 hidden md:block`} />
            </div>
         
            {/* Content Section */}
            <div className="relative z-10 flex-1 flex flex-col justify-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8">
                {/* Header: Logo & Role */}
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative h-10 w-10 sm:h-14 sm:w-14 flex-shrink-0 overflow-hidden rounded-xl bg-white/5 p-1.5 sm:p-2 border border-white/10">
                        <Image
                        src={experience.badge}
                        alt={experience.company}
                        fill
                        className="object-contain p-1"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {experience.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                            <span className="text-sm sm:text-base font-medium text-white/80">{experience.company}</span>
                        </div>
                    </div>
                    </div>

                    {/* Arrow Icon - hidden on mobile, shown on hover for desktop */}
                    <div className="hidden sm:flex h-10 w-10 -translate-y-2 translate-x-2 items-center justify-center rounded-full bg-white/5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-primary border border-white/10">
                    <ArrowRight className="h-5 w-5" />
                    </div>
                </div>

                {/* Date & Location Line */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground/80 font-medium">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{experience.dates}</span>
                    </div>
                    {experience.location && (
                        <span>{experience.location}</span>
                    )}
                </div>

                {/* Snippet */}
                <div className="pt-1 sm:pt-2">
                    <p className="text-sm sm:text-base text-gray-300 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    {experience.description || (experience.bullets.length > 0 ? experience.bullets[0].replace(/\[\[.*?\|(.*?)\]\]/g, '$1') : "")}
                    </p>
                </div>
                
                {/* Skills */}
                {experience.skills && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {experience.skills.slice(0, 4).map(skill => (
                            <span key={skill} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-lg bg-white/5 text-white/60 border border-white/5 backdrop-blur-md">
                                {skill}
                            </span>
                        ))}
                        {experience.skills.length > 4 && (
                            <span className="px-3 py-1 text-xs text-white/40">+{experience.skills.length - 4}</span>
                        )}
                    </div>
                )}
            </div>
        </div>
      </div>
    </motion.div>
  );
}
