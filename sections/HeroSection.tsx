"use client";

import { motion } from "framer-motion";

const TELEMETRY = [
  "STATUS — CAFFEINATED",
  "PAYLOAD — 6-DOF ARM",
  "NEXT STOP — URC 2026",
];

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-8rem)] w-full flex-col justify-center pb-14"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] items-center gap-14 md:gap-10">
        {/* Transmission text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="meta-caps mb-5">Mission log · Vancouver, Earth</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight">
            Ground control
            <br />
            to <span className="italic text-amber">Aaron Rhim</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-dim leading-8">
            By day, a computer science student at UBC. The rest of the time, I
            teach a Mars rover to type, see, and occasionally wield a kitchen
            knife. Robotics, reinforcement learning, and interfaces with
            personality.
          </p>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-2">
            {TELEMETRY.map((line) => (
              <span key={line} className="meta">
                {line}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Mars orbit diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-10 aspect-square w-full max-w-[280px] md:mb-4 md:max-w-[380px]"
        >
          {/* outer orbit ring with rover dot */}
          <div className="absolute inset-0 rounded-full border border-dashed hairline animate-[orbit-spin_48s_linear_infinite]">
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
          </div>

          {/* inner counter-rotating orbit */}
          <div className="absolute inset-[11%] rounded-full border border-dashed animate-[orbit-spin-reverse_72s_linear_infinite]">
            <div className="absolute left-1/2 bottom-0 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-ink-dim" />
          </div>

          {/* Mars */}
          <div className="absolute inset-[22%] rounded-full bg-amber shadow-[inset_-18px_-14px_44px_rgba(60,30,5,0.35)]" />

          {/* diagram labels */}
          <span className="meta-caps absolute -top-1 right-0 md:-right-6">
            Mars — target
          </span>
          <span className="meta-caps absolute bottom-10 -left-2 md:-left-10">
            Rover · ETA 2026
          </span>

          {/* crew badge */}
          <div className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border hairline bg-card py-1.5 pl-1.5 pr-4 shadow-sm">
            <img
              src="/images/profile/me.jpeg"
              alt="Aaron Rhim"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="meta-caps whitespace-nowrap">Crew — A. Rhim</span>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="meta-caps">↓ Scroll for mission data</span>
      </div>
    </section>
  );
}
