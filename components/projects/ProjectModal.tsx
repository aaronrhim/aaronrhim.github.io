"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";


interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop - hidden on mobile since modal is full screen */}
          <motion.div
            className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-50 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal - full screen on mobile, centered on desktop */}
          <motion.div
            className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-7xl md:h-[85vh] z-50 md:rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative h-full w-full overflow-y-auto md:overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="sticky top-4 float-right mr-4 z-10 w-10 h-10 rounded-full bg-ink/70 backdrop-blur-md flex items-center justify-center border hover:bg-ink transition-colors group md:absolute md:top-4 md:right-4"
              >
                <X className="w-5 h-5 text-paper/80 group-hover:text-paper" />
              </button>

              <ProjectDetail project={project} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
