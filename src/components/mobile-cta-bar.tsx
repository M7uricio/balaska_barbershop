"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { EASE_SIGNATURE, DURATION } from "@/components/motion-primitives";

/**
 * Barra fixa de conversão no mobile. Só aparece depois que o usuário passa do
 * hero — antes disso o CTA do hero já está visível e a barra seria redundante.
 *
 * Usa IntersectionObserver no próprio hero (#topo) em vez de um limiar fixo
 * de scrollY: o hero tem ~1600px (é o trilho do vídeo com scroll), bem mais
 * que um viewport — um limiar tipo "80% da tela" faria a barra tentar
 * aparecer bem no meio do hero ainda, brigando com o conteúdo por cima.
 * Observando o hero direto, a barra só entra quando ele realmente some da
 * tela, não importa a altura.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("topo");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
    );
    observer.observe(hero);
    return () => observer.disconnect();
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
