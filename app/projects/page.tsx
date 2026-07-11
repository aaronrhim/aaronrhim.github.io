"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import { Project } from "@/components/projects/ProjectCard";
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

function ManifestRow({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const category = project.tags.slice(0, 2).join(" · ");

  return (
    <motion.li variants={itemVariants} className="list-none">
      <button
        type="button"
        onClick={onClick}
        className="group relative flex w-full cursor-pointer items-baseline gap-4 border-b px-2 py-6 text-left transition-colors duration-200 hover:bg-card sm:gap-8 sm:px-4 sm:py-8"
      >
        <span className="meta w-8 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-serif text-2xl leading-tight text-ink transition-colors duration-200 group-hover:text-amber sm:text-4xl">
            {project.title}
          </span>
          <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-ink-dim line-clamp-1">
            {project.description}
          </span>
        </span>

        {project.achievements && (
          <span
            className="flex shrink-0 items-center gap-1.5 self-center rounded-md border border-amber/30 bg-amber/10 px-2 py-1"
            title={project.achievements}
          >
            <Trophy className="h-3.5 w-3.5 text-amber" />
            <span className="meta-caps hidden text-amber sm:inline">Awarded</span>
          </span>
        )}

        <span className="meta-caps hidden max-w-[190px] shrink-0 self-center truncate text-right md:block">
          {category}
        </span>

        <ArrowUpRight className="hidden h-5 w-5 shrink-0 self-center text-ink-dim opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-amber group-hover:opacity-100 sm:block" />

        {/* hover thumbnail plate */}
        <span className="pointer-events-none absolute right-28 top-1/2 z-10 hidden h-28 w-44 -translate-y-1/2 rotate-[-3deg] scale-90 overflow-hidden rounded-lg border hairline opacity-0 shadow-lg transition-all duration-300 group-hover:rotate-2 group-hover:scale-100 group-hover:opacity-100 lg:block"
        >
          <img
            src={project.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </span>
      </button>
    </motion.li>
  );
}

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
    <div className="pb-24">
      <header className="mb-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="meta-caps mb-5"
        >
          Project index · Robotics · AI · Software
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-5xl tracking-tight md:text-7xl"
        >
          Projects<span className="text-amber">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-5 max-w-2xl text-lg leading-8 text-ink-dim"
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
          <ManifestRow
            key={project.id}
            project={project as Project}
            index={index}
            onClick={() => handleProjectClick(project as Project)}
          />
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
