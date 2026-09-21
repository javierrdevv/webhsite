"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

interface Pillar {
  number: string;
  title: string;
  content: string;
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Digital Artifacts",
    content:
      "I don't build websites. I build digital artifacts. Every pixel is a decision, every animation is a conversation. My work lives at the intersection of technical precision and cinematic storytelling.",
  },
  {
    number: "02",
    title: "Intentional Motion",
    content:
      "Motion is not decoration. It is a tool for hierarchy, guidance, and emotion. I use physics-based transitions to create interfaces that feel tactile and responsive, moving the user from a state of observing to a state of experiencing.",
  },
  {
    number: "03",
    title: "The Standard",
    content:
      "Precision over volume. Intent over trend. I prioritize a lean, high-fidelity output over a bloated feature set. If a detail doesn't serve the purpose, it is removed. What remains is essential.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".manifesto-statement", {
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".manifesto-statement",
          start: "top 90%",
        },
      });

      const rows = gsap.utils.toArray<HTMLElement>(".manifesto-row");
      rows.forEach((row) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          row.querySelector(".row-number"),
          { opacity: 0 },
          { opacity: 1, duration: 0.6 }
        )
          .fromTo(
            row.querySelector(".row-title"),
            { y: "110%", opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
            "<"
          )
          .fromTo(
            row.querySelector(".row-text"),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.4"
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} id="about" className="relative py-40 px-6 md:px-10 max-w-7xl mx-auto scroll-mt-24">
      <header className="relative mb-16 md:mb-24">
        <span className="text-accent font-mono text-xs uppercase tracking-[0.5em] block mb-8 opacity-60">
          The Manifesto
        </span>
        <span className="pointer-events-none select-none absolute -top-10 -left-4 text-9xl font-serif text-accent opacity-10">
          “
        </span>
        <h2 className="manifesto-statement relative text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] max-w-5xl">
          I believe the web has become <span className="text-accent">too predictable</span>. The era of generic
          templates is over. We need interfaces that <span className="text-accent">demand attention</span> and
          evoke emotion.
        </h2>
      </header>

      <div className="mt-20 md:mt-32">
        {PILLARS.map((pillar) => (
          <ManifestoRow key={pillar.number} {...pillar} />
        ))}
      </div>
    </section>
  );
}

function ManifestoRow({ number, title, content }: Pillar) {
  return (
    <article className="manifesto-row group border-t border-white/10">
      <div className="flex items-baseline gap-6 md:gap-16 py-12 md:py-20">
        <span className="row-number shrink-0 font-mono text-sm text-accent opacity-80">{number}</span>
        <div className="flex-1">
          <div className="overflow-hidden">
            <h3 className="row-title text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] group-hover:text-accent transition-colors duration-500">
              {title}
            </h3>
          </div>
          <p className="row-text mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
            {content}
          </p>
        </div>
      </div>
    </article>
  );
}