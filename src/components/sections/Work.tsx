"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  description: string;
  color: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    title: "Aether OS",
    category: "Spatial Interface",
    description: "A conceptual spatial operating system designed for seamless multi-device orchestration.",
    color: "#2e5bff",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200&h=800",
  },
  {
    title: "Lumina",
    category: "Rendering Engine",
    description: "A high-performance visual experience optimized for luxury brand storytelling.",
    color: "#ff2e63",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200&h=800",
  },
  {
    title: "Kinetica",
    category: "Auto-UI",
    description: "Redefining driver interaction through kinetic typography and haptic feedback.",
    color: "#00d1ff",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200&h=800",
  },
];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 10%",
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });

        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.8,
            y: -40,
            rotateX: 5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="work" className="relative py-32 scroll-mt-24">
      <div className="px-6 md:px-10 max-w-7xl mx-auto mb-20 md:mb-40">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">Selected Works</h2>
        <p className="text-muted max-w-lg text-xl leading-relaxed">
          A collection of digital artifacts where precision engineering meets cinematic motion.
        </p>
      </div>

      <div ref={containerRef} className="relative flex flex-col items-center">
        {PROJECTS.map((project, i) => (
          <div
            key={project.title}
            className="stack-card w-full flex items-center justify-center px-6 md:px-10 mb-[10vh]"
            style={{ zIndex: i, perspective: "1200px" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 w-full max-w-6xl items-center bg-background p-8 md:p-20 rounded-[64px] border border-white/10 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)]"
            >
              <div className="order-2 lg:order-1">
                <div className="relative group overflow-hidden rounded-3xl aspect-video bg-zinc-900 border border-white/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-8">
                <span className="text-xs uppercase tracking-[0.3em] text-accent font-mono block">{project.category}</span>
                <h3 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1.05]">{project.title}</h3>
                <p className="text-xl text-muted max-w-md leading-relaxed">
                  {project.description}
                </p>
                <LinkButton />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LinkButton() {
  return (
    <a
      href="#contact"
      className="group inline-flex items-center gap-2 text-foreground font-bold text-lg hover:text-accent transition-colors"
    >
      Explore Case Study
      <ArrowUpRight size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </a>
  );
}
