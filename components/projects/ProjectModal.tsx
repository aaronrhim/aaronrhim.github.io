"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";
import { useMoney } from "@/lib/money-context";


interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { awardOnce, hasAward } = useMoney();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [project]);

  if (!project) return null;

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    awardOnce(`project-view-${project.id}`, "external", 0.5);
    if (project.link && project.link !== "#") window.open(project.link, "_blank");
  };

  const handleCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    awardOnce(`project-code-${project.id}`, "external", 0.25);
    if (project.link && project.link !== "#") window.open(project.link, "_blank");
  };

  const viewClaimed = hasAward(`project-view-${project.id}`);
  const codeClaimed = hasAward(`project-code-${project.id}`);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop - hidden on mobile since modal is full screen */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal - full screen on mobile, centered on desktop */}
          <motion.div
            className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-7xl md:h-[85vh] z-50 md:rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative h-full w-full overflow-y-auto md:overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="sticky top-4 float-right mr-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/70 transition-colors group md:absolute md:top-4 md:right-4"
              >
                <X className="w-5 h-5 text-white/70 group-hover:text-white" />
              </button>

              <ProjectDetail
                project={project}
                onView={handleView}
                onCode={handleCode}
                viewClaimed={viewClaimed}
                codeClaimed={codeClaimed}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
