const WORDS = ["Precision", "Intent", "Motion", "Craft", "Scale", "Impact"];

export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="marquee-pause relative select-none overflow-hidden py-10 md:py-16"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {WORDS.map((word) => (
              <span
                key={word}
                className="mx-6 md:mx-10 flex items-center gap-6 md:gap-10 whitespace-nowrap text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-foreground/10"
              >
                {word}
                <span className="h-2 w-2 rounded-full bg-accent/50 md:h-3 md:w-3" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}