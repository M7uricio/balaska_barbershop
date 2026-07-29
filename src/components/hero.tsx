"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CalendarCheck, MapPin, Star } from "lucide-react";
import { site } from "@/lib/site";
import { Cta } from "@/components/ui/cta";
import { EASE_SIGNATURE, DURATION } from "@/components/motion-primitives";

const headline = ["Corte", "que", "impõe", "respeito."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Parallax leve: a foto sobe mais devagar que o texto ao rolar.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="topo"
      ref={ref}
      className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-24"
    >
      {/* Camada ambiente: foto do Robson com parallax */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={reduced ? undefined : { y: imageY }}
        aria-hidden="true"
      >
        <Image
          src="/img/robson-sentado.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] sm:object-[75%_center] lg:object-[70%_20%]"
        />
      </motion.div>

      {/* Gradientes de leitura — garantem contraste do texto sobre a foto */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 to-ink/30 sm:bg-gradient-to-r sm:from-ink sm:via-ink/85 sm:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink to-transparent"
        aria-hidden="true"
      />

      <motion.div
        className="mx-auto w-full max-w-7xl px-5 sm:px-8"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-2xl">
          {/* Prova social acima da dobra — dado real do Google */}
          <motion.a
            href={site.links.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-ink-raised/70 px-4 py-2.5 backdrop-blur-sm transition-colors duration-[180ms] hover:border-gold"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.standard, ease: EASE_SIGNATURE }}
          >
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </span>
            <span className="text-xs font-medium text-bone sm:text-sm">
              {site.rating.value.toFixed(1).replace(".", ",")} · {site.rating.count} avaliações no
              Google
            </span>
          </motion.a>

          <h1 className="mt-6 font-display text-[3.25rem] uppercase leading-[0.9] text-bone sm:text-7xl lg:text-8xl">
            {/* O espaço literal entre as palavras precisa existir no DOM:
                só margem deixaria o leitor de tela ler tudo emendado. */}
            {headline.map((word, i) => (
              <span key={word}>
                <motion.span
                  className="inline-block"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: "0.35em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DURATION.slow,
                    ease: EASE_SIGNATURE,
                    delay: reduced ? 0 : 0.12 + i * 0.08,
                  }}
                >
                  {word === "impõe" ? (
                    <span className="text-gold">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
                {i < headline.length - 1 && " "}
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-lg text-base leading-relaxed text-ash sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.standard,
              ease: EASE_SIGNATURE,
              delay: reduced ? 0 : 0.45,
            }}
          >
            Máquina, tesoura e navalha na mão de quem faz isso todos os dias em{" "}
            {site.address.city}. Você marca a hora, senta na cadeira e sai pronto
            para a semana.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.standard,
              ease: EASE_SIGNATURE,
              delay: reduced ? 0 : 0.55,
            }}
          >
            <Cta href={site.links.booking} size="lg" className="w-full sm:w-auto">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Agendar meu horário
            </Cta>
            <Cta
              href="#servicos"
              external={false}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Ver serviços e preços
            </Cta>
          </motion.div>

          <motion.p
            className="mt-7 flex items-center gap-2 text-sm text-ash-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: DURATION.standard,
              ease: EASE_SIGNATURE,
              delay: reduced ? 0 : 0.65,
            }}
          >
            <MapPin className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            {site.address.street} · {site.address.district}, {site.address.city}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
