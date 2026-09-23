"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "@phosphor-icons/react";

interface Quote {
  quote: string;
  name: string;
  role: string;
}

const STATS = [
  { value: "8+", label: "years of experience" },
  { value: "60", label: "projects shipped" },
  { value: "24", label: "clients served" },
];

const FEATURED: Quote = {
  quote:
    "Three weeks to rebuild a flagship interface that had been limping for a year. The result looked effortless, loaded faster, and our numbers finally moved. Every animation had a reason to exist.",
  name: "Maya Torres",
  role: "VP of Product, Arclight",
};

const TESTIMONIALS: Quote[] = [
  {
    quote:
      "Took a rough concept and gave it a polish you could feel. The motion made the product feel expensive in a way screenshots cannot capture.",
    name: "Daniel Okafor",
    role: "Engineering Lead, Kestrel",
  },
  {
    quote:
      "Rare mix of design taste and technical depth. Shipped on time, pushed back when assumptions were weak, and the outcome outperformed the brief.",
    name: "Sofia Reyes",
    role: "CEO, Bind Studio",
  },
];

const QUOTES_A: Quote[] = [FEATURED, TESTIMONIALS[0], TESTIMONIALS[1]];
const QUOTES_B: Quote[] = [TESTIMONIALS[1], FEATURED, TESTIMONIALS[0]];

function QuoteChip({ t, onOpen }: { t: Quote; onOpen: (q: Quote) => void }) {
  return (
    <span className="mx-3 flex items-center gap-3 whitespace-nowrap md:mx-5 md:gap-5">
      <button
        type="button"
        onClick={() => onOpen(t)}
        aria-label={`Read the full testimonial from ${t.name}`}
        className="group/chip cursor-pointer rounded-full border border-white/10 bg-white/[0.03] px-6 py-4 text-left transition-colors hover:border-accent/40 hover:bg-white/[0.06] md:px-8 md:py-5"
      >
        <span className="block text-lg font-medium tracking-tight md:text-2xl">
          {t.quote}
        </span>
        <span className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:text-xs">
          {t.name} — {t.role}
          <ArrowUpRight
            size={12}
            className="opacity-50 transition-transform duration-300 group-hover/chip:translate-x-0.5 group-hover/chip:-translate-y-0.5 group-hover/chip:opacity-100"
          />
        </span>
      </button>
      <span className="h-2 w-2 shrink-0 rounded-full bg-accent/50 md:h-3 md:w-3" />
    </span>
  );
}

function QuoteRow({
  items,
  reverse,
  onOpen,
}: {
  items: Quote[];
  reverse?: boolean;
  onOpen: (q: Quote) => void;
}) {
  const half = [...items, ...items];
  return (
    <div
      className={`marquee-pause marquee-track flex w-max items-center ${
        reverse ? "marquee-track-reverse" : ""
      }`}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
          {half.map((t, i) => (
            <QuoteChip key={`${t.name}-${i}`} t={t} onOpen={onOpen} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function SocialProof() {
  const [selected, setSelected] = useState<Quote | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  return (
    <section className="relative py-32">
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-28 flex flex-wrap items-center gap-x-14 gap-y-8 border-y border-white/10 py-10"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <span className="text-5xl font-bold tracking-tight md:text-6xl">
                {stat.value}
              </span>
              <span className="ml-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <h2 className="max-w-3xl text-4xl font-bold tracking-tight leading-[1.05] mb-6 md:text-6xl">
          Kind words from the people I build for.
        </h2>
        <p className="max-w-xl text-xl text-muted leading-relaxed mb-6">
          A few notes from clients on what it is like to work together.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 space-y-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <QuoteRow items={QUOTES_A} onOpen={setSelected} />
        <QuoteRow items={QUOTES_B} reverse onOpen={setSelected} />
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`Testimonial from ${selected.name}`}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[82dvh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-background p-8 md:p-12"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close testimonial"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-accent/40 hover:text-foreground"
              >
                <X size={18} />
              </button>

              <span className="block select-none font-serif text-6xl leading-none text-accent">
                “
              </span>
              <p className="mt-4 text-2xl font-medium leading-snug md:text-3xl">
                {selected.quote}
              </p>
              <footer className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                {selected.name} — {selected.role}
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}