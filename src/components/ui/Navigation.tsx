"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";

export default function Navigation() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 240], [0.7, 0.95]);
  const background = useMotionTemplate`rgba(9, 9, 11, ${bgOpacity})`;

  return (
    <nav className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
      <motion.div
        className="relative w-full max-w-5xl flex items-center justify-between gap-6 py-2.5 pl-3 pr-2.5 rounded-full border border-white/10 backdrop-blur-md shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
        style={{ background }}
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <Link href="#" className="group flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-accent text-xs font-bold text-white shadow-[0_0_0_0_rgba(46,91,255,0.6)] transition-shadow duration-300 group-hover:shadow-[0_0_20px_0_rgba(46,91,255,0.7)]">
            <span className="relative z-10">ND</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </div>
          <span className="text-lg font-medium tracking-tighter">nda.dev</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavLink href="#work" label="Work" />
          <NavLink href="#about" label="About" />
          <NavLink href="#contact" label="Contact" />
        </div>

        <a
          href="#contact"
          className="group relative flex items-center gap-1.5 overflow-hidden rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            Let&apos;s talk
            <ArrowUpRight
              size={16}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-300 ease-out group-hover:translate-y-0" />
        </a>
      </motion.div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
    >
      <span className="absolute inset-0 rounded-full bg-white/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative h-1.5 w-1.5 scale-0 rounded-full bg-accent opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
      <span className="relative">{label}</span>
    </Link>
  );
}