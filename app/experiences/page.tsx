"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { EXPERIENCES, EDUCATION } from "@/lib/experiences";
import ExperienceCard, { Experience } from "@/components/experiences/ExperienceCard";
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
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
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
    <div className="pb-20">
      <header className="mb-12">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-6xl font-bold mb-4 glow-text"
        >
          Experience
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg max-w-2xl"
        >
          My professional journey across startups, robotics teams, and academia.
        </motion.p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 sm:text-base ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-[0_5px_30px_rgba(255,255,255,0.2)] icon-glow"
                : "cursor-pointer text-white md:hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-5 sm:gap-8 md:gap-12"
      >
        {items.map((item, index) => (
          <motion.div key={item.id} variants={itemVariants} className="w-full">
            <ExperienceCard
              experience={item}
              index={index}
              onClick={() => handleClick(item)}
            />
          </motion.div>
        ))}
      </motion.div>

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
