"use client";

import { useRef, type RefObject } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

const SECTION_HEIGHT = 1200;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="top"
      ref={ref}
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full bg-background"
    >
      <CenterImage />
      <ParallaxImages sectionRef={ref} />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-[45vh] bg-gradient-to-b from-background/0 via-background/70 to-background" />
    </section>
  );
}

const CENTER_IMG =
  "https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop";

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT * 0.6], [28, 0]);
  const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT * 0.6], [72, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "105%"]
  );
  const scale = useTransform(scrollY, [0, SECTION_HEIGHT * 0.6], [0.5, 0.9]);
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath,
          backgroundSize,
          backgroundImage: `url(${CENTER_IMG})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath,
          background:
            "linear-gradient(to bottom, rgba(9,9,11,0.6), rgba(9,9,11,0.15) 45%, rgba(9,9,11,0.6))",
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ clipPath }}
      >
        <motion.div
          className="flex flex-col items-center px-6 md:px-16 text-center"
          style={{ scale }}
        >
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.25] [text-shadow:0_4px_40px_rgba(0,0,0,0.7)]">
            CRAFTING
            <br />
            <span className="relative inline-block italic text-zinc-200">
              ARTIFACTS
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-base md:text-xl text-foreground/70 leading-relaxed font-light [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
            Bridging the gap between{" "}
            <span className="text-foreground font-medium">technical precision</span>{" "}
            and{" "}
            <span className="text-foreground font-medium">cinematic storytelling</span>
            .
          </p>
          <button className="group mt-12 flex items-center gap-3 rounded-full bg-foreground px-10 py-5 text-lg font-bold text-background transition-all hover:scale-105 active:scale-95">
            Enter Gallery{" "}
            <ArrowRight
              size={24}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const PARALLAX_IMGS = [
  {
    id: "photo-1484600899469-230e8d1d59c0",
    start: 40,
    end: -120,
    rotate: -3,
    label: "PROCESS",
    className: "ml-[6%] w-36",
  },
  {
    id: "photo-1446776709462-d6b525c57bd3",
    start: 80,
    end: -160,
    rotate: 2,
    label: "STUDY",
    className: "ml-auto mr-[8%] w-44 mt-48",
  },
  {
    id: "photo-1541185933-ef5d8ed016c2",
    start: 40,
    end: -120,
    rotate: -2,
    label: "CINEMATIC",
    className: "ml-[16%] w-36 mt-40",
  },
];

const ParallaxImages = ({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-10 pt-[180px]">
      {PARALLAX_IMGS.map(({ id, start, end, rotate, label, className }, index) => (
        <ParallaxImg
          key={id}
          src={`https://images.unsplash.com/${id}?q=80&w=1400&auto=format&fit=crop`}
          progress={scrollYProgress}
          index={index}
          total={PARALLAX_IMGS.length}
          start={start}
          end={end}
          rotate={rotate}
          label={label}
          className={className}
        />
      ))}
    </div>
  );
};

function ParallaxImg({
  src,
  className,
  start,
  end,
  rotate,
  label,
  progress,
  index,
  total,
}: {
  src: string;
  className?: string;
  start: number;
  end: number;
  rotate: number;
  label: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const windowStart = (index / total) * 0.12;
  const windowLength = 0.3;

  const p = useTransform(progress, [windowStart, windowStart + windowLength], [0, 1]);
  const opacity = useTransform(progress, [0.72, 0.85], [1, 0]);
  const scale = useTransform(p, [0, 1], [1, 1.06]);
  const y = useTransform(p, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`;

  return (
    <motion.div
      className={`${className} p-2 pb-3 rounded-sm bg-zinc-900/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]`}
      style={{ transform, opacity }}
      role="img"
      aria-label="Decorative polaroid image"
    >
      <div
        className="aspect-[4/3] w-full rounded-[2px]"
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-zinc-500">
        FIG.0{index + 1} — {label}
      </p>
    </motion.div>
  );
}