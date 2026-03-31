"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost, BlogSection } from "@/lib/blog";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import RedText from "@/components/RedText";

interface Props {
  post: BlogPost;
}

export default function BlogPostClient({ post }: Props) {
  return (
    <article className="pb-24 min-h-screen">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog
        </Link>
      </motion.div>

      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-10 bg-gradient-to-br ${post.coverGradient}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.5),transparent_60%)]" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-black/30 text-white/90 backdrop-blur-md border border-white/10"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Post header */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 text-xs text-white/35 mb-4 font-medium">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl">
          {post.subtitle}
        </p>
      </motion.header>

      {/* Accent divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ originX: 0 }}
        className={`h-px bg-gradient-to-r ${post.coverGradient} opacity-40 mb-12`}
      />

      {/* Post body */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.07, delayChildren: 0.25 },
          },
        }}
        className="max-w-2xl space-y-6"
      >
        {post.content.map((section, i) => (
          <BlogSectionRenderer key={i} section={section} gradient={post.coverGradient} />
        ))}
      </motion.div>

      {/* Footer nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-20 pt-8 border-t border-white/8"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          All posts
        </Link>
      </motion.div>
    </article>
  );
}

function BlogSectionRenderer({
  section,
  gradient,
}: {
  section: BlogSection;
  gradient: string;
}) {
  const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 18 },
    },
  };

  switch (section.type) {
    case "heading":
      return (
        <motion.h2
          variants={sectionVariants}
          className="text-2xl md:text-3xl font-bold text-white mt-10 mb-2"
        >
          {section.text}
        </motion.h2>
      );

    case "subheading":
      return (
        <motion.h3
          variants={sectionVariants}
          className="text-lg md:text-xl font-semibold text-white/90 mt-6 mb-1"
        >
          {section.text}
        </motion.h3>
      );

    case "paragraph":
      return (
        <motion.p
          variants={sectionVariants}
          className="text-white/65 leading-[1.85] text-base md:text-lg"
        >
          {section.text}
        </motion.p>
      );

    case "quote":
      return (
        <motion.blockquote variants={sectionVariants} className="relative pl-5 my-8">
          <div
            className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b ${gradient} opacity-70`}
          />
          <p className="text-white/70 text-lg md:text-xl font-medium italic leading-relaxed">
            {section.text}
          </p>
        </motion.blockquote>
      );

    case "code":
      return (
        <motion.div variants={sectionVariants} className="my-6">
          {section.language && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-t-xl bg-white/[0.06] border border-b-0 border-white/8 text-xs text-white/30 font-mono tracking-wide">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
              </div>
              <span className="ml-2">{section.language}</span>
            </div>
          )}
          <pre
            className={`overflow-x-auto p-5 bg-white/[0.04] border border-white/8 text-sm font-mono text-white/75 leading-relaxed ${
              section.language ? "rounded-b-xl" : "rounded-xl"
            }`}
          >
            <code>{section.text}</code>
          </pre>
        </motion.div>
      );

    case "list":
      return (
        <motion.ul variants={sectionVariants} className="space-y-2.5 my-4">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-white/65 text-base md:text-lg leading-relaxed"
            >
              <span
                className={`mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${gradient} opacity-80`}
              />
              {item}
            </li>
          ))}
        </motion.ul>
      );

    case "divider":
      return (
        <motion.div
          variants={sectionVariants}
          className="flex items-center justify-center gap-3 my-10 text-white/15"
        >
          <span className="w-8 h-px bg-white/15" />
          <span className="text-lg">✦</span>
          <span className="w-8 h-px bg-white/15" />
        </motion.div>
      );

    case "reward":
      return (
        <motion.p
          variants={sectionVariants}
          className="text-white/65 leading-[1.85] text-base md:text-lg"
        >
          {section.text && section.rewardId ? (
            <RedText
              rewardId={section.rewardId}
              amount={section.rewardAmount ?? 0.25}
              weight="bold"
            >
              {section.text}
            </RedText>
          ) : (
            section.text
          )}
        </motion.p>
      );

    case "note":
      return (
        <motion.div
          variants={sectionVariants}
          className="my-6 flex items-start gap-3 px-4 py-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5"
        >
          <span className="mt-0.5 flex-shrink-0 text-amber-400 text-base">✎</span>
          <p className="text-amber-300/70 text-sm leading-relaxed italic">{section.text}</p>
        </motion.div>
      );

    default:
      return null;
  }
}
