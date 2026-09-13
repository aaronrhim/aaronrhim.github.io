/**
 * Core portfolio facts. Extended write-ups live in project-notes.ts and HmiStudy.tsx.
 *
 * FACT DISCIPLINE - carried over from the UBC Rover site, which is the reason
 * its copy reads like a team wrote it rather than a copywriter:
 *
 *   Anything presented as a statement about Aaron must come from the resume
 *   (~/Downloads/jobs/AaronsResume.pdf), from prose he wrote himself, or from
 *   a repository that can be opened and checked. Where a number is claimed it
 *   is a number he measured. Do not quietly replace a value here with a
 *   plausible-sounding invention - an unverifiable claim on a portfolio is a
 *   claim someone will ask about in an interview.
 *
 * VOICE - three rules, all of them subtractive:
 *
 *   1. Numbers instead of adjectives. "9.8 cm mean joint error" does the work
 *      that "highly accurate" only gestures at, and it survives scrutiny.
 *   2. A spaced hyphen in rendered copy, never an em dash. Em dashes belong in
 *      source comments like this one. It is the cheapest single edit that
 *      removes the machine cadence from a paragraph.
 *   3. No "passionate", "innovative", "cutting-edge", "seamless", "leveraging",
 *      "journey", and no "Whether you are X or Y" construction.
 *
 * Deliberately NOT here: the phone number and street address that appear on
 * the resume. A resume is handed to a named recipient; a portfolio is indexed.
 * Email is contact enough.
 */

export const PROFILE = {
  name: "Aaron Rhim",
  /** One line. It goes under the name and has to survive being read first. */
  role: "Robotics and machine learning at UBC",
  location: "Vancouver, British Columbia",
  email: "rhimaaron@gmail.com",
  resume: "/AaronRhim-Resume.pdf",
  portrait: "/images/profile/me.jpg",
} as const;

