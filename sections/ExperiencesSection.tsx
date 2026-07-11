"use client";

import { useRouter } from "next/navigation";
import Section from "@/components/Section";
import { Experience } from "@/components/experiences/ExperienceCard";
import ExperienceManifestRow from "@/components/experiences/ExperienceManifestRow";
import { CURRENT_WORK } from "@/lib/experiences";

export default function CurrentWorkSection() {
  const router = useRouter();

  const handleClick = (experience: Experience) => {
    router.push(`/experiences?experience=${experience.id}`);
  };

  return (
    <Section id="experience">
      <div className="flex items-end justify-between border-b pb-4">
        <div>
          <p className="meta-caps mb-2">Mission data · 01</p>
          <h2 className="text-2xl tracking-tight sm:text-4xl">Current work</h2>
        </div>
        <a
          href="/experiences"
          className="meta-caps pb-1 transition-colors hover:text-amber"
        >
          Full record →
        </a>
      </div>

      <ul className="m-0 p-0">
        {CURRENT_WORK.map((item, index) => (
          <li key={item.id} className="list-none">
            <ExperienceManifestRow
              experience={item}
              index={index}
              onClick={() => handleClick(item)}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
