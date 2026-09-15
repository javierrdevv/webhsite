"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Headline Reveal
      gsap.from(".philosophy-title", {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".philosophy-title",
          start: "top 90%",
        }
      });

      // 2. Manifesto Quote Animation
      gsap.from(".manifesto-quote", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto-quote",
          start: "top 85%",
        }
      });

      // 3. Pillar Blocks: Clip-path Reveal
      const blocks = gsap.utils.toArray<HTMLElement>(".about-pillar");
      blocks.forEach((block) => {
        const title = block.querySelector(".pillar-title");
        const text = block.querySelector(".pillar-text");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(title,
          { y: "100%", opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
        ).fromTo(text,
          { y: "100%", opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
          "-=0.6"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

        {/* Left Column: Sticky Header */}
        <div className="lg:col-span-5 sticky top-32 self-start">
          <span className="text-accent font-mono text-xs uppercase tracking-[0.5em] block mb-8 opacity-60">
            The Manifesto
          </span>
          <h2 className="philosophy-title text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">
            The <br />Philosophy.
          </h2>
          <div className="manifesto-quote relative">
            <span className="text-6xl text-accent font-serif absolute -top-10 -left-6 opacity-20">“</span>
            <p className="text-2xl md:text-3xl text-muted leading-relaxed font-light italic relative z-10 pl-8">
              I believe the web has become too predictable. The era of generic templates is over. We need interfaces that demand attention and evoke emotion.
            </p>
          </div>
        </div>

        {/* Right Column: Content Pillars */}
        <div className="lg:col-span-7 space-y-48">
          <AboutPillar
            number="01"
            title="Digital Artifacts"
            content="I don't build websites. I build digital artifacts. Every pixel is a decision, every animation is a conversation. My work lives at the intersection of technical precision and cinematic storytelling."
          />
          <AboutPillar
            number="02"
            title="Intentional Motion"
            content="Motion is not decoration. It is a tool for hierarchy, guidance, and emotion. I use physics-based transitions to create interfaces that feel tactile and responsive, moving the user from a state of observing to a state of experiencing."
          />
          <AboutPillar
            number="03"
            title="The Standard"
            content="Precision over volume. Intent over trend. I prioritize a lean, high-fidelity output over a bloated feature set. If a detail doesn't serve the purpose, it is removed. What remains is essential."
          />
        </div>
      </div>
    </section>
  );
}

function AboutPillar({ number, title, content }: { number: string; title: string; content: string }) {
  return (
    <div className="about-pillar group relative pl-12 border-l border-zinc-800 hover:border-accent transition-colors duration-500">
      {/* Numbering */}
      <div className="absolute -left-6 top-0 text-xs font-mono text-muted group-hover:text-accent transition-colors duration-500">
        {number}
      </div>

      <div className="overflow-hidden">
        <h3 className="pillar-title text-3xl md:text-5xl font-bold tracking-tighter mb-6 text-foreground">
          {title}
        </h3>
      </div>

      <div className="overflow-hidden">
        <p className="pillar-text text-lg md:text-xl text-muted leading-relaxed max-w-xl opacity-80">
          {content}
        </p>
      </div>
    </div>
  );
}