export const LINKS = [
  { label: "GitHub", href: "https://github.com/aaronrhim" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aaronrhim" },
  { label: "Email", href: "mailto:rhimaaron@gmail.com" },
  { label: "Resume", href: "/AaronRhim-Resume.pdf" },
] as const;

/**
 * The masthead figures.
 *
 * Four, because five wrapped badly and three looked like an accident. Each one
 * is a measurement from the work below it, and each `note` names where it came
 * from so the number is checkable rather than decorative.
 */
export const FIGURES = [
  { value: "9.8", unit: "cm", note: "Mean joint error, half-body pose from egocentric video" },
  { value: "100", unit: "Hz", note: "Arm control loop after the CAN-FD rewrite, up from 10" },
  { value: "98.6", unit: "%", note: "Approach-to-Strike completion, 429/435 trials in MuJoCo" },
  { value: "2nd", unit: "/ 40+", note: "Aerial Evolution Association of Canada, 2025" },
] as const;

/** The home page's two paragraphs. Kept here so the page file stays layout. */
export const INTRO = [
  "I am in my third year at UBC, in the combined Computer Science, Mathematics and Physics major. Most of what I do is robotics: teaching arms to move, getting sensors to agree with each other, and building the interfaces people use to drive both.",
  "Right now I am building Eithelmir, where I work on recovering human pose from wearables people already own, and co-leading software on UBC Rover's Mars rover team.",
] as const;

/**
 * One image.
 *
 * `alt` is required, and it is per image rather than per gallery. An earlier
 * version passed a single string for a whole set, which meant four images on
 * the rover page all announced themselves as "UBC Rover" - technically alt
 * text, practically silence. Describe what is visible and specific: a reader
 * should be able to tell two images from the same project apart from their alt
 * text alone.
 */
export type Shot = { src: string; alt: string };

export type Link = {
  url: string;
  label: string;
  type: "website" | "github";
};

export type Role = {
  slug: string;
  org: string;
  title: string;
  dates: string;
  /** Present tense for current roles. Used for ordering and the "now" marker. */
  current: boolean;
  location: string;
  logo?: string;
  /**
   * Six or seven words. This is a label, not a summary - it says what the role
   * is, and the page behind it does the explaining. Longer versions read as
   * filler the moment three of them stack up in a list.
   */
  blurb: string;
  /** Sets the scene in two or three sentences. No bullet may repeat it. */
  summary: string;
  /** Each one leads with what changed and carries the number that proves it. */
  bullets: string[];
  stack: string[];
  links: Link[];
  /** Long-form, first person. Only where there is genuinely more to say. */
  sections?: { title: string; body: string; images?: Shot[] }[];
  images?: Shot[];
};

export const ROLES: Role[] = [
  {
    slug: "eithelmir",
    org: "Eithelmir",
    title: "Founder",
    dates: "May 2026 - Present",
    current: true,
    location: "Vancouver, BC",
    blurb: "Human motion capture from consumer wearables",
    summary:
      "Eithelmir is a marketplace for the human demonstration data that humanoid robots train on. Labs post a task they need recorded and fund it; people record it with the glasses, watch and phone they already own. I built the pose pipeline underneath it and the web infrastructure around it.",
    bullets: [
      "Built a multi-modal pipeline that predicts half-body pose from egocentric video and two wrist IMUs, reaching 9.8 cm mean joint error against multi-view RGB triangulation",
      "Designed a development interface for visualising 3D limb localisation and reconstruction, combining SMPL avatars, MANO hand rigs and controlled recording sessions",
      "Built and shipped app.eithelmir.com: the bounty board, the contributor wallet, and the upload API the iOS capture apps post to, along with the payment handling behind it",
    ],
    stack: [
      "Python",
      "PyTorch",
      "Sensor fusion",
      "SMPL",
      "MANO",
      "TypeScript",
      "React",
      "Supabase",
    ],
    links: [{ url: "https://app.eithelmir.com", type: "website", label: "app.eithelmir.com" }],
    sections: [
      {
        title: "Why wearables instead of a capture suit",
        body: "Motion capture that works already exists, and it lives in a room with markers on the walls and a suit you have to be fitted into. That constraint is the reason there is so little of this data: nobody can record someone folding laundry in their own kitchen if the recording requires a lab. Eithelmir's bet is that the sensors are already part of the outfit. A pair of Ray-Ban Meta glasses gives an egocentric camera at roughly eye height, and an IMU on each wrist tracks the hands through everything that camera cannot see. Neither is a motion capture rig on its own. The 9.8 cm figure is the answer to whether the pair is.",
      },
      {
        title: "Getting the clocks to agree",
        body: "The hard part turned out not to be the model, it was time. Independent consumer devices drift against each other over a session, and a pose estimate assembled from streams that disagree by 80 ms is worse than one built from video alone. The fix is deliberately low-tech. Every session opens with a clap, whose transient is sharp in both wrist accelerometers and loud in the audio track, so a single event lines every stream up to the frame.",
      },
      {
        title: "Marking what was measured and what was guessed",
        body: "A pose pipeline produces a number for every joint whether or not it had any evidence for that joint. If both hands leave the camera frame, the model still returns hand positions, and they still look plausible. That is the failure mode that makes a dataset worthless to a lab, because they cannot tell which frames to trust. So every field that ships carries a flag saying whether it was measured or inferred, and every contact event records whether it came from IMU alone or from IMU and video together. It makes the numbers look worse and the dataset actually usable.",
      },
    ],
  },
  {
    slug: "ubc-rover",
    org: "UBC Rover",
    title: "Software Co-Lead",
    dates: "Sep 2025 - Present",
    current: true,
    location: "University of British Columbia",
    logo: "/logo/roverlogo.png",
    blurb: "HMI and reinforcement learning for a Mars rover",
    summary:
      "I co-lead software on UBC Rover. My two main projects, which I fully own, are the human–machine interface and the reinforcement-learning pipeline for our 6-DOF arm. Around those, I build the controls, embedded systems, and software infrastructure that connect the operator to the rover.",
    bullets: [
      "Own the HMI project: a modular Qt operator interface with runtime plugins, dwindle panel management, saved layouts, and multi-monitor support",
      "Own the reinforcement-learning project: arm simulation, DAgger experiments, and residual RL on IK; recorded 429/435 Approach-to-Strike completions in MuJoCo across 87 keys with five trials each",
      "Progressed from IK control to IK-driven task completion, alongside embedded GNSS mapping and pathing",
      "Wrote the 100 Hz CAN-FD arm driver for Moteus controllers, tuned arm PID gains, and built a telemetry-driven digital twin",
      "Contributed Docker environments, source organisation, Morse-code tools, and the team website",
      "Traced a competition arm failure to a concentric error in a high-load motor, and helped design the CAD fix",
    ],
    stack: [
      "C++",
      "ROS 2",
      "MoveIt 2",
      "RViz2",
      "CAN-FD",
      "Moteus",
      "Python",
      "MuJoCo",
      "RoboSuite",
      "Qt",
    ],
    links: [
      { url: "https://www.ubcrover.com", type: "website", label: "Team site" },
      { url: "https://github.com/UBC-Snowbots/RoverFlake2", type: "github", label: "RoverFlake2" },
      { url: "https://github.com/UBC-Snowbots/LearnFlake", type: "github", label: "LearnFlake" },
    ],
    // Training images appear inside RlStudy; the trailing gallery shows the field rover.
    images: [
      {
        src: "/images/thumbnails/rover.jpg",
        alt: "Six-wheeled rover with its arm raised, parked on cracked badlands hardpan",
      },
    ],
  },
  {
    slug: "ubc-arrc",
    org: "UBC Aerial Robotics and Rocketry Club",
    title: "Computer Vision and Telemetry",
    dates: "Sep 2024 - Aug 2025",
    current: false,
    location: "University of British Columbia",
    logo: "/logo/arrc.png",
    blurb: "Detection and denoising for competition drones",
    summary:
      "ARRC builds autonomous aerial vehicles for the Aerial Evolution Association of Canada competition. I worked on the vision stack for the JellyfishV2 airframe, plus the ZeroMQ transport that carried messages between its onboard systems.",
    bullets: [
      "Placed 2nd of more than 40 teams at the Aerial Evolution Association of Canada, 2025",
      "Built an autoencoding denoiser on an RRDBNet backbone trained adversarially, feeding cleaner frames into the detection model downstream",
      "Applied transfer learning to YOLOv8 to isolate infrared emission in live flight, improving detection accuracy by an estimated 27%",
      "Worked on the ZeroMQ messaging pipeline connecting the airframe's onboard systems",
    ],
    stack: ["Python", "PyTorch", "YOLOv8", "GANs", "OpenCV", "ZeroMQ"],
    links: [{ url: "https://ubcoaerospace.ca/", type: "website", label: "Team site" }],
    sections: [
      {
        title: "Cleaning the frame before detecting anything",
        body: "A detector is only ever as good as the frames handed to it, and ours came off a camera bolted to a vibrating airframe in whatever light the day provided. So before touching the detector I put a denoiser in front of it: an autoencoder on an RRDBNet backbone, trained adversarially rather than on reconstruction loss alone. That distinction is the whole point. Optimising for pixel distance gets you a frame that scores well and looks smeared, because the cheapest way to be close to the truth everywhere is to blur; the adversarial term pushes the output toward frames that look real, which is what preserves the edges the detector downstream is actually keying on.",
      },
      {
        title: "Finding heat instead of shapes",
        body: "The target emits in infrared, so the useful signal is not an outline that a model pretrained on everyday photographs has ever been rewarded for noticing. Training from scratch was not an option with the amount of labelled flight footage we had, so I took YOLOv8 and applied transfer learning to move it onto the emission rather than the silhouette. That put detection roughly 27% higher. It is worth being precise about what that number is: it is measured against our own competition footage, not a public benchmark, and the test set is small enough that I would call it an estimate rather than a result.",
      },
    ],
    images: [
      {
        src: "/images/thumbnails/arrc.jpg",
        alt: "Orange-topped hexacopter hovering, lowering a sampling tube toward a barrel",
      },
      {
        src: "/images/arrc-field.jpg",
        alt: "Four students in UBC Engineering gear assembling the hexacopter in snow",
      },
      {
        src: "/images/arrc1.png",
        alt: "Flight plan over the competition site with boundary polygon and landing marker",
      },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  year: string;
  /** One sentence describing the project for the index. */
  blurb: string;
  /** Two or three sentences of what it is and what was hard. */
  body: string;
  award?: string;
  stack: string[];
  links: Link[];
  cover?: string;
  images?: Shot[];
  /** Available for curated project selections. */
  featured: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "render-engine",
    title: "3D Rendering Engine",
    year: "2025",
    blurb:
      "A Java renderer built from the linear algebra up, with interactive gradient-descent visualisations.",
    body: "I wanted to understand the math behind a 3D renderer by building one. This Java project grew into a way to visualise scalar fields, neural networks, and gradient descent without a graphics library underneath.",
    stack: ["Java", "Multithreading", "Linear algebra"],
    links: [
      {
        url: "https://github.com/aaronrhim/CPSC210-Final-Project",
        type: "github",
        label: "Source",
      },
    ],
    cover: "/images/thumbnails/3dengine.png",
    images: [
      {
        src: "/images/cpsc210.png",
        alt: "Scalar field editor showing x^2 + y^2 as a paraboloid with gradient descent vectors",
      },
    ],
    featured: true,
  },
  {
    slug: "job-finder",
    title: "An actually good job finder",
    year: "2026",
    blurb:
      "Internship alerts from company careers pages, plus a calendar of predicted opening dates.",
    body: "A tool for keeping up with internships at companies you actually want to work for. It watches saved careers pages for new listings and uses posting history to estimate when the next opportunities might open.",
    stack: ["Web", "RNNs", "Python"],
    links: [{ url: "https://github.com/aaronrhim", type: "github", label: "GitHub" }],
    featured: true,
  },
  {
    slug: "vennu",
    title: "Vennu",
    year: "2026",
    award: "Kickstart, 3rd place",
    blurb: "Browser agents that turn multi-step venue booking flows into searchable availability.",
    body: "We built Vennu to bring venue availability into one searchable place, even when the booking sites had no API. The project placed third at Kickstart.",
    stack: ["n8n", "Playwright", "OpenAI API", "Supabase", "Node.js"],
    links: [],
    /* Deliberately the n8n workflow, not the laptop mockup that used to sit
       here. That mockup was an AI-generated stock photograph of a product
       called "Connections", complete with a generated-image sparkle watermark
       in the corner - a picture of something that does not exist standing in
       for something that does. The workflow graph is the actual system. */
    cover: "/images/connectionsworkflow.png",
    images: [],
    featured: true,
  },
  {
    slug: "remember-me",
    title: "Remember Me",
    year: "2026",
    award: "StormHacks, Best Hardware",
    blurb: "A glasses-mounted camera that recognises familiar faces and speaks their names.",
    body: "A hackathon prototype to help someone recognise the people around them: a camera on their glasses identifies familiar faces and speaks a name and relationship. We won Best Hardware at StormHacks.",
    stack: ["React Native", "Expo", "AWS Rekognition", "ElevenLabs", "DynamoDB", "Firebase"],
    links: [
      { url: "https://www.youtube.com/watch?v=H-2SR8Qk0QQ", type: "website", label: "Demo" },
      { url: "https://github.com/LeCruitUsPls/AlzheimerCamera", type: "github", label: "Source" },
    ],
    cover: "/images/thumbnails/rememberme.png",
    /* Two of the three images that used to be here carried the same
       AI-generation watermark as the cover that was removed. */
    images: [
      {
        src: "/images/rememberme1.png",
        alt: "Architecture diagram linking the React Native app, Flask backend and AWS Rekognition",
      },
    ],
    featured: true,
  },
  {
    slug: "get-swole",
    title: "Get Swole",
    year: "2024",
    award: "CS6 Hacks, Best Solo Hacker",
    blurb: "A webcam-based form checker that tracks body landmarks and counts repetitions.",
    body: "My first hackathon, built solo: a webcam-based form checker for weight training. It tracks repetitions and returns feedback while you’re lifting. The project won Best Solo Hacker at CS6 Hacks.",
    stack: ["MediaPipe", "Python", "FastAPI", "React"],
    links: [{ url: "https://github.com/aaronrhim/HackathonCS6", type: "github", label: "Source" }],
    cover: "/images/thumbnails/get-swole.jpg",
    images: [
      {
        src: "/images/getswole3.png",
        alt: "Deadlift landmark modal tracking a webcam pose, confidence 1.00",
      },
      {
        src: "/images/getswole1.png",
        alt: "Personal Gym Visualizer landing page with a Go to Models button",
      },
    ],
    featured: false,
  },
  {
    slug: "fact",
    title: "F.A.C.T",
    year: "2025",
    blurb:
      "An augmented reality fabric preview, with pose tracking and adjustable pattern mapping.",
    body: "An augmented reality fabric try-on built with three others from UBC’s Aerial Robotics and Rocketry Club. We used a webcam and body tracking to let someone preview a pattern on themselves.",
    stack: ["Python", "Flask", "OpenCV", "MediaPipe", "SocketIO"],
    links: [
      { url: "https://www.youtube.com/watch?v=SJ7GUdQnaD4", type: "website", label: "Demo" },
      { url: "https://github.com/aaronrhim/F.A.C.T", type: "github", label: "Source" },
    ],
    cover: "/images/thumbnails/fact.jpg",
    images: [
      {
        src: "/images/fact1.png",
        alt: "Pink F.A.C.T landing page with Custom Design and Try On buttons",
      },
      {
        src: "/images/fact2.png",
        alt: "Cartoon wardrobe screen with a dress form and pattern tiling sliders",
      },
    ],
    featured: false,
  },
  {
    slug: "granny-ai",
    title: "Granny AI",
    year: "2026",
    blurb:
      "A voice-controlled desktop agent, rebuilt around browser automation after mouse control proved unreliable.",
    body: "A voice-controlled desktop agent for people who find computers difficult to use. You describe what you want, and the app interprets the request and carries out the navigation.",
    stack: ["Electron", "Gemini API", "ElevenLabs", "Playwright", "React", "TypeScript"],
    links: [
      { url: "https://github.com/Alhwyn/nw-hacks-sub", type: "github", label: "Source" },
      { url: "https://www.youtube.com/watch?v=0IL0ZjVr7gI", type: "website", label: "Demo" },
    ],
    cover: "/images/thumbnails/grandbuddy.png",
    images: [
      {
        src: "/images/granny1.png",
        alt: "Slide listing three usability problems beside an illustrated older woman at a computer",
      },
      {
        src: "/images/granny3.png",
        alt: "Slide introducing GrandBuddy AI with four feature cards including voice chat",
      },
    ],
    featured: false,
  },
  {
    slug: "lecruiter",
    title: "LeCruiter AI",
    year: "2025",
    blurb: "An interview-practice tool that gives feedback on both answer content and delivery.",
    body: "An interview-practice tool we built at an AWS hackathon. It generates contextual questions and returns feedback on what you said and how you delivered it.",
    stack: ["React", "AWS Bedrock", "Python", "FastAPI"],
    links: [
      {
        url: "https://github.com/R0yZh3ng/CIC-GenAI-Hackathon",
        type: "github",
        label: "Source",
      },
    ],
    cover: "/images/thumbnails/lecruiter.png",
    images: [
      {
        src: "/images/lecruiter1.png",
        alt: "Behavioural question prompt about a difficult teammate, with a Start Recording button",
      },
      {
        src: "/images/lecruiter2.png",
        alt: "Binary tree traversal problem beside an empty C++ solution editor",
      },
    ],
    featured: false,
  },
];

export const EDUCATION = {
  school: "University of British Columbia",
  degree: "Combined Major in Computer Science, Mathematics and Physics",
  dates: "Sep 2024 - Apr 2028",
  location: "Vancouver, BC",
  coursework: [
    "Machine Learning",
    "Data Structures and Algorithms",
    "Computer Systems",
    "Computer Hardware and Operating Systems",
    "Linear Algebra (Honours)",
    "Discrete Mathematics",
  ],
};

export const AWARDS = [
  { what: "Top 10% of applicants", where: "Y Combinator", when: "F26" },
  { what: "Best Solo Hacker", where: "CS6 Hacks", when: "2025" },
  { what: "3rd place", where: "Kickstart", when: "2026" },
  { what: "Best Hardware", where: "StormHacks", when: "2026" },
];

export const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "Java", "C++", "C", "JavaScript", "TypeScript", "HTML/CSS", "Assembly (Y86)"],
  },
  {
    group: "Robotics",
    items: ["ROS 2", "MoveIt 2", "RViz2", "MuJoCo", "RoboSuite", "CAN-FD", "Moteus", "Fusion 360"],
  },
  {
    group: "Machine learning",
    items: ["PyTorch", "TensorFlow", "YOLOv8", "MediaPipe", "SMPL", "GANs"],
  },
  {
    group: "Web and infrastructure",
    items: ["React", "Next.js", "Node.js", "Flask", "FastAPI", "PostgreSQL", "Supabase", "Docker"],
  },
  {
    group: "Platforms",
    items: ["Git", "Linux (Arch, Ubuntu)", "AWS (EC2, S3, DynamoDB, Bedrock)"],
  },
];

export const NAV = [
  { label: "Experience", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "About & CV", href: "/cv" },
];
