import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import { LINKS, PROFILE, PROJECTS, ROLES } from "@/lib/content";

export default function Home() {
  const selected = ["render-engine", "remember-me", "vennu", "get-swole"];
  return (
    <>
      <Container>
        <section className="hero">
          <div className="rise">
            <p className="label flex items-center gap-2">
              <span className="bg-accent h-2 w-2 rounded-full" /> UBC · Computer Science,
              Mathematics & Physics
            </p>
            <h1>
              Hey, I’m Aaron<span className="text-accent">.</span>
            </h1>
            <p className="max-w-[440px] text-xl leading-relaxed">
              I build robots, write their software, and figure things out along the way.
            </p>
            <p className="text-text-dim mt-5 max-w-[440px] leading-relaxed">
              Third-year student in Vancouver. Currently working on robot learning, rover controls,
              and human motion capture.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href="#selected-work" className="button-primary">
                Explore my work <span aria-hidden>↓</span>
              </a>
              <a href={PROFILE.resume} className="text-sm">
                Resume <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
          <figure
            className="hero-photo rise"
            style={{ "--rise-delay": "120ms" } as React.CSSProperties}
          >
            <Image
              src="/images/thumbnails/rover.jpg"
              alt="Our UBC rover with its arm raised during outdoor testing in the badlands"
              width={800}
              height={667}
              priority
              sizes="(max-width: 760px) 90vw, 460px"
            />
            <figcaption className="label flex justify-between gap-3 pt-3">
              <span>Out of the simulator, into the field.</span>
              <span aria-hidden>↗</span>
            </figcaption>
          </figure>
        </section>
        <div className="border-rule flex flex-wrap items-center gap-x-8 gap-y-3 border-y py-5">
          <span className="label">CURRENTLY</span>
          <Link href="/work/ubc-rover" className="text-text text-sm">
            Software Co-Lead <span className="text-text-dim">/ UBC Rover</span> ↗
          </Link>
          <Link href="/work/eithelmir" className="text-text text-sm">
            Founder <span className="text-text-dim">/ Eithelmir</span> ↗
          </Link>
        </div>
        <section id="selected-work" className="pt-16">
          <div className="section-heading border-t-0">
            <h2>Selected work</h2>
            <span className="label">Robotics, software & a few experiments</span>
          </div>
          <article className="project-feature">
            <Link href="/work/ubc-rover" className="feature-photo" aria-label="Explore UBC Rover">
              <Image
                src="/images/rover-model.png"
                alt="CAD model of the UBC rover and its robotic arm"
                fill
                sizes="(max-width: 760px) 95vw, 610px"
                className="bg-bg-raised object-contain p-4"
              />
            </Link>
            <div className="feature-copy">
              <p className="label">01 / UBC ROVER · 2025–PRESENT</p>
              <h3>
                An interface for the driver.
                <br />
                Learning for the arm.
              </h3>
              <p className="text-text-dim leading-relaxed">
                My two main projects on UBC Rover: the human–machine interface and reinforcement
                learning for our 6-DOF arm. From a modular operator workspace to learning how to
                approach and press a keyboard key.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["C++", "ROS 2", "CAN-FD", "MuJoCo", "Qt"].map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <Link href="/work/ubc-rover" className="mt-8 text-sm">
                Read the build notes <span aria-hidden>↗</span>
              </Link>
            </div>
          </article>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {selected.map((slug) => (
              <ProjectCard key={slug} project={PROJECTS.find((p) => p.slug === slug)!} />
            ))}
          </ul>
          <div className="mt-7 text-right">
            <Link href="/projects" className="text-sm">
              All projects <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
        <section className="pt-16">
          <div className="section-heading">
            <h2>Beyond the rover</h2>
            <Link href="/work" className="text-sm">
              All experience ↗
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {ROLES.filter((r) => r.slug !== "ubc-rover").map((role) => (
              <article key={role.slug} className="border-rule border-l-2 pl-6">
                <p className="label">{role.dates}</p>
                <h3 className="mt-3 text-2xl">
                  <Link href={`/work/${role.slug}`} className="text-text">
                    {role.org} ↗
                  </Link>
                </h3>
                <p className="mt-2 text-sm">{role.title}</p>
                <p className="text-text-dim mt-4 leading-relaxed">{role.blurb}.</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="about"
          className="border-rule mt-20 grid gap-8 border-t pt-10 sm:grid-cols-[180px_1fr]"
        >
          <div>
            <Image
              src={PROFILE.portrait}
              alt="Aaron Rhim"
              width={150}
              height={165}
              className="aspect-square rounded-sm object-cover object-[50%_22%]"
            />
            <p className="label mt-3">Vancouver, BC</p>
          </div>
          <div>
            <h2 className="text-3xl">A little about me</h2>
            <p className="measure text-text-dim mt-5 leading-relaxed">
              I’m studying Computer Science, Mathematics and Physics at UBC. I like working where
              software meets the physical world: teaching an arm to press a key, making sense of
              noisy sensor data, or building a tool that makes debugging a little less painful.
            </p>
            <p className="measure text-text-dim mt-4 leading-relaxed">
              Outside of that, you’ll find me skiing or spending time with friends and family. I’m
              looking for robotics and machine learning internships for 2027.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              {LINKS.filter((l) => l.label !== "Resume").map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm"
                  {...(l.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
