"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { EASE_SIGNATURE, DURATION } from "@/components/motion-primitives";

/**
 * Barra fixa de conversão no mobile. Só aparece depois que o usuário passa do
 * hero — antes disso o CTA do hero já está visível e a barra seria redundante.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mobile-cta"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur-md sm:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: DURATION.standard, ease: EASE_SIGNATURE }}
        >
          <div className="flex items-center gap-2 p-3">
            <a
              href={site.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-strong text-bone transition-colors duration-[180ms] active:border-gold active:text-gold"
              aria-label="Falar no WhatsApp"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={site.links.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gold font-semibold text-ink transition-transform duration-[180ms] active:scale-[0.98]"
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Agendar horário
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
