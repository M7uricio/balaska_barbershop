const items = [
  "Corte masculino",
  "Barba na navalha",
  "Toalha quente",
  "Pézinho",
  "Sobrancelha",
  "Corte infantil",
  "Hora marcada",
  "Diadema · Vila Nogueira",
];

export function MarqueeStrip() {
  return (
    <div
      className="marquee-mask relative flex overflow-hidden border-y border-line bg-ink-sunken py-4"
      aria-hidden="true"
    >
      <div
        className="marquee-track flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
        style={{ "--marquee-duration": "38s" } as React.CSSProperties}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8 sm:gap-12">
            <span className="font-display text-xl uppercase tracking-wide text-ash sm:text-2xl">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
