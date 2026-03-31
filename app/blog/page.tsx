"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { ArrowRight, Clock, Tag } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

export default function BlogPage() {
  return (
    <div className="pb-24 min-h-screen">
      {/* Page header */}
      <header className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/50 mb-6 tracking-widest uppercase"
        >
          Writing
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-white"
        >
          Blog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="text-white/50 text-lg max-w-xl"
        >
          Thoughts on robotics, software engineering, and building things that work in the real world.
        </motion.p>
      </header>

      {/* Posts grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        {BLOG_POSTS.map((post) => (
          <motion.div key={post.slug} variants={itemVariants}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <article className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                {/* Gradient accent bar */}
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${post.coverGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                  {/* Left: gradient thumbnail */}
                  <div className={`relative flex-shrink-0 w-full md:w-48 h-32 md:h-36 rounded-xl bg-gradient-to-br ${post.coverGradient} overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.3),transparent_60%)]" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/30 text-white/80 backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-xs text-white/35 mb-3 font-medium">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug group-hover:text-white transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-white/40 group-hover:text-white/80 transition-colors duration-200">
                      Read article
                      <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state if no posts */}
      {BLOG_POSTS.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-32 text-white/30"
        >
          <Tag className="w-10 h-10 mb-4" />
          <p className="text-lg font-medium">No posts yet. Check back soon.</p>
        </motion.div>
      )}
    </div>
  );
}
