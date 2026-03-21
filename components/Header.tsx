"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AnimatedBalance from "@/components/AnimatedBalance";
import { useMoney } from "@/lib/money-context";

export default function Header() {
  const { scrollY } = useScroll();
  const money = useMoney();

  const lastY = useRef(0);
  const accumulatedUp = useRef(0);
  const accumulatedDown = useRef(0);

  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Tune these to taste
  const SHOW_AFTER_UP_PX = 20;     // how much upward scroll triggers showing
  const HIDE_AFTER_DOWN_PX = 40;   // how much downward scroll triggers hiding
  const ALWAYS_SHOW_BELOW_PX = 10; // near top of page, always show

  // Listen for reward events and bring header into view (simulate scroll-up)
  useEffect(() => {
    const handler = () => {
      accumulatedUp.current = 0;
      accumulatedDown.current = 0;
      setVisible(true);
    };
    window.addEventListener("reward:showHeader", handler);
    return () => window.removeEventListener("reward:showHeader", handler);
  }, []);

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
        className="fixed left-0 right-0 top-0 z-[100] flex justify-center"
      >
        <div className="w-full max-w-5xl rounded-b-2xl rounded-t-none border-x border-b border-white/60 border-t-0 bg-[var(--background)]">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-white">

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-sm sm:text-base font-bold tracking-tight text-white/90">Balance</div>
              <div className="flex items-center gap-0.5 font-mono text-lg sm:text-xl font-bold tabular-nums tracking-tight text-white relative">
                 <span className="text-emerald-400 select-none">$</span>
                 <AnimatedBalance value={money.balance} className="text-base sm:text-lg" />
                 <RewardPopup />
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-6 text-base font-bold tracking-tight text-white/90">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white/80 active:bg-white/10 transition-colors"
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
            className="fixed inset-0 z-[200] bg-[var(--background)] flex flex-col md:hidden"
          >
            {/* Close button */}
            <div className="flex justify-end px-4 py-3">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-white/80 active:bg-white/10 transition-colors"
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
                  className="text-3xl font-bold text-white/90 hover:text-primary transition-colors"
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

function RewardPopup() {
  const [rewards, setRewards] = useState<{ id: number; amount: number }[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ amount: number }>;
      const amount = customEvent.detail?.amount || 0;
      const id = Date.now() + Math.random();
      setRewards((prev) => [...prev, { id, amount }]);
      
      // Remove after animation
      setTimeout(() => {
        setRewards((prev) => prev.filter((r) => r.id !== id));
      }, 1500);
    };

    window.addEventListener("reward:earned", handler);
    return () => window.removeEventListener("reward:earned", handler);
  }, []);

  return (
    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-0 h-0 overflow-visible pointer-events-none">
      <AnimatePresence>
        {rewards.map((r) => (
           <motion.div
             key={r.id}
             initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
             animate={{ opacity: 1, y: -25, x: 10, scale: 1.2 }}
             exit={{ opacity: 0, y: -40, x: 15 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="absolute left-0 top-0 text-emerald-400 font-bold text-lg select-none whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
           >
             +{r.amount.toFixed(2)}
           </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
