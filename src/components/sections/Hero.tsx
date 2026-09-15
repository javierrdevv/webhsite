"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import Scene3D from "@/components/ui/Scene3D";

export default function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale3D = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  const smoothY = useSpring(yText, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale3D, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={targetRef}
      className="relative min-h-[100dvh] flex items-center justify-center px-6 md:px-10 bg-background"
    >
      {/* Background: Technical Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: 'linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)',
                      backgroundSize: '100px 100px' }} />
        <motion.div style={{ scale: smoothScale }} className="w-full h-full">
          <Scene3D />
        </motion.div>
      </div>

      {/* Visual "Box" dominance: Subtle radial glow behind the text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[60vh] bg-accent/5 rounded-full blur-[120px] opacity-50" />
      </div>

      <motion.div
        style={{ y: smoothY, opacity: opacityText }}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center"
      >
        {/* Eyebrow: Minimalist Mono */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-accent font-mono text-[10px] uppercase tracking-[0.6em] block mb-10 opacity-60"
        >
          Digital Architecture &middot; 2026
        </motion.span>

        {/* Main Headline: Massive and Dominant */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl lg:text-[9rem] font-bold tracking-tight leading-[1.3] mb-12 px-12 py-8 pr-20 overflow-visible"
        >
          CRAFTING<br />
          <span className="relative inline-block italic text-transparent bg-clip-text bg-gradient-to-b from-foreground to-zinc-600 px-12 overflow-visible">
            ARTIFACTS
          </span>
        </motion.h1>

        {/* Description & Action: Clean & Direct */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-12 mb-32"
        >
          <p className="text-lg md:text-2xl text-muted max-w-2xl leading-relaxed font-light">
            Bridging the gap between <span className="text-foreground font-medium">technical precision</span> and <span className="text-foreground font-medium">cinematic storytelling</span>.
          </p>

          <button className="group relative px-12 py-5 rounded-full bg-foreground text-background font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-3">
              Enter Gallery <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent" />
        <span className="text-[9px] font-mono uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}
