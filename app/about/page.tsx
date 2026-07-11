"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

// Drifting note glyphs for the piano section. Sparse and quiet on purpose.
const NOTES: Array<{
  glyph: string;
  size: string;
  duration: string;
  delay: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}> = [
  { glyph: "♪", top: "10%", left: "4%", size: "text-2xl", duration: "9s", delay: "0s" },
  { glyph: "♫", top: "22%", right: "6%", size: "text-3xl", duration: "12s", delay: "1.2s" },
  { glyph: "♩", bottom: "34%", left: "10%", size: "text-xl", duration: "10s", delay: "0.6s" },
  { glyph: "♬", top: "48%", right: "14%", size: "text-2xl", duration: "11s", delay: "2s" },
  { glyph: "♪", bottom: "28%", right: "30%", size: "text-lg", duration: "13s", delay: "0.3s" },
];

function FloatingNotes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {NOTES.map((n, i) => (
        <span
          key={i}
          className={`absolute ${n.size} text-amber/25 select-none`}
          style={{
            top: n.top,
            left: n.left,
            right: n.right,
            bottom: n.bottom,
            animation: `note-float ${n.duration} ease-in-out ${n.delay} infinite`,
          }}
        >
          {n.glyph}
        </span>
      ))}
    </div>
  );
}

// Two-octave ink keyboard strip. Black keys sit after white keys 1, 2, 4, 5, 6.
function PianoKeys() {
  const WHITES = 14;
  const blackAfter = [0, 1, 3, 4, 5];
  return (
    <div aria-hidden className="relative flex h-11 overflow-hidden rounded-b-2xl border-t hairline">
      {Array.from({ length: WHITES }).map((_, i) => (
        <div key={i} className="flex-1 border-r bg-card last:border-r-0" />
      ))}
      {Array.from({ length: WHITES }).map((_, i) =>
        blackAfter.includes(i % 7) ? (
          <div
            key={`b${i}`}
            className="absolute top-0 h-6 rounded-b-[2px] bg-ink"
            style={{ left: `calc(${((i + 1) / WHITES) * 100}% - 1.1%)`, width: "2.2%" }}
          />
        ) : null,
      )}
    </div>
  );
}

function CourtDiagram() {
  return (
    <div aria-hidden className="relative aspect-[2/1] w-full rounded-xl border-2 hairline bg-card/60">
      {/* net */}
      <div className="absolute inset-y-0 left-1/2 border-l border-dashed hairline" />
      {/* singles sidelines */}
      <div className="absolute inset-x-0 top-[13%] border-t hairline" />
      <div className="absolute inset-x-0 bottom-[13%] border-t hairline" />
      {/* service boxes */}
      <div className="absolute inset-y-[13%] left-[26%] right-[26%] border-x hairline">
        <div className="absolute inset-x-0 top-1/2 border-t hairline" />
      </div>
      {/* labels */}
      <span className="meta-caps absolute left-3 top-3">Deuce court — dad</span>
      <span className="meta-caps absolute bottom-3 right-3">Ad court — A. Rhim</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* ── Header ─────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pt-4"
      >
        <p className="meta-caps mb-3">About me</p>
        <h1 className="max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-6xl">
          Two hands,
          <br />
          two <span className="italic text-amber">disciplines</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-dim">
          Engineering is what I do. Piano and tennis are how I stay sharp — one
          trains the hands and the ear, the other trains the feet and the
          nerve. Here's who I am when I'm not debugging robots or training
          models.
        </p>
      </motion.header>

      {/* ── Piano ──────────────────────────────────────────── */}
      <motion.section {...fadeUp} className="relative overflow-hidden rounded-2xl border bg-card">
        <FloatingNotes />
        <div className="relative p-6 sm:p-8 md:p-10">
          <p className="meta-caps mb-4">Discipline 01 — Piano</p>
          <h2 className="max-w-2xl text-2xl leading-tight md:text-4xl">
            Classical training. <span className="italic">Anime heart.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-dim">
            Years of classical repertoire, happily derailed by improvisation —
            mostly anime scores reimagined at the keys. Music taught me the
            patience and the ear that engineering borrows every day.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2">
            <figure>
              <div className="aspect-video w-full overflow-hidden rounded-xl border bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/JRo3_ib7wmE?si=g0b_wMl4EHW3MIvN"
                  title="La Campanella — senior recital"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <figcaption className="meta mt-3">
                LA CAMPANELLA — SENIOR RECITAL · JUN 2024
              </figcaption>
            </figure>

            <figure>
              <div className="aspect-video w-full overflow-hidden rounded-xl border bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/NHhUY5PsC7A?si=Kd0NyYxRtpEr2Acm"
                  title="Unravel — Animenz adaptation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <figcaption className="meta mt-3">
                UNRAVEL — ANIMENZ ADAPTATION · DEC 2024
              </figcaption>
            </figure>
          </div>
        </div>
        <PianoKeys />
      </motion.section>

      {/* ── Tennis ─────────────────────────────────────────── */}
      <motion.section {...fadeUp} className="rounded-2xl border bg-card">
        <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-8 md:grid-cols-2 md:p-10">
          <div>
            <p className="meta-caps mb-4">Discipline 02 — Tennis</p>
            <h2 className="text-2xl leading-tight md:text-4xl">
              Doubles, <span className="italic">with my dad.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-ink-dim">
              Weekend doubles are a standing appointment. He holds down the
              deuce court; I cover the ad side. The scoreboard is disputed.
              The rivalry is not.
            </p>
          </div>
          <CourtDiagram />
        </div>
      </motion.section>

      {/* ── Footnotes ──────────────────────────────────────── */}
      <motion.div {...fadeUp} className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y py-4">
        <span className="meta-caps">Also in rotation</span>
        <span className="meta">⛷️ DOUBLE-BLACKS IN WINTER</span>
        <span className="meta">☕ ICED CAPP — TIM HORTONS</span>
      </motion.div>

      {/* ── Roots ──────────────────────────────────────────── */}
      <motion.section {...fadeUp} className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <p className="meta-caps mb-3">Where it started</p>
          <h2 className="text-2xl leading-tight md:text-3xl">
            Robotics, sociology, <span className="italic">and music.</span>
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink-dim">
            It started with an English class my dad, sister, and I taught to
            underprivileged kids in Vietnam. That experience left me with a
            lasting fascination: how technology can quietly improve daily
            life. It's why I'm drawn to bringing digital intelligence into
            the physical world in ways that feel natural and responsive —
            and why I believe engineering works best when its maker has a
            creative, healthy mind.
          </p>
        </div>

        <div className="grid h-min grid-cols-2 gap-4">
          <div className="col-span-2 aspect-video overflow-hidden rounded-2xl border hairline shadow-md">
            <img
              src="/images/profile/family.jpeg"
              alt="Family picture"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-2xl border hairline shadow-md">
            <img
              src="/images/profile/megroup.jpeg"
              alt="With friends"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-2xl border hairline shadow-md">
            <img
              src="/images/profile/skiing.jpeg"
              alt="Skiing"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
