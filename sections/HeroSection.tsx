"use client";

import Section from "@/components/Section";

export default function HeroSection() {
  return (
    <Section id="top">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-ink">
        <div className="md:col-span-2 flex flex-col gap-6">
          <div>
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight">Aaron Rhim</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-dim leading-8">
              Hi, I'm Aaron — I build interactive systems and experiments at the
              intersection of AI, robotics, and design. I focus on expressive
              interfaces and practical engineering.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="mt-4 sm:mt-0 meta">Currently exploring real-time ML and robotics.</div>
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-[280px] mx-auto md:max-w-none md:ml-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber/15 to-transparent blur-2xl" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden border hairline shadow-lg bg-card rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src="/images/profile/me.jpeg"
              alt="My profile picture" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
