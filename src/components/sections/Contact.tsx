"use client";

import { motion } from "motion/react";
import { PaperPlane, GithubLogo, TwitterLogo, LinkedinLogo } from "@phosphor-icons/react";

export default function Contact() {
  return (
    <section className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto text-center">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Let&apos;s build something <br />
            <span className="text-accent italic">that matters.</span>
          </h2>
          <p className="text-xl text-muted mb-12 max-w-xl mx-auto">
            Available for select collaborations and high-impact projects. Let&apos;s connect and create an artifact that defines your brand.
          </p>

          <a
            href="mailto:hello@nda.dev"
            className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 rounded-full font-bold text-lg transition-transform active:scale-95 hover:opacity-90"
          >
            <PaperPlane size={24} />
            Start a conversation
          </a>
        </motion.div>
      </div>

      <footer className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-muted text-sm">
        <div className="flex items-center gap-6">
          <span>© 2026 nda.dev</span>
          <span className="hidden md:block opacity-30">/</span>
          <div className="flex items-center gap-4">
            <SocialLink href="https://github.com" icon={<GithubLogo size={18} />} />
            <SocialLink href="https://x.com" icon={<TwitterLogo size={18} />} />
            <SocialLink href="https://linkedin.com" icon={<LinkedinLogo size={18} />} />
          </div>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-widest">
          Based in Jakarta / Working Globally
        </div>
      </footer>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-foreground transition-colors"
    >
      {icon}
    </a>
  );
}
