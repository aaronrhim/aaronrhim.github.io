export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  coverGradient: string;
  excerpt: string;
  content: BlogSection[];
}

export interface BlogSection {
  type: "heading" | "subheading" | "paragraph" | "code" | "quote" | "list" | "divider" | "note" | "reward";
  text?: string;
  language?: string;
  items?: string[];
  rewardId?: string;
  rewardAmount?: number;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-two-paths",
    title: "The Two Paths: Where Computer Scientists Are Actually Headed",
    subtitle: "Aspiring Computer Scientists hold no place in the traditional software engineering field. Here's why, and what to do instead.",
    date: "March 28, 2026",
    readTime: "8 min read",
    tags: ["AI", "Career", "LLMs"],
    coverGradient: "from-cyan-500 via-blue-600 to-violet-700",
    excerpt:
      "Everyone is talking about AI taking jobs. But the more interesting story is how it's splitting the field of computer science into two very different futures—and why most people are running toward the wrong one.",
    content: [
      {
        type: "paragraph",
        text: "Ask any CS undergraduate what the hottest career path is right now, and they'll tell you: machine learning engineering. The salaries are astronomical, the problems feel important, and there's a certain prestige in saying you work on LLMs for a living. I get it. A year ago I probably would have said the same thing.",
      },
      {
        type: "paragraph",
        text: "But I don't think that's the right call anymore—at least not for us. Not for the people just entering the field. And here's why.",
      },
      {
        type: "heading",
        text: "Path One: MLE — A Race Against Time",
      },
      {
        type: "paragraph",
        text: "The first path is the one everyone sees. It's the path of building better LLMs—the safety research, the RLHF pipelines, the inference optimization, the architecture papers. This work is genuinely important and profoundly difficult. The people doing it are brilliant.",
      },
      {
        type: "paragraph",
        text: "But here's the problem: this path belongs to the people already on it. The senior researchers at Anthropic, OpenAI, DeepMind—the ones with a decade of deep ML experience who graduated when transformers were still a novel idea. They have a head start measured in years, and they're currently in a race to build the very thing that will eventually replace them.",
      },
      {
        type: "quote",
        text: "\"The MLE of today is grinding to build the LLM that will grind out better MLEs tomorrow. It's a loop, and it has an endpoint.\"",
      },
      {
        type: "paragraph",
        text: "The uncomfortable truth is that as LLM coding proficiency improves, the demand for traditional MLE and software engineering roles will compress dramatically. We've already seen it with junior engineering positions. Mid-level is next. The senior roles will hold longer, but they won't be immune—just delayed.",
      },
      {
        type: "paragraph",
        text: "For a 22-year-old choosing a career path today, committing fully to MLE means entering a pyramid scheme where the real value accrued by those at the top, and the ground is rising fast beneath your feet.",
      },
      {
        type: "heading",
        text: "The Divergence",
      },
      {
        type: "paragraph",
        text: "But here is where everything truly splits. The aspiring CS student who decides today to pursue MLE is racing toward an ever-narrowing target. And the question that doesn't get asked enough is a brutally simple one:",
      },
      {
        type: "quote",
        text: "\"By the time today's undergraduate finishes their degree and starts applying for entry-level MLE positions—will LLMs already be proficient enough to program themselves?\"",
      },
      {
        type: "paragraph",
        text: "Think about the timeline. A first-year student starts their degree in 2025. They graduate in 2029. In the last four years alone, we went from GPT-3 struggling with basic logic to models that can write entire full-stack applications from a vague prompt. The rate of improvement isn't linear—it's accelerating. The gap between where LLMs are today and where they need to be to replace a junior MLE is not a gap that takes ten years to close.",
      },
      {
        type: "paragraph",
        text: "The uncomfortable math: the average undergraduate's job search begins at roughly the same horizon where most AI forecasters place models capable of end-to-end ML research automation. You're not training into a field—you're training into the window of obsolescence.",
      },
      {
        type: "paragraph",
        text: "This isn't pessimism. It's just an honest read of the trajectory. And the correct response to it isn't to give up on CS—it's to stop orienting around the parts of CS that happen to be in the line of fire.",
      },
      {
        type: "heading",
        text: "Path Two: The Imagination Layer",
      },
      {
        type: "paragraph",
        text: "Here's the thing no one is talking about: we are currently in a stale period. LLMs are impressive—genuinely impressive—but they aren't yet capable of producing consistently high-quality, modular, maintainable code at scale. Context windows still leak. Abstractions still break down over long sessions. You still need to deeply understand what you're asking for to know whether the output is actually good.",
      },
      {
        type: "paragraph",
        text: "That gap—between \"impressive demo\" and \"fully autonomous engineering\"—is our window. And the skill we should be building right now is prompt engineering, not in the shallow sense (\"write me a React component\"), but in the architectural sense: how to decompose complex systems into specifications that an LLM can actually execute, how to verify AI output at scale, how to iterate with AI as a collaborator rather than a tool.",
      },
      {
        type: "subheading",
        text: "What this actually looks like in practice",
      },
      {
        type: "list",
        items: [
          "Learning to spec systems at the right level of abstraction—specific enough to be actionable, loose enough to let the model be creative",
          "Building intuition for where LLMs reliably fail (complex state, long dependency chains, subtle invariants) and designing around those gaps",
          "Developing taste: the ability to look at AI-generated code and immediately sense whether it's good architecture or a pile of technical debt",
          "Practicing multi-turn iterative development—treating an AI session more like pairing with a fast but forgetful junior engineer",
          "Building personal systems and projects end-to-end, even if 80% of the code is AI-generated, because the 20% of judgment calls are everything",
        ],
      },
      {
        type: "heading",
        text: "The Inflection Point",
      },
      {
        type: "paragraph",
        text: "At some point—and I don't think it's as far away as people want to believe—LLMs will cross a threshold. They'll be able to produce modular, well-tested, production-grade code consistently. Context won't degrade over long sessions. Multi-file refactors will just work.",
      },
      {
        type: "paragraph",
        text: "When that happens, the nature of what it means to be a software engineer shifts entirely. The bottleneck won't be implementation anymore—it will be imagination. The question won't be \"can we build this?\" It will be \"what should we build, and why?\"",
      },
      {
        type: "quote",
        text: "\"The creativity and imagination rush is coming. The people who are positioned for it are the ones building that muscle right now—not chasing the implementation skills that will be commoditized.\"",
      },
      {
        type: "paragraph",
        text: "Think about what the Cambrian explosion of software actually looks like when the cost of building approaches zero. Every niche problem gets solved. Every personal workflow gets automated. The space of things that are worth building expands by orders of magnitude. But the ideas still have to come from somewhere. The judgment about what matters, what's elegant, what's actually useful—that's irreducibly human.",
      },
      {
        type: "heading",
        text: "So What Should We Actually Do?",
      },
      {
        type: "paragraph",
        text: "Build things. Build a lot of things. Not to practice writing code—the code will mostly write itself—but to develop the judgment that comes from shipping, from seeing your abstractions break under real load, from learning what makes a product actually feel good to use.",
      },
      {
        type: "paragraph",
        text: "The CS graduates who thrive in the next decade won't be the ones who can implement backpropagation from scratch. They'll be the ones who can sit down with a problem, understand it deeply, decompose it clearly, and then orchestrate AI to build the solution faster than any team could have five years ago.",
      },
      {
        type: "paragraph",
        text: "We're not being displaced. We're being promoted. The job is just different now—and it's more interesting than it's ever been.",
      },
      {
        type: "divider",
      },
      {
        type: "paragraph",
        text: "I'm still figuring out exactly what this path looks like in practice. But I'd rather be actively exploring that question than defaulting to the old answer just because it used to be right.",
      },
    ],
  },
  {
    slug: "agentic-programming-in-engineering",
    title: "Agentic Programming in Engineering: A Tale of Two Approaches",
    subtitle: "What UBC Rover taught me about the gap between AI-assisted and traditional engineering—and why both miss something",
    date: "March 28, 2026",
    readTime: "10 min read",
    tags: ["Engineering", "AI", "Robotics"],
    coverGradient: "from-orange-500 via-rose-500 to-pink-700",
    excerpt:
      "On the UBC Rover team, I sat next to someone who programs everything from scratch—no AI, no shortcuts. I, on the other hand, can barely write a line of C++ without it. Watching us work on the same problem revealed something I wasn't expecting.",
    content: [
      {
        type: "paragraph",
        text: "One of the sharpest observations I've made in my time on UBC Rover is that computer scientists and engineers don't just think differently about code—they think differently about the act of building itself. And I don't mean that in an abstract, philosophical way. I mean it in the practical, day-to-day sense of what it looks like to sit down in front of a problem and start working.",
      },
      {
        type: "paragraph",
        text: "This is the story of me and Rowan Zawadzki. He's a fifth-year integrated engineering student at UBC. The kind of person who can look at a hardware interface—the software layer that translates raw signals from physical devices into structured data a robot can act on—internalize its requirements, and write production-grade C++ from scratch without reaching for a single AI tool. Not because he's philosophically opposed to them—just because he doesn't need them. That's genuinely rare in 2026, and it's worth examining why.",
      },
      {
        type: "paragraph",
        text: "I, on the other hand, practice what I'd call agentic programming: directing an AI through complex, multi-step engineering work rather than generating isolated snippets. It's a different skill from writing code—one built on knowing how to decompose a problem clearly, maintain context across sessions, and review generated output with enough skepticism to catch the subtle failures that look correct on the surface.",
      },
      {
        type: "heading",
        text: "Two Backgrounds, One Codebase",
      },
      {
        type: "paragraph",
        text: "My background is hackathons, web projects, and AI-assisted everything. I've shipped a lot of things fast. I've accumulated a particular skill: knowing how to prompt a model until the output is actually good, how to decompose a system so the AI doesn't get lost, and how to review AI-generated code with enough skepticism to catch where it quietly went wrong.",
      },
      {
        type: "paragraph",
        text: "Rowan's background is the opposite. Five years of integrated engineering—mechanical, electrical, software, all bleeding into each other. He has the discipline that comes from not being able to cheat. If the physics is wrong, the robot breaks. If the logic is wrong, the hardware fails. There's no language model to blame.",
      },
      {
        type: "quote",
        text: "\"Two people, same problem, completely different tools. One of us writes code. One of us directs it. And for a long time, I assumed that made me the weaker engineer.\"",
      },
      {
        type: "reward",
        text: "You read that right. Click to acknowledge it.",
        rewardId: "agentic-intro-quote",
        rewardAmount: 0.25,
      },
      {
        type: "heading",
        text: "Approach to Implementation",
      },
      {
        type: "paragraph",
        text: "Look at hand-written code from someone like Rowan, and it has a quality I can only describe as presence. The variable names reflect genuine familiarity with the domain. The abstraction boundaries make sense because they were chosen, not generated. Comments appear where the logic is subtle, not everywhere or nowhere. You can feel the engineer in the code.",
      },
      {
        type: "paragraph",
        text: "AI-generated code—when prompted well—looks eerily perfect. Every class cleanly separated. Every function single-purpose. Docstrings on everything. It passes code review at a glance, sometimes too easily. The structure is rigorous in a way human code rarely is, because it's following internalized patterns from thousands of codebases at once.",
      },
      {
        type: "note",
        text: "Code snippet coming soon: hardware interface written by hand vs. hardware interface written by AI. The differences are more subtle than you'd expect.",
      },
      {
        type: "paragraph",
        text: "But look closer and the two diverge in a way that matters. The hand-written code has opinions. It reflects a specific understanding of the problem—maybe not the most elegant understanding, but a real one. The AI code is opinionated in a different way: confidently, uniformly, without ever having actually understood anything.",
      },
      {
        type: "reward",
        text: "That's a distinction worth 6.250₫.",
        rewardId: "agentic-code-opinions",
        rewardAmount: 0.25,
      },
      {
        type: "heading",
        text: "The Modularity Problem",
      },
      {
        type: "paragraph",
        text: "The biggest failure mode I've encountered with AI-generated code is what I'd call scattered sources of truth. In a large codebase, an AI model will helpfully define a constant here, a configuration value there, a type in a third location—because in the immediate context of each prompt, that was the most locally reasonable thing to do. Zoom out, and you have a codebase where the same piece of information lives in four places and three of them will drift out of sync.",
      },
      {
        type: "paragraph",
        text: "A traditional engineer doesn't do this naturally—not because they're better at abstract architecture, but because they're writing the whole thing in their head simultaneously. The global state is their mental model. AI doesn't have that. Each prompt is a fresh context window, and unless you explicitly maintain continuity, the model loses the thread.",
      },
      {
        type: "subheading",
        text: "The fix: context as a first-class engineering artifact",
      },
      {
        type: "paragraph",
        text: "Working on ROS2 interfaces for Rover—ROS2 being the communication framework that manages how different parts of a robot share data via named channels called nodes and topics—I found that the solution to AI modularity failures is deliberate context management. Before prompting for any new component, I maintain a running document of the things the model needs to know: existing node names and topics, active dependencies, the data types in use across the codebase, the encapsulation patterns we've committed to. I feed that context into every significant prompt.",
      },
      {
        type: "paragraph",
        text: "The result is that the model's outputs slot into the existing architecture instead of generating parallel ones. The code still looks eerily clean—but now it's also actually coherent. The sources of truth consolidate. The interfaces match. It stops feeling like AI wrote it and starts feeling like a very fast, very consistent collaborator who happened to share your memory.",
      },
      {
        type: "list",
        items: [
          "Maintain a context document: ROS2 nodes, topics, existing message types, naming conventions",
          "Prompt for interfaces before implementations—agree on the contract, then fill it in",
          "Never let the model create a new constant, config value, or type without explicitly telling it where the canonical definition lives",
          "After each significant generation, ask the model to identify any duplicated logic or inconsistent naming before moving on",
          "Treat the model's context window like RAM: precious, limited, and worth managing actively",
        ],
      },
      {
        type: "paragraph",
        text: "These aren't tricks. They're a discipline—and they're what separates agentic programming that produces coherent systems from agentic programming that produces well-formatted chaos.",
      },
      {
        type: "reward",
        text: "Claim 12.500₫ for actually reading this section.",
        rewardId: "agentic-modularity-discipline",
        rewardAmount: 0.50,
      },
      {
        type: "heading",
        text: "What I Actually Learned on Rover",
      },
      {
        type: "paragraph",
        text: "I've seeped slowly into hardware during my time on Rover—writing and rewriting hardware interfaces, refactoring thousands of lines of code to consolidate modularity, building a reinforcement learning pipeline from scratch. Each of these felt like progress. Most of them also involved hitting a wall and needing a human to tell me which direction to look.",
      },
      {
        type: "paragraph",
        text: "The hardware interface was the sharpest lesson. My first few iterations were too specific—over-fitted to what I thought a hardware interface should look like, which turned out to be wrong in a way that's hard to catch when you've never built one before. I tried refactoring old code. I tried rewriting from scratch. Each version looked reasonable in isolation and achieved nothing in practice. Rowan looked at it and told me plainly: this doesn't improve anything. You've just moved code around.",
      },
      {
        type: "quote",
        text: "\"Start smaller. Focus on how the pieces relate to each other—not what each piece does in isolation.\"",
      },
      {
        type: "paragraph",
        text: "That sentence did more for my understanding than weeks of prompting. Instead of trying to architect a complete hardware interface from the top down, I started with a simple polling mechanism—querying live data from our mjbots moteus brushless motor drivers and watching what comes back. I learned to parse a CAN frame (the fixed-length packet format the motors communicate over), understood the types of queries the bus expects, and worked out why a 64-byte CAN data field demands completely different thinking than a standard UART byte stream.",
      },
      {
        type: "paragraph",
        text: "That small experiment grew. The polling code became a diagnostic snippet. The snippet turned into a custom HMI—a Human-Machine Interface, the dashboard used to monitor and control the robot during operation. The custom HMI eventually replaced the full one we had been using. None of that was planned. It emerged from understanding the small thing well enough that the next step became obvious.",
      },
      {
        type: "heading",
        text: "Retention — In Code and In Models",
      },
      {
        type: "paragraph",
        text: "Here's the connection that I keep coming back to. What Rowan actually gave me with that advice—start small, focus on relationships—was a way of building retention. Not AI retention. Human retention. The ability to hold the whole system in mind at once: how the ROS2 nodes relate, what each topic carries, where data transforms between representations, which dependencies are real and which are accidental complexity.",
      },
      {
        type: "paragraph",
        text: "This is exactly what LLMs currently lack. Retention—genuine, persistent awareness of a codebase's evolving state—is one of the most critical missing pieces in agentic programming today. An LLM has no memory of the conversation it had with you yesterday. It doesn't know that the message type you defined three sessions ago has since changed. It doesn't feel the weight of the decision that was made two weeks ago and is now load-bearing.",
      },
      {
        type: "paragraph",
        text: "But I do. And that's what makes the difference between a prompt that produces coherent systems code and a prompt that produces a beautifully formatted mess. Once I understood the hardware interface—genuinely, at the level where I could explain why each piece existed and how it connected to the rest—I could prompt an LLM to build a highly optimized, modular implementation of it. Not because I wrote the code. Because I held the context.",
      },
      {
        type: "heading",
        text: "So Who's the Better Engineer?",
      },
      {
        type: "paragraph",
        text: "Watching Rowan write code is humbling. There's an intimacy with the machine that I don't have and probably never will in the same way. He knows what happens at the register level. He can read a datasheet and translate it into a driver without a second thought. That knowledge is load-bearing in ways that are easy to underestimate until something breaks at 3am and you don't have an internet connection.",
      },
      {
        type: "paragraph",
        text: "But here's where I've landed after a year of working next to him: we're not competing on the same axis anymore. Rowan optimizes depth—he gets closer and closer to the metal, and the code gets correspondingly more reliable and more expressive of the actual problem. I optimize breadth and imagination—I hold the bigger picture, see how components should relate before they exist, and iterate through system designs faster than a single person working from scratch could.",
      },
      {
        type: "quote",
        text: "\"The question isn't who codes better. It's which problems each of us can actually solve—and how the two approaches can make each other stronger.\"",
      },
      {
        type: "reward",
        text: "Rare insight. Worth something.",
        rewardId: "agentic-who-better",
        rewardAmount: 0.25,
      },
      {
        type: "paragraph",
        text: "It's worth being honest about what AI-assisted prototyping actually costs, though. Prompting meaningful, coherent systems code isn't fast in the way people assume. It takes days of careful work—maintaining context, visualizing how everything intertwines, holding the dependency graph in your head so the model doesn't fragment it. The speed is real, but it's the speed of iteration, not the speed of shortcuts. Each cycle gets you closer to something correct because you understand the system better than you did the cycle before.",
      },
      {
        type: "heading",
        text: "The Real Question for Engineering Teams",
      },
      {
        type: "paragraph",
        text: "I think the engineering teams that thrive over the next decade won't be the ones that adopt AI wholesale, or the ones that reject it wholesale. They'll be the ones that understand which work benefits from AI amplification and which work requires the kind of hard-won, irreplaceable understanding that only comes from doing it the hard way.",
      },
      {
        type: "paragraph",
        text: "That distinction is hard to see from the outside—and easy to fake. A codebase full of beautiful AI-generated files can look exactly like a codebase built by someone who deeply understood what they were doing. The difference shows up in the 3am failure, in the hardware edge case, in the question nobody thought to ask until a motor goes silent in the field.",
      },
      {
        type: "divider",
      },
      {
        type: "reward",
        text: "You made it to the end. That's 25.000₫.",
        rewardId: "agentic-finish",
        rewardAmount: 1.00,
      },
      {
        type: "paragraph",
        text: "The lesson from Rover isn't that agentic programming is better than traditional engineering, or vice versa. It's that one without the other leaves something critical on the table. Rowan gave me the vocabulary and the foundational knowledge to think clearly about systems I had never touched. I took that knowledge, combined it with everything I'd built up through prompting and iteration, and used it to imagine what a new system could look like—then built it with an LLM. That combination is where the interesting work lives.",
      },
    ],
  },
];

