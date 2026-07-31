"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, CalendarCheck } from "lucide-react";
import { site } from "@/lib/site";
import { Cta } from "@/components/ui/cta";
import { EASE_SIGNATURE, DURATION } from "@/components/motion-primitives";

const navItems = [
  { label: "Serviços", href: "#servicos" },
  { label: "O Barbeiro", href: "#barbeiro" },
  { label: "Trabalhos", href: "#galeria" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Onde Fica", href: "#local" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do body enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc fecha o menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled || open
            ? "bg-ink/90 backdrop-blur-md border-b border-line"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#topo"
            className="flex items-center gap-2 min-[460px]:gap-3"
            aria-label={`${site.name} — início`}
          >
            <Image
              src="/img/logo.png"
              alt=""
              width={48}
              height={48}
              className="h-9 w-9 object-contain min-[460px]:h-11 min-[460px]:w-11"
              priority
            />
            <span className="font-display text-xl leading-none sm:text-2xl">
              Balaska
              {/* O subtítulo é a parte mais larga do bloco da logo (rastreio
                  de letras generoso) — some primeiro pra abrir espaço pro
                  "Agendar horário" não quebrar linha ao lado do hambúrguer. */}
              <span className="hidden text-[0.55rem] font-sans font-medium uppercase tracking-[0.28em] text-ash-dim min-[460px]:block">
                By {site.owner}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-ash transition-colors duration-[180ms] hover:text-bone"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Texto sempre visível, nunca quebra linha (whitespace-nowrap).
                O espaço pra isso caber vem do logo encolhendo ao lado
                (imagem menor, subtítulo escondido) até 460px. */}
            <Cta
              href={site.links.booking}
              size="md"
              className="!gap-1.5 !px-3 text-xs whitespace-nowrap min-[460px]:!gap-2 min-[460px]:!px-5 min-[460px]:text-sm"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              Agendar horário
            </Cta>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-bone transition-colors duration-[180ms] hover:border-gold hover:text-gold lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-mobile"
            id="menu-mobile"
            className="fixed inset-0 top-20 z-40 bg-ink/98 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.quick, ease: EASE_SIGNATURE }}
          >
            <nav
              className="flex h-full flex-col gap-1 overflow-y-auto px-5 pb-28 pt-6"
              aria-label="Menu mobile"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-5 font-display text-4xl text-bone transition-colors duration-[180ms] hover:text-gold"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: DURATION.standard,
                    ease: EASE_SIGNATURE,
                    delay: reduced ? 0 : 0.04 * i,
                  }}
                >
                  {item.label}
                </motion.a>
              ))}

              <Cta
                href={site.links.booking}
                size="lg"
                className="mt-8 w-full"
              >
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Agendar horário
              </Cta>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
