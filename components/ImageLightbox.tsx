"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ImageLightboxProps {
  gallery: string[] | null; // null = closed
  startIndex?: number;
  onClose: () => void;
}

export default function ImageLightbox({ gallery, startIndex = 0, onClose }: ImageLightboxProps) {
  const [index, setIndex] = useState(startIndex);

  // Sync index when gallery/startIndex changes
  useEffect(() => { setIndex(startIndex); }, [gallery, startIndex]);

  const total = gallery?.length ?? 0;
  const src = gallery?.[index] ?? null;
  const isVideo = src?.endsWith(".mp4");

  const prev = useCallback(() => setIndex(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex(i => (i + 1) % total), [total]);

  useEffect(() => {
    if (!gallery) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [gallery, onClose, prev, next]);

  return (
    <AnimatePresence>
      {gallery && src && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/88 backdrop-blur-md z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Main lightbox frame */}
          <motion.div
            className="fixed inset-0 z-[201] flex flex-col items-center justify-center gap-4 p-6 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
          >
            {/* Media card */}
            <div className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 pointer-events-auto bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${index}-${src}`}
                  className="w-full h-full"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {isVideo ? (
                    <video
                      src={src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      className="w-full max-h-[80vh] object-contain"
                    />
                  ) : (
                    <img
                      src={src}
                      alt={`${index + 1} of ${total}`}
                      className="w-full max-h-[80vh] object-contain"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-black/80 transition-colors group z-10"
              >
                <X className="w-4 h-4 text-white/70 group-hover:text-white" />
              </button>

              {/* Prev / Next */}
              {total > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-black/80 transition-colors text-white/70 hover:text-white z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-black/80 transition-colors text-white/70 hover:text-white z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Counter pill */}
              {total > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 text-xs font-medium z-10">
                  {index + 1} / {total}
                </div>
              )}
            </div>

            {/* Thumbnail strip (only when multiple images) */}
            {total > 1 && (
              <div className="flex gap-2 pointer-events-auto max-w-4xl overflow-x-auto scrollbar-hide px-1">
                {gallery!.map((thumb, i) => {
                  const isThumbVideo = thumb.endsWith(".mp4");
                  return (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        i === index
                          ? "border-primary shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                          : "border-white/10 opacity-50 hover:opacity-80"
                      }`}
                    >
                      {isThumbVideo ? (
                        <video src={thumb} muted playsInline className="w-full h-full object-cover" />
                      ) : (
                        <img src={thumb} alt="" className="w-full h-full object-cover" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** Wrap any img/video with this to make it clickable — opens a gallery lightbox */
export function LightboxTrigger({
  src,
  gallery,
  onOpen,
  children,
  className = "",
}: {
  src: string;
  gallery?: string[];        // full list to navigate; defaults to [src]
  onOpen: (src: string, gallery: string[]) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative cursor-zoom-in group/lb ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onOpen(src, gallery ?? [src]);
      }}
    >
      {children}
      {/* Zoom hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/lb:opacity-100 transition-opacity duration-200 bg-black/20 rounded-[inherit]">
        <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}
