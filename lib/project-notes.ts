/** Expanded from the existing project descriptions; no new performance claims. */
export type ProjectNote = { title: string; body: string };
export const PROJECT_NOTES: Record<string, ProjectNote[]> = {
  "render-engine": [
    {
      title: "Starting with the math",
      body: "I built this in Java to work through what happens between a 3D point and a pixel on the screen. Object transformations, projection, and camera movement are implemented directly, without a graphics library doing the linear algebra underneath. That makes the renderer a useful place to experiment: changing a transformation means seeing its effect immediately.",
    },
    {
      title: "Watching gradient descent",
      body: "On top of the renderer, I added neural-network visualisations and a scalar-field editor. A loss curve shows whether optimisation is improving; the 3D view shows where the model is moving on the surface. The gradient-descent demo connects the update rule to a direction you can actually see.",
    },
    {
      title: "Rendering across threads",
      body: "Rendering runs across multiple threads, and this was where most of my debugging time went. The project brought linear algebra and concurrency into the same program: the scene has to be mathematically correct, but the work that produces each frame also has to fit together.",
    },
  ],
  "job-finder": [
    {
      title: "Going to the source",
      body: "The starting point was the delay between a company posting an internship and that listing appearing on an aggregator. The platform watches the careers pages of saved companies and sends a notification when a new posting appears. The company’s own page is the source for the alert.",
    },
    {
      title: "Looking ahead",
      body: "I also built a calendar of likely opening dates using an RNN trained on each company’s posting history. The two features answer different questions: alerts tell you what has opened, while the calendar estimates when to start watching. Those dates are predictions, so they should be read as planning guidance rather than confirmed recruiting schedules.",
    },
  ],
  vennu: [
    {
      title: "A booking flow instead of an API",
      body: "Venue availability often sits behind a sequence of pages: choose a date, select a space, then inspect the available times. Vennu uses Playwright to navigate those booking flows. Threaded agents orchestrated through n8n handle the multi-step lookup rather than expecting every venue to expose the same interface.",
    },
    {
      title: "Turning pages into availability",
      body: "After navigation, an LLM converts the page content into structured availability. The results are normalised into Supabase, so the next search can query a table instead of repeating the browser session. Navigation, extraction, and storage each handle a different part of the problem.",
    },
    {
      title: "The build",
      body: "Vennu placed third at Kickstart. The workflow below shows the system behind the lookup: browser automation gathers the information, extraction makes it consistent, and the database makes it searchable.",
    },
  ],
  "remember-me": [
    {
      title: "Recognition without a screen",
      body: "We built a prototype camera that clips onto glasses and speaks the name and relationship of a recognised person through a small speaker. The idea was to make that information available in the moment, without asking the wearer to stop and navigate an app. Remember Me won Best Hardware at StormHacks.",
    },
    {
      title: "From a face to a spoken name",
      body: "AWS Rekognition handles face recognition, and ElevenLabs generates the spoken response. A React Native companion app gives family members a way to manage the people the device knows. That separates the interaction the wearer needs from the setup work a family member can do beforehand.",
    },
    {
      title: "What the prototype demonstrates",
      body: "The build connects a wearable camera, recognition, speech, and a companion app into one workflow. It is a hackathon prototype for an assistive interaction; the award and demo demonstrate the build, rather than establishing how reliably it would work in everyday care.",
    },
  ],
  "get-swole": [
    {
      title: "Feedback during a repetition",
      body: "I built Get Swole solo at my first hackathon. The idea was a webcam-based form checker that could count repetitions and return corrections while someone was still lifting. It won Best Solo Hacker at CS6 Hacks.",
    },
    {
      title: "A pose becomes a repetition",
      body: "MediaPipe estimates body landmarks from the webcam feed. A model on top of those landmarks classifies the repetition and counts it. This splits the problem into locating the person’s joints and interpreting how those joints move during an exercise.",
    },
    {
      title: "Connecting vision to the interface",
      body: "A Python service built with FastAPI handles the vision work, while a React interface presents the feedback. The landmark view below exposes the pose estimate itself, making it possible to inspect what the system sees alongside the correction it returns.",
    },
  ],
  fact: [
    {
      title: "Making a swatch behave like clothing",
      body: "I built F.A.C.T with three other members of UBC’s Aerial Robotics and Rocketry Club. We wanted to preview fabric patterns on a person through a webcam. The challenge was mapping a flat pattern to the wearer as they moved, with controls for the pattern’s scale, tiling, and position.",
    },
    {
      title: "Tracking and mapping",
      body: "MediaPipe estimates body pose, then OpenCV uses that information to position the fabric overlay. Tracking supplies a reference for where the pattern belongs; the mapping step determines how much of the pattern appears and how it repeats across the garment area.",
    },
    {
      title: "Keeping the preview interactive",
      body: "Flask and SocketIO connect the video-processing pipeline to the interface. The wardrobe view exposes the pattern controls, so the user can adjust the appearance while looking at the preview rather than repeatedly generating separate images.",
    },
  ],
  "granny-ai": [
    {
      title: "Starting with a spoken request",
      body: "Granny AI is a desktop-agent prototype for people who find a computer difficult to operate. ElevenLabs handles speech, Gemini interprets the request, and the Electron app brings the interaction together. The user describes a task rather than navigating each step themselves.",
    },
    {
      title: "Why we changed the control method",
      body: "The first version drove the mouse directly. That proved unreliable, so we rebuilt the execution around Playwright browser automation and application launching. It was a useful change in scope: the agent needed a dependable way to carry out actions after interpreting a request.",
    },
  ],
  lecruiter: [
    {
      title: "Practising the answer and the delivery",
      body: "We built LeCruiter AI at an AWS hackathon as an interview-practice tool. AWS Bedrock generates questions in context and evaluates the content of the response. A separate pass analyses tone and sentiment, giving the feedback two distinct views of the same answer.",
    },
    {
      title: "The practice loop",
      body: "The React interface presents a question and lets the user record a response; a Python backend built with FastAPI connects that interaction to the model. The behavioural prompt and coding view below show the practice formats we built around that loop.",
    },
  ],
};
