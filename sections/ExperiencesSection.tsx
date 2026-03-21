"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Panel from "@/components/Panel";
import Section from "@/components/Section";
import ExperienceCard, { Experience } from "@/components/experiences/ExperienceCard";
import ExperienceModal from "@/components/experiences/ExperienceModal";

const tabs = [
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
];

const defaultBadge = "/logo/roverlogo.png";

// Raw data - enriched with new fields for the Modal
const EXPERIENCES: Experience[] = [
  {
    id: "connections",
    role: "Startup Founder & CTO",
    company: "Connections",
    dates: "Dec. 2025 – Present",
    badge: "/logo/conlogo.png", 
    location: "Vancouver, BC",
    description: "Co-Founded an agentic learning platform enabling talented individuals to easily monetize their skills.",
    longDescription: "Connections initially formed in a hackathon in which each of us were completely oblivious to the future as well as each other. Yet, we somehow found a shared level of ambition and formed our startup called Conncections--a platform that enables talented individuals to easily monetize their skills through a unique approach of fostering community. I currently hold the role as the CTO and Co-Founder of Connections but really, my role involved everything from architectural decisions on the n8n cloud to pitching specifically to angel investors. Our tight chemistry, organizational planning, and documentation by our brilliant (yet blind!) leader, Jugaad Singh, has allowed Connections to become what it is. ",
    bullets: [
      "[[red:exp-1:2.5|Co-Founded]] an [[red:exp-2:2.5|agentic learning platform]], enabling talented individuals to easily monetize their skills",
      "Engineered the backend on n8n cloud, featuring a full threaded, multi-step API/web-scraping agents",
      "Business model surrounds a commission-based fee of 20% where within 2 days of launch, we received around [[red:exp-3:2.5|230 paying students]], 8 instructors, and over [[red:exp-4:2.5|23,000 impressions]] on our social media platforms",
      "Receiving guidance and mentorship from Aaron Stuart, CEO of VANTEC Angel Network",
      "Applying as a venture capital to startup accelerators such as [[red:exp-yc:2.5|Y Combinator]], Techstars, and Google for Startups",
    ],
    gallery: [
         "/images/connectionsworkflow.png",
         "/images/connectionsteam.jpeg",
         "/images/kickstart.png",
         "/images/thumbnails/connectionsthumbnail.png"
    ],
    extendingImages: [
        "/images/connectionsteam.jpeg",
        "/images/kickstart.png",
    ],
    thumbnail: "/images/thumbnails/connectionsthumbnail.png", // Added thumbnail
    skills: ["n8n", "Node.js", "Vercel", "Render", "Supabase", "OpenAI API", "Playwright API", "Google API", "Venture Capital", "Product Management"],
    links: [
        { url: "https://www.connectionsforcommunity.org", type: 'website', label: 'Company Site' }
    ]
  },
  {
    id: "ubc-rover",
    role: "Software Co-Lead - AI Autonomy",
    company: "UBC Rover",
    dates: "Sep. 2025 – Present",
    badge: "/logo/roverlogo.png",
    location: "University of British Columbia",
    description: "Leading the development of autonomy software tailored for Mars rover simulations and competitions.",
    longDescription: "At UBC Rover, I co-lead the AI Autonomy software sub-team. Our mission is to build a fully autonomous rover capable of traversing rough terrain and perform dexterous tasks such as typing on a keyboard (RL autonomy direct relation). I introduced a Docker-based development workflow that streamlined onboarding for over 40 members and am currently working on our Reinforcement Learning pipeline to type on a keyboard (of course you could technically just build a CV model and calculate IK but you can earn extra points for using RL at the University Rover Challenge (URC)). We will be competing in the Canadian International Rover Challenge (CIRC, Alberta, Canadian schools) and URC (Utah, Global schools) in 2026.",
    bullets: [
      "Transformed team workflow by designing a Docker-based pipeline adopted by 40 members, significantly [[red:exp-collab:2.5|improving collaboration]] experience for new members",
      "Leading a four-member team to develop the [[red:exp-rl:0.5|Reinforcement Learning]] pipeline, coordinating progress and presenting weekly updates to align the rest of the team with our research and development efforts",
      "Managed project timelines, reviewed PRs, and hosted weekly reviews, ensuring transparency and progress",
      "Worked with the mechanical sub-team to develop a cohesive simulation environment and detailed robotic design mechanics (with modeling capability), achieving an [[red:exp-acc:2.5|84% accuracy]] to the real world",
      "Competing at the University Rover Challenge (URC) and the Canadian International Rover Competition (CIRC) in 2026",
    ],
    gallery: [
        "/images/thumbnails/rover.png",
        "/images/rover1.png",
        "/images/rover2.jpeg",
        "/images/rover3.mp4",
        "/images/rover4.mp4",
        "/images/rover5.mp4",
        "/images/rover6.png",
        "/images/rover7.png",
        "/images/rover8.png",
        "/images/rover9.mp4"
    ],
    extendingImages: [
        "/images/rover1.png",
        "/images/rover2.jpeg"
    ],
    thumbnail: "/images/thumbnails/rover.png", // Hypothetical thumbnail (will use one of the images)
    skills: ["Docker", "Python", "ROS2", "Reinforcement Learning", "Team Leadership", "Mujoco", "Robosuite", "Git", "Fusion360", "XML/URDF"],
    links: [
        { url: "https://ubcrover.com", type: 'website', label: 'Team Website' },
        { url: "https://github.com/UBC-Snowbots/RoverFlake2", type: 'github', label: 'Team GitHub' },
        { url: "https://github.com/UBC-Snowbots/LearnFlake", type: 'github', label: 'RL Autonomy GitHub' },
    ]
  },
  {
    id: "ubc-arrc",
    role: "Software Member - Computer Vision & Telemetry",
    company: "UBC Aerial Robotics and Rocketry Club (ARRC, Aerospace)",
    dates: "Sep. 2024 – Aug. 2025",
    badge: "/logo/arrc.png",
    location: "University of British Columbia",
    description: "Developed advanced computer vision models for aerial object detection and image denoising.",
    longDescription: "As a member of the UBC ARRC software team, I focused on improving the image quality and detection capabilities of our aerial drones however I did work on the ZeroMQ pipeline to facilitate efficient communication between all systems on the JellyfishV2. My work on an autoencoding denoiser and YOLOv8 transfer learning directly contributed to our 2nd place victory at the AEAC competition.",
    bullets: [
      "Achieved [[red:exp-second:2.5|2nd place]] out of over 40 teams at the Aerial Evolution Association of Canada (AEAC) in 2025, demonstrating strong performance against top Canadian universities",
      "Developed an autoencoding denoiser based on the RRDBNet architecture using the GAN framework which enhanced image quality for the DL/CV model below",
      "Applied transfer learning to the YOLOv8 object detection model to seclude IR emission in a live setting, improving detection accuracy by an estimate [[red:exp-perc:2.5|27%]]",
    ],
    gallery: [
        "/images/thumbnails/arrc.png",
        "/images/arrc2.mp4",
        "/images/arrc1.png",
        "/images/arrc.jpeg",
    ],
    skills: ["Computer Vision", "PyTorch", "YOLOv8", "Deep Learning", "GANs", "Python", "ZeroMQ"],
    links: [
      { url: "https://ubcoaerospace.ca/", type: 'website', label: 'Team Website' },
      { url: "https://github.com/UBCO-Aerospace-Club", type: 'github', label: 'Team GitHub' },
    ],
    extendingImages: [
        "/images/arrc1.png",
        "/images/arrc.jpeg",
    ],
    thumbnail: "/images/thumbnails/arrc.png"
  },
];

