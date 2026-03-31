import { Experience } from "@/components/experiences/ExperienceCard";

export const EXPERIENCES: Experience[] = [
  {
    id: "ubc-rover",
    role: "Software Co-Lead - AI Autonomy",
    company: "UBC Rover",
    dates: "Sep. 2025 – Present",
    badge: "/logo/roverlogo.png",
    location: "University of British Columbia",
    description: "Leading the development of autonomy software tailored for Mars rover simulations and competitions.",
    longDescription: "I am the Integration Lead and Software co-lead for UBC Rover, a ~40-member multi-disciplinary team. Our mission is to build a fully autonomous rover capable of traversing rough terrain and perform dexterous tasks such as typing on a keyboard (RL autonomy direct relation). I've contributed largely to the overall codebase, including the implementation of an end-to-end Reinforcement Learning pipeline, the integration of new hardware such as new Moteus drivers and a CAN-FD bus, as well as custom inverse kinematics functions, and now currently, a complete and modular rebuild of the team's Human-Machine Interface. It was only due to the help of all my amazing teammates, most particularly Rowan Zawadzki, our principle Software Lead (and easily the most influencial member of the team), that I was able to learn so much in such a short period of time. My enthusiasm for aerospace and robotics has been greatly amplified by this experience and I can't wait to see what we accomplish in the next year as we prepare for the University Rover Challenge (URC) and the Canadian International Rover Competition (CIRC) in 2026!",
    bullets: [
      "Designed and implemented an end-to-end Reinforcement Learning pipeline using Mujoco and RoboSuite",
      "Rewrote and upgraded the old arm hardware interface from using UART communication protocols to using the new CAN-FD bus control and new Moteus drivers, improving the arm control loop frequency from 10Hz to 100Hz and enabling 64-bytes of data to be sent on the dataframe",
      "Implemented custom, singularity-aware, inverse kinematics functions using inverse Jacobian matrix transformations for the 6-DOF arm, improving the arm maneuverability and precision in all joint orientations",
      "Rewrote the full Human-Machine Interface (HMI) across the whole codebase to be modular, extensible, and more intuitive to use for the drivers, which has been praised by all team members and has made the HMI development process much more efficient for future iterations",
    ],
    sections: [
      {
        title: "Reinforcement Learning (1)",
        body: "Initially, I designed and customized Rover's new 6DOF manipulator to use the Mujoco-compatible MJCF file format. Due to the nature of using a completely custom manipulator, this involved learning a completely new tech stack (Mujoco, RoboSuite, URDF/XML) and modeling my own collision geometries, visual geometries, and kinematic chains for motors that can't be represented one-to-one in simulation. After lots of testing, I then implemented a basic Soft-Actor Critic (SAC) algorithm to perform a simple task of reaching and lifting a block. As I grew accustomed to the training pipeline -- configuring the environment, tinkering with the reward functions, and debubgging Mujoco errors -- I was soon able to move onto the actual task at hand: type a string of characters on a physical keyboard. Using the Heirarchical Reinforcement Learning framework, I implemented a high-level policy that could piece together multiple low-level skills (reaching, hovering, pressing) to perform the task -- each skill trained as a separate policy with their own reward functions. When I eventually reached a 94% success rate (as shown in the picture on the right), I was able to implement domain randomization which is the process of randomizing the whole environment (keyboard position, arm initial orientation, etc.). While this resulted in around a 32% accuracy, simply being able to learn how to conduct reinforcement learning in the context of robotics was extremely rewarding in itself and I eventually grew an interest to explore the rest of the robot.",
        images: [
          "/images/rover1.png",
          "/images/rover3.mp4",
          "/images/rover4.mp4",
          "/images/rover5.mp4",
          "/images/rover6.png",
          "/images/rover7.png",
          "/images/rover8.png",
          "/images/rover9.mp4",
        ],
      },
      {
        title: "Inverse Kinematics (2)",
        body: "I eventually moved on to creating the IK-driven controller for the new arm. To prepare for this new feature, I first had to understand most of how the ROS2 control system worked, along with its subsequent libraries such as MoveIt2 and even further, MoveIt2 Servo (ROS's universal IK control library). UBC Rover already had MoveIt2 setup for the old arm so after navigating the old code into a new ROS2 package, I found that MoveIt2 Servo's IK solver was not very optimized to completely custom manipulators and ran into multiple packet loss problems and jitter (even in simulation). So, I implemented my own IK solver using my own inverse Jacobian matrix transformations and operational space control, which has been much more efficient and precise than MoveIt2 Servo. This also involved implementing singularity-aware control, which basically means that when the arm reaches a singularity (a position in which the arm loses a degree of freedom and thus, the Jacobian matrix becomes non-invertible), the controller can detect this and switch to a forward kinematics control mode so the operator can move the arm out of singularity. This has been a very useful feature for the drivers and has improved the arm maneuverability and precision in all joint orientations, which is crucial for the arm to be able to perform dexterous tasks such as chopping food with a knife and overall cooking tasks.",
        images: [



        ],
      },
      {
        title: "Arm Hardware Interface (3)",
        body: "After attending a Tesla Optimus event and hearing of some of the most sought-after engineering specializations in the industry, I was inspired to learn more about low-level control, firmware, and hardware interfaces. While I initially only refactored the old arm hardware interface that was written for UBC Rover's old arm, I took it upon myself to rewrite the whole thing from scratch to understand it ground up. The old code used some hacky techniques to parse UART query frames and had serial control for the old stepper motors. I rewrote the whole package to use the new CAN-FD bus effectively which, when combined with the new Moteus drivers, allows much more cohesive data querying from the motor encoders with a much reduced overhead. Due to the 64-byte CAN frames, I was able to configure the interface to retrieve over 30 motor parameters in a single query.",
        images: [

        ],
      },
      {
        title: "Human-Machine Interface (4)",
        body: "Unsatisfied with the old HMI -- being written with Glade (a UI-based editting software for GTK) and hearing of constant complaints regarding modularity and adding to the old HMI, I took it this chance to learn about each and every sub-team's task in detail by implementing a full redesign of the HMI. With the assistance of Claude Code, I could easily reimagine what a QT-based HMI would look like. I modularized it to contain a selection feature in which the user can choose \"modules\" to be displayed in a dashboard-like interface. I also manually integrated Hyprland's Dwindle algorithm for panel management, making the UI overall very aesthetic and easy-to-use. Using very specific prompting techniques, I future-proofs the HMI so that it is not only easy to add to but also follows a strict set of Github actions workflows to prevent any breaking the core UI to the HMI which I can foresee myself constantly maintaining over the next many years to come.",
        images: [

        ],
      },
    ],
    gallery: [
      "/images/thumbnails/rover.png",
      "/images/rover2.jpeg",
    ],
    extendingImages: [
      "/images/rover1.png",
      "/images/rover2.jpeg",
      "/images/rover6.png",
      "/images/rover7.png",
    ],
    thumbnail: "/images/thumbnails/rover.png",
    skills: ["Docker", "Python", "ROS2", "Reinforcement Learning", "Team Leadership", "Mujoco", "Robosuite", "Git", "Fusion360", "XML/URDF"],
    links: [
      { url: "https://ubcrover.com", type: 'website', label: 'Team Website' },
      { url: "https://github.com/UBC-Snowbots/RoverFlake2", type: 'github', label: 'Team GitHub' },
      { url: "https://github.com/UBC-Snowbots/LearnFlake", type: 'github', label: 'RL Autonomy GitHub' },
    ]
  },
  {
    id: "vennu",
    role: "Startup Founder & CTO",
    company: "Vennu",
    dates: "Dec. 2025 – Present",
    badge: "/logo/conlogo.png",
    location: "Vancouver, BC",
    description: "Co-Founded an agentic learning platform enabling talented individuals to easily monetize their skills.",
    longDescription: "Vennu initially formed in a hackathon in which each of us were completely oblivious to the future as well as each other. Yet, we somehow found a shared level of ambition and formed our startup called Vennu--a platform that enables talented individuals to easily monetize their skills through a unique approach of fostering community. I currently hold the role as the CTO and Co-Founder of Vennu but really, my role involved everything from architectural decisions on the n8n cloud to pitching specifically to angel investors. Our tight chemistry, organizational planning, and documentation by our brilliant (yet blind!) leader, Jugaad Singh, has allowed Vennu to become what it is. ",
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
      "/images/connectionsworkflow.png",
    ],
    thumbnail: "/images/thumbnails/connectionsthumbnail.png",
    skills: ["n8n", "Node.js", "Vercel", "Render", "Supabase", "OpenAI API", "Playwright API", "Google API", "Venture Capital", "Product Management"],
    links: [
      { url: "https://www.connectionsforcommunity.org", type: 'website', label: 'Company Site' }
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
      "/images/arrc.jpg",
    ],
    thumbnail: "/images/thumbnails/arrc.png"
  },
];

export const EDUCATION: Experience[] = [
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

// Current work = Rover + Vennu (for home page section)
export const CURRENT_WORK: Experience[] = EXPERIENCES.filter(
  (e) => e.id === "ubc-rover" || e.id === "vennu"
);
