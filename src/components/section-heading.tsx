import type { ReactNode } from "react";
import { Reveal } from "@/components/motion-primitives";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: Props) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "text-center" : undefined}>
      <p
        className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.95] text-bone sm:text-5xl lg:text-6xl ${
          centered ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-ash sm:text-lg ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
