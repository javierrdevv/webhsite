"use client";

import { motion } from "motion/react";
import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
} from "@phosphor-icons/react";

const SOCIALS = [
  { href: "https://github.com", label: "GitHub", icon: <GithubLogo size={18} /> },
  { href: "https://twitter.com", label: "Twitter", icon: <TwitterLogo size={18} /> },
  { href: "https://linkedin.com", label: "LinkedIn", icon: <LinkedinLogo size={18} /> },
  { href: "https://instagram.com", label: "Instagram", icon: <InstagramLogo size={18} /> },
];

export default function Footer() {
  return (
    <footer className="relative pt-32 pb-10 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-accent font-mono text-xs uppercase tracking-[0.5em] block mb-8 opacity-60">
          Epilogue
        </span>
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[1.05] max-w-3xl mb-16">
          The web deserves better.
          <br />
          <span className="text-muted">Let&apos;s build the alternative.</span>
        </h2>

        <a
          href="mailto:hello@nda.dev"
          className="inline-block text-3xl md:text-5xl font-bold tracking-tighter underline underline-offset-8 hover:text-accent transition-colors"
        >
          hello@nda.dev
        </a>
      </motion.div>

      <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono text-muted uppercase tracking-[0.2em]">
        <span>© 2026 nda.dev · Based in Jakarta, Working Globally</span>
        <div className="flex items-center gap-5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="opacity-70 hover:opacity-100 hover:text-accent transition-all"
            >
              {s.icon}
            </a>
          ))}
        </div>
        <a href="#" className="hover:text-accent transition-colors">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}