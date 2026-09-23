"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

const SECTION_HEIGHT = 600;

export default function Hero() {
  return (
    <section
      id="top"
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full bg-background"
    >
      <link rel="preload" as="image" href={CENTER_IMG} fetchPriority="high" />
      <CenterImage />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-[45vh] bg-gradient-to-b from-background/0 via-background/70 to-background" />
    </section>
  );
}

const CENTER_IMG =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop";

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT * 0.6], [28, 0]);
  const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT * 0.6], [72, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  const backgroundScale = useTransform(
    scrollY,
    [0, SECTION_HEIGHT * 0.8],
    [1.7, 1]
  );
  const scale = useTransform(scrollY, [0, SECTION_HEIGHT * 0.6], [0.5, 1]);
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-svh w-full overflow-hidden"
      style={{ opacity }}
    >
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <motion.div
          className="absolute inset-0"
          style={{
            scale: backgroundScale,
            backgroundImage: `url(${CENTER_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath,
          background:
            "linear-gradient(to bottom, rgba(9,9,11,0.6), rgba(9,9,11,0.15) 45%, rgba(9,9,11,0.6))",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath,
          background:
            "radial-gradient(ellipse 85% 75% at 50% 45%, rgba(9,9,11,0) 0%, rgba(9,9,11,0.12) 60%, rgba(9,9,11,0.7) 100%)",
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ clipPath }}
      >
        <motion.div
          className="flex flex-col items-center px-6 md:px-16 text-center"
          style={{ scale }}
        >
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.25] [text-shadow:0_4px_40px_rgba(0,0,0,0.7)]">
            CRAFTING
            <br />
            <span className="relative inline-block italic text-zinc-200">
              ARTIFACTS
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-base md:text-xl text-foreground/70 leading-relaxed font-light [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
            Bridging the gap between{" "}
            <span className="text-foreground font-medium">technical precision</span>{" "}
            and{" "}
            <span className="text-foreground font-medium">cinematic storytelling</span>
            .
          </p>
          <a
            href="#work"
            className="group relative mt-12 flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-10 py-5 text-lg font-bold text-background"
          >
            <span className="relative z-10 flex items-center gap-3">
              Enter Gallery
              <ArrowRight
                size={24}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
            <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-300 ease-out group-hover:translate-y-0" />
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
