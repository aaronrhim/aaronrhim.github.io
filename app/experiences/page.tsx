"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { EXPERIENCES, EDUCATION } from "@/lib/experiences";
import { Experience } from "@/components/experiences/ExperienceCard";
import ExperienceManifestRow from "@/components/experiences/ExperienceManifestRow";
import ExperienceModal from "@/components/experiences/ExperienceModal";

const tabs = [
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
];

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

function ExperiencesContent() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [activeTab, setActiveTab] = useState("work");
  const router = useRouter();
  const searchParams = useSearchParams();

  const allItems = [...EXPERIENCES, ...EDUCATION];
  const items = activeTab === "work" ? EXPERIENCES : EDUCATION;

  useEffect(() => {
    const slug = searchParams?.get("experience");
    if (!slug) {
      setSelectedExperience(null);
      return;
    }
    const found = allItems.find((x) => x.id === slug);
    if (found) setSelectedExperience(found);
  }, [searchParams]);

  const handleCloseModal = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("experience");
    const qs = params.toString();
    router.push(`/experiences${qs ? `?${qs}` : ""}`, { scroll: false });
    setSelectedExperience(null);
  };

  const handleClick = (experience: Experience) => {
    const params = new URLSearchParams(window.location.search);
    params.set("experience", experience.id);
    router.push(`/experiences?${params.toString()}`, { scroll: false });
    setSelectedExperience(experience);
  };

  return (
    <div className="pb-16">
      <header className="mb-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="meta-caps mb-3"
        >
          Service record · UBC · Vancouver
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl tracking-tight md:text-6xl"
        >
          Experience<span className="text-amber">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 max-w-2xl text-base leading-7 text-ink-dim"
        >
          My professional journey across robotics teams, aerospace, and
          academia. Select an entry for the full report.
        </motion.p>
      </header>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
        className="mb-6 flex gap-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200 sm:text-base ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "cursor-pointer text-ink-dim md:hover:bg-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex items-baseline justify-between border-b pb-3"
      >
        <span className="eyebrow">Manifest</span>
        <span className="meta">
          {String(items.length).padStart(2, "0")} ENTRIES
        </span>
      </motion.div>

      <motion.ul
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="m-0 p-0"
      >
        {items.map((item, index) => (
          <motion.li key={item.id} variants={itemVariants} className="list-none">
            <ExperienceManifestRow
              experience={item}
              index={index}
              onClick={() => handleClick(item)}
            />
          </motion.li>
        ))}
      </motion.ul>

      <ExperienceModal
        experience={selectedExperience}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default function ExperiencesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
      <ExperiencesContent />
    </Suspense>
  );
}
