"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, EASE_SIGNATURE, DURATION } from "@/components/motion-primitives";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section
      id="duvidas"
      className="border-y border-line bg-ink-sunken py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Dúvidas"
          title="Antes de agendar"
        />

        <Reveal className="mt-12">
          <ul className="divide-y divide-line border-y border-line">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <li key={faq.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-[180ms] hover:text-gold"
                    >
                      <span className="text-base font-medium text-bone sm:text-lg">
                        {faq.q}
                      </span>
                      <motion.span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-gold"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                          duration: DURATION.quick,
                          ease: EASE_SIGNATURE,
                        }}
                        aria-hidden="true"
                      >
                        <Plus className="h-4 w-4" />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`faq-panel-${i}`}
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: reduced ? 0 : DURATION.standard,
                          ease: EASE_SIGNATURE,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-sm leading-relaxed text-ash sm:text-base">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
