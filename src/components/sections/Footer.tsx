"use client";

import { motion } from "motion/react";
import { InstagramLogo, TwitterLogo, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="relative pt-32 pb-12 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Large CTA / Brand Sign-off */}
        <div className="lg:col-span-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12"
          >
            Let's build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">something iconic.</span>
          </motion.h2>

          <div className="flex flex-wrap gap-6">
            <SocialLink href="https://github.com" icon={<GithubLogo size={24} />} label="Github" />
            <SocialLink href="https://twitter.com" icon={<TwitterLogo size={24} />} label="Twitter" />
            <SocialLink href="https://linkedin.com" icon={<LinkedinLogo size={24} />} label="LinkedIn" />
            <SocialLink href="https://instagram.com" icon={<InstagramLogo size={24} />} label="Instagram" />
          </div>
        </div>

        {/* Technical Info */}
        <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end gap-12">
          <div className="space-y-6 text-right">
            <p className="text-muted font-mono text-xs uppercase tracking-widest">
              Available for freelance <br />
              & full-time opportunities
            </p>
            <a
              href="mailto:hello@nda.dev"
              className="text-2xl md:text-3xl font-bold hover:text-accent transition-colors underline underline-offset-8"
            >
              hello@nda.dev
            </a>
          </div>

          <div className="w-full flex justify-between items-center pt-12 border-t border-zinc-900 text-[10px] font-mono text-muted uppercase tracking-[0.2em]">
            <span>© 2026 nda.dev</span>
            <span>Built with Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 px-5 py-2 rounded-full border border-zinc-800 hover:border-accent transition-all duration-300 hover:bg-accent/5"
    >
      <span className="text-muted group-hover:text-accent transition-colors">
        {icon}
      </span>
      <span className="text-sm font-medium text-muted group-hover:text-foreground transition-colors">
        {label}
      </span>
    </a>
  );
}
