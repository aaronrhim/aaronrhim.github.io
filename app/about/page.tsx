"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import RedText from "@/components/RedText";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold glow-text">About Me</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Beyond the code and circuits, I'm a person with a deep curiosity for how things work—and how to make them beautiful. 
          I love to explore new interests and hobbies that challenge me to think differently.
          Here's a glimpse into who I am when I'm not debugging robots or training models.
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Column: Interests & Hobbies */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          {/* Interests Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Interests</h2>
            <div className="prose prose-invert text-white/70">
              <p>
                My primary interests lie at the intersection of <RedText rewardId="about-robotics-yup">robotics, sociology, and music</RedText>. Stemming from an english class
                my dad, sister, and I taught to underprivileged kids in Vietnam, I've developed a fascination with how <RedText rewardId="about-technology">technology can improve
                our daily lives</RedText>. I'm intrigued by the challenge of bringing digital intelligence into the physical world in ways that feel 
                natural and responsive.
              </p>
              <p className="mt-4">
                I also love exploring <RedText rewardId="about-art">music</RedText> and <RedText rewardId="about-design">sports</RedText>, believing that engineering works best 
                when its creator has a creative and healthy mind.
              </p>
            </div>
          </section>

          {/* Hobbies Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Hobbies</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>🎹 <RedText rewardId="about-piano">Piano:</RedText> Classical & Anime improvisation</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>📷 <RedText rewardId="about-tennis">Tennis:</RedText> Playing doubles with my dad</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>⛷️ <RedText rewardId="about-skiing">Skiing:</RedText> Hitting the double-blacks in the winter</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>☕ <RedText rewardId="about-coffee">Coffee:</RedText> Iced Cappuccino from Tim Hortons 🤤</span>
              </li>
            </ul>
          </section>
        </motion.div>

        {/* Right Column: Key Photos */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4 h-min"
        >
          {/* Photo 1 */}
          <div className="col-span-2 aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-white/5 relative group">
             {/* Replace with your image */}
            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white/20 font-mono text-sm group-hover:bg-neutral-700 transition-colors">
              <img src="/images/profile/family.jpeg" alt="Family picture" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          {/* Photo 2 */}
          <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-white/5 relative group">
             {/* Replace with your image */}
            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white/20 font-mono text-sm group-hover:bg-neutral-700 transition-colors">
               <img src="/images/profile/megroup.jpeg" alt="Group" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
           {/* Photo 3 */}
           <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-white/5 relative group">
             {/* Replace with your image */}
            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white/20 font-mono text-sm group-hover:bg-neutral-700 transition-colors">
               <img src="/images/profile/skiing.jpeg" alt="Skiing" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Piano / Music Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6 pt-12 border-t border-white/10"
      >
        <h2 className="text-3xl font-bold text-white">Piano Performances</h2>
        <p className="text-white/60">Music has always been a huge part of my life. Here are a few selected pieces.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Video 1 */}
          <div className="space-y-2">
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/50">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/JRo3_ib7wmE?si=g0b_wMl4EHW3MIvN" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg font-medium text-white/90">La Campanella - Jun 23, 2024</h3>
          </div>

          {/* Video 2 */}
          <div className="space-y-2">
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/50">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/NHhUY5PsC7A?si=Kd0NyYxRtpEr2Acm" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
             <h3 className="text-lg font-medium text-white/90">Animenz Unravel Adaptation - Dec 24, 2024</h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
