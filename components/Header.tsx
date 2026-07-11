"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { scrollY } = useScroll();

  const lastY = useRef(0);
  const accumulatedUp = useRef(0);
  const accumulatedDown = useRef(0);

  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Tune these to taste
  const SHOW_AFTER_UP_PX = 20;     // how much upward scroll triggers showing
  const HIDE_AFTER_DOWN_PX = 40;   // how much downward scroll triggers hiding
  const ALWAYS_SHOW_BELOW_PX = 10; // near top of page, always show

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = lastY.current;
    const delta = y - prev;
    lastY.current = y;

    // Always show near the top
    if (y <= ALWAYS_SHOW_BELOW_PX) {
      accumulatedUp.current = 0;
      accumulatedDown.current = 0;
      setVisible(true);
      return;
    }

    if (delta > 0) {
      // scrolling down
      accumulatedDown.current += delta;
      accumulatedUp.current = 0;

      if (accumulatedDown.current >= HIDE_AFTER_DOWN_PX) {
        setVisible(false);
      }
    } else if (delta < 0) {
      // scrolling up
      accumulatedUp.current += -delta;
      accumulatedDown.current = 0;

      if (accumulatedUp.current >= SHOW_AFTER_UP_PX) {
        setVisible(true);
      }
    }
  });

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/experiences", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
  ];

  return (
    <>
      <motion.header
        initial={false}
        animate={visible ? "shown" : "hidden"}
        variants={{
          shown: { y: 0, opacity: 1 },
          hidden: { y: -120, opacity: 0 },
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-[100] flex justify-center px-3 md:px-0"
      >
        <div className="w-full max-w-5xl rounded-2xl md:rounded-b-2xl md:rounded-t-none border hairline md:border-x md:border-b md:border-t-0 bg-card mt-2 md:mt-0">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-ink">

            <a href="/" className="font-serif text-lg sm:text-xl text-ink hover:text-amber transition-colors">
              Aaron Rhim
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-6 text-base font-bold tracking-tight text-ink-dim">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-amber transition-colors">{link.label}</a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-ink-dim active:bg-secondary transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-paper paper-grain flex flex-col md:hidden"
          >
            {/* Close button */}
            <div className="flex justify-end px-4 py-3">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-ink-dim active:bg-secondary transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-3xl font-serif text-ink hover:text-amber transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
