"use client";

import { useRouter } from "next/navigation";
import Panel from "@/components/Panel";
import Section from "@/components/Section";
import ExperienceCard, { Experience } from "@/components/experiences/ExperienceCard";
import { CURRENT_WORK } from "@/lib/experiences";

export default function CurrentWorkSection() {
  const router = useRouter();

  const handleClick = (experience: Experience) => {
    router.push(`/experiences?experience=${experience.id}`);
  };

  return (
    <Section id="experience">
      <Panel title="Current Work">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-5 sm:gap-8 md:gap-12 px-0 sm:px-4">
            {CURRENT_WORK.map((item, index) => (
              <div key={item.id} className="w-full">
                <ExperienceCard
                  experience={item}
                  index={index}
                  onClick={() => handleClick(item)}
                />
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </Section>
  );
}
