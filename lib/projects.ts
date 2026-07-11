// types: website, github
export const PROJECTS = [
  {
    id: "vennu",
    title: "Vennu",
    achievements: "Hackathon Award Winner",
    description: "An autonomous agent that scrapes live booking availability from venue websites that don't expose a public API.",
    longDescription: "Vennu is an agentic web-scraping tool I built at a hackathon to solve a simple but stubborn problem: most venues publish their booking availability only on their own sites, with no public API to query against. Vennu automates that lookup end to end. Orchestrated on n8n cloud, it runs threaded, multi-step agents that drive a headless Playwright browser through each venue's booking flow, then hand the raw page content to the OpenAI API to turn messy, unstructured listings into clean, structured availability. Normalized results are persisted to Supabase so they can be queried instantly instead of re-scraped on every request.",
    features: [
      "Threaded, multi-step scraping agents orchestrated on n8n cloud",
      "Headless browser automation with Playwright to navigate venue booking pages",
      "LLM-powered parsing via the OpenAI API to extract structured bookings from unstructured pages",
      "Hybrid pipeline combining direct API calls with web scraping per venue source",
      "Normalized availability persisted to Supabase for fast, repeatable lookups",
    ],
    image: "/images/thumbnails/connectionsthumbnail.png",
    tags: ["n8n", "Playwright", "OpenAI API", "Supabase", "Node.js", "Google API"],
    links: [],
    highlight: true,
    gallery: [
      "/images/connectionsworkflow.png",
      "/images/connectionsteam.jpeg",
      "/images/kickstart.png",
    ],
    extendingImages: [
      "/images/connectionsworkflow.png",
      "/images/connectionsteam.jpeg",
    ],
  },
  {
    id: "engine",
    title: "3D Simulation Engine",
    description: "A from-scratch physics engine in Java for visualizing scalar fields and ML algorithms in 3D.",
    longDescription: "A physics engine built entirely from scratch in Java, designed to simulate scalar fields and visualize machine learning algorithms in three-dimensional space. Users can input scalar fields (functions of x and y mapped to z) and watch ML algorithms such as gradient descent and K-Nearest Neighbors render in real time. The project incorporates a custom camera controller informed by multivariable calculus (MATH 200) and leverages multithreading for concurrent rendering, drawing on concepts from computer hardware and operating systems (CPSC 313).",
    features: [
      "Custom physics simulation from scratch",
      "Software-based rasterization and rendering pipeline",
      "Interactive 3D visualization of gradient descent",
      "K-Nearest Neighbors spatial visualization",
      "Multithreaded rendering with custom camera controls",
    ],
    image: "/images/thumbnails/3dengine.png",
    tags: ["Java"],
    links: [
        {
            url: "https://github.com/aaronrhim/CPSC210-Final-Project",
            type: "github",
            label: "Source Code"
        },
    ],
    highlight: true,
    gallery: [
      "/images/cpsc210.png"
    ],
    extendingImages: [
      "/images/cpsc210.png"
    ],
  },
  {
    id: "rememberme",
    title: "Remember Me",
    description: "An attachable AI-powered camera that helps Alzheimer's patients recognize and remember their loved ones.",
    longDescription: "Remember Me is a wearable memory aid designed for Alzheimer's patients. The device attaches to a pair of glasses and continuously captures the wearer's surroundings. When a recognized individual approaches, the system announces their name and relationship context through a built-in speaker. The backend leverages AWS Rekognition for real-time facial recognition, ElevenLabs for natural-sounding text-to-speech, and OpenAI's API for summarizing and contextualizing stored memories. Family members configure the device through a cross-platform mobile app built with Expo and React Native, backed by Firebase and DynamoDB for persistent storage.",
    features: [
      "Real-time facial recognition via AWS Rekognition",
      "Natural text-to-speech announcements with ElevenLabs",
      "Memory summarization and contextualization using the OpenAI API",
      "Cross-platform companion app built with Expo and React Native",
      "Cloud storage with Firebase, AWS S3, and DynamoDB",
    ],
    image: "/images/thumbnails/rememberme.png",
    tags: ["ExpoGo", "React Native", "Firebase", "ElevenLabs", "OpenAI API", "AWS Rekognition", "AWS S3", "DynamoDB"],
    links: [
        {
            url: "https://www.youtube.com/watch?v=H-2SR8Qk0QQ&t=3s",
            type: "website",
            label: "Live Demo"
        },
        {
            url: "https://github.com/LeCruitUsPls/AlzheimerCamera",
            type: "github",
            label: "Source Code"
        },
    ],
    highlight: true,
    gallery: [
      "/images/rememberme3.png",
      "/images/rememberme1.png",
      "/images/rememberme2.png"
    ],
    extendingImages: [
      "/images/rememberme1.png",
      "/images/rememberme2.png"
    ],
  },
  {
    id: "grannyai",
    title: "Granny AI",
    description: "An AI-powered desktop agent that helps elderly users navigate their computer through voice commands.",
    longDescription: "Granny AI is an Electron-based desktop application that enables elderly users to operate their computers through natural voice interaction. The system combines ElevenLabs for speech synthesis and Gemini for intent understanding and action planning. Initially built with full mouse control capabilities, the architecture was refined to use Playwright for web navigation and application launching, improving reliability and expanding the range of supported interactions. The result is a voice-first interface that bridges the gap between complex desktop software and users who may not be comfortable with traditional input methods.",
    features: [
      "Agentic workflow powered by ElevenLabs and Gemini",
      "Cross-platform Electron desktop application",
      "Automated web navigation via Playwright",
      "Natural voice interaction with text-to-speech feedback",
      "Real-time communication via SocketIO",
    ],
    image: "/images/thumbnails/grandbuddy.png",
    tags: ["Gemini API", "ElevenLabs", "Playwright", "Electron", "React", "Bun", "TypeScript", "Vercel", "SocketIO"],
    links: [
        {
            url: "https://github.com/Alhwyn/nw-hacks-sub",
            type: "github",
            label: "Source Code"
        },
        {
          url: "https://www.youtube.com/watch?v=0IL0ZjVr7gI",
          type: "website",
          label: "Live Demo"
        }
    ],
    highlight: false,
    gallery: [
      "/images/granny1.png",
      "/images/granny2.png",
      "/images/granny3.png"
    ],
    extendingImages: [
      "/images/granny1.png",
      "/images/granny2.png"
    ],
  },
  {
    id: "lecruiter",
    title: "LeCruiter AI",
    achievements: "Hackathon Award Winner",
    description: "AI-driven interview preparation platform with generative prompts, real-time feedback, and automated scoring.",
    longDescription: "LeCruiter AI is a full-stack platform designed to help candidates prepare for both behavioral and technical interviews. Built at an AWS-hosted hackathon, the application uses AWS Bedrock to generate contextual interview questions, analyze candidate responses in real time, and provide actionable feedback with automated scoring. The platform also includes tone and sentiment analysis to evaluate delivery alongside content quality. A FastAPI backend powers a React and TypeScript frontend, creating a responsive and intuitive practice environment.",
    features: [
      "Generative interview prompts via AWS Bedrock",
      "Real-time tone and sentiment analysis on voice responses",
      "Automated scoring engine with detailed feedback",
      "FastAPI backend with RESTful service architecture",
      "Responsive React frontend with TypeScript",
    ],
    image: "/images/thumbnails/lecruiter.png",
    tags: ["React", "TailwindCSS", "AWS Bedrock", "Python", "FastAPI"],
    links: [
        {
            url: "https://github.com/R0yZh3ng/CIC-GenAI-Hackathon",
            type: "github",
            label: "Source Code"
        },
    ],
    highlight: false,
    gallery: [
      "/images/lecruiter.png",
      "/images/lecruiter1.png",
      "/images/lecruiter2.png",
      "/images/lecruiter3.png"
    ],
    extendingImages: [
      "/images/lecruiter.png",
      "/images/lecruiter1.png"
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "A personal portfolio featuring gamified engagement, server-side rendering, and smooth animations.",
    longDescription: "This portfolio website was designed to showcase projects and experiences while reflecting a bit of personality through interactive design. Its standout feature is a gamified currency system that rewards visitors for exploring different sections of the site. It's built with Next.js for server-side rendering and optimized performance, Supabase for client-side data persistence, and Framer Motion for fluid page transitions and micro-interactions. The architecture follows RESTful conventions, with a clean separation between the presentation and data layers.",
    features: [
      "Gamified currency system to incentivize exploration",
      "Server-side rendering with Next.js",
      "Client-side persistence via Supabase",
      "Fluid animations and transitions with Framer Motion",
      "RESTful API architecture",
    ],
    image: "/images/thumbnails/websitethumbnail.png",
    tags: ["React", "TailwindCSS", "Next.js", "Framer Motion", "TypeScript", "Supabase", "Prettier"],
    links: [
        {
            url: "https://aaronrhim.github.io",
            type: "website",
            label: "Live Site"
        },
        {
            url: "https://github.com/aaronrhim/aaronrhim.github.io",
            type: "github",
            label: "Source Code"
        },
    ],
    highlight: false,
    gallery: [
      "/images/thumbnails/websitethumbnail.png",
      "/images/portfolio1.png",
    ],
    extendingImages: [
      "/images/thumbnails/websitethumbnail.png",
      "/images/portfolio1.png"
    ],
  },
  {
    id: "aigymtrainer",
    title: "Get Swole",
    description: "Real-time AI workout coach that analyzes exercise form using computer vision and provides instant feedback.",
    longDescription: "Get Swole is a real-time workout form analyzer I built as a solo project at my first hackathon. The application uses MediaPipe for pose estimation to track body positioning during exercises, paired with a custom machine learning model that verifies repetition quality and counts reps. The full-stack architecture connects a FastAPI backend that handles computer vision processing with a React frontend that delivers immediate visual feedback on form corrections. The project earned 3rd place overall, along with awards for Best Solo Hack and Best First Hack.",
    achievements: "3rd Place Overall | Best Solo Hack | Best First Hack",
    features: [
      "Real-time pose estimation via MediaPipe",
      "Custom ML model for repetition counting and verification",
      "Full-stack architecture with FastAPI and React",
      "Instant visual feedback on exercise form",
      "Low-latency video processing pipeline",
    ],
    image: "/images/thumbnails/get-swole.png",
    tags: ["MediaPipe", "Python", "FastAPI", "React", "Next.js", "Machine Learning"],
    links: [
        {
            url: "https://github.com/aaronrhim/HackathonCS6",
            type: "github",
            label: "Source Code"
        },
    ],
    highlight: false,
    gallery: [
      "/images/getswole1.png",
      "/images/getswole2.png",
      "/images/getswole3.png",
      "/images/getswole4.png"
    ],
    extendingImages: [
      "/images/getswole1.png",
      "/images/getswole2.png"
    ],
  },
  {
    id: "fact",
    title: "F.A.C.T",
    description: "AR-powered virtual try-on platform for visualizing fabric patterns and clothing designs in real time.",
    longDescription: "F.A.C.T (Felix, Aaron, Charlotte, Tyra) is an augmented reality virtual try-on platform built by a cross-disciplinary team of computer science and engineering students from UBC's Aerial Robotics and Rocketry Club. The application uses MediaPipe for real-time body pose estimation and OpenCV for dynamic fabric pattern overlay, letting users visualize how different materials and designs would look on their body. A Flask-based web interface with SocketIO provides low-latency video streaming and interaction. The system automatically handles pattern scaling, tiling, and positioning to create a realistic preview of garments.",
    features: [
      "Real-time AR clothing overlay using MediaPipe pose estimation",
      "Dynamic fabric pattern swapping and tiling with OpenCV",
      "Interactive pattern catalog with live preview",
      "Low-latency web interface via Flask and SocketIO",
      "Automated pattern scaling and body-aware positioning",
    ],
    image: "/images/thumbnails/factthumbnail.png",
    tags: ["Python", "Flask", "OpenCV", "MediaPipe", "NumPy", "SocketIO", "JavaScript", "BeautifulSoup"],
    links: [
        {
            url: "https://www.youtube.com/watch?v=SJ7GUdQnaD4",
            type: "website",
            label: "Live Demo"
        },
        {
            url: "https://github.com/aaronrhim/F.A.C.T",
            type: "github",
            label: "Source Code"
        },
    ],
    highlight: false,
    gallery: [
      "/images/fact.png",
      "/images/fact1.png",
      "/images/fact2.png",
      "/images/fact3.png"
    ],
    extendingImages: [
      "/images/fact2.png",
      "/images/fact3.png"
    ],
  },
];
