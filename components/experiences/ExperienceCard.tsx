"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import ImageLightbox, { LightboxTrigger } from "@/components/ImageLightbox";

export interface ExperienceLink {
  url: string;
  type: 'github' | 'website' | 'other';
  label: string; 
}

export interface ExperienceSection {
  title: string;
  body: string;
  images?: string[];
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
  const [lightboxState, setLightboxState] = useState<{ gallery: string[]; startIndex: number } | null>(null);
  const extImages = experience.extendingImages ?? [];

  // Split extending images: even index → left, odd index → right
  const leftImages = extImages.filter((_, i) => i % 2 === 0);
  const rightImages = extImages.filter((_, i) => i % 2 !== 0);

  const IMG_W = 176; // w-44
  const IMG_H = 132;
  const GAP = 16;

  const renderExtImage = (src: string, key: string, side: "left" | "right", idx: number) => {
    const isLeft = side === "left";
    const isVideo = src.endsWith('.mp4');
    const topOffset = 10 + idx * (IMG_H + 12);

    return (
      <motion.div
        key={key}
        className="hidden md:block absolute z-20 rounded-2xl overflow-hidden border hairline shadow-lg"
        style={{
          width: IMG_W,
          height: IMG_H,
          top: topOffset,
          // Use negative pixel values so position is fully OUTSIDE the card.
          // Do NOT use transform here — framer-motion's x/rotate animation would override it.
          ...(isLeft
            ? { left: -(IMG_W + GAP) }
            : { right: -(IMG_W + GAP) }),
        }}
        initial={{ opacity: 0, x: isLeft ? -20 : 20, rotate: isLeft ? -5 : 5 }}
        whileInView={{ opacity: 1, x: 0, rotate: isLeft ? -3 : 3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
        whileHover={{ scale: 1.06, rotate: 0, zIndex: 60 }}
      >
        <LightboxTrigger src={src} gallery={extImages} onOpen={(s, g) => setLightboxState({ gallery: g, startIndex: g.indexOf(s) })}>
          {isVideo ? (
            <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" style={{ width: IMG_W, height: IMG_H }} />
          ) : (
            <img src={src} alt="" className="w-full h-full object-cover" style={{ width: IMG_W, height: IMG_H }} />
          )}
        </LightboxTrigger>
        <div className={`absolute inset-0 bg-gradient-to-${isLeft ? "r" : "l"} from-black/20 via-transparent to-transparent pointer-events-none`} />
      </motion.div>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        onClick={onClick}
        style={{ zIndex: 40 - index }}
        className="group relative w-full cursor-pointer hover:!z-50 transition-all duration-300"
      >
        {/* LEFT extending images */}
        {leftImages.map((src, idx) => renderExtImage(src, `left-${idx}`, "left", idx))}

        {/* RIGHT extending images */}
        {rightImages.map((src, idx) => renderExtImage(src, `right-${idx}`, "right", idx))}

        {/* Card panel */}
        <div className="relative z-10 w-full overflow-hidden rounded-xl border bg-card p-0 transition-all duration-300 hover:border-border-strong hover:shadow-md">
          <div className={`flex flex-col md:flex-row min-h-[200px] md:min-h-[250px] ${!isEven ? 'md:flex-row-reverse' : ''}`}>

            {/* Thumbnail */}
            <div className="relative w-full md:w-[40%] h-36 sm:h-48 md:h-auto overflow-hidden group-hover:brightness-110 transition-all duration-500">
              {experience.thumbnail ? (
                <Image src={experience.thumbnail} alt={experience.company} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Image src={experience.badge} alt="" width={64} height={64} className="opacity-20 grayscale" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-transparent" />
              <div className={`absolute inset-0 pointer-events-none md:bg-gradient-to-r ${isEven ? 'from-transparent to-[var(--card)]' : 'from-[var(--card)] to-transparent'} opacity-0 md:opacity-100 hidden md:block`} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8">
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative h-10 w-10 sm:h-14 sm:w-14 flex-shrink-0 overflow-hidden rounded-xl bg-secondary p-1.5 sm:p-2 border">
                    <Image src={experience.badge} alt={experience.company} fill className="object-contain p-1" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ink group-hover:text-amber transition-colors">
                      {experience.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                      <span className="text-sm sm:text-base font-medium text-ink-dim">{experience.company}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex h-10 w-10 -translate-y-2 translate-x-2 items-center justify-center rounded-full bg-secondary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-amber border">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>

              <div className="flex items-center gap-4 meta">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary border">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{experience.dates}</span>
                </div>
                {experience.location && <span>{experience.location}</span>}
              </div>

              <div className="pt-1 sm:pt-2 space-y-2">
                {experience.description && (
                  <p className="text-sm sm:text-base text-ink-dim line-clamp-1 leading-relaxed">{experience.description}</p>
                )}
                {experience.bullets.length > 0 && (
                  <ul className="space-y-1.5">
                    {experience.bullets.slice(0, 2).map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-amber/60 mt-2 flex-shrink-0" />
                        <span className="line-clamp-1 leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {experience.skills && (
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {experience.skills.slice(0, 4).map(skill => (
                    <span key={skill} className="px-3 py-1 meta-caps rounded-md bg-secondary border">
                      {skill}
                    </span>
                  ))}
                  {experience.skills.length > 4 && (
                    <span className="px-3 py-1 text-xs text-ink-dim/60">+{experience.skills.length - 4}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox — rendered outside the card so it isn't clipped */}
      <ImageLightbox gallery={lightboxState?.gallery ?? null} startIndex={lightboxState?.startIndex ?? 0} onClose={() => setLightboxState(null)} />
    </>
  );
}
