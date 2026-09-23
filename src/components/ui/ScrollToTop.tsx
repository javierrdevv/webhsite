"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "motion/react";

const RADIUS = 24;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const dashOffset = useTransform(scrollYProgress, [0, 1], [CIRCUMFERENCE, 0]);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.a
      href="#top"
      aria-label="Scroll back to top"
      className={`group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-background/75 text-foreground backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_25px_rgba(46,91,255,0.35)] ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      animate={{ y: show ? 0 : 14 }}
      initial={false}
    >
      <svg
        className="absolute -inset-1 -rotate-90"
        width="56"
        height="56"
        viewBox={`0 0 ${RADIUS * 2 + 8} ${RADIUS * 2 + 8}`}
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="28"
          cy="28"
          r={RADIUS}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />
        <motion.circle
          cx="28"
          cy="28"
          r={RADIUS}
          stroke="#2e5bff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <ArrowUp
        size={20}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </motion.a>
  );
}