const EDUCATION: Experience[] = [
  {
    id: "ubc-bs",
    role: "University of British Columbia (UBC)",
    company: "Bachelor of Science in Computer Science",
    dates: "Sep 2024 – Apr 2028",
    badge: "/logo/ubclogo.png",
    location: "Vancouver, BC",
    description: "Pursuing a comprehensive curriculum in Computer Science, with specialized focus on machine learning, systems architecture, and algorithmic theory.",
    bullets: [
      "Relevant Coursework: Machine Learning, Data Structures & Algorithms (Intro & Intermediate), Computer Systems, Computer Hardware and Operating Systems, Linear Algebra (Honours), Discrete Mathematics"
    ],
    skills: ["Machine Learning", "Data Structures", "Algorithms", "Computer Systems", "Linear Algebra"],
    thumbnail: "/images/thumbnails/ubc.png" 
  }
];

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState("work");
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  // Filter experiences based on tab
  const items = activeTab === "work" ? EXPERIENCES : EDUCATION;

  return (
    <Section id="experience">
      <Panel
        title="Experience"
        rightSlot={
          <div className="flex gap-2">
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
        }
      >
        <div className="mx-auto max-w-5xl">
            {items.length > 0 ? (
                <div className="flex flex-col gap-8 md:gap-12 px-4">
                  {items.map((item, index) => (
                     <div key={item.id} className="w-full">
                       <ExperienceCard 
                          experience={item} 
                          index={index}
                          onClick={() => setSelectedExperience(item)}
                       />
                     </div>
                  ))}
                </div>
            ) : (
                <div className="flex h-40 md:h-48 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5">
                   <p className="text-muted-foreground">Education history coming soon...</p>
                </div>
            )}
        </div>
      </Panel>

      <ExperienceModal 
        experience={selectedExperience} 
        onClose={() => setSelectedExperience(null)} 
      />
    </Section>
  );
}
