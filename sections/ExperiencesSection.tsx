"use client";

import { useState } from "react";
import Section from "@/components/Section";
import { Experience } from "@/components/experiences/ExperienceCard";
import ExperienceManifestCard from "@/components/experiences/ExperienceManifestCard";
import ExperienceModal from "@/components/experiences/ExperienceModal";
import { EXPERIENCES, EDUCATION } from "@/lib/experiences";

export default function ExperiencesSection() {
  const [selected, setSelected] = useState<Experience | null>(null);
  const items = [...EXPERIENCES, ...EDUCATION];

  return (
    <Section id="experience">
      <div className="flex items-end justify-between border-b pb-4">
        <div>
          <p className="meta-caps mb-2">Mission data · 01</p>
          <h2 className="text-2xl tracking-tight sm:text-4xl">Experience</h2>
        </div>
        <span className="meta pb-1">
          {String(items.length).padStart(2, "0")} ENTRIES · SCROLL →
        </span>
      </div>

      <div className="-mx-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:-mx-6">
        <ul className="m-0 flex items-stretch gap-4 p-0 px-2 py-6 sm:px-6">
          {items.map((item, index) => (
            <li key={item.id} className="flex list-none">
              <ExperienceManifestCard
                experience={item}
                index={index}
                onClick={() => setSelected(item)}
              />
            </li>
          ))}
        </ul>
      </div>

      <ExperienceModal experience={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
