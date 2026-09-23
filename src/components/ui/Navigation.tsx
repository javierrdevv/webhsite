"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(NAV_LINKS[0].href);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 240], [0.7, 0.95]);
  const background = useMotionTemplate`rgba(9, 9, 11, ${bgOpacity})`;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? y;
    const goingDown = y > prev;
    if (y > 400) {
      setHidden(goingDown);
      if (goingDown && open) setOpen(false);
    } else {
      setHidden(false);
    }
    setScrolled(y > 80);
  });

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-4 left-0 z-50 flex w-full justify-center px-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden ? "-translate-y-[150%]" : "translate-y-0"
      }`}
    >
      <div
        className={`relative w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "max-w-4xl" : "max-w-5xl"
        }`}
      >
        <motion.div
          className={`relative flex w-full items-center justify-between gap-4 rounded-full border border-white/10 backdrop-blur-md shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "py-2 pl-2.5 pr-2" : "py-2.5 pl-3 pr-2.5"
          }`}
          style={{ background }}
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <Link href="#top" className="group flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-accent text-xs font-bold text-white shadow-[0_0_0_0_rgba(46,91,255,0.6)] transition-shadow duration-300 group-hover:shadow-[0_0_20px_0_rgba(46,91,255,0.7)]">
              <span className="relative z-10">ND</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </div>
            <span
              className={`font-medium tracking-tighter transition-all duration-500 ${
                scrolled ? "text-base" : "text-lg"
              }`}
            >
              nda.dev
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={active === href ? "true" : undefined}
                className="group relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground"
              >
                {active === href && (
                  <motion.span
                    layoutId="nav-highlight"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    active === href ? "text-foreground" : "text-muted"
                  }`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href="#contact"
              className={`group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-foreground font-semibold text-background transition-all duration-500 active:scale-95 md:flex ${
                scrolled ? "px-3.5 py-1.5 text-xs" : "px-4 py-2 text-sm"
              }`}
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

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-foreground transition-colors hover:text-accent md:hidden"
            >
              {open ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-[calc(100%+8px)] md:hidden rounded-2xl border border-white/10 bg-background/90 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-2"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
                >
                  {label}
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent hover:text-white"
              >
                Let&apos;s talk
                <ArrowUpRight size={16} weight="bold" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}