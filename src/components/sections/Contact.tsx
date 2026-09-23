"use client";

import { motion } from "motion/react";
import { PaperPlane } from "@phosphor-icons/react";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto text-center scroll-mt-24">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] text-balance">
            Let&apos;s build something <br />
            <span className="text-accent italic">that matters.</span>
          </h2>
          <p className="text-xl text-muted mb-12 max-w-xl mx-auto">
            Available for select collaborations and high-impact projects. Let&apos;s connect and create an artifact that defines your brand.
          </p>

          <a
            href="mailto:hello@nda.dev"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-10 py-5 text-lg font-bold text-background transition-transform active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-3">
              <PaperPlane
                size={24}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              Start a conversation
            </span>
            <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-300 ease-out group-hover:translate-y-0" />
          </a>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Currently booking [bulan/tahun] — [X] slot open
          </p>
        </motion.div>
      </div>
    </section>
  );
}