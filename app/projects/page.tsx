"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import { Project } from "@/components/projects/ProjectCard";
import ProjectManifestRow from "@/components/projects/ProjectManifestRow";
import ProjectModal from "@/components/projects/ProjectModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { y: 14, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 110,
      damping: 16,
    },
  },
};

function ProjectsContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const slug = searchParams?.get("project");
    if (!slug) {
      setSelectedProject(null);
      return;
    }
    const p = PROJECTS.find((x) => x.id === slug);
    if (p) setSelectedProject(p as Project);
  }, [searchParams]);

  const handleCloseModal = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("project");
    router.push(`/projects?${params.toString()}`, { scroll: false });
    setSelectedProject(null);
  };

  const handleProjectClick = (project: Project) => {
    const params = new URLSearchParams(window.location.search);
    params.set("project", project.id);
    router.push(`/projects?${params.toString()}`, { scroll: false });
    setSelectedProject(project);
  };

  return (
    <div className="pb-16">
      <header className="mb-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="meta-caps mb-3"
        >
          Project index · Robotics · AI · Software
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl tracking-tight md:text-6xl"
        >
          Projects<span className="text-amber">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 max-w-2xl text-base leading-7 text-ink-dim"
        >
          Everything I've shipped, broken, and rebuilt — from hackathon
          weekends to physics engines. Select an entry for the full report.
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex items-baseline justify-between border-b pb-3"
      >
        <span className="eyebrow">Manifest</span>
        <span className="meta">
          {String(PROJECTS.length).padStart(2, "0")} ENTRIES
        </span>
      </motion.div>

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="m-0 p-0"
      >
        {PROJECTS.map((project, index) => (
          <motion.li key={project.id} variants={itemVariants} className="list-none">
            <ProjectManifestRow
              project={project as Project}
              index={index}
              onClick={() => handleProjectClick(project as Project)}
            />
          </motion.li>
        ))}
      </motion.ul>

      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
      <ProjectsContent />
    </Suspense>
  );
}
