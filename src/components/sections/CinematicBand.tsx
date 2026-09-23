"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface CinematicBandProps {
  src: string;
  alt?: string;
  title?: string;
  className?: string;
}

export default function CinematicBand({
  src,
  alt,
  title,
  className = "",
}: CinematicBandProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      aria-label={alt ?? title ?? "Featured image"}
      className={`relative h-[70vh] overflow-hidden bg-background ${className}`}
    >
      <motion.div
        className="absolute -inset-y-[14%] inset-x-0"
        style={{
          y,
          backgroundImage: `url(${src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        role="img"
        aria-label={alt}
      />
      <div className="absolute inset-0 bg-background/60" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/50 to-transparent" />
      {title && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(9,9,11,0.8),rgba(9,9,11,0)_75%)]" />
          <p className="relative max-w-3xl text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] text-balance [text-shadow:0_2px_30px_rgba(0,0,0,0.9)]">
            {title}
          </p>
        </div>
      )}
    </section>
  );
}